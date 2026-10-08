/* ================= v77 닫기 단추 → 눈에 띄는 ✕ 단추 (CX77) =================
   「닫기」 · 「✕ 닫기」 · 「닫기 ✕」 글자 단추를 모두 동그란 ✕ 단추로 바꾼다(누르면 하는 일은 그대로).
   - 화면에 새로 생기는 단추도 창 내용이 바뀔 때마다 찾아서 바꾼다(창을 다시 그릴 때마다 새로 만들어지는 것들).
   - 로그인 창(#acClose)은 창의 오른쪽 위 모서리로 옮긴다.
   - 스킨 상점의 ✕(.ssX)도 같은 모양으로.
   + 설정의 「모험가 이름」 고치기 칸을 없앤다(이름은 로그인할 때 정한 계정 이름, 9999 syncName). */
(()=>{try{
 const RE=/^\s*(✕\s*)?닫기(\s*✕)?\s*$/;
 const st=document.createElement('style');st.id='cx77';st.textContent=`
 html body button.cx77,html body #bbShop .ssX{all:unset;box-sizing:border-box;display:inline-flex!important;align-items:center;justify-content:center;flex:none;
  width:42px!important;height:42px!important;min-width:42px!important;min-height:42px!important;padding:0!important;margin:0!important;border-radius:50%!important;cursor:pointer;
  background:radial-gradient(circle at 35% 30%,#ff7a8a,#e0284a 60%,#9a1030)!important;color:#fff!important;font:900 22px/1 system-ui,sans-serif!important;
  border:2px solid #ffffffcc!important;box-shadow:0 0 0 3px #e0284a55,0 6px 16px #000a,0 0 18px #ff3a5a88!important;text-shadow:0 1px 2px #0008;
  transition:transform .12s,box-shadow .12s;-webkit-tap-highlight-color:transparent;z-index:5}
 html body button.cx77:hover,html body #bbShop .ssX:hover{transform:scale(1.1) rotate(90deg);box-shadow:0 0 0 4px #ff3a5a77,0 6px 16px #000a,0 0 26px #ff3a5acc!important}
 html body button.cx77:active,html body #bbShop .ssX:active{transform:scale(.92)}
 /* ✕ 글자는 글꼴마다 크기가 달라서, 굵은 막대 두 개로 직접 그린다 */
 html body button.cx77{position:relative;color:transparent!important;text-shadow:none!important}
 html body button.cx77::before,html body button.cx77::after{content:"";position:absolute;left:50%;top:50%;width:20px;height:4px;border-radius:2px;background:#fff;box-shadow:0 1px 2px #0006;transform:translate(-50%,-50%) rotate(45deg)}
 html body button.cx77::after{transform:translate(-50%,-50%) rotate(-45deg)}
 html body button.cx77:focus-visible{outline:3px solid #ffe79a;outline-offset:2px}
 #acPanel{position:relative}
 #acPanel>button#acClose.cx77{position:absolute!important;top:10px;right:10px}
 #acPanel>h3{padding-right:48px}
 `;document.head.appendChild(st);
 function fix(){document.querySelectorAll('button:not(.cx77)').forEach(b=>{if(!RE.test(b.textContent||''))return;
   b.textContent='✕';b.classList.add('cx77');b.setAttribute('aria-label','닫기');b.title='닫기';
   /* 다른 화면의 단추 글씨 크기 규칙이 더 세서, 크기는 단추에 직접 박는다 */for(const [k,v] of [['font-size','22px'],['width','42px'],['height','42px'],['padding','0'],['line-height','1'],['border-radius','50%']])b.style.setProperty(k,v,'important');
   if(b.id==='acClose'){const p=document.getElementById('acPanel'),row=b.parentElement;if(p&&row!==p){p.appendChild(b);if(row&&row.classList.contains('acRow')&&!row.children.length)row.remove()}}})}
 function noNameEdit(){const i=document.getElementById('nameIn');if(!i)return;const row=i.closest('.row');if(row&&!row.hidden){row.hidden=true;row.style.display='none';const p=row.nextElementSibling;if(p&&p.tagName==='P')p.textContent='이름은 로그인할 때 정한 계정 이름으로 나와요. 랭킹에도 이 이름이 올라가요.'}}
 /* 창이 다시 그려지면 바로(다음 화면 그리기 전에) 바꾼다 + 혹시 몰라 1초마다 한 번 */
 let q=0;const run=()=>{q=0;try{fix();noNameEdit()}catch(e){}};
 try{new MutationObserver(()=>{if(!q)q=requestAnimationFrame(run)}).observe(document.body,{childList:true,subtree:true})}catch(e){}
 setInterval(run,1000);run();
 window.CX77={fix};
}catch(e){console.error('v77 close x',e)}})();
