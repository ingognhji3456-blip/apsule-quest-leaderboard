/* ================= v168 보스 직접 만들기 (BE168) =================
   - 보스 러시 창의 「🛠 보스 만들기」(또는 우편 도전장의 「도전하기」)로 연다.
   - 만들기: 몸(1·2장 보스 18명, 변신하는 9 · 19번 제외) · 색(9가지, 몸 색을 색상환으로 돌림) · 이름(2~12자) · 체력(5단계) · 공격 3~6개
     (1·2장 보스들의 공격 이름 MV 중에서, 첫 번째가 대표 기술). 저장하면 서버가 코드 6자리를 준다(/api/cboss/save, 한 사람 12개).
   - 목록: 인기(좋아요×5 + 깬 사람×2 + 도전 수) · 새 보스 · 내 보스 · 코드로 찾기(/api/cboss/list). 좋아요 /api/cboss/like.
     친구에게 도전장 = 우편(/api/cboss/challenge, 본문 [보스 코드 XXXXXX] → 163 우편함이 「도전하기」 단추로 바꿈).
   - 싸움: 몸 보스의 이름 · 색 · 공격 목록(DECK)을 잠깐 바꿔 끼우고(swapIn) startRush(몸). 끝나면 되돌림(swapOut — 결과 · 로비 · 다른 싸움 · c3SwapIn 때).
     체력은 9994가 맞춘 뒤 HPS 배율. 난이도별 추가 공격(t5Deck)은 섞지 않는다(만든 공격만 나오게). 결과는 이 파일의 결과창(보스 러시 기록 · 코인은 안 줌)
     → /api/cboss/result(처음 깨면 깬 사람 +1, 남의 보스면 🪙50 · 하루 10번, 장부 pvp_ledger → PVP92.ledger). */
(()=>{try{
 if(typeof BOSSES==='undefined'||typeof DECK==='undefined'||typeof MV==='undefined')return;
 const $=id=>document.getElementById(id),esc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const api=(p,b)=>window.DUO85&&DUO85.api?DUO85.api(p,b?'POST':'GET',b):Promise.resolve({s:0,j:{}});
 const acc=()=>{try{return DUO85.acc()}catch(e){return {}}};
 const num=v=>Number(v||0).toLocaleString(),fmt=ms=>{const s=Math.floor(ms/1000);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')+'.'+String(Math.floor(ms%1000/10)).padStart(2,'0')};
 const BODIES=[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18];
 const HUES=[0,40,80,120,160,200,240,280,320];
 const HPS=[[.6,'약함'],[1,'보통'],[1.5,'강함'],[2,'아주 강함'],[3,'괴물']];
 const nm=n=>(typeof ATK_NAME!=='undefined'&&ATK_NAME[n])||(typeof SIGNAME!=='undefined'&&SIGNAME[n])||n;
 /* 고를 수 있는 공격: 1장(기계) · 2장(굶주림) 보스들의 공격 */
 const POOL=[[0,'⚙ 기계 보스 공격'],[1,'🦴 굶주림 보스 공격']].map(([c,t])=>{const s=new Set();for(let i=c*10;i<c*10+9;i++)for(const m of (DECK[i]||[]))if(MV[m[0]]&&nm(m[0])!==m[0])s.add(m[0]);return {t,list:[...s]}});
 const ALL=new Set(POOL.flatMap(p=>p.list));
 /* 색 돌리기 */
 function hx(h){h=String(h||'#888').replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h.slice(0,6),16);return [(n>>16)&255,(n>>8)&255,n&255]}
 function rot(hex,deg){if(!deg||typeof hex!=='string'||hex[0]!=='#')return hex;let [r,g,b]=hx(hex).map(v=>v/255);const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let h=0,s=0;
  if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;h/=6}h=(h+deg/360)%1;
  const f=(p,q,t)=>{t=(t+1)%1;return t<1/6?p+(q-p)*6*t:t<.5?q:t<2/3?p+(q-p)*(2/3-t)*6:p};const q=l<.5?l*(1+s):l+s-l*s,p=2*l-q;
  const o=s?[f(p,q,h+1/3),f(p,q,h),f(p,q,h-1/3)]:[l,l,l];return '#'+o.map(v=>Math.round(v*255).toString(16).padStart(2,'0')).join('')}
 const deckOf=d=>d.atks.filter(a=>MV[a]).map((a,i)=>i===0?[a,4,0,'S']:[a,3,0]);
 /* 몸 보스에 잠깐 끼우기 */
 const CE={sw:null,cur:null,starting:false,tStart:0};
 function swapIn(d){swapOut();const bi=d.body,B=BOSSES[bi],deg=HUES[d.hue|0]||0;CE.sw={bi,name:B.name,en:B.en,c:B.c,pal:B.pal,deck:DECK[bi]};
  B.name=d.name;B.en='MADE BY '+(d.owner||'나');if(deg){B.c=rot(B.c,deg);B.pal=(B.pal||[]).map(x=>rot(x,deg))}const dk=deckOf(d);if(dk.length)DECK[bi]=dk;try{delete _bbFit[bi]}catch(e){}}
 function swapOut(){const s=CE.sw;if(!s)return;const B=BOSSES[s.bi];B.name=s.name;B.en=s.en;B.c=s.c;B.pal=s.pal;DECK[s.bi]=s.deck;try{delete _bbFit[s.bi]}catch(e){}CE.sw=null}
 /* 미리보기: 같은 방법으로 잠깐 바꿔 그리고 바로 되돌림 */
 function drawBoss(c,d,x,y,now,u){const B=BOSSES[d.body|0],deg=HUES[d.hue|0]||0,c0=B.c,p0=B.pal;if(deg&&!CE.sw){B.c=rot(c0,deg);B.pal=(p0||[]).map(v=>rot(v,deg))}
  c.save();if(deg)c.filter='hue-rotate('+deg+'deg)';PV.on=1;try{drawMech(c,B,x,y,now,{},u)}catch(e){}finally{PV.on=0;c.restore();if(deg&&!CE.sw){B.c=c0;B.pal=p0}}}
 /* 보스 그림은 자기 색표를 따로 쓰는 것이 많아서, 그리는 순간 색상환을 돌린다(싸움 중 몸 보스를 그릴 때) */
 const PV={on:0};
 {const f=drawMech;drawMech=function(c,B,x,y,t,o,u){const s=CE.sw,deg=s&&!PV.on&&B===BOSSES[s.bi]?(HUES[(CE.cur&&CE.cur.hue)|0]||0):0;if(!deg||!c||!c.save)return f.apply(this,arguments);
  c.save();try{c.filter=(c.filter&&c.filter!=='none'?c.filter+' ':'')+'hue-rotate('+deg+'deg)'}catch(e){}try{return f.apply(this,arguments)}finally{c.restore()}}}
 {const f=c3SwapIn;if(typeof f==='function')c3SwapIn=function(){swapOut();return f.apply(this,arguments)}}
 {const f=toLobby;toLobby=function(){swapOut();try{if(G)G.ce168=null}catch(e){}return f.apply(this,arguments)}}
 {const f=startFight;startFight=function(){if(!CE.starting)swapOut();return f.apply(this,arguments)}}
 if(typeof t5Deck==='function'){const f=t5Deck;t5Deck=function(base){try{if(G&&G.ce168)return base}catch(e){}return f.apply(this,arguments)}}
 {const f=drawScene;drawScene=function(now){const r=f.apply(this,arguments);try{if(G&&G.ce168&&G._hp54&&!G._ce168hp&&mode==='boss'){G._ce168hp=1;const k=(HPS[G.ce168.hp|0]||HPS[1])[0];G.hp=Math.round(G.hp*k);G.maxHp=Math.round(G.maxHp*k);G.hpShow=G.hp/G.maxHp;G._barLast=undefined}}catch(e){}return r}}
 function fight(d){if(!d||!d.atks)return;closePanel();try{$('overlay').hidden=true}catch(e){}CE.cur=d;swapIn(d);CE.starting=true;
  try{startRush(d.body)}catch(e){console.error('be168',e)}finally{CE.starting=false}
  try{G.ce168=d;G._ce168hp=0;CE.tStart=performance.now();$('bossName').textContent=d.name+'  · 만든 이 '+(d.owner||'나');$('bvTitle').textContent='BEAT BLADE · 만든 보스 '+(d.code||'')}catch(e){}}
 {const f=fightEnd;fightEnd=function(won){try{if(G&&G.ce168){end(!!won);return}}catch(e){console.error(e)}return f.apply(this,arguments)}}
 async function end(won){if(G.state==='result')return;G.state='result';G.won=won;try{stopMusic()}catch(e){}const d=G.ce168,ms=Math.round(performance.now()-(G.startReal||CE.tStart)),hits=G.hits||0;/* 몸 보스는 로비로 나가거나 다른 싸움을 시작할 때 되돌림(결과창 뒤 이름이 바뀌지 않게) */
  try{if(won){perc('crash',audio.currentTime,.6);sfx(523,.2,'triangle',.06,1046)}}catch(e){}
  let res=null;if(d.code&&acc().token){const r=await api('/api/cboss/result',{code:d.code,win:won,ms});if(r.s===200)res=r.j;if(res&&res.gold){try{window.PVP92&&PVP92.ledger()}catch(e){}}}
  const b=(res&&res.boss)||d;
  const html='<div class="be168r"><canvas width="140" height="110" data-res="1"></canvas><b>'+esc(d.name)+'</b><small>만든 이 '+esc(d.owner||'나')+(d.code?' · 코드 '+esc(d.code):'')+'</small>'+
   '<div class="rs"><span>시간 <b>'+fmt(ms)+'</b></span><span>맞은 횟수 <b>'+hits+'</b></span><span>최대 콤보 <b>'+(G.maxCombo||0)+'</b></span></div>'+
   (won&&res?(res.first?'<div class="g">🎉 처음 깼어요!'+(res.gold?' 🪙 +'+res.gold:(b.own?' (내 보스는 보상 없음)':' (오늘 보상 횟수를 다 썼어요)'))+'</div>':'')+(res.record?'<div class="g rc">🏆 이 보스 최고 기록!</div>':''):'')+
   (!won?'<div class="g l">보스 체력 '+Math.max(0,Math.round(G.hp/G.maxHp*100))+'% 남음</div>':'')+
   (d.code?'<div class="st">도전 '+num(b.plays)+' · 깬 사람 '+num(b.clears)+' · ♥ '+num(b.likes)+(b.best_ms?' · 최고 '+fmt(b.best_ms)+' ('+esc(b.best_name)+')':'')+'</div>':'<div class="st">시험 싸움 · 저장하면 코드가 생겨요</div>')+'</div>';
  const btns=[['↺ 다시 도전',()=>{$('overlay').hidden=true;fight(d)},!won]];
  if(d.code&&!d.own)btns.push([(b.liked?'♥ 좋아요 취소':'♡ 좋아요'),async()=>{const r=await api('/api/cboss/like',{code:d.code});if(r.s===200){d.liked=r.j.liked;toast(r.j.liked?'♥ 좋아요!':'좋아요를 취소했어요')}},false]);
  btns.push(['🛠 만든 보스 목록',()=>{$('overlay').hidden=true;try{toLobby()}catch(e){}setTimeout(()=>openPanel(d.own||!d.code?'mine':'hot'),200)},won],['로비로',()=>{try{toLobby()}catch(e){}},false]);
  try{showOverlay(won?'CUSTOM BOSS':'CUSTOM BOSS',won?'격파!':'패배',html,btns);const cv=document.querySelector('#mText canvas[data-res]');if(cv)anim(cv,d,2.6)}catch(e){}}
 const toast=t=>{try{window.MR163&&MR163.toast?MR163.toast(t):banner(t)}catch(e){}};
 /* 캔버스에 보스 그리기(움직임) — 화면에 붙어 있는 동안만 */
 function anim(cv,d,u){const o=cv.getContext('2d');let raf=0;const loop=now=>{if(!cv.isConnected)return;o.setTransform(1,0,0,1,0,0);o.clearRect(0,0,cv.width,cv.height);
   const g=o.createRadialGradient(cv.width/2,cv.height*.78,4,cv.width/2,cv.height*.78,cv.width*.5);g.addColorStop(0,rot((BOSSES[d.body|0]||{}).c||'#888',HUES[d.hue|0]||0)+'55');g.addColorStop(1,'transparent');o.fillStyle=g;o.fillRect(0,0,cv.width,cv.height);
   o.imageSmoothingEnabled=false;drawBoss(o,d,cv.width/2,cv.height*.6,now,u);raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop)}
 /* 정지 그림(목록 카드) */
 function still(cv,d,u){const o=cv.getContext('2d');o.clearRect(0,0,cv.width,cv.height);o.imageSmoothingEnabled=false;drawBoss(o,d,cv.width/2,cv.height*.74,1000,u)}

 /* ---------- 창 ---------- */
 const box=document.createElement('div');box.id='be168';box.hidden=true;document.body.appendChild(box);box.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===box)closePanel()});
 const S={view:'hot',items:[],msg:'',ed:null,card:null,busy:0,max:12,fr:null};
 const blank=()=>({name:'',body:0,hue:0,hp:1,atks:[]});
 function openPanel(v){if(!acc().token){try{ACCT55.open()}catch(e){}return}box.hidden=false;S.msg='';if(v==='new'){S.ed=blank();S.view='edit';paint();return}S.view=v||'hot';paint();load()}
 function closePanel(){box.hidden=true}
 async function load(){const v=S.view;if(!['hot','new','mine'].includes(v))return;S.busy=1;paint();const r=await api('/api/cboss/list',{by:v});S.busy=0;if(S.view!==v)return;
  if(r.s===200){S.items=r.j.items||[];S.max=r.j.max||12}else S.msg=(r.j&&r.j.error)||'불러오지 못했어요 (서버 연결 확인)';paint()}
 async function byCode(code){code=String(code||'').trim().toUpperCase();if(!/^[A-Z0-9]{6}$/.test(code)){S.msg='보스 코드 6자리를 넣어 주세요';paint();return}
  const r=await api('/api/cboss/list',{by:'code',code});if(r.s===200&&r.j.items&&r.j.items[0]){S.card=r.j.items[0];S.view='card';S.msg=''}else S.msg=(r.j&&r.j.error)||'그 코드의 보스가 없어요';paint()}
 const tabs=()=>'<div class="tb">'+[['hot','🔥 인기'],['new','✨ 새 보스'],['mine','🛠 내 보스']].map(([k,t])=>'<button data-tab="'+k+'" class="'+(S.view===k?'on':'')+'">'+t+'</button>').join('')+
  '<div class="cd"><input maxlength="6" placeholder="보스 코드" autocapitalize="characters" spellcheck="false" autocomplete="off"><button class="go">찾기</button></div></div>';
 function cardHtml(b,i){const hp=(HPS[b.hp|0]||HPS[1])[1];
  return '<div class="bc'+(i<3&&S.view==='hot'?' top t'+i:'')+'" data-i="'+i+'">'+(S.view==='hot'?'<i class="rk">'+(i+1)+'</i>':'')+'<canvas width="96" height="80" data-b="'+i+'"></canvas><div class="bi"><b>'+esc(b.name)+'</b><small>'+esc(b.owner)+' · '+hp+' · 공격 '+(b.atks||[]).length+'개</small>'+
   '<div class="bs">'+(b.cleared?'<em>✔ 깸</em>':'')+'<span>♥ '+num(b.likes)+'</span><span>도전 '+num(b.plays)+'</span><span>깬 사람 '+num(b.clears)+'</span>'+(b.best_ms?'<span>최고 '+fmt(b.best_ms)+'</span>':'')+'</div></div><button class="pl" data-play="'+i+'">도전 ▶</button></div>'}
 function editHtml(){const d=S.ed,B=BOSSES[d.body],k=d.atks.length;
  return '<div class="ed"><div class="pv"><canvas width="200" height="160" class="big"></canvas><div class="nmI"><input maxlength="12" placeholder="보스 이름 (2~12자)" value="'+esc(d.name)+'"></div>'+
   '<div class="sum"><span>몸 <b>'+esc(B.name)+'</b></span><span>체력 <b>'+HPS[d.hp][1]+'</b></span><span>공격 <b>'+k+' / 6</b></span></div>'+
   '<div class="ol">'+(k?d.atks.map((a,i)=>'<span class="'+(i?'':'sg')+'">'+(i?i+1:'★')+' '+esc(nm(a))+'<u data-rm="'+i+'">✕</u></span>').join(''):'<small>오른쪽에서 공격을 3~6개 골라요 · 첫 번째가 대표 기술</small>')+'</div>'+
   '<div class="ac"><button class="try"'+(k>=3?'':' disabled')+'>⚔ 시험 싸움</button><button class="sv"'+(k>=3&&d.name.trim().length>=2?'':' disabled')+'>💾 '+(d.code?'고친 것 저장':'저장하고 코드 받기')+'</button></div></div>'+
   '<div class="op"><h5>몸 <small>보스 모습</small></h5><div class="bd">'+BODIES.map(i=>'<button data-body="'+i+'" class="'+(d.body===i?'on':'')+'" title="'+esc(BOSSES[i].name)+'"><canvas width="56" height="48" data-bd="'+i+'"></canvas></button>').join('')+'</div>'+
   '<h5>색</h5><div class="hu">'+HUES.map((h,i)=>'<button data-hue="'+i+'" class="'+(d.hue===i?'on':'')+'" style="--c:'+rot(B.c,h)+';--c2:'+rot((B.pal||[])[0]||B.c,h)+'">'+(i?'':'원래')+'</button>').join('')+'</div>'+
   '<h5>체력</h5><div class="hp">'+HPS.map((h,i)=>'<button data-hp="'+i+'" class="'+(d.hp===i?'on':'')+'">'+h[1]+'<small>×'+h[0]+'</small></button>').join('')+'</div>'+
   '<h5>공격 <small>눌러서 넣기 · 다시 누르면 빼기 (3~6개)</small></h5>'+POOL.map(p=>'<div class="pg"><i>'+p.t+'</i><div>'+p.list.map(a=>{const j=d.atks.indexOf(a);return '<button data-atk="'+a+'" class="'+(j>=0?'on':'')+'">'+(j===0?'★ ':j>0?(j+1)+' ':'')+esc(nm(a))+'</button>'}).join('')+'</div></div>').join('')+'</div></div>'}
 function cardView(){const b=S.card,hp=(HPS[b.hp|0]||HPS[1])[1];
  return '<div class="cv"><canvas width="220" height="170" class="big"></canvas><div class="ci"><b>'+esc(b.name)+'</b><small>만든 이 '+esc(b.owner)+' · 코드 <em>'+esc(b.code)+'</em> <button class="cp">복사</button></small>'+
   '<div class="bs"><span>♥ '+num(b.likes)+'</span><span>도전 '+num(b.plays)+'</span><span>깬 사람 '+num(b.clears)+'</span><span>체력 '+hp+'</span></div>'+
   (b.best_ms?'<div class="bst">🏆 최고 기록 <b>'+fmt(b.best_ms)+'</b> · '+esc(b.best_name)+(b.my_ms?' · 내 기록 '+fmt(b.my_ms):'')+'</div>':'<div class="bst">아직 깬 사람이 없어요 · 첫 클리어에 도전!</div>')+
   '<div class="ol">'+(b.atks||[]).map((a,i)=>'<span class="'+(i?'':'sg')+'">'+(i?i+1:'★')+' '+esc(nm(a))+'</span>').join('')+'</div>'+
   '<div class="ac"><button class="pl1">⚔ 도전하기</button>'+(b.own?'<button class="ed1">✏ 고치기</button><button class="del">🗑 지우기</button>':'<button class="lk'+(b.liked?' on':'')+'">'+(b.liked?'♥ 좋아요':'♡ 좋아요')+'</button>')+'<button class="ch">📨 친구에게 도전장</button></div>'+
   (S.fr?'<div class="fr">'+(S.fr.length?S.fr.map(f=>'<button data-fr="'+esc(f.name)+'">'+esc(f.name)+(f.online?' <i></i>':'')+'</button>').join(''):'<small>친구가 없어요 · 친구를 먼저 추가해 주세요</small>')+'</div>':'')+
   '<div class="tip">'+(b.own?'내가 만든 보스예요 · 고치면 기록(최고 시간 · 깬 사람)은 처음부터 다시 세요':'처음 깨면 🪙 50 (하루 10번까지)')+'</div></div></div>'}
 function paint(){if(box.hidden)return;const v=S.view;let h='<div class="pn"><div class="hd"><button class="bk">닫기</button><i>🛠</i><div><b>보스 직접 만들기</b><small>몸 · 색 · 체력 · 공격을 골라 나만의 보스 · 코드로 친구에게 도전장</small></div></div>';
  if(v==='edit')h+='<div class="sub"><button class="back">◀ 목록</button><span>'+(S.ed.code?'보스 고치기 · '+esc(S.ed.code):'새 보스 만들기')+'</span></div>'+editHtml();
  else if(v==='card')h+='<div class="sub"><button class="back">◀ 목록</button><span>보스 정보</span></div>'+cardView();
  else h+=tabs()+'<button class="new">＋ 새 보스 만들기 <small>'+(v==='mine'?S.items.length+' / '+S.max+'개':'')+'</small></button><div class="ls">'+
   (S.busy?'<div class="em">불러오는 중…</div>':S.items.length?S.items.map(cardHtml).join(''):'<div class="em">'+(v==='mine'?'아직 만든 보스가 없어요 · 「새 보스 만들기」를 눌러 봐요':'아직 보스가 없어요 · 첫 보스를 만들어 봐요!')+'</div>')+'</div>';
  h+='<div class="msg">'+esc(S.msg)+'</div></div>';box.innerHTML=h;wire()}
 function wire(){const q=s=>box.querySelector(s),qa=s=>box.querySelectorAll(s);
  q('.bk').onclick=closePanel;if(q('.back'))q('.back').onclick=()=>{S.view=S.ed&&S.ed.code||S.card&&S.card.own?'mine':'hot';S.fr=null;S.msg='';paint();load()};
  qa('[data-tab]').forEach(b=>b.onclick=()=>{S.view=b.dataset.tab;S.msg='';try{gmSfx('tab')}catch(e){}paint();load()});
  if(q('.cd .go'))q('.cd .go').onclick=()=>byCode(q('.cd input').value);if(q('.cd input'))q('.cd input').onkeydown=e=>{e.stopPropagation();if(e.key==='Enter')byCode(e.target.value)};
  if(q('.new'))q('.new').onclick=()=>{S.ed=blank();S.view='edit';S.msg='';paint()};
  qa('canvas[data-b]').forEach(cv=>{const b=S.items[+cv.dataset.b];if(b)still(cv,b,1.9)});
  qa('.bc').forEach(c=>c.onclick=e=>{if(e.target.closest('[data-play]'))return;S.card=S.items[+c.dataset.i];S.view='card';S.fr=null;S.msg='';paint()});
  qa('[data-play]').forEach(b=>b.onclick=e=>{e.stopPropagation();fight(S.items[+b.dataset.play])});
  /* 만들기 */
  if(S.view==='edit'){const d=S.ed;const big=q('canvas.big');if(big)anim(big,d,3.1);qa('canvas[data-bd]').forEach(cv=>still(cv,{body:+cv.dataset.bd,hue:d.hue},.95));
   const ni=q('.nmI input');ni.onkeydown=e=>e.stopPropagation();ni.oninput=()=>{d.name=ni.value;const sv=q('.sv');if(sv)sv.disabled=!(d.atks.length>=3&&d.name.trim().length>=2)};
   qa('[data-body]').forEach(b=>b.onclick=()=>{d.body=+b.dataset.body;paint()});qa('[data-hue]').forEach(b=>b.onclick=()=>{d.hue=+b.dataset.hue;paint()});qa('[data-hp]').forEach(b=>b.onclick=()=>{d.hp=+b.dataset.hp;paint()});
   qa('[data-atk]').forEach(b=>b.onclick=()=>{const a=b.dataset.atk,j=d.atks.indexOf(a);if(j>=0)d.atks.splice(j,1);else if(d.atks.length<6)d.atks.push(a);else{S.msg='공격은 6개까지예요';}try{gmSfx('ok')}catch(e){}const sc=q('.op').scrollTop;paint();const op=box.querySelector('.op');if(op)op.scrollTop=sc});
   qa('[data-rm]').forEach(u=>u.onclick=()=>{d.atks.splice(+u.dataset.rm,1);paint()});
   q('.try').onclick=()=>fight(Object.assign({},d,{name:d.name.trim()||'이름 없는 보스',owner:'나',code:''}));
   q('.sv').onclick=save}
  /* 정보 */
  if(S.view==='card'){const b=S.card,big=q('canvas.big');if(big)anim(big,b,3.3);
   q('.pl1').onclick=()=>fight(b);if(q('.cp'))q('.cp').onclick=()=>{try{navigator.clipboard.writeText(b.code)}catch(e){}toast('코드를 복사했어요 · '+b.code)};
   if(q('.lk'))q('.lk').onclick=async()=>{const r=await api('/api/cboss/like',{code:b.code});if(r.s===200){b.liked=r.j.liked;b.likes=r.j.likes;paint()}else{S.msg=(r.j&&r.j.error)||'';paint()}};
   if(q('.ed1'))q('.ed1').onclick=()=>{S.ed={code:b.code,name:b.name,body:b.body|0,hue:b.hue|0,hp:b.hp|0,atks:(b.atks||[]).filter(a=>ALL.has(a))};S.view='edit';paint()};
   if(q('.del'))q('.del').onclick=async()=>{if(!confirm('「'+b.name+'」을(를) 지울까요? 기록도 함께 사라져요.'))return;await api('/api/cboss/delete',{code:b.code});S.view='mine';paint();load()};
   q('.ch').onclick=async()=>{const r=await api('/api/friends',{});S.fr=r.s===200?(r.j.friends||[]):[];paint()};
   qa('[data-fr]').forEach(f=>f.onclick=async()=>{const r=await api('/api/cboss/challenge',{code:b.code,to:f.dataset.fr});S.msg=r.s===200?'📨 '+r.j.to+'님에게 도전장을 보냈어요 (우편함)':(r.j&&r.j.error)||'보내지 못했어요';S.fr=null;paint()})}}
 async function save(){const d=S.ed;S.msg='저장하는 중…';paint();const r=await api('/api/cboss/save',{code:d.code||undefined,name:d.name.trim(),body:d.body,hue:d.hue,hp:d.hp,atks:d.atks});
  if(r.s!==200){S.msg=(r.j&&r.j.error)||'저장하지 못했어요';paint();return}const b=r.j.boss;b.own=true;S.card=b;S.view='card';S.msg='💾 저장했어요! 코드 '+r.j.code+' 를 친구에게 알려 주세요';try{sfx(880,.1,'triangle',.05,1320)}catch(e){}paint()}
 /* 우편 도전장의 「도전하기」 */
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.cb168');if(!b)return;e.stopPropagation();e.preventDefault();try{$('mail163').hidden=true}catch(_){}openPanel('hot');byCode(b.dataset.cb)},true);
 /* 보스 러시 창에 단추 */
 setInterval(()=>{try{const s=$('gmRush');if(!s||$('be168Open'))return;const b=document.createElement('button');b.id='be168Open';b.className='gmBtn';b.textContent='🛠 보스 만들기';b.onclick=e=>{e.stopPropagation();try{gmSfx('ok')}catch(_){}openPanel('hot')};s.appendChild(b)}catch(e){}},700);

 const st=document.createElement('style');st.textContent=`
 #be168{position:fixed;inset:0;z-index:9300;display:grid;place-items:center;background:#000b;backdrop-filter:blur(3px);color:#eef0f6;font-family:inherit}#be168[hidden]{display:none}
 #be168 .pn{width:min(860px,calc(100vw - 20px));max-height:calc(100vh - 20px);display:flex;flex-direction:column;box-sizing:border-box;padding:12px 14px;border-radius:16px;
  background:radial-gradient(120% 60% at 50% 0%,#3a2414,#120c0a 70%);border:1px solid #ffb04a55;box-shadow:0 20px 60px #000c,0 0 0 1px #000}
 #be168 .hd{display:flex;align-items:center;gap:10px;margin-bottom:8px}#be168 .hd>i{font-style:normal;font-size:22px;width:40px;height:40px;display:grid;place-items:center;border-radius:12px;background:linear-gradient(180deg,#6a3a14,#2a1408);border:1px solid #ffb04a88}
 #be168 .hd b{display:block;font-size:19px;color:#ffd08a;letter-spacing:.04em}#be168 .hd small{font-size:11.5px;color:#c8b49a}
 #be168 .tb{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:8px}#be168 .tb>button{font:inherit;font-weight:900;font-size:13px;padding:7px 12px;border-radius:10px;border:1px solid #ffffff22;background:#1e1612;color:#d8c8b8;cursor:pointer}
 #be168 .tb>button.on{background:linear-gradient(180deg,#ffd08a,#ff9a3a);color:#2a1206;border-color:#ffe0b0}
 #be168 .cd{margin-left:auto;display:flex;gap:4px}#be168 .cd input{width:110px;font:inherit;font-family:ui-monospace,Menlo,monospace;font-weight:900;letter-spacing:.15em;text-transform:uppercase;padding:6px 8px;border-radius:9px;border:1px solid #ffb04a66;background:#0c0806;color:#ffe79a}
 #be168 .cd button,#be168 .sub button,#be168 .cp{font:inherit;font-weight:900;font-size:12px;padding:6px 10px;border-radius:9px;border:0;cursor:pointer;background:#3a2a1e;color:#ffe0b0}
 #be168 .new{font:inherit;font-weight:900;font-size:15px;padding:10px;border-radius:12px;border:2px dashed #ffb04a88;background:#2a1a0e;color:#ffd08a;cursor:pointer;margin-bottom:8px}#be168 .new small{font-size:11px;color:#c8b49a;margin-left:6px}
 #be168 .ls{flex:1;min-height:0;overflow:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:8px;align-content:start}
 #be168 .em{grid-column:1/-1;text-align:center;padding:30px;color:#a8988a}
 #be168 .bc{position:relative;display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:12px;background:linear-gradient(180deg,#22180f,#140e0a);border:1px solid #ffffff16;cursor:pointer}
 #be168 .bc:hover{border-color:#ffb04a88}#be168 .bc.top{border-color:#ffd166aa;box-shadow:0 0 12px #ffd16633}
 #be168 .bc .rk{position:absolute;left:4px;top:3px;font-style:normal;font-weight:900;font-size:11px;color:#2a1206;background:#c8b49a;border-radius:6px;padding:0 5px}#be168 .bc.t0 .rk{background:#ffd166}#be168 .bc.t1 .rk{background:#e0e8f0}#be168 .bc.t2 .rk{background:#e0a070}
 #be168 .bc canvas{width:84px;height:70px;image-rendering:pixelated;flex:none}#be168 .bi{flex:1;min-width:0}#be168 .bi b{display:block;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#be168 .bi small{font-size:10.5px;color:#a8988a}
 #be168 .bs{display:flex;flex-wrap:wrap;gap:3px 8px;font-size:10.5px;color:#d8c8b8;margin-top:2px}
 #be168 .bc .bs em{font-style:normal;font-weight:900;color:#7dffa8}
 #be168 .pl,#be168 .pl1{font:inherit;font-weight:900;font-size:13px;padding:8px 10px;border-radius:10px;border:0;cursor:pointer;background:linear-gradient(180deg,#ffd08a,#ff7a2a);color:#2a0e04;box-shadow:0 0 0 2px #000;flex:none}
 #be168 .sub{display:flex;align-items:center;gap:8px;margin-bottom:8px;font-weight:900;color:#ffd08a}
 #be168 .ed{flex:1;min-height:0;display:grid;grid-template-columns:260px 1fr;gap:10px}
 #be168 .pv{display:flex;flex-direction:column;gap:8px;min-height:0}#be168 canvas.big{width:100%;aspect-ratio:200/160;image-rendering:pixelated;border-radius:12px;background:linear-gradient(180deg,#1a1410,#0a0806);border:1px solid #ffb04a44}
 #be168 .nmI input{width:100%;box-sizing:border-box;font:inherit;font-weight:900;font-size:15px;padding:8px 10px;border-radius:10px;border:1px solid #ffb04a66;background:#0c0806;color:#fff}
 #be168 .sum{display:flex;flex-wrap:wrap;gap:4px 10px;font-size:11.5px;color:#c8b49a}#be168 .sum b{color:#ffe0b0}
 #be168 .ol{display:flex;flex-wrap:wrap;gap:4px}#be168 .ol span{font-size:11.5px;font-weight:800;padding:3px 8px;border-radius:8px;background:#2a1e14;border:1px solid #ffffff1a}#be168 .ol span.sg{background:#4a2a0a;border-color:#ffd16688;color:#ffe79a}
 #be168 .ol u{text-decoration:none;margin-left:5px;cursor:pointer;color:#ff9a8a}#be168 .ol small{color:#a8988a;font-size:11px}
 #be168 .ac{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto}#be168 .ac button{flex:1;font:inherit;font-weight:900;font-size:13px;padding:9px 8px;border-radius:10px;border:0;cursor:pointer;background:#3a2a1e;color:#ffe0b0;white-space:nowrap}
 #be168 .ac .pl1{background:linear-gradient(180deg,#ffd08a,#ff7a2a);color:#2a0e04;box-shadow:0 0 0 2px #000}
 #be168 .ac .sv{background:linear-gradient(180deg,#a6f5c6,#3ad16a);color:#04120c}#be168 .ac .try{background:linear-gradient(180deg,#ffd08a,#ff7a2a);color:#2a0e04}#be168 .ac button:disabled{background:#2a2420;color:#6a5a50;cursor:default}
 #be168 .ac .lk.on{background:#5a1a2a;color:#ffb0c0}#be168 .ac .del{flex:0 0 auto;background:#3a1414;color:#ffb0a0}
 #be168 .op{min-height:0;overflow:auto;padding-right:4px}#be168 h5{margin:6px 0 4px;font-size:12.5px;color:#ffd08a}#be168 h5 small{font-weight:600;color:#a8988a;margin-left:4px}
 #be168 .bd{display:grid;grid-template-columns:repeat(auto-fill,minmax(58px,1fr));gap:4px}#be168 .bd button{padding:2px;border-radius:10px;border:1px solid #ffffff18;background:#140e0a;cursor:pointer}#be168 .bd button.on{border:2px solid #ffd166;background:#3a2410;box-shadow:0 0 10px #ffd16655}
 #be168 .bd canvas{width:100%;aspect-ratio:56/48;image-rendering:pixelated;display:block}
 #be168 .hu{display:flex;flex-wrap:wrap;gap:6px}#be168 .hu button{width:36px;height:36px;border-radius:50%;border:2px solid #000;cursor:pointer;background:linear-gradient(135deg,var(--c) 50%,var(--c2) 50%);font:inherit;font-size:9px;font-weight:900;color:#000c;box-shadow:0 0 0 1px #ffffff33}
 #be168 .hu button.on{box-shadow:0 0 0 3px #fff,0 0 12px var(--c)}
 #be168 .hp{display:flex;gap:4px;flex-wrap:wrap}#be168 .hp button{flex:1;min-width:60px;font:inherit;font-weight:900;font-size:12px;padding:6px 4px;border-radius:9px;border:1px solid #ffffff1a;background:#1e1612;color:#d8c8b8;cursor:pointer;display:flex;flex-direction:column;align-items:center}
 #be168 .hp button small{font-size:9.5px;opacity:.7}#be168 .hp button.on{background:linear-gradient(180deg,#ff9a7a,#d03a2a);color:#fff;border-color:#ffc0a0}
 #be168 .pg{margin-bottom:6px}#be168 .pg>i{display:block;font-style:normal;font-size:11px;color:#a8988a;margin-bottom:3px}#be168 .pg>div{display:flex;flex-wrap:wrap;gap:4px}
 #be168 .pg button{font:inherit;font-size:11.5px;font-weight:800;padding:5px 8px;border-radius:8px;border:1px solid #ffffff1a;background:#1a1410;color:#d8c8b8;cursor:pointer}#be168 .pg button.on{background:linear-gradient(180deg,#ffe0a0,#ffb040);color:#2a1206;border-color:#fff0c0}
 #be168 .cv{flex:1;min-height:0;overflow:auto;display:grid;grid-template-columns:260px 1fr;gap:12px;align-items:start}#be168 .ci{display:flex;flex-direction:column;gap:8px}#be168 .ci>b{font-size:22px;color:#ffe0b0}#be168 .ci>small{color:#c8b49a}#be168 .ci em{font-style:normal;font-family:ui-monospace,Menlo,monospace;font-weight:900;color:#ffe79a;letter-spacing:.1em}
 #be168 .ci .bs{font-size:12px}#be168 .bst{font-size:12px;padding:7px 10px;border-radius:10px;background:#1e1612;border:1px solid #ffd16644;color:#ffe0b0}
 #be168 .fr{display:flex;flex-wrap:wrap;gap:4px;padding:8px;border-radius:10px;background:#140e0a;border:1px dashed #ffffff22}#be168 .fr button{font:inherit;font-weight:800;font-size:12px;padding:5px 10px;border-radius:8px;border:0;background:#2a3a4a;color:#dfefff;cursor:pointer}#be168 .fr i{display:inline-block;width:7px;height:7px;border-radius:50%;background:#7dffa8}
 #be168 .tip{font-size:11px;color:#a8988a}#be168 .msg{min-height:16px;margin-top:6px;text-align:center;font-size:12px;color:#ffe79a}
 .be168r{display:flex;flex-direction:column;align-items:center;gap:6px}.be168r canvas{width:140px;height:110px;image-rendering:pixelated}.be168r>b{font-size:20px;color:#ffe0b0}.be168r>small{opacity:.75}
 .be168r .rs{display:flex;gap:10px;font-size:12px}.be168r .rs b{color:#fff}.be168r .g{padding:6px 12px;border-radius:10px;background:#2a2410;color:#ffe79a;font-weight:900}.be168r .g.l{background:#2a0e14;color:#ff9aaa}.be168r .g.rc{background:#2a1a3a;color:#e0c0ff}.be168r .st{font-size:11.5px;opacity:.8}
 #mail163 .cb168{display:inline-block;margin:4px 0;font:inherit;font-weight:900;font-size:12px;padding:6px 10px;border-radius:9px;border:0;cursor:pointer;background:linear-gradient(180deg,#ffd08a,#ff7a2a);color:#2a0e04}
 @media (max-width:700px){#be168 .ed,#be168 .cv{grid-template-columns:1fr}#be168 .ed{overflow:auto}#be168 .op{overflow:visible}#be168 .pv canvas.big{max-height:150px;object-fit:contain}#be168 .ls{grid-template-columns:1fr}}
 html.lpL #be168 .ed{grid-template-columns:200px 1fr}html.lpL #be168 .cv{grid-template-columns:200px 1fr}html.lpL #be168 .pn{padding:8px 10px}`;document.head.appendChild(st);
 window.BE168={open:openPanel,close:closePanel,fight,swapIn,swapOut,POOL,CE,S};
}catch(e){console.error('v168 boss maker',e)}})();
