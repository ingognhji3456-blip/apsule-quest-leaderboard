/* ================= v167 2:2 팀 결투 (TD167) =================
   둘이 한 팀 · 3판 2선승 · 탑 경기장(잡몹 없음) · 내 장비 그대로. 1:1 결투(PVP92)와 같은 판정 방식을 네 명으로 넓힌 것.
   - 빠른 대전: 서버 대기열 /api/team/queue(1초마다)에 4명이 모이면 레벨이 고르게 두 팀(자리 0·1 = 파랑, 2·3 = 빨강) → 바로 시작.
     이기면 🪙300 · 져도 🪙60(하루 20판까지, 서버 장부 pvp_ledger → PVP92.ledger로 받음).
   - 친구 방: /api/team/create → 코드로 /api/duo/join(4명) → 빈자리 눌러 팀 고르기(/api/team/seat) → 모두 준비 → 방장이 시작. 골드 없음.
   - 주고받기는 듀오 방(DUO85 tick · /api/duo/sync)을 그대로 쓴다. 서버가 메시지마다 보낸 사람 자리(_s)를 붙여 주고,
     DUO85 onMsg가 팀 방이면 이 파일의 msg로 넘긴다. 다른 세 명은 자리마다 따로 시계를 맞춘 _spec 객체(O[자리])로 DUO85.mateIn/drawMate.
   - 맞음 판정은 「맞는 쪽」: 상대 팀의 공격(a · U 사건)을 내 위치 기록으로 판정(PVP92와 같음). 같은 팀끼리는 안 맞음.
   - 쓰러지면(ko 메시지) 그 라운드는 구경. 살아 있는 같은 팀이 곁에 2.5초 서 있으면 35% 체력으로 일어남(라운드에 한 번, rv 메시지).
   - 라운드 결과는 방장(나가면 서버가 다음 사람에게 넘김)이 정함: 한 팀이 모두 쓰러지거나 90초 뒤 팀 체력 비율 → rr 메시지.
   - PVP92.on()을 감싸 팀 결투 중에도 true → 탑 층 표시 숨김 · 레벨 특성 0 · 친구창 「결투 중」 등 1:1 결투와 같은 규칙. */
(()=>{try{
 if(!window.DUO85||!window.TW71)return;
 const DU=DUO85,D=DU.state,T=()=>TW71.T,$=id=>document.getElementById(id),esc=DU.esc,api=DU.api,acc=DU.acc;
 const num=v=>Number(v||0).toLocaleString();
 const ROUND_MS=90000,WIN=2,TC=['#5ab8ff','#ff5a6a'],TN=['파랑 팀','빨강 팀'],RV_MS=2500;
 const M={on:false,round:1,sc:[0,0],ph:'',phT:0,rStart:0,over:false,w:-1,why:'',fx:[],down:{},gone:{},off:{},rvT:0,rvUsed:false,lastKo:-1,roster:[],ranked:false,res:null,lastNow:0};
 const O={};/* 자리 번호 → 다른 선수 */
 const isRoom=()=>!!(D.on&&D.room&&D.room.kind==='team');
 const on=()=>!!(M.on&&D.started&&isRoom());
 const pl=()=>(D.room&&D.room.players)||[];
 const meP=()=>pl().find(p=>p.me)||{};
 const mySl=()=>meP().sl|0,myTm=()=>mySl()>>1,tmOf=sl=>sl>>1;
 const host=()=>!!meP().owner;
 const nameOf=sl=>(pl().find(p=>p.sl===sl)||M.roster.find(p=>p.sl===sl)||{}).name||'?';
 const present=sl=>M.roster.some(p=>p.sl===sl)&&!M.gone[sl];
 const downOf=sl=>sl===mySl()?!!M.down[sl]:(!!M.down[sl]||!present(sl));
 const note=tx=>{try{banner(tx)}catch(e){}};
 const pop=(x,y,tx,col)=>{try{TW71.addPop(x,y,tx,col)}catch(e){}};

 /* ---------- 다른 선수 받기: 사람마다 시계 맞추기 ---------- */
 function mate(sl){let o=O[sl];if(!o){const ally=tmOf(sl)===myTm();o=O[sl]={_spec:1,sl,hs:[],ring:ally?'#7dffa8':'#ff5a6a',nmc:ally?'#bff7d2':'#ffc2c8',hp:1,mx:1}}o.nm=nameOf(sl);return o}
 function feedP(m){const sl=m._s;if(sl==null||sl===mySl())return;let o=mate(sl);const now=performance.now();
  if(m.ts!=null){if(o.lastTs!=null&&m.ts<o.lastTs-1500){delete O[sl];o=mate(sl)}/* 상대가 새로고침하면 시계가 처음부터 */o.lastTs=m.ts;
   const d=now-m.ts;o.oMin=o.oMin==null||d<o.oMin?d:o.oMin+.3;(o.jit||(o.jit=[])).push(d-o.oMin);if(o.jit.length>60)o.jit.shift();
   const J=o.jit.slice().sort((a,b)=>a-b)[Math.floor((o.jit.length-1)*.95)],want=o.oMin+Math.max(60,Math.min(450,J+40));
   o.off=o.off==null?want:o.off+(want-o.off)*(want>o.off?.25:.03);o.pd=o.off-o.oMin}
  try{DU.mateIn(m,o)}catch(e){}}
 const myDelay=()=>{let s=0,n=0;for(const k in O)if(O[k].pd!=null){s+=O[k].pd;n++}return n?Math.round(s/n):120};

 /* ---------- 받은 메시지(DUO85 onMsg가 팀 방이면 여기로) ---------- */
 function msg(m){if(!isRoom())return false;const t=T(),s=m._s;
  switch(m.t){
   case 'p':if(on())feedP(m);break;
   case 'join':paint();break;
   case 'leave':if(m.sl!=null){M.gone[m.sl]=1;delete O[m.sl]}if(on())left(m.name);else paint();break;
   case 'hit':{if(!on())break;const o=O[s];if(o&&o.sx!=null){pop(o.sx,o.sy-28,(m.c?'치명! ':'')+'-'+m.d,m.to===mySl()?(m.c?'#ff9a5a':'#ffffff'):'#c8d4e0');
     if(m.to===mySl())try{t.hfx.push({x:o.sx,y:o.sy-8,a:0,t:t.clk,big:!!m.c,col:m.c?'#ff9a5a':'#ffffff'});TW71.burst(o.sx,o.sy-6,8,'#ffffff',120)}catch(e){}}
    if(m.to===mySl()&&t){const now=performance.now();t.stop=now+(m.k==='U'?40:70);t.ult=Math.min(100,(t.ult||0)+(m.k==='U'?0:7));t.combo=(t.combo||0)+1;t.shake=Math.max(t.shake||0,.18);
     try{perc('snare',audio.currentTime,.4);sfx(380,.1,'triangle',.05,120)}catch(e){}}break}
   case 'mi':{const o=O[s];if(on()&&o&&o.sx!=null&&m.to===mySl())pop(o.sx,o.sy-28,'회피','#9fe8ff');break}
   case 'pr':if(on()&&m.to===mySl()){const now=performance.now();P.atkCd=now+650;if(t)t.shake=.35;P.slowT=(t?t.clk:0)+.6;pop(P.x,P.y-30,'튕겨남!','#ffb2a8');M.fx.push({k:'stun',t:now});try{sfx(120,.3,'square',.05,60)}catch(e){}}break;
   case 'ko':if(on()&&m.n===M.round&&s!=null){M.down[s]=1;M.lastKo=tmOf(s);const o=O[s];if(o&&o.sx!=null)pop(o.sx,o.sy-34,'쓰러짐!',tmOf(s)===myTm()?'#ffb0b8':'#ffe79a');
     if(tmOf(s)===myTm())note('💤 '+nameOf(s)+'님이 쓰러졌어요 · 곁에 서 있으면 일으킬 수 있어요');try{sfx(tmOf(s)===myTm()?160:620,.25,'triangle',.05,tmOf(s)===myTm()?80:1240)}catch(e){}}break;
   case 'rv':if(on()&&m.n===M.round&&s!=null){M.down[s]=0;const o=O[s];if(o&&o.sx!=null)pop(o.sx,o.sy-34,'다시 일어남!','#7dffa8');try{sfx(660,.2,'triangle',.05,990)}catch(e){}}break;
   case 'rr':if(on())applyRR(m);break;
   case 'rm':if(on()&&M.ph==='end')rematch();break}
  return true}

 /* ---------- 경기 시작 · 라운드 ---------- */
 function begin(){M.on=true;M.roster=pl().map(p=>({sl:p.sl|0,name:p.name,lv:p.lv,ch:p.ch}));M.ranked=!!D.room.ranked;M.sc=[0,0];M.round=1;M.over=false;M.res=null;M.gone={};M.fx=[];
  for(const k in O)delete O[k];closePanel();S.on=false;card.hidden=true;
  try{TW71.start(D.room.floor||5)}catch(e){console.error(e)}const t=T();t.duo={role:'guest',mate:{}};t.queue=[];t.mobs=[];t.total=0;t.shots=[];t.tels=[];
  try{$('bvTitle').textContent='BEAT BLADE · 2:2 팀 결투'}catch(e){}roundReset();
  note((M.ranked?'👥 팀 빠른 대전':'👥 친구 팀 결투')+' · '+TN[myTm()]+' · 3판 2선승')}
 function roundReset(){const t=T(),now=performance.now(),sl=mySl();D.plX='r'+M.round;M.down={};M.rvT=0;M.rvUsed=false;M.w=-1;M.lastKo=-1;M.endT=0;
  P.x=AX+AW*(sl<2?.2:.8);P.y=AY+AH*(sl%2?.74:.42);P.face={x:sl<2?1:-1,y:0};P.hp=P.maxhp;P.dash=null;P.downDuo=false;P.inv=now+1700;P.atkCd=0;
  if(t){t.dead=false;t.clear=false;t.trans=null;t.U=null;t.shots=[];t.mobs=[]}M.ph='intro';M.phT=now;M.introMs=M.round===1?3000:1700;
  try{sfx(220,.3,'sawtooth',.05,440)}catch(e){}}
 function roundEnd(w,why){if(!host()||M.ph!=='fight')return;const sc=M.sc.slice();sc[w]++;const m={t:'rr',w,sc,n:M.round,why};DU.send(m);applyRR(m)}
 function applyRR(m){if(m.n!==M.round||M.ph==='ko'||M.ph==='end')return;M.sc=m.sc;M.ph='ko';M.phT=performance.now();M.w=m.w;M.why=m.why;M.over=Math.max(...M.sc)>=WIN;
  const won=m.w===myTm();try{if(won){sfx(660,.25,'triangle',.06,1320);sfx(990,.3,'sine',.04,1980)}else sfx(200,.4,'sawtooth',.05,80)}catch(e){}const t=T();if(t)t.shake=.5}
 function ko(){if(!on())return true;if(M.ph!=='fight'||M.down[mySl()])return true;M.down[mySl()]=1;M.lastKo=myTm();P.hp=0;P.downDuo=true;M.rvT=0;const t=T();if(t)t.dead=true;
  DU.send({t:'ko',n:M.round});try{sfx(150,.5,'sawtooth',.05,50)}catch(e){}return true}
 function revive(){const t=T(),now=performance.now();M.down[mySl()]=0;M.rvUsed=true;M.rvT=0;P.downDuo=false;P.hp=Math.max(1,Math.round(P.maxhp*.35));P.inv=now+1200;if(t)t.dead=false;
  DU.send({t:'rv',n:M.round});pop(P.x,P.y-34,'다시 일어남!','#7dffa8');try{sfx(523,.15,'triangle',.05,1046);setTimeout(()=>sfx(784,.2,'triangle',.05,1568),120)}catch(e){}}
 /* 누가 나감: 상대 팀이 모두 나가면 내 팀 승리 */
 function left(name){note('🚪 '+(name||'한 명')+'님이 나갔어요');if(M.ph==='end')return;
  const foe=1-myTm();if(![0,1].some(i=>present(foe*2+i))){M.sc[myTm()]=Math.max(M.sc[myTm()],WIN);finish(myTm(),'상대 팀이 모두 나갔어요')}}

 /* ---------- 맞음 판정(맞는 쪽, PVP92와 같은 방식) ---------- */
 const HIS=[];
 const invNow=now=>now<P.inv&&P.inv>(P._hitInv||0)+1;
 function hisRec(now){const t=T();HIS.push({t:now,x:P.x,y:P.y,inv:invNow(now),par:!!(t&&P.parryT!=null&&t.clk-P.parryT>=0&&t.clk-P.parryT<.26)});while(HIS.length&&now-HIS[0].t>2500)HIS.shift()}
 function seenWin(e,o,off){const lag=Math.min(900,(D.rtt||200)+60),tau=e.t-(o.pd||0)+(off||0)-(e.dl||120)-lag;return HIS.filter(h=>h.t>=tau-220&&h.t<=tau+140)}
 function inSwing(ox,oy,a,x,y){const dx=x-ox,dy=y-oy,d=Math.hypot(dx,dy);if(d>46)return false;const da=Math.abs(((Math.atan2(dy,dx)-a+9.42)%6.28)-3.14);return d<=16||da<=1.35}
 function takeHit(dm,a,e,kind,sl){const now=performance.now(),t=T();
  try{if(window.CB81&&CB81.onHurt){dm=CB81.onHurt(dm)}}catch(_){}dm=Math.max(0,Math.round(dm));if(dm<=0){DU.send({t:'mi',e:e.e,to:sl});return}
  P.hp=Math.max(0,P.hp-dm);{const hi=now+(kind==='U'?120:240);P._hitInv=hi;P.inv=Math.max(P.inv||0,hi)}
  if(a!=null){P.x=Math.max(AX+10,Math.min(AX+AW-10,P.x+Math.cos(a)*12));P.y=Math.max(AY+24,Math.min(AY+AH-8,P.y+Math.sin(a)*8))}
  if(t){t.flash=.35;t.shake=Math.max(t.shake||0,.3);t.ult=Math.min(100,(t.ult||0)+4);t.combo=0}
  pop(P.x,P.y-28,'-'+dm+(e.cr?' 치명!':''),'#ff5a6a');try{sfx(150,.14,'square',.06,60)}catch(_){}
  DU.send({t:'hit',e:e.e,d:dm,c:e.cr?1:0,k:kind,to:sl});if(P.hp<=0)ko()}
 function resolve(now){const t=T();if(M.down[mySl()])return;
  for(const k in O){const o=O[k],sl=+k;if(tmOf(sl)===myTm()||!o.evs||M.down[sl])continue;
   for(const e of o.evs){if(e.res)continue;
    if(e.k==='a'&&e.dm){if(now<e.t+60)continue;e.res=1;if(M.ph!=='fight'||e.t-(o.pd||0)<M.rStart-200)continue;
     const ox=e.ax!=null?e.ax:o.sx,oy=e.ay!=null?e.ay:o.sy,a=e.a||0,win=seenWin(e,o).concat([{t:now,x:P.x,y:P.y,inv:invNow(now),par:false}]);
     const hits=win.filter(h=>inSwing(ox,oy,a,h.x,h.y));if(!hits.length)continue;
     if(win.some(h=>h.par)||(t&&P.parryT!=null&&t.clk-P.parryT>=0&&t.clk-P.parryT<.26)){DU.send({t:'pr',e:e.e,to:sl});pop(P.x,P.y-30,'PARRY!','#ffe79a');t.ult=Math.min(100,(t.ult||0)+12);P.inv=now+350;
      M.fx.push({k:'par',x:P.x,y:P.y-10,t:now});try{sfx(1300,.14,'square',.05,2000);perc('crash',audio.currentTime,.3)}catch(_){}continue}
     if(hits.every(h=>h.inv)){pop(P.x,P.y-30,'회피!','#9fe8ff');DU.send({t:'mi',e:e.e,to:sl});continue}
     takeHit(e.dm,a,e,'a',sl);if(M.down[mySl()])return}
    else if(e.k==='U'&&e.sp){const hs=(e.sp.hits&&e.sp.hits.length)?e.sp.hits:[400];e.hk=e.hk||0;
     while(e.hk<hs.length&&now>=e.t+hs[e.hk]){const q=e.hk++;if(M.ph!=='fight'||e.t-(o.pd||0)<M.rStart-200)continue;
      const win=seenWin(e,o,hs[q]).concat([{t:now,x:P.x,y:P.y,inv:invNow(now)}]),near=win.filter(h=>Math.hypot(h.x-e.sp.cx,h.y-8-e.sp.cy)<=100);
      if(!near.length)continue;if(near.every(h=>h.inv)){pop(P.x,P.y-30,'회피!','#9fe8ff');continue}
      takeHit((e.dm||30)/hs.length,null,e,'U',sl);if(M.down[mySl()])return}
     if(e.hk>=hs.length)e.res=1}
    else e.res=1}}}

 /* ---------- 공격 · 궁극기: 가장 가까운 상대 팀을 겨눔 ---------- */
 function nearFoe(){let b=null,bd=1e9;for(const k in O){const o=O[k],sl=+k;if(tmOf(sl)===myTm()||downOf(sl)||o.sx==null)continue;const d=Math.hypot(o.sx-P.x,o.sy-P.y);if(d<bd){bd=d;b=o}}return b?{o:b,d:bd}:null}
 function aim(){const f=nearFoe();if(!f)return;const dx=f.o.sx-P.x,dy=(f.o.sy-6)-(P.y-6),d=Math.hypot(dx,dy);if(d<56&&d>0)P.face={x:dx/d,y:dy/d}}
 {const f=doAttack;doAttack=function(){if(on()){if(M.ph!=='fight'||M.down[mySl()]||performance.now()<(P.atkCd||0))return;aim();
   const w=curWp()||{},pet=(curPet()||{}).dmg||0,bg=TW71.beatGood?TW71.beatGood():0,mult=bg===2?1.5:bg===1?1.2:1,CB=window.CB81;
   const cr=Math.random()<((w.crit||0)+(CB&&CB.critAdd?CB.critAdd():0));D.atkX={dm:Math.round(34*(w.dmg||1)*(1+pet)*mult*(cr?1.8:1)*.25),cr:cr?1:0,dl:myDelay(),ax:Math.round(P.x),ay:Math.round(P.y)}}
  return f.apply(this,arguments)}}
 if(typeof tryUlt==='function'){const f=tryUlt;tryUlt=function(){if(on()&&(M.ph!=='fight'||M.down[mySl()]))return;const r=f.apply(this,arguments);
  try{if(on()){const t=T();if(t&&t.U&&!t.U._td){t.U._td=1;const n=nearFoe();if(n){t.U.sp.cx=n.o.sx;t.U.sp.cy=n.o.sy-8}
   const w=curWp()||{};D.ultX={dm:Math.round(34*Math.min(2.2,w.dmg||1)*(1+((curPet()||{}).dmg||0))*.25*3.2),dl:myDelay()}}}}catch(e){}return r}}
 {const f=doDash;doDash=function(){if(on()&&(M.ph==='end'||M.ph==='ko'||M.down[mySl()]))return;return f.apply(this,arguments)}}
 if(typeof tryParry==='function'){const f=tryParry;tryParry=function(){if(on()&&M.down[mySl()])return;return f.apply(this,arguments)}}

 /* ---------- 매 프레임 ---------- */
 function teamHp(tm){let h=0,m=0;for(let i=0;i<2;i++){const sl=tm*2+i;if(!present(sl)&&sl!==mySl())continue;if(sl===mySl()){h+=M.down[sl]?0:P.hp;m+=P.maxhp||1}else{const o=O[sl]||{};h+=M.down[sl]?0:Math.max(0,o.hp||0);m+=o.mx||1}}return m?h/m:0}
 function step(now){const t=T(),dt=Math.min(100,now-(M.lastNow||now));M.lastNow=now;
  if(M.ph==='intro'&&now-M.phT>M.introMs){M.ph='fight';M.phT=now;M.rStart=now;P.inv=now+300;try{sfx(523,.12,'square',.05,1046);perc('crash',audio.currentTime,.5)}catch(e){}}
  hisRec(now);
  /* 연결이 15초 넘게 끊긴 사람은 나간 것으로 */for(const r of M.roster){if(r.sl===mySl()||M.gone[r.sl])continue;const p=pl().find(q=>q.sl===r.sl&&q.name===r.name);
   if(!p){M.gone[r.sl]=1;left(r.name);continue}if(p.online)r.offT=0;else if(!r.offT)r.offT=now;else if(now-r.offT>15000){M.gone[r.sl]=1;left(r.name)}}
  if(M.ph==='fight'){resolve(now);if(P.hp<=0&&!M.down[mySl()])ko();
   /* 일으키기: 쓰러진 내 곁에 살아 있는 같은 팀이 서 있으면 */
   if(M.down[mySl()]&&!M.rvUsed){const ally=[0,1].map(i=>myTm()*2+i).filter(sl=>sl!==mySl()&&!downOf(sl)).map(sl=>O[sl]).find(o=>o&&o.sx!=null&&Math.hypot(o.sx-P.x,o.sy-P.y)<24);
    M.rvT=ally?M.rvT+dt:Math.max(0,M.rvT-dt*2);if(M.rvT>=RV_MS)revive()}
   if(host()){const all=tm=>[0,1].every(i=>downOf(tm*2+i)),d0=all(0),d1=all(1);
    if(d0||d1)roundEnd(d0&&d1?1-M.lastKo:d0?1:0,'ko');
    else if(now-M.rStart>ROUND_MS){const a=teamHp(0),b=teamHp(1);roundEnd(a>=b?0:1,'time')}}}
  if(M.ph==='ko'&&now-M.phT>2600){if(M.over)finish(M.sc[0]>=WIN?0:1);else{M.round++;roundReset()}}}
 function bar(o,x,y,w,q,col,rev,dn){o.fillStyle='#05070acc';o.fillRect(x-1,y-1,w+2,6);o.fillStyle='#3a0a14';o.fillRect(x,y,w,4);const ww=Math.round(w*Math.max(0,Math.min(1,q)));o.fillStyle=dn?'#555a66':col;o.fillRect(rev?x+w-ww:x,y,ww,4);o.fillStyle='#ffffff55';o.fillRect(rev?x+w-ww:x,y,ww,1)}
 function hud(now){const o=ctx;o.save();try{o.setTransform(SS,0,0,SS,0,0)}catch(e){}
  const cx=W/2,y=AY+3,L=myTm(),R=1-L;o.globalAlpha=.88;o.fillStyle='#05070a';o.fillRect(cx-206,y-2,412,34);o.globalAlpha=1;o.fillStyle=TC[L];o.fillRect(cx-206,y+31,206,1);o.fillStyle=TC[R];o.fillRect(cx,y+31,206,1);
  /* 팀마다 두 줄: 이름 + 체력 */
  for(const [tm,side] of [[L,0],[R,1]])for(let i=0;i<2;i++){const sl=tm*2+i,me=sl===mySl(),ob=O[sl]||{},dn=downOf(sl),q=me?P.hp/(P.maxhp||1):(ob.hp||0)/(ob.mx||1),yy=y+i*15;
   if(!M.roster.some(r=>r.sl===sl))continue;o.font='900 7px sans-serif';o.textAlign=side?'right':'left';o.fillStyle=M.gone[sl]?'#6a7480':dn?'#ff8a9a':me?'#ffe79a':TC[tm];
   const nm=(me?'★ ':'')+nameOf(sl)+(M.gone[sl]?' (나감)':dn?' 💤':'');o.fillText(nm,side?cx+202:cx-202,yy+6);bar(o,side?cx+52:cx-202,yy+8,150,dn?0:q,me?'#7dffa8':tm===L?'#7dd8ff':'#ff5a7a',!!side,dn)}
  for(let i=0;i<WIN;i++){o.fillStyle=M.sc[L]>i?'#ffd166':'#2a3440';o.fillRect(cx-40+i*8,y+26,6,3);o.fillStyle=M.sc[R]>i?'#ffd166':'#2a3440';o.fillRect(cx+28-i*8,y+26,6,3)}
  const left=M.ph==='fight'?Math.max(0,Math.ceil((ROUND_MS-(now-M.rStart))/1000)):M.ph==='intro'?ROUND_MS/1000:0;o.textAlign='center';o.font='900 13px sans-serif';o.fillStyle=left<=10&&M.ph==='fight'?'#ff5a7a':'#ffffff';o.fillText(String(left),cx,y+13);
  o.font='800 6px sans-serif';o.fillStyle='#9ab8ac';o.fillText('ROUND '+M.round+' · 2:2',cx,y+22);
  const big=(tx,sub,col,k)=>{const s=1+.25*Math.max(0,1-k*4);o.save();o.translate(cx,AY+AH/2-10);o.scale(s,s);o.globalAlpha=Math.min(1,k*6);o.font='900 30px sans-serif';o.fillStyle='#000';o.fillText(tx,2,2);o.fillStyle=col;o.fillText(tx,0,0);if(sub){o.font='800 10px sans-serif';o.fillStyle='#e8eef6';o.fillText(sub,0,18)}o.restore()};
  if(M.ph==='intro'){const k=(now-M.phT)/M.introMs;big(k<.6?'ROUND '+M.round:'FIGHT!',k<.6?'나는 '+TN[L]+' · 상대 팀을 모두 쓰러뜨려요':'',k<.6?TC[L]:'#ff5a7a',k<.6?k/.6:(k-.6)/.4)}
  if(M.ph==='fight'&&now-M.rStart<500)big('FIGHT!','','#ff5a7a',(now-M.rStart)/500+1);
  if(M.ph==='ko'){const k=(now-M.phT)/2600,won=M.w===L;big(M.why==='time'?'TIME UP':'K.O.',TN[M.w]+' 라운드 승리 · '+M.sc[L]+' : '+M.sc[R],won?'#ffe79a':'#ff5a7a',k)}
  /* 쓰러짐 안내 · 일으키는 막대 */
  if(M.down[mySl()]&&M.ph==='fight'){const yy=AY+AH/2+18;o.globalAlpha=.75;o.fillStyle='#05070a';o.fillRect(cx-120,yy,240,32);o.globalAlpha=1;o.font='900 11px sans-serif';o.fillStyle='#ff8a9a';o.fillText('💤 쓰러졌어요',cx,yy+13);
   o.font='800 8px sans-serif';o.fillStyle='#cfe8f0';o.fillText(M.rvUsed?'이번 라운드는 동료를 응원해요':'같은 팀이 곁에 2.5초 서 있으면 다시 일어나요',cx,yy+24);if(!M.rvUsed&&M.rvT>0){o.fillStyle='#16303a';o.fillRect(cx-60,yy+27,120,3);o.fillStyle='#7dffa8';o.fillRect(cx-60,yy+27,120*Math.min(1,M.rvT/RV_MS),3)}}
  M.fx=M.fx.filter(f=>now-f.t<500);for(const f of M.fx){const q=(now-f.t)/500;if(f.k==='par'){o.globalAlpha=1-q;o.strokeStyle='#ffe79a';o.lineWidth=2;o.beginPath();o.arc(f.x,f.y,8+q*26,0,6.28);o.stroke()}
   if(f.k==='stun'){o.globalAlpha=1-q;o.fillStyle='#ffb2a8';for(let i=0;i<3;i++){const a=now/150+i*2.1;o.fillRect(P.x+Math.cos(a)*9-1,P.y-34+Math.sin(a)*3,2,2)}}}
  o.globalAlpha=1;o.textAlign='left';o.restore()}
 {const f=frame;frame=function(){const r=f.apply(this,arguments);try{if(on()){const now=performance.now();step(now);if(on())hud(now)}}catch(e){console.error('td167',e)}return r}}
 /* 탑 그리기 목록: 다른 세 명 + 내 발밑 팀 고리 + 쓰러진 동료 곁 일으키기 고리 */
 function list(L,now){const c=ctx,me=mySl();
  L.push({y:P.y-.01,fn:()=>{c.save();c.globalAlpha=.8;c.strokeStyle=TC[myTm()];c.lineWidth=1.5;c.beginPath();c.ellipse(P.x,P.y+2,11,4,0,0,6.28);c.stroke();c.restore()}});
  for(const k in O){const o=O[k],sl=+k;if(!present(sl)||o.x==null)continue;o.down=!!M.down[sl];L.push({y:o.sy||o.y||0,fn:()=>{try{DU.drawMate(now,false,o)}catch(e){}
    if(tmOf(sl)===myTm()&&M.down[sl]&&!M.down[me]&&o.sx!=null){const d=Math.hypot(o.sx-P.x,o.sy-P.y);c.save();c.globalAlpha=d<24?.9:.45+.2*Math.sin(now/200);c.strokeStyle='#7dffa8';c.lineWidth=1.5;c.setLineDash([3,3]);c.beginPath();c.arc(o.sx,o.sy-6,24,0,6.28);c.stroke();c.setLineDash([]);
     if(d<24){c.font='900 7px sans-serif';c.textAlign='center';c.fillStyle='#7dffa8';c.fillText('일으키는 중…',o.sx,o.sy+12)}c.restore()}}})}}

 /* ---------- 끝 · 결과 ---------- */
 async function finish(wt,why){if(M.ph==='end')return;M.ph='end';M.phT=performance.now();const t=T();if(t)t.dead=true;try{stopMusic()}catch(e){}const win=wt===myTm();
  try{if(win){perc('crash',audio.currentTime,.7);sfx(523,.2,'triangle',.06,1046);setTimeout(()=>sfx(784,.3,'triangle',.06,1568),180)}else sfx(180,.6,'sawtooth',.05,60)}catch(e){}
  try{window.DP153&&DP153.ev('pvp',1)}catch(e){}
  let res=null;const code=D.code;if(code){for(let i=0;i<8;i++){const r=await api('/api/team/result','POST',{code,wt});if(r.s===200){res=r.j;if(!res.ranked||res.settled)break}else break;await new Promise(z=>setTimeout(z,1200))}}
  M.res=res;let lg=null;try{if(window.PVP92&&res&&res.ranked)lg=await PVP92.ledger()}catch(e){}show(wt,why,res)}
 function show(wt,why,res){const win=wt===myTm(),L=myTm(),s=(res&&res.stats)||{},sc=M.sc[L]+' : '+M.sc[1-L];
  const mates=M.roster.filter(r=>tmOf(r.sl)===L).map(r=>esc(r.name)).join(' · '),foes=M.roster.filter(r=>tmOf(r.sl)!==L).map(r=>esc(r.name)).join(' · ');
  let gold;if(!M.ranked)gold='<div class="pvG v">친구 팀 결투 · 골드는 오가지 않아요</div>';else if(res&&res.settled)gold=res.gold?'<div class="pvG '+(win?'w':'l')+'">🪙 +'+num(res.gold)+' 골드 '+(win?'(승리 보상)':'(참가 보상)')+'</div>':'<div class="pvG v">오늘 보상 횟수(20판)를 다 썼어요 · 내일 다시 받아요</div>';
  else gold='<div class="pvG v">결과 확인 중… 잠시 뒤 로비에서 골드가 들어와요</div>';
  const html='<div class="pvRes"><b class="'+(win?'w':'l')+'">'+sc+'</b>'+(why?'<small>'+esc(why)+'</small>':'')+'<div class="td167r"><span style="--c:'+TC[L]+'">우리 팀 · '+mates+'</span><span style="--c:'+TC[1-L]+'">상대 팀 · '+foes+'</span></div>'+gold+
   (M.ranked?'<div class="pvRec2">팀 결투 전적 '+(s.wins||0)+'승 '+(s.losses||0)+'패</div>':'')+'</div>';
  const out=()=>{$('overlay').hidden=true;DU.end();try{toLobby()}catch(e){}};
  const btns=M.ranked?[['👥 다시 팀 대전 찾기',()=>{out();setTimeout(search,300)},true],['로비로',out,false]]
   :(host()&&D.on&&M.roster.every(r=>present(r.sl)||r.sl===mySl())?[['↺ 다시 결투',()=>{DU.send({t:'rm'});rematch()},true],['방 나가기',out,false]]:[[D.on?'⏳ 방장이 다시 결투를 누르면 시작':'로비로',()=>{if(!D.on)out()},true],['방 나가기',out,false]]);
  try{showOverlay(win?'VICTORY':'DEFEAT',win?'팀 승리!':'팀 패배',html,btns)}catch(e){}}
 function rematch(){$('overlay').hidden=true;try{TW71.music&&TW71.music()}catch(e){}M.sc=[0,0];M.round=1;M.over=false;M.res=null;try{const t=T();t.dead=false}catch(e){}roundReset()}
 function reset(){M.on=false;M.ph='';P.downDuo=false;for(const k in O)delete O[k];paint()}
 /* 다른 파일이 「결투 중」으로 보게(탑 층 표시 숨김 · 레벨 특성 0 · 친구창 등) */
 if(window.PVP92){const f=PVP92.on;PVP92.on=function(){return f.apply(this,arguments)||on()}}

 /* ---------- 빠른 대전 찾기 카드 ---------- */
 const S={on:false,t0:0,q:0,err:'',busy:0,iv:0};
 const card=document.createElement('div');card.id='tq167';card.hidden=true;document.body.appendChild(card);card.addEventListener('pointerdown',e=>e.stopPropagation());
 function search(){try{if(!acc().token){try{ACCT55.open()}catch(e){}return}}catch(e){}if(D.started||S.on)return;try{if(D.on)DU.end()}catch(e){}
  closePanel();try{DU.closeUI()}catch(e){}S.on=true;S.t0=Date.now();S.err='';S.q=1;card.hidden=false;paintCard();poll();clearInterval(S.iv);S.iv=setInterval(poll,1000);try{gmSfx('ok')}catch(e){}}
 function stop(){S.on=false;clearInterval(S.iv);card.hidden=true;api('/api/team/qcancel','POST',{}).catch(()=>{})}
 async function poll(){if(!S.on||S.busy)return;if(typeof mode!=='undefined'&&mode!=='menu'&&mode!=='plaza'){stop();return}
  S.busy=1;try{const r=await api('/api/team/queue','POST',{lv:DU.myLv(),ch:DU.myCh()});if(!S.on)return;
   if(r.s!==200){S.err=(r.j&&r.j.error)||'서버 연결을 기다리는 중…';paintCard();return}S.err='';
   if(r.j.room){S.on=false;clearInterval(S.iv);const room=r.j.room,mine=(room.players||[]).find(p=>p.me)||{};S.found=room;paintCard();try{sfx(880,.08,'square',.05,1320);setTimeout(()=>sfx(1320,.12,'square',.05,1760),90)}catch(e){}
    setTimeout(()=>{card.hidden=true;S.found=null},1400);Object.assign(D,{on:true,code:room.code,role:mine.owner?'host':'guest',room,since:0,started:false,out:[]});return}
   S.q=r.j.queue||1;paintCard()}catch(e){}finally{S.busy=0}}
 function paintCard(){const sec=Math.floor((Date.now()-S.t0)/1000),mm=Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0'),n=Math.min(4,S.q||1);
  card.innerHTML='<div class="mc'+(S.found?' ok':'')+'"><div class="sl4">'+[0,1,2,3].map(i=>'<i class="'+(S.found||i<n?'on':'')+'" style="--c:'+TC[i>>1]+'"></i>').join('')+'</div><div class="tx">'+
   (S.found?'<b>4명 모였어요!</b><small>'+TN[((S.found.players||[]).find(p=>p.me)||{}).sl>>1]+'으로 싸워요 · 곧 시작</small>':
    '<b>2:2 팀 대전 찾는 중…</b><small>'+mm+' · <em>'+n+' / 4명</em> 모임'+(n<4?' · '+(4-n)+'명 더 기다리는 중':'')+'</small>'+(S.err?'<small class="er">'+esc(S.err)+'</small>':''))+
   '</div>'+(S.found?'':'<button class="cx">취소</button>')+'</div>';const cx=card.querySelector('.cx');if(cx)cx.onclick=stop}
 setInterval(()=>{if(S.on)paintCard()},1000);

 /* ---------- 창: 처음 · 친구 방 ---------- */
 const box=document.createElement('div');box.id='td167';box.hidden=true;document.body.appendChild(box);box.addEventListener('pointerdown',e=>e.stopPropagation());
 const V={view:'home',msg:'',stats:null,lastH:''};
 function openPanel(v){V.view=v||'home';V.msg='';box.hidden=false;V.lastH='';paint();if(V.view==='home')loadStats()}
 function closePanel(){box.hidden=true}
 async function loadStats(){if(!acc().token)return;const r=await api('/api/team/stats');if(r.s===200){V.stats=r.j;paint()}}
 function seat(sl){const p=pl().find(q=>q.sl===sl),me=p&&p.me;
  if(!p)return '<button class="st emp" data-sl="'+sl+'" style="--c:'+TC[sl>>1]+'"><i>＋</i><b>빈자리</b><small>눌러서 이 자리로</small></button>';
  return '<div class="st'+(me?' me':'')+'" style="--c:'+TC[sl>>1]+'"><canvas width="48" height="56" data-ch="'+(p.ch|0)+'" data-fl="'+(sl>>1)+'"></canvas><b>'+(p.owner?'👑 ':'')+esc(p.name)+(me?' (나)':'')+'</b><small>Lv.'+(p.lv||1)+' · '+(p.online?(p.ready?'<em class="ok">준비 완료</em>':'<em>준비 중</em>'):'<em class="off">연결 끊김</em>')+'</small></div>'}
 function html(){const st=V.stats||{};
  const hd=(tt,sub)=>'<div class="hd"><button class="bk">닫기</button><i>👥</i><div><b>'+tt+'</b><small>'+sub+'</small></div></div>';
  if(V.view==='room'&&isRoom()&&!D.started){const r=D.room,n=pl().length,me=meP(),ok=n===4&&[0,1].every(t=>pl().filter(p=>p.sl>>1===t).length===2),allR=pl().every(p=>p.ready);
   return '<div class="pn">'+hd('팀 결투 방','친구 4명 · 빈자리를 눌러 팀을 골라요 · 골드는 오가지 않아요')+
    '<div class="code"><small>방 코드</small><div>'+[...(r.code||'')].map(c=>'<i>'+esc(c)+'</i>').join('')+'</div><button class="cp">복사</button></div>'+
    '<div class="tm2">'+[0,1].map(t=>'<div class="tc" style="--c:'+TC[t]+'"><h4>'+TN[t]+'</h4>'+seat(t*2)+seat(t*2+1)+'</div>').join('<div class="vs">VS</div>')+'</div>'+
    '<div class="act">'+(me.owner?'<button class="go"'+(ok&&allR?'':' disabled')+'>⚔ 시작하기</button>':'<button class="rd'+(me.ready?' on':'')+'">'+(me.ready?'✔ 준비 완료':'준비 완료 누르기')+'</button>')+'<button class="lv">방 나가기</button></div>'+
    '<div class="msg">'+esc(V.msg||(me.owner?(n<4?'친구 '+(4-n)+'명을 더 기다려요 · 코드를 알려 주세요':!ok?'팀마다 2명씩이어야 해요':!allR?'모두 「준비 완료」를 누르면 시작할 수 있어요':'준비 끝! 시작하기를 눌러요'):'방장이 시작하면 바로 싸워요'))+'</div></div>'}
  return '<div class="pn">'+hd('2:2 팀 결투','둘이 한 팀 · 3판 2선승 · 내 장비 그대로')+
   '<div class="cols"><div class="col"><h4>빠른 대전</h4><canvas class="art" width="240" height="96"></canvas>'+
    '<ul><li>4명이 모이면 <b>레벨이 고르게</b> 두 팀으로 나눠요</li><li>상대 팀 둘을 <b>모두 쓰러뜨리면</b> 라운드 승리 (90초가 지나면 팀 체력이 많은 쪽)</li><li>쓰러진 동료 곁에 <b>2.5초</b> 서 있으면 다시 일으켜요 (라운드에 한 번)</li><li>이기면 <b>🪙 '+num(st.win_gold||300)+'</b> · 져도 <b>🪙 '+num(st.lose_gold||60)+'</b> (하루 '+(st.cap||20)+'판까지)</li></ul>'+
    '<div class="rec"><span>전적</span><b class="w">'+(st.wins||0)+'승</b><b class="l">'+(st.losses||0)+'패</b><em>오늘 '+(st.today||0)+' / '+(st.cap||20)+'판 · 기다리는 사람 '+(st.queue||0)+'명</em></div>'+
    '<button class="big q">👥 팀 대전 찾기</button></div>'+
   '<div class="col"><h4>친구와 팀 결투</h4><p>친구 셋과 방 코드로 · 팀은 자리로 골라요 · 골드는 오가지 않아요</p><button class="big mk">🏟 팀 결투 방 만들기</button>'+
    '<h5>코드로 들어가기</h5><div class="jn"><input maxlength="4" placeholder="····" autocapitalize="characters" spellcheck="false" autocomplete="off"><button class="j">들어가기 ▶</button></div>'+
    '<div class="tip">💡 같은 팀은 서로 맞지 않아요 · 박자에 맞춰 치면 피해 ×1.5 · 상대 공격 순간 패링하면 튕겨내요 · 동료와 한 명을 같이 노려 보세요</div></div></div>'+
   '<div class="msg">'+esc(V.msg)+'</div></div>'}
 function paint(){if(box.hidden)return;if(V.view==='room'&&(!isRoom()||D.started)){if(!D.started)V.view='home';else{closePanel();return}}
  const h=html();if(h===V.lastH)return;V.lastH=h;const first=!box.firstChild;box.innerHTML=h;if(first)box.classList.add('in');wire()}
 function wire(){const q=s=>box.querySelector(s);
  q('.bk').onclick=()=>{if(V.view==='room'&&isRoom()&&!D.started){DU.end()}closePanel()};
  box.querySelectorAll('canvas[data-ch]').forEach(cv=>{const o=cv.getContext('2d');o.imageSmoothingEnabled=false;try{DU.hero(o,+cv.dataset.ch,24,54,1.1,performance.now(),cv.dataset.fl==='1')}catch(e){}});
  const art=q('canvas.art');if(art)drawArt(art);
  if(q('.q'))q('.q').onclick=search;
  if(q('.mk'))q('.mk').onclick=create;
  if(q('.j'))q('.j').onclick=()=>join((q('.jn input').value||'').trim().toUpperCase());
  if(q('.cp'))q('.cp').onclick=()=>{try{navigator.clipboard.writeText(D.code)}catch(e){}V.msg='코드를 복사했어요';V.lastH='';paint()};
  box.querySelectorAll('.st.emp').forEach(b=>b.onclick=()=>move(+b.dataset.sl));
  if(q('.rd'))q('.rd').onclick=()=>{const me=meP();D.wantReady=!me.ready;try{gmSfx('ok')}catch(e){}};
  if(q('.go'))q('.go').onclick=()=>{D.wantStart=true;V.msg='시작하는 중…';V.lastH='';paint()};
  if(q('.lv'))q('.lv').onclick=()=>{DU.end();V.view='home';V.lastH='';paint();loadStats()}}
 async function create(){if(!acc().token){closePanel();try{ACCT55.open()}catch(e){}return}V.msg='방을 만드는 중…';V.lastH='';paint();try{if(D.on)DU.end()}catch(e){}
  const r=await api('/api/team/create','POST',{lv:DU.myLv(),ch:DU.myCh()});if(r.s!==200){V.msg=(r.j&&r.j.error)||'방을 만들지 못했어요';V.lastH='';paint();return}
  Object.assign(D,{on:true,code:r.j.room.code,role:'host',room:r.j.room,since:0,started:false,out:[]});V.msg='';V.view='room';V.lastH='';paint()}
 async function join(code){if(!/^[A-Z0-9]{4}$/.test(code)){V.msg='방 코드 4자리를 넣어 주세요';V.lastH='';paint();return}if(!acc().token){closePanel();try{ACCT55.open()}catch(e){}return}
  V.msg='들어가는 중…';V.lastH='';paint();try{if(D.on)DU.end()}catch(e){}
  const r=await api('/api/duo/join','POST',{code,lv:DU.myLv(),ch:DU.myCh()});if(r.s!==200){V.msg=(r.j&&r.j.error)||'들어가지 못했어요';V.lastH='';paint();return}
  if(r.j.room.kind!=='team'){V.msg='팀 결투 방 코드가 아니에요';api('/api/duo/leave','POST',{code});V.lastH='';paint();return}
  Object.assign(D,{on:true,code,role:'guest',room:r.j.room,since:0,started:false,out:[]});V.msg='';V.view='room';V.lastH='';paint()}
 async function move(sl){const r=await api('/api/team/seat','POST',{code:D.code,sl});if(r.s===200){D.room=r.j.room;V.msg=''}else V.msg=(r.j&&r.j.error)||'옮기지 못했어요';V.lastH='';paint()}
 /* 빠른 대전 그림: 파랑 둘 · 빨강 둘 */
 function drawArt(cv){const o=cv.getContext('2d');o.imageSmoothingEnabled=false;const g=o.createLinearGradient(0,0,0,96);g.addColorStop(0,'#1a1430');g.addColorStop(1,'#0a0a14');o.fillStyle=g;o.fillRect(0,0,240,96);
  o.fillStyle='#ffffff10';for(let i=0;i<12;i++)o.fillRect(i*20,70,10,2);o.fillStyle='#2a2440';o.fillRect(0,78,240,18);
  const ch=DU.myCh();[[46,76,0],[78,86,0],[162,86,1],[194,76,1]].forEach(([x,y,t],i)=>{o.fillStyle=TC[t]+'55';o.beginPath();o.ellipse(x,y,14,4,0,0,6.28);o.fill();try{DU.hero(o,i===0?ch:(ch+i*3)%10,x,y,1,i*300,t===1)}catch(e){}});
  o.font='900 20px sans-serif';o.textAlign='center';o.fillStyle='#000';o.fillText('VS',121,52);o.fillStyle='#ffe79a';o.fillText('VS',120,50)}
 /* 방이 바뀌면 다시 그리기 · 듀오 창에서 팀 방 코드로 들어왔으면 이 창으로 */
 setInterval(()=>{try{if(isRoom()&&!D.started){if(DU.isOpen()&&DU.view()==='room'){DU.closeUI();openPanel('room')}if(!box.hidden)paint()}
  else if(!box.hidden&&V.view==='room')paint();
  if(!box.hidden&&V.view==='room'&&isRoom()&&!D.started){box.querySelectorAll('canvas[data-ch]').forEach(cv=>{const o=cv.getContext('2d');o.clearRect(0,0,48,56);try{DU.hero(o,+cv.dataset.ch,24,54,1.1,performance.now(),cv.dataset.fl==='1')}catch(e){}})}}catch(e){}},300);
 /* 결투 창에 단추 */
 setInterval(()=>{try{const b0=$('duo85');if(!b0||b0.hidden)return;const P2=b0.querySelector('.dP.dPv');if(!P2||P2.querySelector('.td167b'))return;const b=document.createElement('button');b.className='td167b';b.type='button';
  b.innerHTML='<i>👥</i><span><b>2:2 팀 결투</b><small>둘이 한 팀 · 빠른 대전 또는 친구 4명 방</small></span><em>열기 ▶</em>';b.onclick=()=>{try{DU.closeUI()}catch(e){}if(!acc().token){try{ACCT55.open()}catch(e){}return}openPanel('home')};
  const ref=P2.querySelector('.dCols')||P2.children[1];if(ref)ref.before(b);else P2.appendChild(b)}catch(e){}},500);

 const st=document.createElement('style');st.textContent=`
 #td167{position:fixed;inset:0;z-index:9300;display:grid;place-items:center;background:#000b;backdrop-filter:blur(3px);font-family:inherit;color:#e8f4ef}#td167[hidden]{display:none}
 #td167 .pn{position:relative;width:min(760px,calc(100vw - 20px));max-height:calc(100vh - 20px);overflow:auto;box-sizing:border-box;padding:14px 16px 12px;border-radius:18px;
  background:radial-gradient(120% 70% at 50% 0%,#24204a,#0a0c16 70%);border:1px solid #8a7aff55;box-shadow:0 20px 60px #000c,0 0 0 1px #000}
 #td167.in .pn{animation:td167in .22s ease-out}@keyframes td167in{from{transform:translateY(10px) scale(.98);opacity:0}}
 #td167 .hd{display:flex;align-items:center;gap:10px;margin-bottom:10px}#td167 .hd>i{font-style:normal;font-size:22px;width:40px;height:40px;display:grid;place-items:center;border-radius:12px;background:linear-gradient(180deg,#2a2a6a,#120f30);border:1px solid #8a7aff88}
 #td167 .hd b{display:block;font-size:19px;letter-spacing:.04em;background:linear-gradient(90deg,#5ab8ff,#fff,#ff5a6a);-webkit-background-clip:text;background-clip:text;color:transparent}#td167 .hd small{font-size:11.5px;color:#9ab0c8}
 #td167 .cols{display:grid;grid-template-columns:1fr 1fr;gap:12px}#td167 .col{display:flex;flex-direction:column;gap:8px;padding:12px;border-radius:14px;background:linear-gradient(180deg,#141a2a,#0a0e18);border:1px solid #ffffff14}
 #td167 h4{margin:0;font-size:14px;color:#fff}#td167 h5{margin:6px 0 0;font-size:12px;color:#9ab0c8}#td167 p{margin:0;font-size:12px;color:#cfd8e6}
 #td167 .art{width:100%;aspect-ratio:240/96;image-rendering:pixelated;border-radius:10px;border:1px solid #8a7aff44}
 #td167 ul{margin:0;padding-left:18px;font-size:12px;line-height:1.7;color:#cfd8e6}#td167 ul b{color:#ffd166}
 #td167 .rec{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;padding:7px 10px;border-radius:10px;background:#0b1319;border:1px solid #ffffff14;font-size:12px}#td167 .rec span{color:#9ab8ac}#td167 .rec .w{color:#7dffa8}#td167 .rec .l{color:#ff8a9a}#td167 .rec em{margin-left:auto;font-style:normal;color:#bfd0ff;font-size:11px}
 #td167 .big{font:inherit;font-weight:900;font-size:17px;padding:12px;border-radius:12px;border:0;cursor:pointer;color:#fff;background:linear-gradient(90deg,#3a8aff,#8a5aff 50%,#ff3a5a);box-shadow:0 0 0 2px #000,inset 0 2px 0 #ffffff55,0 6px 20px #8a5aff55}
 #td167 .big.mk{background:linear-gradient(180deg,#e8d8ff,#9a6aff);color:#140a2a}
 #td167 .jn{display:flex;gap:6px}#td167 .jn input{flex:1;min-width:0;font-family:ui-monospace,Menlo,monospace;font-size:24px;font-weight:900;letter-spacing:.5em;text-indent:.5em;text-align:center;padding:6px;color:#ffe79a;background:#05090c;border:2px solid #8a7aff66;border-radius:12px;text-transform:uppercase}
 #td167 .jn button,#td167 .cp,#td167 .act button{font:inherit;font-weight:900;font-size:13px;padding:8px 14px;border-radius:10px;border:0;cursor:pointer;background:linear-gradient(180deg,#c8f4ff,#5ab8e8);color:#04121a}
 #td167 .tip{margin-top:auto;font-size:11px;line-height:1.6;color:#9ab0c8;padding:8px 10px;border-radius:10px;background:#0b1319;border:1px dashed #ffffff1c}
 #td167 .msg{min-height:16px;margin-top:8px;text-align:center;font-size:12px;color:#ffe79a}
 #td167 .code{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:10px}#td167 .code small{font-size:11px;letter-spacing:.2em;color:#9ab0c8;font-weight:900}#td167 .code div{display:flex;gap:5px}
 #td167 .code i{font-style:normal;width:40px;height:48px;display:grid;place-items:center;font-size:28px;font-weight:900;font-family:ui-monospace,Menlo,monospace;color:#ffe79a;background:linear-gradient(180deg,#1a242c,#05090c);border:2px solid #ffe79a66;border-radius:10px}
 #td167 .tm2{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center}#td167 .vs{font-size:22px;font-weight:900;color:#ffe79a;text-shadow:0 0 12px #ffd16688}
 #td167 .tc{display:flex;flex-direction:column;gap:8px;padding:10px;border-radius:14px;background:linear-gradient(180deg,color-mix(in srgb,var(--c) 18%,#0c1018),#0a0c14);border:1px solid color-mix(in srgb,var(--c) 50%,transparent)}
 #td167 .tc h4{text-align:center;color:var(--c)}
 #td167 .st{display:grid;grid-template-columns:48px 1fr;grid-template-rows:auto auto;column-gap:8px;align-items:center;padding:6px 8px;border-radius:12px;background:#0b1319;border:1px solid #ffffff14;min-height:60px;text-align:left}
 #td167 .st canvas{grid-row:1/3;width:48px;height:56px;image-rendering:pixelated}#td167 .st b{font-size:13px}#td167 .st small{font-size:11px;color:#9ab0c8}#td167 .st em{font-style:normal;color:#ffb070}#td167 .st em.ok{color:#7dffa8}#td167 .st em.off{color:#ff8a9a}
 #td167 .st.me{border-color:var(--c);box-shadow:0 0 12px color-mix(in srgb,var(--c) 40%,transparent)}
 #td167 .st.emp{font:inherit;color:#9ab0c8;cursor:pointer;border:1px dashed color-mix(in srgb,var(--c) 60%,transparent);background:transparent}#td167 .st.emp i{grid-row:1/3;font-style:normal;font-size:22px;text-align:center;color:var(--c)}#td167 .st.emp b{color:#cfd8e6}
 #td167 .act{display:flex;justify-content:center;gap:8px;margin-top:12px}#td167 .act .go{font-size:16px;padding:10px 22px;background:linear-gradient(90deg,#3a8aff,#ff3a5a);color:#fff}#td167 .act button:disabled{background:#2a3436;color:#8a9a9a;cursor:default}
 #td167 .act .rd.on{background:linear-gradient(180deg,#d4ffe6,#3ad16a)}#td167 .act .lv{background:#2a3436;color:#e8f4ef}
 @media (max-width:640px){#td167 .cols{grid-template-columns:1fr}#td167 .tm2{grid-template-columns:1fr}#td167 .vs{text-align:center;font-size:16px}#td167 .code i{width:34px;height:40px;font-size:22px}}
 html.lpL #td167 .pn{padding:10px 12px}html.lpL #td167 ul{display:none}html.lpL #td167 .art{display:none}
 #tq167{position:fixed;left:50%;top:14px;transform:translateX(-50%);z-index:9420;font-family:inherit}#tq167[hidden]{display:none}
 #tq167 .mc{display:flex;align-items:center;gap:12px;padding:10px 12px 10px 10px;min-width:300px;max-width:calc(100vw - 20px);background:linear-gradient(180deg,#24204a,#0e1028);color:#eef4ff;border-radius:6px;box-shadow:0 0 0 3px #000,0 0 0 5px #8a7aff,0 0 0 7px #000,0 10px 30px #000c}
 #tq167 .mc.ok{box-shadow:0 0 0 3px #000,0 0 0 5px #7ae06a,0 0 0 7px #000,0 10px 30px #000c}
 #tq167 .sl4{display:grid;grid-template-columns:repeat(2,18px);gap:4px;flex:none}#tq167 .sl4 i{width:18px;height:18px;border-radius:5px;background:#1a1e30;box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--c) 50%,#000);animation:tq167b 1.2s ease-in-out infinite}
 #tq167 .sl4 i.on{background:var(--c);animation:none;box-shadow:0 0 8px var(--c),inset 0 0 0 2px #fff6}@keyframes tq167b{50%{opacity:.4}}
 #tq167 .tx{flex:1;min-width:0}#tq167 .tx b{display:block;font-size:15px;font-weight:900;text-shadow:1px 1px 0 #000}#tq167 .ok .tx b{color:#a6f5a0}#tq167 .tx small{display:block;font-size:11.5px;color:#b8c0e8;margin-top:2px}#tq167 .tx em{font-style:normal;color:#ffd166;font-weight:900}#tq167 .tx .er{color:#ffb0b0}
 #tq167 .cx{padding:8px 12px;border:0;font:inherit;font-weight:900;font-size:13px;cursor:pointer;background:#3a3f5a;color:#dfe4ff;box-shadow:0 0 0 2px #000}
 #duo85 .td167b{display:flex;align-items:center;gap:12px;width:100%;margin:0 0 10px;padding:10px 14px;border:0;cursor:pointer;font:inherit;text-align:left;border-radius:12px;color:#fff;
  background:linear-gradient(90deg,#2a6aff,#7a4aff 50%,#ff3a5a);box-shadow:0 0 0 2px #000,inset 0 2px 0 #ffffff55,inset 0 -3px 0 #0006,0 0 18px #7a4aff55}
 #duo85 .td167b i{font-style:normal;font-size:24px}#duo85 .td167b span{flex:1;display:flex;flex-direction:column}#duo85 .td167b b{font-size:17px;font-weight:900}#duo85 .td167b small{font-size:11px;opacity:.9}
 #duo85 .td167b em{font-style:normal;font-weight:900;font-size:14px;padding:6px 12px;background:#0a0a20;color:#ffd166;border-radius:8px}
 html.lpL #duo85 .td167b{padding:6px 10px;margin-bottom:6px}html.lpL #duo85 .td167b b{font-size:14px}html.lpL #duo85 .td167b small{display:none}
 .td167r{display:flex;flex-direction:column;gap:3px;font-size:12px}.td167r span{padding:3px 10px;border-radius:8px;background:color-mix(in srgb,var(--c) 18%,#0b1319);border-left:3px solid var(--c)}`;document.head.appendChild(st);
 window.TD167={on,isRoom,msg,begin,ko,list,reset,search,stop,open:openPanel,close:closePanel,M,O,S};
}catch(e){console.error('v167 team duel',e)}})();
