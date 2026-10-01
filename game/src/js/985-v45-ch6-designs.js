/* ================= v45 챕터 6 ZENITH 「바람이 머무는 곳」 — 하늘 도시의 수호자 10명 디자인 =================
   그림은 보스 엔진(MON)에 'c_s6_*' 키로 등록한다. 모두 넓은 그림판(80×70칸)을 쓴다.
   색: 새벽 주황 · 구름 흰색 · 하늘색 · 황동 / 3막은 폭풍 남색 · 번개 노랑 */
(function(){try{
 const K='#0c1220',W1='#f4f7fb',W2='#d6e0ea',W3='#a8b8c8',W4='#6a7c90',BR='#c8964a',BR2='#f0c878',BR3='#7a5428',SK='#7ad0f0',SK2='#bfeaff',OR='#ff9a4a',OR2='#ffd08a';
 const S6=window.S6ART=[
  {art:'s6_vane',name:'풍향계 기사',en:'WEATHERVANE KNIGHT',c:'#5ad0b0',dark:'#1e3a3a'},
  {art:'s6_kite',name:'연줄의 거인',en:'KITE COLOSSUS',c:'#ff6a5a',dark:'#3a2418'},
  {art:'s6_cloudwhale',name:'번개구름 고래',en:'THUNDERHEAD WHALE',c:'#ffe25a',dark:'#2a3448'},
  {art:'s6_captain',name:'비행선 함장',en:'SKYSHIP CAPTAIN',c:'#ff5a6a',dark:'#1a2440'},
  {art:'s6_clock',name:'깃털 시계탑',en:'FEATHER CLOCKTOWER',c:'#8ad8ff',dark:'#2a3a52'},
  {art:'s6_organ',name:'풍금 합창단',en:'WIND-ORGAN CHOIR',c:'#c8a0ff',dark:'#2a2040'},
  {art:'s6_prism',name:'무지개 다리 수문장',en:'PRISM GATEKEEPER',c:'#ffffff',dark:'#24304a'},
  {art:'s6_falcon',name:'메아리 사냥매',en:'ECHO FALCON',c:'#ffb84a',dark:'#2a2420'},
  {art:'s6_storm',name:'폭풍의 눈',en:'EYE OF THE STORM',c:'#7af0ff',dark:'#141c38'},
  {art:'s6_spire',name:'공명탑 · 첫 번째 노래',en:'THE RESONANT SPIRE',c:'#ffe8a0',dark:'#1c2238'}];
 /* 공용 도구 */
 const lim=(A,x0,y0,x1,y1,w,c,lt)=>{A.L(x0,y0,x1,y1,K,w+.9);A.L(x0,y0,x1,y1,c,w);if(lt)A.L(x0-.2,y0-.3,x1-.2,y1-.3,lt,Math.max(.3,w*.3),.8)};
 const cloud=(A,x,y,r,t,seed,c1,c2,c3)=>{for(let i=0;i<5;i++){const a=i*1.26+seed,rr=r*(.55+.2*((i*7+seed*3)%3)),px=x+Math.cos(a)*r*.7,py=y+Math.sin(a)*r*.35+Math.sin(t*1.3+i+seed)*.4;A.C(px,py,rr,c1)}A.C(x,y,r*.75,c1);for(let i=0;i<3;i++)A.C(x-r*.3+i*r*.3,y-r*.25,r*.42,c2);A.C(x-r*.35,y-r*.42,r*.22,c3)};
 const bolt=(A,x0,y0,x1,y1,seed,col,al)=>{let px=x0,py=y0;for(let i=1;i<=5;i++){const k=i/5,nx=x0+(x1-x0)*k+(i<5?((seed*31+i*17)%7-3)*.6:0),ny=y0+(y1-y0)*k;A.L(px,py,nx,ny,col,.6,al);A.L(px,py,nx,ny,'#ffffff',.25,al);px=nx;py=ny}};
 const R={};

 /* 1. 풍향계 기사 — 녹청 낀 구리 갑옷 · 수탉 풍향계 투구 · 화살 창 · 나침반 방패 · 바람 깃발 망토 */
 R.c_s6_vane=A=>{const t=A.t,b=A.bob*.4,C={g1:'#1e3a3a',g2:'#2e5a54',g3:'#4a8a7a',g4:'#7ac0a8',cu:'#b8683a',cu2:'#e0965a',cu3:'#7a3a1e'},sp=t*1.6;
  A.E(0,1,16,1.8,'#000',.35);
  /* 바람 깃발 망토 */for(let i=0;i<5;i++){const w=Math.sin(t*4+i*.8)*1.6;A.P([[-6+i*1.2,-30+b],[-4+i*1.2,-30+b],[-13-i*2.2+w,-10+b+i*1.4],[-15-i*2.2+w,-12+b+i*1.4]],i%2?'#e8f0f8':'#7ad0f0',.95)}
  for(const s of [-1,1]){lim(A,s*3.2,-12+b,s*4.2,-6,2.4,C.g2,C.g4);lim(A,s*4.2,-6,s*4.6,-1.2,2.2,C.g2);A.R(s*4.6-2,-1.6,4,1.8,C.cu3);A.R(s*4.6-2,-1.6,4,.5,C.cu2)}
  A.plate([[-7,-30+b],[7,-30+b],[6,-14+b],[3.6,-11+b],[-3.6,-11+b],[-6,-14+b]],C.g2,K,C.g4);A.P([[-1,-29+b],[1,-29+b],[.6,-13+b],[-.6,-13+b]],C.cu);
  for(let i=0;i<3;i++)A.R(-5.6,-24+b+i*3.4,11.2,.5,C.g1,.8);A.C(0,-21+b,1.6,C.cu2);A.C(0,-21+b,.8,'#fff6d0');A.glow(0,-21+b,4,'#7af0d0',.5+A.pul*.4);
  for(const s of [-1,1]){A.E(s*8,-28.5+b,3.6,2.6,C.g3);A.E(s*8,-29.2+b,3,1.6,C.g4);A.spike(s*10.6,-29+b,s>0?-.3:Math.PI+.3,2.4,1.2,C.cu2)}
  /* 투구 */{const y=-36+b;A.plate([[-5,y+6],[5,y+6],[5.4,y-1],[2.6,y-4],[-2.6,y-4],[-5.4,y-1]],C.g3,K,C.g4);A.R(-4,y+.6,8,1.4,K);if(!A.dm&&!A.blink){A.R(-3.4+A.look[0],y+.9,2.4,.7,'#bffff0');A.R(1+A.look[0],y+.9,2.4,.7,'#bffff0');A.glow(0,y+1.2,5,'#7af0d0',.7)}
   /* 나침반 장식 + 수탉 */A.L(0,y-4,0,y-8,C.cu3,.6);for(let i=0;i<4;i++){const a=i*Math.PI/2+.0;A.L(Math.cos(a)*2.6,y-8+Math.sin(a)*.9,-Math.cos(a)*2.6,y-8-Math.sin(a)*.9,C.cu,.35)}
   for(const [ch,a] of [['N',0],['E',1],['S',2],['W',3]]){const aa=a*Math.PI/2;A.R(Math.sin(aa)*3.2-.3,y-8-Math.cos(aa)*1.1-.3,.6,.6,C.cu2)}
   const fx=Math.cos(sp)*1;A.P([[-3+fx,y-9],[2+fx,y-9.4],[3.4+fx,y-12],[1.4+fx,y-14],[-.2+fx,y-12.4],[-2.6+fx,y-13],[-3.6+fx,y-10.6]],C.cu);A.P([[1.4+fx,y-14],[2.4+fx,y-15.4],[3+fx,y-13.6]],'#ff5a3a');A.R(2.2+fx,y-12.6,.5,.5,K);A.P([[-3.6+fx,y-10.6],[-6+fx,y-13.6],[-5+fx,y-9.8]],C.cu2)}
  /* 나침반 방패 (왼손) */{const x=-11,y=-19+b;A.C(x,y,5.4,K);A.C(x,y,4.8,C.cu);A.ring(x,y,4.8,.6,C.cu2);A.C(x,y,3.6,'#f0e8d0');for(let i=0;i<8;i++){const a=i*Math.PI/4;A.L(x,y,x+Math.cos(a)*(i%2?2:3.4),y+Math.sin(a)*(i%2?2:3.4),i%2?C.cu3:C.g2,.5)}const na=t*.7+Math.sin(t*3)*.3;A.L(x,y,x+Math.cos(na)*3,y+Math.sin(na)*3,'#ff4a3a',.6);A.C(x,y,.6,C.cu3)}
  /* 화살 창 (오른손) */{const x=11,y=-18+b,a=-1.25+Math.sin(t*1.2)*.05,L=26,ex=x+Math.cos(a)*L*.62,ey=y+Math.sin(a)*L*.62,bx=x-Math.cos(a)*L*.38,by=y-Math.sin(a)*L*.38;lim(A,bx,by,ex,ey,1,C.cu3,C.cu2);
   A.P([[ex+Math.cos(a)*3.6,ey+Math.sin(a)*3.6],[ex+Math.cos(a+1.9)*2.2,ey+Math.sin(a+1.9)*2.2],[ex+Math.cos(a-1.9)*2.2,ey+Math.sin(a-1.9)*2.2]],C.cu2);for(const s of [-1,1])A.P([[bx,by],[bx-Math.cos(a+s*.6)*3.6,by-Math.sin(a+s*.6)*3.6],[bx+Math.cos(a)*2,by+Math.sin(a)*2]],s>0?'#e8f0f8':'#7ad0f0');A.C(x,y,1.4,C.g3)}
  A.rise(6,-14,14,-4,30,.5,'#e8fbff',.6,.2);A.bbox=[-18,-52,18,2]};

 /* 2. 연줄의 거인 — 대나무 뼈대 · 종이 몸 · 손에 쥔 수많은 연줄 · 머리 위로 나부끼는 연들 */
 R.c_s6_kite=A=>{const t=A.t,b=A.bob*.3,C={bm:'#c8a060',bm2:'#8a6a3a',bm3:'#ecd0a0',pp:'#f4ead8',pp2:'#d8c8b0'};
  A.E(0,1,18,2,'#000',.35);
  /* 하늘의 연들 (줄은 양손에서) */const kites=[[-23,-44,'#ff5a4a'],[-13,-49,'#4a8aff'],[1,-51,'#ffd04a'],[15,-48,'#5ad08a'],[25,-41,'#c86aff']];
  for(const [i,[kx,ky,kc]] of kites.entries()){const x=kx+Math.sin(t*1.4+i)*2,y=ky+Math.cos(t*1.1+i*2)*1.4,hx=kx<0?-14:14,hy=-26+b;A.L(hx,hy,x,y+3,'#f0e8d8',.18,.7);
   A.P([[x,y-3.4],[x+2.6,y],[x,y+3.4],[x-2.6,y]],K);A.P([[x,y-2.8],[x+2.1,y],[x,y+2.8],[x-2.1,y]],kc);A.P([[x,y-2.8],[x+2.1,y],[x,y]],'#ffffff',.35);A.L(x,y-2.8,x,y+2.8,'#3a2a1a',.2);A.L(x-2.1,y,x+2.1,y,'#3a2a1a',.2);
   for(let j=1;j<=3;j++){const w=Math.sin(t*5+i+j)*.8;A.R(x+w-.4,y+3+j*1.6,.8,.6,j%2?'#ffffff':kc)}}
  /* 다리: 묶은 대나무 */for(const s of [-1,1]){lim(A,s*4,-14+b,s*7,-1,2.2,A.B?C.bm2:C.bm2,C.bm3);for(let i=0;i<3;i++)A.R(s*(4.6+i*1)-1.1,-11+b+i*4,2.2,.5,'#5a3a1e');A.P([[s*7-2.4,0],[s*7+2.4,0],[s*7+1.6,-1.6],[s*7-1.6,-1.6]],C.bm2)}
  /* 몸: 마름모 종이 연 (대나무 십자 뼈대) */{const y=-26+b;A.P([[0,y-15],[13,y],[0,y+13],[-13,y]],K);A.P([[0,y-14],[12,y],[0,y+12],[-12,y]],C.pp);A.P([[0,y-14],[12,y],[0,y]],C.pp2,.6);
   for(const [x0,y0,x1,y1] of [[0,y-14,0,y+12],[-12,y,12,y]])lim(A,x0,y0,x1,y1,.7,C.bm,C.bm3);A.P([[-9,y+2],[-3,y+2],[-6,y+8]],'#ff5a4a',.85);A.P([[3,y+2],[9,y+2],[6,y+8]],'#4a8aff',.85);
   /* 그려 넣은 얼굴 */const ey=y-5;for(const s of [-1,1]){A.E(s*3.4,ey,2,1.5,'#1a1410');if(!A.blink&&!A.dm){A.C(s*3.4+A.look[0]*.6,ey,.8,'#ff5a4a');A.R(s*3.4+A.look[0]*.6-.3,ey-.5,.4,.4,'#ffffff')}A.L(s*1.6,ey-2.6,s*5,ey-3.2,'#1a1410',.45)}A.E(0,y+.4,2.4,.8+A.open*1.4,'#1a1410');A.R(-1.6,y,3.2,.3,'#ff5a4a',.8)}
  /* 팔: 연줄 다발 + 주먹 */for(const s of [-1,1]){const sx=s*10,sy=-28+b,hx=s*14,hy=-26+b+Math.sin(t*2+s)*.6;lim(A,sx,sy,s*16,-34+b,1.6,C.bm2,C.bm3);lim(A,s*16,-34+b,hx,hy,1.4,C.bm2,C.bm3);A.C(hx,hy,2.4,K);A.C(hx,hy,1.9,C.bm);A.R(hx-1.4,hy-.4,2.8,.4,'#5a3a1e');
   for(let i=0;i<4;i++)A.L(hx,hy,hx+s*(1+i*.6),hy+3+i*1.2,'#f0e8d8',.18,.7)}
  /* 머리 장식: 꼬리 리본 */for(let i=0;i<3;i++){const w=Math.sin(t*3+i)*1.4;A.L(0,-40+b,-3+i*3+w,-46+b,['#ff5a4a','#ffd04a','#4a8aff'][i],.5)}
  A.bbox=[-28,-60,28,2]};

 /* 3. 번개구름 고래 — 뭉게구름 몸 · 몸속 번개 · 금빛 눈 · 아래로 내리는 비 */
 R.c_s6_cloudwhale=A=>{const t=A.t,y=-24+A.bob*.8,C={c1:'#3a4660',c2:'#5a6a88',c3:'#8a9ab8',c4:'#c8d4e8',y1:'#ffe25a'};
  /* 비 */for(let i=0;i<14;i++){const q=((t*1.6)+i*.137)%1,x=-20+i*3+Math.sin(i*3)*1;A.L(x,y+8+q*18,x-.6,y+10+q*18,'#9ad0ff',.25,.6*(1-q))}
  /* 꼬리 */{const tw=Math.sin(t*1.6)*1.6;A.P([[18,y-2],[27,y-9+tw],[31,y-13+tw],[29,y-6+tw],[33,y-2+tw],[26,y+1+tw],[18,y+3]],C.c2);A.P([[18,y-2],[27,y-9+tw],[24,y-3]],C.c3,.7)}
  /* 몸통 구름 덩어리 (아래 짙게, 위 밝게) */cloud(A,-6,y+2,13,t,1,C.c1,C.c2,C.c3);cloud(A,8,y+1,12,t,2,C.c1,C.c2,C.c3);cloud(A,-2,y-6,13,t,3,C.c2,C.c3,C.c4);cloud(A,10,y-6,9,t,4,C.c2,C.c3,C.c4);cloud(A,-14,y-4,8,t,5,C.c2,C.c3,C.c4);
  /* 몸속 번개 */const fl=(Math.floor(t*5)%3===0)||A.pul>.4;bolt(A,-12,y-6,-2,y+4,Math.floor(t*5),C.y1,fl?.95:.4);bolt(A,4,y-8,14,y+2,Math.floor(t*5)+3,C.y1,fl?.8:.3);if(fl)A.glow(0,y,22,C.y1,.35);
  /* 입: 고래 수염판 */A.P([[-24,y+1],[-8,y+4],[-10,y+6],[-24,y+4]],'#1a2034');for(let i=0;i<6;i++)A.R(-22+i*2.4,y+2.4,.5,1.8,C.c4,.8);
  /* 머리 쪽 큰 구름 + 눈 */cloud(A,-19,y-3,8,t,6,C.c2,C.c3,C.c4);{const ex=-17,ey=y-3;A.E(ex,ey,2.6,2,'#1a2034');if(!A.dm&&!A.blink){A.C(ex+A.look[0]*.6,ey+A.look[1]*.3,1.4,C.y1);A.R(ex+A.look[0]*.6-.2,ey-1,.4,2,'#3a2a00');A.R(ex-1,ey-1.2,.6,.6,'#ffffff')}A.glow(ex,ey,5,C.y1,.7);A.L(ex-3,ey-3,ex+2.6,ey-3.6,'#1a2034',.6)}
  /* 등 위 분수공: 번개 불꽃 */{const by=y-16;for(let i=0;i<5;i++){const q=((t*1.2)+i/5)%1;A.spark(-6+Math.sin(i*2)*2,by-q*8,1.1*(1-q),i%2?C.y1:'#ffffff',1-q)}}
  for(const [x,yy] of [[-2,y+10],[10,y+9]])A.R(x,yy,.4,.4,'#ffffff',.6);A.bbox=[-30,-48,33,2]};

 /* 4. 비행선 함장 — 머리 위 줄무늬 기구 · 곤돌라 하체 · 프로펠러 · 망원경 팔 · 금단추 외투 */
 R.c_s6_captain=A=>{const t=A.t,b=A.bob*.9,C={nv:'#1e2a4a',nv2:'#2e4070',nv3:'#4a62a0',rd:'#d8384a',rd2:'#ff6a74',wd:'#6a4424',wd2:'#9a6a3a'};
  A.E(0,1,14,1.6,'#000',.3);
  /* 기구 (풍선) */{const y=-45+b,RX=14,RY=8;A.E(0,y,RX+.8,RY+.8,K);for(let xi=-RX;xi<RX;xi+=.5){const h=RY*Math.sqrt(Math.max(0,1-((xi+.25)/RX)**2)),band=Math.floor((Math.asin(Math.max(-1,Math.min(1,(xi+.25)/RX)))/(Math.PI/2))*3.5+3.5);A.R(xi,y-h,.5,h*2,band%2?C.rd:W1)}
   for(let xi=-RX;xi<RX;xi+=.5){const h=RY*Math.sqrt(Math.max(0,1-((xi+.25)/RX)**2));A.R(xi,y+h*.55,.5,h*.45,'#000',.18)}A.E(-5,y-3.6,4.4,2.2,'#ffffff',.45);A.R(-15,y-.3,30,.6,BR3,.8);for(const s of [-1,1,0])A.L(s*10,y+5,s*5.6,-30+b,'#3a2a1a',.25);A.P([[-2,y+6.6],[2,y+6.6],[0,y+8]],BR)}
  /* 프로펠러 (양옆) */for(const s of [-1,1]){const x=s*13,y=-24+b;A.L(s*7,y,x,y,BR3,.9);A.C(x,y,1,BR);const r=Math.floor(t*20)%2;A.R(x-.3,y-(r?3.6:.6),.6,r?7.2:1.2,'#d0d8e0',.8);A.R(x-(r?.6:3.6),y-.3,r?1.2:7.2,.6,'#d0d8e0',.8)}
  /* 곤돌라 하체 */{const y=-12+b;A.plate([[-9,y-6],[9,y-6],[7,y+3],[-7,y+3]],C.wd,K,C.wd2);for(let i=0;i<4;i++)A.R(-7.4,y-4.6+i*2,14.8,.35,'#3a2410',.8);for(let i=-2;i<=2;i++){A.C(i*3,y-1.6,.9,K);A.C(i*3,y-1.6,.6,'#ffe8a0',.9)}A.R(-9.6,y-6.6,19.2,1,BR);A.P([[-7,y+3],[7,y+3],[3,y+6],[-3,y+6]],C.wd2)}
  /* 상체: 외투 */{const y=-30+b;A.plate([[-6,y],[6,y],[7,y+12],[-7,y+12]],C.nv2,K,C.nv3);A.P([[-1.6,y],[1.6,y],[0,y+4]],W1);for(let i=0;i<3;i++)for(const s of [-1,1])A.C(s*2.6,y+5+i*2.4,.45,BR2);
   for(const s of [-1,1]){A.E(s*6.6,y+1,2.8,1.6,BR);for(let i=0;i<3;i++)A.R(s*6.6-1.6+i*1.2,y+2,.35,1.6,BR2)}A.R(-6.6,y+9,13.2,1.2,K);A.R(-1,y+9,2,1.2,BR2)}
  /* 머리: 수염 · 함장 모자 */{const y=-36+b;A.E(0,y,4,4,'#f0c8a0');A.E(0,y+2.6,4.2,2,W2);if(!A.blink&&!A.dm){A.R(-2.4+A.look[0]*.4,y-.8,1,1,K);A.R(1.4+A.look[0]*.4,y-.8,1,1,K)}A.R(-3,y-1.8,2.4,.4,W3);A.R(.6,y-1.8,2.4,.4,W3);
   A.P([[-5.6,y-3],[5.6,y-3],[4.4,y-6.4],[-4.4,y-6.4]],C.nv);A.R(-6.4,y-3.4,12.8,1,K);A.R(-4.4,y-4.6,8.8,.7,BR);A.C(0,y-5,1,BR2)}
  /* 망원경 팔 (오른) · 키 손잡이 (왼) */lim(A,6.6,-28+b,12,-22+b,1.4,C.nv2,C.nv3);lim(A,12,-22+b,18,-26+b,1.6,BR3,BR2);A.C(18.4,-26.2+b,1.1,K);A.C(18.4,-26.2+b,.7,'#bfeaff');A.glow(18.4,-26.2+b,3,'#bfeaff',.6+A.pul*.4);
  lim(A,-6.6,-28+b,-11,-21+b,1.4,C.nv2,C.nv3);{const x=-12,y=-20+b,r=t*1.4;A.ring(x,y,2.6,.5,C.wd2);for(let i=0;i<6;i++){const a=r+i*Math.PI/3;A.L(x,y,x+Math.cos(a)*3.4,y+Math.sin(a)*3.4,C.wd2,.4)}A.C(x,y,.6,BR)}
  A.bbox=[-16,-56,20,2]};

 /* 5. 깃털 시계탑 — 거꾸로 매달린 탑 · 정오에 멈춘 문자판 · 깃털 날개 · 깃펜 바늘 */
 R.c_s6_clock=A=>{const t=A.t,y=-24+A.bob*.7,C={m1:'#e8eef6',m2:'#c0ccd8',m3:'#8a9cb0',f1:'#8ad8ff',f2:'#4aa0e0',f3:'#2a5a9a'};
  /* 날개 (깃털 여러 장) */for(const s of [-1,1])for(let i=0;i<7;i++){const fl=Math.sin(t*2+i*.3)*.08,a=-Math.PI/2+s*(.5+i*.24)+s*fl,L=14-i*.9,x0=s*7,y0=y-6+i*.6,x1=x0+Math.cos(a)*L,y1=y0+Math.sin(a)*L*.85;
   lim(A,x0,y0,x1,y1,1.6-i*.08,i<3?C.f1:i<5?C.f2:C.f3);A.L(x0,y0,x1,y1,'#ffffff',.2,.6)}
  /* 탑 몸 (위는 받침, 아래로 뾰족 지붕 = 거꾸로) */A.plate([[-8,y-18],[8,y-18],[7,y+6],[-7,y+6]],C.m1,K,'#ffffff');for(let i=0;i<4;i++)A.R(-7,y-14+i*5,14,.4,C.m3,.7);for(const s of [-1,1])A.R(s*6-1,y-17,2,22,C.m2,.6);
  A.R(-9,y-19.4,18,1.6,BR);A.R(-9,y-19.4,18,.5,BR2);/* 매달린 사슬 */for(let i=0;i<6;i++)A.E(0,y-21-i*1.6,.6,.9,i%2?BR2:BR3);A.R(-3,y-31,6,1,BR3);
  /* 거꾸로 지붕 */A.P([[-8,y+6],[8,y+6],[0,y+18]],K);A.P([[-7.2,y+6.4],[7.2,y+6.4],[0,y+17]],C.f3);A.P([[0,y+6.4],[7.2,y+6.4],[0,y+17]],C.f2);for(let i=1;i<4;i++)A.R(-7+i*1.8,y+6.6+i*2.4,14-i*3.6,.35,C.f1,.6);A.C(0,y+18.4,.9,BR2);
  /* 문자판 */{const cy=y-8,R0=5.6;A.C(0,cy,R0+.8,K);A.C(0,cy,R0+.4,BR);A.C(0,cy,R0,'#fffaf0');for(let i=0;i<12;i++){const a=i*Math.PI/6;A.R(Math.cos(a)*(R0-1)-.25,cy+Math.sin(a)*(R0-1)-.25,.5,.5,i%3?C.m3:'#2a3a52')}
   /* 정오에서 떨리는 깃펜 바늘 */const jit=Math.sin(t*14)*.04,a1=-Math.PI/2+jit,a2=-Math.PI/2-.02;lim(A,0,cy,Math.cos(a1)*4.6,cy+Math.sin(a1)*4.6,.5,'#2a3a52');A.P([[Math.cos(a2)*3.4-.8,cy+Math.sin(a2)*3.4],[Math.cos(a2)*3.4+.8,cy+Math.sin(a2)*3.4],[0,cy-4.8]],C.f2);A.C(0,cy,.7,BR2);
   if(!A.dm){A.glow(0,cy,8,'#bfeaff',.35+A.pul*.4)}}
  /* 아래 창문 = 눈 */for(const s of [-1,1]){const ex=s*3,ey=y+1.6;A.R(ex-1.3,ey-1.6,2.6,3.2,K);A.R(ex-1,ey-1.3,2,2.6,'#1a2840');if(!A.blink&&!A.dm){A.R(ex-.6+A.look[0]*.3,ey-.6,1.2,1.2,'#8ad8ff');A.glow(ex,ey,2.6,'#8ad8ff',.6)}}
  /* 떨어지는 깃털 */for(let i=0;i<4;i++){const q=((t*.3)+i/4)%1,x=-12+i*8+Math.sin(t*2+i)*2,yy=y+4+q*20;A.P([[x,yy],[x+1,yy+.4],[x,yy+2.4]],C.f1,1-q)}
  A.bbox=[-20,-58,20,2]};

 /* 6. 풍금 합창단 — 부채꼴 오르간 파이프 · 파이프마다 노래하는 가면 · 풀무 날개 */
 R.c_s6_organ=A=>{const t=A.t,b=A.bob*.3,C={iv:'#f0e8dc',iv2:'#c8bca8',lv:'#8a6ac8',lv2:'#c8a0ff',lv3:'#4a3478',gd:BR2};
  A.E(0,1,18,1.8,'#000',.35);
  /* 받침 (오르간 상자) */A.plate([[-14,-10+b],[14,-10+b],[13,0],[-13,0]],'#5a3a28',K,'#8a5a3a');for(let i=-5;i<=5;i++)A.R(i*2.2-.8,-6+b,1.6,3.6,i%2?W1:K);A.R(-14,-11+b,28,1.4,BR);
  /* 풀무 날개 (숨쉬기) */const br=.5+.5*Math.sin(t*2);for(const s of [-1,1]){for(let i=0;i<5;i++){const a=s*(.3+i*.16+br*.06);A.P([[s*12,-14+b],[s*12+Math.sin(a)*14,-14+b-Math.cos(a)*10],[s*12+Math.sin(a+s*.14)*14,-14+b-Math.cos(a+s*.14)*10]],i%2?C.lv:C.lv3)}A.C(s*12,-14+b,1.4,BR)}
  /* 파이프 부채꼴 */const N=9;for(let i=0;i<N;i++){const k=i-(N-1)/2,h=18+(4-Math.abs(k))*4.4,x=k*2.8,top=-11+b-h;A.R(x-1.3,top,2.6,h,K);A.R(x-1,top+.2,2,h-.4,i%2?C.iv:C.iv2);A.R(x-1,top+.2,.6,h-.4,'#ffffff',.6);A.P([[x-1,top+h*.55],[x+1,top+h*.55],[x,top+h*.55-1.2]],K);
   /* 파이프 위 가면 얼굴 (노래) */const fy=top+3.2,sing=Math.max(0,Math.sin(t*3+i*.9));A.E(x,fy,1.5,1.9,K);A.E(x,fy,1.2,1.6,'#fff6ee');A.R(x-.8,fy-.6,.5,.35,K);A.R(x+.3,fy-.6,.5,.35,K);A.E(x,fy+.7,.4,.2+sing*.5,K);
   if(sing>.6)A.ring(x,top-1.6,1+sing*1.6,.25,C.lv2,.7)}
  /* 가운데 지휘 가면 */{const y=-30+b;A.E(0,y,4,4.6,K);A.E(0,y,3.5,4.1,'#fff6ee');A.P([[-3.5,y-1],[3.5,y-1],[0,y-5]],C.lv);for(const s of [-1,1]){A.P([[s*.8,y-.6],[s*2.8,y-1.4],[s*2.4,y+.2]],K);if(!A.blink&&!A.dm)A.R(s*1.8-.3+A.look[0]*.3,y-.8,.6,.5,C.lv2)}A.E(0,y+2,1.2,.5+A.open*1.2,K);A.glow(0,y,8,C.lv2,.4+A.pul*.4)}
  A.rise(6,-16,16,-20,24,.4,C.lv2,.7,.5);A.bbox=[-28,-52,28,2]};

 /* 7. 무지개 다리 수문장 — 깨진 무지개 다리를 등에 진 거대 결정 거인 · 외눈 프리즘 · 빛의 대검 · 아치 방패 */
 R.c_s6_prism=A=>{const t=A.t,b=A.bob*.25,C={g0:'#0e1428',g1:'#1c2848',g2:'#2e4878',g3:'#5a88c8',g4:'#a8d8ff'},RB=['#ff4a5a','#ff9a3a','#ffe04a','#4ae08a','#3aa8ff','#6a5aff','#c85aff'],cs=Math.floor(t*4)%7,BL=A.win('beam')||0;
  /* 깨진 무지개 아치 (조각이 떠 있음) */for(let i=0;i<7;i++){const r=24.5-i*1.2;for(let a=0;a<=80;a++){const q=Math.PI+a*Math.PI/80,gap=(a>30&&a<38)||(a>58&&a<63);if(gap)continue;const fl=(a>38&&a<58)?Math.sin(t*1.5+a*.1)*1.2-1.6:0;A.R(Math.cos(q)*r-.7,-28+Math.sin(q)*r*1.05-.7+fl,1.4,1.4,RB[i],.85)}}
  /* 다리 받침 */A.P([[-22,0],[22,0],[18,-4.4],[-18,-4.4]],'#3a3a4e');for(let i=-5;i<=5;i++)A.R(i*3.4-.3,-4.4,.6,4.4,'#24243a');A.R(-22,-5,44,1,'#8a8aa8');for(const s of [-1,1])A.P([[s*18,-5],[s*21,-5],[s*20,-10],[s*18.4,-10]],'#5a5a78');
  /* 다리 (기둥 같은 결정) */for(const s of [-1,1]){A.P([[s*3,-18+b],[s*9,-18+b],[s*8,-5],[s*3.4,-5]],K);A.P([[s*3.6,-17.4+b],[s*8.4,-17.4+b],[s*7.4,-5.6],[s*4,-5.6]],C.g2);A.P([[s*6,-17.4+b],[s*8.4,-17.4+b],[s*7.4,-5.6],[s*5.6,-5.6]],C.g1,.8);A.L(s*4,-16+b,s*4.6,-7,C.g4,.3,.7);A.spike(s*8.6,-12+b,s>0?-.2:Math.PI+.2,3,1.8,C.g3)}
  /* 몸통: 넓은 역삼각 결정 흉갑 + 속 빛 */{const y=-18+b;A.P([[-14,y-22],[14,y-22],[9,y-2],[0,y+2],[-9,y-2]],K);A.P([[-13,y-21.4],[13,y-21.4],[8.4,y-2.4],[0,y+1.2],[-8.4,y-2.4]],C.g1);A.P([[0,y-21.4],[13,y-21.4],[8.4,y-2.4],[0,y+1.2]],C.g0,.7);
   for(const [x0,y0,x1,y1] of [[-13,y-21.4,0,y-10],[13,y-21.4,0,y-10],[0,y-10,0,y+1.2],[-8.4,y-2.4,0,y-10],[8.4,y-2.4,0,y-10]])A.L(x0,y0,x1,y1,C.g3,.35,.8);
   for(let i=0;i<5;i++){const cx=(i-2)*4.2,cy2=y-14+Math.abs(i-2)*1.6;A.L(cx,cy2,cx+((i*7)%3-1)*2,cy2+5,RB[(i+cs)%7],.4,.9)}
   A.P([[0,y-15],[3.4,y-10],[0,y-5],[-3.4,y-10]],'#ffffff');A.P([[0,y-14],[2.6,y-10],[0,y-6],[-2.6,y-10]],RB[cs]);A.glow(0,y-10,10+A.pul*6,RB[cs],.8)}
  /* 어깨: 거대한 결정 견갑 */for(const s of [-1,1]){const x=s*14,y=-38+b;A.P([[x-s*3,y+5],[x+s*5,y+3],[x+s*8,y-6],[x+s*2,y-9],[x-s*2,y-4]],K);A.P([[x-s*2.4,y+4.4],[x+s*4.4,y+2.6],[x+s*7.2,y-5.6],[x+s*2,y-8.2],[x-s*1.6,y-3.6]],C.g2);A.P([[x+s*2,y-8.2],[x+s*7.2,y-5.6],[x+s*3,y-2]],C.g4,.7);
   A.spike(x+s*4,y-7,-Math.PI/2+s*.5,7,2.4,C.g3,'#ffffff');A.spike(x+s*7,y-4,-Math.PI/2+s*1,5,1.8,C.g2,C.g4)}
  /* 머리: 외눈 프리즘 왕관 */{const y=-44+b;A.P([[-5,y+5],[5,y+5],[6,y-1],[0,y-5],[-6,y-1]],K);A.P([[-4.4,y+4.4],[4.4,y+4.4],[5.4,y-1],[0,y-4.4],[-5.4,y-1]],C.g1);A.R(-4,y-.4,8,2.4,K);
   if(!A.dm&&!A.blink){const lx=A.look[0]*1.2;A.P([[lx-2.6,y+.8],[lx,y-.6],[lx+2.6,y+.8],[lx,y+2]],'#ffffff');A.C(lx,y+.7,.8,RB[cs]);A.glow(lx,y+.8,7,RB[cs],.9);A.L(-4,y+.8,4,y+.8,RB[cs],.2,.6)}
   for(let i=-2;i<=2;i++)A.spike(i*2.2,y-3.4+Math.abs(i)*.8,-Math.PI/2+i*.22,i?4.4:7,1.4,i%2?C.g3:C.g4,'#ffffff');A.brow(0,y-.6,9,.6,K)}
  /* 오른팔: 빛의 대검 (위로 치켜듦) */{lim(A,14,-36+b,20,-26+b,2.6,C.g2,C.g4);lim(A,20,-26+b,22,-34+b,2.2,C.g2,C.g4);A.C(22,-34+b,2.2,C.g3);const a=-1.75+BL*.6,L=30,hx=22,hy=-35+b,ex=hx+Math.cos(a)*L,ey=hy+Math.sin(a)*L*.6;
   A.L(hx-Math.cos(a)*3,hy-Math.sin(a)*3,ex,ey,K,3.6);for(let i=0;i<7;i++){const k=i/7,k2=(i+1)/7;A.L(hx+(ex-hx)*k,hy+(ey-hy)*k,hx+(ex-hx)*k2,hy+(ey-hy)*k2,RB[(i+cs)%7],2.4)}A.L(hx,hy,ex,ey,'#ffffff',.6,.9);A.R(hx-3,hy-.6,6,1.2,'#d8d8f0');A.glow(ex,ey,6,'#ffffff',.5)}
  /* 왼팔: 다리 아치 모양 탑 방패 */{lim(A,-14,-36+b,-19,-26+b,2.6,C.g2,C.g4);const x=-21,y=-22+b;A.P([[x-6,y-10],[x+5,y-10],[x+5,y+8],[x-.5,y+11],[x-6,y+8]],K);A.P([[x-5.4,y-9.4],[x+4.4,y-9.4],[x+4.4,y+7.6],[x-.5,y+10.2],[x-5.4,y+7.6]],C.g1);
   for(let i=0;i<7;i++){for(let a=0;a<=14;a++){const q=Math.PI+a*Math.PI/14,r=4-i*.45;A.R(x-.5+Math.cos(q)*r-.3,y+2+Math.sin(q)*r-.3,.6,.6,RB[i],.9)}}A.R(x-5,y+2.6,9,.6,C.g3);A.spike(x-.5,y-9.4,-Math.PI/2,3,1.6,C.g3,'#ffffff')}
  A.rise(8,-24,24,-6,40,.35,'#ffffff',.6,.3);A.bbox=[-30,-56,30,2]};

 /* 8. 메아리 사냥매 — 칼날 깃털의 거대한 전투 맹금 · 날개를 활짝 편 위협 자세 · 세 개의 눈 투구 · 비명 지르는 부리 · 쇠사슬 종을 움켜쥔 발톱 */
 R.c_s6_falcon=A=>{const t=A.t,y=-28+A.bob*1.1,C={s0:'#141820',s1:'#262e3c',s2:'#3e4a5e',s3:'#6a7a92',b1:'#6a4018',b2:'#b8782a',b3:'#ffc860',ey:'#ff7a2a'},fl=Math.sin(t*3)*.12,SC=A.win('screech')||0;
  /* 날개: 칼날 깃털 3단 (펼친 위협 자세) */for(const s of [-1,1]){for(let row=0;row<3;row++)for(let i=0;i<9;i++){const a=-Math.PI/2+s*(.35+i*.15+row*.05)-s*fl*(1+row*.3),L=(31-i*1.8)*(1-row*.22),x0=s*(5+row*1.4),y0=y-3+i*.6+row*1.6,x1=x0+Math.cos(a)*L,y1=y0+Math.sin(a)*L*.62+i*.6;
     const col=row===0?(i<4?C.b2:C.s2):row===1?C.s1:C.s0;A.P([[x0,y0-.8],[x1+s*.6,y1-.6],[x1+s*2.4,y1+1.4],[x0,y0+1]],K);A.P([[x0,y0-.4],[x1,y1-.2],[x1+s*1.8,y1+1],[x0,y0+.6]],col);if(row===0){A.L(x0,y0-.2,x1,y1,C.s3,.25,.8);A.R(x1-.4+s*1,y1,.8,.8,i<4?C.b3:'#c8d4e8')}}
   /* 날개 뼈대 (황동 팔) */lim(A,s*4,y-4,s*13,y-12-fl*8,1.3,C.b1,C.b2);lim(A,s*13,y-12-fl*8,s*22,y-12-fl*10,.9,C.b1,C.b2);A.C(s*13,y-12-fl*8,1.3,C.b2);A.C(s*13,y-12-fl*8,.6,C.ey)}
  /* 꼬리 칼깃 */for(let i=-3;i<=3;i++){const a=Math.PI/2+i*.16;A.P([[i*1.2,y+8],[i*1.2+Math.cos(a)*14+1,y+8+Math.sin(a)*14],[i*1.2+Math.cos(a)*14-1,y+8+Math.sin(a)*14]],i%2?C.s1:C.s2)}
  /* 몸통: 장갑 가슴 */A.E(0,y+2,7.4,10,K);A.E(0,y+2,6.8,9.4,C.s1);A.P([[-5,y-4],[5,y-4],[3.6,y+9],[-3.6,y+9]],C.s2);for(let i=0;i<5;i++){A.P([[-4+i*.3,y-2+i*2.4],[4-i*.3,y-2+i*2.4],[0,y+i*2.4]],i%2?C.s3:C.s2);}A.R(-5.4,y-5,10.8,1,C.b2);A.C(0,y+1,1.6,C.ey);A.glow(0,y+1,5,C.ey,.5+A.pul*.5);
  /* 다리 + 발톱이 움켜쥔 쇠사슬 종 */for(const s of [-1,1]){lim(A,s*3,y+9,s*4,y+15,1.6,C.b1,C.b2);for(let k=-1;k<=1;k++)A.spike(s*4+k*1.1,y+15,Math.PI/2+k*.4,2.6,.9,'#e8e0d0')}
  {const by=y+19,sw=Math.sin(t*2)*.4;for(let i=0;i<3;i++)A.E(sw*i*.4,y+15.6+i*1.2,.7,.5,'#8a8a94');A.P([[-3.6+sw,by+5],[3.6+sw,by+5],[2.4+sw,by+.6],[-2.4+sw,by+.6]],K);A.P([[-3.1+sw,by+4.6],[3.1+sw,by+4.6],[2+sw,by+1],[-2+sw,by+1]],C.b2);A.R(-3.1+sw,by+4,6.2,.6,C.b3);A.C(sw,by+5.6,.7,C.b3);A.glow(sw,by+3,5,C.b3,.3+A.pul*.4)}
  /* 머리: 세 눈 투구 · 볏 칼날 · 갈고리 부리 */{const hy=y-12;for(let i=-2;i<=2;i++)A.spike(i*1.4,hy-3+Math.abs(i)*.6,-Math.PI/2-i*.32,i?4:6,1.2,i%2?C.b2:C.b3,'#ffffff');
   A.E(0,hy,5,4.2,K);A.E(0,hy,4.4,3.7,C.s2);A.P([[-4.4,hy-1.6],[4.4,hy-1.6],[3,hy+1.4],[-3,hy+1.4]],C.s0);
   const op=.6+SC*2+A.open*1.6;A.P([[-1.8,hy+1.6],[1.8,hy+1.6],[0,hy+5.6]],K);A.P([[-1.4,hy+1.8],[1.4,hy+1.8],[.4,hy+5.2],[0,hy+5.6]],C.b3);A.P([[-1.2,hy+2.6+op*.3],[1.2,hy+2.6+op*.3],[0,hy+4+op]],'#1a0a0a');
   if(!A.dm&&!A.blink){for(const [ex,ey,r] of [[-2.2,hy-.2,.8],[2.2,hy-.2,.8],[0,hy-1.6,.6]]){A.C(ex+A.look[0]*.3,ey,r,C.ey);A.R(ex+A.look[0]*.3-.15,ey-.4,.3,.3,'#ffffff');A.glow(ex,ey,3,C.ey,.8)}}A.brow(-2.2,hy-1.4,2.6,.5,K);A.brow(2.2,hy-1.4,2.6,-.5,K)}
  /* 비명 음파 */for(let k=1;k<=3;k++){const q=((t*1.2)+k/3)%1;A.ring(0,y-8,3+q*(10+SC*14),.3,C.ey,(.35+SC*.4)*(1-q))}
  A.bbox=[-24,-52,24,2]};

 /* 9. 폭풍의 눈 — 나선 구름띠 · 가운데 고요한 거대 눈 · 소용돌이에 휩쓸린 기왓장·연·톱니 · 번개 */
 R.c_s6_storm=A=>{const t=A.t,y=-26+A.bob*.5,C={s1:'#141c38',s2:'#24305a',s3:'#3a4c80',s4:'#6a80b8',s5:'#a8bce0'},sp=t*.9;
  /* 바깥 나선 구름띠 */for(let k=0;k<3;k++)for(let i=0;i<40;i++){const a=sp*(1+k*.3)+i*TAU/40+k*1.1,rr=21-k*4.6+Math.sin(i*1.7+t)*1.2,x=Math.cos(a)*rr,yy=y+Math.sin(a)*rr*.62;A.C(x,yy,2.4-k*.4,[C.s2,C.s3,C.s4][k],.85)}
  for(let i=0;i<30;i++){const a=-sp*1.4+i*TAU/30,rr=10.6,x=Math.cos(a)*rr,yy=y+Math.sin(a)*rr*.62;A.C(x,yy,1.5,C.s5,.7)}
  /* 휩쓸린 잔해 */const deb=[['tile','#a84a3a'],['kite','#ff5a4a'],['gear','#c8a060'],['tile','#a84a3a'],['kite','#5ad08a'],['gear','#c8a060']];for(const [i,[k,c]] of deb.entries()){const a=sp*1.6+i*TAU/6,rr=24+Math.sin(i)*2,x=Math.cos(a)*rr,yy=y+Math.sin(a)*rr*.5-2;
   if(k==='tile')A.P([[x-1.6,yy-.6],[x+1.6,yy-1],[x+1.4,yy+.8],[x-1.4,yy+1]],c);else if(k==='kite')A.P([[x,yy-1.6],[x+1.2,yy],[x,yy+1.6],[x-1.2,yy]],c);else A.gear(x,yy,1.3,6,a,c,'#6a4a2a')}
  /* 가운데 고요한 눈 */{const r=6.6;A.C(0,y,r+1.2,K);A.E(0,y,r+.6,r*.62+.6,C.s1);A.E(0,y,r,A.blink?.6:r*.6,'#eef6ff');if(!A.blink&&!A.dm){const lx=A.look[0]*2.4,ly=A.look[1]*1.2;A.C(lx,y+ly,3,'#2a6ab8');A.C(lx,y+ly,2.2,'#7af0ff');A.C(lx,y+ly,1.2,K);A.R(lx-1.2,y+ly-1.4,.8,.8,'#ffffff');A.glow(0,y,14,'#7af0ff',.4+A.pul*.4)}
   A.L(-r-1,y-r*.6-.6,r+1,y-r*.6-1.4,C.s1,.9)}
  /* 번개 */if(Math.floor(t*4)%4===0){bolt(A,-14,y-14,-20,y+14,Math.floor(t*4),'#ffe25a',.9);A.glow(-17,y,10,'#ffe25a',.4)}
  /* 아래 회오리 꼬리 (땅에 닿음) */for(let i=0;i<10;i++){const q=i/10,w=6-q*5,yy=y+12+q*14,ox=Math.sin(t*3+q*6)*q*3;A.E(ox,yy,w,1,i%2?C.s3:C.s2,.85)}
  A.bbox=[-28,-50,28,2]};

 /* 10. 공명탑 · 첫 번째 노래 — 소리굽쇠 왕관 · 종 고리들 · 가운데 노래 결정 · 하프 줄 팔 · 1~5장의 소리 조각 */
 R.c_s6_spire=A=>{const t=A.t,b=A.bob*.25,C={w1:'#f4f0e4',w2:'#d8d0bc',w3:'#a89c84',g1:'#e0b860',g2:'#ffe8a0',g3:'#8a6a2a',cy:'#7af0ff'};
  A.E(0,1,16,1.8,'#000',.35);
  /* 하프 줄 팔 (양쪽 곡선 틀 + 떨리는 줄) */for(const s of [-1,1]){const pts=[];for(let i=0;i<=8;i++){const q=i/8;pts.push([s*(7+Math.sin(q*Math.PI)*15),-44+b+q*34])}for(let i=0;i<8;i++){lim(A,pts[i][0],pts[i][1],pts[i+1][0],pts[i+1][1],1.1,C.g1,C.g2)}
   for(let j=1;j<8;j++){const [px,py]=pts[j],v=Math.sin(t*12+j)*.4*A.pul;A.L(s*7,py,px,py+v,'#ffffff',.18,.8)}A.C(pts[0][0],pts[0][1],1,C.g2);A.C(pts[8][0],pts[8][1],1,C.g2)}
  /* 탑 몸 */A.plate([[-7,-8+b],[7,-8+b],[5,-40+b],[-5,-40+b]],C.w1,K,'#ffffff');for(let i=0;i<6;i++){A.R(-6.4+i*.35,-12+b-i*5,12.8-i*.7,.5,C.w3,.8);A.R(-6.4+i*.35,-11.5+b-i*5,12.8-i*.7,.4,C.g1,.6)}
  A.plate([[-10,-8+b],[10,-8+b],[12,0],[-12,0]],C.w2,K,C.w1);for(let i=-3;i<=3;i++)A.R(i*3.2-.8,-6+b,1.6,6,C.w3,.6);
  /* 종 고리 (세 겹, 돈다) */for(let r=0;r<3;r++){const yy=-16+b-r*8,rr=7.6-r*.8;for(let i=0;i<6;i++){const a=t*(r%2?-1:1)*.8+i*Math.PI/3,x=Math.cos(a)*rr,front=Math.sin(a)>0;if(!front)continue;const bx=x,by=yy+Math.sin(a)*1.2;A.P([[bx-1.2,by+1.4],[bx+1.2,by+1.4],[bx+.7,by-.6],[bx-.7,by-.6]],C.g1);A.R(bx-1.2,by+1.1,2.4,.35,C.g2);A.C(bx,by+1.7,.3,C.g3)}A.ring(0,yy+.4,rr,.25,C.g3,.5)}
  /* 노래 결정 (심장) */{const y=-24+b,p=.5+.5*Math.sin(t*3);A.P([[0,y-4.6],[3,y],[0,y+4.6],[-3,y]],K);A.P([[0,y-4],[2.5,y],[0,y+4],[-2.5,y]],C.cy);A.P([[0,y-4],[2.5,y],[0,y]],'#ffffff',.6);A.glow(0,y,8+p*6,C.cy,.6+A.pul*.4);
   if(!A.dm&&!A.blink){A.R(-.5+A.look[0]*.5,y-.5,1,1,'#ffffff')}}
  /* 소리굽쇠 왕관 */{const y=-40+b;A.P([[-5,y],[5,y],[3.6,y-3],[-3.6,y-3]],C.g1);for(const s of [-1,1]){lim(A,s*2.2,y-3,s*2.2,y-14,1.1,C.g2,'#ffffff');const v=Math.sin(t*20)*.3*(.3+A.pul);A.L(s*2.2+v,y-14,s*2.2+v,y-15,'#ffffff',.6)}A.C(0,y-3.4,1.3,C.g2);
   for(let k=1;k<=3;k++){const q=((t*.8)+k/3)%1;A.ring(0,y-10,2+q*4.4,.3,C.g2,.55*(1-q))}}
  /* 1~5장의 소리 조각 (톱니 · 송곳니 · 시계바늘 · 별 · 물방울) 공전 */for(let i=0;i<5;i++){const a=t*.6+i*TAU/5,x=Math.cos(a)*16,yy=-30+b+Math.sin(a)*4,c=['#8eda9e','#ff6a8a','#e8c070','#c8b8ff','#7ad0f0'][i];
   if(i===0)A.gear(x,yy,1.4,6,t*2,c,'#3a5a44');else if(i===1)A.P([[x-1,yy-1.2],[x+1,yy-1.2],[x,yy+1.6]],c);else if(i===2){A.ring(x,yy,1.3,.35,c);A.L(x,yy,x+1,yy-.6,c,.3)}else if(i===3)A.P([[x,yy-1.8],[x+.6,yy-.4],[x+1.8,yy],[x+.6,yy+.4],[x,yy+1.8],[x-.6,yy+.4],[x-1.8,yy],[x-.6,yy-.4]],c);else A.P([[x,yy-1.8],[x+1.1,yy+.4],[x,yy+1.4],[x-1.1,yy+.4]],c);A.glow(x,yy,2.6,c,.5)}
  A.bbox=[-23,-58,23,2]};


 /* ---------- 난이도 단계: 보통 = post(몸 위 장식) · 어려움 = pre(몸 뒤 큰 부위)+post · 익스트림 = 전부 + 각성 리마스터 ---------- */
 const U6={
  c_s6_vane:{pre(A){const t=A.t,b=A.bob*.4;for(let k=0;k<2;k++)for(let i=0;i<24;i++){const a=t*(k?-1.2:1.6)+i*TAU/24,r=20+k*4;if(i%3===2)continue;A.R(Math.cos(a)*r-.5,-22+b+Math.sin(a)*r*.4-.5,1,1,k?'#bfeaff':'#5ad0b0',.6)}for(let i=0;i<4;i++){const w=Math.sin(t*4+i)*1.4;A.P([[6+i*1.4,-30+b],[8+i*1.4,-30+b],[16+i*2+w,-14+b+i],[14+i*2+w,-15+b+i]],i%2?'#ffffff':'#5ad0b0',.9)}},
   post(A){const b=A.bob*.4;for(const [x,y] of [[-5,-28],[5,-28],[-5,-16],[5,-16]])A.C(x,y+b,.45,'#f0c878');for(let i=0;i<4;i++)A.L(-4+i*2.6,-14+b,-4.2+i*2.6,-11+b+(i%2),'#5ad0b0',.3,.8);A.R(-7,-30.6+b,14,.6,'#f0c878')}},
  c_s6_kite:{pre(A){const t=A.t;for(let i=0;i<8;i++){const a=t*.5+i*TAU/8,x=Math.cos(a)*30,y=-30+Math.sin(a)*12,c=['#ff5a4a','#ffd04a','#4a8aff','#5ad08a'][i%4];A.P([[x,y-2],[x+1.4,y],[x,y+2],[x-1.4,y]],c,.85)}for(let i=0;i<5;i++){const q=((t*.8)+i/5)%1;A.L(-30+q*60,-48+i*6,-24+q*60,-48+i*6,'#ffffff',.2,.5*(1-q))}},
   post(A){const b=A.bob*.3,y=-26+b;A.C(0,y+6,2.2,'#ffd04a');for(let i=0;i<8;i++){const a=i*Math.PI/4;A.L(Math.cos(a)*2.4,y+6+Math.sin(a)*2.4,Math.cos(a)*3.6,y+6+Math.sin(a)*3.6,'#ff8a3a',.35)}for(const s of [-1,1])for(let i=0;i<3;i++)A.R(s*14-1+i*.6,-23+b+i*1.4,.6,1,['#ff5a4a','#ffd04a','#4a8aff'][i])}},
  c_s6_cloudwhale:{pre(A){const t=A.t,y=-24+A.bob*.8;cloud(A,-4,y-2,20,t,9,'#1a2234','#283450','#3a4a6a');for(let i=0;i<3;i++)if(Math.floor(t*6+i)%5===0)bolt(A,-24+i*20,y-14,-28+i*20,y+12,Math.floor(t*6)+i,'#ffe25a',.8)},
   post(A){const t=A.t,y=-24+A.bob*.8;for(const [x,yy,r] of [[-8,-10,2.6],[6,-11,2.2],[-16,-8,1.8]])A.C(x,y+yy,r,'#e8f0fa',.8);for(let i=0;i<3;i++){const a=-Math.PI/2+(i-1)*.5;bolt(A,-19,y-9,-19+Math.cos(a)*6,y-9+Math.sin(a)*6,i+Math.floor(t*4),'#ffe25a',.8)}}},
  c_s6_captain:{pre(A){const t=A.t,b=A.bob*.9;for(const s of [-1,1]){const x=s*20,y=-36+b;A.E(x,y,5,3,'#1a2440');A.E(x,y,4.4,2.4,s>0?'#d8384a':'#f4f7fb');A.L(x,y+3,s*12,-26+b,'#3a2a1a',.2)}for(let i=0;i<6;i++){const q=((t*.6)+i/6)%1;A.C(-8+Math.sin(i)*3,-6-q*-14,1+q*2,'#c8c8d0',.5*(1-q))}},
   post(A){const b=A.bob*.9;for(let i=0;i<3;i++)A.C(-3.4+i*1.6,-27+b,.6,['#ffd04a','#ff5a6a','#7ad0f0'][i]);A.R(-14,-45.3+b,28,.5,'#f0c878');A.L(0,-52+b,0,-55+b,'#7a5428',.3);A.P([[0,-55+b],[2.6,-54.2+b],[0,-53.4+b]],'#ff5a6a')}},
  c_s6_clock:{pre(A){const t=A.t,y=-24+A.bob*.7;A.gear(0,y-8,15,18,t*.3,'#c8964a','#7a5428',false);A.ring(0,y-8,12,.8,'#f0c878',.8)},
   post(A){const y=-24+A.bob*.7;for(let i=0;i<12;i++){const a=i*Math.PI/6;A.R(Math.cos(a)*7.4-.3,y-8+Math.sin(a)*7.4-.3,.6,.6,'#f0c878')}A.P([[0,y+11],[1,y+12.4],[0,y+13.8],[-1,y+12.4]],'#8ad8ff');A.R(-8,y-3,16,.4,'#f0c878',.8)}},
  c_s6_organ:{pre(A){const t=A.t,b=A.bob*.3;for(let i=0;i<11;i++){const k=i-5,h=26+(5-Math.abs(k))*3,x=k*3.4;A.R(x-1,-11+b-h,2,h,'#4a3478',.9);A.R(x-1,-11+b-h,2,.8,'#c8a0ff')}for(let i=0;i<5;i++){const q=((t*.5)+i/5)%1,x=-18+i*9;A.P([[x,-40-q*10],[x+1.4,-40-q*10],[x+1.4,-36-q*10]],'#c8a0ff',1-q)}},
   post(A){const b=A.bob*.3;for(let i=0;i<9;i++){const k=i-4,x=k*2.8;A.R(x-1,-12+b-3,2,.5,'#f0c878')}A.P([[0,-35.4+b],[.8,-34.4+b],[0,-33.4+b],[-.8,-34.4+b]],'#ff6aa8')}},
  c_s6_prism:{pre(A){const t=A.t;for(let i=0;i<8;i++){const a=t*.7+i*TAU/8,x=Math.cos(a)*29,y=-26+Math.sin(a)*9,h=3+(i%3);A.P([[x,y-h],[x+1.4,y],[x,y+h*.6],[x-1.4,y]],['#a8d8ff','#ffffff','#c85aff'][i%3],.85);A.glow(x,y,3,'#a8d8ff',.4)}},
   post(A){const t=A.t,b=A.bob*.25,RB=['#ff4a5a','#ff9a3a','#ffe04a','#4ae08a','#3aa8ff','#6a5aff','#c85aff'];for(let i=0;i<7;i++){const x=-10+i*3.3,y=-36+b+Math.abs(i-3)*1.2;A.R(x-.4,y,.8,.8,RB[(i+Math.floor(t*4))%7])}for(const s of [-1,1])A.L(s*6,-26+b,s*3,-20+b,'#a8d8ff',.3,.8)}},
  c_s6_falcon:{pre(A){const t=A.t,y=-28+A.bob*1.1,o=Math.sin(t*2)*2;for(const s of [-1,1])for(let i=0;i<7;i++){const a=-Math.PI/2+s*(.3+i*.17),L=36-i*2,x0=s*6,y0=y-2+i;A.L(x0,y0,x0+Math.cos(a)*L+s*o,y0+Math.sin(a)*L*.62,'#ff7a2a',.6,.3)}},
   post(A){const y=-28+A.bob*1.1;for(const s of [-1,1]){for(let i=0;i<4;i++)A.C(s*(8+i*4.4),y-6-i*1.4,.4,'#ffc860')}A.R(-5.4,y-5.6,10.8,.4,'#ffe8a0');A.P([[-1,y+5],[1,y+5],[0,y+7]],'#ff7a2a')}},
  c_s6_storm:{pre(A){const t=A.t,y=-26+A.bob*.5;for(let i=0;i<48;i++){const a=t*.5+i*TAU/48,r=29+Math.sin(i*2.3+t)*1.6;A.C(Math.cos(a)*r,y+Math.sin(a)*r*.55,2,'#0c1228',.9)}for(let i=0;i<16;i++){const q=((t*1.4)+i*.13)%1,x=-26+i*3.4;A.L(x,y+14+q*12,x-.6,y+16+q*12,'#7af0ff',.2,.5*(1-q))}},
   post(A){const y=-26+A.bob*.5;for(let i=-3;i<=3;i++)A.L(i*1.8,y-4.6,i*2.4,y-7-Math.abs(i)*.2,'#ffe25a',.3);for(let i=-3;i<=3;i++)A.L(i*1.8,y+4.6,i*2.2,y+6.4,'#ffe25a',.25,.7)}},
  c_s6_spire:{pre(A){const t=A.t;for(let k=0;k<3;k++){let px=-30,py=-36+k*5;for(let i=1;i<=20;i++){const x=-30+i*3,y=-36+k*5+Math.sin(t*1.2+i*.4+k)*3;A.L(px,py,x,y,['#7af0ff','#c8a0ff','#ffe8a0'][k],.6,.35);px=x;py=y}}},
   post(A){const b=A.bob*.25;for(let i=0;i<5;i++)A.C(-4+i*2,-9+b,.5,'#ffe8a0');for(const s of [-1,1])A.P([[s*5,-40+b],[s*6.4,-38+b],[s*5,-36+b]],'#7af0ff')}}};
 for(const k in U6)EXU[k]=U6[k];
 Object.assign(EXF,{c_s6_vane:['#7af0d0',['crown']],c_s6_kite:['#ffd04a',['orbit']],c_s6_cloudwhale:['#ffe25a',['arcs']],c_s6_captain:['#ff6a74',['rays']],c_s6_clock:['#bfeaff',['halo']],c_s6_organ:['#e0c0ff',['rings']],c_s6_prism:['#ffffff',['rays','crystals']],c_s6_falcon:['#ff9a3a',['wings']],c_s6_storm:['#7af0ff',['rings']],c_s6_spire:['#ffe8a0',['halo','rays']]});
 /* 엔진 등록: 넓은 그림판 · 보스 정보(색) */
 for(const k in R){MON.reg[k]=R[k];MON.hand[k]=()=>{};MON.noArm[k]=1}
 /* 전투 크기 (5장과 같은 기준): 그림판 단위 × 0.5 */Object.assign(MON.scl,{c_s6_vane:.52,c_s6_kite:.5,c_s6_cloudwhale:.52,c_s6_captain:.5,c_s6_clock:.52,c_s6_organ:.5,c_s6_prism:.5,c_s6_falcon:.5,c_s6_storm:.52,c_s6_spire:.48});
 try{if(window.__V43BIG)for(const k in R)window.__V43BIG[k]=1}catch(e){}
 for(const b of S6){if(!C3BOSS[b.art])C3BOSS[b.art]={base:0,c:b.c,pal:[b.dark,K,b.c,'#f4f7fb'],cfg:{bw:18,bh:18,base:'hover',head:'visor',arms:'piston',ex:[]},th:0,deck:[]}}
}catch(e){console.error('v45 ch6 designs',e)}})();
