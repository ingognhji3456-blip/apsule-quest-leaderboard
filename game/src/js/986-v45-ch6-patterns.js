/* ================= v45 챕터 6 ZENITH 공격 패턴 40종 (보스당 4개) · 바람 기믹 · 하늘 전장 · 전투 시작/끝 =================
   공격은 보스 그림의 실제 부위(창끝·연줄·입·포문·문자판·파이프·눈·날개…)에서 나온다. 모두 예고가 먼저.
   바람: 화살표로 방향을 예고한 뒤 주인공을 그 방향으로 민다(G.pull을 아주 먼 점으로 써서 한 방향 힘). */
(function(){try{
 const L6=window.S6ART;if(!L6)return;
 const tel=()=>n4T(),spd=()=>n4S(),ph=()=>G.phase||0;
 /* 보스 그림 좌표 → 화면 좌표 (그림이 그려진 실제 위치 기록) */
 const POS={};{const _md=monDraw;monDraw=function(key,c,B,x,y,t,o,u){const r=_md.apply(this,arguments);if(key&&key.indexOf('c_s6_')===0&&typeof ctx!=='undefined'&&c===ctx)POS[key]={x,y,u:(u||U)*(MON.scl[key]||1)};return r}}
 const P6=(ax,ay)=>{try{const p=POS['c_'+L6[G.s6].art];if(p)return [p.x+ax*p.u,p.y+ay*p.u]}catch(e){}const g=bgeo();return [g.x+ax*U*.6,g.y+ay*U*.6]};
 const toP=(x,y)=>Math.atan2(P.y-y,P.x-x);
 const shot=(T0,x,y,a,v,o)=>npShot(T0,T0+tel(),x,y,a,v*spd(),Object.assign({r:5,rayL:46,chg:false,dmg:10},o||{}));
 const circ=(T0,x,y,r,col,o)=>{const [cx,cy]=npIn(x,y,r*.6);return NP(Object.assign({k:'circ',x:cx,y:cy,r,t0:T0,t1:T0+tel(),t2:T0+tel()+.4,col,dmg:12},o||{}))};
 const snd=(T,f,l,w,v,f2)=>sch(T,()=>{try{sfx(f,l||.15,w||'square',v||.05,f2||f*.5)}catch(e){}});
 const shake=(T,v)=>sch(T,()=>{G.shake=Math.max(G.shake||0,v)});
 /* ---------- 바람 ---------- */
 function wind(T0,dur,dx,dy,str){const tl=tel()+.3;sch(T0,()=>{G.s6w={t0:T0,t1:T0+tl,t2:T0+tl+dur,dx,dy};G.pull={x:AX+AW/2+dx*6000,y:AY+AH/2+dy*6000,str:(str||46)*(diff==='easy'?.7:diff==='extreme'?1.25:1),t0:T0+tl,t1:T0+tl+dur,tp:T0+tl,kind:'wind'};try{sfx(220,1.2,'sine',.03,120)}catch(e){}});return tl}
 function drawWind(now,beat){const w=G.s6w;if(!w||beat<w.t0||beat>=w.t2+.2)return;const t=now/1000;
  if(beat<w.t1){/* 예고: 큰 화살표 깜빡임 */const p=(beat-w.t0)/(w.t1-w.t0),bl=Math.floor(now/120)%2,a=Math.atan2(w.dy,w.dx);for(let k=-1;k<=1;k++){const cx=AX+AW/2+Math.cos(a)*k*60,cy=AY+AH/2+Math.sin(a)*k*60;for(let j=0;j<3;j++)cChevron(cx+Math.cos(a)*j*9,cy+Math.sin(a)*j*9,a,bl?'#ffffff':'#bfeaff',.35+.5*p,4)}
   ctx.font='bold 9px '+FONT_STACK;ctx.textAlign='center';ctx.fillStyle='#ffffff';ctx.globalAlpha=.6+.4*p;ctx.fillText('바람 '+(Math.abs(w.dx)>Math.abs(w.dy)?(w.dx>0?'→':'←'):(w.dy>0?'↓':'↑')),AX+AW/2,AY+22);ctx.globalAlpha=1;ctx.textAlign='left';return}
  /* 실제 바람: 흐르는 바람 줄기 */const fade=beat>w.t2?1-(beat-w.t2)/.2:1;for(let i=0;i<26;i++){const q=((t*1.4)+i*.137)%1,len=18+(i%3)*10,x=w.dx?(w.dx>0?AX+q*AW:AX+AW-q*AW):AX+((i*53)%AW),y=w.dy?(w.dy>0?AY+q*AH:AY+AH-q*AH):AY+((i*37)%AH);
   line(x,y,x-w.dx*len,y-w.dy*len,3,(px,py)=>cPx(px,py,1,'#ffffff',.35*fade*Math.sin(q*Math.PI)))}}
 /* ---------- 패턴 ---------- */
 const D=(n,kr,ch,est,tip,fn)=>defPat(n,kr,ch,est,tip,fn);
 /* 1 풍향계 기사 */
 D('s6VaneLance','돌풍 창격','hands',11,'바람이 부는 쪽에서 화살 창이 줄지어 날아옴 → 바람에 밀리지 말고 빈 줄로',t=>{const dir=P.x<HOME.x?1:-1,wl=wind(t,5,dir,0,40),n=4+ph();
  for(let i=0;i<n;i++){const T0=t+wl*.5+i*.9,gap=Math.floor(RND()*5);sch(T0,()=>{for(let r=0;r<5;r++){if(r===gap)continue;const y=AY+30+r*(AH-50)/4,x=dir>0?AX+4:AX+AW-4;shot(T0,x,y,dir>0?0:Math.PI,110,{sty:'light',col:'#5ad0b0',r:6})}});snd(T0+tel(),300,.12,'sawtooth',.04,120)}
  return wl*.5+n*.9+tel()+1});
 D('s6CompassSpin','나침반 회전','hands',10,'방패의 나침반이 돌며 8방향으로 쏨 → 바늘 사이 빈 방향으로',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.1;sch(T0,()=>{const [x,y]=P6(-11,-19),off=k*.2;for(let i=0;i<8;i++)shot(T0,x,y,off+i*TAU/8,70,{sty:'spark',col:'#e0965a',rayL:30})});snd(T0+tel(),660,.08,'square',.04,990)}
  return n*1.1+tel()+1});
 D('s6WeatherTurn','풍향 전환','field',12,'바람이 반대로 바뀌며 회오리 기둥이 행진 → 바뀌는 순간 반대쪽으로 버텨',t=>{const w1=wind(t,2.4,1,0,44);wind(t+w1+2.4,2.4,-1,0,44);
  for(let i=0;i<6;i++){const T0=t+i*.75,x=AX+40+i*(AW-80)/5;circ(T0,x,AY+AH*.5+Math.sin(i)*40,16,'#bfeaff',{label:'⟲',t2:T0+tel()+.8})}
  return w1+5.2});
 D('s6Rooster','수탉의 외침','head',10,'투구 위 수탉이 울면 깃털 고리가 퍼짐 → 고리의 틈으로',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.3;sch(T0,()=>{const [x,y]=P6(0,-48),gap=toP(x,y)+(k%2?Math.PI:0);for(let i=0;i<24;i++){const a=i*TAU/24;if(Math.abs(((a-gap+Math.PI*3)%TAU)-Math.PI)<.45)continue;shot(T0,x,y,a,64,{sty:'light',col:'#ff9a4a',r:4,rayL:20})}});snd(T0+tel(),880,.3,'sawtooth',.04,1320)}
  return n*1.3+tel()+1});
 /* 2 연줄의 거인 */
 D('s6KiteDive','연 급강하','all',11,'하늘의 연이 내 자리를 찍고 내리꽂힘 → 원이 차오르면 벗어나',t=>{const n=6+ph()*2;
  for(let i=0;i<n;i++){const T0=t+i*.45;sch(T0,()=>{const [hx,hy]=P6(i%2?14:-14,-26),x=P.x+(RND()-.5)*30,y=P.y+(RND()-.5)*20;const c=circ(T0,x,y,15,['#ff5a4a','#ffd04a','#4a8aff','#5ad08a'][i%4],{label:'◆'});
   NP({k:'orb',sty:'light',col:'#ffffff',r:4,harm:false,noTel:true,t0:T0+tel()-.5,t1:T0+tel()-.5,t2:T0+tel(),pos:b=>{const q=Math.min(1,(b-(T0+tel()-.5))/.5);return [hx+(c.x-hx)*q,hy+(c.y-hy)*q-Math.sin(q*Math.PI)*40]}})});shake(T0+tel(),.18)}
  return n*.45+tel()+1});
 D('s6StringCut','연줄 가르기','hands',11,'양손의 연줄이 대각선으로 화면을 가름 → 두 줄이 엇갈리는 틈으로',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.4;for(const s of [-1,1]){const [hx,hy]=P6(s*14,-26),off=(k%2?1:-1)*s*60;NP({k:'seg',sty:'laser',col:'#f0e8d8',w:4,t0:T0,t1:T0+tel(),t2:T0+tel()+.6,a:()=>[hx,hy],b:()=>[hx-s*AW*.9,AY+AH+off],dmg:11})}snd(T0+tel(),1200,.12,'triangle',.04,300)}
  return n*1.4+tel()+1});
 D('s6TailRibbon','꼬리 리본','head',11,'머리의 리본 세 줄이 물결치며 내려옴 → 물결 사이로',t=>{const n=3;
  for(let k=0;k<n;k++){const T0=t+k*.5,[x,y]=P6(0,-44),c=['#ff5a4a','#ffd04a','#4a8aff'][k],ph0=k*2.1;for(let i=0;i<10;i++){const tf=T0+tel()+i*.12;NP({k:'orb',sty:'default',col:c,r:5,t0:T0,t1:tf,t2:tf+4,noTel:i>0,ray:Math.PI/2,rayL:40,pos:b=>{const q=Math.max(0,b-tf)*70*spd();return [x+Math.sin(q*.05+ph0)*60,y+q]},dmg:9})}}
  return tel()+4});
 D('s6WindLift','상승 기류','field',11,'아래에서 위로 바람 + 위에서 연이 떨어짐 → 떨어지는 줄을 피해 바람을 이용해',t=>{const wl=wind(t,4,0,-1,34),cols=7,cw=AW/cols;
  for(let k=0;k<3+ph();k++){const T0=t+wl*.6+k*1.1,gap=Math.floor(RND()*cols);sch(T0,()=>{for(let c=0;c<cols;c++){if(c===gap)continue;NP({k:'rect',x:AX+c*cw+2,y:AY,w:cw-4,h:AH,sty:'light',t0:T0,t1:T0+tel(),t2:T0+tel()+.3,col:'#ffd04a',dmg:10})}})}
  return wl*.6+(3+ph())*1.1+tel()+.6});
 /* 3 번개구름 고래 */
 D('s6ThunderRain','번개 비','field',11,'구름 속 번개가 세로 줄로 내리침 → 빛나는 줄을 피해',t=>{const n=5+ph()*2;
  for(let i=0;i<n;i++){const T0=t+i*.5;sch(T0,()=>{const x=i%3===2?P.x-12:AX+20+RND()*(AW-40);NP({k:'rect',x:x-12,y:AY,w:24,h:AH,sty:'elec',t0:T0,t1:T0+tel(),t2:T0+tel()+.25,col:'#ffe25a',dmg:13})});sch(T0+tel(),()=>{G.flash=Math.max(G.flash||0,.12);sfx(70,.3,'sawtooth',.06,40)})}
  return n*.5+tel()+.5});
 D('s6CloudBreath','구름 숨','head',10,'고래 입에서 구름 덩어리가 부채꼴로 → 덩어리 사이 틈으로',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*.9;sch(T0,()=>{const [x,y]=P6(-22,-22),a0=toP(x,y);for(let i=-3;i<=3;i++)shot(T0,x,y,a0+i*.16,58,{sty:'steam',col:'#c8d4e8',r:7})})}
  return n*.9+tel()+1.6});
 D('s6RainCurtain','빗줄기 장막','field',11,'빗줄기 장막이 위에서 내려옴 → 줄마다 뚫린 칸으로',t=>{const n=3+ph(),cols=9,cw=AW/cols;
  for(let k=0;k<n;k++){const T0=t+k*1.4,gap=Math.floor(RND()*cols);sch(T0,()=>{for(let c=0;c<cols;c++){if(c===gap)continue;NP({k:'rect',x:AX+c*cw+1,y:AY,w:cw-2,h:14,t0:T0,t1:T0+tel(),t2:T0+tel()+2.4,col:'#9ad0ff',sty:'ice',dmg:10,live:true,step:(o,b)=>{if(b>=o.t1)o.y=AY+(b-o.t1)*100*spd()}})}})}
  return n*1.4+tel()+2.6});
 D('s6StaticOrbs','정전기 구슬','all',11,'번개 구슬이 나를 둘러싸고 돌다가 바깥으로 튐 → 돌 때 빈 틈으로 빠져나가',t=>{const dur=2.6;
  sch(t,()=>{const cx=P.x,cy=P.y,n=10+ph()*2;for(let i=0;i<n;i++){const a0=i*TAU/n;NP({k:'orb',sty:'spark',col:'#ffe25a',r:5,t0:t,t1:t+tel(),t2:t+tel()+dur,noTel:true,pos:b=>{const q=Math.max(0,b-t),r=70-Math.min(30,q*10)+Math.max(0,b-t-tel()-dur*.6)*120;return [cx+Math.cos(a0+q*.9)*r,cy+Math.sin(a0+q*.9)*r*.8]},dmg:10})}});
  return tel()+dur+.4});
 /* 4 비행선 함장 */
 D('s6Broadside','일제 포격','hands',11,'곤돌라 포문이 세 번 일제 사격 → 포탄 사이 틈으로',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*1;sch(T0,()=>{for(let i=-2;i<=2;i++){const [x,y]=P6(i*3,-14);shot(T0,x,y,Math.PI/2+i*.22+(k%2?.11:0),80,{sty:'coal',col:'#3a2a1a',r:5})}});snd(T0+tel(),90,.25,'square',.06,40);shake(T0+tel(),.2)}
  return n+tel()+1});
 D('s6AnchorDrop','닻 투하','all',11,'내 자리에 닻이 떨어지고 충격파 → 원 밖으로, 충격파는 대시로',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.1;sch(T0,()=>{const c=circ(T0,P.x,P.y,18,'#8a9aac',{label:'⚓'});sch(T0+tel(),()=>{for(let i=0;i<14;i++)npShot(T0+tel(),T0+tel(),c.x,c.y,i*TAU/14,70*spd(),{sty:'default',col:'#8a9aac',r:4,noTel:true,dmg:9})})});shake(T0+tel(),.3)}
  return n*1.1+tel()+1.2});
 D('s6PropWind','프로펠러 바람','field',11,'프로펠러가 강한 바람을 보내며 탄을 실어 보냄 → 바람을 거슬러 빈 줄로',t=>{const dir=P.x<HOME.x?-1:1,wl=wind(t,4,dir,0,56),n=6+ph()*2;
  for(let i=0;i<n;i++){const T0=t+wl*.5+i*.5;sch(T0,()=>{const [x,y]=P6(-dir*13,-24);shot(T0,x,y+(RND()-.5)*30,dir>0?0:Math.PI,90,{sty:'steam',col:'#d0d8e0',r:5})})}
  return wl*.5+n*.5+tel()+1});
 D('s6ScopeSnipe','망원경 저격','hands',10,'망원경이 나를 조준한 붉은 선을 따라 저격 → 선이 굳으면 옆으로',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.2;sch(T0,()=>{const [x,y]=P6(18,-26),a=toP(x,y);NP({k:'seg',sty:'laser',col:'#ff5a6a',w:6,t0:T0,t1:T0+tel()+.2,t2:T0+tel()+.5,a:()=>[x,y],b:()=>[x+Math.cos(a)*600,y+Math.sin(a)*600],dmg:13})});snd(T0+tel()+.2,1400,.1,'square',.05,200)}
  return n*1.2+tel()+.8});
 /* 5 깃털 시계탑 */
 D('s6NoonStrike','정오의 종','head',12,'문자판에서 열두 바늘이 뻗어 돎 → 바늘 사이를 따라 돌아',t=>{const dur=3+ph(),n=6+ph()*2;
  sch(t,()=>{const [x,y]=P6(0,-32);for(let i=0;i<n;i++){const a0=i*TAU/n;NP({k:'seg',sty:'laser',col:'#8ad8ff',w:5,live:true,t0:t,t1:t+tel(),t2:t+tel()+dur,a:()=>[x,y],b:b=>{const a=a0+Math.max(0,b-t-tel())*.6*spd();return [x+Math.cos(a)*400,y+Math.sin(a)*400]},dmg:11})}});snd(t+tel(),523,1,'triangle',.06,523);
  return tel()+dur+.3});
 D('s6FeatherRain','깃털비','field',10,'날개에서 깃털이 비스듬히 쏟아짐 → 깃털 줄 사이로',t=>{const n=10+ph()*4;
  for(let i=0;i<n;i++){const T0=t+i*.25,s=i%2?1:-1;sch(T0,()=>{const [x,y]=P6(s*16,-28);shot(T0,x,y,Math.PI/2-s*.5+(RND()-.5)*.6,70,{sty:'light',col:'#8ad8ff',r:4})})}
  return n*.25+tel()+1.4});
 D('s6ReverseHands','거꾸로 바늘','head',12,'긴 바늘 두 개가 서로 반대로 돌며 화면을 쓺 → 엇갈리는 틈을 따라',t=>{const dur=3.5+ph();
  sch(t,()=>{const cx=AX+AW/2,cy=AY+AH*.55;for(const [dir,L,col] of [[1,260,'#2a3a52'],[-1,180,'#c8964a']])NP({k:'seg',sty:'laser',col,w:7,live:true,t0:t,t1:t+tel(),t2:t+tel()+dur,a:b=>{const a=dir*Math.max(0,b-t-tel())*.7*spd()+(dir>0?0:Math.PI/2);return [cx-Math.cos(a)*L,cy-Math.sin(a)*L]},b:b=>{const a=dir*Math.max(0,b-t-tel())*.7*spd()+(dir>0?0:Math.PI/2);return [cx+Math.cos(a)*L,cy+Math.sin(a)*L]},dmg:12})});
  return tel()+dur+.3});
 D('s6Pendulum','시계추','all',11,'거대한 추가 좌우로 흔들림 → 추가 지나간 뒤 그 자리로',t=>{const dur=4+ph();
  sch(t,()=>{const [px,py]=P6(0,-10);NP({k:'orb',sty:'bob',col:'#c8964a',r:16,t0:t,t1:t+tel(),t2:t+tel()+dur,prev:.8,pos:b=>{const q=Math.max(0,b-t-tel())*1.8*spd(),a=Math.PI/2+Math.sin(q)*1.1;return [px+Math.cos(a)*170,py+Math.sin(a)*150]},dmg:14})});
  return tel()+dur+.3});
 /* 6 풍금 합창단 */
 D('s6ChordWall','화음 벽','field',11,'파이프에서 세로 음파 기둥이 화음처럼 셋씩 내리침 → 기둥 사이로',t=>{const n=4+ph(),cols=9,cw=AW/cols;
  for(let k=0;k<n;k++){const T0=t+k*.9,base=Math.floor(RND()*cols);sch(T0,()=>{for(const d of [0,2,4]){const c=(base+d)%cols;NP({k:'rect',x:AX+c*cw+3,y:AY,w:cw-6,h:AH,sty:'light',t0:T0,t1:T0+tel(),t2:T0+tel()+.3,col:'#c8a0ff',dmg:11})}});snd(T0+tel(),[262,330,392][k%3],.3,'triangle',.05,262)}
  return n*.9+tel()+.6});
 D('s6ChoirRings','합창 고리','head',10,'가면들이 노래하면 음표 고리가 퍼짐 → 고리의 빈 칸으로',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.1;sch(T0,()=>{const [x,y]=P6((k%3-1)*8,-34),gap=RND()*TAU;for(let i=0;i<20;i++){const a=i*TAU/20;if(Math.abs(((a-gap+Math.PI*3)%TAU)-Math.PI)<.5)continue;shot(T0,x,y,a,58,{sty:'note',col:'#e0c0ff',r:4,rayL:16})}})}
  return n*1.1+tel()+1.6});
 D('s6Bellows','풀무 바람','field',11,'풀무가 숨을 내쉬며 좌우로 바람 + 음표 → 바람 방향을 읽어',t=>{const w1=wind(t,2,-1,0,48);wind(t+w1+2.2,2,1,0,48);
  for(let i=0;i<8;i++){const T0=t+i*.6;sch(T0,()=>{const [x,y]=P6((i%2?1:-1)*14,-16);shot(T0,x,y,toP(x,y),64,{sty:'note',col:'#c8a0ff',r:4})})}
  return w1+4.6});
 D('s6Fugue','돌림노래','hands',12,'두 줄기 음표 나선이 시간차로 돎 → 나선 바깥으로 돌아',t=>{const dur=3+ph();
  for(const [s,d] of [[-1,0],[1,.6]]){const T0=t+d;for(let i=0;i<14;i++){const T1=T0+i*.2;sch(T1,()=>{const [x,y]=P6(s*12,-30);shot(T1,x,y,s*T1*1.4+i*.45,66,{sty:'note',col:s>0?'#ffe0a0':'#c8a0ff',r:4,rayL:14})})}}
  return 3.4+tel()+1.4});
 /* 7 무지개 다리 수문장 */
 D('s6PrismSplit','분광','head',12,'외눈 프리즘의 빛이 일곱 색 광선으로 갈라짐 → 광선 사이 틈으로',t=>{const n=2+ph(),RB=['#ff4a5a','#ff9a3a','#ffe04a','#4ae08a','#3aa8ff','#6a5aff','#c85aff'];
  for(let k=0;k<n;k++){const T0=t+k*1.6;sch(T0,()=>{const [x,y]=P6(0,-44),a0=toP(x,y)+(k%2?.13:0);for(let i=0;i<7;i++){const a=a0+(i-3)*.26;NP({k:'seg',sty:'laser',col:RB[i],w:5,t0:T0,t1:T0+tel(),t2:T0+tel()+.5,a:()=>[x,y],b:()=>[x+Math.cos(a)*500,y+Math.sin(a)*500],dmg:12})}});snd(T0+tel(),1047,.4,'triangle',.05,523)}
  return n*1.6+tel()+.6});
 D('s6BridgeFall','무너지는 다리','field',11,'다리 바닥이 줄줄이 무너짐 → 아직 안전한 칸으로 옮겨가',t=>{const rows=5,rh=AH/rows,n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.2,safe=Math.floor(RND()*rows);sch(T0,()=>{for(let r=0;r<rows;r++){if(r===safe)continue;NP({k:'rect',x:AX,y:AY+r*rh+2,w:AW,h:rh-4,sty:'light',t0:T0,t1:T0+tel()+r*.08,t2:T0+tel()+r*.08+.35,col:'#a8d8ff',dmg:11})}});shake(T0+tel(),.25)}
  return n*1.2+tel()+.8});
 D('s6LightSword','빛의 대검','hands',11,'치켜든 무지개 대검이 크게 내려침 → 칼이 지나는 반대편으로',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.6,dir=k%2?-1:1;sch(T0,()=>{const [x,y]=P6(22,-35);NP({k:'seg',sty:'laser',col:'#ffffff',w:14,live:true,t0:T0,t1:T0+tel(),t2:T0+tel()+.6,a:()=>[x,y],b:b=>{const q=clamp((b-T0-tel())/.6,0,1),a=-Math.PI/2+dir*(.2+q*2.6);return [x+Math.cos(a)*420,y+Math.sin(a)*420]},dmg:15})});shake(T0+tel()+.3,.4)}
  return n*1.6+tel()+.8});
 D('s6ShardGuard','결정 파편','all',11,'결정 파편이 보스를 돌다가 하나씩 나를 향해 날아옴 → 날아오는 순서를 보고 비켜',t=>{const n=8+ph()*2,dur=2.4;
  sch(t,()=>{for(let i=0;i<n;i++){const a0=i*TAU/n,Tf=t+tel()+i*.22;NP({k:'orb',sty:'crystal',col:'#a8d8ff',r:6,t0:t,t1:t+tel(),t2:Tf+2.6,noTel:true,pos:b=>{const [cx,cy]=P6(0,-24),q=Math.max(0,b-t);if(b<Tf)return [cx+Math.cos(a0+q*1.2)*60,cy+Math.sin(a0+q*1.2)*40];const o=o6[i]||(o6[i]={x:cx+Math.cos(a0+(Tf-t)*1.2)*60,y:cy+Math.sin(a0+(Tf-t)*1.2)*40,a:toP(cx+Math.cos(a0+(Tf-t)*1.2)*60,cy+Math.sin(a0+(Tf-t)*1.2)*40)});const s=(b-Tf)*120*spd();return [o.x+Math.cos(o.a)*s,o.y+Math.sin(o.a)*s]},dmg:10})}const o6={}});
  return tel()+n*.22+2.4});
 /* 8 메아리 사냥매 */
 D('s6EchoDive','메아리 급강하','all',12,'사냥매가 조준선을 긋고 급강하, 메아리 잔상이 뒤따름 → 선 밖으로, 잔상까지 피해',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.8;sch(T0,()=>{const [x,y]=P6(0,-28),a=toP(x,y),L=520;NP({k:'seg',sty:'laser',col:'#ff9a3a',w:16,t0:T0,t1:T0+tel(),t2:T0+tel()+.25,a:()=>[x,y],b:()=>[x+Math.cos(a)*L,y+Math.sin(a)*L],dmg:14});
   for(let e=1;e<=2;e++){const Te=T0+tel()+e*.35,o=e*.18*(k%2?1:-1);NP({k:'seg',sty:'laser',col:'#ffc860',w:10,t0:T0+e*.2,t1:Te,t2:Te+.2,a:()=>[x,y],b:()=>[x+Math.cos(a+o)*L,y+Math.sin(a+o)*L],dmg:11})}});shake(T0+tel(),.35);snd(T0+tel(),1600,.3,'sawtooth',.05,200)}
  return n*1.8+tel()+1});
 D('s6Screech','비명','head',10,'부리를 벌려 비명 → 음파 고리가 연달아 퍼짐, 틈이 돌아감',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*.8;sch(T0,()=>{const [x,y]=P6(0,-36),gap=toP(x,y)+k*.7;for(let i=0;i<22;i++){const a=i*TAU/22;if(Math.abs(((a-gap+Math.PI*3)%TAU)-Math.PI)<.42)continue;shot(T0,x,y,a,74,{sty:'echo',col:'#ff7a2a',r:4,rayL:14})}});snd(T0+tel(),1800,.25,'sawtooth',.04,900)}
  return n*.8+tel()+1.4});
 D('s6BladeFeather','칼깃 투척','hands',11,'양 날개에서 칼날 깃털이 부채꼴로 → 부채 사이로',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*.9;sch(T0,()=>{for(const s of [-1,1]){const [x,y]=P6(s*24,-38),a0=toP(x,y);for(let i=-2;i<=2;i++)shot(T0,x,y,a0+i*.2,84,{sty:'light',col:'#c8d4e8',r:4})}})}
  return n*.9+tel()+1.2});
 D('s6BellChain','사슬 종','all',11,'발톱의 종이 크게 휘둘러지고 울림 고리가 퍼짐 → 종이 지나간 뒤 고리 틈으로',t=>{const dur=3+ph();
  sch(t,()=>{const [px,py]=P6(0,-8);NP({k:'orb',sty:'bob',col:'#ffc860',r:12,t0:t,t1:t+tel(),t2:t+tel()+dur,prev:.6,pos:b=>{const q=Math.max(0,b-t-tel())*2*spd(),a=Math.PI/2+Math.sin(q)*1.2;return [px+Math.cos(a)*140,py+Math.sin(a)*120]},dmg:13})});
  for(let k=0;k<3;k++){const T0=t+tel()+k*1.1;sch(T0,()=>{const [x,y]=P6(0,-8);for(let i=0;i<16;i++)npShot(T0,T0+.01,x,y,i*TAU/16+k*.2,60*spd(),{sty:'echo',col:'#ffc860',r:4,noTel:true,dmg:9})})}
  return tel()+dur+.4});
 /* 9 폭풍의 눈 */
 D('s6Vortex','소용돌이','field',12,'눈이 나를 끌어당기고 잔해가 돎 → 반대로 대시하며 잔해 틈으로',t=>{const dur=4+ph();
  sch(t,()=>{const [x,y]=P6(0,-26);G.pull={x,y,str:44+ph()*8,t0:t+tel(),t1:t+tel()+dur,tp:t,kind:'suck'};for(let i=0;i<12;i++){const a0=i*TAU/12;NP({k:'orb',sty:['crate','light','scrap'][i%3],col:'#c8a060',r:5,t0:t,t1:t+tel(),t2:t+tel()+dur,noTel:true,pos:b=>{const q=Math.max(0,b-t),r=90-Math.max(0,b-t-tel())*8;return [x+Math.cos(a0+q*1.4)*r,y+Math.sin(a0+q*1.4)*r*.7]},dmg:10})}sfx(60,2,'sawtooth',.05,30)});
  return tel()+dur+.4});
 D('s6EyeBeam','고요의 시선','head',11,'고요한 눈이 나를 따라 시선을 그음 → 시선보다 빠르게 옆으로',t=>{const dur=3+ph()*.6;
  sch(t,()=>{const [x,y]=P6(0,-26);let a=toP(x,y);NP({k:'seg',sty:'laser',col:'#7af0ff',w:9,live:true,t0:t,t1:t+tel(),t2:t+tel()+dur,a:()=>P6(0,-26),b:b=>{const [ex,ey]=P6(0,-26);if(b>=t+tel()){const want=toP(ex,ey),d=((want-a+Math.PI*3)%TAU)-Math.PI;a+=clamp(d,-.03*spd(),.03*spd())}return [ex+Math.cos(a)*500,ey+Math.sin(a)*500]},dmg:13})});
  return tel()+dur+.3});
 D('s6LightningGrid','번개 격자','field',12,'가로·세로 번개 줄이 번갈아 내리침 → 교차하지 않는 칸으로',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.1,vert=k%2===0,cnt=vert?6:4,off=RND();sch(T0,()=>{for(let i=0;i<cnt;i++){if(vert){const x=AX+(i+off*.5)*(AW/cnt);NP({k:'rect',x:x,y:AY,w:14,h:AH,sty:'elec',t0:T0,t1:T0+tel(),t2:T0+tel()+.3,col:'#ffe25a',dmg:12})}else{const y=AY+(i+off*.5)*(AH/cnt);NP({k:'rect',x:AX,y,w:AW,h:12,sty:'elec',t0:T0,t1:T0+tel(),t2:T0+tel()+.3,col:'#ffe25a',dmg:12})}}});sch(T0+tel(),()=>{G.flash=Math.max(G.flash||0,.1)})}
  return n*1.1+tel()+.5});
 D('s6DebrisStorm','잔해 폭풍','field',11,'바람에 실린 기왓장·연·톱니가 날아옴 → 바람을 버티며 빈 곳으로',t=>{const dir=RND()<.5?1:-1,wl=wind(t,4.5,dir,0,52),n=10+ph()*3;
  for(let i=0;i<n;i++){const T0=t+wl*.5+i*.35;sch(T0,()=>{const x=dir>0?AX+4:AX+AW-4,y=AY+20+RND()*(AH-30);shot(T0,x,y,(dir>0?0:Math.PI)+(RND()-.5)*.3,100,{sty:['crate','scrap','light'][i%3],col:'#c8a060',r:6})})}
  return wl*.5+n*.35+tel()+1});
 /* 10 공명탑 · 첫 번째 노래 */
 D('s6FirstSong','첫 번째 노래','field',12,'하프 줄이 가로로 차례차례 울림 → 울리기 전에 빈 줄로 옮겨',t=>{const rows=7,rh=AH/rows,n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*2,safe=Math.floor(RND()*rows);for(let r=0;r<rows;r++){if(r===safe)continue;const Tr=T0+r*.18,y=AY+rh*(r+.5);NP({k:'seg',sty:'laser',col:['#7af0ff','#c8a0ff','#ffe8a0'][r%3],w:7,t0:Tr,t1:Tr+tel(),t2:Tr+tel()+.35,a:()=>[AX,y],b:()=>[AX+AW,y],dmg:12});snd(Tr+tel(),[262,294,330,349,392,440,494][r],.25,'triangle',.04,[262,294,330,349,392,440,494][r])}}
  return n*2+tel()+1.6});
 D('s6BellRings','종 고리','hands',11,'세 겹의 종 고리가 돌며 퍼짐 → 고리 틈이 겹칠 때 통과',t=>{const dur=4;
  sch(t,()=>{const [x,y]=P6(0,-24);for(let r=0;r<3;r++)for(let i=0;i<10;i++){if(i===r*3)continue;const a0=i*TAU/10,dir=r%2?-1:1;NP({k:'orb',sty:'bob',col:'#e0b860',r:5,t0:t,t1:t+tel(),t2:t+tel()+dur,noTel:true,pos:b=>{const q=Math.max(0,b-t-tel()),rr=24+r*14+q*(36+r*8)*spd();return [x+Math.cos(a0+dir*q*.8)*rr,y+Math.sin(a0+dir*q*.8)*rr*.8]},dmg:10})}});
  return tel()+dur+.3});
 D('s6EchoOfAll','모든 소리의 메아리','all',13,'1~5장의 소리가 차례로 공격이 됨: 톱니 → 송곳니 → 시곗바늘 → 별 → 물결',t=>{const tl=tel();
  /* 톱니 */sch(t,()=>{const [x,y]=P6(-16,-30);for(let i=0;i<6;i++)shot(t,x,y,toP(x,y)+(i-2.5)*.2,70,{sty:'gear',col:'#8eda9e',r:6})});
  /* 송곳니 */sch(t+1.2,()=>{for(let i=0;i<6;i++){const T0=t+1.2+i*.12;circ(T0,AX+40+i*(AW-80)/5,P.y,14,'#ff6a8a',{label:'▼'})}});
  /* 시곗바늘 */sch(t+2.6,()=>{const cx=AX+AW/2,cy=AY+AH/2;NP({k:'seg',sty:'laser',col:'#e8c070',w:7,live:true,t0:t+2.6,t1:t+2.6+tl,t2:t+2.6+tl+1.6,a:()=>[cx,cy],b:b=>{const a=Math.max(0,b-t-2.6-tl)*1.6*spd()-Math.PI/2;return [cx+Math.cos(a)*300,cy+Math.sin(a)*300]},dmg:12})});
  /* 별 */sch(t+4.4,()=>{for(let i=0;i<7;i++)circ(t+4.4+i*.15,AX+30+RND()*(AW-60),AY+30+RND()*(AH-50),14,'#c8b8ff',{label:'★'})});
  /* 물결 */sch(t+5.8,()=>{const gap=Math.floor(RND()*8),cw=AW/8;for(let c=0;c<8;c++){if(c===gap)continue;NP({k:'rect',x:AX+c*cw+1,y:AY,w:cw-2,h:14,sty:'ice',t0:t+5.8,t1:t+5.8+tl,t2:t+5.8+tl+2.4,col:'#7ad0f0',dmg:10,live:true,step:(o,b)=>{if(b>=o.t1)o.y=AY+(b-o.t1)*100*spd()}})}});
  return 5.8+tl+2.6});
 D('s6Resonance','공명','all',11,'내 자리에 공명이 연달아 울리고 바람이 휘몰아침 → 멈추지 말고 계속 움직여',t=>{const wl=wind(t,4,RND()<.5?1:-1,0,40),n=5+ph();
  for(let i=0;i<n;i++){const T0=t+i*.6;sch(T0,()=>{const c=circ(T0,P.x,P.y,16,'#ffe8a0',{label:'♪'});sch(T0+tel(),()=>{for(let k=0;k<8;k++)npShot(T0+tel(),T0+tel(),c.x,c.y,k*TAU/8,60*spd(),{sty:'note',col:'#ffe8a0',r:4,noTel:true,dmg:9})})})}
  return Math.max(wl+4,n*.6+tel()+1)});
 /* ---------- 보스별 공격 목록 (대표 기술 · 기본 · 2페이즈 · 3페이즈) ---------- */
 const DK={s6_vane:['s6VaneLance','s6CompassSpin','s6WeatherTurn','s6Rooster'],s6_kite:['s6KiteDive','s6StringCut','s6TailRibbon','s6WindLift'],s6_cloudwhale:['s6ThunderRain','s6CloudBreath','s6RainCurtain','s6StaticOrbs'],
  s6_captain:['s6Broadside','s6AnchorDrop','s6PropWind','s6ScopeSnipe'],s6_clock:['s6NoonStrike','s6FeatherRain','s6ReverseHands','s6Pendulum'],s6_organ:['s6ChordWall','s6ChoirRings','s6Bellows','s6Fugue'],
  s6_prism:['s6PrismSplit','s6BridgeFall','s6LightSword','s6ShardGuard'],s6_falcon:['s6EchoDive','s6Screech','s6BladeFeather','s6BellChain'],s6_storm:['s6Vortex','s6EyeBeam','s6LightningGrid','s6DebrisStorm'],s6_spire:['s6FirstSong','s6BellRings','s6EchoOfAll','s6Resonance']};
 window.S6DECK=DK;
 for(const b of L6){const d=DK[b.art];C3BOSS[b.art].deck=[[d[0],4,0,'S'],[d[1],3,0],[d[2],3,1],[d[3],3,2]]}
 /* ---------- 하늘 전장 ---------- */
 const AC={};
 function skyArena(k){if(AC[k])return AC[k];const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d'),t3=k>=7,t2=k>=3&&k<7,B=L6[k];
  const sky=g.createLinearGradient(0,0,0,H);if(t3){sky.addColorStop(0,'#0a0e24');sky.addColorStop(.6,'#1c2850');sky.addColorStop(1,'#2a3460')}else if(t2){sky.addColorStop(0,'#3a8ad8');sky.addColorStop(.7,'#9ad8f8');sky.addColorStop(1,'#d8f0ff')}else{sky.addColorStop(0,'#3a3a78');sky.addColorStop(.55,'#f08a6a');sky.addColorStop(1,'#ffd8a0')}g.fillStyle=sky;g.fillRect(0,0,W,H);
  const r=rng(hash('s6'+k));for(let i=0;i<14;i++){const x=r()*W,y=60+r()*120,s=20+r()*40;g.globalAlpha=t3?.25:.5;g.fillStyle=t3?'#3a4878':'#ffffff';for(let j=0;j<5;j++){g.beginPath();g.ellipse(x+j*s*.3-s*.6,y+Math.sin(j)*4,s*.4,s*.22,0,0,TAU);g.fill()}}g.globalAlpha=1;
  /* 떠 있는 돌 바닥 */g.fillStyle=t3?'#2a2c40':'#7a6a5a';g.beginPath();g.ellipse(W/2,AY+AH*.62,AW*.56,AH*.42,0,0,TAU);g.fill();g.fillStyle=t3?'#3a3c58':'#b8a890';g.beginPath();g.ellipse(W/2,AY+AH*.6,AW*.54,AH*.39,0,0,TAU);g.fill();
  g.strokeStyle=t3?'#4a4e70':'#d8c8a8';g.lineWidth=1;for(let i=0;i<9;i++){g.beginPath();g.ellipse(W/2,AY+AH*.6,AW*.54*(i/9),AH*.39*(i/9),0,0,TAU);g.globalAlpha=.25;g.stroke()}g.globalAlpha=1;
  for(let i=0;i<16;i++){const a=i*TAU/16;g.strokeStyle=t3?'#4a4e70':'#d8c8a8';g.globalAlpha=.25;g.beginPath();g.moveTo(W/2,AY+AH*.6);g.lineTo(W/2+Math.cos(a)*AW*.54,AY+AH*.6+Math.sin(a)*AH*.39);g.stroke()}g.globalAlpha=1;
  /* 나침반 바닥 문양 */g.strokeStyle=B.c;g.globalAlpha=.35;g.lineWidth=2;g.beginPath();g.ellipse(W/2,AY+AH*.6,60,40,0,0,TAU);g.stroke();g.globalAlpha=1;
  AC[k]=c;return c}
 window.s6SkyArena=skyArena;
 {const _ac=arenaCanvas;arenaCanvas=function(bi){if(typeof G!=='undefined'&&G&&G.s6!=null)return skyArena(G.s6);return _ac.apply(this,arguments)}}
 {const _aa=arenaAnim;arenaAnim=function(bi,now,beat){if(typeof G!=='undefined'&&G&&G.s6!=null){const t=now/1000,t3=G.s6>=7;for(let i=0;i<6;i++){const x=((i*97+t*(8+i*2))%(W+80))-40,y=40+i*30;RA(Math.round(x),y,30+i*4,4,t3?'#3a4878':'#ffffff',.18);RA(Math.round(x)+8,y-3,18,3,t3?'#3a4878':'#ffffff',.14)}return}return _aa.apply(this,arguments)}}
 /* 바람 그리기 */{const _nd=npDrawTop;npDrawTop=function(now,beat){const r=_nd.apply(this,arguments);try{if(G&&G.s6!=null)drawWind(now,beat)}catch(e){}return r}}
 /* ---------- 전투 시작 · 끝 ---------- */
 window.s6Hp=k=>Math.round((10200+k*700)*({easy:.7,normal:1,hard:1.3,extreme:1.55}[diff]||1));
 window.s6Fight=function(k,how){const B6=L6[k];if(!B6)return;const ST=window.S6STORY&&S6STORY[k];initAudio();story=false;enterGame();try{CS=null}catch(e){}
  const b={art:B6.art,base:0,name:B6.name,en:B6.en,epi:(ST&&ST.title)||B6.epi||'',phase:(ST&&ST.phase)||[B6.name+'의 바람이 거세진다!','폭풍이 몰아친다!'],dying:(ST&&ST.dying)||'…바람이 잦아든다.'};c3SwapIn(b);startFight(b.base,false);G.s6=k;G.s6How=how||'rush';G.hp=G.maxHp=s6Hp(k);
  $('bossName').textContent=B6.name+'  '+B6.en;$('bvTitle').textContent='BEAT BLADE · CHAPTER 6 · ZENITH '+(k+1)+'/10'};
 function s6End(won){if(G.state==='result')return;G.state='result';G.won=won;stopMusic();const k=G.s6,how=G.s6How||'rush',B6=L6[k],t=Math.round((performance.now()-G.startReal)/1000);c3SwapOut();G.s6=null;G.s6w=null;
  const rank=G.hits===0?'P':G.hits<=2?'S':G.hits<=4?'A':G.hits<=7?'B':'C';saveData.bestCombo=Math.max(saveData.bestCombo||0,G.maxCombo||0);
  if(how==='demo'){showOverlay('ZENITH · 시연',B6.name,'시연 전투는 기록이 남지 않아요.',[['다시 시연',()=>{$('overlay').hidden=true;s6Fight(k,'demo')},true],['로비로',toLobby,false]]);return}
  if(won&&how!=='demo'){saveData.s6rush=saveData.s6rush||{};const kk=k+'|'+diff,o='PSABC';if(!saveData.s6rush[kk]||o.indexOf(rank)<o.indexOf(saveData.s6rush[kk]))saveData.s6rush[kk]=rank}
  let coins=0;try{coins=awardCoins(won,rank)}catch(e){}saveNow();const acc=G.swings?Math.round(G.onbeat/G.swings*100):0;
  const html='<b style="color:#ffd166">🪙 +'+coins+' 코인</b> (보유 '+(saveData.coins||0)+')<br>반격 성공 '+(G.swings||0)+'회 · 박자 정확도 '+acc+'%<br>최대 콤보 '+(G.maxCombo||0)+' · 피격 '+G.hits+'회 · 시간 '+Math.floor(t/60)+':'+String(t%60).padStart(2,'0')+(won?'<br><b style="font-size:26px;color:'+(rank==='P'?'#fff6cf':'#ffd166')+'">'+(rank==='P'?'★ PERFECT ★':'RANK '+rank)+'</b>':'<br>보스 체력 '+Math.round(G.hp/G.maxHp*100)+'% 남음');
  if(how==='story'&&typeof window.s6StoryEnd==='function'){if(window.s6StoryEnd(k,won,rank,coins,html))return}
  const btns=[['다시 도전',()=>{$('overlay').hidden=true;s6Fight(k)},!won]];if(won&&k<9)btns.push(['다음 보스 →',()=>{$('overlay').hidden=true;s6Fight(k+1)},true]);btns.push(['로비로',toLobby,false]);
  showOverlay('ZENITH · '+String(k+1).padStart(2,'0'),won?B6.name+' 격파!':'바람에 휩쓸렸다…',html,btns)}
 {const _fe=fightEnd;fightEnd=function(won){if(G&&G.s6!=null){s6End(won);return}return _fe.apply(this,arguments)}}
 {const _tl=toLobby;toLobby=function(){try{if(G&&G.s6!=null){c3SwapOut();G.s6=null}}catch(e){}return _tl.apply(this,arguments)}}
}catch(e){console.error('v45 ch6 patterns',e)}})();
