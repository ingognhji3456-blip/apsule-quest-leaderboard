/* ================= 흐름: 스토리 / 보스전 / 결과 ================= */
function enterGame(){document.body.classList.add('inBattle');$('battleView').hidden=false;fitBattle();const v=$('battleView');if(!document.fullscreenElement&&v.requestFullscreen){try{const r=v.requestFullscreen();if(r&&r.catch)r.catch(()=>{})}catch(e){}}}
function leaveGame(){document.body.classList.remove('inBattle');$('battleView').hidden=true;if(document.fullscreenElement&&document.fullscreenElement!==document.documentElement&&document.exitFullscreen){try{const r=document.exitFullscreen();if(r&&r.catch)r.catch(()=>{})}catch(e){}}}
function fitBattle(){const v=$('battleView');if(v.hidden)return;const w=v.clientWidth||innerWidth,h=(v.clientHeight||innerHeight)-42,s=Math.max(.2,Math.min((w-8)/W,h/H)),a=$('arena');a.style.width=(W*s)+'px';a.style.height=(H*s)+'px';a.style.setProperty('--u',s+'px')}
addEventListener('resize',fitBattle);document.addEventListener('fullscreenchange',fitBattle);
function toLobby(){stopMusic();mode='menu';paused=false;dlg.active=false;$('dlg').hidden=true;$('overlay').hidden=true;leaveGame();buildCards();refreshMenu();try{if(typeof gmShow==='function')gmShow(GM.scr==='rush'?'rush':GM.scr==='story'?'story':'main')}catch(e){}}

function enterCaveReal(ci){$('bossName').style.visibility='';$('touch').style.display='';$('btnA').style.display='';mode='cave';paused=false;$('overlay').hidden=true;genCave(ci);setupCaveExtras(ci);setupCaveStory(ci);startMusic(makeCaveSong(ci),performance.now(),0);
$('bossName').textContent='CHAPTER '+(ci+1)+' · '+STORY[ci].cave;$('songInfo').textContent='';$('bvTitle').textContent='BEAT MACHINA · 이야기';saveData.chapter=Math.max(saveData.chapter||0,ci);saveNow();
banner('CHAPTER '+(ci+1));say(STORY[ci].entry)}
function enterCave(ci){playScene('cave'+ci,()=>enterCaveReal(ci))}


function startRush(bi){initAudio();story=false;enterGame();startFight(bi,false)}

function showOverlay(tag,title,html,btns){$('overlay').hidden=false;$('mTag').textContent=tag;$('mTitle').textContent=title;$('mText').innerHTML=html;const b=$('mBtns');b.innerHTML='';btns.forEach(([t,fn,pr])=>{const x=document.createElement('button');x.textContent=t;if(pr)x.className='primary';x.onclick=fn;b.appendChild(x)})}
let pauseAtMs=0;
function pause(){if(mode==='menu'||dlg.active)return;if(!paused){if(mode==='boss'&&!(G.state==='play'||G.state==='count'))return;if(mode==='cave'&&C.state!=='walk')return;paused=true;pauseAtMs=performance.now();showOverlay('PAUSED','잠시 쉬어가기','박자는 멈춰 있어요. 준비되면 이어서 하세요.',[['계속하기 →',pause,true],['로비로',toLobby,false]])}
else{const d=performance.now()-pauseAtMs;mus.T0+=d;P.inv+=d;P.dashCd+=d;if(P.dash)P.dash.t0+=d;if(mode==='boss'){G.T0+=d;if(G.clickTarget){G.clickTarget.expires+=d;G.clickTarget.born+=d}if(G.nextCircle)G.nextCircle+=d;if(G.cine)G.cine.t0+=d;if(G.hitstop)G.hitstop+=d;if(G.dyingAt)G.dyingAt+=d;if(G.special){G.special.nextAt+=d;if(G.special.active){G.special.active.start+=d;G.special.active.fireAt+=d}}}paused=false;$('overlay').hidden=true}}

/* ================= 메뉴 ================= */
const tcv=$('titleCv'),tctx=tcv.getContext('2d');
function drawTitle(now){const c=tctx;c.imageSmoothingEnabled=false;c.fillStyle='#0d1a20';c.fillRect(0,0,480,190);for(let i=0;i<40;i++){c.fillStyle=i%3?'#2a4a4f':'#d5dcc0';c.fillRect((i*97)%480,(i*53)%110,i%4?1:2,i%4?1:2)}
for(let i=0;i<9;i++){c.fillStyle=i%2?'#14262c':'#182e35';c.fillRect(i*58,60-i%3*18,44,130)}c.fillStyle='#22383a';c.fillRect(0,150,480,40);c.fillStyle='#3d5a52';c.fillRect(0,148,480,3);
for(let i=0;i<12;i++){c.fillStyle=i%2?'#1c2f33':'#243a3e';c.fillRect(i*42,158,40,32)}
const B=BOSSES[9],bx=370,by=152,g=geo(B,bx,by,4);drawMech(c,B,bx,by,now,{pulse:Math.max(0,Math.sin(now/300))*.5},4);const hs=idleHandsAt(B,bx,by,4);hs.forEach((h,i)=>{h.y+=Math.sin(now/400+i*2)*3;drawHand(c,B,h,g.sh[i][0],g.sh[i][1],now,false,1.1)});
drawKnight(c,120,120+Math.round(Math.sin(now/350)*2),3);for(let i=0;i<10;i++){c.fillStyle='#ffe79a';c.fillRect(150+(i*37)%160,60+(i*29+now/40)%90,2,2)}}
const DEBUG_UNLOCK_CH2=false;
function ch1Cleared(){return DEBUG_UNLOCK_CH2||(saveData.chapter||0)>=10||saveData.done||['easy','normal','hard','extreme'].some(d=>saveData.clear['9|'+d])}
function ch2Cleared(){return saveData.done||['easy','normal','hard','extreme'].some(d=>saveData.clear['19|'+d])}
function buildCardGrid(gridId,list,offset,locked){const g=$(gridId);g.innerHTML='';if(locked)return;list.forEach((B,k)=>{const i=k+offset;const b=document.createElement('button'),c2=document.createElement('canvas');b.className='card';b.style.borderColor=B.c;c2.width=120;c2.height=90;const c=c2.getContext('2d');c.imageSmoothingEnabled=false;c.fillStyle='#0b1418';c.fillRect(0,0,120,90);c.fillStyle=shade(B.c,.18);c.fillRect(0,80,120,10);drawMech(c,B,60,82,0,{still:true},3);const hs=idleHandsAt(B,60,82,3),g0=geo(B,60,82,3);hs.forEach((h,k2)=>drawHand(c,B,h,g0.sh[k2][0],g0.sh[k2][1],0,false,.75));
const rk=saveData.clear[i+'|'+diff],rkTxt=rk?(rk==='P'?'<i style="color:#fff6cf">★ PERFECT</i>':'<i>✓ '+rk+'</i>'):'<i></i>';b.appendChild(c2);b.insertAdjacentHTML('beforeend','<b>'+(i+1)+'. '+B.name+rkTxt+'</b><span>'+B.en+'</span>');b.onclick=()=>startRush(i);g.appendChild(b)})}
function buildCards(){const unlocked=ch1Cleared();buildCardGrid('bossGrid1',BOSSES.slice(0,10),0,false);buildCardGrid('bossGrid2',BOSSES.slice(10,20),10,!unlocked);$('bossGrid2').hidden=!unlocked;$('bossGrid2Lock').hidden=unlocked}
function ensureStatsPanel(){if($('statsPanel'))return;const sec=$('openRush1').parentElement.parentElement;sec.insertAdjacentHTML('afterend','<section class="panel" id="statsPanel"><div class="row" style="justify-content:space-between;align-items:center"><h3 style="margin:0">🏆 명예의 전당</h3></div><p class="small" id="statsBody" style="margin:8px 0 0"></p></section>')}
function buildStats(){ensureStatsPanel();const entries=Object.entries(saveData.clear||{}),bossSet=new Set(entries.map(([k])=>k.split('|')[0])),perfects=entries.filter(([,v])=>v==='P').length,sPlus=entries.filter(([,v])=>v==='P'||v==='S').length,bc=saveData.bestCombo||0;
 $('statsBody').innerHTML='클리어한 보스 <b>'+bossSet.size+' / 20</b> · PERFECT <b style="color:#fff6cf">'+perfects+'</b> · S랭크 이상 <b style="color:#f4d996">'+sPlus+'</b> · 역대 최고 콤보 <b>'+bc+'</b>';if(typeof buildMedals==='function')setTimeout(buildMedals,0)}
function refreshMenu(){try{setupNamePanel();setupLobbyShop()}catch(e){console.error(e)}const ch=saveData.chapter||0,c1=ch1Cleared(),c2=ch2Cleared();
 $('btnStory').hidden=false;$('btnNew').hidden=!(ch>0)||c1;
 $('btnStory').textContent=c1?'↺ 챕터 1 다시 플레이':(ch>0?'▶ 이어하기 · 스테이지 '+(Math.min(ch,9)+1):'▶ 이야기 시작');
 $('btnStory').onclick=()=>startStory(c1?0:(saveData.chapter||0));
 $('ch1Done').hidden=!c1;
 $('ch2LockOverlay').hidden=c1;$('btnStory2').hidden=!c1;$('ch2Done').hidden=!(c1&&c2);
 if(c1){const stage2=Math.min(Math.max(ch,10),19);$('btnStory2').textContent=c2?'↺ 챕터 2 다시 플레이':(ch>10?'▶ 이어하기 · 스테이지 '+(stage2-9)+'/10':'▶ 챕터 2 시작');$('btnStory2').onclick=()=>startStory(c2&&ch<=10?10:stage2)}
 buildCards();buildStats();fitPagerHeight()}
$('btnNew').onclick=()=>{saveData.chapter=0;saveNow();startStory(0)};
function openRush(n){buildCards();$('rushSec1').hidden=n!==1;$('rushSec2').hidden=n!==2;$('rushTitle').textContent='CHAPTER '+n+' · BOSS RUSH';$('rushModal').hidden=false;document.body.classList.add('rushOpen')}
$('openRush1').onclick=()=>openRush(1);$('openRush2').onclick=()=>openRush(2);
$('rushClose').onclick=()=>{$('rushModal').hidden=true;document.body.classList.remove('rushOpen')};
let fitPagerHeight=()=>{};
(function(){let chPage=0;const track=$('pagerTrack'),dots=[$('dot0'),$('dot1')],label=$('pagerLabel');
function setPage(p){chPage=Math.max(0,Math.min(1,p));track.className='pagerTrack'+(chPage?' p1':'');dots.forEach((d,i)=>d.classList.toggle('active',i===chPage));label.innerHTML='CHAPTER <b>'+(chPage+1)+'</b> / 2';$('chPrev').disabled=chPage===0;$('chNext').disabled=chPage===1;fitPagerHeight()}
fitPagerHeight=()=>{const pages=track.children;if(pages[chPage])vp.style.height=pages[chPage].offsetHeight+'px'};
addEventListener('resize',fitPagerHeight);
$('chPrev').onclick=()=>setPage(chPage-1);$('chNext').onclick=()=>setPage(chPage+1);
dots[0].onclick=()=>setPage(0);dots[1].onclick=()=>setPage(1);
let tx=0,ty=0,tracking=false;const vp=$('pagerViewport');
vp.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;tx=e.touches[0].clientX;ty=e.touches[0].clientY;tracking=true},{passive:true});
vp.addEventListener('touchend',e=>{if(!tracking)return;tracking=false;const dx=(e.changedTouches[0].clientX-tx),dy=(e.changedTouches[0].clientY-ty);if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.5){if(dx<0)setPage(chPage+1);else setPage(chPage-1)}},{passive:true});
setPage(0)})();
$('diffSel').value=diff;const updDiff=()=>{diff=$('diffSel').value;$('diffInfo').textContent=D().info;try{localStorage.setItem('beatmachina-diff',diff)}catch(e){}buildCards()};$('diffSel').onchange=updDiff;
$('sound').onclick=()=>{sound=!sound;$('sound').textContent='소리 '+(sound?'ON':'OFF');if(sound)initAudio()};
const showSync=()=>{$('syncVal').textContent=(syncMs>0?'+':'')+syncMs+'ms';try{localStorage.setItem('beatmachina-sync',String(syncMs))}catch(e){}};
$('syncMinus').onclick=()=>{syncMs=Math.max(-300,syncMs-10);showSync()};$('syncPlus').onclick=()=>{syncMs=Math.min(300,syncMs+10);showSync()};showSync();
let syncRun=null;$('syncTest').onclick=()=>{initAudio();syncRun={t0:performance.now()+600,i:0};tickSync()};
function tickSync(){if(!syncRun)return;const now=performance.now(),comp=syncComp(),box=$('syncLight');while(syncRun.i<12&&syncRun.t0+syncRun.i*600<now+300+comp*1000){if(audio)tk(880,.05,'square',.06,audio.currentTime+Math.max(0,(syncRun.t0+syncRun.i*600-now)/1000-comp));syncRun.i++}const k=Math.round((now-syncRun.t0)/600),d=now-(syncRun.t0+k*600);box.style.background=(k>=0&&k<12&&d>=0&&d<90)?'#a6f5c6':'#2c3c3a';if(now>syncRun.t0+12*600){syncRun=null;box.style.background='#2c3c3a';return}requestAnimationFrame(tickSync)}

