/* ================= v184 무한 서바이벌 (SV184) =================
   뱀파이어 서바이버 식 모드(mode='sv184'): 나는 움직이기만 하고 공격은 자동. 끝없이 넓은 땅(카메라가 나를 따라감)에서
   시간이 갈수록 더 많고 센 몬스터가 사방에서 몰려온다. 경험치 보석을 모아 레벨이 오르면 기술 카드 3장 중 하나를 고른다.
   - 기술 6종(검기 · 회전 칼날 · 번개 · 불꽃 오라 · 얼음 폭발 · 유도 구슬) + 강화 6종(공격 · 속도 · 체력 · 쿨타임 · 자석 · 회복), 각 5레벨.
   - 장비가 이어진다: 캐릭터 체력(charStats) · 무기 공격력(WEAPONS[장착].dmg)이 기술 피해에 곱해짐.
   - 조작: 이동(방향키/WASD · 조이스틱) · 대시 K/Shift(대시 단추, 잠깐 무적) · 궁극기 C(궁극기 단추, 화면 전체 폭발).
   - 1분마다 정예 몬스터, 1분 30초마다 박쥐 떼가 나를 둘러쌈. 버틴 시간이 기록 · 보상(하루 상한 DAY_CAP).
   - 몬스터 그림은 탑의 것(TW71.mobFrame)을 쓰고, 화면은 이 파일이 직접 그린다(frame 가로채기, DB183과 같은 방식). */
(function(){try{
 if(!window.TW71||!TW71.mobFrame)return;
 const TAU=Math.PI*2,rnd=(a,b)=>a+Math.random()*(b-a),$=id=>document.getElementById(id),num=n=>Math.round(+n||0).toLocaleString();
 const DAY_CAP=8000,MAXE=170,COX=20,COY=35,CW=40,CH=40;
 const DM=()=>({easy:.75,normal:1,hard:1.35,extreme:1.8})[typeof diff!=='undefined'?diff:'normal']||1;
 const sv=()=>saveData.sv184||(saveData.sv184={best:0,bestK:0,day:'',got:0});
 let S=null,last=0;
 /* ---------- 몬스터 종류(나오기 시작하는 분) ---------- */
 const EN=[['slime',0,18,32,6],['bat',.5,12,58,5],['boar',1.5,40,40,9],['spider',2.5,30,52,7],['knight',3.5,95,30,12],['golem',5,230,24,16],['wisp',6,55,46,9]];
 /* ---------- 기술 · 강화 ---------- */
 const SK={
  slash:{n:'검기',ic:'🗡',d:l=>'가장 가까운 적에게 초승달 검기 '+(1+Math.floor(l/2))+'개 · 관통 '+(2+l)},
  orbit:{n:'회전 칼날',ic:'🌀',d:l=>'내 둘레를 도는 칼날 '+(l+1)+'개'},
  bolt:{n:'번개',ic:'⚡',d:l=>'화면의 적 '+(l+1)+'명에게 번개'},
  aura:{n:'불꽃 오라',ic:'🔥',d:l=>'둘레 '+(30+6*l)+'칸 안의 적을 계속 태움'},
  nova:{n:'얼음 폭발',ic:'❄',d:l=>'주변을 얼려 느리게 하는 폭발(반경 '+(70+10*l)+')'},
  orb:{n:'유도 구슬',ic:'🔮',d:l=>'적을 쫓아가는 구슬 '+l+'개'},
  atk:{n:'공격력',ic:'💪',d:l=>'모든 피해 +'+12*l+'%',p:1},
  spd:{n:'이동 속도',ic:'👟',d:l=>'이동 속도 +'+8*l+'%',p:1},
  hp:{n:'최대 체력',ic:'❤',d:l=>'최대 체력 +'+20*l+' · 바로 회복',p:1},
  cdr:{n:'쿨타임',ic:'⏱',d:l=>'기술 쿨타임 -'+8*l+'%',p:1},
  mag:{n:'자석',ic:'🧲',d:l=>'보석 줍는 범위 +'+30*l+'%',p:1},
  reg:{n:'회복',ic:'✚',d:l=>'초당 체력 '+(.4*l).toFixed(1)+' 회복',p:1}};
 const lvOf=k=>S.sk[k]||0;
 const wpMul=()=>{try{const w=WEAPONS[shopInv().eq.wp||0]||{};return Math.max(1,Math.min(3,w.dmg||1))}catch(e){return 1}};
 const PW=()=>wpMul()*(1+.12*lvOf('atk'));
 const CDR=()=>1-.08*lvOf('cdr');
 /* ---------- 시작 · 끝 ---------- */
 function start(){try{initAudio()}catch(e){}try{if(typeof CS!=='undefined')CS=null}catch(e){}try{story=false}catch(e){}
  enterGame();$('overlay').hidden=true;mode='sv184';paused=false;let hp=100;try{hp=charStats(shopInv().eq.ch||0).hp||100}catch(e){}
  S={t:0,x:0,y:0,face:1,walkT:0,mv:false,hp,max:hp,inv:0,lv:1,xp:0,need:5,kills:0,en:[],pr:[],gems:[],fx:[],pops:[],sk:{slash:1},cd:{},dash:{cd:0,t:-9,vx:0,vy:0},gauge:0,
   choose:null,over:false,spawnAcc:0,nextElite:60,nextSwarm:90,shake:0,id:0};
  try{$('bvTitle').textContent='BEAT BLADE · 무한 서바이벌'}catch(e){}
  try{stopMusic();startMusic(makeSong(4),performance.now(),0)}catch(e){}
  try{if(typeof ensureUltBtn==='function')ensureUltBtn()}catch(e){}btnVis(true);last=performance.now()}
 function btnVis(on){for(const id of ['btnA','btnP']){const b=$(id);if(b)b.style.visibility=on?'hidden':''}}
 function gameOver(){if(S.over)return;S.over=true;closeChoose();const s=sv(),today=new Date().toISOString().slice(0,10);if(s.day!==today){s.day=today;s.got=0}
  const raw=Math.floor(S.t/60*150+S.kills),g=Math.max(0,Math.min(raw,DAY_CAP-s.got));s.got+=g;try{if(g>0)addCoins(g)}catch(e){}
  const nb=S.t>s.best;if(nb){s.best=S.t;s.bestK=S.kills}try{saveNow()}catch(e){}try{sfx(70,1,'sawtooth',.07,30)}catch(e){}
  setTimeout(()=>{try{stopMusic()}catch(e){}try{showOverlay('♾ 무한 서바이벌','쓰러졌어요',
   '<b style="color:#ffd166;font-size:1.25em">'+clk(S.t)+' 버팀 · 레벨 '+S.lv+' · 처치 '+num(S.kills)+'</b>'+(nb?'<br><b style="color:#8affc8">★ 새 최고 기록!</b>':'<br>최고 기록 '+clk(s.best))+
   '<br>보상 🪙 '+num(g)+(g<raw?' <small>(오늘 받을 수 있는 골드 '+num(DAY_CAP)+'까지)</small>':''),
   [['로비로',()=>{try{toLobby()}catch(e){}},true],['↺ 다시',()=>{$('overlay').hidden=true;start()},false]])}catch(e){console.error(e)}},1200)}
 const clk=t=>Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0');
 /* ---------- 몬스터 ---------- */
 function spawn(k,elite,ang){const e=EN.find(q=>q[0]===k)||EN[0],m=S.t/60,hpM=(1+m*.35+Math.pow(m/5,2))*DM()*(elite?12:1);const a=ang!=null?ang:rnd(0,TAU),r=elite?260:rnd(250,300);
  S.en.push({id:++S.id,k,x:S.x+Math.cos(a)*r,y:S.y+Math.sin(a)*r*.75,hp:e[2]*hpM,max:e[2]*hpM,sp:e[3]*rnd(.9,1.1)*(elite?.85:1),dmg:e[4]*(1+m*.12)*DM()*(elite?2:1),elite:!!elite,r:(TW71.SP[k]&&TW71.SP[k].r||7)*(elite?1.6:1),hitT:-9,slow:0,face:1,view:'front',wp:Math.random()*6,hc:{}})}
 function hit(e,d,col){if(e.hp<=0)return;e.hp-=d;e.hitT=S.t;if(S.pops.length<50&&Math.random()<.5)S.pops.push({x:e.x,y:e.y-22,t:S.t,txt:Math.round(d),c:col||'#fff'});
  if(e.hp<=0){e.dead=S.t;S.kills++;S.gauge=Math.min(100,S.gauge+(e.elite?15:.6));S.gems.push({x:e.x,y:e.y,v:e.elite?20:(S.t>240&&Math.random()<.2?3:1)});if(e.elite)S.fx.push({k:'boom',x:e.x,y:e.y,t:S.t,r:40,c:'#ffd166'});try{if(Math.random()<.3)sfx(300+Math.random()*200,.06,'square',.02,120)}catch(e2){}}}
 /* ---------- 레벨 업 고르기 ---------- */
 function offer(){const all=Object.keys(SK).filter(k=>lvOf(k)<5);const skills=all.filter(k=>!SK[k].p),have=Object.keys(S.sk).filter(k=>!SK[k].p).length;
  let pool=all.filter(k=>SK[k].p||lvOf(k)>0||have<5);const out=[];while(out.length<3&&pool.length){const w=pool.map(k=>lvOf(k)>0?2:1),sum=w.reduce((a,b)=>a+b,0);let r=Math.random()*sum,i=0;for(;i<pool.length;i++){r-=w[i];if(r<=0)break}out.push(pool[Math.min(i,pool.length-1)]);pool.splice(Math.min(i,pool.length-1),1)}
  if(!out.length)out.push('_gold');return out}
 function levelUp(){S.lv++;S.xp-=S.need;S.need=Math.round(4+S.lv*4+Math.pow(S.lv,1.5));const L=offer();S.choose=L;try{sfx(660,.25,'triangle',.05,1320)}catch(e){}
  const ov=document.createElement('div');ov.id='sv184lv';ov.innerHTML='<div class="h">⬆ 레벨 '+S.lv+'! 기술을 하나 고르세요 <small>(1 · 2 · 3)</small></div><div class="cs">'+L.map((k,i)=>{if(k==='_gold')return '<button data-i="'+i+'"><b>🪙</b><em>골드 +100 · 체력 회복</em><span>모든 기술이 최고 레벨이에요</span></button>';const s=SK[k],l=lvOf(k);
   return '<button data-i="'+i+'"><b>'+s.ic+'</b><em>'+s.n+' <i>'+(l?'Lv '+l+' → '+(l+1):'새 기술')+'</i></em><span>'+s.d(l+1)+'</span></button>'}).join('')+'</div>';
  document.body.appendChild(ov);ov.querySelectorAll('button').forEach(b=>b.onclick=()=>pick(+b.dataset.i))}
 function pick(i){if(!S||!S.choose)return;const k=S.choose[i];if(k==null)return;if(k==='_gold'){try{addCoins(100)}catch(e){}S.hp=S.max}else{S.sk[k]=lvOf(k)+1;if(k==='hp'){S.max+=20;S.hp=Math.min(S.max,S.hp+40)}}closeChoose();if(S.xp>=S.need)levelUp()}
 function closeChoose(){if(S)S.choose=null;try{$('sv184lv')?.remove()}catch(e){}}
 addEventListener('keydown',e=>{if(typeof mode==='undefined'||mode!=='sv184'||!S)return;if(S.choose){const n={Digit1:0,Digit2:1,Digit3:2,Numpad1:0,Numpad2:1,Numpad3:2}[e.code];if(n!=null){e.preventDefault();pick(n)}return}
  if(paused||e.repeat)return;if(e.code==='KeyC'){e.preventDefault();ult()}});
 /* ---------- 내 기술 ---------- */
 function nearestE(x,y,maxD){let b=null,bd=maxD||1e9;for(const e of S.en){if(e.hp<=0)continue;const d=Math.hypot(e.x-x,e.y-y);if(d<bd){bd=d;b=e}}return b}
 function onScreen(e){return Math.abs(e.x-S.x)<W/2+20&&Math.abs(e.y-S.y)<H/2+20}
 function skills(dt){const t=S.t,pw=PW(),cr=CDR();const ready=(k,cd)=>{if((S.cd[k]||0)>t)return false;S.cd[k]=t+cd*cr;return true};
  /* 검기 */{const l=lvOf('slash');if(l&&ready('slash',Math.max(.45,1.05-.1*l))){const tg=nearestE(S.x,S.y,260);let a=tg?Math.atan2(tg.y-S.y,tg.x-S.x):(S.face>0?0:Math.PI);const n=1+Math.floor(l/2);
   for(let i=0;i<n;i++){const aa=a+(i-(n-1)/2)*.28;S.pr.push({k:'slash',x:S.x,y:S.y-10,vx:Math.cos(aa)*240,vy:Math.sin(aa)*240,t,life:.75,dmg:(14+6*l)*pw,pierce:2+l,hit:{}})}try{sfx(520,.05,'triangle',.02,260)}catch(e){}}}
  /* 회전 칼날 */{const l=lvOf('orbit');if(l){const n=l+1,R=34+l*3;for(let i=0;i<n;i++){const a=t*3.2+i/n*TAU,bx=S.x+Math.cos(a)*R,by=S.y-8+Math.sin(a)*R*.75;for(const e of S.en){if(e.hp<=0)continue;if(Math.hypot(e.x-bx,e.y-6-by)<e.r+7&&(e.hc.o||0)<t){e.hc.o=t+.35;hit(e,(8+3*l)*pw,'#bfe6ff')}}}}}
  /* 번개 */{const l=lvOf('bolt');if(l&&ready('bolt',Math.max(.8,1.7-.15*l))){const L=S.en.filter(e=>e.hp>0&&onScreen(e)).sort(()=>Math.random()-.5).slice(0,l+1);
   for(const e of L){S.fx.push({k:'bolt',x:e.x,y:e.y,t});for(const o of S.en)if(o.hp>0&&Math.hypot(o.x-e.x,o.y-e.y)<18)hit(o,(22+8*l)*pw,'#fff8a0')}if(L.length)try{sfx(900,.08,'square',.025,200)}catch(e){}}}
  /* 불꽃 오라 */{const l=lvOf('aura');if(l&&ready('aura',.5)){const R=30+6*l;for(const e of S.en)if(e.hp>0&&Math.hypot(e.x-S.x,(e.y-S.y)*1.3)<R+e.r)hit(e,(6+3*l)*pw,'#ffb060')}}
  /* 얼음 폭발 */{const l=lvOf('nova');if(l&&ready('nova',Math.max(1.8,4-.4*l))){const R=70+10*l;S.fx.push({k:'ring',x:S.x,y:S.y,t,r:R,c:'#9ae8ff'});for(const e of S.en)if(e.hp>0&&Math.hypot(e.x-S.x,(e.y-S.y)*1.3)<R){hit(e,(15+6*l)*pw,'#bff4ff');e.slow=t+2}try{sfx(1200,.2,'sine',.03,400)}catch(e){}}}
  /* 유도 구슬 */{const l=lvOf('orb');if(l&&ready('orb',1.4)){for(let i=0;i<l;i++){const a=rnd(0,TAU);S.pr.push({k:'orb',x:S.x,y:S.y-10,vx:Math.cos(a)*90,vy:Math.sin(a)*90,t,life:3,dmg:(16+5*l)*pw,pierce:1,hit:{}})}}}
 }
 function dash(){if(!S||S.over||S.choose||paused||S.dash.cd>S.t)return;const [ix,iy]=moveInput();let dx=ix,dy=iy;if(!dx&&!dy)dx=S.face;const l=Math.hypot(dx,dy)||1;S.dash={cd:S.t+2.4*CDR(),t:S.t,vx:dx/l*420,vy:dy/l*420};S.inv=S.t+.35;try{sfx(500,.12,'triangle',.04,250)}catch(e){}}
 function ult(){if(!S||S.over||S.choose||paused||S.gauge<100)return;S.gauge=0;S.shake=1;S.fx.push({k:'ring',x:S.x,y:S.y,t:S.t,r:300,c:'#ffd166'});S.fx.push({k:'flash',t:S.t});const pw=PW();
  for(const e of S.en)if(e.hp>0&&onScreen(e))hit(e,(220+S.lv*12)*pw,'#ffd166');for(const g of S.gems)g.pull=1;try{sfx(80,1.2,'sawtooth',.07,40)}catch(e){}}
 /* ---------- 매 프레임 ---------- */
 function tick(dt){const t=(S.t+=dt),m=t/60;if(S.shake>0)S.shake=Math.max(0,S.shake-dt*2.5);
  /* 이동 */const [ix,iy]=moveInput();const sp=95*(1+.08*lvOf('spd'));if(t-S.dash.t<.18){S.x+=S.dash.vx*dt;S.y+=S.dash.vy*dt}else{S.x+=ix*sp*dt;S.y+=iy*sp*dt}S.mv=Math.hypot(ix,iy)>.1;if(S.mv)S.walkT+=dt*9;if(Math.abs(ix)>.15)S.face=ix>0?1:-1;
  if(lvOf('reg'))S.hp=Math.min(S.max,S.hp+.4*lvOf('reg')*dt);
  /* 소환 */const live=S.en.length,rate=Math.min(15,2+m*1.2);S.spawnAcc+=rate*dt;while(S.spawnAcc>=1&&live<MAXE){S.spawnAcc--;const pool=EN.filter(e=>e[1]<=m);const w=pool.map((e,i)=>1+i*.5*(m>e[1]+2?1:.4));let r=Math.random()*w.reduce((a,b)=>a+b,0),i=0;for(;i<pool.length;i++){r-=w[i];if(r<=0)break}spawn(pool[Math.min(i,pool.length-1)][0],false)}
  if(S.spawnAcc>5)S.spawnAcc=5;
  if(t>=S.nextElite){S.nextElite+=60;const pool=EN.filter(e=>e[1]<=m+1);spawn(pool[pool.length-1][0],true);S.fx.push({k:'banner',t,txt:'⚠ 정예 몬스터 등장!'})}
  if(t>=S.nextSwarm){S.nextSwarm+=90;for(let i=0;i<24;i++){const a=i/24*TAU;S.en.push(Object.assign({},{id:++S.id,k:'bat',x:S.x+Math.cos(a)*230,y:S.y+Math.sin(a)*170,hp:12*(1+m*.35)*DM(),max:12*(1+m*.35)*DM(),sp:48,dmg:5*(1+m*.12)*DM(),elite:false,r:6,hitT:-9,slow:0,face:1,view:'front',wp:0,hc:{}}))}S.fx.push({k:'banner',t,txt:'박쥐 떼가 둘러쌌다!'})}
  /* 몬스터 움직임 · 닿으면 피해 */for(const e of S.en){if(e.hp<=0)continue;const dx=S.x-e.x,dy=S.y-e.y,d=Math.hypot(dx,dy)||1,s=e.sp*(e.slow>t?.5:1);e.x+=dx/d*s*dt;e.y+=dy/d*s*dt;e.mvx=dx;e.mvy=dy;e.wp+=s*dt*.03;
   if(d<e.r+7&&S.inv<t){S.hp-=e.dmg;S.inv=t+.5;S.shake=Math.max(S.shake,.3);S.pops.push({x:S.x,y:S.y-34,t,txt:'-'+Math.round(e.dmg),c:'#ff6a5a'});try{sfx(140,.12,'square',.04,70)}catch(e2){}if(S.hp<=0){S.hp=0;gameOver();return}}
   if(d>520){const a=rnd(0,TAU);e.x=S.x+Math.cos(a)*260;e.y=S.y+Math.sin(a)*200}}
  /* 몬스터끼리 살짝 밀기(가까운 몇 마리만) */for(let i=0;i<S.en.length;i+=2){const a=S.en[i],b=S.en[i+1];if(!b)break;const dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);const md=a.r+b.r;if(d>0&&d<md){const p=(md-d)/2/d;a.x-=dx*p;a.y-=dy*p;b.x+=dx*p;b.y+=dy*p}}
  skills(dt);
  /* 투사체 */for(const p of S.pr){if(p.k==='orb'){const tg=nearestE(p.x,p.y,220);if(tg){const ax=tg.x-p.x,ay=tg.y-8-p.y,l=Math.hypot(ax,ay)||1;p.vx+=(ax/l*260-p.vx)*Math.min(1,dt*3);p.vy+=(ay/l*260-p.vy)*Math.min(1,dt*3)}}
   p.x+=p.vx*dt;p.y+=p.vy*dt;for(const e of S.en){if(e.hp<=0||p.hit[e.id])continue;if(Math.hypot(e.x-p.x,e.y-8-p.y)<e.r+(p.k==='slash'?9:5)){p.hit[e.id]=1;hit(e,p.dmg,p.k==='orb'?'#d8b0ff':'#ffffff');if(--p.pierce<=0){p.dead=1;break}}}}
  S.pr=S.pr.filter(p=>!p.dead&&t-p.t<p.life);S.en=S.en.filter(e=>e.hp>0||t-e.dead<.25);
  /* 보석 */const MR=50*(1+.3*lvOf('mag'));for(const g of S.gems){const dx=S.x-g.x,dy=S.y-6-g.y,d=Math.hypot(dx,dy)||1;if(g.pull||d<MR){g.pull=1;const s=Math.max(180,320-d);g.x+=dx/d*s*dt;g.y+=dy/d*s*dt}if(d<10){g.got=1;S.xp+=g.v;try{sfx(1300,.03,'sine',.015,1800)}catch(e){}}}
  S.gems=S.gems.filter(g=>!g.got);if(S.gems.length>400)S.gems.splice(0,S.gems.length-400);
  if(S.xp>=S.need&&!S.choose)levelUp();
  S.fx=S.fx.filter(f=>t-f.t<(f.k==='banner'?2.2:.6));S.pops=S.pops.filter(p=>t-p.t<.7)}
 /* ---------- 그리기 ---------- */
 let tile=null;function mkTile(){const c=document.createElement('canvas');c.width=c.height=64;const o=c.getContext('2d');o.fillStyle='#1d2420';o.fillRect(0,0,64,64);
  for(let i=0;i<70;i++){o.fillStyle=['#232b26','#1a201c','#27302a'][i%3];o.fillRect(Math.floor(Math.random()*64),Math.floor(Math.random()*64),2,2)}o.fillStyle='#2c362f';o.fillRect(0,0,64,1);o.fillRect(0,0,1,64);
  for(let i=0;i<6;i++){o.fillStyle='#3a5a32';const x=Math.floor(Math.random()*60),y=Math.floor(Math.random()*60);o.fillRect(x,y,1,3);o.fillRect(x+2,y+1,1,2)}return c}
 function drawHero(c){const sv0=mode;try{mode='village';const fl=S.face<0,blink=S.inv>S.t&&Math.floor(S.t*20)%2;if(!blink)drawKnight(c,S.x-12,S.y-19,2,fl,S.mv?S.walkT:null,S.mv?null:performance.now()/430)}catch(e){}finally{mode=sv0}}
 function drawEn(c,e){const tm=S.t;let pose='w';if(Math.abs(e.mvx||0)>Math.abs(e.mvy||0)*1.15){e.view='side';e.face=e.mvx>=0?1:-1}else e.view=(e.mvy||0)>0?'front':'back';
  const fi=Math.floor(e.wp*6)%6;let img=null;try{img=TW71.mobFrame(e.k,TW71.mpal(e.k),e.elite,e.view,pose,fi)}catch(er){}const us=e.elite?1.85:1.3,al=e.hp<=0?Math.max(0,1-(tm-(e.dead||tm))/.25):1;
  c.save();c.globalAlpha=al*.3;c.fillStyle='#000';c.beginPath();c.ellipse(e.x,e.y,e.r*1.1,e.r*.4,0,0,TAU);c.fill();c.globalAlpha=al;
  if(img){c.translate(e.x,e.y);c.scale(e.view==='side'&&e.face<0?-1:1,1);c.drawImage(img,-COX*us,-COY*us,CW*us,CH*us);if(tm-e.hitT<.1){c.globalCompositeOperation='lighter';c.globalAlpha=.7;c.drawImage(img,-COX*us,-COY*us,CW*us,CH*us)}}
  else{c.fillStyle='#8ad86a';c.beginPath();c.arc(e.x,e.y-6,e.r,0,TAU);c.fill()}c.restore();
  if(e.slow>tm&&e.hp>0){c.fillStyle='#9ae8ff88';c.fillRect(e.x-e.r,e.y-2,e.r*2,2)}
  if(e.elite&&e.hp>0){c.fillStyle='#000a';c.fillRect(e.x-16,e.y-e.r*2.6-8,32,3);c.fillStyle='#ffd166';c.fillRect(e.x-16,e.y-e.r*2.6-8,32*Math.max(0,e.hp/e.max),3)}}
 function draw(now){const c=ctx,t=S.t;c.save();c.setTransform(SS,0,0,SS,0,0);c.imageSmoothingEnabled=false;
  if(!tile)tile=mkTile();const cx=Math.round(S.x-W/2+(S.shake?rnd(-1,1)*S.shake*3:0)),cy=Math.round(S.y-H/2+(S.shake?rnd(-1,1)*S.shake*3:0));
  const ox=((-cx%64)+64)%64,oy=((-cy%64)+64)%64;for(let x=ox-64;x<W;x+=64)for(let y=oy-64;y<H;y+=64)c.drawImage(tile,x,y);
  c.save();c.translate(-cx,-cy);
  /* 오라 · 보석 */{const l=lvOf('aura');if(l){const R=30+6*l;c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(S.x,S.y,0,S.x,S.y,R);g.addColorStop(0,'rgba(255,120,40,0)');g.addColorStop(.7,'rgba(255,120,40,.12)');g.addColorStop(1,'rgba(255,160,60,.35)');c.fillStyle=g;c.beginPath();c.ellipse(S.x,S.y,R,R/1.3,0,0,TAU);c.fill();c.restore()}}
  for(const g of S.gems){const col=g.v>=20?'#ffd166':g.v>=3?'#8aff9a':'#6ad0ff';c.fillStyle='#0008';c.fillRect(g.x-2,g.y+1,4,1);c.fillStyle=col;c.beginPath();c.moveTo(g.x,g.y-4);c.lineTo(g.x+3,g.y-1);c.lineTo(g.x,g.y+2);c.lineTo(g.x-3,g.y-1);c.closePath();c.fill();c.fillStyle='#fff';c.fillRect(g.x-1,g.y-3,1,1)}
  /* 몸들(y 순서) */const L=S.en.filter(e=>Math.abs(e.x-S.x)<W/2+40&&Math.abs(e.y-S.y)<H/2+50).map(e=>({y:e.y,f:()=>drawEn(c,e)}));L.push({y:S.y,f:()=>drawHero(c)});L.sort((a,b)=>a.y-b.y).forEach(o=>o.f());
  /* 회전 칼날 */{const l=lvOf('orbit');if(l){const n=l+1,R=34+l*3;for(let i=0;i<n;i++){const a=t*3.2+i/n*TAU,bx=S.x+Math.cos(a)*R,by=S.y-8+Math.sin(a)*R*.75;c.save();c.translate(bx,by);c.rotate(a+t*8);c.fillStyle='#e8f4ff';c.fillRect(-6,-1,12,2);c.fillStyle='#7ad8ff';c.fillRect(-1,-4,2,8);c.restore()}}}
  /* 투사체 */for(const p of S.pr){c.save();if(p.k==='slash'){c.translate(p.x,p.y);c.rotate(Math.atan2(p.vy,p.vx));c.globalCompositeOperation='lighter';c.strokeStyle='#e8f4ff';c.lineWidth=3;c.beginPath();c.arc(-4,0,10,-1.1,1.1);c.stroke();c.strokeStyle='#7ad8ff';c.lineWidth=1.5;c.beginPath();c.arc(-6,0,9,-1,1);c.stroke()}
   else{c.globalCompositeOperation='lighter';const g=c.createRadialGradient(p.x,p.y,0,p.x,p.y,7);g.addColorStop(0,'#fff');g.addColorStop(.4,'#c88aff');g.addColorStop(1,'rgba(160,80,255,0)');c.fillStyle=g;c.fillRect(p.x-7,p.y-7,14,14)}c.restore()}
  /* 효과 */for(const f of S.fx){const e=t-f.t;c.save();if(f.k==='ring'){const q=e/.5;c.globalAlpha=Math.max(0,1-q);c.strokeStyle=f.c;c.lineWidth=3;c.beginPath();c.ellipse(f.x,f.y,f.r*Math.min(1,q*1.5),f.r*Math.min(1,q*1.5)/1.3,0,0,TAU);c.stroke()}
   else if(f.k==='bolt'){c.globalAlpha=Math.max(0,1-e/.3);c.strokeStyle='#fff8a0';c.lineWidth=2;c.beginPath();let x=f.x,y=f.y-140;c.moveTo(x,y);for(let i=0;i<6;i++){x=f.x+rnd(-8,8);y+=23;c.lineTo(x,y)}c.stroke();c.fillStyle='#fff8a0';c.beginPath();c.ellipse(f.x,f.y,12,5,0,0,TAU);c.fill()}
   else if(f.k==='boom'){c.globalCompositeOperation='lighter';c.globalAlpha=Math.max(0,1-e/.5);const g=c.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r);g.addColorStop(0,'#fff6c0');g.addColorStop(1,'rgba(255,160,40,0)');c.fillStyle=g;c.fillRect(f.x-f.r,f.y-f.r,f.r*2,f.r*2)}c.restore()}
  c.save();c.textAlign='center';c.font='bold 7px sans-serif';for(const p of S.pops){const e=t-p.t;c.globalAlpha=Math.max(0,1-e/.7);c.fillStyle=p.c;c.fillText(p.txt,p.x,p.y-e*14)}c.restore();
  c.restore();
  for(const f of S.fx)if(f.k==='flash'){const e=t-f.t;c.save();c.globalAlpha=Math.max(0,.7-e*1.4);c.fillStyle='#fff6d0';c.fillRect(0,0,W,H);c.restore()}
  hud(c,now);c.restore()}
 function hud(c,now){const t=S.t;c.save();c.textBaseline='middle';
  /* 위: 경험치 막대 · 레벨 · 시간 · 처치 */c.fillStyle='#000c';c.fillRect(0,0,W,7);c.fillStyle='#5ab8ff';c.fillRect(0,0,W*Math.min(1,S.xp/S.need),7);c.fillStyle='#ffffff44';c.fillRect(0,0,W*Math.min(1,S.xp/S.need),2);
  c.font='900 7px sans-serif';c.fillStyle='#fff';c.fillText('Lv '+S.lv,4,4);c.textAlign='center';c.font='900 14px sans-serif';c.lineWidth=3;c.strokeStyle='#000';c.strokeText(clk(t),W/2,20);c.fillStyle='#fff';c.fillText(clk(t),W/2,20);
  c.textAlign='right';c.font='800 9px sans-serif';c.strokeText('💀 '+num(S.kills),W-8,20);c.fillStyle='#ffd8b0';c.fillText('💀 '+num(S.kills),W-8,20);c.textAlign='left';
  /* 왼쪽 위: 체력 */c.fillStyle='#05070acc';c.fillRect(6,12,110,16);c.fillStyle='#3a0806';c.fillRect(10,16,80,8);c.fillStyle=S.hp<S.max*.3?'#ff3a2a':'#ff6a5a';c.fillRect(10,16,80*S.hp/S.max,8);c.font='800 7px sans-serif';c.fillStyle='#fff';c.fillText(Math.ceil(S.hp)+'/'+S.max,93,20);
  /* 내 머리 위 작은 체력 */c.fillStyle='#000a';c.fillRect(W/2-10,H/2+6,20,2.5);c.fillStyle='#ff6a5a';c.fillRect(W/2-10,H/2+6,20*S.hp/S.max,2.5);
  /* 왼쪽 아래: 기술 칸 */let x=6;for(const k of Object.keys(S.sk)){const s=SK[k];c.fillStyle='#05070acc';c.fillRect(x,H-22,30,16);c.font='9px sans-serif';c.fillStyle='#fff';c.fillText(s.ic,x+3,H-14);c.font='800 7px sans-serif';c.fillStyle='#ffd166';c.fillText(s.p?'+'+S.sk[k]:'Lv'+S.sk[k],x+14,H-14);x+=32}
  /* 오른쪽 아래: 대시 · 궁극기 */const bx=W-128,by=H-22;[['K 대시',Math.max(0,(S.dash.cd-t)/(2.4*CDR())),'#7ad8ff'],['C 궁극기',1-S.gauge/100,'#ffd166']].forEach(([n,r,col],i)=>{const xx=bx+i*62;c.fillStyle='#05070acc';c.fillRect(xx,by,58,16);c.fillStyle=col+'44';c.fillRect(xx,by,58*(1-r),16);c.strokeStyle=r<=0&&Math.floor(now/200)%2?col:col+'88';c.strokeRect(xx+.5,by+.5,57,15);c.font='800 7px sans-serif';c.fillStyle='#fff';c.fillText(n+(i===1?' '+Math.floor(S.gauge)+'%':''),xx+4,by+8)});
  for(const f of S.fx)if(f.k==='banner'){const e=t-f.t;c.globalAlpha=Math.min(1,e*4,(2.2-e)*2);c.textAlign='center';c.font='900 16px sans-serif';c.lineWidth=4;c.strokeStyle='#1a0604';c.strokeText(f.txt,W/2,62);c.fillStyle='#ffd166';c.fillText(f.txt,W/2,62);c.globalAlpha=1;c.textAlign='left'}
  c.restore()}
 /* ---------- 조작 단추 ---------- */
 if(typeof doDash==='function'){const f=doDash;doDash=function(){if(mode==='sv184'){dash();return}return f.apply(this,arguments)}}
 if(typeof doAttack==='function'){const f=doAttack;doAttack=function(){if(mode==='sv184'){if(S&&S.choose)pick(0);return}return f.apply(this,arguments)}}
 if(typeof tryParry==='function'){const f=tryParry;tryParry=function(){if(mode==='sv184')return;return f.apply(this,arguments)}}
 if(typeof tryUlt==='function'){const f=tryUlt;tryUlt=function(){if(mode==='sv184'){ult();return}return f.apply(this,arguments)}}
 /* ---------- 화면: 이 모드일 때는 이 파일이 그린다 ---------- */
 {const f=frame;frame=function(){if(typeof mode==='undefined'||mode!=='sv184'||!S)return f.apply(this,arguments);const now=performance.now(),dt=Math.min(.05,(now-(last||now))/1000);last=now;
   try{sched(now)}catch(e){}try{if(!paused&&!S.choose&&!S.over)tick(dt);draw(now)}catch(e){console.error('sv184',e)}
   try{const u=$('btnU');if(u){u.style.display='';if(typeof ultBtnPaint==='function')ultBtnPaint(S.gauge/100,S.gauge>=100)}}catch(e){}
   requestAnimationFrame(frame)}}
 {const f=toLobby;toLobby=function(){if(mode==='sv184'){closeChoose();S=null;btnVis(false);try{const u=$('btnU');if(u)u.style.display='none'}catch(e){}}return f.apply(this,arguments)}}
 /* ---------- 들어가는 곳: 소개 창 ---------- */
 function open(){try{$('sv184q')?.remove()}catch(e){}const s=sv(),ov=document.createElement('div');ov.id='sv184q';
  ov.innerHTML='<div class="bx"><h3>♾ 무한 서바이벌</h3><p class="d">공격은 <b>자동</b>! 나는 움직이며 피하기만 해요. 몬스터를 쓰러뜨리면 나오는 보석을 모아 레벨이 오르면 <b>기술 카드 3장 중 하나</b>를 골라 점점 강해져요. 시간이 갈수록 몬스터가 더 많이, 더 세게 몰려와요.</p>'+
   '<div class="k"><div><b>이동</b> 방향키 / WASD / 조이스틱</div><div><b>K / 대시</b> 빠르게 피하기(잠깐 무적)</div><div><b>C / 궁극기</b> 게이지 100%면 화면 전체 폭발 · 보석 끌어오기</div><div><b>1 · 2 · 3</b> 레벨 업 카드 고르기(눌러도 돼요)</div></div>'+
   '<div class="k"><div>🗡 검기 · 🌀 회전 칼날 · ⚡ 번개 · 🔥 불꽃 오라 · ❄ 얼음 폭발 · 🔮 유도 구슬 + 💪👟❤⏱🧲✚ 강화 — 각 5레벨</div><div>장착한 캐릭터 체력 · 무기 공격력이 그대로 들어가요.</div></div>'+
   '<div class="me">최고 기록 <b>'+clk(s.best||0)+'</b> 버팀 · 보상: 1분에 🪙150 + 처치 1명 🪙1 (하루 🪙'+num(DAY_CAP)+'까지)</div>'+
   '<div class="r"><button class="no">닫기</button><button class="go">♾ 시작</button></div></div>';
  document.body.appendChild(ov);ov.querySelector('.no').onclick=()=>ov.remove();ov.querySelector('.go').onclick=()=>{ov.remove();try{gmSfx&&gmSfx('ok')}catch(e){}start()};ov.addEventListener('click',e=>{if(e.target===ov)ov.remove()})}
 const css=document.createElement('style');css.textContent=`#sv184q{position:fixed;inset:0;z-index:9700;display:flex;align-items:center;justify-content:center;background:#000a}
 #sv184q .bx{width:min(420px,92vw);max-height:92vh;overflow-y:auto;padding:16px;border-radius:16px;background:radial-gradient(120% 80% at 50% 0%,#14402a,#08160e 70%);border:2px solid #5aff9a88;color:#e8f4ec;box-shadow:0 0 34px #2aff7a44;font:13px/1.5 sans-serif}
 #sv184q h3{margin:0 0 4px;color:#8affc8;font-size:20px}#sv184q .d{font-size:12px;color:#c8dcd0;margin:0 0 8px}#sv184q .d b{color:#ffd166}
 #sv184q .k{background:#00000044;border-radius:10px;padding:6px 10px;font-size:12px;margin-bottom:8px}#sv184q .k b{color:#8affc8}#sv184q .me{margin:6px 2px 10px;font-size:12px}#sv184q .me b{color:#ffd166}
 #sv184q .r{display:flex;gap:8px}#sv184q button{flex:1;font:inherit;font-weight:900;padding:11px;border-radius:11px;border:0;cursor:pointer}#sv184q .no{background:#2a3a32;color:#d8e8e0}#sv184q .go{background:linear-gradient(180deg,#4aff9a,#1a9a5a);color:#04150c;box-shadow:0 0 14px #2aff7a88}
 #sv184lv{position:fixed;inset:0;z-index:9650;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:#0008;font:13px/1.4 sans-serif;padding:10px}
 #sv184lv .h{color:#ffd166;font-weight:900;font-size:18px;text-shadow:0 2px 0 #000}#sv184lv .h small{font-size:11px;color:#ddd}
 #sv184lv .cs{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}#sv184lv button{width:min(200px,28vw);min-width:130px;padding:12px 10px;border-radius:14px;border:2px solid #5ab8ff;background:linear-gradient(180deg,#14304a,#0a1624);color:#fff;cursor:pointer;display:flex;flex-direction:column;gap:4px;align-items:center;text-align:center;font:inherit}
 #sv184lv button:hover{border-color:#ffd166;transform:translateY(-2px)}#sv184lv b{font-size:26px}#sv184lv em{font-style:normal;font-weight:900;color:#bfe6ff}#sv184lv em i{font-style:normal;color:#ffd166;font-size:11px;margin-left:4px}#sv184lv span{font-size:11px;color:#c8d8e8}`;document.head.appendChild(css);
 window.SV184={open,start,pick,get S(){return S}};
}catch(e){console.error('SV184',e)}})();
