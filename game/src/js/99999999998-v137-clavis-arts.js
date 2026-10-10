/* v137: 클라비스 열쇠 검술 (CA137)
   ① 보스 클라비스(비밀의 방 결투)의 새 기술 5가지 — 99999999994 foeAI가 CA137.pick/state, drawFoe가 CA137.drawFoe를 부른다.
      열쇠 회오리 베기(k_spin) · 열쇠 투척(k_throw, 부메랑) · 자물쇠 감옥(k_cage, 발밑) · 연속 찌르기(k_thrust, 3번) · 열쇠 비(k_rain, 분노 때만)
   ② 클라비스 캐릭터를 끼고 싸우면 같은 기술을 「스킬」로 씀(보스보다 약함) — 탑 · 보스전 · 결투 · 던전 어디서나.
      열쇠 회오리(6번째 공격마다) · 열쇠 투척(5초마다) · 자물쇠 감옥(패링 성공 때) · 연속 찌르기(대시할 때)
      스킬 칩 · 상점 설명은 MYTH100.ABL에 넣어 그대로 나온다. 대신 클라비스 캐릭터 기본 능력치는 조금 낮춤(체력 236→220, 치명 +6%→+4%). */
(function(){try{
 const now0=()=>performance.now();
 const snd=(f,d,w,v,e)=>{try{sfx(f,d,w,v,e)}catch(_){}};
 const KEYC='#ffd84a',KEYL='#fff3b0',KEYD='#a07a20';
 /* 열쇠 그림(게임 좌표) */
 function drawKey(o,x,y,a,sc,al,col){o.save();o.translate(x,y);o.rotate(a);o.scale(sc,sc);o.globalAlpha=al==null?1:al;
  o.fillStyle=KEYD;o.beginPath();o.arc(-5,0,3.6,0,TAU);o.fill();o.fillStyle=col||KEYC;o.beginPath();o.arc(-5,0,2.8,0,TAU);o.fill();o.fillStyle='#05070a';o.beginPath();o.arc(-5,0,1.1,0,TAU);o.fill();
  o.fillStyle=col||KEYC;o.fillRect(-2.4,-.9,9,1.8);o.fillRect(4,0,1.4,2.6);o.fillRect(6,0,1.2,2);o.fillStyle=KEYL;o.fillRect(-2.4,-.9,9,.6);o.restore()}

 /* ================= ① 보스 클라비스의 새 기술 ================= */
 let KEYS=[],ZONES=[],CAGES=[],LF=null,LT=0;
 const K=()=>window.SEC127&&SEC127.kit;
 function reset(f){KEYS=[];ZONES=[];CAGES=[];LF=f;f.artCd=1800}
 function pick(f,now,d){const k=K();if(!k)return false;if(LF!==f)reset(f);if((f.artCd||0)>0)return false;const r=Math.random(),ph=f.ph2;let s=null;
  if(ph&&r<.22)s='k_rain';
  else if(d<52)s=r<.55?'k_spin':r<.85?'k_thrust':null;
  else if(d<150)s=r<.4?'k_throw':r<.7?'k_cage':r<.9?'k_thrust':null;
  else s=r<.6?'k_throw':'k_cage';
  if(!s)return false;f.st=s;f.t=now;f.kq={n:0};f.artCd=ph?1700:2600;f.walk=false;
  if(s==='k_cage'){f.kq.x=P.x;f.kq.y=P.y}
  try{k.snd(s==='k_spin'?520:s==='k_throw'?900:s==='k_cage'?300:s==='k_rain'?1200:700,.12,'triangle',.04,s==='k_cage'?180:1400)}catch(e){}
  return true}
 const WD={k_spin:[480,380],k_throw:[380,300],k_cage:[700,560],k_thrust:[150,115],k_rain:[320,260]};
 function wd(f){const w=WD[f.st];return w?w[f.ph2?1:0]:400}
 function state(f,now,dt){const k=K();if(!k)return false;if(LF!==f)reset(f);
  if(f.st==='idle'||f.st==='wind'||f.st==='slash')f.artCd=(f.artCd||0)-dt*1000;
  if(!f.st||f.st.slice(0,2)!=='k_')return false;
  const m=k.DM()*(f.ph2?1.15:1),dx=P.x-f.x,dy=P.y-f.y,d=Math.hypot(dx,dy),e=now-f.t,W=wd(f),q=f.kq;
  const end=cd=>{f.st='idle';f.cd=cd;f.goal=null;f.kq=null};
  if(f.st==='k_spin'){if(e<W){f.face={x:Math.sign(dx)||f.face.x,y:0};return true}
   const a=e-W;f.face={x:Math.floor(a/60)%2?-1:1,y:0};
   if(q.n<3&&a>=q.n*170){q.n++;const aa=a/80;for(let i=0;i<3;i++)k.slashFx(f.x+Math.cos(aa+i*2.1)*14,f.y-9+Math.sin(aa+i*2.1)*9,aa+i*2.1+1.57,KEYC);k.snd(380+q.n*90,.08,'sawtooth',.05,160);
    if(d<48){const r=k.hitMe(Math.round(9*m),Math.atan2(dy,dx),now,{iv:150,kb:6});if(r==='parry'){q.n=9;return true}}}
   if(a>520)end(600);return true}
  if(f.st==='k_throw'){if(e<W){f.face={x:Math.sign(dx)||f.face.x,y:0};f.aa=Math.atan2(dy,dx);return true}
   if(!q.thrown){q.thrown=1;const n=f.ph2?5:3,base=Math.atan2(P.y-6-(f.y-12),P.x-f.x);f.lungeT=now;f.lungeA=base;for(let i=0;i<n;i++){const a=base+(i-(n-1)/2)*.32;KEYS.push({x:f.x,y:f.y-12,vx:Math.cos(a)*230,vy:Math.sin(a)*230,t:now,back:0,dmg:Math.round(8*m),hit:0,mine:0,rot:0})}k.snd(900,.1,'square',.04,1600)}
   if(e>W+420)end(500);return true}
  if(f.st==='k_cage'){if(e<W){f.face={x:Math.sign(q.x-f.x)||f.face.x,y:0};return true}
   if(!q.sprung){q.sprung=1;CAGES.push({x:q.x,y:q.y,t:now});k.snd(220,.25,'square',.06,90);k.spark(q.x,q.y-8,KEYC,16);
    if(Math.hypot(P.x-q.x,(P.y-q.y)*1.4)<24){const r=k.hitMe(Math.round(13*m),null,now,{parry:false});if(r==='hit'){P._stun127=now+650;k.dpop(P.x,P.y-46,'🔒 갇힘!','#c9a8ff')}}}
   if(e>W+380)end(500);return true}
  if(f.st==='k_thrust'){const per=W+150,i=Math.floor(e/per),ph=e-i*per;if(i>=3){end(650);return true}
   if(ph<W){f.face={x:Math.sign(dx)||f.face.x,y:0};q.aa=Math.atan2(dy,dx);return true}
   if(q.n<=i){q.n=i+1;const aa=q.aa;f.lungeT=now;f.lungeA=aa;f.x+=Math.cos(aa)*14;f.y+=Math.sin(aa)*14;k.clampB(f);k.slashFx(f.x+Math.cos(aa)*14,f.y-9+Math.sin(aa)*14,aa,i===2?'#ffb060':KEYC);k.snd(600+i*120,.06,'sawtooth',.05,240);
    const hx=P.x-f.x,hy=P.y-f.y;if(Math.hypot(hx,hy)<36&&Math.abs(Math.atan2(Math.sin(Math.atan2(hy,hx)-aa),Math.cos(Math.atan2(hy,hx)-aa)))<.6){const r=k.hitMe(Math.round((i===2?11:8)*m),aa,now,{iv:120,kb:i===2?12:5});if(r==='parry')return true}}
   return true}
  if(f.st==='k_rain'){if(e<W){f.face={x:Math.sign(dx)||f.face.x,y:0};return true}
   if(!q.cast){q.cast=1;const B=k.B;for(let i=0;i<6;i++){const a=Math.random()*TAU,R=i?24+Math.random()*60:0,x=Math.max(B.BX0,Math.min(B.BX1,P.x+Math.cos(a)*R)),y=Math.max(B.BY0,Math.min(B.BY1,P.y+Math.sin(a)*R*.7));ZONES.push({x,y,r:16,t0:now,t1:now+650+i*90,dmg:Math.round(10*m)})}k.snd(1300,.2,'sine',.04,600)}
   if(e>W+380)end(700);return true}
  end(500);return true}
 /* 날아다니는 것: 열쇠(부메랑) · 열쇠 비 · 자물쇠 감옥 — drawFoe가 매 프레임 부름 */
 function tick(f,now){const k=K();if(!k)return;const dt=Math.min(.05,(now-(LT||now))/1000);LT=now;const stop=now<((k&&SEC127.SQ&&SEC127.SQ.stop)||0);const sdt=stop?0:dt;
  for(const s of KEYS){s.rot+=sdt*14;const age=(now-s.t)/1000;
   if(!s.back&&(age>.75)){s.back=1}
   if(s.back){const tx=s.mine?f.x:f.x,ty=f.y-12,dx=tx-s.x,dy=ty-s.y,l=Math.hypot(dx,dy)||1;s.vx+=dx/l*1300*sdt;s.vy+=dy/l*1300*sdt;const sp=Math.hypot(s.vx,s.vy),mx=280;if(sp>mx){s.vx*=mx/sp;s.vy*=mx/sp}if(l<12)s.dead=1}
   s.x+=s.vx*sdt;s.y+=s.vy*sdt;
   if(!s.mine&&s.hit<2&&now-(s.hT||0)>300&&Math.hypot(P.x-s.x,P.y-10-s.y)<11&&f.st!=='dead'){s.hT=now;const r=k.hitMe(s.dmg,Math.atan2(s.vy,s.vx),now,{stun:false,iv:300,kb:5});if(r==='parry'){s.mine=1;s.back=1;s.vx*=-1.2;s.vy*=-1.2;k.dpop(P.x,P.y-46,'되받아침!','#ffe79a')}else s.hit++}
   if(s.mine&&!s.hurtF&&Math.hypot(f.x-s.x,f.y-12-s.y)<14&&f.hp>0){s.hurtF=1;s.dead=1;try{SK130.hitMob(f,Math.max(20,Math.round(f.mx*.015)),KEYC,'🗝')}catch(e){f.hp-=20}}
   if(age>3)s.dead=1}
  KEYS=KEYS.filter(s=>!s.dead);
  for(const z of ZONES){if(!z.done&&now>=z.t1){z.done=1;k.spark(z.x,z.y-4,KEYC,8);k.snd(500,.08,'square',.04,200);try{perc&&perc('snare',audio.currentTime,.25)}catch(e){}if(Math.hypot(P.x-z.x,(P.y-z.y)*1.4)<z.r)k.hitMe(z.dmg,null,now,{parry:false,iv:250})}}
  ZONES=ZONES.filter(z=>now<z.t1+300);CAGES=CAGES.filter(c=>now-c.t<650)}
 function drawFoe(f,now){if(LF!==f)reset(f);tick(f,now);const o=ctx,e=now-f.t,W=wd(f),q=f.kq||{};o.save();
  /* 준비 표시 */if(f.st&&f.st.slice(0,2)==='k_'){const k=Math.min(1,e/W);
   if(e<W){o.globalAlpha=.6+.4*Math.sin(now/40);try{SEC127.kit.txt('!',f.x,f.y-40,14,'#ffd84a')}catch(_){}o.globalAlpha=1}
   if(f.st==='k_spin'){o.save();o.translate(f.x,f.y);o.scale(1,.45);o.globalAlpha=e<W?.25+.45*k:.6;o.strokeStyle=KEYC;o.lineWidth=2;o.beginPath();o.arc(0,0,48,0,TAU*(e<W?k:1));o.stroke();o.globalAlpha=.12;o.fillStyle=KEYC;o.beginPath();o.arc(0,0,48,0,TAU);o.fill();o.restore();
    if(e>=W){/* 도는 칼날 */const a=(e-W)/60;o.save();o.globalCompositeOperation='lighter';for(let i=0;i<3;i++){const b=a+i*2.1;o.globalAlpha=.7;o.strokeStyle=i?'#ffe9a8':'#ffffff';o.lineWidth=3-i;o.beginPath();o.ellipse(f.x,f.y-8,30,13,0,b,b+1.3);o.stroke()}o.restore()}}
   if(f.st==='k_throw'&&e<W){/* 손에 든 열쇠가 빛남 */drawKey(o,f.x+(f.face.x||1)*10,f.y-20,-.6*(f.face.x||1),1.6,.6+.4*Math.sin(now/50));o.globalAlpha=.35;o.strokeStyle=KEYC;o.setLineDash([3,4]);o.beginPath();o.moveTo(f.x,f.y-12);o.lineTo(f.x+Math.cos(f.aa||0)*150,f.y-12+Math.sin(f.aa||0)*150);o.stroke();o.setLineDash([]);o.globalAlpha=1}
   if(f.st==='k_cage'&&!q.sprung){o.save();o.translate(q.x,q.y);o.scale(1,.7);o.globalAlpha=.3+.4*k;o.strokeStyle='#c9a8ff';o.lineWidth=1.5;o.beginPath();o.arc(0,0,24,0,TAU);o.stroke();o.globalAlpha=.15+.2*k;o.fillStyle='#c9a8ff';o.beginPath();o.arc(0,0,24*k,0,TAU);o.fill();o.restore();
    /* 위에서 내려오는 자물쇠 */const ly=q.y-60+40*k;o.globalAlpha=.5+.5*k;o.fillStyle='#8a90a8';o.fillRect(q.x-6,ly-4,12,10);o.strokeStyle='#c8d0dc';o.lineWidth=2;o.beginPath();o.arc(q.x,ly-4,4,Math.PI,0);o.stroke();o.fillStyle=KEYC;o.fillRect(q.x-1,ly,2,3);o.globalAlpha=1;
    /* 칼을 높이 듦 */drawKey(o,f.x,f.y-34-4*k,-1.57,1.4,.5+.5*k)}
   if(f.st==='k_thrust'){const per=W+150,ph=e%per;if(ph<W&&e<per*3){const aa=q.aa||0;o.globalAlpha=.25+.4*(ph/W);o.strokeStyle='#ffb060';o.lineWidth=5;o.beginPath();o.moveTo(f.x,f.y-9);o.lineTo(f.x+Math.cos(aa)*44,f.y-9+Math.sin(aa)*44);o.stroke();o.globalAlpha=1}}
   if(f.st==='k_rain'&&e<W){o.globalCompositeOperation='lighter';o.globalAlpha=.5;const g=o.createRadialGradient(f.x,f.y-40,1,f.x,f.y-40,24);g.addColorStop(0,KEYC);g.addColorStop(1,'rgba(255,216,74,0)');o.fillStyle=g;o.fillRect(f.x-24,f.y-64,48,48);o.globalCompositeOperation='source-over';o.globalAlpha=1;drawKey(o,f.x,f.y-40,-1.57,1.6,1)}}
  /* 열쇠 비 */for(const z of ZONES){const k=Math.max(0,Math.min(1,(now-z.t0)/(z.t1-z.t0)));if(!z.done){o.save();o.translate(z.x,z.y);o.scale(1,.6);o.globalAlpha=.25+.45*k;o.strokeStyle=KEYC;o.lineWidth=1.2;o.beginPath();o.arc(0,0,z.r,0,TAU);o.stroke();o.globalAlpha=.12+.2*k;o.fillStyle=KEYC;o.beginPath();o.arc(0,0,z.r*k,0,TAU);o.fill();o.restore();drawKey(o,z.x,z.y-90*(1-k)-6,1.57,1.5,.4+.6*k)}
   else{const a=1-(now-z.t1)/300;o.save();o.translate(z.x,z.y);o.scale(1,.5);o.globalAlpha=a;o.strokeStyle='#ffffff';o.lineWidth=2;o.beginPath();o.arc(0,0,z.r*(1.3-a*.3),0,TAU);o.stroke();o.restore();drawKey(o,z.x,z.y-6,1.57,1.5,a)}}
  /* 자물쇠 감옥: 솟아오른 쇠창살 */for(const c of CAGES){const a=(now-c.t)/650,h=Math.min(1,a*5)*26,al=a>.7?(1-a)/.3:1;o.save();o.globalAlpha=al;for(let i=0;i<9;i++){const b=i/9*TAU,x=c.x+Math.cos(b)*22,y=c.y+Math.sin(b)*22*.6;o.fillStyle='#5a6070';o.fillRect(x-1.2,y-h,2.4,h);o.fillStyle='#c8d0dc';o.fillRect(x-1.2,y-h,1,h)}o.strokeStyle='#8a90a8';o.lineWidth=2;o.beginPath();o.ellipse(c.x,c.y-h,22,13,0,0,TAU);o.stroke();o.fillStyle='#8a90a8';o.fillRect(c.x-6,c.y-h-12,12,10);o.fillStyle=KEYC;o.fillRect(c.x-1,c.y-h-8,2,3);o.restore()}
  /* 날아가는 열쇠 */for(const s of KEYS){o.save();o.globalCompositeOperation='lighter';o.globalAlpha=.35;o.fillStyle=s.mine?'#ffffff':KEYC;o.beginPath();o.arc(s.x,s.y,6,0,TAU);o.fill();o.restore();drawKey(o,s.x,s.y,s.rot,1.5,1,s.mine?'#ffffff':KEYC)}
  o.restore()}

 /* ================= ② 클라비스 캐릭터의 열쇠 검술 (스킬) ================= */
 const AB={keyspin:{n:'열쇠 회오리',ico:'🌀',col:'#ffd84a',d:()=>'6번째로 맞힐 때마다 몸을 돌려 주변 적을 베어요(공격력의 70%).'},
  keythrow:{n:'열쇠 투척',ico:'🗝',col:'#ffe9a8',d:()=>'5초마다 가까운 적에게 열쇠 3개를 던져요. 날아갈 때 · 돌아올 때 한 번씩 맞혀요(각 35%).'},
  lockcage:{n:'자물쇠 감옥',ico:'🔒',col:'#c9a8ff',d:()=>'패링에 성공하면 가까운 적 하나를 1초 동안 가둬요(기절 + 공격력의 80%).'},
  keythrust:{n:'연속 찌르기',ico:'➹',col:'#ffb060',d:()=>'대시하면 앞으로 세 번 찔러요(각 30%).'}};
 try{if(window.MYTH100&&MYTH100.ABL)Object.assign(MYTH100.ABL,AB)}catch(e){}
 try{const C=window.SEC127&&CHARS[SEC127.IDX];if(C){Object.assign(C.abl||(C.abl={}),{keyspin:1,keythrow:1,lockcage:1,keythrust:1});C.hp=220;C.critAdd=.04;
   C.desc='탑 10층 벽 너머 비밀의 방을 지키던 열쇠지기. 열쇠 검술(회오리 · 투척 · 자물쇠 감옥 · 연속 찌르기)을 쓴다. 보스였을 때보다는 조금 약하다.'}}catch(e){}
 const on=()=>{try{return !!window.SEC127&&shopInv().eq.ch===SEC127.IDX&&!window.__mateDraw}catch(e){return false}};
 const S={hits:0,last:30,thT:0,busy:0};const FX=[];
 const spec=()=>!!(window.WATCH95&&WATCH95.specOn&&WATCH95.specOn());
 function inFight(){if(spec()||(typeof paused!=='undefined'&&paused)||!(P.hp>0))return false;
  if(mode==='tower'&&window.TW71&&TW71.T){const T=TW71.T;return !T.dead&&!T.bossCard&&!T.clear}
  if(mode==='boss')return typeof G!=='undefined'&&G&&G.state==='play';
  if((mode==='dg129'||mode==='sec127')&&window.SK130)return SK130.enemies().length>0;return false}
 function targets(){try{if(mode==='tower'&&window.TW71&&TW71.T)return TW71.T.mobs.filter(m=>m.hp>0&&!(m.born>0));
  if(mode==='boss'&&typeof G!=='undefined'&&G&&G.state==='play'&&G.boss)return [{boss:1,x:G.boss.x,y:G.boss.y}];
  if((mode==='dg129'||mode==='sec127')&&window.SK130)return SK130.enemies()}catch(e){}return []}
 const near=(x,y,r)=>targets().filter(t=>Math.hypot(t.x-x,t.y-y)<r+(t.boss||t.isBoss?18:0)).sort((a,b)=>Math.hypot(a.x-x,a.y-y)-Math.hypot(b.x-x,b.y-y));
 function hit(t,d,col,tx){d=Math.max(1,Math.round(d));S.busy=1;try{if(t.boss){if(typeof spDmg==='function')spDmg(d,G.boss.x,G.boss.y-10,col,now0())}else if(window.TW71)TW71.hitMob(t,d,col,tx)}catch(e){}S.busy=0}
 function clk(){try{if(mode==='tower'&&TW71.T)return TW71.T.clk}catch(e){}return now0()/1000}
 function flash(k){try{MYTH100.S.flash[k]=now0()}catch(e){}/* v138: 이름 표시는 99999999999가 맨 위 층에 */}
 function spin(){const n=now0();flash('keyspin');FX.push({k:'spin',x:P.x,y:P.y,t0:n,dur:420});snd(420,.12,'sawtooth',.05,180);for(const t of near(P.x,P.y,48))hit(t,S.last*.7,KEYC,'🌀')}
 function throwKeys(){const t=near(P.x,P.y,220)[0];if(!t)return false;const n=now0(),base=Math.atan2(t.y-10-(P.y-12),t.x-P.x);flash('keythrow');snd(900,.08,'square',.035,1600);
  for(let i=0;i<3;i++){const a=base+(i-1)*.28;FX.push({k:'key',x:P.x,y:P.y-12,vx:Math.cos(a)*240,vy:Math.sin(a)*240,t0:n,dur:2400,back:0,hitA:new Set(),hitB:new Set(),rot:0})}return true}
 function cage(){const t=near(P.x,P.y,130)[0];if(!t)return;const n=now0();flash('lockcage');FX.push({k:'cage',x:t.x,y:t.y,t0:n,dur:900,tg:t});snd(240,.22,'square',.05,100);
  if(!t.boss){t.stunT=Math.max(t.stunT||0,clk()+1)}hit(t,S.last*(t.boss?.9:.8),'#c9a8ff','🔒')}
 function thrust(){const n=now0(),fx=P.face&&(P.face.x||P.face.y)?P.face:{x:1,y:0},l=Math.hypot(fx.x,fx.y)||1,ux=fx.x/l,uy=fx.y/l;flash('keythrust');
  for(let i=0;i<3;i++)setTimeout(()=>{try{if(!inFight())return;const x0=P.x,y0=P.y-8;FX.push({k:'thr',x:x0,y:y0,ux,uy,t0:now0(),dur:180,i});snd(640+i*110,.05,'sawtooth',.04,260);
   for(const t of targets()){const px=t.x-x0,py=(t.y-8)-y0,along=px*ux+py*uy,side=Math.abs(px*uy-py*ux);if(along>-4&&along<46+(t.boss||t.isBoss?16:0)&&side<(t.boss||t.isBoss?24:13))hit(t,S.last*.3,'#ffb060','➹')}}catch(e){}},i*90)}
 /* 장면이 바뀌면(층 · 전투) 쌓인 것 비우기 */let lastKey='';function resetIf(){const k=mode+'|'+(window.TW71&&TW71.T?TW71.T.f:'')+'|'+(typeof G!=='undefined'&&G?G.bi:'');if(k!==lastKey){lastKey=k;S.hits=0;FX.length=0}}
 /* 전투 엔진 이어 붙이기 */
 if(window.CB81){const C=CB81;
  {const f=C.onHit;C.onHit=function(m,dmg){const r=f.apply(this,arguments);try{if(!S.busy&&on()&&!spec()){S.last=dmg||S.last;if(++S.hits%6===0)spin()}}catch(e){}return r}}
  {const f=C.onBossHit;C.onBossHit=function(dmg){const r=f.apply(this,arguments);try{if(!S.busy&&on()&&!spec()){S.last=dmg||S.last;if(++S.hits%6===0)spin()}}catch(e){}return r}}
  {const f=C.onParry;C.onParry=function(n){const r=f.apply(this,arguments);try{if(n&&on())cage()}catch(e){}return r}}
  {const f=C.onDash;C.onDash=function(){const r=f.apply(this,arguments);try{if(on()&&inFight())thrust()}catch(e){}return r}}}
 if(typeof doParry==='function'){const f=doParry;doParry=function(now){const b=(typeof G!=='undefined'&&G&&G.parrySp||[]).length;const r=f.apply(this,arguments);try{if(mode==='boss'&&on()&&(G.parrySp||[]).length>b)cage()}catch(e){}return r}}
 /* v138: 보스전 대시도 CB81.onDash를 부르므로(9999996) 여기서 따로 살피지 않음 */
 /* 클라비스 결투에서 클라비스의 칼을 패링했을 때도 감옥 */
 const onDuelParry=()=>{try{if(on())cage()}catch(e){}};
 /* 매 프레임: 열쇠 투척 시계 · 날아가는 열쇠 · 그리기 */
 let LT2=now0();
 {const _f=frame;frame=function(){const r=_f.apply(this,arguments);try{const n=now0(),dt=Math.min(.05,(n-LT2)/1000);LT2=n;resetIf();const act=on()&&inFight();
   if(act&&n-S.thT>5000){if(throwKeys())S.thT=n;else S.thT=n-4000}
   if(!FX.length)return r;
   for(const f of FX)if(f.k==='key'){f.rot+=dt*16;const age=(n-f.t0)/1000;if(!f.back&&age>.55)f.back=1;
    if(f.back){const dx=P.x-f.x,dy=P.y-12-f.y,l=Math.hypot(dx,dy)||1;f.vx+=dx/l*1400*dt;f.vy+=dy/l*1400*dt;const sp=Math.hypot(f.vx,f.vy);if(sp>300){f.vx*=300/sp;f.vy*=300/sp}if(l<12&&age>.7)f.t0=n-f.dur}
    f.x+=f.vx*dt;f.y+=f.vy*dt;if(act)for(const t of targets()){const H=f.back?f.hitB:f.hitA,key=t.boss?'B':(t.id||t);if(H.has(key))continue;if(Math.hypot(t.x-f.x,t.y-10-f.y)<(t.boss||t.isBoss?28:12)){H.add(key);hit(t,S.last*.35,KEYC,'🗝')}}}
   const o=ctx;o.save();try{o.setTransform(SS,0,0,SS,0,0)}catch(e){}
   for(let i=FX.length-1;i>=0;i--){const f=FX[i],k=(n-f.t0)/f.dur;if(k>=1){FX.splice(i,1);continue}o.save();
    if(f.k==='pop'){const y=P.y-50-k*12;o.globalAlpha=k>.75?(1-k)/.25:1;o.font='900 10px sans-serif';o.textAlign='center';o.lineWidth=3;o.strokeStyle='#05070a';o.strokeText(f.tx,P.x,y);o.fillStyle=f.col;o.fillText(f.tx,P.x,y)}
    else if(f.k==='spin'){o.globalCompositeOperation='lighter';for(let j=0;j<3;j++){const b=k*9+j*2.1;o.globalAlpha=(1-k)*.85;o.strokeStyle=j?'#ffe9a8':'#ffffff';o.lineWidth=3-j;o.beginPath();o.ellipse(f.x,f.y-8,40*(.6+k*.4),17*(.6+k*.4),0,b,b+1.4);o.stroke()}o.globalAlpha=(1-k)*.2;o.fillStyle=KEYC;o.beginPath();o.ellipse(f.x,f.y,46,20,0,0,TAU);o.fill()}
    else if(f.k==='key'){o.globalCompositeOperation='lighter';o.globalAlpha=.3;o.fillStyle=KEYC;o.beginPath();o.arc(f.x,f.y,5,0,TAU);o.fill();o.globalCompositeOperation='source-over';drawKey(o,f.x,f.y,f.rot,1.3,1)}
    else if(f.k==='cage'){const t=f.tg,x=t&&!t.boss?t.x:f.x,y=t&&!t.boss?t.y:f.y,h=Math.min(1,k*6)*22,al=k>.75?(1-k)/.25:1;o.globalAlpha=al;for(let j=0;j<8;j++){const b=j/8*TAU,bx=x+Math.cos(b)*16,by=y+Math.sin(b)*16*.6;o.fillStyle='#5a6070';o.fillRect(bx-1,by-h,2,h);o.fillStyle='#c8d0dc';o.fillRect(bx-1,by-h,.8,h)}o.strokeStyle='#8a90a8';o.lineWidth=1.5;o.beginPath();o.ellipse(x,y-h,16,9,0,0,TAU);o.stroke();o.fillStyle='#8a90a8';o.fillRect(x-5,y-h-10,10,8);o.fillStyle=KEYC;o.fillRect(x-.8,y-h-7,1.6,2.4)}
    else if(f.k==='thr'){o.globalCompositeOperation='lighter';o.globalAlpha=(1-k)*.9;o.strokeStyle=f.i===2?'#ffb060':'#ffe9a8';o.lineWidth=4-k*3;o.beginPath();o.moveTo(f.x+f.ux*4,f.y+f.uy*4);o.lineTo(f.x+f.ux*(20+30*Math.min(1,k*3)),f.y+f.uy*(20+30*Math.min(1,k*3)));o.stroke();drawKey(o,f.x+f.ux*(18+28*Math.min(1,k*3)),f.y+f.uy*(18+28*Math.min(1,k*3)),Math.atan2(f.uy,f.ux),1.2,1-k)}
    o.restore()}
   o.restore();try{if(document.documentElement.classList.contains('phP')&&window.PV76&&PV76.paint)PV76.paint()}catch(e){}}catch(e){}return r}}

 window.CA137={pick,state,drawFoe,onDuelParry,AB,get KEYS(){return KEYS},get FX(){return FX},S};
}catch(e){console.warn('v137',e)}})();
