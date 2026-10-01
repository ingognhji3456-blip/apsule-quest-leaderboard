
/* ================= v40 퀄리티 패스: 프레임 최적화 · 자동 화질 · 전투 HUD 겹침 정리 · 익스트림 오메가 색 =================
   1) 로비: 화면에 안 보이고 LED 월에도 안 쓰이는 제목 캔버스(1440×570)는 매 프레임 다시 그리지 않음
   2) 전투: 프레임이 계속 느리면 캔버스 배율을 한 단계씩 낮춤 (예전 주석에만 있던 '자동 품질'을 실제로 구현)
   3) 익스트림: 보스 스프라이트를 매 프레임 읽어 오는 캔버스를 CPU 읽기용으로 바꿔 GPU 읽기 지연 제거
   4) 전투 HUD: 긴 안내 문구가 난이도 배지·화면 밖으로 넘치지 않게, 공격 예고 배너가 보스 이름·체력 숫자를 가리지 않게
   5) 익스트림 오메가 엔진: 각성색을 분홍 → 원래 장식색(금빛)으로, 몸 색은 그대로 */
(function(){
 /* ---------- 1) 로비 제목 캔버스: 필요할 때만 그리기 ---------- */
 const shown=cv=>{try{return !!cv&&cv.getClientRects().length>0}catch(e){return true}};
 const usedByLobby=id=>{try{if(typeof GM==='undefined'||!GM)return true;
   if(GM.scr==='main')return GM.sel===0&&typeof lbCv==='function'&&typeof lbTheme==='function'&&(lbCv(lbTheme())||{}).id===id;
   if(GM.scr==='story')return true;/* 챕터 선택: 시계 창 · 배경이 이 캔버스를 그대로 씀 */
   return false}catch(e){return true}};
 const need=id=>{const cv=$(id);return !cv?false:shown(cv)||usedByLobby(id)};
 /* 화면에 직접 보일 때만 3배 해상도, LED 월(240×100) 재료로만 쓰일 때는 1배로 그린다 */
 const fitScale=id=>{if(id!=='titleCv'||typeof tctx==='undefined')return;const cv=$(id),k=shown(cv)?3:1;if(cv.width!==480*k){cv.width=480*k;cv.height=190*k;tctx.setTransform(k,0,0,k,0,0);tctx.imageSmoothingEnabled=false}};
 const gate=(name,id)=>{const f=window[name];if(typeof f!=='function'||f.__v40)return;let drawn=false;
  const g=function(now){if(drawn&&!need(id))return;drawn=true;try{fitScale(id)}catch(e){}return f.apply(this,arguments)};g.__v40=1;
  if(name==='drawTitle')drawTitle=g;else if(name==='drawTitle2')drawTitle2=g};
 try{gate('drawTitle','titleCv');gate('drawTitle2','titleCv2')}catch(e){console.error('v40 title',e)}

 /* ---------- 2) 전투 자동 화질 ---------- */
 const PF={ema:16,slow:0,last:0,cap:4,low:0};
 try{const _ah=applyHiRes;applyHiRes=function(css){_lastCss=css||_lastCss;const dpr=(typeof devicePixelRatio==='number'&&devicePixelRatio)||1,
   want=Math.max(2,Math.min(PF.cap,4,Math.round(_lastCss/W*dpr)));if(want===SS&&cv.width===W*want)return;SS=want;cv.width=W*SS;cv.height=H*SS;ctx.setTransform(SS,0,0,SS,0,0);ctx.imageSmoothingEnabled=false};
  perfTick=function(now){const dt=now-(PF.last||now);PF.last=now;
   /* 전투 중 실제 플레이 프레임만 본다 (탭 전환 · 일시정지 · 컷신 로딩으로 생긴 긴 프레임은 제외) */
   if(mode!=='boss'||paused||!G||G.state!=='play'||dt<=0||dt>250){PF.slow=0;return}
   PF.ema+=(dt-PF.ema)*.05;
   if(PF.ema>26&&SS>2){if(++PF.slow>90){PF.slow=0;PF.cap=SS-1;PF.ema=16;PF.low++;applyHiRes()}}else PF.slow=Math.max(0,PF.slow-2)};
 }catch(e){console.error('v40 perf',e)}

 /* ---------- 3) 익스트림 스프라이트 읽기 캔버스 ---------- */
 try{const M=monCv(),old=M.S,n=document.createElement('canvas');n.width=old.width;n.height=old.height;n.getContext('2d',{willReadFrequently:true});M.S=n}catch(e){console.error('v40 mon',e)}

 /* ---------- 4) 전투 HUD 겹침 ---------- */
 try{const st=document.createElement('style');st.textContent=
  /* 일반 안내(힌트 · 페이즈 · 챕터): 난이도 배지 아래로, 화면 안에서 줄바꿈, 어두운 받침으로 보스 그림 위에서도 잘 읽히게 */
  '#banner:not(.atk){top:calc(var(--u)*52);left:calc(var(--u)*22);right:calc(var(--u)*22);margin:0 auto;width:fit-content;max-width:calc(100% - var(--u)*44);white-space:normal;line-height:1.25;'+
  'padding:calc(var(--u)*1.2) calc(var(--u)*5);border-radius:calc(var(--u)*2);background:rgba(4,7,10,.62);'+
  'text-shadow:calc(var(--u)*.5) calc(var(--u)*.5) #000,0 0 calc(var(--u)*2) #000;word-break:keep-all;overflow-wrap:anywhere}'+
  '#banner.long:not(.atk){font-size:max(12px,calc(var(--u)*7.2));letter-spacing:.02em}'+
  '#banner.xlong:not(.atk){font-size:max(11px,calc(var(--u)*6.2));letter-spacing:0}'+
  /* 공격 예고 배너: 보스 이름 · 페이즈 · 체력 숫자 줄(AY 위쪽) 바로 아래에서 시작 */
  '#banner.atk{top:calc(var(--u)*38);max-width:calc(100% - var(--u)*8)}'+
  '#banner.atk small{white-space:normal}';
  (document.head||document.body).appendChild(st)}catch(e){}
 /* 가로 폰: 화면 위에 떠 있는 [전체화면][일시정지] 막대가 곡 정보 상자를 덮지 않도록 곡 정보를 막대 왼쪽으로 */
 try{const _fb=fitBattle;fitBattle=function(){const r=_fb.apply(this,arguments);try{const v=$('battleView'),si=$('songInfo');if(!v||v.hidden||!si)return r;si.style.right='';
   if(v.classList.contains('mobileWide')){const bar=v.querySelector('.bar').getBoundingClientRect(),ar=$('arena').getBoundingClientRect(),ov=ar.right-bar.left;if(ov>0&&bar.bottom>ar.top)si.style.right=Math.round(ov+6)+'px'}}catch(e){}return r}}catch(e){}
 try{const _b=banner;banner=function(txt){const r=_b.apply(this,arguments);try{const el=$('banner'),n=String(txt||'').length;el.classList.toggle('long',n>18&&n<=34);el.classList.toggle('xlong',n>34)}catch(e){}return r}}catch(e){}

 /* ---------- 5) 익스트림 오메가 엔진 각성색 ---------- */
 try{if(EXF&&EXF.b9)EXF.b9[0]='#ffe066'}catch(e){}
})();
