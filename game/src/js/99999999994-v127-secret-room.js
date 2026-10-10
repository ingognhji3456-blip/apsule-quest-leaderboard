/* ================= v127 비밀의 방 · 열쇠지기 클라비스 (SEC127) =================
   ① 광장 왼쪽 나무 뒤에 녹슨 열쇠가 숨어 있다(가끔 반짝). 가까이 가면 줍는다.
   ② 탑 10F 보스전에서 열쇠를 가진 채 K(폰은 「🗝 열쇠」 단추) → 보스가 꺼지는 연출과 함께 전투가 멈추고
      경기장 맨 위 벽의 문이 열린다 → 비밀 복도를 쭉 올라가면 → 열쇠지기의 방
   ③ 방의 주인 「클라비스」(캐릭터 모습의 보스, 거울 하루 공격 틀 · 체력 ×1.8)를 쓰러뜨리면
      신화 캐릭터 클라비스가 상점(태엽 공방 · 캐릭터)에 나타난다. 얻기만 하고, 쓰려면 🪙로 사야 한다.
   기록: saveData.sec127 = {key:1(주움), beat:처음 이긴 시각}
   모드: mode='sec127'(꺼짐 · 문 · 복도 · 방 연출을 이 파일이 직접 그림) */
(()=>{try{
 const $=id=>document.getElementById(id),E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const sfx=k=>{try{gmSfx(k)}catch(e){}},save=()=>{try{saveNow()}catch(e){}},TAU=Math.PI*2;
 const SV=()=>saveData.sec127||(saveData.sec127={key:0,beat:0});
 const pop=(ic,t,s)=>{try{if(window.EGG126&&EGG126.pop)return EGG126.pop(ic,t,s)}catch(e){}try{banner(t)}catch(e){}};

 /* ---------- 신화 캐릭터 클라비스 ---------- */
 const NG=window.NG82;const IDX=CHARS.length;
 const S={skin:'#f4e4d4',hair:'#e8e0ff',hairStyle:'long',hat:'crown',top:'#2a1a4a',style:'armor',acc:'#ffd84a',cape:'#3a1a6a',pants:'#1a1030',boot:'#120a20',eye:'#ffd84a',
  fx:(Q,b,t)=>{try{for(let i=0;i<5;i++){const a=t*1.6+i*TAU/5,x=14+Math.cos(a)*13,y=20+b+Math.sin(a)*5;Q.px(Math.round(x),Math.round(y),i%2?'#ffd84a':'#c9a8ff',.55+.4*Math.sin(t*4+i))}}catch(e){}}};
 CHARS.push({name:'클라비스',sub:'비밀의 열쇠지기',price:30000,hp:236,dash:12,abl:{blink:1,counter:1},critAdd:.06,grade:'myth',myth:1,v100:1,sec127:1,scarf:null,hero:false,
  desc:'탑 10층 벽 너머 비밀의 방을 지키던 열쇠지기. 순간이동으로 피하고, 막는 순간 되받아친다.'});
 if(NG&&NG.paintChar)CH2DEF[IDX]={__v44:1,paint:NG.paintChar(S)};

 /* 상점: 쓰러뜨리기 전에는 진열대에 없음 */
 const hideCard=()=>{try{if(SV().beat)return;const cv=document.querySelector('#shopGrid canvas[data-k="ch"][data-i="'+IDX+'"]');if(!cv)return;let el=cv;while(el.parentElement&&el.parentElement.id!=='shopGrid')el=el.parentElement;if(el.style.display!=='none')el.style.display='none'}catch(e){}};
 {const f=renderShop;renderShop=function(){const r=f.apply(this,arguments);hideCard();return r}}
 setInterval(hideCard,700);

 /* 비밀 도감에 두 줄 */
 try{if(window.EGG126&&EGG126.EG){EGG126.EG.push({id:'key',ic:'🗝',n:'녹슨 열쇠',hint:'광장 가장자리, 나무 그늘에서 무언가 반짝여요.',how:'광장 왼쪽 나무 뒤에서 열쇠 줍기',dia:5},
   {id:'sec',ic:'🚪',n:'열쇠지기의 방',hint:'열쇠는 어딘가의 10층에서 쓰는 것 같아요…',how:'탑 10F 보스전에서 열쇠를 가진 채 K(폰은 🗝 단추) → 비밀 복도 → 클라비스 쓰러뜨리기',dia:50})}}catch(e){}
 const found=id=>{try{return window.EGG126&&EGG126.found(id)}catch(e){return false}};

 /* ---------- ① 광장의 열쇠 ---------- */
 const KEYP={x:84,y:404};
 function drawKey(c,x,y,t){const g=.5+.5*Math.sin(t*2.2);c.save();c.fillStyle='#000';c.globalAlpha=.35;c.fillRect(x-4,y+2,9,2);c.globalAlpha=1;
  const P1='#b8862a',P2='#e8c060';c.fillStyle=P1;c.fillRect(x-4,y-3,4,4);c.fillStyle='#2a1a08';c.fillRect(x-3,y-2,2,2);c.fillStyle=P2;c.fillRect(x,y-2,5,1);c.fillRect(x+3,y-1,1,2);c.fillRect(x+5,y-1,1,1);
  const sp=(t*.5)%3;if(sp<.5){const k=Math.sin(sp/.5*Math.PI);c.globalAlpha=k;c.fillStyle='#fff8d0';c.fillRect(x+1,y-6,1,7);c.fillRect(x-2,y-3,7,1);c.globalAlpha=k*.4;c.fillRect(x-1,y-5,5,5)}c.restore()}
 if(window.PLZART&&PLZART.objs){const f=PLZART.objs;PLZART.objs=function(now){const L=f.apply(this,arguments)||[];try{if(!SV().key)L.push({y:KEYP.y,fn:()=>drawKey(ctx,KEYP.x,KEYP.y,now/1000)})}catch(e){}return L}}
 setInterval(()=>{try{if(mode!=='plaza'||SV().key)return;if(Math.hypot(P.x-KEYP.x,(P.y-KEYP.y)*1.4)<20){SV().key=1;save();sfx('ok');found('key');pop('🗝','녹슨 열쇠를 주웠어요','어딘가의 10층에서 쓸 수 있을 것 같아요… (K)')}}catch(e){}},120);

 /* ---------- ② 10F 보스전에서 열쇠 ---------- */
 const can=()=>{try{return SV().key&&!SQ&&mode==='boss'&&G&&G.tw71&&G.tw71.f===10&&G.state==='play'&&!G.cine&&!paused&&!(window.DUO85&&T71duo())}catch(e){return false}};
 const T71duo=()=>{try{return TW71.T&&TW71.T.duo}catch(e){return false}};
 let kT=0;addEventListener('keydown',e=>{if(e.code==='KeyK'){kT=performance.now();if(can()){e.preventDefault();e.stopImmediatePropagation();useKey()}}},true);
 {const f=doDash;doDash=function(){let kd=false;try{kd=K.has('KeyK')}catch(e){}if((kd||performance.now()-kT<60)&&can()){useKey();return}return f.apply(this,arguments)}}
 const kb=document.createElement('button');kb.id='key127';kb.hidden=true;kb.textContent='🗝 열쇠';document.body.appendChild(kb);
 kb.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();if(can())useKey()});
 setInterval(()=>{const on=can()&&(matchMedia('(pointer:coarse)').matches||document.documentElement.classList.contains('ph'));if(kb.hidden===on)kb.hidden=!on},250);

 let SQ=null;
 function useKey(){const now=performance.now();SQ={ph:'off',t0:now,frz:now,hx:P.x,hy:P.y,bx:(G.boss&&G.boss.x)||W/2,by:((G.boss&&G.boss.y)||AY+AH*.6)-58/* G.boss는 발밑 */,parts:[],cy:0,py:0,px:0,walkT:0};
  lastT=now;try{mus.on=false}catch(e){}try{G.tw71.done=1}catch(e){}mode='sec127';kb.hidden=true;try{sfx('no');perc&&perc('crash',audio.currentTime)}catch(e){}}

 /* ---------- 그리기 도우미 ---------- */
 function hero(x,y,fl,walk,t){const om=mode;mode='village';try{drawSword(x-12,y-19,2,fl,performance.now());drawKnight(ctx,x-12,y-19,2,fl,walk?t*10:null,walk?null:t*2.3)}catch(e){}finally{mode=om}}
 function txt(s,x,y,sz,col,al){ctx.save();ctx.globalAlpha=al==null?1:al;ctx.font='900 '+sz+'px sans-serif';ctx.textAlign='center';ctx.fillStyle='#000';ctx.fillText(s,x+1,y+1);ctx.fillStyle=col;ctx.fillText(s,x,y);ctx.restore()}
 const DOORX=W/2,DOORY=AY;
 function door(open,t){const x=DOORX,y=DOORY,w=40,h=34;ctx.save();
  ctx.fillStyle='#3a3448';ctx.fillRect(x-w/2-6,y-10,w+12,h+10);ctx.fillStyle='#5a5470';ctx.fillRect(x-w/2-6,y-10,w+12,3);
  ctx.fillStyle='#08060e';ctx.fillRect(x-w/2,y-6,w,h+6);
  if(open>0){const g=ctx.createLinearGradient(0,y-6,0,y+h);g.addColorStop(0,'rgba(201,168,255,'+(.5*open)+')');g.addColorStop(1,'rgba(201,168,255,0)');ctx.fillStyle=g;ctx.fillRect(x-w/2,y-6,w,h+6);
   for(let i=0;i<4;i++){ctx.fillStyle='rgba(255,216,74,'+(.25*open)+')';ctx.fillRect(x-w/2+5+i*9,y-4+((t*14+i*7)%30),1,4)}}
  const half=w/2*(1-open);ctx.fillStyle='#4a3a2a';ctx.fillRect(x-w/2,y-6,half,h+6);ctx.fillRect(x+w/2-half,y-6,half,h+6);
  ctx.fillStyle='#6a5236';for(let k=0;k<3;k++){ctx.fillRect(x-w/2,y+2+k*10,half,2);ctx.fillRect(x+w/2-half,y+2+k*10,half,2)}
  if(open<.05){ctx.fillStyle='#ffd84a';ctx.fillRect(x-2,y+10,4,5);ctx.fillStyle='#2a1a08';ctx.fillRect(x-1,y+11,2,2)}
  ctx.restore()}

 /* ---------- 장면 ---------- */
 const CL=900;/* 복도 길이 */
 function tick(now,dt){const t=(now-SQ.t0)/1000;ctx.setTransform(SS,0,0,SS,0,0);ctx.imageSmoothingEnabled=false;
  if(SQ.ph==='off'||SQ.ph==='door'||SQ.ph==='walk'){
   /* 멈춘 전투 장면을 그대로(시간을 멈춘 채) */
   try{drawScene(SQ.frz)}catch(e){}ctx.setTransform(SS,0,0,SS,0,0);
   if(SQ.ph==='off'){const k=Math.min(1,t/2.4);
    /* 보스 전원 꺼짐: 깜빡임 → 색이 빠짐 → 어두워짐 */
    const fl=t<1.4?(Math.random()<.35?1:0):0;ctx.save();ctx.globalCompositeOperation='saturation';ctx.fillStyle='rgba(128,128,128,'+Math.min(1,k*1.4)+')';ctx.beginPath();ctx.arc(SQ.bx,SQ.by,82,0,TAU);ctx.fill();ctx.restore();
    ctx.save();ctx.fillStyle='rgba(0,0,10,'+(k*.5+fl*.25)+')';ctx.beginPath();ctx.arc(SQ.bx,SQ.by,82,0,TAU);ctx.fill();ctx.restore();
    if(Math.random()<.5)SQ.parts.push({x:SQ.bx+(Math.random()-.5)*60,y:SQ.by+(Math.random()-.5)*50,vx:(Math.random()-.5)*60,vy:-20-Math.random()*40,l:0});
    ctx.save();for(const p of SQ.parts){p.l+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=120*dt;ctx.globalAlpha=Math.max(0,1-p.l/.8);ctx.fillStyle=Math.random()<.5?'#ffe36b':'#8ad0ff';ctx.fillRect(p.x,p.y,2,2)}ctx.restore();SQ.parts=SQ.parts.filter(p=>p.l<.8);
    if(t<1.6&&Math.random()<.3){ctx.save();ctx.strokeStyle='#bfe8ff';ctx.lineWidth=1;ctx.beginPath();let x=SQ.bx-30+Math.random()*60,y=SQ.by-30;ctx.moveTo(x,y);for(let i=0;i<5;i++){x+=(Math.random()-.5)*14;y+=12;ctx.lineTo(x,y)}ctx.stroke();ctx.restore()}
    txt('SYSTEM SHUTDOWN',W/2,H/2-10,20,'#ff4d6d',(Math.sin(t*12)>0?1:.35));txt('열쇠가 보스의 심장을 멈췄다…',W/2,H/2+8,9,'#e8eef6',Math.min(1,t));
    if(t>2.6){SQ.ph='door';SQ.t0=now;try{sfx('move')}catch(e){}}}
   else if(SQ.ph==='door'){const k=Math.min(1,t/2.2),sh=k<1?(Math.random()-.5)*3*(1-k):0;ctx.save();ctx.translate(sh,0);door(k,t);ctx.restore();
    ctx.save();ctx.fillStyle='rgba(0,0,10,.35)';ctx.beginPath();ctx.arc(SQ.bx,SQ.by,82,0,TAU);ctx.fill();ctx.restore();
    if(Math.random()<.6){SQ.parts.push({x:DOORX+(Math.random()-.5)*50,y:DOORY+30,vx:(Math.random()-.5)*30,vy:10+Math.random()*20,l:0})}ctx.save();ctx.fillStyle='#a89a80';for(const p of SQ.parts){p.l+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;ctx.globalAlpha=Math.max(0,.7-p.l);ctx.fillRect(p.x,p.y,1.5,1.5)}ctx.restore();SQ.parts=SQ.parts.filter(p=>p.l<.7);
    txt('끼이이익…',DOORX,DOORY+52,10,'#ffe9a8',Math.min(1,t*2));txt('경기장 위쪽 벽에 문이 열렸다!',W/2,H-40,10,'#c9a8ff',Math.min(1,t));
    if(t>2.6){SQ.ph='walk';SQ.t0=now}}
   else{/* 문까지 걸어감 */const k=Math.min(1,t/1.6),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;door(1,t);
    /* 원래 캐릭터는 그대로 그려지므로 전투 장면 위에 덮어서 다시 그림 */
    const x=SQ.hx+(DOORX-SQ.hx)*e,y=SQ.hy+(DOORY+30-SQ.hy)*e;try{P.x=x;P.y=y}catch(_){}
    if(t>1.9){const a=Math.min(1,(t-1.9)/.5);ctx.fillStyle='rgba(0,0,0,'+a+')';ctx.fillRect(0,0,W,H)}
    if(t>2.4){SQ.ph='corr';SQ.t0=now;SQ.py=CL-30;SQ.px=0}}}
  else if(SQ.ph==='corr'){
   /* 비밀 복도: 아래에서 위로 쭉 */
   let [mx,my]=moveInput();if(SQ.hold)my=-1;const sp=70;SQ.px=Math.max(-36,Math.min(36,SQ.px+mx*sp*dt));SQ.py=Math.max(20,Math.min(CL-20,SQ.py+my*sp*dt));const walking=Math.abs(mx)+Math.abs(my)>.1;if(walking)SQ.walkT+=dt;
   const cam=Math.max(0,Math.min(CL-H,SQ.py-H*.6));ctx.fillStyle='#07060c';ctx.fillRect(0,0,W,H);
   ctx.save();ctx.translate(0,-cam);const cx=W/2,hw=56;
   /* 바닥 */for(let y=Math.floor(cam/16)*16;y<cam+H+16;y+=16){ctx.fillStyle=(y/16)%2?'#1c1828':'#211c2e';ctx.fillRect(cx-hw,y,hw*2,16);ctx.fillStyle='#2a2438';ctx.fillRect(cx-hw,y,hw*2,1)}
   const g=ctx.createLinearGradient(cx-hw,0,cx+hw,0);g.addColorStop(0,'rgba(0,0,0,.6)');g.addColorStop(.25,'rgba(0,0,0,0)');g.addColorStop(.75,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.6)');ctx.fillStyle=g;ctx.fillRect(cx-hw,cam,hw*2,H);
   /* 벽 · 횃불 · 깃발 */for(const s of [-1,1]){ctx.fillStyle='#2e2840';ctx.fillRect(s<0?cx-hw-40:cx+hw,cam,40,H);ctx.fillStyle='#3a3450';for(let y=Math.floor(cam/12)*12;y<cam+H;y+=12)ctx.fillRect(s<0?cx-hw-40+((y/12)%2)*8:cx+hw+((y/12)%2)*8,y,30,1);
    for(let y=60;y<CL;y+=110){const tx=s<0?cx-hw-4:cx+hw+4,fl=Math.sin(now/90+y)*1.5;ctx.fillStyle='#4a3a2a';ctx.fillRect(tx-1,y,2,7);const gg=ctx.createRadialGradient(tx,y-3,1,tx,y-3,42);gg.addColorStop(0,'rgba(255,190,90,.35)');gg.addColorStop(1,'rgba(255,190,90,0)');ctx.fillStyle=gg;ctx.fillRect(tx-42,y-45,84,84);ctx.fillStyle='#ffb84a';ctx.fillRect(tx-2,y-5+fl*.3,4,5);ctx.fillStyle='#fff0b0';ctx.fillRect(tx-1,y-4+fl*.3,2,3)}
    for(let y=115;y<CL-120;y+=220){const bx=s<0?cx-hw-30:cx+hw+12;ctx.fillStyle='#3a1a6a';ctx.fillRect(bx,y,18,30);ctx.fillStyle='#ffd84a';ctx.fillRect(bx+6,y+8,6,3);ctx.fillRect(bx+8,y+11,2,8);ctx.fillRect(bx+8,y+16,4,2);ctx.fillStyle='#3a1a6a';ctx.beginPath();ctx.moveTo(bx,y+30);ctx.lineTo(bx+9,y+24);ctx.lineTo(bx+18,y+30);ctx.fill()}}
   /* 위쪽 끝: 방의 문 */const dy=34;ctx.fillStyle='#0a0812';ctx.fillRect(cx-hw,0,hw*2,dy+6);ctx.fillStyle='#4a3a6a';ctx.fillRect(cx-26,dy-28,52,34);ctx.fillStyle='#120c1e';ctx.fillRect(cx-20,dy-22,40,28);
   const pul=.5+.5*Math.sin(now/300);ctx.fillStyle='rgba(201,168,255,'+(.25+.25*pul)+')';ctx.fillRect(cx-20,dy-22,40,28);ctx.fillStyle='#ffd84a';ctx.fillRect(cx-3,dy-12,6,6);ctx.fillStyle='#2a1a08';ctx.fillRect(cx-1,dy-10,2,2);
   txt('열쇠지기의 방',cx,dy-32,9,'#e6d4ff');
   /* 떠다니는 먼지 */for(let i=0;i<24;i++){const y=(i*97+now/40)%CL,x=cx-hw+((i*53)%(hw*2));ctx.fillStyle='rgba(220,210,255,.25)';ctx.fillRect(x,CL-y,1,1)}
   hero(cx+SQ.px,SQ.py,mx<0,walking,SQ.walkT);ctx.restore();
   /* 비네트 */const vg=ctx.createRadialGradient(W/2,H*.6,40,W/2,H*.6,260);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.75)');ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
   if(t<.6){ctx.fillStyle='rgba(0,0,0,'+(1-t/.6)+')';ctx.fillRect(0,0,W,H)}
   if(SQ.py>CL-140)txt('▲ 위쪽(↑ · W)으로 쭉 걸어가세요 · 폰은 화면을 누르고 있기',W/2,H-14,9,'#e8eef6',.6+.4*Math.sin(now/300));
   if(SQ.py<dy+26){SQ.ph='room';SQ.t0=now;try{sfx('ok')}catch(e){}}}
  else if(SQ.ph==='room'){
   ctx.fillStyle='#06040c';ctx.fillRect(0,0,W,H);const k=Math.min(1,t/1.2);
   const g=ctx.createRadialGradient(W/2,H*.55,10,W/2,H*.55,220);g.addColorStop(0,'rgba(120,80,200,'+(.45*k)+')');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
   ctx.save();ctx.translate(W/2,H*.7);ctx.scale(1,.3);ctx.strokeStyle='rgba(255,216,74,'+(.6*k)+')';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,70,0,TAU);ctx.stroke();ctx.rotate(now/2000);ctx.strokeStyle='rgba(201,168,255,'+(.5*k)+')';for(let i=0;i<8;i++){ctx.rotate(TAU/8);ctx.beginPath();ctx.moveTo(40,0);ctx.lineTo(62,0);ctx.stroke()}ctx.restore();
   try{const img=ch2Render(IDX,0,0,false,now/1000);ctx.globalAlpha=k;ctx.drawImage(img,0,0,40,48,W/2-40,H*.7-92+Math.sin(now/500)*2,80,96);ctx.globalAlpha=1}catch(e){}
   for(let i=0;i<14;i++){const a=now/1500+i*TAU/14;ctx.fillStyle=i%2?'#ffd84a':'#c9a8ff';ctx.globalAlpha=.5*k;ctx.fillRect(W/2+Math.cos(a)*90,H*.5+Math.sin(a)*40,2,2)}ctx.globalAlpha=1;
   txt('비밀의 열쇠지기 · 클라비스',W/2,52,16,'#ffd84a',k);
   if(t>1.2)txt('「…열쇠를 가져온 자인가. 그렇다면 증명해 봐라.」',W/2,74,10,'#e6d4ff',Math.min(1,(t-1.2)*2));
   if(t>3.6){SQ.ph='fight';startFight()}}}

 /* ---------- ③ 클라비스와 싸움 (거울 하루의 공격 틀을 빌림) ---------- */
 const A9=()=>window.S7ART&&S7ART[9];let saved=null;
 function startFight(){const a=A9();if(a&&!saved){saved={name:a.name,en:a.en,c:a.c};a.name='클라비스 · 비밀의 열쇠지기';a.en='CLAVIS · KEYKEEPER';a.c='#ffd84a'}
  window.__sec127=1;try{TW71.grant(68)}catch(e){}SQ=null;mode='boss';try{s7Fight(9,'rush')}catch(e){console.error(e);restore();toLobby()}try{if(G)G.sec127=1}catch(e){}setTimeout(()=>{window.__sec127=0},1500)}
 function restore(){const a=A9();if(a&&saved){a.name=saved.name;a.en=saved.en;a.c=saved.c}saved=null}
 /* 보스 그림: 거울 하루 대신 클라비스 */
 try{const R=MON.reg,base=R.c_s7_mharu;if(base)R.c_s7_mharu=A=>{if(!(typeof G!=='undefined'&&G&&G.sec127&&mode==='boss'))return base(A);
   const M=MON,D=M.D,OX=M.OX,OY=M.OY,b=(A.bob||0)*.5;A.E(0,1,16,1.8,'#000',.4);A.C(0,-22+b,20,'#c9a8ff',.12);A.C(0,-22+b,14,'#ffd84a',.08);
   try{const img=ch2Render(IDX,0,0,false,A.t);const S2=A.c;S2.imageSmoothingEnabled=false;S2.drawImage(img,0,0,40,48,Math.round((-20+OX)*D),Math.round((-47+b+OY)*D),40*D,48*D)}catch(e){}}}catch(e){}
 {const _ds=drawScene;drawScene=function(now){const r=_ds.apply(this,arguments);try{if(G&&!G.sec127&&window.__sec127&&mode==='boss')G.sec127=1;
   if(G&&G.sec127&&!G._s127&&G.maxHp>0&&G.state!=='result'){G._s127f=(G._s127f||0)+1;if(G._hp54||G._s127f>3){G._s127=1;G.hp=Math.round(G.hp*1.8);G.maxHp=Math.round(G.maxHp*1.8);G.hpShow=G.hp/G.maxHp;G._barLast=undefined}}}catch(e){}return r}}
 {const _fe=fightEnd;fightEnd=function(won){const g=G,r=_fe.apply(this,arguments);try{if(g&&g.sec127&&!g._s127end){g._s127end=1;restore();const t0=performance.now();
   const after=()=>{const ov=$('overlay');if((!ov||ov.hidden)&&performance.now()-t0<5000)return void setTimeout(after,250);
    if(won){const s=SV(),first=!s.beat;if(first){s.beat=Date.now();save()}found('sec');
     showOverlay('비밀의 방 · CLEAR','열쇠지기 클라비스를 쓰러뜨렸어요!',(first?'<b style="color:#ff4d6d">✪ 신화 캐릭터 「클라비스」</b>가 상점(캐릭터)에 나타났어요.<br>쓰려면 🪙 30,000으로 사야 해요.':'클라비스는 이미 상점에 있어요.')+'<br><small style="opacity:.75">순간이동으로 피하고, 막는 순간 되받아치는 비밀의 열쇠지기.</small>',
      [['🛒 상점에서 보기',()=>{$('overlay').hidden=true;try{toLobby()}catch(e){}setTimeout(()=>{try{openShop('ch');WS.sel.ch=IDX;renderShop();const cv=document.querySelector('#shopGrid canvas[data-i="'+IDX+'"]');cv&&cv.scrollIntoView({block:'center'})}catch(e){}},300)},true],['▲ 10F 다시',()=>{$('overlay').hidden=true;try{TW71.start(10)}catch(e){}},false],['로비로',()=>{$('overlay').hidden=true;toLobby()},false]])}
    else showOverlay('비밀의 방','클라비스에게 졌어요','열쇠는 그대로 있어요. 탑 10F 보스전에서 다시 K를 눌러 도전할 수 있어요.',[['▲ 10F로',()=>{$('overlay').hidden=true;try{TW71.start(10)}catch(e){}},true],['로비로',()=>{$('overlay').hidden=true;toLobby()},false]])};
   setTimeout(after,600)}}catch(e){}return r}}

 /* ---------- 메인 루프 ---------- */
 let lastT=performance.now();
 {const _f=frame;frame=function(){if(mode!=='sec127'||!SQ)return _f.apply(this,arguments);const now=performance.now(),dt=Math.min((now-lastT)/1000,.05)||0;lastT=now;try{last=now}catch(e){}
  try{tick(now,dt)}catch(e){console.error('sec127',e)}try{if(window.PV76&&PV76.paint)PV76.paint()}catch(e){}requestAnimationFrame(frame)}}
 /* 폰: 화면을 누르고 있으면 앞으로 걷기 */
 document.addEventListener('pointerdown',()=>{if(SQ&&SQ.ph==='corr')SQ.hold=true},true);document.addEventListener('pointerup',()=>{if(SQ)SQ.hold=false},true);document.addEventListener('pointercancel',()=>{if(SQ)SQ.hold=false},true);
 {const f=toLobby;toLobby=function(){if(mode==='sec127'){SQ=null;mode='boss'}return f.apply(this,arguments)}}

 const st=document.createElement('style');st.textContent=`#key127{position:fixed;left:50%;bottom:calc(120px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:9400;padding:12px 22px;border:0;border-radius:999px;font:900 17px/1 sans-serif;color:#2a1c08;background:linear-gradient(180deg,#ffe58a,#e0a83a);box-shadow:0 0 0 2px #fff9,0 0 24px #ffd84aaa;animation:eg126c 1.4s ease-in-out infinite}#key127[hidden]{display:none}`;document.head.appendChild(st);
 window.SEC127={IDX,useKey,KEYP,SV,startFight,get SQ(){return SQ}};
}catch(e){console.error('v127 secret room',e)}})();
