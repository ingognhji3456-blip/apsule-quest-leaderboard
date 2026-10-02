/* ================= v48 챕터 7 REVERSE 「거울 속 시계골」 — 거울 세계의 보스 10명 디자인 =================
   그림은 보스 엔진(MON)에 'c_s7_*' 키로 등록한다. 모두 넓은 그림판(80×70칸)을 쓴다.
   색: 은빛 · 유리 청록 · 반전된 보라. 1~6장 보스의 "거울판" 6명 + 새 보스 4명.
   공통 모티프: 거울 조각(반사 빛줄기) · 금(분홍 빛) · 거꾸로 도는 것들 */
(function(){try{
 const K='#0a0c18',S1='#232a40',S2='#46526e',S3='#8492b0',S4='#c4d0e4',S5='#f2f6ff',TL='#5af0e0',TL2='#b8fff6',VI='#b48aff',VI2='#e0ccff',PK='#ff7ad0';
 const S7=window.S7ART=[
  {art:'s7_sentry',name:'거울 파수꾼',en:'MIRROR SENTRY',c:'#5af0e0',dark:'#1c2a38',from:'1장 톱니 파수꾼'},
  {art:'s7_root',name:'토해내는 뿌리',en:'THE EMPTY ROOT',c:'#c8a0ff',dark:'#241c38',from:'2장 뿌리아귀'},
  {art:'s7_rclock',name:'거꾸로 괘종',en:'REVERSE GRANDFATHER',c:'#e8c8ff',dark:'#2a1e34',from:'3장 한밤의 괘종'},
  {art:'s7_meteor',name:'솟구치는 유성',en:'RISING METEOR',c:'#ffe08a',dark:'#1c1c48',from:'4장 유성 사냥꾼'},
  {art:'s7_lighthouse',name:'검은 등대',en:'THE BLACK LIGHTHOUSE',c:'#7af0ff',dark:'#10141e',from:'5장 등대 껍질게'},
  {art:'s7_hands',name:'모두 놓아버린 손',en:'THE LETTING HAND',c:'#e8e2d6',dark:'#2a2826',from:'6장 연줄의 거인'},
  {art:'s7_kaleido',name:'만화경 마술사',en:'KALEIDOSCOPE MAGICIAN',c:'#ff7ad0',dark:'#2a1438',from:null},
  {art:'s7_knight',name:'깨진 거울 기사',en:'SHATTERED MIRROR KNIGHT',c:'#ff8ab8',dark:'#1e2234',from:null},
  {art:'s7_rewind',name:'되감기 태엽',en:'THE REWIND SPRING',c:'#ffd27a',dark:'#22201c',from:null},
  {art:'s7_mharu',name:'거울 하루 · 반대편의 나',en:'MIRROR HARU',c:'#b48aff',dark:'#141228',from:null}];
 /* 공용 도구 */
 const lim=(A,x0,y0,x1,y1,w,c,lt)=>{A.L(x0,y0,x1,y1,K,w+.9);A.L(x0,y0,x1,y1,c,w);if(lt)A.L(x0-.2,y0-.3,x1-.2,y1-.3,lt,Math.max(.3,w*.3),.8)};
 /* 거울 판: 은색 판 + 비스듬한 반사 빛줄기 두 개 */
 const pane=(A,pts,base,t,ph)=>{A.plate(pts,base,K,S5);const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys),w=x1-x0,h=y1-y0,q=((t*.35+(ph||0))%1.6)-.3;
  for(const [o,wd,al] of [[0,.9,.5],[.22,.45,.35]]){const cx=x0+w*(q+o);A.L(cx-h*.35,y1-.6,cx+h*.35,y0+.6,'#ffffff',wd,al)}};
 /* 거울 조각 (삼각형) */
 const shard=(A,x,y,s,rot,col,lt)=>{const p=[[0,-1.2],[.8,.7],[-.7,.9]].map(([a,b])=>[x+(a*Math.cos(rot)-b*Math.sin(rot))*s,y+(a*Math.sin(rot)+b*Math.cos(rot))*s]);A.P(p,K);A.P(p.map(([a,b])=>[x+(a-x)*.78,y+(b-y)*.78]),col);if(lt)A.L(p[0][0]*.8+x*.2,p[0][1]*.8+y*.2,p[1][0]*.6+x*.4,p[1][1]*.6+y*.4,lt,.3,.8)};
 /* 금 (분홍 빛 지그재그) */
 const crack=(A,x0,y0,x1,y1,seed,col,al)=>{let px=x0,py=y0;for(let i=1;i<=4;i++){const k=i/4,nx=x0+(x1-x0)*k+(i<4?((seed*13+i*7)%5-2)*.5:0),ny=y0+(y1-y0)*k+(i<4?((seed*7+i*11)%5-2)*.4:0);A.L(px,py,nx,ny,col||PK,.35,al==null?.9:al);px=nx;py=ny}};
 /* 작은 하루 그림자 (거울 조각 속에 비치는 모습) */
 const haruSil=(A,x,y,s,col)=>{A.C(x,y-2.6*s,1*s,col);A.R(x-.8*s,y-1.8*s,1.6*s,2*s,col);A.L(x+.8*s,y-1.6*s,x+2*s,y-3*s,col,.3*s)};
 const R={};

 /* 1. 거울 파수꾼 — 1장 톱니 파수꾼의 거울판: 등 뒤 거꾸로 도는 큰 톱니 · 거울 판 몸 · 외눈 · 둥근 거울 방패 · 시곗바늘 미늘창 */
 R.c_s7_sentry=A=>{const t=A.t,b=A.bob*.4;
  A.E(0,1,17,1.8,'#000',.35);
  /* 등 뒤 톱니 (거꾸로 돈다) */A.gear(0,-28+b,13,16,-t*.9,S2,S1);A.ring(0,-28+b,10,.6,S3,.9);for(let i=0;i<12;i++){const a=-t*.9+i*TAU/12;A.R(Math.cos(a)*8.4-.3,-28+b+Math.sin(a)*8.4-.3,.6,.6,TL,.7)}
  /* 다리 */for(const s of [-1,1]){lim(A,s*4,-13+b,s*6,-2,2.6,S2,S4);A.box(s*6-3,-2.4,6,2.4,S3,S1,S5)}
  /* 몸: 거울 판 */pane(A,[[-8,-31+b],[8,-31+b],[7,-13+b],[-7,-13+b]],S3,t,0);A.R(-7,-21+b,14,.6,S1,.7);
  /* 가슴 톱니 눈 (거꾸로) */A.gear(0,-24+b,2.6,8,-t*2.4,S4,S1);A.C(0,-24+b,1.1,TL);A.glow(0,-24+b,5,TL,.5+A.pul*.4);
  /* 머리: 둥근 투구 + 외눈 바이저 */{const y=-36+b;A.C(0,y,5.6,K);A.C(0,y,5,S4);A.E(0,y-1.6,4.4,2.6,S5,.6);A.R(-4.6,y,9.2,2,K);if(!A.dm&&!A.blink){const ex=A.look[0]*1.6;A.R(-1.4+ex,y+.4,2.8,1.2,TL);A.R(-.4+ex,y+.6,.8,.6,'#ffffff');A.glow(ex,y+1,6,TL,.7)}
   /* 머리 위 작은 톱니 */A.gear(0,y-6.4,1.8,6,-t*3,S3,S1)}
  /* 둥근 거울 방패 (왼쪽) — 안에 하루 그림자가 비침 */{const x=-13,y=-20+b;A.C(x,y,6.4,K);A.C(x,y,5.8,S3);A.C(x,y,4.6,'#d8f6ff');A.E(x-1,y-1.6,3.2,1.6,'#ffffff',.5);haruSil(A,x+.6,y+2.6,1,S2);A.ring(x,y,5.8,.6,S5,.7);A.L(x-4,y+3,x+4,y-3,'#ffffff',.4,.4)}
  /* 시곗바늘 미늘창 (오른쪽) */{const x=13,yb=-6;lim(A,x,yb,x+1.4,-46+b,1,S2,S4);A.P([[x+1.4,-52+b],[x+4,-44+b],[x+1.6,-45+b],[x-1,-44+b]],K);A.P([[x+1.4,-50.8+b],[x+3.2,-44.6+b],[x+1.6,-45.4+b],[x-.4,-44.6+b]],S5);A.C(x+.2,-12+b,1.6,S4);A.C(x+.2,-12+b,.7,TL);A.C(x,yb,1.4,S3)}
  A.rise(5,-14,14,-8,30,.4,TL2,.5,.3);A.bbox=[-20,-54,20,2]};

 /* 2. 토해내는 뿌리 — 2장 뿌리아귀의 거울판: 뿌리가 하늘로 거꾸로 솟은 유리 그루터기 · 삼킨 것을 뱉는 입 */
 R.c_s7_root=A=>{const t=A.t,b=A.bob*.3,C={b1:'#2a2238',b2:'#4a3c64',b3:'#7a68a0',b4:'#b8a8e0'};
  A.E(0,1,18,1.8,'#000',.35);
  /* 바닥에 늘어진 수정 잎 */for(let i=0;i<6;i++){const x=-13+i*5.2,w=Math.sin(t*1.4+i)*.5;A.P([[x,-1],[x+2,-1],[x+1+w,2]],i%2?VI:C.b3,.85)}
  /* 하늘로 솟은 뿌리 (가지마다 빛나는 끝) */for(const [x0,x1,y1,s] of [[-8,-20,-50,1],[-4,-10,-54,2],[2,6,-56,3],[7,19,-50,4],[10,23,-40,5],[-10,-23,-40,6]]){const w=Math.sin(t*1.2+s)*1.2;lim(A,x0,-30+b,(x0+x1)/2+w,(-30+y1)/2+b,1.6,C.b2,C.b4);lim(A,(x0+x1)/2+w,(-30+y1)/2+b,x1+w*1.5,y1+b,1,C.b2,C.b4);
   A.L((x0+x1)/2+w,(-30+y1)/2+b,(x0+x1)/2+w+(s%2?3:-3),(-30+y1)/2-4+b,C.b3,.6);A.C(x1+w*1.5,y1+b,1.1,VI2);A.glow(x1+w*1.5,y1+b,3,VI,.6)}
  /* 그루터기 몸 (위가 넓은 거꾸로 모양) */A.plate([[-12,-31+b],[12,-31+b],[9,-6+b],[7,0],[-7,0],[-9,-6+b]],C.b2,K,C.b4);for(let i=0;i<5;i++)A.L(-8+i*4,-29+b,-7+i*3.6,-3,C.b1,.5,.7);A.E(0,-31+b,12,2,C.b3);A.E(0,-31+b,9,1.2,C.b1);
  /* 슬픈 눈 */for(const s of [-1,1]){A.E(s*4,-24+b,1.8,1.4,K);if(!A.blink&&!A.dm){A.C(s*4,-23.6+b,.7,VI2);A.glow(s*4,-23.6+b,2.4,VI,.6)}A.L(s*2,-26.6+b,s*6,-25.4+b,K,.6)}
  /* 입: 크게 벌려 뱉어냄 */{const y=-14+b,o=2.6+A.open*2.4+Math.sin(t*3)*.4;A.E(0,y,7,o+.6,K);A.E(0,y,6.2,o,'#140c20');for(let i=0;i<6;i++){A.P([[-5+i*2,y-o+.2],[-4+i*2,y-o+.2],[-4.5+i*2,y-o+1.6]],C.b4)}A.glow(0,y,6,VI,.4+A.pul*.4)
   /* 뱉어낸 것들 (톱니 · 뼈 · 보석 · 별) 이 위로 떠오름 */for(let i=0;i<4;i++){const q=((t*.5)+i/4)%1,x=Math.sin(i*2.1+q*3)*(4+q*10),yy=y-2-q*24,c=['#8eda9e','#f0e8d8','#ff6a8a','#ffe08a'][i],al=Math.sin(q*Math.PI);
    if(i===0)A.gear(x,yy,1.2,6,t*3,c,'#3a5a44');else if(i===1){A.R(x-1.4,yy-.3,2.8,.6,c,al);A.C(x-1.4,yy,.6,c,al);A.C(x+1.4,yy,.6,c,al)}else if(i===2)A.P([[x,yy-1.4],[x+1,yy],[x,yy+1.4],[x-1,yy]],c,al);else A.P([[x,yy-1.6],[x+.5,yy-.4],[x+1.6,yy],[x+.5,yy+.4],[x,yy+1.6],[x-.5,yy+.4],[x-1.6,yy],[x-.5,yy-.4]],c,al)}}
  A.bbox=[-26,-58,26,3]};

 /* 3. 거꾸로 괘종 — 3장 한밤의 괘종의 거울판: 거울 숫자 문자판 · 거꾸로 도는 바늘 · 위로 솟는 추 · 시곗바늘 팔 */
 R.c_s7_rclock=A=>{const t=A.t,b=A.bob*.25,C={w1:'#2a1c2a',w2:'#4a3248',w3:'#7a5a78',tr:'#c8b8e0'};
  A.E(0,1,14,1.6,'#000',.35);
  /* 떠다니는 거울 숫자판 (뒤집힌 Ⅻ · Ⅲ · Ⅵ · Ⅸ) */for(let i=0;i<4;i++){const a=-t*.5+i*TAU/4,x=Math.cos(a)*19,y=-26+b+Math.sin(a)*9;A.C(x,y,2.8,K);A.C(x,y,2.4,C.w2);A.ring(x,y,2.4,.4,C.tr);for(let j=0;j<=i;j++)A.R(x+1-j*.8,y-.9,.4,1.8,VI2);A.glow(x,y,3,VI,.35)}
  /* 시곗바늘 팔 */for(const s of [-1,1]){const sx=s*7,sy=-26+b,a=s>0?-.2+Math.sin(t*2)*.2:Math.PI+.2-Math.sin(t*2)*.2,ex=sx+Math.cos(a)*10,ey=sy+Math.sin(a)*4+6;lim(A,sx,sy,ex,ey,1,C.tr,S5);A.P([[ex+s*2.6,ey+1],[ex,ey-1.2],[ex,ey+2.4]],S5)}
  /* 받침 */A.plate([[-9,-7+b],[9,-7+b],[10,0],[-10,0]],C.w2,K,C.w3);A.R(-8,-3+b,16,.5,C.tr,.8);
  /* 몸통 상자 */A.plate([[-7,-30+b],[7,-30+b],[7,-7+b],[-7,-7+b]],C.w1,K,C.w3);A.R(-7,-30+b,.6,23,C.tr,.6);A.R(6.4,-30+b,.6,23,C.tr,.6);
  /* 유리창 안: 위로 솟은 추 (아래 고정, 위로 흔들림) */{const x0=0,y0=-10+b;A.R(-4.6,-27+b,9.2,18,'#14101e');A.R(-4.6,-27+b,9.2,18,'#b8a8e0',.12);const a=-Math.PI/2+Math.sin(t*2.2)*.45,bx=x0+Math.cos(a)*12,by=y0+Math.sin(a)*12;A.L(x0,y0,bx,by,C.tr,.4);A.C(bx,by,2.2,K);A.C(bx,by,1.7,'#e0c8ff');A.C(bx-.5,by-.5,.6,'#ffffff');A.glow(bx,by,4,VI,.5);
   A.L(-4,-26+b,-1,-12+b,'#ffffff',.4,.3)}
  /* 머리: 아치형 갓 + 문자판 얼굴 */{const y=-36+b;A.P([[-8,y+6],[8,y+6],[8,y-2],[5,y-6],[0,y-8],[-5,y-6],[-8,y-2]],K);A.P([[-7.4,y+5.4],[7.4,y+5.4],[7.4,y-1.6],[4.6,y-5.4],[0,y-7.2],[-4.6,y-5.4],[-7.4,y-1.6]],C.w2);A.L(-6,y-2.4,0,y-6.4,C.tr,.4,.8);
   A.C(0,y,5.4,K);A.C(0,y,4.9,'#f0e8ff');for(let i=0;i<12;i++){const a=-i*TAU/12-Math.PI/2;A.R(Math.cos(a)*4-.25,y+Math.sin(a)*4-.25,.5,.5,i%3?C.w3:VI)}
   /* 거꾸로 도는 바늘 */const h=-t*.35,m=-t*2.2;A.L(0,y,Math.cos(h)*2.4,y+Math.sin(h)*2.4,C.w1,.5);A.L(0,y,Math.cos(m)*3.6,y+Math.sin(m)*3.6,'#7a3aa0',.35);A.C(0,y,.6,C.w1);
   if(!A.dm&&!A.blink){for(const s of [-1,1]){A.E(s*2.2,y-1.6,1.4,1.1,K);A.E(s*2.2,y-1.6,1,.7,VI);A.R(s*2.2-.3+A.look[0]*.3,y-1.9,.5,.5,'#ffffff')}A.glow(0,y-1.6,5,VI,.6)}A.L(-3.6,y-3.6,-1,y-3,K,.5);A.L(3.6,y-3.6,1,y-3,K,.5);
   /* 꼭대기 장식 (거꾸로 뾰족탑) */A.P([[-1.2,y-7.6],[1.2,y-7.6],[0,y-4.6]],C.tr);A.C(0,y-9,1.1,VI2);A.glow(0,y-9,3,VI,.6)}
  A.bbox=[-23,-48,23,2]};

 /* 4. 솟구치는 유성 — 4장 유성 사냥꾼의 거울판: 아래로 흐르는 별 머리칼 · 하늘을 겨눈 활 · 위로 솟는 유성 */
 R.c_s7_meteor=A=>{const t=A.t,b=A.bob*.8,C={i1:'#1c1c48',i2:'#34347a',i3:'#5a5ab8',g1:'#ffe08a',g2:'#fff6cf'};
  /* 발밑 유성 바위 (꼬리는 아래로) */{const y=-3+b;for(let i=0;i<5;i++){const q=i/5;A.E(-1+q*2,y+2+q*4,8-q*6,1.2,i%2?'#ff9a5a':'#ffd08a',.7*(1-q))}A.E(0,y,10,3.6,K);A.E(0,y-.4,9.2,3,'#5a4a6a');A.E(-2,y-1.2,4,1.2,'#8a7aa0');A.glow(0,y,8,'#ffb070',.5)}
  /* 위로 솟는 유성들 */for(let i=0;i<5;i++){const q=((t*.7)+i/5)%1,x=-20+i*10+Math.sin(i*3)*2,yy=4-q*58;A.L(x,yy,x,yy+5,C.g1,.4,.6*(1-q));A.C(x,yy,.9,C.g2,1-q*.6)}
  /* 다리 + 망토 */for(const s of [-1,1])lim(A,s*2.4,-14+b,s*3.6,-6+b,1.8,C.i2,C.i3);A.P([[-6,-28+b],[6,-28+b],[9,-8+b],[-9,-8+b]],C.i1);A.P([[-5,-28+b],[5,-28+b],[6,-12+b],[-6,-12+b]],C.i2);A.L(0,-27+b,0,-12+b,C.g1,.4,.7);
  /* 아래로 흐르는 별 머리칼 (뒤로) */for(let i=0;i<6;i++){const w=Math.sin(t*2+i)*1;A.L(-2+i*.8,-37+b,-6+i*.4+w,-18+b+i,C.g1,.7,.7);A.C(-6+i*.4+w,-18+b+i,.5,C.g2)}
  /* 머리 */{const y=-34+b;A.C(0,y,3.6,K);A.C(0,y,3.1,'#e8e0ff');A.P([[-3.4,y-1],[3.4,y-1],[2.6,y-4],[0,y-5.4],[-2.6,y-4]],C.g1);if(!A.dm&&!A.blink){A.R(-1.8+A.look[0]*.4,y,1.2,.7,C.i1);A.R(.8+A.look[0]*.4,y,1.2,.7,C.i1)}}
  /* 하늘을 겨눈 큰 활 (머리 위) */{const y=-44+b,dr=A.win('s7MeteorRise')||Math.max(0,Math.sin(t*1.4))*.4;const pts=[];for(let i=0;i<=10;i++){const q=i/10,a=Math.PI+q*Math.PI;pts.push([Math.cos(a)*14,y-Math.sin(a)*3.4+3])}
   for(let i=0;i<10;i++)lim(A,pts[i][0],pts[i][1],pts[i+1][0],pts[i+1][1],1,C.g1,C.g2);A.L(-14,y+3,0,y+3+dr*4,C.g2,.3);A.L(14,y+3,0,y+3+dr*4,C.g2,.3);
   /* 화살 (별 촉) */A.L(0,y+4+dr*4,0,y-9,'#d8c8a0',.5);A.P([[0,y-12.4],[.8,y-10.4],[2.4,y-10],[.8,y-9.4],[0,y-7.6],[-.8,y-9.4],[-2.4,y-10],[-.8,y-10.4]],C.g2);A.glow(0,y-10,4+A.pul*3,C.g1,.8)
   /* 팔 (활을 받침) */for(const s of [-1,1])lim(A,s*4.4,-28+b,s*7,y+2,1.2,C.i2,C.i3)}
  A.bbox=[-22,-58,22,5]};

 /* 5. 검은 등대 — 5장 등대 껍질게의 거울판: 빛을 빨아들이는 등대 · 하늘에 매달린 바다 */
 R.c_s7_lighthouse=A=>{const t=A.t,b=A.bob*.3,C={k1:'#10141e',k2:'#242c3c',k3:'#3e4a60',s:'#c4d0e4'};
  /* 하늘에 매달린 물방울 (위로 떨어짐) */for(let i=0;i<9;i++){const q=((t*.6)+i/9)%1,x=-22+i*5.4,yy=-46-q*10;A.P([[x,yy-1.4],[x+.9,yy+.4],[x,yy+1],[x-.9,yy+.4]],'#5ac0e0',.7*(1-q*.6))}
  /* 다리 (게) */for(const s of [-1,1])for(let i=0;i<3;i++){const x0=s*(7+i*2.6),y0=-8+b,kx=s*(13+i*3.4),ky=-12+b+i*2+Math.sin(t*3+i)*.6;lim(A,x0,y0,kx,ky,1,C.k3,TL);lim(A,kx,ky,kx+s*1.4,0,.8,C.k3)}
  /* 집게 (오른쪽 큰 것) */{const x=17,y=-14+b,o=.4+A.open*.6+Math.sin(t*2)*.15;lim(A,9,-10+b,x-3,y+2,1.4,C.k3,TL);A.P([[x-4,y],[x+3,y-3-o*2],[x+5,y-1],[x,y+1]],C.k2);A.P([[x-4,y+1],[x+4,y+3+o*2],[x+5,y+1],[x,y]],C.k2);A.L(x-3,y-.6,x+3,y-2.6-o*2,TL,.3,.8)}
  lim(A,-9,-10+b,-14,-14+b,1.2,C.k3,TL);A.C(-15,-15+b,2,C.k2);
  /* 등딱지 */A.E(0,-9+b,13,6,K);A.E(0,-9.6+b,12,5.2,C.k2);A.E(-2,-11.4+b,8,2.4,C.k3,.8);for(let i=0;i<5;i++)A.R(-9+i*4.4,-6+b,.6,.6,TL,.7);
  /* 눈자루 */for(const s of [-1,1]){lim(A,s*3,-12+b,s*4,-17+b,.6,C.k3);A.C(s*4,-17.6+b,1.2,K);if(!A.blink&&!A.dm){A.C(s*4,-17.6+b,.6,TL);A.glow(s*4,-17.6+b,2,TL,.5)}}
  /* 검은 등대 (등에 짊어짐) */{const y0=-14+b;A.P([[-5,y0],[5,y0],[3.4,y0-24],[-3.4,y0-24]],K);for(let i=0;i<4;i++){const ya=y0-i*6,yb=ya-6,wa=4.4-i*.4,wb=wa-.4;A.P([[-wa,ya],[wa,ya],[wb,yb],[-wb,yb]],i%2?C.k1:C.k3)}
   A.R(-4.4,y0-24.6,8.8,1.2,C.s);for(let i=0;i<5;i++)A.R(-4+i*2,y0-26.4,.4,1.8,C.s,.8);
   /* 등불: 검은 구멍 — 바깥의 빛이 빨려 들어감 */const cy=y0-29;A.P([[-4,cy+3],[4,cy+3],[3,cy-3],[-3,cy-3]],'#1a2232');A.P([[-3,cy-3],[3,cy-3],[0,cy-6.6]],C.k3);A.C(0,cy-7,.7,C.s);
   for(let i=0;i<10;i++){const a=i*TAU/10+t*.4,q=((t*1.2)+i*.1)%1,r=16-q*13;A.L(Math.cos(a)*r,cy+Math.sin(a)*r*.7,Math.cos(a)*(r-3),cy+Math.sin(a)*(r-3)*.7,i%2?TL2:'#ffffff',.35,.8*q)}
   A.C(0,cy,2.6,'#000');A.ring(0,cy,2.6,.5,VI,.9);A.glow(0,cy,6+A.pul*4,VI,.5)}
  A.bbox=[-24,-58,24,2]};

 /* 6. 모두 놓아버린 손 — 6장 연줄의 거인의 거울판: 텅 빈 뼈대 몸 · 활짝 편 손바닥 · 끊긴 줄과 멀어지는 연 */
 R.c_s7_hands=A=>{const t=A.t,b=A.bob*.25,C={p1:'#e8e2d6',p2:'#bcb6aa',p3:'#8a8680',bm:'#a8a090',bm2:'#6a6458'};
  A.E(0,1,18,1.8,'#000',.3);
  /* 멀어지는 빛바랜 연들 (줄 없음) */for(let i=0;i<4;i++){const q=((t*.18)+i/4)%1,x=-22+i*13+Math.sin(t+i)*2,y=-40-q*14,al=.8*(1-q);A.P([[x,y-2.4],[x+1.8,y],[x,y+2.4],[x-1.8,y]],C.p2,al);A.L(x,y+2.4,x+Math.sin(t*2+i)*1.4,y+6,C.p3,.25,al*.8)}
  /* 다리: 대나무 뼈대만 */for(const s of [-1,1]){lim(A,s*4,-16+b,s*7,-1,1.4,C.bm,C.p1);A.L(s*4.6,-11+b,s*6.4,-6,C.bm2,.4)}
  /* 몸: 텅 빈 마름모 뼈대 + 찢어진 종이 조각 */{const y=-28+b;for(const [x0,y0,x1,y1] of [[0,y-14,13,y],[13,y,0,y+12],[0,y+12,-13,y],[-13,y,0,y-14],[0,y-14,0,y+12],[-13,y,13,y]])lim(A,x0,y0,x1,y1,.9,C.bm,C.p1);
   A.P([[-12,y],[-6,y-6],[-7,y+2]],C.p2,.7);A.P([[6,y+6],[11,y+1],[9,y+5]],C.p2,.6);A.P([[1,y-12],[4,y-9],[1,y-8]],C.p1,.6);
   /* 가슴 속 빈자리: 희미한 빛 하나 */A.C(0,y,1.4,'#ffffff',.25+A.pul*.4);A.glow(0,y,5,'#e8e2d6',.25)}
  /* 머리: 빈 연 얼굴 · 처진 눈 · 눈물 */{const y=-46+b;A.P([[0,y-6],[5,y],[0,y+5],[-5,y]],K);A.P([[0,y-5.2],[4.3,y],[0,y+4.3],[-4.3,y]],C.p1);for(const s of [-1,1]){A.L(s*1,y-.4,s*3,y+.6,K,.5);if(!A.dm){const q=((t*.6)+(s>0?.5:0))%1;A.C(s*2.4,y+1.6+q*5,.4,'#a8d8ff',1-q)}}A.L(-1,y+2.6,1,y+2.6,K,.35)}
  /* 팔: 축 늘어뜨린 채 활짝 편 손바닥 + 끊긴 줄 */for(const s of [-1,1]){const sx=s*12,sy=-30+b,ex=s*20,ey=-12+b+Math.sin(t*1.3+s)*.6;lim(A,sx,sy,s*17,-22+b,1.3,C.bm,C.p1);lim(A,s*17,-22+b,ex,ey,1.2,C.bm,C.p1);
   A.E(ex,ey+2,2.6,2.2,K);A.E(ex,ey+2,2.1,1.8,C.p1);for(let i=0;i<4;i++)A.L(ex-1.6+i*1.1,ey+3,ex-1.9+i*1.2,ey+5.4,C.p1,.55);A.L(ex+s*2,ey+1.4,ex+s*3.2,ey,C.p1,.55);
   for(let i=0;i<3;i++){const q=((t*.5)+i/3)%1;A.L(ex-1+i,ey+6+q*4,ex-1.4+i,ey+8+q*4,C.p3,.2,1-q)}}
  A.bbox=[-26,-58,26,2]};

 /* 7. 만화경 마술사 — 새 보스: 등 뒤 회전 만화경 무늬 · 반반 가면 · 만화경 외눈 · 실크햇 · 떠다니는 거울 카드 */
 R.c_s7_kaleido=A=>{const t=A.t,b=A.bob*.5,C={v1:'#2a1438',v2:'#4a2468',v3:'#7a3aa8',mg:'#ff7ad0',cy:'#5af0e0',gd:'#ffd27a'};
  /* 만화경 무늬 (육각 대칭으로 회전) */{const y=-28+b,r=15;for(let k=0;k<6;k++){const a0=t*.5+k*TAU/6;for(let j=0;j<3;j++){const a=a0+(j-1)*.32,rr=r-j*3.5,c=[C.mg,C.cy,C.gd][(k+j)%3];A.P([[0,y],[Math.cos(a-.17)*rr,y+Math.sin(a-.17)*rr],[Math.cos(a+.17)*rr,y+Math.sin(a+.17)*rr]],c,.35)}}A.ring(0,y,r+.6,.6,C.gd,.6)}
  /* 망토 */A.P([[-4,-28+b],[4,-28+b],[13,0],[-13,0]],K);A.P([[-3.6,-27+b],[3.6,-27+b],[12,-.6],[-12,-.6]],C.v2);A.P([[-2,-26+b],[2,-26+b],[6,-.6],[-6,-.6]],C.mg,.6);for(let i=0;i<5;i++)A.R(-11+i*5.4,-1.6,2,1.2,C.gd,.8);
  /* 거울 카드 (돈다) */for(let i=0;i<5;i++){const a=t*.9+i*TAU/5,x=Math.cos(a)*18,y=-22+b+Math.sin(a)*6,w=Math.abs(Math.cos(t*2+i))*2.2+.4;A.R(x-w/2,y-2,w,4,K);A.R(x-w/2+.3,y-1.7,Math.max(.3,w-.6),3.4,i%2?'#e8f6ff':C.mg);A.glow(x,y,2.6,C.cy,.35)}
  /* 손: 흰 장갑 + 지팡이 */for(const s of [-1,1]){const hx=s*9,hy=-18+b+Math.sin(t*2+s)*.8;lim(A,s*3.6,-24+b,hx,hy,1.1,C.v3);A.C(hx,hy,1.4,K);A.C(hx,hy,1.1,'#ffffff')}{const hx=9,hy=-18+b+Math.sin(t*2+1)*.8;lim(A,hx,hy,hx+4,hy-12,.7,K,C.gd);A.P([[hx+4,hy-14.4],[hx+5.2,hy-12],[hx+4,hy-10.8],[hx+2.8,hy-12]],C.cy);A.glow(hx+4,hy-12.6,3,C.cy,.6)}
  /* 머리: 반반 가면 + 만화경 외눈 */{const y=-32+b;A.C(0,y,4.4,K);A.P([[0,y-3.9],[0,y+3.9],[-3.9,y+1.6],[-3.9,y-1.6]],S5);A.P([[0,y-3.9],[0,y+3.9],[3.9,y+1.6],[3.9,y-1.6]],'#1a1028');A.L(0,y-3.9,0,y+3.9,C.gd,.3);
   A.E(-1.8,y-.6,.9,.6,K);A.L(1,y+2,2.8,y+1.6,C.mg,.35);
   /* 만화경 통 (오른쪽 눈에서 앞으로) */const tl=A.win()?2:0;A.P([[1.4,y-1.6],[6+tl,y-2.6],[6+tl,y+1],[1.4,y+.4]],C.gd);A.R(5.6+tl,y-2.6,.6,3.6,'#7a5428');A.C(6.4+tl,y-.8,1.6,K);for(let i=0;i<6;i++){const a=t*3+i*TAU/6;A.R(6.4+tl+Math.cos(a)*.9-.25,y-.8+Math.sin(a)*.9-.25,.5,.5,[C.mg,C.cy,C.gd][i%3])}A.glow(6.4+tl,y-.8,3.6+A.pul*2,C.cy,.6)}
  /* 실크햇 */{const y=-36+b;A.R(-5.4,y,10.8,1.2,K);A.R(-3.6,y-7,7.2,7.2,K);A.R(-3.1,y-6.6,6.2,6.4,C.v1);A.R(-3.1,y-2.4,6.2,1.2,C.mg);A.L(-2.4,y-6,-2.4,y-3,'#ffffff',.3,.4);A.R(-5.4,y,10.8,.5,C.v2)}
  A.bbox=[-22,-50,22,2]};

 /* 8. 깨진 거울 기사 — 새 보스: 거울 조각 갑옷 · 분홍 금 · 조각 대검 · 조각마다 하루가 졌던 순간 */
 R.c_s7_knight=A=>{const t=A.t,b=A.bob*.35;
  A.E(0,1,17,1.8,'#000',.35);
  /* 너덜너덜한 망토 */for(let i=0;i<6;i++){const w=Math.sin(t*2+i)*.8;A.P([[-6+i*2.2,-30+b],[-4+i*2.2,-30+b],[-4.4+i*2.6+w,-6+b+(i%2)*2],[-6.6+i*2.6+w,-8+b]],i%2?'#3a2a48':'#2a2038',.95)}
  /* 다리 */for(const s of [-1,1]){lim(A,s*4,-13+b,s*5.4,-2,2.6,S2,S4);pane(A,[[s*5.4-2.6,-6],[s*5.4+2.6,-6],[s*5.4+3,0],[s*5.4-3,0]],S3,t,s)}
  /* 몸통: 거울 조각 갑옷 */pane(A,[[-9,-32+b],[9,-32+b],[7,-13+b],[-7,-13+b]],S3,t,.4);for(const [x,y,s,r] of [[-5,-27,2.6,.4],[4,-24,3,2.2],[-2,-18,2.4,4],[5,-17,2,1]])shard(A,x,y+b,s,r,S4,S5);
  crack(A,-6,-31+b,4,-14+b,3);crack(A,7,-29+b,-1,-20+b,7);A.glow(0,-22+b,7,PK,.3+A.pul*.4);
  /* 어깨 조각 */for(const s of [-1,1]){shard(A,s*10,-31+b,4.4,s>0?.6:-.6,S4,S5);shard(A,s*12,-28+b,3,s>0?1.8:-1.8,S3,S5)}
  /* 투구: T자 틈 · 금 · 조각 깃 */{const y=-38+b;A.plate([[-5,y+5],[5,y+5],[5.4,y-2],[2.4,y-5],[-2.4,y-5],[-5.4,y-2]],S3,K,S5);A.R(-4,y-.4,8,1.2,K);A.R(-.6,y-.4,1.2,4.4,K);if(!A.dm&&!A.blink){A.R(-3.4,y-.1,2.2,.6,PK);A.R(1.2,y-.1,2.2,.6,PK);A.glow(0,y,5,PK,.7)}crack(A,-4,y-3,1,y+4,5);
   for(let i=0;i<3;i++)shard(A,-1.6+i*1.6,y-7-(i===1?1.6:0),2,-.2+i*.2,S4,S5)}
  /* 조각 대검 (오른손, 비스듬히) */{const hx=11,hy=-16+b,a=-1.0+Math.sin(t*1.1)*.06,L=30,ex=hx+Math.cos(a)*L*.75,ey=hy+Math.sin(a)*L*.75;lim(A,8,-26+b,hx,hy,1.6,S2,S4);
   A.P([[hx+Math.cos(a+1.57)*2.4,hy+Math.sin(a+1.57)*2.4],[ex+Math.cos(a+1.57)*1.6,ey+Math.sin(a+1.57)*1.6],[ex+Math.cos(a)*4,ey+Math.sin(a)*4],[ex-Math.cos(a+1.57)*1.6,ey-Math.sin(a+1.57)*1.6],[hx-Math.cos(a+1.57)*2.4,hy-Math.sin(a+1.57)*2.4]],K);
   A.P([[hx+Math.cos(a+1.57)*1.8,hy+Math.sin(a+1.57)*1.8],[ex+Math.cos(a+1.57)*1.1,ey+Math.sin(a+1.57)*1.1],[ex+Math.cos(a)*3,ey+Math.sin(a)*3],[ex-Math.cos(a+1.57)*1.1,ey-Math.sin(a+1.57)*1.1],[hx-Math.cos(a+1.57)*1.8,hy-Math.sin(a+1.57)*1.8]],S4);
   A.L(hx,hy,ex,ey,S5,.4,.8);crack(A,hx+Math.cos(a)*8,hy+Math.sin(a)*8,ex,ey,2,PK,.8);A.R(hx-2.6,hy-.4,5.2,1.2,S2)}
  /* 왼손 */lim(A,-8,-26+b,-12,-16+b,1.6,S2,S4);A.C(-12,-15+b,1.6,S3);
  /* 떠다니는 조각 (하루가 졌던 순간) */for(let i=0;i<4;i++){const a=t*.6+i*TAU/4,x=Math.cos(a)*20,y=-30+b+Math.sin(a)*8;shard(A,x,y,3.4,a,'#d8f0ff',S5);haruSil(A,x,y+1.4,.7,S2)}
  A.bbox=[-24,-52,24,2]};

 /* 9. 되감기 태엽 — 새 보스: 거대한 태엽 용수철 몸 · 꼭대기 감개 열쇠 · 거꾸로 도는 톱니 · 시곗바늘 다리 */
 R.c_s7_rewind=A=>{const t=A.t,b=A.bob*.3,C={br:'#c8964a',br2:'#ffd27a',br3:'#7a5428',st:S3};
  A.E(0,1,18,1.8,'#000',.35);
  /* 시곗바늘 다리 4개 */for(const [s,o] of [[-1,0],[-1,1],[1,0],[1,1]]){const x0=s*(5+o*3),y0=-14+b,kx=s*(12+o*5),ky=-8+b-o*2+Math.sin(t*2+o+s)*.6;lim(A,x0,y0,kx,ky,1,C.st,S5);lim(A,kx,ky,kx+s*1.6,0,.8,C.st);A.P([[kx+s*1.6,0],[kx+s*2.6,-1.6],[kx+s*.6,-1.6]],S5)}
  /* 양옆 톱니 (거꾸로) */A.gear(-15,-30+b,5,10,-t*1.4,C.br3,K);A.gear(-15,-30+b,2,6,t*2,C.br2,K);A.gear(16,-22+b,4,9,t*1.6,C.br3,K);
  /* 태엽 용수철 몸 (나선) */{const cx=0,cy=-26+b;A.C(cx,cy,15,K);A.C(cx,cy,14.2,'#2a241c');let px=cx,py=cy;const rot=-t*1.2;for(let i=1;i<=90;i++){const a=rot+i*.21,r=1+i*.145,nx=cx+Math.cos(a)*r,ny=cy+Math.sin(a)*r;A.L(px,py,nx,ny,i%9<1?C.br2:C.br,.9);px=nx;py=ny}
   /* 가운데 눈 + 되감기 화살표 */A.C(cx,cy,3,K);A.C(cx,cy,2.4,'#14202a');if(!A.dm&&!A.blink){A.C(cx+A.look[0]*.6,cy,1.2,TL);A.glow(cx,cy,6+A.pul*4,TL,.7)}
   for(let i=0;i<3;i++){const a=-t*2+i*TAU/3,x=cx+Math.cos(a)*5,y=cy+Math.sin(a)*5,da=a-Math.PI/2;A.P([[x+Math.cos(da)*1.4,y+Math.sin(da)*1.4],[x+Math.cos(da+2.4)*1,y+Math.sin(da+2.4)*1],[x+Math.cos(da-2.4)*1,y+Math.sin(da-2.4)*1]],TL2)}}
  /* 꼭대기 감개 열쇠 (돈다) */{const y=-44+b,sx=Math.cos(t*2.4);lim(A,0,-40+b,0,y+2,1.4,C.br3,C.br2);for(const s of [-1,1]){const x=s*4.6*sx;A.E(x,y-1,Math.max(.6,2.8*Math.abs(sx)),3,K);A.E(x,y-1,Math.max(.3,2.2*Math.abs(sx)),2.4,C.br);A.E(x,y-1,Math.max(.2,1*Math.abs(sx)),1.2,'#2a241c')}A.C(0,y,1.6,C.br2)}
  /* 되감기 시간 입자 */A.rise(6,-14,14,-40,-6,-.5,TL2,.5,.6);A.bbox=[-24,-52,24,2]};

 /* 10. 거울 하루 · 반대편의 나 — 최종 보스: 반전된 하루(은발 · 보라 고글 · 짙은 코트 · 왼손 검) · 그림자 똑딱 */
 R.c_s7_mharu=A=>{const t=A.t,b=A.bob*.5,C={c1:'#141228',c2:'#26224a',c3:'#3e3878',sk:'#e8e0f0',hr:'#e8eef8',hr2:'#b8c4d8'};
  A.E(0,1,15,1.8,'#000',.4);
  /* 깨진 손거울 조각 공전 */for(let i=0;i<6;i++){const a=-t*.7+i*TAU/6,x=Math.cos(a)*19,y=-26+b+Math.sin(a)*10;if(Math.sin(a)<0)shard(A,x,y,2.6,a,'#d8f0ff',S5)}
  /* 코트 자락 (거꾸로 휘날림: 오른쪽으로) */for(let i=0;i<4;i++){const w=Math.sin(t*3+i)*1;A.P([[-5+i*2.6,-22+b],[-3+i*2.6,-22+b],[1+i*3.4+w,-2+b],[-1+i*3.4+w,-3+b]],i%2?C.c2:C.c1)}
  /* 다리 + 부츠 */for(const s of [-1,1]){lim(A,s*2.6,-16+b,s*3.4,-3,2.2,C.c2,C.c3);A.box(s*3.4-2.4,-3,4.8,3,C.c1,K,C.c3);A.R(s*3.4-2.4,-1,4.8,.5,VI,.7)}
  /* 몸통 코트 */A.plate([[-6.4,-31+b],[6.4,-31+b],[7,-15+b],[-7,-15+b]],C.c2,K,C.c3);A.L(0,-30+b,0,-15+b,VI,.4,.8);for(let i=0;i<3;i++)A.C(1.6,-27+b+i*4,.5,S4);A.R(-7,-18+b,14,1.4,C.c1);A.R(-1.2,-18.4+b,2.4,2.2,S4);
  /* 보라 목도리 (왼쪽으로 길게) */for(let i=0;i<7;i++){const w=Math.sin(t*5-i*.8)*1.2;A.R(-3-i*2.2,-31+b+i*.6+w*.4,2.6,1.8,i%2?VI:'#8a5ad8')}A.R(-5,-32.4+b,10,2.4,VI);
  /* 오른팔 (빈손, 앞으로) */lim(A,6,-28+b,10,-20+b,1.8,C.c2,C.c3);A.C(10.4,-19.4+b,1.4,C.sk);
  /* 머리: 은발 · 보라 고글 · 한쪽 눈 빛 */{const y=-37+b;A.C(0,y,5.4,K);A.C(0,y,4.9,C.sk);for(let i=0;i<7;i++){const a=Math.PI+i*Math.PI/6,r=5.6+(i%2)*1.6;A.P([[Math.cos(a)*3,y-1+Math.sin(a)*3],[Math.cos(a)*r,y-1+Math.sin(a)*r],[Math.cos(a+.3)*3.4,y-1+Math.sin(a+.3)*3.4]],i%2?C.hr2:C.hr)}A.E(0,y-3,5,2.4,C.hr);
   A.R(-5,y-1.2,10,2.2,K);for(const s of [-1,1]){A.E(s*2.2,y-.1,1.8,1.3,'#1a1030');A.E(s*2.2,y-.1,1.2,.8,VI,.85);A.R(s*2.2-.6,y-.5,.5,.4,'#ffffff')}
   if(!A.dm&&!A.blink){A.C(-2.2+A.look[0]*.3,y-.1,.6,'#ffffff');A.glow(-2.2,y-.1,4+A.pul*3,VI,.8)}A.L(-1.4,y+2.4,1.4,y+2.6,'#5a3a6a',.4);crack(A,2.4,y-4,4,y+3,9,PK,.7)}
  /* 왼손의 검 (시곗바늘 칼끝, 거울처럼 반대 손) */{const hx=-10,hy=-20+b,a=-2.2+Math.sin(t*1.4)*.08,L=24,ex=hx+Math.cos(a)*L,ey=hy+Math.sin(a)*L;lim(A,-6,-28+b,hx,hy,1.8,C.c2,C.c3);A.C(hx,hy,1.4,C.sk);
   A.L(hx,hy,ex,ey,K,2.2);A.L(hx,hy,ex,ey,S4,1.4);A.L(hx,hy,ex,ey,'#ffffff',.4,.8);A.P([[ex+Math.cos(a)*3.6,ey+Math.sin(a)*3.6],[ex+Math.cos(a+1.8)*1.8,ey+Math.sin(a+1.8)*1.8],[ex+Math.cos(a-1.8)*1.8,ey+Math.sin(a-1.8)*1.8]],VI2);
   A.R(hx-2.2,hy-.6,4.4,1.2,VI);A.glow(ex,ey,4,VI,.5+A.pul*.4)}
  /* 그림자 똑딱 (오른쪽 위에 떠 있음) */{const x=14+Math.sin(t*1.6)*1.4,y=-40+b+Math.cos(t*2)*1.2;A.C(x,y,3.2,K);A.C(x,y,2.7,'#2a2448');A.ring(x,y,2.7,.4,VI,.9);for(let i=0;i<4;i++){const a=i*Math.PI/2;A.R(x+Math.cos(a)*2.1-.2,y+Math.sin(a)*2.1-.2,.4,.4,VI2)}A.L(x,y,x-Math.sin(-t*3)*1.6,y-Math.cos(-t*3)*1.6,VI2,.3);A.C(x-.9,y-.4,.45,PK);A.C(x+.9,y-.4,.45,PK);A.L(x,y+2.7,x,y+4,S3,.3);A.glow(x,y,4,VI,.4)}
  /* 등 뒤 깨진 손거울 조각 (앞쪽) */for(let i=0;i<6;i++){const a=-t*.7+i*TAU/6,x=Math.cos(a)*19,y=-26+b+Math.sin(a)*10;if(Math.sin(a)>=0){shard(A,x,y,2.6,a,'#d8f0ff',S5);if(i%2===0)haruSil(A,x,y+1,.6,S2)}}
  A.bbox=[-24,-52,24,2]};

 /* ---------- 난이도 단계: 보통 = post(몸 위 장식) · 어려움 = pre(몸 뒤 큰 부위)+post · 익스트림 = 전부 + 각성 리마스터 ---------- */
 const ringOfShards=(A,cx,cy,r,ry,n,t,col)=>{for(let i=0;i<n;i++){const a=t+i*TAU/n;shard(A,cx+Math.cos(a)*r,cy+Math.sin(a)*ry,2,a,col,S5)}};
 const U7={
  c_s7_sentry:{pre(A){const t=A.t,b=A.bob*.4;A.gear(0,-28+b,19,22,t*.5,S1,K,false);ringOfShards(A,0,-28+b,24,10,8,-t*.6,'#c8f6f0')},
   post(A){const b=A.bob*.4;for(const s of [-1,1])A.spike(s*8,-30+b,s>0?-.5:Math.PI+.5,3,1.4,S4,S5);A.R(-7,-14.6+b,14,.6,TL,.8);for(let i=0;i<3;i++)A.C(-3+i*3,-17+b,.45,TL)}},
  c_s7_root:{pre(A){const t=A.t,b=A.bob*.3;for(let i=0;i<9;i++){const a=-Math.PI/2+(i-4)*.32,L=22+Math.sin(t+i)*2;lim(A,0,-30+b,Math.cos(a)*L*.9,-30+b+Math.sin(a)*L,1.2,'#3a2e52','#8a78b8')}for(let i=0;i<6;i++){const q=((t*.4)+i/6)%1;A.C(-20+i*8,-8-q*40,.8,VI2,1-q)}},
   post(A){const b=A.bob*.3;for(let i=0;i<5;i++)A.P([[-8+i*4,-31+b],[-7+i*4,-34+b],[-6+i*4,-31+b]],VI,.9);A.C(0,-8+b,1.4,'#ffe08a');A.glow(0,-8+b,3,'#ffe08a',.5)}},
  c_s7_rclock:{pre(A){const t=A.t,b=A.bob*.25;A.gear(0,-36+b,14,24,-t*.4,'#2a1e34',K,false);A.ring(0,-36+b,11,.6,VI,.6);for(let i=0;i<12;i++){const a=-t*.4+i*TAU/12;A.R(Math.cos(a)*12.6-.4,-36+b+Math.sin(a)*12.6-.4,.8,.8,VI2)}},
   post(A){const b=A.bob*.25;for(const s of [-1,1])A.C(s*8.6,-38+b,1,VI2);A.R(-7,-31+b,14,.6,'#e8c8ff');for(let i=0;i<3;i++)A.R(-1.4+i*1.4,-5+b,.6,.6,VI)}},
  c_s7_meteor:{pre(A){const t=A.t;for(let i=0;i<14;i++){const a=i*TAU/14+t*.2,r=24+Math.sin(i*1.7)*3;A.P([[Math.cos(a)*r,-28+Math.sin(a)*r*.6-1.2],[Math.cos(a)*r+.5,-28+Math.sin(a)*r*.6],[Math.cos(a)*r,-28+Math.sin(a)*r*.6+1.2],[Math.cos(a)*r-.5,-28+Math.sin(a)*r*.6]],i%3?'#ffe08a':'#ffffff',.7)}A.ring(0,-28,20,.4,'#5a5ab8',.5)},
   post(A){const b=A.bob*.8;A.R(-6,-29+b,12,.6,'#ffe08a');for(const s of [-1,1])A.P([[s*6,-29+b],[s*8.4,-31+b],[s*7,-27.4+b]],'#ffe08a');A.C(0,-20+b,1,'#fff6cf')}},
  c_s7_lighthouse:{pre(A){const t=A.t,b=A.bob*.3,cy=-43+b;for(let i=0;i<16;i++){const a=i*TAU/16+t*.2;A.L(Math.cos(a)*28,cy+Math.sin(a)*14,Math.cos(a)*8,cy+Math.sin(a)*4,i%2?'#ffffff':TL,.4,.35)}A.ring(0,cy,10,.8,VI,.5)},
   post(A){const b=A.bob*.3;for(let i=0;i<4;i++)A.R(-3.6+i*2.4,-20-i*6+b,.6,.6,TL);A.R(-12,-4+b,24,.5,TL,.7);for(const s of [-1,1])A.spike(s*11,-11+b,s>0?-.3:Math.PI+.3,2.4,1,'#3e4a60',TL)}},
  c_s7_hands:{pre(A){const t=A.t;for(let i=0;i<10;i++){const q=((t*.25)+i/10)%1,x=-28+i*6,y=-10-q*44;A.L(x,y,x+Math.sin(t+i)*2,y+8,'#f0ece4',.25,.6*(1-q))}for(const s of [-1,1])for(let j=0;j<2;j++){const x=s*(22+j*4),y=-34+j*10+Math.sin(t+j+s)*1.4;for(const [x0,y0,x1,y1] of [[0,-4,3,0],[3,0,0,4],[0,4,-3,0],[-3,0,0,-4],[0,-4,0,4]])A.L(x+x0,y+y0,x+x1,y+y1,'#e8e2d6',.4,.7)}},
   post(A){const b=A.bob*.25;for(let i=0;i<3;i++)A.P([[-8+i*8,-29+b],[-6+i*8,-27+b],[-8+i*8,-25+b]],['#ff5a4a','#ffd04a','#4a8aff'][i],.45);A.C(0,-28+b,.8,'#ffffff',.6)}},
  c_s7_kaleido:{pre(A){const t=A.t,b=A.bob*.5,y=-28+b;for(let k=0;k<12;k++){const a=-t*.3+k*TAU/12;A.P([[Math.cos(a)*16,y+Math.sin(a)*16],[Math.cos(a+.13)*26,y+Math.sin(a+.13)*22],[Math.cos(a-.13)*26,y+Math.sin(a-.13)*22]],k%3===0?'#ff7ad0':k%3===1?'#5af0e0':'#ffd27a',.45)}},
   post(A){const b=A.bob*.5;A.R(-5.4,-36.6+b,10.8,.5,'#ffd27a');for(let i=0;i<4;i++)A.C(-1.5+i,-24+b+i*2,.4,'#ffd27a');A.P([[-1,-43.6+b],[1,-43.6+b],[0,-45.6+b]],'#5af0e0')}},
  c_s7_knight:{pre(A){const t=A.t,b=A.bob*.35;for(const s of [-1,1])for(let i=0;i<5;i++){const a=-Math.PI/2+s*(.4+i*.22);shard(A,s*6+Math.cos(a)*16,-34+b+Math.sin(a)*12,3+i*.4,a,'#c8d8f0',S5)}ringOfShards(A,0,-26+b,26,9,10,t*.4,'#e8f6ff')},
   post(A){const b=A.bob*.35;crack(A,-8,-15+b,-2,-30+b,11);crack(A,8,-16+b,3,-28+b,13);A.R(-9,-32.6+b,18,.6,PK,.8);A.glow(0,-30+b,6,PK,.4)}},
  c_s7_rewind:{pre(A){const t=A.t,b=A.bob*.3;A.gear(0,-26+b,21,28,t*.3,'#3a2e1c',K,false);for(let i=0;i<6;i++){const a=-t*.8+i*TAU/6;A.L(Math.cos(a)*22,-26+b+Math.sin(a)*22,Math.cos(a-.4)*22,-26+b+Math.sin(a-.4)*22,TL,.6,.6)}},
   post(A){const b=A.bob*.3;A.ring(0,-26+b,15,.5,'#ffd27a',.9);for(let i=0;i<12;i++){const a=i*TAU/12;A.R(Math.cos(a)*16.4-.3,-26+b+Math.sin(a)*16.4-.3,.6,.6,'#ffd27a')}}},
  c_s7_mharu:{pre(A){const t=A.t,b=A.bob*.5;A.E(0,-28+b,19,26,K,.9);A.E(0,-28+b,18,25,'#1c1a34');A.E(0,-28+b,16.4,23.4,'#3a3a68',.5);for(let i=0;i<14;i++){const a=i*TAU/14;A.C(Math.cos(a)*18.4,-28+b+Math.sin(a)*25.4,.8,'#c4d0e4')}crack(A,-8,-50+b,4,-6+b,17,PK,.6);A.E(-6,-38+b,4,10,'#ffffff',.08)},
   post(A){const b=A.bob*.5;A.R(-6.4,-31.6+b,12.8,.6,VI2);for(let i=0;i<3;i++)A.C(-4+i*4,-14+b,.5,VI2);A.spike(0,-43+b,-Math.PI/2,2.4,1.2,'#e8eef8',VI2)}}};
 for(const k in U7)EXU[k]=U7[k];
 Object.assign(EXF,{c_s7_sentry:['#5af0e0',['crown']],c_s7_root:['#c8a0ff',['orbit']],c_s7_rclock:['#e8c8ff',['halo']],c_s7_meteor:['#ffe08a',['rays']],c_s7_lighthouse:['#7af0ff',['rings']],c_s7_hands:['#ffffff',['halo']],c_s7_kaleido:['#ff7ad0',['rays','crystals']],c_s7_knight:['#ff8ab8',['crystals']],c_s7_rewind:['#ffd27a',['rings']],c_s7_mharu:['#b48aff',['halo','rays']]});
 /* 엔진 등록 */
 for(const k in R){MON.reg[k]=R[k];MON.hand[k]=()=>{};MON.noArm[k]=1}
 Object.assign(MON.scl,{c_s7_sentry:.52,c_s7_root:.5,c_s7_rclock:.52,c_s7_meteor:.5,c_s7_lighthouse:.5,c_s7_hands:.48,c_s7_kaleido:.52,c_s7_knight:.5,c_s7_rewind:.5,c_s7_mharu:.54});
 try{if(window.__V43BIG)for(const k in R)window.__V43BIG[k]=1}catch(e){}
 for(const b of S7){if(!C3BOSS[b.art])C3BOSS[b.art]={base:0,c:b.c,pal:[b.dark,K,b.c,'#f2f6ff'],cfg:{bw:18,bh:18,base:'hover',head:'visor',arms:'piston',ex:[]},th:0,deck:[]}}
}catch(e){console.error('v48 ch7 designs',e)}})();
