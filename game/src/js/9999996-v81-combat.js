/* ================= v81 전투 확장 (CB81): 상태 이상 · 방패 · 현질 스킨 능력 · 세트 효과 · 무기 특성 =================
   ① 내 상태 이상 (탑 · 보스전 공통)
      - 중독 ☠: 0.5초마다 체력이 조금씩 닳는다(체력 1 아래로는 안 내려감). 독두꺼비 침 · 독 웅덩이 · 보스(보통 이상)의 공격.
      - 탈진 ⚡: 기력(대시 칸)을 빼앗기고 3초 동안 충전이 느려진다. 기력 망령의 줄기 · 보스(어려움 이상)의 공격.
   ② 방패(999997): 방패병 · 31층부터 정예의 보호막. 한 대에 1칸(PERFECT 2칸)만 깎이고, 다 부숴야 몸에 피해. 2초 기절 · 8초 뒤 다시 생김.
      방패를 꿰뚫는/부수는 무기: 아래 WT(무기 특성) · 현질 검 · 공허 세트.
   ③ 현질 스킨 13종은 각각 다른 능력(PERK), 현질 세트(스킨 + 같은 세트 검)를 맞추면 세트 효과(SETB).
   ④ 캐릭터 · 무기 · 펫에 특성 칸(poisonRes 독 내성 · critAdd 치명 · pierce 방패 꿰뚫기 · shBreak 방패 부수기 · onHit · dashFx …)을 읽는다(v82 새 장비가 씀).
   탑은 999997이 CB81의 함수(onHit · onDash · shieldHit …)를 부르고, 보스전은 여기서 전역 함수(doParry · hurtP · win · stamMax · stamTick · doDash)를 감싼다. */
(()=>{try{
 const now0=()=>performance.now();
 const inTower=()=>typeof mode!=='undefined'&&mode==='tower'&&window.TW71&&TW71.T;
 const inBoss=()=>typeof mode!=='undefined'&&mode==='boss'&&typeof G!=='undefined'&&G&&G.state==='play';
 const T=()=>TW71.T;
 function pop(x,y,tx,col){try{if(inTower())TW71.addPop(x,y,tx,col);else if(typeof G!=='undefined'&&G&&G.pops)G.pops.push({x,y,t:now0(),tx,col})}catch(e){}}
 const near=(x,y,r,ex)=>{const out=[];if(!inTower())return out;for(const m of T().mobs){if(m.hp<=0||m.born>0||m===ex)continue;const d=Math.hypot(m.x-x,m.y-y);if(d<r)out.push([d,m])}return out.sort((a,b)=>a[0]-b[0]).map(x=>x[1])};
 const hitM=(m,d,col,tx)=>{try{TW71.hitMob(m,d,col,tx)}catch(e){}};
 const bossDmg=(amt,col)=>{try{if(inBoss()&&G.boss&&typeof spDmg==='function')spDmg(amt,G.boss.x,G.boss.y-10,col||'#ffffff',now0())}catch(e){}};

 /* ---------- 장착 정보 ---------- */
 const skinId=()=>{try{return (window.SKIN58&&SKIN58.get&&SKIN58.get())||null}catch(e){return null}};
 const swordId=()=>{try{return (window.SWORD59&&SWORD59.get&&SWORD59.get())||null}catch(e){return null}};
 const SETS={void:['void','voidreaver'],clock:['clock','gearsaber'],neon:['neon','beatbreaker']};
 function setOn(){const s=skinId(),w=swordId();for(const k in SETS)if(SETS[k][0]===s&&SETS[k][1]===w)return k;return null}
 /* 무기 특성: 종류(type)마다 */
 const WT={
  flame:{onHit:'burn',desc:'맞힌 적에게 화상 3초'},rapier:{onHit:'chill',desc:'맞힌 적을 1.5초 느리게'},
  great:{shBreak:1.5,desc:'방패를 1.5배 빨리 부숨'},axe:{shBreak:2,desc:'방패를 2배 빨리 부숨'},spear:{shBreak:2,desc:'방패를 2배 빨리 부숨'},
  scythe:{pierce:.3,desc:'방패를 30% 꿰뚫음'},chrono:{pierce:.35,desc:'방패를 35% 꿰뚫음'},
  voidblade:{pierce:.5,desc:'방패를 50% 꿰뚫음(방패가 있어도 몸에 절반 피해)'},gearsaber:{shBreak:3,desc:'방패를 3배 빨리 부숨'},
  beatbreaker:{pierce:.25,perfPierce:1,desc:'PERFECT 박자면 방패를 완전히 꿰뚫음(아니면 25%)'}};
 const wpType=()=>{try{return (curWp()||{}).type||'sword'}catch(e){return 'sword'}};
 const gear=()=>{const out=[];try{out.push(curChar()||{},curWp()||{},curPet()||{})}catch(e){}return out};
 const sumF=f=>gear().reduce((a,x)=>a+(+x[f]||0),0);

 /* ---------- 현질 스킨 능력 13종 ---------- */
 const PERK={
  void:{n:'공허 균열',d:'대시한 길에 공허 균열 — 지나간 적을 0.6초 묶고 피해. 보스전: 보스를 스치면 피해',trail:'void',col:'#9a66ff'},
  clock:{n:'쌍둥이 톱니 방패',d:'패리하면 튕겨내는 것이 2개로(탑: 탄 2개 · 보스전: 반격 2배) + 패리 무적 0.2초 더',dbl:1,col:'#ffcf5a'},
  neon:{n:'비트 연쇄',d:'PERFECT 박자 공격이 가까운 적 2마리에게 번개로 이어짐(40%). 보스전: PERFECT 반격 피해 +20%',chain:1,col:'#ff3ad6'},
  v_haru:{n:'별똥별',d:'대시가 끝난 자리에 별똥별 3개가 떨어짐',meteor:1,col:'#9fd8ff'},
  v_mina:{n:'여우불',d:'패리하면 여우불 2개가 날아가 적을 쫓음',fox:1,col:'#8de4ff'},
  v_doyun:{n:'용암 분출',d:'대시가 끝난 자리에서 용암이 터짐(피해 + 화상)',lava:1,col:'#ff7a2a'},
  v_sera:{n:'서리 손길',d:'맞힌 적이 1.5초 느려짐. 보스전: 반격 피해 +8%',chill:1,bossMul:1.08,col:'#bfe8ff'},
  v_steel:{n:'황금 전류',d:'치명타 +8% · 치명타 때 금빛 전류가 옆 적에게 튐',crit:.08,spark:1,col:'#ffd166'},
  v_luna:{n:'일식의 각오',d:'체력 30% 이하일 때 피해 +25%',luna:1,col:'#ff5a7a'},
  v_kai:{n:'그림자 걸음',d:'대시 뒤 0.8초 동안 투명(맞지 않음) + 다음 공격은 반드시 치명타',kai:1,col:'#7a7a9a'},
  v_arin:{n:'독버섯 포자',d:'독에 걸리지 않음 · 맞힌 적을 중독시킴',poisonImm:1,onHit:'poison',col:'#b0ff5a'},
  v_zeno:{n:'청염 발자국',d:'대시한 길에 푸른 불길 — 밟은 적은 화상(3초)',trail:'fire',col:'#5ab8ff'},
  v_aurora:{n:'무지개 가호',d:'맞을 때 20% 확률로 피해를 막는 무지개 보호막',aurora:.2,col:'#ffb0ff'}};
 /* 세트 효과: 같은 세트의 스킨 + 검을 함께 장착 */
 const SETB={
  void:{n:'공허 세트',d:'방패를 60% 더 꿰뚫음 · 적을 쓰러뜨리면 공허 폭발(주변 피해) · 보스전 반격 +10%',pierce:.6,boom:1,bossMul:1.1,col:'#9a66ff'},
  clock:{n:'태엽 세트',d:'대시 1칸 더 · 대시 충전 30% 빠름 · 궁극기 게이지 25% 빨리',dash:1,regen:1.3,ult:1.25,col:'#ffcf5a'},
  neon:{n:'네온 세트',d:'PERFECT 판정 범위 40% 넓음 · 콤보마다 피해 +3%(최대 +45%)',win:1.4,combo:.03,col:'#ff3ad6'}};
 const perk=()=>PERK[skinId()]||null;
 const setb=()=>SETB[setOn()]||null;

 /* ---------- 내 상태 ---------- */
 const ST={poisonT:0,poisonAcc:0,drainT:0,kaiT:0,kaiCrit:false,trail:null,lastUlt:null,setShown:null};
 function poisonImm(){const p=perk();return !!(p&&p.poisonImm)||sumF('poisonRes')>=1}
 function poison(sec,label,quiet){const n=now0();if(poisonImm()){if(!quiet&&n-(ST.immPop||0)>900){ST.immPop=n;pop(P.x,P.y-30,'독 면역','#b0ff5a')}return}
  const res=Math.min(.9,sumF('poisonRes'));sec*=1-res;const was=ST.poisonT>n;ST.poisonT=Math.max(ST.poisonT,n+sec*1000);if(!was&&!quiet){pop(P.x,P.y-34,'☠ 중독! '+(label||''),'#8aff5a');try{sfx(180,.2,'sine',.04,90)}catch(e){}}}
 function drain(frac,label){const n=now0();let mx=.2;try{mx=stamMax()}catch(e){}if(P.stam===undefined)P.stam=mx;P.stam=Math.max(0,P.stam-mx*frac);if(P.stam<.01){P.stam=0;P.stamLock=true}ST.drainT=n+3000;pop(P.x,P.y-34,'⚡ 기력 흡수!','#b48aff');try{sfx(300,.3,'sine',.04,80)}catch(e){}}
 function onHurt(dmg){const p=perk();if(p&&p.aurora&&Math.random()<p.aurora){pop(P.x,P.y-30,'무지개 가호!','#ffb0ff');FX.push({k:'shield',t0:now0(),dur:500});try{sfx(1400,.15,'sine',.04,2200)}catch(e){}try{P.inv=Math.max(P.inv,now0()+400)}catch(e){}return 0}
  if(ST.kaiT>now0())return 0;return dmg}

 /* ---------- 공격 · 방패 ---------- */
 function critAdd(){const p=perk();return (p&&p.crit||0)+sumF('critAdd')}
 function forceCrit(){if(ST.kaiCrit){ST.kaiCrit=false;return true}return false}
 function dmgMul(combo){let m=1+sumF('dmgAdd');const p=perk(),b=setb();if(p&&p.luna&&P.hp<=P.maxhp*.3)m*=1.25;if(b&&b.combo)m*=1+Math.min(.45,(combo||0)*b.combo);return m}
 function shieldHit(bg){const t=WT[wpType()]||{},b=setb();let hit=(bg===2?2:1)*(t.shBreak||1)*(1+sumF('shBreak'));let pierce=(t.pierce||0)+sumF('pierce')+(b&&b.pierce||0);if(bg===2&&t.perfPierce)pierce=Math.max(pierce,t.perfPierce);
  return {hit:Math.max(1,Math.round(hit)),pierce:Math.min(1,pierce)}}
 function applyOn(kind,m){const t=T();if(kind==='burn'){m.burnT=t.clk+3;m.burnDps=Math.max(4,Math.round(m.max*.025))}else if(kind==='chill')m.chillT=t.clk+1.5;else if(kind==='poison'){m.poisT=t.clk+3;m.poisDps=Math.max(3,Math.round(m.max*.02))}}
 function onHit(m,dmg,crit,bg){const p=perk(),t=WT[wpType()]||{};
  if(t.onHit)applyOn(t.onHit,m);for(const g of gear())if(g.onHit)applyOn(g.onHit,m);
  if(p){if(p.onHit)applyOn(p.onHit,m);if(p.chill)applyOn('chill',m);
   if(p.chain&&bg===2){near(m.x,m.y,90,m).slice(0,2).forEach((o,i)=>{FX.push({k:'bolt',x0:m.x,y0:m.y-6,x1:o.x,y1:o.y-6,t0:now0()+i*60,dur:220,col:p.col});setTimeout(()=>hitM(o,dmg*.4,p.col,'⚡'),i*60)});try{sfx(1800,.12,'square',.03,600)}catch(e){}}
   if(p.spark&&crit){const o=near(m.x,m.y,80,m)[0];if(o){FX.push({k:'bolt',x0:m.x,y0:m.y-6,x1:o.x,y1:o.y-6,t0:now0(),dur:220,col:p.col});hitM(o,dmg*.3,p.col,'✦')}}}}
 function onKill(m){const b=setb();if(b&&b.boom&&!m._boom){m._boom=1;FX.push({k:'ring',x:m.x,y:m.y-6,t0:now0(),dur:420,r:38,col:b.col});setTimeout(()=>{for(const o of near(m.x,m.y,38,m))hitM(o,22,b.col,'공허 ')},60);try{sfx(90,.3,'sawtooth',.04,40)}catch(e){}}}

 /* ---------- 대시 ---------- */
 function onDash(){const p=perk(),n=now0();if(!p)return;
  if(p.trail)ST.trail={k:p.trail,until:n+190,col:p.col,last:null};
  if(p.kai){ST.kaiT=n+800;ST.kaiCrit=true;try{P.inv=Math.max(P.inv,n+800)}catch(e){}pop(P.x,P.y-30,'그림자 걸음','#c8c8e8')}
  if(p.meteor||p.lava){setTimeout(()=>{const x=P.x,y=P.y-4;if(p.meteor){for(let i=0;i<3;i++){const ox=x+(Math.random()-.5)*50,oy=y+(Math.random()-.5)*30;FX.push({k:'meteor',x:ox,y:oy,t0:now0()+i*120,dur:420,col:p.col,hit:0})}}
   else{FX.push({k:'lava',x,y,t0:now0(),dur:520,col:p.col,hit:0});try{sfx(80,.35,'sawtooth',.05,40)}catch(e){}}},170)}}
 /* 바닥 자국(대시 길): 1.6~2.5초 남아 밟은 적에게 효과 */
 const TR=[];
 /* ---------- 패리 ---------- */
 function doubleParry(){const p=perk();return !!(p&&p.dbl)}
 function onParry(n){const p=perk();if(!p||!n)return;
  if(p.dbl){try{P.inv=Math.max(P.inv,now0()+500)}catch(e){}}
  if(p.fox&&inTower()){for(let i=0;i<2;i++)FX.push({k:'fox',x:P.x+(i?10:-10),y:P.y-14,vx:(i?60:-60),vy:-60,t0:now0(),dur:2200,col:p.col,hit:0})}}

 /* ---------- 매 프레임 ---------- */
 const FX=[];let lastT=now0();
 function tick(){const n=now0(),dt=Math.min(.05,(n-lastT)/1000);lastT=n;if(typeof P==='undefined'||!P)return;
  const live=inTower()?!T().dead&&!T().bossCard&&!(typeof paused!=='undefined'&&paused):inBoss()&&!(typeof paused!=='undefined'&&paused);if(!live)return;
  /* 중독: 0.5초마다 */if(ST.poisonT>n){ST.poisonAcc+=dt;while(ST.poisonAcc>=.5){ST.poisonAcc-=.5;const d=Math.max(1,Math.round(P.maxhp*.012));if(P.hp>1){P.hp=Math.max(1,P.hp-d);pop(P.x+(Math.random()-.5)*10,P.y-26,'☠-'+d,'#8aff5a')}}}else ST.poisonAcc=0;
  /* 대시 길 자국 */const tr=ST.trail;if(tr&&n<tr.until){const L=tr.last;if(!L||Math.hypot(P.x-L.x,P.y-L.y)>6){const pt={x:P.x,y:P.y-2,t0:n,dur:tr.k==='fire'?2500:1600,k:tr.k,col:tr.col,hits:new Set()};TR.push(pt);tr.last=pt}}
  for(let i=TR.length-1;i>=0;i--){const q=TR[i];if(n-q.t0>q.dur){TR.splice(i,1);continue}
   if(inTower()){for(const m of T().mobs){if(m.hp<=0||m.born>0||q.hits.has(m))continue;if(Math.hypot(m.x-q.x,(m.y-q.y)*1.3)<13){q.hits.add(m);if(q.k==='fire'){applyOn('burn',m);m.burnDps=Math.max(6,Math.round(m.max*.035))}else{m.stunT=T().clk-.5;hitM(m,14,q.col,'균열 ')}}}}
   else if(inBoss()&&G.boss&&!q.hits.has('b')&&Math.hypot(G.boss.x-q.x,G.boss.y-q.y)<44){q.hits.add('b');bossDmg(G.maxHp*.002,q.col)}}
  /* 이펙트 · 날아가는 것 */
  for(let i=FX.length-1;i>=0;i--){const f=FX[i],q=(n-f.t0)/f.dur;if(q>1){FX.splice(i,1);continue}if(q<0)continue;
   if(f.k==='meteor'&&!f.hit&&q>.6){f.hit=1;if(inTower())for(const m of near(f.x,f.y,26))hitM(m,22,f.col,'★');else bossNear(f.x,f.y,60,.004,f.col);try{sfx(600,.15,'triangle',.04,200)}catch(e){}}
   if(f.k==='lava'&&!f.hit&&q>.15){f.hit=1;if(inTower())for(const m of near(f.x,f.y,30)){hitM(m,28,f.col,'🔥');applyOn('burn',m)}else bossNear(f.x,f.y,64,.005,f.col)}
   if(f.k==='fox'&&inTower()){const tgt=near(f.x,f.y,400)[0];if(tgt){const a=Math.atan2(tgt.y-6-f.y,tgt.x-f.x),v=160;f.vx+=(Math.cos(a)*v-f.vx)*Math.min(1,dt*5);f.vy+=(Math.sin(a)*v-f.vy)*Math.min(1,dt*5);if(Math.hypot(tgt.x-f.x,tgt.y-6-f.y)<10){hitM(tgt,25,f.col,'여우불 ');f.dur=0}}f.x+=f.vx*dt;f.y+=f.vy*dt}}
  /* 세트: 궁극기 게이지 더 빨리 */const b=setb();if(b&&b.ult){const cur=inTower()?T().ult:(G.ult||0);if(ST.lastUlt!=null&&cur>ST.lastUlt&&cur<100){const add=(cur-ST.lastUlt)*(b.ult-1);if(inTower())T().ult=Math.min(100,T().ult+add);else G.ult=Math.min(100,(G.ult||0)+add)}ST.lastUlt=inTower()?T().ult:(G.ult||0)}else ST.lastUlt=null;
  /* 세트 효과 알림(전투마다 한 번) */const sk=setOn(),key=(inTower()?'t'+T().f:'b'+(G&&G.bi))+'|'+sk;if(sk&&ST.setShown!==key){ST.setShown=key;pop(P.x,P.y-44,'✦ '+SETB[sk].n+' 효과!',SETB[sk].col)}}
 function bossNear(x,y,r,k,col){if(inBoss()&&G.boss&&Math.hypot(G.boss.x-x,G.boss.y-y)<r+30)bossDmg(G.maxHp*k,col)}
 /* 잡몹 상태(999997 updMob이 부름): 화상 · 중독 피해 */
 function mobTick(m,dt){const t=T();if(m.burnT>t.clk){m.burnAcc=(m.burnAcc||0)+dt;if(m.burnAcc>=.5){m.burnAcc-=.5;hitM(m,m.burnDps||4,'#ff8a3a','🔥')}}
  if(m.poisT>t.clk){m.poisAcc=(m.poisAcc||0)+dt;if(m.poisAcc>=.5){m.poisAcc-=.5;hitM(m,m.poisDps||3,'#8aff5a','☠')}}}
 {const f=frame;frame=function(){const r=f.apply(this,arguments);try{tick()}catch(e){}return r}}

 /* ---------- 그리기 ---------- */
 function drawWorld(){const c=ctx,n=now0();c.save();
  for(const q of TR){const k=(n-q.t0)/q.dur,al=1-k;c.globalCompositeOperation='lighter';
   if(q.k==='fire'){for(let i=0;i<3;i++){const fl=Math.sin(n/60+i*2+q.x)*1.5,h=5+i*2+Math.sin(n/90+i)*2;c.globalAlpha=al*(.55-i*.12);c.fillStyle=i===0?'#ffffff':q.col;c.beginPath();c.ellipse(q.x+fl,q.y-h/2,2.6-i*.4,h,0,0,6.28);c.fill()}}
   else{c.globalAlpha=al*.7;c.strokeStyle=q.col;c.lineWidth=2;c.beginPath();c.moveTo(q.x-5,q.y+1);c.lineTo(q.x-1,q.y-2);c.lineTo(q.x+2,q.y+1);c.lineTo(q.x+6,q.y-1);c.stroke();c.globalAlpha=al*.25;c.fillStyle=q.col;c.beginPath();c.ellipse(q.x,q.y,7,2.5,0,0,6.28);c.fill()}}
  c.globalCompositeOperation='source-over';c.globalAlpha=1;c.lineWidth=1;
  for(const f of FX){const q=(n-f.t0)/f.dur;if(q<0||q>1)continue;c.save();c.globalCompositeOperation='lighter';
   if(f.k==='bolt'){c.globalAlpha=1-q;c.strokeStyle=f.col;c.lineWidth=2;c.beginPath();c.moveTo(f.x0,f.y0);for(let i=1;i<5;i++){const u=i/5;c.lineTo(f.x0+(f.x1-f.x0)*u+(Math.random()-.5)*8,f.y0+(f.y1-f.y0)*u+(Math.random()-.5)*8)}c.lineTo(f.x1,f.y1);c.stroke();c.strokeStyle='#ffffff';c.lineWidth=.8;c.stroke()}
   else if(f.k==='meteor'){if(q<.6){const k=q/.6,sx=f.x+30*(1-k),sy=f.y-80*(1-k);c.globalAlpha=1;c.strokeStyle=f.col;c.lineWidth=3;c.beginPath();c.moveTo(sx+12,sy-24);c.lineTo(sx,sy);c.stroke();c.fillStyle='#ffffff';c.beginPath();c.arc(sx,sy,2.5,0,6.28);c.fill();c.globalAlpha=.3;c.fillStyle=f.col;c.beginPath();c.ellipse(f.x,f.y,10*k,4*k,0,0,6.28);c.fill()}
    else{const k=(q-.6)/.4;c.globalAlpha=1-k;c.strokeStyle=f.col;c.lineWidth=2;c.beginPath();c.ellipse(f.x,f.y,8+k*22,3+k*9,0,0,6.28);c.stroke();c.fillStyle='#ffffff';for(let i=0;i<6;i++){const a=i/6*6.28;c.fillRect(f.x+Math.cos(a)*k*20,f.y+Math.sin(a)*k*8-k*6,2,2)}}}
   else if(f.k==='lava'){const k=q;c.globalAlpha=(1-k)*.9;const g=c.createRadialGradient(f.x,f.y,0,f.x,f.y,30);g.addColorStop(0,'#fff0a0');g.addColorStop(.4,f.col);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.beginPath();c.ellipse(f.x,f.y,30*(.5+k*.6),12*(.5+k*.6),0,0,6.28);c.fill();
    for(let i=0;i<8;i++){const a=i/8*6.28,h=k*26*(1-k)*2;c.fillStyle=i%2?'#ffd166':f.col;c.fillRect(f.x+Math.cos(a)*k*24,f.y+Math.sin(a)*k*9-h,2,2)}}
   else if(f.k==='ring'){c.globalAlpha=1-q;c.strokeStyle=f.col;c.lineWidth=3*(1-q)+1;c.beginPath();c.ellipse(f.x,f.y,f.r*q,f.r*q*.7,0,0,6.28);c.stroke()}
   else if(f.k==='fox'){c.globalAlpha=.9;const g=c.createRadialGradient(f.x,f.y,0,f.x,f.y,6);g.addColorStop(0,'#ffffff');g.addColorStop(.5,f.col);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(f.x-6,f.y-6,12,12)}
   c.restore()}
  c.restore()}
 function drawPlayer(){if(typeof P==='undefined'||!P)return;const c=ctx,n=now0(),icons=[];
  if(ST.poisonT>n)icons.push(['☠',Math.ceil((ST.poisonT-n)/1000),'#8aff5a','#16300e']);if(ST.drainT>n)icons.push(['⚡',Math.ceil((ST.drainT-n)/1000),'#d0b0ff','#24183a']);
  if(ST.kaiT>n){c.save();c.globalAlpha=.35;c.fillStyle='#000';c.beginPath();c.ellipse(P.x,P.y-10,10,14,0,0,6.28);c.fill();c.restore()}
  for(const f of FX)if(f.k==='shield'){const q=(n-f.t0)/f.dur;if(q>=0&&q<1){c.save();c.globalCompositeOperation='lighter';c.globalAlpha=1-q;for(let i=0;i<5;i++){c.strokeStyle=['#ff6a8a','#ffd166','#7dffa8','#8de4ff','#c88aff'][i];c.lineWidth=1.5;c.beginPath();c.arc(P.x,P.y-10,14+i*2+q*6,0,6.28);c.stroke()}c.restore()}}
  if(ST.poisonT>n){c.save();c.globalCompositeOperation='lighter';for(let i=0;i<3;i++){const ph=(n/700+i/3)%1;c.globalAlpha=(1-ph)*.7;c.fillStyle='#8aff5a';c.beginPath();c.arc(P.x+Math.sin(i*2.1+n/300)*7,P.y-12-ph*14,1.6,0,6.28);c.fill()}c.restore()}
  if(!icons.length)return;let x=P.x-(icons.length*15)/2;const y=P.y-46;c.save();c.font='900 7px sans-serif';c.textAlign='center';c.textBaseline='middle';
  for(const [ic,sec,col,bgc] of icons){c.globalAlpha=.92;c.fillStyle=bgc;c.fillRect(x,y,14,10);c.fillStyle=col;c.fillRect(x,y,14,1);c.fillText(ic+sec,x+7,y+5.5);x+=15}c.restore()}
 function drawMobFx(m){const t=T(),c=ctx;c.save();c.globalCompositeOperation='lighter';
  if(m.burnT>t.clk){for(let i=0;i<3;i++){const ph=(t.clk*2+i/3+m.seed)%1;c.globalAlpha=(1-ph)*.8;c.fillStyle=i%2?'#ffd166':'#ff6a2a';c.fillRect(m.x+Math.sin(i*2+m.seed)*6-1,m.y-4-ph*16,2,3)}}
  if(m.poisT>t.clk){for(let i=0;i<2;i++){const ph=(t.clk*1.5+i/2+m.seed)%1;c.globalAlpha=(1-ph)*.7;c.fillStyle='#8aff5a';c.beginPath();c.arc(m.x+Math.cos(i*3+m.seed)*6,m.y-8-ph*12,1.5,0,6.28);c.fill()}}
  if(m.chillT>t.clk){c.globalAlpha=.35;c.strokeStyle='#bfe8ff';c.beginPath();c.ellipse(m.x,m.y+2,10*m.s,4*m.s,0,0,6.28);c.stroke();c.fillStyle='#ffffff';c.globalAlpha=.6;c.fillRect(m.x-6,m.y-14+Math.sin(t.clk*4)*2,1,1);c.fillRect(m.x+5,m.y-10,1,1)}
  c.restore()}
 /* 보스전에서도 그리기 */
 {const f=drawScene;drawScene=function(now){const r=f.apply(this,arguments);try{if(mode==='boss'){drawWorld();drawPlayer()}}catch(e){}return r}}

 /* ---------- 보스전 연결 ---------- */
 /* 반격 피해 · 치명타: 180의 계산식이 CB81.critAdd · dmgMul · onBossHit을 부름 */
 function onBossHit(dmg,crit,perfect){const p=perk(),b=setb();let extra=0;if(p&&p.chain&&perfect)extra+=dmg*.2;if(p&&p.spark&&crit)extra+=dmg*.2;if(p&&p.bossMul)extra+=dmg*(p.bossMul-1);if(b&&b.bossMul)extra+=dmg*(b.bossMul-1);
  if(extra>0)setTimeout(()=>bossDmg(extra,(p||b).col),90)}
 if(typeof doParry==='function'){const f=doParry;doParry=function(now){const before=(G.parrySp||[]).length;const r=f.apply(this,arguments);
  try{const p=perk();if(p&&(p.dbl||p.fox)){const add=(G.parrySp||[]).slice(before);for(const s of add.slice(0,p.dbl?add.length:1))G.parrySp.push(Object.assign({},s,{t:s.t+120,side:-s.side*1.3}));if(p.dbl)P.inv=Math.max(P.inv,now+200)}}catch(e){}return r}}
 if(typeof hurtP==='function'){const f=hurtP;hurtP=function(dmg,now){if(mode==='boss'&&!(now<P.inv)){dmg=onHurt(dmg);if(dmg<=0){P.inv=Math.max(P.inv,now+300);return}}const hp0=P.hp;const r=f.call(this,dmg,now);
  /* 보스의 상태 이상 공격: 보통 15% 중독, 어려움 25% 중독 · 10% 탈진, 익스트림 30% 중독 · 20% 탈진 */
  try{if(mode==='boss'&&P.hp<hp0&&P.hp>0&&G.state==='play'&&diff!=='easy'){const pc={normal:.15,hard:.25,extreme:.3}[diff]||0,dc={hard:.1,extreme:.2}[diff]||0;if(Math.random()<pc)poison(3,'보스의 독');else if(Math.random()<dc)drain(.5)}}catch(e){}return r}}
 /* PERFECT 범위(네온 세트): win은 상수 함수라 감쌀 수 없어서 100 · 999997이 CB81.winMul()을 곱한다 */
 function winMul(){try{const b=setb();return b&&b.win||1}catch(e){return 1}}
 if(typeof stamMax==='function'){const f=stamMax;stamMax=function(){const r=f.apply(this,arguments);try{const b=setb();return r+(b&&b.dash?.2*b.dash:0)}catch(e){return r}}}
 if(typeof stamTick==='function'){const f=stamTick;stamTick=function(dt){let k=1;try{const b=setb();if(b&&b.regen)k*=b.regen;if(ST.drainT>now0())k*=.4}catch(e){}return f.call(this,dt*k)}}
 if(typeof doDash==='function'){const f=doDash;doDash=function(){const d0=P.dash;const r=f.apply(this,arguments);try{if(mode==='boss'&&P.dash&&P.dash!==d0)onDash()}catch(e){}return r}}

 /* ---------- 상점에 능력 보이기 ---------- */
 try{(window.SKIN58&&SKIN58.list||[]).forEach(s=>{const p=PERK[s.id];if(p&&s.tags&&!s.tags.some(x=>/^⚡/.test(x)))s.tags.unshift('⚡ 능력 · '+p.n)})}catch(e){}
 try{(window.SWORD59&&SWORD59.list||[]).forEach(s=>{const t=WT[s.type];if(t&&s.tags&&!s.tags.some(x=>/^🛡/.test(x)))s.tags.unshift('🛡 '+t.desc)})}catch(e){}
 try{for(let i=0;i<WEAPONS.length;i++){const w=WEAPONS[i],t=WT[w.type];if(t&&w.desc&&w.desc.indexOf('◆')<0)w.desc+=' ◆ '+t.desc}}catch(e){}
 /* 스킨 상점 상세 화면에 능력 · 세트 효과 설명 붙이기 */
 function shopNote(){const box=document.querySelector('#bbShop .ssInfo');if(!box||box.querySelector('.ssPerk81'))return;const name=(box.querySelector('h3')||{}).textContent||'';let html='';
  for(const k in PERK){const s=(window.SKIN58&&SKIN58.list||[]).find(x=>x.id===k);if(s&&s.name===name)html='<b>⚡ '+PERK[k].n+'</b> — '+PERK[k].d}
  for(const k in SETB){const nm=SETB[k].n;if(name===nm)html='<b>✦ 세트 효과</b> — '+SETB[k].d+'<br><small>세트의 스킨과 검을 함께 장착하면 켜져요. 스킨 능력도 그대로 있어요.</small>'}
  if(!html){const s=(window.SWORD59&&SWORD59.list||[]).find(x=>x.name===name);if(s&&WT[s.type])html='<b>🛡 무기 특성</b> — '+WT[s.type].desc;const st=Object.keys(SETS).find(k=>SETS[k][0]===((window.SKIN58&&SKIN58.list||[]).find(x=>x.name===name)||{}).id||SETS[k][1]===(s||{}).id);if(st)html+='<br><small>✦ '+SETB[st].n+'(스킨 + 검)를 맞추면: '+SETB[st].d+'</small>'}
  if(html){const d=document.createElement('div');d.className='ssPerk81';d.innerHTML=html;const tags=box.querySelector('.ssTags');box.insertBefore(d,tags||null)}}
 setInterval(()=>{try{shopNote()}catch(e){}},400);
 const st=document.createElement('style');st.textContent=`#bbShop .ssPerk81{margin:8px 0;padding:8px 10px;border-radius:10px;background:linear-gradient(90deg,#2a1a4a,#16203a);border:1px solid #c8a8ff55;color:#e8e0ff;font-size:12.5px;line-height:1.5}
 #bbShop .ssPerk81 b{color:#ffd166}#bbShop .ssPerk81 small{color:#b8c0e0}`;document.head.appendChild(st);

 window.CB81={tick/* v134: 비밀의 방 · 던전(SK130)이 직접 부름 */,poison,drain,onHurt,critAdd,forceCrit,dmgMul,shieldHit,onHit,onKill,onDash,onParry,doubleParry,mobTick,drawWorld,drawPlayer,drawMobFx,onBossHit,
  perk,setOn,winMul,PERK,SETB,WT,state:()=>ST};
}catch(e){console.error('v81 combat',e)}})();
