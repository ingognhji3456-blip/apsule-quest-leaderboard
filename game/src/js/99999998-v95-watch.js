/* ================= v95 관전 · 소리 켜기 (WATCH95) =================
   ① 소리: 화면을 처음 누르거나 키를 누를 때 소리 장치를 켜고, 다른 앱에 갔다 오면 다시 켬(로비 · 탑 브금이 안 나오던 경우).
   ② 관전: 친구 목록에서 「👁 관전」 → 친구 화면의 탑 층(잡몹 · 동료 · 결투 상대 포함)을 내 화면에서 그대로 재생.
      - 보내는 쪽(게임 중인 친구): 보는 사람이 있을 때만(서버가 알려 줌) 0.15초마다 화면 상태를 /api/watch/push.
        내용: 내 위치 · 체력 · 장비 · 사건(공격 · 대시 · 패링 · 궁극기), 동료/결투 상대, 잡몹(듀오 스냅숏 snap 그대로), 결투 점수, 보스전 정보.
      - 보는 쪽: /api/watch/pull로 받아, 같은 층 경기장을 내 쪽에 열고(잡몹 없음 · 게스트 역할) 듀오의 「상대 그리기」(mateIn · drawMate)로 친구와 그 상대를 그림.
        내 캐릭터 · HUD는 숨기고 조작은 막음. 보스전은 보스 이름 · 체력만 보여 줌. */
(()=>{try{
 /* ---------- ① 소리 켜기 ---------- */
 const unlock=()=>{try{initAudio();if(typeof audio!=='undefined'&&audio&&audio.state==='suspended')audio.resume()}catch(e){}};
 addEventListener('pointerdown',unlock,true);addEventListener('keydown',unlock,true);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(unlock,50)});

 if(!window.DUO85||!window.TW71)return;
 const DU=DUO85,D=DU.state,$=id=>document.getElementById(id),api=DU.api,acc=DU.acc,esc=DU.esc,T=()=>TW71.T,r1=v=>Math.round(v*10)/10;
 const note=t=>{try{banner(t)}catch(e){}};
 const SP={on:false};
 const specOn=()=>!!SP.on;
 const inGame=()=>typeof mode!=='undefined'&&(mode==='tower'||mode==='boss')&&!SP.on;

 /* ---------- ② 보내는 쪽 ---------- */
 const WS={until:0,n:0,busy:false,mSeen:new Set(),viewers:0};
 function setWatched(n){if(n>0)WS.until=Math.max(WS.until,Date.now()+15000)}
 const SH={c:null};
 function shot(){if(!SH.c){SH.c=document.createElement('canvas');SH.c.width=480;SH.c.height=300;SH.x=SH.c.getContext('2d');SH.x.imageSmoothingEnabled=true}
  SH.x.drawImage(cv,0,0,cv.width,cv.height,0,0,480,300);
  /* WebP가 되면 WebP(같은 화질에 약 2/3 크기 · 한 장 10KB 안팎), 안 되는 기기(아이폰 등)는 JPEG */
  if(SH.webp!==false){const d=SH.c.toDataURL('image/webp',.6);if(d.startsWith('data:image/webp')){SH.webp=true;return d}SH.webp=false}
  return SH.c.toDataURL('image/jpeg',.6)}
 function frameMsg(){const t=T(),now=Math.round(performance.now()),pv=!!(window.PVP92&&PVP92.on());
  const sk=(()=>{try{return SKIN58.get()||''}catch(e){return ''}})(),wp=(()=>{try{return shopInv().eq.wp||0}catch(e){return 0}})();
  const o={t:'w',ts:now,n:++WS.n,mode:pv?'pvp':mode,f:(t&&t.f)||1,x:r1(P.x),y:r1(P.y),hp:Math.round(P.hp),mx:P.maxhp,ch:DU.myCh(),sk,wp,
   ffx:r1((P.face&&P.face.x)||0),ffy:r1((P.face&&P.face.y)||1),w:!!P.walkOn,down:!!P.downDuo,ev:(D.evW||[]).splice(0,30)};
  const m=D.started&&D.mate;
  if(m&&m.x!=null){const evs=(m.evs||[]).filter(e=>!WS.mSeen.has(e.e));evs.forEach(e=>WS.mSeen.add(e.e));if(WS.mSeen.size>400)WS.mSeen=new Set([...WS.mSeen].slice(-200));
   const pl=(D.room&&(D.room.players||[]).find(p=>!p.me))||{};
   o.mate={ts:now-Math.round(DU.MDLY()),x:r1(m.sx!=null?m.sx:m.x),y:r1(m.sy!=null?m.sy:m.y),hp:m.hp,mx:m.mx,ch:m.ch,sk:m.sk,wp:m.wp,ffx:(m.cf||{}).fx,ffy:(m.cf||{}).fy,w:!!m.wk,down:!!m.down,nm:pl.name||'',
    ev:evs.map(e=>Object.assign({},e,{e:'m'+e.e,t:Math.round(e.t)}))}}
  if(mode==='tower'&&t&&!t.bossCard&&WS.n%2===0){try{o.snap=DU._snap()}catch(e){}}/* 잡몹은 0.13초마다(사이는 보는 쪽이 이어 그림) */
  if(pv){const M=PVP92.M;o.pvp={sc:M.sc,me:M.owner?0:1,round:M.round,ph:M.ph}}
  /* v97: 보스전(과 보스 등장 카드)은 화면을 작은 사진(JPEG)으로 찍어 보냄 — 보스 패턴이 복잡해서 그대로 보여 주려면 이게 확실함. 1초에 약 10장 */
  if((mode==='boss'||t&&t.bossCard&&mode==='tower')&&now-(WS.imgT||0)>=95){WS.imgT=now;try{o.img=shot()}catch(e){}}
  if(mode==='boss'&&typeof G!=='undefined'&&G){o.boss={name:(G.B&&G.B.name)||(G.bossName)||'보스',hp:Math.round(G.hp||0),mx:Math.round(G.maxHp||1)}}
  try{o.me=ACCT55.get().user||''}catch(e){}
  return o}
 setInterval(()=>{const on=!!acc().token&&Date.now()<WS.until&&inGame();window.__watchPush=on;
  if(!on){if(D.evW)D.evW.length=0;/* 보던 사람이 있는데 게임을 나가면 「끝났어요」를 한 번 알림 */
   if(WS.was&&!SP.on&&acc().token&&Date.now()<WS.until){WS.was=false;api('/api/watch/push','POST',{msgs:[{t:'w',mode:'lobby',ts:Math.round(performance.now()),n:++WS.n}]}).catch(()=>{})}return}
  WS.was=true;WS.q=WS.q||[];WS.q.push(frameMsg());if(WS.q.length>20)WS.q.splice(0,WS.q.length-20);/* 답이 늦어도 장면이 빠지지 않게 모아서 한꺼번에 */
  /* v96: 1초에 15장면 · 동시에 2개까지 보냄(하나가 늦어도 다음 것이 감) */
  if((WS.fly|0)>=2||Date.now()-(WS.lastSend||0)<120&&WS.q.length<3)return;WS.fly=(WS.fly|0)+1;WS.lastSend=Date.now();
  api('/api/watch/push','POST',{msgs:WS.q.splice(0)}).then(r=>{if(r.s===200){WS.viewers=r.j.viewers||0;if(WS.viewers>0)WS.until=Date.now()+10000}}).finally(()=>{WS.fly--})},50);
 /* 게임 중엔 친구 목록(=보는 사람 확인)을 5초마다 */
 setInterval(()=>{try{if(acc().token&&inGame()&&window.FR94)FR94.refresh()}catch(e){}},3000);

 /* ---------- ② 보는 쪽 ---------- */
 function spec(name){if(D.on){note('방에 있을 땐 관전할 수 없어요');return}try{gmSfx('ok')}catch(_){}
  Object.assign(SP,{on:true,name,since:0,buf:[],off:null,jit:[],pd:400,pdT:400,P:{_spec:1,nm:name,ring:'#ffd166'},M2:{_spec:1,ring:'#ff9aaa'},last:Date.now(),f:null,lastW:null,busy:false,wait:true,start:Date.now()});
  bar.hidden=false;paintBar('연결하는 중…');try{if(window.FR94)FR94.F.open=false;$('fr94').hidden=true}catch(e){}}
 function stop(msg){if(!SP.on)return;SP.on=false;bar.hidden=true;P.inv=0;try{$('overlay').hidden=true;toLobby()}catch(e){}if(msg)setTimeout(()=>note(msg),400)}
 function enterArena(f){if(f%10===0)f=Math.max(1,f-1);/* 보스 층 번호로 열면 보스전이 시작되므로 바로 아래 층 경기장 */
  try{TW71.start(f)}catch(e){console.error(e)}const t=T();t.duo={role:'guest',mate:null};t.queue=[];t.mobs=[];t.total=0;t.shots=[];t.tels=[];
  P.inv=1e15;P.x=AX+AW/2;P.y=AY+AH-8;SP.f=f;try{$('bvTitle').textContent='BEAT BLADE · 👁 '+SP.name+' 관전'}catch(e){}}
 function apply(w){if(w.mode==='lobby'){stop(SP.name+'님이 게임을 마쳤어요');return}if(w._im)SP.imN=w._im;else if(w.mode==='tower'&&!w.boss)SP.img=SP.imN=null;SP.lastW=w;SP.last=Date.now();SP.wait=false;
  if(w.mode==='tower'||w.mode==='pvp'){const t=T(),want=w.f%10===0?Math.max(1,w.f-1):w.f;if(mode!=='tower'||!t||t.f!==want){enterArena(w.f);if(w.mode==='pvp')try{T().trans=null}catch(e){}}}/* 결투엔 층 이름 안 띄움 */
  else if(w.mode==='boss'){if(mode!=='tower')enterArena(w.f)}
  SP.P.nm=w.me||SP.name;/* 위치 · 사건은 feed가 미리 넣어 둠. 여기선 체력 · 장비만 재생 시각에 맞춰 */
  Object.assign(SP.P,{hp:w.hp,mx:w.mx,ch:w.ch,sk:w.sk,wp:w.wp,down:w.down,at:performance.now()});
  if(w.mate){SP.M2.nm=w.mate.nm||'동료';SP.M2.ring=w.mode==='pvp'?'#ff5a7a':'#8de4ff';Object.assign(SP.M2,{hp:w.mate.hp,mx:w.mate.mx,ch:w.mate.ch,sk:w.mate.sk,wp:w.mate.wp,down:w.mate.down,at:performance.now()})}else SP.M2.x=null;
  if(w.snap&&w.mode!=='boss'&&mode==='tower'){try{DU._applySnap(w.snap)}catch(e){}}}
 setInterval(async()=>{if(!SP.on||SP.busy)return;SP.busy=true;try{const r=await api('/api/watch/pull','POST',{name:SP.name,since:SP.since});if(!SP.on)return;
   if(r.s===403||r.s===401){stop(r.j.error||'관전할 수 없어요');return}if(r.s!==200)return;
   let ms=r.j.msgs||[];const nw=performance.now();if(!SP.since&&ms.length>8)ms=ms.slice(-8);/* 처음엔 최근 것만 */for(const x of ms){if(x.seq<=SP.since)continue;SP.since=x.seq;const m=x.m;if(!m||m.ts==null)continue;
    /* v96: 바로 그리지 않고 쌓아 둠 → 프레임마다 원래 시간 간격대로 꺼내 재생(늦게 · 몰려 와도 끊기지 않게) */
    const o=nw-m.ts;if(SP.off==null||o<SP.off)SP.off=o;else SP.off+=.15;SP.jit.push(o-SP.off);if(SP.jit.length>90)SP.jit.shift();
    if(m.img){const im=new Image();im.src=m.img;m._im=im;delete m.img}/* 미리 풀어 둠 */
    SP.buf.push(m);SP.last=Date.now();SP.wait=false;try{feed(m)}catch(e){console.error('watch feed',e)}}
   if(SP.jit.length){const q=SP.jit.slice().sort((a,b)=>a-b)[Math.floor(SP.jit.length*.95)];SP.pdT=Math.max(250,Math.min(2500,q+180))}
   if(SP.buf.length>200)SP.buf.splice(0,SP.buf.length-200);SP.since=Math.max(SP.since,r.j.seq||0);
   SP.where=r.j.where;const quiet=Date.now()-SP.last;
   if(!ms.length&&quiet>9000){if(!r.j.live&&/로비|^$/.test(r.j.where||'')&&!SP.wait){stop(SP.name+'님이 로비로 돌아갔어요');return}paintBar(SP.wait?'친구 화면을 받는 중… (최대 몇 초)':'연결을 기다리는 중…')}
   if(SP.wait&&Date.now()-SP.start>25000){stop(SP.name+'님 화면을 받지 못했어요');return}
  }finally{SP.busy=false}},120);
 /* 관전 중엔 조작 막기 · 내 캐릭터는 맞지 않게 */
 for(const fn of ['doAttack','doDash','tryParry','tryUlt']){try{const f=window[fn];if(typeof f!=='function')continue;window[fn]=function(){if(SP.on)return;return f.apply(this,arguments)}}catch(e){}}
 try{const f=doAttack;doAttack=function(){if(SP.on)return;return f.apply(this,arguments)}}catch(e){}
 try{const f=doDash;doDash=function(){if(SP.on)return;return f.apply(this,arguments)}}catch(e){}
 {const f=toLobby;toLobby=function(){if(SP.on){SP.on=false;bar.hidden=true;P.inv=0}return f.apply(this,arguments)}}

 /* ---------- 화면: 관전 띠 · 정보 ---------- */
 const bar=document.createElement('div');bar.id='wt95';bar.hidden=true;bar.innerHTML='<i>👁</i><div><b></b><small></small></div><button>관전 그만하기</button>';document.body.appendChild(bar);
 bar.addEventListener('pointerdown',e=>e.stopPropagation());bar.querySelector('button').onclick=()=>stop();
 function paintBar(sub){bar.querySelector('b').textContent=(SP.name||'')+'님 관전 중';bar.querySelector('small').textContent=sub||''}
 function hpBar(o,x,y,w,q,col){o.fillStyle='#05070acc';o.fillRect(x-1,y-1,w+2,7);o.fillStyle='#3a0a14';o.fillRect(x,y,w,5);o.fillStyle=col;o.fillRect(x,y,Math.round(w*Math.max(0,Math.min(1,q))),5)}
 /* 위치 · 사건: 받자마자 「재생 시각」(보낸 시각 + 시계 차 + 재생 지연)으로 시간표에 넣음 → 그리는 쪽은 지금 시각으로 이어 그리기만 하면 됨 */
 function feed(w){if(w.mode==='lobby'||w.mode==='boss')return;SP.P.off=SP.M2.off=SP.off+SP.pd;const pl='f'+w.f+w.mode;
  DU.mateIn({t:'p',ts:w.ts,n:w.n,x:w.x,y:w.y,ffx:w.ffx,ffy:w.ffy,w:w.w,ev:w.ev,pl},SP.P);
  if(w.mate)DU.mateIn({t:'p',n:w.n,ts:w.mate.ts,x:w.mate.x,y:w.mate.y,ffx:w.mate.ffx,ffy:w.mate.ffy,w:w.mate.w,ev:w.mate.ev,pl},SP.M2)}
 function play(){if(!SP.on||SP.off==null)return;const now=performance.now();SP.pd+=(SP.pdT-SP.pd)*(SP.pdT>SP.pd?.08:.01);/* 늘릴 땐 빨리, 줄일 땐 천천히 */
  const pt=now-SP.off-SP.pd;let k=0;while(SP.on&&SP.buf.length&&SP.buf[0].ts<=pt&&k++<30){const m=SP.buf.shift();try{apply(m)}catch(e){console.error('watch',e)}}}
 {const f=frame;frame=function(){try{play()}catch(e){}const r=f.apply(this,arguments);try{
   if(SP.on&&mode==='tower'){P.inv=1e15;const w=SP.lastW,o=ctx;o.save();try{o.setTransform(SS,0,0,SS,0,0)}catch(e){}
    if(w){const f2=w.f,where=w.mode==='pvp'?'⚔ 결투':w.mode==='boss'?'👹 보스전':'🏰 '+f2+'F';paintBar(where+(SP.M2.x!=null?' · '+(w.mode==='pvp'?'상대 ':'동료 ')+(SP.M2.nm||''):''));
     o.globalAlpha=.85;o.fillStyle='#05070a';o.fillRect(W/2-150,AY+3,300,22);o.globalAlpha=1;o.font='900 8px sans-serif';o.textAlign='left';o.fillStyle='#ffd166';o.fillText((SP.P.nm||SP.name),W/2-146,AY+10);
     hpBar(o,W/2-146,AY+14,120,(w.hp||0)/(w.mx||1),'#7dffa8');
     if(w.mate){o.textAlign='right';o.fillStyle=w.mode==='pvp'?'#ff9aaa':'#8de4ff';o.fillText(w.mate.nm||'',W/2+146,AY+10);hpBar(o,W/2+26,AY+14,120,(w.mate.hp||0)/(w.mate.mx||1),w.mode==='pvp'?'#ff5a7a':'#8de4ff')}
     o.textAlign='center';o.fillStyle='#fff';o.font='900 9px sans-serif';o.fillText(w.mode==='pvp'&&w.pvp?(w.pvp.sc[w.pvp.me]+' : '+w.pvp.sc[1-w.pvp.me]):where,W/2,AY+12);
     if(w.mode==='pvp'&&w.pvp){o.font='800 6px sans-serif';o.fillStyle='#9ab8ac';o.fillText('ROUND '+w.pvp.round,W/2,AY+21)}
     if(SP.imN&&SP.imN.complete&&SP.imN.naturalWidth)SP.img=SP.imN;
     if(SP.img&&(w.mode==='boss'||w._im||SP.imN)){o.drawImage(SP.img,0,0,W,H)}/* 보스전: 친구 화면 사진 그대로 */
     else if(w.mode==='boss'&&w.boss){o.globalAlpha=.78;o.fillStyle='#05070a';o.fillRect(AX,AY+28,AW,AH-28);o.globalAlpha=1;o.font='900 16px sans-serif';o.fillStyle='#ff6a8a';o.fillText('👹 보스전 중',W/2,AY+AH/2-14);
      o.font='800 9px sans-serif';o.fillStyle='#e8eef6';o.fillText(w.boss.name+' · '+Math.max(0,Math.round(w.boss.hp/(w.boss.mx||1)*100))+'%',W/2,AY+AH/2+2);hpBar(o,W/2-110,AY+AH/2+8,220,w.boss.hp/(w.boss.mx||1),'#ff5a7a');
      o.font='700 7px sans-serif';o.fillStyle='#9ab8ac';o.fillText('보스전은 체력만 보여 줘요 · 탑 층으로 돌아오면 다시 화면이 나와요',W/2,AY+AH/2+26)}}
    else{o.globalAlpha=.7;o.fillStyle='#05070a';o.fillRect(AX,AY,AW,AH);o.globalAlpha=1;o.font='900 12px sans-serif';o.textAlign='center';o.fillStyle='#ffd166';o.fillText('👁 '+SP.name+'님 화면을 기다리는 중…',W/2,AY+AH/2)}
    o.textAlign='left';o.restore();try{if(window.PV76&&PV76.V.on&&PV76.paint)PV76.paint()}catch(e){}}/* 폰 세로 화면에도 옮겨 그림 */
   else if(SP.on&&mode==='menu'&&SP.wait){/* 아직 화면을 못 받았으면 로비 위에 띠만 */}
   /* 보내는 쪽: 관전자 수 */
   if(!SP.on&&inGame()&&WS.viewers>0&&Date.now()<WS.until){const o=ctx;o.save();try{o.setTransform(SS,0,0,SS,0,0)}catch(e){}o.globalAlpha=.8;o.fillStyle='#05070a';o.fillRect(W-74,H-14,70,11);o.globalAlpha=1;o.font='800 7px sans-serif';o.textAlign='right';o.fillStyle='#ffd166';o.fillText('👁 '+WS.viewers+'명 관전 중',W-8,H-6);o.textAlign='left';o.restore()}
  }catch(e){}return r}}
 const st=document.createElement('style');st.id='wt95s';st.textContent=`
 #wt95{position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:9400;display:flex;align-items:center;gap:10px;padding:8px 10px 8px 14px;border-radius:14px;background:linear-gradient(180deg,#2a2210ee,#120d06ee);border:2px solid #ffd166;color:#fff3c8;box-shadow:0 8px 24px #000a,0 0 16px #ffd16644;font-family:inherit}
 #wt95[hidden]{display:none}#wt95 i{font-style:normal;font-size:20px;animation:wtB 1.4s ease-in-out infinite}#wt95 b{display:block;font-size:13px}#wt95 small{font-size:11px;color:#d8c89a}
 #wt95 button{font:inherit;font-weight:900;padding:7px 11px;border-radius:10px;border:0;cursor:pointer;background:#2a3436;color:#e8f4ef}
 @keyframes wtB{50%{transform:scale(1.15)}}`;document.head.appendChild(st);
 window.WATCH95={spec,stop,specOn,objs:()=>[SP.P,SP.M2].filter(Boolean),setWatched,W:WS,SP};
}catch(e){console.error('v95 watch',e)}})();
