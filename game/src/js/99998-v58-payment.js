/* ================= v58 결제 · 보유 상품 · 장착 저장 (PAY58) =================
   ① 구매: 서버(app.py)에 주문을 만들고(/api/shop/order) 새 창으로 토스페이먼츠 결제창(/pay/checkout)을 연다.
      결제 결과는 창 메시지('beatblade-pay')와 주문 상태 확인(/api/shop/order/<번호>)으로 알아낸다.
   ② 보유: 로그인 계정의 보유 상품(/api/shop/owned)을 읽어 둔다. 세트는 서버가 낱개로 풀어서 준다.
   ③ 장착 저장: 보유한 상품을 장착하면 saveData.cos58에 남겨, 게임을 다시 켜도(다른 기기에서도) 그대로 입는다.
      입어보기(보유하지 않은 상품)는 저장하지 않는다.
   ④ 새 검 능력치: 보유한 새 검(99995)을 장착하면 WEAPONS[장착 번호]가 그 검의 능력치를 돌려준다.
      태엽 공방(#shopModal)이 열려 있을 때는 원래 검을 돌려줘 코인 상점 표시는 그대로다. */
(()=>{try{
 const DEF='https://capsule-quest-leaderboard.onrender.com';
 const acc=()=>(window.ACCT55&&ACCT55.get())||{};
 const base=()=>(acc().url||DEF).replace(/\/+$/,'');
 const API=()=>({skin:window.SKIN58,pet:window.PET59,sword:window.SWORD59,vic:window.VIC59,lob:window.LOB59});
 const PRE={skin:'skin_',pet:'pet_',sword:'sword_',vic:'fx_',lob:'fx_'};
 const kindOf=(c,id)=>c==='fx'?(String(id).startsWith('v_')?'vic':'lob'):c;
 let owned=new Set(),testMode=false,lastTok=null,pending=null;
 const cacheKey=()=>'bb-owned58:'+(acc().user||'');
 try{const a=acc();if(a.token){const c=JSON.parse(localStorage.getItem(cacheKey())||'null');if(c&&Array.isArray(c.o))owned=new Set(c.o)}}catch(e){}

 /* 상품 하나(상점 카드 항목)를 가지고 있나 — 세트는 안에 든 것을 모두 가지고 있어야 함 */
 function ownsItem(it){if(!it)return false;if(it.kind==='set')return (it.parts||[]).every(([c,id])=>owned.has((c==='fx'?'fx_':c+'_')+id));return owned.has(it.pid||'')}
 const ownsKind=(k,id)=>!!id&&owned.has(PRE[k]+id);

 /* 저장된 장착을 다시 입힘 / 보유하지 않게 된 것(로그아웃 등)은 벗김 */
 function apply(){const A=API(),cos=saveData.cos58||{};
  for(const k in PRE){const api=A[k];if(!api)continue;const want=cos[k],cur=api.get();
   if(want&&ownsKind(k,want)&&!cur)api.equip(want);
   else if(cur&&cur===want&&!ownsKind(k,want))api.equip(null)}}
 /* 지금 장착 상태를 저장 (보유한 것만. 입어보기는 저장 안 함) */
 function sync(){const A=API();saveData.cos58=saveData.cos58||{};const cos=saveData.cos58;
  for(const k in PRE){const api=A[k];if(!api)continue;const id=api.get();if(!id)delete cos[k];else if(ownsKind(k,id))cos[k]=id}
  try{saveNow()}catch(e){}}

 async function refresh(){const a=acc();lastTok=a.token||'';
  if(!a.token){owned=new Set();apply();return owned}
  const ctl=new AbortController(),tm=setTimeout(()=>ctl.abort(),20000);
  try{const r=await fetch(base()+'/api/shop/owned',{headers:{Authorization:'Bearer '+a.token},signal:ctl.signal});
   if(r.status===401){owned=new Set();apply();throw Error('다시 로그인해 주세요.')}
   if(!r.ok)throw Error('보관함을 확인하지 못했어요.');const j=await r.json();owned=new Set(j.owned||[]);testMode=!!j.test_mode;
   try{localStorage.setItem(cacheKey(),JSON.stringify({o:[...owned],t:Date.now()}))}catch(e){}apply();return owned}
  finally{clearTimeout(tm)}}

 /* ---------- 구매 ---------- */
 function stopPending(){if(pending){clearInterval(pending.iv);pending=null}}
 async function check(){const p=pending;if(!p)return;const a=acc();if(!a.token){stopPending();return}
  try{const r=await fetch(base()+'/api/shop/order/'+encodeURIComponent(p.order),{headers:{Authorization:'Bearer '+a.token}});const j=await r.json();
   if(pending!==p)return;
   if(j.status==='paid'){stopPending();try{await refresh()}catch(e){}p.cb({ok:true});return}
   if(j.status==='failed'){stopPending();p.cb({fail:true});return}
   const closed=!p.win||p.win.closed;
   if(closed){p.closedN=(p.closedN||0)+1;if(p.closedN>=3){stopPending();p.cb({cancel:true});return}}
   if(Date.now()-p.t0>20*60*1000){stopPending();p.cb({cancel:true})}}catch(e){}}
 async function buy(pid,cb){cb=cb||(()=>{});const a=acc();if(!a.token){cb({need:'login'});return}
  stopPending();
  /* 팝업 차단을 피하려고 누른 순간 빈 창부터 연다 */
  let w=null;try{w=window.open('','bbpay58','width=480,height=760');if(w)w.document.write('<meta name="viewport" content="width=device-width"><body style="margin:0;background:#07090f;color:#eef2ff;font:16px system-ui;display:grid;place-items:center;min-height:100vh">결제창을 여는 중…</body>')}catch(e){}
  try{const r=await fetch(base()+'/api/shop/order',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+a.token},body:JSON.stringify({product_id:pid})});
   let j={};try{j=await r.json()}catch(e){}
   if(!r.ok||!j.ok){if(r.status===409){try{await refresh()}catch(e){}}throw Error(j.error||'주문을 만들지 못했어요.')}
   if(w&&!w.closed)w.location.href=j.checkout_url;else{w=window.open(j.checkout_url,'_blank');if(!w){cb({err:'팝업이 막혔어요. 브라우저에서 이 사이트의 팝업을 허용해 주세요.'});return}}
   testMode=!!j.test_mode;pending={order:j.order_id,win:w,cb,t0:Date.now(),iv:setInterval(check,2500)};cb({opened:true,amount:j.amount,test:testMode})}
  catch(e){try{w&&w.close()}catch(_){}cb({err:e.message||'주문을 만들지 못했어요.'})}}
 window.addEventListener('message',e=>{const d=e.data;if(d&&d.type==='beatblade-pay'&&pending&&d.order_id===pending.order)setTimeout(check,300)});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&pending)check()});

 /* ---------- 새 검 능력치 (보유 + 장착일 때만) ---------- */
 const BASE=WEAPONS.slice(),PREM={};
 function prem(id){if(PREM[id])return PREM[id];const s=window.SWORD59&&SWORD59.byId(id);if(!s)return null;const b=BASE[BASE.length-1];
  const st=s.stat||{};return PREM[id]=Object.assign({},b,{name:s.name,type:s.type,dmg:st.dmg||b.dmg,crit:st.crit!=null?st.crit:b.crit,range:st.range!=null?st.range:b.range,grogi:st.grogi||0,col:s.col,trail:(s.trail&&s.trail[0]==='#')?s.trail:s.col,desc:s.desc,price:0})}
 function activeSword(i){const S=window.SWORD59;if(!S)return null;const id=S.get();if(!id||!owned.has('sword_'+id))return null;
  if(!saveData.eq||saveData.eq.wp!==i)return null;const sm=document.getElementById('shopModal');if(sm&&!sm.hidden)return null;return prem(id)}
 BASE.forEach((w,i)=>{try{Object.defineProperty(WEAPONS,i,{configurable:true,enumerable:true,get(){return activeSword(i)||BASE[i]},set(v){BASE[i]=v}})}catch(e){}});

 /* 로그인 계정이 바뀌면 보관함을 다시 읽음 (네트워크는 바뀔 때만) */
 setInterval(()=>{const t=acc().token||'';if(t!==lastTok)refresh().catch(()=>{})},4000);
 setTimeout(()=>{apply();refresh().catch(()=>{})},1500);

 window.PAY58={refresh,buy,sync,apply,ownsItem,ownsKind,owned:()=>owned,test:()=>testMode,pending:()=>!!pending,kindOf,
  /* 테스트 도구용: 서버 없이 보유 목록을 넣어 본다 */
  _set(list){owned=new Set(list||[]);apply()}};
}catch(e){console.error('v58 payment',e)}})();
