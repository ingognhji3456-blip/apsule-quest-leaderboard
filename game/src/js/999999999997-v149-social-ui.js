/* v149: 폰 · 패드 친구 · 랭킹 · 채팅 창 새 디자인 (SO149) — 사용자가 보내 준 그림을 참고
   - 친구(#fr94): 가로는 왼쪽 「친구 목록」 · 오른쪽 「친구 추가 + 친구 추천」 두 칸. 세로는 위에서부터 이름 입력 → 목록 → 추천.
     접속 중인 친구는 세로에서 [채팅 · 결투 · 듀오] 단추 줄이 펼쳐지고, 친구 삭제는 「⋯」 안으로.
   - 랭킹(#rk102): 세로는 1위 큰 카드 → 2 · 3위 나란히 → 4위부터 목록. 가로는 왼쪽 시상대 · 오른쪽 목록.
   - 채팅(#ch103): 가로는 제목 옆에 탭, 친구 대화는 왼쪽 친구 목록 · 오른쪽 안내. 친구 줄에 얼굴 칸 · › 표시.
   - 창 안의 이모지(👥 💬 ⚔ 🤝 👁 🕓 ✨ 🌐 🏆 ⚡ ⭐ 🏰 🪙 👑 🥇 🥈 🥉 🎮 🧍 🐾)는 도트 그림으로 바꾼다(대화 내용 · 이름은 그대로).
   원래 창 코드는 그대로 두고, 그려진 뒤에 자리 · 모양만 바꾼다(MutationObserver). */
(function(){try{
 const RT=document.documentElement;
 /* ── 도트 그림 (LP146과 같은 방식: 글자 격자 → --sp-이름) ── */
 const medal=(C,L,D)=>({p:{R:'#d0405a',O:'#2a1a10',C,L,D},g:['.RR...RR.','..RR.RR..','...RRR...','..OOOOO..','.OCLLLCO.','OCLCCCLCO','OCCCCCCCO','OCCCCCCDO','.OCCCCDO.','..OOOOO..']});
 const SPR={
  swords:{p:{S:'#eef4ff',D:'#9fb0c8',H:'#ffc04a',O:'#3a2a10'},g:['S..........S','SS........SS','.SD......DS.','..SD....DS..','...SD..DS...','....SDDS....','.....SS.....','....SDDS....','..HSD..DSH..','.HHS....SHH.','HH........HH','H..........H']},
  hand:{p:{Y:'#ffd2a0',D:'#c08050',B:'#5ec8ff',G:'#7dffa8'},g:['BB........GG','BBYY....YYGG','BBYYYYYYYYGG','..YDYYYDYY..','...YYDYYDY..','....YYYYY...']},
  eye:{p:{O:'#102030',W:'#ffffff',B:'#5ec8ff',K:'#000000'},g:['...OOOOOO...','.OOWWWWWWOO.','OWWWBBBBWWWO','OWWBBKKBBWWO','OWWWBBBBWWWO','.OOWWWWWWOO.','...OOOOOO...']},
  clock:{p:{O:'#8aa0a8',W:'#e8f4ef',K:'#304050'},g:['..OOOOO..','.OWWWWWO.','OWWWKWWWO','OWWWKWWWO','OWWWKKKWO','OWWWWWWWO','.OWWWWWO.','..OOOOO..']},
  spark:{p:{Y:'#ffc04a',L:'#ffe9a0',W:'#ffffff'},g:['.....Y.....','.....Y.....','....YLY....','...YLWLY...','YYYLWWWLYYY','...YLWLY...','....YLY....','.....Y.....','.....Y.....']},
  globe:{p:{B:'#3fa8ff',G:'#7dffa8',O:'#0a2a4a'},g:['...OOOOO...','..OBBGGBO..','.OBGGGBBBO.','OBBGGBBBGBO','OBBBGBBGGBO','OBBBBBBGGBO','OBGGBBBBBBO','.OBGGGBBBO.','..OBBGBBO..','...OOOOO...']},
  bolt:{p:{Y:'#ffe066',O:'#6a4a00'},g:['....OOO.','...OYYO.','..OYYO..','.OYYO...','OYYYYYO.','OOOYYO..','..OYO...','.OYO....','OYO.....','OO......']},
  crown:{p:{Y:'#ffd84a',R:'#ff5a6a',B:'#5ec8ff',D:'#b07a1a'},g:['Y....Y....Y','YY..YYY..YY','YYYYYYYYYYY','YRYYYBYYYRY','YYYYYYYYYYY','DDDDDDDDDDD']},
  medal1:medal('#ffc04a','#fff0a0','#b07a1a'),medal2:medal('#c8d4e0','#ffffff','#7a8898'),medal3:medal('#e0904a','#ffd0a0','#8a4a1a'),
  search:{p:{O:'#8aa0a8',G:'#c8d8e0'},g:['.OOOO.....','O....O....','O....O....','O....O....','.OOOOO....','.....OO...','......OO..','.......OO.']},
  person:{p:{A:'#ffd2a0',B:'#5ec8ff',D:'#2a7fb0'},g:['..AAA..','.AAAAA.','.AAAAA.','..AAA..','.BBBBB.','BBBBBBB','BDBBBDB','.B...B.']},
  paw:{p:{P:'#ffb0d0'},g:['.P...P.','PP.P.PP','...P...','.PPPPP.','PPPPPPP','.PPPPP.']},
  ufriends:{p:{A:'#8fe0ff',B:'#3a9ad0',P:'#7dffa8'},g:['...BBB.....','..BBBBB....','..BBBBB..P.','...BBB..PPP','.........P.','.BBBBBBB...','BBBBBBBBB..','BBBBBBBBB..']}};
 for(const k in SPR){try{const s=SPR[k],w=Math.max(...s.g.map(r=>r.length)),h=s.g.length,c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');
  s.g.forEach((r,y)=>{for(let i=0;i<r.length;i++){const col=s.p[r[i]];if(col){x.fillStyle=col;x.fillRect(i,y,1,1)}}});RT.style.setProperty('--sp-'+k,'url("'+c.toDataURL()+'")')}catch(e){}}
 const EMO={'👥':'friends','💬':'chat','⚔':'swords','🤝':'hand','👁':'eye','🕓':'clock','✨':'spark','🌐':'globe','🏆':'trophy','⚡':'bolt','⭐':'star','🏰':'tower','🪙':'coin','👑':'crown','🥇':'medal1','🥈':'medal2','🥉':'medal3','🎮':'pad','🧍':'person','🐾':'paw'};
 const RE=new RegExp('('+Object.keys(EMO).join('|')+')\\uFE0F?','gu');
 const SKIP='.chB,.chM span,input,textarea,.frI>b,.pod .nm,.rw .nm,.chPeer>b,.chPick>b,.chPeerHd>b,.chNm';
 function iconize(root){const tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),todo=[];let n;while(n=tw.nextNode()){RE.lastIndex=0;if(RE.test(n.nodeValue)&&!(n.parentElement&&n.parentElement.closest(SKIP)))todo.push(n)}
  for(const t of todo){const f=document.createDocumentFragment();let last=0,s=t.nodeValue;s.replace(RE,(m,e,off)=>{if(off>last)f.appendChild(document.createTextNode(s.slice(last,off)));const i=document.createElement('i');i.className='px149';i.style.setProperty('--x','var(--sp-'+EMO[e]+')');f.appendChild(i);last=off+m.length;return m});
   if(last<s.length)f.appendChild(document.createTextNode(s.slice(last).replace(/^\s+/,' ')));t.parentNode.replaceChild(f,t)}}
 /* 이름 → 얼굴 칸(글자 + 색) */
 const hue=s=>{let h=0;for(const c of String(s))h=(h*31+c.codePointAt(0))%360;return h};
 const av=name=>{const a=document.createElement('span');a.className='av149';a.style.setProperty('--h',hue(name));a.textContent=String(name||'?').replace(/^G_/,'').charAt(0).toUpperCase();return a};

 const F='html.lp #fr94',FL='html.lpL #fr94',FP='html.lpP #fr94',K='html.lp #rk102',KL='html.lpL #rk102',KP='html.lpP #rk102',C='html.lp #ch103',CL='html.lpL #ch103';
 const st=document.createElement('style');st.id='so149css';st.textContent=`
 .px149{display:inline-block;width:1.15em;height:1.15em;vertical-align:-.2em;background:var(--x) center/contain no-repeat;image-rendering:pixelated;font-style:normal;flex:none}
 .av149{flex:none;width:34px;height:34px;border-radius:10px;display:grid;place-items:center;font-weight:900;font-size:15px;color:#fff;text-shadow:0 1px 0 #000;
  background:linear-gradient(135deg,hsl(var(--h) 70% 55%),hsl(calc(var(--h) + 40) 60% 32%));border:2px solid hsl(var(--h) 80% 70% / .7);box-shadow:inset 0 0 0 2px #0004}
 /* ── 친구 ── */
 ${F} .frP{border-radius:20px!important;background:radial-gradient(ellipse at 20% 0%,#163a52,transparent 55%),linear-gradient(180deg,#0f1c28,#081017)!important;border:2px solid #5ec8ff88!important;box-shadow:0 0 24px #3fa8ff44,0 24px 70px #000d!important;padding:14px!important}
 ${F} .frHd>i{width:40px;height:40px;border-radius:12px;display:grid!important;place-items:center;background:linear-gradient(180deg,#2a3a8a,#1a2058);border:1px solid #8a9cff66;font-size:0!important}
 ${F} .frHd>i .px149{width:24px;height:24px}
 ${F} .frWc{background:linear-gradient(180deg,#ffd66a,#ffb02e)!important;color:#3a2200!important;border:0!important;border-radius:12px!important;font-weight:900!important}
 ${F} h5{display:flex;align-items:center;gap:6px;color:#8fe0ff!important;font-size:14px!important;margin:10px 2px 6px!important}
 ${F} .frAdd input{border-radius:12px!important;background:#060c12!important;border:1px solid #5ec8ff44!important;padding-left:34px!important;background-image:var(--sp-search)!important;background-repeat:no-repeat!important;background-position:11px center!important;background-size:14px 12px!important;image-rendering:pixelated}
 ${F} #frGo{border-radius:12px!important;background:linear-gradient(180deg,#8fe6ff,#3fb6f0)!important;color:#06243a!important;font-weight:900!important;border:0!important}
 ${F} .frRow{display:flex!important;align-items:center;gap:10px!important;position:relative;padding:9px 10px!important;border-radius:14px!important;background:#0b1620!important;border:1px solid #ffffff14!important}
 ${F} .frRow.on{background:linear-gradient(90deg,#0f3a24,#0b1620)!important;border-color:#3ad16a88!important;box-shadow:0 0 12px #3ad16a33}
 ${F} .frI{flex:1;min-width:0}
 ${F} .frI b{font-size:15px}
 ${F} .frI small{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 ${F} .frBtns{display:flex;gap:6px;align-items:center;flex:none}
 ${F} .frBtns button{border-radius:10px!important;min-height:34px;font-weight:900!important}
 ${F} .frBtns .ch{width:40px;padding:0!important;background:#14222c!important;border:1px solid #ffffff22!important}
 ${F} .frBtns .ch .px149{width:18px;height:18px}
 ${F} .frBtns .pv{background:linear-gradient(180deg,#ff8a9a,#f0506a)!important;color:#fff!important;border:0!important}
 ${F} .frBtns .du{background:linear-gradient(180deg,#9affc8,#3fd38e)!important;color:#063a22!important;border:0!important}
 ${F} .frBtns .rm{display:none!important}
 ${F} .frRow.o149 .frBtns .rm{display:inline-flex!important;align-items:center;font-size:0!important;background:#3a1218!important;color:#ff8a9a!important;border:1px solid #ff5a6a66!important;padding:0 10px!important}
 ${F} .frRow.o149 .frBtns .rm::after{content:'친구 삭제';font-size:12px}
 ${F} .frRow.o149 .frBtns .rm[data-sure]::after{content:'정말?'}
 ${F} .mo149{width:34px;padding:0!important;background:#14222c!important;border:1px solid #ffffff22!important;color:#cfe!important;font-size:16px!important;letter-spacing:-1px}
 ${F} .frRow.sg{background:linear-gradient(90deg,#24163a,#0b1620)!important;border-color:#b07dff66!important}
 ${F} .frWhy{font-size:11px;padding:2px 8px;border-radius:999px;background:#2a1a4a;border:1px solid #b07dff66;color:#d8c0ff}
 ${F} .ad{background:linear-gradient(180deg,#d8b8ff,#9a6cff)!important;color:#1a0a3a!important;border:0!important}
 ${F} .c149{display:flex;flex-direction:column;min-width:0;min-height:0}
 ${F} .h149{display:none}
 /* 가로: 두 칸 */
 ${FL} .frP{width:min(900px,calc(100vw - 24px))!important;max-height:calc(100dvh - 16px)!important;display:grid!important;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);column-gap:14px;overflow:hidden!important}
 ${FL} .frHd{grid-column:1/-1}
 ${FL} .c149{overflow-y:auto;overscroll-behavior:contain;padding-right:2px}
 ${FL} .c149.b{border-left:1px solid #ffffff14;padding-left:14px}
 ${FL} .h149{display:flex}
 ${FL} .frAdd{flex-direction:column!important;gap:8px!important}
 ${FL} .frAdd input,${FL} #frGo{width:100%!important;height:44px}
 /* 세로: 한 줄로, 순서만 */
 ${FP} .frP{display:flex!important;flex-direction:column!important;width:calc(100vw - 20px)!important}
 ${FP} .c149{display:contents}
 ${FP} .frAdd{order:1}${FP} .frMsg{order:2}${FP} .c149.a>*{order:3}${FP} .c149.b>.s149{order:5}${FP} .frSent{order:6}
 ${FP} .frRow.on{flex-wrap:wrap}
 ${FP} .frRow.on .frBtns{flex-basis:100%;display:grid!important;grid-template-columns:1fr 1fr 1fr;gap:6px;order:5}
 ${FP} .frRow.on .frBtns .ch{width:auto}
 ${FP} .frRow.on .frBtns .ch::after{content:'채팅';margin-left:6px;font-size:13px}
 ${FP} .frRow.on .frBtns .rm{grid-column:1/-1}
 ${FP} .frRow.on .mo149{position:absolute;top:9px;right:10px}
 ${FP} .frRow.on .frG{order:4}
 /* ── 랭킹 ── */
 ${K} .pnl{border-radius:20px!important;background:radial-gradient(ellipse at 50% 0%,#3a2a10,transparent 55%),linear-gradient(180deg,#141018,#0a0b10)!important;border:2px solid #ffd16688!important}
 ${K} .tabs button{border-radius:999px!important}
 ${K} .pod{border-radius:16px!important}
 ${K} .pr .px149{width:16px;height:14px}
 ${K} .hd .px149{width:22px;height:22px;margin-right:4px}
 ${K} .mine{background:linear-gradient(90deg,#1a3a24,#0d151c)!important;border-top:1px solid #3ad16a55!important}
 ${KP} .pnl{width:calc(100vw - 20px)!important;max-height:calc(100dvh - 20px)!important}
 ${KP} .podium{grid-template-columns:1fr 1fr!important;grid-template-areas:"a a" "b c";gap:10px!important;align-items:stretch!important}
 ${KP} .pod.p1{grid-area:a}${KP} .pod.p2{grid-area:b}${KP} .pod.p3{grid-area:c}
 ${KP} .pod.p1 canvas{width:min(240px,60vw)!important;height:auto!important;margin:0 auto}
 ${KP} .pod.p1{background:radial-gradient(ellipse at 50% 30%,#5a4214,transparent 70%),linear-gradient(180deg,#2a1e0c,#140e06)!important;border:2px solid #ffd84a!important;box-shadow:0 0 20px #ffd84a44!important}
 ${KP} .pod .gear{display:none!important}
 ${KL} .pnl{width:min(900px,calc(100vw - 24px))!important;max-height:calc(100dvh - 16px)!important}
 ${KL} .sc{display:grid!important;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:12px;overflow:hidden!important;padding:8px 12px!important}
 ${KL} .podium{margin:0!important;overflow-y:auto;align-content:start;padding-top:12px!important}
 ${KL} .tabs{padding-top:4px!important;padding-bottom:4px!important}
 ${KL} .tabs button{padding-top:4px!important;padding-bottom:4px!important}
 ${KL} .list{overflow-y:auto;min-height:0}
 ${KL} .pod .gear{display:none!important}
 ${KL} .pod canvas{width:100%!important;height:17dvh!important;object-fit:contain}
 ${KL} .pod .sb,${KL} .pod .on{display:none!important}
 ${KL} .pod{padding:4px 6px 6px!important}
 /* ── 채팅 ── */
 ${C} .chP{border-radius:20px!important}
 ${C} .chHd>i{width:40px;height:40px;border-radius:12px;display:grid!important;place-items:center;background:linear-gradient(180deg,#4a3410,#2a1c08);border:1px solid #ffc04a55;font-size:0!important}
 ${C} .chHd>i .px149{width:24px;height:24px}
 ${C} .chTabs button{border-radius:12px!important;display:flex;align-items:center;justify-content:center;gap:6px}
 ${C} .chPeers{display:flex;flex-direction:column;gap:8px}
 ${C} .chPeer{display:flex!important;align-items:center;gap:10px!important;padding:9px 12px!important;border-radius:14px!important;background:#120e0a!important;border:1px solid #ffffff14!important;text-align:left}
 ${C} .chPeer.on{background:linear-gradient(90deg,#0f3a24,#120e0a)!important;border-color:#3ad16a88!important}
 ${C} .chPeer>b{flex:1;min-width:0;text-align:left}
 ${C} .chPeer::after{content:'›';font-size:20px;opacity:.6;margin-left:4px}
 ${C} .chPeer .av149{width:32px;height:32px;font-size:14px}
 ${C} .ph149{display:none}
 ${CL} .chP{width:min(900px,calc(100vw - 24px))!important;height:calc(100dvh - 16px)!important;display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-template-rows:auto auto minmax(0,1fr) auto auto;column-gap:12px}
 ${CL} .chHd{grid-column:1;grid-row:1}
 ${CL} .chTabs{grid-column:2;grid-row:1;align-self:center;margin:0!important}
 ${CL} .chP>*:not(.chHd):not(.chTabs):not(.chPeers):not(.ph149){grid-column:1/-1}
 ${CL} .chInfo,${CL} .chPeerHd{grid-row:2}
 ${CL} .chLog{grid-row:3}
 ${CL} .chPeers{grid-column:1;grid-row:2/5;overflow-y:auto;min-height:0}
 ${CL} .ph149{display:flex;grid-column:2;grid-row:2/5;flex-direction:column;align-items:center;justify-content:center;gap:12px;border-radius:14px;background:#0a0806;border:1px solid #ffffff10;color:#c8b090;font-size:14px}
 ${CL} .ph149 i{width:56px;height:48px;background:var(--sp-chat) center/contain no-repeat;image-rendering:pixelated;opacity:.7}
 html.lpP #ch103 .chP{width:calc(100vw - 20px)!important;height:calc(100dvh - 20px)!important}`;
 document.head.appendChild(st);

 /* 친구 창: 두 칸으로 나누고 얼굴 · ⋯ 넣기 */
 function frFix(box){const P=box.querySelector('.frP');if(!P||P.dataset.f149)return;P.dataset.f149=1;
  const a=document.createElement('div');a.className='c149 a';const b=document.createElement('div');b.className='c149 b';
  const hAdd=document.createElement('h5');hAdd.className='h149';hAdd.innerHTML='<i class="px149" style="--x:var(--sp-ufriends)"></i>친구 추가';b.appendChild(hAdd);
  let side=null;for(const n of [...P.children]){if(n.classList.contains('frHd'))continue;
   if(n.classList.contains('frAdd')||n.classList.contains('frMsg')){b.appendChild(n);continue}
   if(n.classList.contains('frSent')){b.appendChild(n);continue}
   if(n.tagName==='H5'){side=/추천/.test(n.textContent)?b:a}
   if(n.classList.contains('sug'))side=b;
   if(side===b)n.classList.add('s149');(side||a).appendChild(n)}
  P.appendChild(a);P.appendChild(b);
  P.querySelectorAll('.frRow').forEach(r=>{const nm=(r.querySelector('.frI b,b')||{}).textContent||'';const d=r.querySelector('.dot');const v=av(nm);if(d)d.after(v);else r.prepend(v);
   const rm=r.querySelector('.rm');if(rm){const m=document.createElement('button');m.className='mo149';m.type='button';m.textContent='⋯';m.title='더 보기';m.onclick=e=>{e.stopPropagation();r.classList.toggle('o149')};rm.parentNode.appendChild(m)}});
  iconize(P)}
 /* 채팅 창: 얼굴 · 안내 칸 */
 function chFix(box){const P=box.querySelector('.chP');if(!P||P.dataset.f149)return;P.dataset.f149=1;
  P.querySelectorAll('.chPeer').forEach(r=>{const nm=(r.querySelector('b')||{}).textContent||'';const d=r.querySelector('.dot');const v=av(nm);if(d)d.after(v);else r.prepend(v)});
  if(P.querySelector('.chPeers')){const ph=document.createElement('div');ph.className='ph149';ph.innerHTML='<i></i>친구를 선택해 대화를 시작하세요';P.appendChild(ph)}
  iconize(P.querySelector('.chHd')||P);P.querySelectorAll('.chTabs,.chInfo,.chPeers small,.chPeerHd small,.chPick,.chPeerHd').forEach(iconize)}
 function rkFix(box){const P=box.querySelector('.pnl');if(!P||P.dataset.f149)return;P.dataset.f149=1;iconize(P)}
 const FIX={fr94:frFix,ch103:chFix,rk102:rkFix};
 function watch(id){const box=document.getElementById(id);if(!box||box.dataset.w149)return;box.dataset.w149=1;
  const run=()=>{if(!RT.classList.contains('lp')||box.hidden)return;try{FIX[id](box)}catch(e){}};
  new MutationObserver(run).observe(box,{childList:true,subtree:true});run()}
 setInterval(()=>{for(const id in FIX)watch(id)},700);
 window.SO149={v:1,iconize};
}catch(e){console.warn('v149',e)}})();
