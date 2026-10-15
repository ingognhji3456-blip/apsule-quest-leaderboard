/* ================= v184 · v185 무한 서바이벌 (SV184) =================
   v185: 탑 오르기 엔진(TW71) 위에서 돌아간다 — 월드 보스 · 잊힌 주조소처럼 탑 경기장을 빌림(T.ext).
   그래서 탑에 있는 전투 기능이 전부 그대로 들어온다: 옆모습 캐릭터 · 검 휘두르기(박자 PERFECT · 치명 · 콤보 · 히트스톱) ·
   무기 궁극기(C, ULT139) · 대시 칸 · 패링(탄 되받아치기) · 펫 · 스킨 · 세트(CB81) · 신화 스킬(MYTH100) · 처치 경험치 · 배경음악 · 터치 단추.
   그 위에 서바이벌 규칙을 얹는다:
   - 시간이 갈수록 더 많고(동시 최대 28마리) 센 탑 몬스터가 끝없이 나옴. 1분마다 정예, 1분 30초마다 박쥐 떼, 5분마다 대장 정예.
   - 쓰러뜨린 몬스터가 경험치 보석을 떨어뜨림 → 모으면 레벨 업 → 기술 카드 3장 중 하나(고르는 동안 게임이 멈춤, 1·2·3 키 · 누르기).
   - 자동 기술 6종(검기 · 회전 칼날 · 번개 · 불꽃 오라 · 얼음 폭발 · 유도 구슬) + 강화 7종(공격 · 치명 · 속도 · 체력 · 쿨타임 · 자석 · 회복), 각 5레벨.
     자동 기술 피해는 TW71.hitMob으로 들어가서 방패 · 처치 처리 · 경험치가 탑과 같음.
   - 탑 진행(최고 층)은 건드리지 않음(R.saved로 되돌림, __nosr). 보상은 버틴 시간 골드(하루 DAY_CAP) + 처치 골드(탑과 같음). */
(function(){try{
 if(!window.TW71||!TW71.T||!TW71.start)return;
 const TAU=Math.PI*2,rnd=(a,b)=>a+Math.random()*(b-a),$=id=>document.getElementById(id),num=n=>Math.round(+n||0).toLocaleString();
 const DAY_CAP=8000,FL=2/* 1층은 안내 글자가 떠서 2층 틀을 빌림 */,TSP=TW71.SP;
 const DM=()=>({easy:.75,normal:1,hard:1.35,extreme:1.8})[typeof diff!=='undefined'?diff:'normal']||1;
 const sv=()=>saveData.sv184||(saveData.sv184={best:0,bestK:0,day:'',got:0});
 const clk=t=>Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0');
 const R={on:false,end:false,saved:null,t:0,last:0,lv:1,xp:0,need:4,kills:0,sk:{},cd:{},gems:[],pr:[],fx:[],choose:null,nextElite:60,nextSwarm:90,nextBoss:300,stopAt:0,baseHp:100};
 /* ---------- 몬스터 종류: [종류, 나오기 시작하는 분, 무게] ---------- */
 const EN=[['slime',0,3],['bat',0,2],['boar',1,2],['archer',2,1.5],['spider',2.5,2],['wisp',3,1.5],['mage',4,1.2],['bomb',4.5,1.2],['knight',5.5,1],['toad',6,1.3],['gear',7,1.5],['golem',8,1],['drone',9,1.3],['wraith',10,1.2]].filter(e=>TSP[e[0]]);
 const MIN=()=>R.t/60;
 const HPM=()=>{const m=MIN();return (.55+m*.35+Math.pow(m/5,2))*DM()};
 const DMGM=()=>{const m=MIN();return 1+m*.12+Math.pow(m/8,2)};
 /* ---------- 기술 · 강화 ---------- */
 const SK={
  slash:{n:'검기',ic:'🗡',d:l=>'가장 가까운 적에게 초승달 검기 '+(1+Math.floor(l/2))+'개 · 관통 '+(2+l)},
  orbit:{n:'회전 칼날',ic:'🌀',d:l=>'내 둘레를 도는 칼날 '+(l+1)+'개'},
  bolt:{n:'번개',ic:'⚡',d:l=>'경기장의 적 '+(l+1)+'명에게 번개'},
  aura:{n:'불꽃 오라',ic:'🔥',d:l=>'둘레 '+(30+6*l)+'칸 안의 적을 계속 태움'},
  nova:{n:'얼음 폭발',ic:'❄',d:l=>'주변을 얼려 멈추게 하는 폭발(반경 '+(60+10*l)+')'},
  orb:{n:'유도 구슬',ic:'🔮',d:l=>'적을 쫓아가는 구슬 '+l+'개'},
  atk:{n:'공격력',ic:'💪',d:l=>'검 · 기술 피해 +'+12*l+'%',p:1},
  crit:{n:'치명',ic:'🎯',d:l=>'치명타 확률 +'+5*l+'%',p:1},
  spd:{n:'이동 속도',ic:'👟',d:l=>'이동 속도 +'+8*l+'%',p:1},
  hp:{n:'최대 체력',ic:'❤',d:l=>'최대 체력 +'+15*l+'% · 바로 회복',p:1},
  cdr:{n:'쿨타임',ic:'⏱',d:l=>'자동 기술 쿨타임 -'+8*l+'%',p:1},
  mag:{n:'자석',ic:'🧲',d:l=>'보석 줍는 범위 +'+35*l+'%',p:1},
  reg:{n:'회복',ic:'✚',d:l=>'초당 최대 체력의 '+(.4*l).toFixed(1)+'% 회복',p:1}};
 /* ---------- v185 도트 아이콘(이모지 대신, 카드 · HUD 같이 씀) ---------- */
 const IG={
  slash:['..........bb','.........bab','........bab.','.......bab..','..c...bab...','..cc.bab....','...ccab.....','....cc......','...cdcc.....','..dd..cc....','.dd.........','dd..........'],
  orbit:['....aab.....','...a........','..a.....b...','.a.......a..','.b...dd...a.','....dddd..a.','.a..dddd....','.a...dd...b.','..a.......a.','...b.....a..','........a...','.....baa....'],
  bolt:['......aab...','.....aab....','....aab.....','...aab......','..aabbbbb...','..aaaaaab...','.....aab....','....aab.....','...aab......','..aab.......','..ab........','..b.........'],
  aura:['.....a......','.....aa.....','....aaa..a..','...aaba..aa.','..aabba.aaa.','..abbbaaaba.','.aabbbbabba.','.abbccbbbba.','.abcccccbba.','.abccddccba.','..abcddcba..','...aaaaaa...'],
  nova:['.....aa.....','...a.aa.a...','....aaaa....','.a...aa...a.','..a..bb..a..','aaaabbbbaaaa','aaaabbbbaaaa','..a..bb..a..','.a...aa...a.','....aaaa....','...a.aa.a...','.....aa.....'],
  orb:['....aaaa....','..aabbbbaa..','.abbddbbbba.','.abddbbbbba.','abbdbbbbbbca','abbbbbbbbbca','abbbbbbbbcca','abbbbbbbccca','.abbbbbccca.','.acbbccccca.','..aaccccaa..','....aaaa....'],
  atk:['.....ab.....','.....ab.....','.....ab.....','.....ab.....','.....ab.....','.....ab.....','.....ab.....','...dddddd...','.....cc.....','.....cc.....','....dddd....','............'],
  crit:['....aaaa....','..aa....aa..','.a..bbbb..a.','.a.b....b.a.','a.b..dd..b.a','a.b.dddd.b.a','a.b.dddd.b.a','a.b..dd..b.a','.a.b....b.a.','.a..bbbb..a.','..aa....aa..','....aaaa....'],
  spd:['............','....aaa.....','....aba.....','....aba..d..','....aba.dd..','....abbadd..','...aabbbb...','..aabbbbba..','.aabbbbbbba.','.acccccccca.','.aaaaaaaaaa.','............'],
  hp:['............','..aaa..aaa..','.abbaaaabba.','.abaaaaaaaa.','.aaaaaaaaaa.','.aaaaaaaaca.','..aaaaaaca..','...aaaaca...','....aaaa....','.....aa.....','............','............'],
  cdr:['..dddddddd..','...a....a...','...abbbba...','....abba....','.....ba.....','.....ab.....','....a..a....','...a.bb.a...','...abbbba...','..dddddddd..','............','............'],
  mag:['..bbb..bbb..','..bbb..bbb..','..aaa..aaa..','..aaa..aaa..','..aaa..aaa..','..aaa..aaa..','..aaaaaaaa..','..caaaaaac..','...cccccc...','............','.d..d..d..d.','............'],
  reg:['............','....aaaa....','....abba....','....abba....','.aaaabbaaaa.','.abbbbbbbba.','.abbbbbbbba.','.aaaabbaaaa.','....abba....','....abba....','....aaaa....','............']};
 IG._gold=IG.orb;
 const IP={slash:['#7ad8ff','#e8f8ff','#8a6a4a','#ffd166'],orbit:['#7ad8ff','#e8f8ff','#3a6a8a','#ffffff'],bolt:['#ffd84a','#fffbd0','#a07a10','#fff'],aura:['#ff5a2a','#ffa040','#ffe080','#fffbd0'],
  nova:['#8ae8ff','#ffffff','#3a8aaa','#fff'],orb:['#8a4aff','#d8b0ff','#4a1a9a','#ffffff'],atk:['#e8f0ff','#9aa8c0','#7a4a2a','#ffd166'],crit:['#ff5a5a','#ffb0a0','#7a1a1a','#ffffff'],
  spd:['#4ac8ff','#bfeaff','#1a5a8a','#ffffff'],hp:['#ff3a5a','#ffb0c0','#a01030','#fff'],cdr:['#d8b070','#8ae8ff','#5a3a10','#ffd166'],mag:['#ff4a4a','#e8e8f0','#8a1010','#8ae8ff'],
  reg:['#3ae87a','#c8ffd8','#0a6a2a','#fff'],_gold:['#ffc83a','#fff0a0','#a06a10','#ffffff']};
 const ICN={};function icon(k){if(ICN[k])return ICN[k];const g=IG[k]||IG.orb,pl=IP[k]||IP.orb,cv=document.createElement('canvas');cv.width=cv.height=14;const o=cv.getContext('2d'),on=(x,y)=>y>=0&&y<12&&x>=0&&x<12&&g[y][x]!=='.';
  for(let y=-1;y<13;y++)for(let x=-1;x<13;x++){if(on(x,y)){o.fillStyle=pl['abcd'.indexOf(g[y][x])]||pl[0];o.fillRect(x+1,y+1,1,1)}else if(on(x-1,y)||on(x+1,y)||on(x,y-1)||on(x,y+1)){o.fillStyle='#06080e';o.fillRect(x+1,y+1,1,1)}}
  return ICN[k]=cv}
 const iconURL=k=>{try{return icon(k).toDataURL()}catch(e){return ''}};
 const lvOf=k=>R.sk[k]||0;
 const ON=()=>R.on&&!R.end&&typeof mode!=='undefined'&&mode==='tower'&&TW71.T.ext===EXT;
 const wpMul=()=>{try{const w=WEAPONS[shopInv().eq.wp||0]||{};return Math.max(1,Math.min(4,w.dmg||1))}catch(e){return 1}};
 const PW=()=>{let c=1;try{c=window.CB81?CB81.dmgMul(0):1}catch(e){}return wpMul()*c};
 const CDR=()=>1-.08*lvOf('cdr');
 const live=()=>TW71.T.mobs.filter(m=>m.hp>0&&!(m.born>0));
 /* 자동 기술 피해: 탑과 같은 길(방패 · 처치 · 경험치). 궁극기 게이지는 검으로 때릴 때보다 조금만 참 */
 function dmgTo(m,d,col){const T=TW71.T,u=T.ult;try{TW71.hitMob(m,d,col)}catch(e){}if(T.ult>u)T.ult=u+(T.ult-u)*.3}
 /* ---------- 감싸기: 강화 효과(서바이벌 중에만) ---------- */
 try{const f=CB81.dmgMul;CB81.dmgMul=function(){const r=f.apply(this,arguments);return ON()?r*(1+.12*lvOf('atk')):r}}catch(e){}
 try{const f=CB81.critAdd;CB81.critAdd=function(){const r=f.apply(this,arguments);return ON()?r+.05*lvOf('crit'):r}}catch(e){}
 try{const f=CB81.onHurt;CB81.onHurt=function(d){const r=f.apply(this,arguments);return ON()&&r>0?r*DMGM():r}}catch(e){}
 {const f=moveInput;moveInput=function(){const r=f.apply(this,arguments);if(ON()&&lvOf('spd')){const k=1+.08*lvOf('spd');return [r[0]*k,r[1]*k]}return r}}
 /* ---------- 경기장 그림: 밤의 원형 투기장 ---------- */
 const AC={};
 function arena(){const k=(typeof diff!=='undefined'?diff:'normal');if(AC[k])return AC[k];const cv=document.createElement('canvas');cv.width=W;cv.height=H;const o=cv.getContext('2d'),F=Math.round;
  const Rr=(x,y,w,h,c,a)=>{o.globalAlpha=a==null?1:a;o.fillStyle=c;o.fillRect(F(x),F(y),F(w),F(h));o.globalAlpha=1};
  const glow=(x,y,r,c,a)=>{const g=o.createRadialGradient(x,y,1,x,y,r);g.addColorStop(0,c);g.addColorStop(1,'rgba(0,0,0,0)');o.globalAlpha=a;o.fillStyle=g;o.fillRect(x-r,y-r,r*2,r*2);o.globalAlpha=1};
  const T5={easy:['#1c2a22','#22342a','#5aff9a'],normal:['#1a2230','#202a3a','#7ad8ff'],hard:['#2a1c22','#34222a','#ff8a6a'],extreme:['#1a1024','#22142e','#d87aff']}[k]||['#1a2230','#202a3a','#7ad8ff'];
  let sd=7;const rn=()=>((sd=(sd*9301+49297)%233280)/233280);
  /* 하늘 · 관중석 */const g=o.createLinearGradient(0,0,0,AY);g.addColorStop(0,'#05060c');g.addColorStop(1,'#141a2a');o.fillStyle=g;o.fillRect(0,0,W,AY);
  for(let i=0;i<40;i++)Rr(rn()*W,rn()*AY*.7,1,1,'#ffffff',.3+rn()*.5);
  for(let x=0;x<W;x+=12){const h=6+((x*7)%5);Rr(x,AY-h,11,h,'#0c1018');Rr(x+1,AY-h,9,1,'#2a3448')}
  for(let i=0;i<60;i++){const x=rn()*W,y=AY-4-rn()*8;Rr(x,y,2,2,['#3a2a2a','#2a3a3a','#3a3a2a'][i%3])}
  /* 바깥 벽 */Rr(0,AY,AX,AH,'#0a0d14');Rr(AX+AW,AY,W-AX-AW,AH,'#0a0d14');Rr(0,AY+AH,W,H-AY-AH,'#0a0d14');
  /* 바닥: 돌 원판 + 모래 */for(let y=AY;y<AY+AH;y+=12)for(let x=AX;x<AX+AW;x+=12){const h=(x*7+y*13)%11;Rr(x,y,12,12,h<4?T5[1]:T5[0]);if(h===3)Rr(x+3,y+4,2,1,'#ffffff',.06)}
  const cx=AX+AW/2,cy=AY+AH/2+6;o.save();o.translate(cx,cy);o.scale(1,.55);
  for(let r=200;r>40;r-=40){o.strokeStyle='#000';o.globalAlpha=.25;o.lineWidth=3;o.beginPath();o.arc(0,0,r,0,TAU);o.stroke();o.strokeStyle=T5[2];o.globalAlpha=.07;o.lineWidth=1;o.beginPath();o.arc(0,0,r-2,0,TAU);o.stroke()}
  o.globalAlpha=.12;o.strokeStyle=T5[2];o.lineWidth=1.2;for(let i=0;i<12;i++){const a=i/12*TAU;o.beginPath();o.moveTo(Math.cos(a)*44,Math.sin(a)*44);o.lineTo(Math.cos(a)*196,Math.sin(a)*196);o.stroke()}
  o.globalAlpha=.16;o.font='900 30px serif';o.textAlign='center';o.textBaseline='middle';o.fillStyle=T5[2];o.fillText('∞',0,2);o.restore();o.globalAlpha=1;
  /* 금 · 풀 · 뼈 */for(let i=0;i<26;i++){let x=AX+rn()*AW,y=AY+rn()*AH;for(let j=0;j<3;j++){const nx=x+(rn()-.5)*16,ny=y+(rn()-.5)*10;o.strokeStyle='#000';o.globalAlpha=.3;o.lineWidth=1;o.beginPath();o.moveTo(x,y);o.lineTo(nx,ny);o.stroke();x=nx;y=ny}}o.globalAlpha=1;
  for(let i=0;i<40;i++){const x=AX+4+rn()*(AW-8),y=AY+4+rn()*(AH-8);if(Math.hypot((x-cx)/1,(y-cy)/.55)<190&&rn()<.7)continue;Rr(x,y,1,3,'#3a6a3a');Rr(x+2,y+1,1,2,'#4a8a4a')}
  /* 기둥 · 횃불(네 귀퉁이 + 위아래) */for(const [x,y] of [[AX+14,AY+16],[AX+AW-22,AY+16],[AX+14,AY+AH-34],[AX+AW-22,AY+AH-34],[AX+AW*.3,AY+6],[AX+AW*.7-8,AY+6]]){Rr(x-1,y+22,10,4,'#000',.35);Rr(x,y,8,24,'#3a4256');Rr(x,y,2,24,'#5a6478');Rr(x+6,y,2,24,'#262c3a');Rr(x-2,y-3,12,4,'#4a5468');
   Rr(x+2,y-8,4,5,'#ffb040');Rr(x+3,y-10,2,3,'#fff0a0');glow(x+4,y-6,30,'rgba(255,170,60,.9)',.35)}
  /* 테두리 */Rr(AX,AY,AW,2,'#2a3448');Rr(AX,AY+AH-2,AW,2,'#05070a');Rr(AX,AY,2,AH,'#1a2232');Rr(AX+AW-2,AY,2,AH,'#1a2232');
  glow(cx,cy,180,'rgba(140,180,255,.25)',.4);return AC[k]=cv}
 /* ---------- 몬스터 만들기 ---------- */
 function pickSp(){const m=MIN(),pool=EN.filter(e=>e[1]<=m);const w=pool.map(e=>e[2]*(m>e[1]+3?1:.6));let r=Math.random()*w.reduce((a,b)=>a+b,0),i=0;for(;i<pool.length;i++){r-=w[i];if(r<=0)break}return pool[Math.min(i,pool.length-1)][0]}
 const qItem=(sp,elite,mul)=>({sp,elite:!!elite,hp:Math.max(1,Math.round(TSP[sp].hp*HPM()*(elite?4:1)*(mul||1)))});
 function newMob(sp,x,y,hp,extra){const T=TW71.T;const m=Object.assign({sp,elite:false,x,y,vx:0,vy:0,hp,max:hp,s:1,born:.5,bornMax:.5,st:'idle',st0:0,cd:rnd(.8,1.6),face:1,hitT:-9,stunT:-9,ang:Math.random()*6.28,seed:Math.random()*99,id:(T.mid=(T.mid||0)+1)},extra||{});T.mobs.push(m);return m}
 function banner(txt,col){R.fx.push({k:'banner',t:R.t,txt,col:col||'#ffd166'})}
 function refill(){const T=TW71.T,m=MIN();T.cap=Math.min(28,6+Math.floor(m*2.6));while(T.queue.length<4)T.queue.push(qItem(pickSp(),false));
  if(R.t>=R.nextElite){R.nextElite+=60;const pool=EN.filter(e=>e[1]<=m+1);T.queue.unshift(qItem(pool[Math.floor(Math.random()*pool.length)][0],true));banner('⚠ 정예 몬스터 등장!')}
  if(R.t>=R.nextBoss){R.nextBoss+=300;const sp=m>=8?'golem':'knight';T.queue.unshift(Object.assign(qItem(sp,true,3),{boss:1}));banner('☠ 대장 몬스터가 나타났다!','#ff8a6a');try{sfx(70,.9,'sawtooth',.07,35)}catch(e){}}
  if(R.t>=R.nextSwarm){R.nextSwarm+=90;const n=12+Math.min(12,Math.floor(m));for(let i=0;i<n;i++){const a=i/n*TAU,x=Math.max(AX+12,Math.min(AX+AW-12,P.x+Math.cos(a)*110)),y=Math.max(AY+20,Math.min(AY+AH-6,P.y+Math.sin(a)*80));newMob('bat',x,y,Math.round(TSP.bat.hp*HPM()*.6))}banner('박쥐 떼가 둘러쌌다!','#d8b0ff')}}
 /* ---------- 시작 · 끝 ---------- */
 function start(){const s=saveData.tw71||(saveData.tw71={});if(!R.saved)R.saved={floor:s.floor,best:s.best};closeChoose();
  Object.assign(R,{on:true,end:false,t:0,last:performance.now(),lv:1,xp:0,need:4,kills:0,sk:{},cd:{},gems:[],pr:[],fx:[],choose:null,nextElite:60,nextSwarm:90,nextBoss:300,stopAt:0});
  window.__nosr=1;try{PLZ111.leave()}catch(e){}try{TW71.start(1)}catch(e){console.error(e)}
  const T=TW71.T;try{TW71.buildFloor(FL)}catch(e){}T.ext=EXT;T.queue=[];T.mobs=[];T.total=0;T.nextSpawn=.6;
  T.pal=Object.assign({},T.pal||{},{n:'무한 투기장',a:'#8affc8',c:'#7ad8ff'});T.trans={t:0,txt:'∞ 무한 서바이벌',sub:'버틸 수 있는 만큼 버티세요 · 보석을 모아 기술을 고르세요'};
  R.baseHp=P.maxhp;refill();
  /* 나올 수 있는 몬스터 그림을 미리 그려 둠(탑의 prewarm과 같은 방식, 프레임마다 조금씩) */try{const jobs=[];const NF={i:4,w:6,a:2,s:2};for(const e of EN)if(!TSP[e[0]].draw)for(const el of [false,true])for(const v of ['front','side','back'])for(const ps of ['i','w','a','s'])for(let f=0;f<NF[ps];f++)jobs.push([e[0],el,v,ps,f]);T.warm=(T.warm||[]).concat(jobs)}catch(e){}
  try{$('bvTitle').textContent='BEAT BLADE · 무한 서바이벌'}catch(e){}
  try{stopMusic();startMusic(makeSong(4),performance.now(),0)}catch(e){}try{sfx(220,.6,'sawtooth',.05,110)}catch(e){}}
 function restore(){const s=saveData.tw71||(saveData.tw71={});if(R.saved){s.floor=R.saved.floor;s.best=R.saved.best}R.saved=null;window.__nosr=0;try{saveNow()}catch(e){}}
 function settle(){const s=sv(),today=new Date().toISOString().slice(0,10);if(s.day!==today){s.day=today;s.got=0}
  const raw=Math.floor(R.t/60*150),g=Math.max(0,Math.min(raw,DAY_CAP-s.got));s.got+=g;try{if(g>0)addCoins(g)}catch(e){}
  const nb=R.t>(s.best||0);if(nb){s.best=R.t;s.bestK=R.kills}return {raw,g,nb,s}}
 function finish(){if(!R.on||R.end)return;R.end=true;closeChoose();const r=settle();restore();try{sfx(70,1,'sawtooth',.07,30)}catch(e){}
  setTimeout(()=>{try{stopMusic()}catch(e){}try{showOverlay('♾ 무한 서바이벌','쓰러졌어요',
   '<b style="color:#ffd166;font-size:1.25em">'+clk(R.t)+' 버팀 · 레벨 '+R.lv+' · 처치 '+num(R.kills)+'</b>'+(r.nb?'<br><b style="color:#8affc8">★ 새 최고 기록!</b>':'<br>최고 기록 '+clk(r.s.best||0))+
   '<br>버틴 시간 보상 🪙 '+num(r.g)+(r.g<r.raw?' <small>(하루 🪙'+num(DAY_CAP)+'까지)</small>':'')+' <small>· 처치 골드 · 경험치는 싸우는 동안 바로 들어왔어요</small>'+
   '<br><small>고른 기술: '+(Object.keys(R.sk).map(k=>SK[k].ic+SK[k].n+' '+R.sk[k]).join(' · ')||'없음')+'</small>',
   [['로비로',()=>{try{toLobby()}catch(e){}},true],['↺ 다시',()=>{$('overlay').hidden=true;start()},false]])}catch(e){console.error(e)}},900)}
 if(typeof toLobby==='function'){const f=toLobby;toLobby=function(){if(R.on&&!R.end){R.end=true;closeChoose();try{settle()}catch(e){}restore()}R.on=false;closeChoose();return f.apply(this,arguments)}}
 /* ---------- 레벨 업 고르기 ---------- */
 function offer(){const all=Object.keys(SK).filter(k=>lvOf(k)<5),have=Object.keys(R.sk).filter(k=>!SK[k].p).length;
  let pool=all.filter(k=>SK[k].p||lvOf(k)>0||have<4);if(!have)pool=pool.filter(k=>!SK[k].p);/* 첫 카드는 자동 기술만 */const out=[];
  while(out.length<3&&pool.length){const w=pool.map(k=>lvOf(k)>0?2:1),sum=w.reduce((a,b)=>a+b,0);let r=Math.random()*sum,i=0;for(;i<pool.length;i++){r-=w[i];if(r<=0)break}i=Math.min(i,pool.length-1);out.push(pool[i]);pool.splice(i,1)}
  if(!out.length)out.push('_gold');return out}
 function levelUp(){R.lv++;R.xp-=R.need;R.need=Math.round(4+R.lv*4+Math.pow(R.lv,1.5));const L=offer();R.choose=L;try{sfx(660,.25,'triangle',.05,1320);sfx(990,.3,'triangle',.04,1980)}catch(e){}
  const pip=l=>'<i class="pp">'+[0,1,2,3,4].map(j=>'<s class="'+(j<l-1?'on':j===l-1?'nw':'')+'"></s>').join('')+'</i>';
  const card=(k,i)=>{if(k==='_gold')return '<button data-i="'+i+'" class="cd gd"><i class="tg">보너스</i><i class="ic"><img src="'+iconURL('_gold')+'"></i><em>골드 +100</em><span>체력도 가득 회복해요<br><small>모든 기술이 최고 레벨이에요</small></span><i class="ky">'+(i+1)+'</i></button>';
   const s=SK[k],l=lvOf(k),nw=!l;return '<button data-i="'+i+'" class="cd '+(s.p?'pa':'ac')+(nw?' nw':'')+'"><i class="tg">'+(s.p?'강화':'자동 기술')+'</i>'+(nw?'<i class="nb">NEW</i>':'')+
    '<i class="ic"><img src="'+iconURL(k)+'"></i><em>'+s.n+'</em><b class="lv">'+(nw?'새로 배우기':'Lv '+l+' <u>▶</u> '+(l+1))+'</b>'+pip(l+1)+'<span>'+s.d(l+1)+'</span><i class="ky">'+(i+1)+'</i></button>'};
  const have=Object.keys(R.sk).map(k=>'<i class="hv'+(SK[k].p?' p':'')+'"><img src="'+iconURL(k)+'"><small>'+R.sk[k]+'</small></i>').join('');
  const ov=document.createElement('div');ov.id='sv184lv';ov.innerHTML='<div class="rays"></div><div class="hd"><small>LEVEL UP</small><b>레벨 '+R.lv+'</b><span>기술을 하나 고르세요</span></div><div class="cs">'+L.map(card).join('')+'</div>'+
   (have?'<div class="hb"><small>지금 기술</small>'+have+'</div>':'')+'<div class="ft">1 · 2 · 3 키 또는 카드를 눌러 고르기 · 고르는 동안 게임이 멈춰요</div>';
  document.body.appendChild(ov);ov.querySelectorAll('button').forEach(b=>b.onclick=()=>{if(ov.dataset.go)return;ov.dataset.go=1;b.classList.add('pk');setTimeout(()=>pick(+b.dataset.i),160)})}
 function pick(i){if(!R.choose)return;const k=R.choose[i];if(k==null)return;if(k==='_gold'){try{addCoins(100)}catch(e){}P.hp=P.maxhp}else{R.sk[k]=lvOf(k)+1;if(k==='hp'){const mx=Math.round(R.baseHp*(1+.15*R.sk.hp));P.hp=Math.min(mx,P.hp+(mx-P.maxhp)+Math.round(mx*.25));P.maxhp=mx}}
  closeChoose();try{TW71.T.stop=0}catch(e){}try{sfx(880,.12,'square',.03,1320)}catch(e){}if(R.xp>=R.need)levelUp()}
 function closeChoose(){R.choose=null;try{$('sv184lv')?.remove()}catch(e){}}
 addEventListener('keydown',e=>{if(!ON()||!R.choose)return;const n={Digit1:0,Digit2:1,Digit3:2,Numpad1:0,Numpad2:1,Numpad3:2}[e.code];e.preventDefault();e.stopImmediatePropagation();if(n!=null&&!e.repeat){const ov=$('sv184lv'),b=ov&&ov.querySelectorAll('button')[n];if(ov&&b&&!ov.dataset.go){ov.dataset.go=1;b.classList.add('pk');setTimeout(()=>pick(n),160)}else if(!ov)pick(n)}},true);
 /* 카드 고르는 동안은 조작을 막음 */
 for(const nm of ['doAttack','doDash','tryParry','tryUlt']){try{const f=window[nm];if(typeof f!=='function')continue;const g=function(){if(ON()&&R.choose)return;return f.apply(this,arguments)};
  if(nm==='doAttack')doAttack=g;else if(nm==='doDash')doDash=g;else if(nm==='tryParry')tryParry=g;else tryUlt=g}catch(e){}}
 /* ---------- 자동 기술 ---------- */
 function nearest(x,y,maxD){let b=null,bd=maxD||1e9;for(const m of TW71.T.mobs){if(m.hp<=0||m.born>0)continue;const d=Math.hypot(m.x-x,m.y-y);if(d<bd){bd=d;b=m}}return b}
 const mr=m=>(TSP[m.sp].r||7)*(m.s||1);
 function skills(dt){const t=R.t,pw=PW(),cr=CDR(),T=TW71.T;const ready=(k,cd)=>{if((R.cd[k]||0)>t)return false;R.cd[k]=t+cd*cr;return true};
  /* 검기 */{const l=lvOf('slash');if(l&&ready('slash',Math.max(.45,1.05-.1*l))){const tg=nearest(P.x,P.y,260);let a=tg?Math.atan2(tg.y-8-(P.y-10),tg.x-P.x):Math.atan2(P.face.y||0,P.face.x||1);const n=1+Math.floor(l/2);
   for(let i=0;i<n;i++){const aa=a+(i-(n-1)/2)*.28;R.pr.push({k:'slash',x:P.x,y:P.y-10,vx:Math.cos(aa)*250,vy:Math.sin(aa)*250,t,life:.8,dmg:(16+7*l)*pw,pierce:2+l,hit:{}})}try{sfx(520,.05,'triangle',.02,260)}catch(e){}}}
  /* 회전 칼날 */{const l=lvOf('orbit');if(l){const n=l+1,Rd=30+l*3;for(let i=0;i<n;i++){const a=t*3.2+i/n*TAU,bx=P.x+Math.cos(a)*Rd,by=P.y-8+Math.sin(a)*Rd*.75;for(const m of T.mobs){if(m.hp<=0||m.born>0)continue;m._sc=m._sc||{};if(Math.hypot(m.x-bx,m.y-6-by)<mr(m)+7&&(m._sc.o||0)<t){m._sc.o=t+.35;dmgTo(m,(9+4*l)*pw,'#bfe6ff')}}}}}
  /* 번개 */{const l=lvOf('bolt');if(l&&ready('bolt',Math.max(.8,1.7-.15*l))){const L=live().sort(()=>Math.random()-.5).slice(0,l+1);
   for(const e of L){R.fx.push({k:'bolt',x:e.x,y:e.y,t});for(const o of live())if(Math.hypot(o.x-e.x,o.y-e.y)<18)dmgTo(o,(24+9*l)*pw,'#fff8a0')}if(L.length)try{sfx(900,.08,'square',.025,200)}catch(e){}}}
  /* 불꽃 오라 */{const l=lvOf('aura');if(l&&ready('aura',.5)){const Rd=30+6*l;for(const m of live())if(Math.hypot(m.x-P.x,(m.y-P.y)*1.3)<Rd+mr(m))dmgTo(m,(6+3*l)*pw,'#ffb060')}}
  /* 얼음 폭발 */{const l=lvOf('nova');if(l&&ready('nova',Math.max(1.8,4-.4*l))){const Rd=60+10*l;R.fx.push({k:'ring',x:P.x,y:P.y,t,r:Rd,c:'#9ae8ff'});for(const m of live())if(Math.hypot(m.x-P.x,(m.y-P.y)*1.3)<Rd){dmgTo(m,(16+7*l)*pw,'#bff4ff');m.stunT=Math.max(m.stunT||0,T.clk+.6+.1*l);m._ice=T.clk+.6+.1*l}try{sfx(1200,.2,'sine',.03,400)}catch(e){}}}
  /* 유도 구슬 */{const l=lvOf('orb');if(l&&ready('orb',1.4)){for(let i=0;i<l;i++){const a=rnd(0,TAU);R.pr.push({k:'orb',x:P.x,y:P.y-10,vx:Math.cos(a)*90,vy:Math.sin(a)*90,t,life:3,dmg:(17+6*l)*pw,pierce:1,hit:{}})}}}
  /* 회복 */if(lvOf('reg')&&P.hp>0)P.hp=Math.min(P.maxhp,P.hp+P.maxhp*.004*lvOf('reg')*dt)}
 function tick(dt){const T=TW71.T;R.t+=dt;refill();skills(dt);
  for(const p of R.pr){if(p.k==='orb'){const tg=nearest(p.x,p.y,220);if(tg){const ax=tg.x-p.x,ay=tg.y-8-p.y,l=Math.hypot(ax,ay)||1;p.vx+=(ax/l*260-p.vx)*Math.min(1,dt*3);p.vy+=(ay/l*260-p.vy)*Math.min(1,dt*3)}}
   p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.x<AX-10||p.x>AX+AW+10||p.y<AY-10||p.y>AY+AH+10)p.dead=1;
   for(const m of T.mobs){if(m.hp<=0||m.born>0||p.hit[m.id])continue;if(Math.hypot(m.x-p.x,m.y-8-p.y)<mr(m)+(p.k==='slash'?9:5)){p.hit[m.id]=1;dmgTo(m,p.dmg,p.k==='orb'?'#d8b0ff':'#e8f4ff');if(--p.pierce<=0){p.dead=1;break}}}}
  R.pr=R.pr.filter(p=>!p.dead&&R.t-p.t<p.life);
  /* 보석 */const MR=34*(1+.35*lvOf('mag'));for(const g of R.gems){const dx=P.x-g.x,dy=P.y-6-g.y,d=Math.hypot(dx,dy)||1;if(g.pull||d<MR){g.pull=1;const s=Math.max(160,300-d);g.x+=dx/d*s*dt;g.y+=dy/d*s*dt}if(d<9){g.got=1;R.xp+=g.v;try{sfx(1300+Math.random()*200,.03,'sine',.015,1800)}catch(e){}}}
  R.gems=R.gems.filter(g=>!g.got);if(R.gems.length>300)R.gems.splice(0,R.gems.length-300);
  R.fx=R.fx.filter(f=>R.t-f.t<(f.k==='banner'?2.4:.6));
  if(R.xp>=R.need&&!R.choose)levelUp()}
 /* 쓰러진 몬스터 → 보석 */
 function scanDead(){for(const m of TW71.T.mobs){if(m.hp>0||m._sv)continue;m._sv=1;R.kills++;const v=m.boss?60:m.elite?20:(R.t>240&&Math.random()<.2?3:1);R.gems.push({x:m.x,y:m.y,v,b:R.t});
  if(m.elite)for(let i=0;i<4;i++)R.gems.push({x:m.x+rnd(-14,14),y:m.y+rnd(-8,8),v:3,b:R.t})}}
 /* ---------- 그리기 ---------- */
 function under(){const c=ctx,t=R.t;
  /* 불꽃 오라 */{const l=lvOf('aura');if(l){const Rd=30+6*l;c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(P.x,P.y,0,P.x,P.y,Rd);g.addColorStop(0,'rgba(255,120,40,0)');g.addColorStop(.7,'rgba(255,120,40,.12)');g.addColorStop(1,'rgba(255,160,60,.38)');c.fillStyle=g;c.beginPath();c.ellipse(P.x,P.y,Rd,Rd/1.3,0,0,TAU);c.fill();
   for(let i=0;i<8;i++){const a=t*1.5+i/8*TAU,q=(t*2+i*.37)%1;c.globalAlpha=1-q;c.fillStyle='#ffb040';c.fillRect(P.x+Math.cos(a)*Rd*.9-1,P.y+Math.sin(a)*Rd*.7-q*10-1,2,2)}c.restore()}}
  /* 보석 */for(const g of R.gems){const col=g.v>=60?'#ff8aff':g.v>=20?'#ffd166':g.v>=3?'#8aff9a':'#6ad0ff',bob=Math.sin(t*5+g.x)*1.2,y=g.y-2+bob,s=g.v>=20?1.6:1;
   c.fillStyle='#0007';c.fillRect(g.x-2*s,g.y+1,4*s,1);c.save();c.globalCompositeOperation='lighter';c.globalAlpha=.35;c.fillStyle=col;c.beginPath();c.arc(g.x,y,4*s,0,TAU);c.fill();c.restore();
   c.fillStyle=col;c.beginPath();c.moveTo(g.x,y-4*s);c.lineTo(g.x+3*s,y-1*s);c.lineTo(g.x,y+2*s);c.lineTo(g.x-3*s,y-1*s);c.closePath();c.fill();c.fillStyle='#fff';c.fillRect(g.x-1,y-3*s,1,1)}
  /* 얼어 있는 몬스터 */for(const m of TW71.T.mobs)if(m.hp>0&&m._ice>TW71.T.clk){c.save();c.globalAlpha=.55;c.fillStyle='#bff4ff';c.beginPath();c.ellipse(m.x,m.y,mr(m)*1.3,mr(m)*.5,0,0,TAU);c.fill();c.restore()}}
 function over(){const c=ctx,t=R.t;c.save();try{c.setTransform(SS,0,0,SS,0,0)}catch(e){}c.imageSmoothingEnabled=false;
  /* 회전 칼날 */{const l=lvOf('orbit');if(l){const n=l+1,Rd=30+l*3;for(let i=0;i<n;i++){const a=t*3.2+i/n*TAU,bx=P.x+Math.cos(a)*Rd,by=P.y-8+Math.sin(a)*Rd*.75;c.save();c.translate(bx,by);
   c.globalCompositeOperation='lighter';c.globalAlpha=.35;c.fillStyle='#7ad8ff';c.beginPath();c.arc(0,0,7,0,TAU);c.fill();c.globalCompositeOperation='source-over';c.globalAlpha=1;c.rotate(a+t*9);c.fillStyle='#e8f4ff';c.fillRect(-7,-1,14,2);c.fillStyle='#7ad8ff';c.fillRect(-1,-5,2,10);c.fillStyle='#fff';c.fillRect(-1,-1,2,2);c.restore()}}}
  /* 투사체 */for(const p of R.pr){c.save();c.globalCompositeOperation='lighter';if(p.k==='slash'){c.translate(p.x,p.y);c.rotate(Math.atan2(p.vy,p.vx));c.strokeStyle='#e8f4ff';c.lineWidth=3;c.beginPath();c.arc(-4,0,10,-1.1,1.1);c.stroke();c.strokeStyle='#7ad8ff';c.lineWidth=1.5;c.beginPath();c.arc(-7,0,9,-1,1);c.stroke();c.globalAlpha=.4;c.fillStyle='#7ad8ff';c.fillRect(-24,-1,16,2)}
   else{const g=c.createRadialGradient(p.x,p.y,0,p.x,p.y,8);g.addColorStop(0,'#fff');g.addColorStop(.4,'#c88aff');g.addColorStop(1,'rgba(160,80,255,0)');c.fillStyle=g;c.fillRect(p.x-8,p.y-8,16,16)}c.restore()}
  /* 효과 */for(const f of R.fx){const e=t-f.t;c.save();if(f.k==='ring'){const q=e/.5;c.globalAlpha=Math.max(0,1-q);c.strokeStyle=f.c;c.lineWidth=3;c.beginPath();c.ellipse(f.x,f.y,f.r*Math.min(1,q*1.5),f.r*Math.min(1,q*1.5)/1.3,0,0,TAU);c.stroke();c.globalAlpha=Math.max(0,.25-q*.25);c.fillStyle=f.c;c.fill()}
   else if(f.k==='bolt'){c.globalAlpha=Math.max(0,1-e/.3);c.strokeStyle='#fff8a0';c.lineWidth=2;c.beginPath();let x=f.x,y=f.y-140;c.moveTo(x,y);for(let i=0;i<6;i++){x=f.x+rnd(-8,8);y+=23;c.lineTo(x,y)}c.stroke();c.globalCompositeOperation='lighter';c.fillStyle='#fff8a0';c.beginPath();c.ellipse(f.x,f.y,12,5,0,0,TAU);c.fill()}c.restore()}
  c.restore()}
 function hud(now){const c=ctx,T=TW71.T;c.save();c.textBaseline='middle';
  /* 왼쪽 위 카드: 버틴 시간 · 레벨 · 경험치 · 처치 */c.fillStyle='#05070acc';c.fillRect(AX,4,196,26);c.fillStyle='#8affc8';c.fillRect(AX,4,3,26);
  c.font='900 13px sans-serif';c.fillStyle='#fff';c.fillText(clk(R.t),AX+8,15);c.font='800 8px sans-serif';c.fillStyle='#ffd166';c.fillText('Lv '+R.lv,AX+52,11);c.fillStyle='#ffd8b0';c.textAlign='right';c.fillText('처치 '+num(R.kills),AX+190,11);c.textAlign='left';
  const q=Math.min(1,R.xp/R.need);c.fillStyle='#0a1a2a';c.fillRect(AX+52,17,138,6);const g=c.createLinearGradient(AX+52,0,AX+190,0);g.addColorStop(0,'#3a8aff');g.addColorStop(1,'#8ae8ff');c.fillStyle=g;c.fillRect(AX+52,17,138*q,6);c.fillStyle='#ffffff55';c.fillRect(AX+52,17,138*q,1.5);
  c.font='700 6px sans-serif';c.fillStyle='#bfe6ff';c.fillText('경험치 '+Math.floor(R.xp)+'/'+R.need,AX+8,26);
  /* 다음 사건(카드 안 아래 줄) */const nx=Math.min(R.nextElite,R.nextSwarm,R.nextBoss),lab=nx===R.nextBoss?'대장':nx===R.nextSwarm?'박쥐 떼':'정예';c.textAlign='right';c.fillStyle=nx-R.t<10&&Math.floor(now/250)%2?'#ff8a6a':'#c8d4e0';c.fillText(lab+'까지 '+Math.max(0,Math.ceil(nx-R.t))+'초',AX+190,26);c.textAlign='left';
  /* 오른쪽 위: 고른 기술(많으면 두 줄) */{const ks=Object.keys(R.sk),per=Math.max(7,Math.ceil(ks.length/2)),sz=ks.length>per?14:20;ks.forEach((k,i)=>{const s=SK[k],row=Math.floor(i/per),col=i%per,n=Math.min(per,ks.length-row*per),x=AX+AW-(n-col)*(sz+2),y=4+row*(sz+2);
   c.fillStyle=s.p?'#1a1408dd':'#081a24dd';c.fillRect(x,y,sz,sz);c.strokeStyle=s.p?'#ffd16688':'#7ad8ff88';c.lineWidth=1;c.strokeRect(x+.5,y+.5,sz-1,sz-1);try{c.drawImage(icon(k),x+(sz>14?3:1),y+1,sz>14?14:12,sz>14?14:12)}catch(e){}
   c.font='900 '+(sz>14?6:5)+'px sans-serif';c.textAlign='right';c.lineWidth=2;c.strokeStyle='#000';c.strokeText(R.sk[k],x+sz-1,y+sz-3);c.fillStyle='#ffd166';c.fillText(R.sk[k],x+sz-1,y+sz-3);c.textAlign='left'})}
  /* 큰 알림 */for(const f of R.fx)if(f.k==='banner'){const e=R.t-f.t;c.globalAlpha=Math.max(0,Math.min(1,e*4,(2.4-e)*2));c.textAlign='center';c.font='900 16px sans-serif';c.lineWidth=4;c.strokeStyle='#1a0604';c.strokeText(f.txt,W/2,AY+62);c.fillStyle=f.col;c.fillText(f.txt,W/2,AY+62);c.globalAlpha=1;c.textAlign='left'}
  c.restore();return true}
 const EXT={arena,mark(){return '∞'},under,gap(){return Math.max(.06,.55-MIN()*.05)},ultSpawn:1,hud,die(){setTimeout(finish,700);return true}};
 /* ---------- 매 프레임 ---------- */
 {const f=frame;frame=function(){const now=performance.now();let on=false;
   try{on=ON();if(on){const T=TW71.T;T.clear=false;/* 탑의 「층 클리어」를 막음 */
     if(R.choose)T.stop=now+1e6;/* 카드 고르는 동안 멈춤 */
     else if(T.stop>now){/* 처치가 몰릴 때 히트스톱이 이어져 멈춘 듯 보이지 않게 */if(now-R.stopAt<260)T.stop=Math.min(T.stop,now+18);else{R.stopAt=now;T.stop=Math.min(T.stop,now+80)}}}}catch(e){}
   const r=f.apply(this,arguments);
   try{if(on&&ON()){const T=TW71.T,dt=Math.min(.05,(now-(R.last||now))/1000);R.last=now;scanDead();
     if(!paused&&!R.choose&&!T.dead&&!T.trans)tick(dt);over();try{if(document.documentElement.classList.contains('phP')&&window.PV76&&PV76.paint)PV76.paint()}catch(e){}}
    else if(R.on&&!R.end&&typeof mode!=='undefined'&&mode==='tower'&&TW71.T.ext!==EXT){R.on=false;closeChoose();restore()}}catch(e){console.error('sv184',e)}
   return r}}
 /* ---------- 들어가는 곳: 소개 창 ---------- */
 function open(){try{$('sv184q')?.remove()}catch(e){}const s=sv(),ov=document.createElement('div');ov.id='sv184q';
  ov.innerHTML='<div class="bx"><h3>♾ 무한 서바이벌</h3><p class="d">탑 오르기와 <b>똑같이 싸워요</b> — 검 휘두르기 · 박자 PERFECT · 대시 · 패링 · 궁극기 · 펫 · 스킨 · 세트 · 신화 스킬이 모두 그대로! 끝없이 몰려오는 몬스터를 버티며, 쓰러뜨린 몬스터의 <b>보석</b>을 모아 레벨이 오르면 <b>기술 카드 3장 중 하나</b>를 골라 점점 강해져요.</p>'+
   '<div class="k"><div><b>공격 · 대시 · 패링 · 궁극기</b> 탑과 같은 키 · 단추</div><div><b>1 · 2 · 3</b> 레벨 업 카드 고르기(눌러도 돼요, 고르는 동안 멈춤)</div><div>1분마다 정예 · 1분 30초마다 박쥐 떼 · 5분마다 대장 몬스터</div></div>'+
   '<div class="k"><div>자동 기술: 🗡 검기 · 🌀 회전 칼날 · ⚡ 번개 · 🔥 불꽃 오라 · ❄ 얼음 폭발 · 🔮 유도 구슬</div><div>강화: 💪 공격 · 🎯 치명 · 👟 속도 · ❤ 체력 · ⏱ 쿨타임 · 🧲 자석 · ✚ 회복 — 각 5레벨</div></div>'+
   '<div class="me">최고 기록 <b>'+clk(s.best||0)+'</b> 버팀 · 보상: 1분에 🪙150 (하루 🪙'+num(DAY_CAP)+'까지) + 처치 골드 · 경험치</div>'+
   '<div class="r"><button class="no">닫기</button><button class="go">♾ 시작</button></div></div>';
  document.body.appendChild(ov);ov.querySelector('.no').onclick=()=>ov.remove();ov.querySelector('.go').onclick=()=>{ov.remove();try{gmSfx&&gmSfx('ok')}catch(e){}start()};ov.addEventListener('click',e=>{if(e.target===ov)ov.remove()})}
 const css=document.createElement('style');css.textContent=`#sv184q{position:fixed;inset:0;z-index:9700;display:flex;align-items:center;justify-content:center;background:#000a}
 #sv184q .bx{width:min(440px,92vw);max-height:92vh;overflow-y:auto;padding:16px;border-radius:16px;background:radial-gradient(120% 80% at 50% 0%,#14402a,#08160e 70%);border:2px solid #5aff9a88;color:#e8f4ec;box-shadow:0 0 34px #2aff7a44;font:13px/1.5 sans-serif}
 #sv184q h3{margin:0 0 4px;color:#8affc8;font-size:20px}#sv184q .d{font-size:12px;color:#c8dcd0;margin:0 0 8px}#sv184q .d b{color:#ffd166}
 #sv184q .k{background:#00000044;border-radius:10px;padding:6px 10px;font-size:12px;margin-bottom:8px}#sv184q .k b{color:#8affc8}#sv184q .me{margin:6px 2px 10px;font-size:12px}#sv184q .me b{color:#ffd166}
 #sv184q .r{display:flex;gap:8px}#sv184q button{flex:1;font:inherit;font-weight:900;padding:11px;border-radius:11px;border:0;cursor:pointer}#sv184q .no{background:#2a3a32;color:#d8e8e0}#sv184q .go{background:linear-gradient(180deg,#4aff9a,#1a9a5a);color:#04150c;box-shadow:0 0 14px #2aff7a88}
 #sv184lv{position:fixed;inset:0;z-index:9650;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;background:radial-gradient(70% 60% at 50% 45%,#10284acc,#02040af0);font:13px/1.35 sans-serif;padding:10px;overflow:hidden;animation:sv184in .25s ease-out}
 #sv184lv .rays{position:absolute;left:50%;top:45%;width:160vmax;height:160vmax;margin:-80vmax 0 0 -80vmax;background:repeating-conic-gradient(from 0deg,#ffd16610 0 6deg,transparent 6deg 18deg);animation:sv184r 30s linear infinite;pointer-events:none;-webkit-mask:radial-gradient(circle,#000 0,transparent 55%);mask:radial-gradient(circle,#000 0,transparent 55%)}
 @keyframes sv184r{to{transform:rotate(360deg)}}@keyframes sv184in{from{opacity:0}to{opacity:1}}@keyframes sv184c{from{opacity:0;transform:translateY(26px) rotateX(40deg) scale(.9)}to{opacity:1;transform:none}}
 @keyframes sv184h{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}@keyframes sv184g{0%,100%{box-shadow:0 0 0 2px var(--c2) inset,0 0 18px var(--gl)}50%{box-shadow:0 0 0 2px var(--c2) inset,0 0 30px var(--gl)}}
 @keyframes sv184f{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
 #sv184lv .hd{position:relative;text-align:center;animation:sv184h .4s ease-out both}#sv184lv .hd small{display:block;font:900 11px/1 monospace;letter-spacing:6px;color:#8ae8ff;text-shadow:0 0 8px #3a8aff}
 #sv184lv .hd b{display:block;font-size:30px;font-weight:900;color:#ffd166;letter-spacing:1px;text-shadow:0 3px 0 #6a3a00,0 0 18px #ffb04099;-webkit-text-stroke:1px #3a2000}#sv184lv .hd span{font-size:12px;color:#d8e4f0}
 #sv184lv .cs{position:relative;display:flex;gap:12px;justify-content:center;perspective:600px}
 #sv184lv .cd{--c1:#16365a;--c2:#5ab8ff;--c3:#0a1626;--gl:#3a8aff55;--tx:#bfe6ff;position:relative;width:min(178px,29vw);min-height:220px;padding:22px 10px 30px;border-radius:12px;border:0;cursor:pointer;color:#fff;font:inherit;
  display:flex;flex-direction:column;gap:5px;align-items:center;text-align:center;background:linear-gradient(180deg,var(--c1),var(--c3) 75%);box-shadow:0 0 0 2px var(--c2) inset,0 0 18px var(--gl);animation:sv184c .35s ease-out both;transition:transform .15s,filter .15s;clip-path:polygon(10px 0,calc(100% - 10px) 0,100% 10px,100% calc(100% - 10px),calc(100% - 10px) 100%,10px 100%,0 calc(100% - 10px),0 10px)}
 #sv184lv .cd::before{content:'';position:absolute;inset:5px;border:1px solid #ffffff1c;border-radius:8px;pointer-events:none;clip-path:inherit}
 #sv184lv .cd::after{content:'';position:absolute;left:-60%;top:0;width:40%;height:100%;background:linear-gradient(100deg,transparent,#ffffff22,transparent);transform:skewX(-20deg);animation:sv184s 2.8s ease-in-out infinite;pointer-events:none}
 @keyframes sv184s{0%,60%{left:-60%}100%{left:130%}}
 #sv184lv .cd:nth-child(2){animation-delay:.07s}#sv184lv .cd:nth-child(3){animation-delay:.14s}
 #sv184lv .cd.pa{--c1:#4a3410;--c2:#ffc84a;--c3:#1a1206;--gl:#ffb04055;--tx:#ffe0a0}#sv184lv .cd.gd{--c1:#4a3a08;--c2:#ffe04a;--c3:#1a1404;--gl:#ffe04a66;--tx:#fff0a0}
 #sv184lv .cd.nw{animation:sv184c .35s ease-out both,sv184g 1.6s ease-in-out .4s infinite}
 #sv184lv .cd:hover,#sv184lv .cd:focus-visible{transform:translateY(-6px) scale(1.03);filter:brightness(1.18);outline:none}#sv184lv .cd.pk{transform:scale(1.1);filter:brightness(1.6);transition:.15s}
 #sv184lv .tg{position:absolute;top:0;left:50%;white-space:nowrap;transform:translateX(-50%);padding:3px 12px 4px;font:900 10px/1 sans-serif;font-style:normal;color:#04101c;background:var(--c2);border-radius:0 0 8px 8px;letter-spacing:1px}
 #sv184lv .nb{position:absolute;top:8px;right:8px;font:900 9px/1 sans-serif;font-style:normal;color:#fff;background:linear-gradient(180deg,#ff5a5a,#c81a3a);padding:3px 5px;border-radius:5px;box-shadow:0 0 8px #ff3a5a99;transform:rotate(8deg)}
 #sv184lv .ic{display:grid;place-items:center;width:64px;height:64px;margin-top:4px;border-radius:50%;background:radial-gradient(circle at 50% 40%,#ffffff22,#00000066 70%);box-shadow:0 0 0 2px var(--c2),0 0 0 4px #00000088,0 0 16px var(--gl);animation:sv184f 2s ease-in-out infinite}
 #sv184lv .ic img{width:44px;height:44px;image-rendering:pixelated;filter:drop-shadow(0 2px 0 #0008)}
 #sv184lv em{font-style:normal;font-weight:900;font-size:15px;color:var(--tx);text-shadow:0 2px 0 #000}#sv184lv .lv{font-size:11px;color:#ffd166;font-weight:800}#sv184lv .lv u{text-decoration:none;color:#fff8}
 #sv184lv .pp{display:flex;gap:3px;font-style:normal}#sv184lv .pp s{width:12px;height:5px;background:#00000088;box-shadow:0 0 0 1px #ffffff22 inset;transform:skewX(-20deg)}#sv184lv .pp s.on{background:var(--c2)}#sv184lv .pp s.nw{background:#fff;box-shadow:0 0 8px var(--c2)}
 #sv184lv .cd span{font-size:11px;color:#d0dcea;background:#00000040;border-radius:6px;padding:5px 6px;align-self:stretch;flex:1;display:flex;flex-direction:column;justify-content:center}#sv184lv .cd span small{color:#fff8}
 #sv184lv .ky{position:absolute;bottom:7px;left:50%;transform:translateX(-50%);font:900 11px/1 monospace;font-style:normal;color:#fff;width:20px;height:18px;display:grid;place-items:center;border-radius:4px;background:#00000088;box-shadow:0 2px 0 #000,0 0 0 1px #ffffff33 inset}
 #sv184lv .hb{position:relative;display:flex;align-items:center;gap:4px;padding:5px 10px;border-radius:10px;background:#00000066;box-shadow:0 0 0 1px #ffffff1a inset}#sv184lv .hb>small{font-size:10px;color:#9ab;margin-right:4px}
 #sv184lv .hv{position:relative;display:grid;place-items:center;width:26px;height:26px;border-radius:6px;background:#081a24;box-shadow:0 0 0 1px #7ad8ff66 inset}#sv184lv .hv.p{background:#1a1408;box-shadow:0 0 0 1px #ffd16666 inset}
 #sv184lv .hv img{width:18px;height:18px;image-rendering:pixelated}#sv184lv .hv small{position:absolute;right:-3px;bottom:-4px;font:900 8px/1 sans-serif;color:#ffd166;text-shadow:0 1px 0 #000,0 0 2px #000}
 #sv184lv .ft{position:relative;font-size:10px;color:#8a9aaa}
 html.ph #sv184lv{gap:6px}html.ph #sv184lv .hd b{font-size:20px}html.ph #sv184lv .cs{gap:6px}html.ph #sv184lv .cd{min-height:0;width:31vw;min-width:0;padding:18px 5px 26px;gap:3px}
 html.ph #sv184lv .tg{font-size:8px;padding:2px 7px 3px}html.ph #sv184lv .nb{top:16px;right:4px}html.ph #sv184lv .ic{width:44px;height:44px}html.ph #sv184lv .ic img{width:30px;height:30px}html.ph #sv184lv em{font-size:12px}html.ph #sv184lv .cd span{font-size:10px}html.ph #sv184lv .ft{display:none}
 html.phL #sv184lv .hb{display:none}`;document.head.appendChild(css);
 window.SV184={open,start,pick,R,EXT,get S(){return R}};
}catch(e){console.error('SV184',e)}})();
