/* ================= v65 UI 다듬기 (UI65) =================
   ① 공통 단추(.gmBtn · 전투 위쪽 단추)를 같은 모양 · 같은 눌림감으로 정리
   ② 설정 화면: 왼쪽 메뉴 카드 · 줄마다 카드 · 소리 켜기 스위치 · 싱크 막대 · 머리띠
   ③ 「✦ 스킨 · 무기 · 연출」 상점: 흰 테두리 없애기 · 반짝이는 제목 · 탭 아이콘 ·
      등급별 카드 테두리(전설은 빛이 지나감) · 무대 조명 · 반짝이는 구매 단추 · 폰 머리띠 정리
   CSS로만 덮어쓰고, 소리 스위치 켜짐/꺼짐만 글자를 읽어 표시한다. */
(()=>{try{
 const F=(typeof FONT!=='undefined'?FONT:'system-ui,sans-serif');
 const css=`
 /* ---------- ① 공통 단추 ---------- */
 html body .gmBtn{border-radius:12px!important;border:1px solid #ffffff22!important;background:linear-gradient(180deg,#1d2736,#121a26)!important;box-shadow:inset 0 1px 0 #ffffff1a,0 3px 0 #05080c,0 6px 14px #0006!important;
  transition:transform .1s,box-shadow .12s,border-color .15s,filter .15s!important;font-weight:800!important;letter-spacing:.02em}
 /* v66: 시작 단추(.go)는 밝은 초록 그대로 (위 어두운 바탕이 덮어써 꺼진 것처럼 보이던 문제) */
 html body .gmBtn.go{background:linear-gradient(180deg,#c6ffdf,#74d3b0)!important;color:#06140e!important;border-color:#e6fff2!important;box-shadow:inset 0 1px 0 #ffffffaa,0 3px 0 #2c6a55,0 6px 20px #6ccaa955!important}
 html body .gmBtn.sel{border-color:#a6f5c699!important}
 html body .gmBtn:not(:disabled):hover{transform:translateY(-1px);border-color:#a6f5c6aa!important;filter:brightness(1.12)}
 html body .gmBtn:not(:disabled):active{transform:translateY(2px);box-shadow:inset 0 1px 0 #ffffff12,0 1px 0 #05080c!important}
 html body .gmBtn:focus-visible,#bbShop button:focus-visible,#gmSet button:focus-visible{outline:2px solid #ffe58a;outline-offset:2px}
 #v43Diff,#fsBtn,#pauseBtn{border-radius:999px!important;background:linear-gradient(180deg,#141c28e6,#0b1119e6)!important;border:1px solid #ffffff26!important;box-shadow:inset 0 1px 0 #ffffff14,0 4px 12px #0007!important;backdrop-filter:blur(4px);transition:transform .1s,border-color .15s}
 #v43Diff:hover,#fsBtn:hover,#pauseBtn:hover{border-color:#ffe58a99!important;transform:translateY(-1px)}

 /* ---------- ② 설정 ---------- */
 #gmSetPanel{background:radial-gradient(120% 80% at 0% 0%,#18302c66,transparent 60%),linear-gradient(180deg,#0f1519,#0a0f12)!important;border:1px solid #ffffff1a!important;border-radius:18px!important;box-shadow:0 18px 40px #0008,inset 0 1px 0 #ffffff10!important}
 #cfNav .cfLever{border-radius:14px!important;border:1px solid #ffffff14!important;background:linear-gradient(180deg,#18232a,#11191e)!important;transition:transform .12s,border-color .15s,box-shadow .15s!important}
 #cfNav .cfLever:hover{transform:translateX(3px);border-color:#7dffa866!important}
 #cfNav .cfLever.on,#cfNav .cfLever[aria-pressed=true]{background:linear-gradient(90deg,#1f4a3c,#14262a)!important;border-color:#7dffa8!important;box-shadow:0 0 0 1px #7dffa855,0 8px 20px #0007,inset 3px 0 0 #7dffa8!important}
 #gmSet .cfSec h3{border-radius:14px!important;padding:12px 16px!important;background:linear-gradient(90deg,#1f3b34,#14202400 80%),repeating-linear-gradient(90deg,#ffffff06 0 2px,transparent 2px 8px)!important;border-left:4px solid #7dffa8!important;box-shadow:inset 0 1px 0 #ffffff12;text-shadow:0 2px 0 #0008}
 #gmSet .cfSec h3::after{content:'';width:46px;height:14px;margin-left:10px;background:linear-gradient(90deg,#7dffa8 0 3px,transparent 3px 6px,#7dffa8 6px 9px,transparent 9px 12px,#7dffa8 12px 15px,transparent 15px 18px,#7dffa8 18px 21px,transparent 21px);
  -webkit-mask:linear-gradient(0deg,#000 30%,transparent 30%) bottom/100% 100%;opacity:.6;animation:ui65eq 1.1s steps(4) infinite}
 @keyframes ui65eq{0%{transform:scaleY(.4)}50%{transform:scaleY(1)}100%{transform:scaleY(.6)}}
 #gmSet .gmRow{border-radius:16px!important;border:1px solid #ffffff14!important;background:linear-gradient(180deg,#141c21,#0f1519)!important;padding:14px 16px!important;transition:border-color .15s,box-shadow .15s}
 #gmSet .gmRow:hover{border-color:#7dffa833!important;box-shadow:0 6px 18px #0005}
 #gmSet .gmRow>label{font-weight:900!important;letter-spacing:.06em;color:#9ff5c8!important}
 /* 소리 켜기 → 스위치 모양 */
 #gmSound2{position:relative;min-width:110px;padding-right:58px!important;border-radius:999px!important}
 #gmSound2::after{content:'';position:absolute;right:8px;top:50%;width:40px;height:22px;margin-top:-11px;border-radius:999px;background:#7dffa8;box-shadow:inset 0 0 0 2px #0006;transition:background .2s}
 #gmSound2::before{content:'';position:absolute;right:10px;top:50%;width:18px;height:18px;margin-top:-9px;border-radius:50%;background:#fff;z-index:1;box-shadow:0 2px 4px #0007;transition:right .2s}
 #gmSound2.ui65off::after{background:#3a4650}#gmSound2.ui65off::before{right:30px}
 /* 싱크 막대 */
 #gmSyncSlot{min-width:140px;height:14px!important;border-radius:999px!important;background:linear-gradient(90deg,#0a1014,#18242a 50%,#0a1014)!important;box-shadow:inset 0 0 0 1px #ffffff1a;position:relative;overflow:hidden}
 #gmSyncSlot::after{content:'';position:absolute;left:50%;top:0;bottom:0;width:2px;margin-left:-1px;background:#ffe58a;box-shadow:0 0 8px #ffe58a}
 #gmSyncV{min-width:64px;text-align:center;padding:6px 10px;border-radius:10px;background:#0a1014;box-shadow:inset 0 0 0 1px #ffe58a44}
 #gmSet .gmTip{border-radius:12px!important;background:#0a1014!important;border:1px dashed #ffffff22!important}
 #gmSet .gmDiffs button{border-radius:999px!important}
 #gmSet .ui65d{margin:-4px 4px 12px;color:#9ab8ac;font-size:13px;line-height:1.5}
 #ui65card{margin:0 0 12px;padding:12px;border-radius:16px;background:linear-gradient(135deg,#1f3b34,#101a1e);border:1px solid #7dffa833;box-shadow:inset 0 1px 0 #ffffff14;display:grid;grid-template-columns:44px 1fr;gap:10px;align-items:center}
 #ui65card canvas{width:44px;height:52px;image-rendering:pixelated;border-radius:10px;background:#0a1014;box-shadow:inset 0 0 0 1px #ffffff1a}
 #ui65card b{display:block;font-size:14px;color:#eaf6ef}#ui65card small{display:block;font-size:11px;color:#9ab8ac;margin-top:2px;line-height:1.4}
 @media (max-width:760px){#cfNav .cfLever{border-radius:12px!important}#gmSet .gmRow{padding:12px!important}#ui65card{display:none}}

 /* ---------- ③ 스킨 · 무기 · 연출 상점 ---------- */
 #bbShop{outline:none!important;border:1px solid #ffffff1f!important;background:radial-gradient(120% 60% at 50% -10%,#2a1a4a,transparent 60%),#0a0f17!important;box-shadow:0 30px 80px #000c,0 0 0 1px #000!important}
 #bbShop::backdrop{background:radial-gradient(circle at 50% 30%,#1a103088,#000c)!important;backdrop-filter:blur(3px)}
 #bbShop .ssHead{background:linear-gradient(90deg,#24154af5,#0f1e2ef5)!important;border-bottom:1px solid #ffffff1a!important;overflow:hidden}
 #bbShop .ssHead::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(2px 2px at 12% 30%,#fff8,transparent),radial-gradient(1.5px 1.5px at 30% 70%,#ffe58a99,transparent),radial-gradient(2px 2px at 55% 20%,#8ad8ff88,transparent),radial-gradient(1.5px 1.5px at 75% 60%,#ff8fd099,transparent);animation:ui65tw 3s ease-in-out infinite alternate}
 @keyframes ui65tw{from{opacity:.4}to{opacity:1}}
 #bbShop .ssHead h2{background-size:200% 100%!important;animation:ui65sh 4s linear infinite;font-size:22px!important}
 @keyframes ui65sh{from{background-position:0 0}to{background-position:200% 0}}
 #bbShop .ssTabs button{border-radius:999px!important;padding:8px 14px!important;display:inline-flex;align-items:center;gap:6px;border:1px solid #ffffff1f!important;background:#ffffff0a!important;color:#dfe8ff!important;transition:transform .1s,background .15s}
 #bbShop .ssTabs button .ti{font-style:normal;font-size:14px;filter:drop-shadow(0 1px 0 #0008)}
 #bbShop .ssTabs button[aria-pressed=true]{background:linear-gradient(180deg,#ffe58a,#f0b23a)!important;color:#2a1a06!important;border-color:#fff2b0!important;box-shadow:0 6px 18px #f0b23a55!important}
 #bbShop .ssTabs button:not([aria-pressed=true]):hover{background:#ffffff16!important;transform:translateY(-1px)}
 #bbShop .ssX{border-radius:999px!important;width:40px;height:40px;padding:0!important}
 /* 무대 */
 #bbShop .ssStage{border-color:color-mix(in srgb,var(--tc,#8ad8ff) 35%,#ffffff14)!important;box-shadow:0 0 0 1px #000,0 14px 40px #0008,inset 0 0 60px color-mix(in srgb,var(--tc,#8ad8ff) 14%,transparent)!important}
 #bbShop .ssStage::before{content:'';position:absolute;left:0;right:0;top:0;height:3px;z-index:2;pointer-events:none;background:linear-gradient(90deg,transparent,var(--tc,#8ad8ff),transparent);box-shadow:0 0 18px var(--tc,#8ad8ff)}
 #bbShop .ssStage[data-tier="전설"]{border-color:#ffd166aa!important}
 #bbShop .ssInfo{position:relative;z-index:2;background:linear-gradient(180deg,#0c121c,#0a0f17)!important}
 #bbShop .ssInfo h3{font-size:26px!important;text-shadow:0 0 18px color-mix(in srgb,var(--tc,#8ad8ff) 45%,transparent)}
 #bbShop .ssTags span{border-radius:999px!important;background:color-mix(in srgb,var(--tc,#8ad8ff) 12%,#ffffff08)!important;border-color:color-mix(in srgb,var(--tc,#8ad8ff) 35%,#ffffff1a)!important}
 #bbShop .ssPrice{font-size:30px!important;letter-spacing:.01em;background:linear-gradient(180deg,#fff6cf,#ffd166);-webkit-background-clip:text;background-clip:text;color:transparent!important;filter:drop-shadow(0 2px 0 #0008)}
 #bbShop .ssPrice small,#bbShop .ssPrice s{-webkit-text-fill-color:#8ea2c0}
 #bbShop .ssBtn{border-radius:14px!important;min-height:48px;font-weight:900!important}
 #bbShop .ssBtn.buy:not(.own){position:relative;overflow:hidden;background:linear-gradient(180deg,#ffe58a,#f0a82a)!important;color:#2a1a06!important;border:1px solid #fff2b0!important;box-shadow:0 8px 24px #f0a82a55,inset 0 1px 0 #fff8!important}
 #bbShop .ssBtn.buy:not(.own)::after{content:'';position:absolute;top:0;bottom:0;width:40%;left:-60%;background:linear-gradient(100deg,transparent,#ffffffaa,transparent);animation:ui65shine 2.6s ease-in-out infinite}
 @keyframes ui65shine{0%,55%{left:-60%}100%{left:130%}}
 /* 카드: 등급별 테두리 */
 #bbShop .ssCard{flex-shrink:0!important;border-radius:14px!important;transition:transform .12s,box-shadow .15s,border-color .15s!important}
 #bbShop .ssCard:hover{transform:translateY(-2px);box-shadow:0 10px 24px #0008}
 #bbShop .ssCard[data-tier="변이"]{border-color:#6affc844!important}
 #bbShop .ssCard[data-tier="희귀"]{border-color:#6ab8ff55!important}
 #bbShop .ssCard[data-tier="영웅"]{border-color:#b080ff66!important;background:linear-gradient(135deg,#1a1430,#0d131e)!important}
 #bbShop .ssCard[data-tier="전설"],#bbShop .ssCard[data-tier="세트"]{border-color:#ffd16688!important;background:linear-gradient(135deg,#2a1e0c,#0d131e 70%)!important;overflow:hidden}
 #bbShop .ssCard[data-tier="전설"]::after,#bbShop .ssCard[data-tier="세트"]::after{content:'';position:absolute;top:0;bottom:0;width:30%;left:-40%;pointer-events:none;background:linear-gradient(100deg,transparent,#fff3c033,transparent);animation:ui65shine 3.4s ease-in-out infinite}
 #bbShop .ssCard[data-tier="세트"]::before{content:'SALE';position:absolute;top:8px;right:-24px;transform:rotate(35deg);background:#ff4d6d;color:#fff;font:900 9px/1 ${F};letter-spacing:.1em;padding:3px 26px;box-shadow:0 2px 6px #0008}
 #bbShop .ssCard[aria-pressed=true]{border-color:#ffe58a!important;box-shadow:0 0 0 2px #ffe58a66,0 10px 26px #0009!important}
 #bbShop .ssCard canvas{border-radius:10px;box-shadow:inset 0 0 0 1px #ffffff14}
 #bbShop .ssSec{display:flex;align-items:center;gap:8px;font-weight:900!important;letter-spacing:.08em}
 #bbShop .ssSec::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,#ffffff26,transparent)}
 #bbShop .ssPromise{font-size:11.5px!important;line-height:1.6!important;opacity:.85;border-radius:14px!important}
 /* 폰: 머리띠 한 줄 · 탭 가로 스크롤 · 닫기 단추 오른쪽 위 */
 @media (max-width:760px){
  #bbShop .ssHead{padding:12px 56px 10px 14px!important;gap:8px!important}
  #bbShop .ssHead h2{font-size:18px!important}
  #bbShop .ssTabs{order:3;width:100%;flex-wrap:nowrap!important;overflow-x:auto;scrollbar-width:none;padding-bottom:2px;-webkit-mask:linear-gradient(90deg,#000 88%,transparent)}
  #bbShop .ssTabs::-webkit-scrollbar{display:none}
  #bbShop .ssTabs button{flex:none!important;padding:7px 12px!important;font-size:12px!important}
  #bbShop .ssX{position:absolute;top:12px;right:12px;width:36px;height:36px}
  #bbShop .ssPrice{font-size:26px!important}
  #bbShop .ssBuy{flex-wrap:wrap}#bbShop .ssBuy .ssBtn{flex:1 1 40%}}
 `;
 const st=document.createElement('style');st.id='ui65';st.textContent=css;document.head.appendChild(st);

 /* 설정: 칸마다 한 줄 설명 + 왼쪽 위 요약 카드 */
 const DESC={cfS0:'소리 크기와 박자 싱크를 맞춰요. 박자가 화면과 어긋나 들리면 싱크를 조절해 보세요.',cfS1:'바꾸고 싶은 동작을 누른 뒤 새 키를 눌러요. 한 동작에 키를 여러 개 둘 수 있어요.',cfS2:'로비 배경 · 난이도 · 그래픽 · 영상 녹화를 고를 수 있어요.',cfS3:'이름과 대표 캐릭터 · 기록을 확인해요.'};
 function decoSet(){for(const id in DESC){const sec=document.getElementById(id);if(!sec||sec.querySelector('.ui65d'))continue;const h=sec.querySelector('h3');if(!h)continue;const p=document.createElement('p');p.className='ui65d';p.textContent=DESC[id];h.after(p)}
  const nav=document.getElementById('cfNav');if(!nav)return;let c=document.getElementById('ui65card');
  if(!c){c=document.createElement('div');c.id='ui65card';c.innerHTML='<canvas width="40" height="48"></canvas><div><b></b><small></small></div>';nav.prepend(c)}
  try{const inv=shopInv(),ch=(typeof CHARS!=='undefined'&&CHARS[inv.eq.ch])||{},a=(window.ACCT55&&ACCT55.get())||{};
   let nm='하루';try{nm=(typeof PNAME==='function'?PNAME():saveData.name)||ch.name||'하루'}catch(e){}
   c.querySelector('b').textContent=nm;c.querySelector('small').innerHTML='🪙 '+(inv.coins||0).toLocaleString()+' · 난이도 '+({easy:'쉬움',normal:'보통',hard:'어려움',extreme:'익스트림'}[diff]||diff)+'<br>'+(a.token?'☁ '+a.user+' 저장 중':'로그인하면 기록이 저장돼요');
   const cv=c.querySelector('canvas'),x=cv.getContext('2d');x.clearRect(0,0,40,48);x.imageSmoothingEnabled=false;x.drawImage(ch2Render((inv.eq&&inv.eq.ch)||0,Math.floor(performance.now()/300)%2?0:0,0,false,performance.now()),0,0)}catch(e){}}
 {const base=gmShow;gmShow=function(k){const r=base.apply(this,arguments);if(k==='set')setTimeout(decoSet,0);return r}}
 setInterval(()=>{const g=document.getElementById('gmSet');if(g&&g.classList.contains('on'))decoSet()},1500);
 /* 소리 스위치: 글자(ON/OFF)를 읽어 꺼짐 표시 */
 function syncSound(){const b=document.getElementById('gmSound2');if(!b)return;const off=/OFF|꺼/.test(b.textContent);b.classList.toggle('ui65off',off)}
 setInterval(syncSound,400);
 window.UI65={syncSound};
}catch(e){console.error('v65 ui',e)}})();
