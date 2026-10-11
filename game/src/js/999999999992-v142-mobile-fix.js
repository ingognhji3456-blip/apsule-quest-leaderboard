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
 /* v150: 자리로 찾기 — 손가락을 뗀 곳이 보이는 ✕ 둘레(+14px) 안이면, 그 위를 무엇이 덮고 있어도(투명한 판 · 확대 차이 · 화면 끝 취소) ✕를 눌러 줌.
    세로 · 가로 똑같이. 이미 ✕가 눌렸으면(click이 왔으면) 다시 누르지 않음 */
 const XSEL='button.cx77,#bbShop .ssX,#shopClose,#acClose,#more98 .qh150 button';
 const vis=b=>{if(!b.isConnected)return false;const r=b.getBoundingClientRect();if(r.width<4||r.height<4)return false;for(let e=b;e;e=e.parentElement){if(e.hidden)return false;const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0)return false}return true};
 function xAt(x,y){let best=null,bd=1e9;for(const b of document.querySelectorAll(XSEL)){const r=b.getBoundingClientRect(),pad=14;if(x<r.left-pad||x>r.right+pad||y<r.top-pad||y>r.bottom+pad)continue;if(!vis(b))continue;const d=Math.hypot(x-(r.left+r.width/2),y-(r.top+r.height/2));if(d<bd){bd=d;best=b}}return best}
 let d2=null;
 document.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'){d2=null;return}const b=xAt(e.clientX,e.clientY);d2=b?{b,t:performance.now(),x:e.clientX,y:e.clientY}:null},true);
 const fire=(d,x,y)=>{if(!d||performance.now()-d.t>1200)return;if(Math.hypot(x-d.x,y-d.y)>40)return;setTimeout(()=>{if(lastClick>=d.t)return;try{if(vis(d.b))d.b.click()}catch(_){}},140)};
 document.addEventListener('pointerup',e=>{const d=d2;d2=null;if(d&&xAt(e.clientX,e.clientY)===d.b)fire(d,e.clientX,e.clientY)},true);
 document.addEventListener('pointercancel',e=>{const d=d2;d2=null;if(d&&performance.now()-d.t<500)fire(d,d.x,d.y)},true);
 document.addEventListener('click',e=>{if(e.target&&e.target.closest&&e.target.closest(XSEL))lastClick=performance.now()},true);
 /* v151: 가로 화면에서 ✕가 화면 끝(위 3~9px · 왼쪽 13~20px)에 붙어 있었음 — 폰은 전체 화면일 때 위 끝 누름을 알림줄 내리기로,
    왼쪽 끝을 「뒤로」 쓸기로 가져가서 ✕가 안 눌렸음(세로는 ✕가 위에서 100px쯤이라 괜찮았음).
    → 폰 · 패드 가로에서는 보이는 ✕를 위 14px · 양옆 30px(또는 안전 여백) 안쪽으로 밀어 둔다(translate, 매 0.4초 확인) */
 const MT=14,ML=30;
 function sa(side){try{const d=document.createElement('div');d.style.cssText='position:fixed;visibility:hidden;'+side+':0;width:0;height:0;padding-'+side+':env(safe-area-inset-'+side+')';document.body.appendChild(d);const v=parseFloat(getComputedStyle(d)['padding'+side[0].toUpperCase()+side.slice(1)])||0;d.remove();return v}catch(e){return 0}}
 let SA={left:0,right:0,top:0,t:0};
 function nudge(){const R=document.documentElement,on=R.classList.contains('lpL')||(R.classList.contains('ph')&&innerWidth>innerHeight);
  const all=document.querySelectorAll(XSEL);
  if(!on){for(const b of all)if(b.dataset.n151){b.style.translate='';delete b.dataset.n151}return}
  if(Date.now()-SA.t>3000)SA={left:sa('left'),right:sa('right'),top:sa('top'),t:Date.now()};
  const L=Math.max(ML,SA.left+10),Rr=Math.max(ML,SA.right+10),T=Math.max(MT,SA.top+6);
  for(const b of all){if(!vis(b))continue;const r=b.getBoundingClientRect(),k=(b.offsetWidth?r.width/b.offsetWidth:1)||1;
   const o=(b.dataset.n151||'0,0').split(',').map(Number);let dx=0,dy=0;
   if(r.left<L)dx=L-r.left;else if(innerWidth-r.right<Rr)dx=-(Rr-(innerWidth-r.right));
   if(r.top<T)dy=T-r.top;
   if(Math.abs(dx)<1&&Math.abs(dy)<1)continue;
   const nx=o[0]+dx/k,ny=o[1]+dy/k;b.dataset.n151=nx.toFixed(1)+','+ny.toFixed(1);b.style.translate=nx.toFixed(1)+'px '+ny.toFixed(1)+'px'}}
 setInterval(()=>{try{nudge()}catch(e){}},400);addEventListener('resize',()=>setTimeout(()=>{try{nudge()}catch(e){}},80));
 new MutationObserver(()=>{clearTimeout(nudge._t);nudge._t=setTimeout(()=>{try{nudge()}catch(e){}},30)}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
 window.MF142={v:3,xAt,nudge};
}catch(e){console.warn('v142',e)}})();
