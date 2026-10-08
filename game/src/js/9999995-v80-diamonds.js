/* ================= v80 다이아 (DIA80) =================
   재화가 둘: 🪙 골드(원래 코인 — 잡몹 · 보스 · 층마다) · 💎 다이아(탑 보스 층을 깰 때만).
   - 다이아는 탑 10층마다 있는 보스를 쓰러뜨리면 「층 보상」으로 받는다. 그 층·그 난이도를 처음 깨면 많이, 다시 깨면 조금.
   - 현질 상품(스킨 · 펫 변이 · 새 검 · 연출 · 세트)을 다이아로도 살 수 있다. 값 = 원화 ÷ 5 (최소 100 · 최대 10,000).
     다이아로 산 것은 saveData.dia80.own에 남고(진행 기록이라 로그인하면 서버에도 저장), 99998이 보유로 친다.
   - 로비 위쪽 줄에 💎 개수 칩. */
(()=>{try{
 const D=()=>{const s=saveData;s.dia80=s.dia80||{n:0,own:[],fl:{}};const d=s.dia80;d.own=d.own||[];d.fl=d.fl||{};d.n=Math.max(0,Math.floor(d.n||0));return d};
 const PRE={skin:'skin_',pet:'pet_',sword:'sword_',fx:'fx_',vic:'fx_',lob:'fx_'};
 function price(it){const w=(it&&it.price)||0;return Math.max(100,Math.min(10000,Math.round(w/5/10)*10))}
 function add(n){const d=D();d.n+=Math.max(0,Math.round(n));try{saveNow()}catch(e){}chip(true);return d.n}
 /* 상품을 다이아로 사기. 세트는 안에 든 것을 낱개로 넣는다(서버 결제 때와 같은 이름) */
 function buy(it){if(!it)return {err:'상품을 찾지 못했어요.'};const d=D(),n=price(it);if(d.n<n)return {err:'다이아가 모자라요.'};
  const ids=it.kind==='set'?(it.parts||[]).map(([c,id])=>(c==='fx'?'fx_':c+'_')+id):[it.pid||(PRE[it.kind]||'')+it.id];
  d.n-=n;for(const x of ids)if(!d.own.includes(x))d.own.push(x);
  (d.log=d.log||[]).push({id:it.pid||it.id,n,t:Date.now()});if(d.log.length>50)d.log.shift();
  try{saveNow()}catch(e){}try{window.PAY58&&PAY58.apply()}catch(e){}chip(true);return {ok:true,left:d.n}}
 /* 탑 보스 층 보상: 첫 클리어(층 · 난이도마다 한 번) = 다이아 20+4×보스번호, 다시 깨면 15%. 난이도 배율 · 골드도 함께 */
 const DM={easy:.6,normal:1,hard:1.5,extreme:2.2};
 function floorReward(f){const d=D(),g=Math.max(1,Math.floor(f/10)),key=f+'|'+diff,first=!d.fl[key],m=DM[diff]||1;
  let dia=Math.round((20+4*((g-1)%70+1))*m*(1+Math.floor((g-1)/70)*.5));if(!first)dia=Math.max(3,Math.round(dia*.15));
  const gold=Math.round((first?150+g*25:50+g*8)*m);d.fl[key]=Date.now();add(dia);try{addCoins(gold)}catch(e){}
  return {dia,gold,first,html:'<div class="rw80"><b>층 보상'+(first?' · 첫 클리어!':'')+'</b><span class="g">🪙 +'+gold.toLocaleString()+' 골드</span><span class="d">💎 +'+dia.toLocaleString()+' 다이아</span><small>보유 💎 '+d.n.toLocaleString()+'</small></div>'}}
 /* 로비 위쪽 줄 💎 칩 (골드 칩 바로 뒤) */
 function chip(pulse){const c=document.getElementById('gmCoins');if(!c||!c.parentNode)return;let b=document.getElementById('gmDia');
  if(!b){b=document.createElement('button');b.id='gmDia';b.className=c.className;b.title='다이아 — 탑 보스 층을 깨면 얻어요. 현질 상품을 다이아로 살 수 있어요.';b.onclick=e=>{e.stopPropagation();try{gmSfx('ok');openShop();setTimeout(()=>{const t=document.querySelector('#shopModal [data-addon]');t&&t.click()},60)}catch(_){}};c.parentNode.insertBefore(b,c.nextSibling)}
  const t='💎 '+D().n.toLocaleString();if(b.textContent!==t)b.textContent=t;if(pulse){b.classList.remove('dia80p');void b.offsetWidth;b.classList.add('dia80p')}}
 setInterval(()=>{try{chip(false)}catch(e){}},700);
 const st=document.createElement('style');st.id='dia80';st.textContent=`
 #gmDia{color:#bfefff!important;border-color:#5ad0ff66!important}
 #gmDia.dia80p{animation:dia80p .7s ease-out}
 @keyframes dia80p{0%{transform:scale(1.25);box-shadow:0 0 18px #5ad0ff}100%{transform:none}}
 #bbShop .ssBtn.dia80{display:inline-flex;flex-direction:column;align-items:center;gap:1px;padding:8px 16px;border-radius:12px;border:1px solid #8de4ff;cursor:pointer;
  background:linear-gradient(180deg,#2a6a9a,#123a5a);color:#e8fbff;font-weight:900;font-size:16px;box-shadow:0 0 14px #5ad0ff55,inset 0 1px 0 #ffffff33}
 #bbShop .ssBtn.dia80 small{font-size:10px;font-weight:700;opacity:.8}
 #bbShop .ssBtn.dia80.ask{background:linear-gradient(180deg,#ffd166,#c8901a);color:#2a1a0a;border-color:#fff2c0}
 #bbShop .ssCard .dpr{font-size:11px;font-weight:900;color:#8de4ff;text-align:right;margin-top:2px;white-space:nowrap}
 #bbShop .ssDiaHave{font-size:11.5px;color:#9fd8f0;margin-top:6px}
 #overlay .rw80{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px 14px;margin:12px auto 0;padding:10px 14px;border-radius:12px;max-width:420px;
  background:linear-gradient(90deg,#1a2a3a,#2a1a3a);border:1px solid #8de4ff66;box-shadow:0 0 20px #5ad0ff33}
 #overlay .rw80 b{width:100%;text-align:center;color:#ffe79a;letter-spacing:.06em}
 #overlay .rw80 .g{color:#ffd166;font-weight:900}#overlay .rw80 .d{color:#8de4ff;font-weight:900;font-size:1.15em;text-shadow:0 0 10px #5ad0ff}
 #overlay .rw80 small{width:100%;text-align:center;color:#9fb0c8}
 `;document.head.appendChild(st);
 window.DIA80={get:()=>D().n,add,price,buy,floorReward,owns:id=>D().own.includes(id),chip};
}catch(e){console.error('v80 diamonds',e)}})();
