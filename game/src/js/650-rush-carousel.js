/* ===== rushfull.js : 보스 러시 전체화면 캐러셀 (옆으로 넘기며 보스 구경) ===== */
const RF={p:0,last:0,drag:null,wheel:0,wheelT:0,built:false,cv:null};
function rfLocked(k){if(GM.rushCh===3)return typeof s4RushLocked==='function'?s4RushLocked(k):true;if(GM.rushCh>0&&!ch1Cleared())return true;try{if(GM.rushCh===2&&typeof c3RushLocked==='function'&&c3RushLocked(k))return true}catch(e){}return false}
function rfOff(w,h){let o=RF.off;if(!o){o=RF.off=document.createElement('canvas')}if(o.width!==w||o.height!==h){o.width=w;o.height=h}return o}
function rfWrap(d){return ((d%10)+15)%10-5}
function rfSize(){const cv=RF.cv;if(!cv)return;const r=cv.getBoundingClientRect(),asp=Math.max(.5,Math.min(2.6,(r.width||16)/(r.height||9))),h=420,w=Math.round(h*asp);if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h}}
function rfBuild(){const s=$('gmRush');if(!s)return;s.classList.add('rqFull');
 if(!$('rqStage')){const cv=document.createElement('canvas');cv.id='rqStage';s.prepend(cv);RF.cv=cv;
  const L=document.createElement('div');L.id='rqLeft';s.appendChild(L);
  const A=document.createElement('button');A.id='rqPrevB';A.className='rqArr';A.innerHTML='<span>‹</span><small></small>';A.onclick=()=>rfStep(-1);s.appendChild(A);
  const Bn=document.createElement('button');Bn.id='rqNextB';Bn.className='rqArr';Bn.innerHTML='<span>›</span><small></small>';Bn.onclick=()=>rfStep(1);s.appendChild(Bn);
  const T=document.createElement('button');T.id='rqDetBtn';T.className='gmBtn';T.textContent='📋 패턴 · 기록';T.onclick=()=>{s.classList.toggle('detOpen');gmSfx('move')};const hd=s.querySelector('.gmHead');if(hd)hd.appendChild(T);
  const I=document.createElement('div');I.id='rqIdx';s.appendChild(I);
  const H=document.createElement('div');H.id='rqHint';H.textContent='← → / 스와이프로 넘기기 · Enter 전투';s.appendChild(H);
  /* 스와이프 · 드래그 */
  cv.addEventListener('pointerdown',e=>{RF.drag={x0:e.clientX,y0:e.clientY,p0:RF.p,moved:false,id:e.pointerId};try{cv.setPointerCapture(e.pointerId)}catch(_){}});
  cv.addEventListener('pointermove',e=>{const d=RF.drag;if(!d)return;const dx=e.clientX-d.x0;if(Math.abs(dx)>6)d.moved=true;const sp=cv.getBoundingClientRect().width*.24;RF.p=d.p0-dx/sp});
  const up=e=>{const d=RF.drag;if(!d)return;RF.drag=null;const r=cv.getBoundingClientRect(),dx=e.clientX-d.x0;
   if(!d.moved){/* 탭: 옆 보스 누르면 그쪽으로 */const fx=(e.clientX-r.left)/r.width;if(fx<.36)rfStep(-1);else if(fx>.64)rfStep(1);return}
   let n=Math.round(RF.p);if(Math.abs(dx)>40&&n===GM.rushSel)n=GM.rushSel+(dx<0?1:-1);rfGo(((n%10)+10)%10)};
  cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
  s.addEventListener('wheel',e=>{if(e.target.closest&&e.target.closest('#rqLeft,.gmPrev,#gmGrid'))return;const now=performance.now();if(now-RF.wheelT<260)return;const d=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;if(Math.abs(d)<12)return;RF.wheelT=now;rfStep(d>0?1:-1);e.preventDefault()},{passive:false});
  addEventListener('resize',rfSize)}
 const L=$('rqLeft'),det=$('gmRushDet');if(L&&det&&det.parentNode!==L)L.appendChild(det);
 const gr=$('gmGrid');if(gr&&gr.parentNode!==s)s.appendChild(gr);
 rfSize();rfLabels()}
function rfGo(k){if(k!==GM.rushSel){GM.rushSel=k;gmSfx('move');gmRushSelUpd()}else rfLabels()}
function rfStep(d){rfGo((GM.rushSel+d+10)%10)}
function rfLabels(){try{const k=GM.rushSel,nm=j=>{const o=rqBoss(j);return rfLocked(j)?'???':o.name};const a=$('rqPrevB'),b=$('rqNextB');if(a)a.querySelector('small').textContent=nm((k+9)%10);if(b)b.querySelector('small').textContent=nm((k+1)%10);
 const o=rqBoss(k),s=$('gmRush');s.style.setProperty('--bc',o.c);const i=$('rqIdx');if(i){let h='';for(let j=0;j<10;j++)h+='<i class="'+(j===k?'on':'')+'"></i>';i.innerHTML=h}
 const t=document.querySelector('#gmGrid .gmTile.sel');if(t&&t.scrollIntoView)t.scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'})}catch(e){}}
/* 무대 그리기 */
function rfArenaDraw(c,o,w,h,a){const ar=rqArena(o);if(!ar)return;const sc=Math.max(w/W,h/H)*1.04,dw=W*sc,dh=H*sc;c.globalAlpha=a;c.drawImage(ar,0,0,W,H,(w-dw)/2,(h-dh)/2,dw,dh);c.globalAlpha=1}
function rfStage(now){const cv=RF.cv;if(!cv||GM.scr!=='rush')return;if(cv.width<10)rfSize();const c=cv.getContext('2d'),w=cv.width,h=cv.height,t=now/1000,dt=Math.min(.05,(now-(RF.last||now))/1000);RF.last=now;c.imageSmoothingEnabled=false;c.globalAlpha=1;c.filter='none';
 if(!RF.drag){const d=rfWrap(GM.rushSel-RF.p);RF.p+=Math.abs(d)<.002?d:d*Math.min(1,dt*11)}RF.p=((RF.p%10)+10)%10;
 const p=RF.p,k0=Math.floor(p),fr=p-k0,kc=((Math.round(p)%10)+10)%10,oc=rqBoss(kc),beat=t*oc.bpm/60,pul=Math.pow(1-(beat%1),3),cx=w/2,fy=Math.round(h*(w<h?.5:.72)),bs=Math.min(5,w/58);
 c.fillStyle='#05080a';c.fillRect(0,0,w,h);
 /* 배경 아레나: 두 보스 사이 크로스페이드 */const oA=rqBoss(k0%10),oB=rqBoss((k0+1)%10);rfArenaDraw(c,oA,w,h,1);if(fr>.01)rfArenaDraw(c,oB,w,h,fr);
 c.fillStyle='#05080a';c.globalAlpha=.5;c.fillRect(0,0,w,h);c.globalAlpha=1;
 /* 커다란 번호 */c.font='900 190px '+FONT_STACK;c.textAlign='center';c.globalAlpha=.07;c.fillStyle=oc.c;c.fillText(String(kc+1).padStart(2,'0'),cx,h*.56);c.globalAlpha=1;
 /* 스포트라이트 */for(let i=0;i<14;i++){const sw=30+i*11;c.globalAlpha=.035;c.fillStyle=oc.c;c.beginPath();c.moveTo(cx-10,-10);c.lineTo(cx+10,-10);c.lineTo(cx+sw,fy+6);c.lineTo(cx-sw,fy+6);c.closePath();c.fill()}c.globalAlpha=1;
 /* 바닥 박자 파동 */for(let j=0;j<3;j++){const q=((beat*.5)+j/3)%1,r=36+q*Math.min(w*.45,260);c.globalAlpha=(1-q)*.45;c.fillStyle=oc.c;for(let a=0;a<56;a++){const aa=a*TAU/56;c.fillRect(Math.round(cx+Math.cos(aa)*r)-1,Math.round(fy+Math.sin(aa)*r*.2)-1,3,2)}}c.globalAlpha=1;
 /* 캐러셀: 멀리 있는 것부터 */const sp=Math.max(w*.24,bs*34),items=[];for(let off=-3;off<=3;off++){const k=((Math.round(p)+off)%10+10)%10,rel=rfWrap(k-p);if(Math.abs(rel)>2.6)continue;items.push({k,rel})}items.sort((a,b)=>Math.abs(b.rel)-Math.abs(a.rel));
 items.forEach(({k,rel})=>{const o=rqBoss(k),ar=Math.abs(rel),x=Math.round(cx+rel*sp),y=Math.round(fy-Math.min(ar,2)*14),sc=Math.max(bs*.45,bs-Math.min(ar,2)*bs*.26),lk=rfLocked(k),center=ar<.5;
  c.globalAlpha=.5*(1-Math.min(ar,2)*.3);c.fillStyle='#000';c.beginPath();c.ellipse(x,y+2,20*sc,2.6*sc,0,0,TAU);c.fill();c.globalAlpha=Math.max(0,1-Math.max(0,ar-1.6)*1.2);
  const br=lk?0:Math.max(.28,1-ar*.62);
  const bob=Math.sin(t*(center?2.2:1.4)+k)*(center?2:1),bo={pulse:center?pul*.8:0,expose:false,open:0,eye:center&&(Math.floor(t/4)%2)?Math.min(1,(t%4)/.6):0,dorm:!center,flash:false,warn:0};
  if(br>.99){try{rqDrawBoss(c,o,x,y+bob,now,o.art?sc*1.04:sc,bo)}catch(e){}}else{const oc2=rfOff(w,h),g=oc2.getContext('2d');g.globalCompositeOperation='source-over';g.globalAlpha=1;g.clearRect(0,0,w,h);g.imageSmoothingEnabled=false;try{rqDrawBoss(g,o,x,y+bob,now,o.art?sc*1.04:sc,bo)}catch(e){}g.globalAlpha=1;g.globalCompositeOperation='source-atop';g.fillStyle=lk?'#000000':'rgba(6,10,16,'+(1-br).toFixed(2)+')';g.fillRect(0,0,w,h);g.globalCompositeOperation='source-over';c.drawImage(oc2,0,0)}c.globalAlpha=1;
  if(lk){c.font='900 '+Math.round(10*sc)+'px '+FONT_STACK;c.textAlign='center';c.fillStyle='#ffffff';c.globalAlpha=center?.85:.4;c.fillText('?',x,y-12*sc);c.globalAlpha=1}});
 /* 떠오르는 불씨 */for(let i=0;i<30;i++){const q=((t*.16)+i/30)%1,x=((i*97)%w)+Math.sin(q*6+i)*8,y=h+10-q*(h+20);c.globalAlpha=(1-q)*.7;c.fillStyle=i%3?oc.c:'#ffffff';const z=i%4?2:3;c.fillRect(Math.round(x),Math.round(y),z,z)}c.globalAlpha=1;
 /* 스캔라인 · 비네트 */c.globalAlpha=.07;c.fillStyle='#000';for(let y=0;y<h;y+=3)c.fillRect(0,y,w,1);c.globalAlpha=1;const vg=c.createRadialGradient(cx,h*.55,h*.3,cx,h*.5,Math.max(w,h)*.75);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.78)');c.fillStyle=vg;c.fillRect(0,0,w,h);
 c.textAlign='left'}
/* 훅 */
{const _pd=gmPrevDraw;gmPrevDraw=function(now){try{if($('gmRush')&&$('gmRush').classList.contains('rqFull')){rfStage(now);return}}catch(e){}return _pd.apply(this,arguments)}}
{const _rb=gmRushBuild;gmRushBuild=function(){const r=_rb.apply(this,arguments);try{rfBuild();RF.p=GM.rushSel}catch(e){}return r}}
{const _su=gmRushSelUpd;gmRushSelUpd=function(){const r=_su.apply(this,arguments);try{rfBuild()}catch(e){}return r}}
{const _gs=gmShow;gmShow=function(s){const r=_gs.apply(this,arguments);try{if(s==='rush'){rfBuild();RF.p=GM.rushSel;requestAnimationFrame(rfSize)}}catch(e){}return r}}
if(typeof rpDetail==='function'){const _rd2=rpDetail;rpDetail=function(){const r=_rd2.apply(this,arguments);try{const L=$('rqLeft'),det=$('gmRushDet');if(L&&det&&det.parentNode!==L)L.appendChild(det)}catch(e){}return r}}
/* 위/아래 키는 캐러셀에선 의미 없으니 막기 */
addEventListener('keydown',e=>{try{if(mode==='menu'&&!document.body.classList.contains('inBattle')&&GM.scr==='rush'&&$('gmRush').classList.contains('rqFull')&&/^(ArrowUp|ArrowDown|KeyW|KeyS)$/.test(e.code)&&!(e.target&&/INPUT|TEXTAREA/.test(e.target.tagName))){e.stopImmediatePropagation();e.preventDefault()}}catch(_){}},true);
(function(){try{const st=document.createElement('style');st.textContent=
'#gmRush.rqFull{position:fixed;inset:0;z-index:40;padding:0;overflow:hidden;background:#05080a;--bc:#a6f5c6}'+
'#gmRush.rqFull.on{display:block}'+
'#rqStage{position:absolute;inset:0;width:100%;height:100%;image-rendering:pixelated;touch-action:pan-y;cursor:grab;display:block}#rqStage:active{cursor:grabbing}'+
'#gmRush.rqFull .gmHead{position:absolute;top:12px;left:18px;right:18px;z-index:5;margin:0;pointer-events:none;text-shadow:0 2px 0 #000,0 0 18px #000}#gmRush.rqFull .gmHead>*{pointer-events:auto}'+
'#rqDetBtn{margin-left:auto;font-size:13px;letter-spacing:0;display:none}'+
'#gmRush.rqFull .gmRushWrap{display:contents}#gmRush.rqFull #rpLeft{display:contents}'+
'#gmRush.rqFull .gmPrev{position:absolute;right:18px;top:78px;width:min(370px,30vw);max-height:calc(100% - 78px - 132px);overflow:auto;z-index:4;background:rgba(6,10,14,.74);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border:1px solid color-mix(in srgb,var(--bc) 45%,#1c2a30);border-radius:14px;padding:14px 16px;box-shadow:0 10px 40px #000a,0 0 30px color-mix(in srgb,var(--bc) 18%,transparent)}'+
'#gmRush.rqFull .gmPrev .gmFrame{display:none}#gmRush.rqFull #gmPrevName{font-size:clamp(22px,2.4vw,30px)}'+
'#rqLeft{position:absolute;left:18px;top:78px;width:min(360px,28vw);max-height:calc(100% - 78px - 132px);overflow:auto;z-index:4;background:rgba(6,10,14,.7);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border:1px solid #1c2a30;border-radius:14px;padding:4px}#rqLeft:empty{display:none}#rqLeft .rpDet{margin:0;background:transparent;border:0}'+
'#gmRush.rqFull #gmGrid{position:absolute;left:50%;bottom:12px;transform:translateX(-50%);z-index:4;display:flex;gap:8px;max-width:calc(100% - 24px);overflow-x:auto;overflow-y:visible;padding:8px 8px 6px;scrollbar-width:none;background:rgba(6,10,14,.6);border-radius:12px;backdrop-filter:blur(4px)}#gmRush.rqFull #gmGrid::-webkit-scrollbar{display:none}'+
'#gmRush.rqFull #gmGrid .gmTile{flex:0 0 78px;width:78px;opacity:.72}#gmRush.rqFull #gmGrid .gmTile.sel{opacity:1;transform:translateY(-4px)}#gmRush.rqFull #gmGrid .gmTile>*:not(canvas):not(.rk){font-size:9px!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'.rqArr{position:absolute;top:calc(50% - 40px);z-index:4;width:64px;height:96px;border:0;border-radius:14px;background:rgba(6,10,14,.45);color:#fff;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;font:inherit;transition:background .15s,transform .1s}.rqArr:hover{background:color-mix(in srgb,var(--bc) 30%,rgba(6,10,14,.6))}.rqArr:active{transform:scale(.94)}.rqArr span{font-size:48px;line-height:1;font-weight:900;text-shadow:0 0 12px var(--bc)}.rqArr small{font-size:10px;opacity:.75;max-width:60px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'#rqPrevB{left:calc(min(360px,28vw) + 30px)}#rqNextB{right:calc(min(370px,30vw) + 30px)}'+
'#rqIdx{position:absolute;left:50%;bottom:116px;transform:translateX(-50%);z-index:4;display:flex;gap:6px;pointer-events:none}#rqIdx i{width:8px;height:8px;border-radius:2px;background:#ffffff33;transition:all .2s}#rqIdx i.on{width:22px;background:var(--bc);box-shadow:0 0 8px var(--bc)}'+
'#rqHint{position:absolute;left:50%;top:60px;transform:translateX(-50%);z-index:3;font-size:11px;opacity:.55;letter-spacing:.05em;pointer-events:none;white-space:nowrap}'+
'@media (max-width:1000px){#rqDetBtn{display:inline-flex}#rqLeft{display:none;width:auto;right:12px;left:12px;top:70px;max-height:calc(100% - 200px)}#gmRush.detOpen #rqLeft{display:block;z-index:6}'+
'#gmRush.rqFull .gmPrev{left:12px;right:12px;width:auto;top:auto;bottom:108px;max-height:34%;padding:10px 12px}#gmRush.rqFull .gmPrev #gmPrevEpi,#gmRush.rqFull .gmPrev #gmPrevRanks{display:none}'+
'#rqPrevB{left:8px;top:28%}#rqNextB{right:8px;top:28%}.rqArr{width:46px;height:70px}.rqArr small{display:none}#rqIdx{display:none}#rqHint{display:none}#gmRush.rqFull #gmGrid .gmTile{flex-basis:60px;width:60px}}';
(document.head||document.body).appendChild(st)}catch(e){}})();

