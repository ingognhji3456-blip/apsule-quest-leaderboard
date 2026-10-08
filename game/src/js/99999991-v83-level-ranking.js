/* ================= v83 레벨 · 경험치 · 랭킹 탭 (LV83 · RANK83) =================
   레벨: saveData.lv83={lv,xp,tot}. 필요한 경험치 = 40 × 레벨^1.6 + 60 (1→2: 100, 10→11: 약 1,650, 30→31: 약 9,300)
     경험치: 탑 잡몹 3(정예 20) · 층 클리어 15+층/2 · 보스 승리 80+보스 번호×12 (보스 러시 포함). 난이도 배율 쉬움 0.7 ~ 익스트림 1.8.
     레벨이 오르면 「LEVEL UP」과 골드 보상(레벨×100). 능력치는 바뀌지 않음(보여 주기 · 랭킹용).
   랭킹: 서버 /api/ranking?by=score|level|floor|gold, 내 기록은 /api/stats로 30초마다(바뀌었을 때만) 올림.
   로비 위쪽 줄에 레벨 칩(경험치 막대) — 누르면 랭킹 창. 계정 창의 「🏆 랭킹」도 이 창을 연다. */
(()=>{try{
 const L=()=>{const s=saveData;s.lv83=s.lv83||{lv:1,xp:0,tot:0};const o=s.lv83;o.lv=Math.max(1,o.lv|0);o.xp=Math.max(0,o.xp|0);o.tot=Math.max(0,o.tot|0);return o};
 const need=lv=>Math.round(40*Math.pow(lv,1.6)+60);
 const DM={easy:.7,normal:1,hard:1.4,extreme:1.8};
 function pop(tx,col){try{if(typeof mode!=='undefined'&&mode==='tower'&&window.TW71)TW71.addPop(P.x,P.y-40,tx,col);else if(typeof G!=='undefined'&&G&&G.pops&&mode==='boss')G.pops.push({x:P.x,y:P.y-40,t:performance.now(),tx,col})}catch(e){}}
 function addXP(n,quiet){n=Math.max(0,Math.round(n*(DM[diff]||1)));if(!n)return;const o=L();o.xp+=n;o.tot+=n;let up=0;while(o.xp>=need(o.lv)){o.xp-=need(o.lv);o.lv++;up++}
  if(!quiet&&n>=10)pop('+'+n+' XP','#b8f0ff');
  if(up){const g=o.lv*100*up;try{addCoins(g)}catch(e){}try{banner('LEVEL UP!  Lv.'+o.lv+'  ·  🪙 +'+g)}catch(e){}pop('LEVEL UP! Lv.'+o.lv,'#ffe79a');try{sfx(660,.15,'triangle',.05,990);setTimeout(()=>sfx(990,.25,'triangle',.05,1320),140)}catch(e){}}
  try{saveNow()}catch(e){}chip(!!up)}
 /* 경험치 얻는 곳 */
 if(window.CB81){const f=CB81.onKill;CB81.onKill=function(m){const r=f.apply(this,arguments);try{if(!m._xp83){m._xp83=1;addXP(m.elite?20:3,!m.elite)}}catch(e){}return r}}
 let lastClear=null;
 {const f=frame;frame=function(){const r=f.apply(this,arguments);try{if(mode==='tower'&&window.TW71){const T=TW71.T;const k=T.f+'|'+(T.clear?1:0);if(T.clear&&lastClear!==T.f){lastClear=T.f;addXP(15+T.f/2)}if(!T.clear&&lastClear===T.f&&T.clk<.5)lastClear=null}}catch(e){}return r}}
 {const f=fightEnd;fightEnd=function(won){const r=f.apply(this,arguments);try{if(won&&G&&!G._xp83){G._xp83=1;const bi=(G.tw71?G.tw71.g:G.bi)||0;addXP(80+((bi%70)+1)*12)}}catch(e){}return r}}

 /* 로비 레벨 칩 */
 function chip(pulse){const c=document.getElementById('gmDia')||document.getElementById('gmCoins');if(!c||!c.parentNode)return;let b=document.getElementById('gmLv');
  if(!b){b=document.createElement('button');b.id='gmLv';b.className=c.className;b.title='레벨 — 탑 · 보스에서 경험치를 얻어요. 누르면 랭킹';b.onclick=e=>{e.stopPropagation();try{gmSfx('ok')}catch(_){}open()};c.parentNode.insertBefore(b,c.nextSibling)}
  const o=L(),q=Math.min(1,o.xp/need(o.lv)),h='<span class="lv83n">Lv.'+o.lv+'</span><span class="lv83b"><i style="width:'+Math.round(q*100)+'%"></i></span>';if(b.dataset.h!==h){b.dataset.h=h;b.innerHTML=h}
  if(pulse){b.classList.remove('lv83p');void b.offsetWidth;b.classList.add('lv83p')}}
 setInterval(()=>{try{chip(false)}catch(e){}},800);

 /* ---------- 서버에 내 기록 올리기 ---------- */
 const acc=()=>(window.ACCT55&&ACCT55.get())||{};
 const base=()=>(acc().url||'https://capsule-quest-leaderboard.onrender.com').replace(/\/+$/,'');
 let lastSent='',lastT=0;
 async function sync(force){const a=acc();if(!a.token)return;const o=L(),tw=saveData.tw71||{},body={level:o.lv,xp:o.tot,gold:saveData.coins||0,floor:tw.best||1},k=JSON.stringify(body);
  if(!force&&(k===lastSent||Date.now()-lastT<30000))return;lastT=Date.now();
  try{const r=await fetch(base()+'/api/stats',{method:'PUT',headers:{'Content-Type':'application/json',Authorization:'Bearer '+a.token},body:k});if(r.ok)lastSent=k}catch(e){}}
 setInterval(()=>{sync(false)},10000);setTimeout(()=>sync(true),6000);

 /* ---------- 랭킹 창 ---------- */
 const box=document.createElement('div');box.id='rk83';box.hidden=true;box.innerHTML='<div class="rkP"><div class="rkHd"><b>🏆 랭킹</b><button class="rkX">닫기</button></div><div class="rkTabs"></div><div class="rkList"></div><div class="rkMine"></div></div>';document.body.appendChild(box);
 const TABS=[['score','점수'],['level','레벨'],['floor','탑 층'],['gold','골드'],['pvp','결투']];let tab='score';
 const esc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const num=v=>Number(v||0).toLocaleString();
 function val(x){if(tab==='pvp')return (x.tier||'')+' '+num(x.rating);return tab==='score'?num(x.score)+'점':tab==='level'?'Lv.'+(x.level||1):tab==='floor'?(x.floor||1)+'F':'🪙 '+num(x.gold)}
 function sub(x){if(tab==='pvp')return (x.wins||0)+'승 '+(x.losses||0)+'패'+(x.level?' · Lv.'+x.level:'');const a=[];if(tab!=='level'&&x.level)a.push('Lv.'+x.level);if(tab!=='floor'&&x.floor)a.push(x.floor+'F');if(tab!=='gold'&&x.gold!=null)a.push('🪙'+num(x.gold));return a.join(' · ')}
 async function load(){const list=box.querySelector('.rkList'),mine=box.querySelector('.rkMine');box.querySelector('.rkTabs').innerHTML=TABS.map(([k,n])=>'<button data-k="'+k+'" class="'+(k===tab?'on':'')+'">'+n+'</button>').join('');
  box.querySelectorAll('.rkTabs button').forEach(b=>b.onclick=()=>{tab=b.dataset.k;try{gmSfx('move')}catch(_){}load()});
  list.innerHTML='<div class="rkNote">불러오는 중…</div>';mine.innerHTML='';await sync(true);
  let j=null;try{const h={};const a=acc();if(a.token)h.Authorization='Bearer '+a.token;const r=await fetch(base()+'/api/ranking?limit=30&by='+tab,{headers:h});j=await r.json()}catch(e){}
  if(!j||!j.ok){list.innerHTML='<div class="rkNote">랭킹을 불러오지 못했어요. 인터넷과 서버를 확인해 주세요.</div>';return}
  list.innerHTML=(j.players||[]).map(x=>'<div class="rkRow'+(x.me?' me':'')+(x.rank<=3?' top'+x.rank:'')+'"><b class="rkN">'+(x.rank<=3?['🥇','🥈','🥉'][x.rank-1]:'#'+x.rank)+'</b><span class="rkNm">'+esc(x.username)+'<small>'+esc(sub(x))+'</small></span><strong>'+val(x)+'</strong></div>').join('')||'<div class="rkNote">아직 기록이 없어요.</div>';
  const m=j.mine;mine.innerHTML=m?'내 순위 <b>#'+m.rank+'</b> · '+val(m)+(sub(m)?' <small>('+esc(sub(m))+')</small>':''):(acc().token?'<small>아직 이 순위표에 내 기록이 없어요.</small>':'<small>로그인하면 내 기록이 올라가요.</small>')}
 function open(t){if(t)tab=t;box.hidden=false;load()}
 function close(){box.hidden=true}
 box.querySelector('.rkX').onclick=close;box.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===box)close()});box.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Escape')close()});
 const st=document.createElement('style');st.id='lv83';st.textContent=`
 #gmLv{display:inline-flex!important;align-items:center;gap:6px}
 #gmLv .lv83n{font-weight:900;color:#ffe79a}#gmLv .lv83b{display:inline-block;width:42px;height:6px;border-radius:3px;background:#0a1018;box-shadow:inset 0 0 0 1px #ffffff22;overflow:hidden}
 #gmLv .lv83b i{display:block;height:100%;background:linear-gradient(90deg,#7df9ff,#a6f5c6)}
 #gmLv.lv83p{animation:lv83p .8s ease-out}@keyframes lv83p{0%{transform:scale(1.25);box-shadow:0 0 22px #ffe79a}100%{transform:none}}
 html.phP #gmLv .lv83b{display:none}
 #rk83{position:fixed;inset:0;z-index:95;display:flex;align-items:center;justify-content:center;background:#000b;font-family:inherit}#rk83[hidden]{display:none}
 #rk83 .rkP{width:min(460px,calc(100vw - 24px));max-height:calc(100dvh - 24px);display:flex;flex-direction:column;border-radius:16px;background:linear-gradient(180deg,#15232b,#0a1216);border:1px solid #a6f5c666;box-shadow:0 20px 60px #000c;color:#eaf6ef;padding:14px}
 #rk83 .rkHd{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}#rk83 .rkHd b{font-size:20px}
 #rk83 .rkTabs{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:8px}
 #rk83 .rkTabs button{padding:8px 4px;border-radius:10px;border:1px solid #ffffff22;background:#101a20;color:#c8d8d0;font:inherit;font-weight:800;cursor:pointer}
 #rk83 .rkTabs button.on{background:linear-gradient(180deg,#2e6a54,#1c3a30);color:#fff;border-color:#a6f5c6}
 #rk83 .rkList{overflow:auto;min-height:120px;display:flex;flex-direction:column;gap:4px;padding-right:2px}
 #rk83 .rkRow{display:grid;grid-template-columns:44px 1fr auto;align-items:center;gap:8px;padding:7px 10px;border-radius:10px;background:#0d161b;border:1px solid #ffffff10}
 #rk83 .rkRow.me{border-color:#ffe79a;background:#2a2410}#rk83 .rkRow.top1{background:linear-gradient(90deg,#3a3010,#0d161b)}
 #rk83 .rkN{font-size:15px;color:#9ab8ac}#rk83 .rkNm{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:800}
 #rk83 .rkNm small{display:block;font-size:10.5px;font-weight:600;color:#8aa0a8}#rk83 .rkRow strong{color:#a6f5c6;font-variant-numeric:tabular-nums}
 #rk83 .rkMine{margin-top:8px;padding:9px 10px;border-radius:10px;background:#101a20;font-size:13.5px}#rk83 .rkMine b{color:#ffe79a}
 #rk83 .rkNote{padding:18px;text-align:center;color:#9ab8ac}`;document.head.appendChild(st);
 window.LV83={get:()=>({...L(),need:need(L().lv)}),addXP,need,sync};window.RANK83={open,close,load};
}catch(e){console.error('v83 level',e)}})();
