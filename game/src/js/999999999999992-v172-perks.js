/* ================= v172 편의 · 보상 — 「🎁 혜택 · 편의」 (CV172) =================
   ☰ 메뉴 「🎁 혜택 · 편의」(룰렛을 아직 안 돌렸으면 빨간 점). 탭 5개:
   - 선물: 행운 룰렛(하루 한 번 /api/roulette/spin, 골드는 장부 → PVP92.ledger · 다이아는 우편) · 친구 초대 코드(/api/invite/use, 가입 7일 안) ·
     생일 정하기(/api/perks/birthday, 1년에 한 번). 복귀(7일+) · 생일 · 가입 기념일 선물은 로그인 뒤 /api/perks/check가 우편으로 보냄.
   - 골드 은행: 서버 기록 골드 안에서 맡기기(게임 골드에서 뺌) · 하루 1% 이자(30일까지) · 찾기는 장부로(/api/bank).
   - 연습장: 허수아비(탑 1층 경기장에 맞기만 하는 골렘, 초당 피해 · 총 피해 · 최대 한 방) · 패턴 도감(1·2장 공격 100여 개 + 대처법 ATK_TIP, 「연습」은
     그 공격만 쓰는 약한 보스와 싸움 = BE168.fight 시험 싸움).
   - 설정: 알림(창이 뒤에 있을 때 친구 접속 · 새 우편 · 월드 보스를 브라우저 알림으로, 30초마다) · 접근성(색약 보정 SVG 필터 · 대비 높이기 ·
     박자 판정 넓게 = CB81.winMul ×1.45 · 화면 흔들림 끄기 · 번쩍임 줄이기). 저장은 localStorage(기기마다).
   - 소식 · 투표: 최근 업데이트 · 다음 업데이트 투표(/api/poll) · 의견 보내기. */
(()=>{try{
 const $=id=>document.getElementById(id),esc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const api=(p,b)=>window.DUO85&&DUO85.api?DUO85.api(p,b?'POST':'GET',b):Promise.resolve({s:0,j:{}});
 const acc=()=>{try{return DUO85.acc()}catch(e){return {}}};
 const num=v=>Number(v||0).toLocaleString();
 const toast=t=>{try{window.MR163&&MR163.toast?MR163.toast(t):banner(t)}catch(e){}};
 const ls=(k,v)=>{try{if(v===undefined)return JSON.parse(localStorage.getItem(k)||'null');localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}};
 const PK={info:null,busy:0};

 /* ================= 로그인 뒤 선물 확인 ================= */
 async function check(){if(!acc().token)return;const r=await api('/api/perks/check',{});if(r.s!==200)return;PK.info=r.j;dot();
  const g=r.j.got||[];if(g.length){const t={return:'🎁 돌아온 걸 환영해요! 선물이',birthday:'🎂 생일 축하해요! 선물이',anniv:'🎉 기념일 선물이'};toast(g.map(k=>t[k]).join(' · ')+' 우편함에 왔어요');try{MR163.refresh&&MR163.refresh()}catch(e){}}}
 let checked=0;setInterval(()=>{try{if(!checked&&acc().token&&typeof mode!=='undefined'&&mode==='menu'){checked=1;check()}}catch(e){}},2500);
 function dot(){try{document.documentElement.classList.toggle('spin172',!!(PK.info&&!PK.info.spun))}catch(e){}}

 /* ================= 허수아비 ================= */
 const DM={on:false,save:null,ev:[],tot:0,max:0,n:0,t0:0,m:null};
 function dummy(){closePanel();try{$('overlay').hidden=true}catch(e){}DM.save=(()=>{try{const s=saveData.tw71||{};return {floor:s.floor,best:s.best}}catch(e){return null}})();
  window.__nosr=1;try{TW71.start(1)}finally{window.__nosr=0}const T=TW71.T;T.queue=[];T.mobs=[];T.total=1;T.trans={t:0,txt:'연습장',sub:'허수아비를 마음껏 때려 보세요 · 맞지 않아요'};
  const m={sp:'golem',elite:true,x:AX+AW/2,y:AY+AH*.42,vx:0,vy:0,hp:1e9,max:1e9,s:1.6,born:.8,bornMax:.8,st:'idle',st0:0,cd:999,face:1,hitT:-9,stunT:-9,ang:0,seed:3,id:987654,dummy172:1};T.mobs.push(m);
  Object.assign(DM,{on:true,ev:[],tot:0,max:0,n:0,t0:performance.now(),m});bar.hidden=false;try{$('bvTitle').textContent='BEAT BLADE · 연습장'}catch(e){}}
 function dummyOff(){if(!DM.on)return;DM.on=false;bar.hidden=true;try{const s=saveData.tw71;if(s&&DM.save){s.floor=DM.save.floor;s.best=DM.save.best;saveNow()}}catch(e){}}
 const bar=document.createElement('div');bar.id='dm172';bar.hidden=true;bar.innerHTML='<b>🎯 연습장</b><span class="st"></span><button data-r>초기화</button><button data-x>나가기</button>';document.body.appendChild(bar);
 bar.addEventListener('pointerdown',e=>e.stopPropagation());bar.querySelector('[data-r]').onclick=()=>{Object.assign(DM,{ev:[],tot:0,max:0,n:0,t0:performance.now()})};bar.querySelector('[data-x]').onclick=()=>{dummyOff();try{toLobby()}catch(e){}};
 {const f=frame;frame=function(){const r=f.apply(this,arguments);try{if(DM.on){if(mode!=='tower'){dummyOff();return r}const T=TW71.T,m=DM.m,now=performance.now();if(!T.mobs.includes(m)){m.hp=1e9;T.mobs.push(m)}
   const d=1e9-m.hp;if(d>0){DM.tot+=d;DM.n++;DM.max=Math.max(DM.max,d);DM.ev.push([now,d])}m.hp=1e9;m.cd=999;m.st='idle';m.hitPose=null;P.inv=Math.max(P.inv||0,now+400);P._hitInv=0;/* 허수아비는 때리지 않음(혹시 닿아도 무적) */m.vx=0;m.vy=0;m.x=AX+AW/2;m.y=AY+AH*.42;T.shots=[];T.tels=[];T.clear=false;T.doorK=0;
   while(DM.ev.length&&now-DM.ev[0][0]>5000)DM.ev.shift();const w=Math.min(5,(now-DM.t0)/1000)||1,dps=DM.ev.reduce((a,e)=>a+e[1],0)/w;
   const st=bar.querySelector('.st'),tx='초당 피해 <b>'+num(Math.round(dps))+'</b> · 총 <b>'+num(Math.round(DM.tot))+'</b> · 최대 한 방 <b>'+num(Math.round(DM.max))+'</b> · '+DM.n+'타 · '+Math.floor((now-DM.t0)/1000)+'초';if(st.innerHTML!==tx)st.innerHTML=tx}}catch(e){}return r}}
 {const f=toLobby;toLobby=function(){dummyOff();return f.apply(this,arguments)}}

 /* ================= 패턴 도감 ================= */
 const PAT=()=>{const L=[];try{for(const g of BE168.POOL)for(const a of g.list){let b=0;for(let i=0;i<19;i++){if(i===9)continue;if((DECK[i]||[]).some(m=>m[0]===a)){b=i;break}}L.push({a,g:g.t,b,n:(typeof ATK_NAME!=='undefined'&&ATK_NAME[a])||a,tip:(typeof ATK_TIP!=='undefined'&&ATK_TIP[a])||''})}}catch(e){}return L};
 function practice(p){closePanel();try{BE168.fight({name:'연습 · '+p.n,owner:'연습장',code:'',body:p.b,hue:0,hp:0,atks:[p.a]})}catch(e){toast('연습을 시작하지 못했어요')}}

 /* ================= 알림 ================= */
 const NT=Object.assign({fr:true,mail:true,wb:true},ls('bb-noti172')||{});
 const canN=()=>'Notification' in window&&Notification.permission==='granted';
 function notify(title,body){try{if(!canN()||!document.hidden)return;new Notification(title,{body,icon:'/app/icon-192.png',tag:'bb172-'+title})}catch(e){}}
 const NS={fr:null,mail:null};
 setInterval(async()=>{try{if(!document.hidden||!canN()||!acc().token)return;
  if(NT.fr){const r=await api('/api/friends',{});if(r.s===200){const on=new Set((r.j.friends||[]).filter(f=>f.online).map(f=>f.name));if(NS.fr)for(const n of on)if(!NS.fr.has(n))notify('👥 친구 접속','「'+n+'」님이 들어왔어요');NS.fr=on}}
  if(NT.mail){const r=await api('/api/mail/list',{});if(r.s===200){const u=r.j.unread|0;if(NS.mail!=null&&u>NS.mail)notify('✉ 새 우편','우편함에 새 소식이 '+(u-NS.mail)+'개 왔어요');NS.mail=u}}}catch(e){}},30000);

 /* ================= 접근성 ================= */
 const AX1=Object.assign({cb:'none',wide:false,noshake:false,noflash:false},ls('bb-a11y172')||{});
 /* 색약 보정: corrected = I + E·(I − S) (S = 색약 흉내 행렬, E = 놓친 빨강·초록 차이를 다른 채널로 옮김) */
 const SIM={prot:[[.567,.433,0],[.558,.442,0],[0,.242,.758]],deut:[[.625,.375,0],[.7,.3,0],[0,.3,.7]],trit:[[.95,.05,0],[0,.433,.567],[0,.475,.525]]},E=[[0,0,0],[.7,1,0],[.7,0,1]];
 function corr(S){const I=[[1,0,0],[0,1,0],[0,0,1]],D=I.map((r,i)=>r.map((v,j)=>v-S[i][j])),M=I.map((r,i)=>r.map((v,j)=>v+E[i].reduce((a,e,k)=>a+e*D[k][j],0)));return M.map(r=>r.map(v=>+v.toFixed(3)).join(' ')+' 0 0').join(' ')+' 0 0 0 1 0'}
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('width','0');svg.setAttribute('height','0');svg.style.position='absolute';
 svg.innerHTML=Object.keys(SIM).map(k=>'<filter id="cb172-'+k+'" color-interpolation-filters="linearRGB"><feColorMatrix type="matrix" values="'+corr(SIM[k])+'"/></filter>').join('');document.body.appendChild(svg);
 const cbst=document.createElement('style');document.head.appendChild(cbst);
 function applyA11y(){const f=AX1.cb==='hc'?'contrast(1.25) saturate(1.35)':AX1.cb!=='none'?'url(#cb172-'+AX1.cb+')':'';
  cbst.textContent=f?'#game,#pvView,#plzView{filter:'+f+'}':'';ls('bb-a11y172',AX1)}
 applyA11y();
 if(window.CB81){const f=CB81.winMul;CB81.winMul=function(){const b=typeof f==='function'?f.apply(this,arguments):1;return b*(AX1.wide?1.45:1)}}
 {const f=frame;frame=function(){const r=f.apply(this,arguments);try{if(AX1.noshake||AX1.noflash){const T=window.TW71&&TW71.T;
   if(AX1.noshake){if(typeof G!=='undefined'&&G){G.shake=0}if(T)T.shake=0}if(AX1.noflash){if(typeof G!=='undefined'&&G&&G.flash)G.flash=Math.min(G.flash,.12);if(T&&T.flash)T.flash=Math.min(T.flash,.12)}}}catch(e){}return r}}

 /* ================= 소식 ================= */
 const NEWS=[['v172','혜택 · 편의','행운 룰렛 · 친구 초대 · 생일 선물 · 골드 은행 · 연습장(허수아비 · 패턴 도감) · 알림 · 접근성 · 투표함'],
  ['v171','작업실','내 층 · 음악 만들기 · 내 잡몹 · 도전 과제 · 게시판 · 이달의 작품 · 하이라이트 앨범'],['v170','기록 센터','주간 리그 · 고스트 · 노데미지 전당 · 업적 1000개 · 스피드런 · 친구 랭킹 · 명예'],
  ['v169','단추 정리','보스 만들기 · 타임어택을 찾기 쉽게'],['v168','보스 직접 만들기','몸 · 색 · 체력 · 공격을 골라 나만의 보스'],['v167','2:2 팀 결투','둘이 한 팀 · 동료 일으키기'],
  ['v166','결투장 관객','응원 · 내기'],['v165','타임어택','보스 10명 연속 기록'],['v164','듀오 매칭','자동으로 짝 찾기'],['v163','우편함','신고 · 차단']];

 /* ================= 창 ================= */
 const box=document.createElement('div');box.id='cv172';box.hidden=true;document.body.appendChild(box);box.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===box)closePanel()});
 const V={tab:'gift',msg:'',poll:null,spin:null,q:''};
 const TABS=[['gift','🎁','선물'],['bank','🏦','골드 은행'],['train','🎯','연습장'],['set','⚙','알림 · 접근성'],['news','📢','소식 · 투표']];
 function openPanel(t){if(t)V.tab=t;box.hidden=false;V.msg='';paint();load()}
 function closePanel(){box.hidden=true}
 async function load(){const t=V.tab;if(t==='gift'||t==='bank'){if(acc().token){const r=await api('/api/perks/check',{});if(r.s===200){PK.info=r.j;dot()}}}
  else if(t==='news'){const r=await api('/api/poll',{});V.poll=r.s===200?r.j:null}if(V.tab===t)paint()}
 const WHEEL=[['🪙 300','#5ab8ff'],['🪙 800','#7dffa8'],['🪙 1,500','#ffd166'],['🪙 3,000','#ff9a3a'],['💎 5','#c86aff'],['💎 15','#ff6ad5'],['🪙 8,000','#ff5a6a'],['💎 50','#ffffff']];
 function giftHtml(){const I=PK.info;if(!acc().token)return '<div class="em">로그인하면 선물을 받을 수 있어요</div>';if(!I)return '<div class="em">불러오는 중…</div>';
  return '<div class="gf"><div class="rl"><h5>🎡 행운 룰렛 <small>하루 한 번 · 오늘 '+(I.spun?'돌렸어요':'아직 안 돌렸어요')+'</small></h5><div class="wh"><canvas width="220" height="220" class="wc"></canvas><i class="pt"></i></div>'+
   '<button class="go" data-spin'+(I.spun?' disabled':'')+'>'+(I.spun?'내일 또 돌려요':'🎡 돌리기!')+'</button><small class="tb">'+WHEEL.map(w=>'<span style="--c:'+w[1]+'">'+w[0]+'</span>').join('')+'</small></div>'+
   '<div class="rc"><div class="cd2"><h5>🤝 친구 초대</h5><p>내 초대 코드를 친구에게 알려 주세요. 친구가 가입하고 7일 안에 코드를 넣으면 <b>둘 다 🪙 3,000 · 💎 20</b>! ('+I.invites+' / '+I.invite_max+'명)</p>'+
    '<div class="big"><b>'+esc(I.invite_code)+'</b><button data-copy>📋 복사</button><button data-share>📤 보내기</button></div>'+
    (I.can_invite?'<div class="row"><input maxlength="6" placeholder="받은 초대 코드" class="ic"><button data-use>넣기</button></div>':I.invited?'<small>✔ 초대 코드를 넣었어요</small>':'')+'</div>'+
   '<div class="cd2"><h5>🎂 생일</h5><p>생일을 정해 두면 그날 접속했을 때 <b>🪙 10,000 · 💎 50</b> 선물이 와요(1년에 한 번 바꿀 수 있어요).</p>'+
    '<div class="row">'+(I.birth?'<b class="bd">'+esc(I.birth.replace('-','월 '))+'일</b>':'')+(I.can_birth?'<input type="date" class="bdi"><button data-bday>정하기</button>':'')+'</div></div>'+
   '<div class="cd2"><h5>🎁 그 밖의 선물</h5><ul><li>7일 넘게 쉬다 오면 <b>복귀 선물</b>(쉰 날이 길수록 많이)</li><li>가입한 날마다 <b>기념일 선물</b></li><li>선물은 모두 <b>우편함</b>으로 와요</li></ul></div></div></div>'}
 function bankHtml(){const I=PK.info;if(!acc().token)return '<div class="em">로그인하면 은행을 쓸 수 있어요</div>';if(!I)return '<div class="em">불러오는 중…</div>';const B=I.bank;
  return '<div class="bk2"><div class="vault"><i>🏦</i><div><small>맡긴 골드</small><b>🪙 '+num(B.amt)+'</b><em>+ 이자 🪙 '+num(B.interest)+' ('+Math.floor(B.days)+'일째)</em></div></div>'+
   '<p>맡긴 골드에 <b>하루 '+Math.round(B.rate*100)+'%</b> 이자가 붙어요(최대 '+B.max_days+'일 · '+num(B.max)+'골드까지). 더 맡기면 지금까지 이자를 원금에 더하고 날짜가 처음부터 다시 세져요. 찾으면 원금 + 이자를 한꺼번에 받아요.</p>'+
   '<div class="row"><input type="number" min="100" step="100" class="amt" placeholder="맡길 골드"><button data-pct="0.1">10%</button><button data-pct="0.5">50%</button><button data-pct="1">전부</button><button class="go" data-dep>맡기기</button></div>'+
   '<div class="row"><button class="go wd" data-wd'+(B.amt?'':' disabled')+'>💰 모두 찾기 (🪙 '+num(B.amt+B.interest)+')</button></div><small>내 골드 🪙 '+num(saveData.coins||0)+'</small></div>'}
 function trainHtml(){const L=PAT(),q=V.q.trim(),F=q?L.filter(p=>p.n.includes(q)||p.tip.includes(q)):L;
  return '<div class="tr2"><div class="dmc"><i>🎯</i><div><b>허수아비 연습장</b><small>맞지 않는 골렘을 마음껏 때려 보세요 · 초당 피해 · 최대 한 방을 보여 줘요(장비 · 박자 · 치명 확인용)</small></div><button class="go" data-dummy>들어가기 ▶</button></div>'+
   '<h5>📖 패턴 도감 <small>'+L.length+'가지 · 「연습」을 누르면 그 공격만 쓰는 약한 보스와 싸워요</small></h5><input class="sr" placeholder="공격 이름으로 찾기" value="'+esc(V.q)+'">'+
   '<div class="pd">'+F.map((p,i)=>'<div class="pi"><div><b>'+esc(p.n)+'</b><small>'+esc(p.g.replace(/^\S+\s/,''))+' · '+esc((BOSSES[p.b]||{}).name||'')+'</small><p>'+(p.tip?esc(p.tip):'예고 표시를 보고 피한 뒤 반격해요')+'</p></div><button data-prac="'+esc(p.a)+'">연습</button></div>').join('')+'</div></div>'}
 function setHtml(){const per='Notification' in window?Notification.permission:'none';
  const tg=(k,on,t,s)=>'<label class="tg"><input type="checkbox" data-'+k+(on?' checked':'')+'><span><b>'+t+'</b><small>'+s+'</small></span></label>';
  return '<div class="st2"><div class="cd2"><h5>🔔 알림 <small>게임 창이 뒤에 있을 때만 · 이 기기에만</small></h5>'+(per==='granted'?'<small class="ok">✔ 알림이 켜져 있어요</small>':per==='denied'?'<small class="no">브라우저에서 알림이 막혀 있어요(주소창 왼쪽 자물쇠 → 알림 허용)</small>':per==='none'?'<small class="no">이 기기는 알림을 지원하지 않아요</small>':'<button class="go" data-perm>🔔 알림 허용하기</button>')+
   tg('nfr',NT.fr,'친구 접속','친구가 게임에 들어오면')+tg('nmail',NT.mail,'새 우편','선물 · 소식이 오면')+tg('nwb',NT.wb,'월드 보스','월드 보스가 나타나면')+'</div>'+
   '<div class="cd2"><h5>♿ 접근성 <small>이 기기에만 저장</small></h5><div class="cb">'+[['none','보정 없음'],['deut','초록 약함 보정'],['prot','빨강 약함 보정'],['trit','파랑 약함 보정'],['hc','대비 높이기']].map(([k,n])=>'<button data-cb="'+k+'" class="'+(AX1.cb===k?'on':'')+'">'+n+'</button>').join('')+'</div>'+
   tg('awide',AX1.wide,'박자 판정 넓게','PERFECT · GOOD 범위를 1.45배로(결투는 그대로)')+tg('ashake',AX1.noshake,'화면 흔들림 끄기','맞거나 큰 공격 때 화면이 흔들리지 않아요')+tg('aflash',AX1.noflash,'번쩍임 줄이기','화면 전체가 하얗게 번쩍이는 효과를 약하게')+'</div></div>'}
 function newsHtml(){const P=V.poll,tot=P?P.counts.reduce((a,b)=>a+b,0):0;
  return '<div class="nw2"><div class="cd2"><h5>📢 최근 업데이트</h5>'+NEWS.map(n=>'<div class="nl"><i>'+n[0]+'</i><b>'+esc(n[1])+'</b><small>'+esc(n[2])+'</small></div>').join('')+'</div>'+
   '<div class="cd2"><h5>🗳 '+(P?esc(P.title):'투표')+' <small>'+(P?num(tot)+'명 투표':'')+'</small></h5>'+(P?P.opts.map((o,i)=>{const c=P.counts[i]||0,q=tot?c/tot:0;return '<button class="po'+(P.mine===i?' on':'')+'" data-vote="'+i+'"><u style="width:'+Math.round(q*100)+'%"></u><b>'+esc(o)+'</b><em>'+(P.mine!=null?Math.round(q*100)+'%':'')+'</em></button>'}).join(''):'<div class="em">불러오는 중…</div>')+
   '<small>'+(P&&P.mine!=null?'투표했어요 · 다시 눌러 바꿀 수 있어요':'하나를 골라 주세요 · 결과는 투표하면 보여요')+'</small>'+
   '<h5>💬 의견 보내기</h5><textarea maxlength="200" placeholder="이런 게 있으면 좋겠어요! (200자 · 하루 3번)"></textarea><button class="go" data-sug>보내기</button></div></div>'}
 function paint(){if(box.hidden)return;const t=V.tab,bd=box.querySelector('.bd'),sc=bd?bd.scrollTop:0;
  box.innerHTML='<div class="pn"><div class="hd"><button class="bk">닫기</button><i>🎁</i><div><b>혜택 · 편의</b><small>룰렛 · 초대 · 생일 · 은행 · 연습장 · 패턴 도감 · 알림 · 접근성 · 투표</small></div></div>'+
   '<div class="tabs">'+TABS.map(([k,ic,n])=>'<button data-t="'+k+'" class="'+(t===k?'on':'')+'"><i>'+ic+'</i>'+n+(k==='gift'&&PK.info&&!PK.info.spun?'<u></u>':'')+'</button>').join('')+'</div><div class="bd">'+
   (t==='gift'?giftHtml():t==='bank'?bankHtml():t==='train'?trainHtml():t==='set'?setHtml():newsHtml())+'</div><div class="msg">'+esc(V.msg)+'</div></div>';
  const nb=box.querySelector('.bd');if(nb)nb.scrollTop=sc;wire()}
 function drawWheel(cv,rot){const o=cv.getContext('2d'),R=104,cx=110,cy=110,n=WHEEL.length;o.clearRect(0,0,220,220);
  for(let i=0;i<n;i++){const a0=rot+i*6.283/n-1.5708,a1=a0+6.283/n;o.beginPath();o.moveTo(cx,cy);o.arc(cx,cy,R,a0,a1);o.closePath();o.fillStyle=WHEEL[i][1];o.globalAlpha=i%2?.85:1;o.fill();o.globalAlpha=1;o.strokeStyle='#1a1028';o.lineWidth=2;o.stroke();
   o.save();o.translate(cx,cy);o.rotate(a0+3.1416/n);o.fillStyle='#1a1028';o.font='900 12px sans-serif';o.textAlign='right';o.fillText(WHEEL[i][0],R-8,4);o.restore()}
  o.beginPath();o.arc(cx,cy,16,0,6.283);o.fillStyle='#1a1028';o.fill();o.strokeStyle='#ffd166';o.lineWidth=3;o.stroke()}
 function wire(){const q=s=>box.querySelector(s),qa=(s,f)=>box.querySelectorAll(s).forEach(f);
  q('.bk').onclick=closePanel;qa('[data-t]',b=>b.onclick=()=>{V.tab=b.dataset.t;V.msg='';try{gmSfx('tab')}catch(e){}paint();load()});
  qa('input,textarea',i=>i.addEventListener('keydown',e=>e.stopPropagation()));
  const wc=q('canvas.wc');if(wc)drawWheel(wc,V.spin?V.spin.rot:0);
  if(q('[data-spin]'))q('[data-spin]').onclick=async e=>{const b=e.currentTarget;b.disabled=true;const r=await api('/api/roulette/spin',{});if(r.s!==200){V.msg=(r.j&&r.j.error)||'돌리지 못했어요';paint();return}
   const n=WHEEL.length,target=-(r.j.idx+.5)*6.283/n,start=performance.now(),from=0,to=target-6.283*6,cv=q('canvas.wc');try{sfx(440,.08,'square',.04,660)}catch(_){}
   const step=now=>{const k=Math.min(1,(now-start)/3600),e2=1-Math.pow(1-k,3),rot=from+(to-from)*e2;V.spin={rot};if(cv.isConnected)drawWheel(cv,rot);if(k<1){requestAnimationFrame(step);return}
    try{sfx(880,.15,'triangle',.06,1760)}catch(_){}V.msg='🎉 '+WHEEL[r.j.idx][0]+' 당첨!'+(r.j.dia?' (다이아는 우편함)':'');PK.info.spun=true;dot();try{PVP92.ledger()}catch(_){}paint()};requestAnimationFrame(step)};
  if(q('[data-copy]'))q('[data-copy]').onclick=()=>{try{navigator.clipboard.writeText(PK.info.invite_code)}catch(e){}toast('초대 코드 복사 · '+PK.info.invite_code)};
  if(q('[data-share]'))q('[data-share]').onclick=async()=>{const t='BEAT BLADE 같이 해요! 가입하고 초대 코드 '+PK.info.invite_code+' 를 넣으면 둘 다 선물을 받아요 🎁';try{if(navigator.share)await navigator.share({title:'BEAT BLADE 초대',text:t,url:location.origin+'/play'});else{await navigator.clipboard.writeText(t);toast('초대 글을 복사했어요')}}catch(e){}};
  if(q('[data-use]'))q('[data-use]').onclick=async()=>{const r=await api('/api/invite/use',{code:q('.ic').value.trim()});V.msg=r.s===200?'🤝 '+r.j.inviter+'님의 초대 선물이 우편함에 왔어요!':(r.j&&r.j.error)||'넣지 못했어요';load()};
  if(q('[data-bday]'))q('[data-bday]').onclick=async()=>{const v=q('.bdi').value;if(!v){V.msg='날짜를 골라 주세요';paint();return}const r=await api('/api/perks/birthday',{md:v.slice(5)});V.msg=r.s===200?'🎂 생일을 정했어요!':(r.j&&r.j.error)||'정하지 못했어요';load()};
  qa('[data-pct]',b=>b.onclick=()=>{q('.amt').value=Math.floor((saveData.coins||0)*+b.dataset.pct/100)*100});
  if(q('[data-dep]'))q('[data-dep]').onclick=async()=>{const amt=Math.floor(+q('.amt').value||0);if(amt<100){V.msg='100골드부터 맡길 수 있어요';paint();return}if(amt>(saveData.coins||0)){V.msg='골드가 모자라요';paint();return}
   try{await LV83.sync(true)}catch(e){}const r=await api('/api/bank',{act:'deposit',amt});if(r.s===200){try{addCoins(-r.j.took)}catch(e){saveData.coins-=r.j.took}try{gmHud();saveNow()}catch(e){}V.msg='🏦 🪙 '+num(r.j.took)+' 맡겼어요';PK.info.bank=r.j.bank}else V.msg=(r.j&&r.j.error)||'맡기지 못했어요';paint()};
  if(q('[data-wd]'))q('[data-wd]').onclick=async()=>{const r=await api('/api/bank',{act:'withdraw'});if(r.s===200){try{await PVP92.ledger()}catch(e){}V.msg='💰 🪙 '+num(r.j.got)+' 찾았어요 (이자 '+num(r.j.interest)+')';PK.info.bank=r.j.bank}else V.msg=(r.j&&r.j.error)||'찾지 못했어요';paint()};
  if(q('[data-dummy]'))q('[data-dummy]').onclick=dummy;
  if(q('.sr'))q('.sr').oninput=e=>{V.q=e.target.value;const p=e.target.selectionStart;paint();const s=box.querySelector('.sr');if(s){s.focus();s.setSelectionRange(p,p)}};
  qa('[data-prac]',b=>b.onclick=()=>{const p=PAT().find(x=>x.a===b.dataset.prac);if(p)practice(p)});
  if(q('[data-perm]'))q('[data-perm]').onclick=async()=>{try{await Notification.requestPermission()}catch(e){}paint()};
  const bind=(k,fn)=>{const i=q('[data-'+k+']');if(i)i.onchange=()=>fn(i.checked)};
  bind('nfr',v=>{NT.fr=v;ls('bb-noti172',NT)});bind('nmail',v=>{NT.mail=v;ls('bb-noti172',NT)});bind('nwb',v=>{NT.wb=v;ls('bb-noti172',NT)});
  bind('awide',v=>{AX1.wide=v;applyA11y()});bind('ashake',v=>{AX1.noshake=v;applyA11y()});bind('aflash',v=>{AX1.noflash=v;applyA11y()});
  qa('[data-cb]',b=>b.onclick=()=>{AX1.cb=b.dataset.cb;applyA11y();paint()});
  qa('[data-vote]',b=>b.onclick=async()=>{if(!acc().token){try{ACCT55.open()}catch(e){}return}const r=await api('/api/poll',{vote:+b.dataset.vote});if(r.s===200)V.poll=r.j;paint()});
  if(q('[data-sug]'))q('[data-sug]').onclick=async()=>{const t=q('textarea').value.trim();if(!t)return;const r=await api('/api/poll',{suggest:t});V.msg=r.s===200?'💬 의견을 보냈어요. 고마워요!':(r.j&&r.j.error)||'보내지 못했어요';if(r.s===200)V.poll=r.j;paint()}}

 const st=document.createElement('style');st.textContent=`
 #cv172{position:fixed;inset:0;z-index:9300;display:grid;place-items:center;background:#000b;backdrop-filter:blur(3px);color:#eef0f6;font-family:inherit}#cv172[hidden]{display:none}
 #cv172 .pn{width:min(860px,calc(100vw - 20px));height:min(640px,calc(100vh - 20px));display:flex;flex-direction:column;box-sizing:border-box;padding:12px 14px;border-radius:16px;
  background:radial-gradient(120% 60% at 50% 0%,#3a2a14,#120c08 70%);border:1px solid #ffd16655;box-shadow:0 20px 60px #000c,0 0 0 1px #000}
 #cv172 .hd{display:flex;align-items:center;gap:10px;margin-bottom:8px}#cv172 .hd>i{font-style:normal;font-size:22px;width:40px;height:40px;display:grid;place-items:center;border-radius:12px;background:linear-gradient(180deg,#7a5a1a,#2a1a08);border:1px solid #ffd16688}
 #cv172 .hd b{display:block;font-size:19px;color:#ffe79a}#cv172 .hd small{font-size:11.5px;color:#c8b49a}
 #cv172 .tabs{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px}#cv172 .tabs button{position:relative;font:inherit;font-weight:900;font-size:12.5px;padding:7px 10px;border-radius:10px;border:1px solid #ffffff1c;background:#1e1610;color:#e0d0b8;cursor:pointer;display:flex;gap:5px}
 #cv172 .tabs i{font-style:normal}#cv172 .tabs button.on{background:linear-gradient(180deg,#ffe79a,#ffb020);color:#2a1206}#cv172 .tabs u{position:absolute;top:-3px;right:-3px;width:10px;height:10px;border-radius:50%;background:#ff3a5a;box-shadow:0 0 6px #ff3a5a}
 #cv172 .bd{flex:1;min-height:0;overflow:auto}#cv172 .msg{min-height:16px;text-align:center;font-size:12.5px;color:#ffe79a;margin-top:4px;font-weight:800}#cv172 .em{text-align:center;padding:24px;color:#a8988a}
 #cv172 h5{margin:6px 0 6px;font-size:13px;color:#ffe79a}#cv172 h5 small{font-weight:600;color:#a8988a;margin-left:4px}#cv172 p{margin:0 0 6px;font-size:12px;line-height:1.6;color:#e0d0b8}#cv172 p b,#cv172 li b{color:#ffe79a}
 #cv172 .go{font:inherit;font-weight:900;font-size:13.5px;padding:9px 14px;border-radius:11px;border:0;cursor:pointer;background:linear-gradient(180deg,#ffe79a,#ff9a2a);color:#2a1206;box-shadow:0 0 0 2px #000}#cv172 .go:disabled{background:#3a3028;color:#8a7a6a;cursor:default}
 #cv172 .gf{display:grid;grid-template-columns:260px 1fr;gap:12px}#cv172 .rl{display:flex;flex-direction:column;align-items:center;gap:8px;padding:10px;border-radius:14px;background:radial-gradient(circle at 50% 40%,#3a2410,#140c06);border:1px solid #ffd16644}
 #cv172 .wh{position:relative}#cv172 .wc{width:220px;height:220px;filter:drop-shadow(0 4px 10px #000a)}#cv172 .pt{position:absolute;left:50%;top:-6px;margin-left:-9px;width:0;height:0;border-left:9px solid transparent;border-right:9px solid transparent;border-top:18px solid #ff3a5a;filter:drop-shadow(0 2px 2px #000)}
 #cv172 .tb{display:flex;flex-wrap:wrap;gap:3px;justify-content:center}#cv172 .tb span{font-size:10px;padding:1px 6px;border-radius:6px;background:color-mix(in srgb,var(--c) 25%,#140c06);color:var(--c)}
 #cv172 .rc{display:flex;flex-direction:column;gap:8px}#cv172 .cd2{padding:10px 12px;border-radius:12px;background:#1a120c;border:1px solid #ffffff12}#cv172 .cd2 ul{margin:0;padding-left:18px;font-size:12px;line-height:1.7;color:#e0d0b8}
 #cv172 .big{display:flex;align-items:center;gap:6px;flex-wrap:wrap}#cv172 .big b{font-family:ui-monospace,Menlo,monospace;font-size:24px;letter-spacing:.2em;color:#ffe79a;padding:4px 10px;border-radius:9px;background:#0c0806;border:1px solid #ffd16666}
 #cv172 .big button,#cv172 .row button:not(.go){font:inherit;font-weight:900;font-size:12px;padding:7px 10px;border-radius:9px;border:0;background:#3a2a1e;color:#ffe0b0;cursor:pointer}
 #cv172 .row{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-top:6px}#cv172 .row input{font:inherit;font-size:13px;padding:7px 9px;border-radius:9px;border:1px solid #ffd16666;background:#0c0806;color:#fff;min-width:0}#cv172 .ic{width:120px;text-transform:uppercase;font-family:ui-monospace,Menlo,monospace}
 #cv172 .bd2,#cv172 .row .bd{font-size:15px;color:#ffe79a}
 #cv172 .bk2{display:flex;flex-direction:column;gap:8px;max-width:560px;margin:0 auto}#cv172 .vault{display:flex;align-items:center;gap:14px;padding:14px;border-radius:14px;background:linear-gradient(180deg,#3a3020,#1a140c);border:2px solid #ffd16688}
 #cv172 .vault i{font-style:normal;font-size:40px}#cv172 .vault small{display:block;color:#c8b49a}#cv172 .vault b{display:block;font-size:26px;color:#ffe79a}#cv172 .vault em{font-style:normal;color:#7dffa8;font-weight:800}
 #cv172 .amt{width:150px}#cv172 .wd{flex:1}#cv172 .bk2>small{color:#a8988a}
 #cv172 .dmc{display:flex;align-items:center;gap:12px;padding:12px;border-radius:14px;background:linear-gradient(90deg,#2a1a10,#140c06);border:1px solid #ffd16644}#cv172 .dmc i{font-style:normal;font-size:30px}#cv172 .dmc>div{flex:1}#cv172 .dmc b{display:block;font-size:16px;color:#ffe79a}#cv172 .dmc small{color:#c8b49a;font-size:11.5px}
 #cv172 .sr{width:100%;box-sizing:border-box;font:inherit;font-size:13px;padding:7px 10px;border-radius:9px;border:1px solid #ffd16666;background:#0c0806;color:#fff;margin-bottom:6px}
 #cv172 .pd{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:6px}#cv172 .pi{display:flex;gap:8px;align-items:center;padding:7px 9px;border-radius:10px;background:#1a120c;border:1px solid #ffffff10}#cv172 .pi>div{flex:1;min-width:0}
 #cv172 .pi b{font-size:13px}#cv172 .pi small{display:block;font-size:10.5px;color:#a8988a}#cv172 .pi p{margin:3px 0 0;font-size:11px;color:#d8c8b0}#cv172 .pi button{font:inherit;font-weight:900;font-size:12px;padding:6px 10px;border-radius:9px;border:0;background:linear-gradient(180deg,#ffd08a,#ff7a2a);color:#2a0e04;cursor:pointer}
 #cv172 .st2,#cv172 .nw2{display:grid;grid-template-columns:1fr 1fr;gap:10px}#cv172 .tg{display:flex;gap:8px;align-items:flex-start;margin-top:8px;cursor:pointer}#cv172 .tg input{margin-top:3px;width:18px;height:18px}#cv172 .tg b{display:block;font-size:13px}#cv172 .tg small{font-size:11px;color:#a8988a}
 #cv172 .ok{color:#7dffa8}#cv172 .no{color:#ff9a8a}#cv172 .cb{display:flex;flex-wrap:wrap;gap:4px}#cv172 .cb button{font:inherit;font-weight:800;font-size:12px;padding:6px 9px;border-radius:9px;border:1px solid #ffffff1c;background:#1e1610;color:#e0d0b8;cursor:pointer}#cv172 .cb button.on{background:#ffd166;color:#2a1206}
 #cv172 .nl{display:grid;grid-template-columns:44px 1fr;gap:0 8px;padding:5px 0;border-bottom:1px dashed #ffffff14}#cv172 .nl i{grid-row:1/3;font-style:normal;font-weight:900;color:#ffb070;font-size:12px}#cv172 .nl b{font-size:12.5px}#cv172 .nl small{font-size:11px;color:#a8988a}
 #cv172 .po{position:relative;display:flex;justify-content:space-between;width:100%;margin-bottom:5px;padding:8px 10px;border-radius:10px;border:1px solid #ffffff1c;background:#1e1610;color:#eef0f6;font:inherit;cursor:pointer;overflow:hidden;text-align:left}
 #cv172 .po u{position:absolute;left:0;top:0;bottom:0;background:#ffd16633;text-decoration:none}#cv172 .po b,#cv172 .po em{position:relative;font-size:13px}#cv172 .po em{font-style:normal;color:#ffe79a;font-weight:900}#cv172 .po.on{border-color:#ffd166}
 #cv172 textarea{width:100%;box-sizing:border-box;min-height:70px;font:inherit;font-size:13px;padding:8px;border-radius:10px;border:1px solid #ffd16666;background:#0c0806;color:#fff;resize:vertical;margin-bottom:6px}
 #dm172{position:fixed;left:50%;bottom:10px;transform:translateX(-50%);z-index:9200;display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:12px;background:#140c06ee;border:1px solid #ffd16688;color:#eef0f6;font-size:12.5px;box-shadow:0 6px 20px #000a}
 #dm172[hidden]{display:none}#dm172 b{color:#ffe79a}#dm172 .st b{color:#7dffa8}#dm172 button{white-space:nowrap;font:inherit;font-weight:900;font-size:12px;padding:6px 10px;border-radius:9px;border:0;background:#3a2a1e;color:#ffe0b0;cursor:pointer}
 html.spin172 #gmMore{position:relative}html.spin172 #gmMore::after{content:'';position:absolute;top:2px;right:2px;width:9px;height:9px;border-radius:50%;background:#ff3a5a;box-shadow:0 0 6px #ff3a5a}
 @media (max-width:700px){#cv172 .gf,#cv172 .st2,#cv172 .nw2{grid-template-columns:1fr}#dm172{flex-wrap:wrap;justify-content:center;width:calc(100vw - 30px)}}
 html.lpL #cv172 .pn{padding:8px 10px}html.lpL #cv172 .hd small{display:none}`;document.head.appendChild(st);
 window.CV172={open:openPanel,close:closePanel,check,notify,NT,AX1,dummy,PK,DM};
}catch(e){console.error('v172 perks',e)}})();
