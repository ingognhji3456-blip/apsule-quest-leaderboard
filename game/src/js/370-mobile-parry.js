/* ================= 모바일: 전체화면 · 터치 버튼 가림 문제 ================= */
function fsElem(){return document.fullscreenElement||document.webkitFullscreenElement||null}
function goFullscreen(){const el=document.documentElement,rq=el.requestFullscreen||el.webkitRequestFullscreen||el.webkitRequestFullScreen;
 if(fsElem()){fitBattle();return true}
 if(rq){try{const r=rq.call(el,{navigationUI:'hide'});const ok=()=>{try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock('landscape').catch(()=>{})}catch(e){}setTimeout(fitBattle,120)};if(r&&r.then)r.then(ok).catch(()=>pseudoFS(true));else ok()}catch(e){pseudoFS(true)}return true}
 pseudoFS(true);return false}
function pseudoFS(tip){document.body.classList.add('pseudoFS');try{scrollTo(0,1)}catch(e){}setTimeout(fitBattle,60);
 if(tip&&!pseudoFS._told&&/iPhone|iPod/.test(navigator.userAgent)&&!navigator.standalone){pseudoFS._told=1;fsToast('아이폰은 브라우저 전체화면을 지원하지 않아요. 공유 → "홈 화면에 추가"로 열면 꽉 찬 화면으로 플레이할 수 있어요.')}}
function fsToast(msg){let t=document.getElementById('fsToast');if(!t){t=document.createElement('div');t.id='fsToast'}(document.fullscreenElement||document.body).appendChild(t);t.textContent=msg;t.style.opacity='1';clearTimeout(fsToast._h);fsToast._h=setTimeout(()=>{t.style.opacity='0'},4200)}
(function(){try{
 const st=document.createElement('style');st.textContent=`
 #fsToast{position:fixed;left:50%;top:48px;transform:translateX(-50%);z-index:9999;max-width:88vw;background:#0b1418ee;color:#fff6c8;border:2px solid #4a6a5c;border-radius:8px;padding:10px 14px;font-size:13px;line-height:1.45;text-align:center;pointer-events:none;opacity:0;transition:opacity .3s}
 body.pseudoFS{overflow:hidden;height:100dvh}
 #touch.tHide #stickZone,#touch.tHide .tbtn,#touch.tHide #stickBase{visibility:hidden!important;pointer-events:none!important}
 #battleView .bar button,#overlay button,.modal button{touch-action:manipulation;position:relative;z-index:9}
 #overlay{z-index:20}`;document.head.appendChild(st);
 const fb=document.getElementById('fsBtn');if(fb){fb.onclick=null;fb.addEventListener('click',e=>{e.stopPropagation();goFullscreen()})}
 addEventListener('webkitfullscreenchange',()=>setTimeout(fitBattle,60));
 if(window.visualViewport)visualViewport.addEventListener('resize',()=>fitBattle());
 addEventListener('orientationchange',()=>setTimeout(fitBattle,250));
 // 전투 화면 진입 시 전체화면 시도 (사용자 터치 직후라서 허용됨)
 document.addEventListener('pointerup',()=>{const bv=document.getElementById('battleView');if(bv&&!bv.hidden&&document.body.classList.contains('touch')&&!fsElem()&&!goFullscreen._tried){goFullscreen._tried=1;goFullscreen()}},{passive:true});
 // 모달 · 대화 · 회상 중에는 조이스틱/버튼 영역이 화면을 가리지 않게
 setInterval(()=>{const tc=document.getElementById('touch');if(!tc)return;const ov=document.getElementById('overlay'),dl=document.getElementById('dlg');
  const block=(ov&&!ov.hidden)||(dl&&!dl.hidden)||(typeof paused!=='undefined'&&paused)||(typeof mode!=='undefined'&&mode!=='boss'&&mode!=='cave'&&mode!=='village'&&!(mode==='case'&&typeof CS!=='undefined'&&CS&&CS.ph==='explore'&&!CS.note))||(typeof G!=='undefined'&&G&&mode==='boss'&&G.cine&&(G.cine.type==='intro'||(G.cine.type==='revive'&&G.cine.ph==='mem')));
  tc.classList.toggle('tHide',!!block)},120);
}catch(e){}})();
/*MOB_END*/
/*F5_BEGIN*/
/* ================= 패링 (F / L · 모바일 방패 버튼) =================
   공격이 닿기 직전에 누르면 튕겨낸다. 박자에 맞춰 누르면 PERFECT — 보상이 커지고 반사 광탄이 보스를 때린다. */
const PARRY_WIN={easy:240,normal:190,hard:160,extreme:140};
function parryWin(){return PARRY_WIN[diff]||190}
function tryParry(){if(mode!=='boss'||!G||G.state!=='play'||G.cine||paused)return;const now=performance.now();if(now<(P.parryCd||0))return;
 P.parryT=now;P.parryCd=now+parryWin()+340;P.parryUsed=false;const fr=((G.beat%1)+1)%1,err=Math.min(fr,1-fr)*G.ms;P.parryPerf=err<=win().g;
 sfx(1500,.04,'square',.018,1100)}
function parryActive(now){return P.parryT&&now-P.parryT<=parryWin()&&!P.parryUsed}
function doParry(now,beat,dmg){P.parryUsed=true;P.parryCd=now+220;const perf=P.parryPerf;G.parries=(G.parries||0)+1;if(perf)G.pparries=(G.pparries||0)+1;
 P.inv=now+(perf?750:560);G.hitstop=now+(perf?210:120);G.flash=Math.max(G.flash,perf?.45:.25);G.shake=Math.max(G.shake,perf?.55:.35);G.combo++;G.maxCombo=Math.max(G.maxCombo||0,G.combo);G.score+=perf?600:250;
 const px=P.x,py=P.y-8;fxRing(px,py,now,380,perf?80:48,perf?'#ffe36b':'#9edbff');fxRing(px,py,now+80,500,perf?120:70,'#ffffff');
 for(let i=0;i<(perf?26:14);i++){const a=RND()*TAU,s=80+RND()*160;G.parts.push({x:px,y:py,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:.5,max:.5,col:i%2?'#ffffff':(perf?'#ffe36b':'#9edbff'),s:2})}
 G.pops.push({x:px,y:py-22,t:now,tx:perf?'PERFECT PARRY!':'PARRY!',col:perf?'#ffe36b':'#9edbff'});
 sfx(2200,.1,'square',.05,3000);sfx(900,.25,'triangle',.06,1800);if(perf)sfx(1320,.4,'sine',.05,2640);
 // 가까운 탄은 함께 튕겨 나간다
 const near=[];G.bullets=G.bullets.filter(b=>{if(beat<b.t0)return true;const [x,y]=bpos(b,beat);if(Math.hypot(x-P.x,y-P.y)<34){near.push([x,y]);return false}return true});
 if(typeof ultAdd==='function')ultAdd(perf?16:8);if(typeof brStag==='function')brStag(perf?18:9,px,py-20);
 G.parrySp=G.parrySp||[];const n=1+Math.min(4,near.length)+(perf?2:0),per=G.maxHp*(perf?.022:.011)/n;
 for(let i=0;i<n;i++){const [sx,sy]=near[i]||[px,py];G.parrySp.push({x0:sx,y0:sy,t:now+i*50,dur:420+i*40,side:(i%2?1:-1)*(20+RND()*30),dmg:per,perf})}
 G.parryFX={t:now,perf}}
/* 기존 판정을 감싼다: 맞기 직전 패링 중이면 튕겨내기 */
function hitTest(now,beat){if(now<P.inv||G.state!=='play'||G.cine)return;const d=hazardHit(P.x,P.y,beat,3.5,0);if(!d)return;if(parryActive(now)){doParry(now,beat,d);return}hurtP(d,now)}
function drawParryFX(now){if(mode!=='boss'||!G)return;const g=bgeo();
 // 반사 광탄 → 보스
 if(G.parrySp&&G.parrySp.length){for(const s of G.parrySp){const k=(now-s.t)/s.dur;if(k<0)continue;if(k>=1){if(!s.hit){s.hit=1;spDmg(s.dmg,g.x,g.coreY,s.perf?'#ffe36b':'#9edbff',now);fxRing(g.x,g.coreY,now,300,30,s.perf?'#ffe36b':'#9edbff')}continue}
  const e=k*k,mx=(s.x0+g.x)/2+s.side,my=Math.min(s.y0,g.coreY)-40,x=(1-e)*(1-e)*s.x0+2*(1-e)*e*mx+e*e*g.x,y=(1-e)*(1-e)*s.y0+2*(1-e)*e*my+e*e*g.coreY;
  for(let j=0;j<5;j++){const kk=Math.max(0,e-j*.03),xx=(1-kk)*(1-kk)*s.x0+2*(1-kk)*kk*mx+kk*kk*g.x,yy=(1-kk)*(1-kk)*s.y0+2*(1-kk)*kk*my+kk*kk*g.coreY;RA(xx-1,yy-1,3,3,s.perf?'#ffe36b':'#9edbff',.7-j*.13)}pcirc(x,y,3,'#ffffff')}
  G.parrySp=G.parrySp.filter(s=>now-s.t<s.dur+50)}
 // 방패 호 (누르는 동안)
 if(P.parryT&&now-P.parryT<parryWin()+120){const k=(now-P.parryT)/parryWin(),used=P.parryUsed,col=used?(P.parryPerf?'#ffe36b':'#9edbff'):(k>1?'#6a7a80':'#bfefff'),a0=Math.atan2(P.face.y,P.face.x);
  for(let i=-7;i<=7;i++){const a=a0+i*.16,r=13+(used?2:0);RA(P.x+Math.cos(a)*r-1,P.y-8+Math.sin(a)*r-1,2,2,col,k>1?.4*(1-(k-1)/.6):.9)}}
 // 퍼펙트 순간: 방사형 속도선 + 살짝 흑백
 if(G.parryFX){const d=now-G.parryFX.t;if(d<320){const a=1-d/320;if(G.parryFX.perf){RA(0,0,W,H,'#000',.18*a);for(let i=0;i<24;i++){const q=i*TAU/24+G.parryFX.t,r0=40+d*.2,r1=r0+30+RND()*40;bbLine(P.x+Math.cos(q)*r0,P.y-8+Math.sin(q)*r0,P.x+Math.cos(q)*r1,P.y-8+Math.sin(q)*r1,'#ffffff',.5*a)}}}else G.parryFX=null}
 // 준비 표시 (플레이어 발밑 작은 방패)
 const ready=now>=(P.parryCd||0);if(G.state==='play'&&!G.cine){const sx=P.x+10,sy=P.y+2;R(sx,sy,5,5,'#05090b');R(sx+1,sy+1,3,3,ready?'#9edbff':'#3a4a50');R(sx+2,sy+4,1,2,ready?'#9edbff':'#3a4a50')}
 // 첫 전투 안내
 if(G.state==='play'&&!G.cine&&!saveData.parryTip&&G.beat>2){saveData.parryTip=1;saveNow();G.pops.push({x:P.x,y:P.y-40,t:now+400,tx:isTouchUI()?'방패 버튼: 패링!':'F / L : 패링!',col:'#9edbff'});banner(isTouchUI()?'맞기 직전 방패 버튼 = 패링':'맞기 직전 F / L = 패링 (박자에 맞추면 PERFECT)')}}
addEventListener('keydown',e=>{if((e.code==='KeyF'||e.code==='KeyL')&&!e.repeat&&mode==='boss'){e.preventDefault();tryParry()}});
function ensureParryBtn(){if($('btnP'))return;const a=$('btnA');if(!a)return;const b=document.createElement('button');b.id='btnP';b.className='tbtn';b.textContent='🛡';
 b.style.cssText='right:124px;bottom:128px;width:64px;height:64px;font-size:24px;background:#9edbff44;border-color:#9edbff';
 b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();tryParry()});a.parentNode.appendChild(b)}
setTimeout(ensureParryBtn,0);

