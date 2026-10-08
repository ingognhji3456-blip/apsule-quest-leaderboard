/* ===== mobile.js : 모바일 편의 — 자동 전체화면(브라우저 경고) 제거 · 가로/세로 레이아웃 정리 · 러시 패널 닫기 ===== */
const MB={short:()=>innerHeight<=500&&innerWidth>innerHeight,port:()=>innerWidth<innerHeight&&innerWidth<=600};
/* 1) 자동 전체화면 끄기 → 브라우저 '전체 화면을 종료하려면…' 경고가 안 뜸. 대신 화면을 꽉 채우는 가짜 전체화면 */
try{goFullscreen._tried=1}catch(e){}
enterGame=function(){document.body.classList.add('inBattle');$('battleView').hidden=false;const tch=document.body.classList.contains('touch')||'ontouchstart' in window;if(tch){document.body.classList.add('pseudoFS')/* v68: 저절로 전체화면 켜지 않음 (⛶ 단추로만) */}fitBattle()};
/* v68: 처음 화면을 누를 때 저절로 전체화면 켜던 것을 없앰 → 「전체 화면을 종료하려면…」 안내가 뜨지 않는다. 전체화면은 ⛶ 단추로만 */
/* 전투 화면 크기: 가로로 눕힌 폰에서는 위 막대를 화면 위에 띄우고 높이를 끝까지 씀 */
fitBattle=function(){
 const v=$('battleView');if(!v||v.hidden)return;
 const w=v.clientWidth||innerWidth,h=v.clientHeight||innerHeight;
 const mobile=(navigator.maxTouchPoints>0||document.body.classList.contains('touch')||matchMedia('(pointer:coarse)').matches)&&w>h;
 v.classList.toggle('mobileWide',mobile);
 // One uniform scale preserves square pixels, circles, text and character proportions.
 const a=$('arena'),s=Math.max(.01,Math.min((mobile?w:w-8)/W,(mobile?h:h-42)/H));
 const aw=W*s,ah=H*s;
 a.style.width=aw+'px';a.style.height=ah+'px';a.style.setProperty('--u',Math.min(aw/W,ah/H)+'px');
 try{applyHiRes(aw)}catch(e){}
};
// Re-evaluate after both browser fullscreen and orientation transitions settle.
for(const event of ['resize','orientationchange','pageshow'])addEventListener(event,()=>{requestAnimationFrame(()=>fitBattle());setTimeout(()=>fitBattle(),300)});
for(const event of ['fullscreenchange','webkitfullscreenchange'])document.addEventListener(event,()=>{requestAnimationFrame(()=>fitBattle());setTimeout(()=>fitBattle(),300)});
if(window.visualViewport)visualViewport.addEventListener('resize',()=>fitBattle());

addEventListener('resize',()=>{try{fitBattle()}catch(e){}});
/* 2) 러시: 패턴·기록 패널 — 닫기 버튼, 바깥 누르면 닫힘, 칩을 누르면 대처법 */
function mbRushFix(){const s=$('gmRush'),L=$('rqLeft');if(!s||!L)return;if(!$('mbDetX')){const x=document.createElement('button');x.id='mbDetX';x.className='gmBtn';x.textContent='✕ 닫기';x.onclick=e=>{e.stopPropagation();s.classList.remove('detOpen');try{gmSfx('back')}catch(_){}};L.prepend(x)}
 if(!s._mbDoc){s._mbDoc=1;const cv=$('rqStage');if(cv)cv.addEventListener('pointerdown',()=>{if(s.classList.contains('detOpen'))s.classList.remove('detOpen')},true);
  s.addEventListener('click',e=>{const ch=e.target.closest&&e.target.closest('#gmRushDet .rpChip');if(!ch)return;const tip=ch.getAttribute('title')||'';let t=document.querySelector('#gmRushDet .rpTip');if(!t){t=document.createElement('div');t.className='rpTip';ch.parentNode.after(t)}t.textContent='💡 '+ch.textContent.replace(/\dP$/,'')+': '+tip;document.querySelectorAll('#gmRushDet .rpChip').forEach(c=>c.classList.toggle('mbOn',c===ch));try{gmSfx('move')}catch(_){}})}
 const b=$('rqDetBtn');if(b)b.textContent=s.classList.contains('detOpen')?'✕ 패턴 닫기':'📋 패턴 · 기록'}
{const _gs=gmShow;gmShow=function(scr){const r=_gs.apply(this,arguments);try{if(scr==='rush')setTimeout(mbRushFix,30)}catch(e){}return r}}
new MutationObserver(()=>{try{const s=$('gmRush'),b=$('rqDetBtn');if(s&&b){const t=s.classList.contains('detOpen')?'✕ 패턴 닫기':'📋 패턴 · 기록';if(b.textContent!==t)b.textContent=t}}catch(e){}}).observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:['class']});
{const _rd=rpDetail;rpDetail=function(){const r=_rd.apply(this,arguments);try{const h=document.querySelector('#gmRushDet .rpHint');if(h)h.textContent=h.textContent.replace('이름에 마우스를 올리면 대처법','이름을 누르면 대처법')}catch(e){}return r}}
/* 가로로 눕힌 폰: 화면을 넓은 가상 화면(높이 약 420)으로 그려서 한 화면에 다 들어가게 */
function mbVP(){const meta=document.querySelector('meta[name=viewport]');if(meta)meta.setAttribute('content','width=device-width,initial-scale=1,viewport-fit=cover');requestAnimationFrame(()=>fitBattle())}
mbVP();addEventListener('resize',()=>{clearTimeout(mbVP._t);mbVP._t=setTimeout(mbVP,120)});addEventListener('orientationchange',()=>setTimeout(mbVP,300));
/* 메뉴에서 한 번만 전체화면 (전투를 나가도 유지 → 브라우저 안내는 처음 한 번만) */
function mbFsChip(){const h=document.querySelector('#gameMenu .gmHud');if(!h||$('mbFs'))return;const b=document.createElement('button');b.id='mbFs';b.className='gmBtn';b.style.cssText='padding:7px 12px;font-size:13px';const upd=()=>{b.textContent=fsElem()?'⛶ 창 모드':'⛶ 전체화면'};upd();
 b.onclick=()=>{if(fsElem()){try{(document.exitFullscreen||document.webkitExitFullscreen).call(document)}catch(e){}}else goFullscreen()};document.addEventListener('fullscreenchange',upd);document.addEventListener('webkitfullscreenchange',upd);h.appendChild(b)}
{const _gs=gmShow;gmShow=function(scr){const r=_gs.apply(this,arguments);try{mbFsChip()}catch(e){}return r}}
/* 3) 스타일 */
(function(){const st=document.createElement('style');st.id='mbCss';st.textContent=`

 #battleView.mobileWide{padding:0!important;gap:0!important;align-items:center!important;justify-content:center!important;overflow:hidden}
 #battleView.mobileWide .bar{position:absolute;top:max(4px,env(safe-area-inset-top));right:max(6px,env(safe-area-inset-right));left:auto;z-index:60;width:auto;background:transparent;padding:0;gap:4px}
 #battleView.mobileWide .bar #bvTitle{display:none}
 #battleView.mobileWide .bar button{font-size:11px;padding:4px 8px;opacity:.75}
 #battleView.mobileWide #stickZone{top:0}
 #battleView.mobileWide #arena{margin:0;max-width:none;max-height:none}
 #mbDetX{display:none}
 #gmRushDet .rpChip{cursor:pointer}#gmRushDet .rpChip.mbOn{box-shadow:0 0 0 2px var(--bc,#a6f5c6)}
 @media (max-width:1000px){#gmRush.detOpen #mbDetX{display:block;position:sticky;top:0;margin:4px 4px 6px auto;z-index:2;font-size:12px;padding:6px 12px}
  #gmRush.detOpen::after{content:'';position:absolute;inset:0;background:#0008;z-index:5;pointer-events:none}}
 /* ── 세로 폰 ── */
 @media (orientation:portrait) and (max-width:600px){
  #gameMenu .gmTop{padding:8px 10px 2px;gap:6px}
  #gameMenu .gmHud{gap:4px;flex-wrap:nowrap;width:100%;justify-content:space-between}
  #gameMenu .gmHud>*{font-size:11px!important;padding:5px 7px!important;white-space:nowrap;min-width:0;flex:0 1 auto;letter-spacing:0}
  #gameMenu .gmLogo{font-size:24px}
  #gmRush.rqFull .gmHead{top:8px;left:10px;right:10px;font-size:18px;gap:6px}
  #gmRush.rqFull .gmHead .gmBtn{font-size:12px;padding:6px 10px}
  #gmRush.rqFull .gmTabs{gap:4px}#gmRush.rqFull .gmTabs .gmPill{font-size:11px;padding:6px 8px}
  #gmRush.rqFull .gmPrev{bottom:92px;max-height:42%}
  #gmRush.rqFull #gmGrid .gmTile{flex-basis:54px;width:54px}
  #rqLeft{top:100px!important;bottom:92px;max-height:none!important}
 }
 /* ── 가로로 눕힌 폰 (높이 500px 이하) ── */
 @media (orientation:landscape) and (max-height:500px){
  #gameMenu .gmTop{padding:4px 12px 0;gap:8px;flex-wrap:nowrap}
  #gameMenu .gmLogo{font-size:22px;letter-spacing:.08em}#gameMenu .gmLogo small{font-size:7px;margin-top:2px;letter-spacing:.7em}
  #gameMenu .gmHud{gap:4px;flex-wrap:nowrap}#gameMenu .gmHud>*{font-size:11px!important;padding:4px 8px!important;white-space:nowrap}
  #gameMenu .gmFoot{display:none!important}
  #gameMenu .gmScreen{padding:4px 12px 8px}
  #gameMenu .gmHead{font-size:17px;margin:0 0 6px;gap:8px}#gameMenu .gmHead .gmBtn{font-size:12px;padding:5px 10px}
  /* 로비 */
  #lvSet{left:8px!important;right:auto!important;top:0!important;bottom:6px!important;width:min(300px,36vw)!important;gap:0!important;padding:4px!important;border-radius:12px;background:#000a;backdrop-filter:blur(6px);overflow-y:auto}
  .lvHd{display:none!important}.lvI{padding:3px 10px!important;gap:6px!important;grid-template-columns:22px 1fr auto!important}.lvI b{font-size:14px!important}.lvI.sel b{font-size:17px!important}.lvI small{display:none!important}.lvI em{font-size:10px!important;padding:2px 6px!important}.lvI.sel{transform:translateX(4px)!important}
  #lvDock{right:10px!important;left:auto!important;bottom:6px!important;gap:4px!important;max-width:44vw!important;align-items:flex-end!important}
  #gameMenu .lvGo{padding:6px 18px!important;font-size:18px!important}#gameMenu .lvGo small{font-size:8px}.lvTip{display:none!important}.lvAlb{padding:2px 2px 2px 8px;font-size:8px}.lvAlb .lbChip{transform:scale(.8)}
  /* 보스 러시 */
  #gmRush.rqFull .gmHead{top:4px;left:10px;right:10px;font-size:16px}
  #gmRush.rqFull .gmTabs .gmPill{font-size:11px;padding:4px 10px}
  #gmRush.rqFull .gmPrev{left:auto!important;right:8px!important;top:44px!important;bottom:66px!important;width:min(360px,46vw)!important;max-height:none!important;padding:8px 10px!important}
  #gmRush.rqFull #gmPrevName{font-size:18px!important}#gmRush.rqFull .gmStat{font-size:10px;gap:4px}#gmRush.rqFull .gmStat span{padding:3px 6px}
  #gmRush.rqFull .gmPrev .gmDiffs button{font-size:11px;padding:5px 8px}#gmRush.rqFull #gmFight,#gmRush.rqFull #rpRunBtn{font-size:13px;padding:7px 12px}
  #gmRush.rqFull #gmGrid{bottom:2px;padding:4px 6px 3px;gap:5px}#gmRush.rqFull #gmGrid .gmTile{flex-basis:50px!important;width:50px!important}#gmRush.rqFull #gmGrid .gmTile .nm{font-size:8px!important;padding:2px}
  #rqStage{right:auto!important;width:calc(100% - min(360px,46vw) - 16px)!important}
  #rqPrevB{left:8px!important;top:38%!important}#rqNextB{right:calc(min(360px,46vw) + 16px)!important;top:38%!important}
  #rqLeft{left:8px!important;right:auto!important;top:44px!important;bottom:66px!important;width:min(400px,50vw)!important;max-height:none!important}
  /* 전투 화면: 위 막대를 떠 있는 작은 버튼으로 */
  #battleView{padding:2px 2px 2px max(10px,env(safe-area-inset-left));gap:0;align-items:flex-start!important}
  #battleView .bar{position:fixed;top:4px;right:6px;left:auto;z-index:60;width:auto;background:transparent;padding:0;gap:4px}
  #battleView .bar #bvTitle{display:none}
  #battleView .bar button{font-size:11px;padding:4px 8px;opacity:.75}
  #stickZone{top:0}
  @media (min-width:1001px){#rqStage{left:30vw!important;width:36vw!important}#rqLeft{width:30vw!important;display:block!important}#gmRush.rqFull .gmPrev{width:34vw!important}#rqPrevB{left:calc(30vw + 16px)!important}#rqNextB{right:calc(34vw + 16px)!important}#mbDetX{display:none!important}#gmRush.detOpen::after{display:none}}
  /* 챕터 선택: 시계는 왼쪽, 설명은 오른쪽 */
  #csDial{left:14px!important;top:46px!important;transform:none!important;width:min(38vw,calc(100vh - 62px))!important}
  #csPage{left:calc(min(38vw,100vh - 62px) + 30px)!important;right:10px!important;top:44px!important;bottom:6px!important;width:auto!important;max-height:none!important;transform:none!important;overflow-y:auto!important}
  #csHint{display:none!important}#gmStory.csFull .gmSum{display:none}
  /* 명예의 전당: 왼쪽 단추를 작게, 뒤로 버튼 아래로 */
  #hfNav{top:48px!important;bottom:auto!important;transform:none!important;flex-direction:column!important;flex-wrap:wrap!important;max-height:calc(100% - 150px);left:8px!important;right:auto!important;gap:3px!important}
  #hfNav button{font-size:10px!important;padding:3px 6px!important;min-width:0!important;min-height:0!important;height:auto!important;width:auto!important}
 }`;(document.head||document.body).appendChild(st)})();

/*C3_END*/
/* BOSS_QUALITY_18_BEGIN — preserve original art; focused choreography and readable hazards. */
function bqRegister(id,name,estimate,tip,fn){
 defPat(id,name,'all',estimate,tip,fn);const f=MV[id];
 MV[id]=function(t){sch(t,()=>{G.curPat={n:id,chan:'all',at:performance.now()}});return f(t)};
}
function bqText(x,y,text,col){ctx.save();ctx.font='bold 8px '+FONT_STACK;ctx.textAlign='center';ctx.lineWidth=3;ctx.strokeStyle='#071017';ctx.strokeText(text,x,y);ctx.fillStyle=col||'#fff';ctx.fillText(text,x,y);ctx.restore()}
function bqGuide(t0,t2,draw){return NP({k:'orb',harm:false,noTel:true,r:1,t0,t1:t0,t2,pos:()=>[0,0],deco:draw})}
function bqDiffAngle(a,b){return Math.atan2(Math.sin(a-b),Math.cos(a-b))}
function bqTrail(o,b,now,col){if(b<o.t1)return;for(let j=1;j<=3;j++){const p=o.pos(Math.max(o.t1,b-j*.055));cPx(p[0],p[1],Math.max(1,o.r-j),col,(4-j)*.12)}}
function bqRayEnd(x,y,a,margin){const m=margin||0,dx=Math.cos(a),dy=Math.sin(a),ts=[];
 if(dx>.00001)ts.push((AX+AW-m-x)/dx);if(dx<-.00001)ts.push((AX+m-x)/dx);
 if(dy>.00001)ts.push((AY+AH-m-y)/dy);if(dy<-.00001)ts.push((AY+m-y)/dy);
 const d=Math.min(...ts.filter(v=>v>=0));return [x+dx*d,y+dy*d]}

// Iron Railer: steam pulses share an announced, reachable opening instead of random holes.
bqRegister('steamWhistle','압력 증기 기적',10,'굴뚝의 압력 게이지가 차면 증기 고리가 퍼져요. 민트색 화살표 방향의 넓은 틈을 따라 이동하세요.',t=>{
 const tel=Math.max(1.6,npTel()),count=G.phase>=2?4:3,interval=1.65,speed=52*Math.min(1.35,npS()),life=2.8;
 sch(t,()=>{const g=bgeo(),cx=g.x-g.hf*U*.3,cy=Math.max(AY+8,g.top-16);
  const base=Math.atan2(P.y-cy,P.x-cx),sign=P.x<AX+AW/2?1:-1;
  for(let k=0;k<count;k++){const ts=t+k*interval,fire=ts+tel,gap=base+sign*(k%2)*.22,width=diff==='easy'?.62:.48;
   npCharge(ts,fire,()=>[cx,cy],'#fff0c8');
   for(let i=0;i<24;i++){const a=i*TAU/24;if(Math.abs(bqDiffAngle(a,gap))<width)continue;
    NP({k:'orb',sty:'steam',r:5,t0:ts,t1:fire,t2:fire+life,pos:npVel(cx,cy,a,speed,fire),ray:a,rayL:28,chg:false,col:'#e8e8e8',dmg:9,deco:(o,b,now)=>bqTrail(o,b,now,'#dbeaf0')})}
   bqGuide(ts,fire+life,(o,b)=>{const r=b<fire?58:58+(b-fire)*speed;const x=cx+Math.cos(gap)*r,y=cy+Math.sin(gap)*r;
    if(x>AX+8&&x<AX+AW-8&&y>AY+10&&y<AY+AH-10)cChevron(x,y,gap,'#a6f5c6',.9,5);
    if(b<fire){const p=clamp((b-ts)/tel,0,1);RA(cx-15,cy-12,30,3,'#273943',1);RA(cx-15,cy-12,30*p,3,'#ffd166',1);bqText(cx,cy-17,(k+1)+' / '+count,'#fff0c8')}});
   sch(fire,()=>{sfx(700+k*65,.25,'square',.025,820);spawnPuff(cx,cy,6,'#e8e8e8');G.shake=Math.max(G.shake,.1)})
  }
 });return (count-1)*interval+tel+life+.2;
});

// Storm Hive: two opposite missing drones make a genuine corridor through the charge.
bqRegister('droneLaunch','편대 포위 · 돌파 회랑',7,'드론이 편대를 만든 뒤 돌진해요. 양쪽 민트 화살표를 잇는 통로는 드론이 지나가지 않아요.',t=>{
 const deploy=1.05,tel=Math.max(1.7,npTel()),fire=t+deploy+tel,dur=1.8/Math.min(1.3,npS()),n=12;
 sch(t,()=>{const g=bgeo(),cx=clamp(P.x,AX+100,AX+AW-100),cy=clamp(P.y,AY+88,AY+AH-88),rx=90,ry=76;
  // The horizontal corridor is always on-screen, even when the player starts in a corner.
  for(let i=0;i<n;i++){if(i===0||i===6)continue;const a=i*TAU/n,dx=Math.cos(a)*rx,dy=Math.sin(a)*ry,sx=cx+dx,sy=cy+dy,travel=Math.abs(dx)<1?(i<6?rx:-rx):-dx*2.1;
   const pos=b=>b<t+deploy?(()=>{const u=clamp((b-t)/deploy,0,1),e=u*u*(3-2*u);return [lerp(g.x,sx,e),lerp(g.coreY,sy,e)-Math.sin(u*Math.PI)*20]})():b<fire?[sx,sy]:[sx+travel*clamp((b-fire)/dur,0,1),sy];
   // Cross in parallel rows: the advertised horizontal corridor remains genuinely clear.
   NP({k:'orb',sty:'drone',r:6,t0:t,t1:fire,t2:fire+dur,pos,ray:travel>0?0:Math.PI,rayL:40,chg:false,dmg:11,
    deco:(o,b,now)=>{if(b<fire){const p=pos(b);npSpr('drone',p[0],p[1],6,now,o,b);if(b>=t+deploy)cRing(p[0],p[1],9,'#ffd166',.55,1)}else bqTrail(o,b,now,'#c7b4ff')}})
  }
  bqGuide(t+deploy,fire+dur,(o,b)=>{for(const s of [-1,1]){cChevron(cx+s*70,cy,s>0?0:Math.PI,'#a6f5c6',1,5);for(let x=24;x<70;x+=10)cPx(cx+s*x,cy,1,'#a6f5c6',.6)}
   if(b<fire)bqText(cx,cy-12,'돌파 회랑  ◀  ▶','#a6f5c6')});
  sch(fire,()=>{sfx(650,.2,'square',.03,1100);G.shake=Math.max(G.shake,.12)})
 });return deploy+tel+dur+.3;
});

// Optic Fortress: track -> visibly lock -> fire. A fixed beam avoids misleading moving warnings.
bqRegister('focusLens','초점 고정 · 관통 섬광',9,'흰 조준경이 추적하다 노란색으로 고정돼요. 고정 뒤 표시된 원과 광선 경로에서 옆으로 피하세요.',t=>{
 const rounds=G.phase>=2?3:2,follow=1.15,lock=Math.max(.95,npTel()*.7),blast=.36,interval=follow+lock+blast+.45;
 npEye(t,t+follow,t+rounds*interval);
 for(let k=0;k<rounds;k++){const ts=t+k*interval,freeze=ts+follow,fire=freeze+lock,end=fire+blast;
  sch(ts,()=>{const g=bgeo(),x0=g.x,y0=g.headY,state={x:P.x,y:P.y};
   bqGuide(ts,end,(o,b,now)=>{if(b<freeze){state.x=clamp(P.x,AX+22,AX+AW-22);state.y=clamp(P.y,AY+22,AY+AH-22)}
    if(b>=fire)return;const locked=b>=freeze,col=locked?'#ffd166':'#7dffd0',r=locked?22:28;
    cRing(state.x,state.y,r,col,.85,1);for(let j=0;j<4;j++){const a=j*TAU/4+(locked?0:now/450);cChevron(state.x+Math.cos(a)*(r+5),state.y+Math.sin(a)*(r+5),a+Math.PI,col,1,3)}
    line(x0,y0,state.x,state.y,7,(x,y,i)=>{if(i%2===0)cPx(x,y,1,col,.45)});bqText(state.x,state.y-r-8,locked?'고정 · 피해!':'초점 추적',col)});
   sch(freeze,()=>{const [x,y]=npIn(P.x,P.y,22);state.x=x;state.y=y;
    NP({k:'circ',x,y,r:22,t0:freeze,t1:fire,t2:end,col:'#ffffff',dmg:13});
    NP({k:'seg',sty:'laser',w:7,col:'#7dffd0',t0:freeze,t1:fire,t2:end,a:()=>[x0,y0],b:()=>[x,y],dmg:11});npCharge(freeze,fire,()=>[x0,y0],'#7dffd0');sfx(1200,.05,'sine',.025,1600)});
   sch(fire,()=>{sfx(1600,.15,'sawtooth',.035,400);G.shake=Math.max(G.shake,.16);spawnPuff(state.x,state.y,6,'#7dffd0')})
  })
 }return rounds*interval;
});

// Silk Empress: show numbered vibrating threads in alternating order, with recovery gaps.
bqRegister('webPluck','비단 현 · 교차 연주',10,'거미줄 끝의 번호 순서대로 줄이 울려요. 붉게 떨리는 줄만 위험하며, 한 번 울린 줄은 잠시 안전해요.',t=>{
 const n=G.phase>=2?8:6,tel=Math.max(1.7,npTel()),interval=.72,active=.32;
 sch(t,()=>{const g=bgeo(),cx=g.x,cy=clamp(g.coreY,AY+20,AY+AH-20),base=Math.PI/6;
  for(let rank=0;rank<n;rank++){const idx=rank%2===0?rank/2:n/2+Math.floor(rank/2),a=base+idx*TAU/n,end=bqRayEnd(cx,cy,a,5),fire=t+tel+rank*interval;
   NP({k:'seg',sty:'hand',w:1,harm:false,noTel:true,col:'#cbb7e8',t0:t,t1:t,t2:t+tel+n*interval+.3,a:()=>[cx,cy],b:b=>{const u=clamp((b-t)/.65,0,1);return [lerp(cx,end[0],u),lerp(cy,end[1],u)]}});
   NP({k:'seg',sty:'elec',w:7,col:'#f4b5ff',t0:fire-Math.max(1.05,npTel()*.65),t1:fire,t2:fire+active,a:()=>[cx,cy],b:()=>end,dmg:10,
    deco:(o,b,now)=>{const u=.9,x=lerp(cx,end[0],u),y=lerp(cy,end[1],u);if(b<fire){bqText(x,y,String(rank+1),'#ffe4ff');const q=clamp((b-o.t0)/(fire-o.t0),0,1);for(let j=1;j<10;j++){const f=j/10,shake=Math.sin(now/45+j)*q*2;cPx(lerp(cx,end[0],f)-Math.sin(a)*shake,lerp(cy,end[1],f)+Math.cos(a)*shake,1,'#ffc5ff',.7)}}}});
   sch(fire,()=>{sfx(320+rank*80,.17,'triangle',.035,220);spawnPuff(end[0],end[1],4,'#f4b5ff')})
  }
 });return tel+n*interval+.4;
});

// Stillness: stopped projectiles are inert; full exit arrows appear before they wake again.
bqRegister('freezeFrame','정지 화면 · 시간 재기동',9,'탄이 멈추면 판정도 잠시 멈춰요. 흰 화살표로 재출발 방향을 읽고, 재기동 전에 빈 길로 이동하세요.',t=>{
 const tel=Math.max(1.35,npTel()),fly=1.15,hold=Math.max(1.9,npTel()+.4),fire=t+tel,stop=fire+fly,go=stop+hold,life=2.5;
 sch(t,()=>{const g=bgeo(),cx=g.x,cy=clamp(g.coreY,AY+40,AY+AH-60),n=24,spd=57*Math.min(1.3,npS()),gap=Math.atan2(P.y-cy,P.x-cx),turn=G.phase%2?-.42:.42;
  npCharge(t,fire,()=>[cx,cy],'#c8a0ff');
  for(let i=0;i<n;i++){const a=i*TAU/n;if(Math.abs(bqDiffAngle(a,gap))<.44)continue;const sx=cx+Math.cos(a)*fly*spd,sy=cy+Math.sin(a)*fly*spd,aa=a+turn;
   NP({k:'orb',sty:'void',col:'#c8a0ff',r:4.5,t0:t,t1:fire,t2:stop,pos:npVel(cx,cy,a,spd,fire),ray:a,rayL:30,chg:false,dmg:9});
   NP({k:'orb',sty:'void',col:'#a3a6c8',r:4.5,harm:false,noTel:true,t0:stop,t1:stop,t2:go,pos:()=>[sx,sy],deco:(o,b)=>{cRing(sx,sy,6,'#d9e0ff',.7,1);for(const d of [12,23,34])cChevron(sx+Math.cos(aa)*d,sy+Math.sin(aa)*d,aa,'#ffffff',.85,2)}});
   NP({k:'orb',sty:'void',col:'#c8a0ff',r:4.5,t0:go-.6,t1:go,t2:go+life,pos:npVel(sx,sy,aa,spd*1.1,go),ray:aa,rayL:42,chg:false,dmg:9,deco:(o,b,now)=>bqTrail(o,b,now,'#c8a0ff')})
  }
  bqGuide(stop,go,(o,b)=>{bqText(AX+AW/2,AY+18,'시간 정지  ·  재기동 '+Math.max(1,Math.ceil(go-b)),'#e4d7ff');const q=clamp((b-stop)/hold,0,1);RA(AX+AW/2-40,AY+23,80,2,'#34304b',.8);RA(AX+AW/2-40,AY+23,80*q,2,'#c8a0ff',1)});
  sch(stop,()=>{sfx(180,.25,'sine',.03,65);G.shake=Math.max(G.shake,.08)});sch(go,()=>{sfx(420,.2,'square',.035,950);spawnPuff(cx,cy,8,'#c8a0ff');G.shake=Math.max(G.shake,.18)})
 });return tel+fly+hold+life+.25;
});

// Omega: a bounded relay replaces arbitrary overlap of unrelated full-screen attacks.
bqRegister('omegaMedley','수호자 계승 · 모듈 연쇄',11,'톱니 → 전류 → 광학 모듈이 차례로 켜져요. 톱니의 빈 부채꼴, 전류의 통로, 고정된 광선 옆으로 순서대로 피하세요.',t=>{
 const tel=Math.max(1.45,npTel()),dur=1.2,pause=.45,span=tel+dur+pause,n=G.phase>=2?3:2;
 for(let k=0;k<n;k++){const ts=t+k*span,fire=ts+tel,end=fire+dur;
  sch(ts,()=>{const g=bgeo(),cx=g.x,cy=clamp(g.coreY,AY+16,AY+AH-30),col=['#8eda9e','#bfefff','#7dffd0'][k];
   npCharge(ts,fire,()=>[cx,cy],col);bqGuide(ts,end,(o,b)=>{bqText(AX+AW/2,AY+17,(k+1)+' / '+n+'  '+['톱니 모듈','전류 모듈','광학 모듈'][k],col);cRing(cx,cy,18+Math.sin((b-ts)*4)*2,col,.65,2)});
   if(k===0){const a0=Math.atan2(P.y-cy,P.x-cx);for(let j=-5;j<=5;j++){if(Math.abs(j)<=1)continue;const a=a0+j*.22;NP({k:'orb',sty:'gear',r:6,col,t0:ts,t1:fire,t2:end,pos:npVel(cx,cy,a,112,fire),ray:a,rayL:48,chg:false,dmg:10,deco:(o,b,now)=>bqTrail(o,b,now,col)})}
    bqGuide(ts,end,()=>cChevron(cx+Math.cos(a0)*64,cy+Math.sin(a0)*64,a0,'#a6f5c6',1,5))}
   else if(k===1){const gap=diff==='easy'?82:68,gx=clamp(P.x+(P.x<AX+AW/2?36:-36),AX+70,AX+AW-70),Y=b=>lerp(AY+8,AY+AH-8,clamp((b-fire)/dur,0,1));
    for(const side of [-1,1])NP({k:'seg',sty:'elec',col,w:7,live:true,t0:ts,t1:fire,t2:end,a:b=>[side<0?AX:gx+gap/2,Y(b)],b:b=>[side<0?gx-gap/2:AX+AW,Y(b)],dmg:11});
    bqGuide(ts,end,(o,b)=>{for(const dy of [-10,10])cChevron(gx,Y(b)+dy,dy<0?Math.PI/2:-Math.PI/2,'#a6f5c6',1,4)})}
   else{const x=clamp(P.x,AX+36,AX+AW-36);for(const offset of [-66,0,66]){const tx=clamp(x+offset,AX+12,AX+AW-12);NP({k:'seg',sty:'laser',col,w:9,t0:ts,t1:fire,t2:fire+.45,a:()=>[tx,AY],b:()=>[tx,AY+AH],dmg:12})}}
   sch(fire,()=>{sfx([300,800,1300][k],.18,'square',.03,150);G.shake=Math.max(G.shake,.16)})
  })
 }return n*span;
});
/* BOSS_QUALITY_18_END */

/* FEATURE19_BEGIN: phase identities, exact hit attribution, safe practice */
const Q19=window.__BBQ19={owner:null,practice:null};
const Q19_ARRAYS=['np','bullets','zones','rings','beams','saws','rotors','movers','cones','lanes','rockets','turrets','laserPods'];
function q19Run(owner,fn){const prev=Q19.owner,game=G,before={};Q19.owner=owner;for(const key of Q19_ARRAYS)before[key]=(game[key]||[]).length;try{return fn()}finally{if(G===game)for(const key of Q19_ARRAYS){const list=G[key]||[];for(let i=before[key];i<list.length;i++)if(!list[i].q19Pat)list[i].q19Pat=owner}Q19.owner=prev}}
function q19RealBoss(id){return mode==='boss'&&G.bi===id&&!(typeof _c3Swap!=='undefined'&&_c3Swap)&&G.c3Rush==null&&G.caseFight==null&&G.s4==null&&G.s4Rush==null}
const Q19_PHASE={3:['장갑 운행','보일러 개방 · 교차 운행','기관 과열 · 선로 전환'],6:['자력 수집','양극 노출 · 자극 반전','코일 과부하 · 전류 방출'],7:['정각 타종','가면 균열 · 역방향 타종','태엽 해방 · 내외곽 교대']};
for(const id of [3,6,7]){const base=MON.reg['b'+id];MON.reg['b'+id]=A=>{base(A);if(!q19RealBoss(id)||A.still||A.dm||!G.phase)return;const p=G.phase,g=m1G(A.B),y=g.core+(A.bob||0)*.4,pulse=.5+.5*Math.sin(A.t*5);
 if(id===3){A.E(0,y,3.2,3.8,'#100b0a');A.E(0,y,2.5,3.1,p===2?'#ff5426':'#dd802a');for(let j=-1;j<=1;j++)A.R(j*1.4-.25,y-2.7,.5,5.4,'#ffd58a',.55+pulse*.3);for(const side of [-1,1]){A.P([[side*2.7,y-3],[side*5.4,y-2],[side*5.4,y+2.8],[side*2.7,y+3]],'#68616a');A.L(side*3,y-2.5,side*4.7,y-1.7,'#eee4cf',.4)}A.glow(0,y,p===2?7:4,'#ff822c',.5+pulse*.3);if(p===2)for(let i=0;i<4;i++)A.C(-5+i*3,y-6-((A.t*3+i)%3),.7,'#ffe6bd',.25)}
 if(id===6){for(const side of [-1,1]){const col=side<0?'#ff526d':'#6ebaff',x=side*3.2;A.box(x-1.8,y-3,3.6,6,'#101622','#06080c','#a4a6b7');for(let j=0;j<5;j++)A.R(x-1.7,y-2.5+j,3.4,.5,col);A.glow(x,y,p===2?5:3,col,.6);if(p===2){const a=A.t*1.7+side*Math.PI;A.box(Math.cos(a)*7,y+Math.sin(a)*4,1.2,1.2,'#9c9a96','#333642','#e4e2dc')}}}
 if(id===7){A.C(0,y,3.2,'#0b0716');A.gear(0,y,2.7,10,-A.t*(p===2?2:1),'#e5bc62','#705034');A.glow(0,y,4,'#f4c3ff',.5);for(const side of [-1,1]){A.P([[side*.6,g.top-2],[side*2.6,g.top-1],[side*2.2,g.top+3],[side*.8,g.top+2]],'#e8dce0');A.L(side*.8,g.top,side*2,g.top+1,'#3b163a',.35)}if(p===2){A.ring(0,y,6,.35,'#f7cf78',.8);const a=-A.t*1.4;A.L(0,y,Math.cos(a)*5.4,y+Math.sin(a)*5.4,'#fff0ba',.5)}}
 }}
{const base=startPhaseCine;startPhaseCine=function(now,tgt){if(Q19.practice)return;const r=base.apply(this,arguments);if(Q19_PHASE[G.bi]&&q19RealBoss(G.bi))banner(Q19_PHASE[G.bi][tgt]);return r}}
{const old=MV.trainRun;bqRegister('trainRun','급행 질주 · 선로 전환',12,'2페이즈부터 양쪽에서 열차가 와요. 3페이즈는 다음 운행 전에 선로가 바뀌니 새 민트색 선로로 이동하세요.',t=>{
 if(!q19RealBoss(3)||G.phase===0)return old(t);const rounds=G.phase>=2?2:1,tel=Math.max(1.8,npTel()),dur=2.1,span=tel+dur+.6;let safe=2;
 sch(t,()=>{safe=clamp(Math.round((P.y-(AY+32))/44),0,4)});
 for(let k=0;k<rounds;k++){const ts=t+k*span;sch(ts,()=>{const lane=k?(safe<3?safe+1:safe-1):safe,yy=AY+32+lane*44;
  for(let i=0;i<5;i++){if(i===lane)continue;const y=AY+32+i*44,dir=(i+k)%2?1:-1,len=72;mover({kind:'train',x0:dir>0?AX-len-14:AX+AW+len+14,y0:y,x1:dir>0?AX+AW+len+14:AX-len-14,y1:y,t0:ts+tel,t1:ts+tel+dur,tp:ts,r:10,len,dmg:16})}
  bqGuide(ts,ts+tel+dur,()=>{for(let x=AX+24;x<AX+AW-12;x+=38)cChevron(x,yy,k?Math.PI:0,'#a6f5c6',.7,3);bqText(AX+AW/2,yy-9,k?'선로 전환 · 이쪽으로':'통과 가능한 선로','#a6f5c6')});sch(ts+tel,()=>{sfx(240,.3,'sawtooth',.04,80);G.shake=Math.max(G.shake,.16)})})
 }return rounds*span;
})}
{const old=MV.magnetField;bqRegister('magnetField','자기장 폭주 · 극성 반전',11,'2페이즈부터 고철을 모은 뒤 바깥으로 밀어내요. N → S 표시가 바뀌기 전에 빈 부채꼴로 이동하세요.',t=>{
 if(!q19RealBoss(6)||G.phase===0)return old(t);const tel=Math.max(1.8,npTel()),inward=1.3,hold=1.2,outward=1.65,span=tel+inward+hold+outward,phase=G.phase;
 sch(t,()=>{const g=bgeo(),cx=g.x,cy=clamp(g.coreY,AY+55,AY+AH-70),gap=Math.atan2(P.y-cy,P.x-cx),n=phase>=2?14:10,fire=t+tel,flip=fire+inward+hold;
  for(let i=0;i<n;i++){const a=i*TAU/n;if(Math.abs(bqDiffAngle(a,gap))<.6)continue;const ex=bqRayEnd(cx,cy,a,10),dx=ex[0]-cx,dy=ex[1]-cy;
   const pos=b=>{const r=b<fire?1:b<fire+inward?lerp(1,.4,(b-fire)/inward):b<flip?.4:lerp(.4,1.12,clamp((b-flip)/outward,0,1));return [cx+dx*r,cy+dy*r]};
   NP({k:'orb',sty:'scrap',r:6,t0:t,t1:fire,t2:flip+outward,pos,prev:.9,prevN:4,dmg:10,deco:(o,b,now)=>{bqTrail(o,b,now,b<flip?'#ff526d':'#6ebaff');if(b>=fire+inward&&b<flip){const p=pos(b);cChevron(p[0]+Math.cos(a)*14,p[1]+Math.sin(a)*14,a,'#6ebaff',1,4)}}})
  }
  bqGuide(t,flip+outward,(o,b)=>{bqText(cx,AY+19,b<fire+inward?'N · 고철 수집':b<flip?'S 전환 예고 · 바깥으로 발사':'S · 고철 방출',b<flip?'#ff8293':'#8ac9ff');cChevron(cx+Math.cos(gap)*65,cy+Math.sin(gap)*65,gap,'#a6f5c6',1,5)});
  sch(flip,()=>{sfx(170,.3,'sawtooth',.04,550);G.shake=Math.max(G.shake,.18)});
  if(phase>=2){const ts=flip+outward+.35;sch(ts,()=>{for(const side of [-1,1]){const y=clamp(P.y+side*44,AY+16,AY+AH-16);NP({k:'seg',sty:'elec',col:side<0?'#ff526d':'#6ebaff',w:7,t0:ts,t1:ts+1.4,t2:ts+1.8,a:()=>[AX,y],b:()=>[AX+AW,y],dmg:10})}})}
 });return span+(phase>=2?2.3:.3);
})}
{const old=MV.hourStrike;bqRegister('hourStrike','정각 타종 · 역행 태엽',11,'2페이즈는 시계 반대 방향, 3페이즈는 안쪽·바깥쪽을 번갈아 타종해요. 번호와 점선 원이 생기는 순서를 보세요.',t=>{
 if(!q19RealBoss(7)||G.phase===0)return old(t);const tel=Math.max(1.8,npTel()),step=.55,ph=G.phase;
 sch(t,()=>{const g=bgeo(),cx=g.x,cy=clamp(g.coreY,AY+74,AY+AH-74);for(let i=0;i<12;i++){const a=-Math.PI/2-i*TAU/12,r=ph>=2?(i%2?106:62):90,x=clamp(cx+Math.cos(a)*r,AX+22,AX+AW-22),y=clamp(cy+Math.sin(a)*r*.72,AY+22,AY+AH-22),ts=t+i*step;
  NP({k:'circ',x,y,r:18,t0:ts,t1:ts+tel,t2:ts+tel+.35,label:String(i===0?12:12-i),col:i%2?'#f0a6c8':'#ffd166',dmg:11});bqGuide(ts,ts+tel,()=>cChevron(x+Math.cos(a+Math.PI/2)*24,y+Math.sin(a+Math.PI/2)*24,a-Math.PI/2,'#ffd166',.8,3));sch(ts+tel,()=>sfx(540-i*16,.12,'triangle',.025,350))}
 });return 11*step+tel+.6;
})}
// Tag newly emitted objects without confusing concurrently scheduled attacks.
for(const id of Object.keys(MV)){if(typeof MV[id]!=='function')continue;const f=MV[id];MV[id]=function(){const self=this,args=arguments;return q19Run(id,()=>f.apply(self,args))}}
{const base=hazardHit;hazardHit=function(){G.q19HitObj=null;G.src=null;const r=base.apply(this,arguments);G.q19HitAt=performance.now();return r}}
function q19Encounter(){return {bi:G.bi,s5:G.s5,c3:G.c3Rush!=null?G.c3Rush:G.caseFight,s4:G.s4Rush!=null?G.s4Rush:G.s4,phase:G.phase,name:G.B.name}}
function q19Shape(o,src,b){if(!o)return null;try{
 if(o.k==='orb'){const p=o.pos(b);return {k:'circle',x:p[0],y:p[1],r:o.r}}
 if(o.k==='circ'){const v=o.cf?o.cf(b):[o.x,o.y,o.r];return {k:'circle',x:v[0],y:v[1],r:v[2]}}
 if(o.k==='seg')return {k:'line',a:o.a(b),z:o.b(b),w:o.w};
 if(o.k==='rect')return {k:'rect',v:o.rf?o.rf(b):[o.x,o.y,o.w,o.h],safe:o.safe||[]};
 if(src==='bullet'){const p=bpos(o,b);return {k:'circle',x:p[0],y:p[1],r:o.r}}
 if(src&&src.startsWith('zone:'))return {k:'circle',x:o.cx,y:o.cy,r:o.r};
 if(src==='beam'){const a=beamAng(o,b),p=clamp((b-o.t1)/o.fireDur,0,1),len=o.L*(p*p*(3-2*p));return {k:'line',a:[o.ox-(o.both?Math.cos(a)*len:0),o.oy-(o.both?Math.sin(a)*len:0)],z:[o.ox+Math.cos(a)*len,o.oy+Math.sin(a)*len],w:o.w}}
 if(src==='saw'){const p=sawPos(o,b);return {k:'circle',x:p[0],y:p[1],r:9}}
 if(src&&src.startsWith('mover:')){const p=mvPos(o,b);return o.len?{k:'line',a:[p[0]-(Math.sign(o.x1-o.x0)||1)*o.len,p[1]],z:p,w:o.r*2}:{k:'circle',x:p[0],y:p[1],r:o.r}}
 if(src==='cone')return {k:'cone',x:o.x,y:o.y,r:o.len,a:coneAng(o,b),half:o.half};
 if(src==='rotor')return {k:'rotor',a:[o.cx,o.cy],ends:Array.from({length:o.arms},(_,i)=>rotorTip(o,i,b))};
 if(src==='ring')return {k:'ring',x:o.cx,y:o.cy,r:lerp(o.r0,o.r1,clamp((b-o.t0)/(o.t1-o.t0),0,1)),gaps:o.gaps||[]};
 }catch(e){}return null}
function q19DrawShape(c,s){if(!s)return;c.save();c.strokeStyle='#ff456a';c.fillStyle='#ff456a44';c.lineWidth=2;c.beginPath();
 if(s.k==='circle'){c.arc(s.x,s.y,s.r,0,TAU);c.fill();c.stroke()}
 if(s.k==='ring'){for(let i=0;i<120;i++){const a=i*TAU/120;if(s.gaps.some(g=>Math.abs(bqDiffAngle(a,g[0]))<g[1]))continue;c.moveTo(s.x+Math.cos(a)*s.r,s.y+Math.sin(a)*s.r);c.lineTo(s.x+Math.cos(a+TAU/120)*s.r,s.y+Math.sin(a+TAU/120)*s.r)}c.stroke()}
 if(s.k==='line'){c.lineWidth=s.w+2;c.strokeStyle='#ff456a88';c.moveTo(...s.a);c.lineTo(...s.z);c.stroke();c.lineWidth=1;c.strokeStyle='#fff';c.stroke()}
 if(s.k==='rect'){c.rect(...s.v);for(const p of s.safe||[]){c.moveTo(p[0]+p[2],p[1]);c.arc(p[0],p[1],p[2],0,TAU)}c.fill('evenodd');c.stroke()}
 if(s.k==='cone'){c.moveTo(s.x,s.y);c.arc(s.x,s.y,s.r,s.a-s.half,s.a+s.half);c.closePath();c.fill();c.stroke()}
 if(s.k==='rotor'){c.lineWidth=12;c.strokeStyle='#ff456a66';for(const z of s.ends){c.beginPath();c.moveTo(...s.a);c.lineTo(...z);c.stroke()}}c.restore()}
{const base=hurtP;hurtP=function(dmg,now){if(mode!=='boss'||now<P.inv)return base.apply(this,arguments);
 if(Q19.practice){P.hp=P.maxhp;P.inv=now+1000;Q19.practice.hits++;G.hits++;G.flash=Math.max(G.flash,.15);G.shake=Math.max(G.shake,.12);G.pops.push({x:P.x,y:P.y-20,t:now,tx:'피격 · 연습',col:'#ff8aab'});sfx(140,.1,'triangle',.025,80);return}
 const fresh=G.q19HitAt!=null&&Math.abs(performance.now()-G.q19HitAt)<80,o=fresh?G.q19HitObj:null,src=fresh?G.src:null,pattern=o&&o.q19Pat,hp=P.hp;
 const shot=document.createElement('canvas');shot.width=W;shot.height=H;shot.getContext('2d').drawImage(cv,0,0,W,H);
 const record={pattern:pattern||null,title:pattern?(ATK_NAME[pattern]||SIGNAME[pattern]||pattern):src==='bossdash'?'보스 돌진 접촉':'환경·특수 공격',tip:pattern&&ATK_TIP[pattern]||'붉은 공격 예고를 확인하고, 발동 전에 범위 밖으로 이동하세요.',shape:q19Shape(o,src,G.beat),x:P.x,y:P.y,shot,at:now,enc:q19Encounter()};
 const r=base.apply(this,arguments);if(P.hp<hp||G.state==='dead'){record.damage=Math.max(0,hp-P.hp);G.q19LastHit=record}G.q19HitObj=null;G.q19HitAt=null;return r}}
function q19Review(){const hit=G.q19LastHit,host=$('mText');if(!hit||!host||$('q19Review'))return;const box=document.createElement('div');box.id='q19Review';const title=document.createElement('b');title.textContent='마지막 피격: '+hit.title+' · -'+hit.damage+' HP';box.appendChild(title);const tip=document.createElement('p');tip.textContent=hit.tip;box.appendChild(tip);const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;box.appendChild(canvas);const c=canvas.getContext('2d');c.drawImage(hit.shot,0,0);q19DrawShape(c,hit.shape);c.strokeStyle='#ffe98a';c.lineWidth=2;c.beginPath();c.arc(hit.x,hit.y,9,0,TAU);c.stroke();const label=document.createElement('small');label.textContent=hit.shape?'빨강: 맞은 공격 범위 · 노랑: 피격 위치':'노랑: 피격 위치 (이 공격의 범위 복기는 지원하지 않아요)';box.appendChild(label);host.appendChild(box);
 if(hit.pattern&&MV[hit.pattern]){const button=document.createElement('button');button.textContent='이 패턴만 연습';button.className='primary';button.onclick=()=>q19Practice(hit);$('mBtns').prepend(button)}}
{const base=showOverlay;showOverlay=function(){const r=base.apply(this,arguments);if(!Q19.practice&&mode==='boss'&&G.state==='result'&&!G.won)q19Review();return r}}
function q19Practice(hit){if(!hit.pattern||!MV[hit.pattern])return;rpMusStop();if(typeof RUSH!=='undefined')RUSH=null;const e=hit.enc;
 if(e.s5!=null)s5Fight(e.s5,true);else if(e.s4!=null)s4RushFight(e.s4);else if(e.c3!=null)c3RushFight(e.c3);else{enterGame();startFight(e.bi,false,true)}
 Q19.practice={pattern:hit.pattern,enc:e,hits:0,round:0};G.phase=e.phase;G.hp=G.maxHp*[.85,.5,.2][e.phase];G.q19LastHit=null;G.special={nextAt:1e18,active:null};G.cine=null;G.afterIntro=null;G.boss.dorm=false;beginCount();q19PracticeUI()}
function q19PracticeUI(){let bar=$('q19PracticeBar');if(!bar){bar=document.createElement('div');bar.id='q19PracticeBar';bar.innerHTML='<span></span><button type="button">연습 종료</button>';$('battleView').appendChild(bar);bar.querySelector('button').onclick=()=>toLobby()}bar.querySelector('span').textContent='패턴 연습 · '+(ATK_NAME[Q19.practice.pattern]||Q19.practice.pattern)+' · PHASE '+(Q19.practice.enc.phase+1)+' · '+Q19.practice.round+'회 · 피격 '+Q19.practice.hits+'회';bar.hidden=false}
{const base=planNext;planNext=function(S){if(!Q19.practice)return base.apply(this,arguments);clearPhraseHazards();G.evs=[];G.puz=null;G.vuln=null;G.exposed=false;G.clickTarget=null;P.hp=P.maxhp;const start=S+2,len=MV[Q19.practice.pattern](start);G.nextPlan=start+Math.max(2,len)+2;G.phraseEnd=G.nextPlan;G.phraseNames=[Q19.practice.pattern];Q19.practice.round++;banner('연습 · '+(ATK_NAME[Q19.practice.pattern]||Q19.practice.pattern));q19PracticeUI()}}
{const base=startDying;startDying=function(){if(Q19.practice){G.hp=G.maxHp*[.85,.5,.2][Q19.practice.enc.phase];return}return base.apply(this,arguments)}}
{const base=updateBoss;updateBoss=function(){if(Q19.practice){G.phase=Q19.practice.enc.phase;G.hp=G.maxHp*[.85,.5,.2][G.phase];G.puz=null}return base.apply(this,arguments)}}
{const base=updatePuzzle;updatePuzzle=function(){if(Q19.practice)return;return base.apply(this,arguments)}}
{const base=doAttack;doAttack=function(){if(Q19.practice&&mode==='boss')return;return base.apply(this,arguments)}}
{const base=useSpecial;useSpecial=function(){if(Q19.practice&&mode==='boss')return;return base.apply(this,arguments)}}
{const base=fightEnd;fightEnd=function(){if(Q19.practice){P.hp=P.maxhp;G.state='play';G.hp=G.maxHp*[.85,.5,.2][Q19.practice.enc.phase];return}return base.apply(this,arguments)}}
{const base=toLobby;toLobby=function(){if(Q19.practice){Q19.practice=null;clearPhraseHazards();G.evs=[];if(typeof c3SwapOut==='function')c3SwapOut()}const bar=$('q19PracticeBar');if(bar)bar.hidden=true;return base.apply(this,arguments)}}
{const base=drawScene;drawScene=function(now){const r=base.apply(this,arguments);ctx.save();if(Q19_PHASE[G.bi]&&q19RealBoss(G.bi)&&G.phase>0&&['play','count'].includes(G.state))bqText(AX+AW/2,AY+12,Q19_PHASE[G.bi][G.phase],G.phase===2?'#ffaf8a':'#ffe2a0');const hit=G.q19LastHit;if(!Q19.practice&&hit&&now-hit.at<950){q19DrawShape(ctx,hit.shape);cRing(hit.x,hit.y,9,'#ffe98a',.9,1)}ctx.restore();if(Q19.practice&&Math.floor(now/250)!==Q19.uiTick){Q19.uiTick=Math.floor(now/250);q19PracticeUI()}return r}}
(function(){const st=document.createElement('style');st.textContent=`#q19Review{margin-top:12px;padding:10px;border:1px solid #855163;border-radius:10px;background:#0b1019;text-align:left;color:#ffe2e8}#q19Review p{font-size:12px;line-height:1.5;margin:7px 0}#q19Review canvas{display:block;width:100%;max-height:32vh;object-fit:contain;image-rendering:pixelated;background:#030609}#q19Review small{display:block;margin-top:6px;font-size:10px;color:#e1c9b4}#q19PracticeBar{position:absolute;left:50%;bottom:4px;transform:translateX(-50%);z-index:65;max-width:90%;display:flex;align-items:center;gap:8px;padding:5px 9px;border:1px solid #a6f5c6;border-radius:8px;background:#071817ee;color:#d8ffea;font-size:11px}#q19PracticeBar[hidden]{display:none!important}#q19PracticeBar button{white-space:nowrap;font-size:11px;padding:5px 8px}#q19PracticeBar span{max-width:60vw}#overlay .modal{max-height:92dvh;overflow:auto}`;document.head.appendChild(st)})();
/* FEATURE19_END */

