/* ================= v60 스킨 고급 연출 (스킨을 입었을 때만) =================
   ① 스킨마다 다른 칼날: 들고 있는 검의 색을 스킨 색 규칙으로 바꾸고(새 검을 입어볼 때는 그 검이 우선), 칼날을 따라 스킨 빛 입자
   ② 발밑 마법진: 프리미엄 스킨은 돌아가는 문양 고리, 변이 스킨은 빛 고리
   ③ 발자국: 걸을 때마다 스킨 모양의 자국(공허 물결 · 톱니 · 네온 · 별 · 꽃잎 …)이 남았다 사라짐
   ④ 대시 잔상: 대시하면 스킨 색의 잔상 줄기
   ⑤ 맞힐 때 터지는 효과: 공격이 들어간 자리에서 스킨 모양으로 터짐
   ⑥ 공격 기술(가로베기·찌르기…)의 빛 색을 스킨 색으로 (예전: 늘 흰색 직선이 몸을 가로질러 어색했음)
   그림은 모두 전투·동굴·마을 화면(ctx)에만. 상점의 태엽 공방 미리보기에는 안 나옴. */
(function(){try{
 if(!window.SKIN58)return;
 const TH={/* kind: 모양, c: 주색, c2: 보조색, map: 칼날 색 규칙 */
  void:{kind:'void',c:'#5affd8',c2:'#a066ff',map:(h,s,l)=>l>.78?[166,.9,.66]:[262,.5,l*.62]},
  clock:{kind:'clock',c:'#ffcf5a',c2:'#ffffff',map:(h,s,l)=>l>.8?[46,.6,.9]:[40,.8,.3+l*.45]},
  neon:{kind:'neon',c:'#ff3ad6',c2:'#29f0ff',map:(h,s,l)=>[(performance.now()/8+l*220)%360,.95,.55+l*.2]},
  v_haru:{kind:'star',c:'#c8b8ff',c2:'#ffe36b'},v_mina:{kind:'petal',c:'#ffc8e0',c2:'#6ad8ff'},v_doyun:{kind:'lava',c:'#ff8a3a',c2:'#ffd166'},
  v_sera:{kind:'frost',c:'#c8f4ff',c2:'#ffffff'},v_steel:{kind:'gold',c:'#ffe36b',c2:'#ffffff'},v_luna:{kind:'eclipse',c:'#ff4d6d',c2:'#1a0a10'},
  v_kai:{kind:'ghost',c:'#5affd8',c2:'#0a2a2a'},v_arin:{kind:'spore',c:'#b6ff4a',c2:'#c86aff'},v_zeno:{kind:'azure',c:'#8ad8ff',c2:'#2a6aff'},v_aurora:{kind:'prism',c:'#ff9af0',c2:'#29f0ff'}};
 const RAINBOW=['#ff3ad6','#b05cff','#29f0ff','#5affb0','#ffe14d','#ff9a3a'];
 const theme=()=>{/* v61: 스킨이 없으면 현질 검의 세트 테마 */const id=SKIN58.get()||({voidreaver:'void',gearsaber:'clock',beatbreaker:'neon'})[window.SWORD59&&SWORD59.get()];if(!id)return null;const T=TH[id];if(!T)return null;const s=SKIN58.byId(id);return Object.assign({id,map:T.map||(s&&s.map)},T)};
 const live=c=>c===ctx&&(mode==='boss'||mode==='cave'||mode==='village');
 const shopOpen=()=>{const sm=document.getElementById('shopModal');return !!(sm&&!sm.hidden)};
 const col=(T,i)=>T.kind==='neon'||T.kind==='prism'?RAINBOW[(i+Math.floor(performance.now()/120))%6]:(i%2?T.c2:T.c);
 /* ---------- 색 도구 ---------- */
 function hex2hsl(hx){const r=parseInt(hx.slice(1,3),16)/255,g=parseInt(hx.slice(3,5),16)/255,b=parseInt(hx.slice(5,7),16)/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let h=0,s=0;if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;h*=60}return [h,s,l]}
 function hsl2hex(h,s,l){h=((h%360)+360)%360;s=Math.max(0,Math.min(1,s));l=Math.max(0,Math.min(1,l));const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;let r=0,g=0,b=0;if(h<60){r=c;g=x}else if(h<120){r=x;g=c}else if(h<180){g=c;b=x}else if(h<240){g=x;b=c}else if(h<300){r=x;b=c}else{r=c;b=x}return '#'+[r,g,b].map(v=>Math.round((v+m)*255).toString(16).padStart(2,'0')).join('')}

 /* ① 스킨마다 다른 칼날 */
 {const base=drawWeaponShape;drawWeaponShape=function(w,hx,hy,ang,L,s,now,dirS,al){
   const T=theme();if(!T||!T.map||(window.SWORD59&&SWORD59.get())||shopOpen()||w!==curWp())return base.apply(this,arguments);
   const sp=WSPR[w.type]||WSPR.sword,orig=sp.pal,pal={};for(const k in orig){try{const [h,sa,l]=hex2hsl(orig[k]);/* 손잡이 쪽 어두운 색은 덜 바꿈 */const r=T.map(h,sa,l,0,0,255);pal[k]=r?hsl2hex(r[0],r[1],r[2]):orig[k]}catch(e){pal[k]=orig[k]}}
   sp.pal=pal;let r;try{r=base.apply(this,arguments)}finally{sp.pal=orig}
   /* 칼날을 따라 흐르는 빛 입자 */try{const n=sp.r.length,cs=s*.72,ca=Math.cos(ang),sa=Math.sin(ang),tip=(n-1-sp.g)*cs,t=now/1000,A=al==null?1:al;
    for(let i=0;i<4;i++){const q=(t*.9+i/4)%1,d=tip*(.3+.65*q);RA(hx+ca*d+Math.sin(t*4+i)*1.5-1,hy+sa*d-1-(T.kind==='lava'||T.kind==='azure'?q*4:0),2,2,col(T,i),(1-q)*.8*A)}glow(hx+ca*tip*.7,hy+sa*tip*.7,6,T.c,.14*A)}catch(e){}
   return r}}

 /* 발자국 · 대시 잔상 · 맞힘 효과 저장소 */
 const FX={steps:[],dash:[],hits:[],lastF:-1,lastHp:null};
 function drawSteps(now){const T=theme();FX.steps=FX.steps.filter(o=>now-o.t<900);for(const o of FX.steps){const q=(now-o.t)/900,a=(1-q)*.75;
   switch(o.kind){
   case 'void':ctx.save();ctx.globalAlpha=a*.8;ctx.strokeStyle=o.c;ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(o.x,o.y,3+q*9,1.5+q*3,0,0,TAU);ctx.stroke();ctx.restore();break;
   case 'clock':ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=o.c;ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(o.x,o.y,4,2,0,0,TAU);ctx.stroke();for(let i=0;i<6;i++){const an=q*3+i*TAU/6;RA(o.x+Math.cos(an)*5-.5,o.y+Math.sin(an)*2.5-.5,1,1,o.c,a)}ctx.restore();break;
   case 'neon':RA(o.x-3,o.y-1,6,2,o.c,a);RA(o.x-2,o.y-2,4,1,'#ffffff',a*.6);break;
   default:RA(o.x-1,o.y-1,2,2,o.c,a);RA(o.x+2,o.y-2+q*-4,1,1,o.c2,a)}}ctx.globalAlpha=1}
 function drawAura(x,y,now,T){const t=now/1000,prem=T.kind==='void'||T.kind==='clock'||T.kind==='neon';ctx.save();
  if(prem){ctx.globalAlpha=.55;ctx.strokeStyle=T.c;ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(x,y,15,5.5,0,0,TAU);ctx.stroke();ctx.globalAlpha=.35;ctx.beginPath();ctx.ellipse(x,y,11,4,0,0,TAU);ctx.stroke();
   /* 도는 문양 */for(let i=0;i<(T.kind==='clock'?12:8);i++){const an=t*(T.kind==='neon'?1.6:.7)+i*TAU/(T.kind==='clock'?12:8),px=x+Math.cos(an)*13,py=y+Math.sin(an)*4.8;if(T.kind==='clock')RA(px-.5,py-1,1,2,T.c,.8);else if(T.kind==='neon')RA(px-1,py-.5,2,1,RAINBOW[i%6],.9);else{RA(px-1,py-1,2,2,i%2?T.c:T.c2,.85)}}
   if(T.kind==='neon'){const b=(()=>{try{if(mus&&mus.ms&&mus.T0){const q=(performance.now()-mus.T0)/mus.ms;return 1-(q-Math.floor(q))}}catch(e){}return .5})();ctx.globalAlpha=.4*b;ctx.fillStyle=T.c;ctx.beginPath();ctx.ellipse(x,y,17*b+4,6*b+1.5,0,0,TAU);ctx.fill()}
   if(T.kind==='void'){for(let i=0;i<3;i++){const q=(t*.5+i/3)%1;RA(x+Math.sin(i*2+t)*9,y-q*18,1,2,T.c,(1-q)*.6)}}}
  else{ctx.globalAlpha=.4+.15*Math.sin(t*3);ctx.strokeStyle=T.c;ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(x,y,12,4.2,0,0,TAU);ctx.stroke()}
  ctx.restore();ctx.globalAlpha=1}
 /* ② ③ ④ 주인공을 그리기 전에 발밑 · 발자국 · 잔상 */
 {const base=drawKnight;drawKnight=function(c,x,y,s,fl,wt,idleT){try{const T=theme();if(T&&live(c)&&typeof P!=='undefined'&&s===2&&Math.abs(x-(P.x-12))<20&&Math.abs(y-(P.y-19))<20){const now=performance.now(),fx=x+12,fy=y+19.5;
    /* 발자국: 걸음 프레임이 바뀔 때 */if(P.walkOn){const f=((Math.floor((P.walkT||0)/(Math.PI/2))%4)+4)%4;if(f!==FX.lastF&&f%2===0){FX.steps.push({x:fx+(f===0?-3:3),y:fy,t:now,kind:T.kind,c:T.c,c2:T.c2});if(FX.steps.length>24)FX.steps.shift()}FX.lastF=f}
    /* 대시 잔상 */if(P.dash){FX.dash.push({x:fx,y:fy-10,t:now});if(FX.dash.length>18)FX.dash.shift()}
    drawSteps(now);FX.dash=FX.dash.filter(o=>now-o.t<260);FX.dash.forEach((o,i)=>{const q=(now-o.t)/260;RA(o.x-6,o.y-8,12,16,col(T,i),(1-q)*.22);RA(o.x-1,o.y-9,2,18,'#ffffff',(1-q)*.18)});
    drawAura(fx,fy,now,T)}}catch(e){}return base.apply(this,arguments)}}

 /* ⑤ 맞힐 때 터지는 효과 + ⑥ 공격 기술 빛 색 */
 if(typeof paAdd==='function'){const base=paAdd;paAdd=function(o){try{const T=theme();if(T){o.col=o.perf?T.c2==='#ffffff'?'#fff3c0':T.c2:T.c;o.skinKind=T.kind;FX.hits.push({x:o.x,y:o.y,t:performance.now(),kind:T.kind,c:T.c,c2:T.c2,perf:o.perf});if(FX.hits.length>8)FX.hits.shift()}}catch(e){}return base.apply(this,arguments)}}
 function drawHits(now){FX.hits=FX.hits.filter(o=>now-o.t<480);for(const o of FX.hits){const q=(now-o.t)/480,a=1-q,R0=(o.perf?1.3:1);ctx.save();
   switch(o.kind){
   case 'void':ctx.globalAlpha=.8*a;ctx.fillStyle='#05030c';ctx.beginPath();ctx.arc(o.x,o.y,(4+q*10)*R0,0,TAU);ctx.fill();ctx.strokeStyle=o.c;ctx.lineWidth=1.5;ctx.stroke();for(let i=0;i<10;i++){const an=i*TAU/10+q*2,d=(18-q*14)*R0;RA(o.x+Math.cos(an)*d-1,o.y+Math.sin(an)*d-1,2,2,i%2?o.c:o.c2,a)}break;
   case 'clock':ctx.globalAlpha=a;ctx.strokeStyle=o.c;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(o.x,o.y,(5+q*16)*R0,0,TAU);ctx.stroke();for(let i=0;i<12;i++){const an=q*4+i*TAU/12;RA(o.x+Math.cos(an)*(7+q*16)*R0-1,o.y+Math.sin(an)*(7+q*16)*R0-1,2,2,i%3?o.c:'#ffffff',a)}ctx.strokeStyle='#ffffff';ctx.beginPath();ctx.moveTo(o.x,o.y);ctx.lineTo(o.x+Math.cos(q*12)*9,o.y+Math.sin(q*12)*9);ctx.stroke();break;
   case 'neon':for(let i=0;i<3;i++){ctx.globalAlpha=a*.8;ctx.strokeStyle=RAINBOW[(i*2)%6];ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(o.x,o.y,(4+q*(14+i*6))*R0,0,TAU);ctx.stroke()}for(let i=0;i<6;i++){const hgt=(3+Math.abs(Math.sin(now/60+i))*8)*a;RA(o.x-9+i*3,o.y+10-hgt,2,hgt,RAINBOW[i],a)}break;
   default:{const n=10;for(let i=0;i<n;i++){const an=i*TAU/n+q,d=(4+q*18)*R0,px=o.x+Math.cos(an)*d,py=o.y+Math.sin(an)*d+(o.kind==='lava'?q*q*10:o.kind==='azure'?-q*10:0);
     if(o.kind==='star'||o.kind==='gold'||o.kind==='prism')cStar(px,py,2,i%2?o.c:o.c2,a);else if(o.kind==='petal')RA(px,py,3,2,i%2?o.c:o.c2,a);else RA(px-1,py-1,2.5,2.5,i%2?o.c:o.c2,a)}
     ctx.globalAlpha=a*.7;ctx.strokeStyle=o.c;ctx.lineWidth=1;ctx.beginPath();ctx.arc(o.x,o.y,(3+q*12)*R0,0,TAU);ctx.stroke()}}
   ctx.restore()}ctx.globalAlpha=1}
 {const base=drawScene;drawScene=function(now){const r=base.apply(this,arguments);try{if(FX.hits.length&&mode==='boss')drawHits(now)}catch(e){}return r}}
 window.DELUXE60={theme,TH};
}catch(e){console.error('v60 deluxe',e)}})();
