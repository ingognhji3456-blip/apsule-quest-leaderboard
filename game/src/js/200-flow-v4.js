/* ================= v4 흐름 연결 ================= */
function dlgLine(){const [who,txt]=dlg.q[dlg.i];$('dlgName').textContent=who||'';$('dlgName').style.display=who?'block':'none';dlg.txt=txt;dlg.t0=performance.now();dlg.shown=0;$('dlgText').textContent='';drawPortrait(who||'');$('dlg').classList.toggle('hasP',!!who)}
function newFight(bi,st){newFight0(bi,st);Object.assign(G,{movers:[],cones:[],pull:null,fxr:[],slashFx:[],hitstop:0,cine:null,afterIntro:null,finisherDone:false,ai:0,phraseNames:[],counterLen:0,dieHands:0,dieFlash:0,shard:null,clickTarget:null,nextCircle:0,hp:5600+bi*380,maxHp:5600+bi*380});G.special={nextAt:1e18,active:null}}
function startStory(ch){initAudio();story=true;chapter=ch;enterGame();if(ch===0)playScene('prologue',()=>enterCave(0));else if(ch===10)playScene('part2intro',()=>enterCave(10));else enterCave(ch)}
function startFight(bi,st,quick){$('btnA').style.display='none';$('touch').style.display='';mode='boss';paused=false;stopMusic();newFight(bi,st);$('overlay').hidden=true;$('bossName').textContent=BOSSES[bi].name+'  '+BOSSES[bi].en;$('songInfo').textContent='';$('bvTitle').textContent='BEAT MACHINA · '+(bi+1)+'/20';K.clear();stick.x=stick.y=0;
 const after=()=>{if(st&&!quick)say(STORY[bi].intro,beginCount);else beginCount()};
 if(quick){G.boss.dorm=false;setTimeout(()=>{if(mode==='boss'&&G.state==='wake'&&!dlg.active)beginCount()},700)}
 else{G.cine={type:'intro',t0:performance.now(),dur:3800};G.afterIntro=after;sfx(55,1.6,'sawtooth',.06,30);entStart(performance.now())}}
function beginCount(){if(mode!=='boss'||G.state!=='wake')return;const now=performance.now();G.boss.dorm=false;G.cine=null;G.shake=.4;G.flash=.12;sfx(70,.8,'sawtooth',.08,35);startMusic(song,now,4);G.T0=mus.T0;G.state='count';G.beat=-4.8;$('songInfo').textContent=song.title+'\n♩ '+Math.round(song.bpm)+' BPM · '+D().name;banner(isTouchUI()?'이동·대시로 회피 → 원을 터치해 반격!':'이동·대시로 회피 → 원의 Q·W·E·R 키로 반격!')}
function fightEnd(won){if(G.state==='result')return;if(won&&G.bi===MUT_BI&&!G.finMem&&(G.story||!saveData.fin2Seen)){G.finMem=1;startFinalMem();return}G.state='result';G.won=won;const t=Math.round((performance.now()-G.startReal)/1000);
 const rank=G.hits===0?'P':G.hits<=2?'S':G.hits<=4?'A':G.hits<=7?'B':'C';
 saveData.bestCombo=Math.max(saveData.bestCombo||0,G.maxCombo);
 if(won){const k=G.bi+'|'+diff,order='PSABC';if(!saveData.clear[k]||order.indexOf(rank)<order.indexOf(saveData.clear[k]))saveData.clear[k]=rank}
 saveNow();buildStats();
 const rankLabel=rank==='P'?'★ PERFECT ★':'RANK '+rank,rankCol=rank==='P'?'#fff6cf':'#f4d996',acc=G.swings?Math.round(G.onbeat/G.swings*100):0;
 const coinsWon=awardCoins(won,rank);const stat='<b style="color:#ffd166">🪙 +'+coinsWon+' 코인</b> (보유 '+saveData.coins+')<br>패링 '+(G.parries||0)+'회 (퍼펙트 '+(G.pparries||0)+') · 반격 성공 '+G.swings+'회 · 박자 정확도 '+acc+'%<br>최대 콤보 '+G.maxCombo+' · 피격 '+G.hits+'회 · 시간 '+Math.floor(t/60)+':'+String(t%60).padStart(2,'0')+(won?'<br><b style="font-size:26px;color:'+rankCol+'">'+rankLabel+'</b>':'<br>보스 체력 '+Math.round(G.hp/G.maxHp*100)+'% 남음');
 const btns=[];
 if(won&&G.story){btns.push(['계속 →',()=>{$('overlay').hidden=true;const bi=G.bi;say(STORY[bi].win,()=>{const next=()=>{if(bi<9)enterCave(bi+1);else if(bi===9)playScene('part2intro',()=>enterCave(10));else if(bi<19)enterCave(bi+1);else{saveData.chapter=0;saveData.done=true;saveNow();startEnding(()=>showOverlay('THE END','굶주림이 물러가고, 종은 다시 다정하게 울린다','두 개의 챕터, 스무 명의 수호자를 모두 만났습니다.<br>플레이해 주셔서 감사합니다!<br>보스 도전 모드에서 랭크에 도전해 보세요.',[['로비로',toLobby,true]]))}};const go=bi<19?()=>enterVillage(bi+1,next):next;const af=STORY[bi].after;if(af)playScene(af,go);else go()})},true])}
 else if(won){btns.push(['다시 도전',()=>startFight(G.bi,false),true]);if(G.bi<19)btns.push(['다음 보스 →',()=>startFight(G.bi+1,false),true])}
 else btns.push(['다시 도전',()=>startFight(G.bi,G.story,true),true]);
 if(won&&hlReady())btns.push(['🎬 하이라이트',hlOpen,false]);btns.push(['로비로',toLobby,false]);showOverlay(won?'BOSS DOWN':'SYSTEM FAILURE',won?G.B.name+' 격파!':'기계에게 패배했습니다',stat,btns)}
cv.addEventListener('pointerdown',e=>{if(dlg.active&&mode==='scene'){e.preventDefault();dlgAdvance()}});



