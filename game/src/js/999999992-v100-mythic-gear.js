/* ================= v100 신화 등급 · 스킬 (MYTH100) =================
   ① 새 등급 「신화」(전설 위): 캐릭터 15 · 무기 15 · 펫 15. 태엽 공방(골드)에서 산다(9,000 ~ 22,000골드).
   ② 신화 장비는 「스킬」을 가진다(방패 말고 직접 움직이는 능력). 장착한 세 장비(캐릭터 · 무기 · 펫)의 스킬이 모두 켜진다.
      회피 · 반격 · 연속 베기 · 연쇄 번개 · 처형 · 광폭 · 재생 · 분신 · 시간 감속 · 섬광 대시 · 유성 · 회전 칼날 · 별 탄환 · 치명 폭풍
      - 스킬이 터지면 캐릭터 위에 큰 이름표(아이콘 + 이름)와 빛 고리, 아래쪽 HUD의 스킬 칸이 반짝인다.
      - 전투 HUD(탑 · 보스전) 왼쪽 아래에 지금 켜진 스킬 칸(아이콘 · 이름 · 다시 쓰기까지 남은 시간)을 늘 보여 준다.
   ③ 태엽 공방: 목록을 등급별로 나눠 이름표(기본 · 일반 · 희귀 · 영웅 · 전설 · 프리미엄 · 신화)를 붙이고,
      카드마다 능력 · 특성 칩, 정보 칸에 큰 「스킬」 상자(아이콘 · 이름 · 쉬운 설명)를 보여 준다.
   연결: CB81.onHit · onBossHit · onHurt · onDash · onKill · onParry · dmgMul · critAdd 를 감싼다(탑 · 보스전 · 듀오 · 결투 모두).
   강화(ENH94)는 99999996보다 뒤에 만든 칸이라 여기서 같은 방식으로 직접 얹는다. */
(()=>{try{
 if(typeof CHARS==='undefined'||typeof WEAPONS==='undefined'||typeof PETS==='undefined'||!window.NG82||!window.CB81)return;
 const NG=NG82,TAU=Math.PI*2,now0=()=>performance.now();
 /* ---------- 스킬 목록 ---------- */
 const pc=v=>Math.round(v*100)+'%';
 const ABL={
  evade:{n:'회피',ico:'💨',col:'#bfe8ff',d:v=>'적의 공격을 '+pc(v)+' 확률로 완전히 피해요(잔상을 남기고 0.4초 무적).'},
  counter:{n:'반격',ico:'⚔',col:'#ffb060',d:()=>'회피 · 패링에 성공하면 주변 적을 자동으로 크게 벱니다.'},
  double:{n:'연속 베기',ico:'⟫',col:'#ffd166',d:v=>'공격이 '+pc(v)+' 확률로 한 번 더 들어가요.'},
  chain:{n:'연쇄 번개',ico:'⚡',col:'#fff6a0',d:v=>'맞힐 때 '+pc(v)+' 확률로 번개가 주변 적 3명에게 튀어요.'},
  execute:{n:'처형',ico:'☠',col:'#ff6a8a',d:()=>'체력이 30% 아래인 적에게 큰 추가 피해(잡몹은 한 방에).'},
  frenzy:{n:'광폭',ico:'🔥',col:'#ff5a3a',d:v=>'내 체력이 40% 아래면 피해 +'+pc(v)+' · 붉은 기운.'},
  regen:{n:'재생',ico:'✚',col:'#7dffa8',d:v=>v+'초마다 체력 +1.'},
  clone:{n:'분신',ico:'👥',col:'#b48aff',d:v=>v+'초마다 그림자 분신이 나와 3초 동안 함께 벱니다.'},
  timeslow:{n:'시간 감속',ico:'⌛',col:'#8de4ff',d:v=>v+'번 맞힐 때마다 모든 적이 2.5초 느려지고 그동안 내 피해 +25%.'},
  blink:{n:'섬광 대시',ico:'✧',col:'#ffffff',d:()=>'대시를 시작한 자리에서 빛이 터져 주변 적에게 피해.'},
  meteor:{n:'유성',ico:'☄',col:'#ff8a3a',d:()=>'적을 쓰러뜨리면 다음 적에게 유성이 떨어져요(보스전은 20번 맞힐 때마다).'},
  orbit:{n:'회전 칼날',ico:'◎',col:'#c8e8ff',d:v=>'칼날 '+v+'개가 몸 주위를 돌며 닿는 적을 벱니다.'},
  homing:{n:'별 탄환',ico:'✦',col:'#ffe36b',d:v=>v+'초마다 가장 가까운 적에게 따라가는 별을 쏴요.'},
  critstorm:{n:'치명 폭풍',ico:'✹',col:'#ff9af0',d:()=>'치명타가 터지면 주변에 충격파가 퍼져요.'}};
 /* 확률형은 더하고(상한), 시간형은 가장 짧은 것, 개수형은 더함 */
 const KIND={evade:['add',.5],double:['add',.6],chain:['add',.7],frenzy:['add',.8],regen:['min'],clone:['min'],timeslow:['min'],homing:['min'],orbit:['add',4],counter:['on'],execute:['on'],blink:['on'],meteor:['on'],critstorm:['on']};

 /* ---------- 신화 캐릭터 15 ---------- */
 const dots=(n,col,y0,y1,sp)=>(Q,b,t)=>{for(let i=0;i<n;i++){const q=(t*(sp||.5)+i/n)%1,x=4+((i*53)%20)+Math.sin(t*2+i)*2;Q.px(x,y1-(y1-y0)*q,col,Math.sin(q*Math.PI)*.85)}};
 const aura=(col)=>(Q,b,t)=>{const o=Q.o;o.save();o.globalAlpha=.16+.08*Math.sin(t*4);o.fillStyle=col;o.beginPath();o.ellipse(14,20+b,13,15,0,0,TAU);o.fill();o.restore()};
 const both=(...fs)=>(Q,b,t,v)=>{for(const f of fs)try{f(Q,b,t,v)}catch(e){}};
 const MC=[
  {name:'아르테온',sub:'신화의 검성',price:9000,hp:125,dash:10,abl:{double:.25,critstorm:1},crit:.08,desc:'왕관을 쓴 전설 너머의 검성. 한 번 휘두르면 두 번 벤다.',
   S:{skin:'#ffe0c8',hair:'#f4f0e0',hairStyle:'long',hat:'crown',top:'#2a2a4a',style:'armor',acc:'#ffd84a',cape:'#c8202a',pants:'#1e1e36',boot:'#ffd84a',eye:'#ffd84a',emblem:'#ffd84a',fx:both(aura('#ffd84a'),dots(4,'#ffe79a',0,32,.4))}},
  {name:'루나리아',sub:'달의 무희',price:9600,hp:118,dash:12,abl:{evade:.28},desc:'달빛을 밟고 춤추는 무희. 공격이 몸을 스치고 지나간다.',
   S:{skin:'#fff4ee',hair:'#d8e4ff',hairStyle:'long',hat:'halo',top:'#1e2a5a',robe:'#2a3a7a',acc:'#bfe8ff',pants:'#1e2a5a',boot:'#bfe8ff',eye:'#8de4ff',bigEye:1,fx:both(aura('#8de4ff'),(Q,b,t)=>{Q.C(24,4+Math.sin(t)*1.5,2.4,'#fff6d0',.9);Q.C(25,3.4+Math.sin(t)*1.5,2,'#1e2a5a',.95)})}},
  {name:'카이저',sub:'폭풍 군주',price:10200,hp:140,dash:10,abl:{chain:.3},desc:'뿔 투구의 폭풍 군주. 칼끝에서 번개가 갈라져 나간다.',
   S:{skin:'#e8d0b8',hair:'#3a3a5a',hairStyle:'spiky',hat:'horns',hatC:'#d8d8e8',top:'#2a2a3a',style:'armor',acc:'#8de4ff',cape:'#3a2a6a',pants:'#1a1a28',boot:'#2a2a3a',eye:'#fff6a0',fx:(Q,b,t)=>{if(Math.floor(t*8)%3===0){let x=4+Math.random()*20,y=2+b;for(let i=0;i<4;i++){const nx=x+(Math.random()-.5)*4;Q.L(x,y,nx,y+3,'#fff6a0');x=nx;y+=3}}}}},
  {name:'셀레네',sub:'별 사냥꾼',price:10800,hp:122,dash:12,abl:{blink:1,evade:.12},desc:'별빛 후드의 사냥꾼. 대시한 자리에 빛이 터진다.',
   S:{skin:'#ffe8d8',hair:'#c8b8ff',hairStyle:'bob',hat:'hood',hood:'#2a2a6a',top:'#3a3a8a',style:'vest',acc:'#ffe36b',scarf:'#ffe36b',pants:'#1e1e4a',boot:'#14143a',eye:'#ffe36b',quiver:1,fx:(Q,b,t)=>{for(let i=0;i<5;i++){const tw=.5+.5*Math.sin(t*5+i*2);Q.px(3+((i*41)%22),4+((i*29)%26),'#ffe36b',tw)}}}},
  {name:'바하무트',sub:'용기사',price:11500,hp:155,dash:10,abl:{meteor:1},dmgAdd:.08,desc:'붉은 날개의 용기사. 쓰러진 적 위로 유성이 떨어진다.',
   S:{skin:'#f0c8a0',hair:'#8a1a1a',hairStyle:'short',hat:'helmet',hatC:'#a02a2a',top:'#6a1a1a',style:'armor',acc:'#ffb040',wings:'#c8322a',tail:'#a02a2a',tailTip:'#ffb040',pants:'#3a1010',boot:'#2a0a0a',eye:'#ffb040',fx:dots(4,'#ff8a3a',14,32,.6)}},
  {name:'에레보스',sub:'그림자 왕',price:12200,hp:130,dash:11,abl:{clone:9},desc:'복면을 쓴 그림자의 왕. 그림자 분신이 함께 싸운다.',
   S:{skin:'#d8d0e8',hair:'#1a1424',hairStyle:'short',hat:'hood',hood:'#1a1424',mask:'#2a1a3a',top:'#14101c',style:'jacket',acc:'#b48aff',cape:'#2a1a4a',pants:'#0a0810',boot:'#0a0810',eye:'#b48aff',fx:both(aura('#6a3aff'),(Q,b,t)=>{const q=(t*.6)%1;Q.R(4+Math.sin(t*3)*2,30-q*20,2,2,'#b48aff',1-q)})}},
  {name:'아우로라',sub:'극광 성녀',price:12900,hp:135,dash:10,abl:{regen:3},poisonRes:.5,desc:'극광 날개의 성녀. 서 있기만 해도 상처가 아문다.',
   S:{skin:'#fff0e8',hair:'#a0ffe0',hairStyle:'long',hat:'halo',top:'#f4f8ff',robe:'#5ad0b0',acc:'#a0ffe0',wings:'#c8fff0',pants:'#5ad0b0',boot:'#f4f8ff',eye:'#5affd8',fx:both(aura('#5affd8'),(Q,b,t)=>{const q=(t*.5)%1;Q.P([[13,30-q*26],[15,30-q*26],[14,27-q*26]],'#7dffa8',(1-q)*.8)})}},
  {name:'크로노스',sub:'시간 지배자',price:13600,hp:128,dash:11,abl:{timeslow:14},desc:'톱니 고글의 시간술사. 일정하게 맞히면 시간이 느려진다.',
   S:{skin:'#ffe0c8',hair:'#e8d0a0',hairStyle:'pony',hat:'goggles',top:'#5a3a1a',style:'coat',acc:'#ffd166',cape:'#3a2a10',pants:'#2a1a0a',boot:'#5a3a1a',eye:'#8de4ff',fx:(Q,b,t)=>{const o=Q.o;o.save();o.globalAlpha=.55;o.strokeStyle='#ffd166';o.lineWidth=.8;o.beginPath();o.arc(14,18+b,13,t%TAU,t%TAU+4);o.stroke();o.restore()}}},
  {name:'이그니스',sub:'불꽃 황제',price:14300,hp:145,dash:10,abl:{frenzy:.4},onHit:'burn',desc:'불꽃 왕관의 황제. 몰릴수록 더 뜨겁게 타오른다.',
   S:{skin:'#f0c8a0',hair:'#ff6a2a',hairStyle:'spiky',hat:'crown',top:'#8a1a0a',style:'armor',acc:'#ffb040',cape:'#ff4d1a',pants:'#3a0a0a',boot:'#2a0a0a',eye:'#ffe36b',fx:both(aura('#ff5a2a'),dots(5,'#ffb040',10,32,.8))}},
  {name:'실피드',sub:'바람 정령',price:15000,hp:115,dash:12,abl:{evade:.2,blink:1},desc:'초록 날개의 바람 정령. 잡히지 않고, 지나간 자리엔 돌풍.',
   S:{skin:'#f0fff0',hair:'#7dffa8',hairStyle:'long',hat:'feather',hatC:'#5ad07a',featherC:'#ffffff',top:'#3a9a5a',style:'vest',acc:'#e8ffe8',wings:'#c8ffd8',pants:'#2a6a3a',boot:'#1e4a2a',eye:'#5ad07a',fx:dots(5,'#e8ffe8',2,32,1)}},
  {name:'니드호그',sub:'독룡 사도',price:15800,hp:150,dash:10,abl:{execute:1},onHit:'poison',poisonRes:1,desc:'독룡의 뿔과 꼬리. 약해진 적을 놓치지 않고 끝낸다.',
   S:{skin:'#d8e8c8',hair:'#2a5a1a',hairStyle:'short',hat:'horns',hatC:'#5aa02a',mask:'#1e3a14',top:'#1e3a14',style:'jacket',acc:'#b0ff5a',tail:'#5aa02a',tailTip:'#b0ff5a',pants:'#14240c',boot:'#0a1408',eye:'#b0ff5a',fx:dots(4,'#b6ff4a',8,32,.5)}},
  {name:'오딘',sub:'전쟁의 신',price:16700,hp:165,dash:10,abl:{counter:1,evade:.1},guard:0,desc:'외눈의 전쟁신. 피하거나 막는 순간 반격이 터진다.',
   S:{skin:'#f0d0b0',hair:'#e8e8f0',hairStyle:'long',hat:'helmet',hatC:'#c8c8d8',top:'#3a4a6a',style:'armor',acc:'#ffd84a',cape:'#1e2a4a',pants:'#1e2a3a',boot:'#5a4a2a',eye:'#ffd84a',fx:aura('#c8d8ff')}},
  {name:'미스트',sub:'안개 암살자',price:17600,hp:120,dash:12,abl:{evade:.22,double:.15},critAdd:.08,desc:'안개 속에서 나타나 두 번 찌르고 사라진다.',
   S:{skin:'#f0e0d8',hair:'#c8d0e0',hairStyle:'short',hat:'bandana',hatC:'#3a3a4a',mask:'#2a2a36',top:'#22222e',style:'vest',acc:'#8a9aaa',scarf:'#c8d0e0',pants:'#16161e',boot:'#0e0e14',eye:'#c8d0ff',fx:(Q,b,t)=>{const o=Q.o;o.save();o.globalAlpha=.18+.1*Math.sin(t*2);o.fillStyle='#c8d0e0';o.fillRect(2,24+b,24,8);o.restore()}}},
  {name:'가이아',sub:'대지의 거신',price:19000,hp:190,dash:9,abl:{regen:4,counter:1},shBreak:1,desc:'산을 짊어진 거신. 쓰러지지 않고, 막고, 되받아친다.',
   S:{skin:'#b8a888',hair:'#5a7a3a',hairStyle:'none',hat:'helmet',hatC:'#6a8a4a',top:'#5a4a30',style:'armor',acc:'#7dff9a',cape:'#3a5a2a',pants:'#3a2a1a',boot:'#2a1a0a',eye:'#7dff9a',fx:dots(3,'#9ad07a',22,33,.3)}},
  {name:'아스트라',sub:'은하의 마녀',price:22000,hp:140,dash:11,abl:{orbit:3,homing:3},pierce:.3,desc:'은하를 두른 마녀. 별 칼날이 돌고, 별 탄환이 날아간다.',
   S:{skin:'#fff0f8',hair:'#ff9af0',hairStyle:'long',hat:'witch',hatC:'#1a1a4a',hatAcc:'#ffe36b',top:'#2a1a6a',robe:'#1a1450',acc:'#ffe36b',pants:'#1a1450',boot:'#0e0a30',eye:'#ffe36b',bigEye:1,fx:both(aura('#a070ff'),(Q,b,t)=>{for(let i=0;i<6;i++){const tw=.5+.5*Math.sin(t*5+i*2);Q.px(2+((i*37)%24),2+((i*23)%28),i%2?'#ffe36b':'#ff9af0',tw)}})}}];
 const C0=CHARS.length;
 MC.forEach((c,i)=>{const it=Object.assign({},c,{scarf:null,hero:false,myth:1,v100:1});delete it.S;CHARS.push(it);CH2DEF[C0+i]={__v44:1,paint:NG.paintChar(c.S)}});

 /* ---------- 신화 무기 15 ---------- */
 /* 무기 그림(WSPR.m_*)은 999999993(디테일)이 칸마다 직접 찍어 정의한다 */
 const MW=[
  {name:'신살의 대검',type:'m_godgreat',ult:'great',price:9000,dmg:2.05,crit:.08,range:10,grogi:.16,abl:{double:.2},col:'#ffe79a',hilt:'#3a2a10',trail:'#fff0b0',sp:'신살 일격',desc:'신을 베었다는 황금 대검.'},
  {name:'월광 쌍월도',type:'m_moonkatana',ult:'katana',price:9700,dmg:2.0,crit:.22,range:4,grogi:.05,abl:{critstorm:1},col:'#c8e0ff',hilt:'#1e2a5a',trail:'#bfe8ff',sp:'월광 일섬',desc:'달빛이 서린 칼날. 치명타가 폭풍을 부른다.'},
  {name:'뇌신의 창',type:'m_thunderspear',ult:'spear',price:10400,dmg:2.08,crit:.08,range:16,grogi:.1,abl:{chain:.3},col:'#fff6a0',hilt:'#3a3a6a',trail:'#fff6a0',sp:'뇌신 강림',desc:'번개 신의 창. 찌를 때마다 번개가 튄다.'},
  {name:'용왕의 도끼',type:'m_dragonaxe',ult:'axe',price:11200,dmg:2.15,crit:.05,range:3,grogi:.18,abl:{meteor:1},onHit:'burn',col:'#ff6a4a',hilt:'#3a0a0a',trail:'#ffb060',sp:'용왕 강타',desc:'용의 비늘로 만든 도끼. 쓰러진 적 위로 유성.'},
  {name:'사신의 낫',type:'m_reaper',ult:'scythe',price:12000,dmg:2.12,crit:.12,range:11,grogi:.12,abl:{execute:1},col:'#c8a0ff',hilt:'#1a0a24',trail:'#b48aff',sp:'영혼 수확',desc:'약해진 적의 영혼을 거둬 가는 낫.'},
  {name:'성광 레이피어',type:'m_holyrapier',ult:'rapier',price:12800,dmg:2.1,crit:.16,range:7,grogi:.06,abl:{double:.3},col:'#fff6e0',hilt:'#c8a040',trail:'#ffffff',sp:'성광 연격',desc:'빛처럼 빠른 찌르기. 한 번에 두 번.',big:2},
  {name:'혼돈의 망치',type:'m_chaoshammer',ult:'great',price:13600,dmg:2.2,crit:.06,range:6,grogi:.22,shBreak:2,abl:{critstorm:1,counter:1},col:'#c88aff',hilt:'#1a0a2a',trail:'#d8a8ff',sp:'혼돈 붕괴',desc:'혼돈을 담은 망치. 맞받아치고, 치명타로 폭발.'},
  {name:'시간의 단검',type:'m_timedagger',ult:'dagger',price:14400,dmg:2.0,crit:.14,range:-3,grogi:.04,abl:{timeslow:12},col:'#8de4ff',hilt:'#2a4a6a',trail:'#bfffff',sp:'정지된 찰나',desc:'시간을 새긴 단검. 12번 맞히면 세상이 느려진다.'},
  {name:'별바다 검',type:'m_seastar',ult:'sword',price:15200,dmg:2.18,crit:.1,range:5,grogi:.1,abl:{homing:3},col:'#8ab8ff',hilt:'#ffe36b',trail:'#c8e0ff',sp:'별바다',desc:'별을 품은 검. 3초마다 별이 적을 쫓아간다.'},
  {name:'피의 군주 검',type:'m_bloodlord',ult:'sword',price:16000,dmg:2.24,crit:.1,range:5,grogi:.1,leech:.3,abl:{frenzy:.45},col:'#ff4d6d',hilt:'#2a0a10',trail:'#ff8a9a',sp:'피의 축제',desc:'피를 마시는 검. 몰릴수록 강해진다 · 흡혈 30%.'},
  {name:'서리왕관 대검',type:'m_frostcrown',ult:'great',price:17000,dmg:2.28,crit:.06,range:10,grogi:.16,onHit:'chill',abl:{orbit:2},col:'#bfe8ff',hilt:'#4a8ab0',trail:'#e0f8ff',sp:'빙관',desc:'얼음 칼날 2개가 몸 주위를 돈다.'},
  {name:'태초의 불꽃',type:'m_primeflame',ult:'flame',price:18000,dmg:2.32,crit:.08,range:7,grogi:.12,onHit:'burn',abl:{meteor:1,frenzy:.2},col:'#ffb040',hilt:'#5a1a0a',trail:'#ffd166',sp:'태초의 불',desc:'세상의 첫 불꽃. 유성을 부른다.'},
  {name:'바람신의 쌍검',type:'m_galetwin',ult:'dagger',price:19000,dmg:2.22,crit:.14,range:-1,grogi:.05,abl:{blink:1,evade:.15},col:'#c8ffd8',hilt:'#2a6a3a',trail:'#e8ffe8',sp:'질풍신',desc:'바람처럼 피하고, 대시마다 빛이 터진다.'},
  {name:'수호신의 창',type:'m_guardian',ult:'spear',price:20500,dmg:2.3,crit:.06,range:16,grogi:.12,abl:{counter:1,evade:.12},col:'#fff6e0',hilt:'#c8a040',trail:'#fff0c0',sp:'수호의 일격',desc:'막고 피한 만큼 되돌려 주는 창.'},
  {name:'영원의 검',type:'m_eternal',ult:'chrono',price:22000,dmg:2.4,crit:.14,range:10,grogi:.18,pierce:.5,abl:{double:.2,chain:.2},col:'#ffc8f0',hilt:'#6a2a5a',trail:'#ff9af0',sp:'영원 참격',desc:'모든 신화의 끝. 두 번 베고 번개가 튄다.',big:2}];
 for(const w of MW){if(WPOSE&&!WPOSE[w.type])WPOSE[w.type]=WPOSE[w.ult]||WPOSE.sword;w.hitF=({dagger:700,great:300,rapier:900,scythe:380,axe:260,spear:1000,sword:520,katana:820,flame:440,chrono:660})[w.ult]||500;w.myth=1;w.v100=1}

 /* ---------- 신화 펫 15 (9칸 도트, 9999998의 drawNewPet이 그대로 그림) ---------- */
 const MP=[
  {name:'불사조',price:9000,abl:{regen:4},desc:'불꽃 날개의 불사조.',spr:{p:{o:'#3a0a0a',R:'#ff4d1a',Y:'#ffd166',W:'#fff6d0',E:'#1a1a1a'},r:["Y...Y...Y","RY.YRY.YR",".RRRRRRR.","..oRERRo.","..oRRYYo.","...oRRo..","..R.R.R..",".Y..Y..Y.","........."],glow:'#ff8a3a'}},
  {name:'은하 용',price:9800,abl:{homing:2.5},desc:'별을 먹고 자란 작은 용.',spr:{p:{o:'#1a1a4a',B:'#5a4aff',b:'#3a2ab0',Y:'#ffe36b',W:'#e8e0ff',E:'#ffe36b'},r:["Y.W...W.Y",".WoBBBoW.","..oBEBBo.","..oBBBBBo","...oBbBo.",".Y.B.B.BY","...Y...Y.","........."],glow:'#8a7aff'}},
  {name:'시간 부엉이왕',price:10600,abl:{timeslow:15},regen:1.3,desc:'시계 눈의 부엉이 왕.',spr:{p:{o:'#2a1a08',B:'#c89a40',b:'#8a6420',Y:'#ffd166',W:'#fff6e0',E:'#8de4ff',K:'#ffd84a'},r:["K.K...K.K","oBBBBBBBo","oBWEBWEBo","oBWWBWWBo","oBBBYBBBo",".oBWWWBo.",".oBbbbBo.","..o...o..","........."],glow:'#ffd166'}},
  {name:'그림자 늑대',price:11400,abl:{double:.15,clone:12},desc:'그림자에서 뛰쳐나오는 늑대.',spr:{p:{o:'#0a0814',G:'#3a3050',g:'#1e1830',R:'#b48aff',W:'#e8e0ff'},r:["o......o.","Go....oG.","GGooooGG.","GRGGGRGGo","GGGWGGGGo",".oGGGGGo.",".oGg.gGo.",".oo...oo.","........."],glow:'#6a3aff'}},
  {name:'천둥 기린',price:12200,abl:{chain:.25},desc:'뿔에서 번개가 이는 기린.',spr:{p:{o:'#1a1a2a',Y:'#ffe36b',y:'#c8a020',W:'#fff6d0',E:'#1a1a1a',B:'#8de4ff'},r:["B.o.o....","..oYo....","..oYYEo..","...oYYo..","...oYo...","..oYyYYo.","..oYYYYo.","..o.o.o..","........."],glow:'#fff6a0'}},
  {name:'수정 거북왕',price:13000,abl:{counter:1,evade:.1},desc:'수정 등껍질의 거북 왕.',spr:{p:{o:'#1a2a3a',C:'#8de4ff',c:'#4a8ab0',W:'#e8f8ff',G:'#5ad07a',E:'#1a1a1a'},r:["...WW....","..oCWCo..",".oCcCcCo.","oCWCcCWCo","oCcCCCcCo","oGoooooGE",".G.....GG","........."],glow:'#8de4ff'}},
  {name:'별빛 여우',price:13800,abl:{evade:.18},desc:'꼬리가 별빛으로 빛나는 여우.',spr:{p:{o:'#2a1a0a',F:'#ffb060',f:'#c8702a',W:'#ffffff',E:'#1a1a1a',Y:'#ffe36b'},r:["oF.....Fo","oFFoooFFo",".oFEFEFo.",".oFFWFFo.","..oFFFo.Y","..oFfFoYY","..o...oY.","........."],glow:'#ffe36b'}},
  {name:'용암 골렘',price:14600,abl:{meteor:1},shBreak:.5,desc:'용암이 흐르는 골렘.',spr:{p:{o:'#1a0a0a',R:'#5a3a2a',L:'#ff6a1a',Y:'#ffd166',E:'#ffd166'},r:["..LoooL..",".oRRRRRo.","oRELRLERo","oRRLRLRRo","ooRLLLRoo","oRRRRRRRo",".oRo.oRo.",".oo...oo.","........."],glow:'#ff6a1a'}},
  {name:'서리 정령',price:15400,abl:{orbit:2},onHit:'chill',desc:'얼음 결정이 도는 정령.',spr:{p:{o:'#6a8aaa',W:'#ffffff',B:'#bfe8ff',b:'#6ab8ff',E:'#2a6ab0'},r:["B...W...B",".B.WWW.B.","..BWEWB..","WBBWWWBBW","..BWbWB..",".B.WWW.B.","B...W...B","........."],glow:'#bfe8ff'}},
  {name:'황금 드래곤',price:16200,abl:{frenzy:.35},dmgAdd:.06,desc:'황금 비늘의 작은 용.',spr:{p:{o:'#3a2a08',Y:'#ffd84a',y:'#c89a20',W:'#fff6d0',E:'#ff4d6d',R:'#ff6a2a'},r:["W..R.R..W","WW.oYo.WW",".WoYYYoW.","..oYEYYo.","..oYYYYYo","...oYyYo.","...Y.Y.Y.","........."],glow:'#ffd84a'}},
  {name:'암흑 까마귀',price:17000,abl:{execute:1},critAdd:.06,desc:'죽음을 알리는 까마귀.',spr:{p:{o:'#0a0a10',K:'#2a2a3a',k:'#14141e',R:'#ff4d6d',Y:'#ffd166'},r:["....oo...","...oKKo..","..oKRKKY.","..oKKKo..",".oKKKKKo.","oKkKKKkKo","...Y.Y...","........."],glow:'#ff4d6d'}},
  {name:'무지개 고래',price:18000,abl:{regen:3,homing:4},desc:'하늘을 헤엄치는 무지개 고래.',spr:{p:{o:'#1a2a4a',B:'#5a9aff',R:'#ff6a8a',Y:'#ffe36b',G:'#7dff9a',W:'#e8f4ff',E:'#ffffff'},r:["R.Y.G....",".......oo","..ooooooB","oBBBBBBBo","oBEBBBBBo","oWWWWBBo.",".oWWWWo..","..oooo...","........."],glow:'#ff9af0'}},
  {name:'바람 그리핀',price:19000,abl:{blink:1,evade:.12},desc:'바람을 가르는 그리핀.',spr:{p:{o:'#2a1a0a',B:'#c8a060',W:'#ffffff',Y:'#ffd166',E:'#1a1a1a',G:'#c8ffd8'},r:["G.......G","WWo...oWW",".WWoooWW.","..oBEBo..","..oBYBo..","..oBBBo..","..B...B..","........."],glow:'#c8ffd8'}},
  {name:'혼돈 슬라임',price:20000,abl:{critstorm:1,double:.1},desc:'무엇이든 될 수 있는 혼돈의 슬라임.',spr:{p:{o:'#2a0a3a',P:'#c86aff',p:'#8a3ac8',W:'#ffffff',E:'#1a1a1a',Y:'#ff9af0'},r:["....Y....","...oPo...","..oPPPo..",".oPWPWPo.",".oPEPEPo.","oPPPpPPPo","oPpPPPpPo",".ooooooo.","........."],glow:'#c86aff'}},
  {name:'여신의 천사',price:22000,abl:{homing:2,regen:4},guard:0,desc:'여신이 보낸 수호 천사.',spr:{p:{o:'#8a7a5a',W:'#ffffff',Y:'#ffe79a',S:'#ffe0c8',E:'#5ab8ff',G:'#ffd84a'},r:["..GGGGG..","W..SSS..W","WW.SES.WW",".WWSSSWW.","..WYYYW..","..WYYYW..","...W.W...","........."],glow:'#fff6d0'}}];
 const P0=PETS.length;
 MP.forEach((p,i)=>{const id=P0+i;PET_SPR[id]=p.spr;const it=Object.assign({},p);delete it.spr;it.myth=1;it.v100=1;PETS.push(it)});

 /* ---------- 강화(ENH94) · 현질 검 덮기를 새 칸에도 ---------- */
 const enhLv=(k,i)=>{try{return window.ENH94?ENH94.lvOf(k,i):0}catch(e){return 0}};
 function wrapNew(arr,from,k,apply,sword){for(let i=from;i<arr.length;i++){const base=arr[i],cache={};
  try{Object.defineProperty(arr,i,{configurable:true,enumerable:true,get(){const o=(sword&&window.PAY58&&PAY58.swordFor&&PAY58.swordFor(i))||base;if(o!==base)return o;const lv=enhLv(k,i);if(!lv)return base;
   if(!cache[lv]){const n=Object.assign(Object.create(base),base);apply(n,base,lv);n.__enh=lv;cache[lv]=n}return cache[lv]},set(v){}})}catch(e){}}}
 const W0=WEAPONS.length;MW.forEach(w=>WEAPONS.push(w));
 const EF=(window.ENH94&&ENH94.EFF)||{wp:.06,pt:.02};
 wrapNew(WEAPONS,W0,'wp',(n,o,lv)=>{n.dmg=+(((o.dmg||1)*(1+EF.wp*lv)).toFixed(3))},true);
 wrapNew(PETS,P0,'pt',(n,o,lv)=>{n.dmg=+(((o.dmg||0)+EF.pt*lv).toFixed(3))},false);

 /* ---------- 등급: 신화 ---------- */
 const MYTH={n:'신화',c:'#ff5a5a',k:6};
 {const f=wsTier;wsTier=function(it){if(it&&it.myth)return MYTH;return f.apply(this,arguments)}}

 /* ============ 스킬 엔진 ============ */
 const gear=()=>{try{return [curChar()||{},curWp()||{},curPet()||{}]}catch(e){return []}};
 function act(){const o={};for(const g of gear()){const a=g.abl;if(!a)continue;for(const k in a){const [m,cap]=KIND[k]||['on'];const v=a[k];
  if(m==='add')o[k]=Math.min(cap,(o[k]||0)+v);else if(m==='min')o[k]=o[k]?Math.min(o[k],v):v;else o[k]=1}}return o}
 let A={},aT=0;const AB=()=>{const n=now0();if(n-aT>500){aT=n;A=act()}return A};
 const S={hits:0,slowT:0,cloneT:0,cloneUntil:0,cloneHit:0,homT:0,regT:0,orbHit:{},flash:{},lastDmg:30,bossHits:0};
 const inTower=()=>typeof mode!=='undefined'&&mode==='tower'&&window.TW71&&TW71.T;
 const inBoss=()=>typeof mode!=='undefined'&&mode==='boss'&&typeof G!=='undefined'&&G&&G.state==='play';
 const spec=()=>!!(window.WATCH95&&WATCH95.specOn());
 const live=()=>!spec()&&!(typeof paused!=='undefined'&&paused)&&(inTower()?!TW71.T.dead&&!TW71.T.bossCard&&!TW71.T.clear:inBoss());
 const mobs=()=>inTower()?TW71.T.mobs.filter(m=>m.hp>0&&!(m.born>0)):[];
 const near=(x,y,r,ex)=>mobs().filter(m=>m!==ex&&Math.hypot(m.x-x,m.y-y)<r).sort((a,b)=>Math.hypot(a.x-x,a.y-y)-Math.hypot(b.x-x,b.y-y));
 function hitMob(m,d,col,tx){try{TW71.hitMob(m,d,col,tx)}catch(e){}}
 function hitBoss(d,col){try{if(inBoss()&&typeof spDmg==='function')spDmg(Math.max(1,Math.round(d)),G.boss.x,G.boss.y-10,col||'#ffffff',now0())}catch(e){}}
 const FX=[];
 function pop(k){const a=ABL[k];if(!a)return;const n=now0();S.flash[k]=n;const last=FX.find(f=>f.k==='pop'&&f.ab===k&&n-f.t0<500);if(last)return;FX.push({k:'pop',ab:k,t0:n,dur:900,tx:a.ico+' '+a.n,col:a.col});FX.push({k:'ring',x:P.x,y:P.y-12,t0:n,dur:420,r:30,col:a.col})}
 const snd=(f,d,w,v,e)=>{try{sfx(f,d,w,v,e)}catch(_){}};

 /* 스킬 동작 */
 function doChain(x,y,dmg,ex){const L=near(x,y,110,ex).slice(0,3);let px=x,py=y;L.forEach((o,i)=>{FX.push({k:'bolt',x0:px,y0:py-6,x1:o.x,y1:o.y-6,t0:now0()+i*70,dur:240,col:'#fff6a0'});px=o.x;py=o.y;setTimeout(()=>hitMob(o,dmg*.55,'#fff6a0','⚡'),i*70)});if(L.length){pop('chain');snd(1800,.12,'square',.03,600)}}
 function shock(x,y,dmg,col,r){FX.push({k:'ring',x,y:y-6,t0:now0(),dur:380,r:r||46,col});for(const o of near(x,y,r||46))hitMob(o,dmg,col,'')}
 function counter(){const a=AB();if(!a.counter)return;const d=Math.max(30,S.lastDmg*1.6);pop('counter');FX.push({k:'slash',x:P.x,y:P.y-10,t0:now0(),dur:320,col:'#ffb060'});snd(520,.12,'sawtooth',.05,180);
  if(inTower())shock(P.x,P.y,d,'#ffb060',58);else if(inBoss()&&Math.hypot(G.boss.x-P.x,G.boss.y-P.y)<140)hitBoss(d,'#ffb060')}
 function onHitAny(m,dmg,crit){const a=AB();S.lastDmg=dmg||S.lastDmg;S.hits++;const x=m?m.x:inBoss()?G.boss.x:P.x,y=m?m.y:inBoss()?G.boss.y:P.y;
  if(a.double&&Math.random()<a.double){pop('double');setTimeout(()=>{if(m){if(m.hp>0)hitMob(m,dmg*.8,'#ffd166','⟫')}else hitBoss(dmg*.8,'#ffd166')},110);FX.push({k:'slash',x,y:y-8,t0:now0()+110,dur:260,col:'#ffd166'})}
  if(a.chain&&Math.random()<a.chain){if(m)doChain(m.x,m.y,dmg,m);else if(inBoss()){pop('chain');FX.push({k:'bolt',x0:P.x,y0:P.y-14,x1:x,y1:y-10,t0:now0(),dur:260,col:'#fff6a0'});hitBoss(dmg*.4,'#fff6a0')}}
  if(a.execute){if(m&&m.hp>0&&m.hp<m.max*.3){pop('execute');FX.push({k:'skull',x:m.x,y:m.y-18,t0:now0(),dur:600});hitMob(m,m.elite?m.max*.35:m.hp+1,'#ff6a8a','처형 ')}
   else if(!m&&inBoss()&&G.maxHp&&G.hp<G.maxHp*.3&&Math.random()<.35){pop('execute');hitBoss(dmg*.6,'#ff6a8a')}}
  if(a.critstorm&&crit){pop('critstorm');if(m)shock(m.x,m.y,dmg*.5,'#ff9af0',50);else{FX.push({k:'ring',x,y:y-10,t0:now0(),dur:380,r:50,col:'#ff9af0'});hitBoss(dmg*.35,'#ff9af0')}}
  if(a.timeslow&&S.hits%Math.round(a.timeslow)===0){pop('timeslow');S.slowT=now0()+2500;snd(300,.5,'sine',.04,120);if(inTower()){const t=TW71.T;for(const o of mobs())o.chillT=Math.max(o.chillT||0,t.clk+2.5)}FX.push({k:'clock',t0:now0(),dur:2500})}
  if(a.meteor&&!m&&inBoss()&&++S.bossHits%20===0)meteorAt(G.boss.x,G.boss.y,dmg*2)}
 function meteorAt(x,y,d){pop('meteor');FX.push({k:'meteor',x,y,t0:now0(),dur:460,col:'#ff8a3a'});setTimeout(()=>{snd(80,.35,'sawtooth',.05,40);if(inTower())shock(x,y,d,'#ff8a3a',40);else hitBoss(d,'#ff8a3a');try{if(inTower())TW71.T.shake=Math.max(TW71.T.shake||0,.3)}catch(e){}},300)}
 /* CB81 감싸기 */
 const C=CB81;
 {const f=C.onHit;C.onHit=function(m,dmg,crit,bg){const r=f.apply(this,arguments);try{if(!spec())onHitAny(m,dmg,crit)}catch(e){}return r}}
 {const f=C.onBossHit;C.onBossHit=function(dmg,crit,perfect){const r=f.apply(this,arguments);try{if(!spec())onHitAny(null,dmg,crit)}catch(e){}return r}}
 {const f=C.onKill;C.onKill=function(m){const r=f.apply(this,arguments);try{const a=AB();if(a.meteor&&!m._met100){m._met100=1;const o=near(m.x,m.y,160,m)[0];if(o)meteorAt(o.x,o.y,Math.max(40,o.max*.35))}}catch(e){}return r}}
 {const f=C.onHurt;C.onHurt=function(dmg){try{const a=AB();if(a.evade&&Math.random()<a.evade){const n=now0();P.inv=Math.max(P.inv||0,n+400);pop('evade');FX.push({k:'ghost',x:P.x,y:P.y,t0:n,dur:420});snd(1300,.08,'sine',.03,2200);setTimeout(counter,80);return 0}}catch(e){}return f.apply(this,arguments)}}
 {const f=C.onDash;C.onDash=function(){const r=f.apply(this,arguments);try{const a=AB();if(a.blink){const x=P.x,y=P.y;setTimeout(()=>{pop('blink');FX.push({k:'flash',x,y,t0:now0(),dur:380});snd(1500,.15,'triangle',.04,400);if(inTower())shock(x,y,Math.max(24,S.lastDmg*.9),'#ffffff',44);else if(inBoss()&&Math.hypot(G.boss.x-x,G.boss.y-y)<90)hitBoss(S.lastDmg*.7,'#ffffff')},40)}}catch(e){}return r}}
 {const f=C.onParry;C.onParry=function(n){const r=f.apply(this,arguments);try{if(n)counter()}catch(e){}return r}}
 if(typeof doParry==='function'){const f=doParry;doParry=function(now){const b=(typeof G!=='undefined'&&G&&G.parrySp||[]).length;const r=f.apply(this,arguments);try{if(mode==='boss'&&(G.parrySp||[]).length>b)counter()}catch(e){}return r}}
 {const f=C.dmgMul;C.dmgMul=function(){let m=f.apply(this,arguments);try{const a=AB();if(a.frenzy&&P.hp<=P.maxhp*.4)m*=1+a.frenzy;if(S.slowT>now0())m*=1.25}catch(e){}return m}}
 /* 매 프레임: 재생 · 분신 · 별 탄환 · 회전 칼날 */
 let lastT=now0();
 function tick(){const n=now0(),dt=Math.min(.05,(n-lastT)/1000);lastT=n;if(!live())return;const a=AB();
  if(a.regen&&n-S.regT>a.regen*1000){S.regT=n;if(P.hp<P.maxhp&&P.hp>0){P.hp=Math.min(P.maxhp,P.hp+1);pop('regen');FX.push({k:'plus',x:P.x,y:P.y-20,t0:n,dur:700})}}
  if(a.clone){if(n>S.cloneUntil&&n-S.cloneT>a.clone*1000){S.cloneT=n;S.cloneUntil=n+3000;S.cx=P.x-18;S.cy=P.y;pop('clone');snd(400,.2,'sine',.04,900)}
   if(n<S.cloneUntil){const tg=inTower()?near(S.cx,S.cy,400)[0]:inBoss()?{x:G.boss.x,y:G.boss.y+10}:null;if(tg){const dx=tg.x-S.cx,dy=tg.y-S.cy,d=Math.hypot(dx,dy)||1;if(d>22){S.cx+=dx/d*160*dt;S.cy+=dy/d*160*dt}
     if(d<34&&n-S.cloneHit>480){S.cloneHit=n;FX.push({k:'slash',x:tg.x,y:tg.y-8,t0:n,dur:240,col:'#b48aff'});if(tg.hp!=null)hitMob(tg,Math.max(14,S.lastDmg*.6),'#b48aff','👥');else hitBoss(S.lastDmg*.45,'#b48aff')}}}}
  if(a.homing&&n-S.homT>a.homing*1000){const tg=inTower()?near(P.x,P.y,320)[0]:inBoss()?{boss:1}:null;if(tg){S.homT=n;FX.push({k:'star',x:P.x,y:P.y-22,vx:(Math.random()-.5)*120,vy:-120,t0:n,dur:2200,tg,dmg:Math.max(18,S.lastDmg*.7)});pop('homing')}}
  if(a.orbit){const R=26,k=Math.round(a.orbit);for(let i=0;i<k;i++){const ang=n/300+i*TAU/k,ox=P.x+Math.cos(ang)*R,oy=P.y-10+Math.sin(ang)*R*.6;
    if(inTower()){for(const m of near(ox,oy,14)){const key=m.id||m;if(n-(S.orbHit[key]||0)>400){S.orbHit[key]=n;hitMob(m,Math.max(10,S.lastDmg*.35),'#c8e8ff','◎')}}}
    else if(inBoss()&&Math.hypot(G.boss.x-ox,G.boss.y-oy)<40&&n-(S.orbHit.b||0)>500){S.orbHit.b=n;hitBoss(S.lastDmg*.25,'#c8e8ff')}}}
  for(const f of FX)if(f.k==='star'&&!f.done){const t=f.tg.boss?(inBoss()?{x:G.boss.x,y:G.boss.y-10}:null):(f.tg.hp>0?f.tg:near(f.x,f.y,300)[0]);if(!t){f.done=1;continue}
   const dx=t.x-f.x,dy=(t.y-6)-f.y,d=Math.hypot(dx,dy)||1;f.vx+=dx/d*900*dt;f.vy+=dy/d*900*dt;const sp=Math.hypot(f.vx,f.vy),mx=260;if(sp>mx){f.vx*=mx/sp;f.vy*=mx/sp}f.x+=f.vx*dt;f.y+=f.vy*dt;
   if(d<10){f.done=1;f.t0=n-f.dur+200;FX.push({k:'ring',x:f.x,y:f.y,t0:n,dur:300,r:18,col:'#ffe36b'});if(t.hp!=null)hitMob(t,f.dmg,'#ffe36b','✦');else hitBoss(f.dmg*.7,'#ffe36b')}}}
 /* 층 · 전투가 바뀌면 시간형 스킬 초기화 */
 let lastKey='';function resetIf(){const k=(typeof mode!=='undefined'?mode:'')+'|'+(inTower()?TW71.T.f:'')+'|'+(typeof G!=='undefined'&&G?G.bi:'');if(k!==lastKey){lastKey=k;S.cloneUntil=0;S.slowT=0;S.hits=0;S.bossHits=0;FX.length=0}}

 /* ---------- 그리기 ---------- */
 const tint={};function cloneImg(t){try{const idx=shopInv().eq.ch||0,img=ch2Render(idx,Math.floor(t*8)%4,0,false,t);const c=tint.c||(tint.c=document.createElement('canvas'));c.width=img.width;c.height=img.height;const o=c.getContext('2d');o.clearRect(0,0,c.width,c.height);o.drawImage(img,0,0);o.globalCompositeOperation='source-atop';o.fillStyle='rgba(120,70,255,.65)';o.fillRect(0,0,c.width,c.height);o.globalCompositeOperation='source-over';return c}catch(e){return null}}
 function draw(){const o=ctx,n=now0();o.save();try{o.setTransform(SS,0,0,SS,0,0)}catch(e){}const a=AB();
  /* 광폭 기운 · 시간 감속 화면 */
  if(a.frenzy&&P.hp<=P.maxhp*.4){o.save();o.globalAlpha=.22+.12*Math.sin(n/120);o.fillStyle='#ff3a1a';o.beginPath();o.ellipse(P.x,P.y-12,16,20,0,0,TAU);o.fill();o.restore()}
  if(S.slowT>n){const k=(S.slowT-n)/2500;o.save();o.globalAlpha=.12*k+.04;o.fillStyle='#8de4ff';o.fillRect(AX,AY,AW,AH);o.globalAlpha=.5*k;o.strokeStyle='#8de4ff';o.lineWidth=1;o.beginPath();o.arc(P.x,P.y-12,30,-Math.PI/2,-Math.PI/2+TAU*k);o.stroke();o.restore()}
  /* 회전 칼날 */
  if(a.orbit){const k=Math.round(a.orbit);for(let i=0;i<k;i++){const ang=n/300+i*TAU/k,x=P.x+Math.cos(ang)*26,y=P.y-10+Math.sin(ang)*26*.6;o.save();o.translate(x,y);o.rotate(ang*3);o.globalAlpha=.9;o.fillStyle='#e8f8ff';o.beginPath();o.moveTo(-7,0);o.lineTo(0,-2);o.lineTo(7,0);o.lineTo(0,2);o.closePath();o.fill();o.globalAlpha=.35;o.fillStyle='#8de4ff';o.beginPath();o.arc(0,0,6,0,TAU);o.fill();o.restore()}}
  /* 분신 */
  if(n<S.cloneUntil){const img=cloneImg(n/1000);if(img){o.save();o.globalAlpha=.72;o.drawImage(img,Math.round(S.cx-img.width/2),Math.round(S.cy-img.height+6));o.restore()}}
  for(let i=FX.length-1;i>=0;i--){const f=FX[i],k=(n-f.t0)/f.dur;if(k<0)continue;if(k>=1){FX.splice(i,1);continue}o.save();
   if(f.k==='pop'){const y=P.y-38-k*14,sc=k<.15?1.6-k*4:1;o.globalAlpha=k>.75?(1-k)/.25:1;o.font='900 '+Math.round(11*sc)+'px sans-serif';o.textAlign='center';o.lineWidth=3;o.strokeStyle='#05070a';o.strokeText(f.tx,P.x,y);o.fillStyle=f.col;o.fillText(f.tx,P.x,y)}
   else if(f.k==='ring'){o.globalAlpha=1-k;o.strokeStyle=f.col;o.lineWidth=2*(1-k)+.5;o.beginPath();o.arc(f.x,f.y,f.r*(.3+.7*k),0,TAU);o.stroke()}
   else if(f.k==='bolt'){o.globalAlpha=1-k;o.strokeStyle=f.col;o.lineWidth=1.6;o.beginPath();o.moveTo(f.x0,f.y0);const sx=(f.x1-f.x0)/5,sy=(f.y1-f.y0)/5;for(let j=1;j<5;j++)o.lineTo(f.x0+sx*j+(Math.random()-.5)*7,f.y0+sy*j+(Math.random()-.5)*7);o.lineTo(f.x1,f.y1);o.stroke()}
   else if(f.k==='slash'){o.globalAlpha=1-k;o.strokeStyle=f.col;o.lineWidth=2.5;o.beginPath();o.arc(f.x,f.y,14+k*6,-.9+k*1.5,.9+k*1.5);o.stroke()}
   else if(f.k==='ghost'){const img=cloneImg(n/1000);if(img){o.globalAlpha=.5*(1-k);o.drawImage(img,Math.round(f.x-img.width/2-10-k*8),Math.round(f.y-img.height+6))}}
   else if(f.k==='flash'){o.globalAlpha=(1-k)*.9;const g=o.createRadialGradient(f.x,f.y-8,1,f.x,f.y-8,40*k+8);g.addColorStop(0,'#ffffff');g.addColorStop(1,'rgba(255,255,255,0)');o.fillStyle=g;o.beginPath();o.arc(f.x,f.y-8,40*k+8,0,TAU);o.fill()}
   else if(f.k==='meteor'){const fy=f.y-90*(1-Math.min(1,k/.65));if(k<.65){o.fillStyle='#ffd166';o.beginPath();o.arc(f.x+(1-k)*30,fy,4,0,TAU);o.fill();o.globalAlpha=.5;o.strokeStyle='#ff8a3a';o.lineWidth=3;o.beginPath();o.moveTo(f.x+(1-k)*30,fy);o.lineTo(f.x+(1-k)*30+18,fy-26);o.stroke()}else{o.globalAlpha=1-(k-.65)/.35;o.fillStyle='#ff8a3a';o.beginPath();o.arc(f.x,f.y-4,30*(k-.5),0,TAU);o.fill()}}
   else if(f.k==='star'){if(!f.done||k<1){o.globalAlpha=f.done?.0:1;o.fillStyle='#ffe36b';o.translate(f.x,f.y);o.rotate(n/90);o.beginPath();for(let j=0;j<10;j++){const r=j%2?2:5,ang=j*Math.PI/5;o.lineTo(Math.cos(ang)*r,Math.sin(ang)*r)}o.closePath();o.fill()}}
   else if(f.k==='plus'){o.globalAlpha=1-k;o.fillStyle='#7dffa8';o.font='900 9px sans-serif';o.textAlign='center';o.fillText('+1',f.x,f.y-k*12)}
   else if(f.k==='skull'){o.globalAlpha=1-k;o.font='900 '+Math.round(12+k*6)+'px sans-serif';o.textAlign='center';o.fillStyle='#ff6a8a';o.fillText('☠',f.x,f.y-k*8)}
   o.restore()}
  hud(o,n,a);o.restore()}
 /* HUD: 켜진 스킬 칸(왼쪽 아래 체력 칸 위) */
 function hud(o,n,a){const ks=Object.keys(a).filter(k=>ABL[k]);if(!ks.length)return;let x=AX+4;const y=H-84;
  for(const k of ks){const ab=ABL[k],fl=S.flash[k]&&n-S.flash[k]<500?1-(n-S.flash[k])/500:0;o.font='800 6.5px sans-serif';const w=o.measureText(ab.n).width+18;
   o.globalAlpha=.82;o.fillStyle='#05070a';o.fillRect(x,y,w,12);o.globalAlpha=1;o.strokeStyle=ab.col;o.lineWidth=fl?1.6:.8;o.strokeRect(x+.5,y+.5,w-1,11);if(fl){o.globalAlpha=fl*.5;o.fillStyle=ab.col;o.fillRect(x,y,w,12);o.globalAlpha=1}
   /* 다시 쓰기까지(시간형) */let cd=null;if(k==='regen')cd=(n-S.regT)/(a.regen*1000);else if(k==='homing')cd=(n-S.homT)/(a.homing*1000);else if(k==='clone')cd=n<S.cloneUntil?1:(n-S.cloneT)/(a.clone*1000);else if(k==='timeslow')cd=(S.hits%Math.round(a.timeslow))/Math.round(a.timeslow);
   if(cd!=null){o.fillStyle=ab.col;o.globalAlpha=.45;o.fillRect(x+1,y+10,(w-2)*Math.max(0,Math.min(1,cd)),1.5);o.globalAlpha=1}
   o.font='8px sans-serif';o.textAlign='left';o.fillStyle=ab.col;o.fillText(ab.ico,x+3,y+9);o.font='800 6.5px sans-serif';o.fillStyle='#f4f6f8';o.fillText(ab.n,x+14,y+8.5);x+=w+3}}
 {const f=frame;frame=function(){try{resetIf();tick()}catch(e){}const r=f.apply(this,arguments);try{if(!spec()&&(inTower()||(typeof mode!=='undefined'&&mode==='boss'&&typeof G!=='undefined'&&G))){draw();try{if(window.PV76&&PV76.V.on&&PV76.paint)PV76.paint()}catch(e){}}}catch(e){}return r}}

 /* ============ 태엽 공방: 등급별 이름표 · 능력 칩 · 스킬 상자 ============ */
 const fx=v=>Math.round(v*100)+'%';
 function traits(it){const t=[],WT=(C.WT||{})[it.type];
  if(it.abl)for(const k in it.abl){const a=ABL[k];if(a)t.push({ico:a.ico,n:a.n,col:a.col,sk:1})}
  const on={burn:['🔥','화상'],chill:['❄','느리게'],poison:['☠','중독']};
  if(it.onHit&&on[it.onHit])t.push({ico:on[it.onHit][0],n:on[it.onHit][1],col:'#ffb060'});
  if(it.leech)t.push({ico:'🩸',n:'흡혈 '+fx(it.leech),col:'#ff8a9a'});if(it.guard)t.push({ico:'✋',n:'막기 '+fx(it.guard),col:'#ffe79a'});
  if(it.dashFx)t.push({ico:'💨',n:'대시 '+({wind:'돌풍',spark:'전류',heal:'회복'})[it.dashFx],col:'#c8ffd8'});
  if(it.critAdd)t.push({ico:'✦',n:'치명 +'+fx(it.critAdd),col:'#ffd166'});if(it.dmgAdd)t.push({ico:'⚔',n:'피해 +'+fx(it.dmgAdd),col:'#ffb060'});
  if(it.pierce)t.push({ico:'➶',n:'꿰뚫음 '+fx(it.pierce),col:'#8de4ff'});if(it.shBreak)t.push({ico:'⛏',n:'방패 부숨 ×'+(1+it.shBreak),col:'#c8c8d8'});
  if(it.poisonRes)t.push({ico:'🧪',n:it.poisonRes>=1?'독 면역':'독 내성 '+fx(it.poisonRes),col:'#b0ff5a'});
  if(it.regen&&!it.abl)t.push({ico:'⚡',n:'대시 충전 +'+fx(it.regen-1),col:'#8de4ff'});if(it.coin)t.push({ico:'🪙',n:'코인 +'+fx(it.coin),col:'#ffd166'});if(it.heal)t.push({ico:'✚',n:it.heal+'초마다 회복',col:'#7dffa8'});
  if(WT&&WT.desc&&!it.myth)t.push({ico:'◆',n:WT.desc.length>14?WT.desc.slice(0,14)+'…':WT.desc,col:'#c8a8ff'});
  return t}
 {const f=wsItemHTML;wsItemHTML=function(k,i){let h=f.apply(this,arguments);try{const it=WS_LIST(k)[i],t=traits(it).slice(0,2);if(t.length)h=h.replace(/<\/div>$/,'<div class="ab100">'+t.map(x=>'<span class="'+(x.sk?'sk':'')+'" style="--ac:'+x.col+'">'+x.ico+' '+x.n+'</span>').join('')+'</div></div>')}catch(e){}return h}}
 {const f=wsRefresh;wsRefresh=function(){const r=f.apply(this,arguments);try{const k=shopTab,i=wsSelOf(k),it=WS_LIST(k)[i],inf=$('wsInfo'),btn=$('wsBtn');if(!inf||!btn)return r;const old=$('abBox100');if(old)old.remove();
   const t=traits(it);if(!t.length)return r;const sk=it.abl?Object.keys(it.abl).filter(x=>ABL[x]):[];
   const d=document.createElement('div');d.id='abBox100';d.className=it.myth?'myth':'';
   d.innerHTML=(sk.length?'<div class="abH">'+(it.myth?'✪ 신화 스킬':'스킬')+'</div>'+sk.map(x=>{const a=ABL[x];return '<div class="abS" style="--ac:'+a.col+'"><i>'+a.ico+'</i><div><b>'+a.n+'</b><small>'+a.d(it.abl[x])+'</small></div></div>'}).join(''):'')+
    (t.filter(x=>!x.sk).length?'<div class="abH">특성</div><div class="abT">'+t.filter(x=>!x.sk).map(x=>'<span style="--ac:'+x.col+'">'+x.ico+' '+x.n+'</span>').join('')+'</div>':'');
   const e=$('enh94');(e||btn).parentNode.insertBefore(d,e||btn);
   if(it.myth){const tr=inf.querySelector('.tier');if(tr)tr.textContent='✪ 신화'}}catch(e){console.error('v100 ws',e)}return r}}
 /* v101: 등급 구분 이름표는 뺐다 — 목록은 99999992(TP84)가 등급 순서대로 한 줄로 이어 붙인다 */

 const st=document.createElement('style');st.id='myth100s';st.textContent=`
 #shopGrid .wsItem .ab100{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;margin-top:3px}
 #shopGrid .wsItem .ab100 span{font-size:9.5px;font-weight:800;line-height:1.2;padding:1px 5px;border-radius:6px;color:var(--ac);background:color-mix(in srgb,var(--ac) 14%,#0a0f14);border:1px solid color-mix(in srgb,var(--ac) 40%,transparent);white-space:nowrap}
 #shopGrid .wsItem .ab100 span.sk{color:#05070a;background:var(--ac);border-color:var(--ac)}
 #shopGrid .wsItem.t6{border-color:#ff5a5a!important;box-shadow:0 0 0 1px #ff5a5a55,0 0 14px #ff5a5a44;animation:m100 2.4s ease-in-out infinite}
 #shopGrid .wsItem.t6 b i{color:#ff7a7a}
 @keyframes m100{50%{box-shadow:0 0 0 1px #ffd16688,0 0 18px #ff9af055}}
 #abBox100{margin:8px 0 6px;padding:10px 12px;border-radius:12px;background:linear-gradient(180deg,#121a26,#0a1018);border:1px solid #ffffff1f;display:flex;flex-direction:column;gap:6px}
 #abBox100.myth{background:linear-gradient(180deg,#2a0e14,#120810);border-color:#ff5a5a66;box-shadow:inset 0 0 18px #ff5a5a22}
 #abBox100 .abH{font-size:11px;font-weight:900;letter-spacing:.08em;color:#ffd166}#abBox100.myth .abH{color:#ff8a8a}
 #abBox100 .abS{display:flex;gap:10px;align-items:center;padding:7px 9px;border-radius:10px;background:color-mix(in srgb,var(--ac) 12%,#0a0f14);border:1px solid color-mix(in srgb,var(--ac) 45%,transparent)}
 #abBox100 .abS i{font-style:normal;font-size:20px;width:30px;height:30px;display:grid;place-items:center;border-radius:50%;background:#05070a;border:1.5px solid var(--ac);box-shadow:0 0 10px color-mix(in srgb,var(--ac) 50%,transparent);flex:none}
 #abBox100 .abS b{display:block;font-size:13.5px;color:var(--ac)}#abBox100 .abS small{font-size:11.5px;color:#d8e0e8;line-height:1.4}
 #abBox100 .abT{display:flex;flex-wrap:wrap;gap:4px}#abBox100 .abT span{font-size:11.5px;font-weight:800;padding:3px 8px;border-radius:8px;color:var(--ac);background:color-mix(in srgb,var(--ac) 12%,#0a0f14);border:1px solid color-mix(in srgb,var(--ac) 40%,transparent)}
 #wsInfo:has(#abBox100) #wsBtn{position:static!important}`;document.head.appendChild(st);
 window.MYTH100={ABL,act:AB,MC,MW,MP,C0,W0,P0,traits,S};
}catch(e){console.error('v100 myth',e)}})();
