/* ================= v163 우편함 · 신고 · 차단 (MR163) =================
   - 우편함: 로비 위쪽 줄 「✉ 우편」(골드 · 다이아 칩 뒤, 안 읽은 수 빨간 점) · ☰ 빠른 설정 「우편함」.
     서버 /api/mail/list · /api/mail/act(read · claim(id|all) · delete(id|read)). 받은 골드 · 다이아는 addCoins · DIA80.add.
     운영자는 /api/admin/mail(헤더 X-Admin-Key)로 한 사람 또는 모두(to='*')에게 보낸다. 다른 기능(내기 정산 · 대회)도 서버 mail_send로 보낸다.
   - 신고: report(이름, 장소, 내용) → 이유 고르기 창(#rep163). 서버 /api/report(같은 사람 하루 한 번, 5명이 욕설 · 도배로 신고하면 24시간 채팅 금지).
   - 차단: block(이름, 켜기) → 서버 /api/block. 차단하면 광장에서 안 보이고 채팅 · 친구 신청 · 초대가 막힌다. ☰ 「차단 목록」에서 풀기.
   - 신고 · 차단 단추: 광장 정보 창(PLZ111), 채팅 이름 누르기(CHAT103), 결투 결과 등에서 MR163.menu(이름, 장소)로. */
(()=>{try{
 const $=id=>document.getElementById(id),esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const api=(p,b)=>window.DUO85&&DUO85.api?DUO85.api(p,'POST',b||{}):Promise.resolve({s:0,j:{}});
 const logged=()=>{try{return !!DUO85.acc().token}catch(e){return false}};
 const num=n=>Number(n||0).toLocaleString('ko-KR');
 const M={mails:[],unread:0,open:-1,msg:'',busy:0,loaded:0,blocked:[]};
 const ago=t=>{const s=Date.now()/1000-t;return s<3600?Math.max(1,Math.floor(s/60))+'분 전':s<86400?Math.floor(s/3600)+'시간 전':Math.floor(s/86400)+'일 전'};
 const left=t=>{const d=Math.ceil((t-Date.now()/1000)/86400);return d<=1?'오늘까지':d+'일 남음'};
 /* ---------- 로비 칩 ---------- */
 function chip(){const anchor=$('gmDia')||$('gmCoins');if(!anchor||!anchor.parentNode)return;let b=$('gmMail');
  if(!b){b=document.createElement('button');b.id='gmMail';b.type='button';b.className=anchor.className.replace(/\bdia80p\b/,'');b.title='우편함 — 보상 · 공지';b.onclick=e=>{e.stopPropagation();open()};anchor.after(b)}
  const t='✉ 우편'+(M.unread?' '+M.unread:'');if(b.dataset.t!==t){b.dataset.t=t;b.innerHTML='<i>✉</i><span>우편</span>'+(M.unread?'<em>'+(M.unread>99?'99+':M.unread)+'</em>':'')}}
 setInterval(()=>{try{chip()}catch(e){}},900);
 async function refresh(){if(!logged()||M.busy)return;M.busy=1;try{const r=await api('/api/mail/list');if(r.s===200&&r.j.ok){M.mails=r.j.mails||[];M.unread=r.j.unread||0;M.loaded=1;chip();if(!box.hidden)draw()}}catch(e){}finally{M.busy=0}}
 setTimeout(refresh,4000);setInterval(()=>{if(!document.hidden)refresh()},60000);
 /* ---------- 우편함 창 ---------- */
 const box=document.createElement('div');box.id='mail163';box.hidden=true;document.body.appendChild(box);
 box.addEventListener('pointerdown',e=>{if(e.target===box)close()});
 function open(){box.hidden=false;M.msg='';M.open=-1;draw();refresh()}
 function close(){box.hidden=true}
 const rw=m=>(m.gold?'<span class="g">🪙 '+num(m.gold)+'</span>':'')+(m.dia?'<span class="d">💎 '+num(m.dia)+'</span>':'');
 function draw(){const L=M.mails,can=L.some(m=>(m.gold||m.dia)&&!m.got);
  box.innerHTML='<div class="mp"><div class="mh"><button class="x">닫기</button><i class="env"></i><div><b>우편함</b><small>받은 우편은 30일 동안 보관돼요</small></div></div>'+
   (!logged()?'<div class="me">로그인하면 우편을 받을 수 있어요</div>':!M.loaded?'<div class="me">불러오는 중…</div>':!L.length?'<div class="me"><i class="env big"></i>우편함이 비어 있어요</div>':
   '<div class="ml">'+L.map((m,i)=>{const has=m.gold||m.dia,on=M.open===i;return '<div class="mi'+(m.read?'':' new')+(has&&!m.got?' rw':'')+(on?' on':'')+'" data-i="'+i+'"><i class="env'+(m.read?' op':'')+'"></i>'+
     '<div class="mt"><b>'+esc(m.title)+'</b><small>'+esc(m.from)+' · '+ago(m.t)+' · '+left(m.exp)+'</small>'+(has?'<div class="mr">'+rw(m)+'</div>':'')+(on?'<p>'+esc(m.body||'(내용 없음)').replace(/\n/g,'<br>').replace(/\[보스 코드 ([A-Z0-9]{6})\]/g,'<button class="cb168" data-cb="$1">⚔ 보스 코드 $1 · 도전하기</button>')/* v168 도전장 */+'</p>':'')+'</div>'+
     (has?(m.got?'<span class="ok">받음</span>':'<button class="cl" data-c="'+esc(m.id)+'">받기</button>'):'')+'</div>'}).join('')+'</div>')+
   '<div class="mf"><button class="all"'+(can?'':' disabled')+'>모두 받기</button><button class="del">읽은 우편 지우기</button></div><div class="mm">'+esc(M.msg)+'</div></div>';
  box.querySelector('.x').onclick=close;
  box.querySelectorAll('.mi').forEach(el=>el.onclick=async e=>{if(e.target.closest('.cl'))return;const i=+el.dataset.i,m=M.mails[i];M.open=M.open===i?-1:i;draw();if(m&&!m.read){m.read=true;const r=await api('/api/mail/act',{act:'read',id:m.id});apply(r,true)}});
  box.querySelectorAll('.cl').forEach(b=>b.onclick=()=>claim(b.dataset.c));
  const a=box.querySelector('.all');if(a)a.onclick=()=>claim('all');const d=box.querySelector('.del');if(d)d.onclick=async()=>{const r=await api('/api/mail/act',{act:'delete',id:'read'});apply(r);M.msg='읽은 우편을 지웠어요';draw()}}
 function apply(r,quiet){if(r.s===200&&r.j.ok){M.mails=r.j.mails||M.mails;M.unread=r.j.unread||0;chip();if(!quiet)draw()}}
 async function claim(id){const r=await api('/api/mail/act',{act:'claim',id});if(r.s!==200||!r.j.ok){M.msg=(r.j&&r.j.error)||'받지 못했어요';draw();return}
  const g=r.j.gold||0,d=r.j.dia||0;try{if(g)addCoins(g)}catch(e){}try{if(d&&window.DIA80)DIA80.add(d)}catch(e){}try{gmHud()}catch(e){}try{saveNow()}catch(e){}
  M.msg=g||d?'받았어요! '+(g?'🪙 '+num(g)+' ':'')+(d?'💎 '+num(d):''):'받을 보상이 없어요';try{gmSfx('ok')}catch(e){}apply(r)}
 /* ---------- 신고 · 차단 ---------- */
 const REASONS=[['abuse','욕설 · 비방'],['spam','도배 · 광고'],['name','나쁜 이름'],['cheat','핵 · 버그 악용'],['etc','기타']];
 const rp=document.createElement('div');rp.id='rep163';rp.hidden=true;document.body.appendChild(rp);
 rp.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===rp)rp.hidden=true});rp.addEventListener('keydown',e=>e.stopPropagation());
 function report(name,place,detail){if(!name)return;rp.hidden=false;
  rp.innerHTML='<div class="rpp"><div class="mh"><button class="x">닫기</button><i class="sir"></i><div><b>신고하기</b><small>'+esc(name)+' · '+esc(place||'')+'</small></div></div>'+
   '<div class="rr">'+REASONS.map(([k,t],i)=>'<label><input type="radio" name="r163" value="'+k+'"'+(i?'':' checked')+'><span>'+t+'</span></label>').join('')+'</div>'+
   '<textarea maxlength="300" placeholder="무슨 일이 있었는지 적어 주세요(선택)">'+esc(detail||'')+'</textarea>'+
   '<label class="bk"><input type="checkbox" checked> 이 사람 차단하기(내 화면에서 안 보이게)</label><div class="rb"><button class="go">신고 보내기</button></div><div class="mm"></div></div>';
  const q=s=>rp.querySelector(s);q('.x').onclick=()=>rp.hidden=true;
  q('.go').onclick=async()=>{q('.go').disabled=true;const reason=(rp.querySelector('input[name=r163]:checked')||{}).value||'etc';
   const r=await api('/api/report',{name,reason,place:place||'',detail:q('textarea').value});
   if(q('.bk input').checked)await block(name,true,true);
   q('.mm').textContent=r.s===200?'✓ 신고를 받았어요. 고마워요!':(r.j&&r.j.error)||'보내지 못했어요';if(r.s===200)setTimeout(()=>rp.hidden=true,1400);else q('.go').disabled=false}}
 async function block(name,on,quiet){const r=await api('/api/block',{name,on:!!on});if(r.s===200&&r.j.ok){M.blocked=r.j.blocked||[];try{if(window.PLZ111&&on){delete PLZ111.S.O[name]}}catch(e){}
   if(!quiet)toast(on?name+'님을 차단했어요':name+'님 차단을 풀었어요');return true}if(!quiet)toast((r.j&&r.j.error)||'차단하지 못했어요');return false}
 function isBlocked(name){return M.blocked.some(b=>b.name===name)}
 /* 짧은 알림 */const ts=document.createElement('div');ts.id='ts163';ts.hidden=true;document.body.appendChild(ts);let tsT=0;
 function toast(t){ts.textContent=t;ts.hidden=false;clearTimeout(tsT);tsT=setTimeout(()=>ts.hidden=true,2200)}
 /* 차단 목록 창 */
 const bl=document.createElement('div');bl.id='blk163';bl.hidden=true;document.body.appendChild(bl);bl.addEventListener('pointerdown',e=>{if(e.target===bl)bl.hidden=true});
 async function blockList(){bl.hidden=false;bl.innerHTML='<div class="rpp"><div class="mh"><button class="x">닫기</button><i class="nob"></i><div><b>차단 목록</b><small>차단한 사람은 광장 · 채팅에서 안 보여요</small></div></div><div class="me">불러오는 중…</div></div>';
  bl.querySelector('.x').onclick=()=>bl.hidden=true;const r=await api('/api/block',{});if(r.s===200)M.blocked=r.j.blocked||[];paintBl()}
 function paintBl(){bl.innerHTML='<div class="rpp"><div class="mh"><button class="x">닫기</button><i class="nob"></i><div><b>차단 목록</b><small>차단한 사람은 광장 · 채팅에서 안 보여요</small></div></div>'+
   (M.blocked.length?'<div class="ml">'+M.blocked.map(b=>'<div class="mi"><div class="mt"><b>'+esc(b.name)+'</b><small>'+ago(b.t)+' 차단</small></div><button class="cl" data-n="'+esc(b.name)+'">풀기</button></div>').join('')+'</div>':'<div class="me">차단한 사람이 없어요</div>')+'</div>';
  bl.querySelector('.x').onclick=()=>bl.hidden=true;bl.querySelectorAll('[data-n]').forEach(b=>b.onclick=async()=>{await block(b.dataset.n,false);paintBl()})}
 /* 이름 메뉴(차단 · 신고) — 다른 화면에서 부름 */
 function menu(name,place,detail){if(!name)return;const m=document.createElement('div');m.className='nm163';m.innerHTML='<div class="rpp"><b>'+esc(name)+'</b><button class="b1">🚫 '+(isBlocked(name)?'차단 풀기':'차단')+'</button><button class="b2">🚨 신고</button><button class="x">닫기</button></div>';
  document.body.appendChild(m);const rm=()=>m.remove();m.addEventListener('pointerdown',e=>{if(e.target===m)rm()});m.querySelector('.x').onclick=rm;
  m.querySelector('.b1').onclick=async()=>{rm();await block(name,!isBlocked(name))};m.querySelector('.b2').onclick=()=>{rm();report(name,place,detail)}}
 setTimeout(async()=>{if(logged()){const r=await api('/api/block',{});if(r.s===200)M.blocked=r.j.blocked||[]}},5000);
 const st=document.createElement('style');st.id='mr163css';st.textContent=`
 #mail163,#rep163,#blk163,.nm163{position:fixed;inset:0;z-index:9450;display:flex;align-items:center;justify-content:center;background:#000a;font-family:inherit;color:#eef0ff}
 #mail163[hidden],#rep163[hidden],#blk163[hidden]{display:none}
 #mail163 .mp,#rep163 .rpp,#blk163 .rpp{position:relative;width:min(560px,calc(100vw - 20px));max-height:calc(100dvh - 20px);display:flex;flex-direction:column;border-radius:8px;
  background:linear-gradient(180deg,#1c1f3a,#0e1024);box-shadow:0 0 0 3px #000,0 0 0 5px #5a6ad8,0 0 0 7px #000,0 20px 60px #000d;overflow:hidden}
 #rep163 .rpp,#blk163 .rpp{width:min(420px,calc(100vw - 20px))}
 #mail163 .mh,#rep163 .mh,#blk163 .mh{display:flex;align-items:center;gap:10px;padding:12px 14px 10px 56px;background:linear-gradient(180deg,#2e3470,#1c2050);border-bottom:3px solid #000;position:relative}
 #mail163 .mh .x,#rep163 .mh .x,#blk163 .mh .x{position:absolute;left:10px;top:50%;transform:translateY(-50%)}
 .mh b{display:block;font-size:18px;font-weight:900;color:#ffe9a0;text-shadow:2px 2px 0 #000}.mh small{display:block;font-size:11px;color:#a8b0e0}
 #mail163 i.env,#blk163 i.nob,#rep163 i.sir{display:inline-block;width:28px;height:22px;flex:none;image-rendering:pixelated;background:var(--ic) center/contain no-repeat}
 #mail163 .ml,#blk163 .ml{flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:7px}
 #mail163 .mi,#blk163 .mi{display:flex;align-items:flex-start;gap:10px;padding:9px 10px;background:#ffffff0a;box-shadow:0 0 0 2px #000,inset 0 1px 0 #ffffff14;cursor:pointer;border-left:4px solid #3a4280}
 #mail163 .mi.new{border-left-color:#ffd166;background:#ffd16610}#mail163 .mi.rw{border-left-color:#5ad8ff}#mail163 .mi.on{background:#ffffff16}
 #mail163 .mt,#blk163 .mt{flex:1;min-width:0}#mail163 .mt b,#blk163 .mt b{display:block;font-size:14px;font-weight:900;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
 #mail163 .mt small,#blk163 .mt small{display:block;font-size:10.5px;color:#9aa4d8;margin-top:1px}
 #mail163 .mt p{margin:7px 0 2px;font-size:12.5px;line-height:1.5;color:#dfe4ff;white-space:normal}
 #mail163 .mr{display:flex;gap:6px;margin-top:5px}#mail163 .mr span{padding:2px 8px;font-size:12px;font-weight:900;background:#000a;box-shadow:0 0 0 1px #ffffff22}#mail163 .mr .g{color:#ffe08a}#mail163 .mr .d{color:#9fe8ff}
 #mail163 .cl,#blk163 .cl{flex:none;align-self:center;padding:7px 14px;border:0;font:inherit;font-weight:900;font-size:13px;cursor:pointer;color:#fff;background:linear-gradient(180deg,#7ae06a,#2e9a3a);box-shadow:0 0 0 2px #000,inset 0 2px 0 #c0ffb0,inset 0 -3px 0 #1a6a24}
 #blk163 .cl{background:linear-gradient(180deg,#9aa4c8,#5a6488);box-shadow:0 0 0 2px #000,inset 0 2px 0 #d8e0ff,inset 0 -3px 0 #3a4060}
 #mail163 .ok{flex:none;align-self:center;font-size:11px;font-weight:900;color:#7ae06a}
 #mail163 .me,#blk163 .me{padding:34px 16px;text-align:center;color:#a8b0e0;font-size:13px;display:flex;flex-direction:column;align-items:center;gap:10px}#mail163 i.env.big{width:64px;height:50px;opacity:.6}
 #mail163 .mf{display:flex;gap:8px;padding:10px 12px;border-top:3px solid #000;background:#14173a}
 #mail163 .mf button{flex:1;padding:9px;border:0;font:inherit;font-weight:900;font-size:13.5px;cursor:pointer;box-shadow:0 0 0 2px #000,inset 0 2px 0 #ffffff55,inset 0 -3px 0 #0005}
 #mail163 .mf .all{background:linear-gradient(180deg,#ffe58a,#e0a020);color:#2a1604}#mail163 .mf .del{background:#2a2f5a;color:#c8d0ff}#mail163 .mf button:disabled{opacity:.45;cursor:default}
 #mail163 .mm,#rep163 .mm{min-height:16px;padding:0 12px 8px;font-size:12px;font-weight:800;color:#a6f5c6;text-align:center;background:#14173a}
 #rep163 .rr{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:12px 14px 6px}#rep163 .rr label{display:flex;align-items:center;gap:6px;padding:8px 10px;background:#ffffff0c;box-shadow:0 0 0 2px #000;font-size:13px;font-weight:800;cursor:pointer}
 #rep163 .rr input{accent-color:#ff6a8a}#rep163 textarea{margin:6px 14px;min-height:64px;resize:none;padding:8px 10px;border:0;background:#0a0c1e;color:#fff;font:inherit;font-size:13px;box-shadow:0 0 0 2px #000,inset 0 0 0 1px #3a4280}
 #rep163 .bk{display:flex;align-items:center;gap:6px;padding:2px 14px 8px;font-size:12px;color:#c8d0ff}#rep163 .rb{padding:4px 14px 10px}
 #rep163 .go{width:100%;padding:10px;border:0;font:inherit;font-weight:900;font-size:15px;cursor:pointer;color:#fff;background:linear-gradient(180deg,#ff7a8a,#d02a44);box-shadow:0 0 0 2px #000,inset 0 2px 0 #ffb0bc,inset 0 -3px 0 #8a0a20}
 .nm163 .rpp{display:flex;flex-direction:column;gap:8px;padding:14px;min-width:220px;background:#1c1f3a;box-shadow:0 0 0 3px #000,0 0 0 5px #5a6ad8;border-radius:8px}
 .nm163 b{text-align:center;font-size:16px;color:#ffe9a0}.nm163 button{padding:9px;border:0;font:inherit;font-weight:900;font-size:13.5px;cursor:pointer;color:#fff;background:#2e3470;box-shadow:0 0 0 2px #000}
 .nm163 .b2{background:#8a1a2a}.nm163 .x{background:#3a3f5a;color:#c8d0ff}
 #ts163{position:fixed;left:50%;bottom:16%;transform:translateX(-50%);z-index:9500;padding:9px 16px;background:#000d;box-shadow:0 0 0 2px #ffd166;color:#fff;font-weight:900;font-size:13px;border-radius:4px;pointer-events:none}#ts163[hidden]{display:none}
 #gmMail{position:relative}#gmMail em{position:absolute;top:-6px;right:-6px;min-width:17px;height:17px;padding:0 4px;border-radius:9px;background:#ff3a5a;color:#fff;font-style:normal;font-size:10.5px;font-weight:900;display:grid;place-items:center;box-shadow:0 0 0 2px #000}
 #gmMail i{font-style:normal}html.lp #gmMail span{display:none}html.lp #gameMenu.lvOn .gmHud>#gmMail{flex:0 0 auto!important;min-width:0!important;height:32px!important;border-radius:999px!important;padding:0 9px!important;font-size:14px!important}
 html.lpPad #gameMenu.lvOn .gmHud>#gmMail{height:42px!important}
 html.lpP #mail163 .mp{height:calc(100dvh - 40px)}`;document.head.appendChild(st);
 /* 도트 아이콘: 편지 봉투 · 사이렌 · 금지 */
 function sprite(rows,pal){const c=document.createElement('canvas');c.width=rows[0].length;c.height=rows.length;const x=c.getContext('2d');rows.forEach((r,y)=>{for(let i=0;i<r.length;i++){const p=pal[r[i]];if(p){x.fillStyle=p;x.fillRect(i,y,1,1)}}});return 'url('+c.toDataURL()+')'}
 const RT=document.documentElement.style;
 RT.setProperty('--env163',sprite(['KKKKKKKKKKKKKK','KWWWWWWWWWWWWK','KlWWWWWWWWWWlK','KWlWWWWWWWWlWK','KWWlWWWWWWlWWK','KWWWlWrrWlWWWK','KWWWWlrrlWWWWK','KWWWlWllWlWWWK','KWWlWWWWWWlWWK','KWlWWWWWWWWlWK','KKKKKKKKKKKKKK'],{K:'#2a2014',W:'#f4ecd8',l:'#b8a888',r:'#e8344a'}));
 RT.setProperty('--env163o',sprite(['......KK......','....KKWWKK....','..KKWWWWWWKK..','KKWWWWWWWWWWKK','KlWKKKKKKKKWlK','KWlKggggggKlWK','KWWlKggggKlWWK','KWWWlKKKKlWWWK','KWWlWWWWWWlWWK','KWlWWWWWWWWlWK','KKKKKKKKKKKKKK'],{K:'#2a2014',W:'#f4ecd8',l:'#b8a888',g:'#ffd166'}));
 RT.setProperty('--sir163',sprite(['....KKKK....','...KrrRRK...','..KrrRRRRK..','..KrRRWWRK..','..KrRRWWRK..','.KKKKKKKKKK.','KggggggggggK','KKKKKKKKKKKK'],{K:'#1a1010',r:'#a8102a',R:'#ff3a5a',W:'#ffd0d8',g:'#5a5a6a'}));
 RT.setProperty('--nob163',sprite(['...KKKKK...','..KRRRRRK..','.KRRWWWRRK.','KRRWWWWRRRK','KRWWWWRRWRK','KRWWWRRWWRK','KRWRRWWWWRK','KRRRWWWWRRK','.KRRWWWRRK.','..KRRRRRK..','...KKKKK...'],{K:'#1a1010',R:'#e8344a',W:'#f4ecd8'}));
 const st2=document.createElement('style');st2.textContent=`#mail163 i.env{--ic:var(--env163)}#mail163 i.env.op{--ic:var(--env163o)}#rep163 i.sir{--ic:var(--sir163)}#blk163 i.nob{--ic:var(--nob163)}`;document.head.appendChild(st2);
 window.MR163={open,close,refresh,report,block,blockList,menu,isBlocked,toast,M};
}catch(e){console.error('v163 mail report',e)}})();
