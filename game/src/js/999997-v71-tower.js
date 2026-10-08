/* ================= v71 탑 오르기 (TW71) — 이야기 모드를 대신하는 본편 =================
   ▲ 1층부터 올라간다. 1~9층은 잡몹 층, 10층마다 보스 층(보스 70명을 챕터 순서대로).
   ▲ 보스를 쓰러뜨리면 다음 10층은 「또 다른 잡몹」 구역: 구역마다 잡몹 두 종류(12종 × 챕터 색 7가지)가 바뀐다.
   ▲ 잡몹 층: 모두 쓰러뜨리면 위쪽 계단이 열리고, 계단에 닿으면 다음 층. 층을 오를 때 체력 조금 회복.
   ▲ 쓰러지면 그 구역의 첫 층(체크포인트)부터 다시. 보스는 진 층에서 다시 도전.
   ▲ 보스를 쓰러뜨리면 그 보스가 보스 러시에서도 열린다(이야기 진행 기록을 함께 채움).
   전투 조작은 그대로: 이동 · 공격(J/ATTACK) · 대시 · 패링(F/🛡) · 궁극기(C, 처치로 충전). 박자에 맞춰 베면 PERFECT(1.5배).
   화면은 mode='tower'일 때 이 파일이 직접 그리고 움직인다(frame 감싸기). 저장: saveData.tw71 */
(()=>{try{
 const TW=window.TW71={};
 const sv=()=>{const s=saveData.tw71||(saveData.tw71={floor:1,best:1,bosses:0,cp:1,kills:0});return s};
 const clampN=(v,a,b)=>Math.max(a,Math.min(b,v));
 const rnd=(a,b)=>a+Math.random()*(b-a);

 /* ---------- 보스 70명 ---------- */
 function bossOf(g){g=((g%70)+70)%70;try{
   if(g<20){const B=BOSSES[g];return {name:B.name,c:B.c}}
   if(g<30){const b=C3CASES[g-20].boss;return {name:b.name,c:(C3BOSS[b.art]||{}).c||'#ffd166'}}
   if(g<40){const b=S4[g-30];return {name:b.name,c:b.c||'#e8e0ff'}}
   if(g<50){const b=S5[g-40];return {name:b.name,c:b.c||'#7ff0e0'}}
   if(g<60){const b=window.S6ART[g-50];return {name:b.name,c:b.c||'#bfe8ff'}}
   const b=window.S7ART[g-60];return {name:b.name,c:b.c||'#ff6a8a'}}catch(e){return {name:'BOSS '+(g+1),c:'#ffd166'}}}
 function bossStart(g){g=((g%70)+70)%70;/* 앞 보스들은 탑에서 이미 쓰러뜨린 것으로(챕터 5처럼 진행 기록을 보고 막는 전투가 있음) */if(g>0)grant(g-1);
  if(g<20)startRush(g);else if(g<30)c3RushFight(g-20);else if(g<40)s4RushFight(g-30);
  else if(g<50)s5Fight(g-40,false,true);else if(g<60)s6Fight(g-50,'rush');else s7Fight(g-60,'rush')}
 /* 보스를 깨면 이야기 진행 기록도 채워서 보스 러시 · 챕터 잠금이 같이 풀리게 */
 function grant(g){try{/* g번 보스까지 쓰러뜨림 → 앞 챕터는 모두 끝낸 것으로 */const c=(n)=>Math.max(0,Math.min(10,n));
  saveData.chapter=Math.max(saveData.chapter||0,Math.min(20,g+1));
  if(g>=29)saveData.s4open=true;
  if(g>=30){const s=saveData.ch4||(saveData.ch4={ci:0,best:{}});s.ci=Math.max(s.ci||0,c(g-29))}
  if(g>=40){const s=s5Save();s.ci=Math.max(s.ci||0,c(g-39))}
  if(g>=50&&window.s6Save){const s=s6Save();s.ci=Math.max(s.ci||0,c(g-49))}
  if(g>=60&&window.s7Save){const s=s7Save();s.ci=Math.max(s.ci||0,c(g-59))}}catch(e){}}

 /* ---------- 잡몹 그림 (12×10 도트, a 주색 · b 어두운 색 · c 강조 · w 흰 눈 · k 검정) ---------- */
 const SP={
  slime:{n:'슬라임',hp:60,r:7,rows:['............','....aaaa....','..aaaaaaaa..','.aaaaaaaaaa.','.aawkaawkaa.','aaaaaaaaaaaa','aaaaaccaaaaa','abaaaaaaaaba','.bbbbbbbbbb.','............']},
  bat:{n:'박쥐',hp:40,r:6,rows:['............','b..........b','bb..aaaa..bb','bbbaaaaaabbb','.bbawkwkabb.','..aaaaaaaa..','...acaaca...','....a..a....','............','............']},
  archer:{n:'궁수',hp:55,r:6,rows:['....bbbb....','...baaaab...','...awkwka...','....aaaa....','..ccaaaacc.c','..a.aaaa.acc','....abba...c','....a..a....','...bb..bb...','............']},
  boar:{n:'돌진수',hp:80,r:8,rows:['............','..bb....bb..','.baaaaaaaab.','baaaaaaaaaab','aawkaaaawkaa','aaaaaaaaaaaa','caaaaaaaaaac','.a.bb..bb.a.','.b.b....b.b.','............']},
  gear:{n:'톱니',hp:70,r:7,rows:['....a..a....','..aaaaaaaa..','.aabbbbbbaa.','aabbwkkwbbaa','.abbkkkkbba.','.abbkkkkbba.','aabbbccbbbaa','.aabbbbbbaa.','..aaaaaaaa..','....a..a....']},
  mage:{n:'술사',hp:50,r:6,rows:['.....cc.....','....bbbb....','...bbbbbb...','..bbwkwkbb..','...aaaaaa...','..aaaccaaa..','.aaaaccaaaa.','.aaaaaaaaaa.','..aaaaaaaa..','............']},
  bomb:{n:'폭탄',hp:35,r:6,rows:['.......c....','......c.....','....bbbb....','..bbbbbbbb..','.bbwkbbwkbb.','.bbbbbbbbbb.','.bbbaaaabbb.','..bbbbbbbb..','....bbbb....','............']},
  golem:{n:'골렘',hp:150,r:9,rows:['...bbbbbb...','..bbaaaabb..','..bawkkwab..','.bbaaaaaabb.','bbaaaccaaabb','bbaaaccaaabb','b.aaaaaaaa.b','..aabbbbaa..','..aab..baa..','.bbb....bbb.']},
  wisp:{n:'도깨비불',hp:45,r:6,rows:['.....c......','....cac.....','...caaac....','..caaaaac...','..aawkwka...','..aaaaaaa...','...aaaaa....','....aaa.a...','.....a...a..','............']},
  drone:{n:'드론',hp:60,r:7,rows:['bbbb....bbbb','..b......b..','..bbbbbbbb..','.baaaaaaaab.','baawkkkwaaab','baaaaccaaaab','.baaaaaaaab.','..bbbbbbbb..','...b....b...','............']},
  spider:{n:'거미',hp:55,r:7,rows:['............','b..b....b..b','.b.bbbbbb.b.','..bbaaaabb..','bbbawkwkabbb','..baaaaaab..','.b.baccab.b.','b..b.bb.b..b','............','............']},
  knight:{n:'방패병',hp:110,r:7,rows:['....bbbb....','...baaaab...','...bwkwkb...','....bbbb....','.cc.aaaa....','ccc.aaaaa.b.','ccc.aaaa..b.','.cc.abba..b.','....a..a....','...bb..bb...']}};
 const SPK=Object.keys(SP);
 /* v73 정예 이름 */const ELN={slime:'슬라임 왕',bat:'흡혈 박쥐',archer:'명사수',boar:'철갑 돌진수',gear:'황금 톱니',mage:'대마법사',bomb:'가시 기뢰',golem:'수정 골렘',wisp:'해골불 왕',drone:'포격 드론',spider:'여왕 거미',knight:'근위 기사'};TW.ELN=ELN;
 /* 구역 색: 챕터 1~7 */
 const ZPAL=[
  {n:'태엽',a:'#9fb3c8',b:'#3c4a5c',c:'#5affd8',fl:'#1a2430',fl2:'#212e3c',wall:'#2b3a4c'},
  {n:'굶주린',a:'#8fd06a',b:'#2e4a26',c:'#c86aff',fl:'#16201a',fl2:'#1c2a20',wall:'#24341f'},
  {n:'기원의',a:'#e8c66a',b:'#5a4420',c:'#5ad8c8',fl:'#221c12',fl2:'#2a2216',wall:'#3a2e18'},
  {n:'일식',a:'#c8b8ff',b:'#3a2e66',c:'#ffffff',fl:'#16122a',fl2:'#1c1834',wall:'#2a2248'},
  {n:'심연',a:'#5ab8e8',b:'#123050',c:'#7ff0e0',fl:'#0a1828',fl2:'#0e2034',wall:'#123048'},
  {n:'천공',a:'#e8f4ff',b:'#5a7aa0',c:'#ffd166',fl:'#1e2a3a',fl2:'#243446',wall:'#33476a'},
  {n:'거울',a:'#ff6a8a',b:'#3a0a18',c:'#e8e0ff',fl:'#1a0c12',fl2:'#221016',wall:'#36121e'}];
 const zoneOf=f=>Math.floor((f-1)/10);
 const palOf=z=>ZPAL[Math.floor((z%70)/10)];
 function speciesOf(z){const a=SPK[z%12];let b=SPK[(z*7+5)%12];if(b===a)b=SPK[(z+6)%12];return [a,b]}
 TW.zoneMobs=z=>speciesOf(z).map(k=>palOf(z).n+' '+SP[k].n);
 const sprCache=new Map();
 function spr(k,pal,elite){const key=k+'|'+pal.n+'|'+(elite?1:0);let c=sprCache.get(key);if(c)return c;
  const rows=SP[k].rows,col={a:pal.a,b:pal.b,c:pal.c,w:'#ffffff',k:'#05070a'};c=document.createElement('canvas');c.width=14;c.height=12;const o=c.getContext('2d');
  /* 외곽선 */o.fillStyle=elite?'#ffd166':'#05070a';for(let y=0;y<rows.length;y++)for(let x=0;x<12;x++){if(rows[y][x]==='.')continue;for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]])o.fillRect(x+1+dx,y+1+dy,1,1)}
  for(let y=0;y<rows.length;y++)for(let x=0;x<12;x++){const ch=rows[y][x];if(ch==='.')continue;o.fillStyle=col[ch];o.fillRect(x+1,y+1,1,1)}
  sprCache.set(key,c);return c}
 TW.spr=spr;TW.SP=SP;TW.ZPAL=ZPAL;

 /* ---------- 상태 ---------- */
 const T={};let last=0;
 const now0=()=>performance.now();
 function addPop(x,y,tx,col){T.pops.push({x,y,tx,col,t:T.clk})}
 function burst(x,y,n,col,spd){for(let i=0;i<n;i++){const a=Math.random()*6.28,v=rnd(.3,1)*(spd||90);T.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-20,l:rnd(.3,.7),t:T.clk,col})}if(T.parts.length>260)T.parts.splice(0,T.parts.length-260)}
 function hpMul(){return {easy:.8,normal:1,hard:1.25,extreme:1.5}[diff]||1}
 function dmgMul(){return {easy:.7,normal:1,hard:1.3,extreme:1.6}[diff]||1}

 function buildFloor(f){const z=zoneOf(f),k=((f-1)%10)+1,tier=Math.floor(z/70),pal=palOf(z),[s1,s2]=speciesOf(z);
  Object.assign(T,{f,z,k,pal,mobs:[],shots:[],tels:[],parts:[],pops:[],slash:[],clk:0,clear:false,clearT:0,doorK:0,trans:{t:0,txt:f+'F',sub:pal.n+' 구역 · '+TW.zoneMobs(z).join(' · ')},dead:false,spawned:false});
  const n=3+Math.floor(k/3)+Math.min(3,Math.floor(z/8))+tier,hpz=(1+z*.12+tier*.8)*hpMul();
  const list=[];for(let i=0;i<n;i++)list.push({sp:i%3===2?s2:s1,elite:false});
  if(k===5)list.push({sp:s2,elite:true});if(k===9){list.push({sp:s1,elite:true});list.push({sp:s2,elite:true})}
  list.forEach((m,i)=>{let x,y,tries=0;do{x=rnd(AX+30,AX+AW-30);y=rnd(AY+30,AY+AH-90);tries++}while(tries<20&&Math.hypot(x-(AX+AW/2),y-(AY+AH-30))<90);
   const S=SP[m.sp],hp=Math.round(S.hp*hpz*(m.elite?3.5:1));
   T.mobs.push({sp:m.sp,elite:m.elite,x,y,vx:0,vy:0,hp,max:hp,s:m.elite?1.5:1,born:.5+i*.12,st:'idle',st0:0,cd:rnd(.6,2),face:1,hitT:-9,stunT:-9,ang:Math.random()*6.28,seed:Math.random()*99})});
  P.x=AX+AW/2;P.y=AY+AH-24;P.face={x:0,y:-1};P.dash=null;P.lungeT=0;P.slowT=0;try{prewarm()}catch(e){}}

 /* ---------- 들어가기 · 나가기 ---------- */
 function hud(on){try{$('bossName').style.visibility=on?'hidden':'';const bA=$('btnA');if(bA){bA.style.display='';bA.textContent='ATTACK'}$('touch').style.display='';try{ensureParryBtn()}catch(e){}const bp=$('btnP');if(bp)bp.style.display=''}catch(e){}}
 function music(){try{stopMusic();startMusic(makeCaveSong(T.z%20),performance.now(),0)}catch(e){}}
 TW.start=function(f){const s=sv();f=f||s.floor||1;initAudio();story=false;try{if(typeof CS!=='undefined')CS=null}catch(e){}
  enterGame();$('overlay').hidden=true;mode='tower';paused=false;try{resetP(AX+AW/2,AY+AH-24)}catch(e){}
  T.ult=0;T.combo=0;T.kills=0;T.score=0;
  if(f%10===0){goBoss(f);return}
  buildFloor(f);hud(true);music();$('bvTitle').textContent='BEAT BLADE · 탑 '+f+'F';last=performance.now()};
 function nextFloor(){const s=sv();const f=T.f+1;s.floor=f;s.best=Math.max(s.best||1,f);try{saveNow()}catch(e){}
  try{addCoins(T.k===9?12:6)}catch(e){}
  if(f%10===0){goBoss(f);return}
  P.hp=Math.min(P.maxhp,P.hp+Math.round(P.maxhp*.15));buildFloor(f);$('bvTitle').textContent='BEAT BLADE · 탑 '+f+'F';
  try{sfx(660,.2,'triangle',.04,1320)}catch(e){}}
 /* 보스 층: 짧은 소개 뒤 보스 전투 */
 function goBoss(f){const g=zoneOf(f),B=bossOf(g);T.f=f;T.z=g;T.pal=palOf(g);T.bossCard={t:0,g,B};mode='tower';hud(true);
  $('bvTitle').textContent='BEAT BLADE · 탑 '+f+'F · BOSS';try{stopMusic()}catch(e){}try{sfx(110,.6,'sawtooth',.05,55)}catch(e){}
  T.mobs=[];T.shots=[];T.tels=[];T.parts=T.parts||[];T.pops=[];T.slash=[];T.clk=0;T.trans=null;T.clear=false}
 function launchBoss(){const {g}=T.bossCard;T.bossCard=null;const f=T.f;mode='menu';
  try{bossStart(g)}catch(e){console.error('tower boss',e);toLobby();return}
  try{G.tw71={g,f}}catch(e){}}
 TW.leave=function(){T.mobs=[];T.bossCard=null};

 /* ---------- 보스 전투가 끝나면 탑으로 ---------- */
 {const _fe=fightEnd;fightEnd=function(won){const tw=G&&G.tw71;const r=_fe.apply(this,arguments);
  if(tw&&!tw.watch){tw.watch=1;const t0=performance.now();const poll=()=>{if(!G||G.tw71!==tw)return;const ov=!$('overlay').hidden;
    if((G.state==='result'&&(ov||performance.now()-t0>2600))||performance.now()-t0>15000){bossDone(!!G.won,tw);return}setTimeout(poll,250)};setTimeout(poll,300)}
  return r}}
 function bossDone(won,tw){if(tw.done)return;tw.done=1;const s=sv(),B=bossOf(tw.g);
  if(won){if(tw.g<70)grant(tw.g);s.bosses=Math.max(s.bosses||0,tw.g+1);s.floor=tw.f+1;s.cp=tw.f+1;s.best=Math.max(s.best||1,tw.f+1);try{saveNow()}catch(e){}
   const nz=zoneOf(tw.f+1);
   showOverlay('TOWER · '+tw.f+'F CLEAR','보스 격파!','<b style="color:'+B.c+'">'+B.name+'</b>을(를) 쓰러뜨렸어요.<br>보스 러시에서도 다시 만날 수 있어요.<br><br>다음 구역 <b>'+(tw.f+1)+'F~'+(tw.f+9)+'F</b>: '+TW.zoneMobs(nz).join(' · ')+(tw.f+10<=700?'<br>다음 보스('+(tw.f+10)+'F): <b>'+bossOf(nz).name+'</b>':''),
    [['▲ '+(tw.f+1)+'F 오르기',()=>{$('overlay').hidden=true;TW.start(tw.f+1)},true],['로비로',toLobby,false]])}
  else showOverlay('TOWER · '+tw.f+'F','보스에게 졌어요','<b style="color:'+B.c+'">'+B.name+'</b>은(는) 아직 버티고 있어요. 이 층에서 바로 다시 도전할 수 있어요.',
    [['↺ 다시 도전',()=>{$('overlay').hidden=true;TW.start(tw.f)},true],['로비로',toLobby,false]])}

 /* ---------- 조작 ---------- */
 function beatGood(){const ms=mus.ms||600,b=(performance.now()-mus.T0)/ms,err=Math.abs(b-Math.round(b))*ms;return err<=70?2:err<=130?1:0}
 function attack(){if(T.bossCard||T.trans&&T.trans.t<.7||T.dead)return;const now=performance.now();if(now<(P.atkCd||0))return;P.atkCd=now+230;initAudio();
  let best=null,bd=40;for(const m of T.mobs){if(m.hp<=0||m.born>0)continue;const d=Math.hypot(m.x-P.x,m.y-(P.y-6));if(d<bd){bd=d;best=m}}
  const a=best?Math.atan2(best.y-(P.y-6),best.x-P.x):Math.atan2(P.face.y||0,P.face.x||(P.face.y?0:1));
  P.lungeT=now;P.lungeA=a;P.lungeDur=130;if(Math.cos(a)!==0)P.face={x:Math.cos(a),y:Math.sin(a)};
  const bg=beatGood(),mult=bg===2?1.5:bg===1?1.2:1,w=curWp();let hit=0;
  T.slash.push({x:P.x,y:P.y-8,a,t:T.clk,col:(w&&w.trail)||'#ffffff',good:bg});
  for(const m of T.mobs){if(m.hp<=0||m.born>0)continue;const dx=m.x-P.x,dy=m.y-(P.y-6),d=Math.hypot(dx,dy);if(d>34+SP[m.sp].r*m.s)continue;
   const da=Math.abs(((Math.atan2(dy,dx)-a+9.42)%6.28)-3.14);if(d>14&&da>1.25)continue;
   const crit=Math.random()<((w&&w.crit)||0),armor=m.sp==='knight'&&T.clk>m.stunT+1.2&&Math.cos(Math.atan2(-dy,-dx)-(m.face>0?0:3.14))>.3?.55:1;
   let dmg=Math.round(34*((w&&w.dmg)||1)*(1+(curPet().dmg||0))*mult*(crit?1.8:1)*armor*(1+Math.min(T.combo,20)*.02));
   m.hp-=dmg;m.hitT=T.clk;m.vx+=Math.cos(a)*90;m.vy+=Math.sin(a)*90;hit++;
   addPop(m.x,m.y-12,(crit?'CRIT ':'')+(bg===2?'PERFECT ':'')+dmg,bg===2?'#ffe79a':crit?'#ff9a5a':'#ffffff');burst(m.x,m.y,6,T.pal.c,70);
   if(m.hp<=0)kill(m)}
  if(hit){T.combo++;T.score=(T.score||0)+hit*(bg===2?150:bg===1?110:80)*(1+Math.min(T.combo,20)*.05)|0;T.ult=Math.min(100,T.ult+3+hit*2);try{sfx(320+Math.min(T.combo,14)*22+(bg===2?80:0),.12,'triangle',.05,90);sfx(160,.1,'square',.04,60)}catch(e){};T.shake=Math.max(T.shake||0,.12);T.stop=now+40}
  else try{sfx(230,.06,'triangle',.025,70)}catch(e){}}
 function kill(m){m.hp=0;T.score=(T.score||0)+(m.elite?2000:400);m.dieT=T.clk;T.kills++;sv().kills=(sv().kills||0)+1;T.ult=Math.min(100,T.ult+(m.elite?25:10));burst(m.x,m.y,m.elite?40:20,T.pal.a,140);burst(m.x,m.y,10,'#ffffff',90);
  try{sfx(m.elite?180:300,.18,'square',.05,80);sfx(520,.1,'sine',.03,1100)}catch(e){};T.shake=Math.max(T.shake||0,m.elite?.5:.25);try{addCoins(m.elite?8:2)}catch(e){}
  addPop(m.x,m.y-20,m.elite?'+8 🪙':'+2 🪙','#ffd166')}
 function dash(){if(T.bossCard||T.dead)return;const now=performance.now();if(now<P.dashCd)return;let [ix,iy]=moveInput();if(!ix&&!iy){ix=P.face.x;iy=P.face.y}const l=Math.hypot(ix,iy)||1;ix/=l;iy/=l;
  const g=beatGood()>0,ms=mus.ms||600;P.dash={t0:now,dur:150,vx:ix*290,vy:iy*290};P.inv=Math.max(P.inv,now+(g?520:300));P.dashCd=now+ms*.9;try{sfx(g?520:330,.09,'sawtooth',.03,g?900:200)}catch(e){}}
 function parry(){if(T.bossCard||T.dead)return;const now=performance.now();if(now<(P.parryCd||0))return;P.parryCd=now+520;P.parryT=T.clk;let n=0;
  for(const s of T.shots){if(s.mine)continue;if(Math.hypot(s.x-P.x,s.y-(P.y-8))<34){s.mine=true;const m=nearest(s.x,s.y);const a=m?Math.atan2(m.y-s.y,m.x-s.x):Math.atan2(-s.vy,-s.vx),v=Math.hypot(s.vx,s.vy)*1.6+60;s.vx=Math.cos(a)*v;s.vy=Math.sin(a)*v;s.col='#ffe79a';n++}}
  for(const m of T.mobs){if(m.hp<=0)continue;if(Math.hypot(m.x-P.x,m.y-P.y)<36){m.stunT=T.clk;m.st='idle';m.cd=1.2;const a=Math.atan2(m.y-P.y,m.x-P.x);m.vx+=Math.cos(a)*160;m.vy+=Math.sin(a)*160;n++}}
  if(n){P.inv=Math.max(P.inv,now+300);addPop(P.x,P.y-28,'PARRY!','#ffe79a');T.ult=Math.min(100,T.ult+8);try{sfx(1200,.12,'square',.04,1800)}catch(e){}}else try{sfx(500,.06,'sine',.02,300)}catch(e){}}
 /* v72 궁극기: 시간이 멈추고 → 컷인 → 적마다 연속 베기 → 화면을 가르는 마지막 일격 */
 function ultCol(){try{const th=window.DELUXE60&&DELUXE60.theme();if(th&&th.c)return [th.c,th.c2||'#ffffff']}catch(e){}const w=curWp()||{};return [w.trail||'#8ad8ff','#ffffff']}
 function ult(){if(T.ult<100||T.bossCard||T.dead||T.U)return;T.ult=0;const [c1,c2]=ultCol(),live=T.mobs.filter(m=>m.hp>0&&m.born<=0);const hits=[];let at=.55;
  live.forEach((m,i)=>{for(let j=0;j<3;j++){hits.push({m,at,a:Math.random()*6.28,j});at+=.055}});
  T.U={t0:T.clk,hits,c1,c2,end:Math.max(1.45,at+.45),fin:at+.05,finDone:false,name:((curWp()||{}).name)||'검'};P.inv=performance.now()+4000;T.shots=[];T.tels=[];
  try{sfx(60,.9,'sawtooth',.06,30);sfx(400,.5,'triangle',.04,1600);setTimeout(()=>sfx(1800,.3,'sine',.03,2600),400)}catch(e){}}
 function ultTick(){const U=T.U,e=T.clk-U.t0;
  for(const h of U.hits){if(h.done||e<h.at)continue;h.done=1;const m=h.m;if(m.hp<=0)continue;const d=Math.round(70*((curWp()||{}).dmg||1)*(m.elite?.8:1.2));m.hp-=d;m.hitT=T.clk;
   addPop(m.x+rnd(-6,6),m.y-14-h.j*6,'-'+d,h.j===2?'#ffd166':'#ffffff');burst(m.x,m.y,10,U.c1,160);T.shake=Math.max(T.shake||0,.35);try{sfx(500+h.j*180,.07,'square',.04,180)}catch(e){}if(m.hp<=0)kill(m)}
  if(!U.finDone&&e>=U.fin){U.finDone=1;T.shake=1;for(const m of T.mobs){if(m.hp<=0||m.born>0)continue;const d=Math.round(160*((curWp()||{}).dmg||1)*(m.elite?.7:1.4));m.hp-=d;m.hitT=T.clk;addPop(m.x,m.y-24,'ULT -'+d,'#ffd166');burst(m.x,m.y,24,U.c2,200);if(m.hp<=0)kill(m)}
   try{sfx(70,.7,'square',.07,30);sfx(1200,.4,'sawtooth',.04,200)}catch(e){}}
  if(e>=U.end){T.U=null;P.inv=performance.now()+400}}
 function drawUlt(now){const U=T.U;if(!U)return;const e=T.clk-U.t0;
  /* 어둡게 + 집중선 */A(Math.min(.72,e*3)*(e>U.end-.25?Math.max(0,(U.end-e)/.25):1));ctx.fillStyle='#03040a';ctx.fillRect(0,0,W,H);
  ctx.strokeStyle=U.c1;for(let i=0;i<28;i++){const a=i/28*6.28+e*.4,r0=60+((i*37)%30);A(.18);ctx.beginPath();ctx.moveTo(P.x+Math.cos(a)*r0,P.y-8+Math.sin(a)*r0);ctx.lineTo(P.x+Math.cos(a)*420,P.y-8+Math.sin(a)*420);ctx.stroke()}A(1);
  /* 영웅 빛 */const g=ctx.createRadialGradient(P.x,P.y-10,0,P.x,P.y-10,40);g.addColorStop(0,U.c1);g.addColorStop(1,'rgba(0,0,0,0)');ctx.globalCompositeOperation='lighter';A(.6);ctx.fillStyle=g;ctx.fillRect(P.x-40,P.y-50,80,80);ctx.globalCompositeOperation='source-over';A(1);
  /* 다시 그린 적 (어둠 위에) */for(const m of T.mobs)if(m.hp>0||T.clk-(m.dieT||0)<.35)drawMob(m);
  /* 컷인 띠 */if(e<.75){const k=Math.min(1,e/.18),out=e>.58?(e-.58)/.17:0,bx=-W*(1-k)+W*out*1.2;ctx.save();ctx.translate(bx,0);ctx.transform(1,-.12,0,1,0,40);
   A(.92);ctx.fillStyle='#05070a';ctx.fillRect(0,H/2-38,W,76);ctx.fillStyle=U.c1;ctx.fillRect(0,H/2-38,W,3);ctx.fillRect(0,H/2+35,W,3);A(.25);for(let i=0;i<12;i++)ctx.fillRect((i*47+e*600)%W,H/2-30+(i%5)*13,30,1);A(1);
   const om=mode;mode='village';try{drawKnight(ctx,60,H/2-34,5,false,null,now/430)}catch(_){}finally{mode=om}
   ctx.font='900 9px sans-serif';ctx.fillStyle=U.c1;ctx.fillText('ULTIMATE',200,H/2-12);ctx.font='900 24px sans-serif';ctx.fillStyle='#ffffff';ctx.fillText(U.name+' · 해방',200,H/2+14);ctx.restore();A(1)}
  /* 연속 베기 줄 */for(const h of U.hits){const d=e-h.at;if(d<-.02||d>.16)continue;const m=h.m,q=clampN(d/.16,0,1),L=70;ctx.save();ctx.translate(m.x,m.y-6);ctx.rotate(h.a);ctx.globalCompositeOperation='lighter';
   A(1-q);ctx.fillStyle=U.c1;ctx.fillRect(-L,-2.5*(1-q),L*2,5*(1-q));ctx.fillStyle='#ffffff';ctx.fillRect(-L,-.8,L*2,1.6);ctx.restore();ctx.globalCompositeOperation='source-over';A(1)}
  /* 마지막 일격: 화면을 가르는 X자 + 하얀 번쩍임 + 충격파 */const f=e-U.fin;if(f>-.1&&f<.6){const q=clampN((f+.1)/.25,0,1);ctx.save();ctx.globalCompositeOperation='lighter';
   for(const [a,c] of [[.35,U.c1],[-.35,U.c2]]){ctx.save();ctx.translate(W/2,AY+AH/2);ctx.rotate(a);A(f<0?.5:Math.max(0,1-f/.5));ctx.fillStyle=c;ctx.fillRect(-W*q,-4,W*2*q,8);ctx.fillStyle='#ffffff';ctx.fillRect(-W*q,-1.2,W*2*q,2.4);ctx.restore()}
   ctx.restore();if(f>0){A(Math.max(0,.85-f*2.4));ctx.fillStyle='#ffffff';ctx.fillRect(0,0,W,H);A(Math.max(0,1-f/.6));ctx.strokeStyle=U.c1;ctx.lineWidth=4;ctx.beginPath();ctx.arc(P.x,P.y-8,f*520,0,6.28);ctx.stroke();ctx.lineWidth=1;
    A(Math.max(0,1-f/.6));ctx.textAlign='center';ctx.font='900 30px sans-serif';ctx.fillStyle='#000';ctx.fillText('ULTIMATE!',W/2+2,H/2+12);ctx.fillStyle='#ffe79a';ctx.fillText('ULTIMATE!',W/2,H/2+10);ctx.textAlign='left'}A(1)}}
 function nearest(x,y){let b=null,bd=1e9;for(const m of T.mobs){if(m.hp<=0||m.born>0)continue;const d=Math.hypot(m.x-x,m.y-y);if(d<bd){bd=d;b=m}}return b}
 /* 기존 입력이 탑에서도 통하게 */
 {const f=doAttack;doAttack=function(){if(mode==='tower'){if(dlg.active){dlgAdvance();return}if(!paused)attack();return}return f.apply(this,arguments)}}
 {const f=doDash;doDash=function(){if(mode==='tower'){if(!paused)dash();return}return f.apply(this,arguments)}}
 if(typeof tryParry==='function'){const f=tryParry;tryParry=function(){if(mode==='tower'){if(!paused)parry();return}return f.apply(this,arguments)}}
 if(typeof tryUlt==='function'){const f=tryUlt;tryUlt=function(){if(mode==='tower'){if(!paused)ult();return}return f.apply(this,arguments)}}
 addEventListener('keydown',e=>{if(mode!=='tower'||paused||e.repeat)return;if(e.code==='KeyF'||e.code==='KeyL'){e.preventDefault();parry()}else if(e.code==='KeyC'){e.preventDefault();ult()}});

 /* ---------- 피해 ---------- */
 function hurt(dmg,src){const now=performance.now();if(now<P.inv||T.dead||T.clear)return;dmg=Math.max(1,Math.round(dmg*dmgMul()));P.hp-=dmg;P.inv=now+900;T.combo=0;T.shake=Math.max(T.shake||0,.35);T.flash=.35;
  addPop(P.x,P.y-26,'-'+dmg,'#ff4d6d');try{sfx(140,.2,'sawtooth',.05,60)}catch(e){}
  if(P.hp<=0){P.hp=0;die()}}
 function die(){T.dead=true;const s=sv(),cp=Math.max(1,zoneOf(T.f)*10+1);s.floor=cp;try{saveNow()}catch(e){};try{stopMusic()}catch(e){}
  setTimeout(()=>{if(mode!=='tower')return;showOverlay('TOWER · '+T.f+'F','쓰러졌어요','<b>'+T.f+'F</b>까지 올랐어요. (최고 '+(s.best||T.f)+'F)<br>이 구역의 첫 층 <b>'+cp+'F</b>부터 다시 올라요.',
   [['↺ '+cp+'F부터 다시',()=>{$('overlay').hidden=true;TW.start(cp)},true],['로비로',toLobby,false]])},900)}

 /* ---------- 잡몹 움직임 ---------- */
 function shoot(m,a,v,dmg,r,col){m.hitPose=T.clk;T.shots.push({x:m.x,y:m.y-4,vx:Math.cos(a)*v,vy:Math.sin(a)*v,dmg,r:r||3,col:col||T.pal.c,t:T.clk,web:m.sp==='spider'})}
 function updMob(m,dt){const sp=SP[m.sp],px=P.x,py=P.y-6,dx=px-m.x,dy=py-m.y,d=Math.hypot(dx,dy)||1,a=Math.atan2(dy,dx),el=m.elite?.75:1,stun=T.clk<m.stunT+1.1;
  if(m.born>0){m.born-=dt;return}
  m.face=dx>=0?1:-1;m.cd-=dt;let tvx=0,tvy=0;const t=T.clk-m.st0;
  if(!stun)switch(m.sp){
   case 'slime':if(m.st==='hop'){if(t>.35)m.st='idle'}else if(m.cd<=0){m.st='hop';m.st0=T.clk;m.cd=1*el;m.hitPose=T.clk-.1;m.hx=Math.cos(a)*85;m.hy=Math.sin(a)*85}if(m.st==='hop'){tvx=m.hx;tvy=m.hy}break;
   case 'bat':{const s=Math.sin(T.clk*5+m.seed)*60;tvx=Math.cos(a)*70-Math.sin(a)*s;tvy=Math.sin(a)*70+Math.cos(a)*s;break}
   case 'archer':{const want=d<90?-1:d>140?1:0;tvx=Math.cos(a)*40*want;tvy=Math.sin(a)*40*want;
    if(m.st==='aim'){if(t>.5){shoot(m,a,115,8);m.st='idle';m.cd=2.2*el}}else if(m.cd<=0){m.st='aim';m.st0=T.clk}break}
   case 'boar':if(m.st==='wind'){if(t>.6){m.st='run';m.st0=T.clk;m.hitPose=T.clk+.25}}else if(m.st==='run'){tvx=Math.cos(m.ra)*250;tvy=Math.sin(m.ra)*250;if(t>.5){m.st='idle';m.cd=2.6*el}}
    else{tvx=Math.cos(a)*25;tvy=Math.sin(a)*25;if(m.cd<=0){m.st='wind';m.st0=T.clk;m.ra=a}}break;
   case 'gear':if(!m.bx){const b=Math.random()*6.28;m.bx=Math.cos(b)*85;m.by=Math.sin(b)*85}tvx=m.bx;tvy=m.by;break;
   case 'mage':if(m.st==='fade'){if(t>.35){const b=Math.random()*6.28,r=rnd(70,110);m.x=clampN(P.x+Math.cos(b)*r,AX+16,AX+AW-16);m.y=clampN(P.y+Math.sin(b)*r,AY+20,AY+AH-16);m.st='cast';m.st0=T.clk}}
    else if(m.st==='cast'){if(t>.45){for(const o of [-.3,0,.3])shoot(m,a+o,95,7);m.st='idle';m.cd=3*el}}else if(m.cd<=0){m.st='fade';m.st0=T.clk}break;
   case 'bomb':if(m.st==='fuse'){if(t>.8){T.tels.push({k:'c',x:m.x,y:m.y,r:34*m.s,t1:T.clk,t2:T.clk+.18,dmg:14,boom:1});m.hp=0;m.dieT=T.clk;burst(m.x,m.y,30,'#ff9a3a',160);try{sfx(70,.4,'sawtooth',.06,30)}catch(e){}}}
    else{tvx=Math.cos(a)*55;tvy=Math.sin(a)*55;if(d<34){m.st='fuse';m.st0=T.clk;T.tels.push({k:'c',x:m.x,y:m.y,r:34*m.s,t0:T.clk,t1:T.clk+.8,t2:T.clk+.8,dmg:0,warn:1})}}break;
   case 'golem':if(m.st==='wind'){if(t>.8){T.tels.push({k:'c',x:m.x,y:m.y,r:42*m.s,t1:T.clk,t2:T.clk+.15,dmg:16});m.hitPose=T.clk;m.st='idle';m.cd=2.4*el;T.shake=Math.max(T.shake||0,.3);try{sfx(60,.3,'square',.05,30)}catch(e){}}}
    else{tvx=Math.cos(a)*28;tvy=Math.sin(a)*28;if(d<48&&m.cd<=0){m.st='wind';m.st0=T.clk;T.tels.push({k:'c',x:m.x,y:m.y,r:42*m.s,t0:T.clk,t1:T.clk+.8,t2:T.clk+.8,dmg:0,warn:1})}}break;
   case 'wisp':{m.ang+=dt*1.1;const tx=P.x+Math.cos(m.ang)*80,ty=P.y+Math.sin(m.ang)*60;tvx=(tx-m.x)*2;tvy=(ty-m.y)*2;if(m.cd<=0){for(let i=0;i<8;i++)shoot(m,i/8*6.28+m.ang,70,6,3);m.cd=3.2*el}break}
   case 'drone':{const want=d<110?-1:d>160?1:0;tvx=Math.cos(a)*45*want-Math.sin(a)*25;tvy=Math.sin(a)*45*want+Math.cos(a)*25;
    if(m.st==='aim'){if(t>.7){T.tels.push({k:'l',x:m.x,y:m.y,a:m.la,len:420,w:7,t1:T.clk,t2:T.clk+.25,dmg:12});m.hitPose=T.clk;m.st='idle';m.cd=3.2*el;try{sfx(1400,.25,'sawtooth',.03,300)}catch(e){}}}
    else if(m.cd<=0){m.st='aim';m.st0=T.clk;m.la=a;T.tels.push({k:'l',x:m.x,y:m.y,a,len:420,w:7,t0:T.clk,t1:T.clk+.7,t2:T.clk+.7,dmg:0,warn:1,own:m})}break}
   case 'spider':if(m.st==='run'){tvx=m.rx;tvy=m.ry;if(t>.4){m.st='idle';m.st0=T.clk}}else{if(t>.6){const b=a+rnd(-1.2,1.2);m.rx=Math.cos(b)*110;m.ry=Math.sin(b)*110;m.st='run';m.st0=T.clk}}
    if(m.cd<=0){shoot(m,a,90,4,4,'#e8e8f0');m.cd=2.6*el}break;
   case 'knight':if(m.st==='wind'){if(t>.45){T.tels.push({k:'c',x:m.x+Math.cos(m.ra)*14,y:m.y+Math.sin(m.ra)*14,r:22*m.s,t1:T.clk,t2:T.clk+.12,dmg:12});m.hitPose=T.clk;m.st='idle';m.cd=1.6*el;try{sfx(260,.1,'square',.04,120)}catch(e){}}}
    else{tvx=Math.cos(a)*38;tvy=Math.sin(a)*38;if(d<30&&m.cd<=0){m.st='wind';m.st0=T.clk;m.ra=a}}break}
  m.vx+=(tvx-m.vx)*Math.min(1,dt*8);m.vy+=(tvy-m.vy)*Math.min(1,dt*8);if(m.sp==='gear'&&!stun){m.vx=tvx;m.vy=tvy}
  m.x+=m.vx*dt;m.y+=m.vy*dt;
  const r=sp.r*m.s;if(m.x<AX+r){m.x=AX+r;if(m.bx)m.bx=Math.abs(m.bx)}if(m.x>AX+AW-r){m.x=AX+AW-r;if(m.bx)m.bx=-Math.abs(m.bx)}
  if(m.y<AY+18+r){m.y=AY+18+r;if(m.by)m.by=Math.abs(m.by)}if(m.y>AY+AH-r){m.y=AY+AH-r;if(m.by)m.by=-Math.abs(m.by)}
  /* 몸 박치기 */const touch=Math.hypot(m.x-P.x,m.y-(P.y-6))<r+6;if(touch&&!stun&&!['archer','mage','drone','wisp'].includes(m.sp))hurt(m.sp==='boar'&&m.st==='run'?12:m.sp==='golem'?10:m.sp==='gear'?9:6)}

 function update(now,dt){T.clk+=dt;if(T.warm&&T.warm.length){const t0=performance.now();while(T.warm.length&&performance.now()-t0<(T.trans?14:5)){const j=T.warm.shift();mobFrame(j[0],T.pal,j[1],j[2],j[3],j[4])}}if(T.stop&&now<T.stop)return;
  if(T.U){ultTick();T.shake=Math.max(0,(T.shake||0)-dt*2.2);if(!T.dead){stepPlayer(dt,now,(dx,dy)=>{P.x=clampN(P.x+dx,AX+8,AX+AW-8);P.y=clampN(P.y+dy,AY+22,AY+AH-3)},40)}T.mobs=T.mobs.filter(m=>m.hp>0||T.clk-(m.dieT||0)<.35);return}
  if(T.bossCard){T.bossCard.t+=dt;if(T.bossCard.t>2.9)launchBoss();return}
  if(T.trans){T.trans.t+=dt;if(T.trans.t>1.3)T.trans=null}
  if(!T.dead){const sp=(P.slowT&&T.clk<P.slowT)?62:105;stepPlayer(dt,now,(dx,dy)=>{P.x=clampN(P.x+dx,AX+8,AX+AW-8);P.y=clampN(P.y+dy,AY+22,AY+AH-3)},sp)}
  for(const m of T.mobs)if(m.hp>0)updMob(m,dt);
  /* 서로 겹치지 않게 */for(let i=0;i<T.mobs.length;i++)for(let j=i+1;j<T.mobs.length;j++){const a=T.mobs[i],b=T.mobs[j];if(a.hp<=0||b.hp<=0)continue;const dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1,R=SP[a.sp].r*a.s+SP[b.sp].r*b.s;if(d<R){const p=(R-d)/2;a.x-=dx/d*p;a.y-=dy/d*p;b.x+=dx/d*p;b.y+=dy/d*p}}
  for(const s of T.shots){s.x+=s.vx*dt;s.y+=s.vy*dt;
   if(s.mine){for(const m of T.mobs){if(m.hp<=0)continue;if(Math.hypot(m.x-s.x,m.y-s.y)<SP[m.sp].r*m.s+s.r){const d=Math.round(40*((curWp()||{}).dmg||1));m.hp-=d;m.hitT=T.clk;addPop(m.x,m.y-12,'REFLECT '+d,'#ffe79a');if(m.hp<=0)kill(m);s.dead=1;break}}}
   else if(Math.hypot(s.x-P.x,s.y-(P.y-8))<s.r+5){if(s.web){P.slowT=T.clk+1.2}hurt(s.dmg);s.dead=1}
   if(s.x<AX-10||s.x>AX+AW+10||s.y<AY||s.y>AY+AH+10||T.clk-s.t>6)s.dead=1}
  T.shots=T.shots.filter(s=>!s.dead);
  for(const z of T.tels){if(z.dmg&&!z.hitDone&&T.clk>=z.t1){z.hitDone=1;
    if(z.k==='c'){if(Math.hypot(P.x-z.x,P.y-z.y)<z.r)hurt(z.dmg)}
    else{const dx=P.x-z.x,dy=(P.y-6)-z.y,al=dx*Math.cos(z.a)+dy*Math.sin(z.a),pr=Math.abs(-dx*Math.sin(z.a)+dy*Math.cos(z.a));if(al>0&&al<z.len&&pr<z.w)hurt(z.dmg)}}
   if(z.own&&z.own.hp>0&&z.warn){z.x=z.own.x;z.y=z.own.y}}
  T.tels=T.tels.filter(z=>T.clk<(z.t2||0)+.25&&!(z.own&&z.own.hp<=0));
  T.mobs=T.mobs.filter(m=>m.hp>0||T.clk-(m.dieT||0)<.35);
  if(!T.clear&&!T.dead&&T.mobs.length===0&&T.clk>1){T.clear=true;T.clearT=T.clk;T.shots=[];try{sfx(523,.15,'triangle',.05,784);setTimeout(()=>sfx(784,.25,'triangle',.05,1046),150)}catch(e){}addPop(AX+AW/2,AY+60,'FLOOR CLEAR!','#a6f5c6')}
  if(T.clear){T.doorK=Math.min(1,T.doorK+dt*2);if(T.doorK>=1&&Math.abs(P.x-(AX+AW/2))<18&&P.y<AY+36)nextFloor()}
  T.shake=Math.max(0,(T.shake||0)-dt*2.2);T.flash=Math.max(0,(T.flash||0)-dt*2);
  const bU=$('btnU');if(bU)bU.style.display=T.ult>=100?'':'none'}

 /* ---------- 그리기 ---------- */
 function A(a){ctx.globalAlpha=clampN(a,0,1)}
 /* v72: 배경 = 이 구역 보스의 경기장 그림(보스전과 같은 배경) + 위쪽 계단문 */
 function zoneBossObj(z){const g=((z%70)+70)%70,sv2=GM.rushCh;try{GM.rushCh=Math.floor(g/10);return rqBoss(g%10)}catch(e){return null}finally{GM.rushCh=sv2}}
 TW.zoneBossObj=zoneBossObj;
 const arC=new Map();function arenaOf(z){const k=((z%70)+70)%70;if(arC.has(k))return arC.get(k);let cv=null;try{const o=zoneBossObj(k);if(o)cv=rqArena(o)}catch(e){}arC.set(k,cv);return cv}
 function bg(){const p=T.pal||ZPAL[0],cv=arenaOf(T.z);ctx.fillStyle='#05070a';ctx.fillRect(0,0,W,H);
  if(cv&&cv.width){ctx.drawImage(cv,0,0,cv.width,cv.height,0,0,W,H);A(.18);ctx.fillStyle='#000';ctx.fillRect(AX,AY,AW,AH);A(1)}
  else{for(let y=AY;y<AY+AH;y+=16)for(let x=AX;x<AX+AW;x+=16){ctx.fillStyle=((x-AX)/16+(y-AY)/16)%2?p.fl:p.fl2;ctx.fillRect(x,y,16,16)}}
  /* 박자에 맞춰 테두리가 빛남 (보스전과 같은 느낌) */try{const ms=mus.ms||600,fr=(((performance.now()-mus.T0)/ms)%1+1)%1,on=fr>.88||fr<.06;ctx.fillStyle=p.c;A(on?.45:.1);ctx.fillRect(AX,AY,AW,2);ctx.fillRect(AX,AY+AH-2,AW,2);ctx.fillRect(AX,AY,2,AH);ctx.fillRect(AX+AW-2,AY,2,AH);A(Math.pow(1-fr,2)*.05);ctx.fillRect(AX,AY,AW,AH);A(1)}catch(e){}
  /* 층 번호 */ctx.save();A(.08);ctx.fillStyle='#ffffff';ctx.font='900 72px '+(typeof FONT_STACK!=='undefined'?FONT_STACK:'sans-serif');ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(T.f+'F',AX+AW/2,AY+AH/2+10);ctx.restore();A(1);
  /* 계단문 */const dx=AX+AW/2,k=T.doorK||0;ctx.fillStyle='#05070a';ctx.fillRect(dx-20,AY,40,22);ctx.fillStyle=p.b;ctx.fillRect(dx-22,AY,44,3);ctx.fillRect(dx-22,AY,3,24);ctx.fillRect(dx+19,AY,3,24);ctx.fillStyle=p.c;A(.6);ctx.fillRect(dx-22,AY+3,44,1);A(1);
  if(k>0){for(let i=0;i<5;i++){ctx.fillStyle=i%2?p.c:p.cl||p.c;A(k*(.5+i*.1));ctx.fillRect(dx-16+i*2,AY+19-i*4,32-i*4,3)}
   const g=ctx.createRadialGradient(dx,AY+12,0,dx,AY+12,34);g.addColorStop(0,p.c);g.addColorStop(1,'rgba(0,0,0,0)');ctx.globalCompositeOperation='lighter';A(k*(.35+.2*Math.sin(T.clk*6)));ctx.fillStyle=g;ctx.fillRect(dx-34,AY-22,68,68);ctx.globalCompositeOperation='source-over';
   for(let i=0;i<6;i++){const q=(T.clk*.8+i/6)%1;A(k*(1-q));ctx.fillStyle='#ffffff';ctx.fillRect(dx-12+((i*7)%24),AY+20-q*18,1,2)}
   A(k*(.65+.35*Math.sin(T.clk*5)));ctx.fillStyle='#ffffff';ctx.font='900 9px sans-serif';ctx.textAlign='center';ctx.fillText('▲ 계단',dx,AY+34);ctx.textAlign='left';A(1)}
  else{ctx.fillStyle='#000';ctx.fillRect(dx-17,AY+3,34,19);ctx.fillStyle=p.b;for(let i=0;i<4;i++)ctx.fillRect(dx-17,AY+5+i*4,34,1);ctx.fillStyle=p.c;A(.5+.3*Math.sin(T.clk*3));ctx.fillRect(dx-2,AY+10,4,4);A(1)}}
 /* 잡몹 그림: MON 엔진으로 프레임을 한 번 그려 두고 꺼내 쓴다 (8프레임 × 준비 2단계) */
 /* v72: 방향(앞·옆·뒤) × 자세(서기 4 · 걷기 6 · 준비 2 · 공격 2프레임)를 한 번 그려 두고 잘라서 보관 */
 const MF=new Map(),MR=3,CW=40,CH=40,COX=20,COY=35,NF={i:4,w:6,a:2,s:2};let big=null;
 function mobFrame(k,pal,elite,view,pose,fi){pose=pose||'i';view=view||'front';const n=NF[pose]||4;fi=((fi%n)+n)%n;const key=k+'|'+pal.n+'|'+(elite?1:0)+'|'+view+'|'+pose+'|'+fi;let c=MF.get(key);if(c!==undefined)return c;
  if(MF.size>900)MF.clear();if(!big){big=document.createElement('canvas');big.width=60*MR;big.height=52*MR}const bo=big.getContext('2d');bo.setTransform(1,0,0,1,0,0);bo.clearRect(0,0,big.width,big.height);bo.imageSmoothingEnabled=false;
  const o={pal,elite,view,walk:pose==='w'?fi/n:null,atk:pose==='a'?1:0,hit:pose==='s'?1:0};
  try{if(!monDraw('m_'+k,bo,{c:pal.c},30*MR,44*MR,pose==='i'?fi*250:pose==='a'?fi*90:fi*120,o,MR))c=null;else{c=document.createElement('canvas');c.width=CW*MR;c.height=CH*MR;const cc=c.getContext('2d');cc.drawImage(big,(30-COX)*MR,(44-COY)*MR,CW*MR,CH*MR,0,0,CW*MR,CH*MR)}}catch(e){c=null}
  MF.set(key,c);return c}
 /* 층에 들어갈 때 이 구역 잡몹 그림을 조금씩 미리 그려 둠 (전투 중 끊김 방지) */
 function prewarm(){const [a,b]=speciesOf(T.z),jobs=[];for(const k of [a,b])for(const el of [false,true])for(const v of ['front','side','back'])for(const ps of ['i','w','a','s'])for(let f=0;f<NF[ps];f++)jobs.push([k,el,v,ps,f]);
  T.warm=jobs}
 TW.mobFrame=mobFrame;
 const FLY={bat:1,wisp:1,drone:1};
 function drawMob(m){const sp=SP[m.sp],us=(m.elite?1.85:1.3);let al=1,sx=1,sy=1;
  const sp2=Math.hypot(m.vx,m.vy),strike=m.hitPose!=null&&T.clk-m.hitPose<.28&&T.clk>=m.hitPose,wind=(m.st==='wind'||m.st==='aim'||m.st==='fuse'||m.st==='cast'),pose=strike?'s':wind?'a':sp2>10?'w':'i';
  /* 방향: 공격할 땐 플레이어 쪽, 아니면 움직이는 쪽 */let dx=m.vx,dy=m.vy;if(pose==='a'||pose==='s'||sp2<=10){dx=P.x-m.x;dy=(P.y-6)-m.y}
  if(pose==='w'||pose==='a'||pose==='s'||!m.view){m.view=Math.abs(dy)>Math.abs(dx)*1.15?(dy>0?'front':'back'):'side'}if(Math.abs(dx)>2)m.face=dx>=0?1:-1;
  const n=NF[pose],fi=pose==='w'?Math.floor((m.walkPh=(m.walkPh||0)+sp2*.0019)*n):pose==='i'?Math.floor((T.clk*4+m.seed))%n:Math.floor(T.clk*10)%n;
  const img=window.MOB72?mobFrame(m.sp,T.pal,m.elite,m.view,pose,fi):null;const sideFlip=m.view==='side'&&m.face<0;
  if(m.born>0){al=1-m.born/.5;A(.6);ctx.strokeStyle=T.pal.c;ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(m.x,m.y+6,14*m.s*(1+m.born),5*m.s,0,0,6.28);ctx.stroke();ctx.lineWidth=1;A(1)}
  let bob=0;if(m.sp==='slime'&&m.st==='hop')bob=-Math.sin(clampN((T.clk-m.st0)/.35,0,1)*3.14)*7;
  if(m.sp==='mage'&&m.st==='fade')al*=1-clampN((T.clk-m.st0)/.35,0,1);
  if(m.hp<=0){const q=(T.clk-m.dieT)/.35;al*=1-q;sx*=1+q*.7;sy*=1-q*.7}
  const footY=m.y+sp.r*m.s*.75;
  if(img){ctx.save();ctx.translate(m.x,footY+bob);ctx.scale(sideFlip?-sx:sx,sy);A(al);ctx.drawImage(img,-COX*us,-COY*us,CW*us,CH*us);
   if(T.clk-m.hitT<.12){ctx.globalCompositeOperation='lighter';A(.75);ctx.drawImage(img,-COX*us,-COY*us,CW*us,CH*us);ctx.globalCompositeOperation='source-over'}ctx.restore();A(1)}
  else{const im=spr(m.sp,T.pal,m.elite),s=2*m.s;ctx.save();ctx.translate(m.x,m.y+bob);ctx.scale(m.face<0?-sx:sx,sy);A(al);ctx.drawImage(im,-7*s,-6*s,14*s,12*s);ctx.restore();A(1)}
  const top=footY+bob-(FLY[m.sp]?26:24)*us;
  if(T.clk<m.stunT+1.1&&m.hp>0){ctx.fillStyle='#ffe79a';for(let i=0;i<3;i++){const a=T.clk*6+i*2.1;ctx.fillRect(m.x+Math.cos(a)*8-1,top-3+Math.sin(a)*2,2,2)}}
  /* 정예: 금빛 테두리 + 이름표 (왕관은 이름표와 겹쳐서 뺌) */
  /* 체력바: 늘 보이게 */if(m.hp>0&&m.born<=0){const bw=m.elite?34:20,bh=m.elite?4:3,bx=m.x-bw/2,by=top-(m.elite?2:0),q=Math.max(0,m.hp/m.max);
   ctx.fillStyle='#05070ae6';ctx.fillRect(bx-1,by-1,bw+2,bh+2);ctx.fillStyle='#3a0a14';ctx.fillRect(bx,by,bw,bh);
   if(m.lag==null)m.lag=q;m.lag=Math.max(q,m.lag-.012);ctx.fillStyle='#ffe79a';ctx.fillRect(bx,by,bw*m.lag,bh);
   ctx.fillStyle=m.elite?'#ffd166':(q<.35?'#ff4d6d':'#ff7a5a');ctx.fillRect(bx,by,bw*q,bh);ctx.fillStyle='#ffffff';A(.35);ctx.fillRect(bx,by,bw*q,1);A(1);
   if(m.elite){ctx.font='900 6px sans-serif';ctx.textAlign='center';ctx.fillStyle='#000';ctx.fillText('★ '+ELN[m.sp],m.x+.5,by-3.5);ctx.fillStyle='#ffd166';ctx.fillText('★ '+ELN[m.sp],m.x,by-4);ctx.textAlign='left'}}}
 function drawTels(){for(const z of T.tels){if(z.warn){const q=clampN((T.clk-z.t0)/(z.t1-z.t0),0,1);A(.18+q*.3);ctx.fillStyle='#ff2d55';ctx.strokeStyle='#ff4d6d';
    if(z.k==='c'){ctx.beginPath();ctx.ellipse(z.x,z.y,z.r,z.r*.6,0,0,6.28);ctx.fill();A(.8);ctx.beginPath();ctx.ellipse(z.x,z.y,z.r*q,z.r*.6*q,0,0,6.28);ctx.stroke()}
    else{ctx.save();ctx.translate(z.x,z.y);ctx.rotate(z.a);ctx.fillRect(0,-z.w*q*.5,z.len,z.w*q);A(.7);ctx.fillRect(0,-.5,z.len,1);ctx.restore()}}
   else if(T.clk>=z.t1){const q=clampN((T.clk-z.t1)/((z.t2-z.t1)+.25),0,1);A(1-q);
    if(z.k==='c'){ctx.fillStyle=z.boom?'#ffb35a':'#ffffff';ctx.beginPath();ctx.ellipse(z.x,z.y,z.r*(.8+q*.3),z.r*.6*(.8+q*.3),0,0,6.28);ctx.fill()}
    else{ctx.save();ctx.translate(z.x,z.y);ctx.rotate(z.a);ctx.fillStyle=T.pal.c;ctx.fillRect(0,-z.w/2,z.len,z.w);ctx.fillStyle='#ffffff';ctx.fillRect(0,-z.w/5,z.len,z.w/2.5);ctx.restore()}}}A(1)}
 function drawHero(now){if(T.dead&&Math.floor(now/90)%2)return;try{if(window.DASH70)DASH70.tick(now)}catch(e){}
  const blink=now<P.inv&&Math.floor(now/70)%2===0;if(blink)return;
  A(.4);ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(P.x,P.y+2,9,3,0,0,6.28);ctx.fill();A(1);
  const [lx,ly]=lungeOffset(now),fl=P.face.x<0;const om=mode;mode='village';/* 앞·옆·뒤 모습 · 스킨 연출이 그대로 나오도록 마을처럼 그림 */
  try{drawSword(P.x-12+lx,P.y-19+ly,2,fl,now);drawKnight(ctx,P.x-12+lx,P.y-19+ly,2,fl,P.walkOn?P.walkT:null,P.walkOn?null:now/430)}catch(e){}finally{mode=om}
  if(P.parryT!=null&&T.clk-P.parryT<.25){const q=(T.clk-P.parryT)/.25;ctx.strokeStyle='#ffe79a';A(1-q);ctx.lineWidth=2;ctx.beginPath();ctx.arc(P.x,P.y-8,14+q*20,0,6.28);ctx.stroke();ctx.lineWidth=1;A(1)}}
 function drawSlash(){for(const s of T.slash){const q=(T.clk-s.t)/.18;if(q>=1)continue;ctx.save();ctx.translate(s.x,s.y);ctx.rotate(s.a);ctx.strokeStyle=s.good===2?'#ffe79a':s.col;ctx.lineWidth=3*(1-q)+1;A(1-q);
   ctx.beginPath();ctx.arc(0,0,26,-1.1+q*.4,1.1+q*.4);ctx.stroke();ctx.strokeStyle='#ffffff';ctx.lineWidth=1;ctx.beginPath();ctx.arc(0,0,22,-.8+q*.4,.8+q*.4);ctx.stroke();ctx.restore()}
  T.slash=T.slash.filter(s=>T.clk-s.t<.18);A(1)}
 /* v73: 체력 · 대시 · 궁극기는 보스전과 같은 HUD(250 drawPlayerHUD · 320 drawUltGauge)를 그대로 쓴다 */
 function drawHud(now){const p=T.pal;
  ctx.fillStyle='#05070acc';ctx.fillRect(AX,4,190,24);ctx.fillStyle=p.c;ctx.fillRect(AX,4,3,24);ctx.font='900 13px sans-serif';ctx.fillStyle='#fff';ctx.textBaseline='middle';ctx.fillText(T.f+'F',AX+8,16);
  ctx.font='700 8px sans-serif';ctx.fillStyle=p.a;ctx.fillText(p.n+' 구역 · '+((T.f-1)%10+1)+'/10층',AX+42,12);ctx.fillStyle='#c8d4e0';ctx.fillText(T.clear?'계단이 열렸어요 ▲':'남은 적 '+T.mobs.filter(m=>m.hp>0).length,AX+42,22);ctx.textBaseline='alphabetic';
  const og=(typeof G!=='undefined')?G:null;try{G=Object.assign(Object.create(og||{}),{ult:T.ult,state:'play',sp:null,spUsed:false});drawPlayerHUD(now);drawUltGauge(now)}catch(e){}finally{G=og}
  /* 오른쪽 아래: 점수 · 콤보 (보스전과 같은 자리) */const sx=W-82,sy=H-34;RA(sx-4,sy-2,84,32,'#05090b',.72);ctx.textAlign='right';ctx.font='bold 13px monospace';ctx.fillStyle='#ffe79a';ctx.fillText(String(T.score||0).padStart(6,'0'),W-6,sy+12);
  ctx.font='bold 9px monospace';ctx.fillStyle=T.combo>2?'#ffe79a':'#8a9aa8';ctx.fillText('COMBO '+(T.combo||0),W-6,sy+25);ctx.textAlign='left'}
 function draw(now){try{ctx.setTransform(SS,0,0,SS,0,0)}catch(e){}ctx.imageSmoothingEnabled=false;ctx.save();
  if(T.bossCard){drawBossCard(now);ctx.restore();return}
  if(T.shake>0)ctx.translate(rnd(-1,1)*T.shake*4,rnd(-1,1)*T.shake*4);
  bg();drawTels();
  const list=T.mobs.map(m=>({y:m.y,fn:()=>drawMob(m)}));list.push({y:P.y,fn:()=>drawHero(now)});list.sort((a,b)=>a.y-b.y).forEach(o=>o.fn());
  drawSlash();
  for(const s of T.shots){A(1);ctx.fillStyle=s.col;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,6.28);ctx.fill();ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(s.x,s.y,s.r*.45,0,6.28);ctx.fill()}
  for(const q of T.parts){const k=(T.clk-q.t)/q.l;if(k>=1)continue;q.x+=q.vx/60;q.y+=q.vy/60;q.vy+=3;A(1-k);ctx.fillStyle=q.col;ctx.fillRect(q.x-1,q.y-1,2,2)}T.parts=T.parts.filter(q=>T.clk-q.t<q.l);
  ctx.font='900 9px sans-serif';ctx.textAlign='center';for(const p of T.pops){const k=(T.clk-p.t)/.9;if(k>=1)continue;A(1-k);ctx.fillStyle='#000';ctx.fillText(p.tx,p.x+1,p.y-k*16+1);ctx.fillStyle=p.col;ctx.fillText(p.tx,p.x,p.y-k*16)}ctx.textAlign='left';T.pops=T.pops.filter(p=>T.clk-p.t<.9);A(1);
  drawUlt(now);
  if(T.ultT!=null&&T.clk-T.ultT<.5){const k=(T.clk-T.ultT)/.5;A((1-k)*.6);ctx.fillStyle='#fff4c8';ctx.fillRect(0,0,W,H);ctx.strokeStyle='#ffd166';A(1-k);ctx.lineWidth=3;ctx.beginPath();ctx.arc(P.x,P.y-8,20+k*300,0,6.28);ctx.stroke();ctx.lineWidth=1;A(1)}
  if(T.flash>0){A(T.flash*.5);ctx.fillStyle='#ff2d55';ctx.fillRect(0,0,W,H);A(1)}
  drawHud(now);
  if(T.trans){const k=T.trans.t;A(k<.25?1:Math.max(0,1-(k-.25)/1.05));ctx.fillStyle='#05070a';ctx.fillRect(0,0,W,H*(k<.25?1:Math.max(0,1-(k-.25)*1.4)));
   A(Math.min(1,k*3)*(k>1?Math.max(0,(1.3-k)/.3):1));ctx.textAlign='center';ctx.fillStyle=T.pal.c;ctx.font='900 34px sans-serif';ctx.fillText(T.trans.txt,W/2,H/2);ctx.fillStyle='#e8eef6';ctx.font='700 9px sans-serif';ctx.fillText(T.trans.sub,W/2,H/2+18);ctx.textAlign='left';A(1)}
  if(T.f===1&&T.clk<6&&!T.trans){A(Math.min(1,(6-T.clk)));ctx.fillStyle='#05070acc';ctx.fillRect(W/2-150,AY+40,300,20);ctx.fillStyle='#e8eef6';ctx.font='700 8px sans-serif';ctx.textAlign='center';ctx.fillText('적을 모두 쓰러뜨리면 위쪽 계단이 열려요 · 박자에 맞춰 베면 PERFECT',W/2,AY+53);ctx.textAlign='left';A(1)}
  ctx.restore()}
 /* v72 보스 층 등장 화면: 그 보스의 경기장 · 보스 본모습 · 경고 띠 · 이름 */
 const CHN=['CHAPTER 1 · BEAT MACHINA','CHAPTER 2 · THE HUNGER','CHAPTER 3 · ORIGIN','CHAPTER 4 · ECLIPSE','CHAPTER 5 · ABYSS','CHAPTER 6 · ZENITH','CHAPTER 7 · REVERSE'];
 function drawBossCard(now){const c=T.bossCard,k=c.t,B=c.B,g=c.g%70;if(!c.o)c.o=zoneBossObj(g)||null;const o=c.o;
  ctx.fillStyle='#05070a';ctx.fillRect(0,0,W,H);
  try{const ar=o&&rqArena(o);if(ar){A(Math.min(1,k*1.5)*.85);ctx.drawImage(ar,0,0,ar.width,ar.height,0,0,W,H);A(1)}}catch(e){}
  const v=ctx.createRadialGradient(W/2,H/2,40,W/2,H/2,300);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.85)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H);
  /* 보스: 어둠 속 실루엣 → 빛을 받으며 드러남 */if(o){const rise=Math.min(1,k/1.1),sc=5*(1.25-.25*rise),bx=W/2+40,by=AY+AH-30+(1-rise)*30;
   try{ctx.save();A(Math.min(1,k*2));rqDrawBoss(ctx,o,bx,by,now,o.art?sc*1.04:sc,{dorm:k<.5,pulse:Math.max(0,Math.sin(k*9))*.5});ctx.restore()}catch(e){}A(1);
   if(k<.5){A(1-k*2);ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);A(1)}
   const lg=ctx.createRadialGradient(bx,by-60,0,bx,by-60,140);lg.addColorStop(0,B.c);lg.addColorStop(1,'rgba(0,0,0,0)');ctx.globalCompositeOperation='lighter';A(.18+.1*Math.sin(k*8));ctx.fillStyle=lg;ctx.fillRect(0,0,W,H);ctx.globalCompositeOperation='source-over';A(1)}
  /* 경고 띠 위 · 아래 */for(const [y,dir] of [[10,1],[H-26,-1]]){A(.92);ctx.fillStyle='#ff2d55';ctx.fillRect(0,y,W,16);ctx.fillStyle='#05070a';const off=(k*80*dir)%28;for(let x=-28;x<W+28;x+=28){ctx.beginPath();ctx.moveTo(x+off,y);ctx.lineTo(x+off+12,y);ctx.lineTo(x+off+4,y+16);ctx.lineTo(x+off-8,y+16);ctx.fill()}
   A(1);ctx.fillStyle='#ffffff';ctx.font='900 9px sans-serif';ctx.textAlign='center';ctx.fillText('WARNING · BOSS FLOOR · '+T.f+'F · WARNING',W/2,y+11);ctx.textAlign='left'}
  /* 이름 */const nk=clampN((k-.45)/.35,0,1);if(nk>0){const x=28-(1-nk)*60;A(nk);ctx.fillStyle='#05070acc';ctx.fillRect(0,H/2-34,250,70);ctx.fillStyle=B.c;ctx.fillRect(0,H/2-34,4,70);
   ctx.font='900 8px sans-serif';ctx.fillStyle='#ff6a8a';ctx.fillText('BOSS '+String(g+1).padStart(2,'0')+' / 70  ·  '+CHN[Math.floor(g/10)],x,H/2-18);
   ctx.font='900 28px sans-serif';ctx.fillStyle='#000';ctx.fillText(B.name,x+2,H/2+12);ctx.fillStyle=B.c;ctx.fillText(B.name,x,H/2+10);
   ctx.font='700 8px sans-serif';ctx.fillStyle='#e8eef6';ctx.fillText((o&&o.en)||'',x,H/2+26);A(1)}
  if(k<.12){A(1-k/.12);ctx.fillStyle='#ffffff';ctx.fillRect(0,0,W,H);A(1)}}

 /* ---------- 메인 루프에 끼우기 ---------- */
 {const _f=frame;frame=function(){if(mode!=='tower')return _f.apply(this,arguments);const now=performance.now(),dt=Math.min((now-last)/1000,.05)||0;last=now;
  try{dlgTick(now)}catch(e){}try{if(!paused)update(now,dt);draw(paused?pauseAtMs:now)}catch(e){console.error('tower',e)}requestAnimationFrame(frame)}}
 {const f=toLobby;toLobby=function(){if(mode==='tower'){mode='boss';TW.leave()}try{if(G&&G.tw71)G.tw71.done=1}catch(e){}return f.apply(this,arguments)}}
 {const f=pause;pause=function(){if(mode==='tower'&&!paused&&(T.bossCard||T.dead))return;return f.apply(this,arguments)}}

 /* ---------- 로비: 「이야기」 자리를 「탑 오르기」로 ---------- */
 try{GM_ITEMS[0].id='tower';GM_ITEMS[0].ic='▲';GM_ITEMS[0].t='탑 오르기';GM_ITEMS[0].sub='잡몹을 뚫고 10층마다 보스';if(typeof LV_ITEM_EN!=='undefined')LV_ITEM_EN[0]='TOWER'}catch(e){}
 const badge=()=>{const s=sv();return (s.floor||1)+'F · 보스 '+(s.bosses||0)+'/70'};
 TW.badge=badge;
 {const f=gmMainGo;gmMainGo=function(){if(GM_ITEMS[GM.sel]&&GM_ITEMS[GM.sel].id==='tower'){gmSfx('ok');gmShow('tower');return}return f.apply(this,arguments)}}
 {const f=gmShow;gmShow=function(scr){if(scr==='story')scr='tower';if(scr==='tower')buildScreen();const r=f.call(this,scr);if(scr==='tower')paintScreen();return r}}
 if(typeof lvSet==='function'){const f=lvSet;lvSet=function(){const r=f.apply(this,arguments);try{const it=document.querySelector('#lvSet .lvI[data-i="0"]');let e=it&&it.querySelector('em');if(it&&!e){e=document.createElement('em');it.appendChild(e)}if(e)e.textContent=badge();const b=document.querySelector('#lvSet .lvI[data-i="0"] b');if(b&&b.textContent!=='탑 오르기')b.textContent='탑 오르기';const sm=document.querySelector('#lvSet .lvI[data-i="0"] small');if(sm)sm.textContent='TOWER · 잡몹을 뚫고 10층마다 보스'}catch(e){}return r}}
 if(typeof lvDock==='function'){const f=lvDock;lvDock=function(){const r=f.apply(this,arguments);try{const g=$('lvGoBtn');if(g&&GM.sel===0)g.innerHTML='<small>NOW · TOWER</small>▶ 탑 오르기'}catch(e){}return r}}
 setInterval(()=>{try{const p=document.querySelector('#phPlay');if(p){const b=p.querySelector('b'),s=p.querySelector('small');if(b&&b.textContent!=='▲ 탑 오르기')b.textContent='▲ 탑 오르기';if(s&&s.textContent!=='NOW · TOWER')s.textContent='NOW · TOWER'}
  const e=document.querySelector('#lvSet .lvI[data-i="0"] em');if(e&&e.textContent!==badge())e.textContent=badge()}catch(e){}},700);

 /* ---------- v73 탑 화면: 스크롤로 700층 전체 보기 · 원하는 층 골라 오르기 · 처음부터 ---------- */
 const TV={sel:null,zc:[],io:null,raf:0};
 const reachable=f=>f>=1&&f<=Math.max(1,sv().best||1);
 function buildScreen(){if($('gmTower'))return;const body=document.querySelector('#gameMenu .gmBody');if(!body)return;const d=document.createElement('div');d.className='gmScreen';d.id='gmTower';
  d.innerHTML='<div class="gmHead"><button class="gmBtn gmBack" id="twBack">◀ 뒤로</button>TOWER<span id="twHeadInfo"></span></div>'+
   '<div id="twWrap"><div id="twCol"><div id="twScroll"></div><div id="twJump"><button class="gmBtn" data-j="cur">◎ 지금 층</button><button class="gmBtn" data-j="best">▲ 최고 층</button><button class="gmBtn" data-j="top">⇡ 꼭대기</button></div></div>'+
   '<div id="twInfo"><div id="twBanner"><canvas id="twArena" width="480" height="220"></canvas><div id="twBanTxt"></div></div><div id="twBody"></div></div></div>';
  body.appendChild(d);$('twBack').onclick=()=>{gmSfx('back');gmShow('main')};
  d.querySelectorAll('#twJump button').forEach(b=>b.onclick=()=>{const s=sv(),f=b.dataset.j==='cur'?(TV.sel||s.floor||1):b.dataset.j==='best'?(s.best||1):700;scrollToFloor(f,true);gmSfx('move')});
  const st=document.createElement('style');st.textContent=`
  #gmTower.on{display:flex!important;flex-direction:column}#gmTower .gmHead{width:100%}#twHeadInfo{margin-left:auto;font-size:12px;opacity:.75;letter-spacing:.04em}
  #twWrap{display:flex;gap:18px;flex:1;min-height:0;height:calc(100% - 56px)}
  #twCol{flex:0 0 300px;display:flex;flex-direction:column;gap:8px;min-height:0}
  #twScroll{flex:1;min-height:0;overflow-y:auto;border-radius:18px;border:1px solid #ffffff1a;background:radial-gradient(120% 60% at 50% 0%,#1a2440,#05070a 70%);padding:10px 0;scroll-behavior:smooth;scrollbar-width:thin;scrollbar-color:#3a4a60 transparent}
  #twScroll canvas{display:block;width:100%;height:auto;image-rendering:pixelated;cursor:pointer}
  #twJump{display:flex;gap:6px}#twJump .gmBtn{flex:1;font-size:12px!important;padding:8px 4px!important}
  #twInfo{flex:1;min-width:0;display:flex;flex-direction:column;gap:12px;overflow:auto}
  #twBanner{position:relative;border-radius:18px;overflow:hidden;border:1px solid #ffffff1f;flex:0 0 auto;box-shadow:0 14px 40px #0008}
  #twArena{display:block;width:100%;height:clamp(130px,30vh,230px);image-rendering:pixelated}
  #twBanTxt{position:absolute;left:0;top:0;bottom:0;width:58%;padding:16px 18px;display:flex;flex-direction:column;justify-content:center;gap:4px;background:linear-gradient(90deg,#05070af0,#05070ab0 70%,transparent)}
  .twBig{font-size:50px;font-weight:900;line-height:1;letter-spacing:.01em;text-shadow:0 0 24px currentColor}.twBig small{font-size:13px;opacity:.7;margin-left:8px;letter-spacing:.15em;text-shadow:none}
  .twZone{font-size:12px;letter-spacing:.2em;opacity:.85;font-weight:800}.twBossN{font-size:22px;font-weight:900;text-shadow:0 2px 0 #000}
  .twRow{display:flex;gap:8px;flex-wrap:wrap}.twChip{padding:6px 12px;border-radius:999px;background:#ffffff0d;border:1px solid #ffffff1a;font-size:12px;font-weight:800}
  .twCard{padding:12px 14px;border-radius:14px;background:linear-gradient(180deg,#141c28,#0c121a);border:1px solid #ffffff1a}
  .twCard h4{margin:0 0 10px;font-size:11px;letter-spacing:.22em;opacity:.7}
  .twMobs{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.twMob{display:flex;flex-direction:column;align-items:center;gap:4px;font-size:11px;font-weight:800;text-align:center}
  .twMob img{width:100%;max-width:84px;aspect-ratio:40/40;image-rendering:pixelated;background:radial-gradient(#ffffff10,#05070a 70%);border-radius:12px;border:1px solid #ffffff14}
  .twMob.el img{border-color:#ffd16688;box-shadow:0 0 14px #ffd16633}.twMob.el{color:#ffd166}
  .twBtns{display:flex;gap:8px;flex-wrap:wrap;align-items:center}#twGo{font-size:22px!important;padding:16px 28px!important}
  .twNote{font-size:12px;opacity:.65;line-height:1.6}
  html.phP #twWrap{flex-direction:column;height:auto}html.phP #twCol{flex:0 0 auto;height:46vh}
  html.phL #twCol{flex-basis:220px}html.phL #twArena{height:clamp(110px,34vh,170px)}html.phP #twArena{height:auto}html.phL .twBig{font-size:36px}html.phL #twGo{font-size:18px!important;padding:12px 18px!important}`;document.head.appendChild(st)}
 /* 구역 하나 = 캔버스 하나 (보스 층이 위, 1층이 아래). 화면에 보일 때만 그림 */
 const ZW=280,RH=26,HD=34,ZH=HD+RH*10+8;
 function zoneTop(z){return (69-z)*(ZH)}
 function paintScreen(){const s=sv(),sc=$('twScroll');if(!sc)return;if(TV.sel==null||!reachable(TV.sel))TV.sel=Math.min(s.floor||1,s.best||1);
  if(!TV.zc.length){for(let z=69;z>=0;z--){const c=document.createElement('canvas');c.width=ZW*2;c.height=ZH*2;c.dataset.z=z;c.onclick=e=>{const r=c.getBoundingClientRect(),y=(e.clientY-r.top)*(ZH/r.height);if(y<HD)return;const k=9-Math.floor((y-HD)/RH),f=z*10+k+1;if(k<0||k>9)return;
     if(reachable(f)){const old=TV.sel;TV.sel=f;gmSfx('move');redrawFloor(old);redrawFloor(f);info()}else{gmSfx('no');c.animate([{transform:'translateX(-3px)'},{transform:'translateX(3px)'},{transform:'none'}],{duration:160})}};
    sc.appendChild(c);TV.zc[z]=c}
   TV.io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!e.target._drawn)drawZone(+e.target.dataset.z)}),{root:sc,rootMargin:'300px'});TV.zc.forEach(c=>TV.io.observe(c))}
  TV.zc.forEach(c=>c._drawn=false);TV.zc.forEach((c,z)=>{const r=c.getBoundingClientRect(),R2=sc.getBoundingClientRect();if(r.bottom>R2.top-300&&r.top<R2.bottom+300)drawZone(z)});
  info();setTimeout(()=>scrollToFloor(TV.sel,false),30);startPortrait()}
 function redrawFloor(f){if(f)drawZone(zoneOf(f))}
 function scrollToFloor(f,smooth){const sc=$('twScroll'),c=TV.zc[zoneOf(f)];if(!sc||!c)return;const k=((f-1)%10),sc2=c.getBoundingClientRect().height/ZH,y=c.offsetTop+(HD+(9-k)*RH)*sc2-sc.clientHeight/2;sc.style.scrollBehavior=smooth?'smooth':'auto';sc.scrollTop=Math.max(0,y)}
 function drawZone(z){const c=TV.zc[z];if(!c)return;c._drawn=true;const o=c.getContext('2d');o.setTransform(2,0,0,2,0,0);o.imageSmoothingEnabled=false;const s=sv(),best=s.best||1,cur=s.floor||1,p=palOf(z),B=bossOf(z),zf=z*10,seen=zf+1<=best,near=zf+1<=best+10;
  o.clearRect(0,0,ZW,ZH);
  /* 구역 머리띠 */const g=o.createLinearGradient(0,0,ZW,0);g.addColorStop(0,'transparent');g.addColorStop(.5,p.b+'cc');g.addColorStop(1,'transparent');o.fillStyle=g;o.fillRect(0,4,ZW,HD-8);
  o.font='900 10px sans-serif';o.textAlign='center';o.fillStyle=seen?p.a:'#5a6270';o.fillText((zf+1)+'F – '+(zf+10)+'F  ·  '+(seen||near?p.n+' 구역':'???'),ZW/2,HD/2+3);o.textAlign='left';
  /* 탑 몸통 */const x0=34,x1=ZW-34;o.fillStyle='#05070a';o.fillRect(x0-6,HD,x1-x0+12,RH*10);
  for(let k=9;k>=0;k--){const f=zf+k+1,y=HD+(9-k)*RH,boss=k===9,ok=f<=best,isCur=f===cur,isSel=f===TV.sel,lk=!ok;
   const w=boss?x1-x0+20:x1-x0-(k%2)*6,x=(ZW-w)/2;
   o.fillStyle=lk?'#10141a':p.wall;o.fillRect(x,y+2,w,RH-4);o.fillStyle=lk?'#141a22':p.fl2;o.fillRect(x+3,y+5,w-6,RH-10);
   o.fillStyle=lk?'#1a2028':'#ffffff22';o.fillRect(x,y+2,w,1);o.fillStyle='#00000066';o.fillRect(x,y+RH-3,w,1);
   /* 창문 */for(let i=0;i<(boss?3:6);i++){const wx=x+44+i*(boss?22:((w-58)/5));o.fillStyle=lk?'#0a0d12':ok&&f<best?'#ffd16699':isCur?p.c:p.c+'66';o.fillRect(wx-3,y+8,6,9);if(ok){o.fillStyle='#ffffff55';o.fillRect(wx-3,y+8,6,1)}}
   if(boss){o.fillStyle=lk&&!near?'#3a1a20':'#ff2d55';o.fillRect(x,y+2,w,2);o.fillRect(x,y+RH-4,w,2);for(const sx of [x-6,x+w])o.fillRect(sx,y+4,6,RH-8)}
   o.font='900 9px sans-serif';o.fillStyle=lk?'#4a5260':boss?'#ff6a8a':'#e8eef6';o.fillText(f+'F',x+6,y+RH/2+3);
   if(boss){o.font='800 8px sans-serif';o.textAlign='right';o.fillStyle=lk&&!near?'#4a5260':B.c;o.fillText(lk&&!near?'??? BOSS':B.name,x+w-6,y+RH/2+3);o.textAlign='left'}
   if(lk){o.fillStyle='#4a5260';o.fillRect(x+w/2-3,y+11,6,5);o.strokeStyle='#4a5260';o.beginPath();o.arc(x+w/2,y+11,2.2,Math.PI,0);o.stroke()}
   else if(isCur){}
   else if(f<best&&!boss){o.fillStyle='#ffd166';o.font='900 8px sans-serif';o.textAlign='right';o.fillText('✓',x+w-6,y+RH/2+3);o.textAlign='left'}
   else if(boss&&f<best){o.font='800 8px sans-serif';const nw=o.measureText(B.name).width;o.fillStyle='#ffd166';o.font='900 8px sans-serif';o.fillText('★',x+w-6-nw-10,y+RH/2+3)}
   if(isSel){o.strokeStyle='#ffffff';o.lineWidth=2;o.strokeRect(x-3,y+.5,w+6,RH-1);o.lineWidth=1;o.fillStyle='#ffffff';o.beginPath();o.moveTo(x-12,y+RH/2-4);o.lineTo(x-6,y+RH/2);o.lineTo(x-12,y+RH/2+4);o.fill()}
   if(isCur&&!boss){o.fillStyle=p.c;o.fillRect(x+w-46,y+6,40,RH-12);o.fillStyle='#05070a';o.font='900 8px sans-serif';o.textAlign='center';o.fillText('이어하기',x+w-26,y+RH/2+3);o.textAlign='left'}}
  o.setTransform(1,0,0,1,0,0)}
 function mobImg(k,p,el){const f=window.MOB72&&mobFrame(k,p,el,'front','i',0);const c=document.createElement('canvas');c.width=f?f.width:28;c.height=f?f.height:24;const o=c.getContext('2d');o.imageSmoothingEnabled=false;o.drawImage(f||spr(k,p,el),0,0,c.width,c.height);return c.toDataURL()}
 function info(){const s=sv(),f=TV.sel||1,z=zoneOf(f),p=palOf(z),[a,b]=speciesOf(z),bf=z*10+10,B=bossOf(z),boss=f%10===0,cur=s.floor||1;
  $('twHeadInfo').textContent='최고 '+(s.best||1)+'F · 보스 '+(s.bosses||0)+'/70 · 처치 '+(s.kills||0);
  $('twBanTxt').innerHTML='<div class="twZone" style="color:'+p.a+'">'+p.n+' 구역 · '+(z*10+1)+'F ~ '+bf+'F</div><div class="twBig" style="color:'+(boss?B.c:p.c)+'">'+f+'F<small>'+(boss?'BOSS FLOOR':((f-1)%10+1)+' / 10층')+'</small></div><div class="twBossN" style="color:'+B.c+'">'+(boss?'':'▲ '+bf+'F 보스 · ')+B.name+'</div>';
  const mobs=[[a,0],[b,0],[a,1],[b,1]].map(([k,el])=>'<div class="twMob'+(el?' el':'')+'"><img src="'+mobImg(k,p,!!el)+'">'+(el?'★ '+ELN[k]:p.n+' '+SP[k].n)+'</div>').join('');
  $('twBody').innerHTML='<div class="twCard"><h4>이 구역의 잡몹 · 정예는 5F · 9F</h4><div class="twMobs">'+mobs+'</div></div>'+
   '<div class="twBtns"><button class="gmBtn go" id="twGo">▲ '+f+'F '+(f===cur?'이어서 오르기':'부터 오르기')+'</button>'+(f!==cur&&reachable(cur)?'<button class="gmBtn" id="twCont">◎ '+cur+'F 이어하기</button>':'')+'<button class="gmBtn" id="twNew">↺ 1F부터 처음부터</button></div>'+
   '<div class="twRow"><span class="twChip">최고 '+(s.best||1)+'F</span><span class="twChip">보스 '+(s.bosses||0)+' / 70</span><span class="twChip">처치 '+(s.kills||0)+'</span><span class="twChip">난이도 '+({easy:'쉬움',normal:'보통',hard:'어려움',extreme:'익스트림'}[diff]||diff)+'</span></div>'+
   '<div class="twNote">왼쪽 탑을 스크롤해서 700층까지 볼 수 있어요. 올라가 본 층(최고 '+(s.best||1)+'F까지)은 눌러서 골라 다시 할 수 있어요.<br>쓰러지면 그 구역의 첫 층부터 다시 · 보스를 쓰러뜨리면 보스 러시에서도 열려요.</div>';
  const go=g=>{gmSfx('ok');const S=sv();S.floor=g;S.cp=Math.floor((g-1)/10)*10+1;try{saveNow()}catch(e){}stopPortrait();TW.start(g)};
  $('twGo').onclick=()=>go(f);if($('twCont'))$('twCont').onclick=()=>go(cur);
  $('twNew').onclick=()=>{if($('twNew').dataset.ok){go(1);return}$('twNew').dataset.ok=1;$('twNew').textContent='정말 1F부터? 한 번 더 누르기';setTimeout(()=>{const n=$('twNew');if(n){delete n.dataset.ok;n.textContent='↺ 1F부터 처음부터'}},2500)};
  TV.bz=z}
 /* 배너: 그 구역 보스의 경기장 + 살아 움직이는 보스 */
 function startPortrait(){if(TV.raf)return;const loop=()=>{TV.raf=0;const scr=$('gmTower');if(!scr||!scr.classList.contains('on')||mode!=='menu')return;try{drawBanner(performance.now())}catch(e){}TV.raf=requestAnimationFrame(loop)};TV.raf=requestAnimationFrame(loop)}
 function stopPortrait(){if(TV.raf)cancelAnimationFrame(TV.raf);TV.raf=0}
 function drawBanner(now){const c=$('twArena');if(!c)return;const o=c.getContext('2d'),z=TV.bz||0,ob=zoneBossObj(z),B=bossOf(z);const hh=Math.max(90,Math.round(480*(c.clientHeight||220)/(c.clientWidth||480)));if(c.height!==hh)c.height=hh;const k2=hh/220;o.setTransform(1,0,0,1,0,0);o.imageSmoothingEnabled=false;o.fillStyle='#05070a';o.fillRect(0,0,480,hh);
  try{const ar=arenaOf(z);if(ar)o.drawImage(ar,0,Math.max(0,150-hh/2),480,Math.min(300,hh),0,0,480,Math.min(300,hh))}catch(e){}
  const g=o.createRadialGradient(360,hh*.6,10,360,hh*.6,180);g.addColorStop(0,B.c+'55');g.addColorStop(1,'rgba(0,0,0,0)');o.fillStyle=g;o.fillRect(0,0,480,hh);
  if(ob){try{o.save();rqDrawBoss(o,ob,370,hh-12+Math.sin(now/600)*2,now,(ob.art?3.1:3)*Math.min(1,k2*1.05),{pulse:Math.max(0,Math.sin(now/300))*.4});o.restore()}catch(e){}}
  o.fillStyle='#00000040';for(let y=0;y<hh;y+=3)o.fillRect(0,y,480,1)}
 TW.T=T;TW.ult=()=>{T.ult=100;ult()};TW.sv=sv;TW.bossOf=bossOf;TW.zoneOf=zoneOf;TW.speciesOf=speciesOf;
}catch(e){console.error('v71 tower',e)}})();
