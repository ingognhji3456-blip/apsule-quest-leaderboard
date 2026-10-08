/* ================= v76 폰 가로 메뉴 한 화면 맞춤 (PL76) =================
   폰 가로(html.phL)에서 메뉴 화면을 아래로 내려 보지 않고 한 화면에 다 들어오게 배치를 바꾼다.
   - 태엽 공방(#shopModal): 위아래로 쌓던 것을 좌우 두 칸으로(왼쪽 = 무대 · 정보 · 장착 단추, 오른쪽 = 탭 · 물건 목록).
     물건 목록만 그 칸 안에서 넘긴다.
   - 설정(#gmSet): 탭을 왼쪽 세로 목록으로, 오른쪽에 내용을 촘촘하게(제목 · 줄 높이 줄임).
   - 명예의 전당(#gmHall): 왼쪽 단추 줄이 제목을 가리지 않게 제목 · 범례를 오른쪽으로 비킨다.
   컴퓨터 · 폰 세로는 그대로. */
(()=>{try{
 const st=document.createElement('style');st.id='pl76';st.textContent=`
 /* ---------- 태엽 공방 ---------- */
 html.phL #shopModal.wsFull{display:flex!important;flex-direction:column}
 html.phL #shopModal.wsFull .rushBar{flex:none;padding:6px 12px!important}
 html.phL #shopModal.wsFull #wsMain#wsMain{flex:1 1 0;min-height:0;display:grid!important;grid-template-columns:minmax(0,.9fr) minmax(0,1.25fr);grid-template-rows:minmax(0,1fr);gap:10px;padding:8px 10px 10px!important;overflow:hidden!important}
 html.phL #shopModal.wsFull #wsMain>*{min-height:0}
 html.phL #shopModal.wsFull #wsLeft#wsLeft{display:flex;flex-direction:column;gap:6px;overflow:hidden!important;min-height:0}
 html.phL #shopModal.wsFull #wsStageBox{flex:1 1 0!important;min-height:70px;display:flex;align-items:center;justify-content:center}
 html.phL #shopModal.wsFull #wsStageBox #wsCv{height:100%!important;width:auto!important;max-width:100%}
 html.phL #shopModal.wsFull #wsBubble{display:none!important}
 html.phL #shopModal.wsFull #wsInfo{flex:none;padding:8px 10px!important}
 html.phL #shopModal.wsFull #wsInfo .wsSub{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:11px!important;margin:2px 0 4px!important}
 html.phL #shopModal.wsFull #wsInfo .wsRow{margin:2px 0!important}
 html.phL #shopModal.wsFull #wsBtn{margin-top:6px!important;padding:8px!important;min-height:0!important}
 html.phL #shopModal.wsFull #wsRight#wsRight{display:flex;flex-direction:column;overflow:hidden!important;min-height:0}
 html.phL #shopModal.wsFull #wsRight .shopTabs{flex:none;grid-template-columns:repeat(4,1fr)!important;padding:8px 8px 4px!important;gap:5px!important}
 html.phL #shopModal.wsFull #wsRight .shopTab{padding:7px 4px!important;font-size:12px!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 html.phL #shopModal.wsFull #wsRight .rushBody{flex:1 1 0;min-height:0;overflow:auto!important;padding:6px 8px 8px!important;scrollbar-width:thin}
 html.phL #shopModal.wsFull #shopGrid{grid-template-columns:repeat(auto-fill,minmax(84px,1fr))!important}
 /* 스킨 상점(#bbShop)도 같은 화면 안에서 */
 html.phL #bbShop{max-height:100%;overflow:auto}

 /* ---------- 설정 ---------- */
 html.phL #gmSet.cfFull .gmHead{margin:0!important}
 html.phL #gmSet.cfFull #gmSetPanel#gmSetPanel{inset:50px 10px 8px!important;display:grid!important;grid-template-columns:168px minmax(0,1fr)!important;grid-template-rows:minmax(0,1fr)!important;gap:10px!important;padding:8px!important}
 html.phL #gmSet #cfNav#cfNav{flex-direction:column!important;overflow:auto!important;padding:6px!important;gap:6px!important;min-height:0}
 html.phL #gmSet #cfNav #ui65card{display:none!important}
 html.phL #gmSet #cfNav .cfLever{grid-template-columns:8px 22px 1fr!important;padding:9px 8px!important;flex:none;white-space:nowrap;font-size:14px!important}
 html.phL #gmSet #cfNav .cfLever:hover{transform:none}
 html.phL #gmSet #cfBody#cfBody{min-height:0;overflow:auto!important;padding:8px 12px!important}
 html.phL #gmSet .cfSec h3{font-size:16px!important;padding:6px 12px!important;margin:0 0 6px!important}
 html.phL #gmSet .cfSec h3 small{display:none}
 html.phL #gmSet .cfSec>p,html.phL #gmSet .cfSec .cfDesc,html.phL #gmSet .cfSec>.ui65desc{font-size:11px!important;margin:0 0 6px!important}
 html.phL #gmSet .cfSec .cfg{padding:6px 12px!important;margin:0 0 6px!important;min-height:0!important}
 html.phL #gmSet .cfSec .cfIn{gap:6px!important}

 /* ---------- 명예의 전당 ---------- */
 html.phL #gmHall #hfTop{left:104px!important;top:10px!important;flex-direction:row!important}
 html.phL #gmHall .hfLeg{left:104px!important}
 html.phL #gmHall #hfNav{top:44px!important;left:8px!important;max-height:calc(100% - 52px)!important}
 html.phL #gmHall .hfTitle{white-space:nowrap}
 `;document.head.appendChild(st);
}catch(e){console.error('v76 phone land menus',e)}})();
