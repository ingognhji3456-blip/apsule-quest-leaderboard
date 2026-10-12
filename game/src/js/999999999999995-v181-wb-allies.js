/* ================= v181 월드 보스 AI 동료 29명 (AL181) =================
   월드 보스(WB177)에 들어가면 AI 동료 29명이 함께 싸운다(나까지 30명).
   - 동료는 알 · 아기 드래곤 · 불씨 · 대형 드래곤을 골라 달려가 칼을 휘두르고, 가끔 궁극기를 쓴다.
   - 동료 피해는 R.ai에 모아 서버로 따로 보낸다(/api/wb/hit의 ai — 공동 체력만 깎고 내 순위 · 보상엔 안 셈, 서버 상한 WB_AI_DPS).
     내 피해를 세는 scan()이 동료 피해를 내 것으로 세지 않게 몬스터의 m._lh도 같이 깎는다.
   - 그림은 캐릭터 그림(ch2Render)을 시간 0으로 고정해 기억해 두고 쓴다(29명이 매번 새로 그리면 느려서).
   - 탑의 그리기 목록(TPET106.list 감싸기)에 y 순서로 들어가 몬스터와 앞뒤가 맞는다. */
(function(){try{
 const WB=window.WB177;if(!WB||!window.TW71)return;
 const N=29,TAU=Math.PI*2,rnd=(a,b)=>a+Math.random()*(b-a),R=WB.R;
 const NAMES=['하늘검','불꽃토끼','별빛기사','새벽바람','은빛여우','검은고양이','달빛무사','용사지망생','소금빵','초코칩','번개곰','파도소리','모래시계','구름빵','태엽인형','바람개비','노을빛','청룡','백호','쇠망치','꼬마마법사','유리검','방울토마토','눈사람','불사조','검객K','망고주스','흰수염','도토리'];
 const SW=['#e8f0ff','#ffd166','#7ad8ff','#ff8a6a','#b48aff','#8aff9a','#ffb0e0','#ffffff'];
 const A={on:false,run:null,L:[],fx:[],last:0,dmg:0};
 const alive=m=>m&&m.hp>0&&!m.flee&&!m._rm;
 const big=m=>m.sp==='wb_egg'||m.sp==='wb_dragon';
 const inWB=()=>{try{return R.on&&!R.end&&typeof mode!=='undefined'&&mode==='tower'&&TW71.T.ext===WB.EXT}catch(e){return false}};
 function chars(){const L=[];try{for(let i=0;i<25;i++)if(CH2DEF[i])L.push(i)}catch(e){}return L.length?L:[0]}
 /* 판이 새로 시작되면 동료 29명을 내 둘레에 세움 */
 function spawn(){const C=chars(),T=TW71.T;A.L=[];A.fx=[];A.dmg=0;
  for(let i=0;i<N;i++){const a=i/N*TAU;A.L.push({nm:NAMES[i%NAMES.length],ch:C[(i*7+3)%C.length],sw:SW[i%SW.length],
   x:Math.max(AX+10,Math.min(AX+AW-10,P.x+Math.cos(a)*rnd(30,80))),y:Math.max(AY+24,Math.min(AY+AH-4,P.y+Math.sin(a)*rnd(16,40))),
   ang:a,sp:rnd(80,105),cd:rnd(.2,1.2),tg:null,tgT:0,face:Math.cos(a)>0?1:-1,walk:0,mv:false,swT:-9,ult:rnd(10,30),pow:rnd(.8,1.2)})}}
 /* 목표 고르기: 작은 몬스터(아기 드래곤 · 불씨)를 먼저, 없으면 알 · 대형 드래곤 */
 function pick(a,T){const L=T.mobs.filter(alive);if(!L.length)return null;const small=L.filter(m=>!big(m));
  if(small.length&&Math.random()<.75){let b=null,bd=1e9;for(const m of small){const d=Math.hypot(m.x-a.x,m.y-a.y)+Math.random()*60;if(d<bd){bd=d;b=m}}return b}
  return L.find(big)||L[0]}
 /* 몬스터 몸 위의 서는 자리(큰 몬스터는 둘레에 고르게 펼쳐 섬) */
 function spot(a,m){if(m.sp==='wb_egg'){const sn=Math.sin(a.ang);return [m.x+Math.cos(a.ang)*78,m.y+18+sn*(sn>0?44:30)]}/* 앞줄은 알 아래로 비켜 서서 알을 가리지 않게 */
  if(m.sp==='wb_dragon')return [m.x+Math.cos(a.ang)*70,m.y+20+Math.sin(a.ang)*30];
  const d=Math.hypot(a.x-m.x,a.y-m.y)||1;return [m.x+(a.x-m.x)/d*14,m.y+(a.y-m.y)/d*8]}
 /* 피해 주기: 동료 몫은 R.ai로, 내 피해 세기(scan)가 세지 않게 m._lh도 함께 깎음 */
 function hurt(m,d,col){const T=TW71.T,h0=Math.max(0,m.hp);m.hp-=d;const took=h0-Math.max(0,m.hp);if(m._lh!=null)m._lh-=took;if(m.wbc)R.ai=(R.ai||0)+took;A.dmg+=took;
  if(!big(m))m.hitT=T.clk;/* 큰 몬스터는 깜빡이지 않게(29명이 때리면 하얗게 질림) */if(m.hp<=0&&!big(m)){m.dieT=T.clk;try{TW71.burst(m.x,m.y-6,6,col||'#ffd166',90)}catch(e){}}
  if(A.fx.length<46&&Math.random()<.35)A.fx.push({k:'n',x:m.x+rnd(-10,10),y:m.y-(big(m)?60:18),t:T.clk,v:Math.round(took),c:col})}
 function tick(dt){const T=TW71.T;if(T.U)return;/* 궁극기 화면 멈춤 중엔 같이 멈춤 */
  for(const a of A.L){a.tgT-=dt;if(!alive(a.tg)||a.tgT<=0){a.tg=pick(a,T);a.tgT=rnd(.6,1.4)}
   const m=a.tg;let tx=a.x,ty=a.y;if(m){[tx,ty]=spot(a,m)}else{tx=P.x+Math.cos(a.ang)*60;ty=P.y+Math.sin(a.ang)*26}
   tx=Math.max(AX+8,Math.min(AX+AW-8,tx));ty=Math.max(AY+22,Math.min(AY+AH-3,ty));
   const dx=tx-a.x,dy=ty-a.y,d=Math.hypot(dx,dy);a.mv=d>5;if(a.mv){const s=Math.min(d,a.sp*dt);a.x+=dx/d*s;a.y+=dy/d*s;a.walk+=dt*9;if(Math.abs(dx)>2)a.face=dx>0?1:-1}
   if(m){a.face=m.x>=a.x?1:-1;a.cd-=dt;const near=d<(big(m)?26:16);
    if(near&&a.cd<=0){a.cd=rnd(.5,.85);a.swT=T.clk;const crit=Math.random()<.15;hurt(m,55*a.pow*(crit?2:1)*rnd(.8,1.2)*(big(m)?1:.6)/* 작은 몬스터는 덜 아프게 — 나도 잡을 게 남게 */,crit?'#ffd166':a.sw)}
    a.ult-=dt;if(near&&a.ult<=0){a.ult=rnd(18,34);a.swT=T.clk;A.fx.push({k:'u',x:m.x,y:big(m)?m.y+10:m.y,t:T.clk,c:a.sw,nm:a.nm});
     for(const o of T.mobs)if(alive(o)&&Math.hypot(o.x-m.x,(o.y-m.y)*1.4)<(big(o)?90:44))hurt(o,320*a.pow,a.sw);try{sfx(520,.18,'triangle',.025,1040)}catch(e){}}}}
  A.fx=A.fx.filter(f=>T.clk-f.t<(f.k==='u'?.7:.8))}
 /* 동료 그리기: 그림자 · 몸(캐릭터 그림) · 칼 · 이름 */
 const HV=window.__HV;
 function body(a,c,now){const T=TW71.T;let f=0,b=0;if(a.mv){f=((Math.floor(a.walk/(Math.PI/2))%4)+4)%4;b=f%2?-1:0}
  let out=null;const sv=HV?[HV.view,HV.sw]:null;try{if(HV){HV.view=a.mv&&Math.abs(Math.cos(a.ang))>.2?'side':'front';HV.sw=null}out=ch2Render(a.ch,f,b,false,0)}catch(e){}finally{if(HV){HV.view=sv[0];HV.sw=sv[1]}}
  const X=a.x-12-2-6,Y=a.y-19-12-10,k=1;c.save();c.imageSmoothingEnabled=false;
  c.globalAlpha=.35;c.fillStyle='#000';c.beginPath();c.ellipse(a.x,a.y,9,3,0,0,TAU);c.fill();c.globalAlpha=1;
  /* 칼: 휘두를 때 크게 돌아감 */const sw=T.clk-a.swT,ang=sw<.18?(-1.6+sw/.18*2.6):-.5,hx=a.x+a.face*5,hy=a.y-12;
  c.save();c.translate(hx,hy);c.scale(a.face,1);c.rotate(ang);c.fillStyle='#3a2a1a';c.fillRect(-1,-1,3,3);c.fillStyle=a.sw;c.fillRect(1,-.5,13,2);c.fillStyle='#ffffff';c.fillRect(1,-.5,13,.6);c.restore();
  if(sw<.16){c.save();c.globalAlpha=(1-sw/.16)*.7;c.strokeStyle=a.sw;c.lineWidth=2;c.beginPath();c.arc(hx,hy,15,a.face>0?-1.4:Math.PI-1.2+.0,a.face>0?1.2:Math.PI+1.4);c.stroke();c.restore()}
  if(out){if(a.face<0){c.translate(Math.round(X+40),Math.round(Y));c.scale(-1,1);c.drawImage(out,0,0,40,48)}else c.drawImage(out,Math.round(X),Math.round(Y),40,48)}
  c.restore();c.save();c.font='bold 5px sans-serif';c.textAlign='center';c.globalAlpha=.6;c.fillStyle='#000a';const w=c.measureText(a.nm).width+4;c.fillRect(a.x-w/2,a.y-50,w,7);c.fillStyle='#bfe6ff';c.fillText(a.nm,a.x,a.y-44.5);c.restore()}
 function fxDraw(c){const T=TW71.T;c.save();c.textAlign='center';
  for(const f of A.fx){const e=T.clk-f.t;if(f.k==='n'){c.globalAlpha=Math.max(0,1-e/.8);c.font='bold 6px sans-serif';c.fillStyle=f.c||'#fff';c.fillText(f.v,f.x,f.y-e*16)}
   else{const q=e/.7;c.globalAlpha=Math.max(0,1-q);c.strokeStyle=f.c;c.lineWidth=3;c.beginPath();c.ellipse(f.x,f.y,10+q*80,4+q*30,0,0,TAU);c.stroke();c.lineWidth=1.5;c.strokeStyle='#fff';c.beginPath();c.ellipse(f.x,f.y,6+q*60,3+q*22,0,0,TAU);c.stroke();
    if(e<.5){c.font='bold 7px sans-serif';c.fillStyle='#fff';c.fillText(f.nm+' 궁극기!',f.x,f.y-34-e*10)}}}
  c.restore()}
 /* 탑 그리기 목록에 동료 넣기 */
 if(window.TPET106&&TPET106.list){const f=TPET106.list;TPET106.list=function(L,now){const r=f.apply(this,arguments);try{if(A.on&&inWB()){for(const a of A.L)L.push({y:a.y,fn:()=>{try{body(a,ctx,now)}catch(e){}}});L.push({y:AY+AH+50,fn:()=>{try{fxDraw(ctx)}catch(e){}}})}}catch(e){}return r}}
 /* 매 프레임: 판이 바뀌면 다시 세우고 움직임 · 공격 · 위쪽에 「동료 29명」 */
 {const f=frame;frame=function(){const r=f.apply(this,arguments);try{const now=performance.now(),dt=Math.min(.05,(now-(A.last||now))/1000);A.last=now;
   if(inWB()){if(A.run!==R.run){A.run=R.run;spawn()}A.on=true;if(!paused)tick(dt);
    ctx.save();ctx.font='bold 7px sans-serif';ctx.textBaseline='middle';const t='🤝 동료 '+N+'명 · 동료 피해 '+Math.round(A.dmg).toLocaleString();const w=ctx.measureText(t).width+10;
    ctx.fillStyle='#05070acc';ctx.fillRect(AX,31,w,11);ctx.fillStyle='#8ad8ff';ctx.fillText(t,AX+5,36.5);ctx.restore();
    try{if(document.documentElement.classList.contains('phP')&&window.PV76&&PV76.paint)PV76.paint()}catch(e){}}
   else A.on=false}catch(e){}return r}}
 window.AL181={A,N,spawn};
}catch(e){console.error('AL181',e)}})();
