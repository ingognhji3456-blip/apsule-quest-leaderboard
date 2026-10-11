/* ================= v174 로그라이크 원정 (RG174) =================
   ☰ 메뉴 「🗺 로그라이크 원정」(또는 보스 러시 화면 줄). 방 15개를 차례로: 1~14방은 탑 경기장의 잡몹 방(5 · 10방은 정예 방), 15방은 진짜 보스(1·2장 중 무작위).
   - 방을 깰 때마다 능력 카드 3장 중 1장(희귀도: 보통 · 희귀 · 영웅, 방이 깊을수록 · 정예 방은 좋은 카드가 잘 나옴). 8방 뒤엔 「쉼터」 카드(체력 60% 회복)도.
   - 체력은 방을 넘어가도 그대로(카드로 회복). 쓰러지면 끝(부활 카드가 있으면 다시 일어남) → 처음부터.
   - 카드 효과는 원정 중에만: CB81.dmgMul · critAdd · onHurt · onKill 감싸기 + 최대 체력(P.maxhp) · 방 끝 회복 · 부활(탑 T.dead · 보스전 fightEnd(false) 가로채기).
   - 탑 경기장은 TW71.start(1)(window.__nosr) 뒤 방마다 T.queue · T.pal을 바꿔 끼움. 탑 진행(층)은 시작 전 값으로 되돌림.
   - 끝나면 /api/rogue/submit(점수 = 방 × 1000 + 완주 5000 + 시간 보너스, 주간 · 전체 순위), 이번 주 첫 완주는 🪙5,000 · 💎30 우편. 원정 골드는 바로 지급(방 × 150, 카드로 늘어남). */
(()=>{try{
 if(!window.TW71||!window.CB81)return;
 const $=id=>document.getElementById(id),esc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const api=(p,b)=>window.DUO85&&DUO85.api?DUO85.api(p,b?'POST':'GET',b):Promise.resolve({s:0,j:{}});
 const acc=()=>{try{return DUO85.acc()}catch(e){return {}}};
 const num=v=>Number(v||0).toLocaleString(),fmt=ms=>{const s=Math.floor(ms/1000);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
 const toast=t=>{try{window.MR163&&MR163.toast?MR163.toast(t):banner(t)}catch(e){}};
 const ROOMS=15,SPK=['slime','bat','archer','boar','gear','mage','bomb','golem','wisp','drone','spider','knight','toad','wraith'];
 /* 카드: [id, 희귀도(0 보통 · 1 희귀 · 2 영웅), 아이콘, 이름, 설명] */
 const CARDS=[['c_atk',0,'⚔','날 세우기','공격력 +15%'],['c_crit',0,'🎯','눈썰미','치명 확률 +8%'],['c_hp',0,'❤','튼튼한 몸','최대 체력 +20 (바로 20 회복)'],['c_heal',0,'🍀','숨 고르기','방을 깰 때마다 체력 15% 회복'],
  ['c_armor',0,'🛡','두꺼운 갑옷','받는 피해 −12%'],['c_vamp',0,'🩸','흡혈','처치하면 체력 +3'],['c_ult',0,'💥','투지','처치하면 궁극기 +6%'],['c_gold',0,'🪙','주머니','원정 골드 +30%'],
  ['r_atk',1,'🗡','명검','공격력 +30%'],['r_rage',1,'😡','분노','체력이 절반 이하면 공격력 +45%'],['r_chain',1,'⚡','연쇄 번개','처치하면 가까운 적에게 번개(40)'],['r_shield',1,'🔰','수호의 방패','방마다 처음 맞는 한 대를 막아 줌'],
  ['r_combo',1,'🔥','몰아치기','콤보 1마다 피해 +1.5% (최대 +45%)'],['r_thorns',1,'🌵','가시 갑옷','맞으면 주변 적에게 30 반사'],['r_second',1,'🕊','두 번째 기회','쓰러지면 한 번 체력 40%로 일어남'],
  ['e_glass',2,'💎','유리 대포','공격력 +70%, 받는 피해 +40%'],['e_crit',2,'🌟','급소 사냥꾼','치명 +20%, 치명이면 체력 +2'],['e_titan',2,'🗿','거인의 피','최대 체력 +60, 받는 피해 −15%'],
  ['e_storm',2,'🌩','폭풍','처치마다 연쇄 번개 3번'],['e_phoenix',2,'🦅','불사조','쓰러지면 두 번 체력 30%로 일어남'],['e_midas',2,'👑','미다스','원정 골드 ×2, 처치마다 🪙5']];
 const CBY=Object.fromEntries(CARDS.map(c=>[c[0],c])),RC=['#c8d4e0','#5ab8ff','#ffd166'],RN=['보통','희귀','영웅'];
 const RG={on:false,room:0,cards:[],t0:0,save:null,rev:0,shieldUsed:false,hpBonus:0,kills:0,midas:0,choosing:false,boss:-1,clearT:0,maxhp0:0,hp:0};
 const has=k=>RG.on?RG.cards.filter(c=>c===k).length:0;
 /* ----- 카드 효과(원정 중에만) ----- */
 {const f=CB81.dmgMul;CB81.dmgMul=function(combo){let m=f.apply(this,arguments);if(RG.on){m*=Math.pow(1.15,has('c_atk'))*Math.pow(1.3,has('r_atk'))*Math.pow(1.7,has('e_glass'));if(has('r_rage')&&P.hp<=P.maxhp*.5)m*=1+.45*has('r_rage');
   if(has('r_combo'))m*=1+Math.min(.45,(combo||0)*.015*has('r_combo'))}return m}}
 {const f=CB81.critAdd;CB81.critAdd=function(){return f.apply(this,arguments)+(RG.on?.08*has('c_crit')+.2*has('e_crit'):0)}}
 {const f=CB81.onHurt;CB81.onHurt=function(dmg){let d=f.apply(this,arguments);if(!RG.on||!d)return d;
   if(has('r_shield')&&!RG.shieldUsed){RG.shieldUsed=true;pop(P.x,P.y-30,'🔰 막음!','#9fe8ff');try{sfx(1200,.12,'square',.04,1800)}catch(e){}return 0}
   d*=Math.pow(.88,has('c_armor'))*Math.pow(.85,has('e_titan'))*Math.pow(1.4,has('e_glass'));
   if(has('r_thorns')&&mode==='tower'){const T=TW71.T;for(const m of T.mobs)if(m.hp>0&&m.born<=0&&Math.hypot(m.x-P.x,m.y-P.y)<60)TW71.hitMob(m,30*has('r_thorns'),'#a6f5a0','가시 ')}
   return Math.max(1,Math.round(d))}}
 {const f=CB81.onKill;CB81.onKill=function(m){const r=f.apply(this,arguments);try{if(RG.on&&m&&!m._rg){m._rg=1;RG.kills++;
   if(has('c_vamp'))P.hp=Math.min(P.maxhp,P.hp+3*has('c_vamp'));if(has('e_midas'))RG.midas+=5*has('e_midas');
   if(has('c_ult')){const T=TW71.T;if(mode==='tower'&&T)T.ult=Math.min(100,(T.ult||0)+6*has('c_ult'))}
   const n=has('r_chain')+3*has('e_storm');if(n&&mode==='tower')setTimeout(()=>chain(m,n),80)}}catch(e){}return r}}
 if(CB81.onHit){const f=CB81.onHit;CB81.onHit=function(m,dmg,crit){const r=f.apply(this,arguments);try{if(RG.on&&crit&&has('e_crit'))P.hp=Math.min(P.maxhp,P.hp+2*has('e_crit'))}catch(e){}return r}}
 function chain(from,n){const T=TW71.T;let x=from.x,y=from.y;for(let i=0;i<n;i++){const t=T.mobs.filter(m=>m.hp>0&&m.born<=0).sort((a,b)=>Math.hypot(a.x-x,a.y-y)-Math.hypot(b.x-x,b.y-y))[0];if(!t)break;
   RG.bolts.push({x0:x,y0:y,x1:t.x,y1:t.y-8,t:performance.now()});TW71.hitMob(t,40,'#ffe79a','⚡');x=t.x;y=t.y;try{sfx(1600-i*200,.06,'sawtooth',.03,400)}catch(e){}}}
 RG.bolts=[];
 const pop=(x,y,t,c)=>{try{TW71.addPop(x,y,t,c)}catch(e){}};
 function applyHP(){const base=RG.maxhp0||P.maxhp;P.maxhp=base+RG.hpBonus}

 /* ----- 방 만들기 ----- */
 const rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.floor(Math.random()*a.length)];
 function setupRoom(n){const T=TW71.T,elite=n===5||n===10,th=Math.floor(Math.random()*7),hpk=(1+n*.16)*(elite?1.2:1);
  const sp=[pick(SPK),pick(SPK),pick(SPK)],cnt=Math.min(14,4+Math.floor(n/2)),list=[];for(let i=0;i<cnt;i++)list.push({sp:sp[i%3],elite:false});
  if(elite){for(let i=0;i<2+Math.floor(n/5);i++)list.push({sp:sp[i%2],elite:true})}else if(n>=7)list.push({sp:sp[0],elite:true});
  const norm=list.filter(q=>!q.elite).sort(()=>Math.random()-.5),els=list.filter(q=>q.elite);
  T.pal=TW71.ZPAL[th];T.z=th*10+Math.floor(n/3);T.vets=[];T.mobs=[];T.shots=[];T.tels=[];T.clear=false;T.doorK=0;T.dead=false;
  T.queue=norm.concat(els).map(q=>({sp:q.sp,elite:q.elite,hp:Math.round(TW71.SP[q.sp].hp*hpk*(q.elite?3.5:1))}));T.total=T.queue.length;T.cap=Math.min(5,2+Math.floor(n/4));T.nextSpawn=.9;
  T.trans={t:0,txt:n+'번째 방'+(elite?' · 정예':''),sub:'🗺 로그라이크 원정 · '+ROOMS+'방 중 '+n+(RG.cards.length?' · 카드 '+RG.cards.length+'장':'')};
  RG.room=n;RG.shieldUsed=false;RG.choosing=false;RG.clearT=0;P.x=AX+AW/2;P.y=AY+AH-24}
 function start(){if(RG.on)return;closePanel();try{$('overlay').hidden=true}catch(e){}
  RG.save=(()=>{try{const s=saveData.tw71||{};return {floor:s.floor,best:s.best}}catch(e){return null}})();
  window.__nosr=1;try{TW71.start(1)}finally{window.__nosr=0}
  Object.assign(RG,{on:true,cards:[],t0:performance.now(),rev:0,hpBonus:0,kills:0,midas:0,boss:Math.floor(Math.random()*19),maxhp0:P.maxhp,bolts:[]});if(RG.boss===9)RG.boss=8;
  setupRoom(1);try{$('bvTitle').textContent='BEAT BLADE · 로그라이크 원정'}catch(e){}}
 function revives(){return has('r_second')+2*has('e_phoenix')-RG.rev}
 function tryRevive(){if(revives()<=0)return false;RG.rev++;const k=has('e_phoenix')&&RG.rev>has('r_second')?.3:.4;P.hp=Math.max(1,Math.round(P.maxhp*k));P.inv=performance.now()+1800;pop(P.x,P.y-34,'🕊 다시 일어남!','#ffe79a');try{sfx(523,.2,'triangle',.06,1046)}catch(e){}return true}
 {const f=frame;frame=function(){const r=f.apply(this,arguments);try{if(RG.on){const now=performance.now();
   if(mode==='tower'){const T=TW71.T;T.doorK=0;
    if(T.dead){if(tryRevive()){T.dead=false;try{$('overlay').hidden=true}catch(e){}try{TW71.music()}catch(e){}}else finish(false)}
    else if(T.clear&&!RG.choosing){if(!RG.clearT)RG.clearT=now;if(now-RG.clearT>700){RG.choosing=true;if(has('c_heal'))P.hp=Math.min(P.maxhp,P.hp+Math.round(P.maxhp*.15*has('c_heal')));showPick()}}}
   /* 원정 표시 · 번개 */
   if(mode==='tower'||mode==='boss'){const c=ctx;c.save();try{c.setTransform(SS,0,0,SS,0,0)}catch(e){}
    RG.bolts=RG.bolts.filter(b=>now-b.t<220);for(const b of RG.bolts){const q=1-(now-b.t)/220;c.globalAlpha=q;c.strokeStyle='#ffe79a';c.lineWidth=2;c.beginPath();c.moveTo(b.x0,b.y0-8);const mx=(b.x0+b.x1)/2+rnd(-6,6),my=(b.y0+b.y1)/2-8+rnd(-6,6);c.lineTo(mx,my);c.lineTo(b.x1,b.y1);c.stroke()}
    c.globalAlpha=1;const tx='🗺 '+RG.room+' / '+ROOMS+'방 · 카드 '+RG.cards.length+(revives()>0?' · 🕊×'+revives():'')+' · '+fmt(now-RG.t0);c.font='bold 8px sans-serif';const w=c.measureText(tx).width+12;
    c.globalAlpha=.85;c.fillStyle='#0a1a14';c.fillRect(W-w-6,H-24,w,12);c.globalAlpha=1;c.fillStyle='#a6f5c6';c.textAlign='right';c.fillText(tx,W-12,H-15);c.restore()}}}catch(e){console.error('rg174',e)}return r}}
 {const f=toLobby;toLobby=function(){if(RG.on)finish(false,true);pickBox.hidden=true;return f.apply(this,arguments)}}
 if(typeof fightEnd==='function'){const f=fightEnd;fightEnd=function(won){if(RG.on&&G&&G.rg174&&G.state!=='result'){if(!won&&tryRevive())return;G.state='result';G.won=!!won;try{stopMusic()}catch(e){}finish(!!won);return}return f.apply(this,arguments)}}
 function bossRoom(){RG.room=ROOMS;const hp=P.hp;try{startRush(RG.boss)}catch(e){console.error(e);finish(false);return}
  try{G.rg174=1;applyHP();P.hp=Math.min(P.maxhp,hp);$('bossName').textContent='🗺 원정의 끝 · '+BOSSES[RG.boss].name;$('bvTitle').textContent='BEAT BLADE · 로그라이크 원정 · 보스'}catch(e){}}

 /* ----- 카드 고르기 ----- */
 const pickBox=document.createElement('div');pickBox.id='rgc174';pickBox.hidden=true;document.body.appendChild(pickBox);pickBox.addEventListener('pointerdown',e=>e.stopPropagation());
 function roll(n){const elite=n===5||n===10,out=[],used=new Set();for(let i=0;i<3;i++){let r=Math.random(),rar=elite?(r<.35?2:1):(r<.04+n*.012?2:r<.25+n*.02?1:0);
   const pool=CARDS.filter(c=>c[1]===rar&&!used.has(c[0]));const c=pick(pool.length?pool:CARDS.filter(c=>!used.has(c[0])));used.add(c[0]);out.push(c)}return out}
 function showPick(){const n=RG.room,opts=roll(n),rest=n>=8&&n%4===0;
  pickBox.innerHTML='<div class="pk"><small>'+n+' / '+ROOMS+'방 정복! · 체력 '+P.hp+' / '+P.maxhp+'</small><b>카드를 한 장 골라요</b><div class="cs">'+opts.map(c=>'<button class="cd r'+c[1]+'" data-c="'+c[0]+'" style="--c:'+RC[c[1]]+'"><em>'+RN[c[1]]+'</em><i>'+c[2]+'</i><b>'+esc(c[3])+'</b><small>'+esc(c[4])+'</small>'+(has(c[0])?'<u>×'+(has(c[0])+1)+'</u>':'')+'</button>').join('')+
   (rest?'<button class="cd rest" data-c="rest" style="--c:#7dffa8"><em>쉼터</em><i>⛺</i><b>쉼터</b><small>체력 60% 회복</small></button>':'')+'</div>'+
   (RG.cards.length?'<div class="mine">'+RG.cards.map(k=>'<span title="'+esc(CBY[k][4])+'" style="--c:'+RC[CBY[k][1]]+'">'+CBY[k][2]+'</span>').join('')+'</div>':'')+'</div>';
  pickBox.hidden=false;try{sfx(660,.12,'triangle',.05,990)}catch(e){}
  pickBox.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{const k=b.dataset.c;pickBox.hidden=true;
   if(k==='rest')P.hp=Math.min(P.maxhp,P.hp+Math.round(P.maxhp*.6));else{RG.cards.push(k);if(k==='c_hp'){RG.hpBonus+=20;applyHP();P.hp=Math.min(P.maxhp,P.hp+20)}if(k==='e_titan'){RG.hpBonus+=60;applyHP();P.hp=Math.min(P.maxhp,P.hp+60)}}
   try{gmSfx('ok')}catch(e){}if(RG.room+1>=ROOMS)bossRoom();else setupRoom(RG.room+1)})}

 /* ----- 끝 ----- */
 async function finish(clear,quiet){if(!RG.on)return;RG.on=false;pickBox.hidden=true;const ms=Math.round(performance.now()-RG.t0),rooms=clear?ROOMS:Math.max(0,RG.room-1),cards=RG.cards.slice();
  try{const s=saveData.tw71;if(s&&RG.save){s.floor=RG.save.floor;s.best=RG.save.best}}catch(e){}try{P.maxhp=RG.maxhp0||P.maxhp;P.hp=Math.min(P.hp,P.maxhp)}catch(e){}
  const gold=Math.round(rooms*150*(1+.3*cards.filter(c=>c==='c_gold').length)*(cards.includes('e_midas')?2:1))+RG.midas;if(gold>0){try{addCoins(gold)}catch(e){saveData.coins=(saveData.coins||0)+gold}}try{saveNow();gmHud()}catch(e){}
  if(quiet)return;try{TW71.T.dead=true}catch(e){}try{stopMusic()}catch(e){}
  let res=null;if(acc().token&&rooms>0){const r=await api('/api/rogue/submit',{rooms,clear,ms,cards,diff});if(r.s===200)res=r.j}
  const html='<div class="rg174r"><b>'+(clear?'🏆 원정 완주!':'🗺 '+rooms+' / '+ROOMS+'방')+'</b><div class="rs"><span>시간 <b>'+fmt(ms)+'</b></span><span>처치 <b>'+RG.kills+'</b></span><span>골드 <b>🪙 '+num(gold)+'</b></span></div>'+
   (res?'<div class="sc">점수 <b>'+num(res.score)+'</b> · 이번 주 <b>'+res.rank+'위</b>'+(res.best_all?' · 🆕 내 최고!':'')+'</div>'+(res.first_clear?'<div class="sc g">🎉 이번 주 첫 완주! 🪙5,000 · 💎30 우편</div>':''):'')+
   (cards.length?'<div class="mine">'+cards.map(k=>'<span style="--c:'+RC[CBY[k][1]]+'" title="'+esc(CBY[k][3]+' · '+CBY[k][4])+'">'+CBY[k][2]+'</span>').join('')+'</div>':'')+'</div>';
  try{showOverlay('ROGUE RUN',clear?'원정 완주!':'원정 끝',html,[['🗺 다시 원정',()=>{$('overlay').hidden=true;try{toLobby()}catch(e){}setTimeout(start,250)},true],['로비로',()=>{try{toLobby()}catch(e){}},false]])}catch(e){}}

 /* ----- 시작 창 ----- */
 const box=document.createElement('div');box.id='rg174';box.hidden=true;document.body.appendChild(box);box.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===box)closePanel()});
 const V={tab:'week',top:null};
 async function openPanel(){box.hidden=false;paint();const r=await api('/api/rogue/top',{});V.top=r.s===200?r.j:null;paint()}
 function closePanel(){box.hidden=true}
 function paint(){if(box.hidden)return;const T=V.top,L=T?T[V.tab]:null;
  box.innerHTML='<div class="pn"><div class="hd"><button class="bk">닫기</button><i>🗺</i><div><b>로그라이크 원정</b><small>방 '+ROOMS+'개 · 방마다 능력 카드 · 쓰러지면 처음부터</small></div></div>'+
   '<div class="two"><div class="rl"><ul><li>잡몹 방 14개(5 · 10번째는 <b>정예 방</b>)를 지나 마지막 <b>15번째 방의 보스</b>를 쓰러뜨리면 완주!</li><li>방을 깰 때마다 <b>능력 카드 3장 중 1장</b> — 깊이 갈수록 · 정예 방은 좋은 카드가 잘 나와요. 같은 카드는 겹쳐요.</li>'+
   '<li>체력은 이어져요. <b>쉼터</b>(8 · 12방 뒤)나 카드로 회복해요.</li><li>쓰러지면 끝 — 부활 카드가 있으면 다시 일어나요.</li><li>방마다 🪙150 · 이번 주 <b>첫 완주는 🪙5,000 · 💎30</b>'+(T&&T.cleared_week?' <em>(이번 주 완주함)</em>':'')+'</li></ul>'+
   '<h5>카드 '+CARDS.length+'종</h5><div class="cl">'+CARDS.map(c=>'<span style="--c:'+RC[c[1]]+'" title="'+esc(c[3]+' · '+c[4])+'">'+c[2]+'</span>').join('')+'</div>'+
   '<button class="go" data-go>🗺 원정 떠나기</button>'+(T&&T.me?'<small>내 최고 점수 '+num(T.me.score)+' · '+T.me.rooms+'방'+(T.me.clear?' · 완주':'')+'</small>':'')+'</div>'+
   '<div><div class="tabs">'+[['week','이번 주'],['all','전체']].map(([k,n])=>'<button data-t="'+k+'" class="'+(V.tab===k?'on':'')+'">'+n+'</button>').join('')+'</div><div class="tb">'+
   (!L?'<div class="em">불러오는 중…</div>':L.length?L.map((x,i)=>'<div class="tr"><i>'+(i<3?['🥇','🥈','🥉'][i]:i+1)+'</i><b>'+esc(x.name)+'</b><span>'+num(x.score)+'</span><small>'+(x.clear?'🏆 완주':x.rooms+'방')+' · '+fmt(x.ms)+'</small><em>'+x.cards.slice(0,8).map(k=>CBY[k]?CBY[k][2]:'').join('')+'</em></div>').join(''):'<div class="em">아직 기록이 없어요 · 첫 원정을 떠나 봐요!</div>')+'</div></div></div></div>';
  box.querySelector('.bk').onclick=closePanel;box.querySelector('[data-go]').onclick=()=>{try{initAudio()}catch(e){}start()};box.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{V.tab=b.dataset.t;paint()})}
 /* 보스 러시 화면 줄에 단추 */
 setInterval(()=>{try{const r=$('rx168');if(!r||r.querySelector('.rg'))return;const b=document.createElement('button');b.className='gmBtn rg';b.type='button';b.innerHTML='<i>🗺</i><span><b>로그라이크 원정</b><small>방 15개 · 능력 카드</small></span>';b.onclick=e=>{e.stopPropagation();try{gmSfx('ok')}catch(_){}openPanel()};r.appendChild(b)}catch(e){}},600);

 const st=document.createElement('style');st.textContent=`
 #rg174{position:fixed;inset:0;z-index:9300;display:grid;place-items:center;background:#000b;backdrop-filter:blur(3px);color:#eef0f6;font-family:inherit}#rg174[hidden],#rgc174[hidden]{display:none}
 #rg174 .pn{width:min(860px,calc(100vw - 20px));max-height:calc(100vh - 20px);overflow:auto;box-sizing:border-box;padding:12px 14px;border-radius:16px;background:radial-gradient(120% 60% at 50% 0%,#14402a,#06120c 70%);border:1px solid #7dffa866;box-shadow:0 20px 60px #000c}
 #rg174 .hd{display:flex;align-items:center;gap:10px;margin-bottom:8px}#rg174 .hd>i{font-style:normal;font-size:22px;width:40px;height:40px;display:grid;place-items:center;border-radius:12px;background:#0006;border:1px solid #7dffa888}#rg174 .hd b{display:block;font-size:19px;color:#a6ffcc}#rg174 .hd small{font-size:11.5px;color:#9ac0a8}
 #rg174 .two{display:grid;grid-template-columns:1fr 1fr;gap:12px}#rg174 ul{margin:0;padding-left:18px;font-size:12.5px;line-height:1.75;color:#d0e8d8}#rg174 ul b{color:#ffe79a}#rg174 ul em{font-style:normal;color:#7dffa8}
 #rg174 h5{margin:8px 0 5px;font-size:13px;color:#a6ffcc}#rg174 .cl,.rg174r .mine,#rgc174 .mine{display:flex;flex-wrap:wrap;gap:4px}#rg174 .cl span,.rg174r .mine span,#rgc174 .mine span{width:28px;height:28px;display:grid;place-items:center;border-radius:8px;font-size:16px;background:#0a1a12;box-shadow:inset 0 0 0 2px var(--c)}
 #rg174 .go{width:100%;margin:10px 0 4px;font:inherit;font-weight:900;font-size:17px;padding:12px;border-radius:12px;border:0;cursor:pointer;background:linear-gradient(180deg,#a6ffcc,#2ab06a);color:#04200e;box-shadow:0 0 0 2px #000,0 0 18px #2ab06a66}#rg174 .rl>small{color:#9ac0a8}
 #rg174 .tabs{display:flex;gap:4px;margin-bottom:6px}#rg174 .tabs button{font:inherit;font-weight:900;font-size:12.5px;padding:6px 12px;border-radius:9px;border:1px solid #ffffff1c;background:#0e2018;color:#c8e8d4;cursor:pointer}#rg174 .tabs button.on{background:#a6ffcc;color:#04200e}
 #rg174 .tr{display:grid;grid-template-columns:26px 1fr auto;gap:2px 6px;align-items:center;padding:5px 8px;border-radius:9px;background:#0e1c16;margin-bottom:3px}#rg174 .tr i{grid-row:1/3;font-style:normal;text-align:center;font-weight:900}#rg174 .tr b{font-size:12.5px}#rg174 .tr span{font-weight:900;color:#ffe79a;font-size:12.5px}
 #rg174 .tr small{font-size:10.5px;color:#9ac0a8}#rg174 .tr em{font-style:normal;font-size:11px;text-align:right}#rg174 .em{text-align:center;padding:20px;color:#9ac0a8}
 #rgc174{position:fixed;inset:0;z-index:9250;display:grid;place-items:center;background:#000a;color:#eef0f6;font-family:inherit}
 #rgc174 .pk{display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px;max-width:calc(100vw - 20px)}#rgc174 .pk>small{color:#a6ffcc;font-weight:800}#rgc174 .pk>b{font-size:22px;color:#ffe79a;text-shadow:0 0 12px #ffd16688}
 #rgc174 .cs{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}#rgc174 .cd{position:relative;width:150px;min-height:190px;display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 10px;border-radius:14px;cursor:pointer;font:inherit;color:#eef0f6;
  background:linear-gradient(180deg,color-mix(in srgb,var(--c) 22%,#0c1418),#06090c);border:2px solid var(--c);box-shadow:0 0 18px color-mix(in srgb,var(--c) 40%,transparent);animation:rgIn .35s both;transition:transform .12s}
 #rgc174 .cd:nth-child(2){animation-delay:.08s}#rgc174 .cd:nth-child(3){animation-delay:.16s}#rgc174 .cd:hover{transform:translateY(-6px)}#rgc174 .cd em{font-style:normal;font-size:10.5px;font-weight:900;color:#000;background:var(--c);border-radius:6px;padding:1px 8px}
 #rgc174 .cd i{font-style:normal;font-size:40px;filter:drop-shadow(0 0 8px var(--c))}#rgc174 .cd b{font-size:15px}#rgc174 .cd small{font-size:12px;color:#d0dce8;text-align:center;line-height:1.5}#rgc174 .cd u{position:absolute;top:6px;right:8px;text-decoration:none;font-size:11px;font-weight:900;color:var(--c)}
 #rgc174 .cd.r2{animation:rgIn .35s both,rgGlow 1.4s ease-in-out infinite}@keyframes rgIn{from{transform:translateY(20px) scale(.9);opacity:0}}@keyframes rgGlow{50%{box-shadow:0 0 30px var(--c)}}
 .rg174r{display:flex;flex-direction:column;align-items:center;gap:8px}.rg174r>b{font-size:22px;color:#a6ffcc}.rg174r .rs{display:flex;gap:12px;font-size:12.5px;flex-wrap:wrap;justify-content:center}.rg174r .rs b{color:#fff}.rg174r .sc{font-size:14px}.rg174r .sc b{color:#ffe79a}.rg174r .sc.g{color:#ffe79a;font-weight:900}
 #rx168 .rg{background:linear-gradient(180deg,#a6ffcc,#2ab06a)!important;color:#04200e!important;border:0!important;box-shadow:0 0 0 2px #000!important}
 @media (max-width:700px){#rg174 .two{grid-template-columns:1fr}#rgc174 .cd{width:calc(33vw - 16px);min-height:160px;padding:8px 5px}#rgc174 .cd i{font-size:30px}#rgc174 .cd small{font-size:10.5px}}`;document.head.appendChild(st);
 window.RG174={open:openPanel,close:closePanel,start,RG,CARDS,setupRoom,bossRoom,finish};
}catch(e){console.error('v174 rogue',e)}})();
