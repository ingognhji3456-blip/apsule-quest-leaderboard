/* v153: 출석 · 일일/주간 미션 · 시즌 패스 (DP153)
   - 출석: 그날 처음 로비에 오면 자동으로 받고 #att153 알림 창(왼쪽 2×2 = 오늘(출석 도장) · 내일 · 모레 · 글피, 오른쪽 큰 칸 = 이번 주 큰 보상(7 · 14 · 21 · 28일째 💎)까지 D-몇 · 다이아 더미, 누르면 · 9초 뒤 닫힘). 28일 한 바퀴(빠진 날이 있어도 처음으로 안 돌아감). 받을 때마다 패스 경험치 +100.
   - 일일 미션: 「접속하기」 + 날마다 바뀌는 4개(탑 층 · 처치 · PERFECT · 보스 · 결투 · 광장 · 강화 중). 다 깨면 보너스 상자.
   - 주간 미션: 5개(월요일에 새로). 다 깨면 큰 상자.
   - 시즌 패스: 한 달(결투 시즌과 같은 'YYYY-MM', 이 기기 날짜). 40단계 · 단계마다 1,000 경험치. 무료 줄 + 프리미엄 줄.
     프리미엄은 💎(DIA80.buy) 또는 ₩(PAY58.buy, 서버 상품 pass_YYYY-MM)로 산다. 보유 여부는 PAY58.ownsItem({pid}).
   - 기록: saveData.dp153 = {att:{last,n}, day:{d,c,got,box}, wk:{w,c,got,box}, ps:{s,xp,f:{},p:{}}}
   - 세는 곳: 처치 CB81.onKill · 보스 승리 fightEnd · 탑 층 TW71.T.f 변화 · PERFECT(탑 · 비밀 장면은 doAttack 때 박자, 보스전은 G.shots의 jd)
     · 결투 PVP92.M(끝남) · 광장 PLZ111.enter · 강화 saveData.enh94 합 증가. 관전 중에는 세지 않음.
   - 들어가는 곳: 폰 · 패드 로비는 #lp146 안 「미션 · 패스」 줄, 컴퓨터는 위쪽 줄 「미션 · 패스」 단추. */
(function(){try{
 const RT=document.documentElement,$=id=>document.getElementById(id);
 const E=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const num=n=>Number(n||0).toLocaleString();
 const p2=n=>String(n).padStart(2,'0');
 const today=()=>{const d=new Date();return d.getFullYear()+'-'+p2(d.getMonth()+1)+'-'+p2(d.getDate())};
 const weekKey=()=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7));return d.getFullYear()+'-'+p2(d.getMonth()+1)+'-'+p2(d.getDate())};
 const season=()=>{const d=new Date();return d.getFullYear()+'-'+p2(d.getMonth()+1)};
 const daysLeft=()=>{const d=new Date(),e=new Date(d.getFullYear(),d.getMonth()+1,1);return Math.max(0,Math.ceil((e-d)/86400000))};
 const save=()=>{try{saveNow()}catch(e){}};
 /* ── 기록 ── */
 function S(){const s=saveData;const o=s.dp153=s.dp153||{};o.att=o.att||{last:'',n:0};
  const d=today();if(!o.day||o.day.d!==d)o.day={d,c:{},got:{},box:0};
  const w=weekKey();if(!o.wk||o.wk.w!==w)o.wk={w,c:{},got:{},box:0};
  const se=season();if(!o.ps||o.ps.s!==se)o.ps={s:se,xp:0,f:{},p:{}};return o}
 /* ── 미션 표 ── [열쇠, 글, 목표, 패스 경험치, 골드] */
 const POOL={tower:['탑 {n}층 오르기',3,130,300],kill:['몬스터 {n}마리 처치',40,120,300],perfect:['PERFECT {n}번',30,130,300],boss:['보스 {n}번 이기기',1,150,400],
  pvp:['결투 {n}판 하기',1,150,400],plaza:['광장 들르기',1,100,200],enh:['장비 {n}번 강화하기',1,120,300]};
 const WEEK=[['tower','탑 {n}층 오르기',25,500,1500],['kill','몬스터 {n}마리 처치',400,500,1500],['perfect','PERFECT {n}번',300,500,1500],['boss','보스 {n}번 이기기',6,500,1500],['dayall','일일 미션 {n}일 모두 깨기',5,600,2000]];
 function dailyList(){const d=today();let h=0;for(const c of d)h=(h*131+c.charCodeAt(0))>>>0;const keys=Object.keys(POOL),pick=[];
  while(pick.length<4){h=(h*1103515245+12345)>>>0;const k=keys[h%keys.length];if(!pick.includes(k))pick.push(k)}
  return [['login','접속하기',1,100,200]].concat(pick.map(k=>[k].concat(POOL[k])))}
 const weekList=()=>WEEK;
 const txt=(t,n)=>t.replace('{n}',num(n));
 /* ── 보상 ── */
 function give(gold,dia,xp){try{if(gold){if(typeof addCoins==='function')addCoins(gold);else{saveData.coins=(saveData.coins||0)+gold}try{gmHud()}catch(e){}}}catch(e){}
  try{if(dia&&window.DIA80)DIA80.add(dia)}catch(e){}if(xp)addXp(xp);save()}
 /* 출석 28칸: 7 · 14 · 21 · 28일째는 💎 크게 */
 const ATT=Array.from({length:28},(_,i)=>{const d=i+1;if(d%7===0)return {dia:[30,50,60,100][d/7-1]};if(d%3===0)return {dia:10+Math.floor(d/7)*5};return {gold:300+d*25}});
 /* 패스 40단계 */
 const LV=40,XPL=1000;
 const FREE=Array.from({length:LV},(_,i)=>{const l=i+1;if(l===LV)return {dia:60};if(l%5===0)return {dia:20};if(l%2)return {gold:300+l*20};return {gold:200+l*15}});
 const PREM=Array.from({length:LV},(_,i)=>{const l=i+1;if(l===LV)return {dia:300};if(l%5===0)return {dia:80};if(l%2===0)return {dia:15};return {gold:700+l*40}});
 /* v161: 프리미엄 20단계 = 유물 무기, 40단계 = 유물 캐릭터(다이아에 더해서). 이미 가졌으면 그 값만큼 골드 */
 PREM[19]=Object.assign({},PREM[19],{gear:['wp','신살의 대검']});PREM[39]=Object.assign({},PREM[39],{gear:['ch','아르테온']});
 const gearIdx=g=>{try{const L=g[0]==='wp'?WEAPONS:CHARS;return L.findIndex(x=>x&&x.name===g[1])}catch(e){return -1}};
 function giveGear(r){if(!r||!r.gear)return '';const [k,nm]=r.gear,i=gearIdx(r.gear);if(i<0)return '';const inv=shopInv(),a=inv.inv[k]||(inv.inv[k]=[]);
  if(a.includes(i)){const L=k==='wp'?WEAPONS:CHARS,g=(L[i]&&L[i].price)||5000;give(g,0,0);return nm+'(이미 있어서 🪙'+num(g)+')'}a.push(i);try{saveNow()}catch(e){}return nm+' 획득!'}
 const TH={};function gearThumb(g){const key=g.join('|');if(TH[key])return TH[key];const i=gearIdx(g);if(i<0)return '';try{const cv=document.createElement('canvas');cv.width=96;cv.height=96;const c=cv.getContext('2d');c.imageSmoothingEnabled=false;const now=performance.now();
   if(g[0]==='ch'){const inv=shopInv(),sv=inv.eq.ch;inv.eq.ch=i;try{drawKnight(c,26,40,4,false,null,0)}finally{inv.eq.ch=sv}}
   else{const w=WEAPONS[i],sp=WSPR[w.type]||WSPR.sword,n=sp.r.length,sc=Math.min(4,70/(n*.72)),ang=-.82,L=(n-1)*sc*.72,hx=48-Math.cos(ang)*(L/2-sp.g*sc*.72),hy=48-Math.sin(ang)*(L/2-sp.g*sc*.72);wsWeaponCopy(c,w,hx,hy,ang,sc,now,0,0,96,96)}
   return TH[key]=cv.toDataURL()}catch(e){return ''}}
 const lvOf=xp=>Math.min(LV,Math.floor(xp/XPL));
 function addXp(n){const o=S();const before=lvOf(o.ps.xp);o.ps.xp+=Math.max(0,Math.round(n));const after=lvOf(o.ps.xp);if(after>before)toast('시즌 패스 '+after+'단계!');save();dot()}
 const PRICE_KRW=5500,premPid=()=>'pass_'+season();
 const hasPrem=()=>{try{if(window.DIA80&&DIA80.owns(premPid()))return true}catch(e){}try{return !!(window.PAY58&&PAY58.ownsItem({pid:premPid()}))}catch(e){return false}};
 const diaPrice=()=>{try{return DIA80.price({price:PRICE_KRW})}catch(e){return 1100}};
 const rwTxt=r=>r.dia?'<i class="px149" style="--x:var(--sp-dia153)"></i>'+num(r.dia):'<i class="px149" style="--x:var(--sp-coin)"></i>'+num(r.gold);
 /* ── 세기 ── */
 function ev(k,n){if(!n)return;try{if(window.WATCH95&&WATCH95.specOn())return}catch(e){}const o=S();o.day.c[k]=(o.day.c[k]||0)+n;o.wk.c[k]=(o.wk.c[k]||0)+n;dot();if(box&&!box.hidden)draw()}
 const prog=(o,k)=>k==='login'?1:(o.c[k]||0);
 /* 처치 */
 if(window.CB81&&CB81.onKill){const f=CB81.onKill;CB81.onKill=function(m){const r=f.apply(this,arguments);try{if(m&&!m._dp153){m._dp153=1;ev('kill',1)}}catch(e){}return r}}
 /* 보스 승리 */
 if(typeof fightEnd==='function'){const f=fightEnd;fightEnd=function(won){const r=f.apply(this,arguments);try{if(won&&window.G&&!G._dp153){G._dp153=1;ev('boss',1)}}catch(e){}return r}}
 /* PERFECT(탑 · 비밀 장면): 휘두르는 순간 박자 */
 if(typeof doAttack==='function'){const f=doAttack;doAttack=function(){try{if((mode==='tower'||mode==='sec127'||mode==='dg129')&&window.TW71&&TW71.beatGood&&TW71.beatGood()===2)ev('perfect',1)}catch(e){}return f.apply(this,arguments)}}
 /* 광장 */
 if(window.PLZ111&&PLZ111.enter){const f=PLZ111.enter;PLZ111.enter=function(){const r=f.apply(this,arguments);try{ev('plaza',1)}catch(e){}return r}}
 /* 매 프레임: 탑 층 · 보스전 PERFECT · 결투 끝 · 강화 */
 let lastF=null,lastEnh=null,pvEnd=false;
 const enhSum=()=>{let t=0;const walk=v=>{if(typeof v==='number')t+=v;else if(v&&typeof v==='object')for(const k in v)walk(v[k])};try{walk(saveData.enh94)}catch(e){}return t};
 function tick(){try{
  const T=window.TW71&&TW71.T;if(mode==='tower'&&T&&T.f){if(lastF!=null&&T.f===lastF+1)ev('tower',1);lastF=T.f}else if(mode!=='boss')lastF=null;
  if(mode==='boss'&&window.G&&G.shots){for(const s of G.shots){if(s&&!s._dp153){s._dp153=1;if(s.jd==='PERFECT'||s.jd==='FINISH')ev('perfect',1)}}}
  if(window.PVP92&&PVP92.M){const M=PVP92.M,e=M.on&&M.ph==='end';if(e&&!pvEnd)ev('pvp',1);pvEnd=e}
  const es=enhSum();if(lastEnh!=null&&es>lastEnh)ev('enh',es-lastEnh);lastEnh=es}catch(e){}}
 if(typeof frame==='function'){const f=frame;frame=function(){const r=f.apply(this,arguments);tick();return r}}

 /* ── 도트 그림(달력 · 과녁 · 표 · 다이아) — LP146과 같은 방식, PX151이 빛 · 그림자를 입힘 ── */
 const SPR={
  cal:{p:{O:'#2a0a14',R:'#ff5a6a',W:'#f4f0ea',G:'#c8c0b4',K:'#3a3a48'},g:['.O..O..O.','ORRRRRRRO','ORRRRRRRO','OWWWWWWWO','OWKWKWKWO','OWWWWWWWO','OWKWKWGWO','OWWWWWWWO','OOOOOOOOO']},
  target:{p:{R:'#ff4a5a',W:'#ffffff',Y:'#ffd84a',B:'#8a5a2a'},g:['..RRRRR..','.RWWWWWR.','RWRRRRRWR','RWRWWWRWR','RWRWYWRWR','RWRWWWRWR','RWRRRRRWR','.RWWWWWR.','..RRRRR..']},
  ticket:{p:{O:'#3a2200',Y:'#ffc04a',L:'#ffe9a0',D:'#c07a1a',R:'#ff5a6a'},g:['OOOOOOOOOOO','OYYYYDYYYYO','OYRRYDYLLYO','.YRRYDYLLY.','OYYYYDYYYYO','OYLLYDYRRYO','OYYYYDYYYYO','OOOOOOOOOOO']},
  dia153:{p:{B:'#7fe0ff',L:'#e8fbff',D:'#2a8ac0',O:'#0a2a4a'},g:['.OOOOOOO.','OLLBBBBDO','OLBBBBDDO','.OBBBBDO.','..OBBDO..','...OBO...','....O....']},
  gift:{p:{R:'#ff5a8a',D:'#b0305a',Y:'#ffd84a',O:'#3a0a1a'},g:['..Y...Y..','...YYY...','OOOOYOOOO','ORRRYRRRO','ODDDYDDDO','.ORRYRRO.','.ORRYRRO.','.ODDYDDO.','.OOOOOOO.']},
  lock:{p:{G:'#c8d4e0',D:'#6a7888',Y:'#ffc04a',O:'#1a2028'},g:['..OOOOO..','.OG...GO.','.OG...GO.','OOOOOOOOO','OYYYYYYYO','OYYYOYYYO','OYYYOYYYO','OYYYYYYYO','OOOOOOOOO']}};
 for(const k in SPR){try{const s=SPR[k],w=Math.max(...s.g.map(r=>r.length)),h=s.g.length,c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');
  s.g.forEach((r,y)=>{for(let i=0;i<r.length;i++){const col=s.p[r[i]];if(col){x.fillStyle=col;x.fillRect(i,y,1,1)}}});RT.style.setProperty('--sp-'+k,'url("'+c.toDataURL()+'")')}catch(e){}}
 const ic=(k,cls)=>'<i class="px149'+(cls?' '+cls:'')+'" style="--x:var(--sp-'+k+')"></i>';

 /* ── 창 ── */
 const st=document.createElement('style');st.id='dp153css';st.textContent=`
 #dp153{position:fixed;inset:0;z-index:9250;display:flex;align-items:center;justify-content:center;background:#000b;backdrop-filter:blur(3px);color:#eaf6ef;font-family:inherit}
 #dp153[hidden]{display:none}
 #dp153 .pn{position:relative;width:min(560px,calc(100vw - 20px));max-height:calc(100dvh - 20px);display:flex;flex-direction:column;border-radius:20px;overflow:hidden;
  background:radial-gradient(ellipse at 50% 0%,#2a2a5a,transparent 60%),linear-gradient(180deg,#121428,#0a0b16);border:2px solid #9a8cff77;box-shadow:0 0 26px #7a6aff33,0 24px 70px #000d}
 #dp153 .hd{display:flex;align-items:center;gap:10px;padding:12px 14px 8px}
 #dp153 .hd b{font-size:19px;font-weight:900}
 #dp153 .hd small{color:#a8b0d0;font-size:12px}
 #dp153 .hd .sp{flex:1}
 #dp153 .tabs{display:grid;grid-template-columns:repeat(2,1fr);gap:6px;padding:0 12px 8px}
 #dp153 .tabs button{position:relative;height:40px;border-radius:12px;border:1px solid #ffffff22;background:#141830;color:#cfd6f0;font:inherit;font-weight:900;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px}
 #dp153 .tabs button.on{background:linear-gradient(180deg,#b8a8ff,#7a62ee);color:#fff;border-color:#e0d8ff}
 #dp153 .tabs button i.px149{width:18px!important;height:18px!important}
 #dp153 .dt{position:absolute;top:-3px;right:-3px;width:10px;height:10px;border-radius:50%;background:#ff4a5a;box-shadow:0 0 6px #ff4a5a}
 #dp153 .bd{overflow-y:auto;padding:4px 12px 14px;overscroll-behavior:contain;display:flex;flex-direction:column;gap:10px}
 #dp153 h5{margin:4px 2px 0;font-size:13px;color:#b8b0ff;display:flex;align-items:center;gap:6px}
 #dp153 h5 small{margin-left:auto;color:#8a90b0;font-weight:700}
 /* 미션 */
 #dp153 .ms{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 10px;align-items:center;padding:9px 11px;border-radius:13px;background:#141830;border:1px solid #ffffff14}
 #dp153 .ms b{font-size:13.5px}
 #dp153 .ms .rw{font-size:11px;color:#c8c0ff;display:flex;gap:8px;align-items:center}
 #dp153 .ms .rw i.px149{width:12px!important;height:12px!important}
 #dp153 .ms .pb{grid-column:1;height:6px;border-radius:4px;background:#ffffff14;overflow:hidden}
 #dp153 .ms .pb u{display:block;height:100%;background:linear-gradient(90deg,#7a62ee,#7fe0ff)}
 #dp153 .ms .ct{grid-column:1;font-size:10.5px;color:#8a90b0}
 #dp153 .ms button{grid-column:2;grid-row:1/4;min-width:70px;height:36px;border-radius:11px;border:0;font:inherit;font-weight:900;font-size:13px;cursor:pointer;background:#2a2e48;color:#8a90b0}
 #dp153 .ms button.ok{background:linear-gradient(180deg,#ffe07a,#f0a82e);color:#3a2200;box-shadow:0 0 10px #ffc04a66}
 #dp153 .ms.done{opacity:.55}
 #dp153 .bx{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:14px;background:linear-gradient(90deg,#3a1a3a,#141830);border:1px solid #ff8ab066}
 #dp153 .bx>i.px149{width:30px!important;height:30px!important}
 #dp153 .bx small i.px149{width:12px!important;height:12px!important}
 #dp153 .bx div{flex:1;font-size:12.5px}
 #dp153 .bx div small{display:block;color:#c8a0c0;font-size:11px}
 #dp153 .bx button{height:36px;padding:0 14px;border-radius:11px;border:0;font:inherit;font-weight:900;cursor:pointer;background:#2a2e48;color:#8a90b0}
 #dp153 .bx button.ok{background:linear-gradient(180deg,#ff9ac0,#e0407a);color:#fff;box-shadow:0 0 10px #ff4a8a66}
 /* 패스 */
 #dp153 .pt{display:flex;align-items:center;gap:12px;padding:12px;border-radius:14px;background:linear-gradient(135deg,#2a2060,#121428);border:1px solid #b8a8ff55}
 #dp153 .pt .lv{width:58px;height:58px;border-radius:14px;display:grid;place-items:center;background:linear-gradient(180deg,#d8c8ff,#7a62ee);color:#1a0a3a;font-weight:900;font-size:22px;line-height:1;text-align:center}
 #dp153 .pt .lv small{display:block;font-size:9px}
 #dp153 .pt .tx{flex:1;min-width:0;font-size:12px;color:#c8c0ff}
 #dp153 .pt .tx b{display:block;font-size:15px;color:#fff}
 #dp153 .pt .pb{height:8px;border-radius:5px;background:#ffffff18;overflow:hidden;margin:6px 0 3px}
 #dp153 .pt .pb u{display:block;height:100%;background:linear-gradient(90deg,#7fe0ff,#d8c8ff)}
 #dp153 .pm{display:flex;flex-direction:column;gap:6px;padding:10px 12px;border-radius:14px;background:linear-gradient(135deg,#4a3410,#1a1408);border:1px solid #ffc04a77}
 #dp153 .pm b{color:#ffe2a0}
 #dp153 .pm small{color:#d8c090;font-size:11.5px}
 #dp153 .pm .bb{display:flex;gap:8px}
 #dp153 .pm .bb button{flex:1;height:42px;border-radius:12px;border:0;font:inherit;font-weight:900;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px}
 #dp153 .pm .bb .d{background:linear-gradient(180deg,#a8ecff,#3fb6f0);color:#06243a}
 #dp153 .pm .bb .w{background:linear-gradient(180deg,#ffe07a,#f0a82e);color:#3a2200}
 #dp153 .pm.own{background:linear-gradient(135deg,#1a4a2a,#0c1a10);border-color:#7dffa877}
 #dp153 .pr{display:grid;grid-template-columns:44px 1fr 1fr;gap:6px;align-items:stretch}
 #dp153 .pr.hd2{font-size:11px;color:#8a90b0;font-weight:800;text-align:center}
 #dp153 .pr .n{display:grid;place-items:center;border-radius:10px;background:#141830;font-weight:900;font-size:13px;color:#8a90b0}
 #dp153 .pr.reach .n{background:linear-gradient(180deg,#b8a8ff,#7a62ee);color:#fff}
 #dp153 .pr .c{position:relative;min-height:42px;border-radius:11px;border:1px solid #ffffff18;background:#141830;color:#cfd6f0;font:inherit;font-weight:900;font-size:13px;display:flex;align-items:center;justify-content:center;gap:5px;cursor:default}
 #dp153 .pr .c.p{background:#1e1808;border-color:#ffc04a44}
 #dp153 .pr .c.ok{cursor:pointer;border:2px solid #ffd84a;box-shadow:0 0 10px #ffd84a66;color:#fff}
 #dp153 .pr .c.got{opacity:.4}
 #dp153 .pr .c.got::after{content:'✓';position:absolute;right:7px;color:#7dffa8}
 #dp153 .pr .c.lk::after{content:'';position:absolute;right:6px;top:6px;width:12px;height:12px;background:var(--sp-lock) center/contain no-repeat;image-rendering:pixelated}
 #dp153 .pr .c i.px149{width:14px!important;height:14px!important}
 #dp153 .all{height:40px;border-radius:12px;border:0;font:inherit;font-weight:900;cursor:pointer;background:linear-gradient(180deg,#ffe07a,#f0a82e);color:#3a2200}
 #dp153 .msg{min-height:16px;text-align:center;font-size:12px;color:#ffd0a0}
 html.lpL #dp153 .pn{width:min(860px,calc(100vw - 24px));max-height:calc(100dvh - 12px)}
 html.lpL #dp153 .hd{padding:8px 14px 4px}
 html.lpL #dp153 .tabs button{height:32px;font-size:13px}
 html.lpL #dp153 .hd small{display:none}
 @media (min-width:760px){#dp153 .pn{width:min(860px,calc(100vw - 24px))}#dp153 .ms-cols{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:start}}
 html.lpL #dp153 .ms-cols{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:start}
 /* 입구 */
 #dpBtn153{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 11px;border-radius:999px;border:1px solid #b8a8ff88;background:linear-gradient(180deg,#2a2060,#141830);color:#fff;font:inherit;font-weight:900;font-size:12px;cursor:pointer;position:relative}
 #dpBtn153 i.px149{width:16px!important;height:16px!important}
 #dpBtn153 .dt,.ms153 .dt{position:absolute;top:-3px;right:-3px;width:9px;height:9px;border-radius:50%;background:#ff4a5a;box-shadow:0 0 6px #ff4a5a}
 html.lp #dpBtn153,html.lp #gameMenu .gmHud>#dpBtn153.dpBtn153{display:none!important}
 .ms153{display:none}
 html.lp #gameMenu #gmMain.lvFull #lp146 .ms153{display:grid;grid-template-columns:repeat(2,1fr);gap:6px;pointer-events:auto}
 .ms153 button{white-space:nowrap;min-width:0;padding:0 4px;position:relative;height:34px;border-radius:11px;border:1.5px solid color-mix(in srgb,var(--c) 65%,transparent);background:linear-gradient(160deg,color-mix(in srgb,var(--c) 22%,#0c1219),#080c12);color:#fff;font:inherit;font-weight:900;font-size:12px;display:flex;align-items:center;justify-content:center;gap:5px;cursor:pointer}
 .ms153 button i.px149{width:16px!important;height:16px!important}
 .ms153 button small{font-size:10px;color:color-mix(in srgb,var(--c) 70%,#fff)}
 html.lpL #lp146{grid-template-rows:auto minmax(0,1fr) auto auto!important}
 html.lpL #lp146 .ms153{grid-column:3;grid-row:1;gap:4px!important}
 html.lpL #lp146 .ms153 button{height:30px;font-size:11px;gap:3px}
 html.lpL #lp146 .ms153 button i.px149{width:13px!important;height:13px!important}
 html.lpL #lp146 .ms153 button small{display:none}
 html.lpL #lp146 .rk{grid-row:2!important;position:relative}
 html.lpL #lp146 .pl{grid-row:3!important}
 html.lpL #lp146 .bt{grid-row:4!important}
 html.lpL #lp146 .gd{grid-row:1/5!important}
 #att153{position:fixed;inset:0;z-index:9300;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse at 50% 50%,#1a1030cc,#000d 70%);backdrop-filter:blur(3px);animation:at153f .3s ease-out}
 #att153[hidden]{display:none}
 @keyframes at153f{from{opacity:0}}
 @keyframes at153p{0%{opacity:0;transform:translateY(18px) scale(.94)}60%{transform:translateY(-3px) scale(1.01)}100%{opacity:1;transform:none}}
 @keyframes at153r{to{transform:rotate(360deg)}}
 @keyframes at153b{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
 @keyframes at153s{0%{opacity:0;transform:scale(2.6) rotate(-28deg)}55%{opacity:1;transform:scale(.88) rotate(-14deg)}75%{transform:scale(1.06) rotate(-16deg)}100%{opacity:1;transform:scale(1) rotate(-15deg)}}
 @keyframes at153t{0%{opacity:0;transform:scale(.4)}60%{opacity:1;transform:scale(1.12)}100%{transform:scale(1)}}
 @keyframes at153k{0%{opacity:0;transform:translateY(0) scale(.4)}20%{opacity:1}100%{opacity:0;transform:translateY(-70px) scale(1)}}
 @keyframes at153g{0%,100%{opacity:.55}50%{opacity:1}}
 #att153 .pn{position:relative;width:min(780px,calc(100vw - 24px));padding:16px;border-radius:24px;animation:at153p .45s cubic-bezier(.2,.9,.3,1.2) both;
  background:radial-gradient(ellipse at 80% 0%,#3a2a6a55,transparent 60%),linear-gradient(180deg,#171c34,#0b0d1a);
  border:2px solid transparent;background-clip:padding-box;box-shadow:0 0 0 2px #ffd84a,0 0 0 5px #1a1206,0 0 0 6px #ffd84a55,0 0 40px #ffc04a44,0 30px 80px #000e}
 #att153 .pn::before,#att153 .pn::after{content:'';position:absolute;width:18px;height:18px;border:3px solid #ffd84a;filter:drop-shadow(0 0 4px #ffb84a)}
 #att153 .pn::before{top:-7px;left:-7px;border-right:0;border-bottom:0;border-radius:6px 0 0 0}
 #att153 .pn::after{bottom:-7px;right:-7px;border-left:0;border-top:0;border-radius:0 0 6px 0}
 #att153 .in{display:grid;grid-template-columns:1fr 1.05fr;gap:14px}
 #att153 .gd{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-content:stretch}
 #att153 .c{position:relative;min-height:104px;border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;color:#cfd6f0;overflow:hidden;
  background:linear-gradient(180deg,#1b2140,#11152a);border:1.5px solid #ffffff1f;box-shadow:inset 0 1px 0 #ffffff14,0 4px 12px #0006;animation:at153t .4s both}
 #att153 .c:nth-child(2){animation-delay:.06s}#att153 .c:nth-child(3){animation-delay:.12s}#att153 .c:nth-child(4){animation-delay:.18s}
 #att153 .c .dy{position:absolute;top:0;left:0;right:0;padding:4px 0 3px;font-size:10.5px;font-weight:900;letter-spacing:.04em;color:#a8b0d0;background:#ffffff0a;border-bottom:1px solid #ffffff12;text-align:center}
 #att153 .c b{font-size:18px;font-weight:900;margin-top:10px;text-shadow:0 2px 0 #000}
 #att153 .c i.px149.big{width:34px!important;height:34px!important;margin-top:16px!important;filter:drop-shadow(0 3px 0 #0008)}
 #att153 .c.dia b{color:#9fe8ff}
 #att153 .c.bonus{background:linear-gradient(180deg,#123a52,#0c1830);border-color:#7fe0ffaa;box-shadow:inset 0 0 18px #3fd3ff33,0 0 12px #3fd3ff33}
 #att153 .c.bonus .rb{position:absolute;top:22px;right:-26px;transform:rotate(38deg);background:linear-gradient(90deg,#ff5a8a,#ffb84a);color:#fff;font-size:9px;font-weight:900;padding:2px 28px;box-shadow:0 2px 6px #0008}
 #att153 .c.got{filter:saturate(.35) brightness(.7)}
 #att153 .c.got::after{content:'✓';position:absolute;inset:0;display:grid;place-items:center;font-size:40px;font-weight:900;color:#7dffa8;text-shadow:0 0 10px #000,0 0 2px #000}
 #att153 .c.now{border:2px solid #ffd84a;background:radial-gradient(ellipse at 50% 70%,#6a4a10,transparent 75%),linear-gradient(180deg,#3a2c08,#1a1206);box-shadow:0 0 18px #ffd84a77,inset 0 0 14px #ffd84a33;color:#fff}
 #att153 .c.now .dy{background:linear-gradient(90deg,#ffd84a,#ffb02e);color:#3a2200;border-bottom:0}
 #att153 .c .stp{position:absolute;right:6px;bottom:6px;width:54px;height:54px;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:900;color:#ff4a5a;letter-spacing:.02em;
  border:3px solid #ff4a5a;box-shadow:inset 0 0 0 2px #1a1206,inset 0 0 0 4px #ff4a5a88;background:#ff4a5a14;text-shadow:0 0 1px #ff4a5a;animation:at153s .55s .5s cubic-bezier(.3,1.6,.5,1) both}
 #att153 .c.nx{opacity:.92}
 #att153 .mn{position:relative;border-radius:20px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:16px 12px 14px;isolation:isolate;
  background:radial-gradient(ellipse at 50% 40%,#7a5414,#2a1a06 65%,#140c04);border:2px solid #ffd84a;box-shadow:inset 0 0 30px #ffb84a44}
 #att153 .mn .pl{position:absolute;left:-6%;right:-6%;bottom:-4px;height:58%;z-index:-1;background:var(--pile) center bottom/contain no-repeat;image-rendering:pixelated;filter:drop-shadow(0 -4px 14px #ffb84a55);opacity:.95}
 #att153 .mn .pl2{position:absolute;left:-20%;bottom:-8px;width:46%;height:30%;z-index:-1;background:var(--pile) left bottom/contain no-repeat;image-rendering:pixelated;opacity:.55;transform:scaleX(-1)}
 #att153 .mn .pl3{position:absolute;right:-18%;bottom:-8px;width:44%;height:28%;z-index:-1;background:var(--pile) right bottom/contain no-repeat;image-rendering:pixelated;opacity:.55}
 #att153 .mn>*:not(.pl):not(.pl2):not(.pl3):not(.ry):not(.sk):not(.ch){position:relative}
 #att153 .rw,#att153 .xp,#att153 .ok{z-index:1}
 #att153 .rw{background:#1a0e04cc;padding:2px 14px;border-radius:999px;border:1px solid #ffd84a66}
 #att153 .c::before{content:'';position:absolute;left:0;right:0;bottom:-2px;height:58%;background:var(--pile) center bottom/contain no-repeat;image-rendering:pixelated;opacity:.32;pointer-events:none}
 #att153 .c.now::before{opacity:.55}
 /* 금화 칸: 금고 그림이 주인공(작은 동전 아이콘 대신) */
 #att153 .c:not(.dia)::before{left:8%;right:8%;top:24px;bottom:26px;height:auto;opacity:.95;background-position:center}
 #att153 .c.nx:not(.dia)::before{opacity:.75}
 #att153 .c:not(.dia) i.px149.big{display:none!important}
 #att153 .c:not(.dia) b{position:absolute;bottom:4px;margin:0;padding:0 10px;border-radius:999px;background:#140c04d8;border:1px solid #ffd84a55;font-size:15px}
 #att153 .c.dia::before{left:8%;right:8%;top:24px;bottom:26px;height:auto;opacity:.95;background-position:center}
 #att153 .c.nx.dia::before{opacity:.75}
 #att153 .c.dia i.px149.big{display:none!important}
 #att153 .mn .ch{position:absolute;left:50%;bottom:4px;width:78%;height:56%;transform:translateX(-50%);z-index:-1;background:var(--chest-dia) center bottom/contain no-repeat;image-rendering:pixelated;filter:drop-shadow(0 0 12px #7fe0ff66)}
 #att153 .mn .pl{opacity:.55}
 #att153 .mn .hw{display:none}
 #att153 .mn .rw{margin-top:auto}
 #att153 .mn{justify-content:flex-start!important}
 #att153 .mn .rw{position:absolute!important;bottom:10px;left:50%;transform:translateX(-50%)}
 #att153 .mn .pp{position:absolute!important;top:8px;right:10px;margin:0}
 html.lpP #att153 .mn{min-height:250px}
 #att153 .c.dia b{position:absolute;bottom:4px;margin:0;padding:0 10px;border-radius:999px;background:#04141ed8;border:1px solid #7fe0ff55;font-size:15px}
 #att153 .c>*{position:relative}
 #att153 .c .stp{position:absolute}
/* (모서리 더미 제거) */ #att153 .pn{background-image:radial-gradient(ellipse at 80% 0%,#3a2a6a55,transparent 60%),linear-gradient(180deg,#171c34,#0b0d1a)!important;
  background-size:auto,auto!important;background-position:0 0,0 0!important;background-repeat:no-repeat!important}
 #att153 .mn .ry{position:absolute;left:50%;top:44%;width:260%;aspect-ratio:1;margin:-130% 0 0 -130%;z-index:-1;opacity:.5;animation:at153r 14s linear infinite;
  background:repeating-conic-gradient(from 0deg,#ffd84a33 0 10deg,transparent 10deg 24deg);-webkit-mask:radial-gradient(circle,#000 18%,transparent 60%);mask:radial-gradient(circle,#000 18%,transparent 60%)}
 #att153 .mn .sk{position:absolute;width:6px;height:6px;border-radius:1px;background:#fff6c8;box-shadow:0 0 6px #ffd84a;z-index:-1;animation:at153k 2.4s linear infinite}
 #att153 .rib{font-size:11px;font-weight:900;letter-spacing:.18em;color:#3a2200;background:linear-gradient(90deg,#ffd84a,#fff2b0,#ffd84a);padding:3px 16px;border-radius:999px;box-shadow:0 2px 0 #8a5a10}
 #att153 .tt{font-size:52px;font-weight:900;line-height:1.05;letter-spacing:.04em;margin-top:2px;animation:at153t .5s .15s both;color:#fff3c0;
  text-shadow:2px 2px 0 #5a3200,-2px 2px 0 #5a3200,2px -2px 0 #5a3200,-2px -2px 0 #5a3200,0 5px 0 #2a1200,0 0 18px #ffb84a,0 0 34px #ff8a2a88}
 #att153 .dd{font-size:13px;color:#ffe2a0;font-weight:800}
 #att153 .hw{position:relative;margin:6px 0 2px;display:grid;place-items:center}
 #att153 .hw::before{content:'';position:absolute;width:90px;height:90px;border-radius:50%;background:radial-gradient(circle,#ffe9a088,transparent 65%);animation:at153g 1.6s ease-in-out infinite}
 #att153 i.px149.hico{width:70px!important;height:70px!important;animation:at153b 1.4s ease-in-out infinite;filter:drop-shadow(0 6px 0 #0008)}
 #att153 .rw{font-size:26px;font-weight:900;color:#fff;text-shadow:0 2px 0 #000,0 0 10px #ffb84a88;display:flex;align-items:center;gap:6px}
 #att153 .rw i.px149{width:22px!important;height:22px!important}
 #att153 .xp{font-size:11.5px;color:#e8dcff;font-weight:900;padding:3px 10px;border-radius:999px;background:#7a62ee55;border:1px solid #b8a8ff88}
 #att153 .ok{margin-top:8px;height:40px;padding:0 34px;border-radius:12px;border:2px solid #fff6c8;background:linear-gradient(180deg,#ffe58a,#f0a82e);color:#3a2200;font:inherit;font-size:16px;font-weight:900;box-shadow:0 4px 0 #8a5a10,0 0 14px #ffc04a66;cursor:pointer}
 #att153 .ok:active{transform:translateY(3px);box-shadow:0 1px 0 #8a5a10}
 #att153 .bar{margin-top:12px;display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:14px;background:#0a0d1a;border:1px solid #ffffff14}
 #att153 .bar small{font-size:11px;color:#a8b0d0;font-weight:800;white-space:nowrap}
 #att153 .bar small b{color:#9fe8ff}
 #att153 .dots{flex:1;display:grid;grid-template-columns:repeat(28,1fr);gap:2px}
 #att153 .dots i{height:8px;border-radius:2px;background:#ffffff14}
 #att153 .dots i.on{background:linear-gradient(180deg,#ffe58a,#f0a82e)}
 #att153 .dots i.big{background:#3fd3ff44;box-shadow:0 0 0 1px #7fe0ff66}
 #att153 .dots i.big.on{background:linear-gradient(180deg,#a8ecff,#3fb6f0)}
 #att153 .dots i.me{box-shadow:0 0 0 1.5px #fff,0 0 6px #ffd84a}
 #att153 .pp{display:flex;gap:4px;margin-top:6px;position:relative;z-index:1}
 #att153 .pp i{width:16px;height:6px;border-radius:2px;background:#ffffff22;box-shadow:inset 0 0 0 1px #0006}
 #att153 .pp i.on{background:linear-gradient(180deg,#ffe58a,#f0a82e)}
 #att153 .pp i.gb{width:22px;background:#3fd3ff44;box-shadow:0 0 0 1px #7fe0ff}
 #att153 .pp i.gb.on{background:linear-gradient(180deg,#a8ecff,#3fb6f0);box-shadow:0 0 8px #7fe0ff}
 #att153 .mn{background:radial-gradient(ellipse at 50% 35%,#1a5a7a,#0a2a40 60%,#061420)!important;border-color:#7fe0ff!important;box-shadow:inset 0 0 30px #3fd3ff44,0 0 18px #3fd3ff33!important}
 #att153 .mn .ry{background:repeating-conic-gradient(from 0deg,#a8ecff2a 0 10deg,transparent 10deg 24deg)!important}
 #att153 .mn .sk{background:#e8fbff!important;box-shadow:0 0 6px #7fe0ff!important}
 #att153 .mn .rib{background:linear-gradient(90deg,#7fe0ff,#e8fbff,#7fe0ff);color:#06243a;box-shadow:0 2px 0 #1a5a8a}
 #att153 .mn .tt{color:#e8fbff!important;text-shadow:2px 2px 0 #0a3a5a,-2px 2px 0 #0a3a5a,2px -2px 0 #0a3a5a,-2px -2px 0 #0a3a5a,0 5px 0 #021420,0 0 18px #3fd3ff,0 0 34px #3f8aff88!important}
 #att153 .mn .dd{color:#bfefff}
 #att153 .mn .hw::before{background:radial-gradient(circle,#a8ecff88,transparent 65%)}
 #att153 .mn .rw{border-color:#7fe0ff66;background:#04141ecc}
 #att153 .mn.hit{border-color:#ffd84a!important;box-shadow:inset 0 0 30px #ffd84a55,0 0 24px #ffd84a66!important}
 #att153 .bar .ok{margin:0 0 0 4px;height:34px;padding:0 22px;flex:none}
 #att153 .bar small{white-space:nowrap}
 html.lpP #att153 .bar .dots{display:none}html.lpP #att153 .bar small{flex:1;white-space:normal}
 html.lpL #att153 .pp{display:none}
 html.lpP #att153 .in{grid-template-columns:1fr}
 html.lpP #att153 .mn{order:-1}
 html.lpP #att153 .c{min-height:92px}
 html.lpL #att153 .pn{padding:10px 12px;max-height:calc(100dvh - 12px)}
 html.lpL #att153 .c{min-height:0;height:min(130px,calc((100dvh - 150px)/2))}
 html.lpL #att153 .mn{padding:8px 10px}
 html.lpL #att153 .dd{display:none}
 html.lpL #att153 .c i.px149.big{width:26px!important;height:26px!important}
 html.lpL #att153 .tt{font-size:38px}
 html.lpL #att153 i.px149.hico{width:46px!important;height:46px!important}
 html.lpL #att153 .hw::before{width:64px;height:64px}
 html.lpL #att153 .rw{font-size:21px}
 html.lpL #att153 .ok{height:32px;margin-top:4px}
 html.lpL #att153 .bar{margin-top:8px;padding:5px 10px}

 @keyframes dp153h{0%,100%{filter:brightness(1)}50%{filter:brightness(1.25)}}
 /* ── v153 다듬기: 미션 = 퀘스트 보드(청록) · 패스 = 왕실(보라 · 금) ── */
 #dp153[data-tab=mis] .pn{background:radial-gradient(ellipse at 50% -10%,#0f4a4a,transparent 60%),repeating-linear-gradient(0deg,#ffffff05 0 1px,transparent 1px 18px),linear-gradient(180deg,#0c1a1e,#070e12);border-color:#5ef0d088;box-shadow:0 0 26px #3fd3b033,0 24px 70px #000d}
 #dp153[data-tab=pass] .pn{background:radial-gradient(ellipse at 50% -10%,#4a2a7a,transparent 60%),linear-gradient(180deg,#160e28,#0a0614);border-color:#ffd84a88;box-shadow:0 0 26px #b88cff33,0 24px 70px #000d}
 #dp153 .tabs button{height:44px;border-radius:14px 14px 4px 4px}
 #dp153[data-tab=mis] .tabs button.on{background:linear-gradient(180deg,#7ff0d8,#2ab89a);color:#04241c;border-color:#c8fff0}
 #dp153[data-tab=pass] .tabs button.on{background:linear-gradient(180deg,#ffe58a,#e0a02a);color:#3a2200;border-color:#fff2b0}
 #dp153 .qsub{display:grid;grid-template-columns:1fr 1fr;gap:4px;padding:3px;border-radius:12px;background:#04100e;border:1px solid #5ef0d033}
 #dp153 .qsub button{height:32px;border:0;border-radius:9px;background:none;color:#8ab8b0;font:inherit;font-weight:900;font-size:13px;cursor:pointer}
 #dp153 .qsub button.on{background:#123a34;color:#c8fff0;box-shadow:inset 0 0 0 1px #5ef0d066}
 #dp153 .qsub small{font-size:11px;opacity:.75;margin-left:4px}
 #dp153 .qcols>.qs:nth-child(2){display:none}
 #dp153 .qcols.sw>.qs:nth-child(1){display:none}#dp153 .qcols.sw>.qs:nth-child(2){display:flex}
 #dp153 .qs{display:flex;flex-direction:column;gap:8px}
 #dp153 .qh{display:flex;align-items:baseline;gap:8px;padding:0 2px}
 #dp153 .qh b{font-size:15px;color:#c8fff0}#dp153 .qh small{margin-left:auto;font-size:11px;color:#6aa8a0}
 #dp153 .qch{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:14px;background:linear-gradient(90deg,#10302c,#0a1a1c);border:1px solid #5ef0d044}
 #dp153 .qtr{flex:1;display:flex;gap:4px}
 #dp153 .qtr i{flex:1;height:10px;border-radius:3px;background:#ffffff12;box-shadow:inset 0 0 0 1px #0006}
 #dp153 .qtr i.on{background:linear-gradient(180deg,#9affe0,#2ab89a);box-shadow:0 0 6px #5ef0d066}
 #dp153 .qbox{display:grid;grid-template-columns:44px auto;grid-template-rows:auto auto;column-gap:6px;align-items:center;padding:4px 10px 4px 4px;border-radius:12px;border:1.5px solid #ffffff22;background:#0a1416;color:#cfe;font:inherit;cursor:pointer;text-align:left}
 #dp153 .qbox .qcimg{grid-row:1/3;width:44px;height:30px;background:var(--chest-dia) center/contain no-repeat;image-rendering:pixelated}
 #dp153 .qbox b{font-size:12.5px}#dp153 .qbox small{font-size:10.5px;color:#9fe8ff}
 #dp153 .qbox small i.px149{width:11px!important;height:11px!important}
 #dp153 .qch.ready .qbox{border-color:#ffd84a;background:linear-gradient(180deg,#3a2c08,#1a1206);color:#fff;box-shadow:0 0 12px #ffd84a66;animation:dp153h 1.2s infinite}
 #dp153 .qch.got{opacity:.6}
 #dp153 .qc{position:relative;display:grid;grid-template-columns:46px minmax(0,1fr) auto;grid-template-rows:auto auto;gap:4px 10px;align-items:center;padding:9px 10px;border-radius:14px;overflow:hidden;
  background:linear-gradient(90deg,color-mix(in srgb,var(--qc) 14%,#0c1618),#0a1214 60%);border:1px solid color-mix(in srgb,var(--qc) 35%,transparent);box-shadow:inset 3px 0 0 var(--qc)}
 #dp153 .qi{grid-row:1/3;width:46px;height:46px;border-radius:12px;display:grid;place-items:center;background:radial-gradient(circle at 50% 40%,color-mix(in srgb,var(--qc) 40%,#0a1214),#06100f);border:1.5px solid color-mix(in srgb,var(--qc) 70%,transparent)}
 #dp153 .qi i.px149{width:28px!important;height:28px!important;filter:drop-shadow(0 2px 0 #0008)}
 #dp153 .qm b{display:block;font-size:13.5px;color:#eafff8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 #dp153 .qb{position:relative;height:14px;margin-top:5px;border-radius:7px;background:#00000066;box-shadow:inset 0 0 0 1px #ffffff14;overflow:hidden}
 #dp153 .qb u{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,color-mix(in srgb,var(--qc) 70%,#000),var(--qc));border-radius:7px}
 #dp153 .qb span{position:relative;display:block;text-align:center;font-size:10px;font-weight:900;line-height:14px;color:#fff;text-shadow:0 1px 0 #000}
 #dp153 .qr{grid-column:2;display:flex;gap:6px;align-items:center}
 #dp153 .qg,#dp153 .qx{font-size:10.5px;font-weight:900;padding:1px 7px;border-radius:999px;display:inline-flex;align-items:center;gap:3px}
 #dp153 .qg{background:#2a1c06;color:#ffd88a;border:1px solid #ffc04a44}#dp153 .qx{background:#1e1440;color:#d8c8ff;border:1px solid #b88cff44}
 #dp153 .qg i.px149{width:11px!important;height:11px!important}
 #dp153 .qbtn{grid-column:3;grid-row:1/3;min-width:66px;height:40px;border-radius:12px;border:1px solid #ffffff1a;background:#0e1c1e;color:#6a8a88;font:inherit;font-size:12.5px;font-weight:900}
 #dp153 .qbtn.ok{border:2px solid #fff2b0;background:linear-gradient(180deg,#ffe58a,#f0a82e);color:#3a2200;box-shadow:0 3px 0 #8a5a10,0 0 12px #ffc04a66;cursor:pointer;animation:dp153h 1.2s infinite}
 #dp153 .qc.ready{border-color:#ffd84a88}
 #dp153 .qc.done{filter:saturate(.4) brightness(.75)}
 #dp153 .qst{position:absolute;right:76px;top:50%;transform:translateY(-50%) rotate(-12deg);font-size:12px;font-weight:900;letter-spacing:.1em;color:#7dffa8;border:2px solid #7dffa8;border-radius:6px;padding:1px 6px;opacity:.8}
 html.lpL #dp153 .qsub{display:none}
 html.lpL #dp153 .qcols{display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:start}
 html.lpL #dp153 .qcols>.qs{display:flex!important}
 @media (min-width:760px){#dp153 .qsub{display:none}#dp153 .qcols{display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:start}#dp153 .qcols>.qs{display:flex!important}}
 /* 패스 */
 #dp153 .ph{display:flex;align-items:center;gap:12px;padding:12px;border-radius:16px;background:radial-gradient(ellipse at 20% 50%,#5a3a9a88,transparent 70%),linear-gradient(135deg,#2a1a50,#140c28);border:1px solid #b88cff66}
 #dp153 .phl{position:relative;width:64px;height:70px;display:flex;flex-direction:column;align-items:center;justify-content:center;flex:none;
  background:linear-gradient(180deg,#ffe58a,#c08a1a);clip-path:polygon(50% 0,100% 14%,100% 62%,50% 100%,0 62%,0 14%);filter:drop-shadow(0 0 8px #ffd84a88)}
 #dp153 .phl::before{content:'';position:absolute;inset:3px;background:linear-gradient(180deg,#4a2a8a,#1a0e3a);clip-path:polygon(50% 0,100% 14%,100% 62%,50% 100%,0 62%,0 14%)}
 #dp153 .phl .shd{position:relative;font-size:26px;font-weight:900;color:#fff3c0;text-shadow:0 2px 0 #000;line-height:1}
 #dp153 .phl small{position:relative;font-size:9px;color:#e0d0ff;font-weight:900}
 #dp153 .phm{flex:1;min-width:0}
 #dp153 .phm b{display:block;font-size:16px;letter-spacing:.08em;color:#fff3c0}
 #dp153 .phm small{display:block;font-size:11px;color:#c8b8f0}
 #dp153 .pxb{position:relative;height:16px;margin-top:6px;border-radius:8px;background:#00000080;box-shadow:inset 0 0 0 1px #ffffff1c;overflow:hidden}
 #dp153 .pxb u{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,#b88cff,#ffd84a)}
 #dp153 .pxb span{position:relative;display:block;text-align:center;font-size:10.5px;font-weight:900;line-height:16px;color:#fff;text-shadow:0 1px 0 #000}
 #dp153 .pp2{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:16px;background:linear-gradient(90deg,#4a3008,#1e1406);border:1.5px solid #ffd84a;box-shadow:inset 0 0 18px #ffd84a22}
 #dp153 .pp2>i.px149{width:30px!important;height:26px!important;flex:none}
 #dp153 .pp2>div:not(.ppb){flex:1;min-width:0}
 #dp153 .pp2 b{display:block;color:#ffe9a0;font-size:14px}#dp153 .pp2 small{display:block;color:#d8c090;font-size:10.5px}
 #dp153 .ppb{display:flex;flex-direction:column;gap:5px;flex:none}
 #dp153 .ppb button{height:30px;padding:0 12px;border-radius:10px;border:0;font:inherit;font-weight:900;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px}
 #dp153 .ppb .d{background:linear-gradient(180deg,#a8ecff,#3fb6f0);color:#06243a}#dp153 .ppb .w{background:linear-gradient(180deg,#ffe07a,#f0a82e);color:#3a2200}
 #dp153 .pp2.own{background:linear-gradient(90deg,#1a4a2a,#0c1a10);border-color:#7dffa8}
 #dp153 .trk{position:relative;display:block}
 #dp153 .tlab{display:none!important}
 #dp153 .pc.p::before{content:'프리미엄';position:absolute;top:4px;left:4px;z-index:1;font-size:8.5px;padding:0 4px;border-radius:4px;background:#ffd84a;color:#3a2200}
 #dp153 .tlab{display:grid;grid-template-rows:84px 34px 84px;font-size:11px;font-weight:900;color:#a8b0d0;writing-mode:vertical-rl;text-orientation:upright;letter-spacing:-.1em}
 #dp153 .tlab span{display:grid;place-items:center;border-radius:8px;background:#ffffff08}
 #dp153 .tlab span.g{color:#ffd84a;background:#ffd84a14}
 #dp153 .tsc{overflow-x:auto;overflow-y:hidden;scrollbar-width:thin;padding-bottom:4px}
 #dp153 .tin{display:grid;grid-auto-flow:column;grid-auto-columns:76px;gap:6px}
 #dp153 .tc{display:grid;grid-template-rows:84px 34px 84px;gap:0}
 #dp153 .pc{position:relative;border-radius:12px;border:1.5px solid #ffffff1c;background:#140e26;color:#e0d8ff;font:inherit;font-weight:900;font-size:12px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:4px 2px 5px;cursor:default;overflow:hidden}
 #dp153 .pc .pimg{position:absolute;left:6%;right:6%;top:6px;bottom:22px;background:var(--pile) center/contain no-repeat;image-rendering:pixelated}
 #dp153 .pc b{position:relative;display:flex;align-items:center;gap:2px;padding:0 6px;border-radius:999px;background:#000a}
 #dp153 .pc b i.px149{width:11px!important;height:11px!important}
 #dp153 .pc.gear.p,#dp153 .pc.gear{border:2px solid #ff9a5a;box-shadow:0 0 14px #ff8a5a99,inset 0 0 18px #ff8a5a55;background:radial-gradient(circle at 30% 50%,#6a3014,#1e0c04 70%)}
 #dp153 .pc.gear.p::before{background:linear-gradient(90deg,#ffd84a,#ff8a5a);content:'특별 보상'}
 html.lpP #dp153 .pc.gear .pimg{flex:0 0 44px!important;height:48px!important}html.lpP #dp153 .pc.gear b.gn{font-size:11.5px!important;padding:1px 5px!important;white-space:nowrap}html.lpP #dp153 .pc.gear .gt .plb{font-size:8.5px!important}
 html.lpL #dp153 .pc.gear .gt .plb{display:none!important}html.lpL #dp153 .pc.gear b.gn{font-size:9px;padding:0 3px;white-space:nowrap;max-width:100%;overflow:hidden}html.lpL #dp153 .pc.gear .pimg{top:13px;bottom:27px;left:0;right:0}html.lpL #dp153 .pc.gear.p::before{font-size:7.5px;top:2px}html.lpL #dp153 .pc.gear .gd{font-size:8px}
 #dp153 .pc.gear .pimg{background-position:center;background-size:contain;background-repeat:no-repeat;image-rendering:pixelated;animation:dp161 1.6s ease-in-out infinite}
 @keyframes dp161{50%{transform:translateY(-2px);filter:drop-shadow(0 0 6px #ffb07a)}}
 #dp153 .pc.gear .gt{position:relative;display:flex;flex-direction:column;align-items:center;gap:1px;line-height:1.15}
 #dp153 .pc.gear .gt .plb{display:block!important;position:static!important;font-size:9.5px!important;color:#ffc89a!important;letter-spacing:.3px;white-space:nowrap}#dp153 .pc.gear b.gn{font-size:12px;color:#fff;background:#000a;text-shadow:0 0 6px #ff8a5a}
 #dp153 .pc.gear .gd{display:flex;align-items:center;gap:1px;font-size:9.5px;color:#9fe8ff}#dp153 .pc.gear .gd i.px149{width:10px!important;height:10px!important}
 html.lpP #dp153 .pc.gear,html:not(.lp) #dp153 .pc.gear{min-height:78px}html.lpP #dp153 .pc.gear .pimg,html:not(.lp) #dp153 .pc.gear .pimg{flex:0 0 70px;height:66px}
 html.lpP #dp153 .pc.gear .gt,html:not(.lp) #dp153 .pc.gear .gt{align-items:flex-start}html.lpP #dp153 .pc.gear b.gn,html:not(.lp) #dp153 .pc.gear b.gn{font-size:15px;padding:1px 8px}
 #dp153 .pp2 .gx{color:#ffb07a}
 #dp153 .pc.p{background:linear-gradient(180deg,#2a1e06,#140e04);border-color:#ffc04a66;color:#ffe2a0}
 #dp153 .pc.ok{border:2px solid #ffd84a;box-shadow:0 0 12px #ffd84a77;cursor:pointer;animation:dp153h 1.2s infinite}
 #dp153 .pc.got .pimg,#dp153 .pc.got b{opacity:.35}
 #dp153 .pc.got::after{content:'✓';position:absolute;inset:0;display:grid;place-items:center;font-size:28px;color:#7dffa8;text-shadow:0 0 6px #000}
 #dp153 .pc.lk::after{content:'';position:absolute;top:5px;right:5px;width:14px;height:14px;background:var(--sp-lock) center/contain no-repeat;image-rendering:pixelated}
 #dp153 .pc.lk .pimg{filter:grayscale(.6) brightness(.6)}
 #dp153 .nd{position:relative;display:grid;place-items:center}
 #dp153 .nd .ln{position:absolute;left:-3px;right:-3px;top:50%;height:6px;margin-top:-3px;background:#ffffff14}
 #dp153 .tc.reach .nd .ln{background:linear-gradient(90deg,#b88cff,#ffd84a)}
 #dp153 .nd span{position:relative;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-size:12px;font-weight:900;background:#1a1430;border:2px solid #4a3a7a;color:#8a80b0}
 #dp153 .tc.reach .nd span{background:linear-gradient(180deg,#d8c8ff,#7a62ee);border-color:#fff;color:#fff}
 #dp153 .tc.big .nd span{width:32px;height:32px;border-color:#ffd84a}
 #dp153 .tc.cur .nd span{box-shadow:0 0 0 3px #ffd84a,0 0 14px #ffd84a;animation:at153b 1.4s infinite}
 html.lpL #dp153 .tc{grid-template-rows:64px 30px 64px}
 html.lpL #dp153 .tlab{grid-template-rows:64px 30px 64px}
 html.lpL #dp153 .tin{grid-auto-columns:68px}
 html.lpL #dp153 .ph{padding:6px 10px}html.lpL #dp153 .phl{width:48px;height:52px}html.lpL #dp153 .phl .shd{font-size:20px}
 html.lpL #dp153 .pp2{padding:6px 10px}html.lpL #dp153 .ppb{flex-direction:column}
 html.lpL #dp153[data-tab=pass] .bd{display:grid!important;grid-template-columns:1fr 1fr;gap:8px}
 html.lpL #dp153[data-tab=pass] .bd>.all,html.lpL #dp153[data-tab=pass] .bd>.trk,html.lpL #dp153[data-tab=pass] .bd>.msg{grid-column:1/-1}
 html.lpL #dp153[data-tab=pass] .all{height:36px;font-size:14px}
 html.lpL #dp153 .pp2 small{display:none}

 /* ── v153 3차: 사용자 그림대로 ── */
 #dp153 .hd{flex-wrap:wrap;row-gap:8px}
 #dp153 .hd .ttl{display:flex;flex-direction:column;min-width:0}
 #dp153 .hd .ttl small{font-size:11px}
 #dp153 .hd .tabs{flex:1 1 100%;padding:0;order:5}
 html.lpL #dp153 .hd{flex-wrap:nowrap}
 html.lpL #dp153 .hd .ttl small{display:none}
 html.lpL #dp153 .hd .tabs{flex:0 0 300px;order:0;margin-left:14px}
 html.lpL #dp153 .hd .tabs button{height:34px;border-radius:12px}
 #dp153 .more{text-align:center;font-size:11px;color:#a898d0;padding:4px 0}
 #dp153[data-tab=mis] .more{display:none}
 /* 미션 가로: 왼쪽 옆칸(일일/주간 · 상자) + 오른쪽 목록 */
 html.lpL #dp153[data-tab=mis] .bd{display:grid!important;grid-template-columns:220px minmax(0,1fr);grid-auto-rows:min-content;column-gap:12px;row-gap:7px;align-items:start}
 html.lpL #dp153 .bd .qsub{display:grid!important;grid-column:1;grid-row:1/span 2;grid-template-columns:1fr;gap:6px;background:none;border:0;padding:0}
 html.lpL #dp153 .bd .qsub button{height:36px;border:1px solid #5ef0d044;background:#0a1a1c}
 html.lpL #dp153 .bd .qsub button.on{background:linear-gradient(180deg,#7ff0d8,#2ab89a);color:#04241c}
 html.lpL #dp153[data-tab=mis] .qcols{display:contents!important}
 html.lpL #dp153 .qcols:not(.sw)>.qs:nth-child(1),html.lpL #dp153 .qcols.sw>.qs:nth-child(2){display:contents!important}
 html.lpL #dp153 .qcols.sw>.qs:nth-child(1),html.lpL #dp153 .qcols:not(.sw)>.qs:nth-child(2){display:none!important}
 html.lpL #dp153 .qs>.qh{grid-column:1;grid-row:3;flex-direction:column;align-items:flex-start;gap:0}
 html.lpL #dp153 .qs>.qh small{margin-left:0;color:#5ef0d0}
 html.lpL #dp153 .qs>.qch{grid-column:1;grid-row:4/span 2;flex-direction:column-reverse;align-items:stretch}
 html.lpL #dp153 .qs>.qch .qbox{grid-template-columns:52px auto}
 html.lpL #dp153 .qs>.qch .qcimg{width:52px;height:36px}
 html.lpL #dp153 .qs>.qc{grid-column:2;grid-template-columns:40px minmax(0,1fr) auto auto;grid-template-rows:auto auto;padding:6px 10px}
 html.lpL #dp153 .qs>.qc .qi{width:40px;height:40px}
 html.lpL #dp153 .qs>.qc .qr{grid-column:3;grid-row:1/3}
 html.lpL #dp153 .qs>.qc .qbtn{grid-column:4;height:36px}
 html.lpL #dp153 .qs>.qc .qst{right:92px}
 html.lpL #dp153[data-tab=mis] .msg{grid-column:1/-1}
 /* 패스 세로: 아래로 내려가는 길(왼쪽 무료 · 가운데 단계 · 오른쪽 프리미엄) */
 html.lpP #dp153 .tlab,html:not(.lp) #dp153 .tlab{display:grid!important;grid-template-columns:1fr 44px 1fr;grid-template-rows:auto;writing-mode:horizontal-tb;gap:6px;margin-bottom:6px;font-size:13px;letter-spacing:0}
 html.lpP #dp153 .tlab span,html:not(.lp) #dp153 .tlab span{height:34px;display:flex;align-items:center;justify-content:center;gap:5px;border-radius:10px;background:#141c34;border:1px solid #5ec8ff55;color:#bfefff}
 html.lpP #dp153 .tlab span:nth-child(2),html:not(.lp) #dp153 .tlab span:nth-child(2){visibility:hidden}
 html.lpP #dp153 .tlab span.g,html:not(.lp) #dp153 .tlab span.g{background:#2a1e06;border-color:#ffd84a88;color:#ffe2a0}
 html.lpP #dp153 .tlab i.px149,html:not(.lp) #dp153 .tlab i.px149{width:16px!important;height:16px!important}
 html.lpP #dp153 .tsc,html:not(.lp) #dp153 .tsc{overflow:visible;padding:0}
 html.lpP #dp153 .tin,html:not(.lp) #dp153 .tin{grid-auto-flow:row;grid-auto-columns:auto;grid-template-columns:1fr;gap:8px}
 html.lpP #dp153 .tc,html:not(.lp) #dp153 .tc{grid-template-rows:auto;grid-template-columns:1fr 44px 1fr;gap:6px;min-height:64px}
 html.lpP #dp153 .pc,html:not(.lp) #dp153 .pc{flex-direction:row;justify-content:flex-start;align-items:center;gap:6px;padding:6px 8px;min-height:64px;text-align:left}
 html.lpP #dp153 .pc .pimg,html:not(.lp) #dp153 .pc .pimg{position:relative;inset:auto;flex:0 0 54px;height:46px}
 html.lpP #dp153 .pc .plb,html:not(.lp) #dp153 .pc .plb{position:absolute;left:68px;top:10px;font-size:10.5px;color:#a8b0d0}
 html.lpP #dp153 .pc b,html:not(.lp) #dp153 .pc b{background:none;padding:12px 0 0;font-size:16px}
 html.lpP #dp153 .pc.p::before,html:not(.lp) #dp153 .pc.p::before{display:none}
 html.lpP #dp153 .nd .ln,html:not(.lp) #dp153 .nd .ln{left:50%;right:auto;top:-8px;bottom:-8px;width:6px;height:auto;margin:0 0 0 -3px}
 html.lpP #dp153 .tc.big .nd span,html:not(.lp) #dp153 .tc.big .nd span{width:34px;height:34px}
 html.lpP #dp153 .tc.cur .nd span,html:not(.lp) #dp153 .tc.cur .nd span{width:40px;height:40px;font-size:16px}
 #dp153 .pc .plb{display:none}
 html.lpP #dp153 .pc .plb,html:not(.lp) #dp153 .pc .plb{display:block}
 /* 패스 가로: 왼쪽 옆칸(단계 방패 · 시즌 · 프리미엄) + 오른쪽(모두 받기 · 가로 길) */
 html.lpL #dp153[data-tab=pass] .bd{grid-template-columns:200px minmax(0,1fr)!important;grid-auto-rows:min-content;align-items:start;column-gap:10px}
 html.lpL #dp153[data-tab=pass] .ph{grid-column:1;grid-row:1;flex-direction:column;text-align:center;gap:4px;padding:8px}
 html.lpL #dp153[data-tab=pass] .ph .phm small{display:none}
 html.lpL #dp153[data-tab=pass] .pp2{grid-column:1;grid-row:2;flex-direction:column;align-items:stretch;text-align:center}
 html.lpL #dp153[data-tab=pass] .pp2>i.px149{align-self:center}
 html.lpL #dp153[data-tab=pass] .ppb{flex-direction:column!important}
 html.lpL #dp153[data-tab=pass] .bd>.all{grid-column:2!important;grid-row:1}
 html.lpL #dp153[data-tab=pass] .bd>.trk{grid-column:2!important;grid-row:1/4;margin-top:44px;display:grid;grid-template-columns:62px minmax(0,1fr);gap:6px}
 html.lpL #dp153[data-tab=pass] .bd>.more{display:none}
 html.lpL #dp153 .tlab{display:grid!important;writing-mode:horizontal-tb;grid-template-rows:64px 30px 64px;gap:0;font-size:11px;letter-spacing:0}
 html.lpL #dp153 .tlab span{flex-direction:column;display:flex;align-items:center;justify-content:center;gap:2px;border-radius:10px;background:#141c34;border:1px solid #5ec8ff55;color:#bfefff}
 html.lpL #dp153 .tlab span:nth-child(2){visibility:hidden}
 html.lpL #dp153 .tlab span.g{background:#2a1e06;border-color:#ffd84a88;color:#ffe2a0}
 html.lpL #dp153 .tlab i.px149{width:18px!important;height:18px!important}
 #dpToast153{white-space:nowrap;max-width:94vw;overflow:hidden;text-overflow:ellipsis;position:fixed;left:50%;top:70px;transform:translateX(-50%);z-index:9400;padding:9px 16px;border-radius:999px;background:linear-gradient(180deg,#b8a8ff,#7a62ee);color:#fff;font-weight:900;font-size:14px;box-shadow:0 6px 20px #000a;pointer-events:none;transition:opacity .3s}`;
 document.head.appendChild(st);
 const box=document.createElement('div');box.id='dp153';box.hidden=true;document.body.appendChild(box);
 box.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===box)close()});box.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Escape')close()});
 let tab='mis',SUB='d',msg='',lastH='';
 function open(t){if(t)tab=t;msg='';box.hidden=false;lastH='';draw._vs=0;draw._sl=null;draw()}
 function close(){box.hidden=true;dot()}
 function toast(t){let el=$('dpToast153');if(!el){el=document.createElement('div');el.id='dpToast153';document.body.appendChild(el)}el.textContent=t;el.style.opacity=1;clearTimeout(toast._t);toast._t=setTimeout(()=>el.style.opacity=0,1800)}
 const sfx=k=>{try{gmSfx(k)}catch(e){}};
 /* 받을 것이 있나 */
 const attReady=()=>S().att.last!==today();
 function misReady(){const o=S();const D=o.day,W=o.wk;
  if(dailyList().some(m=>!D.got[m[0]]&&prog(D,m[0])>=m[2]))return true;if(!D.box&&dailyList().every(m=>D.got[m[0]]))return true;
  if(weekList().some(m=>!W.got[m[0]]&&prog(W,m[0])>=m[2]))return true;if(!W.box&&weekList().every(m=>W.got[m[0]]))return true;return false}
 function passReady(){const o=S(),L=lvOf(o.ps.xp),pm=hasPrem();for(let l=1;l<=L;l++){if(!o.ps.f[l])return true;if(pm&&!o.ps.p[l])return true}return false}
 /* 그리기 */
 function draw(){if(box.hidden)return;const o=S();let body='';
  if(tab==='mis'){const D=o.day,W=o.wk;
   const MI={login:['cal','#ff7a8a'],tower:['tower','#3fd3ff'],kill:['swords','#ffb04a'],perfect:['bolt','#ffe066'],boss:['demon','#ff4a5a'],pvp:['swords','#ff6aa8'],plaza:['crowd','#7dffa8'],enh:['gear','#9fc3dc'],dayall:['target','#b88cff']};
   const card=(m,C,G,sc)=>{const [k,t,n,xp,gold]=m,p=Math.min(n,prog(C,k)),got=G[k],ok=!got&&p>=n,mi=MI[k]||['target','#b88cff'],q=Math.round(p/n*100);
    return '<div class="qc'+(got?' done':ok?' ready':'')+'" style="--qc:'+mi[1]+'"><div class="qi">'+ic(mi[0])+'</div><div class="qm"><b>'+E(txt(t,n))+'</b><div class="qb"><u style="width:'+q+'%"></u><span>'+num(p)+' / '+num(n)+'</span></div></div>'+
     '<div class="qr"><span class="qg">'+ic('coin')+num(gold)+'</span><span class="qx">+'+num(xp)+' XP</span></div>'+
     '<button class="qbtn'+(ok?' ok':'')+'" data-a="'+sc+'" data-k="'+k+'"'+(got||!ok?' disabled':'')+'>'+(got?'완료':ok?'받기':'진행 중')+'</button>'+(got?'<span class="qst">CLEAR</span>':'')+'</div>'};
   const dl=dailyList(),wl=weekList(),dn=dl.filter(m=>D.got[m[0]]).length,wn=wl.filter(m=>W.got[m[0]]).length,dd=new Date(),hr=23-dd.getHours(),wkLeft=7-((dd.getDay()+6)%7);
   const chest=(nDone,nAll,got,act,dia,xp)=>'<div class="qch'+(got?' got':nDone>=nAll?' ready':'')+'"><div class="qtr">'+Array.from({length:nAll},(_,i)=>'<i class="'+(i<nDone?'on':'')+'"></i>').join('')+'</div>'+
     '<button class="qbox" data-a="'+act+'"'+(got||nDone<nAll?' disabled':'')+'><span class="qcimg"></span><b>'+(got?'받았어요':nDone>=nAll?'상자 열기!':nDone+' / '+nAll)+'</b><small>'+ic('dia153')+dia+' · +'+xp+' XP</small></button></div>';
   const col=(ttl,sub,list,C,G,sc,box)=>'<section class="qs"><div class="qh"><b>'+ttl+'</b><small>'+sub+'</small></div>'+box+list.map(m=>card(m,C,G,sc)).join('')+'</section>';
   const showW=SUB==='w';
   body='<div class="qsub"><button data-sub="d" class="'+(showW?'':'on')+'">일일 <small>'+dn+'/'+dl.length+'</small></button><button data-sub="w" class="'+(showW?'on':'')+'">주간 <small>'+wn+'/'+wl.length+'</small></button></div>'+
    '<div class="qcols'+(showW?' sw':'')+'">'+col('일일 미션',hr+'시간 뒤 새 미션',dl,D,D.got,'md',chest(dn,dl.length,D.box,'dbox',10,200))+col('주간 미션',wkLeft+'일 뒤 새 미션',wl,W,W.got,'mw',chest(wn,wl.length,W.box,'wbox',50,500))+'</div><div class="msg">'+E(msg)+'</div>'}
  else{const xp=o.ps.xp,L=lvOf(xp),pm=hasPrem(),inLv=L>=LV?XPL:xp%XPL;
   const rc=(r,cls,act,l,st)=>r.gear?'<button class="pc gear '+cls+' '+st+'" data-a="'+act+'" data-l="'+l+'"><span class="pimg" style="background-image:url('+gearThumb(r.gear)+')"></span><span class="gt"><span class="plb">★ 유물 '+(r.gear[0]==='wp'?'무기':'캐릭터')+'</span><b class="gn">'+E(r.gear[1])+'</b><small class="gd">+'+ic('dia153')+num(r.dia||0)+'</small></span></button>':'<button class="pc '+cls+' '+st+'" data-a="'+act+'" data-l="'+l+'" style="--pile:var(--'+(r.dia?'chest-dia':'pile-coin')+')"><span class="pimg"></span><span class="plb">'+(r.dia?'보석':'골드')+'</span><b>'+(r.dia?ic('dia153'):ic('coin'))+num(r.dia||r.gold)+'</b></button>';
   body='<div class="ph"><div class="phl"><span class="shd">'+L+'</span><small>단계</small></div><div class="phm"><b>SEASON '+E(o.ps.s)+'</b><small>'+daysLeft()+'일 남음 · 미션 · 출석으로 경험치</small><div class="pxb"><u style="width:'+Math.round(inLv/XPL*100)+'%"></u><span>'+(L>=LV?'최고 단계!':num(inLv)+' / '+num(XPL)+' XP')+'</span></div></div></div>'+
    (pm?'<div class="pp2 own">'+ic('crown')+'<b>프리미엄 패스 사용 중</b><small>금색 줄 보상도 모두 받을 수 있어요</small></div>':
     '<div class="pp2">'+ic('crown')+'<div><b>프리미엄 패스</b><small>금색 줄 보상 · 💎 총 '+num(PREM.reduce((a,r)=>a+(r.dia||0),0))+' · <b class="gx">20단계 유물 무기 · 40단계 유물 캐릭터</b> · 지난 단계도 바로 받기</small></div><div class="ppb"><button class="d" data-a="buyd">'+ic('dia153')+num(diaPrice())+'</button>'+((window.BB_APP||window.BB_FREE)?'':'<button class="w" data-a="buyw">₩ '+num(PRICE_KRW)+'</button>')+'</div></div>')+
    (passReady()?'<button class="all" data-a="all">받을 수 있는 보상 모두 받기</button>':'')+
    '<div class="trk"><div class="tlab"><span>'+ic('gift')+'무료</span><span></span><span class="g">'+ic('crown')+'프리미엄'+(pm?'':ic('lock'))+'</span></div><div class="tsc"><div class="tin" style="--n:'+LV+'">'+
    Array.from({length:LV},(_,i)=>{const l=i+1,r=l<=L,fg=o.ps.f[l],pg=o.ps.p[l],big=l%5===0;
     return '<div class="tc'+(r?' reach':'')+(l===Math.min(LV,L+1)?' cur':'')+(big?' big':'')+'" data-lv="'+l+'">'+rc(FREE[i],'f',('pf'),l,fg?'got':r?'ok':'')+
      '<div class="nd"><i class="ln"></i><span>'+l+'</span></div>'+rc(PREM[i],'p','pp',l,pg?'got':(r&&pm)?'ok':(!pm?'lk':''))+'</div>'}).join('')+'</div></div></div>'+
    '<div class="more">더 많은 보상이 기다리고 있어요!</div><div class="msg">'+E(msg)+'</div>'}
  box.dataset.tab=tab;
  const tb=(k,icn,n,d)=>'<button data-t="'+k+'" class="'+(tab===k?'on':'')+'">'+ic(icn)+n+(d?'<i class="dt"></i>':'')+'</button>';
  const h='<div class="pn"><div class="hd"><button class="x153">닫기</button><div class="ttl"><b>미션 · 패스</b><small>미션을 깨고 패스 단계를 올려요</small></div>'+
   '<div class="tabs">'+tb('mis','target','미션',misReady())+tb('pass','ticket','패스',passReady())+'</div></div><div class="bd">'+body+'</div></div>';
  if(h===lastH)return;const sc=box.querySelector('.bd'),top=sc?sc.scrollTop:0;lastH=h;box.innerHTML=h;const sc2=box.querySelector('.bd');if(sc2)sc2.scrollTop=top;
  const ts=box.querySelector('.tsc'),cur=box.querySelector('.tc.cur');if(ts&&RT.classList.contains('lpP')&&!draw._vs&&cur&&sc2){draw._vs=1;sc2.scrollTop=Math.max(0,cur.offsetTop-sc2.clientHeight/2)}
  if(ts){if(draw._sl!=null)ts.scrollLeft=draw._sl;else if(cur)ts.scrollLeft=Math.max(0,cur.offsetLeft-ts.clientWidth/2+cur.offsetWidth/2);ts.onscroll=()=>{draw._sl=ts.scrollLeft}}else draw._sl=null;
  try{window.SO149&&SO149.iconize(box)}catch(e){}}
 box.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;e.stopPropagation();const o=S();
  if(b.classList.contains('x153')||b.classList.contains('cx77')&&b.closest('.hd')){close();return}
  if(b.dataset.t){tab=b.dataset.t;msg='';sfx('move');lastH='';draw();return}
  if(b.dataset.sub){SUB=b.dataset.sub;sfx('move');lastH='';draw();return}
  const a=b.dataset.a;if(!a)return;
  if(a==='md'||a==='mw'){const C=a==='md'?o.day:o.wk,L=a==='md'?dailyList():weekList(),m=L.find(x=>x[0]===b.dataset.k);if(!m||C.got[m[0]]||prog(C,m[0])<m[2])return;C.got[m[0]]=1;give(m[4],0,m[3]);msg='🪙 '+num(m[4])+' · 패스 +'+m[3];sfx('ok')}
  else if(a==='dbox'){if(o.day.box||!dailyList().every(m=>o.day.got[m[0]]))return;o.day.box=1;o.wk.c.dayall=(o.wk.c.dayall||0)+1;give(0,10,200);msg='💎 10 · 패스 +200';sfx('ok')}
  else if(a==='wbox'){if(o.wk.box||!weekList().every(m=>o.wk.got[m[0]]))return;o.wk.box=1;give(0,50,500);msg='💎 50 · 패스 +500';sfx('ok')}
  else if(a==='pf'||a==='pp'){const l=+b.dataset.l,L=lvOf(o.ps.xp);if(l>L){msg=l+'단계에 오르면 받을 수 있어요';draw();return}
   if(a==='pp'&&!hasPrem()){msg='프리미엄 패스가 있어야 받아요';draw();return}const G=a==='pf'?o.ps.f:o.ps.p,r=(a==='pf'?FREE:PREM)[l-1];if(G[l])return;G[l]=1;give(r.gold||0,r.dia||0,0);const gm=giveGear(r);msg=l+'단계 보상 받았어요'+(gm?' · '+gm:'');sfx('ok')}
  else if(a==='all'){const L=lvOf(o.ps.xp),pm=hasPrem(),gs=[];let g=0,d=0;for(let l=1;l<=L;l++){if(!o.ps.f[l]){o.ps.f[l]=1;g+=FREE[l-1].gold||0;d+=FREE[l-1].dia||0}if(pm&&!o.ps.p[l]){o.ps.p[l]=1;g+=PREM[l-1].gold||0;d+=PREM[l-1].dia||0;const gm=giveGear(PREM[l-1]);if(gm)gs.push(gm)}}give(g,d,0);msg='🪙 '+num(g)+' · 💎 '+num(d)+' 받았어요'+(gs.length?' · '+gs.join(' · '):'');sfx('ok')}
  else if(a==='buyd'){if(hasPrem())return;if(!window.DIA80){msg='다이아를 쓸 수 없어요';draw();return}
   if(!b.dataset.sure){b.dataset.sure=1;b.textContent='정말 살까요? 한 번 더';setTimeout(()=>{delete b.dataset.sure;lastH='';draw()},2500);return}
   const r=DIA80.buy({pid:premPid(),price:PRICE_KRW,kind:'pass'});if(r&&r.err)msg=r.err;else{msg='프리미엄 패스를 샀어요!';sfx('ok');try{saveNow()}catch(e){}}}
  else if(a==='buyw'){if(hasPrem()||!window.PAY58)return;msg='결제창을 여는 중…';draw();PAY58.buy(premPid(),r=>{if(r&&r.need==='login'){try{ACCT55.open()}catch(e){}msg='로그인하면 살 수 있어요'}else if(r&&r.err)msg=r.err;else msg='결제가 끝나면 프리미엄이 켜져요';lastH='';draw()});return}
  lastH='';draw();dot()});
 /* ── 입구 ── */
 function dot(){const any=misReady()||passReady();const b=$('dpBtn153');if(b){let d=b.querySelector('.dt');if(any&&!d){d=document.createElement('i');d.className='dt';b.appendChild(d)}else if(!any&&d)d.remove()}
  const m=document.querySelector('#lp146 .ms153');if(m){const set=(k,v)=>{const x=m.querySelector('[data-o="'+k+'"]');if(!x)return;let d=x.querySelector('.dt');if(v&&!d){d=document.createElement('i');d.className='dt';x.appendChild(d)}else if(!v&&d)d.remove()};
   set('mis',misReady());set('pass',passReady());const lv=m.querySelector('[data-o="pass"] small');if(lv){const t='Lv.'+lvOf(S().ps.xp);if(lv.textContent!==t)lv.textContent=t}
   const ms=m.querySelector('[data-o="mis"] small');if(ms){const D=S().day,dl=dailyList(),t=dl.filter(x=>D.got[x[0]]).length+'/'+dl.length;if(ms.textContent!==t)ms.textContent=t}}}
 function mount(){const h=document.querySelector('#gameMenu .gmHud'),more=$('gmMore');if(h&&more&&!$('dpBtn153')){const b=document.createElement('button');b.id='dpBtn153';b.className='dpBtn153';b.type='button';b.innerHTML=ic('target')+'미션 · 패스';
   b.addEventListener('click',e=>{e.stopPropagation();sfx('ok');open('mis')});h.insertBefore(b,more)}
  const lp=$('lp146');if(lp&&!lp.querySelector('.ms153')){const r=document.createElement('div');r.className='ms153';
   r.innerHTML='<button data-o="mis" style="--c:#7fe0ff">'+ic('target')+'미션 <small></small></button><button data-o="pass" style="--c:#b8a8ff">'+ic('ticket')+'패스 <small></small></button>';
   r.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;e.stopPropagation();sfx('ok');open(b.dataset.o)});lp.insertBefore(r,lp.firstChild);dot()}}
 /* 출석 알림 창(사용자 그림): 왼쪽 2×2 날짜 카드(어제 · 오늘 · 내일 · 모레) · 오른쪽 큰 「출석!」 칸. 아무 데나 누르면 닫힘 */
 /* 코인 더미 · 다이아 더미 도트 그림(한 번 만들어 --pile-coin / --pile-dia) */
 (function piles(){try{
  const W=120,H=64,mk=()=>{const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.imageSmoothingEnabled=false;return [c,x]};
  let sd=7;const rnd=()=>((sd=(sd*16807)%2147483647)/2147483647);
  const mound=(px)=>{const t=(px-W/2)/(W/2);return H-4-Math.max(0,(1-t*t))*(H*.62)};
  const px=(x,X,Y,col)=>{x.fillStyle=col;x.fillRect(Math.round(X),Math.round(Y),1,1)};
  const ell=(x,cx,cy,rx,ry,col)=>{for(let yy=-ry;yy<=ry;yy++){const w=Math.round(rx*Math.sqrt(Math.max(0,1-(yy*yy)/(ry*ry))));x.fillStyle=col;x.fillRect(Math.round(cx-w),Math.round(cy+yy),w*2+1,1)}};
  /* 코인 = 열린 금고(사용자 요청: 쌓인 더미 대신 금고 안 금화 · 금괴) */
  {const c=document.createElement('canvas');const VW=96,VH=64;c.width=VW;c.height=VH;const x=c.getContext('2d');x.imageSmoothingEnabled=false;
   const R=(X,Y,w,h,col)=>{x.fillStyle=col;x.fillRect(X,Y,w,h)};
   /* 금고 몸통 */
   const bx=14,by=6,bw=60,bh=54;R(bx-1,by-1,bw+2,bh+2,'#0a0e14');R(bx,by,bw,bh,'#4a5868');R(bx,by,bw,2,'#7a8ca0');R(bx,by,2,bh,'#6a7a8c');R(bx+bw-2,by,2,bh,'#2a3440');R(bx,by+bh-2,bw,2,'#1a222c');
   for(const [X,Y] of [[bx+3,by+3],[bx+bw-5,by+3],[bx+3,by+bh-5],[bx+bw-5,by+bh-5]]){R(X,Y,2,2,'#a8b8c8');R(X+1,Y+1,1,1,'#2a3440')}
   /* 안쪽 */
   const ix=bx+6,iy=by+6,iw=bw-12,ih=bh-12;R(ix-1,iy-1,iw+2,ih+2,'#1a222c');R(ix,iy,iw,ih,'#2a1a08');R(ix,iy,iw,3,'#140c04');
   for(let k=0;k<ih;k+=2)R(ix,iy+k,iw,1,k%4?'#2e1e0a':'#2a1a08');
   /* 선반 */
   const sh=iy+Math.round(ih*.52);R(ix,sh,iw,2,'#6a7a8c');R(ix,sh+2,iw,1,'#1a222c');
   /* 위 칸: 금괴 쌓기 */
   const bar=(X,Y)=>{R(X,Y,10,5,'#7a4a0a');R(X+1,Y,8,4,'#f0b02e');R(X+2,Y,6,1,'#fff0a0');R(X+1,Y+3,8,1,'#c07a1a');R(X+8,Y+1,1,3,'#b07018')};
   const ty=sh-5;for(let i=0;i<4;i++)bar(ix+2+i*11,ty);for(let i=0;i<3;i++)bar(ix+7+i*11,ty-5);bar(ix+12,ty-10);bar(ix+23,ty-10);
   /* 아래 칸: 금화 기둥 */
   const col=(X,n)=>{for(let i=0;i<n;i++){const Y=iy+ih-3-i*2;R(X,Y,7,2,i%2?'#e0a02a':'#ffc04a');R(X,Y,7,1,'#ffe58a');R(X,Y+1,1,1,'#8a5a10');R(X+6,Y+1,1,1,'#8a5a10')}R(X+1,iy+ih-3-(n-1)*2,5,1,'#fff6c8')};
   const H2=[9,12,7,11,8];H2.forEach((n,i)=>col(ix+2+i*9,n));
   /* 흘러넘친 금화 */
   const coin=(X,Y)=>{R(X,Y,5,3,'#8a5a10');R(X,Y,5,2,'#ffc04a');R(X+1,Y,3,1,'#fff0a0')};
   coin(bx+2,by+bh+0);coin(bx+bw-6,by+bh-1);coin(bx+bw+2,by+bh+0);coin(bx-6,by+bh+0);coin(bx+20,by+bh+1);
   /* 열린 문(왼쪽, 비스듬히) + 다이얼 */
   R(2,by+2,11,bh-4,'#0a0e14');R(3,by+3,9,bh-6,'#5a6a7c');R(3,by+3,9,1,'#8a9cb0');R(11,by+3,1,bh-6,'#2a3440');
   const dx=7,dy=by+bh/2;R(dx-3,dy-3,7,7,'#1a222c');R(dx-2,dy-2,5,5,'#c8d4e0');R(dx-1,dy-1,3,3,'#6a7a8c');R(dx,dy-2,1,1,'#ff5a6a');
   for(let k=0;k<3;k++){R(4,by+8+k*16,7,2,'#3a4654')}
   /* 반짝 */
   for(const [X,Y] of [[ix+8,ty-12],[ix+33,ty-4],[ix+20,iy+ih-20],[bx+bw+4,by+bh-6]]){R(X,Y,1,1,'#ffffff');R(X-1,Y,1,1,'#fff6c8');R(X+1,Y,1,1,'#fff6c8');R(X,Y-1,1,1,'#fff6c8');R(X,Y+1,1,1,'#fff6c8')}
   RT.style.setProperty('--pile-coin','url("'+c.toDataURL()+'")')}
  /* 다이아 = 뚜껑 열린 보물 상자(금고와 다르게: 나무 · 금테 · 보석이 넘침) */
  {const c=document.createElement('canvas');const VW=96,VH=64;c.width=VW;c.height=VH;const x=c.getContext('2d');x.imageSmoothingEnabled=false;
   const R=(X,Y,w,h,col)=>{x.fillStyle=col;x.fillRect(X,Y,w,h)};
   const bx=18,bw=60,by=34,bh=26;
   /* 열린 뚜껑(뒤로 젖혀짐) */
   R(bx+2,by-22,bw-4,14,'#2a1206');R(bx+3,by-21,bw-6,12,'#6a3412');for(let k=0;k<bw-6;k+=8)R(bx+3+k,by-21,1,12,'#4a220a');
   R(bx+2,by-22,bw-4,2,'#e0a02a');R(bx+2,by-10,bw-4,2,'#b07a1a');R(bx+bw/2-3,by-21,6,12,'#c08a1a');R(bx+bw/2-2,by-20,4,10,'#ffd84a');
   R(bx+3,by-8,bw-6,8,'#1a0a14');/* 안쪽 그늘 */
   /* 보석(상자 위로 넘침) */
   const gem=(X,Y,s,k)=>{const P=[['#0a2a4a','#2a8ac0','#5ec8ff','#d8f6ff'],['#2a0a4a','#7a4adf','#b88cff','#efe4ff'],['#4a0a1a','#c0304a','#ff6a8a','#ffe0e8'],['#0a3a1a','#2aa05a','#6aff9a','#e0ffe8']][k];
     for(let yy=0;yy<s*2;yy++){const w=yy<s*.7?Math.round(s*.6+yy*.6):Math.round((s*2-yy)*.9);for(let xx=-w;xx<=w;xx++){const edge=Math.abs(xx)===w||yy===s*2-1;R(X+xx,Y+yy,1,1,edge?P[0]:yy<s*.7?(xx<0?P[3]:P[2]):(xx<0?P[2]:P[1]))}}R(X-1,Y+1,1,1,'#ffffff')};
   let sd=5;const rnd=()=>((sd=(sd*16807)%2147483647)/2147483647);
   const G=[];for(let i=0;i<34;i++){const t=rnd(),X=bx+5+t*(bw-10),hump=Math.sin(t*Math.PI)*12;G.push([X,by-4-hump+rnd()*8,2+Math.floor(rnd()*3),rnd()<.55?0:rnd()<.6?1:rnd()<.5?2:3])}
   G.sort((a,b)=>a[1]-b[1]);for(const g of G)gem(...g);
   gem(bx+bw/2,by-20,6,0);/* 가운데 큰 다이아 */
   /* 진주 목걸이 늘어짐 */
   for(let k=0;k<9;k++)R(bx+bw-6+k,by+2+Math.round(Math.sin(k/2.5)*3)+k,2,2,k%2?'#f4f0ea':'#d8d0c8');
   /* 상자 몸통 */
   R(bx-1,by-1,bw+2,bh+2,'#1a0a04');R(bx,by,bw,bh,'#7a3e14');for(let k=0;k<bh;k+=6)R(bx,by+k,bw,1,'#5a2a0c');
   R(bx,by,bw,3,'#ffd84a');R(bx,by+3,bw,1,'#b07a1a');R(bx,by+bh-3,bw,3,'#e0a02a');
   for(const X of [bx,bx+bw-4])R(X,by,4,bh,'#e0a02a');R(bx+1,by,1,bh,'#fff0a0');
   /* 자물쇠 */
   R(bx+bw/2-4,by+5,8,9,'#3a2200');R(bx+bw/2-3,by+6,6,7,'#ffd84a');R(bx+bw/2-1,by+8,2,3,'#3a2200');
   /* 바닥에 흘린 보석 */
   gem(bx-6,by+bh-4,2,1);gem(bx+bw+5,by+bh-5,3,0);gem(bx+bw+12,by+bh-2,2,2);gem(bx-12,by+bh-1,2,3);
   for(const [X,Y] of [[bx+10,by-14],[bx+bw-14,by-18],[bx+bw+8,by+6]]){R(X,Y,1,1,'#ffffff');R(X-1,Y,1,1,'#e8fbff');R(X+1,Y,1,1,'#e8fbff');R(X,Y-1,1,1,'#e8fbff');R(X,Y+1,1,1,'#e8fbff')}
   RT.style.setProperty('--chest-dia','url("'+c.toDataURL()+'")')}
  /* 다이아 */
  {const [c,x]=mk();sd=11;const gem=(X,Y,s,hue)=>{const C=hue?['#0a2a4a','#2a8ac0','#5ec8ff','#a8ecff','#ffffff']:['#2a0a4a','#7a4adf','#b88cff','#e0d0ff','#ffffff'];
     for(let yy=0;yy<s*2;yy++){const w=yy<s*.7?Math.round(s*.6+yy*.6):Math.round((s*2-yy)*.9);for(let xx=-w;xx<=w;xx++){const edge=Math.abs(xx)===w||yy===s*2-1;const col=edge?C[0]:yy<s*.7?(xx<0?C[3]:C[2]):(xx<0?C[2]:C[1]);px(x,X+xx,Y+yy,col)}}
     px(x,X-1,Y+1,C[4]);px(x,X-2,Y+2,C[4])};
   const items=[];for(let i=0;i<70;i++){const X=8+rnd()*(W-16),top=mound(X),Y=top-3+rnd()*(H-top-4);items.push([X,Y,3+Math.floor(rnd()*3),rnd()<.78])}items.sort((a,b)=>a[1]-b[1]);
   for(const [X,Y,sz,h] of items)gem(X,Y,sz,h);
   for(let i=0;i<8;i++){const X=10+rnd()*(W-20),Y=mound(X)+rnd()*8;px(x,X,Y,'#ffffff');px(x,X-1,Y,'#e8fbff');px(x,X+1,Y,'#e8fbff');px(x,X,Y-1,'#e8fbff');px(x,X,Y+1,'#e8fbff')}
   RT.style.setProperty('--pile-dia','url("'+c.toDataURL()+'")')}
 }catch(e){}})();
 function attPop(n){let el=$('att153');if(!el){el=document.createElement('div');el.id='att153';document.body.appendChild(el);
   el.addEventListener('pointerdown',e=>{e.stopPropagation()});el.addEventListener('click',e=>{e.stopPropagation();el.hidden=true})}
  const LB={'-1':'어제','0':'오늘','1':'내일','2':'모레','3':'글피'};
  const cell=d=>{const r=ATT[(d-1)%28],st=d<n?'got':d===n?'now':'nx',bonus=d%7===0;
   return '<div class="c '+st+(r.dia?' dia':'')+(bonus?' bonus':'')+'" style="--pile:var(--'+(r.dia?'chest-dia':'pile-coin')+')"><div class="dy">'+(LB[String(d-n)]||'')+' · '+d+'일째</div>'+(bonus?'<span class="rb">BONUS</span>':'')+
    ic(r.dia?'dia153':'coin','big')+'<b>'+(r.dia?num(r.dia):num(r.gold))+'</b>'+(st==='now'?'<span class="stp">출석</span>':'')+'</div>'};
  /* 오른쪽 큰 칸 = 큰 보상(7 · 14 · 21 · 28일째 💎). 오늘이 그날이면 「받았어요!」, 아니면 남은 날 */
  const r=ATT[(n-1)%28],cy=((n-1)%28)+1,bigD=Math.ceil(cy/7)*7,bigR=ATT[bigD-1],left=bigD-cy,isBig=left===0,wk=Math.ceil(cy/7);
  const sk=Array.from({length:10},(_,i)=>'<i class="sk" style="left:'+(8+i*9)+'%;bottom:'+(10+(i*37)%40)+'%;animation-delay:'+((i*.37)%2.4).toFixed(2)+'s"></i>').join('');
  const pips=Array.from({length:7},(_,i)=>{const d=(wk-1)*7+i+1;return '<i class="'+(d<=cy?'on':'')+(d===bigD?' gb':'')+'"></i>'}).join('');
  el.innerHTML='<div class="pn"><div class="in"><div class="gd">'+[0,1,2,3].map(k=>cell(n+k)).join('')+'</div>'+
   '<div class="mn'+(isBig?' hit':'')+'" style="--pile:var(--pile-dia)"><i class="ry"></i><i class="pl2"></i><i class="pl3"></i><i class="pl"></i><i class="ch"></i>'+sk+
   '<span class="rib">'+(isBig?'오늘 큰 보상!':'큰 보상 · '+bigD+'일째')+'</span><div class="tt">'+(isBig?'받았어요!':'D-'+left)+'</div>'+
   '<div class="dd">'+(isBig?wk+'주째 출석을 다 채웠어요':wk+'주째 출석을 다 채우면 받아요')+'</div>'+
   '<div class="hw">'+ic('dia153','hico')+'</div><div class="rw">'+ic('dia153')+'<span class="cnt">'+(isBig?'0':num(bigR.dia))+'</span></div>'+
   '<div class="pp">'+pips+'</div></div></div>'+
   '<div class="bar"><small>오늘 '+(r.dia?'💎 '+num(r.dia):'🪙 '+num(r.gold))+' · 패스 +100 받았어요</small><div class="dots">'+Array.from({length:28},(_,i)=>'<i class="'+(i<cy?'on':'')+((i+1)%7===0?' big':'')+(i+1===cy?' me':'')+'"></i>').join('')+'</div><button class="ok">확인</button></div></div>';
  try{window.SO149&&SO149.iconize(el)}catch(e){}el.hidden=false;
  /* 보상 숫자 올라가기 · 효과음 */
  const goal=isBig?bigR.dia:0,c=el.querySelector('.cnt'),t0=performance.now();if(goal)(function up(){const q=Math.min(1,(performance.now()-t0)/700),v=Math.round(goal*(1-Math.pow(1-q,3)));if(c)c.textContent=num(v);if(q<1&&!el.hidden)requestAnimationFrame(up)})();
  const tone=(...a)=>{try{window.sfx&&window.sfx(...a)}catch(e){}};setTimeout(()=>tone(523,.12,'triangle',.05,784),80);setTimeout(()=>tone(784,.12,'triangle',.05,1046),220);setTimeout(()=>{try{if(typeof perc==='function'&&typeof audio!=='undefined'&&audio)perc('snare',audio.currentTime,.4)}catch(e){}},560);
  clearTimeout(attPop._t);attPop._t=setTimeout(()=>{el.hidden=true},9000)}
 /* 출석: 그날 처음 로비에 오면 자동으로 받음(창 없음) */
 function claimAtt(){const o=S();if(o.att.last===today())return null;const r=ATT[o.att.n%28];o.att.n++;o.att.last=today();give(r.gold||0,r.dia||0,100);return {r,n:o.att.n}}
 function auto(){try{if(!attReady())return;
  if(typeof mode==='undefined'||mode!=='menu')return;if(RT.classList.contains('gate125')||$('splash')||($('ld125')&&!$('ld125').hidden))return;
  const x=claimAtt();if(!x)return;attPop(x.n)}catch(e){}}
 setInterval(()=>{try{mount();dot();auto();if(!box.hidden)draw()}catch(e){}},1000);
 window.DP153={open,close,ev,S,addXp,hasPrem,dailyList,lvOf,claimAtt,attPop};
}catch(e){console.warn('v153',e)}})();
