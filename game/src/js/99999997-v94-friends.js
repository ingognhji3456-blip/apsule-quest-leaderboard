/* ================= v94 친구 목록 · 초대 (FR94) =================
   - 위쪽 줄 「👥 친구」 단추(받은 신청 · 초대 수 빨간 점) → 친구 창.
   - 친구 창: 이름으로 친구 신청, 받은 신청 수락/거절, 친구 목록(접속 중 · 지금 하는 일 · 레벨 · 탑 층).
     친구마다 「⚔ 결투 신청」(친선 결투 방을 만들고 바로 초대) · 「🤝 듀오 초대」(듀오 방을 만들면 자동으로 초대) · 삭제.
   - 방 화면(듀오 · 결투, 방장, 빈자리 있음)에 「👥 친구 초대」 단추.
   - 초대를 받으면 화면 위에 알림 카드: 「수락」 → 그 방으로 들어감(게임 중이면 로비로 나간 뒤).
   서버: /api/friends(목록 · 접속 표시 · 초대 받기, 12초마다), /request · /respond · /remove · /invite · /invite/dismiss */
(()=>{try{
 if(!window.DUO85)return;
 const DU=DUO85,D=DU.state,$=id=>document.getElementById(id),esc=DU.esc,api=DU.api,acc=DU.acc;
 const F={list:[],inc:[],sent:[],inv:[],seenInv:new Set(),msg:'',open:false,pendInvite:null,busy:false,sug:[],sugT:0,dmSeen:{}};
 /* v103: 마지막 접속 「n분 전」 · 안 읽은 대화(친구별 마지막 대화 번호를 localStorage에 적어 둔 읽은 번호와 비교) */
 const ago=t=>{if(!t)return '접속 기록 없음';const s=Math.max(0,Date.now()/1000-t);return s<90?'방금 전':s<3600?Math.floor(s/60)+'분 전':s<86400?Math.floor(s/3600)+'시간 전':s<86400*30?Math.floor(s/86400)+'일 전':'오래 전'};
 const readMap=()=>{try{return JSON.parse(localStorage.getItem('bb-dm-read')||'{}')}catch(e){return {}}};
 const unread=f=>f.dm&&f.dmFrom==='them'&&f.dm>(readMap()[f.name]||0);
 const where=()=>{try{if(typeof mode==='undefined')return '로비';if(window.PVP92&&PVP92.on())return '⚔ 결투 중';const t=window.TW71&&TW71.T;
   if(mode==='tower')return (D.started?'🤝 듀오 ':'🏰 탑 ')+((t&&t.f)||'')+'F';if(mode==='boss')return '👹 보스전';if(D.on&&!D.started)return '방에서 기다리는 중';return '로비'}catch(e){return '로비'}};
 async function refresh(){if(!acc().token||F.busy)return;F.busy=true;try{const r=await api('/api/friends','POST',{where:where()});if(r.s!==200)return;
   F.list=(r.j.friends||[]).sort((a,b)=>(b.online-a.online)||((b.last||0)-(a.last||0)));F.inc=r.j.incoming||[];
   for(const f of F.list){if(unread(f)&&F.dmSeen[f.name]!==f.dm){const first=!(f.name in F.dmSeen);F.dmSeen[f.name]=f.dm;if(!first||Date.now()/1000-f.dm/1000<60)try{window.CHAT103&&CHAT103.dmNote(f.name)}catch(e){}}else if(!(f.name in F.dmSeen))F.dmSeen[f.name]=f.dm}F.sent=r.j.sent||[];F.inv=r.j.invites||[];
   for(const i of F.inv)if(!F.seenInv.has(i.id)){F.seenInv.add(i.id);toast(i)}
   try{window.WATCH95&&WATCH95.setWatched(r.j.watched||0)}catch(e){}
   badge();if(F.open)draw()}finally{F.busy=false}}
 setInterval(refresh,12000);setTimeout(refresh,4000);

 /* ---------- 위쪽 줄 단추 ---------- */
 function chip(){const anchor=$('gmRank')||$('gmDia')||$('gmCoins');if(!anchor||!anchor.parentNode)return;let b=$('gmFr');
  if(!b){b=document.createElement('button');b.id='gmFr';b.type='button';b.title='친구 — 친구 추가 · 듀오 초대 · 결투 신청';b.innerHTML='<i>👥</i><span>친구</span><em hidden></em>';
   b.onclick=e=>{e.stopPropagation();try{gmSfx('ok')}catch(_){}if(!acc().token){try{ACCT55.open()}catch(err){}return}open()};b.addEventListener('pointerdown',e=>e.stopPropagation())}
  if(b.previousElementSibling!==anchor)anchor.after(b);badge()}
 setInterval(()=>{try{chip()}catch(e){}},700);
 function badge(){const e=document.querySelector('#gmFr em');if(!e)return;const n=F.inc.length+F.inv.length+F.list.filter(unread).length,on=F.list.filter(f=>f.online).length;e.hidden=!(n||on);e.textContent=n?String(n):on?'●':'';e.className=n?'r':'g'}

 /* ---------- 친구 창 ---------- */
 const box=document.createElement('div');box.id='fr94';box.hidden=true;document.body.appendChild(box);
 box.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===box)close()});box.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Escape')close()});
 function open(){F.open=true;box.hidden=false;F.msg='';draw();refresh();sugLoad()}
 async function sugLoad(force){if(!acc().token||(!force&&Date.now()-F.sugT<30000))return;F.sugT=Date.now();try{const r=await api('/api/friends/suggest','POST',{});if(r.s===200){F.sug=r.j.list||[];lastH='';draw()}}catch(e){}}
 function close(){F.open=false;box.hidden=true}
 let lastH='';
 /* v95: 탑 · 듀오 · 결투 · 보스전 중이면 「게임 중」 + 관전 단추 */
 const inGame=f=>/탑|듀오|결투|보스/.test(f.where||'');
 function draw(){if(box.hidden)return;const on=F.list.filter(f=>f.online).length;
  const h='<div class="frP"><div class="frHd"><i>👥</i><div><b>친구</b><small>'+F.list.length+'명 · 접속 중 '+on+'명</small></div><button class="frWc" title="서버 채팅">💬 서버 채팅</button><button class="frX">닫기</button></div>'+
   '<div class="frAdd"><input id="frN" maxlength="20" placeholder="친구 이름 입력" autocomplete="off" spellcheck="false"><button id="frGo">＋ 친구 신청</button></div><div class="frMsg">'+esc(F.msg)+'</div>'+
   (F.inc.length?'<h5>받은 친구 신청 <span>'+F.inc.length+'</span></h5>'+F.inc.map(n=>'<div class="frRow req"><b>'+esc(n)+'</b><span class="frBtns"><button data-ok="'+esc(n)+'">수락</button><button class="no" data-no="'+esc(n)+'">거절</button></span></div>').join(''):'')+
   '<h5>친구 목록</h5><div class="frList">'+(F.list.length?F.list.map(f=>'<div class="frRow'+(f.online?' on':'')+'"><i class="dot"></i><div class="frI"><b>'+esc(f.name)+'</b><small>Lv.'+f.lv+' · 최고 '+f.floor+'F'+(f.online?' · <em>'+esc(f.where||'접속 중')+'</em>':' · <span class="frAgo">🕓 '+ago(f.last)+' 접속</span>')+'</small></div>'+
     (f.online&&inGame(f)?'<span class="frG">🎮 게임 중</span>':'')+'<span class="frBtns"><button class="ch'+(unread(f)?' nw':'')+'" data-ch="'+esc(f.name)+'" title="대화">💬</button>'+(f.online?(inGame(f)?'<button class="wt" data-wt="'+esc(f.name)+'">👁 관전</button>':'<button class="pv" data-pv="'+esc(f.name)+'">⚔ 결투</button><button class="du" data-du="'+esc(f.name)+'">🤝 듀오</button>'):'')+'<button class="rm" data-rm="'+esc(f.name)+'" title="친구 삭제">✕</button></span></div>').join(''):'<div class="frEmpty">아직 친구가 없어요.<br><small>위에 친구 이름을 넣고 신청해 보세요!</small></div>')+'</div>'+
   '<h5>✨ 친구 추천 <button class="frRf" title="새로고침">↻</button></h5><div class="frList sug">'+(F.sug.length?F.sug.map(f=>'<div class="frRow sg'+(f.online?' on':'')+'"><i class="dot"></i><div class="frI"><b>'+esc(f.name)+'</b><small>Lv.'+f.lv+' · 최고 '+f.floor+'F · '+(f.online?'<em>접속 중</em>':'🕓 '+ago(f.last))+'</small></div><span class="frWhy">'+esc(f.why||'')+'</span><span class="frBtns"><button class="ad" data-ad="'+esc(f.name)+'">＋ 신청</button></span></div>').join(''):'<div class="frEmpty sm">지금은 추천할 사람이 없어요</div>')+'</div>'+
   (F.sent.length?'<div class="frSent">보낸 신청: '+F.sent.map(esc).join(', ')+'</div>':'')+'</div>';
  if(h===lastH)return;lastH=h;const v=($('frN')||{}).value;box.innerHTML=h;if(v)$('frN').value=v;wire()}
 function wire(){const q=s=>box.querySelector(s);q('.frX').onclick=close;
  const add=async()=>{const n=($('frN').value||'').trim();if(!n)return;F.msg='보내는 중…';draw();const r=await api('/api/friends/request','POST',{name:n});
   F.msg=r.s===200?(r.j.status==='friends'?'✓ '+r.j.name+'님과 친구가 됐어요!':'✓ '+r.j.name+'님에게 친구 신청을 보냈어요'):(r.j.error||'보내지 못했어요');if(r.s===200)$('frN').value='';lastH='';refresh();draw()};
  q('#frGo').onclick=add;q('#frN').onkeydown=e=>{if(e.key==='Enter')add()};
  box.querySelectorAll('[data-ok],[data-no]').forEach(b=>b.onclick=async()=>{const n=b.dataset.ok||b.dataset.no;await api('/api/friends/respond','POST',{name:n,accept:!!b.dataset.ok});F.msg=b.dataset.ok?'✓ '+n+'님과 친구가 됐어요!':'';lastH='';refresh()});
  box.querySelectorAll('[data-rm]').forEach(b=>b.onclick=async()=>{if(!b.dataset.sure){b.dataset.sure=1;b.textContent='정말?';setTimeout(()=>{b.textContent='✕';delete b.dataset.sure},2500);return}await api('/api/friends/remove','POST',{name:b.dataset.rm});lastH='';refresh()});
  box.querySelectorAll('[data-pv]').forEach(b=>b.onclick=()=>duel(b.dataset.pv));
  box.querySelectorAll('[data-ch]').forEach(b=>b.onclick=()=>{close();try{CHAT103.dm(b.dataset.ch)}catch(e){}});
  if(q('.frWc'))q('.frWc').onclick=()=>{close();try{CHAT103.open()}catch(e){}};if(q('.frRf'))q('.frRf').onclick=()=>sugLoad(1);
  box.querySelectorAll('[data-ad]').forEach(b=>b.onclick=async()=>{b.disabled=true;b.textContent='…';const r=await api('/api/friends/request','POST',{name:b.dataset.ad});
   F.msg=r.s===200?(r.j.status==='friends'?'✓ '+r.j.name+'님과 친구가 됐어요!':'✓ '+r.j.name+'님에게 친구 신청을 보냈어요'):(r.j.error||'보내지 못했어요');F.sug=F.sug.filter(x=>x.name!==b.dataset.ad);lastH='';refresh();draw()});
  box.querySelectorAll('[data-wt]').forEach(b=>b.onclick=()=>{if(!window.WATCH95)return;close();try{WATCH95.spec(b.dataset.wt)}catch(e){console.error('watch',e)}});
  box.querySelectorAll('[data-du]').forEach(b=>b.onclick=()=>duo(b.dataset.du))}
 async function invite(name){if(!D.code){F.msg='방이 없어요';draw();return false}const r=await api('/api/friends/invite','POST',{name,code:D.code});F.msg=r.s===200?'✓ '+name+'님에게 초대를 보냈어요':(r.j.error||'초대하지 못했어요');lastH='';draw();try{note(F.msg)}catch(e){}return r.s===200}
 /* 결투 신청: 친선 결투 방을 만들고 바로 초대 */
 async function duel(name){if(D.started){F.msg='경기 중에는 신청할 수 없어요';draw();return}try{gmSfx('ok')}catch(_){}
  if(!(D.on&&D.room&&D.room.kind==='pvp'&&D.role==='host')){if(D.on)DU.end();const r=await api('/api/pvp/create','POST',{lv:DU.myLv(),ch:DU.myCh()});if(r.s!==200){F.msg=r.j.error||'방을 만들지 못했어요';draw();return}
   Object.assign(D,{on:true,code:r.j.room.code,role:'host',room:r.j.room,since:0,started:false,out:[]})}
  if(await invite(name)){close();DU.open('room')}}
 /* 듀오 초대: 이미 듀오 방이 있으면 바로, 없으면 방 만들기 화면 → 방을 만들면 자동 초대 */
 async function duo(name){if(D.started){F.msg='경기 중에는 초대할 수 없어요';draw();return}try{gmSfx('ok')}catch(_){}
  if(D.on&&D.room&&D.room.kind!=='pvp'&&D.role==='host'){if(await invite(name)){close();DU.open('room')}return}
  F.pendInvite=name;close();if(D.on)DU.end();DU.open('duo');try{note('방을 만들면 '+name+'님에게 초대가 가요')}catch(e){}}
 setInterval(()=>{if(F.pendInvite&&D.on&&D.code&&D.role==='host'&&D.room&&D.room.kind!=='pvp'){const n=F.pendInvite;F.pendInvite=null;invite(n)}if(F.pendInvite&&!DU.isOpen()&&!D.on)F.pendInvite=null},500);
 const note=t=>{try{banner(t)}catch(e){}};

 /* ---------- 방 화면: 친구 초대 단추 ---------- */
 setInterval(()=>{try{const rm=document.querySelector('#duo85 .dRm');if(!rm||!D.on||D.role!=='host'||(D.room&&(D.room.players||[]).length>=2))return;if(rm.querySelector('.frInvB'))return;
   const pl=rm.querySelector('.dPl');if(!pl)return;const w=document.createElement('div');w.className='frInvB';
   const on=F.list.filter(f=>f.online);w.innerHTML='<b>👥 친구 초대</b>'+(on.length?on.map(f=>'<button data-iv="'+esc(f.name)+'">'+esc(f.name)+' <small>'+esc(f.where||'')+'</small></button>').join(''):'<small>접속 중인 친구가 없어요</small>');
   pl.after(w);w.querySelectorAll('[data-iv]').forEach(b=>b.onclick=async()=>{b.disabled=true;if(await invite(b.dataset.iv))b.textContent='✓ '+b.dataset.iv+' 초대함'})}catch(e){}},600);

 /* ---------- 받은 초대 알림 ---------- */
 const tw=document.createElement('div');tw.id='frToast';document.body.appendChild(tw);
 function toast(i){const d=document.createElement('div');d.className='frT '+(i.kind==='pvp'?'pv':'du');
  d.innerHTML='<i>'+(i.kind==='pvp'?'⚔':'🤝')+'</i><div><b>'+esc(i.from)+'</b>님이 '+(i.kind==='pvp'?'<em>결투</em>를 신청했어요':'<em>듀오</em>에 초대했어요')+'<small>방 #'+esc(i.code)+'</small></div><button class="y">수락</button><button class="n">거절</button>';
  tw.appendChild(d);try{sfx(880,.15,'triangle',.06,1320);setTimeout(()=>sfx(1320,.15,'triangle',.05,1760),120)}catch(e){}
  const done=()=>{d.classList.add('out');setTimeout(()=>d.remove(),300)};const tm=setTimeout(()=>{done()},30000);
  d.addEventListener('pointerdown',e=>e.stopPropagation());
  d.querySelector('.n').onclick=()=>{clearTimeout(tm);api('/api/friends/invite/dismiss','POST',{id:i.id});done()};
  d.querySelector('.y').onclick=async()=>{clearTimeout(tm);done();api('/api/friends/invite/dismiss','POST',{id:i.id});
   try{if(D.started||D.on)DU.end()}catch(e){}try{if(typeof mode!=='undefined'&&mode!=='menu'){$('overlay').hidden=true;toLobby()}}catch(e){}
   setTimeout(()=>{try{DU.open(i.kind==='pvp'?'pvp':'duo');DU.join(i.code)}catch(e){}},350)}}

 const st=document.createElement('style');st.id='fr94s';st.textContent=`
 #gmFr{position:relative;display:inline-flex;align-items:center;gap:5px;height:32px;padding:0 12px 0 8px;border-radius:999px;font:inherit;font-weight:900;font-size:13px;cursor:pointer;color:#04121a;
  background:linear-gradient(180deg,#d8f6ff,#5ab8e8 70%,#2a7aa8);border:1px solid #e8faff;box-shadow:0 0 12px #5ab8e855,inset 0 1px 0 #fff8}
 #gmFr i{font-style:normal;font-size:15px}html.ph #gmFr span{display:none}html.ph #gmFr{padding:0 8px}
 #gmFr em{position:absolute;top:-5px;right:-5px;min-width:16px;height:16px;padding:0 4px;border-radius:9px;font-style:normal;font-size:10px;line-height:16px;font-weight:900;color:#fff;background:#ff2d55;box-shadow:0 0 6px #ff2d55}
 #gmFr em.g{background:#3ad16a;box-shadow:0 0 6px #3ad16a;color:#3ad16a;min-width:10px;height:10px;top:-2px;right:-2px;padding:0}
 #fr94{position:fixed;inset:0;z-index:94;display:flex;align-items:center;justify-content:center;background:#000b;color:#eaf6ef;font-family:inherit}#fr94[hidden]{display:none}
 #fr94 .frP{width:min(460px,calc(100vw - 20px));max-height:calc(100dvh - 20px);overflow:auto;border-radius:18px;padding:16px;background:linear-gradient(180deg,#14222c,#0a1015);border:2px solid #8de4ff55;box-shadow:0 24px 70px #000d;animation:frIn .2s ease-out}
 #fr94 .frHd{display:flex;align-items:center;gap:10px;margin-bottom:10px}#fr94 .frHd>i{font-style:normal;font-size:20px;width:40px;height:40px;display:grid;place-items:center;border-radius:12px;background:linear-gradient(180deg,#1e3a4a,#0e1c24);border:1px solid #8de4ff66}
 #fr94 .frHd b{display:block;font-size:20px}#fr94 .frHd small{color:#9ab8ac;font-size:11.5px}#fr94 .frX{margin-left:auto}
 #fr94 button{font:inherit;cursor:pointer}
 #fr94 .frAdd{display:flex;gap:6px}#fr94 .frAdd input{flex:1;min-width:0;padding:9px 10px;border-radius:10px;border:1px solid #8de4ff66;background:#05090c;color:#fff;font:inherit;font-size:15px}
 #fr94 .frAdd button{padding:9px 12px;border-radius:10px;border:0;font-weight:900;background:linear-gradient(180deg,#d8f6ff,#5ab8e8);color:#04121a}
 #fr94 .frMsg{min-height:1.2em;font-size:12.5px;color:#a6f5c6;margin:6px 0}
 #fr94 h5{margin:10px 0 6px;font-size:12px;color:#9ab8ac;display:flex;gap:6px;align-items:center}#fr94 h5 span{background:#ff2d55;color:#fff;border-radius:6px;padding:0 6px}
 #fr94 .frList{display:flex;flex-direction:column;gap:5px}
 #fr94 .frRow{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:12px;background:#0d161b;border:1px solid #ffffff12}
 #fr94 .frRow.on{background:linear-gradient(90deg,#0f2a20,#0d161b);border-color:#3ad16a44}#fr94 .frRow.req{background:#1c1420;border-color:#ff9af055}
 #fr94 .dot{width:9px;height:9px;border-radius:50%;background:#4a5260;flex:0 0 9px}#fr94 .frRow.on .dot{background:#3ad16a;box-shadow:0 0 6px #3ad16a}
 #fr94 .frI{flex:1;min-width:0}#fr94 .frI b{display:block;font-size:14px}#fr94 .frI small{font-size:11px;color:#8aa0a8}#fr94 .frI em{font-style:normal;color:#7dffa8}
 #fr94 .frBtns{display:flex;gap:4px;margin-left:auto}#fr94 .frBtns button{padding:6px 9px;border-radius:9px;border:1px solid #ffffff22;background:#13202a;color:#e8f4ef;font-weight:800;font-size:12px}
 #fr94 .frBtns .pv{background:linear-gradient(180deg,#ffc8d4,#ff5a7a);color:#2a0610;border:0}#fr94 .frBtns .du{background:linear-gradient(180deg,#d4ffe6,#74d3b0);color:#04120c;border:0}
 #fr94 .frBtns [data-ok]{background:linear-gradient(180deg,#d4ffe6,#74d3b0);color:#04120c;border:0}#fr94 .frBtns .rm{color:#ff8a9a}
 #fr94 .frBtns .wt{background:linear-gradient(180deg,#e2f2ff,#7ab8ff);color:#04101e;border:0}
 #fr94 .frG{flex:none;font-size:11px;font-weight:900;color:#ffd166;background:#2a2008;border:1px solid #ffd16655;border-radius:8px;padding:2px 7px;animation:frGp 1.6s ease-in-out infinite}
 @keyframes frGp{50%{box-shadow:0 0 8px #ffd16666}}
 #fr94 .frAgo{color:#9aa8c0}#fr94 .frWc{padding:7px 11px;border-radius:10px;border:0;font-weight:900;font-size:12px;background:linear-gradient(180deg,#fff0c8,#ffb84a);color:#2a1604;margin-left:auto}#fr94 .frWc+.frX{margin-left:0}
 #fr94 .frBtns .ch{position:relative;background:#13202a}#fr94 .frBtns .ch.nw{background:linear-gradient(180deg,#fff0c8,#ffb84a);border:0}#fr94 .frBtns .ch.nw:after{content:'';position:absolute;top:-3px;right:-3px;width:9px;height:9px;border-radius:50%;background:#ff2d55;box-shadow:0 0 6px #ff2d55}
 #fr94 .frRow.sg{background:#10141f;border-color:#b48aff33}#fr94 .frRow.sg.on{background:linear-gradient(90deg,#16122a,#10141f)}#fr94 .frWhy{flex:none;font-size:10.5px;font-weight:800;color:#c9b4ff;background:#1e1636;border-radius:7px;padding:2px 6px}
 #fr94 .frBtns .ad{background:linear-gradient(180deg,#e6dcff,#a98aff);color:#14082a;border:0}#fr94 h5 .frRf{margin-left:auto;padding:2px 8px;border-radius:7px;border:1px solid #ffffff22;background:#13202a;color:#cfe;font-size:12px}#fr94 .frEmpty.sm{padding:8px;font-size:12px}
 #fr94 .frEmpty{padding:18px;text-align:center;color:#9ab8ac}#fr94 .frSent{margin-top:8px;font-size:11px;color:#8aa0a8}
 #duo85 .frInvB{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:4px 0 8px;padding:8px 10px;border-radius:12px;background:#0b1319;border:1px dashed #8de4ff55}
 #duo85 .frInvB b{font-size:12px;color:#8de4ff;margin-right:4px}#duo85 .frInvB button{padding:5px 10px;border-radius:9px;border:1px solid #8de4ff66;background:#102028;color:#e8f4ef;font-weight:800;font-size:12px}
 #duo85 .frInvB button small{color:#7dffa8;font-weight:600}#duo85 .frInvB>small{color:#8aa0a8;font-size:11px}
 #frToast{position:fixed;top:12px;left:50%;transform:translateX(-50%);z-index:9500;display:flex;flex-direction:column;gap:6px;width:min(420px,calc(100vw - 20px));pointer-events:none}
 .frT{pointer-events:auto;display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:14px;background:linear-gradient(180deg,#14222c,#0a1015);border:2px solid #8de4ff;box-shadow:0 10px 30px #000c,0 0 20px #8de4ff44;color:#eaf6ef;font-size:13px;animation:frT .3s ease-out}
 .frT.pv{border-color:#ff5a7a;box-shadow:0 10px 30px #000c,0 0 20px #ff5a7a44}.frT>i{font-style:normal;font-size:24px}.frT div{flex:1;min-width:0}.frT em{font-style:normal;font-weight:900;color:#ffe79a}.frT small{display:block;color:#8aa0a8;font-size:10.5px}
 .frT button{font:inherit;font-weight:900;padding:7px 11px;border-radius:10px;border:0;cursor:pointer}.frT .y{background:linear-gradient(180deg,#d4ffe6,#74d3b0);color:#04120c}.frT .n{background:#2a3436;color:#e8f4ef}
 .frT.out{opacity:0;transform:translateY(-10px);transition:.3s}
 @keyframes frIn{from{transform:translateY(10px);opacity:0}}@keyframes frT{from{transform:translateY(-16px);opacity:0}}`;document.head.appendChild(st);
 window.FR94={open,refresh,F,ago,unread,readMap};
}catch(e){console.error('v94 friends',e)}})();
