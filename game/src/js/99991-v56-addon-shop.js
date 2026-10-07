/* ================= v56 보스팩 · 스킨 상점 (ChatGPT 작업을 원본으로 옮김) =================
   상점(태엽 공방)의 「✦ 보스팩 · 스킨」 탭 → 상품 목록(서버 /api/shop)과 계정별 보유 상품(/api/shop/owned).
   결제는 아직 없음: 모든 상품이 「출시 준비 중」으로 보인다. */
/* Account-backed add-on store. Checkout and content release are not enabled. */
(()=>{try{
 const sheet=document.createElement('dialog');sheet.id='bbShop';
 sheet.setAttribute('aria-label','보스팩 · 스킨 상점');
 const style=document.createElement('style');
 style.textContent='#bbShop{box-sizing:border-box;width:min(680px,94vw);max-height:90dvh;overflow:auto;padding:24px;border:1px solid #78e9c1;border-radius:20px;background:#0b1923;color:#edf9f7;font:15px system-ui;box-shadow:0 24px 80px #000a}#bbShop::backdrop{background:#000b}#bbShop h2{margin:0 0 8px}#bbShop p{line-height:1.6;color:#bdd2d5}#bbShop nav{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0}#bbShop button{cursor:pointer;padding:10px 15px;border:1px solid #6ca99e;border-radius:10px;background:#163339;color:#effffb;font:inherit}#bbShop button:disabled{cursor:default;opacity:.65}#bbShop button[aria-pressed=true]{background:#246453}#bbShop article{padding:18px;margin:12px 0;border:1px solid #335464;border-radius:14px;background:linear-gradient(135deg,#142d38,#10212d)}#bbShop small{color:#8ee6c3}#bbShopStatus{min-height:24px}#bbShop footer{display:flex;gap:10px;margin-top:18px}';
 document.head.appendChild(style);document.body.appendChild(sheet);
 let selected='all',generation=0;
 const safe=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const account=()=>window.ACCT55?.get()||{};
 async function refresh(){
  const serial=++generation,a=account(),token=a.token||'';
  sheet.innerHTML='<h2>보스팩 · 스킨</h2><p>기본 게임은 무료로 즐기고, 새로운 전투와 외형을 만나보세요.</p><small>상품과 결제는 준비 중입니다. 현재 결제할 수 없어요.</small><nav><button data-tab="all">전체</button><button data-tab="boss">보스팩</button><button data-tab="skin">스킨</button><button data-tab="owned">보유 상품</button></nav><p id="bbShopStatus" role="status">상품을 불러오는 중…</p><section id="bbShopItems"></section><footer><button id="bbShopReload">새로고침</button><button id="bbShopClose">닫기</button></footer>';
  sheet.querySelector('#bbShopClose').onclick=()=>sheet.close();
  sheet.querySelector('#bbShopReload').onclick=refresh;
  for(const b of sheet.querySelectorAll('[data-tab]')){b.setAttribute('aria-pressed',String(b.dataset.tab===selected));b.onclick=()=>{selected=b.dataset.tab;refresh()};}
  const status=sheet.querySelector('#bbShopStatus'),items=sheet.querySelector('#bbShopItems');
  const base=(a.url||'https://capsule-quest-leaderboard.onrender.com').replace(/\/+$/,'');
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);
  try{
   const r=await fetch(base+'/api/shop',{signal:controller.signal});
   if(!r.ok)throw Error('상점에 연결하지 못했어요. 잠시 후 새로고침해 주세요.');
   const catalog=await r.json();if(!catalog.ok||!Array.isArray(catalog.products))throw Error('상품 정보를 확인하지 못했어요.');
   let owned=[],ownedError='';
   if(token){try{const o=await fetch(base+'/api/shop/owned',{headers:{Authorization:'Bearer '+token},signal:controller.signal});if(!o.ok)throw Error(o.status===401?'다시 로그인해 주세요.':'보유 상품을 확인하지 못했어요.');const j=await o.json();if(!j.ok||!Array.isArray(j.owned))throw Error('보유 상품을 확인하지 못했어요.');owned=j.owned;}catch(e){ownedError=e.message;}}
   if(serial!==generation)return;
   if((account().token||'')!==token){refresh();return;}
   status.textContent=ownedError||(token?'계정별 보유 상품은 서버에서 확인해요.':'로그인하면 보유 상품을 확인할 수 있어요.');
   if(selected==='owned'&&!token){const b=document.createElement('button');b.textContent='로그인';b.onclick=()=>{sheet.close();window.ACCT55?.open()};items.appendChild(b);return;}
   if(selected==='owned'&&ownedError)return;
   const products=catalog.products.filter(p=>selected==='all'||(selected==='owned'?owned.includes(p.id):p.kind===selected));
   items.innerHTML=products.map(p=>'<article><small>'+ (p.kind==='boss'?'추가 전투':'외형 전용')+'</small><h3>'+safe(p.name)+'</h3><p>'+safe(p.description)+'</p><button disabled>'+ (owned.includes(p.id)?'보유 중 · 콘텐츠 준비 중':'출시 준비 중 · 가격 미정')+'</button></article>').join('')||'<p>아직 보유한 상품이 없어요.</p>';
  }catch(e){if(serial===generation)status.textContent=e.name==='AbortError'?'연결이 지연되고 있어요. 새로고침해 주세요.':e.message;}finally{clearTimeout(timer);}
 }
 function open(){if(!sheet.open)sheet.showModal();refresh();}
 sheet.addEventListener('close',()=>{generation++;});
 sheet.addEventListener('keydown',e=>e.stopPropagation());
 sheet.addEventListener('pointerdown',e=>e.stopPropagation());
 /* 메뉴 위 단추는 없애고, 상점(태엽 공방) 탭 줄에 「보스팩 · 스킨」 탭을 붙임 → 누르면 이 창이 열림 */
 window.BBShopOpen=open;
 function mount(){const tabs=document.querySelector('#shopModal .shopTabs');if(!tabs||tabs.querySelector('[data-addon]'))return;const b=document.createElement('button');b.className='shopTab bbAddonTab';b.dataset.addon='1';b.innerHTML='✦ <span class="bbL">보스팩 · 스킨</span><span class="bbS">팩·스킨</span>';b.title='보스팩 · 스킨';b.onclick=e=>{e.stopPropagation();try{gmSfx('ok')}catch(_){}open();};tabs.appendChild(b);}
 {const _rs=renderShop;renderShop=function(){const r=_rs.apply(this,arguments);try{mount()}catch(e){}return r}}
}catch(e){console.error('v56 shop',e)}})();
