/* ================= v6: 궁극기(C키) · 새 보스 패턴 · 확장 스토리(동굴 사건·전투 대사) ================= */
/* ---------- 궁극기 게이지 ---------- */
function ultAdd(v){if(!G||G.state!=='play')return;const was=(G.ult||0)>=100;G.ult=Math.min(100,(G.ult||0)+v);if(!was&&G.ult>=100){const now=performance.now();G.pops.push({x:P.x,y:P.y-40,t:now,tx:'궁극기 준비! [C]',col:'#ffe79a'});sfx(880,.2,'triangle',.05,1320);sfx(1320,.25,'triangle',.04,1760)}}
function spOnHit(now,fin){ultAdd(fin?16:7)}
function tryUlt(){if(mode!=='boss'||paused||!G||G.state!=='play'||G.cine||G.sp||(G.ult||0)<100)return;G.ult=0;useSpecialV(performance.now())}
function useSpecialV(now){const hadV=!!G.vuln;if(!hadV){G.vuln={type:'stun',t0:G.beat,t1:G.beat+.01,fake:true}}useSpecial();if(!hadV){G.vuln=null}P.inv=Math.max(P.inv,now+(G.sp?G.sp.dur:1200)+400);bossSay('ult')}
addEventListener('keydown',e=>{if(e.code==='KeyC'&&!e.repeat&&mode==='boss'){e.preventDefault();tryUlt()}});
function ensureUltBtn(){if($('btnU'))return;const b=document.createElement('button');b.id='btnU';b.className='tbtn';b.textContent='궁';b.style.cssText='right:30px;bottom:140px;width:70px;height:70px;font-size:18px;background:#ffd16655;border-color:#ffd166;display:none';b.addEventListener('pointerdown',e=>{e.preventDefault();tryUlt()});($('btnA').parentNode||document.body).appendChild(b)}
function drawUltGauge(now){const x=8,y=H-53,w=132,h=5,k=clamp((G.ult||0)/100,0,1),full=k>=1;
 RA(x-2,y-8,w+4,h+11,'#05090b',.7);ctx.font='bold 7px monospace';ctx.textAlign='left';ctx.fillStyle=full?(Math.floor(now/120)%2?'#ffffff':'#ffe79a'):'#ffcf5a';ctx.fillText(full?'궁극기 준비! [C]  '+curWp().sp:'궁극기  '+Math.floor(k*100)+'%',x,y-1);
 R(x-1,y-1,w+2,h+2,'#161c22');R(x,y,w,h,'#2a2410');const fw=w*k;R(x,y,fw,h,full?(Math.floor(now/90)%2?'#fff0a0':'#ffcf5a'):'#ffb020');R(x,y,fw,1,'#fff6cf');if(full)RA(x-2,y-2,w+4,h+4,'#ffe79a',.15+.1*Math.sin(now/100));for(let i=1;i<4;i++)R(x+w*i/4,y,1,h,'#05090b')}
/* 이전 필살기 HUD 대체: 궁극기 게이지 + 이펙트 + 전투 대사 */
function drawSpecialHUD(now){drawSpecialFX(now);drawAwakenFX(now);drawTalk(now);if(G.state==='play'||G.state==='count')drawUltGauge(now);
 const t=isTouchUI();if(t){ensureUltBtn();const b=$('btnU'),want=(mode==='boss'&&G.state==='play'&&(G.ult||0)>=100&&!G.sp)?'':'none';if(b.style.display!==want)b.style.display=want}
 if(G.state==='play'&&!G.cine)talkTriggers(now)}
/* ---------- 새 보스 패턴 8종 ---------- */
Object.assign(EST,{crossLaser:9,bulletRain:10,spiralArms:9,checkerQuake:9,meteorFall:10,pincerWall:10,sweepCone:8,tripleWave:10});
Object.assign(CHAN,{crossLaser:'head',bulletRain:'field',spiralArms:'all',checkerQuake:'field',meteorFall:'hands',pincerWall:'field',sweepCone:'head',tripleWave:'all'});
Object.assign(ATK_NAME,{crossLaser:'교차 레이저',bulletRain:'탄막 소나기',spiralArms:'나선 탄막',checkerQuake:'격자 진동',meteorFall:'낙하 강타',pincerWall:'협공 탄벽',sweepCone:'부채꼴 소사',tripleWave:'삼중 파동'});
MV.crossLaser=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.1,d.tel),n=2+ph;
 for(let i=0;i<n;i++){const td=t+tel+i*1.6;sch(td-tel,()=>{const px=clamp(P.x,AX+20,AX+AW-20),py=clamp(P.y,AY+30,AY+AH-14),dia=i%2===1;
  if(!dia){beam(td,AX-4,py,0,10,tel,1,0,false);beam(td,px,AY-4,Math.PI/2,10,tel,1,0,false)}else{beam(td,px-120,py-120,Math.PI/4,10,tel,1,0,true);beam(td,px+120,py-120,Math.PI*3/4,10,tel,1,0,true)}sfx(300,.2,'triangle',.04,600)})}
 const L=tel+n*1.6+.6;G.boss.eyeC={b0:t,b1:t+tel,end:t+L};return L};
MV.bulletRain=t=>{const d=D2(),ph=G.phase,waves=3+ph,cols=9,sp=46*d.sp;
 for(let w=0;w<waves;w++){const tw=t+.8+w*1.3,gap=1+Math.floor(RND()*(cols-3));sch(tw-.6,()=>{sfx(520,.1,'square',.03,380)});
  for(let c=0;c<cols;c++){if(c===gap||c===gap+1)continue;const x=AX+14+c*(AW-28)/(cols-1);bul(tw+((c%2)*.15),x,AY-4,Math.PI/2,sp,3,8)}}
 return .8+waves*1.3+2.4};
MV.spiralArms=t=>{const d=D2(),ph=G.phase,arms=2+(ph>=2?1:0),steps=10+ph*4,g0=geo(G.B,HOME.x,HOME.y),dir=RND()<.5?1:-1;
 sch(t,()=>{G.boss.openTw={b0:t,b1:t+.6,to:1};sfx(200,.5,'sawtooth',.04,500)});
 for(let s=0;s<steps;s++){const ts=t+.8+s*.3;sch(ts,()=>{const g=bgeo();for(let a=0;a<arms;a++)bul(ts,g.x,g.coreY,dir*s*.42+a*TAU/arms,44*d.sp,3,7)})}
 const L=.8+steps*.3+1.2;sch(t+L-.6,()=>{G.boss.openTw={b0:t+L-.6,b1:t+L,to:0}});return L};
MV.checkerQuake=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.1,d.tel),waves=2+(ph>=1?1:0),cols=6,rows=4;
 for(let w=0;w<waves;w++){const td=t+tel+w*1.7;for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){if((r+c+w)%2)continue;const x=AX+AW*(c+.5)/cols,y=AY+30+(AH-40)*(r+.5)/rows;zCirc(td,x,y,26,{tel,dmg:13,dur:.45,kind:'plain',after:w===0&&r===0&&c===0?()=>{G.shake=Math.max(G.shake,.3);sfx(70,.4,'square',.07,35)}:null})}}
 handsUp(t,30,-20);const L=tel+waves*1.7+.8;idleHands(t+L-.4);return L};
MV.meteorFall=t=>{const d=D2(),ph=G.phase,n=4+ph*2,tel=Math.max(1,d.tel*.85);
 for(let i=0;i<n;i++){const ts=t+i*.75;sch(ts,()=>{const x=clamp(P.x+(RND()-.5)*20,AX+24,AX+AW-24),y=clamp(P.y+(RND()-.5)*20,AY+36,AY+AH-16);zCirc(ts+tel,x,y,24,{tel,shadow:true,dmg:15,dur:.35,after:()=>{G.shake=Math.max(G.shake,.25);spawnPuff(x,y,10,G.B.pal[2]);sfx(80,.3,'square',.07,40);if(ph>=1)for(let j=0;j<6;j++)bul(G.beat,x,y,j*TAU/6+i*.3,40*d.sp,3,6)}})})}
 handsUp(t,20,-30);const L=n*.75+tel+1;idleHands(t+L-.3);return L};
MV.pincerWall=t=>{const d=D2(),ph=G.phase,waves=2+ph,n=10;
 for(let w=0;w<waves;w++){const tw=t+.8+w*1.9,side=w%2?-1:1,gap=1+Math.floor(RND()*(n-3)),x0=side>0?AX-4:AX+AW+4;sch(tw-.6,()=>sfx(420,.12,'square',.03,300));
  for(let k=0;k<n;k++){if(k===gap||k===gap+1)continue;const y=AY+22+k*(AH-30)/(n-1);bul(tw,x0,y,side>0?0:Math.PI,52*d.sp,3,8)}
  if(ph>=2){for(let k=0;k<n;k++){if(k===gap+3||k===gap+4)continue;const y=AY+22+k*(AH-30)/(n-1);bul(tw+.9,side>0?AX+AW+4:AX-4,y,side>0?Math.PI:0,46*d.sp,3,8)}}}
 return .8+waves*1.9+3};
MV.sweepCone=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.1,d.tel),n=1+(ph>=1?1:0);
 for(let i=0;i<n;i++){const t0=t+i*2.6;sch(t0,()=>{const g=bgeo(),a0=Math.atan2(P.y-g.headY,P.x-g.x),sg=i%2?-1:1;G.boss.eyeC={b0:t0,b1:t0+tel,end:t0+tel+2};cone({x:g.x,y:g.headY,a0:a0-sg*.9,da:sg*1.8,half:.2,len:330,t0,t1:t0+tel,t2:t0+tel+1.8})})}
 return n*2.6+tel};
MV.tripleWave=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.1,d.tel),pts=[[AX+60,AY+60],[AX+AW-60,AY+60],[HOME.x,AY+AH-30]];
 pts.forEach(([x,y],i)=>{const tb=t+tel+i*1.2;sch(t+i*1.2,()=>{spawnPuff(x,y,8,G.B.pal[3]);sfx(160,.3,'sawtooth',.04,320)});ring(x,y,16,240,tb,tb+2.2,10,null,t+i*1.2)});
 if(ph>=2){const tb=t+tel+3.6;ring(HOME.x,AY+AH/2,16,260,tb,tb+2.2,10,null,t+3.6)}
 return tel+3*1.2+2.6+(ph>=2?1.2:0)};
{const NEWM=['crossLaser','bulletRain','spiralArms','checkerQuake','meteorFall','pincerWall','sweepCone','tripleWave'];
 const PICK=[[3,4,6],[0,1,5],[4,3,7],[5,1,6],[1,0,7],[2,1,5],[4,5,3],[2,7,0],[0,6,2],[2,0,7,4],
  [3,4,1],[2,6,1],[4,7,5],[5,4,6],[2,3,6],[1,2,5],[0,7,2],[7,2,4],[4,1,6],[2,0,7,5]];
 for(let bi=0;bi<20;bi++){const dk=DECK[bi];if(!dk)continue;PICK[bi].forEach((k,j)=>{const nm=NEWM[k];if(!dk.some(m=>m[0]===nm))dk.push([nm,2,j===0?0:j===1?1:2])})}}
/* ---------- 전투 대사 (말풍선) ---------- */
const BTALK=[
 ['검증을 시작한다. 박자를 놓치지 마라.','…하나. 둘. 너는 아직 서 있구나.','셈이… 흐트러진다…','그 빛… 태엽지기의 빛!','박자가 무너졌다. 돌아가라, 아이야.'],
 ['가까이 오지 마! 아니, 와 줘! 모르겠어!','깜빡… 깜빡… 너 되게 빠르다!','잡음이… 조금 줄었어…','와아, 번쩍번쩍해!','괜찮아? 미안해, 내가 그런 거지?'],
 ['불꽃으로 확인하겠다!','좋은 망치질이다!','불이… 식어 간다…','그것이 네 불꽃이냐!','약하다! 다시 벼려라!'],
 ['출발합니다! 선로 위 승객은 비켜 주십시오!','정시 운행 위협! 정시 운행 위협!','종착… 종착역이 보인다…','비상 제동! 비상 제동!!','무임승차는 하차하십시오!'],
 ['냉각 개시. 당신을 보존하겠다.','체온 상승. …흥미롭다.','해동… 진행 중…','측정 불가능한 열량!','체온 저하. 곧 잠든다.'],
 ['우리는 많다 우리는 많다!','하나 둘 떨어진다 그래도 노래한다!','종을… 울려 줘…','번개! 우리보다 빠른 번개!','작은 박동 작은 박동 멈춰라!'],
 ['분실물 회수 시작!','잘 버티는군! 무게 측정 불가!','놓친다… 전부 놓친다…','자기장이 흔들린다!','보관함에 넣어 주마!'],
 ['자, 첫 스텝이다.','훌륭한 춤이야. 박자가 좋아.','마지막 곡이 끝나 가는구나…','아름다운 동작이군!','스텝이 꼬였구나, 아이야.'],
 ['조준 개시. 도망칠 곳은 없다.','예측 불가. 예측 불가.','시야가… 흐려진다…','관측 불능의 빛!','표적 약화 확인.'],
 ['(정적) 조용히… 모두 조용히…','(오메가) 하루… 버텨 다오…!','(오메가) 조금만… 조금만 더…!','(정적) 그 소리를 멈춰라!','(정적) 쉬어라. 이제 쉬어도 돼.'],
 ['시끄러워! 삼킬 거야!','왜… 안 조용해지지…','흙으로… 돌아가고 싶어…','눈부셔! 그만!','조용히 해… 조용히…'],
 ['자장가를 불러 줄게.','왜 안 자니… 착하지…','나도… 졸려…','너무 밝아… 잠이 깨…','그래, 눈을 감으렴…'],
 ['미안해! 손이 멋대로!','놓아 줘야 하는데…!','이제… 놓을 수 있을 것 같아…','와아… 물이 반짝여…','가라앉아… 같이 가라앉아…'],
 ['놀자! 놀자! 쫓아간다!','빠르다! 너 되게 빠르다!','헉… 헉… 신났다…','우와아! 그거 뭐야!','잡았다! 이제 내 차례!'],
 ['실을 밟지 마.','헝클어지고 있어…','마지막 소절이… 끊어진다…','실이… 전부 끊어졌어!','이제 너도 악보의 일부야.'],
 ['쏴라! 전부 쏴라!','끈질긴 놈!','날개가… 무거워…','침보다 날카롭다!','벌집에 넣어 버려!'],
 ['네 안을 비춰 볼까.','흔들리지 않는구나…','금이… 간다…','눈이 멀 것 같아!','보인다, 네 두려움이.'],
 ['가라앉아라.','물살을 거슬러 오는구나.','수면이… 잦아든다…','심연까지 닿는 빛이라니!','숨이 차오르지? 편히 가라앉아.'],
 ['노래해 줄까… 마지막 노래를…','따뜻하다… 네 발소리…','재가… 바람에 실려…','불꽃이… 다시 핀다…','같이 재가 되자…'],
 ['모든 소리는 나에게 돌아온다.','…작은 박동이 이리도 시끄럽다니.','물러날 뿐이다… 사라지지 않는다…','그 빛도 언젠가 꺼진다!','이제 조용히 해라, 아이야.'],
];
const HERO_REPLY=['아직이야!','다 같이 돌아가자!','조금만 더!','멈추지 않을 거야!','할아버지, 기다려요!'],TICK_LINE=['째깍! 지금이야!','박자를 믿어, 하루!','숨 고르고! 하나, 둘!','틈이 보여! 초록 점!','금빛 조각은 박자에 맞춰 튕겨!','코어를 차서 공격 속에 넣어!'],TICK_LOW=['하루! 괜찮아?','조금만 버텨! 내가 박자 셀게!','천천히… 피하는 게 먼저야!'];
function sayBubble(who,text,dur){G.talk=G.talk||[];G.talk=G.talk.filter(b=>b.who!==who);G.talk.push({who,text:nameText(text),t0:performance.now(),dur:dur||2600})}
function bossSay(k){const L=BTALK[G.bi];if(!L)return;const i={start:0,half:1,low:2,ult:3,taunt:4}[k];if(i==null)return;sayBubble('boss',L[i],2800)}
function talkTriggers(now){const r=G.hp/G.maxHp;G._tk=G._tk||{};const T=G._tk;
 if(!T.start){T.start=1;bossSay('start');T.next=now+14000}
 if(!T.half&&r<.5){T.half=1;bossSay('half');setTimeout(()=>{if(G&&G.state==='play')sayBubble('hero',HERO_REPLY[Math.floor(RND()*HERO_REPLY.length)])},1300)}
 if(!T.low&&r<.2){T.low=1;bossSay('low')}
 if(!T.pl&&P.hp<P.maxhp*.35){T.pl=1;bossSay('taunt');setTimeout(()=>{if(G&&G.state==='play')sayBubble('tick',TICK_LOW[Math.floor(RND()*TICK_LOW.length)])},1200)}
 if(now>(T.next||0)&&!G.vuln){T.next=now+16000+RND()*8000;sayBubble('tick',TICK_LINE[Math.floor(RND()*TICK_LINE.length)],2400)}}
function drawTalk(now){if(!G.talk||!G.talk.length)return;const g=bgeo();G.talk=G.talk.filter(b=>now-b.t0<b.dur);
 for(const b of G.talk){const k=(now-b.t0)/b.dur,a=k<.08?k/.08:k>.85?(1-k)/.15:1,shown=Math.min(b.text.length,Math.floor((now-b.t0)/32));const txt=b.text.slice(0,shown);if(!txt)continue;
  let ax,ay,col,bg;if(b.who==='boss'){ax=g.x;ay=Math.max(AY+14,g.top-16);col=G.B.c;bg='#10060a'}else if(b.who==='hero'){ax=P.x;ay=P.y-44;col='#a6f5c6';bg='#06100c'}else{const pt=G.pt||{x:P.x-22,y:P.y-34};ax=pt.x;ay=pt.y-14;col='#a8f0ff';bg='#061014'}
  ctx.font='bold 9px monospace';const tw=Math.min(210,ctx.measureText(b.text).width+10),x=clamp(ax-tw/2,AX+2,AX+AW-tw-2),y=ay-12;ctx.globalAlpha=a;
  R(x-1,y-1,tw+2,15,'#000');R(x,y,tw,13,bg);R(x,y,tw,1,col);R(clamp(ax-2,x+4,x+tw-6),y+13,4,2,bg);R(clamp(ax-1,x+5,x+tw-5),y+15,2,1,bg);
  ctx.fillStyle='#ffffff';ctx.textAlign='left';ctx.fillText(txt,x+5,y+10);ctx.globalAlpha=1}}
/* ---------- 동굴 스토리 사건 (기억의 메아리 · 대화 · 전조) ---------- */
const CAVE_EV=[
 [[['','희미한 빛 속에서 아이 셋이 뛰어간다. 반투명한 모습이다. 오래전의 기억이 벽에 남아 재생되는 것 같다.'],['기억 속 아이','문지기 아저씨, 안녕! 오늘도 세어 줘요!'],['기억 속 목소리','하나. 둘. 셋. …모두 무사히 지났다.'],['똑딱','이건 수호자의 기억이야. 정적에 물들기 전의.'],['하루','…저렇게 다정했던 애가, 지금은 우릴 막고 있구나.']],
  [['하루','똑딱, 너는 언제부터 할아버지랑 같이 있었어?'],['똑딱','음… 기억이 잘 안 나. 눈을 떴을 때 할아버지 작업대 위였어. 할아버지가 "잘 왔다" 그랬던 것만 기억나.'],['하루','잘 왔다…? 어디서 왔는데?'],['똑딱','몰라. 근데 여기 오니까 가슴 속 태엽이 자꾸 간지러워. 마치 집에 온 것처럼.']],
  [['','멀리서 톱니가 맞물리는 소리가 규칙적으로 들린다. 누군가 무언가를 세고 있다.'],['톱니 파수꾼 (멀리서)','…백이십칠. 백이십팔. 아무도 지나가지 않았다. 아무도…'],['하루','숫자를 세고 있어. 아무도 오지 않는데도.']]],
 [[['','전선이 깜빡일 때마다 벽에 그림자가 비친다. 헬멧을 쓴 광부와 그 손을 잡은 아이.'],['기억 속 광부','봐라, 볼트 월이 인사하잖니. 깜빡, 깜빡, 깜빡.'],['기억 속 아이','나도 인사할래! 깜빡깜빡!'],['똑딱','…불빛이 대답하는 것 같아.']],
  [['하루','마을 사람들, 무서워하고 있겠지.'],['똑딱','윤서가 그러는데, 잠든 사람들 얼굴이 다 편안하대. 아픈 게 아니라 그냥… 멈춘 거래.'],['하루','할아버지는 안 편안할 거야. 태엽을 못 감으면 잠을 못 이루던 사람이니까.'],['똑딱','(웃음) 맞아. 새벽 네 시에 일어나서 온 마을 시계를 감았지.']],
  [['','전류가 갑자기 거칠어진다. 벽을 따라 흐르던 빛이 비명을 지르듯 번쩍인다.'],['볼트 월 (멀리서)','오지 마… 아니, 와 줘… 누구든… 이 잡음을 꺼 줘…'],['하루','…도와 달라는 거야.']]],
 [[['','쇳물의 빛 속에 두 그림자가 떠오른다. 커다란 골렘과, 젊은 남자 한 명.'],['기억 속 젊은 태엽지기','손이 따뜻한 열쇠를 만들어 줘. 아이들이 쥐어도 다치지 않게.'],['기억 속 골렘','…따뜻한 쇠는 없다. 그래도 해 보지.'],['하루','저 사람… 할아버지야. 젊었을 때의.'],['똑딱','할아버지도 여기까지 내려왔었구나.']],
  [['하루','(열쇠를 쥐며) 이 열쇠, 할아버지가 한 번도 손에서 놓은 적 없었어.'],['똑딱','그리고 너한테 줬지. 잠들기 직전에.'],['하루','"다음 태엽지기는 너다"라고… 그땐 무슨 뜻인지 몰랐어.'],['똑딱','지금은?'],['하루','…조금 알 것 같아.']],
  [['','망치 소리가 점점 빨라진다. 쿵쿵쿵쿵— 박자가 무너진다.'],['용광로 골렘 (멀리서)','불이… 너무 뜨겁다… 누구를 위한 열쇠였지… 기억이… 녹는다…']]],
 [[['','승강장 위로 반투명한 사람들이 줄지어 서 있다. 가방과 새장과 인형을 든 채로.'],['기억 속 역무원','마지막 열차입니다! 지상으로 가는 마지막 열차!'],['기억 속 여자아이','엄마, 할머니는? 할머니는 안 타?'],['기억 속 목소리','…다음 열차로 오실 거야.'],['똑딱','다음 열차는… 없었어.']],
  [['하루','똑딱, 무서운 거 있어?'],['똑딱','응. 너를 놓치는 거. 이 아래는 길이 너무 많아.'],['하루','그럼 약속하자. 무슨 일이 있어도 서로 이름을 부르기로.'],['똑딱','…하루.'],['하루','똑딱.'],['똑딱','(째깍) 좋아. 이제 안 무서워.']],
  [['','선로가 떨린다. 어둠 속에서 기적 소리가 길게 울린다. 끝나지 않는 안내 방송처럼.'],['철갑 열차 (멀리서)','다음 역은… 다음 역은… 승객 여러분, 다음 역은 어디입니까…']]],
 [[['','얼음 유리관 하나에 흐릿한 영상이 떠 있다. 작은 아기를 안은 노인. 노인의 손에는 그 열쇠가 들려 있다.'],['기억 속 태엽지기','이 아이 이름은 하루란다. 하루하루, 박자처럼 살라고.'],['하루','…나야. 이거 나야.'],['똑딱','코어가 네 기억까지 얼려 뒀구나. 잊히지 않게.']],
  [['하루','이상하지. 여기선 할아버지 목소리가 더 또렷하게 들려.'],['똑딱','차가운 곳일수록 기억은 오래 남는대.'],['하루','그럼 난 따뜻한 곳에서 새로 만들래. 할아버지 깨어나면, 같이.'],['똑딱','응. 나도 끼워 줘.']],
  [['','공기가 쩍쩍 갈라지며 얼어붙는다. 숨소리마저 얼어 떨어진다.'],['극저온 코어 (멀리서)','경고. 기억 보존율 12%. 녹고 있다. 모든 것이… 녹아 사라지고 있다…']]],
 [[['','수백 개의 작은 불빛이 떼를 지어 천장 구멍으로 날아오르는 환영. 합창 소리가 들린다.'],['기억 속 드론들','전한다 전한다 박동을 전한다 아침이다 아침이다'],['기억 속 마을 사람','오, 종이 울린다! 하이브가 아침을 가져왔어!'],['똑딱','매일 아침 종소리는 저 애들이 배달한 거였어.']],
  [['하루','요즘 마을 종이 안 울렸던 이유가 이거였구나.'],['똑딱','응. 전령이 멈추니까 아침도 멈췄어.'],['하루','그럼 우리가 새 전령이 되자. 올라가면 내가 직접 종을 칠 거야.'],['똑딱','종 치는 거 되게 무겁대.'],['하루','…같이 치자.']],
  [['','날갯소리가 한순간 멈췄다가, 경보처럼 일제히 울린다.'],['스톰 하이브 (멀리서)','침입자 침입자 아니 손님 손님 아니 침입자—']]],
 [[['','고철더미 위에 반투명한 사람들이 앉아 뭔가를 찾고 있다. 신발 한 짝, 안경, 곰 인형.'],['기억 속 노부인','크레인아, 내 안경 봤니?'],['기억 속 크레인','찾았다! 보관 번호 3301! …주인님, 다음엔 떨어뜨리지 마세요.'],['하루','다정한 수집가였구나.']],
  [['하루','할아버지 시계가 여기 있을까?'],['똑딱','…하루. 할아버지 시계는 잃어버린 게 아니야.'],['하루','무슨 말이야?'],['똑딱','할아버지가 일부러 두고 왔대. 여기 어딘가에. 언젠가 누가 찾으러 오라고.'],['하루','그럼… 날 기다린 거네.']],
  [['','쇳조각들이 일제히 한 방향으로 끌려간다. 거대한 자력이 숨을 쉬듯 당기고 놓는다.'],['자석 크레인 (멀리서)','놓치면 안 돼… 전부 붙잡아야… 아무것도 잃어버리면 안 돼…']]],
 [[['','톱니 사이로 금빛 기억이 흐른다. 거대한 심장 기계 앞에서 기술장 윤서와 젊은 태엽지기가 나란히 서 있다.'],['기억 속 윤서','첫 박동이야. 이 작은 박동이 떨어져 나가 세상을 돌며 시간을 배울 거야.'],['기억 속 태엽지기','그럼 돌아올 때까지 제가 돌볼게요. 이름은… 똑딱으로 하죠.'],['똑딱','…!'],['하루','똑딱, 너…']],
  [['똑딱','하루, 나 좀 무서워. 내가 뭔지 알게 될 것 같아서.'],['하루','네가 뭐든 상관없어. 넌 똑딱이야. 내 친구.'],['똑딱','…그 말, 할아버지도 했었어.'],['하루','그럼 우리 집안 대대로의 약속이네.']],
  [['','째깍, 째깍. 수많은 시계가 한 박자로 맞춰진다. 그리고 한순간, 전부 멈춘다.'],['시계탑 자동인형 (멀리서)','곧 12시. 무대가 준비됐다. 첫 박동이 돌아왔구나…']]],
 [[['','수천 개의 유리 눈에 지상의 풍경이 비친다. 축제, 종소리, 웃는 사람들. 오래전의 마을이다.'],['기억 속 요새','관측 기록: 인간, 웃음. 의미 불명. …그러나 계속 관측하고 싶다.'],['하루','이 애는 밖을 계속 보고 있었구나. 나갈 수 없어서.']],
  [['하루','똑딱. 오메가를 다시 뛰게 하면… 너는 어떻게 돼?'],['똑딱','…모르겠어.'],['하루','사라지는 거야?'],['똑딱','(한참 조용) 사라지는 게 아니라, 돌아가는 거야. 돌아간 박동은 온 세상에서 뛰어. 네 심장에서도.'],['하루','…그런 말 하지 마. 아직.'],['똑딱','응. 아직.']],
  [['','모든 유리 눈이 한꺼번에 이쪽을 향한다. 빛이 한 점에 모인다.'],['광학 요새 (멀리서)','관측 대상 접근. 박동 두 개. 하나는… 아주 오래전에 떠난 박동이다.']]],
 [[['','벽이 뛸 때마다 목소리가 새어 나온다. 수백 년의 혼잣말.'],['오메가의 기억','오늘도 아무도 오지 않았다. 괜찮다. 내일은 오겠지.'],['오메가의 기억','…삼백 년째 내일이다.'],['하루','이렇게 오래… 혼자였어.']],
  [['똑딱','하루. 끝나면 할아버지한테 전해 줘. 똑딱은 잘 돌아갔다고.'],['하루','싫어. 네가 직접 말해.'],['똑딱','(웃음) 고집은 할아버지 닮았어.'],['하루','태엽지기 집안이니까.']],
  [['','쿵… …… 쿵. 박동 사이가 점점 길어진다. 세상이 숨을 참는다.'],['(정적의 목소리)','…조용히. 조용히. 이제 곧 모두가 쉴 수 있어.']]],
 [[['','담장 너머 버려진 나무들 사이로, 옛 수확제의 환영이 스친다. 사과를 따며 노래하는 사람들.'],['기억 속 사람들','하나 따면 박자 하나, 둘 따면 박자 둘~'],['똑딱','이 과수원, 원래 마을 노래가 시작된 곳이래.']],
  [['하루','똑딱이 돌아와서 정말 좋아.'],['똑딱','(째깍) 오메가 안에 있다가 다시 나왔는데, 이번엔 할아버지가 직접 태엽을 감아 줬어.'],['하루','할아버지는 요즘 매일 아침 네 태엽부터 감더라.'],['똑딱','응. 이번엔 안 떠날 거야.']],
  [['','땅 밑에서 무언가 우적우적 씹는 소리가 난다. 뿌리들이 소리 나는 쪽으로 고개를 돌린다.'],['뿌리아귀 (땅속에서)','…시끄러워… 삼키면… 조용해지겠지…']]],
 [[['','포자 안개 속에서 정원사가 꽃들에게 자장가를 불러 주는 환영.'],['기억 속 정원사','잘 자라, 우리 꽃들. 내일 아침 종소리에 다시 피어나렴.'],['하루','포자여왕은… 원래 이 정원의 자장가였나 봐.']],
  [['똑딱','하루, 졸리지?'],['하루','…조금.'],['똑딱','내가 박자 세 줄게. 째깍, 째깍. 박자를 따라오면 안 잠들어.'],['하루','고마워. 계속 세 줘.']],
  [['','달콤한 자장가가 안개를 타고 흐른다. 발걸음이 저절로 느려진다.'],['포자여왕 (멀리서)','이리 오렴… 누워서… 쉬어도 돼…']]],
 [[['','물레방아가 힘차게 돌던 시절의 환영. 물 튀는 소리에 맞춰 아이들이 손뼉을 친다.'],['기억 속 방앗간지기','물은 흘러야 맑아진다. 고이면 썩지.'],['똑딱','지금 여긴… 너무 오래 고여 있었어.']],
  [['하루','윤서가 걱정하더라. 우리가 자꾸 멀리 가는 거.'],['똑딱','윤서는 마을 시계를 전부 새로 맞추고 있대. 우리가 파편을 가져올 때마다 종소리가 조금씩 선명해진대.'],['하루','그럼 우리가 하는 일이 헛되지 않은 거네.']],
  [['','수면 아래서 거대한 무언가가 천천히 몸을 뒤척인다. 거품 속에 사람들의 목소리가 섞여 있다.'],['늪지 아귀 (물속에서)','돌려줘야 하는데… 손이… 말을 안 들어…']]],
 [[['','뼈 이정표 사이로 순찰대원과 커다란 사냥개의 환영이 걷는다.'],['기억 속 순찰대원','잘했다, 녀석. 오늘도 마을은 무사해.'],['기억 속 사냥개','(꼬리를 흔든다)'],['하루','…저 사냥개였구나.']],
  [['똑딱','하루, 너 요즘 잘 안 웃어.'],['하루','…다들 너무 슬퍼서. 싸울 때마다 미안해져.'],['똑딱','그래도 우리가 싸워서, 걔들이 쉴 수 있었잖아. 그건 나쁜 게 아니야.'],['하루','…응. 고마워, 똑딱.']],
  [['','뼈가 부딪히는 소리가 빠르게 다가온다. 딱딱딱딱— 신나게 뛰어오는 발소리.'],['백골 사냥개 (멀리서)','박동이다! 박동! 쫓아가도 돼? 쫓아가도 돼?!']]],
 [[['','은실 사이로 한 여인이 다리 난간에 앉아 자수를 놓는 환영. 실마다 노래가 스며든다.'],['기억 속 여인','사라지는 노래를 실로 붙잡아 두면, 언젠가 누가 다시 불러 주겠지.'],['하루','이 다리 전체가… 악보야.']],
  [['하루','이 노래, 할아버지가 흥얼거리던 거랑 비슷해.'],['똑딱','마을 사람들 모두 아는 노래일지도 몰라. 정적 때문에 잊어버렸을 뿐.'],['하루','돌아가면 다 같이 불러야겠다.']],
  [['','다리가 가늘게 떨린다. 거미줄 한 올이 튕기며 높은 음을 낸다.'],['실크 여제 (멀리서)','밟지 마… 그건 마지막 소절이야…']]],
 [[['','지붕 위로 오래전의 환영. 사람들이 처음으로 종을 달고 환호한다.'],['기억 속 사람들','울린다! 우리의 종이 울린다!'],['똑딱','이 종이 처음 울린 날이야. 마을이 생긴 날.']],
  [['하루','이 종탑, 우리 마을 한가운데잖아. 여기까지 왔다는 건…'],['똑딱','굶주림이 마을 안까지 들어왔다는 거야.'],['하루','…서두르자. 사람들이 다치기 전에.']],
  [['','벌집 전체가 떨린다. 수천의 날갯짓이 하나의 경보가 된다.'],['말벌 군주 (멀리서)','종을 멈춰라! 어머니가 깬다! 어머니가 깬다!']]],
 [[['','수정에 비친 무수한 얼굴들. 전망대에서 마을을 내려다보던 사람들의 환영이다.'],['기억 속 아이','거울아, 내 소원 보여?'],['기억 속 거울','보여. 모두 다 잘 되기를 바라는구나.'],['하루','…원래는 소원을 비추던 거울이었어.']],
  [['똑딱','수정에 네 얼굴 비쳤어. 되게 단단해 보여.'],['하루','처음 폐광에 들어갈 땐 다리가 후들거렸는데.'],['똑딱','(웃음) 알아. 나 그때 네 주머니 속에서 다 느꼈어.']],
  [['','수정 표면마다 눈동자가 떠오르며 일제히 이쪽을 본다.'],['수정 기생체 (멀리서)','보인다… 네 안의 두려움… 그리고, 그보다 큰 무언가…']]],
 [[['','잔잔한 수면 위로 오래전 마을 사람들이 둑을 쌓는 환영. 모두 흙투성이로 웃고 있다.'],['기억 속 사람들','이 물이 마을을 먹여 살릴 거야!'],['똑딱','그리고 물 밑에는… 가장 오래된 조용함이 잠들어 있었지.']],
  [['하루','똑딱, 굶주림이 말한 "언젠가"… 정말 오는 걸까. 모든 소리가 끝나는 날.'],['똑딱','…올지도 몰라. 근데 그게 오늘은 아니야.'],['하루','그럼 오늘은 싸우자.'],['똑딱','응. 오늘은.']],
  [['','물이 천천히 부풀어 오른다. 물속 깊은 곳에서 거대한 눈이 뜬다.'],['심연 아귀왕 (물속에서)','…종을 흔든 아이. 드디어 왔구나.']]],
 [[['','재 속에서 한 파수꾼이 기타를 치며 노래하는 환영. 밤새 마을을 지키며 부르던 노래.'],['기억 속 파수꾼','별이 지면 종이 울리고~ 종이 울리면 아침이 오네~'],['하루','재의 유령… 이 사람이었구나.']],
  [['하루','똑딱, 이제 하나 남았어.'],['똑딱','응. 끝나면 뭐 할 거야?'],['하루','할아버지랑, 윤서랑, 너랑… 종탑에 올라가서 아침 종을 칠 거야.'],['똑딱','(째깍) 그거 좋다. 진짜 좋다.']],
  [['','재가 거꾸로 하늘로 빨려 올라간다. 옥상 쪽에서 거대한 심장 소리가 느리게 울린다.'],['(굶주림의 목소리)','…와라. 마지막 조용함이 너를 기다린다.']]],
 [[['','심장 장치의 맥동 속에서, 그동안 만난 수호자들의 목소리가 하나씩 들려온다.'],['톱니 파수꾼의 목소리','…백이십구. 드디어 한 명이 지나갔다.'],['볼트 월의 목소리','깜빡, 깜빡, 깜빡! 힘내!'],['포자여왕의 목소리','…안 자고 여기까지 왔구나. 대견해.'],['똑딱','다들… 응원하고 있어.']],
  [['하루','똑딱. 고마워. 처음부터 끝까지 같이 와 줘서.'],['똑딱','무슨 소리야. 이제부터 시작이지. 우리 아침 종 쳐야 하잖아.'],['하루','(웃음) 그래. 약속했지.']],
  [['','옥상 전체가 숨을 들이쉰다. 그리고 세상의 모든 소리가 한순간 멈춘다.'],['태초의 굶주림','…오너라, 작은 박동아.']]],
];
function setupCaveStory(ci){if(!C||!CAVE_EV[ci])return;const rooms=C.rooms||[];if(rooms.length<3){C.storyEv=[];return}const n=rooms.length,idx=[Math.max(1,Math.round(n*.3)),Math.round(n*.55),Math.min(n-2,Math.round(n*.8))];const used=new Set();
 C.storyEv=CAVE_EV[ci].map((lines,k)=>{let ri=idx[k];while(used.has(ri)&&ri<n-1)ri++;used.add(ri);const rm=rooms[ri]||rooms[1];return {x:(rm.cx+.5)*CT,y:(rm.cy+.5)*CT,r:Math.max(46,Math.min(rm.rx||3,rm.ry||3)*CT*.6),lines,done:false,echo:k===0,kind:k}})}
function updateCaveStory(now){if(!C||!C.storyEv||dlg.active||C.state!=='walk')return;for(const ev of C.storyEv){if(ev.done)continue;if(Math.hypot(P.x-ev.x,P.y-ev.y)<ev.r){ev.done=true;ev.t=now;P.dash=null;if(ev.echo){C.flash=Math.max(C.flash,.25);sfx(520,.6,'sine',.03,780)}else if(ev.kind===2){C.shake=Math.max(C.shake,.35);sfx(70,.8,'sawtooth',.05,40)}
  say(ev.lines.map(l=>l[0]?l:['',l[1]]),()=>{ev.endT=performance.now()});break}}}
function drawCaveStory(now,cx,cy){if(!C||!C.storyEv)return;for(const ev of C.storyEv){if(!ev.echo)continue;const X=ev.x-cx,Y=ev.y-cy;if(X<-60||X>W+60||Y<-60||Y>H+60)continue;
  if(!ev.done){const a=.25+.2*Math.sin(now/300);for(let i=0;i<6;i++){const q=((now/1500)+i/6)%1;RA(X+Math.sin(i*2+now/500)*14,Y+6-q*26,2,2,'#bfe8ff',a*(1-q))}glow(X,Y,18,'#bfe8ff',.12+.06*Math.sin(now/400));continue}
  const since=ev.endT?now-ev.endT:0,a=ev.endT?Math.max(0,1-since/2500):1;if(a<=0)continue;
  for(let i=0;i<3;i++){const gx=X-26+i*26+Math.sin(now/600+i)*3,gy=Y-6+Math.sin(now/400+i*2)*2,h=i===1?20:14,fl=.55+.25*Math.sin(now/90+i*3);ctx.globalAlpha=a*fl;
   pcirc(gx,gy-h,4,'#dff6ff',a*fl);R(gx-4,gy-h+4,8,h-2,'#bfe8ff');R(gx-3,gy-h+4,6,1,'#ffffff');R(gx-2,gy-h-1,1,1,'#406a80');R(gx+1,gy-h-1,1,1,'#406a80');for(let k=0;k<3;k++)R(gx-4+k*3,gy-2+((Math.floor(now/120)+k)%2),2,2,'#bfe8ff');ctx.globalAlpha=1}
  glow(X,Y-8,34,'#bfe8ff',.12*a)}}
/*FEAT4_END*/
/*ENT_BEGIN*/
