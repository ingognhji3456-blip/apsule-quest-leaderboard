/* ================= v57 메뉴 위쪽 단추 새 디자인 + 비슷한 단추들 깔끔하게 =================
   ① 메뉴 위쪽 줄(.gmHud): 단추마다 다른 모양
      계정 = 동그란 얼굴 + 이름 + 저장 상태 점 · 영상관 = 영화표 · 이름 = 하트 이름표 · 코인 = 금화
      난이도 = 색 점 4개 · 소리 / 전체화면 = 동그란·네모 아이콘 단추
      (원래 코드가 글자를 바꿀 때마다 같은 글자를 읽어서 새 모양으로 다시 그림)
   ② 두꺼운 이중 테두리였던 공통 단추(.gmBtn)·칩(.gmChip)·전투 위쪽 단추(.bar button)를 얇은 테두리·부드러운 그림자로
   ③ 보스팩·스킨 / 공허 검사 창을 게임 글꼴·색에 맞춤 */
(function(){try{
 const $=id=>document.getElementById(id);
 const FONT=typeof FONT_STACK!=='undefined'?FONT_STACK:'sans-serif';
 /* 작은 그림(아이콘): 글꼴에 없는 이모지 대신 선 그림 */
 const SVG={
  film:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4"/></svg>',
  heart:'<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M12 20.5 4.2 13A4.8 4.8 0 0 1 11 6.2l1 1 1-1A4.8 4.8 0 0 1 19.8 13Z"/></svg>',
  coin:'<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="9.5" fill="#f5b83a" stroke="#8a5a0c" stroke-width="1.5"/><circle cx="12" cy="12" r="6" fill="none" stroke="#fff2b0" stroke-width="1.4" opacity=".8"/><path d="M12 8.5v7M10 10h3.2a1.4 1.4 0 0 1 0 2.8h-2.4a1.4 1.4 0 0 0 0 2.8H14" fill="none" stroke="#8a5a0c" stroke-width="1.4" stroke-linecap="round"/></svg>',
  sndOn:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>',
  sndOff:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="m16 9.5 5 5M21 9.5l-5 5"/></svg>',
  fsIn:'<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/></svg>',
  fsOut:'<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M9 4v5H4M20 9h-5V4M15 20v-5h5M4 15h5v5"/></svg>',
  pause:'<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>'};
 const DIFF=[['easy','쉬움','#7dff9a'],['normal','보통','#8ad0ff'],['hard','어려움','#ffb020'],['extreme','익스트림','#ff4d6d']];
 const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

 const css=`
 /* ---------- ② 공통 단추 · 칩: 얇은 테두리, 부드러운 그림자 ---------- */
 html .gmBtn{background:linear-gradient(180deg,#1b2a31,#121b20);border:1px solid #ffffff1c;border-radius:10px;box-shadow:inset 0 1px 0 #ffffff12,0 4px 14px #0007;letter-spacing:.02em;transition:transform .12s,box-shadow .15s,border-color .15s,background .15s;filter:none}
 html .gmBtn:hover,html .gmBtn.sel{filter:none;border-color:#a6f5c699;background:linear-gradient(180deg,#203540,#15232a);box-shadow:inset 0 1px 0 #ffffff18,0 0 0 1px #a6f5c640,0 8px 20px #0008,0 0 16px #a6f5c626;transform:translateY(-1px)}
 html .gmBtn:active{transform:translateY(1px);box-shadow:inset 0 2px 6px #0008,0 0 0 1px #a6f5c655}
 html .gmBtn:focus-visible{outline:2px solid #ffe36b;outline-offset:2px}
 html .gmBtn.go{background:linear-gradient(180deg,#c6ffdf,#74d3b0);color:#06140e;border:1px solid #e6fff2;box-shadow:inset 0 1px 0 #ffffffaa,0 6px 20px #6ccaa955}
 html .gmBtn.go:hover{background:linear-gradient(180deg,#d6ffe9,#82e0bd);box-shadow:inset 0 1px 0 #ffffffcc,0 8px 26px #6ccaa988}
 html .gmChip{background:#0a1418d9;border:1px solid #ffffff1a;border-radius:999px;box-shadow:0 4px 12px #0006}
 html .gmHead .gmBack{border-radius:999px;padding:8px 16px 8px 12px}
 /* 전투 화면 위쪽 단추 (난이도 · 전체화면 · 일시정지) */
 html .bar button{background:#0c1519cc;border:1px solid #ffffff22;border-radius:999px;padding:6px 13px;font-weight:700;letter-spacing:.02em;box-shadow:0 3px 10px #0006;transition:border-color .15s,background .15s}
 html .bar button:hover{background:#15252bdd;border-color:#a6f5c6aa}
 html .bar #pauseBtn{border-color:#ffe36b66;color:#ffe9a6}

 /* ---------- ① 메뉴 위쪽 줄: 단추마다 다른 모양 ---------- */
 #gameMenu .gmHud{gap:8px}
 #gameMenu .gmHud>.v57{display:inline-flex;align-items:center;gap:7px;height:36px;box-sizing:border-box;padding:0 13px;font:800 13px ${FONT};white-space:nowrap;letter-spacing:.01em;transform:none}
 #gameMenu .gmHud>.v57 .v57s{font-size:10px;font-weight:700;opacity:.62;letter-spacing:.06em}
 /* 계정: 동그란 얼굴 + 이름 + 상태 점 */
 #gameMenu #acctChip.v57{padding:0 12px 0 4px;border-radius:999px;background:linear-gradient(90deg,#123038,#0d1c22);border:1px solid #5fd6c466;color:#dffbf5}
 #acctChip .v57av{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:900;color:#062019;background:linear-gradient(135deg,#a6f5c6,#5ab8ff);box-shadow:0 0 0 2px #0d1c22,0 0 10px #5fd6c455}
 #acctChip.out .v57av{background:linear-gradient(135deg,#43525a,#2a353b);color:#c6d6dc}
 #acctChip .v57nm{max-width:120px;overflow:hidden;text-overflow:ellipsis}
 #acctChip .v57dot{width:8px;height:8px;border-radius:50%;background:#7dff9a;box-shadow:0 0 8px #7dff9a}
 #acctChip .v57dot.up{background:#ffd166;box-shadow:0 0 8px #ffd166;animation:v57blink 1s infinite}
 #acctChip .v57dot.off,#acctChip .v57dot.bad{background:#ff6b6b;box-shadow:0 0 8px #ff6b6b}
 @keyframes v57blink{50%{opacity:.3}}
 /* 영상관: 영화표 */
 #gameMenu #rplBtn.v57{border-radius:8px;background:linear-gradient(135deg,#3a1d52,#22123a);border:1px solid #c88aff66;color:#f1e2ff;padding:0 14px 0 12px;position:relative}
 #gameMenu #rplBtn.v57::before,#gameMenu #rplBtn.v57::after{content:'';position:absolute;top:50%;width:8px;height:8px;margin-top:-4px;border-radius:50%;background:#071016}
 #gameMenu #rplBtn.v57::before{left:-5px}#gameMenu #rplBtn.v57::after{right:-5px}
 #rplBtn .v57i{color:#d9b0ff;display:grid}
 /* 이름: 하트 이름표 */
 #gameMenu #gmName.v57{border-radius:8px 18px 18px 8px;background:linear-gradient(90deg,#3a1630,#1c0f1c);border:1px solid #ff8fb066;color:#ffe1ec;padding:0 14px 0 6px}
 #gmName .v57i{width:24px;height:24px;border-radius:6px;display:grid;place-items:center;background:#ff8fb0;color:#3a0f22}
 /* 코인: 금화 */
 #gameMenu #gmCoins.v57{border-radius:999px;background:linear-gradient(180deg,#3a2a0c,#22180a);border:1px solid #f5b83a88;color:#ffe08a;padding:0 14px 0 6px;font-variant-numeric:tabular-nums}
 #gmCoins .v57i{display:grid;filter:drop-shadow(0 0 4px #f5b83a88)}
 /* 난이도: 색 점 4개 */
 #gameMenu #gmDiffChip.v57{border-radius:10px;background:#0b1519e6;border:1px solid #8ad0ff55;border-color:color-mix(in srgb,var(--dc,#8ad0ff) 40%,transparent);color:var(--dc,#8ad0ff);gap:9px}
 #gmDiffChip .v57pips{display:inline-flex;gap:3px}
 #gmDiffChip .v57pips i{width:6px;height:14px;border-radius:2px;background:#ffffff1f}
 #gmDiffChip .v57pips i.on{background:var(--pc);box-shadow:0 0 6px var(--pc)}
 /* 소리 · 전체화면: 아이콘 단추 */
 #gameMenu #gmSound.v57{width:36px;padding:0;justify-content:center;border-radius:50%;background:radial-gradient(circle at 35% 30%,#24414a,#111d22);border:1px solid #8ad0ff55;color:#bfe6ff}
 #gameMenu #gmSound.v57.off{color:#6d7f88;border-color:#ffffff1c;background:#10181c}
 #gameMenu #mbFs.v57{width:36px;padding:0;justify-content:center;border-radius:9px;background:linear-gradient(180deg,#1d2a2f,#121b1f);border:1px solid #ffffff26;color:#e8f2ee}
 #gameMenu .gmHud>.v57:hover{transform:translateY(-1px);filter:brightness(1.12)}
 /* 폰 세로: 글자를 줄이고 이름표·영상관은 아이콘 위주로 */
 @media (max-height:500px){#gameMenu .gmHud>.v57{height:30px!important;font-size:11px!important;gap:5px!important}#gameMenu #gmSound.v57,#gameMenu #mbFs.v57{width:30px!important;padding:0!important}#gameMenu #acctChip.v57{padding:0 9px 0 3px!important}#acctChip .v57av{width:22px;height:22px}}
 @media (max-width:560px){
  #gameMenu .gmHud>.v57{height:32px!important;padding:0 9px!important;font-size:11px!important;gap:5px!important}
  #gameMenu #acctChip.v57{padding:0 8px 0 3px!important}#acctChip .v57av{width:24px;height:24px;font-size:11px}#acctChip .v57nm{display:none}
  #gameMenu #rplBtn.v57 .v57t,#gmDiffChip .v57s{display:none}
  #gameMenu #gmSound.v57,#gameMenu #mbFs.v57{width:32px!important;padding:0!important}
  #gmName .v57i{width:20px;height:20px}#gmDiffChip .v57pips i{width:5px;height:11px}
 }
 /* 상점 탭 줄의 「✦ 스킨 · 무기 · 연출」 탭 */
 html body #shopModal.wsFull .shopTabs{grid-template-columns:repeat(4,1fr)!important;flex-wrap:nowrap!important}html body #shopModal.wsFull .shopTabs .shopTab{flex:1 1 0!important;padding-left:6px!important;padding-right:6px!important;min-width:0!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 #shopModal .shopTab.bbAddonTab{background:linear-gradient(180deg,#5a3a8a,#36225a)!important;color:#f3e8ff!important;border-color:#c8a0ff!important}
 #shopModal .shopTab.bbAddonTab:hover{filter:brightness(1.15)}
 #shopModal .bbAddonTab .bbS{display:none}@media (max-width:560px){#shopModal .bbAddonTab .bbL{display:none}#shopModal .bbAddonTab .bbS{display:inline}}
 /* ---------- ③ 보스팩·스킨 / 공허 검사 창 ---------- */
 #bbShop,#voidWardrobe{font-family:${FONT}!important;border-radius:14px!important;box-shadow:0 0 0 1px #ffffff14,0 24px 80px #000c!important}
 #bbShop button,#voidWardrobe button{font-family:${FONT}!important;font-weight:800!important;border-radius:10px!important;transition:border-color .15s,background .15s}
 #bbShop button:not(:disabled):hover{border-color:#a6f5c6!important;background:#1d4048!important}
 #voidWardrobe button:hover{border-color:#d8b8ff!important;background:#543c7a!important}`;
 let styleAdded=false;
 function addStyle(){/* 450의 메뉴 스타일보다 뒤에 붙여야 이김 */const st=document.createElement('style');st.id='v57Style';st.textContent=css;document.head.appendChild(st);styleAdded=true}

 /* 원래 글자를 읽어서 새 모양으로 그리기. 이미 그린 상태(.v57x 있음)면 건너뜀 */
 function paint(el,html,cls){if(!el)return;if(el.querySelector('.v57x'))return;el.classList.add('v57');if(cls)for(const [k,v] of Object.entries(cls))el.classList.toggle(k,v);el.innerHTML=html}
 function deco(){
  const ac=$('acctChip');if(ac&&!ac.querySelector('.v57x')){const t=ac.textContent||'',nmEl=ac.querySelector('.acN'),raw=(nmEl?nmEl.textContent:t.replace(/[👤☁✓…✕⚠]/g,'')).trim();
   const A=(window.ACCT55&&ACCT55.get())||{},inn=!!A.token,lost=/다시 로그인/.test(raw);
   const nm=inn?(/^G_[0-9a-f]{8,}$/i.test(raw)?'Google 계정':raw):(lost?'다시 로그인':'로그인');
   const st=/☁…/.test(t)?'up':/☁✕/.test(t)?'off':/⚠/.test(t)?'bad':'';
   paint(ac,'<span class="v57av v57x">'+esc(inn?(nm==='Google 계정'?'G':nm.slice(0,1).toUpperCase()):'?')+'</span><span class="v57nm">'+esc(nm)+'</span>'+(inn?'<span class="v57dot '+st+'"></span>':''),{out:!inn});
   ac.setAttribute('aria-label','계정 · '+nm)}
  const rp=$('rplBtn');paint(rp,'<span class="v57i v57x">'+SVG.film+'</span><span class="v57t">영상관</span>');if(rp)rp.setAttribute('aria-label','영상관');
  const nmc=$('gmName');if(nmc&&!nmc.querySelector('.v57x'))paint(nmc,'<span class="v57i v57x">'+SVG.heart+'</span><span>'+esc((nmc.textContent||'').replace(/^♥\s*/,''))+'</span>');
  const co=$('gmCoins');if(co&&!co.querySelector('.v57x'))paint(co,'<span class="v57i v57x">'+SVG.coin+'</span><span>'+esc(Number(String(co.textContent).replace(/[^\d]/g,'')||0).toLocaleString())+'</span>');
  const df=$('gmDiffChip');if(df&&!df.querySelector('.v57x')){const cur=DIFF.find(d=>d[0]===(typeof diff!=='undefined'?diff:'normal'))||DIFF[1],k=DIFF.indexOf(cur);
   df.style.color='';df.style.setProperty('--dc',cur[2]);
   paint(df,'<span class="v57s v57x">난이도</span><span>'+cur[1]+'</span><span class="v57pips">'+DIFF.map((d,i)=>'<i class="'+(i<=k?'on':'')+'" style="--pc:'+cur[2]+'"></i>').join('')+'</span>')}
  const sd=$('gmSound');if(sd&&!sd.querySelector('.v57x')){const on=!/OFF/i.test(sd.textContent||'');paint(sd,'<span class="v57x" style="display:grid">'+(on?SVG.sndOn:SVG.sndOff)+'</span>',{off:!on});sd.title=on?'소리 켜짐 (누르면 끄기)':'소리 꺼짐 (누르면 켜기)';sd.setAttribute('aria-label',sd.title)}
  const fs=$('mbFs');if(fs&&!fs.querySelector('.v57x')){const out=/창 모드/.test(fs.textContent||'');paint(fs,'<span class="v57x" style="display:grid">'+(out?SVG.fsOut:SVG.fsIn)+'</span>');fs.title=out?'창 모드로':'전체화면';fs.setAttribute('aria-label',fs.title)}
  /* 혹시 예전 메뉴 위 「보스팩 · 스킨」 단추가 남아 있으면 치움 */const old=$('bbShopButton');if(old)old.remove()}
 function battleBar(){const p=$('pauseBtn');if(p&&!p.querySelector('svg'))p.innerHTML=SVG.pause+' 일시정지';const f=$('fsBtn');if(f&&!f.querySelector('svg')){const out=/창 모드/.test(f.textContent||'');f.innerHTML=(out?SVG.fsOut:SVG.fsIn).replace(/width="17" height="17"/,'width="12" height="12"')+' '+(out?'창 모드':'전체화면')}}
 /* 원래 코드가 글자를 바꾸면 다시 그림 (메뉴 위쪽 줄과 전투 위쪽 줄만 감시) */
 let obs=null;function watch(){const h=document.querySelector('#gameMenu .gmHud');if(!h||h.__v57)return;h.__v57=1;obs=new MutationObserver(()=>{try{deco()}catch(e){}});obs.observe(h,{childList:true,subtree:true,characterData:true})}
 const bar=document.querySelector('.bar');if(bar)new MutationObserver(()=>{try{battleBar()}catch(e){}}).observe(bar,{childList:true,subtree:true,characterData:true});
 {const _gb=gmBuild;gmBuild=function(){const r=_gb.apply(this,arguments);try{if(!styleAdded)addStyle();watch();deco()}catch(e){}return r}}
 {const _gs=gmShow;gmShow=function(){const r=_gs.apply(this,arguments);try{if(!styleAdded)addStyle();watch();deco()}catch(e){}return r}}
 setTimeout(()=>{try{if(!styleAdded)addStyle();watch();deco();battleBar()}catch(e){}},900);
}catch(e){console.error('v57 hud',e)}})();
