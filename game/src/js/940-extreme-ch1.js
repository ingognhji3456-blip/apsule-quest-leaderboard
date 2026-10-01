/* ===== 챕터 1 익스트림 업그레이드 — 기계 보스: 정밀 가공 금속 · 리벳 · 패널 이음새 · 연마 하이라이트 · 발광 도관 · 원소 효과 ===== */
{
const fr=x=>x-Math.floor(x),rn=i=>fr(Math.sin(i*127.1+311.7)*43758.5453);
/* 지그재그 전격: 바깥 번짐 + 흰 심 */
const zap=(A,x0,y0,x1,y1,n,amp,seed,cw,cg,al)=>{al=al==null?1:al;let px=x0,py=y0;const dx=x1-x0,dy=y1-y0,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L;for(let i=1;i<=n;i++){const k=i/n,o=i<n?(rn(seed*7.31+i*1.7)-.5)*2*amp:0,qx=x0+dx*k+nx*o,qy=y0+dy*k+ny*o;A.L(px,py,qx,qy,cg,.9,.4*al);A.L(px,py,qx,qy,cw,.34,al);px=qx;py=qy}};
/* 리벳: 그림자 + 머리 + 반짝 점 */
const riv=(A,x,y,r,lt)=>{A.C(x+.12,y+.12,r,'#05070a',.85);A.C(x,y,r*.78,lt||'#9aa6b4');A.R(x-r*.45,y-r*.45,.34,.34,'#ffffff',.85)};
/* 연마된 모서리 하이라이트 (밝은 선 + 짧은 반짝) */
const bevel=(A,x0,y0,x1,y1,col,al,t,sp)=>{A.L(x0,y0,x1,y1,col,.34,al);const q=fr(t*(sp||.35));if(q<.4){const k=q/.4;A.R(x0+(x1-x0)*k-.4,y0+(y1-y0)*k-.4,.8,.8,'#ffffff',Math.sin(k*Math.PI)*.9)}};

/* ── b0 톱니 파수꾼: 정밀 톱날(연마 날끝 · 허브 볼트 · 불꽃), 배기 스택, 리벳 장갑, 녹색 에너지 도관 ── */
const b0v=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.6,wL=A.win('gearLaunch'),wR=Math.max(A.win('treadRush'),A.warn),wC=A.win('coreOrbit'),rel=A.rel('gearLaunch')>0,sh=A.shake(wR>.3||wL>.7?.3:0),lean=wR*1.2,Y=b+lean*.4;return {g,t,b,wL,wR,wC,rel,sh,lean,Y}};
EXU.b0={
 pre(A){const {g,t,wL,wR,rel,sh,Y,lean}=b0v(A);
  /* 톱날 회전 잔상 (날끝 궤적만) */if(!rel)for(const s of [-1,1]){const gx=s*(g.hf+1.2)+sh,gy=g.sh+Y-1.6-2;A.ring(gx,gy,4.3,.35,'#eef2f8',.12+wL*.35)}},
 post(A){const {g,t,wL,wR,wC,rel,sh,Y,lean}=b0v(A),ac='#6affb0';
  /* 몸통 패널 이음새 + 연마 모서리 */const tY=g.top+Y+1,bY=-4.6+Y;A.L(-g.hf-1.2+sh,tY+.3,g.hf+1.2+sh,tY+.3,'#a8b4c0',.34,.7);
  for(const s of [-1,1]){A.L(s*4.6+sh,tY+1,s*4.2+sh,bY-.3,'#0a0c10',.3,.9);A.L(s*4.6+.3+sh,tY+1,s*4.2+.3+sh,bY-.3,'#5a6674',.25,.6)}
  for(let i=0;i<9;i++){const x=-g.hf+.2+i*(g.hf*2-.4)/8+sh;if(Math.abs(x-sh)<3.4)continue;riv(A,x,tY+1,.32)}
  for(const s of [-1,1])for(let k=0;k<3;k++)riv(A,s*(g.hf-.3)+sh,tY+2.4+k*2,.3);
  /* 녹색 에너지 도관 (옆 장갑을 타고 흐름) */for(const s of [-1,1]){const x=s*6.2+sh,y0=bY-.8,y1=tY+2.2;A.L(x,y0,x,y1,'#0a1410',.6);A.L(x,y0,x,y1,ac,.26,.55+wC*.4);for(let k=0;k<2;k++){const q=fr(t*1.1+k*.5+(s>0?.25:0));A.R(x-.35,y0-(y0-y1)*q-.5,.7,1,'#eafff4',.9);A.glow(x,y0-(y0-y1)*q,1.6,ac,.6)}A.C(x,y1,.4,ac)}
  /* 가슴 화로: 육각 볼트 + 열기 */{const cy=g.core+Y-.3;for(const [dx,dy] of [[-2.8,-2.2],[2.8,-2.2],[-1.9,2.4],[1.9,2.4]])riv(A,dx+sh,cy+dy,.34,'#c8a050');A.L(-3+sh,cy-2.6,3+sh,cy-2.6,'#d8b060',.3,.8);A.glow(sh,cy+1,3.5,'#ff8a3a',.35+.15*Math.sin(t*6))}
  /* 톱날: 연마 테 · 날끝 반짝 · 허브 볼트 · 비산 불꽃 */if(!rel)for(const s of [-1,1]){const gx=s*(g.hf+1.2)+sh,gy=g.sh+Y-1.6-2,n=10,r=2.8,sp=t*s*(1.5+wL*14);
   A.ring(gx,gy,r,.4,'#eef2f8',.85);A.ring(gx,gy,r*.84,.3,'#d8b060',.75);A.ring(gx,gy,r*.72,.25,'#5a7ad8',.6);A.ring(gx,gy,r*.62,.2,'#2a3038',.9);for(let i=0;i<n;i++){const a=sp+i*TAU/n,tx=gx+Math.cos(a)*r+Math.cos(a+.5)*1.25,ty=gy+Math.sin(a)*r+Math.sin(a+.5)*1.25;A.R(tx-.25,ty-.25,.5,.5,'#ffffff',.55+.45*Math.max(0,-Math.sin(a)))}
   for(let i=0;i<4;i++){const a=sp*1+i*TAU/4;A.C(gx+Math.cos(a)*1.05,gy+Math.sin(a)*1.05,.26,'#c8ccd4')}A.L(gx-r*.7,gy-r*.35,gx-r*.35,gy-r*.72,'#ffffff',.3,.75);
   const nS=1+Math.round(wL*3);for(let k=0;k<nS;k++){const q=fr(t*2.2+k*.37+(s>0?.5:0)),a0=Math.PI*.5+s*(-.9+rn(Math.floor(t*2.2+k*.37)*3+k)*.8);A.spark(gx+Math.cos(a0)*(r+1)+s*q*4,gy+Math.sin(a0)*(r+1)+q*2.5-q*q*1.5,.5,q<.5?'#fff2b0':'#ff9a40',1-q)}}
  /* 투구: 능선 하이라이트 · 바이저 주사선 · 뿔 파이프 황동 띠 */{const hy=g.top+Y-2.6-(wC>0?wC*.5:0),hx=sh+lean;bevel(A,hx-3.4,hy-1.8,hx,hy-4.4,'#b8c4d0',.75,t,.4);A.L(hx,hy-4.4,hx+3.4,hy-1.8,'#5a6674',.3,.6);riv(A,hx-3,hy+1.8,.28);riv(A,hx+3,hy+1.8,.28);
   for(const s of [-1,1]){A.R(hx+s*3.6-.65,hy-3.2,1.3,.45,'#c8a050');A.R(hx+s*3.6-.65,hy-2.2,1.3,.3,'#8a6a30')}
   if(!A.dm){const sc=fr(t*.8);A.R(hx-2.5+sc*4.6,hy+.05,.5,.5,'#ffffff',.9);A.L(hx-3.2,hy+.3,hx+3.2,hy+.3,'#ffffff',.2,.18)}}
  /* 궤도: 링크 반짝 + 크롬 허브캡 + 펜더 리벳 */for(const wx of [-8.5,-4,0,4,8.5]){const a=t*(2+wR*8);A.C(wx,-2.4,.5,'#dfe6ee');A.L(wx,-2.4,wx+Math.cos(a)*1.1,-2.4+Math.sin(a)*1.1,'#9aa6b4',.25)}
  for(let i=-11;i<=11;i+=2.75)riv(A,i,-4.1,.26,'#7a8694');A.L(-12,-4.85,12,-4.85,'#a8b4c0',.25,.55);const tr=(t*(1.5+wR*8)*3)%2.4;for(let i=-11;i<12;i+=2.4)A.R(i+tr-.15,-6.1,.3,.6,'#e8eef4',.7)}};

/* ── b1 볼트 월: 테슬라 토로이드, 상시 방전 아크, 회로 기판 문양, 광택 구리 코일 · 유약 애자 ── */
const b1v=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.4,wA=A.win('teslaArc'),wB=A.win('currentBarrier'),ch=Math.max(wA,wB,A.eyeC),sh=A.shake(ch>.5?.3:0),top=g.top+b-1.4,bot=-5.2+b;return {g,t,b,ch,sh,top,bot}};
EXU.b1={
 pre(A){const {g,t,b,ch,sh,top}=b1v(A),ca='#6ae8ff';
  /* 코로나 방전: 몸 뒤에서 바깥으로 튀는 가지 번개 */const sd=Math.floor(t*9);for(let i=0;i<3+Math.round(ch*3);i++){const a=-Math.PI*.1-rn(sd*5+i)*Math.PI*.8-(i%2?0:Math.PI*.1),r0=5,r1=10+rn(sd*3+i*7)*4+ch*3,cy=g.core+b;zap(A,sh+Math.cos(a)*r0,cy+Math.sin(a)*r0*.9,sh+Math.cos(a)*r1,cy+Math.sin(a)*r1*.9,5,.9,sd+i*13,'#eaffff',ca,.35+ch*.5)}
  /* 테슬라 토로이드 (코일 꼭대기 도넛) */for(const s of [-1,1]){const ox=s*(g.hf+.6)+sh,oy=top+3.4-3.9;A.E(ox,oy,2.5,.95,'#07090c');A.E(ox,oy-.1,2.2,.75,'#8a96a4');A.E(ox-.5,oy-.35,1.3,.28,'#eef4fa');A.E(ox,oy+.25,1.6,.25,'#3a4450');A.glow(ox,oy,3+ch*3,ca,.35+ch*.4)}},
 post(A){const {g,t,b,ch,sh,top,bot}=b1v(A),ca='#6ae8ff',ra=.35+ch*.65;
  /* 회로 기판 문양 (꺾인 배선 + 노드) */for(const s of [-1,1]){for(let k=0;k<3;k++){const x0=s*(2.6+k*.3)+sh,y0=top+6+k*2.6,x1=s*(4.4+k*.6)+sh,y1=y0+1.4,x2=s*(g.hf-1.6)+sh;A.L(x0,y0,x1,y0,'#0e3a48',.3);A.L(x1,y0,x1+s*.9,y1,'#0e3a48',.3);A.L(x1+s*.9,y1,x2,y1,'#0e3a48',.3);
    const q=fr(t*1.3+k*.33+(s>0?.15:0)),px=q<.5?x0+(x1-x0)*q*2:x1+s*.9+(x2-x1-s*.9)*(q-.5)*2,py=q<.5?y0:y1;A.R(px-.25,py-.25,.5,.5,'#ffffff',.9);A.glow(px,py,1.2,ca,.5);A.C(x0,y0,.3,ca,ra);A.C(x2,y1,.3,ca,ra)}}
  /* 몸 연마 모서리 + 리벳 */A.L(-g.hf+2.6+sh,top+.25,g.hf-2.6+sh,top+.25,'#9aaabb',.3,.7);A.L(-g.hf+.4+sh,top+4.2,-g.hf+1.5+sh,bot-.4,'#7a8a9a',.3,.55);for(const s of [-1,1])for(let k=0;k<4;k++)riv(A,s*(g.hf-1.2-k*.24)+sh,top+5+k*2.4,.26,'#6a7a8a');
  /* 애자: 유약 광택 + 발 리벳 */for(const s of [-1,1]){const lx=s*5.6+sh;for(let i=0;i<4;i++){const yy=-1-i*1.3;A.R(lx-1.6+i*.12,yy-.3,.9,.25,'#ffffff',.8);A.R(lx+.6,yy-.1,.7,.2,'#5a6878',.6)}A.R(lx-2.4,-.6,4.8,.6,'#3a4450');riv(A,lx-1.7,-.3,.24);riv(A,lx+1.7,-.3,.24)}
  /* 구리 코일: 광택 줄 + 코일 위를 기는 미세 아크 */for(const s of [-1,1]){const ox=s*(g.hf+.6)+sh,oy=top+3.4;for(let i=0;i<5;i++){const yy=oy-2+i;A.R(ox-2.2+(i%2)*.3,yy-.3,1.6,.2,'#ffe0b8',.75);A.R(ox+.8,yy-.1,.8,.2,'#ffb070',.45)}
   const sd=Math.floor(t*14+(s>0?3:0));if(sd%3!==1){const y0=oy-2+rn(sd)*4;zap(A,ox-2.8,y0,ox+2.8,y0+(rn(sd+1)-.5)*2,4,.45,sd*2+s,'#ffffff',ca,.75)}}
  /* 상시 방전: 뿔 → 토로이드 */{const sd=Math.floor(t*11);for(const s of [-1,1])if((sd+(s>0?1:0))%2===0)zap(A,s*3.5+sh,top-6.4-ch*.8,s*(g.hf+.6)+sh,top+3.4-4.3,6,.9,sd*3+s*5,'#ffffff',ca,.85)}
  /* 뿔 끝 플라스마 구 */for(const s of [-1,1]){const px=s*3.5+sh,py=top-.6-5.6-ch*.8;A.ring(px,py,1.15+.15*Math.sin(t*9+s),.25,'#bff6ff',.75);A.R(px-.45,py-.45,.35,.35,'#ffffff');for(let k=0;k<3;k++){const a=t*6*s+k*TAU/3;A.spark(px+Math.cos(a)*1.6,py+Math.sin(a)*1.6,.35,'#eaffff',.8)}}
  /* 룬 코어: 내부 번개 */{const cy=g.core+b+.6,sd=Math.floor(t*16);zap(A,sh,cy-3,sh,cy+3,5,.55,sd,'#ffffff',ca,.9);A.L(sh,cy-4,sh+2,cy,'#eaffff',.22,.6);A.L(sh,cy-4,sh-2,cy,'#eaffff',.22,.6)}
  /* 바이저 주사선 */if(!A.dm){const hy=top-.6,q=fr(t*.7);A.R(-2.6+q*5.2+sh,hy+.3,.5,.7,'#ffffff',.8)}}};

/* ── b2 용광로 골렘: 흑요석 광택, 맥동하는 용암 균열망, 녹은 쇳물 방울, 굴뚝 화염, 달군 뿔 끝 ── */
const b2v=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.5,wD=A.win('doorBlast'),wC=A.win('chimneyEmber'),wF=A.win('moltenFist'),heat=Math.max(wD,wC,wF,A.open*.8),sh=A.shake(heat>.6?.3:0),hunch=wF*1.2,cy=g.core+b+hunch*.6;return {g,t,b,wD,wC,wF,heat,sh,hunch,cy}};
EXU.b2={
 pre(A){const {g,t,b,wC,heat,sh,hunch}=b2v(A);
  /* 발밑 용암 웅덩이 빛 */A.E(sh,-.3,10,1.1,'#ff5a1f',.22+heat*.2);A.E(sh,-.3,6,.6,'#ffb020',.25);
  /* 굴뚝 뿔 화염 (뒤에서 솟음) */for(const s of [-1,1]){const ox=s*(g.hf-.4)+sh,oy=g.top+b+2.2-hunch*.4,fx=ox+s*1.6+s*1.4,fy=oy-3.4-5.4,H=3.2+wC*3+heat*1.2;
   for(let k=0;k<4;k++){const ph=t*9+k*1.9+s,w=1.1-k*.18,hh=H*(1-k*.18)*(.8+.2*Math.sin(ph)),dx=Math.sin(ph*.7)*.5;A.P([[fx-w,fy+.3],[fx+w,fy+.3],[fx+dx+Math.sin(ph)*.4,fy-hh]],['#ff3a10','#ff7a20','#ffb020','#fff0a0'][k],.85)}A.glow(fx,fy-1.5,4+wC*4,'#ff7a2a',.6+wC*.5)}},
 post(A){const {g,t,b,wD,wC,heat,sh,hunch,cy}=b2v(A),pulse=.65+.35*Math.sin(t*3.2),hb=Math.min(1,(.45+heat*.55)*pulse+.15);
  const lava=(x0,y0,x1,y1,w)=>{A.L(x0,y0,x1,y1,'#07040a',(w||.4)+.25);A.L(x0,y0,x1,y1,'#ff6a1a',w||.4,.95);A.L(x0,y0,x1,y1,heat>.5?'#ffffff':'#fff0a0',(w||.4)*.45,hb)};
  /* 흑요석 광택: 날카로운 유리 반사 */for(const s of [-1,1]){const ox=s*(g.hf-.4)+sh,oy=g.top+b+2.2-hunch*.4;A.L(ox-s*2.6,oy-2.6,ox-s*.6,oy-3.6,'#ffffff',.3,.45);A.L(ox-s*2.2,oy-2,ox-s*1.6,oy-2.3,'#ffffff',.25,.3);A.P([[ox+s*1.4,oy+.4],[ox+s*3.4,oy-.8],[ox+s*3,oy+1.6]],'#3a2622',.8);
   /* 분기 용암 균열 */lava(ox+s*2.6,oy+1.2,ox+s*4,oy+2.4,.35);lava(ox-s*1,oy-1.6,ox-s*.2,oy-3.4,.35);lava(ox+s*1.6,oy+.2,ox+s*3.2,oy-1.2,.3)}
  A.L(-5+sh,cy-1+1.2,-3+sh,cy-2,'#ffffff',.25,.35);A.E(sh-3.6,cy+.4,1.2,.35,'#ffffff',.18);
  /* 배 균열망 */lava(-5.4+sh,cy+1,-3.8+sh,cy+3.4,.4);lava(-3.8+sh,cy+3.4,-4.6+sh,cy+5.6,.32);lava(5.2+sh,cy+.4,4+sh,cy+3,.4);lava(4+sh,cy+3,4.8+sh,cy+5.4,.32);lava(-3.8+sh,cy+3.4,-2.6+sh,cy+3.8,.28);
  for(const s of [-1,1]){const lx=s*5+sh;lava(lx+s*1.4,-4.8,lx+s*.6,-1.6,.32)}
  /* 화로 문: 넘실대는 불꽃 + 백열 심 */{const dy=cy+2,op=Math.max(wD,A.open,A.expose?1:0);for(let k=0;k<5;k++){const x=(k-2)*1.15+sh,h=1.2+op*2+.6*Math.sin(t*11+k*2.1);A.P([[x-.45,dy+1.2],[x+.45,dy+1.2],[x+Math.sin(t*7+k)*.3,dy+1.2-h]],k%2?'#ffb020':'#fff0a0',.75)}A.C(sh,dy+.6,.9,'#ffffff',.5+op*.5);A.glow(sh,dy,5+op*5,'#ff9a30',.4)}
  /* 녹은 쇳물 방울 (균열에서 떨어짐) */for(let k=0;k<4;k++){const q=fr(t*.7+k*.27),sx=[-5.2,5,-3.8,4.6][k]+sh,sy=[cy+5.2,cy+5,g.top+b+5.2,g.top+b+5.6][k],fall=q*q*9;if(sy+fall>-.4)continue;A.L(sx,sy,sx,sy+fall*.6,'#ff6a1a',.25,.5*(1-q));A.C(sx,sy+fall,.38,'#ffd070');A.R(sx-.1,sy+fall-.15,.25,.25,'#ffffff')}
  A.rise(6,-9+sh,9+sh,-2,16,.55,'#ffb040',.45,.3);
  /* 머리 뿔: 끝이 달궈져 빛남 */{const hy=g.top+b+2.4+hunch*.8,hx=sh+hunch*.3;for(const s of [-1,1]){A.P([[hx+s*3.4,hy-4.4],[hx+s*4.2,hy-5.4],[hx+s*3.6,hy-3.8]],'#ff8a30',.9);A.R(hx+s*4.05-.2,hy-5.3,.4,.4,'#fff0a0');A.glow(hx+s*4,hy-5,2,'#ff7a2a',.7);A.L(hx+s*1.8,hy-1.6,hx+s*3.4,hy-3.2,'#e8d8c8',.22,.5)}
   if(!A.dm)for(const s of [-1,1])A.glow(hx+s*1.1,hy-.4,2.4+heat*2,'#ffdd70',.8)}}};

/* ── b3 철갑 열차: 황동 띠 · 리벳 보일러, 연기실 테, 전조등 렌즈 플레어, 크롬 바퀴 · 크랭크, 화실 불빛, 실린더 증기 ── */
const b3v=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.4,wH=Math.min(1,A.win('headlamp')+A.eyeC),wS=A.win('steamWhistle'),wR=A.warn,sh=A.shake(wS>.4||wR>.3?.3:0),rot=t*(2+wR*12),top=g.top+b,fx=sh,fy=g.core+b-.4;return {g,t,b,wH,wS,wR,sh,rot,top,fx,fy}};
EXU.b3={
 pre(A){const {g,t,wS,wR,sh,top}=b3v(A);
  /* 실린더 증기 분사 (바퀴 옆 바깥으로, 부드러운 빛 덩이) */for(const s of [-1,1])for(let k=0;k<4;k++){const q=fr(t*(1.1+wR*2)+k/4+(s>0?.12:0));A.glow(s*(11+q*6)+sh,-1.6-q*2.4,1.6+q*3,'#dfe6ee',(1-q)*(.5+wR*.4))}},
 post(A){const {g,t,b,wH,wS,sh,rot,top,fx,fy}=b3v(A),br='#d8a850',bl='#fff0b8';
  /* 보일러 황동 테 + 리벳 줄 */A.L(-g.hf+1.6+sh,top+.25,g.hf-1.6+sh,top+.25,br,.4);A.L(-g.hf+1.6+sh,top+.15,g.hf-1.6+sh,top+.15,bl,.2,.8);for(const s of [-1,1]){A.R(s*(g.hf-.9)-.35+sh,top+1.6,.7,g.bh-2.4,'#8a6a30');A.R(s*(g.hf-.9)-.35+sh,top+1.6,.25,g.bh-2.4,bl,.7)}
  for(let i=-8;i<=8;i+=1.6)if(Math.abs(i)>5.4)riv(A,i+sh,top+g.bh-2.6,.26,'#c8ccd4');for(let i=-8.6;i<=8.6;i+=2.15)if(Math.abs(i)>5.6)riv(A,i+sh,top+2.6,.26);
  /* 빨간 띠 광택 */A.L(-g.hf+sh,top+g.bh-2.05,g.hf+sh,top+g.bh-2.05,'#ff8a70',.2,.6);
  /* 연기실 테: 리벳 고리 + 황동 반사 호 */for(let i=0;i<14;i++){const a=i*TAU/14;if(Math.sin(a)>.25&&Math.abs(Math.cos(a))<.75)continue;riv(A,fx+Math.cos(a)*4.75,fy+Math.sin(a)*4.75,.24,'#9aa6b4')}for(let i=0;i<7;i++){const a=Math.PI*1.08+i*.11;A.R(fx+Math.cos(a)*5.45-.2,fy+Math.sin(a)*5.45-.2,.4,.4,'#c8d4e0',.8)}
  /* 중앙 황동 별 문장 */{const ex=fx,ey=fy+.6;A.P([[ex,ey-1],[ex+.85,ey],[ex,ey+1],[ex-.85,ey]],br);A.R(ex-.2,ey-.6,.3,.5,bl);}
  /* 전조등: 크롬 베젤 + 아나모픽 렌즈 플레어 */if(!A.dm)for(const s of [-1,1]){const lx=fx+s*2.3,ly=fy-1.6;A.L(lx-1.5,ly+1.15,lx+1.5,ly+1.15,'#c8d4e0',.25,.8);A.R(lx-.9,ly-.2,.6,.4,'#ffffff');const fl=.55+.25*Math.sin(t*5+s)+wH*.4;A.L(lx-4.5-wH*3,ly,lx+4.5+wH*3,ly,'#fff6d0',.22,.5*fl);A.L(lx,ly-1.8,lx,ly+1.8,'#fff6d0',.2,.35*fl);A.glow(lx,ly,2.4,'#ffffff',.6)}
  /* 배장기: 크롬 송곳니 반짝 */{const my=fy+2;for(let i=-4;i<=4;i++){const L=Math.abs(i)===1?3.4:2.4,a=Math.PI/2+i*.08;A.L(fx+i*1.2-.25,my+.3,fx+i*1.2-.25+Math.cos(a)*L*.7,my+.3+Math.sin(a)*L*.7,'#ffffff',.22,.75)}}
  /* 바퀴: 크롬 림 · 평형추 · 크랭크핀 · 연결봉 광택 */for(const s of [-1,1]){for(const wx of [4.4,8.8]){const X=s*wx+sh,a=rot*s;A.ring(X,-2.6,2.1,.3,'#c8ccd4',.8);A.P([[X+Math.cos(a+Math.PI)*1.9,-2.6+Math.sin(a+Math.PI)*1.9],[X+Math.cos(a+Math.PI+.9)*1.9,-2.6+Math.sin(a+Math.PI+.9)*1.9],[X+Math.cos(a+Math.PI+.45)*.9,-2.6+Math.sin(a+Math.PI+.45)*.9]],'#2a0a08',.8);A.C(X+Math.cos(a)*1.3,-2.6+Math.sin(a)*1.3,.42,br);A.R(X-.6,-3.4,.4,.4,'#ffffff',.85)}
   const a=rot*s,ox=Math.cos(a)*1.3,oy=Math.sin(a)*1.3;A.L(s*4.4+sh+ox,-2.6+oy-.18,s*8.8+sh+ox,-2.6+oy-.18,'#ffffff',.18,.8)}
  /* 화실 불빛 (차체 아래 틈) */{const fl=.55+.3*Math.sin(t*13)+.15*Math.sin(t*31);A.R(-2.8+sh,top+g.bh-.1,5.6,.5,'#ff8a30',fl);A.glow(sh,top+g.bh+.4,4,'#ff8a30',fl*.6)}
  /* 굴뚝: 황동 왕관 테 + 기적 */{const cx=fx,cy2=top-.4,v=wS>0?Math.sin(t*60)*.35*wS:0;A.R(cx-3.4+v,cy2-5.4,6.8,.35,bl,.8);A.R(cx-3.4+v,cy2-4.5,6.8,.3,'#8a6a30');A.R(cx-2.6+v,cy2-1.4,5.2,.5,br);A.R(cx-2.6+v,cy2-1.4,5.2,.2,bl,.8);riv(A,cx-1.8+v,cy2-.5,.24);riv(A,cx+1.8+v,cy2-.5,.24)}}};

/* ── b4 극저온 코어: 뒤쪽 반투명 결정 왕관(분광 가장자리), 날카로운 면 하이라이트, 서리 결정, 결정 홍채 ── */
const b4v=A=>{const g=m1G(A.B),t=A.t,b=A.bob*1.2,wS=A.win('shardLaunch'),wG=A.win('crystalGrow'),wM=A.win('mirrorShard'),ch=Math.max(wS,wG,wM,A.eyeC),cy=g.core+b-.8;return {g,t,b,wS,wG,wM,ch,cy}};
const flake=(A,x,y,r,al)=>{for(let k=0;k<3;k++){const a=k*Math.PI/3;A.L(x-Math.cos(a)*r,y-Math.sin(a)*r,x+Math.cos(a)*r,y+Math.sin(a)*r,'#ffffff',.22,al);for(const s of [-1,1]){const px=x+Math.cos(a)*r*.55*s,py=y+Math.sin(a)*r*.55*s;A.L(px,py,px+Math.cos(a+s*.0+.9)*r*.3*s,py+Math.sin(a+.9)*r*.3*s,'#eafcff',.2,al*.8)}}};
EXU.b4={
 pre(A){const {g,t,wG,ch,cy}=b4v(A),gr=1+wG*.35,hues=['#9af0ff','#c8a8ff','#ffb8e8','#fff0a8','#a8ffd8'];
  /* 반투명 2차 결정 왕관 */[[-6.2,-1.15,8.5],[-4.2,-1.32,11],[-2.2,-1.48,13.4],[0,-1.57,14.6],[2.3,-1.68,13],[4.3,-1.85,10.5],[6.3,-2,8]].forEach(([x,a,L],i)=>{L*=gr;const ca=Math.cos(a),sa=Math.sin(a),w=2.6,nx=-sa*w/2,ny=ca*w/2,x0=x,y0=cy-1.2;
   A.P([[x0+nx,y0+ny],[x0-nx,y0-ny],[x0+ca*L,y0+sa*L]],'#0c2034',.55);A.P([[x0+nx*.7,y0+ny*.7],[x0-nx*.7,y0-ny*.7],[x0+ca*L*.95,y0+sa*L*.95]],'#bfefff',.28);A.P([[x0,y0],[x0-nx*.7,y0-ny*.7],[x0+ca*L*.95,y0+sa*L*.95]],'#eafcff',.25);
   A.L(x0+nx*.7,y0+ny*.7,x0+ca*L*.95,y0+sa*L*.95,hues[(i+Math.floor(t*2))%5],.25,.7);const q=fr(t*.45+i*.17);if(q<.35){const k=.3+q*2;A.spark(x0+ca*L*k,y0+sa*L*k,.6,'#ffffff',Math.sin(q/.35*Math.PI))}});
  /* 바닥 냉기 */for(let k=0;k<4;k++){const q=fr(t*.3+k/4);A.glow((k-1.5)*4+Math.sin(q*6)*1,-.6-q*1.5,2.5+q*2,'#bfefff',(1-q)*.45)}},
 post(A){const {g,t,wS,ch,cy}=b4v(A),hf=g.hf,w='#ffffff';
  /* 면 모서리: 날카로운 하이라이트 */A.L(0,cy-5.9,-hf+.2,cy-1,w,.3,.85);A.L(0,cy-5.9,hf-.2,cy-1,'#bfefff',.25,.6);A.L(-hf+.2,cy-1,-hf+1.5,cy+3.7,'#bfefff',.25,.5);
  A.L(0,cy-5.2,0,cy-2.6,'#eafcff',.22,.5);A.L(-3,cy-.6,-g.hf+2,cy+3.2,'#7ac8f0',.22,.5);A.L(3,cy-.6,hf-2,cy+3.2,'#7ac8f0',.22,.4);
  /* 내부 굴절 균열 */A.L(-4.8,cy+1.6,-2.6,cy+3.6,'#a8e8ff',.2,.6);A.L(4.4,cy-2.6,2.8,cy-3.8,'#a8e8ff',.2,.6);A.L(2.8,cy-3.8,3.6,cy-4.4,'#a8e8ff',.2,.5);
  /* 분광 반짝 (면을 따라 흐르는 무지개 점) */for(let k=0;k<3;k++){const q=fr(t*.5+k/3),x=-hf+1+q*(hf*2-2),y=cy-1+Math.abs(x)/hf*-0-(1-Math.abs(x)/hf)*4.2;['#ff9ad8','#fff0a8','#9af0ff'].forEach((c,j)=>A.R(x-.6+j*.4,y+1.4,.4,.4,c,.8*Math.sin(q*Math.PI)))}
  /* 서리 결정 */flake(A,-hf+1.6,cy-.8,1.2,.75);flake(A,hf-1.8,cy+2,1,.65);flake(A,-1.8,cy+4,.8,.55);
  /* 결정 홍채: 방사 결 + 테 */if(!A.dm&&!A.blink){const r=2.4+(A.expose?.6:0),ex=A.look[0]*.7,ey=cy+A.look[1]*.4;A.ring(0,cy,r+.15,.3,'#bfefff',.85);for(let i=0;i<8;i++){const a=i*TAU/8+t*.3;A.L(ex+Math.cos(a)*r*.3,ey+Math.sin(a)*r*.18,ex+Math.cos(a)*r*.8,ey+Math.sin(a)*r*.46,'#eafcff',.2,.55)}A.R(ex-.15,ey-.2,.3,.4,'#ffffff',.7);A.glow(0,cy,3,'#bff6ff',.5+ch*.5)}
  /* 궤도 칼날 끝 반짝 */const n=7;for(let i=0;i<n;i++){let a=t*1.4+i*TAU/n,rr=hf+4.4;if(wS>0){const tg=Math.atan2(A.look[1],A.look[0])+(i-n/2+.5)*.2;a=a+(tg-a)*Math.min(1,wS*1.5);rr+=wS*2}const X=Math.cos(a)*rr,Y=cy+Math.sin(a)*rr*.5,pa=wS>0?Math.atan2(A.look[1],A.look[0]):a+Math.PI/2;A.L(X-Math.cos(pa)*1.2,Y-Math.sin(pa)*1.2,X+Math.cos(pa)*1.4,Y+Math.sin(pa)*1.4,'#ffffff',.22,.8);if(fr(t*.8+i*.31)<.15)A.spark(X+Math.cos(pa)*1.5,Y+Math.sin(pa)*1.5,.7,'#ffffff',.9);A.glow(X,Y,1.6,'#9af0ff',.35)}
  /* 흩날리는 빙정 */A.rise(7,-10,10,cy+6,14,.35,'#eafcff',.4,.7)}};

/* ── b5 스톰 하이브: 거대 뇌운(내부 섬광), 육각 벌집 셀 + 꿀빛, 금속 광택 띠, 겹눈 면, 피뢰침 방전, 드론 날개 ── */
const b5v=A=>{const g=m1G(A.B),t=A.t,b=A.bob*1.1,wD=A.win('droneLaunch'),wB=A.win('carpetBomb'),ch=Math.max(wD,wB,A.eyeC),cy=g.core+b,sh=A.shake(wB>.6?.2:0);return {g,t,b,wD,wB,ch,cy,sh}};
EXU.b5={
 pre(A){const {t,b,wB,ch,sh}=b5v(A),sd=Math.floor(t*5),fl=(sd%3===0||wB>.3)?1:0;
  
  /* 구름 속 기는 번개 */if(!A.dm){const s2=Math.floor(t*12);zap(A,-9+sh,-3.6+rn(s2)*1.5,9+sh,-3.2+rn(s2+1)*1.5,9,.9,s2,'#fff6c0','#c8b0ff',.3+ch*.5)}},
 post(A){const {g,t,b,wD,wB,ch,cy,sh}=b5v(A),gold='#ffe9a0';
  /* 뇌운: 위 테두리 빛 + 속에서 번쩍이는 섬광 */for(let i=-4;i<=4;i++){const x=i*2.3+sh,y=-2.8+Math.sin(t*1.3+i)*.3,r=2.4+(i%2)*.5;if(Math.abs(i)>=2){A.E(x-.3,y-r+.5,r*.6,.3,'#6a5a9a',.8);A.R(x-r*.5,y-r+.25,.5,.3,'#b8a8e8',.7)}}
  {const sd=Math.floor(t*5);if(sd%3===0||wB>.3){const fx=((sd*5)%14)-7+sh;A.C(fx,-2.6,1.6,'#6a5aa8',.55);A.glow(fx,-2.6,6,'#c8b8ff',.8)}}
  /* 층마다: 위 광택 띠 + 아래 그늘 + 육각 셀 */const rings=6;for(let r=0;r<rings;r++){const k=r/(rings-1),w=g.hf+1-k*(g.hf-2.4),yy=-5.4+b-r*2.2;A.E(sh-w*.15,yy-1,w*.62,.22,gold,.55);A.E(sh,yy+1.05,w*.85,.22,'#1a0e02',.5);
   for(let h=0;h<Math.max(2,Math.round(w/1.4));h++){const hx=-w+1+h*2.2+(r%2)*1.1;if(Math.abs(hx)>w-.8)continue;const X=hx+sh,on=((h+r+Math.floor(t*4))%6===0)||ch>.3,hx6=[];for(let j=0;j<6;j++){const a=j*Math.PI/3+Math.PI/6;hx6.push([X+Math.cos(a)*.78,yy+Math.sin(a)*.62])}A.P(hx6,'#2a1a06');A.P(hx6.map(p=>[X+(p[0]-X)*.62,yy+(p[1]-yy)*.62]),on?'#fff6a0':'#e8a020',on?1:.8);if(on)A.glow(X,yy,1.6,'#ffd040',.6)}}
  /* 꼭대기 피뢰 첨탑 ↔ 뿔 방전 */{const tipY=-5.4+b-rings*2.2-2.8,sd=Math.floor(t*10);for(const s of [-1,1]){const rx=s*6.4+sh,ry=cy-9.6;A.C(rx,ry,.45,'#ffffff');A.ring(rx,ry,.9+.2*Math.sin(t*10+s),.2,'#fff6a0',.7);if((sd+(s>0?1:0))%4===0)zap(A,rx,ry,rx+s*(1.5+rn(sd)*2),ry-2-rn(sd+3)*2,3,.6,sd*2+s,'#ffffff','#ffe070',.85)}A.ring(sh,tipY,1.1,.22,'#fff6a0',.6)}
  /* 겹눈: 면 격자 + 반사 */if(!A.dm&&!A.blink){const my=cy+.6;[[-1.9,-1.2,.8],[1.9,-1.2,.8],[-.8,-1.8,.5],[.8,-1.8,.5],[-2.8,-.2,.5],[2.8,-.2,.5],[0,-.6,.6]].forEach(([ex,ey,r])=>{const X=ex+sh+A.look[0]*.2,Y=my+ey;A.ring(X,Y,r+.15,.18,'#ff8a96',.7);if(r>.55){A.R(X-.35,Y-.05,.7,.15,'#5a0010',.6);A.R(X-.05,Y-.4,.15,.7,'#5a0010',.6)}A.R(X-r*.5,Y-r*.55,.3,.3,'#ffffff',.9)})}
  /* 가면 키틴 광택 */{const my=cy+.6;A.L(-3.6+sh,my-2.6,-1.2+sh,my-2.6,'#ffd8a0',.22,.55);A.L(-3.6+sh,my-2.4,-2.9+sh,my+1.4,'#5a3a20',.22,.6)}
  /* 드론: 무지갯빛 큰 날개 + 금속 광택 */const n=6;for(let i=0;i<n;i++){const a=t*(1.8+wD*5)+i*TAU/n,rr=g.hf+3-wD*1.8,X=Math.cos(a)*rr+sh,Y=cy-2+Math.sin(a)*rr*.4,wf=Math.floor(t*24+i)%2;for(const s of [-1,1])A.E(X+s*.75,Y-1.05-wf*.25,.85,.38,['#c8f0ff','#ffd0f0'][wf],.5);A.R(X-.7,Y-.45,.5,.25,'#fff6c0',.9);A.L(X-1,Y+.1,X+1,Y+.1,'#fff6a0',.18,.6)}
  A.rise(4,-7+sh,7+sh,-1,12,.6,'#fff6a0',.35,.2)}};

/* ── b6 자석 크레인: 크롬 유압 실린더, 광택 경고 줄무늬, 회전 경광등, 붐 트러스, 자기장 + 끌려오는 고철, 자극 아크 ── */
const b6v=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.5,wW=A.win('wreckingBall'),wP=A.win('scrapPull'),wC=A.win('clawDrop'),sh=A.shake(wW>.5||wP>.6?.3:0),crouch=wW*1.2,top=g.top+b+crouch;
 const bx=g.hf-1.6+sh,by=top+.6,a1=-1.95-wW*.55+Math.sin(t*.8)*.05,L1=7.6,jx=bx+Math.cos(a1)*L1,jy=by+Math.sin(a1)*L1,a2=a1+1.25+wW*.45,L2=6.4,ex=jx+Math.cos(a2)*L2,ey=jy+Math.sin(a2)*L2,sw=Math.sin(t*1.6)*.3-wW*.6,mx=ex+Math.sin(sw)*4.4,my=ey+Math.cos(sw)*4.4;
 return {g,t,b,wW,wP,wC,sh,crouch,top,bx,by,jx,jy,ex,ey,mx,my}};
EXU.b6={
 pre(A){const {t,wP,mx,my}=b6v(A);
  /* 자기력선: 두 극에서 나와 휘어 도는 고리 */for(let i=0;i<3;i++){const ph=fr(t*.6+i/3),R=2+ph*5+wP*2;for(let j=0;j<10;j++){const a=Math.PI*(.05+j*.09),x=mx+Math.cos(a)*R*1.2,y=my+3+Math.sin(a)*R*.85;A.spark(x,y,.4,j<5?'#ff8a8a':'#8aa8ff',(1-ph)*(.5+wP*.4))}}},
 post(A){const {g,t,b,wW,wP,sh,crouch,top,bx,by,jx,jy,ex,ey,mx,my}=b6v(A),Y='#d8a820',chrome='#e8eef4';
  /* 다리 유압 실린더 (크롬 로드) */for(const s of [-1,1])for(const f of [0,1]){const hx=s*(3+f*3.4)+sh,hy=-4.6+b+crouch,kx=s*(6+f*4.4)+sh,ky=-7.6+b+crouch*.4,fx=s*(7+f*4.6)+sh,lx=kx+(fx-kx)*.35,ly=ky*.65;A.L(kx,ky,lx,ly,'#1a1a1e',.75);A.L(lx,ly,fx,-.6,chrome,.32);A.R(lx-.35,ly-.2,.7,.4,'#c8a050');
   A.L(kx,ky,kx+(fx-kx)*.5,ky*.5,'#ffffff',.18,.55);A.R(kx-.25,ky-.25,.3,.3,'#fff6c0');A.C(fx,-.2,.5,'#5a5a60')}
  /* 몸통: 리벳 + 이음새 + 경고 줄무늬 광택 */for(let i=0;i<6;i++)riv(A,-g.hf+.6+i*3.2+sh,-5.1+b+crouch-.9,.24,'#c8a050');A.L(-g.hf-1+sh,-6.45+b+crouch,g.hf+1+sh,-6.45+b+crouch,'#fff0a0',.2,.6);
  A.L(-g.hf+2.4+sh,top+.6,g.hf-3+sh,top+.2,'#c8b070',.25,.7);A.L(1+sh,top+1,1.2+sh,-6.6+b+crouch,'#0a0806',.25,.8);A.L(1.3+sh,top+1,1.5+sh,-6.6+b+crouch,'#6a5a30',.2,.5);
  /* 조종실: 유리 반사 + 회전 경광등 */{const hx=-g.hf+.6+sh,hy=top+3.2;A.L(hx-2.2,hy-.3,hx-1.4,hy-.5,'#ffffff',.2,.6);const bxl=hx+.8,byl=hy-2.9;A.R(bxl-.6,byl,1.2,.5,'#2a2418');A.R(bxl-.45,byl-1,.9,1,'#ffb020');const ph=Math.sin(t*7);A.R(bxl-.45+(ph*.5+.5)*.6,byl-1,.3,1,'#fff6c0');A.glow(bxl,byl-.5,2.4+Math.max(0,ph)*3,'#ff9a20',.5+Math.max(0,ph)*.5);
   if(!A.dm)A.beam([[bxl,byl-.5],[bxl+ph*9-1.5,byl-4],[bxl+ph*9+1.5,byl-3]],'#ffb040',.12*Math.max(0,1-Math.abs(ph)))}
  /* 몸통→붐 유압 실린더 */{const px=bx-1.2,py=by+2.2,qx=bx+(jx-bx)*.45,qy=by+(jy-by)*.45;A.L(px,py,px+(qx-px)*.5,py+(qy-py)*.5,'#1a1a1e',.9);A.L(px+(qx-px)*.45,py+(qy-py)*.45,qx,qy,chrome,.35);A.C(qx,qy,.4,'#8a8a90')}
  /* 붐: 트러스 + 위 모서리 광택 + 볼트 */for(const [x0,y0,x1,y1] of [[bx,by,jx,jy],[jx,jy,ex,ey]]){const L=Math.hypot(x1-x0,y1-y0),nx=-(y1-y0)/L*.5,ny=(x1-x0)/L*.5;A.L(x0-nx,y0-ny,x1-nx,y1-ny,'#fff0a0',.2,.75);riv(A,x0+(x1-x0)*.5,y0+(y1-y0)*.5,.24,'#c8a050')}
  A.ring(jx,jy,1.2,.2,'#fff0a0',.6);
  /* 케이블 광택 */A.L(ex,ey,mx,my,'#e8e8f0',.12,.7);
  /* 전자석: 금속 광택 + 코일 발광 + 극 사이 아크 */{A.E(mx-1,my+.6,1.6,.3,'#c8ccd4',.8);A.R(mx-2.8,my+1,.35,3.8,'#ffb0b0',.6);A.R(mx+1,my+1,.35,3.8,'#b0c8ff',.6);A.R(mx-1,my+1.6,2,.5,'#d8a850');A.R(mx-1,my+1.6,2,.18,'#fff0a0');
   const sd=Math.floor(t*12);if(sd%2||wP>0)zap(A,mx-1,my+4.6,mx+1,my+4.6,3,.5,sd,'#ffffff','#a89aff',.6+wP*.4);A.glow(mx,my+3,3+wP*3,'#9a8aff',.35+wP*.4)}
  /* 끌려와 맴도는 고철 */for(let i=0;i<5;i++){const a=t*(1.2+wP*3)+i*TAU/5,R=3.4+(i%2)*1.2-wP*1.2,x=mx+Math.cos(a)*R,y=my+5.2+Math.sin(a)*R*.4-wP*1,sp=t*3+i;if(y>-.5)continue;A.P([[x-.45,y-.2],[x+.2+Math.cos(sp)*.3,y-.45],[x+.45,y+.25],[x-.1,y+.4]],i%2?'#6a6458':'#8a8a90');A.R(x-.2,y-.25,.25,.25,'#e8e8f0',.8)}
  /* 배기 증기 */for(let k=0;k<2;k++){const q=fr(t*.8+k*.5);A.C(-g.hf-1.4+sh-q*2,-5.4+b+crouch-q*4,.6+q*1.4,'#c8c8cc',(1-q)*.35)}}};

/* ── b7 시계탑 자동인형: 정교한 시계 문자판(눈금 · 톱니 · 장식 바늘), 금 이음(긴츠기) 균열, 금 세공 테, 유리 진자 ── */
const b7v=A=>{const g=m1G(A.B),t=A.t,b=A.bob,wS=A.win('scissorHands'),wK=A.win('cuckoo'),wW=A.win('windSpiral'),sw=Math.sin(t*1.6)*.5,tilt=Math.sin(t*.9)*.15+wS*.2;return {g,t,b,wS,wK,wW,sw,tilt}};
EXU.b7={
 pre(A){const {g,t,b,wS}=b7v(A),hy=g.top+b-1.4,R=g.hf+2,G='#e8c060',GD='#7a5a18';
  /* 문자판 바탕 (짙은 자주 반투명) */A.C(0,hy,R-.3,'#200814',.55);A.ring(0,hy,R-1.1,.25,G,.55);A.ring(0,hy,R-3.2,.18,GD,.7);
  /* 안쪽 맞물린 톱니 */A.gear(-3.2,hy-2.6,1.6,9,t*.9,'#5a4018','#2a1a08','#200814');A.gear(-1.1,hy-4.4,1.1,7,-t*1.3,'#7a5a18','#2a1a08','#200814');A.gear(3.4,hy-2.2,1.3,8,-t*1.1,'#5a4018','#2a1a08','#200814');
  /* 시 눈금: 4방위는 마름모 보석 */for(let i=0;i<12;i++){const a=i*TAU/12-Math.PI/2,q=i%3===0,r0=R-1.4,r1=R-(q?3:2.2);A.L(Math.cos(a)*r0,hy+Math.sin(a)*r0,Math.cos(a)*r1,hy+Math.sin(a)*r1,G,q?.45:.28,.85);if(q){const x=Math.cos(a)*(R-.6),y=hy+Math.sin(a)*(R-.6);A.P([[x,y-.6],[x+.45,y],[x,y+.6],[x-.45,y]],'#ff3a6a');A.R(x-.15,y-.3,.25,.25,'#ffffff')}}
  for(let i=0;i<60;i++)if(i%5){const a=i*TAU/60;A.R(Math.cos(a)*(R-1.4)-.12,hy+Math.sin(a)*(R-1.4)-.12,.24,.24,G,.5)}
  /* 장식 시침 · 분침 (화살촉 + 고리) */const hm=t*.5*(1+wS*8),hh=hm/12-1.2;for(const [a,L,w] of [[hm,R-2,.35],[hh,R-4.2,.5]]){const ex=Math.cos(a)*L,ey=hy+Math.sin(a)*L;A.L(0,hy,ex,ey,G,w);A.ring(Math.cos(a)*L*.55,hy+Math.sin(a)*L*.55,.55,.2,G);A.P([[ex+Math.cos(a)*1.1,ey+Math.sin(a)*1.1],[ex+Math.cos(a+1.6)*.6,ey+Math.sin(a+1.6)*.6],[ex+Math.cos(a-1.6)*.6,ey+Math.sin(a-1.6)*.6]],G)}A.C(0,hy,.6,G);
  /* 초침 (붉은 실선) */const sa=Math.floor(t*2)*TAU/60*5;A.L(0,hy,Math.cos(sa)*(R-1.6),hy+Math.sin(sa)*(R-1.6),'#ff3a6a',.2,.8)},
 post(A){const {g,t,b,wS,wW,sw,tilt}=b7v(A),G='#ffd870',hy0=g.top+b-1.4,R=g.hf+2;
  /* 후광 테: 금 광택 + 흐르는 반짝 */A.ring(0,hy0,R+.2,.2,'#fff2c0',.55);{const a=t*.7,x=Math.cos(a)*R,y=hy0+Math.sin(a)*R;A.spark(x,y,.8,'#ffffff',.9);A.glow(x,y,1.6,G,.6)}
  /* 꼭두각시 실 반짝 */if(!A.still)for(const s of [-1,1]){const q=fr(t*.6+(s>0?.5:0)),y0=g.sh+b-3,x0=s*(g.hf-.4),x1=x0+sw*.5;A.R(x0+(x1-x0)*q-.15,y0-q*30-.15,.3,.6,'#ffffff',.85)}
  /* 몸통 금 세공 테 + 진자 유리 반사 */{const top=g.top+b+3.6,hgt=g.bh-4.2;A.L(-3.2,top,-2,top+hgt,G,.22,.85);A.L(3.2,top,2,top+hgt,G,.22,.85);for(let k=0;k<3;k++){A.R(-2.85,top+1.4+k*2.2,.3,.3,G);A.R(2.55,top+1.4+k*2.2,.3,.3,G)}
   A.L(-1.8,top+1.2,-.4,top+3.2,'#ffffff',.2,.35);A.L(-1.4,top+1.2,-.9,top+1.9,'#ffffff',.2,.5);const pa=Math.sin(t*3.1)*.5,L=hgt-2,px=Math.sin(pa)*L,py=top+.6+Math.cos(pa)*L;A.ring(px,py,1,.22,G);A.R(px-.4,py-.45,.3,.3,'#ffffff');A.R(-3.6,top-.6,7.2,.25,'#fff2c0',.8)}
  /* 치마 단: 금 구슬 */{const ty=-5.4+b;for(let i=0;i<12;i++){const a=i/12*TAU+t*.8,x=Math.cos(a)*5.6;if(Math.sin(a)<-.2)continue;A.C(x,ty+.9+Math.sin(a)*.4,.28,G)}A.E(0,ty-.5,5.6,.22,G,.6)}
  /* 태엽 열쇠: 광택 */{const ky=g.core+b-2,a=t*(1+wW*12);A.L(3,ky-.2,5.6,ky-.2,'#fff2c0',.18,.8);A.R(5.4,ky-1.8*Math.abs(Math.cos(a)),.35,3.6*Math.abs(Math.cos(a))+.3,'#fff2c0',.7)}
  /* 도자기 가면: 금 이음(긴츠기) + 유광 하이라이트 */{const hy=g.top+b+.2,hx=Math.sin(tilt)*1,kin=(x0,y0,x1,y1)=>{A.L(x0,y0,x1,y1,'#b88a20',.38);A.L(x0,y0,x1,y1,'#ffe9a0',.18,.95)};
   kin(hx+.6,hy-3.8,hx-.4,hy-1);kin(hx-.4,hy-1,hx+.4,hy+.6);kin(hx-.4,hy-1,hx-1.6,hy-2.4);kin(hx+.4,hy+.6,hx+1.9,hy+1.4);kin(hx-2.2,hy+1,hx-2.9,hy+2.3);
   A.glow(hx,hy-1.2,2.2,G,.35);A.L(hx+1.6,hy-3,hx+2.4,hy-1.8,'#ffffff',.25,.8);A.R(hx-2.4,hy-2.2,.35,.35,'#ffffff',.6);A.E(hx,hy+3.3,2.4,.25,G,.5)}}};

/* ── b8 광학 요새: 회전 초점 링(눈금), 유리 렌즈 반사 · 색수차, 아나모픽 렌즈 플레어, 금 테 거울 · 분광 광택, 탐조등 ── */
const b8v=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.4,wR=A.win('ricochetLaser'),wF=Math.min(1,A.win('focusLens')+A.eyeC),wP=A.win('spectrum'),ch=Math.max(wR,wF,wP),top=g.top+b,ey=g.core+b-.8;return {g,t,b,wR,wF,wP,ch,top,ey}};
EXU.b8={
 pre(A){const {g,t,b,wR}=b8v(A);
  /* 거울 금 테 (뒤판) */for(const s of [-1,1]){const mx=s*(g.hf+2.4),my=g.sh+b-.8,ang=Math.sin(t*1.2+s)*.6+wR*s*1.4,w=Math.abs(Math.cos(ang))*2.6+.4;A.R(mx-w/2-.45,my-3.65,w+.9,7.3,'#07090c');A.R(mx-w/2-.3,my-3.5,w+.6,7,'#b88a30');A.R(mx-w/2-.3,my-3.5,w+.6,.25,'#ffe9a0');for(const yy of [-3.9,3.6])A.R(mx-.35,my+yy,.7,.4,'#d8a840')}},
 post(A){const {g,t,b,wR,wF,wP,ch,top,ey}=b8v(A),R=4.6,S=M1S;
  /* 성벽: 패널 이음새 + 리벳 + 붉은 총안 */for(let i=0;i<5;i++){const x=-g.hf+1.2+i*(g.hf*2-2.4)/4;if(Math.abs(x)<6.6)continue;riv(A,x,top+3.2,.26);riv(A,x,-5.6,.26)}A.L(-g.hf-.5,-4.9,g.hf+.5,-4.9,'#8a96a4',.22,.6);A.L(-g.hf,top+2.3,g.hf,top+2.3,'#9aa6b4',.25,.7);
  for(const s of [-1,1])for(let k=0;k<2;k++){const x=s*(g.hf-1.6),y=top+4.2+k*3;A.R(x-.25,y,.5,1.4,'#07090c');A.R(x-.12,y+.2,.24,1,'#ff2a4a',.6+.4*Math.sin(t*3+k+s))}
  /* 첨탑: 금 띠 + 깜빡이는 비컨 + 탐조등 */for(const s of [-1,1]){const tx=s*(g.hf-1.2);A.R(tx-1.2,top-1.6,2.4,.4,'#c8a050');A.R(tx-1.2,top-1.6,2.4,.15,'#fff0b8');const on=fr(t*.9+(s>0?.5:0))<.25;A.C(tx,top-7.6,.45,on?'#ffffff':'#ff2a4a');A.glow(tx,top-7.6,on?3.4:1.6,'#ff2a4a',on?1:.5);
   const sa=-Math.PI/2+s*.5+Math.sin(t*.7+s)*.45;if(!A.dm)A.beam([[tx,top-7.6],[tx+Math.cos(sa-.06)*14,top-7.6+Math.sin(sa-.06)*14],[tx+Math.cos(sa+.06)*14,top-7.6+Math.sin(sa+.06)*14]],'#ff6a7a',.035+ch*.04)}
  /* 회전 초점 링: 홈 눈금 */{const r0=R+.8,r1=R+1.9,rot=t*.25+wF*3;A.ring(0,ey,r1,r1-r0,'#2a3038');A.ring(0,ey,r1,.25,'#7a8694');A.ring(0,ey,r0+.25,.2,'#0a0c10');for(let i=0;i<28;i++){const a=rot+i*TAU/28;A.L(Math.cos(a)*(r0+.3),ey+Math.sin(a)*(r0+.3),Math.cos(a)*(r1-.3),ey+Math.sin(a)*(r1-.3),i%7===0?'#e8c060':'#5a6470',.22,i%7===0?1:.8)}
   for(let i=0;i<4;i++){const a=-rot*.6+i*TAU/4+.4;riv(A,Math.cos(a)*(R+.4),ey+Math.sin(a)*(R+.4),.24,'#c8ccd4')}}
  /* 유리 렌즈: 반사 호 · 색수차 고리 */if(!A.dm){A.ring(0,ey,R-.1,.2,'#ff3a5a',.45);A.ring(.25,ey-.15,R-.35,.2,'#4ae0ff',.35);for(let i=0;i<7;i++){const a=Math.PI*1.1+i*.12;A.R(Math.cos(a)*(R-.8)-.2,ey+Math.sin(a)*(R-.8)-.2,.4,.4,'#ffffff',.75-i*.06)}A.R(1.8,ey+1.6,.5,.5,'#ffffff',.45);A.R(2.5,ey+1.1,.3,.3,'#ffffff',.35);
   /* 아나모픽 플레어 */const ic=wF>0?'#ffffff':'#ff4a6a',lx=A.look[0]*.8,ly=ey+A.look[1]*.5,k=.6+.2*Math.sin(t*4)+wF*.5;A.L(lx-12-wF*6,ly,lx+12+wF*6,ly,ic,.22,.45*k);A.L(lx-6,ly,lx+6,ly,'#ffffff',.22,.5*k);A.L(lx,ly-3,lx,ly+3,'#ffffff',.2,.3*k);
   for(const [d,r,c] of [[.6,.7,'#4ae0ff'],[1.1,.45,'#b08aff'],[1.6,1,'#5affc8']]){A.C(lx+d*5,ly+d*3.2,r,c,.22*k)}A.glow(lx,ly,3,'#ffffff',.3+wF*.6)}
  /* 거울: 분광 띠 흐름 + 금 테 광택 */for(const s of [-1,1]){const mx=s*(g.hf+2.4),my=g.sh+b-.8,ang=Math.sin(t*1.2+s)*.6+wR*s*1.4,w=Math.abs(Math.cos(ang))*2.6+.4,cols=['#ff9a9a','#ffe08a','#9affc8','#8ac8ff','#c89aff'];for(let i=0;i<5;i++){const q=fr(t*.4+i/5+(s>0?.3:0));A.R(mx-w/2,my-3.2+q*6.4-.2,w,.4,cols[i],.35)}A.R(mx+w/2-.3,my-3.2,.3,6.4,'#8ab8d0',.6);if(fr(t*.7+(s>0?.5:0))<.12)A.spark(mx,my-2,1,'#ffffff',1)}
  /* 궤도 반짝 */const tr=(t*3)%2;for(let i=-11;i<11.5;i+=2)A.R(i+tr-.15,-5.5,.3,.5,'#e8eef4',.6)}};

/* ── b9 오메가 엔진: 금세공 3중 후광(보석), 날 끝 광택, 각인 흉갑, 심장 에너지 맥 · 피스톤 연결, 왕관 보석, 파이프 금 테 ── */
const omg=ascend=>{const v=A=>{const g=m1G(A.B),t=A.t,b=A.bob*1.1,beat=A.pul,any=A.any||0,cy=g.core+b,sh=A.shake(any>.5?.25:0),H=ascend?'#ffffff':'#ff2a5a',HS=ascend?'#ff9ac8':'#ff6a8a';return {g,t,b,beat,any,cy,sh,H,HS}};
 return {
 pre(A){const {g,t,beat,cy,sh,H}=v(A),R=g.hf+7.4+(ascend?2:0),G='#d8a840';
  /* 두 날개 고리 사이: 가는 금세공 고리 + 회전 보석 */const R2=g.hf+3.9+(ascend?1:0);A.ring(sh,cy,R2,.22,G,.8);for(let i=0;i<6;i++){const a=-t*.12+i*TAU/6,x=sh+Math.cos(a)*R2,y=cy+Math.sin(a)*R2;A.P([[x,y-.9],[x+.6,y],[x,y+.9],[x-.6,y]],G);A.C(x,y,.35,H);A.glow(x,y,1.4+beat,H,.5)}
  /* 바깥 고리 뒤 은은한 에너지 */A.glow(sh,cy,g.hf+9,H,.12+beat*.1)},
 post(A){const {g,t,b,beat,any,cy,sh,H,HS}=v(A),G='#ffe08a',GD='#d8a840';
  /* 칼날 후광: 날 앞 모서리 광택 */for(const [r,n,sp,len] of [[g.hf+5+(ascend?2:0),16,.18,3],[g.hf+2.6,12,-.3,2.2]]){for(let i=0;i<n;i++){const a=t*sp+i*TAU/n,x=sh+Math.cos(a)*r,y=cy+Math.sin(a)*r;A.L(x,y,x+Math.cos(a)*len*.85,y+Math.sin(a)*len*.85,'#fff6d8',.2,.65)}const q=t*sp*2.4;A.spark(sh+Math.cos(q)*r,cy+Math.sin(q)*r,.8,'#ffffff',.9)}
  /* 파이프 날개: 금 테 + 배기 발광 */for(const s of [-1,1])for(let i=0;i<5;i++){const px=s*(g.hf-1.4+i*1.5)+sh,h=5+i*2+(ascend?2:0),py=cy+2.4-i*.5;A.R(px-.7,py-h*.55,1.4,.35,GD);A.R(px-.7,py-h*.55,1.4,.14,'#fff0c0');A.R(px-.18,py-h+.4,.36,h*.4,'#fff0d8',.25);A.glow(px,py-h-.6,1.4+beat*1.5,H,.35+beat*.4)}
  /* 흉갑 각인: 안쪽 금 선 + 갈매기 문양 + 보석 단추 */{const k=.82,pts=[[-g.hf+1,cy-6],[g.hf-1,cy-6],[g.hf+.4,cy+3],[0,cy+7],[-g.hf-.4,cy+3]].map(p=>[sh+p[0]*k,cy-.4+(p[1]-cy)*k]);for(let i=0;i<5;i++){const p=pts[i],q=pts[(i+1)%5];A.L(p[0],p[1],q[0],q[1],GD,.22,.85)}
   for(const s of [-1,1]){A.L(s*(g.hf-2.2)+sh,cy-4.6,s*3.6+sh,cy-3.2,G,.22,.8);A.L(s*(g.hf-2.6)+sh,cy+3.4,s*1.4+sh,cy+5.4,G,.22,.7);A.P([[s*5.2+sh,cy-5.2],[s*5.7+sh,cy-4.7],[s*5.2+sh,cy-4.2],[s*4.7+sh,cy-4.7]],H);A.R(s*5.2-.15+sh,cy-5,.25,.25,'#ffffff')}
   A.P([[sh,cy+4.6],[sh+.7,cy+5.4],[sh,cy+6.2],[sh-.7,cy+5.4]],H);A.R(sh-.15,cy+4.9,.3,.3,'#ffffff');A.L(-g.hf+1.6+sh,cy-5.7,g.hf-1.6+sh,cy-5.7,'#fff2c0',.2,.75)}
  /* 심장 → 피스톤 에너지 맥 (박동 따라 흐름) */for(const s of [-1,1]){const px=s*(g.hf-2.2)+sh,x0=sh+s*1.6,y0=cy-.4;A.L(x0,y0,px,cy+1.2,'#3a0612',.5);A.L(x0,y0,px,cy+1.2,H,.22,.5+beat*.5);const q=fr(t*1.6+(s>0?.5:0));A.R(x0+(px-x0)*q-.25,y0+(cy+1.2-y0)*q-.25,.5,.5,'#ffffff',.9);A.glow(px,cy+1.2,1.6+beat*2,H,.6);
   A.L(px-.6+.2,cy-.4-beat*1.4,px-.6+.2,cy+2.4-beat*1.4,'#ffffff',.18,.7)}
  /* 새장 금 광택 + 심장 하이라이트 */for(let i=-3;i<=3;i++){const x=i*1.3+sh,hh=Math.sqrt(Math.max(0,1-(i/3.5)**2))*4.8;A.R(x-.25,cy-hh,.2,hh*.5,'#fff2c0',.6)}{const s2=1+beat*.14+(A.expose?.12:0),hs=2.6*s2;A.C(sh-hs*.6,cy-hs*.55,hs*.18,'#ffffff',.85);A.L(sh+hs*.2,cy+hs*.5,sh+hs*.6,cy,HS,.2,.7);A.glow(sh,cy,hs*2,H,.3+beat*.4)}
  /* 투구 + 왕관: 능선 광택, 첨탑 보석 */{const fy=g.top+b-1.6;A.L(-3+sh,fy-1.8,sh,fy-3.4,'#fff2c0',.22,.8);A.L(-3.4+sh,fy+1.9,3.4+sh,fy+1.9,GD,.22,.8);for(let i=-3;i<=3;i++){if(i===0)continue;const hh=3+(Math.abs(i)===1?1.8:Math.abs(i)===2?.8:0)+(ascend?1.6:0),a=-Math.PI/2+i*.24,x=sh+i*1.1+Math.cos(a)*hh*.5,y=fy-2.6+Math.abs(i)*.4+Math.sin(a)*hh*.5;if(Math.abs(i)%2)A.C(x,y,.35,H);A.L(sh+i*1.1,fy-2.6+Math.abs(i)*.4,x,y,'#fff6d8',.18,.6)}A.ring(sh,fy-2.6-3-3-(ascend?1.6:0)-.6,1,.2,G,.7)}
  /* 발밑 붉은 증기 → 금빛 입자 */A.rise(5,-8+sh,8+sh,-2,14,.5,ascend?'#ffffff':G,.4,.4)}}};
EXU.b9=omg(false);EXU.b9t=omg(true);
}

