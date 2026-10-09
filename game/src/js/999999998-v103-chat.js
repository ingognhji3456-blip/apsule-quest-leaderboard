/* ================= v103 서버 채팅 · 친구 대화 (CHAT103) =================
   - 위쪽 줄 「💬」 단추(친구 단추 옆) → 채팅 창. 탭 두 개:
     🌐 서버 채팅: 친구가 아니어도 접속한 모든 사람과 대화. 이름을 누르면 「친구 신청」 · 「대화」.
     👥 친구 대화: 친구 목록(안 읽은 대화 빨간 점) → 고르면 1:1 대화.
   - 창이 열려 있을 때만 2초마다 새 말을 받는다(/api/chat/pull). 보내기는 /api/chat/send(1.2초 간격, 120자).
   - 친구가 대화를 보내면(친구 목록 12초마다 확인) 화면 위에 「💬 ○○님의 대화」 알림.
   - 읽은 대화 번호는 localStorage['bb-dm-read'](FR94가 안 읽은 표시에 씀). */
(()=>{try{
 if(!window.DUO85||!window.FR94)return;
 const DU=DUO85,$=id=>document.getElementById(id),esc=DU.esc,api=DU.api,acc=DU.acc;
 const C={open:false,tab:'world',peer:null,msgs:[],last:0,online:0,busy:false,err:'',pick:null,unW:0,lastW:0};
 const setRead=(name,id)=>{try{const m=FR94.readMap();if((m[name]||0)<id){m[name]=id;localStorage.setItem('bb-dm-read',JSON.stringify(m))}}catch(e){}};
 const hm=t=>{const d=new Date(t*1000);return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')};
 const friendNames=()=>new Set((FR94.F.list||[]).map(f=>f.name));

 /* ---------- 위쪽 줄 단추 ---------- */
 function chip(){const fr=$('gmFr');if(!fr||!fr.parentNode)return;let b=$('gmChat');
  if(!b){b=document.createElement('button');b.id='gmChat';b.type='button';b.title='채팅 — 서버 채팅 · 친구 대화';b.innerHTML='<i>💬</i><span>채팅</span><em hidden></em>';
   b.onclick=e=>{e.stopPropagation();try{gmSfx('ok')}catch(_){}if(!acc().token){try{ACCT55.open()}catch(err){}return}open()};b.addEventListener('pointerdown',e=>e.stopPropagation())}
  if(b.previousElementSibling!==fr)fr.after(b);
  const n=(FR94.F.list||[]).filter(FR94.unread).length,e=b.querySelector('em');e.hidden=!n;e.textContent=n?String(n):''}
 setInterval(()=>{try{chip()}catch(e){}},700);

 /* ---------- 창 ---------- */
 const box=document.createElement('div');box.id='ch103';box.hidden=true;document.body.appendChild(box);
 box.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===box)close()});
 box.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Escape'){if(C.pick){C.pick=null;draw()}else close()}});
 box.addEventListener('keyup',e=>e.stopPropagation());
 function open(tab,peer){if(!acc().token){try{ACCT55.open()}catch(e){}return}C.open=true;box.hidden=false;C.err='';
  if(tab)C.tab=tab;if(tab==='dm')C.peer=peer||null;if(tab!=='dm'||peer)reset();lastH='';draw();pull();
  setTimeout(()=>{const i=$('chIn');if(i&&!(window.matchMedia&&matchMedia('(pointer:coarse)').matches))i.focus()},60)}
 function close(){C.open=false;box.hidden=true;C.pick=null}
 const dm=name=>open('dm',name);
 function reset(){C.msgs=[];C.last=0}
 function room(){return C.tab==='world'?{}:(C.peer?{with:C.peer}:null)}

 async function pull(){if(!C.open||C.busy)return;const r0=room();if(!r0){draw();return}C.busy=true;
  const key=C.tab+'|'+(C.peer||'');try{const r=await api('/api/chat/pull','POST',Object.assign({since:C.last},r0));
   if(key!==C.tab+'|'+(C.peer||''))return;
   if(r.s!==200){C.err=r.j.error||'불러오지 못했어요';draw();return}if(Date.now()-(C.errT||0)>4000)C.err='';C.online=r.j.online||0;
   const add=(r.j.msgs||[]).filter(m=>m.id>C.last);if(add.length){C.msgs=C.msgs.concat(add).slice(-150);C.last=add[add.length-1].id;
    if(C.tab==='dm'&&C.peer)setRead(C.peer,C.last);if(C.tab==='world')C.lastW=C.last}
   draw(add.length>0)}catch(e){}finally{C.busy=false}}
 setInterval(()=>{if(C.open)pull()},2000);

 async function send(){const i=$('chIn');if(!i)return;const t=(i.value||'').trim();if(!t)return;const r0=room();if(!r0)return;
  const b=$('chGo');if(b)b.disabled=true;try{const r=await api('/api/chat/send','POST',{text:t,to:C.tab==='dm'?C.peer:undefined});
   if(r.s===200){i.value='';C.err='';pull()}else{C.err=r.j.error||'보내지 못했어요';draw()}}finally{if(b)b.disabled=false;i.focus()}}

 let lastH='';
 function draw(scroll){if(box.hidden)return;const fr=FR94.F.list||[],fn=friendNames(),me=(acc().user||'');
  const tabs='<div class="chTabs"><button data-tab="world" class="'+(C.tab==='world'?'on':'')+'">🌐 서버 채팅</button><button data-tab="dm" class="'+(C.tab==='dm'?'on':'')+'">👥 친구 대화'+(fr.some(FR94.unread)?'<i class="nw"></i>':'')+'</button></div>';
  let body='',foot='';
  if(C.tab==='dm'&&!C.peer){
   body='<div class="chPeers">'+(fr.length?fr.map(f=>'<button class="chPeer'+(f.online?' on':'')+'" data-peer="'+esc(f.name)+'"><i class="dot"></i><b>'+esc(f.name)+'</b><small>'+(f.online?'접속 중':'🕓 '+FR94.ago(f.last))+'</small>'+(FR94.unread(f)?'<em>새 대화</em>':'')+'</button>').join(''):'<div class="chEmpty">아직 친구가 없어요.<br><small>서버 채팅에서 이름을 눌러 친구 신청을 해 보세요!</small></div>')+'</div>';
  }else{
   const head=C.tab==='dm'?'<div class="chPeerHd"><button class="chBack">‹ 친구 목록</button><b>'+esc(C.peer)+'</b><small>'+(()=>{const f=fr.find(x=>x.name===C.peer);return f?(f.online?'<em>접속 중</em>':'🕓 '+FR94.ago(f.last)+' 접속'):''})()+'</small></div>'
    :'<div class="chInfo">🟢 지금 접속 '+C.online+'명 · 이름을 누르면 친구 신청 · 대화</div>';
   let prevDay='';
   const lines=C.msgs.map(m=>{const d=new Date(m.t*1000).toDateString(),sep=d!==prevDay?(prevDay=d,'<div class="chDay">'+new Date(m.t*1000).toLocaleDateString('ko-KR',{month:'long',day:'numeric',weekday:'short'})+'</div>'):'';
     return sep+'<div class="chM'+(m.me?' me':'')+'">'+(m.me?'':'<button class="chNm'+(fn.has(m.name)?' fr':'')+'" data-nm="'+esc(m.name)+'">'+(fn.has(m.name)?'👥 ':'')+esc(m.name)+'</button>')+'<div class="chB"><span>'+esc(m.text)+'</span><small>'+hm(m.t)+'</small></div></div>'}).join('');
   body=head+'<div class="chLog" id="chLog">'+(lines||'<div class="chEmpty">'+(C.tab==='dm'?'첫 인사를 건네 보세요 👋':'아직 대화가 없어요. 첫 마디를 남겨 보세요!')+'</div>')+'</div>';
   foot='<div class="chFoot"><input id="chIn" maxlength="120" placeholder="'+(C.tab==='dm'?esc(C.peer)+'님에게 보내기':'모두에게 보내기')+'" autocomplete="off" spellcheck="false"><button id="chGo">보내기</button></div>';
  }
  const pick=C.pick?'<div class="chPick"><b>'+esc(C.pick)+'</b>'+(fn.has(C.pick)?'<button data-pk="dm">💬 대화하기</button>':'<button data-pk="add">＋ 친구 신청</button>')+'<button data-pk="x" class="x">취소</button></div>':'';
  const h='<div class="chP"><div class="chHd"><i>💬</i><div><b>채팅</b><small>'+(me?esc(me)+'(으)로 대화 중':'')+'</small></div><button class="chX">닫기</button></div>'+tabs+body+(C.err?'<div class="chErr'+(C.err[0]==='✓'?' ok':'')+'">'+esc(C.err)+'</div>':'')+foot+pick+'</div>';
  if(h===lastH)return;const log0=$('chLog'),atEnd=!log0||log0.scrollHeight-log0.scrollTop-log0.clientHeight<40,keep=log0?log0.scrollTop:0;
  const inp=$('chIn'),v=inp?inp.value:'',foc=document.activeElement&&document.activeElement.id==='chIn';lastH=h;box.innerHTML=h;
  const ni=$('chIn');if(ni){ni.value=v;if(foc)ni.focus()}const log=$('chLog');if(log)log.scrollTop=(atEnd||scroll===true&&atEnd)?log.scrollHeight:keep;wire()}
 function wire(){const q=s=>box.querySelector(s);q('.chX').onclick=close;
  box.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{if(C.tab===b.dataset.tab&&!(b.dataset.tab==='dm'&&C.peer))return;C.tab=b.dataset.tab;C.peer=null;C.pick=null;reset();lastH='';draw();pull()});
  box.querySelectorAll('[data-peer]').forEach(b=>b.onclick=()=>{C.peer=b.dataset.peer;reset();lastH='';draw();pull()});
  if(q('.chBack'))q('.chBack').onclick=()=>{C.peer=null;reset();lastH='';FR94.refresh();draw()};
  if(q('#chGo'))q('#chGo').onclick=send;if(q('#chIn'))q('#chIn').onkeydown=e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();send()}};
  box.querySelectorAll('[data-nm]').forEach(b=>b.onclick=()=>{C.pick=b.dataset.nm;draw()});
  box.querySelectorAll('[data-pk]').forEach(b=>b.onclick=async()=>{const n=C.pick,k=b.dataset.pk;C.pick=null;
   if(k==='dm'){C.tab='dm';C.peer=n;reset();lastH='';draw();pull();return}
   if(k==='add'){const r=await api('/api/friends/request','POST',{name:n});C.err=r.s===200?(r.j.status==='friends'?'✓ '+n+'님과 친구가 됐어요!':'✓ '+n+'님에게 친구 신청을 보냈어요'):(r.j.error||'보내지 못했어요');C.errT=Date.now();FR94.refresh()}
   draw()})}

 /* ---------- 친구 대화 알림 ---------- */
 function dmNote(name){if(C.open&&C.tab==='dm'&&C.peer===name){pull();return}
  const tw=$('frToast');if(!tw)return;const d=document.createElement('div');d.className='frT ch';
  d.innerHTML='<i>💬</i><div><b>'+esc(name)+'</b>님이 대화를 보냈어요<small>친구 대화</small></div><button class="y">보기</button><button class="n">닫기</button>';
  tw.appendChild(d);try{sfx(1040,.08,'sine',.05,1400)}catch(e){}const done=()=>{d.classList.add('out');setTimeout(()=>d.remove(),300)};const tm=setTimeout(done,12000);
  d.addEventListener('pointerdown',e=>e.stopPropagation());d.querySelector('.n').onclick=()=>{clearTimeout(tm);done()};
  d.querySelector('.y').onclick=()=>{clearTimeout(tm);done();dm(name)}}
 /* 친구 목록이 바뀌면 열린 창도 다시 그림 */
 setInterval(()=>{if(C.open&&C.tab==='dm'&&!C.peer)draw()},1500);

 const st=document.createElement('style');st.id='ch103s';st.textContent=`
 #gmChat{position:relative;display:inline-flex;align-items:center;gap:5px;height:32px;padding:0 12px 0 8px;border-radius:999px;font:inherit;font-weight:900;font-size:13px;cursor:pointer;color:#2a1604;
  background:linear-gradient(180deg,#fff4d4,#ffb84a 70%,#c87a1a);border:1px solid #fff4dc;box-shadow:0 0 12px #ffb84a55,inset 0 1px 0 #fff8}
 #gmChat i{font-style:normal;font-size:15px}html.ph #gmChat span{display:none}html.ph #gmChat{padding:0 8px}
 #gmChat em{position:absolute;top:-5px;right:-5px;min-width:16px;height:16px;padding:0 4px;border-radius:9px;font-style:normal;font-size:10px;line-height:16px;font-weight:900;color:#fff;background:#ff2d55;box-shadow:0 0 6px #ff2d55}
 #ch103{position:fixed;inset:0;z-index:95;display:flex;align-items:center;justify-content:center;background:#000b;color:#eaf6ef;font-family:inherit}#ch103[hidden]{display:none}
 #ch103 button{font:inherit;cursor:pointer}
 #ch103 .chP{position:relative;width:min(480px,calc(100vw - 20px));height:min(640px,calc(100dvh - 20px));display:flex;flex-direction:column;border-radius:18px;padding:14px;background:linear-gradient(180deg,#221a12,#0d0a07);border:2px solid #ffb84a66;box-shadow:0 24px 70px #000d;animation:chIn .2s ease-out}
 #ch103 .chHd{display:flex;align-items:center;gap:10px;margin-bottom:10px}#ch103 .chHd>i{font-style:normal;font-size:20px;width:40px;height:40px;display:grid;place-items:center;border-radius:12px;background:linear-gradient(180deg,#4a3418,#1c1408);border:1px solid #ffb84a66}
 #ch103 .chHd>div{flex:1;min-width:0}#ch103 .chHd b{display:block;font-size:20px}#ch103 .chHd small{color:#c8b090;font-size:11.5px}#ch103 .chX{margin-left:auto}
 #ch103 .chTabs{display:flex;gap:6px;margin-bottom:8px}#ch103 .chTabs button{position:relative;flex:1;padding:9px;border-radius:11px;border:1px solid #ffffff1c;background:#1a140c;color:#e8dcc8;font-weight:900;font-size:13px}
 #ch103 .chTabs button.on{background:linear-gradient(180deg,#fff0c8,#ffb84a);color:#2a1604;border-color:transparent;box-shadow:0 0 14px #ffb84a55}
 #ch103 .chTabs .nw{position:absolute;top:5px;right:8px;width:9px;height:9px;border-radius:50%;background:#ff2d55;box-shadow:0 0 6px #ff2d55}
 #ch103 .chInfo{font-size:11.5px;color:#c8b090;margin:0 2px 6px}
 #ch103 .chLog{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column;gap:6px;padding:8px;border-radius:12px;background:#07090b;border:1px solid #ffffff10;overscroll-behavior:contain}
 #ch103 .chDay{align-self:center;font-size:10.5px;color:#8a7a68;background:#16110a;border-radius:8px;padding:2px 10px;margin:4px 0}
 #ch103 .chM{display:flex;flex-direction:column;align-items:flex-start;max-width:85%}#ch103 .chM.me{align-self:flex-end;align-items:flex-end}
 #ch103 .chNm{border:0;background:none;padding:0 4px 2px;color:#ffd38a;font-weight:900;font-size:11.5px}#ch103 .chNm.fr{color:#8de4ff}#ch103 .chNm:hover{text-decoration:underline}
 #ch103 .chB{display:flex;align-items:flex-end;gap:5px}#ch103 .chM.me .chB{flex-direction:row-reverse}
 #ch103 .chB span{padding:7px 11px;border-radius:14px 14px 14px 4px;background:#1e2830;font-size:14px;line-height:1.4;word-break:break-word;white-space:pre-wrap}
 #ch103 .chM.me .chB span{border-radius:14px 14px 4px 14px;background:linear-gradient(180deg,#ffe0a0,#ffb84a);color:#2a1604}
 #ch103 .chB small{font-size:9.5px;color:#7a8a90;flex:none}
 #ch103 .chFoot{display:flex;gap:6px;margin-top:8px}#ch103 .chFoot input{flex:1;min-width:0;padding:10px 12px;border-radius:12px;border:1px solid #ffb84a66;background:#07090b;color:#fff;font:inherit;font-size:15px}
 #ch103 .chFoot input:focus{outline:none;border-color:#ffd38a;box-shadow:0 0 12px #ffb84a44}
 #ch103 .chFoot button{padding:10px 16px;border-radius:12px;border:0;font-weight:900;background:linear-gradient(180deg,#fff0c8,#ffb84a);color:#2a1604}#ch103 .chFoot button:disabled{opacity:.5}
 #ch103 .chErr{font-size:12px;color:#ffb0b0;margin-top:6px}#ch103 .chErr.ok{color:#a6f5c6}
 #ch103 .chEmpty{margin:auto;text-align:center;color:#a89a88;font-size:13px;padding:20px}#ch103 .chEmpty small{color:#7a6a58}
 #ch103 .chPeers{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column;gap:5px}
 #ch103 .chPeer{display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:12px;border:1px solid #ffffff14;background:#12100c;color:#eaf6ef;text-align:left}
 #ch103 .chPeer.on{background:linear-gradient(90deg,#0f2a20,#12100c);border-color:#3ad16a44}#ch103 .chPeer b{font-size:14px}#ch103 .chPeer small{color:#9aa8b0;font-size:11px;margin-left:auto}
 #ch103 .chPeer em{font-style:normal;font-size:10.5px;font-weight:900;color:#fff;background:#ff2d55;border-radius:7px;padding:2px 7px}
 #ch103 .dot{width:9px;height:9px;border-radius:50%;background:#4a5260;flex:0 0 9px}#ch103 .on .dot{background:#3ad16a;box-shadow:0 0 6px #3ad16a}
 #ch103 .chPeerHd{display:flex;align-items:center;gap:8px;margin-bottom:6px}#ch103 .chBack{padding:6px 10px;border-radius:9px;border:1px solid #ffffff22;background:#1a140c;color:#e8dcc8;font-weight:800;font-size:12px}
 #ch103 .chPeerHd b{font-size:15px}#ch103 .chPeerHd small{font-size:11px;color:#9aa8b0}#ch103 .chPeerHd em{font-style:normal;color:#7dffa8}
 #ch103 .chPick{position:absolute;left:14px;right:14px;bottom:70px;display:flex;align-items:center;gap:6px;padding:10px 12px;border-radius:14px;background:#1e1810;border:2px solid #ffb84a;box-shadow:0 10px 30px #000c;animation:chIn .15s ease-out}
 #ch103 .chPick b{flex:1;font-size:14px}#ch103 .chPick button{padding:7px 11px;border-radius:10px;border:0;font-weight:900;font-size:12.5px;background:linear-gradient(180deg,#e6dcff,#a98aff);color:#14082a}#ch103 .chPick [data-pk=dm]{background:linear-gradient(180deg,#d8f6ff,#5ab8e8);color:#04121a}#ch103 .chPick .x{background:#2a3436;color:#e8f4ef}
 .frT.ch{border-color:#ffb84a;box-shadow:0 10px 30px #000c,0 0 20px #ffb84a44}
 @keyframes chIn{from{transform:translateY(10px);opacity:0}}`;document.head.appendChild(st);
 window.CHAT103={open,close,dm,dmNote,C};
}catch(e){console.error('v103 chat',e)}})();
