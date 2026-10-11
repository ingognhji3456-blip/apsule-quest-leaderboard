/* ================= v165 보스 러시 타임어택 (TA165) =================
   - 보스 러시 화면의 「⏱ 타임어택」 단추 → 코스 고르기 창(#ta165). 코스 = 챕터 1~7(보스 10마리씩 연달아).
     탑에서 그 챕터의 마지막 보스를 깨야(탑 최고 층 > 100×챕터) 열린다(테스터는 모두 열림).
   - 시간은 보스전(mode==='boss') 동안만, 일시정지 · 결과 화면 · 보스 사이 쉬는 시간은 빼고 잰다. 쓰러지면 실패.
     난이도를 도중에 바꾸거나 로비로 나가면 그만둔다.
   - 보스는 TW71.bossStart(g)로 시작, fightEnd(won)를 감싸 다음 보스로. 원래 결과창(#overlay)은 숨기고 중간 카드(#tah165)를 보여 준다.
   - 끝나면 서버 /api/ta/submit(구간 기록 splits · 합계 ms), 순위는 /api/ta/board(코스 · 난이도별 TOP 50 · 내 순위). */
(()=>{try{
 const $=id=>document.getElementById(id),esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const api=(p,b)=>window.DUO85&&DUO85.api?DUO85.api(p,'POST',b||{}):Promise.resolve({s:0,j:{}});
 const CH=[['1장','기계','#5ad8ff'],['2장','굶주림','#7ae06a'],['3장','기원','#ffd166'],['4장','ECLIPSE','#c08aff'],['5장','ABYSS','#3a8aff'],['6장','ZENITH','#ffb04a'],['7장','REVERSE','#ff5a8a']];
 const DN={easy:'쉬움',normal:'보통',hard:'어려움',extreme:'익스트림'},DC={easy:'#7ae06a',normal:'#5ad8ff',hard:'#ffb04a',extreme:'#ff4a6a'};
 const fmt=ms=>{if(ms==null)return '--:--.--';const t=Math.max(0,Math.round(ms/10)),cs=t%100,s=Math.floor(t/100)%60,m=Math.floor(t/6000);return m+':'+String(s).padStart(2,'0')+'.'+String(cs).padStart(2,'0')};
 const bossName=g=>{try{return hfData()[g].name}catch(e){return (g+1)+'번 보스'}};
 const best=()=>Math.max(1,(saveData.tw71&&saveData.tw71.best)||1);
 const tester=()=>{try{return !!(window.PAY58&&PAY58.tester())}catch(e){return false}};
 const open_=c=>tester()||best()>100*(c+1);
 const curDiff=()=>(typeof diff!=='undefined'&&diff)||'normal';
 /* ---------- 진행 ---------- */
 const R={run:false,c:0,i:0,diff:'normal',splits:[],cur:0,inFight:false,last:0,wait:0};
 function startRun(c){if(!open_(c))return;try{if(window.LV154&&!LV154.isOpen('rush')){gmShow('rush');return}}catch(e){}/* 보스 러시 레벨 잠금(LV154) */closeWin();Object.assign(R,{run:true,c,i:0,diff:curDiff(),splits:[],cur:0,inFight:false,last:0});try{gmSfx('ok')}catch(e){}goBoss()}
 function goBoss(){const g=R.c*10+R.i;R.cur=0;R.inFight=true;R.last=performance.now();mid.hidden=true;try{$('overlay').hidden=true}catch(e){}
  try{TW71.bossStart(g)}catch(e){console.error('ta165',e);abort('보스를 시작하지 못했어요')}}
 function abort(why){if(!R.run)return;R.run=false;R.inFight=false;hud.hidden=true;showMid('fail',why)}
 /* 시간 재기: 보스전이고 멈추지 않았을 때만 */
 function tick(){const now=performance.now(),dt=Math.min(100,now-(R.last||now));R.last=now;
  if(R.run&&R.inFight){if(typeof mode!=='undefined'&&mode==='boss'){if(!paused)R.cur+=dt}else if(typeof mode!=='undefined'&&mode==='menu'&&mid.hidden){abort('로비로 나가서 그만뒀어요')}
   if(curDiff()!==R.diff)abort('난이도가 바뀌어서 그만뒀어요');paintHud()}
  else if(!hud.hidden)hud.hidden=true;requestAnimationFrame(tick)}
 /* 보스전 끝 */
 if(typeof fightEnd==='function'){const f=fightEnd;fightEnd=function(won){const r=f.apply(this,arguments);try{if(R.run&&R.inFight){R.inFight=false;
   setTimeout(()=>{try{$('overlay').hidden=true}catch(e){}},30);
   if(won){R.splits.push(Math.round(R.cur));R.i++;if(R.i>=10)finish();else showMid('next')}else{R.run=false;hud.hidden=true;showMid('fail','쓰러졌어요')}}}catch(e){}return r}}
 /* ---------- 보스전 중 시간 표시 ---------- */
 const hud=document.createElement('div');hud.id='tah165';hud.hidden=true;document.body.appendChild(hud);
 function paintHud(){if(!R.run)return;const tot=R.splits.reduce((a,b)=>a+b,0)+R.cur;if(hud.hidden)hud.hidden=false;
  const t='<i>⏱</i><b>'+fmt(tot)+'</b><span>'+CH[R.c][0]+' · '+(R.i+1)+'/10</span><em style="--dc:'+DC[R.diff]+'">'+DN[R.diff]+'</em>';if(hud._t!==t){hud._t=t;hud.innerHTML=t}}
 /* ---------- 보스 사이 · 끝 카드 ---------- */
 const mid=document.createElement('div');mid.id='tam165';mid.hidden=true;document.body.appendChild(mid);
 mid.addEventListener('pointerdown',e=>e.stopPropagation());
 let midT=0;
 function bars(){return '<div class="sp">'+Array.from({length:10},(_,k)=>{const ms=R.splits[k],g=R.c*10+k;return '<div class="sr'+(k<R.splits.length?' ok':k===R.i?' now':'')+'"><span>'+(k+1)+'</span><b>'+esc(bossName(g))+'</b><em>'+(ms!=null?fmt(ms):'')+'</em></div>'}).join('')+'</div>'}
 function showMid(kind,why,res){clearTimeout(midT);const tot=R.splits.reduce((a,b)=>a+b,0);mid.hidden=false;hud.hidden=true;
  if(kind==='next'){let n=3;const paint=()=>{mid.innerHTML='<div class="mc"><div class="mt"><b>✓ '+esc(bossName(R.c*10+R.i-1))+' 처치!</b><small>구간 '+fmt(R.splits[R.splits.length-1])+' · 합계 <u>'+fmt(tot)+'</u></small></div>'+bars()+
     '<div class="mb"><button class="go">다음 보스 ▶ <small>'+n+'</small></button><button class="qt">그만두기</button></div></div>';mid.querySelector('.go').onclick=()=>{clearTimeout(midT);goBoss()};mid.querySelector('.qt').onclick=()=>{clearTimeout(midT);R.run=false;mid.hidden=true;try{toLobby()}catch(e){}}};
   paint();const step=()=>{n--;if(n<=0){goBoss();return}paint();midT=setTimeout(step,1000)};midT=setTimeout(step,1000);return}
  if(kind==='fail'){mid.innerHTML='<div class="mc fail"><div class="mt"><b>✕ 타임어택 실패</b><small>'+esc(why||'')+' · '+R.splits.length+'/10까지 '+fmt(tot)+'</small></div>'+bars()+
    '<div class="mb"><button class="go">다시 도전</button><button class="qt">로비로</button></div></div>';mid.querySelector('.go').onclick=()=>{mid.hidden=true;startRun(R.c)};mid.querySelector('.qt').onclick=()=>{mid.hidden=true;try{toLobby()}catch(e){}};return}
  /* 끝 */const r=res||{};mid.innerHTML='<div class="mc done"><div class="mt"><b>🏁 '+CH[R.c][0]+' '+CH[R.c][1]+' 완주!</b><small>'+DN[R.diff]+' · 합계</small><div class="big">'+fmt(tot)+'</div>'+
   (r.pending?'<small>기록 올리는 중…</small>':r.err?'<small class="er">'+esc(r.err)+'</small>':'<small>'+(r.best?'<em>새 최고 기록!</em> ':'최고 '+fmt(r.prev)+' · ')+'순위 <u>'+r.rank+'위</u></small>')+'</div>'+bars()+
   '<div class="mb"><button class="go">다시 도전</button><button class="bd">순위 보기</button><button class="qt">로비로</button></div></div>';
  mid.querySelector('.go').onclick=()=>{mid.hidden=true;startRun(R.c)};mid.querySelector('.bd').onclick=()=>{mid.hidden=true;try{toLobby()}catch(e){}setTimeout(()=>openWin(R.c,R.diff),200)};mid.querySelector('.qt').onclick=()=>{mid.hidden=true;try{toLobby()}catch(e){}}}
 async function finish(){R.run=false;hud.hidden=true;const ms=R.splits.reduce((a,b)=>a+b,0);showMid('done',null,{pending:1});try{sfx(880,.1,'square',.06,1320);setTimeout(()=>sfx(1320,.18,'square',.06,1760),120)}catch(e){}
  const r=await api('/api/ta/submit',{course:'c'+(R.c+1),diff:R.diff,ms,splits:R.splits});
  showMid('done',null,r.s===200&&r.j.ok?{best:r.j.best,prev:r.j.prev,rank:r.j.rank}:{err:(r.j&&r.j.error)||'로그인하면 순위에 기록돼요'});}
 /* ---------- 코스 고르기 · 순위 창 ---------- */
 const win=document.createElement('div');win.id='ta165';win.hidden=true;document.body.appendChild(win);
 win.addEventListener('pointerdown',e=>{if(e.target===win)closeWin()});
 const W={c:0,diff:'normal',board:null,mine:{},load:0};
 function openWin(c,d){W.c=c!=null?c:W.c;W.diff=d||curDiff();win.hidden=false;draw();load()}
 function closeWin(){win.hidden=true}
 async function load(){W.load=1;draw();const r=await api('/api/ta/board',{course:'c'+(W.c+1),diff:W.diff});W.load=0;if(r.s===200&&r.j.ok){W.board=r.j;W.mine=r.j.mine||{}}else W.board={top:[],err:1};draw()}
 function draw(){const c=W.c,ok=open_(c),B=W.board||{top:[]};
  win.innerHTML='<div class="tp"><div class="th"><button class="x">닫기</button><i>⏱</i><div><b>보스 러시 타임어택</b><small>보스 10마리를 연달아 · 보스전 시간만 재요 · 쓰러지면 실패</small></div></div>'+
   '<div class="tdf">'+Object.keys(DN).map(k=>'<button data-d="'+k+'" class="'+(k===W.diff?'on':'')+'" style="--dc:'+DC[k]+'">'+DN[k]+'</button>').join('')+'</div>'+
   '<div class="tb"><div class="tc">'+CH.map((h,i)=>{const o=open_(i),m=W.mine['c'+(i+1)];return '<button class="cc'+(i===c?' on':'')+(o?'':' lk')+'" data-c="'+i+'" style="--cc:'+h[2]+'"><span class="n">'+h[0]+'</span><b>'+h[1]+'</b><small>'+(o?(m!=null?'최고 '+fmt(m):'기록 없음'):'🔒 탑 '+(100*(i+1)+1)+'층')+'</small></button>'}).join('')+'</div>'+
   '<div class="tr"><div class="tq" style="--cc:'+CH[c][2]+'"><b>'+CH[c][0]+' '+CH[c][1]+'</b><small>'+Array.from({length:10},(_,k)=>esc(bossName(c*10+k))).join(' → ')+'</small>'+
    '<button class="st"'+(ok?'':' disabled')+'>'+(ok?'▶ 도전 시작 · '+DN[W.diff]:'🔒 탑 '+(100*(c+1)+1)+'층까지 올라가면 열려요')+'</button>'+(W.diff!==curDiff()?'<small class="nt">시작하면 난이도가 '+DN[W.diff]+'(으)로 바뀌어요</small>':'')+'</div>'+
    '<div class="tl"><h4>🏆 순위 TOP 50 <span>'+DN[W.diff]+'</span></h4>'+(W.load?'<div class="em">불러오는 중…</div>':B.top.length?'<ol>'+B.top.map((r,i)=>'<li class="'+(r.me?'me':'')+(i<3?' t'+i:'')+'"><span>'+(i+1)+'</span><b>'+esc(r.name)+'</b><em>'+fmt(r.ms)+'</em></li>').join('')+'</ol>':'<div class="em">아직 기록이 없어요. 첫 기록의 주인공이 돼 보세요!</div>')+
    (B.me?'<div class="my">내 기록 '+fmt(B.me.ms)+' · '+B.me.rank+'위</div>':'')+'</div></div></div></div>';
  win.querySelector('.x').onclick=closeWin;win.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{W.diff=b.dataset.d;load()});
  win.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{W.c=+b.dataset.c;load()});
  const s=win.querySelector('.st');if(s)s.onclick=()=>{if(W.diff!==curDiff()){try{$('diffSel').value=W.diff;updDiff()}catch(e){}}startRun(W.c)}}
 /* 보스 러시 화면에 단추 */
 /* 보스 러시 화면 단추는 v169부터 168 파일의 #rx168 줄에 함께 있음 */
 const st=document.createElement('style');st.textContent=`
 #ta165,#tam165{position:fixed;inset:0;z-index:9430;display:flex;align-items:center;justify-content:center;background:#000b;font-family:inherit;color:#eef0ff}#ta165[hidden],#tam165[hidden]{display:none}
 #ta165 .tp,#tam165 .mc{width:min(860px,calc(100vw - 16px));max-height:calc(100dvh - 16px);overflow-y:auto;border-radius:8px;background:linear-gradient(180deg,#1a1430,#0c0a1a);box-shadow:0 0 0 3px #000,0 0 0 5px #ffb04a,0 0 0 7px #000,0 20px 60px #000d}
 #ta165 .th{position:relative;display:flex;align-items:center;gap:10px;padding:12px 14px 10px 58px;background:linear-gradient(180deg,#3a2810,#22160a);border-bottom:3px solid #000}
 #ta165 .th .x{position:absolute;left:10px;top:50%;transform:translateY(-50%)}#ta165 .th i{font-style:normal;font-size:24px}
 #ta165 .th b{display:block;font-size:19px;font-weight:900;color:#ffd166;text-shadow:2px 2px 0 #000}#ta165 .th small{display:block;font-size:11px;color:#d8c098}
 #ta165 .tdf{display:flex;gap:6px;padding:10px 12px 0}#ta165 .tdf button{flex:1;padding:7px;border:0;font:inherit;font-weight:900;font-size:13px;cursor:pointer;color:#cfc8e0;background:#ffffff0c;box-shadow:0 0 0 2px #000}
 #ta165 .tdf button.on{background:var(--dc);color:#0a0a14;box-shadow:0 0 0 2px #000,inset 0 2px 0 #ffffff88}
 #ta165 .tb{display:grid;grid-template-columns:220px 1fr;gap:12px;padding:12px}
 #ta165 .tc{display:flex;flex-direction:column;gap:6px}
 #ta165 .cc{display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;column-gap:8px;align-items:center;padding:8px 10px;border:0;font:inherit;text-align:left;cursor:pointer;color:#fff;
  background:linear-gradient(90deg,color-mix(in srgb,var(--cc) 35%,#14102a),#14102a);box-shadow:0 0 0 2px #000;border-left:5px solid var(--cc)}
 #ta165 .cc .n{grid-row:span 2;font-weight:900;font-size:13px;color:var(--cc);text-shadow:1px 1px 0 #000}#ta165 .cc b{font-size:14px;font-weight:900}#ta165 .cc small{font-size:10.5px;color:#c8c0e0}
 #ta165 .cc.on{box-shadow:0 0 0 2px #000,0 0 0 4px var(--cc)}#ta165 .cc.lk{filter:grayscale(.7) brightness(.7)}
 #ta165 .tr{display:flex;flex-direction:column;gap:10px;min-width:0}
 #ta165 .tq{padding:12px;background:#ffffff08;box-shadow:0 0 0 2px #000;border-top:4px solid var(--cc)}#ta165 .tq b{display:block;font-size:17px;font-weight:900;color:var(--cc);text-shadow:1px 1px 0 #000}
 #ta165 .tq small{display:block;font-size:11px;color:#b8b0d8;line-height:1.5;margin:4px 0 8px}#ta165 .tq .nt{color:#ffd166;margin:6px 0 0}
 #ta165 .st{width:100%;padding:11px;border:0;font:inherit;font-weight:900;font-size:16px;cursor:pointer;color:#2a1604;background:linear-gradient(180deg,#ffe58a,#e0a020);box-shadow:0 0 0 2px #000,inset 0 3px 0 #fff6c0,inset 0 -4px 0 #a06a10}
 #ta165 .st:disabled{filter:grayscale(1) brightness(.7);cursor:default;font-size:13px}
 #ta165 .tl{padding:10px 12px;background:#00000040;box-shadow:0 0 0 2px #000}#ta165 .tl h4{margin:0 0 8px;font-size:14px;color:#ffd166}#ta165 .tl h4 span{font-size:11px;color:#c8c0e0;margin-left:6px}
 #ta165 ol{list-style:none;margin:0;padding:0;max-height:260px;overflow-y:auto;display:flex;flex-direction:column;gap:3px}
 #ta165 li{display:flex;align-items:center;gap:8px;padding:5px 8px;background:#ffffff08;font-size:13px}#ta165 li span{width:22px;font-weight:900;color:#a8a0c8;text-align:center}#ta165 li b{flex:1;font-weight:800;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
 #ta165 li em{font-style:normal;font-weight:900;font-family:monospace;color:#a6f5c6}#ta165 li.t0 span{color:#ffd166}#ta165 li.t1 span{color:#dfe4ff}#ta165 li.t2 span{color:#e8a070}#ta165 li.me{background:#ffd16622;box-shadow:inset 3px 0 0 #ffd166}
 #ta165 .em{padding:20px;text-align:center;color:#a8a0c8;font-size:12.5px}#ta165 .my{margin-top:8px;font-size:12.5px;font-weight:900;color:#ffd166;text-align:right}
 #tah165{position:fixed;left:50%;top:6px;transform:translateX(-50%);z-index:9000;display:flex;align-items:center;gap:8px;padding:4px 12px;background:#000c;box-shadow:0 0 0 2px #ffb04a;border-radius:6px;color:#fff;pointer-events:none;font-family:inherit}
 #tah165[hidden]{display:none}#tah165 i{font-style:normal}#tah165 b{font-family:monospace;font-size:18px;font-weight:900;color:#ffd166;min-width:92px;text-align:right}#tah165 span{font-size:12px;color:#dfe4ff;font-weight:800}
 #tah165 em{font-style:normal;font-size:10.5px;font-weight:900;padding:1px 6px;background:var(--dc);color:#0a0a14;border-radius:3px}
 html.pv76 #tah165{top:auto;bottom:70px}
 #tam165 .mc{width:min(560px,calc(100vw - 16px));padding:0 0 12px}#tam165 .mt{padding:14px 16px 10px;text-align:center;background:linear-gradient(180deg,#2a3a14,#141a0a);border-bottom:3px solid #000}
 #tam165 .fail .mt{background:linear-gradient(180deg,#4a1420,#1a0a0e)}#tam165 .done .mt{background:linear-gradient(180deg,#4a3a10,#1a140a)}
 #tam165 .mt b{display:block;font-size:19px;font-weight:900;color:#fff;text-shadow:2px 2px 0 #000}#tam165 .mt small{display:block;font-size:12px;color:#dfe4c0;margin-top:3px}#tam165 .mt u{text-decoration:none;color:#ffd166;font-weight:900}
 #tam165 .mt em{font-style:normal;color:#7ae06a;font-weight:900}#tam165 .mt .er{color:#ffb0b0}#tam165 .big{font-family:monospace;font-size:42px;font-weight:900;color:#ffd166;text-shadow:3px 3px 0 #000;margin:4px 0}
 #tam165 .sp{display:flex;flex-direction:column;gap:2px;padding:10px 14px}#tam165 .sr{display:flex;align-items:center;gap:8px;padding:3px 8px;font-size:12.5px;background:#ffffff06;color:#8a84a8}
 #tam165 .sr span{width:20px;font-weight:900;text-align:center}#tam165 .sr b{flex:1;font-weight:800;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#tam165 .sr em{font-style:normal;font-family:monospace;font-weight:900}
 #tam165 .sr.ok{color:#eef0ff}#tam165 .sr.ok em{color:#a6f5c6}#tam165 .sr.now{color:#ffd166;background:#ffd16618;box-shadow:inset 3px 0 0 #ffd166}
 #tam165 .mb{display:flex;gap:8px;padding:0 14px}#tam165 .mb button{flex:1;padding:10px;border:0;font:inherit;font-weight:900;font-size:14px;cursor:pointer;box-shadow:0 0 0 2px #000,inset 0 2px 0 #ffffff55,inset 0 -3px 0 #0005}
 #tam165 .go{background:linear-gradient(180deg,#7ae06a,#2e9a3a);color:#fff}#tam165 .go small{margin-left:6px;padding:0 6px;background:#0005;border-radius:8px}#tam165 .bd{background:linear-gradient(180deg,#ffe58a,#e0a020);color:#2a1604}#tam165 .qt{background:#3a3f5a;color:#dfe4ff}
 html.lpP #ta165 .tb{grid-template-columns:1fr}html.lpP #ta165 .tc{display:grid;grid-template-columns:1fr 1fr}
 html.lpL #ta165 .tb{grid-template-columns:180px 1fr;padding:8px}html.lpL #ta165 .cc{padding:4px 8px}html.lpL #ta165 .cc small{display:none}html.lpL #ta165 ol{max-height:150px}
 html.lpL #tam165 .sp{display:grid;grid-template-columns:1fr 1fr;padding:6px 10px}html.lpL #tam165 .big{font-size:30px}`;document.head.appendChild(st);
 requestAnimationFrame(tick);
 window.TA165={open:openWin,start:startRun,R,fmt};
}catch(e){console.error('v165 time attack',e)}})();
