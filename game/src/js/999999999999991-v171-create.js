/* ================= v171 만들기 · 나누기 — 「🎨 작업실」 (CR171) =================
   ☰ 메뉴 「🎨 작업실」로 연다. 탭 7개:
   - 내 층(83): 구역 색 · 잡몹 무리(기본 14종 + 내 잡몹, 최대 8줄 × 1~8마리) · 동시에 나오는 수 · 체력 배율 · 곡(내 음악)을 골라 저장 → 코드 6자리(/api/ugc/map/*).
     싸움은 탑 1층을 열고(TW71.start(1)) 그 층의 소환 줄(T.queue) · 구역 색(T.pal)을 바꿔 끼움. 다 잡으면(T.clear) 문 대신 결과창, 쓰러지면 결과창.
     탑 진행(saveData.tw71.floor · best)은 시작 전에 적어 두었다가 되돌린다(층 1을 쓰므로). 스피드런(CP170)은 window.__nosr로 건너뜀.
   - 음악(84): 16칸 × (킥 · 스네어 · 하이햇 · 박수 · 멜로디 · 베이스) 찍기, 빠르기 · 조 · 음계 · 악기. saveData.songs171(8곡). 층에 곡을 넣으면 그 층에서 연주하고
     박자 판정(mus.ms · mus.T0)도 그 곡에 맞춤.
   - 내 잡몹(86): 바탕 잡몹 · 색(hue-rotate) · 크기(m.s) · 체력 · 정예 · 이름. saveData.mobs171(12마리). 층에 넣으면 정의가 층 데이터에 함께 저장됨.
     그리기는 TPET106.list 감싸기에서 해당 잡몹 칸만 색 필터 + 이름표.
   - 도전 과제(87): 보스(1·2장 20명) · 난이도 · 규칙(대시 금지 · 패링 금지 · 필살기 금지 · 한 대도 안 맞기 · 시간 제한) → 코드(/api/ugc/chal/*).
     싸움은 startRush + G.ch171, 금지 행동은 doDash · tryParry · tryUlt 감싸기에서 막음, 어기면(맞음 · 시간 초과) 바로 실패.
   - 게시판(88): 60자 글 + 16×16 도트 그림(8색), 좋아요 · 지우기 · 신고(/api/board/*).
   - 이달의 작품(89): 이달 받은 좋아요 순 보스 · 층 · 도전 과제 TOP 5(/api/works/month), 지난달 1~3위는 서버가 우편 보상.
   - 하이라이트(90): 보스전을 멋지게 이기면(노데미지 · 2대 이하 · 리그 · 만든 보스) 마지막 순간(HL 하이라이트 그림)을 자동으로 기기에 저장(IndexedDB 20개) → 다시 보기 · GIF 저장. */
(()=>{try{
 if(!window.TW71)return;
 const $=id=>document.getElementById(id),esc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const api=(p,b)=>window.DUO85&&DUO85.api?DUO85.api(p,b?'POST':'GET',b):Promise.resolve({s:0,j:{}});
 const acc=()=>{try{return DUO85.acc()}catch(e){return {}}};
 const num=v=>Number(v||0).toLocaleString(),fmt=ms=>{const s=Math.floor(ms/1000);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')+'.'+String(Math.floor(ms%1000/10)).padStart(2,'0')};
 const toast=t=>{try{window.MR163&&MR163.toast?MR163.toast(t):banner(t)}catch(e){}};
 const sfxOk=()=>{try{gmSfx('ok')}catch(e){}};
 const DN={easy:'쉬움',normal:'보통',hard:'어려움',extreme:'익스트림'};
 const SPK=['slime','bat','archer','boar','gear','mage','bomb','golem','wisp','drone','spider','knight','toad','wraith'];
 const spName=k=>{try{return TW71.SP[k].n}catch(e){return k}};
 const ZP=()=>TW71.ZPAL||[];
 const HUES=[0,40,80,120,160,200,240,280,320],SIZES=[.8,1,1.2,1.5],HPM=[.5,1,2,3];
 const uid=()=>Math.random().toString(36).slice(2,8);

 /* ================= 잡몹 그림(미리보기 · 싸움) ================= */
 function mobImg(sp,theme,elite,fi,view){try{const pal=TW71.mpal(sp,ZP()[theme|0]||ZP()[0]);return TW71.mobFrame(sp,pal,!!elite,view||'front','i',fi|0)}catch(e){return null}}
 function drawMobPrev(o,def,theme,x,y,sc,t){const img=mobImg(def.sp,theme,def.elite,Math.floor(t/250)%4);if(!img)return;o.save();o.imageSmoothingEnabled=false;const h=HUES[def.hue|0]||0;if(h)try{o.filter='hue-rotate('+h+'deg)'}catch(e){}
  const k=sc*(def.size||1)*(def.elite?1.3:1)/3;o.drawImage(img,x-60*k,y-105*k,120*k,120*k);o.restore()}

 /* ================= 음악(16칸 찍기) ================= */
 const SCALES={maj:[0,2,4,5,7,9,11,12],min:[0,2,3,5,7,8,10,12],pen:[0,2,4,7,9,12,14,16]},SCN={maj:'장조(밝게)',min:'단조(어둡게)',pen:'5음(동양풍)'};
 const ROOTS=['도','도#','레','레#','미','파','파#','솔','솔#','라','라#','시'],LEADS=[['chip','칩'],['lead','리드'],['pluck','튕김'],['bell','벨'],['flute','피리'],['brass','금관']],BASSES=[['sub','묵직'],['reese','윙윙'],['pizz','통통'],['pluck','튕김']];
 const DR=[['k','킥','kick'],['s','스네어','snare'],['h','하이햇','hat'],['c','박수','clap']];
 const newSong=()=>({id:uid(),name:'내 곡',bpm:120,root:0,scale:'min',lead:'chip',bass:'sub',k:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],s:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],h:[0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,1],c:new Array(16).fill(0),
  m:[0,-1,2,-1,4,-1,2,-1,5,-1,4,-1,2,-1,1,-1],b:[0,-1,-1,-1,0,-1,-1,-1,3,-1,-1,-1,4,-1,-1,-1]});
 const songs=()=>saveData.songs171||(saveData.songs171=[]);
 const SEQ={on:false,song:null,step:0,next:0,iv:0};
 function seqPlay(i,at){const S=SEQ.song;if(!S||typeof sound!=='undefined'&&!sound)return;try{for(const [k,,kind] of DR)if(S[k]&&S[k][i])perc(kind,at,kind==='hat'?.5:.85);
  const sc=SCALES[S.scale]||SCALES.min,st=60/S.bpm/4;if(S.m[i]>=0)voice(S.lead||'chip',60+S.root+sc[S.m[i]],st*1.7,.45,at);if(S.b[i]>=0)voice(S.bass||'sub',36+S.root+sc[S.b[i]],st*1.6,.55,at)}catch(e){}}
 function seqStart(S,forFight){seqStop();try{initAudio()}catch(e){}if(typeof audio==='undefined'||!audio)return;SEQ.song=S;SEQ.on=true;SEQ.step=0;const st=60/S.bpm/4;SEQ.next=audio.currentTime+.12;
  SEQ.iv=setInterval(()=>{if(!SEQ.on)return;while(SEQ.next<audio.currentTime+.25){seqPlay(SEQ.step%16,SEQ.next);SEQ.step++;SEQ.next+=st}},40);
  if(forFight){try{stopMusic()}catch(e){}try{mus.on=false;mus.ms=60000/S.bpm;mus.T0=performance.now()+120}catch(e){}}}
 function seqStop(){SEQ.on=false;clearInterval(SEQ.iv);SEQ.iv=0}

 /* ================= 내 층 놀이 ================= */
 const CM={on:false,it:null,t0:0,cq:[],n:0,done:false,save:null,hits:0};
 const mobs=()=>saveData.mobs171||(saveData.mobs171=[]);
 function expand(d){const out=[];for(const r of (d.list||[]).slice(0,8)){const def=r.k&&r.k.startsWith('cm:')?(d.mobs||{})[r.k]:null;const sp=def?def.sp:r.k;if(!TW71.SP[sp])continue;
   for(let j=0;j<Math.max(1,Math.min(8,r.n|0));j++)out.push({sp,elite:def?!!def.elite:!!r.el,def})}return out.sort(()=>Math.random()-.5).slice(0,40)}
 function playMap(it){const d=it.data||{},list=expand(d);if(!list.length){toast('잡몹을 한 줄 이상 넣어 주세요');return}closePanel();try{$('overlay').hidden=true}catch(e){}
  CM.save=(()=>{try{const s=saveData.tw71||{};return {floor:s.floor,best:s.best}}catch(e){return null}})();
  window.__nosr=1;try{TW71.start(1)}finally{window.__nosr=0}
  const T=TW71.T,th=Math.max(0,Math.min(ZP().length-1,d.theme|0)),hpk=HPM[d.hp|0]||1;T.pal=ZP()[th];T.z=th*10;T.vets=[];
  T.queue=list.map(q=>({sp:q.sp,elite:q.elite,hp:Math.round(TW71.SP[q.sp].hp*hpk*(q.def?(HPM[q.def.hp|0]||1):1)*(q.elite?3.5:1)*(1+th*.25))}));
  CM.cq=list.map(q=>q.def||null);CM.n=0;T.total=T.queue.length;T.cap=Math.max(1,Math.min(6,d.cap|0||3));T.nextSpawn=.8;
  T.trans={t:0,txt:it.name,sub:'만든 이 '+(it.owner||'나')+' · 잡몹 '+T.total+'마리'};
  Object.assign(CM,{on:true,it,t0:performance.now(),done:false,hits:0});try{$('bvTitle').textContent='BEAT BLADE · 만든 층 '+(it.code||'시험')}catch(e){}
  if(d.song&&d.song.k)seqStart(d.song,true)}
 function endMap(won){if(CM.done)return;CM.done=true;seqStop();const it=CM.it,ms=Math.round(performance.now()-CM.t0),T=TW71.T;
  try{const s=saveData.tw71;if(s&&CM.save){s.floor=CM.save.floor;s.best=CM.save.best;saveNow()}}catch(e){}
  try{stopMusic()}catch(e){}try{T.dead=true}catch(e){}
  (async()=>{let res=null;if(it.code&&acc().token){const r=await api('/api/ugc/map/result',{code:it.code,win:won,ms});if(r.s===200)res=r.j;if(res&&res.gold)try{PVP92.ledger()}catch(e){}}
   const b=(res&&res.item)||it;
   const html='<div class="cr171r"><b>'+esc(it.name)+'</b><small>만든 이 '+esc(it.owner||'나')+(it.code?' · 코드 '+esc(it.code):' · 시험')+'</small><div class="rs"><span>시간 <b>'+fmt(ms)+'</b></span><span>잡은 수 <b>'+((T&&T.kills)||0)+'</b></span></div>'+
    (won&&res&&res.first?'<div class="g">🎉 처음 깼어요!'+(res.gold?' 🪙 +'+res.gold:'')+'</div>':'')+(res&&res.record?'<div class="g">🏆 이 층 최고 기록!</div>':'')+
    (it.code?'<div class="st">도전 '+num(b.plays)+' · 깬 사람 '+num(b.clears)+' · ♥ '+num(b.likes)+(b.best_ms?' · 최고 '+fmt(b.best_ms)+' ('+esc(b.best_name)+')':'')+'</div>':'')+'</div>';
   const btns=[['↺ 다시',()=>{$('overlay').hidden=true;playMap(it)},!won]];if(it.code&&!it.own)btns.push(['♡ 좋아요',async()=>{const r=await api('/api/ugc/map/like',{code:it.code});if(r.s===200)toast(r.j.liked?'♥ 좋아요!':'좋아요를 취소했어요')},false]);
   btns.push(['🎨 작업실',()=>{$('overlay').hidden=true;try{toLobby()}catch(e){}setTimeout(()=>openPanel('map'),200)},won],['로비로',()=>{try{toLobby()}catch(e){}},false]);
   try{showOverlay('MY FLOOR',won?'층 정복!':'쓰러졌어요',html,btns)}catch(e){}})()}
 {const f=toLobby;toLobby=function(){if(CM.on){CM.on=false;seqStop();try{const s=saveData.tw71;if(s&&CM.save&&!CM.done){s.floor=CM.save.floor;s.best=CM.save.best}}catch(e){}}if(CH.on)chEndClean();return f.apply(this,arguments)}}
 {const f=frame;frame=function(){const r=f.apply(this,arguments);try{if(CM.on&&mode==='tower'){const T=TW71.T;
   for(const m of T.mobs){if(m._c171)continue;m._c171=1;const def=CM.cq[CM.n++];if(def){m.cm=def;m.s=(def.size||1)*(m.elite?1.5:1)}}
   if(!CM.done){T.doorK=0;if(T.clear)endMap(true);else if(T.dead)endMap(false)}}
  else if(CM.on&&mode!=='tower'){CM.on=false;seqStop()}}catch(e){console.error('cr171',e)}return r}}
 /* 내 잡몹 색 · 이름표 */
 if(window.TPET106&&TPET106.list){const f=TPET106.list;TPET106.list=function(L,now){try{if(CM.on&&mode==='tower'){const T=TW71.T;for(let i=0;i<T.mobs.length&&i<L.length;i++){const m=T.mobs[i];if(!m.cm||L[i]._c)continue;const fn=L[i].fn,d=m.cm;L[i]._c=1;
    L[i].fn=()=>{const c=ctx;c.save();const h=HUES[d.hue|0]||0;if(h)try{c.filter='hue-rotate('+h+'deg)'}catch(e){}try{fn()}finally{c.restore()}if(d.name&&m.hp>0){c.save();c.font='900 6px sans-serif';c.textAlign='center';c.fillStyle='#000';c.fillText(d.name,m.x+.5,m.y-20*(m.s||1)+.5);c.fillStyle=d.elite?'#ffd166':'#e8f4ff';c.fillText(d.name,m.x,m.y-20*(m.s||1));c.restore()}}}}}catch(e){}return f.apply(this,arguments)}}

 /* ================= 도전 과제 ================= */
 const RULES=[['nodash','🚫💨 대시 금지'],['noparry','🚫🛡 패링 금지'],['noult','🚫💥 필살기 금지'],['nohit','💔 한 대도 안 맞기']],TLIM=[0,60,90,120,180];
 const CH={on:false,it:null,d:null,diff0:null,warn:0,t0:0};
 function playChal(it){const d=it.data||{};closePanel();try{$('overlay').hidden=true}catch(e){}CH.diff0=diff;try{if(d.diff&&d.diff!==diff){$('diffSel').value=d.diff;updDiff()}}catch(e){}
  Object.assign(CH,{on:true,it,d,warn:0,t0:0});try{startRush(d.boss|0)}catch(e){console.error(e)}try{G.ch171=d;$('bvTitle').textContent='BEAT BLADE · 도전 과제 '+(it.code||'시험')}catch(e){}}
 function chEndClean(){CH.on=false;try{if(CH.diff0&&CH.diff0!==diff){$('diffSel').value=CH.diff0;updDiff()}}catch(e){}}
 const ruleOn=k=>CH.on&&mode==='boss'&&G&&G.ch171&&G.ch171.rules&&G.ch171.rules[k];
 const deny=t=>{const now=performance.now();if(now-CH.warn>900){CH.warn=now;toast(t+' — 이 도전에서는 못 써요')}};
 {const f=doDash;doDash=function(){if(ruleOn('nodash')){deny('🚫 대시');return}return f.apply(this,arguments)}}
 if(typeof tryParry==='function'){const f=tryParry;tryParry=function(){if(ruleOn('noparry')){deny('🚫 패링');return}return f.apply(this,arguments)}}
 if(typeof tryUlt==='function'){const f=tryUlt;tryUlt=function(){if(ruleOn('noult')){deny('🚫 필살기');return}return f.apply(this,arguments)}}
 {const f=drawScene;drawScene=function(now){const r=f.apply(this,arguments);try{if(CH.on&&mode==='boss'&&G&&G.ch171&&G.state==='play'){const d=G.ch171;if(!CH.t0)CH.t0=performance.now();const el=performance.now()-CH.t0;
   if(d.rules&&d.rules.nohit&&(G.hits|0)>0){CH.why='한 대 맞았어요';fightEnd(false)}
   else if(d.time&&el>d.time*1000){CH.why='시간이 다 됐어요';fightEnd(false)}
   const tx='🎯 '+(d.time?'남은 시간 '+Math.max(0,Math.ceil(d.time-el/1000))+'초 · ':'')+RULES.filter(([k])=>d.rules&&d.rules[k]).map(x=>x[1].replace(/^\S+ /,'')).join(' · ');
   const c=ctx;c.save();try{c.setTransform(SS,0,0,SS,0,0)}catch(e){}c.font='bold 8px sans-serif';const w=c.measureText(tx).width+12;c.globalAlpha=.85;c.fillStyle='#1a0a24';c.fillRect(W/2-w/2,AY+30,w,13);c.globalAlpha=1;c.fillStyle='#ffb0f0';c.textAlign='center';c.fillText(tx,W/2,AY+39);c.restore()}}catch(e){}return r}}
 if(typeof fightEnd==='function'){const f=fightEnd;fightEnd=function(won){const was=G&&G.state;
  if(G&&G.ch171&&CH.on&&was!=='result'){chalEnd(!!won);return}
  const r=f.apply(this,arguments);try{if(G&&was!=='result'&&G.state==='result'&&won)autoHL()}catch(e){}return r}}
 async function chalEnd(won){G.state='result';G.won=won;try{stopMusic()}catch(e){}const it=CH.it,ms=Math.round(performance.now()-(CH.t0||performance.now())),why=CH.why||'';CH.why='';chEndClean();
  let res=null;if(it.code&&acc().token){const r=await api('/api/ugc/chal/result',{code:it.code,win:won,ms});if(r.s===200)res=r.j;if(res&&res.gold)try{PVP92.ledger()}catch(e){}}
  const d=it.data||{},b=(res&&res.item)||it;
  const html='<div class="cr171r"><b>'+esc(it.name)+'</b><small>'+esc((BOSSES[d.boss|0]||{}).name||'')+' · '+DN[d.diff]+' · 만든 이 '+esc(it.owner||'나')+'</small><div class="rl">'+ruleTags(d)+'</div>'+
   '<div class="rs"><span>시간 <b>'+fmt(ms)+'</b></span><span>맞은 횟수 <b>'+(G.hits|0)+'</b></span></div>'+(why?'<div class="g l">'+esc(why)+'</div>':'')+
   (won&&res&&res.first?'<div class="g">🎉 도전 성공!'+(res.gold?' 🪙 +'+res.gold:'')+'</div>':won?'<div class="g">🎯 도전 성공!</div>':'')+(it.code?'<div class="st">도전 '+num(b.plays)+' · 성공 '+num(b.clears)+' · ♥ '+num(b.likes)+'</div>':'')+'</div>';
  const btns=[['↺ 다시',()=>{$('overlay').hidden=true;playChal(it)},!won]];if(it.code&&!it.own)btns.push(['♡ 좋아요',async()=>{const r=await api('/api/ugc/chal/like',{code:it.code});if(r.s===200)toast(r.j.liked?'♥ 좋아요!':'좋아요를 취소했어요')},false]);
  btns.push(['🎨 작업실',()=>{$('overlay').hidden=true;try{toLobby()}catch(e){}setTimeout(()=>openPanel('chal'),200)},won],['로비로',()=>{try{toLobby()}catch(e){}},false]);
  try{showOverlay('CHALLENGE',won?'도전 성공!':'도전 실패',html,btns)}catch(e){}}
 const ruleTags=d=>RULES.filter(([k])=>d.rules&&d.rules[k]).map(x=>'<span>'+x[1]+'</span>').join('')+(d.time?'<span>⏱ '+d.time+'초 안에</span>':'');

 /* ================= 하이라이트 앨범(IndexedDB) ================= */
 const HDB={db:null};
 function idb(){return new Promise(res=>{if(HDB.db)return res(HDB.db);try{const q=indexedDB.open('bb-hl171',1);q.onupgradeneeded=()=>{q.result.createObjectStore('c',{keyPath:'id'})};q.onsuccess=()=>{HDB.db=q.result;res(HDB.db)};q.onerror=()=>res(null)}catch(e){res(null)}})}
 async function hlAll(){const db=await idb();if(!db)return [];return new Promise(res=>{try{const q=db.transaction('c').objectStore('c').getAll();q.onsuccess=()=>res((q.result||[]).sort((a,b)=>b.at-a.at));q.onerror=()=>res([])}catch(e){res([])}})}
 async function hlPut(o){const db=await idb();if(!db)return;try{db.transaction('c','readwrite').objectStore('c').put(o)}catch(e){}const all=await hlAll();for(const x of all.slice(20))hlDel(x.id)}
 async function hlDel(id){const db=await idb();if(!db)return;try{db.transaction('c','readwrite').objectStore('c').delete(id)}catch(e){}}
 function autoHL(){try{if(typeof hlList!=='function')return;const won=G.won!==false,hits=G.hits|0,lab=G.lg170?'주간 리그':G.ce168?'만든 보스':hits===0?'노데미지':hits<=2?'거의 안 맞음':null;if(!won||!lab)return;
   const L=hlList();if(L.length<10)return;const pick=L.slice(-40).filter((f,i,a)=>i%2===0||f.dying),frames=[];
   const c=document.createElement('canvas');c.width=240;c.height=150;const x=c.getContext('2d');for(const f of pick){x.drawImage(f.c,0,0,240,150);frames.push(c.toDataURL('image/jpeg',.7))}
   hlPut({id:'h'+Date.now(),at:Date.now(),label:lab,boss:(G.B&&G.B.name)||'',score:G.score|0,hits,frames});toast('🎬 하이라이트를 앨범에 저장했어요 (작업실)')}catch(e){}}

 /* ================= 창 ================= */
 const box=document.createElement('div');box.id='cr171';box.hidden=true;document.body.appendChild(box);box.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===box)closePanel()});
 const V={tab:'map',by:'hot',items:[],msg:'',ed:null,card:null,busy:0,song:null,mob:null,board:null,art:null,pen:1,works:null,hl:null,play:null};
 const TABS=[['map','🗺','내 층'],['music','🎵','음악'],['mob','👾','내 잡몹'],['chal','🎯','도전 과제'],['board','📌','게시판'],['works','🎨','이달의 작품'],['hl','🎬','하이라이트']];
 function openPanel(t){if(t)V.tab=t;box.hidden=false;V.msg='';V.ed=null;V.card=null;paint();load()}
 function closePanel(){box.hidden=true;seqStop()}
 async function load(){const t=V.tab;if(t==='map'||t==='chal'){if(V.ed||V.card)return;V.busy=1;paint();const r=await api('/api/ugc/'+t+'/list',{by:V.by});V.busy=0;V.items=r.s===200?r.j.items:[];if(r.s!==200)V.msg=(r.j&&r.j.error)||'서버에 연결할 수 없어요'}
  else if(t==='board'){const r=await api('/api/board/list',{});V.board=r.s===200?r.j.posts:[]}
  else if(t==='works'){const r=await api('/api/works/month',{});V.works=r.s===200?r.j:null}
  else if(t==='hl'){V.hl=await hlAll()}
  if(V.tab===t)paint()}
 async function byCode(kind,code){code=String(code||'').trim().toUpperCase();if(!/^[A-Z0-9]{6}$/.test(code)){V.msg='코드 6자리를 넣어 주세요';paint();return}
  const r=await api('/api/ugc/'+kind+'/list',{by:'code',code});if(r.s===200&&r.j.items[0]){V.card=r.j.items[0];V.msg=''}else V.msg=(r.j&&r.j.error)||'그 코드가 없어요';paint()}
 const listBar=k=>'<div class="lb">'+[['hot','🔥 인기'],['new','✨ 새것'],['mine','🛠 내 것']].map(([b,n])=>'<button data-by="'+b+'" class="'+(V.by===b?'on':'')+'">'+n+'</button>').join('')+
  '<div class="cd"><input maxlength="6" placeholder="코드"><button data-code="'+k+'">찾기</button></div><button class="new" data-new="'+k+'">＋ 새로 만들기</button></div>';
 const statLine=b=>'<span>♥ '+num(b.likes)+'</span><span>도전 '+num(b.plays)+'</span><span>깬 사람 '+num(b.clears)+'</span>'+(b.best_ms?'<span>최고 '+fmt(b.best_ms)+'</span>':'');
 /* ----- 내 층 ----- */
 const blankMap=()=>({name:'',data:{theme:0,hp:1,cap:3,list:[{k:'slime',n:4},{k:'bat',n:2}],mobs:{},song:null}});
 function mapCard(it,i){const d=it.data||{},n=(d.list||[]).reduce((a,r)=>a+(r.n|0),0);return '<div class="ic" data-i="'+i+'"><canvas width="84" height="60" data-mp="'+i+'"></canvas><div class="ii"><b>'+esc(it.name)+'</b><small>'+esc(it.owner)+' · '+((ZP()[d.theme|0]||{}).n||'')+' 구역 · '+n+'마리'+(d.song?' · 🎵':'')+'</small><div class="bs">'+(it.cleared?'<em>✔</em>':'')+statLine(it)+'</div></div><button class="pl" data-play="'+i+'">도전 ▶</button></div>'}
 function mapEdit(){const e=V.ed,d=e.data,mine=mobs(),sl=songs();
  const kinds=SPK.map(k=>['k:'+k,spName(k)]).concat(mine.map(m=>['cm:'+m.id,'★ '+m.name]));
  return '<div class="ed"><div class="pv"><canvas width="240" height="150" class="big"></canvas><input class="nm" maxlength="14" placeholder="층 이름 (2~14자)" value="'+esc(e.name)+'">'+
   '<div class="ac"><button class="try">⚔ 시험해 보기</button><button class="sv">💾 '+(e.code?'고친 것 저장':'저장하고 코드 받기')+'</button></div></div>'+
   '<div class="op"><h5>구역 색</h5><div class="th">'+ZP().map((z,i)=>'<button data-th="'+i+'" class="'+((d.theme|0)===i?'on':'')+'" style="--a:'+z.a+';--b:'+z.fl+';--c:'+z.c+'">'+esc(z.n)+'</button>').join('')+'</div>'+
   '<h5>잡몹 무리 <small>최대 8줄 · 한 줄에 1~8마리 · 모두 40마리까지</small></h5><div class="rows">'+d.list.map((r,i)=>'<div class="rw"><select data-rk="'+i+'">'+kinds.map(([v,n])=>'<option value="'+v+'"'+((r.k.startsWith('cm:')?'cm:'+r.k.slice(3):'k:'+r.k)===v?' selected':'')+'>'+esc(n)+'</option>').join('')+'</select>'+
     '<button data-rn="'+i+'|-1">−</button><b>'+r.n+'마리</b><button data-rn="'+i+'|1">＋</button>'+(r.k.startsWith('cm:')?'':'<label><input type="checkbox" data-re="'+i+'"'+(r.el?' checked':'')+'>정예</label>')+'<button data-rd="'+i+'">✕</button></div>').join('')+
     (d.list.length<8?'<button class="add" data-radd="1">＋ 줄 더하기</button>':'')+'</div>'+
   '<h5>체력 · 동시에 나오는 수</h5><div class="ch">'+HPM.map((h,i)=>'<button data-hp="'+i+'" class="'+((d.hp|0)===i?'on':'')+'">×'+h+'</button>').join('')+'<span class="sep"></span>'+[1,2,3,4,5,6].map(n=>'<button data-cap="'+n+'" class="'+((d.cap|0||3)===n?'on':'')+'">'+n+'마리</button>').join('')+'</div>'+
   '<h5>곡 <small>「음악」 탭에서 만든 곡</small></h5><div class="ch"><button data-sg="" class="'+(!d.song?'on':'')+'">구역 기본 곡</button>'+sl.map(s=>'<button data-sg="'+s.id+'" class="'+(d.song&&d.song.id===s.id?'on':'')+'">🎵 '+esc(s.name)+'</button>').join('')+'</div></div></div>'}
 function mapCardView(){const it=V.card,d=it.data||{};return '<div class="cv"><canvas width="240" height="150" class="big"></canvas><div class="ci"><b>'+esc(it.name)+'</b><small>만든 이 '+esc(it.owner)+' · 코드 <em>'+esc(it.code)+'</em></small><div class="bs">'+statLine(it)+'</div>'+
  '<div class="ml">'+(d.list||[]).map(r=>{const def=r.k.startsWith('cm:')?(d.mobs||{})[r.k]:null;return '<span>'+(def?'★ '+esc(def.name):esc(spName(r.k))+(r.el?' 정예':''))+' ×'+r.n+'</span>'}).join('')+'</div>'+(d.song?'<div class="ml"><span>🎵 '+esc(d.song.name)+' · ♩'+d.song.bpm+'</span></div>':'')+
  '<div class="ac"><button class="pl1">⚔ 도전하기</button>'+(it.own?'<button class="ed1">✏ 고치기</button><button class="del">🗑</button>':'<button class="lk">'+(it.liked?'♥ 좋아요':'♡ 좋아요')+'</button>')+'<button class="cp">📋 코드 복사</button></div></div></div>'}
 /* ----- 음악 ----- */
 function musicHtml(){const L=songs();if(!V.song)V.song=L[0]?JSON.parse(JSON.stringify(L[0])):newSong();const S=V.song,sc=SCALES[S.scale]||SCALES.min;
  const cell=(r,i,v,lab)=>'<button class="c'+(v?' on':'')+(i%4===0?' b4':'')+(SEQ.on&&SEQ.song===S&&SEQ.step%16===i?' now':'')+'" data-cell="'+r+'|'+i+'">'+(lab!=null?lab:'')+'</button>';
  return '<div class="mu"><div class="mt"><select data-song>'+L.map(s=>'<option value="'+s.id+'"'+(s.id===S.id?' selected':'')+'>'+esc(s.name)+'</option>').join('')+(L.some(s=>s.id===S.id)?'':'<option selected>(새 곡)</option>')+'</select>'+
   '<button data-snew="1">＋ 새 곡</button><input class="snm" maxlength="10" value="'+esc(S.name)+'"><button class="go" data-splay="1">'+(SEQ.on?'⏹ 멈추기':'▶ 들어 보기')+'</button><button class="sv" data-ssave="1">💾 저장</button>'+(L.some(s=>s.id===S.id)?'<button data-sdel="1">🗑</button>':'')+'</div>'+
   '<div class="mo"><label>빠르기 <input type="range" min="70" max="190" value="'+S.bpm+'" data-bpm><b>♩'+S.bpm+'</b></label><label>조 <select data-root>'+ROOTS.map((n,i)=>'<option value="'+i+'"'+(S.root===i?' selected':'')+'>'+n+'</option>').join('')+'</select></label>'+
    '<label>음계 <select data-scale>'+Object.keys(SCALES).map(k=>'<option value="'+k+'"'+(S.scale===k?' selected':'')+'>'+SCN[k]+'</option>').join('')+'</select></label>'+
    '<label>멜로디 <select data-lead>'+LEADS.map(([k,n])=>'<option value="'+k+'"'+(S.lead===k?' selected':'')+'>'+n+'</option>').join('')+'</select></label><label>베이스 <select data-bass>'+BASSES.map(([k,n])=>'<option value="'+k+'"'+(S.bass===k?' selected':'')+'>'+n+'</option>').join('')+'</select></label></div>'+
   '<div class="grid">'+DR.map(([k,n])=>'<div class="gr"><i>'+n+'</i>'+S[k].map((v,i)=>cell(k,i,v)).join('')+'</div>').join('')+
    '<div class="gr me"><i>멜로디</i>'+S.m.map((v,i)=>cell('m',i,v>=0,v>=0?v+1:'')).join('')+'</div><div class="gr ba"><i>베이스</i>'+S.b.map((v,i)=>cell('b',i,v>=0,v>=0?v+1:'')).join('')+'</div></div>'+
   '<p class="tip">💡 북 칸은 눌러서 켜고 끄기 · 멜로디 · 베이스 칸은 누를 때마다 음 높이가 1 → 8 → 끔으로 바뀌어요(오른쪽 버튼 클릭 · 길게 누르면 끔). 저장한 곡은 「내 층」에서 고를 수 있어요.</p></div>'}
 /* ----- 내 잡몹 ----- */
 function mobHtml(){const L=mobs();if(!V.mob)V.mob=L[0]?JSON.parse(JSON.stringify(L[0])):{id:uid(),name:'내 잡몹',sp:'slime',hue:0,size:1,hp:1,elite:false};const m=V.mob;
  return '<div class="mb"><div class="mbl">'+L.map(x=>'<button data-mob="'+x.id+'" class="'+(x.id===m.id?'on':'')+'"><canvas width="48" height="44" data-mc="'+x.id+'"></canvas><small>'+esc(x.name)+'</small></button>').join('')+(L.length<12?'<button data-mnew="1" class="nw">＋</button>':'')+'</div>'+
   '<div class="ed"><div class="pv"><canvas width="200" height="150" class="big"></canvas><input class="nm" maxlength="8" placeholder="이름 (8자)" value="'+esc(m.name)+'"><div class="ac"><button class="sv" data-msave="1">💾 저장</button>'+(L.some(x=>x.id===m.id)?'<button data-mdel="1">🗑 지우기</button>':'')+'</div></div>'+
   '<div class="op"><h5>바탕 잡몹</h5><div class="ch">'+SPK.map(k=>'<button data-msp="'+k+'" class="'+(m.sp===k?'on':'')+'">'+esc(spName(k))+'</button>').join('')+'</div>'+
    '<h5>색</h5><div class="hu">'+HUES.map((h,i)=>'<button data-mhue="'+i+'" class="'+((m.hue|0)===i?'on':'')+'" style="filter:hue-rotate('+h+'deg)">'+(i?'':'원래')+'</button>').join('')+'</div>'+
    '<h5>크기 · 체력</h5><div class="ch">'+SIZES.map(s=>'<button data-msz="'+s+'" class="'+(m.size===s?'on':'')+'">크기 ×'+s+'</button>').join('')+'<span class="sep"></span>'+HPM.map((h,i)=>'<button data-mhp="'+i+'" class="'+((m.hp|0)===i?'on':'')+'">체력 ×'+h+'</button>').join('')+'</div>'+
    '<label class="el"><input type="checkbox" data-mel'+(m.elite?' checked':'')+'> 정예(금빛 · 체력 ×3.5)</label><p class="tip">💡 「내 층」의 잡몹 무리에서 ★ 표시로 고를 수 있어요. 층을 저장하면 내 잡몹도 함께 저장돼 다른 사람도 똑같이 만나요.</p></div></div></div>'}
 /* ----- 도전 과제 ----- */
 const blankChal=()=>({name:'',data:{boss:0,diff:'normal',rules:{nodash:true},time:0}});
 function chalCard(it,i){const d=it.data||{};return '<div class="ic" data-i="'+i+'"><canvas width="84" height="60" data-bs="'+(d.boss|0)+'"></canvas><div class="ii"><b>'+esc(it.name)+'</b><small>'+esc(it.owner)+' · '+esc((BOSSES[d.boss|0]||{}).name||'')+' · '+DN[d.diff]+'</small><div class="rl">'+ruleTags(d)+'</div><div class="bs">'+(it.cleared?'<em>✔</em>':'')+statLine(it)+'</div></div><button class="pl" data-play="'+i+'">도전 ▶</button></div>'}
 function chalEdit(){const e=V.ed,d=e.data;return '<div class="ed"><div class="pv"><canvas width="200" height="150" class="big"></canvas><input class="nm" maxlength="14" placeholder="도전 이름 (2~14자)" value="'+esc(e.name)+'"><div class="rl">'+ruleTags(d)+'</div>'+
  '<div class="ac"><button class="try">⚔ 시험해 보기</button><button class="sv">💾 '+(e.code?'고친 것 저장':'저장하고 코드 받기')+'</button></div></div>'+
  '<div class="op"><h5>보스</h5><div class="ch">'+Array.from({length:20},(_,i)=>'<button data-cb="'+i+'" class="'+((d.boss|0)===i?'on':'')+'">'+esc(BOSSES[i].name)+'</button>').join('')+'</div>'+
  '<h5>난이도</h5><div class="ch">'+Object.keys(DN).map(k=>'<button data-cd="'+k+'" class="'+(d.diff===k?'on':'')+'">'+DN[k]+'</button>').join('')+'</div>'+
  '<h5>규칙 <small>여러 개 골라도 돼요</small></h5><div class="ch">'+RULES.map(([k,n])=>'<button data-cr="'+k+'" class="'+(d.rules&&d.rules[k]?'on':'')+'">'+n+'</button>').join('')+'</div>'+
  '<h5>시간 제한</h5><div class="ch">'+TLIM.map(t=>'<button data-ct="'+t+'" class="'+((d.time|0)===t?'on':'')+'">'+(t?t+'초':'없음')+'</button>').join('')+'</div></div></div>'}
 function chalCardView(){const it=V.card,d=it.data||{};return '<div class="cv"><canvas width="200" height="150" class="big"></canvas><div class="ci"><b>'+esc(it.name)+'</b><small>만든 이 '+esc(it.owner)+' · 코드 <em>'+esc(it.code)+'</em></small><div class="ml"><span>'+esc((BOSSES[d.boss|0]||{}).name||'')+'</span><span>'+DN[d.diff]+'</span></div><div class="rl">'+ruleTags(d)+'</div><div class="bs">'+statLine(it)+'</div>'+
  '<div class="ac"><button class="pl1">⚔ 도전하기</button>'+(it.own?'<button class="ed1">✏ 고치기</button><button class="del">🗑</button>':'<button class="lk">'+(it.liked?'♥ 좋아요':'♡ 좋아요')+'</button>')+'<button class="cp">📋 코드 복사</button></div></div></div>'}
 /* ----- 게시판 ----- */
 const PAL8=['transparent','#ffffff','#1a1a24','#ff5a6a','#ffd166','#7dffa8','#5ab8ff','#c86aff'];
 function artCv(art,cls){return '<canvas width="16" height="16" class="'+(cls||'art')+'" data-art="'+(art||'')+'"></canvas>'}
 function paintArt(cv,art){const o=cv.getContext('2d');o.clearRect(0,0,16,16);for(let i=0;i<256;i++){const v=+(art||'')[i]||0;if(v){o.fillStyle=PAL8[v];o.fillRect(i%16,Math.floor(i/16),1,1)}}}
 function boardHtml(){if(!V.art)V.art='0'.repeat(256);const P=V.board;
  return '<div class="bo"><div class="bw"><div class="pad">'+artCv(V.art,'draw')+'<div class="pal">'+PAL8.map((c,i)=>'<button data-pen="'+i+'" class="'+(V.pen===i?'on':'')+'" style="background:'+(i?c:'repeating-conic-gradient(#555 0 25%,#333 0 50%) 0/8px 8px')+'"></button>').join('')+'<button data-clr="1">지우기</button></div></div>'+
   '<div class="wt"><textarea maxlength="60" placeholder="한마디 (60자) · 그림만 올려도 돼요"></textarea><button class="go" data-post="1">📌 붙이기</button></div></div>'+
   '<div class="pl">'+(P?P.length?P.map(p=>'<div class="po">'+artCv(p.art)+'<div><b>'+esc(p.name)+'</b><small>'+ago(p.t)+'</small><p>'+esc(p.text)+'</p></div><div class="pa"><button data-plk="'+p.id+'" class="'+(p.liked?'on':'')+'">♥ '+p.likes+'</button>'+(p.mine?'<button data-pdel="'+p.id+'">🗑</button>':'<button data-prep="'+p.id+'" title="신고 · 차단">⋯</button>')+'</div></div>').join(''):'<div class="em">아직 아무 글도 없어요 · 첫 글을 붙여 봐요!</div>':'<div class="em">불러오는 중…</div>')+'</div></div>'}
 const ago=t=>{const s=Date.now()/1000-t;return s<60?'방금':s<3600?Math.floor(s/60)+'분 전':s<86400?Math.floor(s/3600)+'시간 전':Math.floor(s/86400)+'일 전'};
 /* ----- 이달의 작품 ----- */
 function worksHtml(){const W2=V.works;if(!W2)return '<div class="em">불러오는 중…</div>';const K=[['boss','🛠 보스'],['map','🗺 층'],['chal','🎯 도전 과제']];
  const col=(o,k,n)=>'<div class="wc"><h5>'+n+'</h5>'+((o[k]||[]).length?o[k].map((w,i)=>'<button class="wi" data-wk="'+k+'" data-wc="'+esc(w.code)+'"><i>'+(i<3?['🥇','🥈','🥉'][i]:i+1)+'</i><b>'+esc(w.name)+'</b><small>'+esc(w.owner)+' · ♥ '+w.likes+'</small></button>').join(''):'<div class="em sm">아직 없어요</div>')+'</div>';
  return '<div class="wk"><p class="tip">이번 달('+esc(W2.month)+')에 받은 <b>좋아요</b> 순이에요. 달이 바뀌면 각 부문 1~3위 만든 사람에게 🪙 · 💎 우편이 가요. 눌러서 바로 도전!</p><div class="w3">'+K.map(([k,n])=>col(W2.now,k,n)).join('')+'</div>'+
   '<h5 class="lm">🏅 지난달('+esc(W2.last_month)+') 수상작</h5><div class="w3">'+K.map(([k,n])=>col(W2.last,k,n)).join('')+'</div></div>'}
 /* ----- 하이라이트 ----- */
 function hlHtml(){const L=V.hl;if(!L)return '<div class="em">불러오는 중…</div>';
  return '<div class="hl"><p class="tip">보스를 멋지게 이기면(노데미지 · 2대 이하 · 주간 리그 · 만든 보스) 마지막 순간이 자동으로 여기에 저장돼요(이 기기에 20개까지).</p>'+
   (V.play?'<div class="hp"><canvas width="480" height="300" class="hpc"></canvas><div class="ac"><button data-hgif="1">💾 GIF로 저장</button><button data-hclose="1">그만 보기</button></div><small class="gi"></small></div>':'')+
   '<div class="hg">'+(L.length?L.map(h=>'<div class="hi"><img src="'+h.frames[Math.max(0,h.frames.length-3)]+'"><b>'+esc(h.label)+'</b><small>'+esc(h.boss)+' · '+num(h.score)+'점 · '+new Date(h.at).toLocaleDateString()+'</small><div class="ac"><button data-hplay="'+h.id+'">▶ 보기</button><button data-hdel="'+h.id+'">🗑</button></div></div>').join(''):'<div class="em">아직 저장된 하이라이트가 없어요</div>')+'</div></div>'}
 function paint(){if(box.hidden)return;const t=V.tab;let body='';
  if(t==='map')body=V.ed?mapEdit():V.card?mapCardView():listBar('map')+'<div class="ls">'+(V.busy?'<div class="em">불러오는 중…</div>':V.items.length?V.items.map(mapCard).join(''):'<div class="em">아직 없어요 · 「새로 만들기」로 첫 층을 만들어 봐요!</div>')+'</div>';
  else if(t==='chal')body=V.ed?chalEdit():V.card?chalCardView():listBar('chal')+'<div class="ls">'+(V.busy?'<div class="em">불러오는 중…</div>':V.items.length?V.items.map(chalCard).join(''):'<div class="em">아직 없어요 · 「새로 만들기」로 첫 도전을 만들어 봐요!</div>')+'</div>';
  else if(t==='music')body=musicHtml();else if(t==='mob')body=mobHtml();else if(t==='board')body=boardHtml();else if(t==='works')body=worksHtml();else body=hlHtml();
  const sub=(V.ed||V.card)&&(t==='map'||t==='chal')?'<div class="sb"><button data-back="1">◀ 목록</button><span>'+(V.ed?(V.ed.code?'고치기 · '+V.ed.code:'새로 만들기'):'자세히')+'</span></div>':'';
  const bd=box.querySelector('.bd'),sc=bd?bd.scrollTop:0,op=box.querySelector('.op'),sc2=op?op.scrollTop:0;
  box.innerHTML='<div class="pn"><div class="hd"><button class="bk">닫기</button><i>🎨</i><div><b>작업실</b><small>층 · 음악 · 잡몹 · 도전 과제를 만들어 코드로 나누기 · 게시판 · 이달의 작품 · 하이라이트</small></div></div>'+
   '<div class="tabs">'+TABS.map(([k,ic,n])=>'<button data-t="'+k+'" class="'+(t===k?'on':'')+'"><i>'+ic+'</i>'+n+'</button>').join('')+'</div>'+sub+'<div class="bd">'+body+'</div><div class="msg">'+esc(V.msg)+'</div></div>';
  const nb=box.querySelector('.bd');if(nb)nb.scrollTop=sc;const no=box.querySelector('.op');if(no)no.scrollTop=sc2;wire()}
 /* ----- 그림 갱신(움직임) ----- */
 let rafOn=0;function anim(){if(rafOn)return;rafOn=1;const loop=now=>{if(box.hidden){rafOn=0;return}try{draws(now)}catch(e){}requestAnimationFrame(loop)};requestAnimationFrame(loop)}
 function draws(now){const q=s=>box.querySelector(s),big=q('canvas.big');
  if(big&&V.tab==='map'){const d=(V.ed||V.card||{}).data;if(d){const o=big.getContext('2d'),z=ZP()[d.theme|0]||ZP()[0];o.fillStyle=z.fl;o.fillRect(0,0,240,150);o.fillStyle=z.fl2;for(let y=0;y<150;y+=16)for(let x=(y/16)%2*16;x<240;x+=32)o.fillRect(x,y,16,16);o.fillStyle=z.wall;o.fillRect(0,0,240,22);
    const L=[];for(const r of d.list||[]){const def=r.k.startsWith('cm:')?(d.mobs||{})[r.k]:null;L.push(def?Object.assign({},def):{sp:r.k,elite:r.el,hue:0,size:1})}
    L.slice(0,8).forEach((m,i)=>drawMobPrev(o,m,d.theme,30+(i%4)*60,70+Math.floor(i/4)*55,1.1,now+i*170))}}
  if(big&&V.tab==='mob'&&V.mob){const o=big.getContext('2d');o.clearRect(0,0,200,150);const z=ZP()[0];o.fillStyle='#141a24';o.fillRect(0,0,200,150);drawMobPrev(o,V.mob,0,100,125,2.2,now)}
  if(big&&V.tab==='chal'){const d=(V.ed||V.card||{}).data;if(d){const o=big.getContext('2d');o.clearRect(0,0,200,150);o.imageSmoothingEnabled=false;try{drawMech(o,BOSSES[d.boss|0],100,110,now,{},2.6)}catch(e){}}}
  box.querySelectorAll('canvas[data-mc]').forEach(cv=>{const m=mobs().find(x=>x.id===cv.dataset.mc);if(m){const o=cv.getContext('2d');o.clearRect(0,0,48,44);drawMobPrev(o,m,0,24,42,.75,now)}});
  if(V.play){const cv=q('canvas.hpc');if(cv){const P2=V.play,i=Math.floor((now-P2.t0)/90)%P2.imgs.length,img=P2.imgs[i];if(img&&img.complete){const o=cv.getContext('2d');o.drawImage(img,0,0,480,300)}}}
  if(V.tab==='music'&&SEQ.on){const st=SEQ.step%16;box.querySelectorAll('.grid .c').forEach(b=>{const i=+b.dataset.cell.split('|')[1];b.classList.toggle('now',((st+15)%16)===i)})}}
 function still(){box.querySelectorAll('canvas[data-mp]').forEach(cv=>{const it=V.items[+cv.dataset.mp],d=it&&it.data;if(!d)return;const o=cv.getContext('2d'),z=ZP()[d.theme|0]||ZP()[0];o.fillStyle=z.fl;o.fillRect(0,0,84,60);
   (d.list||[]).slice(0,3).forEach((r,i)=>{const def=r.k.startsWith('cm:')?(d.mobs||{})[r.k]:null;drawMobPrev(o,def||{sp:r.k,elite:r.el},d.theme,16+i*26,52,.6,1000+i*300)})});
  box.querySelectorAll('canvas[data-bs]').forEach(cv=>{const o=cv.getContext('2d');o.clearRect(0,0,84,60);o.imageSmoothingEnabled=false;try{drawMech(o,BOSSES[+cv.dataset.bs],42,52,1000,{},1.1)}catch(e){}});
  box.querySelectorAll('canvas[data-art]').forEach(cv=>paintArt(cv,cv.classList.contains('draw')?V.art:cv.dataset.art))}
 function wire(){const q=s=>box.querySelector(s),qa=(s,f)=>box.querySelectorAll(s).forEach(f);still();anim();
  q('.bk').onclick=closePanel;qa('[data-t]',b=>b.onclick=()=>{V.tab=b.dataset.t;V.ed=null;V.card=null;V.msg='';V.play=null;try{gmSfx('tab')}catch(e){}paint();load()});
  qa('[data-back]',b=>b.onclick=()=>{V.ed=null;V.card=null;V.msg='';paint();load()});
  qa('[data-by]',b=>b.onclick=()=>{V.by=b.dataset.by;load()});qa('[data-code]',b=>b.onclick=()=>byCode(b.dataset.code,q('.cd input').value));
  qa('.cd input,.nm,.snm,textarea',i=>i.addEventListener('keydown',e=>e.stopPropagation()));
  qa('[data-new]',b=>b.onclick=()=>{if(!acc().token){try{ACCT55.open()}catch(e){}return}V.ed=b.dataset.new==='map'?blankMap():blankChal();V.msg='';paint()});
  qa('.ic',c=>c.onclick=e=>{if(e.target.closest('[data-play]'))return;V.card=V.items[+c.dataset.i];paint()});
  qa('[data-play]',b=>b.onclick=e=>{e.stopPropagation();const it=V.items[+b.dataset.play];(V.tab==='map'?playMap:playChal)(it)});
  const kind=V.tab;
  /* 정보 카드 */
  if(V.card&&(kind==='map'||kind==='chal')){const it=V.card;q('.pl1').onclick=()=>(kind==='map'?playMap:playChal)(it);q('.cp').onclick=()=>{try{navigator.clipboard.writeText(it.code)}catch(e){}toast('코드 복사 · '+it.code)};
   if(q('.lk'))q('.lk').onclick=async()=>{const r=await api('/api/ugc/'+kind+'/like',{code:it.code});if(r.s===200){it.liked=r.j.liked;it.likes=r.j.likes;paint()}else{V.msg=(r.j&&r.j.error)||'';paint()}};
   if(q('.ed1'))q('.ed1').onclick=()=>{V.ed={code:it.code,name:it.name,data:JSON.parse(JSON.stringify(it.data||{}))};V.card=null;paint()};
   if(q('.del'))q('.del').onclick=async()=>{if(!confirm('「'+it.name+'」을(를) 지울까요?'))return;await api('/api/ugc/'+kind+'/delete',{code:it.code});V.card=null;V.by='mine';load()}}
  /* 만들기 */
  if(V.ed&&(kind==='map'||kind==='chal')){const e=V.ed,d=e.data;const nm=q('.nm');nm.oninput=()=>{e.name=nm.value};
   const save=async()=>{e.name=nm.value.trim();if(e.name.length<2){V.msg='이름을 2글자 이상 써 주세요';paint();return}if(kind==='map'){d.mobs={};for(const r of d.list)if(r.k.startsWith('cm:')){const m=mobs().find(x=>'cm:'+x.id===r.k);if(m)d.mobs[r.k]=m}}
    V.msg='저장하는 중…';paint();const r=await api('/api/ugc/'+kind+'/save',{code:e.code||undefined,name:e.name,data:d});if(r.s!==200){V.msg=(r.j&&r.j.error)||'저장하지 못했어요';paint();return}
    const it=r.j.item;it.own=true;V.card=it;V.ed=null;V.msg='💾 저장했어요! 코드 '+r.j.code+' 를 친구에게 알려 주세요';sfxOk();paint()};
   q('.sv').onclick=save;q('.try').onclick=()=>{if(kind==='map'){d.mobs={};for(const r of d.list)if(r.k.startsWith('cm:')){const m=mobs().find(x=>'cm:'+x.id===r.k);if(m)d.mobs[r.k]=m}playMap({name:nm.value||'시험 층',owner:'나',code:'',data:d})}else playChal({name:nm.value||'시험 도전',owner:'나',code:'',data:d})};
   if(kind==='map'){qa('[data-th]',b=>b.onclick=()=>{d.theme=+b.dataset.th;paint()});qa('[data-hp]',b=>b.onclick=()=>{d.hp=+b.dataset.hp;paint()});qa('[data-cap]',b=>b.onclick=()=>{d.cap=+b.dataset.cap;paint()});
    qa('[data-rk]',s=>s.onchange=()=>{const v=s.value,r=d.list[+s.dataset.rk];r.k=v.startsWith('cm:')?v:v.slice(2);if(r.k.startsWith('cm:'))delete r.el;paint()});
    qa('[data-rn]',b=>b.onclick=()=>{const [i,dv]=b.dataset.rn.split('|').map(Number),r=d.list[i];const tot=d.list.reduce((a,x)=>a+x.n,0);if(dv>0&&tot>=40)return;r.n=Math.max(1,Math.min(8,r.n+dv));paint()});
    qa('[data-re]',c=>c.onchange=()=>{d.list[+c.dataset.re].el=c.checked;paint()});qa('[data-rd]',b=>b.onclick=()=>{if(d.list.length>1){d.list.splice(+b.dataset.rd,1);paint()}});
    qa('[data-radd]',b=>b.onclick=()=>{d.list.push({k:'slime',n:2});paint()});qa('[data-sg]',b=>b.onclick=()=>{const s=songs().find(x=>x.id===b.dataset.sg);d.song=s?JSON.parse(JSON.stringify(s)):null;paint()})}
   else{qa('[data-cb]',b=>b.onclick=()=>{d.boss=+b.dataset.cb;paint()});qa('[data-cd]',b=>b.onclick=()=>{d.diff=b.dataset.cd;paint()});qa('[data-cr]',b=>b.onclick=()=>{d.rules=d.rules||{};d.rules[b.dataset.cr]=!d.rules[b.dataset.cr];paint()});qa('[data-ct]',b=>b.onclick=()=>{d.time=+b.dataset.ct;paint()})}}
  /* 음악 */
  if(kind==='music'){const S=V.song;const re=()=>{if(SEQ.on)SEQ.song=S;paint()};
   qa('[data-cell]',b=>{const [r,i]=b.dataset.cell.split('|'),k=+i;const step=dv=>{if(r==='m'||r==='b'){const v=S[r][k];S[r][k]=dv<0?-1:(v>=7?-1:v+1)}else S[r][k]=S[r][k]?0:1;re()};
    b.onclick=()=>step(1);b.oncontextmenu=e=>{e.preventDefault();step(-1)};let lt=0;b.onpointerdown=()=>{lt=setTimeout(()=>{lt=-1;step(-1)},500)};b.onpointerup=()=>{if(lt>0)clearTimeout(lt)}});
   q('[data-bpm]').oninput=e=>{S.bpm=+e.target.value;q('[data-bpm]').nextElementSibling.textContent='♩'+S.bpm;if(SEQ.on){seqStart(S)}};q('[data-bpm]').onchange=()=>paint();
   q('[data-root]').onchange=e=>{S.root=+e.target.value;re()};q('[data-scale]').onchange=e=>{S.scale=e.target.value;re()};q('[data-lead]').onchange=e=>{S.lead=e.target.value;re()};q('[data-bass]').onchange=e=>{S.bass=e.target.value;re()};
   q('.snm').oninput=e=>{S.name=e.target.value.slice(0,10)};q('[data-splay]').onclick=()=>{if(SEQ.on)seqStop();else seqStart(S);paint()};
   q('[data-song]').onchange=e=>{const s=songs().find(x=>x.id===e.target.value);if(s){V.song=JSON.parse(JSON.stringify(s));if(SEQ.on)seqStart(V.song)}paint()};
   q('[data-snew]').onclick=()=>{V.song=newSong();paint()};
   q('[data-ssave]').onclick=()=>{const L=songs(),i=L.findIndex(x=>x.id===S.id);if(i<0&&L.length>=8){V.msg='곡은 8개까지 저장할 수 있어요';paint();return}S.name=(S.name||'내 곡').trim()||'내 곡';if(i<0)L.push(JSON.parse(JSON.stringify(S)));else L[i]=JSON.parse(JSON.stringify(S));try{saveNow()}catch(e){}V.msg='🎵 저장했어요 · 「내 층」에서 고를 수 있어요';sfxOk();paint()};
   if(q('[data-sdel]'))q('[data-sdel]').onclick=()=>{const L=songs(),i=L.findIndex(x=>x.id===S.id);if(i>=0)L.splice(i,1);try{saveNow()}catch(e){}V.song=null;seqStop();paint()}}
  /* 잡몹 */
  if(kind==='mob'){const m=V.mob;q('.nm').oninput=e=>{m.name=e.target.value.slice(0,8)};
   qa('[data-msp]',b=>b.onclick=()=>{m.sp=b.dataset.msp;paint()});qa('[data-mhue]',b=>b.onclick=()=>{m.hue=+b.dataset.mhue;paint()});qa('[data-msz]',b=>b.onclick=()=>{m.size=+b.dataset.msz;paint()});qa('[data-mhp]',b=>b.onclick=()=>{m.hp=+b.dataset.mhp;paint()});
   q('[data-mel]').onchange=e=>{m.elite=e.target.checked;paint()};qa('[data-mob]',b=>b.onclick=()=>{V.mob=JSON.parse(JSON.stringify(mobs().find(x=>x.id===b.dataset.mob)));paint()});
   qa('[data-mnew]',b=>b.onclick=()=>{V.mob={id:uid(),name:'내 잡몹',sp:'slime',hue:0,size:1,hp:1,elite:false};paint()});
   q('[data-msave]').onclick=()=>{const L=mobs(),i=L.findIndex(x=>x.id===m.id);m.name=(m.name||'').trim()||'내 잡몹';if(i<0&&L.length>=12){V.msg='잡몹은 12마리까지예요';paint();return}if(i<0)L.push(JSON.parse(JSON.stringify(m)));else L[i]=JSON.parse(JSON.stringify(m));try{saveNow()}catch(e){}V.msg='👾 저장했어요 · 「내 층」에서 ★로 고를 수 있어요';sfxOk();paint()};
   if(q('[data-mdel]'))q('[data-mdel]').onclick=()=>{const L=mobs(),i=L.findIndex(x=>x.id===m.id);if(i>=0)L.splice(i,1);try{saveNow()}catch(e){}V.mob=null;paint()}}
  /* 게시판 */
  if(kind==='board'){const cv=q('canvas.draw');if(cv){let down=false;const put=e=>{const r=cv.getBoundingClientRect(),x=Math.floor((e.clientX-r.left)/r.width*16),y=Math.floor((e.clientY-r.top)/r.height*16);if(x<0||y<0||x>15||y>15)return;const i=y*16+x;V.art=V.art.slice(0,i)+V.pen+V.art.slice(i+1);paintArt(cv,V.art)};
    cv.onpointerdown=e=>{down=true;try{cv.setPointerCapture(e.pointerId)}catch(_){}put(e)};cv.onpointermove=e=>{if(down)put(e)};cv.onpointerup=()=>{down=false}}
   qa('[data-pen]',b=>b.onclick=()=>{V.pen=+b.dataset.pen;paint()});qa('[data-clr]',b=>b.onclick=()=>{V.art='0'.repeat(256);paint()});
   qa('[data-post]',b=>b.onclick=async()=>{if(!acc().token){try{ACCT55.open()}catch(e){}return}const r=await api('/api/board/post',{text:q('textarea').value,art:V.art});if(r.s===200){V.art='0'.repeat(256);V.msg='📌 붙였어요!';sfxOk()}else V.msg=(r.j&&r.j.error)||'붙이지 못했어요';load()});
   qa('[data-plk]',b=>b.onclick=async()=>{await api('/api/board/like',{id:b.dataset.plk});load()});qa('[data-pdel]',b=>b.onclick=async()=>{await api('/api/board/delete',{id:b.dataset.pdel});load()});
   qa('[data-prep]',b=>b.onclick=()=>{const p=(V.board||[]).find(x=>x.id===b.dataset.prep);if(p)try{MR163.menu(p.name,'게시판',p.text)}catch(e){}})}
  /* 이달의 작품 */
  if(kind==='works')qa('[data-wk]',b=>b.onclick=async()=>{const k=b.dataset.wk,c=b.dataset.wc;if(k==='boss'){const r=await api('/api/cboss/list',{by:'code',code:c});if(r.s===200&&r.j.items[0]){closePanel();try{BE168.fight(r.j.items[0])}catch(e){}}return}
   const r=await api('/api/ugc/'+k+'/list',{by:'code',code:c});if(r.s===200&&r.j.items[0]){V.tab=k;V.card=r.j.items[0];paint()}});
  /* 하이라이트 */
  if(kind==='hl'){qa('[data-hplay]',b=>b.onclick=()=>{const h=(V.hl||[]).find(x=>x.id===b.dataset.hplay);if(!h)return;V.play={h,t0:performance.now(),imgs:h.frames.map(s=>{const i=new Image();i.src=s;return i})};paint()});
   qa('[data-hdel]',b=>b.onclick=async()=>{await hlDel(b.dataset.hdel);V.play=null;load()});qa('[data-hclose]',b=>b.onclick=()=>{V.play=null;paint()});
   qa('[data-hgif]',b=>b.onclick=()=>{const P2=V.play;if(!P2||typeof hlSaveGif!=='function')return;const list=P2.imgs.map((img,i)=>{const c=document.createElement('canvas');c.width=W;c.height=H;c.getContext('2d').drawImage(img,0,0,W,H);return {c,t:i}});
    try{hlSaveGif(list,list.map(()=>90),P2.h.boss+' '+P2.h.label,q('.gi'),b)}catch(e){console.error(e)}})}}
 /* 들어가는 곳: ☰ 메뉴(99999999)에서 */
 const st=document.createElement('style');st.textContent=`
 #cr171{position:fixed;inset:0;z-index:9300;display:grid;place-items:center;background:#000b;backdrop-filter:blur(3px);color:#eef0f6;font-family:inherit}#cr171[hidden]{display:none}
 #cr171 .pn{width:min(920px,calc(100vw - 20px));height:min(660px,calc(100vh - 20px));display:flex;flex-direction:column;box-sizing:border-box;padding:12px 14px;border-radius:16px;
  background:radial-gradient(120% 60% at 50% 0%,#1e3a3a,#0a1214 70%);border:1px solid #7dffd855;box-shadow:0 20px 60px #000c,0 0 0 1px #000}
 #cr171 .hd{display:flex;align-items:center;gap:10px;margin-bottom:8px}#cr171 .hd>i{font-style:normal;font-size:22px;width:40px;height:40px;display:grid;place-items:center;border-radius:12px;background:linear-gradient(180deg,#2a6a5a,#0e2420);border:1px solid #7dffd888}
 #cr171 .hd b{display:block;font-size:19px;color:#a6ffe0}#cr171 .hd small{font-size:11.5px;color:#9ac0b8}
 #cr171 .tabs{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px}#cr171 .tabs button{font:inherit;font-weight:900;font-size:12.5px;padding:7px 10px;border-radius:10px;border:1px solid #ffffff1c;background:#122020;color:#c4e6dc;cursor:pointer;display:flex;gap:5px;align-items:center}
 #cr171 .tabs i{font-style:normal}#cr171 .tabs button.on{background:linear-gradient(180deg,#a6ffe0,#3ad1a0);color:#04201a;border-color:#d8fff0}
 #cr171 .sb{display:flex;align-items:center;gap:8px;margin-bottom:6px;font-weight:900;color:#a6ffe0}#cr171 .sb button{font:inherit;font-weight:900;font-size:12px;padding:5px 10px;border-radius:9px;border:0;background:#1e3430;color:#c4e6dc;cursor:pointer}
 #cr171 .bd{flex:1;min-height:0;overflow:auto}#cr171 .msg{min-height:16px;text-align:center;font-size:12px;color:#ffe79a;margin-top:4px}#cr171 .em{text-align:center;padding:24px;color:#8aa8a0}#cr171 .em.sm{padding:8px;font-size:12px}
 #cr171 h5{margin:8px 0 5px;font-size:12.5px;color:#a6ffe0}#cr171 h5 small{font-weight:600;color:#8aa8a0;margin-left:4px}#cr171 .tip{font-size:11.5px;line-height:1.6;color:#9ac0b8;margin:6px 0}#cr171 .tip b{color:#ffe79a}
 #cr171 .lb{display:flex;gap:5px;flex-wrap:wrap;align-items:center;margin-bottom:8px}#cr171 .lb>button{font:inherit;font-weight:800;font-size:12px;padding:6px 10px;border-radius:9px;border:1px solid #ffffff1c;background:#122020;color:#c4e6dc;cursor:pointer}#cr171 .lb>button.on{background:#a6ffe0;color:#04201a}
 #cr171 .lb .new{margin-left:auto;background:linear-gradient(180deg,#ffe79a,#ff9a2a)!important;color:#2a1206!important;border:0}
 #cr171 .cd{display:flex;gap:3px}#cr171 .cd input{width:84px;font:inherit;font-family:ui-monospace,Menlo,monospace;font-weight:900;text-transform:uppercase;padding:5px 7px;border-radius:8px;border:1px solid #7dffd866;background:#061010;color:#ffe79a}#cr171 .cd button{font:inherit;font-weight:900;font-size:12px;padding:5px 9px;border-radius:8px;border:0;background:#1e3430;color:#c4e6dc;cursor:pointer}
 #cr171 .ls{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:7px}
 #cr171 .ic{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:12px;background:linear-gradient(180deg,#132222,#0c1616);border:1px solid #ffffff14;cursor:pointer}#cr171 .ic:hover{border-color:#7dffd888}
 #cr171 .ic canvas{width:84px;height:60px;image-rendering:pixelated;border-radius:8px;flex:none}#cr171 .ii{flex:1;min-width:0}#cr171 .ii b{display:block;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#cr171 .ii small{font-size:10.5px;color:#8aa8a0}
 #cr171 .bs{display:flex;flex-wrap:wrap;gap:2px 8px;font-size:10.5px;color:#c4e6dc;margin-top:2px}#cr171 .bs em{font-style:normal;color:#7dffa8;font-weight:900}
 #cr171 .pl,#cr171 .pl1{font:inherit;font-weight:900;font-size:13px;padding:8px 10px;border-radius:10px;border:0;cursor:pointer;background:linear-gradient(180deg,#a6ffe0,#3ad1a0);color:#04201a;box-shadow:0 0 0 2px #000;flex:none}
 #cr171 .ed,#cr171 .cv{display:grid;grid-template-columns:260px 1fr;gap:10px;min-height:0}#cr171 .pv{display:flex;flex-direction:column;gap:7px}#cr171 canvas.big{width:100%;image-rendering:pixelated;border-radius:12px;border:1px solid #7dffd844;background:#0a1414}
 #cr171 .nm,#cr171 .snm{box-sizing:border-box;font:inherit;font-weight:900;font-size:14px;padding:7px 9px;border-radius:10px;border:1px solid #7dffd866;background:#061010;color:#fff}#cr171 .nm{width:100%}
 #cr171 .ac{display:flex;gap:6px;flex-wrap:wrap}#cr171 .ac button{flex:1;font:inherit;font-weight:900;font-size:12.5px;padding:8px;border-radius:10px;border:0;cursor:pointer;background:#1e3430;color:#c4e6dc;white-space:nowrap}
 #cr171 .ac .sv,#cr171 .sv{background:linear-gradient(180deg,#a6f5c6,#3ad16a);color:#04120c}#cr171 .ac .try,#cr171 .ac .pl1,#cr171 .go{background:linear-gradient(180deg,#ffe79a,#ff9a2a);color:#2a1206}
 #cr171 .op{overflow:auto;min-height:0;padding-right:4px}
 #cr171 .th,#cr171 .ch,#cr171 .hu{display:flex;flex-wrap:wrap;gap:4px;align-items:center}#cr171 .th button{font:inherit;font-weight:900;font-size:11.5px;padding:8px 10px;border-radius:9px;cursor:pointer;color:var(--a);background:linear-gradient(180deg,var(--b),#000);border:2px solid #ffffff1a}#cr171 .th button.on{border-color:var(--c);box-shadow:0 0 10px var(--c)}
 #cr171 .ch button{font:inherit;font-weight:800;font-size:11.5px;padding:5px 8px;border-radius:8px;border:1px solid #ffffff1a;background:#122020;color:#c4e6dc;cursor:pointer}#cr171 .ch button.on{background:#a6ffe0;color:#04201a}#cr171 .sep{width:10px}
 #cr171 .hu button{width:34px;height:34px;border-radius:50%;border:2px solid #000;cursor:pointer;background:conic-gradient(#ff5a6a,#ffd166,#7dffa8,#5ab8ff,#c86aff,#ff5a6a);font:inherit;font-size:9px;font-weight:900;color:#000}#cr171 .hu button.on{box-shadow:0 0 0 3px #fff}
 #cr171 .rows{display:flex;flex-direction:column;gap:4px}#cr171 .rw{display:flex;align-items:center;gap:5px;padding:4px 6px;border-radius:9px;background:#0e1a1a}#cr171 .rw select{font:inherit;font-size:12px;padding:4px;border-radius:7px;background:#061010;color:#fff;border:1px solid #ffffff22;min-width:110px}
 #cr171 .rw button{font:inherit;font-weight:900;font-size:14px;line-height:1;width:28px;height:26px;padding:0;display:grid;place-items:center;border-radius:7px;border:0;background:#1e3430;color:#c4e6dc;cursor:pointer}#cr171 .rw b{min-width:42px;text-align:center;font-size:12px}#cr171 .rw label{font-size:11.5px;display:flex;gap:3px;align-items:center}
 #cr171 .add{font:inherit;font-weight:900;font-size:12px;padding:6px;border-radius:9px;border:1px dashed #7dffd866;background:transparent;color:#a6ffe0;cursor:pointer}
 #cr171 .ci{display:flex;flex-direction:column;gap:8px}#cr171 .ci>b{font-size:22px;color:#a6ffe0}#cr171 .ci small{color:#9ac0b8}#cr171 .ci em{font-style:normal;font-family:ui-monospace,Menlo,monospace;font-weight:900;color:#ffe79a}
 #cr171 .ml,#cr171 .rl{display:flex;flex-wrap:wrap;gap:4px}#cr171 .ml span,#cr171 .rl span{font-size:11px;font-weight:800;padding:3px 8px;border-radius:8px;background:#162626;border:1px solid #ffffff14}#cr171 .rl span{background:#2a1430;color:#ffc0f0}
 #cr171 .mu{display:flex;flex-direction:column;gap:8px}#cr171 .mt,#cr171 .mo{display:flex;gap:6px;flex-wrap:wrap;align-items:center}#cr171 .mt select,#cr171 .mo select{font:inherit;font-size:12px;padding:5px;border-radius:8px;background:#061010;color:#fff;border:1px solid #ffffff22}
 #cr171 .mt button{font:inherit;font-weight:900;font-size:12px;padding:6px 10px;border-radius:9px;border:0;background:#1e3430;color:#c4e6dc;cursor:pointer}#cr171 .mo label{font-size:12px;display:flex;align-items:center;gap:4px}#cr171 .mo b{font-size:12px;color:#ffe79a;min-width:40px}
 #cr171 .grid{display:flex;flex-direction:column;gap:3px;overflow-x:auto;padding-bottom:4px}#cr171 .gr{display:grid;grid-template-columns:58px repeat(16,minmax(22px,1fr));gap:3px;align-items:center}#cr171 .gr i{font-style:normal;font-size:11px;font-weight:900;color:#9ac0b8}
 #cr171 .gr .c{height:26px;border-radius:5px;border:1px solid #ffffff14;background:#0e1a1a;cursor:pointer;font:inherit;font-size:10px;font-weight:900;color:#04201a;padding:0}#cr171 .gr .c.b4{border-left:2px solid #ffffff44}
 #cr171 .gr .c.on{background:#7dffa8}#cr171 .gr.me .c.on{background:#ffd166}#cr171 .gr.ba .c.on{background:#5ab8ff}#cr171 .gr .c.now{box-shadow:0 0 0 2px #fff inset}
 #cr171 .mb{display:flex;flex-direction:column;gap:8px}#cr171 .mbl{display:flex;gap:4px;flex-wrap:wrap}#cr171 .mbl button{display:flex;flex-direction:column;align-items:center;padding:3px;border-radius:9px;border:1px solid #ffffff1a;background:#0e1a1a;cursor:pointer;color:#c4e6dc;font:inherit;font-size:10px;width:62px}
 #cr171 .mbl button.on{border:2px solid #a6ffe0}#cr171 .mbl canvas{width:48px;height:44px;image-rendering:pixelated}#cr171 .mbl .nw{font-size:22px;justify-content:center;min-height:60px}#cr171 .el{font-size:12px;display:flex;gap:5px;align-items:center;margin-top:8px}
 #cr171 .bo{display:flex;flex-direction:column;gap:8px}#cr171 .bw{display:flex;gap:10px;flex-wrap:wrap;padding:8px;border-radius:12px;background:#0e1a1a}#cr171 .pad{display:flex;gap:8px}#cr171 canvas.draw{width:144px;height:144px;image-rendering:pixelated;background:repeating-conic-gradient(#22302e 0 25%,#1a2624 0 50%) 0/18px 18px;border-radius:8px;cursor:crosshair;touch-action:none}
 #cr171 .pal{display:grid;grid-template-columns:repeat(2,26px);gap:4px;align-content:start;margin-right:6px}#cr171 .pal button{width:26px;height:26px;border-radius:6px;border:2px solid #000;cursor:pointer}#cr171 .pal button.on{box-shadow:0 0 0 2px #fff}#cr171 .pal [data-clr]{grid-column:1/3;width:auto;height:24px;white-space:nowrap;font:inherit;font-size:10px;font-weight:900;background:#1e3430;color:#c4e6dc}
 #cr171 .wt{flex:1;display:flex;flex-direction:column;gap:6px;min-width:200px}#cr171 textarea{flex:1;min-height:70px;font:inherit;font-size:13px;padding:8px;border-radius:10px;border:1px solid #7dffd866;background:#061010;color:#fff;resize:none}#cr171 .wt .go{font:inherit;font-weight:900;padding:8px;border:0;border-radius:10px;cursor:pointer}
 #cr171 .bo>.pl{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:6px;background:none;box-shadow:none;padding:0;cursor:default}
 #cr171 .po{display:flex;gap:8px;align-items:flex-start;padding:7px;border-radius:10px;background:#fff6dc;color:#2a1e10;box-shadow:0 2px 0 #0006;transform:rotate(-.4deg)}#cr171 .po:nth-child(2n){transform:rotate(.5deg);background:#e8fff4}
 #cr171 .po canvas.art{width:48px;height:48px;image-rendering:pixelated;flex:none;background:#0001;border-radius:6px}#cr171 .po>div{flex:1;min-width:0}#cr171 .po b{font-size:12.5px}#cr171 .po small{margin-left:6px;font-size:10px;opacity:.6}#cr171 .po p{margin:3px 0 0;font-size:12.5px;word-break:break-all}
 #cr171 .pa{display:flex;flex-direction:column;gap:3px}#cr171 .pa button{font:inherit;font-size:11px;font-weight:900;padding:3px 7px;border-radius:7px;border:0;background:#0002;color:#2a1e10;cursor:pointer}#cr171 .pa button.on{background:#ff5a8a;color:#fff}
 #cr171 .w3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}#cr171 .wc{padding:8px;border-radius:12px;background:#0e1a1a;display:flex;flex-direction:column;gap:4px}#cr171 .wi{display:grid;grid-template-columns:24px 1fr;gap:0 6px;text-align:left;padding:6px;border-radius:9px;border:1px solid #ffffff14;background:#132222;color:#eef0f6;font:inherit;cursor:pointer}
 #cr171 .wi i{grid-row:1/3;font-style:normal;font-size:16px;align-self:center}#cr171 .wi b{font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#cr171 .wi small{font-size:10.5px;color:#8aa8a0}#cr171 .lm{margin-top:14px}
 #cr171 .hg{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px}#cr171 .hi{padding:6px;border-radius:12px;background:#0e1a1a;display:flex;flex-direction:column;gap:3px}#cr171 .hi img{width:100%;border-radius:8px;image-rendering:pixelated}#cr171 .hi b{font-size:12.5px;color:#ffe79a}#cr171 .hi small{font-size:10.5px;color:#8aa8a0}
 #cr171 .hp{display:flex;flex-direction:column;gap:6px;align-items:center;margin-bottom:10px}#cr171 .hpc{width:min(480px,100%);image-rendering:pixelated;border-radius:10px;border:1px solid #7dffd866}#cr171 .gi{color:#ffe79a}
 .cr171r{display:flex;flex-direction:column;align-items:center;gap:6px}.cr171r>b{font-size:20px;color:#a6ffe0}.cr171r>small{opacity:.75}.cr171r .rs{display:flex;gap:10px;font-size:12px}.cr171r .rs b{color:#fff}.cr171r .g{padding:6px 12px;border-radius:10px;background:#2a2410;color:#ffe79a;font-weight:900}.cr171r .g.l{background:#2a0e14;color:#ff9aaa}.cr171r .st{font-size:11.5px;opacity:.8}
 .cr171r .rl{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}.cr171r .rl span{font-size:11px;font-weight:800;padding:3px 8px;border-radius:8px;background:#2a1430;color:#ffc0f0}
 @media (max-width:720px){#cr171 .ed,#cr171 .cv{grid-template-columns:1fr}#cr171 .op{overflow:visible}#cr171 .w3{grid-template-columns:1fr}#cr171 .ls{grid-template-columns:1fr}#cr171 .tabs button{padding:6px 7px;font-size:11.5px}#cr171 .pv canvas.big{max-height:150px;object-fit:contain}}
 html.lpL #cr171 .pn{padding:8px 10px}html.lpL #cr171 .hd small{display:none}`;document.head.appendChild(st);
 window.CR171={open:openPanel,close:closePanel,playMap,playChal,seqStart,seqStop,CM,CH,autoHL,hlAll};
}catch(e){console.error('v171 create',e)}})();
