/* ================= v92 PvP 결투 (PVP92) =================
   1:1 실시간 결투 · 3판 2선승 · 내 장비 능력치 그대로.
   - 빠른 대전: 서버 대기열(/api/pvp/queue)로 아무나와 짝 → 이기면 상대 골드를 가져옴(판돈 = 두 사람 중 적은 골드의 10%, 20~5,000).
   - 친구 대전: 방 코드(/api/pvp/create + /api/duo/join), 골드는 오가지 않음.
   주고받기 · 상대 그리기는 듀오(DUO85)를 그대로 쓴다. 탑 경기장(잡몹 없음, 둘 다 「게스트」 역할이라 잡몹이 안 나옴)에서 싸움.
   맞음 판정은 「맞는 쪽」이 한다: 상대 공격(사건 a · U, 보낸 시각 + 피해량)이 내 화면에서 재생되는 순간 내 위치로 판정.
     대시 무적이면 피함, 막 패링했으면 튕겨냄(상대 경직), 아니면 피해(내 장비 방어 효과 CB81.onHurt 적용) → 상대에게 hit 알림.
   라운드 결과는 방장이 정한다(KO 또는 60초 뒤 남은 체력 비율) → rr 메시지. 2승이면 끝 → 두 사람이 서버에 결과를 보내 확정. */
(()=>{try{
 if(!window.DUO85||!window.TW71)return;
 const DU=DUO85,D=DU.state,T=()=>TW71.T,$=id=>document.getElementById(id);
 const esc=DU.esc,num=v=>Number(v||0).toLocaleString();
 const ROUND_MS=60000,WIN=2;
 const M={on:false,round:1,sc:[0,0],ph:'',phT:0,rStart:0,owner:false,stake:0,ranked:false,over:false,koSent:false,why:'',w:-1,fx:[]};
 const Q={on:false,t0:0,n:0,stats:null,msg:''};
 const on=()=>!!(M.on&&D.started&&D.room&&D.room.kind==='pvp');
 const me=()=>M.owner?0:1;
 const api=DU.api,acc=DU.acc;
 const note=tx=>{try{banner(tx)}catch(e){}};

 /* ---------- 골드 장부 · 전적 ---------- */
 async function ledger(){if(!acc().token)return null;const r=await api('/api/pvp/ledger','POST',{});if(r.s!==200)return null;let sum=0;
  for(const x of r.j.items||[]){sum+=x.delta;saveData.coins=Math.max(0,(saveData.coins||0)+x.delta)}
  if(sum){try{saveNow()}catch(e){}try{gmHud()}catch(e){}note(sum>0?'⚔ 결투 보상 🪙 +'+num(sum):'⚔ 결투 패배 🪙 '+num(sum))}
  Q.stats=r.j.stats||Q.stats;if(r.j.rank)Q.rank=r.j.rank;
  /* v94 시즌 보상(지난 시즌 최고 등급) */for(const w of r.j.rewards||[]){saveData.coins=(saveData.coins||0)+(w.gold||0);try{window.DIA80&&DIA80.add(w.dia||0)}catch(e){}try{saveNow();gmHud()}catch(e){}
   try{showOverlay('SEASON '+w.season,'시즌 보상!','<div class="pvRes"><b class="w">'+esc(w.tier)+'</b><small>지난 시즌 최고 등급</small><div class="pvG w">💎 '+num(w.dia)+' · 🪙 '+num(w.gold)+'</div></div>',[['받기',()=>{$('overlay').hidden=true},true]])}catch(e){}}
  return {sum,stats:Q.stats,rank:Q.rank}}
 setInterval(()=>{try{if(acc().token&&typeof mode!=='undefined'&&mode==='menu'&&!on())ledger()}catch(e){}},90000);
 setTimeout(()=>{try{if(acc().token)ledger()}catch(e){}},6000);

 /* ---------- 창: 결투 고르기 · 찾는 중 ---------- */
 const hd=(ic,tt,sub,btn)=>'<div class="dHd"><div class="dTt"><i>'+ic+'</i><div><b>'+tt+'</b>'+(sub?'<small>'+sub+'</small>':'')+'</div></div>'+btn+'</div>';
 const TIERC={bronze:'#d08a5a',silver:'#c8d4e0',gold:'#ffd166',plat:'#7df9ff',dia:'#8db8ff',master:'#ff6ad5'};
 function rankCard(){const r=Q.rank;if(!r)return '<div class="pvRank"><small>등급 불러오는 중…</small></div>';const t=r.tier||{},c=TIERC[t.key]||'#fff',days=Math.max(0,Math.ceil((r.ends*1000-Date.now())/86400000));
  const lo=Math.max(t.min||0,t.key==='bronze'?900:0),hi=r.next?r.rating+r.next.need:lo+1,q=r.next?Math.max(0,Math.min(1,(r.rating-lo)/(hi-lo))):1;
  return '<div class="pvRank" style="--tc:'+c+'"><div class="pvTb"><i>'+({bronze:'🥉',silver:'🥈',gold:'🥇',plat:'💠',dia:'💎',master:'👑'}[t.key]||'⚔')+'</i><b>'+esc(t.name||'')+'</b><em>'+num(r.rating)+'점</em><small>#'+num(r.pos)+'</small></div>'+
   '<div class="pvBar"><i style="width:'+Math.round(q*100)+'%"></i></div><div class="pvRs"><span>'+(r.next?esc(r.next.name)+'까지 '+num(r.next.need)+'점':'최고 등급!')+'</span><span>시즌 '+esc(r.season)+' · '+days+'일 남음</span></div></div>'}
 function html(v){
  if(v==='pvp'){const s=Q.stats||{};
   return '<div class="dP wide dPv">'+hd('⚔','결투 · PvP','1:1 실력 승부 · 내 장비 그대로 · 3판 2선승','<button class="dBack">◀ 뒤로</button>')+'<div class="dCols">'+
    '<div class="dCol pvQ"><h4>빠른 대전</h4><canvas class="dScn pvArt" data-scn="vs" width="240" height="100"></canvas>'+
     '<ul class="pvRule"><li>기다리는 사람과 바로 짝지어져요</li><li><b>이기면</b> 상대 골드를 가져와요 · <b>지면</b> 내 골드를 잃어요</li><li>판돈 = 두 사람 중 <b>골드가 적은 쪽의 10%</b> (20 ~ 5,000)</li><li>도중에 나가면 기권패</li></ul>'+
     rankCard()+'<div class="pvRec"><span>전적</span><b class="w">'+(s.wins||0)+'승</b><b class="l">'+(s.losses||0)+'패</b><em>번 골드 🪙 '+num(s.gold_won||0)+'</em></div>'+
     '<button class="dMain pvGo" id="pvQ">⚔ 빠른 대전 찾기</button></div>'+
    '<div class="dCol"><h4>친구 대전</h4><div class="pvFr">친구와 방 코드로 겨뤄요 · <b>골드는 오가지 않아요</b></div><button class="dMain pvMk" id="pvMk">🏟 결투 방 만들기</button>'+
     '<h5>코드로 들어가기</h5><div class="dCode"><div class="dSlots"><input id="pvC" maxlength="4" placeholder="····" autocapitalize="characters" spellcheck="false" autocomplete="off"></div><button id="pvJ">들어가기 ▶</button></div>'+
     '<div class="pvTip">💡 박자에 맞춰 공격하면 피해 ×1.5 · 상대 공격 순간 패링하면 튕겨내고 상대가 잠깐 굳어요 · 대시 중엔 무적</div></div>'+
    '</div><div class="dMsg">'+esc(Q.msg)+'</div></div>'}
  if(v==='search')return '<div class="dP dPv dSr">'+hd('⚔','상대를 찾는 중','빠른 대전 · 이기면 상대 골드를 가져와요','')+
    '<div class="pvSpin"><canvas class="dScn" data-scn="vs" width="240" height="100"></canvas><div class="pvRing"></div></div><div class="pvTime" id="pvTm">00:00</div><div class="dInfo" id="pvQn" style="text-align:center">대기열에 들어가는 중…</div>'+
    '<button class="dMain pvCancel" id="pvX">취소</button><div class="dMsg">'+esc(Q.msg)+'</div></div>';
  return null}
 function wire(box){const q=s=>box.querySelector(s);
  if(q('#pvQ'))q('#pvQ').onclick=search;
  if(q('#pvMk'))q('#pvMk').onclick=createFriend;
  if(q('#pvJ'))q('#pvJ').onclick=()=>{const c=(q('#pvC').value||'').trim().toUpperCase();Q.msg='';DU.join(c)};
  if(q('#pvX'))q('#pvX').onclick=cancel;
  if(DU.view()==='pvp'&&!Q.loaded){Q.loaded=1;ledger().then(()=>{if(DU.view()==='pvp')DU.draw()}).finally(()=>setTimeout(()=>Q.loaded=0,3000))}}
 async function search(){if(!acc().token){DU.closeUI();try{ACCT55.open()}catch(e){}return}try{gmSfx('ok')}catch(_){}
  try{window.LV83&&LV83.sync&&await LV83.sync(true)}catch(e){}/* 판돈 계산에 쓰는 내 골드를 먼저 올림 */
  Q.on=true;Q.t0=Date.now();Q.msg='';DU.open('search');poll()}
 async function poll(){if(!Q.on)return;const r=await api('/api/pvp/queue','POST',{lv:DU.myLv(),ch:DU.myCh()});if(!Q.on)return;
  if(r.s===200&&r.j.room){Q.on=false;const room=r.j.room,mine=(room.players||[]).find(p=>p.me)||{};
   Object.assign(D,{on:true,code:room.code,role:mine.owner?'host':'guest',room,since:0,started:false,out:[]});try{sfx(880,.2,'triangle',.06,1760)}catch(e){}return}
  const n=$('pvQn');if(n)n.textContent=r.s===200?'대기 중 '+(r.j.queue||1)+'명 · 상대를 기다리고 있어요':'서버 연결을 기다리는 중… ('+(r.s||'연결 안 됨')+')';
  setTimeout(poll,1000)}
 setInterval(()=>{if(!Q.on)return;const e=$('pvTm');if(e){const s=Math.floor((Date.now()-Q.t0)/1000);e.textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}if(!DU.isOpen()||DU.view()!=='search')cancel(true)},500);
 function cancel(silent){if(!Q.on&&silent)return;Q.on=false;api('/api/pvp/cancel','POST',{});if(silent!==true)DU.open('pvp')}
 async function createFriend(){if(!acc().token){DU.closeUI();try{ACCT55.open()}catch(e){}return}Q.msg='방을 만드는 중…';DU.draw();
  const r=await api('/api/pvp/create','POST',{lv:DU.myLv(),ch:DU.myCh()});if(r.s!==200){Q.msg=r.j.error||'방을 만들지 못했어요';DU.draw();return}
  Q.msg='';Object.assign(D,{on:true,code:r.j.room.code,role:'host',room:r.j.room,since:0,started:false,out:[]});DU.open('room')}

 /* ---------- 경기 시작 · 라운드 ---------- */
 function begin(){M.on=true;M.owner=D.role==='host';M.ranked=!!D.room.ranked;M.stake=D.room.stake||0;M.sc=[0,0];M.round=1;M.over=false;M.fx=[];
  try{TW71.start(D.room.floor||5)}catch(e){console.error(e)}const t=T();t.duo={role:'guest',mate:D.mate};t.queue=[];t.mobs=[];t.total=0;t.shots=[];t.tels=[];
  try{$('bvTitle').textContent='BEAT BLADE · 결투'}catch(e){}roundReset();
  note((M.ranked?'⚔ 빠른 대전 · 판돈 🪙 '+num(M.stake):'⚔ 친선 결투')+' · 3판 2선승')}
 function roundReset(){const t=T(),now=performance.now();D.plX='r'+M.round;
  P.x=AX+AW*(M.owner?.28:.72);P.y=AY+AH*.56;P.face={x:M.owner?1:-1,y:0};P.hp=P.maxhp;P.dash=null;P.downDuo=false;P.inv=now+1700;P.atkCd=0;
  if(t){t.dead=false;t.clear=false;t.trans=null;t.U=null;t.shots=[];t.mobs=[]}M.ph='intro';M.phT=now;M.koSent=false;M.w=-1;
  try{sfx(220,.3,'sawtooth',.05,440)}catch(e){}}
 function roundEnd(w,why){if(!M.owner||M.ph!=='fight')return;const sc=M.sc.slice();sc[w]++;const m={t:'rr',w,sc,n:M.round,why};DU.send(m);applyRR(m)}
 function applyRR(m){if(m.n!==M.round||M.ph==='ko'||M.ph==='end')return;M.sc=m.sc;M.ph='ko';M.phT=performance.now();M.w=m.w;M.why=m.why;M.over=Math.max(...M.sc)>=WIN;
  const won=m.w===me();try{if(won){sfx(660,.25,'triangle',.06,1320);sfx(990,.3,'sine',.04,1980)}else sfx(200,.4,'sawtooth',.05,80)}catch(e){}
  const t=T();if(t)t.shake=.5}
 function ko(){if(!on())return true;if(M.ph!=='fight'||M.koSent)return true;M.koSent=true;P.hp=0;const t=T();if(t)t.dead=true;
  if(M.owner)roundEnd(1,'ko');else DU.send({t:'ko',n:M.round});return true}

 /* ---------- 맞음 판정 (맞는 쪽) ---------- */
 function posAt(tt){const m=D.mate,hs=m&&m.hs;if(!hs||!hs.length)return [m.x,m.y];if(tt<=hs[0].t)return [hs[0].x,hs[0].y];
  for(let i=hs.length-1;i>0;i--){const a=hs[i-1],b=hs[i];if(tt>=a.t&&tt<=b.t){const k=b.t>a.t?(tt-a.t)/(b.t-a.t):1;return [a.x+(b.x-a.x)*k,a.y+(b.y-a.y)*k]}}
  const b=hs[hs.length-1];return [b.x,b.y]}
 function pop(x,y,tx,col){try{TW71.addPop(x,y,tx,col)}catch(e){}}
 function takeHit(dm,a,e,kind){const now=performance.now(),t=T();
  try{if(window.CB81&&CB81.onHurt){dm=CB81.onHurt(dm)}}catch(_){}dm=Math.max(0,Math.round(dm));if(dm<=0){DU.send({t:'mi',e:e.e});return}
  P.hp=Math.max(0,P.hp-dm);P.inv=now+(kind==='U'?120:240);
  if(a!=null){P.x=Math.max(AX+10,Math.min(AX+AW-10,P.x+Math.cos(a)*12));P.y=Math.max(AY+24,Math.min(AY+AH-8,P.y+Math.sin(a)*8))}
  if(t){t.flash=.35;t.shake=Math.max(t.shake||0,.3);t.ult=Math.min(100,(t.ult||0)+4);t.combo=0}
  pop(P.x,P.y-28,'-'+dm+(e.cr?' 치명!':''),'#ff5a6a');try{sfx(150,.14,'square',.06,60)}catch(_){}
  DU.send({t:'hit',e:e.e,d:dm,c:e.cr?1:0,k:kind});if(P.hp<=0)ko()}
 function resolve(){const m=D.mate;if(!m||!m.evs)return;const now=performance.now(),rt=now-DU.MDLY(),t=T();
  for(const e of m.evs){if(e.res)continue;
   if(e.k==='a'&&e.dm){if(rt<e.t+60)continue;e.res=1;if(M.ph!=='fight'||e.t<M.rStart-200)continue;
    const [ox,oy]=posAt(e.t),a=e.a||0,dx=P.x-ox,dy=P.y-oy,d=Math.hypot(dx,dy);if(d>42)continue;
    const da=Math.abs(((Math.atan2(dy,dx)-a+9.42)%6.28)-3.14);if(d>14&&da>1.3)continue;
    if(now<P.inv){pop(P.x,P.y-30,'회피!','#9fe8ff');DU.send({t:'mi',e:e.e});continue}
    if(t&&P.parryT!=null&&t.clk-P.parryT>=0&&t.clk-P.parryT<.26){DU.send({t:'pr',e:e.e});pop(P.x,P.y-30,'PARRY!','#ffe79a');t.ult=Math.min(100,(t.ult||0)+12);P.inv=now+350;
     M.fx.push({k:'par',x:P.x,y:P.y-10,t:now});try{sfx(1300,.14,'square',.05,2000);perc('crash',audio.currentTime,.3)}catch(_){}continue}
    takeHit(e.dm,a,e,'a')}
   else if(e.k==='U'&&e.sp){const hs=(e.sp.hits&&e.sp.hits.length)?e.sp.hits:[400];e.hk=e.hk||0;
    while(e.hk<hs.length&&rt>=e.t+hs[e.hk]){e.hk++;if(M.ph!=='fight'||e.t<M.rStart-200)continue;
     if(Math.hypot(P.x-e.sp.cx,P.y-8-e.sp.cy)>100)continue;if(now<P.inv){pop(P.x,P.y-30,'회피!','#9fe8ff');continue}
     takeHit((e.dm||30)/hs.length,null,e,'U')}
    if(e.hk>=hs.length)e.res=1}
   else e.res=1}}

 /* ---------- 받은 메시지 ---------- */
 function msg(m){if(!on())return;const now=performance.now(),t=T(),mt=D.mate||{};
  switch(m.t){
   case 'hit':{const x=mt.sx!=null?mt.sx:mt.x,y=mt.sy!=null?mt.sy:mt.y;pop(x,y-28,(m.c?'치명! ':'')+'-'+m.d,m.c?'#ff9a5a':'#ffffff');
    try{t.hfx.push({x,y:y-8,a:0,t:t.clk,big:!!m.c,col:m.c?'#ff9a5a':'#ffffff'});TW71.burst(x,y-6,8,'#ffffff',120)}catch(e){}
    if(t){t.stop=now+(m.k==='U'?40:70);t.ult=Math.min(100,(t.ult||0)+(m.k==='U'?0:7));t.combo=(t.combo||0)+1;t.shake=Math.max(t.shake||0,.18)}
    try{perc('snare',audio.currentTime,.4);sfx(380,.1,'triangle',.05,120)}catch(e){}break}
   case 'mi':{const x=mt.sx!=null?mt.sx:mt.x,y=mt.sy!=null?mt.sy:mt.y;pop(x,y-28,'회피','#9fe8ff');break}
   case 'pr':P.atkCd=now+650;if(t)t.shake=.35;P.slowT=(t?t.clk:0)+.6;pop(P.x,P.y-30,'튕겨남!','#ffb2a8');M.fx.push({k:'stun',t:now});try{sfx(120,.3,'square',.05,60)}catch(e){}break;
   case 'ko':if(M.owner&&m.n===M.round)roundEnd(0,'ko');break;
   case 'rr':applyRR(m);break;
   case 'rm':if(M.ph==='end')rematch();break}}
 function oppLeft(){if(!on())return;if(M.ph!=='end'){M.sc[me()]=Math.max(M.sc[me()],WIN);finish(true,'상대가 나갔어요')}}

 /* ---------- 공격 · 궁극기에 결투 정보 붙이기 ---------- */
 function aim(){const m=D.mate;if(!m||m.sx==null)return;const dx=m.sx-P.x,dy=(m.sy-6)-(P.y-6),d=Math.hypot(dx,dy);if(d<56&&d>0)P.face={x:dx/d,y:dy/d}}
 {const f=doAttack;doAttack=function(){if(on()){if(M.ph!=='fight'||performance.now()<(P.atkCd||0))return;aim();
   const w=curWp()||{},pet=(curPet()||{}).dmg||0,bg=TW71.beatGood?TW71.beatGood():0,mult=bg===2?1.5:bg===1?1.2:1,CB=window.CB81;
   const cr=Math.random()<((w.crit||0)+(CB&&CB.critAdd?CB.critAdd():0));D.atkX={dm:Math.round(34*(w.dmg||1)*(1+pet)*mult*(cr?1.8:1)*.25),cr:cr?1:0}}
  return f.apply(this,arguments)}}
 if(typeof tryUlt==='function'){const f=tryUlt;tryUlt=function(){if(on()&&M.ph!=='fight')return;const r=f.apply(this,arguments);
  try{if(on()){const t=T();if(t&&t.U&&!t.U._pv){t.U._pv=1;const m=D.mate;if(m&&m.sx!=null){t.U.sp.cx=m.sx;t.U.sp.cy=m.sy-8}
   const w=curWp()||{};D.ultX={dm:Math.round(34*Math.min(2.2,w.dmg||1)*(1+((curPet()||{}).dmg||0))*.25*3.2)}}}}catch(e){}return r}}
 {const f=doDash;doDash=function(){if(on()&&(M.ph==='end'||M.ph==='ko'))return;return f.apply(this,arguments)}}

 /* ---------- 매 프레임: 단계 · 판정 · 화면 ---------- */
 function step(now){if(!on())return;const t=T();
  if(M.ph==='intro'&&now-M.phT>1700){M.ph='fight';M.phT=now;M.rStart=now;P.inv=now+300;try{sfx(523,.12,'square',.05,1046);perc('crash',audio.currentTime,.5)}catch(e){}}
  if(M.ph==='fight'){resolve();if(M.owner&&now-M.rStart>ROUND_MS){const a=P.hp/(P.maxhp||1),b=(D.mate.hp||0)/(D.mate.mx||1);roundEnd(a>=b?0:1,'time')}
   if(P.hp<=0&&!M.koSent)ko()}
  if(M.ph==='ko'&&now-M.phT>2600){if(M.over)finish(M.sc[me()]>=WIN);else{M.round++;roundReset()}}
  if(t&&(M.ph==='intro'||M.ph==='ko'||M.ph==='end'))t.ult=t.ult||0}
 function bar(o,x,y,w,q,col,rev){o.fillStyle='#05070acc';o.fillRect(x-1,y-1,w+2,8);o.fillStyle='#3a0a14';o.fillRect(x,y,w,6);const ww=Math.round(w*Math.max(0,Math.min(1,q)));o.fillStyle=col;o.fillRect(rev?x+w-ww:x,y,ww,6);o.fillStyle='#ffffff55';o.fillRect(rev?x+w-ww:x,y,ww,1)}
 function hud(now){if(!on())return;const o=ctx;o.save();try{o.setTransform(SS,0,0,SS,0,0)}catch(e){}
  const mt=D.mate||{},pl=(D.room&&D.room.players)||[],myN=(pl.find(p=>p.me)||{}).name||'나',opN=(pl.find(p=>!p.me)||{}).name||'상대';
  const cx=W/2,y=AY+3;o.globalAlpha=.88;o.fillStyle='#05070a';o.fillRect(cx-200,y-2,400,26);o.globalAlpha=1;o.fillStyle='#ff5a7a';o.fillRect(cx-200,y+23,400,1);
  o.font='900 8px sans-serif';o.textAlign='left';o.fillStyle='#a6f5c6';o.fillText(myN,cx-196,y+7);o.textAlign='right';o.fillStyle='#ff9aaa';o.fillText(opN,cx+196,y+7);
  bar(o,cx-196,y+11,150,P.hp/(P.maxhp||1),'#7dffa8',false);bar(o,cx+46,y+11,150,(mt.hp||0)/(mt.mx||1),'#ff5a7a',true);
  /* 라운드 점 · 시간 */for(let i=0;i<WIN;i++){o.fillStyle=M.sc[me()]>i?'#ffd166':'#2a3440';o.fillRect(cx-40+i*8,y+18,6,3);o.fillStyle=M.sc[1-me()]>i?'#ffd166':'#2a3440';o.fillRect(cx+28-i*8,y+18,6,3)}
  const left=M.ph==='fight'?Math.max(0,Math.ceil((ROUND_MS-(now-M.rStart))/1000)):M.ph==='intro'?60:0;o.textAlign='center';o.font='900 13px sans-serif';o.fillStyle=left<=10&&M.ph==='fight'?'#ff5a7a':'#ffffff';o.fillText(String(left),cx,y+13);o.font='800 6px sans-serif';o.fillStyle='#9ab8ac';o.fillText('ROUND '+M.round,cx,y+21);
  /* 가운데 큰 글자 */const big=(tx,sub,col,k)=>{const s=1+.25*Math.max(0,1-k*4);o.save();o.translate(cx,AY+AH/2-10);o.scale(s,s);o.globalAlpha=Math.min(1,k*6);o.font='900 30px sans-serif';o.fillStyle='#000';o.fillText(tx,2,2);o.fillStyle=col;o.fillText(tx,0,0);if(sub){o.font='800 10px sans-serif';o.fillStyle='#e8eef6';o.fillText(sub,0,18)}o.restore()};
  if(M.ph==='intro'){const k=(now-M.phT)/1700;big(k<.6?'ROUND '+M.round:'FIGHT!',k<.6?(M.ranked?'판돈 🪙 '+num(M.stake):'친선전'):'',k<.6?'#ffe79a':'#ff5a7a',k<.6?k/.6:(k-.6)/.4)}
  if(M.ph==='fight'&&now-M.rStart<500)big('FIGHT!','','#ff5a7a',(now-M.rStart)/500+1);
  if(M.ph==='ko'){const k=(now-M.phT)/2600,won=M.w===me();big(M.why==='time'?'TIME UP':'K.O.',(won?myN:opN)+' 라운드 승리 · '+M.sc[me()]+' : '+M.sc[1-me()],won?'#ffe79a':'#ff5a7a',k)}
  /* 패링 고리 · 경직 */M.fx=M.fx.filter(f=>now-f.t<500);for(const f of M.fx){const q=(now-f.t)/500;if(f.k==='par'){o.globalAlpha=1-q;o.strokeStyle='#ffe79a';o.lineWidth=2;o.beginPath();o.arc(f.x,f.y,8+q*26,0,6.28);o.stroke()}
   if(f.k==='stun'){o.globalAlpha=1-q;o.fillStyle='#ffb2a8';for(let i=0;i<3;i++){const a=now/150+i*2.1;o.fillRect(P.x+Math.cos(a)*9-1,P.y-34+Math.sin(a)*3,2,2)}}}
  o.globalAlpha=1;o.textAlign='left';o.restore()}
 {const f=frame;frame=function(){const r=f.apply(this,arguments);try{if(on()){const now=performance.now();step(now);hud(now)}}catch(e){console.error('pvp',e)}return r}}

 /* ---------- 끝 · 결과 ---------- */
 async function finish(win,why){if(M.ph==='end')return;M.ph='end';M.phT=performance.now();const t=T();if(t)t.dead=true;try{stopMusic()}catch(e){}
  try{if(win){perc('crash',audio.currentTime,.7);sfx(523,.2,'triangle',.06,1046);setTimeout(()=>sfx(784,.3,'triangle',.06,1568),180)}else sfx(180,.6,'sawtooth',.05,60)}catch(e){}
  let res=null;if(D.code){for(let i=0;i<6;i++){const r=await api('/api/pvp/result','POST',{code:D.code,win:!!win});if(r.s===200){res=r.j;if(!M.ranked||res.settled||res.void)break}else break;await new Promise(z=>setTimeout(z,1200))}}
  const lg=await ledger();show(win,why,res,lg)}
 function show(win,why,res,lg){const s=(lg&&lg.stats)||Q.stats||{},sc=M.sc[me()]+' : '+M.sc[1-me()];
  let gold='';if(M.ranked){if(res&&res.void)gold='<div class="pvG v">결과가 서로 달라 골드는 오가지 않았어요</div>';else if(res&&res.settled||lg&&lg.sum)gold='<div class="pvG '+(win?'w':'l')+'">🪙 '+(win?'+':'−')+num(M.stake)+' 골드 '+(win?'(상대에게서 가져옴)':'(상대에게 빼앗김)')+'</div>';else gold='<div class="pvG v">결과 확인 중… 잠시 뒤 로비에서 골드가 반영돼요</div>'}
  else gold='<div class="pvG v">친선전 · 골드는 오가지 않아요</div>';
  let rk='';if(M.ranked&&res&&res.rating){const [a,b]=res.rating,d=b-a;rk='<div class="pvRkC '+(d>=0?'w':'l')+'">⚔ 등급 점수 '+(d>=0?'+':'')+d+' → <b>'+num(b)+'</b> · '+esc((res.tier||{}).name||'')+'</div>'}
  const html='<div class="pvRes"><b class="'+(win?'w':'l')+'">'+sc+'</b>'+(why?'<small>'+esc(why)+'</small>':'')+gold+rk+'<div class="pvRec2">전적 '+(s.wins||0)+'승 '+(s.losses||0)+'패 · 번 골드 🪙 '+num(s.gold_won||0)+'</div></div>';
  const btns=M.ranked?[['⚔ 다시 빠른 대전',()=>{$('overlay').hidden=true;DU.end();try{toLobby()}catch(e){}setTimeout(search,300)},true],['로비로',()=>{$('overlay').hidden=true;DU.end();try{toLobby()}catch(e){}},false]]
   :(M.owner&&D.on?[['↺ 다시 결투',()=>{DU.send({t:'rm'});rematch()},true],['방 나가기',()=>{$('overlay').hidden=true;DU.end();try{toLobby()}catch(e){}},false]]
    :[[D.on?'⏳ 방장이 다시 결투를 누르면 시작':'로비로',()=>{if(!D.on){$('overlay').hidden=true;try{toLobby()}catch(e){}}},true],['방 나가기',()=>{$('overlay').hidden=true;DU.end();try{toLobby()}catch(e){}},false]]);
  try{showOverlay(win?'VICTORY':'DEFEAT',win?'승리!':'패배',html,btns)}catch(e){}}
 function rematch(){$('overlay').hidden=true;M.sc=[0,0];M.round=1;M.over=false;try{const t=T();t.dead=false}catch(e){}roundReset()}
 function reset(){M.on=false;M.ph='';Q.on=false}

 /* ---------- 로비 위쪽 줄: ⚔ 결투 단추 ---------- */
 function chip(){const anchor=$('gmRank')||$('gmDia')||$('gmCoins');if(!anchor||!anchor.parentNode)return;let b=$('gmPvp');
  if(!b){b=document.createElement('button');b.id='gmPvp';b.type='button';b.title='결투 — 1:1 실력 승부';b.innerHTML='<i>⚔</i><span>결투</span>';
   b.onclick=e=>{e.stopPropagation();try{gmSfx('ok')}catch(_){}if(!acc().token){try{ACCT55.open()}catch(err){}return}DU.open('pvp')};b.addEventListener('pointerdown',e=>e.stopPropagation())}
  if(b.previousElementSibling!==anchor)anchor.after(b)}
 /* v93: 위쪽 줄 단추는 빼고, 결투는 「탑 오르기」 고르기 창에서만 들어감 */

 const st=document.createElement('style');st.id='pvp92';st.textContent=`
 #gmPvp{display:inline-flex;align-items:center;gap:5px;height:32px;padding:0 12px 0 8px;border-radius:999px;font:inherit;font-weight:900;font-size:13px;cursor:pointer;color:#fff;
  background:linear-gradient(180deg,#ff8aa0,#ff2d55 60%,#b0102e);border:1px solid #ffc8d4;box-shadow:0 0 14px #ff2d5566,inset 0 1px 0 #fff8;animation:pvGlow 2s ease-in-out infinite}
 #gmPvp i{font-style:normal;font-size:15px}html.ph #gmPvp span{display:none}html.ph #gmPvp{padding:0 8px}
 @keyframes pvGlow{50%{box-shadow:0 0 22px #ff2d55aa,inset 0 1px 0 #fff8}}
 #duo85 .dPv{border-color:#ff5a7a66!important}#duo85 .dPv .dTt>i{background:linear-gradient(180deg,#5a1a28,#220a10);border-color:#ff5a7a88;box-shadow:0 0 14px #ff5a7a44}
 #duo85 .dPv h4::before{background:#ff5a7a}#duo85 .dPv::after{background:linear-gradient(90deg,transparent,#ff5a7a,#ffd166,transparent)!important}
 #duo85 .pvArt{width:100%;aspect-ratio:240/100;image-rendering:pixelated;border-radius:10px;border:1px solid #ff5a7a44}
 #duo85 .pvRule{margin:0;padding-left:18px;font-size:12px;line-height:1.7;color:#cfe0e6}#duo85 .pvRule b{color:#ffd166}
 #duo85 .pvRec{display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:10px;background:#0b1319;border:1px solid #ffffff14;font-size:12px}#duo85 .pvRec span{color:#9ab8ac}
 #duo85 .pvRec .w{color:#7dffa8}#duo85 .pvRec .l{color:#ff8a9a}#duo85 .pvRec em{margin-left:auto;font-style:normal;color:#ffe79a;font-weight:800}
 #duo85 .pvGo{background:linear-gradient(180deg,#ffc8d4,#ff2d55)!important;color:#fff!important;border-color:#ffd8e0!important;box-shadow:0 6px 20px #ff2d5555!important;font-size:18px!important}
 #duo85 .pvMk{background:linear-gradient(180deg,#e8d8ff,#9a6aff)!important;color:#140a2a!important;border-color:#f0e8ff!important}
 #duo85 .pvFr{font-size:12px;color:#cfe0e6}#duo85 .pvFr b{color:#9fe8ff}#duo85 .pvTip{margin-top:auto;font-size:11px;line-height:1.6;color:#9ab8ac;padding:8px 10px;border-radius:10px;background:#0b1319;border:1px dashed #ffffff1c}
 #duo85 .dSr{width:min(440px,calc(100vw - 20px));text-align:center}#duo85 .pvSpin{position:relative;margin:6px auto 4px;width:240px}#duo85 .pvSpin canvas{width:240px;height:100px;image-rendering:pixelated;border-radius:12px}
 #duo85 .pvRing{position:absolute;inset:-8px;border-radius:16px;border:2px solid transparent;border-top-color:#ff5a7a;border-right-color:#ffd166;animation:pvSpin 1.1s linear infinite}
 #duo85 .pvTime{font-size:30px;font-weight:900;font-family:ui-monospace,Menlo,monospace;color:#ffe79a;text-shadow:0 0 12px #ffe79a66}
 #duo85 .pvCancel{background:#2a3436!important;color:#e8f4ef!important;border-color:#ffffff33!important;margin-top:10px}
 @keyframes pvSpin{to{transform:rotate(360deg)}}
 .pvRes{display:flex;flex-direction:column;align-items:center;gap:8px}.pvRes>b{font-size:42px;font-weight:900;letter-spacing:.06em}.pvRes>b.w{color:#ffe79a;text-shadow:0 0 18px #ffd16688}.pvRes>b.l{color:#ff8a9a}
 .pvRes small{opacity:.75}.pvG{padding:8px 14px;border-radius:12px;font-weight:900;font-size:15px}.pvG.w{background:#2a2410;color:#ffe79a;border:1px solid #ffd16688}.pvG.l{background:#2a0e14;color:#ff8a9a;border:1px solid #ff5a7a66}.pvG.v{background:#101a20;color:#cfe0e6;font-weight:700;font-size:13px}
 .pvRec2{font-size:12px;opacity:.75}
 .pvRkC{font-weight:900;font-size:14px;padding:6px 12px;border-radius:10px;background:#0b1319}.pvRkC.w{color:#7dffa8}.pvRkC.l{color:#ff8a9a}.pvRkC b{color:#fff}
 #duo85 .pvRank{padding:9px 11px;border-radius:12px;background:radial-gradient(120% 120% at 0% 0%,color-mix(in srgb,var(--tc) 22%,transparent),#0b1319 70%);border:1px solid color-mix(in srgb,var(--tc) 55%,transparent)}
 #duo85 .pvTb{display:flex;align-items:center;gap:8px}#duo85 .pvTb i{font-style:normal;font-size:22px}#duo85 .pvTb b{font-size:17px;color:var(--tc);text-shadow:0 0 10px var(--tc)}#duo85 .pvTb em{font-style:normal;font-weight:900;margin-left:auto}#duo85 .pvTb small{color:#9ab8ac}
 #duo85 .pvBar{height:7px;border-radius:4px;background:#1a2430;margin:6px 0 4px;overflow:hidden}#duo85 .pvBar i{display:block;height:100%;background:linear-gradient(90deg,var(--tc),#fff)}
 #duo85 .pvRs{display:flex;justify-content:space-between;font-size:10.5px;color:#9ab8ac}`;document.head.appendChild(st);
 window.PVP92={on,html,wire,begin,msg,ko,oppLeft,reset,search,ledger,M,Q};
}catch(e){console.error('v92 pvp',e)}})();
