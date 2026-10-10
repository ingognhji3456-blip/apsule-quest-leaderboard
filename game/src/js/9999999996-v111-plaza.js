/* ================= v111 광장 (PLZ111) =================
   - 로비 메뉴 「⛲ 광장」(GM_ITEMS 맨 끝 · 폰은 999995 NAV 맨 앞) → mode='plaza'. 탑 아래 광장 맵(960×300의 두 배 넓이)을 걸어 다닌다.
     싸움 없음: 공격 · 대시 · 패링 · 궁극기는 꺼짐. 움직이기는 방향키/WASD 또는 땅을 누르면 그곳으로 걸어감(폰은 누르기만).
   - 서버 /api/plaza/sync(0.2~0.35초마다): 내 위치 · 모습(캐릭터 · 무기 · 스킨 · 펫)을 올리고 같은 광장 사람들을 받는다.
     한 광장 30명, 꽉 차면 광장 2 … (위쪽 막대에서 광장을 고를 수 있음). 다른 사람은 듀오 동료 그리기(DUO85.drawMate)로 그린다(펫은 v108).
   - 사람을 두 번 누르면(폰은 한 번) 정보 창: 레벨 · 탑 최고 층 · 결투 등급 · 장비, 「친구 추가」 · 「⚔ 결투 신청」(친선, 골드 없음) · 「🤝 듀오 신청」.
     결투 · 듀오는 친구창(FR94.duel/duo) 흐름을 그대로 쓰고, 서버는 광장에 같이 있으면 친구가 아니어도 신청을 받아 준다(10초에 한 번).
     받은 신청은 sync 답의 invites → FR94.gotInv(친구창의 수락/거절 알림).
   - 「신청 받기」 끄기: saveData.plz111.noinv → 서버가 신청을 막음. */
(()=>{try{
 if(!window.DUO85||!window.TW71)return;
 const DU=DUO85,D=DU.state,api=DU.api,acc=DU.acc,esc=DU.esc,$=id=>document.getElementById(id);
 const WW=960,WH=600,SPD=92;
 const S={on:false,room:0,want:0,O:{},n:0,busy:0,last:0,cnt:0,rooms:[],tgt:null,cam:{x:0,y:0},clickT:0,clickN:'',info:null,pet:{x:null,y:null,t:0},bg:null,err:''};
 const sv=()=>saveData.plz111||(saveData.plz111={noinv:false});
 /* ---------- 맵: 탑 아래 광장 ---------- */
 const FOUNT={x:480,y:340,r:50};
 const TREES=[[90,240],[150,520],[60,420],[870,250],[820,520],[905,410],[300,560],[660,565]];
 const LAMPS=[[340,250],[620,250],[340,440],[620,440],[200,330],[760,330]];
 const BENCH=[[250,250,1],[710,250,1],[250,450,0],[710,450,0]];
 const OBST=[{x:FOUNT.x,y:FOUNT.y,r:FOUNT.r+8,ky:1.6},...TREES.map(([x,y])=>({x,y:y+2,r:13,ky:1.6})),...LAMPS.map(([x,y])=>({x,y,r:5,ky:1.6}))];
 const TOPY=176;/* 탑 · 성벽 아래로만 걸을 수 있음 */
 function px(o,x,y,w,h,c){o.fillStyle=c;o.fillRect(x,y,w,h)}
 function buildBg(){const cv=document.createElement('canvas');cv.width=WW;cv.height=WH;const o=cv.getContext('2d');let sd=7;const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647;
  /* 하늘 · 먼 산 */const g=o.createLinearGradient(0,0,0,170);g.addColorStop(0,'#141a33');g.addColorStop(1,'#2d3a5c');o.fillStyle=g;o.fillRect(0,0,WW,170);
  for(let i=0;i<70;i++)px(o,Math.floor(rnd()*WW),Math.floor(rnd()*110),1,1,rnd()<.3?'#ffe9a8':'#cfe0ff');
  o.fillStyle='#232c48';for(let x=0;x<WW;x+=4){const h=40+Math.sin(x/70)*14+Math.sin(x/23)*6;o.fillRect(x,170-h,4,h)}
  /* 성벽 */for(let x=0;x<WW;x+=24){px(o,x,120,24,56,(x/24)%2?'#4a4f63':'#454a5e');px(o,x,120,24,2,'#5d6378');for(let y=128;y<176;y+=8)px(o,x+((y/8)%2?0:12),y,1,8,'#383c4d');px(o,x,136,24,1,'#383c4d')}
 for(let x=0;x<WW;x+=32){px(o,x+4,108,16,14,'#4f5569');px(o,x+4,108,16,2,'#6a7088')}
  /* 탑(가운데) */const tx=400,tw=160;
  for(let y=0;y<176;y+=10)for(let x=tx;x<tx+tw;x+=20){const off=(y/10)%2?10:0;px(o,x+off-10,y,20,10,((x+y)/10)%3===0?'#5a6178':'#535a70');px(o,x+off-10,y,20,1,'#6c7390');px(o,x+off-10,y,1,10,'#444a5e')}
  px(o,tx-6,0,6,176,'#3d4255');px(o,tx+tw,0,6,176,'#3d4255');
  for(const [wx,wy] of [[tx+30,30],[tx+tw-46,30],[tx+30,80],[tx+tw-46,80]]){px(o,wx,wy,16,22,'#1c2033');px(o,wx+2,wy+2,12,18,'#ffcf6a');px(o,wx+7,wy+2,2,18,'#1c2033');px(o,wx+2,wy+10,12,2,'#1c2033')}
  /* 문 */px(o,tx+52,110,56,66,'#2a2018');for(let i=0;i<14;i++){const w=Math.round(28*Math.sqrt(1-((14-i)/14)**2));px(o,tx+80-w,96+i,w*2,1,'#2a2018')}
  px(o,tx+56,114,48,62,'#5a3a22');for(let x=tx+60;x<tx+104;x+=8)px(o,x,114,1,62,'#46301c');px(o,tx+78,140,4,4,'#ffd166');
  px(o,tx+44,104,72,6,'#6c7390');o.fillStyle='#ffd166';o.font='bold 9px sans-serif';o.textAlign='center';o.fillText('▲ TOWER ▲',tx+80,100);
  /* 깃발 */for(const fx of [tx-30,tx+tw+22]){px(o,fx,40,2,80,'#8a8f9c');px(o,fx+2,42,22,30,'#b0283c');px(o,fx+2,42,22,3,'#ffd166');px(o,fx+8,52,10,10,'#ffd166')}
  /* 바닥: 돌길 */for(let y=176;y<WH;y+=12)for(let x=-((y/12)%2)*14;x<WW;x+=28){const c=rnd();px(o,x,y,28,12,c<.33?'#5b6072':c<.66?'#565b6c':'#606578');px(o,x,y,28,1,'#6b7084');px(o,x,y,1,12,'#4a4e5e')}
  /* 가운데 둥근 무늬 */for(let r=150;r>60;r-=18){o.strokeStyle=r%36?'#6e7489':'#4e5366';o.lineWidth=5;o.beginPath();o.ellipse(FOUNT.x,FOUNT.y,r,r/1.6,0,0,6.28);o.stroke()}
  /* 탑 앞 길 */for(let y=176;y<FOUNT.y-70;y+=12){px(o,452,y,56,12,(y/12)%2?'#7a6a52':'#74644d');px(o,452,y,56,1,'#8a7a60')}
  /* 꽃밭 */for(const [bx,by] of [[40,190],[820,190],[40,560],[830,560]]){px(o,bx,by,100,26,'#3c5a34');for(let i=0;i<22;i++)px(o,bx+4+Math.floor(rnd()*92),by+3+Math.floor(rnd()*20),2,2,['#ff6a8a','#ffd166','#ffffff','#b48aff'][i%4])}
  /* 게시판 */px(o,560,186,48,30,'#6a4a2a');px(o,562,188,44,24,'#d8c49a');for(let i=0;i<4;i++)px(o,566,192+i*5,30-i*4,2,'#8a7a5a');px(o,566,216,4,14,'#4a3218');px(o,598,216,4,14,'#4a3218');
  /* 의자 */for(const [x,y,h] of BENCH){px(o,x-16,y-4,32,5,'#7a5530');px(o,x-16,y-4,32,1,'#9a7448');px(o,x-14,y+1,3,6,'#4a3218');px(o,x+11,y+1,3,6,'#4a3218');if(h)px(o,x-16,y-12,32,4,'#6a4a2a')}
  return cv}
 function drawFountain(now,t){const {x,y,r}=FOUNT;const c=ctx;
  c.fillStyle='#3a4052';c.beginPath();c.ellipse(x,y+4,r+6,(r+6)/1.6,0,0,6.28);c.fill();c.fillStyle='#6a7088';c.beginPath();c.ellipse(x,y,r+4,(r+4)/1.6,0,0,6.28);c.fill();
  c.fillStyle='#2a6aa8';c.beginPath();c.ellipse(x,y,r-2,(r-2)/1.6,0,0,6.28);c.fill();
  c.globalAlpha=.35;c.fillStyle='#8ad8ff';for(let i=0;i<3;i++){const q=((t*.5+i/3)%1);c.beginPath();c.ellipse(x,y,6+q*(r-8),(6+q*(r-8))/1.6,0,0,6.28);c.strokeStyle='#bff0ff';c.lineWidth=1;c.globalAlpha=.4*(1-q);c.stroke()}c.globalAlpha=1;
  c.fillStyle='#7a8098';c.fillRect(x-6,y-26,12,26);c.fillStyle='#8a90a8';c.fillRect(x-14,y-30,28,5);
  for(let i=0;i<14;i++){const a=i/14*6.28+t,q=(t*1.6+i*.37)%1,d=q*26,h=Math.sin(q*Math.PI)*22;c.fillStyle=i%3?'#bff0ff':'#ffffff';c.globalAlpha=.85*(1-q*.6);c.fillRect(x+Math.cos(a)*d-1,y-30-h+Math.sin(a)*d/1.6+q*30,2,2)}c.globalAlpha=1}
 function drawTree(x,y){const c=ctx;c.globalAlpha=.3;c.fillStyle='#000';c.beginPath();c.ellipse(x,y+3,16,5,0,0,6.28);c.fill();c.globalAlpha=1;c.fillStyle='#5a3a22';c.fillRect(x-3,y-16,6,18);
  for(const [dx,dy,r,col] of [[0,-30,16,'#2f6a3a'],[-9,-24,11,'#2a5e34'],[9,-24,11,'#2a5e34'],[-3,-36,9,'#3d8048'],[5,-33,6,'#4c9656']]){c.fillStyle=col;c.beginPath();c.arc(x+dx,y+dy,r,0,6.28);c.fill()}}
 function drawLamp(x,y,t){const c=ctx,fl=.75+.25*Math.sin(t*7+x);const g=c.createRadialGradient(x,y-28,0,x,y-28,30);g.addColorStop(0,'rgba(255,210,120,'+(.35*fl)+')');g.addColorStop(1,'rgba(255,210,120,0)');c.fillStyle=g;c.fillRect(x-30,y-58,60,60);
  c.fillStyle='#2a2e3c';c.fillRect(x-1,y-26,3,28);c.fillRect(x-4,y,8,2);c.fillStyle='#3a3f50';c.fillRect(x-4,y-32,8,7);c.fillStyle='rgba(255,220,140,'+fl+')';c.fillRect(x-3,y-31,6,5)}
 /* ---------- 들어가기 · 나가기 ---------- */
 function enter(){if(!acc().token){try{banner('광장은 로그인해야 들어갈 수 있어요')}catch(e){}try{window.ACCT55&&ACCT55.open&&ACCT55.open()}catch(e){}return}
  if(D.started){try{banner('경기 중에는 광장에 갈 수 없어요')}catch(e){}return}
  try{initAudio();stopMusic()}catch(e){}try{story=false}catch(e){}
  enterGame();$('overlay').hidden=true;mode='plaza';paused=false;try{resetP(480,470)}catch(e){P.x=480;P.y=470}P.face={x:0,y:1};
  S.on=true;S.O={};S.tgt=null;S.err='';S.last=0;S.pet={x:null,y:null,t:0};if(!S.bg)S.bg=(window.PLZART&&PLZART.build())||buildBg();
  document.documentElement.classList.add('plz111');try{$('bvTitle').textContent='BEAT BLADE · ⛲ 광장'}catch(e){}bar.hidden=false;paintBar();last=performance.now()}
 function leave(){if(!S.on)return;S.on=false;S.O={};hideInfo();S.say=null;S.mySay=null;S.log=[];try{chatBox.hidden=true;inp.blur()}catch(e){}try{pv.hidden=true;S.hiW=0;document.documentElement.classList.remove('plzP')}catch(e){}bar.hidden=true;document.documentElement.classList.remove('plz111');api('/api/plaza/leave','POST',{}).catch(()=>{})}
 let last=0;
 /* ---------- 서버와 주고받기 ---------- */
 const lookNow=()=>{const e=shopInv().eq||{};let sk='',pv='',lv=1;try{sk=SKIN58.get()||''}catch(_){}try{pv=(window.PET59&&PET59.get())||''}catch(_){}try{lv=DU.myLv()}catch(_){}return {ch:DU.myCh(),wp:e.wp||0,pt:e.pt||0,sk,pv,lv}};
 async function sync(){if(!S.on||mode!=='plaza'||S.busy>=2)return;const iv=S.cnt>12?350:S.cnt>6?220:160;/* v117 적으면 더 자주 */if(performance.now()-S.last<iv)return;S.last=performance.now();S.busy++;
  try{const me=Object.assign({x:Math.round(P.x),y:Math.round(P.y),fx:P.face.x<0?-1:1,fy:Math.round((P.face.y||0)*10)/10,w:P.walkOn?1:0,ts:Math.round(performance.now()),n:++S.n},lookNow());if(S.say){me.say=S.say.text;me.sid=S.say.sid}/* v113 말풍선 */if(S.emo&&performance.now()-S.emo.t<3200)me.emo=S.emo.i+'|'+S.emo.s;/* v117 이모티콘 */
   /* v140: 지난 0.7초 길 「시간차(10ms).x.y」 — 서버는 마지막 위치 하나만 들고 있어 남들이 띄엄띄엄 받았음 */try{const L=(S.trl||[]).filter(q=>me.ts-q.t>30&&me.ts-q.t<720);if(L.length)me.tr=L.map(q=>Math.round((me.ts-q.t)/10)+'.'+Math.round(q.x)+'.'+Math.round(q.y)).join(',').slice(0,238).replace(/,[^,]*$/,m=>m.split('.').length===3?m:'')}catch(e){}
   const r=await api('/api/plaza/sync','POST',{room:S.want||0,me,noinv:!!sv().noinv});if(!S.on)return;
   if(r.s!==200){S.err=r.s===401?'로그인이 필요해요':'서버 연결을 기다리는 중…';paintBar();return}S.err='';
   S.room=r.j.room;if(S.want===S.room)S.want=0;sayAck(r.j.sid,r.j.say);S.rooms=r.j.rooms||[];S.cnt=(r.j.players||[]).length+1;feed(r.j.players||[]);
   try{r.j.invites&&r.j.invites.length&&window.FR94&&FR94.gotInv(r.j.invites)}catch(e){}paintBar()}
  catch(e){}finally{S.busy--}}
 setInterval(()=>{if(S.on&&mode!=='plaza')leave();try{sync()}catch(e){}try{const hide=!S.on||DU.isOpen();if(bar.hidden!==hide)bar.hidden=hide}catch(e){}},60);/* 듀오 · 결투 방 창이 열려 있으면 막대는 숨김 */
 function feed(list){const now=performance.now(),seen=new Set();
  for(const p of list){if(!p.name)continue;seen.add(p.name);let M=S.O[p.name];if(!M)M=S.O[p.name]={_spec:1,nm:p.name,hs:[],ring:'#a6f5c6',nmc:'#e8f4ef',noHp:1,hp:1,mx:1};
   if(p.ts==null)continue;
   /* v117: 상대가 페이지를 새로 열면 번호(n) · 시계(ts)가 처음부터 다시 시작 → 예전 기록과 섞이면 새 위치를 「옛것」으로 버려 멈춰 보였음. 새 사람처럼 다시 시작 */
   if(M.lastTs!=null&&(p.ts<M.lastTs-500||p.n<M.lastN-20)){M=S.O[p.name]={_spec:1,nm:p.name,hs:[],ring:'#a6f5c6',nmc:'#e8f4ef',noHp:1,hp:1,mx:1}}M.lastTs=p.ts;
   const o=now-p.ts;
   /* v117: 서버는 사람마다 마지막 위치 하나만 들고 있어서 새 위치가 0.2~0.45초마다 와요. 그 간격(gap)을 재서 1.6배+60ms(0.2~0.7초)만큼 늦게 그려
      두 위치 사이를 늘 이어 그림(예전 0.14초는 모자라 멈췄다가 툭 튀었음). 늦게 그리는 기준(off)은 천천히만 바뀌어 위치 순서가 뒤섞이지 않게 */
   if(M.lastN!==p.n){if(M.lastArr){const gp=Math.min(1500,now-M.lastArr);M.gap=M.gap?M.gap*.8+gp*.2:gp}M.lastArr=now;M.lastN=p.n}
   M.oMin=M.oMin==null||o<M.oMin?o:M.oMin+.3;/* v140: 걸은 길이 함께 오니 「소식이 늦게 오는 정도」(95%)+여유만큼만 늦게 그림(0.15~0.9초) — 전엔 간격×1.6이라 너무 늦어져 길 기록이 모자라 멈췄음 */
   if(M.lastN2!==p.n){M.lastN2=p.n;(M.jit||(M.jit=[])).push(o-M.oMin);if(M.jit.length>50)M.jit.shift()}const J=M.jit&&M.jit.length?M.jit.slice().sort((x,y)=>x-y)[Math.floor((M.jit.length-1)*.95)]:250;const want=M.oMin+Math.max(200,Math.min(900,Math.max((M.gap||300)*1.6+60,J+90)));
   M.off=M.off==null?want:want>M.off?M.off+(want-M.off)*.3:M.off-Math.min(2,M.off-want);
   M.lvT='Lv'+(p.lv||1)+' '+p.name;
   /* v140: 함께 온 길을 먼저 시간표에 넣음(이미 넣은 시각 뒤의 것만) → 띄엄띄엄 와도 걸은 그대로 이어 그림 */
   if(p.tr&&typeof p.tr==='string'){try{const T=p.tr.split(',').map(q=>q.split('.').map(Number)).filter(q=>q.length===3&&q.every(v=>isFinite(v))).sort((a,b)=>b[0]-a[0]);const k=T.length;
     const hl=M.hs&&M.hs.length?M.hs[M.hs.length-1].t:-1e15;T.forEach((q,i)=>{const ts=p.ts-q[0]*10;if((M.lastTrTs==null||ts>M.lastTrTs)&&ts<p.ts&&ts+(M.off||0)>hl){/* 시간표 순서가 꼬이지 않게 */DU.mateIn({x:q[1],y:q[2],ffx:p.fx,ffy:p.fy||0,fx:p.fx,n:p.n-1+(i+1)/(k+1),ts,ch:p.ch|0,wp:p.wp|0,sk:p.sk||'',pt:p.pt|0,pv:p.pv||'',hp:1,mx:1,w:1},M);M.lastTrTs=ts}})}catch(e){}}
   M.lastTrTs=Math.max(M.lastTrTs||0,p.ts);
   try{DU.mateIn({x:p.x,y:p.y,ffx:p.fx,ffy:p.fy||0,fx:p.fx,n:p.n,ts:p.ts,ch:p.ch|0,wp:p.wp|0,sk:p.sk||'',pt:p.pt|0,pv:p.pv||'',hp:1,mx:1,w:!!p.w},M)}catch(e){}M.nm=M.lvT;M.name=p.name;if(p.emo&&p.emo!==M.emoK){const [ei,es]=String(p.emo).split('|');M.emoK=p.emo;if(M.emoK0!==undefined||!p.age||p.age<2){M.emoI=+ei|0;M.emoT=now}}M.emoK0=1;
   if(p.say&&p.sid&&p.sid!==M.sid){M.sid=p.sid;M.say=p.say;M.sayT=now-(p.sayAge||0)*1000;if(p.sayAge==null||p.sayAge<6)logAdd(p.name,p.say)}}
  for(const k in S.O)if(!seen.has(k)){const M=S.O[k];M.gone=M.gone||now;if(now-M.gone>2500)delete S.O[k]}else S.O[k].gone=0}
 /* ---------- 움직이기 ---------- */
 function blocked(x,y){if(x<16||x>WW-16||y<TOPY+8||y>WH-8)return true;for(const b of OBST){const dx=x-b.x,dy=(y-b.y)*b.ky;if(dx*dx+dy*dy<b.r*b.r)return true}return false}
 function update(now,dt){let [ix,iy]=moveInput();let vx=0,vy=0;
  if(ix||iy){S.tgt=null;const l=Math.hypot(ix,iy)||1;vx=ix/l*SPD;vy=iy/l*SPD;P.face={x:ix,y:iy}}
  else if(S.tgt){const dx=S.tgt.x-P.x,dy=S.tgt.y-P.y,d=Math.hypot(dx,dy);if(d<3)S.tgt=null;else{vx=dx/d*SPD;vy=dy/d*SPD;P.face={x:Math.abs(dx)>4?Math.sign(dx):0,y:Math.abs(dy)>Math.abs(dx)?Math.sign(dy):0};if(!P.face.x&&!P.face.y)P.face={x:0,y:1}}}
  const moving=Math.hypot(vx,vy)>1;P.walkT=(P.walkT||0)+(moving?dt*9:0);P.walkOn=moving;
  if(moving){const nx=P.x+vx*dt,ny=P.y+vy*dt;if(!blocked(nx,ny)){P.x=nx;P.y=ny}else if(!blocked(nx,P.y))P.x=nx;else if(!blocked(P.x,ny))P.y=ny;else S.tgt=null}
  /* v140: 걸은 길을 0.05초마다 적어 둠(남들에게 0.7초치 길을 함께 보냄) */{const L=S.trl||(S.trl=[]);if(!L.length||now-L[L.length-1].t>=50)L.push({t:now,x:P.x,y:P.y});while(L.length&&now-L[0].t>800)L.shift()}
  S.cam.x=Math.max(0,Math.min(WW-W,P.x-W/2));S.cam.y=Math.max(0,Math.min(WH-H,P.y-H/2-10))}
 /* ---------- 그리기 ---------- */
 function drawMe(now){const c=ctx;c.globalAlpha=.4;c.fillStyle='#000';c.beginPath();c.ellipse(P.x,P.y+2,9,3,0,0,6.28);c.fill();c.globalAlpha=1;
  const fl=P.face.x<0,om=mode;mode='village';try{drawSword(P.x-12,P.y-19,2,fl,now);drawKnight(c,P.x-12,P.y-19,2,fl,P.walkOn?P.walkT:null,P.walkOn?null:now/430)}catch(e){}finally{mode=om}
  c.save();c.font='900 7px sans-serif';c.textAlign='center';const nm='Lv'+lookNow().lv+' '+(saveData.name||'나');c.fillStyle='#000';c.fillText(nm,P.x+.5,P.y-37.5);c.fillStyle='#ffd166';c.fillText(nm,P.x,P.y-38);c.restore()}
 function drawMyPet(now){const id=(shopInv().eq||{}).pt||0,K=1.0,side=(P.face&&P.face.x<0)?1:-1,tx=P.x+side*26,ty=P.y-4,F=S.pet,dt=Math.min(.05,Math.max(0,(now-(F.t||now))/1000));F.t=now;
  if(F.x==null||Math.hypot(tx-F.x,ty-F.y)>140){F.x=tx;F.y=ty}const k=Math.min(1,dt*5.5);F.x+=(tx-F.x)*k;F.y+=(ty-F.y)*k;
  const step=Math.hypot(tx-F.x,ty-F.y)>3?Math.abs(Math.sin(now/90))*1.5:0;try{drawPet(ctx,id,Math.round(F.x),Math.round(F.y+2-10*K-step),now,K)}catch(e){}}
 function draw(now){const c=ctx,t=now/1000;c.fillStyle='#141a2a';c.fillRect(0,0,W,H);c.save();c.translate(-Math.round(S.cam.x),-Math.round(S.cam.y));
  const ART=window.PLZART&&S.bg&&S.bg._art?PLZART:null;/* v115 사실적인 광장 그림 */
  if(ART){try{ART.under(c,now,S.cam)}catch(e){}}else{const sm=c.imageSmoothingEnabled;c.imageSmoothingEnabled=false;c.drawImage(S.bg,0,0);c.imageSmoothingEnabled=sm}
  /* 누른 곳 표시 */if(S.tgt){const q=(now%600)/600;c.strokeStyle='#a6f5c6';c.globalAlpha=1-q;c.lineWidth=1;c.beginPath();c.ellipse(S.tgt.x,S.tgt.y+2,4+q*6,2+q*3,0,0,6.28);c.stroke();c.globalAlpha=1}
  let L=[];if(ART){try{L=ART.objs(now)}catch(e){L=[]}}else{L.push({y:FOUNT.y,fn:()=>drawFountain(now,t)});for(const [x,y] of TREES)L.push({y,fn:()=>drawTree(x,y)});for(const [x,y] of LAMPS)L.push({y,fn:()=>drawLamp(x,y,t)})}
  for(const k in S.O){const M=S.O[k];if(M.x==null)continue;L.push({y:(M.sy!=null?M.sy:M.y)||0,fn:()=>{try{DU.drawMate(now,false,M)}catch(e){}}})}
  L.push({y:P.y-1,fn:()=>drawMyPet(now)});L.push({y:P.y,fn:()=>drawMe(now)});
  L.sort((a,b)=>a.y-b.y).forEach(o=>{try{o.fn()}catch(e){}});
  if(ART){try{ART.over(c,now,S.cam)}catch(e){}}
  try{drawBubbles(now)}catch(e){}
  /* 고른 사람 표시 */if(S.info&&S.O[S.info.name]){const M=S.O[S.info.name];c.strokeStyle='#ffd166';c.lineWidth=1.5;c.globalAlpha=.6+.4*Math.sin(t*6);c.beginPath();c.ellipse(M.sx,M.sy+2,14,5,0,0,6.28);c.stroke();c.globalAlpha=1}
  c.restore();
  if(portrait())return;
  /* 작은 지도 */const mw=72,mh=45,mx=W-mw-6,my=H-mh-6;c.globalAlpha=.75;c.fillStyle='#05070a';c.fillRect(mx-1,my-1,mw+2,mh+2);c.globalAlpha=.9;c.drawImage(S.bg,mx,my,mw,mh);c.globalAlpha=1;
  for(const k in S.O){const M=S.O[k];if(M.sx==null)continue;c.fillStyle='#a6f5c6';c.fillRect(mx+M.sx/WW*mw-1,my+M.sy/WH*mh-1,2,2)}c.fillStyle='#ffd166';c.fillRect(mx+P.x/WW*mw-1.5,my+P.y/WH*mh-1.5,3,3);
  c.strokeStyle='#ffffff55';c.strokeRect(mx+S.cam.x/WW*mw,my+S.cam.y/WH*mh,W/WW*mw,H/WH*mh)}
 {const _f=frame;frame=function(){if(mode!=='plaza')return _f.apply(this,arguments);const now=performance.now(),dt=Math.min((now-last)/1000,.05)||0;last=now;
  try{if(!paused)update(now,dt);draw(paused?pauseAtMs:now);paintPortrait()}catch(e){console.error('plaza',e)}requestAnimationFrame(frame)}}
 /* 광장에서는 싸움 동작 없음 */
 {const f=doAttack;doAttack=function(){if(mode==='plaza')return;return f.apply(this,arguments)}}
 {const f=doDash;doDash=function(){if(mode==='plaza')return;return f.apply(this,arguments)}}
 if(typeof tryParry==='function'){const f=tryParry;tryParry=function(){if(mode==='plaza')return;return f.apply(this,arguments)}}
 if(typeof tryUlt==='function'){const f=tryUlt;tryUlt=function(){if(mode==='plaza')return;return f.apply(this,arguments)}}
 {const f=toLobby;toLobby=function(){if(mode==='plaza')leave();return f.apply(this,arguments)}}
 /* ---------- 폰 세로: 그린 화면 중 내 캐릭터 둘레의 세로로 긴 부분을 화면 가득 크게 ----------
    게임 캔버스(480×300)는 가로라서 세로 폰에서는 작게 보였음. 그대로 그린 뒤 가운데 세로 띠(높이 300 전부, 폭은 화면 비율만큼)를 #plzView에 옮겨 그린다. */
 const pv=document.createElement('canvas');pv.id='plzView';pv.hidden=true;document.body.appendChild(pv);
 function portrait(){return S.on&&mode==='plaza'&&document.documentElement.classList.contains('phP')&&innerHeight>innerWidth}
 function paintPortrait(){const on=portrait();if(pv.hidden===on)pv.hidden=!on;document.documentElement.classList.toggle('plzP',on);if(!on){S.crop=null;if(S.hiW){S.hiW=0;try{fitBattle()}catch(e){}}return}
  const vw=innerWidth,vh=innerHeight,dpr=Math.min(2.5,devicePixelRatio||1),ww=Math.round(vw*dpr),hh=Math.round(vh*dpr);if(pv.width!==ww)pv.width=ww;if(pv.height!==hh)pv.height=hh;
  const cw0=Math.min(W,H*vw/vh),want=Math.round(W*vw/cw0);if(S.hiW!==want){S.hiW=want;try{applyHiRes(want)}catch(e){}}/* 확대해도 또렷하게 */
  const cv=$('game'),k=cv.width/W,cw=cw0,cx=Math.max(cw/2,Math.min(W-cw/2,P.x-S.cam.x)),x0=cx-cw/2;S.crop={x0,w:cw};
  const o=pv.getContext('2d');o.imageSmoothingEnabled=true;o.drawImage(cv,x0*k,0,cw*k,H*k,0,0,ww,hh);
  /* 작은 지도(오른쪽 아래, 단추 줄 위) */const mw=Math.round(ww*.3),mh=Math.round(mw*WH/WW),mx=ww-mw-Math.round(10*dpr),my=hh-mh-Math.round(14*dpr);
  o.globalAlpha=.8;o.fillStyle='#05070a';o.fillRect(mx-2,my-2,mw+4,mh+4);o.globalAlpha=.9;o.imageSmoothingEnabled=false;o.drawImage(S.bg,mx,my,mw,mh);o.globalAlpha=1;
  const d=Math.max(2,Math.round(2*dpr));for(const nm in S.O){const M=S.O[nm];if(M.sx==null)continue;o.fillStyle='#a6f5c6';o.fillRect(mx+M.sx/WW*mw-d/2,my+M.sy/WH*mh-d/2,d,d)}
  o.fillStyle='#ffd166';o.fillRect(mx+P.x/WW*mw-d,my+P.y/WH*mh-d,d*2,d*2);o.strokeStyle='#ffffff66';o.lineWidth=dpr;o.strokeRect(mx+(S.cam.x+x0)/WW*mw,my+S.cam.y/WH*mh,cw/WW*mw,H/WH*mh)}
 /* ---------- 누르기: 땅 = 걸어가기, 사람 = 정보(컴퓨터는 두 번, 폰은 한 번) ---------- */
 function toWorld(e){if(e.target===pv&&S.crop){const r=pv.getBoundingClientRect();return {x:S.crop.x0+(e.clientX-r.left)/r.width*S.crop.w+S.cam.x,y:(e.clientY-r.top)/r.height*H+S.cam.y}}
  const cv=$('game'),r=cv.getBoundingClientRect();if(!r.width)return null;return {x:(e.clientX-r.left)/r.width*W+S.cam.x,y:(e.clientY-r.top)/r.height*H+S.cam.y}}
 function pick(w){let best=null,bd=16;for(const k in S.O){const M=S.O[k];if(M.sx==null)continue;const d=Math.hypot(w.x-M.sx,(w.y-(M.sy-12))*.8);if(d<bd){bd=d;best=M}}
  if(!best&&Math.hypot(w.x-P.x,(w.y-(P.y-12))*.8)<14)return {name:saveData.name||'',me:1};return best}
 document.addEventListener('pointerdown',e=>{if(mode!=='plaza'||paused)return;const cv=$('game');if(!cv||(e.target!==cv&&e.target!==pv))return;const w=toWorld(e);if(!w)return;
  const p=pick(w),touch=e.pointerType==='touch'||e.pointerType==='pen';
  if(p){const nm=p.name||'';const now=performance.now();if(touch||(S.clickN===nm&&now-S.clickT<400)){S.clickT=0;openInfo(nm)}else{S.clickN=nm;S.clickT=now}return}
  S.clickN='';const x=Math.max(16,Math.min(WW-16,w.x)),y=Math.max(TOPY+8,Math.min(WH-8,w.y));S.tgt={x,y}},true);
 /* ---------- v113 말풍선 채팅 ----------
    보낼 말은 다음 sync에 실어 보내고(me.say · me.sid), 서버가 받아 준 번호(r.j.sid)가 오면 내 머리 위에 띄움. 남의 말은 sync 답의 say/sid. */
 S.log=[];S.say=null;S.mySay=null;let sidN=Date.now()%1e6;
 function send(t){t=String(t||'').replace(/\s+/g,' ').trim().slice(0,50);if(!t)return;if(S.say){try{banner('조금 천천히 보내 주세요')}catch(e){}return}S.say={text:t,sid:++sidN,t:performance.now()};S.last=0}
 function sayAck(sid,said){if(!S.say)return;if(sid===S.say.sid){const tx=said||S.say.text;/* v114 서버가 나쁜 말을 *로 가린 글 */S.mySay={text:tx,t:performance.now()};logAdd(saveData.name||'나',tx,1);S.say=null}
  else if(performance.now()-S.say.t>3000){S.say=null;try{banner('조금 천천히 보내 주세요')}catch(e){}}}
 function logAdd(name,text,me){S.log.push({name,text,me:!!me,t:performance.now()});if(S.log.length>5)S.log.shift();paintLog()}
 function paintLog(){logEl.innerHTML=S.log.map(l=>'<div'+(l.me?' class="me"':'')+'><b>'+esc(l.name)+'</b> '+esc(l.text)+'</div>').join('')}
 setInterval(()=>{if(!S.log.length)return;const n=S.log.length;S.log=S.log.filter(l=>performance.now()-l.t<20000);if(S.log.length!==n)paintLog()},1000);
 function wrapText(c,t,maxW){const out=[];let line='';for(const ch of t){const nx=line+ch;if(c.measureText(nx).width>maxW&&line){out.push(line);line=ch;if(out.length===3)break}else line=nx}if(out.length<3&&line)out.push(line);
  if(out.length===3&&out.join('').length<t.length)out[2]=out[2].slice(0,-1)+'…';return out}
 function bubble(c,x,y,text,age,me){const life=5500;if(age>life)return;const a=age>life-500?(life-age)/500:Math.min(1,age/120);c.save();c.globalAlpha=a;c.font='700 7px sans-serif';
  const L=wrapText(c,text,92),w=Math.max(...L.map(l=>c.measureText(l).width))+10,h=L.length*9+6,bx=Math.round(x-w/2),by=Math.round(y-h-6-(1-Math.min(1,age/120))*4);
  c.fillStyle='#00000055';c.beginPath();c.roundRect?c.roundRect(bx+1,by+2,w,h,5):c.rect(bx+1,by+2,w,h);c.fill();
  c.fillStyle=me?'#fff4d0':'#ffffff';c.strokeStyle=me?'#ffd166':'#2a3040';c.lineWidth=1;c.beginPath();c.roundRect?c.roundRect(bx,by,w,h,5):c.rect(bx,by,w,h);c.fill();c.stroke();
  c.beginPath();c.moveTo(x-3,by+h-.5);c.lineTo(x,by+h+5);c.lineTo(x+3,by+h-.5);c.closePath();c.fill();c.beginPath();c.moveTo(x-3,by+h);c.lineTo(x,by+h+5);c.lineTo(x+3,by+h);c.stroke();
  c.fillStyle='#1a2030';c.textAlign='center';L.forEach((l,i)=>c.fillText(l,x,by+10+i*9));c.restore()}
 function drawBubbles(now){const c=ctx;try{drawEmos(now)}catch(e){};for(const k in S.O){const M=S.O[k];if(M.say&&M.sx!=null)bubble(c,M.sx,M.sy-44,M.say,now-M.sayT,0)}if(S.mySay)bubble(c,P.x,P.y-44,S.mySay.text,now-S.mySay.t,1)}
 /* ---------- v117 이모티콘: 머리 위에 3초 동안 크게(톡 튀어나와 살짝 떠오름) ---------- */
 const EMO=['😀','😂','😍','👋','👍','🎉','😢','😡','❤️','🔥','⚔️','🤝'];let emoSeq=0;S.emo=null;
 function emote(i){if(!S.on||i<0||i>=EMO.length)return;if(S.emo&&performance.now()-S.emo.t<900)return;S.emo={i,s:++emoSeq%1000,t:performance.now()};S.last=0;try{sfx(1100,.05,'triangle',.02,1500)}catch(e){}}
 function emoAt(c,x,y,i,age){const life=3000;if(age<0||age>life)return;const pop=age<180?age/180:1,sc=age<180?.4+.9*pop:age<300?1.3-(age-180)/400:1,a=age>life-400?(life-age)/400:1,fy=y-Math.min(1,age/life)*6;
  c.save();c.globalAlpha=a;c.translate(x,fy);c.scale(sc,sc);c.fillStyle='rgba(255,255,255,.92)';c.beginPath();c.arc(0,0,10,0,TAU0);c.fill();c.strokeStyle='rgba(30,40,60,.35)';c.lineWidth=.8;c.stroke();
  c.font='13px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(EMO[i]||'',0,1);c.restore()}
 const TAU0=Math.PI*2;
 function drawEmos(now){const c=ctx;for(const k in S.O){const M=S.O[k];if(M.emoT!=null&&M.sx!=null)emoAt(c,M.sx+14,M.sy-42,M.emoI,now-M.emoT)}if(S.emo)emoAt(c,P.x+14,P.y-42,S.emo.i,now-S.emo.t)}
 const chatBox=document.createElement('div');chatBox.id='plzChat';chatBox.hidden=true;chatBox.innerHTML='<div class="lg"></div><div class="em" hidden>'+EMO.map((e,i)=>'<button type="button" data-e="'+i+'" title="'+(i<9?(i+1)+'번 키':'')+'">'+e+'</button>').join('')+'</div><form><button type="button" class="eb" title="이모티콘 (숫자키 1~9)">😀</button><input maxlength="50" placeholder="말하기 (Enter)" enterkeyhint="send" autocomplete="off"><button>보내기</button></form>';document.body.appendChild(chatBox);
 const logEl=chatBox.querySelector('.lg'),inp=chatBox.querySelector('input');
 chatBox.addEventListener('pointerdown',e=>e.stopPropagation());
 const emBox=chatBox.querySelector('.em');chatBox.querySelector('.eb').onclick=()=>{emBox.hidden=!emBox.hidden};emBox.querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>{emote(+b.dataset.e);emBox.hidden=true});
 for(const ev of ['keydown','keyup'])inp.addEventListener(ev,e=>{e.stopPropagation();if(ev==='keydown'&&e.key==='Escape'){inp.blur()}});/* 적는 동안 캐릭터가 움직이거나 일시정지되지 않게 */
 inp.addEventListener('focus',()=>{try{K.clear()}catch(e){}});
 chatBox.querySelector('form').onsubmit=e=>{e.preventDefault();send(inp.value);inp.value='';if(matchMedia('(pointer:coarse)').matches)inp.blur()};
 addEventListener('keydown',e=>{if(mode!=='plaza'||!S.on||paused||chatBox.hidden)return;if(document.activeElement!==inp&&/^Digit[1-9]$/.test(e.code)&&box.hidden){e.preventDefault();emote(+e.code.slice(5)-1);return}/* v117 숫자키 = 이모티콘 */if(e.code==='Enter'&&document.activeElement!==inp&&box.hidden){e.preventDefault();e.stopImmediatePropagation();inp.focus()}},true);
 setInterval(()=>{try{const hide=!S.on||DU.isOpen();if(chatBox.hidden!==hide)chatBox.hidden=hide}catch(e){}},120);
 /* ---------- 위쪽 막대: 광장 번호 · 사람 수 · 신청 받기 · 나가기 ---------- */
 const bar=document.createElement('div');bar.id='plzBar';bar.hidden=true;document.body.appendChild(bar);
 bar.addEventListener('pointerdown',e=>e.stopPropagation());
 let lastBar='';function paintBar(){const rs=S.rooms.length?S.rooms:[{room:S.room||1,n:S.cnt}];
  const h='<b>⛲ 광장</b><select class="pR">'+rs.map(r=>'<option value="'+r.room+'"'+(r.room===S.room?' selected':'')+'>광장 '+r.room+' · '+r.n+'/30명</option>').join('')+'</select>'+
   '<button class="pI'+(sv().noinv?' off':'')+'">📨 신청 '+(sv().noinv?'안 받기':'받기')+'</button><button class="pX">로비로</button>'+(S.err?'<small>'+esc(S.err)+'</small>':'<small>사람을 두 번 누르면(폰은 한 번) 정보 · 결투 · 듀오 신청</small>');
  if(h===lastBar)return;lastBar=h;bar.innerHTML=h;
  bar.querySelector('.pR').onchange=ev=>{S.want=+ev.target.value;S.last=0};
  bar.querySelector('.pI').onclick=()=>{sv().noinv=!sv().noinv;try{saveNow()}catch(e){}lastBar='';paintBar();S.last=0};
  bar.querySelector('.pX').onclick=()=>{try{toLobby()}catch(e){}}}
 /* ---------- 정보 창 ---------- */
 const box=document.createElement('div');box.id='plzInfo';box.hidden=true;document.body.appendChild(box);
 box.addEventListener('pointerdown',e=>e.stopPropagation());
 function hideInfo(){box.hidden=true;S.info=null}
 async function openInfo(name){if(!name)return;S.info={name,load:1};box.hidden=false;box.innerHTML='<div class="pc"><button class="x">닫기</button><h3>'+esc(name)+'</h3><p class="ld">불러오는 중…</p></div>';box.querySelector('.x').onclick=hideInfo;
  try{gmSfx('ok')}catch(e){}const r=await api('/api/plaza/info','POST',{name});if(!S.info||S.info.name!==name)return;
  if(r.s!==200){box.querySelector('.ld').textContent=r.j.error||'정보를 불러오지 못했어요';return}const j=r.j;S.info=Object.assign({name},j);renderInfo()}
 const gcol={'일반':'#c8d0dc','희귀':'#6ab8ff','영웅':'#c08aff','전설':'#ffb040','프리미엄':'#ff6ad5','유물':'#ff8a5a','신화':'#ff4d6d','초월':'#7dffe0'};
 function renderInfo(){const j=S.info;if(!j)return;const L=j.look||{};const row=(ic,n,g)=>n?'<li><i>'+ic+'</i><span>'+esc(n)+'</span>'+(g?'<em style="color:'+(gcol[g]||'#c8d0dc')+'">'+esc(g)+'</em>':'')+'</li>':'';
  const fr=j.friend==='accepted'?'<button disabled>✓ 친구</button>':j.friend==='pending'?'<button disabled>친구 신청 보냄</button>':'<button class="af">➕ 친구 추가</button>';
  const acts=j.me?'<p class="me">나예요</p>':('<div class="ac">'+fr+'<button class="du2"'+(j.noinv?' disabled':'')+'>⚔ 결투 신청</button><button class="co"'+(j.noinv?' disabled':'')+'>🤝 듀오 신청</button></div>'+(j.noinv?'<p class="ni">지금 신청을 받지 않는 사람이에요</p>':'<p class="ni">결투는 친선(골드 없음)이에요</p>'));
  box.innerHTML='<div class="pc"><button class="x">닫기</button><h3>'+esc(j.name)+'</h3><div class="st"><span><b>Lv '+(j.level||1)+'</b>레벨</span><span><b>'+(j.floor||1)+'F</b>탑 최고 층</span><span><b>'+(j.pvp?esc(j.pvp.tier):'-')+'</b>'+(j.pvp?j.pvp.wins+'승 '+j.pvp.losses+'패':'결투 기록 없음')+'</span></div>'+
   '<ul>'+row('🧑',L.cn,L.cg)+row('🗡',L.wn,L.wg)+row('🐾',L.pn,L.pg)+'</ul>'+acts+'<p class="msg"></p></div>';
  const q=s=>box.querySelector(s),msg=t=>{const m=q('.msg');if(m)m.textContent=t};q('.x').onclick=hideInfo;
  if(q('.af'))q('.af').onclick=async()=>{q('.af').disabled=true;const r=await api('/api/friends/request','POST',{name:j.name});
   if(r.s===200){j.friend=r.j.status==='friends'?'accepted':'pending';renderInfo();msg(r.j.status==='friends'?'✓ 친구가 됐어요!':'✓ 친구 신청을 보냈어요')}else{q('.af').disabled=false;msg(r.j.error||'보내지 못했어요')}};
  if(q('.du2'))q('.du2').onclick=()=>{hideInfo();try{FR94.duel(j.name)}catch(e){msg('결투를 열지 못했어요')}};
  if(q('.co'))q('.co').onclick=()=>{hideInfo();try{FR94.duo(j.name,j.floor)}catch(e){msg('듀오를 열지 못했어요')}}}
 /* ---------- 로비 메뉴 ---------- */
 try{GM_ITEMS.push({id:'plaza',ic:'⛲',t:'광장',sub:'다른 플레이어와 만나기 · 결투 · 듀오 신청'});if(typeof LV_ITEM_EN!=='undefined')LV_ITEM_EN.push('PLAZA');if(window.LB_COL&&LB_COL.length<7)LB_COL.push('#7dd8ff')}catch(e){}
 {const f=gmMainGo;gmMainGo=function(){const it=GM_ITEMS[GM.sel];if(it&&it.id==='plaza'){try{gmSfx('ok')}catch(e){}enter();return}return f.apply(this,arguments)}}
 try{if(typeof lvSet==='function')setTimeout(()=>{try{lvSet()}catch(e){}},300)}catch(e){}
 const isPlz=()=>{try{return GM_ITEMS[GM.sel]&&GM_ITEMS[GM.sel].id==='plaza'}catch(e){return false}};
 {const f=gmMainSel;gmMainSel=function(){const r=f.apply(this,arguments);try{if(isPlz()&&$('gmTip')){$('gmTip').textContent='💡 광장: 다른 플레이어와 만나 친구 추가 · 결투 · 듀오 신청!';if(typeof lvDock==='function')lvDock()}}catch(e){}return r}}
 /* 로비 LED: 광장 고르면 분수 · 사람들 · PLAZA */
 if(typeof lvLed==='function'){const f=lvLed;lvLed=function(now){const cv=f.apply(this,arguments);if(!isPlz()||!cv||!cv.getContext)return cv;try{const c=cv.getContext('2d'),w=cv.width,h=cv.height,t=now/1000;
   const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0a1424');g.addColorStop(1,'#1a2a40');c.fillStyle=g;c.fillRect(0,0,w,h);
   c.fillStyle='#3a4258';c.fillRect(0,h*.62,w,h*.38);for(let x=0;x<w;x+=12)for(let y=Math.floor(h*.62);y<h;y+=6){c.fillStyle=((x/12+y/6)%2)?'#434b62':'#3d455b';c.fillRect(x+((y/6)%2)*6,y,11,5)}
   const fx=w/2,fy=h*.72;c.fillStyle='#6a7088';c.beginPath();c.ellipse(fx,fy,34,9,0,0,6.28);c.fill();c.fillStyle='#2a6aa8';c.beginPath();c.ellipse(fx,fy,30,7,0,0,6.28);c.fill();c.fillStyle='#7a8098';c.fillRect(fx-3,fy-16,6,16);
   for(let i=0;i<10;i++){const q=(t*1.4+i*.31)%1,a=i/10*6.28;c.fillStyle='#bff0ff';c.globalAlpha=1-q*.6;c.fillRect(fx+Math.cos(a)*q*20,fy-16-Math.sin(q*Math.PI)*14+q*12,2,2)}c.globalAlpha=1;
   for(let i=0;i<6;i++){const x=((i*47+t*(i%2?14:-11))%(w+20)+w+20)%(w+20)-10,y=h*.66+(i%3)*8,b=Math.abs(Math.sin(t*8+i))*1.5;c.fillStyle='#000a';c.fillRect(x-3,y+6,7,2);
    c.fillStyle=['#ffd166','#8de4ff','#ff8aa8','#a6f5c6','#c8a2ff','#ffb070'][i];c.fillRect(x-2,y-6-b,5,6);c.fillStyle='#ffe0c0';c.fillRect(x-2,y-10-b,5,4)}
   c.font='900 20px '+(typeof FONT_STACK!=='undefined'?FONT_STACK:'sans-serif');c.textAlign='center';c.fillStyle='#000';c.fillText('PLAZA',w/2+1,h*.36+1);c.fillStyle='#7dd8ff';c.fillText('PLAZA',w/2,h*.36);
   c.font='700 8px sans-serif';c.fillStyle='#e8f4ef';c.fillText('친구 · 결투 · 듀오',w/2,h*.5);c.textAlign='left'}catch(e){}return cv}}
 const st=document.createElement('style');st.textContent=`
 #plzBar{position:fixed;top:8px;left:8px;z-index:9300;display:flex;align-items:center;flex-wrap:wrap;gap:6px;max-width:calc(100vw - 16px);padding:6px 8px;border-radius:12px;background:#0b1220e6;border:1px solid #7dd8ff66;color:#e8f4ef;font:600 12px/1.2 inherit;box-shadow:0 6px 18px #0008}
 #plzBar[hidden]{display:none}#plzBar b{color:#7dd8ff}#plzBar select,#plzBar button{font:inherit;font-weight:800;padding:5px 9px;border-radius:9px;border:1px solid #ffffff22;background:#1a2436;color:#e8f4ef;cursor:pointer}
 #plzBar .pI.off{color:#ff9aaa}#plzBar .pX{background:#2a3436}#plzBar small{flex-basis:100%;color:#9fb0c8;font-size:10.5px;font-weight:600}
 html.ph #plzBar,html.uiPort #plzBar,html.uiLand #plzBar{top:4px;left:4px;padding:3px 5px;gap:4px;font-size:10.5px}html.ph #plzBar small,html.uiLand #plzBar small{display:none}html.ph #plzBar select,html.ph #plzBar button{padding:4px 7px}
 #plzInfo{position:fixed;inset:0;z-index:9350;display:flex;align-items:center;justify-content:center;background:#0006}#plzInfo[hidden]{display:none}
 #plzInfo .pc{position:relative;width:min(340px,92vw);padding:16px 16px 12px;border-radius:16px;background:linear-gradient(180deg,#152038,#0b1220);border:2px solid #7dd8ff88;color:#e8f4ef;box-shadow:0 12px 40px #000c;font-family:inherit}
 #plzInfo h3{margin:0 0 10px;font-size:18px;color:#ffd166}#plzInfo .x{position:absolute;right:10px;top:10px}
 #plzInfo .st{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:10px}#plzInfo .st span{display:flex;flex-direction:column;align-items:center;padding:7px 4px;border-radius:10px;background:#ffffff0d;font-size:10.5px;color:#9fb0c8;text-align:center}#plzInfo .st b{font-size:15px;color:#fff;margin-bottom:2px}
 #plzInfo ul{list-style:none;margin:0 0 10px;padding:0;display:flex;flex-direction:column;gap:4px}#plzInfo li{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:9px;background:#ffffff08;font-size:12.5px}#plzInfo li i{font-style:normal}#plzInfo li span{flex:1}#plzInfo li em{font-style:normal;font-size:11px;font-weight:900}
 #plzInfo .ac{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px}#plzInfo .ac button,#plzInfo .x{font:inherit;font-weight:900;font-size:12px;padding:9px 4px;border-radius:10px;border:0;cursor:pointer;background:#24324c;color:#e8f4ef}
 #plzInfo .ac .du2{background:#5a1a2a;color:#ffd0d8}#plzInfo .ac .co{background:#1a4a3a;color:#c8ffe4}#plzInfo .ac .af{background:#1a3a5a;color:#cfe8ff}#plzInfo button:disabled{opacity:.5;cursor:default}
 #plzInfo .ni,#plzInfo .me,#plzInfo .msg,#plzInfo .ld{margin:8px 0 0;font-size:11px;color:#9fb0c8;text-align:center}#plzInfo .msg{color:#a6f5c6}
 #plzChat{position:fixed;left:8px;bottom:8px;z-index:9300;width:min(380px,62vw);display:flex;flex-direction:column;gap:4px;pointer-events:none}#plzChat[hidden]{display:none}
 #plzChat .lg div{font-size:12px;line-height:1.35;color:#e8f4ef;text-shadow:0 1px 2px #000,0 0 4px #000;word-break:break-all}#plzChat .lg b{color:#a6f5c6}#plzChat .lg .me b{color:#ffd166}
 #plzChat form{display:flex;gap:4px;pointer-events:auto}#plzChat .eb{padding:4px 8px!important;font-size:16px!important;background:#24324c!important}
 #plzChat .em{display:grid;grid-template-columns:repeat(6,1fr);gap:4px;padding:6px;border-radius:12px;background:#0b1220ee;border:1px solid #7dd8ff55;pointer-events:auto;width:max-content}#plzChat .em[hidden]{display:none}
 #plzChat .em button{font-size:20px!important;padding:4px 6px!important;background:#ffffff10!important;border-radius:8px!important;line-height:1}#plzChat .em button:hover{background:#ffffff28!important}#plzChat input{flex:1;min-width:0;font:inherit;font-size:13px;padding:7px 10px;border-radius:10px;border:1px solid #7dd8ff55;background:#0b1220d9;color:#fff;outline:none}#plzChat input:focus{border-color:#7dd8ff}
 #plzChat button{font:inherit;font-weight:900;font-size:12px;padding:7px 11px;border-radius:10px;border:0;background:#1a4a6a;color:#dff4ff;cursor:pointer}
 html.ph #plzChat{width:min(300px,64vw)}html.ph #plzChat .lg div{font-size:11px}html.ph #plzChat input{font-size:16px;padding:6px 8px}
 #plzView{position:fixed;inset:0;width:100vw;height:100vh;z-index:60;touch-action:none;background:#141a2a}#plzView[hidden]{display:none}
 html.plz111 #touch .tbtn,html.plz111 #btnP,html.plz111 #btnU{display:none!important}`;document.head.appendChild(st);
 window.PLZ111={enter,leave,S,openInfo,feed,WW,WH,FOUNT,TREES,LAMPS,BENCH,TOPY};
}catch(e){console.error('v111 plaza',e)}})();
