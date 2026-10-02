/* ================= v48 챕터 7 REVERSE 「거울 속 시계골」 — 거울 세계의 새 보스 10명 디자인 =================
   그림은 보스 엔진(MON)에 'c_s7_*' 키로 등록한다. 모두 넓은 그림판(80×70칸)을 쓴다.
   지난 챕터 보스를 따라 하지 않은 완전히 새 보스들. 공통 모티프: 거울 조각(반사 빛줄기) · 분홍 금 · 거꾸로 된 것들
   색: 은빛 · 유리 청록 · 반전된 보라 */
(function(){try{
 const K='#0a0c18',S1='#232a40',S2='#46526e',S3='#8492b0',S4='#c4d0e4',S5='#f2f6ff',TL='#5af0e0',TL2='#b8fff6',VI='#b48aff',VI2='#e0ccff',PK='#ff7ad0',GD='#ffd27a',GD2='#fff0c0';
 const S7=window.S7ART=[
  {art:'s7_gate',name:'거울문 수문장',en:'THE MIRROR GATE',c:'#5af0e0',dark:'#1c2a38'},
  {art:'s7_peacock',name:'유리 공작',en:'GLASS PEACOCK',c:'#7af0d0',dark:'#14283a'},
  {art:'s7_fountain',name:'역류의 분수',en:'UPSTREAM FOUNTAIN',c:'#7ad8ff',dark:'#142a3a'},
  {art:'s7_chess',name:'흑백 체스 왕',en:'THE INVERTED KING',c:'#f2f6ff',dark:'#16161e'},
  {art:'s7_candle',name:'거꾸로 타는 초',en:'THE UPSIDE CANDLE',c:'#a8fff0',dark:'#2a2234'},
  {art:'s7_ballet',name:'오르골 발레리나',en:'MUSIC BOX BALLERINA',c:'#ffb0d8',dark:'#2a1a2a'},
  {art:'s7_carousel',name:'뒤집힌 회전목마',en:'THE UPSIDE CAROUSEL',c:'#ffd27a',dark:'#261a30'},
  {art:'s7_puppet',name:'그림자 인형사',en:'SHADOW PUPPETEER',c:'#b48aff',dark:'#120e1e'},
  {art:'s7_dragon',name:'반사룡',en:'THE MIRROR DRAGON',c:'#8af0ff',dark:'#101c2c'},
  {art:'s7_mharu',name:'거울 하루 · 반대편의 나',en:'MIRROR HARU',c:'#b48aff',dark:'#141228'}];
 /* 공용 도구 */
 const lim=(A,x0,y0,x1,y1,w,c,lt)=>{A.L(x0,y0,x1,y1,K,w+.9);A.L(x0,y0,x1,y1,c,w);if(lt)A.L(x0-.2,y0-.3,x1-.2,y1-.3,lt,Math.max(.3,w*.3),.8)};
 const pane=(A,pts,base,t,ph)=>{A.plate(pts,base,K,S5);const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys),w=x1-x0,h=y1-y0,q=((t*.35+(ph||0))%1.6)-.3;
  const sl=Math.min(h*.3,w*.3);for(const [o,wd,al] of [[0,.9,.45],[.22,.45,.3]]){const cx=x0+w*(q+o),ax=Math.max(x0+.6,Math.min(x1-.6,cx-sl)),bx=Math.max(x0+.6,Math.min(x1-.6,cx+sl));if(ax<bx)A.L(ax,y1-.6,bx,y0+.6,'#ffffff',wd,al)}};
 const shard=(A,x,y,s,rot,col,lt)=>{const p=[[0,-1.2],[.8,.7],[-.7,.9]].map(([a,b])=>[x+(a*Math.cos(rot)-b*Math.sin(rot))*s,y+(a*Math.sin(rot)+b*Math.cos(rot))*s]);A.P(p,K);A.P(p.map(([a,b])=>[x+(a-x)*.78,y+(b-y)*.78]),col);if(lt)A.L(p[0][0]*.8+x*.2,p[0][1]*.8+y*.2,p[1][0]*.6+x*.4,p[1][1]*.6+y*.4,lt,.3,.8)};
 const crack=(A,x0,y0,x1,y1,seed,col,al)=>{let px=x0,py=y0;for(let i=1;i<=4;i++){const k=i/4,nx=x0+(x1-x0)*k+(i<4?((seed*13+i*7)%5-2)*.5:0),ny=y0+(y1-y0)*k+(i<4?((seed*7+i*11)%5-2)*.4:0);A.L(px,py,nx,ny,col||PK,.35,al==null?.9:al);px=nx;py=ny}};
 const sil=(A,x,y,s,col)=>{A.C(x,y-2.6*s,1*s,col);A.R(x-.8*s,y-1.8*s,1.6*s,2*s,col);A.L(x+.8*s,y-1.6*s,x+2*s,y-3*s,col,.3*s)};
 const eye=(A,x,y,r,col,blk)=>{A.E(x,y,r+.5,r*.75+.4,K);if(!blk){A.E(x,y,r,r*.7,col);A.R(x-r*.4,y-r*.4,r*.4,r*.35,'#ffffff')}};
 const R={};

 /* 1. 거울문 수문장 — 살아 있는 아치형 거울 문. 거울 면 속 얼굴 · 유리 밖으로 나온 두 팔 · 열쇠 미늘창 · 13칸 시계 문장 · 돌 발톱 받침 */
 R.c_s7_gate=A=>{const t=A.t,b=A.bob*.3,C={st:'#3a3e52',st2:'#5a6078',fr:'#c4ccdc',fr2:'#8a94ac',gl:'#1e3a48',gl2:'#2e5a68'};
  A.E(0,1,20,2,'#000',.4);
  /* 돌 발톱 받침 */for(const s of [-1,1]){A.plate([[s*4,-5],[s*15,-5],[s*16,0],[s*3,0]],C.st,K,C.st2);for(let i=0;i<3;i++)A.P([[s*(7+i*3.4),0],[s*(8.4+i*3.4),0],[s*(7.8+i*3.4),2.2]],C.st2)}
  /* 문틀 (아치) */const fr=[];for(let i=0;i<=16;i++){const a=Math.PI+i*Math.PI/16;fr.push([Math.cos(a)*14,-38+b+Math.sin(a)*14])}const outer=[[-14,-5],...fr,[14,-5]];A.P(outer,K);A.P(outer.map(([x,y])=>[x*.93,y*.97-.4]),C.fr2);
  const inner=[[-11,-6],...fr.map(([x,y])=>[x*.78,-38+b+(y+38-b)*.78]),[11,-6]];A.P(inner,K);A.P(inner.map(([x,y])=>[x*.95,y]),C.gl);
  /* 거울 면: 물결처럼 빛이 지나감 */for(let i=0;i<5;i++){const yy=-8-i*7+b;A.R(-10,yy,20,3,i%2?C.gl2:C.gl,.7)}const q=((t*.4)%1.6)-.3;A.L(-10+q*20,-6,-10+q*20+8,-44+b,'#ffffff',1.2,.35);A.L(-6+q*20,-6,-6+q*20+8,-44+b,'#ffffff',.5,.25);
  if(A.pul>0)A.ring(0,-24+b,4+A.pul*8,.5,TL2,.6*A.pul);
  /* 문틀 장식: 은 못 */for(let i=1;i<16;i+=2){const [x,y]=fr[i];A.C(x*.9,y*.92-2.8,.7,S5)}for(const s of [-1,1])for(let i=0;i<4;i++)A.C(s*12.6,-10-i*7+b,.6,S5);
  /* 거울 속 얼굴 */{const y=-28+b;eye(A,-4,y,1.8,TL,A.blink||A.dm);eye(A,4,y,1.8,TL,A.blink||A.dm);if(!A.blink&&!A.dm)A.glow(0,y,8,TL,.5+A.pul*.4);A.L(-6,y-3,-2,y-2.2,TL2,.4,.6);A.L(6,y-3,2,y-2.2,TL2,.4,.6);
   /* 금 간 미소 */crack(A,-5,y+5,5,y+5,4,PK,.9);A.L(-5,y+5,-6,y+3.6,PK,.35)}
  /* 꼭대기 문장: 13칸 시계 + 뿔 */{const y=-54+b;for(const s of [-1,1]){A.P([[s*4,y+5],[s*9,y-1],[s*7,y+5.6]],C.fr2);A.P([[s*4.4,y+4.6],[s*8.4,y-.4],[s*6.6,y+5]],S4)}A.C(0,y+3,4.6,K);A.C(0,y+3,4,C.fr);A.C(0,y+3,3.2,'#f0f6ff');for(let i=0;i<13;i++){const a=i*TAU/13-Math.PI/2;A.R(Math.cos(a)*2.6-.2,y+3+Math.sin(a)*2.6-.2,.4,.4,i===12?PK:S2)}const h=-t*1.4;A.L(0,y+3,Math.cos(h)*2.2,y+3+Math.sin(h)*2.2,S1,.35)}
  /* 유리 밖으로 나온 팔 (물결 고리에서 시작) */for(const s of [-1,1]){const sx=s*9,sy=-22+b;A.ring(sx,sy,2.6,.4,TL2,.6);const ex=s*20,ey=-26+b+Math.sin(t*1.6+s)*1;lim(A,sx,sy,s*15,-30+b,2,S3,S5);lim(A,s*15,-30+b,ex,ey,1.8,S3,S5);A.C(ex,ey,2.2,K);A.C(ex,ey,1.7,S4)}
  /* 열쇠 미늘창 (오른손) */{const x=20,y0=-4,y1=-52+b;lim(A,x,y0,x,y1+6,1,S2,S4);A.C(x,y1+3,3.2,K);A.C(x,y1+3,2.6,GD);A.C(x,y1+3,1.2,K);for(const [dx,dy,w,h] of [[1.4,y1+8,3.6,1.2],[1.4,y1+11,2.6,1.2]])A.R(x+dx-.2,dy,w,h,GD);A.glow(x,y1+3,4,GD,.4)}
  /* 왼손 손바닥의 열쇠 구멍 */{const x=-20,y=-26+b;A.C(x,y-.4,.9,K);A.P([[x-.6,y],[x+.6,y],[x+.9,y+2],[x-.9,y+2]],K);A.glow(x,y,3,TL,.6)}
  A.bbox=[-24,-56,24,3]};

 /* 2. 유리 공작 — 거울 깃털 꼬리를 부채처럼 펼친 공작. 깃털 끝마다 거울 눈 · 보석 볏 · 금빛 다리 */
 R.c_s7_peacock=A=>{const t=A.t,b=A.bob*.4,C={b1:'#123040',b2:'#1e5a6a',b3:'#3aa0a8',b4:'#8af0e0'};
  A.E(0,1,16,1.8,'#000',.35);
  /* 부채 꼬리: 13개 깃털 (펼침 정도가 숨쉬듯) */{const n=13,sp=.92+Math.sin(t*1.2)*.04+A.pul*.05,cy=-14+b;for(let i=0;i<n;i++){const a=Math.PI+(.12+i*(.76/(n-1)))*Math.PI*sp,L=30+((i%2)?-3:2),ex=Math.cos(a)*L,ey=cy+Math.sin(a)*L*.95;A.L(0,cy,ex,ey,C.b2,1.4);A.L(0,cy,ex,ey,C.b4,.3,.6);
   for(let j=1;j<5;j++){const k=j/5,x=Math.cos(a)*L*k,y=cy+Math.sin(a)*L*.95*k;A.L(x,y,x+Math.cos(a+.5)*2.4,y+Math.sin(a+.5)*2.4,C.b3,.4,.7);A.L(x,y,x+Math.cos(a-.5)*2.4,y+Math.sin(a-.5)*2.4,C.b3,.4,.7)}
   /* 거울 눈 (번갈아 깜빡임) */const blink=Math.floor(t*1.5+i*.7)%7===0;A.E(ex,ey,3.2,2.6,K);A.E(ex,ey,2.7,2.1,S4);A.E(ex,ey,1.9,1.5,blink?S3:'#1a3a4a');if(!blink){A.C(ex,ey,.9,i%3?TL:VI);A.R(ex-1.2,ey-1,.7,.5,'#ffffff')}A.ring(ex,ey,2.7,.35,GD,.8)}}
  /* 다리 */for(const s of [-1,1]){lim(A,s*2,-10+b,s*3,-1,.7,GD,GD2);for(let i=-1;i<=1;i++)A.L(s*3,-1,s*3+i*1.4,.6,GD,.4)}
  /* 몸 (유리 판 깃털) */{const y=-14+b;A.E(0,y,6,7.4,K);A.E(0,y,5.4,6.8,C.b2);for(let i=0;i<4;i++)for(let j=0;j<3;j++){const x=-3+j*3,yy=y-4+i*2.6+(j%2)*.8;A.P([[x,yy-1],[x+1.2,yy+.6],[x-1.2,yy+.6]],i%2?C.b3:C.b4,.8)}A.L(-3,y+5,3,y-5,'#ffffff',.5,.3)}
  /* 목 (S자) + 머리 */{let px=0,py=-20+b;for(let i=1;i<=6;i++){const nx=Math.sin(i*.6+t*.8)*1.2-i*.3,ny=-20+b-i*2.6;lim(A,px,py,nx,ny,2.2-i*.15,C.b2,C.b4);px=nx;py=ny}const hx=px,hy=py-1.6;A.E(hx,hy,2.8,2.2,K);A.E(hx,hy,2.3,1.8,C.b3);
   A.P([[hx-2.2,hy+.2],[hx-4.6,hy+.8],[hx-2.2,hy+1.2]],GD);eye(A,hx-.4,hy-.3,.8,VI,A.blink||A.dm);if(!A.dm)A.glow(hx-.4,hy-.3,3,VI,.6);
   /* 보석 볏 */for(let i=-1;i<=1;i++){const x=hx+i*1.4,y=hy-2;A.L(x,y,x+i*1.4,y-4.4,C.b4,.3);A.P([[x+i*1.4,y-5.8],[x+i*1.4+.8,y-4.6],[x+i*1.4,y-3.6],[x+i*1.4-.8,y-4.6]],i?TL:PK);A.glow(x+i*1.4,y-4.6,2,TL,.5)}}
  A.rise(6,-24,24,-30,30,.3,TL2,.4,.4);A.bbox=[-34,-58,34,2]};

 /* 3. 역류의 분수 — 돌 수반에서 물이 위로 솟아 사람 모양이 됨. 물의 팔 · 물방울 왕관 · 위로 헤엄치는 은빛 물고기 */
 R.c_s7_fountain=A=>{const t=A.t,b=A.bob*.6,C={s1:'#3a4258',s2:'#5a6680',s3:'#8a96b0',w1:'#1e6a8a',w2:'#3aa8d0',w3:'#8ae0ff',w4:'#e0faff'};
  A.E(0,1,19,2,'#000',.35);
  /* 수반 (받침 기둥 + 큰 그릇) */A.plate([[-4,-6],[4,-6],[5,0],[-5,0]],C.s1,K,C.s2);A.plate([[-17,-14],[17,-14],[13,-6],[-13,-6]],C.s2,K,C.s3);A.R(-17,-14.6,34,1.4,C.s3);for(let i=0;i<6;i++)A.R(-14+i*5.6,-11,2.4,2.4,C.s1,.8);A.E(0,-14.6,15,1.4,C.w2);
  /* 물기둥 몸 (아래 → 위로 흐르는 줄무늬) */{const top=-40+b;A.P([[-6,-14],[6,-14],[5,top+10],[7,top],[-7,top],[-5,top+10]],C.w1,.92);for(let i=0;i<8;i++){const q=((t*1.2)+i/8)%1,y=-14-q*(-14-top);A.L(-5+Math.sin(i+q*6)*1,y,-5+Math.sin(i+q*6)*1+2,y-3,C.w3,.4,.7*(1-q*.4));A.L(4-Math.sin(i)*1,y-2,4-Math.sin(i)*1+.6,y-5,C.w4,.3,.5)}
   A.L(-4,-14,-3,top+2,'#ffffff',.4,.35)}
  /* 물의 팔 (위로 흐르며 손이 됨) */for(const s of [-1,1]){let px=s*5,py=-28+b;for(let i=1;i<=6;i++){const nx=s*(5+i*2.4),ny=-28+b-Math.sin(i*.5)*6+Math.sin(t*2+i+s)*.8;A.L(px,py,nx,ny,C.w2,2.2-i*.15,.9);A.L(px,py,nx,ny,C.w4,.3,.6);px=nx;py=ny}A.C(px,py,2.2,C.w2,.9);A.C(px-s*.4,py-.4,1,C.w4,.8);
   for(let i=0;i<3;i++){const q=((t*1.4)+i/3)%1;A.C(px+s*(1+i),py-2-q*8,.5,C.w4,1-q)}}
  /* 얼굴 */{const y=-36+b;eye(A,-2.6,y,1.4,'#ffffff',A.blink||A.dm);eye(A,2.6,y,1.4,'#ffffff',A.blink||A.dm);if(!A.blink&&!A.dm){A.C(-2.6,y,.6,VI);A.C(2.6,y,.6,VI);A.glow(0,y,6,C.w3,.6)}A.E(0,y+3.6,1.6,.6+A.open*1.2,K)}
  /* 물방울 왕관 (위로 튀어 오름) */{const y=-44+b;for(let i=0;i<9;i++){const a=Math.PI+(i+.5)*Math.PI/9,q=((t*1.6)+i*.11)%1,r=4+q*6;A.C(Math.cos(a)*r,y+Math.sin(a)*r*1.2,.8-q*.4,C.w4,1-q)}A.E(0,y+2,6,1.6,C.w3,.8)}
  /* 위로 헤엄치는 은빛 물고기 */for(let i=0;i<2;i++){const q=((t*.5)+i*.5)%1,x=(i?3:-3)+Math.sin(q*8)*1.4,y=-15-q*26+b;A.P([[x,y-1.6],[x+1,y],[x,y+1],[x-1,y]],S4);A.P([[x,y+1],[x+1,y+2.4],[x-1,y+2.4]],S3)}
  A.bbox=[-24,-58,24,3]};

 /* 4. 흑백 체스 왕 — 반은 흑, 반은 백인 거대한 왕 말. 반전된 눈 · 마름모 왕관 · 성채 홀 · 떠 있는 졸들 · 체스판 바닥 */
 R.c_s7_chess=A=>{const t=A.t,b=A.bob*.25,BK='#16161e',BK2='#2e2e3c',WH='#e8ecf4',WH2='#b0b8c8';
  /* 체스판 바닥 */for(let i=-4;i<4;i++)for(let j=0;j<2;j++)A.P([[i*5+j*2,-1+j*1.6],[i*5+5+j*2,-1+j*1.6],[i*5+5+j*2+2,.6+j*1.6],[i*5+j*2+2,.6+j*1.6]],(i+j)%2?BK2:WH2,.7);
  const half=(ptsL,ptsR,cL,cR)=>{A.P(ptsL,cL);A.P(ptsR,cR)};
  /* 받침 3단 */for(const [w,y0,h] of [[15,-5,5],[12,-9,4],[9,-12,3]]){A.P([[-w-.6,y0+b*.2+h+.4],[w+.6,y0+b*.2+h+.4],[w+.6,y0+b*.2-.4],[-w-.6,y0+b*.2-.4]],K);half([[-w,y0+h],[0,y0+h],[0,y0],[-w,y0]].map(([x,y])=>[x,y+b*.2]),[[0,y0+h],[w,y0+h],[w,y0],[0,y0]].map(([x,y])=>[x,y+b*.2]),BK,WH)}
  /* 몸통 (허리가 잘록) */{const L=[[-8,-12+b],[0,-12+b],[0,-34+b],[-6,-34+b],[-4,-24+b]],Rr=[[0,-12+b],[8,-12+b],[4,-24+b],[6,-34+b],[0,-34+b]];A.P([[-8.8,-11.4+b],[8.8,-11.4+b],[4.8,-24+b],[6.8,-34.6+b],[-6.8,-34.6+b],[-4.8,-24+b]],K);half(L,Rr,BK,WH);A.L(-3,-14+b,-5,-32+b,BK2,.6);A.L(3,-14+b,5,-32+b,WH2,.6)}
  /* 목 고리 */A.P([[-8,-37+b],[8,-37+b],[8,-34+b],[-8,-34+b]],K);half([[-7.4,-36.6+b],[0,-36.6+b],[0,-34.4+b],[-7.4,-34.4+b]],[[0,-36.6+b],[7.4,-36.6+b],[7.4,-34.4+b],[0,-34.4+b]],WH,BK);
  /* 머리 + 반전된 눈 */{const y=-42+b;A.C(0,y,5.4,K);A.P([[0,y-5],[0,y+5],[-5,y+2],[-5,y-2]],BK);A.P([[0,y-5],[0,y+5],[5,y+2],[5,y-2]],WH);
   if(!A.blink&&!A.dm){A.E(-2.4,y,1.3,1,WH);A.C(-2.4,y,.5,TL);A.E(2.4,y,1.3,1,BK);A.C(2.4,y,.5,PK);A.glow(0,y,5,TL,.4)}else{A.L(-3.4,y,-1.4,y,WH,.4);A.L(1.4,y,3.4,y,BK,.4)}}
  /* 마름모 왕관 */{const y=-48+b;A.P([[-5,y+1],[5,y+1],[6,y-3],[3,y-1.4],[0,y-4.6],[-3,y-1.4],[-6,y-3]],K);A.P([[-4.4,y+.6],[0,y+.6],[0,y-3.8],[-2.8,y-1.6],[-5.2,y-2.4]],WH);A.P([[0,y+.6],[4.4,y+.6],[5.2,y-2.4],[2.8,y-1.6],[0,y-3.8]],BK);
   A.P([[0,y-9],[1.6,y-6.6],[0,y-4.2],[-1.6,y-6.6]],K);A.P([[0,y-8.4],[1.1,y-6.6],[0,y-4.8],[-1.1,y-6.6]],GD);A.glow(0,y-6.6,3,GD,.5)}
  /* 팔: 성채 홀(왼, 흰 손) · 반전 구슬(오른, 검은 손) */{lim(A,-6,-30+b,-13,-22+b,1.6,WH2,WH);A.C(-13,-21+b,1.6,WH);lim(A,-13,-8+b,-13,-42+b,.9,WH,'#ffffff');A.box(-15.4,-46+b,4.8,4,WH,WH2,'#ffffff');for(let i=0;i<3;i++)A.R(-15.4+i*1.8,-47.4+b,1.2,1.4,WH);
   lim(A,6,-30+b,13,-22+b,1.6,BK2,S2);A.C(13,-21+b,1.6,BK);A.C(13,-25.6+b,3,K);A.P([[13,-28.2+b],[13,-23+b],[10.4,-25.6+b]],WH);A.P([[13,-28.2+b],[13,-23+b],[15.6,-25.6+b]],BK2);A.glow(13,-25.6+b,4,TL,.4+A.pul*.4)}
  /* 떠 있는 졸 (흑 · 백) */for(const s of [-1,1]){const x=s*23,y=-12+b+Math.sin(t*1.6+s)*1.4,c=s<0?BK:WH,c2=s<0?BK2:WH2;A.C(x,y-6,1.8,K);A.C(x,y-6,1.4,c);A.P([[x-2.4,y],[x+2.4,y],[x+1,y-4],[x-1,y-4]],K);A.P([[x-2,y-.4],[x+2,y-.4],[x+.8,y-3.8],[x-.8,y-3.8]],c);A.R(x-2.4,y-.6,4.8,1,c2)}
  A.bbox=[-26,-58,26,4]};

 /* 5. 거꾸로 타는 초 — 밀랍 마녀. 불꽃이 아래로 타는 초 모자 · 위로 흘러오르는 촛농 · 거꾸로 촛대 · 차가운 청록 불 */
 R.c_s7_candle=A=>{const t=A.t,b=A.bob*.35,C={w1:'#e8e0f0',w2:'#c0b4d8',w3:'#8a7aa8',w4:'#5a4a78'};
  A.E(0,1,16,1.8,'#000',.35);
  const flame=(x,y,s)=>{const f=Math.sin(t*9+x)*.3;A.P([[x-1.2*s,y],[x+1.2*s,y],[x+.3*s+f,y+3.6*s],[x+f*.5,y+4.6*s]],'#2aa0a0');A.P([[x-.7*s,y],[x+.7*s,y],[x+f*.4,y+3*s]],TL);A.C(x,y+.6*s,.4*s,'#ffffff');A.glow(x,y+2*s,4*s,TL,.6)};
  /* 밀랍 치마 (아래가 넓음) + 위로 흐르는 촛농 */A.P([[-6,-24+b],[6,-24+b],[13,0],[-13,0]],K);A.P([[-5.4,-23.4+b],[5.4,-23.4+b],[12.2,-.6],[-12.2,-.6]],C.w2);for(let i=0;i<7;i++){const x=-10+i*3.4,h=4+((i*5)%4)*2,q=Math.sin(t*1.2+i)*.6;A.R(x-.8,-1-h+q,1.6,h,C.w1);A.C(x,-1-h+q,.8,C.w1)}A.R(-12.2,-2,24.4,1.4,C.w3);
  for(let i=0;i<4;i++){const q=((t*.6)+i/4)%1,x=-8+i*5.4;A.C(x,-6-q*30,.7,C.w1,1-q)}
  /* 몸통 */A.plate([[-6,-36+b],[6,-36+b],[6,-22+b],[-6,-22+b]],C.w2,K,C.w1);A.L(0,-35+b,0,-23+b,C.w3,.5);for(let i=0;i<3;i++)A.C(0,-32+b+i*3.6,.6,TL);
  /* 거꾸로 촛대 (양손) */for(const s of [-1,1]){const hx=s*12,hy=-28+b+Math.sin(t*1.4+s)*.8;lim(A,s*5,-33+b,hx,hy,1.4,C.w2,C.w1);A.C(hx,hy,1.4,C.w1);lim(A,hx,hy,hx,hy+4,.8,C.w4,C.w3);A.R(hx-3.4,hy+3.6,6.8,1,C.w4);
   for(const d of [-2.6,0,2.6]){A.R(hx+d-.8,hy+4.6,1.6,4.6,C.w1);A.R(hx+d-.8,hy+4.6,1.6,.5,'#ffffff',.7);flame(hx+d,hy+9.2,.6)}}
  /* 얼굴 */{const y=-40+b;A.C(0,y,4.4,K);A.C(0,y,3.9,C.w1);A.R(-3.9,y-3.6,7.8,2.4,C.w2);eye(A,-1.6,y,.9,VI,A.blink||A.dm);eye(A,1.6,y,.9,VI,A.blink||A.dm);if(!A.dm)A.glow(0,y,4,VI,.5);A.L(-1,y+2.2,1,y+2.2,C.w3,.4);A.C(-1.6,y+1.6,.3,C.w2)}
  /* 초 모자 (뾰족, 녹아내림) + 챙 끝에서 아래로 타는 불꽃 */{const y=-44+b;A.P([[-8,y+1],[8,y+1],[6,y-.8],[-6,y-.8]],K);A.P([[-7.4,y+.6],[7.4,y+.6],[5.6,y-.4],[-5.6,y-.4]],C.w3);A.P([[-3.6,y-.6],[3.6,y-.6],[1.4,y-9],[-1.4,y-9]],K);A.P([[-3,y-.8],[3,y-.8],[1,y-8.4],[-1,y-8.4]],C.w1);
   A.R(-1,y-9,2,1.2,C.w2);for(const s of [-1,1])flame(s*7,y+1.2,.9);A.R(-.2,y-10.4,.4,1.4,K);A.P([[0,y-10],[.6,y-11.8],[0,y-13],[-.6,y-11.8]],TL2,.8)}
  A.bbox=[-22,-58,22,2]};

 /* 6. 오르골 발레리나 — 열린 오르골 위에서 도는 도자기 발레리나. 금 간 거울 뚜껑 · 칼날 치마 · 감개 · 음표 */
 R.c_s7_ballet=A=>{const t=A.t,b=A.bob*.2,C={bx:'#3a2240',bx2:'#5a3460',bx3:'#8a5a8a',pc:'#f6f0f4',pc2:'#d8c8d8',tu:'#ffb0d8',tu2:'#ff7ab8'};
  A.E(0,1,18,1.8,'#000',.35);
  /* 열린 뚜껑 (뒤, 안쪽은 금 간 거울) */A.P([[-15,-14],[15,-14],[13,-40],[-13,-40]],K);A.P([[-14,-14.6],[14,-14.6],[12.2,-39.4],[-12.2,-39.4]],C.bx2);pane(A,[[-11,-17],[11,-17],[9.6,-37],[-9.6,-37]],'#cfd8ec',t,0);crack(A,-7,-36,3,-20,6);crack(A,6,-35,-1,-24,9);for(let i=0;i<5;i++)A.C(-10+i*5,-39,.5,GD);
  /* 상자 */A.plate([[-16,-14],[16,-14],[16,0],[-16,0]],C.bx,K,C.bx3);A.R(-16,-14,32,1.4,GD);A.R(-16,-1.6,32,1.2,GD);for(let i=0;i<4;i++){A.R(-13+i*8,-10,5,5,C.bx2);A.ring(-10.5+i*8,-7.5,1.6,.35,GD,.8)}
  /* 감개 (오른쪽 옆, 돈다) */{const x=18,y=-7,sx=Math.cos(t*3);A.R(16,y-.5,2.6,1,GD);for(const s of [-1,1])A.E(x+1.4,y+s*2*Math.abs(sx),1,Math.max(.3,1.6*Math.abs(sx)),GD2)}
  /* 회전판 */A.E(0,-14.8,6,1.2,GD);A.R(-.4,-17,.8,2.4,GD2);
  /* 발레리나 (회전: 팔 위치가 돌아감) */{const sp=t*2.4,y0=-17;lim(A,0,y0,.4,y0-7,.9,C.pc,'#ffffff');lim(A,0,y0-7,Math.cos(sp)*4,y0-9,.8,C.pc,'#ffffff');
   /* 칼날 치마 (층층) */for(let k=0;k<2;k++){const yy=y0-8.6-k*1.4,r=8-k*2.2;for(let i=0;i<12;i++){const a=sp*(k?-1:1)+i*TAU/12,x=Math.cos(a)*r,front=Math.sin(a)>-.2;A.P([[x*.4,yy],[x,yy+Math.sin(a)*.8+.8],[x*1.12,yy+Math.sin(a)*.8-.4]],front?(k?C.tu:C.tu2):C.bx3,front?1:.6)}A.E(0,yy,r*.5,1,k?C.tu:C.tu2)}
   /* 몸 */A.P([[-1.8,y0-10],[1.8,y0-10],[1.4,y0-17],[-1.4,y0-17]],K);A.P([[-1.4,y0-10.4],[1.4,y0-10.4],[1,y0-16.6],[-1,y0-16.6]],C.pc);A.R(-1,y0-12,2,.5,C.tu2);
   /* 팔: 머리 위 둥글게 */for(const s of [-1,1]){const a=sp+(s>0?0:Math.PI),ax=Math.cos(a)*3.6;lim(A,s*1.2,y0-16,ax,y0-21.6,.6,C.pc,'#ffffff')}
   /* 머리: 도자기 얼굴 · 그려 넣은 눈물 · 머리 장식 */const hy=y0-19.6;A.C(0,hy,2.4,K);A.C(0,hy,2,C.pc);A.E(0,hy-1.4,2.2,1.2,C.pc2);A.C(0,hy-2.6,1.1,C.pc2);if(!A.blink&&!A.dm){A.L(-1.2,hy-.2,-.4,hy-.2,K,.3);A.L(.4,hy-.2,1.2,hy-.2,K,.3)}A.C(.9,hy+.9,.3,'#7ad0ff');crack(A,-1.4,hy-1.6,-.2,hy+1.4,3,PK,.8);
   for(let i=0;i<5;i++){const a=-Math.PI/2+(i-2)*.5;A.R(Math.cos(a)*2.4-.2,hy-1.4+Math.sin(a)*2.4-.2,.4,.4,GD2)}A.glow(0,hy,4,'#ffb0d8',.3+A.pul*.4)}
  /* 떠다니는 음표 (거꾸로 내려옴) */for(let i=0;i<4;i++){const q=((t*.4)+i/4)%1,x=-18+i*12+Math.sin(q*6)*2,y=-44+q*10;A.C(x,y,.9,VI2,Math.sin(q*Math.PI));A.L(x+.8,y,x+.8,y+3,VI2,.3,Math.sin(q*Math.PI))}
  A.bbox=[-22,-50,22,2]};

 /* 7. 뒤집힌 회전목마 — 지붕이 얼굴인 살아 있는 회전목마. 거꾸로 달린 목마들 · 아래로 향한 깃발 · 거울 기둥 */
 R.c_s7_carousel=A=>{const t=A.t,b=A.bob*.3,C={r1:'#3a2450',r2:'#6a3a8a',r3:'#c88ae0',st:'#f2e8ff',bs:'#2a1e38'};
  A.E(0,1,22,2,'#000',.4);
  /* 바닥 원판 */A.E(0,-2,20,3.4,K);A.E(0,-2.4,19,2.8,C.bs);for(let i=0;i<12;i++){const a=i*TAU/12;A.C(Math.cos(a)*17,-2.4+Math.sin(a)*2.2,.5,GD)}
  /* 목마 (뒤쪽은 어둡게) — 기둥에 거꾸로 매달림 */const sp=-t*.8,horse=(a,front)=>{const x=Math.cos(a)*16,y=-26+b+Math.sin(a)*2+Math.sin(t*3+a*2)*1.6,al=front?1:.55;A.L(x,-2,x,-40+b,front?GD:'#8a6a3a',.5,al);
   const c=front?C.st:'#9a90b0';A.E(x,y,4,2,K,al);A.E(x,y,3.4,1.5,c,al);A.P([[x+3,y-.4],[x+5.4,y+2.4],[x+4,y+3],[x+2.4,y+.8]],c,al);for(const d of [-2,-.6,1,2.2])A.L(x+d,y-1.4,x+d+.4,y-4.2,c,.6,al);
   for(let j=0;j<3;j++)A.P([[x+2.4+j*.6,y+1],[x+3+j*.6,y+3],[x+1.8+j*.6,y+2.2]],front?TL2:S3,al);if(front){A.R(x+4.4,y+2,.5,.5,K);A.R(x-1,y-.4,2,.6,PK)}};
  const hs=[];for(let i=0;i<6;i++){const a=sp+i*TAU/6;hs.push([a,Math.sin(a)>0])}hs.filter(h=>!h[1]).forEach(h=>horse(h[0],false));
  /* 가운데 거울 기둥 */pane(A,[[-3,-2],[3,-2],[3,-40+b],[-3,-40+b]],S4,t,0);
  hs.filter(h=>h[1]).forEach(h=>horse(h[0],true));
  /* 지붕 = 얼굴 (줄무늬 원뿔) */{const y=-40+b;A.P([[-21,y+1],[21,y+1],[0,y-12]],K);for(let i=0;i<8;i++){const x0=-20+i*5,x1=x0+5;A.P([[x0,y+.4],[x1,y+.4],[(x0+x1)*.04,y-11]],i%2?C.r2:C.st)}A.R(-21,y,42,2.2,K);A.R(-20.4,y+.4,40.8,1.4,C.r3);for(let i=0;i<10;i++)A.P([[-20+i*4.4,y+1.8],[-17.8+i*4.4,y+1.8],[-18.9+i*4.4,y+3.6]],i%2?C.r2:C.st);
   /* 처마 아래 두 눈 (불빛) */for(const s of [-1,1]){eye(A,s*7,y+5.4,1.6,GD,A.blink||A.dm);if(!A.blink&&!A.dm)A.glow(s*7,y+5.4,4,GD,.6)}
   /* 꼭대기의 아래로 향한 깃발 */A.L(0,y-12,0,y-16,K,.6);A.P([[0,y-16],[4,y-14],[0,y-12.6]],PK);for(let i=0;i<10;i++){const a=i*TAU/10+t;A.C(Math.cos(a)*19,y+1+Math.sin(a)*.6,.4,GD2,.8)}}
  A.bbox=[-24,-56,24,2]};

 /* 8. 그림자 인형사 — 떠 있는 긴 망토의 인형사. 머리 위 조종 막대 · 줄에 매달린 그림자 하루 · 그림자 똑딱 · 주름 깃 가면 */
 R.c_s7_puppet=A=>{const t=A.t,b=A.bob*.8,C={c1:'#120e1e',c2:'#241c38',c3:'#3e3058',ms:'#f2eef8',ms2:'#c8c0d8'};
  /* 망토 (아래로 갈수록 흩어짐) */A.P([[-6,-34+b],[6,-34+b],[10,-8+b],[6,-4+b],[3,-8+b],[0,-2+b],[-3,-8+b],[-6,-4+b],[-10,-8+b]],K);A.P([[-5.4,-33.4+b],[5.4,-33.4+b],[9.2,-8.6+b],[6,-5+b],[3,-9+b],[0,-3+b],[-3,-9+b],[-6,-5+b],[-9.2,-8.6+b]],C.c2);
  for(let i=0;i<5;i++){const q=((t*.7)+i/5)%1;A.C(-6+i*3,-4+b+q*6,.8-q*.6,C.c3,1-q)}A.L(0,-32+b,0,-6+b,C.c3,.5);
  /* 주름 깃 */for(let i=0;i<9;i++){const a=Math.PI+i*Math.PI/8;A.P([[0,-34+b],[Math.cos(a-.17)*8,-34+b+Math.sin(a-.17)*2.4-1],[Math.cos(a+.17)*8,-34+b+Math.sin(a+.17)*2.4-1]],i%2?C.ms2:C.ms)}A.E(0,-34+b,8,1.6,C.ms2);
  /* 가면 (웃는 입 · 한쪽 우는 눈) */{const y=-39+b;A.E(0,y,4.4,5,K);A.E(0,y,3.9,4.5,C.ms);A.P([[-2.4,y+1.6],[2.4,y+1.6],[0,y+3.2]],K);A.L(-2.4,y+1.6,-3,y+.8,K,.4);A.L(2.4,y+1.6,3,y+.8,K,.4);
   if(!A.blink&&!A.dm){A.E(-1.6,y-1,.9,.6,VI);A.E(1.6,y-1,.9,.6,K);A.C(1.6,y-1,.3,PK);A.glow(-1.6,y-1,3,VI,.6)}A.L(-1.6,y,-1.8,y+2,'#7ad0ff',.3,.8);A.L(-3,y-3,-.6,y-2.2,K,.4);A.L(3,y-3,.6,y-2.6,K,.4)}
  /* 긴 팔 → 머리 위 조종 막대 */const sw=Math.sin(t*1.4)*.25;for(const s of [-1,1]){const hx=s*12,hy=-50+b+Math.sin(t*1.4+s)*1;lim(A,s*5,-33+b,s*9,-42+b,1.2,C.c2,C.c3);lim(A,s*9,-42+b,hx,hy,1,C.c2,C.c3);A.C(hx,hy,1.2,C.ms);
   const a=sw*s;A.L(hx-Math.cos(a)*5,hy-Math.sin(a)*5,hx+Math.cos(a)*5,hy+Math.sin(a)*5,'#8a6a4a',.8);A.L(hx,hy-2.4,hx,hy+2.4,'#8a6a4a',.8);
   /* 줄 → 인형 */const px=s*20,py=-18+b+Math.sin(t*2+s)*2;for(const [ox,oy] of [[-5,0],[5,0],[0,2.4]]){const sx=hx+Math.cos(a)*ox,sy=hy+Math.sin(a)*ox+oy;A.L(sx,sy,px+ox*.3,py-4,S4,.15,.7)}
   if(s<0){/* 그림자 하루 (꼭두각시) */A.C(px,py-3.4,1.8,K);A.C(px,py-3.4,1.4,C.c3);A.R(px-1.6,py-4.6,3.2,.8,VI);A.P([[px-1.6,py-1.6],[px+1.6,py-1.6],[px+2,py+3],[px-2,py+3]],C.c2);lim(A,px-1,py+3,px-1.4+Math.sin(t*3)*.8,py+6.4,.6,C.c3);lim(A,px+1,py+3,px+1.4-Math.sin(t*3)*.8,py+6.4,.6,C.c3);
    A.L(px+1.6,py-1,px+4,py-3+Math.sin(t*2.4),S3,.4);A.R(px-.8,py-3.6,.5,.5,PK);A.R(px+.4,py-3.6,.5,.5,PK)}
   else{/* 그림자 똑딱 (꼭두각시) */A.C(px,py,3,K);A.C(px,py,2.5,C.c3);A.ring(px,py,2.5,.35,VI,.9);A.L(px,py,px+Math.sin(-t*2)*1.6,py-Math.cos(-t*2)*1.6,VI2,.3);A.C(px-.9,py-.4,.4,PK);A.C(px+.9,py-.4,.4,PK);A.L(px,py+2.5,px,py+4.4,S3,.3)}}
  A.bbox=[-26,-56,26,4]};

 /* 9. 반사룡 — 유리 판 비늘의 큰 용. 거울 판 날개 · 시곗바늘 뿔 · 빛을 머금은 입 · S자 몸 */
 R.c_s7_dragon=A=>{const t=A.t,b=A.bob*.6,C={d1:'#16243a',d2:'#2a4060',d3:'#4a6a90',d4:'#a8c8e8',bl:'#8af0ff'};
  A.E(0,1,20,2,'#000',.35);
  /* 거울 판 날개 (뒤) */const fl=Math.sin(t*1.8)*.12+A.pul*.1;for(const s of [-1,1]){const rx=s*8,ry=-30+b;const tips=[[s*34,-52+b-fl*20],[s*36,-36+b-fl*10],[s*32,-22+b],[s*24,-14+b]];lim(A,rx,ry,tips[0][0],tips[0][1],1.4,C.d2,C.d4);
   for(let i=0;i<tips.length;i++){const [x1,y1]=tips[i],[x2,y2]=i+1<tips.length?tips[i+1]:[rx,ry+6];A.P([[rx,ry],[x1,y1],[x2,y2]],K);A.P([[rx+(x1-rx)*.06,ry+(y1-ry)*.06+.4],[x1-s*.8,y1+.8],[x2-s*.6,y2-.4]],i%2?'#9ab8d8':'#c8dcf0',.9);A.L(rx,ry,x1,y1,C.d3,.5);
    const q=((t*.4+i*.2)%1.4)-.2;A.L(rx+(x1-rx)*q,ry+(y1-ry)*q,rx+(x2-rx)*q,ry+(y2-ry)*q,'#ffffff',.5,.4)}}
  /* 꼬리 (오른쪽 아래로 감김) */{let px=6,py=-10+b;for(let i=1;i<=8;i++){const nx=6+i*2.6,ny=-10+b+Math.sin(i*.7+t*1.4)*2.4+i*.6;lim(A,px,py,nx,ny,3-i*.3,C.d2,C.d4);px=nx;py=ny}A.P([[px,py-2],[px+4,py],[px,py+2]],C.d4)}
  /* 뒷다리 */for(const s of [-1,1]){lim(A,s*5,-12+b,s*8,-2,2.2,C.d2,C.d4);for(let i=-1;i<=1;i++)A.L(s*8,-2,s*8+i*1.2,0,S5,.5)}
  /* 몸통 (비늘 판) */A.E(0,-16+b,9,8,K);A.E(0,-16+b,8.3,7.3,C.d2);for(let i=0;i<4;i++)for(let j=0;j<4;j++){const x=-6+j*4+(i%2)*2,y=-21+b+i*3.2;A.P([[x,y-1.4],[x+1.6,y],[x,y+1.4],[x-1.6,y]],(i+j)%2?C.d3:'#6a90b8')}A.E(0,-12+b,5,3,C.d4,.5);
  /* 목 (S자) */let nx=0,ny=-22+b;for(let i=1;i<=6;i++){const x=-i*1.8+Math.sin(i*.8+t*.9)*1.4,y=-22+b-i*3;lim(A,nx,ny,x,y,3.6-i*.25,C.d2,C.d4);for(const s of [-1,1])A.R(x+s*.4-.3,y-.3,.6,.6,C.bl,.7);nx=x;ny=y}
  /* 머리 */{const hx=nx-3,hy=ny-1;A.P([[hx+5,hy-3],[hx+5,hy+3],[hx-6,hy+2.4],[hx-8,hy],[hx-6,hy-2]],K);A.P([[hx+4.4,hy-2.4],[hx+4.4,hy+2.4],[hx-5.6,hy+1.8],[hx-7.2,hy],[hx-5.6,hy-1.6]],C.d3);
   /* 입: 빛을 머금음 */const o=.6+A.open*1.6;A.P([[hx-7.6,hy+.4],[hx-2,hy+.4],[hx-1,hy+.4+o*1.4],[hx-6.6,hy+o*1.4]],K);A.C(hx-5,hy+.8+o*.6,.8+o*.5,C.bl);A.glow(hx-5,hy+.8+o*.6,4+A.pul*4,C.bl,.7);for(let i=0;i<4;i++)A.P([[hx-7+i*1.4,hy+.4],[hx-6.4+i*1.4,hy+.4],[hx-6.7+i*1.4,hy+1.4]],S5);
   eye(A,hx-1,hy-1,1,C.bl,A.blink||A.dm);if(!A.dm)A.glow(hx-1,hy-1,3,C.bl,.6);
   /* 시곗바늘 뿔 (하나는 거꾸로 돈다) */lim(A,hx+2,hy-2,hx+6,hy-9,.8,S4,S5);A.P([[hx+6,hy-10.6],[hx+7.2,hy-8.6],[hx+5.2,hy-8.8]],S5);const ra=-t*1.2;lim(A,hx+3,hy-1,hx+3+Math.cos(ra)*5,hy-1+Math.sin(ra)*5-3,.6,S4,S5);A.C(hx+3,hy-1,.8,GD);
   for(let i=0;i<3;i++)A.P([[hx+4-i*2.6,hy-2.4],[hx+3.2-i*2.6,hy-4.4],[hx+2.4-i*2.6,hy-2.4]],C.d4)}
  /* 앞발 */for(const s of [-1,1])lim(A,s*4,-18+b,s*7-2,-10+b,1.6,C.d2,C.d4);
  A.bbox=[-38,-58,38,2]};

 /* 10. 거울 하루 · 반대편의 나 — 최종 보스: 반전된 하루 + 등 뒤 부서진 거울 날개 · 시곗바늘 후광 · 왼손 대검 · 오른손 보라 불꽃 · 그림자 똑딱 */
 R.c_s7_mharu=A=>{const t=A.t,b=A.bob*.5,C={c1:'#141228',c2:'#26224a',c3:'#3e3878',sk:'#e8e0f0',hr:'#e8eef8',hr2:'#b8c4d8'};
  A.E(0,1,16,1.8,'#000',.4);
  /* 시곗바늘 후광 (거꾸로 돈다) */{const y=-43+b;for(let i=0;i<12;i++){const a=-t*.6+i*TAU/12,L=i%3===0?11.6:9;A.L(Math.cos(a)*6,y+Math.sin(a)*6,Math.cos(a)*L,y+Math.sin(a)*L,i%3===0?VI2:S3,i%3===0?.7:.4,.9);if(i%3===0)A.P([[Math.cos(a)*(L+1.6),y+Math.sin(a)*(L+1.6)],[Math.cos(a+.08)*L,y+Math.sin(a+.08)*L],[Math.cos(a-.08)*L,y+Math.sin(a-.08)*L]],VI2)}A.ring(0,y,6.4,.5,VI,.8)}
  /* 부서진 거울 날개 (조각들이 날개 모양) */for(const s of [-1,1])for(let i=0;i<7;i++){const a=-Math.PI/2+s*(.35+i*.2)+Math.sin(t*1.4+i)*.03,r=10+i*2.8,x=s*3+Math.cos(a)*r,y=-28+b+Math.sin(a)*r*.75+i*1.6;shard(A,x,y,2.6+i*.35,a+(s>0?0:Math.PI),i%2?'#c8dcf4':'#e8f4ff',S5);if(i===3||i===6)sil(A,x,y+1.4,.7,S2)}
  /* 코트 자락 */for(let i=0;i<5;i++){const w=Math.sin(t*3+i)*1;A.P([[-6+i*2.6,-22+b],[-3.6+i*2.6,-22+b],[-1+i*3.6+w,0+b*.3],[-3.6+i*3.6+w,-1+b*.3]],i%2?C.c2:C.c1)}
  /* 다리 + 부츠 */for(const s of [-1,1]){lim(A,s*2.8,-17+b,s*3.8,-3,2.4,C.c2,C.c3);A.box(s*3.8-2.6,-3.4,5.2,3.4,C.c1,K,C.c3);A.R(s*3.8-2.6,-1.2,5.2,.6,VI,.8)}
  /* 몸통 코트 + 금 */A.plate([[-7,-33+b],[7,-33+b],[7.6,-16+b],[-7.6,-16+b]],C.c2,K,C.c3);A.L(0,-32+b,0,-16+b,VI,.4,.8);for(let i=0;i<3;i++)A.C(1.8,-29+b+i*4,.55,S4);A.R(-7.6,-19.4+b,15.2,1.6,C.c1);A.R(-1.3,-19.8+b,2.6,2.4,S4);crack(A,-5,-31+b,-2,-20+b,5,PK,.8);
  /* 보라 목도리 (왼쪽으로 길게 휘날림) */for(let i=0;i<8;i++){const w=Math.sin(t*5-i*.8)*1.3;A.R(-3.4-i*2.3,-33+b+i*.6+w*.4,2.8,2,i%2?VI:'#8a5ad8')}A.R(-5.6,-34.6+b,11.2,2.6,VI);
  /* 오른손: 보라 불꽃 */{const hx=12,hy=-24+b;lim(A,6.4,-30+b,hx,hy,2,C.c2,C.c3);A.C(hx,hy,1.6,C.sk);for(let i=0;i<5;i++){const q=((t*2)+i/5)%1;A.C(hx+Math.sin(i*2+q*4)*1,hy-2-q*5,1.4*(1-q),i%2?VI:PK,1-q*.5)}A.glow(hx,hy-3,5+A.pul*3,VI,.7)}
  /* 머리: 은발 · 보라 고글 · 한쪽 눈 빛 · 얼굴 금 */{const y=-39+b;A.C(0,y,5.8,K);A.C(0,y,5.3,C.sk);for(let i=0;i<8;i++){const a=Math.PI+i*Math.PI/7,r=6+(i%2)*1.8;A.P([[Math.cos(a)*3.2,y-1+Math.sin(a)*3.2],[Math.cos(a)*r,y-1+Math.sin(a)*r],[Math.cos(a+.3)*3.6,y-1+Math.sin(a+.3)*3.6]],i%2?C.hr2:C.hr)}A.E(0,y-3.2,5.4,2.6,C.hr);
   A.R(-5.4,y-1.3,10.8,2.4,K);for(const s of [-1,1]){A.E(s*2.3,y-.1,1.9,1.4,'#1a1030');A.E(s*2.3,y-.1,1.3,.9,VI,.85);A.R(s*2.3-.6,y-.6,.5,.4,'#ffffff')}
   if(!A.dm&&!A.blink){A.C(-2.3+A.look[0]*.3,y-.1,.6,'#ffffff');A.glow(-2.3,y-.1,4+A.pul*3,VI,.8)}A.L(-1.4,y+2.6,1.4,y+2.8,'#5a3a6a',.4);crack(A,2.6,y-4,4.2,y+3.4,9,PK,.8)}
  /* 왼손의 대검 (시곗바늘 칼끝) */{const hx=-11,hy=-22+b,a=-2.15+Math.sin(t*1.4)*.08,L=30,ex=hx+Math.cos(a)*L,ey=hy+Math.sin(a)*L;lim(A,-6.4,-30+b,hx,hy,2,C.c2,C.c3);A.C(hx,hy,1.6,C.sk);
   const nx=Math.cos(a+1.57),ny=Math.sin(a+1.57);A.P([[hx+nx*1.8,hy+ny*1.8],[ex+nx*1.2,ey+ny*1.2],[ex+Math.cos(a)*4.4,ey+Math.sin(a)*4.4],[ex-nx*1.2,ey-ny*1.2],[hx-nx*1.8,hy-ny*1.8]],K);A.P([[hx+nx*1.2,hy+ny*1.2],[ex+nx*.7,ey+ny*.7],[ex+Math.cos(a)*3.4,ey+Math.sin(a)*3.4],[ex-nx*.7,ey-ny*.7],[hx-nx*1.2,hy-ny*1.2]],S4);
   A.L(hx,hy,ex,ey,'#ffffff',.4,.8);A.L(hx+Math.cos(a)*6,hy+Math.sin(a)*6,ex,ey,VI,.3,.7);A.P([[ex+Math.cos(a)*6,ey+Math.sin(a)*6],[ex+Math.cos(a)*2+nx*2.2,ey+Math.sin(a)*2+ny*2.2],[ex+Math.cos(a)*2-nx*2.2,ey+Math.sin(a)*2-ny*2.2]],VI2);
   A.R(hx-2.8,hy-.7,5.6,1.4,VI);A.glow(ex,ey,5,VI,.5+A.pul*.4)}
  /* 그림자 똑딱 */{const x=17+Math.sin(t*1.6)*1.4,y=-44+b+Math.cos(t*2)*1.2;A.C(x,y,3.4,K);A.C(x,y,2.9,'#2a2448');A.ring(x,y,2.9,.4,VI,.9);for(let i=0;i<4;i++){const a=i*Math.PI/2;A.R(x+Math.cos(a)*2.2-.2,y+Math.sin(a)*2.2-.2,.4,.4,VI2)}A.L(x,y,x-Math.sin(-t*3)*1.7,y-Math.cos(-t*3)*1.7,VI2,.3);A.C(x-.9,y-.4,.45,PK);A.C(x+.9,y-.4,.45,PK);A.glow(x,y,4,VI,.4)}
  A.bbox=[-30,-58,30,2]};

 /* ---------- 난이도 단계: 보통 = post(몸 위 장식) · 어려움 = pre(몸 뒤 큰 부위)+post · 익스트림 = 전부 + 각성 리마스터 ---------- */
 const ringOfShards=(A,cx,cy,r,ry,n,t,col)=>{for(let i=0;i<n;i++){const a=t+i*TAU/n;shard(A,cx+Math.cos(a)*r,cy+Math.sin(a)*ry,2.2,a,col,S5)}};
 const U7={
  c_s7_gate:{pre(A){const t=A.t,b=A.bob*.3;for(const s of [-1,1])for(let i=0;i<3;i++){const x=s*(18+i*4.4),h=34-i*8;pane(A,[[x-2,-4],[x+2,-4],[x+2,-4-h],[x-2,-4-h]],'#5a6a88',t,i*.3+s)}ringOfShards(A,0,-34+b,25,11,10,t*.3,'#c8f6f0')},
   post(A){const b=A.bob*.3;for(const s of [-1,1]){A.spike(s*13,-46+b,s>0?-.6:Math.PI+.6,4,1.6,S4,S5)}A.R(-11,-6.8,22,.6,TL,.8);for(let i=0;i<5;i++)A.C(-8+i*4,-7.4,.4,TL)}},
  c_s7_peacock:{pre(A){const t=A.t,b=A.bob*.4,cy=-14+b;for(let i=0;i<15;i++){const a=Math.PI+(.14+i*.052)*Math.PI,L=35,x=Math.cos(a)*L,y=cy+Math.sin(a)*L*.95;A.P([[x,y-1.6],[x+1,y],[x,y+1.6],[x-1,y]],i%2?'#c8fff0':'#b48aff',.85);A.glow(x,y,2.4,'#5af0e0',.4)}for(let i=0;i<6;i++){const q=((t*.5)+i/6)%1;A.C(-20+i*8,-4-q*30,.6,'#ffffff',1-q)}},
   post(A){const b=A.bob*.4;A.R(-5,-14+b,10,.5,GD);for(let i=0;i<3;i++)A.C(-2+i*2,-9+b,.5,GD2);A.ring(0,-14+b,6,.4,GD,.7)}},
  c_s7_fountain:{pre(A){const t=A.t,b=A.bob*.6;for(const s of [-1,1])for(let k=0;k<3;k++){let px=s*12,py=-14;for(let i=1;i<=6;i++){const nx=s*(12+i*2.6+k*2),ny=-14-i*6+Math.sin(t*2+i+k)*1;A.L(px,py,nx,ny,'#5ac8f0',.8,.45);px=nx;py=ny}A.C(px,py,1,'#e0faff',.7)}A.ring(0,-44+b,12,.6,'#8ae0ff',.5)},
   post(A){A.R(-17,-15.2,34,.6,GD);for(let i=0;i<6;i++)A.C(-14+i*5.6+1.2,-9.8,.6,TL);A.C(0,-30,.9,'#ffffff',.8)}},
  c_s7_chess:{pre(A){const t=A.t;for(let i=0;i<8;i++){const a=t*.3+i*TAU/8,x=Math.cos(a)*30,y=-26+Math.sin(a)*10,c=i%2?'#e8ecf4':'#16161e';A.P([[x-2,y+2],[x+2,y+2],[x+1,y-2],[x-1,y-2]],K);A.P([[x-1.6,y+1.6],[x+1.6,y+1.6],[x+.8,y-1.6],[x-.8,y-1.6]],c);A.C(x,y-3,1.2,c)}for(let i=-6;i<6;i++)A.R(i*5,-2.6,5,1,i%2?'#e8ecf4':'#16161e',.5)},
   post(A){const b=A.bob*.25;A.R(-9,-12.6+b,18,.6,GD);A.R(-8,-36.4+b,16,.5,GD);for(const s of [-1,1])A.C(s*5,-48+b,.6,s<0?TL:PK)}},
  c_s7_candle:{pre(A){const t=A.t,b=A.bob*.35;for(let i=0;i<8;i++){const a=t*.4+i*TAU/8,x=Math.cos(a)*26,y=-30+b+Math.sin(a)*9;A.R(x-.8,y-3,1.6,3.6,'#e8e0f0');A.P([[x-.7,y+.6],[x+.7,y+.6],[x,y+3.4]],TL);A.glow(x,y+1.6,2.6,TL,.5)}},
   post(A){const b=A.bob*.35;A.R(-6,-36.4+b,12,.6,VI);for(let i=0;i<3;i++)A.C(-3+i*3,-26+b,.5,VI2);A.R(-12.2,-6,24.4,.6,TL,.7)}},
  c_s7_ballet:{pre(A){const t=A.t;for(let i=0;i<10;i++){const a=t*.5+i*TAU/10,x=Math.cos(a)*28,y=-24+Math.sin(a)*12;A.P([[x,y-2],[x+.8,y],[x,y+2],[x-.8,y]],i%2?'#ffb0d8':'#f6f0f4',.8)}for(let k=0;k<3;k++){const q=((t*.4)+k/3)%1;A.ring(0,-28,10+q*16,.4,'#ffb0d8',.5*(1-q))}},
   post(A){A.R(-16,-7.6,32,.6,TL,.8);for(let i=0;i<4;i++)A.C(-10.5+i*8,-7.5,.6,PK);A.R(-12.2,-39.8,24.4,.6,GD2)}},
  c_s7_carousel:{pre(A){const t=A.t;for(let i=0;i<14;i++){const a=t*.6+i*TAU/14;A.C(Math.cos(a)*28,-24+Math.sin(a)*8,1,i%2?'#ffd27a':'#ff7ad0',.8);A.glow(Math.cos(a)*28,-24+Math.sin(a)*8,2.4,'#ffd27a',.4)}for(let i=0;i<5;i++){const q=((t*.5)+i/5)%1;A.L(-22+i*11,-55+q*6,-22+i*11,-51+q*6,'#ffffff',.3,.5*(1-q))}},
   post(A){const b=A.bob*.3;for(let i=0;i<8;i++)A.C(-17.5+i*5,-40.4+b,.5,'#ffffff');A.R(-19,-2.6,38,.4,TL,.7)}},
  c_s7_puppet:{pre(A){const t=A.t;for(let i=0;i<8;i++){const x=-28+i*8,sx=x+Math.sin(t+i)*2,y=-30+Math.sin(t*1.5+i)*2;A.L(x,-55,sx,y,'#c4d0e4',.15,.5);A.C(sx,y,1.4,'#241c38',.9);A.C(sx,y,.5,'#b48aff')}},
   post(A){const b=A.bob*.8;A.E(0,-34+b,8.4,.6,VI);for(let i=0;i<3;i++)A.C(-2+i*2,-28+b+i*5,.5,VI2);A.P([[0,-46+b],[1.2,-44.4+b],[0,-43.4+b],[-1.2,-44.4+b]],PK)}},
  c_s7_dragon:{pre(A){const t=A.t,b=A.bob*.6;ringOfShards(A,0,-30+b,34,14,12,t*.25,'#c8f0ff');for(let i=0;i<6;i++){const q=((t*.7)+i/6)%1;A.C(-30+i*12,-4-q*40,.6,'#8af0ff',1-q)}},
   post(A){const b=A.bob*.6;for(let i=0;i<5;i++)A.C(-4+i*2,-9+b,.5,'#8af0ff');A.L(-8,-16+b,8,-16+b,GD,.4,.8)}},
  c_s7_mharu:{pre(A){const b=A.bob*.5;A.E(0,-29+b,22,27,K,.9);A.E(0,-29+b,21,26,'#1c1a34');A.E(0,-29+b,19,24,'#3a3a68',.5);for(let i=0;i<16;i++){const a=i*TAU/16;A.C(Math.cos(a)*21.4,-29+b+Math.sin(a)*26.4,.8,'#c4d0e4')}crack(A,-9,-53+b,5,-6+b,17,PK,.6);crack(A,12,-48+b,4,-30+b,23,PK,.5);A.E(-7,-42+b,4,11,'#ffffff',.08)},
   post(A){const b=A.bob*.5;A.R(-7,-33.6+b,14,.6,VI2);for(let i=0;i<3;i++)A.C(-4+i*4,-17+b,.5,VI2);A.spike(0,-46+b,-Math.PI/2,2.6,1.2,'#e8eef8',VI2)}}};
 for(const k in U7)EXU[k]=U7[k];
 Object.assign(EXF,{c_s7_gate:['#5af0e0',['crown']],c_s7_peacock:['#7af0d0',['rays']],c_s7_fountain:['#8ae0ff',['rings']],c_s7_chess:['#ffffff',['halo']],c_s7_candle:['#a8fff0',['orbit']],c_s7_ballet:['#ffb0d8',['rings']],c_s7_carousel:['#ffd27a',['orbit']],c_s7_puppet:['#b48aff',['rays']],c_s7_dragon:['#8af0ff',['wings','crystals']],c_s7_mharu:['#b48aff',['halo','rays']]});
 /* 엔진 등록 */
 for(const k in R){MON.reg[k]=R[k];MON.hand[k]=()=>{};MON.noArm[k]=1}
 Object.assign(MON.scl,{c_s7_gate:.5,c_s7_peacock:.48,c_s7_fountain:.5,c_s7_chess:.5,c_s7_candle:.5,c_s7_ballet:.52,c_s7_carousel:.48,c_s7_puppet:.5,c_s7_dragon:.46,c_s7_mharu:.52});
 try{if(window.__V43BIG)for(const k in R)window.__V43BIG[k]=1}catch(e){}
 for(const b of S7){if(!C3BOSS[b.art])C3BOSS[b.art]={base:0,c:b.c,pal:[b.dark,K,b.c,'#f2f6ff'],cfg:{bw:18,bh:18,base:'hover',head:'visor',arms:'piston',ex:[]},th:0,deck:[]}}
}catch(e){console.error('v48 ch7 designs',e)}})();
