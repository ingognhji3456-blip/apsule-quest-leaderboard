/* ================= v44 상점 화면 정리: 한 줄 머리 막대 · 평평한 탭 · 카드형 상품(표시가 그림을 가리지 않음) · 구매 버튼 항상 보이기 ================= */
(function(){try{const F=typeof FONT_STACK!=='undefined'?FONT_STACK:'sans-serif',st=document.createElement('style');st.textContent=
 /* 글꼴: 고정폭 대신 일반 글꼴 */
 '#shopModal.wsFull,#shopModal.wsFull button{font-family:'+F+'}'+
 /* 머리 막대: 제목 · 부제 · 코인 · 닫기 한 줄 */
 '#shopModal.wsFull .rushBar{padding:10px 16px!important;gap:12px}#shopModal.wsFull .rushBar span{display:flex;align-items:center;gap:10px;flex-wrap:wrap;letter-spacing:0!important;font-size:12px!important;color:#c8b28a!important;font-weight:600!important;min-width:0}'+
 '#wsTitle{font-size:17px;letter-spacing:.02em!important;margin-right:2px;color:#ffe2a0}#shopModal.wsFull .coinTag{font-size:14px!important;padding:4px 12px!important;border-radius:999px!important}'+
 '#shopModal.wsFull .rushBar button{white-space:nowrap;flex:none;padding:8px 14px!important;font-size:13px!important}'+
 /* 탭: 평평한 3칸 선택 */
 '#shopModal.wsFull .shopTabs{padding:12px 14px 6px!important;gap:6px!important;background:none!important}'+
 '#shopModal.wsFull .shopTabs{display:grid!important;grid-template-columns:repeat(3,1fr)}'+
 '#shopModal.wsFull .shopTab{max-width:none!important;margin:0!important;transform:none!important;animation:none!important;border-radius:10px!important;padding:10px 8px!important;font-size:14px!important;font-weight:800;background:#1c120a!important;color:#d8c4a0!important;box-shadow:inset 0 0 0 1px #4a3218!important}'+
 '#shopModal.wsFull .shopTab:before,#shopModal.wsFull .shopTab:after{display:none!important}'+
 '#shopModal.wsFull .shopTab.on{background:linear-gradient(180deg,#ffd98a,#d6a23a)!important;color:#2a1a0e!important;box-shadow:0 2px 10px #ffd98a44!important}'+
 '#shopModal.wsFull .rushBody{padding:6px 14px 16px!important}#shopHint{font-size:12px!important;opacity:.65!important;margin:2px 0 10px!important;letter-spacing:0!important}'+
 /* 상품: 카드 */
 '#shopModal.wsFull #shopGrid{background:none!important;grid-template-columns:repeat(auto-fill,minmax(118px,1fr))!important;grid-auto-rows:auto!important;gap:10px!important;align-content:start}'+
 '.wsItem{justify-content:flex-start!important;gap:6px;padding:8px 8px 10px!important;border-radius:12px;background:linear-gradient(180deg,#21160d,#170f08);box-shadow:inset 0 0 0 1px #3e2a16;transition:transform .15s,box-shadow .15s!important}'+
 '.wsItem:hover{transform:translateY(-2px)!important;box-shadow:inset 0 0 0 1px #6a4a22}'+
 '.wsItem .dome{width:100%!important;height:auto!important;aspect-ratio:1/1;border-radius:9px!important;background:radial-gradient(circle at 50% 70%,color-mix(in srgb,var(--tc) 22%,#0c0806),#0a0806 70%)!important;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--tc) 35%,#2a1a0e)!important}'+
 '.wsItem.t3 .dome,.wsItem.t4 .dome{box-shadow:inset 0 0 0 1px var(--tc),0 0 12px color-mix(in srgb,var(--tc) 35%,transparent)!important}'+
 '.wsItem b{position:static!important;transform:none!important;max-width:100%!important;background:none!important;box-shadow:none!important;padding:0!important;font-size:13px!important;font-weight:800;color:#f4e6c8!important;text-align:center}'+
 '.wsItem b i{display:block;font-size:9px!important;letter-spacing:1px!important;color:var(--tc)!important;margin:0 0 1px!important;line-height:1}'+
 '.wsItem .tg{position:static!important;order:3;transform:none!important;animation:none!important;font-size:11.5px!important;padding:3px 10px!important;border-radius:999px!important;box-shadow:none!important;font-variant-numeric:tabular-nums}.wsItem .tg:before{display:none!important}'+
 '.wsItem .tg{background:#3a2814!important;color:#ffe2a0!important}.wsItem .tg.poor{background:#2a1c12!important;color:#c88a7a!important}.wsItem .tg.own{background:#1e3a2a!important;color:#a6f5c6!important}.wsItem .tg.eq{background:#ffd166!important;color:#2a1a0e!important}'+
 '.wsItem.sel{transform:none!important;box-shadow:inset 0 0 0 2px #ffd166,0 0 16px #ffd16655!important}.wsItem.sel .dome,.wsItem.eq .dome,.wsItem.sel.eq .dome{box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--tc) 35%,#2a1a0e)!important}.wsItem.eq{box-shadow:inset 0 0 0 1px #a6f5c6aa}.wsItem.sel.eq{box-shadow:inset 0 0 0 2px #ffd166,0 0 16px #ffd16655!important}'+
 /* 왼쪽 정보 카드: 구매 버튼은 스크롤해도 아래에 붙어 있음 */
 '#wsInfo{display:flex;flex-direction:column}#wsBtn{position:sticky;bottom:0;z-index:2;border-radius:10px!important}'+
 '#wsInfo .wsHead b{font-size:20px!important}'+
 /* 낮은 가로 화면(폰 가로): 무대를 줄이고 정보와 버튼이 한 화면에 들어오게 */
 '@media (max-height:520px) and (min-width:600px){#wsMain{padding:8px 12px!important;gap:12px!important}#wsCv{max-height:34vh;width:auto!important;margin:0 auto}#wsStageBox{display:flex;justify-content:center;background:#140c08}#wsInfo{padding:8px 12px 10px!important}#wsInfo .wsSub{margin:2px 0 4px!important}#wsBtn{margin-top:6px!important;padding:8px!important;font-size:14px!important}#shopModal.wsFull .shopTabs{padding-top:8px!important}#shopModal.wsFull .shopTab{padding:7px 6px!important}#shopModal.wsFull #shopGrid{grid-template-columns:repeat(auto-fill,minmax(96px,120px))!important;justify-content:center}.wsItem{padding:6px 6px 8px!important}#shopHint{display:none}}'+
 /* 세로 폰 */
 '@media (max-width:820px) and (orientation:portrait){#wsCv{max-height:30vh;width:auto!important;margin:0 auto}#wsStageBox{display:flex;justify-content:center;background:#140c08}#shopHint{display:none}#wsMain{order:0}}'+
 '@media (max-width:820px){#shopModal.wsFull .rushBar span{gap:6px}#wsTitle{font-size:15px}#shopModal.wsFull #shopGrid{grid-template-columns:repeat(auto-fill,minmax(98px,1fr))!important;gap:8px!important}.wsItem b{font-size:12px!important}}';
 (document.head||document.body).appendChild(st)}catch(e){console.error('v44 shop',e)}})();
