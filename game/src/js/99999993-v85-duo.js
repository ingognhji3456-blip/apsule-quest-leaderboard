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
  if(P.lungeT&&P.lungeT!==ES.l){ES.l=P.lungeT;evPush('a',{a:r1(P.lungeA||0),d:P.lungeDur||130})}
  if(P.dash&&P.dash.t0!==ES.d){ES.d=P.dash.t0;evPush('d',{vx:Math.sign(P.dash.vx||0),vy:Math.sign(P.dash.vy||0),dur:P.dash.dur||150})}
  if(P.parryT&&P.parryT!==ES.p){ES.p=P.parryT;evPush('p',{g:P.parryPerf?1:0})}
  /* 궁극기: 종류 · 세트 · 위치 · 타격 시각을 통째로 보내서 동료 화면에서 같은 연출을 재생 */
  try{const t=T(),sp=mode==='tower'?(t&&t.U&&t.U.sp):(G&&G.sp);if(sp&&sp.t0!==ES.u){ES.u=sp.t0;const hits=(mode==='tower'?t.U.hits:sp.hits)||[];
   evPush('U',{sp:{type:sp.type,set:sp.set||null,dur:sp.dur,name:sp.name,col:sp.col,cx:r1(sp.cx),cy:r1(sp.cy),hits}})}}catch(e){}
  if(ES.hp!=null&&P.hp<ES.hp&&!P.downDuo)evPush('h',{});ES.hp=P.hp}

 /* ---------- 0.1초마다 주고받기 ---------- */
 async function tick(){if(!D.on||(D.fly||0)>=3)return;D.fly=(D.fly||0)+1;try{
  const t=T();
  const ev=D.ev.splice(0,30);
  const ex={n:(D.pn=(D.pn||0)+1),ts:Math.round(performance.now()),wp:(()=>{try{return shopInv().eq.wp||0}catch(e){return 0}})(),sk:(()=>{try{return SKIN58.get()||''}catch(e){return ''}})(),
   ffx:r1((P.face&&P.face.x)||0),ffy:r1((P.face&&P.face.y)||1),ev};
  if(D.started&&typeof mode!=='undefined'){
   if(mode==='tower'&&t&&t.duo){send({...ex,t:'p',x:r1(P.x),y:r1(P.y),fx:P.face&&P.face.x<0?-1:1,lt:P.lungeT?Math.round(performance.now()-P.lungeT):9999,hp:P.hp,mx:P.maxhp,ch:myCh(),down:!!P.downDuo,w:!!P.walkOn});
    if(D.role==='host')send(snap())}
   else if(mode==='boss'&&typeof G!=='undefined'&&G&&G.tw71&&G.duo){const d=Math.round(D.bAcc);D.bAcc-=d;send({...ex,t:'b',x:r1(P.x),y:r1(P.y),fx:P.face&&P.face.x<0?-1:1,hp:P.hp,mx:P.maxhp,ch:myCh(),down:!!P.downDuo,d,lt:P.lungeT?Math.round(performance.now()-P.lungeT):9999});if(D.role==='host')send({t:'bh',hp:Math.round(G.hp)})}}
  const msgs=D.out.splice(0,20),code=D.code;
  const r=await api('/api/duo/sync','POST',{code:D.code,since:D.since,msgs,ch:myCh(),start:D.wantStart&&!D.started?1:0});
  if(!D.on||D.code!==code)return;/* 기다리는 사이에 방을 나갔으면 늦게 온 답은 버림(안 그러면 나간 판이 다시 시작됨) */
  if(r.s===404||r.s===403){const was=D.started;end('방이 사라졌어요.');if(!was){msgTx='방이 사라졌어요. 다시 만들어 주세요.';openUI('duo');loadRooms()}return}
  if(r.s!==200){D.fail=(D.fail||0)+1;if(D.wantStart&&!D.started&&D.fail>=3){msgTx='서버 응답을 기다리는 중… ('+(r.s?'오류 '+r.s:'연결 안 됨')+') 계속 시도해요';renderRoom()}return}
  D.fail=0;D.room=r.j.room;
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
   case 'leave':if(D.started)mateLeft((m.name||'동료')+'님이 나갔어요. 혼자 계속해요.');else renderRoom();break;
   case 'p':mateIn(m);if(t&&t.duo)t.duo.mate=D.mate;break;
   case 's':if(D.role==='guest')applySnap(m);break;
   case 'h':if(D.role==='host'&&t){const mo=t.mobs.find(q=>q.id===m.id&&q.hp>0);if(mo){if(m.sh)mo.sh=Math.max(0,(mo.sh||0)-m.sh);if(mo.sh<=0&&m.sh&&mo.shMax&&!mo.shRegen){mo.stunT=t.clk+.9;mo.shRegen=t.clk+8}mo.hp-=m.d;mo.hitT=t.clk;try{if(m.d>0){TW71.addPop(mo.x+(Math.random()-.5)*8,mo.y-16,'-'+m.d,'#8de4ff');TW71.burst(mo.x,mo.y-6,5,'#8de4ff',110)}else if(m.sh)TW71.addPop(mo.x,mo.y-16,'방패 -'+m.sh,'#8dcdf5')}catch(e){}if(mo.hp<=0)TW71.kill(mo)}}break;
   case 'sd':if(D.role==='host'&&t){const s=t.shots.find(q=>q.id===m.id);if(s)s.dead=1}break;
   case 'door':if(D.role==='host'&&t&&t.clear&&mode==='tower')TW71.nextFloor();break;
   case 'f':if(D.role==='guest')goFloor(m.f);break;
   case 'b':mateIn(m);if(m.d>0&&typeof G!=='undefined'&&G&&G.tw71&&['play','count','wake'].includes(G.state)){G.hp=Math.max(0,G.hp-m.d);G._dp=G.hp;try{G.pops.push({x:G.boss.x+(Math.random()-.5)*30,y:G.boss.y-30,t:performance.now(),tx:'동료 -'+m.d,col:'#8de4ff'});const now=performance.now(),bx=G.boss.x+(Math.random()-.5)*20,by=G.boss.y-14+(Math.random()-.5)*16;fxRing(bx,by,now,240,18+Math.min(16,m.d/40),'#8de4ff');G.slashFx&&G.slashFx.push({x:bx,y:by,a:Math.random()*6.28,t:now,dur:200,col:'#8de4ff',r:16})}catch(e){}if(G.hp<=0)try{startDying(performance.now())}catch(e){}}break;
   case 'bh':if(D.role==='guest'&&typeof G!=='undefined'&&G&&G.duo&&G._duo85&&G.state==='play'&&m.hp<G.hp){G.hp=m.hp;G._dp=G.hp;if(G.hp<=0)try{startDying(performance.now())}catch(e){}}break;
   case 'next':if(D.role==='guest'){$('overlay').hidden=true;startTower(m.f)}break;
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
 function begin(){if(D.started)return;D.started=true;closeUI();const f=D.room.floor;try{if(D.room.diff&&D.room.diff!==diff){$('diffSel').value=D.room.diff;updDiff()}}catch(e){}
  startTower(f);note('듀오 시작! '+f+'F · 함께 올라가요');try{$('bvTitle').textContent='BEAT BLADE · 탑 '+f+'F · 듀오'}catch(e){}}
 function end(msg){const was=D.started;if(D.code)api('/api/duo/leave','POST',{code:D.code});Object.assign(D,{on:false,code:null,role:null,room:null,started:false,since:0,out:[],mate:{}});
  const t=T();if(t)t.duo=null;if(typeof G!=='undefined'&&G)G.duo=null;const wasDown=P.downDuo;P.downDuo=false;if(P.inv>performance.now()+1e6)P.inv=0;D.mateOff=0;if(msg&&was)note(msg);closeUI();return wasDown}
 /* v86: 게임 중에 동료가 나가거나 연결이 끊김 → 방을 정리하고 혼자 계속. 내가 쓰러져 있었다면 그대로 쓰러짐 처리 */
 function mateLeft(msg){const wasDown=end(msg);if(!wasDown)return;const t=T(),now=performance.now();
  try{if(mode==='tower'&&t){if(t.clear){revive();return}t.dead=false;P.inv=0;P.hp=1;TW71.hurt(99999)}else if(mode==='boss'&&typeof G!=='undefined'&&G&&G.state==='play'){P.inv=0;P.hp=1;hurtP(99999,now)}}catch(e){console.error('duo mateLeft',e)}}
 {const f=TW71.start;TW71.start=function(){const t=T();if(t)t.duo=null;if(!D.started)P.downDuo=false;return f.apply(this,arguments)}}
 /* 로비로 나가면 방도 나감 */
 {const f=toLobby;toLobby=function(){try{if(D.on||D.started||D.code)end()}catch(e){}return f.apply(this,arguments)}}

 /* ---------- 쓰러짐 · 부활 ---------- */
 function mateAlive(){return D.mate&&!D.mate.down&&!(D.mate.hp!=null&&D.mate.hp<=0)&&performance.now()-(D.mate.at||0)<6000}
 function onDie(){const t=T();if(!t.duo)return false;if(mateAlive()){P.downDuo=true;P.hp=0;t.dead=true;send({t:'p',down:true,x:P.x,y:P.y,hp:0,mx:P.maxhp,ch:myCh()});note('쓰러졌어요 · 동료가 이 층을 깨면 다시 일어나요');return true}
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

  if(m.ev)mateEv(M,m.ev);const hs=M.hs||[];hs.push({t:lt,x:m.x,y:m.y,fx:m.ffx,fy:m.ffy});while(hs.length>24)hs.shift();
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
 {const f=frame;frame=function(){const r=f.apply(this,arguments);try{const tt=T();if(D.started&&D.on&&(mode==='tower'&&tt&&tt.duo||mode==='boss'&&typeof G!=='undefined'&&G&&G.tw71&&G.duo)){const m=D.mate||{},pl=(D.room&&D.room.players.find(p=>!p.me))||{};ctx.save();try{ctx.setTransform(SS,0,0,SS,0,0)}catch(e){}
   const x=W-118,y=AY+4;ctx.globalAlpha=.85;ctx.fillStyle='#05070a';ctx.fillRect(x,y,112,22);ctx.globalAlpha=1;ctx.fillStyle='#8de4ff';ctx.fillRect(x,y,2,22);ctx.font='900 8px sans-serif';ctx.fillStyle='#e8f8ff';ctx.fillText('🤝 '+(pl.name||'동료')+' · Lv.'+(pl.lv||1)+(m.down?' · 쓰러짐':''),x+6,y+9);
   const q=Math.max(0,Math.min(1,(m.hp||0)/(m.mx||1)));ctx.fillStyle='#3a0a14';ctx.fillRect(x+6,y+13,100,4);ctx.fillStyle=m.down?'#6a6a7a':'#7dffa8';ctx.fillRect(x+6,y+13,100*q,4);ctx.restore()}}catch(e){}return r}}

 /* ---------- 로비: 솔로 / 듀오 고르기 · 방 화면 ---------- */
 const box=document.createElement('div');box.id='duo85';box.hidden=true;document.body.appendChild(box);
 const esc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const DN={easy:'쉬움',normal:'보통',hard:'어려움',extreme:'익스트림'};
 let view='pick',rooms=[],listT=0,startF=null,msgTx='',lastH='';
 function openUI(v){view=v||'pick';box.hidden=false;lastH='';draw()}
 function closeUI(){box.hidden=true}
 function draw(){if(box.hidden)return;let h='';
  if(view==='pick')h='<div class="dP"><div class="dHd"><b>▲ 탑 오르기</b><button class="dX">닫기</button></div><div class="dPick"><button class="dCard" data-go="solo"><i>🗡</i><b>솔로</b><small>혼자 오르기 · 지금까지 하던 그대로</small></button><button class="dCard duo" data-go="duo"><i>🤝</i><b>듀오</b><small>둘이 함께 오르기 · 방을 만들거나 들어가기</small></button></div></div>';
  else if(view==='duo'){const b=best();const sf=Math.min(startF||b,b);const quick=[1];for(let f=11;f<=b;f+=10)quick.push(f);if(!quick.includes(b))quick.push(b);
   h='<div class="dP wide"><div class="dHd"><b>🤝 듀오</b><button class="dBack">◀ 뒤로</button></div><div class="dCols">'+
    '<div class="dCol"><h4>방 만들기 <small>방을 만든 사람이 방장</small></h4><label>시작 층 <small>(내가 올라가 본 '+b+'F까지)</small><input id="dF" type="number" min="1" max="'+b+'" value="'+sf+'"></label><div class="dQuick">'+quick.slice(-8).map(f=>'<button data-f="'+f+'"'+(f===sf?' class="on"':'')+'>'+f+'F</button>').join('')+'</div>'+
    '<div class="dInfo">난이도 <b>'+(DN[diff]||diff)+'</b> · '+sf+'F부터 시작 → <b>'+sf+'F를 깬 적 있는 사람</b>만 들어올 수 있어요</div><button class="dMain" id="dMake">방 만들기</button></div>'+
    '<div class="dCol"><h4>방 들어가기</h4><div class="dCode"><input id="dC" maxlength="4" placeholder="방 코드 4자리" autocapitalize="characters" spellcheck="false"><button id="dJoinC">코드로 들어가기</button></div><div class="dList">'+
    (rooms.length?rooms.map(r=>{const ok=b>=r.floor;return '<div class="dRoom"><div><b>'+esc(r.owner)+'</b>의 방 <small>#'+r.code+' · '+(DN[r.diff]||r.diff)+'</small><div class="dRf">'+r.floor+'F부터</div></div><button data-j="'+r.code+'"'+(ok?'':' disabled title="'+r.floor+'F까지 올라가야 들어갈 수 있어요"')+'>'+(ok?'들어가기':r.floor+'F 필요')+'</button></div>'}).join(''):'<div class="dEmpty">열린 방이 없어요. 방을 만들어 보세요!</div>')+
    '</div></div></div><div class="dMsg">'+esc(msgTx)+'</div></div>'}
  else if(view==='room'){const r=D.room||{},me=(r.players||[]).find(p=>p.me)||{},full=(r.players||[]).length===2;
   h='<div class="dP"><div class="dHd"><b>🤝 듀오 방</b><button class="dLeave">방 나가기</button></div><div class="dBig">방 코드 <b>'+esc(r.code)+'</b></div><div class="dInfo">'+(r.floor||1)+'F부터 · 난이도 '+(DN[r.diff]||r.diff)+' · '+(r.floor||1)+'F를 깬 사람만 들어올 수 있어요</div>'+
    '<div class="dPl">'+[0,1].map(i=>{const p=(r.players||[])[i];return p?'<div class="dSlot"><canvas width="80" height="80" data-ch="'+(p.ch||0)+'"></canvas><b>'+(p.owner?'👑 ':'')+esc(p.name)+(p.me?' (나)':'')+'</b><small>Lv.'+p.lv+(p.online?'':' · 연결 끊김')+'</small></div>':'<div class="dSlot empty"><i>⏳</i><small>동료를 기다리는 중…<br>방 코드를 알려 주세요</small></div>'}).join('')+'</div>'+
    (me.owner?'<button class="dMain" id="dStart"'+(full?'':' disabled')+'>'+(full?'▶ 시작':'동료가 들어오면 시작할 수 있어요')+'</button>':'<div class="dInfo">방장이 시작하면 바로 출발해요</div>')+'<div class="dMsg">'+esc(msgTx)+'</div></div>'}
  /* 내용이 같으면 다시 그리지 않음(0.1초마다 그리면 단추를 누를 수 없음) · 입력하던 값은 지킴 */
  if(h===lastH)return;lastH=h;const cv=(box.querySelector('#dC')||{}).value,fv=document.activeElement&&document.activeElement.id;box.innerHTML=h;if(cv&&box.querySelector('#dC'))box.querySelector('#dC').value=cv;wire();if(fv&&box.querySelector('#'+fv))try{box.querySelector('#'+fv).focus()}catch(e){}}
 function wire(){const q=s=>box.querySelector(s);
  box.querySelectorAll('.dX').forEach(b=>b.onclick=closeUI);
  box.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{try{gmSfx('ok')}catch(_){}if(b.dataset.go==='solo'){closeUI();D.bypass=true;try{gmShow('tower')}finally{D.bypass=false}}else{if(!acc().token){msgTx='';closeUI();try{ACCT55.open()}catch(e){}return}msgTx='';openUI('duo');loadRooms()}});
  if(q('.dBack'))q('.dBack').onclick=()=>openUI('pick');
  box.querySelectorAll('.dQuick button').forEach(b=>b.onclick=()=>{startF=+b.dataset.f;draw()});
  if(q('#dF'))q('#dF').onchange=e=>{startF=Math.max(1,Math.min(best(),+e.target.value||1));draw()};
  if(q('#dMake'))q('#dMake').onclick=create;
  if(q('#dJoinC'))q('#dJoinC').onclick=()=>join((q('#dC').value||'').trim().toUpperCase());
  box.querySelectorAll('[data-j]').forEach(b=>b.onclick=()=>join(b.dataset.j));
  if(q('.dLeave'))q('.dLeave').onclick=()=>{end();openUI('duo');loadRooms()};
  if(q('#dStart'))q('#dStart').onclick=()=>{D.wantStart=true;msgTx='출발 준비 중…';draw()};
  box.querySelectorAll('canvas[data-ch]').forEach(cv=>{const o=cv.getContext('2d');o.imageSmoothingEnabled=false;try{const img=ch2Render(+cv.dataset.ch,0,0,false,performance.now()/1000);o.drawImage(img,0,0,40,48,0,-4,66,80)}catch(e){}})}
 async function loadRooms(){const r=await api('/api/duo/rooms');rooms=(r.s===200&&r.j.rooms)||[];if(r.s!==200)msgTx='방 목록을 불러오지 못했어요. (서버 연결 확인)';if(view==='duo')draw()}
 setInterval(()=>{if(!box.hidden&&view==='duo'&&Date.now()-listT>3000){listT=Date.now();loadRooms()}},500);
 async function create(){const f=Math.max(1,Math.min(best(),startF||best()));msgTx='방을 만드는 중…';draw();
  const r=await api('/api/duo/create','POST',{floor:f,best:best(),diff,lv:myLv(),ch:myCh()});if(r.s!==200){msgTx=r.j.error||'방을 만들지 못했어요';draw();return}
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
 @media (max-width:640px){#duo85 .dCols{grid-template-columns:1fr}#duo85 .dPick{grid-template-columns:1fr}}`;document.head.appendChild(st);
 window.DUO85={state:D,send,hitSent,guestMobs,onDie,drawList,bossButtons,open:openUI,end,_applySnap:applySnap,_snap:snap};
}catch(e){console.error('v85 duo',e)}})();
