/* ================= v103 난이도 차이 확실하게 + 챕터 4 마지막 별 부활 ================= */
/* 1) 공격 설계 시 페이즈 보정: 쉬움은 항상 1페이즈 구성, 어려움은 +1, 익스트림은 처음부터 최종 페이즈 구성 */
const DF_PH={easy:-9,normal:0,hard:0,extreme:0};
/* 어려움은 실제로 PHASE 2로, 익스트림은 PHASE 3(최종)으로 전투를 시작 */
const DF_START={easy:0,normal:0,hard:1,extreme:2};
function dfWrapMV(){if(typeof MV==='undefined'||MV.__df)return;for(const n of Object.keys(MV)){const f=MV[n];if(typeof f!=='function')continue;MV[n]=function(){if(!G)return f.apply(this,arguments);const real=G.phase||0,b=DF_PH[diff]||0;G.phase=clamp(real+b,0,2);try{return f.apply(this,arguments)}finally{G.phase=real}}}MV.__df=1}
/* 2) 보스 체력 배율 */
const DF_HP={easy:.75,normal:1,hard:1.3,extreme:1.6};
{const _sf=startFight;startFight=function(bi,st,quick){const r=_sf.apply(this,arguments);try{dfWrapMV();if(G){G.hp=G.maxHp=Math.round(G.maxHp*(DF_HP[diff]||1));G.phase=Math.max(G.phase||0,DF_START[diff]||0)}G.dfBanner=performance.now()}catch(e){}return r}}
/* 3) 눈에 보이는 난이도: 전투 화면 테두리 · 배지 · 시작 알림 */
const DF_LOOK={easy:{c:'#7dff9a',t:'EASY',k:'쉬움'},normal:{c:'#8ad0ff',t:'NORMAL',k:'보통'},hard:{c:'#ffb020',t:'HARD',k:'어려움'},extreme:{c:'#ff4d6d',t:'EXTREME',k:'익스트림'}};
function dfDraw(now){if(typeof mode==='undefined'||mode!=='boss'||!G)return;const L=DF_LOOK[diff]||DF_LOOK.normal,t=now/1000;
 /* 테두리 기운 */if(diff==='hard'||diff==='extreme'){const pul=diff==='extreme'?.5+.5*Math.sin(t*4):.6,a=(diff==='extreme'?.22:.12)*pul;for(let i=0;i<10;i++){RA(AX-i,AY-i,AW+i*2,1,L.c,a*(1-i/10));RA(AX-i,AY+AH+i,AW+i*2,1,L.c,a*(1-i/10));RA(AX-i,AY-i,1,AH+i*2,L.c,a*(1-i/10));RA(AX+AW+i,AY-i,1,AH+i*2,L.c,a*(1-i/10))}
  if(diff==='extreme'){for(let i=0;i<24;i++){const q=((t*.25)+i/24)%1,x=AX+((i*67)%AW),y=AY+AH-q*AH;RA(Math.round(x),Math.round(y),1,2,'#ff4d6d',(1-q)*.35)}}}
 /* 배지 */const bx=AX+AW-52,by=AY+4;RA(bx,by,50,11,'#05070a',.8);RA(bx,by,2,11,L.c,1);ctx.font='bold 8px monospace';ctx.fillStyle=L.c;ctx.textAlign='left';ctx.fillText((diff==='extreme'?'☠ ':diff==='hard'?'▲ ':diff==='easy'?'○ ':'◆ ')+L.t,bx+5,by+8);
 /* 시작 알림 */const e=(now-(G.dfBanner||0))/1000;if(e>0&&e<3.2&&G.state!=='wake'){const a=e<.3?e/.3:e>2.6?(3.2-e)/.6:1;RA(0,H/2-26,W,40,'#000',.55*a);RA(0,H/2-26,W,1,L.c,a);RA(0,H/2+13,W,1,L.c,a);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 16px '+FONT_STACK;ctx.fillStyle=L.c;ctx.fillText(L.t+'  ·  '+L.k+(typeof t5Total==='function'?'  ·  공격 패턴 '+t5Total()+'종':''),W/2,H/2-4);ctx.font='bold 8px '+FONT_STACK;ctx.fillStyle='#e8e8f0';ctx.fillText((DIFF[diff]||{}).info||'',W/2,H/2+8);ctx.globalAlpha=1;ctx.textAlign='left'}}
{const _nd=npDrawTop;npDrawTop=function(now,beat){const r=_nd.apply(this,arguments);try{dfDraw(now);s4RevTick(now)}catch(e){}return r}}
function s4RevTick(now){if(!G||!s4IsLast())return;const g=bgeo();
 if(G.s4Fall){const t=now-G.s4Fall;G.hp=1;G.nextPlan=1e9;if(t>=1800&&G.s4Go&&!SC4.on){const f=G.s4Go;G.s4Go=null;f()}if(t<1800){G.boss.slump=Math.min(1,t/1200);if(Math.random()<.45){const ex=g.x+(Math.random()-.5)*g.hf*U*1.6,ey=g.top+Math.random()*(g.y-g.top);fxRing(ex,ey,now,420,24+Math.random()*20,['#fff4c8','#ff9a5c','#ffffff'][Math.floor(Math.random()*3)]);G.shake=Math.max(G.shake,.25)}RA(0,0,W,H,'#000',Math.min(.85,t/1800*.85));
   ctx.globalAlpha=Math.min(1,t/500);ctx.textAlign='center';ctx.font='900 14px '+FONT_STACK;ctx.fillStyle='#ffffff';ctx.fillText('마지막 별을 쓰러뜨렸다…?',W/2,H/2);ctx.globalAlpha=1;ctx.textAlign='left'}}
 if(G.s4Refill){const t=(now-G.s4Refill)/1000,k=Math.min(1,t/2.2);G.boss.slump=Math.max(0,1-k*2);G.hp=Math.max(1,Math.round(G.maxHp*k*k*(3-2*k)));G.hpShow=G.hp/G.maxHp;G._barLast=G.hpShow;G.nextPlan=1e9;
  if(Math.floor(t*8)!==Math.floor((t-.016)*8))try{sfx(300+k*900,.06,'square',.03,300+k*900)}catch(e){}
  RA(0,0,W,H,'#ff2d6a',Math.max(0,.25-t*.1));ctx.textAlign='center';ctx.font='900 18px '+FONT_STACK;ctx.globalAlpha=Math.max(0,1-Math.max(0,t-2)/.8);ctx.fillStyle='#000';ctx.fillText('R E V I V E',W/2+1,AY+31);ctx.fillStyle='#ff4d8a';ctx.fillText('R E V I V E',W/2,AY+30);ctx.globalAlpha=1;ctx.textAlign='left';
  if(k>=1){G.s4Refill=0;G.hp=G.maxHp;G.nextPlan=G.beat+1;P.inv=now+900}}}
/* 쉬움: 가끔 체력 회복 별 · 익스트림: 반격 성공해도 체력 회복 없음(기존 회복 억제) */
/* ================= 챕터 4 마지막 별 — 흑성(黑星) 부활 ================= */
const S4REV={name:'마지막 별 · 흑성',en:'THE LAST STAR · UMBRA',c:'#ff4d8a'};
function s4IsLast(){return G&&(G.s4===9||G.s4Rush===9)}
defPat('umbraCollapse','흑성 붕괴','all',12,'검은 별이 경기장을 안쪽으로 접어 들임 → 고리가 조여 오며 빈틈이 돌아감, 가운데로 끌려가지 않게 버티며 빈틈을 따라가',t=>{const tel=n4T()+.3,dur=4.6;n4Act(t,t+tel,'flare');
 sch(t,()=>{const [cx,cy]=n4Core();G.pull={x:cx,y:cy,str:30+(DF_START[diff]>0?14:0),t0:t+tel,t1:t+tel+dur,tp:t,kind:'suck'};for(let r=0;r<3;r++){const m=28,gap=RND()*TAU,dir=r%2?-1:1;for(let i=0;i<m;i++){const a0=i*TAU/m;if(n4Gap(a0,gap,.42))continue;NP({k:'orb',sty:r===1?'darkm':'star4',col:r===1?'#ff4d8a':'#ffffff',r:5,t0:t,t1:t+tel,t2:t+tel+dur,noTel:i%2===1,pos:b=>{const q=Math.max(0,b-t-tel),R=Math.max(14,(120+r*50)-q*(24+r*6)*n4S()),a=a0+dir*q*.7;return [cx+Math.cos(a)*R,cy+Math.sin(a)*R*.85]},dmg:12})}}});
 return tel+dur+.5});
defPat('umbraRain','검은 별비','all',12,'검은 별과 흰 별이 번갈아 쏟아지다 바닥에서 튕김 → 떨어지는 줄 사이, 튕기는 방향을 보고',t=>{const tel=n4T(),n=18+(DF_START[diff]>0?10:0);n4Act(t,t+tel,'flare');
 for(let i=0;i<n;i++){const T1=t+tel*.6+i*.22,x0=AX+20+((i*97)%Math.max(1,AW-40)),dark=i%2===0;NP({k:'orb',sty:dark?'darkm':'star4',col:dark?'#ff4d8a':'#fff4c8',r:dark?7:5,t0:T1-.5,t1:T1,t2:T1+4,ray:Math.PI/2,rayL:30,pos:npBounce(x0,AY+4,Math.PI/2+(dark?.35:-.35),(70+(i%3)*12)*n4S(),T1,10),dmg:11})}
 return tel*.6+n*.22+3});
function s4Revive(){const now=performance.now();G.s4Rev=1;G.s4Fall=now;try{clearPhraseHazards()}catch(e){}G.vuln=null;G.exposed=false;G.clickTarget=null;G.hp=1;G.nextPlan=1e9;P.inv=now+1e9;G.pull=null;
 const art='s4_last',X=SCW/2,Y=205;
 const seq=[{d:3000,lines:[['마지막 별','……아직이다.'],['마지막 별','작은 박동이여. 처음으로 돌아가는 것을… 막을 수는 없다.']],la:900,on(){try{sfx(45,2.6,'sawtooth',.12,20);voice('bell',48,2,.05,audio.currentTime)}catch(e){}SC4.shake=.6},
  draw(c,T){c.fillStyle='#000';c.fillRect(0,0,SCW,SCH);const q=scE(scCl(T/2.2));for(let i=0;i<60;i++){const a=i*2.4+T,r=(1-q)*200+10;c.fillStyle=i%2?'#fff4c8':'#ff4d8a';c.globalAlpha=q;c.fillRect(Math.round(X+Math.cos(a)*r),Math.round(135+Math.sin(a)*r*.6),2,2)}c.globalAlpha=1;
   c.globalAlpha=1-q*.8;scBoss(c,art,X,Y,2.6*(1-q*.8)+.2,{});c.globalAlpha=1;scGlow(c,X,135,30+q*40,'#ff4d8a',q);c.fillStyle='#000';c.beginPath();c.arc(X,135,4+q*18,0,TAU);c.fill()}},
  {d:3600,on(){try{perc('crash',audio.currentTime,1);sfx(40,1.6,'sawtooth',.15,18);[0,3,6,10].forEach((d,i)=>voice('bell',50+d,1.2,.04,audio.currentTime+i*.12))}catch(e){}SC4.shake=1.2},
  draw(c,T){c.fillStyle='#07000a';c.fillRect(0,0,SCW,SCH);scFlash(c,Math.max(0,1-T*2),'#ffffff');for(let i=0;i<16;i++){const a=i*TAU/16+T*.3;c.globalAlpha=.12;c.fillStyle=i%2?'#ff4d8a':'#8a2aff';c.beginPath();c.moveTo(X,135);c.lineTo(X+Math.cos(a-.05)*400,135+Math.sin(a-.05)*400);c.lineTo(X+Math.cos(a+.05)*400,135+Math.sin(a+.05)*400);c.fill()}c.globalAlpha=1;
   scBoss(c,art,X,Y,2.6,{rev:1,eye:1,pulse:.8});const q=scE(scCl((T-.5)/.6));scTxt(c,'F I N A L   F O R M',X,40,9,'#ff4d8a',q);scTxt(c,S4REV.name,X,64,20,'#ffffff',q);scTxt(c,S4REV.en,X,78,8,'#ff9ab8',scCl((T-.9)*2))}}];
 G.s4Seq=seq;try{sfx(70,1,'sawtooth',.12,28);banner('마지막 별이 쓰러진다…')}catch(e){}
 /* ① 경기장에서 실제로 쓰러짐(1.8초) → ② 부활 영상 → ③ 체력이 0에서 가득 차오름 */
 G.s4Go=()=>{scPlay(seq,()=>{if(!G||!G.s4Rev)return;const n2=performance.now();G.s4Fall=0;G.s4Refill=n2;G.hp=1;G.phase=2;P.inv=n2+3200;G.B.name=S4REV.name;try{BB_TH[G.bi]=s4BarTh({c:S4REV.c});G._barLast=undefined}catch(e){}
  DECK[G.bi]=[['umbraCollapse',4,0,'S'],['umbraRain',3,0],['fallingSky',3,0],['starHeart',3,0],['genesis',3,0],['lastStar',3,0]];try{banner('부활! 흑성 형태 — 마지막 별이 검게 다시 타오른다!');sfx(40,1.5,'sawtooth',.14,18);perc('crash',audio.currentTime,1)}catch(e){}G.shake=1;G.flash=.8;
  try{const g=bgeo();fxRing(g.x,g.coreY,n2,1200,300,'#ff4d8a');fxRing(g.x,g.coreY,n2+200,1400,380,'#ffffff')}catch(e){}})}}
{const _sd=startDying;startDying=function(now){if(s4IsLast()&&(G.s4Fall||G.s4Refill||SC4.on)){G.hp=Math.max(1,G.hp);return}if(s4IsLast()&&!G.s4Rev&&G.state!=='result'&&G.state!=='dying'){s4Revive();return}return _sd.apply(this,arguments)}}
{const _fe=fightEnd;fightEnd=function(won){if(won&&G&&s4IsLast()&&!G.s4Rev&&G.state!=='result'){G.state='play';s4Revive();return}return _fe.apply(this,arguments)}}
{const _sp=spDmg;spDmg=function(){if(G&&(G.s4Fall||G.s4Refill))return;return _sp.apply(this,arguments)}}
/* 흑성 형태 모습: 몸이 검게 물들고 붉은 코로나 */
{const base=MON.reg.c_s4_last;MON.reg.c_s4_last=A=>{base(A);const rev=(A.o&&A.o.rev)||(typeof mode!=='undefined'&&mode==='boss'&&G&&G.s4Rev&&G.B===A.B);if(!rev)return;const S=A.c,t=A.t;S.save();S.setTransform(1,0,0,1,0,0);S.globalCompositeOperation='source-atop';S.fillStyle='rgba(30,0,24,.62)';S.fillRect(0,0,S.canvas.width,S.canvas.height);S.restore();
 A.aura='#ff2d6a';for(let i=0;i<12;i++){const a=i*TAU/12+t*.5;A.beam([[0,-21],[Math.cos(a-.04)*30,-21+Math.sin(a-.04)*30],[Math.cos(a+.04)*30,-21+Math.sin(a+.04)*30]],i%2?'#ff4d8a':'#8a2aff',.25)}A.glow(0,-21,16,'#ff2d6a',1);A.glow(-2,-21,3,'#ff4d6d',1);A.glow(2,-21,3,'#ff4d6d',1)}}
/* 새 전투마다 부활 표시 초기화 */
{const _nf=newFight;newFight=function(){const r=_nf.apply(this,arguments);try{G.s4Rev=0}catch(e){}return r}}

