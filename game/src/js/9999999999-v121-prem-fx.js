/* ================= v121 프리미엄 전용 스킨: 이동 · 대시 연출 + 능력 (PFX121) =================
   v119 전용 스킨(PREM119: 공허 군주 · 시간의 대성기사 · 하이퍼 비트)을 끼고 있을 때만.
   ① 걷기: 발밑 빛 + 발자국마다 스킨 전용 흔적(공허 안개 · 금빛 시계 자국 · 무지개 댄스 바닥).
   ② 대시: DASH70 잔상 모양(DASH70.ST)을 더 화려한 전용 모양으로 바꿔 끼우고, 출발 · 길 · 도착에 전용 연출을 더함.
      공허=출발 자리가 빨려 드는 구멍 + 길을 따라 청록 번개 / 태엽=출발 자리에 거꾸로 도는 큰 시계판 + 금빛 길 + 톱니
      네온=무지개 빛줄기 + 도착 자리 스피커 충격파 + 음표.
      그리기는 984 drawKnight 감싸기의 window.__heroFx(층 0=몸 뒤, 1=몸 앞) — 전투 · 탑 · 동굴 · 마을.
   ③ 능력: 그 프리미엄 캐릭터(CHARS[TP84.PI[id]])의 abl을 전용 스킨을 낄 때만 늘림 → 신화 장비의 스킬 엔진(MYTH100)이 그대로 씀.
      공허 군주 = 섬광 대시 + 회피 15% / 시간의 대성기사 = 시간 감속(6번째 타격) + 재생(6초) / 하이퍼 비트 = 연쇄 번개 25% + 회전 칼날 2개.
      원래 프리미엄 능력(CB81 PERK)과 세트 효과는 그대로 함께. */
(()=>{try{
 if(!window.PREM119||typeof CHARS==='undefined')return;
 const RB=['#ff3ad6','#b05cff','#29f0ff','#5affb0','#ffe14d','#ff9a3a'];
 const pulse=()=>{try{if(typeof mus!=='undefined'&&mus&&mus.ms&&mus.T0){const q=(performance.now()-mus.T0)/mus.ms;return Math.pow(1-(q-Math.floor(q)),2.2)}}catch(e){}return 0};

 /* ---------- ③ 능력 ---------- */
 const ABI={
  vx_void:{abl:{blink:1,evade:.15},n:'공허 도약',d:'대시를 시작한 자리에서 공허가 터져 주변 적에게 피해 · 적의 공격을 15% 확률로 피함'},
  vx_clock:{abl:{timeslow:6,regen:6},n:'시간 지배',d:'6번 맞힐 때마다 모든 적이 2.5초 느려지고 그동안 내 피해 +25% · 6초마다 체력 +1'},
  vx_neon:{abl:{chain:.25,orbit:2},n:'하이퍼 드롭',d:'맞힐 때 25% 확률로 번개가 주변 적 3명에게 튐 · 네온 칼날 2개가 몸 주위를 돎'}};
 const PI=(window.TP84&&TP84.PI)||{};
 for(const u of PREM119.list){const a=ABI[u.id];if(!a)continue;
  u.tags=['⚡ 능력 · '+a.n,...(u.tags||[]).filter(x=>!/^⚡/.test(x))];u.desc=(u.desc||'')+' ◆ 능력: '+a.d+' (원래 '+((SKIN58.byId(u.base)||{}).name||'')+' 능력도 그대로)';u.perk=a;
  const ch=CHARS[PI[u.base]];if(!ch)continue;const own=ch.abl;
  try{Object.defineProperty(ch,'abl',{configurable:true,enumerable:true,get(){try{const c=PREM119.cur();if(c&&c.id===u.id)return Object.assign({},own||{},a.abl)}catch(e){}return own},set(v){}})}catch(e){}}

 /* ---------- ② 대시 잔상 모양 바꿔 끼우기 ---------- */
 const D70=window.DASH70,ORIG={},VX={
  void:{c:'#8a3aff',c2:'#5affd8',life:560,part:'shard',rift:1,bolt:1,wave:1},
  clock:{c:'#ffd84a',c2:'#ffffff',life:820,part:'gear',freeze:1,ring:'clock',scorch:1},
  neon:{c:'#ff3ad6',c2:'#29f0ff',life:500,part:'eq',rainbow:1,bolt:1,ring:'clock'}};
 if(D70&&D70.ST)for(const k in VX)ORIG[k]=D70.ST[k];
 const VXO={};for(const k in VX)VXO[k]=Object.assign({},ORIG[k]||{},VX[k]);
 function swapDash(u){if(!D70||!D70.ST)return;for(const k in VX){const want=u&&u.base===k?VXO[k]:ORIG[k];if(D70.ST[k]!==want)D70.ST[k]=want}}

 /* ---------- ①② 걷기 · 대시 연출 ---------- */
 const S={parts:[],stepT:0,dash:null,dStart:null,lastX:null,lastY:null};
 const add=o=>{S.parts.push(o);if(S.parts.length>220)S.parts.shift()};
 const rnd=(a,b)=>a+Math.random()*(b-a);
 function emitStep(u,x,y,now){const b=u.base;
  if(b==='void'){for(let i=0;i<3;i++)add({k:'mist',x:x+rnd(-5,5),y:y-rnd(0,3),vx:rnd(-6,6),vy:-rnd(4,12),t:now,life:rnd(600,900),c:i%2?'#5affd8':'#8a3aff',L:0});add({k:'print',x,y,t:now,life:900,c:'#5affd8',L:0})}
  else if(b==='clock'){add({k:'tick',x,y,t:now,life:800,c:'#ffd84a',L:0,r:rnd(0,6)});for(let i=0;i<2;i++)add({k:'spark',x:x+rnd(-6,6),y:y-rnd(2,10),vx:rnd(-8,8),vy:-rnd(10,24),t:now,life:rnd(500,800),c:i?'#ffffff':'#ffe9a8',L:1})}
  else{add({k:'tile',x:Math.round(x/8)*8,y:Math.round(y/5)*5,t:now,life:520,c:RB[Math.floor(now/90)%6],L:0});if(Math.random()<.5)add({k:'note',x:x+rnd(-8,8),y:y-rnd(8,16),vx:rnd(-10,10),vy:-rnd(14,26),t:now,life:800,c:RB[Math.floor(rnd(0,6))],L:1})}}
 function dashStart(u,x,y,now){const b=u.base;
  if(b==='void'){add({k:'hole',x,y:y-8,t:now,life:520,c:'#8a3aff',L:0});for(let i=0;i<10;i++){const a=i/10*Math.PI*2;add({k:'suck',x:x+Math.cos(a)*22,y:y-8+Math.sin(a)*12,tx:x,ty:y-8,t:now,life:420,c:i%2?'#5affd8':'#b07aff',L:1})}}
  else if(b==='clock'){add({k:'dial',x,y:y-10,t:now,life:760,c:'#ffd84a',L:0});try{sfx(1200,.05,'square',.02,1200);setTimeout(()=>{try{sfx(900,.05,'square',.02,900)}catch(e){}},90)}catch(e){}}
  else{add({k:'wave',x,y:y-8,t:now,life:420,c:'#ff3ad6',L:0});for(let i=0;i<6;i++)add({k:'beam',x,y:y-8,a:i/6*Math.PI*2,t:now,life:360,c:RB[i],L:1})}}
 function dashTrail(u,x,y,px,py,now){const b=u.base;
  if(b==='void')add({k:'bolt',x0:px,y0:py-8,x1:x,y1:y-8,t:now,life:340,c:'#5affd8',L:1});
  else if(b==='clock'){add({k:'gold',x0:px,y0:py-4,x1:x,y1:y-4,t:now,life:700,c:'#ffd84a',L:0});if(Math.random()<.6)add({k:'gear',x,y:y-6,vx:rnd(-20,20),vy:-rnd(10,30),t:now,life:600,c:'#c89a40',L:1,r:rnd(0,6)})}
  else add({k:'streak',x0:px,y0:py-8,x1:x,y1:y-8,t:now,life:300,c:RB[Math.floor(now/40)%6],L:1})}
 function dashEnd(u,x,y,now){const b=u.base;
  if(b==='void')add({k:'ring',x,y:y-6,t:now,life:420,c:'#5affd8',r:30,L:0});
  else if(b==='clock')add({k:'ring',x,y:y-6,t:now,life:520,c:'#ffd84a',r:26,L:0});
  else{add({k:'ring',x,y:y-6,t:now,life:420,c:'#29f0ff',r:34,L:0});add({k:'ring',x,y:y-6,t:now+80,life:420,c:'#ff3ad6',r:26,L:0});for(let i=0;i<5;i++)add({k:'note',x,y:y-10,vx:Math.cos(i/5*6.28)*40,vy:Math.sin(i/5*6.28)*20-20,t:now,life:700,c:RB[i],L:1})}}
 /* 캐릭터를 그릴 때마다(층 0 → 몸 → 층 1). 좌표는 P(게임 좌표)로 쌓고, 그릴 때 발 위치와의 차이만큼 옮긴다 */
 let lastFrame=0;
 function heroFx(c,cx,fy,kk,now,moving,layer){const u=PREM119.cur();if(!u||typeof P==='undefined'||!P)return;
  const ox=cx-P.x,oy=fy-P.y,sc=kk/1.2;
  if(layer===0&&now!==lastFrame){lastFrame=now;
   /* 걷기 */if(moving&&!P.dash&&now-S.stepT>110){S.stepT=now;emitStep(u,P.x,P.y,now)}
   /* 대시 */if(P.dash&&P.dash!==S.dash){S.dash=P.dash;dashStart(u,P.x,P.y,now);S.lastX=P.x;S.lastY=P.y}
   if(P.dash&&S.lastX!=null&&Math.hypot(P.x-S.lastX,P.y-S.lastY)>4){dashTrail(u,P.x,P.y,S.lastX,S.lastY,now);S.lastX=P.x;S.lastY=P.y}
   if(!P.dash&&S.dash){S.dash=null;dashEnd(u,P.x,P.y,now);S.lastX=null}}
  c.save();
  if(layer===0){/* 발밑 빛 */const p=pulse(),col=u.base==='void'?'#8a3aff':u.base==='clock'?'#ffd84a':RB[Math.floor(now/400)%6];c.globalCompositeOperation='lighter';c.globalAlpha=.22+.18*p;c.fillStyle=col;c.beginPath();c.ellipse(cx,fy-1,11*sc,3.2*sc,0,0,6.283);c.fill()}
  c.globalCompositeOperation='lighter';
  for(let i=S.parts.length-1;i>=0;i--){const f=S.parts[i],q=(now-f.t)/f.life;if(q>=1){if(layer===1)S.parts.splice(i,1);continue}if(q<0||f.L!==layer)continue;const al=1-q;
   const X=(f.x||0)+ox,Y=(f.y||0)+oy;c.globalAlpha=al;c.fillStyle=f.c;c.strokeStyle=f.c;c.lineWidth=1;
   if(f.k==='mist'||f.k==='spark'||f.k==='gear'||f.k==='note'){const dt=q*f.life/1000,x=X+(f.vx||0)*dt,y=Y+(f.vy||0)*dt+(f.k==='gear'?40*dt*dt:0);
    if(f.k==='mist'){c.globalAlpha=al*.5;c.beginPath();c.arc(x,y,(1.5+q*3)*sc,0,6.283);c.fill()}
    else if(f.k==='spark')c.fillRect(x-.5,y-.5,1.5,1.5);
    else if(f.k==='gear'){c.save();c.translate(x,y);c.rotate(f.r+q*6);c.fillRect(-1.5,-1.5,3,3);c.fillRect(-.5,-2.5,1,5);c.fillRect(-2.5,-.5,5,1);c.restore()}
    else{c.fillRect(x,y,1,4);c.fillRect(x-2,y+3,3,2)}}
   else if(f.k==='print'){c.globalAlpha=al*.55;c.beginPath();c.ellipse(X,Y,3*sc,1.2*sc,0,0,6.283);c.fill()}
   else if(f.k==='tick'){c.globalAlpha=al*.8;c.beginPath();c.ellipse(X,Y,4*sc,1.6*sc,0,0,6.283);c.stroke();const a=f.r+q*8;c.beginPath();c.moveTo(X,Y);c.lineTo(X+Math.cos(a)*3.5*sc,Y+Math.sin(a)*1.4*sc);c.stroke()}
   else if(f.k==='tile'){c.globalAlpha=al*.45;c.fillRect(X-4,Y-2,8,4)}
   else if(f.k==='hole'){const r=(18-q*14)*sc;c.globalCompositeOperation='source-over';c.globalAlpha=al*.75;c.fillStyle='#07020f';c.beginPath();c.ellipse(X,Y,r,r*.55,0,0,6.283);c.fill();c.globalCompositeOperation='lighter';c.globalAlpha=al;c.strokeStyle='#8a3aff';c.lineWidth=1.5;c.stroke()}
   else if(f.k==='suck'){const x=X+((f.tx+ox)-X)*q,y=Y+((f.ty+oy)-Y)*q;c.fillRect(x-1,y-1,2,2)}
   else if(f.k==='dial'){const r=(14+q*8)*sc;c.globalAlpha=al*.9;c.lineWidth=1.5;c.beginPath();c.arc(X,Y,r,0,6.283);c.stroke();for(let j=0;j<12;j++){const a=j/12*6.283;c.fillRect(X+Math.cos(a)*r*.85-.5,Y+Math.sin(a)*r*.85-.5,1.5,1.5)}
    c.strokeStyle='#ffffff';c.beginPath();c.moveTo(X,Y);c.lineTo(X+Math.cos(-q*12)*r*.75,Y+Math.sin(-q*12)*r*.75);c.moveTo(X,Y);c.lineTo(X+Math.cos(-q*3)*r*.45,Y+Math.sin(-q*3)*r*.45);c.stroke()}
   else if(f.k==='wave'){c.globalAlpha=al*.8;c.lineWidth=2;for(let j=0;j<3;j++){c.strokeStyle=RB[(j*2)%6];c.beginPath();c.ellipse(X,Y,(6+q*30+j*4)*sc,(3+q*14+j*2)*sc,0,0,6.283);c.stroke()}}
   else if(f.k==='beam'){const L=(10+q*40)*sc;c.lineWidth=2;c.beginPath();c.moveTo(X+Math.cos(f.a)*L*.3,Y+Math.sin(f.a)*L*.15);c.lineTo(X+Math.cos(f.a)*L,Y+Math.sin(f.a)*L*.5);c.stroke()}
   else if(f.k==='ring'){c.lineWidth=2*al+.5;c.beginPath();c.ellipse(X,Y,f.r*q*sc,f.r*q*.5*sc,0,0,6.283);c.stroke()}
   else if(f.k==='bolt'||f.k==='streak'||f.k==='gold'){const x0=f.x0+ox,y0=f.y0+oy,x1=f.x1+ox,y1=f.y1+oy;
    if(f.k==='bolt'){c.lineWidth=1.5;c.beginPath();c.moveTo(x0,y0);const mx=(x0+x1)/2+(Math.random()-.5)*8,my=(y0+y1)/2+(Math.random()-.5)*8;c.lineTo(mx,my);c.lineTo(x1,y1);c.stroke();c.strokeStyle='#ffffff';c.lineWidth=.6;c.stroke()}
    else if(f.k==='gold'){c.globalAlpha=al*.6;c.lineWidth=3*sc;c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke()}
    else{c.lineWidth=4*sc*al;c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke()}}}
  c.restore();c.globalAlpha=1}
 window.__heroFx=heroFx;

 /* 매 프레임: 대시 모양 바꿔 끼우기 · 다른 스킨이면 남은 조각 비우기 */
 {const f=frame;frame=function(){try{const u=PREM119.cur();swapDash(u);if(!u&&S.parts.length)S.parts.length=0}catch(e){}return f.apply(this,arguments)}}
 window.PFX121={ABI,S,VX};
}catch(e){console.error('v121 prem fx',e)}})();
