/* ================= v52 챕터 7 어려움·익스트림 전용 공격 20종 (보스마다 2개) =================
   - 어려움부터: 보스마다 1개 (익스트림에도 나옴)
   - 익스트림만: 보스마다 1개
   쉬움·보통에는 나오지 않는다. 난이도별 추가 공격 장치(840의 T5_SET)에 등록해서 덱에 섞인다.
   모두 그 보스가 "할 법한" 행동에서 나온다(열쇠·눈·물·체스 말·촛대·춤·목마·실·비늘·대검).
   모든 공격은 예고가 먼저 나오고, 반드시 빠져나갈 틈이 있다. 메아리(1박자 뒤 좌우 반전)도 섞인다. */
(function(){try{
 const L7=window.S7ART,H=window.S7H;if(!L7||!H)return;
 const {tel,spd,ph,P7,toP,shot,circ,seg,rect,snd,shake,gapRing,echo,CX,CY}=H;
 const D=(n,kr,ch,est,tip,fn)=>defPat(n,kr,ch,est,tip,fn);
 const live=(T0,x,y,a0,rot,len,col,w,dur,dmg)=>NP({k:'seg',sty:'laser',col,w,live:true,t0:T0,t1:T0+tel(),t2:T0+tel()+dur,a:()=>[x,y],b:b=>{const a=a0+Math.max(0,b-T0-tel())*rot*spd();return [x+Math.cos(a)*len,y+Math.sin(a)*len]},dmg:dmg||12});

 /* 1 거울문 수문장 */
 D('s7hGateLock','자물쇠 감옥','field',13,'[어려움] 내 둘레에 문짝 네 개가 닫혀 오고 한쪽만 열쇠 구멍처럼 열림, 곧바로 새 자리에서 또 잠김 → 열린 쪽으로 빠져나가',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.5;sch(T0,()=>{const cx=clamp(P.x,AX+50,AX+AW-50),cy=clamp(P.y,AY+50,AY+AH-50),g=34,op=Math.floor(RND()*4),col=k%2?'#c89aff':'#ffd27a';
    if(op!==0)rect(T0,AX,AY,cx-g-AX,AH,col,'light',.35,13);if(op!==1)rect(T0,cx+g,AY,AX+AW-cx-g,AH,col,'light',.35,13);
    if(op!==2)rect(T0,cx-g,AY,g*2,cy-g-AY,col,'light',.35,13);if(op!==3)rect(T0,cx-g,cy+g,g*2,AY+AH-cy-g,col,'light',.35,13);
    rect(T0,cx-g+6,cy-g+6,g*2-12,g*2-12,col,'light',.3,13,{t0:T0+tel()*.35})});shake(T0+tel(),.3);snd(T0+tel(),220,.3,'square',.05,110)}
  return n*1.5+tel()+.6});
 D('s7xGateThirteen','열세 번째 문','all',13,'[익스트림] 문들이 줄지어 화면을 가로지르며 하나씩 열림, 머리의 시계 바늘도 거꾸로 돎 → 열린 문짝 칸을 따라 걸어',t=>{const n=4+ph(),rows=6,rh=AH/rows,dur=n*1.3+tel()+1.8;
  for(let k=0;k<n;k++){const T0=t+k*1.3,gap=Math.floor(RND()*rows),dir=k%2?-1:1;sch(T0,()=>{for(let r=0;r<rows;r++){if(r===gap)continue;const y=AY+r*rh+2,x0=dir>0?AX-30:AX+AW;NP({k:'rect',x:x0,y,w:30,h:rh-4,sty:'light',col:'#ffd27a',t0:T0,t1:T0+tel(),t2:T0+tel()+3.4,rf:b=>{const q=Math.max(0,b-T0-tel());return [x0+dir*q*(AW+30)/3.2*spd(),y,30,rh-4]},dmg:12})}})}
  sch(t,()=>{const [x,y]=P7(0,-51);for(let i=0;i<2;i++)live(t,x,y,i*Math.PI,-.45,420,'#ff7ad0',4,dur,11)});
  return dur+.4});
 /* 2 유리 공작 */
 const fanEye=(i,n)=>{const a=Math.PI+(.12+i*(.76/(n-1)))*Math.PI,L=29;return P7(Math.cos(a)*L,-14+Math.sin(a)*L*.95)};
 D('s7hPeaHundred','백 개의 눈 일제히','head',12,'[어려움] 꼬리 깃털 눈이 모두 나를 보고 한꺼번에 쏘고, 반 박자 뒤 메아리 눈이 반대쪽에서 → 쏘는 순간 옆으로 크게',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.8;echo(T0,'#7af0d0',(T,mx,ma,col)=>{for(let i=0;i<13;i+=2){const [x,y]=fanEye(i,13),sx=mx(x);shot(T,sx,y,toP(sx,y),88,{sty:'light',col,r:4,rayL:22,noTel:i>1})}},.5);snd(T0+tel(),880,.12,'triangle',.05,1200)}
  return n*1.8+.5+tel()+1.2});
 D('s7xPeaPrismTail','프리즘 꼬리','all',12,'[익스트림] 꼬리가 일곱 빛 레이저 부채로 펼쳐져 돌고, 유리 깃털이 비처럼 쏟아짐 → 레이저 틈을 따라 돌며 깃털을 피해',t=>{const dur=4+ph()*.6,RB=['#ff4a5a','#ff9a3a','#ffe04a','#4ae08a','#3aa8ff','#6a5aff','#c85aff'];
  sch(t,()=>{const [x,y]=P7(0,-14);for(let i=0;i<7;i++)live(t,x,y,Math.PI+i*Math.PI/6,.38*(ph()%2?-1:1),420,RB[i],4,dur,11)});
  for(let i=0;i<Math.round(dur*4);i++){const T0=t+tel()*.6+i*.25;sch(T0,()=>shot(T0,AX+10+RND()*(AW-20),AY+2,Math.PI/2+(RND()-.5)*.6,70,{sty:'light',col:'#b8fff6',r:3,rayL:20}))}
  return tel()+dur+.4});
 /* 3 역류의 분수 */
 D('s7hFountGeyser','간헐천 추격','field',12,'[어려움] 내 발밑부터 물기둥이 차례로 솟아 따라옴, 메아리는 반대쪽에서 → 솟기 전에 방향을 바꿔',t=>{const n=6+ph()*2,cw=36;
  for(let i=0;i<n;i++){const T0=t+i*.5;sch(T0,()=>{const x=clamp(P.x-cw/2,AX,AX+AW-cw);echo(T0,'#7ad8ff',(T,mx,ma,col,m)=>{rect(T,m?2*CX-x-cw:x,AY,cw,AH,col,'ice',.3,12)},.75)})}
  return n*.5+.75+tel()+.5});
 D('s7xFountFlood','역류 홍수','all',13,'[익스트림] 물이 아래에서 위로 차오르며 지나가고(빈 칸 하나), 빗방울도 거꾸로 솟음 → 빈 칸으로 옮겨 기다려',t=>{const n=2+ph(),cols=6,cw=AW/cols;
  for(let k=0;k<n;k++){const T0=t+k*2.4,gap=Math.floor(RND()*cols);sch(T0,()=>{for(let c=0;c<cols;c++){if(c===gap)continue;NP({k:'rect',x:AX+c*cw+1,y:AY+AH-16,w:cw-2,h:16,sty:'ice',col:'#5ac8f0',t0:T0,t1:T0+tel(),t2:T0+tel()+2.4,live:true,step:(o,b)=>{if(b>=o.t1)o.y=AY+AH-16-(b-o.t1)*110*spd()},dmg:12})}
    for(let i=0;i<5;i++){const x=AX+gap*cw+cw/2+(i%2?1:-1)*(cw*.8+i*20);if(x>AX+6&&x<AX+AW-6)shot(T0+i*.3,x,AY+AH-2,-Math.PI/2,80,{sty:'bubble',col:'#8ae0ff',r:4,rayL:24})}})}
  return n*2.4+tel()+2.6});
 /* 4 흑백 체스 왕 */
 D('s7hChessQueen','퀸의 행진','all',13,'[어려움] 퀸이 내 자리에서 가로·세로·대각 여덟 방향을 한꺼번에 찍음 → 여덟 줄 사이 빈 틈으로',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.6,px=P.x,py=P.y,rot=k%2?Math.PI/8:0;echo(T0,'#f2f6ff',(T,mx,ma,col)=>{const x=mx(px);for(let i=0;i<4;i++){const a=rot+i*Math.PI/4;seg(T,x-Math.cos(a)*520,py-Math.sin(a)*520,x+Math.cos(a)*520,py+Math.sin(a)*520,col,6,.3,13)}},.9);shake(T0+tel(),.25)}
  return n*1.6+.9+tel()+.5});
 D('s7xChessPromotion','폰의 승격','field',13,'[익스트림] 폰들이 위에서 한 칸씩 내려오다 바닥에 닿으면 퀸이 되어 가로줄을 쏨 → 폰 사이로, 바닥 줄은 피해',t=>{const cols=8,cw=AW/cols,n=4+ph(),Tg=t+tel(),drop=3;
  const used=new Set();for(let i=0;i<n;i++){let c=Math.floor(RND()*cols);while(used.has(c))c=(c+1)%cols;used.add(c);const x=AX+cw*(c+.5),T0=t+i*.35;
   NP({k:'orb',sty:'bob',col:'#e8ecf4',r:8,t0:T0,t1:T0+tel(),t2:T0+tel()+drop,pos:b=>{const q=Math.max(0,b-T0-tel())/drop;return [x,AY+12+Math.floor(q*5)/5*(AH-30)]},dmg:12});
   const Tq=T0+tel()+drop;sch(Tq,()=>{seg(Tq,AX,AY+AH-14,AX+AW,AY+AH-14,'#f2f6ff',10,.3,13);seg(Tq,x,AY,x,AY+AH,'#16161e',6,.3,12)})}
  return tel()+n*.35+drop+tel()+.6});
 /* 5 거꾸로 타는 초 */
 D('s7hCandleCandelabra','촛대의 일곱 불','hands',12,'[어려움] 촛대 팔의 불꽃들이 하나씩 나를 겨눠 불줄기를 뿜고, 메아리는 반대편 팔에서 → 한 줄씩 비켜',t=>{const n=5+ph();
  for(let i=0;i<n;i++){const T0=t+i*.55,s=i%2?1:-1,ax=s*(10+(i%3)*6),ay=-24-(i%3)*4;echo(T0,'#5af0e0',(T,mx,ma,col)=>{const [x,y]=P7(ax,ay),sx=mx(x),a=toP(sx,y);seg(T,sx,y,sx+Math.cos(a)*560,y+Math.sin(a)*560,col,8,.3,12)},.8)}
  return n*.55+.8+tel()+.5});
 D('s7xCandleMelt','녹아내리는 시간','all',13,'[익스트림] 위에서 촛농이, 아래에서 거꾸로 촛농이 동시에 흐르고, 불꽃 고리가 좁혀 옴 → 고리 틈으로 빠져나가며 촛농 줄을 피해',t=>{const n=10+ph()*3;
  for(let i=0;i<n;i++){const T0=t+i*.28,x=AX+14+((i*71)%(AW-28));echo(T0,'#5af0e0',(T,mx,ma,col,m)=>{shot(T,mx(x),m?AY+AH-2:AY+2,m?-Math.PI/2:Math.PI/2,70,{sty:'fire',col,r:4,rayL:26})},.6)}
  sch(t+1,()=>{const cx=P.x,cy=P.y,Tg=t+1+tel(),gap=RND()*TAU,m=24;for(let i=0;i<m;i++){const a0=i*TAU/m;if(Math.abs(((a0-gap+Math.PI*3)%TAU)-Math.PI)<.45)continue;NP({k:'orb',sty:'fire',col:'#a8fff0',r:5,t0:t+1,t1:Tg,t2:Tg+2.2,noTel:i>2,pos:b=>{const q=Math.max(0,b-Tg),r=Math.max(10,110-q*50*spd());return [cx+Math.cos(a0+q*.3)*r,cy+Math.sin(a0+q*.3)*r*.85]},dmg:11})}});
  return Math.max(n*.28+.6,1+2.2)+tel()+1.4});
 /* 6 오르골 발레리나 */
 D('s7hBalletDuet','거울 2인무','all',12,'[어려움] 발레리나와 거울 속 발레리나가 마주 보며 돌고 칼날 치마를 나선으로 뿌림 → 두 나선이 엇갈리는 빈 곳으로',t=>{const dur=3+ph()*.5;
  for(let i=0;i<Math.round(dur*6);i++){const T0=t+i/6;sch(T0,()=>{const [x,y]=P7(0,-30);for(let j=0;j<2;j++){shot(T0,x,y,T0*2.2+j*Math.PI,64,{sty:'crystal',col:'#ffb0d8',r:4,rayL:14,noTel:i>0});shot(T0,2*CX-x,y+30,Math.PI-(T0*2.2+j*Math.PI),64,{sty:'crystal',col:'#c89aff',r:4,rayL:14,noTel:i>0})}})}
  return dur+tel()+1.8});
 D('s7xBalletFinale','커튼콜','field',13,'[익스트림] 오선 줄을 따라 양쪽에서 음표가 흐르고, 무대 조명이 나를 따라와 터짐 → 빈 줄에 서서 조명이 오면 옆 칸으로',t=>{const n=2+ph(),rows=6,rh=AH/(rows+1);
  for(let k=0;k<n;k++){const T0=t+k*2.2,g1=Math.floor(RND()*rows),g2=(g1+2+Math.floor(RND()*3))%rows;sch(T0,()=>{for(let r=0;r<rows;r++){if(r===g1||r===g2)continue;const y=AY+rh*(r+1),L=r%2===0;for(let j=0;j<3;j++)shot(T0+j*.3,L?AX+2:AX+AW-2,y,L?0:Math.PI,96,{sty:'note',col:L?'#e0ccff':'#ffb0d8',r:4,rayL:18,noTel:j>0})}})}
  for(let i=0;i<3+ph();i++){const T0=t+.8+i*1.1;sch(T0,()=>circ(T0,P.x,P.y,22,'#fff0c0',{label:'✦'}))}
  return n*2.2+tel()+2.6});
 /* 7 뒤집힌 회전목마 */
 D('s7hCarGallop','목마 질주','field',12,'[어려움] 목마들이 줄지어 가로로 내달리고, 메아리 목마는 반대 방향으로 → 빈 줄에서 기다려',t=>{const n=2+ph(),rows=5,rh=AH/rows;
  for(let k=0;k<n;k++){const T0=t+k*2,gap=Math.floor(RND()*rows);echo(T0,'#ffd27a',(T,mx,ma,col,m)=>{for(let r=0;r<rows;r++){if(r===gap)continue;const y=AY+rh*(r+.5),L=(r+k)%2===0!==m;for(let j=0;j<2;j++)shot(T+j*.35,L?AX+4:AX+AW-4,y,L?0:Math.PI,104,{sty:'bob',col,r:7,rayL:20,noTel:j>0})}},1)}
  return n*2+1+tel()+2.4});
 D('s7xCarDerail','탈선','all',13,'[익스트림] 회전목마가 돌다 축이 빠져, 목마와 전구가 소용돌이처럼 바깥으로 튕겨 나감 → 소용돌이 팔 사이를 따라 돌아',t=>{const dur=3.2+ph()*.5;
  for(let i=0;i<Math.round(dur*5);i++){const T0=t+i/5;sch(T0,()=>{const [x,y]=P7(0,-26);for(let j=0;j<4;j++){const a=-T0*1.8+j*TAU/4;shot(T0,x,y,a,58+(i%3)*8,{sty:j%2?'bob':'light',col:j%2?'#f2e8ff':'#ffd27a',r:j%2?6:4,rayL:14,noTel:i>0})}})}
  shake(t+tel(),.35);return dur+tel()+2});
 /* 8 그림자 인형사 */
 D('s7hPupMarionette','마리오네트 춤','all',12,'[어려움] 내 그림자 인형이 거울처럼 반대로 따라 하고, 지나간 자리에 실이 내려꽂힘 → 인형과 마주치지 않게 가운데를 피하고, 한 자리에 머물지 마',t=>{const dur=4+ph()*.6;
  sch(t,()=>NP({k:'orb',sty:'bob',col:'#3e3058',r:8,t0:t,t1:t+tel(),t2:t+tel()+dur,prev:.6,pos:()=>[2*CX-P.x,2*CY-P.y],dmg:12}));
  for(let i=0;i<Math.round(dur/.7);i++){const T0=t+tel()*.5+i*.7;sch(T0,()=>{const x=P.x;seg(T0,x,AY,x,AY+AH,'#c4d0e4',4,.3,11)})}
  return tel()+dur+.5});
 D('s7xPupCurtain','막이 내린다','field',13,'[익스트림] 무대 막이 위에서 칸칸이 내려오고(빈 칸 하나), 터지는 꼭두각시가 섞임 → 빈 칸 아래로 들어가',t=>{const n=2+ph(),cols=7,cw=AW/cols;
  for(let k=0;k<n;k++){const T0=t+k*2.6,gap=Math.floor(RND()*cols);sch(T0,()=>{for(let c=0;c<cols;c++){if(c===gap)continue;NP({k:'rect',x:AX+c*cw+1,y:AY,w:cw-2,h:14,sty:'light',col:'#6a3a8a',t0:T0,t1:T0+tel(),t2:T0+tel()+2.2,live:true,step:(o,b)=>{if(b>=o.t1)o.h=Math.min(AH,14+(b-o.t1)*120*spd())},dmg:12})}
    const dx=AX+cw*(gap+.5),T1=T0+tel()+1.4;sch(T1,()=>gapRing(T1,(dx+CX)/2,AY+40,10,Math.PI/2,.6,62,{sty:'light',col:'#b48aff',r:4,noTel:true}))})}
  return n*2.6+tel()+2.4});
 /* 9 반사룡 */
 D('s7hDragonTwin','쌍둥이 숨결','head',13,'[어려움] 용의 숨결과 거울 숨결이 양쪽에서 동시에 쓸어오며 가운데서 엇갈림 → 엇갈리는 순간 가운데 틈으로',t=>{const n=1+Math.min(1,ph());
  for(let k=0;k<n;k++){const T0=t+k*2.6;sch(T0,()=>{const [x,y]=P7(-19,-40);for(const m of [0,1]){const sx=m?2*CX-x:x;NP({k:'seg',sty:'laser',col:m?'#c89aff':'#8af0ff',w:10,live:true,t0:T0,t1:T0+tel(),t2:T0+tel()+1.4,a:()=>[sx,y],b:b=>{const q=clamp((b-T0-tel())/1.4,0,1),a0=Math.PI*(.9-q*.4),a=m?Math.PI-a0:a0;return [sx+Math.cos(a)*520,y+Math.sin(a)*520]},dmg:13})}});shake(T0+tel(),.3)}
  return n*2.6+tel()+1.6});
 D('s7xDragonKaleido','만화경','all',12,'[익스트림] 비늘 결정이 양쪽 날개에서 쏟아져 벽에 튕기고, 거울판이 세로로 꽂힘 → 튕기는 각을 읽으며 판 사이로',t=>{const n=5+ph();
  sch(t,()=>{for(const s of [-1,1]){const [x0,y]=P7(s*24,-30),Tg=t+tel();for(let i=0;i<n;i++){const a=toP(x0,y)+(i-(n-1)/2)*.32;NP({k:'orb',sty:'crystal',col:s<0?'#8af0ff':'#c89aff',r:5,t0:t,t1:Tg,t2:Tg+4,ray:a,rayL:24,noTel:i>0,pos:npBounce(x0,y,a,78*spd(),Tg)})}}});
  for(let i=0;i<4+ph();i++){const T0=t+1.2+i*.6,x=AX+30+((i*97)%(AW-60));sch(T0,()=>rect(T0,x-10,AY,20,AH,'#c8dcf0','ice',.3,12))}
  return tel()+4.2});
 /* 10 거울 하루 */
 D('s7hHaruCounter','거울 반격','hands',13,'[어려움] 대검이 X자로 두 번 베고, 메아리가 반대 X자로 → 칼이 지나간 쪽으로 바로 들어가',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.8;echo(T0,'#e0ccff',(T,mx,ma,col)=>{const [x,y]=P7(-11,-22),sx=mx(x);for(const d of [-1,1])NP({k:'seg',sty:'laser',col,w:12,live:true,t0:T,t1:T+tel(),t2:T+tel()+.45,a:()=>[sx,y],b:b=>{const q=clamp((b-T-tel())/.45,0,1),a=ma(Math.PI/2+d*(1.2-q*2.4)*.5+d*.3);return [sx+Math.cos(a)*440,y+Math.sin(a)*440]},dmg:14})},.9);shake(T0+tel()+.2,.35)}
  return n*1.8+.9+tel()+.6});
 D('s7xHaruZero','0시의 거울','all',14,'[익스트림] 머리 뒤 시계가 0시를 치며 바늘 두 겹이 서로 반대로 돌고, 날개 조각이 쏟아짐 → 두 바늘이 엇갈리는 틈을 따라',t=>{const dur=4+ph()*.5;
  sch(t,()=>{const [x,y]=P7(0,-43);for(let i=0;i<3;i++){live(t,x,y,i*TAU/3,.5,460,'#b48aff',5,dur,12);live(t,x,y,i*TAU/3+Math.PI/3,-.5,460,'#e0ccff',3,dur,11)}});
  for(let i=0;i<8+ph()*2;i++){const T0=t+tel()+.4+i*.4;sch(T0,()=>{const s=i%2?1:-1,[x,y]=P7(s*18,-36);shot(T0,x,y,toP(x,y),84,{sty:'crystal',col:'#e8f4ff',r:4,rayL:20})})}
  snd(t+tel(),196,1,'triangle',.06,98);return tel()+dur+.4});

 /* ---------- 난이도별 추가 공격 장치에 등록: [보통, 어려움, 익스트림] ---------- */
 const EXTRA=window.S7EXTRA={s7_gate:['s7hGateLock','s7xGateThirteen'],s7_peacock:['s7hPeaHundred','s7xPeaPrismTail'],s7_fountain:['s7hFountGeyser','s7xFountFlood'],s7_chess:['s7hChessQueen','s7xChessPromotion'],s7_candle:['s7hCandleCandelabra','s7xCandleMelt'],
  s7_ballet:['s7hBalletDuet','s7xBalletFinale'],s7_carousel:['s7hCarGallop','s7xCarDerail'],s7_puppet:['s7hPupMarionette','s7xPupCurtain'],s7_dragon:['s7hDragonTwin','s7xDragonKaleido'],s7_mharu:['s7hHaruCounter','s7xHaruZero']};
 try{for(const k in EXTRA)T5_SET[k]=[[],[EXTRA[k][0]],[EXTRA[k][1]]]}catch(e){console.error('v52 t5',e)}

 /* 보스 러시 상세: 챕터 7 탭에서 난이도 전용 공격도 보여 줌 */
 {const f=rpDetail;rpDetail=function(){const r=f.apply(this,arguments);try{if(GM.rushCh===6&&!rpLocked()){const art=L7[GM.rushSel].art,ex=EXTRA[art],box=document.querySelector('#gmRushDet .rpChips');if(ex&&box&&!box.querySelector('.s7ex')){
   const lv={easy:0,normal:1,hard:2,extreme:3}[diff]||0,mk=(n,tag,need)=>'<span class="rpChip s7ex" title="'+((ATK_TIP[n]||'').replace(/"/g,''))+'" style="'+(lv>=need?'':'opacity:.45')+'">'+(ATK_NAME[n]||n)+'<i>'+tag+'</i></span>';
   box.insertAdjacentHTML('beforeend',mk(ex[0],'어려움+',2)+mk(ex[1],'익스트림',3))}}}catch(e){}return r}}
}catch(e){console.error('v52 ch7 hard',e)}})();
