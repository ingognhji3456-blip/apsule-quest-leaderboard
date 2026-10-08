/* ================= v59 구글 플레이 앱 준비 (APP59) =================
   ① 앱 모드: 구글 플레이 앱(TWA)이나 홈 화면에 설치한 앱으로 열리면(주소 ?source=app, 앱에서 온 referrer,
      전체 화면 표시) 상점의 가격·「구매하기」를 숨긴다. 앱 안에서 디지털 상품을 팔려면 구글 플레이 결제를
      써야 해서, 지금은 앱에서는 입어보기만 된다. 웹에서 산 상품은 로그인하면 앱에서도 그대로 쓸 수 있다.
   ② 오프라인 저장: 서버(/play)로 열렸을 때 /sw.js 를 등록해 다음 실행부터 빨리 켜진다.
   ③ 계정 삭제: 「👤 계정」 창(로그인 상태)에 「계정 삭제」 단추. 구글 플레이 정책상 앱 안에서 지울 수 있어야 한다.
   ④ 무료 출시 모드(v60): 서버 /api/shop 의 free_mode(Render 환경변수 SHOP_MODE=free)가 켜져 있으면
      「✦ 스킨 · 무기 · 연출」 탭 자체를 숨긴다(window.BB_FREE, 99991의 mount). 마지막 값을 기억해 두어 오프라인에서도 바로 적용된다. */
(()=>{try{
 const web=/^https?:$/.test(location.protocol);
 let app=false;
 try{const q=new URLSearchParams(location.search);
  app=q.get('source')==='app'||String(document.referrer||'').startsWith('android-app://')||
   !!(window.matchMedia&&(matchMedia('(display-mode: fullscreen)').matches||matchMedia('(display-mode: standalone)').matches))&&web;
  if(app)sessionStorage.setItem('bb-app59','1');else app=sessionStorage.getItem('bb-app59')==='1'}catch(e){}
 window.BB_APP=app;
 if(app){document.documentElement.classList.add('bbApp');
}
 {const st=document.createElement('style');
  st.textContent=['bbApp','bbFree'].map(k=>'html.'+k+' #bbShop .ssPrice,html.'+k+' #bbShop .ssBtn.buy:not(.own),html.'+k+' #bbShop .ssCard .pr:not(.own)').join(',')+'{display:none!important}';
  document.head.appendChild(st)}

 /* ② 오프라인 저장 */
 if(web&&'serviceWorker' in navigator&&/^\/play\/?$/.test(location.pathname)){
  window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js',{scope:'/'}).catch(()=>{})})}

 /* ③ 계정 삭제 단추 */
 const DEF='https://capsule-quest-leaderboard.onrender.com';
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function addDel(){const p=document.getElementById('acPanel'),out=document.getElementById('acOut');if(!p||!out||document.getElementById('acDel59'))return;
  const row=document.createElement('div');row.className='acRow';row.innerHTML='<button class="gmBtn" id="acDel59" style="color:#ff9aa6;border-color:#ff5a6a88">계정 삭제</button>';
  out.parentElement.after(row);
  document.getElementById('acDel59').onclick=()=>{const A=(window.ACCT55&&ACCT55.get())||{};if(!A.token)return;
   row.innerHTML='<div class="acNote" style="width:100%">계정을 지우면 <b>아이디 · 서버의 진행 기록 · 랭킹 · 산 상품</b>이 모두 지워지고 되돌릴 수 없어요. (이 기기에 있는 기록은 남아요)<br>지우려면 아이디 <b>'+esc(A.user)+'</b> 를 똑같이 입력해 주세요.</div>'+
    '<input id="acDelIn" autocomplete="off" style="width:100%;padding:10px;border-radius:10px;border:1px solid #ff5a6a88;background:#0b0f18;color:#fff;font:15px inherit">'+
    '<button class="gmBtn" id="acDelGo" style="background:#5a1a24!important;color:#ffd0d6">영구 삭제</button><button class="gmBtn" id="acDelNo">취소</button><div class="acNote" id="acDelMsg"></div>';
   document.getElementById('acDelNo').onclick=()=>{try{ACCT55.open()}catch(e){}};
   document.getElementById('acDelGo').onclick=async()=>{const m=document.getElementById('acDelMsg'),v=document.getElementById('acDelIn').value.trim();
    if(v!==A.user){m.textContent='아이디가 달라요.';return}m.textContent='지우는 중…';
    try{const r=await fetch((A.url||DEF).replace(/\/+$/,'')+'/api/account/delete',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+A.token},body:JSON.stringify({confirm:A.user})});
     let j={};try{j=await r.json()}catch(e){}if(!r.ok||!j.ok)throw Error(j.error||'지우지 못했어요. 잠시 뒤 다시 해 주세요.');
     /* 서버 계정은 지워졌으니 이 기기에서도 로그아웃 */
     const o=document.getElementById('acOut');if(o)o.click();else{A.token='';try{localStorage.setItem('beatmachina-acct',JSON.stringify(A))}catch(e){}}
     setTimeout(()=>{const g=document.getElementById('acMsg');if(g)g.textContent='계정을 지웠어요. 이 기기의 기록은 그대로 남아 있어요.'},400)}
    catch(e){m.textContent=e.message}}}}
 const mo=new MutationObserver(()=>{try{addDel()}catch(e){}});
 const watch=()=>{const p=document.getElementById('acPanel');if(p)mo.observe(p,{childList:true,subtree:false});else setTimeout(watch,1000)};watch();

 /* ④ 무료 출시 모드 */
 let srvFree=false;function setFree(on){srvFree=!!on;/* 테스터(서버 TESTER_USERS)는 무료 모드여도 상점을 본다 */try{if(on&&window.PAY58&&PAY58.tester())on=false}catch(e){}window.BB_FREE=!!on;document.documentElement.classList.toggle('bbFree',!!on);/* v80: 무료 모드여도 탭은 남긴다 — 다이아로 사는 것은 돈이 아니라서 된다(₩ 값 · 구매하기만 숨김) */try{localStorage.setItem('bb-free60',on?'1':'0')}catch(e){}}
 try{if(localStorage.getItem('bb-free60')==='1')setFree(true)}catch(e){}
 setTimeout(async()=>{try{const a=(window.ACCT55&&ACCT55.get())||{},ctl=new AbortController(),tm=setTimeout(()=>ctl.abort(),70000);
  const r=await fetch((a.url||DEF).replace(/\/+$/,'')+'/api/shop',{cache:'no-store',signal:ctl.signal});clearTimeout(tm);const j=await r.json();if(j&&j.ok)setFree(!!j.free_mode)}catch(e){}},1200);

 window.APP59={app:()=>app,free:()=>!!window.BB_FREE,reFree(){if(srvFree)setFree(true)}};
}catch(e){console.error('v59 app',e)}})();
