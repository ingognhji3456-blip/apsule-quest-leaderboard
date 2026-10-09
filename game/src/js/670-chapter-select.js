/* ===== chsel.js : 챕터 선택 = "태엽 시계" (시곗바늘이 챕터를 가리키고, 가운데 창으로 그 이야기의 풍경이 보임) ===== */
const CSX={sel:-1,ang:-150,vel:0,iris:1,irisT:0,swapTo:-1,t0:0,parts:[],hover:-1,beatT:0};
const CS_CH=[{cv:'titleCv',btn:'btnStory',col:'#a6f5c6',ang:-150,num:'I',tag:'PART 1 · PIXEL RHYTHM ADVENTURE',title:'BEAT MACHINA',desc:'멈춰버린 마을의 시계. 박동이 울리는 동굴 깊은 곳의 기계 수호자들.',unit:'수호자'},
 {cv:'titleCv2',btn:'btnStory2',col:'#ff4dd2',ang:-90,num:'II',tag:'PART 2 · 정적이 남긴 것들',title:'THE HUNGER',desc:'종소리가 다시 울린 지 한 달. 황무지에서 깨어나는 살아있는 것들.',unit:'굶주린 것'},
 {cv:'titleCv3',btn:'btnStory3',col:'#ffd98a',ang:-30,num:'III',tag:'PART 3 · ORIGIN · 추리',title:'첫 번째 태엽지기',desc:'사십 년 전의 시계골. 3시 12분에 멈춘 시계들과, 깨지 않는 아이. 진실은 박동 속에 있다.',unit:'사건'}];
function CS_N(){return CS_CH.length}
function csLocked(i){if(i===3)return !(typeof s4Unlocked==='function'&&s4Unlocked());return i>0&&!ch1Cleared()}
function csInfo(i){if(i===3&&typeof s4Info==='function')return s4Info();const S=gmStats(),cl=saveData.clear||{},o='PSABC',best=b=>{let r=null;for(const d of ['easy','normal','hard','extreme']){const v=cl[b+'|'+d];if(v&&(r===null||o.indexOf(v)<o.indexOf(r)))r=v}return r};
 if(i<2){const ch=saveData.chapter||0,slots=[];for(let k=0;k<10;k++){const bi=i*10+k,r=best(bi),seen=r||ch>bi||(i===0?ch1Cleared():ch2Cleared());slots.push({k,bi,rank:r,seen:!!seen,cur:!seen&&ch===bi})}
  const done=i===0?ch1Cleared():ch2Cleared(),prog=done?1:Math.max(0,Math.min(1,(ch-i*10)/10));return {slots,done,prog}}
 const s3=saveData.ch3||{},n3=(typeof C3CASES!=='undefined'?C3CASES.length:10),ci=s3.ci||0,slots=[];for(let k=0;k<n3;k++){const r=S.best3&&S.best3[k];slots.push({k,art:C3CASES[k]&&C3CASES[k].boss.art,rank:r&&r!=='—'&&r!=='–'?r:null,seen:k<ci,cur:k===ci})}
 return {slots,done:ci>=n3,prog:Math.min(1,ci/Math.max(1,n3))}}
function csMiniBoss(c,i,s,w,h){c.clearRect(0,0,w,h);c.imageSmoothingEnabled=false;const col=CS_CH[i].col;
 const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0c1418');g.addColorStop(1,shade(col,.18));c.fillStyle=g;c.fillRect(0,0,w,h);
 if(!s.seen){c.fillStyle='#05080a';c.globalAlpha=.6;c.fillRect(0,0,w,h);c.globalAlpha=1;c.fillStyle=s.cur?col:'#3a4a52';c.font='900 16px '+FONT_STACK;c.textAlign='center';c.fillText(s.cur?'!':'?',w/2,h/2+6);return}
 try{if(s.art)c3ArtOn(c,s.art,w/2,h-3,performance.now(),1.55,{pulse:0});else{const B=BOSSES[s.bi];drawMech(c,B,w/2,h-4,performance.now(),{pulse:0},1.1);const hs=idleHandsAt(B,w/2,h-4,1.1),g0=geo(B,w/2,h-4,1.1);hs.forEach((hh,j)=>drawHand(c,B,hh,g0.sh[j][0],g0.sh[j][1],performance.now(),false,.75))}}catch(e){}}
function csBuild(){const s=$('gmStory');if(!s)return;s.classList.add('csFull');
 if(!$('csBg')){const bg=document.createElement('canvas');bg.id='csBg';bg.width=160;bg.height=90;s.prepend(bg);
  const dial=document.createElement('div');dial.id='csDial';dial.innerHTML='<div id="csWin"></div><canvas id="csRing" width="360" height="360"></canvas>';s.appendChild(dial);
  const pg=document.createElement('div');pg.id='csPage';s.appendChild(pg);
  const hint=document.createElement('div');hint.id='csHint';hint.textContent='← → 시곗바늘 돌리기 · 숫자 눌러 고르기 · Enter 시작';s.appendChild(hint);
  const ring=$('csRing');ring.addEventListener('pointermove',e=>{CSX.hover=csHit(e)});ring.addEventListener('pointerleave',()=>CSX.hover=-1);
  ring.addEventListener('click',e=>{const h=csHit(e);if(h<0)return;if(h===GM.storySel){csGo(h)}else csSelect(h)});
  s.addEventListener('wheel',e=>{if(GM.scr!=='story')return;if(e.target.closest&&e.target.closest('#csPage'))return;const now=performance.now();if(now-(CSX.wT||0)<300)return;const d=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;if(Math.abs(d)<12)return;CSX.wT=now;csSelect((GM.storySel+(d>0?1:CS_N()-1))%CS_N());e.preventDefault()},{passive:false})}
 CSX.sel=-1;csSync(true)}
function csHit(e){const r=$('csRing').getBoundingClientRect(),x=(e.clientX-r.left)/r.width*360,y=(e.clientY-r.top)/r.height*360;for(let i=0;i<CS_N();i++){const a=CS_CH[i].ang*Math.PI/180,mx=180+Math.cos(a)*150,my=180+Math.sin(a)*150;if(Math.hypot(x-mx,y-my)<30)return i}return -1}
function csSelect(i){if(i===GM.storySel)return;GM.storySel=i;gmSfx('move');document.querySelectorAll('#gmCh .gmCard').forEach((x,j)=>x.classList.toggle('sel',j===i));csSync(false)}
function csGo(i){if(csLocked(i)){gmSfx('no');const p=$('csPage');if(p){p.classList.remove('shake');void p.offsetWidth;p.classList.add('shake')}return}gmSfx('ok');$(CS_CH[i].btn).click()}
/* 선택이 바뀌면: 조리개가 닫히고 → 풍경을 바꿔 끼우고 → 다시 열림 */
function csSync(instant){const i=GM.storySel;if(i===CSX.sel)return;const first=CSX.sel<0;CSX.sel=i;s_csPage(i);
 if(first||instant){csPutCanvas(i);CSX.iris=1;CSX.ang=CS_CH[i].ang;CSX.vel=0}else{CSX.swapTo=i;CSX.irisT=performance.now();try{perc('tick',audio.currentTime,.6);perc('tock',audio.currentTime+.09,.5);perc('clank',audio.currentTime+.2,.25,520)}catch(e){}}
 const s=$('gmStory');if(s)s.style.setProperty('--cc',CS_CH[i].col);const wn=$('csWin');if(wn)wn.classList.toggle('lk',csLocked(i))}
function csPutCanvas(i){const win=$('csWin');if(!win)return;const cv=$(CS_CH[i].cv);win.querySelectorAll('canvas').forEach(c=>{if(c!==cv){const card=document.querySelectorAll('#gmCh .gmCard')[CS_CH.findIndex(x=>x.cv===c.id)];const slot=card&&card.querySelector('.cvSlot');(slot||$('gmCvPark')||document.body).appendChild(c)}});if(cv&&cv.parentNode!==win){cv.style.cssText='';win.appendChild(cv)}}
function s_csPage(i){const p=$('csPage');if(!p)return;const C=CS_CH[i],inf=csInfo(i),lk=csLocked(i),btn=$(C.btn);
 const title=C.title.split('').map((ch,k)=>'<span style="animation-delay:'+(k*28)+'ms">'+(ch===' '?'&nbsp;':ch)+'</span>').join('');
 let slots='';inf.slots.forEach((s,k)=>{slots+='<div class="csSlot'+(s.seen?' seen':'')+(s.cur?' cur':'')+'" title="'+(s.seen?(s.name?s.name:i===2?(C3CASES[k]?C3CASES[k].boss.name:''):BOSSES[s.bi].name):s.cur?'다음 상대':'???')+'"><canvas width="64" height="48"></canvas><b>'+String(k+1).padStart(2,'0')+'</b>'+(s.rank?'<i class="r'+s.rank+'">'+s.rank+'</i>':'')+'</div>'});
 const nDone=inf.slots.filter(s=>s.seen).length;
 p.innerHTML='<div class="csBind"></div><div class="csTag">'+C.tag+'</div><h2 class="csTitle">'+title+'</h2><p class="csDesc">'+C.desc+'</p>'+
  '<div class="csSec"><span>'+C.unit+' 기록</span><b>'+nDone+' / '+inf.slots.length+'</b></div><div class="csSlots">'+slots+'</div>'+
  '<div class="csProg"><i style="width:'+Math.round(inf.prog*100)+'%"></i><em>'+Math.round(inf.prog*100)+'%</em></div>'+
  (lk?'<div class="csLock">🔒 '+(i===3?'명예의 전당 별자리 30개를 완성하면 열려요 ('+hfData().slice(0,30).filter(x=>x.rk).length+' / 30)':'탑 10층 보스를 쓰러뜨리면 태엽이 풀려요')+'</div>':'')+
  '<div class="csBtns"><button class="gmBtn go" id="csGoBtn"'+(lk?' disabled':'')+'>'+(btn?btn.textContent:'시작')+'</button>'+(i===0&&$('btnNew')&&!$('btnNew').hidden?'<button class="gmBtn" id="csNewBtn">처음부터</button>':'')+(inf.done?'<span class="gmChip csClear">✓ CLEAR</span>':'')+'</div>';
 p.classList.remove('flip');void p.offsetWidth;p.classList.add('flip');p.style.setProperty('--cc',C.col);
 $('csGoBtn').onclick=()=>csGo(i);const nb=$('csNewBtn');if(nb)nb.onclick=()=>{gmSfx('ok');$('btnNew').click()};
 p.querySelectorAll('.csSlot').forEach((el,k)=>{const cv=el.querySelector('canvas');csMiniBoss(cv.getContext('2d'),i,inf.slots[k],64,48)})}
/* 매 프레임: 배경 · 시계 */
function csTick(now){if(GM.scr!=='story'||!$('csRing'))return;if(GM.storySel!==CSX.sel)csSync(false);const i=CSX.sel<0?0:CSX.sel,C=CS_CH[i],t=now/1000,dt=Math.min(.05,(now-(CSX.t0||now))/1000);CSX.t0=now;
 /* 바늘: 스프링 (살짝 넘쳤다 돌아옴) */const tgt=CS_CH[CSX.swapTo>=0?CSX.swapTo:i].ang;CSX.vel+=(tgt-CSX.ang)*dt*140;CSX.vel*=Math.pow(.0009,dt);CSX.ang+=CSX.vel*dt;
 /* 조리개 */if(CSX.swapTo>=0){const e=(now-CSX.irisT)/1000;if(e<.16)CSX.iris=1-e/.16;else{if(CSX.swapTo>=0&&CSX.iris<=0.02||e>=.16){csPutCanvas(CSX.swapTo);CSX.swapTo=-2;CSX.irisT=now}}}
 else if(CSX.swapTo===-2){const e=(now-CSX.irisT)/1000;CSX.iris=Math.min(1,e/.28);if(e>=.28){CSX.swapTo=-1;CSX.iris=1}}
 csDrawBg(now,i);csDrawRing(now,i)}
function csDrawBg(now,i){const bg=$('csBg');if(!bg)return;const c=bg.getContext('2d'),w=bg.width,h=bg.height,t=now/1000,C=CS_CH[i],src=$(C.cv);c.imageSmoothingEnabled=true;c.globalAlpha=1;
 c.fillStyle='#05080a';c.fillRect(0,0,w,h);if(src&&src.width){c.globalAlpha=.55;const sc=Math.max(w/src.width,h/src.height)*1.15,dw=src.width*sc,dh=src.height*sc;c.drawImage(src,(w-dw)/2+Math.sin(t*.1)*4,(h-dh)/2,dw,dh);c.globalAlpha=1}
 c.fillStyle='rgba(5,8,10,.55)';c.fillRect(0,0,w,h);const g=c.createRadialGradient(w*.33,h*.55,4,w*.33,h*.55,w*.6);g.addColorStop(0,C.col+'40');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,w,h);
 /* 챕터마다 다른 떠다니는 것: 1 = 음표, 2 = 꽃잎, 3 = 금빛 먼지 */for(let k=0;k<26;k++){const q=((t*(.03+(k%5)*.008))+k/26)%1,x=(k*37.7%w)+Math.sin(t*.6+k)*3,y=h+4-q*(h+8);c.globalAlpha=Math.sin(q*Math.PI)*.8;c.fillStyle=k%4?C.col:'#ffffff';
  if(i===0){if(k%3===0){c.fillRect(Math.round(x),Math.round(y),2,2);c.fillRect(Math.round(x)+1,Math.round(y)-4,1,4)}else c.fillRect(Math.round(x),Math.round(y),1,1)}
  else if(i===1){const yy=(k*23%h)+Math.sin(t*.8+k)*4,xx=((t*(6+k%4))+k*29)%(w+8)-4;c.fillRect(Math.round(xx),Math.round(yy),2,1);c.fillRect(Math.round(xx)+1,Math.round(yy)+1,1,1)}
  else{c.fillRect(Math.round(x),Math.round(h*.5+Math.sin(t*.4+k*1.7)*h*.45),1,1)}}c.globalAlpha=1}
function csDrawRing(now,i){const cv=$('csRing'),c=cv.getContext('2d'),t=now/1000,C=CS_CH[i],cx=180,cy=180,R=150;c.clearRect(0,0,360,360);c.imageSmoothingEnabled=false;
 const bpm=[112,118,120,128][i]||120,beat=t*bpm/60,pul=Math.pow(1-(beat%1),3);
 /* 뒤쪽 톱니 두 개 */const gear=(x,y,r,teeth,a,col)=>{c.save();c.translate(x,y);c.rotate(a);c.fillStyle=col;c.beginPath();for(let k=0;k<teeth*2;k++){const rr=k%2?r:r+7,aa=k*Math.PI/teeth;c.lineTo(Math.cos(aa)*rr,Math.sin(aa)*rr)}c.closePath();c.fill();c.fillStyle='#05080a';c.beginPath();c.arc(0,0,r*.35,0,TAU);c.fill();for(let k=0;k<5;k++){c.beginPath();c.arc(Math.cos(k*TAU/5)*r*.62,Math.sin(k*TAU/5)*r*.62,r*.14,0,TAU);c.fill()}c.restore()};
 gear(50,300,46,12,t*.4,'#3a3226');gear(318,296,34,9,-t*.54,'#4a3e2c');gear(26,210,22,7,-t*.9,'#2e281e');
 /* 조리개 (창 가장자리) */const wr=R-28;if(CSX.iris<1){c.save();c.beginPath();c.arc(cx,cy,wr+1,0,TAU);c.clip();const ir=wr*CSX.iris;c.fillStyle='#05080a';c.beginPath();c.arc(cx,cy,wr+2,0,TAU);c.arc(cx,cy,Math.max(0,ir),0,TAU,true);c.fill();
  for(let k=0;k<8;k++){const a=k*TAU/8+CSX.iris*1.2;c.strokeStyle='#2a2418';c.lineWidth=2;c.beginPath();c.moveTo(cx+Math.cos(a)*ir,cy+Math.sin(a)*ir);c.lineTo(cx+Math.cos(a+.9)*(wr+2),cy+Math.sin(a+.9)*(wr+2));c.stroke()}c.restore()}
 /* 테두리: 놋쇠 링 + 눈금 */c.lineWidth=26;const rg=c.createLinearGradient(0,20,0,340);rg.addColorStop(0,'#8a7440');rg.addColorStop(.5,'#4a3c22');rg.addColorStop(1,'#2a2214');c.strokeStyle=rg;c.beginPath();c.arc(cx,cy,R-14,0,TAU);c.stroke();
 c.lineWidth=2;c.strokeStyle='#c8a860';c.beginPath();c.arc(cx,cy,R-1,0,TAU);c.stroke();c.strokeStyle='#1a1408';c.beginPath();c.arc(cx,cy,R-27,0,TAU);c.stroke();
 for(let k=0;k<60;k++){const a=k*TAU/60,big=k%5===0,r0=R-6,r1=big?R-20:R-12;c.strokeStyle=big?'#f0dca0':'#8a7a50';c.lineWidth=big?2:1;c.beginPath();c.moveTo(cx+Math.cos(a)*r0,cy+Math.sin(a)*r0);c.lineTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1);c.stroke()}
 /* 박자 빛: 테두리를 따라 도는 점 */{const a=((beat/4)%1)*TAU-Math.PI/2;c.fillStyle=C.col;c.globalAlpha=.9;c.fillRect(Math.round(cx+Math.cos(a)*(R-14))-2,Math.round(cy+Math.sin(a)*(R-14))-2,4,4);c.globalAlpha=.35;c.fillRect(Math.round(cx+Math.cos(a-.08)*(R-14))-1,Math.round(cy+Math.sin(a-.08)*(R-14))-1,3,3);c.globalAlpha=1}
 /* 바늘 */const ha=CSX.ang*Math.PI/180;c.save();c.translate(cx,cy);c.rotate(ha);c.fillStyle='#05080a';c.globalAlpha=.4;c.beginPath();c.moveTo(-18,3);c.lineTo(R-38,1);c.lineTo(R-30,4);c.lineTo(R-38,7);c.lineTo(-18,7);c.fill();c.globalAlpha=1;
  const hg=c.createLinearGradient(0,-4,0,4);hg.addColorStop(0,'#fff0c0');hg.addColorStop(1,'#a88840');c.fillStyle=hg;c.beginPath();c.moveTo(-20,-2);c.lineTo(R-60,-2);c.lineTo(R-54,-7);c.lineTo(R-34,0);c.lineTo(R-54,7);c.lineTo(R-60,2);c.lineTo(-20,2);c.closePath();c.fill();
  c.strokeStyle='#fff0c0';c.lineWidth=1;c.beginPath();c.arc(R-68,0,6,0,TAU);c.stroke();c.restore();
 /* 초침: 박자마다 한 칸 */{const sa=(Math.floor(beat)%60)*TAU/60-Math.PI/2+(1-Math.min(1,(beat%1)*6))*-.02;c.strokeStyle=C.col;c.lineWidth=1;c.beginPath();c.moveTo(cx-Math.cos(sa)*14,cy-Math.sin(sa)*14);c.lineTo(cx+Math.cos(sa)*(R-40),cy+Math.sin(sa)*(R-40));c.stroke()}
 /* 가운데 보석 */c.fillStyle='#2a2214';c.beginPath();c.arc(cx,cy,11,0,TAU);c.fill();c.fillStyle=C.col;c.beginPath();c.arc(cx,cy,6+pul*1.5,0,TAU);c.fill();c.fillStyle='#fff';c.fillRect(cx-3,cy-4,2,2);
 /* 챕터 메달 */for(let k=0;k<CS_N();k++){const D=CS_CH[k],a=D.ang*Math.PI/180,mx=cx+Math.cos(a)*R,my=cy+Math.sin(a)*R,sel=k===i,lk=csLocked(k),inf=csInfo(k),hov=k===CSX.hover,rr=sel?25+pul*1.5:hov?23:21;
  if(sel){c.globalAlpha=.35;c.fillStyle=D.col;c.beginPath();c.arc(mx,my,rr+10,0,TAU);c.fill();c.globalAlpha=1}
  c.fillStyle='#1a1408';c.beginPath();c.arc(mx,my,rr+4,0,TAU);c.fill();c.fillStyle=lk?'#2a2a30':sel?shade(D.col,.35):'#2a2214';c.beginPath();c.arc(mx,my,rr,0,TAU);c.fill();
  c.lineWidth=3;c.strokeStyle='#05080a';c.beginPath();c.arc(mx,my,rr+1,0,TAU);c.stroke();c.strokeStyle=lk?'#555':D.col;c.beginPath();c.arc(mx,my,rr+1,-Math.PI/2,-Math.PI/2+TAU*inf.prog);c.stroke();
  c.fillStyle=lk?'#777':sel?'#ffffff':'#e8d8a8';c.font='900 '+(sel?17:14)+'px '+FONT_STACK;c.textAlign='center';c.fillText(lk?'🔒':D.num,mx,my+(sel?6:5));
  if(inf.done&&!lk){c.fillStyle='#ffe36b';c.font='900 11px '+FONT_STACK;c.fillText('✓',mx+rr-2,my-rr+6)}}
 c.textAlign='left'}
/* 훅 */
{const _sb=gmStoryBuild;gmStoryBuild=function(){const r=_sb.apply(this,arguments);try{csBuild()}catch(e){console.error(e)}return r}}
{const _mt=menuTick;menuTick=function(now){const r=_mt.apply(this,arguments);try{csTick(now)}catch(e){}return r}}
(function(){try{const st=document.createElement('style');st.textContent=
'#gmStory.csFull{position:fixed;inset:0;z-index:40;padding:0;overflow:hidden;background:#05080a;--cc:#a6f5c6}#gmStory.csFull.on{display:block}#gmStory.csFull #gmCh{display:none}'+
'#csBg{position:absolute;inset:0;width:100%;height:100%;image-rendering:auto;filter:blur(2px) saturate(1.1);transform:scale(1.03)}'+
'#gmStory.csFull .gmHead{position:absolute;top:12px;left:18px;right:18px;z-index:5;margin:0;text-shadow:0 2px 0 #000,0 0 18px #000}'+
'#csDial{position:absolute;left:max(18px,calc(27vw - min(32vh,23vw)));top:50%;transform:translateY(-46%);width:min(64vh,46vw);aspect-ratio:1;z-index:3;filter:drop-shadow(0 18px 40px #000c)}'+
'#csWin{position:absolute;left:14.4%;top:14.4%;width:71.2%;height:71.2%;border-radius:50%;overflow:hidden;background:#05080a;box-shadow:inset 0 0 40px #000,0 0 0 3px #05080a}'+
'#csWin canvas{position:absolute;inset:0;width:100%!important;height:100%!important;object-fit:cover;image-rendering:pixelated;display:block}'+
'#csWin:after{content:"";position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.12),rgba(255,255,255,0) 40%),radial-gradient(circle,rgba(0,0,0,0) 55%,rgba(0,0,0,.65) 100%);pointer-events:none}'+
'#csWin.lk canvas{filter:grayscale(1) brightness(.35)}#csWin.lk:before{content:"🔒";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:clamp(28px,5vw,54px);z-index:2;filter:drop-shadow(0 4px 0 #000)}'+
'#csRing{position:absolute;inset:0;width:100%;height:100%;cursor:pointer}'+
'#csPage{position:absolute;right:max(18px,4vw);top:50%;transform:translateY(-44%);width:min(520px,42vw);max-height:calc(100% - 150px);overflow:auto;z-index:4;padding:24px 26px 22px 40px;border-radius:6px 16px 16px 6px;'+
 'background:linear-gradient(90deg,rgba(0,0,0,.35),rgba(0,0,0,0) 22px),repeating-linear-gradient(0deg,rgba(255,255,255,.028) 0 1px,transparent 1px 26px),linear-gradient(160deg,#16140f,#0c0b09);color:#efe6cf;box-shadow:0 20px 50px #000c,0 0 0 1px #3a3222,inset 0 0 0 1px #ffffff08}'+
'#csPage .csBind{position:absolute;left:14px;top:14px;bottom:14px;width:2px;background:repeating-linear-gradient(180deg,var(--cc) 0 6px,transparent 6px 14px);opacity:.7}'+
'#csPage.flip{animation:csFlip .45s cubic-bezier(.2,.9,.3,1.1)}@keyframes csFlip{from{opacity:0;transform:translateY(-44%) perspective(800px) rotateY(-16deg) translateX(30px)}to{opacity:1}}'+
'#csPage.shake{animation:csShake .35s}@keyframes csShake{25%{margin-left:-8px}50%{margin-left:6px}75%{margin-left:-3px}}'+
'.csTag{font-size:11px;letter-spacing:.3em;color:var(--cc)}.csTitle{margin:6px 0 8px;font-size:clamp(26px,3.4vw,44px);font-weight:900;letter-spacing:.06em;line-height:1.1;text-shadow:0 3px 0 #000}.csTitle span{display:inline-block;animation:csIn .4s both}@keyframes csIn{from{opacity:0;transform:translateY(10px) scale(.8);filter:blur(3px)}}'+
'.csDesc{margin:0 0 14px;opacity:.82;line-height:1.6;font-size:14px}.csSec{display:flex;justify-content:space-between;font-size:12px;letter-spacing:.12em;color:#c8b888;border-bottom:1px dashed #3a3222;padding-bottom:6px;margin-bottom:8px}.csSec b{color:var(--cc)}'+
'.csSlots{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}.csSlot{position:relative;border-radius:6px;overflow:hidden;box-shadow:0 0 0 1px #2a2418;opacity:.55}.csSlot.seen{opacity:1;box-shadow:0 0 0 1px color-mix(in srgb,var(--cc) 50%,#2a2418)}.csSlot.cur{opacity:1;box-shadow:0 0 0 2px var(--cc),0 0 12px var(--cc);animation:csCur 1s steps(2) infinite}@keyframes csCur{50%{box-shadow:0 0 0 2px var(--cc)}}'+
'.csSlot canvas{display:block;width:100%;image-rendering:pixelated}.csSlot b{position:absolute;left:3px;top:1px;font-size:9px;opacity:.7}.csSlot i{position:absolute;right:3px;top:1px;font-style:normal;font-size:11px;font-weight:900;text-shadow:0 1px 0 #000}'+
'.csSlot i.rP{color:#ffe36b}.csSlot i.rS{color:#ff9ad5}.csSlot i.rA{color:#8ae8ff}.csSlot i.rB{color:#a6f5c6}.csSlot i.rC{color:#c8c8c8}'+
'.csProg{position:relative;height:10px;border-radius:5px;background:#1a1610;margin:14px 0 12px;box-shadow:inset 0 0 0 1px #2e271a}.csProg i{position:absolute;left:0;top:0;bottom:0;border-radius:5px;background:linear-gradient(90deg,var(--cc),#ffe36b)}.csProg em{position:absolute;right:0;top:-18px;font-size:11px;font-style:normal;color:#c8b888}'+
'.csLock{margin:0 0 10px;color:#ff9a9a;font-size:13px}.csBtns{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.csBtns .go{font-size:17px;padding:12px 26px}.csBtns .go[disabled]{opacity:.4;filter:grayscale(1)}.csClear{color:#ffe36b}'+
'#csHint{position:absolute;left:50%;bottom:14px;transform:translateX(-50%);z-index:4;font-size:12px;opacity:.6;white-space:nowrap}'+
'@media (max-width:900px),(orientation:portrait){#csDial{left:50%;top:92px;transform:translateX(-50%);width:min(78vw,40vh)}#csPage{left:12px;right:12px;width:auto;top:calc(104px + min(78vw,40vh));transform:none;max-height:none;bottom:40px}#csPage.flip{animation:none}#csHint{display:none}#gmStory.csFull .gmSum{display:none}}';
(document.head||document.body).appendChild(st)}catch(e){}})();

