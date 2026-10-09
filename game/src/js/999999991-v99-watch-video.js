/* ================= v99 관전 실시간 영상 (VID99) =================
   관전을 「영상 통화」처럼: 게임 중인 친구의 게임 화면(#game 캔버스)을 WebRTC 영상(1초 30장)으로 보는 사람에게 바로 보낸다.
   - 연결 쪽지(offer · answer)는 서버 우편함 /api/watch/sig 로 주고받고, 받은 쪽지는 관전 push/pull 응답의 sig로 온다(99999998이 VID99.sig로 넘김).
   - 영상은 서버를 거치지 않고 두 기기가 바로 주고받는다(STUN만 씀). 통신 환경 때문에 연결이 안 되면 예전 방식(위치 다시 그리기 · 보스전 사진)이 그대로 보인다.
   - 보는 쪽: 관전을 시작하면 'hello'를 보내고(6초마다, 연결될 때까지), 친구 쪽이 offer를 보내면 answer로 답한다. 영상이 실제로 나오면 inFrame()이 <video>를 돌려주고 99999998이 화면 전체에 그린다.
   - 보내는 쪽: 'hello'를 받으면 그 사람용 연결을 새로 만든다. 모두 영상으로 보고 있으면(outLive) 보스전 사진은 안 보낸다. 게임을 나가면 모든 연결을 닫는다. */
(()=>{try{
 if(!window.WATCH95||!window.DUO85||typeof RTCPeerConnection==='undefined'||!HTMLCanvasElement.prototype.captureStream)return;
 const api=DUO85.api,ICE=[{urls:'stun:stun.l.google.com:19302'},{urls:'stun:stun1.l.google.com:19302'}];
 const send=(to,d)=>api('/api/watch/sig','POST',{to,d}).catch(()=>{});
 const gather=pc=>new Promise(res=>{if(pc.iceGatheringState==='complete')return res();const t=setTimeout(res,1500);
  pc.addEventListener('icegatheringstatechange',()=>{if(pc.iceGatheringState==='complete'){clearTimeout(t);res()}})});

 /* ---------- 보내는 쪽 ---------- */
 const OUT=new Map();let stream=null;
 const getStream=()=>{const tr=stream&&stream.getVideoTracks()[0];if(!tr||tr.readyState==='ended'){stream=cv.captureStream(0);/* 0 = 게임이 한 장 그릴 때마다 직접 한 장씩 넣음(frame 감싸기의 requestFrame) */const t2=stream.getVideoTracks()[0];try{t2.contentHint='detail'}catch(e){}/* 도트 그림이라 해상도를 지키는 쪽(뭉개짐 방지) */}return stream};
 function closeOut(name){const list=name?[name]:[...OUT.keys()];for(const n of list){const o=OUT.get(n);if(!o)continue;OUT.delete(n);try{o.pc.close()}catch(e){}}}
 async function offerTo(name){closeOut(name);const pc=new RTCPeerConnection({iceServers:ICE}),o={pc,t:Date.now()};OUT.set(name,o);
  try{const st=getStream();o.snd=pc.addTrack(st.getVideoTracks()[0],st);
   pc.onconnectionstatechange=()=>{if(pc.connectionState==='failed'||pc.connectionState==='closed'){if(OUT.get(name)===o)closeOut(name)}};
   await pc.setLocalDescription(await pc.createOffer());await gather(pc);if(OUT.get(name)!==o)return;send(name,{t:'offer',sdp:pc.localDescription.sdp,id:o.t})}
  catch(e){console.error('vid99 offer',e);closeOut(name)}}
 async function onAnswer(name,d){const o=OUT.get(name);if(!o||d.id!==o.t)return;try{await o.pc.setRemoteDescription({type:'answer',sdp:boost(d.sdp)});
  /* 화질: 최대 약 2.5Mbps · 30장 · 가로 960 안팎 */
  const p=o.snd.getParameters();if(p.encodings&&p.encodings[0]){Object.assign(p.encodings[0],{maxBitrate:2500000,maxFramerate:30,scaleResolutionDownBy:Math.max(1,cv.width/960)});p.degradationPreference='maintain-resolution';await o.snd.setParameters(p)}}catch(e){console.error('vid99 answer',e)}}
 /* 처음부터 높은 화질로 시작(낮게 시작해 천천히 올라가는 것 방지): 영상 코덱 줄에 시작 · 최소 비트레이트 */
 function boost(sdp){try{const pts=[...sdp.matchAll(/a=rtpmap:(\d+) (VP8|VP9|H264|AV1)\//g)].map(m=>m[1]);const add='x-google-start-bitrate=1800;x-google-min-bitrate=700;x-google-max-bitrate=2500';
  for(const pt of pts){const re=new RegExp('a=fmtp:'+pt+' ([^\r\n]*)');if(re.test(sdp))sdp=sdp.replace(re,(m,a)=>'a=fmtp:'+pt+' '+a+';'+add);else sdp=sdp.replace(new RegExp('(a=rtpmap:'+pt+' [^\r\n]*\r?\n)'),'$1a=fmtp:'+pt+' '+add+'\r\n')}}catch(e){}return sdp}
 {const f=frame;frame=function(){const r=f.apply(this,arguments);try{if(OUT.size&&stream){const tr=stream.getVideoTracks()[0];if(tr&&tr.requestFrame){const n=performance.now();if(n-(OUT._rf||0)>=30){OUT._rf=n;tr.requestFrame()}}}}catch(e){}return r}}
 const outLive=()=>{let n=0;for(const o of OUT.values())if(o.pc.connectionState==='connected')n++;return n};

 /* ---------- 보는 쪽 ---------- */
 const IN={pc:null,name:null,helloT:0,video:null,lastCT:-1,lastCTat:0,live:false};
 function video(){if(IN.video)return IN.video;const v=document.createElement('video');v.muted=true;v.playsInline=true;v.autoplay=true;v.setAttribute('playsinline','');
  v.style.cssText='position:fixed;left:0;top:0;width:2px;height:2px;opacity:0;pointer-events:none';document.body.appendChild(v);IN.video=v;return v}
 function closeIn(bye){if(IN.pc){try{IN.pc.close()}catch(e){}}if(bye&&IN.name)send(IN.name,{t:'bye'});IN.pc=null;IN.live=false;if(IN.video){try{IN.video.srcObject=null}catch(e){}}IN.name=null;IN.helloT=0}
 async function onOffer(name,d){const SP=WATCH95.SP;if(!SP.on||SP.name!==name)return;if(IN.pc){try{IN.pc.close()}catch(e){}}
  const pc=new RTCPeerConnection({iceServers:ICE});IN.pc=pc;IN.name=name;IN.live=false;
  pc.ontrack=e=>{/* 딜레이 최소: 받는 쪽에서 영상을 모아 두지 않고 오는 즉시 보여 줌 */try{e.receiver.jitterBufferTarget=0}catch(_){}try{e.receiver.playoutDelayHint=0}catch(_){}const v=video();v.srcObject=e.streams[0]||new MediaStream([e.track]);const pl=v.play();if(pl&&pl.catch)pl.catch(()=>{})};
  pc.onconnectionstatechange=()=>{if(IN.pc===pc&&(pc.connectionState==='failed'||pc.connectionState==='closed')){IN.pc=null;IN.live=false;IN.helloT=0}};
  try{await pc.setRemoteDescription({type:'offer',sdp:d.sdp});await pc.setLocalDescription(await pc.createAnswer());await gather(pc);if(IN.pc!==pc)return;send(name,{t:'answer',sdp:pc.localDescription.sdp,id:d.id})}
  catch(e){console.error('vid99 in',e);if(IN.pc===pc)IN.pc=null}}
 /* 영상이 실제로 흘러나오고 있을 때만 그림(멈추면 예전 방식으로) */
 function inFrame(){const v=IN.video;if(!IN.pc||!v||IN.pc.connectionState!=='connected'||v.readyState<2||!v.videoWidth)return null;
  const now=performance.now();if(v.currentTime!==IN.lastCT){IN.lastCT=v.currentTime;IN.lastCTat=now}if(now-IN.lastCTat>1500)return null;IN.live=true;return v}
 setInterval(()=>{const SP=WATCH95.SP;
  if(!SP.on){if(IN.name)closeIn(true);return}
  if(IN.name&&IN.name!==SP.name)closeIn(true);
  const ok=IN.pc&&(IN.pc.connectionState==='connected'||IN.pc.connectionState==='connecting'||IN.pc.connectionState==='new');
  if(!ok&&Date.now()-IN.helloT>6000){IN.helloT=Date.now();IN.name=SP.name;send(SP.name,{t:'hello'})}},500);

 /* ---------- 쪽지 받기 ---------- */
 function sig(list){for(const x of list||[]){const d=x.d||{},n=x.from;
  if(d.t==='hello')offerTo(n);else if(d.t==='answer')onAnswer(n,d);else if(d.t==='bye')closeOut(n);else if(d.t==='offer')onOffer(n,d)}}
 window.VID99={sig,inFrame,outLive,closeOut:()=>closeOut(),S:{OUT,IN}};
}catch(e){console.error('v99 video',e)}})();
