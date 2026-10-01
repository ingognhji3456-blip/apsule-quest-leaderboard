/* ================= v43 디자인 보강: 단순했던 보스 6명에 구조·재질 디테일 추가 (모든 난이도) ================= */
(function(){
 const DQ={};
 /* 자석 크레인: 판넬 이음새 · 리벳 · 경광등 · 유압 실린더 · 배기관 */
 DQ.b6=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.5,wW=A.win('wreckingBall'),wP=A.win('scrapPull'),sh=A.shake(wW>.5||wP>.6?.3:0),cr=wW*1.2,top=g.top+b+cr,bot=-4.4+b+cr;
  for(const s of [-1,1])for(const f of [0,1]){const hx=s*(3+f*3.4)+sh,hy=-4.6+b+cr,kx=s*(6+f*4.4)+sh,ky=-7.6+b+cr*.4;A.L(hx,hy-.2,lerp(hx,kx,.7),lerp(hy,ky,.7)-.2,'#d8dde4',.35,.9);A.R(lerp(hx,kx,.25)-.5,lerp(hy,ky,.25)-.6,1,1.2,'#2a2a30')}
  for(const x of [-g.hf*.45,g.hf*.15]){A.L(x+sh,top+3.4,x+sh,bot-1.6,'#0a0806',.3,.7);A.C(x+sh,top+3.6,.3,'#c8b070');A.C(x+sh,bot-2,.3,'#c8b070')}
  for(let i=0;i<6;i++)A.C(-g.hf+1.2+i*(g.hf*2-2.4)/5+sh,bot-1,.28,'#a89a70');
  {const bx=g.hf-3.4+sh,by=top-.4,on=Math.floor(t*2.2)%2===0;A.R(bx-1.1,by,2.2,.6,'#2a2418');A.C(bx,by-.2,1,on?'#ffb020':'#8a5a10');A.R(bx-.3,by-.9,.6,.4,'#ffffff',on?.9:.3);if(on&&!A.dm)A.glow(bx,by-.2,6,'#ffb020',.9)}
  {const px=g.hf-.4+sh,py=top+1.6;A.R(px,py-3.4,1.2,3.6,'#3a3a42');A.R(px-.2,py-3.8,1.6,.6,'#6a6a72');if(!A.dm)A.rise(3,px,px+1.2,py-4,6,.7,'#8a8a92',.9,.3)}};
 /* 광학 요새: 렌즈 황동 고리 · 프리즘 결정 · 측면 렌즈 포트 · 바닥 빛 홈 */
 DQ.b8=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.4,top=g.top+b,ey=g.core+b-.8,R=4.6,wF=Math.min(1,A.win('focusLens')+A.eyeC);
  A.ring(0,ey,R+1.9,.6,'#c8a048');for(let i=0;i<10;i++){const a=i*TAU/10+t*.2;A.C(Math.cos(a)*(R+1.6),ey+Math.sin(a)*(R+1.6),.3,'#fff0b0')}
  for(let i=0;i<24;i++){const a=i*TAU/24-t*.4;if(i%3)A.R(Math.cos(a)*(R+3)-.15,ey+Math.sin(a)*(R+3)-.15,.3,.3,'#8a7a50',.8)}
  for(const s of [-1,1]){const tx=s*(g.hf-1.2),cy=top-8.2,hue=['#ff5a8a','#ffe36b','#5affc8','#7ab8ff'][Math.floor(t*3+s)&3];A.P([[tx,cy-1.6],[tx+1,cy],[tx,cy+1.4],[tx-1,cy]],'#c8f4ff');A.P([[tx,cy-1.6],[tx+1,cy],[tx,cy]],'#ffffff',.8);A.R(tx-.2,cy-.3,.4,.4,hue);if(!A.dm)A.glow(tx,cy,3+wF*3,hue,.6)}
  for(const s of [-1,1]){const px=s*(g.hf-2.8),py=top+6;A.C(px,py,1.1,'#14181e');A.C(px,py,.7,'#5affc8',.9);A.R(px-.25,py-.35,.3,.3,'#ffffff');if(!A.dm)A.glow(px,py,2.4,'#5affc8',.5)}
  if(!A.dm){const p=.5+.5*Math.sin(t*3);A.R(-g.hf+.6,-5.4,g.hf*2-1.2,.35,'#5affc8',.35+.4*p)}};
 /* 풀무: 가죽 띠와 버클 · 송풍 노즐 · 주름 틈 불빛 · 굴뚝 불똥 */
 DQ.c_bellows=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.4,wA=A.win('airBlast'),br=Math.sin(t*2.4)*.5+.5,infl=br*.8+wA*2,sh=A.shake(wA>.6?.3:0),cy=g.core+b,w=g.hf+infl*.6,h=g.bh/2+infl*.4;
  for(let i=1;i<7;i++){const y=cy-h+i*(h*2/7);A.R(-w+1+sh,y-.15,w*2-2,.3,'#ff7a2a',.18+.3*br*(i%2))}
  for(const s of [-1,1]){const x=s*w*.55+sh;A.R(x-.55,cy-h,1.1,h*2,'#2a1810');A.R(x-.55,cy-h,.3,h*2,'#5a3a24',.8);A.R(x-.9,cy-.7,1.8,1.4,'#c8a048');A.R(x-.4,cy-.3,.8,.6,'#2a1810')}
  {const nx=w+.8+sh;A.P([[nx,cy-1.2],[nx+3.2,cy-.5],[nx+3.2,cy+.5],[nx,cy+1.2]],'#8a6a30');A.P([[nx,cy-1.2],[nx+3.2,cy-.5],[nx,cy-.4]],'#c8a048',.9);A.C(nx+3.4,cy,.5,'#ff7a2a');if(!A.dm)A.glow(nx+3.4,cy,2+wA*4,'#ff7a2a',.6+wA)}
  if(!A.dm)A.rise(5,-2+sh,2+sh,g.top+b-5.6,9,.9,'#ffb040',.45,.7)};
 /* 광산의 메아리: 광석 결정 · 광부 랜턴 · 곡괭이 · 모서리 철물 */
 DQ.c_echo=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.5,cy=g.core+b,bot=-4.4+b,top=cy-1;
  for(const [x,y] of [[-g.hf+.4,top],[g.hf-1.2,top],[-g.hf+.4,bot-.8],[g.hf-1.2,bot-.8]])A.R(x,y,.8,.8,'#6a8098');
  for(const [x,h,c] of [[-g.hf+1.2,2.2,'#8ae8ff'],[-g.hf+2.6,1.4,'#c8a0ff'],[g.hf-1.6,1.8,'#8ae8ff']]){A.P([[x-.7,top],[x+.7,top],[x+.2,top-h],[x-.3,top-h+.3]],c);A.R(x-.2,top-h*.7,.3,h*.4,'#ffffff',.7);if(!A.dm)A.glow(x,top-h*.5,2,c,.4)}
  {const lx=-g.hf-1.2,ly=top+1.6,fl=.75+.25*Math.sin(t*9)*Math.sin(t*3.3);A.L(-g.hf,top+.4,lx,ly-1.4,'#4a4a52',.25);A.R(lx-.7,ly-1.4,1.4,2,'#2a2a30');A.R(lx-.45,ly-1,0.9,1.3,'#ffd070',fl);if(!A.dm)A.glow(lx,ly-.4,4,'#ffd070',.7*fl)}
  {const px=g.hf+.6;A.L(px,bot,px+1.6,top-1.4,'#6a4428',.45);A.P([[px+.4,top-1.6],[px+3,top-2.2],[px+1.4,top-1]],'#8a9098');A.R(px+2.4,top-2.3,.4,.3,'#ffffff',.8)}};
 /* 공허 방랑자: 로브 속 별빛 · 밑단의 룬 · 두건 테두리 · 빨려드는 파편 */
 DQ.c_s4_void=A=>{const t=A.t,b=A.bob*.8,cy=-16+b,wG=A.win('gravityWell');
  for(let i=0;i<16;i++){const x=-5+((i*37)%100)/10,y=cy-2+((i*53)%120)/10,tw=.4+.6*Math.abs(Math.sin(t*1.7+i*2.3));A.R(x,y,i%5?.35:.6,i%5?.35:.6,i%3?'#ffffff':'#d8b8ff',tw*.9)}
  for(let i=0;i<7;i++){const x=-6+i*2,y=cy+9.4+((i%2)?.8:0),on=.5+.5*Math.sin(t*2+i);A.R(x-.4,y-.6,.8,.25,'#b86aff',on);A.R(x-.1,y-.9,.25,1,'#b86aff',on);if(!A.dm&&on>.8)A.glow(x,y-.4,1.6,'#b86aff',.5)}
  {const hy=cy-8;A.L(-5.8,hy-1,-4,hy-4.6,'#8a5ab0',.3,.9);A.L(-4,hy-4.6,-1,hy-7,'#8a5ab0',.3,.9);A.L(-1,hy-7,2,hy-6.4,'#8a5ab0',.25,.7)}
  for(let i=0;i<6;i++){const a=t*(.6+wG*2)+i*TAU/6,r=13-((t*.5+i/6)%1)*5;const x=Math.cos(a)*r,y=cy+2+Math.sin(a)*r*.45;A.P([[x-.6,y],[x,y-.7],[x+.7,y+.1],[x,y+.6]],'#2a1c3a');A.R(x-.1,y-.6,.4,.3,'#b86aff',.8)}};
 /* 먼지 원동기: 압력계 · 배관 · 탱크 리벳 */
 DQ.c_dust=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.5,top=g.top+b,cy=g.core+b,wM=A.win('moteCloud'),sh=A.shake(wM>.5?.2:0),R=g.hf-2.4;
  for(let i=0;i<12;i++){const a=i*TAU/12;A.C(sh+Math.cos(a)*(R+.7),cy+Math.sin(a)*(g.bh/2-.5),.28,'#a89ab8')}
  {const gx=g.hf-1.6+sh,gy=top+2.8,nd=-2.2+Math.sin(t*3)*.4+wM*1.5;A.C(gx,gy,1.3,'#1a1420');A.C(gx,gy,1,'#e8d8a0');A.L(gx,gy,gx+Math.cos(nd)*.85,gy+Math.sin(nd)*.85,'#c8202e',.2);A.C(gx,gy,.2,'#1a1420')}
  for(const s of [-1,1]){const px=s*(g.hf+.2)+sh;A.L(px,cy-1,px+s*1.4,cy+1,'#6a5e7a',.7);A.L(px+s*1.4,cy+1,px+s*1.4,-4.6+b,'#6a5e7a',.7);A.L(px,cy-1.2,px+s*1.4,cy+.8,'#a89ab8',.2,.8);A.C(px+s*1.4,cy+1,.45,'#8a7a9a')}};
 for(const k in DQ){const o=MON.reg[k];if(!o)continue;const f=function(A){o(A);try{DQ[k](A)}catch(e){if(!DQ.err){DQ.err=1;console.error('v43 dq',k,e)}}};for(const p in o)f[p]=o[p];if(o.ol)f.ol=o.ol;MON.reg[k]=f}
})();

