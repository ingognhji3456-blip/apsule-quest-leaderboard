/* v172 펫 각성 (PA172)
   - 각성석(💠)은 탑 오르기에서만, 아주 드물게 나온다: 잡몹 0.1% · 정예 2.5% · 탑 보스 첫 클리어 15%(다시 깨면 4%), 높은 층일수록 조금 더.
   - 공방 펫 칸의 「✦ 펫 각성」에서 각성석 + 골드로 각성. 펫마다 단 한 번만. 펫 등급이 높을수록 재료가 훨씬 많이 든다(각성석 15 × (1 + 0.7×등급)).
   - 각성한 펫은 탑 오르기(잡몹 층 · 탑 보스 층 · 듀오 탑)에서만 스스로 공격한다. 결투 · 팀 결투 · 일반 보스 러시 · 관전에서는 공격하지 않는다.
     네 번째 공격마다 「강타」(3배 + 주변 튕김) · 12초마다 「펫 폭풍」(여러 마리 동시에).
   - 장착한 펫은 탑에서 함께 싸우며 경험치를 얻어 레벨이 오른다(공격력 +2%/레벨, 최대 50).
   - 각성하면 펫 모습이 바뀐다: 가슴에 각성석(💠)이 박히고, 보석에서 하늘빛 줄기가 몸으로 퍼지며 은은하게 빛난다.
   기록: saveData.pa172 = {st: 각성석, p: {펫 번호: {aw, lv, xp}}, bf: {층: 1}(첫 클리어 기록)} */
(function(){try{
 const TAU=Math.PI*2,MAXAW=1/* 각성은 단 한 번 */,MAXLV=50,VIS=5/* 각성 모습은 가장 화려한 단계로 */;
 const STEP=[0,15]/* 각성에 드는 각성석(등급 배율 곱하기 전) */;
 const GOLD=[0,30000];
 const CD=[0,1.3],MUL=[0,2.5];
 const PD=()=>{const d=saveData.pa172=saveData.pa172||{};d.st=d.st|0;d.p=d.p||{};d.bf=d.bf||{};return d};
 const pet=i=>{const d=PD();return d.p[i]=d.p[i]||{aw:0,lv:1,xp:0}};
 const awOf=i=>{try{const p=PD().p[i];return p?p.aw|0:0}catch(e){return 0}};
 const gradeK=i=>{try{return (wsTier(PETS[i])||{}).k|0}catch(e){return 0}};
 const gMul=i=>1+.7*gradeK(i);
 const stoneCost=(i,to)=>Math.round(STEP[to]*gMul(i));
 const goldCost=(i,to)=>Math.round(GOLD[to]*(1+.5*gradeK(i))/100)*100;
 const needXp=lv=>20+lv*15;
 const eqPet=()=>{try{return shopInv().eq.pt|0}catch(e){return 0}};
 const COL=i=>'hsl('+((i*47+190)%360)+',90%,68%)';
 const num=n=>(+n||0).toLocaleString();

 /* ── 어디서 공격하나: 탑 잡몹 층 · 탑 보스 층(결투 · 관전 · 일시정지 빼고) ── */
 const blocked=()=>{try{if(typeof paused!=='undefined'&&paused)return true;if(window.PVP92&&PVP92.on&&PVP92.on())return true;if(window.WATCH95&&WATCH95.specOn&&WATCH95.specOn())return true}catch(e){}return false};
 const inTower=()=>{try{return mode==='tower'&&window.TW71&&TW71.T&&!TW71.T.bossCard&&!TW71.T.dead&&!TW71.T.clear}catch(e){return false}};
 const inTBoss=()=>{try{return mode==='boss'&&G&&G.tw71&&G.state==='play'&&!G.cine}catch(e){return false}};
 const floorNow=()=>{try{return inTBoss()?G.tw71.f:TW71.T.f||1}catch(e){return 1}};

 /* ── 각성석 얻기 ── */
 function gainStone(n,x,y,why){const d=PD();d.st+=n;try{saveNow()}catch(e){}
  try{sfx(988,.18,'triangle',.07,1976);setTimeout(()=>{try{sfx(1318,.3,'triangle',.07,2637)}catch(e){}},120)}catch(e){}
  try{if(mode==='tower'&&TW71.addPop)TW71.addPop(x||P.x,(y||P.y)-40,'💠 각성석 +'+n+'!','#9ae8ff')}catch(e){}
  toast('💠 각성석 +'+n+' 획득!',(why||'')+' · 보유 '+num(d.st)+'개')}
 const tb=document.createElement('div');tb.id='pa172t';tb.hidden=true;document.body.appendChild(tb);let tbT=0;
 function toast(a,b){tb.innerHTML='<b>'+a+'</b><small>'+b+'</small>';tb.hidden=false;tb.classList.remove('on');void tb.offsetWidth;tb.classList.add('on');clearTimeout(tbT);tbT=setTimeout(()=>{tb.hidden=true},3600)}
 /* 잡몹을 쓰러뜨리면: 펫 경험치 + 아주 낮은 확률로 각성석 */
 if(window.CB81&&CB81.onKill){const f=CB81.onKill;CB81.onKill=function(m){try{if(mode==='tower'&&window.TW71&&TW71.T&&TW71.T.mobs&&TW71.T.mobs.includes(m)&&!blocked()){
    addXp(m.elite?5:1);const fl=TW71.T.f||1,bonus=1+Math.min(2,fl/500),ch=(m.elite?.025:.001)*bonus;if(Math.random()<ch)gainStone(1,m.x,m.y,m.elite?'정예 처치':'몬스터 처치')}}catch(e){}return f.apply(this,arguments)}}
 /* 탑 보스를 깨면: 첫 클리어 15% · 다시 깨면 4% */
 {const f=fightEnd;fightEnd=function(won){let tw=null;try{if(won&&G&&G.tw71&&!G._pa172&&!blocked()){G._pa172=1;tw=G.tw71}}catch(e){}const r=f.apply(this,arguments);
   if(tw)try{const d=PD(),fl=tw.f|0,first=!d.bf[fl];d.bf[fl]=1;addXp(30);const ch=(first?.15:.04)*(1+Math.min(2,fl/500));if(Math.random()<ch)gainStone(fl>=300&&first?2:1,0,0,(first?'첫 클리어':'다시 클리어')+' · '+fl+'층 보스');else try{saveNow()}catch(e){}}catch(e){}return r}}
 function addXp(n){const i=eqPet(),p=pet(i);if(p.lv>=MAXLV)return;p.xp+=n;let up=false;while(p.lv<MAXLV&&p.xp>=needXp(p.lv)){p.xp-=needXp(p.lv);p.lv++;up=true}
  if(up)try{if(mode==='tower'&&TW71.addPop){const F=TW71.T&&window.TPET106?TPET106.F:null;TW71.addPop(F&&F.x!=null?F.x:P.x,(F&&F.y!=null?F.y:P.y)-30,'🐾 펫 Lv '+p.lv+'!','#a6f5c6')}sfx(784,.12,'triangle',.05,1175)}catch(e){}}

 /* ── 펫 공격 ── */
 const A={next:0,n:0,storm:0,shots:[],fx:[]};
 function petPos(){try{if(inTBoss()&&G.pt)return {x:G.pt.x,y:G.pt.y-4};const F=window.TPET106&&TPET106.F;if(F&&F.x!=null)return {x:F.x,y:F.y-12}}catch(e){}return {x:P.x,y:P.y-20}}
 function baseDmg(i){const p=pet(i);let tf=1;try{tf=TW71.TF?TW71.TF(floorNow()):1}catch(e){}return (4+2.5*gradeK(i))*MUL[p.aw]*(1+(p.lv-1)*.02)*tf}
 function nearMobs(o,rng){try{return TW71.T.mobs.filter(m=>m.hp>0&&!(m.born>0)&&Math.hypot(m.x-o.x,m.y-o.y)<rng).sort((a,b)=>Math.hypot(a.x-o.x,a.y-o.y)-Math.hypot(b.x-o.x,b.y-o.y))}catch(e){return []}}
 function fire(o,tgt,dmg,big,kind){const tx=tgt==='boss'?G.boss.x:tgt.x,ty=tgt==='boss'?G.boss.y-14:tgt.y-6,dist=Math.hypot(tx-o.x,ty-o.y);
  A.shots.push({x0:o.x,y0:o.y,tgt,tx,ty,t0:performance.now(),dur:Math.max(120,dist/0.42),dmg,big,kind,col:COL(eqPet())})}
 function hit(s){const col=COL(eqPet());try{
   if(s.tgt==='boss'){if(inTBoss()){spDmg(s.dmg*6,s.tx,s.ty,col,performance.now())}}
   else if(s.tgt&&s.tgt.hp>0&&mode==='tower'){TW71.hitMob(s.tgt,s.dmg,col,'🐾');if(s.big){for(const m of nearMobs({x:s.tx,y:s.ty},30))if(m!==s.tgt)TW71.hitMob(m,s.dmg*.5,col,'🐾')}}}catch(e){}
  A.fx.push({x:s.tx,y:s.ty,t0:performance.now(),big:s.big,col})}
 function tick(now){if(blocked())return;const tw=inTower(),bs=inTBoss();if(!tw&&!bs){A.shots.length=0;return}
  const i=eqPet(),p=pet(i);if(p.aw<1)return;const o=petPos();
  /* 날아가는 공격 */for(const s of A.shots){const q=(now-s.t0)/s.dur;if(s.tgt!=='boss'&&s.tgt&&s.tgt.hp>0){s.tx=s.tgt.x;s.ty=s.tgt.y-6}if(q>=1&&!s.done){s.done=1;hit(s)}}A.shots=A.shots.filter(s=>!s.done);
  if(!A.next)A.next=now+800;
  /* 펫 폭풍 */if(now>A.storm){const L=bs?['boss']:nearMobs(o,260).slice(0,6);if(L.length){A.storm=now+12000;const d=baseDmg(i)*2.5;L.forEach((t,j)=>setTimeout(()=>{try{if(inTower()||inTBoss())fire(petPos(),t,d,true,'storm')}catch(e){}},j*70));
    try{sfx(523,.25,'square',.05,1568);if(tw)TW71.addPop(o.x,o.y-26,'✦ 펫 폭풍!','#ffe79a')}catch(e){}A.fx.push({x:o.x,y:o.y,t0:now,ring:1,col:COL(i)})}}
  if(now<A.next)return;const tgt=bs?'boss':nearMobs(o,230)[0];if(!tgt){A.next=now+200;return}
  A.n++;const strong=A.n%4===0;fire(o,tgt,baseDmg(i)*(strong?3:1),strong,strong?'strong':'n');A.next=now+CD[p.aw]*1000;
  try{sfx(strong?660:880,.06,'triangle',.03,strong?1320:1400)}catch(e){}if(strong&&tw)try{TW71.addPop(o.x,o.y-22,'강타!','#ffe79a')}catch(e){}}
 function drawShots(c,now){if(!A.shots.length&&!A.fx.length)return;c.save();c.imageSmoothingEnabled=false;
  for(const s of A.shots){const q=Math.min(1,(now-s.t0)/s.dur),x=s.x0+(s.tx-s.x0)*q,y=s.y0+(s.ty-s.y0)*q-Math.sin(q*Math.PI)*14,r=s.big?4:2.6;
   c.globalAlpha=.35;c.fillStyle=s.col;for(let k=1;k<=4;k++){const qq=Math.max(0,q-k*.05);c.fillRect(Math.round(s.x0+(s.tx-s.x0)*qq-r/2),Math.round(s.y0+(s.ty-s.y0)*qq-Math.sin(qq*Math.PI)*14-r/2),r,r)}
   c.globalAlpha=1;c.fillStyle=s.col;c.beginPath();c.arc(x,y,r+1,0,TAU);c.fill();c.fillStyle='#fff';c.fillRect(Math.round(x-1),Math.round(y-1),2,2)}
  A.fx=A.fx.filter(f=>now-f.t0<380);for(const f of A.fx){const q=(now-f.t0)/380;c.globalAlpha=1-q;c.strokeStyle=f.col;c.lineWidth=f.ring?2:1.5;c.beginPath();c.arc(f.x,f.y,(f.ring?10+34*q:4+(f.big?18:9)*q),0,TAU);c.stroke()}
  c.restore()}
 /* 탑: 그리기 목록 맨 위에 공격 그림 · 보스전: 장면 위에 */
 if(window.TPET106){const f=TPET106.list;TPET106.list=function(L,now){const r=f.apply(this,arguments);try{L.push({y:1e9,fn:()=>{try{drawShots(ctx,now)}catch(e){}}})}catch(e){}return r}}
 {const f=drawScene;drawScene=function(now){const r=f.apply(this,arguments);try{if(inTBoss())drawShots(ctx,performance.now())}catch(e){}return r}}
 {const f=frame;frame=function(){try{tick(performance.now())}catch(e){}return f.apply(this,arguments)}}

 /* ── 각성 모습: 펫 그림 앞뒤에 하늘빛 · 가슴의 각성석 ── */
 let inner=0;
 function decoOK(id){if(window.__mateDraw)return 0;try{const sm=document.getElementById('shopModal');if(id===eqPet()||(sm&&!sm.hidden))return awOf(id)?VIS:0}catch(e){}return 0}
 /* 각성 모습: 가슴에 각성석(💠)이 박힌다 — 뒤에 은은한 하늘빛, 앞에 가슴의 보석 · 보석에서 퍼지는 빛줄기 · 반짝임 */
 const GEM='#9ae8ff',GEM2='#3ab8e8';
 function back(c,id,x,y,now,k,aw){const t=now/1000,r=12*k;c.save();
  const g=c.createRadialGradient(x,y+r*.2,1,x,y+r*.2,r*2);g.addColorStop(0,'rgba(154,232,255,.55)');g.addColorStop(1,'rgba(154,232,255,0)');c.globalAlpha=.35+.12*Math.sin(t*3);c.fillStyle=g;c.beginPath();c.arc(x,y+r*.2,r*2,0,TAU);c.fill();c.restore()}
 function front(c,id,x,y,now,k,aw){const t=now/1000,r=12*k,gx=Math.round(x),gy=Math.round(y+r*.22),u=Math.max(1,Math.round(1.2*k)),pl=.5+.5*Math.sin(t*3.2);c.save();
  /* 몸에 퍼지는 빛줄기(가슴에서 바깥으로) */c.globalAlpha=.28+.3*pl;c.fillStyle=GEM;for(const [dx,dy] of [[-1,-1],[1,-1],[-1,1],[1,1],[0,-1.3],[-1.4,0],[1.4,0]]){for(let q=1;q<=3;q++)c.fillRect(Math.round(gx+dx*u*(2+q*1.6)),Math.round(gy+dy*u*(2+q*1.4)),u,u)}
  /* 보석 둘레 빛 */const g=c.createRadialGradient(gx,gy,0,gx,gy,u*7);g.addColorStop(0,'rgba(200,244,255,'+(.55+.35*pl)+')');g.addColorStop(1,'rgba(154,232,255,0)');c.globalAlpha=1;c.fillStyle=g;c.beginPath();c.arc(gx,gy,u*7,0,TAU);c.fill();
  /* 보석(마름모) — 테두리 · 면 · 하이라이트 */c.fillStyle='#0a1a2a';c.fillRect(gx-u,gy-3*u,2*u,u);c.fillRect(gx-2*u,gy-2*u,4*u,u);c.fillRect(gx-3*u,gy-u,6*u,2*u);c.fillRect(gx-2*u,gy+u,4*u,u);c.fillRect(gx-u,gy+2*u,2*u,u);
  c.fillStyle=GEM2;c.fillRect(gx-u,gy-2*u,2*u,u);c.fillRect(gx-2*u,gy-u,4*u,2*u);c.fillRect(gx-u,gy+u,2*u,u);
  c.fillStyle=GEM;c.fillRect(gx-2*u,gy-u,2*u,u);c.fillRect(gx-u,gy-2*u,u,u);c.fillStyle='#ffffff';c.globalAlpha=.6+.4*pl;c.fillRect(gx-u,gy-u,u,u);
  /* 반짝임 */const sp=(t*.7)%1;if(sp<.25){c.globalAlpha=1-sp*4;c.fillStyle='#fff';const z=u*(1+sp*6);c.fillRect(Math.round(gx+2*u),Math.round(gy-3*u-z/2),u,Math.round(z));c.fillRect(Math.round(gx+2*u-z/2+u/2),Math.round(gy-3*u),Math.round(z),u)}
  /* 떠오르는 작은 빛 조각 */for(let j=0;j<3;j++){const ph=(t*.9+j/3)%1;c.globalAlpha=(1-ph)*.7;c.fillStyle=j%2?'#fff':GEM;c.fillRect(Math.round(gx+Math.sin(j*2.1+t*1.5)*r*.8),Math.round(gy-ph*r*1.8),u,u)}
  c.restore()}
 function filt(id,aw,now){return 'drop-shadow(0 0 '+(2+Math.round(Math.sin(now/300)+1))+'px rgba(154,232,255,.9)) saturate(1.15)'}
 function wrapDraw(f){return function(c,id,x,y,now,k){const aw=inner?0:decoOK(id);if(!aw||!c||!c.save)return f.apply(this,arguments);inner++;k=k||1;
   try{back(c,id,x,y,now,k,aw)}catch(e){}c.save();try{c.filter=filt(id,aw,now)}catch(e){}let r;try{r=f.apply(this,arguments)}finally{c.restore();inner--}try{front(c,id,x,y,now,k,aw)}catch(e){}return r}}
 if(typeof drawPet==='function')drawPet=wrapDraw(drawPet);
 if(window.PET59&&PET59.draw){const f=PET59.draw;PET59.draw=function(c,v,x,y,now,k){const b=(PET59.byId&&PET59.byId(v)||{}).base;const id=typeof b==='number'?b:eqPet();const aw=inner?0:decoOK(id);if(!aw)return f.apply(this,arguments);
   inner++;k=k||1;try{back(c,id,x,y,now,k,aw)}catch(e){}c.save();try{c.filter=filt(id,aw,now)}catch(e){}let r;try{r=f.apply(this,arguments)}finally{c.restore();inner--}try{front(c,id,x,y,now,k,aw)}catch(e){}return r}}

 /* ── 공방 펫 칸: 각성 창 ── */
 let anim=0;
 function panel(){const old=document.getElementById('pa172');if(old)old.remove();if(typeof shopTab==='undefined'||shopTab!=='pt')return;
  const i=wsSelOf('pt'),inv=shopInv(),own=inv.inv.pt.includes(i);if(!own)return;const inf=$('wsInfo'),btn=$('wsBtn');if(!inf||!btn)return;
  const d=PD(),p=pet(i),done=p.aw>=1,sc=stoneCost(i,1),gc=goldCost(i,1),okS=d.st>=sc,okG=inv.coins>=gc;
  const el=document.createElement('div');el.id='pa172';if(done)el.classList.add('dn');if(anim&&performance.now()-anim<900)el.classList.add('up');
  el.innerHTML='<div class="h"><b>✦ 펫 각성</b>'+(done?'<span class="badge">✦ 각성 완료</span>':'<span class="badge off">각성 전</span>')+'</div>'+
   '<div class="r"><span>🐾 펫 Lv <b>'+p.lv+'</b>'+(p.lv<MAXLV?' <small>('+p.xp+' / '+needXp(p.lv)+')</small>':' <small>(최고)</small>')+'</span><span>💠 보유 <b>'+num(d.st)+'</b></span></div>'+
   '<div class="xp"><i style="width:'+(p.lv>=MAXLV?100:Math.round(p.xp/needXp(p.lv)*100))+'%"></i></div>'+
   (done?'<div class="r"><span>탑에서 공격 중 · '+CD[1]+'초마다 · 「강타」 · 「펫 폭풍」</span></div><div class="mx">💠 가슴에 각성석이 박혔어요</div>':
    '<div class="nx">각성하면 <b>탑에서 스스로 공격</b> · 4번째 공격마다 <b>「강타」</b> · 12초마다 <b>「펫 폭풍」</b><br><small>가슴에 각성석이 박힌 모습으로 바뀌어요 · <b class="w">펫마다 단 한 번</b> · 등급 배율 ×'+gMul(i).toFixed(1)+'</small></div>'+
    '<button id="pa172go" class="'+(okS&&okG?'':'poor')+'">✦ 각성하기 · 💠 '+num(sc)+' <small>('+num(d.st)+')</small> + 🪙 '+num(gc)+'</button>')+
   '<p class="tip">💠 각성석은 탑 오르기에서만 아주 드물게 나와요(정예 · 탑 보스에서 조금 더). 펫은 탑에서만 공격해요.</p>';
  btn.parentNode.insertBefore(el,btn);const go=$('pa172go');if(go)go.onclick=()=>awaken(i)}
 function awaken(i){const d=PD(),p=pet(i),inv=shopInv();if(p.aw>=MAXAW)return;const sc=stoneCost(i,1),gc=goldCost(i,1);
  if(d.st<sc){try{wsSay('각성석이 '+num(sc-d.st)+'개 더 필요해! 탑에서 정예랑 보스를 노려 봐')}catch(e){}try{sfx(140,.15,'square',.04,90)}catch(e){}return}
  if(inv.coins<gc){try{wsSay('골드가 '+num(gc-inv.coins)+' 더 필요해!')}catch(e){}try{sfx(140,.15,'square',.04,90)}catch(e){}return}
  d.st-=sc;inv.coins-=gc;saveData.coins=inv.coins;p.aw=1;anim=performance.now();
  try{sfx(523,.2,'triangle',.07,1046);setTimeout(()=>sfx(784,.25,'triangle',.07,1568),120);setTimeout(()=>sfx(1046,.4,'triangle',.07,2093),260);perc('crash',audio.currentTime,.4)}catch(e){}
  try{wsSay('각성 성공! 이제 탑에서 '+PETS[i].name+'도 같이 싸워!')}catch(e){}try{saveNow();gmHud()}catch(e){}try{renderShop()}catch(e){}}
 if(typeof wsRefresh==='function'){const f=wsRefresh;wsRefresh=function(){const r=f.apply(this,arguments);try{panel();if(shopTab==='pt'){const aw=awOf(wsSelOf('pt')),h=document.querySelector('#wsInfo .wsHead b');if(h&&aw&&!h.querySelector('.pa172b'))h.insertAdjacentHTML('beforeend',' <span class="pa172b">✦ 각성</span>')}}catch(e){console.error('pa172',e)}return r}}

 const css=document.createElement('style');css.textContent=`
 #pa172{margin:8px 0 6px;padding:10px 12px;border-radius:12px;background:linear-gradient(180deg,#0c1e2c,#060e16);border:1px solid #7dd8ff66;box-shadow:inset 0 1px 0 #ffffff14;display:flex;flex-direction:column;gap:5px}
 #pa172.up{animation:pa172u .9s ease-out}@keyframes pa172u{0%{box-shadow:0 0 0 0 #9ae8ff,inset 0 0 30px #9ae8ff}100%{box-shadow:0 0 0 14px #9ae8ff00}}
 #pa172 .h{display:flex;align-items:center;gap:8px}#pa172 .h b{color:#9ae8ff;font-size:14px}
 #pa172 .badge{margin-left:auto;font-size:11px;font-weight:900;padding:2px 8px;border-radius:8px;color:#3a2a00;background:linear-gradient(180deg,#fff0b0,#ffc040);box-shadow:0 0 8px #ffb02088}#pa172 .badge.off{color:#9fb0c8;background:#1a2a38;box-shadow:none}#pa172.dn{border-color:#ffd16699;background:linear-gradient(180deg,#2a2208,#0e0a04)}#pa172 .nx b.w{color:#ffb8c8}
 #pa172 .r{display:flex;justify-content:space-between;gap:8px;font-size:12px;color:#c8e0f0;flex-wrap:wrap}#pa172 .r b{color:#fff}#pa172 .r small{color:#8fa8c0}#pa172 .lk{color:#ffb8c8}#pa172 .nm{color:#ffe79a}
 #pa172 .xp{height:5px;border-radius:3px;background:#1a2a38;overflow:hidden}#pa172 .xp i{display:block;height:100%;background:linear-gradient(90deg,#7dffa8,#9ae8ff)}
 #pa172 .nx{font-size:12px;color:#c8e0f0;padding:6px 8px;border-radius:9px;background:#ffffff0a}#pa172 .nx b{color:#7dffa8}#pa172 .nx small{color:#8fa8c0}
 #pa172 .mx{font-weight:900;color:#ffd166;text-align:center}
 #pa172 button{font:inherit;font-weight:900;font-size:13px;padding:9px;border-radius:10px;border:0;cursor:pointer;background:linear-gradient(180deg,#c8f0ff,#5ab8e8);color:#04121a;box-shadow:0 0 0 2px #000}
 #pa172 button small{font-weight:700;opacity:.7}#pa172 button.poor{filter:grayscale(.7) brightness(.75)}
 #pa172 .tip{margin:0;font-size:10.5px;color:#7f98ae;line-height:1.5}
 .pa172b{display:inline-block;font-style:normal;font-size:.72em;font-weight:900;padding:0 5px;border-radius:6px;margin-right:4px;vertical-align:middle;color:#3a2a00;background:linear-gradient(180deg,#fff0b0,#ffc040)}
 html.lp #shopModal.wsFull:not(.ws148o) #pa172{display:none!important}
 #pa172t{position:fixed;left:50%;top:18%;transform:translateX(-50%);z-index:9600;display:flex;flex-direction:column;align-items:center;gap:2px;padding:12px 22px;border-radius:16px;background:radial-gradient(120% 120% at 50% 0%,#1a4a6a,#06121c);border:2px solid #9ae8ff;color:#fff;box-shadow:0 0 30px #9ae8ff88,0 10px 30px #000a;pointer-events:none;font-family:inherit}
 #pa172t[hidden]{display:none}#pa172t b{font-size:20px;color:#c8f4ff;text-shadow:0 0 12px #9ae8ff}#pa172t small{font-size:12px;color:#9fc0d8}
 #pa172t.on{animation:pa172t 3.6s ease-out forwards}@keyframes pa172t{0%{opacity:0;transform:translateX(-50%) scale(.6)}8%{opacity:1;transform:translateX(-50%) scale(1.08)}14%{transform:translateX(-50%) scale(1)}85%{opacity:1}100%{opacity:0}}`;document.head.appendChild(css);
 window.PA172={PD,pet,awOf,gainStone,stoneCost,goldCost,A,tick};
}catch(e){console.error('v172 pet awaken',e)}})();
