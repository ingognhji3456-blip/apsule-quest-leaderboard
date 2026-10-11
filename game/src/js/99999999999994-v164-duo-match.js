/* ================= v164 듀오 탑 자동 매칭 (MM164) =================
   - 듀오 창 위에 「⚡ 자동 매칭」 단추. 누르면 같은 난이도로 기다리는 사람과 짝지어 바로 듀오 탑을 시작한다.
   - 서버 /api/duo/queue(1초마다) · /api/duo/qcancel. 짝이 생기면 먼저 기다린 사람 = 방장(room을 받음, D.autoGo=1 → 99999997이 상대 준비되면 시작),
     나중 사람 = 손님(DUO85.join 후 「준비 완료」 자동). 시작 층 = 두 사람 최고 층 중 낮은 쪽 구역의 첫 층(서버가 정함).
   - 찾는 동안 #mm164 카드(레이더 · 기다린 시간 · 기다리는 사람 수 · 취소). 다른 창을 열어도 계속 찾고, 로비 밖(전투)으로 가면 그만둔다. */
(()=>{try{
 if(!window.DUO85)return;
 const DU=DUO85,D=DU.state,api=DU.api,$=id=>document.getElementById(id),esc=DU.esc;
 const S={on:false,t0:0,busy:0,iv:0,q:0,total:0,found:null,err:'',diff:'normal'};
 const DN={easy:'쉬움',normal:'보통',hard:'어려움',extreme:'익스트림'},DC={easy:'#7ae06a',normal:'#5ad8ff',hard:'#ffb04a',extreme:'#ff4a6a'};
 const best=()=>Math.max(1,(saveData.tw71&&saveData.tw71.best)||1);
 const card=document.createElement('div');card.id='mm164';card.hidden=true;document.body.appendChild(card);
 card.addEventListener('pointerdown',e=>e.stopPropagation());
 function start(){try{if(!DU.acc().token){try{ACCT55.open()}catch(e){}return}}catch(e){}if(D.started){return}if(S.on)return;
  try{if(D.on)DU.end()}catch(e){}S.on=true;S.t0=Date.now();S.found=null;S.err='';S.diff=(typeof diff!=='undefined'&&diff)||'normal';card.hidden=false;paint();tick();clearInterval(S.iv);S.iv=setInterval(tick,1000);try{gmSfx('ok')}catch(e){}}
 function stop(quiet){if(!S.on&&card.hidden)return;S.on=false;clearInterval(S.iv);if(!S.found)api('/api/duo/qcancel','POST',{}).catch(()=>{});if(!S.found||quiet)card.hidden=true}
 async function tick(){if(!S.on||S.busy)return;
  if(typeof mode!=='undefined'&&mode!=='menu'&&mode!=='plaza'){stop(true);return}
  S.busy=1;try{const r=await api('/api/duo/queue','POST',{diff:S.diff,best:best(),lv:DU.myLv(),ch:DU.myCh()});if(!S.on)return;
   if(r.s!==200){S.err=(r.j&&r.j.error)||'서버 연결을 기다리는 중…';paint();return}S.err='';
   if(r.j.match){found(r.j.match,r.j.room);return}S.q=r.j.queue||0;S.total=r.j.total||0;paint()}catch(e){}finally{S.busy=0}}
 function found(m,room){S.on=false;clearInterval(S.iv);S.found=m;paint();try{sfx(880,.08,'square',.05,1320);setTimeout(()=>sfx(1320,.12,'square',.05,1760),90)}catch(e){}
  setTimeout(async()=>{card.hidden=true;
   if(m.role==='host'){Object.assign(D,{on:true,code:m.code,role:'host',room:room||null,since:0,started:false,out:[]});D.autoGo=1;try{DU.open('room')}catch(e){}}
   else{try{DU.open('duo')}catch(e){}await DU.join(m.code);const until=Date.now()+15000;const iv=setInterval(()=>{if(Date.now()>until||D.started||!D.on||D.code!==m.code){clearInterval(iv);return}const mp=((D.room||{}).players||[]).find(p=>p.me);if(mp&&mp.ready){clearInterval(iv);return}if(D.wantReady==null)D.wantReady=true},300)}},1100)}
 function paint(){const sec=Math.floor((Date.now()-S.t0)/1000),mm=Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0');
  card.innerHTML='<div class="mc'+(S.found?' ok':'')+'"><div class="rd"><i></i><i></i><i></i><b></b></div><div class="tx">'+
   (S.found?'<b>찾았어요!</b><small>'+esc(S.found.partner)+'님과 듀오 · <em>'+S.found.floor+'F</em>부터</small>':
   '<b>듀오 상대 찾는 중…</b><small><span class="df" style="--dc:'+DC[S.diff]+'">'+DN[S.diff]+'</span> · '+mm+(S.q>1?' · '+(S.q-1)+'명 더 기다리는 중':' · 다른 사람을 기다리는 중')+'</small>'+(S.err?'<small class="er">'+esc(S.err)+'</small>':''))+
   '</div>'+(S.found?'':'<button class="cx">취소</button>')+'</div>';const cx=card.querySelector('.cx');if(cx)cx.onclick=()=>stop()}
 setInterval(()=>{if(S.on)paint()},1000);
 /* 듀오 창에 단추 넣기 */
 function inject(){const box=$('duo85');if(!box||box.hidden)return;const P=box.querySelector('.dP.wide:not(.dPv)');if(!P||P.querySelector('.mm164b'))return;const cols=P.querySelector('.dCols');if(!cols)return;
  const b=document.createElement('button');b.className='mm164b';b.type='button';b.innerHTML='<i>⚡</i><span><b>자동 매칭</b><small>기다리는 사람과 바로 듀오 · 시작 층은 두 사람 중 낮은 쪽 구역 첫 층</small></span><em>찾기 ▶</em>';
  b.onclick=()=>{try{DU.closeUI()}catch(e){}start()};cols.before(b)}
 setInterval(()=>{try{inject()}catch(e){}},400);
 const st=document.createElement('style');st.textContent=`
 #mm164{position:fixed;left:50%;top:14px;transform:translateX(-50%);z-index:9420;font-family:inherit}#mm164[hidden]{display:none}
 #mm164 .mc{display:flex;align-items:center;gap:12px;padding:10px 12px 10px 10px;min-width:300px;max-width:calc(100vw - 20px);background:linear-gradient(180deg,#1c2a4a,#0e1628);color:#eef4ff;border-radius:6px;
  box-shadow:0 0 0 3px #000,0 0 0 5px #5ad8ff,0 0 0 7px #000,0 10px 30px #000c}
 #mm164 .mc.ok{box-shadow:0 0 0 3px #000,0 0 0 5px #7ae06a,0 0 0 7px #000,0 10px 30px #000c}
 #mm164 .rd{position:relative;width:44px;height:44px;flex:none;border-radius:50%;background:radial-gradient(circle,#0a2a3a,#06121c);box-shadow:0 0 0 2px #000,inset 0 0 0 1px #5ad8ff66;overflow:hidden}
 #mm164 .rd i{position:absolute;left:50%;top:50%;width:6px;height:6px;margin:-3px;border-radius:50%;box-shadow:0 0 0 1px #5ad8ff88;animation:mm164r 1.8s linear infinite}
 #mm164 .rd i:nth-child(2){animation-delay:.6s}#mm164 .rd i:nth-child(3){animation-delay:1.2s}
 @keyframes mm164r{0%{transform:scale(1);opacity:1}100%{transform:scale(7);opacity:0}}
 #mm164 .rd b{position:absolute;left:50%;top:50%;width:50%;height:2px;background:linear-gradient(90deg,#5ad8ff,transparent);transform-origin:0 50%;animation:mm164s 1.4s linear infinite}
 @keyframes mm164s{to{transform:rotate(360deg)}}#mm164 .ok .rd b{display:none}#mm164 .ok .rd{background:radial-gradient(circle,#2a6a2a,#0a2a0a)}
 #mm164 .tx{flex:1;min-width:0}#mm164 .tx b{display:block;font-size:15px;font-weight:900;color:#fff;text-shadow:1px 1px 0 #000}#mm164 .ok .tx b{color:#a6f5a0}
 #mm164 .tx small{display:block;font-size:11.5px;color:#a8c0e0;margin-top:2px}#mm164 .tx em{font-style:normal;color:#ffd166;font-weight:900}#mm164 .tx .er{color:#ffb0b0}
 #mm164 .df{display:inline-block;padding:0 6px;background:var(--dc);color:#0a0a14;font-weight:900;border-radius:3px}
 #mm164 .cx{padding:8px 12px;border:0;font:inherit;font-weight:900;font-size:13px;cursor:pointer;background:#3a3f5a;color:#dfe4ff;box-shadow:0 0 0 2px #000}
 #duo85 .mm164b{display:flex;align-items:center;gap:12px;width:100%;margin:0 0 10px;padding:10px 14px;border:0;cursor:pointer;font:inherit;text-align:left;border-radius:12px;
  background:linear-gradient(90deg,#ffb02e,#ff6a3a);color:#2a0e04;box-shadow:0 0 0 2px #000,inset 0 2px 0 #ffe0a0,inset 0 -3px 0 #a83a10,0 0 18px #ff8a3a55}
 #duo85 .mm164b i{font-style:normal;font-size:24px}#duo85 .mm164b span{flex:1;display:flex;flex-direction:column}#duo85 .mm164b b{font-size:17px;font-weight:900}#duo85 .mm164b small{font-size:11px;opacity:.85}
 #duo85 .mm164b em{font-style:normal;font-weight:900;font-size:14px;padding:6px 12px;background:#2a0e04;color:#ffd166;border-radius:8px}
 html.lpL #duo85 .mm164b{padding:6px 10px;margin-bottom:6px}html.lpL #duo85 .mm164b b{font-size:14px}html.lpL #duo85 .mm164b small{display:none}`;document.head.appendChild(st);
 window.MM164={start,stop,S};
}catch(e){console.error('v164 duo match',e)}})();
