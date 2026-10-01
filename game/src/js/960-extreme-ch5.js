/* ===== 챕터 5 익스트림 업그레이드: 심해 보스 10명 — 각자 콘셉트(등대·해도·잠수갑옷·해파리 성당·유리 앵무조개·아귀·종·모래시계·산호 서고·수문 여신)에 맞춘 고퀄 디테일 ===== */
/* 공용 도우미 */
function x5Flare(A,x,y,L,col,al){A.beam([[x-L,y],[x,y-L*.06],[x+L,y],[x,y+L*.06]],col,al);A.beam([[x,y-L*.7],[x+L*.05,y],[x,y+L*.7],[x-L*.05,y]],col,al*.8)}
function x5Seg(A,pts,col,w,al){for(let i=0;i<pts.length-1;i++)A.L(pts[i][0],pts[i][1],pts[i+1][0],pts[i+1][1],col,w,al)}
function x5Along(pts,u){/* 폴리라인 위 비율 u(0~1) 위치 */const n=pts.length-1,f=Math.max(0,Math.min(.9999,u))*n,i=Math.floor(f),k=f-i;return [lerp(pts[i][0],pts[i+1][0],k),lerp(pts[i][1],pts[i+1][1],k)]}
const X5RB=['#7af0ff','#9ab8ff','#d8a0ff','#ff9ad8','#ffe08a','#9affc0'];

/* 1. 등대 껍질게: 회전하는 볼류메트릭 등대 빛 · 프레넬 렌즈 · 젖은 광택 등딱지 위 물결 빛(코스틱) · 등딱지 테두리 발광포 · 광택 집게 */
EXU.c_s5_beacon={
 pre(A){const t=A.t,b=A.bob*.35,BM=c5Act(A,['beamSweep','beaconFlash']),HN=c5Act(A,'fogHorn'),MR=c5Act(A,'shellMortar'),sh=A.shake(HN.w>.5||MR.w>.6?.3:0),tx=sh,ly=-42.8+b;
  const ba=BM.w>0?Math.atan2(A.look[1],A.look[0]):t*.9;
  for(const d of [0,Math.PI]){const a=ba+d,L=d?18:(BM.w>0?44:34),k=d?.5:1;for(const [w,al] of [[.36,.05],[.22,.07],[.11,.12],[.04,.18]])A.beam([[tx+Math.cos(a)*1.4,ly+Math.sin(a)*1.4],[tx+Math.cos(a-w)*L,ly+Math.sin(a-w)*L],[tx+Math.cos(a+w)*L,ly+Math.sin(a+w)*L]],'#ffe6a0',al*k*(1+BM.w*.8))}
  /* 등딱지 뒤 잔잔한 물빛 */A.glow(sh,-18+b,22,'#2a8aa0',.25)},
 post(A){const t=A.t,b=A.bob*.35,BM=c5Act(A,['beamSweep','beaconFlash']),PN=c5Act(A,'clawPincer'),MR=c5Act(A,'shellMortar'),HN=c5Act(A,'fogHorn'),ch=Math.max(A.eyeC,BM.w,HN.w),sh=A.shake(HN.w>.5||MR.w>.6?.3:0),opn=PN.w*2.4+(PN.ph==='s'?(1-PN.p)*2.4:0);
  /* 등대 탑: 왼쪽 광택 줄 · 오른쪽 그늘 젖은 반사 */{const tx=sh,base=-22+b,top=-40+b;for(let i=0;i<5;i++){const y0=base-i*3.6,w0=5-i*.42,w1=w0-.42;A.P([[tx-w0+.9,y0],[tx-w0+1.7,y0],[tx-w1+1.7,y0-3.6],[tx-w1+.9,y0-3.6]],'#ffffff',i%2?.18:.32);A.L(tx+w0-.8,y0-.4,tx+w1-.8,y0-3.2,'#9ff6ff',.2,.35)}
   /* 황동 난간: 광택 + 녹청 */A.R(tx-4.8,top-1,9.6,.25,'#ffe8a8',.9);for(let i=-4;i<=4;i+=2){A.R(tx+i-.2,top-.8,.15,1.8,'#fff0c0',.7)}for(const dx of [-3.6,-.6,2.6])A.R(tx+dx,top+.9,.9,.5,'#4ab89a',.75);
   /* 프레넬 렌즈: 황동 띠 + 동심 프리즘 */const lx=tx,ly=top-2.8;for(const dy of [-1.5,1.5])A.R(lx-3.2,ly+dy-.12,6.4,.25,'#e8c070',.8);for(const dx of [-1.9,1.9])A.R(lx+dx-.1,ly-2.1,.2,4.2,'#e8c070',.6);A.ring(lx,ly,2.4,.22,'#fff6d0',.55);A.ring(lx,ly,1.6,.18,'#ffffff',.5);
   const fl=.7+.3*Math.sin(t*5);x5Flare(A,lx,ly,7+ch*6,'#fff2c0',.35*fl+ch*.3);A.glow(lx,ly,4,'#ffffff',.6)}
  /* 등딱지: 젖은 광택 · 물결 빛 · 발광포 줄 */{const y=-15+b,x=sh;A.E(x-6,y-5.2,6,1.3,'#ffd0b8',.28);A.E(x-7,y-5.6,2.6,.5,'#ffffff',.55);A.E(x+8,y-4.4,2,.4,'#ffffff',.3);
   for(let i=0;i<4;i++){const yy=y-6+i*1.6,ph=t*1.6+i*1.3,w=13-i*1.2,pts=[];for(let k=0;k<=8;k++){const u=k/8,xx=x-w+u*w*2;pts.push([xx,yy+Math.sin(ph+u*7)*.5-Math.cos(u*Math.PI-Math.PI/2)*0])}x5Seg(A,pts,'#9ff6ff',.22,.22+.1*Math.sin(t*2+i))}
   for(let i=0;i<11;i++){const a=Math.PI*(.12+i*.076),px=x+Math.cos(a)*16.6,py=y+Math.sin(a)*6.4-.6,k=.5+.5*Math.sin(t*4-i*.8);A.C(px,py,.42,'#0a3a44');A.C(px,py,.26,'#bffcff',.4+.6*k);A.glow(px,py,1.6,'#6af0ff',.35*k)}
   A.L(x-12,y+5,x+12,y+5,'#ffb48a',.25,.55)}
  /* 눈자루 눈: 반사광 */for(const s of [-1,1]){const ex=sh+s*7.4,ey=-27+b+Math.sin(t*1.7+s)*.5;A.ring(ex,ey,1.9,.2,'#ffcf7a',.6);A.R(ex-1.1,ey-1.2,.55,.55,'#ffffff',.9);A.R(ex+.6,ey+.7,.3,.3,'#ffffff',.5)}
  /* 집게: 광택 하이라이트 · 손바닥 발광포 · 오른쪽 렌즈 프레넬 */
  const claw=(x,y,sc,ang,op,big)=>{const ca=Math.cos(ang),sa=Math.sin(ang),P=(u,v)=>[x+sc*(ca*u-sa*v),y+sc*(sa*u+ca*v)];
   x5Seg(A,[P(1.5,-2.6),P(5,-3.8),P(8.4,-3)],'#ffc8a8',.35*sc,.55);x5Seg(A,[P(9,-3.2),P(12,-3.5-op),P(14.8,-1.7-op*1.2)],'#ffe0c8',.3*sc,.6);x5Seg(A,[P(9.6,1.3),P(13,2),P(15.2,1)],'#ffd8c0',.25*sc,.45);
   for(const [u,v] of [[2.5,-.4],[4.2,.2],[6,.6]]){const [px,py]=P(u,v),k=.5+.5*Math.sin(t*3+u);A.C(px,py,.3*sc,'#bffcff',.5+.5*k);A.glow(px,py,1.4,'#6af0ff',.3*k)}
   const [tx1,ty1]=P(15.2,-1.7-op*1.2),[tx2,ty2]=P(15.4,.8);A.R(tx1-.2,ty1-.2,.4,.4,'#ffffff',.9);A.R(tx2-.2,ty2-.2,.4,.4,'#ffffff',.7);
   if(big){const [lx,ly]=P(5,0);A.ring(lx,ly,1.7*sc,.16,'#e8c070',.8);A.ring(lx,ly,1.15*sc,.14,'#ffffff',.45);A.E(lx-.8,ly-.9,.7,.35,'#ffffff',.7);x5Flare(A,lx,ly,3+op,'#ffe6a0',.25+op*.1)}};
  {const lA=-Math.PI/2-.55,rA=-Math.PI/2+.55-PN.w*.5+(PN.ph==='s'?PN.s*.6:0);claw(-20+sh,-21+b,1,lA,Math.sin(t*1.3)*.4+.4,false);claw(20+sh,-20+b,1.25,rA,opn,true)}
  /* 다리 관절 광택 */for(const s of [-1,1])for(let i=0;i<3;i++){const st=Math.sin(t*3+i*2.1+(s>0?1.4:0)),kx=s*(17+i*3.4),ky=-19+i*2.2+st*.5;A.R(kx-.6,ky-.9,.5,.5,'#ffffff',.65)}}};

/* 2. 접힌 항로: 날개 위에 떠오르는 금빛 경위선(해도) · 반투명 뒷날개 막과 시맥 · 날개 끝 리본 · 정교한 나침반 로즈 · 항로 실을 따라 흐르는 빛 */
function x5Manta(A){const t=A.t,y=-24+A.bob,FD=c5Act(A,['foldSea','creaseLine']),DT=c5Act(A,'paperDarts'),RT=c5Act(A,'routeThread'),CP=c5Act(A,'compassSpin'),fold=FD.w,fl=Math.sin(t*1.8)*2.6*(1-fold)-fold*7+(DT.w>0?-2*DT.w:0);
 const W={};for(const s of [-1,1]){const tip=[s*(29-fold*5),y-13+fl];W[s]={tip,le:c5Bez([s*4,y-7],[s*15,y-15+fl*.4],tip,10),te:c5Bez(tip,[s*16,y+1+fl*.3],[s*5,y+5],10)}}return {t,y,FD,DT,RT,CP,fold,fl,W}}
EXU.c_s5_manta={
 pre(A){const {t,y,W}=x5Manta(A);
  for(const s of [-1,1]){const te=W[s].te;/* 반투명 뒷날개 막 (물결치며 늘어짐) */const outer=te.map((p,i)=>{const u=i/(te.length-1),d=(1.6+Math.sin(u*Math.PI)*2.6)*(1+.15*Math.sin(t*3+i*.9));return [p[0]+s*.4,p[1]+d]});
   A.P(te.concat(outer.slice().reverse()),'#3aa0c8',.32);x5Seg(A,outer,'#bff4ff',.25,.45);for(let i=1;i<te.length-1;i+=2)A.L(te[i][0],te[i][1],outer[i][0],outer[i][1],'#bff4ff',.18,.35);
   /* 날개 끝 리본 */const tp=W[s].tip;let px=tp[0],py=tp[1];for(let k=1;k<=7;k++){const nx=tp[0]-s*k*.35+Math.sin(t*2.6-k*.7)*.7,ny=tp[1]+k*1.5;A.L(px,py,nx,ny,'#7ef0ff',.5-k*.05,.55-k*.06);px=nx;py=ny}}
  A.glow(0,y-4,16,'#d4403c',.12)},
 post(A){const {t,y,RT,CP,DT,FD,fl,W}=x5Manta(A);
  for(const s of [-1,1]){const {le,te,tip}=W[s],n=le.length-1;
   /* 금빛 경위선 (해도 격자) */for(const f of [.3,.6]){const pts=[];for(let i=2;i<=n;i++){const a=le[i],c=te[n-i];pts.push([lerp(a[0],c[0],f),lerp(a[1],c[1],f)])}x5Seg(A,pts,'#f0d088',.18,.45)}
   for(const i of [3,5,7,9]){const a=le[i],c=te[n-i];A.L(a[0],a[1]+.5,c[0],c[1]-.3,'#f0d088',.18,.35)}
   /* 앞날 금박 테 + 발광포 점선 */for(let i=0;i<n;i++)A.L(le[i][0],le[i][1]-.1,le[i+1][0],le[i+1][1]-.1,'#ffe6a8',.22,.75);
   for(let i=1;i<n;i++){const [px,py]=le[i],k=.5+.5*Math.sin(t*3-i*.7+s);A.C(px,py+1,.28,'#bffcff',.45+.55*k);A.glow(px,py+1,1.3,'#7ef0ff',.35*k)}
   /* 날개 끝 광택 */A.R(tip[0]-s*1.4-.3,tip[1]+.2,.6,.6,'#ffffff',.85);
   /* 항로 실: 흐르는 빛 */const pts=[[s*6,y-1.6],[s*10.5,y-3.6+fl*.3],[s*17,y-6+fl*.55],[s*24,y-10.5+fl*.85]];for(let k=0;k<2;k++){const q=(t*.45+k*.5)%1,[px,py]=x5Along(pts,q);A.C(px,py,.55,'#ffd0c8',.9);A.glow(px,py,2.4,'#ff5a50',.8)}
   for(const [px,py] of pts){A.L(px-.9,py,px+.9,py,'#ffe0d8',.15,.7);A.L(px,py-.9,px,py+.9,'#ffe0d8',.15,.7)}}
  /* 나침반 로즈: 금빛 16방위 + 회전 베젤 눈금 + 보석 심 */{const cy=y-5.6,rot=t*.3;for(let q=0;q<16;q++){const a=q*Math.PI/8+rot,r=q%2?3.3:3.6;A.L(Math.cos(a)*r,cy+Math.sin(a)*r,Math.cos(a)*(r-.5),cy+Math.sin(a)*(r-.5),'#ffe6a8',.16,.85)}
   for(let q=0;q<4;q++){const a=q*Math.PI/2+Math.PI/4;A.P([[0,cy],[Math.cos(a-.25)*.7,cy+Math.sin(a-.25)*.7],[Math.cos(a)*1.9,cy+Math.sin(a)*1.9],[Math.cos(a+.25)*.7,cy+Math.sin(a+.25)*.7]],'#d9b063',.7)}
   const na=CP.w>0?t*14:Math.atan2(A.look[1],A.look[0]);A.L(0,cy,Math.cos(na)*2.2,cy+Math.sin(na)*2.2,'#ff8a7a',.25,.9);A.C(0,cy,.45,'#7ef0ff');A.R(-.2,cy-.25,.2,.2,'#ffffff');A.E(-1,cy-1.4,1.2,.4,'#ffffff',.3);x5Flare(A,0,cy,3.5+CP.w*4,'#bffcff',.25+CP.w*.3)}
  /* 눈 광택 · 입 안 발광 */for(const s of [-1,1]){A.ring(s*5.6,y-1.6,1,.18,'#ffe6a8',.7);A.R(s*5.6-.5,y-2.2,.3,.3,'#ffffff')}A.glow(0,y+2,5,'#7ef0ff',.25+DT.w*.4)}};

/* 3. 닻을 짊어진 기사: 떠다니는 켈프 망토(공기주머니 발광) · 광택 구리 투구와 녹청 · 가슴 핵에서 갑옷으로 퍼지는 청록 에너지 맥 · 룬이 새겨진 닻 */
function x5AnchorPose(A){const t=A.t,b=A.bob*.25,SL=c5Act(A,['anchorSlam','anchorThrow']),SW=c5Act(A,'chainSweep'),CG=c5Act(A,'chainCage'),HL=c5Act(A,'hullBreach'),sh=A.shake(SL.w>.6?.35:0),ec=Math.max(A.eyeC,SL.w,SW.w,CG.w,HL.w);
 let ang=-Math.PI/2,hx=17+sh,hy=-20+b;if(SL.w>0){ang=-Math.PI/2+(Math.PI-.5)*SL.w;hy=-20+b-10*SL.w;hx=17+sh-5*SL.w}if(SL.ph==='s'){const q=Math.min(1,SL.p*1.6);ang=Math.PI/2-.5-(Math.PI-.8)*q;hy=-30+b+10*q;hx=12+sh+5*q}if(SW.w>0){ang=-Math.PI/2+(Math.PI/2+.2)*SW.w;hy=-22+b}if(SW.ph==='s'){ang=.2-SW.p*2.6;hy=-22+b}
 return {t,b,SL,SW,CG,HL,sh,ec,ang,hx,hy}}
EXU.c_s5_anchor={
 pre(A){const {t,b,sh}=x5AnchorPose(A),top=-31+b;
  /* 어깨 뒤에서 흘러내리며 물결치는 켈프 망토 자락 (공기주머니 발광) */for(const s of [-1,1])for(let f=0;f<3;f++){let px=sh+s*(8+f*2.2),py=top+3+f*.8;const n=8;for(let k=1;k<=n;k++){const q=k/n,nx=px+s*(.55+f*.2)*(1-q*.5)+Math.sin(t*1.4+k*.7+f*2)*.6,ny=py+3.2;A.L(px,py,nx,ny,'#0a1a14',1.9-q*.7);A.L(px,py,nx,ny,f%2?'#2f6a44':'#3a8a58',1.3-q*.6);if(k%2===0)A.L(px+s*.6,py+.4,nx+s*1.1,ny-.6,'#4aa868',.5,.8);if(k===3||k===6){A.C(nx+s*.7,ny,.42,'#d8c060');A.glow(nx+s*.7,ny,1.6,'#ffe08a',.4)}px=nx;py=ny}}
  A.glow(sh,-22+b,18,'#1aa89a',.18)},
 post(A){const {t,b,SL,SW,CG,HL,sh,ec,ang,hx,hy}=x5AnchorPose(A),VI='#5ef0e0',pul=.5+.5*Math.sin(t*3);
  /* 가슴 핵 → 갑옷으로 퍼지는 에너지 맥 */{const x0=sh,cy=-22+b;for(const [a,L] of [[-2.5,7],[-.65,7],[2.5,6],[.65,6],[-Math.PI/2-.15,6.5],[Math.PI-.2,8],[.2,8]]){let px=x0+Math.cos(a)*4.3,py=cy+Math.sin(a)*4.3;for(let k=1;k<=3;k++){const aa=a+Math.sin(k*2.3+a*3)*.35,nx=px+Math.cos(aa)*L/3,ny=py+Math.sin(aa)*L/3;A.L(px,py,nx,ny,'#0a2a28',.5);A.L(px,py,nx,ny,VI,.22,.35+.5*pul+ec*.2);px=nx;py=ny}A.C(px,py,.3,'#cffff6',.5+.5*pul)}
   A.ring(x0,cy,3.6,.22,'#ffd890',.8);A.E(x0-1,cy-1,.9,.45,'#ffffff',.6)}
  /* 몸통 판금: 광택 띠 + 황동 허리 장식 */{const x0=sh,top=-31+b;A.P([[x0-8.5,top+3],[x0-7,top+1.6],[x0-8.4,top+12],[x0-9.6,top+10]],'#ffffff',.14);A.L(x0-10,-15+b,x0+10,-15+b,'#ffe0a0',.2,.9);for(let q=-4;q<=4;q+=2)A.R(x0+q*2.2-.12,-13.95+b,.24,.24,'#ffffff',.9);
   for(const [dx,dy] of [[-6,-19],[5,-25],[7,-18]])A.E(x0+dx,dy+b,.8,.45,'#4ab89a',.55)}
  /* 어깨 갑주: 광택 + 황동 테 */for(const s of [-1,1]){const px=sh+s*12,py=-28+b;A.ring(px,py-.2,4.6,.28,'#d09a58',.85);A.E(px-s*1.6,py-2,1.6,.5,'#ffffff',.45)}
  /* 투구: 구리 광택 · 녹청 · 창살 반사 · 바이저 에너지 */{const hx2=sh,hy2=-38+b;A.E(hx2-2.6,hy2-3.4,2.4,1,'#ffe0b0',.55);A.E(hx2-3.2,hy2-3.8,1,.4,'#ffffff',.9);A.R(hx2+3.6,hy2-3.6,.4,.4,'#ffffff',.6);
   for(const [dx,dy,rx] of [[-4.6,4.1,1.6],[3.4,4.6,2],[5.6,1.4,.7],[-5.8,-1,.6]])A.E(hx2+dx,hy2+dy,rx,.45,'#4ab89a',.7);
   for(const s of [-1,1]){A.R(hx2+s*5-.6,hy2-.7,.4,.4,'#cffff6',.9);A.ring(hx2+s*5,hy2,1.6,.15,'#ffe0a0',.7)}
   A.P([[hx2-3,hy2-1.6],[hx2-1.6,hy2-3],[hx2-1,hy2-2.4],[hx2-2.4,hy2-1]],'#ffffff',.25);for(let q=-2;q<=2;q++)A.R(hx2+q*1.35-.25,hy2-3.2,.18,7.2,'#ffd8a0',.35);
   const vs=.6+.4*Math.sin(t*6);A.R(hx2-2.6,hy2+.2,5.2,.35,'#cffff6',.5*vs+ec*.3);x5Flare(A,hx2+A.look[0]*1.2,hy2+.4,3+ec*4,'#a8fff4',.25+ec*.3)}
  /* 방패: 유리 반사 + 회전 룬 고리 */{const sx=-14+sh-HL.w*2,sy=-18+b;A.E(sx-.9,sy-1,1,.5,'#ffffff',.5);for(let q=0;q<10;q++){const a=q*TAU/10+t*.6;A.R(sx+Math.cos(a)*3.2-.18,sy+Math.sin(a)*3.2-.18,.36,.36,VI,.4+.4*pul)}A.ring(sx,sy,5,.2,'#ffe0a0',.7)}
  /* 닻: 룬 각인 · 날 광택 · 갈고리 끝 반짝임 */{const ca=Math.cos(ang),sa=Math.sin(ang),L=30,P=(u,v)=>[hx+ca*u-sa*v,hy+sa*u+ca*v],gl=Math.max(SL.w,SW.w);
   A.L(...P(L*.32,.7),...P(-L*.6,.7),'#c8ccd0',.25,.5);for(let k=0;k<7;k++){const u=-L*.5+k*3.4,on=.4+.6*Math.max(0,Math.sin(t*4-k*.9));A.L(...P(u,-.1),...P(u+1.6,-.1),VI,.35,on*(.6+gl*.4));if(k%2)A.glow(...P(u+.8,0),1.6,VI,on*.4)}
   A.L(...P(L*.26,-5),...P(L*.26,5),'#ffb080',.25,.55);
   for(const s of [-1,1]){const arc=c5Bez(P(-L*.66,0),P(-L*.7,s*7),P(-L*.46,s*9.4),6);for(let q=1;q<arc.length-1;q++)A.L(arc[q][0],arc[q][1],arc[q+1][0],arc[q+1][1],VI,.25,.35+gl*.4);const e=arc[arc.length-1],pe=arc[arc.length-2],a=Math.atan2(e[1]-pe[1],e[0]-pe[0]),ex=e[0]+Math.cos(a)*2.4,ey=e[1]+Math.sin(a)*2.4;A.R(ex-.25,ey-.25,.5,.5,'#ffffff');A.glow(ex,ey,2+gl*3,VI,.4+gl*.5)}
   A.ring(...P(L*.34+2,0),1.6,.18,'#e8f0f4',.6);if(gl>0)for(let k=0;k<4;k++){const q=(t*2+k/4)%1;A.spark(...P(-L*.4+q*L*.6,(k%2?1:-1)*1.6),.6,'#bffcff',(1-q)*gl)}}
  if(CG.w>0)A.glow(0,-20,24,VI,CG.w*.25)}};

/* 4. 진주 성가대: 빗해파리처럼 흐르는 무지갯빛 빗판 줄 · 몸속 발광 방사관 · 긴 반투명 구완 리본 · 금 킨츠기로 메운 가면 균열 · 광택 금관 파이프 · 무지개 진주 광택 */
EXU.c_s5_organ={
 pre(A){const t=A.t,y=-21+A.bob,TN=c5Act(A,'tentacleVeil');
  /* 반투명 구완(입다리) 리본 */for(let i=0;i<4;i++){const x0=(i-1.5)*3.4,L=[],R=[];for(let j=0;j<=8;j++){const q=j/8,cx=x0+Math.sin(t*1.3+i*1.7+j*.5)*(.6+q*2.2)+(i-1.5)*q*(2+TN.w*2),cy=y+6+j*2.15,w=1.6*(1-q*.55)+Math.sin(j*1.9+t*3)*.35;L.push([cx-w,cy]);R.push([cx+w,cy])}
   const poly=L.concat(R.reverse());A.P(poly,'#c89aff',.28);x5Seg(A,L,'#f0d8ff',.2,.4);x5Seg(A,R.slice().reverse(),'#f0d8ff',.2,.4);for(let j=2;j<=8;j+=3){const p=L[j];A.C(p[0]+.6,p[1],.32,'#ffd8f4',.8);A.glow(p[0]+.6,p[1],1.6,'#ffb8e6',.35)}}
  A.glow(0,y-8,20,'#c070ff',.18)},
 post(A){const t=A.t,y=-21+A.bob,SG=c5Act(A,['choirChord','pearlCanon']),PP=c5Act(A,'pipeHymn'),sing=Math.max(SG.w,PP.w,A.eyeC);
  /* 몸속 발광 방사관 (분홍 맥) */for(let i=0;i<6;i++){const a=Math.PI*(1.12+i*.152),pts=[];for(let k=0;k<=4;k++){const r=4+k*2.4;pts.push([Math.cos(a)*r*1.1+Math.sin(k+i)*.3,y-1+Math.sin(a)*r*.62])}x5Seg(A,pts,'#ffb8e6',.22,.3+.25*Math.sin(t*2-i))}
  /* 빗판 줄: 무지갯빛 빛 물결이 위에서 아래로 흐름 */for(let i=0;i<8;i++){const a=Math.PI*(1.08+i*.12);for(let k=0;k<6;k++){const q=.35+k*.12,x=Math.cos(a)*14.6*q,yy=y-.8+Math.sin(a)*9.6*q+(1-q)*1.5,ci=Math.floor(t*6+i*.7-k*.9),c=X5RB[((ci%6)+6)%6],on=.45+.55*Math.max(0,Math.sin(t*5-k*1.1+i*.6));A.R(x-.28,yy-.28,.56,.56,c,on)}}
  /* 종 광택 (젖은 유리질) */A.E(-5,y-6.6,4,1.1,'#ffffff',.28);A.E(-6.4,y-7,1.4,.45,'#ffffff',.75);A.E(7,y-4,1.2,.4,'#ffffff',.3);
  /* 가장자리 진주 구슬 */for(let i=-7;i<=7;i+=2){const x=i*2.1,yy=y+8.4+Math.sin(t*3+i)*.4;A.C(x,yy,.38,'#fff6fb');A.R(x-.2,yy-.25,.18,.18,'#ffffff')}
  /* 금관 파이프: 광택 + 금세공 띠 + 노래할 때 입구 발광 */for(let i=0;i<9;i++){const q=i-4,x=q*3.1,h=8+(4-Math.abs(q))*2.1,x0=x-1.3,top=y-7-h;A.R(x0+.75,top+.2,.3,h-.4,'#fff6d0',.75);A.R(x0,top+h*.55,2.6,.25,'#fff0b0',.8);for(let k=0;k<3;k++)A.R(x0+.4+k*.8,top+h*.55+.35,.3,.3,'#8a5a20',.8);A.C(x0+1.3,top-1.1,.32,'#fff6fb');
   const mo=.35+.65*Math.max(PP.w,SG.w)*Math.max(0,Math.sin(t*9+i*1.3));A.P([[x0+.5,top+h*.3+.1],[x0+2.1,top+h*.3+.1],[x0+1.3,top+h*.3+1.3]],'#ffe6a0',.3+mo*.6);if(mo>.4)A.glow(x,top+h*.3+.6,1.8,'#ffe6a0',mo*.6)}
  /* 가면: 금 킨츠기 균열 + 도자기 광택 */{const fy=y-.4;let px=1.6,py=fy-4.6;for(let i=0;i<4;i++){const a=Math.PI/2+Math.sin(5*3+i*2.1)*1.1,nx=px+Math.cos(a)*1.3,ny=py+Math.sin(a)*1.3;A.L(px,py,nx,ny,'#ffd870',.32);A.glow(nx,ny,1,'#ffd870',.35);px=nx;py=ny}A.E(-1.8,fy-3,1.4,.6,'#ffffff',.6);for(const s of [-1,1])A.R(s*2.2-.15,fy-.6,.3,.3,'#ffffff',.9)}
  /* 진주 성대: 무지갯빛 반사 + 반짝임 */for(let i=0;i<5;i++){const a=Math.PI*(1.15+i*.175),x=Math.cos(a)*9,yy=y-3+Math.sin(a)*5.4+Math.sin(t*3+i)*.3,c=X5RB[(i+Math.floor(t*2))%6];A.ring(x,yy,1.45,.3,c,.45);A.E(x-.3,yy-.7,.8,.32,'#ffffff',.85);A.C(x+.6,yy+.6,.35,'#9affe8',.5);A.ring(x,yy,2.05,.18,'#fff0b0',.7);if((t*1.4+i*.37)%1<.25)A.spark(x-.5,yy-.5,.9,'#ffffff',.9)}
  if(sing>0)A.glow(0,y-3,10,'#ffb8e6',sing*.3)}};

/* 5. 유리 잠항선: 두꺼운 유리 껍질의 굴절 하이라이트 · 격실 격벽의 빛 · 창문에서 새어 나오는 빛줄기 · 황동 리벳과 녹청 · 탐조등 프레넬 렌즈 섬광 */
function x5Naut(A){const t=A.t,y=-23+A.bob*.6,TP=c5Act(A,['torpedoSalvo','depthCharge']),SN=c5Act(A,'sonarPing'),SL=c5Act(A,'searchLight'),rec=TP.ph==='s'?TP.s*1.6:0,ec=Math.max(A.eyeC,SL.w,SN.w,TP.w);return {t,y,TP,SN,SL,ec,cx:5-rec,cy:y,R:16}}
EXU.c_s5_nautilus={
 pre(A){const {t,cx,cy,R}=x5Naut(A);
  /* 껍질 뒤 굴절된 물빛 고리 */A.ring(cx,cy,R+2.4,.5,'#7adcf0',.18+.08*Math.sin(t*2));A.glow(cx,cy,R+8,'#3ab0d8',.22);
  /* 추진기 와류 */const px=cx+R+3,py=cy+4;for(let k=0;k<3;k++){const pts=[];for(let i=0;i<=8;i++){const q=i/8,a=t*6+q*8+k*2.1;pts.push([px+2+q*8,py+Math.sin(a)*(1+q*1.6)])}x5Seg(A,pts,'#bff4ff',.22,.3-k*.07)}},
 post(A){const {t,TP,SN,SL,ec,cx,cy,R}=x5Naut(A);
  /* 격실 격벽 빛 */for(let i=0;i<9;i++){const a=-Math.PI*.1+i*.62,r0=3+i*1.3,r1=R-.6;A.L(cx+Math.cos(a)*r0+.25,cy+Math.sin(a)*r0,cx+Math.cos(a+.3)*r1+.25,cy+Math.sin(a+.3)*r1,'#9ff0ff',.2,.25+.2*Math.sin(t*2+i))}
  /* 나선 황동관 광택 */for(let i=6;i<150;i+=6){const a=i*.11,r=1+i*.098;if(r>R-.6)break;A.R(cx+Math.cos(a)*r-.35,cy+Math.sin(a)*r-.35,.3,.3,'#fff0c0',.85)}
  /* 유리 굴절 하이라이트 (곡면) */{const arc=(r,a0,a1,w,al)=>{const pts=[];for(let k=0;k<=8;k++){const a=a0+(a1-a0)*k/8;pts.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r])}x5Seg(A,pts,'#ffffff',w,al)};A.P(c5Bez([cx+Math.cos(Math.PI*1.05)*(R-1),cy+Math.sin(Math.PI*1.05)*(R-1)],[cx-R*.9,cy-R*.95],[cx+Math.cos(Math.PI*1.5)*(R-1),cy+Math.sin(Math.PI*1.5)*(R-1)],8).concat(c5Bez([cx+Math.cos(Math.PI*1.5)*(R-3.2),cy+Math.sin(Math.PI*1.5)*(R-3.2)],[cx-R*.62,cy-R*.62],[cx+Math.cos(Math.PI*1.05)*(R-3.2),cy+Math.sin(Math.PI*1.05)*(R-3.2)],8)),'#c8f4ff',.22);arc(R-1.6,Math.PI*1.08,Math.PI*1.42,.8,.55);arc(R-2.8,Math.PI*1.12,Math.PI*1.3,.4,.7);arc(R-1.4,Math.PI*.15,Math.PI*.4,.5,.35);arc(R-3,Math.PI*.2,Math.PI*.32,.3,.3);
   const sw=(t*.35)%1.6;if(sw<1){const a=Math.PI*(1+sw*.8);A.L(cx+Math.cos(a)*(R-1),cy+Math.sin(a)*(R-1),cx+Math.cos(a)*(R-6),cy+Math.sin(a)*(R-6),'#ffffff',.5,.35*(1-Math.abs(sw-.5)*2))}A.E(cx-6,cy-11,1.4,.5,'#ffffff',.85)}
  /* 창문 빛줄기 */for(const [a,r] of [[.4,11],[2.2,12.5],[4.9,12.4],[3.8,6.2]]){const x=cx+Math.cos(a)*r,yy=cy+Math.sin(a)*r,da=Math.cos(a),db=Math.sin(a);A.beam([[x-db*.8,yy+da*.8],[x+db*.8,yy-da*.8],[x+da*7+db*2,yy+db*7-da*2],[x+da*7-db*2,yy+db*7+da*2]],'#ffc870',.14+.05*Math.sin(t*3+a));A.R(x-.9,yy-.7,.5,.4,'#ffffff',.7)}
  /* 황동 테: 리벳 + 녹청 */for(let i=0;i<14;i++){const a=i*TAU/14+.1;c5Riv(A,cx+Math.cos(a)*R,cy+Math.sin(a)*R,'#d8a860')}for(const a of [.9,2.6,4.3,5.6])A.E(cx+Math.cos(a)*(R-.2),cy+Math.sin(a)*(R-.2),1.2,.5,'#4ab89a',.6);
  /* 탐조등 눈: 프레넬 링 + 섬광 */{const hx=cx-R+1,hy=cy+2,ex=hx-4,ey=hy-1.4;A.ring(ex,ey,2.2,.16,'#fff6d0',.7);A.ring(ex,ey,1.4,.14,'#ffffff',.5);A.E(ex-1,ey-1.1,.8,.35,'#ffffff',.85);x5Flare(A,ex+A.look[0]*.8,ey+A.look[1]*.6,6+ec*8,'#fff0c0',.35+ec*.3);
   /* 두건 광택 · 촉수 끝 발광 */A.L(hx+2,hy-9,hx-5,hy-6.4,'#c8a0a4',.3,.6);for(let i=0;i<9;i+=2){const x0=hx-6+i*1.5;let px=x0,py=hy+5;for(let j=1;j<=9;j++){const q=j/9;px=x0+Math.sin(t*1.7+i*.9+j*.5)*(.6+q*1.8)-q*(i%3);py=hy+5+j*1.9}const k=.5+.5*Math.sin(t*3+i);A.C(px,py,.32,'#ffe0c0',.5+.5*k);A.glow(px,py,1.6,'#ffc870',.4*k)}}
  /* 잠망경 렌즈 섬광 */{const px=cx+2,up=SN.w*3;x5Flare(A,px+3.6,cy-R-6.6-up,3,'#fff0b0',.4)}
  if(TP.w>0)A.glow(cx-R-5,cy+6,4,'#ff8a5a',TP.w*.5)}};

/* 6. 전류의 봉합사(아귀): 플라스마 루어(회전하는 전기 아크) · 전극 등지느러미 막 · 봉합선을 따라 흐르는 전류 · 측선 발광포 · 유리질 이빨 */
function x5Eel(A){const t=A.t,y=-21+A.bob*.7,ST=c5Act(A,['needleStitch','suturePull']),AR=c5Act(A,'arcGap'),CL=c5Act(A,'lureBite'),zap=Math.max(AR.w,A.eyeC,CL.w,ST.w),bite=Math.max(CL.w,ST.ph==='s'?ST.s:0),cx=3,cy=y;
 const bx=cx-2,by=cy-12,sw=Math.sin(t*1.6)*1.2,la=Math.atan2(A.look[1],A.look[0]),aim=ST.w,tipX=bx-13+sw+(Math.cos(la)*10)*aim,tipY=by-6+Math.sin(t*2)*.8+(Math.sin(la)*8+6)*aim,rod=c5Bez([bx,by],[bx-2,by-12],[tipX,tipY],10);
 return {t,y,ST,AR,CL,zap,bite,cx,cy,rod,lure:rod[rod.length-1]}}
EXU.c_s5_eel={
 pre(A){const {t,cx,cy,zap,AR,lure}=x5Eel(A);
  /* 등가시 사이 반투명 전기 막 */const sp=[];for(let q=0;q<5;q++){const a=-Math.PI/2-.9+q*.35,x=cx+Math.cos(a)*13,yy=cy+Math.sin(a)*12,L=3+q%2;sp.push([[x,yy],[x+Math.cos(a)*(L+.4),yy+Math.sin(a)*(L+.4)]])}
  for(let q=0;q<4;q++){const [b0,t0]=sp[q],[b1,t1]=sp[q+1],mid=[(t0[0]+t1[0])/2,(t0[1]+t1[1])/2+.8];A.P([b0,t0,mid,t1,b1],'#3a8a80',.45);A.L(t0[0],t0[1],mid[0],mid[1],'#c8ff8a',.2,.5);A.L(mid[0],mid[1],t1[0],t1[1],'#c8ff8a',.2,.5)}
  /* 꼬리지느러미 반투명 확장 */{const tx=cx+15,ty=cy+1,s2=Math.sin(t*2)*1.6;A.P([[tx+2,ty-4],[tx+10,ty-11+s2],[tx+8.5,ty-4+s2*.6],[tx+7,ty+s2*.5],[tx+8.5,ty+4+s2*.6],[tx+10,ty+10+s2],[tx+2,ty+4]],'#3a8a80',.35);for(let q=-2;q<=2;q++)A.L(tx+5,ty+q*2.8+s2*.5,tx+9.6,ty+q*4.6+s2*.8,'#c8ff8a',.15,.4)}
  /* 가슴지느러미 막 확장 */for(const s of [-1,1]){const fx=cx+s*12,fy=cy+4,fa=Math.sin(t*2.4+s)*.25+AR.w*.5;A.P([[fx+s*3,fy-3],[fx+s*9,fy-7-fa*4],[fx+s*10,fy+1.5],[fx+s*4,fy+4.6]],'#3a8a80',.3);A.L(fx+s*6.4,fy-4.4-fa*4,fx+s*9,fy-7-fa*4,'#c8ff8a',.15,.5)}
  A.glow(lure[0],lure[1],10+zap*6,'#c8ff8a',.35)},
 post(A){const {t,zap,bite,cx,cy,rod,lure,AR}=x5Eel(A),EL='#c8ff8a',EL2='#f4ffd8';
  /* 봉합선 따라 흐르는 전류 펄스 */const seams=[[[cx-8,cy-10],[cx-3,cy-2],[cx-6,cy+8]],[[cx+6,cy-11],[cx+4,cy-3],[cx+10,cy+4]],[[cx-12,cy-2],[cx-4,cy+1],[cx+3,cy+3]]];seams.forEach((sm,i)=>{const pts=c5Bez(sm[0],sm[1],sm[2],8);for(let k=0;k<2;k++){const q=(t*(.7+i*.15)+k*.5+i*.3)%1,[px,py]=x5Along(pts,q),[qx,qy]=x5Along(pts,Math.max(0,q-.08));A.L(qx,qy,px,py,EL2,.35,.8);A.C(px,py,.4,'#ffffff');A.glow(px,py,2,EL,.6)}});
  /* 젖은 피부 광택 · 측선 발광포 */A.E(cx-3,cy-8,5,1,'#cfe8e8',.22);A.E(cx-4,cy-8.4,1.6,.4,'#ffffff',.5);for(let i=0;i<9;i++){const x=cx-6+i*2.2,yy=cy+1.5+Math.sin(i*.5)*.6-i*.15,k=.5+.5*Math.sin(t*4-i*.7);A.C(x,yy,.3,'#bffcd8',.4+.6*k);A.glow(x,yy,1.2,EL,.3*k)}
  /* 유리질 이빨 광택 */{const mx=cx-7,my=cy+2,op=1.6+bite*3+Math.max(0,Math.sin(t*1.1))*.5;for(let q=0;q<7;q++){const x=mx-8+q*2.1;A.L(x-.15,my-2.3+q*.1,x-.05,my-1.2+q*.1,'#ffffff',.18,.8)}for(let q=0;q<6;q++){const x=mx-7.2+q*2.2;A.L(x,my+op+2.3-q*.1,x+.1,my+op+1.3-q*.1,'#ffffff',.18,.7)}A.glow(mx-2,my+op*.6,4,EL,.15+bite*.3)}
  /* 눈: 반사막(심해어 눈빛) */{const ex=cx-4,ey=cy-6;A.ring(ex,ey,1.15,.2,'#e8ffb0',.7);A.R(ex-.6,ey-.6,.35,.35,'#ffffff')}
  /* 전극 코일 */for(const s of [-1,1]){const fx=cx+s*12,fy=cy+4,fa=Math.sin(t*2.4+s)*.25+AR.w*.5,x=fx+s*5,yy=fy-1.8-fa*3;for(let k=0;k<3;k++)A.R(x-1,yy-.9+k*.6,2,.2,'#ffcf8a',.8);A.glow(x,yy,1.6,EL,.3+zap*.4)}
  /* 초롱 막대: 마디 발광 */for(let q=2;q<rod.length-1;q+=3){A.C(rod[q][0],rod[q][1],.3,EL,.7)}
  /* 플라스마 루어 */{const [lx,ly]=lure,g=.6+.4*Math.sin(t*5);A.ring(lx,ly,2.4+g*.3,.25,EL,.45);A.C(lx,ly,1.4,'#e8ffc0',.55);A.C(lx,ly,.75,'#ffffff');
   for(let k=0;k<3;k++){const a0=t*3.2+k*TAU/3;let px=lx+Math.cos(a0)*.9,py=ly+Math.sin(a0)*.9;for(let j=1;j<=4;j++){const a=a0+j*.42,r=.9+j*.55+Math.sin(t*23+j*3+k)*.35,nx=lx+Math.cos(a)*r,ny=ly+Math.sin(a)*r;A.L(px,py,nx,ny,j%2?EL2:EL,.2,.9);px=nx;py=ny}A.spark(px,py,.7,EL2,.9)}
   x5Flare(A,lx,ly,5+zap*5,EL2,.35+zap*.3);A.glow(lx,ly,5,'#ffffff',.4)}
  if(zap>.3)for(let k=0;k<3;k++){const a=k*2.1+t*7,r=14+Math.sin(t*11+k)*1.5;let px=cx+Math.cos(a)*12,py=cy+Math.sin(a)*10;for(let j=0;j<3;j++){const nx=px+Math.cos(a+j)*1.6,ny=py+Math.sin(a+j*1.7)*1.6;A.L(px,py,nx,ny,EL2,.2,zap*.8);px=nx;py=ny}}}};

/* 7. 여덟 종의 집행관: 광택 청동 종(음각 띠 · 녹청 · 안쪽 금빛) · 금세공 종탑 골조 · 공명하는 금빛 음파 · 두건 금사 자수 · 불씨 눈 · 각인된 종 망치 */
function x5Oct(A){const t=A.t,y=A.bob*.6,TL=c5Act(A,['bellToll','octaveScale']),GV=c5Act(A,'gavelStrike'),VR=c5Act(A,'verdictScales'),ec=Math.max(A.eyeC,TL.w,GV.w,VR.w);
 const bells=[],fr={};for(const s of [-1,1]){const f=c5Bez([s*5,y-34],[s*18,y-40],[s*27,y-22],8);fr[s]=f;for(let q=0;q<4;q++){const p=f[2+q*2],k=s<0?q:q+4,ring=TL.w*Math.max(0,Math.sin(t*7-k*.9)),sw=Math.sin(t*2+k)*.15+ring*Math.sin(t*14)*.5,r=1.5+q*.55,x=p[0],yy=p[1]+1.2,ox=Math.sin(sw)*r*.6;bells.push({bx:x+ox,by:yy+r*.5,r,ring,k})}}
 return {t,y,TL,GV,VR,ec,bells,fr}}
EXU.c_s5_octopus={
 pre(A){const {t,bells}=x5Oct(A);
  /* 종마다 은은한 공명 음파 */for(const B of bells){const q=(t*.6+B.k*.13)%1,cy=B.by+B.r;A.ring(B.bx,cy,B.r*1.3+q*B.r*1.6,.22,'#ffe6a0',(1-q)*(.25+B.ring*.5));A.glow(B.bx,cy,B.r*2.4,'#ffd070',.25+B.ring*.4)}},
 post(A){const {t,y,GV,VR,ec,bells,fr}=x5Oct(A);
  /* 금세공 골조 */for(const s of [-1,1]){const f=fr[s];for(let q=0;q<f.length-1;q++)A.L(f[q][0],f[q][1]-.5,f[q+1][0],f[q+1][1]-.5,'#ffe6a0',.2,.85);for(let q=1;q<f.length-1;q+=2){A.ring(f[q][0],f[q][1]-1.3,.55,.15,'#e8c070',.9);A.R(f[q][0]-.12,f[q][1]-.7,.24,.24,'#fff0c0')}}
  /* 청동 종: 음각 띠 · 세로 광택 · 녹청 · 안쪽 금빛 테 */for(const {bx,by,r,ring} of bells){A.L(bx-r*.62,by+r*.85,bx+r*.62,by+r*.85,'#ffe6a0',.18,.8);A.L(bx-r*.78,by+r*1.25,bx+r*.78,by+r*1.25,'#5a3a18',.18,.8);A.L(bx-r*.2,by+.6,bx-r*.42,by+r*1.4,'#ffffff',.22,.65);
   A.E(bx+r*.15,by+.5,r*.32,.28,'#4ab89a',.6);A.E(bx,by+r*1.68,r*.85,.2,'#ffd870',.5+ring*.5);if(ring>.2)A.glow(bx,by+r*1.7,r*2,'#fff0b0',ring*.6)}
  /* 두건: 금사 자수 테 */{const hy=y-35,pts=[[-3.8,hy+6.4],[-7.3,hy+4.6],[-6.4,hy-2],[0,hy-10.2],[6.4,hy-2],[7.3,hy+4.6],[3.8,hy+6.4]];x5Seg(A,pts,'#d8b060',.3,.85);for(let i=0;i<pts.length-1;i++){const [mx,my]=[(pts[i][0]+pts[i+1][0])/2,(pts[i][1]+pts[i+1][1])/2];A.P([[mx,my-.45],[mx+.45,my],[mx,my+.45],[mx-.45,my]],'#ffe6a0',.9)}
   A.P([[-1.4,hy-7],[-4.6,hy-2.4],[-4,hy-1.6],[-1,hy-6]],'#ffffff',.12);
   /* 가면 도자기 광택 · 불씨 눈 */A.E(-2.4,hy+.6,.9,.3,'#ffffff',.7);for(const [ex,ey] of [[-1.9,hy+1.5],[2,hy+1.6]]){A.C(ex,ey,.25,'#ffffff');x5Flare(A,ex,ey,2.4+ec*2,'#ff6a5a',.35+ec*.3);for(let k=0;k<2;k++){const q=(t*.8+k*.5+ex*.1)%1;A.spark(ex+Math.sin(q*6+k)*.5,ey-q*4,.5*(1-q),'#ff8a5a',(1-q)*.8)}}}
  /* 수의 끝단 금사 + 사슬 광택 */for(let q=0;q<=14;q+=2){const x=lerp(-14,14,q/14)*.93,yy=y-3+(q%2?-2.6:0)+Math.sin(t*1.6+q)*1-.6;A.R(x-.2,yy-1,.4,.4,'#e8c070',.8)}A.L(-7,y-23.5,7,y-18.5,'#c8c4b8',.15,.6);A.L(7,y-23.5,-7,y-18.5,'#c8c4b8',.15,.6);
  /* 종 망치: 광택 + 각인 */{let ang=-1;if(GV.w>0)ang=-1-1.6*GV.w;if(GV.ph==='s')ang=-2.6+Math.min(1,GV.p*1.7)*3;const hx=15,hy=y-18-GV.w*3,ex=hx+Math.cos(ang)*13,ey=hy+Math.sin(ang)*13;A.ring(ex,ey,2.2,.2,'#ffe6a0',.8);A.E(ex-1.1,ey-1.3,1,.45,'#ffffff',.75);for(let q=0;q<6;q++){const a=q*Math.PI/3+.5;A.R(ex+Math.cos(a)*1.4-.15,ey+Math.sin(a)*1.4-.15,.3,.3,'#ffd870',.6+.4*Math.sin(t*3+q))}A.glow(ex,ey,3,'#ffd070',.3+GV.w*.5)}
  /* 저울 금 광택 */{const hx=-15,hy=y-17,tl=VR.w>0?Math.sin(t*3)*2.4:Math.sin(t*.8)*.6;for(const s of [-1,1]){const px=hx+s*6,py=hy+3-tl*s;A.R(px-1.2,py+3.4,.8,.2,'#ffffff',.8)}A.C(hx,hy+3,.5,'#ffe6a0')}}};

/* 8. 모래시계 고래: 황동 기둥 틀을 갖춘 모래시계 · 유리 반사와 빛나는 시간의 모래 · 상아빛 갈비뼈 광택 · 주름진 피부 결 · 등 광택 · 뒤로 흐르는 금빛 모래 강 */
EXU.c_s5_whale={
 pre(A){const t=A.t,y=-19+A.bob*.5;
  /* 몸 뒤를 감싸며 흐르는 금빛 모래의 강 */for(let k=0;k<3;k++){const pts=[];for(let i=0;i<=12;i++){const q=i/12,a=Math.PI*(1.02+q*.96),r=1+k*.06;pts.push([-4+Math.cos(a)*29*r,y-2+Math.sin(a)*(17+k*1.5)+Math.sin(q*9+t*2+k)*.6])}x5Seg(A,pts,'#e8c890',.3,.18-k*.04);for(let j=0;j<5;j++){const q=(t*.08+j/5+k*.11)%1,[px,py]=x5Along(pts,q);A.R(px-.25,py-.25,.5,.5,'#fff0b8',.7*Math.sin(q*Math.PI))}}
  A.glow(1,y-1,14,'#ffd890',.25)},
 post(A){const t=A.t,y=-19+A.bob*.5,SF=c5Act(A,['sandFall','reverseTide']),BR=c5Act(A,'breach'),TD=c5Act(A,'tidePull'),sw=Math.sin(t*1.2)*1;
  /* 등 광택 띠 · 피부 주름결 */x5Seg(A,[[-25,y-11],[-14,y-13.4],[-2,y-12.2],[7,y-8.4]],'#cfe2f0',.35,.35);A.E(-18,y-11.6,3,.45,'#ffffff',.5);
  for(let i=0;i<12;i++){const x=-24+i*3.1+Math.sin(i*2.3),yy=y-8+Math.sin(i*1.7)*2.2;A.L(x,yy,x+1.4,yy+.3,'#0c1624',.2,.5);A.L(x,yy-.25,x+1.4,yy+.05,'#8aaac4',.15,.45)}
  /* 배 주름 광택 */for(let q=0;q<8;q++)A.L(-21.6+q*3.6,y+4.4,-20.8+q*3.6,y+6.6,'#cfe2f0',.15,.4);
  /* 따개비 군락 · 발광 반점 */for(const [dx,dy,r] of [[-19,-10.6,.45],[-21,-8.4,.4],[-7,-12,.4],[7,-10,.45],[-25,-3.5,.4]])c5Barn(A,dx,y+dy,r);for(const [dx,dy] of [[-10,-3],[4,-5],[-18,-2],[9,-3]]){const k=.5+.5*Math.sin(t*2+dx);A.C(dx,y+dy,.28,'#bffcff',.4+.6*k);A.glow(dx,y+dy,1.4,'#8af0ff',.35*k)}
  /* 눈: 금빛 홍채 + 반사 */{const ex=-16,ey=y-3;A.ring(ex,ey,1.15,.25,'#ffe6a0',.8);A.R(ex-.5,ey-.6,.35,.35,'#ffffff')}
  /* 갈비뼈 상아 광택 + 황동 고리 */{const cx=1,cy=y-1,rw=7.4,rh=7;for(let q=0;q<6;q++){const x=cx-rw+q*2.9;A.L(x-.2,cy-rh-.9,x+.6,cy-rh+2.6,'#ffffff',.22,.6);A.L(x-.2,cy+rh+.9,x+.6,cy+rh-2.6,'#ffffff',.22,.5);A.R(x+.1,cy-rh+.6,.9,.3,'#e0b860');A.R(x+.1,cy+rh-.9,.9,.3,'#e0b860')}
   /* 모래시계 황동 틀: 기둥 · 장식 캡 · 시간 눈금 */for(const s of [-1,1]){const px=cx+s*(rw+.6);A.R(px-.18,cy-rh,.36,rh*2,'#e0b860',.85);A.R(px-.18,cy-rh,.12,rh*2,'#fff0b8',.7);for(const yy of [cy-rh*.5,cy,cy+rh*.5])A.E(px,yy,.42,.3,'#fff0b8',.9)}
   for(const yy of [cy-rh-1,cy+rh+.4]){A.R(cx-rw-1.2,yy-.3,rw*2+2.4,1.2,C5K);A.R(cx-rw-1,yy-.2,rw*2+2,.9,'#c8983c');A.R(cx-rw-1,yy-.2,rw*2+2,.25,'#fff0b8',.9);for(let k=0;k<7;k++)A.R(cx-rw+.6+k*2.2,yy+.2,.25,.3,'#5a3a18',.9)}
   /* 유리 반사 */A.L(cx-rw+1.6,cy-rh+1.2,cx-1.6,cy-1.2,'#ffffff',.35,.35);A.L(cx-1.6,cy+1.2,cx-rw+1.6,cy+rh-1.2,'#ffffff',.3,.25);A.R(cx+rw-2.4,cy-rh+1,.4,.4,'#ffffff',.8);
   /* 빛나는 모래 결정 */const rev=G&&G.s5act&&G.s5act.n==='reverseTide'&&SF.w>0;for(let k=0;k<6;k++){const q=(t*.7+k/6)%1,xx=cx+Math.sin(k*2.7)*(rw-2)*.7,yy=rev?cy-rh+1+q*2:cy+rh-1.4-q*1.6;if(q<.4)A.spark(xx,yy,.6,'#fff6d0',1-q/.4)}A.glow(cx,cy+.5,3,'#fff0b8',.4+SF.w*.4)}
  /* 꼬리: 지느러미 끝 광택 + 빛나는 모래 낙하 */{const P0=c5Bez([13,y+2],[21,y+1],[24,y-10+sw-BR.w*3],6),[tx,ty]=P0[P0.length-1];A.L(tx-5,ty-5.2,tx-1.6,ty-2.8,'#cfe2f0',.25,.6);A.L(tx+5,ty-6.2,tx+3,ty-2.8,'#cfe2f0',.25,.6);for(let q=0;q<5;q++){const qq=(t*.6+q/5)%1;A.spark(tx+Math.sin(q*2.3)*2.6,ty+qq*14,.5,'#fff0b8',(1-qq)*.8)}}
  /* 가슴지느러미 광택 */{const fa=Math.sin(t*1.2)*.3+TD.w*.6;A.L(-12.4,y+5.4,-10.4+Math.cos(1.2+fa)*7,y+10+Math.sin(1.2+fa)*3,'#8aaac4',.25,.6)}}};

/* 9. 산호 기록관: 발광 폴립이 핀 산호 뿔관 · 등 뒤를 맴도는 빛나는 기록 페이지 · 금박 책등 · 외알 안경 렌즈 반사와 금줄 · 잉크 빛 깃펜 */
function x5Coral(A,hx,hy,cb){const t=A.t,br=(x0,y0,a,L,d)=>{if(d>3||L<1.4)return;const x1=x0+Math.cos(a)*L,y1=y0+Math.sin(a)*L+Math.sin(t*1.2+d+x0)*.15;cb(x0,y0,x1,y1,d,d===3||L<2);br(x1,y1,a-.5,L*.72,d+1);br(x1,y1,a+.45,L*.66,d+1)};for(const s of [-1,1]){br(hx+s*3,hy+2,-Math.PI/2+s*.8,5.4,0);br(hx+s*1.4,hy,-Math.PI/2+s*.25,3.6,1)}}
EXU.c_s5_archive={
 pre(A){const t=A.t,b=A.bob*.3,BK=c5Act(A,['pageStorm','copyRecord']);
  /* 몸 뒤를 맴도는 빛나는 기록 페이지 */for(let i=0;i<6;i++){const a=t*(.5+BK.w*1.2)+i*TAU/6,x=Math.cos(a)*(20+BK.w*3),yy=-26+b+Math.sin(a)*5,back=Math.sin(a)<0;if(!back&&Math.abs(x)<12)continue;const w=1.8,h=2.4,tl=Math.sin(a*2)*.4;A.P([[x-w,yy-h+tl],[x+w,yy-h-tl],[x+w,yy+h-tl],[x-w,yy+h+tl]],'#efe2c0',.75);for(let k=0;k<3;k++)A.L(x-w+.5,yy-h+1+k*1.3,x+w-.5,yy-h+1+k*1.3,'#4a5ad8',.18,.8);A.glow(x,yy,3,'#8a9aff',.35)}},
 post(A){const t=A.t,b=A.bob*.3,BK=c5Act(A,['pageStorm','copyRecord']),IK=c5Act(A,'inkFlood'),CR=c5Act(A,'coralGrowth'),ec=Math.max(A.eyeC,BK.w,IK.w,CR.w),sh=A.shake(CR.w>.6?.3:0);
  /* 산호 뿔관: 가지 광택 + 끝 발광 폴립 */{let n=0;x5Coral(A,sh,-39+b,(x0,y0,x1,y1,d,tip)=>{if(d<2)A.L(x0-.3,y0,x1-.3,y1,'#ffc2a8',.3,.55);if(tip){const k=.5+.5*Math.sin(t*3+n*1.3);A.C(x1,y1,.45,'#fff0e8',.6+.4*k);for(let j=0;j<4;j++){const a=j*Math.PI/2+t;A.R(x1+Math.cos(a)*.7-.12,y1+Math.sin(a)*.7-.12,.24,.24,'#ffd8f0',.8)}A.glow(x1,y1,1.8+CR.w,'#ff9ab8',.45*k+CR.w*.3)}n++})}
  /* 책장: 금박 책등 + 왕관 몰딩 */{const x0=sh,top=-30+b;A.L(x0-8,top+.2,x0+8,top+.2,'#ffe6a0',.3,.9);for(let i=-3;i<=3;i++)A.C(x0+i*2.4,top+1,.25,'#ffe6a0');for(let r=0;r<4;r++){const yy=top+2.4+r*5;A.R(x0-8.6,yy+4,17.2,.2,'#d8a870',.8);for(let i=0;i<8;i++){const x=x0-8.2+i*2.08,h=3.1+((i+r)%3)*.35;A.R(x+.55,yy+4-h+1.3,.4,.4,'#ffe6a0',.85);A.R(x+.1,yy+4-h+.1,.25,h-.3,'#ffffff',.18)}}
   A.ring(x0,top+10,2.4,.2,'#ffe6a0',.8);A.E(x0-.7,top+9.2,.7,.3,'#ffffff',.7)}
  /* 외알 안경: 렌즈 반사 + 금줄 */{const hx=sh,hy=-35+b;A.P([[hx+.8,hy+1.4],[hx+1.4,hy+1],[hx+2,hy+1.8],[hx+1.3,hy+2.2]],'#ffffff',.55);A.ring(hx+1.6,hy+2.2,1.95,.14,'#fff0b0',.8);x5Seg(A,c5Bez([hx+3.2,hy+2.8],[hx+5.4,hy+5],[hx+4.4,hy+8],5),'#ffe6a0',.15,.9);x5Flare(A,hx+1.6,hy+2.2,2.6+ec*3,'#bfeaff',.3+ec*.3);
   A.E(hx-1.6,hy-2.2,1.6,.5,'#ffffff',.55)}
  /* 깃펜: 무지갯빛 깃 + 잉크 빛 펜촉 */{const hx=17+sh,hy=-27+b;for(let q=0;q<6;q++)A.L(hx-2.2+q*.25,hy-10+q*1.4,hx-.6+q*.25,hy-10.8+q*1.4,X5RB[(q+Math.floor(t*3))%6],.15,.5);const k=.6+.4*Math.sin(t*4);A.C(hx+2.8,hy+9.6,.4,'#8a9aff');A.glow(hx+2.8,hy+9.6,2,'#6a7aff',.5*k);A.spark(hx+2.8,hy+10.2+((t*.8)%1)*3,.5,'#8a9aff',1-((t*.8)%1))}
  /* 마도서: 금 걸쇠 + 떠오르는 룬 */{const op=BK.w,hx=-18+sh,hy=-27+b-op*3;for(const [dx,dy] of [[-5.8,-2.8],[5.8,-2.8],[-6.2,3.2],[6.2,3.2]])A.R(hx+dx-.3,hy+dy-.3,.6,.6,'#ffe6a0');for(let q=0;q<3;q++){const qq=(t*.5+q/3)%1;A.R(hx-2+q*2-.25,hy-2-qq*6,.5,.7,'#9ab0ff',(1-qq)*.8);A.glow(hx-2+q*2,hy-2-qq*6,1.2,'#8a9aff',(1-qq)*.4)}}
  /* 조개 문서함: 진주 광택 */for(const s of [-1,1]){const hx=s*(15+IK.w*2)+sh,hy=-18+b;A.E(hx-1,hy,1.4,.45,'#ffffff',.55);A.C(hx+1.2,hy+.6,.3,'#ffd8f0',.7)}
  /* 산호 다리 폴립 */for(let q=0;q<11;q+=2){const x=(q-5)*2.4+sh,k=.5+.5*Math.sin(t*3+q);A.C(x*1.25+(q<5?-2:2),-2.6,.3,'#fff0e8',.5+.5*k)}}};

/* 10. 무음의 심장: 수문 고리 안을 도는 물빛 흐름 · 문짝 금세공 · 각진 보석 날개(면 하이라이트와 무지갯빛 굴절) · 유리 흉곽 반사 · 종 심장에서 뻗는 빛의 혈관 · 왕관 보석 · 빛의 눈물 */
EXU.c_s5_heart={
 pre(A){const t=A.t,y=A.bob*.4,FG=c5Act(A,'floodGate'),FN=c5Act(A,'finalChorus'),rev=(typeof G!=='undefined'&&G&&G.s5Rev)?1:0,hc=rev?'#c8a0ff':'#a8ffe9';
  /* 수문 고리 안쪽을 도는 물빛 흐름 */{const cx=0,cy=y-26,R=17.6,sp=t*(.9+FG.w*3);for(let k=0;k<3;k++){const a0=sp+k*TAU/3,pts=[];for(let i=0;i<=7;i++){const a=a0+i*.12;pts.push([cx+Math.cos(a)*R,cy+Math.sin(a)*R])}for(let i=0;i<pts.length-1;i++)A.L(pts[i][0],pts[i][1],pts[i+1][0],pts[i+1][1],hc,.6*(i/7)+.15,.15+.5*(i/7))}A.ring(cx,cy,R+.4,.25,hc,.25)}
  /* 날개 사이 반투명 수정 깃 */for(const s of [-1,1]){const open=1+FN.w*.25;for(let q=0;q<4;q++){const a=-Math.PI/2+s*(.7+q*.4),L=(22-Math.abs(q-1)*2.6)*open,bx=s*5,by=y-28+q*1.2,ex=bx+Math.cos(a)*L,ey=by+Math.sin(a)*L*.85+Math.sin(t*1.4+q+.5)*.6,mx=lerp(bx,ex,.6),my=lerp(by,ey,.6),nx=-Math.sin(a)*1.4,ny=Math.cos(a)*1.4;A.P([[bx,by],[mx+nx,my+ny],[ex,ey],[mx-nx,my-ny]],q%2?'#7af0e0':'#b8fff4',.28);A.L(mx,my,ex,ey,'#ffffff',.15,.5)}}},
 post(A){const t=A.t,y=A.bob*.4,BL=c5Act(A,['returnBell','silentPulse']),FG=c5Act(A,'floodGate'),FN=c5Act(A,'finalChorus'),ring=Math.max(BL.w,FN.w,A.eyeC),rev=(typeof G!=='undefined'&&G&&G.s5Rev)?1:0,hc=rev?'#c8a0ff':'#a8ffe9';
  /* 수문 문짝: 금세공 테 + 빛나는 이음매 */{const cx=0,cy=y-26,R=21,sp=(t*.12)*(1+FG.w*4);for(let q=0;q<8;q++){const a=q*Math.PI/4+sp,x=cx+Math.cos(a)*(R+.6),yy=cy+Math.sin(a)*(R+.6);A.ring(x,yy,1.5,.15,'#fff2c0',.8);A.R(x-.15,yy-1.5,.3,3,hc,.5+.4*Math.sin(t*3+q));A.R(x-1.6,yy-1.6,.4,.4,'#ffffff',.8)}A.ring(cx,cy,R+2.3,.2,'#fff2c0',.6)}
  /* 보석 날개: 면 하이라이트 · 무지갯빛 굴절 · 끝 광채 */for(const s of [-1,1]){const open=1+FN.w*.25;for(let q=0;q<5;q++){const a=-Math.PI/2+s*(.5+q*.4),L=(20-Math.abs(q-1.4)*2.6)*open,bx=s*5,by=y-28+q*1.2,ex=bx+Math.cos(a)*L,ey=by+Math.sin(a)*L*.85+Math.sin(t*1.4+q)*.6,mx=lerp(bx,ex,.55),my=lerp(by,ey,.55),nx=-Math.sin(a)*2,ny=Math.cos(a)*2;
   A.P([[lerp(bx,mx,.4)+nx*.4,lerp(by,my,.4)+ny*.4],[mx+nx*.8,my+ny*.8],[mx,my]],'#ffffff',.3);const ci=Math.floor(t*3+q+(s>0?3:0)),c=X5RB[((ci%6)+6)%6];A.P([[mx,my],[mx+nx*.6,my+ny*.6],[lerp(mx,ex,.6),lerp(my,ey,.6)]],c,.4);A.L(mx-nx,my-ny,ex,ey,'#0a3a38',.2,.6);
   if((t*.9+q*.21+(s>0?.5:0))%1<.3)x5Flare(A,ex,ey,3,'#e8fffa',.5);A.glow(ex,ey,1.6,hc,.35)}}
  /* 유리 흉곽: 반사 + 빛의 혈관 */{const cy=y-22;A.P([[-6.8,cy-6.8],[-4.8,cy-6.8],[-6.6,cy+1],[-7.8,cy+1]],'#ffffff',.22);A.R(5.6,cy-6.4,.5,.5,'#ffffff',.8);
   const swg=Math.sin(t*2.2)*(.4+ring*.8),bx=swg*1.6,by=cy-1,hb=.5+.5*Math.sin(t*4);for(const s of [-1,1])for(let k=0;k<3;k++){const tx=s*(6.4-Math.abs(k-1)*.6),ty=cy-4.6+k*3.2,pts=c5Bez([bx+s*2,by+k],[s*4,ty+1.4],[tx,ty],4);x5Seg(A,pts,hc,.2,.25+.5*hb+ring*.2)}
   /* 청동 종 심장: 금 띠 · 각인 · 광택 */A.L(bx-3.2,by+.8,bx+3.2,by+.8,'#fff2c0',.2,.85);for(let k=0;k<5;k++)A.R(bx-2.2+k*1.1-.12,by-1.1,.24,.24,hc,.6+.4*hb);A.L(bx-1.2,by-3.2,bx-2.6,by+2.4,'#ffffff',.25,.55);A.glow(bx,by,3,hc,.3*hb)}
  /* 왕관 보석 · 빛의 눈물 */{const hx=0,hy=y-35;for(let q=-3;q<=3;q+=2){const h=2.8+(3-Math.abs(q))*1.1;A.R(hx+q*1.2-.3,hy-3.6-h*.45,.6,.6,q?'#ff9ad8':hc);A.R(hx+q*1.2-.3,hy-3.6-h*.45,.25,.25,'#ffffff')}x5Flare(A,hx,hy-3.4-6.1,3,'#fff2c0',.4+.3*Math.sin(t*2));
   for(const s of [-1,1]){const q=(t*.35+(s>0?.5:0))%1;A.L(hx+s*1.2,hy+.7,hx+s*1.3,hy+.7+q*3,hc,.18,.6*(1-q));A.C(hx+s*1.3,hy+.8+q*3,.22,'#ffffff',1-q)}A.E(hx-1,hy-1.8,1,.4,'#ffffff',.6)}
  /* 폭포 하체 반짝임 */for(let k=0;k<5;k++){const q=(t*1.1+k*.21)%1;A.spark((k-2)*2.6+Math.sin(k*3)*.6,y-14+q*13,.6,'#ffffff',(1-q)*.7)}
  /* 손 끝 빛 */for(const s of [-1,1]){const hx=s*(17+FN.w*3),hy=y-42-FN.w*2;x5Flare(A,hx,hy,2.4+ring*2,hc,.4)}}};

