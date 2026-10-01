/* ================= 챕터 3 ORIGIN 리디자인 v94 — 40년 전 시계골의 괴이: 골동품 · 황동 · 벨벳 · 도자기, 차갑고 고요한 위압감 ================= */
const M3K='#06050a';
/* ── 한밤의 괘종 PENDULUM: 관처럼 좁고 높은 괘종시계 거인, 시계 얼굴의 두 눈, 칼날 시계추 두 개 ── */
MON.reg.c_pendulum=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.4,C={w:'#2e1a10',w2:'#4a2c18',w3:'#6e4424',g:'#d8a848',g2:'#8a6420',f:'#efe4c8',k:M3K,v:'#b07aff',r:'#ff4a5a'};
 const wS=A.win('pendSwing'),wT=A.win('tickTock'),wG=A.win('gravityBob'),ch=Math.max(wS,wT,wG,A.eyeC),sh=A.shake(wT>.5?.25:0);
 const top=g.top+b-3,bot=-4.6+b,hw=g.hf+.6;
 /* 받침 기둥 발 (사자발) */for(const s of [-1,1]){A.P([[s*3-1.6+sh,bot],[s*3+1.6+sh,bot],[s*3.6+2+sh,0],[s*3.6-1.4+sh,0]],C.w);for(let i=-1;i<=1;i++)A.spike(s*3.6+i*.8+sh,-.2,Math.PI/2,.8,.6,C.g)}
 /* 좁고 높은 몸통 */A.plate([[-hw+sh,bot],[hw+sh,bot],[hw+.6+sh,top+7],[hw-.4+sh,top+2],[-hw+.4+sh,top+2],[-hw-.6+sh,top+7]],C.w,C.k,C.w3);A.R(-hw+.8+sh,top+8,hw*2-1.6,.5,C.g2);A.R(-hw+.8+sh,bot-1.6,hw*2-1.6,.5,C.g2);
 /* 유리 창 속 시계추 (칼날) */{const wy0=top+8.8,wy1=bot-2.4;A.R(-hw+1.2+sh,wy0,hw*2-2.4,wy1-wy0,'#0c0810');A.R(-hw+1.2+sh,wy0,1,wy1-wy0,'#ffffff',.08);for(const s of [-1,1]){const sp=(1.4+wS*3)*(s<0?1:1.07),pa=Math.sin(t*sp+(s>0?Math.PI:0))*(.45+wS*.4),L=wy1-wy0-1.6,px=sh+s*.8,ex=px+Math.sin(pa)*L,ey=wy0+.4+Math.cos(pa)*L;A.L(px,wy0+.4,ex,ey,C.g2,.35);
  A.P([[ex-1.6,ey-.4],[ex+1.6,ey-.4],[ex,ey+1.8]],C.g);A.P([[ex-1.3,ey-.2],[ex,ey-.2],[ex,ey+1.4]],'#fff0b0');if(wS>0)A.glow(ex,ey,2+wS*2,C.v,wS)}
  A.C(sh,g.core+b+1.4,.9,A.expose?'#ffffff':C.v,A.open>0||A.expose?1:.6);if(A.open>0||A.expose)A.glow(sh,g.core+b+1.4,5,C.v,A.expose?1:A.open)}
 /* 시계 얼굴 머리: 두 눈 + 떨리는 바늘 */{const hy=top+3.8,R=hw-.2;A.C(sh,hy,R+.6,C.k);A.C(sh,hy,R,C.g);A.C(sh,hy,R-.6,C.f);for(let i=0;i<12;i++){const a=i*TAU/12;A.R(sh+Math.cos(a)*(R-1.2)-.2,hy+Math.sin(a)*(R-1.2)-.2,.4,.4+(i%3===0?.4:0),C.k)}
  const jit=wT>0?Math.sin(t*50)*.06:0,ah=-Math.PI/2+(3+12/60)/12*TAU+jit,am=-Math.PI/2+(12/60)*TAU-jit*2;A.L(sh,hy,sh+Math.cos(ah)*R*.45,hy+Math.sin(ah)*R*.45,C.k,.5);A.L(sh,hy,sh+Math.cos(am)*R*.72,hy+Math.sin(am)*R*.72,C.r,.35);A.C(sh,hy,.4,C.g2);
  for(const s of [-1,1]){const ex=sh+s*1.8,ey=hy-.8;A.P([[ex-1.4,ey-.8*s],[ex+1.4,ey+.8*s],[ex+1.1,ey+1.1],[ex-1.1,ey+1.1]],C.k);A.slit(ex+A.look[0]*.25,ey+.3,1.6,.6,ch>0?'#ffffff':C.v,s*.3)}A.L(sh-2.4,hy+2,sh-.8,hy+2.6,C.k,.4);A.L(sh-.8,hy+2.6,sh+.8,hy+2.2,C.k,.4);A.L(sh+.8,hy+2.2,sh+2.4,hy+2.8,C.k,.4);for(let i=-2;i<=2;i++)A.spike(sh+i*.9,hy+2.2,Math.PI/2,.6,.4,C.f);A.L(sh+2.6,hy-3,sh+1.2,hy-.4,C.k,.3);A.L(sh+1.2,hy-.4,sh+2,hy+1,C.k,.3)}
 /* 지붕 왕관: 첨탑 + 장식 */{const ry=top+1;A.P([[-hw-.8+sh,ry+1],[hw+.8+sh,ry+1],[sh,ry-3.4]],C.w);A.P([[-hw+.2+sh,ry+.6],[hw-.2+sh,ry+.6],[sh,ry-2.4]],C.w2);for(const s of [-1,0,1])A.spike(sh+s*(hw-.2),ry+(s?.6:-3.2),-Math.PI/2,s?1.8:2.8,.8,C.g);A.C(sh,ry-6.2,.5,C.v);A.glow(sh,ry-6.2,2,C.v,.8)}
 /* 종 파동 (똑딱 괘종 준비) */if(wT>0)for(let i=0;i<3;i++)A.ring(sh,top+3.8,hw+1+i*2+((t*4)%2),.3,C.v,wT*.5);A.rise(5,-8,8,-1,18,.35,C.v,.35,1)};
MON.hand.c_pendulum=H=>{H.chain('#2e1a10','#d8a848',2.2,2.4);H.C(0,0,4.6,'#06050a');H.C(0,0,4,'#d8a848');H.C(0,0,3.2,'#efe4c8');const a=H.t*3;H.R(Math.cos(a)*2-.4,Math.sin(a)*2-.4,.8,.8,'#06050a');H.C(0,0,.8,'#b07aff');H.glow(0,0,5,'#b07aff',.4)};
/* ── 감시탑 PANOPTICON: 떠 있는 감시 요새 — 거대한 카메라 렌즈 눈, 가시철망 고리, 탐조등 팔 ── */
MON.reg.c_panopticon=A=>{const g=m1G(A.B),t=A.t,b=A.bob*1.1,C={s:'#26262e',s2:'#3a3a46',s3:'#6a6a7a',k:M3K,r:'#ff4a4a',w:'#ffffff',y:'#ffe08a'};
 const wW=A.win('watchSweep'),wC=A.win('cameraPost'),wS=A.win('spotTrack'),wL=A.win('lockdown'),ch=Math.max(wW,wC,wS,wL,A.eyeC),cy=g.core+b-1,rot=t*.4+wL*t*2;
 /* 추진 불꽃 */for(const s of [-1,1]){const q=(t*4)%1;A.P([[s*3-1,-3],[s*3+1,-3],[s*3,-.4-q]],C.r,.6);A.glow(s*3,-2,2.4,C.r,.6)}
 /* 가시철망 고리 (회전) */for(let i=0;i<22;i++){const a=rot+i*TAU/22,X=Math.cos(a)*(g.hf+2.6),Y=cy+Math.sin(a)*2.2;if(Math.sin(a)<0){A.R(X-.4,Y-.4,.8,.8,C.s3);A.spike(X,Y,a+Math.PI/2,.9,.4,C.s3)}}
 /* 탑 몸: 팔각 */A.plate([[-g.hf+1,cy+5],[g.hf-1,cy+5],[g.hf+.6,cy+1],[g.hf,cy-4],[g.hf-2,cy-6],[-g.hf+2,cy-6],[-g.hf,cy-4],[-g.hf-.6,cy+1]],C.s,C.k,C.s3);
 for(let i=0;i<5;i++)A.R(-g.hf+1.4+i*(g.hf*2-2.8)/4-.3,cy+2,.6,2.6,C.k);for(let i=0;i<5;i++)A.R(-g.hf+1.4+i*(g.hf*2-2.8)/4-.2,cy+2.4,.4,1.8,C.y,.3+.4*((i+Math.floor(t*2))%2));
 /* 거대 렌즈 눈 (초점 조절) */{const R=4+ch*.6,ey=cy-1.2;A.C(0,ey,R+1,C.k);A.ring(0,ey,R+.8,.8,C.s3);for(let i=0;i<8;i++){const a=i*TAU/8+t*.2;A.R(Math.cos(a)*(R+.4)-.2,ey+Math.sin(a)*(R+.4)-.2,.4,.4,C.s2)}A.C(0,ey,R,'#0a0a14');
  const ap=A.expose?1:.4+.4*(1-ch);A.ring(0,ey,R*.85,.5,'#3a3a5a');for(let i=0;i<6;i++){const a=t*.5+i*TAU/6;A.L(Math.cos(a)*R*ap,ey+Math.sin(a)*R*ap,Math.cos(a+1)*R*.85,ey+Math.sin(a+1)*R*.85,'#2a2a3a',.4)}
  if(!A.dm){const ex=A.look[0]*1.2,ey2=ey+A.look[1]*.8;A.C(ex,ey2,R*ap*.6,A.blink?'#1a1a2a':C.r);A.C(ex,ey2,R*ap*.25,C.k);A.R(ex-R*.3,ey2-R*.3,.6,.6,C.w);A.glow(ex,ey2,R+3+ch*6,C.r,.9+ch)}A.E(-1.4,ey-2,1.4,.6,C.w,.25)}
 /* 지붕 + 안테나 */A.P([[-g.hf+1.6,cy-6],[g.hf-1.6,cy-6],[0,cy-9.4]],C.s2);for(const s of [-1,1]){A.L(s*1.4,cy-8,s*3,cy-13,C.s3,.35);A.C(s*3,cy-13.2,.5,Math.floor(t*3+s)%2?C.r:'#4a1010')}A.C(0,cy-9.6,.6,C.r);A.glow(0,cy-9.6,2,C.r,.7);
 /* 탐조등 팔 */for(const s of [-1,1]){const ax=s*(g.hf+.6),ay=cy+1,a=Math.PI/2+s*.5+Math.sin(t*.9+s)*.4-(wS>0?s*.4:0);A.L(ax,ay,ax+s*2.4,ay+1,C.s2,.8);const hx=ax+s*2.4,hy=ay+1;A.C(hx,hy,1.2,C.k);A.C(hx,hy,.9,C.y);if(!A.dm)A.beam([[hx,hy],[hx+Math.cos(a-.15)*14,hy+Math.sin(a-.15)*14],[hx+Math.cos(a+.15)*14,hy+Math.sin(a+.15)*14]],C.y,.1+wS*.15)}
 if(A.open>0||A.expose)A.glow(0,cy+3,5,C.r,A.expose?1:A.open)};
MON.hand.c_panopticon=H=>{H.chain('#06050a','#3a3a46',2,2.4);H.R(-3,-2.4,6,4.8,'#06050a');H.R(-2.6,-2,5.2,4,'#3a3a46');H.C(2.6,0,1.6,'#06050a');H.C(2.6,0,1.1,'#ff4a4a');H.glow(2.6,0,4,'#ff4a4a',.6);H.R(-3.4,-3,1,1,'#ff4a4a')};
/* ── 등불 나방 MOTH: 거대 나방 — 눈알 무늬 날개, 등불 배, 깃털 더듬이, 털 갈기 ── */
MON.reg.c_moth=A=>{const g=m1G(A.B),t=A.t,b=A.bob*1.4,C={w:'#3a2a5a',w2:'#5a4a7a',w3:'#8a7aa8',f:'#c8b8e0',k:M3K,l:'#ffd98a',o:'#ff9a3a',e:'#1a0a2a'};
 const wS=A.win('mothSwarm'),wL=A.win('lampLure'),wG=A.win('wingGust'),ch=Math.max(wS,wL,wG,A.eyeC),cy=g.core+b-1,flap=Math.sin(t*(3+wG*10))*(.25+wG*.4);
 /* 날개 네 장 */for(const s of [-1,1]){const ang=s*(.2+flap);for(const [f,L,H2,col] of [[0,g.hf+4,8,C.w],[1,g.hf+1,5,C.w2]]){const x0=s*1.4,y0=cy-1+f*2.4,tip=[x0+s*L*Math.cos(ang),y0-H2*.7+f*6-L*Math.sin(ang)*.3];
  const pts=f?[[x0,y0],[x0+s*L*.6,y0+1],[x0+s*L,y0+H2*.6],[x0+s*L*.5,y0+H2]]:[[x0,y0],[tip[0],tip[1]-H2*.5],[x0+s*(L+1),y0-1],[x0+s*L*.7,y0+H2*.5],[x0+s*1,y0+2]];
  A.P(pts,C.k);A.P(pts.map(p=>[x0+(p[0]-x0)*.9,y0+(p[1]-y0)*.9]),col);
  if(!f){/* 눈알 무늬 */const ex=x0+s*L*.55,ey=y0-H2*.15;A.C(ex,ey,2.2,C.k);A.C(ex,ey,1.8,C.l);A.C(ex,ey,1.2,C.e);A.C(ex+s*.3,ey,.6,ch>0?'#ffffff':C.o);A.glow(ex,ey,2.4,C.l,.4+ch*.6);for(let i=0;i<4;i++)A.L(x0,y0,x0+s*L*(.3+i*.18),y0-H2*.6+i*1.4,C.w3,.2,.5)}
  else{A.C(x0+s*L*.6,y0+H2*.5,.8,C.l,.6)}}}
 /* 털 몸 + 등불 배 */A.E(0,cy+1,2,4.2,C.k);for(let i=0;i<5;i++)A.E(0,cy-1+i*1.4,1.8-i*.15,.7,i%2?C.w2:C.w3);{const ly=cy+5,op=Math.max(wL,A.open,A.expose?1:0,.3);A.E(0,ly,1.8,2.4,C.k);A.E(0,ly,1.4,2,C.l,.5+op*.5);A.E(0,ly,.6,1.2,'#ffffff',.6+op*.4);A.glow(0,ly,4+op*7,C.l,.6+op);for(let i=0;i<3;i++)A.R(-1.6,ly-1.6+i*1.4,3.2,.3,C.k)}
 /* 머리: 털 갈기 + 겹눈 + 깃털 더듬이 */{const hy=g.top+b+1;for(let i=0;i<12;i++){const a=Math.PI+i/11*Math.PI;A.spike(Math.cos(a)*2,hy+1+Math.sin(a)*1.4,a,1.6,.8,i%2?C.f:'#e8e0f0')}A.C(0,hy,2.2,C.k);A.C(0,hy,1.9,C.w2);for(const s of [-1,1]){A.E(s*1.1,hy-.2,1,1.2,C.e);if(!A.dm&&!A.blink){A.E(s*1.1,hy-.2,.8,1,C.o);for(let i=0;i<3;i++)A.R(s*1.1-.4+i*.3,hy-.6+i*.2,.2,.2,'#ffe0a0');A.glow(s*1.1,hy-.2,1.8,C.o,.8+ch*.3)}}
  for(const s of [-1,1]){let px=s*.8,py=hy-1.6;for(let k=0;k<7;k++){const nx=px+s*.7,ny=py-.9+k*.05;A.L(px,py,nx,ny,C.k,.3);A.L(nx,ny,nx+s*.6,ny-.5,C.f,.2);A.L(nx,ny,nx-s*.3,ny-.7,C.f,.2);px=nx;py=ny}}}
 /* 나방 떼 */if(wS>0)for(let i=0;i<8;i++){const a=t*3+i*.8,X=Math.cos(a)*(g.hf+3-wS*2),Y=cy+Math.sin(a*1.3)*3;A.P([[X-.8,Y],[X,Y-.4],[X+.8,Y],[X,Y+.3]],C.w3)}
 A.rise(8,-12,12,cy+4,16,.35,C.f,.35,2)};
MON.hand.c_moth=H=>{H.chain('#06050a','#8a7aa8',1.6,2.4);H.E=null;H.C(0,0,2.6,'#06050a');H.C(0,0,2,'#5a4a7a');H.R(-1.4,1,2.8,4,'#ffd98a');H.R(-1.8,1,3.6,.6,'#06050a');H.R(-1.8,4.4,3.6,.6,'#06050a');H.glow(0,3,6,'#ffd98a',.7)};
/* ── 풀무 BELLOWS: 대장간 풀무 짐승 — 숨쉬는 주름 몸통, 굴뚝 머리, 모루 주먹, 쇳물 눈 ── */
MON.reg.c_bellows=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.4,C={l:'#4a2a18',l2:'#6a3e24',l3:'#8a5a34',i:'#2a2a30',i2:'#4a4a54',k:M3K,f:'#ff7a2a',y:'#ffb040',w:'#fff0b0'};
 const wP=A.win('pumpSlam'),wC=A.win('chimneySteam'),wA=A.win('airBlast'),ch=Math.max(wP,wC,wA,A.eyeC),br=Math.sin(t*2.4)*.5+.5,infl=br*.8+wA*2,sh=A.shake(wA>.6?.3:0);
 for(const s of [-1,1]){const lx=s*5+sh;A.P([[lx-2.4,0],[lx+2.4,0],[lx+2,-5.4],[lx-2,-5.4]],C.i);A.R(lx-2.8,-1.2,5.6,1.2,C.k);for(let i=-1;i<=1;i++)A.C(lx+i*1.4,-3,.35,C.i2)}
 const cy=g.core+b;/* 주름 몸통 (숨쉼) */{const w=g.hf+infl*.6,h=g.bh/2+infl*.4;A.P([[-w-.8+sh,cy+h],[w+.8+sh,cy+h],[w+.8+sh,cy-h],[-w-.8+sh,cy-h]],C.k);for(let i=0;i<7;i++){const y=cy-h+i*(h*2/7),ww=w-(i%2)*.8;A.P([[-ww+sh,y],[ww+sh,y],[ww-.6+sh,y+h*2/7],[-ww+.6+sh,y+h*2/7]],i%2?C.l:C.l2);A.R(-ww+sh,y,ww*2,.3,C.l3,.7)}
  /* 황동 테 + 리벳 */A.R(-w-1+sh,cy-h-.8,w*2+2,1,C.i2);A.R(-w-1+sh,cy+h-.2,w*2+2,1,C.i2);for(let i=0;i<8;i++){A.C(-w+i*(w*2)/7+sh,cy-h-.3,.3,'#c8c8d0');A.C(-w+i*(w*2)/7+sh,cy+h+.3,.3,'#c8c8d0')}
  /* 가운데 화구 */const op=Math.max(A.open,A.expose?1:0,wA*.6);A.C(sh,cy,2+op,C.k);A.C(sh,cy,1.6+op,op>.1?C.f:'#3a1408');A.C(sh,cy,.8+op*.6,op>.1?C.w:'#6a2010');A.glow(sh,cy,3+op*6+br*2,C.f,.4+op)}
 /* 굴뚝 머리 */{const hy=g.top+b-.6;A.P([[-3.4+sh,hy+2],[3.4+sh,hy+2],[2.6+sh,hy-4],[-2.6+sh,hy-4]],C.i);A.R(-3.6+sh,hy-4.8,7.2,1.2,C.i2);for(let i=0;i<3;i++)A.R(-2.6+sh,hy-3+i*1.6,5.2,.4,C.k,.7);
  A.R(-2.4+sh,hy-.6,4.8,1.8,C.k);for(const s of [-1,1])A.slit(s*1.1+sh+A.look[0]*.2,hy+.3,1.4,.7,ch>0?C.w:C.y,s*.25);
  for(let i=0;i<4;i++){const q=(t*(1+wC*2)+i/4)%1;A.C(sh+Math.sin(q*5+i)*1.2,hy-5.4-q*7,1+q*2,wC>0?'#ffffff':'#6a6068',(1-q)*(.5+wC*.4))}if(wC>0)A.glow(sh,hy-5,3+wC*4,C.y,wC)}
 /* 주둥이 노즐 */{const nx=sh+g.hf+.6,ny=cy+1.4;A.P([[nx-1,ny-1.2],[nx-1,ny+1.2],[nx+3.4+wA,ny+.5],[nx+3.4+wA,ny-.5]],C.i2);A.R(nx+3.4+wA-.3,ny-.8,.6,1.6,C.k);if(wA>0){for(let i=0;i<4;i++)A.L(nx+4+wA+i,ny-1+i*.6,nx+6+wA+i*1.6,ny-1.4+i*.8,'#ffffff',.2,wA*.6)}}
 A.rise(4,-6,6,cy-g.bh/2,6,1.2,C.y,.45,3)};
MON.hand.c_bellows=H=>{const hot=H.h.mode&&H.h.mode!=='idle';H.chain('#2a2a30','#4a2a18',3,2.6);H.R(-5,-3,10,5,'#06050a');H.R(-4.6,-2.6,9.2,4,'#4a4a54');H.R(-5.6,-3.4,11.2,1.2,'#2a2a30');H.R(-2,2,4,3,'#2a2a30');H.R(-4.2,-2.2,8.4,.6,'#8a8a94');if(hot){H.R(-4.6,1,9.2,.8,'#ff7a2a');H.glow(0,2,7,'#ff7a2a',.6)}};
/* ── 지휘자 METRONOME: 메트로놈 피라미드 거인 — 흔들리는 박자 바늘, 연미복 꼬리, 가면 창 ── */
MON.reg.c_metronome=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.5,C={p:'#4a1030',p2:'#6a1a44',p3:'#9a3a6a',k:M3K,g:'#e8c060',g2:'#8a6420',w:'#fff0f8',y:'#ffe36b'};
 const wN=A.win('needleSweep'),wB=A.win('batonVolley'),wA=A.win('accentHit'),ch=Math.max(wN,wB,wA,A.eyeC),sh=A.shake(wA>.5?.3:0);
 /* 연미복 꼬리 */for(const s of [-1,1])A.P([[s*1+sh,-6],[s*(g.hf-.4)+sh,-6],[s*(g.hf+1.6)+sh,-1+Math.sin(t*2+s)*.4],[s*(g.hf-2)+sh,-2]],C.k);
 for(const s of [-1,1]){A.P([[s*2.4-1+sh,-5],[s*2.4+1+sh,-5],[s*2.8+1.2+sh,0],[s*2.8-1.2+sh,0]],'#1a0a14');A.E(s*2.8+sh,-.3,1.6,.5,C.g2)}
 /* 피라미드 몸 */const top=g.top+b-2,bot=-5+b;A.P([[-g.hf-.6+sh,bot],[g.hf+.6+sh,bot],[1.2+sh,top],[-1.2+sh,top]],C.k);A.P([[-g.hf+sh,bot-.2],[g.hf+sh,bot-.2],[1+sh,top+.6],[-1+sh,top+.6]],C.p);A.P([[-g.hf+sh,bot-.2],[sh,bot-.2],[sh,top+.6],[-1+sh,top+.6]],C.p2);
 for(let i=0;i<6;i++){const y=bot-1-i*2,w=g.hf-(i*2)*(g.hf-1)/(bot-top);A.R(-w+.4+sh,y,w*2-.8,.3,C.g2,.7)}
 /* 눈금 창 + 박자 바늘 */{const wy0=top+3,wy1=bot-1.4;A.P([[-2.6+sh,wy1],[2.6+sh,wy1],[.8+sh,wy0],[-.8+sh,wy0]],'#0e0610');for(let i=0;i<8;i++){const y=wy0+1+i*(wy1-wy0-2)/7;A.R(-.6-i*.2+sh,y,1.2+i*.4,.2,C.g,.6)}
  const sp=2.4+wN*4+wA*6,pa=Math.sin(t*sp)*(.5+wN*.3),L=wy1-wy0+5,px=sh,py=wy1;const ex=px+Math.sin(pa)*L,ey=py-Math.cos(pa)*L;A.L(px,py,ex,ey,C.k,.8);A.L(px,py,ex,ey,C.g,.4);const wx=px+Math.sin(pa)*L*.55,wy=py-Math.cos(pa)*L*.55;A.P([[wx-1,wy-.6],[wx+1,wy-.6],[wx+.7,wy+.8],[wx-.7,wy+.8]],C.g);A.spike(ex,ey,pa-Math.PI/2,1.4,.8,C.w);if(ch>0)A.glow(ex,ey,2.4+ch*2,C.y,ch)}
 /* 가면 얼굴 (피라미드 위쪽) */{const hy=top+.4;A.E(sh,hy,2.2,2.6,C.k);A.E(sh,hy-.2,1.9,2.2,C.w);A.P([[sh-1.9,hy-.6],[sh+1.9,hy-.6],[sh+1.4,hy-2.2],[sh-1.4,hy-2.2]],C.p3);for(const s of [-1,1]){const ex=sh+s*.8,ey=hy-.2;A.P([[ex-.7,ey-.3*s],[ex+.7,ey+.3*s],[ex+.5,ey+.5],[ex-.5,ey+.5]],C.k);if(!A.dm&&!A.blink){A.C(ex,ey+.15,.25,C.y);A.glow(ex,ey+.15,1.2,C.y,.8)}}A.L(sh-.6,hy+1.3,sh+.6,hy+1.1,C.k,.25)
  /* 실크햇 */A.R(-1.8+sh,hy-5.4,3.6,3.2,C.k);A.R(-2.8+sh,hy-2.4,5.6,.7,C.k);A.R(-1.8+sh,hy-3.2,3.6,.6,C.p3)}
 /* 강박 충격 준비: 전신에 박자 링 */if(wA>0)for(let i=0;i<3;i++)A.ring(sh,g.core+b,g.hf+i*2+((t*6)%2),.3,C.y,wA*.5);A.rise(4,-7,7,-1,12,.5,C.g,.35,4)};
MON.hand.c_metronome=H=>{const a=H.h.ang||-Math.PI/4;H.chain('#06050a','#6a1a44',2,2.4);H.C(0,0,2.8,'#06050a');H.C(0,0,2.2,'#fff0f8');for(let i=1;i<10;i++)H.R(Math.cos(a)*i-.4,Math.sin(a)*i-.4,.8,.8,i>7?'#ffe36b':'#06050a');H.glow(Math.cos(a)*9,Math.sin(a)*9,4,'#ffe36b',.6)};
/* ── 달력 CALENDAR: 찢겨 나부끼는 거대 일력 골렘 — 붉은 X 눈, 압정 왕관, 종이 날개 ── */
MON.reg.c_calendar=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.5,C={p:'#efe4cc',p2:'#d8c8a8',p3:'#a89878',k:M3K,r:'#d02a2a',r2:'#ff5a5a',i:'#3a3a44',g:'#c8a048'};
 const wP=A.win('pageStorm'),wD=A.win('dateMark'),wL=A.win('deadline'),ch=Math.max(wP,wD,wL,A.eyeC),rot=t*(2+ch*6);
 /* 바퀴 */for(const s of [-1,1]){const X=s*4.2;A.C(X,-2.6,2.6,C.k);A.C(X,-2.6,2,C.i);for(let i=0;i<6;i++){const a=rot*s+i*TAU/6;A.L(X,-2.6,X+Math.cos(a)*1.8,-2.6+Math.sin(a)*1.8,'#8a8a94',.3)}A.C(X,-2.6,.6,C.g)}
 const top=g.top+b,bot=-4.4+b,hw=g.hf;/* 두꺼운 종이 더미 몸 */for(let i=0;i<6;i++){const y=bot-i*((bot-top-4)/6),off=Math.sin(t*1.5+i)*.4;A.R(-hw+off,y-(bot-top-4)/6,hw*2,(bot-top-4)/6+.2,i%2?C.p2:C.p);A.R(-hw+off,y-.2,hw*2,.25,C.p3)}A.plate([[-hw-.4,bot],[hw+.4,bot],[hw+.4,bot-1.2],[-hw-.4,bot-1.2]],C.i,C.k,'#6a6a74');
 /* 제본 링 */for(let i=0;i<5;i++){const x=-hw+1.4+i*(hw*2-2.8)/4;A.ring(x,top+3.4,.8,.3,'#8a8a94')}
 /* 얼굴 페이지: 날짜 숫자 + 붉은 X 눈 */{const fy=top+4.4;A.R(-hw+.4,fy,hw*2-.8,g.bh-1.4,C.p);A.R(-hw+.4,fy,hw*2-.8,1.6,C.r);c3Num(A,'3',-hw+1.2,fy+.3,C.p);c3Num(A,'12',hw-3.4,fy+.3,C.p);
  {const ey=fy+4.2;A.P([[-3.4,ey-1.6],[-1,ey-2.4],[1.6,ey-1.8],[3.6,ey-.6],[2.4,ey+1.6],[-.4,ey+2],[-3,ey+1.2]],C.k);for(let i=0;i<6;i++){const a2=i*1.1;A.spike(Math.cos(a2)*3,ey+Math.sin(a2)*1.6,a2+Math.PI,1,.8,C.p)}if(!A.dm){A.E(A.look[0]*.6,ey,1.6,A.blink?.2:1.2,C.r2);A.E(A.look[0]*.6,ey,.35,A.blink?.1:1,C.k);A.R(A.look[0]*.6-1,ey-.6,.5,.4,'#ffffff');A.glow(A.look[0]*.6,ey,3+ch*4,C.r2,1)}}
  A.P([[-3.4,fy+7],[3.4,fy+7],[2.6,fy+9],[-2.6,fy+9]],C.k);for(let i=-3;i<=3;i++){A.spike(i*.9,fy+7,Math.PI/2,1,.6,C.p);A.spike(i*.9+.4,fy+9,-Math.PI/2,.8,.6,C.p2)}
  if(A.open>0||A.expose){A.R(-1.2,fy+6.4,2.4,2,A.expose?'#ffffff':C.g);A.glow(0,fy+7.4,5,C.g,A.expose?1:A.open)}}
 /* 압정 왕관 */for(let i=-2;i<=2;i++){const x=i*2,h=2+(i===0?1.2:0)+wD*1.2;A.L(x,top+2,x,top+2-h,'#c8c8d0',.3);A.C(x,top+2-h,.8+(i===0?.3:0),i%2?C.r:C.r2);A.C(x-.2,top+1.8-h,.25,'#ffffff')}
 /* 찢겨 나부끼는 종이 날개 */for(const s of [-1,1])for(let i=0;i<4;i++){const q=(t*.8+i/4)%1,x=s*(hw+1+i*1.2+q*2),y=top+4+i*1.6-q*2+Math.sin(t*3+i)*.6,rot2=q*3*s;A.P([[x,y],[x+s*1.8*Math.cos(rot2),y+1.2*Math.sin(rot2)],[x+s*1.4,y+1.6],[x-s*.4,y+1.2]],C.p,.8);A.R(x-.2,y+.2,.4,.4,C.r,.8)}
 if(wP>0)for(let i=0;i<8;i++){const a=t*4+i,rr=hw+3+(i%3);A.P([[Math.cos(a)*rr,top+6+Math.sin(a)*3],[Math.cos(a)*rr+1.2,top+6.4+Math.sin(a)*3],[Math.cos(a)*rr+.6,top+7.4+Math.sin(a)*3]],C.p2,wP)}
 if(wL>0)A.R(-hw-6,g.core+b,hw*2+12,.4,C.r2,wL);A.rise(4,-8,8,-1,14,.4,C.p2,.5,5)};
function c3Num(A,s,x,y,col){const F={'1':[[1,0],[1,1],[1,2],[1,3],[1,4]],'2':[[0,0],[1,0],[2,1],[1,2],[0,3],[0,4],[1,4],[2,4]],'3':[[0,0],[1,0],[2,1],[1,2],[2,3],[0,4],[1,4]]};let ox=0;for(const ch of s){(F[ch]||[]).forEach(([a,b2])=>A.R(x+ox+a*.28,y+b2*.28,.3,.3,col));ox+=1}}
MON.hand.c_calendar=H=>{H.chain('#3a3a44','#efe4cc',2,2.4);H.R(-3,-3.6,6,7,'#06050a');H.R(-2.6,-3.2,5.2,6.2,'#efe4cc');H.R(-2.6,-3.2,5.2,1.6,'#d02a2a');H.R(-.3,4,.6,4,'#c8c8d0');H.C(0,3.6,1,'#d02a2a')};
/* ── 먼지 DUST: 청소기 괴물 — 먼지 회오리 갈기, 흡입구 입, 빗자루 팔, 탱크 궤도 ── */
MON.reg.c_dust=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.5,C={m:'#2a2432',m2:'#3e3648',m3:'#6a5e7a',k:M3K,v:'#b07aff',d:'#8a7a9a',y:'#e8d8a0'};
 const wD=A.win('dustDevil'),wB=A.win('broomSweep'),wM=A.win('moteCloud'),ch=Math.max(wD,wB,wM,A.eyeC),sh=A.shake(wM>.5?.2:0);
 A.plate([[-12,-4.4],[12,-4.4],[13,-2],[11,0],[-11,0],[-13,-2]],'#1c1822',A.k||M3K,'#4a4254');for(let i=-11;i<11.5;i+=2)A.R(i+((t*3)%2)-.6,-4.6,1.2,.6,'#6a5e7a');
 const top=g.top+b,cy=g.core+b;/* 먼지 탱크 몸 (유리 속 소용돌이) */A.plate([[-g.hf-.4+sh,-4.4+b],[g.hf+.4+sh,-4.4+b],[g.hf+sh,top+2],[g.hf-2.4+sh,top],[-g.hf+2.4+sh,top],[-g.hf+sh,top+2]],C.m,C.k,C.m3);
 {const tx=sh,ty=cy,R=g.hf-2.4;A.E(tx,ty,R,g.bh/2-1.2,'#120e18');for(let i=0;i<14;i++){const a=t*(2+wD*4)+i*.7,rr=(i%5)/5*R;A.C(tx+Math.cos(a)*rr,ty+Math.sin(a)*rr*.5,.5+(i%3)*.2,C.d,.7)}A.E(tx-R*.4,ty-1.4,R*.3,.6,'#ffffff',.12);A.glow(tx,ty,R,C.v,.2+ch*.5)}
 /* 흡입구 입 */{const my=cy+3,op=Math.max(wM,A.open*.6,A.expose?1:0);A.E(sh,my,4,1.2+op*1.2,C.k);A.E(sh,my,3.2,.6+op,'#1a1420');for(let i=-3;i<=3;i++)A.R(i*.9-.1+sh,my-.8-op*.6,.2,1.6+op*1.2,C.m3);if(op>.2)A.glow(sh,my,4,C.v,op)}
 /* 먼지 회오리 갈기 (머리) */{const hy=top-1;for(let i=0;i<16;i++){const a=t*(1.4+wD*4)+i*TAU/16,rr=4+Math.sin(t*3+i)*.8+wD*1.6;A.C(sh+Math.cos(a)*rr,hy+Math.sin(a)*rr*.6,1.2+(i%3)*.3,i%2?C.m3:C.d,.75)}A.E(sh,hy,3.4,2.6,C.m2);
  for(const s of [-1,1])A.slit(sh+s*1.3+A.look[0]*.3,hy,1.6,.7,ch>0?'#ffffff':C.v,s*.3);A.R(sh-1,hy+1.2,2,.3,C.k)}
 /* 호스 */{let px=g.hf+sh,py=cy-1;for(let k=0;k<8;k++){const nx=px+.8,ny=py-1+Math.sin(t*2+k)*.5;A.L(px,py,nx,ny,C.k,1.2);A.L(px,py,nx,ny,C.m3,.6);px=nx;py=ny}A.C(px,py,1,C.k)}
 A.rise(10,-13,13,-1,14,.35,C.d,.5,6);if(wD>0)A.rise(8,-6,6,top,10,1.6,C.y,.4,7)};
MON.hand.c_dust=H=>{H.chain('#2a2432','#6a5e7a',2,2.4);H.R(-.6,-8,1.2,10,'#8a6a3a');for(let i=0;i<9;i++){const a=Math.PI/2+(i-4)*.12;H.R(Math.cos(a)*2-.3,2+Math.sin(a)*2,0.6,4,i%2?'#e8d8a0':'#c8b880')}H.R(-2,1,4,1.2,'#b07aff')};
/* ── 저울 SCALES: 심판의 거상 — 눈 가린 가면, 저울대 팔, 금빛 로브, 후광 날개 ── */
MON.reg.c_scales=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.5,C={g:'#e0c060',g2:'#a88830',g3:'#6a5418',w:'#fff8e0',k:M3K,r:'#ffffff',v:'#fff0b0',cl:'#f0ece0'};
 const wB=A.win('balance'),wC=A.win('counterWeight'),wJ=A.win('judgment'),ch=Math.max(wB,wC,wJ,A.eyeC),tilt=Math.sin(t*.9)*.12+wB*Math.sin(t*3)*.25;
 /* 후광 날개 */for(const s of [-1,1])for(let i=0;i<6;i++){const a=-Math.PI/2+s*(.4+i*.22),L=8-i*.6+wJ*2;A.spike(s*1.2,g.top+b+4,a,L,1.4,i%2?C.g2:C.g)}
 /* 로브 */const top=g.top+b+3;A.P([[-g.hf-1,0],[g.hf+1,0],[g.hf-1.4,top],[-g.hf+1.4,top]],C.k);A.P([[-g.hf-.4,-.2],[g.hf+.4,-.2],[g.hf-1.8,top+.6],[-g.hf+1.8,top+.6]],C.cl);for(let i=-2;i<=2;i++)A.L(i*1.8,top+2,i*2.4,-.4,'#c8c0b0',.35);A.R(-g.hf-.4,-1.4,g.hf*2+.8,.8,C.g);
 /* 가슴 저울 기둥 */A.R(-.5,top-2,1,g.bh-2,C.g2);A.C(0,g.core+b,1.2,A.expose?'#ffffff':C.g);if(A.open>0||A.expose)A.glow(0,g.core+b,5,C.v,A.expose?1:A.open);
 /* 저울대 (기울어짐) + 접시 */{const by=top-1.4,L=g.hf+3.4;const ex=Math.cos(tilt)*L,ey=Math.sin(tilt)*L;A.L(-ex,by-ey,ex,by+ey,C.k,1);A.L(-ex,by-ey,ex,by+ey,C.g,.6);A.C(0,by,.8,C.g);for(const s of [-1,1]){const px=s*ex,py=by+s*ey;A.L(px,py,px-1.6,py+3,C.g2,.2);A.L(px,py,px+1.6,py+3,C.g2,.2);A.E(px,py+3.2,2,.6,C.g);A.E(px,py+3,1.8,.3,C.v,.5);if(s>0&&wC>0){A.C(px,py+2.2,1+wC,C.g3);A.glow(px,py+2,3,C.v,wC)}}}
 /* 눈 가린 가면 + 왕관 */{const hy=g.top+b+1;A.E(0,hy,2.6,3,C.k);A.E(0,hy-.2,2.2,2.6,C.cl);A.R(-2.4,hy-.8,4.8,1.4,C.k);A.R(-2.4,hy-.6,4.8,1,'#2a2430');if(!A.dm){const gl=.4+ch*.6;A.R(-2,hy-.3,4,.3,C.v,gl);A.glow(0,hy-.2,2+ch*4,C.v,gl)}A.L(-.8,hy+1.6,.8,hy+1.6,C.k,.25);
  for(let i=-2;i<=2;i++)A.spike(i*.9,hy-2.6,-Math.PI/2+i*.12,1.6+(i===0?1.2:0),.7,C.g);A.C(0,hy-5,.5,C.r);A.glow(0,hy-5,2,C.v,.8)}
 if(wJ>0){A.beam([[0,g.top+b-6],[-3,-40],[3,-40]],C.v,.25*wJ);A.glow(0,g.top+b-4,6,C.v,wJ)}A.rise(6,-9,9,-1,24,.3,C.v,.35,8)};
MON.hand.c_scales=H=>{H.chain('#a88830','#e0c060',1.6,2.4);H.C(0,0,3.6,'#06050a');H.C(0,0,3,'#a88830');H.C(0,0,2.2,'#e0c060');H.R(-.4,-3.4,.8,6.8,'#6a5418');H.glow(0,0,5,'#fff0b0',.5)};
/* ── 메아리 ECHO: 축음기 짐승 — 나팔 머리, 회전하는 레코드 몸, 음파 고리 ── */
MON.reg.c_echo=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.5,C={b:'#2a3442',b2:'#3e4c60',b3:'#6a8098',g:'#c8a048',k:M3K,l:'#8ae8ff',w:'#ffffff'};
 const wE=A.win('echoRing'),wD=A.win('delayShot'),wC=A.win('callBack'),ch=Math.max(wE,wD,wC,A.eyeC),rot=t*(2+ch*6);
 for(const s of [-1,1]){const X=s*4.6;A.C(X,-2.6,2.6,C.k);A.C(X,-2.6,2,C.b);for(let i=0;i<6;i++){const a=rot*s+i*TAU/6;A.L(X,-2.6,X+Math.cos(a)*1.8,-2.6+Math.sin(a)*1.8,C.g,.3)}}
 const cy=g.core+b;/* 나무 상자 몸 */A.plate([[-g.hf,-4.4+b],[g.hf,-4.4+b],[g.hf,cy-1],[-g.hf,cy-1]],'#3a2418','#1a0e08','#6a4428');for(let i=0;i<3;i++)A.R(-g.hf+.6,cy+.4+i*1.6,g.hf*2-1.2,.3,'#1a0e08',.6);
 /* 회전 레코드 (코어) */{const ry=cy-1.4;A.E(0,ry,g.hf-.4,1.6,C.k);for(let i=1;i<5;i++)A.E(0,ry,(g.hf-.4)*i/5,1.6*i/5,'#1a1a22',.5);A.E(0,ry,1.8,.5,A.expose?'#ffffff':C.l);A.L(0,ry,Math.cos(rot)*(g.hf-1),ry+Math.sin(rot)*1.2,'#ffffff',.2,.4);if(A.open>0||A.expose)A.glow(0,ry,6,C.l,A.expose?1:A.open)}
 /* 톤암 */A.L(g.hf-1,cy-2.4,2,cy-1.6,'#c8c8d0',.4);A.C(g.hf-1,cy-2.4,.6,C.g);
 /* 나팔 머리 (플레이어 쪽으로 향함) */{const bx=0,by=cy-2.6,a=-Math.PI/2+A.look[0]*.5,L=5.4,hx=bx+Math.cos(a)*L,hy=by+Math.sin(a)*L,na=a+Math.PI/2;A.L(bx,by,hx,hy,C.k,1.8);A.L(bx,by,hx,hy,C.g,1);
  const R=5.4+wE*1.4+A.pul*.5,px=hx+Math.cos(a)*1.4,py=hy+Math.sin(a)*1.4;A.P([[hx+Math.cos(na)*.8,hy+Math.sin(na)*.8],[hx-Math.cos(na)*.8,hy-Math.sin(na)*.8],[px-Math.cos(na)*R,py-Math.sin(na)*R],[px+Math.cos(na)*R,py+Math.sin(na)*R]],C.g);const ip=(k,d)=>[hx+Math.cos(a)*d+Math.cos(na)*k,hy+Math.sin(a)*d+Math.sin(na)*k];A.P([ip(.5,.6),ip(-.5,.6),ip(-R*.82,1.3),ip(R*.82,1.3)],'#0a1420');A.P([ip(R,1.4),ip(R*1.05,1.9),ip(-R*1.05,1.9),ip(-R,1.4)],'#e8c868');for(let i=-2;i<=2;i++)A.L(hx+Math.cos(na)*i*.2,hy+Math.sin(na)*i*.2,px+Math.cos(na)*i*R*.4,py+Math.sin(na)*i*R*.4,'#8a6a20',.2,.8);
  if(!A.dm&&!A.blink){A.C(px+Math.cos(na)*1,py+Math.sin(na)*1,.5,C.l);A.C(px-Math.cos(na)*1,py-Math.sin(na)*1,.5,C.l);A.glow(px,py,2.4+ch*4,C.l,.8+ch)}
  for(let i=0;i<3;i++){const q=((t*(1+wE*2))+i/3)%1;A.ring(px+Math.cos(a)*q*6,py+Math.sin(a)*q*6,R*.6+q*4,.3,C.l,(1-q)*(.4+ch*.5))}}
 A.rise(5,-9,9,-1,12,.5,C.l,.35,9)};
MON.hand.c_echo=H=>{H.chain('#2a3442','#c8a048',2,2.4);H.C(0,0,3.4,'#06050a');H.C(0,0,2.8,'#c8a048');H.C(0,0,1.8,'#06050a');H.C(0,0,.8,'#8ae8ff');const q=(H.t*2)%1;H.glow(0,0,3+q*4,'#8ae8ff',1-q)};
/* ── 정적 STILLNESS: 멈춘 시간의 신 — 얼굴 없는 두건, 깨진 시계 후광(3시 12분), 떠 있는 시간 조각 ── */
MON.reg.c_stillness=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.8,C={v:'#0e0a16',v2:'#1e1630',v3:'#3a2e5a',k:M3K,l:'#c8a0ff',w:'#f4eeff',g:'#d8c088'};
 const any=A.any||0,ch=Math.max(any,A.eyeC),cy=g.core+b,freeze=Math.floor(t)%4===0?0:1;
 /* 깨진 시계 후광 */{const hy=g.top+b-1,R=g.hf+4;A.ring(0,hy,R,.8,C.g,.8);for(let i=0;i<12;i++){const a=i*TAU/12,gap=i===3||i===4;if(gap)continue;A.R(Math.cos(a)*(R-1.6)-.3,hy+Math.sin(a)*(R-1.6)-.3,.6,.6+(i%3===0?.6:0),C.g)}
  for(let i=0;i<5;i++){const a=.2+i*.12,d=1+Math.sin(t+i)*.4;A.P([[Math.cos(a)*(R+d),hy+Math.sin(a)*(R+d)],[Math.cos(a+.1)*(R+d+1),hy+Math.sin(a+.1)*(R+d+1)],[Math.cos(a+.05)*(R+d+2),hy+Math.sin(a+.05)*(R+d+2)]],C.g,.8)}
  const jit=freeze?0:Math.sin(t*60)*.04,ah=-Math.PI/2+(3+12/60)/12*TAU+jit,am=-Math.PI/2+12/60*TAU+jit;A.L(0,hy,Math.cos(ah)*R*.5,hy+Math.sin(ah)*R*.5,C.w,.7);A.L(0,hy,Math.cos(am)*R*.85,hy+Math.sin(am)*R*.85,C.w,.45);A.glow(0,hy,R,C.l,.25+ch*.3)}
 /* 떠 있는 망토 */for(let i=-7;i<=7;i++){const x=i*1.2,L=6+Math.sin(i*1.7)*1.4+Math.sin(t*.8+i)*.4;A.P([[x-.9,cy-1],[x+.9,cy-1],[x+Math.sin(t*.7+i)*.4,cy-1+L]],i%2?C.v:C.v2,.95)}
 A.P([[-g.hf-2,cy+2],[g.hf+2,cy+2],[g.hf-1,g.top+b+3],[3,g.top+b+.4],[-3,g.top+b+.4],[-g.hf+1,g.top+b+3]],C.k);A.P([[-g.hf-1.4,cy+1.6],[g.hf+1.4,cy+1.6],[g.hf-1.4,g.top+b+3.4],[2.6,g.top+b+1],[-2.6,g.top+b+1],[-g.hf+1.4,g.top+b+3.4]],C.v2);for(const s2 of [-1,1])A.P([[s2*(g.hf-1),g.top+b+3.4],[s2*(g.hf+4),g.top+b+6+Math.sin(t*.8)*.4],[s2*(g.hf+2),cy+2]],C.v);for(let i=0;i<5;i++)A.L(-3+i*1.5,g.top+b+2.4,-3.6+i*1.8,cy,C.v3,.3);
 /* 얼굴 없는 두건: 속에 별빛 하나 */{const hy=g.top+b+1.4;A.E(0,hy,4,4.2,C.k);A.P([[-4.2,hy+2.4],[4.2,hy+2.4],[3,hy-3],[0,hy-5.6],[-3,hy-3]],C.v3);A.P([[-4.2,hy+2.4],[-3,hy-3],[0,hy-5.6],[-1,hy-1]],'#5a4a80',.5);A.E(0,hy+.8,2.9,2.9,'#020104');if(!A.dm&&!A.blink){const r=.5+ch*.4+A.pul*.2;A.C(A.look[0]*.4,hy+.4,r,C.w);A.glow(A.look[0]*.4,hy+.4,3+ch*5,C.l,1)}}
 /* 양손: 모은 손 사이 모래시계 */{const hy=cy-1;for(const s of [-1,1])A.E(s*1.4,hy,1,1.2,C.v3);A.P([[-1,hy-2],[1,hy-2],[0,hy]],C.w,.8);A.P([[-1,hy+2],[1,hy+2],[0,hy]],C.w,.8);A.R(-1.2,hy-2.3,2.4,.4,C.g);A.R(-1.2,hy+1.9,2.4,.4,C.g);A.glow(0,hy,3,C.l,.6+(A.open||0));if(A.expose)A.glow(0,hy,6,'#ffffff',1)}
 /* 멈춘 시간 조각 */for(let i=0;i<10;i++){const a=i*TAU/10+(freeze?t*.15:0),rr=g.hf+6+Math.sin(i*1.7)*1.4,X=Math.cos(a)*rr,Y=cy-2+Math.sin(a)*rr*.5;A.P([[X,Y-1.2],[X+.8,Y],[X,Y+1],[X-.6,Y]],i%3?C.v3:C.g,.85);if(any>0)A.glow(X,Y,1.6,C.l,any)}
 A.rise(8,-14,14,cy+5,22,.18,C.l,.35,10)};
MON.hand.c_stillness=H=>{H.C(0,0,3,'#06050a');H.C(0,0,2.4,'#3a2e5a');for(let i=0;i<4;i++)H.R(-1.4+i*.9,1.4,.6,2.4,'#1e1630');H.C(0,-1,.8,'#f4eeff');H.glow(0,-1,5,'#c8a0ff',.6)};
/* 크기 · 기운 · 배율 */{const X3={c_pendulum:[[-10,-38,10,0],'#b07aff',1.22],c_panopticon:[[-14,-32,14,0],'#ff4a4a',1.15],c_moth:[[-16,-30,16,0],'#ffd98a',1.2],c_bellows:[[-13,-28,13,0],'#ff7a2a',1.15],c_metronome:[[-12,-34,12,0],'#ffe36b',1.12],c_calendar:[[-14,-32,14,0],'#ff5a5a',1.12],c_dust:[[-14,-30,14,0],'#b07aff',1.15],c_scales:[[-14,-36,14,0],'#fff0b0',1.12],c_echo:[[-12,-30,12,0],'#8ae8ff',1],c_stillness:[[-16,-36,16,0],'#c8a0ff',1.3]};
 for(const k of Object.keys(X3)){const base=MON.reg[k];MON.reg[k]=A=>{A.bbox=X3[k][0];A.aura=X3[k][1];base(A)};MON.scl[k]=X3[k][2]}}
/* ---- 연결 ---- */
{const _ca=c3Art;c3Art=function(c,B,x,y,t,o,u,id){if(MON.reg['c_'+id]&&monDraw('c_'+id,c,B,x,y,t,o||{},u||U))return;return _ca.apply(this,arguments)}}
{const _hh=monHandHook;monHandHook=function(c,B,h,sx,sy,t,dorm,sc){if(typeof _c3Swap!=='undefined'&&_c3Swap&&_c3Swap.art&&B===BOSSES[_c3Swap.bi]&&MON.hand['c_'+_c3Swap.art])return monHandDraw('c_'+_c3Swap.art,c,B,h,sx,sy,t,dorm,sc);return _hh.apply(this,arguments)}}
{const _chd=c3HandDraw;c3HandDraw=function(c,art,B,h,sx,sy,t,dorm,sc){if(MON.hand['c_'+art]&&monHandDraw('c_'+art,c,B,h,sx,sy,t,dorm,sc))return;return _chd.apply(this,arguments)}}

