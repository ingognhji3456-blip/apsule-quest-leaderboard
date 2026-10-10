/* v149: 폰 · 패드 계정 창 · 탑 고르기 · 탑 층 고르기 · 듀오 방 새 배치 (SC149) — 사용자가 보내 준 그림을 참고
   - 계정 창(#acctBox): 세로는 ✕ · 이름 줄 → 저장 정보 → [지금 저장 · 랭킹] → 로그아웃 → Google 연결 → [기록 처음부터 · 계정 삭제] 묶음.
     가로는 왼쪽(저장 정보 · 단추) · 오른쪽(Google 연결 · 위험한 단추) 두 칸.
   - 탑 고르기(#duo85 .dPick): 세로는 카드 3장을 한 줄씩, 가로는 3칸.
   - 탑 층 고르기(#gmTower): 세로는 층 안내 카드 → 층 목록 → 난이도 · 진행 · 보상 → 맨 아래 「이어하기 · 선택한 층」. 가로는 왼쪽 층 목록을 넓게.
   - 듀오(#duo85 .dCols): 세로는 「방 만들기 | 방 들어가기」 탭으로 한쪽만. 가로는 두 칸 그대로, 그림을 줄여 한 화면에.
   - 폰 세로의 메뉴 화면(로비 말고)은 위쪽 로고를 숨겨 자리를 넓힘. */
(function(){try{
 const RT=document.documentElement;
 const st=document.createElement('style');st.id='sc149css';st.textContent=`
 html.lpP #gameMenu:not(.lvOn) .gmLogo{display:none!important}
 /* ── 계정 창 ── */
 html.lp #acPanel.in149{display:flex!important;flex-direction:column;gap:8px!important;border-radius:18px!important;border:2px solid #7dffa888!important;box-shadow:0 0 22px #3ad16a33,0 20px 60px #000c!important}
 html.lp #acPanel.in149>h3{order:0;min-height:48px;display:flex;align-items:center;gap:6px;margin:0!important;padding-left:58px!important;font-size:20px!important}
 html.lp #acPanel.in149>#acClose{position:absolute!important;top:12px;left:12px}
 html.lp #acPanel.in149>.acNote{order:1;margin:0!important}
 html.lp #acPanel.in149>.acCard:not(.g149){order:2}
 html.lp #acPanel.in149>.acMsg{order:3}
 html.lp #acPanel.in149>.r-now{order:4}
 html.lp #acPanel.in149>.r-out{order:5}
 html.lp #acPanel.in149>.g149{order:6}
 html.lp #acPanel.in149>.dz149{order:7;display:flex;flex-direction:column;gap:6px;padding:8px;border-radius:12px;background:#ffffff06;border:1px solid #ffffff14}
 html.lp #acPanel.in149 .acRow{margin:0!important}
 html.lp #acPanel.in149 .acRow .gmBtn{min-height:40px;border-radius:12px!important}
 html.lp #acPanel.in149 #fileGoogle{width:100%;background:#fff!important;color:#222!important;border-radius:12px!important;font-weight:800}
 html.lp #acPanel.in149 #acDel59{color:#ff8a9a!important}
 html.lpL #acPanel.in149{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-template-areas:"h h" "n n" "c g" "m g" "a z" "o z" ". z";column-gap:12px;row-gap:8px;width:min(860px,calc(100vw / var(--uis,1) - 24px))!important;max-height:calc(100dvh / var(--uis,1) - 16px)!important;overflow-y:auto}
 html.lpL #acPanel.in149>h3{grid-area:h;min-height:56px}
 html.lpL #acPanel.in149>#acClose{top:8px}
 html.lpL #acPanel.in149>.acNote{grid-area:n}
 html.lpL #acPanel.in149>.acCard:not(.g149){grid-area:c}
 html.lpL #acPanel.in149>.acMsg{grid-area:m}
 html.lpL #acPanel.in149>.r-now{grid-area:a}
 html.lpL #acPanel.in149>.r-out{grid-area:o}
 html.lpL #acPanel.in149>.g149{grid-area:g;align-self:stretch}
 html.lpL #acPanel.in149>.dz149{grid-area:z;align-self:start}
 /* ── 탑 고르기 ── */
 html.lpP #duo85 .dPk .dPick{grid-template-columns:1fr!important;gap:10px!important}
 html.lpP #duo85 .dPk .dCard{display:grid!important;grid-template-columns:1fr;gap:4px!important;padding:8px 10px 10px!important;text-align:center}
 html.lpP #duo85 .dPk .dCard .dScn{width:100%!important;height:84px!important;object-fit:cover;border-radius:10px}
 html.lpP #duo85 .dPk .dCard em{justify-self:stretch}
 html.lpL #duo85 .dPk{width:min(900px,calc(100vw - 24px))!important;max-height:calc(100dvh - 16px)!important}
 html.lpL #duo85 .dPk .dPick{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:10px!important}
 html.lpL #duo85 .dPk .dCard .dScn{width:100%!important;height:min(150px,30dvh)!important;object-fit:cover}
 html.lpL #duo85 .dPk .dCard small{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 /* ── 탑 층 고르기 ── */
 html.lpP #gmTower #twWrap{display:flex!important;flex-direction:column!important;overflow-y:auto!important;gap:10px!important}
 html.lpP #gmTower #twInfo{display:contents!important}
 html.lpP #gmTower #twBanner{order:1;flex:none!important;height:auto!important;min-height:120px}
 html.lpP #gmTower #twCol{order:2;flex:none!important}
 html.lpP #gmTower #twBody{order:3;display:flex!important;flex-direction:column!important;gap:8px}
 html.lpP #gmTower #twBody .twBtns{order:99;position:sticky;bottom:0;z-index:3;padding-top:6px;background:linear-gradient(180deg,#0a0d1400,#0a0d14 30%)}
 html.lpL #gmTower #twWrap{display:grid!important;grid-template-columns:minmax(0,38%) minmax(0,1fr)!important;gap:10px!important}
 html.lpL #gmTower #twCol{width:auto!important;max-width:none!important;min-width:0!important}
 /* ── 듀오 ── */
 #duo85 .tb149{display:none}
 html.lpP #duo85 .tb149{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:0 0 8px}
 html.lpP #duo85 .tb149 button{height:40px;border-radius:12px;border:1px solid #ffffff22;background:#0e1620;color:#cfe;font:inherit;font-weight:900;font-size:14px;cursor:pointer}
 html.lpP #duo85 .tb149 button.on{background:linear-gradient(180deg,#b88cff,#7a4adf);color:#fff;border-color:#d8c0ff}
 html.lpP #duo85 .dPv .tb149 button.on{background:linear-gradient(180deg,#ff7a9a,#e83a6a);border-color:#ffb0c4}
 html.lpP #duo85 .dCols{grid-template-columns:1fr!important}
 html.lpP #duo85 .dCols>.dCol.off149{display:none!important}
 html.lpP #duo85 .dCol>h4{display:none}
 html.lpL #duo85 .dP.wide{width:min(900px,calc(100vw - 24px))!important;max-height:calc(100dvh - 16px)!important}
 html.lpL #duo85 .dPrev{height:70px!important;width:100%!important;object-fit:cover}
 html.lpL #duo85 .dDiff button{padding:4px 2px!important}
 html.lpL #duo85 .dEmpty .dScn{height:60px!important}`;
 document.head.appendChild(st);

 /* 계정 창: 단추 줄에 이름표 · Google 칸 · 위험한 단추 묶음 */
 function acFix(){const P=document.getElementById('acPanel');if(!P)return;const inn=!!P.querySelector('#acOut');P.classList.toggle('in149',inn&&RT.classList.contains('lp'));if(!inn)return;
  const row=id=>{const b=P.querySelector('#'+id);return b&&b.closest('.acRow')};
  const now=row('acNow'),out=row('acOut'),rs=row('acReset143'),dl=row('acDel59');if(now)now.classList.add('r-now');if(out)out.classList.add('r-out');
  const g=P.querySelector('#fileGoogle');if(g){const c=g.closest('.acCard');if(c)c.classList.add('g149')}
  let z=P.querySelector('.dz149');if(!z&&(rs||dl)){z=document.createElement('div');z.className='dz149';P.appendChild(z)}
  if(z){if(rs&&rs.parentNode!==z)z.insertBefore(rs,z.firstChild);if(dl&&dl.parentNode!==z)z.appendChild(dl)}}
 /* 듀오 · 결투: 세로 탭(칸 제목 h4를 탭 이름으로). v150: 결투 창은 칸에 .mk가 없어서 둘 다 숨던 것 고침 */
 const TAB={};
 function duoFix(){const box=document.getElementById('duo85');if(!box||box.hidden)return;const cols=box.querySelector('.dCols');if(!cols)return;
  const cs=[...cols.children].filter(c=>c.classList.contains('dCol'));if(cs.length<2)return;const key=cs.map(c=>(c.querySelector('h4')||{}).textContent||'').join('|');
  let k=TAB[key]|0;cs.forEach((c,i)=>c.classList.toggle('off149',i!==k));
  let t=cols.previousElementSibling;if(!(t&&t.classList.contains('tb149'))){t=document.createElement('div');t.className='tb149';cols.parentNode.insertBefore(t,cols);
   t.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;e.stopPropagation();TAB[t.dataset.key]=+b.dataset.i;try{window.gmSfx&&gmSfx('move')}catch(_){}duoFix()})}
  const h=cs.map((c,i)=>'<button data-i="'+i+'" class="'+(i===k?'on':'')+'">'+(((c.querySelector('h4')||{}).textContent)||('칸 '+(i+1)))+'</button>').join('');
  if(t.dataset.key!==key||t.dataset.k!=String(k)){t.dataset.key=key;t.dataset.k=k;t.innerHTML=h}
  cols.classList.toggle('pv149',!!box.querySelector('.dPv'))}
 function watch(id,fn){const box=document.getElementById(id);if(!box||box.dataset.w149)return;box.dataset.w149=1;const run=()=>{try{fn()}catch(e){}};new MutationObserver(run).observe(box,{childList:true,subtree:true});run()}
 setInterval(()=>{watch('acctBox',acFix);watch('duo85',duoFix);try{acFix()}catch(e){}},700);
 window.SC149={v:1};
}catch(e){console.warn('v149s',e)}})();
