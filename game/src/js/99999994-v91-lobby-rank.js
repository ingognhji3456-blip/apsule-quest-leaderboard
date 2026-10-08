/* ================= v91 로비 랭킹 (RKL91) =================
   ① 로비 오른쪽 위 「🏆 랭킹」 카드: 점수 · 레벨 · 탑 층 · 골드 순위 1~3등과 내 순위를 실시간으로 보여 줌(6초마다 종류가 바뀜).
      카드를 누르면 전체 랭킹 창(RANK83)이 그 종류로 열린다. 위의 작은 단추로 종류를 직접 고를 수도 있음.
   ② 위쪽 줄(골드 · 다이아 옆)에 「🏆 랭킹」 단추 — 폰에서도 보임.
   순위는 서버 GET /api/ranking?by=…&limit=3 (종류마다 1분 동안 기억). */
(()=>{try{
 if(!window.RANK83)return;
 const acc=()=>(window.ACCT55&&ACCT55.get())||{};
 const base=()=>(acc().url||'https://capsule-quest-leaderboard.onrender.com').replace(/\/+$/,'');
 const esc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const num=v=>Number(v||0).toLocaleString();
 const TABS=[['score','점수','⚡'],['level','레벨','⭐'],['floor','탑 층','🏰'],['gold','골드','🪙']];
 const val=(k,x)=>k==='score'?num(x.score):k==='level'?'Lv.'+(x.level||1):k==='floor'?(x.floor||1)+'F':num(x.gold);
 let tab=0,pinT=0;const C={};
 async function get(k){if(navigator.webdriver&&/onrender\.com|^$/.test(acc().url||''))return null;/* 자동 시험(서버 주소 없음)에선 바깥 서버에 접속하지 않음 */const c=C[k];if(c&&Date.now()-c.t<60000)return c.j;try{const h={};const a=acc();if(a.token)h.Authorization='Bearer '+a.token;
   const r=await fetch(base()+'/api/ranking?limit=3&by='+k,{headers:h});const j=await r.json();if(j&&j.ok){C[k]={t:Date.now(),j};return j}}catch(e){}return c?c.j:null}

 /* ---------- 로비 카드 ---------- */
 const card=document.createElement('div');card.id='rkLob';card.hidden=true;card.innerHTML=
  '<div class="rlHd"><span class="rlTr">🏆</span><b>RANKING</b><small>실시간 순위</small></div><div class="rlTabs"></div><div class="rlList"></div><div class="rlMine"></div><div class="rlGo">전체 순위 보기 ▶</div>';
 document.body.appendChild(card);
 card.addEventListener('pointerdown',e=>e.stopPropagation());
 card.onclick=e=>{const b=e.target.closest('[data-t]');if(b){tab=+b.dataset.t;pinT=Date.now();try{gmSfx('move')}catch(_){}paint();return}
  try{gmSfx('ok')}catch(_){}try{RANK83.open(TABS[tab][0])}catch(err){}};
 async function paint(){const [k,n,ic]=TABS[tab];
  card.querySelector('.rlTabs').innerHTML=TABS.map(([kk,nn,ii],i)=>'<button data-t="'+i+'" class="'+(i===tab?'on':'')+'">'+ii+' '+nn+'</button>').join('');
  card.querySelector('.rlHd').dataset.k=ic+' '+n;
  const j=await get(k);if(TABS[tab][0]!==k)return;const L=card.querySelector('.rlList'),M=card.querySelector('.rlMine');
  if(!j){L.innerHTML='<div class="rlNote">서버에 연결하는 중…<br><small>눌러서 전체 랭킹 열기</small></div>';M.innerHTML='';return}
  const ps=(j.players||[]).slice(0,3);
  L.innerHTML=ps.length?ps.map((x,i)=>'<div class="rlRow r'+(i+1)+(x.me?' me':'')+'"><i>'+['🥇','🥈','🥉'][i]+'</i><span>'+esc(x.username)+'</span><b>'+(k==='gold'?'🪙 ':'')+val(k,x)+'</b></div>').join(''):'<div class="rlNote">아직 기록이 없어요<br><small>첫 번째 주인공이 되어 보세요!</small></div>';
  const m=j.mine;M.innerHTML=m?'<span>내 순위</span><b>#'+m.rank+'</b><em>'+(k==='gold'?'🪙 ':'')+val(k,m)+'</em>':(acc().token?'<span>아직 이 순위표에 내 기록이 없어요</span>':'<span>로그인하면 내 순위가 보여요</span>');
  card.classList.remove('rlFlip');void card.offsetWidth;card.classList.add('rlFlip')}
 /* 로비 첫 화면에서만(폰 · 낮은 화면은 위쪽 단추로) */
 const show=()=>{try{const gm=document.getElementById('gameMenu'),ph=document.documentElement.classList.contains('ph');
   return mode==='menu'&&GM&&GM.scr==='main'&&gm&&!gm.hidden&&getComputedStyle(gm).display!=='none'&&(ph||innerHeight>=520&&innerWidth>=900)&&document.getElementById('rk83').hidden}catch(e){return false}};
 let shownAt=0;
 setInterval(()=>{const on=show();if(on&&card.hidden){card.hidden=false;shownAt=Date.now();paint()}else if(!on&&!card.hidden)card.hidden=true;
  card.classList.toggle('rlMini',document.documentElement.classList.contains('ph'));
  if(on&&Date.now()-pinT>15000&&Date.now()-shownAt>6000&&Math.floor(Date.now()/6000)!==card._tk){card._tk=Math.floor(Date.now()/6000);tab=(tab+1)%TABS.length;paint()}},400);

 /* ---------- 위쪽 줄 단추 ---------- */
 function chip(){const anchor=document.getElementById('gmDia')||document.getElementById('gmCoins');if(!anchor||!anchor.parentNode)return;let b=document.getElementById('gmRank');
  if(!b){b=document.createElement('button');b.id='gmRank';b.type='button';b.title='랭킹 — 점수 · 레벨 · 탑 층 · 골드 순위';b.innerHTML='<i>🏆</i><span>랭킹</span>';
   b.onclick=e=>{e.stopPropagation();try{gmSfx('ok')}catch(_){}try{RANK83.open()}catch(err){}};b.addEventListener('pointerdown',e=>e.stopPropagation())}
  if(b.previousElementSibling!==anchor)anchor.after(b)}
 setInterval(()=>{try{chip()}catch(e){}},700);setTimeout(()=>{try{chip()}catch(e){}},300);

 const st=document.createElement('style');st.id='rkl91';st.textContent=`
 #rkLob{position:fixed;top:84px;right:22px;width:236px;z-index:40;cursor:pointer;color:#f2f6f8;font-family:inherit;padding:12px 12px 10px;border-radius:16px;
  background:linear-gradient(180deg,#2a2010ee,#120d06f0 40%,#0a0e14f2);border:1px solid #ffd16688;box-shadow:0 12px 34px #000a,0 0 24px #ffd16633,inset 0 1px 0 #fff3;
  transition:transform .15s,box-shadow .15s;animation:rlIn .35s ease-out}
 #rkLob[hidden]{display:none}
 #rkLob:hover{transform:translateY(-3px);box-shadow:0 16px 40px #000c,0 0 34px #ffd16655,inset 0 1px 0 #fff3}
 #rkLob::before{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:linear-gradient(110deg,transparent 40%,#ffffff1c 50%,transparent 60%);background-size:260% 100%;animation:rlShine 3.2s linear infinite}
 #rkLob .rlHd{display:flex;align-items:center;gap:7px;margin-bottom:8px}
 #rkLob .rlTr{font-size:22px;filter:drop-shadow(0 0 8px #ffd166);animation:rlBob 2s ease-in-out infinite}
 #rkLob .rlHd b{font-size:15px;letter-spacing:.18em;background:linear-gradient(180deg,#fff6c8,#ffd166 60%,#d49a1a);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
 #rkLob .rlHd small{margin-left:auto;font-size:9.5px;color:#7dffa8;font-weight:800;animation:rlBlink 1.6s infinite}
 #rkLob .rlTabs{display:grid;grid-template-columns:repeat(4,1fr);gap:3px;margin-bottom:7px}
 #rkLob .rlTabs button{font:inherit;font-size:10px;font-weight:800;padding:4px 0;border-radius:7px;border:1px solid #ffffff1c;background:#0c1218;color:#b8c8d0;cursor:pointer;white-space:nowrap}
 #rkLob .rlTabs button.on{background:linear-gradient(180deg,#ffe79a,#d49a1a);color:#2a1a04;border-color:#ffe79a}
 #rkLob .rlList{display:flex;flex-direction:column;gap:4px;min-height:96px}
 #rkLob .rlRow{display:grid;grid-template-columns:24px 1fr auto;align-items:center;gap:6px;padding:5px 8px;border-radius:9px;background:#0d151c;border:1px solid #ffffff10;font-size:12.5px}
 #rkLob .rlRow i{font-style:normal;font-size:15px}#rkLob .rlRow span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:800}#rkLob .rlRow b{color:#a6f5c6;font-variant-numeric:tabular-nums;font-size:12px}
 #rkLob .rlRow.r1{background:linear-gradient(90deg,#4a3a10,#0d151c);border-color:#ffd16666}#rkLob .rlRow.r1 b{color:#ffe79a}
 #rkLob .rlRow.r2{background:linear-gradient(90deg,#2e3540,#0d151c)}#rkLob .rlRow.r3{background:linear-gradient(90deg,#3a2616,#0d151c)}
 #rkLob .rlRow.me{outline:1px solid #8de4ff}
 #rkLob .rlNote{padding:14px 4px;text-align:center;font-size:12px;color:#c8d8d0}#rkLob .rlNote small{color:#8aa0a8}
 #rkLob .rlMine{display:flex;align-items:center;gap:6px;margin-top:7px;padding:6px 8px;border-radius:9px;background:#101a22;border:1px dashed #8de4ff55;font-size:11.5px;color:#b8c8d0}
 #rkLob .rlMine b{color:#8de4ff;font-size:14px}#rkLob .rlMine em{margin-left:auto;font-style:normal;color:#a6f5c6;font-weight:800}
 #rkLob .rlGo{margin-top:7px;text-align:center;font-size:11.5px;font-weight:900;color:#ffe79a;letter-spacing:.06em}
 #rkLob.rlFlip .rlList,#rkLob.rlFlip .rlMine{animation:rlFlip .35s ease-out}
 #gmRank{display:inline-flex;align-items:center;gap:5px;height:32px;padding:0 12px 0 8px;border-radius:999px;font:inherit;font-weight:900;font-size:13px;cursor:pointer;color:#2a1a04;
  background:linear-gradient(180deg,#fff0b0,#ffc83a 60%,#d4920a);border:1px solid #fff2b8;box-shadow:0 0 14px #ffd16666,inset 0 1px 0 #fff8;animation:rlGlow 2.4s ease-in-out infinite}
 #gmRank i{font-style:normal;font-size:15px}#gmRank:hover{filter:brightness(1.08)}
 html.ph #gmRank span{display:none}html.ph #gmRank{padding:0 8px}
 /* 폰: 작은 카드(1등 + 내 순위) */
 #rkLob.rlMini{width:190px;padding:8px 10px;border-radius:14px}#rkLob.rlMini .rlTabs,#rkLob.rlMini .rlRow.r2,#rkLob.rlMini .rlRow.r3,#rkLob.rlMini .rlHd small{display:none}
 #rkLob.rlMini .rlList{min-height:0}#rkLob.rlMini .rlHd{margin-bottom:5px}#rkLob.rlMini .rlTr{font-size:17px}#rkLob.rlMini .rlHd b{font-size:12px}
 #rkLob.rlMini .rlHd::after{content:attr(data-k);margin-left:auto;font-size:10px;font-weight:900;color:#ffe79a}
 #rkLob.rlMini .rlMine,#rkLob.rlMini .rlGo{margin-top:5px;font-size:10.5px}#rkLob.rlMini .rlGo{display:none}
 html.phP #rkLob{top:104px;right:10px}html.phL #rkLob{top:56px;right:12px}
 @keyframes rlIn{from{opacity:0;transform:translateX(20px)}}@keyframes rlShine{0%{background-position:150% 0}100%{background-position:-100% 0}}
 @keyframes rlBob{50%{transform:translateY(-2px) rotate(-6deg)}}@keyframes rlBlink{50%{opacity:.4}}@keyframes rlFlip{from{opacity:0;transform:translateY(4px)}}
 @keyframes rlGlow{50%{box-shadow:0 0 22px #ffd166aa,inset 0 1px 0 #fff8}}`;document.head.appendChild(st);
 window.RKL91={paint,chip};
}catch(e){console.error('v91 lobby rank',e)}})();
