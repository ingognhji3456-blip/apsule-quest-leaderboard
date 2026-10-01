/* ================= v46 챕터 6 어려움·익스트림 전용 공격 20종 (보스마다 2개) =================
   - 어려움부터: 보스마다 1개 (익스트림에도 나옴)
   - 익스트림만: 보스마다 1개
   쉬움·보통에는 나오지 않는다. 난이도별 추가 공격 장치(840의 T5_SET)에 등록해서 덱에 섞인다.
   모든 공격은 예고가 먼저 나오고, 반드시 빠져나갈 틈이 있다. */
(function(){try{
 const L6=window.S6ART,H=window.S6H;if(!L6||!H)return;
 const {tel,spd,ph,P6,toP,shot,circ,snd,shake,wind}=H;
 const seg=(T0,ax,ay,bx,by,col,w,hold,dmg,o)=>NP(Object.assign({k:'seg',sty:'laser',col,w,t0:T0,t1:T0+tel(),t2:T0+tel()+hold,a:()=>[ax,ay],b:()=>[bx,by],dmg:dmg||12},o||{}));
 const rect=(T0,x,y,w,h,col,sty,hold,dmg,o)=>NP(Object.assign({k:'rect',x,y,w,h,sty:sty||'light',col,t0:T0,t1:T0+tel(),t2:T0+tel()+(hold||.3),dmg:dmg||11},o||{}));
 const gapRing=(T0,x,y,n,gap,gw,v,o)=>{for(let i=0;i<n;i++){const a=i*TAU/n;if(Math.abs(((a-gap+Math.PI*3)%TAU)-Math.PI)<gw)continue;shot(T0,x,y,a,v,o)}};
 const RB=['#ff4a5a','#ff9a3a','#ffe04a','#4ae08a','#3aa8ff','#6a5aff','#c85aff'];
 const D=(n,kr,ch,est,tip,fn)=>defPat(n,kr,ch,est,tip,fn);

 /* 1 풍향계 기사 */
 D('s6hCrossGale','십자 돌풍','field',13,'[어려움] 바람이 → ↓ ← 로 연달아 바뀌고 나침반 바늘이 나를 노림 → 화살표를 보고 미리 반대로 버텨',t=>{let T=t;
  for(const [dx,dy] of [[1,0],[0,1],[-1,0]]){const tl=wind(T,1.8,dx,dy,50);T+=tl+1.8}
  for(let i=0;i<5+ph();i++){const T0=t+i*.9;sch(T0,()=>{const [x,y]=P6(-11,-19),a=toP(x,y);for(const d of [-.18,0,.18])shot(T0,x,y,a+d,76,{sty:'spark',col:'#e0965a',rayL:26})})}
  return Math.max(T-t,(5+ph())*.9+tel())+.6});
 D('s6xTempestLances','폭풍 창 비','all',12,'[익스트림] 네 벽에서 창이 한꺼번에 날아옴(가로 먼저, 세로 나중) → 빈 가로줄에 섰다가 빈 세로줄로',t=>{const n=3+ph(),rows=6,cols=8;
  for(let k=0;k<n;k++){const T0=t+k*1.8,gr=Math.floor(RND()*rows),gc=Math.floor(RND()*cols);
   sch(T0,()=>{for(let r=0;r<rows;r++){if(r===gr)continue;const y=AY+AH*(r+.5)/rows;shot(T0,AX+4,y,0,120,{sty:'light',col:'#5ad0b0',r:5});shot(T0,AX+AW-4,y,Math.PI,120,{sty:'light',col:'#5ad0b0',r:5})}});
   sch(T0+.7,()=>{for(let c=0;c<cols;c++){if(c===gc)continue;const x=AX+AW*(c+.5)/cols;shot(T0+.7,x,AY+4,Math.PI/2,110,{sty:'light',col:'#bfeaff',r:5})}});snd(T0+tel(),330,.2,'sawtooth',.05,110)}
  return n*1.8+tel()+2.4});
 /* 2 연줄의 거인 */
 D('s6hKiteNet','연줄 그물','field',12,'[어려움] 연줄이 X자 그물로 화면을 덮음 → 그물코가 비어 있는 마름모 칸으로',t=>{const n=2+ph(),sq=Math.SQRT2;
  for(let k=0;k<n;k++){const T0=t+k*1.7;sch(T0,()=>{const sx=AX+50+RND()*(AW-100),sy=AY+40+RND()*(AH-80),cols=['#f0e8d8','#ffd04a'];
   for(let c=-AH;c<AW;c+=46){/* ↘ 줄: x-y=상수 */const x0=AX+c,y0=AY;if(Math.abs((sx-x0)-(sy-y0))/sq>26)seg(T0,x0,y0,x0+AH,y0+AH,cols[0],3,.5,10);
    /* ↙ 줄: x+y=상수 */const x1=AX+AW-c,y1=AY;if(Math.abs((sx-x1)+(sy-y1))/sq>26)seg(T0,x1,y1,x1-AH,y1+AH,cols[1],3,.5,10)}});snd(T0+tel(),1400,.12,'triangle',.04,300)}
  return n*1.7+tel()+.8});
 D('s6xThousandKites','천 개의 연','all',12,'[익스트림] 수십 개의 연이 내 자리로 연달아 꽂히고, 네 번째마다 파편이 튐 → 멈추지 말고 원을 그리며 움직여',t=>{const n=14+ph()*3;
  for(let i=0;i<n;i++){const T0=t+i*.32;sch(T0,()=>{const c=circ(T0,P.x+(RND()-.5)*16,P.y+(RND()-.5)*12,13,['#ff5a4a','#ffd04a','#4a8aff','#5ad08a'][i%4],{label:'◆',t2:T0+tel()+.25});
   if(i%4===3)sch(T0+tel(),()=>{for(let j=0;j<6;j++)npShot(T0+tel(),T0+tel(),c.x,c.y,j*TAU/6+i,62*spd(),{sty:'light',col:'#ffd04a',r:4,noTel:true,dmg:9})})})}
  return n*.32+tel()+1});
 /* 3 번개구름 고래 */
 D('s6hThunderBreach','번개 돌파','all',12,'[어려움] 고래가 내 줄을 가로로 들이받고, 지나간 자리에 번개 기둥 → 위아래로 비켰다가 기둥 사이로',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.9;sch(T0,()=>{const y=clamp(P.y,AY+24,AY+AH-24);rect(T0,AX,y-24,AW,48,'#c8d4e8','steam',.45,14);
   for(let j=0;j<3;j++){const T1=T0+.8+j*.2,x=AX+30+RND()*(AW-60);rect(T1,x-11,AY,22,AH,'#ffe25a','elec',.25,12)}});shake(T0+tel(),.35);snd(T0+tel(),60,.5,'sawtooth',.06,30)}
  return n*1.9+tel()+1.4});
 D('s6xStormSwallow','폭풍 삼키기','field',13,'[익스트림] 고래가 숨을 들이켜 나를 끌어당기고 번개 구슬이 나선으로 퍼짐 → 반대로 버티며 나선 틈으로, 번개 줄도 조심',t=>{const dur=4+ph()*.5;
  sch(t,()=>{const [x,y]=P6(-22,-22);G.pull={x,y,str:40+ph()*6,t0:t+tel(),t1:t+tel()+dur,tp:t,kind:'suck'};
   for(const arm of [0,Math.PI])for(let i=0;i<12;i++){const a0=arm+i*.5;NP({k:'orb',sty:'spark',col:'#ffe25a',r:5,t0:t,t1:t+tel(),t2:t+tel()+dur,noTel:i>0,pos:b=>{const q=Math.max(0,b-t-tel()),r=14+i*9+q*28*spd();return [x+Math.cos(a0+q*1.1)*r,y+Math.sin(a0+q*1.1)*r*.8]},dmg:10})}});
  for(let j=0;j<3;j++){const T0=t+tel()*.5+j*1.2;sch(T0,()=>rect(T0,P.x-12,AY,24,AH,'#ffe25a','elec',.25,12))}
  return tel()+dur+.4});
 /* 4 비행선 함장 */
 D('s6hCarpetBomb','융단 폭격','field',12,'[어려움] 폭탄이 왼쪽에서 오른쪽으로 줄지어 떨어짐 → 줄마다 비어 있는 칸을 따라 걸어',t=>{const rows=5,cols=9,cw=AW/cols,rh=AH/rows,n=1+Math.min(2,ph());
  for(let k=0;k<n;k++){const T0=t+k*3.2,dir=k%2?-1:1;let gap=Math.floor(RND()*rows);for(let c=0;c<cols;c++){const cc=dir>0?c:cols-1-c,Tc=T0+c*.28,g=gap;sch(Tc,()=>{for(let r=0;r<rows;r++){if(r===g)continue;circ(Tc,AX+cw*(cc+.5),AY+rh*(r+.5),Math.min(cw,rh)*.52,'#8a9aac',{label:'●',t2:Tc+tel()+.2})}});gap=clamp(gap+(RND()<.5?-1:1),0,rows-1)}shake(T0+tel()+1,.25)}
  return n*3.2+tel()+.6});
 D('s6xFullBroadside','전 함대 포격','hands',12,'[익스트림] 옆바람 속에 포문 세 곳이 부채꼴로 쏘고, 마지막에 망원경 저격 → 바람을 버티며 부채 틈으로, 붉은 선은 옆으로',t=>{const n=2+ph(),dir=RND()<.5?1:-1,wl=wind(t,n*1.3+2,dir,0,40);
  for(let k=0;k<n;k++){const T0=t+wl*.5+k*1.3;sch(T0,()=>{for(const ox of [-12,0,12]){const [x,y]=P6(ox,-14),a=toP(x,y)+(k%2?.12:0);for(let i=-2;i<=2;i++)shot(T0,x,y,a+i*.24,82,{sty:'coal',col:'#3a2a1a',r:5})}});shake(T0+tel(),.25);snd(T0+tel(),90,.25,'square',.06,40)}
  const T1=t+wl*.5+n*1.3;sch(T1,()=>{const [x,y]=P6(18,-26),a=toP(x,y);seg(T1,x,y,x+Math.cos(a)*600,y+Math.sin(a)*600,'#ff5a6a',7,.3,14)});
  return n*1.3+wl*.5+tel()+1});
 /* 5 깃털 시계탑 */
 D('s6hMidnight','자정의 종','head',12,'[어려움] 문자판의 열두 바늘이 짝수·홀수로 번갈아 내리침 → 내리치기 직전 옆 칸으로 한 칸씩',t=>{const n=2+ph();
  for(let k=0;k<n;k++){for(const par of [0,1]){const T0=t+k*1.8+par*.9,off=k*.13;sch(T0,()=>{const [x,y]=P6(0,-32);for(let i=par;i<12;i+=2){const a=off+i*TAU/12;seg(T0,x,y,x+Math.cos(a)*420,y+Math.sin(a)*420,par?'#c8964a':'#8ad8ff',5,.3,11)}});snd(T0+tel(),par?392:523,.3,'triangle',.05,par?392:523)}}
  return n*1.8+.9+tel()+.5});
 D('s6xTimeRewind','되감기','all',12,'[익스트림] 깃털 고리가 퍼졌다가 거꾸로 되돌아옴 → 처음 지나간 틈에 그대로 머물러',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.4;sch(T0,()=>{const [x,y]=P6(0,-32),gap=toP(x,y)+(k%2?.6:-.6),Tg=T0+tel();for(let i=0;i<20;i++){const a=i*TAU/20;if(Math.abs(((a-gap+Math.PI*3)%TAU)-Math.PI)<.42)continue;
    NP({k:'orb',sty:'light',col:'#8ad8ff',r:4,t0:T0,t1:Tg,t2:Tg+3.4,ray:a,rayL:22,noTel:i>1,pos:b=>{const q=Math.max(0,b-Tg),d=(q<1.7?q:3.4-q)*80*spd();return [x+Math.cos(a)*d,y+Math.sin(a)*d]},dmg:10})}});snd(T0+tel()+1.7,880,.4,'triangle',.05,220)}
  return n*1.4+tel()+3.5});
 /* 6 풍금 합창단 */
 D('s6hCanon','카논','field',12,'[어려움] 가로 음파 줄과 세로 음파 기둥이 한 박자 차이로 따라옴 → 가로 빈 줄 → 세로 빈 기둥 순서로',t=>{const n=3+ph(),rows=6,cols=9,rh=AH/rows,cw=AW/cols;
  for(let k=0;k<n;k++){const T0=t+k*1.5,gr=Math.floor(RND()*rows),gc=Math.floor(RND()*cols);
   sch(T0,()=>{for(let r=0;r<rows;r++)if(r!==gr&&r!==(gr+3)%rows)rect(T0,AX,AY+r*rh+3,AW,rh-6,'#c8a0ff','light',.3,11)});
   sch(T0+.75,()=>{for(let c=0;c<cols;c++)if(Math.abs(c-gc)>1)rect(T0+.75,AX+c*cw+3,AY,cw-6,AH,'#e0c0ff','light',.3,11)});snd(T0+tel(),[262,330,392,523][k%4],.3,'triangle',.05,262)}
  return n*1.5+.75+tel()+.5});
 D('s6xGrandFinale','대합창','all',13,'[익스트림] 풀무 바람이 좌우로 바뀌는 동안 합창 고리와 화음 기둥이 겹침 → 바람 방향 → 고리 틈 → 기둥 사이',t=>{const w1=wind(t,2.4,-1,0,46);wind(t+w1+2.4,2.4,1,0,46);const cols=9,cw=AW/cols;
  for(let k=0;k<4;k++){const T0=t+k*1.2;sch(T0,()=>{const [x,y]=P6((k%3-1)*8,-34);gapRing(T0,x,y,22,RND()*TAU,.5,56,{sty:'note',col:'#e0c0ff',r:4,rayL:14})})}
  for(let k=0;k<3;k++){const T0=t+.6+k*1.6,base=Math.floor(RND()*cols);sch(T0,()=>{for(const d of [0,3,6])rect(T0,AX+((base+d)%cols)*cw+3,AY,cw-6,AH,'#c8a0ff','light',.3,11)})}
  return w1+5.4});
 /* 7 무지개 다리 수문장 */
 D('s6hRainbowCage','무지개 감옥','all',12,'[어려움] 내 주위로 일곱 빛살이 감옥처럼 돎 → 가운데에 머물다가, 가운데가 터지기 전에 빛살 틈으로 탈출',t=>{const dur=2.6+ph()*.4;
  sch(t,()=>{const cx=P.x,cy=P.y,Tg=t+tel(),dir=RND()<.5?1:-1;for(let i=0;i<7;i++){const a0=i*TAU/7;NP({k:'seg',sty:'laser',col:RB[i],w:5,live:true,t0:t,t1:Tg,t2:Tg+dur,a:b=>{const a=a0+dir*Math.max(0,b-Tg)*.7*spd();return [cx+Math.cos(a)*34,cy+Math.sin(a)*34]},b:b=>{const a=a0+dir*Math.max(0,b-Tg)*.7*spd();return [cx+Math.cos(a)*420,cy+Math.sin(a)*420]},dmg:12})}
   const Te=Tg+dur-tel();sch(Te,()=>circ(Te,cx,cy,30,'#ffffff',{label:'✦'}))});
  return tel()+2.6+ph()*.4+.8});
 D('s6xSpectrumNova','스펙트럼 폭발','head',13,'[익스트림] 외눈에서 일곱 색 광선이 한 바퀴 돌고, 결정 파편이 퍼짐 → 광선 사이를 따라 같은 방향으로 돌아',t=>{const dur=3.4+ph()*.5;
  sch(t,()=>{const [x,y]=P6(0,-44),Tg=t+tel(),a00=toP(x,y)+Math.PI/7,dir=RND()<.5?1:-1;for(let i=0;i<7;i++){const a0=a00+i*TAU/7;NP({k:'seg',sty:'laser',col:RB[i],w:6,live:true,t0:t,t1:Tg,t2:Tg+dur,a:()=>[x,y],b:b=>{const a=a0+dir*Math.max(0,b-Tg)*.55*spd();return [x+Math.cos(a)*520,y+Math.sin(a)*520]},dmg:12})}});
  for(let k=0;k<2;k++){const T0=t+tel()+1+k*1.4;sch(T0,()=>{const [x,y]=P6(0,-24);gapRing(T0,x,y,14,toP(x,y)+Math.PI,.5,60,{sty:'crystal',col:'#a8d8ff',r:5})})}
  return tel()+dur+.4});
 /* 8 메아리 사냥매 */
 D('s6hTwinDive','쌍 급강하','all',12,'[어려움] 양 날개에서 X자로 엇갈리는 급강하 선이 나를 지남 → 두 선이 만나는 곳을 벗어나',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.6;sch(T0,()=>{for(const s of [-1,1]){const [x,y]=P6(s*24,-38),a=toP(x,y);seg(T0,x,y,x+Math.cos(a)*560,y+Math.sin(a)*560,s<0?'#ff9a3a':'#ffc860',14,.25,14)}});shake(T0+tel(),.3);snd(T0+tel(),1600,.25,'sawtooth',.05,200)}
  return n*1.6+tel()+.6});
 D('s6xHuntingStorm','사냥 폭풍','all',12,'[익스트림] 사냥매가 화면 가장자리 아무 데서나 나를 향해 연달아 급강하 → 선이 보이면 직각으로 비켜',t=>{const n=6+ph();
  for(let k=0;k<n;k++){const T0=t+k*.75;sch(T0,()=>{const e=Math.floor(RND()*4),q=RND(),sx=e===0?AX:e===1?AX+AW:AX+q*AW,sy=e===2?AY:e===3?AY+AH:AY+q*AH,a=toP(sx,sy);seg(T0,sx,sy,sx+Math.cos(a)*600,sy+Math.sin(a)*600,'#ff9a3a',13,.22,13)});snd(T0+tel(),1800,.2,'sawtooth',.04,300)}
  return n*.75+tel()+.6});
 /* 9 폭풍의 눈 */
 D('s6hEyeWall','눈벽','all',12,'[어려움] 잔해 고리가 나를 둘러싸고 좁혀 옴 → 고리의 빈 틈(돌아감)으로 빠져나가',t=>{const n=2;
  for(let k=0;k<n;k++){const T0=t+k*2.2;sch(T0,()=>{const cx=P.x,cy=P.y,Tg=T0+tel(),gap=RND()*TAU,dir=k%2?1:-1,m=26;for(let i=0;i<m;i++){const a0=i*TAU/m;if(Math.abs(((a0-gap+Math.PI*3)%TAU)-Math.PI)<.55)continue;
    NP({k:'orb',sty:['crate','light','scrap'][i%3],col:'#c8a060',r:5,t0:T0,t1:Tg,t2:Tg+2.2,noTel:i>2,pos:b=>{const q=Math.max(0,b-Tg),r=Math.max(10,110-q*48*spd()),a=a0+dir*(b-T0)*.5;return [cx+Math.cos(a)*r,cy+Math.sin(a)*r*.85]},dmg:11})}});snd(T0+tel(),80,.8,'sawtooth',.05,40)}
  return n*2.2+tel()+.4});
 D('s6xHeartOfStorm','폭풍의 심장','field',13,'[익스트림] 눈이 끌어당기는 동안 번개 격자가 번갈아 치고 잔해가 돎 → 반대로 버티며 격자 빈 칸으로',t=>{const dur=4.4;
  sch(t,()=>{const [x,y]=P6(0,-26);G.pull={x,y,str:40,t0:t+tel(),t1:t+tel()+dur,tp:t,kind:'suck'};for(let i=0;i<8;i++){const a0=i*TAU/8;NP({k:'orb',sty:'scrap',col:'#c8a060',r:5,t0:t,t1:t+tel(),t2:t+tel()+dur,noTel:true,pos:b=>{const q=Math.max(0,b-t);return [x+Math.cos(a0+q*1.6)*70,y+Math.sin(a0+q*1.6)*50]},dmg:10})}});
  for(let k=0;k<3;k++){const T0=t+.8+k*1.3,vert=k%2===0,cnt=vert?5:3,off=RND();sch(T0,()=>{for(let i=0;i<cnt;i++){if(vert)rect(T0,AX+(i+off*.6)*(AW/cnt),AY,14,AH,'#ffe25a','elec',.28,12);else rect(T0,AX,AY+(i+off*.6)*(AH/cnt),AW,12,'#ffe25a','elec',.28,12)}});sch(T0+tel(),()=>{G.flash=Math.max(G.flash||0,.1)})}
  return tel()+dur+.4});
 /* 10 공명탑 */
 D('s6hDissonance','불협화음','field',12,'[어려움] 가로 하프 줄과 세로 하프 줄이 동시에 울림 → 빈 가로줄과 빈 세로줄이 만나는 칸으로',t=>{const n=2+ph(),rows=7,cols=9,rh=AH/rows,cw=AW/cols;
  for(let k=0;k<n;k++){const T0=t+k*1.8,gr=Math.floor(RND()*rows),gc=Math.floor(RND()*cols);sch(T0,()=>{
   for(let r=0;r<rows;r++){if(r===gr)continue;const y=AY+rh*(r+.5);seg(T0,AX,y,AX+AW,y,['#7af0ff','#c8a0ff','#ffe8a0'][r%3],5,.35,12)}
   for(let c=0;c<cols;c++){if(c===gc)continue;const x=AX+cw*(c+.5);seg(T0,x,AY,x,AY+AH,'#ff8ab0',4,.35,12)}});snd(T0+tel(),[277,311,370][k%3],.4,'sawtooth',.05,262)}
  return n*1.8+tel()+.6});
 D('s6xFinalChorus','마지막 합창','all',14,'[익스트림] 바람 속에서 종 고리가 퍼지고, 하프 줄이 연달아 울리고, 내 자리에 공명이 터짐 → 계속 움직이며 빈 줄로',t=>{const wl=wind(t,5,RND()<.5?1:-1,0,38),rows=7,rh=AH/rows;
  sch(t,()=>{const [x,y]=P6(0,-24);for(let r=0;r<2;r++)for(let i=0;i<12;i++){if(i===r*5||i===r*5+1)continue;const a0=i*TAU/12,dir=r?-1:1;NP({k:'orb',sty:'bob',col:'#e0b860',r:5,t0:t,t1:t+tel(),t2:t+tel()+3.6,noTel:true,pos:b=>{const q=Math.max(0,b-t-tel()),rr=24+r*16+q*40*spd();return [x+Math.cos(a0+dir*q*.7)*rr,y+Math.sin(a0+dir*q*.7)*rr*.8]},dmg:10})}});
  for(let k=0;k<2;k++){const T0=t+1.6+k*2,safe=Math.floor(RND()*rows);for(let r=0;r<rows;r++){if(r===safe)continue;const Tr=T0+r*.12,y=AY+rh*(r+.5);seg(Tr,AX,y,AX+AW,y,['#7af0ff','#c8a0ff','#ffe8a0'][r%3],6,.3,12)}}
  for(let i=0;i<4;i++){const T0=t+.8+i*1.2;sch(T0,()=>circ(T0,P.x,P.y,15,'#ffe8a0',{label:'♪'}))}
  return Math.max(wl+5,1.6+2*2+tel())+.4});

 /* ---------- 난이도별 추가 공격 장치에 등록: [보통, 어려움, 익스트림] ---------- */
 const EXTRA=window.S6EXTRA={s6_vane:['s6hCrossGale','s6xTempestLances'],s6_kite:['s6hKiteNet','s6xThousandKites'],s6_cloudwhale:['s6hThunderBreach','s6xStormSwallow'],s6_captain:['s6hCarpetBomb','s6xFullBroadside'],s6_clock:['s6hMidnight','s6xTimeRewind'],
  s6_organ:['s6hCanon','s6xGrandFinale'],s6_prism:['s6hRainbowCage','s6xSpectrumNova'],s6_falcon:['s6hTwinDive','s6xHuntingStorm'],s6_storm:['s6hEyeWall','s6xHeartOfStorm'],s6_spire:['s6hDissonance','s6xFinalChorus']};
 try{for(const k in EXTRA)T5_SET[k]=[[],[EXTRA[k][0]],[EXTRA[k][1]]]}catch(e){console.error('v46 t5',e)}

 /* 보스 러시 상세: 챕터 6 탭에서 난이도 전용 공격도 보여 줌 */
 {const f=rpDetail;rpDetail=function(){const r=f.apply(this,arguments);try{if(GM.rushCh===5&&!rpLocked()){const art=L6[GM.rushSel].art,ex=EXTRA[art],box=document.querySelector('#gmRushDet .rpChips');if(ex&&box&&!box.querySelector('.s6ex')){
   const lv={easy:0,normal:1,hard:2,extreme:3}[diff]||0,mk=(n,tag,need)=>'<span class="rpChip s6ex" title="'+((ATK_TIP[n]||'').replace(/"/g,''))+'" style="'+(lv>=need?'':'opacity:.45')+'">'+(ATK_NAME[n]||n)+'<i>'+tag+'</i></span>';
   box.insertAdjacentHTML('beforeend',mk(ex[0],'어려움+',2)+mk(ex[1],'익스트림',3))}}}catch(e){}return r}}
}catch(e){console.error('v46 ch6 hard',e)}})();
