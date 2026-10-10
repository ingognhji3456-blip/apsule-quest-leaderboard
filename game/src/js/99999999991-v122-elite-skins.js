/* ================= v122 캐릭터 전용 스킨 40종 (ELITE122) =================
   프리미엄 3명을 뺀 캐릭터 40명(CHARS 0~24 · 28~42)마다 전용 스킨 하나. 프리미엄 전용 스킨(v119 · v121)처럼
   ① 그림: 원래 캐릭터 그림(CH2DEF[i]) + 색 입히기 + 장식 2가지(날개 · 후광 · 불꽃 · 왕관 · 꽃잎 · 번개 …) → CH2DEF[300+i]
   ② 휘두르기: 9가지 동작 틀(내려찍기 · 두 번 · 째깍 · 한/두 바퀴 · 세 번 베기 · 올려 베기 · 휩쓸기 · 엇베기) + 14가지 타격 이펙트
   ③ 검 쥐는 자세(984 __idlePose): 6가지 자세 + 몇 초마다 손에서 돌리기 + 칼날 빛
   ④ 걷기 · 대시(984 __heroFx): 걸음 흔적 12가지, 대시 연출 10가지
   ⑤ 능력: 그 캐릭터의 abl에 스킬 2개를 더함(MYTH100 스킬 엔진). 40명 모두 다른 조합.
   ⑥ 궁극기: 무기 궁극기 위에 전용 이름 + 화면 연출 11가지.
   표 SK의 한 줄이 스킨 하나. 상품 번호 skin_ex_<캐릭터 번호>(app.py _EX122와 같게), 켬/끔 saveData.ex122[번호].
   전용 스킨은 변이 스킨을 끼지 않았을 때만 보인다(전용 스킨을 끼면 변이 스킨을 벗김). */
(()=>{try{
 if(typeof CHARS==='undefined'||typeof CH2DEF==='undefined'||typeof ch2Render!=='function'||!window.SKIN58)return;
 const TAU=Math.PI*2,RB=['#ff3ad6','#b05cff','#29f0ff','#5affb0','#ffe14d','#ff9a3a'];
 const HV=window.__HV||{view:'front'},view=()=>HV.view||'front';
 const h01=n=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x)};
 const ez=x=>x<0?0:x>1?1:x*x*(3-2*x);
 const RAW=(c,x,y,w,h,col,a)=>{c.globalAlpha=Math.max(0,Math.min(1,a));c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)))};
 const rnd=(a,b)=>a+Math.random()*(b-a);

 /* ---------------- 표: 캐릭터 번호, 스킨 이름, 영어, 주색, 보조색, 장식[2], 휘두르기, 타격, 자세, 걷기, 대시, 능력, 궁극기 이름, 궁극기 연출 ---------------- */
 const SK=[
  [0,'시간 여행자','TIME RUNNER','#ffd166','#8ad8ff',['gear','stars'],'tick','gear','upright','ticks','dial',{timeslow:10,homing:7},'되감기','clock'],
  [1,'구미호 미나','NINE-TAIL MINA','#ff8ab8','#fff0f8',['flame','orbit'],'triple','flame','low','petal','flameburst',{double:.18,evade:.1},'여우비','bloom'],
  [2,'수정 광산왕','CRYSTAL KING','#7af0ff','#c8a2ff',['shard','crown'],'slam','crystal','shoulder','sparkle','icespike',{meteor:1,counter:1},'수정 낙석','starfall'],
  [3,'은하 대마도사','GALAXY ARCHMAGE','#b48aff','#ffe36b',['halo','stars'],'spin1','star','raised','stars','starburst',{homing:5,critstorm:1},'별의 강림','starfall'],
  [4,'기가 메카','GIGA MECH','#8ad8ff','#ff6a4a',['gear','bolt'],'cross','ring','horizontal','tiles','beams',{orbit:2,counter:1},'레일건 일제 사격','lasers'],
  [5,'월광 기사단장','MOONLIGHT COMMANDER','#cfe8ff','#9a8aff',['halo','mist'],'uppercut','crescent','upright','mist','shadowstep',{evade:.15,blink:1},'만월의 심판','solar'],
  [6,'암야의 그림자왕','SHADOW SOVEREIGN','#9a6aff','#ff4d6d',['mist','swords'],'triple','slashx','reverse','mist','hole',{clone:8,execute:1},'천 개의 그림자','abyss'],
  [7,'세계수의 요정왕','WORLDTREE QUEEN','#7dffa8','#ffd8f0',['wings','leaves'],'sweep','petal','raised','leaves','petalstorm',{regen:4,evade:.1},'세계수의 개화','bloom'],
  [8,'적룡 제노','CRIMSON DRAGOON','#ff6a2a','#ffd166',['flame','horns'],'slam','pillar','shoulder','flame','flameburst',{frenzy:.3,meteor:1},'용염 강하','inferno'],
  [9,'태양의 성기사','SOLAR PALADIN','#ffe36b','#ffffff',['wings','halo'],'cross','pillar','upright','sparkle','starburst',{regen:5,counter:1},'태양의 심판','solar'],
  [10,'폭풍 궁수왕','TEMPEST ARCHER','#8affd8','#ffffff',['wings','bolt'],'sweep','bolt','horizontal','sparkle','lightning',{chain:.2,blink:1},'폭풍의 화살비','storm'],
  [11,'생명의 대현자','LIFE SAGE','#7dffa8','#fff6a0',['leaves','orbit'],'spin1','petal','low','leaves','petalstorm',{regen:3,homing:6},'치유의 숲','bloom'],
  [12,'용광로 대장장이','FORGE MASTER','#ff8a3a','#ffd166',['gear','flame'],'double','flame','shoulder','flame','flameburst',{double:.15,counter:1},'용광로 망치','inferno'],
  [13,'유령선 선장','GHOST CAPTAIN','#5affd8','#2a6aff',['mist','swords'],'sweep','bubble','reverse','bubble','bubbleburst',{clone:10,chain:.15},'유령선의 포격','tide'],
  [14,'설원의 대무녀','FROST SHRINE MAIDEN','#bfe8ff','#ffffff',['snow','halo'],'spin2','ice','upright','frost','icespike',{timeslow:8,evade:.12},'절대 영도','blizzard'],
  [15,'핏빛 군주','BLOOD LORD','#ff3a5a','#ffb0c0',['shard','mist'],'double','shadow','reverse','mist','shadowstep',{frenzy:.4,execute:1},'핏빛 만월','abyss'],
  [16,'뇌신 볼트','THUNDER GOD VOLT','#ffe14d','#8ad8ff',['bolt','gear'],'triple','bolt','horizontal','bolt','lightning',{chain:.3,critstorm:1},'천둥 강림','storm'],
  [17,'버섯 여왕 모모','MUSHROOM QUEEN','#ff8ac8','#b6ff4a',['bubbles','crown'],'uppercut','bubble','low','bubble','bubbleburst',{regen:6,orbit:1},'포자 폭발','bloom'],
  [18,'사자왕 레오','LION KING LEO','#ffb040','#ffffff',['crown','flame'],'slam','ring','shoulder','sparkle','starburst',{counter:1,frenzy:.25},'사자왕의 포효','solar'],
  [19,'용의 노래 미르','DRAGON SONG MIR','#5ab8ff','#ffe36b',['wings','eq'],'spin2','notes','horizontal','notes','beams',{homing:4,chain:.2},'용의 교향곡','lasers'],
  [20,'달그림자 실비','MOONSHADE SILVY','#d8d8ff','#5a5aaa',['orbit','mist'],'triple','crescent','reverse','mist','shadowstep',{evade:.22,critstorm:1},'은빛 섬광','void'],
  [21,'대지의 거인왕','EARTH TITAN','#c89a60','#7dffa8',['shard','leaves'],'slam','crystal','shoulder','sparkle','icespike',{regen:5,meteor:1},'대지 붕괴','starfall'],
  [22,'초신성 노바','SUPERNOVA','#ff9af0','#8ad8ff',['stars','halo'],'spin1','star','raised','stars','starburst',{meteor:1,homing:5},'초신성 폭발','solar'],
  [23,'맹독의 그림자','VENOM SHADOW','#b6ff4a','#c86aff',['mist','bubbles'],'cross','slashx','reverse','bubble','hole',{execute:1,double:.15},'독안개 처형','abyss'],
  [24,'대천사 세레나','ARCHANGEL SERENA','#ffe9a8','#ffffff',['wings','stars'],'uppercut','pillar','upright','sparkle','starburst',{regen:4,blink:1},'천상의 빛','solar'],
  [28,'검성 아르테온','SWORD SAINT ARTEON','#e8f8ff','#ffd166',['swords','stars'],'triple','slashx','upright','sparkle','beams',{critstorm:1,counter:1},'만검귀종','lasers'],
  [29,'월하 무희 루나리아','MOON DANCER','#ffc8f0','#c8b8ff',['petals','orbit'],'spin2','petal','raised','petal','petalstorm',{double:.15,regen:7},'달빛 군무','bloom'],
  [30,'폭풍 황제 카이저','STORM EMPEROR','#8ad8ff','#ffffff',['bolt','orbit'],'slam','bolt','shoulder','bolt','lightning',{timeslow:9,critstorm:1},'뇌정 폭풍','storm'],
  [31,'별 사냥꾼 셀레네','STAR HUNTER','#ffe36b','#b48aff',['stars','orbit'],'sweep','star','horizontal','stars','starburst',{homing:4,evade:.1},'유성우','starfall'],
  [32,'용제 바하무트','DRAGON EMPEROR','#ff5a3a','#ffe36b',['wings','flame'],'double','pillar','shoulder','flame','flameburst',{frenzy:.25,orbit:2},'용제의 숨결','inferno'],
  [33,'명계의 왕 에레보스','UNDERWORLD KING','#b07aff','#5affd8',['shard','mist'],'cross','shadow','reverse','mist','hole',{execute:1,regen:6},'명계 강림','abyss'],
  [34,'극광 대성녀','AURORA SAINT','#5affb0','#ff9af0',['halo','wings'],'spin1','ring','upright','sparkle','petalstorm',{counter:1,timeslow:12},'극광의 장막','bloom'],
  [35,'시간의 신 크로노스','TIME GOD','#ffd84a','#8ad8ff',['orbit','stars'],'tick','gear','upright','ticks','dial',{double:.2,blink:1},'영원의 정지','clock'],
  [36,'태양왕 이그니스','SUN KING IGNIS','#ff6a1a','#fff3a0',['flame','wings'],'uppercut','flame','raised','flame','flameburst',{meteor:1,critstorm:1},'태양 핵융합','inferno'],
  [37,'바람의 여제 실피드','WIND EMPRESS','#bfffe8','#8ad8ff',['wings','leaves'],'spin2','crescent','horizontal','leaves','lightning',{chain:.25,evade:.12},'천공의 회오리','storm'],
  [38,'독룡왕 니드호그','VENOM DRAGON KING','#8aff5a','#e8ffb0',['shard','bubbles'],'double','shadow','shoulder','bubble','bubbleburst',{frenzy:.35,clone:9},'독룡의 숨결','tide'],
  [39,'전쟁의 신 오딘','WAR GOD ODIN','#cfe8ff','#ffd166',['wings','bolt'],'cross','bolt','upright','frost','lightning',{meteor:1,double:.12},'신들의 황혼','storm'],
  [40,'안개의 귀신 미스트','MIST PHANTOM','#c8d8ff','#8ad8ff',['mist','swords'],'triple','shadow','reverse','mist','shadowstep',{clone:7,blink:1},'환영 처형','void'],
  [41,'대지모신 가이아','EARTH MOTHER','#7dffa8','#ffd8f0',['leaves','petals'],'slam','crystal','shoulder','leaves','icespike',{orbit:3,execute:1},'대지의 분노','starfall'],
  [42,'은하의 여제 아스트라','GALAXY EMPRESS','#b48aff','#29f0ff',['stars','wings'],'spin2','star','raised','stars','starburst',{chain:.2,timeslow:10},'은하 붕괴','void']];
 /* ---------------- 캐릭터마다 새 옷 한 벌 (9999998 NG82.paintChar 부품: 머리 모양 · 모자 · 상의 · 로브 · 갑옷 · 망토 · 날개 · 꼬리 · 가면 · 목도리 …) ---------------- */
 const OUT={
  0:{skin:'#ffd8b8',hair:'#6a3a1a',hairStyle:'short',hat:'goggles',top:'#2a3a5a',style:'coat',acc:'#ffd166',emblem:'#8ad8ff',cape:'#1a2440',scarf:'#ffd166',pants:'#3a2a1a',boot:'#2a1a10',eye:'#3a6aa0'},
  1:{skin:'#fff0e8',hair:'#ffb0d0',hairStyle:'long',hat:'ears',hatC:'#ff8ab8',earIn:'#fff0f8',top:'#fff0f8',robe:'#ff5a8a',acc:'#ffd166',tail:'#ffb0d0',tailTip:'#ffffff',pants:'#ff5a8a',boot:'#c83a6a',eye:'#ff5a8a',bigEye:1},
  2:{skin:'#f0c8a0',hair:'#3a2a1a',hairStyle:'short',hat:'helmet',hatC:'#7af0ff',top:'#3a3a6a',style:'armor',acc:'#c8a2ff',emblem:'#7af0ff',cape:'#5a3aaa',pants:'#2a2a44',boot:'#1a1a2a',eye:'#3a6aa0'},
  3:{skin:'#fff0e8',hair:'#e8e0ff',hairStyle:'long',hat:'witch',hatC:'#1a1440',hatAcc:'#ffe36b',top:'#2a1e6a',robe:'#140e40',acc:'#ffe36b',emblem:'#b48aff',pants:'#140e40',boot:'#0a0820',eye:'#b48aff',bigEye:1},
  4:{skin:'#c8d0d8',hair:'#8ad8ff',hairStyle:'none',hat:'helmet',hatC:'#d8e0e8',top:'#3a5a8a',style:'armor',acc:'#ff6a4a',emblem:'#8ad8ff',pants:'#2a3a5a',boot:'#4a4a5a',eye:'#ff6a4a'},
  5:{skin:'#fff0e8',hair:'#cfe8ff',hairStyle:'long',hat:'helmet',hatC:'#e8f0ff',top:'#3a3a7a',style:'armor',acc:'#cfe8ff',cape:'#1a1a4a',emblem:'#ffe9a8',pants:'#2a2a5a',boot:'#cfe8ff',eye:'#9a8aff'},
  6:{skin:'#f0caa4',hair:'#1a1424',hairStyle:'spiky',hat:'bandana',hatC:'#ff4d6d',mask:'#1a1424',top:'#140e1e',style:'vest',acc:'#9a6aff',scarf:'#ff4d6d',cape:'#2a0a2a',pants:'#0a0810',boot:'#0a0810',eye:'#ff4d6d'},
  7:{skin:'#ffe8d8',hair:'#7dffa8',hairStyle:'long',hat:'none',wings:'#d8ffe8',top:'#3a9a5a',robe:'#2a7a4a',acc:'#ffd8f0',emblem:'#ffd8f0',pants:'#2a7a4a',boot:'#7a5a3a',eye:'#3a8a5a',bigEye:1},
  8:{skin:'#f0c8a0',hair:'#c8322a',hairStyle:'spiky',hat:'horns',hatC:'#ffd166',top:'#8a1a1a',style:'armor',acc:'#ffd166',cape:'#3a0a0a',tail:'#c8322a',tailTip:'#ffd166',pants:'#3a1010',boot:'#1a0808',eye:'#ffd166'},
  9:{skin:'#ffe0c8',hair:'#ffe36b',hairStyle:'long',hat:'crown',top:'#f4f6f8',style:'armor',acc:'#ffd84a',cape:'#ffd84a',emblem:'#ff9a3a',pants:'#e8e0c8',boot:'#c8a040',eye:'#ff9a3a'},
  10:{skin:'#ffd8b8',hair:'#e8f8ff',hairStyle:'pony',hat:'hood',hood:'#2a6a6a',top:'#3a8a8a',style:'vest',acc:'#8affd8',scarf:'#8affd8',cape:'#1a4a4a',quiver:1,pants:'#2a3a3a',boot:'#1a2a2a',eye:'#8affd8'},
  11:{skin:'#ffe0c8',hair:'#7dffa8',hairStyle:'long',hat:'witch',hatC:'#3a7a4a',hatAcc:'#fff6a0',top:'#f4fff0',robe:'#5ad07a',acc:'#fff6a0',emblem:'#ff8ab8',pants:'#5ad07a',boot:'#5a4a3a',eye:'#3a8a5a'},
  12:{skin:'#e8b890',hair:'#ff6a1a',hairStyle:'spiky',hat:'goggles',top:'#3a2a2a',style:'armor',acc:'#ff8a3a',sleeve:'#e8b890',emblem:'#ffd166',scarf:'#ff8a3a',pants:'#2a2a30',boot:'#1a1010',eye:'#ff8a3a'},
  13:{skin:'#c8f0e8',hair:'#5affd8',hairStyle:'pony',hat:'tricorn',hatC:'#0a1a2a',top:'#1a4a5a',style:'coat',acc:'#5affd8',cape:'#0a2a3a',pants:'#0a1a2a',boot:'#0a1010',eye:'#5affd8'},
  14:{skin:'#fff6f8',hair:'#bfe8ff',hairStyle:'long',hat:'none',top:'#ffffff',robe:'#6ab8ff',acc:'#bfe8ff',scarf:'#ffffff',emblem:'#bfe8ff',pants:'#6ab8ff',boot:'#ffffff',eye:'#6ab8ff'},
  15:{skin:'#f0e0f0',hair:'#e8e8f0',hairStyle:'short',hat:'horns',hatC:'#3a0a14',top:'#5a0a1a',style:'jacket',acc:'#ffd166',cape:'#1a0a10',wings:'#3a0a14',pants:'#1a0a10',boot:'#0a0508',eye:'#ff3a5a'},
  16:{skin:'#ffd8b8',hair:'#ffffff',hairStyle:'spiky',hat:'helmet',hatC:'#ffe14d',top:'#1a2a5a',style:'armor',acc:'#ffe14d',cape:'#8ad8ff',emblem:'#ffe14d',pants:'#1a2a4a',boot:'#ffe14d',eye:'#8ad8ff'},
  17:{skin:'#ffe8d8',hair:'#b6ff4a',hairStyle:'bob',hat:'mush',hatC:'#a04aff',top:'#fff0f8',robe:'#ff8ac8',acc:'#b6ff4a',emblem:'#b6ff4a',cape:'#a04aff',pants:'#ff8ac8',boot:'#5a3a6a',eye:'#a04aff',bigEye:1},
  18:{skin:'#f0c8a0',hair:'#ffe36b',hairStyle:'long',hat:'crown',tail:'#e8a040',tailTip:'#8a5a1a',top:'#f4f0e0',style:'armor',acc:'#ffb040',cape:'#c8322a',emblem:'#ffd84a',pants:'#5a3a1a',boot:'#c8a040',eye:'#ffb040'},
  19:{skin:'#ffe0c8',hair:'#ffe36b',hairStyle:'pony',hat:'horns',hatC:'#5ab8ff',top:'#ffffff',style:'coat',acc:'#5ab8ff',wings:'#5ab8ff',tail:'#5ab8ff',tailTip:'#ffe36b',pants:'#2a4a7a',boot:'#1a2a4a',eye:'#5ab8ff'},
  20:{skin:'#ffe0d0',hair:'#1a1a2a',hairStyle:'long',hat:'hood',hood:'#d8d8ff',top:'#d8d8ff',style:'vest',acc:'#5a5aaa',scarf:'#5a5aaa',cape:'#e8e8ff',pants:'#3a3a5a',boot:'#2a2a3a',eye:'#9a9aff'},
  21:{skin:'#a89880',hair:'#5a4a3a',hairStyle:'none',hat:'crown',top:'#5a7a3a',style:'armor',acc:'#c89a60',cape:'#3a5a2a',emblem:'#7dffa8',pants:'#4a3a2a',boot:'#3a2a1a',eye:'#7dffa8'},
  22:{skin:'#fff0e8',hair:'#ffd8f0',hairStyle:'long',hat:'witch',hatC:'#ff9af0',hatAcc:'#8ad8ff',top:'#ffffff',robe:'#ff9af0',acc:'#8ad8ff',emblem:'#ffffff',wings:'#8ad8ff',pants:'#ff9af0',boot:'#8a3a8a',eye:'#8ad8ff',bigEye:1},
  23:{skin:'#f0caa4',hair:'#c86aff',hairStyle:'short',hat:'hood',hood:'#2a1a3a',mask:'#b6ff4a',top:'#1a0a2a',style:'vest',acc:'#b6ff4a',scarf:'#c86aff',pants:'#140a1e',boot:'#0a0510',eye:'#b6ff4a'},
  24:{skin:'#fff0e8',hair:'#ffffff',hairStyle:'long',hat:'crown',top:'#ffe9a8',style:'armor',acc:'#ffffff',wings:'#ffe9a8',cape:'#ffffff',emblem:'#5ab8ff',pants:'#fff6d8',boot:'#ffd84a',eye:'#ffd166'},
  28:{skin:'#ffe0c8',hair:'#e8f8ff',hairStyle:'long',hat:'helmet',hatC:'#e8f8ff',top:'#e8f0ff',style:'armor',acc:'#ffd166',cape:'#2a4aaa',emblem:'#5ab8ff',pants:'#3a4a6a',boot:'#ffd166',eye:'#5ab8ff'},
  29:{skin:'#fff4ee',hair:'#ffc8f0',hairStyle:'long',hat:'halo',top:'#ffe0f0',robe:'#c8b8ff',acc:'#ffffff',scarf:'#ffc8f0',emblem:'#ff9af0',pants:'#c8b8ff',boot:'#ffffff',eye:'#c86aff',bigEye:1},
  30:{skin:'#e8e8f0',hair:'#ffffff',hairStyle:'spiky',hat:'horns',hatC:'#ffe14d',top:'#e8f0ff',style:'armor',acc:'#8ad8ff',cape:'#2a4a8a',emblem:'#ffe14d',pants:'#3a4a6a',boot:'#8ad8ff',eye:'#8ad8ff'},
  31:{skin:'#ffe0c8',hair:'#ffe36b',hairStyle:'pony',hat:'feather',hatC:'#b48aff',featherC:'#ffe36b',top:'#4a2a8a',style:'vest',acc:'#ffe36b',scarf:'#ffe36b',quiver:1,cape:'#2a1a5a',pants:'#2a1a4a',boot:'#1a0a2a',eye:'#ffe36b'},
  32:{skin:'#f0c8a0',hair:'#1a1a24',hairStyle:'long',hat:'horns',hatC:'#ffe36b',top:'#1a1a24',style:'armor',acc:'#ffe36b',wings:'#ff5a3a',tail:'#1a1a24',tailTip:'#ff5a3a',pants:'#14141c',boot:'#ffe36b',eye:'#ff5a3a'},
  33:{skin:'#d8d0e8',hair:'#b07aff',hairStyle:'long',hat:'crown',top:'#1a0a2a',robe:'#0a0514',acc:'#5affd8',cape:'#2a0a4a',emblem:'#5affd8',pants:'#0a0514',boot:'#0a0514',eye:'#5affd8'},
  34:{skin:'#fff0e8',hair:'#ff9af0',hairStyle:'long',hat:'halo',top:'#e8fff4',robe:'#5affb0',acc:'#ff9af0',wings:'#bfffe8',emblem:'#ff9af0',pants:'#5affb0',boot:'#ffffff',eye:'#5affb0'},
  35:{skin:'#ffe0c8',hair:'#e8e8f0',hairStyle:'short',hat:'helmet',hatC:'#ffd84a',top:'#1a2a4a',style:'coat',acc:'#ffd84a',cape:'#ffd84a',emblem:'#8ad8ff',scarf:'#8ad8ff',pants:'#1a2a3a',boot:'#ffd84a',eye:'#8ad8ff'},
  36:{skin:'#f0c8a0',hair:'#fff3a0',hairStyle:'spiky',hat:'crown',top:'#ff6a1a',style:'armor',acc:'#fff3a0',cape:'#ffd166',emblem:'#ffffff',pants:'#8a2a0a',boot:'#ffd166',eye:'#fff3a0'},
  37:{skin:'#e8fff4',hair:'#bfffe8',hairStyle:'long',hat:'feather',hatC:'#8ad8ff',featherC:'#ffffff',top:'#ffffff',robe:'#8ad8ff',acc:'#bfffe8',wings:'#ffffff',pants:'#8ad8ff',boot:'#ffffff',eye:'#5ab8ff',bigEye:1},
  38:{skin:'#c8e8a0',hair:'#2a5a1a',hairStyle:'spiky',hat:'horns',hatC:'#e8ffb0',top:'#2a5a1a',style:'armor',acc:'#8aff5a',tail:'#3a7a2a',tailTip:'#8aff5a',wings:'#5aaa3a',pants:'#1a3a10',boot:'#0a1a08',eye:'#e8ff5a'},
  39:{skin:'#f0d0b0',hair:'#ffffff',hairStyle:'long',hat:'helmet',hatC:'#cfe8ff',top:'#3a4a6a',style:'armor',acc:'#ffd166',cape:'#1a2a4a',wings:'#cfe8ff',emblem:'#ffd166',pants:'#2a3a5a',boot:'#ffd166',eye:'#8ad8ff'},
  40:{skin:'#e8f0ff',hair:'#8ad8ff',hairStyle:'bob',hat:'hood',hood:'#c8d8ff',mask:'#5a6a8a',top:'#5a6a8a',style:'vest',acc:'#8ad8ff',scarf:'#c8d8ff',pants:'#3a4a6a',boot:'#2a3a5a',eye:'#8ad8ff'},
  41:{skin:'#e8d8b0',hair:'#7dffa8',hairStyle:'long',hat:'none',top:'#5a8a3a',robe:'#3a6a2a',acc:'#ffd8f0',emblem:'#ffd8f0',cape:'#7a5a3a',pants:'#3a6a2a',boot:'#7a5a3a',eye:'#7dffa8'},
  42:{skin:'#fff0e8',hair:'#29f0ff',hairStyle:'long',hat:'crown',top:'#1a1440',robe:'#3a1a8a',acc:'#29f0ff',cape:'#b48aff',emblem:'#ffffff',wings:'#b48aff',pants:'#1a1440',boot:'#29f0ff',eye:'#29f0ff'}};
 const GRADE_PRICE={'기본':2900,'일반':2900,'희귀':3300,'영웅':3700,'전설':4200,'유물':4500,'신화':4700,'초월':4900};

 /* ---------------- ① 그림 ---------------- */
 const ring=(Q,cx,cy,r,c1,c2,t)=>{for(let i=0;i<44;i++){const a=i/44*TAU;Q.px(cx+Math.cos(a)*r,cy+Math.sin(a)*r,i%11===Math.floor(t*8)%11?'#ffffff':(i%2?c1:c2),.85)}};
 const DEC={
  wings:{b:1,f(Q,b,t,v,c1,c2){if(v==='side')return;for(const sd of [-1,1])for(let i=0;i<5;i++){const ang=-.95+i*.38+Math.sin(t*1.8)*.07*sd,len=8+i*1.3,rx=14+sd*5,ry=13+b,ex=rx+sd*Math.cos(ang)*len,ey=ry+Math.sin(ang)*len;Q.P([[rx,ry],[ex,ey-1],[ex+sd*1.2,ey+1],[rx,ry+2.6]],i%2?c1:c2,.95);Q.L(rx,ry+1,ex,ey,c1,.5)}}},
  shard:{b:1,f(Q,b,t,v,c1,c2){const sides=v==='side'?[-1]:[-1,1];for(const sd of sides){const rx=14+sd*6,ry=12+b;for(let i=0;i<4;i++){const len=9+i*1.6,ang=-.75+i*.42+Math.sin(t*2.2)*.05*sd,ex=rx+sd*Math.cos(ang)*len,ey=ry+Math.sin(ang)*len*.9;Q.P([[rx,ry],[ex,ey-1.2],[ex+sd*1.6,ey+.6],[rx+sd,ry+2.4]],i%2?c1:c2,.9);Q.L(rx+sd,ry,ex,ey-1,'#ffffff',.4)}}}},
  /* 후광 · 왕관: 머리 꼭대기(H.top)를 재서 그 위에. 모자가 커서 자리가 없으면 머리 뒤 둥근 빛 고리로 */
  halo:{b:2,f(Q,b,t,v,c1,c2,front,H){const cx=H.cx,room=H.top-(-10)>=5;if(room){if(!front)return;const y=H.top-2.6+Math.sin(t*1.6)*.4;for(let i=0;i<24;i++){const a=i/24*TAU;Q.px(cx+Math.cos(a)*5.2,y+Math.sin(a)*1.4,i%6===Math.floor(t*6)%6?'#ffffff':c1,.95)}}else if(front)DEC.stars.f(Q,b,t,v,c1,c2)}},
  flame:{b:2,f(Q,b,t,v,c1,c2,front){if(!front){Q.E(14,32.5,11,2.2,c1,.45);return}for(let i=0;i<9;i++){const q=(t*.8+i/9)%1,x=3+h01(i+1)*22+Math.sin(t*3+i)*1.5,y=31-q*30;Q.R(x,y,1,1.6,i%2?c1:c2,(1-q)*.95);if(q<.3)Q.px(x,y+2,'#ffffff',.6)}}},
  orbit:{b:2,f(Q,b,t,v,c1,c2,front){for(let i=0;i<3;i++){const a=t*1.3+i*TAU/3,s=Math.sin(a);if((s>0)!==front)continue;const x=14+Math.cos(a)*12,y=17+b+s*3.5;Q.P([[x,y-2],[x+1.2,y],[x,y+2],[x-1.2,y]],c1,.95);Q.px(x,y-1,c2)}}},
  crown:{b:2,f(Q,b,t,v,c1,c2,front,H){const cx=H.cx,room=H.top-(-10)>=6;if(room){if(!front)return;const y=H.top-1.6+Math.sin(t*2)*.4;for(let i=-2;i<=2;i++){const x=cx+i*2.3,h=i===0?4.2:Math.abs(i)===1?3:2;Q.P([[x-1,y+1.4],[x,y-h],[x+1,y+1.4]],c1);Q.px(x,y-h+.6,c2)}Q.R(cx-5.5,y+1,11,1,c1)}else if(front)DEC.stars.f(Q,b,t,v,c2,c1)}},
  petals:{b:0,f(Q,b,t,v,c1,c2){for(let i=0;i<7;i++){const q=(t*.35+i/7)%1,x=2+h01(i)*24+Math.sin(t*2+i)*2,y=-6+q*40;Q.R(x,y,1.6,1,i%2?c1:c2,(1-q)*.9)}}},
  bolt:{b:0,f(Q,b,t,v,c1,c2){const k=Math.floor(t*7);for(let j=0;j<2;j++){if(h01(k*3+j)>.55)continue;let x=3+h01(k+j*9)*22,y=4+h01(k*7+j)*20;for(let s=0;s<4;s++){const nx=x+(h01(k+s+j)-.5)*4,ny=y+2;Q.L(x,y,nx,ny,s%2?c2:c1,.9);x=nx;y=ny}}}},
  stars:{b:0,f(Q,b,t,v,c1,c2){for(let i=0;i<7;i++){const tw=.5+.5*Math.sin(t*5+i*2.1),x=1+h01(i+4)*26,y=-4+h01(i+11)*34;Q.px(x,y,i%2?c1:c2,tw);if(tw>.85){Q.px(x-1,y,c2,tw*.6);Q.px(x+1,y,c2,tw*.6);Q.px(x,y-1,c2,tw*.6);Q.px(x,y+1,c2,tw*.6)}}}},
  gear:{b:1,f(Q,b,t,v,c1,c2){const cx=v==='side'?13:14,cy=11+b,R=12.5;for(let i=0;i<40;i++){const a=i/40*TAU;Q.px(cx+Math.cos(a)*R,cy+Math.sin(a)*R,c1,.85)}for(let i=0;i<14;i++){const a=t*.5+i/14*TAU;Q.R(cx+Math.cos(a)*(R+1.4)-1,cy+Math.sin(a)*(R+1.4)-1,2,2,c2)}Q.L(cx,cy,cx+Math.cos(t*3)*9,cy+Math.sin(t*3)*9,c2,.7)}},
  bubbles:{b:0,f(Q,b,t,v,c1,c2){for(let i=0;i<6;i++){const q=(t*.4+i/6)%1,x=3+h01(i+2)*22+Math.sin(t*2+i)*1.5,y=32-q*36,r=.8+q*1.4;for(let k=0;k<8;k++){const a=k/8*TAU;Q.px(x+Math.cos(a)*r,y+Math.sin(a)*r,i%2?c1:c2,(1-q)*.85)}}}},
  mist:{b:2,f(Q,b,t,v,c1,c2,front){if(!front){for(let i=0;i<8;i++){const q=(t*.35+i/8)%1,sd=i%2?1:-1,x=14+sd*(9+h01(i)*4)+Math.sin(t*2+i)*1.5,y=32-q*30;Q.px(x,y,i%3?c1:c2,(1-q)*.8);if(q<.5)Q.px(x,y-1,c2,(1-q)*.5)}return}for(let i=0;i<4;i++){const q=(t*.5+i/4)%1;Q.px(5+h01(i+9)*18,30-q*26,c2,(1-q)*.7)}}},
  leaves:{b:0,f(Q,b,t,v,c1,c2){for(let i=0;i<6;i++){const q=(t*.3+i/6)%1,x=2+h01(i+5)*24+Math.sin(t*1.5+i)*3,y=-6+q*40;Q.P([[x,y],[x+1.5,y-1],[x+2,y+.5],[x+.5,y+1]],i%2?c1:c2,(1-q)*.9)}}},
  snow:{b:0,f(Q,b,t,v,c1,c2){for(let i=0;i<8;i++){const q=(t*.25+i/8)%1,x=1+h01(i+8)*26+Math.sin(t+i)*2,y=-6+q*40;Q.px(x,y,c2,(1-q));if(i%3===0){Q.px(x-1,y,c1,(1-q)*.6);Q.px(x+1,y,c1,(1-q)*.6)}}}},
  eq:{b:1,f(Q,b,t,v,c1,c2){const sides=v==='side'?[-1]:[-1,1];for(const sd of sides)for(let i=0;i<5;i++){const x=14+sd*(8+i*2.2),hh=3+Math.abs(Math.sin(t*5+i*1.3))*6-i*.4;Q.R(x-.5,20+b-hh,1.6,hh,i%2?c1:c2,.85)}}},
  swords:{b:2,f(Q,b,t,v,c1,c2,front){for(let i=0;i<4;i++){const a=t*.9+i*TAU/4,s=Math.sin(a);if((s>0)!==front)continue;const x=14+Math.cos(a)*13,y=15+b+s*3+Math.sin(t*2+i)*1;Q.R(x,y-5,1,7,c1);Q.px(x,y-6,'#ffffff');Q.R(x-1.5,y+2,4,1,c2);Q.R(x,y+3,1,2,c2)}}},
  horns:{b:1,f(Q,b,t,v,c1,c2){const sides=v==='side'?[-1]:[-1,1];for(const sd of sides)for(let i=0;i<3;i++){const rx=14+sd*5,ry=10+b+i*3,ex=rx+sd*(9+i),ey=ry-6+i*2;Q.P([[rx,ry],[ex,ey],[rx+sd,ry+2]],i%2?c2:c1,.95)}}}};
 /* ---------------- ② 휘두르기 ---------------- */
 const SW={
  slam:{arm:(k,e)=>k<.3?1.35+(-2.6-1.35)*e(k/.3):k<.45?-2.6+3.8*e((k-.3)/.15):k<.75?1.2:1.2+.15*e((k-.75)/.25),hit:[.45],act:[.3,.55]},
  double:{arm:(k,e)=>k<.2?1.35+(-2.95-1.35)*e(k/.2):k<.34?-2.95+4.2*e((k-.2)/.14):k<.46?1.25-2.6*e((k-.34)/.12):k<.6?-1.35+3*e((k-.46)/.14):1.65-.3*e((k-.6)/.4),hit:[.34,.6],act:[.2,.66]},
  tick:{arm:(k,e)=>k<.3?1.35+(-1.9-1.35)*e(k/.3):k<.44?-1.9+Math.floor((k-.3)/.035)*.06:k<.54?-1.66+2.86*e((k-.44)/.1):k<.75?1.2:1.2+.15*e((k-.75)/.25),hit:[.54],act:[.44,.62]},
  spin1:{arm:(k,e)=>k<.12?1.35+.85*e(k/.12):k<.58?2.2-TAU*e((k-.12)/.46):k<.8?2.2-TAU:2.2-TAU+(1.35-2.2)*e((k-.8)/.2),hit:[.58],act:[.12,.62]},
  spin2:{arm:(k,e)=>k<.1?1.35+.85*e(k/.1):k<.7?2.2-TAU*2*e((k-.1)/.6):k<.82?2.2-TAU*2:2.2-TAU*2+(1.35-2.2)*e((k-.82)/.18),hit:[.4,.7],act:[.1,.74]},
  triple:{arm:(k,e)=>{const K=[[0,1.35],[.14,-2.2],[.26,1.1],[.38,-1.6],[.5,1.2],[.6,-1],[.72,1.3],[1,1.35]];for(let i=1;i<K.length;i++)if(k<=K[i][0]){const [a0,v0]=K[i-1],[a1,v1]=K[i];return v0+(v1-v0)*e((k-a0)/(a1-a0))}return 1.35},hit:[.26,.5,.72],act:[.14,.76]},
  uppercut:{arm:(k,e)=>k<.25?1.35+(2.5-1.35)*e(k/.25):k<.42?2.5-4.9*e((k-.25)/.17):k<.7?-2.4:-2.4+3.75*e((k-.7)/.3),hit:[.42],act:[.25,.48]},
  sweep:{arm:(k,e)=>k<.25?1.35+(2.8-1.35)*e(k/.25):k<.48?2.8-3.3*e((k-.25)/.23):k<.72?-.5:-.5+1.85*e((k-.72)/.28),hit:[.48],act:[.25,.52]},
  cross:{arm:(k,e)=>k<.2?1.35+(-2.4-1.35)*e(k/.2):k<.35?-2.4+3.4*e((k-.2)/.15):k<.45?1+1.6*e((k-.35)/.1):k<.6?2.6-3.4*e((k-.45)/.15):-.8+2.15*e((k-.6)/.4),hit:[.35,.6],act:[.2,.64]}};
 const tipOf=(H,q)=>{const [px,py,pa]=H.handQ(q),[tx,ty]=H.toW(px,py),a=H.wAng(pa+.25);return {x:tx,y:ty,a,tx:tx+Math.cos(a)*H.L,ty:ty+Math.sin(a)*H.L}};
 /* 타격 이펙트: T=칼끝, q=0→1 */
 function impact(c,kind,T,q,H,c1,c2,seed){const L=H.L,x=T.tx,y=T.ty,al=1-q,s=H.s;c.lineWidth=Math.max(1,s*.6);
  if(kind==='ring'){for(let i=0;i<2;i++){c.globalAlpha=al*.85;c.strokeStyle=i?c2:c1;c.beginPath();c.ellipse(x,y,L*(.3+q*(1+i*.3)),L*(.12+q*(.4+i*.1)),0,0,TAU);c.stroke()}}
  else if(kind==='gear'){const r=L*(.3+q*.7);c.globalAlpha=al;c.strokeStyle=c1;c.beginPath();c.arc(x,y,r,0,TAU);c.stroke();for(let i=0;i<12;i++){const a=q*4+i*TAU/12;RAW(c,x+Math.cos(a)*(r+2)-1.5,y+Math.sin(a)*(r+2)-1.5,3,3,c2,al)}}
  else if(kind==='flame'){for(let i=0;i<12;i++){const a=i/12*TAU,d=L*q*.8,h=(1-q)*L*.25;RAW(c,x+Math.cos(a)*d-1.5,y+Math.sin(a)*d*.5-h,3,3+h*.3,i%2?c1:c2,al)}c.globalAlpha=al*.4;c.fillStyle=c2;c.beginPath();c.arc(x,y,L*.25*(1-q),0,TAU);c.fill()}
  else if(kind==='crystal'){for(let i=0;i<7;i++){const a=i/7*TAU+seed,d=L*(.2+q*.9),px=x+Math.cos(a)*d,py=y+Math.sin(a)*d*.7;c.globalAlpha=al;c.fillStyle=i%2?c1:c2;c.beginPath();c.moveTo(px,py-3*s);c.lineTo(px+1.5*s,py);c.lineTo(px,py+3*s);c.lineTo(px-1.5*s,py);c.fill()}}
  else if(kind==='star'){const r=L*(.25+q*.8);c.globalAlpha=al;c.strokeStyle=c1;c.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5+q,rr=i%2?r*.45:r;i?c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr):c.moveTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}c.closePath();c.stroke();for(let i=0;i<6;i++)RAW(c,x+(h01(i+seed)-.5)*L*1.6*q,y+(h01(i*3+seed)-.5)*L*q,2,2,c2,al)}
  else if(kind==='petal'){for(let i=0;i<12;i++){const a=i/12*TAU+q*3,d=L*q*.9;c.save();c.translate(x+Math.cos(a)*d,y+Math.sin(a)*d*.6+q*q*8);c.rotate(a+q*5);RAW(c,-2,-1,4,2,i%2?c1:c2,al);c.restore()}}
  else if(kind==='crescent'){c.globalAlpha=al;c.strokeStyle=c1;c.lineWidth=Math.max(2,s*1.4*al);c.beginPath();c.arc(x,y,L*(.5+q*.6),T.a-1.4,T.a+1.4);c.stroke();c.strokeStyle=c2;c.lineWidth=1;c.beginPath();c.arc(x,y,L*(.4+q*.6),T.a-1.2,T.a+1.2);c.stroke()}
  else if(kind==='slashx'){const r=L*(.3+q*.7);c.globalAlpha=al;for(const [a,col] of [[.8,c1],[-.8,c2]]){c.strokeStyle=col;c.lineWidth=Math.max(1.5,s*1.2*al);c.beginPath();c.moveTo(x-Math.cos(a)*r,y-Math.sin(a)*r);c.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);c.stroke()}}
  else if(kind==='pillar'){const w=L*.25*(1-q);c.globalAlpha=al*.7;const g=c.createLinearGradient(0,y-L*2.5,0,y);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(1,c1);c.fillStyle=g;c.fillRect(x-w,y-L*2.5,w*2,L*2.5);RAW(c,x-w*.3,y-L*2.5,w*.6,L*2.5,c2,al*.6)}
  else if(kind==='bolt'){c.globalAlpha=al;for(let i=0;i<5;i++){const a=i*TAU/5+seed;let px=x,py=y;c.strokeStyle=i%2?c1:c2;c.beginPath();c.moveTo(px,py);for(let k=1;k<=4;k++){const d=L*q*1.1*k/4;px=x+Math.cos(a)*d+(h01(i*7+k+seed)-.5)*L*.2;py=y+Math.sin(a)*d*.6+(h01(i*3+k)-.5)*L*.15;c.lineTo(px,py)}c.stroke()}}
  else if(kind==='ice'){for(let i=0;i<7;i++){const ox=(i-3)*L*.22,hh=L*(.2+.35*h01(i+seed))*Math.min(1,q*3)*(1-q*.5);c.globalAlpha=al;c.fillStyle=i%2?c1:c2;c.beginPath();c.moveTo(x+ox-2*s,y+L*.2);c.lineTo(x+ox,y+L*.2-hh);c.lineTo(x+ox+2*s,y+L*.2);c.fill()}}
  else if(kind==='notes'){for(let i=0;i<6;i++){const a=i*TAU/6-Math.PI/2,d=L*(.5+q*.8),px=x+Math.cos(a)*d,py=y+Math.sin(a)*d-q*10,col=i%2?c1:c2;RAW(c,px,py,1.6,6,col,al);RAW(c,px-3,py+5,4,3,col,al);RAW(c,px,py,4,1.6,col,al)}}
  else if(kind==='bubble'){for(let i=0;i<9;i++){const a=i/9*TAU+seed,d=L*q*(.6+.5*h01(i)),r=(1.5+h01(i+3)*2.5)*s;c.globalAlpha=al;c.strokeStyle=i%2?c1:c2;c.beginPath();c.arc(x+Math.cos(a)*d,y+Math.sin(a)*d*.7-q*8,r,0,TAU);c.stroke()}}
  else if(kind==='shadow'){c.globalAlpha=al*.6;c.fillStyle='#05000c';c.beginPath();c.ellipse(x,y,L*(.4+q*.6),L*(.15+q*.25),0,0,TAU);c.fill();for(let i=0;i<8;i++){const a=i/8*TAU+q*2,d=L*(.5+q*.6);RAW(c,x+Math.cos(a)*d-1,y+Math.sin(a)*d*.4-q*6,2,3,i%2?c1:c2,al)}}
  c.globalAlpha=1}
 function makeMotion(d){const S=SW[d.swing],c1=d.c1,c2=d.c2;const hits=S.hit,act=S.act;
  return {_v122:1,arm:S.arm,hand:(k,side)=>[side?13:19.5,7.2],
   lean:(k,e)=>{let l=k<act[0]?-.12*e(k/act[0]):0;for(const h of hits)l+=.28*Math.exp(-Math.pow((k-h)/.09,2));return l},
   fx(c,k,H){c.save();c.lineCap='round';
    if(k>act[0]&&k<act[1])for(let j=1;j<=7;j++){const T=tipOf(H,Math.max(act[0],k-j*.016));c.globalAlpha=(1-j/8)*.55;c.strokeStyle=j%2?c1:c2;c.lineWidth=Math.max(1,H.s*(1.3-j*.13));c.beginPath();c.moveTo(T.x+Math.cos(T.a)*H.L*.2,T.y+Math.sin(T.a)*H.L*.2);c.lineTo(T.tx,T.ty);c.stroke()}
    hits.forEach((h,i)=>{if(k>h&&k<h+.36){try{impact(c,d.impact,tipOf(H,h),(k-h)/.36,H,c1,c2,d.i+i)}catch(e){}}});
    c.restore();c.globalAlpha=1}}}
 /* ---------------- ③ 검 쥐는 자세 ---------------- */
 const POSE={low:[1.15,0,0],upright:[-1.42,-1,-1.5],horizontal:[.18,0,0],reverse:[1.95,0,0],shoulder:[-2.25,-1,-1],raised:[-.7,0,-1]};
 const hand0=(side,now)=>[(side?12.5:19.5)+Math.cos(1.25)*6.2,19.5+Math.sin(1.25)*6.2+Math.sin(now/700)*.25];
 function makeIdle(d){const [a0,dx,dy]=POSE[d.idle],per=3800+(d.i%7)*400,c1=d.c1,c2=d.c2,drip=d.idle==='reverse'||d.idle==='low';
  return (now,side,walk)=>{const [x,y]=hand0(side,now);const q=(now%per)/per,tw=!walk&&q<.13?TAU*ez(q/.13):0;
   return {x:x+dx,y:y+dy,a:a0+Math.sin(now/900+d.i)*.05+tw,
    post(c,ix,iy,A,L,s,now){const t=now/1000;c.save();c.globalCompositeOperation='lighter';
     for(let i=0;i<6;i++){const qq=(t*.7+i/6)%1,dd=L*(.25+.75*h01(i+d.i)),px=ix+Math.cos(A)*dd,py=iy+Math.sin(A)*dd+(drip?qq*L*.5:-qq*L*.5);RAW(c,px-1,py-1,2,2,i%2?c1:c2,(1-qq)*.75)}
     const g=(now/1300+d.i*.17)%1,dd=L*(.2+g*.8);RAW(c,ix+Math.cos(A)*dd-1.5,iy+Math.sin(A)*dd-1.5,3,3,'#ffffff',.8*Math.sin(g*Math.PI));c.restore()}}}}

 /* ---------------- 목록 · 상태 ---------------- */
 const LIST=[];
 SK.forEach(([i,name,en,c1,c2,dec,swing,imp,idle,walk,dash,abl,ult,ultS])=>{const ch=CHARS[i];if(!ch||!CH2DEF[i]||ch.prem)return;
  const d={i,id:'ex_'+i,name,en,c1,c2,col:c1,dec,swing,impact:imp,idle,walk,dash,abl,ult,ultS};d.idx=300+i;
  const gr=wsTier(ch).n;d.price=GRADE_PRICE[gr]||3900;d.grade=gr;d.motion=makeMotion(d);d.idleF=makeIdle(d);d.trail=c1;
  const O=OUT[i],NG=window.NG82,dp=O&&NG&&NG.paintChar?NG.paintChar(O):null;
  if(O)d.dec=dec.filter(k=>!((k==='wings'&&O.wings)||((k==='crown'||k==='halo')&&O.hat&&O.hat!=='none')||(k==='horns')));dec=d.dec;
  CH2DEF[d.idx]={__v44:1,__v122:1,paint(Q,f,b,bl,t){const v=view(),o=Q.o,B=CH2DEF[i];if(dp)dp(Q,f,b,bl,t);else B.paint.call(B,Q,f,b,bl,t);
   /* 머리 꼭대기 · 가운데 재기(그림 칸 좌표 → 도트 도구 좌표: x-6, y-10) */
   let H={top:-2,cx:v==='side'?15:14};try{const im=o.getImageData(0,0,40,48).data;let top=-1;for(let y=0;y<48&&top<0;y++)for(let x=0;x<40;x++)if(im[(y*40+x)*4+3]>40){top=y;break}if(top>=0){let sx=0,n=0;for(let y=top;y<Math.min(48,top+6);y++)for(let x=0;x<40;x++)if(im[(y*40+x)*4+3]>40){sx+=x;n++}H={top:top-10,cx:n?sx/n-6:14}}}catch(e){}
   try{o.save();o.globalCompositeOperation='source-atop';const g=o.createLinearGradient(0,0,0,48);g.addColorStop(0,c2);g.addColorStop(1,c1);o.globalAlpha=dp?0:.1;o.fillStyle=g;o.fillRect(0,0,40,48);const y=((t*16+i*7)%64)-8;o.globalAlpha=.45;o.fillStyle='#ffffff';o.fillRect(0,y,40,1);o.restore()}catch(e){o.restore()}
   for(const k of dec){const D=DEC[k];if(D&&(D.b===0||D.b===2))try{D.f(Q,b,t,v,c1,c2,true,H)}catch(e){}}
   try{o.save();o.globalCompositeOperation='destination-over';for(const k of dec){const D=DEC[k];if(D&&(D.b===1||D.b===2))D.f(Q,b,t,v,c1,c2,false,H)}Q.E(14,32.5,9,1.8,c1,.4);o.restore()}catch(e){o.restore()}}};
  const ABL=(window.MYTH100&&MYTH100.ABL)||{};const an=Object.keys(abl).map(k=>{const a=ABL[k];return a?a.ico+' '+a.n:k}).join(' + ');
  d.tags=['⚡ 능력 · '+an,'💥 궁극기 · '+ult,'전용 휘두르기 · 검 쥐는 자세','전용 걷기 · 대시 연출'];
  d.desc=ch.name+'의 전용 스킨. 휘두르기 · 검 쥐는 자세 · 걷기 · 대시 · 궁극기 연출이 모두 바뀌어요. ◆ 능력: '+Object.keys(abl).map(k=>{const a=ABL[k];return a&&a.d?a.d(abl[k]):k}).join(' / ')+' (원래 능력은 그대로)';
  /* ⑤ 능력: 이 스킨을 낄 때만 캐릭터 abl에 더함 */
  const own=ch.abl;try{Object.defineProperty(ch,'abl',{configurable:true,enumerable:true,get(){try{const u=cur();if(u&&u.i===i){const o=Object.assign({},own||{});for(const k in abl)o[k]=typeof abl[k]==='number'&&typeof o[k]==='number'&&k!=='regen'&&k!=='clone'&&k!=='timeslow'&&k!=='homing'?o[k]+abl[k]:abl[k];return o}}catch(e){}return own},set(v){}})}catch(e){}
  LIST.push(d)});
 const PAY=()=>window.PAY58;
 const st=()=>{try{return saveData.ex122||(saveData.ex122={})}catch(e){return {}}};
 const byId=id=>LIST.find(u=>u.id===id);
 const owned=u=>{try{const P=PAY();return !!(P&&P.ownsItem({pid:'skin_'+u.id}))}catch(e){return false}};
 function cur(){try{if(SKIN58.get())return null;const i=(shopInv().eq||{}).ch||0,u=LIST.find(x=>x.i===i);return u&&st()[u.i]&&owned(u)?u:null}catch(e){return null}}
 const ELITE122=window.ELITE122={list:LIST,byId,cur,owned,get:()=>{const u=cur();return u?u.id:null},
  equip(id){const S=st(),u=id&&byId(id);if(!u){const c=cur();if(c)delete S[c.i]}else{S[u.i]=1;try{if(SKIN58.get())SKIN58.equip(null)}catch(e){}try{const inv=shopInv(),P=PAY();if(P&&P.tester()&&!inv.inv.ch.includes(u.i))inv.inv.ch.push(u.i);/* v123: 테스터는 캐릭터도 받음 */if(inv.inv.ch.includes(u.i))inv.eq.ch=u.i}catch(e){}}try{saveNow()}catch(e){}tick()},
  render(id,v,f,t){const u=byId(id);if(!u)return null;const ov=HV.view,osw=HV.sw;HV.view=v||'front';HV.sw=null;try{return ch2Render(u.idx,f||0,0,false,t!=null?t:performance.now()/1000)}finally{HV.view=ov;HV.sw=osw}}};
 /* 내 캐릭터 그림 */
 {const base=ch2Render;ch2Render=function(idx,f,b,bl,t){try{if(idx<100&&!window.__mateDraw){const sm=document.getElementById('shopModal');if(!(sm&&!sm.hidden)&&idx===((shopInv().eq||{}).ch||0)){const u=cur();if(u&&u.i===idx)return base.call(this,u.idx,f,b,bl,t)}}}catch(e){}return base.apply(this,arguments)}}
 /* 휘두르기 · 자세 · 궤적 */
 const MOS=LIST.map(u=>u.motion),IDS=LIST.map(u=>u.idleF);
 function tick(){if(window.__mateDraw)return;const u=cur();
  if(u){if(window.__skinMotion!==u.motion)window.__skinMotion=u.motion;window.__idlePose=u.idleF;window.__skinTrail=u.trail}
  else{if(MOS.includes(window.__skinMotion)){window.__skinMotion=null;window.__skinTrail=null}if(IDS.includes(window.__idlePose))window.__idlePose=null}}
 {const f=frame;frame=function(){try{tick()}catch(e){}return f.apply(this,arguments)}}

 /* ---------------- ④ 걷기 · 대시 ---------------- */
 const S={parts:[],stepT:0,dash:null,lastX:null,lastY:null};
 const add=o=>{S.parts.push(o);if(S.parts.length>220)S.parts.shift()};
 function step(u,x,y,n){const c1=u.c1,c2=u.c2,w=u.walk;
  if(w==='ticks')add({k:'tick',x,y,t:n,life:800,c:c1,L:0,r:rnd(0,6)});
  else if(w==='petal')for(let i=0;i<2;i++)add({k:'petal',x:x+rnd(-6,6),y:y-rnd(2,10),vx:rnd(-12,12),vy:-rnd(4,14),t:n,life:900,c:i?c1:c2,L:1,r:rnd(0,6)});
  else if(w==='sparkle')for(let i=0;i<2;i++)add({k:'spark',x:x+rnd(-6,6),y:y-rnd(2,10),vx:rnd(-8,8),vy:-rnd(10,24),t:n,life:700,c:i?c1:'#ffffff',L:1});
  else if(w==='stars')add({k:'star',x:x+rnd(-6,6),y:y-rnd(0,6),vx:0,vy:-8,t:n,life:800,c:i2(c1,c2),L:1});
  else if(w==='tiles')add({k:'tile',x:Math.round(x/8)*8,y:Math.round(y/5)*5,t:n,life:520,c:RB[Math.floor(n/90)%6],L:0});
  else if(w==='mist'){for(let i=0;i<3;i++)add({k:'mist',x:x+rnd(-5,5),y:y-rnd(0,3),vx:rnd(-6,6),vy:-rnd(4,12),t:n,life:rnd(600,900),c:i%2?c1:c2,L:0});add({k:'print',x,y,t:n,life:900,c:c1,L:0})}
  else if(w==='leaves')add({k:'petal',x:x+rnd(-6,6),y:y-rnd(4,12),vx:rnd(-16,16),vy:rnd(-4,8),t:n,life:1000,c:i2(c1,c2),L:1,r:rnd(0,6)});
  else if(w==='flame')for(let i=0;i<2;i++)add({k:'flame',x:x+rnd(-4,4),y,vx:rnd(-4,4),vy:-rnd(14,26),t:n,life:rnd(400,650),c:i?c1:c2,L:0});
  else if(w==='frost'){add({k:'print',x,y,t:n,life:1100,c:c2,L:0});add({k:'spark',x:x+rnd(-5,5),y:y-rnd(0,6),vx:rnd(-4,4),vy:rnd(-6,2),t:n,life:900,c:c1,L:1})}
  else if(w==='bolt')add({k:'zap',x:x+rnd(-6,6),y:y-rnd(0,8),t:n,life:180,c:i2(c1,c2),L:1,r:rnd(0,9)});
  else if(w==='bubble')add({k:'bub',x:x+rnd(-6,6),y:y-rnd(0,6),vx:rnd(-4,4),vy:-rnd(10,20),t:n,life:900,c:i2(c1,c2),L:1,r:rnd(1,2.5)});
  else if(w==='notes')add({k:'note',x:x+rnd(-8,8),y:y-rnd(8,16),vx:rnd(-10,10),vy:-rnd(14,26),t:n,life:800,c:RB[Math.floor(rnd(0,6))],L:1})}
 const i2=(a,b)=>Math.random()<.5?a:b;
 function dashBurst(u,x,y,n,end){const c1=u.c1,c2=u.c2,d=u.dash;
  if(d==='dial'){if(!end)add({k:'dial',x,y:y-10,t:n,life:760,c:c1,L:0});else add({k:'ring',x,y:y-6,t:n,life:520,c:c1,r:26,L:0})}
  else if(d==='flameburst'){for(let i=0;i<(end?12:8);i++){const a=i/(end?12:8)*TAU;add({k:'flame',x,y,vx:Math.cos(a)*50,vy:Math.sin(a)*22-20,t:n,life:520,c:i%2?c1:c2,L:end?1:0})}if(end)add({k:'pillar',x,y,t:n,life:420,c:c1,L:1})}
  else if(d==='icespike'){if(end)for(let i=0;i<7;i++)add({k:'spike',x:x+(i-3)*7,y,t:n+i*25,life:600,c:i%2?c1:c2,L:0,h:8+h01(i)*8});else add({k:'ring',x,y:y-4,t:n,life:400,c:c2,r:20,L:0})}
  else if(d==='starburst'){for(let i=0;i<(end?10:6);i++){const a=i/(end?10:6)*TAU;add({k:'star',x,y:y-8,vx:Math.cos(a)*60,vy:Math.sin(a)*30,t:n,life:600,c:i%2?c1:c2,L:1})}if(end)add({k:'ring',x,y:y-6,t:n,life:450,c:c1,r:30,L:0})}
  else if(d==='beams'){if(!end){add({k:'wave',x,y:y-8,t:n,life:420,c:c1,L:0});for(let i=0;i<6;i++)add({k:'beam',x,y:y-8,a:i/6*TAU,t:n,life:360,c:i%2?c1:c2,L:1})}else{add({k:'ring',x,y:y-6,t:n,life:420,c:c2,r:34,L:0});add({k:'ring',x,y:y-6,t:n+80,life:420,c:c1,r:26,L:0})}}
  else if(d==='hole'){if(!end){add({k:'hole',x,y:y-8,t:n,life:520,c:c1,L:0});for(let i=0;i<10;i++){const a=i/10*TAU;add({k:'suck',x:x+Math.cos(a)*22,y:y-8+Math.sin(a)*12,tx:x,ty:y-8,t:n,life:420,c:i%2?c1:c2,L:1})}}else add({k:'ring',x,y:y-6,t:n,life:420,c:c2,r:30,L:0})}
  else if(d==='petalstorm'){for(let i=0;i<14;i++){const a=i/14*TAU;add({k:'petal',x,y:y-8,vx:Math.cos(a)*55,vy:Math.sin(a)*28,t:n,life:800,c:i%2?c1:c2,L:1,r:a})}}
  else if(d==='lightning'){if(end)for(let i=0;i<5;i++){const a=i/5*TAU;add({k:'bolt',x0:x,y0:y-8,x1:x+Math.cos(a)*34,y1:y-8+Math.sin(a)*18,t:n,life:260,c:i%2?c1:c2,L:1})}else add({k:'ring',x,y:y-6,t:n,life:300,c:c1,r:18,L:0})}
  else if(d==='bubbleburst'){for(let i=0;i<(end?12:6);i++){const a=i/(end?12:6)*TAU;add({k:'bub',x,y:y-6,vx:Math.cos(a)*40,vy:Math.sin(a)*20-14,t:n,life:800,c:i%2?c1:c2,L:1,r:rnd(1.5,3)})}}
  else if(d==='shadowstep'){add({k:'hole',x,y:y-8,t:n,life:420,c:c1,L:0});if(end)for(let i=0;i<8;i++){const a=i/8*TAU;add({k:'mist',x,y:y-6,vx:Math.cos(a)*40,vy:Math.sin(a)*16,t:n,life:600,c:i%2?c1:c2,L:1})}}}
 function dashTrail(u,x,y,px,py,n){const c1=u.c1,c2=u.c2,d=u.dash;
  if(d==='lightning'||d==='hole')add({k:'bolt',x0:px,y0:py-8,x1:x,y1:y-8,t:n,life:340,c:i2(c1,c2),L:1});
  else if(d==='dial'){add({k:'line',x0:px,y0:py-4,x1:x,y1:y-4,t:n,life:700,c:c1,L:0,w:3})}
  else if(d==='beams')add({k:'line',x0:px,y0:py-8,x1:x,y1:y-8,t:n,life:300,c:RB[Math.floor(n/40)%6],L:1,w:4});
  else if(d==='flameburst')add({k:'flame',x,y,vx:rnd(-10,10),vy:-rnd(14,30),t:n,life:500,c:i2(c1,c2),L:0});
  else if(d==='icespike')add({k:'spark',x,y:y-rnd(2,10),vx:rnd(-6,6),vy:rnd(-4,4),t:n,life:700,c:i2(c1,c2),L:1});
  else if(d==='starburst')add({k:'star',x,y:y-8,vx:rnd(-10,10),vy:rnd(-10,0),t:n,life:600,c:i2(c1,c2),L:1});
  else if(d==='petalstorm')add({k:'petal',x,y:y-8,vx:rnd(-20,20),vy:rnd(-20,10),t:n,life:700,c:i2(c1,c2),L:1,r:rnd(0,6)});
  else if(d==='bubbleburst')add({k:'bub',x,y:y-6,vx:rnd(-6,6),vy:-rnd(6,16),t:n,life:700,c:i2(c1,c2),L:1,r:rnd(1,2)});
  else add({k:'mist',x,y:y-6,vx:rnd(-6,6),vy:-rnd(2,8),t:n,life:600,c:i2(c1,c2),L:0})}
 let lastFrame=0;
 function heroFx(c,cx,fy,kk,now,moving,layer){const u=cur();if(!u||typeof P==='undefined'||!P)return false;const ox=cx-P.x,oy=fy-P.y,sc=kk/1.2;
  if(layer===0&&now!==lastFrame){lastFrame=now;
   if(moving&&!P.dash&&now-S.stepT>110){S.stepT=now;step(u,P.x,P.y,now)}
   if(P.dash&&P.dash!==S.dash){S.dash=P.dash;dashBurst(u,P.x,P.y,now,false);S.lastX=P.x;S.lastY=P.y}
   if(P.dash&&S.lastX!=null&&Math.hypot(P.x-S.lastX,P.y-S.lastY)>4){dashTrail(u,P.x,P.y,S.lastX,S.lastY,now);S.lastX=P.x;S.lastY=P.y}
   if(!P.dash&&S.dash){S.dash=null;dashBurst(u,P.x,P.y,now,true);S.lastX=null}}
  c.save();
  if(layer===0){c.globalCompositeOperation='lighter';c.globalAlpha=.22;c.fillStyle=u.c1;c.beginPath();c.ellipse(cx,fy-1,11*sc,3.2*sc,0,0,TAU);c.fill()}
  c.globalCompositeOperation='lighter';
  for(let i=S.parts.length-1;i>=0;i--){const f=S.parts[i],q=(now-f.t)/f.life;if(q>=1){if(layer===1)S.parts.splice(i,1);continue}if(q<0||f.L!==layer)continue;const al=1-q;
   const X=(f.x||0)+ox,Y=(f.y||0)+oy,dt=q*f.life/1000,mx=X+(f.vx||0)*dt,my=Y+(f.vy||0)*dt;c.globalAlpha=al;c.fillStyle=f.c;c.strokeStyle=f.c;c.lineWidth=1;
   switch(f.k){
    case 'mist':c.globalAlpha=al*.5;c.beginPath();c.arc(mx,my,(1.5+q*3)*sc,0,TAU);c.fill();break;
    case 'spark':c.fillRect(mx-.5,my-.5,1.5,1.5);break;
    case 'flame':c.globalAlpha=al*.8;c.beginPath();c.ellipse(mx,my,1.6*sc*(1-q*.5),3*sc*(1-q*.4),0,0,TAU);c.fill();break;
    case 'petal':c.save();c.translate(mx,my+20*dt*dt);c.rotate(f.r+q*6);c.fillRect(-2,-1,4,2);c.restore();break;
    case 'star':c.fillRect(mx-.5,my-2,1,4);c.fillRect(mx-2,my-.5,4,1);break;
    case 'note':c.fillRect(mx,my,1,4);c.fillRect(mx-2,my+3,3,2);break;
    case 'bub':c.beginPath();c.arc(mx,my,f.r*sc,0,TAU);c.stroke();break;
    case 'zap':{c.lineWidth=1.2;c.beginPath();c.moveTo(X-3,Y-4);c.lineTo(X+1,Y-1);c.lineTo(X-1,Y+1);c.lineTo(X+3,Y+4);c.stroke();break}
    case 'print':c.globalAlpha=al*.55;c.beginPath();c.ellipse(X,Y,3*sc,1.2*sc,0,0,TAU);c.fill();break;
    case 'tick':{c.globalAlpha=al*.8;c.beginPath();c.ellipse(X,Y,4*sc,1.6*sc,0,0,TAU);c.stroke();const a=f.r+q*8;c.beginPath();c.moveTo(X,Y);c.lineTo(X+Math.cos(a)*3.5*sc,Y+Math.sin(a)*1.4*sc);c.stroke();break}
    case 'tile':c.globalAlpha=al*.45;c.fillRect(X-4,Y-2,8,4);break;
    case 'hole':{const r=(18-q*14)*sc;c.globalCompositeOperation='source-over';c.globalAlpha=al*.7;c.fillStyle='#07020f';c.beginPath();c.ellipse(X,Y,r,r*.55,0,0,TAU);c.fill();c.globalCompositeOperation='lighter';c.globalAlpha=al;c.lineWidth=1.5;c.stroke();break}
    case 'suck':c.fillRect(X+((f.tx+ox)-X)*q-1,Y+((f.ty+oy)-Y)*q-1,2,2);break;
    case 'dial':{const r=(14+q*8)*sc;c.lineWidth=1.5;c.beginPath();c.arc(X,Y,r,0,TAU);c.stroke();for(let j=0;j<12;j++){const a=j/12*TAU;c.fillRect(X+Math.cos(a)*r*.85-.5,Y+Math.sin(a)*r*.85-.5,1.5,1.5)}c.strokeStyle='#ffffff';c.beginPath();c.moveTo(X,Y);c.lineTo(X+Math.cos(-q*12)*r*.75,Y+Math.sin(-q*12)*r*.75);c.stroke();break}
    case 'wave':c.lineWidth=2;for(let j=0;j<3;j++){c.strokeStyle=RB[(j*2)%6];c.beginPath();c.ellipse(X,Y,(6+q*30+j*4)*sc,(3+q*14+j*2)*sc,0,0,TAU);c.stroke()}break;
    case 'beam':{const L=(10+q*40)*sc;c.lineWidth=2;c.beginPath();c.moveTo(X+Math.cos(f.a)*L*.3,Y+Math.sin(f.a)*L*.15);c.lineTo(X+Math.cos(f.a)*L,Y+Math.sin(f.a)*L*.5);c.stroke();break}
    case 'ring':c.lineWidth=2*al+.5;c.beginPath();c.ellipse(X,Y,f.r*q*sc,f.r*q*.5*sc,0,0,TAU);c.stroke();break;
    case 'pillar':{const w=6*sc*(1-q);const g=c.createLinearGradient(0,Y-60,0,Y);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(1,f.c);c.fillStyle=g;c.fillRect(X-w,Y-60,w*2,60);break}
    case 'spike':{const h=f.h*sc*Math.min(1,q*4)*(1-q*.4);c.beginPath();c.moveTo(X-2*sc,Y);c.lineTo(X,Y-h);c.lineTo(X+2*sc,Y);c.fill();break}
    case 'bolt':{const x0=f.x0+ox,y0=f.y0+oy,x1=f.x1+ox,y1=f.y1+oy;c.lineWidth=1.5;c.beginPath();c.moveTo(x0,y0);c.lineTo((x0+x1)/2+(Math.random()-.5)*8,(y0+y1)/2+(Math.random()-.5)*8);c.lineTo(x1,y1);c.stroke();c.strokeStyle='#ffffff';c.lineWidth=.6;c.stroke();break}
    case 'line':{c.globalAlpha=al*.6;c.lineWidth=(f.w||3)*sc*al;c.beginPath();c.moveTo(f.x0+ox,f.y0+oy);c.lineTo(f.x1+ox,f.y1+oy);c.stroke();break}}}
  c.restore();c.globalAlpha=1;return true}
 {const prev=window.__heroFx;window.__heroFx=function(c,cx,fy,kk,now,moving,layer){let done=false;try{done=heroFx(c,cx,fy,kk,now,moving,layer)}catch(e){}if(!done&&prev)return prev.apply(this,arguments)}}
 {const f=frame;frame=function(){try{if(!cur()&&S.parts.length)S.parts.length=0}catch(e){}return f.apply(this,arguments)}}

 /* ---------------- ⑥ 궁극기: 전용 이름 + 화면 연출 ---------------- */
 function withName(fn){const u=cur();if(!u)return fn();let U=null,w=null,o=null;try{const S=window.SET61&&SET61.ultSet&&SET61.ultSet();if(S){U=SET61.ULT[S];o=U.name;U.name=u.ult}else{w=curWp();o=w.sp;w.sp=u.ult}}catch(e){}try{return fn()}finally{try{if(U)U.name=o;else if(w)w.sp=o}catch(e){}}}
 if(typeof tryUlt==='function'){const f=tryUlt;tryUlt=function(){const a=arguments,t=this;return withName(()=>f.apply(t,a))}}
 if(typeof useSpecial==='function'){const f=useSpecial;useSpecial=function(){const a=arguments,t=this;return withName(()=>f.apply(t,a))}}
 const ULTS={
  clock(c,t,k,W0,H0,cx,cy,c1,c2,F){try{c.globalCompositeOperation='saturation';c.globalAlpha=F*(.7);c.fillStyle='#808080';c.fillRect(0,0,W0,H0)}catch(e){}c.globalCompositeOperation='lighter';const R=76;c.globalAlpha=F*(.85);c.strokeStyle=c1;c.lineWidth=3;c.beginPath();c.arc(cx,cy,R,0,TAU);c.stroke();for(let i=0;i<12;i++){const a=i/12*TAU;c.fillStyle=c2;c.fillRect(cx+Math.cos(a)*(R-12)-2,cy+Math.sin(a)*(R-12)-2,4,4)}c.strokeStyle='#ffffff';c.lineWidth=3;c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+Math.cos(-t/110)*R*.8,cy+Math.sin(-t/110)*R*.8);c.stroke()},
  bloom(c,t,k,W0,H0,cx,cy,c1,c2,F){c.globalAlpha=F*(.25);c.fillStyle=c1;c.fillRect(0,0,W0,H0);c.globalCompositeOperation='lighter';for(let i=0;i<10;i++){const a=i/10*TAU+t/700,r=30+Math.min(1,t/600)*50;c.globalAlpha=F*(.6);c.fillStyle=i%2?c1:c2;c.beginPath();c.ellipse(cx+Math.cos(a)*r*.5,cy+Math.sin(a)*r*.5,r*.55,r*.18,a,0,TAU);c.fill()}for(let i=0;i<40;i++){const q=((t/1500)+i/40)%1;c.globalAlpha=F*(1-q);c.fillStyle=i%2?c1:c2;c.fillRect((i*53)%W0+Math.sin(t/300+i)*10,q*H0,3,2)}},
  starfall(c,t,k,W0,H0,cx,cy,c1,c2,F){c.globalAlpha=F*(.4);c.fillStyle='#05061a';c.fillRect(0,0,W0,H0);c.globalCompositeOperation='lighter';for(let i=0;i<16;i++){const q=((t/700)+i/16)%1,x=cx+(h01(i)-.5)*260+(1-q)*60,y=-20+q*(cy+20);c.globalAlpha=F*(.9);c.strokeStyle=i%2?c1:c2;c.lineWidth=2;c.beginPath();c.moveTo(x+18,y-30);c.lineTo(x,y);c.stroke();c.fillStyle='#ffffff';c.fillRect(x-2,y-2,4,4)}},
  lasers(c,t,k,W0,H0,cx,cy,c1,c2,F){c.globalAlpha=F*(.3);c.fillStyle='#0a0018';c.fillRect(0,0,W0,H0);c.globalCompositeOperation='lighter';for(let i=0;i<8;i++){const sx=i%2?W0+10:-10,a=(i%2?Math.PI:0)+(i%2?-1:1)*(.35+.3*Math.sin(t/300+i));c.globalAlpha=F*(.6);c.strokeStyle=i%2?c1:c2;c.lineWidth=2;c.beginPath();c.moveTo(sx,-10+i*6);c.lineTo(sx+Math.cos(a)*W0*1.2,-10+i*6+Math.sin(a)*W0*1.2);c.stroke()}for(let i=0;i<20;i++){const h=8+Math.abs(Math.sin(t/120+i*.9))*36;c.globalAlpha=F*(.55);c.fillStyle=i%2?c1:c2;c.fillRect(i*(W0/20)+2,H0-h,W0/20-4,h)}},
  solar(c,t,k,W0,H0,cx,cy,c1,c2,F){c.globalCompositeOperation='lighter';const r=20+Math.min(1,t/500)*30;const g=c.createRadialGradient(cx,cy,0,cx,cy,r*3);g.addColorStop(0,'#ffffff');g.addColorStop(.3,c1);g.addColorStop(1,'rgba(0,0,0,0)');c.globalAlpha=F*(.8);c.fillStyle=g;c.fillRect(0,0,W0,H0);for(let i=0;i<16;i++){const a=i/16*TAU+t/900;c.globalAlpha=F*(.5);c.strokeStyle=i%2?c1:c2;c.lineWidth=3;c.beginPath();c.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);c.lineTo(cx+Math.cos(a)*W0,cy+Math.sin(a)*W0);c.stroke()}},
  abyss(c,t,k,W0,H0,cx,cy,c1,c2,F){c.globalAlpha=F*(.5);c.fillStyle='#05000c';c.fillRect(0,0,W0,H0);c.globalCompositeOperation='lighter';for(let i=0;i<10;i++){const a=i/10*TAU+t/800;c.globalAlpha=F*(.6);c.strokeStyle=i%2?c1:c2;c.lineWidth=3;c.beginPath();c.moveTo(cx+Math.cos(a)*200,cy+Math.sin(a)*140);c.quadraticCurveTo(cx+Math.cos(a+1)*80,cy+Math.sin(a+1)*60,cx,cy);c.stroke()}c.globalCompositeOperation='source-over';c.globalAlpha=F*(.85);c.fillStyle='#000';c.beginPath();c.ellipse(cx,cy,30,22,0,0,TAU);c.fill()},
  inferno(c,t,k,W0,H0,cx,cy,c1,c2,F){c.globalAlpha=F*(.25);c.fillStyle='#2a0800';c.fillRect(0,0,W0,H0);c.globalCompositeOperation='lighter';for(let i=0;i<24;i++){const x=i*(W0/24)+10,h=40+Math.abs(Math.sin(t/140+i))*120*Math.min(1,t/500);const g=c.createLinearGradient(0,H0-h,0,H0);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.5,c1);g.addColorStop(1,c2);c.globalAlpha=F*(.6);c.fillStyle=g;c.beginPath();c.ellipse(x,H0,10,h,0,0,TAU);c.fill()}},
  blizzard(c,t,k,W0,H0,cx,cy,c1,c2,F){c.globalAlpha=F*(.3);c.fillStyle='#dff4ff';c.fillRect(0,0,W0,H0);c.globalCompositeOperation='lighter';for(let i=0;i<60;i++){const q=((t/500)+i/60)%1,x=((i*61)%W0)+q*80-40,y=q*H0;c.globalAlpha=F*(.8);c.strokeStyle=i%2?c1:c2;c.beginPath();c.moveTo(x,y);c.lineTo(x+8,y+4);c.stroke()}for(let i=0;i<6;i++){const a=i/6*TAU+t/600;c.globalAlpha=F*(.7);c.fillStyle=c2;c.beginPath();c.moveTo(cx+Math.cos(a)*20,cy+Math.sin(a)*20);c.lineTo(cx+Math.cos(a+.2)*70,cy+Math.sin(a+.2)*70);c.lineTo(cx+Math.cos(a-.2)*70,cy+Math.sin(a-.2)*70);c.fill()}},
  storm(c,t,k,W0,H0,cx,cy,c1,c2,F){c.globalAlpha=F*(.4);c.fillStyle='#0a0f22';c.fillRect(0,0,W0,H0);c.globalCompositeOperation='lighter';const n=Math.floor(t/90);for(let j=0;j<3;j++){let x=cx+(h01(n*3+j)-.5)*200,y=0;c.globalAlpha=F*(.9);c.strokeStyle=j%2?c1:c2;c.lineWidth=2.5;c.beginPath();c.moveTo(x,y);while(y<cy){y+=18;x+=(h01(n+y+j)-.5)*30;c.lineTo(x,y)}c.lineTo(cx,cy);c.stroke()}},
  tide(c,t,k,W0,H0,cx,cy,c1,c2,F){c.globalAlpha=F*(.3);c.fillStyle='#021a2a';c.fillRect(0,0,W0,H0);c.globalCompositeOperation='lighter';for(let w=0;w<4;w++){c.globalAlpha=F*(.55);c.strokeStyle=w%2?c1:c2;c.lineWidth=3;c.beginPath();for(let x=0;x<=W0;x+=8){const y=H0-30-w*26+Math.sin(x/40+t/200+w)*10;x?c.lineTo(x,y):c.moveTo(x,y)}c.stroke()}for(let i=0;i<20;i++){const q=((t/900)+i/20)%1;c.globalAlpha=F*(1-q);c.strokeStyle=c2;c.beginPath();c.arc((i*71)%W0,H0-q*H0,2+q*4,0,TAU);c.stroke()}},
  void(c,t,k,W0,H0,cx,cy,c1,c2,F){c.globalAlpha=F*(.45);c.fillStyle='#05000c';c.fillRect(0,0,W0,H0);const R=26+Math.min(1,t/500)*30;c.globalAlpha=F*(.9);c.fillStyle='#000';c.beginPath();c.ellipse(cx,cy,R,R*.8,0,0,TAU);c.fill();c.globalCompositeOperation='lighter';for(let i=0;i<3;i++){c.globalAlpha=F*(.7-i*.2);c.strokeStyle=i%2?c2:c1;c.lineWidth=3-i;c.beginPath();c.ellipse(cx,cy,R*(1.25+i*.22),R*(.38+i*.08),t/400+i,0,TAU);c.stroke()}for(let i=0;i<24;i++){const q=((t/900)+i/24)%1,a=i*2.4,d=(1-q)*160+R;c.globalAlpha=F*(q);c.fillStyle=i%2?c1:c2;c.fillRect(cx+Math.cos(a)*d-1,cy+Math.sin(a)*d*.6-1,3,2)}}};
 function ultFx(sp,now){const u=cur();if(!u||!sp||!sp.t0||!sp.dur)return;const c=ctx,t=now-sp.t0,k=t/sp.dur;if(k<0||k>=1)return;
  const F=k<.08?k/.08:k>.85?(1-k)/.15:1,W0=typeof W!=='undefined'?W:480,H0=typeof H!=='undefined'?H:300,cx=sp.cx!=null?sp.cx:W0/2,cy=sp.cy!=null?sp.cy:H0/2;
  c.save();try{const f=ULTS[u.ultS];if(f)f(c,t,k,W0,H0,cx,cy,u.c1,u.c2,F)}catch(e){}c.restore();
  c.save();c.globalCompositeOperation='source-over';c.globalAlpha=F*Math.min(1,t/250);c.font='900 18px '+(typeof FONT_STACK!=='undefined'?FONT_STACK:'sans-serif');c.textAlign='center';c.lineWidth=4;c.strokeStyle='#05070a';const ty=46;c.strokeText(u.ult,W0/2,ty);c.fillStyle=u.c1;c.fillText(u.ult,W0/2,ty);c.font='800 9px sans-serif';c.fillStyle='#ffffff';c.fillText('✦ '+u.name+' 전용 궁극기',W0/2,ty+13);c.textAlign='left';c.restore();c.globalAlpha=1}
 if(typeof drawSpecialFX==='function'){const f=drawSpecialFX;drawSpecialFX=function(now){const sp=typeof G!=='undefined'&&G&&G.sp;const r=f.apply(this,arguments);try{if(!(window.WATCH95&&WATCH95.specOn&&WATCH95.specOn()))ultFx(sp,now)}catch(e){}return r}}
 window.ELITE122.SK=SK;
}catch(e){console.error('v122 elite skins',e)}})();
