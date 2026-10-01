/* ================= 시즌 4 · ECLIPSE — 별의 수호자 전용 패턴 (모두 예고 후 발사) ================= */
const n4S=()=>D2().sp,n4T=()=>Math.max({easy:2.1,normal:1.45,hard:1.05,extreme:.8}[diff]||1.4,npTel());
/* 1 유성 사냥꾼: 유성우 — 낙하 지점에 원이 먼저 뜨고 유성이 떨어짐, 마지막엔 플레이어 위치 집중 */
defPat('meteorRain','유성우','field',10,'바닥의 ☄ 원이 차오르면 유성이 떨어짐 → 원 밖으로, 마지막 3개는 나를 노림',t=>{const tel=n4T(),n=7+G.phase*3;
 for(let i=0;i<n;i++){const T0=t+i*.35;sch(T0,()=>{const aim=i>=n-3,[x,y]=aim?npIn(P.x+(RND()-.5)*20,P.y+(RND()-.5)*20,20):npIn(AX+30+RND()*(AW-60),AY+40+RND()*(AH-60),20);
  NP({k:'circ',x,y,r:18,label:'☄',t0:T0,t1:T0+tel,t2:T0+tel+.35,col:'#ffb070',dmg:12});
  NP({k:'orb',sty:'ember',col:'#ffe0a0',r:6,t0:T0+tel-.45,t1:T0+tel-.45,t2:T0+tel,harm:false,noTel:true,pos:b=>{const q=Math.min(1,(b-(T0+tel-.45))/.45);return [x-60+60*q,y-160+160*q]}});
  sch(T0+tel,()=>{G.shake=Math.max(G.shake,.25);sfx(90,.25,'sawtooth',.06,40)})})}
 return (n-1)*.35+tel+.6});
/* 2 일식의 눈: 일식 고리 — 달이 해를 가리며 고리가 두 겹으로 조여듦, 빈틈이 반대로 돎 */
defPat('eclipseRing','일식 고리','head',11,'두 겹의 고리가 안쪽으로 조여듦 → 빈틈 두 개가 서로 반대로 돌아, 겹치는 순간 통과',t=>{const tel=n4T()+.4,dur=4.2,cx=P.x,cy=P.y;
 sch(t,()=>{npCharge(t,t+tel,()=>{const g=bgeo();return [g.x,g.coreY]},'#ffd98a');sfx(200,1,'sine',.04,120)});
 for(const [r0,dir,col] of [[150,1,'#ffd98a'],[120,-1,'#ff8a5a']]){const n=34;for(let i=0;i<n;i++){if(i%17<3)continue;const a0=i*TAU/n;
  NP({k:'orb',sty:'star4',col,r:5,t0:t,t1:t+tel,t2:t+tel+dur,noTel:true,pos:b=>{const q=Math.max(0,b-t),r=Math.max(16,r0-Math.max(0,b-t-tel)*28*n4S()),a=a0+dir*q*.55;return [cx+Math.cos(a)*r,cy+Math.sin(a)*r]},dmg:10})}}
 return tel+dur});
/* 3 혜성 뱀: 혜성 꼬리 — 혜성이 휘어 날며 지나간 자리에 불꽃 꼬리가 잠시 남음 */
defPat('cometTail','혜성 꼬리','all',11,'혜성이 S자로 날고 지나간 길에 꼬리가 남음 → 꼬리 사이 빈 곳으로',t=>{const tel=n4T(),n=2+Math.min(2,G.phase);
 for(let k=0;k<n;k++){const T0=t+k*1.6;sch(T0,()=>{const g=bgeo(),sx=g.x,sy=g.coreY,dir=k%2?1:-1,amp=50+RND()*30,path=b=>{const q=(b-(T0+tel))*.9*n4S();return [sx+dir*q*110,sy+q*120+Math.sin(q*4)*amp]};
  for(let s=0;s<12;s++){const tt=T0+tel+s*.12;const [px,py]=path(tt),[qx,qy]=npIn(px,py,10);NP({k:'circ',x:qx,y:qy,r:10,t0:T0,t1:tt,t2:tt+1.6,col:'#8ae8ff',dmg:10})}
  NP({k:'orb',sty:'comet',col:'#e8faff',r:9,t0:T0,t1:T0+tel,t2:T0+tel+1.6,pos:b=>{const [x,y]=path(b);return npIn(x,y,4)},dmg:14,deco:()=>{}});sch(T0+tel,()=>sfx(600,.5,'sawtooth',.04,120))})}
 return (n-1)*1.6+tel+2});
/* 4 성운 고래: 성운 해일 — 가로 물결이 위아래로 밀려옴, 한 줄씩 빈 칸 */
defPat('nebulaTide','성운 해일','field',11,'성운 물결이 위에서 아래로 밀려옴 → 물결마다 뚫린 칸으로 들어가',t=>{const tel=n4T(),n=3+G.phase,cols=8,cw=AW/cols;
 for(let k=0;k<n;k++){const T0=t+k*1.5,gap=Math.floor(RND()*cols),gap2=(gap+1+Math.floor(RND()*(cols-2)))%cols;sch(T0,()=>{for(let c=0;c<cols;c++){if(c===gap||(G.phase>=1?false:c===gap2))continue;const x=AX+c*cw;
  NP({k:'rect',x,y:AY,w:cw-2,h:18,t0:T0,t1:T0+tel,t2:T0+tel+2.2,col:'#b08aff',dmg:10,live:true,step:(o,b)=>{if(b>=o.t1)o.y=AY+(b-o.t1)*110*n4S()}})}sfx(160,.6,'sine',.04,90)})}
 return (n-1)*1.5+tel+2.4});
/* 5 쌍둥이 성좌: 거울 쌍둥이 — 보스와 화면 반대편 거울상이 동시에 쏨 */
defPat('mirrorTwin','거울 쌍둥이','hands',10,'보스와 반대편 유령이 똑같이 쏨 → 두 줄기 사이 비스듬한 틈으로',t=>{const tel=n4T(),n=4+G.phase;npHands(t,.5,26,-4);
 for(let k=0;k<n;k++){const T0=t+.5+k*.8;sch(T0,()=>{const g=bgeo(),x1=g.x,y1=g.coreY,x2=AX+AW-(x1-AX),y2=AY+AH-(y1-AY)+10;for(const [x,y] of [[x1,y1],[x2,y2]]){const a=Math.atan2(P.y-y,P.x-x);for(const o of [-.14,0,.14])npShot(T0,T0+tel,x,y,a+o,78*n4S(),{sty:'star4',col:x===x1?'#8ae8ff':'#ff9ad5',r:5,rayL:50,chg:false,dmg:9})}
  NP({k:'circ',x:x2,y:y2,r:14,t0:T0,t1:T0+tel,t2:T0+tel+.05,col:'#ff9ad5',dmg:0,harm:false,label:'◇'})})}
 npRest(t+.5+n*.8+tel+.5);return .5+n*.8+tel+1});
/* 6 블랙홀 방랑자: 중력 우물 — 끌어당기며 주위에 부스러기가 돎 */
defPat('gravityWell','중력 우물','field',11,'블랙홀이 나를 끌어당기고 주위를 파편이 돎 → 반대로 대시하며 파편 틈으로',t=>{const tel=n4T()+.2,dur=4+G.phase;
 sch(t,()=>{const [x,y]=npIn(P.x<HOME.x?AX+AW*.7:AX+AW*.3,AY+AH*.55,40);G.pull={x,y,str:46+G.phase*8,t0:t+tel,t1:t+tel+dur,tp:t,kind:'suck'};
  NP({k:'circ',x,y,r:22,label:'●',t0:t,t1:t+tel,t2:t+tel+dur,col:'#b86aff',dmg:14});
  const n=10;for(let i=0;i<n;i++){const a0=i*TAU/n;NP({k:'orb',sty:'darkm',col:'#e0b8ff',r:5,t0:t,t1:t+tel,t2:t+tel+dur,noTel:true,pos:b=>{const q=Math.max(0,b-t),r=70-Math.max(0,b-t-tel)*6;return [x+Math.cos(a0+q*1.3)*r,y+Math.sin(a0+q*1.3)*r*.8]},dmg:9})}sfx(60,2,'sawtooth',.05,30)});
 return tel+dur+.4});
/* 7 초신성 기사: 초신성 — 세 번 부풀어 터짐, 매번 빈틈이 다른 곳 */
defPat('novaBurst','초신성','head',11,'코어가 세 번 부풀며 폭발 → 매번 뚫린 방향이 바뀜, 세 번째가 가장 큼',t=>{const tel=n4T();
 for(let k=0;k<3;k++){const T0=t+k*1.4;sch(T0,()=>{const g=bgeo(),n=20+k*6,gap=Math.atan2(P.y-g.coreY,P.x-g.x)+(k===1?Math.PI:0);npCharge(T0,T0+tel,()=>[g.x,g.coreY],'#fff0a0',10+k*4);
  for(let i=0;i<n;i++){const a=i*TAU/n;if(Math.abs(((a-gap+Math.PI*3)%TAU)-Math.PI)<.32)continue;npShot(T0,T0+tel,g.x,g.coreY,a,(60+k*14)*n4S(),{sty:k===2?'star4':'ember',col:k===2?'#ffffff':'#ffd166',r:5+k,rayL:k?0:40,chg:false,dmg:10})}sch(T0+tel,()=>{G.shake=Math.max(G.shake,.3+k*.1);sfx(120,.4,'square',.07,60)})})}
 return 2*1.4+tel+3});
/* 8 달의 여왕: 달의 위상 — 화면이 달빛에 잠기고 초승달 모양 그늘만 안전, 위상이 바뀜 */
defPat('moonPhase','달의 위상','field',11,'달빛이 화면을 덮고 초록 그늘만 안전 → 위상이 바뀔 때마다 옮겨',t=>{const tel=Math.max(2.2,npTel()+.8),n=3+Math.min(1,G.phase);
 for(let k=0;k<n;k++){const ts=t+k*2.6;sch(ts,()=>{const a=k*1.7+RND(),cx=HOME.x+Math.cos(a)*120,cy=AY+AH*.6+Math.sin(a)*60,[x,y]=npIn(cx,cy,40);NP({k:'rect',x:AX,y:AY,w:AW,h:AH,safe:[[x,y,34]],t0:ts,t1:ts+tel,t2:ts+tel+.7,col:'#d8e8ff',dmg:12});sfx(700,.5,'sine',.03,900)})}
 return (n-1)*2.6+tel+1});
/* 9 별자리 직조자: 별자리 그물 — 별이 박히고, 별끼리 이어지는 선이 순서대로 켜짐 */
defPat('constellationNet','별자리 그물','all',11,'별이 박힌 뒤 별끼리 선이 순서대로 이어짐 → 선이 켜지기 전 틈으로',t=>{const tel=n4T(),n=6+G.phase;
 sch(t,()=>{const pts=[];for(let i=0;i<n;i++)pts.push(npIn(AX+40+RND()*(AW-80),AY+40+RND()*(AH-70),20));pts.sort((a,b)=>a[0]-b[0]);
  pts.forEach(([x,y],i)=>NP({k:'circ',x,y,r:8,label:'✦',t0:t,t1:t+tel,t2:t+tel+2.4+i*.25,col:'#ffe9a8',dmg:10}));
  for(let i=0;i<pts.length-1;i++){const a=pts[i],b2=pts[i+1],T1=t+tel+i*.25;NP({k:'seg',sty:'thread',w:7,t0:t+.4,t1:T1,t2:T1+1.4,a:()=>a,b:()=>b2,col:'#ffe9a8',dmg:10})}
  if(G.phase>=1){const a=pts[0],b2=pts[pts.length-1],T1=t+tel+pts.length*.25;NP({k:'seg',sty:'thread',w:7,t0:t+.4,t1:T1,t2:T1+1.2,a:()=>a,b:()=>b2,col:'#ffe9a8',dmg:10})}sfx(900,.4,'triangle',.03,1300)});
 return tel+n*.25+2.6});
/* 10 마지막 별: 별의 종말 — 유성우와 초신성과 중력이 한꺼번에 */
defPat('lastStar','마지막 별','all',12,'별이 무너지며 끌어당기고, 유성이 떨어진 뒤 폭발 → 당김을 버티며 원을 피하고 마지막 빈틈으로',t=>{const tel=n4T()+.2,dur=5;
 sch(t,()=>{G.pull={x:HOME.x,y:npG().coreY,str:40+G.phase*6,t0:t+tel,t1:t+tel+dur,tp:t,kind:'suck'};npCharge(t,t+tel,()=>[HOME.x,npG().coreY],'#ffffff',16)});
 for(let i=0;i<8;i++){const T0=t+tel+i*.45;sch(T0,()=>{const [x,y]=npIn(AX+30+RND()*(AW-60),AY+60+RND()*(AH-80),20);NP({k:'circ',x,y,r:18,label:'☄',t0:T0,t1:T0+tel,t2:T0+tel+.35,col:'#ffb070',dmg:12})})}
 sch(t+tel+dur-.4,()=>{const g=bgeo(),n=36,gap=Math.atan2(P.y-g.coreY,P.x-g.x);for(let i=0;i<n;i++){const a=i*TAU/n;if(Math.abs(((a-gap+Math.PI*3)%TAU)-Math.PI)<.3)continue;npShot(t+tel+dur-.4,t+tel+dur+.6,g.x,g.coreY,a,80*n4S(),{sty:'star4',col:'#ffffff',r:6,rayL:30,chg:false,dmg:12})}});
 return tel+dur+3});
const S4_POOL=['meteorRain','eclipseRing','cometTail','nebulaTide','mirrorTwin','gravityWell','novaBurst','moonPhase','constellationNet'];
defPat('starMedley','별들의 합창','all',11,'앞선 별의 수호자 공격이 겹쳐 쏟아짐 → 먼저 뜬 예고부터',t=>{const k=2+(G.phase>=2?1:0),picks=[],pool=S4_POOL.filter(n=>MV[n]&&n!=='gravityWell'&&n!=='moonPhase');while(picks.length<k){const p=pool[Math.floor(RND()*pool.length)];if(!picks.includes(p))picks.push(p)}
 let L=0;picks.forEach((n,i)=>{const off=i*1.1;L=Math.max(L,off+(MV[n](t+off)||8))});return L});

/* ================= 챕터 4 패턴 전면 재설계 v100 — 별의 수호자 10명 × 4개, 모두 별 컨셉 =================
   · 톱니/드론/기계 같은 다른 챕터 패턴은 하나도 쓰지 않음
   · n4Act 로 보스 몸짓(창 찌르기 · 검 휘두르기 · 턱 벌리기 …)과 공격 타이밍을 맞춤 */
const n4Act=(T0,T1,n)=>{sch(T0,()=>{G.s4act={n,ph:'w',at:performance.now()}});sch(T1,()=>{G.s4act={n,ph:'s',at:performance.now()}})};
const n4Gap=(a,gap,w)=>Math.abs(((a-gap+Math.PI*3)%TAU)-Math.PI)<w;
const n4Core=()=>{const g=bgeo();return [g.x,g.coreY]};

/* ─── 1 유성 사냥꾼 (창) ─── */
defPat('cometLance','혜성창 찌르기','head',10,'창끝이 나를 겨누면 불꽃 줄이 그어짐 → 줄 옆으로 비켜서면 창이 꿰뚫고 지나감',t=>{const tel=n4T(),n=3+Math.min(2,G.phase);
 for(let k=0;k<n;k++){const T0=t+k*1.3,T1=T0+tel;n4Act(T0,T1,'thrust');sch(T0,()=>{const g=bgeo(),sx=g.x+16,sy=g.coreY-4,a=Math.atan2(P.y-sy,P.x-sx),L=520;
  NP({k:'seg',sty:'lance',w:14,t0:T0,t1:T1,t2:T1+.5,a:()=>[sx,sy],b:b=>{const q=b<=T1?1:clamp((b-T1)/.16,0,1);return [sx+Math.cos(a)*L*q,sy+Math.sin(a)*L*q]},col:'#ff9a3a',dmg:13});
  sch(T1,()=>{G.shake=Math.max(G.shake,.28);sfx(160,.3,'sawtooth',.07,60)});
  if(G.phase>=1)sch(T1+.25,()=>{for(let i=1;i<6;i++){const d=i*70,x=sx+Math.cos(a)*d,y=sy+Math.sin(a)*d;for(const s of [-1,1])npShot(T1+.25,T1+.7,x,y,a+s*Math.PI/2,55*n4S(),{sty:'ember',col:'#ffb070',r:3,rayL:22,chg:false,dmg:8})}})})}
 return (n-1)*1.3+tel+1.2});
defPat('spearVolley','유성 투창','all',10,'하늘로 던진 창이 ✦ 자리에 꽂힘 → 꽂힌 자리에서 가로·세로 불꽃 창줄기가 뻗음, 십자 밖 대각선으로',t=>{const tel=n4T()+.2,n=3+G.phase;n4Act(t,t+.7,'throw');
 for(let i=0;i<n;i++){const T0=t+.5+i*.6,T1=T0+tel;sch(T0,()=>{const [x,y]=i===n-1?npIn(P.x,P.y,20):npIn(AX+30+RND()*(AW-60),AY+50+RND()*(AH-80),20),diag=G.phase>=2&&i%2===1;
  NP({k:'circ',x,y,r:12,label:'✦',t0:T0,t1:T1,t2:T1+.3,col:'#ffb070',dmg:12});
  NP({k:'orb',sty:'spear',col:'#ffd08a',r:5,t0:T1-.35,t1:T1-.35,t2:T1+1.7,harm:false,noTel:true,pos:b=>{const q=Math.min(1,(b-(T1-.35))/.35);return [x+40*(1-q),y-170*(1-q)]}});
  sch(T1,()=>{G.shake=Math.max(G.shake,.22);sfx(110,.25,'sawtooth',.06,50)});
  for(let d=0;d<2;d++){const a=d*Math.PI/2+(diag?Math.PI/4:0),L=600,ca=Math.cos(a)*L,sa=Math.sin(a)*L;NP({k:'seg',sty:'lance',w:9,t0:T1,t1:T1+.55,t2:T1+1,a:()=>[x-ca,y-sa],b:()=>[x+ca,y+sa],col:'#ff9a3a',dmg:11})}})}
 return .5+(n-1)*.6+tel+1.4});
defPat('huntersMark','사냥꾼의 표식','field',10,'조준경이 나를 쫓다 멈추면 그 자리에 창이 내리꽂힘 → 멈추는 순간 벗어나고, 퍼지는 불씨 고리 틈으로',t=>{const tel=n4T()+.5,n=3;
 for(let k=0;k<n;k++){const T0=t+k*1.7,T1=T0+tel;n4Act(T1-.6,T1,'thrust');let lx=P.x,ly=P.y;
  NP({k:'circ',label:'⌖',t0:T0,t1:T1,t2:T1+.35,col:'#ff7a2a',dmg:14,step:(o,b)=>{if(b<T1-.55){lx=P.x;ly=P.y}},cf:()=>[lx,ly,24]});
  sch(T1,()=>{G.shake=Math.max(G.shake,.4);sfx(70,.5,'sawtooth',.1,30);const m=14,gap=Math.atan2(P.y-ly,P.x-lx)+Math.PI;for(let i=0;i<m;i++){const a=gap+i*TAU/m;if(i===0)continue;npShot(T1,T1+.3,lx,ly,a,60*n4S(),{sty:'ember',col:'#ffb070',r:4,rayL:0,chg:false,noTel:true,dmg:9})}})}
 return (n-1)*1.7+tel+2});

/* ─── 2 일식의 눈 ─── */
defPat('coronaFlare','코로나 플레어','head',11,'눈에서 햇살 줄기가 뻗어 천천히 돈다 → 햇살이 도는 방향으로 같이 돌며 피해',t=>{const tel=n4T()+.3,dur=4+G.phase,dir=RND()<.5?1:-1,nr=2+(G.phase>=2?1:0);n4Act(t,t+tel,'glare');
 sch(t,()=>{const [cx,cy]=n4Core(),a0=Math.atan2(P.y-cy,P.x-cx)+Math.PI/2;npCharge(t,t+tel,()=>[cx,cy],'#ffd98a',14);
  for(let i=0;i<nr;i++){const ang=b=>a0+i*TAU/nr+dir*Math.max(0,b-t-tel)*.5*n4S();NP({k:'seg',sty:'ray',w:16,t0:t,t1:t+tel,t2:t+tel+dur,live:true,a:()=>[cx,cy],b:b=>[cx+Math.cos(ang(b))*560,cy+Math.sin(ang(b))*560],col:'#ffd98a',dmg:12})}});
 return tel+dur+.5});
defPat('penumbra','반그림자','field',10,'달그림자가 내가 선 쪽 절반을 덮음 → 밝은 쪽으로 건너가, 방향이 번갈아 바뀜',t=>{const tel=Math.max(1.7,npTel()+.5),n=3+Math.min(1,G.phase);
 for(let k=0;k<n;k++){const T0=t+k*2.1,T1=T0+tel,vert=k%2===0;n4Act(T0,T1,'blink');sch(T0,()=>{let x=AX,y=AY,w=AW,h=AH;if(vert){w=AW/2;if(P.x>AX+AW/2)x=AX+AW/2}else{h=AH/2;if(P.y>AY+AH/2)y=AY+AH/2}
  NP({k:'rect',sty:'shadow',x,y,w,h,t0:T0,t1:T1,t2:T1+.9,col:'#2a1840',dmg:12});sfx(90,.8,'sine',.05,50)})}
 return (n-1)*2.1+tel+1.1});
defPat('sunspotRain','흑점 폭우','all',10,'검은 흑점이 날아와 멈춘 뒤 여덟 갈래로 터짐 → 흑점에서 멀리, 갈래 사이 틈으로',t=>{const tel=n4T(),n=4+G.phase;n4Act(t,t+tel,'glare');
 for(let i=0;i<n;i++){const T0=t+i*.5,T1=T0+tel;sch(T0,()=>{const [cx,cy]=n4Core(),[tx,ty]=npIn(i%2?P.x+(RND()-.5)*60:AX+40+RND()*(AW-80),AY+AH*.35+RND()*AH*.5,24);
  NP({k:'orb',sty:'sunspot',col:'#ffd98a',r:7,t0:T0,t1:T0+.01,t2:T1+.1,noTel:true,pos:npLin(cx,cy,tx,ty,T0,T1-.3),dmg:10});
  NP({k:'circ',x:tx,y:ty,r:10,t0:T0,t1:T1,t2:T1+.05,col:'#ffd98a',dmg:0,harm:false});
  for(let d=0;d<8;d++){const a=d*Math.PI/4+(i%2?Math.PI/8:0);npShot(T1,T1+.01,tx,ty,a,72*n4S(),{sty:'star4',col:'#ffd98a',r:4,chg:false,noTel:true,dmg:9})}})}
 return (n-1)*.5+tel+2.5});

/* ─── 3 혜성 뱀 ─── */
defPat('cometDash','혜성 돌진','all',10,'가로 줄에 얼음빛 표시 → 혜성이 줄을 따라 가로지름, 표시 없는 줄로',t=>{const tel=n4T(),n=3+G.phase,rows=6,rh=AH/rows;
 for(let k=0;k<n;k++){const T0=t+k*1.15,T1=T0+tel;n4Act(T0,T1,'bite');sch(T0,()=>{const pr=clamp(Math.floor((P.y-AY)/rh),0,rows-1),picks=[pr];while(picks.length<2+(G.phase>=2?1:0)){const r=Math.floor(RND()*rows);if(!picks.includes(r))picks.push(r)}
  for(const r of picks){const y=AY+r*rh+rh/2,dir=(k+r)%2?1:-1,x0=dir>0?AX-20:AX+AW+20;NP({k:'rect',sty:'ice',x:AX,y:y-rh*.36,w:AW,h:rh*.72,t0:T0,t1:T1,t2:T1+.01,col:'#8ae8ff',dmg:0,harm:false});
   NP({k:'orb',sty:'comet',col:'#bff4ff',r:13,t0:T0,t1:T1,t2:T1+1.6,noTel:true,pos:npVel(x0,y,dir>0?0:Math.PI,280*n4S(),T1),dmg:13})}sch(T1,()=>sfx(700,.35,'sawtooth',.04,160))})}
 return (n-1)*1.15+tel+1.8});
defPat('frostOrbit','서리 궤도','all',10,'얼음 조각이 나를 둘러싸고 돌며 조여 옴 → 빈틈이 앞에 올 때 밖으로 빠져나가',t=>{const tel=n4T()+.3,dur=3.2,rings=1+(G.phase>=1?1:0);n4Act(t,t+tel,'bite');
 sch(t,()=>{const cx=P.x,cy=P.y;for(let r=0;r<rings;r++){const n=16,gap=RND()*TAU,dir=r?-1:1,R0=r?120:88;for(let i=0;i<n;i++){const a0=i*TAU/n;if(n4Gap(a0,gap,.45))continue;
  NP({k:'orb',sty:'shard',col:'#bff4ff',r:5,t0:t,t1:t+tel,t2:t+tel+dur,noTel:i%2===1,pos:b=>{const q=Math.max(0,b-t-tel),R=Math.max(12,R0-q*30*n4S()),a=a0+dir*(b-t)*.8;return [cx+Math.cos(a)*R,cy+Math.sin(a)*R*.85]},dmg:10})}}sfx(1200,.5,'triangle',.03,1800)});
 return tel+dur+.4});
defPat('tailWhip','꼬리 채찍','all',10,'얼음 꼬리가 부채꼴로 크게 휩쓺 → 점선 부채꼴 밖으로, 또는 꼬리 뿌리 쪽 안으로',t=>{const tel=n4T()+.2,n=2+Math.min(1,G.phase);
 for(let k=0;k<n;k++){const T0=t+k*1.5,T1=T0+tel;n4Act(T0,T1,'bite');sch(T0,()=>{const [cx,cy]=n4Core(),dir=k%2?-1:1,aim=Math.atan2(P.y-cy,P.x-cx),a0=aim-dir*1.2,a1=aim+dir*1.2,R=300,ang=b=>a0+(a1-a0)*clamp((b-T1)/.7,0,1);
  NP({k:'seg',sty:'tail',w:12,t0:T0,t1:T1,t2:T1+.75,live:true,a:()=>[cx+Math.cos(ang(G.beat))*34,cy+Math.sin(ang(G.beat))*34],b:b=>[cx+Math.cos(ang(b))*R,cy+Math.sin(ang(b))*R],col:'#8ae8ff',dmg:13,
   deco:(o,b)=>{if(b>=T1)return;const p=clamp((b-T0)/(T1-T0),0,1);for(let i=0;i<=16;i++){const a=a0+(a1-a0)*i/16;for(let r=60;r<R;r+=40)cPx(cx+Math.cos(a)*r,cy+Math.sin(a)*r,2,'#8ae8ff',.25+.5*p)}}});sch(T1,()=>sfx(300,.5,'sawtooth',.05,80))})}
 return (n-1)*1.5+tel+1});

/* ─── 4 성운 고래 ─── */
defPat('whaleSong','고래의 노래','head',10,'입에서 노래가 물결치며 세 갈래로 흘러나옴 → 음표 물결 사이 골짜기를 따라 비켜',t=>{const tel=n4T(),n=3+Math.min(1,G.phase);
 for(let k=0;k<n;k++){const T0=t+k*1.2,T1=T0+tel;n4Act(T0,T1,'sing');sch(T0,()=>{const [cx,cy]=n4Core(),mx=cx+14,my=cy+6,a0=Math.atan2(P.y-my,P.x-mx);npCharge(T0,T1,()=>[mx,my],'#b08aff',12);
  for(const off of [-.55,0,.55]){const a=a0+off+(k%2?.25:-.25),ca=Math.cos(a),sa=Math.sin(a);for(let i=0;i<9;i++){const Ti=T1+i*.13;NP({k:'orb',sty:'note',col:i%2?'#b08aff':'#ff8ad8',r:5,t0:T0,t1:Ti,t2:Ti+4,noTel:i>0,ray:i===0?a:null,rayL:50,pos:b=>{const q=Math.max(0,b-Ti),d=q*58*n4S(),w=Math.sin(q*3.2+i*.4)*18;return [mx+ca*d-sa*w,my+sa*d+ca*w]},dmg:9})}}sch(T1,()=>sfx(220+k*40,.9,'sine',.05,160))})}
 return (n-1)*1.2+tel+3.6});
defPat('starPlankton','별 플랑크톤','field',11,'반짝이는 플랑크톤이 떠다니다가 고래가 숨을 들이켬 → 끌려가며 플랑크톤 사이로 버텨',t=>{const tel=n4T(),dur=5.5;n4Act(t+2,t+2+tel,'sing');
 for(let i=0;i<22;i++){const T0=t+i*.1,side=i%2?1:-1,y0=AY+20+((i*37)%Math.max(40,AH-40)),x0=side>0?AX-10:AX+AW+10,sp=(22+RND()*18)*n4S(),ph=RND()*6;
  NP({k:'orb',sty:'plank',col:i%3?'#6ad8ff':'#ff8ad8',r:4,t0:T0,t1:T0+.6,t2:T0+dur,pos:b=>{const q=Math.max(0,b-T0);return [x0+side*q*sp,y0+Math.sin(q*1.8+ph)*16]},dmg:9})}
 sch(t+2,()=>{const [cx,cy]=n4Core();G.pull={x:cx,y:cy+10,str:40+G.phase*8,t0:t+2+tel,t1:t+2+tel+2.2,tp:t+2,kind:'suck'};npCharge(t+2,t+2+tel,()=>[cx+10,cy+4],'#b08aff',16)});
 return dur+.6});
defPat('breach','고래 도약','field',11,'바닥에 큰 그림자가 차오르면 고래가 뛰어올라 덮침 → 그림자 밖으로, 튀는 별물방울 조심',t=>{const tel=n4T()+.4,n=3+Math.min(1,G.phase);
 for(let k=0;k<n;k++){const T0=t+k*1.4,T1=T0+tel;n4Act(T1-.6,T1,'sing');sch(T0,()=>{const [x,y]=k===n-1?npIn(P.x,P.y,40):npIn(AX+50+RND()*(AW-100),AY+60+RND()*(AH-100),40);
  NP({k:'circ',x,y,r:38,label:'≈',t0:T0,t1:T1,t2:T1+.4,col:'#6a5ac8',dmg:15});sch(T1,()=>{G.shake=Math.max(G.shake,.45);sfx(60,.7,'sine',.12,30);
   for(let i=0;i<10;i++){const a=i*TAU/10+k*.3;npShot(T1,T1+.2,x+Math.cos(a)*38,y+Math.sin(a)*38,a,48*n4S(),{sty:'plank',col:'#6ad8ff',r:4,rayL:0,chg:false,noTel:true,dmg:8})}})})}
 return (n-1)*1.4+tel+1.6});

/* ─── 5 쌍둥이 성좌 ─── */
defPat('twinOrbit','쌍성 공전','all',11,'두 별이 서로를 돌며 빛의 끈으로 이어짐 → 끈이 회전하는 방향으로 같이 돌며 피해',t=>{const tel=n4T()+.3,dur=4.4+G.phase*.6,dir=RND()<.5?1:-1;n4Act(t,t+tel,'split');
 sch(t,()=>{const cx=AX+AW/2,cy=AY+AH*.55,a0=Math.atan2(P.y-cy,P.x-cx)+Math.PI/2,ang=b=>a0+dir*Math.max(0,b-t-tel)*.75*n4S(),R=b=>72+Math.sin(Math.max(0,b-t-tel)*1.3)*42,
  p1=b=>[cx+Math.cos(ang(b))*R(b),cy+Math.sin(ang(b))*R(b)*.72],p2=b=>[cx-Math.cos(ang(b))*R(b),cy-Math.sin(ang(b))*R(b)*.72];
  NP({k:'seg',sty:'tether',w:6,t0:t,t1:t+tel,t2:t+tel+dur,live:true,a:b=>p1(b),b:b=>p2(b),col:'#ff9ad5',dmg:11});
  NP({k:'orb',sty:'twin',col:'#ff9ad5',r:10,t0:t,t1:t+tel,t2:t+tel+dur,pos:p1,dmg:12});NP({k:'orb',sty:'twin',col:'#8ae8ff',r:10,t0:t,t1:t+tel,t2:t+tel+dur,pos:p2,dmg:12})});
 return tel+dur+.4});
defPat('swapStep','뒤바뀐 발자국','field',10,'내 자리와 거울 자리에 별이 박히고, 터진 뒤 두 별 사이에 빛의 끈이 그어짐 → 표시에서 벗어난 뒤 끈의 연장선도 피해',t=>{const tel=n4T()+.2,n=3+Math.min(1,G.phase);
 for(let k=0;k<n;k++){const T0=t+k*1.4,T1=T0+tel;n4Act(T0,T1,'split');sch(T0,()=>{const cx=AX+AW/2,cy=AY+AH/2,[x1,y1]=npIn(P.x,P.y,18),[x2,y2]=npIn(2*cx-P.x,2*cy-P.y,18);
  NP({k:'circ',x:x1,y:y1,r:20,label:'✧',t0:T0,t1:T1,t2:T1+.3,col:'#ff9ad5',dmg:13});NP({k:'circ',x:x2,y:y2,r:20,label:'✧',t0:T0,t1:T1,t2:T1+.3,col:'#8ae8ff',dmg:13});
  NP({k:'seg',sty:'tether',w:8,t0:T1,t1:T1+.5,t2:T1+1.1,a:()=>[x1,y1],b:()=>[x2,y2],col:'#ff9ad5',dmg:12});sch(T1,()=>sfx(900,.3,'square',.04,1400))})}
 return (n-1)*1.4+tel+1.4});
defPat('gemBeam','쌍둥이 빛기둥','all',11,'양쪽 끝에서 빛기둥이 서로를 향해 밀려옴 → 기둥마다 뚫린 틈으로 통과',t=>{const tel=n4T()+.3,dur=3.2;n4Act(t,t+tel,'split');
 sch(t,()=>{for(const [side,col] of [[-1,'#ff9ad5'],[1,'#8ae8ff']]){const gy=AY+30+RND()*(AH-60),gh=34,x=b=>{const q=clamp((b-t-tel)/dur,0,1);return side<0?AX+4+q*(AW-8):AX+AW-4-q*(AW-8)};
  NP({k:'seg',sty:'tether',w:8,t0:t,t1:t+tel,t2:t+tel+dur,live:true,a:b=>[x(b),AY],b:b=>[x(b),gy-gh/2],col,dmg:12});NP({k:'seg',sty:'tether',w:8,t0:t,t1:t+tel,t2:t+tel+dur,live:true,a:b=>[x(b),gy+gh/2],b:b=>[x(b),AY+AH],col,dmg:12})}sfx(500,1,'sine',.04,700)});
 return tel+dur+.4});

/* ─── 6 블랙홀 방랑자 ─── */
defPat('eventHorizon','사건의 지평선','field',11,'빛이 사라지고 안전한 빛의 원만 남음 → 원이 점점 작아지며 옮겨 가, 따라가',t=>{const tel=Math.max(1.6,npTel()+.4),n=3;n4Act(t,t+tel,'pull');
 let cx=P.x,cy=P.y;for(let k=0;k<n;k++){const T0=t+k*1.9,T1=T0+tel;sch(T0,()=>{if(k){const a=RND()*TAU;[cx,cy]=npIn(cx+Math.cos(a)*50,cy+Math.sin(a)*40,50)}else[cx,cy]=npIn(P.x,P.y,50);NP({k:'rect',sty:'void',x:AX,y:AY,w:AW,h:AH,safe:[[cx,cy,52-k*9]],t0:T0,t1:T1,t2:T1+.7,col:'#140a24',dmg:12});sfx(70,.8,'sawtooth',.05,40)})}
 return (n-1)*1.9+tel+.9});
defPat('spaghettify','스파게티화','all',11,'블랙홀에서 가느다란 선이 뻗어 천천히 돌며 끌어당김 → 선 사이 넓은 틈에서 반대로 버텨',t=>{const tel=n4T()+.3,dur=4.4,n=5+Math.min(2,G.phase),dir=RND()<.5?1:-1;n4Act(t,t+tel,'pull');
 sch(t,()=>{const [cx,cy]=n4Core(),a0=RND()*TAU;G.pull={x:cx,y:cy,str:28+G.phase*6,t0:t+tel,t1:t+tel+dur,tp:t,kind:'suck'};
  for(let i=0;i<n;i++){const ang=b=>a0+i*TAU/n+dir*Math.max(0,b-t-tel)*.35;NP({k:'seg',sty:'spag',w:5,t0:t,t1:t+tel,t2:t+tel+dur,live:true,a:b=>[cx+Math.cos(ang(b))*26,cy+Math.sin(ang(b))*26],b:b=>[cx+Math.cos(ang(b))*520,cy+Math.sin(ang(b))*520],col:'#b86aff',dmg:11})}});
 return tel+dur+.4});
defPat('darkMatter','암흑 물질','all',10,'어두운 덩어리가 사방으로 퍼졌다가 멈춘 뒤, 한꺼번에 블랙홀로 되돌아옴 → 나갈 때와 돌아올 때 두 번 피해',t=>{const tel=n4T(),n=14+G.phase*4;n4Act(t,t+tel,'pull');
 sch(t,()=>{const [cx,cy]=n4Core(),a0=RND()*TAU,T1=t+tel,out=1.4,hold=.8,back=1.3;npCharge(t,T1,()=>[cx,cy],'#b86aff',16);
  for(let i=0;i<n;i++){const a=a0+i*TAU/n,D=150+(i%3)*45;NP({k:'orb',sty:'darkm',col:'#b86aff',r:7,t0:t,t1:T1,t2:T1+out+hold+back,noTel:i%2===1,ray:a,rayL:40,pos:b=>{const q=b-T1;let d;if(q<out)d=D*Math.sin(q/out*Math.PI/2);else if(q<out+hold)d=D;else d=D*(1-Math.pow(clamp((q-out-hold)/back,0,1),2));const sw=q>out+hold?(q-out-hold)*1.2:0;return [cx+Math.cos(a+sw)*d,cy+Math.sin(a+sw)*d*.85]},dmg:10})}
  sch(T1+out+hold,()=>{sfx(60,1,'sawtooth',.06,30);G.pull={x:cx,y:cy,str:22,t0:T1+out+hold,t1:T1+out+hold+back,tp:T1,kind:'suck'}})});
 return tel+3.8});
/* ─── 7 초신성 기사 (검) ─── */
defPat('solarSlash','태양 참격','head',10,'검을 치켜들면 초승달 참격이 날아옴 → 참격 끝과 끝 사이가 넓음, 옆으로 크게',t=>{const tel=n4T(),n=3+Math.min(1,G.phase);
 for(let k=0;k<n;k++){const T0=t+k*1.2,T1=T0+tel;n4Act(T0,T1,'slash');sch(T0,()=>{const g=bgeo(),sx=g.x-10,sy=g.coreY,a=Math.atan2(P.y-sy,P.x-sx),nx=-Math.sin(a),ny=Math.cos(a);
  for(let j=-3;j<=3;j++){const bend=Math.abs(j)*Math.abs(j)*2.6;npShot(T0,T1,sx+nx*j*11-Math.cos(a)*bend,sy+ny*j*11-Math.sin(a)*bend,a,82*n4S(),{sty:'wave',col:'#ffd166',r:6,rayL:j===0?60:0,chg:false,noTel:j!==0,dmg:12})}sch(T1,()=>{G.shake=Math.max(G.shake,.25);sfx(420,.25,'sawtooth',.06,120)})})}
 return (n-1)*1.2+tel+2.4});
defPat('flarePlunge','플레어 강타','field',11,'검을 땅에 꽂으면 불기둥이 양옆으로 번져 나감 → 불기둥이 오기 전 이미 지나간 칸으로',t=>{const tel=n4T()+.2,cols=10,cw=AW/cols;n4Act(t,t+tel,'plunge');
 sch(t,()=>{const g=bgeo(),c0=clamp(Math.floor((g.x-AX)/cw),0,cols-1);for(let c=0;c<cols;c++){const d=Math.abs(c-c0),T1=t+tel+d*.32;NP({k:'rect',sty:'flare',x:AX+c*cw+1,y:AY,w:cw-2,h:AH,t0:t+d*.2,t1:T1,t2:T1+.45,col:'#ff9a2a',dmg:13})}
  sch(t+tel,()=>{G.shake=Math.max(G.shake,.5);sfx(60,.8,'sawtooth',.12,30)})});
 if(G.phase>=1)sch(t+tel+1.6,()=>{const [cx,cy]=n4Core();for(let i=0;i<16;i++){const a=i*TAU/16;npShot(t+tel+1.6,t+tel+2.1,cx,cy,a,60*n4S(),{sty:'ember',col:'#ffd166',r:4,rayL:30,chg:false,dmg:9})}});
 return tel+cols*.16+2.4});
defPat('coronaShield','태양검 비','all',11,'기사가 검을 세우면 하늘에서 태양검이 한 줄씩 쏟아짐 → 검 줄이 훑고 지나간 쪽으로, 빈 줄 하나를 노려',t=>{const tel=n4T(),cols=12,cw=AW/cols,passes=2+Math.min(1,G.phase);n4Act(t,t+tel,'guard');
 for(let p=0;p<passes;p++){const dir=p%2?-1:1,gap=Math.floor(RND()*cols),T0=t+p*2.1;sch(T0,()=>{for(let c=0;c<cols;c++){if(c===gap||(G.phase<1&&c===(gap+1)%cols))continue;const i=dir>0?c:cols-1-c,x=AX+c*cw+cw/2,T1=T0+tel+i*.1;
  NP({k:'orb',sty:'sword',col:'#ffd166',r:6,t0:T0,t1:T1,t2:T1+AH/150+.4,noTel:true,pos:b=>{const q=Math.max(0,b-T1);return [x,AY-16+q*170*n4S()]},dmg:11});
  NP({k:'rect',x:x-cw/2+2,y:AY,w:cw-4,h:AH,t0:T0,t1:T1,t2:T1+.01,col:'#ffd166',dmg:0,harm:false})}sfx(800,.4,'triangle',.04,1200)})}
 return (passes-1)*2.1+tel+cols*.1+2.2});
/* ─── 8 달의 여왕 ─── */
defPat('crescentBlade','초승달 칼날','all',10,'초승달이 날아갔다 휘어서 돌아옴 → 나갈 때 한 번, 돌아올 때 한 번 피해',t=>{const tel=n4T(),n=3+Math.min(1,G.phase);
 for(let k=0;k<n;k++){const T0=t+k*.9,T1=T0+tel;n4Act(T0,T1,'cast');sch(T0,()=>{const [cx,cy]=n4Core(),a=Math.atan2(P.y-cy,P.x-cx)+(k%2?.3:-.3),side=k%2?1:-1,D=Math.min(300,Math.hypot(P.x-cx,P.y-cy)+60);
  NP({k:'orb',sty:'crescent',col:'#eef4ff',r:9,t0:T0,t1:T1,t2:T1+2.6,ray:a,rayL:60,pos:b=>{const q=clamp((b-T1)/2.6,0,1),s=Math.sin(q*Math.PI)*D,l=Math.sin(q*TAU)*50*side;return [cx+Math.cos(a)*s-Math.sin(a)*l,cy+Math.sin(a)*s+Math.cos(a)*l]},dmg:12})})}
 return (n-1)*.9+tel+2.8});
defPat('tideLock','달의 조수','field',11,'달빛 띠 두 줄이 위아래로 밀려옴 → 두 띠 사이 어두운 곳에 머물며 같이 움직여',t=>{const tel=n4T()+.3,dur=4.2,gap=46;n4Act(t,t+tel,'cast');
 sch(t,()=>{const y0=clamp(P.y,AY+gap,AY+AH-gap),mid=b=>{const q=Math.max(0,b-t-tel);return clamp(y0+Math.sin(q*1.3*n4S())*AH*.32,AY+gap,AY+AH-gap)};
  NP({k:'rect',sty:'moon',rf:b=>[AX,AY,AW,Math.max(0,mid(b)-gap/2-AY)],t0:t,t1:t+tel,t2:t+tel+dur,col:'#d8e8ff',dmg:11});NP({k:'rect',sty:'moon',rf:b=>{const y=mid(b)+gap/2;return [AX,y,AW,Math.max(0,AY+AH-y)]},t0:t,t1:t+tel,t2:t+tel+dur,col:'#d8e8ff',dmg:11});sfx(600,1,'sine',.03,400)});
 return tel+dur+.4});
defPat('silverRain','은빛 꽃비','all',10,'은빛 꽃잎이 비스듬히 흔들리며 쏟아짐 → 꽃잎 사이로 좌우로 흔들며',t=>{const tel=n4T(),n=26+G.phase*8,wind=RND()<.5?1:-1;n4Act(t,t+tel,'cast');
 for(let i=0;i<n;i++){const T1=t+tel*.6+i*.13,x0=AX+((i*67)%AW)-wind*40,ph=RND()*6,sp=(60+RND()*24)*n4S();NP({k:'orb',sty:'petal',col:'#eef4ff',r:4,t0:T1-.6,t1:T1,t2:T1+AH/sp+.6,noTel:true,pos:b=>{const q=Math.max(0,b-T1);return [x0+wind*q*22+Math.sin(q*2.4+ph)*14,AY-8+q*sp]},dmg:9})}
 return tel*.6+n*.13+AH/60+.6});

/* ─── 9 별자리 직조자 ─── */
defPat('needleVolley','바늘 세례','hands',10,'베틀 양옆에서 바늘이 부채꼴로 날아옴 → 바늘 사이 틈, 두 번째 부채는 어긋나 있음',t=>{const tel=n4T(),n=3+Math.min(1,G.phase);npHands(t,.5,30,-2);
 for(let k=0;k<n;k++){const T0=t+.4+k*.8,T1=T0+tel;n4Act(T0,T1,'stitch');sch(T0,()=>{const g=bgeo();for(const s of [-1,1]){const sx=g.x+s*34,sy=g.coreY+4,a0=Math.atan2(P.y-sy,P.x-sx);for(let j=-3;j<=3;j++){const a=a0+j*.2+(k%2?.1:0);npShot(T0,T1,sx,sy,a,86*n4S(),{sty:'needle',col:'#ffe9a8',r:3,rayL:j===0?50:30,chg:false,dmg:9})}}sch(T1,()=>sfx(1500,.12,'square',.03,2400))})}
 npRest(t+.4+n*.8+tel);return .4+n*.8+tel+1.6});
defPat('loomGrid','베틀 격자','field',11,'세로 실이 먼저, 가로 실이 뒤따라 짜임 → 실이 켜지기 전 칸 한가운데로',t=>{const tel=n4T()+.2,nv=4+Math.min(1,G.phase),nh=3;n4Act(t,t+tel,'stitch');
 sch(t,()=>{const xs=[],ys=[];for(let i=0;i<nv;i++)xs.push(AX+AW*(i+.5+(RND()-.5)*.5)/nv);for(let i=0;i<nh;i++)ys.push(AY+AH*(i+.5+(RND()-.5)*.4)/nh);
  xs.forEach((x,i)=>{const T1=t+tel+i*.18;NP({k:'seg',sty:'thread',w:6,t0:t,t1:T1,t2:T1+1.2,a:()=>[x,AY],b:()=>[x,AY+AH],col:'#ffe9a8',dmg:11})});
  ys.forEach((y,i)=>{const T1=t+tel+1.4+i*.2;NP({k:'seg',sty:'thread',w:6,t0:t+1.2,t1:T1,t2:T1+1.1,a:()=>[AX,y],b:()=>[AX+AW,y],col:'#ffe9a8',dmg:11})})});
 return tel+3.4});
defPat('starStitch','별 꿰매기','all',11,'금빛 바늘이 내 주위를 지그재그로 꿰매며 지나감 → 바늘 뒤에 남는 실을 넘지 말고 바깥으로',t=>{const tel=n4T(),m=7;n4Act(t,t+tel,'stitch');
 sch(t,()=>{const cx=P.x,cy=P.y,pts=[];for(let i=0;i<m;i++){const a=i*TAU/(m-1)*.9+RND()*.3,r=(i%2?30:78);pts.push(npIn(cx+Math.cos(a)*r,cy+Math.sin(a)*r,12))}const g=bgeo();pts.unshift([g.x,g.coreY]);
  const seg=.34,T1=t+tel;pts.forEach((p,i)=>{if(i===0)return;const q=pts[i-1],Ti=T1+(i-1)*seg;NP({k:'circ',x:p[0],y:p[1],r:5,label:'✦',t0:t,t1:T1+.1,t2:T1+.1,col:'#ffe9a8',dmg:0,harm:false});NP({k:'seg',sty:'thread',w:5,t0:t,t1:Ti+seg,t2:T1+m*seg+1.4,a:()=>q,b:()=>p,col:'#ffe9a8',dmg:11,noTel:false})});
  const path=b=>{const u=clamp((b-T1)/seg,0,pts.length-1.001),i=Math.floor(u),f=u-i,a=pts[i],c=pts[i+1];return [a[0]+(c[0]-a[0])*f,a[1]+(c[1]-a[1])*f]};NP({k:'orb',sty:'needle',col:'#fffbe8',r:6,t0:t,t1:T1,t2:T1+m*seg,pos:path,dmg:13})});
 return tel+m*.34+1.6});

/* ─── 10 마지막 별 ─── */
defPat('genesis','창세','all',12,'별이 은하 팔 네 개를 그리며 퍼짐 → 팔 사이 어두운 틈을 따라 같은 방향으로 돌아',t=>{const tel=n4T()+.2,arms=4,n=10,dir=RND()<.5?1:-1;n4Act(t,t+tel,'flare');
 sch(t,()=>{const [cx,cy]=n4Core(),a0=RND()*TAU;npCharge(t,t+tel,()=>[cx,cy],'#fff4c8',18);for(let k=0;k<arms;k++)for(let i=0;i<n;i++){const T1=t+tel+i*.24;NP({k:'orb',sty:i%3?'star4':'twin',col:['#fff4c8','#8ae8ff','#ff9ad5','#ffd98a'][k],r:i%3?4:6,t0:t,t1:T1,t2:T1+4,noTel:true,pos:b=>{const q=Math.max(0,b-T1),R=12+q*50*n4S(),a=a0+k*TAU/arms+dir*(q*.55+i*.22);return [cx+Math.cos(a)*R,cy+Math.sin(a)*R*.85]},dmg:10})}});
 return tel+n*.24+3.4});
defPat('starHeart','별의 심장','head',11,'별이 박동할 때마다 빛이 사방으로 → 빈틈은 늘 나를 조금 비켜 난 곳, 박동에 맞춰 옮겨',t=>{const tel=n4T(),n=5+Math.min(2,G.phase);
 for(let k=0;k<n;k++){const T0=t+k*.9,T1=T0+tel;n4Act(T0,T1,'flare');sch(T0,()=>{const [cx,cy]=n4Core(),gap=Math.atan2(P.y-cy,P.x-cx)+(k%2?.45:-.45),m=26+(k%2)*6;npCharge(T0,T1,()=>[cx,cy],'#ffffff',12+k);
  for(let i=0;i<m;i++){const a=i*TAU/m+(k%2?Math.PI/m:0);if(n4Gap(a,gap,.33))continue;npShot(T0,T1,cx,cy,a,(62+k*4)*n4S(),{sty:k%2?'star4':'ringstar',col:k%2?'#ffffff':'#ffd98a',r:4,rayL:0,chg:false,noTel:true,dmg:10})}sch(T1,()=>{G.shake=Math.max(G.shake,.25);sfx(55,.35,'sine',.14,40)})})}
 return (n-1)*.9+tel+3});
/* 별들의 합창: 이제 챕터 4 패턴만 섞음 */
S4_POOL.length=0;S4_POOL.push('meteorRain','cometLance','eclipseRing','sunspotRain','cometTail','whaleSong','twinOrbit','darkMatter','novaBurst','solarSlash','crescentBlade','silverRain','needleVolley','constellationNet');

/* ---------- 챕터 4 전용 탄 모양 ---------- */
function n4Dir(o,b){try{const [x1,y1]=o.pos(b),[x2,y2]=o.pos(b+.03);const a=Math.atan2(y2-y1,x2-x1);return Number.isFinite(a)&&(Math.abs(x2-x1)+Math.abs(y2-y1)>.01)?a:(o.ray!=null?o.ray:Math.PI/2)}catch(e){return 0}}
/* 빛 번짐 (가산 합성) */
function n4G(x,y,r,col,a){if(r<1)return;const c=ctx,g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');const o=c.globalCompositeOperation,ga=c.globalAlpha;c.globalCompositeOperation='lighter';c.globalAlpha=Math.max(0,Math.min(1,a==null?.6:a));c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);c.globalCompositeOperation=o;c.globalAlpha=ga}
function n4Sp(x,y,r,col,a,rot){/* 네 갈래 별빛 (회전 가능) */rot=rot||0;for(let k=0;k<4;k++){const an=rot+k*Math.PI/2,ca=Math.cos(an),sa=Math.sin(an);for(let i=1;i<=r;i++)cPx(x+ca*i,y+sa*i,i<r*.4?2:1,col,a*(1-i/(r+1)*.6))}cPx(x,y,3,'#ffffff',a)}
const N4SPR={
 star4(x,y,r,t,c){const rr=r+2+Math.sin(t*9+x)*1;n4G(x,y,r*3.2,c,.5);n4Sp(x,y,rr+3,c,1,t*2);n4Sp(x,y,rr-1,'#ffffff',.9,t*2+Math.PI/4);pcirc(x,y,2,'#ffffff',1)},
 ember(x,y,r,t,c,a){const ca=Math.cos(a),sa=Math.sin(a);n4G(x,y,r*4,'#ff7a2a',.55);for(let i=1;i<9;i++){const w=Math.max(1,r*1.6-i*.5),jit=Math.sin(t*30+i*1.7)*1.2;cPx(x-ca*i*2.6-sa*jit,y-sa*i*2.6+ca*jit,w,i<3?'#ffd08a':i<6?'#ff7a2a':'#a02a10',.95-i*.1)}
  pcirc(x,y,r+1,'#2a1410',1);pcirc(x,y,r,'#ff9a3a',1);pcirc(x-ca*.5,y-sa*.5,r*.6,'#ffe8b0',1);cPx(x+ca*r*.4,y+sa*r*.4,1,'#ffffff',1)},
 spear(x,y,r,t,c,a){const ca=Math.cos(a),sa=Math.sin(a),nx=-sa,ny=ca;n4G(x,y,20,'#ff7a2a',.5);for(let i=2;i<14;i++)cPx(x-ca*(18+i*3),y-sa*(18+i*3),Math.max(1,5-i*.35),i<5?'#ffd08a':'#ff6a20',.8-i*.055);
  line(x-ca*20,y-sa*20,x-ca*3,y-sa*3,1,(px,py)=>{cPx(px,py,3,'#2a1810',1);cPx(px,py,1,'#8a5a3a',1)});for(let i=0;i<7;i++){const w=Math.max(1,Math.round((7-i)*.9));for(let j=-w;j<=w;j++)cPx(x-ca*(3-i)+nx*j*.8,y-sa*(3-i)+ny*j*.8,1,i<2?'#ffffff':'#ffd08a',1)}cPx(x+ca*4,y+sa*4,2,'#ffffff',1)},
 sunspot(x,y,r,t,c){n4G(x,y,r*3.4,'#ffd98a',.55);for(let i=0;i<12;i++){const a=i*TAU/12+t*1.5,L=r+3+(i%2?2:4)+Math.sin(t*8+i)*1.2;line(x+Math.cos(a)*r,y+Math.sin(a)*r,x+Math.cos(a)*L,y+Math.sin(a)*L,1,(px,py)=>cPx(px,py,1,i%2?'#ffd98a':'#ffffff',1))}
  pcirc(x,y,r+1,'#ffd98a',1);pcirc(x,y,r,'#07040a',1);cRing(x,y,r-2,'#ff4a3a',.6,1);pcirc(x+1,y-1,1.5,'#ff6a4a',1)},
 comet(x,y,r,t,c,a){const ca=Math.cos(a),sa=Math.sin(a),nx=-sa,ny=ca;n4G(x,y,r*3,'#8ae8ff',.6);for(let i=1;i<26;i++){const spread=i*.28,q=1-i/26;for(const s2 of [-1,0,1]){const w=Math.sin(t*14+i*.8+s2)*spread;cPx(x-ca*i*3.2+nx*(w+s2*spread*.8),y-sa*i*3.2+ny*(w+s2*spread*.8),Math.max(1,Math.round(r*.7*q+(s2?0:1))),s2?'#6ad8ff':(i<5?'#ffffff':'#bff4ff'),q*(s2?.5:.9))}}
  pcirc(x,y,r*.8,'#8ae8ff',.9);pcirc(x,y,r*.55,'#e8fbff',1);n4Sp(x,y,r+4,'#ffffff',.9,t*3);for(let k=0;k<3;k++){const q=((t*2+k/3)%1);cPx(x-ca*q*40+nx*(k-1)*8,y-sa*q*40+ny*(k-1)*8,1,'#ffffff',1-q)}},
 shard(x,y,r,t,c){const rot=t*4+x*.05,ca=Math.cos(rot),sa=Math.sin(rot);n4G(x,y,r*3,'#8ae8ff',.4);const P2=(u,v)=>[x+ca*u-sa*v,y+sa*u+ca*v];ctx.globalAlpha=1;ctx.fillStyle='#2a6a9a';ctx.beginPath();[[0,-r-3],[r*.7,0],[0,r+3],[-r*.7,0]].forEach((p,i)=>{const q=P2(p[0],p[1]);i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])});ctx.fill();
  ctx.fillStyle='#bff4ff';ctx.beginPath();[[0,-r-1],[r*.45,0],[0,r+1],[-r*.45,0]].forEach((p,i)=>{const q=P2(p[0],p[1]);i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])});ctx.fill();const h=P2(-1,-r+1);cPx(h[0],h[1],2,'#ffffff',1)},
 plank(x,y,r,t,c){const f=.6+.4*Math.sin(t*6+x*.1);n4G(x,y,r*4,c,.45*f);pcirc(x,y,r+1,'#0a0a24',.6);pcirc(x,y,r,c,.85);pcirc(x-1,y-1,r*.5,'#ffffff',f);for(let i=0;i<3;i++){const a=t*3+i*TAU/3;cPx(x+Math.cos(a)*(r+3),y+Math.sin(a)*(r+3),1,c,.8)}},
 note(x,y,r,t,c){n4G(x,y,r*3.5,c,.5);const b=Math.round(Math.sin(t*6+x*.1)*1.5);pcirc(x-1,y+2+b,3.2,'#1a0a2a',1);pcirc(x-1,y+2+b,2.5,c,1);RA(x+1,y-7+b,1.5,9,c,1);RA(x+1,y-7+b,4,1.5,c,1);RA(x+3,y-6+b,2,1.5,c,1);cPx(x-2,y+1+b,1,'#ffffff',1)},
 twin(x,y,r,t,c){n4G(x,y,r*4,c,.7);cRing(x,y,r+4+Math.sin(t*6)*1.5,c,.7,1);pcirc(x,y,r,c,1);pcirc(x,y,r*.62,'#ffffff',1);n4Sp(x,y,r+9,'#ffffff',.8,t*1.2);for(let i=0;i<4;i++){const a=t*4+i*TAU/4;cPx(x+Math.cos(a)*(r+6),y+Math.sin(a)*(r+6)*.5,2,c,1)}},
 darkm(x,y,r,t,c){n4G(x,y,r*3.5,'#b86aff',.55);for(let i=0;i<16;i++){const a=i*TAU/16+t*3,back=Math.sin(a)<0;if(back)cPx(x+Math.cos(a)*(r+4),y+Math.sin(a)*(r+4)*.35,1,i%2?'#ff9a4a':'#b86aff',.8)}pcirc(x,y,r+1,'#b86aff',1);pcirc(x,y,r,'#000000',1);
  for(let i=0;i<16;i++){const a=i*TAU/16+t*3;if(Math.sin(a)>=0)cPx(x+Math.cos(a)*(r+4),y+Math.sin(a)*(r+4)*.35,2,i%2?'#ffb070':'#e0b8ff',1)}},
 wave(x,y,r,t,c,a){const ca=Math.cos(a),sa=Math.sin(a),nx=-sa,ny=ca;n4G(x,y,r*3,'#ffd166',.55);for(let j=-6;j<=6;j++){const bend=(j*j)*.28,px=x+nx*j*1.6-ca*bend,py=y+ny*j*1.6-sa*bend,w=Math.max(1,4-Math.abs(j)*.5);cPx(px,py,w+2,'#ff7a1a',.8);cPx(px,py,w,Math.abs(j)<3?'#ffffff':'#ffd166',1)}for(let i=1;i<4;i++)cPx(x-ca*i*4,y-sa*i*4,3-i*.6,'#ffb020',.5-i*.12)},
 crescent(x,y,r,t,c){const a=t*9;n4G(x,y,r*3.2,'#8ab8ff',.55);pcirc(x,y,r+1,'#1a2440',1);pcirc(x,y,r,'#eef4ff',1);pcirc(x+Math.cos(a)*r*.5,y+Math.sin(a)*r*.5,r*.9,'#0a0e20',1);cRing(x,y,r+3,'#d8e8ff',.35,1);for(let i=1;i<5;i++){const b2=a-i*.35;cPx(x-Math.cos(b2)*r*.7,y-Math.sin(b2)*r*.7,2,'#ffffff',.8-i*.18)}},
 petal(x,y,r,t,c){const rot=t*5+x*.2,ca=Math.cos(rot),sa=Math.sin(rot),fl=.5+.5*Math.abs(Math.sin(t*7+y*.1));n4G(x,y,12,'#8ab8ff',.3);ctx.globalAlpha=1;ctx.fillStyle='#d8e8ff';ctx.beginPath();ctx.ellipse(x,y,r+2,(r-1)*fl+1,rot,0,TAU);ctx.fill();ctx.fillStyle='#ffffff';ctx.beginPath();ctx.ellipse(x-ca,y-sa,(r+2)*.45,Math.max(.6,(r-1)*fl*.5),rot,0,TAU);ctx.fill();cPx(x+ca*(r+1),y+sa*(r+1),1,'#8ab8ff',1)},
 needle(x,y,r,t,c,a){const ca=Math.cos(a),sa=Math.sin(a);n4G(x,y,12,'#ffe9a8',.4);for(let i=2;i<12;i++)cPx(x-ca*(14+i*3)+Math.sin(t*10+i)*(-sa)*1.5,y-sa*(14+i*3)+Math.sin(t*10+i)*ca*1.5,1,'#ffe9a8',.8-i*.06);line(x-ca*14,y-sa*14,x+ca*4,y+sa*4,1,(px,py)=>{cPx(px,py,2,'#6a5a2a',1);cPx(px,py,1,'#fffbe8',1)});cPx(x-ca*13,y-sa*13,3,'#ffe9a8',1);cPx(x-ca*13,y-sa*13,1,'#2a2410',1);cPx(x+ca*5,y+sa*5,2,'#ffffff',1)},
 sword(x,y,r,t,c){n4G(x,y+6,22,'#ffd166',.55);for(let i=1;i<8;i++)cPx(x,y-10-i*3,3-i*.3,'#ffd166',.5-i*.06);RA(x-4,y-9,9,2,'#8a5a2a',1);RA(x-1,y-14,3,5,'#4a2a10',1);cPx(x,y-15,3,'#ff7a1a',1);RA(x-2,y-7,5,15,'#fff4d0',1);RA(x-1,y-7,1,14,'#ffffff',1);RA(x+1,y-7,1,15,'#d8b060',1);RA(x-1,y+8,3,2,'#ffffff',1);cPx(x,y+10,1,'#ffffff',1)}};
{const _sp=npSpr;npSpr=function(sty,x,y,r,now,o,b){const f=N4SPR[sty];if(!f)return _sp.apply(this,arguments);x=Math.round(x);y=Math.round(y);try{f(x,y,r,now/1000,(o&&o.col)||'#ffffff',o&&o.pos?n4Dir(o,b):0)}catch(e){}}}
{const _sd=npSegDraw;npSegDraw=function(o,ax,ay,bx,by,now,b){const sty=o.sty,c=o.col||'#fff',t=now/1000,w=Math.max(2,o.w),L=Math.hypot(bx-ax,by-ay)||1,ux=(bx-ax)/L,uy=(by-ay)/L,nx=-uy,ny=ux;
 if(sty==='lance'){line(ax,ay,bx,by,2,(x,y,i)=>{const f=Math.sin(i*.4-t*30)*.5+.5;cPx(x,y,w+4,'#a02a10',.25);cPx(x,y,w+f*2,'#ff6a20',.55);cPx(x,y,Math.max(2,w-4),'#ffb070',.95);cPx(x,y,2,'#fff4c8',1);if(i%7===0)cPx(x+nx*(w/2+2)*Math.sin(i+t*9),y+ny*(w/2+2)*Math.sin(i+t*9),2,'#ffd08a',.8)});for(let i=0;i<8;i++)cPx(bx-ux*i*2,by-uy*i*2,Math.max(2,10-i),i<2?'#ffffff':'#ffd08a',1);n4G(bx,by,18,'#ff7a2a',.6);return}
 if(sty==='ray'){line(ax,ay,bx,by,3,(x,y,i)=>{cPx(x,y,w+8,'#ffd98a',.1);cPx(x,y,w,'#ffe9a8',.45);cPx(x,y,Math.max(3,w*.35),'#ffffff',.95);if((i+Math.floor(t*20))%9===0)cPx(x+nx*(w/2+3),y+ny*(w/2+3),2,'#ffffff',.9)});n4G(ax,ay,30,'#ffd98a',.6);return}
 if(sty==='tether'){line(ax,ay,bx,by,2,(x,y,i)=>{const ph=i*.35-t*14,o1=Math.sin(ph)*w*.5,o2=-o1;cPx(x,y,w+3,'#ffffff',.12);cPx(x+nx*o1,y+ny*o1,3,'#ff9ad5',1);cPx(x+nx*o2,y+ny*o2,3,'#8ae8ff',1);if(i%6===0)cPx(x,y,2,'#ffffff',1)});return}
 if(sty==='spag'){line(ax,ay,bx,by,2,(x,y,i)=>{const d=Math.hypot(x-ax,y-ay),th=Math.max(1,w*(1-d/600)*1.3),wob=Math.sin(i*.25-t*10)*2;cPx(x+nx*wob,y+ny*wob,th+2,'#3a1a5a',.7);cPx(x+nx*wob,y+ny*wob,th,i%9<2?'#ff9a4a':'#b86aff',1);if(i%11===0)cPx(x-nx*wob*2,y-ny*wob*2,1,'#ffffff',.9)});return}
 if(sty==='thread'){line(ax,ay,bx,by,2,(x,y,i)=>{cPx(x,y,w+2,'#ffe9a8',.18);cPx(x,y,2,(i+Math.floor(t*24))%8<2?'#ffffff':'#ffe9a8',1)});for(let k=0;k<Math.floor(L/40);k++){const q=((t*.8+k/Math.max(1,Math.floor(L/40)))%1);n4Sp(ax+ux*L*q,ay+uy*L*q,4,'#ffffff',.9,t*3)}n4Sp(ax,ay,5,'#ffe9a8',1,0);n4Sp(bx,by,5,'#ffe9a8',1,0);return}
 if(sty==='tail'){line(ax,ay,bx,by,2,(x,y,i)=>{const k=i*2/L,wd=Math.max(3,w*(1-k*.55));cPx(x,y,wd+2,'#1a3a5a',1);cPx(x,y,wd,k<.85?(i%6<3?'#4a8ab8':'#6aa8d8'):'#8ae8ff',1);if(i%6===0){cPx(x+nx*wd*.6,y+ny*wd*.6-1,2,'#e8fbff',1);cPx(x-nx*wd*.6,y-ny*wd*.6,1,'#bff4ff',1)}});n4G(bx,by,16,'#8ae8ff',.7);pcirc(bx,by,5,'#e8fbff',1);return}
 return _sd.apply(this,arguments)}}
{const _rd=npRectDraw;npRectDraw=function(o,x,y,w,h,now,b){const sty=o.sty,t=now/1000;
 if(sty==='shadow'){RA(x,y,w,h,'#05020c',.72);for(let i=0;i<w;i+=7)for(let j=(i*3)%11;j<h;j+=11)cPx(x+i,y+j,1,'#c8a0ff',.35+.3*Math.sin(t*3+i+j));RA(x,y,w,2,'#c8a0ff',.9);RA(x,y+h-2,w,2,'#c8a0ff',.5);return}
 if(sty==='void'){RA(x,y,w,h,'#05020c',.78);for(let i=0;i<40;i++){const a=i*2.4+t,rr=((t*40+i*17)%260);cPx(x+w/2+Math.cos(a)*rr,y+h/2+Math.sin(a)*rr*.6,1,'#b86aff',.6)}return}
 if(sty==='moon'){if(w<1||h<1)return;RA(x,y,w,h,'#d8e8ff',.35);for(let i=0;i<w;i+=9)RA(x+i,y,1,h,'#ffffff',.12);RA(x,y,w,2,'#ffffff',.9);RA(x,y+h-2,w,2,'#ffffff',.9);return}
 if(sty==='flare'){RA(x,y,w,h,'#ff7a1a',.45);for(let j=0;j<h;j+=4){const f=hash(Math.floor(t*14)+'f'+j+x)%4;if(f===0)RA(x+2,y+j,w-4,2,'#ffe79a',.8)}RA(x,y,2,h,'#ffd166',1);RA(x+w-2,y,2,h,'#ffd166',1);return}
 return _rd.apply(this,arguments)}}

/* ================= 챕터 4 v101 — 예고 연출 전면 교체(빨강/초록 → 별빛) + 새 메커니즘 패턴 10종 =================
   · 보스가 직접 움직이는 공격(도약 · 돌진 · 유영) · 따라오는 추적탄 · 벽에 튕기는 블랙홀 · 박자에 맞춰 떨어지는 별 · 움직이는 미로 · 추적 광선 */
const n4On=()=>typeof G!=='undefined'&&G&&(G.s4!=null||G.s4Rush!=null);
const n4Col=o=>(o&&o.col)||(G&&G.B&&G.B.c)||'#c8a0ff';
N4SPR.none=(x,y,r,t,c)=>{n4G(x,y,r*1.6,c,.25)};
/* ---------- 예고 표시: 별빛 버전 ---------- */
{const T=NPK.circ.tel;NPK.circ.tel=function(o,b,now){if(!n4On())return T.apply(this,arguments);const p=clamp((b-o.t0)/(o.t1-o.t0),0,1),[x,y,r]=o.cf?o.cf(o.t1):[o.x,o.y,o.r],c=n4Col(o),bl=p>.78&&Math.floor(now/70)%2,t=now/1000,hot=bl?'#ffffff':c;
 n4G(x,y,r*1.4,c,.12+.3*p);pcirc(x,y,Math.max(1,r*p),c,.14+.1*p);const n=Math.max(10,Math.round(r*.8));for(let i=0;i<n;i++){const a=i*TAU/n+t*1.4;cPx(x+Math.cos(a)*r,y+Math.sin(a)*r,i%3?1:2,hot,.45+.5*p)}
 cRing(x,y,Math.max(2,Math.round(r*(1.7-p*.7))),c,.25+.45*p,1);for(let k=0;k<4;k++){const a=k*Math.PI/2-t*.8;n4Sp(x+Math.cos(a)*(r+5),y+Math.sin(a)*(r+5),3,'#ffffff',.3+.6*p,t)}
 if(o.label){ctx.font='bold 11px monospace';ctx.textAlign='center';ctx.fillStyle='#000';ctx.globalAlpha=.9;ctx.fillText(o.label,Math.round(x)+1,Math.round(y+5));ctx.fillStyle='#ffffff';ctx.fillText(o.label,Math.round(x),Math.round(y+4));ctx.globalAlpha=1;ctx.textAlign='left'}}}
{const T=NPK.rect.tel;NPK.rect.tel=function(o,b,now){if(!n4On())return T.apply(this,arguments);const p=clamp((b-o.t0)/(o.t1-o.t0),0,1),[x,y,w,h]=o.rf?o.rf(o.t1):[o.x,o.y,o.w,o.h],c=n4Col(o),bl=p>.78&&Math.floor(now/70)%2,t=now/1000;if(w<1||h<1)return;
 RA(Math.round(x),Math.round(y),Math.round(w),Math.round(h),c,.05+.13*p+(bl?.1:0));const fh=Math.round(h*p);RA(Math.round(x),Math.round(y+h-fh),Math.round(w),fh,c,.07);
 for(let i=0;i<w;i+=13)for(let j=(i*7)%13;j<h;j+=13){const tw=.5+.5*Math.sin(t*4+i*.3+j*.2);cPx(x+i,y+j,1,'#ffffff',(.15+.5*p)*tw)}
 const ph=Math.floor(t*20)%8;for(let i=ph;i<w;i+=8){RA(x+i,y,4,1,bl?'#ffffff':c,.9);RA(x+w-i-4,y+h-1,4,1,bl?'#ffffff':c,.9)}for(let j=ph;j<h;j+=8){RA(x,y+h-j-4,1,4,bl?'#ffffff':c,.9);RA(x+w-1,y+j,1,4,bl?'#ffffff':c,.9)}if(o.safe)npSafeDraw(o,now)}}
{const T=NPK.seg.tel;NPK.seg.tel=function(o,b,now){if(!n4On())return T.apply(this,arguments);const p=clamp((b-o.t0)/(o.t1-o.t0),0,1),bl=p>.75&&Math.floor(now/70)%2,tb=o.live?b:o.t1,[ax,ay]=o.a(tb),[bx,by]=o.b(tb),c=n4Col(o),t=now/1000,L=Math.hypot(bx-ax,by-ay)||1;
 line(ax,ay,bx,by,5,(x,y,i)=>{cPx(x,y,i%2?1:2,bl?'#ffffff':c,.3+.6*p)});if(o.w>6){const nx=-(by-ay)/L,ny=(bx-ax)/L;for(const s of [-1,1])line(ax+nx*o.w/2*s,ay+ny*o.w/2*s,bx+nx*o.w/2*s,by+ny*o.w/2*s,7,(x,y)=>cPx(x,y,1,c,.25+.35*p))}
 const q=(t*1.3)%1;n4Sp(ax+(bx-ax)*q,ay+(by-ay)*q,4,'#ffffff',.4+.5*p,t*3)}}
{const T=NPK.orb.tel;NPK.orb.tel=function(o,b,now){if(!n4On()||o.ray==null)return T.apply(this,arguments);const p=clamp((b-o.t0)/(o.t1-o.t0),0,1),[x,y]=o.pos(o.t1),c=n4Col(o),bl=p>.75&&Math.floor(now/70)%2,L=(o.rayL||56)*(.4+.6*p);
 for(let s2=6;s2<L;s2+=6)cPx(x+Math.cos(o.ray)*s2,y+Math.sin(o.ray)*s2,s2%12?1:2,bl?'#ffffff':c,.3+.6*p);cChevron(x+Math.cos(o.ray)*L,y+Math.sin(o.ray)*L,o.ray,bl?'#ffffff':c,.9,3);if(o.chg!==false)n4G(x,y,o.r*2*p+2,c,.6)}}
/* 안전 지대: 초록 원 → 달빛이 고인 원 */
{const S=npSafeDraw;npSafeDraw=function(o,now){if(!n4On()||!o.safe)return S.apply(this,arguments);const t=now/1000;for(const [sx,sy,sr] of o.safe){n4G(sx,sy,sr*1.5,'#bfe0ff',.55);pcirc(sx,sy,sr,'#0a1430',.55);cRing(sx,sy,sr,'#e8f4ff',.95,1);cRing(sx,sy,Math.max(2,sr-4),'#8ab8ff',.5,1);
  for(let i=0;i<10;i++){const a=i*TAU/10+t*.9;n4Sp(sx+Math.cos(a)*sr,sy+Math.sin(a)*sr,i%2?2:3,'#ffffff',.9,t)}ctx.font='bold 9px monospace';ctx.textAlign='center';ctx.fillStyle='#e8f4ff';ctx.globalAlpha=.85;ctx.fillText('SAFE',Math.round(sx),Math.round(sy+3));ctx.globalAlpha=1;ctx.textAlign='left'}}}
/* 활성 원/사각: 별빛 폭발 · 성운 */
{const D=npCircDraw;npCircDraw=function(o,x,y,r,now,b){if(!n4On())return D.apply(this,arguments);const c=n4Col(o),k=clamp((b-o.t1)/Math.max(.1,o.t2-o.t1),0,1),t=now/1000;n4G(x,y,r*1.8,c,.8*(1-k*.6));pcirc(x,y,r,c,.45*(1-k*.5));pcirc(x,y,r*.55,'#ffffff',.35*(1-k));
 cRing(x,y,Math.round(r*(1+k*.8)),'#ffffff',.9*(1-k),2);for(let i=0;i<8;i++){const a=i*TAU/8+t;n4Sp(x+Math.cos(a)*r*(.4+k),y+Math.sin(a)*r*(.4+k),3,'#ffffff',1-k,t*4)}}}
{const D=npRectDraw;npRectDraw=function(o,x,y,w,h,now,b){if(!n4On()||(o.sty&&o.sty!=='plain'))return D.apply(this,arguments);const c=n4Col(o),t=now/1000;RA(x,y,w,h,c,.32);for(let i=0;i<w;i+=9)for(let j=(i*5)%9;j<h;j+=9)cPx(x+i,y+j,1,'#ffffff',.3+.4*Math.sin(t*6+i+j));RA(x,y,w,2,'#ffffff',.9);RA(x,y+h-2,w,2,'#ffffff',.6);RA(x,y,2,h,c,1);RA(x+w-2,y,2,h,c,1)}}
/* 성운 해일 · 반그림자 등 칸 공격도 성운/그림자 질감으로 */
{const D=npRectDraw;npRectDraw=function(o,x,y,w,h,now,b){if(o.sty!=='nebula')return D.apply(this,arguments);const t=now/1000;RA(x,y,w,h,'#2a1a5a',.55);for(let i=0;i<w;i+=6){const k=Math.sin(i*.2+t*3);RA(x+i,y+2+k*2,6,h-4,k>0?'#6a4ac8':'#b08aff',.35)}for(let i=3;i<w;i+=11)cPx(x+i,y+((i*7+Math.floor(t*10))%Math.max(1,h)),1,'#ffffff',.9);RA(x,y,w,2,'#e0d0ff',.9);RA(x,y+h-2,w,2,'#ff8ad8',.7)}}
/* 성운 해일: 무늬를 성운으로 */
{const _m=MV.nebulaTide;const f=NPDEF;}
/* ---------- 도우미 ---------- */
const n4Home=(T0,T1)=>sch(T0,()=>tweenBossNow(HOME.x,HOME.y,T0,T1,p=>1-Math.pow(1-p,2)));
function n4BodyHit(T0,T1,r,dmg){NP({k:'orb',sty:'none',col:G.B.c,r:r||26,t0:T0,t1:T0,t2:T1,noTel:true,pos:()=>{const g=bgeo();return [G.boss.x,g.coreY]},dmg:dmg||14})}
/* 1 유성 사냥꾼: 하늘 도약 — 높이 뛰어올라 내 자리로 내리꽂힘, 착지 충격파 */
defPat('skyLeap','하늘 도약','all',11,'사냥꾼이 하늘로 뛰어오른 뒤 그림자가 나를 쫓다 멈춤 → 그림자에서 벗어나고, 착지 충격파 고리를 대시로 넘어',t=>{const n=2+Math.min(1,G.phase);let T=t;
 for(let k=0;k<n;k++){const T0=T,Tup=T0+.6,Tlock=T0+1.8,Tdown=T0+2.2;let tx=P.x,ty=P.y;n4Act(T0,Tup,'throw');
  sch(T0,()=>{sfx(200,.4,'sawtooth',.05,600);tweenBossNow(G.boss.x,AY-90,T0+.25,Tup,p=>p*p)});
  NP({k:'circ',label:'⌖',t0:T0+.3,t1:Tdown,t2:Tdown+.3,col:'#ff7a2a',dmg:16,step:(o,b)=>{if(b<Tlock){tx=clamp(P.x,AX+30,AX+AW-30);ty=clamp(P.y,AY+50,AY+AH-16)}},cf:()=>[tx,ty,30]});
  sch(Tlock,()=>{tweenBossNow(tx,ty+14,Tlock,Tdown,p=>p*p*p);sfx(600,.4,'sawtooth',.05,80)});
  sch(Tdown,()=>{G.shake=Math.max(G.shake,.7);G.flash=.3;sfx(50,.6,'sawtooth',.13,25);for(let r=0;r<2;r++){const m=22;for(let i=0;i<m;i++){const a=i*TAU/m+r*.14;npShot(Tdown+r*.35,Tdown+r*.35+.01,tx,ty,a,(70-r*16)*n4S(),{sty:'ember',col:'#ffb070',r:4,chg:false,noTel:true,dmg:9})}}});
  T=Tdown+(k<n-1?.8:0)}
 n4Home(T+.3,T+1.1);return T-t+1.4});
/* 2 일식의 눈: 응시 광선 — 한 줄기 빛이 나를 늦게 따라옴 */
defPat('solarGaze','태양의 응시','head',11,'눈에서 굵은 광선이 나를 천천히 따라옴 → 광선 끝보다 빨리 원을 그리며 돌고, 굵어질 때 대시로 넘어',t=>{const tel=n4T()+.2,dur=4.2+G.phase*.6;n4Act(t,t+tel,'glare');
 sch(t,()=>{const [cx,cy]=n4Core();let ang=Math.atan2(P.y-cy,P.x-cx);let lb=null;npCharge(t,t+tel,()=>[cx,cy],'#ffd98a',16);
  NP({k:'seg',sty:'ray',w:14,t0:t,t1:t+tel,t2:t+tel+dur,live:true,a:()=>[cx,cy],b:b=>[cx+Math.cos(ang)*560,cy+Math.sin(ang)*560],col:'#ffd98a',dmg:13,step:(o,b)=>{const dt=lb==null?0:Math.max(0,b-lb);lb=b;const want=Math.atan2(P.y-cy,P.x-cx);let d=((want-ang+Math.PI*3)%TAU)-Math.PI;const sp=(b<t+tel?2.4:.55+(b-t-tel)*.08)*n4S();ang+=clamp(d,-sp*dt,sp*dt)}});
  if(G.phase>=1)for(let i=0;i<3;i++){const T1=t+tel+1+i*1.1;sch(T1,()=>{const a=ang;for(const s of [-1,1])npShot(T1,T1+.5,cx,cy,a+s*.5,70*n4S(),{sty:'star4',col:'#ffd98a',r:4,rayL:40,chg:false,dmg:9})})}});
 return tel+dur+.5});
/* 3 혜성 뱀: 뱀의 돌진 — 몸째로 경기장을 S자로 가로지르며 얼음 자국을 남김 */
defPat('serpentDive','혜성 뱀의 돌진','all',11,'뱀이 직접 경기장을 S자로 휩쓸고 지나감 → 점선 경로를 보고 비켜서고, 남은 얼음 자국도 피해',t=>{const tel=n4T()+.4,pts=[],n=4;n4Act(t,t+tel,'bite');
 sch(t,()=>{const top=AY+AH*.3,bot=AY+AH-30;pts.push([G.boss.x,G.boss.y]);for(let i=0;i<n;i++){const x=i%2?AX+AW-40:AX+40,y=lerp(top,bot,(i+1)/n)+(i===n-1?0:0);pts.push([x,Math.min(bot,y)])}pts.push([HOME.x,HOME.y]);
  for(let i=0;i<pts.length-1;i++){const a=pts[i],c=pts[i+1];NP({k:'seg',sty:'tail',w:34,t0:t,t1:t+tel,t2:t+tel+.01,a:()=>a,b:()=>c,col:'#8ae8ff',dmg:0,harm:false})}
  const leg=.55;for(let i=0;i<pts.length-1;i++){const a=pts[i+1],T0=t+tel+i*leg;sch(T0,()=>{tweenBossNow(a[0],a[1],T0,T0+leg,p=>p);G.boss.dash=i<pts.length-2;sfx(500,.3,'sawtooth',.04,200)});if(i<pts.length-2)for(let s=1;s<=4;s++){const q=s/5,px=lerp(pts[i][0],a[0],q),py=lerp(pts[i][1],a[1],q)-18;NP({k:'orb',sty:'shard',col:'#bff4ff',r:6,t0:T0+q*leg,t1:T0+q*leg+.01,t2:T0+q*leg+2,noTel:true,pos:()=>[px,py],dmg:9})}}
  sch(t+tel+(pts.length-1)*leg,()=>{G.boss.dash=false});n4BodyHit(t+tel,t+tel+(pts.length-2)*leg,30,15)});
 return tel+(n+1)*.55+2.2});
/* 4 성운 고래: 고래의 유영 — 고래가 경기장을 크게 한 바퀴 헤엄치며 별물결을 뿌림 */
defPat('whaleSwim','고래의 유영','all',11,'고래가 직접 경기장을 크게 돌며 헤엄침 → 고래 몸과, 지나간 자리에서 퍼지는 별물결을 피해',t=>{const tel=n4T()+.2,dur=4.4,cx=AX+AW/2,cy=AY+AH*.5,Rx=AW*.36,Ry=AH*.32,dir=P.x<cx?1:-1;n4Act(t,t+tel,'sing');
 const a0=-Math.PI/2;NP({k:'circ',x:cx,y:cy,r:Math.min(Rx,Ry),t0:t,t1:t+tel,t2:t+tel+.01,col:'#b08aff',dmg:0,harm:false,label:'≈'});
 const path=b=>{const q=clamp((b-t-tel)/dur,0,1),a=a0+dir*q*TAU;return [cx+Math.cos(a)*Rx,cy+Math.sin(a)*Ry+30]};
 for(let i=0;i<=24;i++){const b0=t+tel+i*dur/24;sch(b0,()=>{const [x,y]=path(b0);tweenBossNow(x,y,b0,b0+dur/24,p=>p);G.boss.dash=true;if(i%4===2){const m=8;for(let j=0;j<m;j++){const a=j*TAU/m+i;npShot(b0,b0+.3,x,y-24,a,38*n4S(),{sty:'plank',col:j%2?'#6ad8ff':'#ff8ad8',r:4,rayL:0,chg:false,noTel:true,dmg:9})}}})}
 n4BodyHit(t+tel,t+tel+dur,32,15);sch(t+tel+dur,()=>{G.boss.dash=false});n4Home(t+tel+dur,t+tel+dur+.8);
 return tel+dur+1.4});
/* 5 쌍둥이 성좌: 두 별의 추격 — 분홍·하늘 별이 나를 쫓아오고, 둘이 부딪히면 폭발 */
defPat('twinChase','두 별의 추격','all',11,'분홍·하늘 두 별이 나를 쫓아옴 → 둘이 서로 부딪히도록 사이로 끌어들이면 폭발하며 사라짐, 폭발 고리 조심',t=>{const tel=n4T(),dur=5;n4Act(t,t+tel,'split');
 sch(t,()=>{const g=bgeo(),S=[{x:g.x-50,y:g.coreY,col:'#ff9ad5'},{x:g.x+50,y:g.coreY,col:'#8ae8ff'}];let lb=null,boom=false;
  const upd=b=>{const dt=lb==null?0:Math.max(0,Math.min(.1,b-lb));lb=b;if(b<t+tel||boom)return;const sp=(58+(b-t-tel)*6)*n4S();for(const s of S){const dx=P.x-s.x,dy=P.y-s.y,l=Math.hypot(dx,dy)||1;s.x+=dx/l*sp*dt;s.y+=dy/l*sp*dt}if(Math.hypot(S[0].x-S[1].x,S[0].y-S[1].y)<16){boom=true;const bx=(S[0].x+S[1].x)/2,by=(S[0].y+S[1].y)/2;G.shake=.5;sfx(900,.5,'square',.06,200);for(let i=0;i<16;i++)npShot(b,b+.01,bx,by,i*TAU/16,70*n4S(),{sty:'star4',col:i%2?'#ff9ad5':'#8ae8ff',r:4,chg:false,noTel:true,dmg:9})}};
  S.forEach((s,i)=>NP({k:'orb',sty:'twin',col:s.col,r:9,t0:t,t1:t+tel,t2:t+tel+dur,step:i===0?(o,b)=>upd(b):null,pos:b=>boom&&b>t+tel?[-999,-999]:[s.x,s.y],dmg:13}))});
 return tel+dur+.8});
/* 6 블랙홀 방랑자: 떠도는 특이점 — 작은 블랙홀 세 개가 벽에 튕기며 떠돌고 주변을 살짝 끌어당김 */
defPat('wanderHoles','떠도는 특이점','field',11,'작은 블랙홀들이 벽에 튕기며 떠돎 → 튕기는 방향을 미리 읽고, 가까이 가면 끌려가니 거리를 둬',t=>{const tel=n4T()+.2,dur=5.2,n=2+Math.min(2,G.phase);n4Act(t,t+tel,'pull');
 sch(t,()=>{const [cx,cy]=n4Core();for(let i=0;i<n;i++){const a=Math.PI/2+(i-(n-1)/2)*.7,pos=npBounce(cx,cy+20,a,78*n4S(),t+tel,14);NP({k:'orb',sty:'darkm',col:'#b86aff',r:12,t0:t,t1:t+tel,t2:t+tel+dur,ray:a,rayL:60,pos,dmg:14,
   step:i===0?(o,b)=>{if(b<t+tel)return;let fx=0,fy=0;for(let j=0;j<n;j++){const q=npBounce(cx,cy+20,Math.PI/2+(j-(n-1)/2)*.7,78*n4S(),t+tel,14)(b),dx=q[0]-P.x,dy=q[1]-P.y,d=Math.hypot(dx,dy)||1;if(d<90){fx+=dx/d*(90-d)*.012;fy+=dy/d*(90-d)*.012}}P.x=clamp(P.x+fx,AX+6,AX+AW-6);P.y=clamp(P.y+fy,AY+6,AY+AH-6)}:null})}});
 return tel+dur+.4});
/* 7 초신성 기사: 기사의 돌격 — 검을 겨누고 경기장 끝까지 일직선 돌격, 지나간 길에 불길 */
defPat('knightCharge','기사의 돌격','all',11,'검을 겨눈 기사가 나를 향해 일직선으로 돌격 → 줄에서 옆으로 비켜서면, 뒤이어 불길이 줄을 따라 번짐',t=>{const n=2+Math.min(1,G.phase),tel=n4T();let T=t;
 for(let k=0;k<n;k++){const T0=T,T1=T0+tel,T2=T1+.45;let ex=0,ey=0,sx=0,sy=0;n4Act(T0,T1,'slash');
  sch(T0,()=>{sx=G.boss.x;sy=G.boss.y;const a=Math.atan2(P.y-(sy-20),P.x-sx);ex=clamp(sx+Math.cos(a)*600,AX+30,AX+AW-30);ey=clamp(sy+Math.sin(a)*600,AY+40,AY+AH-10);const A=[sx,sy-20],B=[ex,ey-20];NP({k:'seg',sty:'lance',w:40,t0:T0,t1:T1,t2:T1+.01,a:()=>A,b:()=>B,col:'#ffd166',dmg:0,harm:false});
   sch(T1,()=>{tweenBossNow(ex,ey,T1,T2,p=>p*p);G.boss.dash=true;sfx(300,.4,'sawtooth',.07,900)});sch(T2,()=>{G.boss.dash=false;G.shake=.5;sfx(70,.4,'square',.08,40)});
   NP({k:'seg',sty:'lance',w:16,t0:T2,t1:T2+.3,t2:T2+1.2,a:()=>A,b:()=>B,col:'#ff9a2a',dmg:11})});n4BodyHit(T1,T2,30,16);T=T2+.9}
 n4Home(T-.5,T+.3);return T-t+.8});
/* 8 달의 여왕: 달의 위상 (재설계) — 네 개의 달이 차고 기울며, 보름달이 된 구역이 빛에 잠김 */
defPat('moonPhase','달의 위상','field',11,'네 구역 위에 달이 떠 있고 보름달이 된 구역에 달빛이 쏟아짐 → 초승달·그믐 구역으로, 위상은 시계방향으로 돎',t=>{const tel=Math.max(1.5,npTel()+.4),n=4+Math.min(2,G.phase),cw=AW/2,ch=AH/2,Q=[[0,0],[1,0],[1,1],[0,1]];n4Act(t,t+tel,'cast');
 const start=Math.floor(RND()*4),lit=k=>{const a=(start+k)%4;return G.phase>=2?[a,(a+2)%4]:[a]};
 for(let q=0;q<4;q++){const [qx,qy]=Q[q];NP({k:'orb',sty:'moonq',col:'#eef4ff',r:9,t0:t,t1:t,t2:t+n*1.6+tel+.6,noTel:true,harm:false,pos:()=>[AX+qx*cw+cw/2,AY+qy*ch+14],ph:b=>{const k=Math.floor((b-t)/1.6);return lit(Math.max(0,k)).includes(q)?1:0}})}
 for(let k=0;k<n;k++){const T0=t+k*1.6,T1=T0+tel;sch(T0,()=>{for(const q of lit(k)){const [qx,qy]=Q[q];NP({k:'rect',sty:'moon',x:AX+qx*cw,y:AY+qy*ch,w:cw,h:ch,t0:T0,t1:T1,t2:T1+.7,col:'#d8e8ff',dmg:12})}sfx(700,.5,'sine',.03,900)})}
 return (n-1)*1.6+tel+1});
N4SPR.moonq=(x,y,r,t,c,a)=>{};
{const _od=NPK.orb.draw;NPK.orb.draw=function(o,b,now){if(o.sty==='moonq'){const [x,y]=o.pos(b),f=o.ph?o.ph(b):0;n4G(x,y,f?30:14,'#bfe0ff',f?.8:.3);pcirc(x,y,o.r,'#eef4ff',1);if(!f)pcirc(x+4,y-2,o.r-1,'#0a0e20',1);else cRing(x,y,o.r+3+Math.sin(now/100)*1.5,'#ffffff',.8,1);return}return _od.apply(this,arguments)}}
/* 이 장식용 달은 판정 시간 전부터 보여야 함 */
{const _nd=npDrawTop;npDrawTop=function(now,beat){const r=_nd.apply(this,arguments);try{for(const o of npA())if(o.sty==='moonq'&&beat>=o.t0&&beat<o.t1)NPK.orb.draw(o,beat,now)}catch(e){}return r}}
/* 9 별자리 직조자: 별자리 미로 — 별 벽이 한 줄씩 내려오고 틈이 한 칸, 틈 위치가 꺾이며 이어짐 */
defPat('starMaze','별자리 미로','field',11,'별로 엮인 벽이 위에서 한 줄씩 내려옴 → 줄마다 한 칸 뚫린 틈으로, 틈이 옆 칸으로 옮겨 가니 따라 이동',t=>{const tel=n4T(),rows=6+G.phase,cols=8,cw=AW/cols,sp=46*n4S();n4Act(t,t+tel,'stitch');let gap=Math.floor(RND()*cols);
 for(let r=0;r<rows;r++){const T0=t+r*1.05,T1=T0+tel*.6;gap=clamp(gap+(RND()<.5?-1:1)*(r?1:0),0,cols-1);const g=gap;sch(T0,()=>{for(let c=0;c<cols;c++){if(c===g)continue;const x=AX+c*cw+2;NP({k:'rect',sty:'thread',x,y:AY,w:cw-4,h:8,t0:T0,t1:T1,t2:T1+AH/sp+.2,col:'#ffe9a8',dmg:11,rf:b=>[x,AY+Math.max(0,b-T1)*sp,cw-4,8]})}sfx(1200+r*60,.1,'triangle',.03,1500)})}
 return (rows-1)*1.05+tel*.6+AH/sp+.4});
{const D=npRectDraw;npRectDraw=function(o,x,y,w,h,now,b){if(o.sty!=='thread')return D.apply(this,arguments);const t=now/1000;RA(x,y+h/2-1,w,2,'#ffe9a8',.9);RA(x,y,w,h,'#ffe9a8',.14);for(let i=2;i<w;i+=8)n4Sp(x+i,y+h/2,2,'#ffffff',.8,t*2+i);n4Sp(x,y+h/2,3,'#ffe9a8',1,0);n4Sp(x+w,y+h/2,3,'#ffe9a8',1,0)}}
/* 10 마지막 별: 무너지는 하늘 — 박자에 맞춰 별이 레인으로 떨어짐 (리듬 게임처럼) */
defPat('fallingSky','무너지는 하늘','field',12,'여덟 줄 레인에 별이 박자마다 떨어짐 → 바닥 표시가 차오르는 레인을 피해, 박자에 맞춰 빈 레인으로',t=>{const tel=Math.max(1,npTel()*.8),lanes=8,lw=AW/lanes,n=12+G.phase*4;n4Act(t,t+tel,'flare');
 let last=-1;for(let i=0;i<n;i++){const T1=t+tel+i*.5,cnt=2+(i%4===3?2:0)+(G.phase>=2?1:0),picks=[];let pl=clamp(Math.floor((P.x-AX)/lw),0,lanes-1);while(picks.length<cnt){const l=Math.floor(RND()*lanes);if(!picks.includes(l)&&l!==last)picks.push(l)}last=picks[0];
  for(const l of picks){const x=AX+l*lw+lw/2,T0=T1-tel;NP({k:'rect',x:AX+l*lw+2,y:AY,w:lw-4,h:AH,t0:T0,t1:T1,t2:T1+.18,col:['#fff4c8','#8ae8ff','#ff9ad5','#ffd98a'][l%4],dmg:11});NP({k:'orb',sty:'star4',col:'#ffffff',r:7,t0:T0,t1:T0+.01,t2:T1+.1,noTel:true,harm:false,pos:b=>[x,AY-10+clamp((b-T0)/tel,0,1)*(AH+10)]})}
  sch(T1,()=>{sfx(880+(i%4)*110,.12,'square',.03,880);if(i%4===3)G.shake=Math.max(G.shake,.2)})}
 return tel+n*.5+.6});
/* 성운 해일 칸 모양을 성운 질감으로 */
{const _n=MV.nebulaTide;MV.nebulaTide=function(t){const before=npA().length,r=_n.apply(this,arguments);return r}}
{const _np=NP;NP=function(o){if(o&&o.k==='rect'&&o.col==='#b08aff'&&!o.sty&&n4On())o.sty='nebula';return _np(o)}}
/* 사건의 지평선 → 떠도는 특이점으로 교체 (초록 안전원 제거) */

