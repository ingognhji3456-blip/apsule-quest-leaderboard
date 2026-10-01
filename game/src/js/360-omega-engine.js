/* ================= 챕터 1 최종 보스: 오메가 엔진 — 거짓 죽음 → 긴 회상(클릭 진행) → 깨달음 → 진정한 모습으로 부활 ================= */
const OMEGA_BI=9,REV_DUR=7600,REV_HP=.6,MEM0=1500;
const OMEGA_TRUE={c:'#ffd166'};
function tryRevive(now){const cfg=(typeof REVIVE_CFG!=='undefined')&&REVIVE_CFG[G.bi];if(!cfg||G.omRevived||mode!=='boss')return false;
 G.omRevived=true;clearPhraseHazards();G.vuln=null;G.exposed=false;G.clickTarget=null;G.hp=1;G.phase=2;
 G.cine={type:'revive',ph:'fall',t0:now,dur:REV_DUR,st:0,musOff:now,cfg,mset:cfg.mset};G.nextPlan=1e9;G.hitstop=now+650;G.shake=1.2;G.flash=1;P.inv=now+1e9;
 const g=bgeo();fxRing(g.x,g.coreY,now,1000,320,'#ffffff');fxRing(g.x,g.coreY,now+200,1200,380,G.B.c);
 sfx(70,1,'sawtooth',.1,28);mus.on=false;for(const h of (G.boss.hands||[]))h._revHide=true;return true}
function revResumeMusic(now){const c=G.cine;if(!c||c.musBack)return;c.musBack=1;const d=now-c.musOff;mus.T0+=d;G.T0+=d;mus.on=true;if(typeof musVol==='function')musVol(1)}
function updateRevive(now,beat){const c=G.cine,g=bgeo(),b=G.boss;
 if(c.ph==='fall'){const t=now-c.t0;b.slump=Math.min(1.6,t/900*1.6);
  if(t<1400&&RND()<.45){const ex=g.x+(RND()-.5)*g.w*1.2,ey=g.top+RND()*(g.y-g.top);fxRing(ex,ey,now,420,24+RND()*20,['#ffe79a','#ff9a5c','#ffffff'][Math.floor(RND()*3)]);for(let i=0;i<5;i++)G.parts.push({x:ex,y:ey,vx:(RND()-.5)*200,vy:-RND()*160,life:.8,max:.8,col:['#ffe79a','#ff9a5c','#fff'][i%3],s:3});sfx(70+RND()*120,.14,'sawtooth',.04,30)}
  if(RND()<.2)G.shake=Math.max(G.shake,.2);
  if(t>=MEM0){c.ph='mem';c.mem=true;c.si=0;c.li=0;c.lt0=now+700;c.st0=now;c.trans=null;c.memIn=now;sfx(46,.6,'sine',.14,40)}return}
 if(c.ph==='mem'){updateMemory(now);return}
 // --- 깨달음 이후: 기존 타임라인 (t는 1500부터 시작) ---
 const t=now-c.t0+1500;
 const ev=(k,fn)=>{if(t>=k&&!(c.st&(1<<ev.i)))c.st|=1<<ev.i,fn();ev.i++};ev.i=0;
 if(c.cfg.rise==='shatter'){ev(1700,()=>revGlitchSfx(0));ev(2250,()=>revGlitchSfx(1));ev(2700,()=>{revGlitchSfx(2);fxRing(g.x,g.coreY,now,700,120,c.cfg.col)})}else{ev(1700,()=>{sfx(46,.5,'sine',.16,40);G.shake=.35});ev(2250,()=>{sfx(46,.5,'sine',.18,40);G.shake=.45});ev(2700,()=>{sfx(50,.5,'sine',.2,40);G.shake=.55;fxRing(g.x,g.coreY,now,700,120,c.cfg.col)})}
 ev(3300,()=>{G.shake=1.4;G.flash=.9;sfx(40,2,'sawtooth',.14,20);sfx(90,1.2,'square',.08,500);for(let i=0;i<40;i++)G.parts.push({x:g.x,y:g.coreY,vx:(RND()-.5)*380,vy:(RND()-.5)*380,life:1.1,max:1.1,col:i%2?'#ff2d55':'#ffe36b',s:2+Math.floor(RND()*3)});fxRing(g.x,g.coreY,now,900,340,'#ff2d55')});
 for(let i=0;i<8;i++)ev(3400+i*110,()=>{sfx(160+i*40,.12,'square',.05,120+i*30);G.shake=Math.max(G.shake,.5)});
 if(t>3300&&t<4800)b.slump=Math.max(0,1.6-(t-3300)/1200*1.6);
 ev(4800,()=>{G.flash=1;G.shake=1.5;G.hitstop=now+260;sfx(30,2.4,'sawtooth',.14,15);for(const [d,col] of c.cfg.rings.map((q,i)=>[i*120,q]))fxRing(g.x,g.coreY,now+d,1300,420,col);
  for(let i=0;i<90;i++)G.parts.push({x:g.x,y:g.coreY,vx:(RND()-.5)*480,vy:(RND()-.5)*480,life:1.5,max:1.5,col:c.cfg.rings[i%c.cfg.rings.length],s:2+Math.floor(RND()*4)});
  c.cfg.onReboot();G._barLast=undefined;
  if(typeof song!=='undefined'&&song&&song.root!=null){song.root+=1;if(song.vol)song.vol*=1.05}revResumeMusic(now)});
 if(t>4900&&t<6700){const k=clamp((t-4900)/1600,0,1);G.hp=Math.max(1,Math.round(G.maxHp*REV_HP*k*k*(3-2*k)));G.hpShow=G.hp/G.maxHp;G._barLast=G.hpShow;if(Math.floor(t/90)!==Math.floor((t-16)/90))sfx(300+k*900,.06,'triangle',.04,320+k*900)}
 ev(6700,()=>{G.hp=Math.round(G.maxHp*REV_HP);G.hpShow=REV_HP;G._barLast=REV_HP;sfx(880,.5,'triangle',.06,1760)});
 if(t>=REV_DUR){revResumeMusic(now);G.cine=null;b.slump=0;for(const h of (b.hands||[]))h._revHide=false;G.nextPlan=beat+1.5;banner(c.cfg.banner);P.inv=now+900;G.shake=.6}}
function drawReviveCine(now){const c=G.cine;if(!c||c.type!=='revive')return;const g=bgeo();
 if(c.ph==='mem'){drawMemory(now);return}
 if(c.ph==='fall'){const t=now-c.t0,a=Math.min(1,t/300);R(0,0,W,30*a,'#000');R(0,H-30*a,W,30*a,'#000');RA(0,0,W,H,'#000',t/MEM0*.9);return}
 const t=now-c.t0+1500,p=t/REV_DUR;if(c.cfg.rise==='shatter'&&typeof drawRiseShatter==='function'){drawRiseShatter(now,t,c,g);return}
 const bar=30*(p>.95?(1-p)/.05:1);R(0,0,W,bar,'#000');R(0,H-bar,W,bar,'#000');
 const dk=t<3300?.85:t<4800?.85-(t-3300)/1500*.6:Math.max(0,.25-(t-4800)/1200*.25);RA(0,0,W,H,'#000',dk);
 if(t<4800){const beatK=[1700,2250,2700].reduce((m,k)=>Math.max(m,t>=k?Math.max(0,1-(t-k)/450):0),0);glow(g.x,g.coreY,18+beatK*26,c.cfg.col,.35+beatK*.55);pcirc(g.x,g.coreY,3+beatK*3,'#ffe36b')}
 if(t>3300&&t<6000&&Math.floor(now/60)%2===0){const s=Math.floor(now/60);for(let i=0;i<3;i++){const q=rng(s*3+i)();const ex=q<.5?(q<.25?AX:AX+AW):AX+rng(s*7+i)()*AW,ey=q<.5?AY+rng(s*11+i)()*AH:(q<.75?AY:AY+AH);revBolt(g.x,g.coreY,ex,ey,i%2?c.cfg.col:c.cfg.col2,s*5+i)}}
 ctx.textAlign='center';
 if(t>3300&&t<4800){const a=t>4550?(4800-t)/250:1,txt=c.cfg.cry,k=clamp((t-3350)/880,0,1),n=Math.ceil(txt.length*k),sc=t<3500?1+(3500-t)/200*.5:1;ctx.globalAlpha=clamp(a,0,1);RA(0,112,W,56,'#000',.55);
  ctx.save();ctx.translate(W/2,146);ctx.scale(sc,sc);ctx.font='bold 26px monospace';const full=ctx.measureText(txt).width;let cx=-full/2;ctx.textAlign='left';
  for(let i=0;i<n;i++){const ch=txt[i],cw=ctx.measureText(ch).width,jx=(RND()-.5)*3,jy=(RND()-.5)*3;ctx.fillStyle='#000';ctx.fillText(ch,cx+jx+2,jy+2);ctx.fillStyle=i%2?c.cfg.col:mixc(c.cfg.col,'#ffffff',.2);ctx.fillText(ch,cx+jx-1,jy);ctx.fillStyle='#ffffff';ctx.fillText(ch,cx+jx,jy);cx+=cw}
  ctx.restore();ctx.textAlign='center';ctx.font='bold 9px monospace';shText(c.cfg.who,W/2,126,c.cfg.col);ctx.globalAlpha=1}
 if(t>4850){const a=t<5050?(t-4850)/200:t>REV_DUR-400?(REV_DUR-t)/400:1;ctx.globalAlpha=clamp(a,0,1);ctx.font='bold 9px monospace';shText(c.cfg.t1,W/2,120,c.cfg.col2);ctx.font='bold 28px monospace';shText(c.cfg.t2,W/2,152,'#ffffff',c.cfg.col);
  if(t>5600){RA(0,214,W,34,'#000',.6);ctx.font='bold 10px monospace';shText('똑딱',W/2,226,'#7fd6ff');ctx.font='11px monospace';shText('"'+typed(c.cfg.tick,(t-5700)/1300)+'"',W/2,241,'#ffffff')}ctx.globalAlpha=1}
 ctx.textAlign='left';
 if(t>4800&&t<5600)RA(0,0,W,H,'#ffffff',(1-(t-4800)/800)*.85)}
/* ================= 오메가의 기억: 클릭해야 넘어가는 긴 회상 ================= */
const N5={C4:262,D4:294,E4:330,F4:349,G4:392,A4:440,B4:494,C5:523,D5:587,E5:659,F5:698,G5:784,A5:880,C6:1047};
const MSPK={'오메가':'#ff8fb0','윤서':'#b8d0ff','선':'#ffcf8a','태엽지기 선':'#ffcf8a','선 (편지)':'#ffcf8a','시계탑 자동인형':'#ffd9a8','정적':'#a8acb4','하루':'#9edbff','똑딱':'#7fd6ff','기술자':'#c8c8c8','기술자들':'#c8c8c8','첫 박동':'#ffd0e0','톱니 파수꾼':'#8eda9e','전령들':'#b89cff','철갑 열차':'#ffb45a','':'#c8c0c8'};
function MSC(){return (typeof G!=='undefined'&&G&&G.cine&&G.cine.mset)||MEM_SC}
const MEM_SC=[
 {title:'기록 00 · 설계도',tone:'#8ab8ff',draw:memS0,mel:['C5','E5','G5','E5','D5','F5','E5','C5'],st:420,lines:[
  ['오메가','…가장 처음 기억나는 건, 망치 소리였다.'],
  ['기술자','기술장님, 정말 이 크기로 세상 전체를 뛰게 할 수 있을까요?'],
  ['윤서','할 수 있어. 아니, 해야 해. 정적이 다시 오기 전에.'],
  ['윤서','심장은 박자가 생명이야. 한 치라도 어긋나면 세상이 비틀거려. 나사 하나까지 정성껏.'],
  ['오메가','나는 아직 뛰지 않았다. 그래도 그들의 목소리는 들렸다. 따뜻한 목소리였다.']]},
 {title:'기록 01 · 첫 박동',tone:'#ffcf8a',draw:memS1,mel:['E5','G5','A5','G5','E5','D5','C5','D5'],st:360,lines:[
  ['윤서','모두 물러서. 셋… 둘… 하나—'],
  ['오메가','쿵.'],
  ['기술자들','뛴다! 뛰고 있어! 시계들이 전부 맞춰 돌아가!'],
  ['오메가','그 순간, 세상의 모든 시계와 모든 심장이 나를 따라 뛰었다.'],
  ['윤서','(눈가를 닦으며) 잘 왔어, 오메가. 오늘부터 네가 세상의 심장이야.']]},
 {title:'기록 02 · 열 명의 수호자',tone:'#c8e0d0',draw:memSG,mel:['G4','C5','D5','E5','G5','E5','D5','C5'],st:380,hl:[[],[0,1,2],[3,4],[5,6],[7,8],[0],[0,1,2,3,4,5,6,7,8]],lines:[
  ['윤서','너 혼자 전부 짊어지게 하진 않을게. 너를 지킬 아이들을 만들었어.'],
  ['오메가','톱니 파수꾼은 문을 지키고, 볼트 월은 전압을 다스리고, 용광로 골렘은 열쇠를 벼렸다.'],
  ['오메가','철갑 열차는 사람들을 실어 나르고, 극저온 코어는 소중한 기억을 얼려 지켰다.'],
  ['오메가','스톰 하이브는 내 박동을 전하고, 자석 크레인은 잃어버린 것들을 모았다.'],
  ['오메가','시계탑 자동인형은 시간을 다듬고, 광학 요새는 먼 지평선을 지켜보았다.'],
  ['톱니 파수꾼','명령 수신. 박동을 지킨다. 누구도 심장에 닿게 하지 않는다.'],
  ['오메가','그날, 나에게 처음으로… 가족이 생겼다.']]},
 {title:'기록 30 · 종탑의 전령들',tone:'#ffb070',draw:memS2,mel:['C5','E5','G5','C6','G5','E5','G5','E5'],st:340,lines:[
  ['오메가','스톰 하이브의 전령 천이십사 기가 내 박동을 싣고 날아올랐다.'],
  ['전령들','(윙윙) 박동 수신— 종탑으로! 종탑으로!'],
  ['오메가','아침마다 종이 울리면, 사람들이 눈을 떴다.'],
  ['오메가','저녁마다 종이 울리면, 아이들이 잠들었다. "좋은 아침", 그리고 "잘 자요".'],
  ['오메가','나는 그 종소리가 좋았다. 그건 내가 세상에 건네는 인사였으니까.']]},
 {title:'기록 41 · 태엽지기',tone:'#ffcf8a',draw:memSK,mel:['E5','C5','D5','G4','C5','D5','E5','C5'],st:400,lines:[
  ['오메가','해마다 첫눈이 내리면, 한 사람이 긴 계단을 내려왔다.'],
  ['태엽지기 선','허허, 올해도 잘 버텼구나. 어디 태엽 좀 감아 보자.'],
  ['태엽지기 선','(끼릭… 끼릭…) 이 소리 들리냐? 네 박동이 다시 힘을 내는 소리다.'],
  ['오메가','태엽지기 선. 그의 열쇠 소리는, 내가 일 년 내내 기다리는 소리였다.'],
  ['태엽지기 선','내년에도 오마. 그 다음 해에도. 무릎이 허락하는 한, 꼭.'],
  ['오메가','…약속이었다.']]},
 {title:'기록 55 · 첫 박동을 안은 아이',tone:'#ffd9a8',draw:memS3,mel:['G4','C5','E5','D5','C5','E5','D5','G4'],st:400,lines:[
  ['오메가','나는 내 첫 박동을 조심스럽게 떼어, 시계탑의 아이에게 맡겼다.'],
  ['시계탑 자동인형','작습니다. 그리고… 따뜻합니다. 이것이 당신의 첫 박동입니까?'],
  ['오메가','그래. 내가 처음 뛰던 날의 조각이다. 소중히 해 다오.'],
  ['시계탑 자동인형','시침과 분침에 맹세합니다. 이 아이는 제가 지키겠습니다.'],
  ['첫 박동','…째깍.']]},
 {title:'기록 71 · 황혼의 승강장',tone:'#d88aff',draw:memS4,mel:['E5','D5','C5','A4','C5','D5','E5','D5'],st:420,lines:[
  ['오메가','어느 해, 지상에 오래 잠드는 병이 번졌다. 사람들은 떠나야 했다.'],
  ['윤서','수호자들아, 잘 지켜 줘. 우리는 잠시만 떠났다 올게.'],
  ['윤서','정적이 물러가면 꼭 돌아와서 오메가의 태엽을 감아 줄 거야. 약속이야.'],
  ['철갑 열차','…출발합니다. 이번이, 마지막 열차입니다.'],
  ['오메가','나는 대답하지 못했다. 심장은 말하는 법을 모른다. 그저 박동으로 배웅했다.']]},
 {title:'기록 88 · 오지 않은 겨울',tone:'#a8c8e8',draw:memSW,mel:['A4','C5','E5','C5','B4','G4','A4','E4'],st:480,lines:[
  ['오메가','사람들이 떠난 뒤에도, 태엽지기는 해마다 왔다. 혼자서. 조금씩 더 천천히.'],
  ['오메가','그런데 어느 겨울… 계단에서 아무 발소리도 들리지 않았다.'],
  ['선 (편지)','"수호자들에게. 올해는 무릎이 말을 듣지 않아 내려가지 못했다."'],
  ['선 (편지)','"내년엔 손주를 보내마. 그 아이는 나보다 손이 빠르다. 그때까지 심장을 부탁한다."'],
  ['오메가','…내년. 나는 그 한마디를 붙잡았다.']]},
 {title:'기록 99 · 기다림',tone:'#8a96a8',draw:memS5,mel:['A4','C5','E5','D5','C5','B4','A4','E4'],st:560,lines:[
  ['오메가','오늘도 아무도 오지 않았다. 괜찮다. 내일은 오겠지.'],
  ['오메가','태엽이 풀려 간다. 박동이 아주 조금씩 느려진다.'],
  ['오메가','수호자들도 하나둘 제자리에 멈춰 섰다. 문지기는 아무도 없는 문 앞에서 숫자를 세고 또 셌다.'],
  ['오메가','하루. 백 날. 천 날…'],
  ['오메가','…삼백 년째, 내일이다.']]},
 {title:'기록 100 · 정적',tone:'#a0a4ac',draw:memSH,mel:['E4','G4','A4','G4','E4','D4','E4','C4'],st:620,lines:[
  ['정적','…쉬어라.'],
  ['정적','아무도 오지 않는다. 그만 멈춰도 된다. 모두 잠들면, 아무도 외롭지 않다.'],
  ['오메가','아니다. 내가 멈추면 모두가 잠든다. 아직… 아직…'],
  ['정적','너는 이미 지쳤다. 네 안에 조금만 자리를 내어 다오.'],
  ['오메가','…그날부터 나는, 조금씩 정적의 목소리로 말하기 시작했다.']]},
 {title:'마지막 부탁',tone:'#ff8fb0',draw:memS6,mel:['E5','C5','A4','C5','E5','G5','E5','C5'],st:440,lines:[
  ['오메가','완전히 삼켜지기 전에, 나는 시계탑의 아이에게 맡긴 첫 박동을 불렀다.'],
  ['오메가','가거라, 작은 박동아. 지상으로. 태엽지기의 집으로.'],
  ['첫 박동','…째깍. 째깍.'],
  ['오메가','도와 달라고. …누군가, 와 달라고.'],
  ['오메가','그리고 나는, 그 부탁을 한 것조차 잊어버렸다.']]},
 {title:'지금',tone:'#ffffff',draw:memS7,now:true,mel:['C5','E5','G5','C6','E5','G5','C6','E5'],st:320,lines:[
  ['오메가','…열쇠 소리.'],
  ['하루','오메가! 정신 차려! 할아버지 대신 내가 왔어!'],
  ['똑딱','나야. 네 첫 박동. 약속대로… 태엽지기의 아이를 데려왔어!'],
  ['오메가','…돌아왔구나. 삼백 년 만에. 약속처럼— 누군가 와 주었다.'],
  ['오메가','내가 여기서 멈추면, 저 아이의 박동도… 세상의 아침도 멈춘다.'],
  ['오메가','그래. 그렇다면 나는—']]}];
function memLine(c){const S=MSC()[c.si];return S.lines[Math.min(c.li,S.lines.length-1)]}
function memTyped(c,now){const ln=memLine(c);return Math.max(0,Math.floor((now-c.lt0)/34))}
function memDone(c,now){return memTyped(c,now)>=memLine(c)[1].length}
function memProg(c,now){const S=MSC()[c.si];return clamp((c.li+Math.min(1,Math.max(0,now-c.lt0)/2500))/S.lines.length,0,1)}
function memClick(pt){const c=G.cine;if(!c||c.type!=='revive'||c.ph!=='mem')return;const now=performance.now();if(now-c.memIn<600||c.trans)return;if(MSC()[c.si].noBox&&now-c.st0<2500)return;
 if(pt&&pt.x>W-78&&pt.y<22&&c.si<MSC().length-1){c.trans={t0:now,to:MSC().length-1};sfx(300,.08,'triangle',.03,200);return}
 if(!memDone(c,now)){c.lt0=-1e9;return}
 const S=MSC()[c.si];if(c.li<S.lines.length-1){c.li++;c.lt0=now;sfx(880,.04,'sine',.02,880);return}
 c.trans={t0:now,to:c.si+1};sfx(520,.12,'triangle',.03,260)}
function skipMemory(){memClick(null)}
function updateMemory(now){const c=G.cine,b=G.boss;G.shake=0;b.slump=1.6;P.inv=now+1e9;
 const si=$('songInfo');if(si&&si.style.visibility!=='hidden'){si.style.visibility='hidden'}
 if(c.trans){const d=now-c.trans.t0;if(d>=320&&!c.trans.sw){c.trans.sw=1;if(c.trans.to>=MSC().length){if(c.epi){c.trans=null;c.mem=false;if(si)si.style.visibility='';const f=c.onEnd;G.cine=null;f&&f();return}c.ph='rise';c.mem=false;c.t0=now;c.trans=null;if(si)si.style.visibility='';G.flash=1;return}c.si=c.trans.to;c.li=0;c.lt0=now+350;c.st0=now;c.lastN=null}if(d>=640)c.trans=null}
 const S=MSC()[c.si],n=Math.floor((now-c.st0)/S.st),L=S.mel.length+3,ni=n%L;
 if(c.lastN!==n){c.lastN=n;const sty=MSC().style;if(sty&&typeof memMusicStyle==='function')memMusicStyle(sty,S,ni,n,now);else if(ni<S.mel.length){const f=N5[S.mel[ni]];sfx(f,.8,'triangle',.028,f);sfx(f/2,1,'sine',.018,f/2);if(ni===0)sfx(f*2,1.2,'sine',.012,f*2)}}}
/* 줄바꿈 */
function memWrap(txt,maxW){const out=[];let cur='';for(const ch of txt){const tt=cur+ch;if(ctx.measureText(tt).width>maxW&&cur){out.push(cur);cur=ch.trim()?ch:''}else cur=tt}if(cur)out.push(cur);return out}
function drawMemory(now){const c=G.cine;const sty=MSC().style;if(sty==='vhs'&&typeof drawMemVHS==='function'){drawMemVHS(now);return}if(sty==='diary'&&typeof drawMemDiary==='function'){drawMemDiary(now);return}ctx.save();R(0,0,W,H,'#000');
 const S=MSC()[c.si],k=memProg(c,now);S.draw(now,k,c);if(typeof memApplyCam==='function')memApplyCam(c,now,S);
 if(!S.now){RA(0,0,W,H,S.tone,.08);for(let i=0;i<60;i++){RA(RND()*W,RND()*H,1,1,RND()<.5?'#000000':'#ffffff',.22)}if(RND()<.1)RA(Math.floor(RND()*W),0,1,H,'#ffffff',.15);RA(0,0,W,H,'#000',RND()*.04)}
 for(let i=0;i<22;i++){const a=.45*(1-i/22);RA(0,22+i,W,1,'#000',a);RA(i,0,1,H,'#000',a*.8);RA(W-1-i,0,1,H,'#000',a*.8)}
 // 위 제목 · 건너뛰기
 R(0,0,W,22,'#000');ctx.textAlign='center';ctx.font='bold 9px monospace';shText(S.title,W/2,14,S.tone);
 ctx.font='8px monospace';ctx.textAlign='left';ctx.fillStyle='#6a6a74';ctx.fillText((c.si+1)+' / '+MSC().length,8,14);
 if(c.si<MSC().length-1){R(W-76,4,70,14,'#15121a');R(W-76,4,70,1,'#3a3444');ctx.textAlign='center';ctx.fillStyle='#b8b0c0';ctx.fillText('건너뛰기 ▶▶',W-41,14)}
 if(typeof memBusts==='function')memBusts(c,now,H-66);
 // 대화 상자
 const by=H-66;if(S.noBox){if(now-c.st0>2500&&Math.floor(now/500)%2===0){ctx.font='bold 9px monospace';ctx.textAlign='right';shText('클릭하면 넘어가요 ▶',W-12,H-10,'#ffffff');ctx.textAlign='left'}}else{R(0,by,W,66,'#000');RA(10,by+4,W-20,58,'#120c14',1);R(10,by+4,W-20,1,mixc(S.tone,'#000000',.4));
 const [spk,txt]=memLine(c),col=MSPK[spk]||'#ffffff';ctx.textAlign='left';
 if(spk){ctx.font='bold 10px monospace';const nw=ctx.measureText(spk).width;R(18,by-6,nw+12,14,'#120c14');R(18,by-6,nw+12,1,col);shText(spk,24,by+5,col)}
 ctx.font='12px monospace';const shown=txt.slice(0,memTyped(c,now)),rows=memWrap(txt,W-48);let used=0;
 rows.forEach((row,i)=>{const part=shown.slice(used,used+row.length);used+=row.length;shText(part,24,by+24+i*15,'#ffffff')});
 if(memDone(c,now)&&!c.trans&&Math.floor(now/400)%2===0){ctx.fillStyle=col;ctx.font='bold 10px monospace';ctx.textAlign='right';ctx.fillText(c.li<S.lines.length-1?'▼ 클릭':(c.si<MSC().length-1?'▶ 다음 기억':'▶ …'),W-20,H-8)}
 }ctx.textAlign='left';
 // 전환 페이드
 if(c.trans){const d=now-c.trans.t0,a=d<320?d/320:1-(d-320)/320;RA(0,0,W,H,c.trans.to>=MSC().length?'#ffffff':'#000',clamp(a,0,1))}
 const din=now-c.memIn;if(din<700)RA(0,0,W,H,'#000',1-din/700);
 ctx.restore()}
/* ---- 새 장면들 ---- */
function memS0(now,k){const t=now/1000;R(0,0,W,H,'#0c2440');for(let x=0;x<W;x+=16)R(x,0,1,H,'#143458');for(let y=0;y<H;y+=16)R(0,y,W,1,'#143458');
 for(const [r,a] of [[70,.5],[52,.35],[34,.3]])memRing(W/2,130,r,'#dff0ff',a);bbLine(W/2-90,130,W/2+90,130,'#dff0ff',.3);bbLine(W/2,40,W/2,215,'#dff0ff',.3);
 ctx.save();ctx.globalAlpha=.4+.2*k;memBoss(OMEGA_BI,W/2,190,now,3.2,0);ctx.restore();
 for(const sx of [W/2-80,W/2+80]){R(sx,60,3,160,'#8a6a3a');for(let y=70;y<220;y+=30)R(sx-18,y,39,2,'#6a4a2a')}R(W/2-100,58,200,3,'#8a6a3a');
 if(Math.floor(now/180)%3===0){const sx=W/2+(Math.floor(now/540)%2?-60:60),sy=150+(Math.floor(now/360)%3)*18;for(let i=0;i<5;i++)RA(sx+(RND()-.5)*10,sy+(RND()-.5)*8,1,1,'#ffe36b',1)}
 R(0,222,W,78,'#0a1a2c');memPerson(80,236,'#4a6a8a','#2a1a10','hammer',t*10,false,2);memPerson(400,236,'#6a4a3a','#1a1a1a','hammer',t*10+1.5,false,2);memPerson(335,236,'#3a5a4a','#6a3a1a','none',0,false,2);
 memPerson(150,236,'#e8e0d0','#e8722a','hold',0,true,2.5);R(142,220,16,10,'#dff0ff');R(144,222,12,1,'#6a8ab0');R(144,225,9,1,'#6a8ab0')}
function memSG(now,k,c){const t=now/1000;memSky('#0e0c14','#1e1a26',0,H);R(0,232,W,68,'#16121c');R(0,232,W,1,'#3a3444');
 const hl=(MEM_SC[2].hl[c.li]||[]),all=hl.length===0,pos=[[70,150],[155,150],[240,150],[325,150],[410,150],[110,226],[195,226],[285,226],[370,226]];
 glow(W/2,70,50,'#ff8fb0',.3);memBoss(OMEGA_BI,W/2,100,now,1.7,Math.pow(1-((t*1.4)%1),3));
 pos.forEach(([x,y],i)=>memBoss(i,x,y,now,1.5,0));if(!all){RA(0,22,W,H,'#08060c',.62);pos.forEach(([x,y],i)=>{if(!hl.includes(i))return;for(let d=22;d<y;d+=4)RA(x-6-d*.12,d,12+d*.24,4,'#fff6d0',.05);glow(x,y-20,34,'#fff6d0',.15);memBoss(i,x,y,now,1.5,0)})}}
function memSK(now,k,c){const t=now/1000;memSky('#1a120a','#3a2614',0,H);
 bbGear(60,70,40,16,t*.3,'#5a4228','#1a120a','#ffd166');bbGear(420,90,46,18,-t*.25,'#5a4228','#1a120a','#ffd166');bbGear(120,200,26,12,-t*.5,'#4a3620','#1a120a','#ffd166');
 memBoss(OMEGA_BI,340,210,now,2.4,Math.pow(1-((t*1.2)%1),3)*.6);R(0,232,W,68,'#140c06');R(0,232,W,1,'#5a4228');
 const kx=262,ky=172;pcirc(kx,ky,10,'#3a2a14');pcirc(kx,ky,7,'#8a6a3a');pcirc(kx,ky,3,'#140c06');
 const turning=c.li===2||c.li===1,ang=turning?t*3:0;bbLine(170,196,kx-4,ky+2,'#ffd166');bbLine(170,197,kx-4,ky+3,'#b8862a');const bw=Math.abs(Math.cos(ang))*7+1;for(let yy=-7;yy<=7;yy++){const ww=Math.sqrt(Math.max(0,49-yy*yy))*bw/7;R(166-ww,196+yy,ww*2,1,'#ffd166')}R(165,194,3,4,'#3a2a14');
 if(turning&&Math.floor(now/120)%2===0)for(let i=0;i<5;i++)RA(kx+(RND()-.5)*14,ky+(RND()-.5)*14,1,1,'#ffe36b',1);
 memPerson(150,232,'#6a4a2a','#d8d8d8','hold',0,false,4,'#e8e8e8')}
function memSW(now,k,c){const t=now/1000;memSky('#0a1424','#1a2a40',0,H);
 for(let i=0;i<12;i++){const x=60+i*28,y=250-i*16;R(x,y,40,6,'#3a4450');R(x,y,40,1,'#8a9aa8');R(x,y+6,40,250-y,'#222a34')}
 R(396,40,40,50,'#10161e');R(396,40,40,2,'#4a5a6a');R(412,26,4,10,'#4a5a6a');pcirc(414,24,4,'#2a3440');
 for(let i=0;i<70;i++){const r=rng(i*31),q=((t*.12)+r())%1;RA(r()*W+Math.sin(t+i)*6,q*H,r()<.3?2:1,r()<.3?2:1,'#e8f0ff',.7)}
 if(c.li>=2){const a=Math.min(1,(now-c.lt0)/500+(c.li>2?1:0)),y=90+(1-a)*20;ctx.save();ctx.globalAlpha=a;R(W/2-80,y,160,86,'#e8dcc0');R(W/2-80,y,160,2,'#fff4dc');R(W/2-80,y+84,160,2,'#b8a888');
  for(let l=0;l<6;l++)R(W/2-66,y+14+l*11,l===5?60:132,1,'#8a7a5a');ctx.font='bold 8px monospace';ctx.textAlign='right';ctx.fillStyle='#6a4a2a';ctx.fillText('— 선',W/2+70,y+80);ctx.textAlign='left';ctx.restore()}}
function memSH(now,k,c){const t=now/1000;memSky('#08080c','#14141a',0,H);
 memBoss(OMEGA_BI,W/2,200,now,3,0);ctx.save();ctx.globalCompositeOperation='saturation';ctx.globalAlpha=Math.min(.9,.4+k*.6);ctx.fillStyle='#808080';ctx.fillRect(0,0,W,H);ctx.restore();
 for(let i=0;i<70;i++){const r=rng(i*17+2),a=r()*TAU+t*.2*(r()<.5?1:-1),d=(1-k*.5)*(120+r()*100);pcirc(W/2+Math.cos(a)*d*1.4,140+Math.sin(a)*d*.7,10+r()*16,'#4a4c54',.22)}
 const fa=Math.min(1,.3+k);ctx.save();ctx.globalAlpha=fa;for(let dx=-1;dx<=1;dx+=2){for(let i=0;i<22;i++){const w=22-Math.abs(i-11)*1.6;R(W/2+dx*48-w/2+dx*i*.4,60+i*.5,w,1,'#d8dce4')}RA(W/2+dx*48-3,64,6,3,'#000000',.8)}for(let i=0;i<60;i++){R(W/2-30+i,104+Math.round(Math.sin(i*.2+t*2)*2),1,2,'#b8bcc4')}ctx.restore();
 for(let i=0;i<6;i++){let px=W/2+(i-2.5)*60,py=110;for(let s=0;s<14;s++){const nx=px+(W/2-px)*.12+Math.sin(t*2+i+s)*3,ny=py+6;bbLine(px,py,nx,ny,'#6a6c74',.6*fa);px=nx;py=ny}}
 glow(W/2,bgeo?140:140,16*(1-k*.6),'#ff2d55',.25*(1-k*.7))}

function revBolt(x0,y0,x1,y1,col,seed){const r=rng(seed);let px=x0,py=y0;const n=9;for(let i=1;i<=n;i++){const k=i/n,nx=lerp(x0,x1,k)+(i<n?(r()-.5)*26:0),ny=lerp(y0,y1,k)+(i<n?(r()-.5)*26:0);line(px,py,nx,ny,1,(a,b)=>{R(a-1,b-1,3,3,col);R(a,b,1,1,'#ffffff')});px=nx;py=ny}}
/* 폭주 후: 화려한 오라 (무지개 에너지 날개 · 궤도 룬 · 박자 맥동) */
function drawOmegaAura(now,back){if(G.revForm==='mutant'){if(typeof drawMutantAura==='function')drawMutantAura(now,back);return}if(!G.omega||G.state==='dying'||G.bi!==OMEGA_BI)return;const g=bgeo(),t=now/1000,hw=g.hf*U,cy=g.coreY,cols=['#ffd166','#fff8ec','#ff3a6a','#7fe8ff','#ffe9b0','#ff8fb0'];
 const fr=(typeof G.beat==='number')?((G.beat%1)+1)%1:0,pulse=Math.pow(1-fr,3);
 if(back){glow(g.x,cy,70+pulse*18,'#ffd166',.18+pulse*.16);
  for(const s of [-1,1])for(let k=0;k<6;k++){const len=60+k*9+Math.sin(t*3+k)*6,ang=(-.9+k*.28)+Math.sin(t*2+k*.5)*.06;const x0=g.x+s*hw*.6,y0=cy-6;for(let i=0;i<len;i+=3){const q=i/len,px=x0+s*Math.cos(ang)*i,py=y0+Math.sin(ang)*i-Math.sin(q*Math.PI)*10;RA(px-1,py-1,3,3,cols[(k+Math.floor(t*6))%6],(1-q)*.55)}}}
 else{for(let i=0;i<6;i++){const a=t*1.6+i*TAU/6,rx=hw+26,ry=18,px=g.x+Math.cos(a)*rx,py=cy+Math.sin(a)*ry;if(Math.sin(a)<0&&back)continue;const col=cols[i];pcirc(px,py,3.5,'#140408');R(px-2,py-1,5,1,col);R(px-2,py+1,1,2,col);R(px+2,py+1,1,2,col);R(px-1,py-2,3,1,col);RA(px-4,py-4,9,9,col,.18)}
  if(pulse>.6){RA(AX,AY,AW,2,'#ffd166',pulse*.5);RA(AX,AY+AH-2,AW,2,'#ffd166',pulse*.5);RA(AX,AY,2,AH,'#ffd166',pulse*.5);RA(AX+AW-2,AY,2,AH,'#ffd166',pulse*.5)}
  if(Math.floor(now/70)%5===0){const s=Math.floor(now/70);revBolt(g.x+(rng(s)()-.5)*hw*2,g.top,g.x+(rng(s+1)()-.5)*hw*3,g.top-24,cols[s%6],s)}}}
/* --- 공용 그리기 --- */
function memSky(top,bot,y0,y1){const n=Math.max(1,Math.ceil((y1-y0)/4));for(let i=0;i<n;i++)R(0,y0+i*4,W,4,mixc(top,bot,i/(n-1||1)))}
function memPerson(x,y,body,hair,arms,t,long,sc,beard){const s=sc||1,P2=(a,b,w,h,c)=>R(x+a*s,y+b*s,w*s,h*s,c);
 P2(-2,-7,4,7,body);P2(-2,0,1,3,'#1a1418');P2(1,0,1,3,'#1a1418');P2(-2,-11,4,4,'#f0c8a0');P2(-2,-12,4,2,hair);if(long){P2(-3,-11,1,5,hair);P2(2,-11,1,5,hair)}
 if(s>=2){P2(-1,-10,1,1,'#2a1a1a');P2(1,-10,1,1,'#2a1a1a')}if(beard){P2(-2,-8,4,2,beard);P2(-1,-7,2,1,beard)}
 if(arms==='up'){const w=Math.round(Math.sin(t)*1);P2(-3,-11+w,1,4,body);P2(2,-11-w,1,4,body)}
 else if(arms==='wave'){P2(-3,-6,1,4,body);const w=Math.round(Math.sin(t)*1.5);P2(2,-10+w,1,4,body);P2(2,-11+w,1,1,'#f0c8a0')}
 else if(arms==='hammer'){P2(-3,-6,1,4,body);const w=Math.sin(t)>0?-3:0;P2(2,-8+w,1,3,body);P2(2,-10+w,1,2,'#6a4a2a');P2(1,-11+w,3,1,'#8a8a90')}
 else if(arms==='hold'){P2(-3,-6,1,3,body);P2(2,-6,1,3,body);P2(-2,-4,4,1,'#f0c8a0')}
 else{P2(-3,-6,1,4,body);P2(2,-6,1,4,body)}}
function memRing(x,y,r,col,a){for(let i=0;i<48;i++){const q=i*TAU/48;RA(x+Math.cos(q)*r,y+Math.sin(q)*r*.55,2,1,col,a)}}
function memBo(p){return {pulse:p||0,expose:false,open:0,eye:0,dorm:false,flash:false,warn:0}}
function memBoss(bi,x,y,now,u,p){try{drawMech(ctx,BOSSES[bi],x,y,now,memBo(p),u)}catch(e){}}
/* 1 첫 박동: 반응로 홀, 환호하는 기술자들 */
function memS1(now,k){const t=now/1000,p=Math.pow(1-((t*1.4)%1),3);memSky('#1a0e0a','#4a2a18',0,H);
 for(let i=0;i<9;i++){const x=20+i*56;R(x,40,6,170,'#2a1810');R(x+1,40,1,170,'#5a3a24')}R(0,205,W,95,'#241408');R(0,205,W,2,'#8a5a30');
 glow(W/2,140,90,'#ffcf8a',.18+p*.2);memBoss(OMEGA_BI,W/2,190,now,3.2,p);for(let j=0;j<3;j++)memRing(W/2,140,30+((t*60+j*40)%120),'#ffe9b0',.5*(1-((t*60+j*40)%120)/120));
 const ppl=[[60,'#4a6a8a','#2a1a10'],[95,'#6a4a3a','#8a5a2a'],[130,'#3a5a4a','#1a1a1a'],[350,'#5a4a6a','#3a2a1a'],[380,'#6a6a4a','#1a1410'],[410,'#4a4a6a','#6a3a1a']];
 for(let i=0;i<ppl.length;i++){const [x,bc,hc]=ppl[i];memPerson(x,228,bc,hc,'up',t*9+i,false,2)}
 memPerson(170,228,'#e8e0d0','#e8722a','hold',0,true,2.5);R(166,214,9,7,'#ffffff');R(167,216,6,1,'#8a8a8a');R(167,218,5,1,'#8a8a8a');
 for(let i=0;i<24;i++){const q=((t*.4)+i/24)%1,x=(i*67)%W;RA(x+Math.sin(t*2+i)*6,q*210,2,2,i%3?'#ffe36b':'#ff8fb0',.8*(1-q))}}
/* 2 종탑의 전령들: 새벽 하늘, 종탑, 날아가는 드론 */
function memS2(now,k){const t=now/1000;memSky('#1a2450','#ffb070',0,200);const sy=200-k*24;pcirc(110,sy,24,'#ffe0a0');glow(110,sy,60,'#ffcf8a',.25);
 R(0,196,W,104,'#1a1420');for(let i=0;i<12;i++){const x=i*42-10,h=18+((i*37)%20);R(x,196-h,34,h,'#221a2a');bbTriV(x,196-h,34,10,'#221a2a',-1);if(i%2)R(x+12,196-h+8,4,4,'#ffcf6a')}
 const tx=372;R(tx,70,34,130,'#2a2030');R(tx+2,70,2,130,'#4a3a50');bbTriV(tx-4,70,42,26,'#3a2a3a',-1);R(tx+8,86,18,20,'#140c14');const sw=Math.sin(t*4)*.35;
 ctx.save();ctx.translate(tx+17,88);ctx.rotate(sw);R(-6,0,12,10,'#d8a040');R(-7,9,14,2,'#f0c060');R(-1,11,2,2,'#8a6020');ctx.restore();
 if(Math.sin(t*4)>.9){memRing(tx+17,98,20+((t*80)%30),'#ffe9b0',.6)}
 memBoss(5,60,120,now,1.4,0);
 for(let i=0;i<14;i++){const q=((k*1.3)+i/14)%1,x=60+q*(tx-60),y=110-Math.sin(q*Math.PI)*50+Math.sin(t*6+i)*3+((i%3)-1)*8,fl=Math.floor(now/60+i)%2;RA(x-10,y,10,1,'#ffe9b0',.35);R(x-2,y-1,4,3,'#6a5aa8');R(x-3,y-2-fl,2,1,'#e8dcff');R(x+1,y-2-fl,2,1,'#e8dcff');R(x,y,1,1,'#ffe36b')}}
/* 3 첫 박동을 안은 아이: 큰 시계판 앞의 자동인형 */
function memS3(now,k){const t=now/1000,p=Math.pow(1-((t*1.2)%1),3);memSky('#2a1a14','#4a3020',0,H);
 pcirc(W/2,120,96,'#3a2a1c');pcirc(W/2,120,92,'#e8d8b8');pcirc(W/2,120,86,'#f4ead4');for(let i=0;i<12;i++){const q=i*TAU/12;R(W/2+Math.cos(q)*78-2,120+Math.sin(q)*78-2,4,4,'#6a4a2a')}
 const mh=t*.5,hh=t*.05;bbLine(W/2,120,W/2+Math.cos(mh)*64,120+Math.sin(mh)*64,'#3a2a1c');bbLine(W/2,120,W/2+Math.cos(hh)*40,120+Math.sin(hh)*40,'#3a2a1c');
 bbGear(50,90,22,12,t*.6,'#8a6a3a','#2a1a10','#ffe36b');bbGear(430,160,28,14,-t*.5,'#8a6a3a','#2a1a10','#ffe36b');bbGear(70,230,16,10,-t,'#6a4a2a','#2a1a10','#ffe36b');
 R(0,240,W,60,'#1a100a');memBoss(7,W/2,248,now,3,0);
 const ox=W/2,oy=196;glow(ox,oy,26+p*8,'#ff8fb0',.35+p*.3);pcirc(ox,oy,6+p*1.5,'#ffd0e0');pcirc(ox,oy,3,'#ffffff');memRing(ox,oy,10+p*10,'#ffd0e0',.5*p)}
/* 4 황혼의 승강장: 떠나는 열차, 손 흔드는 윤서, 남겨진 철갑 열차 */
function memS4(now,k){const t=now/1000;memSky('#2a1440','#ff9a5a',0,190);pcirc(360,188,30,'#ffb070');R(0,176,W,20,'#3a2440');
 R(0,196,W,104,'#1a1220');R(0,214,W,4,'#e8c040');for(let i=0;i<W;i+=16)R(i,214,8,4,'#1a1a1a');
 for(const lx of [60,240,420]){R(lx,120,3,94,'#2a2030');R(lx-4,116,11,4,'#3a3040');glow(lx+1,124,20,'#ffcf6a',.3);pcirc(lx+1,122,3,'#ffe9b0')}
 const tx=150+Math.max(0,k-.45)*620;R(0,198,W,2,'#6a6a70');
 for(let cI=0;cI<3;cI++){const cx=tx+cI*112;R(cx,142,104,56,'#3a4a5a');R(cx,142,104,3,'#8aa0b0');R(cx,190,104,8,'#2a3440');for(let w=0;w<5;w++){R(cx+8+w*19,154,13,14,'#ffe9a8');if(!(cI===0&&w===1))memPerson(cx+14+w*19,168,'#4a4a6a','#2a1a1a','none',0,false)}
  pcirc(cx+18,199,6,'#1a1a1a');pcirc(cx+86,199,6,'#1a1a1a')}
 memPerson(tx+33,168,'#e8e0d0','#e8722a','wave',t*8,true);
 memBoss(3,70,212,now,2.4,0)}
/* 5 기다림: 빈 반응로, 흘러가는 날짜, 스며드는 정적 */
function memS5(now,k){const t=now/1000;
 memSky('#101418','#20262e',0,H);for(let i=0;i<9;i++){const x=20+i*56;R(x,40,6,170,'#1a1e24')}R(0,205,W,95,'#14181c');
 const p=Math.pow(1-((t*.6)%1),4)*(1-k*.7);glow(W/2,140,60,'#ff8fb0',.1+p*.15);memBoss(OMEGA_BI,W/2,190,now,3.2,p*.5);ctx.save();ctx.globalCompositeOperation='saturation';ctx.globalAlpha=.85;ctx.fillStyle='#808080';ctx.fillRect(0,0,W,H);ctx.restore();RA(0,0,W,H,'#000',.25);
 for(let i=0;i<60;i++){const r=rng(i*13+5),a=r()*TAU,d=(1-k*.75)*260+r()*40,x=W/2+Math.cos(a)*d*1.2,y=140+Math.sin(a)*d*.7;pcirc(x,y,8+r()*14,'#5a5e66',.18+k*.2)}
 const day=Math.floor(Math.pow(k,3)*109500)+1;ctx.font='bold 12px monospace';ctx.textAlign='right';shText('D+'+day.toLocaleString('en-US'),W-16,44,'#c8ccd4');ctx.font='9px monospace';shText(k>.85?'(삼백 년)':'(아무도 오지 않음)',W-16,56,'#8a8e96');ctx.textAlign='left';
 for(let i=0;i<20;i++){const q=((t*.08)+i/20)%1;RA((i*97)%W,q*H,1,1,'#c8ccd4',.4)}}
/* 6 마지막 부탁: 정적에 삼켜지는 심장, 떨어져 나가는 작은 박동 */
function memS6(now,k){const t=now/1000;memSky('#080610','#140c18',0,H);
 for(let i=0;i<40;i++){const r=rng(i*7+3),a=r()*TAU+t*.3*(r()<.5?1:-1),d=40+r()*70*(1-k*.3);pcirc(W/2+Math.cos(a)*d*1.3,90+Math.sin(a)*d*.6,6+r()*10,'#3a3a44',.35)}
 memBoss(OMEGA_BI,W/2,120,now,2.2,0);RA(0,0,W,150,'#1a1a24',.35);
 const q=clamp((k-.2)/.6,0,1),oy=80+q*q*170,ox=W/2+Math.sin(q*6)*8;
 for(let i=0;i<14;i++){const s=i*6;RA(ox-1,oy-s,3,3,'#ff8fb0',.5*(1-i/14))}glow(ox,oy,16,'#ff8fb0',.6);pcirc(ox,oy,4,'#ffd0e0');pcirc(ox,oy,2,'#ffffff');
 for(let i=0;i<4;i++){const y=170+i*22-(q*40)%22;R(0,y,W,1,'#2a1e2a')}
 const hx=W/2+60,hy=262;R(hx-14,hy-12,28,14,'#2a2030');bbTriV(hx-17,hy-12,34,10,'#3a2a3a',-1);R(hx-4,hy-8,6,6,'#ffcf6a');glow(hx-1,hy-5,14,'#ffcf6a',.3)}
/* 7 지금: 하루와 똑딱 — 돌아온 박동 */
function memS7(now,k){const t=now/1000;memSky('#1a0a14','#3a1424',0,H);
 for(let i=0;i<9;i++){const a=Math.PI/2+(i-4)*.13+Math.sin(t*.5+i)*.02;for(let d=0;d<240;d+=4)RA(W/2+Math.cos(a)*d-3,22+Math.sin(a)*d,6,4,'#ff8fb0',.045*(1-d/240))}
 glow(W/2,22,110,'#ff5d8f',.22);R(0,206,W,94,'#1a0a12');R(0,206,W,1,'#5a2a3a');for(let i=0;i<W;i+=24)R(i,207,12,1,'#2a1420');
 const kx=W/2-12,ky=176;glow(kx,ky,14,'#ffd166',.35+.15*Math.sin(t*4));
 try{drawKnight(ctx,W/2-30,204,3,false,null,t*2)}catch(e){}
 R(kx-1,ky-6,2,10,'#ffd166');pcirc(kx,ky-8,3,'#ffd166');pcirc(kx,ky-8,1.4,'#1a0a12');R(kx+1,ky+2,3,1,'#ffd166');
 const p=Math.pow(1-((t*1.4)%1),3);glow(W/2+40,140,24+p*10,'#ffd0e0',.3+p*.3);try{drawTick(ctx,W/2+40,140+Math.sin(t*3)*3,now,2)}catch(e){}
 for(let i=0;i<14;i++){const q=((t*.3)+i/14)%1;RA(W/2-120+((i*53)%240),200-q*170,1,1,'#ffd0e0',(1-q)*.8)}
 if(k>.7){const a=(k-.7)/.3;RA(0,0,W,H,'#ffffff',a*a*.3)}}
/* ================= 오메가 엔진 · 진정한 모습 (부활 후 완전히 다른 디자인) =================
   하얀 금빛 심장 갑주 + 유리창 속 뛰는 붉은 수정 심장 + 회전하는 두 겹 시계 고리 + 금관 종탑 + 궤도를 도는 시침·분침 칼날 + 빛의 사슬 */
const _heartCache={};
function heartRows(w,h){const key=w+'x'+h;if(_heartCache[key])return _heartCache[key];const rows=[];
 for(let j=0;j<h;j++){const Y=1.25-2.5*(j+.5)/h;const segs=[];let inS=-1;for(let i=0;i<=w;i++){const X=i<w?-1.3+2.6*(i+.5)/w:9;const v=Math.pow(X*X+Y*Y-1,3)-X*X*Y*Y*Y;const ins=i<w&&v<=0;if(ins&&inS<0)inS=i;if(!ins&&inS>=0){segs.push([inS,i-inS]);inS=-1}}rows.push(segs)}
 return (_heartCache[key]=rows)}
function bbTriVc(cc,x,y,w,h,col,dir){cc.fillStyle=col;cc.globalAlpha=1;for(let k=0;k<h;k++){const ww=Math.max(1,Math.round(w*(1-k/h)));cc.fillRect(Math.round(x+(w-ww)/2),Math.round(dir>0?y+k:y-k-1),ww,1)}}
function drawOmegaTrue(cc,x,y,now,bo,u){u=u||U;const s=u/5,g=geo(BOSSES[OMEGA_BI],x,y,u),cx=x,cy=g.coreY,t=now/1000;
 const F=(a,b,w,h,col,al)=>{cc.globalAlpha=al==null?1:al;cc.fillStyle=col;cc.fillRect(Math.round(a),Math.round(b),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)))};
 const C=(a,b,r,col,al)=>pcirc(a,b,Math.max(.6,r),col,al==null?1:al,cc);
 const LN=(x0,y0,x1,y1,col,w,al)=>{const n=Math.max(1,Math.ceil(Math.hypot(x1-x0,y1-y0)));for(let i=0;i<=n;i++)F(x0+(x1-x0)*i/n-w/2,y0+(y1-y0)*i/n-w/2,w,w,col,al)};
 const pulse=bo&&bo.pulse||0,fl=bo&&bo.flash;
 const WH='#fff8ec',IV='#efe0bc',GD='#ffd166',DG='#b8862a',DK='#1c1220',HT='#ff3a6a',HH='#ffb0c8',CY='#7fe8ff';
 // 1) 빛의 사슬 · 에너지 꼬리
 for(const sx of [-1,1])for(let k=0;k<2;k++){let px=cx+sx*(10+k*8)*s,py=cy+22*s;for(let i=0;i<9;i++){const nx=px+Math.sin(t*2+i*.7+k)*2*s,ny=py+5*s;F(nx-1.5*s,ny-1*s,3*s,2*s,i%2?GD:DG,.9-i*.08);px=nx;py=ny}}
 for(let i=0;i<6;i++){const q=((t*1.2)+i/6)%1;C(cx+Math.sin(t*3+i)*4*s,cy+26*s+q*40*s,(3-q*2)*s,i%2?WH:GD,.5*(1-q))}
 // 2) 뒤 시계 고리 (바깥: 로마 눈금, 안쪽: 톱니)
 const R1=54*s,R2=44*s,a1=t*.35,a2=-t*.6;
 for(let i=0;i<96;i++){const q=i*TAU/96;F(cx+Math.cos(q)*R1-1*s,cy+Math.sin(q)*R1*.92-1*s,2*s,2*s,GD,.9)}
 for(let i=0;i<12;i++){const q=a1+i*TAU/12,bx=cx+Math.cos(q)*R1,by=cy+Math.sin(q)*R1*.92;F(bx-2.5*s,by-2.5*s,5*s,5*s,DK);F(bx-1.5*s,by-1.5*s,3*s,3*s,i%3?IV:WH)}
 for(let i=0;i<72;i++){const q=a2+i*TAU/72;F(cx+Math.cos(q)*R2-1*s,cy+Math.sin(q)*R2*.92-1*s,(i%3?1:2.5)*s,(i%3?1:2.5)*s,i%3?DG:GD,.85)}
 // 3) 빛 날개 (여섯 장의 칼날)
 for(const sd of [-1,1])for(let k=0;k<3;k++){const ang=-.35-k*.42+Math.sin(t*2+k)*.05,len=(46+k*6)*s,bx=cx+sd*16*s,by=cy-4*s;
  for(let i=0;i<len;i+=1.5*s){const q=i/len,wdt=(6*(1-q)+1)*s,px=bx+sd*Math.cos(ang)*i,py=by+Math.sin(ang)*i;F(px-wdt/2,py-wdt/2,wdt,wdt,q<.15?GD:mixc(WH,'#ffe9b0',q),.85-q*.3)}
  const ex=bx+sd*Math.cos(ang)*len,ey=by+Math.sin(ang)*len;C(ex,ey,2*s,WH);C(ex,ey,1*s,CY)}
 // 4) 원래 오메가의 몸 (실루엣 유지)
 try{drawMech(cc,BOSSES[OMEGA_BI],x,y,now,bo,u)}catch(e){}
 const bw2=g.hf*u,top=g.top,bot=g.y,rr=rng(9091);
 // 금빛으로 이어 붙인 균열 (부서졌던 자리가 빛나는 선으로)
 for(let i=0;i<9;i++){let px=cx+(rr()-.5)*bw2*1.4,py=top+rr()*(bot-top)*.9;const n=3+Math.floor(rr()*3);for(let k=0;k<n;k++){const nx=px+(rr()-.5)*10*s,ny=py+(rr()-.2)*8*s;LN(px,py,nx,ny,GD,Math.max(1,1.2*s),.95);LN(px,py-1,nx,ny-1,WH,1,.35+.3*Math.sin(t*5+i+k));px=nx;py=ny}}
 // 어깨 갑주 · 추가 장갑판
 for(const sd of [-1,1]){const ax=cx+sd*(bw2+2*s),ay=top+4*s;for(let k=0;k<3;k++){F(ax-(sd<0?8:0)*s+sd*k*2*s,ay+k*3*s,8*s,2*s,k===0?GD:DG);F(ax-(sd<0?8:0)*s+sd*k*2*s,ay+k*3*s,8*s,1,WH,.6)}bbTriVc(cc,ax+sd*6*s-2*s,ay-1,4*s,7*s,GD,-1)}
 // 몸통 옆 추가 배기관 · 안테나
 for(const sd of [-1,1])for(let k=0;k<3;k++){const px=cx+sd*(bw2*.55+k*5*s),py=top-2*s-k*3*s;F(px-1*s,py-(6+k*2)*s,2*s,(6+k*2)*s,DG);F(px-1*s,py-(6+k*2)*s,2*s,1*s,GD);if(Math.floor(t*6+k+sd)%3===0)C(px,py-(8+k*2)*s,1.2*s,CY)}
 // 5) 유리창 속 수정 심장
 const cr=8*s;C(cx,cy+4*s,cr+2*s,DK);C(cx,cy+4*s,cr,'#2a0a14');C(cx,cy+4*s,cr-1.5*s,'#3a0e1c');
 const ps=1+pulse*.18+Math.max(0,Math.sin(t*9))*.05,iw=Math.max(4,Math.round(10*s*ps)),ih=Math.max(4,Math.round(9*s*ps)),ir=heartRows(iw,ih),ix=Math.round(cx-iw/2),iy=Math.round(cy+4*s-ih/2);
 ir.forEach((segs,j)=>segs.forEach(([a,w])=>{F(ix+a,iy+j,w,1,j<ih*.3?HH:HT)}));F(ix+iw*.25,iy+ih*.2,2*s,2*s,WH);
 C(cx,cy+4*s,cr+4*s,HT,.12+pulse*.25);for(let i=0;i<8;i++){const q=i*TAU/8+t;F(cx+Math.cos(q)*(cr-1*s)-.5,cy+4*s+Math.sin(q)*(cr-1*s)-.5,1,1,WH,.6)}
 // 6) 금관 종탑
 const ty=g.headY-6*s;for(let i=-2;i<=2;i++){const sx=cx+i*9*s,h2=(i===0?20:Math.abs(i)===1?14:9)*s,fy=ty-h2+Math.sin(t*2+i)*1.5*s;F(sx-2*s,fy,4*s,h2,GD);F(sx-2*s,fy,1*s,h2,WH);for(let k=0;k<4;k++)F(sx-(2-k*.5)*s,fy-(k+1)*s,(4-k)*s,1*s,GD);C(sx,fy-5*s,1.6*s,i===0?HT:CY)}
 const bs=Math.sin(t*3)*.4;F(cx-3*s+bs*3*s,ty-30*s,6*s,5*s,GD);F(cx-4*s+bs*3*s,ty-25*s,8*s,1.5*s,WH);
 // 7) 궤도를 도는 시침 · 분침 칼날
 for(const [len,sp,col,wd] of [[40,.9,GD,3],[52,-1.4,WH,2]]){const q=t*sp,ex=cx+Math.cos(q)*len*s,ey=cy+Math.sin(q)*len*s*.6;LN(cx+Math.cos(q)*20*s,cy+Math.sin(q)*12*s,ex,ey,col,wd*s,.95);C(ex,ey,2.4*s,col);C(ex,ey,1*s,HT)}
 C(cx,cy+4*s,2*s,GD);
 cc.globalAlpha=1}

if(typeof cv!=='undefined'&&cv&&cv.addEventListener){cv.addEventListener('pointerdown',e=>{if(mode!=='boss'||!G||!G.cine||G.cine.type!=='revive'||G.cine.ph!=='mem')return;e.preventDefault();const rc=cv.getBoundingClientRect();memClick({x:(e.clientX-rc.left)*W/rc.width,y:(e.clientY-rc.top)*H/rc.height})});
 addEventListener('keydown',e=>{if(e.code==='Enter'&&mode==='boss'&&G&&G.cine&&G.cine.type==='revive'&&G.cine.ph==='mem'&&!e.repeat){e.preventDefault();memClick(null)}})}
/*OMG_END*/
/*MOB_BEGIN*/
