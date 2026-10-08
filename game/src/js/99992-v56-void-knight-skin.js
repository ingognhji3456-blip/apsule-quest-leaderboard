/* ================= v58 유료 스킨 3종 (v56 공허 검사 체험판을 새로 그림) =================
   주인공 그림 위에 덮어쓰는 외형 스킨. 능력치·판정·점수는 그대로이고 그림만 바뀐다.
     ① 공허 검사 VOID KNIGHT        ₩2,000  흑자색 판금 · 뿔 투구의 청록 T자 눈빛 · 찢어진 망토 · 떠도는 공허 조각
     ② 태엽 성기사 CLOCKWORK PALADIN ₩3,500  상아·황동 갑옷 · 등 뒤에서 도는 톱니 후광 · 박자에 맞춰 가는 가슴 시계 · 붉은 깃털 · 증기
     ③ 네온 비트 NEON BEAT           ₩5,000  검은 테크웨어 · 박자에 맞춰 번쩍이는 네온 · 이퀄라이저 바이저 · 큰 헤드폰 · 홀로그램 목도리
   만드는 방법: 기본 캐릭터(820)와 같은 도트 도구(Q.R/E/P…)로 그려서 같은 외곽선·음영(ch2Finish)을 받는다.
   ch2Arms·ch2Legs를 써서 984의 옆모습 걷기와 검 휘두르기 팔이 그대로 붙는다. 앞·옆·뒤 모습은 HV.view로 나눠 그린다.
   장착: SKIN58.equip(id) → ch2Render가 내 캐릭터를 그릴 때 스킨 그림으로 바꿈(태엽 공방 창이 열려 있을 때는 원래 캐릭터를 보여 줌). 지금은 결제가 없어서 「입어보기」만 되고 저장하지 않는다.
   검 궤적 색은 window.__skinTrail, 스킨별 휘두르기 모션과 공격 이펙트는 window.__skinMotion(984가 읽음). */
(function(){try{
 if(typeof CH2DEF==='undefined'||typeof ch2Render!=='function')return;
 const HV=window.__HV||{view:'front'};
 const view=()=>HV.view||'front';
 /* 박자: 음악이 돌고 있으면 그 박자, 아니면 0.5초마다 */
 function beat(){try{if(typeof mus!=='undefined'&&mus&&mus.ms&&mus.T0){const q=(performance.now()-mus.T0)/mus.ms;return q-Math.floor(q)}}catch(e){}const q=performance.now()/500;return q-Math.floor(q)}
 const pulse=()=>Math.pow(1-beat(),2.2);
 const mix=(a,b,k)=>{const p=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16)),A=p(a),B=p(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*k).toString(16).padStart(2,'0')).join('')};

 /* ================= ① 공허 검사 ================= */
 const VK={d:'#1b1833',m:'#3b3569',l:'#5b52a6',h:'#a296f2',hh:'#dcd4ff',t:'#5affd8',v:'#b07aff',ck:'#0e0b1c',ci:'#6a34c0'};
 function voidPaint(Q,f,b,bl,t){const v=view(),side=v==='side',back=v==='back',gl=.65+.35*Math.sin(t*3);
  /* 망토 (몸 뒤) : 두 갈래로 찢어진 끝 */
  const cape=(x0,x1,dir)=>{const w=Math.sin(t*3.4+dir)*1.4;Q.P([[x0,19+b],[x1,19+b],[x1+dir*1.5+w,31],[x1-1+w,29],[(x0+x1)/2+w,32],[x0+1+w,29.5],[x0-dir*1+w,31]],VK.ck);Q.L(x0+.5,20+b,x0-dir*.5+w,30.5,VK.ci)};
  if(!back){if(side){cape(15,23,1)}else{cape(6,14,-1);cape(14,22,1)}}
  /* 다리: 정강이 판 */ch2Legs(Q,f,VK.l,VK.m);if(!side){for(const x of [10,16]){Q.R(x,28.5,3,1,VK.h);Q.px(x+1,32.5,VK.t,.9)}}
  /* 몸통: 판금 가슴 · 갈비 판 · 청록 룬 */
  Q.P([[7,19+b],[21,19+b],[20,27],[8,27]],VK.m);Q.R(8,19+b,12,2,VK.l);Q.R(8,19+b,12,1,VK.h);
  for(const y of [23,25])Q.R(9,y+b,10,1,VK.d);
  if(!back){Q.R(13.5,20+b,1,6,VK.t,gl);Q.P([[14,21+b],[15.5,22.5+b],[14,24+b],[12.5,22.5+b]],VK.t,.55+.45*gl);Q.px(14,22+b,'#eafffa')}
  else{Q.R(13,20+b,2,6,VK.d);Q.R(13.5,21+b,1,4,VK.v,.8)}
  Q.R(8,26+b,12,2,VK.d);Q.R(12.5,26+b,3,2,VK.t,gl);Q.px(13.5,26.5+b,'#eafffa');Q.R(9.5,18.4+b,9,1,'#07060f');
  /* 팔: 판금 팔 · 건틀릿 */ch2Arms(Q,f,VK.l,VK.hh,b);
  /* 어깨 판 (뾰족) */
  const pauld=(x,dir)=>{Q.P([[x,17+b],[x+dir*6,16.5+b],[x+dir*7,20+b],[x+dir*1,21+b]],VK.l);Q.P([[x+dir*1,17+b],[x+dir*6,16.5+b],[x+dir*5.5,17.5+b]],VK.hh);Q.P([[x+dir*6,16.5+b],[x+dir*8,14.5+b],[x+dir*7,18+b]],VK.h);Q.px(x+dir*3.5,19+b,VK.t,gl)};
  if(side)pauld(9,1);else{pauld(9,-1);pauld(19,1)}
  /* 투구 */
  if(!side){Q.E(14,11+b,7,7.3,VK.m);Q.R(7,11+b,14,6.6,VK.m);Q.R(7,11+b,1.5,6.6,VK.l);Q.R(19.5,11+b,1.5,6.6,VK.d);Q.R(13,4+b,2,9,VK.l);Q.R(13,4+b,1,9,VK.h);Q.E(14,8+b,6,3,VK.l,.5);
   if(!back){Q.R(8,12+b,12,2,'#05040c');Q.R(13,12+b,2,6,'#05040c');if(!bl){Q.R(9,12.5+b,4,1,VK.t);Q.R(15,12.5+b,4,1,VK.t);Q.R(13.5,14+b,1,3,VK.t,gl);Q.px(10,12+b,'#eafffa');Q.px(17,12+b,'#eafffa')}
    Q.P([[7,16+b],[11,15+b],[11,18+b],[8,18+b]],VK.l);Q.P([[21,16+b],[17,15+b],[17,18+b],[20,18+b]],VK.l)}
   else{for(let k=0;k<3;k++)Q.R(9,14+b+k*1.5,10,.8,VK.d);Q.R(13,4+b,2,14,VK.l)}
   /* 뿔: 뒤로 휘어 올라감 */for(const s of [-1,1]){Q.P([[14+s*5,7+b],[14+s*7,8+b],[14+s*9.5,2+b],[14+s*10,-2+b],[14+s*8,2.5+b]],VK.h);Q.P([[14+s*9.5,2+b],[14+s*10,-2+b],[14+s*9,1+b]],VK.hh)}}
  else{/* 옆얼굴(왼쪽을 봄) */Q.E(14,11+b,7,7.6,VK.m);Q.R(7,11+b,14,7,VK.m);Q.R(14,4+b,6,3,VK.l);Q.R(7,12+b,7,2,'#05040c');if(!bl){Q.R(7.5,12.5+b,5,1,VK.t);Q.px(8,12+b,'#eafffa')}Q.P([[6,14+b],[10,15+b],[9,18+b],[7,18+b]],VK.l);
   Q.P([[16,7+b],[18,8+b],[23,3+b],[25,-1+b],[21,3+b]],VK.h);Q.P([[23,3+b],[25,-1+b],[22.5,2+b]],VK.hh)}
  /* 뒤에서 보면 망토가 몸을 덮음 */
  if(back){const w=Math.sin(t*3.4)*1.2;Q.P([[6,18+b],[22,18+b],[23+w,31],[19+w,29],[16+w,32],[12+w,29.5],[9+w,32],[5+w,30]],VK.ck);Q.L(14,19+b,14+w,30,VK.t,.35+.3*gl);for(let i=0;i<3;i++)Q.L(9+i*5,19+b,8.5+i*5.3+w,29,VK.ci,.8)}
  /* 떠도는 공허 조각: 어깨 이음새와 망토 끝에서 올라감 */
  const an=side?[[15,21],[23,30]]:[[7,20],[21,20],[9,30],[19,30]];for(let i=0;i<10;i++){const a=an[i%an.length],q=(t*.7+i*.173)%1;Q.px(a[0]+Math.sin(i*2.4+t)*q*3,a[1]-q*9,i%3?VK.t:VK.v,(1-q)*.85)}}

 /* ================= ② 태엽 성기사 ================= */
 const CP={iv:'#efe6d2',ivs:'#c4b593',ivd:'#8e7f62',br:'#d8a23a',brl:'#ffdf8a',brd:'#8a5a14',vel:'#9a1f2e',vell:'#c83a46',st:'#4c5462',gl:'#7ff3ff'};
 function gearSolid(Q,cx,cy,r,teeth,rot,col,col2){const o=Q.o;Q.C(cx,cy,r,col);for(let i=0;i<teeth;i++){const a=rot+i*TAU/teeth;Q.P([[cx+Math.cos(a-.12)*(r-.5),cy+Math.sin(a-.12)*(r-.5)],[cx+Math.cos(a-.09)*(r+2),cy+Math.sin(a-.09)*(r+2)],[cx+Math.cos(a+.09)*(r+2),cy+Math.sin(a+.09)*(r+2)],[cx+Math.cos(a+.12)*(r-.5),cy+Math.sin(a+.12)*(r-.5)]],col)}
  Q.C(cx,cy,r-.9,col2);o.save();o.globalCompositeOperation='destination-out';Q.C(cx,cy,r-2.6,'#000');o.restore();for(let i=0;i<6;i++){const a=-rot*1.3+i*TAU/6;Q.L(cx+Math.cos(a)*(r-2.4),cy+Math.sin(a)*(r-2.4),cx+Math.cos(a)*(r-1),cy+Math.sin(a)*(r-1),'#ffe9a8')}}
 function gearRing(Q,cx,cy,r,teeth,rot,col,col2,a){for(let i=0;i<teeth*2;i++){const ang=rot+i*Math.PI/teeth,rr=r+(i%2?0:1.3);Q.R(cx+Math.cos(ang)*rr-.5,cy+Math.sin(ang)*rr-.5,1.2,1.2,i%2?col2:col,a)}for(let i=0;i<teeth*3;i++){const ang=rot+i*TAU/(teeth*3);Q.px(cx+Math.cos(ang)*(r-1.2),cy+Math.sin(ang)*(r-1.2),col2,a)}}
 function clockPaint(Q,f,b,bl,t){const v=view(),side=v==='side',back=v==='back',bt=beat(),ps=pulse();
  /* 톱니 후광 (등 뒤, 천천히 돎) */if(!side)gearSolid(Q,14,9.5+b,10,12,t*.5,CP.br,CP.brd);else gearSolid(Q,18.5,9.5+b,9,11,t*.5,CP.br,CP.brd);
  /* 붉은 망토 + 금테 */const cape=(x0,x1)=>{for(let i=0;i<5;i++){const xa=x0+(x1-x0)*i/5,xb=x0+(x1-x0)*(i+1)/5,w=Math.sin(t*3+i*.8)*1.1;Q.P([[xa,19],[xb+.6,19],[xb+w+.6,31.5],[xa+w,31.5]],i%2?CP.vel:CP.vell)}Q.R(x0,31,x1-x0+1,1,CP.br)};
  if(!back){if(side)cape(15,24);else cape(6,22)}
  ch2Legs(Q,f,CP.ivs,CP.brd);if(!side)for(const x of [10,16]){Q.R(x,28,3,1.5,CP.br);Q.px(x+1,28,CP.brl)}
  /* 가슴판: 상아 + 금테, 가운데 시계 */Q.P([[7,19+b],[21,19+b],[20,27],[8,27]],CP.iv);Q.P([[7,19+b],[9,19+b],[9.5,27],[8,27]],CP.ivs);Q.R(7,19+b,14,1.5,CP.br);Q.R(8,26+b,12,1.5,CP.brd);Q.R(13,26+b,2,1.5,CP.brl);
  if(!back){Q.C(14,22.6+b,3.4,CP.br);Q.C(14,22.6+b,2.6,'#fffaf0');for(let i=0;i<12;i+=3){const a=i*TAU/12;Q.px(14+Math.cos(a)*2.1,22.6+b+Math.sin(a)*2.1,CP.brd)}
   const mn=Math.floor(t*2)*TAU/12+bt*.0,hr=t*.25;Q.L(14,22.6+b,14+Math.cos(mn-Math.PI/2)*2.2,22.6+b+Math.sin(mn-Math.PI/2)*2.2,'#2a1a10');Q.L(14,22.6+b,14+Math.cos(hr)*1.4,22.6+b+Math.sin(hr)*1.4,CP.vel);Q.px(14,22.6+b,CP.brd);Q.C(14,22.6+b,3.6,CP.gl,.12*ps)}
  else{Q.R(9,21+b,10,4,CP.ivs);gearRing(Q,14,23+b,2.4,6,-t*2,CP.brl,CP.brd,1)}
  ch2Arms(Q,f,CP.iv,CP.br,b);
  /* 황동 어깨 (리벳 · 증기) */const pa=(x)=>{Q.E(x,18.5+b,3.6,2.6,CP.br);Q.E(x,17.8+b,3,1.4,CP.brl);Q.px(x-2,19+b,CP.brd);Q.px(x+2,19+b,CP.brd);const q=(t*.9+x*.13)%1;if(q<.6){Q.C(x+(x<14?-1:1)*q*3,15+b-q*5,.8+q*1.6,'#ffffff',.35*(1-q/.6))}};
  if(side)pa(10);else{pa(6);pa(22)}
  /* 투구: 상아 그레이트헬름 · 황동 십자 · 청록 눈빛 · 붉은 깃털 */
  const plume=(x0,dir)=>{for(let i=0;i<8;i++){const w=Math.sin(t*5-i*.6)*(i*.18);Q.C(x0+dir*i*1.3,2+b+i*.7+w,2.2-i*.15,i%2?CP.vel:CP.vell)}};
  if(!side){plume(14,1);Q.E(14,11+b,6.9,7,CP.iv);Q.R(7.1,11+b,13.8,6.8,CP.iv);Q.R(7.1,11+b,1.8,6.8,CP.ivs);Q.R(13,4.5+b,2,13.5,CP.br);Q.R(13,4.5+b,1,13.5,CP.brl);Q.E(14,5+b,3,1.5,CP.br);
   if(!back){Q.R(8,12+b,12,1.6,'#120c08');if(!bl){Q.R(9,12.3+b,3.5,1,CP.gl);Q.R(15.5,12.3+b,3.5,1,CP.gl)}for(let i=0;i<4;i++){Q.px(9+i,15.5+b,'#120c08');Q.px(16+i,15.5+b,'#120c08')}Q.R(7,17+b,14,1,CP.brd)}
   else{Q.R(8,12+b,12,5,CP.ivs);Q.R(13,4.5+b,2,13.5,CP.br)}}
  else{plume(15,1);Q.E(13.5,11+b,7,7.4,CP.iv);Q.R(6.5,11+b,14,7,CP.iv);Q.R(7,12+b,6,1.6,'#120c08');if(!bl)Q.R(7.5,12.3+b,4,1,CP.gl);Q.R(13,5+b,1.6,13,CP.br);for(let i=0;i<3;i++)Q.px(8+i,15.5+b,'#120c08');Q.E(17,13+b,2,2,CP.br)}
  if(back){/* 등 뒤 망토가 덮음 */for(let i=0;i<6;i++){const w=Math.sin(t*3+i*.8)*1.1;Q.P([[6+i*2.7,18+b],[8.9+i*2.7,18+b],[8.9+i*2.7+w,31.5],[6+i*2.7+w,31.5]],i%2?CP.vel:CP.vell)}Q.R(6,31,16,1,CP.br);gearRing(Q,14,24,2.6,6,t,CP.brl,CP.brd,1)}
  /* 박자마다 금빛 불씨 */for(let i=0;i<5;i++){const q=(t*.6+i*.2)%1;Q.px(5+i*4.5+Math.sin(t*2+i)*1,30-q*22,i%2?CP.brl:'#fff3c0',(1-q)*.7)}}

 /* ================= ③ 네온 비트 ================= */
 const NB={j:'#1e2542',j2:'#2e3860',js:'#0c0f1a',m:'#ff3ad6',c:'#29f0ff',y:'#ffe14d',sk:'#ffd9c2',h:'#1d1a30',hs:'#2c2850'};
 function neonPaint(Q,f,b,bl,t){const v=view(),side=v==='side',back=v==='back',ps=pulse(),hue=(t*.25)%1,nm=mix('#7a1060',NB.m,.45+.55*ps),nc=mix('#0a5a66',NB.c,.45+.55*ps);
  const rib=(x0,dir)=>{for(let i=0;i<14;i++){const q=i/14,w=Math.sin(t*6-i*.55)*(1+i*.25);const col=['#ff3ad6','#b05cff','#29f0ff','#5affb0','#ffe14d'][(i+Math.floor(t*6))%5];Q.R(x0+dir*i*1.15,18+b+i*.55+w,1.6,1.6,col,.85*(1-q*.6))}};
  /* 홀로그램 목도리 (등 뒤로 흩날림) */if(!back)rib(side?17:19,1);
  ch2Legs(Q,f,'#283152','#e9edf5');if(!side){Q.R(10,28.5,3,.7,nm,.8);Q.R(16,28.5,3,.7,nc,.8)}/* 운동화 빛나는 밑창 */for(const x of [9,16])Q.R(x,32.6,4,.8,side?nc:(x<14?nm:nc),.9);
  /* 재킷 */Q.P([[7,19+b],[21,19+b],[21.5,28],[6.5,28]],NB.j);Q.P([[7,19+b],[10,19+b],[9.5,28],[6.5,28]],NB.j2);Q.R(7,19+b,14,1.4,NB.j2);
  if(!back){Q.R(13.5,19.5+b,1,8.5,'#3a4262');Q.L(8,20+b,8,27.5,nm);Q.L(20,20+b,20,27.5,nc);
   /* 가슴 이퀄라이저 */for(let i=0;i<5;i++){const hgt=1+Math.round((.5+.5*Math.sin(t*9+i*1.7))*2.6*(.4+.6*ps));Q.R(15.5+i*.9,25-hgt+b,.8,hgt,['#29f0ff','#5affb0','#ffe14d','#ff9a3a','#ff3ad6'][i])}
   Q.R(8.5,27+b,11,1,'#0a0c14');Q.R(12.5,27+b,3,1,NB.y,.6+.4*ps)}
  else{Q.L(8,20+b,8,27.5,nm);Q.L(20,20+b,20,27.5,nc);/* 등판 번개 로고 */Q.P([[15,20.5+b],[11.5,24+b],[14,24+b],[12.5,27+b],[16.5,23+b],[14,23+b]],NB.y,.65+.35*ps)}
  ch2Arms(Q,f,NB.j2,'#2a3150',b);/* 소매 네온 */if(!side){Q.R(7,24.5+b,3,.8,nm);Q.R(18,24.5+b,3,.8,nc)}
  /* 머리 */
  if(!back&&!side){ch2Head(Q,NB.sk,12+b);Q.R(12.5,17.5+b,3,.8,'#c86a6a')}
  else if(side){Q.E(14,12+b,7,7,NB.sk);Q.R(8,14+b,12,4,NB.sk);Q.px(6,15+b,NB.sk)}
  else{Q.E(14,12+b,7.5,7,NB.h);Q.R(7,13+b,14,5,NB.h)}
  /* 뾰족 머리 + 청록 끝 */for(let i=0;i<7;i++){const x=6.5+i*2.5,hh=4+((i*5)%3);Q.P([[x-1.6,8+b],[x+1.6,8+b],[x+.6+(back?0:-.6),8-hh+b]],NB.h);Q.px(x+.2,8-hh+1+b,NB.c,.85)}Q.E(14,7.5+b,8,3.2,NB.h);Q.R(6.5,7+b,15,2.2,NB.hs);
  /* 바이저: 흐르는 이퀄라이저 */
  if(!back){const x0=side?6.5:7.5,w=side?7.5:13;Q.R(x0,11.5+b,w,3,'#070a14');for(let i=0;i<Math.floor(w);i++){const hgt=1+Math.round((.5+.5*Math.sin(t*10+i*1.3))*1.6*(.5+.5*ps));Q.R(x0+i+.2,14.4-hgt+b,.7,hgt,['#29f0ff','#5affb0','#ffe14d','#ff3ad6'][(i+Math.floor(t*4))%4],bl?.3:1)}Q.R(x0,11.5+b,w,.6,'#ffffff',.25)}
  /* 헤드폰 */const cup=(x,c)=>{Q.E(x,13+b,2.6,3.2,'#0d1020');Q.E(x,13+b,1.7,2.3,c);Q.E(x,13+b,1,1.4,'#0d1020');Q.C(x,13+b,3.6,c,.18*ps)};
  if(!side){Q.P([[5.5,12+b],[7,4+b],[14,1.6+b],[21,4+b],[22.5,12+b],[21.6,12+b],[20,5+b],[14,2.8+b],[8,5+b],[6.4,12+b]],'#262c46');cup(5.5,nm);cup(22.5,nc)}
  else{Q.P([[13,3+b],[16,2+b],[17.5,8+b],[16.5,8+b]],'#262c46');cup(16,nc)}
  /* 떠오르는 음표 */for(let i=0;i<3;i++){const q=(t*.5+i/3)%1,x=(side?21:3+i*11)+Math.sin(t*2+i)*1.5,y=24-q*20;const c=['#ff3ad6','#29f0ff','#ffe14d'][i];Q.R(x,y,1,3,c,1-q);Q.R(x-1.2,y+2.2,1.6,1.4,c,1-q);Q.R(x,y,1.8,.8,c,1-q)}
  if(back)rib(14,1)}


 /* ================= 스킨마다 다른 휘두르기 · 공격 이펙트 =================
   k: 휘두르기 진행 0→1. arm(k)=팔 각도(0=오른쪽, 아래가 +), hand=[어깨 x, 팔 길이], lean=몸 기울기.
   fx(c,k,H): 화면 좌표에 이펙트. H.handQ(q)→[x,y,각도] (그림 좌표), H.toW→화면 좌표, H.wAng→바라보는 쪽 각도, H.L=검 길이 */
 const RAW=(c,x,y,w,h,col,a)=>{c.globalAlpha=a;c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)))};
 const tipOf=(H,q)=>{const [px,py,pa]=H.handQ(q),[tx,ty]=H.toW(px,py),a=H.wAng(pa+.25);return {x:tx,y:ty,a,tx:tx+Math.cos(a)*H.L,ty:ty+Math.sin(a)*H.L}};
 const MOTION={
  /* 공허 검사: 머리 위로 크게 들어 내리찍기 → 칼끝에 공허 틈이 갈라짐 */
  void:{arm:(k,e)=>k<.3?1.35+(-3.05-1.35)*e(k/.3):k<.48?-3.05+4.15*e((k-.3)/.18):k<.72?1.1+.55*e((k-.48)/.24):1.65-.3*e((k-.72)/.28),
   hand:(k,side)=>[side?17:19.5,k<.3?5.5:8],lean:(k,e)=>k<.3?-.16*e(k/.3):k<.48?-.16+.42*e((k-.3)/.18):.26*(1-e((k-.48)/.52)),
   fx(c,k,H){c.save();c.lineCap='round';
    if(k>.3&&k<.64)for(let j=1;j<=7;j++){const T=tipOf(H,Math.max(.3,k-j*.018));c.globalAlpha=(1-j/8)*.3;c.strokeStyle=j%2?'#78ffe0':'#b080ef';c.lineWidth=Math.max(1,H.s*.8);c.beginPath();c.moveTo(T.x+Math.cos(T.a)*H.L*.3,T.y+Math.sin(T.a)*H.L*.3);c.lineTo(T.tx,T.ty);c.stroke()}
    if(k>.45&&k<.9){const T=tipOf(H,.5),q=(k-.45)/.45,r=H.L*(.3+q*.7);/* 공허 틈: 검은 초승달 + 청록 테두리 + 빨려 드는 조각 */
     c.globalAlpha=.75*(1-q);c.fillStyle='#07040f';c.beginPath();c.ellipse(T.tx,T.ty,r*.9,r*.28,T.a+Math.PI/2,0,TAU);c.fill();c.strokeStyle='#5affd8';c.lineWidth=Math.max(1,H.s*.5);c.stroke();
     for(let i=0;i<8;i++){const a=i*TAU/8+q*2,d=r*(1.6-q*1.2);RAW(c,T.tx+Math.cos(a)*d-1,T.ty+Math.sin(a)*d*.5-1,2,2,i%2?'#b080ef':'#5affd8',.8*(1-q))}}
    c.restore();c.globalAlpha=1}},
  /* 태엽 성기사: 천천히 높이 들었다가 잠깐 멈추고, 묵직하게 한 번에 내려침 → 칼끝에 황금 톱니 고리 */
  clock:{arm:(k,e)=>k<.38?1.35+(-1.65-1.35)*e(k/.38):k<.5?-1.65+Math.sin(k*90)*.04:k<.6?-1.65+2.75*e((k-.5)/.1):k<.82?1.1:1.1+.25*e((k-.82)/.18),
   hand:(k,side)=>[side?13:19.5,7.2],lean:(k,e)=>k<.38?-.12*e(k/.38):k<.5?-.12:k<.6?-.12+.44*e((k-.5)/.1):.32*(1-e((k-.6)/.4)),
   fx(c,k,H){c.save();
    if(k>.5&&k<.64)for(let j=1;j<=6;j++){const T=tipOf(H,Math.max(.5,k-j*.012));for(let d=H.L*.3;d<=H.L;d+=1.6)RAW(c,T.x+Math.cos(T.a)*d-1,T.y+Math.sin(T.a)*d-1,2.4,2.4,j===1?'#fff8d8':'#ffcf5a',.22*(7-j)/6)}
    if(k>.58){const T=tipOf(H,.6),q=Math.min(1,(k-.58)/.42),r=H.L*(.25+q*.75),rot=q*2;/* 톱니 고리 */
     c.globalAlpha=.85*(1-q);c.strokeStyle='#ffcf5a';c.lineWidth=Math.max(1.5,H.s*.7);c.beginPath();c.arc(T.tx,T.ty,r,0,TAU);c.stroke();
     for(let i=0;i<12;i++){const a=rot+i*TAU/12;RAW(c,T.tx+Math.cos(a)*(r+2)-1.5,T.ty+Math.sin(a)*(r+2)-1.5,3,3,'#ffe9a8',.85*(1-q))}
     /* 시곗바늘 두 개가 돎 */c.strokeStyle='#fff8d8';c.lineWidth=Math.max(1,H.s*.45);c.beginPath();c.moveTo(T.tx,T.ty);c.lineTo(T.tx+Math.cos(rot*3)*r*.7,T.ty+Math.sin(rot*3)*r*.7);c.moveTo(T.tx,T.ty);c.lineTo(T.tx+Math.cos(rot)*r*.45,T.ty+Math.sin(rot)*r*.45);c.stroke();
     for(let i=0;i<10;i++){const a=i*TAU/10+.3,d=r*(.6+q*.9);RAW(c,T.tx+Math.cos(a)*d,T.ty+Math.sin(a)*d+q*q*12,2,2,i%2?'#ffffff':'#ffcf5a',(1-q))}}
    c.restore();c.globalAlpha=1}},
  /* 네온 비트: 빠르게 한 바퀴 돌려 베기 → 몸을 감싸는 무지개 원 + 박자 고리 + 음표 */
  neon:{arm:(k,e)=>k<.12?1.35+.85*e(k/.12):k<.58?2.2-TAU*e((k-.12)/.46):k<.8?2.2-TAU:2.2-TAU+(1.35-2.2)*e((k-.8)/.2),
   hand:(k,side)=>[side?13:19,7.6],lean:(k,e)=>k<.12?-.06:k<.58?Math.sin((k-.12)/.46*TAU)*.14:.05*(1-e((k-.58)/.42)),
   fx(c,k,H){c.save();const cols=['#ff3ad6','#b05cff','#29f0ff','#5affb0','#ffe14d','#ff9a3a'];
    if(k>.12&&k<.66){const n=14;for(let j=0;j<n;j++){const q=Math.max(.12,k-j*.022),T=tipOf(H,q);RAW(c,T.tx-1.5,T.ty-1.5,3,3,cols[j%6],.75*(1-j/n));const m=tipOf(H,q);RAW(c,(m.x+m.tx)/2-1,(m.y+m.ty)/2-1,2,2,cols[(j+3)%6],.4*(1-j/n))}}
    if(k>.55){const T=tipOf(H,.12),q=Math.min(1,(k-.55)/.45),cx=T.x,cy=T.y,r=H.L*(.6+q*.9);/* 박자 고리 */
     c.globalAlpha=.8*(1-q);c.lineWidth=Math.max(1.5,H.s*.6);for(let i=0;i<3;i++){c.strokeStyle=cols[(i*2+Math.floor(q*8))%6];c.beginPath();c.arc(cx,cy,r*(1-i*.18),0,TAU);c.stroke()}
     /* 음표가 튀어나감 */for(let i=0;i<5;i++){const a=i*TAU/5-Math.PI/2,d=r*(.8+q*.5),x=cx+Math.cos(a)*d,y=cy+Math.sin(a)*d-q*10,col=cols[i];RAW(c,x,y,1.6,6,col,1-q);RAW(c,x-3,y+5,4,3,col,1-q);RAW(c,x,y,4,1.6,col,1-q)}}
    c.restore();c.globalAlpha=1}}};
 /* ---------- 목록 ---------- */
 const SK=[
  {id:'void',name:'공허 검사',en:'VOID KNIGHT',price:2000,tier:'희귀',tc:'#8ad0ff',col:'#9a66ff',paint:voidPaint,trail:'#78ffe0',
   desc:'빛을 삼킨 갑옷에 청록 눈빛. 찢어진 망토 끝에서 공허 조각이 피어올라요.',tags:['머리 위 내려찍기 모션','칼끝에 갈라지는 공허 틈','청록·보라 이중 궤적']},
  {id:'clock',name:'태엽 성기사',en:'CLOCKWORK PALADIN',price:3500,tier:'영웅',tc:'#c88aff',col:'#ffcf6a',paint:clockPaint,trail:'#ffdf8a',
   desc:'시계골 장인이 만든 상아·황동 갑옷. 등 뒤 톱니 후광이 돌고, 가슴 시계가 박자에 맞춰 가요.',tags:['들었다 멈추고 내려치는 묵직한 모션','칼끝에 도는 황금 톱니 시계','돌아가는 톱니 후광']},
  {id:'neon',name:'네온 비트',en:'NEON BEAT',price:5000,tier:'전설',tc:'#ffd166',col:'#ff3ad6',paint:neonPaint,trail:'rainbow',
   desc:'음악이 곧 갑옷. 재킷 네온과 바이저 이퀄라이저가 박자마다 번쩍이고, 홀로그램 목도리가 흩날려요.',tags:['한 바퀴 돌려 베기 모션','무지개 원 · 박자 고리 · 음표','박자마다 번쩍이는 네온']}];
 SK.forEach((s,i)=>{s.motion=MOTION[s.id];s.idx=100+i;CH2DEF[s.idx]={paint:s.paint,__v44:1,skin:s.id}});

 let cur=null;
 const S58=window.SKIN58={list:SK,get:()=>cur,byId:id=>SK.find(s=>s.id===id),
  equip(id){cur=id&&SK.find(s=>s.id===id)?id:null;const s=cur&&S58.byId(cur);window.__skinMotion=s?s.motion:null;window.__skinTrail=s?s.trail:null;try{document.dispatchEvent(new Event('skin58'))}catch(e){}},
  /* 미리보기용: 원하는 방향·걸음으로 스킨 그림(40×48 캔버스) */
  render(id,viewName,f,t){const s=S58.byId(id);if(!s)return null;const ov=HV.view,osw=HV.sw;HV.view=viewName||'front';HV.sw=null;try{return ch2Render(s.idx,f||0,0,false,t!=null?t:performance.now()/1000)}finally{HV.view=ov;HV.sw=osw}}};
 /* 내 캐릭터를 그릴 때만 스킨으로 바꿈 */
 {const base=ch2Render;ch2Render=function(idx,f,b,bl,t){try{const sm=document.getElementById('shopModal'),ck=S58.get();/* v88: cur 대신 S58.get() — 듀오 동료를 그릴 때 동료 스킨으로 바뀌도록 */if(ck&&idx<100&&!(sm&&!sm.hidden)&&idx===((shopInv().eq||{}).ch||0)){const s=S58.byId(ck);if(s)return base.call(this,s.idx,f,b,bl,t)}}catch(e){}return base.apply(this,arguments)}}
}catch(e){console.error('v58 skins',e)}})();
