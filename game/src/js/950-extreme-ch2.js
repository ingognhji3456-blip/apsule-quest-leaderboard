/* ===== 챕터 2 익스트림 업그레이드 ===== */
/* b15 말벌 군주: 더 사실적인 말벌 — 크고 화려한 시맥 날개(무지갯빛 막), 털 난 흉부, 광택 키틴 배마디, 독 맺힌 침 */
EXU.b15={
 pre(A){const g=m1G(A.B),t=A.t,b=A.bob*1.2,cy=g.core+b-1,wW=A.win('waggleDance'),X=wW>0?Math.sin(t*14)*wW*1.4:0;
  for(const s of [-1,1])for(const f of [0,1]){const x0=X+s*1.6,y0=cy-3.2,L=f?10.5:14,flap=Math.sin(t*46+f*1.3)*.1,ang=-Math.PI/2+s*(.62+f*.62+flap);
   const pt=(a,l)=>[x0+Math.cos(ang+a*s)*l,y0+Math.sin(ang+a*s)*l];
   /* 날갯짓 잔상 */for(const ph of [-.2,.2])A.P([[x0,y0],pt(-.14+ph*s,L*.98),pt(.08+ph*s,L*1.02),pt(.3+ph*s,L*.66)],'#fff4c8',.1);
   /* 막: 외곽 → 안쪽 */const shape=[[x0,y0],pt(-.16,L*.55),pt(-.13,L*.95),pt(-.02,L*1.04),pt(.12,L*.98),pt(.26,L*.75),pt(.3,L*.45)];
   A.P(shape,'#2a1c08',.55);A.P(shape.map(p=>[x0+(p[0]-x0)*.94,y0+(p[1]-y0)*.94]),'#fff0b8',.32);
   /* 무지갯빛 필름 (시간에 따라 흐름) */const hues=['#7af0ff','#c89aff','#ff9ad8','#ffe08a','#9affc0'];for(let i=0;i<5;i++){const q=(i/5+t*.25)%1,a0=-.14+q*.4;A.P([pt(a0,L*.62),pt(a0,L*.97),pt(a0+.08,L*.99),pt(a0+.08,L*.64)],hues[i],.22)}
   /* 시맥(날개 맥) */A.L(x0,y0,...pt(-.12,L*.96),'#3a2408',.35,.85);A.L(...pt(-.1,L*.4),...pt(.24,L*.7),'#3a2408',.25,.7);A.L(...pt(0,L*.25),...pt(.02,L*1),'#3a2408',.25,.7);A.L(...pt(-.12,L*.7),...pt(.16,L*.88),'#3a2408',.22,.6);A.L(...pt(.1,L*.3),...pt(.28,L*.5),'#3a2408',.22,.6);
   /* 연문(날개 앞 끝 짙은 점) */A.P([pt(-.13,L*.78),pt(-.1,L*.9),pt(-.05,L*.88),pt(-.08,L*.76)],'#c87808',.85);
   /* 가장자리 하이라이트 */A.L(...pt(-.16,L*.55),...pt(-.13,L*.95),'#ffffff',.2,.55);
   /* 반짝임 */const sp=(t*1.3+f*.5+(s>0?.25:0))%1;if(sp<.3){const [px,py]=pt(-.1+sp*1.2,L*(.6+sp));A.spark(px,py,.9,'#ffffff',1-sp/.3)}}},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*1.2,cy=g.core+b-1,wW=A.win('waggleDance'),wD=A.win('diveStrike'),X=wW>0?Math.sin(t*14)*wW*1.4:0,dive=wD;
  /* 흉부 털 (가장자리 잔털) */for(let i=0;i<14;i++){const a=Math.PI+i*Math.PI/13,r=4.1+(i%2)*.3;A.L(X+Math.cos(a)*r*.95,cy-1+Math.sin(a)*r*.7,X+Math.cos(a)*(r+.7),cy-1+Math.sin(a)*(r+.6),'#d8a040',.3,.7)}
  /* 흉갑 광택 */A.P([[-2.8+X,cy-3.6],[-.6+X,cy-3.6],[-2.2+X,cy-1.4]],'#fff0c0',.35);
  /* 배마디: 광택 하이라이트 + 마디 경계 + 옆 털 */{const ax=X,ay=cy+3+dive*.4;for(let i=0;i<5;i++){const w=3-i*.42,yy=ay-1+i*1.4;A.E(ax-w*.25,yy-.35,w*.55,.18,'#ffffff',.45);A.L(ax-w,yy+.62,ax+w,yy+.62,'#000000',.18,.6);A.L(ax+w-.2,yy-.4,ax+w+.5,yy-.7,'#e0b060',.2,.5);A.L(ax-w+.2,yy-.4,ax-w-.5,yy-.7,'#e0b060',.2,.5)}
   const sa=Math.PI/2-dive*1.1,sx=ax+Math.cos(sa)*4,sy=ay+Math.sin(sa)*4+1,tl=5+dive*2;
   /* 독 방울 */const q=(t*.7)%1,tx=sx+Math.cos(sa)*tl,ty=sy+Math.sin(sa)*tl;A.C(tx,ty+q*1.6,.45+.2*Math.sin(q*Math.PI),'#b8ff4a',.9*(1-q*.6));A.R(tx-.15,ty+q*1.6-.3,.3,.3,'#ffffff',.8);A.glow(tx,ty,2,'#b8ff4a',.5)}
  /* 다리 관절 + 발톱 */for(const s of [-1,1])for(let i=0;i<2;i++){const kx=s*(3.6+i)+X,ky=cy+3.6+i*1.4,fx=s*(3+i*1.2)+X,fy=cy+6+i;A.C(kx,ky,.38,'#f0b020');A.L(fx,fy,fx+s*.6,fy+.5,'#0a0806',.3);A.L(fx,fy,fx-s*.3,fy+.6,'#0a0806',.3);for(let k=1;k<3;k++)A.L(kx+(fx-kx)*k/3,ky+(fy-ky)*k/3,kx+(fx-kx)*k/3+s*.5,ky+(fy-ky)*k/3-.2,'#3a2a18',.2,.7)}
  /* 겹눈 광택 + 큰턱 날 */{const hy=g.top+b+1,hx=X;if(!A.dm)for(const s of [-1,1]){A.E(hx+s*1.95,hy-.9,.45,.7,'#ffffff',.55);A.R(hx+s*1.2,hy+.6,.3,.3,'#ffc0c8',.6)}
   for(const s of [-1,1])A.L(hx+s*.9,hy+2.2,hx+s*1.8,hy+2.9,'#fff6d0',.25,.7)}}};
/* ===== 챕터 2 나머지 보스 (b10~b19) ===== */
{
const X2zig=(A,x0,y0,x1,y1,n,amp,seed,col,w,al)=>{let px=x0,py=y0;for(let i=1;i<=n;i++){const q=i/n,j=i<n?Math.sin(seed*7.3+i*2.1)*amp:0,nx=x0+(x1-x0)*q+j,ny=y0+(y1-y0)*q+j*.3;A.L(px,py,nx,ny,col,w,al);px=nx;py=ny}};
const X2flame=(A,x,y,ang,L,w,t,seed,c1,c2,al)=>{const fl=Math.sin(t*9+seed*3.1)*.25+Math.sin(t*14+seed)*.12,a=ang+fl*.4,ca=Math.cos(a),sa=Math.sin(a),nx=-Math.sin(ang)*w,ny=Math.cos(ang)*w,L2=L*(1+fl*.5);
 const ma=(ang+a)/2,mc=Math.cos(ma),ms=Math.sin(ma);A.P([[x+nx,y+ny],[x+mc*L2*.45+nx*.75,y+ms*L2*.45+ny*.75],[x+ca*L2,y+sa*L2],[x+mc*L2*.45-nx*.75,y+ms*L2*.45-ny*.75],[x-nx,y-ny]],c1,al*.6);A.P([[x+nx*.6,y+ny*.6],[x+mc*L2*.4+nx*.4,y+ms*L2*.4+ny*.4],[x+ca*L2*.78,y+sa*L2*.78],[x+mc*L2*.4-nx*.4,y+ms*L2*.4-ny*.4],[x-nx*.6,y-ny*.6]],'#ff8a3a',al*.8);A.P([[x+nx*.3,y+ny*.3],[x+mc*L2*.45,y+ms*L2*.45],[x-nx*.3,y-ny*.3]],c2,al)};
const X2ering=(A,x,y,rx,ry,col,w,al,n)=>{n=n||24;let px=x+rx,py=y;for(let i=1;i<=n;i++){const a=i/n*TAU,nx=x+Math.cos(a)*rx,ny=y+Math.sin(a)*ry;A.L(px,py,nx,ny,col,w,al);px=nx;py=ny}};
/* 천 리본: 중심선 점들 + 폭 → 다각형 */
const X2ribbon=(A,pts,w0,w1,col,al)=>{const L=[],R=[],n=pts.length;for(let i=0;i<n;i++){const p=pts[i],q=pts[Math.min(n-1,i+1)],o=pts[Math.max(0,i-1)],dx=q[0]-o[0],dy=q[1]-o[1],d=Math.hypot(dx,dy)||1,w=w0+(w1-w0)*i/(n-1);L.push([p[0]-dy/d*w,p[1]+dx/d*w]);R.push([p[0]+dy/d*w,p[1]-dx/d*w])}A.P(L.concat(R.reverse()),col,al)};

/* b10 뿌리아귀: 고목 — 깊은 나무껍질 결·옹이, 빛나는 수액 균열, 잎 돋은 가지 왕관, 늘어진 이끼, 땅으로 뻗는 발광 뿌리 */
EXU.b10={
 pre(A){const g=m1G(A.B),t=A.t,b=A.bob*.5,wV=A.win('vineWhip'),wF=A.win('fangLunge'),sh=A.shake(wF>.5?.3:0),top=g.top+b;
  /* 땅을 파고드는 굵은 뿌리 + 수액 맥 */for(const s of [-1,1])for(let r=0;r<2;r++){const x0=s*(g.hf-1.5-r*2)+sh,x1=s*(g.hf+3.5+r*3.2),y1=-.2;A.L(x0,-1.8,x1,y1,M2K,1.2-r*.2);A.L(x0,-1.8,x1,y1,'#4a3420',.7-r*.15);A.L(x0,-1.9,x1-s*.4,y1-.25,'#9dff5a',.18,.45+.35*Math.sin(t*2.6+r+s))}
  const br=[[-4.4,-1.1,6.4],[-2,-1.35,8.4],[.4,-1.55,9.4],[2.8,-1.8,7.6],[4.8,-2.05,5.6]];
  br.forEach(([x,a,L],i)=>{const a2=a+Math.sin(t*1.2+i)*.05-(wV>0?wV*.3*(x<0?1:-1):0),x0=x+sh,y0=top-.6;
   /* 곁가지 + 잎 */for(const f of [.45,.8]){const px=x0+Math.cos(a2)*L*f,py=y0+Math.sin(a2)*L*f,ta=a2+((i+(f>.6?1:0))%2?-1.05:1.05),tl=L*.5,tx=px+Math.cos(ta)*tl,ty=py+Math.sin(ta)*tl;A.L(px,py,tx,ty,M2K,.8);A.L(px,py,tx,ty,'#5a4228',.45);
    for(let k=0;k<4;k++){const q=.3+k*.23,lx=px+(tx-px)*q,ly=py+(ty-py)*q,la=ta+(k%2?1:-1)*(.9+k*.1)+Math.sin(t*2.2+i+k)*.15,c=Math.cos(la),s=Math.sin(la),ls=2.2+k*.25;A.P([[lx,ly],[lx+Math.cos(la-.4)*ls*.5,ly+Math.sin(la-.4)*ls*.5],[lx+c*ls,ly+s*ls],[lx+Math.cos(la+.4)*ls*.5,ly+Math.sin(la+.4)*ls*.5]],(k+i)%2?'#3e8a2a':'#5cb43c');A.L(lx,ly,lx+c*ls*.8,ly+s*ls*.8,'#c8ff8a',.15,.55)}
    A.C(tx,ty,.55,'#e8ffb0');A.C(tx,ty,.28,'#ffffff');A.glow(tx,ty,2,'#9dff5a',.7)}
   /* 늘어진 이끼 가닥 (끝에 반딧불) */const mx=x0+Math.cos(a2)*L*.62,my=y0+Math.sin(a2)*L*.62,hl=2.6+(i%3)*1.2,sw=Math.sin(t*1.6+i)*.5;A.L(mx,my,mx+sw*.5,my+hl*.5,'#4a7a2a',.35,.85);A.L(mx+sw*.5,my+hl*.5,mx+sw,my+hl,'#5a8a32',.3,.75);A.C(mx+sw,my+hl+.3,.32,'#c8ff8a',.6+.4*Math.sin(t*3+i));A.glow(mx+sw,my+hl+.3,1.4,'#9dff5a',.5)})},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*.5,wV=A.win('vineWhip'),wS=A.win('seedBloom'),wF=A.win('fangLunge'),sh=A.shake(wF>.5?.3:0),top=g.top+b,cy=g.core+b,ch=Math.max(wV,wS,wF,A.eyeC),open=Math.max(wF,A.open*.8,A.expose?1:0);
  /* 나무껍질 결 (아랫단 · 윗단) */for(let i=0;i<9;i++){const x=-g.hf+2+i*1.55+sh+Math.sin(i*2.7)*.3;A.L(x,-5.3+b,x+Math.sin(i*1.3)*.4,-7.6+b,'#1e140a',.3,.8);A.L(x+.35,-5.4+b,x+.35+Math.sin(i*1.3)*.4,-7.4+b,'#8a6a44',.15,.55)}
  for(let i=0;i<6;i++){const x=-4.5+i*1.8+sh;A.L(x,top+1.1,x+.3,top+2.2,'#1e140a',.25,.7)}
  /* 옹이 */for(const [kx,ky] of [[-5.2,-6.4],[4.6,-6]]){A.E(kx+sh,ky+b,.9,.6,'#1e140a');A.ring(kx+sh,ky+b,.9,.25,'#8a6a44',.6);A.C(kx+sh,ky+b,.25,'#9dff5a',.5+.5*Math.sin(t*2+kx))}
  /* 빛나는 수액 균열 (맥동이 아래→위로 흐름) */const pulse=q=>.35+.65*Math.max(0,Math.sin(t*3-q*5));[[-3.4,1],[-.4,2],[2.4,3],[5.2,4]].forEach(([x,sd])=>{const x0=x+sh;X2zig(A,x0,-5.1+b,x0+.3,-8.2+b,4,.35,sd,'#6ab83a',.35,.9);X2zig(A,x0,-5.1+b,x0+.3,-8.2+b,4,.35,sd,'#d8ffa0',.15,pulse(sd*.2));A.glow(x0,-6.6+b,1.6,'#9dff5a',.45*pulse(sd*.2))});
  /* 뿌리 다리 수액 맥 */for(const s of [-1,1])for(let r=0;r<3;r++){const x0=s*(2.4+r*1.6)+sh,y0=-5.6+b,wv=Math.sin(t*2+r+s)*.6,x1=x0+s*(2+r*1.4)+wv;A.L(x0,y0,x1,-1.4,'#9dff5a',.15,.35+.4*Math.max(0,Math.sin(t*3-r)))}
  /* 송곳니 광택 */{const my=cy+.4,mw=g.hf-2,mh=1.4+open*3.4;for(let i=0;i<7;i++){const x=-mw+.8+i*(mw*2-1.6)/6+sh;A.R(x-.25,my-mh+.3,.25,.6,'#ffffff',.7)}if(open>.1)A.rise(4,-mw*.6+sh,mw*.6+sh,my+mh*.4,4,1.2,'#c8ff8a',.35,2)}
  /* 눈: 옹이 속 불빛 강화 */{const ey=top+3.2;for(const s of [-1,1]){const ex=s*2.6+sh;if(!A.dm&&!A.blink){A.ring(ex,ey,1.5,.2,'#9dff5a',.5);A.glow(ex,ey,2.6+ch*2,'#9dff5a',.8)}}}
  /* 이끼 망토 끝 이슬 + 작은 버섯 */for(let i=0;i<9;i+=2){const x=-g.hf+1+i*1.8+sh,y=top+2.8+Math.sin(i*1.7+t)*.5;A.C(x+.2,y+.1,.22,'#e8ffb0',.8)}
  for(const [mx,s] of [[-6.2,1],[5.8,-1]]){const x=mx+sh,y=top+1.3;A.R(x-.12,y-.7,.24,.7,'#e8dcc0');A.E(x,y-.8,.6,.3,'#c8ff8a');A.glow(x,y-.8,1.2,'#9dff5a',.5)}
  A.rise(7,-g.hf-3,g.hf+3,-2,16,.35,'#c8ff8a',.38,4)}};

/* b11 포자여왕: 독버섯 여왕 — 갓 아래 주름살, 레이스 갓 테두리, 빛나는 반점 고리, 드리운 비단 베일 드레스, 가면의 발광 문양 */
EXU.b11={
 pre(A){const g=m1G(A.B),t=A.t,b=A.bob*1.2,cy=g.core+b,gy=g.top+b-.4,R=g.hf+2.6;
  /* 갓 가장자리에서 드리운 레이스 베일 (양옆으로 우아하게 흘러내림) */for(const s of [-1,1])for(let k=0;k<3;k++){const x0=s*(R-1-k*1.5),y0=gy+1,pts=[];for(let j=0;j<=7;j++){const q=j/7;pts.push([x0+s*(q*(1.6+k*.8))+Math.sin(t*1.6+q*3+k+s)*q*.9,y0+q*(13-k*2.4)])}
   X2ribbon(A,pts,.55,1.1-k*.15,k%2?'#7a4a9a':'#9a6ac0',.32);for(let j=1;j<pts.length;j++)A.L(pts[j-1][0],pts[j-1][1],pts[j][0],pts[j][1],'#f0d8ff',.12,.45);const e=pts[pts.length-1];A.C(e[0],e[1],.28,'#caff6b',.6+.4*Math.sin(t*3+k+s));A.glow(e[0],e[1],1.2,'#caff6b',.4)}},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*1.2,wW=A.win('sporeWaltz'),wR=A.win('mushroomRing'),ch=Math.max(wW,wR,A.eyeC),cy=g.core+b,spin=t*.6+wW*t*2,gy=g.top+b-.4,R=g.hf+2.6,H=4.6+wR*.8;
  /* 갓 아래 주름살 (가면 위는 비움) */A.E(0,gy+1.5,R-.4,.75,'#2a1236',.9);for(let i=-12;i<=12;i++){const x=i*(R-.8)/12;if(Math.abs(x)<3.6)continue;A.L(x*.82,gy+1,x,gy+2.1,i%2?'#d8b8ec':'#9a6ab8',.18,.75)}
  /* 레이스 테두리 */for(let i=-8;i<=8;i++){const x=i*(R+.2)/8;A.C(x,gy+1.1,.42,'#f0d8ff',.7);A.C(x,gy+1.3,.18,'#2a1236',.8)}
  /* 갓 광택: 위쪽 띠 + 반사광 */A.P([[-R+2.2,gy-H*.5],[-R*.3,gy-H+.9],[-R*.05,gy-H+1],[-R+3,gy-H*.38]],'#ffffff',.22);A.E(-R*.45,gy-H*.62,1.2,.35,'#ffffff',.45);A.L(-R+1.2,gy+.6,R-1.2,gy+.6,'#c890e0',.25,.5);
  /* 반점: 발광 테 + 심 */for(let i=0;i<9;i++){const a=spin+i*TAU/9,sx=Math.cos(a)*R*.72,sy=gy-H*.35+Math.sin(a)*H*.3;if(Math.sin(a)<-0.2)continue;const on=Math.min(1,.5+.5*Math.sin(t*3+i)+ch),r=.7+(i%3)*.25;A.ring(sx,sy,r+.45,.22,'#e8ffb0',on*.6);A.C(sx-.2,sy-.2,r*.35,'#ffffff',on*.8)}
  /* 왕관 버섯: 빛나는 갓 + 주름 */for(let i=-2;i<=2;i++){const x=i*2,h=1.6+(i===0?1.2:0)+wR*.8,yy=gy-H+.6-h,w=1+(i===0?.4:0);A.E(x-.3*w,yy-.25,w*.45,.18,'#ffffff',.6);A.L(x-w*.8,yy+.45,x+w*.8,yy+.45,'#caff6b',.15,.8);A.glow(x,yy,1.6,'#caff6b',.55)}
  /* 가면: 은빛 테 + 발광 눈물 문양 */{const fy=cy-.2;if(!A.dm){A.ring(0,fy-.2,3.5,.2,'#f0d8ff',.7);for(const s of [-1,1]){const ex=s*1.4;A.L(ex,fy+.6,ex+s*.3,fy+2.2,'#caff6b',.22,.85);A.C(ex+s*.35,fy+2.5,.25,'#caff6b',.9);A.L(s*.5,fy-2.6,s*2.2,fy-1.6,'#a45ac0',.18,.8)}A.C(0,fy-2.9,.35,'#caff6b',.9);A.glow(0,fy-2.9,1.6,'#caff6b',.6)}}
  /* 베일에 맺힌 이슬 반짝임 */for(let i=-6;i<=6;i+=3){const L=7+Math.sin(i*1.3)*1.4;A.C(i*1.25+Math.sin(t*1.6+i)*.4,cy-2+L*.8,.2,'#ffffff',.5)}
  A.rise(10,-R,R,cy+2,18,.3,'#caff6b',.4,3);A.rise(5,-R,R,gy,10,.5,'#f0d8ff',.3,8)}};

/* b12 늪지 아귀: 젖은 피부 광택, 아가미 틈, 발광 반점 줄, 투명한 유인등(필라멘트·물방울), 수면의 연잎과 반사광 */
EXU.b12={
 pre(A){const g=m1G(A.B),t=A.t,b=A.bob*.6,wL=A.win('lureHypno'),wH=A.win('lilyHop'),sq=wH*1.4,sh=A.shake(wH>.6?.25:0);
  /* 수면 발광 물결 */for(let i=0;i<3;i++){const q=(t*.35+i/3)%1,rx=g.hf+1+q*4.5;X2ering(A,0,-.6,rx,.9+q*.7,'#6ae8c8',.2,(1-q)*.45,28)}
  /* 연잎 + 발광 꽃 */for(const [x,s,r] of [[-(g.hf+6.6),1,2.3],[g.hf+6.4,-1,1.8]]){const y=-.5+Math.sin(t*1.2+x)*.1;A.E(x,y,r+.3,r*.36+.15,M2K);A.E(x,y,r,r*.36,'#3e8a4a');A.E(x-r*.3,y-r*.1,r*.4,r*.12,'#7ac88a',.6);A.P([[x,y],[x+s*r,y-r*.1],[x+s*r,y+r*.2]],'#16302a');A.L(x-r*.6,y-.1,x+r*.2,y-.1,'#5aa86a',.15,.7);
   if(r>2){A.P([[x-.6,y-.2],[x,y-1.4],[x+.6,y-.2]],'#f0c8e8');A.P([[x-.9,y-.1],[x-.6,y-1],[x-.1,y-.2]],'#e8a8d8');A.P([[x+.9,y-.1],[x+.6,y-1],[x+.1,y-.2]],'#e8a8d8');A.C(x,y-.4,.25,'#ffd84a');A.glow(x,y-.6,1.6,'#ffd84a',.5)}}
  /* 유인등 수면 반사 */{const bx=sh+1,by=g.top+b-.8+sq*.6,sw=Math.sin(t*1.8)*.5+wL*Math.sin(t*9)*.6,lx=bx+Math.sin(sw)*6.4*.6+2.4;A.E(lx,-.5,2.4,.35,'#ffd84a',.35);A.E(lx,-.5,1,.2,'#fff6c8',.5)}},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*.6,wH=A.win('lilyHop'),wT=A.win('bubbleTongue'),wL=A.win('lureHypno'),ch=Math.max(wH,wT,wL,A.eyeC),sq=wH*1.4,sh=A.shake(wH>.6?.25:0),cy=g.core+b+sq*.8,hy=g.top+b+2.4+sq*.6;
  /* 젖은 피부 반사광 */A.E(sh-3.4,cy-2.6,2.4,.35,'#ffffff',.28);A.E(sh-4.6,cy-1.8,1,.22,'#ffffff',.4);A.E(sh+4,cy-2.2,1.4,.25,'#c8ffe8',.22);for(const s2 of [-1,1])A.E(s2*(g.hf-.8)+sh-.8,-4.6+sq*.2,1.2,.3,'#ffffff',.3);
  /* 아가미 틈 (몸 옆, 맥동) */for(const s2 of [-1,1])for(let i=0;i<3;i++){const x=s2*(g.hf-.4-i*.85)+sh,y=cy+2+i*.25,on=.4+.6*Math.max(0,Math.sin(t*2.4-i*.8));A.L(x,y-1,x+s2*.3,y+1,M2K,.4);A.L(x+s2*.15,y-.8,x+s2*.4,y+.8,'#6ae8c8',.15,on)}
  /* 옆선 발광 반점 (물결처럼 순차 점등) */for(let i=0;i<11;i++){const q=i/10,a=Math.PI*(.12+q*.76),x=-Math.cos(a)*(g.hf-.4)+sh,y=cy+1.8+Math.sin(a)*1.6,on=.3+.7*Math.max(0,Math.sin(t*4-i*.7));A.C(x,y,.32,'#fff6c8',on);A.glow(x,y,1.1,'#ffd84a',on*.5)}
  /* 등 사마귀 광택 */for(let i=0;i<12;i+=2){const a=i*2.3,rr=(i%4)/4*(g.hf-1)+1.4,x=Math.cos(a)*rr+sh,y=cy+Math.sin(a)*rr*.5;A.R(x-.3,y-.35,.3,.3,'#c8ffe8',.6)}
  /* 눈: 젖은 반사 + 금빛 테 */for(const s2 of [-1,1]){const ex=s2*(g.hf-3.4)+sh,ey=hy-2.6;A.ring(ex,ey-.1,1.75,.2,'#e8e060',.45);if(!A.dm&&!A.blink)A.R(ex-.9,ey-.9,.4,.3,'#ffffff',.8)}
  /* 턱 물방울 */for(let i=0;i<3;i++){const q=(t*.6+i/3)%1,x=sh+(i-1)*4.4;A.C(x,hy+3.6+q*2.4,.24,'#8ae8c8',.8*(1-q))}
  /* 유인등: 투명 막 · 발광 필라멘트 · 실 촉수 */{const bx=sh+1,by=g.top+b-.8+sq*.6,sw=Math.sin(t*1.8)*.5+wL*Math.sin(t*9)*.6,L=6.4,lx=bx+Math.sin(sw)*L*.6+2.4,ly=by-L,lr=1.3+wL*.7+A.pul*.3;
   A.ring(lx,ly,lr+1.3,.3,'#fff6c8',.35);A.C(lx,ly,lr+1.1,'#ffe890',.14);for(let k=0;k<3;k++){const a=t*1.6+k*TAU/3;A.L(lx,ly,lx+Math.cos(a)*lr*.7,ly+Math.sin(a)*lr*.7,'#ffffff',.15,.8)}A.C(lx,ly,.35,'#ffffff');
   for(let k=0;k<3;k++){const ox=(k-1)*.7,ln=1.6+k%2*.8;A.L(lx+ox,ly+lr,lx+ox+Math.sin(t*2+k)*.4,ly+lr+ln,'#e8e060',.15,.7);A.C(lx+ox+Math.sin(t*2+k)*.4,ly+lr+ln,.18,'#ffd84a')}
   A.spark(lx-lr*.6,ly-lr*.6,.5,'#ffffff',.6+.4*Math.sin(t*5));A.glow(lx,ly,3,'#fff6c8',.6)}
  A.rise(6,-g.hf-4,g.hf+4,-1,8,.4,'#8ae8c8',.4,6)}};

/* b13 백골 사냥개: 윤이 나는 뼈와 금, 뿔 마디, 눈구멍에서 흘러나오는 망령불, 등뼈를 따라 타오르는 혼불 갈기 */
EXU.b13={
 pre(A){const g=m1G(A.B),t=A.t,b=A.bob*.5,wF=A.win('fangLunge'),wH=A.win('boneHowl'),wS=A.win('skullRoll'),crouch=wF*1.4,sh=A.shake(wH>.3?.3:0),dir=A.look[0]<0?-1:1,cy=g.core+b+crouch;
  /* 등뼈 위 혼불 갈기 */for(let i=0;i<9;i++){const x=-g.hf+1.6+i*(g.hf*2-3.2)/8+sh,y=cy-g.bh/2+.8,L=2.8+Math.sin(i/8*Math.PI)*2.4+wH*2;X2flame(A,x,y,-Math.PI/2-dir*.35,L,.95,t,i,'#ff3a3a','#ffb070',.55)}
  /* 꼬리 끝 혼불 */{let px=-dir*(g.hf-.4)+sh,py=cy-1;for(let k=0;k<6;k++){px-=dir;py+=-.6-wS*.6+Math.sin(t*5+k)*.4}X2flame(A,px,py,-Math.PI/2-dir*.5,3.4,.9,t,11,'#ff3a3a','#ffd0a0',.6)}},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*.5,wB=A.win('boneBoomerang'),wS=A.win('skullRoll'),wF=A.win('fangLunge'),wH=A.win('boneHowl'),ch=Math.max(wB,wS,wF,wH,A.eyeC),crouch=wF*1.4,sh=A.shake(wH>.3?.3:0),dir=A.look[0]<0?-1:1,cy=g.core+b+crouch;
  /* 털 결 */for(let i=0;i<10;i++){const x=-g.hf+2+i*1.4+sh;A.L(x,cy-1.6,x-dir*.5,cy+1.4,'#4a4038',.2,.6)}
  /* 갈비: 광택 + 금빛 이음 */for(let i=0;i<5;i++){const x=-3.2+i*1.6+sh;A.L(x-.15,cy-2.2,x-.45,cy+1.6,'#ffffff',.18,.6);A.C(x,cy-2.6,.3,'#e8c870')}A.L(-4+sh,cy-2.8,4+sh,cy-2.8,'#fff8e8',.2,.6);
  /* 등뼈 가시 광택 (한쪽 날) */for(let i=0;i<7;i++){const x=-g.hf+2+i*(g.hf*2-4)/6+sh,L=1.8+Math.sin(i/6*Math.PI)*1.6+wH*1.6,y=cy-g.bh/2+.4,a=-Math.PI/2-.2;A.L(x-.25,y,x+Math.cos(a)*L*.8-.15,y+Math.sin(a)*L*.8,'#ffffff',.18,.55);A.R(x-.5,y-.15,1,.3,'#e8c870',.8)}
  /* 다리 뼈 관절 */for(const [s,f] of [[-1,0],[-1,1],[1,0],[1,1]]){const fx=s*(3.4+f*3.6)+sh;A.C(fx+s*.6,-2+crouch*.3,.4,'#d8d0b8');A.C(fx+s*.5,-2.1+crouch*.3,.15,'#ffffff')}
  /* 두개골: 광택 · 금 간 자국 · 뿔 마디 · 망령불 눈 */{const hx=dir*(g.hf-1.2)+sh,hy=g.top+b+2.4+crouch*.8,jaw=wF*1.8+wH*1.4;
   A.E(hx-dir*.6,hy-1.4,1.6,.55,'#ffffff',.45);A.E(hx+dir*3,hy+.35,1.2,.22,'#ffffff',.35);
   X2zig(A,hx-dir*1.6,hy-2.2,hx-dir*.6,hy+.4,3,.35,2,'#5a4e3a',.15,.9);X2zig(A,hx+dir*.2,hy-2.4,hx+dir*1.4,hy-1.4,2,.25,5,'#5a4e3a',.15,.8);
   for(const s of [-1,1]){const a=-Math.PI/2+s*.7-dir*.2,x0=hx+s*1.4,y0=hy-1.8,ca=Math.cos(a),sa=Math.sin(a);for(let k=1;k<4;k++){const q=k*.22,w=1.3*(1-q)*.5;A.L(x0+ca*3.6*q-sa*w,y0+sa*3.6*q+ca*w,x0+ca*3.6*q+sa*w,y0+sa*3.6*q-ca*w,'#6a5e48',.18,.9)}A.L(x0,y0,x0+ca*3.2,y0+sa*3.2,'#fff8e8',.15,.6)}
   for(let i=0;i<4;i++)A.R(hx+dir*(2+i*.8)-.1,hy+1.6,.2,.4,'#ffffff',.9);
   if(!A.dm&&!A.blink){const ex=hx+dir*.8,ey=hy-.2;const ba=dir>0?Math.PI+.42:-.42;for(let k=0;k<2;k++)X2flame(A,ex-dir*.3,ey-.1,ba-dir*k*.25,4.2-k*1.2,.62-k*.15,t,k+3,'#ff3a3a','#fff0d0',.9);A.C(ex,ey,.3,'#ffffff');A.glow(ex,ey,3+ch*2,'#ff3a3a',.9)}}
  A.rise(6,-g.hf,g.hf,cy-g.bh/2,10,.8,'#ff6a4a',.35,7)}};

/* b14 실크 여제: 이슬 맺힌 정교한 거미줄, 흐르는 비단 광택, 금 관절 다리, 보석 눈, 모래시계 금세공 */
EXU.b14={
 pre(A){const g=m1G(A.B),t=A.t,b=A.bob*.6,wP=A.win('webPluck'),cy=g.core+b,hy=cy-2,R=g.hf+5;
  /* 보조 방사선 + 촘촘한 나선 */for(let i=0;i<8;i++){const a=Math.PI+(i+.5)*Math.PI/8;A.L(0,hy,Math.cos(a)*R*.98,hy+Math.sin(a)*R*.98,'#e8d8f0',.12,.35)}
  for(let r=1;r<=6;r++){const rr=R*(r/6)*.97+.4;let px=null;for(let i=0;i<=12;i++){const a=Math.PI+i*Math.PI/12,x=Math.cos(a)*rr,y=hy+Math.sin(a)*rr*(1-.02*Math.sin(i*1.7));if(px)A.L(px[0],px[1],x,y,'#f4ecff',.1,.3);px=[x,y]}}
  /* 외곽 은빛 테 */for(let i=0;i<8;i++){const a0=Math.PI+i*Math.PI/8,a1=a0+Math.PI/8;A.L(Math.cos(a0)*(R+.4),hy+Math.sin(a0)*(R+.4),Math.cos(a1)*(R+.4),hy+Math.sin(a1)*(R+.4),'#fff0ff',.25,.6)}
  /* 이슬 방울 (교차점) + 흐르는 무지갯빛 */for(let r=1;r<=4;r++)for(let i=0;i<=8;i++){if((i+r)%2)continue;const a=Math.PI+i*Math.PI/8,x=Math.cos(a)*R*r/4,y=hy+Math.sin(a)*R*r/4,tw=.5+.5*Math.sin(t*2.5+i*1.3+r*2);A.C(x,y+.15,.3,'#c8e8ff',.75);A.R(x-.15,y-.05,.15,.15,'#ffffff',tw)}
  {const q=(t*.5)%1,a=Math.PI+q*Math.PI;for(let r=2;r<=4;r++)A.spark(Math.cos(a)*R*r/4,hy+Math.sin(a)*R*r/4,.6,['#ffb0e0','#b0e0ff','#fff0a0'][r-2],.9)}
  if(wP>0)A.glow(0,hy-R*.4,R*.6,'#ffd0f0',wP*.3)},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*.6,wP=A.win('webPluck'),wD=A.win('spiderDrop'),ch=Math.max(wP,wD,A.eyeC),cy=g.core+b,rise=wD*1.6;
  /* 다리: 금 관절 + 가는 털 + 광택 */for(const s of [-1,1])for(let i=0;i<4;i++){const hx=s*(1.8+i*.8),hy=cy+1-rise,kx=s*(5.4+i*1.8),ky=cy-4-i*.6+Math.sin(t*2+i)*.3-rise,fx=s*(6.6+i*2.2);A.L(hx,hy-.2,kx,ky-.2,'#c890d8',.15,.6);A.C(kx,ky,.42,'#ffd166');A.R(kx-.25,ky-.3,.2,.2,'#ffffff');const mx=(kx+fx)/2,my=(ky)/2;A.R(mx-.3,my-.1,.6,.3,'#ffd166',.9);for(let k=1;k<3;k++){const q=k/3,x=kx+(fx-kx)*q,y=ky+(0-ky)*q;A.L(x,y,x+s*.6,y-.3,'#e8d8f0',.12,.6)}A.R(fx-.15,-.5,.3,.5,'#ffd166')}
  /* 배: 벨벳 광택 + 금세공 모래시계 테 */{const by=cy+1.4-rise;A.E(-1.8,by-1.6,2.6,.7,'#c890d8',.3);A.E(-2.4,by-1.9,1,.3,'#ffffff',.4);const hg=[[-1.3,by-1.2],[1.3,by-1.2],[0,by+.2],[1.3,by+1.6],[-1.3,by+1.6],[0,by+.2]];for(let i=0;i<6;i++){const p=hg[i],q=hg[(i+1)%6];A.L(p[0],p[1],q[0],q[1],'#ffd166',.18,.9)}A.C(0,by+.2,.3,'#ffffff',.6+.4*Math.sin(t*3));for(const s of [-1,1])for(let k=0;k<3;k++)A.C(s*(2.4+k*1.3),by+.2+Math.sin(k+.5)*1.4-1,.22,'#ffd166',.8)}
  /* 비단 망토: 흐르는 광택 + 진주 테 */for(let i=-4;i<=4;i++){const x=i*1.4,q=(t*.6+i*.11)%1,y0=cy-2-rise;A.L(x-.3+Math.sin(t*1.4+i)*.2*q,y0+.6+q*2.4,x+.1+Math.sin(t*1.4+i)*.4*q,y0+1.4+q*2.4,'#ffffff',.18,.55*(1-q))}
  for(let i=-5;i<=5;i++)A.C(i*1.25,cy-2-rise,.28,i%2?'#fff4ff':'#ffd166',.95);
  /* 머리: 보석 눈 + 왕관 보석 + 금테 */{const hy=g.top+b-.4-rise;if(!A.dm){[[-1.2,-.6,.55],[1.2,-.6,.55],[-.5,-1.1,.4],[.5,-1.1,.4]].forEach(([ex,ey,r])=>{A.ring(ex+A.look[0]*.15,hy+ey,r+.18,.15,'#ffd166',.7);A.R(ex+r*.1,hy+ey+r*.1,r*.3,r*.3,'#ff9ac0',.8)})}
   A.L(-2.6,hy-1.7,2.6,-1.7+hy,'#ffd166',.3,.9);for(let i=-2;i<=2;i++){const L=1.6+(i===0?1:0),a=-Math.PI/2+i*.15,x=i*.9+Math.cos(a)*L,y=hy-1.8+Math.sin(a)*L;A.C(x,y,.28,i%2?'#ff4a8a':'#c8a0ff');A.spark(x,y,.4,'#ffffff',.5+.5*Math.sin(t*4+i))}
   for(const s of [-1,1])A.R(s*.6-.08,hy+1.6,.16,.6,'#ffffff',.8)}
  /* 은실 가닥 (다리에서 늘어짐) */for(const s of [-1,1]){const kx=s*(5.4+3*1.8),ky=cy-4-3*.6-rise;A.L(kx,ky,kx+s*.4+Math.sin(t+s)*.3,ky+5,'#f4ecff',.1,.5)}}};

/* b16 수정 기생체: 면 깎인 자수정(능선·내부 굴절·반사광), 등껍질 정동 결정층, 뒤쪽 보조 결정과 프리즘 빛줄기 */
EXU.b16={
 pre(A){const g=m1G(A.B),t=A.t,b=A.bob*.5,wP=A.win('prismWall'),wF=A.win('facetBeam'),ch=Math.max(wP,wF,A.eyeC),cy=g.core+b,sx=-1,sy=cy-1,gr=1+wP*.5;
  /* 결정 끝에서 뻗는 분광 빛줄기 (끝으로 갈수록 옅어짐) */const cols=['#ff7ad8','#7de0ff','#b86aff','#9affc8'];[[-2.6,-1.5,7.4],[.2,-1.62,8.6],[2.8,-1.8,6.8],[-5,-1.3,5]].forEach(([x,a,L],i)=>{const x0=sx+x,y0=sy-g.bh/2+1.4+Math.abs(x)*.2,ca=Math.cos(a),sa=Math.sin(a),tx=x0+ca*L*gr*.94,ty=y0+sa*L*gr*.94,pu=.5+.5*Math.sin(t*1.8+i*1.7);
   for(let k=0;k<3;k++){const r0=k*2.4,r1=r0+2.4,w0=.25+r0*.12,w1=.25+r1*.12,nx=-sa,ny=ca;A.beam([[tx+ca*r0+nx*w0,ty+sa*r0+ny*w0],[tx+ca*r1+nx*w1,ty+sa*r1+ny*w1],[tx+ca*r1-nx*w1,ty+sa*r1-ny*w1],[tx+ca*r0-nx*w0,ty+sa*r0-ny*w0]],cols[i],(.32-k*.1)*(pu*.7+.3+ch*.3))}});
  /* 뒤쪽 보조 결정 */[[-6.6,-2.45,5.4],[-4,-2.05,7.6],[-.6,-1.62,10.6],[3,-1.15,7.8],[5.6,-.8,5.2]].forEach(([x,a,L],i)=>{const x0=sx+x,y0=sy-g.bh/2+2+Math.abs(x)*.25,ca=Math.cos(a),sa=Math.sin(a),w=1.7,Lg=L*gr,nx=-sa,ny=ca;A.P([[x0+nx*w*.6,y0+ny*w*.6],[x0-nx*w*.6,y0-ny*w*.6],[x0+ca*Lg,y0+sa*Lg]],M2K);A.P([[x0+nx*w*.45,y0+ny*w*.45],[x0,y0],[x0+ca*Lg*.94,y0+sa*Lg*.94]],i%2?'#5a8ad8':'#8a4ad0');A.P([[x0,y0],[x0-nx*w*.45,y0-ny*w*.45],[x0+ca*Lg*.94,y0+sa*Lg*.94]],i%2?'#9ae0ff':'#c890ff');A.L(x0,y0,x0+ca*Lg*.9,y0+sa*Lg*.9,'#ffffff',.15,.5);A.glow(x0+ca*Lg*.7,y0+sa*Lg*.7,2,i%2?'#7de0ff':'#b86aff',.5+ch*.4)})},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*.5,wP=A.win('prismWall'),wF=A.win('facetBeam'),ch=Math.max(wP,wF,A.eyeC),cy=g.core+b,sx=-1,sy=cy-1,R=g.hf-.4,gr=1+wP*.5;
  /* 등껍질: 광물 층리 + 작은 정동 결정 */for(let k=0;k<3;k++){const rr=R-.6-k*1.1;let px=null;for(let i=0;i<=8;i++){const a=Math.PI*.95+i*Math.PI*.9/8,x=sx+Math.cos(a)*rr,y=sy+Math.sin(a)*(g.bh/2+.4-k*1.1)*.95;if(px)A.L(px[0],px[1],x,y,k%2?'#4a3a58':'#5e4a6e',.18,.8);px=[x,y]}}
  for(const [dx,dy] of [[-4.6,1.6],[-3.4,3],[2.6,2.8],[-5.4,-.4]]){const x=sx+dx,y=sy+dy;for(let k=-1;k<=1;k++)A.P([[x+k*.5-.25,y],[x+k*.5+.25,y],[x+k*.6,y-.9-(k===0?.4:0)]],k?'#b86aff':'#e0b8ff')}
  /* 정동 중심 발광 */A.C(sx,sy+.4,1.1,'#e0b8ff',.4+ch*.3);A.C(sx,sy+.4,.45,'#ffffff',.8);
  /* 주 자수정: 능선 하이라이트 · 내부 굴절선 · 끝 반짝임 */[[-5,-1.3,5],[-2.6,-1.5,7.4],[.2,-1.62,8.6],[2.8,-1.8,6.8],[4.8,-2,4.8],[-6.4,-1.1,3.4]].forEach(([x,a,L],i)=>{const x0=sx+x,y0=sy-g.bh/2+1.4+Math.abs(x)*.2,ca=Math.cos(a),sa=Math.sin(a),Lg=L*gr*.94,tx=x0+ca*Lg,ty=y0+sa*Lg,nx=-sa,ny=ca;
   A.L(x0,y0,tx,ty,'#ffffff',.2,.75);A.L(x0+nx*.55,y0+ny*.55,x0+ca*Lg*.7+nx*.12,y0+sa*Lg*.7+ny*.12,'#5a1e9a',.15,.7);
   const q1=.25+((i*.37)%.3),q2=q1+.25;A.L(x0+ca*Lg*q1-nx*.4,y0+sa*Lg*q1-ny*.4,x0+ca*Lg*q2+nx*.35,y0+sa*Lg*q2+ny*.35,'#7de0ff',.15,.75);A.L(x0+ca*Lg*(q2+.05)+nx*.3,y0+sa*Lg*(q2+.05)+ny*.3,x0+ca*Lg*(q2+.25)-nx*.2,y0+sa*Lg*(q2+.25)-ny*.2,'#ff9ae8',.15,.65);
   A.L(x0-.9,y0,x0+.9,y0,'#2a0e40',.3,.9);
   const tw=(t*.8+i*.23)%1;if(tw<.35){A.spark(x0+ca*Lg*(.3+tw*1.8),y0+sa*Lg*(.3+tw*1.8),.7,'#ffffff',1-tw/.35)}A.C(tx,ty,.3,'#ffffff',.85);A.glow(tx,ty,1.8,'#e0b8ff',.7)});
  /* 다리 키틴 광택 */for(const s of [-1,1])for(let i=0;i<3;i++){const hx=s*(2+i*1.6),kx=s*(4.4+i*2),ky=-4.4+Math.sin(t*4+i*1.3+s)*.4;A.L(hx,-3.8+b,kx,ky-.2,'#9a6ac8',.15,.7);A.C(kx,ky,.3,'#e0b8ff')}
  /* 얼굴판 + 눈자루 보석 반사 */{const fx=g.hf-2.6,fy=cy+1.6;A.E(fx-.8,fy-1.2,1.2,.35,'#c8a0e8',.45);for(const s of [0,1]){const ex=fx-1+s*2.2,a=-Math.PI/2+(s?.3:-.3)+Math.sin(t*2+s)*.15*(1-wF),L=3+wF*1.2,tx=ex+Math.cos(a)*L,ty=fy-1.6+Math.sin(a)*L;A.ring(tx,ty,1.05,.2,'#e0b8ff',.8);if(!A.dm&&!A.blink)A.R(tx-.45,ty-.5,.3,.3,'#ffffff')}}
  A.rise(6,-g.hf-1,g.hf,cy-g.bh/2,12,.5,'#e0b8ff',.4,5)}};

/* b17 심연 아귀왕: 거대한 반투명 발광 지느러미(빛나는 지느러미살·테두리 발광점), 측선 발광기, 아가미, 왕관 초롱 필라멘트, 바다눈 */
EXU.b17={
 pre(A){const g=m1G(A.B),t=A.t,b=A.bob*1.2,cy=g.core+b;
  for(const s2 of [-1,1]){const fx=s2*(g.hf-1.4),wv=Math.sin(t*2+s2)*.5,wv2=Math.sin(t*2.4+s2+1)*.7;const pts=[[fx,cy-3.4],[fx+s2*7,cy-9.6+wv],[fx+s2*11.6,cy-8.4+wv2],[fx+s2*9.4,cy-4.6+wv],[fx+s2*12.2,cy-1.8+wv2],[fx+s2*9,cy+.8+wv],[fx+s2*10.4,cy+3.6+wv2],[fx,cy+2.4]];
   A.P(pts,'#0a1426',.85);A.P(pts.map(p=>[fx+(p[0]-fx)*.92,cy+(p[1]-cy)*.92-.1]),'#1e5a8a',.45);A.beam(pts.map(p=>[fx+(p[0]-fx)*.8,cy+(p[1]-cy)*.8]),'#2a9ad8',.16+.08*Math.sin(t*2+s2));
   /* 막의 무지갯빛 */for(let i=0;i<3;i++){const q=(t*.2+i/3)%1,y=cy-7+q*9;A.L(fx+s2*2,y,fx+s2*10*(1-Math.abs(q-.4)*.6),y-3+q*2,'#9ae8ff',.5,.12)}
   /* 지느러미살 */for(let i=0;i<6;i++){const p=pts[1+Math.min(5,i)],q=.95;A.L(fx,cy-2+i*.7,fx+(p[0]-fx)*q,cy+(p[1]-cy)*q,'#6ae8ff',.18,.55)}
   /* 테두리 발광점 */for(let i=1;i<7;i++){const p=pts[i],on=.4+.6*Math.max(0,Math.sin(t*3-i*.9));A.C(p[0],p[1],.38,'#c8f8ff',on);A.glow(p[0],p[1],1.4,'#6ae8ff',on*.6)}
   /* 흐르는 실 지느러미 */for(let k=0;k<2;k++){const p=pts[2+k*2];let px=p[0],py=p[1];for(let j=0;j<5;j++){const nx=px+s2*.8,ny=py+.9+Math.sin(t*2.4+j*.8+k)*.5;A.L(px,py,nx,ny,'#6ae8ff',.15,.5-j*.08);px=nx;py=ny}}}},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*1.2,wB=A.win('bubbleStream'),wI=A.win('inkCloud'),wF=A.win('fangLunge'),ch=Math.max(wB,wI,wF,A.eyeC),cy=g.core+b,jaw=Math.max(wF,wB*.6,A.open*.6,A.expose?1:0);
  /* 피부 광택 */A.E(-3.4,cy-4.2,3,.45,'#9ad8ff',.22);A.E(-4.4,cy-3.7,1.2,.25,'#ffffff',.35);
  /* 측선 발광기 (물결 점등) */for(let i=0;i<13;i++){const q=i/12,a=Math.PI*(1.08+q*.84),x=Math.cos(a)*(g.hf-.8),y=cy-.8+Math.sin(a)*(g.bh/2-.6)*.85,on=.25+.75*Math.max(0,Math.sin(t*4-i*.6));A.C(x,y,.28,'#e8faff',on);A.glow(x,y,1,'#6ae8ff',on*.5)}
  /* 아가미 (눈 바깥쪽) */for(const s2 of [-1,1])for(let i=0;i<3;i++){const x=s2*(g.hf-1.4-i*.7),y=cy-1.4+i*.15,on=.4+.6*Math.max(0,Math.sin(t*2.2-i));A.L(x,y-1.1,x-s2*.35,y+1.1,M2K,.4);A.L(x-s2*.1,y-.9,x-s2*.4,y+.9,'#ff8ab0',.15,on*.8)}
  /* 눈: 발광 홍채 테 */for(const s2 of [-1,1]){const ex=s2*(g.hf-3.2),ey=cy-2.8;if(!A.dm&&!A.blink){A.ring(ex,ey,1.15,.2,'#6ae8ff',.85);A.R(ex-.55,ey-.6,.3,.3,'#ffffff')}}
  /* 이빨 끝 반사 */{const my=cy+1.2,mw=g.hf-1,op=jaw*3.6;for(let i=0;i<11;i+=2){const x=-mw+.8+i*(mw*2-1.6)/10;A.R(x-.2,my-.1-op*.5,.2,.5,'#ffffff',.85)}}
  /* 왕관 초롱: 발광 필라멘트 + 회전 반짝임 + 맥동 고리 */{const bx=0,by=g.top+b-.6,sw=Math.sin(t*1.4)*.4,lx=bx+Math.sin(sw)*6+2.6,ly=by-6,lr=1.5+A.pul*.3,on=wI>0?(Math.floor(t*12)%3?.2:1):1;
   A.ring(lx,ly,lr+.35,.2,'#e8faff',.7*on);for(let k=0;k<5;k++){const a=-Math.PI/2+(k-2)*.45+Math.sin(t*2+k)*.1,L=1.8+(k%2)*.8;A.L(lx+Math.cos(a)*lr,ly+Math.sin(a)*lr,lx+Math.cos(a)*(lr+L),ly+Math.sin(a)*(lr+L),'#6ae8ff',.15,.8*on);A.C(lx+Math.cos(a)*(lr+L),ly+Math.sin(a)*(lr+L),.25,'#e8faff',on)}
   const q=(t*.9)%1;A.ring(lx,ly,lr+.6+q*3,.18,'#6ae8ff',(1-q)*.5*on);A.spark(lx+Math.cos(t*3)*lr*.6,ly+Math.sin(t*3)*lr*.6,.5,'#ffffff',.9*on)}
  /* 바다눈 */for(let i=0;i<10;i++){const q=(t*.12+i/10)%1,x=((i*53)%30)-15+Math.sin(t+i)*.6,y=-30+q*30;A.spark(x,y,.35,'#c8e8ff',Math.sin(q*Math.PI)*.5)}}};

/* b18 재의 유령: 뒤로 흩날리는 재의 베일, 타들어가는 망토 끝자락(잿불 테두리), 망토의 불씨 균열, 두건 속 불빛, 흩날리는 불티 */
EXU.b18={
 pre(A){const g=m1G(A.B),t=A.t,b=A.bob*1.4,wP=A.win('phantomDash'),cy=g.core+b,lean=wP*1.2,fade=wP>.2?.45+.55*Math.abs(Math.sin(t*26)):1,top=g.top+b;
  /* 더 길고 너덜한 망토 자락 (뒤로 길게 끌림, 끝은 타들어감) */for(let i=-9;i<=9;i++){const x=i*1.25+lean,sw=Math.sin(t*1.8+i*.9),L=8.2+Math.sin(i*2.3)*2.2+sw*.8,x1=x*1.12+sw*1.1-lean*1.2,y1=cy-1+L,pts=[[x,cy-1],[(x+x1)/2+sw*.4,cy-1+L*.5],[x1,y1]];
   X2ribbon(A,pts,.95,.15,i%2?'#1e1e26':'#2c2c36',.85*fade);A.C(x1,y1-.2,.22,'#ff7a2a',(.5+.5*Math.sin(t*6+i))*fade)}
  /* 뒤의 잿빛 연기 */for(let i=0;i<5;i++){const q=(t*.25+i/5)%1;A.C(Math.sin(i*2.1+t*.5)*4+lean,top+2-q*8,1.8+q*2.2,'#2a2a30',(1-q)*.35*fade)}},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*1.4,wL=A.win('lanternDance'),wA=A.win('ashBloom'),wP=A.win('phantomDash'),ch=Math.max(wL,wA,wP,A.eyeC),cy=g.core+b,fade=wP>.2?.45+.55*Math.abs(Math.sin(t*26)):1,lean=wP*1.2,top=g.top+b;
  /* 망토 끝자락: 타들어가는 잿불 테두리 */for(let i=-8;i<=8;i++){const x=i*1.15+lean,L=5.4+Math.sin(i*1.9)*1.8+Math.sin(t*2.4+i)*.9,tx=x+Math.sin(t*2+i)*.9-lean*.6,ty=cy-1+L,fl=.5+.5*Math.sin(t*7+i*1.9);A.L(x+(tx-x)*.72,cy-1+L*.72,tx,ty,'#ff7a2a',.3,(.5+fl*.4)*fade);A.C(tx,ty,.3,'#ffd166',(.6+fl*.4)*fade);if(i%3===0)A.glow(tx,ty,1.4,'#ff7a2a',.5*fl*fade)}
  /* 망토 불씨 균열 (맥동) */const pu=.45+.55*Math.max(0,Math.sin(t*2.6));[[-4.4,1],[-1.8,2],[1.4,3],[4,4]].forEach(([x,s])=>{X2zig(A,x+lean,cy+.4,x+lean+.4,top+4.4,4,.4,s,'#ff7a2a',.18,pu*.85*fade)});
  for(const s2 of [-1,1])X2zig(A,s2*(g.hf+2.6)+lean,top+5.4,s2*(g.hf+.6)+lean,cy+2.8,3,.3,s2+5,'#ff9a4a',.15,.6*fade);
  /* 두건 테두리 불씨 + 속 불빛 */{const hy=top+1.6,hx=lean*1.4;A.E(hx,hy+1.2,2.2,1.4,'#ff5a1a',.18*fade);for(let i=0;i<7;i++){const a=Math.PI*(.05+i*.15),x=hx+Math.cos(a)*3.1,y=hy+.6-Math.sin(a)*2.9;A.C(x,y,.18,'#ff9a4a',(.4+.6*Math.max(0,Math.sin(t*5+i)))*fade)}
   for(const s2 of [-1,1])A.L(hx+s2*2.6,hy-4,hx+s2*4,hy-6.2,'#ff7a2a',.12,.5*fade);if(!A.dm&&!A.blink)for(const s2 of [-1,1])A.glow(hx+s2*1.2,hy+.2,2.2+ch,'#ff7a2a',.8)}
  /* 쇠사슬 광택 */for(let i=0;i<9;i+=2){const q=i/8,x=-g.hf+2+q*(g.hf*2-4)+lean,y=cy-3+q*2.4+Math.sin(q*6)*.4;A.R(x-.35,y-.35,.3,.2,'#c8c8d0',.8*fade)}
  /* 등불: 금속 테 + 불꽃 일렁임 */const n=4;for(let i=0;i<n;i++){const a=t*(.9+wL*2.6)+i*TAU/n,rr=g.hf+4.4,Xp=Math.cos(a)*rr,Y=cy-2+Math.sin(a)*rr*.45,fl=Math.sin(t*11+i*2)*.25;A.R(Xp-1.1,Y-1,.25,2.4,'#2a2a32');A.R(Xp+.85,Y-1,.25,2.4,'#2a2a32');A.P([[Xp-.4,Y+1],[Xp+fl,Y-.9],[Xp+.4,Y+1]],'#ffd166');A.R(Xp-.1,Y+.2,.2,.6,'#ffffff');A.R(Xp-.75,Y-.7,.2,.9,'#ffffff',.5)}
  /* 불티 */for(let i=0;i<10;i++){const q=(t*.5+i/10)%1,x=Math.sin(i*2.7)*g.hf+Math.sin(t*1.5+i)*1.2+lean,y=cy+4-q*20;A.spark(x,y,.4,i%3?'#ff7a2a':'#ffd166',Math.sin(q*Math.PI)*.85*fade)}}};

/* b19 태초의 굶주림: 뒤에서 도는 은하 소용돌이, 별빛 박힌 성운 꽃잎(금 테), 입 둘레 강착원반 고리, 뿔 왕관 광채 */
const X2primal=mut=>({
 pre(A){const g=m1G(A.B),t=A.t,b=A.bob*.6,C=mut?{c:'#8aff3a',e:'#3aff8a',n:'#145a34',g:'#d0ff6a'}:{c:'#ff6ad0',e:'#ff2a5a',n:'#5a1a7a',g:'#ffc84a'},wW=A.win('worldBite'),sh=A.shake(wW>.5?.35:0),cy=g.core+b-3;
  /* 은하 소용돌이 팔: 성운 빛 + 별 */for(let arm=0;arm<3;arm++)for(let i=0;i<10;i++){const q=i/10,a=t*.35+arm*TAU/3+q*3,rr=5+q*12,x=sh+Math.cos(a)*rr,y=cy+Math.sin(a)*rr*.6;if(i%2===0)A.glow(x,y,4-q*1.5,i%4?C.c:'#8a5aff',.5*(1-q*.5));A.spark(x,y,.4+(i%3)*.15,i%4?'#ffffff':C.g,.8*(1-q*.6))}},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*.6,C=mut?{p3:'#2a9a5a',e:'#3aff8a',g:'#d0ff6a',c:'#8aff3a',th:'#c8e8b0'}:{p3:'#9a1a3e',e:'#ff2a5a',g:'#ffc84a',c:'#ff6ad0',th:'#f0d8c8'};
  const wW=A.win('worldBite'),wM=A.win('hungerMedley'),wG=A.win('primalGaze'),ch=Math.max(wW,wM,wG,A.eyeC,A.any*.5),sh=A.shake(wW>.5?.35:0),bloom=Math.max(wW,A.open*.7,A.expose?1:0,wM*.4),cy=g.core+b-3,spin=t*.25+wM*t;
  /* 칼날 비늘: 금 능선 */const nB=12;for(let i=0;i<nB;i+=2){const a=spin+i*TAU/nB,L=g.hf+3+bloom*3,ca=Math.cos(a),sa=Math.sin(a);A.L(sh+ca*(L-3),cy+sa*(L-3),sh+ca*(L-.9),cy+sa*(L-.9),C.g,.2,.8)}
  /* 성운 꽃잎: 금 테 + 박힌 별 */const nF=6;for(let i=0;i<nF;i++){const a=-Math.PI/2+i*TAU/nF+Math.sin(t*.6)*.05,L=5.6+bloom*1.4,open=1.6+bloom*4.6,ca=Math.cos(a),sa=Math.sin(a),tipx=sh+ca*(open+L*.6),tipy=cy+sa*(open+L*.6),bx=sh+ca*open,by=cy+sa*open,nx=-sa*2.6,ny=ca*2.6;
   A.L(bx+ca*.8,by+sa*.8,tipx-ca*.8,tipy-sa*.8,C.g,.18,.75);
   for(let k=0;k<3;k++){const q=.3+k*.2,o=(k-1)*.35,x=bx+(tipx-bx)*q+nx*o*.6,y=by+(tipy-by)*q+ny*o*.6,tw=.5+.5*Math.sin(t*4+i*1.7+k*2.3);A.R(x-.12,y-.12,.25,.25,'#ffffff',tw)}
   const ex=bx+ca*1.6,ey=by+sa*1.6;if(!A.dm&&!A.blink)A.R(ex+.25,ey-.3,.22,.22,'#ffffff',.9);
   A.spark(tipx,tipy,.6,'#ffffff',.4+.6*Math.max(0,Math.sin(t*3+i)))}
  /* 강착원반 고리 (입 둘레를 도는 빛) */{const R=1.6+bloom*3.4,rr=R+1.3;A.ring(sh,cy,rr,.3,C.g,.55);for(let i=0;i<6;i++){const a=t*2.4+i*TAU/6;A.C(sh+Math.cos(a)*rr,cy+Math.sin(a)*rr,.32,i%2?'#ffffff':C.g,.9)}A.glow(sh,cy,rr+2,C.g,.5)}
  /* 뿔 왕관 광채 */for(let i=-3;i<=3;i++){const a=-Math.PI/2+i*.22,L=3+(3-Math.abs(i))*1.1+ch,bx=sh+Math.cos(a)*(g.hf-1),by=cy+Math.sin(a)*(g.hf-1);A.L(bx-.2,by,bx+Math.cos(a)*L*.85-.1,by+Math.sin(a)*L*.85,'#ffffff',.15,.6);for(let k=1;k<3;k++){const q=k*.3;A.L(bx+Math.cos(a)*L*q-.4,by+Math.sin(a)*L*q,bx+Math.cos(a)*L*q+.4,by+Math.sin(a)*L*q,C.g,.15,.8)}}
  /* 정수리 별 */{const a=-Math.PI/2,L=3+3*1.1+ch,x=sh+Math.cos(a)*(g.hf-1+L+.6),y=cy+Math.sin(a)*(g.hf-1+L+.6),r=1.3+.3*Math.sin(t*3);A.L(x-r*1.6,y,x+r*1.6,y,'#ffffff',.2,.85);A.L(x,y-r*1.6,x,y+r*1.6,'#ffffff',.2,.85);A.L(x-r*.8,y-r*.8,x+r*.8,y+r*.8,C.g,.15,.7);A.L(x-r*.8,y+r*.8,x+r*.8,y-r*.8,C.g,.15,.7);A.glow(x,y,3.4,C.g,.8)}}});
EXU.b19=X2primal(false);EXU.b19m=X2primal(true);
}

/* 챕터 3 익스트림 업그레이드 */
{
/* 공용: 작은 금박 소용돌이(필리그리) — (x,y)에서 s방향으로 말리는 곡선 */
const x3Curl=(A,x,y,s,r,col,al)=>{let px=x,py=y;for(let k=1;k<=6;k++){const a=k*.9,rr=r*(1-k/8),nx=x+s*Math.cos(a)*rr,ny=y-Math.sin(a)*rr;A.L(px,py,nx,ny,col,.18,al);px=nx;py=ny}};

/* c_pendulum 한밤의 괘종: 광택 흑단 · 금박 필리그리 · 반짝이는 유리 · 시계 뒤 금빛 햇살 문양 */
EXU.c_pendulum={
 pre(A){const g=m1G(A.B),t=A.t,b=A.bob*.4,wT=A.win('tickTock'),sh=A.shake(wT>.5?.25:0),top=g.top+b-3,hw=g.hf+.6,hy=top+3.8,R=hw-.2;
  /* 시계 얼굴 뒤 금빛 햇살 (선버스트) */for(let i=0;i<24;i++){const a=i*TAU/24+t*.05,L=R+(i%2?1.6:2.8);A.spike(sh+Math.cos(a)*(R-.4),hy+Math.sin(a)*(R-.4),a,L-R+.8,i%2?.5:.8,i%2?'#8a6420':'#e8b858')}
  /* 천천히 도는 톱니 장식 */A.gear(sh,hy,R+1.2,16,-t*.15,'#5a3c14','#2e1a10',false);
  /* 뒤 첨탑 광채 */A.glow(sh,top-5,4,'#b07aff',.35)},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*.4,wS=A.win('pendSwing'),wT=A.win('tickTock'),sh=A.shake(wT>.5?.25:0),top=g.top+b-3,bot=-4.6+b,hw=g.hf+.6,G='#f4cc6a',G2='#fff2c0';
  /* 흑단 결 + 광택 */for(const s of [-1,1]){for(let i=0;i<3;i++){const x=sh+s*(hw-.45-i*.22);A.L(x,top+8.5,x+s*.12,bot-.4,i===1?'#7a4a2a':'#1c0e06',.14,.6)}}
  A.L(sh-hw+.35,top+7.5,sh-hw+.35,bot-.6,'#ffd8a8',.22,.35);
  /* 금박 테두리 비즈 */for(let y=top+9;y<bot-.6;y+=1.3)for(const s of [-1,1])A.C(sh+s*(hw-.1),y,.2,G,.9);
  /* 유리 창: 금 프레임 + 모서리 필리그리 + 반사광 */{const wy0=top+8.8,wy1=bot-2.4,x0=sh-hw+1.2,x1=sh+hw-1.2;A.L(x0,wy0,x1,wy0,G,.25);A.L(x0,wy1,x1,wy1,G,.25);A.L(x0,wy0,x0,wy1,G,.2,.8);A.L(x1,wy0,x1,wy1,G,.2,.8);
   x3Curl(A,x0+.3,wy0+1.6,1,1.4,G,.9);x3Curl(A,x1-.3,wy0+1.6,-1,1.4,G,.9);x3Curl(A,x0+.3,wy1-.4,1,1.2,G,.7);x3Curl(A,x1-.3,wy1-.4,-1,1.2,G,.7);
   for(let i=0;i<2;i++){const q=(t*.18+i*.5)%1,yy=wy0+q*(wy1-wy0);A.P([[x0+.2,yy],[x0+.9,yy],[x1-.2,yy-3.4],[x1-.2,yy-4.4]],'#ffffff',.07)}
   /* 칼날 진자: 잔상 + 칼날 하이라이트 */for(const s of [-1,1]){const sp=(1.4+wS*3)*(s<0?1:1.07),L=wy1-wy0-1.6,px=sh+s*.8;for(const d of [.12,.24]){const pa=Math.sin((t-d)*sp+(s>0?Math.PI:0))*(.45+wS*.4),ex=px+Math.sin(pa)*L,ey=wy0+.4+Math.cos(pa)*L;A.P([[ex-1.5,ey-.4],[ex+1.5,ey-.4],[ex,ey+1.6]],'#b07aff',.16-d*.3)}
    const pa=Math.sin(t*sp+(s>0?Math.PI:0))*(.45+wS*.4),ex=px+Math.sin(pa)*L,ey=wy0+.4+Math.cos(pa)*L;A.L(ex-1.5,ey-.4,ex,ey+1.7,'#ffffff',.18,.8);A.C(ex,ey-.6,.35,G2);A.L(px,wy0+.4,ex,ey,'#ffe8a0',.12,.5);const q=(t*.8+(s>0?.5:0))%1;if(q<.18)A.spark(ex+1.1-q*6,ey-.2+q*4,.8,'#ffffff',1-q/.18)}}
  /* 시계 얼굴: 광택 베젤 + 법랑 눈금 + 유리 반사 */{const hy=top+3.8,R=hw-.2;A.ring(sh,hy,R,.25,G2,.55);A.ring(sh,hy,R-.6,.15,'#8a6420',.8);for(let i=0;i<60;i+=5){const a=i*TAU/60+TAU/24;A.C(sh+Math.cos(a)*(R-.3),hy+Math.sin(a)*(R-.3),.13,'#fff6d8')}
   A.P([[sh-R*.7,hy-R*.35],[sh-R*.35,hy-R*.75],[sh-R*.15,hy-R*.65],[sh-R*.6,hy-R*.15]],'#ffffff',.22);A.R(sh+R*.45,hy+R*.35,.4,.4,'#ffffff',.6)}
  /* 지붕 금 테 + 첨탑 보석 */{const ry=top+1;A.L(sh-hw-.6,ry+.9,sh,ry-3.3,G,.2,.85);A.L(sh,ry-3.3,sh+hw+.6,ry+.9,'#8a6420',.2,.85);for(let i=-2;i<=2;i++)A.C(sh+i*1.1,ry+.75,.18,G2);
   const jy=ry-6.2;A.P([[sh,jy-1],[sh+.7,jy],[sh,jy+1],[sh-.7,jy]],'#d8b0ff');A.P([[sh,jy-1],[sh-.7,jy],[sh,jy]],'#ffffff',.7);const sp=(t*.6)%1;if(sp<.25)A.spark(sh+.3,jy-.4,1.2,'#ffffff',1-sp/.25)}
  /* 사자발: 금 발톱 광택 */for(const s of [-1,1])A.L(sh+s*3.6-1.2,-.3,sh+s*3.6+1.2,-.3,G2,.15,.7)}};

/* c_moth 꿈을 먹는 나방: 커다란 레이스 테두리 날개 · 비늘 띠 무늬 · 다중 고리 눈알 무늬 · 반짝이는 인분 · 솜털 흉부 */
const mothW=(A,s,f)=>{const g=m1G(A.B),t=A.t,b=A.bob*1.4,wG=A.win('wingGust'),cy=g.core+b-1,flap=Math.sin(t*(3+wG*10))*(.25+wG*.4),ang=s*(.2+flap);
 const L=f?g.hf+1:g.hf+4,H2=f?5:8,x0=s*1.4,y0=cy-1+f*2.4,tip=[x0+s*L*Math.cos(ang),y0-H2*.7+f*6-L*Math.sin(ang)*.3];
 const pts=f?[[x0,y0],[x0+s*L*.6,y0+1],[x0+s*L,y0+H2*.6],[x0+s*L*.5,y0+H2]]:[[x0,y0],[tip[0],tip[1]-H2*.5],[x0+s*(L+1),y0-1],[x0+s*L*.7,y0+H2*.5],[x0+s*1,y0+2]];return {x0,y0,L,H2,pts,cy}};
const lerpP=(p,q,k)=>[p[0]+(q[0]-p[0])*k,p[1]+(q[1]-p[1])*k];
EXU.c_moth={
 pre(A){const t=A.t;for(const s of [-1,1])for(const f of [1,0]){const W=mothW(A,s,f),{x0,y0,pts}=W,sc=f?1.22:1.18,P2=pts.map(p=>[x0+(p[0]-x0)*sc,y0+(p[1]-y0)*sc+(f?.8:0)]);
   A.P(P2,'#06050a');A.P(P2.map(p=>[x0+(p[0]-x0)*.96,y0+(p[1]-y0)*.96]),f?'#4a2a62':'#4a2e78');if(!f){for(let i=1;i<4;i++){const p=lerpP(P2[i],[x0,y0],.08),q=lerpP(P2[i+1],[x0,y0],.08);for(let k=0;k<3;k++){const m=lerpP(p,q,k/3),n=lerpP(p,q,(k+1)/3),mid=lerpP(lerpP(m,n,.5),[x0,y0],.06);A.L(m[0],m[1],mid[0],mid[1],'#d8c0ff',.2,.55);A.L(mid[0],mid[1],n[0],n[1],'#d8c0ff',.2,.55)}}}
   /* 가장자리 레이스: 물결 술 */for(let i=1;i<P2.length-(f?0:1);i++){const p=P2[i],q=P2[(i+1)%P2.length];for(let k=0;k<4;k++){const m=lerpP(p,q,(k+.5)/4);A.C(m[0],m[1],.42,k%2?'#e8d8ff':'#b89ae0',.85)}}
   /* 무지갯빛 흐름 */const hu=['#8ae8ff','#c89aff','#ffb0e0'];for(let i=0;i<3;i++){const k=((t*.2+i/3)%1)*.8+.15,a=lerpP([x0,y0],P2[2],k),c2=lerpP([x0,y0],P2[f?3:1],k);A.L(a[0],a[1],c2[0],c2[1],hu[i],.5,.22)}}
  A.glow(0,mothW(A,1,0).cy,10,'#c8a0ff',.25)},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*1.4,wS=A.win('mothSwarm'),wL=A.win('lampLure'),wG=A.win('wingGust'),ch=Math.max(wS,wL,wG,A.eyeC);
  for(const s of [-1,1]){
   /* 앞날개: 비늘 띠 + 시맥 + 다중 고리 눈알 무늬 */{const W=mothW(A,s,0),{x0,y0,L,H2,pts}=W;
    for(let k=0;k<6;k++){const a=lerpP(pts[1],pts[2],k/5),c2=lerpP(pts[2],pts[3],k/5);const m=lerpP([x0,y0],k<3?a:c2,.86);A.spike(m[0],m[1],Math.atan2(m[1]-y0,m[0]-x0),.9,.9,k%2?'#d8c8f8':'#a888d8')}
    for(const k of [.3,.5,.7]){const e=lerpP(pts[2],pts[3],k),m=lerpP([x0,y0],e,.35);A.L(m[0],m[1],e[0]*.92+x0*.08,e[1]*.92+y0*.08,'#2a1a4a',.15,.6)}
    {const p=lerpP(pts[1],pts[2],.5);const z0=lerpP([x0,y0],p,.42),z1=lerpP([x0,y0],pts[3],.55);for(let k=0;k<5;k++){const u=lerpP(z0,z1,k/4),v=lerpP(z0,z1,(k+.5)/4);A.L(u[0],u[1],v[0]+s*.5,v[1],'#f4e8ff',.18,.55)}}
    const ex=x0+s*L*.55,ey=y0-H2*.15;A.ring(ex,ey,3,.45,'#1a0a2a',.85);A.ring(ex,ey,2.6,.35,'#7ad8ff',.85);A.ring(ex,ey,2.2,.25,'#ffb05a',.9);A.C(ex,ey,1.1,'#2a0a3a');A.C(ex+s*.3,ey,.55,ch>0?'#ffffff':'#ff9a3a');A.P([[ex-s*.6,ey-.9],[ex,ey-1.25],[ex+s*.4,ey-.95],[ex,ey-.7]],'#ffffff',.85);
    /* 인분 반짝임 */for(let i=0;i<4;i++){const q=(t*.7+i*.27+(s>0?.13:0))%1,p=lerpP(lerpP(pts[1],pts[3],(i*.37)%1),[x0,y0],.3);if(q<.35)A.spark(p[0],p[1],.9,i%2?'#ffffff':'#d8f0ff',1-q/.35)}}
   /* 뒷날개: 분홍 띠 + 작은 눈알 */{const W=mothW(A,s,1),{x0,y0,L,H2,pts}=W;const a=lerpP(pts[1],pts[2],.5),c2=lerpP(pts[2],pts[3],.5);A.L(...lerpP([x0,y0],a,.8),...lerpP([x0,y0],c2,.8),'#ff9ad8',.45,.6);const ex=x0+s*L*.6,ey=y0+H2*.5;A.ring(ex,ey,1.2,.3,'#1a0a2a');A.C(ex,ey,.8,'#ffd98a');A.C(ex,ey,.4,'#7ad8ff');A.R(ex-.3,ey-.4,.25,.25,'#ffffff')}}
  /* 솜털 흉부 + 등불 배 마디 광택 */{const cy=g.core+b-1;for(let i=0;i<12;i++){const a=i/11*Math.PI*2,r=2+(i%2)*.25;A.L(Math.cos(a)*r*.9,cy+.6+Math.sin(a)*r*1.4,Math.cos(a)*(r+.6),cy+.6+Math.sin(a)*(r*1.4+.5),i%2?'#e8e0f0':'#b8a8d8',.2,.75)}
   for(let i=0;i<5;i++)A.E(-.6,cy-1.2+i*1.4,.7,.2,'#ffffff',.35);const ly=cy+5;A.E(-.5,ly-.8,.4,.8,'#ffffff',.55)}
  /* 깃털 더듬이 끝 빛 + 겹눈 광택 */{const hy=g.top+b+1;for(const s of [-1,1]){let px=s*.8,py=hy-1.6;for(let k=0;k<7;k++){const nx=px+s*.7,ny=py-.9+k*.05;if(k%2===0){A.L(nx,ny,nx+s*.9,ny-.9,'#f4eeff',.15,.7);A.L(nx,ny,nx-s*.5,ny-1,'#f4eeff',.15,.7)}px=nx;py=ny}A.C(px,py,.35,'#ffe8a0');A.glow(px,py,1.5,'#ffd98a',.6+.3*Math.sin(t*3+s));if(!A.dm&&!A.blink)A.E(s*1.1-.3,hy-.7,.3,.35,'#ffffff',.7)}}}};

/* c_scales 심판의 저울: 장엄한 금빛 깃털 날개 · 월계 자수 로브 · 보석 박힌 저울 */
EXU.c_scales={
 pre(A){const g=m1G(A.B),t=A.t,b=A.bob*.5,wJ=A.win('judgment'),oy=g.top+b+4;
  /* 은은한 빛살 */for(let i=0;i<9;i++){const a=-Math.PI/2+(i-4)*.26+Math.sin(t*.4)*.03,L=13+(i%2)*3,ca=Math.cos(a),sa=Math.sin(a);A.P([[-.25*sa,oy-1+.25*ca],[.25*sa,oy-1-.25*ca],[ca*L,oy-1+sa*L]],'#fff4c0',.18)}
  /* 펼친 깃털 날개: 칼깃(긴 깃) → 덮깃 3단 */const fe=(x,y,a,L,w,col,dk)=>{const ca=Math.cos(a),sa=Math.sin(a),nx=-sa,ny=ca;A.P([[x+nx*w*.4,y+ny*w*.4],[x+ca*L*.7+nx*w*.5,y+sa*L*.7+ny*w*.5],[x+ca*L,y+sa*L],[x+ca*L*.75-nx*w*.5,y+sa*L*.75-ny*w*.5],[x-nx*w*.4,y-ny*w*.4]],col);A.L(x+ca*L*.15,y+sa*L*.15,x+ca*L*.85,y+sa*L*.85,dk,.14,.7)};
  for(const s of [-1,1]){const fl=Math.sin(t*1.1)*.05*s,x=s*1.6,y=oy+.5;
   for(let i=0;i<9;i++){const a=-Math.PI/2+s*(.3+i*.12)+fl,L=(15-Math.abs(i-2)*1.1)+wJ*2;fe(x,y,a,L+.7,1.8,'#2a1c04','#2a1c04');fe(x,y,a,L,1.4,i%2?'#9a7020':'#b88a30','#4a3410')}
   for(let i=0;i<8;i++){const a=-Math.PI/2+s*(.36+i*.13)+fl,L=9.5-Math.abs(i-2)*.6;fe(x,y,a,L+.5,1.7,'#3a2a08','#3a2a08');fe(x,y,a,L,1.4,i%2?'#e0b850':'#f0cc68','#8a6820')}
   for(let i=0;i<7;i++){const a=-Math.PI/2+s*(.42+i*.14)+fl,L=5.6-Math.abs(i-2)*.3;fe(x,y,a,L,1.6,'#fff6dc','#d8b860')}}},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*.5,wB=A.win('balance'),wC=A.win('counterWeight'),wJ=A.win('judgment'),ch=Math.max(wB,wC,wJ,A.eyeC),tilt=Math.sin(t*.9)*.12+wB*Math.sin(t*3)*.25,top=g.top+b+3,G='#ffe08a',G2='#a88830';
  /* 원본 후광 깃: 깃대 하이라이트 */for(const s of [-1,1])for(let i=0;i<6;i++){const a=-Math.PI/2+s*(.4+i*.22),L=8-i*.6+wJ*2,x=s*1.2,y=g.top+b+4;A.L(x+Math.cos(a)*L*.25,y+Math.sin(a)*L*.25,x+Math.cos(a)*L*.85,y+Math.sin(a)*L*.85,'#fff8e0',.15,.7)}
  /* 로브: 금 자수 단 + 월계 무늬 + 세로 장식띠 */{const hy=-1.4;A.R(-g.hf-.4,hy-.2,g.hf*2+.8,.25,'#fff6c8',.8);for(let x=-g.hf+.2;x<g.hf;x+=1.2){A.spike(x,hy+.4,-.5,.8,.4,'#6a8a30');A.spike(x+.5,hy+.4,Math.PI+.5,.8,.4,'#8aa840')}
   for(const x of [-1.6,1.6]){A.L(x,top+2.2,x*1.25,-1.6,G,.3,.9);for(let y=top+3;y<-2;y+=1.6)A.P([[x*(1+(y-top)/(-top)*.25),y-.4],[x*(1+(y-top)/(-top)*.25)+.4,y],[x*(1+(y-top)/(-top)*.25),y+.4],[x*(1+(y-top)/(-top)*.25)-.4,y]],G)}
   for(let i=-2;i<=2;i++)A.L(i*1.8+.25,top+2.4,i*2.4+.3,-1.8,'#ffffff',.15,.35)}
  /* 가슴 보석 */{const cy=g.core+b;A.P([[0,cy-1.4],[1.1,cy],[0,cy+1.4],[-1.1,cy]],A.expose?'#ffffff':'#ff5a7a');A.P([[0,cy-1.4],[-1.1,cy],[0,cy]],'#ffc0d0',.8);A.ring(0,cy,1.6,.25,G);A.glow(0,cy,2.4,'#ff8aa0',.5)}
  /* 저울대 금박 + 접시 광택 + 사슬 */{const by=top-1.4,L=g.hf+3.4,ex=Math.cos(tilt)*L,ey=Math.sin(tilt)*L;A.L(-ex,by-ey-.25,ex,by+ey-.25,'#fff6c8',.15,.8);for(const s of [-1,1]){const px=s*ex,py=by+s*ey;A.C(px,py,.45,G);A.C(px,py,.2,'#ffffff');for(let k=1;k<4;k++){A.C(px-1.6*k/4,py+3*k/4,.16,'#fff0b0');A.C(px+1.6*k/4,py+3*k/4,.16,'#fff0b0')}A.E(px-.6,py+3.05,.7,.15,'#ffffff',.8);const q=(t*.5+(s>0?.5:0))%1;if(q<.2)A.spark(px-1.4+q*14,py+3,1,'#ffffff',1-q/.2)}
   A.C(0,by,.5,'#ffffff')}
  /* 가면: 눈가리개 금 자수 + 왕관 보석 */{const hy=g.top+b+1;A.L(-2.4,hy-.75,2.4,-.75+hy,G,.15);A.L(-2.4,hy+.7,2.4,hy+.7,G,.15);for(let i=-2;i<=2;i++)A.C(i*.9,hy+.7,.15,'#fff6c8');A.E(-1,hy-1.6,.7,.4,'#ffffff',.35);
   for(let i=-2;i<=2;i++){const a=-Math.PI/2+i*.12,L=1.6+(i===0?1.2:0);A.C(i*.9+Math.cos(a)*L*.3,hy-2.6+Math.sin(a)*L*.3,.22,i%2?'#7ad8ff':'#ff6a8a')}
   const q=(t*.4)%1;if(q<.2)A.spark(0,hy-5,1.4,'#ffffff',1-q/.2)}}};

/* c_panopticon 감시탑: 다층 코팅 렌즈 · 크롬 베젤 · 패널 이음새/리벳 · 앞쪽 가시철망 · 레이더 스캔 */
EXU.c_panopticon={
 pre(A){const g=m1G(A.B),t=A.t,b=A.bob*1.1,cy=g.core+b-1,ey=cy-1.2;
  /* 회전 레이더 스캔 원반 */for(let i=0;i<3;i++)A.ring(0,ey,g.hf+5+i*2.6,.18,'#ff4a4a',.18-i*.04);const sa=t*1.6;for(let k=0;k<6;k++){const a=sa-k*.08;A.P([[0,ey],[Math.cos(a)*(g.hf+10),ey+Math.sin(a)*(g.hf+10)],[Math.cos(a-.08)*(g.hf+10),ey+Math.sin(a-.08)*(g.hf+10)]],'#ff4a4a',.16-k*.025)}
  /* 뒤 안테나 마스트 + 추진 노즐 */for(const s of [-1,1]){A.R(s*3-1.3,-3.6,2.6,1,'#3a3a46');A.R(s*3-1.1,-3.5,2.2,.3,'#8a8aa0')}},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*1.1,wW=A.win('watchSweep'),wC=A.win('cameraPost'),wS=A.win('spotTrack'),wL=A.win('lockdown'),ch=Math.max(wW,wC,wS,wL,A.eyeC),cy=g.core+b-1,rot=t*.4+wL*t*2,hf=g.hf;
  /* 추진 불꽃 백열 코어 */for(const s of [-1,1]){const q=(t*4)%1;A.P([[s*3-.4,-3],[s*3+.4,-3],[s*3,-1.4-q*.6]],'#fff0e0',.85)}
  /* 장갑 패널 이음새 + 리벳 + 크롬 가장자리 */A.L(-hf+1.2,cy-4,hf-1.2,cy-4,'#06050a',.15,.7);A.L(-hf+.6,cy+1,hf-.6,cy+1,'#06050a',.15,.7);for(const s of [-1,1]){A.L(s*(hf-.3),cy-3.8,s*(hf+.2),cy+.8,'#c8c8dc',.18,.7);for(const y of [cy-4.6,cy-2.6,cy-.6,cy+1.6,cy+3.6])A.C(s*(hf-.9),y,.2,'#9a9aac');A.C(s*(hf-.9)-.05,cy-4.65,.08,'#ffffff')}
  A.L(-hf+2.2,cy-5.7,hf-2.2,cy-5.7,'#c8c8dc',.15,.6);
  /* 창문 불빛 번짐 */for(let i=0;i<5;i++){const on=(i+Math.floor(t*2))%2;if(on)A.glow(-hf+1.4+i*(hf*2-2.8)/4,cy+3.2,1.4,'#ffe08a',.4)}
  /* 렌즈: 크롬 베젤 반사 + 다층 코팅 + 조리개 날 */{const R=4+ch*.6,ey=cy-1.2;A.ring(0,ey,R+.8,.2,'#e8e8f8',.5);for(let i=0;i<10;i++){const a=-2.4+i*.1;A.R(Math.cos(a)*(R+.55)-.15,ey+Math.sin(a)*(R+.55)-.15,.3,.3,'#ffffff',.8-i*.06)}
   for(let i=0;i<12;i++){const a=i*TAU/12+t*.2;A.L(Math.cos(a)*(R+.9),ey+Math.sin(a)*(R+.9),Math.cos(a)*(R+1.3),ey+Math.sin(a)*(R+1.3),'#9a9aac',.15,.8)}
   A.ring(0,ey,R*.95,.2,'#7a4aff',.35);A.ring(0,ey,R*.72,.15,'#3affb0',.25);
   if(!A.dm&&!A.blink){const ex=A.look[0]*1.2,ey2=ey+A.look[1]*.8,ap=A.expose?1:.4+.4*(1-ch);A.ring(ex,ey2,R*ap*.6,.2,'#ffb0a0',.7);A.C(ex,ey2,R*ap*.12,'#ff2a2a',.9);A.L(ex-1.8,ey2,ex+1.8,ey2,'#ffe0e0',.1,.6);A.L(ex,ey2-1.8,ex,ey2+1.8,'#ffe0e0',.1,.6)}
   A.P([[-R*.7,ey-R*.35],[-R*.25,ey-R*.8],[-R*.05,ey-R*.75],[-R*.55,ey-R*.2]],'#ffffff',.18);A.C(R*.45,ey+R*.45,.3,'#ffffff',.5)}
  /* 앞쪽 가시철망 고리 */for(let i=0;i<22;i++){const a=rot+i*TAU/22,X=Math.cos(a)*(hf+2.6),Y=cy+Math.sin(a)*2.2;if(Math.sin(a)>=0){const a2=a+TAU/22;A.L(X,Y,Math.cos(a2)*(hf+2.6),cy+Math.sin(a2)*2.2,'#06050a',.3,.9);A.L(X,Y,Math.cos(a2)*(hf+2.6),cy+Math.sin(a2)*2.2,'#b8b8c8',.15,.9);A.spike(X,Y,a+Math.PI/2,.9,.4,'#d8d8e8');if(i%4===0)A.R(X-.1,Y-.1,.2,.2,'#ffffff')}}
  /* 지붕 크롬 + 안테나 램프 광 */A.L(-hf+1.8,cy-6.1,0,cy-9.3,'#d8d8e8',.15,.55);for(const s of [-1,1])if(Math.floor(t*3+s)%2)A.glow(s*3,cy-13.2,1.6,'#ff4a4a',.7);
  /* 탐조등 렌즈 반사 */for(const s of [-1,1]){const hx=s*(hf+.6)+s*2.4,hy=cy+2;A.ring(hx,hy,1.2,.2,'#d8d8e8',.7);A.C(hx-.3,hy-.3,.3,'#ffffff')}}};

/* c_bellows 풀무 거인: 숨쉬는 주름 사이로 새는 불빛 · 가죽 박음질 · 광낸 황동 띠 · 쇳물 화구 · 달궈진 굴뚝 · 불티 */
EXU.c_bellows={
 pre(A){const g=m1G(A.B),t=A.t,b=A.bob*.4,wA=A.win('airBlast'),br=Math.sin(t*2.4)*.5+.5,infl=br*.8+wA*2,cy=g.core+b,w=g.hf+infl*.6,h=g.bh/2+infl*.4;
  /* 뒤로 번지는 열기 */A.E(0,cy,w+2.4,h+2,'#ff5a1a',.1+br*.06);A.E(0,cy,w+1.4,h+1.2,'#ff8a2a',.1+br*.05);
  for(let i=0;i<10;i++){const q=(t*.6+i/10)%1,x=Math.sin(i*2.3)*(w+1.5),y=cy+h-q*(h*2+8);A.R(x+Math.sin(q*8+i)*.6,y,.3,.3,i%3?'#ffb040':'#fff0b0',(1-q)*.8)}},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*.4,wP=A.win('pumpSlam'),wC=A.win('chimneySteam'),wA=A.win('airBlast'),ch=Math.max(wP,wC,wA,A.eyeC),br=Math.sin(t*2.4)*.5+.5,infl=br*.8+wA*2,sh=A.shake(wA>.6?.3:0),cy=g.core+b,w=g.hf+infl*.6,h=g.bh/2+infl*.4;
  /* 주름 틈 불빛 + 가죽 박음질 + 광택 */for(let i=1;i<7;i++){const y=cy-h+i*(h*2/7),ww=w-(i%2)*.8;A.L(-ww+.8+sh,y,ww-.8+sh,y,'#ff7a2a',.18,.35+br*.45);A.glow(sh,y,ww*.6,'#ff7a2a',.08+br*.1)}
  for(let i=0;i<7;i++){const y=cy-h+i*(h*2/7)+h/7,ww=w-(i%2)*.8;for(let x=-ww+1.4;x<ww-1;x+=1.8)A.R(x+sh,y,.4,.12,'#c89a6a',.45);A.E(-ww*.45+sh,y-.25,ww*.25,.18,'#ffd8b0',.3)}
  /* 황동 띠 광택 + 리벳 반사 */A.L(-w-.8+sh,cy-h-.6,w+.8+sh,cy-h-.6,'#fff0c8',.2,.6);A.L(-w-.8+sh,cy+h,w+.8+sh,cy+h,'#fff0c8',.15,.45);for(let i=0;i<8;i++){const x=-w+i*(w*2)/7+sh;A.R(x-.15,cy-h-.45,.15,.15,'#ffffff');A.R(x-.15,cy+h+.15,.15,.15,'#ffffff')}
  /* 화구: 쇠살 + 쇳물 소용돌이 */{const op=Math.max(A.open,A.expose?1:0,wA*.6),R=1.6+op;for(let i=0;i<6;i++){const a=t*1.5+i*TAU/6;A.L(sh+Math.cos(a)*R*.3,cy+Math.sin(a)*R*.3,sh+Math.cos(a+.6)*R*.95,cy+Math.sin(a+.6)*R*.95,'#ffe080',.18,.6+br*.3)}
   A.ring(sh,cy,R+.5,.4,'#4a4a54');for(let i=0;i<8;i++){const a=i*TAU/8;A.C(sh+Math.cos(a)*(R+.3),cy+Math.sin(a)*(R+.3),.18,'#c8c8d0')}A.glow(sh,cy,2.5+br*1.5,'#ffd060',.5)}
  /* 굴뚝: 달궈진 테 + 그을음 + 불꽃 혀 */{const hy=g.top+b-.6;A.R(-3.6+sh,hy-4.8,7.2,.35,'#ff6a1a',.5+br*.3);A.R(-3.4+sh,hy-4.45,6.8,.2,'#ffd080',.4);A.glow(sh,hy-4.6,3,'#ff7a2a',.35+br*.2);
   for(let i=0;i<3;i++){const q=(t*2.2+i/3)%1;A.P([[sh-1+i*.9,hy-4.8],[sh-.4+i*.9,hy-4.8],[sh-.7+i*.9+Math.sin(t*9+i)*.3,hy-5.6-q*1.6]],q<.5?'#ffd060':'#ff7a2a',.85*(1-q))}
   for(const s of [-1,1]){A.L(s*3.2+sh,hy+1.6,s*2.5+sh,hy-3.8,'#8a8a98',.15,.7)}if(!A.dm)for(const s of [-1,1])A.glow(s*1.1+sh,hy+.3,1.4,'#ffb040',.6)}
  /* 다리 쇠판 광택 + 노즐 황동 고리 */for(const s of [-1,1]){const lx=s*5+sh;A.L(lx-1.9,-5.2,lx-2.3,-.2,'#8a8a98',.18,.7);A.L(lx-1.8,-4.2,lx+1.8,-4.2,'#06050a',.15,.6)}
  {const nx=sh+g.hf+.6,ny=cy+1.4;A.R(nx-.6,ny-1.3,.5,2.6,'#e8c060');A.R(nx-.55,ny-1.2,.2,2.4,'#fff4c8');A.L(nx,ny-.9,nx+3.2+wA,ny-.45,'#c8c8d0',.15,.7)}}};

/* c_metronome 불협화음 지휘자: 금박 모서리 장식 · 벨벳 광택 · 바늘 잔상 · 실크햇 광택 · 떠오르는 음표 */
EXU.c_metronome={
 pre(A){const g=m1G(A.B),t=A.t,b=A.bob*.5,wA=A.win('accentHit'),sh=A.shake(wA>.5?.3:0);
  /* 더 길고 우아한 연미복 꼬리 (주홍 새틴 안감) */for(const s of [-1,1]){const sw=Math.sin(t*2+s)*.5;A.P([[s*1+sh,-6.5],[s*(g.hf-.2)+sh,-6.5],[s*(g.hf+3)+sh,.6+sw],[s*(g.hf+1.6)+sh,-.2+sw],[s*(g.hf-1.4)+sh,-1.6]],'#06050a');A.P([[s*(g.hf-.4)+sh,-6],[s*(g.hf+2.5)+sh,.1+sw],[s*(g.hf+1.5)+sh,-.6+sw]],'#9a1a3a');A.L(s*(g.hf-.2)+sh,-5.8,s*(g.hf+2.4)+sh,0+sw,'#ff8ab0',.15,.6)}
  /* 어깨 뒤 벨벳 망토 깃 (금 테) */{const top=g.top+b-2;for(const s2 of [-1,1]){A.P([[s2*.6+sh,top+1.4],[s2*4.6+sh,top+3.6],[s2*3.4+sh,top+6.4],[s2*1.6+sh,top+4]],'#06050a');A.P([[s2*.9+sh,top+1.9],[s2*4+sh,top+3.8],[s2*3.1+sh,top+5.8],[s2*1.7+sh,top+4]],'#6a1a44');A.L(s2*.9+sh,top+1.9,s2*4+sh,top+3.8,'#ffd870',.2,.9)}}},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*.5,wN=A.win('needleSweep'),wB=A.win('batonVolley'),wA=A.win('accentHit'),ch=Math.max(wN,wB,wA,A.eyeC),sh=A.shake(wA>.5?.3:0),top=g.top+b-2,bot=-5+b,G='#ffd870',G2='#fff4c8';
  /* 피라미드 금박 모서리 + 필리그리 */for(const s of [-1,1]){A.L(s*g.hf+sh,bot-.2,s*1+sh,top+.6,G,.25);for(let k=1;k<5;k++){const q=k/5,x=s*(g.hf+(1-g.hf)*q)+sh,y=bot-.2+(top+.6-bot+.2)*q;x3Curl(A,x-s*.2,y,-s,1.1,G,.8)}}
  A.R(-g.hf+sh,bot-.5,g.hf*2,.3,G);for(let x=-g.hf+.6;x<g.hf;x+=1.2)A.C(x+sh,bot-.35,.16,G2);
  /* 벨벳 광택 줄 */A.P([[1.5+sh,bot-.6],[2.6+sh,bot-.6],[.9+sh,top+2],[.6+sh,top+2]],'#ff7ab8',.18);
  /* 눈금 창 유리 반사 + 금 테 */{const wy0=top+3,wy1=bot-1.4;A.L(-2.6+sh,wy1,-.8+sh,wy0,G,.18);A.L(2.6+sh,wy1,.8+sh,wy0,G,.18);A.P([[-2+sh,wy1-.5],[-1.3+sh,wy1-.5],[-.3+sh,wy0+1],[-.6+sh,wy0+1]],'#ffffff',.12)
   /* 바늘 잔상 + 추 광택 */const sp=2.4+wN*4+wA*6,L=wy1-wy0+5;for(const d of [.05,.1,.15]){const pa=Math.sin((t-d)*sp)*(.5+wN*.3);A.L(sh,wy1,sh+Math.sin(pa)*L,wy1-Math.cos(pa)*L,'#ffe36b',.3,.28-d*1.4)}
   const pa=Math.sin(t*sp)*(.5+wN*.3),wx=sh+Math.sin(pa)*L*.55,wy=wy1-Math.cos(pa)*L*.55,ex=sh+Math.sin(pa)*L,ey=wy1-Math.cos(pa)*L;A.R(wx-.7,wy-.5,.5,.4,G2);A.L(wx-.9,wy-.55,wx+.9,wy-.55,'#ffffff',.12,.6);A.glow(ex,ey,1.5,'#ffe36b',.5);A.C(sh,wy1,.5,G);A.C(sh,wy1,.22,'#ffffff')}
  /* 가면 금 테 + 눈물 장식 + 실크햇 새틴 광택 */{const hy=top+.4;A.ring(sh,hy-.2,2.1,.18,G,.9);for(const s of [-1,1]){x3Curl(A,sh+s*1.4,hy-1.1,s,.9,G,.9);A.P([[sh+s*.8,hy+.6],[sh+s*.6,hy+1.1],[sh+s*.8,hy+1.4],[sh+s*1,hy+1.1]],'#ff6ab0',.9)}A.E(sh-.9,hy-1,.5,.3,'#ffffff',.5);
   A.R(-1.8+sh,hy-3.2,3.6,.6,'#c83a7a');A.R(-1.8+sh,hy-3.2,3.6,.15,'#ffb0d8',.8);A.R(-1.5+sh,hy-5.3,.5,2,'#ffffff',.18);A.R(-2.8+sh,hy-2.4,5.6,.15,'#6a6a7a',.8);A.C(1.2+sh,hy-2.9,.3,G)}
  /* 떠오르는 음표 */for(let i=0;i<3;i++){const q=(t*.35+i/3)%1,x=sh+(i-1)*5+Math.sin(q*6+i)*1.2,y=top+4-q*10;const al=Math.sin(q*Math.PI)*.9;A.E(x,y,.55,.4,'#ffe36b',al);A.L(x+.45,y,x+.45,y-2,'#ffe36b',.18,al);if(i!==1)A.L(x+.45,y-2,x+1.2,y-1.4,'#ffe36b',.18,al)}}};

/* c_calendar 거짓 달력: 부채처럼 펼쳐진 종이 날개 · 잉크 글씨/달력 칸 · 붉은 인장 · 금박 제본 고리 · 금박 종이 단면 */
EXU.c_calendar={
 pre(A){const g=m1G(A.B),t=A.t,b=A.bob*.5,wP=A.win('pageStorm'),top=g.top+b,hw=g.hf,ox=0,oy=top+6;
  /* 양옆으로 펼친 달력 낱장 날개 (겹겹이, 펄럭임) */for(const s of [-1,1])for(let i=3;i>=0;i--){const ox=s*(hw-1),oy=top+6+i*1.3,a=(s>0?0:Math.PI)+s*(-.75+i*.38)+Math.sin(t*2.2+i*.9)*.06*s+wP*Math.sin(t*7+i)*.1,L=9-i*.8,ca=Math.cos(a),sa=Math.sin(a),nx=-sa,ny=ca,w=1.5;
   const P4=[[ox+nx*w,oy+ny*w],[ox+ca*L+nx*w,oy+sa*L+ny*w],[ox+ca*(L+.6)-nx*w*.6,oy+sa*(L+.6)-ny*w*.6],[ox+ca*L*.8-nx*w,oy+sa*L*.8-ny*w],[ox-nx*w,oy-ny*w]];A.P(P4,'#06050a');A.P(P4.map(p=>lerpP(p,[ox+ca*L*.5,oy+sa*L*.5],.14)),i%2?'#e8dcc0':'#f6eedc');
   const h0=lerpP(P4[0],[ox+ca*L*.5,oy+sa*L*.5],.14),h1=lerpP(P4[1],[ox+ca*L*.5,oy+sa*L*.5],.14);A.L(h0[0]-nx*.25,h0[1]-ny*.25,h1[0]-nx*.25,h1[1]-ny*.25,'#c83a3a',.45);for(let k=1;k<3;k++){const o=-k*.8;A.L(ox+ca*1+nx*(w+o),oy+sa*1+ny*(w+o),ox+ca*(L-1.2)+nx*(w+o),oy+sa*(L-1.2)+ny*(w+o),'#a89878',.1,.8)}}},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*.5,wP=A.win('pageStorm'),wD=A.win('dateMark'),wL=A.win('deadline'),ch=Math.max(wP,wD,wL,A.eyeC),top=g.top+b,bot=-4.4+b,hw=g.hf,fy=top+4.4,G='#f0c860';
  /* 종이 더미: 금박 단면 + 결 */for(let i=0;i<6;i++){const hh=(bot-top-4)/6,y=bot-i*hh,off=Math.sin(t*1.5+i)*.4;for(const s2 of [-1,1])A.R(s2*(hw-.15)+off-.15,y-hh,.3,hh-.2,G,.8)}
  /* 얼굴 페이지: 달력 칸 + 잉크 글씨 */A.R(-hw+.4,fy+1.6,hw*2-.8,.15,'#8a2020',.7);for(let i=0;i<2;i++)A.L(-hw+1,fy+2.2+i*.5,-hw+3+i*.4,fy+2.2+i*.5,'#3a3040',.12,.6);
  for(let r=0;r<2;r++)for(let k=0;k<7;k++){const x=-hw+1+k*(hw*2-2)/7,y=fy+g.bh-3.2+r*.9;A.R(x,y,(hw*2-2)/7-.25,.7,r===1&&k===3?'#ffcaca':'#e4d8bc',.9)}
  /* '12' 붉은 동그라미 + 인장 */A.ring(hw-2.7,fy+1,1.2,.18,'#ff3a3a',.9);{const sx=-hw+2,sy=fy+g.bh-4.6;A.ring(sx,sy,1,.25,'#c02020',.7);A.R(sx-.5,sy-.1,1,.2,'#c02020',.7)}
  /* 붉은 X 눈: 잉크 번짐 + 광택 */if(!A.dm){const ey=fy+4.2,ex=A.look[0]*.6;A.ring(ex,ey,1.9,.2,'#ff2a2a',.45+ch*.4);A.L(ex-1.4,ey-1.4,ex+1.4,ey+1.4,'#ffb0b0',.12,.5);A.L(ex+1.4,ey-1.4,ex-1.4,ey+1.4,'#ffb0b0',.12,.5);A.glow(ex,ey,2,'#ff3a3a',.3)}
  /* 금박 제본 고리 */for(let i=0;i<5;i++){const x=-hw+1.4+i*(hw*2-2.8)/4;A.ring(x,top+3.4,.8,.22,G);A.R(x-.6,top+2.9,.25,.25,'#ffffff')}
  /* 압정: 금속 광택 */for(let i=-2;i<=2;i++){const x=i*2,h=2+(i===0?1.2:0)+wD*1.2,r=.8+(i===0?.3:0);A.E(x-.25,top+2-h-.3,r*.45,r*.3,'#ffffff',.6);A.L(x+.1,top+2,x+.1,top+2-h+.6,'#ffffff',.1,.6)}
  /* 넘어가는 낱장 반짝임 */{const q=(t*.5)%1;if(q<.3)A.spark(hw+1+q*8,top+5-q*4,1,'#ffffff',1-q/.3)}}};

/* c_dust 먼지 원동기: 거대한 먼지 회오리 · 크롬 띠 유리 탱크 · 빛나는 먼지 결정 · 흡입 기류 · 궤도 롤러 */
EXU.c_dust={
 pre(A){const g=m1G(A.B),t=A.t,b=A.bob*.5,wD=A.win('dustDevil'),top=g.top+b,cy=g.core+b;
  /* 뒤 먼지 회오리 (나선 팔 3개) */for(let arm=0;arm<3;arm++)for(let i=0;i<16;i++){const q=i/16,a=t*(1.2+wD*3)+arm*TAU/3+q*4.2,r=3+q*(g.hf+6),x=Math.cos(a)*r,y=cy-2+Math.sin(a)*r*.45;A.C(x,y,.35+q*.9,q>.5?'#4a3e5a':'#6a5e7a',.5*(1-q*.5));if(i%5===2)A.R(x,y,.3,.3,'#d8b8ff',.8)}
  A.glow(0,cy-2,g.hf+4,'#b07aff',.18)},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*.5,wD=A.win('dustDevil'),wM=A.win('moteCloud'),ch=Math.max(wD,A.win('broomSweep'),wM,A.eyeC),sh=A.shake(wM>.5?.2:0),top=g.top+b,cy=g.core+b;
  /* 궤도: 롤러 + 볼트 */for(let i=-3;i<=3;i++){const x=i*3.4,r=1.1;A.C(x,-2.2,r,'#2a2432');A.ring(x,-2.2,r,.25,'#8a7e9a');A.C(x,-2.2,.3,'#c8c0d8');const a=-t*3+i;A.R(x+Math.cos(a)*.6-.12,-2.2+Math.sin(a)*.6-.12,.24,.24,'#e8e0f0')}A.L(-11.6,-4.3,11.6,-4.3,'#a89ab8',.15,.6);
  /* 유리 탱크: 크롬 띠 + 반사 + 빛나는 먼지 결정 */{const tx=sh,ty=cy,R=g.hf-2.4,ry=g.bh/2-1.2;A.ring(tx,ty-ry+.1,.1,.1,'#000',0);A.L(tx-R,ty-ry-.2,tx+R,ty-ry-.2,'#c8c0d8',.35,.8);A.L(tx-R,ty+ry+.2,tx+R,ty+ry+.2,'#c8c0d8',.35,.8);A.L(tx-R*.9,ty-ry-.35,tx+R*.4,ty-ry-.35,'#ffffff',.12,.7);
   for(const s of [-1,1])for(let k=0;k<3;k++)A.C(tx+s*(R+.4),ty-ry*.6+k*ry*.6,.22,'#d8d0e8');
   for(let i=0;i<8;i++){const a=t*(2.4+wD*4)+i*.8,rr=((i*.37)%1)*R*.9,x=tx+Math.cos(a)*rr,y=ty+Math.sin(a)*rr*.5;A.R(x-.15,y-.15,.3,.3,i%2?'#e8d0ff':'#ffffff',.8);if(i%3===0)A.glow(x,y,1,'#c89aff',.5)}
   A.P([[tx-R*.75,ty-ry*.4],[tx-R*.55,ty-ry*.75],[tx-R*.4,ty-ry*.7],[tx-R*.6,ty-ry*.3]],'#ffffff',.25);A.R(tx+R*.55,ty+ry*.3,.3,.6,'#ffffff',.3)}
  /* 흡입 기류: 입으로 빨려드는 줄기 */{const my=cy+3;for(let i=0;i<5;i++){const q=(t*1.4+i/5)%1,a=-.7+i*.35+Math.PI/2*0,d=7-q*6,x=sh+Math.cos(Math.PI/2+a*2.2)*d*1.4,y=my+3.5+Math.sin(a)*1.4-q*2.5;A.L(x,y,x+(sh-x)*.3,y+(my-y)*.3,'#d8c8f0',.15,(1-q)*.55)}A.L(sh-3.6,my-.9,sh+3.6,my-.9,'#a89ab8',.15,.7)}
  /* 머리 회오리 속 번개 눈빛 + 반짝임 */{const hy=top-1;if(!A.dm)for(const s of [-1,1])A.glow(sh+s*1.3,hy,1.4,'#b07aff',.6+ch*.4);for(let i=0;i<3;i++){const q=(t*.9+i/3)%1,a=t*2+i*2.1;if(q<.3)A.spark(sh+Math.cos(a)*4.6,hy+Math.sin(a)*2.8,.9,'#f0e0ff',1-q/.3)}}
  /* 호스: 주름 링 */{let px=g.hf+sh,py=cy-1;for(let k=0;k<8;k++){const nx=px+.8,ny=py-1+Math.sin(t*2+k)*.5;A.L(nx-.3,ny-.5,nx+.3,ny+.5,'#a89ab8',.15,.8);px=nx;py=ny}A.ring(px,py,1,.25,'#c8c0d8');A.glow(px,py,1.6,'#b07aff',.4)}}};

/* c_echo 광산의 메아리: 광낸 황동 나팔 · 레코드 홈 반사 · 원목 결 · 공명 음파 */
EXU.c_echo={
 pre(A){const g=m1G(A.B),t=A.t,b=A.bob*.5,wE=A.win('echoRing'),cy=g.core+b,a=-Math.PI/2+A.look[0]*.5,L=5.4,bx=0,by=cy-2.6,px=bx+Math.cos(a)*(L+1.4),py=by+Math.sin(a)*(L+1.4);
  /* 나팔 앞으로 퍼지는 공명 파동 (부채꼴 호) */for(let k=0;k<3;k++){const q=((t*(.5+wE)+k/3)%1),R=5+q*9;let lx=null,ly=null;for(let i=-9;i<=9;i++){const aa=a+i*.07,x=px+Math.cos(aa)*R,y=py+Math.sin(aa)*R;if(lx!=null)A.L(lx,ly,x,y,'#8ae8ff',.3,(1-q)*.75*(1-Math.abs(i)/10));lx=x;ly=y}}
  A.glow(px,py,4,'#8ae8ff',.25+.1*Math.sin(t*3))},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*.5,wE=A.win('echoRing'),ch=Math.max(wE,A.win('delayShot'),A.win('callBack'),A.eyeC),rot=t*(2+ch*6),cy=g.core+b,G='#e8c868';
  /* 바퀴: 황동 허브 */for(const s of [-1,1]){const X=s*4.6;A.ring(X,-2.6,2.1,.2,'#c8a048');A.C(X,-2.6,.55,G);A.R(X-.3,-2.9,.2,.2,'#ffffff')}
  /* 원목 상자: 결 + 황동 모서리 */for(let i=0;i<4;i++){let px=-g.hf+.6,py=-3.6+b-i*1.1+(cy-1-(-4.4+b))*0;for(let k=1;k<=4;k++){const nx=-g.hf+.6+k*(g.hf*2-1.2)/4,ny=py+Math.sin(k*1.7+i)*.15;A.L(px,py,nx,ny,'#8a5a34',.12,.55);px=nx;py=ny}}
  for(const s of [-1,1]){A.P([[s*g.hf,-4.4+b],[s*(g.hf-1.4),-4.4+b],[s*g.hf,-5.8+b]],G);A.P([[s*g.hf,cy-1],[s*(g.hf-1.4),cy-1],[s*g.hf,cy+.4]],G)}A.L(-g.hf+.3,cy-.8,g.hf-.3,cy-.8,'#ffd8a0',.12,.5);
  /* 광산 수정 결정 (상자에 박힌 빛나는 광석) */{const cr=(x,y,h,w,a)=>{const ca=Math.cos(a),sa=Math.sin(a);A.P([[x-sa*w,y+ca*w*.3],[x+ca*h*.15-sa*w*.6,y+sa*h*.15],[x+ca*h,y+sa*h],[x+sa*w,y-ca*w*.3]],'#06050a');A.P([[x-sa*w*.7,y],[x+ca*h*.9,y+sa*h*.9],[x+sa*w*.7,y]],'#5ad0f0');A.L(x,y,x+ca*h*.85,y+sa*h*.85,'#e0ffff',.15,.9)};
   const tw=.6+.4*Math.sin(t*2.5);cr(-g.hf+.8,cy-.9,3.8,1,-Math.PI/2-.35);cr(-g.hf+2.2,cy-.9,2.6,.8,-Math.PI/2+.15);cr(-g.hf-.2,cy-.2,2.4,.7,-Math.PI+.5);A.glow(-g.hf+1,cy-2,2.2,'#8ae8ff',.5*tw);
   cr(g.hf-.4,-3.4+b,2.6,.8,-.4);cr(g.hf-.2,-2.8+b,1.8,.6,.3);A.glow(g.hf,-3.4+b,1.6,'#8ae8ff',.4*tw);const q=(t*.7)%1;if(q<.25)A.spark(-g.hf+.6,cy-3.2,1,'#ffffff',1-q/.25)}
  /* 레코드: 회전 반사 + 금 라벨 */{const ry=cy-1.4,R=g.hf-.4;for(const o of [0,Math.PI]){const a=rot+o;for(let k=2;k<5;k++)A.R(Math.cos(a)*R*k/5-.2,ry+Math.sin(a)*1.6*k/5-.1,.4,.2,'#ffffff',.35)}A.E(0,ry,1.8,.5,'#000',0);A.ring(0,ry,.5,.15,G);}
  /* 톤암 바늘 반짝 */A.C(2,cy-1.6,.25,'#ffffff');
  /* 나팔: 광택 하이라이트 + 테 비즈 + 목 안 빛 */{const bx=0,by=cy-2.6,a=-Math.PI/2+A.look[0]*.5,L=5.4,hx=bx+Math.cos(a)*L,hy=by+Math.sin(a)*L,na=a+Math.PI/2,R=5.4+wE*1.4+A.pul*.5,px=hx+Math.cos(a)*1.4,py=hy+Math.sin(a)*1.4;
   A.L(bx+Math.cos(na)*.35,by+Math.sin(na)*.35,hx+Math.cos(na)*.35,hy+Math.sin(na)*.35,'#fff4c8',.2,.8);
   const ip=(k,d)=>[hx+Math.cos(a)*d+Math.cos(na)*k,hy+Math.sin(a)*d+Math.sin(na)*k];A.L(...ip(.7,.2),...ip(R*.95,1.4),'#fff4c8',.22,.75);A.L(...ip(-.7,.2),...ip(-R*.95,1.4),'#6a4a10',.2,.7);
   for(let i=0;i<=8;i++){const k=-R*1.02+i*R*2.04/8,[x,y]=ip(k,1.65);A.C(x,y,.2,i%2?'#fff4c8':'#c8a048')}
   const c=ip(0,1.1);A.E(c[0],c[1],R*.45,.35,'#8ae8ff',.35+ch*.3);A.glow(c[0],c[1],2+ch*2,'#8ae8ff',.5)}}};

/* c_stillness 정적 · 첫 번째 태엽: 이중 금빛 시계 고리(로마 눈금) · 멈춘 유리 조각 · 망토 속 별하늘 · 금 자수 · 흐르는 모래 */
EXU.c_stillness={
 pre(A){const g=m1G(A.B),t=A.t,b=A.bob*.8,hy=g.top+b-1,R=g.hf+4,freeze=Math.floor(t)%4===0?0:1;
  /* 바깥 큰 시계 고리 + 로마 숫자 눈금 */const arc=(r,w,col,al)=>{let lx=null,ly=null;for(let i=0;i<=48;i++){const aa=i*TAU/48;if(aa>1.25&&aa<2.35){lx=null;continue}const x=Math.cos(aa)*r,y=hy+Math.sin(aa)*r;if(lx!=null)A.L(lx,ly,x,y,col,w,al);lx=x;ly=y}};arc(R+3.4,.4,'#a07a30',.85);arc(R+2.4,.18,'#e8c878',.6);for(let i=0;i<12;i++){const a=i*TAU/12+(freeze?0:.02),x=Math.cos(a)*(R+2.9),y=hy+Math.sin(a)*(R+2.9),ca=Math.cos(a),sa=Math.sin(a);if(i===3||i===4)continue;const n=i%3===0?3:1;for(let k=0;k<n;k++){const o=(k-(n-1)/2)*.32;A.L(x-sa*o-ca*.4,y+ca*o-sa*.4,x-sa*o+ca*.4,y+ca*o+sa*.4,'#f0dca0',.14,.85)}}
  /* 빛살 (정지) */for(let i=0;i<16;i++){const a=i*TAU/16+.1,ca=Math.cos(a),sa=Math.sin(a),r0=R+3.8,r1=R+(i%2?6:8.5);A.P([[ca*r0-sa*.3,hy+sa*r0+ca*.3],[ca*r0+sa*.3,hy+sa*r0-ca*.3],[ca*r1,hy+sa*r1]],'#c8a0ff',.25)}
  /* 공중에 멈춘 유리 조각 (금 테) */for(let i=0;i<6;i++){const a=.15+i*.09,d=R+3.6+(i%3)*1.2+Math.sin(t*.5+i)*.15*freeze,x=Math.cos(a)*d,y=hy+Math.sin(a)*d,s2=.6+(i%2)*.4;A.P([[x,y-s2],[x+s2*.8,y+s2*.2],[x-s2*.2,y+s2]],'#e8e0ff',.5);A.L(x,y-s2,x+s2*.8,y+s2*.2,'#d8c088',.12,.8)}
  A.glow(0,hy,R+4,'#c8a0ff',.18)},
 post(A){const g=m1G(A.B),t=A.t,b=A.bob*.8,cy=g.core+b,any=A.any||0,ch=Math.max(any,A.eyeC),G='#e8d098';
  /* 후광: 광택 + 균열 */{const hy=g.top+b-1,R=g.hf+4;for(let i=0;i<10;i++){const a=-2.6+i*.12;A.R(Math.cos(a)*R-.15,hy+Math.sin(a)*R-.15,.3,.3,'#fff8e0',.8-i*.07)}A.L(Math.cos(.55)*R,hy+Math.sin(.55)*R,Math.cos(.55)*(R-2),hy+Math.sin(.55)*(R-2)+.3,'#fff8e0',.12,.6);A.L(Math.cos(.55)*(R-2),hy+Math.sin(.55)*(R-2)+.3,Math.cos(.7)*(R-3),hy+Math.sin(.7)*(R-3),'#fff8e0',.12,.5)}
  /* 망토 속 별하늘 */for(let i=0;i<14;i++){const x=((i*37.7)%1)*(g.hf*2+2)-g.hf-1,y=g.top+b+4+((i*53.3)%1)*(cy-g.top-b-2),tw=.5+.5*Math.sin(t*2+i*1.9);if(Math.abs(x)<1.8&&y>cy-3.5)continue;A.R(x-.12,y-.12,.25,.25,i%4?'#c8b8ff':'#ffffff',.35+tw*.55);if(i%5===0&&tw>.85)A.spark(x,y,.8,'#ffffff',tw-.6)}
  /* 금 자수 테: 두건 가장자리 + 망토 단 */{const hy=g.top+b+1.4;A.L(-4.2,hy+2.4,-3,hy-3,G,.15,.9);A.L(-3,hy-3,0,hy-5.6,G,.15,.9);A.L(0,hy-5.6,3,hy-3,G,.15,.9);A.L(3,hy-3,4.2,hy+2.4,G,.15,.9);A.C(0,hy-5.6,.3,'#fff6d8');
   A.L(-g.hf-1.4,cy+1.4,g.hf+1.4,cy+1.4,G,.18,.8);for(let x=-g.hf-.6;x<g.hf+1;x+=1.4){A.P([[x,cy+1.1],[x+.35,cy+1.4],[x,cy+1.7],[x-.35,cy+1.4]],G)}}
  /* 모래시계: 유리 광택 + 흐르는 모래 */{const hy=cy-1,q=(t*.6)%1;A.P([[-.7,hy-1.7],[.7,hy-1.7],[0,hy-.2]],'#d8c088',.9);A.P([[-.25-q*.5,hy+1.9],[.25+q*.5,hy+1.9],[0,hy+1.9-q*.9]],'#d8c088',.9);A.L(0,hy-.2,0,hy+1.9,'#f0dca0',.12,.9);A.L(-.85,hy-1.8,-.2,hy-.5,'#ffffff',.1,.6);A.glow(0,hy,1.6,'#fff0c8',.4)}
  /* 시간 조각 반짝임 */for(let i=0;i<10;i+=3){const a=i*TAU/10+(Math.floor(t)%4===0?0:t*.15),rr=g.hf+6+Math.sin(i*1.7)*1.4,X=Math.cos(a)*rr,Y=cy-2+Math.sin(a)*rr*.5;A.L(X,Y-1.2,X+.8,Y,'#ffffff',.12,.6);const q=(t*.5+i*.13)%1;if(q<.2)A.spark(X,Y,1,'#ffffff',1-q/.2)}}};
}

/* 챕터 4 익스트림 업그레이드 — 우주 테마: 각 보스의 시그니처(불꼬리·코로나·혜성꼬리·성운·성좌·강착원반·초신성·달·별실·항성)를 사실적이고 화려하게 */
{
/* 공용: 흔들리는 불꽃 혀(시작점 → 방향) */
const x4Flame=(A,x0,y0,dx,dy,L,w,col,al,ph)=>{const nx=-dy,ny=dx,pts=[],n=6;for(let i=0;i<=n;i++){const k=i/n,wv=Math.sin(A.t*7+ph+k*4)*k*1.1,ww=w*(1-k)*(1-k*.2);pts.push([x0+dx*L*k+nx*(ww+wv),y0+dy*L*k+ny*(ww+wv)])}for(let i=n;i>=0;i--){const k=i/n,wv=Math.sin(A.t*7+ph+k*4)*k*1.1,ww=w*(1-k)*(1-k*.2);pts.push([x0+dx*L*k-nx*(ww-wv),y0+dy*L*k-ny*(ww-wv)])}A.P(pts,col,al)};
/* 공용: 4방향 반짝임(십자 플레어) */
const x4Glint=(A,x,y,r,col,al)=>{A.L(x-r,y,x+r,y,col,.22,al);A.L(x,y-r,x,y+r,col,.22,al);A.R(x-.25,y-.25,.5,.5,'#ffffff',al)};
/* 공용: 호(arc)를 점선 없이 굵은 선으로 */
const x4Arc=(A,cx,cy,rx,ry,a0,a1,col,w,al,n)=>{n=n||10;let px=cx+Math.cos(a0)*rx,py=cy+Math.sin(a0)*ry;for(let i=1;i<=n;i++){const a=a0+(a1-a0)*i/n,X=cx+Math.cos(a)*rx,Y=cy+Math.sin(a)*ry;A.L(px,py,X,Y,col,w,al);px=X;py=Y}};

/* 1. 유성 사냥꾼: 대기권 돌입하는 운석 — 길게 타오르는 플라즈마 꼬리, 용암 균열이 흐르는 운석 갑주, 불타는 혜성창 */
const mtSpear=A=>{const t=A.t,b=A.bob*.5,wM=A.win('meteorRain'),wA=A.win(['spearVolley','huntersMark','skyLeap']),sh=A.shake(wM>.6?.25:0),lean=wA*1.2;
 const TH=m4Act(A,'thrust'),TW=m4Act(A,'throw'),aim=Math.atan2(A.look[1],A.look[0]),aw=Math.max(TH.w,TH.s);let ang=-Math.PI/2+.75-wM*.75-wA*.2+Math.sin(t*1.2)*.05;ang=ang*(1-aw)+aim*aw;if(TW.w>0)ang=ang*(1-TW.w)+(-Math.PI/2-.3)*TW.w;
 const ca=Math.cos(ang),sa=Math.sin(ang),push=-4*TH.w+10*(TH.ph==='s'?Math.sin(Math.min(1,TH.p/.35)*Math.PI/2)*(1-Math.max(0,TH.p-.5)*2):0),px=sh+8.6+lean+ca*push,py=-12+b+sa*push-TW.w*3,L=24;
 return {ca,sa,px,py,ex:px+ca*L*.62,ey:py+sa*L*.62,thrown:TW.ph==='s',wM,wA,sh,lean,b}};
EXU.c_s4_meteor={
 pre(A){const S=mtSpear(A),t=A.t,{b,sh,lean,wM}=S,hx=sh+lean*1.3,hy=-23.4+b;
  /* 몸 뒤 열기 */A.glow(sh+lean,-15+b,12,'#ff4a1a',.25);
  /* 투구에서 길게 뻗는 플라즈마 꼬리: 진홍 → 주황 → 금 → 백열 */
  const lay=[['#8a1a10',.55,1.25,1.15],['#ff4a1a',.75,1.05,.95],['#ffa040',.85,.8,.75],['#ffe6a0',.9,.5,.55]];
  for(let j=0;j<4;j++){const [col,al,wk,lk]=lay[j];for(let i=0;i<3;i++){const ang=Math.PI+.16+i*.14+Math.sin(t*1.7+i)*.04,L=(17+i*2.4+wM*6)*lk,dx=Math.cos(ang),dy=Math.sin(ang);x4Flame(A,hx-1+i*.3,hy-2.2+i*.9,dx,dy,L,(2.6-i*.5)*wk,col,al,i*1.7+j)}}
  for(let i=0;i<7;i++){const q=(t*1.5+i/7)%1,ang=Math.PI+.5+(i%3)*.18;A.spark(hx-2+Math.cos(ang)*q*22,hy-2+Math.sin(ang)*q*22+Math.sin(t*5+i)*.8,.8*(1-q),i%2?'#ffd08a':'#ff7a2a',1-q)}
  /* 창끝의 혜성 불꽃 (창대 뒤로 끌리는 꼬리) */
  if(!S.thrown){const {ex,ey,ca,sa}=S;for(const [col,al,w,L] of [['#ff4a1a',.6,2.2,11],['#ffa040',.75,1.5,9],['#fff0c0',.85,.8,6]])x4Flame(A,ex+ca*3,ey+sa*3,-ca,-sa,L+wM*4,w,col,al,ex);A.glow(ex+ca*2,ey+sa*2,7,'#ff7a2a',.6)}},
 post(A){const S=mtSpear(A),t=A.t,{b,sh,lean}=S,x0=sh+lean,top=-21+b,hot='#ffe8a0',pul=.6+.4*Math.sin(t*3);
  /* 운석 표면: 위쪽 모서리 반사광 + 미세 기공 */A.L(x0-4,top+.4,x0+4,top+.4,'#c8a8b0',.3,.6);A.L(x0-7.2,top+5,x0-4.2,top+.6,'#b89098',.3,.5);
  for(const [cx,cy] of [[-5.4,-18.4],[5.2,-11.6],[-1.6,-19.2],[2.6,-19],[-6,-10],[5.8,-17.2]]){A.C(x0+cx,cy+b,.32,'#0c080e',.8);A.R(x0+cx-.4,cy+b-.5,.4,.2,'#a88890',.7)}
  /* 용암 균열: 백열 심지 + 잔가지 */for(const [a,c2,d,e] of [[-4,-11,-1.4,-14],[-1.4,-14,-2.4,-18],[2,-10,3.4,-13.6],[3.4,-13.6,1.6,-17.4],[-5,-15,-3,-16],[-1.4,-14,1.2,-15.6],[3.4,-13.6,6,-12.4],[-2.4,-18,-4.4,-19.6]]){A.L(x0+a,c2+b,x0+d,e+b,'#ff5a1a',.6,.35);A.L(x0+a,c2+b,x0+d,e+b,hot,.2,.55+.4*pul)}
  /* 분화구 속 용암 */for(const [cx,cy,r] of [[-3.6,-12.4,1.1],[3.8,-16.6,.9],[.2,-10.2,.7]]){A.C(x0+cx+.15,cy+b+.15,r*.55,'#ff6a1a',.7*pul);A.L(x0+cx-r,cy+b-r*.4,x0+cx-r*.3,cy+b-r,'#c8a8b0',.22,.7)}
  /* 핵: 백열 + 렌즈 플레어 */A.C(x0,-15+b,.7,'#ffffff');x4Glint(A,x0,-15+b,2.6+pul,'#fff0c0',.7);
  /* 어깨 운석: 녹아 흐르는 테두리 */for(const s of [-1,1]){A.L(x0+s*5.4,top+5.2,x0+s*7.8,top+6.2,'#ff7a2a',.3,.8);A.L(x0+s*9.2,top+1.4,x0+s*10.2,top+4.2,'#ffd08a',.25,.7*pul);A.R(x0+s*8.2-.3,top+6.2,.6,.6+.8*((t*.8+(s>0?.5:0))%1),'#ff7a2a',.8)}
  /* 다리: 마그마 혈관 */for(const s of [-1,1]){const hx=s*3+sh,hy=-9+b;A.L(hx,hy+.4,hx+s*2.2,hy+3.8,'#ff7a2a',.25,.75);A.L(hx+s*2.2,hy+4.4,hx+s*.7,-.6,'#ff5a1a',.22,.6)}
  /* 바이저 빛 번짐 */{const hx=sh+lean*1.3,hy=-23.4+b;A.L(hx-3,hy+.1,hx+3,hy+.1,'#fff4e0',.2,.5+.3*pul);A.L(hx-3.2,hy-2,hx-1.4,hy-3.4,'#c8a8b0',.25,.6)}
  /* 창날: 백열 칼날 + 반짝임 */if(!S.thrown){const {ex,ey,ca,sa}=S;A.L(ex,ey,ex+ca*4.4,ey+sa*4.4,'#ffffff',.25,.85);x4Glint(A,ex+ca*4.8,ey+sa*4.8,1.6+pul*.8,'#ffe8a0',.9);A.glow(ex+ca*3,ey+sa*3,5,'#ffd08a',.6)}}};

/* 2. 일식의 눈: 개기일식 — 다이아몬드 링, 홍염 고리, 길게 뻗는 코로나 줄기, 세밀한 홍채 */
EXU.c_s4_eclipse={
 pre(A){const t=A.t,b=A.bob*1.2,wE=A.win('eclipseRing'),cy=-19+b,R=9.4;
  /* 코로나 줄기 (길고 가는 빛살, 천천히 회전) */for(let i=0;i<12;i++){const a=i*TAU/12+t*.05+(i%2)*.12,L=R+9+(i%3)*3+Math.sin(t*1.3+i*2)*1.2+wE*6,w=.9+(i%3===0?.5:0);const ca=Math.cos(a),sa=Math.sin(a),nx=-sa*w,ny=ca*w;A.P([[ca*R+nx,cy+sa*R+ny],[ca*R-nx,cy+sa*R-ny],[ca*L,cy+sa*L]],i%2?'#ffe8b0':'#ffb060',.22)}
  /* 넓게 번지는 코로나 */A.glow(0,cy,R+7,'#ffd08a',.45);
  /* 홍염: 림에서 솟는 고리 모양 불꽃 */for(let k=0;k<4;k++){const ac=k*TAU/4+.4+t*.08,sp=.32,h=3.6+Math.sin(t*1.6+k*2)*.8+wE*2;let px=0,py=0;for(let i=0;i<=10;i++){const q=i/10,a=ac-sp+sp*2*q,rr=R+.2+Math.sin(q*Math.PI)*h,X=Math.cos(a)*rr,Y=cy+Math.sin(a)*rr;if(i){A.L(px,py,X,Y,'#ff4a2a',1,.75);A.L(px,py,X,Y,'#ffb070',.4,.8)}px=X;py=Y}A.glow(Math.cos(ac)*(R+h),cy+Math.sin(ac)*(R+h),3,'#ff6a2a',.5)}},
 post(A){const t=A.t,b=A.bob*1.2,wE=A.win('eclipseRing'),wS=Math.max(A.win(['coronaFlare','penumbra','sunspotRain','solarGaze']),m4A(A,['glare','blink'])),ch=Math.max(wE,wS,A.eyeC),cy=-19+b,R=9.4;
  /* 원반 표면의 은은한 반사 */x4Arc(A,0,cy,R-1.8,R-1.8,Math.PI*1.1,Math.PI*1.45,'#5a4a6a',.35,.7,6);
  /* 금빛 테 각인 */for(let i=0;i<16;i++){const a=i*TAU/16+t*.15;A.R(Math.cos(a)*(R+.5)-.2,cy+Math.sin(a)*(R+.5)-.2,.4,.4,'#fff8e0',.95)}
  /* 다이아몬드 링: 림 한 점에서 폭발하는 빛 + 베일리의 구슬 */{const a=-Math.PI*.3+Math.sin(t*.4)*.25,X=Math.cos(a)*(R+.4),Y=cy+Math.sin(a)*(R+.4),pul=.7+.3*Math.sin(t*4);A.C(X,Y,1,'#ffffff');x4Glint(A,X,Y,4.5*pul+1.5,'#fff8e0',.9);A.L(X-2.6,Y-2.6,X+2.6,Y+2.6,'#ffe8b0',.18,.5);A.L(X-2.6,Y+2.6,X+2.6,Y-2.6,'#ffe8b0',.18,.5);A.glow(X,Y,6+pul*2,'#fff8e0',1);
   for(let i=1;i<=4;i++){const aa=a+i*.22*(i%2?1:-1)*(1+i*.3),k=.5+.5*Math.sin(t*5+i*2);A.R(Math.cos(aa)*(R+.4)-.3,cy+Math.sin(aa)*(R+.4)-.3,.6,.6,'#ffffff',.5+.5*k)}}
  /* 홍채: 방사형 결 + 금빛 안쪽 테 + 젖은 광택 */{const er=4.6+ch*.6,lx=A.look[0]*1.2,ly=A.look[1]*.8;if(!A.dm&&!A.blink){const ix=lx,iy=cy+ly,rx=er*.72,ry=er*.62;
   for(let i=0;i<14;i++){const a=i*TAU/14+.1;A.L(ix+Math.cos(a)*rx*.35,iy+Math.sin(a)*ry*.35,ix+Math.cos(a)*rx*.92,iy+Math.sin(a)*ry*.92,i%2?'#ff8a5a':'#8a0a18',.22,.75)}
   x4Arc(A,ix,iy,rx*.98,ry*.98,0,TAU,'#ffb060',.25,.6,14);A.E(ix-er*.25,iy-er*.32,er*.36,er*.18,'#ffffff',.35);A.C(ix+er*.3,iy+er*.25,.25,'#ffffff',.8)}}
  /* 초승달 날개: 금박 가장자리 */for(const s of [-1,1]){const x=s*(R+3),y=cy+1;A.L(x-s*.6,y-6,x+s*2.6,y-2,'#ffd98a',.3,.9);A.L(x+s*2.6,y-2,x+s*3,y+2,'#ffd98a',.3,.9);A.L(x+s*3,y+2,x+s*.6,y+6,'#ff9a3a',.3,.8);A.C(x+s*1.8,y,.45,'#ffffff',.9)}}};

/* 3. 혜성 뱀: 얼음 혜성 — 길게 갈라지는 이온 꼬리(청색)·먼지 꼬리(백금), 결정 비늘, 머리의 코마 */
const ctSeg=A=>{const t=A.t,b=A.bob*1.1,seg=[];for(let i=0;i<22;i++){const k=i/21,a=k*TAU*1.05+t*.6,rx=8-k*2,x=Math.cos(a)*rx-k*5,y=-10+Math.sin(a)*3.6+b-k*2+(k>.8?(k-.8)*20:0);seg.push([x,y,2.6-k*1.6])}return seg};
const ctHead=A=>{const b=A.bob*1.1,wT=A.win('cometTail');return [4+A.look[0]*.8,-24+b-wT*2.4]};
EXU.c_s4_comet={
 pre(A){const t=A.t,wT=A.win('cometTail'),seg=ctSeg(A),[tx,ty]=seg[seg.length-1],[hx,hy]=ctHead(A),dx=-.86,dy=-.5,nx=-dy,ny=dx;
  /* 혜성 꼬리: 부채꼴로 퍼지는 얇은 빛줄기들 (이온=청, 먼지=백금) */
  for(let i=0;i<9;i++){const f=(i-4)/4,L=(15+9*(1-Math.abs(f))+Math.sin(t*2+i*1.7)*1.4+wT*6),cv=f*.32,ex=tx+(dx+nx*cv)*L,ey=ty+(dy+ny*cv)*L+(f>0?f*f*3:0);
   A.L(tx+nx*f*.6,ty+ny*f*.6,ex,ey,i%3===1?'#fff0d0':i%2?'#6ad8ff':'#bff4ff',Math.abs(f)<.3?.5:.3,Math.abs(f)<.3?.5:.3)}
  for(let i=0;i<12;i++){const q=(t*1.1+i/12)%1,L=q*(20+wT*6),f=Math.sin(i*7.3)*.3*q;A.spark(tx+(dx+nx*f)*L,ty+(dy+ny*f)*L,.8*(1-q*.6),i%3?'#bff4ff':'#ffffff',(1-q)*.95)}
  A.glow(tx,ty,6+wT*4,'#8ae8ff',.6);
  /* 머리 코마: 차가운 빛무리 + 뒤로 흩날리는 서리 */A.glow(hx+1,hy-.6,9,'#8ae8ff',.55);
  for(let i=0;i<5;i++){const a=Math.PI+.35+i*.12,L=8+i*1.6+Math.sin(t*2+i)*1;A.L(hx-.8,hy-2+i*.3,hx-.8+Math.cos(a)*L,hy-2+Math.sin(a)*L*.7,'#bff4ff',.25,.35*(1-i*.12))}},
 post(A){const t=A.t,seg=ctSeg(A),[hx,hy]=ctHead(A);
  /* 결정 비늘: 면 하이라이트 + 내부 빛 */for(let i=0;i<seg.length;i+=2){const [x,y,r]=seg[i],tw=.5+.5*Math.sin(t*3+i);A.P([[x-r*.7,y-r*.2],[x-r*.1,y-r*.8],[x+r*.1,y-r*.3]],'#ffffff',.38);A.C(x+r*.15,y+r*.15,r*.32,'#8ae8ff',.35+tw*.3);if(i%4===0)x4Glint(A,x-r*.3,y-r*.6,.9+tw*.8,'#e8fcff',tw*.9)}
  /* 목 비늘 광택 */{const b=A.bob*1.1;for(let i=1;i<6;i++){const k=i/5,x=2+(hx-2)*k+Math.sin(k*3+t)*.5,y=-12+b+(hy+4-(-12+b))*k;A.R(x-1,y-1.4,1.2,.4,'#e8fcff',.55)}}
  /* 수정 볏: 투명한 결정 가장자리 + 반짝임 */for(let i=0;i<5;i++){const a=-Math.PI/2-.9+i*.12,L=3.2+i*.5,bx=hx-2+i*.9,by=hy-2.4;A.L(bx,by,bx+Math.cos(a)*L,by+Math.sin(a)*L,'#ffffff',.22,.8)}x4Glint(A,hx+1.6,hy-6.6,1.4+.6*Math.sin(t*4),'#ffffff',.9);
  /* 해골 머리: 얼음 광택 + 눈 냉광 */A.P([[hx-2.4,hy-2.2],[hx,hy-3],[hx+3.6,hy-1.8],[hx,hy-2.4]],'#e8fcff',.6);if(!A.dm&&!A.blink){A.glow(hx+.9,hy-1,3,'#bff4ff',.8);A.L(hx+1.8,hy-1.2,hx+4,hy-1.8,'#bff4ff',.2,.6)}}};

/* 4. 성운 고래: 별바다 — 몸 밖으로 흘러넘치는 성운 가스, 은하 소용돌이를 품은 몸, 빛으로 된 거대한 지느러미 */
EXU.c_s4_nebula={
 pre(A){const t=A.t,b=A.bob*1.4,wN=A.win('nebulaTide'),cy=-17+b,sw=Math.sin(t*.8);
  /* 뒤로 흘러가는 성운 가스 (부드러운 빛) */for(let i=0;i<6;i++){const q=(t*.08+i/6)%1,x=-8-q*16,y=cy-2+Math.sin(i*2.1+t*.6)*3-q*3;A.glow(x,y,4+q*5,['#ff8ad8','#6ad8ff','#b08aff'][i%3],.8*(1-q))}
  A.glow(2,cy,16,'#6a5ac8',.55);A.glow(-6,cy-3,10,'#ff8ad8',.4);
  /* 빛의 꼬리지느러미: 원래 꼬리를 감싸는 더 큰 빛의 막 (외곽선 + 지느러미 살) */{const tx=-13,ty=cy-3+sw*1.4,o=[tx-1,ty],K=1.75,F=[[tx-6,ty-6+sw],[tx-4,ty-1],[tx-6.4,ty+3.4-sw],[tx-1.6,ty+.4]].map(p=>[o[0]+(p[0]-o[0])*K,o[1]+(p[1]-o[1])*K]),E=[o].concat(F);
   for(let i=0;i<E.length-1;i++)A.L(E[i][0],E[i][1],E[i+1][0],E[i+1][1],i%2?'#ffb8ec':'#d8c8ff',.35,.75);
   for(const [p,c2] of [[F[0],'#ffb8ec'],[F[2],'#b8e8ff']]){for(let k=1;k<=3;k++){const q=k/4;A.L(o[0],o[1],o[0]+(p[0]-o[0])*.95+(F[1][0]-p[0])*q*.6,o[1]+(p[1]-o[1])*.95+(F[1][1]-p[1])*q*.6,c2,.2,.45)}A.R(p[0]-.35,p[1]-.35,.7,.7,'#ffffff',.7+.3*Math.sin(t*3+p[1]));A.glow(p[0],p[1],2.4,c2,.7)}}
  /* 별가루 띠 (몸 뒤로 도는 반쪽) */for(let i=0;i<14;i++){const a=t*.3+i*TAU/14,X=2+Math.cos(a)*16,Y=cy+Math.sin(a)*5.4,k=.5+.5*Math.sin(t*3+i);if(Math.sin(a)<0)A.R(X-.2,Y-.2,.4,.4,i%2?'#f4eeff':'#ffb8ec',.4+k*.5)}},
 post(A){const t=A.t,b=A.bob*1.4,wN=A.win('nebulaTide'),cy=-17+b;
  /* 몸 속 은하 소용돌이 */{const gx=1,gy=cy-2.4,rot=t*.5;A.E(gx,gy,4.6,2.2,'#ff8ad8',.18);A.E(gx,gy,2.4,1.2,'#ffe0f4',.35);for(let arm=0;arm<2;arm++)for(let i=0;i<9;i++){const k=i/8,a=rot+arm*Math.PI+k*3.4,r=.8+k*5,X=gx+Math.cos(a)*r,Y=gy+Math.sin(a)*r*.42;A.R(X-.25,Y-.25,.5,.5,k<.5?'#ffffff':arm?'#6ad8ff':'#ffb8ec',.85-k*.45)}A.C(gx,gy,.6,'#ffffff');A.glow(gx,gy,4+wN*3,'#ffb8ec',.6)}
  /* 반짝이는 큰 별 (십자 플레어) */for(const [x,y,ph] of [[-6,cy-4.6,0],[7.4,cy-4.2,2],[-2.6,cy-.4,4],[10,cy-1.2,1]]){const k=.5+.5*Math.sin(t*2.4+ph);x4Glint(A,x,y,.8+k*1.2,'#f4eeff',.5+k*.5)}
  /* 등줄기 광택 */x4Arc(A,1,cy+1,11.4,8.6,-Math.PI*.88,-Math.PI*.2,'#d8c8ff',.35,.55,10);
  /* 옆선 발광점 (생물발광) */for(let i=0;i<9;i++){const x=-8+i*2.3,y=cy+2.2-i*.18,k=.5+.5*Math.sin(t*3-i*.7);A.R(x-.22,y-.22,.44,.44,'#6ad8ff',.5+k*.5)}
  /* 눈: 촉촉한 광택 */{const ex=8.2,ey=cy-2;if(!A.dm&&!A.blink){A.R(ex-.6,ey-.4,.4,.4,'#ffffff',.9);A.glow(ex,ey,2.4,'#b08aff',.6)}A.L(ex-1.4,ey+1.4,ex+1.2,ey+1.6,'#6a5ac8',.25,.7)}}};

/* 5. 쌍둥이 성좌: 등 뒤에 떠오르는 쌍둥이자리 별자리, 별을 박은 가면 테, 은하가 비치는 망토 */
EXU.c_s4_gemini={
 pre(A){const t=A.t,b=A.bob,wM=A.win('mirrorTwin'),sp=wM*3.2,cy=-17+b;
  for(const s of [-1,1]){const ac=s<0?'#ff9ad5':'#8ae8ff',o=s*sp,N=[[s*3+o,cy-17],[s*7+o,cy-13],[s*11+o,cy-8],[s*10+o,cy+1],[s*13+o,cy+7],[s*8+o,cy+4],[s*7+o,cy+14],[s*12+o,cy+15]],lk=[[0,1],[1,2],[2,3],[3,4],[3,5],[5,6],[4,7]];
   for(const [a,c2] of lk)A.L(N[a][0],N[a][1],N[c2][0],N[c2][1],ac,.22,.4);
   for(let i=0;i<lk.length;i++){const q=(t*.6+i*.37)%1,[a,c2]=lk[i];A.R(N[a][0]+(N[c2][0]-N[a][0])*q-.25,N[a][1]+(N[c2][1]-N[a][1])*q-.25,.5,.5,'#ffffff',.8)}
   N.forEach(([x,y],i)=>{const k=.5+.5*Math.sin(t*2.6+i+s);m4Star(A,x,y,(i===0?1.5:.8)+k*.3,i===0?'#ffffff':ac,.9);A.glow(x,y,i===0?3.4:1.8,ac,.5+k*.3)})}
  A.L(-3-sp,cy-17,3+sp,cy-17,'#f8f0ff',.2,.45)},
 post(A){const t=A.t,b=A.bob,wM=A.win('mirrorTwin'),sp=wM*3.2,cy=-17+b;
  for(const s of [-1,1]){const ac=s<0?'#ff9ad5':'#8ae8ff',x0=s*(4+sp);
   /* 망토 속 은하 */A.E(x0+s*2.6,cy+5,1.8,4.6,ac,.12);m4Speck(A,x0+(s<0?-5:.4),cy-1,x0+(s<0?-.4:5),cy+11,8,s+5,'#ffffff',1);
   /* 망토 금속 테두리 + 보석 징 */{const E=[[x0+s*4.2,cy-1.6],[x0+s*5,cy+8],[x0+s*2.4,cy+12]];A.L(E[0][0],E[0][1],E[1][0],E[1][1],ac,.3,.85);A.L(E[1][0],E[1][1],E[2][0],E[2][1],ac,.3,.85);for(let i=0;i<4;i++){const q=i/3,X=E[0][0]+(E[1][0]-E[0][0])*q,Y=E[0][1]+(E[1][1]-E[0][1])*q;A.R(X-.3,Y-.3,.6,.6,'#ffffff',.9)}}
   /* 가면: 별을 박은 테 + 이마 보석 + 광택 */{const hx=x0+s*1.4,hy=cy-9.2;A.push(1.45,hx,hy+3);for(let i=0;i<14;i++){const a=i*TAU/14+t*.2,X=hx+Math.cos(a)*2.85,Y=hy+Math.sin(a)*3.45;A.R(X-.15,Y-.15,.3,.3,i%2?ac:'#ffffff',.85)}
    m4Star(A,hx,hy-2.6,.8,ac,1);A.R(hx-.12,hy-2.72,.24,.24,'#ffffff');if(s<0)A.E(hx-.9,hy-1.8,.8,.4,'#ffffff',.55);else{A.E(hx-.9,hy-1.8,.8,.4,'#8ae8ff',.3);const q=(t*.7)%1;for(const e of [-1,1])A.R(hx+e*1.5-.15,hy+1+q*2.6,.3,.4,'#e8fcff',1-q)}A.pop()}
   const k=.5+.5*Math.sin(t*3+s);x4Glint(A,x0+s*3.6,cy+2.6,1.2+k,ac,.8)}
  /* 사슬 가운데 보석 */A.C(0,cy-8,.7,'#ffffff');A.glow(0,cy-8,3,'#f8f0ff',.7)}};

/* 6. 블랙홀 방랑자: 뒤에 펼쳐진 거대 강착원반, 머리 위로 휘어 보이는 중력렌즈 고리, 빨려드는 별빛 */
EXU.c_s4_void={
 pre(A){const t=A.t,b=A.bob*.8,wG=A.win('gravityWell'),cy=-16+b,hy=cy-8,fy=hy+.6,spin=t*(1+wG*4);
  /* 아인슈타인 고리 (렌즈로 휘어진 배경빛) */A.ring(0,fy,10.4+wG*1.4,.5,'#c8a0ff',.25);A.ring(0,fy,12.6,.3,'#ffd0a0',.12);
  /* 거대 강착원반: 회전하는 플라즈마 띠 (다가오는 쪽이 더 밝음) */for(let j=0;j<4;j++){const rx=10.4+j*1.6+wG*2,ry=2.4+j*.45,n=28;let px=0,py=0;for(let i=0;i<=n;i++){const a=i*TAU/n,X=Math.cos(a)*rx,Y=fy+3.4+Math.sin(a)*ry-Math.cos(a)*1.1;if(i){const dop=.5-.5*Math.cos(a-.4),fl=.6+.4*Math.sin(a*3-spin*(3-j*.5)+j);A.L(px,py,X,Y,j===0?(dop>.6?'#fff0e0':'#ffb070'):j===1?'#ff9a4a':j===2?'#d86a8a':'#8a4ac8',j===0?.45:.35,(.25+dop*.6)*fl*(1-j*.15))}px=X;py=Y}}
  /* 중력 렌즈: 원반 뒤편이 머리 위로 휘어 올라감 */{const rx=8.4+wG,ry=(7.2+wG)*.9,n=14;let px=0,py=0;for(let i=0;i<=n;i++){const a=Math.PI+i*Math.PI/n,X=Math.cos(a)*rx,Y=fy-.6+Math.sin(a)*ry;if(i){const k=.6+.4*Math.sin(spin*2+i);A.L(px,py,X,Y,'#ff9a4a',.6,.35*k+.15);A.L(px,py,X,Y,i<n/2?'#fff0e0':'#ffc890',.25,.5*k+.2)}px=X;py=Y}}
  /* 나선으로 빨려드는 별빛 */for(let arm=0;arm<3;arm++)for(let i=0;i<7;i++){const q=((t*.25+i/7)%1),a=arm*TAU/3+spin*.4+q*4,r=(1-q)*18+3;A.R(Math.cos(a)*r-.2,fy+Math.sin(a)*r*.55-.2,.4+q*.3,.4,q>.6?'#fff0e0':'#b86aff',.25+q*.55)}
  A.glow(0,fy,16+wG*6,'#5a2a9a',.35)},
 post(A){const t=A.t,b=A.bob*.8,wG=A.win('gravityWell'),wP=Math.max(A.win(['eventHorizon','spaghettify','darkMatter','wanderHoles']),m4A(A,'pull')),ch=Math.max(wG,wP,A.eyeC),cy=-16+b,hy=cy-8,fy=hy+.6,spin=t*(1+wG*4);
  /* 얼굴 블랙홀: 광자 고리 + 위아래 렌즈 호 + 도플러 밝기 */A.ring(0,fy,2.75+ch*.4,.2,'#ffffff',.85);
  x4Arc(A,0,fy,3.9,3.4,Math.PI*1.08,Math.PI*1.92,'#ffb070',.35,.85,10);x4Arc(A,0,fy,3.9,3.4,Math.PI*1.25,Math.PI*1.6,'#fff0e0',.2,.8,5);x4Arc(A,0,fy+.2,3.6,2.4,Math.PI*.15,Math.PI*.85,'#ff9a4a',.25,.55,8);
  A.P([[-5.8,fy-.2],[-3.2,fy+.3],[-3.2,fy+1],[-5.8,fy+1.1]],'#fff0e0',.55);A.glow(-4.4,fy+.5,3,'#fff0e0',.6);
  /* 두건 테: 보랏빛 실 자수 */A.L(-6.4,hy+4.8,-5.6,hy-1,'#b86aff',.22,.7);A.L(-5.6,hy-1,-3.8,hy-4.4,'#b86aff',.22,.7);A.L(6.4,hy+4.8,5.4,hy-2,'#b86aff',.22,.7);
  /* 로브 밑단: 별빛으로 분해되어 빨려 올라감 */for(const [x,y] of [[7,cy+14],[3,cy+15],[-3,cy+15.4],[-7.4,cy+14],[0,cy+12]]){A.R(x-.25,y-.6,.5,.6,'#b86aff',.8);for(let i=0;i<2;i++){const q=(t*.6+i*.5+x*.07)%1,X=x*(1-q),Y=y+(fy-y)*q+Math.sin(q*6+x)*1.2;A.R(X-.2,Y-.2,.4,.4,q>.7?'#fff0e0':'#b86aff',(1-q)*.8)}}
  /* 로브 속 별무늬 */m4Speck(A,-6,cy-3,6,cy+10,10,7,'#d8b8ff',1);
  /* 가슴의 작은 특이점 */A.ring(0,cy+1,1.7,.2,'#ff9a4a',.6+.3*Math.sin(t*4));x4Glint(A,1.4,cy,.9+.5*Math.sin(t*3),'#fff0e0',.7)}};

/* 7. 초신성 기사: 타오르는 망토, 금테 두른 흑철 갑옷, 별빛 균열이 백열로 끓는 흉갑, 거대한 불꽃 깃털 */
const nvSword=A=>{const b=A.bob*.4,wN=A.win('novaBurst'),wS=A.win(['flarePlunge']),sh=A.shake(wN>.5?.3:0);const SL=m4Act(A,'slash'),PL=m4Act(A,'plunge'),GD=m4Act(A,'guard');let up=Math.max(wS,GD.w,GD.s),gx=sh-9.6,gy=-8+b-up*6,ang=Math.PI/2-up*.9-GD.w*1.6;
 if(SL.ph==='w'){ang=Math.PI/2-SL.w*2.8;gy=-12+b-SL.w*4;gx=sh-8}if(SL.ph==='s'){const k=Math.min(1,SL.p/.28);ang=Math.PI/2-2.8+3.3*k;gy=-12+b-4*(1-k);gx=sh-8}
 if(PL.ph==='w'){ang=-Math.PI/2;gy=-10+b-PL.w*8;gx=sh-6}if(PL.ph==='s'){const k=Math.min(1,PL.p/.18);ang=-Math.PI/2+Math.PI*k;gy=-18+b+k*9;gx=sh-6}return {gx,gy,ca:Math.cos(ang),sa:Math.sin(ang),up}};
EXU.c_s4_nova={
 pre(A){const t=A.t,b=A.bob*.4,wN=A.win('novaBurst'),sh=A.shake(wN>.5?.3:0),top=-23+b;
  /* 타오르는 망토 */{const sw=Math.sin(t*1.3)*.6,L=[[sh-6.6,top+2],[sh-11+sw,-6],[sh-12+sw,-.4],[sh-6,-.8],[sh,-.2],[sh+6,-.8],[sh+12+sw,-.4],[sh+11+sw,-6],[sh+6.6,top+2]];
   A.P(L,'#2a0604');A.P(L.map(p=>[sh+(p[0]-sh)*.88,p[1]+(p[1]<-2?.4:-.6)]),'#7a140a');A.P([[sh-5,top+3],[sh-8.6+sw,-4],[sh-2,-2],[sh+2,-2],[sh+8.6+sw,-4],[sh+5,top+3]],'#b8280c',.55);
   for(let i=0;i<11;i++){const x=sh-11+i*2.2+sw*(1-Math.abs(i-5)/5),h=2+Math.sin(t*6+i*1.9)*.9+(i%2)*1.2+wN*2;x4Flame(A,x,-.6,.15*Math.sin(i),-1,h+1.4,1.1,'#ff5a1a',.8,i);x4Flame(A,x,-.6,0,-1,h,.6,'#ffd166',.9,i+1)}
   for(const s of [-1,1]){A.L(sh+s*6.6,top+2.4,sh+s*11+sw,-6,'#ffd166',.3,.8);A.L(sh+s*11+sw,-6,sh+s*12+sw,-.6,'#ffd166',.3,.8)}}
  /* 거대 불꽃 깃털 (투구 뒤) */{const hx=sh,hy=-26+b;for(const [col,al,wk,lk] of [['#c8300c',.6,1.3,1.2],['#ff7a1a',.8,1,1],['#ffd166',.9,.65,.8],['#fffbe8',.95,.3,.55]])for(let i=0;i<3;i++){const ang=-Math.PI/2-.55+i*.32+Math.sin(t*2+i)*.06;x4Flame(A,hx-1+i*.9,hy-2.6,Math.cos(ang),Math.sin(ang),(9+i*1.5-(i===2?3:0)+wN*4)*lk,1.6*wk,col,al,i*2.3)}}
  A.glow(sh,-16+b,13+wN*6,'#ff7a1a',.3)},
 post(A){const t=A.t,b=A.bob*.4,wN=A.win('novaBurst'),sh=A.shake(wN>.5?.3:0),x0=sh,top=-23+b,G='#ffd166',pul=.6+.4*Math.sin(t*4);
  /* 흉갑 금테 */{const P=[[x0-6,-10+b],[x0-7.4,top+4],[x0-3.4,top],[x0+3.4,top],[x0+7.4,top+4],[x0+6,-10+b]];for(let i=0;i<P.length-1;i++)A.L(P[i][0]*.94+x0*.06,P[i][1]+.25,P[i+1][0]*.94+x0*.06,P[i+1][1]+.25,G,.28,.9);A.L(x0-5.6,-10.6+b,x0+5.6,-10.6+b,'#c88a30',.3,.9)}
  /* 흉갑 양각: 태양 문장 */for(let i=0;i<8;i++){const a=i*TAU/8+t*.3,r=3.2+wN;A.L(x0+Math.cos(a)*2.4,-16+b+Math.sin(a)*2.4,x0+Math.cos(a)*r,-16+b+Math.sin(a)*r,'#ffe8a0',.2,.45)}
  /* 백열 핵: 균열 속이 끓어오름 */A.C(x0,-16+b,.8+wN*.4,'#ffffff');x4Glint(A,x0,-16+b,3.6+pul*1.6+wN*3,'#fffbe8',.85);for(let i=0;i<4;i++){const q=(t*1.4+i/4)%1,a=i*1.7+1;A.R(x0+Math.cos(a)*q*4-.2,-16+b+Math.sin(a)*q*4-.2,.4,.4,'#ffd166',1-q)}
  /* 견갑: 금테 + 태양석 */for(const s of [-1,1]){A.L(x0+s*5,top+1,x0+s*10,top+1.6,G,.3,.9);A.L(x0+s*10,top+1.6,x0+s*10.4,top+5.4,'#c88a30',.3,.85);A.C(x0+s*8,top+3.6,.75,G);A.C(x0+s*8,top+3.6,.35,'#ffffff');A.glow(x0+s*8,top+3.6,2.4,'#ff7a1a',.6)}
  /* 다리 판금: 금 띠 + 끓는 이음새 */for(const s of [-1,1]){const x=s*2.8+sh;A.L(x-2,-5.2,x+2,-5.2,G,.25,.85);A.L(x,-8,x+s*.4,-4,'#fffbe8',.18,.5+.4*pul)}
  /* 투구 금테 + 슬릿 빛 번짐 */{const hx=sh,hy=-26+b;A.L(hx-3.4,hy-1.8,hx-1.8,hy-3.6,G,.28,.9);A.L(hx-1.8,hy-3.6,hx+1.8,hy-3.6,G,.28,.9);A.L(hx+1.8,hy-3.6,hx+3.4,hy-1.8,G,.28,.9);if(!A.dm){x4Glint(A,hx,hy-.1,2.4+pul,'#fffbe8',.7)}}
  /* 대검: 불타는 칼날 */{const {gx,gy,ca,sa,up}=nvSword(A);A.L(gx+ca*2,gy+sa*2,gx+ca*10.6,gy+sa*10.6,'#fffbe8',.25,.8);for(let i=0;i<4;i++){const k=.3+i*.2;x4Flame(A,gx+ca*11*k,gy+sa*11*k,-.3*ca,-1,1.6+Math.sin(t*7+i)*.5+up*1.4,.45,i%2?'#ff7a1a':'#ffd166',.7,i*3)}A.C(gx-ca*1.6,gy-sa*1.6,.45,'#ffffff');A.glow(gx+ca*6,gy+sa*6,4,'#ff7a1a',.4)}}};

/* 8. 달의 여왕: 등 뒤에 뜬 창백한 만월, 은빛 초승달 세공(필리그리)의 드레스, 진주와 월장석 */
EXU.c_s4_luna={
 pre(A){const t=A.t,b=A.bob*1.1,wP=A.win('moonPhase'),cy=-18+b,mx=0,my=cy-10;
  /* 등 뒤의 거대한 초승달 빛: 달빛 후광 + 밝은 테(빛 받는 쪽) + 희미한 바다 무늬 */A.glow(mx,my,15+wP*6,'#c8d8ff',.55+wP*.3);
  for(const [r,w,al] of [[11.4,.6,.9],[10.6,.3,.5]])x4Arc(A,mx,my,r,r,Math.PI*.62+Math.sin(t*.3)*.05,Math.PI*1.75,'#eef4ff',w,al,16);
  x4Arc(A,mx,my,11.4,11.4,Math.PI*1.75,Math.PI*2.62,'#8ab8ff',.25,.35,10);
  /* 은빛 베일 (왕관 뒤에서 흘러내림) */for(const s of [-1,1]){const sw=Math.sin(t*.9+s)*.6;A.P([[s*3,cy-15],[s*7,cy-10],[s*10+sw,cy+6],[s*8.4+sw,cy+15],[s*5,cy+8],[s*3,cy-6]],'#c8d4ea',.14);A.L(s*7,cy-10,s*10+sw,cy+6,'#eef4ff',.2,.5);m4Speck(A,s>0?4:-10,cy-6,s>0?10:-4,cy+12,5,s+9,'#ffffff',1)}},
 post(A){const t=A.t,b=A.bob*1.1,wP=A.win('moonPhase'),cy=-18+b,S3='#eef4ff',BL='#8ab8ff';
  /* 흉갑 은세공: 초승달 소용돌이 + 테두리 */A.L(-4.2,cy-2.6,4.2,cy-2.6,S3,.25,.9);A.L(-4.4,cy-2.6,-6.2,cy+3.8,'#c8d4ea',.25,.85);A.L(4.4,cy-2.6,6.2,cy+3.8,'#c8d4ea',.25,.85);A.L(-6.2,cy+3.9,0,cy+5.2,'#c8d4ea',.25,.8);A.L(6.2,cy+3.9,0,cy+5.2,'#c8d4ea',.25,.8);
  for(const s of [-1,1]){m4Cres(A,s*3.6,cy+1.2,1.3,1.1,s*.6,-.3,S3,.9);x4Arc(A,s*2.2,cy+3.4,1,.8,s<0?0:Math.PI,s<0?Math.PI*1.5:Math.PI*2.5,'#c8d4ea',.2,.8,5);A.C(s*4.8,cy+3,.3,'#ffffff')}
  /* 월장석 브로치 (면 반사) */A.C(0,cy,1.25,'#2e3a54');A.C(0,cy,1,BL);A.P([[-.7,cy-.3],[0,cy-.9],[.2,cy-.2]],'#ffffff',.75);A.C(.3,cy+.4,.25,'#e8f4ff');A.ring(0,cy,1.4,.25,S3);
  /* 진주 목걸이 */for(let i=0;i<7;i++){const a=Math.PI*.15+i*Math.PI*.7/6,X=Math.cos(a)*3.2,Y=cy-3.6+Math.sin(a)*1.6;A.C(X,Y,.32,'#f4f8ff');A.R(X-.15,Y-.2,.15,.15,'#ffffff')}
  /* 왕관: 은 각인 + 끝의 보석 + 늘어진 진주 줄 */{const hy=cy-14.6,R=6.2;x4Arc(A,0,hy,R-.3,R-.3,Math.PI*.1,Math.PI*.9,'#ffffff',.2,.7,10);for(const s of [-1,1]){const tx=s*R*.95+Math.cos(-Math.PI/2-s*.4)*4.4,ty=hy-.4+Math.sin(-Math.PI/2-s*.4)*4.4;A.C(tx,ty+.4,.55,BL);A.R(tx-.25,ty+.1,.25,.25,'#ffffff');A.glow(tx,ty,2,BL,.6);
   for(let i=0;i<4;i++)A.C(s*(R*.9-.4*i),hy+1.6+i*1.1+Math.sin(t*1.2+i)*.1,.25,'#f4f8ff',.9)}const k=.5+.5*Math.sin(t*2.2);x4Glint(A,0,hy-5.4,1.2+k*1.4,'#ffffff',.9)}
  /* 은빛 머리칼: 빛 가닥 */for(const s of [-1,1])for(let i=0;i<3;i++){const x=s*(3+i*.9),q=(t*.3+i*.33+(s>0?.5:0))%1;A.L(x,cy-10.6,x+s*(.8+i*.5),cy-2+i*1.4,'#ffffff',.18,.45);A.R(x+s*(.8+i*.5)*q-.2,cy-10.6+(8.6+i*1.4)*q-.2,.4,.4,'#ffffff',.8*(1-q))}
  /* 도자기 얼굴: 유약 광택 */A.E(-.9,cy-10.3,.9,.5,'#ffffff',.55);A.L(1.6,cy-11.6,.6,cy-9,'#c8d4ea',.15,.6);
  /* 드레스 자락: 은사 자수 + 서리 반짝임 */for(let i=-5;i<=5;i+=2){const x=i*1.3,L=11+Math.sin(i*1.3)*1.6;A.L(x,cy+3,x*1.3,cy+L*.8,'#c8d4ea',.15,.5)}for(let i=0;i<5;i++){const q=(t*.4+i/5)%1;A.spark(-6+i*3+Math.sin(i*3+t)*1,cy+4+q*9,.6,'#eef4ff',Math.sin(q*Math.PI))}}};

/* 9. 별자리 직조자: 베틀 전체에 걸린 황금 별실 거미줄(빛이 실을 타고 흐름), 금 상감 가면, 빛나는 바늘 다리 */
EXU.c_s4_weaver={
 pre(A){const t=A.t,b=A.bob*.9,wC=A.win('constellationNet'),cy=-19+b,cx=0,cyy=cy-1,n=12,R=[3.4,6.4,9.4];
  A.E(0,cy-1,12,10.6,'#3a2a5a',.25);m4Speck(A,-12,cy-11,12,cy+9,14,3,'#b89aff',1);
  const sp=i=>{const a=i*TAU/n+.13;return [Math.cos(a),Math.sin(a)*.92]};
  for(let i=0;i<n;i++){const [dx,dy]=sp(i);A.L(cx+dx*1.4,cyy+dy*1.4,cx+dx*11,cyy+dy*10.6,'#ffe9a8',.18,.35+wC*.4);const q=(t*.5+i*.31)%1;A.R(cx+dx*11*q-.25,cyy+dy*10.6*q-.25,.5,.5,'#ffffff',.9*Math.sin(q*Math.PI))}
  for(let r=0;r<R.length;r++)for(let i=0;i<n;i++){const [a0,b0]=sp(i),[a1,b1]=sp((i+1)%n),rr=R[r]+Math.sin(t*1.2+i+r)*.15;A.L(cx+a0*rr,cyy+b0*rr,cx+a1*rr,cyy+b1*rr,r%2?'#b89aff':'#ffe9a8',.15,.4+wC*.4)}
  A.glow(0,cyy,12,'#ffe9a8',.2+wC*.3)},
 post(A){const t=A.t,b=A.bob*.9,wC=A.win('constellationNet'),wX=Math.max(A.win(['needleVolley','loomGrid','starStitch','starMaze']),m4A(A,'stitch')),ch=Math.max(wC,wX,A.eyeC),cy=-19+b,G='#ffe9a8';
  /* 베틀 틀: 금 상감 + 별 장식 */A.L(-12.6,cy-11.4,-12.6,cy+9.4,'#c8b06a',.25,.8);A.L(12.4,cy-11.4,12.4,cy+9.4,'#c8b06a',.25,.8);A.L(-12.6,cy-12.1,12.6,cy-12.1,'#c8b06a',.25,.8);for(const s of [-1,1]){const k=.5+.5*Math.sin(t*2+s);x4Glint(A,s*12.5,cy-15.4,1.2+k,'#fffbe8',.9)}
  /* 별 매듭: 회절 반짝임 (몇 개만, 번갈아) */{const pts=[[-10,cy-8],[-6,cy-10],[-8,cy-3],[-11,cy+3],[9,cy-9],[6,cy-4],[10,cy+1],[8,cy+6],[-5,cy+7],[0,cy-12]];pts.forEach(([x,y],i)=>{const k=Math.max(0,Math.sin(t*2.2+i*1.9));if(k>.3)x4Glint(A,x,y,.8+k*1.6+wC,'#fffbe8',k)})}
  /* 바늘 다리: 금 관절 고리 + 빛나는 바늘 끝 */for(const s of [-1,1])for(let i=0;i<3;i++){const a=(s<0?Math.PI:0)+s*(-.7+i*.55)+Math.sin(t*1.4+i+s)*.08+(wX>0?s*.2:0),kx=s*3+Math.cos(a)*6,ky=cy+Math.sin(a)*4-3,ex=kx+s*3+Math.cos(a)*2,ey=ky+7+i;
   A.L(s*2.4,cy-.3,kx,ky-.3,'#c8b06a',.2,.7);A.ring(kx,ky,.85,.25,G);A.L(kx,ky,ex,ey,'#a8986a',.2,.6);A.C(ex+Math.cos(Math.PI/2+s*.2)*1.6,ey+1.6,.3,'#ffffff');A.glow(ex,ey+1.6,1.6,G,.7)}
  /* 실타래 복부: 감긴 금실이 흐르며 빛남 */for(let i=0;i<6;i++){const y=cy+1.6+i*1.2,w=Math.sqrt(Math.max(0,1-((y-cy-4.6)/4.2)**2))*3.1;A.L(-w,y,w,y+.4,i%2?'#c8a8ff':G,.2,.85);const q=(t*.8+i*.23)%1;A.R(-w+2*w*q-.25,y+.4*q-.25,.5,.5,'#ffffff',.9)}A.E(-1.2,cy+2.4,1.2,.6,'#ffffff',.25);
  /* 가면: 금 상감 테 + 이마 문양 */{const hy=cy-2;A.L(-4.4,hy+2,-5,hy-1.6,G,.25,.85);A.L(-5,hy-1.6,-2.4,hy-4.6,G,.25,.85);A.L(4.4,hy+2,5,hy-1.6,G,.25,.85);A.L(5,hy-1.6,2.4,hy-4.6,G,.25,.85);A.L(-2.4,hy-4.4,2.4,hy-4.4,G,.25,.85);A.L(0,hy-4.2,0,hy-2.6,G,.2,.7);
   if(!A.dm&&!A.blink)for(const [ex,ey,r] of [[-2.6,hy-1.6,.7],[2.6,hy-1.6,.7],[-1.1,hy-.4,.9],[1.1,hy-.4,.9],[-1.8,hy+1,.5],[1.8,hy+1,.5]]){A.R(ex-r*.45,ey-r*.5,Math.max(.25,r*.3),Math.max(.25,r*.3),'#ffffff',.9)}
   const k=.5+.5*Math.sin(t*3);x4Glint(A,0,hy-7.8,1+k*1.2,'#fffbe8',.9)}
  /* 내려오는 실: 미끄러지는 별 구슬 */{const q=(t*.35)%1,y=cy+10.8+q*7;m4Star(A,0,y,.7,'#fffbe8',1-q*.5);A.glow(0,y,2,G,.7)}}};

/* 10. 마지막 별: 홍염 고리와 코로나 줄기를 두른 항성, 금박 테를 두른 성운 망토, 회절 광채의 별 왕관 */
EXU.c_s4_last={
 pre(A){const t=A.t,b=A.bob*.9,wL=A.win('lastStar'),sh=A.shake(wL>.6?.3:0),cy=-21+b,R=6.2+wL*.8;
  /* 망토 날개 속 성운 (날개가 이 위에 그려지므로 가장자리 너머로 번지는 빛) */for(const s of [-1,1]){A.E(sh+s*12,cy+1,7,9,s<0?'#ff9ad5':'#8ae8ff',.1);A.E(sh+s*14,cy-3,4,4,'#b08aff',.12)}
  /* 코로나 줄기 */for(let i=0;i<10;i++){const a=i*TAU/10+t*.04+(i%2)*.15,L=R+14+(i%3)*3+Math.sin(t*1.1+i)*1.4+wL*8,w=1.1,ca=Math.cos(a),sa=Math.sin(a);A.P([[sh+ca*R-sa*w,cy+sa*R+ca*w],[sh+ca*R+sa*w,cy+sa*R-ca*w],[sh+ca*L,cy+sa*L]],'#fff4c8',.16)}
  /* 홍염 고리 */for(let k=0;k<3;k++){const ac=k*TAU/3+1.1+t*.06,sp=.36,h=4+Math.sin(t*1.4+k*2)*.9+wL*2;let px=0,py=0;for(let i=0;i<=10;i++){const q=i/10,a=ac-sp+sp*2*q,rr=R+1+Math.sin(q*Math.PI)*h,X=sh+Math.cos(a)*rr,Y=cy+Math.sin(a)*rr;if(i){A.L(px,py,X,Y,'#ff9a5a',.8,.5);A.L(px,py,X,Y,'#fff4c8',.35,.7)}px=X;py=Y}}
  A.C(sh,cy,R+3,'#ffd98a',.16)},
 post(A){const t=A.t,b=A.bob*.9,wL=A.win('lastStar'),wM=A.any*(A.pn&&A.pn!=='lastStar'?1:0),ch=Math.max(wL,wM*.7,A.eyeC),sh=A.shake(wL>.6?.3:0),cy=-21+b,R=6.2+wL*.8;
  /* 망토 날개: 금박 외곽선 + 별자리 */for(const s of [-1,1]){const P=[[s*16+sh,cy-8+Math.sin(t*.6)*.8],[s*17+sh,cy+2],[s*14+sh,cy+10],[s*9+sh,cy+14+Math.sin(t+s)*.6]];for(let i=0;i<P.length-1;i++)A.L(P[i][0]-s*.4,P[i][1],P[i+1][0]-s*.4,P[i+1][1],'#ffd98a',.3,.85);A.L(s*4+sh,cy+2,P[0][0]-s*.6,P[0][1]+.4,'#ffd98a',.25,.7);
   const N=[[s*14,cy-4],[s*12,cy+1],[s*14.6,cy+5],[s*11,cy+9]];for(let i=0;i<N.length-1;i++)A.L(N[i][0]+sh,N[i][1],N[i+1][0]+sh,N[i+1][1],s<0?'#ff9ad5':'#8ae8ff',.18,.6);N.forEach(([x,y],i)=>m4Star(A,x+sh,y,.6+.3*Math.sin(t*3+i+s),'#ffffff',.9))}
  /* 항성 표면: 쌀알무늬(대류) + 주연감광 */for(let i=0;i<12;i++){const a=i*2.4+t*.15,r=(i%4+1)/4.6*R*.85,k=.5+.5*Math.sin(t*2+i*1.3);A.C(sh+Math.cos(a)*r,cy+Math.sin(a)*r,.55,'#ffd98a',.12+k*.12)}A.ring(sh,cy,R,.9,'#ffb060',.35);A.ring(sh,cy,R+.5,.3,'#ffffff',.6);
  /* 눈: 별빛 홍채 */if(!A.dm&&!A.blink)for(const s of [-1,1]){const ex=sh+s*2,ey=cy-.4;A.ring(ex+A.look[0]*.3,ey,.75,.22,ch>0?'#ffffff':'#8ae8ff',.85);A.R(ex+A.look[0]*.3-.55,ey-.5,.3,.3,'#ffffff')}
  /* 별 왕관: 회절 광채 */{const X=sh,Y=cy-R-5.6,k=.6+.4*Math.sin(t*2.6);A.L(X-5*k-2,Y,X+5*k+2,Y,'#ffffff',.25,.8);A.L(X,Y-4*k-1.6,X,Y+4*k+1.6,'#ffffff',.25,.8);A.L(X-2.4,Y-2.4,X+2.4,Y+2.4,'#fff4c8',.18,.55);A.L(X-2.4,Y+2.4,X+2.4,Y-2.4,'#fff4c8',.18,.55);A.glow(X,Y,5,'#ffffff',.9)}
  /* 왕관 가시 끝 반짝임 */for(let i=-3;i<=3;i++){const a=-Math.PI/2+i*.28,rr=R+1,L=2.4+(i===0?2.4:Math.abs(i)%2?0:1),q=Math.max(0,Math.sin(t*3+i*1.4));if(q>.4)x4Glint(A,sh+Math.cos(a)*(rr+L),cy+Math.sin(a)*(rr+L),.6+q,'#ffffff',q)}}};
}

