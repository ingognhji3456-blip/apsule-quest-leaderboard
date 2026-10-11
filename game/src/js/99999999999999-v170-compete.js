/* ================= v170 경쟁 · 기록 (CP170) =================
   「🏆 기록 센터」 창(☰ 메뉴 · 보스 러시 화면 #rx168 줄) — 탭 6개:
   - 주간 리그: 주마다(UTC 월요일) 모두가 같은 1·2장 보스(서버 /api/league/info의 boss). 이기면 점수 = 보스전 점수 × 난이도 + 노데미지 2000 + 시간 보너스.
     싸우는 동안 0.1초마다 내 위치 · 공격을 적어 두었다가(고스트) 최고 기록 때 함께 올림. 「👻 고스트와 달리기」는 그 기록의 움직임을
     반투명으로 같은 화면에 그림(DUO85.drawMate). 이번 주 1등 예측(/api/predict, 맞히면 다음 주에 보상 우편). 이달 TOP 10은 「챔피언 오라」(발밑 금빛 고리 · 머리 위 왕관).
   - 노데미지 전당: 어떤 보스든 한 대도 안 맞고 이기면 자동으로 /api/nohit/submit(최근 기록 · 많이 깬 사람 순위).
   - 업적 1000개: 기록 50가지 × 20단계(saveData.ach170). 단계마다 점수(단계 번호) · 골드(받기 단추). 점수는 /api/ach/sync로 순위에.
     기록은 DP153.ev(미션 사건) 감싸기 + 0.25초마다 상태 살피기 + 보스전 끝(fightEnd 감싸기)에서 센다.
   - 스피드런: 탑 1층에서 시작하면 시간 재기(탑 · 보스전 중, 일시정지 빼고) → 11층 도착 = 「10층」, 101층 = 「100층」 기록(/api/speedrun/*). 듀오 · 결투 · 관전은 안 셈.
   - 친구 랭킹: 친구 + 나만(/api/ranking/friends) 레벨 · 탑 · 골드 · 업적 · 이번 주 리그 · 명예.
   - 명예: 서버가 정함(결투 · 팀 결투를 끝까지 +2, 도중에 나가면 −5, 신고받으면 −3). 단계마다 보상 우편. */
(()=>{try{
 const $=id=>document.getElementById(id),esc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const api=(p,b)=>window.DUO85&&DUO85.api?DUO85.api(p,b?'POST':'GET',b):Promise.resolve({s:0,j:{}});
 const acc=()=>{try{return DUO85.acc()}catch(e){return {}}};
 const num=v=>Number(v||0).toLocaleString(),fmt=ms=>{ms=Math.max(0,ms|0);const s=Math.floor(ms/1000),h=Math.floor(s/3600),m=Math.floor(s/60)%60;return (h?h+':'+String(m).padStart(2,'0'):m)+':'+String(s%60).padStart(2,'0')+'.'+String(Math.floor(ms%1000/10)).padStart(2,'0')};
 const DN={easy:'쉬움',normal:'보통',hard:'어려움',extreme:'익스트림'};
 const toast=t=>{try{window.MR163&&MR163.toast?MR163.toast(t):banner(t)}catch(e){}};
 const bossName=i=>{try{return BOSSES[i].name}catch(e){return '보스 '+i}};

 /* ================= 업적 1000개 ================= */
 /* [열쇠, 이름, 단위, 처음 목표, 늘어나는 배수, 'max'면 최고값] — 50가지 × 20단계 */
 const ST=[['kill','몬스터 사냥꾼','마리',10,1.55],['perfect','박자의 달인','번',10,1.55],['boss','보스 정복자','번',1,1.45],['tower','탑 등반가','층',3,1.5],['pvp','결투가','판',1,1.4],
  ['plaza','광장 단골','번',1,1.38],['enh','대장장이','번',1,1.38],['dash','바람걸음','번',20,1.55],['parry','방패 장인','번',5,1.5],['atk','검의 길','번',50,1.55],
  ['ult','필살기 장인','번',1,1.45],['hurt','맷집 왕','번',10,1.5],['coinsUp','부자의 꿈','골드',500,1.65],['coinsDown','큰손','골드',500,1.65],['level','성장','레벨',2,1.22,'max'],
  ['floor','최고 층','층',5,1.38,'max'],['combo','콤보 장인','콤보',5,1.25,'max'],['playMin','열정','분',10,1.45],['fightMin','전사의 시간','분',5,1.45],['plazaMin','광장 산책','분',3,1.42],
  ['duoMin','함께라서','분',3,1.42],['bossE','쉬움 보스','번',1,1.38],['bossN','보통 보스','번',1,1.38],['bossH','어려움 보스','번',1,1.38],['bossX','익스트림 보스','번',1,1.38],
  ['nohit','무결점','번',1,1.33],['league','주간 리그','번',1,1.33],['custom','만든 보스 사냥','번',1,1.35],['c1','기계 장 정복','번',1,1.33],['c2','굶주림 장 정복','번',1,1.33],
  ['c3','기원 장 정복','번',1,1.33],['c4','일식 장 정복','번',1,1.33],['c5','심연 장 정복','번',1,1.33],['c6','천정 장 정복','번',1,1.33],['c7','거울 장 정복','번',1,1.33],
  ['teamWin','팀의 승리','번',1,1.33],['pvpWin','결투 승리','번',1,1.35],['teamPlay','팀 결투','판',1,1.35],['speed','스피드러너','번',1,1.3],['diaUp','다이아 수집','개',10,1.55],
  ['night','밤의 기사','분',3,1.42],['weekend','주말 용사','분',5,1.42],['dashPerf','박자 대시','번',5,1.52],['parryPerf','완벽한 패링','번',3,1.5],['bossFast','번개 같은 승리','번',1,1.33],
  ['bossLow','아슬아슬','번',1,1.33],['days','꾸준함','일',1,1.28],['lose','패배는 거름','번',1,1.38],['retry','다시 한 번','번',1,1.38],['gold','금고','골드',1000,1.6,'max']];
 const ROM=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX'];
 /* 단계 목표: 배수로 늘리고 보기 좋게 반올림 · 앞 단계보다 늘 커지게 */
 const GC={};const goal=(s,i)=>{const L=GC[s[0]]||(GC[s[0]]=(()=>{const o=[];for(let k=0;k<20;k++){const v=s[3]*Math.pow(s[4],k),m=Math.pow(10,Math.max(0,Math.floor(Math.log10(v))-1));let g=Math.max(1,Math.round(v/m)*m);if(k&&g<=o[k-1])g=o[k-1]+Math.max(1,Math.round(o[k-1]*.15));o.push(g)}return o})());return L[i]};
 const A=()=>{const o=saveData.ach170||(saveData.ach170={c:{},got:{},day:''});o.c=o.c||{};o.got=o.got||{};return o};
 const val=k=>A().c[k]||0;
 function add(k,n){if(!n)return;try{if(window.WATCH95&&WATCH95.specOn())return}catch(e){}const o=A();o.c[k]=(o.c[k]||0)+n;dirty=1}
 function mx(k,v){const o=A();if(v>(o.c[k]||0)){o.c[k]=v;dirty=1}}
 const reached=s=>{let i=0;while(i<20&&val(s[0])>=goal(s,i))i++;return i};/* 몇 단계까지 이뤘나 */
 const claimed=k=>A().got[k]|0;
 function totals(){let pts=0,cnt=0,ready=0;for(const s of ST){const r=reached(s),g=claimed(s[0]);cnt+=g;for(let i=0;i<g;i++)pts+=i+1;ready+=r-g}return {pts,cnt,ready}}
 const reward=i=>({gold:Math.round(40*Math.pow(i+1,1.35)/10)*10,dia:(i===9||i===19)?(i===19?20:5):0});
 function claim(k){const s=ST.find(x=>x[0]===k);if(!s)return;const o=A(),r=reached(s);let g=claimed(k),gold=0,dia=0;while(g<r){const w=reward(g);gold+=w.gold;dia+=w.dia;g++}
  if(g===claimed(k))return;o.got[k]=g;try{addCoins(gold)}catch(e){saveData.coins=(saveData.coins||0)+gold}try{dia&&window.DIA80&&DIA80.add(dia)}catch(e){}try{saveNow();gmHud()}catch(e){}
  toast('🏅 업적 보상 🪙 +'+num(gold)+(dia?' · 💎 +'+dia:''));try{sfx(880,.12,'triangle',.05,1320)}catch(e){}dirty=1;syncAch(true)}
 let dirty=0,lastSync=0,lastPts=-1;
 async function syncAch(force){if(!acc().token)return;const t=totals();if(!force&&(t.pts===lastPts||Date.now()-lastSync<60000))return;lastSync=Date.now();lastPts=t.pts;await api('/api/ach/sync',{pts:t.pts,cnt:t.cnt})}
 /* 미션 사건을 함께 셈 */
 if(window.DP153&&DP153.ev){const f=DP153.ev;DP153.ev=function(k,n){try{if(['kill','perfect','boss','tower','pvp','plaza','enh'].includes(k))add(k,n||0)}catch(e){}return f.apply(this,arguments)}}
 /* 0.25초마다 상태 살피기 */
 const W={};
 setInterval(()=>{try{if(typeof saveData==='undefined')return;const now=performance.now(),dt=.25/60;
  const T=window.TW71&&TW71.T,m=typeof mode!=='undefined'?mode:'',fight=m==='tower'||m==='boss'||m==='sec127'||m==='dg129';
  if(P.dash&&P.dash.t0!==W.d){if(W.d!==undefined){add('dash',1);try{if(TW71.beatGood&&TW71.beatGood()===2)add('dashPerf',1)}catch(e){}}W.d=P.dash.t0}
  if(P.parryT!=null&&P.parryT!==W.p){if(W.p!==undefined){add('parry',1);if(P.parryPerf)add('parryPerf',1)}W.p=P.parryT}
  if(P.lungeT&&P.lungeT!==W.a){if(W.a!==undefined)add('atk',1);W.a=P.lungeT}
  {let u=null;try{u=m==='tower'?(T&&T.U&&T.U.sp&&T.U.sp.t0):(G&&G.sp&&G.sp.t0)}catch(e){}if(u&&u!==W.u){if(W.u!==undefined)add('ult',1);W.u=u}}
  if(fight&&W.hp!=null&&P.hp<W.hp)add('hurt',1);W.hp=P.hp;
  const c=saveData.coins||0;if(W.c!=null){if(c>W.c)add('coinsUp',c-W.c);else if(c<W.c)add('coinsDown',W.c-c)}W.c=c;mx('gold',c);
  try{const d=DIA80.get();if(W.dia!=null&&d>W.dia)add('diaUp',d-W.dia);W.dia=d}catch(e){}
  try{mx('level',LV83.get().lv)}catch(e){}try{mx('floor',(saveData.tw71&&saveData.tw71.best)||1)}catch(e){}
  try{if(m==='boss'&&G)mx('combo',G.maxCombo||0)}catch(e){}
  if(!document.hidden){add('playMin',dt);const h=new Date().getHours(),wd=new Date().getDay();if(h<5)add('night',dt);if(wd===0||wd===6)add('weekend',dt)}
  if(fight&&!(typeof paused!=='undefined'&&paused))add('fightMin',dt);if(m==='plaza')add('plazaMin',dt);try{if(DUO85.state.started)add('duoMin',dt)}catch(e){}
  const today=new Date().toDateString();if(A().day!==today){A().day=today;add('days',1)}
  /* 결투 · 팀 결투 끝 */
  try{const M=PVP92.M,e=M&&M.on&&M.ph==='end';if(e&&!W.pv){add('pvpWin',M.sc[M.owner?0:1]>=2?1:0)}W.pv=e}catch(e){}
  try{const M=TD167.M,e=M&&M.on&&M.ph==='end';if(e&&!W.td){add('teamPlay',1);const mine=((DUO85.state.room||{}).players||[]).find(p=>p.me);if(mine&&M.sc[mine.sl>>1]>=2)add('teamWin',1)}W.td=e}catch(e){}
  if(dirty){dirty=0;dot();syncAch(false)}}catch(e){}},250);

 /* ================= 보스전 끝: 업적 · 노데미지 · 주간 리그 ================= */
 const L={on:false,week:'',boss:0,rec:[],t0:0,lastS:0,ghost:null,gname:'',info:null,run:null};
 const who=()=>{try{const w=window.who54&&who54();if(w)return w}catch(e){}return [Math.floor((G.bi||0)/10),(G.bi||0)%10]};
 if(typeof fightEnd==='function'){const f=fightEnd;fightEnd=function(won){
  const was=G&&G.state,lg=G&&G.lg170;
  if(lg&&was!=='result'){leagueEnd(!!won);return}
  const r=f.apply(this,arguments);
  try{if(G&&was!=='result'&&G.state==='result'&&!G._a170){G._a170=1;const ms=performance.now()-(G.startReal||performance.now());
   if(won){add({easy:'bossE',normal:'bossN',hard:'bossH',extreme:'bossX'}[diff]||'bossN',1);const w=who();add('c'+Math.min(7,w[0]+1),1);
    if(G.ce168)add('custom',1);if(ms<60000)add('bossFast',1);if(P.hp>0&&P.hp<(P.maxhp||1)*.2)add('bossLow',1);
    if((G.hits|0)===0&&!G.ce168&&ms>=8000){add('nohit',1);nohit(w,ms)}}
   else add('lose',1);
   const k=w2k();if(L.lastKey===k)add('retry',1);L.lastKey=k}}catch(e){console.error('cp170',e)}return r}}
 const w2k=()=>{try{const w=who();return w[0]*10+w[1]}catch(e){return -1}};
 async function nohit(w,ms){if(!acc().token)return;const r=await api('/api/nohit/submit',{key:String(w[0]*10+w[1]),boss:(G.B&&G.B.name)||'보스',diff,ms:Math.round(ms)});
  if(r.s===200&&r.j.first)toast('🛡 노데미지 전당에 올랐어요! ('+r.j.count+'번째 보스)')}

 /* ----- 주간 리그 ----- */
 async function leagueInfo(){const r=await api('/api/league/info',{});if(r.s===200){L.info=r.j;return r.j}return null}
 async function leagueFight(ghostName){const info=L.info||await leagueInfo();if(!info){toast('서버에 연결할 수 없어요');return}
  L.ghost=null;if(ghostName!=null){const g=await api('/api/league/ghost',{week:info.week,name:ghostName||''});if(g.s===200){L.ghost=parseGhost(g.j.ghost);L.gname=g.j.name;L.gch=g.j.ch|0}else{toast('고스트 기록이 없어요 — 혼자 달려요')}}
  closePanel();try{$('overlay').hidden=true}catch(e){}GM._built=0;L.week=info.week;L.boss=info.boss;L.rec=[];L.t0=0;L.lastS=0;
  try{startRush(info.boss)}catch(e){console.error(e);return}
  try{G.lg170={week:info.week,boss:info.boss};$('bvTitle').textContent='BEAT BLADE · 주간 리그 '+info.week+(L.ghost?' · 👻 '+L.gname:'')}catch(e){}add('league',0)}
 function parseGhost(s){const out=[];if(!s)return out;for(const q of s.split(';')){const v=q.split(',').map(Number);if(v.length>=2&&isFinite(v[0])&&isFinite(v[1]))out.push(v)}return out}
 function ghostStr(){let s='';for(const v of L.rec){const q=v[0]+','+v[1]+(v[2]!=null?','+v[2]:'');if(s.length+q.length+1>59000)break;s+=(s?';':'')+q}return s}
 /* 0.1초마다 내 위치 적기 · 고스트 그리기 */
 const GM={_spec:1,hs:[],evs:[],ring:'#c8a6ff',nmc:'#e0d0ff',noHp:1,hp:1,mx:1,off:0};
 {const f=drawScene;drawScene=function(now){const r=f.apply(this,arguments);try{if(mode==='boss'&&G&&G.lg170&&G.state==='play'){const pn=performance.now();
   if(!L.t0)L.t0=pn;const i=Math.floor((pn-L.t0)/100);
   while(L.rec.length<=i&&L.rec.length<36000){let a=null;if(P.lungeT&&P.lungeT!==L.la){L.la=P.lungeT;a=Math.round((P.lungeA||0)*10)}L.rec.push([Math.round(P.x),Math.round(P.y)].concat(a!=null?[a]:[]))}
   if(L.ghost&&L.ghost.length){if(!GM._built){GM._built=1;GM.hs=L.ghost.map((v,k)=>({t:L.t0+k*100,x:v[0],y:v[1],fx:null,fy:null}));GM.evs=[];L.ghost.forEach((v,k)=>{if(v[2]!=null)GM.evs.push({e:k,k:'a',t:L.t0+k*100,a:v[2]/10,d:130})});
      GM.nm='👻 '+L.gname;GM.ch=L.gch;GM.wp=0;GM.sk='';GM.x=L.ghost[0][0];GM.y=L.ghost[0][1]}
    if(i<L.ghost.length+20){GM.at=pn;const c=ctx;c.save();try{c.filter='opacity(0.5) saturate(0.6) hue-rotate(200deg)'}catch(e){}try{DUO85.drawMate(now,true,GM)}catch(e){}c.restore()}}}}catch(e){}return r}}
 async function leagueEnd(won){if(G.state==='result')return;G.state='result';G.won=won;try{stopMusic()}catch(e){}const ms=Math.round(performance.now()-(L.t0||G.startReal||performance.now())),score=G.score|0,hits=G.hits|0;
  GM._built=0;add(won?{easy:'bossE',normal:'bossN',hard:'bossH',extreme:'bossX'}[diff]:'lose',1);if(won){add('league',1);try{DP153.ev('boss',1)}catch(e){}}
  let res=null;if(won&&acc().token){const r=await api('/api/league/submit',{week:L.week,score,ms,hits,diff,ghost:ghostStr(),ch:(()=>{try{return shopInv().eq.ch||0}catch(e){return 0}})()});res=r.s===200?r.j:{err:(r.j&&r.j.error)||'올리지 못했어요'}}
  if(won&&hits===0&&ms>=8000){add('nohit',1);nohit([Math.floor(L.boss/10),L.boss%10],ms)}
  const html='<div class="cp170r"><b>'+esc(bossName(L.boss))+'</b><small>주간 리그 '+esc(L.week)+' · '+DN[diff]+'</small>'+
   '<div class="rs"><span>보스전 점수 <b>'+num(score)+'</b></span><span>시간 <b>'+fmt(ms)+'</b></span><span>맞은 횟수 <b>'+hits+'</b></span></div>'+
   (won?(res&&!res.err?'<div class="pt">리그 점수 <b>'+num(res.pts)+'</b>'+(res.best?' <em>🆕 내 최고!</em>':'')+'</div><div class="rk">이번 주 <b>'+res.rank+'위</b> · 내 최고 '+num(res.my_best)+'점</div>':'<div class="er">'+esc(res?res.err:'로그인하면 리그 순위에 올라가요')+'</div>'):'<div class="er">지면 리그 점수가 없어요 · 다시 도전!</div>')+'</div>';
  try{showOverlay('WEEKLY LEAGUE',won?'리그 기록!':'패배',html,[['↺ 다시 도전',()=>{$('overlay').hidden=true;leagueFight(L.ghost?L.gname:null)},!won],['🏆 기록 센터',()=>{$('overlay').hidden=true;try{toLobby()}catch(e){}setTimeout(()=>openPanel('league'),200)},won],['로비로',()=>{try{toLobby()}catch(e){}},false]])}catch(e){}}
 async function predict(name){const r=await api('/api/predict',{pick:name});toast(r.s===200?'🔮 예측했어요: '+name:(r.j&&r.j.error)||'예측하지 못했어요');await leagueInfo();paint()}

 /* ----- 챔피언 오라(이달 TOP 10 보상) ----- */
 const aura=()=>{const a=(L.info&&L.info.awards)||saveData.aura170a||[];return a.length?Math.min(...a.map(x=>x.rank)):0};
 {const f=frame;frame=function(){const r=f.apply(this,arguments);try{const rk=saveData.aura170!==false?aura():0;if(rk&&(mode==='tower'||mode==='boss')&&!(window.WATCH95&&WATCH95.specOn())){
   const c=ctx,t=performance.now()/1000,gold=rk<=3,col=gold?'#ffd166':'#d8e4f0';c.save();try{c.setTransform(SS,0,0,SS,0,0)}catch(e){}
   c.globalAlpha=.55+.2*Math.sin(t*3);c.strokeStyle=col;c.lineWidth=1.2;c.beginPath();c.ellipse(P.x,P.y+2,13,4.5,0,0,6.28);c.stroke();
   for(let i=0;i<6;i++){const a=t*1.6+i*1.047,x=P.x+Math.cos(a)*13,y=P.y+2+Math.sin(a)*4.5;c.globalAlpha=.8;c.fillStyle=i%2?'#fff':col;c.fillRect(Math.round(x),Math.round(y-(Math.sin(t*4+i)+1)*3),1,1)}
   const y0=P.y-40+Math.sin(t*2)*1.2;c.globalAlpha=1;c.fillStyle='#000';c.fillRect(P.x-5,y0+1,11,4);c.fillStyle=col;c.fillRect(P.x-4,y0+1,9,3);c.fillRect(P.x-4,y0-1,1,2);c.fillRect(P.x,y0-2,1,3);c.fillRect(P.x+4,y0-1,1,2);
   c.fillStyle=gold?'#ff5a6a':'#7dd8ff';c.fillRect(P.x,y0+2,1,1);c.restore()}}catch(e){}return r}}

 /* ================= 스피드런(탑 1층부터) ================= */
 const SR={on:false,ms:0,last:0,done:{},diff:'normal'};
 if(window.TW71&&TW71.start){const f=TW71.start;TW71.start=function(fl){const r=f.apply(this,arguments);try{const solo=!window.__nosr&&!(DUO85.state.started)&&!(window.PVP92&&PVP92.on())&&!(window.WATCH95&&WATCH95.specOn());
   if(+fl===1&&solo){SR.on=true;SR.ms=0;SR.last=performance.now();SR.done={};SR.diff=diff}else if(SR.on&&+fl!==1)SR.on=false}catch(e){}return r}}
 {const f=toLobby;toLobby=function(){SR.on=false;return f.apply(this,arguments)}}
 {const f=frame;frame=function(){const r=f.apply(this,arguments);try{if(SR.on){const now=performance.now(),dt=Math.min(250,now-SR.last);SR.last=now;
   if((mode==='tower'||mode==='boss')&&!(typeof paused!=='undefined'&&paused))SR.ms+=dt;
   const T=TW71.T,fl=mode==='tower'&&T?T.f:0;for(const [cat,at] of [['10',11],['100',101]])if(fl>=at&&!SR.done[cat]){SR.done[cat]=1;speedDone(cat)}
   if(SR.done['100'])SR.on=false;
   if(mode==='tower'||mode==='boss'){const c=ctx;c.save();try{c.setTransform(SS,0,0,SS,0,0)}catch(e){}const tx='⏱ '+fmt(SR.ms)+(SR.done['10']?' · 100층까지':' · 10층까지');c.font='bold 8px monospace';const w=c.measureText(tx).width+10;
    c.globalAlpha=.8;c.fillStyle='#05070a';c.fillRect(W/2-w/2,H-12,w,11);c.globalAlpha=1;c.fillStyle='#c8a6ff';c.textAlign='center';c.fillText(tx,W/2,H-4);c.restore()}}}catch(e){}return r}}
 async function speedDone(cat){add('speed',1);const ms=Math.round(SR.ms);let t='🏁 스피드런 '+cat+'층 '+fmt(ms);if(acc().token){const r=await api('/api/speedrun/submit',{cat,ms,diff:SR.diff});if(r.s===200)t+=' · '+r.j.rank+'위'+(r.j.best?' 🆕':'')}toast(t)}

 /* ================= 창 ================= */
 const box=document.createElement('div');box.id='cp170';box.hidden=true;document.body.appendChild(box);box.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===box)closePanel()});
 const V={tab:'league',data:{},busy:0,sort:'level',cat:'10',achF:'all'};
 const TABS=[['league','🏆','주간 리그'],['nohit','🛡','노데미지'],['ach','🏅','업적'],['speed','⏱','스피드런'],['friends','👥','친구 랭킹'],['honor','🎖','명예']];
 function openPanel(t){box.hidden=false;if(t)V.tab=t;paint();load()}
 function closePanel(){box.hidden=true}
 async function load(){const t=V.tab;V.busy=1;paint();let r;
  if(t==='league'){await leagueInfo();if(L.info){saveData.aura170a=L.info.awards}}
  else if(t==='nohit'){r=await api('/api/nohit/list',{});V.data.nohit=r.s===200?r.j:null}
  else if(t==='ach'){syncAch(true);r=await api('/api/ach/top',{});V.data.ach=r.s===200?r.j:null}
  else if(t==='speed'){r=await api('/api/speedrun/top',{cat:V.cat});V.data.speed=r.s===200?r.j:null}
  else if(t==='friends'){r=await api('/api/ranking/friends',{});V.data.friends=r.s===200?r.j:{err:(r.j&&r.j.error)||'로그인이 필요해요'}}
  else if(t==='honor'){r=await api('/api/honor/me',{});V.data.honor=r.s===200?r.j:{err:(r.j&&r.j.error)||'로그인이 필요해요'}}
  V.busy=0;if(V.tab===t)paint()}
 const medal=i=>i===0?'🥇':i===1?'🥈':i===2?'🥉':(i+1);
 function leagueHtml(){const I=L.info;if(!I)return V.busy?'<div class="em">불러오는 중…</div>':'<div class="em">서버에 연결할 수 없어요</div>';
  const left=Math.max(0,I.ends-Date.now()/1000),d=Math.floor(left/86400),h=Math.floor(left%86400/3600),me=I.me,rk=aura();
  return '<div class="lg"><div class="lgL"><div class="bossC"><canvas width="160" height="120" class="bv"></canvas><div><small>이번 주 보스 · '+esc(I.week)+'</small><b>'+esc(bossName(I.boss))+'</b><em>끝나기까지 '+d+'일 '+h+'시간</em></div></div>'+
   '<div class="my">'+(me?'내 최고 <b>'+num(me.pts)+'점</b> · <b>'+me.rank+'위</b> · '+fmt(me.ms)+(me.hits===0?' · 🛡 노데미지':''):'아직 이번 주 기록이 없어요')+'</div>'+
   '<div class="bt"><button class="go" data-lg="solo">⚔ 리그 도전</button><button class="gh" data-lg="ghost">👻 1등 고스트와 달리기</button></div>'+
   '<div class="rule">점수 = 보스전 점수 × 난이도(쉬움 ×0.6 ~ 익스트림 ×1.8) + 노데미지 2,000 + 빨리 깬 보너스 · 지금 난이도: <b>'+DN[diff]+'</b></div>'+
   '<div class="sea"><b>🗓 '+esc(I.month)+' 시즌</b> 내 점수 '+num(I.month_pts)+' · 이달 TOP 10은 다음 달에 <b>👑 챔피언 오라</b>와 골드 · 💎'+
    (rk?'<label class="au"><input type="checkbox" '+(saveData.aura170!==false?'checked':'')+'> 내 챔피언 오라 켜기 ('+rk+'위 보상)</label>':'')+'</div>'+
   '<div class="pd"><b>🔮 이번 주 1등 예측</b> '+(I.predict.pick?'내 예측: <em>'+esc(I.predict.pick)+'</em>':'아직 안 골랐어요')+(I.predict.open?' · 아래 순위에서 「예측」을 눌러요':' · 마지막 날이라 바꿀 수 없어요')+
    (I.predict.last?'<div class="pl">지난주('+esc(I.predict.last.week)+') 예측 '+esc(I.predict.last.pick)+' → 1등 '+esc(I.predict.last.winner||'없음')+' '+(I.predict.last.hit?'🎉 성공! (보상 우편)':'아쉬워요')+'</div>':'')+'</div>'+
   (I.prev.top.length?'<div class="pv">지난주 TOP 3 · '+I.prev.top.map((x,i)=>medal(i)+' '+esc(x.name)+' '+num(x.pts)).join(' · ')+'</div>':'')+'</div>'+
   '<div class="lgR"><h5>이번 주 순위</h5><div class="tb">'+(I.top.length?I.top.map(x=>'<div class="tr'+(x.me?' me':'')+'"><i>'+medal(x.rank-1)+'</i><b>'+esc(x.name)+'</b><span>'+num(x.pts)+'</span><small>'+fmt(x.ms)+' · '+DN[x.diff]+(x.hits===0?' · 🛡':'')+'</small>'+
     (x.ghost&&!x.me?'<button data-gh="'+esc(x.name)+'" title="이 사람 고스트와 달리기">👻</button>':'')+(I.predict.open&&!x.me?'<button data-pd="'+esc(x.name)+'">예측</button>':'')+'</div>').join(''):'<div class="em">아직 아무도 없어요 · 첫 1등이 되어 봐요!</div>')+'</div>'+
   (I.month_top.length?'<h5>🗓 이달 시즌 TOP 10</h5><div class="tb sm">'+I.month_top.map((x,i)=>'<div class="tr"><i>'+medal(i)+'</i><b>'+esc(x.name)+'</b><span>'+num(x.pts)+'</span></div>').join('')+'</div>':'')+'</div></div>'}
 function nohitHtml(){const D=V.data.nohit;if(!D)return '<div class="em">'+(V.busy?'불러오는 중…':'서버에 연결할 수 없어요')+'</div>';
  return '<div class="two"><div><h5>🛡 많이 깬 사람</h5><p class="sub">한 대도 안 맞고 보스를 이기면 저절로 올라가요</p><div class="tb">'+(D.top.length?D.top.map((x,i)=>'<div class="tr"><i>'+medal(i)+'</i><b>'+esc(x.name)+'</b><span>'+x.n+'마리</span><small>어려움 이상 '+x.hard+'</small></div>').join(''):'<div class="em">아직 없어요 · 첫 무결점 기사가 되어 봐요</div>')+'</div></div>'+
   '<div><h5>✨ 최근 노데미지</h5><div class="tb">'+D.recent.map(x=>'<div class="tr"><b>'+esc(x.name)+'</b><span>'+esc(x.boss)+'</span><small>'+DN[x.diff]+' · '+fmt(x.ms)+'</small></div>').join('')+'</div></div></div>'}
 function achHtml(){const t=totals(),D=V.data.ach;const list=ST.map(s=>{const r=reached(s),g=claimed(s[0]),cur=val(s[0]),nx=r<20?goal(s,r):null,pv=r>0?goal(s,r-1):0,q=nx?Math.max(0,Math.min(1,(cur-pv)/(nx-pv))):1;return {s,r,g,cur,nx,q}})
   .filter(o=>V.achF==='all'||(V.achF==='ready'&&o.r>o.g)||(V.achF==='done'&&o.r===20));
  return '<div class="ach"><div class="sum"><div><b>'+t.cnt+'</b><small>/ 1000 업적</small></div><div><b>'+num(t.pts)+'</b><small>업적 점수</small></div><div><b>'+t.ready+'</b><small>받을 보상</small></div>'+
   '<div class="fl">'+[['all','전체'],['ready','받기 가능'],['done','다 깸']].map(([k,n])=>'<button data-af="'+k+'" class="'+(V.achF===k?'on':'')+'">'+n+'</button>').join('')+'</div></div>'+
   '<div class="two"><div class="al">'+list.map(o=>{const s=o.s;return '<div class="ai'+(o.r>o.g?' rd':'')+'"><i class="tier t'+Math.min(4,Math.floor(o.g/4))+'">'+(o.g?ROM[o.g-1]:'·')+'</i><div><b>'+esc(s[1])+' '+(o.r<20?ROM[o.r]:'완료')+'</b>'+
     '<small>'+(o.nx?num(Math.floor(o.cur))+' / '+num(o.nx)+' '+s[2]+(s[5]?' (최고)':''):'20단계 모두 이뤘어요!')+'</small><u><i style="width:'+Math.round(o.q*100)+'%"></i></u></div>'+
     (o.r>o.g?'<button data-cl="'+s[0]+'">받기 '+(o.r-o.g)+'</button>':'<em>'+o.g+'/20</em>')+'</div>'}).join('')+'</div>'+
   '<div><h5>🏅 업적 점수 순위</h5><div class="tb">'+(D&&D.top.length?D.top.map((x,i)=>'<div class="tr"><i>'+medal(i)+'</i><b>'+esc(x.name)+'</b><span>'+num(x.pts)+'</span><small>'+x.cnt+'개</small></div>').join(''):'<div class="em">'+(V.busy?'불러오는 중…':'아직 없어요')+'</div>')+'</div></div></div></div>'}
 function speedHtml(){const D=V.data.speed;
  return '<div class="sp"><div class="rule">탑 오르기를 <b>1층부터</b> 시작하면 시간이 자동으로 재져요(일시정지 · 결과창은 빼고). 11층에 닿으면 「10층」, 101층에 닿으면 「100층」 기록! 쓰러져서 체크포인트로 돌아가면 기록이 끊겨요.</div>'+
   '<div class="fl">'+[['10','10층 (1 → 11)'],['100','100층 (1 → 101)']].map(([k,n])=>'<button data-cat="'+k+'" class="'+(V.cat===k?'on':'')+'">'+n+'</button>').join('')+'<button class="go" data-sr="1">⏱ 1층부터 시작</button></div>'+
   '<div class="tb">'+(D&&D.top.length?D.top.map((x,i)=>'<div class="tr"><i>'+medal(i)+'</i><b>'+esc(x.name)+'</b><span>'+fmt(x.ms)+'</span><small>'+DN[x.diff]+'</small></div>').join(''):'<div class="em">'+(V.busy?'불러오는 중…':'아직 기록이 없어요 · 첫 기록을 세워 봐요')+'</div>')+'</div></div>'}
 function friendsHtml(){const D=V.data.friends;if(!D)return '<div class="em">불러오는 중…</div>';if(D.err)return '<div class="em">'+esc(D.err)+'</div>';
  const K=[['level','레벨'],['floor','탑'],['gold','골드'],['ach','업적'],['league','이번 주 리그'],['honor','명예']],k=V.sort,rows=D.rows.slice().sort((a,b)=>(b[k]||0)-(a[k]||0));
  return '<div class="fr"><div class="fl">'+K.map(([a,n])=>'<button data-so="'+a+'" class="'+(k===a?'on':'')+'">'+n+'</button>').join('')+'</div>'+
   (rows.length<2?'<p class="sub">친구를 추가하면 여기서 친구끼리 순위를 볼 수 있어요</p>':'')+
   '<div class="tb">'+rows.map((x,i)=>'<div class="tr'+(x.me?' me':'')+'"><i>'+medal(i)+'</i><b>'+esc(x.name)+(x.me?' (나)':'')+'</b><span>'+num(x[k])+'</span><small>Lv.'+x.level+' · '+x.floor+'F · 업적 '+num(x.ach)+'</small></div>').join('')+'</div></div>'}
 function honorHtml(){const D=V.data.honor;if(!D)return '<div class="em">불러오는 중…</div>';if(D.err)return '<div class="em">'+esc(D.err)+'</div>';
  return '<div class="two"><div class="hn"><div class="big"><i>🎖</i><b>'+esc(D.grade)+'</b><span>명예 '+num(D.pts)+'점</span></div>'+
   (D.next?'<u><i style="width:'+Math.round(Math.min(1,D.pts/D.next.need)*100)+'%"></i></u><small>「'+esc(D.next.name)+'」까지 '+(D.next.need-D.pts)+'점 · 보상 🪙 '+num(D.next.gold)+(D.next.dia?' · 💎 '+D.next.dia:'')+'</small>':'<small>가장 높은 명예예요!</small>')+
   '<ul><li>결투 · 팀 결투를 <b>끝까지</b> 하면 <b>+2</b></li><li>빠른 대전 도중에 나가면 <b>−5</b></li><li>신고받으면 <b>−3</b></li><li>단계에 닿으면 우편으로 보상이 와요</li></ul>'+
   '<div class="st">'+D.steps.map(s=>'<span class="'+(D.pts>=s.need?'ok':'')+'">'+esc(s.name)+' · '+s.need+'점</span>').join('')+'</div></div>'+
   '<div><h5>🎖 명예 순위</h5><div class="tb">'+(D.top.length?D.top.map((x,i)=>'<div class="tr"><i>'+medal(i)+'</i><b>'+esc(x.name)+'</b><span>'+num(x.pts)+'</span></div>').join(''):'<div class="em">아직 없어요</div>')+'</div></div></div>'}
 function paint(){if(box.hidden)return;const t=V.tab;
  let h='<div class="pn"><div class="hd"><button class="bk">닫기</button><i>🏆</i><div><b>기록 센터</b><small>주간 리그 · 노데미지 전당 · 업적 1000개 · 스피드런 · 친구 랭킹 · 명예</small></div></div>'+
   '<div class="tabs">'+TABS.map(([k,ic,n])=>'<button data-t="'+k+'" class="'+(t===k?'on':'')+'"><i>'+ic+'</i>'+n+(k==='ach'&&totals().ready?'<u>'+totals().ready+'</u>':'')+'</button>').join('')+'</div><div class="bd">'+
   (t==='league'?leagueHtml():t==='nohit'?nohitHtml():t==='ach'?achHtml():t==='speed'?speedHtml():t==='friends'?friendsHtml():honorHtml())+'</div></div>';
  const sc=box.querySelector('.bd')?box.querySelector('.bd').scrollTop:0,sc2=box.querySelector('.al')?box.querySelector('.al').scrollTop:0;box.innerHTML=h;
  const bd=box.querySelector('.bd');if(bd)bd.scrollTop=sc;const al=box.querySelector('.al');if(al)al.scrollTop=sc2;wire()}
 function wire(){const q=s=>box.querySelector(s),qa=s=>box.querySelectorAll(s);
  q('.bk').onclick=closePanel;qa('[data-t]').forEach(b=>b.onclick=()=>{V.tab=b.dataset.t;try{gmSfx('tab')}catch(e){}paint();load()});
  qa('[data-lg]').forEach(b=>b.onclick=()=>leagueFight(b.dataset.lg==='ghost'?'':null));qa('[data-gh]').forEach(b=>b.onclick=()=>leagueFight(b.dataset.gh));
  qa('[data-pd]').forEach(b=>b.onclick=()=>predict(b.dataset.pd));
  const au=q('.au input');if(au)au.onchange=()=>{saveData.aura170=au.checked;try{saveNow()}catch(e){}};
  qa('[data-cl]').forEach(b=>b.onclick=()=>{claim(b.dataset.cl);paint()});qa('[data-af]').forEach(b=>b.onclick=()=>{V.achF=b.dataset.af;paint()});
  qa('[data-cat]').forEach(b=>b.onclick=()=>{V.cat=b.dataset.cat;load()});qa('[data-so]').forEach(b=>b.onclick=()=>{V.sort=b.dataset.so;paint()});
  if(q('[data-sr]'))q('[data-sr]').onclick=()=>{closePanel();try{initAudio()}catch(e){}try{TW71.start(1)}catch(e){console.error(e)}};
  const bv=q('canvas.bv');if(bv&&L.info){const o=bv.getContext('2d'),B=BOSSES[L.info.boss],loop=now=>{if(!bv.isConnected)return;o.clearRect(0,0,160,120);o.imageSmoothingEnabled=false;try{drawMech(o,B,80,82,now,{},2.3)}catch(e){}requestAnimationFrame(loop)};requestAnimationFrame(loop)}}
 /* 받을 업적 보상 표시(☰ 단추 · 보스 러시 줄 단추) */
 function dot(){try{const n=totals().ready,b=$('cp170b');if(b)b.dataset.n=n>0?n:''}catch(e){}}
 /* 들어가는 곳: 보스 러시 화면 줄(#rx168) */
 setInterval(()=>{try{const r=$('rx168');if(!r||r.querySelector('.cp'))return;const b=document.createElement('button');b.className='gmBtn cp';b.id='cp170b';b.type='button';
  b.innerHTML='<i>🏆</i><span><b>주간 리그</b><small>기록 센터 · 업적 · 스피드런</small></span>';b.onclick=e=>{e.stopPropagation();try{gmSfx('ok')}catch(_){}openPanel('league')};r.appendChild(b);dot()}catch(e){}},500);
 /* 영상관: 내 기기 영상 공유하기(폰은 다른 앱으로 보내기, 컴퓨터는 파일로 저장) — 75 리플레이 공유 */
 window.__share170=async function(it){try{const file=new File([it.blob],'beatblade-'+(it.boss||'replay')+'.webm',{type:'video/webm'});
  if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:'BEAT BLADE 기록 영상',text:(it.boss||'')+' '+(it.score||0)+'점'})}
  else{const a=document.createElement('a');a.href=it.url;a.download=file.name;document.body.appendChild(a);a.click();a.remove();toast('💾 영상 파일을 저장했어요 · 친구에게 보내 보세요')}}catch(e){}};

 const st=document.createElement('style');st.textContent=`
 #cp170{position:fixed;inset:0;z-index:9300;display:grid;place-items:center;background:#000b;backdrop-filter:blur(3px);color:#eef0f6;font-family:inherit}#cp170[hidden]{display:none}
 #cp170 .pn{width:min(900px,calc(100vw - 20px));height:min(640px,calc(100vh - 20px));display:flex;flex-direction:column;box-sizing:border-box;padding:12px 14px;border-radius:16px;
  background:radial-gradient(120% 60% at 50% 0%,#2a2050,#0c0a18 70%);border:1px solid #c8a6ff55;box-shadow:0 20px 60px #000c,0 0 0 1px #000}
 #cp170 .hd{display:flex;align-items:center;gap:10px;margin-bottom:8px}#cp170 .hd>i{font-style:normal;font-size:22px;width:40px;height:40px;display:grid;place-items:center;border-radius:12px;background:linear-gradient(180deg,#5a3a9a,#1e1238);border:1px solid #c8a6ff88}
 #cp170 .hd b{display:block;font-size:19px;color:#ffe79a;letter-spacing:.04em}#cp170 .hd small{font-size:11.5px;color:#b8aad0}
 #cp170 .tabs{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px}#cp170 .tabs button{position:relative;font:inherit;font-weight:900;font-size:12.5px;padding:7px 10px;border-radius:10px;border:1px solid #ffffff1c;background:#181428;color:#cfc4e6;cursor:pointer;display:flex;align-items:center;gap:5px}
 #cp170 .tabs button i{font-style:normal}#cp170 .tabs button.on{background:linear-gradient(180deg,#ffe79a,#ffb020);color:#2a1206;border-color:#fff0c0}
 #cp170 .tabs u{position:absolute;top:-6px;right:-4px;text-decoration:none;font-size:10px;background:#ff3a5a;color:#fff;border-radius:8px;padding:0 5px}
 #cp170 .bd{flex:1;min-height:0;overflow:auto}#cp170 .em{text-align:center;padding:24px;color:#9a90b0}#cp170 h5{margin:4px 0 6px;font-size:13px;color:#ffe79a}#cp170 .sub{margin:0 0 6px;font-size:11.5px;color:#a89cc0}
 #cp170 .tb{display:flex;flex-direction:column;gap:3px}#cp170 .tr{display:grid;grid-template-columns:28px 1fr auto auto auto;align-items:center;gap:6px;padding:5px 8px;border-radius:9px;background:#141024;border:1px solid #ffffff10;font-size:12.5px}
 #cp170 .tr.me{border-color:#ffd166;background:#2a2210}#cp170 .tr i{font-style:normal;text-align:center;font-weight:900;color:#c8b8e8}#cp170 .tr b{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#cp170 .tr span{font-weight:900;color:#ffe79a}
 #cp170 .tr small{font-size:10.5px;color:#9a90b0;white-space:nowrap}#cp170 .tr button{font:inherit;font-size:11px;font-weight:900;padding:3px 7px;border-radius:7px;border:0;background:#3a2a6a;color:#e8dcff;cursor:pointer}
 #cp170 .tb.sm .tr{padding:3px 8px;font-size:11.5px}
 #cp170 .lg,#cp170 .two{display:grid;grid-template-columns:1fr 1fr;gap:12px}#cp170 .lgL{display:flex;flex-direction:column;gap:8px}
 #cp170 .bossC{display:flex;align-items:center;gap:10px;padding:8px;border-radius:12px;background:linear-gradient(180deg,#241a40,#100c1c);border:1px solid #c8a6ff44}#cp170 .bossC canvas{width:120px;height:90px;image-rendering:pixelated;flex:none}
 #cp170 .bossC small{display:block;font-size:11px;color:#a89cc0}#cp170 .bossC b{display:block;font-size:20px;color:#fff}#cp170 .bossC em{font-style:normal;font-size:11.5px;color:#ffb070}
 #cp170 .my{font-size:13px;padding:7px 10px;border-radius:10px;background:#141024}#cp170 .my b{color:#ffe79a}
 #cp170 .bt,#cp170 .fl{display:flex;gap:6px;flex-wrap:wrap}#cp170 .bt button,#cp170 .go{flex:1;font:inherit;font-weight:900;font-size:14px;padding:10px;border-radius:12px;border:0;cursor:pointer;background:linear-gradient(180deg,#ffe79a,#ff9a2a);color:#2a1206;box-shadow:0 0 0 2px #000}
 #cp170 .bt .gh{background:linear-gradient(180deg,#e0d0ff,#8a5aff);color:#14082a}
 #cp170 .fl button{font:inherit;font-weight:800;font-size:12px;padding:6px 10px;border-radius:9px;border:1px solid #ffffff1c;background:#181428;color:#cfc4e6;cursor:pointer}#cp170 .fl button.on{background:#ffd166;color:#2a1206}
 #cp170 .rule,#cp170 .sea,#cp170 .pd,#cp170 .pv{font-size:11.5px;line-height:1.6;color:#cfc4e6;padding:7px 10px;border-radius:10px;background:#100c1c;border:1px dashed #ffffff1c}#cp170 .rule b,#cp170 .sea b,#cp170 .pd b{color:#ffe79a}#cp170 .pd em{font-style:normal;color:#c8a6ff;font-weight:900}
 #cp170 .au{display:block;margin-top:4px;color:#ffe79a;font-weight:800;cursor:pointer}#cp170 .pl{margin-top:3px;color:#ffd0a0}
 #cp170 .ach .sum{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:8px}#cp170 .ach .sum>div:not(.fl){display:flex;align-items:baseline;gap:4px}#cp170 .ach .sum b{font-size:22px;color:#ffe79a}#cp170 .ach .sum small{color:#a89cc0;font-size:11px}#cp170 .ach .fl{margin-left:auto}
 #cp170 .al{display:flex;flex-direction:column;gap:4px;max-height:460px;overflow:auto;padding-right:4px}
 #cp170 .ai{display:grid;grid-template-columns:34px 1fr auto;align-items:center;gap:8px;padding:6px 8px;border-radius:10px;background:#141024;border:1px solid #ffffff10}#cp170 .ai.rd{border-color:#ffd166;box-shadow:0 0 10px #ffd16633}
 #cp170 .ai b{font-size:12.5px}#cp170 .ai small{display:block;font-size:10.5px;color:#9a90b0}#cp170 .ai u{display:block;height:4px;margin-top:3px;border-radius:3px;background:#05050c;overflow:hidden}#cp170 .ai u i{display:block;height:100%;background:linear-gradient(90deg,#8a5aff,#ffd166)}
 #cp170 .ai em{font-style:normal;font-size:11px;color:#9a90b0}#cp170 .ai button{font:inherit;font-weight:900;font-size:11.5px;padding:5px 9px;border-radius:8px;border:0;background:linear-gradient(180deg,#ffe79a,#ff9a2a);color:#2a1206;cursor:pointer}
 #cp170 .tier{font-style:normal;width:30px;height:30px;display:grid;place-items:center;border-radius:50%;font-size:10px;font-weight:900;color:#000;background:#5a5468}
 #cp170 .tier.t0{background:#c08a5a}#cp170 .tier.t1{background:#c8d4e0}#cp170 .tier.t2{background:#ffd166}#cp170 .tier.t3{background:#7df9ff}#cp170 .tier.t4{background:linear-gradient(135deg,#ff6ad5,#ffd166,#7df9ff)}
 #cp170 .sp{display:flex;flex-direction:column;gap:8px}#cp170 .sp .go{flex:0 0 auto;margin-left:auto;font-size:13px;padding:7px 14px}
 #cp170 .hn{display:flex;flex-direction:column;gap:8px}#cp170 .hn .big{display:flex;align-items:center;gap:10px}#cp170 .hn .big i{font-style:normal;font-size:34px}#cp170 .hn .big b{font-size:22px;color:#ffe79a}#cp170 .hn .big span{color:#cfc4e6}
 #cp170 .hn u{display:block;height:8px;border-radius:5px;background:#05050c;overflow:hidden}#cp170 .hn u i{display:block;height:100%;background:linear-gradient(90deg,#7dffa8,#ffd166)}#cp170 .hn small{color:#a89cc0;font-size:11.5px}
 #cp170 .hn ul{margin:0;padding-left:18px;font-size:12px;line-height:1.7;color:#cfc4e6}#cp170 .hn ul b{color:#ffe79a}#cp170 .hn .st{display:flex;flex-wrap:wrap;gap:4px}#cp170 .hn .st span{font-size:11px;padding:3px 8px;border-radius:8px;background:#181428;color:#9a90b0}#cp170 .hn .st span.ok{background:#2a3a20;color:#a6f5a0}
 #rx168 .cp{background:linear-gradient(180deg,#e0d0ff,#8a5aff)!important;color:#14082a!important;border:0!important;box-shadow:0 0 0 2px #000!important;position:relative}
 #rx168 .cp[data-n]:not([data-n=""])::after{content:attr(data-n);position:absolute;top:-6px;right:-4px;font-size:10px;background:#ff3a5a;color:#fff;border-radius:8px;padding:0 5px}
 #rx168{flex-wrap:wrap}#rx168 button{flex:1 1 30%}
 .cp170r{display:flex;flex-direction:column;align-items:center;gap:6px}.cp170r>b{font-size:20px;color:#ffe0b0}.cp170r>small{opacity:.75}.cp170r .rs{display:flex;gap:10px;font-size:12px;flex-wrap:wrap;justify-content:center}.cp170r .rs b{color:#fff}
 .cp170r .pt{font-size:18px;font-weight:900;padding:6px 14px;border-radius:12px;background:#2a2410;color:#ffe79a}.cp170r .pt em{font-style:normal;color:#7dffa8;font-size:13px}.cp170r .rk{font-size:13px}.cp170r .er{color:#ff9aaa;font-size:12.5px}
 @media (max-width:700px){#cp170 .lg,#cp170 .two{grid-template-columns:1fr}#cp170 .al{max-height:none}#cp170 .tr{grid-template-columns:24px 1fr auto auto}#cp170 .tr small{display:none}#cp170 .tabs button{padding:6px 8px;font-size:11.5px}}
 html.lpL #cp170 .pn{padding:8px 10px}html.lpL #cp170 .hd small{display:none}`;document.head.appendChild(st);
 window.CP170={open:openPanel,close:closePanel,league:leagueFight,ST,goal,totals,add,val,claim,L,SR,syncAch};
}catch(e){console.error('v170 compete',e)}})();
