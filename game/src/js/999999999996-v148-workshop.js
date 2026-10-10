/* v148: 폰 · 패드 태엽 공방 새 배치 (WS148) — 사용자가 보내 준 그림을 참고
   - 위 줄: ✕ · 톱니 「태엽 공방」 · 코인
   - 세로: 탭(캐릭터 · 무기 · 펫 · 현질 상점) → 무대 → 정보 카드(이름 · 등급 · 체력/대시 막대 · 스킬) → 목록 2칸 → 맨 아래 큰 「장착하기」 단추(늘 보임)
   - 가로: 왼쪽 무대 + 정보 카드 + 「장착하기」, 오른쪽 탭 + 목록 4칸
   - 강화 · 스킨 · 설명은 「상세 보기」를 눌러야 펼쳐짐(정보 카드가 화면을 다 덮지 않게)
   원래 요소(#wsInfo · #wsBtn · #enh94 · #sk119 · #abBox100)는 그대로 두고 자리 · 모양만 바꾼다. */
(function(){try{
 const W='html.lp #shopModal.wsFull',P='html.lpP #shopModal.wsFull',L='html.lpL #shopModal.wsFull';
 const st=document.createElement('style');st.id='ws148css';st.textContent=`
 ${W}{background:radial-gradient(ellipse at 50% 0%,#3a2410,transparent 60%),linear-gradient(180deg,#1d130a,#120b06)!important}
 ${W} .rushBar{display:flex!important;align-items:center!important;gap:10px!important;height:auto!important;min-height:54px;padding:6px max(12px,env(safe-area-inset-right)) 6px max(10px,env(safe-area-inset-left))!important;box-sizing:border-box;
  background:linear-gradient(180deg,#2e1d0e,#1a1008)!important;border-bottom:1px solid #ffc04a33!important;box-shadow:0 4px 14px #0008}
 ${W} .rushBar>span{flex:1 1 auto!important;display:flex!important;flex-direction:row!important;align-items:center!important;gap:8px!important;min-width:0}
 ${W} #wsTitle,${W} .rushBar>span>*:not(#wsT148):not(.coinTag){display:none!important}
 ${W} #wsT148{display:flex}
 #wsT148{display:none;align-items:center;gap:8px;font-size:19px;font-weight:900;color:#ffe2a6;letter-spacing:.02em;white-space:nowrap;text-shadow:0 2px 0 #000}
 #wsT148 i{width:22px;height:22px;background:var(--sp-gear) center/contain no-repeat;image-rendering:pixelated;filter:sepia(1) saturate(3.2) hue-rotate(-12deg) brightness(1.15)}
 ${W} .rushBar>span{font-size:0!important}
 ${W} .rushBar .coinTag{margin-left:auto!important;font-size:0!important;display:inline-flex!important;align-items:center;gap:6px;padding:5px 12px!important;border-radius:999px!important}
 ${W} .rushBar .coinTag::before{content:'';width:16px;height:16px;background:var(--sp-coin) center/contain no-repeat;image-rendering:pixelated}
 ${W} .rushBar .coinTag #shopCoins{font-size:15px!important;font-weight:900;color:#ffe2a6!important}
 ${W} .rushBar>span::before,${W} .rushBar>span::after,${W} .rushBar::after{display:none!important}
 /* 상세 보기 */
 #wsMore148{display:none}
 ${W} #wsMore148{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;margin:2px 0 0;padding:7px 0;border-radius:10px;border:1px solid #ffc04a33;background:#ffffff08;color:#ffd98a;font:inherit;font-size:12px;font-weight:800;cursor:pointer}
 ${W} #wsMore148 b{transition:transform .15s}
 ${W}.ws148o #wsMore148 b{transform:rotate(180deg)}
 ${W}:not(.ws148o) #enh94,${W}:not(.ws148o) #sk119{display:none!important}
 ${P}:not(.ws148o) #wsInfo .wsSub{display:none!important}
 /* ── 세로 ── */
 ${P} #wsMain{display:flex!important;flex-direction:column!important;overflow-y:auto!important;overflow-x:hidden!important;gap:10px!important;padding:0 10px calc(84px + env(safe-area-inset-bottom))!important;overscroll-behavior:contain}
 ${P} #wsLeft,${P} #wsRight{display:contents!important}
 ${P} #wsRight .shopTabs{order:1;position:sticky;top:0;z-index:6;margin:0 -10px!important;padding:8px 10px!important;background:linear-gradient(180deg,#1d130a 85%,#1d130a00)}
 ${P} #wsStageBox{order:2;flex:none!important;height:178px!important;max-height:none!important;border-radius:14px!important}
 ${P} #wsStageBox #wsCv{height:100%!important;width:auto!important;max-width:100%;margin:0 auto}
 ${P} #wsInfo{order:3;flex:none!important}
 ${P} #wsRight .rushBody{order:4;flex:none!important;overflow:visible!important;min-height:0!important;padding:0!important}
 ${P} #shopGrid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}
 #wsBar148{display:none}
 ${P} #wsBar148{display:block;position:absolute;left:0;right:0;bottom:0;z-index:30;padding:10px max(12px,env(safe-area-inset-right)) calc(10px + env(safe-area-inset-bottom)) max(12px,env(safe-area-inset-left));background:linear-gradient(180deg,#120b0600,#120b06 30%)}
 ${P} #wsBar148 #wsBtn{width:100%!important;height:58px!important;margin:0!important;border-radius:16px!important;font-size:19px!important;box-shadow:0 6px 18px #0009!important}
 ${P} #shopGrid .wsItem{display:grid!important;grid-template-columns:62px minmax(0,1fr)!important;grid-template-rows:auto auto!important;align-items:center!important;column-gap:9px!important;row-gap:5px!important;padding:8px!important;min-height:0!important;height:auto!important;text-align:left!important}
 ${P} #shopGrid .wsItem .dome{grid-row:1/3;grid-column:1;width:62px!important;height:62px!important;margin:0!important}
 ${P} #shopGrid .wsItem .dome canvas{width:100%!important;height:100%!important}
 ${P} #shopGrid .wsItem>b{grid-column:2;grid-row:1;align-self:end;text-align:left!important;font-size:13px!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0!important}
 ${P} #shopGrid .wsItem>b i{display:block;font-size:10px}
 ${P} #shopGrid .wsItem>em.tg{grid-column:2;grid-row:2;align-self:start;justify-self:start;position:static!important;transform:none!important;margin:0!important}
 ${P} #shopGrid .wsItem .ab100{display:none!important}
 /* ── 가로 ── */
 ${L} #wsMain{display:grid!important;grid-template-columns:minmax(250px,40%) minmax(0,1fr)!important;grid-template-rows:minmax(0,1fr)!important;gap:10px!important;padding:8px max(12px,env(safe-area-inset-right)) 8px max(12px,env(safe-area-inset-left))!important;overflow:hidden!important}
 ${L} #wsLeft{display:flex!important;flex-direction:column!important;gap:8px!important;min-height:0!important;overflow:hidden!important}
 ${L} #wsStageBox{flex:0 0 auto!important;height:clamp(110px,36%,240px)!important;border-radius:14px!important}
 ${L} #wsStageBox #wsCv{height:100%!important;width:auto!important;max-width:100%;margin:0 auto}
 ${L} #wsInfo{flex:1 1 0!important;min-height:0!important;overflow-y:auto!important;overscroll-behavior:contain}
 ${L} #wsLeft>#wsBtn{position:relative!important;flex:none;width:100%!important;height:48px!important;margin:0!important;font-size:17px!important;border-radius:14px!important;box-shadow:0 -6px 14px #120b06!important}
 ${L} #wsRight{display:flex!important;flex-direction:column!important;min-height:0!important;overflow:hidden!important}
 ${L} #wsRight .rushBody{flex:1 1 0!important;min-height:0!important;overflow-y:auto!important;overscroll-behavior:contain}
 ${L} #shopGrid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:8px!important}
 /* 탭 · 목록 카드 */
 ${W} .shopTabs{gap:6px!important}
 ${W} .shopTab{border-radius:10px!important}
 ${W} #shopGrid .wsItem{border-radius:12px!important}
 /* 패드는 조금 크게 */
 html.lpPad #shopModal.wsFull #wsT148{font-size:24px}
 html.lpPad.lpL #shopModal.wsFull #wsStageBox{height:clamp(160px,40%,320px)!important}
 html.lpPad.lpP #shopModal.wsFull #wsStageBox{height:280px!important}
 html.lpPad.lpP #shopModal.wsFull #shopGrid{grid-template-columns:repeat(3,minmax(0,1fr))!important}`;
 document.head.appendChild(st);
 let open=false;
 function deco(){const m=document.getElementById('shopModal');if(!m)return;
  const sp=m.querySelector('.rushBar>span');if(sp&&!document.getElementById('wsT148')){const t=document.createElement('b');t.id='wsT148';t.innerHTML='<i></i>태엽 공방';sp.insertBefore(t,sp.firstChild)}
  m.classList.toggle('ws148o',open);
  const inf=document.getElementById('wsInfo');if(!inf)return;const btn=inf.querySelector('#wsBtn')||document.getElementById('wsBtn');if(!btn)return;
  if(!document.documentElement.classList.contains('lp')){/* 컴퓨터: 원래 자리로 */if(btn.parentNode!==inf)inf.appendChild(btn);return}
  let mb=document.getElementById('wsMore148');if(!mb){mb=document.createElement('button');mb.id='wsMore148';mb.innerHTML='상세 보기 <b>▾</b>';
   mb.addEventListener('click',e=>{e.stopPropagation();open=!open;m.classList.toggle('ws148o',open);try{window.gmSfx&&gmSfx('ok')}catch(_){}})}
  /* 「장착하기」 단추: 세로는 맨 아래 띠(#wsBar148), 가로는 왼쪽 칸 맨 아래. wsRefresh가 #wsInfo 안에 새로 만들므로 옛것은 지운다 */
  const all=[...document.querySelectorAll('#wsBtn')];if(all.length>1)all.forEach(b=>{if(b!==btn&&!inf.contains(b))b.remove()});
  const port=document.documentElement.classList.contains('lpP');let bar=document.getElementById('wsBar148');if(!bar){bar=document.createElement('div');bar.id='wsBar148';m.appendChild(bar)}
  const left=document.getElementById('wsLeft'),dst=port?bar:left;if(dst&&btn.parentNode!==dst)dst.appendChild(btn);
  /* 「상세 보기」는 스킬 칸(있으면) 뒤 · 강화 앞 */
  const enh=document.getElementById('enh94');if(enh&&enh.parentNode===inf){if(mb.nextSibling!==enh)inf.insertBefore(mb,enh)}else if(mb.parentNode!==inf||inf.lastChild!==mb)inf.appendChild(mb)}
 if(typeof wsRefresh==='function'){const f=wsRefresh;wsRefresh=function(){const r=f.apply(this,arguments);try{deco()}catch(e){}return r}}
 setInterval(()=>{try{if(document.documentElement.classList.contains('lp'))deco()}catch(e){}},500);
 window.WS148={v:1,deco};
}catch(e){console.warn('v148',e)}})();
