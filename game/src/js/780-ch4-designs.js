/* ================= 시즌 4 ECLIPSE 보스 디자인 — 별을 삼킨 밤의 수호자 10명 =================
   공통: 검은 우주 갑옷 + 별빛 균열, 차갑고 거대한 위압감. 각 보스의 시그니처 패턴마다 준비 동작. */
const M4K='#04030a';
function m4Star(A,x,y,r,col,al){A.P([[x,y-r],[x+r*.28,y-r*.28],[x+r,y],[x+r*.28,y+r*.28],[x,y+r],[x-r*.28,y+r*.28],[x-r,y],[x-r*.28,y-r*.28]],col,al)}
function m4Cres(A,x,y,R,r2,ox,oy,col,al){const o=[],q=[];for(let i=0;i<=48;i++){const a=i*TAU/48,X=x+Math.cos(a)*R,Y=y+Math.sin(a)*R;if(Math.hypot(X-x-ox,Y-y-oy)>=r2)o.push([X,Y])}for(let i=48;i>=0;i--){const a=i*TAU/48,X=x+ox+Math.cos(a)*r2,Y=y+oy+Math.sin(a)*r2;if(Math.hypot(X-x,Y-y)<=R)q.push([X,Y])}
 /* 연속 구간 정렬: 가장 큰 간격에서 회전 */const rot=L=>{let bi=0,bd=0;for(let i=0;i<L.length;i++){const a=L[i],b=L[(i+1)%L.length],d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(d>bd){bd=d;bi=i}}return L.slice(bi+1).concat(L.slice(0,bi+1))};if(o.length<3)return;A.P(rot(o).concat(rot(q)),col,al)}
function m4Speck(A,x0,y0,x1,y1,n,seed,col,tw){for(let i=0;i<n;i++){const X=x0+((i*53.7+seed*17)%100)/100*(x1-x0),Y=y0+((i*31.3+seed*29)%100)/100*(y1-y0),k=.5+.5*Math.sin(A.t*(1.5+i%3)+i);A.R(X-.2,Y-.2,.4,.4,col,tw?.3+.7*k:.8)}}
function m4Act(A,n){const r={w:0,s:0,p:1,on:false,ph:''};try{const a=G&&G.s4act;if(!a||A.dm||typeof mode==='undefined'||mode!=='boss'||G.B!==A.B)return r;if(n&&!(Array.isArray(n)?n.includes(a.n):a.n===n))return r;const e=performance.now()-a.at;
 if(a.ph==='w'){if(e>4000)return r;r.on=true;r.ph='w';r.w=Math.min(1,e/450)}else{if(e>650)return r;r.on=true;r.ph='s';r.p=Math.min(1,e/520);r.s=Math.max(0,1-e/520)}}catch(e){}return r}
function m4A(A,n){const a=m4Act(A,n);return Math.max(a.w,a.s)}
MON.alias.starMedley='lastStar';

/* ── 1. 유성 사냥꾼: 운석 갑주의 사냥꾼, 불타는 혜성창, 뒤로 흩날리는 불꼬리 투구 ── */
MON.reg.c_s4_meteor=A=>{const t=A.t,b=A.bob*.5,C={r:'#2a2230',r2:'#4a3a48',r3:'#7a6070',k:M4K,m:'#ff7a2a',m2:'#ffd08a',w:'#fff4e0'};
 const wM=A.win('meteorRain'),wA=A.win(['spearVolley','huntersMark','skyLeap']),ch=Math.max(wM,wA,A.eyeC),sh=A.shake(wM>.6?.25:0),lean=wA*1.2;
 /* 역관절 다리 */for(const s of [-1,1]){const hx=s*3+sh,hy=-9+b;A.P([[hx-1.4,hy],[hx+1.4,hy],[hx+s*2.4+1,hy+4],[hx+s*2.4-1.2,hy+4.2]],C.r2);A.P([[hx+s*2.4-1.2,hy+4],[hx+s*2.4+1,hy+4],[hx+s*.6+.8,0],[hx+s*.6-1,0]],C.r);for(let i=-1;i<=1;i++)A.spike(hx+s*.6+i*.9,-.3,Math.PI/2+i*.3,1,.6,C.r3);A.C(hx+s*2.4,hy+4.1,.9,C.m,.9)}
 /* 몸통: 운석 판갑 + 용암 균열 */{const x0=sh+lean,top=-21+b;A.plate([[x0-6.4,-8+b],[x0+6.4,-8+b],[x0+7.6,top+5],[x0+4,top],[x0-4,top],[x0-7.6,top+5]],C.r,C.k,C.r3);
  for(const [a,c2,d,e] of [[-4,-11,-1.4,-14],[-1.4,-14,-2.4,-18],[2,-10,3.4,-13.6],[3.4,-13.6,1.6,-17.4],[-5,-15,-3,-16]])A.L(x0+a,c2+b,x0+d,e+b,C.m,.4,.6+ch*.4);
  for(const [cx,cy,r] of [[-3.6,-12.4,1.1],[3.8,-16.6,.9],[.2,-10.2,.7]]){A.C(x0+cx,cy+b,r,C.k);A.ring(x0+cx,cy+b,r+.3,.3,C.r3)}
  A.C(x0,-15+b,1.6,C.k);A.C(x0,-15+b,1.1,A.expose?'#ffffff':C.m);A.glow(x0,-15+b,3+ch*3+(A.open||0)*3,C.m,.7+ch*.3+(A.expose?1:0));
  /* 어깨: 들쭉날쭉한 운석 덩어리 */for(const s of [-1,1]){A.plate([[x0+s*5,top+2],[x0+s*9.4,top+1],[x0+s*10.4,top+4.4],[x0+s*8,top+6.4],[x0+s*5,top+5.4]],C.r2,C.k,C.r3);A.spike(x0+s*9,top+1.4,-Math.PI/2+s*.5,2.2,1.2,C.r3,C.m);A.L(x0+s*6.4,top+3,x0+s*8.6,top+4.6,C.m,.35,.7)}}
 /* 투구: 가로 한 줄 바이저 + 뒤로 흩날리는 불꼬리 */{const hx=sh+lean*1.3,hy=-23.4+b;for(let i=0;i<7;i++){const q=(t*3+i*.37)%1,L=5+i*1.1+wM*3;A.P([[hx-1.6+i*.3,hy-1.6+i*.3],[hx-1+i*.3,hy+.6],[hx-L+q*.8,hy-2.4-i*.6+Math.sin(t*6+i)*.5]],i%2?C.m:C.m2,.85-i*.08)}
  A.plate([[hx-3.6,hy+2.4],[hx+3.6,hy+2.4],[hx+3.4,hy-2],[hx+1.4,hy-3.6],[hx-1.4,hy-3.6],[hx-3.4,hy-2]],C.r2,C.k,C.r3);A.R(hx-3.2,hy-.6,6.4,1.4,C.k);A.slit(hx+A.look[0]*.6,hy+.1,5.2,.8,ch>0?C.w:C.m,0);A.P([[hx-1.2,hy+2.4],[hx+1.2,hy+2.4],[hx,hy+4]],C.r3);for(const s of [-1,1])A.spike(hx+s*3,hy-1.6,-Math.PI/2-s*.9,2.6,1,C.r3)}
 /* 혜성창: 준비 시 치켜듦 · 찌르기(뒤로 당겼다 앞으로) · 던지기 */{const TH=m4Act(A,'thrust'),TW=m4Act(A,'throw'),aim=Math.atan2(A.look[1],A.look[0]),aw=Math.max(TH.w,TH.s);let ang=-Math.PI/2+.75-wM*.75-wA*.2+Math.sin(t*1.2)*.05;ang=ang*(1-aw)+aim*aw;if(TW.w>0)ang=ang*(1-TW.w)+(-Math.PI/2-.3)*TW.w;
 const ca0=Math.cos(ang),sa0=Math.sin(ang),push=-4*TH.w+10*(TH.ph==='s'?Math.sin(Math.min(1,TH.p/.35)*Math.PI/2)*(1-Math.max(0,TH.p-.5)*2):0),px=sh+8.6+lean+ca0*push,py=-12+b+sa0*push-TW.w*3,L=24,ca=ca0,sa=sa0,ex=px+ca*L*.62,ey=py+sa*L*.62;
 if(TH.ph==='s'&&TH.p<.6)A.beam([[px,py],[ex+ca*30-sa*2,ey+sa*30+ca*2],[ex+ca*30+sa*2,ey+sa*30-ca*2]],C.m,(.6-TH.p)*.6);
 if(TW.ph==='s'){A.C(px,py,1.6,C.r2);A.C(px,py,1,C.r3);A.glow(px,py-4,5*TW.s,C.m,TW.s)}else{
  A.L(px-ca*L*.38,py-sa*L*.38,ex,ey,'#1a1420',.9);A.L(px-ca*L*.38,py-sa*L*.38,ex,ey,C.r3,.35);for(let i=0;i<4;i++){const k=-.3+i*.2;A.R(px+ca*L*k-.5,py+sa*L*k-.5,1,1,C.m,.8)}
  const nx=-sa,ny=ca;A.P([[ex+nx*1.6,ey+ny*1.6],[ex-nx*1.6,ey-ny*1.6],[ex+ca*5.4,ey+sa*5.4]],C.r2);A.P([[ex+nx*.8,ey+ny*.8],[ex-nx*.8,ey-ny*.8],[ex+ca*4.6,ey+sa*4.6]],C.m2);A.C(ex+ca*1.4,ey+sa*1.4,1.1,C.w);A.glow(ex+ca*2,ey+sa*2,4+wM*6,C.m,.9+wM);
  for(let i=0;i<5;i++){const q=(t*2.4+i/5)%1;A.spark(ex-ca*q*6+nx*Math.sin(i*2)*1.2,ey-sa*q*6+ny*Math.sin(i*2)*1.2,.7*(1-q),i%2?C.m2:C.m,1-q)}
  /* 창을 쥔 주먹 */A.C(px,py,1.6,C.r2);A.C(px,py,1,C.r3)}}
 if(wM>0){for(let i=0;i<6;i++){const q=(t*1.6+i/6)%1;A.spark(-12+i*5,-40+q*14,.9,C.m2,wM*(1-q))}A.ring(sh+8.6,-36,2+wM*3,.4,C.m,wM*.6)}
 A.rise(6,-10,10,-2,16,.4,C.m,.4,3)};

/* ── 2. 일식의 눈: 해를 가린 검은 원반, 금빛 코로나, 가운데 핏빛 동공 ── */
MON.reg.c_s4_eclipse=A=>{const t=A.t,b=A.bob*1.2,C={k:M4K,d:'#120c18',g:'#ffd98a',g2:'#ff9a3a',w:'#fff8e0',r:'#ff2a3a'};
 const wE=A.win('eclipseRing'),wS=Math.max(A.win(['coronaFlare','penumbra','sunspotRain','solarGaze']),m4A(A,['glare','blink'])),ch=Math.max(wE,wS,A.eyeC),cy=-19+b,R=9.4;
 /* 아래로 늘어진 그림자 촉수 */for(let i=0;i<9;i++){const x=-7+i*1.75,L=7+Math.sin(i*2.3)*2+wE*2,sw=Math.sin(t*1.4+i*.8)*1.2;A.P([[x-.7,cy+6],[x+.7,cy+6],[x+sw+.2,cy+6+L],[x+sw-.2,cy+6+L]],C.d);A.C(x+sw,cy+6+L,.35,C.g2,.6)}
 /* 코로나: 회전하는 불꽃 가시 (준비 시 확장) */{const n=18,rot=t*.25;for(let i=0;i<n;i++){const a=rot+i*TAU/n,L=2.6+1.6*Math.sin(t*3+i*1.7)+wE*4+(i%3===0?2:0),w=1.4+(i%3===0?.6:0);A.spike(Math.cos(a)*(R-.4),cy+Math.sin(a)*(R-.4),a,L,w,i%2?C.g:C.g2,C.w)}
  A.ring(0,cy,R+.9,1.1,C.g2);A.ring(0,cy,R+.5,.5,C.w,.9);A.glow(0,cy,R+6+wE*8,C.g,.9+wE)}
 /* 검은 원반 */A.C(0,cy,R,C.k);A.C(0,cy,R-1.2,C.d);A.ring(0,cy,R-1.2,.3,'#2a2030');for(let i=0;i<12;i++){const a=i*TAU/12-t*.1;A.R(Math.cos(a)*(R-2.2)-.2,cy+Math.sin(a)*(R-2.2)-.2,.4,.4,'#3a2a40')}
 /* 가운데 눈: 금빛 테 + 붉은 세로 동공 */{const er=4.6+ch*.6,lx=A.look[0]*1.2,ly=A.look[1]*.8;A.ring(0,cy,er+.9,.5,C.g,.9);
  if(A.dm||A.blink){A.R(-er,cy-.3,er*2,.6,C.g)}else{A.E(0,cy,er,er*.78,'#2a0a10');A.E(lx,cy+ly,er*.72,er*.62,C.r);A.E(lx,cy+ly,er*.72,er*.62,'#000',.25);A.P([[lx,cy+ly-er*.6],[lx+.7+ch*.6,cy+ly],[lx,cy+ly+er*.6],[lx-.7-ch*.6,cy+ly]],C.k);A.R(lx-er*.45,cy+ly-er*.4,.8,.8,C.w);A.glow(lx,cy+ly,er+2+ch*5,C.r,.8+ch)}
  for(const s of [-1,1])A.P([[s*(er+.6),cy-.4],[s*(er+3.4),cy-2.4+ch*-.6],[s*(er+2.4),cy+.2]],C.g,.9)}
 /* 좌우 초승달 날개 */for(const s of [-1,1]){const x=s*(R+3),y=cy+1;A.P([[x-s*.6,y-6],[x+s*2.6,y-2],[x+s*3,y+2],[x+s*.6,y+6],[x+s*1.4,y+1],[x+s*.8,y-3]],C.d);A.L(x+s*1.4,y-4,x+s*2.4,y+2,C.g2,.35,.8)}
 if(A.open>0||A.expose)A.glow(0,cy,R,C.w,A.expose?1:A.open*.6);
 if(wE>0)for(let i=0;i<2;i++)A.ring(0,cy,R+4+i*3+((t*6)%3),.35,C.g,wE*.5);
 m4Speck(A,-16,-38,16,-4,14,2,C.w,1)};

/* ── 3. 혜성 뱀: 얼음 수정 해골 머리, 똬리를 튼 몸, 빛나는 얼음 꼬리 ── */
MON.reg.c_s4_comet=A=>{const t=A.t,b=A.bob*1.1,C={i:'#2a4a6a',i2:'#4a8ab8',i3:'#bff4ff',k:M4K,c:'#8ae8ff',w:'#ffffff',d:'#0e1c2c'};
 const wT=A.win('cometTail'),wD=Math.max(A.win(['cometDash','frostOrbit','tailWhip','serpentDive']),m4A(A,'bite')),ch=Math.max(wT,wD,A.eyeC),rear=wT*2.4;
 /* 몸통: 뒤쪽 똬리 → 꼬리 (분절) */const seg=[];for(let i=0;i<22;i++){const k=i/21,a=k*TAU*1.05+t*.6,rx=8-k*2,x=Math.cos(a)*rx-k*5,y=-10+Math.sin(a)*3.6+b-k*2+(k>.8?(k-.8)*20:0);seg.push([x,y,2.6-k*1.6])}
 for(let i=seg.length-1;i>=0;i--){const [x,y,r]=seg[i];A.C(x,y,r+.4,C.d);A.C(x,y,r,i%2?C.i:C.i2);A.spike(x,y-r*.8,-Math.PI/2-.3,r*.9,r*.6,C.i3);if(i%3===0)A.R(x-.2,y-.2,.5,.5,C.c)}
 /* 꼬리 끝: 얼음 혜성 꼬리 (빛 알갱이) */{const [tx,ty]=seg[seg.length-1];A.P([[tx,ty-1],[tx-7-wT*3,ty-4+Math.sin(t*2)],[tx-6,ty+1],[tx,ty+1]],C.c,.35);for(let i=0;i<8;i++){const q=(t*1.8+i/8)%1;A.spark(tx-q*(9+wT*5),ty-q*3+Math.sin(i*3+t*3)*1.2,.8*(1-q),i%2?C.c:C.w,(1-q)*(.6+wT*.4))}A.glow(tx,ty,4+wT*5,C.c,.7+wT)}
 /* 치켜든 목 */const hx=4+A.look[0]*.8,hy=-24+b-rear;for(let i=0;i<6;i++){const k=i/5,x=2+(hx-2)*k+Math.sin(k*3+t)*.5,y=-12+b+(hy+4-(-12+b))*k;A.C(x,y,2.6-k*.4,C.d);A.C(x,y,2.2-k*.4,C.i2);A.spike(x-1.2,y,Math.PI+.2,2,1,C.i3)}
 /* 해골 머리: 수정 볏 + 벌어지는 턱 */{const jaw=ch*.8+Math.max(0,Math.sin(t*.9))*.2;for(let i=0;i<5;i++)A.spike(hx-2+i*.9,hy-2.4,-Math.PI/2-.9+i*.12,3.2+i*.5+wT*1.5,1.1,i%2?C.i3:C.c,C.w);
  A.plate([[hx-3.4,hy+1.6],[hx-3,hy-2.4],[hx,hy-3.4],[hx+5.4,hy-1.4],[hx+6.4,hy+.6],[hx+2,hy+1.8]],C.i,C.k,C.i3);A.R(hx-2,hy-.4,7,.6,C.k);
  A.P([[hx-2.6,hy+1.8],[hx+5.6,hy+1+jaw*2.6],[hx+5,hy+2.2+jaw*3],[hx-2,hy+3]],C.i,.95);for(let i=0;i<4;i++){A.spike(hx+i*1.4,hy+1.2,Math.PI/2,1.2,.6,C.w);A.spike(hx+i*1.3+.4,hy+1.8+jaw*(1.8+i*.3),-Math.PI/2,.9+jaw*.4,.5,C.w)}
  if(jaw>.3){A.C(hx+3,hy+1.4+jaw,.8+jaw,C.c,.8);A.glow(hx+3,hy+1.4+jaw,3+jaw*4,C.c,jaw)}
  A.C(hx+.6,hy-1,1.2,C.k);A.slit(hx+.9+A.look[0]*.2,hy-1,1.6,.9,ch>0?C.w:C.c,-.2);A.brow(hx+.8,hy-2,2.4,-1,C.i3)}
 if(A.open>0||A.expose){A.C(seg[2][0],seg[2][1],1.2,C.w);A.glow(seg[2][0],seg[2][1],5,C.c,A.expose?1:A.open)}
 if(wD>0)A.beam([[hx+4,hy],[hx+20,hy-4],[hx+20,hy+4]],C.c,wD*.18);A.rise(5,-12,12,-3,14,.3,C.c,.35,5)};

/* ── 4. 성운 고래: 몸 속에 별바다가 흐르는 거대한 고래, 수염 입, 작은 차가운 눈 ── */
MON.reg.c_s4_nebula=A=>{const t=A.t,b=A.bob*1.4,C={k:M4K,d:'#120e2e',v:'#3a2a7a',v2:'#6a5ac8',p:'#b08aff',w:'#f4eeff',pk:'#ff8ad8',bl:'#6ad8ff'};
 const wN=A.win('nebulaTide'),wB=Math.max(A.win(['whaleSong','starPlankton','breach','whaleSwim']),m4A(A,'sing')),ch=Math.max(wN,wB,A.eyeC),cy=-17+b,sw=Math.sin(t*.8);
 /* 꼬리 지느러미 (뒤 위로) */{const tx=-13,ty=cy-3+sw*1.4;A.P([[-9,cy-2],[-9,cy+3],[tx-1,ty+.4],[tx-1.6,ty-.6]],C.v);A.P([[tx-1,ty],[tx-6,ty-6+sw],[tx-4,ty-1],[tx-6.4,ty+3.4-sw],[tx-1.6,ty+.4]],C.v2);A.L(tx-1.4,ty,tx-5.4,ty-5+sw,C.p,.35,.7)}
 /* 몸통 */A.plate([[-10,cy-3],[-5,cy-7.6],[4,cy-8.4],[11,cy-6],[14,cy-1],[13,cy+4],[6,cy+6.4],[-4,cy+5.4],[-10,cy+3]],C.v,C.k,C.v2);
 /* 몸 속 성운: 별 무늬가 흐름 */{const q=t*.6;for(let i=0;i<5;i++){const x=-6+i*3.8,y=cy-3.6+Math.sin(q+i)*1.2;A.E(x,y,2.8,1.5,i%2?C.pk:C.bl,.18+wN*.2)}m4Speck(A,-9,cy-7,12,cy+2,22,4,C.w,1);for(const [x,y] of [[-4,cy-4],[3,cy-5.4],[8,cy-2]])m4Star(A,x,y,.9+wN*.4,C.w,.9)}
 /* 배 주름 */A.P([[-6,cy+3.4],[12,cy+1.6],[11,cy+4],[5,cy+5.8],[-4,cy+4.8]],'#8a7ad8');for(let i=0;i<6;i++)A.L(-4+i*2.8,cy+4.4-i*.3,-2+i*2.8,cy+5.6-i*.3,C.v,.3);
 /* 입: 수염판 + 벌어지는 턱 */{const jaw=ch*1.8;A.P([[5,cy+2.4],[14,cy-.4],[13.4,cy+1.6+jaw],[6,cy+3.4+jaw*.5]],C.k);for(let i=0;i<6;i++)A.R(6.4+i*1.2,cy+1.8-i*.3,.4,1+jaw*.6,'#d8c8ff',.7);if(jaw>.4){A.glow(10,cy+1.6,3+jaw*2,C.p,jaw*.6)}}
 /* 등 가시 · 가슴 지느러미 */for(let i=0;i<5;i++)A.spike(-5+i*3.2,cy-7.4+Math.abs(i-2)*.2-.8,-Math.PI/2-.35,1.8,1,C.v2,C.p);A.P([[0,cy+4],[3,cy+5],[-1+sw,cy+10],[-3+sw,cy+9]],C.v2);
 /* 작고 차가운 눈 */{const ex=8.2,ey=cy-2;A.C(ex,ey,1.5,C.k);A.brow(ex,ey-1.2,3,1,C.v);A.slit(ex+A.look[0]*.3,ey+.2,1.8,.9,ch>0?C.w:C.p,.1)}
 if(A.open>0||A.expose){A.C(1,cy,1.4,C.w);A.glow(1,cy,6,C.p,A.expose?1:A.open)}
 if(wN>0)for(let i=0;i<3;i++){const r=6+i*4+((t*5)%4);A.ring(1,cy,r,.35,C.p,wN*.4)}
 A.rise(8,-14,14,cy+8,18,.25,C.p,.4,7);A.glow(1,cy,14,C.v,.35+wN*.4)};

/* ── 5. 쌍둥이 성좌: 등을 맞댄 두 가면 — 흰 가면(웃음) · 검은 가면(울음), 하나의 망토 ── */
MON.reg.c_s4_gemini=A=>{const t=A.t,b=A.bob,C={k:M4K,cl:'#2a1a36',cl2:'#4a2e5a',p:'#ff9ad5',c:'#8ae8ff',w:'#f8f0ff',m:'#1a1020'};
 const wM=A.win('mirrorTwin'),wX=Math.max(A.win(['twinOrbit','swapStep','gemBeam','twinChase']),m4A(A,'split')),ch=Math.max(wM,wX,A.eyeC),sp=wM*3.2,cy=-17+b;
 /* 둘을 잇는 별 사슬 */{const n=7;for(let i=0;i<=n;i++){const k=i/n,x=-4-sp+(8+sp*2)*k,y=cy-6+Math.sin(k*Math.PI)*-2;m4Star(A,x,y,.5+(i%2)*.3,i%2?C.p:C.c,.9)}A.glow(0,cy-7,3+wM*3,C.w,.5+wM)}
 for(const s of [-1,1]){const col=s<0?C.w:C.m,ac=s<0?C.p:C.c,x0=s*(4+sp),tilt=s*.1;
  /* 망토 */A.P([[x0-s*.4,cy-5],[x0+s*5,cy-2],[x0+s*6.4,cy+9],[x0+s*3,cy+14+Math.sin(t+s)*.6],[x0,cy+11],[x0-s*1.6,cy+13]],C.cl);A.P([[x0,cy-4],[x0+s*4.2,cy-1.6],[x0+s*5,cy+8],[x0+s*2.4,cy+12],[x0-s*.6,cy+9]],C.cl2);for(let i=0;i<4;i++)A.L(x0+s*(1+i),cy,x0+s*(1.4+i*1.1),cy+10,C.cl,.3);
  /* 어깨 별 장식 */A.spike(x0+s*4.8,cy-2.2,-Math.PI/2+s*.9,2.8,1.2,C.cl2,ac);m4Star(A,x0+s*3.6,cy+2.6,1.1,ac,.9);
  /* 가면 머리: 뒤로 뻗는 뿔 */{const hx=x0+s*1.4,hy=cy-9.2;A.push(1.45,hx,hy+3);for(let i=0;i<3;i++)A.spike(hx+s*1.6,hy-2+i*.8,-Math.PI/2+s*(1+i*.35),3.4-i*.6,1,C.cl2,ac);
   A.E(hx,hy,3,3.6,C.k);A.E(hx,hy,2.6,3.2,col);if(s<0){A.E(hx+.2,hy-1,2.4,1.8,'#fff',.25)}
   /* 눈구멍: 비스듬히 찢어진 분노의 눈 */const eo=A.dm||A.blink;for(const e of [-1,1]){const ex=hx+e*1.15,ey=hy-.7;A.P([[ex-e*1.1,ey-.9],[ex+e*.9,ey+.1],[ex+e*.7,ey+.7],[ex-e*1,ey+.1]],C.k);if(!eo){A.P([[ex-e*.7,ey-.4],[ex+e*.6,ey+.2],[ex+e*.4,ey+.5],[ex-e*.6,ey+.1]],ch>0?'#ffffff':ac);A.glow(ex,ey,2.2+ch*2.4,ac,.9)}}
   if(s<0){/* 귀까지 찢어진 웃음 + 이빨 */A.P([[hx-2.2,hy+.6],[hx+2.2,hy+.6],[hx+1.6,hy+2],[hx,hy+2.6],[hx-1.6,hy+2]],C.k);for(let i=-3;i<=3;i++)A.R(hx+i*.55-.12,hy+.8,.25,.9+(Math.abs(i)<2?.4:0),'#f8f0ff')}else{/* 일그러진 울음 입 + 흘러내린 빛눈물 */A.P([[hx-1.8,hy+2.4],[hx-1,hy+1.2],[hx+1,hy+1.2],[hx+1.8,hy+2.4],[hx,hy+1.9]],C.k);for(const e of [-1,1])A.L(hx+e*1.3,hy,hx+e*1.5,hy+3.2,C.c,.3,.85)}A.L(hx+1.4*(-s),hy-3,hx+.3*(-s),hy-1.2,s<0?'#c8b8d8':'#3a2a4a',.25);A.pop()}}
 if(A.open>0||A.expose){A.C(0,cy+2,1.2,C.w);A.glow(0,cy+2,5,C.p,A.expose?1:A.open)}
 if(wM>0){A.L(0,cy-12,0,cy+12,C.w,.3,wM*.8);A.glow(0,cy,6,C.w,wM*.6)}
 A.rise(6,-12,12,cy+12,16,.3,C.p,.35,11)};

/* ── 6. 블랙홀 방랑자: 누더기 두건 속 얼굴 대신 블랙홀, 기울어진 강착원반, 빨려드는 빛 ── */
MON.reg.c_s4_void=A=>{const t=A.t,b=A.bob*.8,C={k:M4K,r:'#1a1024',r2:'#2e1c40',r3:'#5a3a7a',v:'#b86aff',o:'#ff9a4a',w:'#fff0e0'};
 const wG=A.win('gravityWell'),wP=Math.max(A.win(['eventHorizon','spaghettify','darkMatter','wanderHoles']),m4A(A,'pull')),ch=Math.max(wG,wP,A.eyeC),cy=-16+b,spin=t*(1+wG*4);
 /* 너덜너덜한 로브 (아래로 찢어짐) */A.P([[-7,cy-6],[7,cy-6],[9.4,cy+8],[7,cy+14],[5,cy+11],[3,cy+15],[0,cy+12],[-3,cy+15.4],[-5,cy+11],[-7.4,cy+14],[-9.4,cy+8]],C.r);A.P([[-5.6,cy-5],[5.6,cy-5],[7.4,cy+8],[0,cy+10],[-7.4,cy+8]],C.r2);for(let i=0;i<5;i++)A.L(-4+i*2,cy-3,-5.4+i*2.7,cy+11,C.r,.35);
 /* 로브 가장자리가 안쪽으로 빨려듦 */for(let i=0;i<8;i++){const a=i*TAU/8+spin*.3,rr=10+Math.sin(t*2+i)*1;A.P([[Math.cos(a)*rr,cy+Math.sin(a)*rr*.6],[Math.cos(a+.25)*(rr-3),cy+Math.sin(a+.25)*(rr-3)*.6],[Math.cos(a-.1)*(rr-2),cy+Math.sin(a-.1)*(rr-2)*.6]],C.r3,.6)}
 /* 두건 */{const hy=cy-8;A.P([[-6.6,hy+5],[6.6,hy+5],[5.6,hy-2],[2,hy-6.4],[-1,hy-7],[-4,hy-4.6],[-5.8,hy-1]],C.r2);A.P([[-6.6,hy+5],[-5.8,hy-1],[-4,hy-4.6],[-1,hy-7],[-2.4,hy-1]],C.r3,.55);A.E(0,hy+.6,4.2,4.4,'#000');
  /* 강착원반 (기울어진 고리) + 사건의 지평선 */const rx=5.6+wG*1.4,ry=1.6;for(let i=0;i<28;i++){const a=spin+i*TAU/28,X=Math.cos(a)*rx,Y=hy+.6+Math.sin(a)*ry-Math.cos(a)*.6,back=Math.sin(a)<0;if(back)A.R(X-.35,Y-.35,.7,.7,i%3?C.o:C.v,.7)}A.C(0,hy+.6,2.6+ch*.4,'#000');A.ring(0,hy+.6,2.9+ch*.4,.4,C.o,.9);A.ring(0,hy+.6,3.3+ch*.4,.25,C.v,.7);for(let i=0;i<28;i++){const a=spin+i*TAU/28,X=Math.cos(a)*rx,Y=hy+.6+Math.sin(a)*ry-Math.cos(a)*.6;if(Math.sin(a)>=0)A.R(X-.4,Y-.4,.8,.8,i%3?C.o:C.w,.95)}
  A.glow(0,hy+.6,5+ch*4,C.o,.7+ch*.5);A.glow(0,hy+.6,9+wG*6,C.v,.5+wG*.6);if(!A.dm&&!A.blink){A.R(-1.6+A.look[0]*.4,hy-.2,.5,.4,C.w,.9);A.R(1.1+A.look[0]*.4,hy-.2,.5,.4,C.w,.9)}}
 /* 가슴의 사슬 · 빨려 들어가는 별 */A.L(-4,cy-2,4,cy-2,C.r3,.4);A.C(0,cy+1,1,A.expose?'#ffffff':'#000');A.ring(0,cy+1,1.3,.3,C.v,.9);if(A.open>0||A.expose)A.glow(0,cy+1,5,C.v,A.expose?1:A.open);
 for(let i=0;i<10;i++){const q=(t*(.5+wG)+i/10)%1,a=i*2.4+q*3,rr=(1-q)*(14+wG*4);A.spark(Math.cos(a)*rr,cy-7+Math.sin(a)*rr*.7,.7,i%2?C.w:C.v,q*(.6+wG*.4))}};

/* ── 7. 초신성 기사: 금이 간 흑철 갑옷 속에서 별이 터지려는 기사, 십자 투구, 불꽃 깃털 ── */
MON.reg.c_s4_nova=A=>{const t=A.t,b=A.bob*.4,C={k:M4K,a:'#2a1a12',a2:'#4a2e1c',a3:'#8a5a30',y:'#ffd166',o:'#ff7a1a',w:'#fffbe8'};
 const wN=A.win('novaBurst'),wS=A.win(['flarePlunge']),ch=Math.max(wN,wS,A.eyeC),sh=A.shake(wN>.5?.3:0),crack=.5+wN*.5+A.pul*.3;
 /* 다리: 두꺼운 판금 */for(const s of [-1,1]){const x=s*2.8+sh;A.plate([[x-2,-9+b],[x+2,-9+b],[x+2.2,-3],[x+s*.4+2.6,0],[x+s*.4-2.6,0],[x-2.2,-3]],C.a,C.k,C.a3);A.R(x-2,-5,4,.6,C.a3);A.L(x,-8,x+s*.4,-4,C.o,.3,crack)}
 /* 허리 천 (불꽃 테) */A.P([[-5+sh,-10+b],[5+sh,-10+b],[6+sh,-6+b],[-6+sh,-6+b]],'#3a0c08');for(let i=0;i<6;i++)A.P([[-5+i*2+sh,-6+b],[-4+i*2+sh,-6+b],[-4.5+i*2+sh,-4.4+b+Math.sin(t*6+i)*.4]],C.o,.8);
 /* 흉갑: 금 간 틈으로 별빛 */{const x0=sh,top=-23+b;A.plate([[x0-6,-10+b],[x0+6,-10+b],[x0+7.4,top+4],[x0+3.4,top],[x0-3.4,top],[x0-7.4,top+4]],C.a2,C.k,C.a3);
  const cx=x0,cy=-16+b;for(let i=0;i<9;i++){const a=i*TAU/9+.3,L=2.6+(i%3)*1.2+wN*2.4;let px=cx,py=cy;for(let j=0;j<3;j++){const nx2=px+Math.cos(a+(j%2?.3:-.3))*L/3,ny2=py+Math.sin(a+(j%2?.3:-.3))*L/3;A.L(px,py,nx2,ny2,j?C.o:C.y,.4,crack);px=nx2;py=ny2}}
  A.C(cx,cy,1.8+wN*.8,C.y);A.C(cx,cy,1.1+wN*.5,A.expose?'#ffffff':C.w);A.glow(cx,cy,5+wN*9+(A.open||0)*3,C.y,.9+wN+(A.expose?1:0));
  /* 견갑: 태양 가시 */for(const s of [-1,1]){A.plate([[x0+s*5,top+1],[x0+s*10,top+1.6],[x0+s*10.4,top+5.4],[x0+s*6,top+6]],C.a2,C.k,C.a3);for(let i=0;i<3;i++)A.spike(x0+s*(6.6+i*1.4),top+1.2,-Math.PI/2+s*(.3+i*.25),2.2+i*.4,1,C.a3,C.y);A.C(x0+s*8,top+3.6,.6,C.o)}}
 /* 투구: 십자 슬릿, 뒤로 타오르는 깃털 */{const hx=sh,hy=-26+b;for(let i=0;i<7;i++){const q=(t*3+i*.3)%1,h=5+Math.sin(i*1.7)*1.4+wN*3;A.P([[hx-1.6+i*.5,hy-3],[hx-.6+i*.5,hy-3],[hx-2.4+i*.3-q,hy-3-h]],i%2?C.o:C.y,.85)}
  A.plate([[hx-3.4,hy+3],[hx+3.4,hy+3],[hx+3.6,hy-2],[hx+2,hy-3.8],[hx-2,hy-3.8],[hx-3.6,hy-2]],C.a2,C.k,C.a3);A.R(hx-2.8,hy-.6,5.6,1,C.k);A.R(hx-.5,hy-2.6,1,5,C.k);
  if(!A.dm){A.R(hx-2.4,hy-.4,4.8,.6,ch>0?C.w:C.y);A.R(hx-.3,hy-2.2,.6,4.2,ch>0?C.w:C.y);A.glow(hx+A.look[0]*.4,hy,3+ch*3,C.y,.9)}}
 /* 대검: 꽂은 채 · 참격(치켜들었다 내리침) · 강타(들어 올려 땅에 꽂음) · 방패(세움) */{const SL=m4Act(A,'slash'),PL=m4Act(A,'plunge'),GD=m4Act(A,'guard');let up=Math.max(wS,GD.w,GD.s),gx=sh-9.6,gy=-8+b-up*6,ang=Math.PI/2-up*.9-GD.w*1.6,trail=0,tr0=0;
 if(SL.ph==='w'){ang=Math.PI/2-SL.w*2.8;gy=-12+b-SL.w*4;gx=sh-8}
 if(SL.ph==='s'){const k=Math.min(1,SL.p/.28);tr0=Math.PI/2-2.8;ang=tr0+(2.8+.5)*k;gy=-12+b-4*(1-k);gx=sh-8;trail=SL.p<.7?1-SL.p/.7:0}
 if(PL.ph==='w'){ang=-Math.PI/2;gy=-10+b-PL.w*8;gx=sh-6}
 if(PL.ph==='s'){const k=Math.min(1,PL.p/.18);ang=-Math.PI/2+Math.PI*k;gy=-18+b+k*9;gx=sh-6;if(k>=1){A.glow(gx,-1,10*PL.s+2,C.y,PL.s);A.ring(gx,-1,3+PL.p*10,.4,C.o,PL.s)}}
 if(trail>0){for(let i=0;i<6;i++){const a1=tr0+(ang-tr0)*i/6,a2=tr0+(ang-tr0)*(i+1)/6;A.beam([[gx,gy],[gx+Math.cos(a1)*14,gy+Math.sin(a1)*14],[gx+Math.cos(a2)*14,gy+Math.sin(a2)*14]],C.y,trail*.35)}}
 const ca=Math.cos(ang),sa=Math.sin(ang);A.L(gx,gy,gx+ca*11,gy+sa*11,'#1a1210',1.8);A.L(gx,gy,gx+ca*11,gy+sa*11,'#e8d8c0',.9);A.L(gx+ca*2,gy+sa*2,gx+ca*10,gy+sa*10,C.y,.3,.6+up*.4);A.L(gx-sa*2,gy+ca*2,gx+sa*2,gy-ca*2,C.a3,.8);A.C(gx-ca*1.6,gy-sa*1.6,.8,C.o);if(up>0)A.glow(gx+ca*6,gy+sa*6,4+up*4,C.y,up)}
 if(wN>0)for(let i=0;i<12;i++){const a=i*TAU/12+t*.4;A.beam([[sh,-16],[sh+Math.cos(a-.05)*(10+wN*14),-16+Math.sin(a-.05)*(10+wN*14)],[sh+Math.cos(a+.05)*(10+wN*14),-16+Math.sin(a+.05)*(10+wN*14)]],C.y,wN*.12)}
 A.rise(7,-10,10,-4,20,.45,C.o,.4,13)};

/* ── 8. 달의 여왕: 거대한 초승달 왕관, 도자기 얼굴(한쪽 눈만 뜬), 은빛 머리칼, 안개로 흩어지는 드레스 ── */
MON.reg.c_s4_luna=A=>{const t=A.t,b=A.bob*1.1,C={k:M4K,s:'#8a9ab8',s2:'#c8d4ea',s3:'#eef4ff',n:'#1a2030',n2:'#2e3a54',f:'#e8ecf4',b:'#8ab8ff'};
 const wP=A.win('moonPhase'),wW=Math.max(A.win(['crescentBlade','tideLock','silverRain']),m4A(A,'cast')),ch=Math.max(wP,wW,A.eyeC),cy=-18+b;
 /* 공전하는 달의 위상 (준비 시 일렬로) */for(let i=0;i<6;i++){const a0=i*TAU/6+t*.35,a=a0*(1-wP)+(Math.PI+i*.0)*wP,rr=13,X=wP>0?(-10+i*4)*wP+Math.cos(a0)*rr*(1-wP):Math.cos(a)*rr,Y=cy-4+(wP>0?(-12)*wP+Math.sin(a0)*rr*.45*(1-wP):Math.sin(a)*rr*.45),ph=i/5;
  A.C(X,Y,1.3,C.s3);A.C(X+(ph*2-1)*1.4,Y,1.25,C.n,.9);A.glow(X,Y,2,C.b,.4+wP*.5)}
 /* 드레스: 안개로 흩어지는 자락 */for(let i=-6;i<=6;i++){const x=i*1.3,L=11+Math.sin(i*1.3)*1.6+Math.sin(t+i)*.6;A.P([[x-1,cy+2],[x+1,cy+2],[x*1.35+Math.sin(t*.8+i)*.6,cy+2+L]],i%2?C.n2:C.n,.95)}
 A.plate([[-4.4,cy-3],[4.4,cy-3],[6.4,cy+4],[0,cy+5.4],[-6.4,cy+4]],C.n2,C.k,C.s);A.P([[-1.6,cy-3],[1.6,cy-3],[0,cy+2]],C.s2);m4Star(A,0,cy,1,C.b,1);A.glow(0,cy,3,C.b,.7+(A.open||0));if(A.expose)A.glow(0,cy,6,'#ffffff',1);
 /* 거대 초승달 왕관 */{const hy=cy-14.6,R=6.2;m4Cres(A,0,hy,R+.6,R-.2,0,-3.4,C.k);m4Cres(A,0,hy,R,R-.6,0,-3,C.s3);m4Cres(A,0,hy+.4,R-.9,R-.9,0,-2.2,C.s2,.8);for(let i=0;i<5;i++){const a=Math.PI*.15+i*Math.PI*.175;A.spike(Math.cos(a)*R*.95,hy+Math.sin(a)*R*.9-.4,a,1.4,.7,C.s2)}
  for(const s of [-1,1])A.spike(s*R*.95,hy-.4,-Math.PI/2-s*.4,4.4,1.6,C.s3,C.b);A.glow(0,hy,R+4+wP*4,C.s2,.35+wP*.5);m4Star(A,0,hy-5.4,1,C.b,1)}
 /* 은빛 머리칼 (길게 흘러내림) */for(const s of [-1,1])for(let i=0;i<4;i++){const x=s*(2.6+i*.9),L=10+i*1.5;A.P([[x-.6*s,cy-11],[x+.8*s,cy-11],[x+s*(1+i*.6)+Math.sin(t*.9+i)*.5,cy-11+L]],i%2?C.s2:C.s,.95)}
 /* 도자기 얼굴 */{const hx=0,hy=cy-8.6;A.E(hx,hy,3.2,3.8,C.k);A.E(hx,hy,2.8,3.4,C.f);A.E(hx-1,hy-1.4,1.4,1,'#ffffff',.4);A.L(hx+1.6,hy-3,hx+.6,hy-.4,'#8a92a8',.25);A.L(hx+.6,hy-.4,hx+1.4,hy+1.4,'#8a92a8',.25);
  /* 감은 눈 하나 · 뜬 눈 하나 */A.L(hx-1.9,hy-.4,hx-.5,hy-.1,C.n,.35);if(A.dm||A.blink)A.L(hx+.5,hy-.1,hx+1.9,hy-.4,C.n,.35);else{A.E(hx+1.2,hy-.3,.9,.7,C.n);A.C(hx+1.2+A.look[0]*.25,hy-.3,.4,ch>0?'#ffffff':C.b);A.glow(hx+1.2,hy-.3,2+ch*3,C.b,.9)}
  if(wP>.3){A.L(hx-1.9,hy-.4,hx-.5,hy-.1,C.f,.35);A.E(hx-1.2,hy-.3,.9,.7,C.n);A.C(hx-1.2,hy-.3,.4,'#ffffff');A.glow(hx-1.2,hy-.3,3,C.b,wP)}A.R(hx-.6,hy+2,1.2,.3,'#6a7088');A.L(hx+.8,hy+.6,hx+.8,hy+2.2,'#8ab8ff',.2,.6)}
 if(wW>0)for(const s of [-1,1])A.L(s*6,cy,s*16,cy+14,C.s3,.2,wW*.7);
 m4Speck(A,-16,-40,16,-6,12,8,C.s3,1);A.rise(6,-10,10,cy+14,14,.25,C.b,.35,9)};

/* ── 9. 별자리 직조자: 여러 눈의 가면 + 가느다란 바늘 다리들, 별과 별 사이에 빛실을 잇는 거미형 ── */
MON.reg.c_s4_weaver=A=>{const t=A.t,b=A.bob*.9,C={k:M4K,a:'#2a2418',a2:'#4a3e24',a3:'#8a7a4a',g:'#ffe9a8',w:'#fffbe8',v:'#b89aff'};
 const wC=A.win('constellationNet'),wX=Math.max(A.win(['needleVolley','loomGrid','starStitch','starMaze']),m4A(A,'stitch')),ch=Math.max(wC,wX,A.eyeC),cy=-19+b;
 /* 뒤편 베틀 틀 */{A.R(-13,cy-12,1,22,C.a2);A.R(12,cy-12,1,22,C.a2);A.R(-13,cy-12.4,26,1,C.a2);for(let i=0;i<9;i++){A.L(-11.6+i*2.9,cy-11.4,-11.6+i*2.9,cy+9,C.a3,.15,.5)}for(const s of [-1,1])A.spike(s*12.5,cy-12.4,-Math.PI/2,2.6,1,C.a3,C.g)}
 /* 별 매듭들 · 빛실 (준비 시 점등) */{const pts=[[-10,cy-8],[-6,cy-10],[-8,cy-3],[-11,cy+3],[9,cy-9],[6,cy-4],[10,cy+1],[8,cy+6],[-5,cy+7],[0,cy-12]],lk=[[0,1],[1,9],[0,2],[2,3],[4,5],[5,6],[6,7],[9,4],[3,8],[8,7]];
  for(let i=0;i<lk.length;i++){const [a,c2]=lk[i],on=wC>0?Math.min(1,wC*lk.length-i):.35;A.L(pts[a][0],pts[a][1],pts[c2][0],pts[c2][1],C.g,.2,on*.9)}for(const [x,y] of pts){m4Star(A,x,y,.9+wC*.5,C.w,.95);A.glow(x,y,1.6+wC*2,C.g,.5+wC*.5)}}
 /* 바늘 다리 여섯 개 */for(const s of [-1,1])for(let i=0;i<3;i++){const a=(s<0?Math.PI:0)+s*(-.7+i*.55)+Math.sin(t*1.4+i+s)*.08+(wX>0?s*.2:0),kx=s*3+Math.cos(a)*6,ky=cy+Math.sin(a)*4-3,ex=kx+s*3+Math.cos(a)*2,ey=ky+7+i;A.L(s*2.4,cy,kx,ky,C.a,1);A.L(s*2.4,cy,kx,ky,C.a3,.35);A.C(kx,ky,.6,C.g);A.L(kx,ky,ex,ey,C.a2,.6);A.spike(ex,ey,Math.PI/2+s*.2,1.6,.5,C.w)}
 /* 몸: 실타래 복부 */A.E(0,cy+4.6,3.8,4.4,C.a);A.E(0,cy+4.6,3.2,3.8,C.a2);for(let i=0;i<4;i++)A.L(-3+i*.3,cy+2+i*1.2,3-i*.3,cy+3+i*1.2,C.g,.25,.6);A.spike(0,cy+8.4,Math.PI/2,2.4,1,C.a3,C.g);A.L(0,cy+10.8,0,cy+18,C.g,.2,.8);
 /* 가면 머리: 여섯 개의 눈 */{const hy=cy-2;A.plate([[-4.4,hy+2.4],[4.4,hy+2.4],[5,hy-1.6],[2.4,hy-4.6],[-2.4,hy-4.6],[-5,hy-1.6]],C.a2,C.k,C.a3);A.P([[-1,hy-4.6],[1,hy-4.6],[0,hy-7.4]],C.a3);m4Star(A,0,hy-7.8,.9,C.g,1);
  for(const [ex,ey,r] of [[-2.6,hy-1.6,.7],[2.6,hy-1.6,.7],[-1.1,hy-.4,.9],[1.1,hy-.4,.9],[-1.8,hy+1,.5],[1.8,hy+1,.5]]){A.C(ex,ey,r+.3,C.k);if(!A.dm&&!A.blink){A.C(ex+A.look[0]*.15,ey,r*.6,ch>0?C.w:C.g);A.glow(ex,ey,r*2.4+ch*1.4,C.g,.7)}}
  for(let i=-2;i<=2;i++)A.spike(i*.8,hy+2.2,Math.PI/2,1+Math.abs(i)*.2,.4,C.a3)}
 if(A.open>0||A.expose)A.glow(0,cy+4.6,5,C.g,A.expose?1:A.open);A.rise(5,-10,10,cy+10,14,.2,C.v,.35,12)};

/* ── 10. 마지막 별: 하얗게 타는 거대 항성 얼굴, 겹겹의 후광, 별 왕관, 어둠의 망토 ── */
MON.reg.c_s4_last=A=>{const t=A.t,b=A.bob*.9,C={k:M4K,d:'#0c0a18',d2:'#1c1830',w:'#ffffff',y:'#fff4c8',g:'#ffd98a',c:'#8ae8ff',p:'#ff9ad5',v:'#b08aff'};
 const wL=A.win('lastStar'),wM=A.any*(A.pn&&A.pn!=='lastStar'?1:0),ch=Math.max(wL,wM*.7,A.eyeC),sh=A.shake(wL>.6?.3:0),cy=-21+b,R=6.2+wL*.8;
 /* 뒤편 어둠의 망토 날개 */for(const s of [-1,1]){A.P([[s*4+sh,cy+2],[s*16+sh,cy-8+Math.sin(t*.6)*.8],[s*17+sh,cy+2],[s*14+sh,cy+10],[s*9+sh,cy+14+Math.sin(t+s)*.6],[s*3+sh,cy+10]],C.d);for(let i=0;i<5;i++)A.L(s*5+sh,cy+4,s*(9+i*1.8)+sh,cy-4+i*3.4,C.d2,.4);m4Speck(A,s>0?4:-17,cy-6,s>0?17:-4,cy+12,10,s+3,C.v,1)}
 /* 겹겹의 후광 고리 */for(let i=0;i<3;i++){const rr=R+3+i*2.4+wL*i*1.4;A.ring(sh,cy,rr,.4,[C.g,C.c,C.p][i],.55-i*.1);for(let j=0;j<6+i*2;j++){const a=t*(i%2?-.3:.25)+j*TAU/(6+i*2);m4Star(A,sh+Math.cos(a)*rr,cy+Math.sin(a)*rr,.7,[C.y,C.c,C.p][i],.95)}}
 /* 광선 가시 */for(let i=0;i<16;i++){const a=i*TAU/16+t*.1,L=2.4+(i%2?0:2)+Math.sin(t*2+i)*.5+wL*3;A.spike(sh+Math.cos(a)*(R-.3),cy+Math.sin(a)*(R-.3),a,L,1.2,i%2?C.g:C.y,C.w)}
 /* 항성 얼굴 */A.C(sh,cy,R+.5,C.g);A.C(sh,cy,R,C.y);A.C(sh-1,cy-1.2,R*.7,C.w,.7);
 {const hx=sh,hy=cy;for(const s of [-1,1]){A.P([[hx+s*.6,hy-1.6],[hx+s*3.6,hy-2.4],[hx+s*3.2,hy-.8],[hx+s*.8,hy-.6]],'#c89a4a',.8);const ex=hx+s*2,ey=hy-.4;if(A.dm||A.blink)A.L(ex-1.2,ey,ex+1.2,ey,'#8a5a20',.35);else{A.E(ex,ey,1.3,.8,'#2a1a08');A.C(ex+A.look[0]*.3,ey,.45,ch>0?C.c:C.w);A.glow(ex,ey,2+ch*3,C.c,.8+ch)}}
  A.L(hx,hy+.4,hx,hy+1.8,'#d8b060',.3);A.R(hx-1.4,hy+2.8,2.8,.4+ch*1,'#8a5a20');if(ch>.2)A.glow(hx,hy+3,2+ch*2,C.w,ch)}
 /* 별 왕관 */for(let i=-3;i<=3;i++){const a=-Math.PI/2+i*.28,rr=R+1;A.spike(sh+Math.cos(a)*rr,cy+Math.sin(a)*rr,a,2.4+(i===0?2.4:Math.abs(i)%2?0:1),1,C.y,C.w)}m4Star(A,sh,cy-R-5.6,1.6,C.w,1);
 /* 아래 떠 있는 두 손 대신 흩어지는 빛의 몸 */for(let i=-4;i<=4;i++){const x=sh+i*1.4,L=8+Math.sin(i*1.9)*2+Math.sin(t*1.3+i)*.8;A.P([[x-.8,cy+R-.6],[x+.8,cy+R-.6],[x+Math.sin(t+i)*.8,cy+R+L]],i%2?C.g:C.y,.7)}
 if(A.open>0||A.expose)A.glow(sh,cy,R+2,C.w,A.expose?1:A.open);A.glow(sh,cy,R+6+wL*10,C.y,.9+wL);
 if(wL>0)for(let i=0;i<8;i++){const a=i*TAU/8+t*.2,L=14+wL*16;A.beam([[sh,cy],[sh+Math.cos(a-.04)*L,cy+Math.sin(a-.04)*L],[sh+Math.cos(a+.04)*L,cy+Math.sin(a+.04)*L]],C.y,wL*.14)}
 A.rise(10,-16,16,cy+16,24,.2,C.y,.4,14)};

/* ── 손: 필요한 보스만 ── */
MON.hand.c_s4_gemini=H=>{const pk=H.h&&H.h.side>0?'#8ae8ff':'#ff9ad5';H.chain('#2a1a36','#4a2e5a',1.6,2.4);H.C(0,0,3,'#04030a');H.C(0,0,2.4,'#2a1a36');for(let i=0;i<4;i++){const a=i*Math.PI/2+H.t;H.R(Math.cos(a)*2.6-.5,Math.sin(a)*2.6-.5,1,1,pk)}H.C(0,0,1,'#ffffff');H.glow(0,0,6,pk,.5)};
MON.hand.c_s4_void=H=>{H.chain('#1a1024','#5a3a7a',1.6,2.6);H.C(0,0,3.2,'#04030a');H.C(0,0,2.6,'#000');H.C(0,0,2.9,'#b86aff',.25);for(let i=0;i<4;i++){const a=-Math.PI/2+(i-1.5)*.5;H.R(Math.cos(a)*3.4-.4,Math.sin(a)*3.4-.4,.8,1.6,'#2e1c40')}H.C(0,0,.8,'#ff9a4a');H.glow(0,0,6,'#b86aff',.5)};
MON.hand.c_s4_nova=H=>{H.chain('#2a1a12','#8a5a30',2.2,2.4);H.R(-3,-2.6,6,5.2,'#04030a');H.R(-2.6,-2.2,5.2,4.4,'#4a2e1c');for(let i=0;i<4;i++)H.R(-2.4+i*1.3,-3.4,1,1.4,'#8a5a30');H.R(-.4,-1.2,.8,2.4,'#ffd166');H.glow(0,0,6,'#ff7a1a',.5)};
MON.hand.c_s4_weaver=H=>{H.chain('#2a2418','#8a7a4a',1,2.2);H.C(0,0,2.2,'#04030a');H.C(0,0,1.6,'#4a3e24');H.R(-.3,-5,.6,4,'#fffbe8');H.R(-.2,1,.4,4,'#ffe9a8');H.C(0,0,.6,'#ffe9a8');H.glow(0,0,4,'#ffe9a8',.5)};
MON.hand.c_s4_last=H=>{H.C(0,0,3.4,'#ffd98a',.5);H.C(0,0,2.6,'#fff4c8');H.C(0,0,1.4,'#ffffff');for(let i=0;i<8;i++){const a=i*Math.PI/4+H.t*.5;H.R(Math.cos(a)*3.6-.4,Math.sin(a)*3.6-.4,.8,.8,'#fff4c8')}H.glow(0,0,8,'#fff4c8',.6)};
MON.hand.c_s4_meteor=H=>{H.C(0,0,2.6,'#04030a');H.C(0,0,2,'#4a3a48');H.C(0,0,.8,'#ff7a2a');H.glow(0,0,5,'#ff7a2a',.5)};
for(const k of ['c_s4_meteor','c_s4_eclipse','c_s4_comet','c_s4_nebula','c_s4_luna'])MON.noArm[k]=1;
for(const [k,col] of [['c_s4_eclipse','#ffd98a'],['c_s4_comet','#8ae8ff'],['c_s4_nebula','#b08aff'],['c_s4_luna','#d8e8ff']])MON.hand[k]=H=>{H.C(0,0,2.4,'#04030a');H.C(0,0,1.8,col);H.C(0,0,.8,'#ffffff');H.glow(0,0,5,col,.5)};
/* 크기 · 기운 · 배율 */{const X4={c_s4_meteor:[[-12,-38,14,0],'#ff7a2a',1.18],c_s4_eclipse:[[-16,-36,16,0],'#ffd98a',1.15],c_s4_comet:[[-16,-34,14,0],'#8ae8ff',1.2],c_s4_nebula:[[-18,-30,16,0],'#b08aff',1.22],c_s4_gemini:[[-14,-32,14,0],'#ff9ad5',1.18],c_s4_void:[[-12,-32,12,0],'#b86aff',1.2],c_s4_nova:[[-12,-34,12,0],'#ffd166',1.2],c_s4_luna:[[-14,-40,14,0],'#d8e8ff',1.15],c_s4_weaver:[[-14,-36,14,0],'#ffe9a8',1.15],c_s4_last:[[-18,-38,18,0],'#fff4c8',1.3]};
 for(const k of Object.keys(X4)){const base=MON.reg[k];MON.reg[k]=A=>{A.bbox=X4[k][0];A.aura=X4[k][1];base(A);const q=m4Act(A,null),cy=(A.bbox[1]+A.bbox[3])/2;if(q.ph==='w')A.glow(0,cy,10+q.w*8,X4[k][1],q.w*.35);else if(q.ph==='s')A.glow(0,cy,14+q.p*16,X4[k][1],q.s*.7)};MON.scl[k]=X4[k][2]}}

