/* ================= v48 챕터 7 REVERSE 「거울 속 시계골」 — 거울 세계의 새 보스 10명 디자인 =================
   그림은 보스 엔진(MON)에 'c_s7_*' 키로 등록한다. 모두 넓은 그림판(80×70칸)을 쓴다.
   난이도가 오를수록 보스 "몸 자체"가 자라고 사실적으로 바뀐다 (뒤에 물건을 붙이는 방식이 아님):
     쉬움(lv0) 단순한 모양 · 보통(lv1) 기본 디테일 · 어려움(lv2) 몸이 성장(부위 추가) + 빛·그림자 입체감
     익스트림(lv3) 완전한 모습 + 재질(결·광택·잔무늬)까지 사실적으로
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
 /* ---------- 공용 도구 ---------- */
 const LV=()=>{try{return window.__tier?window.__tier():1}catch(e){return 1}};
 const dk=(c,k)=>monMix(c,'#000000',k),lt=(c,k)=>monMix(c,'#ffffff',k);
 const lim=(A,x0,y0,x1,y1,w,c,l)=>{A.L(x0,y0,x1,y1,K,w+.9);A.L(x0,y0,x1,y1,c,w);if(l)A.L(x0-.2,y0-.3,x1-.2,y1-.3,l,Math.max(.3,w*.3),.8)};
 /* 입체감: 다각형 안쪽만 칠함(잘라내기) — 왼쪽 위 빛, 오른쪽 아래 그림자. lv3은 재질 잔무늬 + 광택점 */
 const clipPath=(A,pts,f)=>{const M=MON,S=A.c,X=x=>(x+M.OX)*M.D,Y=y=>(y+M.OY)*M.D;S.save();S.beginPath();pts.forEach((p,i)=>i?S.lineTo(X(p[0]),Y(p[1])):S.moveTo(X(p[0]),Y(p[1])));S.closePath();S.clip();try{f(S,X,Y)}finally{S.restore()}};
 const shadeIn=(A,pts,base,lv,mat)=>{if(lv<2)return;const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys),cx=(x0+x1)/2,cy=(y0+y1)/2,sz=Math.max(x1-x0,y1-y0);
  clipPath(A,pts,(S,X,Y)=>{const k=lv>=3?1:.8;S.globalAlpha=.5*k;S.fillStyle=dk(base,.42);S.beginPath();S.moveTo(X(cx+sz),Y(cy-sz*.35));S.lineTo(X(cx+sz),Y(cy+sz));S.lineTo(X(cx-sz),Y(cy+sz));S.lineTo(X(cx-sz*.2),Y(cy+sz*.2));S.closePath();S.fill();
   S.globalAlpha=.38*k;S.fillStyle=lt(base,.45);S.beginPath();S.moveTo(X(x0-1),Y(y0-1));S.lineTo(X(x0+(x1-x0)*.45),Y(y0-1));S.lineTo(X(x0-1),Y(y0+(y1-y0)*.45));S.closePath();S.fill();
   if(lv>=3){/* 재질 잔무늬 */S.fillStyle=mat==='glass'?'#ffffff':dk(base,.5);for(let yy=Math.floor(y0);yy<y1;yy+=1.2)for(let xx=Math.floor(x0);xx<x1;xx+=1.2){const h=Math.sin(xx*12.9898+yy*78.233)*43758.5453,r=h-Math.floor(h);if(r<(mat==='glass'?.04:.14)){S.globalAlpha=mat==='glass'?.5:.28;S.fillRect(X(xx),Y(yy),MON.D*.6,MON.D*.6)}}
    if(mat==='wood'||mat==='marble'){S.globalAlpha=.22;S.strokeStyle=dk(base,.55);S.lineWidth=MON.D*.35;for(let i=0;i<5;i++){S.beginPath();const sy=y0+(y1-y0)*(i+.5)/5;S.moveTo(X(x0),Y(sy));for(let xx=x0;xx<=x1;xx+=1)S.lineTo(X(xx),Y(sy+Math.sin(xx*.5+i*1.7)*.8));S.stroke()}}
    /* 광택점 */S.globalAlpha=mat==='cloth'?.15:.55;S.fillStyle='#ffffff';S.fillRect(X(x0+(x1-x0)*.2),Y(y0+(y1-y0)*.12),MON.D*1.2,MON.D*.8)}});};
 const vol=(A,pts,base,lv,mat)=>{A.plate(pts,base,K,lt(base,.3));const mx=pts.reduce((s,q)=>s+q[0],0)/pts.length,my=pts.reduce((s,q)=>s+q[1],0)/pts.length;shadeIn(A,pts.map(p=>[p[0]*.88+mx*.12,p[1]*.88+my*.12]),base,lv,mat)};
 const ellPts=(x,y,rx,ry,n)=>{const o=[];n=n||18;for(let i=0;i<n;i++){const a=i*TAU/n;o.push([x+Math.cos(a)*rx,y+Math.sin(a)*ry])}return o};
 const volE=(A,x,y,rx,ry,base,lv,mat)=>{A.E(x,y,rx,ry,K);A.E(x,y,rx-.5,ry-.5,base);shadeIn(A,ellPts(x,y,rx-.6,ry-.6),base,lv,mat)};
 const pane=(A,pts,base,t,ph,lv)=>{A.plate(pts,base,K,S5);const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys),w=x1-x0,h=y1-y0,q=((t*.35+(ph||0))%1.6)-.3,sl=Math.min(h*.3,w*.3);
  for(const [o,wd,al] of [[0,.9,.45],[.22,.45,.3]]){const cx=x0+w*(q+o),ax=Math.max(x0+.6,Math.min(x1-.6,cx-sl)),bx=Math.max(x0+.6,Math.min(x1-.6,cx+sl));if(ax<bx)A.L(ax,y1-.6,bx,y0+.6,'#ffffff',wd,al)}if(lv)shadeIn(A,pts,base,lv,'glass')};
 const shard=(A,x,y,s,rot,col,l)=>{const p=[[0,-1.2],[.8,.7],[-.7,.9]].map(([a,b])=>[x+(a*Math.cos(rot)-b*Math.sin(rot))*s,y+(a*Math.sin(rot)+b*Math.cos(rot))*s]);A.P(p,K);A.P(p.map(([a,b])=>[x+(a-x)*.78,y+(b-y)*.78]),col);if(l)A.L(p[0][0]*.8+x*.2,p[0][1]*.8+y*.2,p[1][0]*.6+x*.4,p[1][1]*.6+y*.4,l,.3,.8)};
 const crack=(A,x0,y0,x1,y1,seed,col,al)=>{let px=x0,py=y0;for(let i=1;i<=4;i++){const k=i/4,nx=x0+(x1-x0)*k+(i<4?((seed*13+i*7)%5-2)*.5:0),ny=y0+(y1-y0)*k+(i<4?((seed*7+i*11)%5-2)*.4:0);A.L(px,py,nx,ny,col||PK,.35,al==null?.9:al);px=nx;py=ny}};
 const sil=(A,x,y,s,col)=>{A.C(x,y-2.6*s,1*s,col);A.R(x-.8*s,y-1.8*s,1.6*s,2*s,col);A.L(x+.8*s,y-1.6*s,x+2*s,y-3*s,col,.3*s)};
 const eye=(A,x,y,r,col,blk,lv)=>{A.E(x,y,r+.5,r*.75+.4,K);if(!blk){A.E(x,y,r,r*.7,col);if(lv>=2){A.E(x,y+r*.15,r*.45,r*.55,dk(col,.6));A.E(x,y+r*.15,r*.22,r*.3,'#05060a')}A.R(x-r*.45,y-r*.4,r*.4,r*.35,'#ffffff');if(lv>=3)A.R(x+r*.2,y+r*.2,r*.2,r*.2,'#ffffff',.7)}};
 const R={};

 /* 1. 거울문 수문장 — 살아 있는 아치형 거울 문
    lv0 둥근 눈의 단순한 문 → lv1 은 못·시계 문장·열쇠 창 → lv2 돌 조각 문틀(괴물 머리)·갑옷 팔·이빨 → lv3 금 도금 문틀·감긴 사슬·네 눈·소용돌이 거울 면 */
 R.c_s7_gate=A=>{const t=A.t,b=A.bob*.3,lv=LV(),C={st:'#3a3e52',st2:'#5a6078',fr:lv>=3?'#d8c08a':'#c4ccdc',fr2:lv>=3?'#9a7a3a':'#8a94ac',gl:'#1e3a48',gl2:'#2e5a68'};
  A.E(0,1,20,2,'#000',.4);
  for(const s of [-1,1]){vol(A,s<0?[[-15,-5],[-4,-5],[-3,0],[-16,0]]:[[4,-5],[15,-5],[16,0],[3,0]],C.st,lv,'stone');if(lv>=1)for(let i=0;i<3;i++)A.P([[s*(7+i*3.4),0],[s*(8.4+i*3.4),0],[s*(7.8+i*3.4),2.2]],C.st2)}
  const RR=lv>=2?15:14,fr=[];for(let i=0;i<=16;i++){const a=Math.PI+i*Math.PI/16;fr.push([Math.cos(a)*RR,-38+b+Math.sin(a)*RR])}vol(A,[[-RR,-5],...fr,[RR,-5]],C.fr2,lv,lv>=3?'metal':'stone');
  const inner=[[-11,-6],...fr.map(([x,y])=>[x*.76,-38+b+(y+38-b)*.76]),[11,-6]];A.P(inner,K);A.P(inner.map(([x,y])=>[x*.95,y]),C.gl);
  for(let i=0;i<5;i++){const yy=-8-i*7+b;A.R(-10,yy,20,3,i%2?C.gl2:C.gl,.7)}const q=((t*.4)%1.6)-.3;A.L(-10+q*20,-6,-10+q*20+8,-44+b,'#ffffff',1.2,.35);
  if(lv>=3)for(let k=0;k<3;k++){const r=4+k*3+Math.sin(t*2+k)*.6;for(let i=0;i<10;i++){const a=-t*(1+k*.4)+i*TAU/10;A.R(Math.cos(a)*r-.3,-26+b+Math.sin(a)*r*1.3-.3,.6,.6,k%2?TL2:VI2,.6)}}
  if(A.pul>0)A.ring(0,-24+b,4+A.pul*8,.5,TL2,.6*A.pul);
  if(lv>=1){for(let i=1;i<16;i+=2){const [x,y]=fr[i];A.C(x*.89,y*.92-2.8,.7,lv>=3?GD2:S5)}for(const s of [-1,1])for(let i=0;i<4;i++)A.C(s*(RR-1.4),-10-i*7+b,.6,lv>=3?GD2:S5)}
  if(lv>=2)for(const s of [-1,1]){const x=s*(RR-1),y=-40+b;vol(A,[[x-2.6,y+2],[x+2.6,y+2],[x+3,y-2],[x,y-4],[x-3,y-2]],C.st2,lv,'stone');A.R(x-1.6,y-1.2,1.2,.8,TL);A.R(x+.4,y-1.2,1.2,.8,TL);A.P([[x-1.4,y+1],[x+1.4,y+1],[x,y+3]],K)}
  if(lv>=3)for(let i=0;i<12;i++){const k=i/11,x=-RR+k*RR*2,y=-14+b-Math.sin(k*Math.PI)*6;A.E(x,y,1,.6,K);A.E(x,y,.7,.35,'#8a8a96')}
  {const y=-28+b,blk=A.blink||A.dm;eye(A,-4,y,1.8,TL,blk,lv);eye(A,4,y,1.8,TL,blk,lv);if(lv>=3){eye(A,-6.6,y-4.4,1,PK,blk,lv);eye(A,6.6,y-4.4,1,PK,blk,lv)}if(!blk)A.glow(0,y,8,TL,.5+A.pul*.4);
   if(lv>=1){A.L(-6,y-3,-2,y-2.2,TL2,.4,.6);A.L(6,y-3,2,y-2.2,TL2,.4,.6)}
   if(lv>=2){A.P([[-5,y+4],[5,y+4],[4,y+7],[-4,y+7]],K);for(let i=0;i<6;i++){A.P([[-4.4+i*1.6,y+4],[-3.4+i*1.6,y+4],[-3.9+i*1.6,y+5.6]],S5);A.P([[-4+i*1.6,y+7],[-3+i*1.6,y+7],[-3.5+i*1.6,y+5.6]],S4)}}else crack(A,-5,y+5,5,y+5,4,PK,.9)}
  if(lv>=1){const y=-54+b;for(const s of [-1,1]){const hl=lv>=3?3:lv>=2?1.6:0;A.P([[s*4,y+5],[s*(9+hl),y-1-hl*.5],[s*7,y+5.6]],C.fr2);A.P([[s*4.4,y+4.6],[s*(8.4+hl),y-.4-hl*.5],[s*6.6,y+5]],lv>=3?GD2:S4)}A.C(0,y+3,4.6,K);A.C(0,y+3,4,C.fr);A.C(0,y+3,3.2,'#f0f6ff');for(let i=0;i<13;i++){const a=i*TAU/13-Math.PI/2;A.R(Math.cos(a)*2.6-.2,y+3+Math.sin(a)*2.6-.2,.4,.4,i===12?PK:S2)}const h=-t*1.4;A.L(0,y+3,Math.cos(h)*2.2,y+3+Math.sin(h)*2.2,S1,.35)}
  for(const s of [-1,1]){const sx=s*9,sy=-22+b;A.ring(sx,sy,2.6,.4,TL2,.6);const ex=s*20,ey=-26+b+Math.sin(t*1.6+s)*1;lim(A,sx,sy,s*15,-30+b,2,S3,S5);lim(A,s*15,-30+b,ex,ey,1.8,S3,S5);
   if(lv>=2){vol(A,s<0?[[-17,-31+b],[-13,-32+b],[-12.6,-28.6+b],[-16.4,-27+b]]:[[13,-32+b],[17,-31+b],[16.4,-27+b],[12.6,-28.6+b]],S2,lv,'metal');A.R(s*15-1.4,-29.6+b,2.8,.5,lv>=3?GD:S5)}A.C(ex,ey,2.2,K);A.C(ex,ey,1.7,S4);if(lv>=2)for(let i=0;i<3;i++)A.L(ex,ey,ex+s*(1.4+i*.3),ey+1.6-i*1.4,S4,.5)}
  if(lv>=1){const x=20,y0=-4,y1=-52+b;lim(A,x,y0,x,y1+6,1,S2,S4);A.C(x,y1+3,3.2,K);A.C(x,y1+3,2.6,GD);A.C(x,y1+3,1.2,K);for(const [dx,dy,w,h] of [[1.4,y1+8,3.6,1.2],[1.4,y1+11,2.6,1.2]])A.R(x+dx-.2,dy,w,h,GD);if(lv>=2)A.P([[x-1,y1+14],[x-4,y1+18],[x-1,y1+20]],S4);A.glow(x,y1+3,4,GD,.4)}
  {const x=-20,y=-26+b;A.C(x,y-.4,.9,K);A.P([[x-.6,y],[x+.6,y],[x+.9,y+2],[x-.9,y+2]],K);A.glow(x,y,3,TL,.6)}
  A.bbox=[-24,-56,24,3]};

 /* 2. 유리 공작 — lv0 깃털 7개·둥근 몸 → lv1 13개 → lv2 두 겹·금속 부리·발톱·입체 몸 → lv3 겹 27개·수정 왕관·무지갯빛 결·긴 목 */
 R.c_s7_peacock=A=>{const t=A.t,b=A.bob*.4,lv=LV(),C={b1:'#123040',b2:'#1e5a6a',b3:'#3aa0a8',b4:'#8af0e0'};
  A.E(0,1,16,1.8,'#000',.35);
  const feather=(a,L,i,small)=>{const cy=-14+b,ex=Math.cos(a)*L,ey=cy+Math.sin(a)*L*.95,nb=lv>=2?7:5;A.L(0,cy,ex,ey,C.b2,small?1:1.4);A.L(0,cy,ex,ey,C.b4,.3,.6);
   for(let j=1;j<nb;j++){const k=j/nb,x=Math.cos(a)*L*k,y=cy+Math.sin(a)*L*.95*k,w=lv>=3?3:2.4;A.L(x,y,x+Math.cos(a+.5)*w,y+Math.sin(a+.5)*w,lv>=3&&j%2?'#9a8aff':C.b3,.4,.7);A.L(x,y,x+Math.cos(a-.5)*w,y+Math.sin(a-.5)*w,lv>=3&&j%2?'#5af0b0':C.b3,.4,.7)}
   const r=small?2.2:3.2,bl=Math.floor(t*1.5+i*.7)%7===0;A.E(ex,ey,r,r*.8,K);A.E(ex,ey,r-.5,r*.8-.5,S4);A.E(ex,ey,r-1.3,r*.8-1.1,bl?S3:'#1a3a4a');if(!bl){A.C(ex,ey,r*.28,i%3?TL:VI);if(lv>=2)A.C(ex,ey,r*.12,'#05060a');A.R(ex-r*.4,ey-r*.3,.7,.5,'#ffffff')}A.ring(ex,ey,r-.5,.35,GD,.8)};
  {const sp=.92+Math.sin(t*1.2)*.04+A.pul*.05;if(lv>=2){const n=lv>=3?12:8;for(let i=0;i<n;i++){const a=Math.PI+(.17+i*(.66/(n-1)))*Math.PI*sp;feather(a,lv>=3?35:33,i+20,true)}}
   const n=lv===0?7:lv===1?13:lv===2?13:15;for(let i=0;i<n;i++){const a=Math.PI+(.12+i*(.76/(n-1)))*Math.PI*sp;feather(a,(lv===0?24:29)+((i%2)?-3:2),i,false)}}
  for(const s of [-1,1]){lim(A,s*2,-10+b,s*3,-1,lv>=2?.9:.7,GD,GD2);for(let i=-1;i<=1;i++){A.L(s*3,-1,s*3+i*1.4,.6,GD,.4);if(lv>=2)A.P([[s*3+i*1.4,.6],[s*3+i*1.4+.5,1.4],[s*3+i*1.4-.3,1]],S5)}}
  {const y=-14+b,rx=lv===0?6.6:6,ry=lv===0?6.6:7.4;volE(A,0,y,rx,ry,C.b2,lv,'glass');if(lv>=1)for(let i=0;i<4;i++)for(let j=0;j<3;j++){const x=-3+j*3,yy=y-4+i*2.6+(j%2)*.8;A.P([[x,yy-1],[x+1.2,yy+.6],[x-1.2,yy+.6]],i%2?C.b3:C.b4,.8)}A.L(-3,y+5,3,y-5,'#ffffff',.5,.3)}
  {const nl=lv>=3?8:6;let px=0,py=-20+b;for(let i=1;i<=nl;i++){const nx=Math.sin(i*.6+t*.8)*1.2-i*.3,ny=-20+b-i*2.6*(6/nl)*(lv>=3?1.15:1);lim(A,px,py,nx,ny,2.2-i*.12,C.b2,C.b4);if(lv>=2)A.R(nx-.3,ny-.3,.6,.6,C.b4,.7);px=nx;py=ny}const hx=px,hy=py-1.6;volE(A,hx,hy,2.8,2.2,C.b3,lv,'glass');
   if(lv>=2){A.P([[hx-2.2,hy-.2],[hx-5.4,hy+.6],[hx-2.2,hy+1.4]],K);A.P([[hx-2.4,hy+.1],[hx-5,hy+.6],[hx-2.4,hy+1]],S4)}else A.P([[hx-2.2,hy+.2],[hx-4.6,hy+.8],[hx-2.2,hy+1.2]],GD);eye(A,hx-.4,hy-.3,.8,VI,A.blink||A.dm,lv);if(!A.dm)A.glow(hx-.4,hy-.3,3,VI,.6);
   const cn=lv>=3?5:3;for(let i=0;i<cn;i++){const o=i-(cn-1)/2,x=hx+o*1.3,y=hy-2,L=lv>=3?5.4:4.4;A.L(x,y,x+o*1.2,y-L,C.b4,.3);A.P([[x+o*1.2,y-L-1.4],[x+o*1.2+.8,y-L-.2],[x+o*1.2,y-L+.8],[x+o*1.2-.8,y-L-.2]],o?TL:PK);A.glow(x+o*1.2,y-L-.2,2,TL,.5)}}
  if(lv>=1)A.rise(lv>=3?10:6,-24,24,-30,30,.3,TL2,.4,.4);A.bbox=[-36,-58,36,2]};

 /* 3. 역류의 분수 — lv0 작은 물기둥 → lv1 물의 팔·왕관 → lv2 사자머리 수반·물결 근육 → lv3 3단 수반·얼음 갑옷·물 삼지창 */
 R.c_s7_fountain=A=>{const t=A.t,b=A.bob*.6,lv=LV(),C={s1:'#3a4258',s2:'#5a6680',s3:'#8a96b0',w1:'#1e6a8a',w2:'#3aa8d0',w3:'#8ae0ff',w4:'#e0faff'};
  A.E(0,1,19,2,'#000',.35);
  vol(A,[[-4,-6],[4,-6],[5,0],[-5,0]],C.s1,lv,'marble');const bw=lv===0?13:17;vol(A,[[-bw,-14],[bw,-14],[bw-4,-6],[-bw+4,-6]],C.s2,lv,'marble');A.R(-bw,-14.6,bw*2,1.4,C.s3);
  if(lv>=1)for(let i=0;i<6;i++)A.R(-14+i*5.6,-11,2.4,2.4,C.s1,.8);A.E(0,-14.6,bw-2,1.4,C.w2);
  if(lv>=2)for(const s of [-1,1]){const x=s*(bw-3),y=-10;volE(A,x,y,2.4,2.2,C.s3,lv,'marble');A.R(x-1.2,y-.8,.8,.6,K);A.R(x+.4,y-.8,.8,.6,K);A.E(x,y+1,1,.6,K);for(let i=0;i<4;i++){const q=((t*1.5)+i/4)%1;A.C(x+s*q*3,y-2-q*10,.6,C.w4,1-q)}}
  if(lv>=3){vol(A,[[-12,-20],[12,-20],[10,-17],[-10,-17]],C.s2,lv,'marble');A.E(0,-20.4,10,1,C.w2)}
  {const top=-40+b,w=lv===0?4:6;A.P([[-w,-14],[w,-14],[w-1,top+10],[w+1,top],[-w-1,top],[-w+1,top+10]],C.w1,.92);const nn=lv>=2?12:8;
   for(let i=0;i<nn;i++){const q=((t*1.2)+i/nn)%1,y=-14-q*(-14-top);A.L(-w+1+Math.sin(i+q*6)*1,y,-w+3+Math.sin(i+q*6)*1,y-3,C.w3,.4,.7*(1-q*.4));A.L(w-2-Math.sin(i)*1,y-2,w-1.4-Math.sin(i)*1,y-5,C.w4,.3,.5)}
   if(lv>=2){for(const s of [-1,1]){A.E(s*2.4,-30+b,2.4,2,C.w2,.7);A.E(s*2.4,-30.6+b,1.6,1,C.w3,.5)}for(let i=0;i<3;i++)A.E(0,-24+b+i*3,2.6,1,C.w2,.6)}
   if(lv>=3){for(const s of [-1,1]){A.P(s<0?[[-8,top+3],[-2,top+1],[-2,top+6],[-7,top+7]]:[[2,top+1],[8,top+3],[7,top+7],[2,top+6]],K);A.P(s<0?[[-7.4,top+3.4],[-2.4,top+1.6],[-2.4,top+5.6],[-6.6,top+6.4]]:[[2.4,top+1.6],[7.4,top+3.4],[6.6,top+6.4],[2.4,top+5.6]],'#d0f4ff',.9)}A.L(-6,top+2,6,top+2,'#ffffff',.4,.6)}
   A.L(-4,-14,-3,top+2,'#ffffff',.4,.35)}
  if(lv>=1)for(const s of [-1,1]){let px=s*5,py=-28+b;for(let i=1;i<=6;i++){const nx=s*(5+i*2.4),ny=-28+b-Math.sin(i*.5)*6+Math.sin(t*2+i+s)*.8;A.L(px,py,nx,ny,C.w2,2.4-i*.15,.9);A.L(px,py,nx,ny,C.w4,.3,.6);px=nx;py=ny}A.C(px,py,2.2,C.w2,.9);A.C(px-s*.4,py-.4,1,C.w4,.8);
   if(lv>=2)for(let i=0;i<3;i++)A.L(px,py,px+s*(1+i*.6),py-1.6-i*.6,C.w3,.5);for(let i=0;i<3;i++){const q=((t*1.4)+i/3)%1;A.C(px+s*(1+i),py-2-q*8,.5,C.w4,1-q)}
   if(lv>=3&&s>0){lim(A,px,py+8,px,py-12,.6,C.w3,C.w4);for(const d of [-1.6,0,1.6])A.P([[px+d-.6,py-12],[px+d+.6,py-12],[px+d,py-15]],C.w4)}}
  {const y=-36+b;eye(A,-2.6,y,1.4,'#ffffff',A.blink||A.dm,lv);eye(A,2.6,y,1.4,'#ffffff',A.blink||A.dm,lv);if(!A.blink&&!A.dm){A.C(-2.6,y,.6,VI);A.C(2.6,y,.6,VI);A.glow(0,y,6,C.w3,.6)}A.E(0,y+3.6,1.6,.6+A.open*1.2,K);if(lv>=2){A.L(-4,y-2.4,-1.4,y-1.8,C.w4,.4);A.L(4,y-2.4,1.4,y-1.8,C.w4,.4)}}
  if(lv>=1){const y=-44+b,n=lv>=3?13:9;for(let i=0;i<n;i++){const a=Math.PI+(i+.5)*Math.PI/n,q=((t*1.6)+i*.11)%1,r=4+q*(lv>=3?7:6);A.C(Math.cos(a)*r,y+Math.sin(a)*r*1.1,.8-q*.4,C.w4,1-q)}A.E(0,y+2,6,1.6,C.w3,.8)}
  for(let i=0;i<(lv>=2?3:lv>=1?2:1);i++){const q=((t*.5)+i/3)%1,x=(i%2?3:-3)+Math.sin(q*8)*1.4,y=-15-q*26+b;A.P([[x,y-1.6],[x+1,y],[x,y+1],[x-1,y]],S4);A.P([[x,y+1],[x+1,y+2.4],[x-1,y+2.4]],S3)}
  A.bbox=[-24,-58,24,3]};

 /* 4. 흑백 체스 왕 — lv0 작고 단순 → lv1 반전 눈·왕관·홀·졸 → lv2 체크무늬 망토·화려한 왕관·대리석 결·금 → lv3 성채 어깨 갑옷·빛나는 문양 */
 R.c_s7_chess=A=>{const t=A.t,b=A.bob*.25,lv=LV(),BK='#16161e',BK2='#2e2e3c',WH='#e8ecf4',WH2='#b0b8c8';
  for(let i=-4;i<4;i++)for(let j=0;j<2;j++)A.P([[i*5+j*2,-1+j*1.6],[i*5+5+j*2,-1+j*1.6],[i*5+5+j*2+2,.6+j*1.6],[i*5+j*2+2,.6+j*1.6]],(i+j)%2?BK2:WH2,.7);
  const half=(L,Rr)=>{A.P(L,BK);shadeIn(A,L,BK2,lv,'marble');A.P(Rr,WH);shadeIn(A,Rr,WH,lv,'marble')};
  const sc=lv===0?.85:1;A.push(sc,0,0);
  if(lv>=2){const pts=[[-8,-34+b],[8,-34+b],[14,-6],[-14,-6]];A.P(pts,K);clipPath(A,pts.map(([x,y])=>[x*.93,y-.4]),(S,X,Y)=>{for(let i=-7;i<7;i++)for(let j=0;j<8;j++){S.fillStyle=(i+j)%2?'#3a2a4a':'#d8d0e8';S.fillRect(X(i*2.2),Y(-34+b+j*4),MON.D*2.2+1,MON.D*4+1)}});shadeIn(A,pts.map(([x,y])=>[x*.93,y-.4]),'#8a7aa0',lv,'cloth')}
  for(const [w,y0,h] of [[15,-5,5],[12,-9,4],[9,-12,3]]){A.P([[-w-.6,y0+h+.4],[w+.6,y0+h+.4],[w+.6,y0-.4],[-w-.6,y0-.4]],K);half([[-w,y0+h],[0,y0+h],[0,y0],[-w,y0]],[[0,y0+h],[w,y0+h],[w,y0],[0,y0]])}
  A.P([[-8.8,-11.4+b],[8.8,-11.4+b],[4.8,-24+b],[6.8,-34.6+b],[-6.8,-34.6+b],[-4.8,-24+b]],K);half([[-8,-12+b],[0,-12+b],[0,-34+b],[-6,-34+b],[-4,-24+b]],[[0,-12+b],[8,-12+b],[4,-24+b],[6,-34+b],[0,-34+b]]);
  if(lv>=2){crack(A,-6,-30+b,-2,-14+b,3,TL,.8);crack(A,5,-28+b,2,-16+b,8,PK,.8)}
  if(lv>=3)for(let i=0;i<3;i++){const y=-16+b-i*5;A.P([[-1,y],[0,y-1.6],[1,y],[0,y+1.6]],i%2?TL:PK);A.glow(0,y,2.4,TL,.5)}
  A.P([[-8,-37+b],[8,-37+b],[8,-34+b],[-8,-34+b]],K);half([[-7.4,-36.6+b],[0,-36.6+b],[0,-34.4+b],[-7.4,-34.4+b]],[[0,-36.6+b],[7.4,-36.6+b],[7.4,-34.4+b],[0,-34.4+b]]);
  if(lv>=3)for(const s of [-1,1]){const x=s*9,y=-36+b;vol(A,[[x-3,y-2],[x+3,y-2],[x+3,y+3],[x-3,y+3]],s<0?BK2:WH2,lv,'marble');for(let i=0;i<3;i++)A.R(x-3+i*2.2,y-3.2,1.4,1.4,s<0?BK2:WH2)}
  {const y=-42+b;A.C(0,y,5.4,K);half([[0,y-5],[0,y+5],[-5,y+2],[-5,y-2]],[[0,y-5],[5,y-2],[5,y+2],[0,y+5]]);
   if(lv>=1){if(!A.blink&&!A.dm){A.E(-2.4,y,1.3,1,WH);A.C(-2.4,y,.5,TL);A.E(2.4,y,1.3,1,BK);A.C(2.4,y,.5,PK);A.glow(0,y,5,TL,.4)}else{A.L(-3.4,y,-1.4,y,WH,.4);A.L(1.4,y,3.4,y,BK,.4)}}else{A.C(-2,y,.7,WH);A.C(2,y,.7,BK)}}
  {const y=(lv>=2?-47:-48)+b,hh=lv>=2?1:0;A.P([[-5,y+1],[5,y+1],[6+hh,y-3-hh],[3,y-1.4],[0,y-4.6-hh],[-3,y-1.4],[-6-hh,y-3-hh]],K);A.P([[-4.4,y+.6],[0,y+.6],[0,y-3.8-hh],[-2.8,y-1.6],[-5.2-hh,y-2.4-hh]],WH);A.P([[0,y+.6],[4.4,y+.6],[5.2+hh,y-2.4-hh],[2.8,y-1.6],[0,y-3.8-hh]],BK);
   if(lv>=1){A.P([[0,y-9-hh],[1.6,y-6.6-hh],[0,y-4.2-hh],[-1.6,y-6.6-hh]],K);A.P([[0,y-8.4-hh],[1.1,y-6.6-hh],[0,y-4.8-hh],[-1.1,y-6.6-hh]],GD);A.glow(0,y-6.6-hh,3,GD,.5)}if(lv>=2)for(const s of [-1,1])A.C(s*3,y-.6,.5,s<0?TL:PK)}
  if(lv>=1){lim(A,-6,-30+b,-13,-22+b,1.6,WH2,WH);A.C(-13,-21+b,1.6,WH);lim(A,-13,-8+b,-13,-42+b,.9,WH,'#ffffff');A.box(-15.4,-46+b,4.8,4,WH,WH2,'#ffffff');for(let i=0;i<3;i++)A.R(-15.4+i*1.8,-47.4+b,1.2,1.4,WH);
   lim(A,6,-30+b,13,-22+b,1.6,BK2,S2);A.C(13,-21+b,1.6,BK);A.C(13,-25.6+b,3,K);A.P([[13,-28.2+b],[13,-23+b],[10.4,-25.6+b]],WH);A.P([[13,-28.2+b],[13,-23+b],[15.6,-25.6+b]],BK2);A.glow(13,-25.6+b,4,TL,.4+A.pul*.4);
   for(const s of [-1,1]){const x=s*23,y=-12+b+Math.sin(t*1.6+s)*1.4,c=s<0?BK:WH,c2=s<0?BK2:WH2;A.C(x,y-6,1.8,K);A.C(x,y-6,1.4,c);A.P([[x-2.4,y],[x+2.4,y],[x+1,y-4],[x-1,y-4]],K);A.P([[x-2,y-.4],[x+2,y-.4],[x+.8,y-3.8],[x-.8,y-3.8]],c);A.R(x-2.4,y-.6,4.8,1,c2)}}
  A.pop();A.bbox=[-26,-58,26,4]};

 /* 5. 거꾸로 타는 초 — 바로 선 커다란 초 (손잡이 달린 촛대 접시 위). 거울 세계라 불꽃은 거꾸로 된 물방울 모양의 차가운 청록 불, 촛농은 아래가 아니라 위로 흘러오름
    lv0 굵은 초 하나 → lv1 녹은 윗면·촛농·새겨진 얼굴·손잡이 → lv2 촛대 가지 양쪽 작은 초·녹은 왕관 → lv3 5갈래 큰 촛대·나선 조각·큰 불꽃과 불티 */
 R.c_s7_candle=A=>{const t=A.t,b=A.bob*.25,lv=LV(),C={w1:'#f6eefa',w2:'#dcd0ec',w3:'#a898c4',w4:'#6a5a8a',m1:'#8a8a9a',m2:'#c8c8d4',m3:'#5a5a6a'};
  /* 거꾸로 된 물방울 불꽃: 위가 둥글고 넓고 심지 쪽이 뾰족 */
  const fl=(x,y,s)=>{const f=Math.sin(t*8+x)*.4*s,big=s*(1+A.pul*.25),h=7*big;A.glow(x,y-h*.6,7*big,TL,.75);
   A.P([[x,y],[x+2.6*big+f*.3,y-h*.55],[x+2*big+f,y-h*.9],[x+f,y-h],[x-2*big+f,y-h*.9],[x-2.6*big+f*.3,y-h*.55]],'#1e8a8a',.95);
   A.P([[x,y-.6],[x+1.7*big,y-h*.55],[x+1.2*big+f*.8,y-h*.85],[x-1.2*big+f*.8,y-h*.85],[x-1.7*big,y-h*.55]],TL);A.P([[x,y-1.4],[x+.8*big,y-h*.5],[x+f*.6,y-h*.7],[x-.8*big,y-h*.5]],'#ffffff',.95);
   if(lv>=3)for(let i=0;i<3;i++){const q=((t*1.4)+i/3)%1;A.C(x+Math.sin(i*2+q*5)*2*s,y-h-q*6*s,.5*s,TL2,1-q)}};
  const candle=(x,yb,h,w,main)=>{/* yb=밑면 */const yt=yb-h,top=[];for(let i=0;i<=6;i++){const k=i/6;top.push([x-w+k*2*w,yt+(i%2?.9:0)+(main&&lv>=1?Math.sin(i*1.7)*.5:0)])}
   const body=[[x-w,yb],[x+w,yb],...top.slice().reverse()];vol(A,body,C.w2,lv,'wax');A.E(x,yt+.4,w,1,C.w1);A.E(x,yt+.5,w*.6,.5,C.w3);
   /* 촛농: 옆면을 타고 위로 흘러오름 */if(main||lv>=3)for(const sd of [-1,1])for(let i=0;i<(main?(lv>=1?2:1):1);i++){const hh=(main?6:2.4)+i*4+(lv>=3?2:0),q=Math.sin(t*1.2+i+sd)*.5,ex=x+sd*w,y0=yb-1-i*3;A.P([[ex,y0],[ex+sd*1.2,y0-.6],[ex+sd*1.1,y0-hh+q],[ex+sd*.2,y0-hh-1+q],[ex,y0-hh*.4]],C.w1);A.C(ex+sd*.7,y0-hh+q,.7,C.w1)}
   A.R(x-.25,yt-1.4,.5,1.6,K);fl(x,yt-1.4,main?1:.5)};
  A.E(0,1,15,1.8,'#000',.35);A.E(0,0,9,1.2,TL,.2);
  /* 촛대 접시 + 손잡이 */vol(A,[[-12,-3],[12,-3],[10,0],[-10,0]],C.m1,lv,'metal');A.E(0,-3,12,1.4,C.m2);if(lv>=1){A.ring(13.6,-2,2.2,.7,C.m1);A.ring(13.6,-2,2.2,.3,C.m2)}
  /* 촛대 가지 (lv2+) */if(lv>=2){const arms=lv>=3?[[-1,9,14],[1,9,14],[-1,16,8],[1,16,8]]:[[-1,11,10],[1,11,10]];for(const [s,ax,h] of arms){const ay=-6-h*.9;for(let i=0;i<9;i++){const k=i/8,xx=s*(3+k*(ax-3)),yy=-4-Math.sin(k*Math.PI*.5)*(h*.9-2)-k*2;A.R(xx-.5,yy-.5,1,1,C.m1)}A.E(s*ax,ay,2.6,.8,C.m1);A.R(s*ax-2.6,ay,5.2,.5,C.m2);candle(s*ax,ay,lv>=3?7:8,1.5,false)}}
  /* 본체 초 */{const w=lv===0?6:6.6,h=lv>=3?36:lv===0?28:32;candle(0,-3,h,w,true);const yt=-3-h;
   if(lv>=3)for(let i=0;i<13;i++){const yy=yt+3+i*2.4,x=Math.sin(i*.9)*(w-1.4);A.R(x-.6,yy,1.2,.6,C.w3,.7)}
   if(lv>=1){const y=yt+h*.38;eye(A,-2.4,y,1.2,VI,A.blink||A.dm,lv);eye(A,2.4,y,1.2,VI,A.blink||A.dm,lv);if(!A.dm){A.glow(0,y,5,VI,.5);A.R(-2.6,y+1.4,.4,1.6,C.w1);A.C(-2.4,y+3,.45,C.w1)}A.P([[-2,y+3.6],[2,y+3.6],[0,y+4.6+A.open*1.4]],K);if(lv>=2){A.L(-3.8,y-2.2,-1.2,y-1.6,C.w4,.4);A.L(3.8,y-2.2,1.2,y-1.6,C.w4,.4)}}
   else{A.C(-2,yt+h*.4,.8,C.w4);A.C(2,yt+h*.4,.8,C.w4)}
   if(lv>=2)for(let i=0;i<5;i++){const x=-w+1+i*(2*w-2)/4;A.P([[x-1,yt+2.4],[x+1,yt+2.4],[x,yt+5+(i%2)*1.4]],GD)}}
  A.bbox=[-24,-56,24,3]};

 /* 6. 오르골 발레리나 — lv0 작은 상자와 인형 → lv1 금 간 거울 뚜껑·칼날 치마 → lv2 금 장식 상자·유리창 속 톱니·리본 → lv3 사람 비율의 도자기 무희·관절·광택 */
 R.c_s7_ballet=A=>{const t=A.t,b=A.bob*.2,lv=LV(),C={bx:'#3a2240',bx2:'#5a3460',bx3:'#8a5a8a',pc:'#f6f0f4',pc2:'#d8c8d8',tu:'#ffb0d8',tu2:'#ff7ab8'};
  A.E(0,1,18,1.8,'#000',.35);
  const bw=lv===0?12:16;
  if(lv>=1){A.P([[-bw+1,-14],[bw-1,-14],[bw-3,-40],[-bw+3,-40]],K);A.P([[-bw+2,-14.6],[bw-2,-14.6],[bw-3.8,-39.4],[-bw+3.8,-39.4]],C.bx2);pane(A,[[-11,-17],[11,-17],[9.6,-37],[-9.6,-37]],'#cfd8ec',t,0,lv);crack(A,-7,-36,3,-20,6);crack(A,6,-35,-1,-24,9);for(let i=0;i<5;i++)A.C(-10+i*5,-39,.5,GD);
   if(lv>=2)for(let i=0;i<8;i++){const k=i/7;A.C(-bw+3+k*(bw*2-6),-40.4+Math.sin(k*Math.PI*3)*.8,.6,GD2)}}
  {vol(A,[[-bw,-14],[bw,-14],[bw,0],[-bw,0]],C.bx,lv,'wood');A.R(-bw,-14,bw*2,1.4,GD);A.R(-bw,-1.6,bw*2,1.2,GD);
   if(lv>=2){A.R(-6,-11,12,8,'#1a1020');A.gear(-2.6,-7,2.4,8,t*2,GD,K);A.gear(2.4,-6,1.8,7,-t*2.6,GD2,K);A.R(-6,-11,12,8,'#cfd8ec',.15);for(const s of [-1,1])for(let i=0;i<3;i++){const x=s*(9+i*2.4);A.L(x,-12,x+s*1.4,-3,GD,.4,.8);A.C(x+s*.7,-7.5,.6,GD2)}}
   else if(lv>=1)for(let i=0;i<4;i++){A.R(-13+i*8,-10,5,5,C.bx2);A.ring(-10.5+i*8,-7.5,1.6,.35,GD,.8)}
   if(lv>=1){const x=bw+2,y=-7,sx=Math.cos(t*3);A.R(bw,y-.5,2.6,1,GD);for(const s of [-1,1])A.E(x+1.4,y+s*2*Math.abs(sx),1,Math.max(.3,1.6*Math.abs(sx)),GD2)}}
  A.E(0,-14.8,6,1.2,GD);A.R(-.4,-17,.8,2.4,GD2);
  {const sp=t*2.4,s=lv>=3?1.35:lv===0?.8:1,y0=-17;A.push(s,0,y0);
   if(lv>=2)for(const d of [-1,1]){let px=0,py=y0-14;for(let i=1;i<=8;i++){const nx=d*i*1.5+Math.sin(t*3+i)*1,ny=y0-14+i*1.2+Math.cos(t*2+i)*1;A.L(px,py,nx,ny,d<0?C.tu2:VI2,.6,.85);px=nx;py=ny}}
   lim(A,0,y0,.4,y0-7,.9,C.pc,'#ffffff');lim(A,0,y0-7,Math.cos(sp)*4,y0-9,.8,C.pc,'#ffffff');if(lv>=3){A.C(.3,y0-7,.6,C.pc2);A.C(0,y0-.4,.5,C.pc2)}
   for(let k=0;k<(lv>=1?2:1);k++){const yy=y0-8.6-k*1.4,r=(lv>=1?8:6)-k*2.2;for(let i=0;i<12;i++){const a=sp*(k?-1:1)+i*TAU/12,x=Math.cos(a)*r,front=Math.sin(a)>-.2;A.P([[x*.4,yy],[x,yy+Math.sin(a)*.8+.8],[x*1.12,yy+Math.sin(a)*.8-.4]],front?(k?C.tu:C.tu2):C.bx3,front?1:.6);if(lv>=2&&front&&i%2)A.L(x*.5,yy,x*1.05,yy+Math.sin(a)*.8,'#ffffff',.25,.6)}A.E(0,yy,r*.5,1,k?C.tu:C.tu2)}
   const bp=[[-1.4,y0-10.4],[1.4,y0-10.4],[1,y0-16.6],[-1,y0-16.6]];A.P([[-1.8,y0-10],[1.8,y0-10],[1.4,y0-17],[-1.4,y0-17]],K);A.P(bp,C.pc);shadeIn(A,bp,C.pc,lv,'glass');A.R(-1,y0-12,2,.5,C.tu2);
   for(const sd of [-1,1]){const a=sp+(sd>0?0:Math.PI),ax=Math.cos(a)*3.6;lim(A,sd*1.2,y0-16,ax,y0-21.6,.6,C.pc,'#ffffff');if(lv>=3)A.C(sd*1.2,y0-16,.4,C.pc2)}
   const hy=y0-19.6;A.C(0,hy,2.4,K);A.C(0,hy,2,C.pc);A.E(0,hy-1.4,2.2,1.2,C.pc2);A.C(0,hy-2.6,1.1,C.pc2);if(!A.blink&&!A.dm){A.L(-1.2,hy-.2,-.4,hy-.2,K,.3);A.L(.4,hy-.2,1.2,hy-.2,K,.3);if(lv>=2){A.R(-1,hy-.6,.4,.3,VI);A.R(.6,hy-.6,.4,.3,VI)}}
   if(lv>=1){A.C(.9,hy+.9,.3,'#7ad0ff');crack(A,-1.4,hy-1.6,-.2,hy+1.4,3,PK,.8)}if(lv>=2)A.R(-.6,hy+1.2,1.2,.3,'#e0607a');for(let i=0;i<5;i++){const a=-Math.PI/2+(i-2)*.5;A.R(Math.cos(a)*2.4-.2,hy-1.4+Math.sin(a)*2.4-.2,.4,.4,GD2)}A.glow(0,hy,4,'#ffb0d8',.3+A.pul*.4);A.pop()}
  if(lv>=1)for(let i=0;i<4;i++){const q=((t*.4)+i/4)%1,x=-18+i*12+Math.sin(q*6)*2,y=-44+q*10;A.C(x,y,.9,VI2,Math.sin(q*Math.PI));A.L(x+.8,y,x+.8,y+3,VI2,.3,Math.sin(q*Math.PI))}
  A.bbox=[-22,-56,22,2]};

 /* 7. 뒤집힌 회전목마 — lv0 목마 4마리 → lv1 6마리·얼굴 지붕 → lv2 지붕 전구·꼬인 금 기둥·안장 → lv3 2단 지붕 왕관·거울 갑옷 목마·빛나는 눈 */
 R.c_s7_carousel=A=>{const t=A.t,b=A.bob*.3,lv=LV(),C={r1:'#3a2450',r2:'#6a3a8a',r3:'#c88ae0',st:'#f2e8ff',bs:'#2a1e38'};
  A.E(0,1,22,2,'#000',.4);
  A.E(0,-2,20,3.4,K);A.E(0,-2.4,19,2.8,C.bs);for(let i=0;i<12;i++){const a=i*TAU/12;A.C(Math.cos(a)*17,-2.4+Math.sin(a)*2.2,.5,GD)}
  const nH=lv===0?4:6,sp=-t*.8,horse=(a,front)=>{const x=Math.cos(a)*16,y=-26+b+Math.sin(a)*2+Math.sin(t*3+a*2)*1.6,al=front?1:.55;
   if(lv>=2&&front){for(let i=0;i<10;i++)A.R(x-.4+((i%2)?.4:0),-5.4-i*3.4,.5,2,GD,al)}else A.L(x,-2,x,-40+b,front?GD:'#8a6a3a',.5,al);
   const c=front?C.st:'#9a90b0';A.E(x,y,4,2,K,al);A.E(x,y,3.4,1.5,c,al);if(front)shadeIn(A,ellPts(x,y,3.4,1.5),c,lv,'glass');A.P([[x+3,y-.4],[x+5.4,y+2.4],[x+4,y+3],[x+2.4,y+.8]],c,al);for(const d of [-2,-.6,1,2.2])A.L(x+d,y-1.4,x+d+.4,y-4.2,c,.6,al);
   for(let j=0;j<3;j++)A.P([[x+2.4+j*.6,y+1],[x+3+j*.6,y+3],[x+1.8+j*.6,y+2.2]],front?TL2:S3,al);
   if(front){A.R(x+4.4,y+2,.5,.5,lv>=3?PK:K);if(lv>=3)A.glow(x+4.4,y+2.2,2,PK,.6);A.R(x-1,y-.4,2,.6,PK);if(lv>=2){A.R(x-1.6,y+1,3.2,.8,'#7a3a2a');A.R(x-1.6,y+1,3.2,.3,GD)}if(lv>=3){A.P([[x-3,y-1],[x+1,y-1.4],[x+.6,y+1],[x-2.6,y+1]],S4,.85);A.L(x-2.6,y-.8,x,y-1.2,'#ffffff',.3)}}};
  const hs=[];for(let i=0;i<nH;i++){const a=sp+i*TAU/nH;hs.push([a,Math.sin(a)>0])}hs.filter(h=>!h[1]).forEach(h=>horse(h[0],false));
  pane(A,[[-3,-2],[3,-2],[3,-40+b],[-3,-40+b]],S4,t,0,lv);
  hs.filter(h=>h[1]).forEach(h=>horse(h[0],true));
  {const y=-40+b;A.P([[-21,y+1],[21,y+1],[0,y-12]],K);for(let i=0;i<8;i++){const x0=-20+i*5,x1=x0+5;A.P([[x0,y+.4],[x1,y+.4],[(x0+x1)*.04,y-11]],i%2?C.r2:C.st)}shadeIn(A,[[-20,y+.4],[20,y+.4],[0,y-11]],C.r3,lv,'cloth');
   A.R(-21,y,42,2.2,K);A.R(-20.4,y+.4,40.8,1.4,C.r3);for(let i=0;i<10;i++)A.P([[-20+i*4.4,y+1.8],[-17.8+i*4.4,y+1.8],[-18.9+i*4.4,y+3.6]],i%2?C.r2:C.st);
   if(lv>=2)for(let i=0;i<11;i++){const x=-19+i*3.8,on=Math.floor(t*4+i)%3!==0;A.C(x,y+.8,.6,on?GD2:'#6a5a3a');if(on)A.glow(x,y+.8,1.6,GD,.5)}
   if(lv>=1)for(const s of [-1,1]){eye(A,s*7,y+5.4,1.6,GD,A.blink||A.dm,lv);if(!A.blink&&!A.dm)A.glow(s*7,y+5.4,4,GD,.6)}
   if(lv>=3){A.P([[-8,y-8],[8,y-8],[0,y-15]],K);A.P([[-7,y-8.4],[7,y-8.4],[0,y-14.2]],C.r3);for(let i=0;i<5;i++)A.P([[-6+i*3,y-8],[-5+i*3,y-10.6],[-4+i*3,y-8]],GD)}
   const fy=lv>=3?y-14.6:y-12;A.L(0,fy,0,fy-2.6,K,.6);A.P([[0,fy-2.6],[3.4,fy-1.4],[0,fy-.2]],PK);for(let i=0;i<10;i++){const a=i*TAU/10+t;A.C(Math.cos(a)*19,y+1+Math.sin(a)*.6,.4,GD2,.8)}}
  A.bbox=[-24,-58,24,2]};

 /* 8. 그림자 인형사 — lv0 팔 둘·인형 둘 → lv1 주름 깃·우는 가면 → lv2 팔 넷·인형 넷·금 간 가면·망토 수 → lv3 팔 여섯·겹 가면·수 놓은 망토·실 끝 빛 */
 R.c_s7_puppet=A=>{const t=A.t,b=A.bob*.8,lv=LV(),C={c1:'#120e1e',c2:'#241c38',c3:'#3e3058',ms:'#f2eef8',ms2:'#c8c0d8'};
  const cape=[[-6,-34+b],[6,-34+b],[10,-8+b],[6,-4+b],[3,-8+b],[0,-2+b],[-3,-8+b],[-6,-4+b],[-10,-8+b]];A.P(cape,K);const ci=cape.map(([x,y])=>[x*.9,y+(y>-30+b?-.6:.6)]);A.P(ci,C.c2);shadeIn(A,ci,'#3e3058',lv,'cloth');
  if(lv>=2)for(let i=0;i<5;i++){const y=-28+b+i*4.6;A.L(-5+i*.4,y,5-i*.4,y,lv>=3?GD:C.c3,.3,.7);if(lv>=3)for(let j=-1;j<=1;j++)A.P([[j*3,y-1],[j*3+.8,y],[j*3,y+1],[j*3-.8,y]],VI,.8)}
  for(let i=0;i<5;i++){const q=((t*.7)+i/5)%1;A.C(-6+i*3,-4+b+q*6,.8-q*.6,C.c3,1-q)}A.L(0,-32+b,0,-6+b,C.c3,.5);
  if(lv>=1){for(let i=0;i<9;i++){const a=Math.PI+i*Math.PI/8;A.P([[0,-34+b],[Math.cos(a-.17)*8,-34+b+Math.sin(a-.17)*2.4-1],[Math.cos(a+.17)*8,-34+b+Math.sin(a+.17)*2.4-1]],i%2?C.ms2:C.ms)}A.E(0,-34+b,8,1.6,C.ms2)}
  {const y=-39+b;if(lv>=3){A.E(-3.6,y-1.4,3.2,3.8,K);A.E(-3.6,y-1.4,2.7,3.3,'#1a1428');A.C(-4.6,y-2,.6,PK);A.E(3.6,y-1.4,3.2,3.8,K);A.E(3.6,y-1.4,2.7,3.3,C.ms2);A.C(4.6,y-2,.6,VI)}
   A.E(0,y,4.4,5,K);A.E(0,y,3.9,4.5,C.ms);shadeIn(A,ellPts(0,y,3.8,4.4),C.ms,lv,'glass');A.P([[-2.4,y+1.6],[2.4,y+1.6],[0,y+3.2]],K);A.L(-2.4,y+1.6,-3,y+.8,K,.4);A.L(2.4,y+1.6,3,y+.8,K,.4);
   if(!A.blink&&!A.dm){A.E(-1.6,y-1,.9,.6,VI);A.E(1.6,y-1,.9,.6,K);A.C(1.6,y-1,.3,PK);A.glow(-1.6,y-1,3,VI,.6)}if(lv>=1){A.L(-1.6,y,-1.8,y+2,'#7ad0ff',.3,.8);A.L(-3,y-3,-.6,y-2.2,K,.4);A.L(3,y-3,.6,y-2.6,K,.4)}if(lv>=2)crack(A,1,y-4,3,y+3,7,PK,.8)}
  const doll=(px,py,kind)=>{if(kind===0){A.C(px,py-3.4,1.8,K);A.C(px,py-3.4,1.4,C.c3);A.R(px-1.6,py-4.6,3.2,.8,VI);A.P([[px-1.6,py-1.6],[px+1.6,py-1.6],[px+2,py+3],[px-2,py+3]],C.c2);lim(A,px-1,py+3,px-1.4+Math.sin(t*3)*.8,py+6.4,.6,C.c3);lim(A,px+1,py+3,px+1.4-Math.sin(t*3)*.8,py+6.4,.6,C.c3);A.L(px+1.6,py-1,px+4,py-3+Math.sin(t*2.4),S3,.4);A.R(px-.8,py-3.6,.5,.5,PK);A.R(px+.4,py-3.6,.5,.5,PK)}
   else if(kind===1){A.C(px,py,3,K);A.C(px,py,2.5,C.c3);A.ring(px,py,2.5,.35,VI,.9);A.L(px,py,px+Math.sin(-t*2)*1.6,py-Math.cos(-t*2)*1.6,VI2,.3);A.C(px-.9,py-.4,.4,PK);A.C(px+.9,py-.4,.4,PK);A.L(px,py+2.5,px,py+4.4,S3,.3)}
   else{A.P([[px-1.4,py-3],[px+1.4,py-3],[px+1.8,py+2],[px-1.8,py+2]],K);A.P([[px-1,py-2.6],[px+1,py-2.6],[px+1.4,py+1.6],[px-1.4,py+1.6]],S4);A.C(px,py-4,1.2,S3);A.R(px-.6,py-4.2,.4,.4,PK);A.R(px+.2,py-4.2,.4,.4,PK)}};
  const arms=lv<=1?1:lv===2?2:3,sw=Math.sin(t*1.4)*.25;
  for(let k=0;k<arms;k++)for(const s of [-1,1]){const spread=k*4.4,hx=s*(12+spread),hy=-50+b+k*6+Math.sin(t*1.4+s+k)*1;lim(A,s*(5+k),-33+b+k*2.4,s*(9+spread*.6),-42+b+k*3,1.1-k*.15,C.c2,C.c3);lim(A,s*(9+spread*.6),-42+b+k*3,hx,hy,1-k*.15,C.c2,C.c3);A.C(hx,hy,1.1,C.ms);
   const a=sw*s,bl=5-k;A.L(hx-Math.cos(a)*bl,hy-Math.sin(a)*bl,hx+Math.cos(a)*bl,hy+Math.sin(a)*bl,'#8a6a4a',.7);A.L(hx,hy-2,hx,hy+2,'#8a6a4a',.7);
   const px=s*(20+k*4),py=-18+b+k*7+Math.sin(t*2+s+k)*2;for(const [ox,oy] of [[-bl,0],[bl,0],[0,2]]){const ex=hx+Math.cos(a)*ox,ey=hy+Math.sin(a)*ox+oy;A.L(ex,ey,px+ox*.3,py-4,S4,.15,.7);if(lv>=3){A.C(px+ox*.3,py-4,.3,VI2);A.glow(px+ox*.3,py-4,1.4,VI,.5)}}
   doll(px,py,k===0?(s<0?0:1):2)}
  A.bbox=[-34,-56,34,8]};

 /* 9. 반사룡 — 날개는 어깨 관절에서 팔뼈로 이어짐
    lv0 어린 용·작은 날개 → lv1 거울 판 날개·시곗바늘 뿔 → lv2 큰 날개(판 5장)·등 가시·뿔 왕관·입체 비늘 → lv3 날개 두 쌍·수정 가시·긴 목·숨결 빛 */
 R.c_s7_dragon=A=>{const t=A.t,b=A.bob*.6,lv=LV(),C={d1:'#16243a',d2:'#2a4060',d3:'#4a6a90',d4:'#a8c8e8',bl:'#8af0ff'};
  A.E(0,1,20,2,'#000',.35);
  const fl=Math.sin(t*1.8)*.12+A.pul*.1;
  const wing=(s,sc,yo,al)=>{const rx=s*5,ry=-22+b+yo,ex=s*(5+9*sc),ey=-22+b+yo-16*sc-fl*8*sc,nf=lv>=2?5:lv>=1?4:3,tips=[];
   for(let i=0;i<nf;i++){const k=i/(nf-1);tips.push([s*(5+(14+k*14)*sc),-22+b+yo+(-30+k*34)*sc-fl*(1-k)*14*sc])}
   for(let i=0;i<nf;i++){const [x1,y1]=tips[i],[x2,y2]=i+1<nf?tips[i+1]:[rx+s*3*sc,ry+6*sc];A.P([[ex,ey],[x1,y1],[x2,y2],[rx+(ex-rx)*.3+s*.6,ry+(ey-ry)*.3+2]],K,al);A.P([[ex+(x1-ex)*.06,ey+(y1-ey)*.06+.5],[x1-s*.8,y1+1],[x2-s*.6,y2-.2],[rx+(ex-rx)*.35+s*.8,ry+(ey-ry)*.35+2]],i%2?'#9ab8d8':'#c8dcf0',.85*al);
    const q=((t*.4+i*.2)%1.4)-.2;A.L(ex+(x1-ex)*q,ey+(y1-ey)*q,ex+(x2-ex)*q,ey+(y2-ey)*q,'#ffffff',.5,.4*al);lim(A,ex,ey,x1,y1,.6,C.d3,C.d4)}
   lim(A,rx,ry,ex,ey,lv>=2?2:1.6,C.d2,C.d4);A.C(ex,ey,1.3,C.d3);if(lv>=2)A.P([[ex,ey-1],[ex+s*1.4,ey-3.4],[ex-s*.4,ey-1.4]],S5)};
  if(lv>=3)for(const s of [-1,1])wing(s,.7,5,.85);
  const ws=lv===0?.6:lv===1?.85:1;for(const s of [-1,1])wing(s,ws,0,1);
  {let px=6,py=-10+b;const n=lv>=2?10:8;for(let i=1;i<=n;i++){const nx=6+i*2.4,ny=-10+b+Math.sin(i*.7+t*1.4)*2.4+i*.6;lim(A,px,py,nx,ny,3.2-i*.28,C.d2,C.d4);if(lv>=2&&i%2)A.P([[nx,ny-1.4],[nx+.8,ny-3],[nx-.6,ny-1.6]],lv>=3?TL2:S4);px=nx;py=ny}A.P([[px,py-2],[px+4,py],[px,py+2]],C.d4)}
  for(const s of [-1,1]){lim(A,s*5,-12+b,s*8,-2,2.4,C.d2,C.d4);for(let i=-1;i<=1;i++)A.L(s*8,-2,s*8+i*1.2,0,S5,.5)}
  {const rx=lv===0?7.4:9,ry=lv===0?6.6:8;volE(A,0,-16+b,rx,ry,C.d2,lv,'glass');for(let i=0;i<4;i++)for(let j=0;j<4;j++){const x=-6+j*4+(i%2)*2,y=-21+b+i*3.2;if(Math.hypot(x/rx,(y+16-b)/ry)>.92)continue;A.P([[x,y-1.4],[x+1.6,y],[x,y+1.4],[x-1.6,y]],(i+j)%2?C.d3:'#6a90b8');if(lv>=3)A.L(x-1,y-.6,x,y-1.2,'#ffffff',.25,.6)}A.E(0,-12+b,5,3,C.d4,.5)}
  for(const s of [-1,1]){volE(A,s*5,-22+b,2.6,2.2,C.d3,lv,'glass');A.C(s*5,-22+b,.8,C.bl)}
  if(lv>=2)for(let i=0;i<5;i++){const x=-3+i*2,y=-24+b+i*.6;A.P([[x-.8,y],[x+.8,y],[x+.2,y-2.6-(lv>=3?1:0)]],lv>=3?TL2:S4)}
  let nx=0,ny=-22+b;const nn=lv>=3?8:lv===0?4:6;for(let i=1;i<=nn;i++){const x=-i*1.8*(6/nn)+Math.sin(i*.8+t*.9)*1.4,y=-22+b-i*3*(lv>=3?.85:1);lim(A,nx,ny,x,y,3.6-i*.22,C.d2,C.d4);if(lv>=1)for(const s of [-1,1])A.R(x+s*.4-.3,y-.3,.6,.6,C.bl,.7);nx=x;ny=y}
  {const hx=nx-3,hy=ny-1,hp=[[hx+5,hy-3],[hx+5,hy+3],[hx-6,hy+2.4],[hx-8,hy],[hx-6,hy-2]],hi=[[hx+4.4,hy-2.4],[hx+4.4,hy+2.4],[hx-5.6,hy+1.8],[hx-7.2,hy],[hx-5.6,hy-1.6]];A.P(hp,K);A.P(hi,C.d3);shadeIn(A,hi,C.d3,lv,'glass');
   const o=.6+A.open*1.6;A.P([[hx-7.6,hy+.4],[hx-2,hy+.4],[hx-1,hy+.4+o*1.4],[hx-6.6,hy+o*1.4]],K);A.C(hx-5,hy+.8+o*.6,.8+o*.5,C.bl);A.glow(hx-5,hy+.8+o*.6,4+A.pul*4,C.bl,.7);for(let i=0;i<4;i++)A.P([[hx-7+i*1.4,hy+.4],[hx-6.4+i*1.4,hy+.4],[hx-6.7+i*1.4,hy+1.4]],S5);
   if(lv>=3)for(let i=0;i<5;i++){const q=((t*1.6)+i/5)%1;A.C(hx-8-q*6,hy+1+q*2,1.2*(1-q),C.bl,.8*(1-q))}
   eye(A,hx-1,hy-1,1,C.bl,A.blink||A.dm,lv);if(!A.dm)A.glow(hx-1,hy-1,3,C.bl,.6);
   if(lv>=1){lim(A,hx+2,hy-2,hx+6,hy-9,.8,S4,S5);A.P([[hx+6,hy-10.6],[hx+7.2,hy-8.6],[hx+5.2,hy-8.8]],S5);const ra=-t*1.2;lim(A,hx+3,hy-1,hx+3+Math.cos(ra)*5,hy-1+Math.sin(ra)*5-3,.6,S4,S5);A.C(hx+3,hy-1,.8,GD)}
   if(lv>=2)for(let i=0;i<3;i++)A.P([[hx+4-i*2.6,hy-2.4],[hx+3.2-i*2.6,hy-4.4-(lv>=3?1:0)],[hx+2.4-i*2.6,hy-2.4]],lv>=3?TL2:C.d4)}
  for(const s of [-1,1])lim(A,s*4,-18+b,s*7-2,-10+b,1.6,C.d2,C.d4);
  A.bbox=[-38,-58,38,2]};

 /* 10. 거울 하루 · 반대편의 나 — lv0 반전된 하루(작은 조각) → lv1 거울 날개·후광·대검 → lv2 코트 위 갑옷판·조각 망토 → lv3 완전 무장·시곗바늘 왕관·사슬 감긴 대검 */
 R.c_s7_mharu=A=>{const t=A.t,b=A.bob*.5,lv=LV(),C={c1:'#141228',c2:'#26224a',c3:'#3e3878',sk:'#e8e0f0',hr:'#e8eef8',hr2:'#b8c4d8',ar:'#8a90b8'};
  A.E(0,1,16,1.8,'#000',.4);
  if(lv>=1){const y=-43+b,n=lv>=3?16:12;for(let i=0;i<n;i++){const a=-t*.6+i*TAU/n,L=i%3===0?(lv>=2?12:10.4):(lv>=2?9.4:8.4);A.L(Math.cos(a)*6,y+Math.sin(a)*6,Math.cos(a)*L,y+Math.sin(a)*L,i%3===0?VI2:S3,i%3===0?.7:.4,.9);if(i%3===0)A.P([[Math.cos(a)*(L+1.6),y+Math.sin(a)*(L+1.6)],[Math.cos(a+.08)*L,y+Math.sin(a+.08)*L],[Math.cos(a-.08)*L,y+Math.sin(a-.08)*L]],VI2)}A.ring(0,y,6.4,.5,VI,.8)}
  {const n=lv===0?3:lv===1?5:7;for(const s of [-1,1])for(let i=0;i<n;i++){const a=-Math.PI/2+s*(.35+i*.2)+Math.sin(t*1.4+i)*.03,r=10+i*2.8,x=s*3+Math.cos(a)*r,y=-28+b+Math.sin(a)*r*.75+i*1.6;shard(A,x,y,2.6+i*.35,a+(s>0?0:Math.PI),i%2?'#c8dcf4':'#e8f4ff',S5);if(lv>=1&&(i===3||i===6))sil(A,x,y+1.4,.7,S2)}}
  if(lv>=2){const cp=[[-7,-33+b],[7,-33+b],[11,-2],[-11,-2]],ci=cp.map(([x,y])=>[x*.92,y+.4]);A.P(cp,K);A.P(ci,'#1c1a34');shadeIn(A,ci,'#3a3a68',lv,'cloth');if(lv>=3)for(let i=0;i<9;i++){const x=-9+i*2.2,y=-6-((i*7)%4);shard(A,x,y,1.6,i,'#c8dcf4',S5)}}
  for(let i=0;i<5;i++){const w=Math.sin(t*3+i)*1;A.P([[-6+i*2.6,-22+b],[-3.6+i*2.6,-22+b],[-1+i*3.6+w,0+b*.3],[-3.6+i*3.6+w,-1+b*.3]],i%2?C.c2:C.c1)}
  for(const s of [-1,1]){lim(A,s*2.8,-17+b,s*3.8,-3,2.4,C.c2,C.c3);if(lv>=2)vol(A,[[s*3.8-1.8,-13+b],[s*3.8+1.8,-13+b],[s*3.8+1.6,-8+b],[s*3.8-1.6,-8+b]],C.ar,lv,'metal');A.box(s*3.8-2.6,-3.4,5.2,3.4,C.c1,K,C.c3);A.R(s*3.8-2.6,-1.2,5.2,.6,VI,.8)}
  vol(A,[[-7,-33+b],[7,-33+b],[7.6,-16+b],[-7.6,-16+b]],C.c2,lv,'cloth');A.L(0,-32+b,0,-16+b,VI,.4,.8);
  if(lv>=2){vol(A,[[-6.4,-32+b],[6.4,-32+b],[5.4,-24+b],[-5.4,-24+b]],C.ar,lv,'metal');A.L(0,-31+b,0,-25+b,VI,.4);for(const s of [-1,1])vol(A,s<0?[[-10.4,-33+b],[-6,-34+b],[-6.4,-29+b],[-9.6,-28+b]]:[[6,-34+b],[10.4,-33+b],[9.6,-28+b],[6.4,-29+b]],C.ar,lv,'metal')}else for(let i=0;i<3;i++)A.C(1.8,-29+b+i*4,.55,S4);
  A.R(-7.6,-19.4+b,15.2,1.6,C.c1);A.R(-1.3,-19.8+b,2.6,2.4,S4);if(lv>=1)crack(A,-5,-31+b,-2,-20+b,5,PK,.8);
  for(let i=0;i<8;i++){const w=Math.sin(t*5-i*.8)*1.3;A.R(-3.4-i*2.3,-33+b+i*.6+w*.4,2.8,2,i%2?VI:'#8a5ad8')}A.R(-5.6,-34.6+b,11.2,2.6,VI);
  {const hx=12,hy=-24+b;lim(A,6.4,-30+b,hx,hy,2,C.c2,C.c3);if(lv>=2)vol(A,[[hx-2,hy-1.4],[hx+1,hy-2.6],[hx+1.6,hy+.6],[hx-1.4,hy+1]],C.ar,lv,'metal');A.C(hx,hy,1.6,C.sk);if(lv>=1){for(let i=0;i<5;i++){const q=((t*2)+i/5)%1;A.C(hx+Math.sin(i*2+q*4)*1,hy-2-q*5,1.4*(1-q),i%2?VI:PK,1-q*.5)}A.glow(hx,hy-3,5+A.pul*3,VI,.7)}}
  {const y=-39+b;A.C(0,y,5.8,K);A.C(0,y,5.3,C.sk);shadeIn(A,ellPts(0,y,5.2,5.2),C.sk,lv,'glass');for(let i=0;i<8;i++){const a=Math.PI+i*Math.PI/7,r=6+(i%2)*1.8;A.P([[Math.cos(a)*3.2,y-1+Math.sin(a)*3.2],[Math.cos(a)*r,y-1+Math.sin(a)*r],[Math.cos(a+.3)*3.6,y-1+Math.sin(a+.3)*3.6]],i%2?C.hr2:C.hr)}A.E(0,y-3.2,5.4,2.6,C.hr);
   if(lv>=3)for(let i=-2;i<=2;i++){const a=-Math.PI/2+i*.32;A.L(Math.cos(a)*5,y-2+Math.sin(a)*5,Math.cos(a)*9,y-2+Math.sin(a)*9,i?S4:GD,.6);A.P([[Math.cos(a)*10,y-2+Math.sin(a)*10],[Math.cos(a+.06)*8.6,y-2+Math.sin(a+.06)*8.6],[Math.cos(a-.06)*8.6,y-2+Math.sin(a-.06)*8.6]],i?S5:GD2)}
   A.R(-5.4,y-1.3,10.8,2.4,K);for(const s of [-1,1]){A.E(s*2.3,y-.1,1.9,1.4,'#1a1030');A.E(s*2.3,y-.1,1.3,.9,VI,.85);A.R(s*2.3-.6,y-.6,.5,.4,'#ffffff')}
   if(!A.dm&&!A.blink){A.C(-2.3+A.look[0]*.3,y-.1,.6,'#ffffff');A.glow(-2.3,y-.1,4+A.pul*3,VI,.8)}A.L(-1.4,y+2.6,1.4,y+2.8,'#5a3a6a',.4);if(lv>=1)crack(A,2.6,y-4,4.2,y+3.4,9,PK,.8)}
  {const hx=-11,hy=-22+b,a=-2.15+Math.sin(t*1.4)*.08,L=lv===0?22:lv>=3?32:30,ex=hx+Math.cos(a)*L,ey=hy+Math.sin(a)*L,w=lv>=2?1.5:1.2;lim(A,-6.4,-30+b,hx,hy,2,C.c2,C.c3);A.C(hx,hy,1.6,C.sk);
   const nx=Math.cos(a+1.57),ny=Math.sin(a+1.57);A.P([[hx+nx*(w+.6),hy+ny*(w+.6)],[ex+nx*w,ey+ny*w],[ex+Math.cos(a)*4.4,ey+Math.sin(a)*4.4],[ex-nx*w,ey-ny*w],[hx-nx*(w+.6),hy-ny*(w+.6)]],K);const bp=[[hx+nx*w,hy+ny*w],[ex+nx*(w-.5),ey+ny*(w-.5)],[ex+Math.cos(a)*3.4,ey+Math.sin(a)*3.4],[ex-nx*(w-.5),ey-ny*(w-.5)],[hx-nx*w,hy-ny*w]];A.P(bp,S4);shadeIn(A,bp,S4,lv,'metal');
   A.L(hx,hy,ex,ey,'#ffffff',.4,.8);A.L(hx+Math.cos(a)*6,hy+Math.sin(a)*6,ex,ey,VI,.3,.7);if(lv>=1)A.P([[ex+Math.cos(a)*6,ey+Math.sin(a)*6],[ex+Math.cos(a)*2+nx*2.2,ey+Math.sin(a)*2+ny*2.2],[ex+Math.cos(a)*2-nx*2.2,ey+Math.sin(a)*2-ny*2.2]],VI2);
   if(lv>=3)for(let i=0;i<7;i++){const k=.15+i*.1,x=hx+Math.cos(a)*L*k+nx*Math.sin(i*1.4)*1.2,y=hy+Math.sin(a)*L*k+ny*Math.sin(i*1.4)*1.2;A.E(x,y,.9,.6,K);A.E(x,y,.6,.35,'#9a9aaa')}
   A.R(hx-2.8,hy-.7,5.6,1.4,VI);A.glow(ex,ey,5,VI,.5+A.pul*.4)}
  if(lv>=1){const x=17+Math.sin(t*1.6)*1.4,y=-44+b+Math.cos(t*2)*1.2;A.C(x,y,3.4,K);A.C(x,y,2.9,'#2a2448');A.ring(x,y,2.9,.4,VI,.9);for(let i=0;i<4;i++){const a=i*Math.PI/2;A.R(x+Math.cos(a)*2.2-.2,y+Math.sin(a)*2.2-.2,.4,.4,VI2)}A.L(x,y,x-Math.sin(-t*3)*1.7,y-Math.cos(-t*3)*1.7,VI2,.3);A.C(x-.9,y-.4,.45,PK);A.C(x+.9,y-.4,.45,PK);A.glow(x,y,4,VI,.4)}
  A.bbox=[-30,-58,30,2]};

 /* 익스트림 각성색 (난이도 단계는 디자인 안에서 직접 바뀌므로 EXU 덧그림은 쓰지 않음) */
 Object.assign(EXF,{c_s7_gate:['#5af0e0',['crown']],c_s7_peacock:['#7af0d0',['rays']],c_s7_fountain:['#8ae0ff',['rings']],c_s7_chess:['#ffffff',['halo']],c_s7_candle:['#a8fff0',['orbit']],c_s7_ballet:['#ffb0d8',['rings']],c_s7_carousel:['#ffd27a',['orbit']],c_s7_puppet:['#b48aff',['rays']],c_s7_dragon:['#8af0ff',['wings','crystals']],c_s7_mharu:['#b48aff',['halo','rays']]});
 for(const k in R){MON.reg[k]=R[k];MON.hand[k]=()=>{};MON.noArm[k]=1;try{delete EXU[k]}catch(e){}}
 Object.assign(MON.scl,{c_s7_gate:.5,c_s7_peacock:.48,c_s7_fountain:.5,c_s7_chess:.5,c_s7_candle:.5,c_s7_ballet:.52,c_s7_carousel:.48,c_s7_puppet:.48,c_s7_dragon:.46,c_s7_mharu:.52});
 try{if(window.__V43BIG)for(const k in R)window.__V43BIG[k]=1}catch(e){}
 for(const b of S7){if(!C3BOSS[b.art])C3BOSS[b.art]={base:0,c:b.c,pal:[b.dark,K,b.c,'#f2f6ff'],cfg:{bw:18,bh:18,base:'hover',head:'visor',arms:'piston',ex:[]},th:0,deck:[]}}
}catch(e){console.error('v48 ch7 designs',e)}})();
