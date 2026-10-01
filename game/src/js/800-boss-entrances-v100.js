/* ================= 등장 연출 v100 — 40명 보스 모두 서로 다른 등장 =================
   기존 엔진(entStart/entTick/entBack/entFront/entClipStart)을 보스 열쇠별 정의로 교체.
   정의: tick(t,E) → {dx,dy,al}, back(t,E), front(t,E), clip(c,t,E) — t: ms, 착지는 대략 2000~2400ms */
const ENT2={};
function e2Key(){try{if(typeof _c3Swap!=='undefined'&&_c3Swap&&_c3Swap.art){const a=_c3Swap.art;return /^s4_/.test(a)?a:'c_'+a}}catch(e){}return 'b'+G.bi}
const e2S=(t,a,b)=>clamp((t-a)/(b-a),0,1);
function e2Fade(t){return t>2600?Math.max(0,1-(t-2600)/600):1}
function e2Parts(E,n,f){for(let i=0;i<n;i++)G.parts.push(f(i))}
{const _es=entStart;entStart=function(now){_es.apply(this,arguments);try{const k=e2Key(),d=ENT2[k];if(d&&G.ent){G.ent.def=d;G.ent.key=k;G.ent.kind='e2';G.ent.m={};if(d.init)d.init(G.ent,geo(G.B,HOME.x,HOME.y))}}catch(e){console.error(e)}}}
{const _et=entTick;entTick=function(now){const e=G.ent;if(!e||!e.def)return _et.apply(this,arguments);if(!G.cine||G.cine.type!=='intro'){if(!G.cine){G.ent=null;G.boss.x=HOME.x;G.boss.y=HOME.y}return}
 const t=now-e.t0,b=G.boss,g=geo(G.B,HOME.x,HOME.y);e.g=g;e.t=t;e.fire=(k,at,fn)=>entFire(k,t,at,fn);e.boom=(col,big)=>entBoom(g,col||G.B.c,big);let r={};try{r=e.def.tick(t,e)||{}}catch(err){}
 if(t>2400)e.hideHands=false;if(!e.hideHands&&!e.handsSet){e.handsSet=1;const hs=idleHandsAt(G.B,HOME.x,HOME.y,U);b.hands.forEach((h,i)=>{h.x=hs[i].x;h.y=hs[i].y;h.hide=false});for(const h of b.hands)spawnPuff(h.x,h.y,8,G.B.pal[2])}
 b.x=HOME.x+(r.dx||0);b.y=HOME.y+(r.dy||0);e.al=r.al==null?1:r.al;e.dy=r.dy||0}}
{const _eb=entBack;entBack=function(now){const e=G.ent;if(!e||!e.def)return _eb.apply(this,arguments);const t=now-e.t0;if(t>3400||!e.def.back)return;try{e.def.back(t,e,geo(G.B,HOME.x,HOME.y),e2Fade(t))}catch(err){}}}
{const _ef=entFront;entFront=function(now){const e=G.ent;if(!e||!e.def)return _ef.apply(this,arguments);const t=now-e.t0;if(t>3400)return;try{e.def.front&&e.def.front(t,e,geo(G.B,HOME.x,HOME.y),e2Fade(t))}catch(err){}if(t>2300&&t<3300){const k=(t-2300)/1000;RA(0,0,W,H,'#ffffff',Math.max(0,.3-k*.6))}}}
{const _ec=entClipStart;entClipStart=function(){const e=G.ent;if(!e||!e.def)return _ec.apply(this,arguments);ctx.save();if(e.def.clip){try{ctx.beginPath();e.def.clip(ctx,e.t||0,e,geo(G.B,HOME.x,HOME.y));ctx.clip()}catch(err){}}ctx.globalAlpha=ctx.globalAlpha*(e.al==null?1:e.al)}}
/* 공용 그림 도구 */
const e2Dark=(a)=>RA(0,0,W,H,'#000',a);
function e2Bolt(x0,y0,x1,y1,col,seed,a){let x=x0,y=y0;const n=9;for(let i=1;i<=n;i++){const k=i/n,nx=lerp(x0,x1,k)+(i<n?((hash(seed+'b'+i)%21)-10)*1.6:0),ny=lerp(y0,y1,k);line(x,y,nx,ny,1,(p,q)=>{RA(p-2,q-2,5,5,col,.35*a);RA(p-1,q-1,2,2,'#ffffff',a)});x=nx;y=ny}}
function e2Star(x,y,r,col,a){for(let i=-r;i<=r;i++){RA(Math.round(x+i),Math.round(y),1,1,col,a*(1-Math.abs(i)/(r+1)));RA(Math.round(x),Math.round(y+i),1,1,col,a*(1-Math.abs(i)/(r+1)))}RA(Math.round(x)-1,Math.round(y)-1,3,3,'#ffffff',a)}
function e2Glow(x,y,r,col,a){if(r<1||a<=0)return;const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');const o=ctx.globalCompositeOperation,ga=ctx.globalAlpha;ctx.globalCompositeOperation='lighter';ctx.globalAlpha=Math.min(1,a);ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);ctx.globalCompositeOperation=o;ctx.globalAlpha=ga}
const e2Ht=g=>g.y-g.top;
/* ================= 챕터 1 · 기계 ================= */
/* 톱니 파수꾼: 바닥 성문이 열리고 톱니 승강기로 솟아오름 */
ENT2.b0={tick(t,E){const g=E.g,k=eOut(e2S(t,600,2100));E.fire('r',0,()=>sfx(40,2,'sawtooth',.06,30));E.fire('l',2100,()=>E.boom(G.B.c,true));if(t<2100)G.shake=Math.max(G.shake,.2);return {dy:(1-k)*(e2Ht(g)+30)}},
 clip(c,t,E,g){c.rect(0,0,W,HOME.y+2)},back(t,E,g,f){const op=eOut(e2S(t,100,600))*g.hf*U*1.4;R(g.x-g.hf*U*1.4-op,g.y-4,g.hf*U*1.4,8,'#2a3430');R(g.x+op,g.y-4,g.hf*U*1.4,8,'#2a3430');RA(g.x-g.hf*U*1.3,g.y-3,g.hf*U*2.6,6,'#ff4d3a',.3*f);
  for(const s of [-1,1])bbGear(g.x+s*(g.hf*U*1.6+14),g.y-20,12,10,s*t/300,'#7f9a88','#1a2620','#ffd166')}};
/* 볼트 월: 번개 세 줄기가 차례로 내리꽂히며 깜빡이며 나타남 */
ENT2.b1={tick(t,E){[700,1150,1600].forEach((a,i)=>E.fire('b'+i,a,()=>{G.flash=Math.max(G.flash,.8);G.shake=Math.max(G.shake,.6);sfx(90,.5,'sawtooth',.08,40);sfx(2400,.2,'square',.03,200)}));E.fire('l',2100,()=>E.boom(G.B.c,false));return {al:t<700?0:t<2000?(Math.floor(t/60)%3===0?1:.15):1}},
 back(t,E,g){e2Dark(t<2100?.75:.75*Math.max(0,1-(t-2100)/500))},front(t,E,g){[700,1150,1600].forEach((a,i)=>{const k=(t-a)/260;if(k<0||k>=1)return;e2Bolt(g.x+(i-1)*40,0,g.x+(i-1)*12,g.coreY,'#7fd6ff',a,1-k)})}};
/* 용광로 골렘: 천장에서 쇳물이 쏟아져 몸이 부어짐 */
ENT2.b2={tick(t,E){E.fire('h',300,()=>sfx(300,1.5,'sawtooth',.03,120));E.fire('l',2100,()=>E.boom('#ff7a2a',true));return {al:e2S(t,900,2100)}},
 clip(c,t,E,g){const k=e2S(t,900,2100);c.rect(0,g.y-(g.y-g.top+20)*k,W,H)},back(t,E,g,f){if(t<2200){const w2=6+Math.sin(t/60)*2;for(let y=0;y<g.y;y+=4)RA(g.x-w2/2+Math.sin(y*.1+t/80)*2,y,w2,4,y%8?'#ff7a2a':'#ffb020',.9*f);pcirc(g.x,g.y-6,14+e2S(t,300,1500)*30,'#ff5a1f',.35*f)}}};
/* 철갑 열차: 기적 소리와 함께 오른쪽에서 돌진해 급정거 */
ENT2.b3={tick(t,E){const k=eOut(e2S(t,300,1500));E.fire('w',100,()=>{if(typeof perc==='function'&&audio)perc('whistle',audio.currentTime,1.2,700)});E.fire('s',1300,()=>sfx(1400,.7,'sawtooth',.03,300));E.fire('l',1550,()=>E.boom(G.B.c,false));if(t>300&&t<1500)G.shake=Math.max(G.shake,.35);return {dx:(1-k)*460}},
 back(t,E,g,f){if(t<1800){const b=G.boss;for(let i=0;i<10;i++)RA(b.x+40,b.y-20-i*6,80+RND()*60,2,'#ffffff',.12*f);for(let x=0;x<W;x+=16)R(x,g.y+2,10,2,'#5a4a3a');if(t>1100&&t<1700)for(let i=0;i<6;i++)RA(b.x-20+RND()*40,b.y-2,2,2,'#ffe36b',.9)}}};
/* 극저온 코어: 얼음 결정이 자라 감쌌다가 산산이 깨짐 */
ENT2.b4={tick(t,E,g){E.fire('c',1200,()=>sfx(1800,.4,'square',.03,900));E.fire('l',1700,()=>{E.boom(G.B.c,true);const g=E.g;for(let i=0;i<40;i++)G.parts.push({x:g.x+(RND()-.5)*40,y:g.coreY+(RND()-.5)*40,vx:(RND()-.5)*360,vy:(RND()-.5)*300,life:1.2,max:1.2,col:i%2?'#e8fbff':'#9fe8ff',s:3})});return {al:t<1700?0:1}},
 back(t,E,g){if(t<1750){const k=eOut(e2S(t,100,1200)),s=g.hf*U*1.3*k,cy=g.coreY;for(let j=-s;j<s;j+=2){const w2=(s-Math.abs(j))*.9;RA(g.x-w2,cy+j,w2*2,2,j<0?'#dff8ff':'#9fe8ff',.75)}if(t>1200)for(let i=0;i<5;i++){const a=i*1.3;line(g.x,cy,g.x+Math.cos(a)*s,cy+Math.sin(a)*s,2,(a2,b)=>RA(a2,b,1,1,'#ffffff',.9))}}}};
/* 스톰 하이브: 드론 떼가 사방에서 날아와 벌집처럼 조립 */
ENT2.b5={init(e,g){e.m.p=[];for(let i=0;i<60;i++){const a=RND()*TAU,r=260+RND()*120;e.m.p.push({sx:g.x+Math.cos(a)*r,sy:g.coreY+Math.sin(a)*r*.7,tx:g.x+(RND()-.5)*g.hf*U*1.8,ty:g.top+RND()*(g.y-g.top),d:RND()*500})}},
 tick(t,E){E.fire('s',100,()=>sfx(200,1.4,'sawtooth',.03,260));E.fire('l',1900,()=>E.boom(G.B.c,false));return {al:e2S(t,900,1900)}},
 front(t,E){for(const p of E.m.p){const k=eIn(e2S(t-p.d,200,1500));if(k>=1)continue;const x=lerp(p.sx,p.tx,k),y=lerp(p.sy,p.ty,k),f=Math.floor(t/50)%2;R(x-3,y-1,6,3,'#39434a');RA(x-4,y-3+f,3,1,'#c9d3d8',1);RA(x+1,y-3+f,3,1,'#c9d3d8',1);RA(x-1,y,2,1,'#ffe36b',1)}}};
/* 자석 크레인: 철골 크레인 줄에 매달려 떨어져 쾅 */
ENT2.b6={tick(t,E){const k=eIn(e2S(t,500,1600));E.fire('c',1600,()=>{E.boom(G.B.c,true);sfx(880,.6,'square',.05,440)});return {dy:-(1-k)*320}},
 back(t,E,g){const b=G.boss,top=geo(G.B,b.x,b.y).top;line(b.x,0,b.x,top,2,(a,c)=>R(a-1,c,3,2,'#6a6a6a'));if(t<1700)for(let i=0;i<4;i++)RA(b.x-6+i*4,top-8,2,8,'#8a8a8a',1)}};
/* 시계탑 자동인형: 거대한 시계판이 열두 번 째깍이며 인형이 떠오름 */
ENT2.b7={tick(t,E){for(let i=0;i<12;i++)E.fire('c'+i,300+i*150,()=>{sfx(660+(i%2)*220,.25,'triangle',.05,660);G.flash=Math.max(G.flash,.12)});E.fire('l',2200,()=>E.boom(G.B.c,true));return {dy:(1-eOut(e2S(t,400,2200)))*40,al:e2S(t,300,1400)}},
 back(t,E,g,f){if(t<2900){const r=g.hf*U*1.8;pcirc(g.x,g.coreY,r,'#fff6e0',.08*f);for(let i=0;i<12;i++){const a=i*TAU/12;RA(g.x+Math.cos(a)*r-2,g.coreY+Math.sin(a)*r-2,4,4,'#f0b8d2',.8*f)}const hq=t/80,mq=t/25;line(g.x,g.coreY,g.x+Math.cos(hq)*r*.5,g.coreY+Math.sin(hq)*r*.5,2,(a,b)=>RA(a-1,b-1,3,3,'#f0b8d2',.8*f));line(g.x,g.coreY,g.x+Math.cos(mq)*r*.8,g.coreY+Math.sin(mq)*r*.8,2,(a,b)=>RA(a-1,b-1,2,2,'#ffffff',.8*f))}}};
/* 광학 요새: 어둠 속 수많은 눈이 떠서 나를 겨누고, 레이저가 한곳으로 모임 */
ENT2.b8={tick(t,E){E.fire('s',400,()=>sfx(1200,1,'sine',.03,2400));E.fire('l',2000,()=>E.boom('#9fffe0',true));return {al:e2S(t,1500,2000)}},
 back(t,E,g,f){e2Dark(.92*(t<2300?1:Math.max(0,1-(t-2300)/500)))},front(t,E,g){if(t<2200)for(let i=0;i<16;i++){const ot=200+i*70;if(t<ot)continue;const a=i*2.4,x=g.x+Math.cos(a)*(150+(i%3)*30),y=g.coreY+Math.sin(a)*90,op=Math.min(1,(t-ot)/150);pcirc(x,y,4*op,'#9fffe0',.9);R(x-1,y-1,2,2,'#000');if(t>1300){const k=e2S(t,1300,1800);line(x,y,lerp(x,g.x,k),lerp(y,g.coreY,k),3,(a2,b)=>RA(a2-1,b-1,2,2,'#ff4d6d',.6))}}}};
/* 오메가 엔진: 칠흑 속 심장 박동 세 번, 박동마다 윤곽이 비침 */
ENT2.b9={tick(t,E){const beats=[500,1100,1700],g=E.g;beats.forEach((a,i)=>E.fire('h'+i,a,()=>{G.shake=Math.max(G.shake,.5+i*.2);G.flash=Math.max(G.flash,.25+i*.1);sfx(45,.5,'sine',.12,30);if(typeof perc==='function'&&audio){perc('kick',audio.currentTime,1.3);perc('kick',audio.currentTime+.16,.9)}fxRing(g.x,g.coreY,performance.now(),700,160+i*50,G.B.c)}));
  let v=0;for(const a of beats){const k=(t-a)/400;if(k>=0&&k<1)v=Math.max(v,1-k)}E.fire('l',2300,()=>E.boom(G.B.c,true));return {al:t<2300?v*.8:1}},back(t,E,g,f){e2Dark((t<2300?.92:.92*Math.max(0,1-(t-2300)/500))*f)}};
/* ================= 챕터 2 · 굶주림 ================= */
/* 뿌리아귀: 뿌리가 바닥을 찢고 뻗어 나와 몸을 끌어올림 */
ENT2.b10={tick(t,E){const k=eOut(e2S(t,900,2100));E.fire('r',100,()=>sfx(60,1.8,'sawtooth',.06,35));E.fire('l',2100,()=>E.boom(G.B.c,true));if(t<2100)G.shake=Math.max(G.shake,.18);return {dy:(1-k)*(e2Ht(E.g)+30)}},clip(c,t,E,g){c.rect(0,0,W,HOME.y+2)},
 back(t,E,g,f){for(let i=0;i<8;i++){const k=e2S(t,100+i*90,800+i*90),a=-Math.PI/2+(i-3.5)*.3,L=110*eOut(k),x0=g.x+(i-3.5)*16;let px=x0,py=g.y;for(let s=1;s<=8;s++){const nx=x0+Math.cos(a)*L*s/8+Math.sin(s+i)*4,ny=g.y+Math.sin(a)*L*s/8;line(px,py,nx,ny,1,(a2,b)=>R(a2-2,b-2,4-s*.3,4-s*.3,s%2?'#3a2a18':'#5a4028'));px=nx;py=ny}}for(let i=0;i<5;i++)RA(g.x-60+RND()*120,g.y-RND()*6,3,3,'#6a5a40',.8*f)}};
/* 포자여왕: 포자 안개가 피어나고 그 속에서 여왕이 드러남 */
ENT2.b11={tick(t,E){for(let i=0;i<5;i++)E.fire('p'+i,700+i*220,()=>sfx(500+i*80,.12,'sine',.04,900));E.fire('l',2000,()=>E.boom('#caff6b',false));return {al:e2S(t,600,2000)}},
 front(t,E,g){if(t<2400){const a=t<600?.95:.95*Math.max(0,1-(t-600)/1600);for(let i=0;i<60;i++){const x=(i*53+Math.sin(t/400+i)*20)%W,y=AY+((i*37)%AH)+Math.cos(t/500+i)*10;pcirc(x,y,14+(i%4)*4,i%3?'#6a3a8a':'#9ad63a',a*.35)}}}};
/* 늪지 아귀: 어둠 속 미끼 불빛 하나가 흔들리다가, 거대한 입이 순식간에 튀어나옴 */
ENT2.b12={tick(t,E){E.fire('lure',200,()=>sfx(880,1.4,'sine',.03,1100));E.fire('snap',1700,()=>{E.boom(G.B.c,true);sfx(120,.4,'square',.1,40)});const k=t<1700?0:eOut(e2S(t,1700,1950));return {al:t<1700?0:1,dy:(1-k)*60}},
 back(t,E,g,f){e2Dark(t<1700?.9:.9*Math.max(0,1-(t-1700)/500));for(let i=0;i<4;i++){const k=((t/700)+i/4)%1;pcirc(g.x,g.y,20+k*90,'#2e5a4a',(1-k)*.25*f)}},
 front(t,E,g){if(t<1750){const lx=g.x+Math.sin(t/300)*30,ly=g.coreY-20+Math.cos(t/420)*10;line(g.x,g.top-10,lx,ly,2,(a,b)=>RA(a,b,1,1,'#4a6a5a',.8));e2Glow(lx,ly,24,'#ffe79a',.8);pcirc(lx,ly,3,'#fff6c8',1)}}};
/* 백골 사냥개: 왼쪽 밖에서 울부짖으며 뛰어들어 미끄러지며 착지, 뼛조각이 흩날림 */
ENT2.b13={tick(t,E){E.fire('howl',150,()=>{sfx(300,1.2,'sawtooth',.05,900);sfx(450,1,'triangle',.03,1200)});const k=eOut(e2S(t,700,1500)),arc=Math.sin(e2S(t,700,1500)*Math.PI)*70;E.fire('l',1500,()=>E.boom(G.B.c,false));E.fire('skid',1500,()=>sfx(900,.5,'sawtooth',.03,200));return {dx:-(1-k)*420-(t>1500?0:0),dy:-arc,al:t<700?0:1}},
 back(t,E,g,f){if(t<700){e2Dark(.6);const q=t/700;RA(0,g.coreY-10,40,20,'#e8e2c8',.1+q*.2)}if(t>1500&&t<2300)for(let i=0;i<6;i++)RA(g.x-40-i*12,g.y-2,8,2,'#e8e2c8',(1-(t-1500)/800)*.8)},
 front(t,E,g){if(t>700&&t<1700){const b=G.boss;for(let i=0;i<5;i++)R(b.x-30-i*14+Math.sin(t/60+i)*3,b.y-20-i*4,5,2,'#e8e2c8')}}};
/* 실크 여제: 천장에서 실을 타고 흔들리며 내려옴 */
ENT2.b14={tick(t,E){const k=eOut(e2S(t,300,2200));E.fire('l',2200,()=>E.boom(G.B.c,false));return {dy:-(1-k)*300,dx:Math.sin(t/260)*10*(1-k)}},
 back(t,E,g){const b=G.boss,top=geo(G.B,b.x,b.y).top;line(b.x,0,b.x,top,2,(a,c)=>R(a-.5,c,1,2,'#e0d8f0'));for(let i=0;i<6;i++){const a=i*TAU/6;line(g.x,40,g.x+Math.cos(a)*80,40+Math.sin(a)*40,3,(a2,c)=>RA(a2,c,1,1,'#e0d8f0',.3))}}};
/* 말벌 군주: 위쪽에서 떼 지어 윙윙대다 사선으로 급강하 */
ENT2.b15={tick(t,E){const k=eIn(e2S(t,1100,1500));E.fire('buzz',300,()=>sfx(180,1.2,'sawtooth',.04,220));E.fire('l',1500,()=>E.boom(G.B.c,true));return {dy:-(1-k)*340,dx:(1-k)*120}},
 back(t,E,g,f){if(t<1500){const b=G.boss;for(let k=1;k<5;k++)RA(b.x+k*18-20,b.y-60-k*24,40,30,G.B.c,.08*f);for(let i=0;i<20;i++){const a=t/200+i,x=g.x+80+Math.cos(a)*60+i*3,y=40+Math.sin(a*1.3)*20;R(x,y,2,2,'#ffd23a')}}}};
/* 수정 기생체: 거울 파편이 날아와 육각 거울을 이루고, 거울 속 모습이 걸어 나옴 */
ENT2.b16={init(e,g){e.m.p=[];for(let i=0;i<36;i++){const a=RND()*TAU,r=240+RND()*80,ha=Math.floor(i/6)*TAU/6,hr=18+(i%6)*10;e.m.p.push({sx:g.x+Math.cos(a)*r,sy:g.coreY+Math.sin(a)*r*.7,tx:g.x+Math.cos(ha)*hr*1.4,ty:g.coreY+Math.sin(ha)*hr,d:RND()*400})}},
 tick(t,E){E.fire('s',100,()=>sfx(1600,1,'triangle',.03,2200));E.fire('shatter',1800,()=>{E.boom('#e0c3ff',true);sfx(2400,.5,'square',.04,600)});return {al:t<1800?e2S(t,1100,1700)*.35:1}},
 front(t,E,g){if(t<1850)for(const p of E.m.p){const k=eOut(e2S(t-p.d,0,1100)),x=lerp(p.sx,p.tx,k),y=lerp(p.sy,p.ty,k);pcirc(x,y,4,'#9a6ad8',.9);RA(x-1,y-2,2,2,'#ffffff',.9)}if(t>1100&&t<1850){const r=78;for(let i=0;i<6;i++){const a=i*TAU/6,b=(i+1)*TAU/6;line(g.x+Math.cos(a)*r,g.coreY+Math.sin(a)*r*.75,g.x+Math.cos(b)*r,g.coreY+Math.sin(b)*r*.75,1,(x,y)=>RA(x,y,2,2,'#e0c3ff',.8))}}}};
/* 심연 아귀왕: 바닥부터 심연의 물이 차오르고 소용돌이 속에서 솟구침 */
ENT2.b17={tick(t,E){const k=eOut(e2S(t,1300,2100));E.fire('w',100,()=>sfx(70,2,'sine',.08,40));E.fire('l',2100,()=>E.boom(G.B.c,true));return {dy:(1-k)*(e2Ht(E.g)+30),al:e2S(t,1200,1500)}},clip(c,t,E,g){c.rect(0,0,W,HOME.y+2)},
 back(t,E,g,f){const lvl=eOut(e2S(t,0,1100))*(H-AY)*.55*(t>2100?Math.max(0,1-(t-2100)/600):1);RA(0,H-lvl,W,lvl,'#0a1a3a',.75);for(let x=0;x<W;x+=6)RA(x,H-lvl+Math.sin(x*.05+t/200)*3,6,2,'#3a6aaa',.6);for(let i=0;i<4;i++){const a=t/300+i*TAU/4;for(let r=10;r<90;r+=6)RA(g.x+Math.cos(a+r*.05)*r,g.y-4+Math.sin(a+r*.05)*r*.25,2,2,'#1a3a6a',.5*f)}}};
/* 재의 유령: 재가 소용돌이치며 위로 모여 유령의 형체가 됨 */
ENT2.b18={tick(t,E){E.fire('s',100,()=>sfx(200,2,'sawtooth',.03,90));E.fire('l',2000,()=>E.boom('#ff9a5a',false));return {al:e2S(t,1200,2000),dy:(1-eOut(e2S(t,800,2000)))*-20}},
 front(t,E,g){if(t<2200){const q=e2S(t,0,1800);for(let i=0;i<70;i++){const a=i*2.4+t/300,r=(1-q)*160*((i%7)/7+.3)+10,x=g.x+Math.cos(a)*r,y=g.coreY+Math.sin(a)*r*.5-((t/8+i*13)%80)*(1-q);R(x,y,2,2,i%4?'#6a6460':'#ff9a5a')}}}};
/* 태초의 굶주림: 화면 위아래에서 거대한 이빨이 맞물렸다가 벌어지며 드러남 */
ENT2.b19={tick(t,E){E.fire('c',900,()=>{G.shake=1;sfx(50,.8,'sawtooth',.12,25);if(typeof perc==='function'&&audio)perc('crash',audio.currentTime,1)});E.fire('l',2000,()=>E.boom(G.B.c,true));return {al:t<1500?0:1}},
 front(t,E,g){const close=t<900?eIn(e2S(t,200,900)):t<1500?1:1-eOut(e2S(t,1500,2300));if(close<=0)return;const hh=H/2*close;R(0,0,W,hh,'#1a0610');R(0,H-hh,W,hh,'#1a0610');for(let x=0;x<W;x+=24){for(let k=0;k<12;k++){const w2=Math.max(1,12-k);R(x+12-w2/2,hh+k,w2,1,'#e8d8c0');R(x+12-w2/2,H-hh-k-1,w2,1,'#e8d8c0')}}RA(0,hh-3,W,3,'#ff2d55',.6);RA(0,H-hh,W,3,'#ff2d55',.6)}};
/* ================= 챕터 3 · 기원 ================= */
/* 한밤의 괘종: 거대한 칼날 추가 세 번 화면을 가로지르고, 세 번째에 시계가 서 있음 + 자정의 종 */
ENT2.c_pendulum={tick(t,E){[400,1000,1600].forEach((a,i)=>E.fire('s'+i,a,()=>{sfx(120,.5,'sawtooth',.05,60);try{voice('bell',57,.9,.05,audio.currentTime+.25)}catch(e){}}));E.fire('l',2000,()=>E.boom(G.B.c,true));return {al:t<1600?0:e2S(t,1600,1900)}},
 back(t,E,g,f){e2Dark(t<1900?.8:.8*Math.max(0,1-(t-1900)/500));for(let i=0;i<3;i++){const a0=400+i*600,k=(t-a0)/600;if(k<0||k>1.2)continue;const ang=Math.sin((k-.5)*Math.PI)*1.1*(i%2?-1:1),px=g.x,py=-40,L=g.y+10,ex=px+Math.sin(ang)*L,ey=py+Math.cos(ang)*L;line(px,py,ex,ey,2,(a,b)=>R(a-1,b,2,2,'#8a6420'));pcirc(ex,ey,16,'#d8a848');pcirc(ex,ey,10,'#fff0b0');for(let j=1;j<6;j++)RA(px+Math.sin(ang-j*.05*(i%2?-1:1))*L-8,py+Math.cos(ang)*L-8,16,16,'#d8a848',.12-j*.02)}}};
/* 감시탑: 어둠 속 탐조등이 훑다가 나를 찾아내고, 사이렌과 함께 탑이 켜짐 */
ENT2.c_panopticon={tick(t,E){E.fire('s',1500,()=>{sfx(700,1,'square',.04,500);sfx(900,1,'square',.03,600)});E.fire('l',2000,()=>E.boom('#ff4a4a',true));return {al:t<1500?.12:e2S(t,1500,1900)}},
 back(t,E,g,f){e2Dark(t<1900?.88:.88*Math.max(0,1-(t-1900)/500))},front(t,E,g,f){if(t>2100)return;const found=t>1200;for(const s of [-1,1]){const ang=found?Math.atan2(P.y-g.coreY,P.x-(g.x+s*50)):Math.PI/2+Math.sin(t/300+s)*.9,x0=g.x+s*50,y0=g.coreY;ctx.globalAlpha=.18;ctx.fillStyle=found?'#ff4a4a':'#ffe08a';ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x0+Math.cos(ang-.15)*420,y0+Math.sin(ang-.15)*420);ctx.lineTo(x0+Math.cos(ang+.15)*420,y0+Math.sin(ang+.15)*420);ctx.fill();ctx.globalAlpha=1}if(found&&Math.floor(t/120)%2)RA(0,0,W,H,'#ff2020',.08)}};
/* 꿈을 먹는 나방: 잠든 듯한 어둠 속 가루가 반짝이다가, 가운데서 날개가 좌우로 활짝 펼쳐짐 */
ENT2.c_moth={tick(t,E){E.fire('f',900,()=>sfx(220,1.2,'sine',.05,440));E.fire('l',2000,()=>E.boom('#ffd98a',false));return {al:e2S(t,800,1000)}},clip(c,t,E,g){const k=eOut(e2S(t,900,2000)),w=Math.max(2,k*W*.5);c.rect(g.x-w,0,w*2,H)},
 back(t,E,g,f){e2Dark(t<2000?.85:.85*Math.max(0,1-(t-2000)/500))},front(t,E,g){if(t<2200)for(let i=0;i<50;i++){const x=(i*71+Math.sin(t/500+i)*12)%W,y=AY+(i*43)%AH,a=.3+.7*Math.abs(Math.sin(t/300+i));RA(x,y,1,1,'#ffd98a',a*(t<1500?1:1-(t-1500)/700))}}};
/* 풀무 거인: 세 번의 큰 숨 — 숨마다 불티와 열기가 뿜어지고 몸이 아래부터 차오름 */
ENT2.c_bellows={tick(t,E){[500,1100,1700].forEach((a,i)=>E.fire('b'+i,a,()=>{sfx(90,.7,'sawtooth',.06,50);G.shake=Math.max(G.shake,.3+i*.15);const g=E.g;for(let j=0;j<20;j++)G.parts.push({x:g.x+(RND()-.5)*40,y:g.coreY,vx:(RND()-.5)*200,vy:-80-RND()*200,life:1,max:1,col:j%2?'#ffb020':'#ff5a1f',s:2})}));E.fire('l',2100,()=>E.boom('#ff7a2a',true));return {al:1}},
 clip(c,t,E,g){const k=t<500?0:t<1100?.33*eOut(e2S(t,500,800)):t<1700?.33+.33*eOut(e2S(t,1100,1400)):.66+.34*eOut(e2S(t,1700,2000));c.rect(0,g.y-(g.y-g.top+30)*k,W,H)},
 back(t,E,g,f){const h=[500,1100,1700].reduce((m,a)=>{const k=(t-a)/500;return k>=0&&k<1?Math.max(m,1-k):m},0);RA(0,0,W,H,'#ff5a1f',h*.18*f);e2Glow(g.x,g.y-10,80,'#ff7a2a',.3+h*.5)}};
/* 불협화음 지휘자: 박자기처럼 좌우로 크게 흔들리다가 점점 멈춰 섬 (똑 · 딱) */
ENT2.c_metronome={tick(t,E){for(let i=0;i<8;i++)E.fire('t'+i,200+i*240,()=>sfx(i%2?1200:900,.08,'square',.05,i%2?1200:900));E.fire('l',2200,()=>E.boom('#ffe36b',false));const amp=Math.max(0,1-t/2200);return {dx:t<200?0:Math.cos((t-200)/480*Math.PI)*160*amp*amp,al:e2S(t,0,300)}},
 back(t,E,g,f){if(t<2300){const amp=Math.max(0,1-t/2200);for(let i=-3;i<=3;i++)RA(g.x+i*40-1,g.y+4,2,6,'#ffe36b',.5*f);RA(g.x-160*amp*amp,g.y+8,320*amp*amp,1,'#ffe36b',.4*f)}}};
/* 거짓 달력: 달력 종이가 우수수 넘어가며 한 장씩 모습이 드러남 */
ENT2.c_calendar={init(e){e.m.pg=[];for(let i=0;i<24;i++)e.m.pg.push({x:RND()*W,d:i*70,r:RND()*TAU,v:(RND()-.5)*4})},tick(t,E){for(let i=0;i<10;i++)E.fire('p'+i,200+i*180,()=>sfx(2000+i*60,.06,'square',.02,1500));E.fire('l',2100,()=>E.boom('#ff5a5a',true));return {al:1}},
 clip(c,t,E,g){const n=Math.floor(e2S(t,200,2000)*10),top=g.top-30,hh=(g.y-top)/10;for(let i=0;i<n;i++)c.rect(0,top+i*hh,W,hh+1);if(n>=10)c.rect(0,0,W,H)},
 front(t,E,g){if(t<2200)for(const p of E.m.pg){const k=(t-p.d)/900;if(k<0||k>1)continue;const x=p.x+Math.sin(k*6+p.r)*20,y=-20+k*(H+40);ctx.save();ctx.translate(x,y);ctx.rotate(p.r+k*p.v);R(-7,-9,14,18,'#fff6e0');R(-7,-9,14,5,'#c83a3a');R(-4,-1,8,1,'#8a7a5a');R(-4,2,8,1,'#8a7a5a');ctx.restore()}}};
/* 먼지 원동기: 바닥의 모래가 거꾸로 흘러 올라가 모래시계처럼 몸을 채움 */
ENT2.c_dust={tick(t,E){E.fire('s',100,()=>sfx(400,1.8,'sawtooth',.02,120));E.fire('l',2000,()=>E.boom('#b07aff',false));return {al:1}},clip(c,t,E,g){const k=eOut(e2S(t,500,2000));c.rect(0,g.top-30,W,(g.y-g.top+40)*k)},
 back(t,E,g,f){if(t<2100){for(let i=0;i<50;i++){const q=((t/700)+i/50)%1,x=g.x+(i%9-4)*6+Math.sin(q*8+i)*4,y=g.y-q*(g.y-g.top+30);R(x,y,2,2,i%3?'#b8a8d8':'#e8e0ff')}pcirc(g.x,g.y+2,30,'#8a7aa8',.4*f)}}};
/* 심판의 저울: 쇠사슬에 매단 두 접시가 기울며 내려오고, 판결의 망치 소리와 함께 저울이 내리꽂힘 */
ENT2.c_scales={tick(t,E){E.fire('gavel',1900,()=>{E.boom('#fff0b0',true);sfx(80,.3,'square',.12,40);if(typeof perc==='function'&&audio)perc('taiko',audio.currentTime,1.4)});const k=eIn(e2S(t,1500,1900));return {dy:-(1-k)*260,al:t<1500?0:1}},
 back(t,E,g,f){if(t>2600)return;const k=eOut(e2S(t,100,1200)),tilt=Math.sin(t/300)*14*(1-e2S(t,1200,1900));for(const s of [-1,1]){const x=g.x+s*110,y=-40+k*(g.coreY+10)+s*tilt;line(x,0,x,y,3,(a,b)=>R(a-1,b,2,2,'#8a7a4a'));R(x-26,y,52,4,'#d8b860');R(x-20,y+4,40,3,'#8a7a4a');e2Glow(x,y,30,'#fff0b0',.3*f)}}};
/* 광산의 메아리: 칠흑 속 음파가 퍼질 때마다 모습이 잠깐 비치고, 마지막 음파에 완전히 나타남 */
ENT2.c_echo={tick(t,E){const pings=[300,850,1400,1950];pings.forEach((a,i)=>E.fire('p'+i,a,()=>sfx(1400-i*200,.6,'sine',.05,1400-i*200)));let v=0;for(const a of pings){const k=(t-a)/500;if(k>=0&&k<1)v=Math.max(v,(1-k)*.7)}E.fire('l',1950,()=>E.boom('#8ae8ff',false));return {al:t<1950?v:1}},
 back(t,E,g,f){e2Dark((t<1950?.92:.92*Math.max(0,1-(t-1950)/500))*f)},front(t,E,g){for(const a of [300,850,1400,1950]){const k=(t-a)/900;if(k<0||k>1)continue;cRing(g.x,g.coreY,Math.round(10+k*260),'#8ae8ff',(1-k)*.8,2)}}};
/* 정적: 모든 것이 멈춘 듯 흑백이 되고, 떨어지던 모래가 공중에 멈춤 — 째깍 한 번에 존재가 박힘 */
ENT2.c_stillness={tick(t,E){E.fire('tick',1600,()=>{sfx(1000,.05,'square',.06,1000);G.flash=1;G.shake=.6});E.fire('l',1700,()=>E.boom('#c8a0ff',true));return {al:t<1600?0:1}},
 back(t,E,g,f){if(t<1700){RA(0,0,W,H,'#20202a',.55);const fr=Math.min(1,t/900);for(let i=0;i<40;i++){const x=(i*61)%W,y=AY+((i*37+(t<900?t/6:150))%AH);R(x,y,1,3,'#c8c8d8')}}},
 front(t,E,g){if(t<1650){const r=Math.min(1,t/1500);cRing(g.x,g.coreY,Math.round(90*(1-r)+8),'#e8e0ff',.6,1);RA(g.x,g.top-20,1,g.y-g.top+20,'#ffffff',.4*r)}}};
/* ================= 챕터 4 · 별 ================= */
ENT2.s4_meteor={tick(t,E){E.fire('fall',100,()=>sfx(400,1,'sawtooth',.05,80));E.fire('l',1000,()=>{E.boom('#ff7a2a',true);G.shake=1.1});const k=e2S(t,1000,1900);return {al:t<1000?0:1,dy:(1-eOut(k))*30}},clip(c,t,E,g){c.rect(0,0,W,HOME.y+2)},
 back(t,E,g,f){if(t<1000){const q=eIn(t/1000),x=W+60-(W+60-g.x)*q,y=-40+(g.y-10+40)*q;e2Glow(x,y,30,'#ff7a2a',1);for(let i=0;i<20;i++)RA(x+i*6,y-i*4,4-i*.15,3,i<3?'#ffffff':'#ffb070',1-i/20)}else if(t<2600){const k=(t-1000)/1600;cRing(g.x,g.y,Math.round(20+k*140),'#ffb070',(1-k)*.8,2);pcirc(g.x,g.y+2,40,'#2a1410',.6*f);e2Glow(g.x,g.y,60,'#ff5a1f',(1-k)*.6)}}};
ENT2.s4_eclipse={tick(t,E){E.fire('c',1500,()=>{G.flash=1;sfx(70,1.4,'sine',.1,40)});E.fire('l',1900,()=>E.boom('#ffd98a',true));return {al:t<1500?0:e2S(t,1500,1800)}},
 back(t,E,g,f){e2Dark(t<1800?.85:.85*Math.max(0,1-(t-1800)/500));if(t<1900){const sx=g.x,sy=g.coreY,q=eOut(e2S(t,200,1500));e2Glow(sx,sy,90,'#ffd98a',1);pcirc(sx,sy,34,'#fff4c8',1);pcirc(sx-110+q*110,sy,33,'#05040a',1);if(q>.95)for(let i=0;i<16;i++){const a=i*TAU/16;line(sx+Math.cos(a)*36,sy+Math.sin(a)*36,sx+Math.cos(a)*(46+(i%2)*10),sy+Math.sin(a)*(46+(i%2)*10),1,(x,y)=>RA(x,y,2,2,'#ffd98a',1))}}}};
ENT2.s4_comet={tick(t,E){E.fire('a',100,()=>sfx(900,.8,'sawtooth',.03,300));E.fire('b',700,()=>sfx(900,.8,'sawtooth',.03,300));E.fire('l',1900,()=>E.boom('#8ae8ff',false));const k=eOut(e2S(t,1300,1900));return {dx:-(1-k)*420,dy:-(1-k)*80,al:t<1300?0:1}},
 back(t,E,g){for(const [a,dir,y] of [[0,1,60],[600,-1,90]]){const q=(t-a)/700;if(q<0||q>1)continue;const x=dir>0?-40+q*(W+80):W+40-q*(W+80);e2Glow(x,y,24,'#8ae8ff',1);for(let i=0;i<30;i++)RA(x-dir*i*6,y+Math.sin(i*.6)*2,2,2,i<3?'#ffffff':'#bff4ff',1-i/30)}if(t>1300&&t<2000){const b=G.boss;for(let i=0;i<20;i++)RA(b.x-20-i*8,b.y-40+i*2,3,2,'#bff4ff',1-i/20)}}};
ENT2.s4_nebula={tick(t,E){E.fire('s',300,()=>{sfx(180,2,'sine',.06,140);sfx(240,2,'sine',.04,200)});E.fire('l',2200,()=>E.boom('#b08aff',false));const k=eOut(e2S(t,300,2200));return {dx:-(1-k)*360,dy:Math.sin(t/300)*8*(1-k),al:e2S(t,300,900)}},
 back(t,E,g,f){for(let i=0;i<6;i++){const q=e2S(t,0,1500);e2Glow(g.x+Math.sin(i*2.1+t/900)*120,g.coreY-20+Math.cos(i*1.7)*50,70*q,i%2?'#ff8ad8':'#6ad8ff',.35*f)}for(let i=0;i<3;i++){const k=((t/900)+i/3)%1;cRing(G.boss.x,g.coreY,Math.round(20+k*120),'#b08aff',(1-k)*.4*f,1)}}};
ENT2.s4_gemini={tick(t,E){E.fire('m',1600,()=>{G.flash=1;sfx(700,.8,'square',.05,1400)});E.fire('l',1800,()=>E.boom('#ff9ad5',true));return {al:t<1600?0:1}},
 front(t,E,g){if(t>=1650)return;const q=eOut(e2S(t,0,1600)),r=(1-q)*220;for(const [s,col] of [[-1,'#ff9ad5'],[1,'#8ae8ff']]){const a=t/250*s,x=g.x+s*Math.cos(a)*r,y=g.coreY+Math.sin(a)*r*.4;e2Glow(x,y,22,col,1);e2Star(x,y,6,'#ffffff',1);for(let i=1;i<10;i++){const a2=(t-i*25)/250*s,rr=r+i*3;RA(g.x+s*Math.cos(a2)*rr,g.coreY+Math.sin(a2)*rr*.4,2,2,col,.7-i*.07)}}}};
ENT2.s4_void={tick(t,E){E.fire('s',100,()=>sfx(50,2,'sawtooth',.08,30));E.fire('l',2000,()=>E.boom('#b86aff',true));return {al:1}},clip(c,t,E,g){const k=eOut(e2S(t,1300,2000));c.arc(g.x,g.coreY,Math.max(1,k*260),0,TAU)},
 back(t,E,g,f){e2Dark(t<2000?.7:.7*Math.max(0,1-(t-2000)/500));for(let i=0;i<5;i++){const k=1-(((t/500)+i/5)%1);cRing(g.x,g.coreY,Math.round(k*220+4),'#b86aff',.5*(1-k)*f,1)}if(t<1400){pcirc(g.x,g.coreY,4,'#000',1);cRing(g.x,g.coreY,7,'#ff9a4a',1,1)}}};
ENT2.s4_nova={tick(t,E){E.fire('n',1500,()=>{G.flash=1;G.shake=1;sfx(40,1.4,'sawtooth',.13,20);if(typeof perc==='function'&&audio)perc('crash',audio.currentTime,1)});E.fire('l',1700,()=>E.boom('#ffd166',true));return {al:t<1500?0:1}},
 back(t,E,g,f){if(t<1550){const q=t/1500;e2Glow(g.x,g.coreY,20+q*90,'#ffd166',1);e2Star(g.x,g.coreY,Math.round(3+q*12),'#ffffff',1)}else if(t<2500){const k=(t-1500)/1000;for(let i=0;i<12;i++){const a=i*TAU/12;ctx.globalAlpha=(1-k)*.25;ctx.fillStyle='#ffd166';ctx.beginPath();ctx.moveTo(g.x,g.coreY);ctx.lineTo(g.x+Math.cos(a-.06)*400,g.coreY+Math.sin(a-.06)*400);ctx.lineTo(g.x+Math.cos(a+.06)*400,g.coreY+Math.sin(a+.06)*400);ctx.fill()}ctx.globalAlpha=1;cRing(g.x,g.coreY,Math.round(k*300),'#fff4c8',1-k,2)}}};
ENT2.s4_luna={tick(t,E){E.fire('m',200,()=>{try{[0,3,7,12].forEach((d,i)=>voice('bell',74+d,.8,.03,audio.currentTime+i*.3))}catch(e){}});E.fire('l',2100,()=>E.boom('#d8e8ff',false));return {al:1}},
 clip(c,t,E,g){const k=eOut(e2S(t,300,2100)),R2=g.y-g.top+60,off=(1-k)*R2*2.1;c.arc(g.x-off,g.coreY,R2,0,TAU)},
 back(t,E,g,f){e2Dark(t<2100?.6:.6*Math.max(0,1-(t-2100)/500));e2Glow(g.x,g.coreY,120,'#8ab8ff',.35*f);for(let i=0;i<40;i++){const x=(i*57)%W,y=AY+(i*31)%AH;RA(x+Math.sin(t/600+i)*6,y,1,1,'#eef4ff',.5*f)}}};
ENT2.s4_weaver={tick(t,E){for(let i=0;i<8;i++)E.fire('st'+i,200+i*150,()=>sfx(1200+i*100,.1,'triangle',.03,1600));E.fire('l',2100,()=>E.boom('#ffe9a8',false));return {al:1}},
 clip(c,t,E,g){const n=Math.floor(e2S(t,1300,2100)*8),top=g.top-30,hh=(g.y-top)/8;for(let i=0;i<n;i++){const L=i%2===0;c.rect(L?0:0,top+i*hh,W,hh+1)}if(n>=8)c.rect(0,0,W,H)},
 back(t,E,g,f){const pts=[];for(let i=0;i<8;i++){const a=i*TAU/8+.3;pts.push([g.x+Math.cos(a)*110,g.coreY+Math.sin(a)*70])}pts.forEach((p,i)=>{const on=t>200+i*150;if(!on)return;e2Star(p[0],p[1],4,'#ffe9a8',f);const q=e2S(t,300+i*150,1200+i*150),nx=pts[(i+1)%8];if(q>0)line(p[0],p[1],lerp(p[0],nx[0],q),lerp(p[1],nx[1],q),1,(x,y)=>RA(x,y,1,1,'#ffe9a8',.7*f));const q2=e2S(t,1200,1800);if(q2>0)line(p[0],p[1],lerp(p[0],g.x,q2),lerp(p[1],g.coreY,q2),2,(x,y)=>RA(x,y,1,1,'#fffbe8',.5*f))})}};
ENT2.s4_last={tick(t,E){E.fire('c',100,()=>sfx(60,2,'sine',.08,90));E.fire('f',1900,()=>{G.flash=1;G.shake=1.2});E.fire('l',2100,()=>E.boom('#fff4c8',true));return {al:t<1900?0:1}},
 back(t,E,g,f){e2Dark(t<2000?.8:.8*Math.max(0,1-(t-2000)/500));const q=eIn(e2S(t,0,1900));for(let i=0;i<80;i++){const sx=(i*97.3)%W,sy=(i*53.1)%H,x=lerp(sx,g.x,q),y=lerp(sy,g.coreY,q);RA(x,y,1+(i%5===0),1+(i%5===0),'#ffffff',.9)}if(t<2000)e2Glow(g.x,g.coreY,20+q*110,'#fff4c8',q)}};

