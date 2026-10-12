/* v172 펫 각성 (PA172)
   - 각성석(💠)은 탑 오르기에서만, 아주 드물게 나온다: 잡몹 0.1% · 정예 2.5% · 탑 보스 첫 클리어 15%(다시 깨면 4%), 높은 층일수록 조금 더.
   - 공방 펫 칸의 「✦ 펫 각성」에서 각성석 + 골드로 각성. 펫마다 단 한 번만. 펫 등급이 높을수록 재료가 훨씬 많이 든다(각성석 15 × (1 + 0.7×등급)).
   - 각성한 펫은 탑 오르기(잡몹 층 · 탑 보스 층 · 듀오 탑)에서만 스스로 공격한다. 결투 · 팀 결투 · 일반 보스 러시 · 관전에서는 공격하지 않는다.
     네 번째 공격마다 「강타」(3배 + 주변 튕김) · 12초마다 「펫 폭풍」(여러 마리 동시에).
   - 장착한 펫은 탑에서 함께 싸우며 경험치를 얻어 레벨이 오른다(공격력 +2%/레벨, 최대 50).
   - 각성하면 펫 모습이 바뀐다: 가슴에 각성석(💠)이 박히고, 보석에서 하늘빛 줄기가 몸으로 퍼지며 은은하게 빛난다.
   기록: saveData.pa172 = {st: 각성석, p: {펫 번호: {aw, lv, xp}}, bf: {층: 1}(첫 클리어 기록)} */
(function(){try{
 const TAU=Math.PI*2,MAXAW=1/* 각성은 단 한 번 */,MAXLV=50,VIS=5/* 각성 모습은 가장 화려한 단계로 */;
 const STEP=[0,15]/* 각성에 드는 각성석(등급 배율 곱하기 전) */;
 const GOLD=[0,30000];
 const CD=[0,1.3],MUL=[0,2.5];
 const PD=()=>{const d=saveData.pa172=saveData.pa172||{};d.st=d.st|0;d.p=d.p||{};d.bf=d.bf||{};return d};
 const pet=i=>{const d=PD();return d.p[i]=d.p[i]||{aw:0,lv:1,xp:0}};
 const awOf=i=>{try{const p=PD().p[i];return p?p.aw|0:0}catch(e){return 0}};
 const gradeK=i=>{try{return (wsTier(PETS[i])||{}).k|0}catch(e){return 0}};
 const gMul=i=>1+.7*gradeK(i);
 const stoneCost=(i,to)=>Math.round(STEP[to]*gMul(i));
 const goldCost=(i,to)=>Math.round(GOLD[to]*(1+.5*gradeK(i))/100)*100;
 const needXp=lv=>20+lv*15;
 const eqPet=()=>{try{return shopInv().eq.pt|0}catch(e){return 0}};
 const COL=i=>'hsl('+((i*47+190)%360)+',90%,68%)';
 const num=n=>(+n||0).toLocaleString();

 /* ── 어디서 공격하나: 탑 잡몹 층 · 탑 보스 층(결투 · 관전 · 일시정지 빼고) ── */
 const blocked=()=>{try{if(typeof paused!=='undefined'&&paused)return true;if(window.PVP92&&PVP92.on&&PVP92.on())return true;if(window.WATCH95&&WATCH95.specOn&&WATCH95.specOn())return true}catch(e){}return false};
 const inTower=()=>{try{return mode==='tower'&&window.TW71&&TW71.T&&!TW71.T.bossCard&&!TW71.T.dead&&!TW71.T.clear}catch(e){return false}};
 const inTBoss=()=>{try{return mode==='boss'&&G&&G.tw71&&G.state==='play'&&!G.cine}catch(e){return false}};
 const floorNow=()=>{try{return inTBoss()?G.tw71.f:TW71.T.f||1}catch(e){return 1}};

 /* ── 각성석 얻기 ── */
 function gainStone(n,x,y,why){const d=PD();d.st+=n;try{saveNow()}catch(e){}
  try{sfx(988,.18,'triangle',.07,1976);setTimeout(()=>{try{sfx(1318,.3,'triangle',.07,2637)}catch(e){}},120)}catch(e){}
  try{if(mode==='tower'&&TW71.addPop)TW71.addPop(x||P.x,(y||P.y)-40,'💠 각성석 +'+n+'!','#9ae8ff')}catch(e){}
  toast('💠 각성석 +'+n+' 획득!',(why||'')+' · 보유 '+num(d.st)+'개')}
 const tb=document.createElement('div');tb.id='pa172t';tb.hidden=true;document.body.appendChild(tb);let tbT=0;
 function toast(a,b){tb.innerHTML='<b>'+a+'</b><small>'+b+'</small>';tb.hidden=false;tb.classList.remove('on');void tb.offsetWidth;tb.classList.add('on');clearTimeout(tbT);tbT=setTimeout(()=>{tb.hidden=true},3600)}
 /* 잡몹을 쓰러뜨리면: 펫 경험치 + 아주 낮은 확률로 각성석 */
 if(window.CB81&&CB81.onKill){const f=CB81.onKill;CB81.onKill=function(m){try{if(mode==='tower'&&window.TW71&&TW71.T&&TW71.T.mobs&&TW71.T.mobs.includes(m)&&!blocked()){
    addXp(m.elite?5:1);const fl=TW71.T.f||1,bonus=1+Math.min(2,fl/500),ch=(m.elite?.025:.001)*bonus;if(Math.random()<ch)gainStone(1,m.x,m.y,m.elite?'정예 처치':'몬스터 처치')}}catch(e){}return f.apply(this,arguments)}}
 /* 탑 보스를 깨면: 첫 클리어 15% · 다시 깨면 4% */
 {const f=fightEnd;fightEnd=function(won){let tw=null;try{if(won&&G&&G.tw71&&!G._pa172&&!blocked()){G._pa172=1;tw=G.tw71}}catch(e){}const r=f.apply(this,arguments);
   if(tw)try{const d=PD(),fl=tw.f|0,first=!d.bf[fl];d.bf[fl]=1;addXp(30);const ch=(first?.15:.04)*(1+Math.min(2,fl/500));if(Math.random()<ch)gainStone(fl>=300&&first?2:1,0,0,(first?'첫 클리어':'다시 클리어')+' · '+fl+'층 보스');else try{saveNow()}catch(e){}}catch(e){}return r}}
 function addXp(n){const i=eqPet(),p=pet(i);if(p.lv>=MAXLV)return;p.xp+=n;let up=false;while(p.lv<MAXLV&&p.xp>=needXp(p.lv)){p.xp-=needXp(p.lv);p.lv++;up=true}
  if(up)try{if(mode==='tower'&&TW71.addPop){const F=TW71.T&&window.TPET106?TPET106.F:null;TW71.addPop(F&&F.x!=null?F.x:P.x,(F&&F.y!=null?F.y:P.y)-30,'🐾 펫 Lv '+p.lv+'!','#a6f5c6')}sfx(784,.12,'triangle',.05,1175)}catch(e){}}

 /* ── 펫 공격 ── */
 const A={next:0,n:0,storm:0,shots:[],fx:[]};
 function petPos(){try{if(inTBoss()&&G.pt)return {x:G.pt.x,y:G.pt.y-4};const F=window.TPET106&&TPET106.F;if(F&&F.x!=null)return {x:F.x,y:F.y-12}}catch(e){}return {x:P.x,y:P.y-20}}
 function baseDmg(i){const p=pet(i);let tf=1;try{tf=TW71.TF?TW71.TF(floorNow()):1}catch(e){}return (4+2.5*gradeK(i))*MUL[p.aw]*(1+(p.lv-1)*.02)*tf}
 function nearMobs(o,rng){try{return TW71.T.mobs.filter(m=>m.hp>0&&!(m.born>0)&&Math.hypot(m.x-o.x,m.y-o.y)<rng).sort((a,b)=>Math.hypot(a.x-o.x,a.y-o.y)-Math.hypot(b.x-o.x,b.y-o.y))}catch(e){return []}}
 /* ── v173 펫마다 다른 공격(생김새에 맞춰) ──
    AT[펫 번호] = [공격 이름, 방식, 옵션, 색]
    방식: shot(던지기 · 날리기) · beam(빛줄기 · 브레스 — 줄 위 모두) · chain(번개 — 옆 적으로 이어짐) · sky(하늘에서 떨어짐 — 범위) · dash(그림자처럼 덮쳐 물기 — 꿰뚫음)
    옵션: sp 그림 · aoe 범위 · dot 지속 피해(번) · slow 느려짐(초) · stun 멈춤(초) · bounce 튕김 · spread 여러 갈래 · multi 연발 · split 분열 · n 연쇄 수 · w 굵기 · heal 회복 · luck 대박 */
 const AT={
  0:['톱니 던지기','shot',{sp:'gear',bounce:1},'#ffd166'],1:['반딧불 빛','shot',{sp:'orb',fast:1},'#c8ff7a'],2:['태엽 톱니 연발','shot',{sp:'gear',multi:2},'#e8c870'],
  3:['솜구름 뭉치','shot',{sp:'wool',aoe:22,slow:.8},'#ffffff'],4:['조준 레이저','beam',{st:'laser',w:4},'#ff5a5a'],5:['여우불','shot',{sp:'fire',aoe:18,dot:3},'#ff8a3a'],
  6:['얼음 조각','shot',{sp:'ice',slow:1.5},'#9ae8ff'],7:['수정 파편','shot',{sp:'crystal',spread:3},'#c88aff'],8:['유령 할퀴기','dash',{st:'ghost'},'#b8a8ff'],
  9:['불사조 깃털','shot',{sp:'feather',spread:3,dot:2},'#ffb030'],10:['치유 잎사귀','shot',{sp:'leaf',heal:1},'#7dffa8'],11:['찌릿 번개','chain',{n:2},'#ffe74a'],
  12:['돌 던지기','shot',{sp:'rock',aoe:26,stun:.4,arc:30},'#a8a090'],13:['독침','shot',{sp:'needle',fast:1,dot:4},'#c8ff3a'],14:['불씨 뱉기','shot',{sp:'fire',multi:2,dot:2},'#ff6a2a'],
  15:['눈송이','shot',{sp:'snow',spread:3,slow:1},'#e8f8ff'],16:['초음파','shot',{sp:'note',aoe:22},'#e8b8ff'],17:['시간 멈춤','shot',{sp:'clock',stun:.8},'#ffd166'],
  18:['행운 동전','shot',{sp:'coin',luck:1},'#ffd166'],19:['소형 미사일','shot',{sp:'missile',multi:2,aoe:16},'#8dcdf5'],20:['해파리 전류','chain',{n:3},'#9ae8ff'],
  21:['바람 칼날','beam',{st:'wind',w:8},'#c8ffe8'],22:['맹독 침','shot',{sp:'needle',dot:6},'#7aff5a'],23:['별똥별','sky',{st:'star',aoe:30},'#ffe79a'],
  24:['창공 브레스','beam',{st:'breath',w:10},'#8ad8ff'],25:['불꽃 강하','sky',{st:'fire',aoe:34,dot:3},'#ff7a3a'],26:['은하 유성우','sky',{st:'star',aoe:24,multi:3},'#c8a8ff'],
  27:['시간 균열','sky',{st:'clock',aoe:30,stun:1},'#ffe79a'],28:['그림자 물기','dash',{st:'shadow',multi:2},'#7a6aff'],29:['천둥 낙뢰','sky',{st:'bolt',aoe:26,n:2},'#ffe74a'],
  30:['수정 가시','shot',{sp:'crystal',spread:5},'#9ae8ff'],31:['여우별','shot',{sp:'star',bounce:3},'#ffd8ff'],32:['용암 바위','shot',{sp:'rock',aoe:32,dot:3,stun:.3,arc:34},'#ff5a2a'],
  33:['서리 폭풍','sky',{st:'snow',aoe:34,slow:2},'#c8f4ff'],34:['황금 브레스','beam',{st:'breath',w:12,dot:2},'#ffd166'],35:['그림자 깃털','shot',{sp:'feather',spread:5},'#9a7aff'],
  36:['무지개 빛줄기','beam',{st:'rainbow',w:10},'#ff9ad8'],37:['회오리','shot',{sp:'tornado',aoe:20,bounce:4},'#c8ffe8'],38:['혼돈 분열','shot',{sp:'blob',split:3},'#ff6ad5'],
  39:['천상의 빛','sky',{st:'holy',aoe:40,heal:2},'#fff0b0']};
 const atkOf=i=>AT[i]||['빛 구슬','shot',{sp:'orb'},COL(i)];
 const NOW=()=>performance.now(),clk=()=>{try{return TW71.T.clk}catch(e){return 0}};
 const tpos=t=>t==='boss'?{x:G.boss.x,y:G.boss.y-14}:{x:t.x,y:t.y-6};
 A.beams=[];A.sky=[];A.dots=[];A.bolts=[];A.parts=[];A.hits=0;
 function bossHit(dmg,x,y,col){if(inTBoss())try{spDmg(dmg*6,x,y,col,NOW())}catch(e){}}
 function hitOne(m,dmg,o,col){if(m==='boss'){bossHit(dmg*(1+(o.dot?.25*o.dot*.25:0)),G.boss.x,G.boss.y-14,col);return}
  if(!m||m.hp<=0||mode!=='tower')return;let d=dmg;if(o.luck&&Math.random()<.25){d*=3;try{TW71.addPop(m.x,m.y-28,'대박!','#ffd166')}catch(e){}}
  try{TW71.hitMob(m,d,col,'🐾')}catch(e){}const c=clk();if(o.slow)m.chillT=Math.max(m.chillT||0,c+o.slow);if(o.stun)m.stunT=Math.max(m.stunT||-9,c-1.1+o.stun);
  if(o.dot&&m.hp>0)A.dots.push({m,n:o.dot,d:d*.25,next:NOW()+450,col});
  if(o.heal){A.hits++;if(A.hits%(o.heal>1?2:5)===0)try{P.hp=Math.min(P.maxhp||P.hp+1,P.hp+o.heal);TW71.addPop(P.x,P.y-30,'+'+o.heal,'#7dffa8')}catch(e){}}}
 function areaHit(x,y,r,dmg,o,col,main){if(main==='boss'){hitOne('boss',dmg,o,col);return}const L=nearMobs({x,y},r);if(main&&main!=='boss'&&!L.includes(main))L.unshift(main);for(const m of L)hitOne(m,m===main?dmg:dmg*.6,o,col)}
 function burst(x,y,col,n,sp){for(let k=0;k<n;k++){const a=Math.random()*TAU,v=(.03+Math.random()*.06)*(sp||1);A.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-.02,t0:NOW(),life:300+Math.random()*250,col})}}
 /* 날리기(shot) */
 function launch(o,tgt,dmg,opt,col,x0,y0,hitList){const p=tpos(tgt),dist=Math.hypot(p.x-x0,p.y-y0),spd=opt.fast?.62:opt.sp==='rock'?.3:.42;
  A.shots.push({x0,y0,tgt,tx:p.x,ty:p.y,t0:NOW(),dur:Math.max(110,dist/spd),dmg,opt,col,arc:opt.arc!=null?opt.arc:14,rot:Math.random()*6,hl:hitList||[]})}
 function landShot(s){const o=s.opt,col=s.col;try{
   if(o.aoe)areaHit(s.tx,s.ty,o.aoe+(s.big?10:0),s.dmg,o,col,s.tgt);else hitOne(s.tgt,s.dmg,o,col);
   if(s.big&&!o.aoe)areaHit(s.tx,s.ty,26,s.dmg*.5,{},col,null);
   if(o.bounce&&s.tgt!=='boss'&&(s.bn==null?o.bounce:s.bn)>0){const hl=s.hl.concat([s.tgt]),nx=nearMobs({x:s.tx,y:s.ty},120).find(m=>!hl.includes(m));
    if(nx){launch(null,nx,s.dmg*.8,o,col,s.tx,s.ty,hl);A.shots[A.shots.length-1].bn=(s.bn==null?o.bounce:s.bn)-1;A.shots[A.shots.length-1].arc=6}}
   if(o.split&&!s.child){const L=s.tgt==='boss'?['boss','boss','boss']:nearMobs({x:s.tx,y:s.ty},130).filter(m=>m!==s.tgt).slice(0,o.split);
    for(const t of L){launch(null,t,s.dmg*.5,Object.assign({},o,{split:0}),col,s.tx,s.ty);A.shots[A.shots.length-1].child=1}}}catch(e){}
  burst(s.tx,s.ty,col,o.aoe?12:6,o.aoe?1.4:1);A.fx.push({x:s.tx,y:s.ty,t0:NOW(),big:s.big||o.aoe,col,r:o.aoe||0})}
 /* 빛줄기(beam): 펫에서 적 쪽으로 260 길이, 줄 위 모두 */
 function beam(o,tgt,dmg,opt,col,big){const p=tpos(tgt),a=Math.atan2(p.y-o.y,p.x-o.x),L=260,w=(opt.w||6)+(big?6:0);
  A.beams.push({x:o.x,y:o.y,a,L,w,t0:NOW(),st:opt.st,col});
  if(tgt==='boss'){hitOne('boss',dmg,opt,col);return}
  for(const m of nearMobs(o,L+10)){const dx=m.x-o.x,dy=(m.y-6)-o.y,al=dx*Math.cos(a)+dy*Math.sin(a),pr=Math.abs(-dx*Math.sin(a)+dy*Math.cos(a));if(al>0&&al<L&&pr<w+8)hitOne(m,dmg,opt,col)}}
 /* 번개(chain) */
 function chain(o,tgt,dmg,opt,col){const pts=[o];let cur=tgt,hl=[];const n=(opt.n||2)+1;
  for(let k=0;k<n&&cur;k++){const p=tpos(cur);pts.push(p);hitOne(cur,dmg*(k?.75:1),opt,col);if(cur==='boss')break;hl.push(cur);cur=nearMobs(p,90).find(m=>!hl.includes(m))}
  A.bolts.push({pts,t0:NOW(),col});try{sfx(1400,.08,'sawtooth',.03,300)}catch(e){}}
 /* 하늘에서(sky) */
 function sky(tgt,dmg,opt,col,big){const p=tpos(tgt);A.sky.push({x:p.x,y:p.y,tgt,t0:NOW(),dl:380,dmg,opt,col,st:opt.st,big})}
 function skyLand(k){const o=k.opt;areaHit(k.x,k.y,(o.aoe||26)+(k.big?10:0),k.dmg,o,k.col,k.tgt==='boss'?'boss':null);if(o.n&&k.tgt!=='boss'){const L=nearMobs(k,90).slice(0,o.n);if(L.length)chain(k,L[0],k.dmg*.6,{n:o.n-1},k.col)}
  burst(k.x,k.y,k.col,16,1.6);A.fx.push({x:k.x,y:k.y,t0:NOW(),big:1,col:k.col,r:o.aoe||26});try{sfx(k.st==='bolt'?1800:200,.18,k.st==='bolt'?'sawtooth':'square',.04,k.st==='bolt'?200:60)}catch(e){}}
 /* 덮치기(dash): 펫 그림자가 적을 꿰뚫고 지나가며 물기 */
 function dash(o,tgt,dmg,opt,col,big){const p=tpos(tgt),a=Math.atan2(p.y-o.y,p.x-o.x),L=Math.hypot(p.x-o.x,p.y-o.y)+30;A.beams.push({x:o.x,y:o.y,a,L,w:10,t0:NOW(),st:opt.st,col,dash:1});
  if(tgt==='boss'){hitOne('boss',dmg,opt,col);return}for(const m of nearMobs(o,L+10)){const dx=m.x-o.x,dy=(m.y-6)-o.y,al=dx*Math.cos(a)+dy*Math.sin(a),pr=Math.abs(-dx*Math.sin(a)+dy*Math.cos(a));if(al>0&&al<L&&pr<16)hitOne(m,dmg,opt,col)}
  A.fx.push({x:p.x,y:p.y,t0:NOW(),claw:1,col})}
 function fire(o,tgt,dmg,big){const i=eqPet(),[nm,t,opt0,col]=atkOf(i),opt=Object.assign({},opt0);
  const rep=opt.multi||1;for(let r=0;r<rep;r++)setTimeout(()=>{try{if(!inTower()&&!inTBoss())return;const oo=r?petPos():o;
    if(t==='shot'){const sp=opt.spread||1;if(sp>1){const L=tgt==='boss'?Array(sp).fill('boss'):[tgt].concat(nearMobs(tpos(tgt),110).filter(m=>m!==tgt)).slice(0,sp);while(L.length<sp)L.push(tgt);L.forEach((t2,j)=>{launch(oo,t2,dmg*.6,opt,col,oo.x,oo.y);const s=A.shots[A.shots.length-1];s.big=big;s.lat=(j-(sp-1)/2)*14})}
     else{launch(oo,tgt,dmg/(rep>1?1.4:1),opt,col,oo.x,oo.y);A.shots[A.shots.length-1].big=big}}
    else if(t==='beam')beam(oo,tgt,dmg,opt,col,big);else if(t==='chain')chain(oo,tgt,dmg,opt,col);
    else if(t==='sky'){const L=tgt==='boss'||rep<2?[tgt]:[tgt].concat(nearMobs(tpos(tgt),140).filter(m=>m!==tgt));sky(L[r%L.length]||tgt,dmg/(rep>1?1.3:1),opt,col,big)}
    else if(t==='dash')dash(oo,tgt,dmg/(rep>1?1.4:1),opt,col,big)}catch(e){}},r*(t==='sky'?160:120))}
 function tick(now){if(blocked())return;const tw=inTower(),bs=inTBoss();if(!tw&&!bs){A.shots.length=0;A.sky.length=0;A.dots.length=0;return}
  const i=eqPet(),p=pet(i);if(p.aw<1)return;const o=petPos();
  /* 날아가는 공격 */for(const s of A.shots){const q=(now-s.t0)/s.dur;if(s.tgt!=='boss'&&s.tgt&&s.tgt.hp>0){s.tx=s.tgt.x;s.ty=s.tgt.y-6}else if(s.tgt==='boss'){const bp=tpos('boss');s.tx=bp.x;s.ty=bp.y}if(q>=1&&!s.done){s.done=1;landShot(s)}}A.shots=A.shots.filter(s=>!s.done);
  for(const k of A.sky)if(!k.done&&now-k.t0>=k.dl){k.done=1;skyLand(k)}A.sky=A.sky.filter(k=>!k.done||now-k.t0<k.dl+60);
  for(const d of A.dots)if(now>=d.next&&d.n>0){d.n--;d.next=now+450;if(d.m&&d.m.hp>0&&mode==='tower')try{TW71.hitMob(d.m,d.d,d.col,'')}catch(e){}}A.dots=A.dots.filter(d=>d.n>0&&d.m&&d.m.hp>0);
  if(!A.next)A.next=now+800;
  /* 펫 폭풍: 자기 공격을 여러 적에게 한꺼번에 */if(now>A.storm){const L=bs?['boss','boss','boss']:nearMobs(o,260).slice(0,6);if(L.length){A.storm=now+12000;const d=baseDmg(i)*2.5;L.forEach((t,j)=>setTimeout(()=>{try{if(inTower()||inTBoss())fire(petPos(),t,d,true)}catch(e){}},j*90));
    try{sfx(523,.25,'square',.05,1568);if(tw)TW71.addPop(o.x,o.y-26,'✦ 펫 폭풍!','#ffe79a')}catch(e){}A.fx.push({x:o.x,y:o.y,t0:now,ring:1,col:atkOf(i)[3]})}}
  if(now<A.next)return;const tgt=bs?'boss':nearMobs(o,230)[0];if(!tgt){A.next=now+200;return}
  A.n++;const strong=A.n%4===0;fire(o,tgt,baseDmg(i)*(strong?3:1),strong);A.next=now+CD[p.aw]*1000;
  try{sfx(strong?660:880,.06,'triangle',.03,strong?1320:1400)}catch(e){}if(tw&&(strong||A.n%6===1))try{TW71.addPop(o.x,o.y-22,strong?'강타! '+atkOf(i)[0]:atkOf(i)[0],strong?'#ffe79a':atkOf(i)[3])}catch(e){}}
 /* ── 그리기 ── */
 function star(c,x,y,r,rot){c.beginPath();for(let k=0;k<10;k++){const rr=k%2?r*.45:r,a=rot+k*Math.PI/5-Math.PI/2;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}c.closePath();c.fill()}
 function sprite(c,s,x,y,now,ang){const o=s.opt,col=s.col,t=(now-s.t0)/1000,b=s.big?1.4:1,R=(px,py,w,h,cl)=>{c.fillStyle=cl;c.fillRect(Math.round(px),Math.round(py),w,h)};c.save();c.translate(x,y);c.scale(1.5,1.5);
  switch(o.sp){
   case 'gear':{c.rotate(t*14);c.fillStyle=col;for(let k=0;k<8;k++){c.save();c.rotate(k*TAU/8);c.fillRect(-1*b,-5*b,2*b,2.5*b);c.restore()}c.beginPath();c.arc(0,0,3.6*b,0,TAU);c.fill();c.fillStyle='#5a4220';c.beginPath();c.arc(0,0,1.4*b,0,TAU);c.fill();break}
   case 'fire':{const f=Math.sin(t*40)*.6;c.fillStyle='#ff5a1a';c.beginPath();c.arc(0,0,4*b+f,0,TAU);c.fill();c.fillStyle='#ffb030';c.beginPath();c.arc(.6,-.6,2.8*b,0,TAU);c.fill();c.fillStyle='#fff0b0';c.beginPath();c.arc(1,-1,1.4*b,0,TAU);c.fill();break}
   case 'ice':{c.rotate(ang);c.fillStyle=col;c.beginPath();c.moveTo(6*b,0);c.lineTo(0,-2.5*b);c.lineTo(-5*b,0);c.lineTo(0,2.5*b);c.closePath();c.fill();c.fillStyle='#fff';c.fillRect(0,-1,4*b,1);break}
   case 'crystal':{c.rotate(ang);c.fillStyle=col;c.beginPath();c.moveTo(6*b,0);c.lineTo(2,-2.6*b);c.lineTo(-4*b,-1.6*b);c.lineTo(-4*b,1.6*b);c.lineTo(2,2.6*b);c.closePath();c.fill();c.fillStyle='#ffffffaa';c.fillRect(-2,-1.4,5*b,1.2);break}
   case 'needle':{c.rotate(ang);c.fillStyle=col;c.fillRect(-5*b,-.8,9*b,1.6);c.fillStyle='#fff';c.fillRect(3*b,-.8,2*b,1.6);break}
   case 'rock':{c.rotate(t*6);const l=o.dot?'#ff7a3a':'#a8a090';c.fillStyle=o.dot?'#5a1a0a':'#5a5048';c.beginPath();c.arc(0,0,5*b,0,TAU);c.fill();c.fillStyle=l;c.beginPath();c.arc(-1,-1,3.6*b,0,TAU);c.fill();c.fillStyle=o.dot?'#ffe79a':'#d8d0c0';c.fillRect(-2,-3,2,2);break}
   case 'star':{c.fillStyle=col;star(c,0,0,5*b,t*8);c.fillStyle='#fff';star(c,0,0,2*b,t*8);break}
   case 'coin':{const w=Math.abs(Math.cos(t*16))*4*b+1;c.fillStyle='#b8860b';c.beginPath();c.ellipse(0,0,w+.8,4.8*b,0,0,TAU);c.fill();c.fillStyle='#ffd166';c.beginPath();c.ellipse(0,0,w,4*b,0,0,TAU);c.fill();break}
   case 'leaf':{c.rotate(t*9);c.fillStyle='#3ab05a';c.beginPath();c.ellipse(0,0,5*b,2.4*b,0,0,TAU);c.fill();c.fillStyle='#a6f5c6';c.fillRect(-4*b,-.5,8*b,1);break}
   case 'snow':{c.rotate(t*5);c.strokeStyle=col;c.lineWidth=1.3;for(let k=0;k<3;k++){c.save();c.rotate(k*Math.PI/3);c.beginPath();c.moveTo(-5*b,0);c.lineTo(5*b,0);c.stroke();c.restore()}c.fillStyle='#fff';c.fillRect(-1,-1,2,2);break}
   case 'wool':{c.fillStyle='#ffffff';for(const [a,bq,r] of [[-3,0,3.4],[2,-1,3.8],[0,2,3]]){c.beginPath();c.arc(a*b,bq*b,r*b,0,TAU);c.fill()}c.fillStyle='#d8e0f0';c.beginPath();c.arc(1*b,2*b,2*b,0,TAU);c.fill();break}
   case 'feather':{c.rotate(ang);c.fillStyle=col;c.beginPath();c.ellipse(0,0,6*b,2*b,0,0,TAU);c.fill();c.fillStyle='#ffffffaa';c.fillRect(-6*b,-.4,11*b,.8);break}
   case 'note':{c.rotate(ang);c.strokeStyle=col;c.lineWidth=1.5;for(let k=0;k<3;k++){c.globalAlpha=1-k*.28;c.beginPath();c.arc(-k*3,0,3+k*2.2,-1,1);c.stroke()}break}
   case 'clock':{c.fillStyle='#5a4220';c.beginPath();c.arc(0,0,5*b,0,TAU);c.fill();c.fillStyle='#fff4d0';c.beginPath();c.arc(0,0,4*b,0,TAU);c.fill();c.strokeStyle='#3a2a10';c.lineWidth=1;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(t*12)*3*b,Math.sin(t*12)*3*b);c.moveTo(0,0);c.lineTo(0,-2.4*b);c.stroke();break}
   case 'missile':{c.rotate(ang);c.fillStyle='#c8d4e0';c.fillRect(-4*b,-1.4,7*b,2.8);c.fillStyle='#ff5a5a';c.fillRect(3*b,-1.4,2,2.8);c.fillStyle='#ffb030';c.fillRect(-6*b-Math.random()*2,-1,2.5,2);break}
   case 'tornado':{for(let k=0;k<4;k++){c.globalAlpha=.85-k*.15;c.strokeStyle=col;c.lineWidth=1.4;c.beginPath();c.ellipse(Math.sin(t*20+k)*1.5,-k*2.6+3,(5-k*.8)*b,1.6,0,0,TAU);c.stroke()}break}
   case 'blob':{const w=Math.sin(t*20)*.8;c.fillStyle=col;c.beginPath();c.ellipse(0,0,(4.5+w)*b,(4.5-w)*b,0,0,TAU);c.fill();c.fillStyle='#fff';c.fillRect(-2*b,-2*b,2,2);c.fillStyle='#000';c.fillRect(1*b,-1,1.5,1.5);break}
   default:{c.fillStyle=col;c.beginPath();c.arc(0,0,3.6*b,0,TAU);c.fill();c.fillStyle='#fff';c.fillRect(-1,-1,2,2)}}
  c.restore()}
 function drawShots(c,now){if(!A.shots.length&&!A.fx.length&&!A.beams.length&&!A.sky.length&&!A.bolts.length&&!A.parts.length)return;c.save();c.imageSmoothingEnabled=false;
  for(const s of A.shots){const q=Math.min(1,(now-s.t0)/s.dur),ang=Math.atan2(s.ty-s.y0,s.tx-s.x0),lx=-Math.sin(ang)*(s.lat||0)*Math.sin(q*Math.PI),ly=Math.cos(ang)*(s.lat||0)*Math.sin(q*Math.PI),
    pos=qq=>[s.x0+(s.tx-s.x0)*qq+lx,s.y0+(s.ty-s.y0)*qq-Math.sin(qq*Math.PI)*s.arc+ly],[x,y]=pos(q);
   c.fillStyle=s.col;for(let k=1;k<=5;k++){const [px,py]=pos(Math.max(0,q-k*.045));c.globalAlpha=.45-k*.07;c.fillRect(Math.round(px-1.5),Math.round(py-1.5),3,3)}c.globalAlpha=1;sprite(c,s,x,y,now,ang)}
  /* 빛줄기 · 덮치기 */A.beams=A.beams.filter(b=>now-b.t0<400);for(const b of A.beams){const q=(now-b.t0)/400;c.save();c.translate(b.x,b.y);c.rotate(b.a);
   if(b.dash){c.globalAlpha=(1-q)*.8;c.fillStyle=b.col;for(let k=0;k<5;k++){const px=b.L*Math.min(1,q*2.2)-k*10;if(px<0)continue;c.globalAlpha=(1-q)*(.7-k*.12);c.beginPath();c.ellipse(px,0,7-k,4-k*.5,0,0,TAU);c.fill()}}
   else if(b.st==='rainbow'){const cs=['#ff5a5a','#ffb030','#ffe74a','#7dffa8','#6ab8ff','#c88aff'],h=b.w/cs.length;cs.forEach((cl,k)=>{c.globalAlpha=(1-q)*.85;c.fillStyle=cl;c.fillRect(0,-b.w/2+k*h,b.L,h)})}
   else if(b.st==='breath'){const g=c.createLinearGradient(0,0,b.L,0);g.addColorStop(0,'#ffffff');g.addColorStop(.3,b.col);g.addColorStop(1,'rgba(0,0,0,0)');c.globalAlpha=1-q;c.fillStyle=g;c.beginPath();c.moveTo(0,-b.w*.3);c.lineTo(b.L,-b.w);c.lineTo(b.L,b.w);c.lineTo(0,b.w*.3);c.closePath();c.fill()}
   else if(b.st==='wind'){c.strokeStyle=b.col;c.lineWidth=2;for(let k=0;k<3;k++){c.globalAlpha=(1-q)*(.9-k*.25);c.beginPath();c.arc(b.L*q+20-k*16,0,b.w,-1.1,1.1);c.stroke()}}
   else{c.globalAlpha=1-q;c.fillStyle=b.col;c.fillRect(0,-b.w/2,b.L,b.w);c.fillStyle='#fff';c.fillRect(0,-.5,b.L,1)}c.restore()}
  /* 번개 */A.bolts=A.bolts.filter(b=>now-b.t0<320);for(const b of A.bolts){c.globalAlpha=1-(now-b.t0)/320;c.strokeStyle=b.col;c.lineWidth=2.6;c.beginPath();for(let k=0;k<b.pts.length-1;k++){const a=b.pts[k],z=b.pts[k+1];c.moveTo(a.x,a.y);for(let j=1;j<=4;j++){const q=j/4;c.lineTo(a.x+(z.x-a.x)*q+(j<4?(Math.random()-.5)*8:0),a.y+(z.y-a.y)*q+(j<4?(Math.random()-.5)*8:0))}}c.stroke();c.strokeStyle='#fff';c.lineWidth=.8;c.stroke()}
  /* 하늘에서 */for(const k of A.sky){const q=Math.min(1,(now-k.t0)/k.dl),r=(k.opt.aoe||26)+(k.big?10:0);c.globalAlpha=.25+.3*q;c.strokeStyle=k.col;c.lineWidth=1.5;c.beginPath();c.ellipse(k.x,k.y+4,r*q,r*.5*q,0,0,TAU);c.stroke();
   if(k.done)continue;c.globalAlpha=1;const y=k.y-140*(1-q);
   if(k.st==='bolt'){c.strokeStyle='#fff';c.lineWidth=2;c.beginPath();c.moveTo(k.x+8,AY);c.lineTo(k.x-4,(AY+y)/2);c.lineTo(k.x+5,(AY+y)/2+6);c.lineTo(k.x,y);c.stroke();c.strokeStyle=k.col;c.lineWidth=1;c.stroke()}
   else if(k.st==='holy'){c.globalAlpha=.25+.5*q;const g=c.createLinearGradient(0,AY,0,k.y);g.addColorStop(0,'rgba(255,240,176,0)');g.addColorStop(1,'#fff0b0');c.fillStyle=g;c.fillRect(k.x-r*.4*q,AY,r*.8*q,k.y-AY)}
   else if(k.st==='clock'){c.globalAlpha=q;c.strokeStyle=k.col;c.lineWidth=2;c.beginPath();c.arc(k.x,k.y-10,r*.6,0,TAU);c.stroke();c.beginPath();c.moveTo(k.x,k.y-10);c.lineTo(k.x+Math.cos(now/60)*r*.5,k.y-10+Math.sin(now/60)*r*.5);c.stroke()}
   else if(k.st==='snow'){for(let j=0;j<6;j++){c.fillStyle='#fff';c.fillRect(Math.round(k.x+Math.sin(j*1.7+now/200)*r*.8),Math.round(y+j*10-20),2,2)}}
   else{const x=k.x+40*(1-q);c.fillStyle=k.st==='fire'?'#ff7a3a':k.col;if(k.st==='star')star(c,x,y,6,now/80);else{c.beginPath();c.arc(x,y,6,0,TAU);c.fill()}c.globalAlpha=.4;c.fillRect(x,y-14,3,12)}}
  /* 맞은 자리 · 조각 */A.fx=A.fx.filter(f=>now-f.t0<380);for(const f of A.fx){const q=(now-f.t0)/380;c.globalAlpha=1-q;c.strokeStyle=f.col;c.lineWidth=f.ring?2:1.5;
   if(f.claw){for(let k=-1;k<=1;k++){c.beginPath();c.moveTo(f.x-6+k*4,f.y-8);c.lineTo(f.x+6+k*4,f.y+8);c.stroke()}}else{c.beginPath();c.arc(f.x,f.y,(f.ring?10+34*q:4+(f.r||(f.big?18:9))*q),0,TAU);c.stroke()}}
  A.parts=A.parts.filter(p=>now-p.t0<p.life);for(const p of A.parts){const dt=now-p.t0;c.globalAlpha=1-dt/p.life;c.fillStyle=p.col;c.fillRect(Math.round(p.x+p.vx*dt),Math.round(p.y+p.vy*dt+dt*dt*.00008),2,2)}
  c.restore()}
 /* 탑: 그리기 목록 맨 위에 공격 그림 · 보스전: 장면 위에 */
 if(window.TPET106){const f=TPET106.list;TPET106.list=function(L,now){const r=f.apply(this,arguments);try{L.push({y:1e9,fn:()=>{try{drawShots(ctx,now)}catch(e){}}})}catch(e){}return r}}
 {const f=drawScene;drawScene=function(now){const r=f.apply(this,arguments);try{if(inTBoss())drawShots(ctx,performance.now())}catch(e){}return r}}
 {const f=frame;frame=function(){try{tick(performance.now())}catch(e){}return f.apply(this,arguments)}}

 /* ── 각성 모습: 펫 그림 앞뒤에 하늘빛 · 가슴의 각성석 ── */
 let inner=0;
 function decoOK(id){if(window.__mateDraw)return 0;try{const sm=document.getElementById('shopModal');if(id===eqPet()||(sm&&!sm.hidden))return awOf(id)?VIS:0}catch(e){}return 0}
 /* 각성 모습: 가슴에 각성석(💠)이 박힌다 — 뒤에 은은한 하늘빛, 앞에 가슴의 보석 · 보석에서 퍼지는 빛줄기 · 반짝임 */
 const GEM='#9ae8ff',GEM2='#3ab8e8';
 function back(c,id,x,y,now,k,aw){const t=now/1000,r=12*k;c.save();
  const g=c.createRadialGradient(x,y+r*.2,1,x,y+r*.2,r*2);g.addColorStop(0,'rgba(154,232,255,.55)');g.addColorStop(1,'rgba(154,232,255,0)');c.globalAlpha=.35+.12*Math.sin(t*3);c.fillStyle=g;c.beginPath();c.arc(x,y+r*.2,r*2,0,TAU);c.fill();c.restore()}
 function front(c,id,x,y,now,k,aw){const t=now/1000,r=12*k,gx=Math.round(x),gy=Math.round(y+r*.22),u=Math.max(1,Math.round(1.2*k)),pl=.5+.5*Math.sin(t*3.2);c.save();
  /* 몸에 퍼지는 빛줄기(가슴에서 바깥으로) */c.globalAlpha=.28+.3*pl;c.fillStyle=GEM;for(const [dx,dy] of [[-1,-1],[1,-1],[-1,1],[1,1],[0,-1.3],[-1.4,0],[1.4,0]]){for(let q=1;q<=3;q++)c.fillRect(Math.round(gx+dx*u*(2+q*1.6)),Math.round(gy+dy*u*(2+q*1.4)),u,u)}
  /* 보석 둘레 빛 */const g=c.createRadialGradient(gx,gy,0,gx,gy,u*7);g.addColorStop(0,'rgba(200,244,255,'+(.55+.35*pl)+')');g.addColorStop(1,'rgba(154,232,255,0)');c.globalAlpha=1;c.fillStyle=g;c.beginPath();c.arc(gx,gy,u*7,0,TAU);c.fill();
  /* 보석(마름모) — 테두리 · 면 · 하이라이트 */c.fillStyle='#0a1a2a';c.fillRect(gx-u,gy-3*u,2*u,u);c.fillRect(gx-2*u,gy-2*u,4*u,u);c.fillRect(gx-3*u,gy-u,6*u,2*u);c.fillRect(gx-2*u,gy+u,4*u,u);c.fillRect(gx-u,gy+2*u,2*u,u);
  c.fillStyle=GEM2;c.fillRect(gx-u,gy-2*u,2*u,u);c.fillRect(gx-2*u,gy-u,4*u,2*u);c.fillRect(gx-u,gy+u,2*u,u);
  c.fillStyle=GEM;c.fillRect(gx-2*u,gy-u,2*u,u);c.fillRect(gx-u,gy-2*u,u,u);c.fillStyle='#ffffff';c.globalAlpha=.6+.4*pl;c.fillRect(gx-u,gy-u,u,u);
  /* 반짝임 */const sp=(t*.7)%1;if(sp<.25){c.globalAlpha=1-sp*4;c.fillStyle='#fff';const z=u*(1+sp*6);c.fillRect(Math.round(gx+2*u),Math.round(gy-3*u-z/2),u,Math.round(z));c.fillRect(Math.round(gx+2*u-z/2+u/2),Math.round(gy-3*u),Math.round(z),u)}
  /* 떠오르는 작은 빛 조각 */for(let j=0;j<3;j++){const ph=(t*.9+j/3)%1;c.globalAlpha=(1-ph)*.7;c.fillStyle=j%2?'#fff':GEM;c.fillRect(Math.round(gx+Math.sin(j*2.1+t*1.5)*r*.8),Math.round(gy-ph*r*1.8),u,u)}
  c.restore()}
 function filt(id,aw,now){return 'drop-shadow(0 0 '+(2+Math.round(Math.sin(now/300)+1))+'px rgba(154,232,255,.9)) saturate(1.15)'}
 function wrapDraw(f){return function(c,id,x,y,now,k){const aw=inner?0:decoOK(id);if(!aw||!c||!c.save)return f.apply(this,arguments);inner++;k=k||1;
   try{back(c,id,x,y,now,k,aw)}catch(e){}c.save();try{c.filter=filt(id,aw,now)}catch(e){}let r;try{r=f.apply(this,arguments)}finally{c.restore();inner--}try{front(c,id,x,y,now,k,aw)}catch(e){}return r}}
 if(typeof drawPet==='function')drawPet=wrapDraw(drawPet);
 if(window.PET59&&PET59.draw){const f=PET59.draw;PET59.draw=function(c,v,x,y,now,k){const b=(PET59.byId&&PET59.byId(v)||{}).base;const id=typeof b==='number'?b:eqPet();const aw=inner?0:decoOK(id);if(!aw)return f.apply(this,arguments);
   inner++;k=k||1;try{back(c,id,x,y,now,k,aw)}catch(e){}c.save();try{c.filter=filt(id,aw,now)}catch(e){}let r;try{r=f.apply(this,arguments)}finally{c.restore();inner--}try{front(c,id,x,y,now,k,aw)}catch(e){}return r}}

 /* ── 공방 펫 칸: 각성 창 ── */
 let anim=0;
 function panel(){const old=document.getElementById('pa172');if(old)old.remove();if(typeof shopTab==='undefined'||shopTab!=='pt')return;
  const i=wsSelOf('pt'),inv=shopInv(),own=inv.inv.pt.includes(i);if(!own)return;const inf=$('wsInfo'),btn=$('wsBtn');if(!inf||!btn)return;
  const d=PD(),p=pet(i),done=p.aw>=1,sc=stoneCost(i,1),gc=goldCost(i,1),okS=d.st>=sc,okG=inv.coins>=gc;
  const el=document.createElement('div');el.id='pa172';if(done)el.classList.add('dn');if(anim&&performance.now()-anim<900)el.classList.add('up');
  el.innerHTML='<div class="h"><b>✦ 펫 각성</b>'+(done?'<span class="badge">✦ 각성 완료</span>':'<span class="badge off">각성 전</span>')+'</div>'+
   '<div class="r"><span>🐾 펫 Lv <b>'+p.lv+'</b>'+(p.lv<MAXLV?' <small>('+p.xp+' / '+needXp(p.lv)+')</small>':' <small>(최고)</small>')+'</span><span>💠 보유 <b>'+num(d.st)+'</b></span></div>'+
   '<div class="xp"><i style="width:'+(p.lv>=MAXLV?100:Math.round(p.xp/needXp(p.lv)*100))+'%"></i></div>'+
   '<div class="r"><span>펫 공격 <b class="an">「'+atkOf(i)[0]+'」</b></span></div>'+(done?'<div class="r"><span>탑에서 공격 중 · '+CD[1]+'초마다 · 「강타」 · 「펫 폭풍」</span></div><div class="mx">💠 가슴에 각성석이 박혔어요</div>':
    '<div class="nx">각성하면 <b>탑에서 스스로 공격</b> · 4번째 공격마다 <b>「강타」</b> · 12초마다 <b>「펫 폭풍」</b><br><small>가슴에 각성석이 박힌 모습으로 바뀌어요 · <b class="w">펫마다 단 한 번</b> · 등급 배율 ×'+gMul(i).toFixed(1)+'</small></div>'+
    '<button id="pa172go" class="'+(okS&&okG?'':'poor')+'">✦ 각성하기 · 💠 '+num(sc)+' <small>('+num(d.st)+')</small> + 🪙 '+num(gc)+'</button>')+
   '<p class="tip">💠 각성석은 탑 오르기에서만 아주 드물게 나와요(정예 · 탑 보스에서 조금 더). 펫은 탑에서만 공격해요.</p>';
  btn.parentNode.insertBefore(el,btn);const go=$('pa172go');if(go)go.onclick=()=>awaken(i)}
 function awaken(i){const d=PD(),p=pet(i),inv=shopInv();if(p.aw>=MAXAW)return;const sc=stoneCost(i,1),gc=goldCost(i,1);
  if(d.st<sc){try{wsSay('각성석이 '+num(sc-d.st)+'개 더 필요해! 탑에서 정예랑 보스를 노려 봐')}catch(e){}try{sfx(140,.15,'square',.04,90)}catch(e){}return}
  if(inv.coins<gc){try{wsSay('골드가 '+num(gc-inv.coins)+' 더 필요해!')}catch(e){}try{sfx(140,.15,'square',.04,90)}catch(e){}return}
  d.st-=sc;inv.coins-=gc;saveData.coins=inv.coins;p.aw=1;anim=performance.now();
  try{sfx(523,.2,'triangle',.07,1046);setTimeout(()=>sfx(784,.25,'triangle',.07,1568),120);setTimeout(()=>sfx(1046,.4,'triangle',.07,2093),260);perc('crash',audio.currentTime,.4)}catch(e){}
  try{wsSay('각성 성공! 이제 탑에서 '+PETS[i].name+'도 같이 싸워!')}catch(e){}try{saveNow();gmHud()}catch(e){}try{renderShop()}catch(e){}}
 if(typeof wsRefresh==='function'){const f=wsRefresh;wsRefresh=function(){const r=f.apply(this,arguments);try{panel();if(shopTab==='pt'){const aw=awOf(wsSelOf('pt')),h=document.querySelector('#wsInfo .wsHead b');if(h&&aw&&!h.querySelector('.pa172b'))h.insertAdjacentHTML('beforeend',' <span class="pa172b">✦ 각성</span>')}}catch(e){console.error('pa172',e)}return r}}

 const css=document.createElement('style');css.textContent=`
 #pa172{margin:8px 0 6px;padding:10px 12px;border-radius:12px;background:linear-gradient(180deg,#0c1e2c,#060e16);border:1px solid #7dd8ff66;box-shadow:inset 0 1px 0 #ffffff14;display:flex;flex-direction:column;gap:5px}
 #pa172.up{animation:pa172u .9s ease-out}@keyframes pa172u{0%{box-shadow:0 0 0 0 #9ae8ff,inset 0 0 30px #9ae8ff}100%{box-shadow:0 0 0 14px #9ae8ff00}}
 #pa172 .h{display:flex;align-items:center;gap:8px}#pa172 .h b{color:#9ae8ff;font-size:14px}
 #pa172 .badge{margin-left:auto;font-size:11px;font-weight:900;padding:2px 8px;border-radius:8px;color:#3a2a00;background:linear-gradient(180deg,#fff0b0,#ffc040);box-shadow:0 0 8px #ffb02088}#pa172 .badge.off{color:#9fb0c8;background:#1a2a38;box-shadow:none}#pa172.dn{border-color:#ffd16699;background:linear-gradient(180deg,#2a2208,#0e0a04)}#pa172 .nx b.w{color:#ffb8c8}
 #pa172 .r{display:flex;justify-content:space-between;gap:8px;font-size:12px;color:#c8e0f0;flex-wrap:wrap}#pa172 .r b{color:#fff}#pa172 .r b.an{color:#ffe79a}#pa172 .r small{color:#8fa8c0}#pa172 .lk{color:#ffb8c8}#pa172 .nm{color:#ffe79a}
 #pa172 .xp{height:5px;border-radius:3px;background:#1a2a38;overflow:hidden}#pa172 .xp i{display:block;height:100%;background:linear-gradient(90deg,#7dffa8,#9ae8ff)}
 #pa172 .nx{font-size:12px;color:#c8e0f0;padding:6px 8px;border-radius:9px;background:#ffffff0a}#pa172 .nx b{color:#7dffa8}#pa172 .nx small{color:#8fa8c0}
 #pa172 .mx{font-weight:900;color:#ffd166;text-align:center}
 #pa172 button{font:inherit;font-weight:900;font-size:13px;padding:9px;border-radius:10px;border:0;cursor:pointer;background:linear-gradient(180deg,#c8f0ff,#5ab8e8);color:#04121a;box-shadow:0 0 0 2px #000}
 #pa172 button small{font-weight:700;opacity:.7}#pa172 button.poor{filter:grayscale(.7) brightness(.75)}
 #pa172 .tip{margin:0;font-size:10.5px;color:#7f98ae;line-height:1.5}
 .pa172b{display:inline-block;font-style:normal;font-size:.72em;font-weight:900;padding:0 5px;border-radius:6px;margin-right:4px;vertical-align:middle;color:#3a2a00;background:linear-gradient(180deg,#fff0b0,#ffc040)}
 html.lp #shopModal.wsFull:not(.ws148o) #pa172{display:none!important}
 #pa172t{position:fixed;left:50%;top:18%;transform:translateX(-50%);z-index:9600;display:flex;flex-direction:column;align-items:center;gap:2px;padding:12px 22px;border-radius:16px;background:radial-gradient(120% 120% at 50% 0%,#1a4a6a,#06121c);border:2px solid #9ae8ff;color:#fff;box-shadow:0 0 30px #9ae8ff88,0 10px 30px #000a;pointer-events:none;font-family:inherit}
 #pa172t[hidden]{display:none}#pa172t b{font-size:20px;color:#c8f4ff;text-shadow:0 0 12px #9ae8ff}#pa172t small{font-size:12px;color:#9fc0d8}
 #pa172t.on{animation:pa172t 3.6s ease-out forwards}@keyframes pa172t{0%{opacity:0;transform:translateX(-50%) scale(.6)}8%{opacity:1;transform:translateX(-50%) scale(1.08)}14%{transform:translateX(-50%) scale(1)}85%{opacity:1}100%{opacity:0}}`;document.head.appendChild(css);
 window.PA172={PD,pet,awOf,gainStone,stoneCost,goldCost,A,tick};
}catch(e){console.error('v172 pet awaken',e)}})();
