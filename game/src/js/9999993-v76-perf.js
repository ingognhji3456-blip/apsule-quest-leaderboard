/* ================= v76 렉 줄이기 (PF76) =================
   - 상점(태엽 공방 · 스킨 상점)이 화면을 덮고 있으면 뒤의 로비 무대(lvDraw: 레이저 · 관객 · LED)는 안 보이므로 그리지 않는다.
   - 캐릭터 그림 저장(820 ch2Render)과 스킨 상점 목록 그림 줄이기(99991 loop)는 각 파일에서 직접 한다. */
(()=>{try{
 const covered=()=>{const sm=document.getElementById('shopModal'),bb=document.getElementById('bbShop');return !!((sm&&!sm.hidden)||(bb&&bb.open))};
 if(typeof lvDraw==='function'){const f=lvDraw;lvDraw=function(){if(covered())return;return f.apply(this,arguments)}}
 window.PF76={covered};
}catch(e){console.error('v76 perf',e)}})();
