/* ================= v85 듀오 모드 (DUO85) — 2인 협동 탑 =================
   로비 「탑 오르기」 → 솔로 / 듀오 고르기.
   듀오: 방 만들기(시작 층 · 난이도를 먼저 정함 → 만든 사람이 방장) / 방 목록 / 4자리 방 코드로 들어가기.
     시작 층까지 올라가 본 사람만 들어올 수 있다(서버도 확인). 둘이 모이면 방장이 「시작」.
   통신: 서버 /api/duo/sync를 0.1초마다(보낼 것 올리고 받을 것 받음, 서버는 전달만).
   잡몹 층: 방장의 게임이 잡몹을 움직이고(가까운 사람을 노림) 0.1초마다 화면 상태(잡몹 · 탄 · 장판 · 웅덩이)를 보냄.
     게스트는 받은 상태를 부드럽게 따라 그리고, 자기 몸에 닿는 공격만 직접 판정. 게스트가 때린 것은 방장에게 보내 방장이 깎음.
     문(계단)은 둘 중 누가 들어가도 함께 다음 층.
   보스 층: 둘 다 같은 보스와 싸움(각자 화면에서 피하고 반격). 보스 체력 ×1.8을 함께 깎음(서로 깎은 만큼 보내 줌).
   쓰러짐: 동료가 살아 있으면 「쓰러짐」으로 구경하다가 층을 깨면 체력 30%로 다시 일어남. 둘 다 쓰러지면 실패. */
(()=>{try{
 const $=id=>document.getElementById(id);
 const acc=()=>(window.ACCT55&&ACCT55.get())||{};
 const base=()=>(acc().url||'https://capsule-quest-leaderboard.onrender.com').replace(/\/+$/,'');
 async function api(path,method,body){const h={'Content-Type':'application/json'};const a=acc();if(a.token)h.Authorization='Bearer '+a.token;
  const ac=window.AbortController?new AbortController():null,tm=ac?setTimeout(()=>ac.abort(),7000):0;
  try{const r=await fetch(base()+path,{method:method||'GET',headers:h,body:body?JSON.stringify(body):undefined,signal:ac?ac.signal:undefined});clearTimeout(tm);let j={};try{j=await r.json()}catch(e){}return {s:r.status,j}}catch(e){return {s:0,j:{error:'서버에 연결할 수 없어요'}}}}
 const D={on:false,code:null,role:null,room:null,since:0,out:[],busy:false,started:false,mate:{},bAcc:0,down:false,lastSnap:null,dead:new Map(),killed:new Map(),bypass:false};
 const best=()=>Math.max(1,(saveData.tw71&&saveData.tw71.best)||1);
 const myCh=()=>{try{return shopInv().eq.ch||0}catch(e){return 0}};
 const myLv=()=>{try{return LV83.get().lv}catch(e){return 1}};
 const T=()=>window.TW71&&TW71.T;
 const r1=v=>Math.round(v*10)/10;
 function send(m){if(D.on)D.out.push(m)}
 /* v88: 내 화면에서 일어난 일을 그 순간의 시각과 함께 적어 두었다가 위치와 같이 보냄 → 동료 화면에서 같은 순간에 재생 */
 D.ev=[];let evN=0;const ES={};
 function evPush(k,o){D.ev.push(Object.assign({e:++evN,k,t:Math.round(performance.now())},o));if(D.ev.length>60)D.ev.shift()}
 function watchMe(){if(!D.started||!(mode==='tower'||mode==='boss'))return;
  if(P.lungeT&&P.lungeT!==ES.l){ES.l=P.lungeT;evPush('a',Object.assign({a:r1(P.lungeA||0),d:P.lungeDur||130},D.atkX||{}));D.atkX=null}
  if(P.dash&&P.dash.t0!==ES.d){ES.d=P.dash.t0;evPush('d',{vx:Math.sign(P.dash.vx||0),vy:Math.sign(P.dash.vy||0),dur:P.dash.dur||150})}
  if(P.parryT&&P.parryT!==ES.p){ES.p=P.parryT;evPush('p',{g:P.parryPerf?1:0})}
  /* 궁극기: 종류 · 세트 · 위치 · 타격 시각을 통째로 보내서 동료 화면에서 같은 연출을 재생 */
  try{const t=T(),sp=mode==='tower'?(t&&t.U&&t.U.sp):(G&&G.sp);if(sp&&sp.t0!==ES.u){ES.u=sp.t0;const hits=(mode==='tower'?t.U.hits:sp.hits)||[];
   evPush('U',Object.assign({sp:{type:sp.type,set:sp.set||null,dur:sp.dur,name:sp.name,col:sp.col,cx:r1(sp.cx),cy:r1(sp.cy),hits}},D.ultX||{}));D.ultX=null}}catch(e){}
  if(ES.hp!=null&&P.hp<ES.hp&&!P.downDuo)evPush('h',{});ES.hp=P.hp}

 /* ---------- 0.1초마다 주고받기 ---------- */
 async function tick(){if(!D.on||(D.fly||0)>=3)return;D.fly=(D.fly||0)+1;try{
  const t=T();
  const ev=D.ev.splice(0,30);
  const ex={n:(D.pn=(D.pn||0)+1),ts:Math.round(performance.now()),wp:(()=>{try{return shopInv().eq.wp||0}catch(e){return 0}})(),sk:(()=>{try{return SKIN58.get()||''}catch(e){return ''}})(),
   ffx:r1((P.face&&P.face.x)||0),ffy:r1((P.face&&P.face.y)||1),ev,pl:(mode==='boss'?'b':'t')+((t&&t.f)||0)+(D.plX||'')};
  if(D.started&&typeof mode!=='undefined'){
   if(mode==='tower'&&t&&t.duo){send({...ex,t:'p',x:r1(P.x),y:r1(P.y),fx:P.face&&P.face.x<0?-1:1,lt:P.lungeT?Math.round(performance.now()-P.lungeT):9999,hp:P.hp,mx:P.maxhp,ch:myCh(),down:!!P.downDuo,w:!!P.walkOn});
    if(D.role==='host'&&!(window.PVP92&&PVP92.on()))send(snap())}
   else if(mode==='boss'&&typeof G!=='undefined'&&G&&G.tw71&&G.duo){const d=Math.round(D.bAcc);D.bAcc-=d;send({...ex,t:'b',x:r1(P.x),y:r1(P.y),fx:P.face&&P.face.x<0?-1:1,hp:P.hp,mx:P.maxhp,ch:myCh(),down:!!P.downDuo,d,lt:P.lungeT?Math.round(performance.now()-P.lungeT):9999});if(D.role==='host')send({t:'bh',hp:Math.round(G.hp)})}}
  const msgs=D.out.splice(0,20),code=D.code;
  const r=await api('/api/duo/sync','POST',{code:D.code,since:D.since,msgs,ch:myCh(),start:D.wantStart&&!D.started?1:0,diff:D.wantDiff||undefined,ready:D.wantReady==null?undefined:(D.wantReady?1:0)});
  if(!D.on||D.code!==code)return;/* 기다리는 사이에 방을 나갔으면 늦게 온 답은 버림(안 그러면 나간 판이 다시 시작됨) */
  if(r.s===404||r.s===403){const was=D.started;end('방이 사라졌어요.');if(!was){msgTx='방이 사라졌어요. 다시 만들어 주세요.';openUI('duo');loadRooms()}return}
  if(r.s!==200){D.fail=(D.fail||0)+1;if(D.wantStart&&!D.started&&D.fail>=3){msgTx='서버 응답을 기다리는 중… ('+(r.s?'오류 '+r.s:'연결 안 됨')+') 계속 시도해요';renderRoom()}return}
  D.fail=0;D.room=r.j.room;{const mp=(D.room.players||[]).find(p=>p.me);if(mp&&D.wantReady!=null&&!!mp.ready===!!D.wantReady)D.wantReady=null}if(D.wantDiff&&D.room.diff===D.wantDiff)D.wantDiff=null;
  if(D.wantStart&&!D.started&&D.room.state!=='play'){const n=(D.room.players||[]).length;if(r.j.start_err)msgTx=r.j.start_err;else if(n<2)msgTx='동료가 방에 없어요. 동료를 기다려 주세요.';if(n<2)D.wantStart=false}
  if(D.room.state==='play')D.wantStart=false;
  /* 여러 답이 겹쳐 와도 메시지는 한 번씩만, 방장 화면(s)은 가장 새 것만 */
  const fresh=(r.j.msgs||[]).filter(x=>x.seq>D.since);let lastS=null;for(const x of fresh)if(x.m&&x.m.t==='s')lastS=x;
  for(const x of fresh){D.since=Math.max(D.since,x.seq);if(x.m&&x.m.t==='s'&&x!==lastS)continue;try{onMsg(x.m)}catch(e){console.error('duo msg',e)}if(!D.on)return}
  if(!D.on)return;
  D.since=Math.max(D.since,r.j.seq||0);
  if(!D.started&&D.room.state==='play')begin();
  if(!D.started)renderRoom();
  if(D.started&&D.room.state==='closed'){mateLeft('방이 닫혔어요. 혼자 계속해요.');return}
  if(D.started){const mp=(D.room.players||[]).find(p=>!p.me);if(!mp){mateLeft('동료가 나갔어요. 혼자 계속해요.');return}
   if(mp.online)D.mateOff=0;else if(!D.mateOff)D.mateOff=performance.now();else if(performance.now()-D.mateOff>20000){mateLeft('동료와 연결이 끊겼어요. 혼자 계속해요.');return}}
 }finally{D.fly=Math.max(0,(D.fly||1)-1)}}
 setInterval(()=>{try{tick()}catch(e){}},100);

 /* ---------- 받은 메시지 ---------- */
 function onMsg(m){const t=T();
  switch(m.t){
   case 'join':renderRoom();try{sfx(880,.12,'triangle',.04,1320)}catch(e){}break;
   case 'leave':if(D.started&&window.PVP92&&PVP92.on()){PVP92.oppLeft();break}if(D.started)mateLeft((m.name||'동료')+'님이 나갔어요. 혼자 계속해요.');else renderRoom();break;
   case 'p':mateIn(m);if(t&&t.duo)t.duo.mate=D.mate;break;
   case 's':if(D.role==='guest')applySnap(m);break;
   case 'h':if(D.role==='host'&&t){const mo=t.mobs.find(q=>q.id===m.id&&q.hp>0);if(mo){if(m.sh)mo.sh=Math.max(0,(mo.sh||0)-m.sh);if(mo.sh<=0&&m.sh&&mo.shMax&&!mo.shRegen){mo.stunT=t.clk+.9;mo.shRegen=t.clk+8}mo.hp-=m.d;mo.hitT=t.clk;try{if(m.d>0){TW71.addPop(mo.x+(Math.random()-.5)*8,mo.y-16,'-'+m.d,'#8de4ff');TW71.burst(mo.x,mo.y-6,5,'#8de4ff',110)}else if(m.sh)TW71.addPop(mo.x,mo.y-16,'방패 -'+m.sh,'#8dcdf5')}catch(e){}if(mo.hp<=0)TW71.kill(mo)}}break;
   case 'sd':if(D.role==='host'&&t){const s=t.shots.find(q=>q.id===m.id);if(s)s.dead=1}break;
   case 'door':if(D.role==='host'&&t&&t.clear&&mode==='tower')TW71.nextFloor();break;
   case 'f':if(D.role==='guest')goFloor(m.f);break;
   case 'b':mateIn(m);if(m.d>0&&typeof G!=='undefined'&&G&&G.tw71&&['play','count','wake'].includes(G.state)){G.hp=Math.max(0,G.hp-m.d);G._dp=G.hp;try{G.pops.push({x:G.boss.x+(Math.random()-.5)*30,y:G.boss.y-30,t:performance.now(),tx:'동료 -'+m.d,col:'#8de4ff'});const now=performance.now(),bx=G.boss.x+(Math.random()-.5)*20,by=G.boss.y-14+(Math.random()-.5)*16;fxRing(bx,by,now,240,18+Math.min(16,m.d/40),'#8de4ff');G.slashFx&&G.slashFx.push({x:bx,y:by,a:Math.random()*6.28,t:now,dur:200,col:'#8de4ff',r:16})}catch(e){}if(G.hp<=0)try{startDying(performance.now())}catch(e){}}break;
   case 'bh':if(D.role==='guest'&&typeof G!=='undefined'&&G&&G.duo&&G._duo85&&G.state==='play'&&m.hp<G.hp){G.hp=m.hp;G._dp=G.hp;if(G.hp<=0)try{startDying(performance.now())}catch(e){}}break;
   case 'next':if(D.role==='guest'){$('overlay').hidden=true;startTower(m.f)}break;
   default:try{window.PVP92&&PVP92.msg(m)}catch(e){console.error('pvp msg',e)}break;
   case 'fail':if(mode==='boss'){if(P.downDuo)bossLose();else{D.mate=Object.assign(D.mate||{},{down:true,hp:0});note('동료가 쓰러졌어요 · 혼자 버텨요!')}}else failBoth();break;
  }}
 function note(tx){try{banner(tx)}catch(e){}}

 /* ---------- 방장: 화면 상태 묶기 ---------- */
 function snap(){const t=T(),c=t.clk;const id=(o,k)=>o[k]||(o[k]=(t['_'+k]=(t['_'+k]||0)+1));
  return {t:'s',f:t.f,clk:r1(c),clear:t.clear?1:0,door:r1(t.doorK||0),total:t.total||0,q:(t.queue||[]).length,
   mobs:t.mobs.map(m=>[m.id,m.sp,r1(m.x),r1(m.y),Math.round(m.hp),m.max,m.elite?1:0,m.s,r1(m.born),m.bornMax,m.st,r1(m.st0-c),m.hitPose==null?null:r1(m.hitPose-c),m.face,r1(m.stunT-c),m.sh||0,m.shMax||0,m.bubble?1:0,r1(m.hitT-c),r1(m.vx),r1(m.vy),m.kbA==null?null:r1(m.kbA),r1(m.seed),m.dieT==null?null:r1(m.dieT-c)]),
   shots:t.shots.filter(s=>!s.dead).map(s=>[id(s,'id'),r1(s.x),r1(s.y),r1(s.vx),r1(s.vy),s.r,s.col,s.kind,s.mine?1:0,s.poison?1:0,s.web?1:0,r1(s.t-c),s.home||0,s.dmg||6]),
   tels:t.tels.map(z=>[id(z,'id'),z.k,r1(z.x),r1(z.y),z.r||0,z.a==null?null:r1(z.a),z.len||0,z.w||0,z.t0==null?null:r1(z.t0-c),r1((z.t1||0)-c),r1((z.t2||0)-c),z.dmg||0,z.warn?1:0,z.drain?1:0,z.arc==null?null:r1(z.arc),z.col||null,z.splash?1:0,z.boom?1:0]),
   pools:(t.pools||[]).map(q=>[r1(q.x),r1(q.y),q.r,r1(q.t0-c),r1(q.t1-c)]),
   waves:(t.waves||[]).map(w=>[id(w,'id'),r1(w.x),r1(w.y),w.r,w.max,r1(w.t0-c),w.dmg,w.col])}}
 /* ---------- 게스트: 받은 상태 반영 ---------- */
 function applySnap(s){const t=T();if(!t||mode!=='tower'||s.f!==t.f||t.bossCard)return;const c0=t.clk,now=performance.now(),seen=new Set();
  /* 방장 시계 맞추기: 가장 빨리 도착한 화면 기준(층이 바뀌면 다시) */
  const o=s.clk-now/1000;if(D.hF!==s.f||D.hOff==null||o>D.hOff)D.hOff=o;else D.hOff-=.0005;D.hF=s.f;D.hDly=lagOf(D.hJ||(D.hJ=[]),D.hOff-o,0);
  /* 몬스터를 늦게 그리는 만큼 탄 · 공격 예고 시각도 같이 늦춰서 서로 맞게 */
  const sh=Math.max(0,(D.hDly||0)-(D.hOff-o)),c=c0+sh;
  for(const a of s.mobs){const [id,sp,x,y,hp,max,el,sc,born,bornMax,st,st0,hp0,face,stun,sh,shMax,bub,hitT,vx,vy,kbA,seed,dieT]=a;seen.add(id);
   if(D.killed.has(id)&&now-D.killed.get(id)<1500)continue;let m=t.mobs.find(q=>q.id===id);
   if(!m){m={id,sp,x,y,tx:x,ty:y,hp,max,elite:!!el,s:sc,born,bornMax,st,st0:st0+c,face,stunT:stun+c,sh,shMax,bubble:!!bub,hitT:hitT+c,vx,vy,seed,cd:9,ang:0};t.mobs.push(m)}
   Object.assign(m,{tx:x,ty:y,max,elite:!!el,s:sc,born,bornMax,st,st0:st0+c,hitPose:hp0==null?null:hp0+c,face,stunT:stun+c,sh,shMax,bubble:!!bub,vx,vy,seed});
   if(m.hp>0&&hp<m.hp-.5&&hp>0)try{TW71.addPop(m.x+(Math.random()-.5)*8,m.y-16,'-'+Math.round(m.hp-hp),'#8de4ff')}catch(e){}
   m.p0=m.p1||{x,y,c:s.clk};m.p1={x,y,c:s.clk};
   if(hp<m.hp||m.hp<=0&&hp>0)m.hp=hp;else m.hp=Math.min(m.hp,hp);if(hitT+c>(m.hitT||-9))m.hitT=hitT+c;if(kbA!=null)m.kbA=kbA;if(dieT!=null){m.hp=0;m.dieT=m.dieT==null?dieT+c:m.dieT}}
  for(const m of t.mobs)if(!seen.has(m.id)&&m.hp>0){m.hp=0;m.dieT=c0}
  t.mobs=t.mobs.filter(m=>m.hp>0||c0-(m.dieT||0)<.35);
  const ns=[];for(const a of s.shots){const [id,x,y,vx,vy,r,col,kind,mine,poison,web,ts,home,dmg]=a;if(D.dead.has(id))continue;let o=t.shots.find(q=>q.id===id);if(!o)o={id};Object.assign(o,{x:x-vx*sh,y:y-vy*sh,vx,vy,r,col,kind,mine:!!mine,poison:!!poison,web:!!web,t:ts+c,home,dmg:dmg||6});ns.push(o)}t.shots=ns;
  const nz=[];for(const a of s.tels){const [id,k,x,y,r,an,len,w,t0,t1,t2,dmg,warn,drain,arc,col,splash,boom]=a;let o=t.tels.find(q=>q.id===id);if(!o)o={id};Object.assign(o,{k,x,y,r,a:an,len,w,t0:t0==null?undefined:t0+c,t1:t1+c,t2:t2+c,dmg,warn:!!warn,drain:!!drain,arc:arc==null?undefined:arc,col:col||undefined,splash:!!splash,boom:!!boom});nz.push(o)}t.tels=nz;
  t.pools=s.pools.map(([x,y,r,t0,t1])=>({x,y,r,t0:t0+c,t1:t1+c}));
  const nw=[];for(const a of s.waves){const [id,x,y,r,max,t0,dmg,col]=a;let o=(t.waves||[]).find(q=>q.id===id);if(!o)o={id};Object.assign(o,{x,y,r,max,t0:t0+c,dmg,col});nw.push(o)}t.waves=nw;
  if(s.clear&&!t.clear){t.clear=true;t.clearT=c0;try{TW71.addPop(AX+AW/2,AY+60,'FLOOR CLEAR!','#a6f5c6')}catch(e){}}t.doorK=s.door;t.total=s.total;t.queue=new Array(s.q).fill(null)}
 function guestMobs(dt){const t=T(),rc=performance.now()/1000+(D.hOff||0)-(D.hDly||.16);for(const m of t.mobs){if(m.hp<=0)continue;
   /* v86: 받은 두 화면 사이를 시간에 맞춰 이어 그림(0.16초 늦게) — 뚝뚝 끊기지 않게 */
   if(m.p1&&m.p0&&m.p1.c>m.p0.c){const k=Math.max(0,Math.min(1.4,(rc-m.p0.c)/(m.p1.c-m.p0.c))),gx=m.p0.x+(m.p1.x-m.p0.x)*k,gy=m.p0.y+(m.p1.y-m.p0.y)*k;m.x+=(gx-m.x)*Math.min(1,dt*20);m.y+=(gy-m.y)*Math.min(1,dt*20)}
   else if(m.tx!=null){m.x+=(m.tx-m.x)*Math.min(1,dt*12);m.y+=(m.ty-m.y)*Math.min(1,dt*12)}if(m.born>0){m.born-=dt;continue}
   const stun=t.clk<m.stunT+1.1,r=((TW71.SP[m.sp]||{}).r||7)*m.s;if(!stun&&!['archer','mage','drone','wisp','wraith'].includes(m.sp)&&Math.hypot(m.x-P.x,m.y-(P.y-6))<r+6)TW71.hurt(m.sp==='boar'&&m.st==='run'?12:m.sp==='golem'?10:m.sp==='gear'?9:6)}}
 function hitSent(m,d,sh){if(!m||!m.id)return;send({t:'h',id:m.id,d:Math.round(d),sh:sh||0});if(m.hp<=0)D.killed.set(m.id,performance.now())}

 /* ---------- 층 · 시작 ---------- */
 function startTower(f){const t=T();P.downDuo=false;TW71.start(f);const tt=T();tt.duo={role:D.role,mate:D.mate};}
 function goFloor(f){const t=T();if(!t)return;$('overlay').hidden=true;if(mode!=='tower'){startTower(f);return}
  if(P.downDuo)revive();t._doorSent=0;if(f%10===0){TW71.goBoss(f)}else{TW71.buildFloor(f);t.queue=[];try{$('bvTitle').textContent='BEAT BLADE · 탑 '+f+'F · 듀오'}catch(e){}}}
 function begin(){if(D.started)return;D.started=true;closeUI();if(D.room&&D.room.kind==='pvp'&&window.PVP92){PVP92.begin();return}const f=D.room.floor;try{if(D.room.diff&&D.room.diff!==diff){$('diffSel').value=D.room.diff;updDiff()}}catch(e){}
  startTower(f);note('듀오 시작! '+f+'F · 함께 올라가요');try{$('bvTitle').textContent='BEAT BLADE · 탑 '+f+'F · 듀오'}catch(e){}}
 function end(msg){const was=D.started;try{window.PVP92&&PVP92.reset()}catch(e){}D.plX='';if(D.code)api('/api/duo/leave','POST',{code:D.code});Object.assign(D,{on:false,code:null,role:null,room:null,started:false,since:0,out:[],mate:{},wantReady:null});
  const t=T();if(t)t.duo=null;if(typeof G!=='undefined'&&G)G.duo=null;const wasDown=P.downDuo;P.downDuo=false;if(P.inv>performance.now()+1e6)P.inv=0;D.mateOff=0;if(msg&&was)note(msg);closeUI();return wasDown}
 /* v86: 게임 중에 동료가 나가거나 연결이 끊김 → 방을 정리하고 혼자 계속. 내가 쓰러져 있었다면 그대로 쓰러짐 처리 */
 function mateLeft(msg){const wasDown=end(msg);if(!wasDown)return;const t=T(),now=performance.now();
  try{if(mode==='tower'&&t){if(t.clear){revive();return}t.dead=false;P.inv=0;P.hp=1;TW71.hurt(99999)}else if(mode==='boss'&&typeof G!=='undefined'&&G&&G.state==='play'){P.inv=0;P.hp=1;hurtP(99999,now)}}catch(e){console.error('duo mateLeft',e)}}
 {const f=TW71.start;TW71.start=function(){const t=T();if(t)t.duo=null;if(!D.started)P.downDuo=false;return f.apply(this,arguments)}}
 /* 로비로 나가면 방도 나감 */
 {const f=toLobby;toLobby=function(){try{if(D.on||D.started||D.code)end()}catch(e){}return f.apply(this,arguments)}}

 /* ---------- 쓰러짐 · 부활 ---------- */
 function mateAlive(){return D.mate&&!D.mate.down&&!(D.mate.hp!=null&&D.mate.hp<=0)&&performance.now()-(D.mate.at||0)<6000}
 function onDie(){const t=T();if(!t.duo)return false;if(window.PVP92&&PVP92.on())return PVP92.ko();if(mateAlive()){P.downDuo=true;P.hp=0;t.dead=true;send({t:'p',down:true,x:P.x,y:P.y,hp:0,mx:P.maxhp,ch:myCh()});note('쓰러졌어요 · 동료가 이 층을 깨면 다시 일어나요');return true}
  send({t:'fail'});setTimeout(failBoth,50);return true}
 function revive(){const t=T();P.downDuo=false;P.hp=Math.max(1,Math.round(P.maxhp*.3));if(t)t.dead=false;P.inv=performance.now()+1500;note('다시 일어났어요!')}
 /* v88 보스전에서 둘 다 쓰러짐 → 나도 보통처럼 쓰러져서 결과창(방장: 둘이 다시 도전)으로 */
 function bossLose(){try{if(typeof G==='undefined'||!G||!(G.state==='play'||G.state==='count'||G.state==='wake'))return;P.inv=0;P.downDuo=false;G.duo=null;D.failSent=1;hurtP(99999,performance.now())}catch(e){console.error('duo bossLose',e)}}
 let failing=false;
 function failBoth(){if(failing)return;failing=true;setTimeout(()=>failing=false,3000);const t=T(),f=t?t.f:1;try{stopMusic()}catch(e){}
  showOverlay('DUO · '+f+'F','둘 다 쓰러졌어요','<b>'+f+'F</b>에서 함께 쓰러졌어요. 방을 다시 만들어 도전할 수 있어요.',[['로비로',()=>{end();toLobby()},true]])}
 /* 탑: 쓰러진 사람은 층을 깨면 부활 */
 setInterval(()=>{try{const t=T();if(D.started&&mode==='tower'&&t&&t.duo&&P.downDuo&&t.clear)revive()}catch(e){}},200);
 /* 보스전: 마지막 한 대를 맞으면 쓰러짐(동료가 살아 있으면) */
 if(typeof hurtP==='function'){const f=hurtP;hurtP=function(dmg,now){try{if(mode==='boss'&&G&&G.duo&&!(now<P.inv)){const pred=Math.max(1,Math.round(dmg*1.6));/* 난이도 배율까지 넉넉히 잡아 「이번에 맞으면 쓰러짐」을 미리 봄 */
    if(P.downDuo)return;if(P.hp-pred<=0&&mateAlive()){P.downDuo=true;P.inv=now+1e9;P.hp=1;send({t:'b',down:true,x:P.x,y:P.y,hp:0,mx:P.maxhp,ch:myCh(),d:0});note('쓰러졌어요 · 동료가 보스를 쓰러뜨리면 함께 이겨요');return}}}catch(e){}return f.apply(this,arguments)}}
 {const f=doAttack;doAttack=function(){if(P.downDuo&&D.started)return;return f.apply(this,arguments)}}
 /* v88: 내가 쓰러져 기다리는데 동료가 살아 있지 않으면(쓰러짐 · 보통 죽음 · 6초 넘게 연결 없음) 바로 실패 — 체력 1 무적으로 남던 문제 */
 setInterval(()=>{try{if(!D.started||!P.downDuo||mateAlive())return;
  if(mode==='boss'&&G&&G.state==='play'){send({t:'fail'});bossLose()}
  else if(mode==='tower'){const t=T();if(t&&t.clear)return;send({t:'fail'});failBoth()}}catch(e){}},300);
 /* 보스전에서 내가 보통으로 쓰러지면(동료가 이미 쓰러진 상태) 동료에게 알림 */
 {const f=hurtP;hurtP=function(){const r=f.apply(this,arguments);try{if(D.started&&mode==='boss'&&P.hp<=0&&!P.downDuo&&!D.failSent){D.failSent=1;send({t:'fail'})}}catch(e){}return r}}

 /* ---------- 보스 층: 함께 깎기 ---------- */
 /* 내가 깎은 양 재기: 그리기와 상관없이 매 프레임(등장 장면 중에도) */
 function bossTrack(){if(!(D.started&&mode==='boss'&&typeof G!=='undefined'&&G&&G.tw71))return;if(!G.duo&&D.on){G.duo=1;G._dp=null}if(!G.duo)return;
  if(G!==D.lastG){D.lastG=G;D.failSent=0}
  if(G._tw75&&!G._duo85){G._duo85=1;G.hp=Math.round(G.hp*1.8);G.maxHp=Math.round(G.maxHp*1.8);G.hpShow=G.hp/G.maxHp;G._barLast=undefined;G._dp=G.hp}
  if(G._dp!=null&&G.hp<G._dp)D.bAcc+=G._dp-G.hp;G._dp=G.hp}
 {const f=frame;frame=function(){const r=f.apply(this,arguments);try{bossTrack()}catch(e){}try{watchMe()}catch(e){}try{downBanner()}catch(e){}return r}}
 {const f=drawScene;drawScene=function(now){const r=f.apply(this,arguments);try{if(D.started&&mode==='boss'&&G&&G.duo)drawMate(now,true)}catch(e){}return r}}
 /* 쓰러져 있는 동안 화면 가운데 안내 */
 function downBanner(){if(!D.started||!P.downDuo||!(mode==='tower'||mode==='boss'))return;ctx.save();try{ctx.setTransform(SS,0,0,SS,0,0)}catch(e){}
  const y=AY+AH/2-14,a=.75+.2*Math.sin(performance.now()/300);ctx.globalAlpha=.7;ctx.fillStyle='#05070a';ctx.fillRect(W/2-120,y,240,30);ctx.globalAlpha=a;ctx.fillStyle='#ff8a9a';ctx.font='900 11px sans-serif';ctx.textAlign='center';
  ctx.fillText('💤 쓰러졌어요',W/2,y+13);ctx.fillStyle='#cfe8f0';ctx.font='800 8px sans-serif';ctx.fillText(mode==='boss'?'동료가 보스를 쓰러뜨리면 함께 이겨요':'동료가 이 층을 깨면 다시 일어나요',W/2,y+25);ctx.restore()}
 /* v88 일시정지: 듀오에서는 게임을 멈추지 않고(동료는 계속 싸우니까) 작은 창만 띄움 — 뒤 화면은 계속 움직임 */
 const pz=document.createElement('div');pz.id='duoPz';pz.hidden=true;pz.innerHTML='<b>⏸ 듀오 중에는 게임이 멈추지 않아요</b><small>동료는 계속 싸우고 있어요</small><div><button id="dpGo">계속하기</button><button id="dpOut">방 나가기 · 로비로</button></div>';document.body.appendChild(pz);
 pz.querySelector('#dpGo').onclick=()=>{pz.hidden=true};pz.querySelector('#dpOut').onclick=()=>{pz.hidden=true;end();toLobby()};
 {const f=pause;pause=function(){if(D.started&&D.on&&(mode==='tower'||mode==='boss')){if(paused)return f.apply(this,arguments);pz.hidden=!pz.hidden;return}return f.apply(this,arguments)}}
 setInterval(()=>{if(!pz.hidden&&!(D.started&&(mode==='tower'||mode==='boss')))pz.hidden=true},500);
 /* 보스 결과창 단추: 방장만 다음 층을 연다 */
 function bossButtons(f,retry){if(D.role==='host')return [[(retry?'↺ 다시 도전 (둘이 함께)':'▲ '+f+'F 함께 오르기'),()=>{send({t:'next',f});$('overlay').hidden=true;startTower(f)},true],['방 나가기',()=>{end();toLobby()},false]];
  return [['⏳ 방장이 '+(retry?'다시 도전':'다음 층')+'을 누르면 함께 가요',()=>{},true],['방 나가기',()=>{end();toLobby()},false]]}

 /* ---------- 동료 그리기 ---------- */
 /* v86 동료 위치: 보낸 시각(ts)을 내 시계로 옮겨 시간표에 쌓고, 0.16초 늦게 두 점 사이를 이어 그린다 */
 function mateIn(m){const now=performance.now(),M=D.mate||(D.mate={});
  if(m.ts!=null){const o=now-m.ts;D.mOff=D.mOff==null||o<D.mOff?o:D.mOff+.5;D.mDly=lagOf(D.mJ||(D.mJ=[]),o-D.mOff,1)}
  if(m.n!=null&&M.n!=null&&m.n<=M.n&&!m.d){if(m.ev&&m.ev.length)mateEv(M,m.ev);return}/* 순서가 뒤바뀌어 온 옛 위치는 버림(사건은 살림) */
  const lt=m.ts!=null?m.ts+D.mOff:now;

  if(m.ev)mateEv(M,m.ev);if(m.pl&&m.pl!==M.pl){M.pl=m.pl;M.hs=[];M.sx=null;M.sy=null;M.tr=[];M.spawnT=lt}
  const hs=M.hs||[];hs.push({t:lt,x:m.x,y:m.y,fx:m.ffx,fy:m.ffy});while(hs.length>24)hs.shift();
  const ev0=m.ev;delete m.ev;Object.assign(M,m,{at:now,hs});m.ev=ev0}
 /* 늦게 도착하는 정도(가장 빨리 온 것 대비)를 모아 90%가 도착하는 만큼만 늦게 그림: 매끄럽게 + 너무 늦지 않게 */
 function lagOf(a,v,ms){a.push(v);if(a.length>40)a.shift();const q=a.slice().sort((x,y)=>x-y)[Math.floor(a.length*.9)];return ms?Math.max(110,Math.min(700,q+70)):Math.max(.11,Math.min(.7,q+.07))}
 const MDLY=()=>D.mDly||160;
 function mateEv(M,list){for(const e of list){if((M.seen||(M.seen=new Set())).has(e.e))continue;M.seen.add(e.e);if(M.seen.size>200)M.seen=new Set([...M.seen].slice(-100));
   (M.evs||(M.evs=[])).push(Object.assign({},e,{t:e.t+(D.mOff||0)}));if(M.evs.length>40)M.evs.shift();if(e.k==='U'&&e.sp)setTimeout(()=>note('동료 필살기! '+(e.sp.name||'')),MDLY())}}
 function matePos(now){const M=D.mate,hs=M.hs;if(!hs||!hs.length)return [M.x,M.y];const rt=now-MDLY();
  if(rt<=hs[0].t)return [hs[0].x,hs[0].y];
  for(let i=hs.length-1;i>0;i--){const a=hs[i-1],b=hs[i];if(rt>=a.t&&rt<=b.t){const k=b.t>a.t?(rt-a.t)/(b.t-a.t):1;M.cf=k<.5?a:b;return [a.x+(b.x-a.x)*k,a.y+(b.y-a.y)*k]}}
  const b=hs[hs.length-1],a=hs[hs.length-2];M.cf=b;if(a&&b.t>a.t){const k=Math.min(rt-b.t,120)/(b.t-a.t);return [b.x+(b.x-a.x)*k,b.y+(b.y-a.y)*k]}return [b.x,b.y]}
 /* v88: 동료를 「내 캐릭터 그리기」 그대로 그림 — 잠깐 내 값(P · 장비 · 스킨)을 동료 값으로 바꿔 그리고 되돌림.
    그래서 앞 · 옆 · 뒤 모습, 걷기, 스킨 연출, 검 휘두르기, 패링 자세가 내 화면에서 보이는 것과 같다. */
 const PK=['x','y','face','walkOn','walkT','lungeT','lungeA','lungeDur','parryT','parryPerf','parryUsed','dash','inv','hp','maxhp'];
 function asMate(m,st,fn){const inv=shopInv(),sv={},e0={ch:inv.eq.ch,wp:inv.eq.wp},g0=SKIN58.get,mo=window.__skinMotion,tr=window.__skinTrail,om=mode;for(const q of PK)sv[q]=P[q];
  try{Object.assign(P,st);inv.eq.ch=m.ch||0;inv.eq.wp=m.wp||0;const sk=m.sk&&SKIN58.byId(m.sk);SKIN58.get=()=>sk?sk.id:null;window.__skinMotion=sk?sk.motion:null;window.__skinTrail=sk?sk.trail:null;
   window.__mateDraw=1;if(mode==='tower')mode='village';fn()}
  catch(e){}finally{mode=om;window.__mateDraw=0;inv.eq.ch=e0.ch;inv.eq.wp=e0.wp;SKIN58.get=g0;window.__skinMotion=mo;window.__skinTrail=tr;for(const q of PK)P[q]=sv[q]}}
 /* 대시 잔상용 실루엣(캐릭터 · 스킨 · 방향별로 한 번만 만듦) */
 const GH={};
 function ghostOf(m,fl,col){const k=(m.ch||0)+'|'+(m.sk||'')+'|'+fl+'|'+col;if(GH[k])return GH[k];const cv=document.createElement('canvas');cv.width=64;cv.height=64;const o=cv.getContext('2d');o.imageSmoothingEnabled=false;
  asMate(m,{},()=>{try{drawKnight(o,20,22,2,fl,null,0)}catch(e){}});o.globalCompositeOperation='source-atop';o.fillStyle=col;o.globalAlpha=.75;o.fillRect(0,0,64,64);return GH[k]=cv}
 function drawMate(now,boss){const m=D.mate;if(!m||m.x==null||performance.now()-(m.at||0)>5000)return;const c=ctx,pn=performance.now(),rt=pn-MDLY();
  /* v88: 다른 층에 있는 동료는 그리지 않음(층을 오를 때 순간이동처럼 보이던 것) */
  {const t=T(),my=(mode==='boss'?'b':'t')+((t&&t.f)||0)+(D.plX||'');if(m.pl&&m.pl!==my)return;if(m.spawnT!=null&&rt<m.spawnT)return}
  const [gx,gy]=matePos(pn);m.sx=m.sx==null?gx:m.sx+(gx-m.sx)*.6;m.sy=m.sy==null?gy:m.sy+(gy-m.sy)*.6;const x=m.sx,y=m.sy;
  const mv=Math.hypot(gx-(m.px==null?gx:m.px),gy-(m.py==null?gy:m.py));m.wkT=mv>.15?pn:(m.wkT||0);m.px=gx;m.py=gy;const walk=pn-m.wkT<120;
  m.wph=(m.wph||0)+(walk?Math.min(.5,mv*.35):0);
  const cf=m.cf||{},fx=cf.fx!=null?cf.fx:(m.fx<0?-1:1),fy=cf.fy!=null?cf.fy:0;const fl=fx<0;
  /* 지금(늦게 그리는 시각) 일어나고 있는 사건 */
  let atk=null,dash=null,par=null,ult=null,hurt=null;for(const e of (m.evs||[])){const a=rt-e.t;if(a<0)continue;
   if((e.k==='a'||e.k==='u')&&a<(e.d||130)+60)atk=e;if(e.k==='d'&&a<(e.dur||150)+40)dash=e;if(e.k==='p'&&a<420)par=e;if(e.k==='U'&&e.sp&&a<e.sp.dur)ult=e;if(e.k==='h'&&a<160)hurt=e}
  const col=(()=>{try{const sk=m.sk&&SKIN58.byId(m.sk);return sk&&sk.trail&&sk.trail!=='rainbow'?sk.trail:sk&&sk.trail==='rainbow'?'hsl('+((pn/4)%360)+',100%,70%)':'#8de4ff'}catch(e){return '#8de4ff'}})();
  /* 대시: 잔상 + 속도선 */
  m.tr=(m.tr||[]).filter(q=>pn-q.t<260);if(dash&&(!m.tr.length||pn-m.tr[m.tr.length-1].t>28))m.tr.push({x,y,t:pn,fl});
  if(m.tr.length){const gc=col.startsWith('hsl')?'#ffffff':col;for(const q of m.tr){const a=1-(pn-q.t)/260;c.save();c.globalAlpha=a*.5;c.globalCompositeOperation='lighter';c.drawImage(ghostOf(m,q.fl,gc),q.x-32,q.y-41);c.restore()}}
  if(dash){const k=Math.min(1,(rt-dash.t)/(dash.dur||150)),an=Math.atan2(dash.vy||0,dash.vx||0);c.save();c.translate(x,y-9);c.rotate(an);c.fillStyle=col;for(let i=0;i<7;i++){c.globalAlpha=.55*(1-k);const off=(i-3)*4,len=14+((i*13)%10);c.fillRect(-len-10-((pn/3+i*9)%8),off,len,1)}c.restore()}
  c.save();c.globalAlpha=m.down?.3:.35;c.fillStyle='#000';c.beginPath();c.ellipse(x,y+2,9,3,0,0,6.28);c.fill();c.restore();
  /* 동료 표시: 발밑 하늘색 고리(같은 캐릭터여도 한눈에 구분) */
  const rc=window.PVP92&&PVP92.on()?'#ff5a7a':'#8de4ff';/* 결투 상대는 빨간 고리 */
  c.save();c.globalAlpha=.75;c.strokeStyle=rc;c.lineWidth=1.5;c.beginPath();c.ellipse(x,y+2,11,4,0,0,6.28);c.stroke();c.globalAlpha=.25+.15*Math.sin(pn/250);c.fillStyle=rc;c.beginPath();c.ellipse(x,y+2,11,4,0,0,6.28);c.fill();c.restore();
  /* 새 층에 나타날 때: 빛기둥 */
  if(m.spawnT!=null&&rt-m.spawnT<450){const q=(rt-m.spawnT)/450;c.save();c.globalCompositeOperation='lighter';c.globalAlpha=(1-q)*.8;c.fillStyle='#8de4ff';c.fillRect(x-6*(1-q)-2,y-60,12*(1-q)+4,62);c.globalAlpha=(1-q);c.strokeStyle='#ffffff';c.beginPath();c.ellipse(x,y+2,8+q*18,3+q*6,0,0,6.28);c.stroke();c.restore();if(q<.35)return}
  if(m.down)c.globalAlpha=.45;
  /* 공격 몸 앞으로 밀기(내 캐릭터와 같은 0.6배 반동) */
  let lx=0,ly=0;if(atk){const q=Math.min(1,(rt-atk.t)/(atk.d||130)),p=Math.sin(q*Math.PI)*4;lx=Math.cos(atk.a||0)*p;ly=Math.sin(atk.a||0)*p}
  const st={x,y,face:{x:fx,y:fy},walkOn:walk,walkT:m.wph,lungeT:atk?pn-(rt-atk.t):0,lungeA:atk?atk.a:0,lungeDur:atk?atk.d:130,parryT:par?pn-(rt-par.t):0,parryPerf:!!(par&&par.g),parryUsed:false,dash:null,inv:0,hp:m.hp||1,maxhp:m.mx||100};
  asMate(m,st,()=>{drawSword(x-12+lx,y-19+ly,2,fl,pn);drawKnight(ctx,x-12+lx,y-19+ly,2,fl,walk?m.wph:null,walk?null:pn/430)});
  c.globalAlpha=1;
  /* 휘두르기 베기 빛(무기 궤적 색) */
  if(atk&&atk.k==='a'){const q=(rt-atk.t)/220;if(q>=0&&q<=1){const a=atk.a||0,cx=x+Math.cos(a)*6,cy=y-9+Math.sin(a)*6;c.save();c.globalAlpha=(1-q)*.75;c.fillStyle=col;c.beginPath();c.arc(cx,cy,19,a-1.25+q*.5,a+1.25+q*.5);c.arc(cx,cy,12,a+1.05+q*.5,a-1.05+q*.5,true);c.closePath();c.fill();
   c.globalAlpha=(1-q);c.strokeStyle='#ffffff';c.lineWidth=1.5;c.beginPath();c.arc(cx,cy,19,a-1.1+q*.5,a+1.1+q*.5);c.stroke();c.restore()}}
  /* 패링: 방패 고리 */
  if(par){const q=(rt-par.t)/420;c.save();c.globalAlpha=(1-q)*.9;c.strokeStyle=par.g?'#ffe79a':'#9fe8ff';c.lineWidth=2;c.beginPath();c.arc(x+(fl?-7:7),y-10,8+q*10,0,6.28);c.stroke();c.restore()}
  /* 필살기: 내 궁극기와 같은 그리기(drawSpecialFX)로 재생 — 검 종류 · 현질 세트 연출 그대로 */
  if(ult){const a=rt-ult.t,sp=ult.spo||(ult.spo=Object.assign({},ult.sp,{done:[]}));sp.t0=pn-a;const hs=sp.hits||[];while(sp.done.length<hs.length&&a>=hs[sp.done.length])sp.done.push(pn-(a-hs[sp.done.length]));
   asMate(m,st,()=>{const og=(typeof G!=='undefined')?G:null;
    try{if(mode==='boss'&&og){const o=og.sp;og.sp=sp;try{drawSpecialFX(pn)}finally{og.sp=o}}
     else{G=Object.assign(Object.create(og||{}),{sp,ms:(og&&og.ms)||500,state:'play',B:BOSSES[0],boss:{x:sp.cx,y:sp.cy+26,slump:0},vuln:null,pops:[],parts:[],fxr:[],slashFx:[]});drawSpecialFX(pn)}}
    catch(e){}finally{G=og}})}
  /* 맞음: 빨간 번쩍 */
  if(hurt){c.save();c.globalAlpha=.55*(1-(rt-hurt.t)/160);c.fillStyle='#ff3a4a';c.beginPath();c.ellipse(x,y-10,12,15,0,0,6.28);c.fill();c.restore()}
  c.globalAlpha=1;const nm=(D.room&&(D.room.players.find(p=>!p.me)||{}).name)||'동료';c.save();c.font='900 7px sans-serif';c.textAlign='center';c.fillStyle='#000';c.fillText(nm,x+.5,y-37.5);c.fillStyle=m.down?'#ff8a9a':'#8de4ff';c.fillText(m.down?nm+' (쓰러짐)':nm,x,y-38);
  const q=Math.max(0,Math.min(1,(m.hp||0)/(m.mx||1)));c.fillStyle='#05070ae6';c.fillRect(x-12,y-35,24,4);c.fillStyle='#3a0a14';c.fillRect(x-11,y-34,22,2);c.fillStyle='#7dffa8';c.fillRect(x-11,y-34,22*q,2);c.restore()}
 function drawList(list,now){list.push({y:(D.mate&&D.mate.sy)||0,fn:()=>drawMate(now,false)})}
 /* 동료 칸(위 오른쪽): 이름 · 레벨 · 체력 */
 {const f=frame;frame=function(){const r=f.apply(this,arguments);try{const tt=T();if(!(window.PVP92&&PVP92.on())&&D.started&&D.on&&(mode==='tower'&&tt&&tt.duo||mode==='boss'&&typeof G!=='undefined'&&G&&G.tw71&&G.duo)){const m=D.mate||{},pl=(D.room&&D.room.players.find(p=>!p.me))||{};ctx.save();try{ctx.setTransform(SS,0,0,SS,0,0)}catch(e){}
   const x=W-118,y=AY+4;ctx.globalAlpha=.85;ctx.fillStyle='#05070a';ctx.fillRect(x,y,112,22);ctx.globalAlpha=1;ctx.fillStyle='#8de4ff';ctx.fillRect(x,y,2,22);ctx.font='900 8px sans-serif';ctx.fillStyle='#e8f8ff';ctx.fillText('🤝 '+(pl.name||'동료')+' · Lv.'+(pl.lv||1)+(m.down?' · 쓰러짐':''),x+6,y+9);
   const q=Math.max(0,Math.min(1,(m.hp||0)/(m.mx||1)));ctx.fillStyle='#3a0a14';ctx.fillRect(x+6,y+13,100,4);ctx.fillStyle=m.down?'#6a6a7a':'#7dffa8';ctx.fillRect(x+6,y+13,100*q,4);ctx.restore()}}catch(e){}return r}}

 /* ---------- 로비: 솔로 / 듀오 고르기 · 방 화면 ---------- */
 const box=document.createElement('div');box.id='duo85';box.hidden=true;document.body.appendChild(box);
 const esc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const DN={easy:'쉬움',normal:'보통',hard:'어려움',extreme:'익스트림'};
 let view='pick',rooms=[],listT=0,startF=null,msgTx='',lastH='';
 function openUI(v){view=v||'pick';box.hidden=false;lastH='';draw()}
 function closeUI(){box.hidden=true}
 /* v90: 고르기 · 방 만들기 · 방 화면을 게임처럼 — 움직이는 캐릭터 그림, 구역 색 층 고르기, 4칸 방 코드, 받침대 위 두 사람 */
 const ZP=()=>(window.TW71&&TW71.ZPAL)||[{n:'태엽',c:'#5affd8',b:'#3c4a5c',a:'#9fb3c8'}];
 const zpOf=f=>{const z=Math.floor((Math.max(1,f)-1)/10),Z=ZP();return Z[Math.floor((z%70)/10)]||Z[0]};
 const myLook=()=>{try{const sk=window.SKIN58&&SKIN58.get(),o=sk&&SKIN58.byId(sk);return o?o.idx:myCh()}catch(e){return myCh()}};
 const DFS=[['easy','🌱','쉬움',.6],['normal','⚔','보통',1],['hard','🔥','어려움',1.5],['extreme','💀','익스트림',2.2]];let mkDiff=null;
 const dfPick=(cur,attr)=>'<div class="dDiff">'+DFS.map(([k,ic,n,m])=>'<button '+attr+'="'+k+'" class="dDd dDf-'+k+(k===cur?' on':'')+'"><i>'+ic+'</i><b>'+n+'</b><small>보상 ×'+m+'</small></button>').join('')+'</div>';
 const dfBadge=d=>'<span class="dDf dDf-'+d+'">'+(DN[d]||d)+'</span>';
 function draw(){if(box.hidden)return;let h='';const B=best(),lv=myLv();
  const head=(ic,tt,sub,btn)=>'<div class="dHd"><div class="dTt"><i>'+ic+'</i><div><b>'+tt+'</b>'+(sub?'<small>'+sub+'</small>':'')+'</div></div>'+btn+'</div>';
  if(view==='pick')h='<div class="dP dPk">'+head('▲','탑 오르기','최고 '+B+'F · Lv.'+lv+' · 난이도 '+(DN[diff]||diff),'<button class="dX">닫기</button>')+
   '<div class="dPick"><button class="dCard" data-go="solo"><canvas class="dScn" data-scn="solo" width="200" height="120"></canvas><b>솔로</b><small>혼자 오르기 · 지금까지 하던 그대로</small><em>▶ 바로 시작</em></button>'+
   '<button class="dCard duo" data-go="duo"><canvas class="dScn" data-scn="duo" width="200" height="120"></canvas><b>듀오 <i class="dNew">CO-OP</i></b><small>둘이 함께 오르기 · 방을 만들거나 들어가기</small><em>🤝 방 만들기 · 들어가기</em></button>'+(window.PVP92?'<button class="dCard pvp" data-pvp="1"><canvas class="dScn" data-scn="vs" width="200" height="120"></canvas><b>결투 <i class="dNew pv">PvP</i></b><small>1:1 실력 승부 · 3판 2선승</small><em>⚔ 결투하러 가기</em></button>':'')+'</div></div>';
  else if(view==='duo'){const sf=Math.max(1,Math.min(startF||B,B)),zp=zpOf(sf),quick=[1];for(let f=11;f<=B;f+=10)quick.push(f);if(!quick.includes(B))quick.push(B);
   h='<div class="dP wide">'+head('🤝','듀오','방을 만든 사람이 방장 · 방장이 시작 층을 정해요','<button class="dBack">◀ 뒤로</button>')+'<div class="dCols">'+
    '<div class="dCol mk" style="--zc:'+zp.c+'"><h4>방 만들기</h4><canvas class="dScn dPrev" data-scn="prev" data-f="'+sf+'" width="240" height="86"></canvas>'+
     '<div class="dFl"><button class="dStep" data-df="-10">−10</button><button class="dStep" data-df="-1">−</button><div class="dFlN"><small>'+zp.n+' 구역</small><b>'+sf+'<i>F</i></b>'+(sf%10===0?'<em>BOSS</em>':'')+'</div><button class="dStep" data-df="1">+</button><button class="dStep" data-df="10">+10</button></div>'+
     '<input id="dF" type="range" min="1" max="'+B+'" value="'+sf+'"'+(B<=1?' disabled':'')+'>'+
     '<div class="dQuick">'+quick.slice(-8).map(f=>{const q=zpOf(f);return '<button data-f="'+f+'" style="--qc:'+q.c+'"'+(f===sf?' class="on"':'')+'>'+f+'F</button>'}).join('')+'</div>'+
     '<h5>난이도</h5>'+dfPick(mkDiff||diff,'data-dd')+'<div class="dInfo">'+dfBadge(mkDiff||diff)+' <b>'+sf+'F</b>부터 시작 · <b>'+sf+'F까지 올라가 본 사람</b>만 들어올 수 있어요</div><button class="dMain" id="dMake">🏰 방 만들기</button></div>'+
    '<div class="dCol"><h4>방 들어가기</h4><div class="dCode"><div class="dSlots"><input id="dC" maxlength="4" placeholder="····" autocapitalize="characters" spellcheck="false" autocomplete="off"></div><button id="dJoinC">들어가기 ▶</button></div>'+
     '<h5>열린 방 <span>'+rooms.length+'</span><i class="dLive">● 실시간</i></h5><div class="dList">'+
    (rooms.length?rooms.map(r=>{const ok=B>=r.floor,q=zpOf(r.floor),o=(r.players||[])[0]||{};return '<div class="dRoom'+(ok?'':' no')+'" style="--qc:'+q.c+'"><canvas class="dAv" data-ch="'+(o.ch||0)+'" width="48" height="48"></canvas><div class="dRi"><b>'+esc(r.owner)+'<small>Lv.'+(o.lv||1)+'</small></b><span><i class="dRf">'+r.floor+'F</i>'+dfBadge(r.diff)+'<small>#'+r.code+'</small></span></div><button data-j="'+r.code+'"'+(ok?'':' disabled title="'+r.floor+'F까지 올라가야 들어갈 수 있어요"')+'>'+(ok?'들어가기':'🔒 '+r.floor+'F')+'</button></div>'}).join(''):'<div class="dEmpty"><canvas class="dScn" data-scn="empty" width="120" height="70"></canvas><b>열린 방이 없어요</b><small>왼쪽에서 방을 만들고 코드를 친구에게 알려 주세요</small></div>')+
    '</div></div></div><div class="dMsg">'+esc(msgTx)+'</div></div>'}
  else if(view!=='room'&&window.PVP92){h=PVP92.html(view)||''}
  else if(view==='room'){const r=D.room||{},me=(r.players||[]).find(p=>p.me)||{},full=(r.players||[]).length===2,zp=zpOf(r.floor||1);
   const slot=i=>{const p=(r.players||[])[i];return p?'<div class="dSlot'+(p.me?' me':'')+'"><div class="dPed"><canvas class="dHero" data-ch="'+(p.me?myLook():(p.ch||0))+'" width="96" height="112"></canvas></div><b>'+(p.owner?'<i class="dCrown">👑</i>':'')+esc(p.name)+(p.me?' <small>(나)</small>':'')+'</b><span class="dSt"><i class="'+(p.online?'on':'off')+'"></i>Lv.'+p.lv+' · '+(p.online?(p.owner?'방장':(p.ready?'<b class="rdy">✓ 준비 완료</b>':'준비 중…')):'연결 끊김')+'</span></div>':'<div class="dSlot empty"><div class="dPed"><canvas class="dScn" data-scn="wait" width="96" height="112"></canvas></div><b>'+(r.kind==='pvp'?'상대를':'동료를')+' 기다리는 중<span class="dDots"><i>.</i><i>.</i><i>.</i></span></b><span class="dSt">방 코드를 알려 주세요</span></div>'};
   const pv=r.kind==='pvp';
   h='<div class="dP dRm'+(pv?' dPv':'')+'" style="--zc:'+(pv?'#ff5a7a':zp.c)+'">'+(pv?head('⚔','결투 방','친선전 · 골드는 오가지 않아요','<button class="dLeave">방 나가기</button>'):head('🤝','듀오 방',zp.n+' 구역 · '+(r.floor||1)+'F부터','<button class="dLeave">방 나가기</button>'))+
    '<div class="dBig"><small>방 코드</small><div class="dCodeBig">'+String(r.code||'????').split('').map(ch=>'<i>'+esc(ch)+'</i>').join('')+'</div><button class="dCopy">📋 복사</button></div>'+
    (pv?'<div class="dBadges"><span class="dRf">3판 2선승</span><span>내 장비 그대로 · 실력 승부</span></div>':'<div class="dBadges"><span class="dRf">'+(r.floor||1)+'F'+((r.floor||1)%10===0?' · BOSS':'')+'</span>'+dfBadge(r.diff)+'<span>'+(r.floor||1)+'F까지 올라가 본 사람만</span></div>')+
    (!pv&&me.owner&&r.state==='wait'?'<div class="dRmDiff"><h5>난이도 <small>출발 전까지 방장이 바꿀 수 있어요</small></h5>'+dfPick(D.wantDiff||r.diff,'data-rd')+'</div>':'')+
    '<div class="dPl">'+slot(0)+'<div class="dLink"><i>'+(pv?'⚔':'🤝')+'</i></div>'+slot(1)+'</div>'+
    (me.owner?(()=>{const op=(r.players||[]).find(p=>!p.me),ok=full&&op&&op.ready;return '<button class="dMain" id="dStart"'+(ok?'':' disabled')+'>'+(ok?(pv?'⚔ 결투 시작!':'▶ 함께 출발!'):!full?(pv?'상대가 들어오면 시작할 수 있어요':'동료가 들어오면 출발할 수 있어요'):'상대가 「준비 완료」를 누르면 시작할 수 있어요')+'</button>'})()
     :(()=>{const rd=D.wantReady!=null?D.wantReady:!!me.ready;return '<button class="dMain dRdy'+(rd?' on':'')+'" id="dReady">'+(rd?'✓ 준비 완료 · 누르면 취소':'준비 완료')+'</button><div class="dInfo dWait">'+(rd?(pv?'방장이 결투 시작을 누르면 바로 시작해요':'방장이 출발을 누르면 바로 시작해요'):'「준비 완료」를 눌러 주세요')+'</div>'})())+'<div class="dMsg">'+esc(msgTx)+'</div></div>'}
  /* 내용이 같으면 다시 그리지 않음(0.1초마다 그리면 단추를 누를 수 없음) · 입력하던 값은 지킴 */
  if(h===lastH)return;lastH=h;const cv=(box.querySelector('#dC')||{}).value,fv=document.activeElement&&document.activeElement.id;box.innerHTML=h;box.prepend(bgc);if(cv&&box.querySelector('#dC'))box.querySelector('#dC').value=cv;wire();if(fv&&box.querySelector('#'+fv))try{box.querySelector('#'+fv).focus()}catch(e){}anim()}
 /* 움직이는 그림: 창이 열려 있는 동안만 1/12초마다 */
 let aRaf=0,aT=0;
 function hero(o,idx,x,y,sc,t,fl){try{const img=ch2Render(idx,0,0,!!fl,t);o.drawImage(img,0,0,40,48,Math.round(x-20*sc),Math.round(y-44*sc),40*sc,48*sc)}catch(e){}}
 function scene(cv,t){const o=cv.getContext('2d'),W2=cv.width,H2=cv.height,k=cv.dataset.scn,zp=zpOf(best());o.imageSmoothingEnabled=false;o.clearRect(0,0,W2,H2);
  const g=o.createLinearGradient(0,0,0,H2);g.addColorStop(0,k==='duo'?'#0e2a36':'#1a1c2c');g.addColorStop(1,'#05070a');o.fillStyle=g;o.fillRect(0,0,W2,H2);
  for(let i=0;i<18;i++){const sx=(i*53)%W2,sy=(i*29)%(H2*.55);o.globalAlpha=.3+.7*Math.abs(Math.sin(t*1.3+i));o.fillStyle='#fff';o.fillRect(sx,sy,1,1)}o.globalAlpha=1;
  if(k==='vs'){const bob=Math.round(Math.sin(t*4)*1.2),idx=myLook(),cx=W2/2;o.fillStyle='#1a0610';o.fillRect(0,H2-16,W2,16);o.fillStyle='#ff5a7a66';o.fillRect(0,H2-16,W2,1);
   for(const [x,i2,fl] of [[cx-40,idx,false],[cx+40,(idx+5)%10,true]]){o.fillStyle='#00000077';o.beginPath();o.ellipse(x,H2-14,15,4,0,0,6.28);o.fill();hero(o,i2,x,H2-12+(fl?-bob:bob),1.9,t+(fl?.5:0),fl)}
   const q=(t*1.4)%1;o.save();o.globalCompositeOperation='lighter';o.globalAlpha=1-q;o.fillStyle='#ffe79a';for(let i=0;i<8;i++){const a=i/8*6.28;o.fillRect(cx+Math.cos(a)*q*22-1,H2-46+Math.sin(a)*q*16-1,3,3)}o.restore();
   o.font='900 22px sans-serif';o.textAlign='center';o.fillStyle='#000';o.fillText('VS',cx+1,32);o.fillStyle='#ff5a7a';o.fillText('VS',cx,31);o.textAlign='left';return}
  if(k==='prev'){const f=+cv.dataset.f||1,zq=zpOf(f),boss=f%10===0;const g2=o.createLinearGradient(0,0,W2,0);g2.addColorStop(0,'#05070a');g2.addColorStop(1,zq.c+'33');o.fillStyle=g2;o.fillRect(0,0,W2,H2);
   for(let y=8;y<H2-14;y+=6)for(let x=(y/6%2)*7;x<W2;x+=14){o.fillStyle=(x*7+y*3)%5?'#121a24':'#18222e';o.fillRect(x,y,13,5)}
   for(const tx of [18,W2-18]){const fl=Math.sin(t*12+tx)*1.2;const gg=o.createRadialGradient(tx,30,0,tx,30,16);gg.addColorStop(0,'#ff9a3a55');gg.addColorStop(1,'rgba(0,0,0,0)');o.fillStyle=gg;o.fillRect(tx-16,14,32,32);o.fillStyle='#ff7a1a';o.fillRect(tx-2,26-fl,4,5+fl);o.fillStyle='#ffd166';o.fillRect(tx-1,28-fl,2,3);o.fillStyle='#3a2a20';o.fillRect(tx-1,31,2,6)}
   o.fillStyle='#0d141c';o.fillRect(0,H2-14,W2,14);o.fillStyle=zq.c+'88';o.fillRect(0,H2-14,W2,1);
   const bob=Math.round(Math.sin(t*3)*1);hero(o,myLook(),W2*.32,H2-12+bob,1.25,t,false);hero(o,(myLook()+3)%10,W2*.32+30,H2-12-bob,1.25,t+.4,false);
   o.font='900 26px sans-serif';o.textAlign='right';o.fillStyle='#000';o.fillText(f+'F',W2-38,46);o.fillStyle=boss?'#ff5a7a':zq.c;o.fillText(f+'F',W2-40,44);o.font='800 10px sans-serif';o.fillStyle='#cfe8f0';o.fillText(zq.n+' 구역'+(boss?' · BOSS':''),W2-40,60);o.textAlign='left';
   if(boss){o.globalAlpha=.5+.5*Math.sin(t*6);o.fillStyle='#ff2d55';o.fillRect(0,0,W2,3);o.fillRect(0,H2-3,W2,3);o.globalAlpha=1}return}
  if(k==='wait'||k==='empty'){o.fillStyle='#0c1218';o.fillRect(W2/2-18,H2-50,36,46);o.fillStyle='#1c2a36';o.fillRect(W2/2-15,H2-47,30,43);o.fillStyle='#05070a';o.fillRect(W2/2-11,H2-40,22,36);o.beginPath();o.arc(W2/2,H2-40,11,Math.PI,0);o.fill();
   const a=.4+.4*Math.sin(t*3);o.globalAlpha=a;o.fillStyle=zp.c;o.font='900 20px sans-serif';o.textAlign='center';o.fillText('?',W2/2,H2-14);o.globalAlpha=1;o.textAlign='left';return}
  /* 탑 실루엣 */o.fillStyle='#0a0f16';o.fillRect(W2*.62,10,W2*.26,H2);for(let x=W2*.62;x<W2*.88;x+=8)o.fillRect(x,6,5,5);
  for(let r=0;r<6;r++)for(let c2=0;c2<3;c2++){const lit=Math.sin(t*2+r*3+c2)>.2;o.fillStyle=lit?zp.c+'cc':'#141c26';o.fillRect(W2*.66+c2*14,18+r*15,5,7)}
  o.fillStyle='#0d141c';o.fillRect(0,H2-16,W2,16);o.fillStyle=zp.c+'55';o.fillRect(0,H2-16,W2,1);
  const bob=Math.round(Math.sin(t*3)*1.2),idx=myLook();
  if(k==='solo'){o.fillStyle='#00000066';o.beginPath();o.ellipse(70,H2-14,16,4,0,0,6.28);o.fill();hero(o,idx,70,H2-12+bob,2,t,false);
   const sw=(t*1.2)%2<.25;if(sw){o.globalAlpha=.7;o.strokeStyle='#fff';o.lineWidth=2;o.beginPath();o.arc(86,H2-42,18,-1.2,.6);o.stroke();o.globalAlpha=1}}
  else{for(const [x,i2,fl,c] of [[52,idx,false,null],[104,(idx+3)%10,true,'#8de4ff']]){o.fillStyle='#00000066';o.beginPath();o.ellipse(x,H2-14,15,4,0,0,6.28);o.fill();if(c){o.strokeStyle=c;o.globalAlpha=.7;o.beginPath();o.ellipse(x,H2-14,17,5,0,0,6.28);o.stroke();o.globalAlpha=1}hero(o,i2,x,H2-12+(c?-bob:bob),1.8,t+(c?.4:0),fl)}
   const q=(t%1.6)/1.6;o.globalAlpha=1-q;o.fillStyle='#ffe79a';for(let i=0;i<6;i++){const a=i/6*6.28+t;o.fillRect(78+Math.cos(a)*q*16,H2-56+Math.sin(a)*q*12,2,2)}o.globalAlpha=1}}
 /* 창 뒤 배경: 떠오르는 빛 알갱이 */
 const bgc=document.createElement('canvas');bgc.id='dBg';box.prepend(bgc);const BP=[];
 function bgFx(t){const w=innerWidth,h=innerHeight;if(bgc.width!==w)bgc.width=w;if(bgc.height!==h)bgc.height=h;const o=bgc.getContext('2d');o.clearRect(0,0,w,h);
  if(BP.length<60)BP.push({x:Math.random()*w,y:h+10,v:20+Math.random()*50,s:1+Math.random()*2.5,c:Math.random()<.5?'#a6f5c6':'#8de4ff',p:Math.random()*6});
  for(let i=BP.length-1;i>=0;i--){const q=BP[i];q.y-=q.v*.083;if(q.y<-10){BP.splice(i,1);continue}o.globalAlpha=.25+.25*Math.sin(t*2+q.p);o.fillStyle=q.c;o.fillRect(q.x+Math.sin(t+q.p)*8,q.y,q.s,q.s)}o.globalAlpha=1}
 function anim(){if(aRaf)return;const loop=now=>{aRaf=0;if(box.hidden)return;if(now-aT>83){aT=now;const t=now/1000;
   box.querySelectorAll('canvas.dScn').forEach(cv=>scene(cv,t));bgFx(t);
   box.querySelectorAll('canvas[data-ch]').forEach((cv,i)=>{const o=cv.getContext('2d');o.imageSmoothingEnabled=false;o.clearRect(0,0,cv.width,cv.height);const big=cv.classList.contains('dHero'),sc=big?2:1.1;
    if(big){const g=o.createRadialGradient(cv.width/2,cv.height-14,2,cv.width/2,cv.height-14,44);g.addColorStop(0,'#ffffff22');g.addColorStop(1,'rgba(0,0,0,0)');o.fillStyle=g;o.fillRect(0,0,cv.width,cv.height)}
    hero(o,+cv.dataset.ch,cv.width/2,cv.height-(big?10:2)+Math.round(Math.sin(t*3+i)*1.2),sc,t+i*.3,i%2===1)})}
  aRaf=requestAnimationFrame(loop)};aRaf=requestAnimationFrame(loop)}
 function wire(){const q=s=>box.querySelector(s);
  box.querySelectorAll('.dX').forEach(b=>b.onclick=closeUI);
  box.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{try{gmSfx('ok')}catch(_){}if(b.dataset.go==='solo'){closeUI();D.bypass=true;try{gmShow('tower')}finally{D.bypass=false}}else{if(!acc().token){msgTx='';closeUI();try{ACCT55.open()}catch(e){}return}msgTx='';openUI('duo');loadRooms()}});
  if(q('.dBack'))q('.dBack').onclick=()=>openUI('pick');
  box.querySelectorAll('.dQuick button').forEach(b=>b.onclick=()=>{startF=+b.dataset.f;draw()});
  if(q('#dF')){q('#dF').oninput=e=>{startF=Math.max(1,Math.min(best(),+e.target.value||1));const n=box.querySelector('.dFlN b');if(n)n.innerHTML=startF+'<i>F</i>'};q('#dF').onchange=e=>{startF=Math.max(1,Math.min(best(),+e.target.value||1));try{gmSfx('move')}catch(_){}draw()}}
  box.querySelectorAll('[data-df]').forEach(b=>b.onclick=()=>{const B=best();startF=Math.max(1,Math.min(B,(startF||B)+ +b.dataset.df));try{gmSfx('move')}catch(_){}draw()});
  box.querySelectorAll('[data-dd]').forEach(b=>b.onclick=()=>{mkDiff=b.dataset.dd;try{gmSfx('move')}catch(_){}draw()});
  box.querySelectorAll('[data-rd]').forEach(b=>b.onclick=()=>{D.wantDiff=b.dataset.rd;try{gmSfx('move')}catch(_){}draw()});
  if(q('.dCopy'))q('.dCopy').onclick=()=>{const c=(D.room||{}).code||'';try{navigator.clipboard.writeText(c);q('.dCopy').textContent='✓ 복사됨'}catch(e){}};
  if(q('#dMake'))q('#dMake').onclick=create;
  if(q('#dJoinC'))q('#dJoinC').onclick=()=>join((q('#dC').value||'').trim().toUpperCase());
  box.querySelectorAll('[data-j]').forEach(b=>b.onclick=()=>join(b.dataset.j));
  if(q('.dLeave'))q('.dLeave').onclick=()=>{const pv=D.room&&D.room.kind==='pvp';end();if(pv){openUI('pvp');return}openUI('duo');loadRooms()};
  box.querySelectorAll('[data-pvp]').forEach(b=>b.onclick=()=>{try{gmSfx('ok')}catch(_){}if(!acc().token){closeUI();try{ACCT55.open()}catch(e){}return}openUI('pvp')});
  try{window.PVP92&&PVP92.wire(box)}catch(e){console.error('pvp wire',e)}
  if(q('#dReady'))q('#dReady').onclick=()=>{const mp=((D.room||{}).players||[]).find(p=>p.me)||{};const cur=D.wantReady!=null?D.wantReady:!!mp.ready;D.wantReady=!cur;try{gmSfx(cur?'back':'ok')}catch(_){}lastH='';draw()};
  if(q('#dStart'))q('#dStart').onclick=()=>{D.wantStart=true;msgTx='출발 준비 중…';draw()};
  }
 async function loadRooms(){const r=await api('/api/duo/rooms');rooms=(r.s===200&&r.j.rooms)||[];if(r.s!==200)msgTx='방 목록을 불러오지 못했어요. (서버 연결 확인)';if(view==='duo')draw()}
 setInterval(()=>{if(!box.hidden&&view==='duo'&&Date.now()-listT>3000){listT=Date.now();loadRooms()}},500);
 async function create(){const f=Math.max(1,Math.min(best(),startF||best()));msgTx='방을 만드는 중…';draw();
  const r=await api('/api/duo/create','POST',{floor:f,best:best(),diff:mkDiff||diff,lv:myLv(),ch:myCh()});if(r.s!==200){msgTx=r.j.error||'방을 만들지 못했어요';draw();return}
  Object.assign(D,{on:true,code:r.j.room.code,role:'host',room:r.j.room,since:0,started:false,out:[]});msgTx='';openUI('room')}
 async function join(code){if(!/^[A-Z0-9]{4}$/.test(code)){msgTx='방 코드 4자리를 넣어 주세요';draw();return}msgTx='들어가는 중…';draw();
  const r=await api('/api/duo/join','POST',{code,best:best(),lv:myLv(),ch:myCh()});if(r.s!==200){msgTx=r.j.error||'들어가지 못했어요';draw();return}
  Object.assign(D,{on:true,code,role:'guest',room:r.j.room,since:0,started:false,out:[]});msgTx='';openUI('room')}
 function renderRoom(){if(view==='room'&&!box.hidden)draw()}
 /* 로비의 「탑 오르기」 → 고르기 창 */
 {const f=gmShow;gmShow=function(scr){if((scr==='tower'||scr==='story')&&!D.bypass&&!D.started){openUI('pick');return}return f.apply(this,arguments)}}
 box.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Escape'&&!D.on)closeUI()});box.addEventListener('pointerdown',e=>e.stopPropagation());
 const st=document.createElement('style');st.id='duo85s';st.textContent=`
 #duo85{position:fixed;inset:0;z-index:92;display:flex;align-items:center;justify-content:center;background:#000c;color:#eaf6ef;font-family:inherit}#duo85[hidden]{display:none}
 #duo85 .dP{width:min(520px,calc(100vw - 20px));max-height:calc(100dvh - 20px);overflow:auto;border-radius:18px;background:linear-gradient(180deg,#15232b,#0a1216);border:1px solid #a6f5c666;box-shadow:0 20px 60px #000c;padding:16px}
 #duo85 .dP.wide{width:min(900px,calc(100vw - 20px))}
 #duo85 .dHd{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}#duo85 .dHd b{font-size:22px}
 #duo85 button{font:inherit;cursor:pointer}
 #duo85 .dHd button:not(.cx77),#duo85 .dCode button,#duo85 .dQuick button,#duo85 .dRoom button{padding:8px 14px;border-radius:10px;border:1px solid #ffffff2a;background:#13202a;color:#e8f4ef;font-weight:800}
 #duo85 .dPick{display:grid;grid-template-columns:1fr 1fr;gap:12px}
 #duo85 .dCard{display:flex;flex-direction:column;align-items:center;gap:6px;padding:22px 12px;border-radius:16px;border:2px solid #ffffff22;background:linear-gradient(180deg,#1a2a34,#0e161c);color:#fff}
 #duo85 .dCard i{font-style:normal;font-size:40px}#duo85 .dCard b{font-size:22px}#duo85 .dCard small{color:#9ab8ac;text-align:center}
 #duo85 .dCard:hover{border-color:#a6f5c6;transform:translateY(-2px)}#duo85 .dCard.duo{border-color:#8de4ff66}
 #duo85 .dCols{display:grid;grid-template-columns:1fr 1.2fr;gap:14px}
 #duo85 .dCol{padding:12px;border-radius:14px;background:#0d161b;border:1px solid #ffffff12;display:flex;flex-direction:column;gap:8px;min-width:0}
 #duo85 h4{margin:0;font-size:16px}#duo85 h4 small{font-size:11px;color:#9ab8ac;font-weight:600}
 #duo85 label{display:flex;flex-direction:column;gap:4px;font-weight:800}#duo85 label small{color:#9ab8ac;font-weight:600}
 #duo85 input{padding:9px 10px;border-radius:10px;border:1px solid #a6f5c666;background:#05090c;color:#fff;font:inherit;font-size:16px}
 #duo85 .dQuick{display:flex;flex-wrap:wrap;gap:5px}#duo85 .dQuick button{padding:5px 9px;font-size:12px}#duo85 .dQuick button.on{border-color:#a6f5c6;background:#1f4a3c}
 #duo85 .dInfo{font-size:12.5px;color:#b8d0c8;line-height:1.5}#duo85 .dInfo b{color:#ffe79a}
 #duo85 .dMain{display:block;width:100%;padding:12px;border-radius:12px;border:1px solid #f0fff6;background:linear-gradient(180deg,#d4ffe6,#74d3b0);color:#04120c;font-weight:900;font-size:16px}
 #duo85 .dMain:disabled{background:#2a3a3a;color:#8a9a9a;border-color:#3a4a4a;cursor:default}
 #duo85 .dCode{display:flex;gap:6px}#duo85 .dCode input{flex:1;min-width:0;text-transform:uppercase;letter-spacing:.3em;text-align:center}
 #duo85 .dList{display:flex;flex-direction:column;gap:6px;max-height:300px;overflow:auto}
 #duo85 .dRoom{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:9px 10px;border-radius:12px;background:#121e26;border:1px solid #ffffff14}
 #duo85 .dRoom small{color:#8aa0a8}#duo85 .dRf{color:#ffe79a;font-weight:900;font-size:13px}#duo85 .dRoom button:disabled{opacity:.55;cursor:not-allowed}
 #duo85 .dEmpty{padding:18px;text-align:center;color:#8aa0a8}#duo85 .dMsg{margin-top:8px;color:#ffb2a8;font-size:13px;min-height:1em}
 #duo85 .dBig{text-align:center;font-size:15px;margin:4px 0 6px}#duo85 .dBig b{display:block;font-size:40px;letter-spacing:.3em;color:#ffe79a;text-shadow:0 0 18px #ffe79a55}
 #duo85 .dPl{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0}
 #duo85 .dSlot{display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px;border-radius:14px;background:#0d161b;border:1px solid #8de4ff44;min-height:140px;justify-content:center}
 #duo85 .dSlot.empty{border-style:dashed;color:#8aa0a8;text-align:center}#duo85 .dSlot i{font-style:normal;font-size:30px}#duo85 .dSlot small{color:#8aa0a8}
 #duo85 .dSlot canvas{width:80px;height:80px;image-rendering:pixelated}
 #duoPz{position:fixed;left:50%;top:12px;transform:translateX(-50%);z-index:95;display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 14px;border-radius:14px;background:#0a1216e6;border:1px solid #8de4ff88;color:#eaf6ef;box-shadow:0 8px 30px #0009;font-family:inherit}#duoPz[hidden]{display:none}
 #duoPz small{color:#9ab8ac;font-size:11px}#duoPz div{display:flex;gap:8px;margin-top:4px}#duoPz button{font:inherit;font-weight:800;padding:8px 14px;border-radius:10px;border:1px solid #ffffff2a;background:#13202a;color:#e8f4ef;cursor:pointer}#duoPz #dpGo{background:linear-gradient(180deg,#d4ffe6,#74d3b0);color:#04120c}
 @media (max-width:640px){#duo85 .dCols{grid-template-columns:1fr}#duo85 .dPick{grid-template-columns:1fr}}
 /* ---------- v90 꾸미기 ---------- */
 #duo85{background:radial-gradient(80% 60% at 50% 30%,#0e2a3688,#000d 70%);backdrop-filter:blur(3px)}
 #duo85 .dP{position:relative;background:linear-gradient(180deg,#16222c,#0a1015 60%,#070b0f);border:2px solid #a6f5c655;box-shadow:0 0 0 1px #000,0 24px 70px #000d,inset 0 1px 0 #ffffff18;animation:dIn .22s ease-out}
 #duo85 .dP::before{content:'';position:absolute;inset:6px;border:1px solid #ffffff0d;border-radius:13px;pointer-events:none}
 #duo85 .dHd{gap:10px}#duo85 .dTt{display:flex;align-items:center;gap:10px}#duo85 .dTt>i{font-style:normal;width:40px;height:40px;display:grid;place-items:center;border-radius:12px;background:linear-gradient(180deg,#2a4a3e,#10221c);border:1px solid #a6f5c666;font-size:20px;box-shadow:0 0 14px #a6f5c633}
 #duo85 .dTt b{display:block;font-size:22px;letter-spacing:.04em;text-shadow:0 2px 0 #000}#duo85 .dTt small{display:block;font-size:11.5px;color:#9ab8ac;font-weight:700}
 #duo85 .dCard{position:relative;overflow:hidden;padding:10px 10px 14px;gap:5px;background:linear-gradient(180deg,#1a2a34,#0b1218);transition:transform .15s,box-shadow .15s,border-color .15s}
 #duo85 .dCard .dScn{width:100%;aspect-ratio:200/120;image-rendering:pixelated;border-radius:10px;border:1px solid #ffffff18;background:#05070a}
 #duo85 .dCard:hover{transform:translateY(-4px);box-shadow:0 14px 30px #000a,0 0 24px #a6f5c633}#duo85 .dCard.duo:hover{box-shadow:0 14px 30px #000a,0 0 24px #8de4ff44;border-color:#8de4ff}
 #duo85 .dCard em{font-style:normal;font-size:12px;font-weight:900;color:#05070a;background:linear-gradient(180deg,#d4ffe6,#74d3b0);padding:5px 12px;border-radius:999px;margin-top:4px}
 #duo85 .dCard.pvp:hover{box-shadow:0 14px 30px #000a,0 0 24px #ff5a7a55;border-color:#ff5a7a}#duo85 .dCard.pvp em{background:linear-gradient(180deg,#ffc8d4,#ff5a7a);color:#2a0610}#duo85 .dCard .dNew.pv{background:#ff5a7a;color:#fff}
 #duo85 .dPick{grid-template-columns:repeat(auto-fit,minmax(170px,1fr))}#duo85 .dPk{width:min(720px,calc(100vw - 20px))}
 #duo85 .dCard.duo em{background:linear-gradient(180deg,#c8f4ff,#5ab8e8)}
 #duo85 .dCard::after{content:'';position:absolute;inset:0;background:linear-gradient(110deg,transparent 40%,#ffffff18 50%,transparent 60%);background-size:260% 100%;animation:dShine 3s linear infinite;pointer-events:none}
 #duo85 .dCard .dNew{font-style:normal;font-size:10px;vertical-align:middle;padding:2px 6px;border-radius:6px;background:#8de4ff;color:#04121a;margin-left:4px;letter-spacing:.08em}
 #duo85 .dCol{background:linear-gradient(180deg,#0f1a22,#0a1016);border:1px solid #ffffff14;box-shadow:inset 0 1px 0 #ffffff0c}
 #duo85 .dCol.mk{border-color:color-mix(in srgb,var(--zc) 40%,#ffffff14)}
 #duo85 h4{font-size:15px;letter-spacing:.06em;display:flex;align-items:center;gap:6px}#duo85 h4::before{content:'';width:4px;height:14px;border-radius:2px;background:#a6f5c6}
 #duo85 h5{margin:6px 0 0;font-size:12px;color:#9ab8ac;display:flex;align-items:center;gap:6px}#duo85 h5 span{background:#ffffff14;border-radius:6px;padding:0 6px;color:#fff}
 #duo85 .dLive{font-style:normal;margin-left:auto;color:#7dffa8;font-size:10px;animation:dBlink 1.4s infinite}
 #duo85 .dFl{display:flex;align-items:center;gap:6px}#duo85 .dStep{flex:0 0 auto;width:42px;height:42px;border-radius:12px;border:1px solid #ffffff22;background:#13202a;color:#e8f4ef;font-weight:900;font-size:13px}
 #duo85 .dStep:active{transform:scale(.94)}
 #duo85 .dFlN{flex:1;position:relative;text-align:center;padding:6px 0 8px;border-radius:14px;background:radial-gradient(80% 90% at 50% 100%,color-mix(in srgb,var(--zc) 30%,transparent),#05090c 80%);border:1px solid color-mix(in srgb,var(--zc) 55%,transparent)}
 #duo85 .dFlN small{display:block;font-size:10px;letter-spacing:.2em;color:var(--zc);font-weight:900}
 #duo85 .dFlN b{font-size:40px;line-height:1;font-weight:900;color:#fff;text-shadow:0 0 18px var(--zc),0 3px 0 #000}#duo85 .dFlN b i{font-style:normal;font-size:18px;color:var(--zc);margin-left:2px}
 #duo85 .dFlN em{position:absolute;top:6px;right:8px;font-style:normal;font-size:9px;font-weight:900;color:#fff;background:#ff2d55;border-radius:5px;padding:1px 5px;animation:dBlink 1s infinite}
 #duo85 input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:8px;padding:0;border-radius:99px;background:linear-gradient(90deg,var(--zc),#ffffff22);border:0;accent-color:var(--zc)}
 #duo85 input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#fff;border:3px solid var(--zc);box-shadow:0 0 10px var(--zc)}
 #duo85 .dQuick button{border-color:color-mix(in srgb,var(--qc) 50%,transparent)!important;color:var(--qc)!important}#duo85 .dQuick button.on{background:var(--qc)!important;color:#05070a!important;box-shadow:0 0 10px var(--qc)}
 #duo85 .dDf{display:inline-block;font-size:11px;font-weight:900;padding:2px 8px;border-radius:999px;background:#ffffff14;border:1px solid #ffffff24}
 #duo85 .dDf-easy{color:#7dffa8;border-color:#7dffa866}#duo85 .dDf-normal{color:#8de4ff;border-color:#8de4ff66}#duo85 .dDf-hard{color:#ffb020;border-color:#ffb02066}#duo85 .dDf-extreme{color:#ff5a7a;border-color:#ff5a7a66}
 #duo85 .dMain{position:relative;overflow:hidden;font-size:17px;letter-spacing:.06em;box-shadow:0 6px 20px #74d3b044,inset 0 1px 0 #fff8}
 #duo85 .dMain:not(:disabled)::after{content:'';position:absolute;inset:0;background:linear-gradient(110deg,transparent 35%,#ffffffaa 50%,transparent 65%);background-size:260% 100%;animation:dShine 2.2s linear infinite}
 #duo85 .dSlots{flex:1;position:relative}#duo85 #dC{width:100%;box-sizing:border-box;font-family:ui-monospace,Menlo,monospace;font-size:26px;font-weight:900;letter-spacing:.55em;text-indent:.55em;padding:8px 6px;color:#ffe79a;background:linear-gradient(180deg,#05090c,#0c141a);border:2px solid #a6f5c666;border-radius:12px;text-align:center;text-shadow:0 0 10px #ffe79a66;text-transform:uppercase}
 #duo85 #dC::placeholder{color:#3a4a50}#duo85 #dC:focus{outline:none;border-color:#a6f5c6;box-shadow:0 0 14px #a6f5c655}
 #duo85 #dJoinC{background:linear-gradient(180deg,#c8f4ff,#5ab8e8)!important;color:#04121a!important;border:0!important}
 #duo85 .dRoom{gap:10px;padding:8px 10px;background:linear-gradient(90deg,color-mix(in srgb,var(--qc) 14%,#101a22),#0c141b);border-left:3px solid var(--qc);transition:transform .12s}
 #duo85 .dRoom:hover{transform:translateX(3px)}#duo85 .dRoom.no{opacity:.6}
 #duo85 .dAv{width:44px;height:44px;flex:0 0 44px;image-rendering:pixelated;border-radius:10px;background:radial-gradient(#ffffff14,#05070a 70%);border:1px solid #ffffff1a}
 #duo85 .dRi{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}#duo85 .dRi b{font-size:14px}#duo85 .dRi b small{margin-left:6px;color:#8aa0a8;font-size:11px}#duo85 .dRi span{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
 #duo85 .dRf{font-style:normal;font-weight:900;font-size:12px;color:#05070a;background:var(--qc,var(--zc,#ffe79a));padding:2px 8px;border-radius:6px}
 #duo85 .dRoom button{background:linear-gradient(180deg,#d4ffe6,#74d3b0)!important;color:#04120c!important;border:0!important}#duo85 .dRoom button:disabled{background:#2a3436!important;color:#8a9a9a!important}
 #duo85 .dEmpty{display:flex;flex-direction:column;align-items:center;gap:4px;padding:14px}#duo85 .dEmpty canvas{width:120px;height:70px;image-rendering:pixelated;border-radius:10px;opacity:.9}#duo85 .dEmpty b{color:#cfe8f0}#duo85 .dEmpty small{font-size:11px}
 #duo85 .dRm{width:min(560px,calc(100vw - 20px))}
 #duo85 .dBig{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap}#duo85 .dBig small{font-size:11px;letter-spacing:.2em;color:#9ab8ac;font-weight:900}
 #duo85 .dCodeBig{display:flex;gap:6px}#duo85 .dCodeBig i{font-style:normal;width:44px;height:54px;display:grid;place-items:center;font-size:32px;font-weight:900;font-family:ui-monospace,Menlo,monospace;color:#ffe79a;background:linear-gradient(180deg,#1a242c,#05090c);border:2px solid #ffe79a66;border-radius:10px;text-shadow:0 0 12px #ffe79a88;box-shadow:inset 0 -3px 0 #0006}
 #duo85 .dCopy{padding:8px 12px;border-radius:10px;border:1px solid #ffffff2a;background:#13202a;color:#e8f4ef;font-weight:800;font-size:12px}
 #duo85 .dBadges{display:flex;gap:6px;justify-content:center;align-items:center;flex-wrap:wrap;margin-top:8px;font-size:11.5px;color:#9ab8ac}#duo85 .dBadges .dRf{--qc:var(--zc)}
 #duo85 .dPl{grid-template-columns:1fr auto 1fr;align-items:stretch}
 #duo85 .dSlot{position:relative;min-height:190px;gap:5px;background:linear-gradient(180deg,#0f1c24,#080d12);border:1px solid #8de4ff33;justify-content:flex-end}
 #duo85 .dSlot.me{border-color:#a6f5c666;box-shadow:0 0 18px #a6f5c622}
 #duo85 .dPed{position:relative;width:100%;display:flex;justify-content:center}#duo85 .dPed::after{content:'';position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:84px;height:14px;border-radius:50%;background:radial-gradient(color-mix(in srgb,var(--zc) 55%,transparent),transparent 70%)}
 #duo85 .dSlot canvas.dHero,#duo85 .dSlot canvas.dScn{width:96px;height:112px;image-rendering:pixelated;position:relative;z-index:1}
 #duo85 .dSlot .dScn{border-radius:12px;opacity:.85}
 #duo85 .dCrown{font-style:normal;margin-right:3px}
 #duo85 .dSt{display:flex;align-items:center;gap:5px;font-size:11px;color:#9ab8ac;font-weight:700}#duo85 .dSt i{width:8px;height:8px;border-radius:50%}#duo85 .dSt i.on{background:#7dffa8;box-shadow:0 0 6px #7dffa8}#duo85 .dSt i.off{background:#ff5a7a}
 #duo85 .dLink{display:grid;place-items:center}#duo85 .dLink i{font-style:normal;font-size:24px;width:42px;height:42px;display:grid;place-items:center;border-radius:50%;background:#0f1c24;border:1px solid #ffffff22;animation:dPulse 1.6s ease-in-out infinite}
 #duo85 .dDots i{font-style:normal;animation:dBlink 1.2s infinite}#duo85 .dDots i:nth-child(2){animation-delay:.2s}#duo85 .dDots i:nth-child(3){animation-delay:.4s}
 #duo85 .dRdy{background:linear-gradient(180deg,#c8f4ff,#5ab8e8)!important;color:#04121a!important}#duo85 .dRdy.on{background:linear-gradient(180deg,#d4ffe6,#3ad16a)!important;box-shadow:0 0 18px #3ad16a66!important}
 #duo85 .dSt .rdy{color:#7dffa8}
 #duo85 .dWait{text-align:center;padding:10px;border-radius:12px;background:#0f1c24;border:1px dashed #8de4ff55;color:#cfe8f0}
 #dBg{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0}#duo85 .dP{z-index:1}
 #duo85 .dPrev{width:100%;aspect-ratio:240/86;image-rendering:pixelated;border-radius:10px;border:1px solid color-mix(in srgb,var(--zc) 40%,#ffffff14)}
 #duo85 .dDiff{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
 #duo85 .dDd{display:flex;flex-direction:column;align-items:center;gap:1px;padding:7px 2px 6px;border-radius:12px;border:1px solid #ffffff1c;background:linear-gradient(180deg,#141f28,#0a1015);color:#cfe0e6;transition:transform .12s}
 #duo85 .dDd i{font-style:normal;font-size:18px;filter:grayscale(.7);opacity:.8}#duo85 .dDd b{font-size:12.5px}#duo85 .dDd small{font-size:9.5px;opacity:.6;font-weight:800}
 #duo85 .dDd:hover{transform:translateY(-2px)}
 #duo85 .dDd.on{color:#05070a;transform:translateY(-2px)}#duo85 .dDd.on i{filter:none;opacity:1}#duo85 .dDd.on small{opacity:.8}
 #duo85 .dDd.dDf-easy.on{background:linear-gradient(180deg,#c8ffd8,#5ad88a);box-shadow:0 0 14px #7dffa866}#duo85 .dDd.dDf-normal.on{background:linear-gradient(180deg,#d8f6ff,#5ab8e8);box-shadow:0 0 14px #8de4ff66}
 #duo85 .dDd.dDf-hard.on{background:linear-gradient(180deg,#ffe2a8,#ff9a2a);box-shadow:0 0 14px #ffb02066}#duo85 .dDd.dDf-extreme.on{background:linear-gradient(180deg,#ffb2c0,#ff2d55);box-shadow:0 0 16px #ff2d5588;color:#fff}
 #duo85 .dRmDiff{margin-top:10px;padding:10px;border-radius:14px;background:#0b1319;border:1px solid #ffffff12}#duo85 .dRmDiff h5{margin:0 0 6px}#duo85 .dRmDiff h5 small{font-weight:600;color:#7a9088}
 #duo85 .dCol.mk{background:radial-gradient(120% 60% at 50% 0%,color-mix(in srgb,var(--zc) 12%,transparent),transparent 60%),linear-gradient(180deg,#0f1a22,#0a1016)}
 #duo85 .dP::after{content:'';position:absolute;left:24px;right:24px;top:-1px;height:2px;background:linear-gradient(90deg,transparent,#a6f5c6,#8de4ff,transparent);border-radius:2px;opacity:.8}
 @keyframes dIn{from{transform:translateY(10px) scale(.98);opacity:0}}@keyframes dShine{0%{background-position:150% 0}100%{background-position:-100% 0}}
 @keyframes dBlink{50%{opacity:.35}}@keyframes dPulse{50%{transform:scale(1.1);box-shadow:0 0 16px #ffe79a55}}
 @media (max-width:640px){#duo85 .dPl{grid-template-columns:1fr 1fr}#duo85 .dLink{display:none}#duo85 .dCodeBig i{width:38px;height:46px;font-size:26px}#duo85 .dFlN b{font-size:32px}#duo85 .dPick{grid-template-columns:1fr 1fr}#duo85 .dCard small{font-size:10.5px}}`;document.head.appendChild(st);
 window.DUO85={state:D,send,evPush,api,acc,esc,hero,myLook,myCh,myLv,MDLY,draw:()=>{lastH='';draw()},setMsg:t=>{msgTx=t},join,closeUI,isOpen:()=>!box.hidden,view:()=>view,hitSent,guestMobs,onDie,drawList,bossButtons,open:openUI,end,_applySnap:applySnap,_snap:snap};
}catch(e){console.error('v85 duo',e)}})();
