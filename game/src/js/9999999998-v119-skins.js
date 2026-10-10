/* ================= v119 상점 개편 · 프리미엄 전용 스킨 (PREM119 · SK119) =================
   ① 프리미엄 캐릭터(공허 검사 · 태엽 성기사 · 네온 비트)마다 전용 스킨 하나(₩4,900 또는 💎).
      - 그림: 원래 프리미엄 그림(CH2DEF[100~102]) 앞뒤에 날개 · 후광 · 왕관 · 떠도는 조각을 더한 새 그림(CH2DEF[190~192]).
      - 휘두르기: 원래 스킨보다 화려한 전용 모션(두 번 내려찍기 · 째깍 멈췄다 내려치기 · 두 바퀴 돌려 베기)과 이펙트.
      - 검 쥐는 자세: 984의 window.__idlePose로 가만히 · 걸을 때 검을 쥐는 모습 + 몇 초마다 검을 손에서 한 바퀴 돌림.
      - 켬/끔은 saveData.prem119[스킨 번호], 산 것(skin_vx_<id>)만, 그 프리미엄 캐릭터를 장착했을 때만 보인다.
   ② 태엽 공방: 캐릭터 · 펫을 고르면 정보 칸 아래에 「이 캐릭터의 스킨」 줄(변이 스킨 · 펫 스킨 · 전용 스킨).
      값은 원래대로(₩ 또는 💎), 원래 캐릭터 · 펫을 안 가졌으면 🔒. 현질 상점(99991)의 상품 · 보유 · 장착을 그대로 쓴다(BBShopAPI).
   ③ 로비: 「상점」을 누르면 「🪙 일반 상점(태엽 공방) / 💎 현질 상점」 고르기 창(#shopPick119, SHOPPICK119.open). */
(()=>{try{
 if(typeof CH2DEF==='undefined'||!window.SKIN58||typeof ch2Render!=='function')return;
 const HV=window.__HV||{view:'front'},view=()=>HV.view||'front';
 const h01=n=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x)};
 function beat(){try{if(typeof mus!=='undefined'&&mus&&mus.ms&&mus.T0){const q=(performance.now()-mus.T0)/mus.ms;return q-Math.floor(q)}}catch(e){}const q=performance.now()/500;return q-Math.floor(q)}
 const pulse=()=>Math.pow(1-beat(),2.2);
 const RAW=(c,x,y,w,h,col,a)=>{c.globalAlpha=a;c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)))};
 const tipOf=(H,q)=>{const [px,py,pa]=H.handQ(q),[tx,ty]=H.toW(px,py),a=H.wAng(pa+.25);return {x:tx,y:ty,a,tx:tx+Math.cos(a)*H.L,ty:ty+Math.sin(a)*H.L}};
 const ez=x=>x<0?0:x>1?1:x*x*(3-2*x);
 const RB=['#ff3ad6','#b05cff','#29f0ff','#5affb0','#ffe14d','#ff9a3a'];

 /* ================= 그림 (40×48, 몸은 x 5~23 · y 2~33) ================= */
 const orbit=(Q,b,t,front,n,r,col,col2)=>{for(let i=0;i<n;i++){const a=t*1.3+i*Math.PI*2/n,s=Math.sin(a);if((s>0)!==front)continue;const x=14+Math.cos(a)*r,y=17+b+s*3.5-Math.sin(t*2+i)*1.2;Q.P([[x,y-2],[x+1.2,y],[x,y+2],[x-1.2,y]],col,.95);Q.px(x,y-1,col2)}};
 /* 공허 군주: 찢긴 공허 날개 · 떠 있는 조각 왕관 · 몸을 도는 공허 조각 · 발밑 어둠 */
 function voidBehind(Q,b,t,v){const fl=Math.sin(t*2.2)*.6;
  Q.E(14,32.5,11,2.2,'#1a0b33',.55);Q.E(14,32.5,7,1.4,'#5affd8',.18+.12*Math.sin(t*3));
  if(v!=='side')for(const sd of [-1,1]){const rx=14+sd*6,ry=12+b;for(let i=0;i<4;i++){const len=9+i*1.6,ang=-.75+i*.42+fl*.08*sd,ex=rx+sd*Math.cos(ang)*len,ey=ry+Math.sin(ang)*len*.9;
    Q.P([[rx,ry],[ex,ey-1.2],[ex+sd*1.6,ey+.6],[rx+sd*1,ry+2.4]],i%2?'#1b1236':'#261a4a',.95);Q.L(rx+sd*1,ry,ex,ey-1,i%2?'#b07aff':'#5affd8',.55)}}
  else{const rx=12,ry=12+b;for(let i=0;i<4;i++){const len=9+i*1.6,ang=-.75+i*.42+fl*.08,ex=rx-Math.cos(ang)*len,ey=ry+Math.sin(ang)*len*.9;Q.P([[rx,ry],[ex,ey-1.2],[ex-1.6,ey+.6],[rx-1,ry+2.4]],'#261a4a',.95);Q.L(rx-1,ry,ex,ey-1,'#b07aff',.5)}}
  orbit(Q,b,t,false,3,12,'#2a1a55','#5affd8');
  for(let i=0;i<5;i++){const q=(t*.45+i/5)%1;Q.R(6+h01(i)*16,31-q*26,1,2,i%2?'#b07aff':'#5affd8',(1-q)*.7)}}
 function voidFront(Q,b,t,v){const y=-3.2+b+Math.sin(t*2)*.6,cx=v==='side'?15:14,gl=.6+.4*Math.sin(t*3);
  for(let i=-2;i<=2;i++){const x=cx+i*2.3,h=i===0?4.6:Math.abs(i)===1?3.4:2.4;Q.P([[x-1,y+1.4],[x,y-h],[x+1,y+1.4]],'#2a1f4a');Q.px(x,y-h+.6,'#5affd8',gl)}
  Q.R(cx-5.5,y+1,11,1,'#5affd8',.35+.3*gl);
  orbit(Q,b,t,true,3,12,'#3b2a70','#5affd8');
  if(v!=='back')Q.C(14,22.5+b,1.3,'#5affd8',.35*gl)}
 /* 시간의 대성기사: 큰 황금 시계 후광(바늘이 돎) · 하얀 깃털 날개 · 머리 위 금빛 고리 · 떠오르는 금가루 */
 function clockBehind(Q,b,t,v){const cx=v==='side'?13:14,cy=11+b,R=12.5;
  Q.E(14,32.5,10,2,'#5a3a10',.45);
  if(v!=='side')for(const sd of [-1,1]){for(let i=0;i<5;i++){const ang=-.95+i*.38+Math.sin(t*1.8)*.06*sd,len=8+i*1.3,rx=14+sd*5,ry=13+b,ex=rx+sd*Math.cos(ang)*len,ey=ry+Math.sin(ang)*len;
    Q.P([[rx,ry],[ex,ey-1],[ex+sd*1.2,ey+1],[rx,ry+2.6]],i%2?'#fff6dc':'#f0e0b0',.95);Q.L(rx,ry+1,ex,ey,'#ffcf5a',.5)}}
  for(let i=0;i<48;i++){const a=i/48*Math.PI*2;Q.px(cx+Math.cos(a)*R,cy+Math.sin(a)*R,'#ffcf5a',.85)}
  const rot=t*.5;for(let i=0;i<16;i++){const a=rot+i/16*Math.PI*2;Q.R(cx+Math.cos(a)*(R+1.4)-1,cy+Math.sin(a)*(R+1.4)-1,2,2,'#c89a40')}
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2;Q.R(cx+Math.cos(a)*(R-2)-.5,cy+Math.sin(a)*(R-2)-.5,i%3?1:2,i%3?1:2,'#fff0b0',.9)}
  const hA=t*.9,mA=t*3.6;Q.L(cx,cy,cx+Math.cos(hA)*7,cy+Math.sin(hA)*7,'#fff8d8',.8);Q.L(cx,cy,cx+Math.cos(mA)*10,cy+Math.sin(mA)*10,'#ffcf5a',.8)}
 function clockFront(Q,b,t,v){const cx=v==='side'?15:14,y=-2.5+b+Math.sin(t*1.6)*.5;
  for(let i=0;i<24;i++){const a=i/24*Math.PI*2;Q.px(cx+Math.cos(a)*5.2,y+Math.sin(a)*1.4,i%6===Math.floor(t*6)%6?'#ffffff':'#ffd84a',.95)}
  for(let i=0;i<6;i++){const q=(t*.35+i/6)%1;Q.px(5+h01(i+3)*18,32-q*30,i%2?'#ffe9a8':'#ffffff',(1-q)*.85)}}
 /* 하이퍼 비트: 양옆 스피커 이퀄라이저 날개 · 무지개 왕관 고리 · 박자 바닥 고리 · 빛 띠 */
 function neonBehind(Q,b,t,v){const p=pulse();
  Q.E(14,32.5,10+p*2,2+p*.5,'#ff3ad6',.28+.3*p);Q.E(14,32.5,6,1.2,'#29f0ff',.35);
  const sides=v==='side'?[-1]:[-1,1];for(const sd of sides)for(let i=0;i<6;i++){const x=14+sd*(8+i*2.1),hh=3+Math.abs(Math.sin(t*5+i*1.3))*5+p*4-i*.5;Q.R(x-.5,20+b-hh,1.6,hh,RB[(i+Math.floor(t*4))%6],.85);Q.R(x-.5,20+b-hh-1.4,1.6,.8,'#ffffff',.6)}
  for(let i=0;i<24;i++){const a=t*1.6+i/24*Math.PI*2,s=Math.sin(a);if(s>0)continue;Q.px(14+Math.cos(a)*13,18+b+s*4,RB[i%6],.8)}}
 function neonFront(Q,b,t,v){const p=pulse(),cx=v==='side'?15:14,y=-3+b-p*.8;
  for(let i=0;i<20;i++){const a=t*2+i/20*Math.PI*2;Q.px(cx+Math.cos(a)*5.6,y+Math.sin(a)*1.5,RB[i%6],.95)}
  for(let i=0;i<5;i++)Q.R(cx-4+i*2,y-1.6-Math.abs(Math.sin(t*6+i))*2.4-p*1.5,1,1.6,RB[(i*2)%6],.9);
  for(let i=0;i<24;i++){const a=t*1.6+i/24*Math.PI*2,s=Math.sin(a);if(s<=0)continue;Q.px(14+Math.cos(a)*13,18+b+s*4,RB[i%6],.9)}}

 /* ================= 휘두르기 (984 __skinMotion 형식) ================= */
 const B=id=>(SKIN58.byId(id)||{}).motion||{};
 const MO={
  /* 공허 군주: 높이 들어 내려찍고 → 튕겨 올려 → 한 번 더 내려찍기. 두 번 다 공허 고리 + 검은 번개 */
  void:{arm:(k,e)=>k<.2?1.35+(-2.95-1.35)*e(k/.2):k<.34?-2.95+4.2*e((k-.2)/.14):k<.46?1.25-2.6*e((k-.34)/.12):k<.6?-1.35+3*e((k-.46)/.14):1.65-.3*e((k-.6)/.4),
   hand:(k,side)=>[side?17:19.5,k<.2?5.5:7.6],
   lean:(k,e)=>k<.2?-.18*e(k/.2):k<.34?-.18+.46*e((k-.2)/.14):k<.46?.28-.3*e((k-.34)/.12):k<.6?-.02+.32*e((k-.46)/.14):.3*(1-e((k-.6)/.4)),
   fx(c,k,H){c.save();c.lineCap='round';
    if((k>.2&&k<.4)||(k>.46&&k<.66))for(let j=1;j<=7;j++){const T=tipOf(H,Math.max(0,k-j*.018));c.globalAlpha=(1-j/8)*.5;c.strokeStyle=j%2?'#5affd8':'#b07aff';c.lineWidth=Math.max(1,H.s*(1.3-j*.13));c.beginPath();c.moveTo(T.x+Math.cos(T.a)*H.L*.2,T.y+Math.sin(T.a)*H.L*.2);c.lineTo(T.tx,T.ty);c.stroke()}
    for(const [k0,col] of [[.34,'#b07aff'],[.6,'#5affd8']])if(k>k0&&k<k0+.32){const q=(k-k0)/.32,T=tipOf(H,k0),r=H.L*(.25+q*1.15);
     c.globalAlpha=.6*(1-q);c.fillStyle='#07040f';c.beginPath();c.ellipse(T.tx,T.ty,r*.7,r*.22,0,0,Math.PI*2);c.fill();
     c.globalAlpha=.85*(1-q);c.strokeStyle=col;c.lineWidth=Math.max(1,H.s*(1-q)+.6);c.beginPath();c.ellipse(T.tx,T.ty,r,r*.36,0,0,Math.PI*2);c.stroke();
     c.strokeStyle='#ecdfff';c.lineWidth=Math.max(1,H.s*.45);for(let i=0;i<5;i++){const a=i*Math.PI*2/5+k0*9;let x=T.tx,y=T.ty;c.beginPath();c.moveTo(x,y);for(let s=1;s<=4;s++){const d=r*s/4;x=T.tx+Math.cos(a)*d+(h01(i*7+s+Math.floor(k*40))-.5)*H.L*.2;y=T.ty+Math.sin(a)*d*.5+(h01(i*3+s)-.5)*H.L*.14;c.lineTo(x,y)}c.stroke()}
     for(let i=0;i<10;i++){const a=i*Math.PI*2/10+q*3,d=r*(1.5-q);RAW(c,T.tx+Math.cos(a)*d-1,T.ty+Math.sin(a)*d*.45-1,2,2,i%2?'#b07aff':'#5affd8',.8*(1-q))}}
    c.restore();c.globalAlpha=1}},
  /* 시간의 대성기사: 들어 올려 째깍째깍 네 번 멈췄다가 → 묵직하게 내려침 → 시계추처럼 한 번 흔듦. 칼끝에 큰 시계판 · 빛기둥 · 쏟아지는 톱니 */
  clock:{arm:(k,e)=>k<.3?1.35+(-1.9-1.35)*e(k/.3):k<.44?-1.9+Math.floor((k-.3)/.035)*.06:k<.54?-1.66+2.86*e((k-.44)/.1):k<.7?1.2:k<.86?1.2-.5*Math.sin((k-.7)/.16*Math.PI):1.2+.15*e((k-.86)/.14),
   hand:(k,side)=>[side?13:19.5,7.2],
   lean:(k,e)=>k<.3?-.14*e(k/.3):k<.44?-.14:k<.54?-.14+.48*e((k-.44)/.1):.34*(1-e((k-.54)/.46)),
   fx(c,k,H){c.save();
    if(k>.28&&k<.46){const T=tipOf(H,k),q=(k-.28)/.18,r=H.L*.35*q;c.globalAlpha=.7;c.strokeStyle='#ffcf5a';c.lineWidth=Math.max(1,H.s*.5);c.beginPath();c.arc(T.x,T.y,r,0,Math.PI*2);c.stroke();const a=-Math.PI/2+Math.floor((k-.3)/.035)*Math.PI/6;c.beginPath();c.moveTo(T.x,T.y);c.lineTo(T.x+Math.cos(a)*r*.9,T.y+Math.sin(a)*r*.9);c.stroke()}
    if(k>.44&&k<.6)for(let j=1;j<=7;j++){const T=tipOf(H,Math.max(.44,k-j*.012));for(let d=H.L*.25;d<=H.L;d+=1.6)RAW(c,T.x+Math.cos(T.a)*d-1.2,T.y+Math.sin(T.a)*d-1.2,2.6,2.6,j===1?'#ffffff':'#ffcf5a',.24*(8-j)/7)}
    if(k>.52){const T=tipOf(H,.54),q=Math.min(1,(k-.52)/.48),r=H.L*(.35+q*.8),rot=q*5;
     c.globalAlpha=.5*(1-q);c.fillStyle='#fff3c0';c.fillRect(T.tx-H.L*.12*(1-q),T.ty-H.L*2.2,H.L*.24*(1-q),H.L*2.2);
     c.globalAlpha=.9*(1-q);c.strokeStyle='#ffcf5a';c.lineWidth=Math.max(1.5,H.s*.8);c.beginPath();c.arc(T.tx,T.ty,r,0,Math.PI*2);c.stroke();c.strokeStyle='#fff0b0';c.lineWidth=Math.max(1,H.s*.4);c.beginPath();c.arc(T.tx,T.ty,r*.78,0,Math.PI*2);c.stroke();
     for(let i=0;i<12;i++){const a=i*Math.PI/6;RAW(c,T.tx+Math.cos(a)*r*.88-1,T.ty+Math.sin(a)*r*.88-1,i%3?2:3,i%3?2:3,'#fff8d8',.9*(1-q))}
     c.strokeStyle='#ffffff';c.lineWidth=Math.max(1,H.s*.5);c.beginPath();c.moveTo(T.tx,T.ty);c.lineTo(T.tx+Math.cos(rot*2)*r*.7,T.ty+Math.sin(rot*2)*r*.7);c.moveTo(T.tx,T.ty);c.lineTo(T.tx+Math.cos(rot*.5)*r*.45,T.ty+Math.sin(rot*.5)*r*.45);c.stroke();
     for(let i=0;i<9;i++){const a=i*Math.PI*2/9+.4,d=r*(.5+q);const x=T.tx+Math.cos(a)*d,y=T.ty+Math.sin(a)*d*.6+q*q*H.L*.9;RAW(c,x-1.5,y-1.5,3,3,'#c89a40',1-q);RAW(c,x-.5,y-.5,1,1,'#fff0b0',1-q)}}
    c.restore();c.globalAlpha=1}},
  /* 하이퍼 비트: 두 바퀴 돌려 베기 → 무지개 원 두 겹 + 사방으로 뻗는 레이저 + 이퀄라이저 고리 */
  neon:{arm:(k,e)=>k<.1?1.35+.85*e(k/.1):k<.7?2.2-Math.PI*4*e((k-.1)/.6):k<.82?2.2-Math.PI*4:2.2-Math.PI*4+(1.35-2.2)*e((k-.82)/.18),
   hand:(k,side)=>[side?13:19,7.6],
   lean:(k,e)=>k<.1?-.06:k<.7?Math.sin((k-.1)/.6*Math.PI*4)*.16:.05*(1-e((k-.7)/.3)),
   fx(c,k,H){c.save();
    if(k>.1&&k<.76){const n=18;for(let j=0;j<n;j++){const q=Math.max(.1,k-j*.016),T=tipOf(H,q);RAW(c,T.tx-1.5,T.ty-1.5,3,3,RB[j%6],.8*(1-j/n));RAW(c,(T.x+T.tx)/2-1,(T.y+T.ty)/2-1,2,2,RB[(j+3)%6],.45*(1-j/n))}}
    if(k>.66){const T=tipOf(H,.1),q=Math.min(1,(k-.66)/.34),cx=T.x,cy=T.y,r=H.L*(.7+q*1.1);
     c.globalCompositeOperation='lighter';c.globalAlpha=.55*(1-q);c.lineWidth=Math.max(1,H.s*.7);for(let i=0;i<8;i++){const a=i*Math.PI/4+q*1.5;c.strokeStyle=RB[i%6];c.beginPath();c.moveTo(cx+Math.cos(a)*H.L*.3,cy+Math.sin(a)*H.L*.3);c.lineTo(cx+Math.cos(a)*r*1.5,cy+Math.sin(a)*r*1.5);c.stroke()}
     c.globalCompositeOperation='source-over';c.globalAlpha=.85*(1-q);for(let i=0;i<2;i++){c.strokeStyle=RB[(i*3+Math.floor(q*10))%6];c.lineWidth=Math.max(1.5,H.s*.7);c.beginPath();c.arc(cx,cy,r*(1-i*.25),0,Math.PI*2);c.stroke()}
     for(let i=0;i<16;i++){const a=i*Math.PI/8,hh=(2+Math.abs(Math.sin(i*1.7+q*9))*5)*H.s*.5;RAW(c,cx+Math.cos(a)*r*1.08-1,cy+Math.sin(a)*r*1.08-hh/2,2,hh,RB[i%6],.85*(1-q))}
     for(let i=0;i<6;i++){const a=i*Math.PI/3-Math.PI/2,d=r*(.9+q*.6),x=cx+Math.cos(a)*d,y=cy+Math.sin(a)*d-q*12,col=RB[i];RAW(c,x,y,1.6,6,col,1-q);RAW(c,x-3,y+5,4,3,col,1-q);RAW(c,x,y,4,1.6,col,1-q)}}
    c.restore();c.globalAlpha=1}}};

 /* ================= 검 쥐는 자세 (984 __idlePose) ================= */
 const hand0=(side,now)=>[(side?12.5:19.5)+Math.cos(1.25)*6.2,19.5+Math.sin(1.25)*6.2+Math.sin(now/700)*.25];
 const twirl=(now,walk,per,len)=>{if(walk)return 0;const q=(now%per)/per;return q<len?Math.PI*2*ez(q/len):0};
 const IDLE={
  /* 칼끝을 앞 아래로 낮게 겨눔 · 칼날에서 공허 안개가 떨어짐 · 5초마다 손에서 한 바퀴 */
  void(now,side,walk){const [x,y]=hand0(side,now);return {x,y,a:1.2+Math.sin(now/900)*.06+twirl(now,walk,5000,.14),
   post(c,ix,iy,A,L,s,now){const t=now/1000;c.save();for(let i=0;i<7;i++){const q=(t*.7+i/7)%1,d=L*(.25+.75*h01(i)),x=ix+Math.cos(A)*d,y=iy+Math.sin(A)*d+q*L*.5;RAW(c,x-1,y-1,2,2,i%2?'#b07aff':'#5affd8',(1-q)*.75)}
    const g=.5+.5*Math.sin(t*4);for(let d=L*.3;d<L;d+=L/6)RAW(c,ix+Math.cos(A)*d-.5,iy+Math.sin(A)*d-.5,1.4,1.4,'#5affd8',.55*g);c.restore()}}},
  /* 칼을 세워 가슴 앞에 듦(기사의 경례) · 손잡이에 도는 황금 톱니 · 박자마다 칼끝에 반짝 · 6초마다 한 바퀴 */
  clock(now,side,walk){const [x,y]=hand0(side,now),p=pulse();return {x:x-1,y:y-1.5,a:-1.42+p*.04+twirl(now,walk,6000,.12),
   pre(c,ix,iy,A,L,s,now){const t=now/1000,r=L*.28;c.save();c.globalAlpha=.85;c.strokeStyle='#ffcf5a';c.lineWidth=Math.max(1,s*.5);c.beginPath();c.arc(ix,iy,r,0,Math.PI*2);c.stroke();for(let i=0;i<8;i++){const a=t*1.5+i*Math.PI/4;RAW(c,ix+Math.cos(a)*(r+1.5)-1,iy+Math.sin(a)*(r+1.5)-1,2,2,'#c89a40',.9)}c.restore()},
   post(c,ix,iy,A,L,s,now){const p=pulse(),q=(now/1400)%1,d=L*(.2+q*.8);c.save();RAW(c,ix+Math.cos(A)*d-1.5,iy+Math.sin(A)*d-1.5,3,3,'#ffffff',.8*Math.sin(q*Math.PI));
    if(p>.2){const tx=ix+Math.cos(A)*L,ty=iy+Math.sin(A)*L;c.globalAlpha=p*.8;c.strokeStyle='#fff3c0';c.lineWidth=1;c.beginPath();c.moveTo(tx-L*.22*p,ty);c.lineTo(tx+L*.22*p,ty);c.moveTo(tx,ty-L*.22*p);c.lineTo(tx,ty+L*.22*p);c.stroke()}c.restore()}}},
  /* 칼을 앞으로 눕혀 들고 박자에 맞춰 까딱 · 칼날을 따라 무지개 빛 · 4초마다 한 바퀴 */
  neon(now,side,walk){const [x,y]=hand0(side,now),p=pulse();return {x,y,a:.18-p*.14+twirl(now,walk,4000,.16),
   post(c,ix,iy,A,L,s,now){const t=now/1000,p=pulse();c.save();c.globalCompositeOperation='lighter';for(let i=0;i<6;i++){const d=L*(.2+((t*.9+i/6)%1)*.8);RAW(c,ix+Math.cos(A)*d-1,iy+Math.sin(A)*d-1,2,2,RB[i],.7)}
    if(p>.15){const tx=ix+Math.cos(A)*L,ty=iy+Math.sin(A)*L;c.globalAlpha=p*.7;c.strokeStyle=RB[Math.floor(t*2)%6];c.lineWidth=1;c.beginPath();c.arc(tx,ty,L*.25*(1.4-p),0,Math.PI*2);c.stroke()}c.restore()}}}};

 /* ================= 목록 · 상태 ================= */
 const DEF=[
  {id:'vx_void',base:'void',name:'공허 군주',en:'VOID SOVEREIGN',col:'#b07aff',trail:'#78ffe0',behind:voidBehind,front:voidFront,
   tint(o,t){const g=o.createLinearGradient(0,0,0,48);g.addColorStop(0,'#05000c');g.addColorStop(.6,'#2a0a4a');g.addColorStop(1,'#00ffd0');o.globalAlpha=.42;o.fillStyle=g;o.fillRect(0,0,40,48);const y=((t*14)%60)-6;o.globalAlpha=.5;o.fillStyle='#5affd8';o.fillRect(0,y,40,1.5)},
   aura(Q,b,t,v){for(let i=0;i<9;i++){const x=3+i*2.8,h=7+Math.sin(t*6+i*1.7)*3;Q.P([[x-2,33],[x+2,33],[x+Math.sin(t*3+i)*1.5,33-h-14]],i%2?'#3a0a6a':'#5a1aa0',.4)}Q.E(14,12+b,15.5,15.5,'#7a2ad0',.12+.06*Math.sin(t*4))},
   desc:'공허 검사의 전용 스킨. 찢긴 공허 날개와 떠 있는 조각 왕관, 몸을 도는 공허 조각. 두 번 내려찍을 때마다 공허 고리와 검은 번개가 터져요.',tags:['두 번 내려찍기 모션','공허 고리 · 검은 번개','칼끝을 낮게 겨누는 자세','공허 날개 · 조각 왕관']},
  {id:'vx_clock',base:'clock',name:'시간의 대성기사',en:'CHRONO ARCHON',col:'#ffd84a',trail:'#ffe9a8',behind:clockBehind,front:clockFront,
   tint(o,t){o.globalAlpha=.22;o.fillStyle='#fff6c8';o.fillRect(0,0,40,48);const y=((t*18)%70)-10;o.globalAlpha=.7;o.fillStyle='#ffffff';o.save();o.translate(20,y);o.rotate(-.5);o.fillRect(-30,0,60,1.5);o.restore()},
   aura(Q,b,t,v){Q.E(14,14+b,16,18,'#ffd84a',.2+.08*Math.sin(t*3));for(let i=0;i<8;i++){const a=i/8*Math.PI*2+t*.4;Q.L(14,14+b,14+Math.cos(a)*17,14+b+Math.sin(a)*19,'#fff0b0',.35)}},
   desc:'태엽 성기사의 전용 스킨. 바늘이 도는 큰 황금 시계 후광과 하얀 깃털 날개. 째깍째깍 멈췄다가 내려치면 칼끝에 시계판과 빛기둥이 서요.',tags:['째깍 멈췄다 내려치기 모션','시계판 · 빛기둥 · 쏟아지는 톱니','칼을 세워 드는 기사 자세','시계 후광 · 깃털 날개']},
  {id:'vx_neon',base:'neon',name:'하이퍼 비트',en:'HYPER BEAT',col:'#ff3ad6',trail:'rainbow',behind:neonBehind,front:neonFront,
   tint(o,t){const sh=(t*30)%48;const g=o.createLinearGradient(0,sh-48,0,sh+48);['#ff3ad6','#29f0ff','#ffe14d','#ff3ad6','#29f0ff'].forEach((c,i)=>g.addColorStop(i/4,c));o.globalAlpha=.08+.1*pulse();o.fillStyle=g;o.fillRect(0,0,40,48)},
   aura(Q,b,t,v){const p=pulse();for(let i=0;i<40;i++){const a=i/40*Math.PI*2;Q.px(14+Math.cos(a)*(15+p*2),14+b+Math.sin(a)*(18+p*2),RB[(i+Math.floor(t*8))%6],.45+.4*p)}Q.E(14,14+b,15,18,'#ff3ad6',.06+.1*p)},
   desc:'네온 비트의 전용 스킨. 양옆에서 춤추는 이퀄라이저 날개와 무지개 왕관. 두 바퀴 돌려 베면 레이저가 사방으로 뻗어요.',tags:['두 바퀴 돌려 베기 모션','사방 레이저 · 이퀄라이저 고리','박자에 까딱이는 검','이퀄라이저 날개 · 무지개 왕관']}];
 const LIST=[];
 DEF.forEach((d,i)=>{const s=SKIN58.byId(d.base);if(!s)return;const idx=190+i,src=s.idx;
  CH2DEF[idx]={__v44:1,skin:d.base,__v119:1,paint(Q,f,b,bl,t){const v=view(),o=Q.o;const P=CH2DEF[src];P.paint.call(P,Q,f,b,bl,t);
   /* 몸 전체에 전용 색을 입히고(source-atop) → 앞 장식 → 뒤 장식 · 몸 둘레 빛은 destination-over로 몸 뒤에 */
   try{o.save();o.globalCompositeOperation='source-atop';d.tint(o,t);o.restore()}catch(e){o.restore()}
   try{d.front(Q,b,t,v)}catch(e){}
   try{o.save();o.globalCompositeOperation='destination-over';d.behind(Q,b,t,v);d.aura(Q,b,t,v);o.restore()}catch(e){o.restore()}}};
  const mo=Object.assign({},B(d.base),MO[d.base],{_v119:1});
  LIST.push(Object.assign({price:4900,tier:'전용',idx,motion:mo,idle:IDLE[d.base]},d))});
 const PAY=()=>window.PAY58;
 const st=()=>{try{return saveData.prem119||(saveData.prem119={})}catch(e){return {}}};
 const byId=id=>LIST.find(u=>u.id===id);
 const owned=u=>{try{const P=PAY();return !!(P&&P.ownsItem({pid:'skin_'+u.id})&&P.ownsKind('skin',u.base))}catch(e){return false}};
 /* 지금 보이는 전용 스킨: 그 프리미엄 스킨을 끼고 있고 · 샀고 · 켜 둔 것 */
 function cur(){const sk=SKIN58.get();if(!sk)return null;const u=LIST.find(x=>x.base===sk);return u&&st()[u.id]&&owned(u)?u:null}
 const PREM119=window.PREM119={list:LIST,byId,get:()=>{const u=cur();return u?u.id:null},
  equip(id){const S=st();const u=id&&byId(id);if(!u){const c=cur();if(c)delete S[c.id];else for(const k in S)delete S[k]}else{S[u.id]=1;if(SKIN58.get()!==u.base)try{SKIN58.equip(u.base)}catch(e){}}try{saveNow()}catch(e){}tick()},
  render(id,v,f,t){const u=byId(id);if(!u)return null;const ov=HV.view,osw=HV.sw;HV.view=v||'front';HV.sw=null;try{return ch2Render(u.idx,f||0,0,false,t!=null?t:performance.now()/1000)}finally{HV.view=ov;HV.sw=osw}},
  cur,owned};
 /* 내 캐릭터 그림을 전용 스킨 그림으로 (공방이 열려 있을 때 · 듀오 동료를 그릴 때는 원래대로) */
 {const base=ch2Render;ch2Render=function(idx,f,b,bl,t){try{if(idx<100&&!window.__mateDraw){const sm=document.getElementById('shopModal');if(!(sm&&!sm.hidden)&&idx===((shopInv().eq||{}).ch||0)){const u=cur();if(u)return base.call(this,u.idx,f,b,bl,t)}}}catch(e){}return base.apply(this,arguments)}}
 /* 휘두르기 · 검 쥐는 자세 · 궤적 색을 매 프레임 맞춤 */
 const MOS=LIST.map(u=>u.motion);
 function tick(){if(window.__mateDraw)return;const u=cur();
  if(u){if(window.__skinMotion!==u.motion)window.__skinMotion=u.motion;window.__idlePose=u.idle;window.__skinTrail=u.trail}
  else{if(MOS.includes(window.__skinMotion)){const s=SKIN58.byId(SKIN58.get());window.__skinMotion=s?s.motion:null;window.__skinTrail=s?s.trail:null}if(LIST.some(u=>u.idle===window.__idlePose))window.__idlePose=null}}
 {const f=frame;frame=function(){try{tick()}catch(e){}return f.apply(this,arguments)}}
 document.addEventListener('skin58',()=>{try{tick()}catch(e){}});

 /* ================= ② 태엽 공방: 고른 캐릭터 · 펫 아래 스킨 줄 ================= */
 const css=document.createElement('style');css.id='sk119css';css.textContent=`
 #sk119{margin-top:10px;padding:8px;border-radius:12px;background:#00000033;border:1px solid #ffffff1a}
 #sk119 h4{margin:0 0 6px;font-size:12px;font-weight:900;letter-spacing:.04em;color:#ffe3a0;display:flex;align-items:center;gap:6px}#sk119 h4 small{font-weight:700;color:#bfae8a;font-size:10.5px}
 #sk119 .r{display:grid;grid-template-columns:48px 1fr auto;gap:8px;align-items:center;padding:5px 6px;border-radius:10px;background:#ffffff08;margin-top:5px;border:1px solid transparent}
 #sk119 .r.on{border-color:#5affd8aa;background:#5affd812}#sk119 .r.lk{opacity:.7}
 #sk119 canvas{width:48px;height:48px;border-radius:8px;image-rendering:pixelated;background:#0a0f17}
 #sk119 .n{min-width:0}#sk119 .n b{display:block;font-size:12.5px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#sk119 .n em{font-style:normal;font-size:9.5px;font-weight:900;padding:1px 6px;border-radius:5px;color:#0a0f17;margin-right:4px}
 #sk119 .n small{font-size:10px;color:#bfae8a}
 #sk119 .bt{display:flex;flex-direction:column;gap:4px;align-items:stretch}
 #sk119 button{font:inherit;font-size:11px;font-weight:900;padding:6px 9px;border-radius:9px;border:1px solid #ffffff2a;background:#ffffff12;color:#fff;cursor:pointer;white-space:nowrap}
 #sk119 button.w{background:linear-gradient(180deg,#ffe58a,#f0a82a);color:#2a1606;border-color:#fff2b0}
 #sk119 button.d{background:linear-gradient(180deg,#8ad8ff,#4a7ad8);color:#06142a;border-color:#cfeeff}#sk119 button.d.ask{background:#ffd166;color:#2a1606}
 #sk119 button.e{background:#1d3a2c;color:#7dffb0;border-color:#7dffb088}#sk119 button.e.on{background:#5affd8;color:#06221a}
 #sk119 button.l{background:#3a2a10;color:#ffe3a0;border-color:#ffd16688}
 #sk119 .msg{min-height:14px;margin-top:5px;font-size:11px;color:#ffd166}
 html.ph #sk119 .r{grid-template-columns:40px 1fr auto}html.ph #sk119 canvas{width:40px;height:40px}`;
 document.head.appendChild(css);
 const TB={'변이':'linear-gradient(90deg,#c8ffe0,#6affc8)','전용':'linear-gradient(90deg,#fff2a8,#ff9af0,#8ad8ff)'};
 const API=()=>window.BBShopAPI;
 const safe=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const acc=()=>(window.ACCT55&&ACCT55.get())||{};
 const showWon=()=>!(window.BB_APP||window.BB_FREE)||(PAY()&&PAY().tester&&PAY().tester());
 let msgT='',msgC='',msgAt=0;
 /* 고른 캐릭터 · 펫의 스킨 상품 */
 function skinsFor(k,i){const A=API();if(!A)return [];const L=A.items();
  if(k==='pt')return L.filter(x=>x.kind==='pet'&&x.base===i);
  if(k==='ch'){const c=CHARS[i];if(c&&c.prem)return L.filter(x=>x.kind==='prem'&&x.base===c.prem);return L.filter(x=>x.kind==='elite'&&x.base===i).concat(L.filter(x=>x.kind==='skin'&&x.variant&&x.base===i))}return []}
 /* 원래 캐릭터 · 펫을 가졌나 (프리미엄은 그 프리미엄 스킨을 샀나) */
 function baseOwned(k,i){try{if(PAY()&&PAY().tester&&PAY().tester())return true;/* v123: 테스터는 잠금 없음 */const c=k==='ch'&&CHARS[i];if(c&&c.prem)return !!(PAY()&&PAY().ownsKind('skin',c.prem));return (shopInv().inv[k]||[]).includes(i)}catch(e){return false}}
 function rows(){const k=shopTab;if(k!=='ch'&&k!=='pt')return '';const i=wsSelOf(k),L=skinsFor(k,i),A=API();if(!L.length||!A)return '';
  const bo=baseOwned(k,i),D=window.DIA80,it0=WS_LIST(k)[i]||{},prem=k==='ch'&&it0.prem;
  let h='<div id="sk119"><h4>🎨 '+(k==='pt'?'이 펫의 스킨':prem?'♛ 전용 스킨':'이 캐릭터의 스킨')+'<small>'+(bo?(prem?'특별한 휘두르기 · 검 쥐는 자세':'사면 이 모습으로 바뀌어요 · 능력은 그대로'):'🔒 먼저 위에서 '+safe(it0.name||'')+'을(를) '+(prem?'사야':'사야')+' 해요')+'</small></h4>';
  for(const x of L){const own=A.owns(x),on=own&&A.isOn(x),lk=!bo;
   const btn=lk?'<button class="l" data-a="lock" data-id="'+x.id+'">🔒 잠김</button>':own?'<button class="e'+(on?' on':'')+'" data-a="eq" data-id="'+x.id+'">'+(on?'✓ 장착 중':'장착하기')+'</button>':
    (showWon()?'<button class="w" data-a="won" data-id="'+x.id+'">'+A.won(x.price)+'</button>':'')+(D?'<button class="d" data-a="dia" data-id="'+x.id+'">💎 '+D.price(x).toLocaleString()+'</button>':'');
   h+='<div class="r'+(on?' on':'')+(lk?' lk':'')+'"><canvas width="72" height="72" data-id="'+x.id+'" data-k="'+x.kind+'"></canvas><div class="n"><b>'+safe(x.name.split(' · ').pop())+'</b><em style="background:'+(TB[x.tier]||TB['변이'])+'">'+x.tier+'</em><small>'+(own?'✓ 보유':safe((x.tags||[])[0]||''))+'</small></div><div class="bt">'+btn+'</div></div>'}
  return h+'<div class="msg" style="color:'+(msgC||'')+'">'+(performance.now()-msgAt<9000?safe(msgT):'')+'</div></div>'}
 const say=(t,c)=>{msgT=t;msgC=c||'';msgAt=performance.now();document.querySelectorAll('#sk119 .msg,#psw121 .msg').forEach(m=>{m.textContent=t;m.style.color=c||''})};
 const swords=()=>{const A=API();return A?A.items().filter(x=>x.kind==='sword'):[]};
 function act(a,id,btn){const A=API(),k=shopTab,x=skinsFor(k,wsSelOf(k)).concat(swords()).find(y=>y.id===id);if(!A||!x)return;
  if(a==='lock'){try{gmSfx('no')}catch(_){}say(x.kind==='prem'?'먼저 위의 「사기」로 이 프리미엄 캐릭터를 가져야 해요.':'먼저 위에서 이 '+(k==='pt'?'펫':'캐릭터')+'을(를) 코인으로 사야 스킨을 살 수 있어요.','#ffd166');return}
  if(a==='eq'){const now=A.toggleSave(x);try{gmSfx('ok')}catch(_){}say(now?x.name.split(' · ').pop()+' 장착! 게임 화면에서 이 모습으로 보여요.':'원래 모습으로 돌아왔어요.',now?'#7dffb0':'');try{renderShop()}catch(e){wsRefresh()}return}
  if(a==='dia'){const D=window.DIA80,need=D.price(x);if(D.get()<need){try{gmSfx('no')}catch(_){}say('다이아가 '+(need-D.get()).toLocaleString()+'개 모자라요. 탑의 보스 층을 깨면 얻어요.','#ffb2a8');return}
   if(!btn.dataset.ok){btn.dataset.ok='1';btn.classList.add('ask');btn.textContent='💎 '+need.toLocaleString()+' 쓸까요?';try{gmSfx('move')}catch(_){}say('한 번 더 누르면 💎 '+need.toLocaleString()+'로 사요.');setTimeout(()=>{if(btn.isConnected&&btn.dataset.ok){delete btn.dataset.ok;btn.classList.remove('ask');btn.textContent='💎 '+need.toLocaleString()}},4000);return}
   const r=D.buy(x);if(!r.ok){say(r.err||'살 수 없어요.','#ffb2a8');return}try{if(!A.isOn(x))A.toggle(x);PAY()&&PAY().sync()}catch(e){}try{gmSfx('ok')}catch(_){}say('🎉 '+x.name.split(' · ').pop()+' — 💎로 샀어요! 바로 장착했어요.','#7dffb0');try{renderShop()}catch(e){wsRefresh()}return}
  if(a==='won'){const P=PAY();if(!P){say('결제 기능을 불러오지 못했어요.');return}
   if(!acc().token){try{gmSfx('no')}catch(_){}say('산 스킨은 계정에 보관돼요. 먼저 로그인해 주세요.','#ffd166');try{window.ACCT55&&ACCT55.open()}catch(e){}return}
   try{gmSfx('ok')}catch(_){}btn.disabled=true;btn.textContent='결제창 여는 중…';
   P.buy(x.pid,res=>{if(res.opened){say('새 창에서 결제를 마쳐 주세요. 끝나면 여기 저절로 들어와요.'+(res.test?' (테스트 결제)':''));return}
    if(res.ok){try{if(!A.isOn(x))A.toggle(x);P.sync()}catch(e){}try{gmSfx('ok')}catch(_){}say('🎉 '+x.name.split(' · ').pop()+' 구매 완료! 바로 장착했어요.','#7dffb0')}
    else if(res.need==='login')say('먼저 로그인해 주세요.','#ffb2a8');else if(res.fail)say('결제가 승인되지 않았어요. 돈은 빠져나가지 않았어요.','#ffb2a8');else if(res.cancel)say('결제를 마치지 않았어요.','#ffd166');else if(res.err)say(res.err,'#ffb2a8');
    try{const m=document.getElementById('shopModal');if(m&&!m.hidden)renderShop()}catch(e){}})}}
 {const f=wsRefresh;wsRefresh=function(){const r=f.apply(this,arguments);try{const inf=$('wsInfo');if(!inf)return r;const o=$('sk119');if(o)o.remove();const h=rows();if(h){inf.insertAdjacentHTML('beforeend',h);draw(performance.now(),true)}}catch(e){console.error('sk119',e)}return r}}
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#sk119 button[data-a],#psw121 button[data-a]');if(!b)return;e.stopPropagation();try{act(b.dataset.a,b.dataset.id,b)}catch(err){console.error('sk119',err)}},true);
 /* 작은 그림: 공방이 열려 있을 때만 0.12초마다 */
 function draw(now,force){const A=API();if(!A)return;const L=A.items();document.querySelectorAll('#sk119 canvas[data-id],#psw121 canvas[data-id]').forEach(cv=>{const x=L.find(y=>y.id===cv.dataset.id&&y.kind===cv.dataset.k);if(x)try{A.drawItem(cv.getContext('2d'),x,cv.width,cv.height,now,true)}catch(e){}})}
 setInterval(()=>{try{const m=document.getElementById('shopModal');if(m&&!m.hidden&&($('sk119')||$('psw121')))draw(performance.now())}catch(e){}},120);
 /* 공방 탭 이름 · 안내 */
 /* v121: 현질 무기 3종을 공방 「무기」 칸 맨 위에 (₩ 또는 💎, 산 무기는 여기서 장착) */
 function swBlock(){const o=$('psw121');if(o)o.remove();const g=$('shopGrid'),A=API();if(shopTab!=='wp'||!g||!A)return;const L=swords();if(!L.length)return;const D=window.DIA80;
  let h='<div id="psw121"><h4>💎 현질 무기 <small>₩ 또는 💎 · 장착하면 모양 · 궤적 · 이펙트 · 공격력이 이 검으로</small></h4><div class="g">';
  for(const x of L){const own=A.owns(x),on=own&&A.isOn(x);
   const btn=own?'<button class="e'+(on?' on':'')+'" data-a="eq" data-id="'+x.id+'">'+(on?'✓ 장착 중':'장착하기')+'</button>':(showWon()?'<button class="w" data-a="won" data-id="'+x.id+'">'+A.won(x.price)+'</button>':'')+(D?'<button class="d" data-a="dia" data-id="'+x.id+'">💎 '+D.price(x).toLocaleString()+'</button>':'');
   h+='<div class="c'+(on?' on':'')+'" style="--tc:'+x.col+'"><canvas width="72" height="72" data-id="'+x.id+'" data-k="sword"></canvas><b>'+safe(x.name)+'</b><em>'+x.tier+'</em><div class="bt">'+btn+'</div></div>'}
  g.insertAdjacentHTML('beforebegin',h+'</div><div class="msg" style="color:'+(msgC||'')+'">'+(performance.now()-msgAt<9000?safe(msgT):'')+'</div></div>');draw(performance.now(),true)}
 const swc=document.createElement('style');swc.textContent=`
 #psw121{margin:0 0 10px;padding:8px 10px;border-radius:14px;background:linear-gradient(90deg,#2a0a2a,#14183a);border:1px solid #ff9af066}
 #psw121 h4{margin:0 0 6px;font-size:13px;font-weight:900;background:linear-gradient(90deg,#fff2a8,#ff9af0,#8ad8ff);-webkit-background-clip:text;background-clip:text;color:transparent}#psw121 h4 small{font-size:10.5px;font-weight:700;color:#c8b0e0;-webkit-text-fill-color:#c8b0e0}
 #psw121 .g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
 #psw121 .c{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px;border-radius:12px;background:#ffffff0a;border:1px solid var(--tc)}#psw121 .c.on{background:#5affd814;border-color:#5affd8}
 #psw121 canvas{width:56px;height:56px;image-rendering:pixelated;border-radius:8px;background:#0a0f17}
 #psw121 b{font-size:12px;color:#fff;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}#psw121 em{font-style:normal;font-size:9.5px;font-weight:900;color:var(--tc)}
 #psw121 .bt{display:flex;gap:4px;flex-wrap:wrap;justify-content:center}
 #psw121 button{font:inherit;font-size:11px;font-weight:900;padding:5px 8px;border-radius:9px;border:1px solid #ffffff2a;background:#ffffff12;color:#fff;cursor:pointer;white-space:nowrap}
 #psw121 button.w{background:linear-gradient(180deg,#ffe58a,#f0a82a);color:#2a1606}#psw121 button.d{background:linear-gradient(180deg,#8ad8ff,#4a7ad8);color:#06142a}#psw121 button.d.ask{background:#ffd166;color:#2a1606}
 #psw121 button.e{background:#1d3a2c;color:#7dffb0}#psw121 button.e.on{background:#5affd8;color:#06221a}
 #psw121 .msg{min-height:12px;margin-top:4px;font-size:11px;color:#ffd166}
 html.ph #psw121 canvas{width:44px;height:44px}html.ph #psw121 b{font-size:10.5px}`;document.head.appendChild(swc);
 {const f=renderShop;renderShop=function(){const r=f.apply(this,arguments);try{swBlock()}catch(e){console.error('psw121',e)}try{const t=$('wsTitle');if(t&&t.textContent!=='🪙 일반 상점 · 태엽 공방')t.textContent='🪙 일반 상점 · 태엽 공방'}catch(e){}return r}}

 /* ================= ③ 로비 「상점」 → 일반 상점 · 현질 상점 고르기 창 ================= */
 try{const s=GM_ITEMS.find(x=>x.id==='shop');if(s){s.ic='🛒';s.t='상점';s.sub='🪙 일반 상점 · 💎 현질 상점'}}catch(e){}
 const pk=document.createElement('div');pk.id='shopPick119';pk.hidden=true;
 pk.innerHTML='<div class="sp"><button class="x">닫기</button><h3>🛒 어느 상점으로 갈까요?</h3><div class="cs">'+
  '<button class="cd coin" data-g="coin"><i>🪙</i><b>일반 상점</b><span>태엽 공방 · 코인으로</span><small>캐릭터 · 무기 · 펫<br>고른 것 아래에서 스킨도</small></button>'+
  '<button class="cd cash" data-g="cash"><i>💎</i><b>현질 상점</b><span>₩ 또는 💎 다이아</span><small>프리미엄 캐릭터 · 전용 스킨<br>펫 묶음 · 새 검 · 연출 · 세트</small></button></div></div>';
 document.body.appendChild(pk);
 const pc=document.createElement('style');pc.textContent=`
 #shopPick119{position:fixed;inset:0;z-index:9400;display:flex;align-items:center;justify-content:center;background:#000a;backdrop-filter:blur(3px)}#shopPick119[hidden]{display:none}
 #shopPick119 .sp{position:relative;width:min(560px,94vw);padding:20px 18px 18px;border-radius:20px;background:linear-gradient(180deg,#1a1430,#0b0f1c);border:1px solid #ffffff22;box-shadow:0 20px 60px #000c;color:#eef4ff;font-family:inherit;animation:sp119 .22s ease-out}
 @keyframes sp119{from{transform:scale(.94);opacity:0}to{transform:none;opacity:1}}
 #shopPick119 h3{margin:0 0 14px;font-size:19px;font-weight:900;text-align:center}
 #shopPick119 .x{position:absolute;right:12px;top:12px;font:inherit;font-weight:900;font-size:12px;padding:6px 10px;border-radius:9px;border:0;background:#2a3040;color:#fff;cursor:pointer}
 #shopPick119 .cs{display:grid;grid-template-columns:1fr 1fr;gap:12px}
 #shopPick119 .cd{display:flex;flex-direction:column;align-items:center;gap:5px;padding:18px 10px 16px;border-radius:16px;cursor:pointer;font:inherit;color:#fff;border:2px solid;transition:transform .12s,filter .12s}
 #shopPick119 .cd:hover{transform:translateY(-3px);filter:brightness(1.12)}#shopPick119 .cd:active{transform:translateY(1px)}
 #shopPick119 .cd i{font-style:normal;font-size:44px;line-height:1.1;filter:drop-shadow(0 0 12px #fff6)}
 #shopPick119 .cd b{font-size:20px;font-weight:900}#shopPick119 .cd span{font-size:12px;font-weight:800;opacity:.9}#shopPick119 .cd small{font-size:11.5px;line-height:1.5;opacity:.8;text-align:center}
 #shopPick119 .coin{background:linear-gradient(180deg,#4a3410,#2a1c08);border-color:#ffd166}#shopPick119 .coin b{color:#ffe08a}
 #shopPick119 .cash{background:linear-gradient(180deg,#3a1450,#14183a);border-color:#ff9af0;box-shadow:0 0 24px #ff9af044}
 #shopPick119 .cash b{background:linear-gradient(90deg,#fff2a8,#ff9af0,#8ad8ff);-webkit-background-clip:text;background-clip:text;color:transparent}
 html.ph #shopPick119 .cd{padding:12px 6px}html.ph #shopPick119 .cd i{font-size:34px}html.ph #shopPick119 .cd b{font-size:17px}`;document.head.appendChild(pc);
 const close=()=>{pk.hidden=true};
 function pick(){pk.hidden=false;try{gmSfx('ok')}catch(e){}}
 pk.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===pk)close()});
 pk.addEventListener('click',e=>{e.stopPropagation();if(e.target.closest('.x')){close();try{gmSfx('back')}catch(_){}return}const b=e.target.closest('[data-g]');if(!b)return;close();
  if(b.dataset.g==='coin'){try{openShop('ch')}catch(e){}}else{try{window.BBShopOpen&&BBShopOpen()}catch(e){}}});
 addEventListener('keydown',e=>{if(pk.hidden)return;if(e.code==='Escape'){close();e.preventDefault();e.stopPropagation()}else if(e.code==='Digit1'||e.code==='ArrowLeft'){pk.querySelector('.coin').click();e.preventDefault();e.stopPropagation()}else if(e.code==='Digit2'||e.code==='ArrowRight'){pk.querySelector('.cash').click();e.preventDefault();e.stopPropagation()}},true);
 {const f=gmMainGo;gmMainGo=function(){try{const it=GM_ITEMS[GM.sel];if(it&&it.id==='shop'){pick();return}}catch(e){}return f.apply(this,arguments)}}
 {const f=gmMainSel;gmMainSel=function(){const r=f.apply(this,arguments);try{const it=GM_ITEMS[GM.sel],tp=$('gmTip');if(tp&&it&&it.id==='shop'){tp.textContent='💡 상점: 🪙 일반 상점(코인 · 스킨은 고른 것 아래)과 💎 현질 상점(프리미엄 · 펫 묶음 · 세트) 중에서 골라요.';if(typeof lvDock==='function')lvDock()}}catch(e){}return r}}
 try{if(typeof lvSet==='function')setTimeout(()=>{try{lvSet()}catch(e){}},350)}catch(e){}
 window.SHOPPICK119={open:pick,close};
}catch(e){console.error('v119 skins',e)}})();
