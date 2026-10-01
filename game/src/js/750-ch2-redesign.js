/* ================= 챕터 2 굶주린 것들 리디자인 v94 — 황무지의 거대 괴수: 유기적인 몸, 발광 무늬, 뿔·가시·송곳니 (피·살점 없음) ================= */
const M2K='#07050a';
/* ── 10 뿌리아귀 ROOTMAW: 걸어다니는 고목 괴수 — 줄기 속 거대한 턱, 가시 가지 왕관, 뿌리 다리 ── */
MON.reg.b10=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.5,C={w:'#3a2a1a',w2:'#56402a',w3:'#7a5a3a',m:'#2a4a1a',m2:'#6ab83a',g:'#9dff5a',k:M2K,y:'#e8ffb0'};
 const wV=A.win('vineWhip'),wS=A.win('seedBloom'),wF=A.win('fangLunge'),ch=Math.max(wV,wS,wF,A.eyeC),sh=A.shake(wF>.5?.3:0),open=Math.max(wF,A.open*.8,A.expose?1:0);
 /* 뿌리 다리 (꿈틀) */for(const s of [-1,1])for(let r=0;r<3;r++){const x0=s*(2.4+r*1.6)+sh,y0=-5.6+b,wv=Math.sin(t*2+r+s)*.6;A.L(x0,y0,x0+s*(2+r*1.4)+wv,-1.4,C.k,1.6-r*.3);A.L(x0,y0,x0+s*(2+r*1.4)+wv,-1.4,C.w2,1-r*.2);A.L(x0+s*(2+r*1.4)+wv,-1.4,x0+s*(3.4+r*1.6)+wv,0,C.w,.8-r*.15)}
 /* 줄기 몸통 */const top=g.top+b,cy=g.core+b;A.P([[-g.hf+.4+sh,-4.6+b],[g.hf-.4+sh,-4.6+b],[g.hf-1.8+sh,top+1],[g.hf-3.6+sh,top-1],[-g.hf+3.2+sh,top-1.2],[-g.hf+1.4+sh,top+1.4]],C.k);A.P([[-g.hf+1+sh,-5+b],[g.hf-1+sh,-5+b],[g.hf-2.4+sh,top+1],[-g.hf+2+sh,top+1]],C.w);
 for(let i=0;i<6;i++){const x=-g.hf+2+i*(g.hf*2-4)/5+sh;A.L(x,-5.2+b,x+Math.sin(i)*1.2,top+1.4,C.w2,.5)}for(let i=0;i<3;i++)A.E(-g.hf+2.4+i*5+sh,cy+2.6-i*1.4,1.2,.5,C.m,.9);
 /* 이끼 망토 */for(let i=0;i<9;i++){const x=-g.hf+1+i*1.8+sh;A.P([[x-.9,top+1.4],[x+.9,top+1.4],[x+.2,top+2.8+Math.sin(i*1.7+t)*.5]],i%2?C.m:'#3a6a22')}
 /* 거대한 턱 (돌진 물기 준비 때 쩍 벌어짐) */{const my=cy+.4,mw=g.hf-2,mh=1.4+open*3.4;A.E(sh,my,mw+.6,mh+.8,C.k);A.E(sh,my,mw,mh,'#1a0e08');if(open>.1){A.E(sh,my+.4,mw*.7,mh*.6,'#3a6a1a');A.glow(sh,my,mw,C.g,open*.6)}
  for(let i=0;i<7;i++){const x=-mw+.8+i*(mw*2-1.6)/6+sh,L=1+(i%2)*.8+open*.6;A.spike(x,my-mh+.2,Math.PI/2,L,.9,'#e8dcc0');A.spike(x+.6,my+mh-.2,-Math.PI/2,L*.8,.9,'#d8ccb0')}}
 /* 눈: 옹이 구멍 속 초록 불빛 */{const ey=top+3.2;for(const s of [-1,1]){const ex=s*2.6+sh;A.E(ex,ey,1.6,1.1,C.k);A.slit(ex+A.look[0]*.3,ey,1.8,.8,ch>0?C.y:C.g,s*.2)}A.brow(-2.6+sh,ey-1.2,2.6,1,C.w2);A.brow(2.6+sh,ey-1.2,2.6,-1,C.w2)}
 /* 가시 가지 왕관 + 씨앗 봉오리 */const br=[[-4.4,-1.1,6.4],[-2,-1.35,8.4],[.4,-1.55,9.4],[2.8,-1.8,7.6],[4.8,-2.05,5.6]];br.forEach(([x,a,L],i)=>{const a2=a+Math.sin(t*1.2+i)*.05-(wV>0?wV*.3*(x<0?1:-1):0),x0=x+sh,y0=top-.6,x1=x0+Math.cos(a2)*L,y1=y0+Math.sin(a2)*L;A.L(x0,y0,x1,y1,C.k,1.4);A.L(x0,y0,x1,y1,C.w2,.8);
  const mx=(x0+x1)/2,my2=(y0+y1)/2;A.spike(mx,my2,a2+(i%2?.9:-.9),1.6,.6,C.w3);const bud=.8+wS*1.6;A.C(x1,y1,bud,wS>0?C.g:C.m2);if(wS>.3){for(let p=0;p<5;p++){const pa=p*TAU/5+t;A.spike(x1,y1,pa,bud+.8,.8,'#c8ff8a')}A.glow(x1,y1,2+wS*3,C.g,wS)}});
 /* 덩굴 채찍 준비: 몸에서 덩굴이 솟아 휘감음 */if(wV>0)for(const s of [-1,1]){let px=s*(g.hf-1)+sh,py=cy;for(let k=0;k<10;k++){const nx=px+s*.9,ny=py-1+Math.sin(t*6+k*.8)*1.2*wV;A.L(px,py,nx,ny,C.m2,.7);if(k%3===2)A.spike(nx,ny,-Math.PI/2,.9,.5,C.y);px=nx;py=ny}A.glow(px,py,3,C.g,wV)}
 if(A.open>0||A.expose)A.glow(sh,cy,6,C.g,A.expose?1:A.open)};
MON.hand.b10=H=>{const k=H.h.mode&&H.h.mode!=='idle';H.chain('#07050a','#56402a',3.2,2.6);H.C(0,0,5.6,'#07050a');H.C(-.3,-.4,4.8,'#3a2a1a');for(let i=0;i<4;i++){const a=Math.PI*.2+i*.6;H.R(Math.cos(a)*5-.8,Math.sin(a)*5-.8,1.6,4,'#56402a');H.R(Math.cos(a)*5-.4,Math.sin(a)*5+3,.8,1.4,'#e8dcc0')}H.R(-2,-2,4,1,'#6ab83a');H.glow(0,-1,5,'#9dff5a',k?.7:.3)};
/* ── 11 포자여왕 SPORE QUEEN: 거대한 독버섯 여왕 — 갓은 왕관, 드리운 베일 아래 빛나는 가면, 발광 반점 ── */
MON.reg.b11=A=>{const g=m1G(A.B),t=A.t,b=A.bob*1.2,C={c:'#4a1e5a',c2:'#6e2e84',c3:'#a45ac0',v:'#2a1636',s:'#caff6b',k:M2K,w:'#f0d8ff'};
 const wW=A.win('sporeWaltz'),wR=A.win('mushroomRing'),ch=Math.max(wW,wR,A.eyeC),cy=g.core+b,spin=t*.6+wW*t*2;
 /* 베일 (여러 겹 드리움) */for(let i=-6;i<=6;i++){const x=i*1.25,L=7+Math.sin(i*1.3)*1.4+Math.sin(t*2+i)*.5;A.P([[x-.8,cy-2],[x+.8,cy-2],[x+.3+Math.sin(t*1.6+i)*.5,cy-2+L]],i%2?C.v:'#3a1e4a',.92)}
 /* 기둥 몸 */A.P([[-3,cy-2],[3,cy-2],[2,-3+b],[-2,-3+b]],'#3a2a44');A.E(0,-3+b,3.2,.9,'#2a1e34');for(let i=0;i<3;i++)A.E(0,cy+i*1.6,3-i*.3,.35,'#5a3e6a',.8);for(const s2 of [-1,1])for(let i=0;i<3;i++)A.L(s2*(1.6+i*.5),cy+1+i,s2*(4+i*1.4),-.4+Math.sin(t*2+i)*.3,'#2a1636',.5);
 /* 가면 얼굴 (베일 틈) */{const fy=cy-.2;A.E(0,fy,3.8,4.2,C.k);A.E(0,fy-.2,3.3,3.7,'#d8cce8');A.E(-1,fy-1.6,1.2,1.4,'#f4eefa',.6);for(const s of [-1,1]){const ex=s*1.4,ey=fy-.8;A.P([[ex-1.2,ey-.5*s],[ex+1.2,ey+.5*s],[ex+.9,ey+1],[ex-.9,ey+1]],C.k);if(!A.dm&&!A.blink){A.C(ex+A.look[0]*.25,ey+.3,.45,C.s);A.glow(ex,ey+.3,2.4,C.s,1)}}A.P([[-1.6,fy+1.8],[1.6,fy+1.8],[0,fy+3.4]],C.k);for(let i=-1;i<=1;i++)A.spike(i*.8,fy+1.8,Math.PI/2,.8,.4,'#e8e0f0');A.L(0,fy-3.8,0,fy-2.2,C.c2,.4);for(const s of [-1,1])A.L(s*2.6,fy-1,s*3.2,fy+2,C.c2,.3,.7)}
 /* 거대한 갓 (포자 왈츠 준비 때 회전) */{const gy=g.top+b-.4,R=g.hf+2.6,H=4.6+wR*.8;A.E(0,gy+1,R+.6,1.6,C.k);A.P([[-R-.6,gy+1.2],[R+.6,gy+1.2],[R-1,gy-H*.6],[R*.4,gy-H],[-R*.4,gy-H],[-R+1,gy-H*.6]],C.k);A.P([[-R,gy+.8],[R,gy+.8],[R-1.4,gy-H*.55],[R*.35,gy-H+.6],[-R*.35,gy-H+.6],[-R+1.4,gy-H*.55]],C.c);A.P([[-R+1.4,gy-H*.55],[-R*.35,gy-H+.6],[R*.1,gy-H+.6],[-R*.2,gy-H*.3]],C.c2);
  /* 주름 */for(let i=-5;i<=5;i++)A.L(i*R/6,gy+1,i*R/6*.8,gy+2,'#2a1636',.3);
  /* 발광 반점 (회전) */for(let i=0;i<9;i++){const a=spin+i*TAU/9,sx=Math.cos(a)*R*.72,sy=gy-H*.35+Math.sin(a)*H*.3;if(Math.sin(a)<-0.2)continue;const on=.5+.5*Math.sin(t*3+i)+ch;A.C(sx,sy,.7+(i%3)*.25,C.s,Math.min(1,on));A.glow(sx,sy,1.8,C.s,Math.min(1,on)*.6)}
  /* 왕관 버섯 */for(let i=-2;i<=2;i++){const x=i*2,h=1.6+(i===0?1.2:0)+wR*.8;A.R(x-.3,gy-H+.6-h,.6,h,'#d8c8b0');A.E(x,gy-H+.6-h,1+(i===0?.4:0),.7,i%2?C.c3:C.c2);A.C(x,gy-H+.4-h,.3,C.s)}}
 /* 포자 고리 */const n=10;for(let i=0;i<n;i++){const a=t*(1+wW*3)+i*TAU/n,rr=g.hf+3+Math.sin(t*2+i)*.6,X=Math.cos(a)*rr,Y=cy+1+Math.sin(a)*rr*.35;A.C(X,Y,.4+ch*.3,i%2?C.s:C.w,.8);if(ch>.3)A.glow(X,Y,1.4,C.s,.6)}
 if(A.open>0||A.expose)A.glow(0,cy,6,C.s,A.expose?1:A.open)};
MON.hand.b11=H=>{const wv=Math.sin(H.t*3)*2;H.chain('#2a1636','#6e2e84',2.4,2.4);for(let i=0;i<5;i++){const k=i/4;H.C(wv*k,-4+i*2.2,3-i*.4,i%2?'#4a1e5a':'#6e2e84')}H.C(wv,6,1.2,'#caff6b');H.glow(wv,6,4,'#caff6b',.6)};
/* ── 12 늪지 아귀 BOG LURKER: 늪에서 반쯤 솟은 거대 아귀개구리 — 이끼 등, 초롱 유인등, 턱 가시 ── */
MON.reg.b12=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.6,C={s:'#16302a',s2:'#24483c',s3:'#3e7058',bl:'#0e1e1a',m:'#3a5a1a',k:M2K,l:'#ffd84a',w:'#fff6c8',y:'#e8e060',t:'#e8dcc0'};
 const wH=A.win('lilyHop'),wT=A.win('bubbleTongue'),wL=A.win('lureHypno'),ch=Math.max(wH,wT,wL,A.eyeC),sq=wH*1.4,sh=A.shake(wH>.6?.25:0),mo=Math.max(wT,A.open*.6,A.expose?1:0,.25);
 A.E(0,-.6,g.hf+4,1.4,C.bl);for(let i=0;i<2;i++){const q=(t*.5+i/2)%1;A.E(0,-.6,g.hf+2+q*3,.5+q*.4,'#3a6a5a',(1-q)*.35)}
 const cy=g.core+b+sq*.8;
 for(const s2 of [-1,1]){A.E(s2*(g.hf)+sh,-3.2+sq*.2,3.6,2.6+sq*.3,C.k);A.E(s2*(g.hf-.2)+sh,-3.4+sq*.2,3.2,2.2,C.s2);for(let i=0;i<4;i++)A.spike(s2*(g.hf+1.6)+sh+i*s2*.7,-1,Math.PI/2+s2*.3,1.2,.8,C.t)}
 /* 몸: 사마귀 · 발광 반점 */A.E(sh,cy+1,g.hf+1.4,g.bh/2+.6-sq*.3,C.k);A.E(sh,cy+.6,g.hf+.8,g.bh/2-sq*.3,C.s);A.E(sh-2,cy-1.4,g.hf*.5,g.bh*.2,C.s2);
 for(let i=0;i<12;i++){const a=i*2.3,rr=(i%4)/4*(g.hf-1)+1.4,x=Math.cos(a)*rr+sh,y=cy+Math.sin(a)*rr*.5;A.C(x,y,.5,C.s3);if(i%3===0){A.C(x,y+.2,.25,C.y,.7+.3*Math.sin(t*3+i));A.glow(x,y,1,C.y,.4)}}
 for(let i=-4;i<=4;i++)A.spike(i*1.8+sh,cy-g.bh/2+.4+Math.abs(i)*.3,-Math.PI/2+i*.1,1.4+(i%2)*.6,1,C.s3);
 /* 거대한 입: 머리 전체를 가로지름 */{const hy=g.top+b+2.4+sq*.6,mw=g.hf+.6,mh=.8+mo*3.2;A.E(sh,hy,mw+.4,3.2,C.k);A.E(sh,hy-.6,mw,2.4,C.s2);A.E(sh,hy+1.2,mw-.4,mh,C.k);if(mh>1.2){A.E(sh,hy+1.4,mw-1.2,mh*.7,'#2a0e18');A.E(sh,hy+1.8,mw-3,mh*.35,'#6a1a2a')}
  for(let i=0;i<13;i++){const x=-mw+1+i*(mw*2-2)/12+sh,L=1.2+(i%4===1?1.4:0)+mo*.6;A.spike(x,hy+1.2-mh*.8,Math.PI/2+(x-sh)/mw*.2,L,.8,C.t);A.spike(x+.4,hy+1.2+mh*.8,-Math.PI/2,L*.7,.7,C.t)}
  /* 두꺼운 눈썹 뿔 + 가는 노란 눈 */for(const s2 of [-1,1]){const ex=s2*(g.hf-3.4)+sh,ey=hy-2.6;A.E(ex,ey,2,1.4,C.k);A.E(ex,ey-.2,1.7,1.1,C.s3);A.slit(ex+A.look[0]*.3,ey,2,.8,ch>0?C.w:C.y,s2*.35);A.P([[ex-s2*2,ey-1.8],[ex+s2*1.6,ey-.6],[ex+s2*2.4,ey-2.6]],C.k)}
  if(wT>0)for(const s2 of [-1,1]){A.C(s2*(g.hf+.2)+sh,hy+1.4,1+wT*1.6,'#8ae8c8',.6);A.glow(s2*(g.hf+.2)+sh,hy+1.4,2+wT*2.4,'#8ae8c8',wT)}}
 {const bx=sh+1,by=g.top+b-.8+sq*.6,sw=Math.sin(t*1.8)*.5+wL*Math.sin(t*9)*.6,L=6.4,lx=bx+Math.sin(sw)*L*.6+2.4,ly=by-L;let px=bx,py=by;for(let k=1;k<=9;k++){const q=k/9,nx=bx+(lx-bx)*q+Math.sin(q*Math.PI)*1.4,ny=by+(ly-by)*q-Math.sin(q*Math.PI)*1.6;A.L(px,py,nx,ny,C.s2,.6);if(k%3===0)A.spike(nx,ny,-Math.PI/2,.6,.4,C.s3);px=nx;py=ny}
  const lr=1.3+wL*.7+A.pul*.3;A.C(lx,ly,lr+.5,C.k);A.C(lx,ly,lr,C.l);A.C(lx-.4,ly-.4,lr*.4,C.w);A.glow(lx,ly,5+wL*9,C.l,.9+wL);if(wL>0)for(let i=0;i<3;i++)A.ring(lx,ly,lr+1+i*1.8+((t*3)%1.8),.25,C.l,wL*.5)}
 A.rise(6,-12,12,-1,10,.5,'#6a9a7a',.45,5);if(A.open>0||A.expose)A.glow(sh,cy+2,6,C.l,A.expose?1:A.open)};
MON.hand.b12=H=>{const wv=Math.sin(H.t*2.6)*1.6;H.chain('#1e3a2e','#2e5a44',3,2.6);H.C(0,0,4.4,'#07050a');H.C(0,0,3.6,'#2e5a44');for(let i=0;i<3;i++){const a=Math.PI*.3+i*.35;H.R(Math.cos(a)*4+wv*.2-.6,Math.sin(a)*4-.6,1.2,3.4,'#4a8a64');H.C(Math.cos(a)*4+wv*.2,Math.sin(a)*4+3.2,.7,'#c8b888')}};
/* ── 13 백골 사냥개 BONE HOUND: 화석 갑옷의 거대 늑대 — 뿔 두개골 투구, 등뼈 가시, 붉은 불꽃 눈 ── */
MON.reg.b13=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.5,C={b:'#d8d0b8',b2:'#a89878',b3:'#6a5e48',f:'#2a2420',f2:'#4a4038',k:M2K,r:'#ff3a3a',o:'#ff8a3a'};
 const wB=A.win('boneBoomerang'),wS=A.win('skullRoll'),wF=A.win('fangLunge'),wH=A.win('boneHowl'),ch=Math.max(wB,wS,wF,wH,A.eyeC),crouch=wF*1.4,sh=A.shake(wH>.3?.3:0),dir=A.look[0]<0?-1:1;
 /* 네 다리 (웅크리기) */for(const [s,f] of [[-1,0],[-1,1],[1,0],[1,1]]){const hx=s*(2.6+f*3.2)+sh,hy=-5+b+crouch,fx=s*(3.4+f*3.6)+sh;A.L(hx,hy,fx+s*.6,-2+crouch*.3,C.k,1.8);A.L(hx,hy,fx+s*.6,-2+crouch*.3,f?C.f:C.f2,1.1);A.L(fx+s*.6,-2+crouch*.3,fx,0,C.b2,.8);for(let i=-1;i<=1;i++)A.spike(fx+i*.5,-.4,Math.PI/2,.8,.5,C.b)}
 const cy=g.core+b+crouch;/* 몸: 털 + 뼈 갑옷 */A.E(sh,cy+.6,g.hf,g.bh/2,C.k);A.E(sh,cy+.4,g.hf-.6,g.bh/2-.5,C.f);for(let i=0;i<14;i++){const x=-g.hf+1+i*(g.hf*2-2)/13+sh;A.spike(x,cy+g.bh/2-1,Math.PI/2+Math.sin(i)*.3,1.4,.8,C.f2)}
 /* 갈비 갑옷 */for(let i=0;i<5;i++){const x=-3.2+i*1.6+sh;A.L(x,cy-2.4,x-.4,cy+2.2,C.b,.55);A.L(x,cy-2.4,x-.4,cy+2.2,C.b2,.25)}A.L(-4+sh,cy-2.6,4+sh,cy-2.6,C.b,.7);
 /* 등뼈 가시 (울부짖기 준비 때 곤두섬) */for(let i=0;i<7;i++){const x=-g.hf+2+i*(g.hf*2-4)/6+sh,L=1.8+Math.sin(i/6*Math.PI)*1.6+wH*1.6;A.spike(x,cy-g.bh/2+.4,-Math.PI/2-.2,L,1.1,C.b);A.L(x,cy-g.bh/2+.4,x-.3,cy-g.bh/2+.4-L*.6,C.b3,.25)}
 /* 꼬리 (해골 굴리기 준비 때 치켜듦) */{let px=-dir*(g.hf-.4)+sh,py=cy-1;for(let k=0;k<6;k++){const nx=px-dir*1,ny=py-.6-wS*.6+Math.sin(t*5+k)*.4;A.C(nx,ny,.9-k*.08,C.b);A.C(nx,ny,.4,C.b3);px=nx;py=ny}A.spike(px,py,-Math.PI/2-dir*.6,1.8,1,C.b)}
 /* 두개골 투구 머리 */{const hx=dir*(g.hf-1.2)+sh,hy=g.top+b+2.4+crouch*.8,jaw=wF*1.8+wH*1.4;A.E(hx,hy,3.6,2.8,C.k);A.E(hx,hy-.3,3.1,2.3,C.b);A.P([[hx+dir*1.6,hy+.6],[hx+dir*4.8,hy+.2],[hx+dir*4.6,hy+1.4],[hx+dir*1.4,hy+1.8]],C.b);A.P([[hx+dir*1.4,hy+1.6],[hx+dir*4.4,hy+1.4+jaw*.6],[hx+dir*4,hy+2.4+jaw],[hx+dir*1.2,hy+2.6]],C.b2);
  for(let i=0;i<4;i++){A.spike(hx+dir*(2+i*.8),hy+1.5,Math.PI/2,.8+(i===0?.6:0),.5,'#ffffff');A.spike(hx+dir*(2+i*.8),hy+2.2+jaw*.6,-Math.PI/2,.7,.5,'#f0e8d8')}A.C(hx+dir*4.6,hy+.4,.35,C.k);
  for(const s of [-1,1])A.spike(hx+s*1.4,hy-1.8,-Math.PI/2+s*.7-dir*.2,3.6,1.3,C.b2);A.E(hx+dir*.8,hy-.2,1.1,.9,C.k);if(!A.dm&&!A.blink){A.slit(hx+dir*.8,hy-.2,1.2,.7,ch>0?C.o:C.r,dir*.2);A.rise(3,hx+dir*.4,hx+dir*1.2,hy-.6,4,1.8,C.r,.4,1)}A.brow(hx+dir*.8,hy-1.1,2,dir,C.b3);
  if(wH>0)for(let i=0;i<3;i++)A.ring(hx+dir*4,hy+1.4,1.4+i*1.8+((t*6)%1.8),.3,C.o,wH*.5)}
 /* 뼈 부메랑 준비: 등 위 뼈가 빛남 */if(wB>0){A.L(-3+sh,cy-g.bh/2-1.4,3+sh,cy-g.bh/2-2.6,C.b,1);A.glow(sh,cy-g.bh/2-2,4,C.o,wB)}
 if(A.open>0||A.expose)A.glow(sh,cy,6,C.o,A.expose?1:A.open)};
MON.hand.b13=H=>{H.chain('#07050a','#a89878',2.6,2.4);H.C(0,0,4.2,'#07050a');H.C(0,0,3.4,'#2a2420');for(let i=-1;i<=1;i++){H.R(i*1.8-.6,1,1.2,3,'#4a4038');H.R(i*1.8-.5,3.6,1,2.2,'#f0e8d8')}H.R(-2.6,-2,5.2,1,'#d8d0b8')};
/* ── 14 실크 여제 SILK EMPRESS: 거미 여왕 — 여덟 개 붉은 눈의 왕관 머리, 비단 망토, 등 뒤 거미줄 하프 ── */
MON.reg.b14=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.6,C={a:'#3a1440',a2:'#5a2464',a3:'#8a4a9a',s:'#e8d8f0',k:M2K,r:'#ff4a8a',w:'#ffffff',g:'#ffd166'};
 const wP=A.win('webPluck'),wD=A.win('spiderDrop'),ch=Math.max(wP,wD,A.eyeC),cy=g.core+b,rise=wD*1.6;
 /* 거미줄 하프 (뒤) */{const hy=cy-2,R=g.hf+5;for(let i=0;i<9;i++){const a=Math.PI+i*Math.PI/8,vib=wP>0?Math.sin(t*40+i)*.4*wP:0;A.L(0,hy,Math.cos(a)*R+vib,hy+Math.sin(a)*R,C.s,.2,.5+wP*.4)}for(let r=1;r<=4;r++){let px=null;for(let i=0;i<=8;i++){const a=Math.PI+i*Math.PI/8,x=Math.cos(a)*R*r/4,y=hy+Math.sin(a)*R*r/4;if(px)A.L(px[0],px[1],x,y,C.s,.15,.4+wP*.4);px=[x,y]}}if(wP>0)A.glow(0,hy-R*.5,R*.7,C.s,wP*.4)}
 /* 여덟 다리 (기둥 위에 선 자세) */for(const s of [-1,1])for(let i=0;i<4;i++){const hx=s*(1.8+i*.8),hy=cy+1-rise,kx=s*(5.4+i*1.8),ky=cy-4-i*.6+Math.sin(t*2+i)*.3-rise,fx=s*(6.6+i*2.2),fy=0;A.L(hx,hy,kx,ky,C.k,1.3);A.L(hx,hy,kx,ky,i%2?C.a2:C.a3,.7);A.L(kx,ky,fx,fy,C.k,1);A.L(kx,ky,fx,fy,C.a2,.5);A.spike(kx,ky,-Math.PI/2,.9,.6,C.s)}
 /* 배 (뒤쪽 큰 몸) + 모래시계 무늬 */A.E(0,cy+1.6-rise,g.hf-2,3.6,C.k);A.E(0,cy+1.4-rise,g.hf-2.6,3.1,C.a);A.P([[-1,cy+.4-rise],[1,cy+.4-rise],[0,cy+1.6-rise],[1,cy+2.8-rise],[-1,cy+2.8-rise],[0,cy+1.6-rise]],C.r);A.glow(0,cy+1.6-rise,2.4,C.r,.5+ch*.5);
 /* 비단 망토 */for(let i=-4;i<=4;i++)A.P([[i*1.4-.8,cy-2-rise],[i*1.4+.8,cy-2-rise],[i*1.4+Math.sin(t*1.4+i)*.4,cy+3.4-rise+Math.abs(i)*.3]],i%2?'#d8c8e8':C.s,.7);
 /* 상체 + 왕관 머리 */{const hy=g.top+b-.4-rise;A.P([[-2.8,hy+5],[2.8,hy+5],[1.8,hy+1.4],[-1.8,hy+1.4]],C.a2);A.P([[-2.8,hy+5],[0,hy+5],[0,hy+1.4],[-1.8,hy+1.4]],C.a3,.4);A.E(0,hy,3.2,3,C.k);A.E(0,hy-.2,2.8,2.6,C.a);
  const eyes=[[-1.2,-.6,.55],[1.2,-.6,.55],[-.5,-1.1,.4],[.5,-1.1,.4],[-1.8,.1,.35],[1.8,.1,.35],[-.7,.2,.3],[.7,.2,.3]];if(!A.dm)eyes.forEach(([ex,ey,r])=>{A.C(ex+A.look[0]*.15,hy+ey,A.blink?.1:r,C.r);A.R(ex-r*.3,hy+ey-r*.4,r*.4,r*.4,'#ffd0e0')});A.glow(0,hy-.4,3+ch*3,C.r,.7+ch);
  /* 송곳니 */for(const s of [-1,1])A.spike(s*.6,hy+1.4,Math.PI/2+s*.2,1.4+wD*.6,.6,C.w);
  /* 가시 왕관 */for(let i=-2;i<=2;i++)A.spike(i*.9,hy-1.8,-Math.PI/2+i*.15,1.6+(i===0?1:0),.6,C.g);A.C(0,hy-4.2,.4,C.r)}
 /* 실 (거미 낙하 준비 때 위로 뻗은 은실) */if(wD>0){A.L(0,g.top+b-rise-2,0,-40,C.s,.2,wD);A.glow(0,g.top+b-rise-4,3,C.s,wD*.6)}
 if(A.open>0||A.expose)A.glow(0,cy+1.6,6,C.r,A.expose?1:A.open)};
MON.hand.b14=H=>{H.chain('#5a2464','#e8d8f0',1.6,2.4);H.C(0,0,3.4,'#07050a');H.C(0,0,2.6,'#5a2464');for(const s of [-1,1]){for(let i=0;i<6;i++)H.R(s*(1+i*.2)-.4,1+i,.8,.8,'#8a4a9a')}H.R(-.4,1,.8,6,'#ffffff')};
/* ── 15 말벌 군주 WASP LORD: 갑옷 입은 말벌 기사 — 뿔 투구, 창 같은 독침, 호박 날개, 붉은 겹눈 ── */
MON.reg.b15=A=>{const g=m1G(A.B),t=A.t,b=A.bob*1.2,C={y:'#f0b020',y2:'#a87008',y3:'#6a4204',k:'#0a0806',k2:'#1c1610',k3:'#2e2618',r:'#ff2a3a',w:'#fff6d0',a:'#ffcc60',m:'#c8ccd4'};
 const wW=A.win('waggleDance'),wH=A.win('honeyPool'),wD=A.win('diveStrike'),ch=Math.max(wW,wH,wD,A.eyeC),cy=g.core+b-1,dive=wD,wig=wW>0?Math.sin(t*14)*wW*1.4:0,X=wig;
 /* 두 쌍의 날개: 날갯짓 잔상 */for(const s2 of [-1,1])for(const f of [0,1])for(const ph of [-.22,0,.22]){const ang=-Math.PI/2+s2*(.55+f*.55+ph+Math.sin(t*50+f)*.12),L=9.4-f*2.2,al=ph===0?.5:.16,x0=X+s2*1.6,y0=cy-3;A.P([[x0,y0],[x0+Math.cos(ang-.16)*L,y0+Math.sin(ang-.16)*L],[x0+Math.cos(ang+.1)*L*1.02,y0+Math.sin(ang+.1)*L*1.02],[x0+Math.cos(ang+.26)*L*.72,y0+Math.sin(ang+.26)*L*.72]],'#f0e0a0',al);if(ph===0){A.L(x0,y0,x0+Math.cos(ang)*L*.95,y0+Math.sin(ang)*L*.95,C.y2,.2,.8);A.L(x0+Math.cos(ang)*L*.4,y0+Math.sin(ang)*L*.4,x0+Math.cos(ang+.2)*L*.7,y0+Math.sin(ang+.2)*L*.7,C.y2,.15,.6)}}
 /* 배: 줄무늬 갑각 + 독침 창 (급강하 때 앞으로) */{const ax=X,ay=cy+3+dive*.4,sa=Math.PI/2-dive*1.1;A.E(ax,ay+1.6,3.4,4.2,C.k);for(let i=0;i<5;i++){const w=3-i*.42;A.E(ax,ay-1+i*1.4,w,.8,i%2?C.k2:C.y);A.E(ax-w*.4,ay-1.2+i*1.4,w*.35,.25,C.w,.5)}
  const sx=ax+Math.cos(sa)*4,sy=ay+Math.sin(sa)*4+1;A.spike(sx,sy,sa,5+dive*2,1.4,C.m,C.w);A.L(sx,sy,sx+Math.cos(sa)*4,sy+Math.sin(sa)*4,'#ffffff',.2,.8);if(ch>0){A.C(sx+Math.cos(sa)*5,sy+Math.sin(sa)*5,.5,C.r);A.glow(sx+Math.cos(sa)*5,sy+Math.sin(sa)*5,2.4,C.r,ch)}}
 /* 흉갑 + 견갑 */A.plate([[-3.6+X,cy-4],[3.6+X,cy-4],[4.2+X,cy-.6],[2.4+X,cy+2.6],[-2.4+X,cy+2.6],[-4.2+X,cy-.6]],C.y2,C.k,C.w);A.P([[-1.6+X,cy-3.6],[1.6+X,cy-3.6],[X,cy+2]],C.k3);A.C(X,cy-1,.8,C.r);A.glow(X,cy-1,2.4,C.r,.6+ch*.4);
 for(const s2 of [-1,1]){A.E(s2*4.4+X,cy-3.2,2.2,1.6,C.k);A.E(s2*4.4+X,cy-3.4,1.9,1.3,C.y);A.spike(s2*5.6+X,cy-3.6,-Math.PI/2+s2*.7,2,.9,C.k3)}
 /* 네 다리 */for(const s2 of [-1,1])for(let i=0;i<2;i++){const hx=s2*1.6+X,hy=cy+1.8+i,kx=s2*(3.6+i),ky=cy+3.6+i*1.4,fx=s2*(3+i*1.2),fy=cy+6+i;A.L(hx,hy,kx,ky,C.k,.6);A.L(kx,ky,fx,fy,C.k,.5);A.spike(fx,fy,Math.PI/2,.6,.4,C.y3)}
 /* 뿔 투구 + 겹눈 + 큰턱 */{const hy=g.top+b+1,hx=X;A.E(hx,hy,3.4,2.9,C.k);A.E(hx,hy-.2,3,2.5,C.k2);for(const s2 of [-1,1]){A.E(hx+s2*1.6,hy-.2,1.5,1.9,C.k);if(!A.dm){A.E(hx+s2*1.6,hy-.2,1.2,1.6,A.blink?C.k2:C.r);for(let i=0;i<4;i++)A.R(hx+s2*1.6-.8+i*.45,hy-1+((i+1)%2)*.5,.3,.3,'#ff9aa8');A.glow(hx+s2*1.6,hy-.2,2.4,C.r,.9+ch*.4)}}
  A.P([[hx-3,hy-1.4],[hx+3,hy-1.4],[hx+2.2,hy-3.2],[hx-2.2,hy-3.2]],C.y);A.P([[hx-2.2,hy-3.2],[hx+2.2,hy-3.2],[hx,hy-4.2]],C.y2);A.spike(hx,hy-4,-Math.PI/2,3,1.4,C.y);A.L(hx,hy-4,hx,hy-6.6,C.w,.2,.6);
  for(const s2 of [-1,1]){let px=hx+s2*1,py=hy-3.2;for(let k=0;k<5;k++){const nx=px+s2*.7,ny=py-1+Math.sin(t*3+k)*.1;A.L(px,py,nx,ny,C.k,.35);px=nx;py=ny}A.C(px,py,.45,C.y)}
  for(const s2 of [-1,1]){const op=.3+ch*.6;A.P([[hx+s2*.6,hy+2],[hx+s2*2.2,hy+1.4],[hx+s2*(.6+op*1.4),hy+3.6]],C.y2);A.spike(hx+s2*(.6+op*1.4),hy+3.4,Math.PI/2-s2*.5,.8,.4,C.w)}}
 /* 꿀단지 준비 */if(wH>0)for(const s2 of [-1,1]){const hx=s2*(g.hf+2)+X,hy=cy+1;A.E(hx,hy,1.8,2,'#c87808');A.E(hx-.5,hy-.6,.6,.8,'#ffe08a',.8);A.R(hx-1.2,hy-2.2,2.4,.7,C.k);A.glow(hx,hy,3.4,C.a,wH)}
 A.rise(5,-10,10,cy+6,16,.4,C.a,.35,7);if(A.open>0||A.expose)A.glow(X,cy-1,6,C.r,A.expose?1:A.open)};
MON.hand.b15=H=>{const k=(H.h.kick||0)*3;H.chain('#0a0806','#f0b020',2.2,2.6);H.C(0,0,3.6,'#0a0806');H.C(0,0,2.8,'#a87008');const a=H.h.ang||Math.PI/2;for(let i=2;i<10;i++)H.R(Math.cos(a)*(i-k)-.6,Math.sin(a)*(i-k)-.6,1.2,1.2,i>8?'#fff6d0':'#c8ccd4');if(H.h.charge>0)H.glow(Math.cos(a)*10,Math.sin(a)*10,6,'#ff2a3a',.8)};
/* ── 16 수정 기생체 CRYST PARASITE: 정동석 껍데기를 짊어진 거대 소라게 — 자수정 가시, 눈자루, 수정 집게 ── */
MON.reg.b16=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.5,C={s:'#2a1238',s2:'#4a2260',c:'#b86aff',c2:'#e0b8ff',c3:'#7de0ff',k:M2K,sh:'#5a4a40',sh2:'#8a7868'};
 const wP=A.win('prismWall'),wF=A.win('facetBeam'),ch=Math.max(wP,wF,A.eyeC),cy=g.core+b;
 /* 다리들 (바퀴 대신 갑각 다리) */for(const s of [-1,1])for(let i=0;i<3;i++){const hx=s*(2+i*1.6),kx=s*(4.4+i*2),ky=-4.4+Math.sin(t*4+i*1.3+s)*.4,fx=s*(5+i*2.2);A.L(hx,-3.6+b,kx,ky,C.k,1.1);A.L(hx,-3.6+b,kx,ky,C.s2,.6);A.L(kx,ky,fx,0,C.k,.9);A.L(kx,ky,fx,0,C.s,.5)}
 /* 정동석 껍데기 (등) */{const sx=-1,sy=cy-1,R=g.hf-.4;A.E(sx,sy,R+.6,g.bh/2+1.2,C.k);A.E(sx,sy,R,g.bh/2+.6,'#1e1824');A.E(sx-1.4,sy-1.6,R*.6,g.bh*.2,'#3a3044',.7);for(let i=0;i<6;i++){const a2=i*1.05+.3,x0=sx+Math.cos(a2)*R*.3,y0=sy+Math.sin(a2)*g.bh*.15,x1=sx+Math.cos(a2)*R*.95,y1=sy+Math.sin(a2)*(g.bh/2+.4);A.L(x0,y0,x1,y1,C.k,.8);A.L(x0,y0,x1,y1,C.c,.35,.6+ch*.4)}A.E(sx,sy+.4,R*.45,g.bh*.2,'#2a0e40');for(let i=0;i<6;i++){const a2=i*1.1;A.P([[sx+Math.cos(a2)*R*.4,sy+.4+Math.sin(a2)*g.bh*.18],[sx+Math.cos(a2+.3)*R*.15,sy+.4],[sx+Math.cos(a2-.3)*R*.15,sy+.4]],C.c2,.8)}A.glow(sx,sy+.4,R*.6,C.c,.4+ch*.5);
  /* 깨진 틈에서 솟은 자수정 (수정 기둥 준비 때 자람) */const gr=1+wP*.5;[[-5,-1.3,5],[-2.6,-1.5,7.4],[.2,-1.62,8.6],[2.8,-1.8,6.8],[4.8,-2,4.8],[-6.4,-1.1,3.4]].forEach(([x,a,L],i)=>{const x0=sx+x,y0=sy-g.bh/2+1.4+Math.abs(x)*.2,ca=Math.cos(a),sa=Math.sin(a),w=1.8;A.P([[x0-w/2,y0],[x0+w/2,y0],[x0+ca*L*gr,y0+sa*L*gr]],C.k);A.P([[x0-w*.35,y0],[x0,y0],[x0+ca*L*gr*.94,y0+sa*L*gr*.94]],C.c);A.P([[x0,y0],[x0+w*.35,y0],[x0+ca*L*gr*.94,y0+sa*L*gr*.94]],C.c2);A.glow(x0+ca*L*gr*.6,y0+sa*L*gr*.6,2+ch*2,C.c,.5+ch*.5)})}
 /* 몸 앞쪽 + 얼굴판 */{const fx=g.hf-2.6,fy=cy+1.6;A.E(fx,fy,3.2,2.6,C.k);A.E(fx,fy-.2,2.8,2.2,C.s2);for(let i=0;i<3;i++)A.L(fx-2+i*1.6,fy+1.6,fx-1.4+i*1.6,fy+2.6,C.c3,.3,.8);
  /* 눈자루 (굴절 광선 준비 때 곧게 세움) */for(const s of [0,1]){const ex=fx-1+s*2.2,a=-Math.PI/2+(s?.3:-.3)+Math.sin(t*2+s)*.15*(1-wF),L=3+wF*1.2,tx=ex+Math.cos(a)*L,ty=fy-1.6+Math.sin(a)*L;A.L(ex,fy-1.6,tx,ty,C.k,.8);A.L(ex,fy-1.6,tx,ty,C.s2,.45);A.C(tx,ty,1,C.k);if(!A.dm&&!A.blink){A.C(tx,ty,.8,C.c3);A.C(tx+A.look[0]*.2,ty,.35,C.k);A.glow(tx,ty,2+wF*4,C.c3,.8+wF)}}
  /* 입 촉수 */for(let i=-1;i<=1;i++)A.L(fx+i*.8,fy+2,fx+i*1.1+Math.sin(t*4+i)*.4,fy+3.4,C.c,.35)}
 if(A.open>0||A.expose)A.glow(-1,cy-1,7,C.c,A.expose?1:A.open)};
MON.hand.b16=H=>{const cl=H.h.mode&&H.h.mode!=='idle'?1:0;H.chain('#07050a','#4a2260',2.6,2.4);H.C(0,0,4,'#07050a');H.C(0,0,3.2,'#4a2260');for(const s of [-1,1]){const a=Math.PI/2+s*(.5-cl*.3);H.R(Math.cos(a)*3-1,Math.sin(a)*3-1,2,2,'#b86aff');H.R(Math.cos(a)*5-.8,Math.sin(a)*5-.8,1.6,1.6,'#e0b8ff')}H.glow(0,4,5,'#b86aff',.5)};
/* ── 17 심연 아귀왕 ABYSS MAW: 심해의 거대 아귀 왕 — 발광 무늬, 거대 턱, 왕관 초롱, 지느러미 날개 ── */
MON.reg.b17=A=>{const g=m1G(A.B),t=A.t,b=A.bob*1.2,C={d:'#0c1a30',d2:'#16304e',d3:'#28507a',k:M2K,l:'#6ae8ff',p:'#ff5d8f',w:'#e8faff',t:'#d8e8f0'};
 const wB=A.win('bubbleStream'),wI=A.win('inkCloud'),wF=A.win('fangLunge'),ch=Math.max(wB,wI,wF,A.eyeC),cy=g.core+b,jaw=Math.max(wF,wB*.6,A.open*.6,A.expose?1:0);
 /* 아래로 늘어진 발광 촉수 */for(let i=-3;i<=3;i++){let px=i*2,py=cy+3;for(let k=0;k<7;k++){const nx=px+Math.sin(t*2+i+k*.6)*.5,ny=py+1;A.L(px,py,nx,ny,k%2?C.d2:C.d3,.8-k*.08);px=nx;py=ny}A.C(px,py,.35,C.l);A.glow(px,py,1.4,C.l,.6)}
 /* 지느러미 날개 */for(const s2 of [-1,1]){const fx=s2*(g.hf-1),wv=Math.sin(t*2+s2)*.5;A.P([[fx,cy-3],[fx+s2*8,cy-7+wv],[fx+s2*6.4,cy-2.4+wv],[fx+s2*8.4,cy+1.2+wv],[fx,cy+2]],C.k);A.P([[fx,cy-2.4],[fx+s2*7.2,cy-6.2+wv],[fx+s2*5.6,cy-2.2+wv],[fx+s2*7.4,cy+.6+wv],[fx,cy+1.4]],C.d2,.9);for(let i=0;i<4;i++)A.L(fx,cy-1.6+i*.9,fx+s2*(7-i*.5),cy-6+i*2+wv,C.d3,.25);A.C(fx+s2*7,cy-5.8+wv,.35,C.l)}
 /* 몸 */A.E(0,cy,g.hf+.4,g.bh/2+1,C.k);A.E(0,cy-.2,g.hf,g.bh/2+.4,C.d);A.E(-1.8,cy-2.6,g.hf*.55,g.bh*.2,C.d2);for(let i=0;i<10;i++){const a=i/10*TAU,sx=Math.cos(a)*(g.hf-1.6),sy=cy-1+Math.sin(a)*(g.bh/2-1.2);if(sy>cy+1)continue;A.C(sx,sy,.4,C.l,.6+.4*Math.sin(t*3+i));A.glow(sx,sy,1.4,C.l,.5)}
 for(let i=0;i<5;i++)A.spike(-4+i*2,cy-g.bh/2-.2,-Math.PI/2+(i-2)*.2,1.6,.8,C.d3);
 /* 거대한 턱 */{const my=cy+1.2,mw=g.hf-1,op=jaw*3.6;A.E(0,my,mw,1.2+op,C.k);if(op>.3){A.E(0,my+.4,mw*.8,op*.8,'#1a0a20');A.C(0,my+.6,op*.4,C.p,.7);A.glow(0,my,mw,C.p,jaw*.6)}
  for(let i=0;i<11;i++){const x=-mw+.8+i*(mw*2-1.6)/10,L=1.6+(i%3===1?1.6:0)+jaw;A.spike(x,my-.3-op*.5,Math.PI/2+(x/mw)*.25,L,.9,C.t);A.spike(x+.4,my+.5+op*.9,-Math.PI/2-(x/mw)*.25,L*.8,.8,C.t)}}
 for(const s2 of [-1,1]){const ex=s2*(g.hf-3.2),ey=cy-2.8;A.C(ex,ey,1.2,C.k);if(!A.dm&&!A.blink){A.C(ex,ey,.9,C.w);A.C(ex+A.look[0]*.25,ey,.45,C.k);A.glow(ex,ey,2.2,C.l,.7)}A.brow(ex,ey-1.2,2.4,s2,C.d2)}
 {const bx=0,by=g.top+b-.6,sw=Math.sin(t*1.4)*.4,lx=bx+Math.sin(sw)*6+2.6,ly=by-6;let px=bx,py=by;for(let k=1;k<=10;k++){const q=k/10,nx=bx+(lx-bx)*q+Math.sin(q*Math.PI)*2,ny=by+(ly-by)*q-Math.sin(q*Math.PI)*1.4;A.L(px,py,nx,ny,C.d3,.6);px=nx;py=ny}
  const on=wI>0?(Math.floor(t*12)%3?.2:1):1,lr=1.5+A.pul*.3;A.C(lx,ly,lr+.5,C.k);A.C(lx,ly,lr,C.l,on);A.C(lx-.4,ly-.4,lr*.4,C.w,on);A.glow(lx,ly,5+ch*6,C.l,on);for(let i=0;i<3;i++)A.spike(lx,ly+lr,Math.PI/2+(i-1)*.4,1,.5,C.d3)}
 if(wI>0)for(let i=0;i<6;i++){const q=(t*.8+i/6)%1;A.C(Math.sin(i*2)*5,cy+2+q*3,1.2+q*2.4,'#12061e',wI*(1-q)*.85)}
 if(wB>0)for(let i=0;i<5;i++){const q=(t*2+i/5)%1;A.ring(Math.sin(i*3)*2.4,cy+2-q*7,.6+q*.8,.2,C.w,wB*(1-q))}A.rise(8,-12,12,-1,24,.3,C.l,.35,9)};
MON.hand.b17=H=>{const wv=Math.sin(H.t*2.4)*2;H.chain('#0c1a30','#28507a',2.6,2.4);for(let i=0;i<6;i++){const k=i/5;H.C(wv*k,-4+i*2,2.6-i*.3,i%2?'#16304e':'#28507a')}for(let i=0;i<3;i++)H.C(wv*(i/3),-2+i*3,.4,'#6ae8ff');H.glow(wv,7,4,'#6ae8ff',.5)};
/* ── 18 재의 유령 ASH WRAITH: 재로 된 두건 망령 — 잿불 눈, 너덜너덜한 망토, 주위를 도는 등불들 ── */
MON.reg.b18=A=>{const g=m1G(A.B),t=A.t,b=A.bob*1.4,C={a:'#34343c',a2:'#4e4e58',a3:'#8a8a94',k:M2K,e:'#ff7a2a',e2:'#ffd166',w:'#fff0d8',ch:'#6a6a74'};
 const wL=A.win('lanternDance'),wA=A.win('ashBloom'),wP=A.win('phantomDash'),ch=Math.max(wL,wA,wP,A.eyeC),cy=g.core+b,fade=wP>.2?.45+.55*Math.abs(Math.sin(t*26)):1,lean=wP*1.2;
 /* 잿불 연기 꼬리 */for(let i=0;i<7;i++){const q=(t*.6+i/7)%1;A.C(Math.sin(i*1.7+t)*2-lean*2,cy+4+q*4,1.6-q,C.a,(1-q)*.5*fade)}
 /* 망토 자락 (넓게) */for(let i=-8;i<=8;i++){const x=i*1.15+lean,L=5.4+Math.sin(i*1.9)*1.8+Math.sin(t*2.4+i)*.9;A.P([[x-.9,cy-1],[x+.9,cy-1],[x+Math.sin(t*2+i)*.9-lean*.6,cy-1+L]],i%2?C.a:'#26262e',.92*fade)}
 /* 어깨 망토 날개 */for(const s2 of [-1,1])A.P([[s2*2+lean,g.top+b+3],[s2*(g.hf+4)+lean,g.top+b+5+Math.sin(t*2+s2)*.6],[s2*(g.hf+3)+lean,cy+1],[s2*(g.hf+1)+lean,cy+3.4],[s2*1+lean,cy]],'#2a2a32',fade);
 /* 몸 */A.P([[-g.hf+1+lean,cy+1],[g.hf-1+lean,cy+1],[g.hf-2.4+lean,g.top+b+3],[0+lean,g.top+b],[-g.hf+2.4+lean,g.top+b+3]],C.k,fade);A.P([[-g.hf+1.6+lean,cy+.6],[g.hf-1.6+lean,cy+.6],[g.hf-2.8+lean,g.top+b+3.2],[lean,g.top+b+.8],[-g.hf+2.8+lean,g.top+b+3.2]],C.a,fade);
 /* 쇠사슬 (몸을 감음) */for(let i=0;i<9;i++){const q=i/8,x=-g.hf+2+q*(g.hf*2-4)+lean,y=cy-3+q*2.4+Math.sin(q*6)*.4;A.E(x,y,.55,.4,C.ch,fade);A.E(x,y,.25,.15,C.k)}
 /* 뿔 두건 + 잿불 눈 */{const hy=g.top+b+1.6,hx=lean*1.4;A.E(hx,hy,4.4,3.9,C.k,fade);A.P([[hx-4.6,hy+2.6],[hx+4.6,hy+2.6],[hx+3.6,hy-3],[hx+1,hy-6.6],[hx-1,hy-6.6],[hx-3.6,hy-3]],C.a2,fade);A.P([[hx-4.6,hy+2.6],[hx-3.6,hy-3],[hx-1,hy-6.6],[hx-1.4,hy-2]],C.a3,.35*fade);
  for(const s2 of [-1,1]){A.spike(hx+s2*2.6,hy-4,-Math.PI/2+s2*.6,3.4,1.2,'#1e1e24');A.L(hx+s2*2.6,hy-4,hx+s2*4.2,hy-6.4,C.a2,.3)}
  A.E(hx,hy+.6,3.1,2.9,'#040306');if(!A.dm&&!A.blink){for(const s2 of [-1,1])A.slit(hx+s2*1.2+A.look[0]*.3,hy+.2,1.6,.7,ch>0?C.e2:C.e,s2*.3);A.P([[hx-1.2,hy+1.6],[hx+1.2,hy+1.6],[hx,hy+2.4]],C.e,.4);A.rise(3,hx-1.6,hx+1.6,hy-.4,5,1.6,C.e,.35,2)}}
 /* 해진 손 */for(const s2 of [-1,1]){const hx=s2*(g.hf+.4)+lean,hy=cy-1;A.E(hx,hy,1.4,1.8,C.a2,fade);for(let i=0;i<3;i++)A.spike(hx+(i-1)*.5,hy+1.2,Math.PI/2+s2*.2,1.8,.45,C.a3)}
 /* 잿불 꽃 */{const op=Math.max(wA,A.open,A.expose?1:0);if(op>0){A.C(lean,cy-2,.8+op*1.4,C.e2);A.glow(lean,cy-2,4+op*7,C.e,op);for(let i=0;i<8;i++){const a=t*4+i*.8;A.spark(lean+Math.cos(a)*(5-op*4),cy-2+Math.sin(a)*(3.4-op*2.4),.5,C.e2,op)}}}
 /* 등불 궤도 (쇠사슬로 매닮) */const n=4;for(let i=0;i<n;i++){const a=t*(.9+wL*2.6)+i*TAU/n,rr=g.hf+4.4,Xp=Math.cos(a)*rr,Y=cy-2+Math.sin(a)*rr*.45,sw=Math.sin(t*3+i)*.3;A.L(Xp,Y-2.6,Xp+sw,Y-1,C.ch,.2);A.P([[Xp-1.2,Y-1],[Xp+1.2,Y-1],[Xp+.8,Y-1.6],[Xp-.8,Y-1.6]],C.a2);A.R(Xp-1,Y-1,2,2.4,C.e,.9);A.R(Xp-.4,Y-.6,.8,1.4,C.w);A.R(Xp-1.2,Y+1.4,2.4,.6,C.a2);A.glow(Xp,Y+.2,3+wL*2.4,C.e,.9)}
 A.rise(8,-g.hf-2,g.hf+2,cy+5,18,.45,'#8a8a92',.5,3);A.rise(5,-4,4,g.top+b,10,.8,C.e,.45,4)};
MON.hand.b18=H=>{H.C(0,0,3,'#3a3a42');for(let i=0;i<4;i++)H.R(-1.4+i*.9,1.4,.6,2.6-Math.abs(i-1.5)*.4,'#8a8a92');H.R(-.8,-4,1.6,3,'#ff7a2a');H.glow(0,-2.6,5,'#ff7a2a',.7)};
/* ── 19 태초의 굶주림 PRIMAL HUNGER: 별을 삼킨 우주 용 — 여러 뿔 왕관, 은하가 비치는 입, 여섯 눈, 성운 비늘 ── */
function m2Primal(A,mut){const g=m1G(A.B),t=A.t,b=A.bob*.6,C=mut?{p:'#0a2a1a',p2:'#145a34',p3:'#2a9a5a',k:'#030806',e:'#3aff8a',g:'#d0ff6a',w:'#f0fff4',c:'#8aff3a',th:'#c8e8b0'}:{p:'#2a0612',p2:'#5a0c24',p3:'#9a1a3e',k:'#060208',e:'#ff2a5a',g:'#ffc84a',w:'#fff0f4',c:'#ff6ad0',th:'#f0d8c8'};
 const wW=A.win('worldBite'),wM=A.win('hungerMedley'),wG=A.win('primalGaze'),ch=Math.max(wW,wM,wG,A.eyeC,A.any*.5),sh=A.shake(wW>.5?.35:0);
 const bloom=Math.max(wW,A.open*.7,A.expose?1:0,wM*.4),cy=g.core+b-3,spin=t*.25+wM*t;
 for(let i=0;i<9;i++){const a=Math.PI*(.1+i*.1),wv=Math.sin(t*1.6+i)*.5;let px=sh,py=-3;for(let k=0;k<6;k++){const nx=px+Math.cos(a)*1.7*(i<4.5?-1:1)*Math.abs(Math.cos(a))*1.6+wv*.2,ny=py+.5;A.L(px,py,nx,ny,C.k,1.2-k*.15);A.L(px,py,nx,ny,k%2?C.p2:C.p,.6-k*.07);px=nx;py=ny}A.spike(px,py,Math.PI/2,.8,.5,C.th)}
 A.P([[-3.4+sh,-2],[3.4+sh,-2],[2+sh,cy+4],[-2+sh,cy+4]],C.k);A.P([[-2.8+sh,-2.4],[2.8+sh,-2.4],[1.5+sh,cy+4],[-1.5+sh,cy+4]],C.p);for(let i=0;i<4;i++)A.E(sh,-3.4-i*2.2,2.6-i*.3,.5,C.p3,.8);
 for(const s2 of [-1,1]){const x0=s2*2+sh,y0=cy+2;let px=x0,py=y0;for(let k=0;k<9;k++){const q=k/8,nx=x0+s2*(q*10),ny=y0-2+q*q*9+Math.sin(t*1.4+q*4+s2)*.8;A.L(px,py,nx,ny,C.k,2-q*1.2);A.L(px,py,nx,ny,C.p2,1.2-q*.8);if(k%2)A.spike(nx,ny,-Math.PI/2+s2*.5,1.4-q*.6,.7,C.th);px=nx;py=ny}A.C(px,py,.6,C.e);A.glow(px,py,1.6,C.e,.6)}
 const nB=12;for(let i=0;i<nB;i++){const a=spin+i*TAU/nB,L=g.hf+3+bloom*3,w=2.4;const ca=Math.cos(a),sa=Math.sin(a);A.P([[sh+ca*3-sa*w,cy+sa*3+ca*w],[sh+ca*3+sa*w,cy+sa*3-ca*w],[sh+ca*L,cy+sa*L]],C.k);A.P([[sh+ca*3.4-sa*w*.7,cy+sa*3.4+ca*w*.7],[sh+ca*3.4+sa*w*.7,cy+sa*3.4-ca*w*.7],[sh+ca*(L-.8),cy+sa*(L-.8)]],i%2?C.p2:C.p3);A.L(sh+ca*3.6,cy+sa*3.6,sh+ca*(L-1.2),cy+sa*(L-1.2),C.c,.25,.5)}
 const nF=6;for(let i=0;i<nF;i++){const base=-Math.PI/2+i*TAU/nF+Math.sin(t*.6)*.05,a=base,L=5.6+bloom*1.4,open=1.6+bloom*4.6,ca=Math.cos(a),sa=Math.sin(a),tipx=sh+ca*(open+L*.6),tipy=cy+sa*(open+L*.6),bx=sh+ca*open,by=cy+sa*open,nx=-sa*2.6,ny=ca*2.6;
  A.P([[bx+nx,by+ny],[bx-nx,by-ny],[tipx,tipy]],C.k);A.P([[bx+nx*.8,by+ny*.8],[bx-nx*.8,by-ny*.8],[tipx-ca*.6,tipy-sa*.6]],C.p);A.P([[bx+nx*.8,by+ny*.8],[bx,by],[tipx-ca*.6,tipy-sa*.6]],C.p3,.7);
  const ex=bx+ca*1.6,ey=by+sa*1.6;A.E(ex,ey,1,.7,C.k);if(!A.dm&&!A.blink){const o=1+wG*.5;A.E(ex+A.look[0]*.2,ey,.8*o,.45*o,C.e);A.R(ex-.1,ey-.35,.2,.7,C.k);A.glow(ex,ey,1.4+wG*2.4,C.e,.7+wG*.5)}
  for(let k=0;k<3;k++)A.spike(bx+ca*(k*1.4+.6)-nx*.9,by+sa*(k*1.4+.6)-ny*.9,a-Math.PI/2,.9,.5,C.th)}
 {const R=1.6+bloom*3.4;A.C(sh,cy,R+.8,C.k);A.C(sh,cy,R,'#0a0214');for(let r=0;r<2;r++){const n=10+r*4,rr=R-.2-r*1.1;if(rr<.6)continue;for(let i=0;i<n;i++){const a=spin*(r?-2:2)+i*TAU/n;A.spike(sh+Math.cos(a)*rr,cy+Math.sin(a)*rr,a+Math.PI,Math.min(1.4,rr*.45),.6,r?C.th:C.w)}}
  for(let i=0;i<12;i++){const a=t*1.2+i*2.39,rr=(i/12)*R*.6;A.C(sh+Math.cos(a)*rr,cy+Math.sin(a)*rr,.2,i%3?'#ffffff':C.c,.8)}const cr=.6+bloom*.8+A.pul*.3;A.C(sh,cy,cr,C.g);A.C(sh,cy,cr*.5,'#ffffff');A.glow(sh,cy,R+3+bloom*6,C.c,.6+bloom+ch*.3)}
 for(let i=-3;i<=3;i++){const a=-Math.PI/2+i*.22,L=3+(3-Math.abs(i))*1.1+ch,bx=sh+Math.cos(a)*(g.hf-1),by=cy+Math.sin(a)*(g.hf-1);A.spike(bx,by,a,L,1.2,C.th);A.L(bx,by,bx+Math.cos(a)*L*.6,by+Math.sin(a)*L*.6,'#8a6a5a',.3);if(i===0){A.C(bx+Math.cos(a)*(L+.6),by+Math.sin(a)*(L+.6),.7,C.g);A.glow(bx+Math.cos(a)*(L+.6),by+Math.sin(a)*(L+.6),3,C.g,.9)}}
 for(let i=0;i<8;i++){const a=-t*.5+i*TAU/8,rr=g.hf+8+Math.sin(t+i)*1,X=sh+Math.cos(a)*rr,Y=cy+Math.sin(a)*rr*.55;A.P([[X,Y-1],[X+.7,Y],[X,Y+.8],[X-.6,Y]],i%2?C.p3:C.th,.85)}
 if(wW>0)for(let i=0;i<10;i++){const a=i*TAU/10+t,q=(t*2+i/10)%1,rr=(1-q)*16+2;A.L(sh+Math.cos(a)*rr,cy+Math.sin(a)*rr*.7,sh+Math.cos(a)*(rr+2),cy+Math.sin(a)*(rr+2)*.7,C.c,.3,wW*(q))}
 A.rise(10,-16,16,-1,30,.25,C.c,.4,5);A.rise(6,-4,4,cy+2,14,1,C.e,.45,6)}
MON.reg.b19=A=>m2Primal(A,false);MON.reg.b19m=A=>m2Primal(A,true);
MON.hand.b19=H=>{const wv=Math.sin(H.t*2)*1.6;H.chain('#07050a','#34143e',3.2,2.6);H.C(0,0,5,'#07050a');H.C(0,0,4.2,'#34143e');for(let i=0;i<4;i++){const a=Math.PI*.2+i*.55;H.R(Math.cos(a)*4.2-.7+wv*.1,Math.sin(a)*4.2-.7,1.4,1.4,'#6a2a7a');H.R(Math.cos(a)*6-.5,Math.sin(a)*6-.5,1,1.6,'#e8d8c8')}H.C(0,0,1.2,'#ff3a5d');H.glow(0,0,6,'#b83aff',.5)};
/* 크기 · 기운 */{const X2={b10:[[-14,-30,14,0],'#9dff5a'],b11:[[-15,-34,15,0],'#caff6b'],b12:[[-14,-28,14,0],'#ffd84a'],b13:[[-14,-26,14,0],'#ff3a3a'],b14:[[-16,-28,16,0],'#ff4a8a'],b15:[[-12,-30,12,0],'#ff2a3a'],b16:[[-14,-30,14,0],'#b86aff'],b17:[[-16,-30,16,0],'#6ae8ff'],b18:[[-12,-28,12,0],'#ff7a2a'],b19:[[-18,-38,18,0],'#ff2a5a'],b19m:[[-18,-38,18,0],'#3aff8a']};
 for(const k of Object.keys(X2)){const base=MON.reg[k];MON.reg[k]=A=>{A.bbox=X2[k][0];A.aura=X2[k][1];base(A)}}}
/* ---- 연결 ---- */
function drawBeast(c,B,x,y,t,o,u){const bi=BOSSES.indexOf(B);monDraw('b'+bi,c,B,x,y,t,o,u)}
function drawBeastHand(c,B,h,sx,sy,t,dorm,sc){const bi=BOSSES.indexOf(B);if(!monHandDraw('b'+bi,c,B,h,sx,sy,t,dorm,sc)){}}
{const _mu=typeof drawMutant==='function'?drawMutant:null;drawMutant=function(cc,x,y,now,bo,u){if(!monDraw('b19m',cc,BOSSES[MUT_BI],x,y,now,bo||{},u||U)&&_mu)_mu.apply(this,arguments)}}

