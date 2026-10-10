/* ================= v126 이스터에그 8가지 + 비밀 도감 (EGG126) =================
   찾은 기록은 saveData.egg126 = {f:{id:처음 찾은 시각}, lines:{보스 번호:1}, fairy:0, retro:0}
   ① logo    로비 왼쪽 위 「BEAT BLADE」 글자를 3초 안에 10번 누르기 → 무대가 뒤집히며 댄스 타임
   ② fount   광장 분수 앞에서 공격 키(또는 「🪙 동전 던지기」) → 🪙10을 던져 소원, 1% 확률로 분수의 요정
   ③ load    로딩 화면의 캐릭터를 누르기 → 꽈당
   ④ konami  로비에서 ↑↑↓↓←→←→BA → 레트로 모드(다시 하면 꺼짐)
   ⑤ f777    탑 화면의 「꼭대기」 단추를 7번(최고 77F 이상) → 비밀의 777F · 거울 하루(체력 2.5배)
   ⑥ beat    로비 음악 박자에 딱 맞춰 들어가기 → PERFECT ENTRY
   ⑦ line    보스를 한 대도 안 맞고(PERFECT) 깨면 그 보스의 숨은 한마디. 70개 다 모으면 큰 보상
   ⑧ night   실제 시각 밤 12시(0시대)에 로비 → 밤하늘 무대 + 유령 펫
   명예의 전당 「🔍 비밀 도감」에서 찾은 것 · 힌트를 본다. */
(()=>{try{
 const $=id=>document.getElementById(id),E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const sfx=k=>{try{gmSfx(k)}catch(e){}},save=()=>{try{saveNow()}catch(e){}};
 const SD=()=>{const s=saveData.egg126||(saveData.egg126={f:{},lines:{},fairy:0,retro:0});if(!s.f)s.f={};if(!s.lines)s.lines={};return s};
 const EG=[
  {id:'logo',ic:'💃',n:'댄스 타임',hint:'로비의 커다란 이름을 여러 번 두드려 보세요.',how:'로비 「BEAT BLADE」 글자를 3초 안에 10번',dia:5},
  {id:'fount',ic:'⛲',n:'분수의 소원',hint:'광장 한가운데 물소리가 나는 곳에서 무언가를 던져 보세요.',how:'광장 분수 앞에서 공격 키 · 「🪙 동전 던지기」 (1% 확률로 분수의 요정)',dia:2},
  {id:'load',ic:'🤕',n:'꽈당',hint:'게임을 켤 때 잠깐 나오는 친구를 건드려 보세요.',how:'로딩 화면의 캐릭터를 누르기',dia:3},
  {id:'konami',ic:'🕹',n:'레트로 모드',hint:'옛날 게임기의 전설적인 비밀 명령… 위위아래아래…',how:'로비에서 ↑ ↑ ↓ ↓ ← → ← → B A',dia:10},
  {id:'f777',ic:'🗝',n:'비밀의 777층',hint:'탑 꼭대기로 가는 단추를 행운의 숫자만큼… (높이 올라간 사람만)',how:'최고 77F 이상에서 탑 「꼭대기」 단추를 7번 → 777F 거울 하루를 쓰러뜨리기',dia:100,gold:20000},
  {id:'beat',ic:'🎵',n:'PERFECT ENTRY',hint:'로비 음악의 쿵! 에 딱 맞춰 들어가 보세요.',how:'로비 음악 박자(쿵)에 맞춰 메뉴로 들어가기',dia:5},
  {id:'line',ic:'💬',n:'보스의 숨은 한마디',hint:'한 대도 맞지 않고 이기면 보스가 속마음을 털어놓아요.',how:'보스를 PERFECT로 쓰러뜨리기 (70개 다 모으면 💎200 · 🪙30,000)',dia:5},
  {id:'night',ic:'👻',n:'자정의 무대',hint:'모두가 잠든 시간, 로비에 누군가 찾아와요.',how:'실제 시각 밤 12시~12시 59분에 로비',dia:10}];
 const ALL_BONUS={dia:50,gold:10000},LINE_ALL={dia:200,gold:30000};
 function give(d,g){try{if(d&&window.DIA80)DIA80.add(d)}catch(e){}try{if(g)addCoins(g)}catch(e){}save();try{gmHud()}catch(e){}try{if(window.DIA80&&DIA80.chip)DIA80.chip()}catch(e){}}
 let popQ=[],popOn=0;function pop(ic,t,sub){popQ.push([ic,t,sub]);if(!popOn)popNext()}
 function popNext(){const q=popQ.shift();if(!q){popOn=0;return}popOn=1;pop0(q[0],q[1],q[2]);setTimeout(popNext,3000)}
 function pop0(ic,t,sub){const d=document.createElement('div');d.className='eg126P';d.innerHTML='<i>'+E(ic)+'</i><div><b>'+E(t)+'</b>'+(sub?'<small>'+E(sub)+'</small>':'')+'</div>';document.body.appendChild(d);requestAnimationFrame(()=>d.classList.add('in'));setTimeout(()=>d.classList.remove('in'),3200);setTimeout(()=>d.remove(),3700)}
 function found(id){const s=SD();if(s.f[id])return false;s.f[id]=Date.now();const e=EG.find(x=>x.id===id);give(e.dia,e.gold);sfx('ok');
  pop('🔍','비밀 발견! '+e.ic+' '+e.n,'💎 +'+e.dia+(e.gold?' · 🪙 +'+e.gold.toLocaleString():'')+' · 명예의 전당 「비밀 도감」 '+Object.keys(s.f).length+'/'+EG.length);
  if(Object.keys(s.f).length>=EG.length&&!s.all){s.all=Date.now();give(ALL_BONUS.dia,ALL_BONUS.gold);pop('🏆','비밀을 모두 찾았어요!','💎 +'+ALL_BONUS.dia+' · 🪙 +'+ALL_BONUS.gold.toLocaleString())}
  return true}
 const inLobby=()=>{try{return mode==='menu'&&GM.scr==='main'}catch(e){return false}};

 const st=document.createElement('style');st.id='egg126';st.textContent=`
 .eg126P{position:fixed;left:50%;top:14%;transform:translate(-50%,-20px) scale(.9);opacity:0;z-index:99995;display:flex;align-items:center;gap:12px;padding:12px 20px 12px 14px;border-radius:16px;background:linear-gradient(180deg,#2a1c40f5,#120c22f5);color:#fff;box-shadow:inset 0 0 0 1px #ffd16699,0 0 30px #ffd16644,0 14px 30px #000a;pointer-events:none;transition:transform .35s cubic-bezier(.2,1.4,.4,1),opacity .3s;max-width:88vw}
 .eg126P.in{opacity:1;transform:translate(-50%,0) scale(1)}
 .eg126P i{font-style:normal;font-size:30px}.eg126P b{display:block;font-size:16px;color:#ffe9a8}.eg126P small{display:block;font-size:12px;color:#d6d0f0;margin-top:2px;line-height:1.4}
 #gameMenu .gmLogo{pointer-events:auto;cursor:default;-webkit-user-select:none;user-select:none}
 html.dance126 #lvCv{animation:eg126d 2.6s cubic-bezier(.4,0,.2,1)}
 @keyframes eg126d{0%{transform:none}15%{transform:rotate(180deg) scale(.92)}30%{transform:rotate(180deg) scale(1.04) translateY(-8px)}45%{transform:rotate(180deg) scale(.96) translateY(6px)}60%{transform:rotate(180deg) scale(1.04) translateY(-8px)}80%{transform:rotate(360deg) scale(.95)}100%{transform:rotate(360deg)}}
 #ld125 .kn{cursor:pointer}#ld125 .kn.fall{animation:eg126f .9s ease-in forwards!important}
 @keyframes eg126f{0%{transform:rotate(0)}40%{transform:rotate(-20deg) translateY(-14px)}100%{transform:rotate(95deg) translate(22px,26px)}}
 #ld125 .ouch{position:absolute;margin:-120px 0 0 110px;font-weight:900;font-size:22px;color:#ffe36b;text-shadow:0 2px 0 #000;animation:eg126o .9s ease-out forwards}
 @keyframes eg126o{from{opacity:0;transform:scale(.4)}30%{opacity:1;transform:scale(1.2)}to{opacity:1;transform:scale(1)}}
 html.retro126 body{filter:grayscale(1) sepia(1) hue-rotate(52deg) saturate(2.4) contrast(1.12) brightness(.95)}
 html.retro126 body::after{content:'';position:fixed;inset:0;z-index:2147483000;pointer-events:none;background:repeating-linear-gradient(0deg,#0000 0 2px,#00000038 2px 3px),radial-gradient(ellipse at 50% 50%,transparent 60%,#0007)}
 #egCoin{position:fixed;left:50%;bottom:86px;transform:translateX(-50%);z-index:9350;padding:11px 20px;border:0;border-radius:999px;font:900 15px/1 ${typeof FONT_STACK!=='undefined'?FONT_STACK:'sans-serif'};color:#2a1c08;background:linear-gradient(180deg,#ffe58a,#ffbf3a);box-shadow:0 0 0 2px #fff8,0 6px 18px #000a,0 0 22px #ffd16688;cursor:pointer;animation:eg126c 1.4s ease-in-out infinite}
 #egCoin[hidden]{display:none}#egCoin:active{transform:translateX(-50%) scale(.94)}
 @keyframes eg126c{0%,100%{box-shadow:0 0 0 2px #fff8,0 6px 18px #000a,0 0 14px #ffd16666}50%{box-shadow:0 0 0 3px #fff,0 6px 18px #000a,0 0 30px #ffd166cc}}
 #pe126{position:fixed;inset:0;z-index:99990;pointer-events:none;display:flex;align-items:center;justify-content:center;flex-direction:column;font:900 clamp(40px,8vw,96px)/1 ${typeof FONT_STACK!=='undefined'?FONT_STACK:'sans-serif'};letter-spacing:.08em;color:#fff;text-shadow:0 0 18px #ffe36b,0 0 40px #ff8fb0,0 6px 0 #000;animation:eg126pe 1.1s ease-out forwards}
 #pe126 small{font-size:.22em;letter-spacing:.5em;color:#ffe36b;margin-top:10px}
 @keyframes eg126pe{0%{opacity:0;transform:scale(2.2)}20%{opacity:1;transform:scale(1)}75%{opacity:1}100%{opacity:0;transform:scale(1.1)}}
 html.night126 #lvCv{filter:hue-rotate(200deg) saturate(.7) brightness(.62)}
 #night126{position:fixed;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse at 70% 10%,#ffffff22 0 2%,transparent 9%),radial-gradient(1px 1px at 20% 30%,#fff,transparent),radial-gradient(1px 1px at 60% 18%,#fff,transparent),radial-gradient(1px 1px at 82% 40%,#fff,transparent),radial-gradient(1px 1px at 40% 12%,#fff,transparent),linear-gradient(180deg,#0a1440aa,transparent 60%)}
 #ghost126{position:fixed;z-index:30;width:72px;height:72px;pointer-events:none;image-rendering:pixelated;opacity:.85;filter:drop-shadow(0 0 10px #bfe8ff)}
 #egBook{all:unset;cursor:pointer;display:flex;align-items:center;gap:8px;padding:8px 16px;border-radius:999px;font-weight:900;font-size:14px;color:#e6dcff;background:linear-gradient(180deg,#2a1c40e6,#140c26e6);box-shadow:inset 0 0 0 1px #b48aff88,0 0 16px #b48aff33}
 #egBook em{font-style:normal;color:#c9a8ff}
 #egBookP{position:fixed;inset:0;z-index:9600;display:flex;align-items:center;justify-content:center;background:#000a}
 #egBookP[hidden]{display:none}
 #egBookP .bx{width:min(560px,92vw);max-height:86vh;overflow:auto;padding:16px 18px;border-radius:18px;background:linear-gradient(180deg,#1c1432,#0c0a1c);box-shadow:inset 0 0 0 1px #b48aff66,0 20px 50px #000c;color:#e8e4ff}
 #egBookP .hd{display:flex;align-items:center;gap:12px;margin-bottom:10px}#egBookP .hd h3{margin:0;font-size:20px;color:#e6d4ff}#egBookP .hd small{display:block;font-size:12px;color:#a99fd0}
 #egBookP .it{display:flex;gap:12px;align-items:flex-start;padding:10px 6px;border-bottom:1px solid #ffffff12}
 #egBookP .it i{font-style:normal;font-size:26px;width:36px;text-align:center;flex:none}
 #egBookP .it b{display:block;font-size:15px}#egBookP .it span{display:block;font-size:12px;color:#b9b2da;line-height:1.5;margin-top:2px}
 #egBookP .it.no i{filter:grayscale(1) brightness(.4)}#egBookP .it.no b{color:#7d7699}
 #egBookP .it em{font-style:normal;color:#ffd166;font-size:12px;font-weight:800}
 #egBookP .ln{margin-top:10px;padding:10px;border-radius:12px;background:#ffffff08;font-size:12.5px;line-height:1.6}#egBookP .ln p{margin:4px 0}#egBookP .ln b{color:#ffd166}
 #egLine{position:fixed;left:50%;bottom:9%;transform:translateX(-50%);z-index:99994;width:min(620px,92vw);padding:14px 18px;border-radius:16px;background:#0c0a1cf2;color:#fff;box-shadow:inset 0 0 0 1px #ffd16688,0 14px 40px #000c;cursor:pointer;animation:eg126l .5s ease-out}
 #egLine small{display:block;font-size:11px;letter-spacing:.2em;color:#ffd166;margin-bottom:4px}#egLine b{color:#ffe9a8}#egLine p{margin:6px 0 0;font-size:16px;line-height:1.55}
 @keyframes eg126l{from{opacity:0;transform:translate(-50%,20px)}to{opacity:1;transform:translate(-50%,0)}}
 html.ph #egCoin{bottom:150px}`;document.head.appendChild(st);

 /* ---------- ① 로고 10번 ---------- */
 let lt=[];document.addEventListener('pointerdown',e=>{try{if(!e.target.closest||!e.target.closest('#gameMenu .gmLogo')||!inLobby())return;const now=performance.now();lt=lt.filter(t=>now-t<3000);lt.push(now);
  if(lt.length>=10){lt=[];dance()}else if(lt.length>=5)sfx('move')}catch(_){}},true);
 function dance(){const h=document.documentElement;h.classList.remove('dance126');void h.offsetWidth;h.classList.add('dance126');setTimeout(()=>h.classList.remove('dance126'),2700);
  try{for(let i=0;i<120;i++)LV.conf.push({x:Math.random(),y:-.05-Math.random()*.2,vx:(Math.random()-.5)*.05,vy:.18+Math.random()*.2,r:Math.random()*6,vr:(Math.random()-.5)*8,c:['#a6f5c6','#ffe36b','#ff8fb0','#8ad0ff'][i%4],w:4+Math.random()*4,t:performance.now()})}catch(e){}
  try{perc&&perc('crash',audio.currentTime)}catch(e){}if(!found('logo'))pop('💃','댄스 타임!','')}

 /* ---------- ② 광장 분수 ---------- */
 const coinB=document.createElement('button');coinB.id='egCoin';coinB.hidden=true;coinB.textContent='🪙 동전 던지기 (10)';document.body.appendChild(coinB);
 const nearF=()=>{try{if(mode!=='plaza'||!window.PLZ111)return false;const F=PLZ111.FOUNT;return Math.hypot(P.x-F.x,(P.y-F.y)*1.6)<F.r+100}catch(e){return false}};
 let lastCoin=0;function throwCoin(){const now=performance.now();if(now-lastCoin<900)return;lastCoin=now;if((saveData.coins||0)<10){pop('🪙','동전이 모자라요','10골드가 필요해요');sfx('no');return}
  try{addCoins(-10)}catch(e){}save();try{sfx('ok');perc&&perc('hat',audio.currentTime)}catch(e){}
  const s=SD();if(Math.random()<.01){s.fairy=(s.fairy||0)+1;give(30,0);pop('🧚','분수의 요정이 나타났어요!','「착한 소원이구나!」 💎 +30 · 요정을 만난 횟수 '+s.fairy+'번')}
  else if(!found('fount'))pop('⛲','퐁당! 소원을 빌었어요','언젠가 요정이 나타날지도…')}
 coinB.onclick=e=>{e.stopPropagation();throwCoin()};coinB.addEventListener('pointerdown',e=>e.stopPropagation());
 {const f=doAttack;doAttack=function(){if(mode==='plaza'&&nearF()){throwCoin();return}return f.apply(this,arguments)}}
 setInterval(()=>{const on=nearF();if(coinB.hidden===on)coinB.hidden=!on},200);

 /* ---------- ③ 로딩 화면 캐릭터 ---------- */
 document.addEventListener('pointerdown',e=>{try{const k=e.target.closest&&e.target.closest('#ld125 .kn');if(!k||k.classList.contains('fall'))return;k.classList.add('fall');const L=$('ld125');if(L)L._hold=performance.now()+1200;const o=document.createElement('div');o.className='ouch';o.textContent='아야!';k.after(o);sfx('no');found('load')}catch(_){}},true);

 /* ---------- ④ 코나미 커맨드 ---------- */
 const KC=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];let kq=[];
 /* 로비가 ←→ · A 키다운을 먼저 가져가서 키를 뗄 때(keyup)로 센다 */addEventListener('keyup',e=>{try{if(!inLobby())return;kq.push(e.code);if(kq.length>KC.length)kq.shift();if(kq.join()===KC.join()){kq=[];const s=SD();s.retro=s.retro?0:1;save();retro();if(s.retro){if(!found('konami'))pop('🕹','레트로 모드 ON','다시 입력하면 꺼져요')}else pop('🕹','레트로 모드 OFF','')}}catch(_){}},true);
 function retro(){document.documentElement.classList.toggle('retro126',!!SD().retro)}

 /* ---------- ⑤ 비밀의 777층 ---------- */
 let tt=[];document.addEventListener('click',e=>{try{const b=e.target.closest&&e.target.closest('#twJump button[data-j="top"]');if(!b)return;const now=performance.now();tt=tt.filter(t=>now-t<4000);tt.push(now);
  if(tt.length>=7){tt=[];const best=(saveData.tw71&&saveData.tw71.best)||1;if(best<77){pop('🗝','문이 꿈쩍도 안 해요…','더 높이(77F 이상) 올라가면 열릴지도')}else open777()}}catch(_){}},true);
 function open777(){sfx('ok');try{showOverlay('777F · 비밀의 층','탑 꼭대기 너머, 아무도 모르는 층','거울 속에서 <b style="color:#c9a8ff">또 하나의 나</b>가 기다리고 있어요.<br>평소보다 2.5배 단단해요. 이기면 💎 100 · 🪙 20,000(처음 한 번).',
   [['🗝 문을 연다',()=>{$('overlay').hidden=true;go777()},true],['돌아가기',()=>{$('overlay').hidden=true},false]])}catch(e){go777()}}
 function go777(){try{if(window.TW71&&TW71.grant)TW71.grant(68)}catch(e){}window.__e777=1;try{s7Fight(9,'rush')}catch(e){console.error(e)}setTimeout(()=>{window.__e777=0},1500);try{if(G)G.egg777=1}catch(e){}}
 {const _ds=drawScene;drawScene=function(now){const r=_ds.apply(this,arguments);try{if(G&&!G.egg777&&window.__e777&&mode==='boss')G.egg777=1;if(G&&G.egg777&&!G._e777&&G.maxHp>0&&G.state!=='result'){G._e7f=(G._e7f||0)+1;if(G._hp54||G._e7f>3){G._e777=1;G.hp=Math.round(G.hp*2.5);G.maxHp=Math.round(G.maxHp*2.5);G.hpShow=G.hp/G.maxHp;G._barLast=undefined}}
  if(G&&G.egg777&&G.state!=='result'){ctx.save();ctx.font='900 10px sans-serif';ctx.textAlign='center';ctx.fillStyle='#c9a8ff';ctx.globalAlpha=.85;ctx.fillText('777F · 비밀의 층',W/2,AY+AH-6);ctx.restore()}}catch(e){}return r}}

 /* ---------- ⑥ 박자 맞춰 들어가기 ---------- */
 if(typeof lvGo==='function'){const f=lvGo;lvGo=function(){try{if(!LV.enter&&inLobby()){const k=parseFloat(($('gameMenu')||document.body).style.getPropertyValue('--kick'))||0;if(k>.82)perfectEntry()}}catch(e){}return f.apply(this,arguments)}}
 function perfectEntry(){const d=document.createElement('div');d.id='pe126';d.innerHTML='PERFECT<small>ON THE BEAT · ENTRY</small>';($('pe126')||{remove(){}}).remove();document.body.appendChild(d);setTimeout(()=>d.remove(),1150);found('beat')}

 /* ---------- ⑦ 보스의 숨은 한마디 ---------- */
 const LINES=[
  '문을 지킨 지 백 년… 사실 열쇠는 내가 삼켜 버렸어.','벽은 막으려고 있는 게 아니야. 누군가 두드려 주길 기다리는 거지.','불을 품고 있어도, 손을 잡아 줄 사람은 없었어.','종착역이 어딘지 몰라서 계속 달렸던 거야.','차갑게 굴었던 건… 녹는 게 무서워서였어.',
  '천 마리 벌이 한 목소리로 말해. "고마워."','무거운 걸 들어 올리는 게 내 일이었어. 마음만 빼고.','12시 정각마다 춤을 췄어. 아무도 안 봤지만.','모든 걸 비추면서 정작 나는 보지 못했어.','엔진이 멈추면… 드디어 쉴 수 있겠다.',
  '땅속 깊은 곳은 생각보다 따뜻해. 외롭지만.','포자 하나하나가 내 아이들이야. 잘 부탁해.','늪은 숨기 좋은 곳이야. 찾아 줘서 고마워.','주인을 기다리다 뼈만 남았어. 너는 좋은 주인이 될 것 같아.','실 한 가닥으로 세상을 엮고 싶었어.',
  '왕이 되면 덜 외로울 줄 알았어.','반짝이는 것엔 늘 이유가 있지. 나는 빛을 먹고 살아.','심연에서 올려다본 하늘이… 너였구나.','다 타 버린 뒤에도 따뜻했던 기억은 남아.','배고픔은 결국 그리움이었어.',
  '똑딱, 똑딱… 너의 박자는 정확했어.','다 보고 있었어. 네가 포기하지 않는 것도.','네 꿈은 맛이 좋더라. 용기 맛이었어.','바람을 불어 넣는 일, 그게 숨 쉬는 거였구나.','틀린 음도 모이면 노래가 돼.',
  '오늘이 며칠인지는 중요하지 않아. 네가 왔잖아.','먼지도 모이면 별이 될 수 있대.','저울은 결국 평평해졌어. 우리 비긴 걸로 하자.','메아리는… 대답해 주는 사람이 있을 때만 들려.','처음 태엽을 감은 손이 너와 닮았어.',
  '떨어지는 별을 쫓다가, 떠오르는 별을 만났네.','눈을 감는 시간이 일식이야. 이제 떠도 되겠지?','꼬리가 길면 밟히지. 오늘처럼.','우주를 헤엄치는 건 생각보다 조용해.','둘이라서 싸웠고, 둘이라서 버텼어.',
  '모든 걸 삼켜도 채워지지 않던 게 있었어.','폭발은 끝이 아니라 시작이래. 기억해 줘.','달은 혼자 빛나지 않아. 너도 그렇지?','별자리를 짤 때 네 자리도 남겨 뒀어.','마지막 별이 꺼지면, 새벽이 와.',
  '등대 불빛은 길 잃은 너를 위해 켜 둔 거야.','지도는 접어도 길은 사라지지 않아.','닻을 내려도 마음은 떠나더라.','진주는 상처에서 태어나. 너의 상처도 언젠가.','유리 안에서 바다를 봤어. 직접 보고 싶었는데.',
  '끊어진 걸 잇는 게 내 일이야. 우리 사이도.','여덟 개의 종이 한꺼번에 울리면 그건 축하야.','모래가 다 떨어져도 다시 뒤집으면 돼.','기록해 둘게. 오늘 네가 이겼다고.','파도는 소리를 내지 않아도 심장처럼 뛰어.',
  '바람이 어디로 불든, 나는 너를 가리킬게.','실이 끊어져도 연은 더 높이 날아.','천둥은 하늘이 크게 웃는 소리야.','항로는 바뀌어도 선장은 배를 버리지 않아.','깃털 하나에도 시간이 쌓여.',
  '바람이 노래하는 건 누군가 들어 주니까.','무지개를 건너려면 비를 먼저 맞아야 해.','내가 낸 소리가 너에게 닿았구나.','폭풍의 눈은 사실 가장 고요한 곳이야.','첫 번째 노래를 끝까지 들어 줘서 고마워.',
  '거울 너머에도 문은 있어. 넌 이미 열었고.','꼬리를 펼치는 건 보여 주고 싶은 사람이 있을 때야.','거꾸로 흘러도 물은 결국 바다로 가.','체크메이트… 이번엔 내가 진 수를 둘게.','거꾸로 타도 빛은 빛이야.',
  '음악이 멈춰도 나는 계속 돌 거야. 네가 들어 줬으니까.','뒤집힌 회전목마도 즐거울 수 있어. 누가 타 준다면.','그림자는 빛이 있어야 생겨. 넌 내 빛이었어.','반사된 나는 진짜보다 조금 더 솔직해.','반대편의 나는… 사실 너를 응원하고 있었어.'];
 let NAMES=null;const nameIdx=n=>{try{if(!NAMES)NAMES=hfData().map(x=>x.name);return NAMES.indexOf(n)}catch(e){return -1}};
 {const _fe=fightEnd;fightEnd=function(won){const g=G,r=_fe.apply(this,arguments);try{if(g&&won){
   if(g.egg777){const s=SD();const first=!s.f.f777;if(found('f777'))pop('🗝','777F 정복!','거울 속의 나를 이겼어요');else if(!first)pop('🗝','777F 정복!','(보상은 처음 한 번만)')}
   if(g.hits===0&&g.B){/* 3장부터는 G.B가 1장 보스 틀이라, 결과창에 나온 보스 이름으로 찾는다 */const t0=performance.now(),look=()=>{const ov=$('overlay'),tx=ov&&!ov.hidden?ov.textContent:'';let i=-1;try{if(!NAMES)NAMES=hfData().map(x=>x.name);let L=0;NAMES.forEach((n,k)=>{if(n&&tx.indexOf(n)>=0&&n.length>L){L=n.length;i=k}})}catch(e){}
    if(i<0&&performance.now()-t0<4000)return void setTimeout(look,300);if(i<0)i=nameIdx(g.B.name);if(i>=0&&LINES[i])showLine(i)};setTimeout(look,700)}}}catch(e){}return r}}
 function showLine(i){const s=SD(),nw=!s.lines[i];s.lines[i]=1;save();const n=Object.keys(s.lines).length;
  ($('egLine')||{remove(){}}).remove();const d=document.createElement('div');d.id='egLine';const nm=(NAMES&&NAMES[i])||'';
  d.innerHTML='<small>★ PERFECT · 숨은 한마디 '+n+'/70'+(nw?' · NEW':'')+'</small><b>'+E(nm)+'</b><p>「'+E(LINES[i])+'」</p>';d.onclick=()=>d.remove();document.body.appendChild(d);setTimeout(()=>d.remove(),9000);
  found('line');if(n>=70&&!s.lineAll){s.lineAll=Date.now();give(LINE_ALL.dia,LINE_ALL.gold);pop('💬','숨은 한마디를 모두 모았어요!','💎 +'+LINE_ALL.dia+' · 🪙 +'+LINE_ALL.gold.toLocaleString())}}

 /* ---------- ⑧ 자정의 무대 ---------- */
 const isNight=()=>{try{if(localStorage.getItem('egg126-night'))return true}catch(e){}return new Date().getHours()===0};
 const gh=document.createElement('canvas');gh.id='ghost126';gh.width=16;gh.height=16;gh.hidden=true;document.body.appendChild(gh);
 {const o=gh.getContext('2d'),G0=['....######....','..##########..','.############.','.##..####..##.','.##..####..##.','##############','##############','##############','#############.','##.###.###.##.','#...#...#...#.'];
  G0.forEach((r,y)=>[...r].forEach((c,x)=>{if(c==='#'){o.fillStyle='#e8f4ff';o.fillRect(x+1,y+3,1,1)}}));o.fillStyle='#2a3a5a';o.fillRect(4,6,2,2);o.fillRect(10,6,2,2);o.fillStyle='#ff9ab8';o.fillRect(3,9,1,1);o.fillRect(12,9,1,1)}
 let gx=innerWidth*.6,gy=innerHeight*.5,mx=innerWidth*.6,my=innerHeight*.5,nt=0;addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY},{passive:true});
 function nightTick(now){const on=inLobby()&&isNight();document.documentElement.classList.toggle('night126',on);let ov=$('night126');
  if(on&&!ov){ov=document.createElement('div');ov.id='night126';const m=$('gameMenu');(m||document.body).prepend(ov)}else if(!on&&ov)ov.remove();
  gh.hidden=!on;if(on){found('night');const t=now/1000;const tx=mx+40+Math.sin(t*1.3)*30,ty=my-60+Math.cos(t*1.7)*20;gx+=(tx-gx)*.03;gy+=(ty-gy)*.03;gh.style.left=(gx-36)+'px';gh.style.top=(gy-36+Math.sin(t*3)*6)+'px';gh.style.transform='scaleX('+(tx<gx?-1:1)+')';gh.style.opacity=(.6+.3*Math.sin(t*2)).toFixed(2)}
  requestAnimationFrame(nightTick)}
 requestAnimationFrame(nightTick);

 /* ---------- 비밀 도감 (명예의 전당) ---------- */
 const bk=document.createElement('div');bk.id='egBookP';bk.hidden=true;document.body.appendChild(bk);
 bk.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===bk)bk.hidden=true});
 function book(){const s=SD(),n=Object.keys(s.f).length,ln=Object.keys(s.lines).map(Number).sort((a,b)=>a-b);try{if(!NAMES)NAMES=hfData().map(x=>x.name)}catch(e){}
  bk.innerHTML='<div class="bx"><div class="hd"><button class="x">닫기</button><div><h3>🔍 비밀 도감 '+n+'/'+EG.length+'</h3><small>숨겨진 비밀을 찾으면 💎를 받아요. 모두 찾으면 💎 '+ALL_BONUS.dia+' · 🪙 '+ALL_BONUS.gold.toLocaleString()+(s.all?' (받음)':'')+'</small></div></div>'+
   EG.map(e=>{const ok=!!s.f[e.id];return '<div class="it'+(ok?'':' no')+'"><i>'+(ok?e.ic:'❔')+'</i><div><b>'+(ok?E(e.n):'???')+' <em>💎'+e.dia+(e.gold?' · 🪙'+e.gold.toLocaleString():'')+'</em></b><span>'+(ok?'✓ '+E(e.how):'힌트: '+E(e.hint))+'</span>'+(e.id==='fount'&&s.fairy?'<span>🧚 분수의 요정을 '+s.fairy+'번 만났어요</span>':'')+'</div></div>'}).join('')+
   '<div class="ln"><b>💬 숨은 한마디 '+ln.length+'/70</b>'+(s.lineAll?' · 모두 모음!':' · 모두 모으면 💎'+LINE_ALL.dia+' · 🪙'+LINE_ALL.gold.toLocaleString())+(ln.length?ln.map(i=>'<p><b>'+E((NAMES&&NAMES[i])||'')+'</b> 「'+E(LINES[i])+'」</p>').join(''):'<p>아직 없어요. 보스를 한 대도 안 맞고 이겨 보세요.</p>')+'</div></div>';
  bk.querySelector('.x').onclick=()=>{bk.hidden=true;sfx('back')};try{window.POL125&&POL125.fixX()}catch(e){}}
 function bookBtn(){const s=$('gmHall'),w=$('hfRw125');if(!s||!w)return;let b=$('egBook');if(!b){b=document.createElement('button');b.id='egBook';b.onclick=e=>{e.stopPropagation();book();bk.hidden=false;sfx('ok')}}
  if(b.parentElement!==w)w.appendChild(b);b.innerHTML='🔍 비밀 도감 <em>'+Object.keys(SD().f).length+'/'+EG.length+'</em>'}
 {const f=gmShow;gmShow=function(scr){const r=f.apply(this,arguments);try{if(scr==='hall'){setTimeout(bookBtn,120);setTimeout(bookBtn,400)}}catch(e){}return r}}
 if(window.POL125&&POL125.hallRw){const f=POL125.hallRw;POL125.hallRw=function(){const r=f.apply(this,arguments);try{bookBtn()}catch(e){}return r}}
 new MutationObserver(()=>{try{const w=$('hfRw125');if(w&&!w.contains($('egBook')))bookBtn()}catch(e){}}).observe(document.body,{childList:true,subtree:true});
 addEventListener('keydown',e=>{if(!bk.hidden&&e.code==='Escape'){bk.hidden=true;e.stopPropagation();e.preventDefault()}},true);

 setTimeout(retro,500);
 window.EGG126={EG,LINES,found,book,dance,open777,perfectEntry,showLine,throwCoin};
}catch(e){console.error('v126 easter',e)}})();
