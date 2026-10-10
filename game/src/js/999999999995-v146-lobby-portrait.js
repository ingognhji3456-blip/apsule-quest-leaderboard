/* v146: 폰 세로 로비 새 배치 (LP146) — 사용자가 보내 준 그림대로
   - 맨 위: 로고 · ☰
   - 둘째 줄: 프로필 카드(이름 · 레벨 · 경험치 막대, 누르면 계정 창) · 🪙 코인 · 💎 다이아
   - 가운데: 무대(광장 무대를 보여 줌)
   - 「내 순위」 줄(누르면 랭킹)
   - 아이콘은 이모지 대신 이 파일의 도트 그림(SPR, 글자 격자 → 작은 그림)
   - 큰 카드 4개(2×2): 탑 오르기 · 보스 러시 · 상점 · 명예의 전당 (작은 글자는 진행도)
   - 큰 초록 단추 「광장 입장」
   - 맨 아래 작은 단추 4개: 친구 · 채팅 · 설정 · 조작법 (친구 · 채팅 알림 숫자도 옮겨 보임)
   원래 단추(#phNav · #phPlay · #gmFr · #gmChat · #acctChip · #gmLv · #rkLob)는 지우지 않고 숨긴 채 .click()으로 대신 누른다. */
(function(){try{
 const L='html.lpP #gameMenu.lvOn';
 /* v147: 패드(dvPad)도 같은 로비 — lp(폰 또는 패드) · lpL/lpP(가로/세로) · lpPad(패드) */
 const RT=document.documentElement;function lpCls(){const ph=RT.classList.contains('ph'),pad=RT.classList.contains('dvPad')&&!ph,on=ph||pad,land=ph?RT.classList.contains('phL'):innerWidth>innerHeight;
  RT.classList.toggle('lp',on);RT.classList.toggle('lpL',on&&land);RT.classList.toggle('lpP',on&&!land);RT.classList.toggle('lpPad',pad)}
 lpCls();addEventListener('resize',()=>setTimeout(lpCls,60));
 const st=document.createElement('style');st.id='lp146css';st.textContent=`
 ${L} .gmTop{display:flex!important;flex-direction:row!important;flex-wrap:wrap!important;align-items:center!important;height:auto!important;padding:8px 10px 0 12px!important;box-sizing:border-box;row-gap:8px!important}
 ${L} .gmLogo{flex:1 1 auto!important;width:auto!important;zoom:.8}
 ${L} .gmHud{flex:1 1 100%!important;width:100%!important;justify-content:flex-end!important;gap:6px!important;margin:0!important}
 ${L} .gmHud>#gmFr,${L} .gmHud>#gmChat,${L} .gmHud>#acctChip,${L} .gmHud>#gmLv{display:none!important}
 ${L} .gmHud>#gmMore{position:absolute!important;top:8px;right:10px;flex:none!important;width:36px!important;height:36px!important}
 ${L} .gmHud>#gmCoins,${L} .gmHud>#gmDia{flex:0 0 auto!important;min-width:0!important;height:34px!important;border-radius:999px!important;padding:0 8px 0 9px!important;font-size:12px!important}
 ${L} .gmHud>#gmCoins::after,${L} .gmHud>#gmDia::after{content:'+';display:inline-grid;place-items:center;width:16px;height:16px;margin-left:5px;border-radius:50%;background:#ffffff1c;color:#fff;font-size:12px;font-weight:900;line-height:1}
 ${L} .gmHud>#pf146{display:flex}
 #pf146{display:none;flex:1 1 auto;min-width:0;align-items:center;gap:8px;height:42px;padding:0 10px 0 4px;border-radius:12px;cursor:pointer;
  background:linear-gradient(180deg,#14202c,#0b131b);border:1px solid #7fd8ff33;box-shadow:inset 0 1px 0 #ffffff10;color:#e8f4ef;font:inherit;text-align:left}
 #pf146 .av{position:relative;flex:none;width:34px;height:34px;border-radius:9px;display:grid;place-items:center;font-weight:900;font-size:15px;color:#05121a;background:linear-gradient(135deg,#9ff3ff,#3fa8d8);box-shadow:0 0 10px #3fd3ff55}
 #pf146 .av i{position:absolute;right:-2px;bottom:-2px;width:9px;height:9px;border-radius:50%;background:#556;border:2px solid #0b131b}
 #pf146 .av i.on{background:#3ad16a}
 #pf146 .tx{flex:1;min-width:0;display:flex;flex-direction:column;gap:4px}
 #pf146 .r1{display:flex;align-items:baseline;gap:6px;white-space:nowrap}
 #pf146 .r1 b{font-size:13px;overflow:hidden;text-overflow:ellipsis}
 #pf146 .r1 small{font-size:10px;font-weight:900;color:#ffd36a}
 #pf146 .bar{height:4px;border-radius:3px;background:#ffffff18;overflow:hidden}
 #pf146 .bar u{display:block;height:100%;background:linear-gradient(90deg,#3fd3ff,#7dffa8);border-radius:3px}
 html.lp #rkLob,html.lp #gameMenu #gmMain.lvFull>#phNav#phNav#phNav,html.lp #gameMenu #gmMain.lvFull>#phPlay#phPlay#phPlay{display:none!important}
 html.lpP #lvCv{top:0!important;bottom:auto!important;height:100%!important}
 html.lpP #gmMain.lvFull>#lvDock{top:auto!important;bottom:calc(var(--lp146h,330px) - 4px)!important}
 #lp146{display:none}
 html.lp #gameMenu #gmMain.lvFull>#lp146#lp146#lp146{display:flex!important}
 #lp146{position:absolute;left:12px;right:12px;bottom:calc(10px + env(safe-area-inset-bottom));z-index:7;flex-direction:column;gap:8px;pointer-events:auto}
 #lp146 button{font:inherit;cursor:pointer;pointer-events:auto;-webkit-tap-highlight-color:transparent}
 #lp146 button:active{transform:translateY(2px)}
 #lp146 .rk{--c:#ffc04a;display:flex;align-items:center;gap:8px;height:36px;padding:0 12px;border-radius:12px;color:#ffe2a0;font-size:12px;font-weight:900;text-align:left;
  background:linear-gradient(90deg,color-mix(in srgb,var(--c) 22%,#0c1219),#080c12cc);border:1.5px solid color-mix(in srgb,var(--c) 60%,transparent);box-shadow:0 0 10px color-mix(in srgb,var(--c) 22%,transparent),inset 0 1px 0 #ffffff14}
 #lp146 .rk .rl{display:none}
 #lp146 .rk b{color:#ffc04a;font-size:14px}
 #lp146 .rk span{flex:1}
 #lp146 .rk em,#lp146 .bt em.go{font-style:normal;opacity:.7;font-size:16px}
 #lp146 .gd{display:grid;grid-template-columns:1fr 1fr;gap:8px}
 #lp146 .cd{position:relative;display:flex;align-items:center;gap:10px;height:76px;padding:0 10px;border-radius:14px;overflow:hidden;text-align:left;color:#fff;
  background:radial-gradient(ellipse at 20% 50%,color-mix(in srgb,var(--c) 30%,transparent),transparent 70%),linear-gradient(160deg,color-mix(in srgb,var(--c) 22%,#0c1219),#080c12);
  border:1.5px solid color-mix(in srgb,var(--c) 75%,transparent);box-shadow:0 0 14px color-mix(in srgb,var(--c) 30%,transparent),inset 0 1px 0 #ffffff18}
 #lp146 .sp{display:inline-block;flex:none;background:var(--x) center/contain no-repeat;image-rendering:pixelated;image-rendering:crisp-edges}
 #lp146 .cd i{width:40px;height:40px;filter:drop-shadow(0 0 7px var(--c)) drop-shadow(0 2px 0 #000a)}
 #lp146 .cd .dc{position:absolute;right:16px;bottom:-8px;width:64px;height:64px;opacity:.16;filter:saturate(.6);pointer-events:none;background:var(--x) center bottom/contain no-repeat;image-rendering:pixelated}
 #lp146 .cd span{z-index:1}
 #lp146 .cd span{display:flex;flex-direction:column;gap:6px;min-width:0}
 #lp146 .cd b{font-size:14px;font-weight:900;white-space:nowrap;text-shadow:0 1px 0 #000}
 #lp146 .cd em{align-self:flex-start;font-style:normal;font-size:10.5px;font-weight:900;padding:2px 9px;border-radius:999px;color:var(--c);background:#000a;border:1px solid color-mix(in srgb,var(--c) 60%,transparent);white-space:nowrap}
 #lp146 .cd em:empty{display:none}
 #lp146 .cd em .sp{width:10px;height:10px;margin-right:4px;vertical-align:-1px}
 #lp146 .cd::after{content:'›';position:absolute;right:9px;top:50%;transform:translateY(-50%);font-size:20px;color:color-mix(in srgb,var(--c) 70%,#fff);opacity:.6}
 #lp146 .pl{display:flex;align-items:center;justify-content:center;gap:10px;height:56px;border-radius:14px;position:relative;color:#05261a;font-size:20px;font-weight:900;letter-spacing:.04em;
  background:linear-gradient(180deg,#c9ffe3,#7df0b8 50%,#3fcf8e);border:2px solid #e6fff2;box-shadow:0 0 18px #5dffb066,inset 0 -3px 0 #2a9c68}
 #lp146 .pl i{width:30px;height:24px}
 #lp146 .pl::before{content:'';position:absolute;inset:3px;border-radius:11px;border:1px solid #ffffff88;pointer-events:none}
 #lp146 .pl em{position:absolute;right:16px;font-style:normal;font-size:22px;opacity:.7}
 #lp146 .bt{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}
 #lp146 .bt button{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;height:52px;border-radius:12px;color:#fff;font-size:11.5px;font-weight:900;white-space:nowrap;
  background:radial-gradient(ellipse at 50% 30%,color-mix(in srgb,var(--c) 28%,transparent),transparent 70%),linear-gradient(160deg,color-mix(in srgb,var(--c) 18%,#0c1219),#080c12);
  border:1.5px solid color-mix(in srgb,var(--c) 70%,transparent);box-shadow:0 0 10px color-mix(in srgb,var(--c) 25%,transparent),inset 0 1px 0 #ffffff18;text-shadow:0 1px 0 #000}
 #lp146 .bt i{width:22px;height:20px;filter:drop-shadow(0 0 5px var(--c))}
 #lp146 .rk b{width:18px;height:18px}
 #lp146 .bt em{position:absolute;top:-6px;right:-3px;font-style:normal;font-size:9px;font-weight:900;padding:1px 5px;border-radius:999px;background:#ff5a6a;color:#fff}
 #lp146 .bt em:empty{display:none}
 @media (max-width:385px){#lp146 .bt{gap:5px}#lp146 .bt button{font-size:11px;gap:3px;white-space:nowrap}#lp146 .bt i{width:18px;height:16px}#lp146 .cd b{font-size:13px}#lp146 .cd i{width:32px;height:32px}#lp146 .cd{gap:7px}}
 @media (max-height:700px){#lp146 .cd{height:62px}#lp146 .cd i{width:34px;height:34px}#lp146 .cd span{gap:4px}#lp146 .pl{height:48px;font-size:18px}#lp146 .bt button{height:46px}#lp146{gap:6px}}
 html.lpP #egCoin{bottom:calc(70px + env(safe-area-inset-bottom))!important}
 /* ── 가로 ── 왼쪽 카드 4개 · 가운데 무대 · 오른쪽 랭킹 + 광장 입장 + 작은 단추 */
 html.lpL #gameMenu.lvOn .gmTop{transform:none!important}
 html.lpL #gameMenu.lvOn .gmHud{transform:none!important;gap:6px!important;align-items:center!important}
 html.lpL #gameMenu.lvOn .gmHud>#gmFr,html.lpL #gameMenu.lvOn .gmHud>#gmChat,html.lpL #gameMenu.lvOn .gmHud>#acctChip,html.lpL #gameMenu.lvOn .gmHud>#gmLv{display:none!important}
 html.lpL #gameMenu.lvOn .gmHud>#pf146{display:flex;flex:0 1 210px;height:36px;margin-right:auto}
 html.lpL #gameMenu.lvOn .gmHud>#pf146 .av{width:28px;height:28px;font-size:13px}
 html.lpL #gameMenu.lvOn .gmHud>#gmCoins,html.lpL #gameMenu.lvOn .gmHud>#gmDia{flex:0 0 auto!important;min-width:0!important;height:32px!important;border-radius:999px!important;padding:0 7px 0 9px!important;font-size:12px!important}
 html.lpL #gameMenu.lvOn .gmHud>#gmCoins::after,html.lpL #gameMenu.lvOn .gmHud>#gmDia::after{content:'+';display:inline-grid;place-items:center;width:15px;height:15px;margin-left:5px;border-radius:50%;background:#ffffff1c;color:#fff;font-size:11px;font-weight:900;line-height:1}
 html.lpL #gameMenu.lvOn .gmHud>#gmMore{flex:0 0 32px!important;width:32px!important;height:32px!important}
 html.lpL #lvCv{top:0!important;height:100%!important}
 html.lpL #lp146{position:fixed;top:calc(52px + 2px);bottom:max(8px,env(safe-area-inset-bottom));left:max(10px,env(safe-area-inset-left));right:max(10px,env(safe-area-inset-right));
  display:grid!important;grid-template-columns:minmax(150px,25%) 1fr minmax(180px,27%);grid-template-rows:1fr auto auto;gap:7px;pointer-events:none}
 html.lpL #gameMenu #gmMain.lvFull>#lp146#lp146#lp146{display:grid!important}
 html.lpPad #gmMain.lvFull #lvSet#lvSet{display:none!important}
 html.lpPad #gmMain.lvFull #lvDock#lvDock{visibility:hidden!important}
 /* 패드 가로: 720 lvDraw가 무대를 오른쪽(62%)에 두므로 그림판을 넓혀 왼쪽으로 밀어 가운데에 오게 */
 html.lpPad.lpL #lvCv{width:125%!important;left:-27.5%!important;right:auto!important}
 html.lpL #lp146>*{pointer-events:auto}
 html.lpL #lp146 .gd{grid-column:1;grid-row:1/4;grid-template-columns:1fr;grid-auto-rows:1fr;gap:6px;min-height:0}
 html.lpL #lp146 .cd{height:auto;min-height:0;padding:0 8px;gap:8px}
 html.lpL #lp146 .cd i{width:30px;height:30px}
 html.lpL #lp146 .cd .dc{width:50px;height:50px;right:20px}
 html.lpL #lp146 .cd span{gap:3px}
 html.lpL #lp146 .cd b{font-size:13px}
 html.lpL #lp146 .cd em{font-size:9.5px;padding:1px 7px}
 html.lpL #lp146 .rk{grid-column:3;grid-row:1;height:auto;min-height:0;flex-direction:column;align-items:stretch;gap:4px;padding:7px 9px;overflow:hidden}
 html.lpL #lp146 .rk::before{content:'RANKING';font-size:11px;letter-spacing:.12em;color:#ffc04a;padding-left:20px;line-height:16px;background:var(--sp-trophy) left center/14px 14px no-repeat;image-rendering:pixelated}
 html.lpL #lp146 .rk>b{display:none}
 html.lpL #lp146 .rk .rl{display:flex;flex-direction:column;gap:3px;min-height:0;overflow:hidden}
 html.lpL #lp146 .rk .rl .rlRow{display:grid;grid-template-columns:20px minmax(0,1fr) auto;align-items:center;gap:5px;padding:2px 6px;border-radius:7px;background:#0d151c;border:1px solid #ffffff10;font-size:11px;color:#e8f4ef}
 html.lpL #lp146 .rk .rl .rlRow i{font-style:normal;font-size:12px}
 html.lpL #lp146 .rk .rl .rlRow span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
 html.lpL #lp146 .rk .rl .rlRow b{color:#a6f5c6;font-size:10.5px}
 html.lpL #lp146 .rk .rl .rlRow.r1{background:linear-gradient(90deg,#4a3a10,#0d151c);border-color:#ffd16666}
 html.lpL #lp146 .rk .rl .rlNote{font-size:10.5px;color:#8aa0a8;font-weight:700}
 html.lpL #lp146 .rk>span{order:3;font-size:11px;color:#ffe2a0}
 html.lpL #lp146 .rk>em{position:absolute;right:10px;top:6px;font-size:14px}
 html.lpL #lp146 .pl{grid-column:3;grid-row:2;height:48px;font-size:18px}
 html.lpL #lp146 .bt{grid-column:3;grid-row:3;gap:5px;grid-template-columns:repeat(4,minmax(0,1fr))}
 html.lpL #lp146 .rk>span.no{display:none}
 html.lpL #lp146 .bt button{height:44px;font-size:10px;gap:2px;min-width:0}
 html.lpL #lp146 .bt i{width:18px;height:16px}
 /* ── 패드: 같은 배치를 크게 ── */
 html.lpPad.lpL #lp146{top:94px;bottom:max(16px,env(safe-area-inset-bottom));left:max(18px,env(safe-area-inset-left));right:max(18px,env(safe-area-inset-right));grid-template-columns:minmax(220px,25%) 1fr minmax(250px,27%);gap:12px}
 html.lpPad.lpL #lp146 .gd{gap:12px}
 html.lpPad #lp146 .cd{padding:0 16px;gap:14px;border-radius:18px;border-width:2px}
 html.lpPad #lp146 .cd i{width:56px;height:56px}
 html.lpPad #lp146 .cd .dc{width:96px;height:96px;right:28px}
 html.lpPad #lp146 .cd b{font-size:19px}
 html.lpPad #lp146 .cd em{font-size:13px;padding:3px 12px}
 html.lpPad #lp146 .cd em .sp{width:13px;height:13px}
 html.lpPad #lp146 .cd::after{font-size:28px;right:14px}
 html.lpPad #lp146 .rk{padding:12px 14px;border-radius:16px;font-size:14px}
 html.lpPad #lp146 .rk::before{font-size:14px;padding-left:26px;background-size:18px 18px;line-height:20px}
 html.lpPad #lp146 .rk .rl{gap:6px}
 html.lpPad #lp146 .rk .rl .rlRow{font-size:14px;padding:6px 10px;border-radius:10px;grid-template-columns:26px 1fr auto}
 html.lpPad #lp146 .rk .rl .rlRow i{font-size:16px}
 html.lpPad #lp146 .rk .rl .rlRow b{font-size:13px}
 html.lpPad #lp146 .rk>span{font-size:14px}
 html.lpPad #lp146 .pl{height:76px;font-size:26px;border-radius:18px}
 html.lpPad #lp146 .pl i{width:42px;height:32px}
 html.lpPad #lp146 .bt{grid-template-columns:1fr 1fr!important;gap:10px}
 html.lpPad #lp146 .bt button{height:62px;flex-direction:row;gap:10px;font-size:16px;border-radius:14px}
 html.lpPad #lp146 .bt button::after{content:'›';opacity:.6;font-size:20px;margin-left:4px}
 html.lpPad #lp146 .bt i{width:30px;height:26px}
 html.lpPad.lpP #lp146{left:24px;right:24px;bottom:calc(20px + env(safe-area-inset-bottom));gap:12px}
 html.lpPad.lpP #lp146 .gd{gap:12px}
 html.lpPad.lpP #lp146 .cd{height:104px}
 html.lpPad.lpP #lp146 .rk{height:52px;flex-direction:row}
 html.lpPad.lpP #lp146 .bt{grid-template-columns:repeat(4,1fr)!important}
 html.lpPad #gameMenu.lvOn .gmHud>#pf146{flex:0 1 300px;height:50px}
 html.lp #gameMenu.lvOn .gmFoot{display:none!important}
 html.lpPad.lpL #gameMenu.lvOn .gmTop{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;align-items:center!important;height:76px!important;padding:12px max(18px,env(safe-area-inset-right)) 0 max(18px,env(safe-area-inset-left))!important;box-sizing:border-box}
 html.lpPad.lpL #gameMenu.lvOn .gmLogo{flex:0 0 auto!important;width:auto!important}
 html.lpPad.lpL #gameMenu.lvOn .gmHud{flex:1 1 auto!important;flex-wrap:nowrap!important;justify-content:flex-end!important;gap:10px!important;margin:0 0 0 24px!important;width:auto!important}
 html.lpPad.lpL #gameMenu.lvOn .gmHud>#pf146{margin-right:auto;flex:0 1 320px}
 html.lpPad.lpP #gmMain.lvFull>#lvDock#lvDock{bottom:calc(var(--lp146h,330px) - 150px)!important}
 html.lpPad #gameMenu.lvOn .gmHud>#pf146 .av{width:38px;height:38px;font-size:17px}
 html.lpPad #pf146 .r1 b{font-size:16px}html.lpPad #pf146 .r1 small{font-size:12px}html.lpPad #pf146 .bar{height:6px}
 html.lpPad #gameMenu.lvOn .gmHud>#gmCoins,html.lpPad #gameMenu.lvOn .gmHud>#gmDia{height:42px!important;font-size:16px!important;padding:0 10px 0 14px!important}
 html.lpPad #gameMenu.lvOn .gmHud>#gmMore{flex:0 0 44px!important;width:44px!important;height:44px!important}
 @media (max-height:340px){html.lpL #lp146 .pl{height:40px;font-size:16px}html.lpL #lp146 .bt button{height:38px}html.lpL #lp146 .bt i{width:16px;height:14px}html.lpL #lp146 .cd i{width:24px;height:24px}}`;
 document.head.appendChild(st);
 const go=i=>{if(i===0){const p=document.getElementById('phPlay');if(p)return p.click()}const b=document.querySelector('#phNav button[data-i="'+i+'"]');if(b)b.click()};
 const byId=id=>{const b=document.getElementById(id);if(b)b.click()};
 const sfx=()=>{try{window.gmSfx&&gmSfx('ok')}catch(_){}};

 /* 도트 아이콘: 글자 하나 = 칸 하나, 글자별 색은 p. 처음 한 번 작은 그림(data URL)으로 만들어 --sp-이름 에 넣는다 */
 const SPR={
  tower:{p:{O:'#06222e',A:'#ffffff',L:'#a8f2ff',B:'#3fd3ff',C:'#1678a0',W:'#fff3a0'},g:[
   '.....OO.....','.....AA.....','.....BB.....','....OLLO....','....OBCO....','...OLLLLO...','...OBWBCO...','...OBBBCO...','..OLLLLLLO..','..OBWBWBCO..',
   '..OBBBBBCO..','..OBWBWBCO..','.OLLLLLLLLO.','.OBWBWBWBCO.','.OBBBBBBBCO.','.OBWBWBWBCO.','.OBBBBBBBCO.','OOOOOOOOOOOO']},
  demon:{p:{O:'#2a0508',R:'#ff4a5a',D:'#a01828',L:'#ffb4a8',E:'#ffe066',K:'#2a0508',T:'#fff0e0',H:'#ffd2a0'},g:[
   'H..............H','HH............HH','.HH..OOOOOO..HH.','.HHOORRRRRROOHH.','..ORRLRRRRRRDO..','..ORLRRRRRRRDO..','.ORREEERRREEEDO.','.ORREKERRREKEDO.',
   '.ORRRRRRRRRRRDO.','..ORRRRDDRRRDO..','..ODRRRRRRRDDO..','...OTOTOTOTOO...','...OTTTTTTTTO...','....OOOOOOOO....']},
  shop:{p:{O:'#3a2200',Y:'#ffc04a',W:'#fff3d0',B:'#c8803a',D:'#6a3c10',K:'#2a1a08',G:'#7dffa8',P:'#ff7aa8',C:'#ffe066'},g:[
   '.OOOOOOOOOOOOOO.','OYYWWYYWWYYWWYYO','OYYWWYYWWYYWWYYO','OOYYOOWWOOYYOOWO','.OKKKKKKKKKKKKO.','.OBKKKKKKKKKKBO.','.OBKGKPKKCKGKBO.','.OBGGGPPKCCGPBO.',
   '.OOOOOOOOOOOOOO.','.ODDDDDDDDDDDDO.','.ODBBBBBBBBBBDO.','.ODBBBBBBBBBBDO.','.ODDDDDDDDDDDDO.','.OOOOOOOOOOOOOO.']},
  star:{p:{O:'#2a0a4a',P:'#c89bff',M:'#9a5cff',D:'#5a2aa8',L:'#f4e8ff'},g:[
   '.......OO.......','......OLPO......','......OLPO......','.....OLPPMO.....','OOOOOOLPPMOOOOOO','OLLPPPPPPPPMMMDO','.OPPPPPPPPPPMDO.','..OPPPPPPPPMDO..',
   '...OPPPPPPMDO...','...OPPPMMMMDO...','..OPPMDOODMMDO..','..OPMDO..ODMDO..','.OPMDO....ODMDO.','.OMDO......ODDO.','.OOO........OOO.']},
  crowd:{p:{A:'#0b3d28',B:'#1f7050'},g:[
   '....BBB...AAA...','...BBBBB.AAAAA..','...BBBBB.AAAAA..','...BBBBB.AAAAA..','....BBB...AAA...','................','..BBBBBB.AAAAAA.','.BBBBBBAAAAAAAAA',
   '.BBBBBBAAAAAAAAA','.BBBBBBAAAAAAAAA']},
  friends:{p:{A:'#8fe0ff',B:'#3a9ad0',L:'#e8fbff'},g:[
   '....BBB...AAA...','...BBBBB.ALAAA..','...BBBBB.AAAAA..','...BBBBB.AAAAA..','....BBB...AAA...','................','..BBBBBB.AAAAAA.','.BBBBBBALAAAAAAA',
   '.BBBBBBAAAAAAAAA','.BBBBBBAAAAAAAAA']},
  chat:{p:{O:'#3a2600',Y:'#ffc04a',L:'#fff0b8',D:'#c08020',K:'#3a2600'},g:[
   '..OOOOOOOOOO..','.OLLYYYYYYYYO.','OLYYYYYYYYYYDO','OYYKKYKKYKKYDO','OYYKKYKKYKKYDO','OYYYYYYYYYYYDO','.OYYYYYYYYYDO.','..OOOYYOOOOO..','....OYO.......','....OO........']},
  gear:{p:{O:'#102030',G:'#9fc3dc',L:'#e0f2ff',D:'#4a6a80'},g:[
   '.....OOOO.....','..OO.OGGO.OO..','.OGGOOGGOOGGO.','.OGLGGGGGGGDO.','..OGGGOOGGDO..','OOOGGO..OGDOOO','OGLGO....OGGDO','OGGGO....OGDDO',
   'OOOGGO..OGDOOO','..OGGGOOGDDO..','.OGGDDDDDDDDO.','.OGDOODDOODDO.','..OO.ODDO.OO..','.....OOOO.....']},
  pad:{p:{O:'#1a0a30',P:'#b88cff',L:'#ead8ff',D:'#6a3cb0',R:'#ff7aa8',C:'#7dffa8',K:'#1a0a30'},g:[
   '..OOOOOOOOOOOO..','.OLLPPPPPPPPPPO.','OLPPKPPPPPPPRPDO','OPPKKKPPPPPCPRDO','OPPPKPPPPPPPRPDO','OPPPPPPOOPPPPPDO','OPPPPPOO..OOPPDO','OPPDDO......ODDO','.ODDO........OO.']},
  coin:{p:{O:'#3a2600',Y:'#ffc04a',L:'#fff3b0',D:'#b07a1a'},g:['..OOOO..','.OYYYYO.','OYLYYYDO','OYLYYYDO','OYYYYYDO','OYYYYDDO','.ODDDDO.','..OOOO..']},
  trophy:{p:{O:'#3a2600',Y:'#ffc04a',L:'#fff0a0',D:'#b07a1a'},g:[
   'OOOOOOOOOOOOOO','OYOLLYYYYYDOYO','OYOLYYYYYYDOYO','.OOLYYYYYYDOO.','...OYYYYYYDO..','....OYYYYDO...','.....OYYDO....','......OYO.....','.....OYYDO....','....OOOOOOO...','....OLYYYDO...','....OOOOOOO...']}};
 (function(){const root=document.documentElement;for(const k in SPR){try{const s=SPR[k],w=Math.max(...s.g.map(r=>r.length)),h=s.g.length,c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');
   s.g.forEach((r,y)=>{for(let i=0;i<r.length;i++){const col=s.p[r[i]];if(col){x.fillStyle=col;x.fillRect(i,y,1,1)}}});root.style.setProperty('--sp-'+k,'url("'+c.toDataURL()+'")')}catch(e){}}})();
 const sp=(k,cls)=>'<i class="sp'+(cls?' '+cls:'')+'" style="--x:var(--sp-'+k+')"></i>';
 const CARDS=[[0,'tower','탑 오르기','#3fd3ff'],[1,'demon','보스 러시','#ff4a5a'],[2,'shop','상점','#ffc04a'],[3,'star','명예의 전당','#b07dff']];
 const BTNS=[['friends','친구',()=>byId('gmFr'),'gmFr','#5ec8ff'],['chat','채팅',()=>byId('gmChat'),'gmChat','#ffc04a'],['gear','설정',()=>go(4),0,'#8fb3cc'],['pad','조작법',()=>go(5),0,'#b07dff']];
 function mount(){const h=document.querySelector('#gameMenu .gmHud');if(h&&!document.getElementById('pf146')){const p=document.createElement('button');p.id='pf146';
   p.innerHTML='<span class="av">?<i></i></span><span class="tx"><span class="r1"><b>로그인</b><small>Lv.1</small></span><span class="bar"><u style="width:0"></u></span></span>';
   p.addEventListener('click',e=>{e.stopPropagation();sfx();byId('acctChip')});h.insertBefore(p,h.firstChild)}
  const m=document.getElementById('gmMain');if(!m||document.getElementById('lp146'))return;
  const w=document.createElement('div');w.id='lp146';
  w.innerHTML='<button class="rk"><b class="sp" style="--x:var(--sp-trophy)"></b><span>내 순위</span><div class="rl"></div><em>›</em></button>'+
   '<div class="gd">'+CARDS.map(([i,ic,n,c])=>'<button class="cd" data-i="'+i+'" style="--c:'+c+'">'+sp(ic)+'<i class="dc" style="--x:var(--sp-'+ic+')"></i><span><b>'+n+'</b><em></em></span></button>').join('')+'</div>'+
   '<button class="pl">'+sp('crowd')+'광장 입장<em>›</em></button>'+
   '<div class="bt">'+BTNS.map(([ic,n,f,id,c],k)=>'<button data-k="'+k+'" style="--c:'+c+'">'+sp(ic)+n+'<em></em></button>').join('')+'</div>';
  w.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;e.stopPropagation();sfx();
   if(b.classList.contains('rk')){try{RANK83.open('score')}catch(_){}}
   else if(b.classList.contains('cd'))go(+b.dataset.i);
   else if(b.classList.contains('pl'))go(6);
   else if(b.dataset.k!=null)BTNS[+b.dataset.k][2]()});
  m.appendChild(w)}
 const need=lv=>Math.round(40*Math.pow(lv,1.6)+60);
 function upd(){lpCls();const root=document.documentElement;if(!root.classList.contains('lp'))return;const port=root.classList.contains('lpP');
  /* 프로필 */
  const p=document.getElementById('pf146');if(p){let a={};try{a=ACCT55.get()||{}}catch(_){}const o=(window.saveData&&saveData.lv83)||{lv:1,xp:0};
   const nm=a.token?(a.user||saveData.name||'플레이어'):'로그인',lv=Math.max(1,o.lv|0),q=Math.min(1,(o.xp|0)/need(lv));
   const k=nm+'|'+lv+'|'+Math.round(q*100)+'|'+(a.token?1:0);if(p.dataset.k!==k){p.dataset.k=k;
    p.querySelector('.av').firstChild.textContent=a.token?String(nm).replace(/^G_/,'').charAt(0).toUpperCase():'?';p.querySelector('.av i').className=a.token?'on':'';
    p.querySelector('.r1 b').textContent=nm;p.querySelector('.r1 small').textContent='Lv.'+lv;p.querySelector('.bar u').style.width=Math.round(q*100)+'%'}}
  const w=document.getElementById('lp146');if(!w)return;
  /* 카드 작은 글자 = 원래 단추의 것 */
  w.querySelectorAll('.cd').forEach(c=>{const i=+c.dataset.i,s=document.querySelector('#lvSet .lvI[data-i="'+i+'"] em'),t0=s?s.textContent.trim():'',e=c.querySelector('em');if(e.dataset.t===t0)return;e.dataset.t=t0;
   /* 이모지는 빼고, 코인은 도트 코인으로 */const coin=/\u{1FA99}/u.test(t0),t=t0.replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}]\uFE0F?/gu,'').trim();e.innerHTML=(coin?sp('coin'):'')+t.replace(/[&<>]/g,'')});
  /* 친구 · 채팅 알림 */
  BTNS.forEach((x,k)=>{if(!x[3])return;const s=document.querySelector('#'+x[3]+' em'),d=w.querySelector('.bt button[data-k="'+k+'"] em');if(!d)return;const v=s&&getComputedStyle(s).display!=='none'?s.textContent.trim():'';if(d.textContent!==v)d.textContent=v});
  /* 내 순위 */
  const mi=document.querySelector('#rkLob .rlMine'),rt=mi?mi.textContent:'',mt=rt.match(/(\d+)\s*위/)||rt.match(/#\s*(\d+)/),rs=w.querySelector('.rk span'),tx=mt?'내 순위  #'+mt[1]:'랭킹 보기';if(rs.textContent!==tx)rs.textContent=tx;rs.classList.toggle('no',!mt);
  /* 가로: 랭킹 위 3명 */
  if(!port){const src=document.querySelector('#rkLob .rlList'),dst=w.querySelector('.rk .rl'),h=src?src.innerHTML:'';if(dst&&dst.dataset.h!==h){dst.dataset.h=h;dst.innerHTML=h||'<div class="rlNote">랭킹 불러오는 중…</div>'}}
  /* 무대 바닥 = 아래 단추 묶음 바로 위(720 lvDraw는 세로 화면에서 #lvDock 위치에 무대를 맞춤) */
  if(port){const hf=Math.round(w.getBoundingClientRect().height)+Math.round(innerHeight-w.getBoundingClientRect().bottom);if(hf>40&&root.style.getPropertyValue('--lp146h')!==hf+'px')root.style.setProperty('--lp146h',hf+'px')}
  /* 무대는 광장을 보여 줌(큰 단추가 「광장 입장」) */
  try{const on=document.querySelector('#gmMain.on.lvFull');if(on&&typeof GM!=='undefined'&&GM.sel!==6&&!['shopModal','bbShop'].some(id=>{const e=document.getElementById(id);return e&&!e.hidden&&getComputedStyle(e).display!=='none'})&&!(typeof LV!=='undefined'&&LV.enter)){GM.sel=6;try{gmMainSel()}catch(_){}}}catch(_){}}
 setInterval(()=>{try{mount();upd()}catch(e){}},400);
 window.LP146={v:1,mount,upd};
}catch(e){console.warn('v146',e)}})();
