/* ===== help2.js : HOW TO PLAY 화면 새 단장 — 움직이는 조작 카드 · 전투 흐름 · 박자 연습 · 난이도 표 ===== */
const H2={tab:0,built:0,kick:{},press:{},pr:{on:0,t0:0,last:-1,pops:[],n:{P:0,G:0,H:0},streak:0,best:0},raf:0};
const H2_CARDS=[
 {id:'move',t:'이동',ico:'✥',col:'#8ae8ff',acts:['up','left','down','right'],d:'보스의 몸짓과 바닥 예고를 보고 직접 걸어서 피해요.',m:'모바일 · 왼쪽 스틱',a:0},
 {id:'atk',t:'공격',ico:'⚔',col:'#ff9a5a',acts:['atk'],d:'가까이서 베기 · 금빛 조각을 되받아치기 · 탑 잡몹 처치.',m:'모바일 · ATTACK 버튼',a:.15},
 {id:'dash',t:'대시',ico:'»',col:'#a6f5c6',acts:['dash'],d:'한 번에 <b>20%</b> 소모. 0%가 되면 천천히 가득 충전돼요.',m:'모바일 · DASH 버튼',a:.4},
 {id:'parry',t:'패링',ico:'◈',col:'#ffd166',acts:['parry'],d:'맞기 직전에 막기. <b>박자에 맞추면 PERFECT</b> — 반사탄이 보스를 때려요.',m:'모바일 · 🛡 버튼',a:.95},
 {id:'counter',t:'반격',ico:'◎',col:'#ffe79a',acts:[],keys:['Q','W','E','R'],d:'반격 시간에 원에 적힌 키를 누르거나 원을 클릭! 가운데 막대가 <b style="color:#ffe79a">노랄 때</b> 치면 PERFECT.',m:'모바일 · 원 터치',a:.75},
 {id:'ult',t:'궁극기',ico:'✦',col:'#ff7ad9',acts:['ult'],d:'반격 · 되받아치기 · 코어 폭발로 게이지를 채워 발동. 무기마다 다른 필살기.',m:'모바일 · 궁 버튼',a:1.9},
 {id:'pause',t:'일시정지',ico:'Ⅱ',col:'#c8c8d8',acts:['pause'],d:'언제든 멈추고 설정 · 재시작 · 나가기.',m:'모바일 · 오른쪽 위 Ⅱ',a:.2}];
const H2_PER={move:4,atk:1.2,dash:2,parry:2,counter:2,ult:3.2,pause:2.4,dodge:3,grogi:3.2,open:2.4,finish:2.4};
function h2El(id){return document.getElementById(id)}
function h2Keys(ids){let ks=[];try{const b=kbGet();for(const id of ids)for(const k of (b[id]||[]))if(!ks.includes(k))ks.push(k)}catch(e){}return ks}
function h2Cap(k,col){return '<kbd class="h2k" style="--kc:'+(col||'#8ae8ff')+'">'+(typeof kbLabel==='function'?kbLabel(k):k)+'</kbd>'}
function h2CharIdx(){try{return (shopInv().eq.ch)||0}catch(e){return 0}}
function h2Css(){if(h2El('h2Css'))return;const st=document.createElement('style');st.id='h2Css';st.textContent=`
 #gmHelp #gmHelpSlot{display:none}
 #h2Wrap{display:flex;flex-direction:column;gap:14px;min-height:0}
 #h2Tabs{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
 #h2Tabs button{font:inherit;font-weight:900;font-size:14px;letter-spacing:.08em;color:#cfe;background:#0a1216d9;border:0;border-radius:999px;padding:9px 18px;cursor:pointer;box-shadow:0 0 0 2px #05080a,0 0 0 3px #33454a;transition:.15s}
 #h2Tabs button:hover{transform:translateY(-2px)}
 #h2Tabs button.on{color:#140a1c;background:linear-gradient(90deg,#ffe36b,#ff7ad9);box-shadow:0 0 0 2px #05080a,0 0 0 4px #ffb3e6,0 0 20px #ff7ad988}
 #h2Tabs .sp{flex:1}
 #h2Tabs .h2go{background:#101a24;color:#8ae8ff;box-shadow:0 0 0 2px #05080a,0 0 0 3px #2c5a6a}
 .h2Pane{display:none;animation:h2In .35s cubic-bezier(.2,.9,.3,1.2)}.h2Pane.on{display:block}
 @keyframes h2In{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
 .h2Hint{font-size:12px;color:#9ab8ac;margin:0 0 10px;letter-spacing:.04em}.h2Hint b{color:#ffe36b}
 .h2Grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px}
 .h2Card{position:relative;background:linear-gradient(180deg,#0e1622ee,#070b12ee);border-radius:12px;padding:10px 12px 12px;box-shadow:0 0 0 2px #05080a,0 0 0 3px color-mix(in srgb,var(--c) 45%,#1a2630),0 6px 0 3px #05080a;transition:transform .12s,box-shadow .12s;overflow:hidden}
 .h2Card:before{content:'';position:absolute;left:0;right:0;top:0;height:3px;background:linear-gradient(90deg,transparent,var(--c),transparent);opacity:.8}
 .h2Card:hover{transform:translateY(-3px)}
 .h2Card.hit{transform:translateY(-4px) scale(1.02);box-shadow:0 0 0 2px #05080a,0 0 0 4px var(--c),0 0 26px var(--c)}
 .h2Card canvas{display:block;width:100%;aspect-ratio:16/9;image-rendering:pixelated;border-radius:8px;background:#05070c;box-shadow:inset 0 0 0 1px #ffffff14}
 .h2Top{display:flex;align-items:center;gap:8px;margin:0 0 8px}
 .h2Top .ic{width:26px;height:26px;display:grid;place-items:center;border-radius:7px;background:var(--c);color:#0a0a12;font-weight:900;font-size:14px;box-shadow:0 0 12px color-mix(in srgb,var(--c) 60%,transparent)}
 .h2Top .nm{font-weight:900;font-size:17px;letter-spacing:.08em;color:#fff;text-shadow:0 2px 0 #0008}
 .h2Keys{display:flex;flex-wrap:wrap;gap:5px;margin:9px 0 6px;min-height:28px;align-items:center}
 .h2k{display:inline-grid;place-items:center;min-width:28px;height:26px;padding:0 7px;border-radius:6px;font:900 12px/1 ${typeof FONT_STACK!=='undefined'?FONT_STACK:'sans-serif'};color:#0a0d14;background:linear-gradient(180deg,#fff,#cdd6e2);box-shadow:0 3px 0 color-mix(in srgb,var(--kc) 70%,#223),0 3px 0 1px #05080a,0 0 0 1px #05080a;transform:translateY(-2px);transition:.08s}
 .h2k.dn{transform:translateY(1px);box-shadow:0 0 0 1px #05080a,0 0 14px var(--kc);background:var(--kc)}
 .h2Keys .or{font-size:11px;color:#6f8a90;font-weight:700}
 .h2D{font-size:13px;line-height:1.5;color:#d6e4ea}.h2D b{color:#fff}
 .h2M{font-size:11px;color:#8aa4ae;margin-top:5px;letter-spacing:.03em}
 .h2Flow{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;position:relative}
 .h2Step{--c:#8ae8ff}.h2Step .no{position:absolute;right:10px;top:8px;font:900 24px/1 monospace;color:color-mix(in srgb,var(--c) 55%,transparent)}
 .h2Arrow{display:none}
 .h2Wide{margin-top:14px;display:grid;grid-template-columns:1.4fr 1fr;gap:14px}
 .h2Pr canvas{aspect-ratio:480/110}
 .h2Btn{font:inherit;font-weight:900;font-size:13px;border:0;border-radius:8px;padding:8px 14px;cursor:pointer;color:#140a1c;background:#ffe36b;box-shadow:0 3px 0 #9a7a10,0 3px 0 1px #05080a}
 .h2Btn:active{transform:translateY(2px);box-shadow:0 1px 0 #9a7a10}
 .h2Btn.off{background:#2a3440;color:#cfe;box-shadow:0 3px 0 #11161c,0 3px 0 1px #05080a}
 .h2Stat{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:8px;font-size:12px}
 .h2Stat span{background:#05080a;border-radius:6px;padding:4px 9px;box-shadow:inset 0 0 0 1px #ffffff18;font-weight:800}
 .h2Tbl{width:100%;table-layout:fixed;border-collapse:separate;border-spacing:0 6px;font-size:13px}
 .h2Tbl th{font-size:11px;letter-spacing:.1em;color:#8aa4ae;text-align:left;padding:0 10px;font-weight:800}
 .h2Tbl td{background:#0a1216e6;padding:9px 10px;color:#d6e4ea}
 .h2Tbl td:first-child{border-radius:8px 0 0 8px;font-weight:900}.h2Tbl td:last-child{border-radius:0 8px 8px 0}
 .h2Tbl tr.cur td{background:color-mix(in srgb,var(--c) 18%,#0a1216);box-shadow:inset 0 1px 0 color-mix(in srgb,var(--c) 60%,transparent),inset 0 -1px 0 color-mix(in srgb,var(--c) 60%,transparent)}
 .h2Bar{height:8px;border-radius:4px;background:#1a2430;overflow:hidden;min-width:60px}.h2Bar i{display:block;height:100%;background:var(--c);box-shadow:0 0 8px var(--c)}
 .h2Tips{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:14px}
 .h2Tip{background:#0a1216e6;border-radius:10px;padding:12px 14px;box-shadow:0 0 0 2px #05080a,0 0 0 3px #2a3a44;display:flex;gap:10px;align-items:flex-start}
 .h2Tip .e{font-size:22px;line-height:1;filter:drop-shadow(0 0 6px #fff4)}.h2Tip b{display:block;color:#fff;font-size:14px;margin-bottom:3px}.h2Tip p{margin:0;font-size:12px;line-height:1.5;color:#b9cdd4}
 .h2Sec{font-weight:900;letter-spacing:.18em;font-size:13px;color:#a6f5c6;margin:18px 0 6px}
 @media (max-width:760px){.h2Tips{grid-template-columns:1fr}.h2Flow{grid-template-columns:1fr 1fr}.h2Wide{grid-template-columns:1fr}.h2Grid{grid-template-columns:1fr 1fr;gap:10px}.h2D{font-size:12px}.h2Top .nm{font-size:15px}.h2Tbl{font-size:11px}.h2Tbl td{padding:7px 6px}}
 @media (max-width:420px){.h2Grid{grid-template-columns:1fr}}`;document.head.appendChild(st)}

function h2Build(){const scr=h2El('gmHelp');if(!scr)return;h2Css();let w=h2El('h2Wrap');if(!w){w=document.createElement('div');w.id='h2Wrap';scr.appendChild(w)}
 const cards=H2_CARDS.map(C=>{const ks=C.keys||h2Keys(C.acts);let keys='';
   if(C.id==='move'){const b=(()=>{try{return kbGet()}catch(e){return {}}})();const g=['up','left','down','right'].map(id=>(b[id]||[])[0]).filter(Boolean),g2=['up','left','down','right'].map(id=>(b[id]||[])[1]).filter(Boolean);keys=g.map(k=>h2Cap(k,C.col)).join('')+(g2.length?'<span class="or">또는</span>'+g2.map(k=>h2Cap(k,C.col)).join(''):'')}
   else keys=ks.map(k=>h2Cap(k,C.col)).join(C.id==='counter'?'':'<span class="or">/</span>');
   return '<div class="h2Card" data-id="'+C.id+'" style="--c:'+C.col+'"><div class="h2Top"><span class="ic">'+C.ico+'</span><span class="nm">'+C.t+'</span></div><canvas width="160" height="90" data-demo="'+C.id+'"></canvas><div class="h2Keys">'+keys+'</div><div class="h2D">'+C.d+'</div><div class="h2M">📱 '+C.m+'</div></div>'}).join('');
 const mk=(()=>{const b=(()=>{try{return kbGet()}catch(e){return {}}})(),o=[];for(const a of (typeof KB_ACT!=='undefined'?KB_ACT:[]))for(const k of (b[a.id]||[]))if(/^Mouse\d$/.test(k))o.push(h2Cap(k,'#c8a0ff')+' <small style="color:#cbb8ff">'+a.n+'</small>');return o.length?o.join(' '):'<small style="color:#9a88c8">아직 마우스 버튼을 쓰는 동작이 없어요</small>'})();
 const steps=[['dodge','회피 시간','#ff6b8a','보스가 몸짓을 하고 바닥에 <b>예고</b>가 차올라요. 다 차기 전에 걸어서 · 대시로 빠져나가요.'],
  ['grogi','그로기 채우기','#ffd166','금빛 조각을 <b>박자에 맞춰</b> 되받아치고, 불안정 코어를 차서 공격 속에 넣고, 공격 직전 <b>저스트 대시</b>!'],
  ['open','반격 시간','#8ae8ff','게이지가 차면 보스가 멈추고 약점이 열려요. 위험 요소는 사라지니 <b>원을 마음껏</b> 치세요.'],
  ['finish','FINISH','#ffffff','반격 끝에 나오는 큰 <b>FINISH 원</b>을 맞히면 큰 피해! 궁극기도 이때 쓰면 좋아요.']];
 const flow=steps.map(([id,t,c,d],i)=>'<div class="h2Card h2Step" style="--c:'+c+'"><span class="no">0'+(i+1)+'</span><div class="h2Top"><span class="ic">'+(i+1)+'</span><span class="nm">'+t+'</span></div><canvas width="160" height="90" data-demo="'+id+'"></canvas><div class="h2D" style="margin-top:8px">'+d+'</div></div>').join('');
 const dd=(typeof DIFF!=='undefined')?DIFF:{},gd=(typeof GM_DIFF!=='undefined')?GM_DIFF:[['easy','쉬움','#7dff9a'],['normal','보통','#8ad0ff'],['hard','어려움','#ffb020'],['extreme','익스트림','#ff4d6d']];
 const HPm=(typeof DF_HP!=='undefined')?DF_HP:{easy:.75,normal:1,hard:1.3,extreme:1.6},ST=(typeof DF_START!=='undefined')?DF_START:{easy:0,normal:0,hard:1,extreme:2};
 const cur=(typeof diff!=='undefined')?diff:'normal';
 const rows=gd.map(([k,n,c])=>{const o=dd[k]||{};const tel=Math.round(Math.min(1,(o.tel||1)/2.5)*100),win=Math.round(Math.min(1,(o.win||1)/1.3)*100);
   return '<tr class="'+(k===cur?'cur':'')+'" style="--c:'+c+'"><td style="color:'+c+'">'+(k===cur?'▶ ':'')+n+'</td><td><div class="h2Bar"><i style="width:'+tel+'%"></i></div></td><td><div class="h2Bar"><i style="width:'+win+'%"></i></div></td><td>'+Math.round((o.dm||1)*100)+'%</td><td>'+Math.round((HPm[k]||1)*100)+'%</td><td><b style="color:'+c+'">'+({easy:'기본만',normal:'+3종',hard:'+6종',extreme:'+10종'}[k]||'')+'</b></td><td><b style="color:'+c+'">PHASE '+((ST[k]||0)+1)+'</b></td></tr>'}).join('');
 const tips=[['👀','몸짓을 먼저 봐요','보스는 공격 직전에 창을 뒤로 빼거나 몸을 웅크려요. 예고보다 몸짓이 먼저 와요.'],
  ['🎵','음악이 곧 패턴','공격은 음악의 프레이즈(4·8박)에 맞춰 이어져요. 박자를 세면 다음 공격이 보여요.'],
  ['»','대시는 아껴 두기','0%까지 다 쓰면 천천히 충전돼요. 한두 칸은 늘 남겨 두세요.'],
  ['◈','패링은 박자에','그냥 막아도 되지만 박자에 맞추면 PERFECT 반사 — 그로기가 훨씬 빨리 차요.'],
  ['⚡','66% · 33% 각성','보스는 체력 66%·33%에서 각성해 새 패턴을 꺼내요. 화면이 번쩍이면 대비!'],
  ['🎧','소리가 어긋나면','블루투스 이어폰은 소리가 늦어요. 설정 → 싱크에서 + 로 맞춰 주세요.']].map(([e,t,p])=>'<div class="h2Tip"><span class="e">'+e+'</span><div><b>'+t+'</b><p>'+p+'</p></div></div>').join('');
 w.innerHTML='<div id="h2Tabs"><button data-t="0">🎮 기본 조작</button><button data-t="1">⚔ 전투 흐름 · 박자 연습</button><button data-t="2">📊 난이도 · 팁</button><span class="sp"></span><button class="h2go" id="h2Keyset">⌨ 키 바꾸기</button></div>'
  +'<div class="h2Pane" data-p="0"><p class="h2Hint">키보드를 눌러 보세요 — <b>누른 키의 카드가 반응</b>해요. 키는 설정에서 바꿀 수 있어요.</p><div class="h2Grid">'+cards+'<div class="h2Card" data-id="mouse" style="--c:#c8a0ff"><div class="h2Top"><span class="ic">🖱</span><span class="nm">마우스 · 키 바꾸기</span></div><canvas width="160" height="90" data-demo="mouse"></canvas><div class="h2Keys">'+mk+'</div><div class="h2D">설정 → 조작 키에서 <b>마우스 버튼</b>(왼쪽 · 오른쪽 · 가운데 · 옆)도 원하는 동작에 붙일 수 있어요.</div><div class="h2M">💻 컴퓨터 · 노트북 전용</div></div></div>'
   +'</div>'
  +'<div class="h2Pane" data-p="1"><p class="h2Hint">한 판은 <b>회피 → 그로기 → 반격 → FINISH</b> 가 음악에 맞춰 되풀이돼요.</p><div class="h2Flow">'+flow+'</div>'
   +'<div class="h2Wide"><div class="h2Card h2Pr" style="--c:#ffe79a"><div class="h2Top"><span class="ic">♪</span><span class="nm">박자 연습</span><span style="flex:1"></span><button class="h2Btn" id="h2PrBtn">▶ 연습 시작</button></div><canvas width="480" height="110" id="h2PrCv"></canvas>'
     +'<div class="h2Stat" id="h2PrStat"></div><div class="h2M">양쪽에서 모여드는 박자가 가운데에 닿는 순간 <b style="color:#ffe79a">'+h2Keys(['atk']).slice(0,2).map(k=>kbLabel(k)).join(' / ')+'</b> 또는 화면 클릭 · 판정 폭은 현재 난이도 기준</div></div>'
    +'<div class="h2Card" style="--c:#ff4d6d"><div class="h2Top"><span class="ic">⚡</span><span class="nm">각성 페이즈</span></div><canvas width="200" height="110" data-demo="phase" style="aspect-ratio:200/110"></canvas><div class="h2D" style="margin-top:8px">체력 <b>66%</b> · <b>33%</b>에서 각성. <b style="color:#ffb020">어려움</b>은 PHASE 2, <b style="color:#ff4d6d">익스트림</b>은 PHASE 3부터 시작해요.</div></div></div></div>'
  +'<div class="h2Pane" data-p="2"><div class="h2Sec" style="margin-top:0">난이도 비교</div><table class="h2Tbl"><tr><th></th><th>예고 시간</th><th>판정 여유</th><th>받는 피해</th><th>보스 체력</th><th>공격 패턴</th><th>시작</th></tr>'+rows+'</table>'
   +'<div class="h2Sec">꿀팁</div><div class="h2Tips">'+tips+'</div></div>';
 w.querySelectorAll('#h2Tabs [data-t]').forEach(b=>b.onclick=()=>{h2Tab(+b.dataset.t);try{gmSfx('move')}catch(e){}});
 h2El('h2Keyset').onclick=()=>{try{gmSfx('ok')}catch(e){}gmShow('set')};
 w.querySelectorAll('.h2Card[data-id]').forEach(el=>el.onclick=()=>h2Kick(el.dataset.id,1));
 {const mc=w.querySelector('.h2Card[data-id="mouse"]');if(mc){mc.style.cursor='pointer';mc.onclick=()=>{try{gmSfx('ok')}catch(e){}gmShow('set')}}}
 h2El('h2PrBtn').onclick=e=>{e.stopPropagation();h2PrToggle()};
 const pc=h2El('h2PrCv');pc.onpointerdown=e=>{e.preventDefault();if(!H2.pr.on)h2PrToggle();else h2PrHit()};
 h2Tab(H2.tab);h2PrStat();H2.built=1}
function h2Tab(i){H2.tab=i;document.querySelectorAll('#h2Tabs [data-t]').forEach(b=>b.classList.toggle('on',+b.dataset.t===i));document.querySelectorAll('#h2Wrap .h2Pane').forEach(p=>p.classList.toggle('on',+p.dataset.p===i));if(i!==1&&H2.pr.on)h2PrToggle()}
function h2Kick(id,snd){const C=H2_CARDS.find(c=>c.id===id);if(!C)return;const now=performance.now();H2.kick[id]=now-Math.max(0,C.a-.06)*1000;
 const el=document.querySelector('#h2Wrap .h2Card[data-id="'+id+'"]');if(el){el.classList.remove('hit');void el.offsetWidth;el.classList.add('hit');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('hit'),260)}
 if(snd)try{const f={move:520,atk:700,dash:980,parry:1180,counter:1320,ult:660,pause:440}[id]||800;sfx(f,.07,'square',.03,f*1.5)}catch(e){}}
function h2KeyFlash(code,on){document.querySelectorAll('#h2Wrap .h2k').forEach(k=>{const lb=(typeof kbLabel==='function'?kbLabel(code):code);if(k.textContent===lb)k.classList.toggle('dn',on)})}
function h2ActOf(code){try{const b=kbGet();for(const a of KB_ACT){if(a.c===code||(b[a.id]||[]).includes(code))return a.id}}catch(e){}return null}
function h2Active(){return typeof GM!=='undefined'&&GM.scr==='help'&&typeof mode!=='undefined'&&mode==='menu'&&!document.body.classList.contains('inBattle')&&H2.built}
/* 키 입력: 누르면 카드 반응 · 박자 연습 */
KB.pre.push(e=>{if(!h2Active())return false;if(e.repeat)return['KeyJ','Space','KeyZ'].includes(e.code)&&H2.tab===1;
 if(e.type==='keyup'){h2KeyFlash(e.code,false);return false}
 const act=h2ActOf(e.code);let lb=e.code;h2KeyFlash(e.code,true);setTimeout(()=>h2KeyFlash(e.code,false),180);
 if(/^Key[QWER]$/.test(e.code)&&H2.tab===0&&(!act||act==='present'||act==='deduce')){h2Kick('counter',1);return false}
 if(!act||act==='pause')return false;
 if(H2.tab===1&&act==='atk'){if(!H2.pr.on)h2PrToggle();else h2PrHit();return true}
 const map={up:'move',down:'move',left:'move',right:'move',atk:'atk',dash:'dash',parry:'parry',ult:'ult'};
 if(map[act]&&H2.tab===0){h2Kick(map[act],1);return ['atk','dash','parry','ult'].includes(act)}
 return false});

/* ---------- 박자 연습 ---------- */
const H2_MS=500;
function h2Win(){const d=(typeof DIFF!=='undefined'&&DIFF[diff])?DIFF[diff]:{win:1};return {p:Math.min(75,H2_MS*.15)*d.win,g:Math.min(140,H2_MS*.28)*d.win}}
function h2PrToggle(){const P=H2.pr;P.on=!P.on;if(P.on){P.t0=performance.now()+H2_MS*2;P.last=-3;P.n={P:0,G:0,H:0};P.streak=0;P.pops=[];try{if(typeof audio==='undefined'||!audio)initAudio()}catch(e){}}const b=h2El('h2PrBtn');if(b){b.textContent=P.on?'■ 그만':'▶ 연습 시작';b.classList.toggle('off',P.on)}h2PrStat()}
function h2PrHit(){const P=H2.pr,now=performance.now(),bt=(now-P.t0)/H2_MS;if(bt<-.5)return;const fr=bt-Math.floor(bt),err=Math.min(fr,1-fr)*H2_MS,w=h2Win(),late=fr<.5;
 const j=err<=w.p?'P':err<=w.g?'G':'H';P.n[j]++;if(j==='H')P.streak=0;else{P.streak++;P.best=Math.max(P.best,P.streak)}
 P.pops.push({t:now,j,ms:Math.round(err)*(late?1:-1)});if(P.pops.length>6)P.pops.shift();
 try{if(j==='P')sfx(1320,.09,'square',.04,1760);else if(j==='G')sfx(990,.07,'square',.03,1100);else sfx(420,.06,'triangle',.03,380)}catch(e){}h2PrStat()}
function h2PrStat(){const s=h2El('h2PrStat');if(!s)return;const n=H2.pr.n,tot=n.P+n.G+n.H;s.innerHTML='<span style="color:#ffe79a">PERFECT '+n.P+'</span><span style="color:#a6f5c6">GOOD '+n.G+'</span><span style="color:#8dcdf5">HIT '+n.H+'</span><span>연속 '+H2.pr.streak+' · 최고 '+H2.pr.best+'</span>'+(tot?'<span>정확도 '+Math.round((n.P+n.G*.6)/tot*100)+'%</span>':'')}
function h2PrDraw(c,now){const W=480,Hh=110,P=H2.pr;c.imageSmoothingEnabled=false;
 const g=c.createLinearGradient(0,0,0,Hh);g.addColorStop(0,'#0c0a1e');g.addColorStop(1,'#05060c');c.fillStyle=g;c.fillRect(0,0,W,Hh);
 const bt=P.on?(now-P.t0)/H2_MS:(now/H2_MS),cx=W/2,fr=bt-Math.floor(bt),w=h2Win(),err=Math.min(fr,1-fr)*H2_MS,onB=err<=w.p,nearB=err<=w.g;
 /* 무대 조명 */for(let i=0;i<5;i++){c.globalAlpha=.05+(onB?.05:0);c.fillStyle=['#ff7ad9','#8ae8ff','#ffe36b','#a6f5c6','#ff7ad9'][i];c.beginPath();c.moveTo(40+i*100,0);c.lineTo(10+i*100,Hh);c.lineTo(70+i*100,Hh);c.fill()}c.globalAlpha=1;
 const by=58;c.fillStyle='#0a1418';c.fillRect(cx-200,by-14,400,28);c.fillStyle='#3a4a4f';c.fillRect(cx-200,by-14,400,2);c.fillRect(cx-200,by+12,400,2);
 /* 판정 구역 */const pw=w.p/H2_MS*78,gw=w.g/H2_MS*78;c.fillStyle='#a6f5c622';c.fillRect(cx-gw,by-12,gw*2,24);c.fillStyle='#ffe79a33';c.fillRect(cx-pw,by-12,pw*2,24);
 for(let k=0;k<8;k++){const bb=Math.ceil(bt)+k,d=(bb-bt)*78;if(d>200)continue;const big=((bb%4)+4)%4===0,a=Math.max(.25,Math.min(1,1-d/210)),col=big?'#ffe79a':'#a6f5c6',hh=big?20:14;
  c.globalAlpha=a;c.fillStyle=col;c.fillRect(cx+d-2,by-hh/2,4,hh);c.fillRect(cx-d-2,by-hh/2,4,hh);c.globalAlpha=1}
 const mc=onB?'#ffe79a':nearB?'#a6f5c6':'#7f9a92';c.fillStyle=mc;c.fillRect(cx-4,by-18,8,36);if(onB){c.globalAlpha=.35;c.fillRect(cx-9,by-22,18,44);c.globalAlpha=1}
 /* 박자 번호 */c.font='900 12px monospace';c.textAlign='center';const bn=((Math.round(bt)%4)+4)%4;for(let i=0;i<4;i++){c.fillStyle=i===bn&&onB?'#ffe79a':'#3a4a58';c.fillRect(cx-42+i*24,14,16,6)}
 if(!P.on){c.fillStyle='#ffffffcc';c.font='900 14px '+(typeof FONT_STACK!=='undefined'?FONT_STACK:'sans-serif');c.fillText('▶ 눌러서 박자 연습 시작',cx,100)}
 else if(bt<0){c.fillStyle='#ffe79a';c.font='900 22px monospace';c.fillText(String(Math.ceil(-bt)),cx,100)}
 /* 메트로놈 */if(P.on){const bi=Math.floor(bt+.02);if(bi>P.last){P.last=bi;try{sfx(((bi%4)+4)%4===0?1560:1040,.03,'square',.018)}catch(e){}}}
 for(const p of P.pops){const k=(now-p.t)/700;if(k>=1)continue;const col=p.j==='P'?'#ffe79a':p.j==='G'?'#a6f5c6':'#8dcdf5';c.globalAlpha=1-k;c.fillStyle=col;c.font='900 '+(p.j==='P'?20:16)+'px monospace';c.fillText(p.j==='P'?'PERFECT!':p.j==='G'?'GOOD':'HIT',cx,by-24-k*18);c.font='700 10px monospace';c.fillText((p.ms>0?'+':'')+p.ms+'ms',cx,by+30+k*6);
  c.strokeStyle=col;c.lineWidth=2;c.beginPath();c.arc(cx,by,10+k*40,0,7);c.stroke()}
 c.globalAlpha=1;c.textAlign='left'}

/* ---------- 작은 연출 캔버스 ---------- */
function h2Bg(c,t,col){c.imageSmoothingEnabled=false;const g=c.createLinearGradient(0,0,0,90);g.addColorStop(0,'#10102a');g.addColorStop(1,'#07070f');c.fillStyle=g;c.fillRect(0,0,160,90);
 for(let i=0;i<14;i++){const x=(i*37+11)%160,y=(i*23+5)%52,a=.3+.3*Math.sin(t*2+i);c.globalAlpha=a;c.fillStyle='#fff';c.fillRect(x,y,1,1)}c.globalAlpha=1;
 c.fillStyle='#161a2c';c.fillRect(0,74,160,16);c.globalAlpha=.35;c.fillStyle=col;c.fillRect(0,74,160,1);c.globalAlpha=.12;for(let x=((-t*10)%16);x<160;x+=16)c.fillRect(x,75,1,15);c.globalAlpha=1}
function h2Chr(c,cx,fy,o){o=o||{};const s=2,idx=h2CharIdx();if(typeof ch2Draw!=='function'){c.fillStyle='#8ae8ff';c.fillRect(cx-5,fy-20,10,20);return}
 if(o.pose)CH2.pose=o.pose;try{ch2Draw(c,idx,cx-6*s,fy-11*s,s,!!o.fl,o.wt==null?null:o.wt,o.idle==null?null:o.idle)}catch(e){}finally{CH2.pose=null}}
function h2Txt(c,s,x,y,col,sz,a){c.globalAlpha=a==null?1:a;c.font='900 '+(sz||10)+'px monospace';c.textAlign='center';c.fillStyle='#000';c.fillText(s,x+1,y+1);c.fillStyle=col;c.fillText(s,x,y);c.globalAlpha=1;c.textAlign='left'}
function h2Ring(c,x,y,r,col,lw,a){c.globalAlpha=a==null?1:a;c.strokeStyle=col;c.lineWidth=lw||2;c.beginPath();c.arc(x,y,Math.max(0,r),0,7);c.stroke();c.globalAlpha=1}
function h2Star(c,x,y,r,col,a,rot){c.globalAlpha=a==null?1:a;c.fillStyle=col;c.beginPath();for(let i=0;i<10;i++){const q=(rot||0)+i*Math.PI/5-Math.PI/2,rr=i%2?r*.45:r;c.lineTo(x+Math.cos(q)*rr,y+Math.sin(q)*rr)}c.closePath();c.fill();c.globalAlpha=1}
function h2Boss(c,x,fy,t,o){o=o||{};const bob=Math.round(Math.sin(t*3)*1.5),y=fy-34+bob;
 c.fillStyle='#0008';c.fillRect(x-14,fy-1,28,3);
 c.fillStyle=o.hurt?'#fff':'#2a2440';c.fillRect(x-13,y,26,26);c.fillStyle=o.hurt?'#fff':'#3c3460';c.fillRect(x-11,y+2,22,20);
 c.fillStyle='#ffd166';c.fillRect(x-1,y-8,2,8);h2Star(c,x,y-9,4,'#ffe36b',1,t);
 const ec=o.stun?'#8ae8ff':'#ff4d6d';c.fillStyle=ec;if(o.stun){c.fillRect(x-7,y+9,4,1);c.fillRect(x+3,y+9,4,1)}else{c.fillRect(x-7,y+7,4,4);c.fillRect(x+3,y+7,4,4)}
 c.fillStyle='#1a1630';c.fillRect(x-16,y+8,3,12);c.fillRect(x+13,y+8,3,12);c.fillRect(x-9,y+26,6,8-bob);c.fillRect(x+3,y+26,6,8-bob);
 if(o.stun)for(let i=0;i<3;i++){const q=t*4+i*2.1;h2Star(c,x+Math.cos(q)*14,y-12+Math.sin(q)*4,3,'#ffe36b',.9,q)}}
function h2Mini(c,bt,x,y,w){c.fillStyle='#0a1418';c.fillRect(x-w/2,y,w,7);for(let k=0;k<4;k++){const bb=Math.ceil(bt)+k,d=(bb-bt)*18;if(d>w/2)continue;c.fillStyle=bb%4===0?'#ffe79a':'#a6f5c6';c.fillRect(x+d-1,y+1,2,5);c.fillRect(x-d-1,y+1,2,5)}const fr=bt-Math.floor(bt),on=Math.min(fr,1-fr)<.12;c.fillStyle=on?'#ffe79a':'#7f9a92';c.fillRect(x-2,y-2,4,11)}
function h2Parts(c,x,y,t,n,col,sp){for(let i=0;i<n;i++){const q=i*2.399,r=t*(sp||40)*(0.6+(i%3)*.25);c.globalAlpha=Math.max(0,1-t*2.2);c.fillStyle=col;c.fillRect(Math.round(x+Math.cos(q)*r),Math.round(y+Math.sin(q)*r),2,2)}c.globalAlpha=1}
const H2_DEMO={
 move(c,t){h2Bg(c,t,'#8ae8ff');const P=4,ph=t%P/P,tri=ph<.5?ph*2:2-ph*2,x=30+tri*100,fl=ph>=.5;
  for(let i=1;i<4;i++){const dx=fl?i*7:-i*7;c.globalAlpha=.25-i*.06;c.fillStyle='#8ae8ff';c.fillRect(x+dx-2,72-((t*9+i)%3),3,2)}c.globalAlpha=1;
  h2Chr(c,x,74,{fl,wt:t*9});const ks=[['↑',138,10],['←',128,20],['↓',138,20],['→',148,20]];ks.forEach(([k,kx,ky],i)=>{const lit=(i===3&&!fl)||(i===1&&fl);c.fillStyle=lit?'#8ae8ff':'#1c2430';c.fillRect(kx-4,ky-4,9,9);c.fillStyle=lit?'#000':'#6a7a90';c.font='900 7px monospace';c.textAlign='center';c.fillText(k,kx+.5,ky+3);c.textAlign='left'})},
 atk(c,t){h2Bg(c,t,'#ff9a5a');const ph=t%1.2,s=ph-.15;h2Chr(c,62,74,{pose:s>0&&s<.25?{arms:'point',side:1}:null,idle:t*3});
  const hit=s>.05&&s<.4,wob=hit?Math.sin(s*60)*2*(1-s/.4):0;c.fillStyle='#5a3a22';c.fillRect(112,52,4,22);c.fillStyle='#c8864a';c.fillRect(106+wob,40,16,16);c.fillStyle='#fff3';c.fillRect(106+wob,40,16,2);h2Ring(c,114+wob,48,5,'#ff4d6d',2);h2Ring(c,114+wob,48,1.5,'#ff4d6d',2);
  if(s>0&&s<.2){const k=s/.2;c.strokeStyle='#fff';c.lineWidth=3;c.globalAlpha=1-k;c.beginPath();c.arc(82,56,18,-1.3+k*.4,.9+k*.4);c.stroke();c.strokeStyle='#ff9a5a';c.lineWidth=2;c.beginPath();c.arc(82,56,22,-1.2+k*.4,1+k*.4);c.stroke();c.globalAlpha=1}
  if(s>.04&&s<.7){h2Parts(c,110,48,s,8,'#ffd166',60);h2Txt(c,'-12',114,34-s*20,'#ffe79a',11,1-s/.7)}},
 dash(c,t){h2Bg(c,t,'#a6f5c6');const P=2,ph=t%P,cyc=Math.floor(t/P),s=ph-.4,k=Math.max(0,Math.min(1,s/.16)),e=1-Math.pow(1-k,3),dir=cyc%2?-1:1,x0=dir>0?34:126,x=x0+dir*92*e;
  if(s>0&&s<.5)for(let i=4;i>=1;i--){const kk=Math.max(0,Math.min(1,(s-i*.025)/.16)),ee=1-Math.pow(1-kk,3);c.globalAlpha=.18+(.1*(4-i));c.filter='hue-rotate(90deg)';h2Chr(c,x0+dir*92*ee,74,{fl:dir<0});c.filter='none'}c.globalAlpha=1;
  if(s>0&&s<.25){c.fillStyle='#a6f5c6';for(let i=0;i<6;i++){c.globalAlpha=.6;c.fillRect(x-dir*(10+i*9),50+(i*7)%20,8,1)}c.globalAlpha=1}
  h2Chr(c,x,74,{fl:dir<0,idle:t*3});const used=(cyc%5)+(s>0?1:0),left=Math.max(0,5-used);
  for(let i=0;i<5;i++){c.fillStyle=i<left?'#a6f5c6':'#1c2a2a';c.fillRect(6+i*9,6,7,5)}c.fillStyle='#a6f5c6';c.font='900 7px monospace';c.fillText(left*20+'%',52,11);if(s>0&&s<.6)h2Txt(c,'-20%',60,24-s*10,'#a6f5c6',9,1-s/.6)},
 parry(c,t){h2Bg(c,t,'#ffd166');const ph=t%2,imp=.95,bt=ph*2;const pose=ph>imp-.08&&ph<imp+.35?{arms:'out',legs:'wide'}:null;h2Chr(c,54,74,{pose,idle:t*3});
  if(ph<imp){const k=ph/imp,x=160-k*(160-70);h2Star(c,x,54,5,'#ff4d6d',1,t*8);c.globalAlpha=.4;c.fillStyle='#ff4d6d';c.fillRect(x+4,53,14,2);c.globalAlpha=1}
  else{const s=ph-imp,x=70+s*160;if(x<170){h2Star(c,x,54,5,'#ffe36b',1,t*8);c.globalAlpha=.5;c.fillStyle='#ffe36b';c.fillRect(x-18,53,14,2);c.globalAlpha=1}
   if(s<.45){const a=1-s/.45;c.globalAlpha=a;c.strokeStyle='#ffd166';c.lineWidth=2;c.beginPath();for(let i=0;i<7;i++){const q=i*Math.PI/3;c.lineTo(68+Math.cos(q)*(10+s*20),54+Math.sin(q)*(12+s*20))}c.stroke();c.globalAlpha=1;h2Parts(c,68,54,s,10,'#fff6cf',70);h2Txt(c,'PERFECT',64,30-s*10,'#ffe79a',11,a)}}
  h2Mini(c,bt+.1,80,82,80)},
 counter(c,t){h2Bg(c,t,'#ffe79a');const bt=t*2,ph=t%2;h2Boss(c,124,74,t,{stun:1,hurt:ph>.75&&ph<.82});h2Chr(c,34,74,{idle:t*3});
  const L='QWER'[Math.floor(t/2)%4],cx=84,cy=40,hit=.75;
  if(ph<hit){const k=ph/hit;h2Ring(c,cx,cy,11,'#ffe79a',2);h2Ring(c,cx,cy,11+(1-k)*22,'#fff',1.5,.4+k*.6);c.fillStyle='#ffe79a';c.globalAlpha=.25;c.beginPath();c.arc(cx,cy,10,0,7);c.fill();c.globalAlpha=1;h2Txt(c,L,cx,cy+4,'#fff',11)}
  else{const s=ph-hit;if(s<.5){h2Ring(c,cx,cy,11+s*40,'#ffe79a',3,1-s*2);h2Parts(c,cx,cy,s,12,'#ffe79a',70);h2Txt(c,'PERFECT!',cx,cy-14-s*16,'#ffe79a',11,1-s*2);c.strokeStyle='#ffe79a';c.lineWidth=2;c.globalAlpha=1-s*2;c.beginPath();c.moveTo(cx,cy);c.lineTo(124,48);c.stroke();c.globalAlpha=1}}
  h2Mini(c,bt,80,82,110)},
 ult(c,t){h2Bg(c,t,'#ff7ad9');const P=3.2,ph=t%P,fill=Math.min(1,ph/1.8),fire=ph>1.9;
  h2Chr(c,40,74,{pose:fire&&ph<2.9?{arms:'vee',legs:'wide'}:null,idle:t*3});h2Boss(c,128,74,t,{hurt:fire&&ph<2.4&&Math.floor(ph*20)%2===0});
  c.fillStyle='#1c1428';c.fillRect(6,6,60,6);c.fillStyle=fill>=1?(Math.floor(t*8)%2?'#fff':'#ff7ad9'):'#ff7ad9';c.fillRect(7,7,58*fill,4);c.fillStyle='#ff7ad9';c.font='900 7px monospace';c.fillText(fill>=1?'READY!':'ULT',70,12);
  if(fire){const s=ph-1.9;if(s<.12){c.globalAlpha=.7*(1-s/.12);c.fillStyle='#fff';c.fillRect(0,0,160,90);c.globalAlpha=1}
   if(s<.9){const a=1-s/.9,wv=10*a+2;c.globalAlpha=a;c.fillStyle='#ff7ad9';c.fillRect(52,52-wv/2,120,wv);c.fillStyle='#fff';c.fillRect(52,52-wv/5,120,wv/2.5);c.globalAlpha=1;for(let i=0;i<5;i++)h2Star(c,60+((s*200+i*30)%100),52+Math.sin(i*2+s*9)*8,3,'#ffe36b',a,s*9+i);h2Txt(c,'ULTIMATE!',80,30,'#ff7ad9',12,a)}}},
 pause(c,t){h2Bg(c,t,'#c8c8d8');const ph=t%2.4,paused=ph>1.2;h2Chr(c,40,74,{idle:paused?0:t*3});
  for(let i=0;i<5;i++){const tt=paused?1.2:ph,y=66-((tt*20+i*12)%50),x=70+i*16+Math.sin(tt*3+i)*4;c.globalAlpha=paused?.35:.8;c.fillStyle=['#ff7ad9','#8ae8ff','#ffe36b','#a6f5c6','#c8a0ff'][i];c.fillRect(x,y,3,3);c.fillRect(x+2,y-6,1,6);c.fillRect(x+2,y-6,3,1)}c.globalAlpha=1;
  if(paused){c.globalAlpha=.45;c.fillStyle='#000';c.fillRect(0,0,160,90);c.globalAlpha=1;c.fillStyle='#fff';c.fillRect(70,30,7,22);c.fillRect(83,30,7,22);h2Txt(c,'PAUSE',80,66,'#c8c8d8',10)}},
 dodge(c,t){h2Bg(c,t,'#ff6b8a');const ph=t%3,fill=Math.min(1,ph/1.6),boom=ph>1.6&&ph<2.2,cx=80;
  h2Boss(c,140,74,t,{});c.save();c.translate(cx,70);c.scale(1,.42);h2Star(c,0,0,34,'#ff4d6d',.18,0);c.globalAlpha=.9;c.strokeStyle='#ff6b8a';c.lineWidth=2;c.beginPath();for(let i=0;i<10;i++){const q=i*Math.PI/5-Math.PI/2,rr=i%2?34*.45:34;c.lineTo(Math.cos(q)*rr,Math.sin(q)*rr)}c.closePath();c.stroke();h2Star(c,0,0,34*fill,'#ff6b8a',.45,0);c.restore();c.globalAlpha=1;
  const mv=Math.max(0,Math.min(1,(ph-.7)/.5)),px=80-mv*58;h2Chr(c,px,74,{fl:mv>0&&mv<1,wt:mv>0&&mv<1?t*10:null,idle:t*3});
  if(boom){const s=ph-1.6;c.globalAlpha=1-s/.6;c.fillStyle='#ffd0da';c.save();c.translate(cx,62);c.scale(1,.6);h2Star(c,0,0,30+s*30,'#fff',.7-s,s*3);c.restore();h2Parts(c,cx,62,s,14,'#ff6b8a',80);c.globalAlpha=1}
  if(ph>1.7&&ph<2.6)h2Txt(c,'회피!',px,36,'#a6f5c6',10,1-(ph-1.7)/.9);h2Txt(c,Math.round(fill*100)+'%',80,20,'#ff6b8a',8,ph<1.6?1:.3)},
 grogi(c,t){h2Bg(c,t,'#ffd166');const ph=t%3.2,bt=ph*2;h2Boss(c,132,74,t,{stun:ph>2.4});
  const shots=[.2,1,1.8];let g=0;shots.forEach((st,i)=>{const s=ph-st;if(s>.55)g++;if(s<0||s>1.2)return;if(s<.5){const x=120-s/.5*62;h2Star(c,x,50,4,'#ffe36b',1,s*9)}else if(s<.55){h2Chr(c,50,74,{pose:{arms:'point'}})}else{const k=(s-.55)/.3;if(k<1)h2Star(c,58+k*70,50-k*6,4,'#fff6cf',1,s*9);if(k<.6)h2Txt(c,'PERFECT',58,34,'#ffe79a',9,1-k/.6)}});
  const swing=shots.some(st=>{const s=ph-st;return s>.45&&s<.6});if(!swing)h2Chr(c,50,74,{idle:t*3,pose:swing?{arms:'point'}:null});
  const gf=ph>2.4?1:g/3;c.fillStyle='#1c1a10';c.fillRect(104,8,50,6);c.fillStyle=gf>=1?(Math.floor(t*8)%2?'#fff':'#ffd166'):'#ffd166';c.fillRect(105,9,48*gf,4);c.fillStyle='#ffd166';c.font='900 7px monospace';c.fillText('GROGGY',108,22);if(ph>2.4)h2Txt(c,'그로기!',120,34,'#ffe36b',10);h2Mini(c,bt,56,82,70)},
 open(c,t){h2Bg(c,t,'#8ae8ff');const ph=t%2.4,bt=t*2;h2Boss(c,112,74,t,{stun:1,hurt:Math.floor(t*2)!==Math.floor((t-.1)*2)});h2Chr(c,30,74,{idle:t*3});
  const pts=[[92,30,'Q'],[132,28,'W'],[88,56,'E'],[140,54,'R']];pts.forEach(([x,y,L],i)=>{const o=(ph*2-i*.5+4)%2,k=o/1;if(k<1){h2Ring(c,x,y,7,'#8ae8ff',2);h2Ring(c,x,y,7+(1-k)*12,'#fff',1,.3+k*.5);h2Txt(c,L,x,y+3,'#fff',8)}else{const s=k-1;if(s<.4){h2Ring(c,x,y,7+s*30,'#ffe79a',2,1-s/.4);h2Parts(c,x,y,s,6,'#ffe79a',50)}}});
  c.globalAlpha=.8;h2Txt(c,'위험 요소 OFF',44,16,'#8ae8ff',8);h2Mini(c,bt,80,82,110)},
 finish(c,t){h2Bg(c,t,'#ffffff');const ph=t%2.4,hit=1.4;h2Boss(c,116,74,t,{stun:ph<hit,hurt:ph>hit&&ph<hit+.3});h2Chr(c,34,74,{idle:t*3,pose:ph>hit&&ph<hit+.4?{arms:'vee'}:null});
  if(ph<hit){const k=ph/hit;h2Ring(c,116,48,16,'#fff',3);h2Ring(c,116,48,16+(1-k)*30,'#ffe79a',2,.3+k*.7);h2Txt(c,'FINISH',116,51,'#fff',8)}
  else{const s=ph-hit;if(s<.1){c.globalAlpha=.8;c.fillStyle='#fff';c.fillRect(0,0,160,90);c.globalAlpha=1}if(s<.9){h2Ring(c,116,48,16+s*80,'#fff',4,1-s/.9);h2Parts(c,116,48,s,18,'#fff6cf',90);h2Txt(c,'FINISH! -999',100,26-s*8,'#fff',11,1-s/.9)}}},
 mouse(c,t){h2Bg(c,t,'#c8a0ff');const ph=t%3,btn=Math.floor(ph),x=64,y=22;h2Chr(c,28,74,{idle:t*3,pose:ph%1<.3?{arms:'point'}:null});
  c.fillStyle='#05070c';c.fillRect(x-2,y-2,36,52);c.fillStyle='#d6dce6';c.fillRect(x,y,32,48);c.fillStyle='#aab4c4';c.fillRect(x,y+20,32,28);c.fillStyle='#05070c';c.fillRect(x+15,y,2,20);c.fillRect(x,y+20,32,2);
  const on=ph%1<.45,col='#c8a0ff';if(on){c.fillStyle=col;if(btn===0)c.fillRect(x,y,15,20);else if(btn===1)c.fillRect(x+17,y,15,20);else c.fillRect(x+13,y+4,6,10)}c.fillStyle='#5a6070';c.fillRect(x+14,y+5,4,8);
  const lab=['공격','패링','대시'][btn];if(on){h2Txt(c,lab+'!',124,40,'#fff',10);h2Parts(c,124,36,ph%1,8,col,40)}h2Txt(c,['왼쪽','오른쪽','가운데'][btn],124,60,'#cbb8ff',8)},
 detect(c,t){h2Bg(c,t,'#c8a0ff');const ph=t%4;h2Chr(c,30,74,{idle:t*3,pose:ph>2.6&&ph<3.6?{arms:'point',side:1}:null});
  c.fillStyle='#3a2a18';c.fillRect(56,40,40,30);c.fillStyle='#f4e6c8';c.fillRect(58,42,17,26);c.fillRect(77,42,17,26);c.fillStyle='#8a7a60';for(let i=0;i<5;i++){c.fillRect(60,46+i*4,12,1);if(i<Math.floor(ph*2))c.fillRect(79,46+i*4,12,1)}
  const clues=[[118,30],[138,50],[112,58]];clues.forEach(([x,y],i)=>{const on=ph>i*.6+.3;h2Ring(c,x,y,6,on?'#c8a0ff':'#4a3a60',2);h2Txt(c,'?',x,y+3,on?'#fff':'#6a5a80',8);if(on&&ph<2.6){c.globalAlpha=.3;c.strokeStyle='#c8a0ff';c.beginPath();c.moveTo(x,y);c.lineTo(92,52);c.stroke();c.globalAlpha=1}});
  if(ph>2.6){const s=ph-2.6;h2Txt(c,'이의 있음!',80,26,'#ffe36b',12,Math.min(1,s*4)*(1-Math.max(0,s-.8)*2));h2Parts(c,80,22,s,10,'#c8a0ff',60)}},
 phase(c,t){const W=200,Hh=110;c.imageSmoothingEnabled=false;const g=c.createLinearGradient(0,0,0,Hh);g.addColorStop(0,'#1a0a18');g.addColorStop(1,'#07050c');c.fillStyle=g;c.fillRect(0,0,W,Hh);
  const P=6,ph=t%P,hp=1-ph/P*.95,phase=hp>.66?0:hp>.33?1:2,cols=['#8ad0ff','#ffb020','#ff4d6d'];const x0=16,bw=168,y=24;
  c.fillStyle='#000';c.fillRect(x0-2,y-2,bw+4,14);c.fillStyle='#2a1420';c.fillRect(x0,y,bw,10);c.fillStyle=cols[phase];c.fillRect(x0,y,bw*hp,10);c.fillStyle='#fff4';c.fillRect(x0,y,bw*hp,2);
  for(const m of [.66,.33]){const mx=x0+bw*m;c.fillStyle='#fff';c.fillRect(mx-1,y-5,2,20);h2Txt(c,Math.round(m*100)+'%',mx,y+26,'#ffffffaa',8)}
  const edge=[.66,.33].map(m=>Math.abs(hp-m)<.03).some(Boolean);if(edge){c.globalAlpha=.3;c.fillStyle=cols[phase];c.fillRect(0,0,W,Hh);c.globalAlpha=1}
  ['PHASE 1','PHASE 2','PHASE 3'].forEach((n,i)=>{const lit=i===phase;c.fillStyle=lit?cols[i]:'#221a28';c.fillRect(16+i*58,66,52,20);h2Txt(c,n,42+i*58,80,lit?'#140a12':'#5a4a60',9)});
  if(phase>0){const s=(ph%1);for(let i=0;i<6;i++)h2Star(c,20+((i*37+t*30)%170),96+Math.sin(t*4+i)*4,2+phase,cols[phase],.6,t*3+i)}h2Txt(c,'BOSS HP',38,16,'#ffffffcc',8)}};
function h2Loop(){H2.raf=0;if(!h2Active())return;const now=performance.now();
 document.querySelectorAll('#h2Wrap .h2Pane.on canvas[data-demo]').forEach(cv=>{const id=cv.dataset.demo,f=H2_DEMO[id];if(!f)return;const c=cv.getContext('2d');const b=H2.kick[id],t=b&&now-b<(H2_PER[id]||2)*1000?(now-b)/1000:now/1000+(id.length*.37);c.save();try{f(c,t)}catch(e){if(!H2['e'+id]){H2['e'+id]=1;console.error('h2 demo',id,e)}}c.restore();c.globalAlpha=1});
 if(H2.tab===1){const pc=h2El('h2PrCv');if(pc){const c=pc.getContext('2d');c.save();try{h2PrDraw(c,now)}catch(e){if(!H2.epr){H2.epr=1;console.error(e)}}c.restore()}}
 H2.raf=requestAnimationFrame(h2Loop)}
{const _gs=gmShow;gmShow=function(scr){const r=_gs.apply(this,arguments);try{if(scr==='help'){h2Build();if(!H2.raf)H2.raf=requestAnimationFrame(h2Loop)}else if(H2.pr.on)h2PrToggle()}catch(e){console.error(e)}return r}}

