/* ================= v49 챕터 7 REVERSE 공격 패턴 40종 (보스당 4개) · 메아리 기믹 · 거울 전장 · 전투 시작/끝 =================
   공격은 보스 그림의 실제 부위(열쇠 창·깃털 눈·물의 손·홀·불꽃·발레리나·지붕·조종 막대·입·검)에서 나온다. 모두 예고가 먼저.
   메아리: 공격이 한 박자 뒤 좌우가 뒤집혀(경기장 가운데를 기준으로 거울처럼) 보라색으로 한 번 더 온다.
   첫 공격을 피한 자리가 메아리에 맞지 않는지 생각해서 움직여야 한다. */
(function(){try{
 const L7=window.S7ART;if(!L7)return;
 const tel=()=>n4T(),spd=()=>n4S(),ph=()=>G.phase||0,CX=AX+AW/2,CY=AY+AH/2;
 const POS={};{const _md=monDraw;monDraw=function(key,c,B,x,y,t,o,u){const r=_md.apply(this,arguments);if(key&&key.indexOf('c_s7_')===0&&typeof ctx!=='undefined'&&c===ctx)POS[key]={x,y,u:(u||U)*(MON.scl[key]||1)};return r}}
 const P7=(ax,ay)=>{try{const p=POS['c_'+L7[G.s7].art];if(p)return [p.x+ax*p.u,p.y+ay*p.u]}catch(e){}const g=bgeo();return [g.x+ax*U*.6,g.y+ay*U*.6]};
 const toP=(x,y)=>Math.atan2(P.y-y,P.x-x);
 const shot=(T0,x,y,a,v,o)=>npShot(T0,T0+tel(),x,y,a,v*spd(),Object.assign({r:5,rayL:46,chg:false,dmg:10},o||{}));
 const circ=(T0,x,y,r,col,o)=>{const [cx,cy]=npIn(x,y,r*.6);return NP(Object.assign({k:'circ',x:cx,y:cy,r,t0:T0,t1:T0+tel(),t2:T0+tel()+.4,col,dmg:12},o||{}))};
 const seg=(T0,ax,ay,bx,by,col,w,hold,dmg,o)=>NP(Object.assign({k:'seg',sty:'laser',col,w,t0:T0,t1:T0+tel(),t2:T0+tel()+hold,a:()=>[ax,ay],b:()=>[bx,by],dmg:dmg||12},o||{}));
 const rect=(T0,x,y,w,h,col,sty,hold,dmg,o)=>NP(Object.assign({k:'rect',x,y,w,h,sty:sty||'light',col,t0:T0,t1:T0+tel(),t2:T0+tel()+(hold||.3),dmg:dmg||11},o||{}));
 const snd=(T,f,l,w,v,f2)=>sch(T,()=>{try{sfx(f,l||.15,w||'square',v||.05,f2||f*.5)}catch(e){}});
 const shake=(T,v)=>sch(T,()=>{G.shake=Math.max(G.shake||0,v)});
 const gapRing=(T0,x,y,n,gap,gw,v,o)=>{for(let i=0;i<n;i++){const a=i*TAU/n;if(Math.abs(((a-gap+Math.PI*3)%TAU)-Math.PI)<gw)continue;shot(T0,x,y,a,v,o)}};
 /* ---------- 메아리: f(T, mx(x), ma(각도), 색, 메아리인지) 를 두 번 — 두 번째는 1박자 뒤, 좌우 반전, 보라 ---------- */
 const EV='#c89aff',mxN=x=>x,maN=a=>a,mxM=x=>2*CX-x,maM=a=>Math.PI-a;
 const echo=(T0,col,f,delay)=>{const d=delay==null?1:delay;sch(T0,()=>f(T0,mxN,maN,col,false));sch(T0+d,()=>{f(T0+d,mxM,maM,EV,true);try{G.s7echo={t:T0+d}}catch(e){}});snd(T0+d+tel(),660,.18,'triangle',.04,330)};
 const RB=['#ff4a5a','#ff9a3a','#ffe04a','#4ae08a','#3aa8ff','#6a5aff','#c85aff'];
 const D=(n,kr,ch,est,tip,fn)=>defPat(n,kr,ch,est,tip,fn);

 /* 1 거울문 수문장 */
 D('s7GateKey','열쇠 찌르기','hands',11,'열쇠 창이 나를 찌르고 한 박자 뒤 반대편에서 메아리가 찌름 → 두 선이 겹치지 않는 곳으로',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.8;echo(T0,'#ffd27a',(T,mx,ma,col)=>{const [x,y]=P7(20,-49),sx=mx(x),a=toP(sx,y);seg(T,sx,y,sx+Math.cos(a)*560,y+Math.sin(a)*560,col,9,.3,13)});shake(T0+tel(),.25)}
  return n*1.8+1+tel()+.5});
 D('s7GateMirror','거울 면 반사','head',11,'거울 면에서 고리 탄이 퍼지고, 메아리는 틈이 반대쪽 → 두 틈을 차례로 지나',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.6,gap=RND()*TAU;echo(T0,'#5af0e0',(T,mx,ma,col)=>{const [x,y]=P7(0,-26);gapRing(T,mx(x),y,20,ma(gap),.5,58,{sty:'crystal',col,r:4})})}
  return n*1.6+1+tel()+1.6});
 D('s7GateClose','닫히는 문','field',12,'양옆에서 문짝이 닫혀 오며 가운데만 열림 → 열린 틈으로, 메아리는 틈 위치가 바뀜',t=>{const n=1+ph();
  for(let k=0;k<n;k++){const T0=t+k*2.6,gx=AX+60+RND()*(AW-120);echo(T0,'#8492b0',(T,mx,ma,col)=>{const g=mx(gx);rect(T,AX,AY,g-26-AX,AH,col,'light',.35,13);rect(T,g+26,AY,AX+AW-g-26,AH,col,'light',.35,13)},1.2);shake(T0+tel(),.3)}
  return n*2.6+1.2+tel()+.6});
 D('s7GateClock','13시의 종','head',12,'문장 시계에서 열세 바늘이 거꾸로 돎 → 바늘 사이를 따라 반대로 돌아',t=>{const dur=3+ph()*.6;
  sch(t,()=>{const [x,y]=P7(0,-51);for(let i=0;i<13;i++){const a0=i*TAU/13;NP({k:'seg',sty:'laser',col:i===12?'#ff7ad0':'#c4d0e4',w:4,live:true,t0:t,t1:t+tel(),t2:t+tel()+dur,a:()=>[x,y],b:b=>{const a=a0-Math.max(0,b-t-tel())*.55*spd();return [x+Math.cos(a)*420,y+Math.sin(a)*420]},dmg:11})}});snd(t+tel(),392,.8,'triangle',.05,392);
  return tel()+dur+.3});
 /* 2 유리 공작 */
 const fanEye=(i,n)=>{const a=Math.PI+(.12+i*(.76/(n-1)))*Math.PI,L=29;return P7(Math.cos(a)*L,-14+Math.sin(a)*L*.95)};
 D('s7PeaFan','부채 눈빛','head',11,'꼬리 깃털 눈이 차례로 나를 쏘고, 메아리는 반대쪽 눈부터 → 계속 옆으로 움직여',t=>{const n=7+ph()*2;
  for(let i=0;i<n;i++){const T0=t+i*.32;echo(T0,'#7af0d0',(T,mx,ma,col)=>{const [x,y]=fanEye(i%13,13),sx=mx(x);shot(T,sx,y,toP(sx,y),80,{sty:'light',col,r:4})})}
  return n*.32+1+tel()+1.2});
 D('s7PeaGaze','백 개의 눈','field',11,'바닥에 거울 눈이 뜨고 터짐 → 눈이 뜨기 전에 벗어나, 메아리는 반대편에',t=>{const n=4+ph();
  for(let k=0;k<n;k++){const T0=t+k*.9,px=P.x,py=P.y;echo(T0,'#7af0d0',(T,mx,ma,col)=>{circ(T,mx(px),py,18,col,{label:'◉'})},.6)}
  return n*.9+.6+tel()+.6});
 D('s7PeaFeather','깃털 칼비','field',11,'유리 깃털이 비스듬히 쏟아지고, 메아리는 반대 방향으로 → 엇갈리는 비 사이로',t=>{const n=10+ph()*3;
  for(let i=0;i<n;i++){const T0=t+i*.22,x0=AX+(i*53)%AW;echo(T0,'#b8fff6',(T,mx,ma,col)=>{shot(T,mx(x0),AY+2,ma(Math.PI/2-.45),82,{sty:'light',col,r:4,rayL:30})},1.4)}
  return n*.22+1.4+tel()+1.6});
 D('s7PeaSpin','공작 회전','all',12,'꼬리 깃털이 레이저가 되어 돎 → 깃털 사이 틈을 따라',t=>{const dur=3+ph()*.6;
  sch(t,()=>{const [x,y]=P7(0,-14);for(let i=0;i<7;i++){const a0=Math.PI+i*Math.PI/6;NP({k:'seg',sty:'laser',col:'#7af0d0',w:5,live:true,t0:t,t1:t+tel(),t2:t+tel()+dur,a:()=>[x,y],b:b=>{const a=a0+Math.max(0,b-t-tel())*.5*spd();return [x+Math.cos(a)*420,y+Math.sin(a)*420]},dmg:11})}});
  return tel()+dur+.3});
 /* 3 역류의 분수 */
 D('s7FountUp','역류 기둥','field',11,'바닥에서 물기둥이 위로 솟음 → 빈 칸으로, 메아리 기둥은 좌우가 뒤집힘',t=>{const n=3+ph(),cols=8,cw=AW/cols;
  for(let k=0;k<n;k++){const T0=t+k*1.5,gap=Math.floor(RND()*cols),gap2=(gap+3+Math.floor(RND()*3))%cols;echo(T0,'#7ad8ff',(T,mx,ma,col,m)=>{for(let c=0;c<cols;c++){if(c===gap||c===gap2)continue;if((c+k)%2)continue;const x=AX+c*cw+3;rect(T,m?2*CX-x-(cw-6):x,AY,cw-6,AH,col,'ice',.3,11)}},.75)}
  return n*1.5+.75+tel()+.5});
 D('s7FountArc','물줄기 포물선','hands',11,'물의 손에서 물덩이가 포물선으로 날아와 터짐 → 떨어질 자리를 보고 비켜',t=>{const n=4+ph();
  for(let k=0;k<n;k++){const T0=t+k*.8,s=k%2?1:-1,tx=P.x,ty=P.y;sch(T0,()=>{const [x,y]=P7(s*19,-30);const c=circ(T0,tx,ty,16,'#7ad8ff',{label:'◌'});NP({k:'orb',sty:'bubble',col:'#e0faff',r:4,harm:false,noTel:true,t0:T0,t1:T0,t2:T0+tel(),pos:b=>{const q=Math.min(1,(b-T0)/tel());return [x+(c.x-x)*q,y+(c.y-y)*q-Math.sin(q*Math.PI)*60]}})})}
  return n*.8+tel()+.6});
 D('s7FountRain','거꾸로 비','field',10,'빗방울이 바닥에서 하늘로 떨어짐 → 아래에서 오는 줄을 피해',t=>{const n=14+ph()*4;
  for(let i=0;i<n;i++){const T0=t+i*.2;sch(T0,()=>{const x=i%4===3?P.x+(RND()-.5)*20:AX+10+RND()*(AW-20);shot(T0,x,AY+AH-2,-Math.PI/2,90,{sty:'bubble',col:'#8ae0ff',r:4,rayL:30})})}
  return n*.2+tel()+2});
 D('s7FountWave','수면 물결','all',12,'수면이 아래에서 위로 차오르며 지나감 → 뚫린 칸에 서서 기다려',t=>{const n=2+ph(),cols=7,cw=AW/cols;
  for(let k=0;k<n;k++){const T0=t+k*2.2,gap=Math.floor(RND()*cols);sch(T0,()=>{for(let c=0;c<cols;c++){if(c===gap)continue;NP({k:'rect',x:AX+c*cw+1,y:AY+AH-14,w:cw-2,h:14,sty:'ice',col:'#5ac8f0',t0:T0,t1:T0+tel(),t2:T0+tel()+2.4,live:true,step:(o,b)=>{if(b>=o.t1)o.y=AY+AH-14-(b-o.t1)*105*spd()},dmg:11})}})}
  return n*2.2+tel()+2.6});
 /* 4 흑백 체스 왕 */
 D('s7ChessRook','룩 돌진','field',11,'룩처럼 가로·세로 줄이 통째로 밀려옴 → 비어 있는 줄로, 메아리는 반대 줄',t=>{const n=3+ph(),rows=5,cols=8,rh=AH/rows,cw=AW/cols;
  for(let k=0;k<n;k++){const T0=t+k*1.4;if(k%2===0){const r=Math.floor(RND()*rows);echo(T0,'#f2f6ff',(T,mx,ma,col)=>{for(let j=0;j<rows;j++){if(j===r||j===(r+2)%rows)continue;rect(T,AX,AY+j*rh+3,AW,rh-6,col,'light',.3,11)}},.7)}
   else{const c0=Math.floor(RND()*cols);echo(T0,'#f2f6ff',(T,mx,ma,col,m)=>{for(let c=0;c<cols;c+=2){const cc=(c+c0)%cols,x=AX+cc*cw+3;rect(T,m?2*CX-x-(cw-6):x,AY,cw-6,AH,col,'light',.3,11)}},.7)}}
  return n*1.4+.7+tel()+.5});
 D('s7ChessBishop','비숍 대각선','field',11,'나를 지나는 대각선 두 줄 → 대각선 밖으로, 메아리는 반대로 기운 대각선',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.2,px=P.x,py=P.y;echo(T0,'#e8ecf4',(T,mx,ma,col)=>{for(const s of [-1,1]){const x=mx(px);seg(T,x-300,py-300*s,x+300,py+300*s,col,6,.3,12)}},.6)}
  return n*1.2+.6+tel()+.5});
 D('s7ChessKnight','나이트 점프','all',11,'나이트가 L자로 뛰어 내 자리를 찍음 → 다음 L자 칸을 예상해 피해',t=>{const n=4+ph(),L=[[2,1],[1,2],[-1,2],[-2,1],[-2,-1],[-1,-2],[1,-2],[2,-1]],u=24;
  let x=P.x,y=P.y;for(let k=0;k<n;k++){const T0=t+k*.7;const [dx,dy]=L[Math.floor(RND()*8)];const tx=clamp(k?x+dx*u:P.x,AX+20,AX+AW-20),ty=clamp(k?y+dy*u:P.y,AY+20,AY+AH-20);x=tx;y=ty;circ(T0,tx,ty,18,k%2?'#16161e':'#e8ecf4',{label:'♞',t2:T0+tel()+.25});shake(T0+tel(),.18)}
  return n*.7+tel()+.6});
 D('s7ChessCheck','체크메이트','head',12,'체스판 칸이 흑·백 번갈아 터짐 → 다음에 터질 색을 보고 반대 색 칸으로',t=>{const n=2+ph(),cols=8,rows=5,cw=AW/cols,rh=AH/rows;
  for(let k=0;k<n*2;k++){const T0=t+k*.9,par=k%2;sch(T0,()=>{for(let c=0;c<cols;c++)for(let r=0;r<rows;r++)if((c+r)%2===par)rect(T0,AX+c*cw+2,AY+r*rh+2,cw-4,rh-4,par?'#16161e':'#e8ecf4','light',.25,11)})}
  return n*1.8+tel()+.5});
 /* 5 거꾸로 타는 초 */
 D('s7CandleDrip','촛농 불비','field',11,'청록 불방울이 떨어지고, 메아리 불방울은 바닥에서 위로 → 위아래를 다 살펴',t=>{const n=10+ph()*3;
  for(let i=0;i<n;i++){const T0=t+i*.26,x=AX+12+((i*67)%(AW-24));echo(T0,'#5af0e0',(T,mx,ma,col,m)=>{shot(T,mx(x),m?AY+AH-2:AY+2,m?-Math.PI/2:Math.PI/2,74,{sty:'fire',col,r:4,rayL:28})},1.2)}
  return n*.26+1.2+tel()+2});
 D('s7CandleFlame','거꾸로 불꽃','head',11,'초 불꽃에서 거꾸로 된 불기둥이 나를 향해 → 불기둥 옆으로',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.4;echo(T0,'#5af0e0',(T,mx,ma,col)=>{const [x,y]=P7(0,-44),sx=mx(x),a=toP(sx,y);seg(T,sx,y,sx+Math.cos(a)*560,y+Math.sin(a)*560,col,14,.35,14)},.8);snd(T0+tel(),180,.4,'sawtooth',.05,90)}
  return n*1.4+.8+tel()+.6});
 D('s7CandleWick','심지 줄','hands',11,'양옆 초에서 불꽃 줄이 가로로 쓸고 지나감 → 줄이 지나간 뒤 그 자리로',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.8,s=k%2?1:-1;sch(T0,()=>{const [x,y]=P7(s*11,-24);NP({k:'seg',sty:'laser',col:'#5af0e0',w:7,live:true,t0:T0,t1:T0+tel(),t2:T0+tel()+1.2,a:()=>[x,y],b:b=>{const q=clamp((b-T0-tel())/1.2,0,1),a=(s<0?Math.PI*.15:Math.PI*.85)+s*q*Math.PI*.7;return [x+Math.cos(a)*500,y+Math.sin(a)*500]},dmg:12})})}
  return n*1.8+tel()+1.4});
 D('s7CandleOut','불꽃 고리','all',12,'내 둘레에 촛불 고리가 생기고 좁혀 옴 → 꺼진 틈으로 빠져나가',t=>{const n=2;
  for(let k=0;k<n;k++){const T0=t+k*2.4;sch(T0,()=>{const cx=P.x,cy=P.y,Tg=T0+tel(),gap=RND()*TAU,m=22;for(let i=0;i<m;i++){const a0=i*TAU/m;if(Math.abs(((a0-gap+Math.PI*3)%TAU)-Math.PI)<.5)continue;NP({k:'orb',sty:'fire',col:'#5af0e0',r:5,t0:T0,t1:Tg,t2:Tg+2,noTel:i>2,pos:b=>{const q=Math.max(0,b-Tg),r=Math.max(12,100-q*50*spd());return [cx+Math.cos(a0)*r,cy+Math.sin(a0)*r*.85]},dmg:11})}})}
  return n*2.4+tel()+.4});
 /* 6 오르골 발레리나 */
 D('s7BalletSpin','피루엣','all',12,'발레리나가 돌며 칼날 치마 조각을 나선으로 뿌림 → 나선 바깥으로 같이 돌아',t=>{const dur=3+ph()*.5;
  for(let i=0;i<Math.round(dur*7);i++){const T0=t+i/7;sch(T0,()=>{const [x,y]=P7(0,-30);for(let j=0;j<3;j++)shot(T0,x,y,T0*2.4+j*TAU/3,66,{sty:'crystal',col:'#ffb0d8',r:4,rayL:16})})}
  return dur+tel()+1.6});
 D('s7BalletLeap','그랑 주테','all',11,'발레리나가 뛰어올라 내 자리에 착지, 칼날 고리가 퍼짐 → 원 밖으로, 고리 틈으로',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.6;sch(T0,()=>{const c=circ(T0,P.x,P.y,18,'#ffb0d8',{label:'✦'});sch(T0+tel(),()=>gapRing(T0+tel(),c.x,c.y,14,RND()*TAU,.5,64,{sty:'crystal',col:'#ff7ab8',r:4,noTel:true}))});shake(T0+tel(),.25)}
  return n*1.6+tel()+1.4});
 D('s7BalletNotes','오르골 악보','field',11,'오선 줄을 따라 음표가 흘러가고, 메아리 음표는 반대로 → 빈 줄에 서',t=>{const n=2+ph(),rows=5,rh=AH/(rows+1);
  for(let k=0;k<n;k++){const T0=t+k*2,gap=Math.floor(RND()*rows);echo(T0,'#e0ccff',(T,mx,ma,col,m)=>{for(let r=0;r<rows;r++){if(r===gap)continue;const y=AY+rh*(r+1);for(let j=0;j<3;j++)shot(T+j*.25,m?AX+AW-2:AX+2,y,m?Math.PI:0,92,{sty:'note',col,r:4,rayL:20})}},1)}
  return n*2+1+tel()+2.4});
 D('s7BalletMirror','거울 무대','head',12,'뚜껑 거울에서 빛이 나를 향해 쏘고, 벽에 반사되어 꺾임 → 꺾인 선까지 봐',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.6;sch(T0,()=>{const [x,y]=P7(0,-28),a=toP(x,y),dx=Math.cos(a),dy=Math.sin(a);let tx=(dx>0?AX+AW:AX)-x,ty=(dy>0?AY+AH:AY)-y;const kx=Math.abs(tx/(dx||1e-6)),ky=Math.abs(ty/(dy||1e-6)),kk=Math.min(kx,ky),hx=x+dx*kk,hy=y+dy*kk,rx=kx<ky?-dx:dx,ry=kx<ky?dy:-dy;
   seg(T0,x,y,hx,hy,'#cfd8ec',6,.4,12);seg(T0+.15,hx,hy,hx+rx*500,hy+ry*500,'#ffb0d8',6,.4,12)})}
  return n*1.6+tel()+.8});
 /* 7 뒤집힌 회전목마 */
 D('s7CarHorse','목마 돌진','all',11,'목마들이 둘레를 돌다가 하나씩 나를 향해 돌진 → 돌진 순서를 보고 비켜',t=>{const n=6+ph(),Tg=t+tel();
  sch(t,()=>{const [cx,cy]=P7(0,-26),o7={};for(let i=0;i<n;i++){const a0=i*TAU/n,Tf=Tg+i*.4;NP({k:'orb',sty:'bob',col:'#f2e8ff',r:7,t0:t,t1:Tg,t2:Tf+2.4,noTel:true,pos:b=>{const q=Math.max(0,b-t);if(b<Tf)return [cx+Math.cos(a0-q*1.4)*50,cy+Math.sin(a0-q*1.4)*22];const o=o7[i]||(o7[i]=(()=>{const x=cx+Math.cos(a0-(Tf-t)*1.4)*50,y=cy+Math.sin(a0-(Tf-t)*1.4)*22;return {x,y,a:toP(x,y)}})());const s=(b-Tf)*130*spd();return [o.x+Math.cos(o.a)*s,o.y+Math.sin(o.a)*s]},dmg:11})}});
  return tel()+n*.4+2.4});
 D('s7CarRing','회전 고리','field',12,'전구 고리가 경기장 가운데를 돌며 넓어짐 → 고리 틈이 올 때 통과',t=>{const dur=4;
  sch(t,()=>{for(let r=0;r<3;r++)for(let i=0;i<12;i++){if(i===r*4||i===r*4+1)continue;const a0=i*TAU/12,dir=r%2?-1:1;NP({k:'orb',sty:'light',col:r%2?'#ffd27a':'#ff7ad0',r:5,t0:t,t1:t+tel(),t2:t+tel()+dur,noTel:true,pos:b=>{const q=Math.max(0,b-t-tel()),rr=20+r*16+q*30*spd();return [CX+Math.cos(a0+dir*q*.8)*rr,CY+Math.sin(a0+dir*q*.8)*rr*.7]},dmg:10})}});
  return tel()+dur+.3});
 D('s7CarLights','전구 깜빡','field',11,'바닥 전구가 두 무리로 번갈아 켜짐 → 꺼진 전구 위로 옮겨',t=>{const n=2+ph(),cols=7,rows=4,cw=AW/cols,rh=AH/rows;
  for(let k=0;k<n*2;k++){const T0=t+k*.85,par=k%2;sch(T0,()=>{for(let c=0;c<cols;c++)for(let r=0;r<rows;r++)if(((c*3+r)%2)===par)circ(T0,AX+cw*(c+.5),AY+rh*(r+.5),Math.min(cw,rh)*.42,par?'#ffd27a':'#ff7ad0',{t2:T0+tel()+.25})})}
  return n*1.7+tel()+.5});
 D('s7CarFlag','거꾸로 깃발','head',11,'지붕에서 아래로 향한 깃발이 세로로 꽂힘 → 꽂히는 줄을 피하고, 메아리는 반대편',t=>{const n=5+ph()*2;
  for(let i=0;i<n;i++){const T0=t+i*.45,x=i%3===2?P.x:AX+20+RND()*(AW-40);echo(T0,'#ff7ad0',(T,mx,ma,col)=>{rect(T,mx(x)-9,AY,18,AH,col,'light',.25,12)},.9)}
  return n*.45+.9+tel()+.5});
 /* 8 그림자 인형사 */
 D('s7PupString','끊어지는 실','hands',11,'조종 막대에서 내려온 실이 세로로 그어지며 따라옴 → 실과 실 사이로',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.2;echo(T0,'#c4d0e4',(T,mx,ma,col)=>{for(const s of [-1,1]){const [x]=P7(s*12,-50),sx=mx(x)+(P.x-mx(x))*.5;seg(T,sx,AY,sx,AY+AH,col,4,.3,11)}},.7)}
  return n*1.2+.7+tel()+.5});
 D('s7PupDoll','꼭두각시 습격','all',12,'그림자 인형들이 나를 따라오다 터짐 → 계속 움직여 따돌려',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*.9;sch(T0,()=>{const [sx,sy]=P7(k%2?20:-20,-18);let x=sx,y=sy,lb=T0;NP({k:'orb',sty:'bob',col:'#3e3058',r:6,t0:T0,t1:T0+tel(),t2:T0+tel()+2.2,pos:b=>{const dt=Math.max(0,b-lb);lb=b;if(b>T0+tel()){const a=toP(x,y);x+=Math.cos(a)*dt*55*spd();y+=Math.sin(a)*dt*55*spd()}return [x,y]},dmg:11});sch(T0+tel()+2.2,()=>gapRing(T0+tel()+2.2,x,y,10,RND()*TAU,.6,60,{sty:'light',col:'#b48aff',r:4,noTel:true}))})}
  return n*.9+tel()+3.2});
 D('s7PupMask','가면 웃음','head',11,'가면이 웃으며 부채꼴로 탄을 뿜고, 메아리는 반대로 기운 부채 → 두 부채 사이로',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.1,off=(RND()-.5)*.4;echo(T0,'#f2eef8',(T,mx,ma,col)=>{const [x,y]=P7(0,-39),sx=mx(x),a0=ma(toP(x,y)+off);for(let i=-3;i<=3;i++)shot(T,sx,y,a0+i*.17,70,{sty:'light',col,r:4})},.8)}
  return n*1.1+.8+tel()+1.6});
 D('s7PupWeb','실 그물','field',12,'실이 X자 그물로 걸림 → 그물코가 비어 있는 칸으로',t=>{const n=2+ph(),sq=Math.SQRT2;
  for(let k=0;k<n;k++){const T0=t+k*1.6;sch(T0,()=>{const sx=AX+50+RND()*(AW-100),sy=AY+40+RND()*(AH-80);for(let c=-AH;c<AW;c+=48){const x0=AX+c;if(Math.abs((sx-x0)-(sy-AY))/sq>26)seg(T0,x0,AY,x0+AH,AY+AH,'#c4d0e4',3,.45,10);const x1=AX+AW-c;if(Math.abs((sx-x1)+(sy-AY))/sq>26)seg(T0,x1,AY,x1-AH,AY+AH,'#b48aff',3,.45,10)}})}
  return n*1.6+tel()+.7});
 /* 9 반사룡 */
 D('s7DragonBreath','반사 숨결','head',12,'입에서 빛줄기가 쓸고 지나간 뒤 메아리 숨결이 반대로 쓸어옴 → 두 번째 숨결 방향을 기억해',t=>{const n=1+Math.min(1,ph());
  for(let k=0;k<n;k++){const T0=t+k*2.8;echo(T0,'#8af0ff',(T,mx,ma,col,m)=>{const [x,y]=P7(-19,-40),sx=mx(x);NP({k:'seg',sty:'laser',col,w:10,live:true,t0:T,t1:T+tel(),t2:T+tel()+1.2,a:()=>[sx,y],b:b=>{const q=clamp((b-T-tel())/1.2,0,1),a=ma(Math.PI*(.85-q*.7));return [sx+Math.cos(a)*500,y+Math.sin(a)*500]},dmg:13})},1.2)}
  return n*2.8+1.2+tel()+1.4});
 D('s7DragonWing','날개 거울판','field',11,'날개에서 거울판이 떨어져 세로로 꽂힘 → 판 사이로, 메아리는 반대편',t=>{const n=6+ph()*2;
  for(let i=0;i<n;i++){const T0=t+i*.4,x=AX+20+((i*71)%(AW-40));echo(T0,'#c8dcf0',(T,mx,ma,col)=>{rect(T,mx(x)-12,AY,24,AH,col,'ice',.3,12)},1)}
  return n*.4+1+tel()+.5});
 D('s7DragonDive','급강하','all',12,'용이 화면을 가로질러 급강하 → 굵은 선 밖으로',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.6;sch(T0,()=>{const s=RND()<.5?-1:1,y0=AY+20+RND()*40,x0=s<0?AX:AX+AW,a=Math.atan2(P.y-y0,P.x-x0);seg(T0,x0,y0,x0+Math.cos(a)*600,y0+Math.sin(a)*600,'#8af0ff',22,.3,15)});shake(T0+tel(),.4);snd(T0+tel(),120,.4,'sawtooth',.06,60)}
  return n*1.6+tel()+.5});
 D('s7DragonPrism','반사 결정','all',11,'결정이 벽에 부딪히면 반사되어 튕겨 옴 → 튕기는 각도를 읽어',t=>{const n=6+ph()*2;
  sch(t,()=>{const [x,y]=P7(-19,-40);for(let i=0;i<n;i++){const a=toP(x,y)+(i-(n-1)/2)*.25,Tg=t+tel();NP({k:'orb',sty:'crystal',col:'#8af0ff',r:5,t0:t,t1:Tg,t2:Tg+4,ray:a,rayL:30,noTel:i>0,pos:b=>{const d=Math.max(0,b-Tg)*80*spd();let px=x+Math.cos(a)*d,py=y+Math.sin(a)*d;const w=AW,h=AH;let rx=((px-AX)%(2*w)+2*w)%(2*w),ry=((py-AY)%(2*h)+2*h)%(2*h);if(rx>w)rx=2*w-rx;if(ry>h)ry=2*h-ry;return [AX+rx,AY+ry]},dmg:10})}});
  return tel()+4.2});
 /* 10 거울 하루 */
 D('s7HaruSlash','거울 베기','hands',12,'대검이 크게 휘둘러지고, 한 박자 뒤 거울처럼 반대로 휘둘러짐 → 두 번째 칼이 오는 쪽을 봐',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*2,dir=k%2?-1:1;echo(T0,'#e0ccff',(T,mx,ma,col,m)=>{const [x,y]=P7(-11,-22),sx=mx(x);NP({k:'seg',sty:'laser',col,w:14,live:true,t0:T,t1:T+tel(),t2:T+tel()+.5,a:()=>[sx,y],b:b=>{const q=clamp((b-T-tel())/.5,0,1),a=ma(-Math.PI/2+dir*(.2+q*2.6));return [sx+Math.cos(a)*420,y+Math.sin(a)*420]},dmg:15})},1);shake(T0+tel()+.25,.4)}
  return n*2+1+tel()+.6});
 D('s7HaruShards','조각 날개','all',11,'날개 조각들이 하나씩 떨어져 나를 향해 날아옴 → 날아오는 순서대로 비켜',t=>{const n=10+ph()*2;
  sch(t,()=>{for(let i=0;i<n;i++){const s=i%2?1:-1,k=Math.floor(i/2),Tf=t+tel()+i*.22;const [x,y]=P7(s*(14+k*2.4),-36+k*2);let o=null;NP({k:'orb',sty:'crystal',col:'#e8f4ff',r:5,t0:t,t1:t+tel(),t2:Tf+2.6,noTel:i>1,pos:b=>{if(b<Tf)return [x,y+Math.sin(b*4+i)*2];if(!o)o={a:toP(x,y)};const d=(b-Tf)*120*spd();return [x+Math.cos(o.a)*d,y+Math.sin(o.a)*d]},dmg:10})}});
  return tel()+n*.22+2.6});
 D('s7HaruHalo','시곗바늘 후광','head',12,'머리 뒤 시곗바늘이 길게 뻗어 거꾸로 돎 → 바늘 사이를 따라 반대로',t=>{const dur=3.4+ph()*.5;
  sch(t,()=>{const [x,y]=P7(0,-43);for(let i=0;i<4;i++){const a0=i*TAU/4;NP({k:'seg',sty:'laser',col:i%2?'#b48aff':'#e0ccff',w:6,live:true,t0:t,t1:t+tel(),t2:t+tel()+dur,a:()=>[x,y],b:b=>{const a=a0-Math.max(0,b-t-tel())*.7*spd();return [x+Math.cos(a)*460,y+Math.sin(a)*460]},dmg:12})}});
  return tel()+dur+.3});
 D('s7HaruMirror','반대편의 나','all',13,'경기장 반대편에 거울 속 내가 나타나 내 움직임을 거꾸로 따라 하며 보라 불꽃을 쏨 → 거울 하루와 마주 보지 않게 움직여',t=>{const dur=4+ph()*.6;
  sch(t,()=>{NP({k:'orb',sty:'bob',col:'#b48aff',r:8,t0:t,t1:t+tel(),t2:t+tel()+dur,prev:.6,pos:()=>[2*CX-P.x,P.y],dmg:13})});
  for(let i=0;i<Math.round(dur/.6);i++){const T0=t+tel()*.5+i*.6;sch(T0,()=>{const x=2*CX-P.x,y=P.y;shot(T0,x,y,toP(x,y),78,{sty:'fire',col:'#ff7ad0',r:4})})}
  return tel()+dur+.6});

 /* ---------- 보스별 공격 목록 (대표 기술 · 기본 · 2페이즈 · 3페이즈) ---------- */
 const DK={s7_gate:['s7GateKey','s7GateMirror','s7GateClose','s7GateClock'],s7_peacock:['s7PeaFan','s7PeaGaze','s7PeaFeather','s7PeaSpin'],s7_fountain:['s7FountUp','s7FountArc','s7FountRain','s7FountWave'],
  s7_chess:['s7ChessRook','s7ChessBishop','s7ChessKnight','s7ChessCheck'],s7_candle:['s7CandleDrip','s7CandleFlame','s7CandleWick','s7CandleOut'],s7_ballet:['s7BalletSpin','s7BalletLeap','s7BalletNotes','s7BalletMirror'],
  s7_carousel:['s7CarHorse','s7CarRing','s7CarLights','s7CarFlag'],s7_puppet:['s7PupString','s7PupDoll','s7PupMask','s7PupWeb'],s7_dragon:['s7DragonBreath','s7DragonWing','s7DragonDive','s7DragonPrism'],s7_mharu:['s7HaruSlash','s7HaruShards','s7HaruHalo','s7HaruMirror']};
 window.S7DECK=DK;
 for(const b of L7){const d=DK[b.art];C3BOSS[b.art].deck=[[d[0],4,0,'S'],[d[1],3,0],[d[2],3,1],[d[3],3,2]]}

 /* ---------- 거울 전장: 은빛 체크 바닥 + 반사광 + 테두리 거울 조각 ---------- */
 const AC={};
 function mirrorArena(k){if(AC[k])return AC[k];const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d'),B=L7[k],t3=k>=7,t2=k>=3&&k<7;
  const sky=g.createLinearGradient(0,0,0,H);sky.addColorStop(0,t3?'#0c0a1c':t2?'#16122a':'#141c2c');sky.addColorStop(1,t3?'#1c1438':t2?'#2a1e40':'#22304a');g.fillStyle=sky;g.fillRect(0,0,W,H);
  /* 멀리 뒤집힌 시계골 실루엣 (위에서 아래로 매달림) */g.fillStyle=t3?'#241c40':'#2a3450';const r=rng(hash('s7'+k));let x=0;while(x<W){const bw=14+Math.floor(r()*24),bh=8+Math.floor(r()*22);g.fillRect(x,0,bw,AY+bh*.5);if(r()<.4)g.fillRect(x+bw/2-2,AY+bh*.5,4,6);x+=bw}
  /* 체크 바닥 */for(let i=0;i<14;i++)for(let j=0;j<8;j++){const xx=AX+i*(AW/14),yy=AY+j*(AH/8);g.fillStyle=(i+j)%2?(t3?'#2a2244':'#3a4462'):(t3?'#3a3260':'#56628a');g.fillRect(xx,yy,AW/14+1,AH/8+1)}
  const sh=g.createLinearGradient(AX,AY,AX+AW,AY+AH);sh.addColorStop(0,'rgba(255,255,255,.12)');sh.addColorStop(.5,'rgba(255,255,255,0)');sh.addColorStop(1,'rgba(180,140,255,.1)');g.fillStyle=sh;g.fillRect(AX,AY,AW,AH);
  /* 대각 반사광 */g.globalAlpha=.08;g.fillStyle='#ffffff';for(let i=0;i<4;i++){g.beginPath();g.moveTo(AX+i*130,AY);g.lineTo(AX+i*130+40,AY);g.lineTo(AX+i*130-60,AY+AH);g.lineTo(AX+i*130-100,AY+AH);g.fill()}g.globalAlpha=1;
  /* 테두리 */g.strokeStyle=B.c;g.globalAlpha=.4;g.lineWidth=2;g.strokeRect(AX+1,AY+1,AW-2,AH-2);g.globalAlpha=1;
  AC[k]=c;return c}
 window.s7MirrorArena=mirrorArena;
 {const _ac=arenaCanvas;arenaCanvas=function(bi){if(typeof G!=='undefined'&&G&&G.s7!=null)return mirrorArena(G.s7);return _ac.apply(this,arguments)}}
 {const _aa=arenaAnim;arenaAnim=function(bi,now,beat){if(typeof G!=='undefined'&&G&&G.s7!=null){const t=now/1000;for(let i=0;i<8;i++){const q=((t*.08)+i/8)%1,x=AX+q*(AW+120)-60,y=AY+((i*37)%AH);RA(Math.round(x),y,2,2,'#e0ccff',.25*Math.sin(q*Math.PI))}
   /* 메아리 직후 화면 가장자리 보라 번쩍 */try{const e=G.s7echo;if(e){const d=G.beat-(e.t+n4T());if(d>=0&&d<.35){const a=(1-d/.35)*.25;RA(AX,AY,AW,3,'#c89aff',a);RA(AX,AY+AH-3,AW,3,'#c89aff',a);RA(AX,AY,3,AH,'#c89aff',a);RA(AX+AW-3,AY,3,AH,'#c89aff',a)}}}catch(e){}return}return _aa.apply(this,arguments)}}
 {const _cp=c3PaintArena;c3PaintArena=function(c,art){const k=L7.findIndex(b=>b.art===art);if(k<0)return _cp.apply(this,arguments);c.drawImage(mirrorArena(k),0,0)}}

 /* ---------- 전투 시작 · 끝 ---------- */
 window.s7Hp=k=>Math.round((11200+k*750)*({easy:.7,normal:1,hard:1.3,extreme:1.55}[diff]||1));
 window.s7Fight=function(k,how){const B7=L7[k];if(!B7)return;const ST=window.S7STORY&&S7STORY[k];initAudio();story=false;enterGame();try{CS=null}catch(e){}
  const b={art:B7.art,base:0,name:B7.name,en:B7.en,epi:(ST&&ST.title)||'',phase:(ST&&ST.phase)||[B7.name+'의 거울이 금 간다!','반대편이 깨어난다!'],dying:(ST&&ST.dying)||'…거울이… 맑아진다.'};c3SwapIn(b);startFight(b.base,false);G.s7=k;G.s7How=how||'rush';G.hp=G.maxHp=s7Hp(k);
  $('bossName').textContent=B7.name+'  '+B7.en;$('bvTitle').textContent='BEAT BLADE · CHAPTER 7 · REVERSE '+(k+1)+'/10'};
 function s7End(won){if(G.state==='result')return;G.state='result';G.won=won;stopMusic();const k=G.s7,how=G.s7How||'rush',B7=L7[k],t=Math.round((performance.now()-G.startReal)/1000);c3SwapOut();G.s7=null;G.s7echo=null;
  const rank=G.hits===0?'P':G.hits<=2?'S':G.hits<=4?'A':G.hits<=7?'B':'C';saveData.bestCombo=Math.max(saveData.bestCombo||0,G.maxCombo||0);
  if(how==='demo'){showOverlay('REVERSE · 시연',B7.name,'시연 전투는 기록이 남지 않아요.',[['다시 시연',()=>{$('overlay').hidden=true;s7Fight(k,'demo')},true],['로비로',toLobby,false]]);return}
  if(won){saveData.s7rush=saveData.s7rush||{};const kk=k+'|'+diff,o='PSABC';if(!saveData.s7rush[kk]||o.indexOf(rank)<o.indexOf(saveData.s7rush[kk]))saveData.s7rush[kk]=rank}
  let coins=0;try{coins=awardCoins(won,rank)}catch(e){}saveNow();const acc=G.swings?Math.round(G.onbeat/G.swings*100):0;
  const html='<b style="color:#ffd166">🪙 +'+coins+' 코인</b> (보유 '+(saveData.coins||0)+')<br>반격 성공 '+(G.swings||0)+'회 · 박자 정확도 '+acc+'%<br>최대 콤보 '+(G.maxCombo||0)+' · 피격 '+G.hits+'회 · 시간 '+Math.floor(t/60)+':'+String(t%60).padStart(2,'0')+(won?'<br><b style="font-size:26px;color:'+(rank==='P'?'#fff6cf':'#ffd166')+'">'+(rank==='P'?'★ PERFECT ★':'RANK '+rank)+'</b>':'<br>보스 체력 '+Math.round(G.hp/G.maxHp*100)+'% 남음');
  if(how==='story'&&typeof window.s7StoryEnd==='function'){if(window.s7StoryEnd(k,won,rank,coins,html))return}
  const btns=[['다시 도전',()=>{$('overlay').hidden=true;s7Fight(k)},!won]];if(won&&k<9)btns.push(['다음 보스 →',()=>{$('overlay').hidden=true;s7Fight(k+1)},true]);btns.push(['로비로',toLobby,false]);
  showOverlay('REVERSE · '+String(k+1).padStart(2,'0'),won?B7.name+' 격파!':'거울 속에 갇혔다…',html,btns)}
 {const _fe=fightEnd;fightEnd=function(won){if(G&&G.s7!=null){s7End(won);return}return _fe.apply(this,arguments)}}
 {const _tl=toLobby;toLobby=function(){try{if(G&&G.s7!=null){c3SwapOut();G.s7=null}}catch(e){}return _tl.apply(this,arguments)}}
 try{const _tr=tryRevive;tryRevive=function(){if(G&&G.s7!=null)return false;return _tr.apply(this,arguments)}}catch(e){}
}catch(e){console.error('v49 ch7 patterns',e)}})();
