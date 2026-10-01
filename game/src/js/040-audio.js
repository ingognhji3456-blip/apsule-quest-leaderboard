/* ================= 오디오 ================= */
let audio=null,sound=true,noiseBuf=null,syncMs=0,song=null,musicReverb=null;
const mus={on:false,T0:0,nb:0,ms:600,song:null,cave:false};
function initAudio(){try{if(!audio){audio=new(window.AudioContext||window.webkitAudioContext)();musicReverb=audio.createConvolver();const n=Math.floor(audio.sampleRate*1.5),buf=audio.createBuffer(2,n,audio.sampleRate);for(let ch=0;ch<2;ch++){const a=buf.getChannelData(ch);for(let i=0;i<n;i++)a[i]=(RND()*2-1)*Math.pow(1-i/n,3)*.34}musicReverb.buffer=buf;const wet=audio.createGain();wet.gain.value=.17;musicReverb.connect(wet);wet.connect(audio.destination)}if(audio.state==='suspended')audio.resume()}catch(e){}}
function tk(f,len,type,gain,at,f2){if(!audio||!Number.isFinite(f)||!Number.isFinite(at))return;const o=audio.createOscillator(),g=audio.createGain();o.type=type;o.frequency.setValueAtTime(f,at);if(f2)o.frequency.exponentialRampToValueAtTime(f2,at+len);g.gain.setValueAtTime(gain,at);g.gain.exponentialRampToValueAtTime(.001,at+len);o.connect(g);g.connect(audio.destination);o.start(at);o.stop(at+len+.02)}
function epicTone(midi,len,gain,at,kind){if(!audio||!Number.isFinite(at)||!Number.isFinite(midi))return;kind=kind||'brass';const f=mtof(midi),mix=audio.createGain(),env=audio.createGain(),lp=audio.createBiquadFilter(),attack=Math.min(kind==='strings'?.24:.12,len*.28);mix.gain.value=.28;lp.type='lowpass';lp.frequency.setValueAtTime(kind==='strings'?650:520,at);lp.frequency.linearRampToValueAtTime(kind==='strings'?2300:1850,at+attack);env.gain.setValueAtTime(.0001,at);env.gain.linearRampToValueAtTime(gain,at+attack);env.gain.setValueAtTime(gain*.78,at+Math.max(attack,len*.58));env.gain.exponentialRampToValueAtTime(.0001,at+len);mix.connect(env);env.connect(lp);lp.connect(audio.destination);if(musicReverb)lp.connect(musicReverb);for(const [mul,det] of [[1,-5],[1,1],[1.002,6]]){const o=audio.createOscillator();o.type=kind==='strings'?'triangle':(det===1?'sawtooth':'triangle');o.frequency.setValueAtTime(f*mul,at);o.detune.value=det;o.connect(mix);o.start(at);o.stop(at+len+.03)}}
function nz(len,gain,at,hp){if(!audio||!Number.isFinite(at))return;if(!noiseBuf){noiseBuf=audio.createBuffer(1,audio.sampleRate*.7,audio.sampleRate);const d=noiseBuf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=RND()*2-1}const s=audio.createBufferSource(),f=audio.createBiquadFilter(),g=audio.createGain();s.buffer=noiseBuf;f.type='highpass';f.frequency.value=hp;g.gain.setValueAtTime(gain,at);g.gain.exponentialRampToValueAtTime(.001,at+len);s.connect(f);f.connect(g);g.connect(audio.destination);s.start(at)}
const sfx=(f,len=.08,type='square',gain=.04,f2)=>{if(sound&&audio)tk(f,len,type,gain,audio.currentTime,f2)};
const mtof=m=>440*Math.pow(2,(m-69)/12);
const SC={maj:[0,2,4,7,9],dor:[0,2,3,5,7,9,10],phr:[0,1,3,5,7,8,10],min:[0,2,3,5,7,8,10],mix:[0,2,4,5,7,9,10],hmin:[0,2,3,5,7,8,11],pdom:[0,1,4,5,7,8,10],loc:[0,1,3,5,6,8,10]};
const PROG=[[0,5,3,4],[0,3,4,3],[0,2,3,4],[0,4,5,3],[0,0,3,4],[0,6,5,4],[0,3,0,4],[0,4,2,5],[0,2,5,4],[0,5,4,3]];
const DR=[{k:[1,0,1,0,1,0,1,0],s:[0,0,1,0,0,0,1,0],h:[0,1,0,1,0,1,0,1]},{k:[1,0,0,1,0,0,1,0],s:[0,0,1,0,0,0,1,0],h:[1,0,1,0,1,0,1,1]},{k:[1,0,0,0,0,0,1,0],s:[0,0,0,0,1,0,0,0],h:[1,0,1,0,1,0,1,0]},{k:[1,1,0,1,1,0,1,0],s:[0,0,1,0,0,0,1,0],h:[1,1,1,1,1,1,1,1]},{k:[1,0,0,1,1,0,0,0],s:[0,0,1,0,0,0,1,1],h:[0,1,0,1,0,1,0,1]},{k:[1,1,1,0,1,1,1,0],s:[0,0,1,0,0,0,1,0],h:[1,1,1,1,1,1,1,1]}];
const BP=[[1,0,0,1,0,0,1,0],[1,0,1,0,1,0,1,0],[1,0,0,0,1,0,0,1],[1,1,0,1,0,1,0,0],[1,0,0,0,0,0,0,0]];
function noteOf(S,d){const L=S.scale.length;return S.root+S.scale[((d%L)+L)%L]+12*Math.floor(d/L)}
function makeSong(bi){const B=BOSSES[bi],m=B.track,d=D(),bpm=m.bpm*d.bpm,scale=SC[m.scale],groove=DR[m.groove],L=scale.length;
const drum={k:groove.k.map((v,i)=>v||((diff==='hard'||diff==='extreme')&&i%4===3&&m.groove%2===1)),s:groove.s.map((v,i)=>v&&(diff!=='easy'||i%4===2)),h:groove.h.map((v,i)=>v||((diff==='hard'||diff==='extreme')&&i%4===1))};
if(diff==='easy'){drum.k=drum.k.map((v,i)=>v&&i%2===0);drum.h=drum.h.map((v,i)=>v&&i%2===0)}
return {title:m.title,bpm,ms:60000/bpm,scale,root:m.root,prog:PROG[m.prog],drum,bass:BP[m.bass],lead:m.lead,leadWave:m.wave,bassWave:m.bassWave,dk:DR[(m.groove+2)%DR.length].k}}
function makeCaveSong(ci){const B=BOSSES[ci],r=rng(hash('cave|'+ci)),bpm=70+ci*2,L=SC[B.scales[0]].length,lead=[];for(let k=0;k<16;k++)lead.push(r()<.45?Math.floor(r()*(L+2)):-1);
return {cave:true,bpm,ms:60000/bpm,scale:SC[B.scales[0]],root:38+ci%5*2,prog:PROG[ci%PROG.length],lead}}
function playSlot(n,delay,S){if(!audio||!S||!Number.isFinite(delay))return;const bar=((n%8)+8)%8,m=Math.floor(n/8),mi=((m%4)+4)%4,at=audio.currentTime+delay,deg=S.prog[mi];
if(S.cave){if(bar===0||bar===4)tk(120,.16,'sine',.05,at,50);if(bar%2===1)nz(.03,.008,at,8000);
if(bar===0){const len=Math.min(3.2,S.ms*4/1000*.95);for(const k of [0,2,4])tk(mtof(noteOf(S,deg+k)),len,'sine',.022,at);tk(mtof(noteOf(S,deg)-12),len*.7,'triangle',.05,at)}
const o=S.lead[(m%2)*8+bar];if(o>=0&&bar%2===0)tk(mtof(noteOf(S,deg+o)+12),.5,'triangle',.014,at);return}
const Dm=S.drum,lv=n<0?0:Math.min(2,G.phase),oh=G.exposed;
if(Dm.k[bar])tk(150,.13,'sine',oh?.09:.13,at,45);
if(lv>=2&&S.dk[bar]&&!Dm.k[bar])tk(140,.09,'sine',.07,at,50);
if(Dm.s[bar]&&!oh&&n>=0){nz(.12,lv>=2?.07:.05,at,1800);tk(190,.08,'triangle',.03,at,120)}
if(Dm.h[bar])nz(.04,lv>=2?.03:.022,at,7000);
if(G.crash&&bar===0){nz(.7,.08,at,2500);G.crash=false}
if(n>=0&&S.bass[bar])tk(mtof(noteOf(S,deg)-12),.2,S.bassWave,oh?.05:.07,at);
if(bar===0||bar===4){const swell=Math.min(1.65,S.ms*1.85/1000),root=noteOf(S,deg),lift=lv>=2?1.28:1;for(const k of [0,2,4])epicTone(noteOf(S,deg+k)+12,swell,.019*lift,at,'brass');epicTone(root-12,swell*.9,.038*lift,at,'brass');nz(.34,.012*lift,at+.025,5200)}
if(n>=0&&bar%2===0){const o=S.lead[(m%2)*8+bar];if(o>=0)epicTone(noteOf(S,deg+o)+24,.42,lv>=2?.018:.012,at,'strings')}
if(bar===0){const len=Math.min(2.5,S.ms*4/1000*.95);for(const k of [0,2,4])tk(mtof(noteOf(S,deg+k)),len,lv>=2?'sawtooth':'triangle',lv>=2?.012:.02,at)}
if(n>=0&&(lv>=1||oh)){const o=S.lead[(m%2)*8+bar];if(o>=0)tk(mtof(noteOf(S,deg+o)+12),.11,S.leadWave,.012,at)}
if(oh&&bar%2===0)tk(mtof(noteOf(S,deg+(bar/2%3)*2)+24),.12,'triangle',.02,at)}
function syncComp(){return ((audio&&(audio.outputLatency||audio.baseLatency))||0)+syncMs/1000}
function sched(now){if(!audio||!mus.on||!mus.song)return;const comp=syncComp(),look=300+comp*1000,half=mus.ms/2;for(;;){const t=mus.T0+mus.nb*half;if(t>now+look)break;if(sound&&t>=now-120)playSlot(mus.nb,Math.max(0,(t-now)/1000-comp),mus.song);mus.nb++}}
function startMusic(S,now,countBeats){mus.song=S;mus.ms=S.ms;mus.on=true;mus.T0=now+500+countBeats*S.ms;mus.nb=-countBeats*2;mus.cave=!!S.cave}
const stopMusic=()=>{mus.on=false};

