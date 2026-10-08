/* ================= v67 폰 전용 배치 (PH67) =================
   컴퓨터 화면을 줄여서 보여 주던 방식을 버리고, 폰에서는 배치 자체를 따로 짠다.
   - 폰 판단: 손가락 화면이거나 화면 짧은 쪽이 500 이하 → <html>에 ph, 가로면 phL, 세로면 phP.
   - 로비: 왼쪽 글자 목록(#lvSet) 대신 손가락 크기 단추 줄(#phNav)과 큰 「▶ 이야기」 단추(#phPlay).
       가로 = 아래 왼쪽 단추 5개 + 아래 오른쪽 큰 단추, 세로 = 맨 아래 탭 줄 + 그 위 넓은 단추.
     라이트 쇼(.lvAlb)는 가로는 왼쪽 위, 세로는 큰 단추 위.
   - 위쪽 단추 줄: 모두 38~40px 높이로 맞추고, 세로에서는 한 줄을 고르게 나눈다.
   - 전투(세로): 게임 화면을 위로 올려 아래쪽을 조작 공간으로. */
(()=>{try{
 const root=document.documentElement;
 function mode(){const w=innerWidth,h=innerHeight,coarse=matchMedia('(pointer:coarse)').matches,ph=Math.min(w,h)<=500||(coarse&&Math.min(w,h)<=620);
  root.classList.toggle('ph',ph);root.classList.toggle('phL',ph&&w>h);root.classList.toggle('phP',ph&&w<=h)}
 addEventListener('resize',mode);addEventListener('orientationchange',()=>setTimeout(mode,250));mode();

 /* 로비 단추 (GM_ITEMS 순서: 0 이야기 · 1 보스 러시 · 2 상점 · 3 명예의 전당 · 4 설정 · 5 조작법) */
 const NAV=[[1,'⚔','보스 러시'],[2,'✦','상점'],[3,'♛','전당'],[4,'⚙','설정'],[5,'?','조작법']];
 function go(i){try{if(window.LV&&LV.enter)return;GM.sel=i;gmMainSel();lvGo()}catch(e){try{GM.sel=i;gmMainGo()}catch(_){}}}
 function build(){const m=document.getElementById('gmMain');if(!m||document.getElementById('phNav'))return;
  const nav=document.createElement('div');nav.id='phNav';
  nav.innerHTML=NAV.map(([i,ic,t])=>'<button data-i="'+i+'" style="--c:'+((window.LB_COL&&LB_COL[i])||'#a6f5c6')+'"><i>'+ic+'</i><b>'+t+'</b><em></em></button>').join('');
  nav.querySelectorAll('button').forEach(b=>b.onclick=()=>go(+b.dataset.i));
  const pl=document.createElement('button');pl.id='phPlay';pl.innerHTML='<small>NOW · STORY</small><b>▶ 이야기</b><em></em>';pl.onclick=()=>go(0);
  m.appendChild(nav);m.appendChild(pl);upd()}
 /* 단추 위 작은 글자(진행도 · 코인 등)는 원래 목록(#lvSet)의 것을 그대로 옮겨 온다 */
 function upd(){if(!root.classList.contains('ph'))return;const em=i=>{const e=document.querySelector('#lvSet .lvI[data-i="'+i+'"] em');return e?e.textContent.trim():''};
  const p=document.querySelector('#phPlay em');if(p){const t=em(0);if(p.textContent!==t)p.textContent=t}
  document.querySelectorAll('#phNav button').forEach(b=>{const t=em(+b.dataset.i),e=b.querySelector('em');if(e&&e.textContent!==t){e.textContent=t;e.hidden=!t}})}
 setInterval(()=>{try{build();upd()}catch(e){}},800);

 const st=document.createElement('style');st.id='ph67';st.textContent=`
 /* ---------- 위쪽 단추 줄 ---------- */
 html.ph #gameMenu .gmTop{zoom:1!important;flex-wrap:nowrap;align-items:center}
 html.ph #gameMenu .gmHud>*{height:38px!important;min-width:38px;padding:0 11px!important;font-size:13px!important;border-radius:12px!important;
  display:inline-flex!important;align-items:center;justify-content:center;gap:6px;box-sizing:border-box;flex:0 0 auto}
 html.ph #gmDiffChip .v57pips,html.ph #rplBtn .v57t,html.ph #gmName>span:not(.v57i){display:none!important}
 html.phL #gameMenu .gmTop{height:52px;padding:6px max(14px,env(safe-area-inset-right)) 0 max(14px,env(safe-area-inset-left))!important}
 html.phL #gameMenu .gmLogo{font-size:20px!important}html.phL #gameMenu .gmLogo small{display:none}
 html.phL #gameMenu .gmHud{gap:7px!important;margin-left:auto}
 html.phP #gameMenu .gmTop{flex-direction:column;align-items:stretch;padding:max(10px,env(safe-area-inset-top)) 12px 4px!important;gap:8px!important}
 html.phP #gameMenu .gmLogo{font-size:24px!important}
 html.phP #gameMenu .gmHud{display:flex!important;gap:6px!important;width:100%;justify-content:space-between}
 html.phP #gameMenu .gmHud>*{height:40px!important;padding:0 8px!important;flex:1 1 0!important;min-width:0}
 html.phP #gmCoins{flex:1.6 1 0!important}html.phP #acctChip .v57nm{display:none!important}

 /* 폰 가로: 로비가 아닌 화면(설정 · 조작법 · 이야기 …)은 자기 「뒤로」 단추가 있으니 위쪽 단추 줄을 숨겨 화면을 넓게 */
 html.phL #gameMenu:has(#gmMain:not(.on)) .gmTop{display:none!important}

 /* ---------- 로비 ---------- */
 #phNav,#phPlay{display:none}
 html.ph #gmMain.lvFull #lvSet#lvSet{display:none!important}
 html.ph #gmMain.lvFull>#phNav#phNav#phNav{display:flex!important}
 html.ph #gmMain.lvFull>#phPlay#phPlay#phPlay{display:flex!important}
 html.ph #lvGoBtn,html.ph .lvTip{display:none!important}
 #phNav{position:absolute;z-index:5;gap:8px}
 #phNav button{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;border-radius:16px;cursor:pointer;
  background:linear-gradient(180deg,#141c28ee,#0a1018ee);border:1px solid #ffffff1f;color:#e9f3ff;font:inherit;padding:0;
  box-shadow:inset 0 1px 0 #ffffff14,0 3px 0 #04070b,0 8px 18px #0008;-webkit-tap-highlight-color:transparent;transition:transform .08s}
 #phNav button:active{transform:translateY(2px);box-shadow:inset 0 1px 0 #ffffff10,0 1px 0 #04070b}
 #phNav i{font-style:normal;font-size:21px;line-height:1;color:var(--c);text-shadow:0 0 10px var(--c)}
 #phNav b{font-size:12px;font-weight:800;letter-spacing:.02em;white-space:nowrap}
 #phNav em{position:absolute;top:-7px;right:-4px;font-style:normal;font-size:10px;font-weight:900;padding:2px 6px;border-radius:999px;background:#05080c;border:1px solid var(--c);color:var(--c);white-space:nowrap}
 #phNav em:empty,#phPlay em:empty{display:none}
 #phPlay{position:absolute;z-index:5;flex-direction:column;align-items:center;justify-content:center;gap:1px;border-radius:18px;cursor:pointer;
  background:linear-gradient(180deg,#d4ffe6,#74d3b0);color:#04120c;border:1px solid #f0fff6;padding:0;font:inherit;
  box-shadow:inset 0 1px 0 #ffffffcc,0 4px 0 #2c6a55,0 10px 30px #6ccaa966;-webkit-tap-highlight-color:transparent;animation:lbBtn 1.6s ease-in-out infinite}
 #phPlay:active{transform:translateY(3px);box-shadow:inset 0 1px 0 #ffffffaa,0 1px 0 #2c6a55}
 #phPlay small{font-size:9px;letter-spacing:.32em;font-weight:900;opacity:.6}#phPlay b{font-size:24px;font-weight:900;letter-spacing:.04em}
 #phPlay em{font-style:normal;font-size:11px;font-weight:900;opacity:.75}
 html.ph #lvDock{zoom:1!important;max-width:none!important}
 html.ph .lvAlb{padding:4px 6px 4px 10px!important;border-radius:14px;gap:5px!important;background:#05080cc8!important;backdrop-filter:blur(6px)}
 html.ph .lvAlb>span{font-size:8px!important;letter-spacing:.2em;line-height:1.2;width:42px;white-space:normal}
 html.ph .lvAlb .lbChip{transform:none!important;width:30px!important;height:30px!important;min-width:30px;padding:0!important;border-radius:9px!important;flex:0 0 auto}
 /* 가로: 아래 왼쪽 단추 5개 · 아래 오른쪽 큰 단추 · 라이트 쇼는 왼쪽 위 */
 html.phL #phNav{left:max(14px,env(safe-area-inset-left));bottom:max(12px,env(safe-area-inset-bottom))}
 html.phL #phNav button{width:72px;height:64px}
 html.phL #phPlay{right:max(14px,env(safe-area-inset-right));bottom:max(12px,env(safe-area-inset-bottom));width:min(230px,28vw);height:64px}
 html.phL #lvDock{left:max(14px,env(safe-area-inset-left))!important;right:auto!important;top:6px!important;bottom:auto!important}
 html.phL .lvAlb{max-width:calc(100vw - 40px);overflow-x:auto;scrollbar-width:none}
 /* 세로: 맨 아래 탭 줄 · 그 위 넓은 단추 · 그 위 라이트 쇼 */
 html.phP #phNav{left:10px;right:10px;bottom:max(10px,env(safe-area-inset-bottom));gap:6px}
 html.phP #phNav button{flex:1 1 0;height:64px;min-width:0}
 html.phP #phNav b{font-size:11.5px}
 html.phP #phPlay{left:10px;right:10px;bottom:calc(max(10px,env(safe-area-inset-bottom)) + 76px);height:74px}
 html.phP #phPlay b{font-size:27px}
 html.phP #lvDock{left:10px!important;right:10px!important;bottom:calc(max(10px,env(safe-area-inset-bottom)) + 162px)!important;top:auto!important;align-items:stretch!important}
 html.phP .lvAlb{overflow-x:auto;scrollbar-width:none;justify-content:flex-start}
 html.ph .lvAlb::-webkit-scrollbar{display:none}

 /* ---------- 전투 (세로) : 게임 화면을 위로 ---------- */
 html.phP #battleView{justify-content:flex-start!important;padding-top:max(6px,env(safe-area-inset-top))!important}
 html.phP #battleView .bar{order:-1}
 html.phP #battleView .bar{height:46px!important;flex-wrap:nowrap!important;justify-content:flex-end!important;gap:6px;padding:0 8px!important}
 html.phP #battleView .bar #bvTitle{display:none!important}
 html.phP #battleView .bar button{height:36px;padding:0 12px!important;font-size:13px!important;margin:0!important;white-space:nowrap}
 `;document.head.appendChild(st);
 window.PH67={mode,phone:()=>root.classList.contains('ph')};
}catch(e){console.error('v67 phone',e)}})();
