/* ================= v162 구글 플레이 결제 (PLAY162) =================
   - 구글 플레이 앱(TWA, window.BB_APP)에서는 토스 대신 구글 플레이 결제로 산다. 웹(브라우저)은 그대로 토스.
   - 파는 것: 다이아 묶음 dia_<개수> 6개 · 프리미엄 패스 pass_premium(한 상품, 이번 달 패스로 들어감).
     구글 플레이 콘솔의 「인앱 상품」 번호가 이것과 같아야 한다. 스킨 같은 다른 상품은 앱에서 다이아로 산다.
   - 흐름: getDigitalGoodsService → PaymentRequest(구글 플레이 결제창) → 서버 /api/play/verify(구글에 직접 확인 · 주문 장부에 넣음)
     → 다이아는 /api/shop/dia/claim(CS159), 패스는 PAY58.refresh로 보유에 들어옴 → 마지막에 consume(다시 살 수 있게).
   - 앱을 켤 때 「결제는 됐는데 서버 확인 전에 꺼진」 결제(listPurchases)를 찾아 마저 확인한다.
   - window.BB_PLAY = 구글 플레이 결제를 쓸 수 있는 앱인지(재화 상점 · 패스의 ₩ 단추를 보여 줄지). */
(()=>{try{
 const METHOD='https://play.google.com/billing';
 let svc=null,ready=null;const DET={};
 function skuOf(pid){if(/^dia_\d+$/.test(pid))return pid;if(/^pass_\d{4}-\d{2}$/.test(pid))return 'pass_premium';return null}
 async function init(){if(!window.BB_APP||!('getDigitalGoodsService' in window))return null;try{svc=await window.getDigitalGoodsService(METHOD)}catch(e){svc=null}
  if(!svc)return null;window.BB_PLAY=true;
  try{const L=(window.CS159?CS159.DIA_PACKS.map(p=>'dia_'+p[0]):[]).concat(['pass_premium']);(await svc.getDetails(L)).forEach(d=>{DET[d.itemId]=d})}catch(e){}
  setTimeout(recover,3000);return svc}
 /* BB_APP은 99999가 정하므로 조금 뒤에 시작 */setTimeout(()=>{ready=init()},1200);
 const api=(p,b)=>window.DUO85&&DUO85.api?DUO85.api(p,'POST',b):Promise.resolve({s:0,j:{}});
 async function verify(sku,token,season){const r=await api('/api/play/verify',{sku,token,season});return r}
 async function after(pid){try{await PAY58.refresh()}catch(e){}if(/^dia_/.test(pid)){try{window.CS159&&await CS159.claim()}catch(e){}}try{PAY58.apply()}catch(e){}}
 async function consume(token){try{svc&&await svc.consume(token)}catch(e){}}
 /* 결제 */
 async function buy(pid,cb){cb=cb||(()=>{});const sku=skuOf(pid);if(!sku){cb({err:'앱에서는 이 상품을 다이아로 살 수 있어요.'});return}
  try{if(!(window.DUO85&&DUO85.acc().token)){cb({need:'login'});return}}catch(e){}
  if(!svc){try{await(ready||init())}catch(e){}}if(!svc){cb({err:'구글 플레이 결제를 쓸 수 없어요. 앱을 최신으로 업데이트해 주세요.'});return}
  if(!DET[sku]){try{(await svc.getDetails([sku])).forEach(d=>{DET[d.itemId]=d})}catch(e){}if(!DET[sku]){cb({err:'구글 플레이에 아직 등록되지 않은 상품이에요.'});return}}
  let res;try{const req=new PaymentRequest([{supportedMethods:METHOD,data:{sku}}],{total:{label:'Total',amount:{currency:'KRW',value:'0'}}});cb({opened:true});res=await req.show()}
  catch(e){cb(e&&e.name==='AbortError'?{cancel:true}:{err:'결제창을 열지 못했어요.'});return}
  const token=res&&res.details&&res.details.purchaseToken;if(!token){try{await res.complete('fail')}catch(e){}cb({fail:true});return}
  const season=sku==='pass_premium'?pid.slice(5):undefined;let r;try{r=await verify(sku,token,season)}catch(e){r={s:0,j:{}}}
  if(r.s===200&&r.j&&r.j.ok){try{await res.complete('success')}catch(e){}await consume(token);await after(pid);cb({ok:true})}
  else{try{await res.complete('fail')}catch(e){}/* 결제는 됐을 수 있으니 다음에 앱을 켤 때 다시 확인(recover) */cb({err:(r.j&&r.j.error)||'결제 확인이 늦어지고 있어요. 앱을 다시 켜면 들어와요.'})}}
 /* 끝나지 않은 결제 마저 처리 */
 async function recover(){if(!svc)return;try{if(!(window.DUO85&&DUO85.acc().token))return}catch(e){return}let L=[];try{L=await svc.listPurchases()}catch(e){return}
  for(const p of L){const sku=p.itemId,token=p.purchaseToken;if(!sku||!token)continue;const pid=sku==='pass_premium'?'pass_'+(saveData.dp153&&saveData.dp153.ps&&saveData.dp153.ps.s||''):sku;
   const r=await verify(sku,token,sku==='pass_premium'?pid.slice(5):undefined).catch(()=>({s:0}));if(r.s===200&&r.j&&r.j.ok){await consume(token);await after(pid)}}}
 /* PAY58.buy: 앱이면 구글 플레이로 */
 if(window.PAY58&&PAY58.buy){const f=PAY58.buy;PAY58.buy=function(pid,cb){if(window.BB_APP&&skuOf(pid)&&('getDigitalGoodsService' in window))return buy(pid,cb);return f.apply(this,arguments)}}
 /* 로그인 뒤에도 한 번 */setInterval(()=>{try{if(svc&&DUO85.acc().token&&!recover._t){recover._t=1;recover()}}catch(e){}},5000);
 window.PLAY162={buy,recover,details:()=>DET,skuOf};
}catch(e){console.error('v162 play billing',e)}})();
