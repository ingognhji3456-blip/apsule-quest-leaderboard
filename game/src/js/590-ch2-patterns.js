/* ================= 챕터 2 전용 새 패턴 (보스마다 2개 추가) ================= */
/* 10 뿌리아귀 */
defPat('vineWhip','덩굴 채찍','all',9,'덩굴이 반원을 그리며 휩쓸어 옴 → 휩쓰는 방향 뒤쪽으로',t=>{const tel=npTel(),n=2+Math.min(1,G.phase),g0=npG(),L=190;
 for(let k=0;k<n;k++){const ts=t+k*1.8;sch(ts,()=>{const aP=Math.atan2(P.y-g0.coreY,P.x-HOME.x),dir=k%2?1:-1,a0=aP-dir*1.4,sw=2.8,dur=1.1;NP({k:'seg',sty:'hand',w:8,col:'#6ab04a',live:true,t0:ts,t1:ts+tel,t2:ts+tel+dur,a:()=>[HOME.x,g0.coreY],b:b=>{const q=clamp((b-(ts+tel))/dur,0,1),a=a0+dir*sw*q;return [HOME.x+Math.cos(a)*L,g0.coreY+Math.sin(a)*L*.85]},dmg:13,
  deco:(o,b,now)=>{if(b<o.t1)for(let i=0;i<5;i++){const a=a0+dir*sw*(i/4);cChevron(HOME.x+Math.cos(a)*(L+10),g0.coreY+Math.sin(a)*(L+10)*.85,a+dir*Math.PI/2,'#caff6b',.9,3)}}})})}
 return (n-1)*1.8+tel+1.3});
defPat('seedBloom','씨앗 개화','hands',10,'심은 씨앗이 십자로 가시를 뻗음 → 씨앗의 대각선 방향으로',t=>{const tel=Math.max(1.6,npTel()),n=3+G.phase;
 for(let i=0;i<n;i++){const ts=t+i*.5;sch(ts,()=>{const [x,y]=npIn(P.x+(RND()-.5)*150,P.y+(RND()-.5)*100,20),h=G.boss.hands[i%2];G.arcs.push({x0:h.x,y0:h.y,x1:x,y1:y,t0:ts,t1:ts+.7,h:40,kind:'seed'});
  NP({k:'orb',sty:'spore',r:5,harm:false,col:'#9bd65a',t0:ts+.7,t1:ts+.71,t2:ts+tel+1,pos:()=>[x,y]});for(let a=0;a<4;a++){const ang=a*Math.PI/2;NP({k:'seg',sty:'hand',w:6,col:'#6ab04a',t0:ts+.7,t1:ts+tel,t2:ts+tel+.8,a:()=>[x,y],b:b=>{const q=clamp((b-(ts+tel))/.25,0,1);return [x+Math.cos(ang)*70*q,y+Math.sin(ang)*70*q]},dmg:11})}})}
 return n*.5+tel+1});
/* 11 포자여왕 */
defPat('sporeWaltz','포자 왈츠','all',10,'포자가 여왕 주위를 돌다 나선으로 흩어짐 → 나선 팔 사이로',t=>{const d=D2(),n=12,g0=npG(),spin=1.6,dir=RND()<.5?1:-1,rel=t+2.2;npWarn(t,.5);
 for(let i=0;i<n;i++){const a0=i*TAU/n;NP({k:'orb',sty:'spore',r:5,t0:t,t1:t+.6,t2:rel+4,pos:b=>{if(b<rel){const a=a0+dir*spin*(b-t);return [HOME.x+Math.cos(a)*50,g0.coreY+Math.sin(a)*38]}const a=a0+dir*spin*(rel-t)+dir*.6*(b-rel),r=50+(b-rel)*62*d.sp;return [HOME.x+Math.cos(a)*r,g0.coreY+Math.sin(a)*r*.8]},dmg:10})}
 return 2.2+4});
defPat('mushroomRing','버섯 고리','head',10,'갓에서 포자를 뿌려 내 주위에 버섯이 솟음 → 빠진 한 곳으로 탈출',t=>{const tel=Math.max(1.6,npTel()),w=2+Math.min(1,G.phase);npWarn(t,.5);
 for(let k=0;k<w;k++){const ts=t+k*2;sch(ts,()=>{const g=bgeo(),cx=P.x,cy=P.y,n=10,gap=Math.floor(RND()*n);for(let i=0;i<n;i++){if(i===gap)continue;const a=i*TAU/n,[x,y]=npIn(cx+Math.cos(a)*56,cy+Math.sin(a)*44,10);G.arcs.push({x0:g.x,y0:g.top,x1:x,y1:y,t0:ts,t1:ts+.8,h:60,kind:'spore'});NP({k:'circ',x,y,r:16,t0:ts,t1:ts+tel,t2:ts+tel+.8,col:'#c98fe6',dmg:11})}
  const ga=gap*TAU/n;NP({k:'orb',harm:false,noTel:true,r:1,t0:ts,t1:ts+tel,t2:ts+tel+.01,pos:()=>[cx,cy],deco:(o,b)=>{if(b<o.t1)cChevron(cx+Math.cos(ga)*70,cy+Math.sin(ga)*56,ga,'#a6f5c6',1,5)}});sfx(500,.2,'sine',.03,300)})}
 return (w-1)*2+tel+1});
/* 12 늪 개구리 */
defPat('lilyHop','연잎 뛰기','all',10,'늪 전체가 차오름 → 초록 연잎 위로 올라가',t=>{const tel=Math.max(2.2,npTel()+1),w=1+Math.min(2,G.phase);
 for(let k=0;k<w;k++){const ts=t+k*3.4;sch(ts,()=>{const safe=[];let tr=0;while(safe.length<4&&tr++<60){const [x,y]=npIn(AX+30+RND()*(AW-60),AY+30+RND()*(AH-60),24);if(Math.hypot(x-HOME.x,y-HOME.y)<60)continue;if(safe.every(s=>Math.hypot(s[0]-x,s[1]-y)>80))safe.push([x,y,22])}NP({k:'rect',sty:'plain',x:AX,y:AY,w:AW,h:AH,safe,t0:ts,t1:ts+tel,t2:ts+tel+.9,col:'#3a6a3a',dmg:12})})}
 return (w-1)*3.4+tel+1});
defPat('bubbleTongue','거품 혀','head',9,'혀가 빠르게 뻗었다 돌아옴 → 혀 길이 밖, 옆으로',t=>{const tel=npTel(),n=3+G.phase;npWarn(t,.6);
 for(let k=0;k<n;k++){const ts=t+k*1.1;sch(ts,()=>{const g=bgeo(),x0=g.x,y0=g.headY+8,a=Math.atan2(P.y-y0,P.x-x0),L=Math.min(260,Math.hypot(P.x-x0,P.y-y0)+50);NP({k:'seg',sty:'hand',w:8,col:'#ff8aa8',t0:ts,t1:ts+tel,t2:ts+tel+.7,a:()=>[x0,y0],b:b=>{const q=clamp((b-(ts+tel))/.7,0,1),e=Math.sin(q*Math.PI);return [x0+Math.cos(a)*L*e,y0+Math.sin(a)*L*e]},dmg:12,deco:(o,b,now)=>{if(b>=o.t1){const [x,y]=o.b(b);pcirc(x,y,6,'#ff5d8f',1);pcirc(x-1,y-1,2,'#ffffff',1)}}});sch(ts+tel,()=>sfx(600,.08,'sine',.04,200))})}
 return n*1.1+tel+.8});
/* 13 백골 짐승 */
defPat('boneBoomerang','뼈 부메랑','hands',10,'발톱으로 뼈를 던지면 곡선을 그리며 돌아옴 → 갈 때·올 때 화살표를 모두 피해',t=>{const tel=Math.max(1.4,npTel()),n=2+G.phase;npHands(t,.6,30,0);
 for(let i=0;i<n;i++){const ts=t+.6+i*.9;sch(ts,()=>{const h=G.boss.hands[i%2],x0=h.x,y0=h.y,[tx,ty]=npIn(P.x,P.y,20),dx=tx-x0,dy=ty-y0,l=Math.hypot(dx,dy)||1,cv=(i%2?-1:1)*60,T1=ts+tel,dur=2.4/D2().sp;
  NP({k:'orb',sty:'bone',r:8,t0:ts,t1:T1,t2:T1+dur,pos:b=>{const u=clamp((b-T1)/dur,0,1),s=Math.sin(u*Math.PI),off=Math.sin(u*TAU)*cv;return [x0+dx*s-dy/l*off,y0+dy*s+dx/l*off]},prev:dur,prevN:14,dmg:12})})}
 npRest(t+.6+n*.9+tel+2.6);return .6+n*.9+tel+2.6});
defPat('skullRoll','해골 굴리기','hands',10,'해골이 벽에 튕기며 굴러다님 → 궤적 화살표를 보고 피해',t=>{const d=D2(),tel=npTel(),n=2+G.phase;
 for(let i=0;i<n;i++){const ts=t+i*.8;sch(ts,()=>{const h=G.boss.hands[i%2];h.kick=1;const a=Math.atan2(P.y-h.y,P.x-h.x)+(RND()-.5)*.8;NP({k:'orb',sty:'bone',r:8,t0:ts,t1:ts+tel,t2:ts+tel+5,pos:npBounce(h.x,h.y,a,74*d.sp,ts+tel),prev:2,prevN:9,dmg:12})})}
 return n*.8+tel+5});
/* 14 거미 */
defPat('webPluck','거미줄 튕기기','all',10,'몸에서 거미줄 살을 쏘아 두르고 차례로 튕김 → 울리는 줄 사이로',t=>{const tel=npT?npT():npTel(),n=6+G.phase*2;
 sch(t,()=>{const g=bgeo(),cx=g.x,cy=g.coreY,a0=RND()*TAU;for(let i=0;i<n;i++){const a=a0+i*TAU/n,ex=clamp(cx+Math.cos(a)*460,AX,AX+AW),ey=clamp(cy+Math.sin(a)*460,AY,AY+AH);const T1=t+tel+i*.45;
  NP({k:'seg',sty:'hand',w:1,harm:false,noTel:true,col:'#e8e8f0',t0:t,t1:t,t2:T1+.6,a:()=>[cx,cy],b:b=>{const q=clamp((b-t)/.6,0,1);return [lerp(cx,ex,q),lerp(cy,ey,q)]}});NP({k:'seg',sty:'elec',w:8,col:'#ffffff',t0:T1-1,t1:T1,t2:T1+.45,a:()=>[cx,cy],b:()=>[ex,ey],dmg:11});sch(T1,()=>sfx(300+i*60,.2,'triangle',.04,200))}});
 return tel+n*.45+.8});
defPat('spiderDrop','거미 낙하','field',9,'거미가 실을 타고 내려옴 → 실 그림자 밖으로',t=>{const d=D2(),tel=npTel(),n=5+G.phase*2;
 for(let i=0;i<n;i++){const ts=t+i*.4;sch(ts,()=>{const [x,y]=npIn(P.x+(RND()-.5)*140,P.y+(RND()-.5)*90,16);NP({k:'seg',sty:'hand',w:1,harm:false,col:'#e8e8f0',t0:ts,t1:ts+.01,t2:ts+tel+1.2,a:()=>[x,AY],b:b=>[x,lerp(AY,y,clamp((b-ts)/tel,0,1))]});NP({k:'orb',sty:'default',r:8,col:'#3a2a3a',t0:ts,t1:ts+tel,t2:ts+tel+1.2,pos:b=>[x,lerp(AY,y,clamp((b-ts)/tel,0,1))],dmg:11,
  deco:(o,b,now)=>{const [px,py]=o.pos(b);if(b<o.t1){pcirc(x,y,8,'#000',.25*(b-o.t0)/(o.t1-o.t0));npSpr('default',px,py,5,now,{col:'#3a2a3a'},b)}for(let k=0;k<4;k++){R(Math.round(px-9+k*5),Math.round(py+(k%2?2:-2)),2,1,'#1a1a1a')}R(Math.round(px-2),Math.round(py-2),1,1,'#ff4d6d');R(Math.round(px+1),Math.round(py-2),1,1,'#ff4d6d')}})})}
 return n*.4+tel+1.3});
/* 15 벌 */
defPat('honeyPool','꿀 웅덩이','hands',9,'침으로 꿀 방울을 쏘아 떨어진 곳이 번짐 → 번지기 전에 멀리',t=>{const tel=Math.max(1.4,npTel()),n=3+G.phase;
 for(let i=0;i<n;i++){const ts=t+i*.7;sch(ts,()=>{const g=bgeo(),[x,y]=npIn(P.x+(RND()-.5)*100,P.y+(RND()-.5)*60,20);G.arcs.push({x0:g.x,y0:g.y-8,x1:x,y1:y,t0:ts,t1:ts+.8,h:50,kind:'honey'});NP({k:'circ',x,y,r:12,t0:ts,t1:ts+tel,t2:ts+tel+3,col:'#ffd23a',cf:b=>[x,y,b<ts+tel?34:lerp(14,40,clamp((b-(ts+tel))/1.5,0,1))],dmg:10})})}
 return n*.7+tel+3});
defPat('waggleDance','8자 춤','all',11,'보스에서 벌떼가 나와 8자를 그림 → 8자 궤적 화살표 밖, 가장자리로',t=>{const tel=Math.max(1.6,npTel()),dur=6,n=6+G.phase*2,cx=HOME.x,cy=(AY*2+AH)/2,ax=170,ay=90,w=.9*D2().sp;
 sch(t,()=>{const g=bgeo();for(let i=0;i<n;i++){const ph=i*.35,T1=t+tel,pp=b=>{const q=w*(b-T1)-ph;return [cx+Math.sin(q)*ax,cy+Math.sin(2*q)*ay/1.2]};NP({k:'orb',sty:'bee',r:5,t0:t,t1:T1,t2:T1+dur,pos:b=>{if(b>=T1)return pp(b);const u=clamp((b-t)/tel,0,1),[x,y]=pp(T1);return [lerp(g.x,x,u),lerp(g.coreY,y,u)]},prev:i===0?3:0,prevN:14,dmg:10,deco:(o,b,now)=>{if(b<o.t1){const [x,y]=o.pos(b);npSpr('bee',x,y,5,now,o,b)}}})}});
 return tel+dur});
/* 16 수정 기생체 */
defPat('prismWall','수정 기둥 행진','field',9,'수정 기둥이 줄지어 솟으며 다가옴 → 줄의 옆으로',t=>{const tel=npTel(),lines=2+G.phase,g0=npG();
 for(let k=0;k<lines;k++){const ts=t+k*.9;sch(ts,()=>{const a=Math.atan2(P.y-g0.coreY,P.x-HOME.x)+(k-1)*.35;for(let i=1;i<9;i++){const [x,y]=[HOME.x+Math.cos(a)*i*30,g0.coreY+Math.sin(a)*i*26];if(x<AX+6||x>AX+AW-6||y<AY+6||y>AY+AH-6)break;const td=ts+i*.12;NP({k:'circ',x,y,r:13,t0:td,t1:td+tel,t2:td+tel+.9,col:'#e0c3ff',dmg:11,deco:(o,b,now)=>{if(b>=o.t1)npSpr('crystal',x,y-4,8,now,o,b)}})}})}
 return lines*.9+tel+2});
defPat('facetBeam','굴절 광선','head',10,'수정에 맞은 빛이 세 갈래로 갈라짐 → 수정 뒤 세 줄을 피해',t=>{const tel=Math.max(1.4,npTel()),n=2+Math.min(1,G.phase);npEye(t,t+tel,t+tel+1.2);
 for(let k=0;k<n;k++){const ts=t+k*1.5;sch(ts,()=>{const g=bgeo(),[cx,cy]=npIn(lerp(g.x,P.x,.55)+(RND()-.5)*40,lerp(g.headY,P.y,.55),30),a=Math.atan2(cy-g.headY,cx-g.x);NP({k:'orb',sty:'crystal',r:8,harm:false,t0:ts,t1:ts+.01,t2:ts+tel+1.1,pos:()=>[cx,cy]});
  NP({k:'seg',sty:'laser',w:8,col:'#e0c3ff',t0:ts,t1:ts+tel,t2:ts+tel+1,a:()=>[g.x,g.headY],b:()=>[cx,cy],dmg:12});for(const o of [-.5,0,.5]){const aa=a+o;NP({k:'seg',sty:'laser',w:6,col:'#ffffff',t0:ts,t1:ts+tel+.15,t2:ts+tel+1,a:()=>[cx,cy],b:()=>[cx+Math.cos(aa)*400,cy+Math.sin(aa)*400],dmg:12})}})}
 return (n-1)*1.5+tel+1.2});
/* 17 심연 */
defPat('bubbleStream','거품 물줄기','head',10,'아가리에서 거품 물줄기를 뿜으며 훑음 → 점선 방향 반대로 돌아',t=>{const tel=Math.max(1.4,npTel()),dur=3.2,dir=RND()<.5?1:-1;G.boss.openTw={b0:t,b1:t+1,to:1};
 sch(t,()=>{const g=bgeo(),mx=g.x,my=g.coreY+6,a0=Math.atan2(P.y-my,P.x-mx)-dir*.9;npCharge(t,t+tel,()=>[mx,my],'#a8e8ff');const n=Math.round(dur/.12);for(let i=0;i<n;i++){const tf=t+tel+i*.12,a=a0+dir*1.8*i/n;npShot(tf-tel,tf,mx,my,a,90*D2().sp,{sty:'bubble',r:6,col:'#a8e8ff',rayL:i%4===0?60:0,chg:false,dmg:9})}});
 sch(t+tel+dur,()=>{G.boss.openTw={b0:t+tel+dur,b1:t+tel+dur+.5,to:0}});return tel+dur+3});
defPat('inkCloud','먹물 구름','head',9,'먹물이 퍼져 번짐 → 번지는 가장자리 밖으로 물러나',t=>{const tel=npTel(),n=2+G.phase;
 for(let i=0;i<n;i++){const ts=t+i*.8;sch(ts,()=>{const [x,y]=npIn(P.x+(RND()-.5)*60,P.y+(RND()-.5)*40,30),g=bgeo();G.arcs.push({x0:g.x,y0:g.headY,x1:x,y1:y,t0:ts,t1:ts+.6,h:50,kind:'ink'});NP({k:'circ',x,y,r:40,t0:ts,t1:ts+tel,t2:ts+tel+2.2,col:'#2a2440',cf:b=>[x,y,b<ts+tel?40:lerp(18,46,clamp((b-(ts+tel))/1.4,0,1))],dmg:11})})}
 return n*.8+tel+2.3});
/* 18 잿빛 망령 */
defPat('lanternDance','등불 원무','all',10,'가슴 등불에서 불씨들이 나와 나를 둘러싸고 조여 옴 → 두 불씨 사이로 빠져나가',t=>{const tel=Math.max(1.6,npTel()),n=8,dur=3;
 sch(t,()=>{const g=bgeo(),cx=P.x,cy=P.y,dir=RND()<.5?1:-1;for(let i=0;i<n;i++){const a0=i*TAU/n,ring=b=>{const q=clamp((b-(t+tel))/dur,0,1),a=a0+dir*q*2.4,r=lerp(120,14,q*q);return [cx+Math.cos(a)*r,cy+Math.sin(a)*r*.85]};NP({k:'orb',sty:'light',r:5,col:'#ffcf5a',t0:t,t1:t+tel,t2:t+tel+dur,pos:b=>{if(b>=t+tel)return ring(b);const u=clamp((b-t)/tel,0,1),[x,y]=ring(t+tel);return [lerp(g.x,x,u),lerp(g.coreY,y,u)]},dmg:10,deco:(o,b,now)=>{if(b<o.t1){const [x,y]=o.pos(b);npSpr('light',x,y,4,now,o,b)}}})}});
 return tel+dur+.2});
defPat('ashBloom','잿불 꽃','head',10,'등불에서 던진 잿불이 다섯 잎 꽃으로 핌 → 꽃잎 사이 틈으로',t=>{const tel=Math.max(1.4,npTel()),n=2+G.phase;
 for(let k=0;k<n;k++){const ts=t+k*1.2;sch(ts,()=>{const g=bgeo(),[cx,cy]=npIn(P.x+(RND()-.5)*40,P.y+(RND()-.5)*30,40),a0=RND()*TAU;G.arcs.push({x0:g.x,y0:g.coreY,x1:cx,y1:cy,t0:ts,t1:ts+.8,h:50,kind:'fire'});NP({k:'circ',x:cx,y:cy,r:14,t0:ts,t1:ts+tel,t2:ts+tel+.6,col:'#ff9a6a',dmg:11});for(let i=0;i<5;i++){const a=a0+i*TAU/5;for(let j=1;j<=3;j++)NP({k:'circ',x:cx+Math.cos(a)*j*20,y:cy+Math.sin(a)*j*20,r:11,t0:ts,t1:ts+tel+j*.12,t2:ts+tel+j*.12+.45,col:'#ff9a6a',dmg:11})}})}
 return n*1.2+tel+1});
/* 19 태초의 굶주림 */
const HUNGER_POOL=[['rootBurst',10],['vineWhip',10],['sporeCloud',11],['sporeWaltz',11],['tongueLash',12],['bubbleTongue',12],['boneHowl',13],['boneBoomerang',13],['webCage',14],['webPluck',14],['stingSwarm',15],['waggleDance',15],['shardStorm',16],['facetBeam',16],['tideCrush',17],['bubbleStream',17],['emberWail',18],['lanternDance',18]];
defPat('hungerMedley','굶주림의 합창','all',11,'삼킨 짐승들의 공격이 한꺼번에 쏟아짐 → 먼저 뜬 예고부터 차례로 피해',t=>{const k=2+(G.phase>=2?1:0),pool=HUNGER_POOL.filter(([n])=>MV[n]),picks=[],used=new Set();
 while(picks.length<k&&used.size<pool.length){const p=pool[Math.floor(RND()*pool.length)];if(used.has(p[0])||picks.some(q=>q[1]===p[1])){used.add(p[0]);continue}used.add(p[0]);if(!(CHAN[p[0]]==='hands'&&picks.some(q=>CHAN[q[0]]==='hands')))picks.push(p)}
 let len=0;picks.forEach(([n],i)=>{const st=t+i*1.3,l=MV[n](st);len=Math.max(len,i*1.3+(Number.isFinite(l)?l:8))});sch(t,()=>{G.boss.warn=.6;sfx(90,.6,'sawtooth',.06,45)});return len});
defPat('worldBite','세계 삼킴','all',10,'위아래에서 거대한 턱이 닫힘 → 가운데 좁은 틈에 맞춰',t=>{const tel=npTel(),n=2+Math.min(1,G.phase);
 for(let k=0;k<n;k++){const ts=t+k*2;sch(ts,()=>{const gy=clamp(P.y+(RND()-.5)*80,AY+50,AY+AH-50),gap=46,dur=.6;NP({k:'rect',t0:ts,t1:ts+tel,t2:ts+tel+dur,col:'#3a1020',dmg:14,rf:b=>{const q=b<ts+tel?1:clamp((b-(ts+tel))/.25,0,1);return [AX,AY,AW,(gy-gap/2-AY)*q]}});NP({k:'rect',t0:ts,t1:ts+tel,t2:ts+tel+dur,col:'#3a1020',dmg:14,rf:b=>{const q=b<ts+tel?1:clamp((b-(ts+tel))/.25,0,1),h=(AY+AH-(gy+gap/2))*q;return [AX,AY+AH-h,AW,h]}});sch(ts+tel+.25,()=>{sfx(60,.4,'square',.1,30);G.shake=Math.max(G.shake,.45)})})}
 return (n-1)*2+tel+.8});

