/* ================= 보스 러시 상세 v83: 공격 목록 · 내 기록 · 음악 미리듣기 · 10연전 러시 ================= */
function rpKey(){if(GM.rushCh===3)return 's'+GM.rushSel;return GM.rushCh===2?'c'+GM.rushSel:String(GM.rushCh*10+GM.rushSel)}
function rpDeck(){if(GM.rushCh===3){const b=window.__S4[GM.rushSel];return typeof s4Deck==='function'?s4Deck(b):[]}if(GM.rushCh===2){const D=C3CASES[GM.rushSel],X=C3BOSS[D.boss.art];return (X&&X.deck)||[]}return DECK[GM.rushCh*10+GM.rushSel]||[]}
function rpMusId(){if(GM.rushCh===3)return window.__S4[GM.rushSel].art;return GM.rushCh===2?C3CASES[GM.rushSel].boss.art:GM.rushCh*10+GM.rushSel}
function rpBpm(){if(GM.rushCh===3){const art=window.__S4[GM.rushSel].art;return (typeof C3MUS!=='undefined'&&C3MUS[art]&&C3MUS[art].bpm)||(BOSSES[window.__S4[GM.rushSel].base].track||{}).bpm||120}if(GM.rushCh===2){const art=C3CASES[GM.rushSel].boss.art,X=C3BOSS[art];if(typeof CL_BOSS!=='undefined'&&!CL_BOSS[art]&&typeof C3MUS!=='undefined'&&C3MUS[art]&&C3MUS[art].bpm)return C3MUS[art].bpm;return (BOSSES[X.base].track||{}).bpm||120}return (BOSSES[GM.rushCh*10+GM.rushSel].track||{}).bpm||120}
function rpRunLk(){return GM.rushCh===3?(typeof s4RushLocked==='function'?s4RushLocked(null):true):rpLocked()}
function rpLocked(){if(GM.rushCh===3)return typeof s4RushLocked==='function'?s4RushLocked(GM.rushSel):true;return GM.rushCh>0&&!ch1Cleared()}
function rpRec(key,d){return ((saveData.rrec||{})[key+'|'+(d||diff)])||null}
const rpFmt=s=>Math.floor(s/60)+':'+String(Math.round(s)%60).padStart(2,'0');
function rpDetail(){const oldPlayer=$('rpMusicCard');if(oldPlayer)oldPlayer.remove();let el=$('gmRushDet');if(!el){el=document.createElement('div');el.id='gmRushDet';el.className='rpDet';const gr=$('gmGrid');let lc=$('rpLeft');if(!lc){lc=document.createElement('div');lc.id='rpLeft';lc.style.cssText='display:flex;flex-direction:column;gap:12px;min-width:0';gr.parentNode.insertBefore(lc,gr);lc.appendChild(gr)}lc.appendChild(el)}
 if(rpLocked()){el.innerHTML='<div class="rpNote">🔒 '+(GM.rushCh===3?(typeof s4SeasonOpen==='function'&&s4SeasonOpen()?'스토리 챕터 4에서 쓰러뜨린 수호자만 공격 정보와 기록이 열려요.':'탑을 더 높이 오르면 열리는 비밀 챕터예요.'):'탑 10층 보스를 쓰러뜨리면 공격 정보와 기록이 열려요.')+'</div>';rpBtns();return}
 const deck=rpDeck(),rec=rpRec(rpKey()),mid=rpMusId(),C=(typeof CL_BOSS!=='undefined'&&CL_BOSS[mid])?CL_BOSS[mid]:null,NT=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
 const chips=deck.map(m=>{const n=m[0],kr=ATK_NAME[n]||SIGNAME[n]||n,tip=(typeof ATK_TIP!=='undefined'&&ATK_TIP[n])||'',ph=m[2]||0;return '<span class="rpChip'+(m[3]==='S'?' sig':'')+'" title="'+tip.replace(/"/g,'')+'">'+(m[3]==='S'?'★ ':'')+kr+(ph?'<i>'+(ph+1)+'P</i>':'')+'</span>'}).join('');
 const sel=deck.find(m=>m[3]==='S')||deck[0],tip=sel&&typeof ATK_TIP!=='undefined'?(ATK_TIP[sel[0]]||''):'';
 el.innerHTML='<div class="rpRow"><b>공격 패턴</b><span class="rpHint">★ 대표 기술 · 2P/3P = 그 페이즈부터 등장 · 이름에 마우스를 올리면 대처법</span></div><div class="rpChips">'+chips+'</div>'+
  (tip?'<div class="rpTip">💡 대표 기술 공략: '+tip+'</div>':'')+
  '<div class="rpRow"><b>내 기록 · '+GM_DIFF.find(x=>x[0]===diff)[1]+'</b></div><div class="rpRec">'+(rec?('<span>최고 점수 <b>'+(rec.score||0).toLocaleString()+'</b></span><span>최단 시간 <b>'+rpFmt(rec.time||0)+'</b></span><span>최고 콤보 <b>'+(rec.combo||0)+'</b></span><span>최소 피격 <b>'+(rec.hits==null?'—':rec.hits)+'</b></span><span>클리어 <b>'+(rec.clears||0)+'회</b></span>'):'<span class="rpNote">아직 이 난이도로 깬 기록이 없어요.</span>')+'</div>'+
  (C?'<div class="rpRow"><b>음악</b><span class="rpHint">'+(CL_TAG[C[0]]||C[0])+' · '+NT[C[1]%12]+' '+({min:'단조',maj:'장조',dor:'도리안',phr:'프리지안',mix:'믹솔리디안',hmin:'화성 단조',lyd:'리디안'}[C[2]]||C[2])+' · ♩'+Math.round(rpBpm())+'</span><button class="gmBtn rpMus" id="rpMusBtn">'+(RPM.on?'⏹ 멈추기':'🎵 음악 듣기')+'</button></div>':'<div class="rpRow"><b>음악</b><span class="rpHint">'+rpOldTag(mid)+' · ♩'+Math.round(rpBpm())+'</span><button class="gmBtn rpMus" id="rpMusBtn">'+(RPM.on?'⏹ 멈추기':'🎵 음악 듣기')+'</button></div>');
 const wasPlaying=RPM.on;rpMusMount();if(wasPlaying&&!RPM.on)rpMusStart();rpBtns()}
function rpBtns(){const f=$('gmFight');if(!f)return;let b=$('rpRunBtn');if(!b){b=document.createElement('button');b.id='rpRunBtn';b.className='gmBtn rpRun';f.parentNode.insertBefore(b,f);b.onclick=()=>{if(rpRunLk()){gmSfx('no');return}gmSfx('ok');rpRunStart(GM.rushCh)}}
 const best=(saveData.rrun||{})[GM.rushCh+'|'+diff];b.innerHTML='🔥 10연전 러시'+(best?'<small>최고 '+rpFmt(best.time)+(best.all?'':' · '+best.n+'/10')+'</small>':'<small>'+(GM.rushCh===3?'챕터 4':'챕터 '+(GM.rushCh+1))+' 전부 연속으로</small>');b.disabled=rpRunLk()}
{const _ri=gmRushInfo;gmRushInfo=function(){const r=_ri.apply(this,arguments);try{rpDetail()}catch(e){}return r}}
/* ---------- Boss rush music transport: audio-clock timeline ---------- */
const RPM={on:false,S:null,n:0,t0:0,timer:null,id:null,pos:0,duration:0,gate:null,routing:false};
const rpMusicTime=t=>{t=Math.max(0,Math.floor(t||0));return Math.floor(t/60)+':'+String(t%60).padStart(2,'0')};
// Preview notes share a disposable output, so seeking cannot leave old notes playing.
{const out=vOut;vOut=function(node,rev){if(RPM.routing&&RPM.gate){node.connect(RPM.gate);return}return out(node,rev)};RPM.output=out}
function rpMusPosition(){return RPM.on?Math.min(RPM.duration,RPM.pos+Math.max(0,audio.currentTime-RPM.t0)):RPM.pos}
function rpMusStop(){RPM.pos=rpMusPosition();RPM.on=false;if(RPM.timer)clearInterval(RPM.timer);RPM.timer=null;
 if(RPM.gate){RPM.gate.gain.cancelScheduledValues(audio.currentTime);RPM.gate.gain.setValueAtTime(0,audio.currentTime);RPM.gate.disconnect();RPM.gate=null}rpMusPaint()}
function rpMusLoad(){const id=rpMusId();if(RPM.id===id&&RPM.S)return true;rpMusStop();RPM.id=id;RPM.pos=0;RPM.S=null;RPM.duration=0;
 const C=clMake2(id);if(C){RPM.S={ms:60000/rpBpm(),vol:.5,club:C};RPM.old=false;RPM.duration=clSongLen(C,RPM.S.ms);RPM.loopOnly=false}
 else{RPM.S=rpOldSong(id);RPM.old=true;if(!RPM.S)return false;RPM.loopOnly=RPM.S.c3!=='stillness';RPM.duration=(RPM.loopOnly?16:st3Form(RPM.S).total)*4*RPM.S.ms/1000}
 return RPM.duration>0}
function rpMusStart(){if(!rpMusLoad())return;try{initAudio();if(audio.state==='suspended')audio.resume()}catch(e){}if(!audio)return;
 if(RPM.on)rpMusStop();if(RPM.pos>=RPM.duration-.01)RPM.pos=0;
 const half=RPM.S.ms/2000;RPM.n=Math.ceil(RPM.pos/half-1e-7);RPM.t0=audio.currentTime+.06;RPM.on=true;
 RPM.gate=audio.createGain();RPM.output(RPM.gate,0);
 const tick=()=>{if(!RPM.on)return;if(mode!=='menu'||(GM.scr!=='rush'&&!S5UI.open)){rpMusStop();return}
  if(rpMusPosition()>=RPM.duration){rpMusStop();RPM.pos=RPM.duration;rpMusPaint();return}
  while(RPM.n*half<RPM.duration&&RPM.t0+RPM.n*half-RPM.pos<audio.currentTime+.18){const at=RPM.t0+RPM.n*half-RPM.pos;
   // Skip stale notes after a background-tab delay instead of playing them all at once.
   if(at>=audio.currentTime-.06){RPM.routing=true;try{if(RPM.old)playSlot(RPM.n,Math.max(0,at-audio.currentTime),RPM.S);else clSlot2(RPM.n,Math.max(0,at-audio.currentTime),RPM.S)}finally{RPM.routing=false}}RPM.n++}
  rpMusPaint()};RPM.timer=setInterval(tick,50);tick();rpMusPaint()}
function rpMusToggle(){if(RPM.on)rpMusStop();else rpMusStart()}
function rpMusSeek(t){const playing=RPM.on;rpMusStop();RPM.pos=Math.max(0,Math.min(RPM.duration,Number(t)||0));if(playing&&RPM.pos<RPM.duration)rpMusStart();rpMusPaint()}
function rpMusPaint(){const pos=rpMusPosition(),bar=$('rpMusicSeek'),time=$('rpMusicTime'),btn=$('rpMusBtn');
 if(time)time.textContent=rpMusicTime(pos)+' / '+rpMusicTime(RPM.duration);
 if(bar){bar.max=RPM.duration||1;bar.value=pos;bar.style.setProperty('--progress',(RPM.duration?100*pos/RPM.duration:0)+'%');bar.setAttribute('aria-valuetext',rpMusicTime(pos)+' / '+rpMusicTime(RPM.duration))}
 if(btn)btn.textContent=RPM.on?'⏸ 일시정지':RPM.pos>=RPM.duration&&RPM.duration?'↻ 다시 듣기':RPM.pos>0?'▶ 이어듣기':'▶ 음악 듣기'}
function rpMusMount(){const el=$('gmRushDet'),btn=el&&el.querySelector('#rpMusBtn');if(!el||!btn)return;
 const old=$('rpMusicCard');if(old)old.remove();
 const card=document.createElement('section');card.id='rpMusicCard';card.setAttribute('aria-label','보스 음악 플레이어');
 const row=btn.closest('.rpRow');if(row)card.appendChild(row);
 const player=document.createElement('div');player.className='rpMusicPlayer';player.innerHTML='<div class="rpMusicFooter"><strong id="rpMusicTime">0:00 / —:—</strong><span id="rpMusicLengthLabel">전체 곡 길이</span></div><input id="rpMusicSeek" type="range" min="0" max="1" step="0.1" value="0" aria-label="음악 재생 위치"><div class="rpMusicFooter"><span>막대를 끌어 원하는 구간으로 이동</span><button type="button" id="rpMusicReset">↻ 처음부터</button></div>';
 card.appendChild(player);
 const anchor=$('gmPrevStat');if(anchor)anchor.after(card);else el.appendChild(card);
 btn.onclick=rpMusToggle;$('rpMusicSeek').addEventListener('input',e=>rpMusSeek(e.target.value));
 $('rpMusicReset').onclick=()=>{rpMusSeek(0);if(!RPM.on)rpMusStart()};
 card.addEventListener('keydown',e=>e.stopPropagation());card.addEventListener('pointerdown',e=>e.stopPropagation());
 const ready=rpMusLoad();$('rpMusicSeek').disabled=!ready;btn.disabled=!ready;
 $('rpMusicLengthLabel').textContent=ready?(RPM.loopOnly?'반복 구간 길이':'전체 곡 길이'):'음악을 불러올 수 없어요';rpMusPaint()}

(function(){const st=document.createElement('style');st.textContent=`
#rpMusicCard{flex:none;display:block!important;min-width:0;margin:4px 0;padding:10px;border:1px solid #54716e;border-radius:10px;background:#0b171df5;color:#fff}#rpMusicCard .rpRow{display:flex;gap:6px;align-items:center;flex-wrap:wrap}#rpMusicCard .rpHint{flex:1;min-width:100px;font-size:10px}#rpMusicCard .rpRow b{font-size:12px;color:#a6f5c6}#rpMusicCard .rpMus{font-size:11px!important;padding:6px 8px!important}#rpMusicCard .rpMusicFooter{gap:6px;font-size:10px}
.rpMusicPlayer{padding:4px 2px 2px;min-width:0;width:100%;box-sizing:border-box}
#rpMusicSeek{--progress:0%;appearance:none;-webkit-appearance:none;display:block;width:100%;height:26px;margin:0;cursor:pointer;touch-action:pan-y;background:linear-gradient(to right,#ff526d 0 var(--progress),#425159 var(--progress) 100%) center/100% 5px no-repeat;border:0;border-radius:0;padding:0}
#rpMusicSeek::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:#ff526d;border:2px solid #ffe6eb;box-shadow:0 0 8px #ff526d66}
#rpMusicSeek::-moz-range-thumb{width:12px;height:12px;border-radius:50%;background:#ff526d;border:2px solid #ffe6eb}
#rpMusicSeek:focus-visible{outline:2px solid #a6f5c6;outline-offset:3px}
.rpMusicFooter{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:11px;color:#9fb2b7}
#rpMusicTime{font-variant-numeric:tabular-nums;color:#fff;font-size:13px;white-space:nowrap}
#rpMusicReset{margin-left:auto;background:transparent;border:1px solid #425159;border-radius:6px;padding:5px 8px;font-size:11px;color:#dff4ee;cursor:pointer}
`;document.head.appendChild(st)})();
/* 로비 배경음과 겹치지 않게 */
{const _lbt=typeof lobbyBgmTick==='function'?lobbyBgmTick:null;if(_lbt){lobbyBgmTick=function(){if(RPM.on){LBGM.on=false;return}return _lbt.apply(this,arguments)}}}
/* ---------- 기록 저장 ---------- */
function rpSaveRec(key,won){if(!won||!G||G.story)return;saveData.rrec=saveData.rrec||{};const k=key+'|'+diff,t=Math.round((performance.now()-(G.startReal||performance.now()))/1000),o=saveData.rrec[k]||{clears:0};
 o.clears=(o.clears||0)+1;o.score=Math.max(o.score||0,G.score||0);try{if(typeof window.BBRankSubmit==='function'&&G.score>0)window.BBRankSubmit(G.score,{chapter:(()=>{try{const w=window.who54&&who54();if(w)return w[0]+1}catch(_){}return Math.floor((Number(G.bi)||0)/10)+1})(),boss:G.B&&G.B.name||'',difficulty:diff})}catch(e){}o.time=o.time?Math.min(o.time,t):t;o.combo=Math.max(o.combo||0,G.maxCombo||0);o.hits=o.hits==null?G.hits:Math.min(o.hits,G.hits||0);saveData.rrec[k]=o;try{saveNow()}catch(e){}}
/* ---------- 10연전 러시 ---------- */
let RUSH=null;
function rpRunList(ch){return [...Array(10)].map((_,i)=>ch===3?{s4:i}:ch===2?{c3:i}:{bi:ch*10+i})}
function rpRunStart(ch){rpMusStop();RUSH={ch,list:rpRunList(ch),i:0,splits:[],total:0,score:0,carry:null,t0:performance.now()};rpRunFight()}
function rpRunFight(){const it=RUSH.list[RUSH.i];$('overlay').hidden=true;if(it.s4!=null)s4RushFight(it.s4);else if(it.c3!=null)c3RushFight(it.c3);else startRush(it.bi);if(RUSH.carry!=null)P.hp=Math.min(P.maxhp,Math.round(RUSH.carry+P.maxhp*.35));RUSH.fightT0=performance.now()}
function rpRunEnd(won){if(!RUSH)return;const it=RUSH.list[RUSH.i],t=Math.round((performance.now()-(G.startReal||RUSH.fightT0))/1000),rank=won?(G.hits===0?'P':G.hits<=2?'S':G.hits<=4?'A':G.hits<=7?'B':'C'):'✕';
 RUSH.splits.push({name:it.s4!=null?window.__S4[it.s4].name:it.c3!=null?C3CASES[it.c3].boss.name:G.B.name,t,rank,score:G.score||0,hits:G.hits||0});RUSH.total+=t;RUSH.score+=G.score||0;RUSH.carry=P.hp;
 setTimeout(()=>{if(!RUSH)return;if(won&&RUSH.i<9){RUSH.i++;const nx=RUSH.list[RUSH.i],nm=nx.s4!=null?window.__S4[nx.s4].name:nx.c3!=null?C3CASES[nx.c3].boss.name:BOSSES[nx.bi].name;
   showOverlay('BOSS RUSH · '+RUSH.i+' / 10','다음 상대: '+nm,rpRunTable()+'<div style="margin-top:8px;color:#a6f5c6">체력 '+P.hp+' → 다음 판 시작 시 35% 회복</div>',[['계속 ▶',()=>rpRunFight(),true],['그만두기',()=>rpRunSummary(false),false]])}
  else rpRunSummary(won)},200)}
function rpRunTable(){return '<div class="rpTable">'+RUSH.splits.map((s,i)=>'<div><span>'+String(i+1).padStart(2,'0')+'</span><span>'+s.name+'</span><b class="rk r'+(s.rank==='✕'?'X':s.rank)+'">'+(s.rank==='P'?'★':s.rank)+'</b><span>'+rpFmt(s.t)+'</span></div>').join('')+'</div><div class="rpTot">누적 시간 <b>'+rpFmt(RUSH.total)+'</b> · 누적 점수 <b>'+RUSH.score.toLocaleString()+'</b></div>'}
function rpRunSummary(allWon){if(!RUSH)return;const n=RUSH.splits.filter(s=>s.rank!=='✕').length,all=allWon&&n===10,k=RUSH.ch+'|'+diff;saveData.rrun=saveData.rrun||{};const prev=saveData.rrun[k];let nb=false;
 if(!prev||(all&&(!prev.all||RUSH.total<prev.time))||(!prev.all&&!all&&n>(prev.n||0))){saveData.rrun[k]={time:RUSH.total,score:RUSH.score,n,all};nb=true}try{saveNow()}catch(e){}
 const coins=all?300+RUSH.ch*100:n*15;saveData.coins=(saveData.coins||0)+coins;try{saveNow()}catch(e){}const ch=RUSH.ch;
 showOverlay(all?'BOSS RUSH CLEAR':'BOSS RUSH END',all?(ch===3?'챕터 4':'챕터 '+(ch+1))+' 10연전 완주!':n+' / 10 에서 멈췄어요',rpRunTable()+(nb?'<div style="margin-top:8px;color:#ffd166;font-weight:900">🏆 새 최고 기록!</div>':'')+'<div style="margin-top:6px;color:#ffd166">🪙 +'+coins+' 코인</div>',[['다시 러시',()=>{rpRunStart(ch)},true],['로비로',()=>{RUSH=null;toLobby()},false]]);RUSH=null}
{const _fe2=fightEnd;fightEnd=function(won){const was=G&&G.state;const r=_fe2.apply(this,arguments);try{if(was!=='result'&&G.state==='result'){rpSaveRec(String(G.bi),won);if(RUSH)rpRunEnd(won)}}catch(e){}return r}}
{const _c3r=c3RushEnd;c3RushEnd=function(won){const was=G&&G.state,k=G&&G.c3Rush;const r=_c3r.apply(this,arguments);try{if(was!=='result'){rpSaveRec('c'+k,won);if(RUSH)rpRunEnd(won)}}catch(e){}return r}}
{const _tl2=toLobby;toLobby=function(){if(RUSH&&!RUSH._ending){RUSH=null}return _tl2.apply(this,arguments)}}
/* 전투 화면 러시 표시 */
{const _ds10=drawScene;drawScene=function(now){const r=_ds10.apply(this,arguments);try{if(RUSH&&mode==='boss'&&$('overlay').hidden){const el=RUSH.total+Math.max(0,(performance.now()-RUSH.fightT0)/1000),tx='RUSH '+(RUSH.i+1)+'/10 · '+rpFmt(el);ctx.font='bold 9px monospace';ctx.textAlign='left';const w=ctx.measureText(tx).width+10;RA(6,AY+4,w,13,'#05070a',.75);R(6,AY+4,2,13,'#ff9a3a');ctx.fillStyle='#ffd9a0';ctx.fillText(tx,11,AY+14)}}catch(e){}return r}}
(function(){try{const st=document.createElement('style');st.textContent='.rpDet{display:flex;flex-direction:column;gap:6px;background:#0b1418cc;border:1px solid #2a4040;border-radius:10px;padding:10px 12px}.rpRow{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.rpRow b{font-size:13px;color:#ffd166;letter-spacing:.04em}.rpHint{font-size:11px;color:#8fa9a8}.rpChips{display:flex;flex-wrap:wrap;gap:6px}.rpChip{font-size:12px;padding:4px 8px;border-radius:999px;background:#152830;border:1px solid #2e4a50;color:#dff4ee;cursor:help}.rpChip.sig{border-color:#ffd166;color:#fff3c8}.rpChip i{font-style:normal;margin-left:5px;font-size:10px;color:#ff9aa8}.rpTip{font-size:12px;color:#cfe8d0;line-height:1.5}.rpRec{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:12px;color:#9ab8b0;font-variant-numeric:tabular-nums}.rpRec b{color:#fff;font-size:13px}.rpNote{font-size:12px;color:#8fa9a8}.rpMus{padding:5px 10px!important;font-size:12px!important;margin-left:auto}.rpRun{display:flex;flex-direction:column;align-items:center;line-height:1.15;border-color:#ff9a3a!important;color:#ffd9a0!important}.rpRun small{font-size:10px;color:#ffb080;font-weight:600}.rpTable{display:grid;gap:3px;max-height:40vh;overflow:auto;text-align:left;font-variant-numeric:tabular-nums}.rpTable div{display:grid;grid-template-columns:28px 1fr 28px 52px;gap:8px;padding:3px 8px;background:#0e1c20;border-radius:6px;font-size:13px}.rpTable .rk{text-align:center}.rpTable .rP{color:#fff6cf}.rpTable .rS{color:#ffd166}.rpTable .rA{color:#a6f5c6}.rpTable .rX{color:#ff4d6d}.rpTot{margin-top:8px;font-size:13px}';(document.head||document.body).appendChild(st)}catch(e){}})();

function rpOldTag(id){try{if(typeof id==='string'&&typeof C3MUS!=='undefined'&&C3MUS[id])return (C3MUS[id].tag||'원곡')+' · 원곡 유지'}catch(e){}return '원곡'}
function rpOldSong(id){try{if(typeof id==='string'){const X=C3BOSS[id];if(typeof c3MakeSong==='function'&&C3MUS[id])return c3MakeSong(id,X.base);const sv=_c3Swap;_c3Swap={bi:X.base,art:id};try{return makeSong(X.base)}finally{_c3Swap=sv}}return makeSong(id)}catch(e){console.warn(e);return null}}

/* ================= 보스 러시 화면 퀄리티 v83: 실제 전장 미리보기 · 살아 움직이는 타일 · VS 등장 연출 ================= */
const RQ={arena:{},tileT:0};
function rqLk(k){if(GM.rushCh===3)return typeof s4RushLocked==='function'?s4RushLocked(k):true;return GM.rushCh>0&&!ch1Cleared()}
function rqBoss(k){const ch=GM.rushCh;if(ch===3){const b=(window.__S4||[])[k];return {art:b.art,base:b.base,c:b.c,name:b.name,en:b.en,bpm:(typeof C3MUS!=='undefined'&&C3MUS[b.art]&&C3MUS[b.art].bpm)||(BOSSES[b.base].track||{}).bpm||120}}if(ch===2){const D=C3CASES[k],art=D.boss.art,X=C3BOSS[art];return {art,base:X.base,c:X.c,name:D.boss.name,en:D.boss.en||'',bpm:(BOSSES[X.base].track||{}).bpm||120}}const bi=ch*10+k,B=BOSSES[bi];return {bi,B,c:B.c,name:B.name,en:B.en,bpm:(B.track||{}).bpm||120}}
function rqArena(o){const key=o.art||('b'+o.bi);if(RQ.arena[key])return RQ.arena[key];let cv=null;try{if(o.art){cv=document.createElement('canvas');cv.width=W;cv.height=H;const c=cv.getContext('2d');c.imageSmoothingEnabled=false;c3PaintArena(c,o.art)}else cv=arenaCanvas(o.bi)}catch(e){cv=null}return RQ.arena[key]=cv}
function rqDrawBoss(c,o,x,y,now,u,bo){if(o.art){c3ArtOn(c,o.art,x,y,now,u,bo);return}const B=o.B;drawMech(c,B,x,y,now,bo,u);try{const hs=idleHandsAt(B,x,y,u),g0=geo(B,x,y,u);hs.forEach((h,k)=>{h.y+=Math.sin(now/400+k*2)*u*.5;drawHand(c,B,h,g0.sh[k][0],g0.sh[k][1],now,false,u/5*1.2)})}catch(e){}}
/* 큰 미리보기: 실제 전장 배경 + 조명 + 박자 파동 + 먼지 + 이름판 */
function rqPreview(now){if(GM.scr!=='rush')return;const cv=$('gmPrevCv');if(!cv)return;if(cv.width!==480||cv.height!==290){cv.width=480;cv.height=290}const c=cv.getContext('2d'),k=GM.rushSel,o=rqBoss(k),t=now/1000,locked=rqLk(k),beat=t*o.bpm/60,fr=beat%1,pul=Math.pow(1-fr,3);c.imageSmoothingEnabled=false;c.globalAlpha=1;
 c.fillStyle='#05080a';c.fillRect(0,0,480,290);c.save();c.translate(0,-42);const ar=rqArena(o);if(ar){c.drawImage(ar,0,0,W,H,-40,-10,560,350)}else{c.fillStyle=shade(o.c,.15);c.fillRect(0,0,480,340)}
 c.fillStyle='#05080a';c.globalAlpha=.45;c.fillRect(0,0,480,340);c.globalAlpha=1;
 /* 스포트라이트 */for(let i=0;i<14;i++){const w=40+i*12,a=.035;c.globalAlpha=a;c.fillStyle=o.c;c.beginPath();c.moveTo(240-10,-10);c.lineTo(240+10,-10);c.lineTo(240+w,300);c.lineTo(240-w,300);c.closePath();c.fill()}c.globalAlpha=1;
 /* 바닥 박자 파동 */for(let k2=0;k2<3;k2++){const q=((beat*.5)+k2/3)%1,r=40+q*200;c.globalAlpha=(1-q)*.5;c.fillStyle=o.c;for(let a=0;a<48;a++){const aa=a*TAU/48;c.fillRect(Math.round(240+Math.cos(aa)*r)-1,Math.round(290+Math.sin(aa)*r*.22)-1,3,2)}}c.globalAlpha=1;
 c.globalAlpha=.55;c.fillStyle='#000';c.beginPath();c.ellipse(240,292,90,12,0,0,TAU);c.fill();c.globalAlpha=1;
 /* 보스 */const bob=Math.sin(t*2.2)*2,bo={pulse:pul*.8,expose:false,open:0,eye:(Math.floor(t/4)%2)?Math.min(1,(t%4)/.6):0,dorm:false,flash:false,warn:(t%4)>3.3?1:0};try{rqDrawBoss(c,o,240,290+bob,now,o.art?5.2:5,bo)}catch(e){}
 /* 떠오르는 불씨 */for(let i=0;i<22;i++){const q=((t*.18)+i/22)%1,x=(i*67%460)+10+Math.sin(q*6+i)*8,y=330-q*320;c.globalAlpha=(1-q)*.8;c.fillStyle=i%3?o.c:'#ffffff';c.fillRect(Math.round(x),Math.round(y),i%4?2:3,i%4?2:3)}c.globalAlpha=1;
 /* 공격 예고 번쩍 (4초마다) */if((t%4)>3.3){const q=((t%4)-3.3)/.7;c.globalAlpha=(1-q)*.5;c.strokeStyle='#ff4d6d';c.lineWidth=2;for(let r=0;r<3;r++){c.beginPath();c.arc(240,200,30+q*120+r*18,0,TAU);c.stroke()}c.globalAlpha=1;c.font='900 14px '+FONT_STACK;c.textAlign='center';c.fillStyle='#ff4d6d';c.fillText('⚠',240,86)}
 c.restore();/* 스캔라인 · 비네트 */c.globalAlpha=.08;c.fillStyle='#000';for(let y=0;y<290;y+=3)c.fillRect(0,y,480,1);c.globalAlpha=1;const vg=c.createRadialGradient(240,160,110,240,150,300);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.7)');c.fillStyle=vg;c.fillRect(0,0,480,290);
 /* 이름판 */c.font='900 11px '+FONT_STACK;c.textAlign='left';const nt=(GM.rushCh===5?'ZENITH ':GM.rushCh===4?'ABYSS ':GM.rushCh===3?'ECLIPSE ':GM.rushCh===2?'ORIGIN ':'GUARDIAN ')+String(k+1+(GM.rushCh===1?10:0)).padStart(2,'0')+'  ·  '+o.en,nw=c.measureText(nt).width;c.fillStyle='#05080acc';c.fillRect(10,10,nw+18,22);c.fillStyle=o.c;c.fillRect(10,10,3,22);c.fillStyle='#fff';c.fillText(nt,18,25);
 c.textAlign='right';c.fillStyle='#ffd166';c.fillText('♩ '+Math.round(o.bpm),470,25);c.fillStyle=Math.floor(beat)%2?'#ffd166':'#5a4a20';c.fillRect(478-4,34,4,4);c.textAlign='left';
 if(locked){c.fillStyle='rgba(5,8,10,.88)';c.fillRect(0,0,480,290);c.fillStyle='#eaf6ef';c.font='900 40px '+FONT_STACK;c.textAlign='center';c.fillText('🔒',240,150);c.font='700 13px '+FONT_STACK;c.fillText('탑 10층 보스를 쓰러뜨리면 열려요',240,180);c.textAlign='left'}}
gmPrevDraw=function(now){try{rqPreview(now)}catch(e){}};
/* 살아 움직이는 타일 */
function rqTiles(now){if(GM.scr!=='rush'||now-RQ.tileT<50)return;RQ.tileT=now;const tiles=document.querySelectorAll('#gmGrid .gmTile');const t=now/1000;
 tiles.forEach((el,k)=>{const cv=el.querySelector('canvas');if(!cv)return;const c=cv.getContext('2d'),o=rqBoss(k),sel=k===GM.rushSel,w=cv.width,h=cv.height;c.imageSmoothingEnabled=false;c.globalAlpha=1;
  const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,shade(o.c,sel?.2:.1));g.addColorStop(1,shade(o.c,sel?.42:.3));c.fillStyle=g;c.fillRect(0,0,w,h);
  if(sel){c.globalAlpha=.18;c.fillStyle='#fff';c.beginPath();c.moveTo(w/2-6,0);c.lineTo(w/2+6,0);c.lineTo(w/2+34,h);c.lineTo(w/2-34,h);c.closePath();c.fill();c.globalAlpha=1}
  c.fillStyle=shade(o.c,.2);c.fillRect(0,h-10,w,10);c.globalAlpha=.4;c.fillStyle='#000';c.beginPath();c.ellipse(w/2,h-8,22,3,0,0,TAU);c.fill();c.globalAlpha=1;
  const bob=sel?Math.sin(t*4)*1.5:Math.sin(t*1.6+k)*.8;try{if(o.art)c3ArtOn(c,o.art,w/2,h-8+bob,now,2,{pulse:sel?Math.pow(1-((t*o.bpm/60)%1),3):0});else{drawMech(c,o.B,w/2,h-8+bob,now,{pulse:sel?Math.pow(1-((t*o.bpm/60)%1),3):0},2.2);const hs=idleHandsAt(o.B,w/2,h-8+bob,2.2),g0=geo(o.B,w/2,h-8+bob,2.2);hs.forEach((hh,j)=>drawHand(c,o.B,hh,g0.sh[j][0],g0.sh[j][1],now,false,.75))}}catch(e){}
  if(rqLk(k)){c.fillStyle=GM.rushCh===3?'#05040c':'rgba(5,8,10,.8)';c.fillRect(0,0,w,h);if(GM.rushCh===3){c.fillStyle='#8a80b0';c.font='900 20px '+FONT_STACK;c.textAlign='center';c.fillText('?',w/2,h/2+8);c.textAlign='left'}}
  el.style.setProperty('--bc',o.c)})}
{const _mt2=menuTick;menuTick=function(now){const r=_mt2.apply(this,arguments);try{rqTiles(now)}catch(e){}return r}}
/* VS 등장 연출 */
function rqVS(o,cb){try{let m=$('rqVS');if(m)m.remove();m=document.createElement('div');m.id='rqVS';m.innerHTML='<div class="vsL"><canvas width="120" height="120"></canvas><b></b><small>CHALLENGER</small></div><div class="vsMid">VS</div><div class="vsR"><canvas class="vsB" width="160" height="120"></canvas><b></b><small></small></div>';m.style.setProperty('--bc',o.c);
 m.querySelector('.vsL b').textContent=(typeof PNAME==='function'?PNAME():'하루');m.querySelector('.vsR b').textContent=o.name;m.querySelector('.vsR small').textContent=o.en+(typeof CL_BOSS!=='undefined'&&CL_BOSS[o.art||o.bi]?'  ·  ♪ '+CL_TAG[CL_BOSS[o.art||o.bi][0]]:'');
 (document.fullscreenElement||document.body).appendChild(m);const lc=m.querySelector('.vsL canvas').getContext('2d'),rc=m.querySelector('.vsR canvas').getContext('2d');lc.imageSmoothingEnabled=rc.imageSmoothingEnabled=false;const t0=performance.now();
 try{initAudio();sfx(110,.5,'sawtooth',.06,55);setTimeout(()=>{sfx(880,.25,'square',.04,1760);perc('crash',audio.currentTime,.6)},380)}catch(e){}
 const loop=now=>{if(!m.isConnected)return;lc.clearRect(0,0,120,120);rc.clearRect(0,0,160,120);try{drawKnight(lc,36,36,4,false,null,now/430)}catch(e){}try{rqDrawBoss(rc,o,80,110,now,3,{pulse:.5})}catch(e){}if(now-t0<1700)requestAnimationFrame(loop)};requestAnimationFrame(loop);
 setTimeout(()=>{m.classList.add('out')},1350);setTimeout(()=>{m.remove();cb()},1650)}catch(e){cb()}}
{const _gf=gmFight;gmFight=function(){const k=GM.rushSel;if(rqLk(k))return _gf.apply(this,arguments);if(GM.rushCh===2&&typeof c3RushLocked==='function'&&c3RushLocked(k))return _gf.apply(this,arguments);const self=this,args=arguments;rqVS(rqBoss(k),()=>_gf.apply(self,args))}}
if(typeof rpRunFight==='function'){const _rf=rpRunFight;rpRunFight=function(){const it=RUSH&&RUSH.list[RUSH.i];if(!it)return _rf();$('overlay').hidden=true;const o=it.s4!=null?(()=>{const b=window.__S4[it.s4];return {art:b.art,base:b.base,c:b.c,name:b.name,en:b.en+'  ·  '+(RUSH.i+1)+' / 10'}})():it.c3!=null?(()=>{const D=C3CASES[it.c3],X=C3BOSS[D.boss.art];return {art:D.boss.art,base:X.base,c:X.c,name:D.boss.name,en:(D.boss.en||'')+'  ·  '+(RUSH.i+1)+' / 10'}})():{bi:it.bi,B:BOSSES[it.bi],c:BOSSES[it.bi].c,name:BOSSES[it.bi].name,en:BOSSES[it.bi].en+'  ·  '+(RUSH.i+1)+' / 10'};rqVS(o,()=>_rf())}}
/* 상세 패널을 보스 격자 아래로 */
{const _rd=typeof rpDetail==='function'?rpDetail:null;if(_rd){rpDetail=function(){const r=_rd.apply(this,arguments);try{const el=$('gmRushDet'),gr=$('gmGrid');if(el&&gr){let lc=$('rpLeft');if(!lc){lc=document.createElement('div');lc.id='rpLeft';gr.parentNode.insertBefore(lc,gr);lc.appendChild(gr)}if(el.parentNode!==lc)lc.appendChild(el)}}catch(e){}return r}}}
(function(){try{const st=document.createElement('style');st.textContent='#rpLeft{display:flex;flex-direction:column;gap:12px;min-width:0}'+
 '#gmGrid .gmTile.sel{box-shadow:0 0 0 2px #05080a,0 0 0 4px var(--bc,#a6f5c6),0 0 22px 2px var(--bc,#a6f5c6),0 4px 0 4px #05080a!important;transform:translateY(-3px) scale(1.03)}#gmGrid .gmTile:hover{transform:translateY(-2px)}#gmGrid .gmTile .rk{position:absolute;right:5px;top:3px;font-size:13px;font-weight:900;text-shadow:0 0 6px #000,0 1px 0 #000}'+
 '#gmPrevCv{image-rendering:pixelated;width:auto;max-width:100%;height:auto;max-height:min(34vh,272px);display:block;margin:0 auto}'+
 '#rqVS{position:fixed;inset:0;z-index:9998;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;background:radial-gradient(circle at 50% 50%,color-mix(in srgb,var(--bc) 30%,#05080a) 0,#05080a 70%);color:#fff;font-family:inherit;animation:vsIn .25s steps(4) both;padding:16px;gap:16px}#rqVS.out{animation:vsOut .3s steps(4) both}'+
 '#rqVS canvas{image-rendering:pixelated;width:min(26vw,200px);height:auto}#rqVS canvas.vsB{width:min(42vw,400px);filter:drop-shadow(0 0 18px var(--bc))}#rqVS:before{content:"";position:absolute;inset:0;background:linear-gradient(105deg,transparent 52%,var(--bc) 52.3%,transparent 53%),linear-gradient(105deg,rgba(0,0,0,0) 52%,color-mix(in srgb,var(--bc) 22%,transparent) 52%);opacity:.9;pointer-events:none;animation:vsIn .3s both}#rqVS .vsL,#rqVS .vsR{display:flex;flex-direction:column;align-items:center;gap:8px}#rqVS .vsL{animation:vsL .45s cubic-bezier(.2,1.4,.4,1) both}#rqVS .vsR{animation:vsR .45s cubic-bezier(.2,1.4,.4,1) both}'+
 '#rqVS b{font-size:clamp(20px,4vw,38px);font-weight:900;letter-spacing:.06em;text-shadow:3px 3px 0 #000}#rqVS .vsR b{color:var(--bc)}#rqVS small{font-size:12px;letter-spacing:.2em;color:#cfe8d0;opacity:.8}'+
 '#rqVS .vsMid{font-size:clamp(46px,9vw,110px);font-weight:900;font-style:italic;color:#ffd166;text-shadow:5px 5px 0 #7a1a2a,-2px -2px 0 #fff;animation:vsMid .5s .15s steps(5) both}'+
 '@keyframes vsIn{from{opacity:0}to{opacity:1}}@keyframes vsOut{to{opacity:0}}@keyframes vsL{from{transform:translateX(-60vw)}to{transform:none}}@keyframes vsR{from{transform:translateX(60vw)}to{transform:none}}@keyframes vsMid{0%{transform:scale(3);opacity:0}100%{transform:scale(1);opacity:1}}'+
 '@media (prefers-reduced-motion:reduce){#rqVS,#rqVS *{animation:none!important}}@media (max-width:640px){#rqVS{grid-template-columns:1fr;text-align:center}}';(document.head||document.body).appendChild(st)}catch(e){}})();
/* 10연전 인터루드: 다음 상대 초상 + 진행 바 */
function rqRunO(it){return it.c3!=null?(()=>{const D=C3CASES[it.c3],X=C3BOSS[D.boss.art];return {art:D.boss.art,base:X.base,c:X.c,name:D.boss.name,en:D.boss.en||''}})():{bi:it.bi,B:BOSSES[it.bi],c:BOSSES[it.bi].c,name:BOSSES[it.bi].name,en:BOSSES[it.bi].en}}
{const _so=showOverlay;showOverlay=function(tag,title,html,btns){const r=_so.apply(this,arguments);try{const old=$('rqInter');if(old)old.remove();if(typeof RUSH!=='undefined'&&RUSH&&/^BOSS RUSH · \d+ \/ 10$/.test(tag)&&RUSH.list[RUSH.i]){const o=rqRunO(RUSH.list[RUSH.i]),d=document.createElement('div');d.id='rqInter';d.style.setProperty('--bc',o.c);
 let bar='';for(let i=0;i<10;i++){const it=RUSH.list[i];bar+='<i class="'+(i<RUSH.i?'dn':i===RUSH.i?'nx':'')+'" style="--c:'+(it?rqRunO(it).c:'#333')+'"></i>'}
 d.innerHTML='<canvas width="200" height="110"></canvas><div class="rqBar">'+bar+'</div>';$('mText').prepend(d);const cv=d.querySelector('canvas'),c=cv.getContext('2d');c.imageSmoothingEnabled=false;
 const loop=now=>{if(!d.isConnected||$('overlay').hidden)return;c.clearRect(0,0,200,110);const t=now/1000,g=c.createRadialGradient(100,100,6,100,90,90);g.addColorStop(0,o.c+'55');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,200,110);c.globalAlpha=.5;c.fillStyle='#000';c.beginPath();c.ellipse(100,104,46,6,0,0,TAU);c.fill();c.globalAlpha=1;try{rqDrawBoss(c,o,100,104+Math.sin(t*2.2),now,2.4,{pulse:Math.pow(1-(t*o.B?.track?.bpm/60||t*2)%1,3)*.6})}catch(e){}requestAnimationFrame(loop)};requestAnimationFrame(loop)}}catch(e){}return r}}
try{const st=document.createElement('style');st.textContent='#rqInter{display:flex;flex-direction:column;align-items:center;gap:8px;margin:0 0 10px}#rqInter canvas{image-rendering:pixelated;width:240px;height:auto;filter:drop-shadow(0 0 12px var(--bc))}#rqInter .rqBar{display:flex;gap:4px}#rqInter .rqBar i{width:22px;height:6px;border-radius:2px;background:#1c2630;box-shadow:inset 0 0 0 1px #2c3a46}#rqInter .rqBar i.dn{background:var(--c);box-shadow:none}#rqInter .rqBar i.nx{background:#fff;animation:rqBlink .6s steps(2) infinite}@keyframes rqBlink{50%{opacity:.3}}';(document.head||document.body).appendChild(st)}catch(e){}

