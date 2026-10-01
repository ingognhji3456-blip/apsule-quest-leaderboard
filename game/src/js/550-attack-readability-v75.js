/* ================= 공격 읽기 v75: 공격 설명 · 소환 과정이 보이는 톱날/회전날/톱니 · 착탄 표시 ================= */
const ATK_TIP={
 laserPods:'벽에서 포대가 나와 가로 레이저 → 빛줄기가 없는 줄로',starBurst:'코어에서 별빛탄이 사방으로 → 탄 사이 틈으로',earthquake:'바닥 균열이 퍼짐 → 금 간 곳 밖으로',volley:'두 손 대포가 조준 사격 → 옆으로 계속 이동',
 eyeLaser:'눈이 조준 후 고정 → 빨간 선이 멈추면 옆으로 대시',slam:'손이 떠올라 내 위치로 내려찍음 → 그림자 밖으로',charge:'웅크리고 뒤로 젖히면 돌진 → 빨간 길 밖으로',
 missiles:'하늘에서 미사일이 떨어짐 → 커지는 그림자를 피해',sawThrow:'손에서 톱날을 돌려 던짐 → 부메랑처럼 돌아오는 곡선을 피해',rotor:'팔이 톱날로 펴져 회전 → 화살표 방향 반대로 돌아',
 turrets:'손으로 포탑을 던져 설치 → 포탑 조준선이 깜빡이면 이동',ringBurst:'충격파 고리가 퍼짐 → 초록 틈으로 통과',clockLaser:'시곗바늘 레이저가 회전 → 바늘을 따라 돌아',mines:'지뢰를 던져 설치 → 폭발 원 밖에서 대기',roar:'포효 충격파 → 대시로 통과',
 gearRail:'벽 해치에서 톱니가 레일을 따라 굴러옴 → 화살표 줄을 비켜서',voltGrid:'전선이 격자로 깔림 → 빈 칸으로',voltStrike:'번개가 떨어질 원 → 원 밖으로',geyserWave:'용암이 차례로 솟음 → 솟은 뒤 자리로',fireBomb:'화염병 투척 → 착탄 원 밖으로',
 trainRun:'벽 해치에서 열차 돌진 → 레일 밖으로',iceWave:'빙창이 사방으로 → 창 사이로',frostNova:'냉기 폭발 → 멀리 떨어져',droneSwarm:'드론이 줄지어 비행 → 경로를 비켜서',magnetField:'자기장이 끌어당김 → 반대로 계속 이동',
 hourStrike:'정각마다 타종 충격 → 박자에 맞춰 대시',scanCones:'탐조등이 훑음 → 빛 밖에 숨어',prism:'교차 레이저 → 선이 없는 칸으로',beatCollapse:'박동이 무너짐 → 안전 원을 찾아',
 pounce:'뛰어올라 내 자리로 덮침 → 그림자 원 밖으로',fangLunge:'빨간 길을 따라 돌진 → 길 옆으로 비켜',fangBite:'다가와서 물기 → 이빨 표시 밖으로',mawBite:'뛰어올라 물기 → 이빨 표시 밖으로',frogLeap:'높이 뛰어 착지 충격 → 원 밖, 퍼지는 고리는 틈으로',diveStrike:'위로 솟았다 급강하 → 원 밖으로',phantomDash:'빛나는 자리로 순간이동 후 할퀴기 → 반대편으로'};
const ATK_TIP_KW=[[/돌진|덮치|도약|급강하/,'몸을 웅크리면 달려듦 → 표시 길 밖으로'],[/뿌리|가시|창/,'바닥에서 솟음 → 표시된 자리 밖으로'],[/투척|뱉|토하|분사|사격|발사|난사|포화|독침/,'던지거나 쏨 → 날아오는 방향 옆으로'],[/돌진|덮치|도약|급강하/,'몸을 웅크리면 달려듦 → 표시 길 밖으로'],
 [/휘두르|휩쓸|채찍|회오리|회전/,'크게 휘두름 → 거리를 벌려'],[/포자|구름|웅덩이|수렁|함정|거미줄|감옥/,'장판이 깔림 → 밟지 말고 돌아가'],[/응시|시선|빛|등불|미끼|꽃가루/,'시선 빛줄기 → 빛 밖으로'],[/폭발|만개|파동|고리|포효|통곡|땅울림/,'퍼지는 충격 → 틈이나 대시로'],[/./,'표시를 보고 피하세요']];
const ATK_KEYOF={};try{for(const T of [ATK_NAME,SIGNAME,typeof SIGNAME2!=='undefined'?SIGNAME2:{},typeof SIGNAME3!=='undefined'?SIGNAME3:{}])for(const [k,v] of Object.entries(T))if(!ATK_KEYOF[v])ATK_KEYOF[v]=k}catch(e){}
function atkTip(name){const k=ATK_KEYOF[name];if(k&&ATK_TIP[k])return ATK_TIP[k];for(const [re,t] of ATK_TIP_KW)if(re.test(name))return t;return ''}
(function(){try{const st=document.createElement('style');st.textContent='#banner.atk small{display:block;margin-top:calc(var(--u)*1.5);font-size:calc(var(--u)*6);font-weight:700;letter-spacing:.02em;color:#ffd9a0;text-shadow:1px 0 #000,-1px 0 #000,0 1px #000,0 -1px #000}#banner.atk small::before{content:"▸ ";color:#ff7a8a}';(document.head||document.body).appendChild(st)}catch(e){}})();
{const _b3=banner;banner=function(txt){const r=_b3.apply(this,arguments);try{const el=$('banner');if(el.classList.contains('atk')){const tip=atkTip(txt);if(tip){const sm=document.createElement('small');sm.textContent=tip;el.appendChild(sm)}}}catch(e){}return r}}
/* ---- 도트 톱날 ---- */
function cSaw(x,y,r,ang,a,bone){x=Math.round(x);y=Math.round(y);const n=r>6?8:6;for(let i=0;i<n;i++){const t=ang+i*TAU/n;cPx(x+Math.cos(t)*(r+1),y+Math.sin(t)*(r+1),r>6?3:2,bone?'#efe4cd':'#e8eef0',a);cPx(x+Math.cos(t+.25)*(r+2.5),y+Math.sin(t+.25)*(r+2.5),1,'#ffffff',a*.8)}
 pcirc(x,y,r,bone?'#d8c8a0':'#9aa5ad',a);pcirc(x,y,r*.7,bone?'#8a7455':'#5c6870',a);for(let i=0;i<3;i++){const t=ang*1.3+i*TAU/3;cPx(x+Math.cos(t)*r*.45,y+Math.sin(t)*r*.45,1,'#c9d3d8',a)}RA(x-2,y-2,4,4,'#ff4d6d',a)}
function cChevron(x,y,ang,col,a,s){s=s||3;const dx=Math.cos(ang),dy=Math.sin(ang),px=-dy,py=dx;for(let k=0;k<=s;k++){cPx(x-dx*k+px*k,y-dy*k+py*k,1,col,a);cPx(x-dx*k-px*k,y-dy*k-py*k,1,col,a)}}
const AR={seen:new WeakSet(),hatch:new WeakSet(),lastWhir:0};
function arDraw(now,beat){if(G.state!=='play'&&G.state!=='count')return;const bone=G.bi>=10;
 /* 1) 톱날 투척: 손에서 톱날이 돌며 커지고(충전) → 경로 미리보기 → 던짐 → 돌아와 잡음 */
 for(const s of G.saws){if(beat<s.tp||beat>s.te+.3)continue;
  if(beat<s.ts){const p=clamp((beat-s.tp)/(s.ts-s.tp),0,1),hd=G.boss.hands[s.h]||{x:s.x0,y:s.y0},r=Math.round(3+7*Math.min(1,p*1.6)),spin=now/1000*(4+p*26);
   /* 경로: 나갈 때(진한 화살표) · 돌아올 때(옅은 화살표) */
   const q={...s,ts:0,tt:1,te:2};for(let k=1;k<9;k++){const u=k/9,[x,y]=sawPos(q,u),[x2,y2]=sawPos(q,u+.02);cChevron(x,y,Math.atan2(y2-y,x2-x),'#ff4d6d',.6+.4*p,4)}for(let k=1;k<8;k++){const u=1+k/8,[x,y]=sawPos(q,u),[x2,y2]=sawPos(q,Math.min(2,u+.02));cChevron(x,y,Math.atan2(y2-y,x2-x),'#ffb3c0',.45+.3*p,3)}
   /* 미리보기 유령 톱날이 경로를 한 바퀴 */{const gu=((now/900)%1)*2,[gx,gy]=sawPos(q,gu);cSaw(gx,gy,6,spin,.22,bone)}
   /* 착탄 지점 표시 */{const [tx,ty]=[s.x1,s.y1];cRing(tx,ty,10+Math.sin(now/90)*1.5,'#ff4d6d',.5+.4*p,2);cStar(tx,ty,4,'#ffffff',.6*p)}
   /* 손 안의 톱날 */cSaw(hd.x,hd.y,r,spin,1,bone);if(RND()<.3+p*.5)cSpark(hd.x+(RND()-.5)*r*2,hd.y+(RND()-.5)*r*2,1,'#ffe79a');
   if(p>.75&&Math.floor(now/60)%2)cRing(hd.x,hd.y,r+5,'#ffffff',.6,1);
   if(now-AR.lastWhir>110){AR.lastWhir=now;sfx(400+p*900,.08,'sawtooth',.012,500+p*1000)}}
  else if(!AR.seen.has(s)){AR.seen.add(s);sfx(900,.18,'sawtooth',.03,200);cAdd({k:'muzzle',x:s.x0,y:s.y0,col:'#ffffff',dur:180});G.shake=Math.max(G.shake,.12)}
  if(beat>=s.ts&&beat<=s.te){const [x,y]=sawPos(s,beat);for(let i=1;i<=4;i++){const tb=beat-.03*i;if(tb<s.ts)break;const [ox,oy]=sawPos(s,tb);cPx(ox,oy,4-Math.floor(i/2),i<2?'#ffffff':'#c9d3d8',.55-i*.1)}if(RND()<.35)cSpark(x,y+8,1,'#ffe79a',-Math.PI/2,2)}
  if(beat>s.te&&!s._caught){s._caught=1;const hd=G.boss.hands[s.h];if(hd){cStar(hd.x,hd.y,8,'#ffffff',1);cSpark(hd.x,hd.y,6,'#ffe79a');sfx(1200,.06,'square',.03,600)}}}
 /* 2) 회전 톱날: 코어에서 팔이 뻗어 나오며 톱날로 펼쳐짐 + 회전 방향 화살표 */
 for(const rt of G.rotors){if(beat<rt.t0||beat>=rt.t2)continue;const dir=Math.sign(rt.w)||1;
  if(beat<rt.t1){const p=clamp((beat-rt.t0)/(rt.t1-rt.t0),0,1),e=1-Math.pow(1-p,3);
   if(!AR.hatch.has(rt)){AR.hatch.add(rt);sfx(180,.25,'square',.04,90);sfx(1400,.05,'square',.02,700)}
   for(let i=0;i<rt.arms;i++){const [tx,ty]=rotorTip(rt,i,rt.t1),a=Math.atan2(ty-rt.cy,tx-rt.cx),L=rt.L*e;line(rt.cx,rt.cy,rt.cx+Math.cos(a)*L,rt.cy+Math.sin(a)*L,3,(x,y,k)=>{cPx(x,y,3,'#39434a',.9);if(k%3===0)cPx(x,y,1,'#8a969c',1)});cSaw(rt.cx+Math.cos(a)*L,rt.cy+Math.sin(a)*L,4+Math.round(4*e),now/1000*(2+p*12),1,bone)}
   const rr=rt.L+10;for(let k=0;k<8;k++){const a0=k*TAU/8+now/1000*dir*1.4,x=rt.cx+Math.cos(a0)*rr,y=rt.cy+Math.sin(a0)*rr;cChevron(x,y,a0+dir*Math.PI/2,'#ffd166',.7+.3*p,4);cChevron(x+Math.cos(a0+dir*Math.PI/2)*3,y+Math.sin(a0+dir*Math.PI/2)*3,a0+dir*Math.PI/2,'#ffffff',.5,3)}
   ctx.font='bold 9px monospace';ctx.textAlign='center';ctx.fillStyle='#ffd166';ctx.globalAlpha=.6+.4*p;ctx.fillText(dir>0?'↻ 시계 방향':'↺ 반시계 방향',Math.round(rt.cx),Math.round(rt.cy-rt.L-18));ctx.globalAlpha=1;ctx.textAlign='left'}
  else if(!bone){for(let i=0;i<rt.arms;i++){const [x,y]=rotorTip(rt,i,beat);line(rt.cx,rt.cy,x,y,6,(px,py,k)=>{cPx(px,py,4,'#2a3238',1);cPx(px,py,2,k%2?'#8a969c':'#c9d3d8',1)});cSaw(x,y,8,now/1000*dir*18,1,false);if(RND()<.3)cSpark(x,y,1,'#ffe79a')}pcirc(rt.cx,rt.cy,6,'#39434a',1);pcirc(rt.cx,rt.cy,3,'#ff4d6d',1)}}
 /* 3) 벽에서 들어오는 것들(톱니 · 열차 · 드론 · 고철): 벽 해치가 열리고 튀어나옴 */
 for(const m of G.movers){if(beat<m.tp||beat>m.t0+.4)continue;const vx=m.x1-m.x0,vy=m.y1-m.y0,vert=Math.abs(vy)>Math.abs(vx),dir=Math.sign(vert?vy:vx)||1;
  const hx=vert?clamp(m.x0,AX+10,AX+AW-10):(dir>0?AX+2:AX+AW-2),hy=vert?(dir>0?AY+2:AY+AH-2):clamp(m.y0,AY+10,AY+AH-10),sz=Math.max(12,(m.r||10)*2+4),p=clamp((beat-m.tp)/Math.max(.01,m.t0-m.tp),0,1),op=Math.round(sz/2*clamp((p-.45)/.4,0,1));
  const col=m.kind==='train'?'#ff6b3d':m.kind==='gear'?'#ffb020':'#ff4d6d';
  if(vert){R(hx-sz/2-3,hy-3,sz+6,6,'#10161a');for(let i=0;i<sz+6;i+=4)R(hx-sz/2-3+i,hy-3,2,6,Math.floor(i/4)%2?'#ffd23a':'#1a1a1a');RA(hx-op,hy-2,op*2,4,'#000',1);if(op>2)RA(hx-op,hy-2,op*2,4,col,.35)}
  else{R(hx-3,hy-sz/2-3,6,sz+6,'#10161a');for(let i=0;i<sz+6;i+=4)R(hx-3,hy-sz/2-3+i,6,2,Math.floor(i/4)%2?'#ffd23a':'#1a1a1a');RA(hx-2,hy-op,4,op*2,'#000',1);if(op>2)RA(hx-2,hy-op,4,op*2,col,.35)}
  if(Math.floor(now/120)%2)cPx(hx+(vert?sz/2+5:0),hy+(vert?0:-sz/2-5),3,col,1);
  if(beat>=m.t0&&!AR.hatch.has(m)){AR.hatch.add(m);cSpark(hx,hy,8,col);sfx(m.kind==='train'?120:300,.14,'square',.04,80);G.shake=Math.max(G.shake,.15)}}
 /* 4) 던진 포탑 · 지뢰 · 화염: 날아가는 동안 착탄 지점 조준 표시 */
 for(const a of G.arcs){if(beat<a.t0||beat>=a.t1)continue;const p=(beat-a.t0)/(a.t1-a.t0),r=Math.round(14-8*p);for(let i=0;i<4;i++){const t=i*TAU/4+now/300;cPx(a.x1+Math.cos(t)*r,a.y1+Math.sin(t)*r*.7,2,'#ffd166',.9)}cPx(a.x1,a.y1,2,'#ffffff',.8)}}
{const _cd2=cfxDraw;cfxDraw=function(now,beat){const r=_cd2.apply(this,arguments);try{arDraw(now,beat)}catch(e){}return r}}

/* ================= 보스 접근 공격 v75: 예고 없는 순간이동/돌진 → 조준 · 길 표시 · 도약 · 물기 연출 ================= */
/* 공통: 목표 지점에 조준경, 보스 머리 위 "!" 표시, 보스가 지나갈 길 */
function apLane(x0,y0,x1,y1,t0,t1,w){G.lanes.push({x0,y0,x1,y1,w:w||40,t0,t1})}
MV.fangLunge=t=>{const hits=2;
 for(let i=0;i<hits;i++){const t0=t+i*2.3,tgt={x:0,y:0};
  sch(t0,()=>{const b=G.boss;b.warn=1;tgt.x=clamp(P.x,AX+30,AX+AW-30);tgt.y=clamp(P.y,AY+40,AY+AH-16);apLane(b.x,b.y,tgt.x,tgt.y,t0,t0+1.1,bgeo().hf*2*U);sfx(300,.3,'sawtooth',.03,120)});
  sch(t0+1.1,()=>{const b=G.boss;tweenBossNow(tgt.x,tgt.y,t0+1.1,t0+1.45,p=>p*p);b.dash=true;b.dashHit=false;b.warn=0});
  sch(t0+1.45,()=>{G.boss.dash=false;G.shake=.35;sfx(90,.25,'square',.07,40);spawnPuff(G.boss.x,G.boss.y,8,'#8a969c')});
  sch(t0+1.8,()=>{tweenBossNow(HOME.x,HOME.y,t0+1.8,t0+2.2)})}
 return hits*2.3+.4};
MV.fangBite=t=>{const tgt={x:0,y:0};
 sch(t,()=>{const b=G.boss;b.warn=1;tgt.x=clamp(P.x,AX+40,AX+AW-40);tgt.y=b.y;apLane(b.x,b.y,tgt.x,tgt.y,t,t+1.1,30);tweenBossNow(tgt.x,tgt.y,t+.2,t+1.1)});
 sch(t+.5,()=>{zCirc(t+1.8,tgt.x,tgt.y+6,30,{tel:1.3,kind:'bite',dmg:15,dur:.3})});
 sch(t+1.8,()=>{G.boss.warn=0});
 sch(t+2.3,()=>tweenBossNow(HOME.x,HOME.y,t+2.3,t+2.9));
 return 3.3};
function apMaw(t,open){const tgt={x:0,y:0};
 sch(t,()=>{G.boss.warn=1;if(open)G.boss.openTw={b0:t,b1:t+1.2,to:1}});
 sch(t+.5,()=>{const q=typeof inA==='function'?inA(P.x,P.y,40,50):[clamp(P.x,AX+40,AX+AW-40),clamp(P.y,AY+50,AY+AH-16)];tgt.x=q[0];tgt.y=q[1];zCirc(t+2.0,tgt.x,tgt.y+4,32,{tel:1.5,kind:'bite',dmg:17,dur:.3})});
 sch(t+1.25,()=>{tweenBossNow(tgt.x,tgt.y-50,t+1.25,t+1.7,p=>Math.sin(p*Math.PI/2))});
 sch(t+1.7,()=>{tweenBossNow(tgt.x,tgt.y,t+1.7,t+2.0,p=>p*p);G.boss.warn=0});
 sch(t+2.0,()=>{G.shake=.4;sfx(80,.3,'square',.08,35);spawnPuff(tgt.x,tgt.y,10,'#8a969c');if(open)G.boss.openTw={b0:t+2.0,b1:t+2.3,to:0}});
 sch(t+2.6,()=>tweenBossNow(HOME.x,HOME.y,t+2.6,t+3.2));return 3.6}
MV.mawBite=t=>apMaw(t,true);
MV.pounce=t=>{const tgt={x:HOME.x,y:HOME.y};
 sch(t,()=>{G.boss.warn=1});
 sch(t+.3,()=>{tgt.x=clamp(P.x,AX+30,AX+AW-30);tgt.y=clamp(P.y,AY+40,AY+AH-16);zCirc(t+2.35,tgt.x,tgt.y,34,{tel:2.0,shadow:true,dmg:18,dur:.3})});
 sch(t+1.2,()=>{tweenBossNow(tgt.x,tgt.y-40,t+1.2,t+2.0,p=>Math.sin(p*Math.PI/2))});
 sch(t+2.0,()=>{tweenBossNow(tgt.x,tgt.y,t+2.0,t+2.35,p=>p*p);G.boss.warn=0});
 sch(t+2.35,()=>{G.shake=.5;sfx(70,.35,'square',.08,40);spawnPuff(tgt.x,tgt.y,12,'#8a969c')});
 sch(t+3.0,()=>{tweenBossNow(HOME.x,HOME.y,t+3.0,t+3.8)});
 return 4.2};
MV.phantomDash=t=>{const n=2+Math.min(1,G.phase);
 for(let i=0;i<n;i++){const t0=t+i*2.2,tgt={x:0,y:0};
  sch(t0,()=>{G.boss.warn=.8;sfx(200,.4,'sine',.04,60);const q=typeof inA==='function'?inA(P.x+(RND()<.5?-60:60),P.y-10,50,60):[P.x,P.y];tgt.x=q[0];tgt.y=q[1];zCirc(t0+.8,tgt.x,tgt.y,22,{tel:.8,harm:false,dur:.05,dmg:0})});
  sch(t0+.8,()=>{tweenBossNow(tgt.x,tgt.y,t0+.8,t0+.92);G.flash=Math.max(G.flash,.15)});
  sch(t0+.95,()=>{const dir=P.x>tgt.x?0:Math.PI;for(let k=0;k<5;k++){const a=dir-.9+k*.45;zCirc(t0+1.75+k*.05,tgt.x+Math.cos(a)*44,tgt.y+Math.sin(a)*30,18,{tel:.8+k*.05,dmg:12,dur:.25})}G.boss.warn=0})}
 sch(t+n*2.2,()=>tweenBossNow(HOME.x,HOME.y,t+n*2.2,t+n*2.2+.3));return n*2.2+.6};
/* 연출: 이동 목표 조준경 + "!" + 물기 턱 */
const APX={bite:new WeakSet()};
function apDraw(now,beat){if(G.state!=='play')return;const b=G.boss;if(!b||b.dorm)return;const g=bgeo();
 if(b.warn>.05){const bl=Math.floor(now/110)%2,y=Math.round(g.top-22-Math.abs(Math.sin(now/150))*3);R(g.x-4,y-2,9,14,'#05070a');R(g.x-2,y,5,7,bl?'#ffd23a':'#ffffff');R(g.x-2,y+9,5,2,bl?'#ffd23a':'#ffffff')}
 if(b.tw){const dx=b.tw.x1-b.tw.x0,dy=b.tw.y1-b.tw.y0;if(Math.hypot(dx,dy)>24&&!(Math.abs(b.tw.x1-HOME.x)<4&&Math.abs(b.tw.y1-HOME.y)<4)){const x=b.tw.x1,y=b.tw.y1,r=14+Math.round(3*Math.sin(now/80));for(let i=0;i<4;i++){const a=i*TAU/4+now/400;for(let k=0;k<5;k++)cPx(x+Math.cos(a)*(r-k),y+Math.sin(a)*(r-k)*.6,2,'#ff4d6d',.95)}cRing(x,y,r,'#ff4d6d',.5,1,.6)}}
 for(const z of G.zones){if(z.kind!=='bite'||beat<z.t0||beat>=z.t2)continue;const p=clamp((beat-z.t0)/(z.t1-z.t0),0,1),open=beat<z.t1?Math.round(z.r*.9*(1-.25*p)):Math.round(z.r*.9*Math.max(0,1-(beat-z.t1)/.12)),w=Math.round(z.r*1.2);
  for(const s of [-1,1]){const y0=Math.round(z.cy+s*open);R(z.cx-w/2,y0-(s<0?4:0),w,4,'#c9d3d8');for(let k=0;k<5;k++){const tx=z.cx-w/2+3+k*(w-6)/4;for(let j=0;j<4;j++)R(Math.round(tx-2+j/2),y0+(s<0?j:-j-1),Math.max(1,4-j),1,'#ffffff')}}
  if(beat>=z.t1&&!APX.bite.has(z)){APX.bite.add(z);sfx(900,.05,'square',.04,300);sfx(120,.14,'square',.06,50);cStar(z.cx,z.cy,10,'#ffffff',1)}}}
{const _cd3=cfxDraw;cfxDraw=function(now,beat){const r=_cd3.apply(this,arguments);try{apDraw(now,beat)}catch(e){}return r}}

