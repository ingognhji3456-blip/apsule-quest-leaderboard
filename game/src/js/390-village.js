/* ================= 마을 허브: 시계골 =================
   동굴과 동굴 사이에 돌아오는 마을. 박동 조각을 하나 가져올 때마다 마을의 누군가가 깨어나고,
   대장간 · 잡화점 · 재봉소 · 기록관 · 망루가 차례로 문을 연다. 오메가 이후엔 마을 전체가 깨어난다. */
const VW=1200,VY0=170,VY1=276;
let V=null;
const V_NPC=[
 {id:'sun',name:'선 할아버지',x:78,wake:10,body:'#6a4a2a',hair:'#d8d8d8',beard:'#e8e8e8',bld:'태엽 공방',
  wakeL:[['선 할아버지','…하루. 꿈속에서 계속 네 발소리를 들었단다. 계단을 내려가는 소리를.'],['선 할아버지','잘했다. 정말 잘했어. 자, 이건 할아버지 비상금이다. 쓸 데 있으면 쓰거라.']],
  lines:{a:[['','할아버지는 깊이 잠들어 있다. 숨소리가 아주, 아주 느리다.'],['똑딱','…조금만 기다려요, 할아버지. 금방 돌아올게요.']],
   b:[['선 할아버지','오메가가 다시 뛰니 무릎이 다 안 쑤시는구나. 허허.'],['선 할아버지','태엽은 힘으로 감는 게 아니다. 박자로 감는 거지. 너는 이미 알고 있구나.']],
   c:[['선 할아버지','황무지에서 오는 것들도… 결국 외로운 것들일 게다. 미워하지 말고 돌려보내거라.'],['선 할아버지','네 검 소리가 박자에 딱 맞더구나. 태엽지기 다 됐어.'],['선 할아버지','무리하지 마라. 심장은 쉬어야 오래 뛴다.']]}},
 {id:'guard',name:'경비대장 돌쇠',x:196,wake:1,body:'#4a5a6a',hair:'#2a1a10',hat:'#8a8f96',bld:'초소',
  wakeL:[['경비대장 돌쇠','허억! …내가 졸았다고? 초소에서? 이, 이건 비밀로 해 다오.'],['경비대장 돌쇠','박동 조각 덕분에 깼다고? 허, 문지기 녀석이 아직 제 몫을 하는구나.']],
  lines:{a:[['경비대장 돌쇠','전투 요령 하나. 공격이 닿기 직전에 막아내면(패링) 되돌려줄 수 있다. 박자에 맞추면 더 세게!'],['경비대장 돌쇠','그로기 게이지를 가득 채우면 반격 기회가 온다. 욕심내지 말고 박자부터.'],['경비대장 돌쇠','대시는 무적이 아니다. 기력이 바닥나면 한참 못 쓴다는 걸 잊지 마라.']],
   b:[['경비대장 돌쇠','마을이 깨어나니 초소가 심심하구먼. 좋은 의미로.']],
   c:[['경비대장 돌쇠','담장 밖 울음소리가 매일 가까워진다. 네가 앞장서 주면 우리가 뒤를 지키마.'],['경비대장 돌쇠','궁극기 게이지는 공격을 맞힐수록 찬다. 급할 땐 C!']]}},
 {id:'lamp',name:'등불지기 반디',x:300,wake:2,body:'#3a5a8a',hair:'#ffd166',lamp:1,bld:'등불집',
  wakeL:[['등불지기 반디','앗, 깜깜해! 내가 잠든 사이에 등불이 다 꺼졌잖아!'],['등불지기 반디','기다려, 지금 바로 켤게. …자! 이제 골목이 밝지?']],
  lines:{a:[['등불지기 반디','등불이 켜져 있으면 잠든 사람들도 조금은 덜 무서울 거야.'],['등불지기 반디','볼트 월의 푸른 전기가 아직 등불 속에 남아 있어. 따끔해!']],
   b:[['등불지기 반디','오늘 밤은 축제야! 등불을 두 배로 켤 거야!']],c:[['등불지기 반디','황무지 쪽 담장에도 등불을 달았어. 어둠을 싫어하는 것들이 많대.']]}},
 {id:'smith',name:'대장장이 무쇠',x:412,wake:3,body:'#8a3a2a',hair:'#1a1410',apron:'#4a3a2a',bld:'대장간',act:'wp',
  wakeL:[['대장장이 무쇠','…불이 꺼졌었나? 대장간 불이 꺼진 건 내 평생 처음이다.'],['대장장이 무쇠','용광로 골렘의 불씨라… 허, 이 불로 두드리면 뭐든 벼릴 수 있겠군. 무기가 필요하면 말해라.']],
  lines:{a:[['대장장이 무쇠','무기마다 버릇이 있다. 도끼는 그로기를, 창은 거리를, 쌍검은 속도를 좋아하지.']],b:[['대장장이 무쇠','축하 선물로 칼날 하나 더 갈아 놨다. 보고 가라.']],c:[['대장장이 무쇠','살아있는 것들이 상대라면… 가벼운 칼보다 묵직한 한 방이 낫다.']]}},
 {id:'rail',name:'역무원 철이',x:530,wake:4,body:'#2a3a5a',hair:'#3a2a1a',hat:'#1a2a4a',bld:'간이역',
  wakeL:[['역무원 철이','다음 열차는… 어? 여기 역이 아니라 마을이잖아. 꿈이었나.'],['역무원 철이','철갑 열차를 만났다고? 그 녀석, 아직도 달리고 있었구나. 삼백 년 동안.']],
  lines:{a:[['역무원 철이','할아버지의 할아버지 때, 여기서 마지막 열차가 떠났대. 윤서라는 기술장이 탔다고.'],['역무원 철이','"잠시만 떠났다 올게." …그 말을 역 기둥에 새겨 둔 사람이 있어.']],
   b:[['역무원 철이','철로를 다시 깔자는 얘기가 나왔어. 언젠가 떠난 사람들이 돌아올 수 있게.']],c:[['역무원 철이','황무지 너머에도 옛 선로가 있대. 그쪽에서 오는 울음소리… 기차 소리랑 닮았어.']]}},
 {id:'bell',name:'종지기 울림',x:672,wake:6,body:'#5a3a6a',hair:'#8a8a8a',bld:'종탑',act:'bell',
  wakeL:[['종지기 울림','…종이, 종이 멈춰 있었어? 이런, 아침 인사를 몇 번이나 놓친 거야.'],['종지기 울림','전령들이 박동을 다시 실어 왔구나. 들어 봐— (데엥)']],
  lines:{a:[['종지기 울림','종을 울리면 잠든 사람들 꿈에도 닿는대. 한번 쳐 볼래?']],b:[['종지기 울림','열두 번! 오늘은 열두 번 울렸어! 사흘 만의 아침이야!']],c:[['종지기 울림','그 울음소리들… 이 종소리를 따라온대. 그래도 종을 멈출 순 없어. 이건 약속이니까.']]}},
 {id:'lib',name:'사서 설아',x:806,wake:5,body:'#3a6a6a',hair:'#1a1a2a',glasses:1,bld:'기록관',act:'rec',
  wakeL:[['사서 설아','추워… 꿈속이 얼음 같았어. 극저온 코어가 기억을 얼려 두었던 거야.'],['사서 설아','덕분에 윤서 님의 기록들이 녹았어. 읽고 싶은 게 있으면 언제든 말해.']],
  lines:{a:[['사서 설아','기록은 기억보다 오래 가. 그래서 윤서 님은 뭐든 적어 두셨대.']],b:[['사서 설아','오메가의 마지막 기록… "아직, 아직." 이제야 그 뜻을 알 것 같아.']],c:[['사서 설아','황무지의 것들에 대한 기록은 거의 없어. 네가 첫 기록을 써 줘야 해.']]}},
 {id:'pet',name:'잡화상 모아',x:920,wake:7,body:'#8a6a2a',hair:'#6a2a1a',bld:'잡화점',act:'pet',
  wakeL:[['잡화상 모아','으음… 내 수레! 내 물건들! …다 그대로네. 휴.'],['잡화상 모아','자석 크레인이 잃어버린 것들을 모아 두었다고? 그중에 길 잃은 녀석들도 있었어. 데려가 줄 주인을 찾고 있지.']],
  lines:{a:[['잡화상 모아','동료는 많을수록 좋아. 작아도 든든하다니까.']],b:[['잡화상 모아','축제 특가! …는 아니지만 기분은 특가야.']],c:[['잡화상 모아','황무지에서 도망쳐 온 작은 녀석들도 있어. 다들 겁이 많지만 착해.']]}},
 {id:'tailor',name:'재단사 바늘',x:1028,wake:8,body:'#8a3a6a',hair:'#2a1a1a',bld:'재봉소',act:'ch',
  wakeL:[['재단사 바늘','바늘이… 째깍거려. 시계탑 인형이 시간을 다시 돌려놓았구나.'],['재단사 바늘','하루, 옷이 다 해졌네. 새 옷 한 벌 지어 줄까? 옷이 바뀌면 마음가짐도 바뀌는 법이야.']],
  lines:{a:[['재단사 바늘','튼튼한 옷은 체력을, 가벼운 옷은 발을 지켜 줘.']],b:[['재단사 바늘','축제 옷 짓느라 손가락에 불이 나!']],c:[['재단사 바늘','황무지 바람은 거칠어. 두꺼운 옷을 권할게.']]}},
 {id:'watch',name:'망루지기 먼눈',x:1124,wake:9,body:'#4a4a3a',hair:'#6a6a6a',bld:'망루',act:'scope',
  wakeL:[['망루지기 먼눈','…다 보고 있었다. 잠든 채로. 광학 요새가 내 눈을 빌려 갔었거든.'],['망루지기 먼눈','이제 돌려받았다. 망원경을 들여다보고 싶으면 말해라. 네 앞길이 보일 거다.']],
  lines:{a:[['망루지기 먼눈','먼 곳을 보는 건 쉽다. 가까운 것을 제대로 보는 게 어렵지.']],b:[['망루지기 먼눈','지평선이 이렇게 맑은 건 처음이다.']],c:[['망루지기 먼눈','황무지 끝, 탑 꼭대기에서 무언가 숨 쉰다. 망원경으로 보겠나?']]}}
];
function vStatus(p){return p===10?['마을 수면율',0]:chStatusLabel(Math.min(19,p))}
function vStage(p){return p<10?'a':p===10?'b':'c'}
function vAwake(n){return V.p>=n.wake}
function enterVillage(p,next){const now=performance.now();stopMusic();mode='village';paused=false;dlg.active=false;
 $('overlay').hidden=true;$('touch').style.display='';$('btnA').style.display='';$('bossName').style.visibility='hidden';$('songInfo').textContent='';$('bvTitle').textContent='BEAT MACHINA · 시계골';
 saveData.vMet=saveData.vMet||{};saveData.vGift=saveData.vGift||{};
 V={p,next,t0:now,camX:0,target:null,talkN:{},parts:[],lastN:-1,shop:false,wokeNow:V_NPC.find(n=>n.wake===p),bellT:0};
 P.x=60;P.y=228;P.face={x:1,y:0};P.dash=null;P.hp=P.maxhp;P.inv=0;
 const st=vStage(p),[lb,val]=vStatus(p);
 banner('시계골');
 const L=[];
 if(st==='a'){L.push(['','시계골. 광산 위, 태엽지기의 마을.'],['똑딱','…'+lb+' '+val+'%. 또 몇 집이 불이 꺼졌어.']);if(V.wokeNow)L.push(['똑딱','어? 박동 조각이 떨려! 누군가 깨어나고 있어. '+V.wokeNow.bld+' 쪽이야!'])}
 else if(st==='b'){L.push(['','시계골에 아침이 왔다. 굴뚝마다 연기가 오르고, 사람들이 광장으로 모여들었다.'],['똑딱','다들 깨어났어! 하루, 인사하러 가자! 할아버지도!'])}
 else{L.push(['똑딱','마을은 괜찮아. 우리가 지키는 한.'],['똑딱',lb+' '+val+'%… 서두르자. 그래도 인사는 하고 가.'])}
 L.push(['','(체력이 모두 회복되었다)']);
 say(L)}
function villageMove(dx,dy){let nx=clamp(P.x+dx,14,VW-14),ny=clamp(P.y+dy,VY0,VY1);const fx=672,fy=236;if(Math.hypot((nx-fx)/1.6,ny-fy)<16){nx=P.x;ny=P.y}P.x=nx;P.y=ny}
function vTargets(){const t=V_NPC.map(n=>({kind:'npc',n,x:n.x,y:190}));t.push({kind:'exit',x:VW-26,y:226});if(V.p>=6)t.push({kind:'bellrope',x:704,y:196});return t}
function updateVillage(now,dt){if(!V)return;if(V.shop){const m=$('shopModal');if(!m||m.hidden){V.shop=false}else return}
 if(!dlg.active&&$('overlay').hidden)stepPlayer(dt,now,villageMove,86);
 V.camX=clamp(P.x-W/2,0,VW-W);
 let best=null,bd=1e9;for(const t of vTargets()){const d=Math.hypot(P.x-t.x,(P.y-t.y)*1.4);if(d<34&&d<bd){bd=d;best=t}}V.target=best;
 // 음악 (마을 테마)
 const st=vStage(V.p),bpm=st==='a'?84:st==='b'?108:96,step=60000/bpm/2,n=Math.floor((now-V.t0)/step);
 if(n!==V.lastN){V.lastN=n;const mel=VMEL[st],nt=mel[n%mel.length];if(nt!=='-'){const f=N5[nt];sfx(f,.34,'triangle',.02,f)}
  if(n%4===0){const roots=st==='a'?[220,175,262,196]:[262,220,175,196],r=roots[Math.floor(n/8)%4];sfx(r/2,.5,'sine',.028,r/2);if(st!=='a')sfx(r,.3,'triangle',.008,r)}
  if(V.p>=6&&n%64===0){sfx(392,1.8,'sine',.03,388);V.bellT=now}}
 for(const q of V.parts){q.x+=q.vx*dt;q.y+=q.vy*dt;q.vy+=q.g*dt;q.l-=dt}V.parts=V.parts.filter(q=>q.l>0);
 if(V.wokeNow&&!saveData.vMet[V.wokeNow.id]&&RND()<.25){const n2=V.wokeNow;V.parts.push({x:n2.x+(RND()-.5)*20,y:170+(RND()-.5)*20,vx:(RND()-.5)*10,vy:-20-RND()*20,g:0,l:1,c:'#ffd0e0'})}}
const VMEL={a:['A4','-','C5','E5','D5','-','C5','B4','A4','-','E4','-','G4','A4','B4','-','C5','-','B4','A4','G4','-','E4','-','F4','G4','A4','-','E4','-','-','-'],
 b:['C5','E5','G5','E5','F5','A5','G5','-','E5','G5','C6','G5','A5','G5','E5','-','F5','E5','D5','C5','D5','E5','G5','-','C5','D5','E5','G5','E5','D5','C5','-'],
 c:['G4','C5','E5','G5','E5','C5','D5','-','F5','E5','D5','C5','D5','E5','C5','-','A4','C5','E5','A5','G5','E5','D5','-','E5','D5','C5','A4','B4','C5','D5','-']};
function villageInteract(){if(!V||dlg.active||V.shop||!$('overlay').hidden)return;const t=V.target;if(!t)return;
 if(t.kind==='exit'){const nextName=V.p<10?'CHAPTER '+(V.p+1)+' · '+STORY[V.p].cave:V.p===10?'CHAPTER 11 · 황무지로':'CHAPTER '+(V.p+1)+' · '+STORY[V.p].cave;
  showOverlay('시계골','출발할까요?','다음: <b>'+nextName+'</b><br><span style="color:#9aa">마을은 언제든 다시 돌아옵니다.</span>',[['출발 →',()=>{$('overlay').hidden=true;const nx=V.next;V=null;$('bossName').style.visibility='';nx&&nx()},true],['조금 더 둘러보기',()=>{$('overlay').hidden=true},false]]);return}
 if(t.kind==='bellrope'){ringBell();return}
 const n=t.n,st=vStage(V.p);
 if(!vAwake(n)){say([['',n.name+'은(는) 깊이 잠들어 있다. …쿨… 쿨…'],['똑딱',n.wake<10?'박동 조각이 하나 더 모이면 깨울 수 있을 것 같아.':'…할아버지. 조금만 더 기다려요.']]);return}
 if(!saveData.vMet[n.id]){saveData.vMet[n.id]=1;const gift=n.id==='sun'?500:60+n.wake*20;const L=n.wakeL.slice();if(!saveData.vGift[n.id]){saveData.vGift[n.id]=1;saveData.coins=(saveData.coins||0)+gift;L.push(['','🪙 '+gift+' 코인을 받았다! (보유 '+saveData.coins+')'])}saveNow();
  for(let i=0;i<30;i++)V.parts.push({x:n.x,y:175,vx:(RND()-.5)*80,vy:-RND()*80,g:60,l:1.2,c:i%2?'#ffd0e0':'#ffe36b'});sfx(660,.3,'triangle',.05,1320);say(L,()=>vAct(n));return}
 const pool=n.lines[st]||n.lines.a,i=(V.talkN[n.id]||0)%pool.length;V.talkN[n.id]=i+1;
 const ln=pool[i],L=Array.isArray(ln[0])?ln:[ln];if(n.id==='sun'&&st==='a')say(pool);else say(L,()=>vAct(n))}
function vAct(n){if(!n.act||!V)return;
 if(n.act==='wp'||n.act==='pet'||n.act==='ch'){V.shop=true;openShop(n.act==='pet'?'pet':n.act);const m=$('shopModal');if(m){m.style.zIndex='300';const fs=document.fullscreenElement||document.webkitFullscreenElement;if(fs&&!fs.contains(m))fs.appendChild(m)}return}
 if(n.act==='bell'){ringBell();return}
 if(n.act==='rec'){const btns=[];for(let i=0;i<Math.min(V.p,20);i++){const s=STORY[i];if(!s||!s.notes)continue;btns.push([String(i+1).padStart(2,'0')+' '+s.cave,()=>{$('overlay').hidden=true;say(s.notes.map(x=>[x[0],x[1]]))},false])}btns.push(['닫기',()=>{$('overlay').hidden=true},true]);showOverlay('기록관','윤서의 기록','지나온 동굴에서 찾은 기록을 다시 읽을 수 있어요.',btns);return}
 if(n.act==='scope'){const ni=Math.min(19,V.p),B=BOSSES[ni],m=BOSS_META[ni];say([['','망원경 너머로 먼 곳이 보인다…'],['망루지기 먼눈','저기. '+(ni<10?'갱도 깊은 곳':'황무지 너머')+'에 "'+B.name+'"(이)가 있다. '+m.epi+'.'],['똑딱','…다음 상대야. 준비하자, 하루.']])}}
function ringBell(){const now=performance.now();V.bellT=now;sfx(392,2,'sine',.05,388);sfx(784,1.2,'sine',.02,780);setTimeout(()=>sfx(392,1.6,'sine',.04,388),700);banner('데엥— 데엥—');for(let i=0;i<24;i++)V.parts.push({x:672,y:60,vx:(RND()-.5)*120,vy:(RND()-.5)*60,g:30,l:1.4,c:'#ffe9b0'})}
/* ---------- 그리기 ---------- */
/* ---------- 주민 스프라이트 (도트 · 자동 외곽선 · 음영) ---------- */
const V_LOOK={
 sun:{hair:'bald',beard:1,glasses:1,out:'coat',pal:{h:'#d8d8d8',c:'#7a5230',a:'#4a3018',p:'#4a3a2a',b:'#2a1a10',w:'#f0f0f0',g:'#ffd166'},prop:'key'},
 guard:{hair:'helmet',out:'coat',pal:{h:'#2a1a10',k:'#8a949e',c:'#4a6078',a:'#8a6a3a',p:'#3a3a48',b:'#2a2020',g:'#ffd166'},prop:'spear'},
 lamp:{hair:'short',scarf:1,out:'coat',pal:{h:'#f0c040',c:'#2a4a7a',a:'#d84a4a',p:'#3a3a48',b:'#2a2020'},prop:'lantern'},
 smith:{hair:'band',out:'apron',wide:1,pal:{h:'#1a1410',k:'#b83a2a',c:'#8a5a40',a:'#5a3a24',p:'#3a3028',b:'#1a1410'},prop:'hammer'},
 rail:{hair:'conductor',out:'coat',buttons:1,pal:{h:'#3a2a1a',k:'#1a2a4a',c:'#23355a',a:'#1a2440',p:'#1a2440',b:'#1a1410',g:'#ffd166'},prop:'flag'},
 bell:{hair:'long',out:'robe',pal:{h:'#9a9aa8',c:'#5a3a78',a:'#ffd166',p:'#3a2450',b:'#2a1a2a'},prop:'bellrod'},
 lib:{hair:'long',glasses:1,out:'dress',pal:{h:'#1a1a2a',c:'#2a7a7a',a:'#e8e0d0',p:'#1a4a4a',b:'#1a1a1a',w:'#e8f0ff'},prop:'book'},
 pet:{hair:'bun',out:'dress',pal:{h:'#b83a2a',c:'#c89a30',a:'#fff0d0',p:'#8a6a20',b:'#3a2010'},prop:'basket'},
 tailor:{hair:'short',out:'vest',tape:1,pal:{h:'#2a1a1a',c:'#a83a78',a:'#f0e8f0',p:'#3a2a3a',b:'#1a1010',g:'#ffe36b'},prop:'needle'},
 watch:{hair:'hood',out:'robe',pal:{h:'#4a3a2a',k:'#5a4a30',c:'#5a4a30',a:'#8a7a50',p:'#3a3020',b:'#2a2010'},prop:'scope'}};
const V_SKIN=['#f0c8a0','#e0b088','#c89068','#f4d4b4'];
function vRows(L,frame,sit){const hair=L.hair,rows=[];
 const H={
  short:["....hhhh....","...hhhhhh...","..hhhhhhhh..","..hsssssshh.","...sesses...","...ssssss...","...ssmmss...","....ssss...."],
  long:["....hhhh....","...hhhhhh...","..hhhhhhhh..","..hsssssshh.","..hsesseshh.","..hssssssh..","..hssmmssh..","..h.ssss.h.."],
  bun:["....hhh.....","...hhhhh....","...hhhhhh...","..hhhhhhhh..","..hsesseshh.","...ssssss...","...ssmmss...","....ssss...."],
  bald:["............","....ssss....","...ssssss...","..ssssssss..","...sesses...","...ssssss...","...wwwwww...","...wwwwww..."],
  helmet:["....kkkk....","...kkkkkk...","..kkkkkkkk..","..kssssssk..","...sesses...","...ssssss...","...ssmmss...","....ssss...."],
  band:["....hhhh....","...hhhhhh...","..kkkkkkkk..","..hsssssshh.","...sesses...","...ssssss...","...ssmmss...","....ssss...."],
  conductor:["...kkkkkk...","..kkkgkkkk..","..kkkkkkkk..",".kkkkkkkkkk.","...sesses...","...ssssss...","...ssmmss...","....ssss...."],
  hood:["...kkkkkk...","..kkkkkkkk..",".kkkkkkkkkk.",".kksssssskk.",".kksesseskk.",".kkssssssk..","..kssmmssk..","..kkssssk..."]}[hair]||[];
 for(const r of H)rows.push(r);
 if(L.beard){rows[7]="..wwwwwwww..";rows.push("...wwwwww...")}else rows.push(".....ss.....");
 if(L.glasses){rows[4]=rows[4].replace('sesses','weswew'.replace(/s/g,'s'))}
 const out=L.out,wd=L.wide;
 const torso={
  coat:["..cccccccc..",".cccccccccc.",".cccccccccc.",".ccccaacccc.",".cccaaaaccc.",".sccccccccs.","..cccccccc.."],
  apron:["..cccccccc..",".ccaaaaaacc.",".ccaaaaaacc.",".ccaaaaaacc.",".ccaaaaaacc.",".saaaaaaaas.","..aaaaaaaa.."],
  robe:["..cccccccc..",".cccccccccc.",".cccccccccc.",".cccaaaaccc.",".cccccccccc.",".sccccccccs.","..cccccccc.."],
  dress:["..cccccccc..",".cccaaaaccc.",".cccccccccc.",".cccccccccc.",".cccccccccc.",".sccccccccs.",".cccccccccc."],
  vest:["..caaaaaac..",".ccaaaaaacc.",".ccaaaaaacc.",".ccaaaaaacc.",".ccppppppcc.",".sppppppppp.","..pppppppp.."]}[out]||[];
 const T=torso.map(r=>r.length<12?r+'.'.repeat(12-r.length):r.slice(0,12));
 if(L.scarf){T[0]="..aaaaaaaa..";T[1]=".caaaacccccc".slice(0,12)}
 if(L.tape){T[0]="..cgcccgcc..";T[1]=".ccgccccgcc."}
 if(L.buttons){T[1]=T[1].slice(0,6)+'g'+T[1].slice(7);T[3]=T[3].slice(0,6)+'g'+T[3].slice(7)}
 for(const r of T)rows.push(r);
 const legs=out==='robe'||out==='dress'?
  (sit?["cccccccccccc","ccccccccbbb.","............"]:[out==='dress'?".cccccccccc.":"..cccccccc..",out==='dress'?"cccccccccccc":".cccccccccc.",frame?"..bb....bb..":"...bb..bb...","..bbb..bbb.."]):
  (sit?["..pppppppppp","..ppppppppbb","..........bb"]:(frame?["..pppppppp..","..ppp...ppp.","..pp....pp..","..bb....bbb.",".bbb....bbb."]:["..pppppppp..","..ppp..ppp..","...pp..pp...","...bb..bb...","..bbb..bbb.."]));
 for(const r of legs)rows.push(r);
 if(wd)for(let i=8;i<rows.length;i++){const r=rows[i];rows[i]=r.replace(/^\.(c|a|s)/,'$1$1')}
 return rows}
function vOutline(rows){const h=rows.length,w=Math.max(...rows.map(r=>r.length)),g=[];for(let j=0;j<h+2;j++){let s='';for(let i=0;i<w+2;i++){const at=(ii,jj)=>{const r=rows[jj];return r&&r[ii]&&r[ii]!=='.'};if(at(i-1,j-1))s+=rows[j-1][i-1];else if(at(i-2,j-1)||at(i,j-1)||at(i-1,j-2)||at(i-1,j))s+='o';else s+='.'}g.push(s)}return g}
const _VSP={};
function vSprite(key,L,skin,frame,sit){const k=key+'|'+frame+'|'+(sit?1:0)+'|'+skin;if(_VSP[k])return _VSP[k];const pal=Object.assign({s:skin,e:'#1a1418',m:'#b86a6a',w:'#f0f0f0',g:'#ffd166',k:'#6a6a70'},L.pal);
 let rows=vRows(L,frame,sit);if(sit)rows=rows.map((r,j)=>{r=r.replace(/e/g,'m');return j<9?'.'+r.slice(0,-1):r});return _VSP[k]={g:shadeGrid(vOutline(rows),pal),w:14}}
const _vBC=new Map();
function vBlit(g,X,Y,s,fl){const k=(SS||1),key=g;let m=_vBC.get(g);if(!m){m={};_vBC.set(g,m)}const ck=s+'|'+(fl?1:0)+'|'+k;let c=m[ck];
 if(!c&&typeof document!=='undefined'){c=document.createElement('canvas');c.width=Math.ceil(14*s*k);c.height=Math.ceil(g.length*s*k);const x=c.getContext('2d');x.imageSmoothingEnabled=false;drawGrid(x,g,0,0,s*k,fl,14,0,0);m[ck]=c}
 if(c)ctx.drawImage(c,X,Y,c.width/k,c.height/k);else drawGrid(ctx,g,X,Y,s,fl,14,0,0)}
function vDrawPerson(key,L,skin,x,y,s,now,walk,fl,sit,opts){const sp=vSprite(key,L,skin,walk?(Math.floor(now/180)%2):0,sit),g=sp.g,h=g.length,X=Math.round(x-7*s),Y=Math.round(y-h*s+(walk?-Math.abs(Math.round(Math.sin(now/180*Math.PI)*.6)):0));
 RA(x-6*s,y-1,12*s,2,'#000',.25);RA(x-4*s,y,8*s,1,'#000',.18);
 if(opts&&opts.back)opts.back(X,Y);drawGrid(ctx,g,X,Y,s,fl,14,0,0);
 const blink=!sit&&Math.floor((now+x*37)/140)%28===0;if(blink){const ey=4+1;for(let i=3;i<11;i++){const c=g[ey]&&g[ey][fl?13-i:i];if(c&&(c==='#1a1418'))R(X+i*s,Y+ey*s,s,s,shade(L.pal.s||skin,.9))}}
 return {X,Y}}
function vProp(prop,X,Y,s,fl,now,lit){const hx=fl?X+1*s:X+12*s,hy=Y+15*s;
 switch(prop){
 case 'key':R(hx,hy-6*s,1*s,7*s,'#ffd166');pcirc(hx+.5*s,hy-7*s,1.6*s,'#ffd166');pcirc(hx+.5*s,hy-7*s,.7*s,'#2a1a10');R(hx,hy,2*s,1*s,'#ffd166');break;
 case 'spear':R(hx,Y-2*s,1*s,24*s,'#6a4a2a');bbTriV(hx-1.5*s,Y-2*s,4*s,4*s,'#c8d0d8',-1);break;
 case 'lantern':R(hx,Y+2*s,1*s,14*s,'#4a3a2a');R(hx-1*s,Y+1*s,4*s,1*s,'#4a3a2a');R(hx+1*s,Y+2*s,2*s,3*s,'#2a2020');R(hx+1.5*s,Y+2.5*s,1*s,2*s,lit?'#ffe36b':'#6a6a50');if(lit)glow(hx+2*s,Y+3.5*s,12,'#ffe36b',.35);break;
 case 'hammer':R(hx,hy-8*s,1*s,9*s,'#6a4a2a');R(hx-2*s,hy-10*s,5*s,3*s,'#6a6a74');R(hx-2*s,hy-10*s,5*s,1*s,'#9aa0a8');break;
 case 'flag':R(hx,hy-10*s,1*s,11*s,'#8a8a8a');R(hx+(fl?-4:1)*s,hy-10*s,4*s,3*s,'#d84a4a');break;
 case 'bellrod':R(hx,hy-6*s,1*s,7*s,'#8a6a3a');pcirc(hx+.5*s,hy-7*s,1.5*s,'#e8b040');break;
 case 'book':R(hx-2*s,hy-3*s,4*s,5*s,'#8a2a2a');R(hx-2*s,hy-3*s,4*s,1*s,'#e8d0a0');break;
 case 'basket':R(hx-2*s,hy-1*s,5*s,3*s,'#a87a40');R(hx-2*s,hy-1*s,5*s,1*s,'#d8a860');pcirc(hx-.5*s,hy-1.5*s,1*s,'#d84a4a');pcirc(hx+1.5*s,hy-1.5*s,1*s,'#7dd04a');break;
 case 'needle':R(hx,hy-4*s,1*s,4*s,'#e8e8f0');R(hx,hy-5*s,1,1,'#ffffff');break;
 case 'scope':R(hx-1*s,hy-8*s,2*s,7*s,'#8a6a3a');R(hx-1*s,hy-9*s,2*s,1*s,'#ffd166');break}}
/* ---------- 조명 레이어 (밤 · 저녁) ---------- */
let _vLightCv=null,_vLightCtx=null;
function vLight(){if(_vLightCv)return _vLightCtx;if(typeof document==='undefined')return null;_vLightCv=document.createElement('canvas');_vLightCv.width=W;_vLightCv.height=H;_vLightCtx=_vLightCv.getContext('2d');return _vLightCtx}
/* ---------- 건물 ---------- */
const V_BLD=[
 {x:78,w:104,h:70,wall:'#d8c8a8',beam:'#5a3a24',roof:'#8a3a2a',sign:'태엽 공방',kind:'home',wake:10,icon:'gear'},
 {x:196,w:60,h:52,wall:'#a8b0b8',beam:'#4a4a52',roof:'#3a4a5a',sign:'초소',kind:'post',wake:1,icon:'shield'},
 {x:300,w:72,h:58,wall:'#c8d0e0',beam:'#3a4a6a',roof:'#2a3a6a',sign:'등불집',kind:'lamp',wake:2,icon:'lamp'},
 {x:412,w:100,h:64,wall:'#b8a898',beam:'#3a2a20',roof:'#4a3a34',sign:'대장간',kind:'forge',wake:3,icon:'anvil'},
 {x:530,w:88,h:56,wall:'#c0c8d0',beam:'#2a3040',roof:'#2a3a5a',sign:'간이역',kind:'station',wake:4,icon:'train'},
 {x:806,w:96,h:70,wall:'#c8e0d8',beam:'#2a4a4a',roof:'#2a5a5a',sign:'기록관',kind:'lib',wake:5,icon:'book'},
 {x:920,w:88,h:60,wall:'#e8d8b0',beam:'#6a4a2a',roof:'#a84a2a',sign:'잡화점',kind:'shop',wake:7,icon:'bag'},
 {x:1028,w:80,h:60,wall:'#e8c8d8',beam:'#5a2a4a',roof:'#7a3a5a',sign:'재봉소',kind:'tailor',wake:8,icon:'needle'},
 {x:1124,w:44,h:112,wall:'#8a7a5a',beam:'#4a3a24',roof:'#5a3a24',sign:'망루',kind:'tower',wake:9,icon:'eye'}];
function vIcon(k,x,y,col){switch(k){
 case 'gear':for(let i=0;i<8;i++){const a=i*TAU/8+performance.now()/900;R(x+Math.cos(a)*4-1,y+Math.sin(a)*4-1,2,2,col)}pcirc(x,y,3,col);pcirc(x,y,1.2,'#2a1a10');break;
 case 'shield':R(x-3,y-4,7,6,col);bbTriV(x-3,y+2,7,3,col,1);R(x,y-3,1,6,'#2a1a10');break;
 case 'lamp':R(x-1,y-4,3,1,col);R(x-2,y-3,5,5,col);R(x-1,y-2,3,3,'#ffe36b');break;
 case 'anvil':R(x-4,y-2,9,3,col);R(x-1,y+1,3,2,col);R(x-3,y+3,7,1,col);bbTriH(x-4,y-2,3,3,col,-1);break;
 case 'train':R(x-4,y-3,8,5,col);R(x-3,y-2,2,2,'#ffe9a8');pcirc(x-2,y+3,1.2,col);pcirc(x+2,y+3,1.2,col);R(x+2,y-5,2,2,col);break;
 case 'book':R(x-4,y-3,4,6,col);R(x+1,y-3,4,6,col);R(x,y-3,1,6,'#2a1a10');break;
 case 'bag':R(x-3,y-2,7,6,col);R(x-2,y-4,1,2,col);R(x+2,y-4,1,2,col);break;
 case 'needle':bbLine(x-4,y+4,x+4,y-4,col);R(x+3,y-4,1,1,'#ffffff');bbLine(x-4,y-2,x+2,y+3,'#d84a4a');break;
 case 'eye':R(x-4,y,9,1,col);R(x-3,y-1,7,3,col);pcirc(x,y,1.5,'#2a1a10');break}}
function vBld2(b,now,st){const lit=V.p>=b.wake,base=150,X=Math.round(b.x-b.w/2-V.camX),w=b.w,h=b.h;if(X>W+50||X+w<-50)return;const top=base-h,t=now/1000;
 if(b.kind==='tower'){R(X+4,top,w-8,h,b.beam);for(let j=top+4;j<base;j+=10){bbLine(X+4,j,X+w-4,j+8,'#6a5030');bbLine(X+w-4,j,X+4,j+8,'#6a5030')}R(X,top-16,w,16,b.wall);R(X,top-16,w,2,'#b8a880');for(let i=0;i<w;i+=6)R(X+i,top-18,3,3,b.wall);
  R(X+8,top-12,w-16,8,lit?'#ffe9a8':'#1c2438');for(let k=0;k<10;k++){const ww=w+10-k*5.5;R(X+w/2-ww/2,top-18-k*2.5-2,ww,2.5,k%2?b.roof:shade(b.roof,.85))}
  const sa=lit?Math.sin(t*.4)*.3-.3:.4;R(X+w/2,top-10,1,1,'#000');bbLine(X+w/2,top-8,X+w/2+Math.cos(sa)*14,top-8+Math.sin(sa)*14,'#c8a060');
  for(let j=top+10;j<base;j+=8)R(X+w/2-3,j,6,1,'#8a6a40');R(X+w/2-3,top,1,h,'#8a6a40');R(X+w/2+2,top,1,h,'#8a6a40');vSignBoard(b,X+w/2,top-30,lit);return}
 // 돌 기초
 R(X-2,base-9,w+4,9,'#6a6a70');for(let i=0;i<w+4;i+=7){const o=(Math.floor(i/7)%2)*3;R(X-2+i,base-9,6,4,'#7a7a82');R(X-2+i+o,base-4,6,4,'#5e5e66')}
 // 벽 (반목조)
 R(X,top,w,h-9,b.wall);for(let j=top+3;j<base-9;j+=4)RA(X,j,w,1,'#000',.04);
 R(X,top,3,h-9,b.beam);R(X+w-3,top,3,h-9,b.beam);R(X,top+Math.round(h*.45),w,2,b.beam);R(X,top,w,2,b.beam);
 for(let i=24;i<w-10;i+=26){R(X+i,top,2,h-9,b.beam);bbLine(X+i-12,top+Math.round(h*.45),X+i,top+2,b.beam)}
 // 지붕 (기와)
 const rh=Math.round(h*.5),ov=8;for(let k=0;k<rh;k++){const q=k/rh,ww=Math.round((w+ov*2)*(1-q*.82)),xx=X+w/2-ww/2,yy=top-k;R(xx,yy,ww,1,(Math.floor(k/3)%2)?b.roof:shade(b.roof,.82));if(k%3===0)for(let i=((k/3)%2)*3;i<ww;i+=6)R(xx+i,yy,1,1,shade(b.roof,.6))}
 R(X-ov,top,w+ov*2,2,shade(b.roof,.55));R(X-ov,top-1,w+ov*2,1,mixc(b.roof,'#ffffff',.25));
  // 굴뚝
 const cx=X+w-20;R(cx,top-rh+6,8,rh-4,'#7a5a4a');R(cx-1,top-rh+5,10,2,'#5a4038');if(lit)for(let k=0;k<4;k++){const q=((t*.5)+k/4+b.x*.01)%1;pcirc(cx+4+Math.sin(q*5+b.x)*3+q*6,top-rh+2-q*26,2+q*4,st==='a'?'#8a8a98':'#c8c8d0',.4*(1-q))}
 // 창문
 const dx=X+w/2-8,winY=top+8,wins=[];for(let wx=X+8;wx<X+w-18;wx+=26){if(wx+14>dx-2&&wx<dx+18)continue;wins.push(wx)}
 for(const wx of wins){R(wx-1,winY-1,16,15,b.beam);R(wx,winY,14,13,lit?'#ffd88a':'#1a2236');if(lit){R(wx+1,winY+1,12,4,'#ffe9b8');RA(wx+2,winY+7,5,6,'#6a4a2a',.5)}else{R(wx,winY,7,13,'#3a2a20');R(wx+7,winY,7,13,'#342418');R(wx+3,winY+5,1,3,'#6a4a2a');R(wx+10,winY+5,1,3,'#6a4a2a')}
  R(wx+6,winY,2,13,b.beam);R(wx,winY+6,14,1,b.beam);R(wx-2,winY+13,18,3,'#6a4a2a');for(let i=0;i<5;i++)R(wx+i*3,winY+11,2,2,['#ff6a8a','#ffd166','#ff8a3a','#b89cff','#ff6a8a'][(i+b.x)%5]);if(lit)RA(wx-4,winY-3,22,20,'#ffd88a',.1)}
 // 문 (아치)
 const dy=base-24;R(dx-2,dy-2,20,24,b.beam);for(let j=0;j<4;j++){const ww=16-(3-j)*3;R(dx+8-ww/2,dy-5+j,ww,1,b.beam)}R(dx,dy,16,22,lit?'#7a5030':'#4a3020');for(let i=3;i<16;i+=4)R(dx+i,dy,1,22,shade(lit?'#7a5030':'#4a3020',.7));R(dx+12,dy+11,2,2,'#ffd166');R(dx-4,base-2,24,2,'#8a8a90');
 if(lit){R(dx+20,dy+2,1,4,'#2a2020');R(dx+19,dy+6,3,4,'#3a3030');R(dx+20,dy+7,1,2,'#ffe36b');glow(dx+20,dy+8,10,'#ffe36b',.3)}
 vSignBoard(b,X+w/2,top+Math.round(h*.45)-9,lit);
 // 종류별
 if(b.kind==='forge'){const fx=X+8;R(fx,base-26,24,17,'#2a1a14');R(fx+3,base-23,18,11,lit?'#ff7a2a':'#2a2020');if(lit){R(fx+6,base-21,12,6,'#ffd166');glow(fx+12,base-18,20,'#ff7a2a',.35);if(Math.floor(now/90)%3===0)for(let i=0;i<3;i++)RA(fx+8+RND()*10,base-30-RND()*10,1,1,'#ffe36b',1)}R(X+w-40,base-12,16,4,'#5a5a64');R(X+w-36,base-8,8,6,'#4a4a54');R(X+w-38,base-3,12,2,'#3a3a44')}
 if(b.kind==='station'){R(X-14,base-6,w+28,6,'#7a7a82');R(X-14,base-6,w+28,1,'#e8c040');R(X-8,base-32,2,26,'#3a3a44');pcirc(X-7,base-35,5,'#e8e0d0');pcirc(X-7,base-35,4,'#fff6e0');R(X-7,base-38,1,3,'#2a1a1a');R(X-7,base-35,3,1,'#2a1a1a')}
 if(b.kind==='shop'){for(let i=0;i<w+4;i+=8){R(X-2+i,top+Math.round(h*.45)+4,8,6,(i/8)%2?'#f0e8d8':'#d84a4a');bbTriV(X-2+i,top+Math.round(h*.45)+10,8,3,(i/8)%2?'#f0e8d8':'#d84a4a',1)}
  for(const cx2 of [X-18,X+w+4]){R(cx2,base-12,14,12,'#8a6a3a');R(cx2,base-12,14,2,'#a8844a');for(let i=0;i<4;i++)pcirc(cx2+3+i*3,base-13,1.6,['#d84a4a','#7dd04a','#ffd166','#d84a4a'][i])}}
 if(b.kind==='tailor'&&wins[0]){const wx=wins[0];R(wx+3,winY+3,4,6,'#ff8ad0');pcirc(wx+5,winY+2,1.5,'#e8d8c0')}
 if(b.kind==='lib'&&wins.length){for(const wx of wins)for(let i=0;i<4;i++)R(wx+1+i*3,winY+8,2,5,['#d23a3a','#3a6ad2','#3ad26a','#d2a03a'][i])}
 if(b.kind==='home'){const gx=X+14,gy=top-6;vIcon('gear',gx,gy,'#c8a060');R(X+w-34,top+10,16,16,'#6a4a2a');pcirc(X+w-26,top+18,7,'#fff6e0');const a=now/1600;bbLine(X+w-26,top+18,X+w-26+Math.cos(a)*5,top+18+Math.sin(a)*5,'#2a1a1a')}
 if(b.kind==='post'){R(X+w+2,base-30,2,30,'#6a4a2a');R(X+w+4,base-30,10,7,'#d84a4a')}}
function vSignBoard(b,cx,y,lit){ctx.font='bold 8px monospace';const tw=ctx.measureText(b.sign).width,bw=tw+18;R(cx-bw/2-1,y-1,bw+2,12,'#2a1a10');R(cx-bw/2,y,bw,10,lit?'#e8d0a0':'#7a6a58');R(cx-bw/2,y,bw,1,lit?'#fff0c8':'#8a7a68');vIcon(b.icon,cx-bw/2+7,y+5,lit?'#6a4a2a':'#4a3a2a');ctx.fillStyle='#2a1a10';ctx.textAlign='left';ctx.fillText(b.sign,cx-bw/2+13,y+8)}
function vTower2(x,now,st){const X=Math.round(x-V.camX),base=150;if(X<-70||X>W+70)return;const lit=V.p>=6,w=48,top=base-150;
 R(X-w/2-2,base-10,w+4,10,'#6a6a70');R(X-w/2,top,w,140,'#8a7a8a');for(let j=top+2;j<base-10;j+=6){const o=(Math.floor(j/6)%2)*6;for(let i=0;i<w;i+=12)R(X-w/2+i+o,j,11,5,(i+j)%3?'#948494':'#7e6e7e')}
 R(X-w/2,top,3,140,'#5a4a5a');R(X+w/2-3,top,3,140,'#5a4a5a');for(let k=0;k<18;k++){const ww=w+8-k*3;R(X-ww/2,top-k*2-2,ww,2,k%2?'#7a2a3a':'#6a2234')}R(X-1,top-40,2,6,'#ffd166');pcirc(X,top-41,2,'#ffd166');
 R(X-14,top+6,28,28,'#1a1018');R(X-14,top+6,28,2,'#3a2a3a');const sw=V.bellT&&now-V.bellT<2400?Math.sin((now-V.bellT)/120)*.45*(1-(now-V.bellT)/2400):0;
 ctx.save();ctx.translate(X,top+10);ctx.rotate(sw);for(let j=0;j<14;j++){const ww=6+j*.8;R(-ww/2,j,ww,1,lit?(j<3?'#ffe08a':'#e0a838'):(j<3?'#a89060':'#8a7040'))}R(-9,14,18,3,lit?'#ffd166':'#9a8050');R(-1,17,3,3,'#6a4a20');ctx.restore();if(lit&&sw)glow(X,top+20,26,'#ffe9b0',.25);
 pcirc(X,top+62,13,'#3a2a3a');pcirc(X,top+62,11,'#fff6e0');for(let i=0;i<12;i++){const q=i*TAU/12;R(X+Math.cos(q)*9-.5,top+62+Math.sin(q)*9-.5,1,1,'#6a4a3a')}const a=now/2000;bbLine(X,top+62,X+Math.cos(a)*8,top+62+Math.sin(a)*8,'#2a1a1a');bbLine(X,top+62,X+Math.cos(a/12)*5,top+62+Math.sin(a/12)*5,'#b83a2a');
 for(let j=0;j<5;j++){const ww=16-(4-j)*3;R(X-ww/2,base-32+j,ww,1,'#3a2a20')}R(X-8,base-28,16,18,'#4a3020');R(X-8,base-28,1,18,'#2a1a10');R(X+7,base-28,1,18,'#2a1a10');
 if(lit){R(X+30,base-40,2,40,'#8a6a3a');R(X+28,base-4,6,4,'#e8b040')}}
/* ---------- 메인 그리기 ---------- */
function drawVillage(now){if(!V)return;const st=vStage(V.p),cam=V.camX,t=now/1000;
 const sky=st==='a'?['#070918','#22203c']:st==='b'?['#6aa8e8','#ffe0b8']:['#2a1a48','#ff9a6a'];memSky(sky[0],sky[1],0,152);
 if(st==='a'){for(let i=0;i<70;i++){const r=rng(i*7);RA(((r()*W*1.6-cam*.08)%W+W)%W,r()*120,1,1,'#ffffff',.25+.55*Math.abs(Math.sin(t*.8+i)))}pcirc(400-cam*.04,38,13,'#f0ecd0');pcirc(406-cam*.04,34,12,sky[0]);glow(398-cam*.04,38,34,'#f0ecd0',.12)}
 else if(st==='b'){pcirc(110-cam*.04,64,20,'#fff4c0');glow(110-cam*.04,64,60,'#fff0b0',.3);for(let i=0;i<5;i++){const cx=((i*170+t*6-cam*.12)%(W+200)+W+200)%(W+200)-100,cy=30+i*9;for(const [dx,dy,r] of [[0,0,12],[12,2,10],[-12,3,9],[5,-5,9]])pcirc(cx+dx,cy+dy,r,'#ffffff',.85)}}
 else{pcirc(380-cam*.04,112,26,'#ffb070');glow(380-cam*.04,112,70,'#ff9a6a',.28);for(let i=0;i<4;i++){const cx=((i*190+t*4-cam*.12)%(W+200)+W+200)%(W+200)-100;RA(cx-30,40+i*12,60,4,'#ff8aa8',.35)}}
 const ml=[st==='a'?'#10142a':st==='b'?'#8ab0d0':'#5a3a6a',st==='a'?'#161a30':st==='b'?'#6a90b0':'#4a2a5a'];
 for(const [li,par,hh] of [[0,.15,70],[1,.3,46]]){for(let x=-20;x<W+20;x+=2){const wx=x+cam*par,yy=152-hh*(.55+.45*Math.sin(wx*.013+li*2)*Math.sin(wx*.0071+li));R(x,yy,2,152-yy,ml[li])}}
 const mx=Math.round(VW-60-cam*.55);R(mx,98,60,54,'#3a3040');for(let i=0;i<60;i+=6)R(mx+i,96,4,3,'#3a3040');R(mx+18,116,24,36,'#0a0810');R(mx+16,114,28,3,'#6a4a2a');R(mx+16,114,3,38,'#6a4a2a');R(mx+41,114,3,38,'#6a4a2a');ctx.font='7px monospace';ctx.fillStyle='#b8a888';ctx.fillText('광산',mx+22,110);
 // 땅 (자갈 · 보도)
 R(0,150,W,150,st==='a'?'#26242c':'#6a5e54');R(0,150,W,6,st==='a'?'#3a3844':'#8a7e70');for(let i=((-cam)%16+16)%16-16;i<W;i+=16)R(i,150,1,6,st==='a'?'#2a2830':'#766a5e');
 for(let y=160;y<300;y+=7){const rr=rng(y*13);for(let x0=-((cam+y*3)%14);x0<W;x0+=14){const v=rng(Math.floor((x0+cam)/14)*31+y)();R(x0,y,12,5,st==='a'?(v<.5?'#2e2c36':'#34323e'):(v<.5?'#7a6e62':'#827668'));R(x0,y,12,1,st==='a'?'#3a3844':'#8e8274')}}
 for(let i=0;i<30;i++){const r=rng(i*97),wx=r()*VW,X=wx-cam;if(X<-6||X>W+6)continue;const y=156+r()*4;R(X,y,1,3,'#4a7a3a');R(X+2,y+1,1,2,'#5a8a4a');R(X-2,y+1,1,2,'#3a6a2a')}
 // 뒤편 건물
 for(const b of V_BLD)vBld2(b,now,st);vTower2(672,now,st);
 // 분수
 const fx=672-cam,fy=238;pcirc(fx,fy+2,26,'#000',.25);for(let j=0;j<10;j++){const ww=52-Math.abs(j-5)*3;R(fx-ww/2,fy-5+j,ww,1,j<2?'#a8a8b0':'#8a8a92')}for(let j=0;j<7;j++){const ww=44-Math.abs(j-3)*3;R(fx-ww/2,fy-3+j,ww,1,st==='a'?'#23344e':'#3a7ac0')}
 R(fx-3,fy-18,6,16,'#9a9aa2');R(fx-6,fy-20,12,3,'#b0b0b8');if(st!=='a'){for(let i=0;i<10;i++){const q=((t*1.4)+i/10)%1,a=i*TAU/10;RA(fx+Math.cos(a)*14*q,fy-20-Math.sin(q*Math.PI)*14+q*14,2,2,'#cfefff',.85*(1-q*.5))}for(let i=0;i<3;i++){const q=((t*.8)+i/3)%1;RA(fx-18*q,fy+1,36*q,1,'#ffffff',.4*(1-q))}}else{R(fx-10,fy-1,20,1,'#4a6a8a')}
 // 벤치 · 통 · 화분
 for(const [bx,kind] of [[240,'bench'],[460,'barrel'],[600,'bench'],[750,'pot'],[860,'barrel'],[980,'pot'],[1090,'bench']]){const X=bx-cam;if(X<-30||X>W+30)continue;
  if(kind==='bench'){R(X-12,194,24,3,'#8a5a30');R(X-12,188,24,2,'#8a5a30');R(X-10,197,2,6,'#4a3020');R(X+8,197,2,6,'#4a3020')}
  else if(kind==='barrel'){R(X-6,184,12,16,'#7a4a24');R(X-6,187,12,1,'#3a3a40');R(X-6,195,12,1,'#3a3a40');R(X-6,184,12,1,'#9a6a3a')}
  else{R(X-5,190,10,8,'#a8583a');for(let i=0;i<5;i++)pcirc(X-4+i*2,188-(i%2)*2,1.8,['#ff6a8a','#ffd166','#7dd04a','#ff8a3a','#b89cff'][i])}}
 // 가로등
 const lamps=[140,350,590,740,870,1076],on=V.p>=2;for(const lx of lamps){const X=lx-cam;if(X<-20||X>W+20)continue;R(X-1,160,3,44,'#2a2a30');R(X-3,202,7,3,'#3a3a40');R(X-5,154,11,3,'#3a3a40');R(X-4,157,9,7,on?'#fff0b8':'#4a4a50');R(X-4,157,9,1,'#2a2a30');R(X,157,1,7,'#2a2a30');if(on){glow(X,161,26,'#ffe9a8',.28);RA(X-14,200,28,4,'#ffe9a8',.12)}}
 // 축제 장식 · 등롱
 if(st!=='a'){for(let s=40;s<VW;s+=170){const X0=s-cam;if(X0>W+20||X0+170<-20)continue;let px=null;for(let i=0;i<=17;i++){const x=X0+i*10,y=100+Math.sin(i/17*Math.PI)*16;if(px)bbLine(px[0],px[1],x,y,'#5a4a3a');px=[x,y];if(i%1===0&&i<17)bbTriV(x+1,y+1,7,7,['#ff4d6d','#ffd166','#4dc3ff','#7dff9a','#b89cff'][i%5],1)}}}
 if(st==='c'){for(const lx of [240,470,760,980,1150]){const X=lx-cam;if(X<-10||X>W+10)continue;bbLine(X,100,X,116,'#5a4a3a');R(X-5,116,10,12,'#d8402a');R(X-5,116,10,2,'#ffd166');R(X-5,126,10,2,'#ffd166');glow(X,122,18,'#ffb070',.35)}}
 // 사람들 (y 순서로)
 const [lb,val]=vStatus(V.p),nSleep=st==='a'?Math.round(val/100*8):0,people=[];
 const GEN=[{hair:'short',out:'coat',pal:{h:'#3a2a1a',c:'#6a8a5a',a:'#3a4a2a',p:'#3a3a48',b:'#2a2020'}},{hair:'long',out:'dress',pal:{h:'#6a3a1a',c:'#c86a6a',a:'#f0e0d0',p:'#8a3a3a',b:'#2a1a1a'}},{hair:'bun',out:'dress',pal:{h:'#2a1a1a',c:'#6a6ab8',a:'#e8e8f0',p:'#3a3a78',b:'#1a1a2a'}},{hair:'short',out:'vest',pal:{h:'#c89a50',c:'#8a5a3a',a:'#e8d8c0',p:'#4a3a2a',b:'#2a1a10'}},{hair:'band',out:'apron',pal:{h:'#1a1a1a',k:'#3a8a6a',c:'#7a6a5a',a:'#d8c8b0',p:'#4a4a3a',b:'#2a2020'}},{hair:'long',out:'robe',pal:{h:'#a8a8a8',c:'#5a6a7a',a:'#c8a860',p:'#3a4a5a',b:'#2a2a2a'}},{hair:'short',out:'coat',pal:{h:'#1a1a1a',c:'#b88a3a',a:'#6a4a2a',p:'#2a3a4a',b:'#1a1a1a'}},{hair:'bun',out:'vest',pal:{h:'#8a4a2a',c:'#3a7a8a',a:'#f0e8d0',p:'#3a3a3a',b:'#1a1a1a'}}];
 const benches=[[240,196],[600,196],[1090,196],[460,210],[860,210],[330,250],[980,250],[760,262]];
 for(let i=0;i<8;i++){const L=GEN[i],skin=V_SKIN[i%4];if(i<nSleep){const [bx,by]=benches[i];people.push({y:by,f:()=>{const X=bx-cam;if(X<-30||X>W+30)return;vDrawPerson('g'+i,L,skin,X,by,1.6,now,false,i%2===1,true);const z=((now/900)+i*.3)%1;ctx.font='bold 8px monospace';ctx.fillStyle='#b8c8ff';ctx.globalAlpha=1-z;ctx.fillText('z',X+6+z*6,by-24-z*10);ctx.fillText('Z',X+11+z*8,by-30-z*12);ctx.globalAlpha=1}})}
  else{const r=rng(i*31+5),hx=240+r()*820,hy=214+r()*56,ph=t*.35+i*2.1,wx=hx+Math.sin(ph)*34,walking=Math.abs(Math.cos(ph))>.25,fl=Math.cos(ph)<0;people.push({y:hy,f:()=>{const X=wx-cam;if(X<-30||X>W+30)return;vDrawPerson('g'+i,L,skin,X,hy,1.6,now+i*97,walking,fl,false);if(st==='b'&&i%3===0){const k=Math.floor(now/300+i)%2;R(X-2,hy-40-k,1,4,'#ffd166')}}})}}
 for(const n of V_NPC){const L=V_LOOK[n.id];people.push({y:192,f:()=>vNPC2(n,L,now,st)})}
 people.push({y:P.y,f:()=>{const fl=P.face.x<0;try{drawKnight(ctx,P.x-cam-12,P.y-19,2,fl,P.walkOn?P.walkT:null,P.walkOn?null:now/430)}catch(e){}try{drawTick(ctx,P.x-cam+(fl?16:-16),P.y-30+Math.sin(now/300)*3,now,1)}catch(e){}}});
 people.sort((a,b)=>a.y-b.y).forEach(p=>p.f());
 for(const q of V.parts)RA(q.x-cam,q.y,2,2,q.c,Math.min(1,q.l));
 // 출구 표지판
 const ex=VW-26-cam;R(ex-1,196,3,32,'#6a4a2a');R(ex-16,194,30,11,'#8a6a3a');R(ex-16,194,30,1,'#b89a6a');bbTriH(ex+14,194,5,11,'#8a6a3a',1);ctx.font='bold 7px monospace';ctx.fillStyle='#2a1a10';ctx.fillText('동굴 →',ex-13,202);
 // 조명 레이어
 if(st!=='b'){const lc=vLight();if(lc){lc.globalCompositeOperation='source-over';lc.clearRect(0,0,W,H);lc.fillStyle=st==='a'?'rgba(4,6,20,0.55)':'rgba(40,10,50,0.28)';lc.fillRect(0,0,W,H);lc.globalCompositeOperation='destination-out';
   const hole=(x,y,r,a)=>{const g=lc.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba(0,0,0,'+a+')');g.addColorStop(1,'rgba(0,0,0,0)');lc.fillStyle=g;lc.fillRect(x-r,y-r,r*2,r*2)};
   if(V.p>=2)for(const lx of lamps)hole(lx-cam,170,70,1);for(const b of V_BLD)if(V.p>=b.wake)hole(b.x-cam,150-b.h*.55,56,.8);if(V.p>=6)hole(672-cam,40,50,.6);hole(P.x-cam,P.y-14,46,.75);hole(P.x-cam+(P.face.x<0?16:-16),P.y-30,30,.6);
   if(st==='c')for(const lx of [240,470,760,980,1150])hole(lx-cam,122,40,.8);
   lc.globalCompositeOperation='source-over';ctx.drawImage(_vLightCv,0,0)}}
 if(st==='a')for(let i=0;i<14;i++){const r=rng(i*53),x=((r()*VW-cam)%W+W)%W,y=160+r()*120+Math.sin(t*1.3+i)*6;RA(x+Math.sin(t*.7+i)*8,y,1,1,'#c8ff8a',.5+.5*Math.sin(t*3+i))}
 // 상호작용 표시
 const tg=V.target;if(tg&&!dlg.active&&$('overlay').hidden){const X=tg.x-cam,txt=tg.kind==='exit'?'출발':tg.kind==='bellrope'?'종 치기':(vAwake(tg.n)?'대화':'살펴보기');const k=(isTouchUI()?'⚔ 버튼':'SPACE')+' · '+txt;ctx.font='bold 8px monospace';const w=ctx.measureText(k).width,ty=tg.kind==='npc'?tg.y-58:tg.y-44;R(X-w/2-5,ty,w+10,13,'#05090b');R(X-w/2-5,ty+12,w+10,1,'#ffe36b');ctx.fillStyle='#ffe36b';ctx.textAlign='center';ctx.fillText(k,X,ty+9);
  if(tg.kind==='npc'){ctx.font='bold 9px monospace';shText(tg.n.name,X,ty-4,'#ffffff')}ctx.textAlign='left'}
 // 상단 HUD
 R(0,0,W,16,'#05090bcc');R(0,16,W,1,'#3a4a4f');ctx.font='bold 9px monospace';shText('시계골 · '+(st==='a'?'밤':st==='b'?'새벽':'저녁'),6,11,'#e8d0a0');ctx.textAlign='right';shText('🪙 '+(saveData.coins||0)+'   '+lb+' '+val+'%',W-6,11,st==='a'?'#ff9aa8':'#cfe8d0');ctx.textAlign='left';
 const awake=V_NPC.filter(vAwake).length;ctx.font='bold 8px monospace';ctx.textAlign='center';shText('깨어난 이웃 '+awake+' / '+V_NPC.length,W/2,11,'#b9cbc4');ctx.textAlign='left'}
function vNPC2(n,L,now,st){const X=Math.round(n.x-V.camX),y=192;if(X<-30||X>W+30)return;const aw=vAwake(n),skin=n.id==='sun'?'#f0c8a0':V_SKIN[(n.x>>3)%4],fl=P.x<n.x;
 if(!aw){R(X-11,y-4,22,3,'#6a4a2a');R(X-11,y-16,3,15,'#6a4a2a');R(X+8,y-1,2,4,'#4a3020');R(X-10,y-1,2,4,'#4a3020');vDrawPerson(n.id,L,skin,X+1,y,2,now,false,false,true);
  const z=(now/1000)%1;ctx.font='bold 9px monospace';ctx.fillStyle='#b8c8ff';ctx.globalAlpha=1-z;ctx.fillText('z',X+10+z*6,y-34-z*10);ctx.fillText('Z',X+16+z*8,y-42-z*12);ctx.globalAlpha=1;return}
 const talk=V.target&&V.target.n===n;const o=vDrawPerson(n.id,L,skin,X,y,2,now,false,fl,false);vProp(L.prop,o.X,o.Y,2,fl,now,true);
 if(st==='b'&&!talk&&Math.floor(now/600+n.x)%4===0)R(X-1,y-52,2,5,'#ffd166');
 if(!saveData.vMet[n.id]){const k=Math.floor(now/300)%2;ctx.font='bold 12px monospace';ctx.textAlign='center';shText('!',X,y-50-k,'#ffe36b');ctx.textAlign='left';glow(X,y-54,10,'#ffe36b',.25)}}
/*VIL_END*/
/*HIR_BEGIN*/
