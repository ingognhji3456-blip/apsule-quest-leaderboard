/* ================= 게임식 메인 메뉴 =================
   웹페이지처럼 보이던 로비를 게임 타이틀 화면으로: 메뉴 목록(키보드·마우스·터치), 챕터 선택, 보스 러시 선택 화면,
   명예의 전당, 설정, 조작법. 기존 기능(이야기 시작·이어하기·난이도·싱크·이름·상점)은 그대로 연결한다. */
const GM={scr:'main',sel:0,rushCh:0,rushSel:0,storySel:0,prevT:0,built:false};
const GM_ITEMS=[{id:'story',ic:'▶',t:'이야기',sub:'챕터 선택 · 이어하기'},{id:'rush',ic:'⚔',t:'보스 러시',sub:'원하는 보스와 바로 대결'},{id:'shop',ic:'✦',t:'상점',sub:'캐릭터 · 무기 · 펫'},{id:'hall',ic:'♛',t:'명예의 전당',sub:'메달과 최고 기록'},{id:'set',ic:'⚙',t:'설정',sub:'소리 · 싱크 · 난이도 · 이름'},{id:'help',ic:'?',t:'조작법',sub:'키와 전투 규칙'}];
const GM_DIFF=[['easy','쉬움','#7dff9a'],['normal','보통','#8ad0ff'],['hard','어려움','#ffb020'],['extreme','익스트림','#ff4d6d']];
function gmSfx(k){try{if(!audio)initAudio()}catch(e){}if(k==='move')sfx(990,.035,'square',.018,1100);else if(k==='ok'){sfx(660,.09,'square',.03,990);setTimeout(()=>sfx(1320,.12,'triangle',.03,1320),60)}else if(k==='back')sfx(520,.08,'triangle',.03,330);else if(k==='no')sfx(160,.15,'square',.03,120)}
function gmBuild(){if(GM.built||typeof document==='undefined')return;GM.built=true;
 const st=document.createElement('style');st.textContent=`
 body.gmOn>header,body.gmOn>main{display:none!important}
 body.inBattle #gameMenu{display:none!important}
 #gameMenu{position:fixed;inset:0;z-index:30;display:flex;flex-direction:column;color:#eaf6ef;font-family:${FONT_STACK};overflow:hidden}
 #gameMenu::after{content:'';position:fixed;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,#0000 0 2px,#0000000f 2px 3px);z-index:5}
 .gmTop{display:flex;align-items:center;justify-content:space-between;padding:14px 26px 6px;gap:12px;flex-wrap:wrap}
 .gmLogo{font-weight:900;font-size:clamp(26px,4.2vw,46px);letter-spacing:.12em;line-height:1;text-shadow:0 4px 0 #0009,0 0 22px #a6f5c655}
 .gmLogo b{background:linear-gradient(90deg,#a6f5c6,#ffe36b,#ff8fb0,#8ad0ff,#a6f5c6);background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:lbShine 4s linear infinite}
 .gmLogo small{display:block;font-size:.3em;letter-spacing:.9em;color:#ff8fb0;margin-top:6px;text-shadow:0 0 10px #ff8fb088}
 .gmHud{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
 .gmChip{background:#0a1216d9;border:2px solid #ffffff22;border-radius:6px;padding:6px 12px;font-weight:800;font-size:13px;box-shadow:0 3px 0 #0008}
 .gmChip.coin{color:#ffd166}.gmChip.name{color:#a6f5c6}
 .gmBody{flex:1;position:relative;min-height:0}
 .gmScreen{position:absolute;inset:0;display:none;padding:10px 26px 12px;gap:22px;overflow:auto}
 .gmScreen.on{display:flex;animation:gmIn .35s cubic-bezier(.2,.9,.3,1.2)}
 @keyframes gmIn{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:none}}
 .gmHead{font-weight:900;font-size:clamp(20px,2.8vw,30px);letter-spacing:.2em;margin:0 0 10px;text-shadow:0 3px 0 #0009;display:flex;align-items:center;gap:12px}
 .gmHead .gmBack{font-size:13px;letter-spacing:0;white-space:nowrap;padding:8px 12px}
 .gmHead{flex-wrap:wrap}
 .gmPrev .gmFrame{width:min(100%,calc((100vh - 470px)*1.41));min-width:220px;align-self:center}
 .gmPrev{overflow:auto}
 .gmBtn{font:inherit;font-weight:900;color:#eaf6ef;background:linear-gradient(180deg,#1c2a30,#111a1e);border:0;border-radius:8px;padding:12px 18px;cursor:pointer;box-shadow:0 0 0 2px #05080a,0 0 0 4px #33454a,0 5px 0 4px #05080a;transition:transform .08s,box-shadow .12s,filter .12s;letter-spacing:.04em}
 .gmBtn:hover,.gmBtn.sel{filter:brightness(1.2);box-shadow:0 0 0 2px #05080a,0 0 0 4px #a6f5c6,0 5px 0 4px #05080a,0 0 24px #a6f5c688}
 .gmBtn:active{transform:translateY(3px);box-shadow:0 0 0 2px #05080a,0 0 0 4px #a6f5c6,0 2px 0 4px #05080a}
 .gmBtn.go{background:linear-gradient(180deg,#bfffd8,#6ccaa9);color:#06140e;font-size:18px;padding:14px 26px;animation:lbBtn 1.6s ease-in-out infinite}
 .gmBtn:disabled{opacity:.4;cursor:not-allowed;filter:grayscale(1)}
 /* 메인 */
 #gmMain{align-items:stretch}
 .gmList{display:flex;flex-direction:column;gap:12px;min-width:min(360px,100%);flex:0 0 min(380px,42%);justify-content:center}
 .gmItem{position:relative;display:flex;align-items:center;gap:14px;text-align:left;padding:14px 18px 14px 50px;font-size:clamp(17px,2vw,22px)}
 .gmItem .ic{position:absolute;left:14px;width:26px;text-align:center;font-size:20px;color:#ffe36b;text-shadow:0 0 8px #ffe36b88}
 .gmItem small{display:block;font-size:12px;font-weight:600;color:#9ab8ac;letter-spacing:0;margin-top:3px}
 .gmItem.sel::before{content:'▶';position:absolute;left:-22px;color:#ffe36b;animation:gmBob .5s ease-in-out infinite alternate;text-shadow:0 0 10px #ffe36b}
 @keyframes gmBob{to{transform:translateX(6px)}}
 .gmStage{flex:1;display:flex;flex-direction:column;justify-content:center;gap:10px;min-width:0}
 .gmFrame{position:relative;border-radius:10px;padding:4px;background:conic-gradient(from var(--lbA,0deg),#a6f5c6,#ffe36b,#ff8fb0,#8ad0ff,#a6f5c6);animation:lbSpin 6s linear infinite;box-shadow:0 20px 60px #000c}
 .gmFrame>div{border-radius:7px;overflow:hidden;background:#05080a}
 .gmFrame canvas{display:block;width:100%;height:auto;image-rendering:pixelated}
 .gmTip{font-size:13px;color:#b9d4c8;background:#0a1216c0;border-radius:6px;padding:8px 12px;border:1px solid #ffffff18}
 /* 챕터 선택 */
 #gmStory{flex-direction:column}
 .gmCh{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px}
 .gmCard{position:relative;border-radius:12px;background:#0a1216e0;box-shadow:0 0 0 2px #05080a,0 0 0 4px #33454a,0 8px 0 4px #05080a;overflow:hidden;cursor:pointer;transition:transform .15s,box-shadow .15s}
 .gmCard.sel{transform:translateY(-4px);box-shadow:0 0 0 2px #05080a,0 0 0 4px var(--cc,#a6f5c6),0 10px 0 4px #05080a,0 0 40px var(--cc,#a6f5c6)}
 .gmCard canvas{display:block;width:100%;image-rendering:pixelated}
 .gmCard .in{padding:14px 18px 18px;display:flex;flex-direction:column;gap:8px}
 .gmCard .tag{font-size:11px;letter-spacing:.3em;color:var(--cc,#a6f5c6)}
 .gmCard h2{margin:0;font-size:clamp(22px,3vw,34px);letter-spacing:.08em;font-weight:900}
 .gmCard p{margin:0;font-size:13px;color:#b9d4c8}
 .gmProg{height:10px;border-radius:5px;background:#05080a;overflow:hidden;box-shadow:inset 0 0 0 1px #ffffff18}.gmProg i{display:block;height:100%;background:linear-gradient(90deg,var(--cc,#a6f5c6),#ffe36b)}
 .gmLock{position:absolute;inset:0;background:#05080ad0;display:flex;align-items:center;justify-content:center;flex-direction:column;font-weight:900;font-size:22px;gap:6px;text-align:center;z-index:2}.gmLock small{font-size:13px;font-weight:600;color:#9ab8ac}
 .gmDiffs{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
 .gmPill{font:inherit;font-weight:900;font-size:13px;padding:7px 14px;border-radius:999px;border:0;cursor:pointer;background:#111a1e;color:#9ab8ac;box-shadow:0 0 0 2px #33454a}
 .gmPill.on{background:var(--pc);color:#06100c;box-shadow:0 0 0 2px #05080a,0 0 16px var(--pc)}
 /* 보스 러시 */
 #gmRush{flex-direction:column}
 .gmTabs{display:flex;gap:8px}
 .gmRushWrap{display:grid;grid-template-columns:1.25fr 1fr;gap:20px;flex:1;min-height:0}
 .gmGrid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;align-content:start}
 .gmTile{position:relative;border-radius:8px;padding:0;overflow:hidden;background:#0a1216;cursor:pointer;border:0;box-shadow:0 0 0 2px #05080a,0 0 0 4px #2a383c,0 4px 0 4px #05080a;transition:transform .1s,box-shadow .12s;color:#eaf6ef;font:inherit}
 .gmTile canvas{display:block;width:100%;image-rendering:pixelated}
 .gmTile .nm{display:block;font-size:11px;font-weight:800;padding:4px 4px 6px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:#05080acc}
 .gmTile .no{position:absolute;left:4px;top:3px;font-size:10px;font-weight:900;color:#ffffffaa;text-shadow:0 1px 2px #000}
 .gmTile .rk{position:absolute;right:4px;top:2px;font-weight:900;font-size:14px;text-shadow:0 0 4px #000,0 0 8px #000}
 .gmTile.sel{transform:translateY(-3px) scale(1.04);box-shadow:0 0 0 2px #05080a,0 0 0 4px var(--bc),0 6px 0 4px #05080a,0 0 22px var(--bc);z-index:1}
 .gmTile.lock canvas{filter:grayscale(1) brightness(.25)}
 .gmPrev{display:flex;flex-direction:column;gap:10px;min-width:0}
 .gmPrev .gmFrame canvas{aspect-ratio:24/17}
 #gmPrevName{font-size:clamp(22px,2.6vw,32px);font-weight:900;letter-spacing:.06em;text-shadow:0 3px 0 #0009}
 #gmPrevEpi{font-size:14px;color:#cfe8d0;margin-top:-6px}
 .gmStat{display:flex;gap:8px;flex-wrap:wrap;font-size:12px}
 .gmStat span{background:#0a1216d9;border-radius:6px;padding:5px 10px;box-shadow:0 0 0 1px #ffffff18;font-weight:700}
 .gmRanks{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
 .gmRanks div{background:#0a1216d9;border-radius:6px;padding:6px;text-align:center;font-size:11px;box-shadow:0 0 0 1px #ffffff18}.gmRanks b{display:block;font-size:20px;margin-top:2px}
 /* 공통 판 */
 .gmPanel{background:#0a1216e0;border-radius:12px;padding:18px 20px;box-shadow:0 0 0 2px #05080a,0 0 0 4px #33454a,0 8px 0 4px #05080a}
 #gmHall,#gmSet,#gmHelp{flex-direction:column}
 .gmBig{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
 .gmBig div{text-align:center;background:#05080a;border-radius:10px;padding:12px 6px;box-shadow:inset 0 0 0 1px #ffffff18}.gmBig b{display:block;font-size:clamp(22px,3vw,34px);font-weight:900;color:#ffe36b;text-shadow:0 0 12px #ffe36b66}.gmBig small{color:#9ab8ac;font-size:12px}
 #gmMedals{margin-top:14px}#gmMedals #medalRow{margin-top:0}
 .gmRow{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:12px 0;border-bottom:1px solid #ffffff12}.gmRow>label{min-width:90px;font-weight:900;color:#a6f5c6;letter-spacing:.1em}
 #gmSet #namePanel{margin:0;background:transparent!important;box-shadow:none;border:0!important;padding:0;backdrop-filter:none}
 #gmHelp .panel{margin:0}
 .gmFoot{display:flex;justify-content:space-between;padding:6px 26px 10px;font-size:12px;color:#8fb0a4;letter-spacing:.08em}
 .gmFoot b{color:#ffe36b}
 @media (max-width:760px){.gmTop{padding:10px 14px 4px}.gmScreen{padding:8px 14px 12px;flex-direction:column!important}.gmList{flex:0 0 auto;min-width:0}.gmCh,.gmRushWrap{grid-template-columns:1fr}.gmGrid{grid-template-columns:repeat(5,1fr);gap:6px}.gmTile .nm{font-size:9px}.gmBig{grid-template-columns:repeat(3,1fr)}.gmFoot{display:none}.gmItem{padding:11px 14px 11px 44px}.gmHead{font-size:19px;letter-spacing:.08em}.gmPrev .gmFrame{width:100%}}`;
 document.head.appendChild(st);
 const m=document.createElement('div');m.id='gameMenu';m.innerHTML=`
 <div class="gmTop"><div class="gmLogo">BEAT <b>BLADE</b><small>M A C H I N A</small></div>
  <div class="gmHud"><span class="gmChip name" id="gmName">하루</span><span class="gmChip coin" id="gmCoins">🪙 0</span><span class="gmChip" id="gmDiffChip">보통</span><button class="gmBtn" id="gmSound" style="padding:7px 12px;font-size:13px">🔊 ON</button></div></div>
 <div class="gmBody">
  <div class="gmScreen" id="gmMain"><div class="gmList" id="gmList"></div><div class="gmStage"><div class="gmFrame"><div id="gmStageSlot"></div></div><div class="gmTip" id="gmTip"></div></div></div>
  <div class="gmScreen" id="gmStory"><div class="gmHead"><button class="gmBtn gmBack" data-back>◀ 뒤로</button>CHAPTER SELECT</div><div class="gmCh" id="gmCh"></div>
   <div class="gmPanel" style="margin-top:6px"><div class="gmDiffs" id="gmDiffA"></div><div class="gmTip" id="gmDiffInfoA" style="margin-top:8px;background:transparent;border:0;padding:0"></div></div></div>
  <div class="gmScreen" id="gmRush"><div class="gmHead"><button class="gmBtn gmBack" data-back>◀ 뒤로</button>BOSS RUSH<div class="gmTabs"><button class="gmPill" data-ch="0">CHAPTER 1</button><button class="gmPill" data-ch="1">CHAPTER 2</button></div></div>
   <div class="gmRushWrap"><div class="gmGrid" id="gmGrid"></div>
    <div class="gmPrev"><div class="gmFrame"><div><canvas id="gmPrevCv" width="240" height="170"></canvas></div></div>
     <div id="gmPrevName"></div><div id="gmPrevEpi"></div><div class="gmStat" id="gmPrevStat"></div><div class="gmRanks" id="gmPrevRanks"></div>
     <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;justify-content:space-between"><div class="gmDiffs" id="gmDiffB"></div><button class="gmBtn go" id="gmFight">⚔ 전투 시작</button></div></div></div></div>
  <div class="gmScreen" id="gmHall"><div class="gmHead"><button class="gmBtn gmBack" data-back>◀ 뒤로</button>HALL OF FAME</div><div class="gmPanel"><div class="gmBig" id="gmBig"></div><div id="gmMedals"></div></div></div>
  <div class="gmScreen" id="gmSet"><div class="gmHead"><button class="gmBtn gmBack" data-back>◀ 뒤로</button>SETTINGS</div><div class="gmPanel" id="gmSetPanel">
   <div class="gmRow"><label>소리</label><button class="gmBtn" id="gmSound2">🔊 ON</button></div>
   <div class="gmRow"><label>싱크</label><button class="gmBtn" id="gmSyncM">−10ms</button><b id="gmSyncV" style="min-width:60px;text-align:center">0ms</b><button class="gmBtn" id="gmSyncP">+10ms</button><button class="gmBtn" id="gmSyncT">▶ 박자 테스트</button><div id="gmSyncSlot"></div><div class="gmTip" style="flex-basis:100%">소리가 늦게 들리면 +, 빠르면 − · 블루투스 이어폰은 보통 +가 필요해요</div></div>
   <div class="gmRow"><label>난이도</label><div class="gmDiffs" id="gmDiffC"></div></div>
   <div class="gmRow" style="border:0"><label>이름</label><div id="gmNameSlot" style="flex:1;min-width:260px"></div></div></div></div>
  <div class="gmScreen" id="gmHelp"><div class="gmHead"><button class="gmBtn gmBack" data-back>◀ 뒤로</button>HOW TO PLAY</div><div id="gmHelpSlot"></div></div>
 </div>
 <div class="gmFoot"><span><b>↑↓←→</b> 선택 · <b>Enter</b> 결정 · <b>Esc</b> 뒤로</span><span>BEAT BLADE · MACHINA</span></div>`;
 document.body.appendChild(m);document.body.classList.add('gmOn');
 const list=$('gmList');GM_ITEMS.forEach((it,i)=>{const b=document.createElement('button');b.className='gmBtn gmItem';b.dataset.i=i;b.innerHTML='<span class="ic">'+it.ic+'</span><span>'+it.t+'<small>'+it.sub+'</small></span>';b.onmouseenter=()=>{if(GM.sel!==i){GM.sel=i;gmSfx('move');gmMainSel()}};b.onclick=()=>{GM.sel=i;gmMainGo()};list.appendChild(b)});
 m.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>{gmSfx('back');gmShow('main')});
 m.querySelectorAll('.gmTabs [data-ch]').forEach(b=>b.onclick=()=>{GM.rushCh=+b.dataset.ch;GM.rushSel=0;gmSfx('move');gmRushBuild()});
 const snd=()=>{$('sound').click();gmHud()};$('gmSound').onclick=snd;$('gmSound2').onclick=snd;
 $('gmSyncM').onclick=()=>{$('syncMinus').click();gmHud()};$('gmSyncP').onclick=()=>{$('syncPlus').click();gmHud()};$('gmSyncT').onclick=()=>{$('syncTest').click()};
 $('gmFight').onclick=()=>gmFight();
 // 기존 요소 옮기기
 const sl=$('syncLight');if(sl)$('gmSyncSlot').appendChild(sl);
 const help=[...document.querySelectorAll('main section.panel')].find(s=>s.querySelector('h3')&&s.querySelector('h3').textContent.indexOf('HOW TO PLAY')>=0);if(help)$('gmHelpSlot').appendChild(help);
 addEventListener('keydown',gmKey,true);
 gmShow('main')}
function gmHud(){try{$('gmName').textContent='♥ '+(saveData.name||'하루');$('gmCoins').textContent='🪙 '+(saveData.coins||0);const d=GM_DIFF.find(x=>x[0]===diff)||GM_DIFF[1];$('gmDiffChip').textContent='난이도 · '+d[1];$('gmDiffChip').style.color=d[2];
 const s='🔊 '+(sound?'ON':'OFF');$('gmSound').textContent=s;$('gmSound2').textContent=s;$('gmSyncV').textContent=($('syncVal')||{}).textContent||'0ms';
 for(const id of ['gmDiffA','gmDiffB','gmDiffC']){const box=$(id);if(!box)continue;box.innerHTML='';GM_DIFF.forEach(([k,n,c])=>{const b=document.createElement('button');b.className='gmPill'+(k===diff?' on':'');b.style.setProperty('--pc',c);b.textContent=n;b.onclick=()=>{$('diffSel').value=k;$('diffSel').onchange&&$('diffSel').onchange();gmSfx('ok');gmHud();if(GM.scr==='rush')gmRushInfo()};box.appendChild(b)})}
 if($('gmDiffInfoA'))$('gmDiffInfoA').textContent=(D()&&D().info)||''}catch(e){}}
function gmShow(scr){gmBuild();GM.scr=scr;document.querySelectorAll('#gameMenu .gmScreen').forEach(s=>s.classList.toggle('on',s.id==='gm'+scr[0].toUpperCase()+scr.slice(1)));
 const stage=$('titleCv');if(scr==='main'&&stage){$('gmStageSlot').appendChild(stage);stage.style.cssText='display:block;width:100%;height:auto;image-rendering:pixelated';gmMainSel()}
 if(scr==='story')gmStoryBuild();if(scr==='rush')gmRushBuild();if(scr==='hall')gmHallBuild();if(scr==='set'){const np=$('namePanel');if(np&&!$('gmNameSlot').contains(np))$('gmNameSlot').appendChild(np)}
 gmHud()}
function gmMainSel(){document.querySelectorAll('#gmList .gmItem').forEach((b,i)=>b.classList.toggle('sel',i===GM.sel));const tips=['이야기: 시계골을 구하는 모험. 이어하기도 여기서!','보스 러시: 원하는 수호자를 골라 바로 한 판!','상점: 코인으로 캐릭터 · 무기 · 펫을 사고 장착해요.','명예의 전당: 깬 보스의 메달과 랭크를 모아 보세요.','설정: 소리, 박자 싱크, 난이도, 이름을 바꿔요.','조작법: 이동 · 대시 · 패링 · 반격 · 궁극기.'];if($('gmTip'))$('gmTip').textContent='💡 '+tips[GM.sel]}
function gmMainGo(){const it=GM_ITEMS[GM.sel];gmSfx('ok');if(it.id==='shop'){try{openShop('ch')}catch(e){}return}gmShow(it.id)}
/* 챕터 선택 */
function gmStoryBuild(){try{refreshMenu()}catch(e){}const box=$('gmCh');{let pk=$('gmCvPark');if(!pk){pk=document.createElement('div');pk.id='gmCvPark';pk.style.display='none';document.body.appendChild(pk)}box.querySelectorAll('canvas').forEach(cv=>pk.appendChild(cv))}box.innerHTML='';const c1=ch1Cleared(),c2=ch2Cleared(),ch=saveData.chapter||0;
 const mk=(i,tag,title,desc,cc,cvId,btnId,prog,done,locked)=>{const d=document.createElement('div');d.className='gmCard'+(GM.storySel===i?' sel':'');d.style.setProperty('--cc',cc);
  d.innerHTML='<div class="cvSlot"></div><div class="in"><div class="tag">'+tag+'</div><h2>'+title+'</h2><p>'+desc+'</p><div class="gmProg"><i style="width:'+Math.round(prog*100)+'%"></i></div><div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center"><button class="gmBtn go" data-go>'+$(btnId).textContent+'</button>'+(i===0&&!$('btnNew').hidden?'<button class="gmBtn" data-new>처음부터</button>':'')+(done?'<span class="gmChip" style="color:#ffe36b">✓ CLEAR</span>':'')+'</div></div>'+(locked?'<div class="gmLock">🔒 LOCKED<small>챕터 1을 클리어하면 열려요</small></div>':'');
  const cv=$(cvId);if(cv){cv.style.cssText='display:block;width:100%;height:auto;image-rendering:pixelated';d.querySelector('.cvSlot').appendChild(cv)}
  d.onmouseenter=()=>{if(GM.storySel!==i){GM.storySel=i;gmSfx('move');box.querySelectorAll('.gmCard').forEach((x,j)=>x.classList.toggle('sel',j===i))}};
  d.querySelector('[data-go]').onclick=e=>{e.stopPropagation();if(locked){gmSfx('no');return}gmSfx('ok');$(btnId).click()};const nb=d.querySelector('[data-new]');if(nb)nb.onclick=e=>{e.stopPropagation();gmSfx('ok');$('btnNew').click()};
  d.onclick=()=>{if(locked){gmSfx('no');return}gmSfx('ok');$(btnId).click()};if(locked)d.classList.add('lock');box.appendChild(d)};
 mk(0,'PART 1 · PIXEL RHYTHM ADVENTURE','BEAT MACHINA','멈춰버린 마을의 시계. 박동이 울리는 동굴 깊은 곳의 기계 수호자들.','#a6f5c6','titleCv','btnStory',c1?1:Math.min(1,ch/10),c1,false);
 mk(1,'PART 2 · 정적이 남긴 것들','THE HUNGER','종소리가 다시 울린 지 한 달. 황무지에서 깨어나는 살아있는 것들.','#ff4dd2','titleCv2','btnStory2',c2?1:Math.max(0,Math.min(1,(ch-10)/10)),c2,!c1);
 {const s3=(saveData.ch3||{}),n3=(typeof C3CASES!=='undefined'?C3CASES.length:3),d3=Math.min(1,(s3.ci||0)/Math.max(1,n3));mk(2,'PART 3 · ORIGIN · 추리','첫 번째 태엽지기','사십 년 전의 시계골. 3시 12분에 멈춘 시계들과, 깨지 않는 아이. 진실은 박동 속에 있다.','#ffd98a','titleCv3','btnStory3',d3,(s3.ci||0)>=n3,!c1)}}
/* 보스 러시 */
const _gmTileCache={};
function gmTileCanvas(i){if(_gmTileCache[i])return _gmTileCache[i];const B=BOSSES[i],c2=document.createElement('canvas');c2.width=96;c2.height=72;const c=c2.getContext('2d');c.imageSmoothingEnabled=false;
 const g=c.createLinearGradient(0,0,0,72);g.addColorStop(0,shade(B.c,.12));g.addColorStop(1,shade(B.c,.38));c.fillStyle=g;c.fillRect(0,0,96,72);c.fillStyle=shade(B.c,.2);c.fillRect(0,62,96,10);
 try{drawMech(c,B,48,64,0,{still:true},2.2);const hs=idleHandsAt(B,48,64,2.2),g0=geo(B,48,64,2.2);hs.forEach((h,k)=>drawHand(c,B,h,g0.sh[k][0],g0.sh[k][1],0,false,.75))}catch(e){}return _gmTileCache[i]=c2}
function gmBest(i){const o='PSABC';let best=null;for(const d of ['easy','normal','hard','extreme']){const v=(saveData.clear||{})[i+'|'+d];if(v&&(best===null||o.indexOf(v)<o.indexOf(best)))best=v}return best}
function gmRushBuild(){const grid=$('gmGrid');grid.innerHTML='';const locked=GM.rushCh===1&&!ch1Cleared();document.querySelectorAll('.gmTabs [data-ch]').forEach(b=>{b.classList.toggle('on',+b.dataset.ch===GM.rushCh);b.style.setProperty('--pc',+b.dataset.ch?'#ff4dd2':'#a6f5c6')});
 for(let k=0;k<10;k++){const i=GM.rushCh*10+k,B=BOSSES[i],b=document.createElement('button');b.className='gmTile'+(k===GM.rushSel?' sel':'')+(locked?' lock':'');b.style.setProperty('--bc',B.c);
  const cv=gmTileCanvas(i).cloneNode(false);cv.getContext('2d').drawImage(gmTileCanvas(i),0,0);b.appendChild(cv);const rk=gmBest(i);
  b.insertAdjacentHTML('beforeend','<span class="no">'+String(i+1).padStart(2,'0')+'</span>'+(rk?'<span class="rk" style="color:'+(rk==='P'?'#fff6cf':rk==='S'?'#ffd166':'#cfe8d0')+'">'+(rk==='P'?'★':rk)+'</span>':'')+'<span class="nm">'+(locked?'???':B.name)+'</span>');
  b.onmouseenter=()=>{if(GM.rushSel!==k){GM.rushSel=k;gmSfx('move');gmRushSelUpd()}};b.onclick=()=>{if(GM.rushSel===k)gmFight();else{GM.rushSel=k;gmSfx('move');gmRushSelUpd()}};grid.appendChild(b)}
 gmRushInfo()}
function gmRushSelUpd(){document.querySelectorAll('#gmGrid .gmTile').forEach((b,k)=>b.classList.toggle('sel',k===GM.rushSel));gmRushInfo()}
function gmRushInfo(){const i=GM.rushCh*10+GM.rushSel,B=BOSSES[i],locked=GM.rushCh===1&&!ch1Cleared();$('gmPrevName').textContent=locked?'???':B.name;$('gmPrevName').style.color=B.c;$('gmPrevEpi').textContent=locked?'챕터 1을 클리어하면 만날 수 있어요':'"'+BOSS_META[i].epi+'"  ·  '+B.en;
 const T=B.track||{};$('gmPrevStat').innerHTML='<span>♪ '+(T.title||'')+'</span><span>♩ '+Math.round(T.bpm||0)+' BPM</span><span>HP '+(4200+i*450).toLocaleString()+'</span><span>GUARDIAN '+String(i+1).padStart(2,'0')+'</span>';
 $('gmPrevRanks').innerHTML=GM_DIFF.map(([k,n,c])=>{const v=(saveData.clear||{})[i+'|'+k];return '<div style="'+(k===diff?'box-shadow:0 0 0 2px '+c:'')+'">'+n+'<b style="color:'+(v?(v==='P'?'#fff6cf':c):'#3a4a50')+'">'+(v?(v==='P'?'★':v):'—')+'</b></div>'}).join('');
 $('gmFight').disabled=locked;GM.prevBoss=i}
function gmFight(){const i=GM.rushCh*10+GM.rushSel;if(GM.rushCh===1&&!ch1Cleared()){gmSfx('no');return}gmSfx('ok');startRush(i)}
function gmPrevDraw(now){if(GM.scr!=='rush')return;const cv=$('gmPrevCv');if(!cv)return;const c=cv.getContext('2d'),i=GM.prevBoss||0,B=BOSSES[i],locked=GM.rushCh===1&&!ch1Cleared(),t=now/1000;c.imageSmoothingEnabled=false;
 const g=c.createLinearGradient(0,0,0,170);g.addColorStop(0,shade(B.c,.08));g.addColorStop(1,shade(B.c,.32));c.fillStyle=g;c.fillRect(0,0,240,170);
 c.globalAlpha=.25;c.strokeStyle=B.c;for(let k=0;k<3;k++){const q=((t*.6)+k/3)%1;c.beginPath();c.arc(120,96,20+q*110,0,TAU);c.stroke()}c.globalAlpha=1;
 c.fillStyle=shade(B.c,.18);c.fillRect(0,146,240,24);for(let x=0;x<240;x+=12){c.fillStyle=shade(B.c,.24);c.fillRect(x,146,6,24)}
 const bob=Math.sin(t*2.2)*2,bo={pulse:Math.pow(1-((t*(B.track.bpm||120)/60)%1),3),expose:false,open:0,eye:0,dorm:false,flash:false,warn:0};
 try{drawMech(c,B,120,150+bob,now,bo,3.4);const hs=idleHandsAt(B,120,150+bob,3.4),g0=geo(B,120,150+bob,3.4);hs.forEach((h,k)=>drawHand(c,B,h,g0.sh[k][0],g0.sh[k][1]+Math.sin(t*2+k)*2,t,false,1))}catch(e){}
 if(locked){c.fillStyle='rgba(5,8,10,.85)';c.fillRect(0,0,240,170);c.fillStyle='#eaf6ef';c.font='900 30px '+FONT_STACK;c.textAlign='center';c.fillText('🔒',120,96);c.textAlign='left'}}
/* 명예의 전당 */
function gmHallBuild(){const e=Object.entries(saveData.clear||{}),bs=new Set(e.map(([k])=>k.split('|')[0])),P=e.filter(([,v])=>v==='P').length,S=e.filter(([,v])=>v==='P'||v==='S').length;
 $('gmBig').innerHTML='<div><b>'+bs.size+'<small style="font-size:14px"> / 20</small></b><small>클리어한 보스</small></div><div><b>'+P+'</b><small>PERFECT</small></div><div><b>'+S+'</b><small>S랭크 이상</small></div><div><b>'+(saveData.bestCombo||0)+'</b><small>최고 콤보</small></div><div><b>'+(saveData.coins||0)+'</b><small>코인</small></div>';
 try{buildStats()}catch(e){}const sp=$('statsPanel');const bar=$('statsBar'),row=$('medalRow');if(bar)$('gmMedals').appendChild(bar);if(row)$('gmMedals').appendChild(row)}
/* 키보드 */
function gmKey(e){if(mode!=='menu'||document.body.classList.contains('inBattle'))return;const sm=$('shopModal');if(sm&&!sm.hidden)return;if(document.getElementById('splash'))return;const tag=(e.target&&e.target.tagName)||'';if(tag==='INPUT'||tag==='SELECT')return;
 const k=e.code;let used=true;
 if(GM.scr==='main'){if(k==='ArrowDown'||k==='KeyS'){GM.sel=(GM.sel+1)%GM_ITEMS.length;gmSfx('move');gmMainSel()}else if(k==='ArrowUp'||k==='KeyW'){GM.sel=(GM.sel+GM_ITEMS.length-1)%GM_ITEMS.length;gmSfx('move');gmMainSel()}else if(k==='Enter'||k==='Space'||k==='KeyJ')gmMainGo();else used=false}
 else if(k==='Escape'||k==='Backspace'){gmSfx('back');gmShow('main')}
 else if(GM.scr==='story'){if(k==='ArrowLeft'||k==='ArrowRight'||k==='KeyA'||k==='KeyD'){GM.storySel=(GM.storySel+((k==='ArrowLeft'||k==='KeyA')?2:1))%3;gmSfx('move');document.querySelectorAll('#gmCh .gmCard').forEach((x,j)=>x.classList.toggle('sel',j===GM.storySel))}else if(k==='Enter'||k==='Space'){const cards=document.querySelectorAll('#gmCh .gmCard');cards[GM.storySel]&&cards[GM.storySel].click()}else used=false}
 else if(GM.scr==='rush'){const s=GM.rushSel;if(k==='ArrowRight'||k==='KeyD')GM.rushSel=(s+1)%10;else if(k==='ArrowLeft'||k==='KeyA')GM.rushSel=(s+9)%10;else if(k==='ArrowDown'||k==='KeyS')GM.rushSel=(s+5)%10;else if(k==='ArrowUp'||k==='KeyW')GM.rushSel=(s+5)%10;else if(k==='Tab'||k==='KeyQ'||k==='KeyE'){GM.rushCh=(GM.rushCh+1)%4;GM.rushSel=0;gmSfx('move');gmRushBuild();e.preventDefault();return}else if(k==='Enter'||k==='Space'){gmFight();e.preventDefault();return}else used=false;if(used&&s!==GM.rushSel){gmSfx('move');gmRushSelUpd()}}
 else used=false;
 if(used)e.preventDefault()}
function menuTick(now){if(!GM.built)return;if(GM.scr==='story'&&typeof c3MenuArt==='function')c3MenuArt(now);gmPrevDraw(now);if(now-GM.prevT>1000){GM.prevT=now;gmHud()}}
/* 결과창 · 대화창 · 상점도 게임 UI처럼 */
(function(){try{if(typeof document==='undefined')return;const st=document.createElement('style');st.textContent=`
 #overlay{background:radial-gradient(ellipse at center,#0a1418e6,#020406f5)!important}
 #overlay .modal{background:linear-gradient(180deg,#132026,#0a1216);border-radius:12px;padding:22px 26px;box-shadow:0 0 0 2px #05080a,0 0 0 4px #a6f5c6,0 0 0 7px #05080a,0 10px 0 7px #05080a,0 0 60px #a6f5c655;animation:gmPop .35s cubic-bezier(.2,.9,.3,1.3)}
 @keyframes gmPop{from{transform:scale(.85);opacity:0}to{transform:none;opacity:1}}
 #overlay #mTag{letter-spacing:.4em;color:#ffe36b;font-weight:900;text-shadow:0 0 12px #ffe36b88}
 #overlay #mTitle{font-weight:900;letter-spacing:.06em;text-shadow:0 4px 0 #000a,0 0 20px #ffffff44}
 #overlay button,#shopModal button,.rushModal button{font-family:${FONT_STACK};font-weight:900;color:#eaf6ef;background:linear-gradient(180deg,#1c2a30,#111a1e);border:0!important;border-radius:8px;padding:11px 18px;cursor:pointer;box-shadow:0 0 0 2px #05080a,0 0 0 4px #33454a,0 5px 0 4px #05080a;transition:transform .08s,filter .12s,box-shadow .12s}
 #overlay button:hover,#shopModal button:hover{filter:brightness(1.2);box-shadow:0 0 0 2px #05080a,0 0 0 4px #a6f5c6,0 5px 0 4px #05080a,0 0 20px #a6f5c688}
 #overlay button:active,#shopModal button:active{transform:translateY(3px)}
 #overlay button.primary{background:linear-gradient(180deg,#bfffd8,#6ccaa9)!important;color:#06140e!important}
 #dlg{border:0!important;border-radius:10px;background:linear-gradient(180deg,#0e1a20f5,#060c10f8)!important;box-shadow:0 0 0 calc(var(--u)*.6) #05080a,0 0 0 calc(var(--u)*1.4) #a6f5c6,0 0 0 calc(var(--u)*2) #05080a,0 0 calc(var(--u)*10) #a6f5c655!important}
 #dlgName{display:inline-block;background:#a6f5c6;color:#06140e!important;padding:calc(var(--u)*.6) calc(var(--u)*3);border-radius:calc(var(--u)*1.2);box-shadow:0 calc(var(--u)*.8) 0 #05080a}
 #dlgHint{animation:gmBob .5s ease-in-out infinite alternate;color:#ffe36b}
 #shopModal{background:radial-gradient(ellipse at top,#132430,#05080a)!important}
 .rushBar{background:linear-gradient(180deg,#132026,#0a1216);border-bottom:0!important;box-shadow:0 4px 0 #05080a,0 6px 0 #a6f5c655}
 .shopCard{border:0!important;border-radius:10px!important;box-shadow:0 0 0 2px #05080a,0 0 0 4px #2a383c,0 5px 0 4px #05080a;transition:transform .12s,box-shadow .12s}
 .shopCard:hover{transform:translateY(-3px);box-shadow:0 0 0 2px #05080a,0 0 0 4px #ffd166,0 8px 0 4px #05080a,0 0 22px #ffd16666}`;document.head.appendChild(st)}catch(e){}})();
/* 메인 오른쪽 정보 패널 + 챕터 선택 요약 */
(function(){try{if(typeof document==='undefined')return;const st=document.createElement('style');st.textContent=`
 .gmInfo{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
 .gmIT{position:relative;background:linear-gradient(180deg,#0e1a20e8,#081014e8);border:1px solid #ffffff1c;border-radius:8px;padding:9px 12px 10px;box-shadow:0 3px 0 #0008,inset 0 1px 0 #ffffff10;overflow:hidden;min-width:0;animation:gmITin .35s both}
 .gmIT:before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--ic,#a6f5c6);box-shadow:0 0 12px var(--ic,#a6f5c6)}
 .gmIT .k{font-size:11px;letter-spacing:.12em;color:#8fa9a8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 .gmIT .v{font-size:18px;font-weight:900;color:var(--ic,#a6f5c6);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:0 0 10px color-mix(in srgb,var(--ic,#a6f5c6) 40%,transparent)}
 .gmIT .s{font-size:11px;color:#9ab;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 .gmIT .bar{height:5px;background:#ffffff14;border-radius:3px;margin-top:6px;overflow:hidden}.gmIT .bar i{display:block;height:100%;background:var(--ic,#a6f5c6);box-shadow:0 0 8px var(--ic,#a6f5c6)}
 @keyframes gmITin{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
 .gmIT:nth-child(2){animation-delay:.05s}.gmIT:nth-child(3){animation-delay:.1s}.gmIT:nth-child(4){animation-delay:.15s}
 .gmCard.lock .cvSlot,.gmCard.lock .in{filter:grayscale(.8) brightness(.55)}.gmCard.lock .gmBtn.go{pointer-events:none}
 .gmLockTag{position:absolute;left:50%;top:38%;transform:translate(-50%,-50%);background:#05080ae8;border:2px solid #ffffff30;border-radius:8px;padding:10px 16px;font-weight:900;font-size:15px;color:#eaf6ef;white-space:nowrap;box-shadow:0 6px 0 #0008}
 .gmSum{display:flex;gap:8px;margin-left:auto;letter-spacing:normal;font-size:13px;text-shadow:none;flex:0 1 auto;min-width:0}
 .gmSum .gmIT{flex:0 1 150px;padding:6px 10px 7px;min-width:96px}.gmSum .gmIT .v{font-size:15px}.gmSum .gmIT .k{font-size:10px}.gmSum .gmIT .s{font-size:10px}
 #gmMain .gmStage{justify-content:flex-start;padding-top:4px}
 #gmMain .gmStage .gmFrame{width:min(100%,calc((100vh - 290px)*2.53));align-self:center}
 @media (max-width:1000px){.gmSum .gmIT:nth-child(n+3){display:none}}
 @media (max-width:760px){.gmInfo{grid-template-columns:repeat(2,1fr)}}`;document.head.appendChild(st)}catch(e){}})();
function gmTileH(ic,k,v,s,pct){return '<div class="gmIT" style="--ic:'+ic+'"><div class="k">'+k+'</div><div class="v">'+v+'</div>'+(s?'<div class="s">'+s+'</div>':'')+(pct!=null?'<div class="bar"><i style="width:'+Math.round(Math.max(0,Math.min(1,pct))*100)+'%"></i></div>':'')+'</div>'}
function gmStats(){const cl=saveData.clear||{},o='PSABC',best=i=>{let b=null;for(const d of ['easy','normal','hard','extreme']){const v=cl[i+'|'+d];if(v&&(b===null||o.indexOf(v)<o.indexOf(b)))b=v}return b};let n=0,s=0,p=0,next=-1;for(let i=0;i<20;i++){const b=best(i);if(b){n++;if(b==='S'||b==='P')s++;if(b==='P')p++}else if(next<0)next=i}
 const ch=saveData.chapter||0,c1=ch1Cleared(),c2=ch2Cleared(),s3=saveData.ch3||{},n3=(typeof C3CASES!=='undefined'?C3CASES.length:3);return {n,s,p,next,ch,c1,c2,ci3:s3.ci||0,best3:s3.best||{},n3}}
function gmInfoFill(){const stg=document.querySelector('#gmMain .gmStage');if(!stg)return;let box=$('gmInfo');if(!box){box=document.createElement('div');box.id='gmInfo';box.className='gmInfo';stg.appendChild(box)}
 const S=gmStats(),T=gmTileH,inv=(typeof shopInv==='function')?shopInv():saveData,eq=inv.eq||{ch:0,wp:0,pt:0};let h='';
 const r3=[...Array(S.n3)].map((_,i)=>S.best3[i]||'–').join(' · ');
 switch(GM.sel){
  case 0:{const p1=S.c1&&!DEBUG_UNLOCK_CH2||S.ch>=10?1:Math.min(1,S.ch/10),p2=S.c2?1:Math.max(0,Math.min(1,(S.ch-10)/10)),p3=S.ci3/S.n3;
   const nx=S.ch<10?'CHAPTER '+(S.ch+1)+' · '+((typeof STORY!=='undefined'&&STORY[S.ch])?STORY[S.ch].cave:''):S.ci3<S.n3?'ORIGIN · CASE '+String(S.ci3+1).padStart(2,'0')+' '+((typeof C3CASES!=='undefined'&&C3CASES[S.ci3])?C3CASES[S.ci3].title:''):'2막 준비 중';
   h=T('#a6f5c6','PART 1 · BEAT MACHINA',Math.round(p1*100)+'%',S.c1&&p1>=1?'✓ 클리어':'동굴 '+Math.min(10,S.ch)+' / 10',p1)+T('#ff4dd2','PART 2 · THE HUNGER',Math.round(p2*100)+'%',S.c2?'✓ 클리어':'황무지 '+Math.max(0,S.ch-10)+' / 10',p2)+T('#ffd98a','PART 3 · ORIGIN',S.ci3+' / '+S.n3+' 사건','추리 랭크 '+r3,p3)+T('#8ae8ff','다음 목표','▶ 이어하기',nx,null);break}
  case 1:h=T('#ffd166','쓰러뜨린 수호자',S.n+' / 20',S.n>=20?'모두 격파!':'남은 수호자 '+(20-S.n),S.n/20)+T('#fff6cf','S 이상 랭크',S.s+'개','★ 퍼펙트 '+S.p+'개',S.s/20)+T('#ff9aa8','최고 콤보',(saveData.bestCombo||0)+' HIT','박자를 끊지 마세요',null)+T('#8ae8ff','추천 상대',S.next>=0?BOSSES[S.next].name:'자유 선택',S.next>=0?'GUARDIAN '+String(S.next+1).padStart(2,'0')+' · '+BOSSES[S.next].en:'원하는 보스와 재대결',null);break;
  case 2:{const C=(typeof CHARS!=='undefined'&&CHARS[eq.ch])||{},Wp=(typeof WEAPONS!=='undefined'&&WEAPONS[eq.wp])||{},Pt=(typeof PETS!=='undefined'&&PETS[eq.pt])||{},own=(inv.inv?inv.inv.ch.length+inv.inv.wp.length+inv.inv.pt.length:3),all=(typeof CHARS!=='undefined'?CHARS.length+WEAPONS.length+PETS.length:3);
   h=T('#ffd166','보유 코인','🪙 '+(saveData.coins||0),'보스·사건을 해결하면 늘어나요',null)+T('#a6f5c6','캐릭터',C.name||'하루',C.sub||'',null)+T('#ff9aa8','무기',Wp.name||'-',Wp.desc||'',null)+T('#8ae8ff','펫 · 수집',Pt.name||'-','수집 '+own+' / '+all,own/all);break}
  case 3:h=T('#ffd166','메달',S.n+' / 20','수호자 메달',S.n/20)+T('#fff6cf','퍼펙트',S.p+'개','피격 0회 클리어',S.p/20)+T('#ffd98a','ORIGIN 추리',S.ci3+' / '+S.n3,'랭크 '+r3,S.ci3/S.n3)+T('#ff9aa8','최고 콤보',(saveData.bestCombo||0)+' HIT','',null);break;
  case 4:{const d=GM_DIFF.find(x=>x[0]===diff)||GM_DIFF[1];h=T(d[2],'난이도',d[1],'설정에서 바꿀 수 있어요',null)+T('#a6f5c6','소리',(typeof sound!=='undefined'&&sound)?'ON':'OFF','효과음 · 음악',null)+T('#8ae8ff','박자 싱크',(saveData.syncMs||0)+'ms','소리가 늦게 들리면 +',null)+T('#ffb070','이름',saveData.name||'하루','대사 속 주인공 이름',null);break}
  default:h=T('#a6f5c6','이동 · 대시','WASD · Shift','방향키도 돼요',null)+T('#ffd166','반격','Q W E R','원 안의 키 · 터치',null)+T('#8ae8ff','패링','F','공격 직전에 튕겨내기',null)+T('#ff9aa8','궁극기 · 추리','C · N','추리: 수첩 N · 힌트 H',null)}
 box.innerHTML=h}
const _gmMainSel0=gmMainSel;gmMainSel=function(){_gmMainSel0.apply(this,arguments);try{gmInfoFill()}catch(e){console.error(e)}};
const _gmStory0=gmStoryBuild;gmStoryBuild=function(){_gmStory0.apply(this,arguments);try{const box=$('gmCh');if(!box)return;let sm=$('gmSum');if(!sm){sm=document.createElement('div');sm.id='gmSum';sm.className='gmSum';const hd=document.querySelector('#gmStory .gmHead');(hd||box.parentNode).appendChild(sm)}
 const S=gmStats(),T=gmTileH,tot=((S.c1||S.ch>=10?1:S.ch/10)+(S.c2?1:Math.max(0,(S.ch-10)/10))+S.ci3/S.n3)/3;
 sm.innerHTML=T('#fff6cf','전체 진행도',Math.round(tot*100)+'%','세 개의 이야기',tot)+T('#ffd166','쓰러뜨린 수호자',S.n+' / 20','',S.n/20)+T('#ffd98a','ORIGIN 사건',S.ci3+' / '+S.n3,(()=>{const g=[...Array(S.n3)].map((_,i)=>S.best3[i]).filter(v=>v&&v!=='—'&&v!=='–');return g.length?'랭크 '+g.join(' '):'랭크 기록 없음'})(),S.ci3/S.n3)+T('#8ae8ff','보유 코인','🪙 '+(saveData.coins||0),'',null)}catch(e){console.error(e)}};
/*GMN_END*/
/*C3_BEGIN*/
/* 몬스터 리디자인: 손 그리기 가장 안쪽 갈고리 (다른 효과 래퍼보다 먼저 감쌈) */
{const _b=drawHand;drawHand=function(c,B,h,sx,sy,t,dorm,sc){try{if(typeof monHandHook==='function'&&monHandHook(c,B,h,sx,sy,t,dorm,sc))return}catch(e){}return _b.apply(this,arguments)}}

