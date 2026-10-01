/* ================= CHAPTER 3 · ORIGIN — 추리 엔진 ================= */
let CS=null;const C3CASES=[];const C3LOOK={};const C3K=new Set();
const C3COL={bg:'#0b0f14',panel:'#141a22',line:'#3a4a5a',gold:'#ffd98a',ink:'#e8e0d0',dim:'#8a9aa8',red:'#ff6b7a',grn:'#8ff0b0',cyan:'#8ae8ff'};
function c3Sv(){const s=saveData.ch3=saveData.ch3||{};s.ci=s.ci||0;s.best=s.best||{};s.tut=s.tut||{};return s}
function c3IVS(){return CS.IVS||(CS.IVS=Array.isArray(CS.D.interro)?CS.D.interro:[CS.D.interro])}
function c3IV(){return c3IVS()[CS.ivw||0]}
function c3Bk(i){return CS.broken.has((CS.ivw||0)+':'+i)}
function c3BkAdd(i){CS.broken.add((CS.ivw||0)+':'+i)}
function c3WDone(w){const IV=c3IVS()[w];return IV.stmts.every((s,k)=>!s.lie||CS.broken.has(w+':'+k))}
function c3AllDone(){return c3IVS().every((_,w)=>c3WDone(w))}
function c3IvFor(id){const L=c3IVS();for(let w=0;w<L.length;w++){const IV=L[w];if(IV.who===id&&!c3WDone(w)&&IV.need.every(c3Has))return w}return -1}
function c3Card(ph){return ph==='title'||ph==='actend'||ph==='actbreak'||ph==='fin'}
function c3Has(id){return !!(CS&&CS.got.has(id))}
function c3Clue(id){return CS&&CS.D.clues[id]}
function c3Persist(){if(!CS)return;const s=c3Sv();s.cur={ci:CS.ci,got:[...CS.got],seen:CS.seen,broken:[...CS.broken],mistakes:CS.mistakes,hints:CS.hints,dq:CS.dq,ddCh:CS.ddCh,ivDone:CS.ivDone,flags:CS.flags};try{saveNow()}catch(e){}}
function c3Give(id){if(!CS||CS.got.has(id))return false;CS.got.add(id);CS.newIds.add(id);const c=c3Clue(id);const _tn=performance.now(),_tl=CS.toast.length?CS.toast[CS.toast.length-1].t:0;CS.toast.push({t:Math.max(_tn,_tl+700),txt:c?c.name:id,ic:c&&c.ic||'📄',deduce:c&&c.kind==='deduce'});
 sfx(880,.12,'triangle',.05,1320);setTimeout(()=>sfx(1320,.2,'sine',.04,1760),90);c3Persist();return true}
function c3Mistake(n){CS.mistakes+=n||1;CS.shake=performance.now();sfx(110,.3,'sawtooth',.06,70);c3Persist()}
/* ---------- 입장 / 퇴장 ---------- */
function c3Enter(){document.body.classList.add('caseOn');mode='case';paused=false;dlg.active=false;$('dlg').hidden=true;stopMusic();$('overlay').hidden=true;$('touch').style.display='';const a=$('btnA');a.style.display='';a.textContent='조사';
 $('bossName').style.visibility='hidden';$('songInfo').textContent='';$('bvTitle').textContent='BEAT MACHINA · ORIGIN';K.clear();C3K.clear();stick.x=stick.y=0}
function c3Leave(){document.body.classList.remove('caseOn');const a=$('btnA');if(a)a.textContent='ATTACK';$('bossName').style.visibility=''}
function startCh3(){initAudio();story=false;enterGame();const s=c3Sv();
 if(!s.pro){c3Enter();CS={ci:-1,ph:'prologue',t0:performance.now(),hits:[],toast:[],got:new Set(),newIds:new Set(),D:null,parts:[]};say(C3_PROLOGUE,()=>{s.pro=1;saveNow();c3AskMode(()=>c3StartCase(0))});return}
 const cur=s.cur,maxc=Math.min(s.ci,C3CASES.length-1);
 if(maxc===0&&!(cur&&cur.ci===0&&cur.got.length)){c3Enter();c3StartCase(0);return}
 const btns=[];if(cur&&cur.ci<=maxc&&C3CASES[cur.ci])btns.push(['▶ 이어서 · CASE '+String(cur.ci+1).padStart(2,'0')+' '+C3CASES[cur.ci].title,()=>{$('overlay').hidden=true;c3Enter();c3StartCase(cur.ci,true)},true]);
 for(let i=0;i<=maxc;i++){const D=C3CASES[i],b=s.best[i];btns.push(['CASE '+String(i+1).padStart(2,'0')+' · '+D.title+(b?'  ['+b+']':''),()=>{$('overlay').hidden=true;c3Enter();c3StartCase(i)},false])}
 btns.push(['프롤로그 다시 보기',()=>{$('overlay').hidden=true;c3Enter();CS={ci:-1,ph:'prologue',t0:performance.now(),hits:[],toast:[],got:new Set(),newIds:new Set(),D:null,parts:[]};say(C3_PROLOGUE,()=>c3StartCase(0))},false]);
 btns.push([(s.skip?'⚔ 추리 건너뛰기: 켜짐':'🔍 추리 건너뛰기: 꺼짐'),()=>{s.skip=!s.skip;saveNow();$('overlay').hidden=true;startCh3()},false]);btns.push(['로비로',()=>{toLobby()},false]);
 mode='case';CS=null;$('touch').style.display='none';showOverlay('CHAPTER 3 · ORIGIN','사건 파일','해결한 사건은 다시 조사할 수 있어요. <span style="color:#9aa">(처음부터 다시 풀면 랭크를 갱신할 수 있어요)</span>',btns)}
function c3StartCase(ci,resume){const D=C3CASES[ci],now=performance.now();c3Enter();
 CS={ci,D,ph:'title',t0:now,got:new Set(),newIds:new Set(),seen:{},mistakes:0,hints:0,cam:0,target:null,toast:[],hits:[],note:null,rw:null,iv:null,dd:null,broken:new Set(),dq:0,flags:{},lastN:-1,parts:[],ivDone:false,shake:0,resume:false};
 const cur=c3Sv().cur;if(resume&&cur&&cur.ci===ci){CS.got=new Set(cur.got);CS.seen=cur.seen||{};CS.broken=new Set((cur.broken||[]).map(v=>typeof v==='number'?'0:'+v:v));CS.ddCh=cur.ddCh;CS.mistakes=cur.mistakes||0;CS.hints=cur.hints||0;CS.dq=cur.dq||0;CS.ivDone=!!cur.ivDone;CS.flags=cur.flags||{};CS.resume=true}
 if(!CS.resume)for(const id of D.startClues||[])CS.got.add(id);
 P.x=D.start[0];P.y=D.start[1];P.face={x:1,y:0};P.dash=null;P.hp=P.maxhp;P.inv=0;c3Persist()}
function c3Advance(){if(!CS)return;const ph=CS.ph;if(performance.now()-CS.t0<600)return;
 if(ph==='title'){CS.ph='intro';if(CS.resume){CS.ph='explore';say([['똑딱','이어서 조사하자, 하루! 수첩(N)을 다시 보면 떠오를 거야.']]);return}say(CS.D.intro,()=>{if(c3Sv().skip){c3SkipCase();return}CS.ph='explore';c3Tut('explore')});return}
 if(ph==='actend'||ph==='fin'){toLobby();return}
 if(ph==='actbreak'){const n=CS.ci+1;c3StartCase(n);return}}
function c3Tut(k){const s=c3Sv();if(s.tut[k])return;const L=C3_TUT[k];if(!L)return;s.tut[k]=1;saveNow();say(L.map(l=>[l[0],isTouchUI()&&l[2]?l[2]:l[1]]))}
/* ---------- 탐색 ---------- */
function c3Move(dx,dy){const sc=CS.D.scene,inB=(x,y)=>(sc.block||[]).some(b=>x>b[0]&&x<b[0]+b[2]&&y>b[1]&&y<b[1]+b[3]);
 let nx=clamp(P.x+dx,12,sc.w-12),ny=clamp(P.y+dy,sc.y0,sc.y1);if(inB(nx,ny)){if(!inB(nx,P.y))ny=P.y;else if(!inB(P.x,ny))nx=P.x;else{nx=P.x;ny=P.y}}P.x=nx;P.y=ny}
function c3Targets(){const D=CS.D,t=[];for(const s of D.spots)if(!s.cond||s.cond(CS))t.push({kind:'spot',s,x:s.x,y:s.y,r:s.r||30});for(const n of D.npcs)if(!n.cond||n.cond(CS))t.push({kind:'npc',n,x:n.x,y:n.y,r:32});return t}
function c3Interact(t){const now=performance.now();
 if(t.kind==='spot'){const s=t.s;if(s.rewind){c3RwOpen();return}const first=!CS.seen[s.id];CS.seen[s.id]=1;let L=typeof s.look==='function'?s.look(CS,first):(!first&&s.again?s.again:s.look);
  say(L,()=>{if(s.give){const gs=typeof s.give==='function'?s.give(CS):s.give;(Array.isArray(gs)?gs:[gs]).forEach(g=>g&&c3Give(g))}if(s.after)s.after(CS);c3Persist()});return}
 const n=t.n,w=c3IvFor(n.id);
 if(w>=0){const IV=c3IVS()[w];say(CS.flags['ivTried'+w]?IV.retry:IV.pre,()=>c3IvOpen(w));return}
 const L=typeof n.talk==='function'?n.talk(CS):n.talk;CS.flags['t_'+n.id]=(CS.flags['t_'+n.id]||0)+1;say(L,()=>{if(n.give){const g=typeof n.give==='function'?n.give(CS):n.give;(Array.isArray(g)?g:[g]).forEach(x=>x&&c3Give(x))}c3Persist()})}
function caseAction(){if(!CS||dlg.active||!$('overlay').hidden||paused)return;const ph=CS.ph;
 if(c3Card(ph)){c3Advance();return}
 if(CS.note){c3NoteOk();return}
 if(ph==='explore'){if(CS.target)c3Interact(CS.target);return}
 if(ph==='rewind'){c3RwCapture();return}
 if(ph==='interro'){c3IvPress();return}
 if(ph==='deduce'){c3DdOk();return}}
function updateCase(now,dt){if(!CS)return;const ph=CS.ph;
 if(ph==='explore'&&!CS.note){if(!dlg.active&&$('overlay').hidden)stepPlayer(dt,now,c3Move,82);const sc=CS.D.scene;CS.cam=clamp(P.x-W/2,0,Math.max(0,sc.w-W));
  let best=null,bd=1e9;for(const t of c3Targets()){const d=Math.hypot(P.x-t.x,(P.y-t.y)*1.3);if(d<t.r&&d<bd){bd=d;best=t}}CS.target=best}
 if(ph==='rewind')c3RwUpdate(now,dt);
 if(ph==='interro')c3IvUpdate(now,dt);
 c3Music(now);
 for(const q of CS.parts){q.x+=q.vx*dt;q.y+=q.vy*dt;q.vy+=(q.g||0)*dt;q.l-=dt}CS.parts=CS.parts.filter(q=>q.l>0);
 CS.toast=CS.toast.filter(t=>now-t.t<2600)}
/* 음악: 오르골 느낌의 추리 테마 */
const C3MEL={explore:['A4','-','C5','E5','D5','-','C5','-','B4','-','G4','A4','-','-','E4','-','F4','-','A4','C5','B4','-','G4','-','A4','-','-','-','-','-','-','-'],
 rewind:['E5','-','D5','C5','-','B4','-','A4','C5','-','E5','-','-','-','A5','-','G5','-','E5','-','D5','-','C5','-','B4','-','-','-','-','-','-','-'],
 deduce:['A4','C5','E5','A5','G5','E5','C5','E5','F4','A4','C5','F5','E5','C5','A4','C5','D4','F4','A4','D5','C5','A4','F4','A4','E4','G4','B4','E5','D5','B4','G4','B4']};
function c3Music(now){if(!CS||paused)return;const ph=CS.ph,key=ph==='rewind'?'rewind':ph==='deduce'||ph==='truth'?'deduce':ph==='interro'||ph==='prologue'?null:'explore';if(!key)return;
 const bpm=key==='deduce'?112:key==='rewind'?70:78,step=60000/bpm/2,n=Math.floor((now-CS.t0)/step);if(n===CS.lastN)return;CS.lastN=n;const mel=C3MEL[key],nt=mel[n%mel.length];
 if(nt!=='-'){const f=N5[nt];sfx(f,.5,'sine',.022,f);sfx(f*2,.18,'triangle',.006,f*2)}
 if(n%8===0){const r=[110,87,131,98][Math.floor(n/16)%4];sfx(r,.9,'sine',.03,r)}
 if(key==='rewind'&&n%2===0)sfx(3200,.015,'square',.006,3200)}
/* ---------- 수첩 ---------- */
function c3List(){return [...CS.got].filter(id=>CS.D.clues[id])}
function c3NoteOpen(md,cb,title){if(!CS)return;CS.note={sel:0,mark:[],mode:md||'view',cb:cb||null,title:title||'',t0:performance.now(),scroll:0};K.clear();sfx(520,.08,'triangle',.04,780);if(md!=='pick')c3Tut('note')}
function c3NoteClose(v){const n=CS.note;CS.note=null;sfx(390,.06,'triangle',.03,260);if(n&&n.mode==='pick'&&n.cb)n.cb(v===undefined?null:v)}
function c3NoteOk(){const n=CS.note,L=c3List();if(!L.length){c3NoteClose();return}const id=L[clamp(n.sel,0,L.length-1)];CS.newIds.delete(id);
 if(n.mode==='pick'){c3NoteClose(id);return}
 const k=n.mark.indexOf(id);if(k>=0)n.mark.splice(k,1);else{n.mark.push(id);sfx(660,.06,'square',.03,990)}
 if(n.mark.length===2){const [a,b]=n.mark;n.mark=[];c3Combine(a,b)}}
function c3Combine(a,b){const cb=(CS.D.combos||[]).find(c=>(c[0]===a&&c[1]===b)||(c[0]===b&&c[1]===a));
 if(!cb){sfx(140,.2,'square',.04,100);say([['똑딱',C3_NOPE[Math.floor(RND()*C3_NOPE.length)]]]);return}
 if(c3Has(cb[2])){say([['똑딱','그건 이미 알아낸 사실이야. 「'+c3Clue(cb[2]).name+'」']]);return}
 CS.flash=performance.now();sfx(523,.2,'triangle',.05,1046);setTimeout(()=>sfx(784,.3,'triangle',.05,1568),120);say(cb[3],()=>{c3Give(cb[2])})}
function c3NoteKey(code){const n=CS.note,L=c3List(),len=Math.max(1,L.length);
 if(code==='ArrowUp'||code==='KeyW'){n.sel=(n.sel+len-1)%len;sfx(700,.03,'square',.015)}
 else if(code==='ArrowDown'||code==='KeyS'){n.sel=(n.sel+1)%len;sfx(700,.03,'square',.015)}
 else if(code==='Enter'||code==='Space'||code==='KeyJ'||code==='KeyZ')c3NoteOk();
 else if(code==='Escape'||code==='KeyN'||code==='Tab'||code==='Backspace')c3NoteClose();
 else if(code==='KeyH'&&n.mode==='view')c3HintAsk();
 else if(code==='KeyR'&&n.mode==='view'){c3NoteClose();c3DdOpen()}
 else return false;return true}
/* ---------- 힌트 ---------- */
function c3HintAsk(){if(!CS||!CS.D)return;const h=(CS.D.hints||[]).find(h=>h.c(CS));
 if(!h){say([['똑딱','지금은 딱히 떠오르는 게 없어. 네 추리를 믿어!']]);return}
 showOverlay('똑딱의 힌트','힌트를 들을까요?','힌트를 들으면 <b style="color:#ff9aa8">사건 랭크</b>가 내려가요.<br><span style="color:#9aa">지금까지 힌트 '+CS.hints+'회 · 실수 '+CS.mistakes+'회</span>',[['힌트 듣기',()=>{$('overlay').hidden=true;CS.hints++;c3Persist();say(h.L.map(x=>Array.isArray(x)?x:['똑딱',x]))},true],['스스로 풀기',()=>{$('overlay').hidden=true},false]])}
/* ---------- 시간 되감기 ---------- */
function c3RwOpen(){const R0=CS.D.rewind;CS.ph='rewind';CS.rw={t:R0.start||R0.t0,play:false,sel:0,tg:[],t0:performance.now(),hold:0,lastTick:0,flash:0};CS.note=null;sfx(1200,.6,'sine',.04,200);CS.flash=performance.now();c3Tut('rewind')}
function c3RwClose(){CS.ph='explore';CS.rw=null;sfx(200,.5,'sine',.04,1200);CS.flash=performance.now()}
function c3Pose(tr,t){if(t<=tr[0][0])return {x:tr[0][1],y:tr[0][2],p:tr[0][3]||'stand',mv:0,fl:tr[0][4]};for(let i=0;i<tr.length-1;i++){const a=tr[i],b=tr[i+1];if(t>=a[0]&&t<=b[0]){const k=(t-a[0])/Math.max(1e-6,b[0]-a[0]);const mv=(a[1]!==b[1]||a[2]!==b[2])&&a[3]!=='gone';return {x:a[1]+(b[1]-a[1])*k,y:a[2]+(b[2]-a[2])*k,p:a[3]||'stand',mv,fl:mv?b[1]<a[1]:a[4]}}}const z=tr[tr.length-1];return {x:z[1],y:z[2],p:z[3]||'stand',mv:0,fl:z[4]}}
function c3RwTargets(){const R0=CS.D.rewind,t=CS.rw.t,o=[];for(const g of R0.ghosts){const q=c3Pose(g.track,t);if(q.p==='gone')continue;o.push({g,q})}return o}
function c3RwUpdate(now,dt){const rw=CS.rw,R0=CS.D.rewind;if(CS.note||dlg.active||!$('overlay').hidden)return;
 let d=0;if(C3K.has('ArrowLeft')||C3K.has('KeyA'))d-=1;if(C3K.has('ArrowRight')||C3K.has('KeyD'))d+=1;
 if(d){rw.hold+=dt;const sp=rw.hold<.35?20:rw.hold<1.2?90:300;rw.t+=d*sp*dt;rw.play=false}else rw.hold=0;
 if(rw.play){rw.t+=dt*24;if(rw.t>=R0.t1){rw.t=R0.t1;rw.play=false}}
 rw.t=clamp(rw.t,R0.t0,R0.t1);const bin=Math.floor(rw.t/10);if(bin!==rw.lastTick){rw.lastTick=bin;sfx(2400,.012,'square',.008)}
 rw.tg=c3RwTargets();if(rw.sel>=rw.tg.length)rw.sel=Math.max(0,rw.tg.length-1)}
function c3RwCapture(){const rw=CS.rw,R0=CS.D.rewind,tg=rw.tg[rw.sel];rw.flash=performance.now();sfx(1760,.08,'square',.04,880);
 if(!tg){say([['','…아무것도 없는 시간이다.']]);return}const t=rw.t,id=tg.g.id;
 const ev=R0.events.find(e=>e.target===id&&t>=e.t0&&t<=e.t1&&(!e.need||e.need.every(c3Has)));
 if(ev){if(c3Has(ev.clue)){say([['똑딱','이 장면은 이미 수첩에 적었어.']]);return}say(ev.lines,()=>{c3Give(ev.clue);if(ev.after)ev.after(CS)});return}
 const nt=(R0.notes||[]).find(e=>e.target===id&&t>=e.t0&&t<=e.t1);if(nt){say(nt.lines);return}
 say([['',tg.g.name+'. '+c3Clock(t)+' — 특별한 건 보이지 않는다.']])}
function c3Clock(t){t=Math.round(t);const h=Math.floor(t/3600),m=Math.floor(t/60)%60,s=t%60;return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')}
function c3RwKey(code){const rw=CS.rw;
 if(code==='ArrowUp'||code==='KeyW'){if(rw.tg.length){rw.sel=(rw.sel+rw.tg.length-1)%rw.tg.length;sfx(900,.03,'square',.015)}}
 else if(code==='ArrowDown'||code==='KeyS'){if(rw.tg.length){rw.sel=(rw.sel+1)%rw.tg.length;sfx(900,.03,'square',.015)}}
 else if(code==='Space'||code==='KeyJ'||code==='KeyZ')c3RwCapture();
 else if(code==='Enter'||code==='KeyP'){rw.play=!rw.play;if(rw.play&&rw.t>=CS.D.rewind.t1)rw.t=CS.D.rewind.t0}
 else if(code==='Escape'||code==='KeyX'||code==='Backspace')c3RwClose();
 else if(code==='KeyN'||code==='Tab')c3NoteOpen('view');
 else if(code==='ArrowLeft'||code==='ArrowRight'||code==='KeyA'||code==='KeyD')return true;
 else return false;return true}
/* ---------- 박동 심문 ---------- */
function c3IvOpen(w){CS.ivw=w||0;CS.ph='interro';CS.flags['ivTried'+CS.ivw]=1;CS.iv={i:0,cred:5,beats:[],nb:performance.now()/1000+.3,t0:performance.now(),shake:0,flashOk:0,seenI:{0:1}};CS.iv.i=c3IvFirstOpen();c3Tut('interro')}
function c3IvFirstOpen(){const S=c3IV().stmts;for(let i=0;i<S.length;i++)if(!c3Bk(i))return i;return 0}
function c3HB(s){return c3Bk(CS.iv.i)?'calm':s.hb}
function c3IvUpdate(now,dt){const iv=CS.iv,S=c3IV().stmts[iv.i],t=now/1000;if(!S)return;const hb=c3HB(S);
 while(iv.nb<t+1.2){const b={t:iv.nb,a:1};let dtb;if(hb==='calm')dtb=.86+RND()*.04;else if(hb==='fast')dtb=.44+RND()*.03;else{const r=RND();dtb=r<.62?.7+RND()*.06:r<.8?1.3:.34;b.a=RND()<.3?1.5:1}iv.beats.push(b);iv.nb+=dtb}
 iv.beats=iv.beats.filter(b=>b.t>t-3.4);for(const b of iv.beats)if(!b.snd&&b.t<=t){b.snd=1;if(!dlg.active&&$('overlay').hidden&&!CS.note){sfx(58,.14,'sine',.14*b.a,38);setTimeout(()=>sfx(52,.1,'sine',.08,34),110)}}}
function c3IvWave(t){let y=0;for(const b of CS.iv.beats){const d=t-b.t;if(d<-.05||d>.45)continue;if(d<0)y+=-.08*(1+d/.05);else if(d<.03)y+=(d/.03)*-1*b.a;else if(d<.06)y+=(-1+(d-.03)/.03*1.35)*b.a;else if(d<.09)y+=(.35-(d-.06)/.03*.35)*b.a;else if(d>.2&&d<.36)y+=-.16*Math.sin((d-.2)/.16*Math.PI)}return y}
function c3IvNav(d){const n=c3IV().stmts.length;CS.iv.i=(CS.iv.i+d+n)%n;CS.iv.seenI[CS.iv.i]=1;sfx(620,.05,'triangle',.03,720)}
function c3IvPress(){const S=c3IV().stmts[CS.iv.i],IV=c3IV();if(c3Bk(CS.iv.i)){say(S.brkAgain||[[IV.name,S.truth||S.txt]]);return}
 say(S.press,()=>{if(S.pressGive)c3Give(S.pressGive)})}
function c3IvPresent(){const IV=c3IV(),i=CS.iv.i,S=IV.stmts[i];if(c3Bk(i)){say([['똑딱','그 증언은 이미 무너뜨렸어. 다른 증언을 보자.']]);return}
 c3NoteOpen('pick',id=>{if(!id)return;
  if(S.lie&&(S.by===id||(S.alt&&S.alt.includes(id)))){c3BkAdd(i);CS.iv.flashOk=performance.now();sfx(392,.12,'square',.06,784);setTimeout(()=>sfx(1046,.4,'triangle',.06,1568),100);
   say([['하루','— 잠깐! 「'+c3Clue(id).name+'」. 이거랑 말이 안 맞잖아.']].concat(S.brk),()=>{if(S.give)c3Give(S.give);c3Persist();
    if(IV.stmts.every((s,k)=>!s.lie||c3Bk(k))){CS.ivDone=c3AllDone();c3Persist();say(IV.done,()=>{CS.ph='explore';CS.iv=null;if(IV.doneGive)c3Give(IV.doneGive);if(CS.ivDone)c3Tut('deduce')})}else{const nx=IV.stmts.findIndex((s,k)=>s.lie&&!c3Bk(k));}})}
  else{CS.iv.cred--;c3Mistake();CS.iv.shake=performance.now();const W0=IV.wrong[Math.floor(RND()*IV.wrong.length)];
   say([[IV.name,W0],['똑딱',S.lie?'…거짓말 같은데, 그 단서로는 반박이 안 돼. 신뢰도가 떨어졌어!':'…그 말은 사실이었나 봐. 괜히 몰아붙였어. 신뢰도가 떨어졌어!']],()=>{
    if(CS.iv.cred<=0){say(IV.fail,()=>{CS.ph='explore';CS.iv=null})}})}},'증언을 반박할 단서를 고르세요')}
function c3IvKey(code){if(code==='ArrowLeft'||code==='KeyA')c3IvNav(-1);else if(code==='ArrowRight'||code==='KeyD')c3IvNav(1);
 else if(code==='Space'||code==='Enter'||code==='KeyJ'||code==='KeyZ')c3IvPress();
 else if(code==='KeyE'||code==='KeyC'||code==='KeyQ')c3IvPresent();
 else if(code==='KeyN'||code==='Tab')c3NoteOpen('view');
 else if(code==='Escape'||code==='Backspace'){say([['똑딱','심문은 나중에 다시 할 수 있어. (신뢰도는 다시 5로 돌아가)']],()=>{CS.ph='explore';CS.iv=null})}
 else return false;return true}
/* ---------- 추리 ---------- */
function c3DdOpen(){if(!CS.ivDone){const L=c3IVS(),w=L.findIndex((_,k)=>!c3WDone(k));say([['똑딱','아직 추리하기엔 일러. 증언이 부족해… 누군가 숨기는 게 있어. 먼저 '+(L[w]?L[w].name:'')+'의 이야기를 제대로 들어 보자.']]);return}
 if(CS.ddCh==null)CS.ddCh=5;CS.ph='deduce';CS.dd={sel:0,t0:performance.now(),res:null,resT:0};CS.note=null;sfx(330,.3,'sawtooth',.03,660);c3Tut('deduce2')}
function c3DdOk(){const Q=CS.D.deduce[CS.dq];if(!Q)return;if(Q.type==='clue'){c3NoteOpen('pick',id=>{if(id)c3DdAnswer(id===Q.ans||(Q.alt&&Q.alt.includes(id)),id)},Q.q);return}
 const o=Q.opts[CS.dd.sel];if(o===undefined)return;c3DdAnswer(CS.dd.sel===Q.ans)}
function c3DdAnswer(ok,id){const Q=CS.D.deduce[CS.dq];CS.dd.res=ok?'ok':'ng';CS.dd.resT=performance.now();
 if(ok){sfx(523,.15,'square',.05,1046);setTimeout(()=>sfx(784,.15,'square',.05,1568),110);setTimeout(()=>sfx(1046,.4,'triangle',.05,2093),220);
  say(Q.ok,()=>{CS.dq++;CS.dd.sel=0;CS.dd.res=null;c3Persist();if(CS.dq>=CS.D.deduce.length){CS.ph='truth';say(CS.D.truth,()=>caseBoss())}})}
 else{c3Mistake();CS.ddCh=(CS.ddCh==null?5:CS.ddCh)-1;c3Persist();const left=CS.ddCh;
  if(left<=0){say((Q.ng||[['똑딱','…아니야.']]).concat([['똑딱','…기회를 전부 써 버렸어. 추리가 엉켜 버렸어.'],['똑딱','처음부터 다시 생각해 보자. 단서를 다시 읽고, 준비되면 추리(R)를 다시 시작해!'],['','(추리 처음부터 · 기회 5회 회복)']]),()=>{CS.dq=0;CS.ddCh=5;CS.ph='explore';CS.dd=null;c3Persist()});return}
  say((Q.ng||[['똑딱','…아니야. 그러면 설명이 안 되는 게 있어. 다시 생각해 보자.']]).concat([['','(기회 -1 · 남은 기회 '+left+'번)']]),()=>{CS.dd.res=null})}}
function c3DdKey(code){const Q=CS.D.deduce[CS.dq];if(!Q)return true;const n=Q.opts?Q.opts.length:1;
 if(code==='ArrowUp'||code==='KeyW'){CS.dd.sel=(CS.dd.sel+n-1)%n;sfx(700,.03,'square',.015)}
 else if(code==='ArrowDown'||code==='KeyS'){CS.dd.sel=(CS.dd.sel+1)%n;sfx(700,.03,'square',.015)}
 else if(code==='Space'||code==='Enter'||code==='KeyJ'||code==='KeyZ')c3DdOk();
 else if(code==='KeyN'||code==='Tab')c3NoteOpen('view');
 else if(code==='Escape'||code==='Backspace'){say([['똑딱','좋아, 조금 더 조사하고 오자. (답한 질문은 그대로 남아 있어)']],()=>{CS.ph='explore';CS.dd=null})}
 else if(code==='KeyH')c3HintAsk();
 else return false;return true}
/* ---------- 보스 ---------- */
let _c3Swap=null;
function c3SwapIn(b){c3SwapOut();const B0=BOSSES[b.base];_c3Swap={bi:b.base,meta:BOSS_META[b.base],phase:STORY[b.base]&&STORY[b.base].phase,dying:STORY[b.base]&&STORY[b.base].dying,name:B0.name,en:B0.en};B0.name=b.name;B0.en=b.en;BOSS_META[b.base]=Object.assign({},_c3Swap.meta,{epi:b.epi});if(STORY[b.base]){STORY[b.base].phase=b.phase||_c3Swap.phase;STORY[b.base].dying=b.dying||_c3Swap.dying}}
function c3SwapOut(){if(!_c3Swap)return;const s=_c3Swap;BOSS_META[s.bi]=s.meta;BOSSES[s.bi].name=s.name;BOSSES[s.bi].en=s.en;if(STORY[s.bi]){STORY[s.bi].phase=s.phase;STORY[s.bi].dying=s.dying}_c3Swap=null}
function caseBoss(){const D=CS.D,b=D.boss;CS.ph='boss';CS.note=null;c3Persist();c3Leave();c3SwapIn(b);story=false;startFight(b.base,false);
 G.caseFight=CS.ci;
 const perfect=CS.mistakes===0&&CS.hints===0;G.hp=G.maxHp=Math.round(G.maxHp*(b.hpMul||1));
 $('bossName').textContent=b.name+'  '+b.en;$('bvTitle').textContent='BEAT MACHINA · ORIGIN · CASE '+String(CS.ci+1).padStart(2,'0');
 const oa=G.afterIntro;G.afterIntro=()=>{say(b.intro.concat([['똑딱',perfect?'완벽한 추리였어! 이제 싸움만 남았어, 하루!':'진상은 밝혀졌어. 가자, 하루!']]),()=>{oa?oa():beginCount()})}}
function c3Rank(){const s=CS.mistakes+CS.hints*.75;return s===0?'S':s<=2?'A':s<=4?'B':'C'}
function c3BossEnd(won){G.state='result';G.won=won;stopMusic();c3SwapOut();const ci=CS.ci,D=CS.D;
 if(!won){showOverlay('CASE '+String(ci+1).padStart(2,'0'),'쓰러졌다…','추리는 끝났어요. 싸움만 다시 하면 돼요.',[['다시 도전 →',()=>{$('overlay').hidden=true;caseBoss()},true],['로비로',toLobby,false]]);return}
 const rank=CS.skipped?'—':c3Rank(),s=c3Sv(),o='SABC';if(!CS.skipped&&(!s.best[ci]||s.best[ci]==='—'||o.indexOf(rank)<o.indexOf(s.best[ci])))s.best[ci]=rank;else if(CS.skipped&&!s.best[ci])s.best[ci]='—';const coins=120+ci*40+(rank==='S'?150:rank==='A'?80:30);saveData.coins=(saveData.coins||0)+coins;s.ci=Math.max(s.ci,ci+1);s.cur=null;saveNow();
 const col={S:'#fff6cf',A:'#ffd166',B:'#cfe8d0',C:'#9aa'}[rank]||'#9aa';
 showOverlay('CASE '+String(ci+1).padStart(2,'0')+' · SOLVED','「'+D.title+'」 해결!','<b style="font-size:30px;color:'+col+'">추리 랭크 '+rank+'</b><br>실수 '+CS.mistakes+'회 · 힌트 '+CS.hints+'회 · 모은 단서 '+c3List().length+'개<br><b style="color:#ffd166">🪙 +'+coins+' 코인</b> (보유 '+saveData.coins+')',[['계속 →',()=>{$('overlay').hidden=true;c3AfterBoss()},true]])}
function c3AfterBoss(){const D=CS.D,ci=CS.ci;c3Enter();CS.ph='outro';CS.t0=performance.now();P.x=D.start[0];P.y=D.start[1];P.face={x:1,y:0};
 say(D.outro,()=>{if(ci+1<C3CASES.length)c3StartCase(ci+1);else{CS.ph='actend';CS.t0=performance.now();sfx(262,1.2,'sine',.05,262);setTimeout(()=>sfx(392,1.4,'sine',.05,392),400);setTimeout(()=>sfx(523,2,'sine',.05,523),800)}})}
/* ---------- 입력 ---------- */
addEventListener('keydown',e=>{if(mode!=='case')return;if(!e.repeat)C3K.add(e.code);if(!CS||paused||dlg.active)return;const ov=$('overlay');if(ov&&!ov.hidden)return;
 if(e.repeat&&!/Arrow|Key[WASD]/.test(e.code))return;let used=false;
 if(CS.note)used=c3NoteKey(e.code);
 else if(CS.ph==='explore'){if(e.code==='KeyN'||e.code==='Tab'){c3NoteOpen('view');used=true}else if(e.code==='KeyH'){c3HintAsk();used=true}else if(e.code==='KeyR'){c3DdOpen();used=true}}
 else if(CS.ph==='rewind')used=c3RwKey(e.code);
 else if(CS.ph==='interro')used=c3IvKey(e.code);
 else if(CS.ph==='deduce')used=c3DdKey(e.code);
 else if(c3Card(CS.ph)){if(e.code==='Space'||e.code==='Enter'){c3Advance();used=true}}
 if(used){e.preventDefault();e.stopPropagation()}},true);
addEventListener('keyup',e=>C3K.delete(e.code));
if(typeof cv!=='undefined'&&cv&&cv.addEventListener){
 const c3xy=e=>{const rc=cv.getBoundingClientRect();return [(e.clientX-rc.left)*W/rc.width,(e.clientY-rc.top)*H/rc.height]};
 cv.addEventListener('pointerdown',e=>{if(mode!=='case'||!CS||paused)return;if(dlg.active){e.preventDefault();dlgAdvance();return}const ov=$('overlay');if(ov&&!ov.hidden)return;
  const [x,y]=c3xy(e);for(let i=CS.hits.length-1;i>=0;i--){const h=CS.hits[i];if(x>=h.x&&x<=h.x+h.w&&y>=h.y&&y<=h.y+h.h){e.preventDefault();if(h.drag){CS.drag=h.drag;h.drag(x,y)}else h.fn(x,y);return}}
  if(c3Card(CS.ph))c3Advance()});
 cv.addEventListener('pointermove',e=>{if(mode==='case'&&CS&&CS.drag){const [x,y]=c3xy(e);CS.drag(x,y)}});
 addEventListener('pointerup',()=>{if(CS)CS.drag=null})}
/* ---------- 초상화 (새 인물) ---------- */
const _c3dp=drawPortrait;
const C3OLD=new Set(['윤서','하루','똑딱']);
drawPortrait=function(who){const L=C3LOOK[who];if(!L||(C3OLD.has(who)&&!(mode==='case'||(mode==='boss'&&G&&G.caseFight!=null))))return _c3dp(who);const cv2=$('dlgPortrait');if(!cv2)return;const x=cv2.getContext('2d');x.imageSmoothingEnabled=false;x.clearRect(0,0,56,56);cv2.style.display='block';
 const g=x.createLinearGradient(0,0,0,56);g.addColorStop(0,shade(L.bg||'#3a4a5a',.35));g.addColorStop(1,shade(L.bg||'#3a4a5a',.8));x.fillStyle=g;x.fillRect(0,0,56,56);
 const sp=vSprite('c3_'+who,L,L.skin||'#f0c8a0',0,false).g,s=4,oy=L.kid?14:8;for(let j=0;j<Math.min(sp.length,13);j++){const r=sp[j];for(let i=0;i<r.length;i++){const c=r[i];if(c){x.fillStyle=c;x.fillRect(i*s,oy+j*s,s,s)}}}
 x.fillStyle=L.bg||'#8a9aa8';x.fillRect(0,0,56,2);x.fillRect(0,54,56,2);x.fillRect(0,0,2,56);x.fillRect(54,0,2,56)};
const _c3dl=dlgLine;
dlgLine=function(){_c3dl();const who=dlg.q[dlg.i]&&dlg.q[dlg.i][0];const L=C3LOOK[who];if(L&&!C3OLD.has(who))$('dlgName').style.color=L.name||'#ffd98a'};
const _c3fe=fightEnd;
fightEnd=function(won){if(G&&G.caseFight!=null&&CS){if(G.state==='result')return;c3BossEnd(won);return}return _c3fe.apply(this,arguments)};
const _c3tl=toLobby;
toLobby=function(){c3SwapOut();c3Leave();if(mode==='case'){CS=null}return _c3tl.apply(this,arguments)};

function c3AskMode(next){showOverlay('CHAPTER 3 · ORIGIN','어떻게 플레이할까요?','이번 챕터는 <b style="color:#ffd98a">추리</b>(조사 · 심문 · 되감기)와 <b style="color:#ff9aa8">보스 전투</b>로 이뤄져 있어요.<br>전투만 하고 싶다면 추리를 건너뛸 수 있어요. 이야기와 선택은 그대로 나와요.<br><span style="color:#9aa">나중에 사건 파일 화면이나 조사 중 [스킵] 버튼으로 바꿀 수 있어요.</span>',
 [['🔍 추리하며 플레이',()=>{$('overlay').hidden=true;c3Sv().skip=false;saveNow();next()},true],['⚔ 전투만 하기',()=>{$('overlay').hidden=true;c3Sv().skip=true;saveNow();next()},false]])}
function c3SkipCase(){const D=CS.D;for(const id of Object.keys(D.clues))CS.got.add(id);CS.newIds.clear();CS.ivDone=true;CS.dq=D.deduce.length;CS.skipped=true;CS.note=null;CS.rw=null;CS.iv=null;CS.dd=null;CS.ph='truth';c3Persist();
 say([['','— 추리를 건너뛰었다. 이 사건의 진상은…']].concat(D.truth),()=>caseBoss())}
function c3SkipAsk(){showOverlay('추리 건너뛰기','이 사건의 추리를 건너뛸까요?','진상을 바로 보고 보스전으로 넘어가요. 추리 랭크는 기록되지 않아요.',[['⚔ 건너뛰고 전투',()=>{$('overlay').hidden=true;c3SkipCase()},true],['⚔ 앞으로도 계속 건너뛰기',()=>{$('overlay').hidden=true;c3Sv().skip=true;saveNow();c3SkipCase()},false],['취소',()=>{$('overlay').hidden=true},false]])}

/* ---------- CH3 그리기 : UI ---------- */
const _c3wc=new Map();
function c3Wrap(txt,maxW,font){const k=font+'|'+maxW+'|'+txt;let r=_c3wc.get(k);if(r)return r;ctx.font=font;r=[];for(const para of String(txt).split('\n')){let line='';for(const ch of para){const t=line+ch;if(ctx.measureText(t).width>maxW&&line){const sp=line.lastIndexOf(' ');if(sp>line.length*.5){r.push(line.slice(0,sp));line=line.slice(sp+1)+ch}else{r.push(line);line=ch}}else line=t}r.push(line)}if(_c3wc.size>600)_c3wc.clear();_c3wc.set(k,r);return r}
function c3Text(t,x,y,col,font,al){ctx.font=font||'11px monospace';ctx.textAlign=al||'left';ctx.fillStyle=col;ctx.fillText(t,x,y);ctx.textAlign='left'}
function c3Btn(x,y,w,h,label,fn,o){o=o||{};const hot=o.hot,dis=o.dis;R(x,y,w,h,dis?'#1a1e24':hot?'#3a2e14':'#1a2430');R(x,y,w,1,dis?'#2a2e34':hot?'#ffd98a':'#4a6a7a');R(x,y+h-1,w,1,'#05070a');R(x,y,1,h,dis?'#2a2e34':hot?'#ffd98a':'#4a6a7a');R(x+w-1,y,1,h,'#05070a');
 c3Text(label,x+w/2,y+h/2+4,dis?'#5a6068':hot?'#ffe9b0':'#d8e8f0','bold 10px monospace','center');if(fn&&!dis)CS.hits.push({x,y,w,h,fn})}
function c3Panel(x,y,w,h,a){RA(x,y,w,h,'#070a0e',a==null?.88:a);R(x,y,w,1,'#6a5a3a');R(x,y+h-1,w,1,'#6a5a3a');R(x,y,1,h,'#6a5a3a');R(x+w-1,y,1,h,'#6a5a3a');R(x+2,y+2,3,3,'#ffd98a');R(x+w-5,y+2,3,3,'#ffd98a');R(x+2,y+h-5,3,3,'#ffd98a');R(x+w-5,y+h-5,3,3,'#ffd98a')}
function c3Sil(key,L,skin,x,y,s,fl,col,al,sit,frame){const g=vSprite(key,L,skin,frame||0,sit).g,h=g.length,X=Math.round(x-7*s),Y=Math.round(y-h*s);ctx.globalAlpha=al;ctx.fillStyle=col;for(let j=0;j<h;j++){const r=g[j];for(let i=0;i<r.length;i++)if(r[i])ctx.fillRect(X+(fl?13-i:i)*s,Y+j*s,Math.ceil(s),Math.ceil(s))}ctx.globalAlpha=1;return {X,Y,h:h*s}}
function c3Person(id,L,x,y,now,o){o=o||{};const s=o.s||(L.kid?1.5:2),skin=L.skin||'#f0c8a0',key='c3_'+id;
 if(o.lie){ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.rotate(Math.PI/2);const r=vDrawPerson(key,L,skin,0,0,s,now,false,false,false);ctx.restore();return r}
 const r=vDrawPerson(key,L,skin,x,y,s,now,!!o.walk,!!o.fl,!!o.sit);if(L.prop&&!o.sit)try{vProp(L.prop,r.X,r.Y,s,!!o.fl,now,true)}catch(e){}if(L.cane&&!o.sit){const cx=o.fl?r.X-2:r.X+14*s+1;R(cx,r.Y+12*s,2,y-(r.Y+12*s),'#6a4a2a');R(cx-2,r.Y+12*s,5,2,'#8a6a3a')}return r}
function c3Tick(x,y,now){try{drawTick(ctx,x,y+Math.sin(now/300)*3,now,1)}catch(e){}}
function c3Hero(now,cam){const fl=P.face.x<0;try{drawKnight(ctx,P.x-cam-12,P.y-19,2,fl,P.walkOn?P.walkT:null,P.walkOn?null:now/430)}catch(e){}if(!(CS&&CS.D&&CS.D.noTick))c3Tick(P.x-cam+(fl?16:-16),P.y-30,now)}
function drawCase(now){if(!CS){R(0,0,W,H,'#05070a');return}CS.hits=[];const ph=CS.ph;
 if(ph==='prologue'){c3DrawPrologue(now);return}
 if(ph==='actend'){c3DrawActEnd(now);return}
 if(ph==='actbreak'){c3DrawActBreak(now);return}
 if(ph==='fin'){c3DrawFin(now);return}
 if(ph==='ending'){c3DrawEnding(now);return}
 const D=CS.D,sc=D.scene,cam=CS.cam=ph==='explore'||ph==='intro'||ph==='outro'||ph==='truth'||ph==='title'?clamp(P.x-W/2,0,Math.max(0,sc.w-W)):CS.cam||0;
 const rw=ph==='rewind'?CS.rw:null,sh=now-(CS.shake||0)<300?Math.round((RND()-.5)*6*(1-(now-CS.shake)/300)):0;
 ctx.save();ctx.translate(sh,0);
 sc.draw(now,cam,rw?rw.t:null,CS);
 if(rw){RA(0,0,W,H,'#0a2a5a',.42);c3DrawGhosts(now,cam)}
 else if(ph!=='interro'&&ph!=='deduce'){const ents=[];for(const n of D.npcs){if(n.cond&&!n.cond(CS))continue;ents.push({y:n.y,f:()=>{if(n.draw){n.draw(n.x-cam,n.y,now);return}const L=C3LOOK[n.name]||n.L;const fl=n.face==='auto'?P.x<n.x:!!n.fl;c3Person(n.name,L,n.x-cam,n.y,now,{fl,sit:n.sit,lie:n.lie});if(n.zz){const z=(now/1000)%1;ctx.font='bold 9px monospace';ctx.fillStyle='#b8c8ff';ctx.globalAlpha=1-z;ctx.fillText('z',n.x-cam+10+z*6,n.y-20-z*10);ctx.globalAlpha=1}}})}
  ents.push({y:P.y,f:()=>c3Hero(now,cam)});ents.sort((a,b)=>a.y-b.y);for(const e of ents)e.f()}
 if(sc.fg)sc.fg(now,cam,rw?rw.t:null,CS);
 if(sc.light&&!rw)sc.light(now,cam,CS);
 for(const q of CS.parts){ctx.globalAlpha=clamp(q.l,0,1);R(q.x-cam,q.y,q.s||2,q.s||2,q.c)}ctx.globalAlpha=1;
 ctx.restore();
 if(ph==='explore')c3DrawExploreHUD(now,cam);
 else if(ph==='title')c3DrawTitle(now);
 else if(ph==='rewind')c3DrawRewindUI(now,cam);
 else if(ph==='interro')c3DrawInterro(now);
 else if(ph==='deduce')c3DrawDeduce(now);
 else if(ph==='truth'){RA(0,0,W,H,'#000',.35)}
 if(CS.note)c3DrawNote(now);
 c3DrawToasts(now);
 const fa=now-(CS.flash||0);if(fa<400)RA(0,0,W,H,'#ffffff',.5*(1-fa/400))}
/* 탐색 HUD */
function c3DrawExploreHUD(now,cam){const D=CS.D;
 // 조사 지점 표시 (가까이 가야 반짝임)
 for(const s of D.spots){if(s.cond&&!s.cond(CS))continue;const mx=(s.mx!=null?s.mx:s.x)-cam,my=s.my!=null?s.my:s.y-40,d=Math.hypot(P.x-s.x,P.y-s.y);
  if(s.rewind){const t=now/1000;ctx.globalAlpha=.8;for(let k=0;k<3;k++){const a=t*2+k*2.1;R(mx+Math.cos(a)*9-1,my+Math.sin(a)*9-1,3,3,'#8ae8ff')}ctx.globalAlpha=1;R(mx-1,my-6,2,7,'#8ae8ff');R(mx,my,5,2,'#8ae8ff');continue}
  if(CS.seen[s.id]||d>110)continue;const a=clamp(1-(d-40)/70,0,1)*(.55+.45*Math.sin(now/220+s.x));ctx.globalAlpha=a;R(mx-1,my-4,2,2,'#fff6cf');R(mx-3,my-2,6,1,'#ffd98a');R(mx-1,my-6,2,8,'#ffd98a');ctx.globalAlpha=1}
 const t=CS.target;if(t&&!dlg.active){const IV=D.interro;let verb,name;if(t.kind==='spot'){verb=t.s.rewind?'시간 되감기':'살펴보기';name=t.s.label}else{name=t.n.name;verb=c3IvFor(t.n.id)>=0?'심문하기':'대화'}
  const tx=(t.kind==='spot'?(t.s.mx!=null?t.s.mx:t.s.x):t.n.x)-cam,ty=t.kind==='spot'?(t.s.my!=null?t.s.my:t.s.y-40)-14:t.n.y-62,lab=(isTouchUI()?'':'[SPACE] ')+verb+' · '+name;
  ctx.font='bold 10px monospace';const w=ctx.measureText(lab).width+14,bx=clamp(tx-w/2,4,W-w-4),by=Math.max(40,ty-8);R(bx,by,w,15,'#0a0e14');R(bx,by,w,1,verb==='심문하기'?'#ff6b7a':verb==='시간 되감기'?'#8ae8ff':'#ffd98a');c3Text(lab,bx+w/2,by+11,verb==='심문하기'?'#ffb0b8':'#ffe9b0','bold 10px monospace','center')}
 // 상단 사건 패널
 c3Panel(4,4,196,30,.82);c3Text('CASE '+String(CS.ci+1).padStart(2,'0')+' · '+D.title,12,17,'#ffd98a','bold 11px monospace');c3Text(D.place,12,29,'#9aaab8','9px monospace');
 const ready=CS.ivDone,newN=CS.newIds.size;
 c3Btn(W-238,6,56,22,'스킵',()=>c3SkipAsk());
 c3Btn(W-178,6,56,22,'수첩'+(isTouchUI()?'':' N')+(newN?' •':''),()=>c3NoteOpen('view'),{hot:newN>0});
 c3Btn(W-118,6,54,22,'힌트'+(isTouchUI()?'':' H'),()=>c3HintAsk());
 c3Btn(W-60,6,56,22,'추리'+(isTouchUI()?'':' R'),()=>c3DdOpen(),{hot:ready});
 c3Text('단서 '+c3List().length+(CS.mistakes?'  ·  실수 '+CS.mistakes:''),W-8,42,'#8a9aa8','9px monospace','right');
 if(!isTouchUI())c3Text('이동 WASD/방향키 · 조사 SPACE · 수첩 N · 힌트 H · 추리 R',8,H-6,'#6a7a88','9px monospace')}
/* 제목 카드 */
function c3DrawTitle(now){const D=CS.D,t=(now-CS.t0)/1000,a=clamp(t/0.8,0,1);RA(0,0,W,H,'#030508',.86);
 const cx=W/2,cy=132;ctx.globalAlpha=.16*a;ctx.strokeStyle='#ffd98a';ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,70,0,TAU);ctx.stroke();for(let i=0;i<12;i++){const an=i*TAU/12;R(cx+Math.cos(an)*62-1,cy+Math.sin(an)*62-1,3,3,'#ffd98a')}
 ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(cx,cy);const hA=(3+12/60)/12*TAU-Math.PI/2;ctx.lineTo(cx+Math.cos(hA)*34,cy+Math.sin(hA)*34);ctx.stroke();ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx,cy);const mA=12/60*TAU-Math.PI/2+Math.sin(now/90)*.01;ctx.lineTo(cx+Math.cos(mA)*52,cy+Math.sin(mA)*52);ctx.stroke();ctx.globalAlpha=1;ctx.lineWidth=1;
 ctx.globalAlpha=a;c3Text('CHAPTER 3  ·  ORIGIN  ·  제 '+(D.act||1)+' 막'+(C3ACTS[D.act||1]?'  「'+C3ACTS[D.act||1]+'」':''),cx,78,'#c8a868','bold 10px monospace','center');
 c3Text('CASE '+String(CS.ci+1).padStart(2,'0'),cx,112,'#8a9aa8','bold 14px monospace','center');
 ctx.font='bold 26px monospace';ctx.textAlign='center';shText('「'+D.title+'」',cx,146,'#fff6e0','#5a3a10');ctx.textAlign='left';
 c3Text(D.place+'  ·  '+D.when,cx,170,'#a8b8c8','11px monospace','center');
 R(cx-90,182,180,1,'#6a5a3a');c3Text(D.tagline,cx,200,'#d8c8a8','10px monospace','center');
 if(t>.6&&Math.floor(now/500)%2===0)c3Text(isTouchUI()?'— 화면을 터치 —':'— SPACE / 클릭 —',cx,262,'#8a9aa8','10px monospace','center');ctx.globalAlpha=1}
/* 토스트 */
function c3DrawToasts(now){let y=46,_n=0;for(const t of CS.toast){if(now<t.t||_n>=3)continue;_n++;const a=now-t.t,al=a<200?a/200:a>2200?(2600-a)/400:1,sl=a<200?(1-a/200)*20:0;ctx.globalAlpha=clamp(al,0,1);
 const lab=(t.deduce?'추리 완성 — ':'단서 획득 — ')+t.txt;ctx.font='bold 11px monospace';const w=ctx.measureText(lab).width+30,x=W/2-w/2;R(x,y-sl,w,20,'#0a0e14');R(x,y-sl,w,1,t.deduce?'#8ff0b0':'#ffd98a');R(x,y+19-sl,w,1,t.deduce?'#8ff0b0':'#ffd98a');
 R(x+8,y+5-sl,8,10,t.deduce?'#8ff0b0':'#e8dcc0');R(x+9,y+7-sl,6,1,'#6a5a3a');R(x+9,y+10-sl,6,1,'#6a5a3a');c3Text(lab,x+w/2+6,y+14-sl,t.deduce?'#c8ffe0':'#fff0c8','bold 11px monospace','center');y+=24}ctx.globalAlpha=1}
/* 수첩 */
const C3KIND={thing:['물건','#ffd98a'],record:['기록','#8ae8ff'],word:['증언','#ffb0c8'],time:['잔향','#b8a8ff'],deduce:['추리','#8ff0b0']};
function c3DrawNote(now){const n=CS.note,L=c3List(),a=clamp((now-n.t0)/160,0,1);RA(0,0,W,H,'#000',.6*a);const X=16,Y=14+(1-a)*10,Wd=W-32,Hh=H-28;
 R(X-3,Y-3,Wd+6,Hh+6,'#2a1a10');R(X-2,Y-2,Wd+4,Hh+4,'#5a3a20');R(X,Y,Wd,Hh,'#e8dcc0');for(let y=Y+30;y<Y+Hh-30;y+=14)R(X+180,y,Wd-190,1,'#d4c4a0');R(X+172,Y+6,2,Hh-12,'#c8a878');
 for(let k=0;k<6;k++){R(X+171,Y+20+k*40,4,4,'#8a7a5a')}
 c3Text(n.mode==='pick'?(n.title||'단서를 고르세요'):'하루의 수첩',X+12,Y+18,'#3a2410','bold 12px monospace');c3Text(n.mode==='pick'?'':'단서 '+L.length+'개',X+160,Y+18,'#8a6a4a','9px monospace','right');
 if(!L.length){c3Text('아직 적은 게 없어요.',X+14,Y+48,'#6a5a4a','11px monospace')}
 const rows=13,sel=clamp(n.sel,0,Math.max(0,L.length-1));n.sel=sel;if(sel<n.scroll)n.scroll=sel;if(sel>=n.scroll+rows)n.scroll=sel-rows+1;
 for(let i=0;i<Math.min(rows,L.length-n.scroll);i++){const k=i+n.scroll,id=L[k],c=CS.D.clues[id],y=Y+28+i*16,on=k===sel,mk=n.mark.includes(id),kd=C3KIND[c.kind]||C3KIND.thing;
  if(on)R(X+6,y,160,15,'#3a2a14');else if(mk)R(X+6,y,160,15,'#c8b890');R(X+10,y+3,9,9,kd[1]);R(X+11,y+4,7,7,shade(kd[1],.6));
  let nm=c.name;ctx.font='10px monospace';while(ctx.measureText(nm).width>118&&nm.length>2)nm=nm.slice(0,-2)+'…';c3Text(nm,X+24,y+11,on?'#ffe9b0':'#3a2410',(on?'bold ':'')+'10px monospace');if(CS.newIds.has(id))c3Text('NEW',X+162,y+11,'#c83a3a','bold 8px monospace','right');if(mk)c3Text('◆',X+150,y+11,on?'#ffd98a':'#6a3a10','bold 10px monospace','right');
  CS.hits.push({x:X+6,y,w:160,h:15,fn:()=>{if(n.sel===k)c3NoteOk();else{n.sel=k;sfx(700,.03,'square',.015)}}})}
 if(L.length>rows){c3Text((n.scroll+1)+'-'+Math.min(L.length,n.scroll+rows)+' / '+L.length,X+90,Y+Hh-40,'#8a6a4a','9px monospace','center');c3Btn(X+10,Y+Hh-52,30,14,'▲',()=>{n.sel=Math.max(0,n.sel-1)});c3Btn(X+136,Y+Hh-52,30,14,'▼',()=>{n.sel=Math.min(L.length-1,n.sel+1)})}
 if(L.length){const id=L[sel],c=CS.D.clues[id],kd=C3KIND[c.kind]||C3KIND.thing,dx=X+186;R(dx,Y+26,50,13,shade(kd[1],.45));c3Text(kd[0],dx+25,Y+36,'#fff','bold 9px monospace','center');
  ctx.font='bold 14px monospace';c3Text(c.name,dx,Y+58,'#2a1408','bold 14px monospace');const ls=c3Wrap(c.desc,Wd-200,'11px monospace');ls.forEach((l,i)=>c3Text(l,dx,Y+80+i*14,'#3a2a1a','11px monospace'));
  if(c.draw){try{c.draw(dx+(Wd-200)/2,Y+Hh-86,now)}catch(e){}}}
 const by=Y+Hh-26;if(n.mode==='pick'){c3Btn(X+Wd-200,by,96,20,'제시 '+(isTouchUI()?'':'ENTER'),()=>c3NoteOk(),{hot:true});c3Btn(X+Wd-98,by,88,20,'취소 '+(isTouchUI()?'':'ESC'),()=>c3NoteClose())}
 else{c3Text(n.mark.length?'「'+CS.D.clues[n.mark[0]].name+'」와(과) 연결할 단서를 고르세요':(isTouchUI()?'단서를 두 번 눌러 표시 → 두 개를 이으면 조합':'ENTER로 두 단서를 표시하면 조합해요'),X+186,by-8,n.mark.length?'#a83a10':'#8a6a4a','9px monospace');
  c3Btn(X+186,by,66,20,'힌트'+(isTouchUI()?'':' H'),()=>c3HintAsk());c3Btn(X+256,by,66,20,'추리'+(isTouchUI()?'':' R'),()=>{c3NoteClose();c3DdOpen()},{hot:CS.ivDone&&CS.ph==='explore',dis:CS.ph!=='explore'});c3Btn(X+Wd-72,by,62,20,'닫기'+(isTouchUI()?'':' N'),()=>c3NoteClose())}}
/* 되감기 */
function c3DrawGhosts(now,cam){const rw=CS.rw,R0=CS.D.rewind,list=rw.tg.slice().sort((a,b)=>a.q.y-b.q.y);
 for(const {g,q} of list){const x=q.x-cam,y=q.y;if(g.draw){g.draw(x,y,now,rw.t,q);continue}const L=C3LOOK[g.who]||g.L,s=L.kid?1.5:2,fr=q.mv?Math.floor(now/180)%2:0;
  if(q.p==='lie'){ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.rotate(Math.PI/2);c3Sil('c3_'+g.who,L,L.skin||'#f0c8a0',0,0,s,false,g.shadow?'#04060a':'#9ae8ff',g.shadow?.85:.5,false,0);ctx.restore();continue}
  if(g.shadow){for(let k=0;k<3;k++)c3Sil('c3_'+g.who,L,L.skin||'#f0c8a0',x+Math.sin(now/200+k*2)*1.5,y,s,!!q.fl,'#04060a',.35,q.p==='sit',fr);c3Sil('c3_'+g.who,L,L.skin||'#f0c8a0',x,y,s,!!q.fl,'#020306',.8,q.p==='sit',fr);
   if(Math.floor(now/90)%3===0)CS.parts.push({x:q.x+(RND()-.5)*14,y:y-RND()*40,vx:(RND()-.5)*6,vy:-8,l:.8,c:'#1a1a22',s:2})}
  else{ctx.globalAlpha=.55;c3Person(g.who,L,x,y,now,{fl:!!q.fl,sit:q.p==='sit',walk:q.mv});ctx.globalAlpha=1;c3Sil('c3_'+g.who,L,L.skin||'#f0c8a0',x,y,s,!!q.fl,'#8ae8ff',.28,q.p==='sit',fr)}}
 const sel=rw.tg[rw.sel];if(sel){const x=sel.q.x-cam,y=sel.q.y,hh=sel.g.h||56,ww=sel.g.w||34,p=2+Math.sin(now/120)*2,x0=x-ww/2-p,y0=y-hh-p,x1=x+ww/2+p,y1=y+2+p,c='#ffe36b';
  for(const [ax,ay,dx,dy] of [[x0,y0,1,1],[x1,y0,-1,1],[x0,y1,1,-1],[x1,y1,-1,-1]]){R(ax+(dx<0?-6:0),ay+(dy<0?-1:0),6,2,c);R(ax+(dx<0?-2:0),ay+(dy<0?-6:0),2,6,c)}
  ctx.font='bold 10px monospace';const nm=sel.g.name,w=ctx.measureText(nm).width+10;R(x-w/2,y0-15,w,13,'#0a0e14');c3Text(nm,x,y0-5,'#ffe9b0','bold 10px monospace','center')}}
function c3DrawRewindUI(now,cam){const rw=CS.rw,R0=CS.D.rewind;for(let y=0;y<H;y+=3)RA(0,y,W,1,'#000',.12);const v=ctx.createRadialGradient(W/2,H/2,H*.3,W/2,H/2,H*.9);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,10,30,.7)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H);
 const fa=now-(rw.flash||0);if(fa<200)RA(0,0,W,H,'#bfefff',.35*(1-fa/200));
 c3Panel(W/2-78,4,156,40,.8);c3Text('◀◀ 시간의 잔향 · '+R0.label,W/2,16,'#8ae8ff','bold 9px monospace','center');ctx.font='bold 20px monospace';ctx.textAlign='center';shText(c3Clock(rw.t),W/2,38,'#e8fbff','#0a3a6a');ctx.textAlign='left';
 // 타임라인
 const x0=40,x1=W-40,ty=H-20,span=R0.t1-R0.t0,tx=t=>x0+(t-R0.t0)/span*(x1-x0);R(x0-4,ty-8,x1-x0+8,16,'#06101c');R(x0,ty,x1-x0,2,'#3a6a9a');
 for(let t=Math.ceil(R0.t0/60)*60;t<=R0.t1;t+=60){const big=t%300===0;R(tx(t),ty-(big?5:3),1,big?12:8,big?'#8ae8ff':'#3a6a9a');if(big)c3Text(c3Clock(t).slice(0,5),tx(t),ty-8,'#6a9aca','8px monospace','center')}
 for(const m of R0.marks||[]){if(m.need&&!m.need.every(c3Has))continue;const mx=tx(m.t);R(mx-1,ty-10,3,20,'#ffd98a');c3Text(m.label,mx,ty+14,'#ffd98a','bold 8px monospace','center')}
 const cx=tx(rw.t);R(cx-1,ty-10,3,20,'#ffffff');R(cx-4,ty-12,9,3,'#ffffff');CS.hits.push({x:x0-10,y:ty-14,w:x1-x0+20,h:28,drag:(x)=>{rw.t=clamp(R0.t0+(x-x0)/(x1-x0)*span,R0.t0,R0.t1);rw.play=false}});
 const by=H-58,T=isTouchUI();c3Btn(16,by,34,20,'-30s',()=>{rw.t=Math.max(R0.t0,rw.t-30)});c3Btn(54,by,34,20,'+30s',()=>{rw.t=Math.min(R0.t1,rw.t+30)});c3Btn(92,by,44,20,rw.play?'정지':'재생',()=>{rw.play=!rw.play;if(rw.play&&rw.t>=R0.t1)rw.t=R0.t0});
 c3Btn(W-226,by,52,20,'대상 ▲',()=>{if(rw.tg.length)rw.sel=(rw.sel+rw.tg.length-1)%rw.tg.length});c3Btn(W-170,by,52,20,'대상 ▼',()=>{if(rw.tg.length)rw.sel=(rw.sel+1)%rw.tg.length});
 c3Btn(W-114,by,56,20,'포착'+(T?'':' SPC'),()=>c3RwCapture(),{hot:true});c3Btn(W-54,by,42,20,'나가기',()=>c3RwClose());
 if(!T)c3Text('←→ 시간 이동(길게 누르면 빠르게) · ↑↓ 대상 · SPACE 포착 · ENTER 재생 · ESC 나가기',W/2,by-6,'#8ab8d8','9px monospace','center');
 // 대상 목록
 if(rw.tg.length){c3Text('보이는 잔향',W-8,58,'#6a9aca','9px monospace','right');rw.tg.forEach((o,i)=>{const on=i===rw.sel,y=62+i*14;ctx.font='10px monospace';const w=ctx.measureText(o.g.name).width+12;R(W-8-w,y,w,12,on?'#3a3014':'#06101c');c3Text(o.g.name,W-14,y+9,on?'#ffe9b0':'#8ab8d8','10px monospace','right');CS.hits.push({x:W-8-w,y,w,h:12,fn:()=>{rw.sel=i}})})}
 for(let i=0;i<rw.tg.length;i++){const o=rw.tg[i],x=o.q.x-cam,hh=o.g.h||56,ww=o.g.w||34;CS.hits.push({x:x-ww/2,y:o.q.y-hh,w:ww,h:hh,fn:()=>{if(rw.sel===i)c3RwCapture();else rw.sel=i}})}}
/* 심문 */
function c3DrawInterro(now){const IV=c3IV(),iv=CS.iv,S=IV.stmts[iv.i],L=C3LOOK[IV.name],t=now/1000,br=c3Bk(iv.i);
 RA(0,0,W,H,'#05070a',.72);const sg=ctx.createRadialGradient(118,150,10,118,150,120);sg.addColorStop(0,'rgba(255,220,160,.22)');sg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=sg;ctx.fillRect(0,0,240,300);
 const sh=now-iv.shake<400?Math.round((RND()-.5)*8):0,hb=c3HB(S);
 if(IV.draw)IV.draw(118+sh,190,now);else c3Person(IV.name,L,118+sh,190+(L.kid?0:4),now,{s:L.kid?3.4:4,fl:false});
 if(hb!=='calm'&&!br&&Math.floor(now/300)%3===0){R(150+sh,84,2,4,'#bfe8ff');R(151+sh,88,1,2,'#bfe8ff')}
 // 이름
 c3Panel(10,8,150,26,.85);c3Text('박동 심문 · '+IV.name,18,21,'#ffb0b8','bold 11px monospace');c3Text(IV.role||'',18,31,'#9aa','8px monospace');
 // 신뢰도
 c3Text('신뢰도',174,20,'#9aa8b8','9px monospace');for(let k=0;k<5;k++){const on=k<iv.cred;const x=174+k*13,y=24;R(x,y,10,10,on?'#ffd98a':'#2a2e34');R(x+2,y+2,6,6,on?'#b8862a':'#1a1e24');R(x+4,y+4,2,2,on?'#fff6cf':'#2a2e34')}
 // 심전도 모니터
 const mx=262,my=36,mw=206,mh=80;R(mx-3,my-3,mw+6,mh+6,'#2a3a30');R(mx,my,mw,mh,'#041008');for(let x=mx;x<mx+mw;x+=10)R(x,my,1,mh,'#0a2414');for(let y=my;y<my+mh;y+=10)R(mx,y,mw,1,'#0a2414');
 const col=br?'#8ae8ff':'#6aff9a',pps=60;ctx.strokeStyle=col;ctx.lineWidth=1.5;ctx.beginPath();for(let i=0;i<=mw;i++){const tt=t-(mw-i)/pps,y=my+mh/2+8+c3IvWave(tt)*28;if(i===0)ctx.moveTo(mx+i,y);else ctx.lineTo(mx+i,y)}ctx.stroke();ctx.lineWidth=1;
 R(mx+mw-3,my,3,mh,'#041008');const bs=iv.beats.filter(b=>b.t<=t).slice(-4);let bpm=0;if(bs.length>1){let s=0;for(let k=1;k<bs.length;k++)s+=bs[k].t-bs[k-1].t;bpm=Math.round(60/(s/(bs.length-1)))}
 const lastB=bs.length?bs[bs.length-1].t:0,pulse=clamp(1-(t-lastB)/.25,0,1);c3Text('♥',mx+8,my+14,mixc('#3a6a4a','#ff6b7a',pulse),'bold 12px monospace');c3Text((bpm||'--')+' BPM',mx+22,my+13,col,'bold 10px monospace');c3Text('HEART MONITOR',mx+mw-6,my+13,'#2a6a3a','8px monospace','right');
 c3Text(br?'진정됨':'박동을 읽어라 — 흔들림 ≠ 빠름',mx+mw/2,my+mh+12,'#6a8a7a','9px monospace','center');
 // 증언 목록 점
 const N=IV.stmts.length;for(let k=0;k<N;k++){const x=262+k*18,y=138,on=k===iv.i,b=c3Bk(k);R(x,y,14,14,on?'#ffd98a':'#1a2430');R(x+1,y+1,12,12,b?'#2a5a3a':on?'#3a2a14':'#0a0e14');c3Text(b?'✓':String(k+1),x+7,y+11,b?'#8ff0b0':on?'#ffe9b0':'#8a9aa8','bold 9px monospace','center');CS.hits.push({x,y,w:14,h:14,fn:()=>{iv.i=k;iv.seenI[k]=1}})}
 // 증언 상자
 const bx=240,by=158,bw=232,bh=94;c3Panel(bx,by,bw,bh,.92);c3Text('증언 '+(iv.i+1)+' / '+N,bx+8,by+13,'#9aa8b8','9px monospace');
 const txt=br?(S.truth||S.txt):S.txt;const ls=c3Wrap('“'+txt+'”',bw-18,'bold 11px monospace');ls.slice(0,5).forEach((l,i)=>c3Text(l,bx+9,by+30+i*14,br?'#a8e8c8':'#fff0e0','bold 11px monospace'));
 if(br){ctx.save();ctx.translate(bx+bw-44,by+20);ctx.rotate(-.18);R(-34,-9,68,18,'#8a1a2a');R(-32,-7,64,14,'#c83a4a');c3Text('거짓 파훼',0,4,'#fff','bold 10px monospace','center');ctx.restore()}
 const T=isTouchUI(),y2=H-42;c3Btn(8,y2,30,30,'◀',()=>c3IvNav(-1));c3Btn(42,y2,74,30,'추궁'+(T?'':' SPC'),()=>c3IvPress());c3Btn(120,y2,92,30,'단서 제시'+(T?'':' E'),()=>c3IvPresent(),{hot:!br});c3Btn(216,y2,30,30,'▶',()=>c3IvNav(1));
 c3Btn(W-120,y2+6,54,22,'수첩'+(T?'':' N'),()=>c3NoteOpen('view'));c3Btn(W-62,y2+6,54,22,'그만'+(T?'':' ESC'),()=>c3IvKey('Escape'));
 const fo=now-(iv.flashOk||0);if(fo<600){RA(0,0,W,H,'#fff',.4*(1-fo/600));ctx.font='bold 28px monospace';ctx.textAlign='center';ctx.globalAlpha=1-fo/600;shText('반 박 !',W/2,120,'#ffe36b','#8a1a2a');ctx.globalAlpha=1;ctx.textAlign='left'}}
/* 추리 */
function c3DrawDeduce(now){const D=CS.D,Q=D.deduce[CS.dq],dd=CS.dd;if(!Q)return;const t=(now-dd.t0)/1000;
 R(0,0,W,H,'#0a0806');for(let i=0;i<40;i++){const x=(i*97)%W,y=(i*53)%H;RA(x,y,2,2,'#3a2a1a',.6)}
 const g=ctx.createRadialGradient(W/2,110,20,W/2,150,300);g.addColorStop(0,'rgba(120,80,30,.25)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 // 핀으로 꽂힌 단서 카드 (배경)
 const L=c3List();for(let i=0;i<Math.min(8,L.length);i++){const x=18+(i%4)*120+(i>3?40:0),y=i<4?4:H-30,c=D.clues[L[i]];ctx.globalAlpha=.28;R(x,y,86,22,'#e8dcc0');c3Text(c.name.slice(0,10),x+43,y+14,'#3a2410','9px monospace','center');R(x+41,y+2,4,4,'#c83a3a');ctx.globalAlpha=1}
 const sh=dd.res==='ng'&&now-dd.resT<400?Math.round((RND()-.5)*8):0;
 c3Panel(22+sh,34,W-44,H-72,.94);c3Text('추리 — 진상을 밝혀라',40+sh,52,'#ffd98a','bold 12px monospace');
 for(let k=0;k<D.deduce.length;k++){const x=W-40-(D.deduce.length-k)*16,on=k===CS.dq,dn=k<CS.dq;R(x,43,12,12,dn?'#8ff0b0':on?'#ffd98a':'#2a2e34')}
 {const ch=CS.ddCh==null?5:CS.ddCh;c3Text('남은 기회',W-40-5*13-4,70,'#9aa8b8','9px monospace','right');for(let k=0;k<5;k++){const on=k<ch,xx=W-40-(5-k)*13;R(xx,61,10,10,on?'#ff6b7a':'#2a2e34');R(xx+2,63,6,6,on?'#c83a4a':'#1a1e24');R(xx+3,64,2,2,on?'#ffd0d6':'#2a2e34')}}
 const ls=c3Wrap('Q'+(CS.dq+1)+'. '+Q.q,W-100,'bold 13px monospace');ls.forEach((l,i)=>c3Text(l,40+sh,86+i*17,'#fff6e0','bold 13px monospace'));const oy=94+ls.length*17;
 if(Q.type==='clue'){c3Text('이 질문엔 수첩의 단서로 답해야 해요.',W/2,oy+24,'#a8b8c8','10px monospace','center');c3Btn(W/2-90,oy+36,180,30,'수첩에서 단서 제시'+(isTouchUI()?'':' ↵'),()=>c3DdOk(),{hot:true})}
 else Q.opts.forEach((o,i)=>{const y=oy+8+i*25,on=i===dd.sel;R(46,y,W-92,21,on?'#3a2a10':'#10141a');R(46,y,3,21,on?'#ffd98a':'#3a4a5a');c3Text(String.fromCharCode(65+i)+'.  '+o,58,y+14,on?'#ffe9b0':'#c8d0d8',(on?'bold ':'')+'11px monospace');CS.hits.push({x:46,y,w:W-92,h:21,fn:()=>{if(dd.sel===i)c3DdOk();else{dd.sel=i;sfx(700,.03,'square',.015)}}})});
 const T=isTouchUI();c3Btn(30,H-34,70,22,'나가기'+(T?'':' ESC'),()=>c3DdKey('Escape'));c3Btn(104,H-34,60,22,'수첩'+(T?'':' N'),()=>c3NoteOpen('view'));c3Btn(168,H-34,60,22,'힌트'+(T?'':' H'),()=>c3HintAsk());
 if(Q.type!=='clue')c3Btn(W-110,H-34,80,22,'결정'+(T?'':' ↵'),()=>c3DdOk(),{hot:true});
 if(dd.res==='ok'){const a=clamp(1-(now-dd.resT)/700,0,1);RA(0,0,W,H,'#8ff0b0',.25*a)}if(dd.res==='ng'){const a=clamp(1-(now-dd.resT)/500,0,1);RA(0,0,W,H,'#ff3a4a',.25*a)}}
/* 프롤로그 · 막 끝 */
function c3DrawPrologue(now){const t=(now-CS.t0)/1000;R(0,0,W,H,'#04060c');const cx=W/2,cy=H/2-10;
 for(let k=0;k<7;k++){const r=30+k*26+((t*18)%26),a=.08+.06*Math.sin(t+k);ctx.globalAlpha=a;ctx.strokeStyle=k%2?'#8ae8ff':'#ffd98a';ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,r,0,TAU);ctx.stroke()}
 ctx.globalAlpha=.5;for(let i=0;i<12;i++){const an=i*TAU/12+t*.4,r=110+Math.sin(t+i)*6;c3Text(['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'][i],cx+Math.cos(an)*r,cy+Math.sin(an)*r+4,'#c8a868','bold 10px monospace','center')}
 ctx.globalAlpha=.9;ctx.strokeStyle='#fff6cf';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(-t*3)*60,cy+Math.sin(-t*3)*60);ctx.stroke();ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(-t*.7)*40,cy+Math.sin(-t*.7)*40);ctx.stroke();ctx.lineWidth=1;ctx.globalAlpha=1;
 if(RND()<.5)CS.parts.push({x:RND()*W,y:-4,vx:(RND()-.5)*10,vy:60+RND()*80,l:3,c:RND()<.5?'#8ae8ff':'#ffd98a',s:2});for(const q of CS.parts){ctx.globalAlpha=clamp(q.l,0,1)*.8;R(q.x,q.y,q.s,q.s*3,q.c)}ctx.globalAlpha=1;
 const fy=cy+Math.sin(t*1.3)*8;ctx.save();ctx.translate(cx,fy);ctx.rotate(Math.sin(t*.8)*.4);try{drawKnight(ctx,-12,-19,2,false,null,t)}catch(e){}ctx.restore();c3Tick(cx+22,fy-24,now);
 R(0,0,W,22,'#000');R(0,H-22,W,22,'#000')}
function c3DrawActEnd(now){const t=(now-CS.t0)/1000,a=clamp(t/1.2,0,1);R(0,0,W,H,'#030406');ctx.globalAlpha=a;const cx=W/2;
 ctx.strokeStyle='#5a4a2a';ctx.beginPath();ctx.arc(cx,96,40,0,TAU);ctx.stroke();ctx.strokeStyle='#ffd98a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx,96);const hA=(3+12/60)/12*TAU-Math.PI/2;ctx.lineTo(cx+Math.cos(hA)*20,96+Math.sin(hA)*20);ctx.moveTo(cx,96);const mA=12/60*TAU-Math.PI/2;ctx.lineTo(cx+Math.cos(mA)*32,96+Math.sin(mA)*32);ctx.stroke();ctx.lineWidth=1;
 c3Text('CHAPTER 3 · ORIGIN',cx,34,'#8a7a5a','bold 10px monospace','center');ctx.font='bold 24px monospace';ctx.textAlign='center';shText('제 1 막 · 끝',cx,164,'#fff6e0','#5a3a10');ctx.textAlign='left';
 c3Text('3시 12분. 우리가 이 시대에 떨어진 시각.',cx,188,'#d8c8a8','11px monospace','center');
 const s=c3Sv();let x=cx-120;for(let i=0;i<C3CASES.length;i++){const b=s.best[i]||'-';R(x,206,72,34,'#0a0e14');R(x,206,72,1,'#6a5a3a');c3Text('CASE '+String(i+1).padStart(2,'0'),x+36,219,'#8a9aa8','9px monospace','center');c3Text(b,x+36,236,b==='S'?'#fff6cf':'#ffd98a','bold 13px monospace','center');x+=84}
 c3Text('제 2 막 「시계탑의 거짓말」은 다음 업데이트에서 이어집니다',cx,262,'#8ae8ff','10px monospace','center');
 if(t>1.5&&Math.floor(now/500)%2===0)c3Text('— 클릭하면 로비로 —',cx,284,'#6a7a88','9px monospace','center');ctx.globalAlpha=1}

/* ---------- CH3 배경 도구 ---------- */
function c3T(rt){return rt==null?null:rt}
function c3Room(cam,w,A,B,wy){wy=wy||160;const X=-cam;
 const g=ctx.createLinearGradient(0,0,0,wy);g.addColorStop(0,shade(A,.55));g.addColorStop(1,A);ctx.fillStyle=g;ctx.fillRect(0,0,W,wy);
 for(let x=0;x<w;x+=18){const sx=Math.round(x+X);if(sx<-20||sx>W)continue;R(sx,0,1,wy-30,shade(A,.7));if((x/18)%3===1)R(sx+8,14+(x%40),2,2,shade(A,.6))}
 R(0,wy-32,W,32,B);R(0,wy-32,W,2,shade(B,1.35));for(let x=0;x<w;x+=36){const sx=Math.round(x+X);if(sx<-40||sx>W)continue;R(sx+3,wy-27,30,22,shade(B,.85));R(sx+3,wy-27,30,1,shade(B,1.2))}
 R(0,wy-2,W,3,shade(B,.5));
 const fg=ctx.createLinearGradient(0,wy,0,H);fg.addColorStop(0,'#5a3c24');fg.addColorStop(1,'#3a2414');ctx.fillStyle=fg;ctx.fillRect(0,wy+1,W,H-wy);
 const rows=[wy+1,wy+11,wy+23,wy+37,wy+54,wy+74,wy+98,wy+126];for(let i=0;i<rows.length-1;i++){const y=rows[i],h=rows[i+1]-y;R(0,y,W,1,'#2a180c');const L0=60+i*14;for(let x=((i*37)%L0);x<w+L0;x+=L0){const sx=Math.round(x+X);if(sx>-2&&sx<W)R(sx,y,1,h,'#3a2212')}if(i%2)RA(0,y+1,W,h-1,'#fff',.02)}}
function c3Window(x,y,w,h,cam,rt,open,lit){const X=Math.round(x-cam);if(X>W||X+w<0)return;R(X-4,y-4,w+8,h+8,'#3a2412');R(X-3,y-3,w+6,h+6,'#6a4424');
 const night=rt!=null,g=ctx.createLinearGradient(0,y,0,y+h);if(night){g.addColorStop(0,'#050a1e');g.addColorStop(1,'#12204a')}else{g.addColorStop(0,'#2a3a6a');g.addColorStop(.6,'#c88a70');g.addColorStop(1,'#f0c890')}ctx.fillStyle=g;ctx.fillRect(X,y,w,h);
 if(night){for(let i=0;i<9;i++)R(X+((i*29+x)%w),y+((i*17)%(h-6))+2,1,1,'#e8f0ff');R(X+w-14,y+6,7,7,'#f0f0d8');R(X+w-12,y+6,6,5,'#050a1e')}else{R(X+6,y+h-10,w-12,10,'#5a4a6a');R(X+2,y+h-6,w-4,6,'#3a3050')}
 R(X+w/2-1,y,2,h,'#6a4424');R(X,y+h/2-1,w,2,'#6a4424');if(open){R(X+w+3,y-2,8,h+4,'#7a5434');R(X+w+4,y,6,h,'#9ab8d8')}R(X-6,y+h+4,w+12,4,'#7a5434')}
function c3Clockface(X,Y,r,hh,mm,dust){pcirc(X,Y,r+2,'#2a1a0a');pcirc(X,Y,r+1,'#b8862a');pcirc(X,Y,r,'#f0e8d0');for(let i=0;i<12;i++){const a=i*TAU/12;R(X+Math.cos(a)*(r-2)-.5,Y+Math.sin(a)*(r-2)-.5,1,1,'#3a2a1a')}
 ctx.strokeStyle='#1a1008';ctx.lineWidth=1.6;ctx.beginPath();const ha=((hh%12)+mm/60)/12*TAU-Math.PI/2,ma=mm/60*TAU-Math.PI/2;ctx.moveTo(X,Y);ctx.lineTo(X+Math.cos(ha)*r*.5,Y+Math.sin(ha)*r*.5);ctx.moveTo(X,Y);ctx.lineTo(X+Math.cos(ma)*r*.82,Y+Math.sin(ma)*r*.82);ctx.stroke();ctx.lineWidth=1;R(X-1,Y-1,2,2,'#8a1a1a');
 if(dust){for(let i=0;i<6;i++)R(X-r+((i*7)%(2*r)),Y+r-2+(i%2),2,1,'#15101a')}}
function c3ClockTime(rt,stopAt){if(rt==null)return [Math.floor(stopAt/3600),Math.floor(stopAt/60)%60];const t=Math.min(rt,stopAt);return [Math.floor(t/3600),Math.floor(t/60)%60+(t%60)/60]}
function c3Lamp(X,Y,rad,col,a){const g=ctx.createRadialGradient(X,Y,2,X,Y,rad);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');ctx.globalAlpha=a;ctx.fillStyle=g;ctx.fillRect(X-rad,Y-rad,rad*2,rad*2);ctx.globalAlpha=1}
function c3Candle(X,Y,lit,now,burnt){R(X-5,Y,10,3,'#8a6a4a');R(X-3,Y-(burnt?1:10),6,burnt?1:10,'#f0e8d0');if(burnt){R(X-4,Y-2,8,2,'#e8d8b8');R(X+2,Y-1,3,2,'#e8d8b8')}if(lit){const f=Math.sin(now/90)*1;R(X-1,Y-15+f,2,4,'#ffd166');R(X,Y-17+f,1,2,'#fff6cf');c3Lamp(X,Y-14,50,'rgba(255,200,120,.5)',.8)}}
function c3Sky(top,bot,rt,dawn){const g=ctx.createLinearGradient(0,0,0,bot);if(rt!=null){g.addColorStop(0,'#03060f');g.addColorStop(1,'#101a3a')}else if(dawn){g.addColorStop(0,'#2a3a6a');g.addColorStop(.55,'#c88a78');g.addColorStop(1,'#f4c890')}else{g.addColorStop(0,'#6a9ad0');g.addColorStop(1,'#d8e8f0')}ctx.fillStyle=g;ctx.fillRect(0,top,W,bot-top)}
function c3Stars(cam,n,h,par){for(let i=0;i<n;i++){const x=((i*73)%900-cam*(par||.2)+900)%900-200,y=(i*37)%h;if(x<0||x>W)continue;R(x,y,1,1,i%5?'#c8d8ff':'#ffffff')}}
function c3Dormant(bi,X,Y,sc,now){try{const B=BOSSES[bi];ctx.globalAlpha=.9;drawMech(ctx,B,X,Y,0,{still:true},sc);ctx.globalAlpha=1}catch(e){}}

/* ---------- CH3 데이터 : 인물 · 대사 ---------- */
Object.assign(C3LOOK,{
 '윤서':{hair:'band',out:'apron',pal:{h:'#e8722a',k:'#3a4a52',c:'#3a6a9a',a:'#8a6a4a',p:'#2a3040',b:'#1a1410'},prop:'hammer',bg:'#e8722a',name:'#ffb070',skin:'#f0caa4'},
 '누리':{hair:'bun',out:'dress',kid:1,pal:{h:'#3a2418',c:'#c89a30',a:'#fff0d0',p:'#8a6a20',b:'#3a2010'},prop:'book',bg:'#c89a30',name:'#ffe08a',skin:'#f4d4b4'},
 '한결':{hair:'short',out:'coat',pal:{h:'#1a1a22',c:'#4a6a4a',a:'#c8b888',p:'#2a2a30',b:'#1a1410'},prop:'key',bg:'#6a9a6a',name:'#b8e8b0',skin:'#e0b088'},
 '음표':{hair:'long',out:'vest',pal:{h:'#2a1a3a',c:'#7a2a5a',a:'#f0e0f0',p:'#2a1a2a',b:'#1a1010',g:'#ffe36b'},prop:'bellrod',bg:'#a83a78',name:'#ff9ad0',skin:'#f0c8a0'},
 '촌장 바위':{hair:'bald',beard:1,out:'robe',cane:1,pal:{h:'#d8d8d8',c:'#6a4a2a',a:'#c8a040',p:'#3a2a1a',b:'#2a1a10',w:'#e8e8e8'},bg:'#8a6a3a',name:'#e8c890',skin:'#e0b088'},
 '을순':{hair:'band',out:'apron',pal:{h:'#2a1a10',k:'#c83a3a',c:'#4a5a6a',a:'#6a7a8a',p:'#2a3038',b:'#1a1410'},prop:'hammer',bg:'#4a6a8a',name:'#a8c8f0',skin:'#e0b088'},
 '갑돌':{hair:'short',glasses:1,out:'vest',pal:{h:'#4a3a2a',c:'#8a6a2a',a:'#e8e0c8',p:'#3a3028',b:'#1a1410'},prop:'key',bg:'#8a7a3a',name:'#e8d890',skin:'#f0c8a0'},
 '유모':{hair:'bun',out:'dress',pal:{h:'#8a8a94',c:'#5a4a6a',a:'#e8e0e8',p:'#3a2a4a',b:'#2a1a2a'},prop:'basket',bg:'#6a5a8a',name:'#d0c0f0',skin:'#f0c8a0'},
 '다온':{hair:'short',out:'dress',kid:1,pal:{h:'#6a4a2a',c:'#e8e8f0',a:'#b8c8e8',p:'#c8c8d8',b:'#f0c8a0'},bg:'#8aa8d8',name:'#c8e0ff',skin:'#f4d4b4'}});
const C3_NOPE=['…음, 둘이 이어지지 않아.','이 둘로는 아무것도 떠오르지 않아.','연결 고리가 안 보여. 다른 짝을 찾아보자.','억지로 붙이면 추리가 아니라 상상이야.'];
const C3_PROLOGUE=[
 ['','— 시계골. 종이 다시 울린 지 석 달.'],
 ['똑딱','하루, 이것 좀 봐. 윤서 일기장 마지막 장… 뒷면에 뭔가 있어.'],
 ['','「심장시계 제0호. 처음으로 돌아갈 수 있다면, 나는 고칠 수 있을까. — 3시 12분」'],
 ['하루','3시 12분…? 무슨 뜻이지?'],
 ['똑딱','…하루. 시계탑 소리가 이상해. 째깍, 째깍… 거꾸로 가고 있어!'],
 ['똑딱','심장시계가 거꾸로 돈다! 하루, 손 잡아——!'],
 ['','째깍. 째깍. 째——깍.'],
 ['','세상이 뒤로 감긴다. 무너졌던 것이 다시 세워지고, 주름진 얼굴들이 젊어지고, 잠든 마을이 아직 잠들기 전으로.'],
 ['','…쿵.'],
 ['똑딱','으으… 하루, 괜찮아? 여기… 시계골 맞아? 시계탑이 반밖에 안 지어졌어.'],
 ['똑딱','광장 달력이… 사십 년 전이야. 우리, 과거로 떨어졌어.'],
 ['','그리고 그 새벽. 언덕 위 작은 공방의 문이 벌컥 열렸다.'],
 ['윤서','도둑이야——! 내 설계도가 없어졌어!'],
 ['똑딱','…저 목소리. 윤서야! 젊은 윤서!'],
 ['똑딱','하루, 미래에서 왔다는 건 비밀로 하자. 모든 게 꼬일지도 몰라. 우린 그냥… 떠돌이 탐정이야. 알았지?'],
 ['하루','탐정이라니. …좋아. 해 보자.']];
const C3_TUT={
 explore:[['똑딱','조사 방법! 돌아다니면서 수상한 곳을 살펴보고(SPACE), 사람들 이야기를 듣자.','조사 방법! 조이스틱으로 돌아다니며 수상한 곳 앞에서 [조사] 버튼. 사람들 이야기도 듣자.'],
  ['똑딱','가까이 가면 반짝이는 곳이 있어. 알아낸 건 전부 수첩(N)에 적혀.','가까이 가면 반짝이는 곳이 있어. 알아낸 건 전부 오른쪽 위 [수첩]에 적혀.'],
  ['똑딱','이번엔 진짜 머리를 써야 해. 힌트(H)도 있지만… 쓰면 추리 랭크가 떨어져!','이번엔 진짜 머리를 써야 해. [힌트]도 있지만… 쓰면 추리 랭크가 떨어져!']],
 note:[['똑딱','수첩에선 단서 두 개를 골라 이어 볼 수 있어. 맞는 짝이면 새로운 "추리"가 떠올라!'],['똑딱','틀린 짝은 벌점 없어. 마음껏 이어 봐. 추리가 또 다른 추리랑 이어지기도 해.']],
 rewind:[['똑딱','여긴 "시간의 잔향"이야. 내 태엽으로 이 자리의 과거를 되감을 수 있어.'],
  ['똑딱','←→로 시간을 움직이고(길게 누르면 빨라져), ↑↓로 잔향을 고른 다음, 결정적인 순간에 SPACE로 포착!','아래 막대를 끌어서 시간을 움직이고, 잔향을 눌러 고른 다음, 결정적인 순간에 [포착]!'],
  ['똑딱','아무 때나 찍으면 소용없어. "언제"를 알아야 "무엇"이 보여. 수첩에 적힌 시각을 떠올려 봐.']],
 interro:[['똑딱','박동 심문이야! 증인의 심장 소리를 들을 수 있어.'],
  ['똑딱','거짓말을 하면 박동이 불규칙하게 흔들려. 하지만 긴장하면 그냥 빨라지기도 해. "빠른 것"과 "흔들리는 것"을 구분해!'],
  ['똑딱','추궁(SPACE)으로 더 캐묻고, 모순되는 증언엔 단서 제시(E)! 틀리면 신뢰도가 깎이고 실수가 쌓여.','[추궁]으로 더 캐묻고, 모순되는 증언엔 [단서 제시]! 틀리면 신뢰도가 깎이고 실수가 쌓여.'],
  ['똑딱','거짓을 전부 무너뜨리면 심문 끝이야.']],
 deduce:[['똑딱','증언은 다 들었어. 수첩에서 단서를 더 이어 보고, 준비되면 추리(R)를 시작하자!','증언은 다 들었어. 수첩에서 단서를 더 이어 보고, 준비되면 [추리]를 시작하자!']],
 deduce2:[['똑딱','질문마다 답을 고르거나 단서를 제시해. 기회는 다섯 번! 틀릴 때마다 하나씩 줄어.'],['똑딱','다섯 번 다 틀리면 추리가 엉켜서 처음부터 다시 해야 해. 확신이 없으면 나가서 더 조사해도 돼!']]};

/* ---------- CASE 01 · 사라진 설계도 ---------- */
function c3S1Draw(now,cam,rt,cs){const X=x=>Math.round(x-cam),t=now/1000;
 c3Room(cam,560,'#6a4a30','#4a3020');
 // 벽: 설계 스케치, 공구 걸이
 for(const [px,py,rot] of [[40,40,-.05],[250,34,.04],[354,44,-.03]]){const x=X(px);R(x,py,34,24,'#e8dcc0');R(x+2,py+2,30,1,'#8aa0c8');R(x+4,py+8,12,12,'#b8c8e0');pcirc(x+10,py+14,5,'#6a8ac0');R(x+20,py+8,10,1,'#6a8ac0');R(x+20,py+12,8,1,'#6a8ac0');R(x+16,py-1,2,2,'#c83a3a')}
 {const x=X(310);R(x-40,70,88,3,'#3a2412');for(let i=0;i<6;i++){R(x-34+i*14,73,2,10+(i%3)*4,'#8a8a94');R(x-36+i*14,83+(i%3)*4,6,4,i%2?'#6a6a74':'#a87a3a')}}
 // 창문
 c3Window(452,52,50,58,cam,rt,true);
 // 벽시계 (3:12 에서 멈춤)
 {const [h,m]=c3ClockTime(rt,11520);c3Clockface(X(185),66,12,h,m,true);R(X(185)-1,80,2,6,'#3a2412')}
 // 누리 침상 + 양초
 {const x=X(24);R(x,150,74,6,'#6a4a2a');R(x+2,144,70,8,'#d8c8a8');R(x+4,140,20,8,'#f0e8d8');R(x,156,4,26,'#4a3020');R(x+70,156,4,26,'#4a3020');R(x+26,145,44,7,'#8a5a3a');R(x+26,145,44,2,'#a87a4a')}
 {const x=X(112);R(x-7,170,14,3,'#6a4a2a');R(x-5,173,2,12,'#4a3020');R(x+3,173,2,12,'#4a3020');c3Candle(x,170,rt!=null&&rt<12300,now,rt==null)}
 // 윤서 침대
 {const x=X(140);R(x,146,92,8,'#5a3a22');R(x+2,138,88,10,'#3a5a8a');R(x+2,138,88,2,'#5a7aaa');R(x+4,134,22,8,'#e8e0d0');R(x,120,6,62,'#4a2a18');R(x+86,130,6,52,'#4a2a18');R(x,154,92,4,'#3a2412');R(x+1,118,4,4,'#8a6a3a')}
 // 기름 항아리 (되감기 3:10 이후 넘어짐)
 {const x=X(262),tipped=rt==null||rt>=11430;if(tipped){R(x-10,178,20,10,'#2a2a30');R(x-12,180,4,6,'#1a1a20');R(x+10,183,16,4,'#0a0a10');RA(x+6,184,26,3,'#0a0a10',.8)}else{R(x-7,164,14,16,'#2a2a30');R(x-5,162,10,3,'#4a4a50');R(x-4,168,8,1,'#5a5a60')}}
 // 작업대
 {const x=X(272);R(x,126,96,6,'#8a5a30');R(x,126,96,1,'#b8864a');R(x+2,132,4,48,'#5a3a1c');R(x+88,132,4,48,'#5a3a1c');R(x+2,160,90,3,'#5a3a1c');
  for(let i=0;i<4;i++){pcirc(x+14+i*9,121,3+i%2,'#b8a060');pcirc(x+14+i*9,121,1,'#5a4a20')}R(x+54,118,14,8,'#6a6a74');R(x+56,116,10,2,'#8a8a94');
  const has=rt!=null&&rt<11420;R(x+72,112,20,14,'#6a3a1a');R(x+72,112,20,2,'#8a5a2a');R(x+74,114,16,1,'#3a1a0a');if(has){R(x+76,106,12,7,'#e8e0c8');R(x+76,106,12,1,'#8aa0c8')}}
 // 괘종시계
 {const x=X(404),open=cs&&cs.flags.gOpen&&rt==null;R(x,64,30,116,'#4a2a14');R(x+2,66,26,112,'#6a3c1c');R(x-2,60,34,8,'#3a1c0c');R(x+4,72,22,22,'#3a1c0c');const [h,m]=c3ClockTime(rt,11520);c3Clockface(x+15,83,9,h,m,false);
  R(x+6,100,18,70,open?'#1a0c04':'#2a1408');R(x+7,101,16,68,open?'#120804':'#3a2010');RA(x+8,102,4,66,'#fff',.08);const sw=rt!=null&&rt<11520?Math.sin(now/300)*5:0;R(x+14+sw*.3,102,2,44,'#b8862a');pcirc(Math.round(x+15+sw),150,5,'#d4ae4a');
  if(open){R(x+30,100,10,70,'#6a3c1c');R(x+9,112,12,4,'#e8e0c8')}}
 // 원형 파수꾼 0호 (잠듦)
 {const x=X(534);R(x-18,150,36,32,'#4a3020');R(x-18,150,36,3,'#6a4428');R(x-14,138,28,12,'#5a3a22');for(let i=0;i<3;i++){pcirc(x-8+i*8,144,3,'#b8a060');pcirc(x-8+i*8,144,1,'#5a4a20')}}
 // 검은 발자국
 {const st=[[206,196],[222,192],[240,190],[256,188],[274,186],[296,188],[318,188],[340,190],[362,190],[384,190],[402,190]];ctx.globalAlpha=rt==null?.75:clamp((rt-11380)/60,0,.75);for(const [px,py] of st){R(X(px),py,4,2,'#0a0a0e');R(X(px)+1,py+2,2,1,'#0a0a0e')}for(const [px,py] of st){R(X(px)+3,py+8,4,2,'#0a0a0e')}ctx.globalAlpha=1}
 // 작업화, 악보 조각
 if(rt==null||rt>11640){const x=X(238);R(x,258,9,5,'#2a1a10');R(x+10,259,9,5,'#2a1a10');R(x,262,9,2,'#050508');R(x+10,263,9,2,'#050508')}
 {const x=X(478);R(x,244,14,10,'#e8e0c8');R(x+2,246,10,1,'#3a3a4a');R(x+2,249,8,1,'#3a3a4a');pcirc(x+10,251,2,'#6a6a7a')}}
function c3S1Light(now,cam,cs){RA(0,0,W,H,'#0a0614',.18);c3Lamp(Math.round(477-cam),80,110,'rgba(255,190,140,.35)',.8);c3Lamp(Math.round(310-cam),110,90,'rgba(255,220,160,.25)',.7)}
const C3_CASE1={no:1,title:'사라진 설계도',place:'언덕 위, 윤서의 공방',when:'새벽 5시 40분',tagline:'도둑은 창문으로 들어오지 않았다.',start:[250,240],
 scene:{w:560,y0:178,y1:272,draw:c3S1Draw,light:c3S1Light,block:[[396,172,44,14]]},
 intro:[['윤서','…너희는 누구야? 탐정? 떠돌이 탐정? 하, 마침 잘됐다!'],
  ['윤서','내 "심장시계" 설계도가 없어졌어. 삼 년을 그린 거야. 이 마을의 모든 시계를 하나의 박동으로 묶을 설계도라고.'],
  ['윤서','어젯밤 두 시까지 작업하고 잤어. 일어나 보니 통이 비어 있었고, 창문은 활짝 열려 있었어!'],
  ['윤서','범인은 뻔해. 음표야. 어제 저녁에 와서 설계도를 계속 흘끔거렸거든.'],
  ['똑딱','(하루… 이 사람, 정말 윤서야. 우리가 아는 그 윤서가 되기 한참 전의.)'],
  ['똑딱','(섣불리 믿지 말자. 공방을 샅샅이 살펴보고, 다들 이야기를 들어 보자.)']],
 clues:{
  tube:{name:'빈 설계도 통',kind:'thing',desc:'작업대 위 가죽 통. 비어 있지만 뚜껑은 얌전히 닫혀 있었다. 급한 도둑이라면 이렇게 닫아 둘까?'},
  clock312:{name:'3시 12분의 벽시계',kind:'time',desc:'윤서의 침대 위 벽시계가 3시 12분에 멈췄다. 태엽은 충분히 감겨 있다. 톱니 사이에 검은 가루가 끼어 있다.'},
  shoes:{name:'기름에 젖은 작업화',kind:'thing',desc:'윤서의 작업화. 밑창이 검은 태엽기름에 흠뻑 젖어 있다. 아직 마르지 않았다 — 밤사이 묻은 것이다.'},
  prints:{name:'검은 발자국',kind:'thing',desc:'기름 발자국이 윤서의 침대 앞에서 시작해 괘종시계 앞까지 갔다가 되돌아온다. 창문 쪽으로는 한 발짝도 없다. 누리의 침상 바로 앞을 지난다.'},
  sill:{name:'먼지 쌓인 창틀',kind:'thing',desc:'창문은 열려 있지만 창틀의 먼지는 고르게 쌓여 있다. 누군가 넘나들었다면 흔적이 남았을 것이다.'},
  score:{name:'음표의 악보 조각',kind:'thing',desc:'구겨진 악보. 뒷면에 톱니바퀴 그림이 있다. 설계도를 베낀 걸까? 음표의 서명이 있다.'},
  scoreOk:{name:'오르골 도안',kind:'word',desc:'음표의 설명: 악보 뒷면의 톱니는 오르골 도안이다. 윤서도 인정했다 — 설계도의 톱니와는 크기부터 다르다.'},
  candle:{name:'다 타 버린 양초',kind:'thing',desc:'누리의 침상 옆 양초. 끝까지 타서 촛농만 남았다. 새 양초는 대여섯 시간은 탄다.'},
  hangyeol:{name:'한결의 증언',kind:'word',desc:'"두 시에 공방을 나설 때, 설계도는 분명 통 안에 있었어. 윤서는 밤새 일할 땐 늘 창문을 열어 둬."'},
  hands:{name:'윤서의 이상한 아침',kind:'word',desc:'한결: "요즘 윤서가 아침에 일어나면 손이며 발에 기름이 묻어 있대. 본인은 전혀 기억을 못 하고."'},
  spill:{name:'넘어진 기름 항아리',kind:'time',desc:'되감기: 3시 10분, 그림자가 작업대에서 설계도를 꺼내다 기름 항아리를 넘어뜨렸다. 그림자는 아랑곳없이 기름을 밟고 걸어갔다.'},
  shadow312:{name:'3시 12분의 그림자',kind:'time',desc:'되감기: 3시 12분, 검은 그림자가 괘종시계 문을 열고 무언가를 넣었다. 얼굴은 보이지 않는다. 그림자는 침대 쪽에서 나타나 침대 쪽으로 사라졌다.'},
  nuriNote:{name:'누리의 공책',kind:'record',desc:'"3시 15분. 선생님이 또 걸어 다녔다. 눈은 뜨고 있었는데 나를 못 봤다. 불러도 대답이 없었다. 이번이 세 번째. 아무한테도 말하면 안 된다."'},
  found:{name:'되찾은 설계도',kind:'thing',desc:'괘종시계의 추 뒤에 돌돌 말려 끼워져 있었다. 찢어진 곳 하나 없다. 정성스럽게 말려 있었다.'},
  scrawl:{name:'뒷면의 낙서',kind:'record',desc:'설계도 뒷면에 삐뚤삐뚤한 글씨: "지켜야 해. 지켜야 해." 윤서의 글씨체지만 눈을 감고 쓴 것처럼 흐트러졌다.'},
  feet:{name:'그림자의 신발',kind:'deduce',desc:'3시 12분의 그림자는 기름 항아리를 밟고, 그 발자국 그대로 괘종시계까지 걸었다. 그 기름은 윤서의 작업화에 묻어 있다. 그림자는 윤서의 신발을 신고 있었다.'},
  sleepwalk:{name:'잠든 채 걸은 윤서',kind:'deduce',desc:'윤서는 잠든 채 일어나 설계도를 괘종시계에 숨겼다. 눈은 뜨고 있었지만 깨어 있지 않았다. 그래서 본인은 기억하지 못한다.'},
  noIntruder:{name:'밖에서 온 도둑은 없다',kind:'deduce',desc:'창틀엔 흔적이 없고, 발자국은 방 안에서만 오갔다. 창문으로 들어온 도둑은 없다.'}},
 spots:[
  {id:'tube',x:318,y:188,mx:318,my:104,label:'설계도 통',look:[['','작업대 위 가죽 통. 비어 있다.'],['','…그런데 뚜껑이 얌전히 닫혀 있다. 끈까지 다시 묶여 있다.'],['똑딱','훔쳐 가는 도둑이 뚜껑을 다시 닫고 끈까지 묶고 갈까…?']],again:[['','빈 설계도 통. 뚜껑은 가지런히 닫혀 있었다.']],give:'tube'},
  {id:'wclock',x:185,y:186,mx:185,my:48,label:'벽시계',look:[['','윤서의 침대 위 벽시계. 3시 12분에 멈춰 있다.'],['','태엽은 아직 넉넉하게 감겨 있는데…'],['똑딱','톱니 사이에 뭔가 끼어 있어. 검은… 가루? 기름 찌꺼기랑은 달라. 차갑고, 가벼워.'],['똑딱','3시 12분. 이 시각을 기억해 두자, 하루.']],again:[['','3시 12분에 멈춘 벽시계. 톱니엔 검은 가루.']],give:'clock312'},
  {id:'shoes',x:250,y:258,mx:248,my:246,label:'작업화',look:[['','윤서의 작업화. 침대 발치에 가지런히 놓여 있다.'],['','밑창이 검은 태엽기름으로 흠뻑 젖었다. 아직 마르지 않았다.'],['똑딱','밤사이에 묻은 거야. 저녁에 묻었으면 벌써 말랐을걸.']],again:[['','기름에 젖은 작업화. 아직 축축하다.']],give:'shoes'},
  {id:'prints',x:330,y:204,mx:330,my:180,label:'바닥',look:[['','바닥에 검게 번진 발자국.'],['','침대 앞에서 시작해서… 작업대를 지나… 괘종시계 앞에서 멈췄다가, 다시 침대로 돌아온다.'],['똑딱','창문 쪽으론 한 발짝도 없어. 그리고 누리의 침상 바로 앞을 지나가.']],again:[['','침대 ↔ 괘종시계를 오간 검은 발자국.']],give:'prints'},
  {id:'window',x:476,y:186,mx:476,my:40,label:'열린 창문',look:[['','활짝 열린 창문. 새벽 바람이 들어온다.'],['','창틀에는 먼지가 고르게 쌓여 있다. 손자국도, 발자국도, 옷자락이 쓸린 자국도 없다.']],again:[['','열린 창문. 창틀의 먼지는 멀쩡하다.']],give:'sill'},
  {id:'score',x:486,y:252,mx:486,my:236,label:'종이 조각',look:[['','구겨진 악보 조각이 떨어져 있다.'],['','뒷면엔… 톱니바퀴 그림! 설계도를 베낀 걸까? 한쪽 구석에 "음표"라는 서명.']],again:[['','음표의 악보 조각. 뒷면에 톱니 그림.']],give:'score'},
  {id:'candle',x:112,y:192,mx:112,my:150,label:'누리의 양초',look:[['','누리의 침상 옆 양초. 끝까지 다 타서 촛농만 남았다.'],['똑딱','이 양초, 윤서 공방에서 쓰는 거랑 같아. 새것이면 대여섯 시간은 타.']],again:[['','끝까지 타 버린 양초.']],give:'candle'},
  {id:'gclock',x:419,y:192,mx:419,my:56,label:'괘종시계',look:(cs,first)=>cs.flags.gOpen?(cs.got.has('found')?[['','괘종시계. 설계도가 숨어 있던 곳이다.']]:[['하루','(그림자가 여기에 무언가를 넣었어…!)'],['','유리문을 열자— 추 뒤에 돌돌 말린 종이가 끼워져 있다.'],['윤서','내 설계도!! …어떻게 여기에?'],['','설계도는 찢어진 곳 하나 없이 정성스럽게 말려 있었다. 그리고 뒷면에는—'],['','"지켜야 해. 지켜야 해." 삐뚤빼뚤한 글씨.'],['윤서','…이거, 내 글씨야. 그런데 이런 걸 쓴 기억이… 없어.']]):[['','커다란 괘종시계. 추가 멈춰 있다. 이것도… 3시 12분.'],['윤서','그건 할아버지 유품이야. 함부로 열지 마.'],['똑딱','(발자국이 이 앞에서 멈춰. 뭔가 걸리는데… 근거 없이 열 순 없어.)']],give:cs=>cs.flags.gOpen&&!cs.got.has('found')?['found','scrawl']:null},
  {id:'rw',x:280,y:236,mx:280,my:214,label:'시간의 잔향',rewind:1,cond:cs=>cs.got.has('clock312')}],
 npcs:[
  {id:'yunseo',name:'윤서',x:334,y:210,face:'auto',talk:cs=>cs.got.has('found')?[['윤서','…내가 숨겼다고? 말도 안 돼. 난 기억이 하나도 없어.'],['윤서','하지만 저 글씨는… 분명 내 거야.']]:cs.got.has('shoes')?[['윤서','내 작업화? 어제 저녁에 기름실 정리하다 묻었겠지.'],['똑딱','(하지만 아직 안 말랐어. 저녁에 묻은 거면 벌써 말랐을 텐데.)'],['윤서','난 두 시에 누워서 아침까지 한 번도 안 깼어. 확실해.']]:[['윤서','설계도만 찾으면 돼. 삼 년이야, 삼 년!'],['윤서','음표야. 틀림없어. 그 사람, 내 톱니를 늘 부러워했거든.']]},
  {id:'hangyeol',name:'한결',x:150,y:250,face:'auto',talk:cs=>(cs.flags.t_hangyeol||0)===0?[['한결','난 한결. 윤서랑 같이 기계를 만들어. 어젯밤엔 두 시까지 같이 있었지.'],['한결','공방을 나설 때 설계도는 분명 통 안에 있었어. 창문? 윤서는 밤새 일할 땐 늘 창문을 열어 둬. 기름 냄새 때문에.']]:[['한결','…너희한테만 말하는 건데.'],['한결','요즘 윤서가 좀 이상해. 아침에 일어나면 손이며 발에 기름이 묻어 있대. 본인은 전혀 기억을 못 하고.'],['한결','과로 때문이겠지… 그렇겠지?']],give:cs=>(cs.flags.t_hangyeol||0)<=1?'hangyeol':'hands'},
  {id:'eumpyo',name:'음표',x:468,y:214,face:'auto',talk:cs=>cs.got.has('score')?[['음표','그 악보? 오르골에 새길 곡이오. 뒷면 톱니는 오르골 도안이고!'],['윤서','…오르골 톱니네. 설계도의 톱니랑은 크기부터 달라.'],['음표','그것 보시오! 어젯밤 여덟 시에 오르골 태엽을 부탁하러 왔다가, 그냥 돌아갔을 뿐이오.']]:[['음표','나를 의심하는 거요? 억울하오! 나는 음악가요, 도둑이 아니라.'],['음표','어젯밤 여덟 시에 잠깐 들렀소. 그때 창문은 닫혀 있었지.']],give:cs=>cs.got.has('score')?'scoreOk':null},
  {id:'nuri',name:'누리',x:62,y:188,face:'auto',sit:0,talk:cs=>[['누리','…저, 저는 누리예요. 선생님 제자요.'],['누리','저는 아무것도 몰라요. 정말이에요.'],['똑딱','(눈을 못 마주치네. 뭔가 숨기고 있어. 증거를 더 모은 다음 제대로 이야기해 보자.)']]}],
 combos:[
  ['shadow312','spill','feet',[['하루','그림자는 넘어진 기름을 그대로 밟고 걸었어.'],['똑딱','그리고 그 기름이 흠뻑 묻은 신발이… 잠깐, 아직 하나가 빠졌어.']]],
  ['shadow312','shoes','feet',[['하루','그림자가 남긴 검은 발자국… 그리고 기름에 젖은 윤서의 작업화.'],['똑딱','그림자는 윤서의 신발을 신고 걸었어! 그 신발은 밤새 침대 발치에 있었고.']]],
  ['feet','nuriNote','sleepwalk',[['하루','눈을 뜬 채, 대답도 없이 걸어 다녔다…'],['똑딱','누리의 공책이랑 딱 맞아. 윤서는 잠든 채로 걸었던 거야! 그래서 기억을 못 하는 거고.']]],
  ['prints','sill','noIntruder',[['하루','창틀엔 흔적이 없어. 그리고 발자국은 방 안에서만 오갔어.'],['똑딱','밖에서 들어온 도둑은 없었다는 거지. 창문은 윤서가 연 것뿐이야.']]]],
 rewind:{label:'공방',t0:10500,t1:12300,start:10800,marks:[{t:11520,label:'3:12',need:['clock312']}],
  ghosts:[
   {id:'shadow',who:'윤서',shadow:1,name:'검은 그림자',track:[[10500,205,192,'gone'],[11370,205,192,'stand'],[11400,282,184,'stand'],[11470,282,184,'stand'],[11500,418,190,'stand',0],[11560,418,190,'stand',0],[11630,208,192,'stand'],[11640,208,192,'gone']]},
   {id:'nuri',who:'누리',name:'누리의 잔향',track:[[10500,62,188,'sit',0],[11690,62,188,'sit',0],[11700,70,196,'stand',0],[11770,70,196,'stand',0],[11780,62,188,'sit',0]]}],
  events:[
   {target:'shadow',t0:11400,t1:11470,clue:'spill',lines:[['','— 포착! 3시 10분. 그림자가 작업대의 통을 열고 돌돌 말린 종이를 꺼낸다.'],['','팔꿈치에 걸린 기름 항아리가 넘어진다. 그림자는 돌아보지도 않고 쏟아진 기름을 밟고 지나간다.'],['똑딱','소리가 났을 텐데… 전혀 신경 안 써. 마치 아무것도 안 보이는 것처럼.']]},
   {target:'shadow',t0:11490,t1:11570,clue:'shadow312',lines:[['','— 포착! 3시 12분. 그림자가 괘종시계의 유리문을 열고, 말린 종이를 추 뒤에 밀어 넣는다.'],['','그 순간, 방 안의 모든 시계가 "딱" 하고 멈춘다.'],['똑딱','얼굴은… 안 보여. 하지만 저 괘종시계 안이야, 하루!'],['똑딱','(나중에 괘종시계를 직접 열어 보자.)']],after:cs=>{cs.flags.gOpen=1}}],
  notes:[
   {target:'shadow',t0:11370,t1:11399,lines:[['','그림자가 침대 쪽에서 스르륵 일어난다. 발걸음이 이상하게 고르다.']]},
   {target:'shadow',t0:11571,t1:11640,lines:[['','그림자가 같은 걸음으로 침대 쪽으로 돌아간다. …그리고 사라진다.']]},
   {target:'nuri',t0:11690,t1:11780,lines:[['','3시 15분. 누리가 벌떡 일어나 무언가를 부르고 있다. 입 모양은 "선생님…?"'],['똑딱','누리는 깨어 있었어! 그리고 무언가를 봤어.']]},
   {target:'nuri',t0:10500,t1:11689,lines:[['','누리가 침상에 앉아 촛불 아래서 무언가를 적고 있다. 한밤중인데.']]}]},
 interro:{who:'nuri',name:'누리',role:'윤서의 제자 · 열한 살',need:['candle','prints','shoes'],
  pre:[['하루','누리. 어젯밤 일, 다시 이야기해 줄래?'],['누리','…네. 저는 정말 아무것도 몰라요.'],['똑딱','(박동을 들어 보자, 하루. 누리의 심장 소리.)']],
  retry:[['누리','…또요? 저는 할 말 다 했어요.']],
  stmts:[
   {txt:'어젯밤엔 열 시에 일찍 잤어요. 촛불도 바로 껐고요.',hb:'skip',lie:1,by:'candle',press:[['누리','정말이에요. 열 시요. 선생님이 일찍 자라고 하셨거든요.'],['똑딱','(박동이 널뛰어… 하지만 증거 없이 몰아붙일 순 없어.)']],brk:[['누리','…! 그, 그건…'],['누리','…사실 늦게까지 태엽 공부를 했어요. 선생님처럼 되고 싶어서요. 초가 다 탈 때까지요.']],truth:'늦게까지 촛불을 켜고 공부했어요. 초가 다 탈 때까지.'},
   {txt:'밤새 아무 소리도 못 들었어요.',hb:'skip',lie:1,by:'prints',press:[['누리','조용했어요. 창밖 바람 소리밖에 없었어요.']],brk:[['하루','발자국이 네 침상 바로 앞을 지나가. 깨어 있었다면서, 못 들었다고?'],['누리','…발소리는 들었어요. 무거운… 작업화 소리였어요.']],truth:'무거운 작업화 발소리를 들었어요.'},
   {txt:'선생님은 밤에 한 번도 안 일어나셨어요.',hb:'skip',lie:1,by:'shoes',press:[['누리','선생님은 곤히 주무셨어요. 코도 고셨어요.']],brk:[['하루','윤서의 신발은 밤사이 흠뻑 젖었어. 누가 신고 걸었단 뜻이야.'],['누리','……'],['누리','…일어나셨어요. 세 시 조금 넘어서요. 제가 "선생님" 하고 불렀는데… 대답을 안 하셨어요.'],['누리','눈은 뜨고 계셨어요. 그런데 저를… 못 보셨어요. 이번이 세 번째예요.'],['누리','(누리가 공책을 내밀었다.)']],give:'nuriNote',truth:'선생님은 세 시 넘어 일어나 걸어 다니셨어요. 눈을 뜬 채로.'},
   {txt:'음표 아저씨는 저녁 여덟 시쯤 다녀가셨어요.',hb:'calm',lie:0,press:[['누리','오르골 얘기만 하다 가셨어요. 설계도 쪽엔 가지도 않으셨어요.']]},
   {txt:'창문은… 선생님이 밤에 여신 거예요.',hb:'fast',lie:0,press:[['누리','선생님은 밤에 일하실 땐 늘 창문을 여세요. 기름 냄새 때문에요.'],['누리','(누리는 몸을 떨고 있다. 새벽 바람이 차다.)']]}],
  wrong:['그, 그게 무슨 상관이에요…?','…무슨 말인지 모르겠어요.','왜 그런 걸 보여 주세요?'],
  fail:[['누리','…더는 말 안 할래요!'],['','누리가 이불을 뒤집어썼다.'],['똑딱','너무 몰아붙였어. 조금 있다가 다시 얘기해 보자. (다시 말을 걸면 심문 재개)']],
  done:[['누리','…선생님한테 말하지 마세요. 제발요.'],['누리','선생님이 아프신 거면… 저를 다시 고아원으로 돌려보내실지도 몰라요. 그래서 아무한테도…'],['똑딱','누리… 괜찮아. 우리가 진실을 밝힐게. 아무도 널 쫓아내지 않아.']]},
 deduce:[
  {type:'pick',q:'설계도를 통에서 꺼낸 사람은 누구인가?',opts:['창문으로 들어온 도둑','음표','누리','한결','윤서 자신'],ans:4,ok:[['하루','설계도를 꺼낸 건… 윤서, 당신이에요.'],['윤서','뭐…? 내가? 말도 안 돼!']],ng:[['똑딱','그 사람이라면 설명 안 되는 게 있어. 발자국, 신발, 그림자… 다시 이어 보자.']]},
  {type:'clue',q:'윤서는 왜 그 일을 전혀 기억하지 못하는가? 증명할 단서를 제시하라.',ans:'sleepwalk',ok:[['하루','당신은 잠든 채로 걸었어요. 누리가 봤어요. 눈을 뜬 채, 대답도 없이.'],['누리','…죄송해요, 선생님. 무서워서 말을 못 했어요.'],['윤서','누리…']]},
  {type:'clue',q:'"창문으로 들어온 도둑"이 아니라는 증거는?',ans:'noIntruder',ok:[['하루','창틀의 먼지는 멀쩡했고, 발자국은 방 안에서만 오갔어요.'],['음표','그것 보시오! 내 누명이 벗겨졌소!']]},
  {type:'pick',q:'잠든 윤서는 왜 설계도를 숨겼을까?',opts:['음표에게 몰래 팔려고','누리에게 누명을 씌우려고','꿈속에서도 설계도를 "지키려고"','실패작이라 버리려고'],ans:2,ok:[['하루','"지켜야 해." 설계도 뒷면의 글씨. 당신은 꿈속에서도 이걸 지키려고 했던 거예요.'],['윤서','……']],ng:[['똑딱','윤서가 설계도를 어떻게 다뤘는지 떠올려 봐. 찢지도, 버리지도 않았어. 정성스럽게 말아서… 그리고 뒷면에 뭐라고 적었지?']]},
  {type:'pick',q:'마지막으로. 공방의 시계들이 3시 12분에 멈춘 이유는?',opts:['잠든 윤서가 부딪혀서','태엽이 다 풀려서','누리가 멈춰서','아직 알 수 없다 — 톱니에 낀 정체 모를 검은 가루'],ans:3,ok:[['하루','태엽은 충분했어요. 부딪힌 흔적도 없고요. 톱니엔 검은 가루가… 이건 아직 모르겠어요.'],['똑딱','(모른다고 말할 줄 아는 것도 탐정이야, 하루.)']],ng:[['똑딱','벽시계를 살펴봤을 때 뭐라고 적었는지 떠올려 봐. 태엽은 넉넉했고, 톱니엔…']]}],
 truth:[['','— 진상.'],['하루','설계도 도둑은 없었어요. 윤서, 당신은 잠든 채 일어나 설계도를 꺼냈고, 기름 항아리를 넘어뜨린 줄도 모른 채 괘종시계에 숨겼어요.'],['하루','지키려고요. 누구에게서요? …그건 당신만 알겠죠.'],
  ['윤서','…요즘 꿈을 꿔. 온 마을이 멈추는 꿈. 시계도, 사람도. 그래서 이 설계도만은… 지켜야 한다고.'],['똑딱','(……온 마을이 멈추는 꿈.)'],
  ['','그때였다. 벽시계의 톱니에서 검은 가루가 스르르 흘러내렸다.'],['','가루는 바닥을 기어가 괘종시계 속으로, 추 뒤 틈새로 스며들었다.'],['윤서','할아버지 시계가… 움직여? 추가 다시 흔들리고 있어!'],['','뎅— 뎅— 뎅—. 열두 번이 아니라, 세 번. 그리고 열두 번.'],['','괘종시계가 몸을 일으켰다. 유리문 안에서 추가 심장처럼 요동쳤다.']],
 boss:{art:'pendulum',base:7,name:'한밤의 괘종',en:'MIDNIGHT PENDULUM',epi:'3시 12분을 기억하는 할아버지의 시계',
  intro:[['윤서','할아버지 시계야! 부수면 안 돼… 하지만 저대로 두면…!'],['똑딱','검은 가루가 추를 붙잡고 있어! 추를 멈추면 돼, 하루!']],
  phase:['뎅— 3시… 12분… 3시… 12분…','추가 미친 듯이 흔들린다! 검은 가루가 유리문 틈으로 새어 나온다!'],dying:'…뎅…… 이제… 쉬어도… 되겠구나…'},
 outro:[['','괘종시계의 추가 멎었다. 검은 가루가 연기처럼 빠져나와— 창밖으로, 동쪽 하늘로 흩어졌다.'],['똑딱','…마치 어딘가로 돌아가는 것 같아.'],
  ['윤서','고마워. 설계도도, 할아버지 시계도… 그리고 누리.'],['윤서','누리. 너를 돌려보낼 일은 절대 없어. 아픈 건 내 쪽인데 왜 네가 겁을 먹어.'],['누리','…선생님!'],
  ['','그때, 공방 문이 부서질 듯 열렸다.'],['한결','윤서! 광장으로 가 봐! 마을 시계가 전부 멈췄어. 그리고… 탑의 드론들이 사람들을 덮쳤어!'],['윤서','내 드론이? 그럴 리가…!'],['똑딱','하루, 가자!']],
 hints:[
  {c:cs=>!cs.got.has('clock312'),L:['벽에 걸린 시계들을 봐. 시계가 멈춘 시각이 "언제"를 알려 줘.']},
  {c:cs=>!cs.got.has('shadow312'),L:['시간의 잔향에서 3시 12분 근처를 되감아 봐. 움직이는 게 보이면 골라서 포착해!']},
  {c:cs=>!cs.got.has('found'),L:['그림자가 무언가를 넣은 그곳을 직접 열어 보자.']},
  {c:cs=>!cs.ivDone&&!(cs.got.has('candle')&&cs.got.has('prints')&&cs.got.has('shoes')),L:['누리와 제대로 이야기하려면 증거가 필요해. 누리 침상 옆, 바닥, 그리고 윤서의 물건을 살펴봐.']},
  {c:cs=>!cs.ivDone,L:['누리의 증언 중 박동이 "흔들리는" 게 거짓이야. 각각 부딪히는 단서: 초는 몇 시간 타지? 발자국은 어디를 지나? 신발은 왜 젖었지?']},
  {c:cs=>!cs.got.has('feet'),L:['잔향 속 그림자와, 밤사이 젖은 누군가의 신발을 이어 봐.']},
  {c:cs=>!cs.got.has('sleepwalk'),L:['"그림자의 신발"과 누리가 건넨 공책을 이어 봐.']},
  {c:cs=>!cs.got.has('noIntruder'),L:['창틀과 발자국을 이어 보면 "밖에서 온 도둑"을 지울 수 있어.']},
  {c:cs=>true,L:['설계도 뒷면의 낙서, 그리고 벽시계 톱니에 끼어 있던 것. 둘 다 다시 읽어 봐.']}]};
C3CASES.push(C3_CASE1);

/* ---------- CASE 02 · 3시 12분에 멈춘 시계들 ---------- */
function c3House(x,w,h,wall,roof,cam,o){o=o||{};const X=Math.round(x-cam),base=168;if(X>W+10||X+w<-10)return;const top=base-h;
 R(X,top,w,h,wall);R(X,top,w,2,shade(wall,1.2));for(let yy=top+8;yy<base;yy+=8)R(X,yy,w,1,shade(wall,.88));
 R(X-6,top-4,w+12,6,shade(roof,.7));for(let i=0;i<14;i++){const yy=top-4-i*2,inset=i*(w+12)/30;if(inset*2>w+12)break;R(X-6+inset,yy,w+12-inset*2,2,i%2?roof:shade(roof,.85))}
 if(o.door){R(X+o.door-8,base-26,16,26,'#3a2412');R(X+o.door-7,base-25,14,24,'#5a3a1c');R(X+o.door+4,base-13,2,2,'#d4ae4a')}
 for(const wx of o.wins||[]){R(X+wx-7,top+12,14,12,'#2a1a10');R(X+wx-6,top+13,12,10,o.lit?'#ffd88a':'#6a7a9a');R(X+wx-1,top+13,1,10,'#2a1a10')}
 if(o.sign){ctx.font='bold 8px monospace';const tw=ctx.measureText(o.sign).width+10,sx=X+w/2-tw/2;R(sx,top+2,tw,11,'#2a1a10');R(sx+1,top+3,tw-2,9,o.signC||'#c8a060');c3Text(o.sign,X+w/2,top+10,'#2a1408','bold 8px monospace','center')}}
function c3S2Draw(now,cam,rt,cs){const X=x=>Math.round(x-cam),t=now/1000,night=rt!=null;
 c3Sky(0,170,rt,false);if(night)c3Stars(cam,40,120,.2);else{for(let i=0;i<4;i++){const cx=((i*230+t*6-cam*.2)%900+900)%900-150;R(cx,30+i*12,50,8,'#f0f4f8');R(cx+8,26+i*12,30,6,'#f0f4f8')}}
 // 먼 산
 ctx.fillStyle=night?'#0a1024':'#7a8aa8';ctx.beginPath();ctx.moveTo(0,150);for(let x=0;x<=W;x+=20)ctx.lineTo(x,120+Math.sin((x+cam*.3)/60)*14+Math.sin((x+cam*.3)/23)*5);ctx.lineTo(W,150);ctx.fill();
 c3House(20,110,70,'#b89a78','#8a3a2a',cam,{door:30,wins:[70,96],sign:'갑돌 시계방',lit:night});
 {const x=X(75);if(x>-30&&x<W+30){const [h,m]=c3ClockTime(rt,11520);c3Clockface(x,82,8,h,m,true)}}
 c3House(150,90,62,'#a88a6a','#5a4a3a',cam,{door:44,wins:[20,70],sign:'달빛 주막',signC:'#e8d8a0',lit:rt!=null&&rt<11200});
 c3House(630,100,78,'#c8b89a','#3a4a5a',cam,{door:50,wins:[22,78],sign:'촌장 댁',signC:'#d8c890'});
 // 게시판
 {const x=X(664);R(x-14,146,28,20,'#5a3a1c');R(x-12,148,24,16,'#e8dcc0');R(x-10,151,20,1,'#3a2a1a');R(x-10,155,16,1,'#3a2a1a');R(x-10,159,18,1,'#3a2a1a');R(x-1,166,2,6,'#3a2412')}
 // 광장 바닥
 const fg=ctx.createLinearGradient(0,168,0,H);fg.addColorStop(0,night?'#3a3a48':'#a8a090');fg.addColorStop(1,night?'#1a1a24':'#6a6458');ctx.fillStyle=fg;ctx.fillRect(0,168,W,H-168);
 for(let y=176,k=0;y<H;y+=8+k*2,k++){R(0,y,W,1,night?'#2a2a34':'#8a8478');const st=18+k*6;for(let x=((k*11)%st)-cam%st;x<W;x+=st)R(x,y-6-k*2,1,6+k*2,night?'#2a2a34':'#8a8478')}
 // 시계탑 (건설 중)
 {const x=X(470);if(x>-120&&x<W+80){R(x,24,70,146,night?'#3a3440':'#8a7a6a');R(x,24,70,3,'#a89a88');for(let yy=34;yy<170;yy+=12)R(x,yy,70,1,night?'#2a2430':'#7a6a5a');R(x+20,0,30,24,night?'#2a2430':'#6a5a4a');
  for(let k=0;k<5;k++){R(x-8,20+k*30,86,2,'#6a4a2a')}R(x-8,20,2,150,'#6a4a2a');R(x+76,20,2,150,'#6a4a2a');for(let k=0;k<4;k++){ctx.strokeStyle='#6a4a2a';ctx.beginPath();ctx.moveTo(x-8,20+k*30);ctx.lineTo(x+78,50+k*30);ctx.stroke()}
  pcirc(x+35,56,16,'#2a1a0a');pcirc(x+35,56,14,'#3a3040');for(let i=0;i<8;i++){const a=i*TAU/8+t*.1;R(x+35+Math.cos(a)*10-1,56+Math.sin(a)*10-1,2,2,'#b8862a')}R(x+24,140,22,30,'#2a1a10');R(x+25,141,20,29,'#3a2412')
}}
 // 지휘판
 {const x=X(594);R(x-12,120,24,50,'#4a4a54');R(x-10,122,20,26,'#1a2a2a');for(let i=0;i<3;i++)R(x-8,126+i*6,16,2,rt!=null&&rt>11380&&rt<11420?'#ff5a5a':'#3a8a6a');R(x-8,150,5,5,'#c83a3a');R(x+3,150,5,5,'#d4ae4a');R(x-4,158,8,4,'#8a8a94')}
 // 분수 + 광장 시계
 {const x=X(360);R(x-38,190,76,26,'#8a8478');R(x-36,192,72,6,night?'#2a3a5a':'#6a9ac8');R(x-38,214,76,3,'#5a5448');R(x-3,130,6,62,'#4a4a54');const [h,m]=c3ClockTime(rt,11520);c3Clockface(x,120,13,h,m,true);
  if(rt==null||rt<11520)for(let i=0;i<4;i++){const q=(t*1.5+i/4)%1;R(x-2+Math.sin(i)*q*16,184-q*14+q*q*20,2,2,'#a8d8f8')}}
 // 쓰러진 드론들
 for(const [px,py] of [[250,250],[432,262],[540,226]]){if(rt!=null&&rt<11440)continue;const x=X(px);R(x-8,py-4,16,7,'#5a5a64');R(x-10,py-2,4,2,'#8a8a94');R(x+6,py-2,4,2,'#8a8a94');R(x-2,py-6,4,3,'#3a3a44');R(x-1,py-1,2,2,'#ff5a5a')}
 // 공구 가방, 주머니, 노름패, 지팡이 자국
 {const x=X(488);R(x-8,244,16,10,'#6a4a2a');R(x-6,242,12,3,'#8a6a3a');R(x+2,246,5,3,'#e8e0c8')}
 if(rt==null||rt>11150){const x=X(522);R(x-3,238,7,7,'#8a6a3a');R(x-1,236,3,2,'#c83a3a')}
 {const x=X(212);R(x-4,244,8,5,'#e8d8b8');R(x-3,245,2,2,'#1a1a1a');R(x+1,247,2,1,'#1a1a1a')}
 for(let i=0;i<6;i++){pcirc(X(560+i*16),208+(i%2)*3,1.5,'#4a4438')}}
function c3S2Light(now,cam,cs){RA(0,0,W,H,'#ffd8a0',.05)}
function c3WaveDraw(x,y,now,t){const k=clamp(1-Math.abs(t-11520)/25,0,1);for(let r=0;r<4;r++){const rr=(k*60+r*14)%70;ctx.globalAlpha=.6*k*(1-rr/70);ctx.strokeStyle='#1a0a2a';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,120,rr+6,0,TAU);ctx.stroke()}ctx.lineWidth=1;ctx.globalAlpha=1;pcirc(x,120,6,'#0a0510',k)}
const C3_CASE2={no:2,title:'3시 12분에 멈춘 시계들',place:'시계골 광장',when:'아침 7시',tagline:'모든 일이 한 사람의 짓은 아니다.',start:[330,250],
 scene:{w:720,y0:180,y1:272,draw:c3S2Draw,light:c3S2Light,block:[[318,184,84,34]]},
 intro:[['','광장은 아수라장이었다. 날개 부러진 드론들이 돌바닥 위에 흩어져 있고, 사람들은 멈춘 시계를 올려다보며 웅성거렸다.'],
  ['촌장 바위','봤느냐! 태엽 따위를 믿으니 이런 일이 생기는 게야!'],['촌장 바위','윤서의 드론이 새벽에 사람들을 덮쳤다. 마을 시계는 전부 멈췄고. 저 아이의 기계가 마을을 망치고 있어!'],
  ['윤서','내 드론은 사람을 공격하지 않아요! 명령이 바뀌지 않는 한…!'],['촌장 바위','사흘 주마. 그 안에 네 결백을 밝히지 못하면, 마을을 떠나라.'],
  ['똑딱','(하루. 드론이 날뛴 것, 그리고 시계가 멈춘 것. 둘 다 같은 범인일까?)']],
 clues:{
  all312:{name:'모든 시계는 3시 12분',kind:'time',desc:'광장 시계도, 갑돌 시계방의 시계 서른 개도, 집집마다의 시계도 전부 3시 12분에 멈췄다. 톱니마다 검은 가루.'},
  drone:{name:'추락한 드론',kind:'thing',desc:'공격 모드 표시등이 켜진 채 꺼졌다. 명령 기록 장치는 뜯겨 나갔다 — 누군가 증거를 없애려 했다.'},
  log310:{name:'지휘판 기록',kind:'record',desc:'"03:10:24 — 귀환 → 공격 모드 전환. 조작 열쇠: 7번." 7번 열쇠는 탑지기의 열쇠다.'},
  pouch:{name:'두꺼비 인장 주머니',kind:'thing',desc:'탑 계단 밑에 떨어진 은화 주머니. 끈의 봉인 도장은 두꺼비 모양 — 촌장 가문의 인장이다.'},
  gloves:{name:'끈적한 장갑',kind:'thing',desc:'탑지기 을순의 공구 가방 속 장갑. 드론 윤활유가 아직 끈적하다. 새벽에 드론을 만졌다는 뜻.'},
  chip:{name:'노름패',kind:'thing',desc:'주막 앞에 떨어진 노름패. 뒷면에 "갑돌 — 새벽 세 시, 외상"이라는 낙서.'},
  gapdol:{name:'갑돌의 알리바이',kind:'word',desc:'갑돌은 새벽 두 시부터 네 시까지 주막에서 노름을 했다. 주막 주인도 봤다. 탑에는 가지 않았다.'},
  notice:{name:'촌장의 방',kind:'record',desc:'"마을의 시계는 사람의 손으로 감는다. 태엽 괴물을 들이지 말라. — 촌장 바위" 날짜는 한 달 전.'},
  canemark:{name:'둥근 자국',kind:'thing',desc:'탑 입구 흙바닥, 발자국 옆에 콕, 콕 찍힌 작고 둥근 자국. 일정한 간격으로 촌장 댁 쪽을 향한다.'},
  hanTalk:{name:'윤서의 설명',kind:'word',desc:'"드론은 지휘판 명령만 들어. 명령을 바꾸려면 탑지기의 7번 열쇠가 있어야 해. 그 열쇠는 을순만 가지고 있어."'},
  handoff:{name:'건네진 주머니',kind:'time',desc:'되감기: 3시 5분, 지팡이를 짚은 그림자가 탑 앞에서 을순에게 묵직한 주머니를 건넸다. 그림자는 촌장 댁 쪽에서 와서 그쪽으로 돌아갔다.'},
  wave:{name:'3시 12분의 파동',kind:'time',desc:'되감기: 3시 12분, 광장 시계에서 검은 물결이 퍼져 나갔다. 그 순간 을순은 탑 계단에 있었다. 시계 곁에는 아무도 없었다.'},
  eulsoon312:{name:'을순의 증언: 3시 12분',kind:'word',desc:'"3시 12분에 저는 탑 계단을 내려가고 있었어요. 그때 온 마을 시계가 한꺼번에 딱 하고 멈췄어요."'},
  eulsoonDid:{name:'을순의 조작',kind:'deduce',desc:'3시 10분, 을순이 7번 열쇠로 드론을 공격 모드로 바꿨다. 장갑의 윤활유가 그 증거다.'},
  caneMan:{name:'지팡이의 주인',kind:'deduce',desc:'을순에게 돈을 건넨 자는 지팡이를 짚고 촌장 댁 쪽으로 사라졌다. 탑 앞의 둥근 자국도 촌장 댁을 향한다.'},
  chiefDeal:{name:'촌장의 거래',kind:'deduce',desc:'촌장 바위가 두꺼비 인장 주머니로 을순을 매수해 드론을 날뛰게 했다. 윤서를 마을에서 쫓아내기 위해.'},
  twoEvents:{name:'2분의 차이',kind:'deduce',desc:'드론 명령은 3시 10분, 시계가 멈춘 건 3시 12분. 을순은 그때 계단에 있었다. 둘은 서로 다른 사건이다.'}},
 spots:[
  {id:'pclock',x:360,y:224,mx:360,my:100,label:'광장 시계',look:[['','광장 시계가 3시 12분에 멈췄다.'],['갑돌','내 가게 시계 서른 개도 전부 3시 12분이야! 집집마다 다 그렇대!'],['똑딱','톱니에 또 그 검은 가루. 공방 벽시계랑 똑같아.']],again:[['','3시 12분에 멈춘 광장 시계.']],give:'all312'},
  {id:'drone',x:262,y:252,mx:250,my:236,label:'추락한 드론',look:[['','날개가 부러진 드론. 공격 모드 표시등이 켜진 채 꺼졌다.'],['','뒷판의 명령 기록 장치가… 뜯겨 나갔다. 나사 자국이 새것이다.'],['똑딱','누군가 증거를 없애려고 했어. 드론이 "스스로" 미쳤다면 이럴 필요가 없지.']],again:[['','기록 장치가 뜯긴 드론.']],give:'drone'},
  {id:'board',x:594,y:190,mx:594,my:108,label:'드론 지휘판',look:[['','드론 지휘판. 기록지가 아직 남아 있다.'],['','"03:10:24 — 귀환 → 공격 모드 전환. 조작 열쇠: 7번."'],['윤서','7번 열쇠는… 탑지기의 열쇠야.']],again:[['','03:10:24, 7번 열쇠, 공격 모드.']],give:'log310'},
  {id:'pouch',x:522,y:244,mx:522,my:226,label:'탑 계단 밑',look:[['','계단 밑에 묵직한 주머니가 떨어져 있다. 은화가 스무 닢.'],['','끈의 봉인 도장은 두꺼비 모양.'],['한결','두꺼비… 촌장 가문의 인장이야.']],again:[['','두꺼비 인장이 찍힌 은화 주머니.']],give:'pouch'},
  {id:'bag',x:488,y:250,mx:488,my:232,label:'공구 가방',look:[['','탑지기 을순의 공구 가방. 장갑이 들어 있다.'],['','드론 윤활유가… 아직 끈적하다. 새벽에 만진 거다.']],again:[['','을순의 끈적한 장갑.']],give:'gloves'},
  {id:'chip',x:212,y:252,mx:212,my:236,label:'주막 앞',look:[['','주막 문 앞에 떨어진 노름패.'],['','뒷면에 삐뚤빼뚤한 낙서: "갑돌 — 새벽 세 시, 외상"']],again:[['','"갑돌 — 새벽 세 시, 외상"']],give:'chip'},
  {id:'notice',x:664,y:196,mx:664,my:136,label:'게시판',look:[['','촌장의 방이 붙어 있다.'],['','"마을의 시계는 사람의 손으로 감는다. 태엽 괴물을 들이지 말라. — 촌장 바위"'],['똑딱','한 달 전 날짜야. 촌장은 원래부터 윤서의 기계를 싫어했어.']],again:[['','"태엽 괴물을 들이지 말라."']],give:'notice'},
  {id:'mark',x:572,y:212,mx:572,my:196,label:'탑 입구 바닥',look:[['','흙바닥에 발자국이 어지럽다.'],['','그 옆에 콕, 콕— 작고 둥근 자국이 일정한 간격으로 찍혀 있다. 촌장 댁 쪽으로 이어진다.'],['똑딱','발자국 하나에 둥근 자국 하나. …지팡이 같아.']],again:[['','촌장 댁 쪽으로 이어진 둥근 자국.']],give:'canemark'},
  {id:'rw',x:540,y:258,mx:540,my:238,label:'시간의 잔향',rewind:1,cond:cs=>cs.got.has('log310')}],
 npcs:[
  {id:'chief',name:'촌장 바위',x:640,y:220,face:'auto',talk:cs=>cs.got.has('chiefDeal')?[['촌장 바위','…할 말이 있으면 해 보거라.']]:cs.got.has('canemark')?[['촌장 바위','어젯밤? 나는 집에서 잤다.'],['촌장 바위','지팡이? 늙으면 다 짚는 거지. 그게 어쨌단 말이냐.'],['똑딱','(…목소리가 딱딱해졌어.)']]:[['촌장 바위','사흘이다. 태엽 괴물이 판치는 꼴은 못 본다.'],['촌장 바위','내 할아버지도, 그 할아버지도 손으로 시계를 감았다. 그게 사람 사는 법이야.']]},
  {id:'eulsoon',name:'을순',x:500,y:214,face:'auto',talk:[['을순','드, 드론이 알아서 미쳤어요! 전 탑지기일 뿐이에요, 모르는 일이에요!'],['똑딱','(증거를 더 모아서 제대로 캐묻자.)']]},
  {id:'gapdol',name:'갑돌',x:100,y:222,face:'auto',talk:cs=>cs.got.has('chip')?[['갑돌','노, 노름패? 그건… 아, 알았어, 알았어!'],['갑돌','새벽 두 시부터 네 시까지 주막에 있었어. 주인한테 물어봐. 마누라한텐 절대 말하지 마!'],['갑돌','드론? 난 그런 거 만질 줄도 몰라!']]:[['갑돌','내 가게 시계가 전부 멈췄어! 서른 개가 한꺼번에! 저 계집애 기계 탓이야!'],['갑돌','어젯밤? 나, 나는 집에서 곤히 잤지. 왜?'],['똑딱','(…눈을 피하네.)']],give:cs=>cs.got.has('chip')?'gapdol':null},
  {id:'yunseo',name:'윤서',x:410,y:252,face:'auto',talk:[['윤서','드론은 지휘판 명령만 들어. 그리고 명령을 바꾸려면 탑지기의 7번 열쇠가 있어야 해.'],['윤서','그 열쇠는 을순만 갖고 있어. …을순이 그랬을 리 없는데.']],give:'hanTalk'},
  {id:'hangyeol',name:'한결',x:300,y:262,face:'auto',talk:[['한결','다친 사람은 없어, 다행히. 드론이 금방 떨어졌거든.'],['한결','근데 시계가 전부 3시 12분이라니… 공방 벽시계도 그랬잖아. 우연일까?']]}],
 combos:[
  ['log310','gloves','eulsoonDid',[['하루','3시 10분, 7번 열쇠. 그리고 새벽에 드론을 만진 장갑.'],['똑딱','드론 명령을 바꾼 건 을순이야!']]],
  ['handoff','canemark','caneMan',[['하루','주머니를 건넨 그림자는 지팡이를 짚었어. 그리고 둥근 자국은 촌장 댁 쪽으로.'],['똑딱','지팡이를 짚고 촌장 댁으로 돌아간 사람…']]],
  ['caneMan','pouch','chiefDeal',[['하루','그 사람이 건넨 주머니엔 두꺼비 인장. 촌장 가문의 인장.'],['똑딱','…촌장이야. 촌장이 을순을 매수했어!']]],
  ['all312','log310','twoEvents',[['하루','드론 명령은 3시 10분. 시계는 3시 12분.'],['똑딱','2분 차이! 드론을 조작한 사람이 시계까지 멈췄다면, 2분 동안 뭘 한 거지? …아니, 둘은 다른 사건일지도 몰라.']]],
  ['wave','log310','twoEvents',[['하루','3시 10분에 드론. 3시 12분에 시계 — 그땐 시계 곁에 아무도 없었어.'],['똑딱','둘은 서로 다른 사건이야!']]],
  ['eulsoon312','log310','twoEvents',[['하루','을순은 3시 10분에 명령을 바꾸고, 3시 12분엔 계단에 있었어.'],['똑딱','시계는 을순 손을 떠나서 멈춘 거야. 둘은 다른 사건이야!']]]],
 rewind:{label:'시계탑 앞',t0:10500,t1:12000,start:10700,marks:[{t:11424,label:'3:10',need:['log310']},{t:11520,label:'3:12',need:['all312']}],
  ghosts:[
   {id:'eulsoon',who:'을순',name:'을순의 잔향',track:[[10500,420,230,'gone'],[10800,420,230,'stand'],[10860,510,214,'stand'],[11380,510,214,'stand'],[11410,590,200,'stand',0],[11440,590,200,'stand',0],[11470,540,222,'stand'],[11650,540,222,'stand'],[11700,420,236,'stand'],[11710,420,236,'gone']]},
   {id:'cane',who:'촌장 바위',shadow:1,name:'지팡이 그림자',track:[[10500,700,220,'gone'],[11000,700,220,'stand'],[11090,550,214,'stand',1],[11160,550,214,'stand',1],[11300,700,220,'stand'],[11310,700,220,'gone']]},
   {id:'wave',name:'광장 시계의 파동',h:40,w:40,draw:(x,y,now,t)=>c3WaveDraw(x,y,now,t),track:[[10500,360,160,'gone'],[11505,360,160,'stand'],[11545,360,160,'gone']]}],
  events:[
   {target:'cane',t0:11085,t1:11165,clue:'handoff',lines:[['','— 포착! 3시 5분. 지팡이를 짚은 그림자가 을순에게 묵직한 주머니를 건넨다.'],['','그림자가 낮게 무언가를 속삭인다. 을순은 한참 망설이다… 주머니를 받는다.'],['똑딱','얼굴은 안 보여. 하지만 저 느린 걸음… 콕, 콕.']]},
   {target:'wave',t0:11505,t1:11545,clue:'wave',lines:[['','— 포착! 3시 12분. 광장 시계에서 검은 물결이 퍼져 나간다.'],['','물결이 닿는 곳마다 시계들이 "딱" 하고 멈춘다. 시계 곁에는 아무도 없다.'],['똑딱','을순은… 저기, 탑 계단에 서 있어. 시계랑은 한참 떨어져서.']]}],
  notes:[
   {target:'eulsoon',t0:11400,t1:11450,lines:[['','3시 10분. 을순이 지휘판 앞에서 열쇠를 돌린다. 손이 떨린다.'],['똑딱','이건 지휘판 기록으로도 알 수 있는 거야. 기록과 딱 맞네.']]},
   {target:'eulsoon',t0:10860,t1:11080,lines:[['','을순이 탑 앞에서 누군가를 기다리며 서성인다.']]},
   {target:'eulsoon',t0:11500,t1:11650,lines:[['','을순이 계단에서 얼어붙어 광장 시계 쪽을 보고 있다.']]}]},
 interro:{who:'eulsoon',name:'을순',role:'시계탑 탑지기',need:['log310','gloves','pouch'],
  pre:[['하루','을순 씨. 새벽 일을 다시 들려주세요.'],['을순','…몇 번을 말해요. 저는 몰라요.']],retry:[['을순','또요? …좋아요. 마지막이에요.']],
  stmts:[
   {txt:'어젯밤 탑엔 아무도 없었어요. 저도 집에서 잤고요.',hb:'skip',lie:1,by:'gloves',press:[['을순','탑은 밤엔 잠가 둬요. 전 일찍 잤어요.']],brk:[['을순','…장갑이… 그건…'],['을순','…네. 새벽에 탑에 갔었어요.']],truth:'새벽에 탑에 갔었어요.'},
   {txt:'드론은 제멋대로 미친 거예요. 윤서 선생님 설계가 잘못된 거라고요.',hb:'skip',lie:1,by:'log310',press:[['을순','기계는 원래 고장 나요. 태엽 괴물이니까요.']],brk:[['을순','7번 열쇠… 제 거예요.'],['을순','3시 10분에… 제가 공격 모드로 바꿨어요. 한 번만, 딱 한 번만 날뛰게 하면 된다고 해서…']],truth:'3시 10분에 제가 공격 모드로 바꿨어요.'},
   {txt:'돈 같은 건 받은 적 없어요. 저 그런 사람 아니에요.',hb:'skip',lie:1,by:'pouch',press:[['을순','탑지기 월급으로도 충분히 살아요.']],brk:[['을순','…받았어요. 은화 스무 닢. 어머니 약값이 밀려서… 죄송해요.']],truth:'은화 스무 닢을 받았어요.'},
   {txt:'시킨 사람은 젊은 남자였어요. 발소리가 빨랐어요.',hb:'skip',lie:1,by:'canemark',press:[['을순','어두워서 얼굴은 못 봤어요. 금방 가 버렸어요.']],brk:[['을순','…아뇨. 느렸어요. 콕, 콕… 지팡이 소리가 났어요.'],['을순','얼굴은 정말 못 봤어요. 하지만… 이 마을에서 은화 스무 닢을 쉽게 내놓을 사람은…']],truth:'느린 발소리. 콕, 콕, 지팡이 소리.'},
   {txt:'시계를 멈춘 건 제가 아니에요. 전 드론만 건드렸어요.',hb:'fast',lie:0,press:[['을순','정말이에요! 시계는 만질 줄도 몰라요.'],['을순','3시 12분에 저는 탑 계단을 내려가고 있었어요. 그때 온 마을 시계가 한꺼번에 딱 하고 멈췄어요. …소름 끼쳤어요.']],pressGive:'eulsoon312'},
   {txt:'갑돌 아저씨가 새벽에 광장을 어슬렁거렸어요.',hb:'calm',lie:0,press:[['을순','주막 쪽으로 가던데요. 비틀비틀.']]}],
  wrong:['그게 뭐요?','…상관없는 얘기잖아요.','절 몰아세우지 마세요!'],
  fail:[['을순','…더는 못 하겠어요!'],['','을순이 탑 안으로 뛰어 들어가 문을 잠갔다.'],['똑딱','놓쳤어… 잠시 뒤에 다시 이야기하자.']],
  done:[['을순','…윤서 선생님한테 죄송하다고 전해 주세요. 선생님 드론은 아무 잘못 없어요.'],['똑딱','남은 건 두 가지. 을순을 움직인 게 누군지, 그리고… 시계가 왜 멈췄는지.']]},
 deduce:[
  {type:'pick',q:'드론을 공격 모드로 바꾼 사람은?',opts:['윤서 (설계 결함)','갑돌','을순','촌장 바위'],ans:2,ok:[['하루','드론 명령을 바꾼 건 탑지기 을순이에요.']],ng:[['똑딱','지휘판에 남은 기록을 떠올려 봐. 몇 번 열쇠였지?']]},
  {type:'clue',q:'그 증거를 제시하라.',ans:'eulsoonDid',ok:[['하루','3시 10분 24초, 7번 열쇠. 을순 씨의 장갑엔 드론 윤활유.'],['을순','…네. 제가 했어요.']]},
  {type:'pick',q:'을순에게 은화를 주고 그 일을 시킨 사람은?',opts:['갑돌','음표','한결','촌장 바위'],ans:3,ok:[['하루','촌장님. 당신이죠.'],['촌장 바위','……']],ng:[['똑딱','그 시각에 확실히 다른 곳에 있던 사람도 있어. 알리바이를 따져 봐.']]},
  {type:'clue',q:'그것을 증명하라.',ans:'chiefDeal',ok:[['하루','지팡이 그림자가 건넨 주머니, 그 주머니의 두꺼비 인장. 그리고 촌장 댁으로 이어진 지팡이 자국.'],['촌장 바위','…그래. 내가 했다. 저 아이를 쫓아내고 싶었어. 태엽이 사람을 대신하는 꼴은 못 본다.'],['윤서','촌장님…']]},
  {type:'pick',q:'그렇다면 마을의 시계들을 멈춘 것도 을순과 촌장인가?',opts:['그렇다 — 드론을 날뛰게 하며 시계도 멈췄다','그렇다 — 촌장이 따로 시켰다','아니다 — 시계는 누구의 손도 닿지 않은 채 멈췄다'],ans:2,ok:[['하루','아니요. 시계는 달라요.'],['촌장 바위','…시계는 내가 한 게 아니다. 나도 그게 무서웠어.']],ng:[['똑딱','드론 명령과 시계가 멈춘 시각. 정확히 몇 분이었는지 떠올려 봐.']]},
  {type:'clue',q:'그 근거는?',ans:'twoEvents',alt:['wave'],ok:[['하루','드론은 3시 10분, 시계는 3시 12분. 그리고 3시 12분엔 시계 곁에 아무도 없었어요.'],['똑딱','(두 사건이야. 드론은 사람의 욕심. 시계는… 아직 모르는 무언가.)']]}],
 truth:[['','— 진상.'],['하루','촌장님은 윤서를 쫓아내려고 을순에게 은화를 주고 드론을 날뛰게 했어요.'],['하루','하지만 시계를 멈춘 건 두 사람이 아니에요. 3시 12분, 시계는 저절로 멈췄어요. 공방에서도, 광장에서도.'],
  ['촌장 바위','…내 잘못이다. 을순, 미안하구나. 윤서… 너에게도.'],['','그때, 탑 꼭대기에서 윙— 하는 소리가 울렸다.'],['윤서','지휘판이…! 공격 모드가 아직 안 풀렸어!'],['','지휘판 틈새로 검은 가루가 스며들었다. 판이 뜯겨 나가 허공으로 떠오르고, 붉은 눈 하나가 번쩍 떠졌다.'],['','부서진 드론들이 그 눈 주위를 빙빙 돌기 시작했다.'],['똑딱','또 그 가루야! 하루, 온다!']],
 boss:{art:'panopticon',base:5,name:'감시탑 판옵티콘',en:'PANOPTICON',epi:'7번 열쇠의 명령만 기억하는 눈',
  intro:[['윤서','저 눈이 지휘판의 핵이야! 눈을 멈추면 드론이 전부 떨어질 거야!'],['똑딱','드론이 박자를 따라 움직여! 박자를 읽어, 하루!']],
  phase:['윙— 윙— 공격… 공격… 모… 드…','검은 가루가 날개마다 들러붙는다!'],dying:'…귀환… 명령… 수신…'},
 outro:[['','판옵티콘의 눈이 감기자, 드론들이 하나둘 얌전히 탑으로 돌아가 앉았다. 검은 가루는 다시 동쪽 하늘로 흩어졌다.'],
  ['촌장 바위','…사흘 약속은 없던 일로 하마. 을순의 벌은… 내가 대신 받겠다.'],['을순','촌장님…'],['윤서','드론은 제가 다시 손볼게요. 그리고 시계들도.'],
  ['','그때. 촌장 댁 쪽에서 비명 같은 목소리가 들렸다.'],['유모','어르신! 어르신! 아가씨가… 다온 아가씨가 깨어나질 않아요!'],['촌장 바위','다온이…? 내 손녀가?!'],['똑딱','…하루. 잠든 채 깨지 않는다니. 이거, 우리가 아는 그 병이야.']],
 hints:[
  {c:cs=>!cs.got.has('log310'),L:['드론은 누군가의 명령을 따라. 명령이 남아 있을 만한 곳을 찾아봐.']},
  {c:cs=>!cs.ivDone&&!(cs.got.has('gloves')&&cs.got.has('pouch')),L:['탑지기를 캐물으려면 증거가 더 필요해. 탑 주변 바닥을 잘 봐.']},
  {c:cs=>!cs.got.has('handoff'),L:['시간의 잔향에서 3시 10분보다 조금 전을 살펴봐. 누군가 탑에 찾아왔어.']},
  {c:cs=>!cs.ivDone,L:['을순의 증언 중 "빠르지만 고른" 박동은 긴장한 것뿐이야. "흔들리는" 박동만 노려. 발소리 증언엔… 바닥의 자국!']},
  {c:cs=>!cs.got.has('eulsoonDid'),L:['지휘판 기록과 을순의 장갑을 이어 봐.']},
  {c:cs=>!cs.got.has('caneMan'),L:['잔향 속 주머니를 건넨 그림자와, 탑 앞 바닥의 둥근 자국을 이어 봐.']},
  {c:cs=>!cs.got.has('chiefDeal'),L:['"지팡이의 주인"과 계단 밑 주머니를 이어 봐.']},
  {c:cs=>!cs.got.has('twoEvents'),L:['드론 명령 시각과 시계가 멈춘 시각을 나란히 놓아 봐.']},
  {c:cs=>true,L:['갑돌은 수상하지만 알리바이가 있어. 노름패를 들고 이야기해 보면 알 수 있어.']}]};
C3CASES.push(C3_CASE2);

/* ---------- CASE 03 · 첫 번째로 잠든 아이 ---------- */
function c3S3Draw(now,cam,rt,cs){const X=x=>Math.round(x-cam),t=now/1000,night=rt!=null;
 // 오른쪽: 지붕 (하늘 먼저)
 c3Sky(0,300,rt,true);if(night){c3Stars(cam,60,160,.1);const fl=clamp(1-Math.abs(rt-11520)/18,0,1);if(fl>0){RA(0,0,W,H,'#ffffff',fl*.55);const fx=X(600);pcirc(fx,50,10+fl*20,'#ffffff',fl)}}
 // 먼 마을 지붕들
 for(let i=0;i<9;i++){const x=X(380+i*40)*1,h=20+(i*13)%24;if(x<-40||x>W)continue;R(x,168-h,34,h,night?'#0a1020':'#6a5a6a');R(x-3,168-h-4,40,5,night?'#141a30':'#8a4a3a')}
 {const x=X(620);if(x>-40&&x<W+40){ctx.fillStyle=night?'#0a0e1a':'#5a5a7a';ctx.beginPath();ctx.moveTo(x-80,168);ctx.lineTo(x-20,120);ctx.lineTo(x+60,168);ctx.fill()}}
 // 지붕 면
 {const x=X(392);R(x,172,W,H-172,'#6a2a22');for(let y=176,k=0;y<H;y+=7+k,k++){R(x,y,W,1,'#4a1a14');for(let xx=x+((k*9)%14);xx<W;xx+=14)R(xx,y-6-k,1,6+k,'#4a1a14')}
  R(x,164,W,8,'#5a3a2a');R(x,164,W,2,'#8a5a3a');for(let xx=x+10;xx<W;xx+=16)R(xx,150,2,14,'#5a3a2a');R(x,150,W,2,'#8a5a3a')}
 // 굴뚝 + 사다리
 {const x=X(566);R(x-12,96,26,80,'#7a4a3a');for(let y=100;y<176;y+=6)R(x-12,y,26,1,'#5a3a2a');R(x-14,92,30,6,'#5a3a2a');R(x+16,110,2,64,'#3a3a44');R(x+22,110,2,64,'#3a3a44');for(let y=114;y<174;y+=8)R(x+16,y,8,2,'#3a3a44');if(!night&&Math.floor(t*2)%2===0)RA(x-4,82-((t*10)%16),8,6,'#c8c8d0',.4)}
 // 난간의 검은 가루
 if(!night||rt>11520){for(let i=0;i<14;i++)R(X(470+i*5),148+(i%3),3,2,'#0e0a14');for(let i=0;i<5;i++){R(X(486+i*8),152,2,1,'#0e0a14');R(X(488+i*8),151,1,1,'#0e0a14')}}
 // 망원경
 if(!night||rt<11520){if(night){const x=X(508);R(x,120,4,30,'#6a5a3a');ctx.save();ctx.translate(x+2,118);ctx.rotate(-.7);R(0,-3,26,6,'#b8862a');R(22,-4,6,8,'#d4ae4a');ctx.restore()}}
 else{const x=X(592);R(x-14,252,30,6,'#b8862a');R(x+14,250,6,10,'#d4ae4a');R(x-18,254,4,3,'#8a6a3a')}
 // 왼쪽: 방 안 (벽이 가림)
 {ctx.save();ctx.beginPath();ctx.rect(0,0,Math.max(0,X(392)),H);ctx.clip();c3Room(cam,392,'#7a6a8a','#5a4a6a');
  c3Window(40,56,48,54,cam,rt,false);if(cs&&(rt==null)){const x=X(64);R(x+26,84,4,4,'#d4ae4a')}
  // 침대
  {const x=X(96);R(x,136,110,8,'#6a4a3a');R(x+2,128,106,12,'#d8d0e8');R(x+2,128,106,2,'#f0e8ff');R(x+80,120,24,10,'#f0f0f8');R(x,104,6,78,'#5a3a2a');R(x+104,116,6,66,'#5a3a2a');R(x,144,110,4,'#4a2a1a');R(x+1,100,4,4,'#c8a060')}
  // 협탁 + 찻잔
  {const x=X(210);R(x-12,150,24,4,'#6a4a3a');R(x-10,154,3,26,'#4a2a1a');R(x+7,154,3,26,'#4a2a1a');R(x-4,144,8,6,'#e8e0f0');R(x+4,145,3,3,'#e8e0f0');R(x-3,145,6,1,'#8a6a3a')}
  // 화분
  {const x=X(262);R(x-7,140,14,12,'#a85a3a');R(x-8,138,16,3,'#c86a4a');const droop=!night||rt>10900;for(let i=0;i<5;i++){const a=-Math.PI/2+(i-2)*.5+(droop?.9*(i<2?-1:1)*.3:0);ctx.strokeStyle='#4a8a3a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,138);ctx.lineTo(x+Math.cos(a)*12,138+Math.sin(a)*12+(droop?6:0));ctx.stroke()}ctx.lineWidth=1}
  // 책상 + 일기장
  {const x=X(320);R(x-30,140,60,5,'#7a5a3a');R(x-28,145,4,34,'#5a3a2a');R(x+24,145,4,34,'#5a3a2a');R(x-12,134,20,6,'#c83a5a');R(x-11,134,18,1,'#e85a7a');R(x+12,132,6,8,'#e8dcc0');R(x-26,110,50,20,'#e8dcc0');for(let i=0;i<6;i++)R(x-22+i*8,114+(i%2)*6,2,2,'#3a4a8a')}
  // 촛대
  c3Candle(X(210),144,night,now,false);
  ctx.restore()}
 // 벽 단면
 {const x=X(380);R(x,0,14,H,'#3a2a2a');R(x+2,0,2,H,'#5a4a4a');R(x+10,0,2,H,'#2a1a1a');R(x,236,14,H-236,'#1a1010');R(x+2,238,10,H-238,'#4a3020');R(x-2,234,18,3,'#6a4a3a')}}
function c3S3Light(now,cam,cs){c3Lamp(Math.round(64-cam),84,90,'rgba(255,200,160,.3)',.8)}
function c3FlashDraw(x,y,now,t){const k=clamp(1-Math.abs(t-11520)/15,0,1);pcirc(x,50,6+k*14,'#ffffff',.9);ctx.globalAlpha=.5*k;ctx.strokeStyle='#ffffff';ctx.lineWidth=2;for(let i=0;i<8;i++){const a=i*TAU/8+now/400;ctx.beginPath();ctx.moveTo(x,50);ctx.lineTo(x+Math.cos(a)*40*k,50+Math.sin(a)*40*k);ctx.stroke()}ctx.lineWidth=1;ctx.globalAlpha=1;
 for(let i=0;i<20;i++){const px=x-60+((i*37)%140),py=50+((t-11515)*6+i*13)%120;R(px,py,2,2,'#0e0a14')}}
function c3BoyDraw(x,y,now,t){const k=clamp((t-11515)/45,0,1),yy=40+k*150,xx=x+k*40;ctx.save();ctx.translate(xx,yy);ctx.rotate(k*6);ctx.globalAlpha=.85;try{drawKnight(ctx,-12,-19,2,false,null,0)}catch(e){}ctx.restore();ctx.globalAlpha=1;pcirc(Math.round(xx+14),Math.round(yy-16),3,'#ffd98a',.9);ctx.globalAlpha=.4;ctx.strokeStyle='#ffffff';ctx.beginPath();ctx.moveTo(xx,yy);ctx.lineTo(xx-10,yy-40);ctx.stroke();ctx.globalAlpha=1}
const C3_CASE3={no:3,title:'첫 번째로 잠든 아이',place:'촌장 댁 · 다온의 방과 지붕',when:'오전 9시',tagline:'별똥별은 떨어지지 않았다.',start:[240,240],
 scene:{w:640,y0:180,y1:272,draw:c3S3Draw,light:c3S3Light,block:[[378,178,18,58]]},
 intro:[['','촌장 댁. 다온의 방에는 아침 햇살이 가득한데, 침대 위 아이는 눈을 뜨지 않았다.'],
  ['촌장 바위','의원도 모르겠다는구나. 숨은 쉬는데… 아무리 불러도 깨지 않아.'],['촌장 바위','…윤서. 어젯밤 일은 내가 잘못했다. 염치없지만, 부탁한다. 다온을… 내 손녀를 깨워 다오.'],
  ['윤서','…당연하죠. 다온이는 제 드론을 제일 좋아하던 아이예요.'],['유모','아가씨는 어젯밤 아홉 시에 제가 재워 드렸어요. 그런데 아침에 보니…'],
  ['똑딱','(하루. 우리 시대의 "잠의 병"… 시계골 사람들이 하나둘 잠들던 그 병. 이 아이가, 첫 번째야.)'],
  ['똑딱','(방 안, 그리고 창밖 지붕까지 전부 살펴보자. 문 옆 틈으로 지붕에 나갈 수 있어.)']],
 clues:{
  soles:{name:'검은 발바닥',kind:'thing',desc:'잠든 다온의 발바닥이 새까맣다. 공방 벽시계와 광장 시계 톱니에 끼어 있던 그 검은 가루.'},
  tea:{name:'식은 수면차',kind:'thing',desc:'협탁 위 찻잔. 진하게 우린 수면차가 바닥에 조금 남았다. 누군가 다온을 재우려 했다?'},
  plantTea:{name:'차 냄새 나는 화분',kind:'thing',desc:'창가 화분의 흙에서 달큰한 수면차 냄새가 난다. 잎이 축 늘어졌다. 누군가 차를 화분에 부었다.'},
  diaryStar:{name:'다온의 일기',kind:'record',desc:'"오늘 밤 3시에 별똥별이 떨어진대! 할아버지 망원경 몰래 빌려서 지붕에서 볼 거다. 유모가 주는 차는 안 마실 거야. 비밀!"'},
  latch:{name:'풀린 걸쇠',kind:'thing',desc:'창문 걸쇠가 안쪽에서 풀려 있다. 밖에서는 열 수 없는 걸쇠다. 창밖은 지붕으로 이어지는 처마.'},
  railDust:{name:'난간의 검은 가루',kind:'thing',desc:'지붕 난간에 검은 가루가 소복하다. 작은 맨발 자국이 가루 위에 찍혀 있다 — 그리고 한가운데서 뚝 끊긴다.'},
  telescope:{name:'쓰러진 망원경',kind:'thing',desc:'촌장의 망원경이 지붕에 쓰러져 있다. 렌즈는 동쪽 하늘, 광산 위를 향해 있었다.'},
  chimLadder:{name:'굴뚝 사다리',kind:'thing',desc:'굴뚝 옆에 붙박이 쇠 사다리가 있다. 굴뚝 청소용이라 떼어 낼 수 없다. 방 안 처마와 이어진다.'},
  tickDust:{name:'똑딱의 가루',kind:'thing',desc:'검은 가루 가까이 가자 똑딱의 톱니가 떨렸다. 똑딱의 몸에서도 같은 가루가 조금 떨어져 나왔다.'},
  chiefOut:{name:'촌장의 부재',kind:'word',desc:'촌장은 어젯밤 탑에 가 있었다. 을순에게 은화를 건네러. 그래서 망원경이 없어진 것도 몰랐다.'},
  flash312:{name:'3시 12분의 섬광',kind:'time',desc:'되감기: 3시 12분, 동쪽 하늘이 하얗게 찢어지고 검은 가루가 비처럼 쏟아졌다. 난간에 앉아 있던 다온이 그 가루를 맞고 쓰러졌다.'},
  fallingBoy:{name:'떨어지는 그림자',kind:'time',desc:'되감기: 섬광 속에서 작은 사람 그림자가 떨어졌다. 금빛 톱니 같은 것이 곁에서 반짝였다. 광산 쪽으로 사라졌다.'},
  roofDust:{name:'맨발로 밟은 가루',kind:'deduce',desc:'다온은 맨발로 지붕에 나가 난간 위 검은 가루를 밟았다. 발바닥의 가루와 난간의 가루는 같은 것이다.'},
  skyDust:{name:'하늘에서 내린 가루',kind:'deduce',desc:'3시 12분의 섬광과 함께 쏟아진 검은 가루가 다온을 잠재웠다. 차도, 독도, 병도 아니다.'},
  noTea:{name:'마시지 않은 차',kind:'deduce',desc:'다온은 별똥별을 보려고 유모가 준 수면차를 화분에 부었다. 차는 원인이 아니다.'},
  weCame:{name:'우리가 가져온 것',kind:'deduce',desc:'3시 12분의 섬광은 하루와 똑딱이 이 시대로 떨어진 순간이었다. 똑딱의 톱니에서도 같은 가루가 나왔다. 검은 가루는… 우리와 함께 왔다.'}},
 spots:[
  {id:'soles',x:150,y:190,mx:118,my:118,label:'잠든 다온',look:[['','잠든 다온. 숨은 고른데, 아무리 불러도 깨지 않는다.'],['','이불 밖으로 나온 발바닥이… 새까맣다.'],['윤서','이건… 공방 시계 톱니에 끼어 있던 그 가루잖아?']],again:[['','다온의 발바닥엔 검은 가루.']],give:'soles'},
  {id:'tea',x:210,y:188,mx:210,my:130,label:'찻잔',look:[['','협탁 위 찻잔. 식은 차가 조금 남았다. 달큰하고 진한 냄새.'],['윤서','수면차야. 꽤 진하게 우렸네.']],again:[['','진한 수면차가 남은 찻잔.']],give:'tea'},
  {id:'plant',x:262,y:188,mx:262,my:124,label:'화분',look:[['','창가 화분. 잎이 축 늘어졌다.'],['','흙에 코를 대 보니… 달큰한 수면차 냄새.'],['똑딱','누가 차를 화분에 부었어. 한 잔 가득.']],again:[['','수면차 냄새가 나는 화분.']],give:'plantTea'},
  {id:'diary',x:320,y:188,mx:314,my:124,label:'책상',look:[['','책상 위 빨간 일기장. 자물쇠가 풀려 있다.'],['','"오늘 밤 3시에 별똥별이 떨어진대! 할아버지 망원경 몰래 빌려서 지붕에서 볼 거다."'],['','"유모가 주는 차는 안 마실 거야. 비밀!"'],['똑딱','…별똥별?']],again:[['','"3시에 별똥별이 떨어진대!"']],give:'diaryStar'},
  {id:'latch',x:64,y:190,mx:64,my:44,label:'창문',look:[['','창문 걸쇠가 풀려 있다. 안쪽에서만 여닫는 걸쇠다.'],['','창밖은 처마. 처마는 지붕으로 이어진다.']],again:[['','안쪽에서 풀린 걸쇠.']],give:'latch'},
  {id:'rail',x:500,y:190,mx:500,my:140,label:'지붕 난간',look:[['','지붕 난간에 검은 가루가 소복하게 쌓였다.'],['','그 위에 작은 맨발 자국. 난간을 따라 걷다가… 한가운데서 뚝 끊겼다.'],['똑딱','여기서 쓰러진 거야. 가루는 위에서, 하늘에서 내린 것처럼 고르게 쌓였어.']],again:[['','작은 맨발 자국과 검은 가루.']],give:'railDust'},
  {id:'scope',x:592,y:252,mx:592,my:236,label:'망원경',look:[['','지붕에 쓰러진 망원경. 촌장의 것이다.'],['','렌즈는 동쪽 하늘… 광산 위쪽을 향하도록 고정돼 있었다.']],again:[['','동쪽 하늘을 향하던 망원경.']],give:'telescope'},
  {id:'ladder',x:586,y:196,mx:590,my:124,label:'굴뚝',look:[['','굴뚝 옆에 붙박이 쇠 사다리가 달려 있다. 굴뚝 청소용.'],['','떼어 낼 수 없는 사다리다. 사다리 끝은 방 창문 처마와 닿아 있다.']],again:[['','떼어 낼 수 없는 굴뚝 사다리.']],give:'chimLadder'},
  {id:'tick',x:460,y:232,mx:460,my:212,label:'똑딱이 떨린다',cond:cs=>cs.got.has('railDust')&&cs.got.has('soles'),look:[['똑딱','…어? 하루, 잠깐. 내 톱니가… 떨려.'],['','똑딱이 몸을 털자, 톱니 사이에서 검은 가루가 조금 떨어져 내렸다.'],['똑딱','이거… 같은 가루야. 왜 나한테서…?'],['똑딱','우리 여기 떨어졌을 때 묻었나? 그때가… 몇 시였지?']],again:[['똑딱','내 톱니에서 나온 검은 가루. …같은 거야.']],give:'tickDust'},
  {id:'rw',x:520,y:246,mx:520,my:226,label:'시간의 잔향',rewind:1,cond:cs=>cs.got.has('railDust')}],
 npcs:[
  {id:'daon',name:'다온',x:142,y:132,lie:1,zz:1,cond:()=>true,talk:[['다온','…새근… 새근…'],['','다온은 깊이 잠들어 있다.']]},
  {id:'chief',name:'촌장 바위',x:300,y:252,face:'auto',talk:cs=>[['촌장 바위','다온이는 별을 좋아했어. 내 망원경을 늘 탐냈지. 어젯밤… 나는 집에 없었다.'],['촌장 바위','알잖나. 탑에 있었지. 을순에게… 그러느라 손녀가 지붕에 올라간 줄도 몰랐어.']],give:'chiefOut'},
  {id:'yunseo',name:'윤서',x:230,y:262,face:'auto',talk:cs=>cs.got.has('soles')?[['윤서','3시 12분에 멈춘 시계들. 톱니에 낀 검은 가루. 그리고 이 아이.'],['윤서','전부 이어져 있어. …그 꿈이랑도.']]:[['윤서','숨도 맥박도 괜찮아. 그냥… 깊이, 너무 깊이 잠든 것 같아.']]},
  {id:'nanny',name:'유모',x:96,y:244,face:'auto',talk:[['유모','제가 밤새 곁을 지켰어요. 정말이에요. 아가씨는 아홉 시에 잠드셨고…'],['똑딱','(증거를 더 모으자. 이 방, 그리고 지붕.)']]}],
 combos:[
  ['soles','railDust','roofDust',[['하루','발바닥의 가루, 그리고 난간 위 작은 맨발 자국.'],['똑딱','다온은 맨발로 지붕에 나가서 그 가루를 밟았어.']]],
  ['roofDust','flash312','skyDust',[['하루','3시 12분, 하늘이 찢어지고 가루가 쏟아졌어. 다온은 바로 그 아래 있었고.'],['똑딱','차도, 독도 아니야. 하늘에서 내린 가루가 다온을 잠재웠어.']]],
  ['plantTea','diaryStar','noTea',[['하루','"유모가 주는 차는 안 마실 거야." 그리고 차 냄새 나는 화분.'],['똑딱','다온은 차를 몰래 화분에 부었어. 별똥별을 보려고!']]],
  ['fallingBoy','tickDust','weCame',[['하루','섬광 속에서 떨어진 작은 그림자… 곁에서 반짝인 금빛 톱니.'],['똑딱','……'],['똑딱','하루. 저건 우리야. 3시 12분은… 우리가 이 시대로 떨어진 시각이야.'],['똑딱','그리고 내 톱니에서 나온 가루. 검은 가루는… 우리랑 같이 온 거야.']]]],
 rewind:{label:'지붕 위',t0:10500,t1:12300,start:10700,marks:[{t:11520,label:'3:12',need:['railDust']}],
  ghosts:[
   {id:'daon',who:'다온',name:'다온의 잔향',track:[[10500,392,210,'gone'],[10800,392,214,'stand'],[10900,500,200,'stand'],[10910,500,200,'sit'],[11470,500,200,'sit'],[11480,500,200,'stand'],[11520,500,200,'stand'],[11530,504,206,'lie'],[12300,504,206,'lie']]},
   {id:'flash',name:'하늘의 섬광',w:60,h:60,draw:(x,y,now,t)=>c3FlashDraw(x,y,now,t),track:[[10500,600,100,'gone'],[11505,600,100,'stand'],[11540,600,100,'gone']]},
   {id:'boy',name:'떨어지는 그림자',w:40,h:40,draw:(x,y,now,t)=>c3BoyDraw(x,y,now,t),track:[[10500,600,80,'gone'],[11515,600,80,'stand'],[11560,600,80,'gone']]}],
  events:[
   {target:'flash',t0:11505,t1:11540,clue:'flash312',lines:[['','— 포착! 3시 12분. 동쪽 하늘이 하얗게 찢어진다.'],['','찢어진 틈에서 검은 가루가 비처럼 쏟아진다. 난간 위 다온이 하늘을 향해 손을 뻗고—'],['','— 그대로 쓰러진다.'],['똑딱','별똥별이… 아니야. 저건 뭐지?']]},
   {target:'boy',t0:11515,t1:11560,clue:'fallingBoy',lines:[['','— 포착! 섬광 속에서 작은 사람 그림자가 떨어진다.'],['','곁에서 금빛 톱니 같은 것이 반짝인다. 그림자는 광산 쪽으로 사라진다.'],['하루','……'],['똑딱','……하루. 저 모습.']]}],
  notes:[
   {target:'daon',t0:10800,t1:10905,lines:[['','다온이 창문 처마를 타고, 굴뚝 사다리를 잡고 지붕으로 올라온다. 맨발이다. 망원경을 끌어안고 있다.']]},
   {target:'daon',t0:10906,t1:11500,lines:[['','다온이 난간에 앉아 동쪽 하늘을 올려다본다. 설레는 얼굴이다.'],['똑딱','별똥별을 기다리고 있어.']]},
   {target:'daon',t0:11501,t1:12300,lines:[['','다온이 쓰러져 있다. 검은 가루가 소리 없이 내려앉는다.']]}]},
 interro:{who:'nanny',name:'유모',role:'다온의 유모',need:['plantTea','latch','railDust'],
  pre:[['하루','유모님. 어젯밤 이야기를 자세히 들려주세요.'],['유모','…네. 뭐든 여쭤보세요. 아가씨만 깨어날 수 있다면.']],retry:[['유모','…다시 말씀드릴게요.']],
  stmts:[
   {txt:'저는 밤새 아가씨 곁을 지켰어요. 한순간도 자리를 비우지 않았어요.',hb:'skip',lie:1,by:'latch',press:[['유모','의자에 앉아 밤새 아가씨 숨소리를 들었어요.']],brk:[['유모','…걸쇠가…'],['유모','…네. 깜빡 졸았어요. 눈을 떠 보니 새벽 네 시였어요. 창문이 조금 열려 있었는데… 바람 때문인 줄 알았어요.']],truth:'깜빡 졸았어요. 깨 보니 새벽 네 시였어요.'},
   {txt:'수면차 같은 건 드리지 않았어요.',hb:'skip',lie:1,by:'plantTea',press:[['유모','아가씨는 차를 싫어하세요.']],brk:[['유모','…드렸어요. 요즘 밤마다 지붕에 올라가려고 하셔서… 푹 주무시라고 진하게요.'],['유모','그런데 화분에…? 안 드셨다고요? 세상에…']],truth:'진한 수면차를 드렸어요. …화분에 부으셨다니.'},
   {txt:'지붕엔 절대 못 올라가요. 사다리는 제가 치워 뒀거든요.',hb:'calm',lie:1,by:'chimLadder',press:[['유모','마당의 나무 사다리는 헛간에 넣고 잠갔어요. 확실해요.']],brk:[['유모','굴뚝… 붙박이 사다리요? 굴뚝 청소하는 그거…?'],['유모','세상에. 그건 생각도 못 했어요. 아가씨가 그걸 타고…'],['똑딱','(박동은 고요했어. 유모는 거짓말을 한 게 아니라, 몰랐던 거야.)'],['똑딱','(거짓말이 아니어도, 틀린 말은 반박할 수 있어. 기억해 둬, 하루.)']],truth:'나무 사다리는 치웠지만, 굴뚝 사다리는 몰랐어요.'},
   {txt:'그 검은 가루는 난생처음 봐요. 정말이에요.',hb:'fast',lie:0,press:[['유모','아침에 아가씨 발을 보고 기절할 뻔했어요. 닦아도 닦아도 안 지워져요.']]},
   {txt:'어르신은 그날 밤 댁에 안 계셨어요.',hb:'calm',lie:0,press:[['유모','자정쯤 나가셨다가 새벽에 들어오셨어요. 어디 가셨는지는… 모르겠어요.']]},
   {txt:'아가씨는 별 같은 거엔 관심도 없는 아이예요.',hb:'skip',lie:1,by:'diaryStar',press:[['유모','인형 놀이만 좋아하시죠.']],brk:[['유모','…별똥별을 보려고…? 그런 얘긴 한 번도…'],['유모','저한텐 비밀로 하셨군요. …제가 너무 엄했나 봐요.']],truth:'별똥별을 보려고 했다는 건 몰랐어요.'}],
  wrong:['그게 무슨…?','아가씨 일이랑 무슨 상관이 있나요?','저를 의심하시는 건가요…?'],
  fail:[['유모','…죄송해요. 지금은 더 말씀 못 드리겠어요.'],['','유모가 앞치마로 얼굴을 가렸다.'],['똑딱','잠시 쉬었다가 다시 이야기하자.']],
  done:[['유모','제가 조금만 더 깨어 있었더라면…'],['윤서','유모님 탓이 아니에요. 이건… 뭔가 다른 거예요.'],['똑딱','(하루. 다온이 지붕에서 본 "별똥별". 그게 뭔지 알아내야 해.)']]},
 deduce:[
  {type:'pick',q:'다온을 깨지 않는 잠에 빠뜨린 것은?',opts:['유모의 수면차','누군가 먹인 독','3시 12분에 내린 검은 가루','원래 앓던 병'],ans:2,ok:[['하루','검은 가루예요. 3시 12분에 내린.']],ng:[['똑딱','다온의 몸에 남은 흔적을 떠올려 봐. 발바닥.']]},
  {type:'clue',q:'유모의 수면차가 원인이 아니라는 증거는?',ans:'noTea',ok:[['하루','다온은 차를 마시지 않았어요. 화분에 부었죠. 별똥별을 보려고.'],['유모','…아가씨.']]},
  {type:'clue',q:'검은 가루는 어디서 왔나? 증명하라.',ans:'skyDust',ok:[['하루','하늘에서요. 3시 12분에 동쪽 하늘이 찢어지면서 쏟아졌어요. 다온은 바로 그 아래 있었고요.']]},
  {type:'pick',q:'다온은 한밤중에 왜 지붕에 있었나?',opts:['유모가 데려가서','집을 나가려고','별똥별을 보려고','잠든 채 걸어서 (몽유)'],ans:2,ok:[['하루','별똥별을 보려고요. 할아버지 망원경을 들고.'],['촌장 바위','…다온아.']],ng:[['똑딱','다온의 일기를 다시 읽어 봐. 다온은 무엇을 계획했지?']]},
  {type:'pick',q:'그렇다면. 다온이 기다린 "별똥별"의 정체는?',opts:['진짜 별똥별','윤서의 실험 폭발','촌장의 불꽃놀이','하루와 똑딱이 이 시대로 떨어진 순간'],ans:3,ok:[['하루','……'],['하루','우리예요.']],ng:[['똑딱','잔향 속 섬광… 그 안에서 뭐가 떨어졌지? 금빛 톱니. …하루, 모른 척하지 마.']]},
  {type:'clue',q:'…증명할 수 있어?',ans:'weCame',ok:[['똑딱','3시 12분. 우리가 떨어진 시각. 그리고 내 톱니에서 나온 가루.'],['윤서','너희… 무슨 소리를 하는 거야?']]}],
 truth:[['','— 진상.'],['하루','다온은 별똥별을 보려고 차를 화분에 붓고, 굴뚝 사다리로 지붕에 올라갔어요.'],['하루','3시 12분. 동쪽 하늘이 찢어지고 검은 가루가 쏟아졌어요. 다온은 그 가루를 맞고 잠들었어요.'],['하루','…그리고 그 섬광은, 저와 똑딱이 이곳에 떨어진 순간이었어요.'],
  ['윤서','떨어졌다고…? 어디서?'],['똑딱','(하루, 더는 안 돼. 지금은…)'],
  ['','그 순간, 다온의 몸에서 검은 가루가 피어올랐다.'],['','가루는 방 안을 맴돌더니, 한데 뭉쳐 커다란 날개를 펼쳤다. 잠든 아이의 꿈을 빨아들이며.'],['윤서','저게 뭐야… 나방?'],['똑딱','꿈을 먹고 있어! 저걸 쓰러뜨리면 다온이 깨어날 거야!']],
 boss:{art:'moth',base:15,name:'꿈을 먹는 나방',en:'DREAM EATER',epi:'잠든 아이의 꿈에서 태어난 검은 날개',
  intro:[['다온','(…별이… 떨어져…)'],['똑딱','다온의 꿈이 저 날개에 빨려 들어가고 있어! 서둘러, 하루!']],
  phase:['사락… 사락… 꿈이… 달다…','검은 비늘가루가 방 안을 가득 채운다!'],dying:'…꿈이… 흩어… 진…다…'},
 outro:[['','나방의 날개가 부서지며 흩어졌다. 검은 가루는 또다시 동쪽 하늘로, 광산 쪽으로 빨려 들어갔다.'],
  ['다온','…으응… 할아버지…?'],['촌장 바위','다온아! 다온아…!'],['다온','할아버지… 별똥별 봤어. 엄청 예뻤어. 그 안에… 누가 있었어.'],
  ['유모','아가씨…!'],['윤서','다행이다… 정말 다행이야.'],
  ['','하지만 그날 오후, 광장의 종이 연거푸 울렸다.'],['한결','윤서! 대장간 아저씨가 쓰러졌어. 방앗간 할머니도. 둘 다… 깨질 않아.'],['윤서','…시작이야. 꿈에서 본 그거야. 온 마을이 멈추는 꿈.'],
  ['','그날 밤. 공방 지붕 위.'],['똑딱','…하루. 나 계속 생각했어.'],['똑딱','3시 12분. 우리가 이 시대에 떨어진 시각. 그때 쏟아진 검은 가루. 내 톱니에서 나온 가루.'],
  ['똑딱','우리 시대의 시계골을 잠재운 그 병… 그건 원래 있던 병이 아니었을지도 몰라.'],['똑딱','잠의 병은… 우리가 가져온 걸지도 몰라.'],['하루','……'],
  ['','동쪽 하늘, 광산 위. 아무도 보지 못한 곳에서 검은 가루가 천천히 모여들고 있었다.']],
 hints:[
  {c:cs=>!cs.got.has('soles'),L:['잠든 다온을 자세히 살펴봐.']},
  {c:cs=>!cs.got.has('railDust'),L:['창문 밖, 지붕 위까지 가 보자. 벽 아래 틈으로 나갈 수 있어.']},
  {c:cs=>!cs.ivDone&&!(cs.got.has('plantTea')&&cs.got.has('latch')),L:['유모와 이야기하려면 증거가 필요해. 창문, 그리고 창가의 식물.']},
  {c:cs=>!cs.ivDone&&!cs.got.has('chimLadder'),L:['"사다리를 치웠다"는 말… 지붕에 다른 사다리는 정말 없을까?']},
  {c:cs=>!cs.ivDone,L:['유모의 증언 중엔 박동이 고요한데도 틀린 말이 있어. 박동만 믿지 말고 단서와 부딪혀 봐.']},
  {c:cs=>!cs.got.has('flash312'),L:['지붕의 잔향에서 3시 12분의 하늘을 봐.']},
  {c:cs=>!cs.got.has('tickDust'),L:['검은 가루와 다온의 발을 둘 다 확인했으면, 지붕 위에서 나를 한번 봐 줘.']},
  {c:cs=>!cs.got.has('noTea'),L:['화분과 다온의 일기를 이어 봐.']},
  {c:cs=>!cs.got.has('roofDust')||!cs.got.has('skyDust'),L:['발바닥의 가루 → 난간의 가루 → 3시 12분의 섬광. 차례로 이어 봐.']},
  {c:cs=>!cs.got.has('fallingBoy'),L:['섬광이 번쩍인 직후, 하늘에서 떨어지는 게 하나 더 있어.']},
  {c:cs=>true,L:['떨어지는 그림자, 그리고 내 톱니에서 나온 가루. …이어 봐, 하루.']}]};
C3CASES.push(C3_CASE3);

