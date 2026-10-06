/* ================= v53 챕터 7 공격 다시 만들기: 보스가 "자기 물건"을 꺼내서 공격 =================
   (파일 번호 9991: 999 다음에 실행되도록 네 자리 번호를 씀)
   - 거울문 수문장: 거울을 꺼내 세우고, 광선이 거울에 맞아 꺾여서 나를 노림 · 열쇠가 날아와 찌름 · 문짝이 양옆에서 닫힘 · 시계판의 바늘
   - 흑백 체스 왕: 체스 말을 꺼냄 — 룩은 줄을 따라 돌진, 비숍은 대각선으로 미끄러짐, 나이트는 L자로 뛰어 찍음,
     퀸은 사방팔방(8방향)으로 구슬을 쏘며 칸을 옮김, 폰은 한 칸씩 내려오다 바닥에서 퀸이 됨
   - 유리 공작: 꼬리 깃털 눈이 하나씩 떠서 쏨 · 바닥에 눈이 떠서 터짐
   - 역류의 분수: 물기둥이 바닥에서 솟아오름(물 그림)
   - 거꾸로 타는 초: 양옆에 초를 세우고 그 불꽃이 쓸어 감 · 초들이 둥글게 둘러싸고 좁혀 옴
   - 오르골 발레리나: 작은 무희 인형이 날아와 착지 · 무대 거울에 빛이 반사 · 거울 속 무희와 2인무
   - 뒤집힌 회전목마: 거꾸로 된 깃발이 위에서 내리꽂힘
   - 그림자 인형사: 조종 막대가 위에 나타나 실을 내림 · 가면이 날아가 웃으며 쏨 · 내 그림자 인형
   - 반사룡: 거울 비늘판이 떨어져 꽂힘 · 용이 화면을 가로질러 급강하
   - 거울 하루: 거울 속 내가 실제로 나타나 반대로 따라옴
   이름·덱은 그대로 두고 같은 이름으로 다시 정의한다. 외침(997)도 다시 붙인다. 판정은 늘 예고가 먼저. */
(function(){try{
 const L7=window.S7ART,H=window.S7H,A=window.ACT;if(!L7||!H||!A)return;
 const {tel,spd,ph,P7,toP,shot,circ,seg,rect,snd,shake,gapRing,echo,CX,CY}=H;
 const D=(n,kr,ch,est,tip,fn)=>defPat(n,kr,ch,est,tip,fn);
 const C=(v,a,b)=>v<a?a:v>b?b:v;
 /* 예고 전용 선 (맞지 않음): 지나갈 길을 미리 보여 줌 */
 const path=(T0,T1,ax,ay,bx,by,col)=>NP({k:'seg',sty:'laser',harm:false,noCharge:true,col:col||'#ff4d6d',w:3,t0:T0,t1:T1,t2:T1+.01,a:()=>[ax,ay],b:()=>[bx,by],dmg:0});
 const lane=(T0,T1,x,y,w,h)=>NP({k:'rect',harm:false,x,y,w,h,t0:T0,t1:T1,t2:T1+.01,dmg:0});

 /* ---------- 도트 그림 ---------- */
 const KK='#0a0c18';
 const MIRROR=A.pix(["..KKKKK..",".KSSSSSK.","KSCCWCCSK","KSCWCCCSK","KSCCCCCSK","KSCCCCCSK","KSCCCCWSK","KSCCCWCSK","KSCCCCCSK",".KSSSSSK.","..KKKKK..","...KSK...","..KSSSK..",".KKKKKKK."],{K:KK,S:'#c4d0e4',C:'#5af0e0',W:'#ffffff'});
 const MIRRORV=A.pix(["..KKKKK..",".KSSSSSK.","KSCCWCCSK","KSCWCCCSK","KSCCCCCSK","KSCCCCCSK","KSCCCCWSK","KSCCCWCSK","KSCCCCCSK",".KSSSSSK.","..KKKKK.."],{K:KK,S:'#e0ccff',C:'#b48aff',W:'#ffffff'});
 const KEY=A.pix([".KKK..........","KGGGK.........","KG.GKKKKKKKKKK","KG.GGGGGGGGGGK","KGGGKKKKKGKGKK",".KKK.....GKGK.",".........KK.K."],{K:KK,G:'#ffd27a'});
 const LOCK=A.pix(["..KKKKK..",".KSKKKSK.",".KS...SK.","KKKKKKKKK","KGGGGGGGK","KGGGKGGGK","KGGKKKGGK","KGGGKGGGK","KGGGGGGGK","KKKKKKKKK"],{K:KK,S:'#c4d0e4',G:'#ffd27a'});
 const PW={K:KK,W:'#f2f6ff',D:'#8492b0'},PB={K:'#c4d0e4',W:'#1a1a24',D:'#5a5a72'};
 const RAW={pawn:["...KKK...","..KWWWK..","..KWWWK..","...KKK...","..KWWWK..","...KWK...","...KWK...","..KWWWK..",".KWWWWWK.",".KKKKKKK.","KWWWWWWWK","KKKKKKKKK"],
  rook:["KK.KKK.KK","KWKWWWKWK","KWWWWWWWK",".KWWWWWK.","..KWWWK..","..KWDWK..","..KWWWK..","..KWDWK..","..KWWWK..",".KWWWWWK.",".KKKKKKK.","KWWWWWWWK","KKKKKKKKK"],
  knight:["...KK.....","..KWWKK...",".KWWWWWK..","KWDWWWWWK.","KWWWWWWWWK",".KKKWWWWWK","...KWWWWK.","..KWWWWK..","..KWWWWK..",".KWWWWWWK.",".KKKKKKKK.","KWWWWWWWWK","KKKKKKKKKK"],
  bishop:["....K....","...KWK...","..KWWDK..","..KWDWK..","..KWWWK..","...KWK...","..KKKKK..","...KWK...","...KWK...","..KWWWK..",".KWWWWWK.",".KKKKKKK.","KWWWWWWWK","KKKKKKKKK"],
  queen:[".K..K.K..K.","KWK.KWK.KWK","KWWKWWWKWWK",".KWWWWWWWK.","..KWWWWWK..","..KKKKKKK..","...KWWWK...","...KWWWK...","...KWWWK...","..KWWWWWK..",".KWWWWWWWK.",".KKKKKKKKK.","KWWWWWWWWWK","KKKKKKKKKKK"]};
 const PIECE={};for(const k in RAW){PIECE[k]=A.pix(RAW[k],PW);PIECE[k+'B']=A.pix(RAW[k],PB)}
 const CANDLE=A.pix(["..KKK..",".KWWWK.",".KWEWK.",".KWWWK.",".KWWEK.",".KWWWK.",".KWWWK.","..KKK..","...K...","..KFK..",".KFFFK.",".KFYFK.","..KFK..","...K..."],{K:KK,W:'#e8fff8',E:'#b8d8d0',F:'#5af0e0',Y:'#ffffff'});
 const DANCER=A.pix(["....K....","...KHK...","...KHK...","....K....","..KKPKK..",".KHKPKHK.","...KPK...",".KKPPPKK.","KPPWPWPPK",".KKKPKKK.","...KHK...","...KHK...","...KHK...","....K...."],{K:KK,H:'#ffe0d0',P:'#ffb0d8',W:'#ffffff'});
 const DANCERV=A.pix(["....K....","...KHK...","...KHK...","....K....","..KKPKK..",".KHKPKHK.","...KPK...",".KKPPPKK.","KPPWPWPPK",".KKKPKKK.","...KHK...","...KHK...","...KHK...","....K...."],{K:KK,H:'#e0d0ff',P:'#b48aff',W:'#ffffff'});
 const FLAG=A.pix(["...KGK...","...KGK...","...KGK...","...KGK...","...KGK...","KKKKGK...","KRRRGK...","KRWRGK...",".KRRGK...","..KRGK...","...KGK...","...KGK...","...KGK...","....K....","....K...."],{K:KK,G:'#ffd27a',R:'#ff7ad0',W:'#ffffff'});
 const BAR=A.pix(["......KK......","......KWK.....","KKKKKKKWKKKKKK","KWWWWWWWWWWWWK","KKKKKKKWKKKKKK","......KWK.....","......KK......"],{K:KK,W:'#8a6a4a'});
 const MASK=A.pix(["..KKKKK..",".KWWWWWK.","KWKWWWKWK","KWWWWWWWK","KWRWWWRWK",".KWRRRWK.","..KKKKK.."],{K:KK,W:'#f2eef8',R:'#ff7ad0'});
 const DOLL=A.pix(["...KKK...","..KWWWK..","..KWKWK..","...KKK...",".KKPPPKK.","KWKPPPKWK","...KPK...","..KP.PK..","..KW.WK.."],{K:KK,W:'#e8e0f0',P:'#3e3058'});
 const DRAGON=A.pix(["K..................K","KK................KK",".KCK....KKKK....KCK.","..KCCK.KCCCCK.KCCK..","...KCCKCCWCCCKCCK...","....KCCCCCCCCCCK....",".....KKKCCCCKKK.....","........KCCK........","........KWWK........",".........KK........."],{K:KK,C:'#8af0ff',W:'#ffffff'});
 const PLATE=A.pix(["KKKKKKKKKKKK","KSWCCCCCCCSK","KSCWCCCCCCSK","KSCCCCCCCWSK","KKKKKKKKKKKK"],{K:KK,S:'#c4d0e4',C:'#8af0ff',W:'#ffffff'});
 /* 거울 하루: 하루를 좌우로 뒤집고 보라로 물들인 모습 */
 const HC=document.createElement('canvas');HC.width=28;HC.height=28;
 const MHARU=(x,y,s,o)=>{const g=HC.getContext('2d');g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='source-over';g.globalAlpha=1;g.clearRect(0,0,28,28);g.imageSmoothingEnabled=false;try{drawKnight(g,8,6,1,true,null,performance.now()/430)}catch(e){}
  g.globalCompositeOperation='source-atop';g.globalAlpha=.55;g.fillStyle='#b48aff';g.fillRect(0,0,28,28);g.globalCompositeOperation='source-over';g.globalAlpha=1;
  ctx.save();ctx.imageSmoothingEnabled=false;if(o&&o.a!=null)ctx.globalAlpha=o.a;ctx.drawImage(HC,x-14*s,y-16*s,28*s,28*s);ctx.restore();ctx.globalAlpha=1};MHARU.h=24;
 window.S7PIX={MIRROR,KEY,LOCK,PIECE,CANDLE,DANCER,FLAG,BAR,MASK,DOLL,DRAGON,PLATE,MHARU};

 /* ---------- 공용: 거울에 반사되는 광선 ---------- */
 /* 보스 (gx,gy) → 거울 (mx,my) → 반사 방향 a2. 거울은 두 길의 가운데를 향해 기울어 선다 */
 function mirrorShot(T,gx,gy,mx,my,a2,col,spr,dmg){const a1=Math.atan2(my-gy,mx-gx),nx=Math.cos(a2)-Math.cos(a1),ny=Math.sin(a2)-Math.sin(a1),rot=Math.atan2(ny,nx),hitT=T+tel();
  A.put({spr:spr||MIRROR,s:2.2,t0:T,t2:hitT+.9,pos:A.at(mx,my),rot:()=>rot,glow:col,deco:(Q,b,now,x,y)=>{if(b>=hitT&&b<hitT+.35){const q=(b-hitT)/.35;pcirc(x,y,10+q*8,'#ffffff',.5*(1-q));cRing(x,y,8+q*16,col,(1-q),1)}}});
  NP({k:'seg',sty:'laser',col,w:7,t0:T,t1:hitT,t2:hitT+.45,a:()=>[gx,gy],b:()=>[mx,my],dmg:dmg||12});
  NP({k:'seg',sty:'laser',col:'#ffffff',w:8,t0:T,t1:hitT+.12,t2:hitT+.6,a:()=>[mx,my],b:()=>[mx+Math.cos(a2)*560,my+Math.sin(a2)*560],dmg:dmg||12,noCharge:true});
  snd(hitT,880,.2,'triangle',.05,1320);snd(hitT+.12,1320,.25,'triangle',.05,1760)}
 const spotAway=(far)=>{for(let i=0;i<12;i++){const x=AX+30+RND()*(AW-60),y=AY+40+RND()*(AH-70);if(Math.hypot(x-P.x,y-P.y)>(far||80))return [x,y]}return [AX+40,AY+60]};

 /* ================= 1 거울문 수문장 ================= */
 D('s7GateKey','열쇠 찌르기','hands',11,'지팡이의 열쇠가 떠올라 나를 겨누고 날아와 찌름, 한 박자 뒤 반대편에서 메아리 열쇠 → 열쇠가 겨눈 줄에서 비켜',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.8;echo(T0,'#ffd27a',(T,mx,ma,col,m)=>{const [x0,y0]=P7(20,-49),sx=mx(x0),a=toP(sx,y0),T1=T+tel(),L=600,v=L/.45;
    const pos=b=>{if(b<T1){const q=C((b-T)/.3,0,1);return [sx+Math.cos(a)*-6*q,y0-10*q+Math.sin(b*8)*1]}const d=(b-T1)*v;return [sx+Math.cos(a)*d,y0-10+Math.sin(a)*d]};
    A.put({spr:KEY,s:1.5,t0:T,t2:T1+.5,pos,rot:()=>a,tint:m?'#c89aff':null,deco:(Q,b,now,x,y)=>{if(b>=T1)for(let i=1;i<6;i++)cPx(x-Math.cos(a)*i*5,y-Math.sin(a)*i*5,3-i*.4,col,.6-i*.1)}});
    path(T,T1,sx,y0-10,sx+Math.cos(a)*L,y0-10+Math.sin(a)*L,col);A.hit({pos,r:7,t0:T,t1:T1,t2:T1+.45,dmg:13});snd(T1,520,.2,'square',.05,260)});shake(T0+tel(),.2)}
  return n*1.8+1+tel()+.6});
 D('s7GateMirror','거울 면 반사','head',12,'수문장이 거울을 꺼내 세우고 거울 면 광선을 쏨 → 광선이 거울에 맞아 꺾여 나를 노림. 꺾인 선(흰 선)을 피해',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.7;echo(T0,'#5af0e0',(T,mx,ma,col,m)=>{const [gx,gy]=P7(0,-26),[px,py]=spotAway(90),sx=mx(px),a2=Math.atan2(P.y-py,P.x-sx);mirrorShot(T,mx(gx),gy,sx,py,a2,col,m?MIRRORV:MIRROR,12)},1.1)}
  return n*1.7+1.1+tel()+.8});
 D('s7GateClose','닫히는 문','field',12,'양옆에서 커다란 문짝이 쾅 닫혀 오며 가운데만 열림 → 열린 틈으로, 메아리 문은 틈 위치가 바뀜',t=>{const n=1+ph();
  for(let k=0;k<n;k++){const T0=t+k*2.6,gx=AX+70+RND()*(AW-140);echo(T0,'#8492b0',(T,mx,ma,col)=>{const g=mx(gx),T1=T+tel(),cl=.4,E=b=>{const q=C((b-T1)/cl,0,1);return 1-Math.pow(1-q,3)};
    const door=(side)=>NP({k:'rect',sty:'light',col,t0:T,t1:T1,t2:T1+cl+.35,dmg:13,rf:b=>{const e=b<T1?1:E(b);if(side<0){const w=(g-26-AX)*e;return [AX,AY,Math.max(1,w),AH]}const w=(AX+AW-g-26)*e;return [AX+AW-w,AY,Math.max(1,w),AH]},
     deco:(o,b)=>{if(b<T1)return;const [x,y,w,h]=o.rf(b),ex=side<0?x+w:x;RA(ex-(side<0?6:0),y,6,h,'#ffd27a',.9);RA(ex-(side<0?3:3),y,1,h,'#ffffff',.9);pcirc(ex-side*12,y+h/2,3,'#0a0c18',.9)}});
    door(-1);door(1);sch(T1+cl,()=>{G.shake=Math.max(G.shake||0,.35)});snd(T1+cl,110,.3,'square',.07,60)},1.2)}
  return n*2.6+1.2+tel()+.8});
 D('s7GateClock','13시의 종','head',12,'수문장 머리 위에 13시 시계판이 나타나 열세 바늘이 거꾸로 돎, 끝에 종이 울려 퍼짐 → 바늘 사이를 따라 반대로 돌아',t=>{const dur=3+ph()*.6,T1=t+tel();
  sch(t,()=>{const [x,y]=P7(0,-51);A.put({spr:(xx,yy,s)=>{pcirc(xx,yy,11*s/1.5,'#0a0c18');pcirc(xx,yy,10*s/1.5,'#f2f6ff');for(let i=0;i<13;i++){const a=i*TAU/13;cPx(xx+Math.cos(a)*8*s/1.5,yy+Math.sin(a)*8*s/1.5,i===12?2:1,i===12?'#ff7ad0':'#46526e',1)}pcirc(xx,yy,2,'#ffd27a')},s:1.5,t0:t,t2:T1+dur+.6,pos:A.at(x,y),glow:'#ffd27a'});
   for(let i=0;i<13;i++){const a0=i*TAU/13;NP({k:'seg',sty:'laser',col:i===12?'#ff7ad0':'#c4d0e4',w:4,live:true,t0:t,t1:T1,t2:T1+dur,a:()=>[x,y],b:b=>{const a=a0-Math.max(0,b-T1)*.55*spd();return [x+Math.cos(a)*420,y+Math.sin(a)*420]},dmg:11})}
   sch(T1+dur,()=>{gapRing(T1+dur,x,y,13,RND()*TAU,.4,60,{sty:'light',col:'#ffd27a',r:4,noTel:true});G.shake=Math.max(G.shake||0,.3)})});snd(T1,392,.8,'triangle',.05,392);snd(T1+dur,196,1,'triangle',.07,98);
  return tel()+dur+2});
 D('s7hGateLock','자물쇠 감옥','field',13,'[어려움] 내 둘레에 문짝 네 개가 닫혀 오고 자물쇠가 철컥 잠김, 한쪽만 열림 → 열린 쪽으로 빠져나가',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.5;sch(T0,()=>{const cx=C(P.x,AX+50,AX+AW-50),cy=C(P.y,AY+50,AY+AH-50),g=34,op=Math.floor(RND()*4),col=k%2?'#c89aff':'#ffd27a',T1=T0+tel();
    if(op!==0)rect(T0,AX,AY,cx-g-AX,AH,col,'light',.35,13);if(op!==1)rect(T0,cx+g,AY,AX+AW-cx-g,AH,col,'light',.35,13);
    if(op!==2)rect(T0,cx-g,AY,g*2,cy-g-AY,col,'light',.35,13);if(op!==3)rect(T0,cx-g,cy+g,g*2,AY+AH-cy-g,col,'light',.35,13);
    rect(T0,cx-g+6,cy-g+6,g*2-12,g*2-12,col,'light',.3,13,{t0:T0+tel()*.35});
    A.put({spr:LOCK,s:1.6,t0:T0,t2:T1+.5,pos:b=>[cx,cy-(b<T1?Math.max(0,(T1-b))*6:0)],deco:(Q,b,now,x,y)=>{if(b>=T1&&b<T1+.2)cStar(x,y,8,'#ffffff',.9)}});
    const ar=[[-1,0],[1,0],[0,-1],[0,1]][op];for(let i=0;i<3;i++)cChevronLater(T0,T1,cx+ar[0]*(g-8+i*6),cy+ar[1]*(g-8+i*6),Math.atan2(ar[1],ar[0]))});
   shake(T0+tel(),.3);snd(T0+tel(),220,.3,'square',.05,110)}
  return n*1.5+tel()+.6});
 /* 초록 화살표(나갈 쪽 안내): 예고 동안만 */
 function cChevronLater(T0,T1,x,y,a){NP({k:'orb',harm:false,noTel:true,hide:true,r:1,t0:T0,t1:T0,t2:T1,pos:()=>[x,y],deco:()=>cChevron(x,y,a,'#a6f5c6',1,4)})}

 /* ================= 2 유리 공작 ================= */
 const fanEye=(i,n)=>{const a=Math.PI+(.12+i*(.76/(n-1)))*Math.PI,L=29;return P7(Math.cos(a)*L,-14+Math.sin(a)*L*.95)};
 const EYE=(x,y,s,o)=>{const op=o&&o.open!=null?o.open:1;pcirc(x,y,5*s/1.5,'#0a0c18');pcirc(x,y,4.2*s/1.5,'#7af0d0');RA(Math.round(x-4*s/1.5),Math.round(y-(1-op)*4),Math.round(8*s/1.5),Math.round((1-op)*4)+1,'#14283a',1);if(op>.4){pcirc(x,y,2.2*s/1.5,'#1a3a8a');pcirc(x,y,1.1,'#ffd27a')}};EYE.h=10;
 D('s7PeaFan','부채 눈빛','head',11,'꼬리 깃털의 눈이 하나씩 번쩍 떠서 나를 향해 유리 깃털을 쏨, 메아리는 반대쪽 눈부터 → 계속 옆으로 움직여',t=>{const n=7+ph()*2;
  for(let i=0;i<n;i++){const T0=t+i*.32;echo(T0,'#7af0d0',(T,mx,ma,col)=>{const [x,y]=fanEye(i%13,13),sx=mx(x),T1=T+tel();A.put({spr:EYE,s:1.5,t0:T-.3,t2:T1+.4,pos:A.at(sx,y),glow:col,pulse:true});shot(T,sx,y,toP(sx,y),82,{sty:'light',col,r:4})})}
  return n*.32+1+tel()+1.2});
 D('s7PeaGaze','백 개의 눈','field',11,'바닥에 거울 눈이 천천히 뜨고, 다 뜨면 빛이 터짐 → 눈이 다 뜨기 전에 벗어나, 메아리는 반대편에',t=>{const n=4+ph();
  for(let k=0;k<n;k++){const T0=t+k*.9,px=P.x,py=P.y;echo(T0,'#7af0d0',(T,mx,ma,col)=>{const x=mx(px),T1=T+tel();A.put({spr:(xx,yy,s)=>EYE(xx,yy,s*1.6),s:1.5,t0:T,t2:T1+.4,pos:A.at(x,py),deco:(Q,b,now,xx,yy)=>{const op=C((b-T)/(T1-T),0,1);RA(xx-12,yy-1,24,2,'#14283a',1-op)}});circ(T,x,py,18,col)},.6)}
  return n*.9+.6+tel()+.6});

 /* ================= 3 역류의 분수: 물기둥 ================= */
 function geyser(T,x,w,col,hold){const T1=T+tel();NP({k:'rect',sty:'ice',col,hide:true,x,y:AY,w,h:AH,t0:T,t1:T1,t2:T1+(hold||.3),dmg:11,
   deco:(o,b,now)=>{const t=now/1000;if(b<T1){for(let i=0;i<3;i++){const q=((b-T)*1.6+i/3)%1;cRing(x+w/2,AY+AH-4,4+q*w*.5,'#e8fbff',(1-q)*.7,1)}return}
    const q=C((b-T1)/.12,0,1),hh=AH*q,y0=AY+AH-hh;RA(x,y0,w,hh,col,.55);RA(x+2,y0,Math.max(1,w*.25),hh,'#ffffff',.35);for(let j=0;j<hh;j+=8)RA(x+((j*7+Math.floor(t*30))%Math.max(1,w-2)),y0+j,2,4,'#ffffff',.5);
    for(let i=0;i<5;i++)pcirc(x+w*(i/4),y0+Math.sin(t*20+i)*2,4,'#e8fbff',.9);pcirc(x+w/2,AY+AH-2,w*.6,'#e8fbff',.3)}});snd(T1,240,.3,'sawtooth',.04,520)}
 D('s7FountUp','역류 기둥','field',11,'바닥에서 물이 거꾸로 솟아 기둥이 됨 → 거품이 안 이는 빈 칸으로, 메아리 기둥은 좌우가 뒤집힘',t=>{const n=3+ph(),cols=8,cw=AW/cols;
  for(let k=0;k<n;k++){const T0=t+k*1.5,gap=Math.floor(RND()*cols),gap2=(gap+3+Math.floor(RND()*3))%cols;echo(T0,'#7ad8ff',(T,mx,ma,col,m)=>{for(let c=0;c<cols;c++){if(c===gap||c===gap2)continue;if((c+k)%2)continue;const x=AX+c*cw+3;geyser(T,m?2*CX-x-(cw-6):x,cw-6,col)}},.75)}
  return n*1.5+.75+tel()+.5});
 D('s7hFountGeyser','간헐천 추격','field',12,'[어려움] 내 발밑부터 간헐천이 차례로 솟아 따라옴, 메아리는 반대쪽에서 → 솟기 전에 방향을 바꿔',t=>{const n=6+ph()*2,cw=36;
  for(let i=0;i<n;i++){const T0=t+i*.5;sch(T0,()=>{const x=C(P.x-cw/2,AX,AX+AW-cw);echo(T0,'#7ad8ff',(T,mx,ma,col,m)=>geyser(T,m?2*CX-x-cw:x,cw,col),.75)})}
  return n*.5+.75+tel()+.5});

 /* ================= 4 흑백 체스 왕: 체스 말 ================= */
 const pc=(k,dark)=>PIECE[k+(dark?'B':'')];
 D('s7ChessRook','룩 돌진','field',11,'왕이 룩들을 판 끝에 세우고, 룩이 제 줄을 따라 끝까지 돌진 → 룩이 없는 줄로, 메아리 룩은 반대편에서',t=>{const n=2+ph(),rows=5,rh=AH/rows;
  for(let k=0;k<n;k++){const T0=t+k*1.9,free=Math.floor(RND()*rows),free2=(free+2+Math.floor(RND()*2))%rows;echo(T0,'#f2f6ff',(T,mx,ma,col,m)=>{const T1=T+tel(),go=.7,fromL=(k%2===0)!==m;
    for(let r=0;r<rows;r++){if(r===free||(k%2&&r===free2))continue;const y=AY+rh*(r+.5),x0=fromL?AX+10:AX+AW-10,x1=fromL?AX+AW+20:AX-20,dark=(r+k)%2===1;
     const pos=b=>b<T1?[x0,y]:[x0+(x1-x0)*C((b-T1)/go,0,1),y];A.put({spr:pc('rook',dark),s:2,t0:T,t2:T1+go,pos,ground:true,deco:(Q,b,now,x,yy)=>{if(b>=T1)for(let i=1;i<5;i++)RA(x-(fromL?i*7:-i*7)-2,yy-6,4,12,dark?'#5a5a72':'#f2f6ff',.35-i*.07)}});
     lane(T,T1,AX,y-rh/2+3,AW,rh-6);A.hit({pos,r:11,t0:T,t1:T1,t2:T1+go,dmg:12})}
    snd(T1,160,.3,'square',.06,80)},.9);shake(t+k*1.9+tel(),.25)}
  return n*1.9+.9+tel()+.8});
 D('s7ChessBishop','비숍 대각선','field',11,'비숍 둘이 판 가장자리에 나타나 나를 지나는 대각선을 따라 미끄러짐 → 대각선 밖으로, 메아리는 반대로 기운 대각선',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.4,px=P.x,py=P.y;echo(T0,'#e8ecf4',(T,mx,ma,col,m)=>{const T1=T+tel(),go=.8,x=mx(px);for(const s of [-1,1]){const dx=s,dy=m?-1:1,
     /* 대각선이 경기장 가장자리에 닿는 두 점 */k1=Math.min((dx>0?x-AX:AX+AW-x),(dy>0?py-AY:AY+AH-py)),k2=Math.min((dx>0?AX+AW-x:x-AX),(dy>0?AY+AH-py:py-AY)),sx=x-dx*k1,sy=py-dy*k1,ex=x+dx*k2,ey=py+dy*k2;
     const pos=A.lin(sx,sy,ex,ey,T1,T1+go);A.put({spr:pc('bishop',s>0),s:2,t0:T,t2:T1+go+.1,pos,ground:true,deco:(Q,b,now,xx,yy)=>{if(b>=T1)for(let i=1;i<6;i++)cPx(xx-dx*i*6,yy-dy*i*6,3,s>0?'#5a5a72':'#f2f6ff',.5-i*.08)}});
     path(T,T1,sx,sy,ex,ey,col);A.hit({pos,r:10,t0:T,t1:T1,t2:T1+go,dmg:12})}},.7)}
  return n*1.4+.7+tel()+1});
 D('s7ChessKnight','나이트 점프','all',11,'나이트가 L자로 껑충 뛰어 내 자리를 찍음 → 다음 L자 칸을 예상해 피해',t=>{const n=4+ph(),L=[[2,1],[1,2],[-1,2],[-2,1],[-2,-1],[-1,-2],[1,-2],[2,-1]],u=24,hop=.7;
  sch(t,()=>{let [x,y]=P7(-24,-6);const pts=[[x,y]],times=[t];for(let k=0;k<n;k++){const [dx,dy]=L[Math.floor(RND()*8)];const tx=C(k?x+dx*u:P.x,AX+20,AX+AW-20),ty=C(k?y+dy*u:P.y,AY+20,AY+AH-20);x=tx;y=ty;pts.push([x,y]);times.push(t+tel()+k*hop)}
   const pos=b=>{let i=0;while(i<times.length-1&&b>times[i+1])i++;if(i>=times.length-1)return pts[pts.length-1];const b0=i===0?t+tel()*.3:times[i],b1=times[i+1],q=C((b-b0)/Math.max(.01,b1-b0),0,1);return [pts[i][0]+(pts[i+1][0]-pts[i][0])*q,pts[i][1]+(pts[i+1][1]-pts[i][1])*q-Math.sin(q*Math.PI)*34]};
   A.put({spr:pc('knight',false),s:2.2,t0:t,t2:times[times.length-1]+.5,pos,ground:true,face:b=>{const [a]=pos(b),[c]=pos(b+.05);return c<a?-1:1}});
   for(let k=1;k<pts.length;k++){const T1=times[k];circ(T1-tel(),pts[k][0],pts[k][1],18,k%2?'#16161e':'#e8ecf4',{label:'♞',t2:T1+.25});sch(T1,()=>{G.shake=Math.max(G.shake||0,.18)});snd(T1,140,.15,'square',.05,70)}});
  return n*hop+tel()+.8});
 D('s7hChessQueen','퀸의 행진','all',13,'[어려움] 퀸이 판 위에 나타나 사방팔방(8방향)으로 구슬을 쏘고, 퀸답게 곧게 다음 칸으로 옮겨 또 쏨 → 구슬 사이 틈으로, 퀸과 같은 줄에 서지 마',t=>{const waves=3+ph(),gap=1.1;
  sch(t,()=>{let [qx,qy]=spotAway(100);const pts=[[qx,qy]];for(let i=1;i<waves;i++){const dirs=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]],d=dirs[Math.floor(RND()*8)],st=40+RND()*50;qx=C(qx+d[0]*st,AX+30,AX+AW-30);qy=C(qy+d[1]*st,AY+30,AY+AH-30);pts.push([qx,qy])}
   const T1=t+tel(),pos=b=>{const i=C(Math.floor((b-T1)/gap),0,waves-1),f=C(((b-T1)-i*gap-.6)/.4,0,1),j=Math.min(waves-1,i+1);if(b<T1+.6)return pts[0];return i>=waves-1?pts[waves-1]:[pts[i][0]+(pts[j][0]-pts[i][0])*f,pts[i][1]+(pts[j][1]-pts[i][1])*f]};
   A.put({spr:pc('queen',false),s:2.2,t0:t,t2:T1+waves*gap+.4,pos,ground:true,glow:'#ffd27a',pulse:true});A.hit({pos,r:9,t0:t,t1:T1,t2:T1+waves*gap,dmg:12});
   for(let i=0;i<waves;i++){const Tw=T1+i*gap,off=i%2?Math.PI/8:0,[x,y]=pts[i];for(let j=0;j<8;j++){const a=off+j*Math.PI/4;for(const v of [60,84])npShot(Tw-.5,Tw,x,y,a,v*spd(),{sty:j%2?'void':'light',col:j%2?'#8492b0':'#f2f6ff',r:5,rayL:20,noTel:j>0||v>60,noSkin:true,dmg:11})}snd(Tw,660,.15,'triangle',.05,990)}});
  return tel()+waves*gap+3});
 D('s7xChessPromotion','폰의 승격','field',13,'[익스트림] 폰들이 위에서 한 칸씩 내려오다 바닥에 닿으면 퀸이 되어 사방으로 쏨 → 폰 사이로, 퀸이 되기 전에 떨어져',t=>{const cols=8,cw=AW/cols,n=4+ph(),drop=3;
  const used=new Set();for(let i=0;i<n;i++){let c=Math.floor(RND()*cols);while(used.has(c))c=(c+1)%cols;used.add(c);const x=AX+cw*(c+.5),T0=t+i*.35,T1=T0+tel(),Tq=T1+drop,dark=i%2===1;
   const pos=b=>[x,AY+14+Math.floor(C((b-T1)/drop,0,1)*5)/5*(AH-34)];A.put({spr:pc('pawn',dark),s:2,t0:T0,t2:Tq,pos,ground:true});A.hit({pos,r:9,t0:T0,t1:T1,t2:Tq,dmg:12});
   lane(T0,T1,x-cw/2+3,AY,cw-6,AH);A.put({spr:pc('queen',dark),s:1.7,t0:Tq,t2:Tq+1,pos:A.at(x,AY+AH-20),glow:'#ffd27a'});
   sch(Tq-.6,()=>{for(let j=0;j<8;j++)npShot(Tq-.6,Tq,x,AY+AH-20,j*Math.PI/4+Math.PI/8,70*spd(),{sty:dark?'void':'light',col:dark?'#8492b0':'#f2f6ff',r:5,rayL:18,noTel:j>0,noSkin:true})});snd(Tq,880,.2,'triangle',.05,1320)}
  return tel()+n*.35+drop+3});

 /* ================= 5 거꾸로 타는 초 ================= */
 D('s7CandleWick','심지 줄','hands',11,'양옆에 초가 하나씩 세워지고, 그 불꽃이 가로로 쓸고 지나감 → 불꽃 줄이 지나간 뒤 그 자리로',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.8,s=k%2?1:-1;sch(T0,()=>{const x=s<0?AX+12:AX+AW-12,y=AY+30+RND()*(AH-60),T1=T0+tel();A.put({spr:CANDLE,s:1.7,t0:T0,t2:T1+1.4,pos:A.at(x,y),ground:true,glow:'#5af0e0'});
    NP({k:'seg',sty:'laser',col:'#5af0e0',w:7,live:true,t0:T0,t1:T1,t2:T1+1.2,a:()=>[x,y+8],b:b=>{const q=C((b-T1)/1.2,0,1),a=(s<0?-Math.PI*.42:Math.PI*1.42)+(s<0?1:-1)*q*Math.PI*.84;return [x+Math.cos(a)*520,y+8+Math.sin(a)*520]},dmg:12})})}
  return n*1.8+tel()+1.4});
 D('s7CandleOut','불꽃 고리','all',12,'내 둘레에 초들이 둥글게 세워지고 서서히 좁혀 옴, 한 곳은 꺼져 있음 → 꺼진 틈으로 빠져나가',t=>{const n=2;
  for(let k=0;k<n;k++){const T0=t+k*2.4;sch(T0,()=>{const cx=P.x,cy=P.y,Tg=T0+tel(),gap=RND()*TAU,m=16;for(let i=0;i<m;i++){const a0=i*TAU/m;if(Math.abs(((a0-gap+Math.PI*3)%TAU)-Math.PI)<.5)continue;
    const pos=b=>{const q=Math.max(0,b-Tg),r=Math.max(12,100-q*50*spd());return [cx+Math.cos(a0)*r,cy+Math.sin(a0)*r*.85]};A.put({spr:CANDLE,s:1.2,t0:T0,t2:Tg+2,pos,ground:true});A.hit({pos,r:5,t0:T0,t1:Tg,t2:Tg+2,dmg:11})}})}
  return n*2.4+tel()+.4});

 /* ================= 6 오르골 발레리나 ================= */
 D('s7BalletLeap','그랑 주테','all',11,'작은 무희 인형이 높이 뛰어올라 내 자리에 착지, 칼날 고리가 퍼짐 → 착지 원 밖으로, 고리 틈으로',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.6;sch(T0,()=>{const [sx,sy]=P7(0,-30),c=circ(T0,P.x,P.y,18,'#ffb0d8',{label:'✦'}),T1=T0+tel(),pos=A.hop(sx,sy,c.x,c.y,T0,T1,70);
    A.put({spr:DANCER,s:1.7,t0:T0,t2:T1+.6,pos,rot:b=>b<T1?(b-T0)*9:0});sch(T1,()=>gapRing(T1,c.x,c.y,14,RND()*TAU,.5,64,{sty:'crystal',col:'#ff7ab8',r:4,noTel:true}))});shake(T0+tel(),.25)}
  return n*1.6+tel()+1.4});
 D('s7BalletMirror','거울 무대','head',12,'무대 벽에 거울이 내려오고, 무희의 빛이 거울에 반사되어 나를 노림 → 꺾인 흰 선을 봐',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.6;sch(T0,()=>{const [gx,gy]=P7(0,-28),side=k%2?1:-1,mx=side<0?AX+16:AX+AW-16,my=AY+40+RND()*(AH-80),a2=Math.atan2(P.y-my,P.x-mx);mirrorShot(T0,gx,gy,mx,my,a2,'#ffb0d8',MIRROR,12)})}
  return n*1.6+tel()+1});
 D('s7hBalletDuet','거울 2인무','all',12,'[어려움] 무희와 거울 속 무희가 마주 보고 돌며 칼날 치마 조각을 나선으로 뿌림 → 두 나선이 엇갈리는 빈 곳으로',t=>{const dur=3+ph()*.5;
  sch(t,()=>{const [x,y]=P7(0,-30),x2=2*CX-x,y2=y+30;A.put({spr:DANCER,s:1.7,t0:t,t2:t+dur+.6,pos:A.at(x+30,y+10),rot:b=>Math.sin(b*6)*.3});A.put({spr:DANCERV,s:1.7,t0:t,t2:t+dur+.6,pos:A.at(x2-30,y2),rot:b=>-Math.sin(b*6)*.3})});
  for(let i=0;i<Math.round(dur*6);i++){const T0=t+i/6;sch(T0,()=>{const [x,y]=P7(0,-30);for(let j=0;j<2;j++){shot(T0,x+30,y+10,T0*2.2+j*Math.PI,64,{sty:'crystal',col:'#ffb0d8',r:4,rayL:14,noTel:i>0});shot(T0,2*CX-x-30,y+30,Math.PI-(T0*2.2+j*Math.PI),64,{sty:'crystal',col:'#c89aff',r:4,rayL:14,noTel:i>0})}})}
  return dur+tel()+1.8});

 /* ================= 7 뒤집힌 회전목마: 거꾸로 깃발 ================= */
 D('s7CarFlag','거꾸로 깃발','head',11,'지붕에서 아래를 향한 깃발이 세로로 내리꽂혀 박힘 → 꽂히는 줄을 피하고, 메아리는 반대편',t=>{const n=5+ph()*2;
  for(let i=0;i<n;i++){const T0=t+i*.45,x=i%3===2?P.x:AX+20+RND()*(AW-40);echo(T0,'#ff7ad0',(T,mx,ma,col)=>{const X=mx(x),T1=T+tel(),pos=b=>[X,b<T1?AY+10:AY+10+C((b-T1)/.2,0,1)*(AH-30)];
    A.put({spr:FLAG,s:1.6,t0:T,t2:T1+.9,pos});rect(T,X-9,AY,18,AH,col,'light',.25,12,{hide:true});sch(T1+.2,()=>{G.shake=Math.max(G.shake||0,.12)})},.9)}
  return n*.45+.9+tel()+.9});

 /* ================= 8 그림자 인형사 ================= */
 D('s7PupString','끊어지는 실','hands',11,'내 위쪽에 조종 막대가 나타나 실 두 가닥을 내리꽂음 → 실과 실 사이로',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.2;echo(T0,'#c4d0e4',(T,mx,ma,col)=>{const [bx]=P7(0,-50),cx=mx(bx)+(P.x-mx(bx))*.5,T1=T+tel();A.put({spr:BAR,s:1.6,t0:T,t2:T1+.5,pos:A.at(cx,AY+8),rot:b=>Math.sin(b*5)*.15});
    for(const s of [-1,1]){const sx=cx+s*16;seg(T,sx,AY+8,sx,AY+AH,col,4,.3,11)}},.7)}
  return n*1.2+.7+tel()+.5});
 D('s7PupMask','가면 웃음','head',11,'가면이 날아 나와 웃으며 부채꼴로 탄을 뿜고, 메아리 가면은 반대로 기운 부채 → 두 부채 사이로',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.1,off=(RND()-.5)*.4;echo(T0,'#f2eef8',(T,mx,ma,col)=>{const [x,y]=P7(0,-39),sx=mx(x)+(mx(x)<CX?-30:30),sy=y+20,T1=T+tel();A.put({spr:MASK,s:1.8,t0:T,t2:T1+.6,pos:A.lin(mx(x),y,sx,sy,T,T+.4,true),rot:b=>Math.sin(b*7)*.2});
    const a0=ma(toP(sx,sy)+off);for(let i=-3;i<=3;i++)shot(T,sx,sy,a0+i*.17,70,{sty:'light',col,r:4})},.8)}
  return n*1.1+.8+tel()+1.6});
 D('s7hPupMarionette','마리오네트 춤','all',12,'[어려움] 내 그림자 인형이 실에 매달려 거울처럼 반대로 따라 하고, 지나간 자리에 실이 내려꽂힘 → 인형과 마주치지 않게 가운데를 피하고, 한 자리에 머물지 마',t=>{const dur=4+ph()*.6;
  sch(t,()=>{const pos=()=>[2*CX-P.x,2*CY-P.y];A.put({spr:DOLL,s:2,t0:t,t2:t+tel()+dur,pos,deco:(Q,b,now,x,y)=>{for(const s of [-1,1])line(x+s*5,y-8,x+s*5,AY,4,(px,py)=>cPx(px,py,1,'#c4d0e4',.5))}});A.hit({pos,r:8,t0:t,t1:t+tel(),t2:t+tel()+dur,dmg:12})});
  for(let i=0;i<Math.round(dur/.7);i++){const T0=t+tel()*.5+i*.7;sch(T0,()=>{const x=P.x;seg(T0,x,AY,x,AY+AH,'#c4d0e4',4,.3,11)})}
  return tel()+dur+.5});

 /* ================= 9 반사룡 ================= */
 D('s7DragonWing','날개 거울판','field',11,'날개에서 거울 비늘판이 떨어져 바닥까지 꽂힘 → 판 사이로, 메아리는 반대편',t=>{const n=6+ph()*2;
  for(let i=0;i<n;i++){const T0=t+i*.4,x=AX+20+((i*71)%(AW-40));echo(T0,'#c8dcf0',(T,mx,ma,col)=>{const X=mx(x),T1=T+tel(),pos=b=>[X,b<T1?AY+8+Math.sin(b*6)*2:AY+8+C((b-T1)/.25,0,1)*(AH-20)];
    A.put({spr:PLATE,s:1.6,t0:T,t2:T1+.8,pos,rot:b=>b<T1?Math.sin(b*4)*.3:Math.PI/2});rect(T,X-12,AY,24,AH,col,'ice',.3,12,{hide:true})},1)}
  return n*.4+1+tel()+.8});
 D('s7DragonDive','급강하','all',12,'반사룡이 화면 밖에서 나를 향해 비스듬히 급강하해 가로지름 → 굵은 길 밖으로',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.6;sch(T0,()=>{const s=RND()<.5?-1:1,y0=AY+20+RND()*40,x0=s<0?AX-10:AX+AW+10,a=Math.atan2(P.y-y0,P.x-x0),T1=T0+tel(),L=640,go=.55,ex=x0+Math.cos(a)*L,ey=y0+Math.sin(a)*L,pos=b=>b<T1?[x0,y0]:A.lin(x0,y0,ex,ey,T1,T1+go)(b);
    path(T0,T1,x0,y0,ex,ey,'#8af0ff');NP({k:'rect',harm:false,noTel:true,hide:true,x:0,y:0,w:1,h:1,t0:T0,t1:T0,t2:T1,deco:(o,b)=>{const q=C((b-T0)/(T1-T0),0,1);for(let i=0;i<20;i++){const u=i/20;cPx(x0+(ex-x0)*u,y0+(ey-y0)*u,6*q,'#ff4d6d',.12)}}});
    A.put({spr:DRAGON,s:2.2,t0:T1-.05,t2:T1+go,pos,rot:()=>a-Math.PI/2,inT:.05,deco:(Q,b,now,x,y)=>{for(let i=1;i<6;i++)pcirc(x-Math.cos(a)*i*10,y-Math.sin(a)*i*10,6-i,'#8af0ff',.25)}});A.hit({pos,r:15,t0:T1,t1:T1,t2:T1+go,dmg:15})});shake(T0+tel(),.4);snd(T0+tel(),120,.4,'sawtooth',.06,60)}
  return n*1.6+tel()+.7});

 /* ================= 10 거울 하루 ================= */
 D('s7HaruMirror','반대편의 나','all',13,'경기장 반대편에 거울 속 내가 실제로 나타나 내 움직임을 거꾸로 따라 하며 보라 불꽃을 쏨 → 거울 하루와 마주 보지 않게 움직여',t=>{const dur=4+ph()*.6;
  sch(t,()=>{const pos=()=>[2*CX-P.x,P.y];A.put({spr:MHARU,s:1.6,t0:t,t2:t+tel()+dur,pos,glow:'#b48aff'});A.hit({pos,r:8,t0:t,t1:t+tel(),t2:t+tel()+dur,dmg:13})});
  for(let i=0;i<Math.round(dur/.6);i++){const T0=t+tel()*.5+i*.6;sch(T0,()=>{const x=2*CX-P.x,y=P.y;shot(T0,x,y,toP(x,y),78,{sty:'fire',col:'#ff7ad0',r:4})})}
  return tel()+dur+.6});

 /* ---------- 외침 다시 붙이기 (997의 외침 표를 그대로 씀) ---------- */
 try{const CAST=window.S7CAST||{};const RE=['s7GateKey','s7GateMirror','s7GateClose','s7GateClock','s7hGateLock','s7PeaFan','s7PeaGaze','s7FountUp','s7hFountGeyser','s7ChessRook','s7ChessBishop','s7ChessKnight','s7hChessQueen','s7xChessPromotion','s7CandleWick','s7CandleOut','s7BalletLeap','s7BalletMirror','s7hBalletDuet','s7CarFlag','s7PupString','s7PupMask','s7hPupMarionette','s7DragonWing','s7DragonDive','s7HaruMirror'];
  for(const n of RE){const f=MV[n],c=CAST[n];if(!f||!c)continue;MV[n]=function(t){try{sch(t,()=>{if(G&&G.s7!=null)G.s7cast={n,t,line:c[0],ax:c[1],ay:c[2],real:performance.now()}})}catch(e){}return f.apply(this,arguments)}}}catch(e){}
}catch(e){console.error('v53 ch7 actors',e)}})();
