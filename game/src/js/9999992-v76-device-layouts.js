/* ================= v76 기기별 배치 (DV76) =================
   컴퓨터 · 노트북 · 패드 · 휴대폰을 따로 판단해서 <html>에 표시를 붙이고, 기기마다 배치를 다르게 한다.
   - dvPhone : 휴대폰(999995의 ph와 같음). 배치는 999995(폰 전용) · 999999(세로 전투) · 9999991(가로 메뉴)이 맡는다.
   - dvPad   : 손가락 화면인데 휴대폰보다 큰 것(아이패드 · 갤럭시 탭). 누르기 쉽게 단추 · 목록을 크게,
               세로 전투는 게임 화면을 위로 붙이고 아래 넓은 자리를 조작 칸으로.
   - dvLap   : 마우스 화면인데 폭 1600 이하 또는 높이 900 이하(노트북). 높이가 낮으니 목록 · 단추를 촘촘하게.
   - dvDesk  : 그보다 큰 모니터(컴퓨터). 기본 디자인에 목록을 조금 크게.
   방향은 dvL(가로) · dvP(세로). */
(()=>{try{
 const root=document.documentElement,K=['dvPhone','dvPad','dvLap','dvDesk'];
 function kind(){const w=innerWidth,h=innerHeight,coarse=matchMedia('(pointer:coarse)').matches,fine=matchMedia('(pointer:fine)').matches;
  if(root.classList.contains('ph'))return 'dvPhone';
  if(coarse&&!fine)return 'dvPad';
  return (w<=1600||h<=900)?'dvLap':'dvDesk'}
 function apply(){const k=kind();for(const c of K)root.classList.toggle(c,c===k);root.classList.toggle('dvL',innerWidth>innerHeight);root.classList.toggle('dvP',innerWidth<=innerHeight);window.DV76.kind=k}
 window.DV76={kind:'',apply};
 addEventListener('resize',()=>setTimeout(apply,30));addEventListener('orientationchange',()=>setTimeout(apply,300));apply();setTimeout(apply,500);

 const st=document.createElement('style');st.id='dv76';st.textContent=`
 /* ======== 컴퓨터(큰 모니터) ======== */
 html.dvDesk #lvSet{width:min(400px,28vw)!important;gap:8px!important;bottom:46px!important;justify-content:space-between!important}/* v111: 목록이 화면 아래(안내 줄 위)까지 고르게 */
 html.dvDesk .lvI{padding:10px 14px!important}
 html.dvDesk .lvI b{font-size:22px!important}html.dvDesk .lvI.sel b{font-size:30px!important}
 html.dvDesk .lvI small{font-size:10.5px!important}

 /* ======== 노트북(높이가 낮은 화면) ======== */
 html.dvLap #lvSet{width:min(350px,31vw)!important;bottom:46px!important;justify-content:space-between!important;gap:2px!important;top:2px!important;padding:6px 8px 8px!important;border-radius:14px;
  background:linear-gradient(90deg,#05070cd0,#05070c90 70%,transparent)!important}
 html.dvLap .lvI{padding:5px 10px!important}
 html.dvLap .lvI b{font-size:17px!important}html.dvLap .lvI.sel b{font-size:22px!important}
 html.dvLap .lvI small{font-size:9px!important}
 html.dvLap #gameMenu .gmHud>*{height:32px!important;font-size:12px!important}
 html.dvLap #gmSet.cfFull #gmSetPanel{inset:58px 14px 12px!important}
 html.dvLap #battleView .bar{min-height:0!important;padding-top:2px!important;padding-bottom:2px!important}

 /* ======== 패드 ======== */
 /* 로비: 손가락으로 누르기 쉬운 큰 목록, 무대 위에 겹쳐도 읽히게 반투명 판 */
 html.dvPad.dvL #lvSet{width:min(380px,34vw)!important;bottom:auto!important;gap:6px!important;padding:10px!important;border-radius:18px;background:#05070cb8!important;backdrop-filter:blur(8px)}
 html.dvPad .lvI{min-height:56px;padding:8px 14px!important;border-radius:14px!important}
 html.dvPad .lvI b{font-size:21px!important}html.dvPad.dvL .lvI.sel b{font-size:25px!important}
 html.dvPad #gameMenu .gmHud>*{min-height:44px!important;min-width:44px}
 html.dvPad .gmBtn,html.dvPad #shopModal button,html.dvPad #gmSet button{min-height:44px}
 html.dvPad #lvGoBtn{min-height:72px!important;font-size:24px!important}
 /* 전투: 누르는 단추를 크게(패드는 손가락이 화면 끝까지 멀어서) */
 html.dvPad .tbtn{zoom:1.3}
 /* 세로 패드 전투: 게임 화면은 위로, 아래 넓은 자리는 조작 칸 */
 html.dvPad.dvP #battleView{justify-content:flex-start!important;padding-top:max(8px,env(safe-area-inset-top))!important}
 html.dvPad.dvP #battleView .bar{order:-1}
 html.dvPad.dvP #battleView #arena{margin-top:6px!important}
 html.dvPad.dvP .tbtn{zoom:1.55}
 /* 세로 패드 메뉴: 설정 판을 위아래로 */
 html.dvPad.dvP #gmSet.cfFull #gmSetPanel{grid-template-columns:1fr!important;grid-template-rows:auto 1fr!important}
 html.dvPad.dvP #gmSet #cfNav{flex-direction:row!important;overflow-x:auto}
 `;document.head.appendChild(st);
}catch(e){console.error('v76 device',e)}})();
