/* ================= v66 폰 화면 맞춤 (FIT66) =================
   폰 가로(높이가 낮은 화면)와 폰 세로(폭이 좁은 화면)에서 메뉴 · 설정 · 조작법 · 상점 창이
   컴퓨터 크기 그대로 커서 잘리던 문제를 고친다.
   - 화면 크기로 배율(--uis)을 정해, 메뉴 화면 · 스킨 상점 · 태엽 공방 · 계정 창을 그 배율로 줄여 그린다(zoom).
   - 가로 로비: 왼쪽 메뉴 판을 내용만큼만(투명한 유리) · 위쪽 단추 줄을 작게 · 무대(720 lvDraw)는 화면을 더 넓게 쓴다.
   - 세로 위쪽 단추 줄: 넘치지 않게 이름 글자 · 난이도 막대를 숨긴다. */
(()=>{try{
 const root=document.documentElement;
 function fit(){const w=innerWidth,h=innerHeight,land=w>h;let s=1;
  /* v67: 너무 작게 줄이면 글씨가 안 보여서, 폰 가로는 높이 520 기준 · 최소 0.72배 */
  if(land&&h<600)s=Math.max(.72,Math.min(1,h/520));
  else if(!land&&w<560)s=Math.max(.74,Math.min(1,w/520));
  root.style.setProperty('--uis',s.toFixed(3));
  root.classList.toggle('uiFit',s<.995);root.classList.toggle('uiLand',land&&h<600);root.classList.toggle('uiPort',!land&&w<560)}
 addEventListener('resize',fit);addEventListener('orientationchange',()=>setTimeout(fit,250));fit();

 const st=document.createElement('style');st.id='fit66';st.textContent=`
 /* 메뉴 화면(로비 제외) · 창들을 배율만큼 줄이기 */
 html.uiFit #gameMenu .gmScreen:not(#gmMain){zoom:var(--uis)}
 html.uiFit #bbShop{zoom:var(--uis);max-height:calc(94dvh / var(--uis))!important;width:min(1040px,calc(96vw / var(--uis)))!important}
 html.uiFit #shopModal>*{zoom:var(--uis)}
 html.uiFit #acctBox .acPanel{zoom:var(--uis)}
 html.uiFit #tut63{zoom:calc(var(--uis) + .12)}
 /* 로비 · 위쪽 단추 줄은 v67(999995) 폰 전용 배치가 맡는다 */
 /* 가로 스킨 상점: 미리보기 무대를 낮춰서 이름 · 가격 · 「구매하기」까지 한 화면에 */
 html.uiLand #bbShop .ssStage canvas{aspect-ratio:auto;height:calc(40dvh / var(--uis));object-fit:contain}
 html.uiLand #bbShop .ssInfo p{margin:4px 0 6px}
 `;document.head.appendChild(st);
 window.FIT66={fit,scale:()=>parseFloat(getComputedStyle(root).getPropertyValue('--uis'))||1};
}catch(e){console.error('v66 fit',e)}})();
