/* v142: 폰 가로 화면 ✕ 단추가 안 눌리던 것 (MF142)
   - 게임은 화면 끝까지 그린다(viewport-fit=cover). 가로로 돌리면 왼쪽(또는 오른쪽) 끝이 카메라 구멍 · 「뒤로」 쓸기 자리인데,
     v125부터 ✕를 왼쪽 끝(9px)에 두어서 손가락이 닿아도 단추가 못 받는 일이 있었음 → 가로 화면에서는 안전 여백(safe-area)만큼 안쪽으로.
   - 손가락을 떼는 순간 조금 움직였거나 끝자리라서 브라우저가 「누름(click)」을 만들지 않으면, ✕ 위에서 뗐을 때 직접 눌러 줌(두 번 눌리지 않게). */
(function(){try{
 const st=document.createElement('style');st.id='mf142';st.textContent=`
 html.phL .cx125L,html.uiLand .cx125L{margin-left:max(10px,env(safe-area-inset-left))!important}
 html.phL button.cx77,html.uiLand button.cx77{position:relative;z-index:5}
 html.phL #acClose,html.uiLand #acClose{margin-right:max(0px,env(safe-area-inset-right))!important}
 html.phL #bbShop .ssX,html.uiLand #bbShop .ssX{margin-right:max(0px,env(safe-area-inset-right))!important}`;
 document.head.appendChild(st);
 const isX=el=>el&&el.closest&&el.closest('button.cx77,#bbShop .ssX,#shopClose,#acClose');
 let down=null,lastClick=0;
 document.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse')return;const b=isX(e.target);down=b?{b,t:performance.now()}:null},true);
 document.addEventListener('click',e=>{if(isX(e.target))lastClick=performance.now()},true);
 document.addEventListener('pointerup',e=>{if(!down||e.pointerType==='mouse')return;const d=down;down=null;
  const r=d.b.getBoundingClientRect(),pad=14,inside=e.clientX>=r.left-pad&&e.clientX<=r.right+pad&&e.clientY>=r.top-pad&&e.clientY<=r.bottom+pad;
  if(!inside||performance.now()-d.t>1200)return;
  setTimeout(()=>{if(lastClick>=d.t)return;/* 브라우저가 click을 안 만들었으면 */try{if(document.contains(d.b))d.b.click()}catch(_){}},120)},true);
 document.addEventListener('pointercancel',e=>{/* 가장자리 쓸기로 취소돼도 ✕ 위였으면 누름(0.4초 안의 짧은 누름만) */if(!down)return;const d=down;down=null;if(performance.now()-d.t>400)return;setTimeout(()=>{if(lastClick>=d.t)return;try{if(document.contains(d.b))d.b.click()}catch(_){}},120)},true);
 window.MF142={v:1};
}catch(e){console.warn('v142',e)}})();
