/* v144: 폰 화면 다시 맞춤 (MUI144) — 플레이 스토어(폰)에서 가장 많이 볼 화면들
   ① 글자 크기 고정: 안드로이드 「글자 크기 크게」 설정을 크롬이 웹 페이지 글자에도 곱해서, 위쪽 줄 · 단추 · 창이 넘치고 겹쳤음(코인 「10,26」 잘림 등)
      → text-size-adjust 100%(게임이 정한 크기 그대로)
   ② 로비 위쪽 줄(세로): 7칸이 모두 같은 폭(51px)이라 코인 숫자가 잘림 → 아이콘 단추는 좁게, 코인 · 다이아는 글자만큼
   ③ 로비 랭킹 카드: 폰에서는 무대를 가려서 작은 「🏆 랭킹」 알약으로(누르면 전체 순위)
   ④ 로비(가로): 무대 그림이 화면 전체 높이를 써서 캐릭터가 아래 메뉴 뒤에 숨었음 → 그림판을 메뉴 위까지만(무대가 그 안에 맞춰 그려짐)
   ⑤ 가로 화면은 높이가 300px 안팎이라 ✕(48px)가 너무 큼 → 38px
   ⑥ 광장 「동전 던지기」: 폰에서 아래에서 150px(가로 화면이면 한가운데) → 가로는 오른쪽 위, 세로는 채팅 칸 위
   ⑦ 공방 · 상점만 폰에서 0.92배 아래로 줄이지 않음(글자가 너무 작았음). v145: 다른 창 · 메뉴는 원래 배율로(전부 키우니 로비가 다 가려졌음)
   ⑨ v145: 폰 로비 단추 · 위쪽 줄을 작게 → 무대가 더 넓게 보임. 세로는 아래 단추를 위로 조금 올림(폰 아래 막대에 가려 밀려 보였음)
   ⑩ v145: 세로 공방 — 정보 칸이 화면을 다 차지해 캐릭터 목록이 아래로 밀려 안 보였음 → 위는 무대+정보(따로 밀어 보기), 아래는 탭+목록(따로 밀어 보기)
   ⑧ 가로 화면에서 넘치던 창(계정 · ☰ · 탑 고르기)은 창 안에서 밀어 보기 */
(function(){try{
 const st=document.createElement('style');st.id='mui144';st.textContent=`
 html{-webkit-text-size-adjust:100%!important;text-size-adjust:100%!important}
 /* ② 위쪽 줄 */
 html.phP .gmHud{gap:4px!important}
 html.phP .gmHud>*{flex:0 0 auto!important;min-width:0!important}
 html.phP .gmHud>#acctChip,html.phP .gmHud>#gmFr,html.phP .gmHud>#gmChat,html.phP .gmHud>#gmMore{flex:0 0 40px!important;width:40px!important;padding:0!important}
 html.phP .gmHud>#gmCoins{flex:1 1 auto!important;min-width:76px!important;padding-right:8px!important}
 html.phP .gmHud>#gmDia{flex:0 1 auto!important;min-width:54px!important;padding:0 8px!important}
 html.phP .gmHud>#gmLv{flex:0 0 auto!important;min-width:44px!important;padding:0 6px!important}
 @media (max-width:385px){
  html.phP .gmHud{gap:3px!important}
  html.phP .gmHud>#acctChip,html.phP .gmHud>#gmFr,html.phP .gmHud>#gmChat,html.phP .gmHud>#gmMore{flex:0 0 34px!important;width:34px!important}
  html.phP .gmHud>#gmCoins{min-width:0!important;padding:0 6px!important;font-size:11px!important}
  html.phP .gmHud>#gmDia{min-width:0!important;padding:0 6px!important;font-size:11px!important}
  html.phP .gmHud>#gmLv{min-width:0!important;padding:0 5px!important;font-size:11px!important}}
 /* ③ 랭킹 알약 */
 html.ph #rkLob{width:auto!important;min-width:0!important;height:auto!important;padding:5px 11px!important;border-radius:999px!important;cursor:pointer}
 html.ph #rkLob .rlTabs,html.ph #rkLob .rlList,html.ph #rkLob .rlGo,html.ph #rkLob .rlHd small,html.ph #rkLob .rlHd::after{display:none!important}
 html.ph #rkLob .rlHd{margin:0!important;padding:0!important;gap:5px!important;font-size:11px!important}
 html.ph #rkLob .rlMine{margin:0 0 0 8px!important;padding:0!important;border:0!important;background:none!important;font-size:11px!important;display:inline!important}
 html.ph #rkLob .rlMine:empty{display:none!important}
 html.ph #rkLob>div{display:inline-flex;align-items:center}
 html.phP #rkLob{top:104px!important;right:10px!important;left:auto!important}
 html.phL #rkLob{top:56px!important;right:12px!important;left:auto!important}
 /* ④ 로비 가로: 무대 그림판은 아래 메뉴 위까지 */
 html.phL #lvCv{top:0!important;bottom:auto!important;height:calc(100% - 62px)!important}
 html.phL #gameMenu.lvOn{background:#05060c}
 html.phP #lvCv{top:0!important;bottom:auto!important;height:calc(100% - 150px - max(0px,env(safe-area-inset-bottom)))!important}
 html.phP #gameMenu.lvOn{background:#05060c}
 /* ⑤ 가로 ✕ 크기 */
 html.phL{--cxs:38px!important}
 html.phL button.cx77,html.phL #bbShop .ssX{font-size:18px!important}
 /* ⑥ 동전 던지기 */
 html.phL #egCoin{left:auto!important;right:max(12px,env(safe-area-inset-right))!important;top:52px!important;bottom:auto!important;transform:none!important;padding:7px 13px!important;font-size:12px!important}
 html.phL #egCoin:active{transform:scale(.94)!important}
 /* ⑧ 넘치는 창 */
 html.phL #acctBox .acPanel{max-height:calc(100dvh / var(--uis) - 16px)!important;overflow-y:auto!important}
 html.phL #more98{max-height:calc(100dvh - 64px)!important;overflow-y:auto!important}
 html.phL .dPick{max-height:calc(100dvh / var(--uis) - 90px)!important;overflow-y:auto!important}
 html.phP #egCoin{bottom:96px!important;padding:8px 15px!important;font-size:13px!important}
 /* ⑦ 공방 · 상점 배율 */
 html.uiFit.ph #bbShop{zoom:var(--uiw)!important;max-height:calc(94dvh / var(--uiw))!important;width:min(1040px,calc(96vw / var(--uiw)))!important}
 html.uiFit.ph #shopModal>*{zoom:var(--uiw)!important}
 html.phL #bbShop .ssStage canvas{height:calc(40dvh / var(--uiw))!important}
 /* ⑨ 폰 로비 단추 작게(무대가 보이게) */
 html.phL #phNav button{width:56px!important;height:46px!important}
 html.phL #phNav{bottom:max(8px,env(safe-area-inset-bottom))!important;gap:6px!important}
 html.phL #phNav i{font-size:16px!important}
 html.phL #phNav b{font-size:10px!important}
 html.phL #phNav em{font-size:9px!important;padding:1px 5px!important;top:-6px!important}
 html.phL #phPlay{width:min(180px,24vw)!important;height:46px!important;bottom:max(8px,env(safe-area-inset-bottom))!important}
 html.phL #phPlay b{font-size:18px!important}
 html.phL #phPlay small{font-size:7.5px!important}
 html.phL #phPlay em{font-size:9.5px!important}
 html.phL #gameMenu .gmHud{transform:scale(.82);transform-origin:right top}
 html.phL #rkLob{top:44px!important}
 html.phP #phNav{bottom:max(22px,calc(env(safe-area-inset-bottom) + 12px))!important}
 html.phP #phNav button{height:54px!important}
 html.phP #phNav i{font-size:18px!important}
 html.phP #phNav b{font-size:10.5px!important}
 html.phP #phPlay{height:56px!important;bottom:calc(max(22px,calc(env(safe-area-inset-bottom) + 12px)) + 64px)!important}
 html.phP #phPlay b{font-size:21px!important}
 html.phP #phPlay small{font-size:8px!important}
 html.phP #phPlay em{font-size:10px!important}
 /* ⑩ 세로 공방: 위(무대+정보) · 아래(탭+목록) 두 칸, 칸마다 따로 밀어 보기 */
 html.phP #shopModal.wsFull #wsMain{display:flex!important;flex-direction:column!important;overflow:hidden!important;gap:8px!important;padding:8px!important;min-height:0}
 html.phP #shopModal.wsFull #wsLeft{flex:0 0 auto!important;max-height:44%!important;overflow-y:auto!important;overscroll-behavior:contain;border-radius:12px}
 html.phP #shopModal.wsFull #wsStageBox{height:104px!important;min-height:0!important;flex:0 0 auto!important}
 html.phP #shopModal.wsFull #wsStageBox #wsCv{height:100%!important;width:auto!important;max-width:100%;margin:0 auto}
 html.phP #shopModal.wsFull #wsRight{flex:1 1 0!important;min-height:0!important;display:flex!important;flex-direction:column!important;overflow:hidden!important}
 html.phP #shopModal.wsFull #wsRight .shopTabs{flex:0 0 auto!important}
 html.phP #shopModal.wsFull #wsRight .rushBody{flex:1 1 0!important;min-height:0!important;overflow-y:auto!important;overscroll-behavior:contain}`;
 document.head.appendChild(st);
 /* ③ 랭킹 알약을 누르면 전체 순위(원래 카드도 누르면 열림 — 알약에서 탭 · 줄은 숨겼으니 카드 전체를 누름 단추로) */
 document.addEventListener('click',e=>{try{if(!document.documentElement.classList.contains('ph'))return;const k=e.target.closest&&e.target.closest('#rkLob');if(!k)return;e.stopPropagation();e.preventDefault();window.RANK83&&RANK83.open('score')}catch(_){}},true);
 /* ⑦ 공방 · 상점만 글자가 읽히게: --uiw = max(--uis, 0.92) (v145: 예전엔 모든 창에 걸어서 로비가 가려졌음) */
 const MINZ=.92;function keepZ(){try{const h=document.documentElement;const v=parseFloat(getComputedStyle(h).getPropertyValue('--uis'))||1;const w=h.classList.contains('ph')?Math.max(v,MINZ):v;if(h.style.getPropertyValue('--uiw')!==String(w))h.style.setProperty('--uiw',String(w))}catch(e){}}
 keepZ();new MutationObserver(keepZ).observe(document.documentElement,{attributes:true,attributeFilter:['style','class']});addEventListener('resize',()=>setTimeout(keepZ,50));
 window.MUI144={v:1};
}catch(e){console.warn('v144',e)}})();
