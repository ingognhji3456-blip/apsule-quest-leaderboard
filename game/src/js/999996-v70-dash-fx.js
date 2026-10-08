/* ================= v70 대시 연출 (DASH70) =================
   대시가 「순간 이동」처럼 보이게:
   ① 잔상: 캐릭터 모양 그대로의 반투명 그림자가 지나간 길에 줄줄이 남았다가 사라짐 (스킨을 입으면 그 스킨 모양)
   ② 속도선 · 출발 먼지 · 도착 고리 · 「휙」 소리. 박자에 맞춘 대시는 금빛 테두리가 한 번 더 번쩍
   ③ 스킨마다 다른 대시 (스킨 13종 = 프리미엄 3 + 변이 10): 잔상 색 · 남는 자국 · 흩날리는 조각이 모두 다름
      공허=보라 잔상 + 찢어진 틈 + 공허 조각 / 태엽=금빛 잔상이 멈춘 듯 오래 남음 + 시계 고리 + 톱니
      네온=무지개 잔상 + 이퀄라이저 막대 + 분홍·하늘 번개 / 별 · 꽃잎 · 불씨 · 얼음 · 금화 · 붉은 초승달 · 유령 연기 · 포자 · 푸른 바람 · 무지개 빛
   스킨이 없고 현질 검만 있으면 그 검의 세트 모양을 쓴다(99997 theme()와 같은 규칙).
   그림은 전투 · 동굴 · 마을 화면(ctx)에만. */
(()=>{try{
 const DEF={c:'#8ad8ff',c2:'#ffffff',life:260,part:'dust'};
 /* kind → 잔상 색 · 잔상이 남는 시간 · 조각 모양 */
 const ST={
  void:{c:'#a066ff',c2:'#5affd8',life:340,part:'shard',rift:1},
  clock:{c:'#ffcf5a',c2:'#fff4c8',life:520,part:'gear',freeze:1,ring:'clock'},
  neon:{c:'#ff3ad6',c2:'#29f0ff',life:300,part:'eq',rainbow:1,bolt:1},
  star:{c:'#c8b8ff',c2:'#ffe36b',life:300,part:'star'},
  petal:{c:'#ffc8e0',c2:'#ff8ab8',life:320,part:'petal'},
  lava:{c:'#ff8a3a',c2:'#ffd166',life:280,part:'ember',scorch:1},
  frost:{c:'#c8f4ff',c2:'#ffffff',life:360,part:'ice',scorch:1},
  gold:{c:'#ffe36b',c2:'#fff8d0',life:300,part:'coin'},
  eclipse:{c:'#ff4d6d',c2:'#2a0a14',life:320,part:'moon'},
  ghost:{c:'#5affd8',c2:'#0a2a2a',life:380,part:'wisp',wave:1},
  spore:{c:'#b6ff4a',c2:'#c86aff',life:320,part:'spore'},
  azure:{c:'#8ad8ff',c2:'#2a6aff',life:280,part:'wind'},
  prism:{c:'#ff9af0',c2:'#29f0ff',life:320,part:'ray',rainbow:1}};
 const RB=['#ff3ad6','#b05cff','#29f0ff','#5affb0','#ffe14d','#ff9a3a'];
 const live=c=>c===ctx&&(mode==='boss'||mode==='cave'||mode==='village');
 function style(){let T=null;try{T=window.DELUXE60&&DELUXE60.theme()}catch(e){}const s=T&&ST[T.kind];return Object.assign({},DEF,s||{},{key:T?T.id:'base'})}

 /* ---------- 잔상 그림 (캐릭터를 작은 캔버스에 한 번 그려 색을 입혀 둔다) ---------- */
 const GS=4,GW=48,GH=60,OX=18,OY=28,cache=new Map();
 function ghost(key,fl,color){const k=key+'|'+fl+'|'+color+'|'+((shopInv&&shopInv().eq.ch)||0);let g=cache.get(k);if(g)return g;
  if(cache.size>24)cache.clear();
  g=document.createElement('canvas');g.width=GW*GS;g.height=GH*GS;const o=g.getContext('2d');o.imageSmoothingEnabled=false;o.setTransform(GS,0,0,GS,0,0);
  try{drawKnight(o,OX,OY,2,fl,1.3,null)}catch(e){}
  o.setTransform(1,0,0,1,0,0);o.globalCompositeOperation='source-atop';o.globalAlpha=.6;o.fillStyle=color;o.fillRect(0,0,g.width,g.height);
  cache.set(k,g);return g}

 /* ---------- 상태 ---------- */
 const D={t0:0,trail:[],parts:[],marks:[],end:null,st:DEF,good:false,last:0};
 const rnd=(a,b)=>a+Math.random()*(b-a);
 function emit(x,y,n,spd,st,dirx,diry){for(let i=0;i<n;i++){const a=Math.atan2(-diry,-dirx)+rnd(-1.1,1.1),v=rnd(.3,1)*spd;
  D.parts.push({x:x+rnd(-4,4),y:y+rnd(-10,4),vx:Math.cos(a)*v,vy:Math.sin(a)*v-(st.part==='ember'||st.part==='wisp'||st.part==='spore'?18:0),t:performance.now(),life:rnd(280,560),k:st.part,c:Math.random()<.5?st.c:st.c2,r:rnd(0,6.28),s:rnd(.7,1.3)})}
  if(D.parts.length>120)D.parts.splice(0,D.parts.length-120)}
 function start(now){const st=style(),d=P.dash,l=Math.hypot(d.vx,d.vy)||1;D.st=st;D.t0=now;D.dx=d.vx/l;D.dy=d.vy/l;D.trail=[{x:P.x,y:P.y,fl:d.vx<0,t:now}];D.sx=P.x;D.sy=P.y;
  D.good=(P.inv-now)>400;D.end=null;emit(P.x,P.y,st.part==='dust'?10:14,70,st,D.dx,D.dy);
  D.marks.push({k:'start',x:P.x,y:P.y,t:now,st});
  try{sfx(1100,.11,'triangle',.022,160);sfx(220,.08,'sawtooth',.012,80);if(D.good)sfx(1560,.12,'sine',.02,2400)}catch(e){}}
 function finish(now){D.trail.push({x:P.x,y:P.y,fl:D.dx<0,t:now});D.end={x:P.x,y:P.y,t:now};D.marks.push({k:'end',x:P.x,y:P.y,t:now,st:D.st,good:D.good});
  if(D.st.rift||D.st.scorch||D.st.bolt)D.marks.push({k:D.st.rift?'rift':D.st.bolt?'bolt':'scorch',x0:D.sx,y0:D.sy,x:P.x,y:P.y,t:now,st:D.st});
  emit(P.x,P.y,6,40,D.st,-D.dx,-D.dy)}

 /* ---------- 그리기 도우미 (ctx를 직접 쓰고 알파를 되돌린다) ---------- */
 function A(a){ctx.globalAlpha=Math.max(0,Math.min(1,a))}
 function part(p,now){const q=(now-p.t)/p.life;if(q>=1)return false;const dt=(now-(p.lt||p.t))/1000;p.lt=now;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.94;p.vy*=.94;p.r+=dt*4;
  const a=(1-q),x=p.x,y=p.y,s=p.s;ctx.fillStyle=p.k==='eq'||D.st.rainbow?RB[(Math.floor(now/90)+(p.x|0))%6]:p.c;A(a*.9);
  switch(p.k){
   case 'shard':ctx.save();ctx.translate(x,y);ctx.rotate(p.r);ctx.fillRect(-1,-3*s,2,6*s);ctx.restore();break;
   case 'gear':ctx.save();ctx.translate(x,y);ctx.rotate(p.r);ctx.fillRect(-2*s,-2*s,4*s,4*s);for(let i=0;i<4;i++){ctx.rotate(Math.PI/2);ctx.fillRect(-.7,-3.4*s,1.4,1.4)}ctx.restore();break;
   case 'eq':{const h=3+Math.abs(Math.sin(now/60+p.r))*7*s;ctx.fillRect(x-1,y-h,2,h);break}
   case 'star':ctx.fillRect(x-.5,y-2.5*s,1,5*s);ctx.fillRect(x-2.5*s,y-.5,5*s,1);break;
   case 'petal':ctx.save();ctx.translate(x,y);ctx.rotate(p.r);ctx.beginPath();ctx.ellipse(0,0,2.6*s,1.2*s,0,0,6.28);ctx.fill();ctx.restore();break;
   case 'ember':ctx.fillRect(x-1,y-1,2,2);A(a*.3);ctx.fillRect(x-2,y-2,4,4);break;
   case 'ice':ctx.save();ctx.translate(x,y);ctx.rotate(.785);ctx.fillRect(-1.6*s,-1.6*s,3.2*s,3.2*s);ctx.restore();break;
   case 'coin':{const w=Math.abs(Math.cos(p.r*2))*3*s+.6;ctx.fillRect(x-w/2,y-1.8*s,w,3.6*s);break}
   case 'moon':ctx.beginPath();ctx.arc(x,y,2.6*s,0,6.28);ctx.fill();ctx.fillStyle='#05080c';A(a);ctx.beginPath();ctx.arc(x+1.3*s,y-.6,2.2*s,0,6.28);ctx.fill();break;
   case 'wisp':ctx.beginPath();ctx.arc(x+Math.sin(now/90+p.r)*2,y,2.4*s*(1-q*.5),0,6.28);ctx.fill();break;
   case 'spore':ctx.beginPath();ctx.arc(x,y,1.6*s,0,6.28);ctx.fill();A(a*.25);ctx.beginPath();ctx.arc(x,y,3.4*s,0,6.28);ctx.fill();break;
   case 'wind':ctx.fillRect(x-5*s,y,10*s,1);break;
   case 'ray':ctx.save();ctx.translate(x,y);ctx.rotate(p.r);ctx.fillRect(-4*s,-.5,8*s,1);ctx.restore();break;
   default:ctx.beginPath();ctx.arc(x,y,2.2*s*(1+q),0,6.28);ctx.fill()}
  return true}
 function mark(m,now){const st=m.st,age=now-m.t;
  if(m.k==='start'){const L=st.ring==='clock'?520:260,q=age/L;if(q>=1)return false;
   if(st.ring==='clock'){ctx.strokeStyle=st.c;ctx.lineWidth=1.2;A((1-q)*.85);ctx.beginPath();ctx.arc(m.x,m.y-8,10+q*6,0,6.28);ctx.stroke();
    for(let i=0;i<12;i++){const a=i/12*6.28;ctx.fillStyle=st.c;ctx.fillRect(m.x+Math.cos(a)*(10+q*6)-.6,m.y-8+Math.sin(a)*(10+q*6)-.6,1.2,1.2)}
    const ha=-1.57+q*6.28;ctx.beginPath();ctx.moveTo(m.x,m.y-8);ctx.lineTo(m.x+Math.cos(ha)*8,m.y-8+Math.sin(ha)*8);ctx.stroke()}
   else{ctx.fillStyle=st.c2;A((1-q)*.35);ctx.beginPath();ctx.ellipse(m.x,m.y+2,6+q*14,2+q*4,0,0,6.28);ctx.fill()}
   return true}
  if(m.k==='end'){const q=age/300;if(q>=1)return false;ctx.strokeStyle=m.good?'#ffe36b':st.c;ctx.lineWidth=m.good?2:1.2;A((1-q)*.9);ctx.beginPath();ctx.ellipse(m.x,m.y,5+q*18,2+q*7,0,0,6.28);ctx.stroke();
   if(m.good){A((1-q)*.5);ctx.beginPath();ctx.ellipse(m.x,m.y-9,3+q*10,10+q*14,0,0,6.28);ctx.stroke()}return true}
  const L=m.k==='scorch'?900:560,q=age/L;if(q>=1)return false;const dx=m.x-m.x0,dy=m.y-m.y0,len=Math.hypot(dx,dy)||1;
  if(m.k==='rift'){/* 공허: 지나간 자리에 찢어진 틈이 벌어졌다 닫힘 */const w=Math.sin(Math.min(1,q*2.2)*Math.PI)*2.6;ctx.save();ctx.translate(m.x0,m.y0);ctx.rotate(Math.atan2(dy,dx));
   ctx.fillStyle='#05020c';A(.85*(1-q));ctx.beginPath();ctx.ellipse(len/2,0,len/2,w+.5,0,0,6.28);ctx.fill();ctx.strokeStyle=st.c;ctx.lineWidth=1;A((1-q));ctx.stroke();
   ctx.strokeStyle=st.c2;A((1-q)*.6);ctx.beginPath();ctx.ellipse(len/2,0,len/2+1.5,w+2,0,0,6.28);ctx.stroke();ctx.restore();return true}
  if(m.k==='bolt'){/* 네온: 지나간 길에 분홍 · 하늘 번개 */ctx.lineWidth=1.3;for(const [c,o] of [[st.c,0],[st.c2,1]]){ctx.strokeStyle=c;A((1-q)*.85);ctx.beginPath();ctx.moveTo(m.x0,m.y0-8);
    for(let i=1;i<=6;i++){const t=i/6;ctx.lineTo(m.x0+dx*t+(i<6?Math.sin(i*2.7+o*3+Math.floor(now/50))*4:0),m.y0-8+dy*t+(i<6?Math.cos(i*1.9+o)*4:0))}ctx.stroke()}return true}
  /* 불씨 · 얼음: 바닥에 그은 자국 */ctx.save();ctx.translate(m.x0,m.y0+2);ctx.rotate(Math.atan2(dy,dx));ctx.fillStyle=st.part==='ice'?'#dff8ff':'#ff6a2a';A((1-q)*.45);ctx.fillRect(0,-1.5,len,3);ctx.fillStyle=st.c2;A((1-q)*.35);ctx.fillRect(0,-.5,len,1);ctx.restore();return true}

 function drawFx(now){const st=D.st;ctx.save();
  /* 잔상: 출발점부터 지금까지의 길을 일정한 간격으로 나눠 찍는다(화면 속도와 상관없이 고르게) */const L=st.life,shown=[],tot=Math.hypot(P.x-D.sx,P.y-D.sy),gap=Math.max(st.freeze?12:10,tot/4);
  const pts=D.trail;for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],len=Math.hypot(b.x-a.x,b.y-a.y);
   for(let d=(i===1?0:(gap-((a.acc||0)%gap))%gap);d<len;d+=gap){const k=len?d/len:0,t=a.t+(b.t-a.t)*k;if(now-t<=L)shown.push({x:a.x+(b.x-a.x)*k,y:a.y+(b.y-a.y)*k,t,fl:b.fl})}
   b.acc=(a.acc||0)+len}
  /* 마지막(지금 위치) 바로 옆 잔상은 캐릭터와 겹치니 뺀다 */while(shown.length&&P.dash&&Math.hypot(shown[shown.length-1].x-P.x,shown[shown.length-1].y-P.y)<5)shown.pop();
  shown.forEach((p,i)=>{const q=(now-p.t)/L,color=st.rainbow?RB[(i+Math.floor(now/80))%6]:(i%2?st.c2:st.c),g=ghost(st.key,p.fl,color);
   let ox=0;if(st.wave)ox=Math.sin(now/70+i)*2;
   A((st.freeze?(q<.75?.55:(1-q)*2.2):(1-q)*.6)*(.55+.45*i/Math.max(1,shown.length)));ctx.drawImage(g,p.x-12-OX+ox,p.y-19-OY,GW,GH);
   if(st.rainbow||D.good){ctx.globalCompositeOperation='lighter';A((1-q)*.25);ctx.drawImage(g,p.x-12-OX,p.y-19-OY,GW,GH);ctx.globalCompositeOperation='source-over'}});
  /* 속도선 (대시 중에만) */if(P.dash){const k=(now-D.t0)/P.dash.dur;ctx.fillStyle=D.good?'#ffe9a0':st.c2;for(let i=0;i<7;i++){const off=(i-3)*4+Math.sin(i*7.3)*2,len=14+((i*13)%10);
    A(.5*(1-k));ctx.save();ctx.translate(P.x,P.y-9);ctx.rotate(Math.atan2(D.dy,D.dx));ctx.fillRect(-len-10-((now/3+i*9)%8),off,len,1);ctx.restore()}}
  D.marks=D.marks.filter(m=>mark(m,now));D.parts=D.parts.filter(p=>part(p,now));
  ctx.restore();ctx.globalAlpha=1}

 /* ---------- 한 화면에 한 번: 기록 + 그리기 ----------
    전투에서는 190이 캐릭터를 그리기 직전(무적 깜빡임으로 캐릭터를 건너뛰는 화면에서도) DASH70.tick을 부른다.
    동굴 · 마을은 캐릭터를 그릴 때(drawKnight) 부른다. */
 function tick(now){if(D.lastTick===now||typeof P==='undefined')return;D.lastTick=now;
  if(P.dash&&P.dash.t0!==D.cur){D.cur=P.dash.t0;start(now)}
  if(P.dash){D.trail.push({x:P.x,y:P.y,fl:D.dx<0,t:now});if(D.trail.length>40)D.trail.shift();if(now-D.last>30){D.last=now;emit(P.x,P.y,D.st.part==='dust'?1:2,30,D.st,D.dx,D.dy)}}
  else if(D.cur&&!D.end&&D.t0)finish(now);
  if(D.trail.length||D.parts.length||D.marks.length)drawFx(now);
  if(!P.dash&&D.trail.length&&now-D.trail[D.trail.length-1].t>D.st.life+100)D.trail=[]}
 {const base=drawKnight;drawKnight=function(c,x,y,s,fl,wt,idleT){
  try{if(!window.__mateDraw&&live(c)&&mode!=='boss'&&typeof P!=='undefined'&&s===2&&Math.abs(x-(P.x-12))<24&&Math.abs(y-(P.y-19))<24)tick(performance.now())}catch(e){}
  return base.apply(this,arguments)}}
 window.DASH70={ST,style,D,tick(now){try{tick(now)}catch(e){}}};
}catch(e){console.error('v70 dash',e)}})();
