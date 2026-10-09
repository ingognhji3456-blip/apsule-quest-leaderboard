/* ================= v76 폰 세로 전투 화면 (PV76) =================
   세로 폰에서는 480×300 화면이 위쪽에 작게만 나와서 불편했다. 세로일 때만:
   ① 가운데 큰 화면: 원래 게임 그림에서 캐릭터 주변을 잘라 확대해 보여 준다(위아래는 경기장 전체, 좌우는 캐릭터를 따라감).
      보스전에서는 보스 쪽으로 조금 당겨서 보스도 같이 보이게.
   ② 위 띠: 보스 체력바 · 탑 층 정보(원래 그림의 맨 위 줄을 그대로 옮김)
   ③ 아래 띠: 내 체력 · 대시 · 궁극기 · 점수 · 박자(원래 그림의 맨 아래 줄을 그대로 옮김)
   ④ 작은 지도: 오른쪽 위에 경기장 전체를 작게(지금 보이는 곳은 흰 네모) — 화면 밖 공격도 보인다.
   원래 캔버스(#game)는 그대로 그려지고 보이지만 않는다. 화면을 누르는 것(그로기 때 약점 누르기)은 게임 좌표로 바꿔서 그대로 전달.
   가로 폰 · 컴퓨터는 바뀌지 않는다. */
(()=>{try{
 const root=document.documentElement,bv=$('battleView'),arena=$('arena'),cv=$('game');if(!bv||!arena||!cv)return;
 const V={on:false,cx:240,k:2,sw:200,sh:258,sy:30,vh:400,tH:34,snap:0};
 /* 정보 칸(HUD)을 그리기 직전 그림을 따로 떠 둔다 → 큰 화면에서는 정보 칸 자리를 이 그림으로 덮어 겹쳐 보이지 않게 */
 const clean=document.createElement('canvas');
 function snap(){if(!V.on)return;if(clean.width!==cv.width||clean.height!==cv.height){clean.width=cv.width;clean.height=cv.height}const c=clean.getContext('2d');c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,clean.width,clean.height);c.drawImage(cv,0,0);V.snap=V.fid}
 V.fid=0;
 {const f=drawFightHUD;drawFightHUD=function(){try{snap()}catch(e){}return f.apply(this,arguments)}}
 {const f=drawPlayerHUD;drawPlayerHUD=function(){try{if(mode==='tower')snap()}catch(e){}return f.apply(this,arguments)}}
 const mk=(id,tag)=>{const e=document.createElement(tag||'canvas');e.id=id;return e};
 const top=mk('pvTop'),bot=mk('pvBot'),view=mk('pvView'),mini=mk('pvMini');
 arena.parentNode.insertBefore(top,arena);arena.parentNode.insertBefore(bot,arena.nextSibling);arena.insertBefore(view,arena.firstChild);arena.appendChild(mini);
 const st=document.createElement('style');st.textContent=`
 #pvTop,#pvBot,#pvView,#pvMini{display:none}
 html.pv76 #pvTop,html.pv76 #pvBot{display:block;width:100%;height:auto;image-rendering:pixelated;flex:none}
 html.pv76 #pvView{display:block;position:absolute;inset:0;width:100%;height:100%;image-rendering:auto;touch-action:none}
 html.pv76 #pvMini{display:block;position:absolute;right:6px;top:6px;width:34%;height:auto;border:1px solid #ffffff55;border-radius:6px;box-shadow:0 4px 12px #000a;opacity:.85;pointer-events:none;z-index:3}
 html.pv76 #arena #game{opacity:0!important;pointer-events:none!important;position:absolute;inset:0;width:100%!important;height:100%!important}
 html.pv76 #arena{position:relative;flex:none;max-width:none!important;max-height:none!important;margin:0!important;overflow:hidden}
 html.pv76 #battleView{gap:0!important}
 /* 보스 공격 경고문: 더 투명하게(가로·세로 모두) */
 html body #banner.atk{background:#0b050766!important;border-top-color:#ff2d5599!important;border-bottom-color:#ff2d5599!important;box-shadow:none!important;text-shadow:0 1px 2px #000,0 0 6px #000!important}
 html body #banner.atk small{color:#ffd9a0dd!important;opacity:.9}
 html.pv76 #banner.atk{top:6px!important;font-size:13px!important}html.pv76 #banner.atk small{font-size:10px!important}`;document.head.appendChild(st);

 const active=()=>root.classList.contains('phP')&&!bv.hidden&&(mode==='boss'||mode==='tower')&&innerHeight>innerWidth;
 /* 화면 크기 정하기 */
 function layout(){const on=active();root.classList.toggle('pv76',on);V.on=on;if(!on)return;
  V.tH=mode==='boss'?50:34;const vw=innerWidth,bar=(bv.querySelector('.bar')||{}).offsetHeight||46,topH=Math.round(vw*V.tH/480),botH=Math.round(vw*66/480),ctrl=Math.min(300,innerHeight*.33);
  V.vh=Math.max(220,Math.min(innerHeight*.62,innerHeight-bar-topH-botH-ctrl));V.k=V.vh/V.sh;V.sw=vw/V.k;
  arena.style.width=vw+'px';arena.style.height=Math.round(V.vh)+'px';arena.style.setProperty('--u',(vw/W)+'px');
  const dpr=Math.min(2.5,devicePixelRatio||1);for(const [c,w,h] of [[view,vw,V.vh],[top,vw,topH],[bot,vw,botH]]){const ww=Math.round(w*dpr),hh=Math.round(h*dpr);if(c.width!==ww)c.width=ww;if(c.height!==hh)c.height=hh}
  mini.width=240;mini.height=150;try{applyHiRes(W*V.k)}catch(e){}}
 {const f=fitBattle;fitBattle=function(){const r=f.apply(this,arguments);try{layout()}catch(e){}return r}}
 addEventListener('resize',()=>setTimeout(()=>{try{layout()}catch(e){}},60));

 /* 매 화면: 원래 그림에서 잘라 옮기기 */
 function follow(){let x=(typeof P!=='undefined'&&P)?P.x:W/2;try{if(mode==='boss'&&G&&G.boss&&!G.cine)x=P.x*.62+G.boss.x*.38;else if(mode==='boss'&&G&&G.boss)x=G.boss.x}catch(e){}
  const want=Math.max(V.sw/2,Math.min(W-V.sw/2,x));V.cx+=(want-V.cx)*.12;if(!isFinite(V.cx))V.cx=W/2}
 function paint(){if(!V.on)return;follow();const sx=cv.width/W,sy=cv.height/H;
  const v=view.getContext('2d');v.imageSmoothingEnabled=false;v.drawImage(cv,(V.cx-V.sw/2)*sx,V.sy*sx,V.sw*sx,V.sh*sy,0,0,view.width,view.height);
  const t=top.getContext('2d');t.imageSmoothingEnabled=false;t.drawImage(cv,0,0,cv.width,V.tH*sy,0,0,top.width,top.height);
  /* 정보 칸 자리 덮기: 위(보스 이름·체력 줄 ~50)와 아래(내 체력·궁극기·점수·박자 H-62~) */
  if(V.snap===V.fid){const x0=(V.cx-V.sw/2),ky=view.height/V.sh,kx=view.width/V.sw;
   for(const [a,b2] of [[0,mode==='boss'?50:0],[H-62,H]]){const y0=Math.max(a,V.sy),y1=Math.min(b2,V.sy+V.sh);if(y1<=y0)continue;
    v.drawImage(clean,x0*sx,y0*sy,V.sw*sx,(y1-y0)*sy,0,(y0-V.sy)*ky,view.width,(y1-y0)*ky)}}
  const b=bot.getContext('2d');b.imageSmoothingEnabled=false;b.fillStyle='#05070a';b.fillRect(0,0,bot.width,bot.height);b.drawImage(cv,0,(H-66)*sy,cv.width,66*sy,0,0,bot.width,bot.height);
  const m=mini.getContext('2d');m.imageSmoothingEnabled=true;m.drawImage(cv,0,0,cv.width,cv.height,0,0,240,150);m.strokeStyle='#ffffff';m.lineWidth=3;m.strokeRect((V.cx-V.sw/2)/W*240,V.sy/H*150,V.sw/W*240,V.sh/H*150)}
 {const f=frame;frame=function(){V.fid++;const r=f.apply(this,arguments);try{if(active()!==V.on||(V.on&&V.tH!==(mode==='boss'?50:34)))layout();paint()}catch(e){}return r}}

 /* 큰 화면을 누르면 게임 좌표로 바꿔서 원래처럼 */
 view.addEventListener('pointerdown',e=>{if(!V.on||(mode!=='boss'&&mode!=='cave')||dlg.active)return;e.preventDefault();const r=view.getBoundingClientRect(),gx=V.cx-V.sw/2+(e.clientX-r.left)/r.width*V.sw,gy=V.sy+(e.clientY-r.top)/r.height*V.sh;try{doAttack({x:gx,y:gy})}catch(_){}});
 window.PV76={V,layout,active,paint};
}catch(e){console.error('v76 portrait',e)}})();
