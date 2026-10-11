/* ================= v173 월드 보스 · 길드 (WG173) =================
   ☰ 메뉴 「🐉 월드 보스」 · 「🏰 길드」.
   - 월드 보스: 하루(UTC)에 하나(서버 /api/wb/info). 서버 전체가 체력 하나를 함께 깎는다. 한 사람 하루 3번, 한 번에 90초.
     싸움은 startRush(보스) + G.wb173, 체력을 크게(×30) 늘려 두고 90초 동안 넣은 피해(G.wbMax − G.hp)를 /api/wb/hit로 보냄(길드 레벨 1마다 +1%).
     쓰러뜨리거나 날이 바뀌면 서버가 기여 비율만큼 우편 보상(마지막 한 방 · 1~3위는 더). 창이 뒤에 있으면 새 월드 보스 알림(CV172.notify).
   - 길드: 만들기(🪙3,000 · 이름 · 문장 16가지 · 색 10가지 · 소개 · 바로 가입/승인), 찾기 · 가입(신청), 길드원 목록(접속 · 레벨 · 기부),
     출석(하루 한 번 골드 + 길드 경험치), 기부(골드 → 길드 경험치), 길드 채팅(4초마다), 길드장 관리(내보내기 · 길드장 넘기기 · 꾸미기 · 신청 받기).
     길드 레벨(경험치 √)마다 인원 +2 · 월드 보스 피해 +1% · 출석 골드 +30. */
(()=>{try{
 const $=id=>document.getElementById(id),esc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const api=(p,b)=>window.DUO85&&DUO85.api?DUO85.api(p,b?'POST':'GET',b):Promise.resolve({s:0,j:{}});
 const acc=()=>{try{return DUO85.acc()}catch(e){return {}}};
 const num=v=>Number(v||0).toLocaleString();
 const toast=t=>{try{window.MR163&&MR163.toast?MR163.toast(t):banner(t)}catch(e){}};
 const ago=t=>{const s=Date.now()/1000-t;return s<60?'방금':s<3600?Math.floor(s/60)+'분 전':s<86400?Math.floor(s/3600)+'시간 전':Math.floor(s/86400)+'일 전'};
 const left=t=>{const s=Math.max(0,t-Date.now()/1000),h=Math.floor(s/3600),m=Math.floor(s%3600/60);return h+'시간 '+m+'분'};
 const WB_SEC=90,WB_MUL=30;

 /* ================= 월드 보스 싸움 ================= */
 const WB={info:null,on:false,t0:0,day:''};
 async function wbInfo(){const r=await api('/api/wb/info',{});if(r.s===200){WB.info=r.j;return r.j}return null}
 async function wbFight(){const I=WB.info||await wbInfo();if(!I){toast('서버에 연결할 수 없어요');return}if(!acc().token){try{ACCT55.open()}catch(e){}return}
  if(I.me.tries>=I.tries_max){toast('오늘은 '+I.tries_max+'번 모두 도전했어요');return}if(I.hp_left<=0){toast('이미 쓰러졌어요! 보상은 우편함으로 와요');return}
  closeWB();try{$('overlay').hidden=true}catch(e){}WB.day=I.day;WB.t0=0;WB.on=true;try{startRush(I.boss)}catch(e){console.error(e);WB.on=false;return}
  try{G.wb173={day:I.day};$('bossName').textContent='🐉 월드 보스 · '+BOSSES[I.boss].name;$('bvTitle').textContent='BEAT BLADE · 월드 보스 '+I.day}catch(e){}}
 {const f=drawScene;drawScene=function(now){const r=f.apply(this,arguments);try{if(mode==='boss'&&G&&G.wb173){
   if(G._hp54&&!G.wbMax){G.maxHp=Math.round(G.maxHp*WB_MUL);G.hp=G.maxHp;G.hpShow=1;G._barLast=undefined;G.wbMax=G.maxHp}
   if(G.state==='play'){if(!WB.t0)WB.t0=performance.now();const el=(performance.now()-WB.t0)/1000;if(el>=WB_SEC){fightEnd(true);return r}
    const dmg=Math.max(0,(G.wbMax||G.maxHp)-G.hp),tx='🐉 월드 보스 · 남은 시간 '+Math.ceil(WB_SEC-el)+'초 · 내 피해 '+num(Math.round(dmg)),c=ctx;c.save();try{c.setTransform(SS,0,0,SS,0,0)}catch(e){}
    c.font='bold 9px sans-serif';const w=c.measureText(tx).width+14;c.globalAlpha=.88;c.fillStyle='#2a0608';c.fillRect(W/2-w/2,AY+30,w,14);c.globalAlpha=1;c.fillStyle=WB_SEC-el<10?'#ff5a6a':'#ffd0a0';c.textAlign='center';c.fillText(tx,W/2,AY+40);c.restore()}}}catch(e){}return r}}
 if(typeof fightEnd==='function'){const f=fightEnd;fightEnd=function(won){if(G&&G.wb173&&G.state!=='result'){wbEnd();return}return f.apply(this,arguments)}}
 async function wbEnd(){G.state='result';G.won=true;/* 마지막 피격 복기(850)가 안 붙게 */try{stopMusic()}catch(e){}WB.on=false;const dmg=Math.round(Math.max(0,(G.wbMax||G.maxHp)-Math.max(0,G.hp)));
  let res=null;if(acc().token){const r=await api('/api/wb/hit',{day:G.wb173.day,dmg});res=r.s===200?r.j:{err:(r.j&&r.j.error)||'올리지 못했어요'}}
  const I=await wbInfo(),hp=I?I.hp_left/I.hp_max:0;
  const html='<div class="wb173r"><b>🐉 '+esc((BOSSES[(I||{}).boss|0]||{}).name||'')+'</b><div class="dm">내 피해 <b>'+num(res&&!res.err?res.dmg:dmg)+'</b>'+(res&&res.bonus?' <em>(길드 +'+res.bonus+'%)</em>':'')+'</div>'+
   (res&&res.err?'<div class="er">'+esc(res.err)+'</div>':'')+(res&&res.killed?'<div class="kl">⚔ 마지막 한 방! 월드 보스를 쓰러뜨렸어요! 🎉</div>':'')+
   (I?'<div class="hb"><i style="width:'+Math.round(hp*100)+'%"></i><span>남은 체력 '+num(I.hp_left)+' / '+num(I.hp_max)+'</span></div><small>오늘 '+I.me.tries+' / '+I.tries_max+'번 도전 · 내 총 피해 '+num(I.me.dmg)+' · 참가 '+I.players+'명</small>':'')+'</div>';
  try{showOverlay('WORLD BOSS',res&&res.killed?'토벌 성공!':'피해를 넣었어요!',html,[['🐉 월드 보스',()=>{$('overlay').hidden=true;try{toLobby()}catch(e){}setTimeout(openWB,200)},true],['로비로',()=>{try{toLobby()}catch(e){}},false]])}catch(e){}}
 /* 새 월드 보스 알림(창이 뒤에 있을 때) */
 setInterval(async()=>{try{if(!document.hidden||!window.CV172||!CV172.NT.wb)return;const I=await wbInfo();if(!I)return;let d=null;try{d=localStorage.getItem('bb-wb173')}catch(e){}
  if(d&&d!==I.day)CV172.notify('🐉 새 월드 보스!','오늘의 월드 보스 「'+BOSSES[I.boss].name+'」가 나타났어요');try{localStorage.setItem('bb-wb173',I.day)}catch(e){}}catch(e){}},300000);

 /* ================= 월드 보스 창 ================= */
 const wb=document.createElement('div');wb.id='wb173';wb.hidden=true;document.body.appendChild(wb);wb.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===wb)closeWB()});
 let wbT=0;function openWB(){wb.hidden=false;paintWB();wbInfo().then(paintWB);clearInterval(wbT);wbT=setInterval(()=>{if(wb.hidden){clearInterval(wbT);return}wbInfo().then(paintWB)},5000)}
 function closeWB(){wb.hidden=true;clearInterval(wbT)}
 function paintWB(){if(wb.hidden)return;const I=WB.info;
  if(!I){wb.innerHTML='<div class="pn"><div class="hd"><button class="bk">닫기</button><b>🐉 월드 보스</b></div><div class="em">불러오는 중…</div></div>';wb.querySelector('.bk').onclick=closeWB;return}
  const hp=I.hp_left/I.hp_max,dead=I.hp_left<=0,full=I.me.tries>=I.tries_max;try{try{localStorage.setItem('bb-wb173',I.day)}catch(e){}}catch(e){}
  wb.innerHTML='<div class="pn"><div class="hd"><button class="bk">닫기</button><i>🐉</i><div><b>월드 보스</b><small>서버 전체가 함께 쓰러뜨려요 · 하루 '+I.tries_max+'번 · 한 번에 '+WB_SEC+'초</small></div></div>'+
   '<div class="top"><canvas width="300" height="200" class="bv"></canvas><div class="inf"><small>'+esc(I.day)+' · 끝나기까지 '+left(I.ends)+'</small><b>'+esc(BOSSES[I.boss].name)+'</b>'+
    '<div class="hb big'+(dead?' dead':'')+'"><i style="width:'+Math.round(hp*1000)/10+'%"></i><span>'+(dead?'⚔ 토벌 성공!':num(I.hp_left)+' / '+num(I.hp_max))+'</span></div>'+
    '<div class="st"><span>참가 <b>'+I.players+'명</b></span><span>내 피해 <b>'+num(I.me.dmg)+'</b></span><span>도전 <b>'+I.me.tries+' / '+I.tries_max+'</b></span>'+(I.bonus?'<span>길드 보너스 <b>+'+I.bonus+'%</b></span>':'')+'</div>'+
    '<button class="go" data-go'+(dead||full?' disabled':'')+'>'+(dead?'오늘의 월드 보스를 쓰러뜨렸어요':full?'오늘은 다 도전했어요 · 내일 또!':'⚔ 도전하기 ('+WB_SEC+'초)')+'</button>'+
    '<p class="tip">💡 쓰러뜨리면 참가한 모두에게 <b>넣은 피해만큼</b> 골드 · 💎 우편! 1~3위와 마지막 한 방은 보너스. 못 쓰러뜨려도 날이 바뀌면 절반을 받아요.</p></div></div>'+
   '<div class="two"><div><h5>⚔ 오늘의 용사 TOP 10</h5>'+(I.top.length?I.top.map((x,i)=>'<div class="tr"><i>'+(i<3?['🥇','🥈','🥉'][i]:i+1)+'</i><b>'+esc(x.name)+'</b><span>'+num(x.dmg)+'</span><u><em style="width:'+Math.round(x.dmg/Math.max(1,I.top[0].dmg)*100)+'%"></em></u></div>').join(''):'<div class="em">아직 아무도 없어요 · 첫 피해를 넣어 봐요!</div>')+'</div>'+
   '<div><h5>🏰 길드 순위</h5>'+(I.guilds.length?I.guilds.map((x,i)=>'<div class="tr"><i>'+(i+1)+'</i><b><span class="emb" style="--c:'+x.color+'">'+esc(x.emblem)+'</span>'+esc(x.name)+'</b><span>'+num(x.dmg)+'</span></div>').join(''):'<div class="em">길드로 함께하면 피해 보너스!</div>')+'</div></div></div>';
  wb.querySelector('.bk').onclick=closeWB;const g=wb.querySelector('[data-go]');if(g)g.onclick=wbFight;
  const cv=wb.querySelector('canvas.bv');if(cv){const o=cv.getContext('2d'),B=BOSSES[I.boss];const loop=now=>{if(!cv.isConnected)return;o.clearRect(0,0,300,200);const gr=o.createRadialGradient(150,140,10,150,140,150);gr.addColorStop(0,'#ff3a2a55');gr.addColorStop(1,'transparent');o.fillStyle=gr;o.fillRect(0,0,300,200);
   o.imageSmoothingEnabled=false;try{o.save();if(dead)o.filter='grayscale(1) brightness(.6)';drawMech(o,B,150,150,now,{},3.6);o.restore()}catch(e){}requestAnimationFrame(loop)};requestAnimationFrame(loop)}}

 /* ================= 길드 창 ================= */
 const gd=document.createElement('div');gd.id='gd173';gd.hidden=true;document.body.appendChild(gd);gd.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===gd)closeGD()});
 const GV={me:null,list:null,tab:'mem',q:'',mk:null,msg:'',msgs:[],since:0,chatT:0};
 function openGD(){if(!acc().token){try{ACCT55.open()}catch(e){}return}gd.hidden=false;GV.msg='';GV.msgs=[];GV.since=0;paintGD();loadGD();clearInterval(GV.chatT);GV.chatT=setInterval(()=>{if(gd.hidden){clearInterval(GV.chatT);return}if(GV.me&&GV.me.guild)loadGD(true)},4000)}
 function closeGD(){gd.hidden=true;clearInterval(GV.chatT)}
 async function loadGD(quiet){const r=await api('/api/guild/me',{since:GV.since});if(r.s!==200){GV.msg=(r.j&&r.j.error)||'서버에 연결할 수 없어요';paintGD();return}
  const was=GV.me&&GV.me.guild&&GV.me.guild.id;GV.me=r.j;if(r.j.guild){if(was!==r.j.guild.id){GV.msgs=[];GV.since=0}const seen=new Set(GV.msgs.map(m=>m.name+'|'+m.t));for(const m of r.j.msgs||[])if(!seen.has(m.name+'|'+m.t))GV.msgs.push(m);if(GV.msgs.length>200)GV.msgs=GV.msgs.slice(-200);if(GV.msgs.length)GV.since=Math.round(GV.msgs[GV.msgs.length-1].t*1000)}
  else{const l=await api('/api/guild/list',{q:GV.q});GV.list=l.s===200?l.j.guilds:[]}
  if(quiet&&GV.tab==='chat'&&r.j.msgs&&r.j.msgs.length===0)return;paintGD()}
 const emb=(g,big)=>'<span class="emb'+(big?' big':'')+'" style="--c:'+esc(g.color)+'">'+esc(g.emblem)+'</span>';
 function noGuild(){const M=GV.me||{},L=GV.list||[];if(GV.mk){const k=GV.mk;return '<div class="mk"><h5>🏰 새 길드 만들기 <small>🪙 '+num(M.cost||3000)+'</small></h5><div class="pre">'+emb(k,true)+'<div><input class="gn" maxlength="10" placeholder="길드 이름 (2~10자)" value="'+esc(k.name)+'"><input class="gdsc" maxlength="60" placeholder="한 줄 소개 (60자)" value="'+esc(k.descr)+'"></div></div>'+
   '<h5>문장</h5><div class="pk">'+(M.emblems||[]).map(e=>'<button data-em="'+esc(e)+'" class="'+(k.emblem===e?'on':'')+'">'+esc(e)+'</button>').join('')+'</div>'+
   '<h5>색</h5><div class="pk">'+(M.colors||[]).map(c=>'<button data-col="'+c+'" class="col'+(k.color===c?' on':'')+'" style="background:'+c+'"></button>').join('')+'</div>'+
   '<label class="tg"><input type="checkbox" data-open'+(k.open?' checked':'')+'> 누구나 바로 가입(끄면 길드장이 신청을 받아요)</label><div class="ac"><button data-mkback>취소</button><button class="go" data-mkgo>🏰 만들기 (🪙 '+num(M.cost||3000)+')</button></div></div>'}
  return '<div class="ng"><div class="bar"><input class="gq" placeholder="길드 이름으로 찾기" value="'+esc(GV.q)+'"><button data-find>찾기</button><button class="go" data-mk>＋ 길드 만들기</button></div>'+
   '<p class="tip">길드에 들면 <b>길드 출석</b>(매일 골드) · <b>길드 채팅</b> · <b>월드 보스 피해 보너스</b>(길드 레벨 1마다 +1%)! 기부와 월드 보스로 길드 레벨을 올려요.</p>'+
   '<div class="gl">'+(GV.list==null?'<div class="em">불러오는 중…</div>':L.length?L.map(g=>{const pend=(M.pending||[]).includes(g.id);return '<div class="gi">'+emb(g,true)+'<div><b>'+esc(g.name)+' <em>Lv.'+g.lv+'</em></b><small>👑 '+esc(g.leader)+' · '+g.members+' / '+g.cap+'명 · '+(g.open?'바로 가입':'승인 필요')+'</small><p>'+esc(g.descr||'')+'</p></div>'+
     '<button data-join="'+g.id+'"'+(pend||g.members>=g.cap?' disabled':'')+'>'+(pend?'신청함':g.members>=g.cap?'꽉 참':g.open?'가입':'신청')+'</button></div>'}).join(''):'<div class="em">길드가 없어요 · 첫 길드를 만들어 봐요!</div>')+'</div></div>'}
 function inGuild(){const M=GV.me,g=M.guild,lead=M.role==='leader',q=g.next?Math.max(0,Math.min(1,(g.xp-g.cur)/(g.next-g.cur))):1,meM=(g.list||[]).find(x=>x.me)||{};
  const head='<div class="gh">'+emb(g,true)+'<div><b>'+esc(g.name)+' <em>Lv.'+g.lv+'</em></b><small>👑 '+esc(g.leader)+' · '+g.members+' / '+g.cap+'명 · 길드 금고 🪙 '+num(g.gold)+'</small><p>'+esc(g.descr||'')+'</p>'+
   '<u><i style="width:'+Math.round(q*100)+'%"></i></u><small>'+(g.next?'다음 레벨까지 '+num(g.next-g.xp)+' 경험치':'최고 레벨!')+' · 월드 보스 +'+g.lv+'% · 출석 🪙 '+(200+g.lv*30)+'</small></div></div>';
  const tabs='<div class="tabs">'+[['mem','👥 길드원'],['chat','💬 채팅'],['act','⭐ 활동'],['set',lead?'⚙ 관리'+(M.reqs&&M.reqs.length?' ('+M.reqs.length+')':''):'⚙ 설정']].map(([k,n])=>'<button data-gt="'+k+'" class="'+(GV.tab===k?'on':'')+'">'+n+'</button>').join('')+'</div>';
  let b='';
  if(GV.tab==='mem')b='<div class="ml">'+(g.list||[]).map(x=>'<div class="mi'+(x.me?' me':'')+'"><i class="dot'+(x.online?' on':'')+'"></i><b>'+(x.role==='leader'?'👑 ':'')+esc(x.name)+'</b><small>Lv.'+x.lv+' · '+x.floor+'F · 기부 🪙 '+num(x.donated)+(x.att?' · ✔ 출석':'')+'</small>'+
    (lead&&!x.me?'<button data-kick="'+esc(x.name)+'">내보내기</button><button data-lead="'+esc(x.name)+'">길드장 넘기기</button>':'')+'</div>').join('')+'</div>';
  else if(GV.tab==='chat')b='<div class="ch"><div class="cl">'+(GV.msgs.length?GV.msgs.map(m=>'<div class="cm'+(m.me?' me':'')+'"><b>'+esc(m.name)+'</b><p>'+esc(m.text)+'</p><small>'+ago(m.t)+'</small></div>').join(''):'<div class="em">첫 인사를 남겨 봐요!</div>')+'</div><div class="ci"><input maxlength="120" class="cin" placeholder="길드원에게 한마디 (120자)"><button class="go" data-send>보내기</button></div></div>';
  else if(GV.tab==='act')b='<div class="act"><div class="cd"><h5>✔ 길드 출석</h5><p>하루 한 번 · 🪙 '+(200+g.lv*30)+' + 길드 경험치 20</p><button class="go" data-att'+(meM.att?' disabled':'')+'>'+(meM.att?'오늘 출석 완료':'출석하기')+'</button></div>'+
   '<div class="cd"><h5>🪙 기부</h5><p>골드 50당 길드 경험치 1 · 길드 금고에 쌓여요</p><div class="row"><input type="number" min="100" step="100" class="don" placeholder="기부할 골드"><button class="go" data-don>기부</button></div><small>내 골드 🪙 '+num(saveData.coins||0)+' · 내가 낸 기부 🪙 '+num(meM.donated)+'</small></div>'+
   '<div class="cd"><h5>🐉 월드 보스</h5><p>길드원이 넣은 피해 200당 길드 경험치 1 · 길드 레벨만큼 피해 보너스</p><button class="go" data-wb>월드 보스 보러 가기</button></div></div>';
  else b='<div class="set">'+(lead?'<h5>📨 가입 신청</h5>'+((M.reqs||[]).length?M.reqs.map(r=>'<div class="mi"><b>'+esc(r.name)+'</b><small>Lv.'+r.lv+'</small><button data-acc="'+esc(r.name)+'">받기</button><button data-rej="'+esc(r.name)+'">거절</button></div>').join(''):'<div class="em sm">신청이 없어요</div>')+
    '<h5>🎨 길드 꾸미기</h5><input class="edsc" maxlength="60" value="'+esc(g.descr||'')+'" placeholder="한 줄 소개"><div class="pk">'+(M.emblems||[]).map(e=>'<button data-eem="'+esc(e)+'" class="'+(g.emblem===e?'on':'')+'">'+esc(e)+'</button>').join('')+'</div>'+
    '<div class="pk">'+(M.colors||[]).map(c=>'<button data-ecol="'+c+'" class="col'+(g.color===c?' on':'')+'" style="background:'+c+'"></button>').join('')+'</div><label class="tg"><input type="checkbox" data-eopen'+(g.open?' checked':'')+'> 누구나 바로 가입</label><button class="go" data-esave>저장</button>':'')+
   '<h5>🚪 길드 나가기</h5><p>'+(lead?'길드장이 나가면 기부를 가장 많이 한 길드원이 길드장이 돼요. 혼자면 길드가 사라져요.':'나가도 언제든 다른 길드에 들어갈 수 있어요.')+'</p><button class="lv" data-leave>길드 나가기</button></div>';
  return head+tabs+'<div class="gb">'+b+'</div>'}
 function paintGD(){if(gd.hidden)return;const M=GV.me,cl=gd.querySelector('.cl'),atB=cl?cl.scrollHeight-cl.scrollTop-cl.clientHeight<30:true,inp=gd.querySelector('.cin'),iv=inp?inp.value:'',foc=document.activeElement===inp;
  gd.innerHTML='<div class="pn"><div class="hd"><button class="bk">닫기</button><i>🏰</i><div><b>길드</b><small>함께 출석하고 · 기부하고 · 월드 보스를 쓰러뜨려요</small></div></div><div class="bd">'+(!M?'<div class="em">불러오는 중…</div>':M.guild?inGuild():noGuild())+'</div><div class="msg">'+esc(GV.msg)+'</div></div>';
  const ncl=gd.querySelector('.cl');if(ncl&&atB)ncl.scrollTop=ncl.scrollHeight;const ni=gd.querySelector('.cin');if(ni){ni.value=iv;if(foc){ni.focus()}}wireGD()}
 function wireGD(){const q=s=>gd.querySelector(s),qa=(s,f)=>gd.querySelectorAll(s).forEach(f);q('.bk').onclick=closeGD;qa('input',i=>i.addEventListener('keydown',e=>e.stopPropagation()));
  const act=async(path,body,ok)=>{const r=await api(path,body);GV.msg=r.s===200?(typeof ok==='function'?ok(r.j):ok||''):(r.j&&r.j.error)||'하지 못했어요';await loadGD();return r};
  if(q('[data-find]'))q('[data-find]').onclick=()=>{GV.q=q('.gq').value.trim();GV.list=null;paintGD();loadGD()};
  if(q('[data-mk]'))q('[data-mk]').onclick=()=>{const M=GV.me||{};GV.mk={name:'',descr:'',emblem:(M.emblems||['⚔'])[0],color:(M.colors||['#ff5a6a'])[0],open:true};paintGD()};
  if(GV.mk){const k=GV.mk;const sync=()=>{const n=q('.gn'),d=q('.gdsc');if(n)k.name=n.value;if(d)k.descr=d.value};qa('[data-em]',b=>b.onclick=()=>{sync();k.emblem=b.dataset.em;paintGD()});qa('[data-col]',b=>b.onclick=()=>{sync();k.color=b.dataset.col;paintGD()});
   if(q('[data-open]'))q('[data-open]').onchange=e=>{k.open=e.target.checked};if(q('[data-mkback]'))q('[data-mkback]').onclick=()=>{GV.mk=null;paintGD()};
   if(q('[data-mkgo]'))q('[data-mkgo]').onclick=async()=>{sync();try{await LV83.sync(true)}catch(e){}const r=await api('/api/guild/create',{name:k.name,descr:k.descr,emblem:k.emblem,color:k.color,open:k.open});
    if(r.s===200){try{addCoins(-r.j.took)}catch(e){saveData.coins-=r.j.took}try{gmHud();saveNow()}catch(e){}GV.mk=null;GV.msg='🏰 길드를 만들었어요!';GV.tab='mem'}else GV.msg=(r.j&&r.j.error)||'만들지 못했어요';loadGD()}}
  qa('[data-join]',b=>b.onclick=()=>act('/api/guild/join',{id:b.dataset.join},j=>j.joined?'🏰 길드에 들어왔어요!':'📨 가입을 신청했어요 · 길드장이 받으면 들어가요'));
  qa('[data-gt]',b=>b.onclick=()=>{GV.tab=b.dataset.gt;paintGD()});
  qa('[data-kick]',b=>b.onclick=()=>{if(confirm(b.dataset.kick+'님을 내보낼까요?'))act('/api/guild/manage',{act:'kick',name:b.dataset.kick},'내보냈어요')});
  qa('[data-lead]',b=>b.onclick=()=>{if(confirm(b.dataset.lead+'님에게 길드장을 넘길까요?'))act('/api/guild/manage',{act:'lead',name:b.dataset.lead},'👑 길드장을 넘겼어요')});
  const send=async()=>{const i=q('.cin'),t=i.value.trim();if(!t)return;i.value='';const r=await api('/api/guild/chat',{text:t});if(r.s!==200){GV.msg=(r.j&&r.j.error)||'';}loadGD()};
  if(q('[data-send]')){q('[data-send]').onclick=send;q('.cin').onkeydown=e=>{e.stopPropagation();if(e.key==='Enter')send()}}
  if(q('[data-att]'))q('[data-att]').onclick=()=>act('/api/guild/attend',{},j=>{try{PVP92.ledger()}catch(e){}return '✔ 출석! 🪙 +'+j.gold});
  if(q('[data-don]'))q('[data-don]').onclick=async()=>{const amt=Math.floor(+q('.don').value||0);if(amt<100){GV.msg='100골드부터 기부할 수 있어요';paintGD();return}if(amt>(saveData.coins||0)){GV.msg='골드가 모자라요';paintGD();return}
   try{await LV83.sync(true)}catch(e){}const r=await api('/api/guild/donate',{amt});if(r.s===200){try{addCoins(-r.j.took)}catch(e){saveData.coins-=r.j.took}try{gmHud();saveNow()}catch(e){}GV.msg='🪙 '+num(r.j.took)+' 기부! 길드 경험치 +'+r.j.xp}else GV.msg=(r.j&&r.j.error)||'기부하지 못했어요';loadGD()};
  if(q('[data-wb]'))q('[data-wb]').onclick=()=>{closeGD();openWB()};
  qa('[data-acc]',b=>b.onclick=()=>act('/api/guild/respond',{name:b.dataset.acc,ok:true},'받았어요'));qa('[data-rej]',b=>b.onclick=()=>act('/api/guild/respond',{name:b.dataset.rej,ok:false},'거절했어요'));
  if(q('[data-esave]')){const g=GV.me.guild;let em=g.emblem,col=g.color;qa('[data-eem]',b=>b.onclick=()=>{em=b.dataset.eem;qa('[data-eem]',x=>x.classList.toggle('on',x===b))});qa('[data-ecol]',b=>b.onclick=()=>{col=b.dataset.ecol;qa('[data-ecol]',x=>x.classList.toggle('on',x===b))});
   q('[data-esave]').onclick=()=>act('/api/guild/manage',{act:'edit',descr:q('.edsc').value,emblem:em,color:col,open:q('[data-eopen]').checked},'저장했어요')}
  if(q('[data-leave]'))q('[data-leave]').onclick=()=>{if(confirm('길드에서 나갈까요?'))act('/api/guild/leave',{},'길드에서 나왔어요')}}

 const st=document.createElement('style');st.textContent=`
 #wb173,#gd173{position:fixed;inset:0;z-index:9300;display:grid;place-items:center;background:#000b;backdrop-filter:blur(3px);color:#eef0f6;font-family:inherit}#wb173[hidden],#gd173[hidden]{display:none}
 #wb173 .pn,#gd173 .pn{width:min(880px,calc(100vw - 20px));max-height:calc(100vh - 20px);display:flex;flex-direction:column;box-sizing:border-box;padding:12px 14px;border-radius:16px;box-shadow:0 20px 60px #000c,0 0 0 1px #000;overflow:auto}
 #wb173 .pn{background:radial-gradient(120% 60% at 50% 0%,#4a1010,#120606 70%);border:1px solid #ff5a3a66}#gd173 .pn{height:min(660px,calc(100vh - 20px));background:radial-gradient(120% 60% at 50% 0%,#1a2a4a,#080c16 70%);border:1px solid #5a8aff66;overflow:hidden}
 #wb173 .hd,#gd173 .hd{display:flex;align-items:center;gap:10px;margin-bottom:8px}#wb173 .hd>i,#gd173 .hd>i{font-style:normal;font-size:22px;width:40px;height:40px;display:grid;place-items:center;border-radius:12px;background:#0006;border:1px solid #ffffff33}
 #wb173 .hd b,#gd173 .hd b{display:block;font-size:19px;color:#ffe0c0}#wb173 .hd small,#gd173 .hd small{font-size:11.5px;color:#c8b0a8}#gd173 .hd b{color:#c8dcff}#gd173 .hd small{color:#a8b8d0}
 #wb173 .em,#gd173 .em{text-align:center;padding:20px;color:#a89890}#gd173 .em.sm{padding:6px;font-size:12px}#wb173 h5,#gd173 h5{margin:8px 0 6px;font-size:13px;color:#ffe79a}#gd173 h5 small{color:#a8b8d0;font-weight:600;margin-left:4px}
 #wb173 .go,#gd173 .go{font:inherit;font-weight:900;font-size:14px;padding:10px 14px;border-radius:11px;border:0;cursor:pointer;background:linear-gradient(180deg,#ffb08a,#ff3a2a);color:#fff;box-shadow:0 0 0 2px #000}#gd173 .go{background:linear-gradient(180deg,#a8c8ff,#3a6aff)}
 #wb173 .go:disabled,#gd173 .go:disabled,#gd173 button:disabled{background:#3a3030!important;color:#8a7a72!important;cursor:default}
 #wb173 .top{display:grid;grid-template-columns:300px 1fr;gap:12px;align-items:center;padding:10px;border-radius:14px;background:#0005;border:1px solid #ff5a3a44}#wb173 .bv{width:300px;height:200px;image-rendering:pixelated}
 #wb173 .inf{display:flex;flex-direction:column;gap:8px}#wb173 .inf>small{color:#c8b0a8}#wb173 .inf>b{font-size:24px;color:#fff;text-shadow:0 0 12px #ff3a2a}
 #wb173 .hb,.wb173r .hb{position:relative;height:22px;border-radius:8px;background:#1a0606;border:2px solid #000;overflow:hidden}#wb173 .hb i,.wb173r .hb i{display:block;height:100%;background:linear-gradient(180deg,#ff8a6a,#d01a1a);box-shadow:inset 0 2px 0 #ffffff55}
 #wb173 .hb span,.wb173r .hb span{position:absolute;inset:0;display:grid;place-items:center;font-size:12px;font-weight:900;text-shadow:1px 1px 0 #000}#wb173 .hb.big{height:28px}#wb173 .hb.dead i{background:#3a3a3a}
 #wb173 .st{display:flex;flex-wrap:wrap;gap:4px 12px;font-size:12px;color:#d8c0b8}#wb173 .st b{color:#ffe79a}#wb173 .tip{margin:0;font-size:11.5px;color:#c8b0a8;line-height:1.6}#wb173 .tip b{color:#ffe79a}
 #wb173 .two{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:8px}#wb173 .tr{position:relative;display:grid;grid-template-columns:28px 1fr auto;gap:6px;align-items:center;padding:5px 8px;border-radius:9px;background:#1a0a0a;margin-bottom:3px;overflow:hidden}
 #wb173 .tr i{font-style:normal;text-align:center;font-weight:900}#wb173 .tr b{font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#wb173 .tr span{font-weight:900;color:#ffb08a;font-size:12.5px}
 #wb173 .tr u{position:absolute;left:0;bottom:0;right:0;height:2px}#wb173 .tr u em{display:block;height:100%;background:#ff5a3a}
 .emb{display:inline-grid;place-items:center;width:22px;height:22px;margin-right:5px;border-radius:7px;background:radial-gradient(circle at 40% 30%,color-mix(in srgb,var(--c) 60%,#fff),var(--c));box-shadow:0 0 0 2px #000,0 0 8px color-mix(in srgb,var(--c) 60%,transparent);font-size:13px;vertical-align:middle}
 .emb.big{width:52px;height:52px;border-radius:14px;font-size:28px;flex:none;margin:0}
 #gd173 .bd{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}#gd173 .msg{min-height:16px;text-align:center;font-size:12.5px;color:#ffe79a;font-weight:800}
 #gd173 .bar,#gd173 .row,#gd173 .ac,#gd173 .ci{display:flex;gap:6px;align-items:center;flex-wrap:wrap}#gd173 input{font:inherit;font-size:13px;padding:7px 9px;border-radius:9px;border:1px solid #5a8aff66;background:#060a14;color:#fff;min-width:0}
 #gd173 .bar input{flex:1}#gd173 .bar button:not(.go),#gd173 .ac button:not(.go){font:inherit;font-weight:900;font-size:12px;padding:8px 10px;border-radius:9px;border:0;background:#1e2a40;color:#c8dcff;cursor:pointer}
 #gd173 .tip{font-size:11.5px;color:#a8b8d0;line-height:1.6}#gd173 .tip b{color:#ffe79a}#gd173 .gl{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:7px}
 #gd173 .gi{display:flex;gap:10px;align-items:center;padding:8px 10px;border-radius:12px;background:#101828;border:1px solid #ffffff14}#gd173 .gi>div{flex:1;min-width:0}#gd173 .gi b{font-size:14px}#gd173 .gi em,#gd173 .gh em{font-style:normal;font-size:11px;color:#ffe79a;margin-left:4px}
 #gd173 .gi small{display:block;font-size:10.5px;color:#a8b8d0}#gd173 .gi p{margin:2px 0 0;font-size:11.5px;color:#c8d4e8}#gd173 .gi button{font:inherit;font-weight:900;font-size:12px;padding:7px 12px;border-radius:9px;border:0;cursor:pointer;background:linear-gradient(180deg,#a8c8ff,#3a6aff);color:#fff}
 #gd173 .mk .pre{display:flex;gap:10px;align-items:center}#gd173 .mk .pre>div{flex:1;display:flex;flex-direction:column;gap:6px}#gd173 .pk{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px}
 #gd173 .pk button{width:36px;height:36px;border-radius:9px;border:2px solid #ffffff1c;background:#101828;font-size:18px;cursor:pointer}#gd173 .pk button.on{border-color:#fff;box-shadow:0 0 10px #fff8}#gd173 .pk button.col{width:28px;height:28px;border-radius:50%}
 #gd173 .tg{display:flex;gap:6px;align-items:center;font-size:12.5px;margin:6px 0}
 #gd173 .gh{display:flex;gap:12px;align-items:center;padding:10px;border-radius:14px;background:#0f1828;border:1px solid #5a8aff44}#gd173 .gh>div{flex:1;min-width:0}#gd173 .gh b{font-size:18px}#gd173 .gh small{display:block;font-size:11px;color:#a8b8d0}#gd173 .gh p{margin:2px 0;font-size:12px;color:#c8d4e8}
 #gd173 .gh u{display:block;height:7px;margin:4px 0 2px;border-radius:4px;background:#05080e;overflow:hidden}#gd173 .gh u i{display:block;height:100%;background:linear-gradient(90deg,#5a8aff,#ffd166)}
 #gd173 .tabs{display:flex;gap:4px;margin:8px 0}#gd173 .tabs button{font:inherit;font-weight:900;font-size:12.5px;padding:7px 10px;border-radius:10px;border:1px solid #ffffff1c;background:#101828;color:#c8dcff;cursor:pointer}#gd173 .tabs button.on{background:#c8dcff;color:#0a1428}
 #gd173 .gb{flex:1;min-height:0;overflow:auto}#gd173 .ml{display:flex;flex-direction:column;gap:3px}#gd173 .mi{display:flex;align-items:center;gap:8px;padding:6px 9px;border-radius:9px;background:#101828;flex-wrap:wrap}#gd173 .mi.me{border:1px solid #ffd16688}
 #gd173 .mi b{font-size:13px}#gd173 .mi small{flex:1;font-size:11px;color:#a8b8d0}#gd173 .mi button{font:inherit;font-weight:800;font-size:11px;padding:4px 8px;border-radius:7px;border:0;background:#1e2a40;color:#c8dcff;cursor:pointer}
 #gd173 .dot{width:8px;height:8px;border-radius:50%;background:#4a5468}#gd173 .dot.on{background:#7dffa8;box-shadow:0 0 6px #7dffa8}
 #gd173 .ch{display:flex;flex-direction:column;height:100%;min-height:260px}#gd173 .cl{flex:1;overflow:auto;display:flex;flex-direction:column;gap:5px;padding:4px}#gd173 .cm{max-width:75%;padding:6px 9px;border-radius:10px;background:#16223a;align-self:flex-start}#gd173 .cm.me{align-self:flex-end;background:#2a3a6a}
 #gd173 .cm b{font-size:11px;color:#ffe79a}#gd173 .cm p{margin:2px 0;font-size:13px;word-break:break-all}#gd173 .cm small{font-size:9.5px;color:#8a98b0}#gd173 .ci{margin-top:6px}#gd173 .ci input{flex:1}
 #gd173 .act{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px}#gd173 .cd{padding:10px;border-radius:12px;background:#101828}#gd173 .cd p{margin:0 0 8px;font-size:12px;color:#c8d4e8}#gd173 .cd small{display:block;margin-top:6px;font-size:11px;color:#a8b8d0}#gd173 .don{width:120px}
 #gd173 .set p{font-size:12px;color:#c8d4e8}#gd173 .edsc{width:100%;box-sizing:border-box;margin-bottom:6px}#gd173 .lv{font:inherit;font-weight:900;font-size:13px;padding:8px 14px;border-radius:10px;border:0;background:#3a1414;color:#ffb0a0;cursor:pointer}
 .wb173r{display:flex;flex-direction:column;gap:8px;align-items:stretch;min-width:260px}.wb173r>b{font-size:20px;text-align:center;color:#ffd0c0}.wb173r .dm{text-align:center;font-size:15px}.wb173r .dm b{font-size:24px;color:#ffe79a}.wb173r .dm em{font-style:normal;color:#7dffa8;font-size:12px}
 .wb173r .kl{text-align:center;padding:6px;border-radius:10px;background:#3a2a0a;color:#ffe79a;font-weight:900}.wb173r .er{text-align:center;color:#ff9aaa}.wb173r small{text-align:center;opacity:.8}
 @media (max-width:700px){#wb173 .top{grid-template-columns:1fr;justify-items:center}#wb173 .two{grid-template-columns:1fr}#gd173 .gl{grid-template-columns:1fr}}
 html.lpL #wb173 .pn,html.lpL #gd173 .pn{padding:8px 10px}html.lpL #wb173 .bv{width:210px;height:140px}`;document.head.appendChild(st);
 window.WG173={openWB,closeWB,openGD,closeGD,WB,GV,wbInfo,wbFight};
}catch(e){console.error('v173 worldboss guild',e)}})();
