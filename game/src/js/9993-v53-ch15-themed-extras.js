/* ================= v53 챕터 1~5 난이도별 추가 공격 다시 만들기 (보스 50명) =================
   전에는 50명이 모두 같은 16가지 틀(소나기·나선·탄막 벽·십자 광선…)을 이름 앞말만 바꿔 썼다(840·870).
   이제 보스마다 "자기 물건"이 나와서 그 물건다운 방식으로 공격한다.
     예) 철갑 열차 → 화물칸이 줄마다 돌진 · 열차 칸 행렬 / 스톰 하이브 → 드론 편대가 둘러싸고 사격 · 자폭 드론 떼
         실크 여제 → 거미가 줄을 타고 내려옴 · 알이 부화하며 터짐 / 광학 요새 → 세워 둔 렌즈에 빛이 꺾임
   보스마다 4개: 보통 +1 · 어려움 +2 · 익스트림 +4 (난이도가 오를수록 같은 공격도 더 세짐)
   공격 틀(물체가 하는 행동) 11가지 — 편대·돌진·낙하·궤도·포대·떼·폭산·벽·행렬·반사·궤적
   모든 공격은 예고가 먼저, 빠져나갈 틈이 있다. */
(function(){try{
 const A=window.ACT;if(!A||typeof T5_SET==='undefined')return;
 const C=(v,a,b)=>v<a?a:v>b?b:v,tl=()=>t5T(),sp=()=>t5S(),core=()=>t5Core(),K='#0a0c14';
 const snd=(t,f,f2)=>t5Snd(t,f,f2);
 const shot=(T0,T1,x,y,a,v,c,o)=>npShot(T0,T1,x,y,a,v*sp(),Object.assign({sty:c.sty||'default',col:c.col,r:c.r||5,rayL:22,dmg:10},o||{}));
 const lane=(T0,T1,x,y,w,h)=>NP({k:'rect',harm:false,x,y,w,h,t0:T0,t1:T1,t2:T1+.01,dmg:0});
 const path=(T0,T1,ax,ay,bx,by)=>NP({k:'seg',sty:'laser',harm:false,noCharge:true,col:'#ff4d6d',w:3,t0:T0,t1:T1,t2:T1+.01,a:()=>[ax,ay],b:()=>[bx,by],dmg:0});
 const arrow=(T0,T1,x,y,a)=>NP({k:'orb',harm:false,noTel:true,hide:true,r:1,t0:T0,t1:T0,t2:T1,pos:()=>[x,y],deco:()=>cChevron(x,y,a,'#a6f5c6',1,4)});
 const away=(far)=>{for(let i=0;i<14;i++){const x=AX+30+RND()*(AW-60),y=AY+30+RND()*(AH-60);if(Math.hypot(x-P.x,y-P.y)>(far||90))return [x,y]}return [AX+40,AY+40]};

 /* ---------- 물체 그림 (새로 그린 것) ---------- */
 const PX={
  train:A.pix(["..KKKKKKKKKKKK..",".KRRRRRRRRRRRRK.","KRWWKWWKWWKWWRRK","KRWWKWWKWWKWWRRK","KRRRRRRRRRRRRRRK","KDDDDDDDDDDDDDDK",".KK.KK....KK.KK.","KGGKGGK..KGGKGGK",".KK.KK....KK.KK."],{K:K,R:'#c84a3a',W:'#ffe8a0',D:'#3a3a48',G:'#8a8a9a'}),
  seed:A.pix(["...KK...","..KGGK..",".KGGLGK.","KGGGGGLK","KGLGGGGK",".KGGGGK.","..KKKK..","...KK..."],{K:K,G:'#6a8a3a',L:'#c8e070'}),
  thorn:A.pix(["...K...","..KGK..","..KGK..",".KGGGK.",".KGLGK.","KGGGGGK","KGGLGGK","KKKKKKK"],{K:K,G:'#4a6a2a',L:'#a8c860'}),
  mush:A.pix(["..KKKKK..",".KRRWRRK.","KRWRRRWRK","KRRRRRRRK","KKKKKKKKK","...KWK...","...KWK...","..KKKKK.."],{K:K,R:'#c98fe6',W:'#f0d8ff'}),
  frog:A.pix([".KK...KK.","KWKK.KKWK","KGGGGGGGK","KGGGGGGGK","KGRRRRRGK",".KGGGGGK.","KGK...KGK","KK.....KK"],{K:K,G:'#5aa860',W:'#ffffff',R:'#ff8a8a'}),
  skull:A.pix(["..KKKKK..",".KWWWWWK.","KWWWWWWWK","KWKKWKKWK","KWKKWKKWK","KWWWKWWWK",".KWWWWWK.","..KWKWK..","..KKKKK.."],{K:K,W:'#efe4cd'}),
  spider:A.pix(["K.K...K.K",".K.K.K.K.","..KKKKK..","KKKRRRKKK","..KRRRK..","KKKRRRKKK",".K.KKK.K.","K.K...K.K"],{K:'#1a1020',R:'#a03a6a'}),
  hive:A.pix(["...KKK...","..KYYYK..",".KYKYKYK.","KYYYYYYYK","KYKYKYKYK","KYYYYYYYK",".KYKYKYK.","..KYYYK..","...KKK..."],{K:K,Y:'#ffd23a'}),
  fish:A.pix(["......L.....","......K.....",".KKKKKKK..KK","KDDDDWDDKKDK","KDDDDKDDDDDK","KYYDDDDDKKDK",".KKKKKKK..KK"],{K:K,D:'#2a4a6a',W:'#ffffff',Y:'#8ac8ff',L:'#ffe08a'}),
  wisp:A.pix(["...K...","..KYK..",".KYWYK.","KYWWWYK","KYWWWYK",".KYYYK.","..KKK.."],{K:'#2a1a3a',Y:'#ffb84a',W:'#fff0c0'}),
  tooth:A.pix(["KKKKKKK","KWWWWWK","KWWWWWK",".KWWWK.",".KWWWK.","..KWK..","...K..."],{K:'#2a0a14',W:'#f4f0e0'}),
  anvil:A.pix(["KKKKKKKKKKK","KMMMMMMMMMK",".KMMMMMMMK.","..KKMMMKK..","...KMMMK...","..KMMMMMK..",".KKKKKKKKK."],{K:K,M:'#6a6a7a'}),
  broom:A.pix(["....KK....","....KW....","....KW....","....KW....","...KKKK...","..KYYYYK..",".KYKYKYYK.","KYYKYYKYYK","KYKYYKYKYK"],{K:K,W:'#a8703a',Y:'#d8c070'}),
  crab:A.pix(["KK.......KK","KRK.....KRK",".KRKKKKKRK.","..KRRWRRK..",".KRRRRRRRK.","KKRRRRRRRKK","K.KKKKKKK.K"],{K:K,R:'#ff8a5a',W:'#ffd58a'}),
  manta:A.pix(["K.........K","KK.......KK",".KPK.K.KPK.","..KPPKPPK..","...KPPPK...","....KPK....",".....K.....",".....K....."],{K:K,P:'#f4e8c8'}),
  jelly:A.pix(["..KKKKK..",".KPPWPPK.","KPPPPPPPK","KPPPPPPPK","KKKKKKKKK",".K.K.K.K.","K.K.K.K.K",".K...K..."],{K:'#4b3265',P:'#eab7ff',W:'#ffffff'}),
  torpedo:A.pix(["..KKKKKKKKK..",".KGGGGGGGGGK.","KWGGGGGGGGGKK",".KGGGGGGGGGK.","..KKKKKKKKK.."],{K:K,G:'#88a8c8',W:'#ffffff'}),
  hourglass:A.pix(["KKKKKKK","KWWWWWK",".KYYYK.","..KYK..","..KYK..",".KWYWK.","KYYYYYK","KKKKKKK"],{K:'#304968',W:'#e8f0ff',Y:'#f7d8a3'}),
  meteor:A.pix(["......KK","....KKRK","..KKROOK",".KROOYOK","KROOYYOK","KROOOOK.",".KRROK..","..KKK..."],{K:'#2a1410',R:'#a02a10',O:'#ff7a2a',Y:'#ffe8b0'}),
  needle:A.pix(["KKKKKKKKKKKKK..","KWWWWWWWWWWWWKK","KKKKKKKKKKKKK.."],{K:'#2a2440',W:'#e8e0ff'}),
  lens:A.pix(["..KKKKK..",".KSCCCSK.","KSCWCCCSK","KSCCCCCSK","KSCCCWCSK",".KSCCCSK.","..KKKKK.."],{K:K,S:'#c8b890',C:'#a8e8ff',W:'#ffffff'}),
  icemirror:A.pix([".KKKKK.","KWCCCWK","KCWCCCK","KCCWCCK","KCCCWCK","KCCCCWK",".KKKKK."],{K:'#2a4a6a',C:'#a8f0ff',W:'#ffffff'})};
 const SPR=(name,r,col)=>PX[name]||A.spr(name,r||5,col);window.PX53=PX;
 /* 톱니·고철처럼 갈아 버리는 물체: 구르며 땅에 불똥을 튀김 */
 const GRIND=(Q,b,now,x,y)=>{const t=now/1000;for(let j=0;j<5;j++){const aa=Math.PI+(hash(Math.floor(t*30)+'g'+j)%100-50)/60,d=3+hash(Math.floor(t*30)+'d'+j)%12;cPx(x+Math.cos(aa)*d*(Q.fwd||1),y+8+Math.sin(aa)*d*.5-2,2,j%2?'#ffffff':'#ffd166',.95)}RA(Math.round(x-6),Math.round(y+9),12,2,'#1a1410',.5)};

 /* ================= 공격 틀 11가지: (t, c, L) → 걸리는 박자 =================
    c = {spr, s(크기), col, sty(탄 모양), r(탄 크기), noun(이름말)} · L = 난이도 세기(1~3) */
 const TM={};
 /* 편대: 물체들이 날아와 나를 둘러싸고 차례로 부채꼴 사격 */
 TM.squad={chan:'head',tip:n=>n+' 편대가 날아와 나를 둘러싸고 차례로 쏨 → 쏘는 순서를 보고 빈 쪽으로',fn:(t,c,L)=>{const n=3+L,T1=t+tl();
  sch(t,()=>{const [cx,cy]=core(),px=P.x,py=P.y;for(let i=0;i<n;i++){const a=-Math.PI*.9+i*(Math.PI*.8/(n-1))+(py<AY+AH/2?Math.PI:0),[x,y]=npIn(px+Math.cos(a)*110,py+Math.sin(a)*90,16),Tf=T1+i*.45;
    A.put({spr:c.spr,s:c.s||1.8,t0:t,t2:Tf+.5,pos:A.lin(cx,cy,x,y,t,t+.6,true),face:b=>x<cx?-1:1,deco:(Q,b,now,xx,yy)=>{if(b>Tf-.3&&b<Tf)cRing(xx,yy,9,'#ff4d6d',.8,1)}});
    sch(Tf-.6,()=>{const a0=Math.atan2(P.y-y,P.x-x);for(let j=-1;j<=1;j++)shot(Tf-.6,Tf,x,y,a0+j*.2,82,c,{noTel:j!==0})})}});snd(T1,760);return tl()+n*.45+3}};
 /* 돌진: 줄마다 물체가 판 끝에 서서 끝까지 돌진 (빈 줄 하나) */
 TM.charge={chan:'field',tip:n=>'줄마다 '+n+' 하나씩 서서 끝까지 돌진 → 비어 있는 줄로',fn:(t,c,L)=>{const waves=1+(L>=2)+(L>=3);
  for(let w=0;w<waves;w++){const T0=t+w*1.8;sch(T0,()=>{const hor=w%2===0,N=hor?5:7,sz=hor?AH/N:AW/N,gap=C(Math.floor(((hor?P.y-AY:P.x-AX)/sz))+(RND()<.5?-1:1),0,N-1),gap2=L<2?(gap+2)%N:-1,T1=T0+tl(),go=1,fwd=(w%4)<2;
    for(let i=0;i<N;i++){if(i===gap||i===gap2)continue;const m=(hor?AY:AX)+sz*(i+.5),s0=fwd?(hor?AX+10:AY+10):(hor?AX+AW-10:AY+AH-10),s1=fwd?(hor?AX+AW+30:AY+AH+30):(hor?AX-30:AY-30);
     const pos=b=>{const v=b<T1?s0:s0+(s1-s0)*C((b-T1)/go,0,1);return hor?[v,m]:[m,v]};A.put({spr:c.spr,s:c.s||1.8,t0:T0,t2:T1+go,pos,ground:hor,fwd:fwd?-1:1,face:()=>fwd?1:-1,rot:c.grind?(b=>(fwd?1:-1)*Math.max(0,b-T1)*16):(hor?null:()=>fwd?Math.PI/2:-Math.PI/2),deco:c.grind?((Q,b,now,x,y)=>{if(b>=T1)GRIND(Q,b,now,x,y)}):null});
     if(hor)lane(T0,T1,AX,m-sz/2+3,AW,sz-6);else lane(T0,T1,m-sz/2+3,AY,sz-6,AH);A.hit({pos,r:10,t0:T0,t1:T1,t2:T1+go,dmg:11})}
    snd(T1,160,80)})}
  return waves*1.8+tl()+1}};
 /* 낙하: 물체가 위에서 내 자리로 연달아 떨어짐, 세지면 부딪힌 자리에서 파편 */
 TM.drop={chan:'field',tip:n=>'위에서 '+n+' 하나가 내 자리로 연달아 떨어짐 → 원이 차오르면 벗어나',fn:(t,c,L)=>{const n=4+L*2;
  for(let i=0;i<n;i++){const T0=t+i*.35;sch(T0,()=>{const [x,y]=npIn(P.x+(RND()-.5)*40,P.y+(RND()-.5)*30,18),T1=T0+tl();NP({k:'circ',x,y,r:16,t0:T0,t1:T1,t2:T1+.3,col:c.col,dmg:11});
    A.put({spr:c.spr,s:c.s||1.8,t0:T1-.45,t2:T1+.25,inT:.06,pos:A.lin(x,AY-8,x,y,T1-.45,T1)});if(L>=2&&i%2===0)sch(T1,()=>{for(let j=0;j<6;j++)shot(T1,T1,x,y,j*TAU/6+i,62,c,{noTel:true,r:Math.max(3,(c.r||5)-1)})});snd(T1,220,90)})}
  return n*.35+tl()+1.5}};
 /* 궤도: 보스 둘레를 돌던 물체가 하나씩 나를 향해 날아옴 */
 TM.orbit={chan:'head',tip:n=>'보스 둘레를 도는 '+n+' 고리에서 하나씩 나를 향해 날아옴 → 날아오는 순서대로 비켜',fn:(t,c,L)=>{const m=6+L*2,T1=t+tl();
  sch(t,()=>{for(let i=0;i<m;i++){const a0=i*TAU/m,Tf=T1+i*.28;let o=null;const pos=b=>{const [cx,cy]=core();if(b<Tf){const q=b-t;return [cx+Math.cos(a0+q*1.5)*56,cy+Math.sin(a0+q*1.5)*40]}if(!o){const q=Tf-t,x=cx+Math.cos(a0+q*1.5)*56,y=cy+Math.sin(a0+q*1.5)*40;o={x,y,a:Math.atan2(P.y-y,P.x-x)}}const d=(b-Tf)*118*sp();return [o.x+Math.cos(o.a)*d,o.y+Math.sin(o.a)*d]};
    A.put({spr:c.spr,s:c.s||1.6,t0:t,t2:Tf+3,pos,deco:(Q,b,now,x,y)=>{if(b>Tf-.3&&b<Tf)cRing(x,y,8,'#ff4d6d',.9,1)}});A.hit({pos,r:6,t0:t,t1:Tf,t2:Tf+3,dmg:10})}});snd(T1,880);return tl()+m*.28+3}};
 /* 포대: 구석에 선 물체에서 빛줄기가 천천히 휘둘러짐 */
 TM.turret={chan:'field',tip:n=>'경기장 구석에 선 '+n+'에서 빛줄기가 천천히 휘둘러짐 → 빛줄기가 도는 쪽을 따라 돌아',fn:(t,c,L)=>{const k=2+(L>=3),dur=3,T1=t+tl();
  sch(t,()=>{const S=[[AX+24,AY+24],[AX+AW-24,AY+24],[AX+24,AY+AH-24],[AX+AW-24,AY+AH-24]].sort((p,q)=>Math.hypot(q[0]-P.x,q[1]-P.y)-Math.hypot(p[0]-P.x,p[1]-P.y)).slice(0,k);
   S.forEach(([x,y],i)=>{const a0=Math.atan2(P.y-y,P.x-x)+(i%2?.5:-.5),rot=(i%2?-1:1)*.35*sp();A.put({spr:c.spr,s:c.s||1.8,t0:t,t2:T1+dur+.3,pos:A.at(x,y),glow:c.col});
    NP({k:'seg',sty:'laser',col:c.col,w:7,live:true,t0:t,t1:T1,t2:T1+dur,a:()=>[x,y],b:b=>{const a=a0+Math.max(0,b-T1)*rot;return [x+Math.cos(a)*560,y+Math.sin(a)*560]},dmg:11})})});snd(T1,300,600);return tl()+dur+.4}};
 /* 떼: 작은 물체 떼가 나를 쫓아옴 (잠시 뒤 흩어짐) */
 TM.swarm={chan:'all',tip:n=>n+' 떼가 나를 쫓아옴 → 크게 돌며 끌고 다니다 따돌려',fn:(t,c,L)=>{const m=5+L*2,life=3.2;
  sch(t,()=>{const [cx,cy]=core();for(let i=0;i<m;i++){const T0=t+i*.15,T1=t+tl()+i*.15,a0=i*TAU/m,st={x:cx+Math.cos(a0)*30,y:cy+Math.sin(a0)*22,vx:Math.cos(a0),vy:Math.sin(a0)};
    const h=A.hit({pos:()=>[st.x,st.y],r:5,t0:T0,t1:T1,t2:T1+life,dmg:10});h.step=(q,b,dt)=>{if(b<T1)return;const v=(44+L*6)*sp(),a2=Math.atan2(P.y-st.y,P.x-st.x),a1=Math.atan2(st.vy,st.vx);let d=a2-a1;while(d>Math.PI)d-=TAU;while(d<-Math.PI)d+=TAU;const na=a1+C(d,-2.2*dt,2.2*dt);st.vx=Math.cos(na);st.vy=Math.sin(na);st.x=C(st.x+st.vx*v*dt,AX+4,AX+AW-4);st.y=C(st.y+st.vy*v*dt,AY+4,AY+AH-4)};
    A.put({spr:c.spr,s:(c.s||1.8)*.75,t0:T0,t2:T1+life,pos:()=>[st.x,st.y],face:()=>st.vx<0?-1:1,deco:(Q,b,now,x,y)=>{if(b<T1&&Math.floor(now/120)%2)cRing(x,y,7,'#ff4d6d',.6,1)}})}});snd(t+tl(),300,600);return tl()+m*.15+life+.3}};
 /* 폭산: 내 근처에 박힌 물체가 사방으로 터짐 */
 TM.bloom={chan:'field',tip:n=>'내 근처에 박힌 '+n+'에서 사방으로 탄이 터짐 → 멀리, 터지는 틈으로',fn:(t,c,L)=>{const n=2+L;
  for(let k=0;k<n;k++){const T0=t+k*.9;sch(T0,()=>{const a=RND()*TAU,[x,y]=npIn(P.x+Math.cos(a)*40,P.y+Math.sin(a)*34,20),T1=T0+tl(),m=10+L*2,gap=RND()*TAU;
    A.put({spr:c.spr,s:c.s||1.8,t0:T0,t2:T1+.1,pos:A.at(x,y),pulse:true,deco:(Q,b,now,xx,yy)=>{const p=C((b-T0)/(T1-T0),0,1);cRing(xx,yy,6+p*10,'#ff4d6d',.5+.4*p,1)}});NP({k:'circ',x,y,r:12,t0:T0,t1:T1,t2:T1+.3,col:c.col,dmg:10});
    for(let i=0;i<m;i++){const aa=gap+i*TAU/m;if(i===0)continue;shot(T0,T1,x,y,aa,64,c,{noTel:true,rayL:14})}});snd(T0+tl(),640,200)}
  return (n-1)*.9+tl()+4}};
 /* 벽: 한 줄로 늘어선 물체 벽이 밀려옴 (빈틈 두 칸) */
 TM.wall={chan:'field',tip:n=>'한 줄로 늘어선 '+n+' 벽이 밀려옴 → 초록 화살표 빈틈으로',fn:(t,c,L)=>{const waves=1+(L>=2)+(L>=3),N=10,sw=AW/N,go=2.4;
  for(let w=0;w<waves;w++){const T0=t+w*1.6;sch(T0,()=>{const down=w%2===0,gap=C(Math.floor((P.x-AX)/sw)+(RND()<.5?-2:1),0,N-2),T1=T0+tl(),y0=down?AY+8:AY+AH-8,y1=down?AY+AH+16:AY-16;
    for(let i=0;i<N;i++){if(i===gap||i===gap+1)continue;const x=AX+sw*(i+.5),pos=b=>[x,b<T1?y0:y0+(y1-y0)*C((b-T1)/go,0,1)];A.put({spr:c.spr,s:c.s||1.6,t0:T0,t2:T1+go,pos,ground:true,rot:c.grind?(b=>(down?1:-1)*Math.max(0,b-T1)*10):null,deco:c.grind?((Q,b,now,x,y)=>{if(b>=T1)GRIND(Q,b,now,x,y)}):null});A.hit({pos,r:9,t0:T0,t1:T1,t2:T1+go,dmg:11})}
    arrow(T0,T1,AX+sw*(gap+1),down?AY+30:AY+AH-30,down?Math.PI/2:-Math.PI/2)});snd(T0+tl(),300,500)}
  return (waves-1)*1.6+tl()+go+.3}};
 /* 행렬: 물체들이 줄지어 물결치며 가로지름 */
 TM.snake={chan:'field',tip:n=>'줄지은 '+n+' 행렬이 물결치며 가로지름 → 물결이 높을 때 아래로, 낮을 때 위로',fn:(t,c,L)=>{const rows=1+(L>=3),m=9+L*2,v=(90+L*8)*sp(),T1=t+tl();
  sch(t,()=>{for(let r=0;r<rows;r++){const dir=(r%2?-1:1)*(P.x<AX+AW/2?-1:1),yc=C(P.y+(r?-56:0),AY+30,AY+AH-30),x0=dir>0?AX-10:AX+AW+10,Tr=T1+r*.8,amp=26;
    for(let i=0;i<=20;i++){const u=i/20*AW;}path(t,Tr,x0,yc,x0+dir*AW,yc);
    for(let j=0;j<m;j++){const st=Tr+j*.13,pos=b=>{const u=Math.max(0,b-st)*v,x=x0+dir*u;return [x,yc+Math.sin(u/32)*amp]};A.put({spr:c.spr,s:c.s||1.6,t0:t,t2:st+(AW+20)/v,pos:b=>b<st?[x0,yc]:pos(b),face:()=>dir,inT:.1});A.hit({pos,r:6,t0:t,t1:st,t2:st+(AW+20)/v,dmg:10})}}});
  snd(T1,540,700);return tl()+.8*(rows-1)+m*.13+(AW+20)/((90+L*8)*sp())+.3}};
 /* 반사: 세워 둔 물체에 빛이 맞아 꺾여 나를 노림 */
 TM.mirror={chan:'head',tip:n=>'세워 둔 '+n+'에 보스의 빛이 맞아 꺾여 나를 노림 → 꺾인 흰 선을 피해',fn:(t,c,L)=>{const n=2+L;
  for(let k=0;k<n;k++){const T0=t+k*1.4;sch(T0,()=>{const [gx,gy]=core(),[mx,my]=away(90),a2=Math.atan2(P.y-my,P.x-mx),T1=T0+tl();
    A.put({spr:c.spr,s:c.s||2,t0:T0,t2:T1+.8,pos:A.at(mx,my),glow:c.col,deco:(Q,b,now,x,y)=>{if(b>=T1&&b<T1+.35)cRing(x,y,8+(b-T1)*40,'#ffffff',1-(b-T1)/.35,1)}});
    NP({k:'seg',sty:'laser',col:c.col,w:6,t0:T0,t1:T1,t2:T1+.4,a:()=>[gx,gy],b:()=>[mx,my],dmg:11});NP({k:'seg',sty:'laser',col:'#ffffff',w:7,noCharge:true,t0:T0,t1:T1+.12,t2:T1+.55,a:()=>[mx,my],b:()=>[mx+Math.cos(a2)*560,my+Math.sin(a2)*560],dmg:12});snd(T1+.12,1320,1760)})}
  return n*1.4+tl()+.8}};
 /* 궤적: 물체가 내 줄을 가로지르며 지나간 자리가 터짐 */
 TM.trail={chan:'all',tip:n=>n+' 하나가 내 줄을 가로지르며 지나간 자리가 차례로 터짐 → 지나가기 전에 그 줄에서 벗어나',fn:(t,c,L)=>{const n=1+L;
  for(let k=0;k<n;k++){const T0=t+k*1.6;sch(T0,()=>{const hor=k%2===0,m=hor?C(P.y,AY+20,AY+AH-20):C(P.x,AX+20,AX+AW-20),fwd=RND()<.5,T1=T0+tl(),go=.9,Lw=hor?AW:AH,N=Math.floor(Lw/28);
    const at=q=>{const v=fwd?q:1-q;return hor?[AX+v*AW,m]:[m,AY+v*AH]},pos=b=>at(C((b-T1)/go,0,1));A.put({spr:c.spr,s:c.s||1.8,t0:T0,t2:T1+go,pos,face:()=>fwd?1:-1,ground:hor});
    for(let j=0;j<=N;j++){const q=j/N,[x,y]=at(q);NP({k:'circ',x,y,r:13,t0:T0,t1:T1+q*go+.15,t2:T1+q*go+.75,col:c.col,dmg:11})}});snd(T0+tl(),200,100)}
  return n*1.6+tl()+1.8}};
 window.TM53=TM;

 /* ================= 보스 50명: [물체 그림, 크기, 탄 모양, 탄 크기, 색, 이름말, [[틀, 공격 이름] × 4]] ================= */
 const B={
  b0:['gear',2,'gear',6,'#8eda9e','톱니',[['orbit','톱니 위성'],['charge','톱니바퀴 굴리기'],['wall','톱니 장벽 행진'],['drop','톱니 낙하']]],
  b1:['spark',2.2,'spark',5,'#7fd6ff','전류 구슬',[['turret','테슬라 탑'],['bloom','축전기 폭발'],['swarm','전류 구슬 떼'],['snake','방전 행렬']]],
  b2:['fire',2,'fire',6,'#ff8a3a','불덩이',[['drop','쇳물 국자 붓기'],['trail','용암 발자국'],['bloom','불덩이 폭발'],['orbit','불씨 고리']]],
  b3:['train',1.6,'coal',6,'#c84a3a','화물칸',[['charge','화물칸 돌진'],['snake','열차 칸 행렬'],['drop','석탄 쏟기'],['turret','전조등 탐색']]],
  b4:['icemirror',2,'snow',6,'#a8f0ff','얼음 거울',[['drop','고드름 낙하',{spr:'icicle'}],['mirror','얼음 거울 반사'],['bloom','서리 결정 폭발',{spr:'snow'}],['wall','빙벽 전진',{spr:'icicle'}]]],
  b5:['drone',2.4,'drone',6,'#ff4d6d','드론',[['squad','드론 편대 사격'],['swarm','자폭 드론 떼'],['charge','드론 돌격 대열'],['turret','포탑 드론']]],
  b6:['scrap',2,'scrap',6,'#9aa5ad','고철',[['drop','고철 떨어뜨리기'],['orbit','자력 고철 회전'],['charge','컨테이너 밀기',{spr:'crate'}],['swarm','끌려오는 고철']]],
  b7:['bird',2.4,'gear',6,'#ffd166','뻐꾸기',[['squad','뻐꾸기 편대'],['orbit','태엽 톱니 회전',{spr:'gear'}],['drop','시계추 낙하',{spr:'bob'}],['snake','뻐꾸기 행렬']]],
  b8:['lens',2,'light',5,'#ffe79a','렌즈',[['turret','탐조등 포대'],['mirror','렌즈 굴절'],['squad','렌즈 편대'],['bloom','프리즘 폭발',{spr:'light'}]]],
  b9:['spark',2.2,'spark',6,'#ff5a7a','오메가 모듈',[['squad','모듈 편대'],['charge','수호자 돌진',{spr:'drone'}],['orbit','오메가 위성'],['wall','방어벽 행진',{spr:'gear'}]]],
  b10:['seed',2,'default',5,'#8ab84a','가시씨',[['drop','가시씨 낙하'],['wall','뿌리 장벽',{spr:'thorn'}],['bloom','씨앗 개화'],['trail','뿌리 땅굴',{spr:'thorn'}]]],
  b11:['mush',2,'spore',6,'#c98fe6','버섯',[['swarm','포자 떼',{spr:'spore'}],['bloom','버섯 포자 터뜨리기'],['orbit','포자 고리',{spr:'spore'}],['drop','버섯 낙하']]],
  b12:['frog',2,'bubble',6,'#5aa860','개구리',[['drop','개구리 뛰어들기'],['bloom','거품 터뜨리기',{spr:'bubble'}],['charge','개구리 떼 도약'],['swarm','등불 유혹',{spr:'wisp'}]]],
  b13:['skull',2,'bone',6,'#efe4cd','해골',[['charge','해골 굴리기'],['orbit','뼈 고리',{spr:'bone'}],['swarm','해골 사냥개 떼'],['drop','갈비뼈 낙하',{spr:'bone'}]]],
  b14:['spider',2.2,'egg',6,'#a03a6a','거미',[['drop','거미 낙하'],['bloom','알 부화',{spr:'egg'}],['swarm','새끼 거미 떼'],['wall','거미 행렬 장막']]],
  b15:['bee',2.4,'bee',5,'#ffd23a','말벌',[['swarm','벌떼 추격'],['squad','말벌 편대 독침'],['charge','벌떼 돌격'],['bloom','벌집 폭발',{spr:'hive'}]]],
  b16:['crystal',2,'crystal',6,'#c8a0ff','수정',[['drop','수정 낙하'],['mirror','수정 굴절'],['orbit','수정 위성'],['wall','수정 기둥 행진']]],
  b17:['fish',2,'bubble',6,'#8ac8ff','심해어',[['swarm','심해어 떼'],['bloom','먹물 폭탄',{spr:'void'}],['charge','아귀 새끼 돌진'],['squad','발광 미끼',{spr:'wisp'}]]],
  b18:['ghost',2,'ghost',6,'#d8d0ff','원혼',[['swarm','원혼 떼'],['orbit','등불 원무',{spr:'wisp'}],['squad','유령 합창'],['bloom','잿불 꽃',{spr:'wisp'}]]],
  b19:['tooth',2,'void',6,'#ff2d55','이빨',[['drop','이빨 비'],['orbit','굶주린 눈 위성',{spr:'eye'}],['charge','이빨 행렬'],['swarm','굶주림의 그림자',{spr:'void'}]]],
  pendulum:['bob',2,'bob',7,'#e0a060','시계추',[['drop','괘종 추 낙하'],['charge','진자 행렬'],['orbit','시계추 고리'],['wall','추 장벽']]],
  panopticon:['eye',2.2,'eye',6,'#ff4d6d','감시 눈',[['turret','감시 카메라 포대'],['squad','감시 눈 편대'],['mirror','탐조등 반사',{spr:'lens'}],['swarm','추적 눈']]],
  moth:['moth',2.4,'moth',6,'#c8b8f0','나방',[['swarm','나방 떼'],['orbit','등불 주위 나방'],['squad','나방 편대'],['bloom','인분 폭발',{spr:'dust'}]]],
  bellows:['steam',2,'steam',6,'#d0d0d0','증기 덩이',[['bloom','증기 폭발'],['trail','증기 궤적'],['drop','모루 낙하',{spr:'anvil'}],['charge','모루 굴리기',{spr:'anvil'}]]],
  metronome:['note',2.6,'note',5,'#e0ccff','음표',[['squad','악단 편대'],['wall','오선지 행진'],['orbit','음표 고리'],['drop','박자 추 낙하',{spr:'weight'}]]],
  calendar:['page',2,'page',6,'#fff6e0','달력 낱장',[['drop','달력 낙장'],['wall','페이지 장벽'],['swarm','찢긴 낱장 떼'],['bloom','압정 폭발']]],
  dust:['dust',2.4,'dust',6,'#b8a8d8','먼지 덩이',[['swarm','먼지 덩이 떼'],['trail','먼지 회오리 궤적'],['orbit','먼지 고리'],['charge','빗자루 쓸기',{spr:'broom'}]]],
  scales:['weight',2,'weight',6,'#b8a060','무게추',[['drop','무게추 낙하'],['charge','저울추 굴리기'],['turret','심판의 빛',{spr:'lens'}],['bloom','저울 접시 폭발']]],
  echo:['echo',2.4,'echo',6,'#9de8dc','메아리',[['squad','메아리 편대'],['bloom','울림 폭발'],['orbit','메아리 고리'],['swarm','되돌아오는 부름']]],
  stillness:['gear',2,'ghost',6,'#e8e0ff','멈춘 태엽',[['orbit','멈춘 태엽 고리'],['wall','정지 화면 장벽'],['squad','태엽 합주'],['drop','마지막 박동',{spr:'bob'}]]],
  s4_meteor:['meteor',2,'ember',5,'#ff7a2a','유성',[['drop','유성 낙하'],['charge','유성 질주'],['squad','사냥꾼 표식 편대',{spr:'star4'}],['bloom','유성 폭발']]],
  s4_eclipse:['sunspot',2,'sunspot',6,'#ffb84a','흑점',[['orbit','흑점 위성'],['turret','코로나 포대'],['bloom','플레어 폭발'],['wall','반그림자 장벽']]],
  s4_comet:['comet',2,'comet',6,'#8ad8ff','혜성',[['snake','혜성 꼬리 행렬'],['charge','혜성 돌진'],['drop','혜성 조각 낙하'],['orbit','서리 궤도']]],
  s4_nebula:['plank',2.4,'plank',5,'#c8a0ff','별 플랑크톤',[['swarm','별 플랑크톤 떼'],['wall','성운 해일'],['orbit','플랑크톤 고리'],['snake','고래 노래 행렬']]],
  s4_gemini:['twin',2.2,'twin',6,'#ffe08a','쌍둥이 별',[['squad','쌍둥이 별 편대'],['mirror','거울 쌍둥이 반사'],['orbit','쌍성 공전'],['charge','두 별의 돌진']]],
  s4_void:['darkm',2.2,'darkm',6,'#8a5aff','암흑 물질',[['swarm','암흑 물질 떼'],['bloom','특이점 폭발'],['orbit','중력 위성'],['drop','작은 블랙홀 낙하']]],
  s4_nova:['star4',2,'star4',6,'#ffd04a','태양 별',[['charge','기사단 돌격'],['drop','태양검 비'],['bloom','초신성 폭발'],['turret','태양 포대']]],
  s4_luna:['crescent',2.2,'crescent',6,'#e8f0ff','초승달',[['orbit','초승달 칼날 고리'],['drop','달빛 꽃비'],['charge','초승달 질주'],['bloom','보름달 폭발']]],
  s4_weaver:['needle',1.6,'needle',5,'#e8e0ff','바늘',[['squad','바늘 편대'],['wall','베틀 장벽'],['charge','바늘 꿰매기 돌진'],['turret','별실 포대',{spr:'star4'}]]],
  s4_last:['star4',2.2,'star4',7,'#fff6cf','별',[['squad','별들의 편대'],['orbit','별의 심장 고리'],['bloom','창세 폭발'],['drop','무너지는 하늘']]],
  s5_beacon:['lens',2,'light',6,'#ffd58a','등대 렌즈',[['turret','등대 빛 포대'],['squad','새끼 게 편대',{spr:'crab'}],['mirror','렌즈 반사'],['charge','게 옆걸음 돌진',{spr:'crab'}]]],
  s5_manta:['manta',2.2,'page',6,'#9fe6dd','종이 가오리',[['drop','해도 낙장',{spr:'page'}],['swarm','종이 가오리 떼'],['charge','항로 비행'],['wall','접힌 지도 장벽',{spr:'page'}]]],
  s5_anchor:['anchor',1.8,'weight',6,'#f0ac7d','닻',[['drop','닻 낙하'],['orbit','사슬 철구 회전',{spr:'ball'}],['charge','닻 끌기 돌진'],['wall','창살 장벽',{spr:'thorn'}]]],
  s5_organ:['jelly',2.2,'bubble',6,'#eab7ff','해파리',[['orbit','진주 고리',{spr:'bubble'}],['squad','해파리 성가대 편대'],['bloom','진주 폭발',{spr:'bubble'}],['swarm','해파리 떼']]],
  s5_nautilus:['torpedo',1.8,'bubble',6,'#88d8ff','어뢰',[['charge','어뢰 발사'],['turret','탐조등',{spr:'lens'}],['drop','폭뢰 투하',{spr:'bomb'}],['swarm','추적 어뢰']]],
  s5_eel:['needle',1.6,'spark',5,'#bcff9c','봉합 바늘',[['snake','장어 행렬',{spr:'spark'}],['turret','전극 포대',{spr:'spark'}],['charge','바늘 돌진'],['bloom','방전 폭발',{spr:'spark'}]]],
  s5_octopus:['bell',2,'echo',6,'#ffb2c4','종',[['drop','종 낙하'],['orbit','여덟 종 회전'],['bloom','종소리 폭발'],['squad','촉수 종 편대']]],
  s5_whale:['hourglass',2,'dust',6,'#f7d8a3','모래시계',[['drop','모래시계 낙하'],['wall','모래 해류 장벽',{spr:'dust'}],['charge','고래 돌진',{spr:'whale',s:1.4}],['swarm','모래 떼',{spr:'dust'}]]],
  s5_archive:['page',2,'page',6,'#ffbd8b','문서',[['drop','문서 낙하'],['orbit','조개 문서함 회전'],['wall','책장 장벽'],['swarm','잉크 방울 떼',{spr:'void'}]]],
  s5_heart:['bell',2,'echo',7,'#a8ffe9','귀환종',[['orbit','수문 고리',{spr:'echo'}],['bloom','귀환종 울림'],['squad','종 편대'],['wall','수문 장벽',{spr:'thorn'}]]]};
 /* 다른 파일의 도트 그림도 씀: 닻·폭탄·종·고래(9992) · 철구 */
 const S6P=window.S6PIX||{};PX.anchor=S6P.ANCHOR;PX.bomb=S6P.BOMB;PX.bell=S6P.BELL;PX.whale=S6P.WHALE;PX.ball=A.pix([".KKKK.","KDWDDK","KDDDDK","KDDDDK",".KKKK."],{K:K,D:'#4a4a58',W:'#9a9aaa'});

 /* ---------- 등록: T5_SET[보스] = [[보통], [어려움], [익스트림 2개]] ---------- */
 const tierOf=[0,1,2,2];
 for(const key in B){try{const [sprN,sz,sty,r,col,noun,list]=B[key],sets=[[],[],[]];
  list.forEach(([tm,kr,ov],i)=>{const T=TM[tm];if(!T)return;const spN=(ov&&ov.spr)||sprN,c={spr:SPR(spN,6,col),s:((ov&&ov.s)||sz)*1.35,sty,r,col,noun,grind:spN==='gear'||spN==='scrap'};
   const nm='t6_'+key+'_'+i;defPat(nm,kr,T.chan,8,(['','[어려움] ','[익스트림] ','[익스트림] '][i])+T.tip(noun),tt=>T.fn(tt,c,Math.max(tierOf[i]+1,t5L())));sets[tierOf[i]].push(nm)});
  T5_SET[key]=sets}catch(e){console.error('v53 t6 '+key,e)}}
 window.B53=B;
}catch(e){console.error('v53 ch1-5 extras',e)}})();
