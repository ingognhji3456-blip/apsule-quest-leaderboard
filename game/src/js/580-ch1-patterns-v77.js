/* ================= 챕터 1 보스 전용 패턴 v77: 보스 몸의 부위에서 나오고, 반드시 예고가 먼저 ================= */
const npS=()=>D2().sp,npT=()=>Math.max(1.4,npTel());
/* ── 0 톱니 파수꾼: 어깨 톱니 · 무한궤도 · 가운데 톱니 코어 ── */
defPat('gearLaunch','어깨 톱니 사출','head',10,'어깨 톱니가 빛나며 돌다가 발사돼 벽에 튕김 → 빨간 화살표 궤적을 보고 피해',t=>{const tel=npT(),n=2+G.phase;
 for(let i=0;i<n;i++){const T0=t+i*1.2;sch(T0,()=>{const g=bgeo(),s=i%2?1:-1,sx=g.x+s*(g.hf*U+3),sy=g.sh[0][1]-6,a=Math.atan2(P.y-sy,P.x-sx);npCharge(T0,T0+tel,()=>[sx,sy],'#ffd166');
  NP({k:'orb',sty:'gear',r:8,t0:T0,t1:T0+tel,t2:T0+tel+5,pos:npBounce(sx,sy,a,82*npS(),T0+tel),prev:1.8,prevN:9,dmg:12});sch(T0+tel,()=>{sfx(420,.12,'square',.05,160);G.shake=Math.max(G.shake,.15)})})}
 return (n-1)*1.2+tel+5});
defPat('treadRush','무한궤도 돌진','all',11,'옆으로 물러나 궤도를 굴리다 가로로 돌진 → 빨간 길에서 위아래로 비켜',t=>{const tel=2;let yR=HOME.y,xs=HOME.x,xe=HOME.x;
 sch(t,()=>{const g0=npG(),side=P.x<HOME.x?1:-1;yR=clamp(P.y+30,AY+95,AY+AH-8);xs=side>0?AX+AW-60:AX+60;xe=side>0?AX+60:AX+AW-60;tweenBossNow(xs,yR,t,t+1);G.boss.warn=1;
  const cy=yR-(g0.y-g0.coreY);G.lanes.push({x0:xs,y0:cy,x1:xe,y1:cy,w:g0.hf*2*U,t0:t+1,t1:t+1+tel});sfx(90,1,'sawtooth',.04,60)});
 sch(t+1+tel,()=>{const b=G.boss;b.dash=true;b.dashHit=false;b.warn=0;tweenBossNow(xe,yR,t+1+tel,t+1+tel+.6,p=>p*p);sfx(140,.5,'sawtooth',.07,50)});
 sch(t+1+tel+.6,()=>{const b=G.boss;b.dash=false;G.shake=.5;sfx(60,.4,'square',.1,30);for(let i=0;i<6;i++){const x=lerp(xs,xe,i/6),T0=t+1+tel+.6;NP({k:'circ',x,y:yR+4,r:14,t0:T0,t1:T0+1.2+i*.12,t2:T0+1.5+i*.12,col:'#ffd166',dmg:10})}});
 sch(t+1+tel+2.2,()=>tweenBossNow(HOME.x,HOME.y,t+1+tel+2.2,t+1+tel+3.2));return 1+tel+3.4});
defPat('coreOrbit','코어 톱니 궤도','all',11,'가운데 톱니에서 톱니들이 나와 크게 돌고 돌아옴 → 궤도 화살표 밖, 보스 가까이나 멀리',t=>{const tel=npT(),n=3+G.phase,dur=4.4,dir=RND()<.5?1:-1;npWarn(t,.5);
 sch(t,()=>{const g=bgeo(),cx=g.x,cy=g.coreY,a0=Math.atan2(P.y-cy,P.x-cx);npCharge(t,t+tel,()=>[cx,cy],'#8eda9e');for(let i=0;i<n;i++){const ai=a0+i*TAU/n;NP({k:'orb',sty:'gear',r:9,spin:dir,t0:t,t1:t+tel,t2:t+tel+dur,pos:b=>{const u=clamp((b-(t+tel))/dur,0,1),r=14+Math.sin(u*Math.PI)*150,a=ai+dir*u*4.2;return [cx+Math.cos(a)*r,cy+Math.sin(a)*r*.72]},prev:i===0?dur:dur*.5,prevN:i===0?18:8,dmg:12})}});
 return tel+dur+.3});
/* ── 1 볼트 월: 머리의 테슬라 코일 · 코일 손 ── */
defPat('teslaArc','테슬라 아크','head',10,'머리 코일에서 내 발밑으로 번개 → 번개 원이 뜨면 옆으로',t=>{const tel=npT(),n=3+G.phase;
 for(let k=0;k<n;k++){const T0=t+k*.9;sch(T0,()=>{const g=bgeo(),s=k%2?1:-1,cx=g.x+s*g.hf*U*.62,cy=g.top-10,[x,y]=npIn(P.x,P.y,20);npCharge(T0,T0+tel,()=>[cx,cy],'#bfefff');
  NP({k:'circ',x,y,r:22,label:'⚡',t0:T0,t1:T0+tel,t2:T0+tel+.4,col:'#bfefff',dmg:12});NP({k:'seg',sty:'elec',w:8,t0:T0,t1:T0+tel,t2:T0+tel+.4,a:()=>[cx,cy],b:()=>[x,y],col:'#dff4ff',dmg:0,harm:false});sch(T0+tel,()=>{sfx(1600,.12,'sawtooth',.05,200);G.shake=Math.max(G.shake,.18)})})}
 return (n-1)*.9+tel+.6});
defPat('currentBarrier','전류 방벽','hands',11,'두 코일 손 사이에 전기 벽이 생겨 내려옴 → 초록 화살표 빈틈으로 통과',t=>{const tel=npT(),dur=5.5/npS(),y0=AY+22,y1=AY+AH-12;let gx=HOME.x;
 for(const i of [0,1])tweenHand(i,i?AX+AW-14:AX+14,y0,t,t+1);
 sch(t+1,()=>{gx=clamp(P.x+(RND()-.5)*80,AX+60,AX+AW-60);for(const i of [0,1])G.boss.hands[i].drv=b=>[i?AX+AW-14:AX+14,lerp(y0,y1,clamp((b-(t+1+tel))/dur,0,1))]});
 const Y=b=>lerp(y0,y1,clamp((b-(t+1+tel))/dur,0,1)),gap=56;
 sch(t+1,()=>{NP({k:'seg',sty:'elec',w:8,live:true,t0:t+1,t1:t+1+tel,t2:t+1+tel+dur,a:b=>[AX+14,Y(b)],b:b=>[gx-gap/2,Y(b)],col:'#bfefff',dmg:12});NP({k:'seg',sty:'elec',w:8,live:true,t0:t+1,t1:t+1+tel,t2:t+1+tel+dur,a:b=>[gx+gap/2,Y(b)],b:b=>[AX+AW-14,Y(b)],col:'#bfefff',dmg:12,deco:(o,b,now)=>{const y=Y(b);for(const s of [-1,1])cChevron(gx,y+s*8,s>0?-Math.PI/2:Math.PI/2,'#a6f5c6',1,4)}})});
 sch(t+1+tel+dur,()=>{for(const i of [0,1])G.boss.hands[i].drv=null});npRest(t+1+tel+dur+.1);return 1+tel+dur+.5});
/* ── 2 용광로 골렘: 용광로 문 · 굴뚝 · 쇳물 집게 ── */
defPat('doorBlast','용광로 문 화염','head',10,'용광로가 달아오르며 화염을 부채꼴로 뿜음 → 점선 화살표 사이 틈으로',t=>{const tel=npT(),w=2+Math.min(1,G.phase);npWarn(t,.8);
 for(let k=0;k<w;k++){const T0=t+k*1.1;sch(T0,()=>{const g=bgeo(),cx=g.x,cy=g.coreY+4,a0=Math.atan2(P.y-cy,P.x-cx)+(k%2?.07:-.07);if(k===0)npCharge(T0,T0+tel,()=>[cx,cy],'#ff8a3d');for(let i=0;i<9;i++){const a=a0+(i-4)*.15;npShot(T0,T0+tel,cx,cy,a,(66+(i%2)*10)*npS(),{sty:'fire',r:6,dmg:10})}sch(T0+tel,()=>{sfx(110,.3,'sawtooth',.06,50);G.shake=Math.max(G.shake,.2)})})}
 return (w-1)*1.1+tel+4});
defPat('chimneyEmber','굴뚝 불씨','head',10,'굴뚝에서 불씨가 솟아 떨어질 자리에 원이 뜸 → 원 밖으로',t=>{const tel=1.5,n=6+G.phase*2;
 for(let i=0;i<n;i++){const T0=t+i*.45;sch(T0,()=>{const g=bgeo(),s=i%2?1:-1,cx=g.x+s*g.hf*U*.5,cy=g.top-8,[tx,ty]=npIn(P.x+(RND()-.5)*120,P.y+(RND()-.5)*80,16);spawnPuff(cx,cy,3,'#6a5a50');
  NP({k:'orb',sty:'fire',r:4,harm:false,noTel:true,t0:T0,t1:T0,t2:T0+tel,pos:b=>{const p=clamp((b-T0)/tel,0,1);return [lerp(cx,tx,p),lerp(cy,ty,p)-Math.sin(p*Math.PI)*90]}});NP({k:'circ',x:tx,y:ty,r:16,t0:T0,t1:T0+tel,t2:T0+tel+.7,col:'#ff6a20',dmg:10});sch(T0,()=>sfx(260,.08,'square',.02,500))})}
 return n*.45+tel+.8});
defPat('moltenFist','쇳물 주먹','hands',11,'집게를 용광로에 담갔다가 내 위에서 내려찍음 → 녹은 웅덩이를 피해',t=>{const tel=npT(),n=2+Math.min(1,G.phase);
 for(let k=0;k<n;k++){const h=k%2,T0=t+k*2.4;sch(T0,()=>{const g=bgeo();tweenHand(h,g.x+(h?12:-12),g.coreY,T0,T0+.6)});
  sch(T0+.7,()=>{const [x,y]=npIn(P.x,P.y,26);tweenHand(h,x,y-52,T0+.7,T0+.7+tel*.7);NP({k:'circ',x,y,r:30,t0:T0+.7,t1:T0+.7+tel,t2:T0+.7+tel+2.6,col:'#ff6a20',dmg:12,deco:(o,b,now)=>{if(b<o.t1){const hd=G.boss.hands[h];if(Math.floor(now/90)%2)cPx(hd.x+(RND()-.5)*8,hd.y+10+RND()*8,2,'#ffb020',1)}}});sch(T0+.7+tel-.25,()=>tweenHand(h,x,y-6,T0+.7+tel-.25,T0+.7+tel));sch(T0+.7+tel,()=>{G.shake=.35;sfx(70,.3,'square',.08,35);spawnPuff(x,y,12,'#ffb020')})})}
 npRest(t+n*2.4+.8);return n*2.4+.8+tel});
/* ── 3 철갑 열차: 전조등 · 굴뚝 기적 · 석탄 ── */
defPat('headlamp','전조등 섬광','head',10,'전조등이 켜지며 빛줄기가 부채꼴로 훑음 → 훑는 방향 반대로',t=>{const tel=npT(),n=1+Math.min(1,G.phase);
 for(let k=0;k<n;k++){const T0=t+k*2.6;sch(T0,()=>{const g=bgeo(),lx=g.x,ly=g.headY+6,dir=k%2?1:-1,a0=Math.atan2(P.y-ly,P.x-lx)-dir*.9,sw=1.8,dur=1.6;npCharge(T0,T0+tel,()=>[lx,ly],'#fff4c8');
  NP({k:'seg',sty:'laser',w:16,col:'#fff4c8',live:true,t0:T0,t1:T0+tel,t2:T0+tel+dur,a:()=>[lx,ly],b:b=>{const a=a0+dir*sw*clamp((b-(T0+tel))/dur,0,1);return [lx+Math.cos(a)*420,ly+Math.sin(a)*420]},dmg:12,deco:(o,b,now)=>{if(b<o.t1)for(let i=0;i<6;i++){const a=a0+dir*sw*i/5;cChevron(lx+Math.cos(a)*80,ly+Math.sin(a)*80,a+dir*Math.PI/2,'#ffd166',.9,3)}}});sch(T0+tel,()=>sfx(900,.4,'sine',.03,700))})}
 return (n-1)*2.6+tel+1.8});
defPat('steamWhistle','증기 기적','head',10,'굴뚝에서 증기 고리가 퍼짐 → 점선이 없는 빈 방향으로',t=>{const tel=npT(),w=2+G.phase;
 for(let k=0;k<w;k++){const T0=t+k*1;sch(T0,()=>{const g=bgeo(),cx=g.x-g.hf*U*.3,cy=g.top-16,n=16,gap=Math.floor(RND()*n);for(let i=0;i<n;i++){if(Math.abs(i-gap)<=1||Math.abs(i-gap)>=n-1)continue;const a=i*TAU/n+k*.2;npShot(T0,T0+tel,cx,cy,a,54*npS(),{sty:'steam',r:7,col:'#e8e8e8',rayL:36,dmg:9})}sch(T0+tel,()=>{sfx(740,.35,'square',.03,760);spawnPuff(cx,cy,6,'#e8e8e8')})})}
 return (w-1)+tel+4});
defPat('coalShot','석탄 삽질','hands',9,'손으로 석탄을 퍼 던짐 → 떨어질 원 밖으로',t=>{const tel=1.5,w=3+G.phase;npHands(t,.6,30,6);
 for(let k=0;k<w;k++){const ts=t+.7+k*.9;sch(ts,()=>{const h=G.boss.hands[k%2];h.kick=1;for(let i=0;i<4;i++){const [tx,ty]=npIn(P.x+(RND()-.5)*110,P.y+(RND()-.5)*70,18),x0=h.x,y0=h.y;
  NP({k:'orb',sty:'coal',r:4,harm:false,noTel:true,t0:ts,t1:ts,t2:ts+tel,pos:b=>{const p=clamp((b-ts)/tel,0,1);return [lerp(x0,tx,p),lerp(y0,ty,p)-Math.sin(p*Math.PI)*60]}});NP({k:'circ',x:tx,y:ty,r:15,t0:ts,t1:ts+tel,t2:ts+tel+1.2,col:'#ff6a20',dmg:10})}sfx(300,.1,'square',.03,120)})}
 npRest(t+.7+w*.9+.3);return .7+w*.9+tel+1.3});
/* ── 4 극저온 코어: 궤도 결정 · 결정 성장 · 거울 ── */
defPat('shardLaunch','궤도 결정 사출','head',10,'주위를 돌던 얼음 결정이 멈춰 나를 겨눔 → 점선 방향에서 옆으로',t=>{const tel=npT(),n=4+G.phase*2;
 for(let i=0;i<n;i++){const T0=t+i*.45;sch(T0,()=>{const g=bgeo(),a=i*TAU/4+T0,x=g.x+Math.cos(a)*54,y=g.coreY+Math.sin(a)*26,aim=Math.atan2(P.y-y,P.x-x);npShot(T0,T0+tel,x,y,aim,96*npS(),{sty:'crystal',r:6,col:'#c8f6ff',dmg:10,rayL:70})})}
 return n*.45+tel+3});
defPat('crystalGrow','서리 결정 성장','field',10,'코어에서 얼음 가지가 뻗어 나가며 갈라짐 → 가지 사이 틈으로',t=>{const tel=npTel(),g0=npG(),arms=3+G.phase;
 sch(t,()=>{const a0=Math.atan2(P.y-g0.coreY,P.x-HOME.x);npCharge(t,t+tel,()=>[HOME.x,g0.coreY],'#c8f6ff');const grow=(x,y,a,len,t1,depth)=>{const ex=x+Math.cos(a)*len,ey=y+Math.sin(a)*len;NP({k:'seg',sty:'laser',w:6,col:'#c8f6ff',t0:t,t1,t2:t1+2.4,a:()=>[x,y],b:b=>{const q=clamp((b-t1)/.5,0,1);return [lerp(x,ex,q),lerp(y,ey,q)]},dmg:11});if(depth<2){grow(ex,ey,a-.55,len*.7,t1+.5,depth+1);grow(ex,ey,a+.55,len*.7,t1+.5,depth+1)}};
  for(let i=0;i<arms;i++)grow(HOME.x,g0.coreY,a0+i*TAU/arms,70,t+tel,0);sch(t+tel,()=>sfx(1600,.3,'triangle',.03,800))});
 return tel+1+2.6});
defPat('mirrorShard','얼음 거울 반사','head',10,'눈에서 쏜 빛이 얼음 거울들에 꺾여 나감 → 점선 경로 밖으로',t=>{const tel=Math.max(1.6,npTel()),chains=1+(G.phase>=1?1:0);npEye(t,t+tel,t+tel+1.4);
 for(let c=0;c<chains;c++){const ts=t+c*1.8;sch(ts,()=>{const g=bgeo();const pts=[[g.x,g.headY]];for(let k=0;k<3;k++)pts.push(npIn(AX+40+RND()*(AW-80),AY+40+RND()*(AH-80),30));pts.push(npIn(P.x,P.y,10));
  for(let k=1;k<pts.length-1;k++){const [x,y]=pts[k],fly=ts+k*.15;NP({k:'orb',sty:'crystal',r:6,harm:false,noTel:true,t0:ts,t1:ts,t2:ts+tel+1.4,pos:b=>{const q=clamp((b-ts)/.5,0,1);return [lerp(g.x,x,q),lerp(g.coreY,y,q)]}})}
  for(let k=0;k<pts.length-1;k++){const A=pts[k],B=pts[k+1];NP({k:'seg',sty:'laser',w:7,col:'#c8f6ff',t0:ts+.5,t1:ts+tel,t2:ts+tel+1.2,a:()=>A,b:()=>B,dmg:12})}sch(ts+tel,()=>{sfx(1400,.3,'sawtooth',.03,700);G.shake=Math.max(G.shake,.2)})})}
 return (chains-1)*1.8+tel+1.4});
/* ── 5 스톰 하이브: 드론 발진 ── */
defPat('droneLaunch','드론 발진 포위','field',11,'보스에서 드론이 날아가 나를 둘러싼 뒤 가운데로 돌진 → 초록 화살표 빈자리로 탈출',t=>{const tel=npT(),n=9;
 sch(t,()=>{const g=bgeo(),hx=g.x,hy=g.y-6,cx=P.x,cy=P.y,R=100,gap=Math.floor(RND()*n),tf=t+1+tel;for(let i=0;i<n;i++){if(i===gap)continue;const a=i*TAU/n,rx=cx+Math.cos(a)*R,ry=cy+Math.sin(a)*R*.85,ex=cx-Math.cos(a)*R*1.3,ey=cy-Math.sin(a)*R*1.1;
  const pos=b=>b<t+1?[lerp(hx,rx,clamp(b-t,0,1)),lerp(hy,ry,clamp(b-t,0,1))-Math.sin(clamp(b-t,0,1)*Math.PI)*30]:b<tf?[rx,ry]:npLin(rx,ry,ex,ey,tf,tf+1.6/npS())(b);
  NP({k:'orb',sty:'drone',r:6,t0:t,t1:tf,t2:tf+1.6/npS(),pos,ray:Math.atan2(cy-ry,cx-rx),rayL:40,chg:false,dmg:11,deco:(o,b,now)=>{if(b<o.t1){const [x,y]=pos(b);npSpr('drone',x,y,6,now,o,b)}}})}
  const ga=gap*TAU/n;NP({k:'orb',harm:false,noTel:true,r:1,t0:t,t1:tf,t2:tf+.01,pos:()=>[cx,cy],deco:(o,b)=>{if(b<o.t1)cChevron(cx+Math.cos(ga)*(R+14),cy+Math.sin(ga)*(R+14)*.85,ga,'#a6f5c6',1,5)}});sfx(600,.3,'square',.02,900)});
 return 1+tel+1.8});
defPat('carpetBomb','융단 폭격','field',10,'보스에서 나온 폭격 드론이 줄을 따라 폭탄을 떨굼 → 드론이 지나는 줄 밖으로',t=>{const tel=npTel(),passes=2+Math.min(1,G.phase);
 for(let k=0;k<passes;k++){const ts=t+k*2.2;sch(ts,()=>{const g=bgeo(),vert=k%2===1,pos=vert?clamp(P.x,AX+30,AX+AW-30):clamp(P.y,AY+30,AY+AH-30),dur=2.4/npS(),x0=vert?pos:AX-10,y0=vert?AY-10:pos,x1=vert?pos:AX+AW+10,y1=vert?AY+AH+10:pos;
  NP({k:'orb',sty:'drone',r:6,harm:false,t0:ts,t1:ts+.8,t2:ts+.8+dur,pos:b=>b<ts+.8?[lerp(g.x,x0,(b-ts)/.8),lerp(g.y-6,y0,(b-ts)/.8)]:npLin(x0,y0,x1,y1,ts+.8,ts+.8+dur)(b),prev:dur,prevN:10,deco:(o,b,now)=>{if(b<o.t1){const [x,y]=o.pos(b);npSpr('drone',x,y,6,now,o,b)}}});
  for(let i=1;i<9;i++){const u=i/9,bx=lerp(x0,x1,u),by=lerp(y0,y1,u),td=ts+.8+dur*u;NP({k:'circ',x:bx,y:by,r:20,t0:ts+.8,t1:td+1,t2:td+1.3,dmg:11})}})}
 return (passes-1)*2.2+.8+2.4+1.5});
/* ── 6 자석 크레인: 집게 · 자력 · 붐 끝 철구 ── */
defPat('clawDrop','크레인 집게','hands',10,'집게가 떨어진 뒤 보스 쪽으로 끌고 감 → 세로줄과 끌리는 길을 피해',t=>{const tel=npT(),n=2+Math.min(1,G.phase);
 for(let k=0;k<n;k++){const ts=t+k*2.4;sch(ts,()=>{const x=clamp(P.x,AX+20,AX+AW-20),W2=28,drag=1.4/npS(),xe=HOME.x;NP({k:'rect',t0:ts,t1:ts+tel,t2:ts+tel+.4+drag,col:'#ffd166',dmg:14,rf:b=>{const q=clamp((b-(ts+tel))/.35,0,1),dq=clamp((b-(ts+tel+.4))/drag,0,1),cx=lerp(x,xe,dq*dq);return [cx-W2/2,AY,W2,lerp(20,AH,q)]},
  deco:(o,b,now)=>{const [x2,y2,w2,h2]=o.rf(Math.max(b,o.t1));const cx=x2+w2/2,cy=b<o.t1?AY+12:y2+h2;R(cx-1,AY,3,cy-AY,'#5a5040');R(cx-8,cy-6,16,6,'#8a7440');R(cx-9,cy,4,8,'#c9d3d8');R(cx+5,cy,4,8,'#c9d3d8')}});sch(ts+tel,()=>{sfx(90,.3,'square',.07,40);G.shake=Math.max(G.shake,.25)})})}
 return (n-1)*2.4+tel+2});
defPat('scrapPull','고철 끌어당기기','field',9,'바닥 고철이 보스의 자석으로 날아감 → 고철과 보스 사이에 서지 마',t=>{const tel=Math.max(1.6,npTel()),n=7+G.phase*2,g0=npG();
 sch(t,()=>{npCharge(t,t+tel,()=>[HOME.x,g0.coreY],'#ff5d5d');for(let i=0;i<n;i++){const a=i*TAU/n+RND()*.3,R=150+RND()*40,x=clamp(HOME.x+Math.cos(a)*R,AX+12,AX+AW-12),y=clamp(g0.coreY+Math.sin(a)*R*.7,AY+12,AY+AH-12);NP({k:'orb',sty:'scrap',r:6,t0:t,t1:t+tel,t2:t+tel+1.6/npS(),pos:npLin(x,y,HOME.x,g0.coreY,t+tel,t+tel+1.6/npS()),prev:1.6,prevN:7,dmg:11})}sfx(150,1,'sawtooth',.03,300)});
 return tel+2});
defPat('wreckingBall','붐 끝 철구','all',10,'크레인 붐 끝에 매단 철구가 크게 흔들림 → 철구가 지나간 직후로',t=>{const tel=npT(),dur=6,L=190,A=1.15,w=1.4*npS();let px=HOME.x,py=AY;
 sch(t,()=>{const g=bgeo();px=g.x+g.hf*U*1.4;py=g.top-26});const pos=b=>{const a=Math.PI/2+A*Math.sin(w*(b-(t+tel)));return [px+Math.cos(a)*L,py+Math.sin(a)*L]};
 NP({k:'seg',sty:'chain',w:4,harm:false,t0:t,t1:t+tel,t2:t+tel+dur,a:()=>[px,py],b:pos});
 NP({k:'orb',sty:'scrap',r:16,t0:t,t1:t+tel,t2:t+tel+dur,pos,dmg:16,prev:1.1,prevN:10,deco:(o,b,now)=>{if(b>=o.t1){const [x,y]=pos(b);pcirc(x,y,16,'#3a4048',1);pcirc(x,y,12,'#6a7480',1);R(Math.round(x-6),Math.round(y-8),4,3,'#c9d3d8')}}});
 return tel+dur});
/* ── 7 시계탑 자동인형: 시곗바늘 · 뻐꾸기 · 태엽 ── */
defPat('scissorHands','시침·분침 가위','head',10,'시계 바늘 두 개가 양쪽에서 가위처럼 닫힘 → 닫히는 쪽 반대편으로',t=>{const tel=npT(),n=2+Math.min(1,G.phase),g0=npG(),L=300;
 for(let k=0;k<n;k++){const ts=t+k*2.2;sch(ts,()=>{const cx=HOME.x,cy=g0.coreY,aP=Math.atan2(P.y-cy,P.x-cx),sp=1.2,dur=1.3;for(const s of [-1,1]){const a0=aP+s*sp;NP({k:'seg',sty:'hand',w:6,col:s>0?'#f0a6c8':'#fff0a0',live:true,t0:ts,t1:ts+tel,t2:ts+tel+dur,a:()=>[cx,cy],b:b=>{const q=clamp((b-(ts+tel))/dur,0,1),a=a0-s*sp*q*q;return [cx+Math.cos(a)*L,cy+Math.sin(a)*L]},dmg:13})}sch(ts+tel+dur,()=>{sfx(1800,.06,'square',.04,900);G.shake=Math.max(G.shake,.2)})})}
 return (n-1)*2.2+tel+1.5});
defPat('cuckoo','뻐꾸기 시계','head',10,'머리 문이 열리고 뻐꾸기가 물결치며 날아옴 → 물결 사이로',t=>{const tel=npT(),w=3+G.phase;npEye(t,t+tel,t+tel+w*.9);
 for(let k=0;k<w;k++){const T0=t+k*.9,tf=T0+tel;sch(T0,()=>{const g=bgeo(),a0=Math.atan2(P.y-g.headY,P.x-g.x);if(k===0)npCharge(T0,tf,()=>[g.x,g.headY],'#ffe7a8');for(let i=-1;i<=1;i++){const a=a0+i*.35;NP({k:'orb',sty:'bird',r:5,t0:T0,t1:tf,t2:tf+5,pos:b=>{const s=Math.max(0,b-tf)*64*npS(),o=Math.sin(Math.max(0,b-tf)*5+i)*16;return [g.x+Math.cos(a)*s-Math.sin(a)*o,g.headY+Math.sin(a)*s+Math.cos(a)*o]},prev:1.4,prevN:7,dmg:9})}sch(tf,()=>{sfx(900,.1,'sine',.04,700);setTimeout(()=>sfx(700,.12,'sine',.04,560),120)})})}
 return tel+w*.9+3});
defPat('windSpiral','태엽 감기','field',10,'태엽처럼 소용돌이로 불이 번짐 → 소용돌이 바깥 틈으로',t=>{const tel=npTel(),arms=2+(G.phase>=2?1:0),g0=npG(),n=14,dir=RND()<.5?1:-1;npCharge(t,t+tel,()=>[HOME.x,g0.coreY],'#f0a6c8');
 for(let a=0;a<arms;a++)for(let i=0;i<n;i++){const r=26+i*12,ang=a*TAU/arms+dir*i*.42,x=HOME.x+Math.cos(ang)*r,y=g0.coreY+Math.sin(ang)*r*.8;if(x<AX+10||x>AX+AW-10||y<AY+10||y>AY+AH-10)continue;const ts=t+i*.14;NP({k:'circ',x,y,r:13,t0:t,t1:ts+tel,t2:ts+tel+.5,col:'#f0a6c8',dmg:11})}
 return n*.14+tel+.6});
/* ── 8 광학 요새: 반사 · 초점 · 분광 ── */
function npReflect(x,y,a,n){const pts=[[x,y]];for(let k=0;k<=n;k++){const dx=Math.cos(a),dy=Math.sin(a);let tx=dx>0?(AX+AW-x)/dx:dx<0?(AX-x)/dx:1e9,ty=dy>0?(AY+AH-y)/dy:dy<0?(AY-y)/dy:1e9;const tt=Math.min(tx,ty);x+=dx*tt;y+=dy*tt;pts.push([x,y]);if(tx<ty)a=Math.PI-a;else a=-a}return pts}
defPat('ricochetLaser','반사 레이저','head',9,'레이저가 벽에 꺾여 튕김 → 점선이 지나지 않는 칸으로',t=>{const tel=Math.max(1.6,npTel()),n=1+(G.phase>=1?1:0);npEye(t,t+tel,t+tel+1.2);
 for(let c=0;c<n;c++){const ts=t+c*1.6;sch(ts,()=>{const g=bgeo(),a=Math.atan2(P.y-g.headY,P.x-g.x)+(c?.5:0),pts=npReflect(g.x,g.headY,a,2+G.phase);npCharge(ts,ts+tel,()=>[g.x,g.headY],'#7dffd0');for(let k=0;k<pts.length-1;k++){const A=pts[k],B=pts[k+1];NP({k:'seg',sty:'laser',w:8,col:'#7dffd0',t0:ts,t1:ts+tel,t2:ts+tel+1,a:()=>A,b:()=>B,dmg:13})}sch(ts+tel,()=>{sfx(1000,.3,'sawtooth',.04,300);G.shake=Math.max(G.shake,.2)})})}
 return (n-1)*1.6+tel+1.2});
defPat('focusLens','초점 태우기','head',9,'돔 눈의 빛이 모여 나를 따라오다 멈춰 탐 → 원이 멈추면 밖으로',t=>{const n=2+Math.min(1,G.phase),fol=2.2;npEye(t,t+1,t+n*1.4+fol+1);
 for(let k=0;k<n;k++){const ts=t+k*1.4;const o=NP({k:'circ',x:P.x,y:P.y,r:60,t0:ts,t1:ts+fol+.7,t2:ts+fol+1.2,cf:b=>[o.x,o.y,b<ts+fol?lerp(60,20,clamp((b-ts)/fol,0,1)):20],dmg:14,col:'#ffffff',
  step:(o,b,dt)=>{if(b<ts+fol){o.x+=(P.x-o.x)*Math.min(1,dt*3.2);o.y+=(P.y-o.y)*Math.min(1,dt*3.2)}},deco:(o,b,now)=>{const g=bgeo();line(g.x,g.headY,o.x,o.y,5,(x,y,i)=>{if(i%2===0)cPx(x,y,2,'#7dffd0',b<o.t1?.5:1)});if(b<o.t1){const r=o.cf(b)[2];for(let i=0;i<4;i++){const a=i*TAU/4+now/200;cPx(o.x+Math.cos(a)*r,o.y+Math.sin(a)*r,3,'#7dffd0',1)}}}});sch(ts+fol+.7,()=>sfx(1600,.2,'sine',.04,400))}
 return (n-1)*1.4+fol+1.4});
defPat('spectrum','분광 부채','head',10,'눈빛이 일곱 색으로 갈라져 천천히 회전 → 색 사이 틈을 따라 돌아',t=>{const tel=npT(),dur=3.2,g0=npG(),cols=['#ff4d4d','#ff9a40','#ffe36b','#7dff7a','#5dd0ff','#6a7aff','#c07aff'],dir=RND()<.5?1:-1;npEye(t,t+tel,t+tel+dur);
 sch(t,()=>{const a0=Math.atan2(P.y-g0.headY,P.x-HOME.x)+dir*.35;npCharge(t,t+tel,()=>[HOME.x,g0.headY],'#ffffff');cols.forEach((c,i)=>{const a=a0+(i-3)*.34;NP({k:'seg',sty:'laser',w:6,col:c,live:true,t0:t,t1:t+tel,t2:t+tel+dur,a:()=>[HOME.x,g0.headY],b:b=>{const aa=a-dir*.5*Math.max(0,b-(t+tel));return [HOME.x+Math.cos(aa)*420,g0.headY+Math.sin(aa)*420]},dmg:12})})});
 return tel+dur+.3});
/* ── 9 오메가 엔진: 챕터 1 수호자들의 공격을 섞어서 난사 ── */
const OMEGA_POOL=[['gearRail',0],['gearLaunch',0],['coreOrbit',0],['voltStrike',1],['teslaArc',1],['geyserWave',2],['doorBlast',2],['chimneyEmber',2],['steamWhistle',3],['headlamp',3],['frostNova',4],['iceWave',4],['shardLaunch',4],['droneSwarm',5],['droneLaunch',5],['magnetField',6],['scrapPull',6],['hourStrike',7],['scissorHands',7],['cuckoo',7],['scanCones',8],['prism',8],['ricochetLaser',8],['spectrum',8]];
defPat('omegaMedley','수호자 합주 난사','all',11,'앞선 수호자들의 공격이 한꺼번에 쏟아짐 → 먼저 뜬 예고부터 차례로 피해',t=>{const k=2+(G.phase>=2?1:0),pool=OMEGA_POOL.filter(([n])=>MV[n]),used=new Set(),picks=[];
 while(picks.length<k&&used.size<pool.length){const [n,src]=pool[Math.floor(RND()*pool.length)];if([...picks].some(p=>p[1]===src)||used.has(n)){used.add(n);continue}used.add(n);(CHAN[n]==='hands'&&picks.some(q=>CHAN[q[0]]==='hands'))?0:picks.push([n,src])}
 let len=0;picks.forEach(([n],i)=>{const st=t+i*1.3;const l=MV[n](st);len=Math.max(len,i*1.3+(Number.isFinite(l)?l:8))});sch(t,()=>{G.boss.warn=.6;sfx(220,.5,'sawtooth',.05,880)});return len});

