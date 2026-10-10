/* v150: 폰 · 패드 ☰ 빠른 설정 · 결투 창 · 결투 등급표 (QP150) — 사용자가 보내 준 그림을 참고
   - ☰ 창(#more98): 위에 「빠른 설정」 제목 + ✕. 가로는 왼쪽(켜고 끄기) · 오른쪽(랭킹 · 영상관 같은 이동) 두 칸, 화면 가운데.
   - 결투 창(#duo85 .dPv): 가로는 왼쪽 빠른 대전(그림 옆에 규칙 · 등급 · 랭킹 · 전적 · 큰 단추) · 오른쪽 친구 대전을 한 화면에.
     세로는 v149 탭(빠른 대전 | 친구 대전)으로 한쪽씩.
   - 결투 등급표(#pvLad102): 가로는 왼쪽(브론즈) → 오른쪽(마스터)으로 눕혀서 한 화면에. 아래에 「현재 등급」 막대.
   - 이 창들 안의 이모지도 도트 그림으로(SO149.iconize). */
(function(){try{
 const RT=document.documentElement;
 const st=document.createElement('style');st.id='qp150css';st.textContent=`
 /* ── 빠른 설정 ── */
 #more98 .qh150{display:none}
 html.lp #more98 .qh150{display:flex;align-items:center;gap:8px;padding:2px 2px 6px;margin-bottom:2px}
 html.lp #more98 .qh150 b{flex:1;font-size:17px;font-weight:900;color:#e8f4ef}
 html.lp #more98 .qh150 button{width:32px;height:32px;border-radius:10px;border:1px solid #ffffff22;background:#ffffff0c;color:#cfe;font:inherit;font-size:16px;font-weight:900;cursor:pointer}
 html.lp #more98{border-radius:18px!important;border:1px solid #7fd8ff55!important;box-shadow:0 0 20px #3fa8ff33,0 14px 40px #000c!important}
 html.lp #more98 .m98d button.on{box-shadow:0 0 10px var(--dc)}
 html.lp #more98 .m98{border-radius:13px!important;min-height:48px}
 html.lpL #more98:not([hidden]){left:50%!important;top:50%!important;transform:translate(-50%,-50%);width:min(620px,calc(100vw - 32px))!important;max-height:calc(100dvh - 20px)!important;
  display:grid!important;grid-template-columns:1fr 1fr;grid-auto-flow:row dense;align-content:start;column-gap:8px;animation:none!important}
 html.lpL #more98 .qh150,html.lpL #more98 .m98d{grid-column:1/-1}
 html.lpL #more98 .m98{min-height:38px!important;padding:3px 10px!important;margin:0 0 5px!important}
 html.lpL #more98 .m98 small{font-size:10px!important}
 html.lpL #more98 .m98d>span{display:none!important}
 html.lpL #more98 .m98d{padding-bottom:6px!important}
 html.lpL #more98 .qh150{padding-bottom:2px}
 html.lpL #more98 .m98.t150{grid-column:1}
 html.lpL #more98 .m98.l150{grid-column:2}
 /* ── 결투 창 (가로) ── */
 html.lpL #duo85 .dP.dPv.wide{width:min(940px,calc(100vw - 20px))!important;max-height:calc(100dvh - 12px)!important;overflow-y:auto!important;padding:10px 12px!important}
 html.lpL #duo85 .dPv .dHd{margin-bottom:6px!important}
 html.lpL #duo85 .dPv .dCols{grid-template-columns:minmax(0,1.45fr) minmax(0,1fr)!important;gap:10px!important}
 html.lpL #duo85 .dPv .dCol{padding:8px 10px!important}
 html.lpL #duo85 .dPv .pvQ{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:6px 10px;align-content:start}
 html.lpL #duo85 .dPv .pvQ>h4,html.lpL #duo85 .dPv .pvQ>.pvRank,html.lpL #duo85 .dPv .pvQ>.pvGo{grid-column:1/-1}
 html.lpL #duo85 .dPv .pvArt{grid-column:1;width:100%!important;height:96px!important;object-fit:cover;border-radius:10px}
 html.lpL #duo85 .dPv .pvRule{grid-column:2;margin:0!important;font-size:11.5px!important;align-self:center}
 html.lpL #duo85 .dPv .pvTop{grid-column:1;margin:0!important}
 html.lpL #duo85 .dPv .pvTop small{display:none}
 html.lpL #duo85 .dPv .pvRec{grid-column:2;margin:0!important}
 html.lpL #duo85 .dPv .pvGo{height:52px!important;font-size:19px!important}
 html.lpL #duo85 .dPv .pvTip{font-size:11px!important}
 /* 결투 큰 단추 */
 html.lp #duo85 .dPv .pvGo{background:linear-gradient(180deg,#ff8aa8,#f0386a)!important;color:#fff!important;border:2px solid #ffc0d0!important;box-shadow:0 0 16px #ff5a8a66!important}
 html.lp #duo85 .dPv .pvMk{background:linear-gradient(180deg,#c8a0ff,#8a4ae8)!important;color:#fff!important}
 html.lp #duo85 .dPv .pvTop{background:linear-gradient(180deg,#ffe07a,#f0b02e)!important;color:#3a2200!important;font-weight:900}
 /* ── 등급표 ── */
 #pvLad102 .cur150{display:none}
 html.lp #pvLad102 .cur150{display:flex;align-items:center;gap:10px;margin:0 12px 10px;padding:8px 12px;border-radius:12px;background:#ffffff08;border:1px solid var(--lc,#ffffff33)}
 html.lp #pvLad102 .cur150 b{color:var(--lc);font-size:14px;white-space:nowrap}
 html.lp #pvLad102 .cur150 .pb{flex:1;height:8px;border-radius:5px;background:#ffffff18;overflow:hidden}
 html.lp #pvLad102 .cur150 .pb i{display:block;height:100%;background:linear-gradient(90deg,var(--lc),#fff)}
 html.lp #pvLad102 .cur150 small{color:#cfd8e0;white-space:nowrap}
 html.lpP #pvLad102 .lp{width:calc(100vw - 16px)!important;max-height:calc(100dvh - 16px)!important}
 html.lpL #pvLad102 .lp{width:calc(100vw - 20px)!important;max-height:calc(100dvh - 12px)!important}
 html.lpL #pvLad102 .lh{padding:8px 14px!important}
 html.lpL #pvLad102 .lf{display:none}
 html.lpL #pvLad102 .ll{flex-direction:row-reverse!important;overflow-x:hidden!important;overflow-y:hidden!important;padding:6px 10px 8px!important;gap:0}
 html.lpL #pvLad102 .lrow{flex:1 1 0;min-width:0;display:flex!important;flex-direction:column;justify-content:flex-end;min-height:0!important;margin:0!important;position:relative}
 html.lpL #pvLad102 .lrow .cL:empty,html.lpL #pvLad102 .lrow .cR:empty{display:none}
 html.lpL #pvLad102 .lrow .cL,html.lpL #pvLad102 .lrow .cR{order:1;min-height:0!important}
 html.lpL #pvLad102 .lrow .nd{order:2;height:22px;flex:none}
 html.lpL #pvLad102 .lrow .nd::before{content:'';position:absolute;left:0;right:0;top:50%;height:3px;margin-top:-1.5px;background:linear-gradient(90deg,#ffffff22,var(--lc),#ffffff22)}
 html.lpL #pvLad102 .lrow .nd>*{position:relative}
 /* 계단: 위 등급일수록 높게(DOM은 마스터가 먼저) */
 html.lpL #pvLad102 .ll{align-items:flex-end}
 html.lpL #pvLad102 .lrow{padding-bottom:26px}html.lpL #pvLad102 .lrow:nth-child(1){padding-bottom:66px}html.lpL #pvLad102 .lrow:nth-child(2){padding-bottom:58px}html.lpL #pvLad102 .lrow:nth-child(3){padding-bottom:50px}
 html.lpL #pvLad102 .lrow:nth-child(4){padding-bottom:42px}html.lpL #pvLad102 .lrow:nth-child(5){padding-bottom:34px}
 html.lpL #pvLad102 .lrow .nd{position:absolute;left:0;right:0;bottom:0}
 html.lpL #pvLad102 .lr{margin:0 4px!important;padding:6px 8px!important}
 html.lpL #pvLad102 .lr .rw span{display:none}
 html.lpL #pvLad102 .lr .tx small{white-space:nowrap;font-size:10px}
 html.lpL #pvLad102 .lr .em{width:30px!important;height:30px!important}`;
 document.head.appendChild(st);
 /* ☰ 창: 제목 · ✕, 켜고 끄는 줄과 이동하는 줄 표시 */
 function moreFix(){const p=document.getElementById('more98');if(!p||p.hidden||!RT.classList.contains('lp'))return;
  if(!p.querySelector('.qh150')){const h=document.createElement('div');h.className='qh150';h.innerHTML='<b>빠른 설정</b><button type="button" aria-label="닫기">✕</button>';
   h.querySelector('button').addEventListener('click',e=>{e.stopPropagation();p.hidden=true});p.insertBefore(h,p.firstChild)}
  p.querySelectorAll('.m98').forEach(b=>{const t=!!b.querySelector('u');b.classList.toggle('t150',t);b.classList.toggle('l150',!t)});
  try{window.SO149&&SO149.iconize(p)}catch(e){}}
 /* 등급표: 현재 등급 막대 */
 function ladFix(){const el=document.getElementById('pvLad102');if(!el||el.hidden||!RT.classList.contains('lp'))return;const lp=el.querySelector('.lp');if(!lp||lp.querySelector('.cur150'))return;
  const me=el.querySelector('.lrow.me');if(!me)return;const lc=getComputedStyle(me).getPropertyValue('--lc'),nm=(me.querySelector('.tx b')||{}).textContent||'',pb=me.querySelector('.pb i'),em=(me.querySelector('.lr>em')||{}).textContent||'',pt=(me.querySelector('.lr>u')||{}).textContent||'';
  const c=document.createElement('div');c.className='cur150';c.style.setProperty('--lc',lc);c.innerHTML='<b>현재 등급 · '+nm+'</b><small>'+pt.replace(/^나 · /,'')+'</small><div class="pb"><i style="width:'+(pb?pb.style.width:'100%')+'"></i></div><small>'+em+'</small>';
  const lf=lp.querySelector('.lf');lp.insertBefore(c,lf||null);try{window.SO149&&SO149.iconize(lp)}catch(e){}}
 function duoIcons(){const b=document.getElementById('duo85');if(!b||b.hidden||!RT.classList.contains('lp'))return;const P=b.querySelector('.dP');if(!P||P.dataset.i150)return;P.dataset.i150=1;try{window.SO149&&SO149.iconize(P)}catch(e){}}
 const W={more98:moreFix,pvLad102:ladFix,duo85:duoIcons};
 function watch(id){const box=document.getElementById(id);if(!box||box.dataset.w150)return;box.dataset.w150=1;const run=()=>{try{W[id]()}catch(e){}};new MutationObserver(run).observe(box,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});run()}
 setInterval(()=>{for(const id in W)watch(id)},600);
 window.QP150={v:1};
}catch(e){console.warn('v150',e)}})();
