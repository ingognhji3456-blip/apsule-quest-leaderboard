/* ================= v82 새 캐릭터 15 · 무기 15 · 펫 15 + 새 캐릭터 · 펫의 변이 스킨 (NG82) =================
   - 태엽 공방(골드)에 그대로 들어간다: CHARS[10~24] · WEAPONS[10~24] · PETS[10~24].
   - 저마다 특성이 있다(CB81이 읽음): poisonRes 독 내성 · critAdd 치명타 · dmgAdd 피해 · pierce 방패 꿰뚫기 · shBreak 방패 부수기 ·
     onHit 맞힌 적에게 화상/냉기/중독 · leech 흡혈 · guard 피해 막기 · dashFx 대시 때 추가 효과(wind 돌풍 · heal 회복 · spark 전류).
   - 캐릭터 그림: CH2DEF[10~24] — 부품(머리 모양 · 모자 · 옷 · 망토 · 날개 · 꼬리 …)을 조합해 그리는 틀(paintChar). 앞 · 옆 · 뒤 모습 직접 처리.
   - 무기 그림: WSPR[새 종류] — 망치 · 쌍검 · 별검은 새로 그리고, 나머지는 기본 모양을 새 색으로. 필살기는 w.ult(기본 종류)를 쓴다.
   - 펫 그림: PET_SPR[10~24](9×9 도트).
   - 변이 스킨(현질 · 다이아): 새 캐릭터 15 + 새 펫 15 → SKIN58.list(번호 140~) · PET59.list. 서버 SHOP_PRODUCTS에도 같은 번호. */
(()=>{try{
 if(typeof CHARS==='undefined'||typeof CH2DEF==='undefined')return;
 const HVv=()=>(window.__HV&&__HV.view)||'front';
 const sh=(c,k)=>{try{return shade(c,k)}catch(e){return c}};
 /* ---------- 캐릭터 그림 틀 ---------- */
 function paintChar(S){return function(Q,f,b,bl,t){const v=HVv(),back=v==='back',side=v==='side',hr=S.hair,hd=sh(hr,.7),top=S.top,tp2=sh(top,.72),acc=S.acc||'#ffd166',ty=19+b;
  /* 뒤에 있는 것: 망토 · 날개 · 꼬리 · 긴 머리 */
  if(S.wings){const fl=Math.sin(t*6)*1.5;for(const s of (side?[1]:[-1,1])){Q.P([[14+s*4,ty],[14+s*13,ty-8+fl],[14+s*12,ty+3]],S.wings,.9);Q.P([[14+s*5,ty+1],[14+s*10,ty-4+fl],[14+s*10,ty+3]],'#ffffff',.4)}}
  if(S.cape&&!back){for(let i=0;i<6;i++){const w=Math.sin(t*4+i*.7)*.8;Q.P([[7+i*2.4,ty],[10+i*2.4,ty],[9+i*2.4+w,31]],i%2?S.cape:sh(S.cape,.8))}}
  if(S.tail){const w=Math.sin(t*5)*1.5;Q.P([[17,26],[24,23+w],[26,19+w],[19,27]],S.tail);Q.C(26,19+w,1.4,S.tailTip||S.tail)}
  if(S.hairStyle==='long'&&!side&&!back)Q.R(6.5,13+b,15,10,hd);
  if(S.hood&&!back)Q.E(14,11+b,9.2,8.6,S.hood);
  ch2Legs(Q,f,S.pants,S.boot,S.sock);
  /* 몸통 */
  if(S.robe){Q.P([[8,ty],[20,ty],[23,31],[5,31]],S.robe);Q.P([[8,ty],[20,ty],[21,25],[7,25]],top);Q.R(13,25,2,6,sh(S.robe,.75))}
  else Q.P([[8,ty],[20,ty],[21,28],[7,28]],top);
  Q.R(8,ty,12,2,sh(top,1.25));
  if(!back){const st=S.style;
   if(st==='coat'){Q.R(13.5,ty+1,1,8,tp2);for(const y of [3,6])Q.px(12,ty+y,acc)}
   else if(st==='armor'){Q.R(5.5,ty-1,5,3.4,acc);Q.R(17.5,ty-1,5,3.4,acc);Q.R(5.5,ty-1,5,1,sh(acc,1.3));Q.R(17.5,ty-1,5,1,sh(acc,1.3));Q.R(10,ty+2,8,5,sh(top,1.15));for(const x of [11,16])Q.px(x,ty+3,acc)}
   else if(st==='vest'){Q.R(9,ty+1,3,7,acc);Q.R(16,ty+1,3,7,acc)}
   else if(st==='jacket'){Q.P([[10,ty],[14,ty+5],[12,ty]],acc);Q.P([[18,ty],[14,ty+5],[16,ty]],acc);Q.R(13,ty+5,2,3,'#f4f6f8')}
   if(S.emblem)Q.C(14,ty+4,1.5,S.emblem)}
  else{Q.R(10,ty+1,8,6,tp2);if(S.quiver){Q.R(16,ty-3,3,9,'#7a5030');for(let i=0;i<3;i++)Q.R(16.2+i*.9,ty-6,.8,3,'#f4f6f8')}}
  if(!S.robe){Q.R(7.5,26,13,1.6,S.belt||sh(top,.55));Q.R(13,26,2,1.6,'#ffd166')}
  if(S.cape&&back){for(let i=0;i<6;i++){const w=Math.sin(t*4+i*.7)*.8;Q.P([[7+i*2.4,ty-1],[10+i*2.4,ty-1],[9+i*2.4+w,31]],i%2?S.cape:sh(S.cape,.8))}}
  ch2Arms(Q,f,S.sleeve||top,S.skin,b);
  if(S.scarf){Q.R(9,ty-1.5,10,2.4,S.scarf);if(!back)Q.R(16,ty+.5,2,4,sh(S.scarf,.85))}
  /* 머리 */
  if(back){Q.E(14,12+b,7.6,7.1,hr);Q.R(7,12+b,14,5,hr);for(let k=0;k<4;k++)Q.R(9.5+k*2.6,8+b,1,8,hd,.55);if(S.hairStyle==='long')Q.R(6.5,13+b,15,10,hr);if(S.hairStyle==='pony'){Q.R(13,16+b,2.5,8,hr)}}
  else{ch2Head(Q,S.skin,12+b);ch2Eyes(Q,bl,S.eye,14+b,3,!!S.bigEye);ch2Cheek(Q,17+b,S.cheek);if(!side)Q.R(13,18+b,2,1,S.mouth||'#9a4a4a');
   if(S.mask&&!side){Q.R(7,16+b,14,3.2,S.mask);Q.R(7,16+b,14,.8,sh(S.mask,1.3))}
   const hs=S.hairStyle;if(hs!=='none'){Q.E(14,7.5+b,8,4,hr);Q.R(6.5,8+b,15,3.4,hr);
    if(!side){for(let i=0;i<5;i++)Q.P([[7+i*3,11+b],[10+i*3,11+b],[8.5+i*3,13.5+b-(i%2)]],hr);Q.R(6.5,9+b,1.8,(hs==='bob'?9:6),hr);Q.R(19.7,9+b,1.8,(hs==='bob'?9:6),hr);Q.R(9,7+b,6,1,sh(hr,1.25))}
    else{Q.R(16.5,9+b,5.5,(hs==='long'?13:hs==='bob'?9:7),hr);Q.R(16.5,9+b,5.5,1,hd)}
    if(hs==='spiky')for(let i=0;i<5;i++)Q.P([[7+i*3,7+b],[8.5+i*3,1.5+b+(i%2)*1.5],[10+i*3,7+b]],hr);
    if(hs==='long'&&!side){Q.R(6,11+b,2.4,12,hr);Q.R(19.6,11+b,2.4,12,hr)}
    if(hs==='pony'){Q.E(side?22:21.5,10+b,2.4,3.6,hr);Q.R(side?21:20.5,12+b,2.2,7,hd)}}}
  /* 모자 */
  const H=S.hat,hc=S.hatC||acc;
  if(H==='hood'&&!back){Q.E(14,6.5+b,8.4,3.4,S.hood);Q.R(5.5,9+b,2.6,9,S.hood);Q.R(19.9,9+b,2.6,9,S.hood)}
  else if(H==='helmet'){Q.E(14,8+b,8.6,5,hc);Q.R(5.4,8+b,17.2,4,hc);Q.R(5.4,11+b,17.2,1.4,sh(hc,1.3));if(!back&&!side)Q.R(13.4,4+b,1.2,8,sh(hc,.7))}
  else if(H==='witch'){Q.E(14,6+b,11.5,2,hc);Q.P([[8,6+b],[20,6+b],[17+Math.sin(t*2)*1.2,-7+b]],hc);Q.R(9,4.2+b,10,1.6,S.hatAcc||acc);Q.px(16,1+b,'#ffe36b',.6+.4*Math.sin(t*5))}
  else if(H==='crown'){Q.R(8,4+b,12,2.5,'#ffd84a');for(let i=0;i<4;i++)Q.P([[8+i*4,4+b],[10+i*4,4+b],[9+i*4,1+b]],'#ffd84a');Q.px(14,4.5+b,'#ff4d6d')}
  else if(H==='horns'){for(const s of [-1,1])Q.P([[14+s*5,7+b],[14+s*9,2+b],[14+s*8,0+b],[14+s*3,6+b]],hc)}
  else if(H==='tricorn'){Q.P([[3.5,7.5+b],[24.5,7.5+b],[19,1+b],[9,1+b]],hc);Q.R(5,6.5+b,18,1,acc);if(!back&&!side){Q.px(13.5,3.5+b,'#f4f6f8');Q.px(14.5,3.5+b,'#f4f6f8');Q.px(14,4.5+b,'#f4f6f8')}}
  else if(H==='ears'){for(const s of [-1,1]){Q.P([[14+s*4,6+b],[14+s*8,0+b],[14+s*8.5,6+b]],hc);Q.P([[14+s*5,5.5+b],[14+s*7.5,2+b],[14+s*7.5,5.5+b]],S.earIn||'#ffb0a0')}}
  else if(H==='halo'){const o=Q.o;o.save();o.globalAlpha=.8+.2*Math.sin(t*3);o.strokeStyle='#ffe79a';o.lineWidth=1;o.beginPath();o.ellipse(20,9+b,6,1.6,0,0,6.28);o.stroke();o.restore()}
  else if(H==='bandana'){Q.R(6.4,7.4+b,15.2,2.6,hc);Q.R(6.4,7.4+b,15.2,.8,sh(hc,1.3));if(!side||true){const w=Math.sin(t*6)*.8;Q.P([[20,8+b],[24,9+b+w],[23.5,11+b+w],[20,10+b]],hc)}}
  else if(H==='mush'){Q.E(14,6.5+b,11.5,5,hc);Q.R(2.5,6.5+b,23,2,sh(hc,.8));for(const [x,y] of [[9,4],[16,3],[20,6],[7,7],[13,7]])Q.C(x,y+b,1.1,'#ffffff')}
  else if(H==='goggles'){Q.R(6.5,8.4+b,15,2,'#5a3a22');if(!back){for(const x of (side?[9]:[10.5,17.5])){Q.C(x,9.4+b,1.9,'#3a2a1a');Q.C(x,9.4+b,1.4,'#8de4ff');Q.px(x-.6,8.8+b,'#ffffff')}}}
  else if(H==='feather'){Q.E(14,6.5+b,8.6,3.4,hc);Q.R(5.4,7.5+b,17,2,hc);const w=Math.sin(t*3)*.6;Q.P([[19,6+b],[25,0+b+w],[24,2+b+w],[20,7+b]],S.featherC||'#e8402a')}
  try{S.fx&&S.fx(Q,b,t,v)}catch(e){}}}
 const dots=(n,col,y0,y1,sp)=>(Q,b,t)=>{for(let i=0;i<n;i++){const q=(t*(sp||.5)+i/n)%1,x=4+((i*53)%20)+Math.sin(t*2+i)*2;Q.px(x,y1-(y1-y0)*q,col,Math.sin(q*Math.PI)*.85)}};
 /* ---------- 새 캐릭터 15 ---------- */
 const NC=[
  {name:'리오',sub:'바람 궁수',price:800,hp:27,dash:7,dashFx:'wind',tr:'대시가 끝나면 돌풍이 적을 밀어내고 피해',desc:'초록 모자에 깃털. 바람을 타고 누구보다 멀리 달린다.',
   S:{skin:'#ffd8b8',hair:'#3a8a5a',hairStyle:'short',hat:'feather',hatC:'#4a9a5a',featherC:'#e8402a',top:'#4a9a5a',style:'vest',acc:'#c8a46a',pants:'#5a4a32',boot:'#3a2a1a',scarf:'#e8f4d0',eye:'#2a6a3a',quiver:1,fx:dots(4,'#e8ffe8',6,30,.9)}},
  {name:'하나',sub:'약초 의사',price:1000,hp:30,dash:7,poisonRes:.6,dashFx:'heal',tr:'독 내성 60% · 대시할 때마다 체력 +1',desc:'하얀 가운의 약초 의사. 주머니 가득 해독초를 들고 다닌다.',
   S:{skin:'#ffe0c8',hair:'#f0d8a0',hairStyle:'long',hat:'none',top:'#f4f6f8',style:'coat',acc:'#5ad07a',emblem:'#5ad07a',pants:'#6a8a9a',boot:'#4a5a6a',eye:'#4a8a5a',fx:(Q,b,t)=>{for(let i=0;i<3;i++){const q=(t*.4+i/3)%1;Q.P([[4+i*9,28-q*24],[6+i*9,27-q*24],[5+i*9,25-q*24]],'#7dff9a',(1-q)*.8)}}}},
  {name:'가온',sub:'대장장이',price:1300,hp:48,dash:7,shBreak:1,tr:'방패를 2배로 빨리 부숨',desc:'망치질로 단련된 팔. 어떤 방패든 두드려 부순다.',
   S:{skin:'#e8b890',hair:'#2a1a10',hairStyle:'short',hat:'bandana',hatC:'#c8322a',top:'#5a3a2a',style:'vest',acc:'#8a8a8a',sleeve:'#e8b890',pants:'#3a3a44',boot:'#2a1a10',eye:'#3a2a1a',fx:(Q,b,t)=>{if(Math.floor(t*5)%3===0)Q.px(20+Math.sin(t*20)*3,24-((t*40)%8),'#ffd166')}}},
  {name:'소라',sub:'해적 선장',price:1600,hp:50,dash:7,critAdd:.1,tr:'치명타 +10%',desc:'삼각 모자의 해적 선장. 노린 곳은 놓치지 않는다.',
   S:{skin:'#f0c8a0',hair:'#5a2a1a',hairStyle:'pony',hat:'tricorn',hatC:'#1a1a24',top:'#c8323a',style:'coat',acc:'#ffd166',cape:'#1a1a24',pants:'#2a2a3a',boot:'#1a1010',eye:'#3a6aa0'}},
  {name:'유키',sub:'눈의 무녀',price:1900,hp:54,dash:7,onHit:'chill',tr:'맞힌 적이 1.5초 느려짐',desc:'하얀 무녀복에 붉은 치마. 칼끝에서 눈꽃이 핀다.',
   S:{skin:'#fff0e8',hair:'#f4f8ff',hairStyle:'long',hat:'none',top:'#f4f6fa',robe:'#c8324a',acc:'#c8324a',pants:'#c8324a',boot:'#f4f6f8',eye:'#6ab8ff',fx:dots(5,'#ffffff',0,32,.25)}},
  {name:'다크',sub:'흡혈 백작',price:2300,hp:56,dash:7,leech:.15,tr:'공격할 때 15% 확률로 체력 +1 (흡혈)',desc:'붉은 안감의 망토를 두른 백작. 상처를 피로 메운다.',
   S:{skin:'#e8e0f0',hair:'#1a1424',hairStyle:'short',hat:'none',top:'#1a1424',style:'jacket',acc:'#c8324a',cape:'#5a0a1a',pants:'#1a1424',boot:'#0a0810',eye:'#ff3a4a',fx:(Q,b,t)=>{for(let i=0;i<2;i++){const q=(t*.7+i/2)%1;Q.px(4+i*18+Math.sin(t*6+i)*2,18-q*14,'#ff4d6d',(1-q)*.8)}}}},
  {name:'볼트',sub:'번개 기계공',price:2700,hp:60,dash:8,dashFx:'spark',tr:'대시 길에 전류 — 가까운 적에게 피해',desc:'고글 너머로 번개를 다루는 기계공. 공구 벨트가 늘 찌릿하다.',
   S:{skin:'#ffd8b8',hair:'#ffd84a',hairStyle:'spiky',hat:'goggles',top:'#3a5a8a',style:'coat',acc:'#ffd84a',pants:'#2a3a5a',boot:'#3a3a3a',eye:'#3a5a8a',fx:(Q,b,t)=>{if(Math.floor(t*7)%4===0){let x=6+Math.random()*16,y=20+b;for(let i=0;i<3;i++){const nx=x+(Math.random()-.5)*4;Q.L(x,y,nx,y+2,'#fff6a0');x=nx;y+=2}}}}},
  {name:'모모',sub:'버섯 소녀',price:3100,hp:62,dash:8,poisonRes:1,onHit:'poison',tr:'독 면역 · 맞힌 적을 중독시킴',desc:'빨간 버섯 모자의 소녀. 독버섯 숲에서 자라 독이 듣지 않는다.',
   S:{skin:'#ffe8d8',hair:'#ff9a7a',hairStyle:'bob',hat:'mush',hatC:'#ff4a6a',top:'#f0e8d0',robe:'#c86a8a',acc:'#c86a8a',pants:'#c86a8a',boot:'#7a4a3a',eye:'#5a3a2a',bigEye:1,fx:dots(4,'#b6ff4a',4,30,.35)}},
  {name:'레오',sub:'사자 전사',price:3600,hp:70,dash:8,dmgAdd:.12,tr:'모든 피해 +12%',desc:'갈기를 휘날리는 사자 전사. 포효 한 번에 적이 움츠러든다.',
   S:{skin:'#f0c8a0',hair:'#e8a040',hairStyle:'long',hat:'ears',hatC:'#e8a040',earIn:'#c87a2a',top:'#c89a40',style:'armor',acc:'#8a6a20',pants:'#5a3a1a',boot:'#3a2a10',tail:'#e8a040',tailTip:'#8a5a1a',eye:'#8a5a10'}},
  {name:'미르',sub:'용 피리꾼',price:4100,hp:72,dash:8,onHit:'burn',tr:'맞힌 적에게 화상 3초',desc:'용의 뿔과 꼬리를 가진 피리꾼. 피리 소리에 불꽃이 춤춘다.',
   S:{skin:'#ffe0c8',hair:'#4a8aff',hairStyle:'pony',hat:'horns',hatC:'#e8e0c8',top:'#2a6a8a',style:'coat',acc:'#ffd166',pants:'#1e4a6a',boot:'#3a2a1a',tail:'#4a8aff',tailTip:'#ff8a3a',eye:'#ffd166',fx:(Q,b,t)=>{const q=(t*.6)%1;Q.R(22,10-q*8+b,1,3,'#ffe79a',1-q);Q.R(21,12-q*8+b,2,1,'#ffe79a',1-q)}}},
  {name:'실비',sub:'은빛 도적',price:4700,hp:74,dash:9,critAdd:.15,tr:'치명타 +15%',desc:'후드 속 은빛 머리의 도적. 그림자에서 급소를 찌른다.',
   S:{skin:'#ffe0d0',hair:'#c8d0e0',hairStyle:'bob',hat:'hood',hood:'#3a3a4a',top:'#2a2a36',style:'vest',acc:'#8a9aaa',scarf:'#c8d0e0',pants:'#1e1e28',boot:'#14141c',eye:'#8de4ff'}},
  {name:'테라',sub:'바위 거인',price:5300,hp:110,dash:9,shBreak:.5,pierce:.15,tr:'체력이 아주 많음 · 방패 1.5배로 부숨 · 15% 꿰뚫음',desc:'바위 투구를 쓴 거인. 느리지만 무너지지 않는다.',
   S:{skin:'#a89880',hair:'#5a4a3a',hairStyle:'none',hat:'helmet',hatC:'#7a6a5a',top:'#6a5a48',style:'armor',acc:'#9a8a70',pants:'#4a3a2a',boot:'#3a2a1a',eye:'#ffb040',fx:dots(3,'#9a8a70',22,33,.3)}},
  {name:'노바',sub:'별 마법사',price:6000,hp:112,dash:9,pierce:.3,tr:'방패를 30% 꿰뚫음',desc:'별이 쏟아지는 모자의 마법사. 마법은 방패를 비켜 간다.',
   S:{skin:'#fff0e8',hair:'#ff8ad0',hairStyle:'long',hat:'witch',hatC:'#2a2a6a',hatAcc:'#ffe36b',top:'#3a2a8a',robe:'#2a1e6a',acc:'#ffe36b',pants:'#2a1e6a',boot:'#1a1440',eye:'#ffe36b',bigEye:1,fx:(Q,b,t)=>{for(let i=0;i<5;i++){const tw=.5+.5*Math.sin(t*5+i*2);Q.px(3+((i*41)%22),4+((i*29)%26),i%2?'#ffe36b':'#ffffff',tw)}}}},
  {name:'카게',sub:'독 닌자',price:6800,hp:114,dash:9,onHit:'poison',critAdd:.06,poisonRes:.4,tr:'맞힌 적 중독 · 치명타 +6% · 독 내성 40%',desc:'초록 복면의 닌자. 칼날에 독을 바르고 소리 없이 다가온다.',
   S:{skin:'#f0caa4',hair:'#2a3a2a',hairStyle:'short',hat:'bandana',hatC:'#3a6a2a',mask:'#2a4a2a',top:'#1e2a1e',style:'vest',acc:'#3a6a2a',scarf:'#5aa02a',pants:'#141c14',boot:'#0a100a',eye:'#b0ff5a',fx:(Q,b,t)=>{const q=(t*.8)%1;Q.px(20,27+q*6,'#8aff5a',1-q)}}},
  {name:'세레나',sub:'천사 기사',price:8000,hp:118,dash:9,guard:.15,poisonRes:.3,tr:'맞을 때 15% 확률로 피해를 막음 · 독 내성 30%',desc:'빛의 날개를 가진 성기사. 하늘이 지켜 주는 전설의 기사.',
   S:{skin:'#fff0e8',hair:'#ffe8a0',hairStyle:'long',hat:'halo',top:'#f4f6f8',style:'armor',acc:'#ffd84a',wings:'#ffffff',pants:'#d8dce8',boot:'#c8a040',eye:'#5ab8ff',fx:(Q,b,t)=>{const q=(t*.3)%1;Q.R(4+Math.sin(t)*3,q*34,2,1,'#ffffff',(1-q)*.7)}}}];
 const C0=CHARS.length;
 NC.forEach((c,i)=>{const it=Object.assign({},c,{scarf:null,hero:false,v82:1});delete it.S;CHARS.push(it);CH2DEF[C0+i]={__v44:1,paint:paintChar(c.S)}});

 /* ---------- 새 무기 15 ---------- */
 const W5=(rows)=>rows;/* 7칸 너비 */
 function mkBlade(len,wd,pal,o){o=o||{};const R=["..ooo..","..oPo.."];for(let i=0;i<(o.grip||5);i++)R.push(i%2?"..oGo..":"..ogo..");R.push(o.guard==='wide'?"oCCCCCo":o.guard==='cup'?".cCCCc.":".oCCCo.");
  for(let i=0;i<len;i++)R.push(wd>=3?(i%3===1&&o.gem?".oeXEo.":".oeBEo."):wd===2?"..eBo..":"...B...");R.push(wd>=3?"..oeo..":"..eo...");R.push("...o...");return {g:o.grip?o.grip-1:4,pal:Object.assign({o:'#0e1114',P:'#9aa4ac',g:'#4a3a2a',G:'#6a5238',C:'#8a949c',B:'#dfe6ea',e:'#ffffff',E:'#8a949c',X:'#ff4d6d',c:'#4a8ab0'},pal),r:R,curve:o.curve,wave:o.wave}}
 const reuse=(base,pal)=>{const s=WSPR[base];return Object.assign({},s,{pal:Object.assign({},s.pal,pal)})};
 WSPR.toxfang=reuse('dagger',{C:'#7ad85a',e:'#d8ffb0',d:'#3a8a2a',Y:'#b0ff5a'});
 WSPR.hammer={g:6,pal:{o:'#0e1114',H:'#6a4a2a',h:'#8a6b45',M:'#8a949c',m:'#5a646c',L:'#dfe6ea',Y:'#ffd166'},r:["..oYo..","..oHo..","..oho..","..oHo..","..oho..","..oHo..","..oho..","..oHo..","..oho..","..oHo..","..oho..","ooooooo","oLLLLLo","oMMMMMo","oMmYmMo","oMMMMMo","ommmmmo","ooooooo"]};
 WSPR.frostgreat=reuse('great',{R:'#bfe8ff',B:'#9fe8ff',e:'#ffffff',F:'#6ab8ff',C:'#4a8ab0',P:'#bfe8ff'});
 WSPR.voltrapier=reuse('rapier',{Y:'#ffe36b',I:'#fff6c0',c:'#ffd166',b:'#5a4a2a'});
 WSPR.bloodscythe=reuse('scythe',{C:'#ff4d6d',c:'#a01a2a',e:'#ffd0d8',S:'#4a1a24',s:'#2a0a14'});
 WSPR.lavaaxe=reuse('axe',{A:'#ff7a2a',e:'#ffe36b',d:'#a03a10',H:'#3a1a10',Y:'#ff4d1a'});
 WSPR.piercer=reuse('spear',{S:'#c8d0e0',s:'#6a7a8a',Y:'#8de4ff',y:'#4a8ab0'});
 WSPR.starblade=mkBlade(12,3,{B:'#c8b8ff',E:'#7a6ae0',e:'#ffffff',C:'#ffe36b',X:'#ffe36b',P:'#ffe36b'},{gem:1,guard:'wide'});
 WSPR.windtwin=mkBlade(9,2,{B:'#d8ffe8',e:'#ffffff',C:'#5ad07a',P:'#5ad07a',g:'#2a6a3a',G:'#3a8a5a'},{grip:3});
 WSPR.poisonlance=reuse('spear',{S:'#5aa02a',s:'#2a5a1a',Y:'#b0ff5a',y:'#5a8a1a'});
 WSPR.judgment=mkBlade(15,3,{B:'#fff6d0',E:'#c8a040',e:'#ffffff',C:'#ffd84a',P:'#ffd84a',X:'#5ab8ff'},{gem:1,guard:'wide',grip:6});
 WSPR.shadowkatana=Object.assign({},WSPR.katana,{pal:Object.assign({},WSPR.katana.pal,{B:'#3a3a4a',h:'#8a6aff',s:'#1a1a24',R:'#6a3aff',K:'#0a0a10',Y:'#8a6aff'})});
 WSPR.sunblade=mkBlade(13,3,{B:'#ffe79a',E:'#ff8a3a',e:'#ffffff',C:'#ff8a3a',P:'#ffd84a',X:'#ff4d1a'},{gem:1,guard:'wide',wave:true});
 WSPR.thunderhammer=Object.assign({},WSPR.hammer,{pal:Object.assign({},WSPR.hammer.pal,{M:'#5a6a9a',m:'#3a4a6a',L:'#ffe36b',Y:'#8de4ff',H:'#2a2a3a',h:'#4a4a6a'})});
 WSPR.infinity=mkBlade(14,3,{B:'#e8f8ff',E:'#a070e0',e:'#ffffff',C:'#5affd8',P:'#ff9af0',X:'#ffe36b',g:'#3a2a4a',G:'#6a4a8a'},{gem:1,guard:'cup',grip:5});
 const NW=[
  {name:'독니 단검',type:'toxfang',ult:'dagger',price:1200,dmg:1.36,crit:0.08,range:-4,grogi:0.02,onHit:'poison',col:'#7ad85a',hilt:'#3a8a2a',trail:'#b0ff5a',sp:'맹독 난무',desc:'짧고 빠른 독니. 맞힌 적을 중독시킨다.'},
  {name:'방패 파쇄 망치',type:'hammer',ult:'great',price:1500,dmg:1.45,crit:0.02,range:6,grogi:0.15,shBreak:1.5,col:'#8a949c',hilt:'#6a4a2a',trail:'#dfe6ea',sp:'파쇄 강타',desc:'방패를 2.5배 빨리 부수는 쇠망치.'},
  {name:'서리 대검',type:'frostgreat',ult:'great',price:1800,dmg:1.48,crit:0.03,range:8,grogi:0.06,onHit:'chill',col:'#9fe8ff',hilt:'#4a8ab0',trail:'#bfe8ff',sp:'빙하 가르기',desc:'얼음을 두른 대검. 맞힌 적이 느려진다.'},
  {name:'번개 레이피어',type:'voltrapier',ult:'rapier',price:2100,dmg:1.55,crit:0.15,range:6,grogi:0.04,col:'#ffe36b',hilt:'#5a4a2a',trail:'#fff6a0',sp:'섬광 찌르기',desc:'번개처럼 빠른 찌르기. 치명타가 잦다.',big:2},
  {name:'흡혈 낫',type:'bloodscythe',ult:'scythe',price:2500,dmg:1.58,crit:0.08,range:10,grogi:0.1,leech:.25,col:'#ff4d6d',hilt:'#4a1a24',trail:'#ff8a9a',sp:'피의 수확',desc:'벨 때 25% 확률로 체력 +1.'},
  {name:'용암 도끼',type:'lavaaxe',ult:'axe',price:2900,dmg:1.65,crit:0.04,range:2,grogi:0.14,onHit:'burn',shBreak:.5,col:'#ff7a2a',hilt:'#3a1a10',trail:'#ffb060',sp:'용암 회전',desc:'화상을 입히고 방패도 1.5배로 부순다.'},
  {name:'관통 창',type:'piercer',ult:'spear',price:3300,dmg:1.68,crit:0.06,range:14,grogi:0.08,pierce:.6,col:'#c8d0e0',hilt:'#4a5a6a',trail:'#8de4ff',sp:'관통 일격',desc:'방패를 60% 꿰뚫는 긴 창.'},
  {name:'별빛 검',type:'starblade',ult:'sword',price:3700,dmg:1.71,crit:0.12,range:4,grogi:0.08,col:'#c8b8ff',hilt:'#ffe36b',trail:'#e8e0ff',sp:'별 폭풍',desc:'별이 박힌 칼날. 치명타와 피해가 고르다.'},
  {name:'바람 쌍검',type:'windtwin',ult:'dagger',price:4100,dmg:1.78,crit:0.1,range:-2,grogi:0.06,dashFx:'wind',col:'#d8ffe8',hilt:'#3a8a5a',trail:'#c8ffd8',sp:'질풍 난무',desc:'대시가 끝나면 돌풍이 적을 밀어낸다.'},
  {name:'독룡 창',type:'poisonlance',ult:'spear',price:4600,dmg:1.81,crit:0.06,range:14,grogi:0.1,onHit:'poison',pierce:.3,col:'#8aff5a',hilt:'#2a5a1a',trail:'#b0ff5a',sp:'독룡 돌격',desc:'중독 + 방패 30% 꿰뚫음.'},
  {name:'심판의 대검',type:'judgment',ult:'great',price:5200,dmg:1.84,crit:0.06,range:10,grogi:0.14,shBreak:1,col:'#fff6d0',hilt:'#c8a040',trail:'#ffe79a',sp:'심판',desc:'방패를 2배로 부수는 성스러운 대검.'},
  {name:'그림자 카타나',type:'shadowkatana',ult:'katana',price:5800,dmg:1.93,crit:0.2,range:4,grogi:0.06,col:'#8a6aff',hilt:'#0a0a10',trail:'#b8a0ff',sp:'영 일섬',desc:'치명타 20%의 검은 칼날.'},
  {name:'태양 검',type:'sunblade',ult:'flame',price:6500,dmg:1.96,crit:0.08,range:6,grogi:0.1,onHit:'burn',pierce:.35,col:'#ffe79a',hilt:'#ff8a3a',trail:'#ffd166',sp:'태양 폭발',desc:'화상 + 방패 35% 꿰뚫음.'},
  {name:'천둥 망치',type:'thunderhammer',ult:'spear',price:7200,dmg:1.99,crit:0.06,range:6,grogi:0.18,shBreak:2,dashFx:'spark',col:'#8de4ff',hilt:'#2a2a3a',trail:'#fff6a0',sp:'천둥 내려찍기',desc:'방패 3배로 부숨 · 대시 길에 전류.'},
  {name:'무한의 검',type:'infinity',ult:'chrono',price:8000,dmg:2.02,crit:0.12,range:10,grogi:0.15,pierce:.5,col:'#e8f8ff',hilt:'#6a4a8a',trail:'rainbow',sp:'무한 참격',desc:'방패 50% 꿰뚫음 · 모든 것이 고른 전설의 검.',big:2}];
 for(const w of NW){if(WPOSE&&!WPOSE[w.type])WPOSE[w.type]=WPOSE[w.ult]||WPOSE.sword;w.hitF=({dagger:700,great:300,rapier:900,scythe:380,axe:260,spear:1000,sword:520,katana:820,flame:440,chrono:660})[w.ult]||500;if(w.trail==='rainbow')w.trail='#ff9af0';w.v82=1}
 const W0=WEAPONS.length;
 NW.forEach((w,i)=>{const idx=W0+i;WEAPONS.push(w);/* 현질 새 검을 끼우면 이 칸도 그 검이 되도록(99998과 같은 방식) */
  try{Object.defineProperty(WEAPONS,idx,{configurable:true,enumerable:true,get(){return (window.PAY58&&PAY58.swordFor&&PAY58.swordFor(idx))||w},set(v){}})}catch(e){}});

 /* ---------- 새 펫 15 ---------- */
 const NP=[
  {name:'약초 거북',price:700,dmg:0.04,desc:'독 내성 50% · 15초마다 체력 1 회복',poisonRes:.5,heal:15,
   spr:{p:{o:'#161c22',G:'#5ad07a',g:'#2e8a4a',S:'#8a6a42',s:'#5a4028',E:'#1a1a1a',L:'#b6ff4a'},r:["...LL....","..oLLo...",".oSSSSo..","oSsSsSSo.","oSSsSSSoo","oGoooooGE",".G.....GG",".G.....G.","........."]}},
  {name:'전기 다람쥐',price:900,dmg:0.047,desc:'치명타 +6%',critAdd:.06,
   spr:{p:{o:'#161c22',Y:'#ffd166',y:'#c8961a',W:'#fff6e0',E:'#1a1a1a',B:'#8de4ff'},r:["Y..o.o...","YY.oYo...",".YYYYYo..","..oYEYo..","..oYWYo.B",".oYYYYo.B","..oy.yo..","........."]}},
  {name:'아기 골렘',price:1100,dmg:0.05,desc:'방패 1.5배로 부숨',shBreak:.5,
   spr:{p:{o:'#161c22',R:'#9a8a70',r:'#6a5a48',E:'#ffb040',M:'#5aa02a'},r:["..MoooM..",".oRRRRo..","oRERRERo.","oRRRRRRo.","ooRrrRoo.","oRRRRRRo.",".oRo.oRo.",".oo...oo.","........."]}},
  {name:'독침 벌',price:1300,dmg:0.057,desc:'맞힌 적을 중독시킴',onHit:'poison',
   spr:{p:{o:'#161c22',Y:'#ffd84a',K:'#2a2a1a',W:'#e8ffff',E:'#1a1a1a',G:'#8aff5a'},r:["..W.W....",".WWoWW...","..oYKYo..",".oYKYKYo.",".oKEYEKo.","..oYKYo..","...oGo...","....G....","........."],glow:'#ffd84a'}},
  {name:'불씨 도마뱀',price:1500,dmg:0.06,desc:'맞힌 적에게 화상',onHit:'burn',
   spr:{p:{o:'#161c22',R:'#ff5a2a',r:'#a02a10',Y:'#ffd166',E:'#1a1a1a'},r:["........Y","..oooo.YR",".oRRRRoR.","oRERRRRRo","oRRrRrRo.",".oRRRRo..","..o.o.o..","........."]}},
  {name:'눈송이 요정',price:1700,dmg:0.063,desc:'맞힌 적이 느려짐',onHit:'chill',
   spr:{p:{o:'#8a9aac',W:'#ffffff',B:'#bfe8ff',E:'#4a8ab0',C:'#e8f8ff'},r:["B...W...B","BB.WWW.BB",".BBWEWBB.","..WWWWW..","...WCW...","..W.W.W..","....W....","........."],glow:'#bfe8ff'}},
  {name:'박쥐 쿠키',price:1900,dmg:0.07,desc:'공격할 때 15% 확률로 체력 +1',leech:.15,
   spr:{p:{o:'#161c22',V:'#6a3a8a',v:'#3a1a5a',R:'#ff4d6d',W:'#ffffff'},r:["o.......o","Vo.ooo.oV","VVoVVVoVV",".VVRVRVV.","..VVWVV..","...VVV...","....v....","........."]}},
  {name:'시계 부엉이',price:2200,dmg:0.08,desc:'대시 충전 40% 빠름',regen:1.4,
   spr:{p:{o:'#161c22',B:'#8a6a42',b:'#5a4028',Y:'#ffd166',E:'#1a1a1a',W:'#fff6e0'},r:["oB.....Bo",".oBBBBBo.","oBYYBYYBo","oBYEBYEBo","oBBBWBBBo",".oBWYWBo.",".oBbbbBo.","..o...o..","........."]}},
  {name:'행운 고양이',price:2500,dmg:0.087,desc:'코인 +40%',coin:.4,
   spr:{p:{o:'#161c22',W:'#ffffff',w:'#e8e0d8',R:'#ff4d6d',Y:'#ffd166',E:'#1a1a1a'},r:["oW.....Wo","oWWoooWWo","oWEWWWEWo","oWWWRWWWo",".oWYYYWo.",".oWWYWWoY",".oW.oW.YY","........."]}},
  {name:'방패 드론',price:2900,dmg:0.09,desc:'맞을 때 10% 확률로 피해를 막음',guard:.1,
   spr:{p:{o:'#3a4a5a',S:'#b8c4d4',s:'#6a7a8a',B:'#8de4ff',E:'#5affd8'},r:["SSo...oSS","..o...o..","..ooooo..",".oSSSSSo.","oSSBEBSSo","oSsSSSsSo",".oSSSSSo.","..o...o..","........."],glow:'#8de4ff'}},
  {name:'번개 해파리',price:3300,dmg:0.093,desc:'대시 길에 전류',dashFx:'spark',
   spr:{p:{o:'#6a5a9a',P:'#c8a8ff',p:'#8a6ae0',E:'#ffffff',Y:'#fff6a0'},r:["..ooooo..",".oPPPPPo.","oPPEPEPPo","oPPPPPPPo",".pPpPpPp.",".Y.p.p.Y.","..Y...Y..","....Y....","........."],glow:'#c8a8ff'}},
  {name:'바람 매',price:3700,dmg:0.1,desc:'대시가 끝나면 돌풍',dashFx:'wind',
   spr:{p:{o:'#161c22',B:'#8a6a42',W:'#f4f6f8',Y:'#ffd166',E:'#1a1a1a',G:'#c8ffd8'},r:["G.......G","BBo...oBB",".BBoooBB.","..oWEWo..","..oWYWo..","...oWo...","...B.B...","........."]}},
  {name:'맹독 뱀',price:4200,dmg:0.11,desc:'독 내성 80% · 맞힌 적 중독',poisonRes:.8,onHit:'poison',
   spr:{p:{o:'#161c22',G:'#5aa02a',g:'#2a5a1a',Y:'#ffd84a',E:'#ffd84a',R:'#ff4d6d'},r:["....oGGo.","...oGEGGo","...oGGGoR","..oGgo...","..oGo....",".oGgo....","oGGgGGGo.",".ogggggo.","........."]}},
  {name:'별빛 고래',price:4800,dmg:0.117,desc:'방패 25% 꿰뚫음 · 피해 +5%',pierce:.25,dmgAdd:.05,
   spr:{p:{o:'#1a2a4a',B:'#3a6ab0',b:'#2a4a80',W:'#e8f4ff',E:'#ffffff',Y:'#ffe36b'},r:["...Y.....",".......oo","..oooooBo","oBBBBBBBo","oBEBBBBBo","oWWWWBBo.",".oWWWWo..","..oooo...","........."],glow:'#8ad8ff'}},
  {name:'창공의 용',price:5500,dmg:0.13,desc:'피해 +10% · 치명타 +5%',dmgAdd:.1,critAdd:.05,
   spr:{p:{o:'#161c22',S:'#5ab8ff',s:'#2a6ab0',W:'#e8f8ff',E:'#ffe36b',Y:'#ffd166'},r:["W..Y.Y..W","WW.oSo.WW",".WoSSSoW.","..oSESSo.","..oSSSSSo","...oSsSo.","...S.S.S.","........."],glow:'#5ab8ff'}}];
 const P0=PETS.length;
 NP.forEach((p,i)=>{const id=P0+i;PET_SPR[id]=p.spr;const it=Object.assign({},p);delete it.spr;it.v82=1;PETS.push(it)});
 /* 300의 drawPet은 펫마다 손으로 그린 그림이라 새 번호를 모른다 → 새 펫은 9×9 도트를 크게 그린다(살짝 둥실 · 빛 · 방향 뒤집기) */
 function drawNewPet(c,id,x,y,now,k){const sp=PET_SPR[id];if(!sp)return false;k=k||1;const s=1.9*k,rows=sp.r,w=rows[0].length,bob=Math.round(Math.sin(now/260+id)*1.4*k),fl=(typeof P!=='undefined'&&P&&P.face&&P.face.x<0);
  c.save();c.globalAlpha=.25;c.fillStyle='#000';c.beginPath();c.ellipse(x,y+9*k,5*k,1.3*k,0,0,6.28);c.fill();c.restore();
  if(sp.glow){c.save();c.globalAlpha=.22+.12*Math.sin(now/180);c.fillStyle=sp.glow;c.beginPath();c.arc(x,y+bob,8*k,0,6.28);c.fill();c.restore()}
  const pal=sp.p;for(let j=0;j<rows.length;j++)for(let i=0;i<w;i++){const ch=rows[j][i];if(ch==='.')continue;const col=pal[ch]||(ch==='o'?'#161c22':null);if(!col)continue;c.fillStyle=col;const ii=fl?w-1-i:i;c.fillRect(Math.round(x+(ii-w/2)*s),Math.round(y+(j-rows.length/2)*s+bob),Math.ceil(s),Math.ceil(s))}
  /* 밝은 윗면 */c.save();c.globalAlpha=.18;c.fillStyle='#ffffff';c.fillRect(Math.round(x-w/2*s+s),Math.round(y-rows.length/2*s+bob+s),Math.round((w-2)*s),Math.ceil(s));c.restore();return true}
 {const base=drawPet;drawPet=function(c,id,x,y,now,k){if(id>=P0&&PET_SPR[id]){try{if(drawNewPet(c,id,x,y,now,k))return}catch(e){}}return base.apply(this,arguments)}}

 /* ---------- 특성: 흡혈 · 막기 · 대시 효과 (CB81에 더함) ---------- */
 const gear=()=>{try{return [curChar()||{},curWp()||{},curPet()||{}]}catch(e){return []}};
 const sum=k=>gear().reduce((a,x)=>a+(+x[k]||0),0);
 const fxs=()=>gear().map(x=>x.dashFx).filter(Boolean);
 if(window.CB81){const C=CB81;
  {const f=C.onHit;C.onHit=function(m,dmg,crit,bg){const r=f.apply(this,arguments);try{const l=sum('leech');if(l&&Math.random()<l&&P.hp<P.maxhp){P.hp=Math.min(P.maxhp,P.hp+1);TW71.addPop(P.x,P.y-28,'+1 흡혈','#ff8a9a')}}catch(e){}return r}}
  {const f=C.onHurt;C.onHurt=function(dmg){const g=sum('guard');if(g&&Math.random()<g){try{const n=performance.now();P.inv=Math.max(P.inv,n+350);const tx='막음!';if(mode==='tower')TW71.addPop(P.x,P.y-30,tx,'#ffe79a');else if(G&&G.pops)G.pops.push({x:P.x,y:P.y-30,t:n,tx,col:'#ffe79a'})}catch(e){}return 0}return f.apply(this,arguments)}}
  {const f=C.onDash;C.onDash=function(){const r=f.apply(this,arguments);try{const list=fxs(),n=performance.now();
   if(list.includes('heal')&&P.hp<P.maxhp){P.hp=Math.min(P.maxhp,P.hp+1)}
   if(list.includes('wind'))setTimeout(()=>{try{if(mode==='tower'){const T=TW71.T;for(const m of T.mobs){if(m.hp<=0||m.born>0)continue;const d=Math.hypot(m.x-P.x,m.y-P.y);if(d<46){const a=Math.atan2(m.y-P.y,m.x-P.x);m.vx+=Math.cos(a)*260;m.vy+=Math.sin(a)*260;TW71.hitMob(m,10,'#c8ffd8','돌풍 ')}}TW71.burst(P.x,P.y,14,'#c8ffd8',160)}else if(mode==='boss'&&G&&G.boss&&Math.hypot(G.boss.x-P.x,G.boss.y-P.y)<90&&typeof spDmg==='function')spDmg(G.maxHp*.002,G.boss.x,G.boss.y,'#c8ffd8',performance.now())}catch(e){}},160);
   if(list.includes('spark')){let k=0;const iv=setInterval(()=>{try{if(++k>4){clearInterval(iv);return}if(mode==='tower'){const T=TW71.T;for(const m of T.mobs){if(m.hp<=0||m.born>0||m._spk===n)continue;if(Math.hypot(m.x-P.x,m.y-P.y)<26){m._spk=n;TW71.hitMob(m,12,'#fff6a0','⚡')}}TW71.burst(P.x,P.y-6,3,'#fff6a0',90)}else if(mode==='boss'&&G&&G.boss&&k===4&&Math.hypot(G.boss.x-P.x,G.boss.y-P.y)<70&&typeof spDmg==='function')spDmg(G.maxHp*.0015,G.boss.x,G.boss.y,'#fff6a0',performance.now())}catch(e){}},45)}}catch(e){}return r}}}

 /* ---------- 상점 표시: 특성을 설명에 붙이기 ---------- */
 for(const c of CHARS.slice(C0))if(c.tr)c.desc=c.desc+' ◆ '+c.tr;
 const trW=w=>[w.onHit==='poison'?'중독':w.onHit==='burn'?'화상':w.onHit==='chill'?'느리게':'',w.pierce?'방패 '+Math.round(w.pierce*100)+'% 꿰뚫음':'',w.shBreak?'방패 '+(1+w.shBreak)+'배로 부숨':'',w.leech?'흡혈':'',w.dashFx?'대시 '+({wind:'돌풍',spark:'전류',heal:'회복'})[w.dashFx]:''].filter(Boolean).join(' · ');
 for(const w of NW){const t=trW(w);if(t&&w.desc.indexOf('◆')<0)w.desc+=' ◆ '+t}

 /* ---------- 새 캐릭터 · 펫의 변이 스킨 (현질 · 다이아) ---------- */
 const RC=window.RECOLOR59,TAU=Math.PI*2;
 const THEME=[['은하',250,'#8a7aff','star'],['벚꽃',335,'#ffb0d4','petal'],['용암',18,'#ff6a2a','ember'],['서리',200,'#8ae8ff','snow'],['황금',44,'#ffd166','spark'],['핏빛',352,'#ff4d6d','ember'],['유령',165,'#5affd8','wisp'],['독',95,'#b6ff4a','spore'],['청염',214,'#4ab0ff','flame'],['무지개',-1,'#ff9af0','prism'],['밤하늘',230,'#4a5aff','star'],['석양',28,'#ffa060','petal'],['심해',190,'#2ab8c8','bubble'],['자수정',280,'#c86aff','spark'],['백금',210,'#e8f0ff','prism']];
 const CVN=[];
 if(window.SKIN58&&RC){NC.forEach((c,i)=>{const [tn,H,col,fx]=THEME[i],base=C0+i,idx=140+i,id='v_'+['rio','hana','gaon','sora','yuki','dark','volt','momo','leo','mir','silvy','terra','nova','kage','serena'][i];
  const map=H<0?(h,s,l,x,y)=>s>.25?[(performance.now()/12+y*9+x*4)%360,.6,l]:null:(h,s,l)=>s>.2?[H+((h%40)-20)*.5,Math.max(.5,s),l*.95]:l>.85?null:[H,.25,l*.85];
  const extra=(Q,f,b,bl,t)=>{for(let k=0;k<6;k++){const q=(t*.5+k/6)%1,x=4+((k*37)%20)+Math.sin(t*2+k)*2,y=30-q*28;if(fx==='snow'||fx==='petal')Q.px(x,q*34,k%2?'#ffffff':col,1-q*.6);else if(fx==='bubble')Q.C(x,y,.8,'#bff8ff',Math.sin(q*Math.PI)*.7);else Q.px(x,y,k%2?'#ffffff':col,Math.sin(q*Math.PI)*.9)}};
  CH2DEF[idx]={__v44:1,skin:id,paint(Q,f,b,bl,t){CH2DEF[base].paint.call(CH2DEF[base],Q,f,b,bl,t);try{RC(Q.o.canvas,map,true)}catch(e){}try{extra(Q,f,b,bl,t)}catch(e){}}};
  const it={id,name:c.name+' · '+tn+' 변이',en:id.slice(2).toUpperCase()+' · VARIANT',price:1500,tier:'변이',tc:'#a6f5c6',col,idx,base,map,desc:c.name+'의 '+tn+' 변이 모습. 몸 색이 바뀌고 둘레에 '+tn+' 빛 입자가 떠다녀요.',tags:[tn+' 빛 색','둘레에 떠다니는 입자','능력은 원래 캐릭터 그대로'],trail:col,variant:true};
  SKIN58.list.push(it);CVN.push(it)})}
 if(window.PET59){const PX=[];NP.forEach((p,i)=>{const [tn,H,col,fx0]=THEME[(i+5)%15],base=P0+i,id='p_'+['turtle','squirrel','golem','bee','lizard','snowfairy','batcookie','clockowl','luckycat','drone','jelly','hawk','viper','whale','skydragon'][i];
   const map=H<0?(h,s,l)=>[(performance.now()/15)%360,.75,l]:(h,s,l)=>s>.15?[H+((h%30)-15)*.4,Math.max(.55,s),l]:null;
   const fx={star:'stars',petal:'petal',ember:'ember',snow:'snow',spark:'spark',wisp:'wisp',spore:'glow',flame:'flame',prism:'glow',bubble:'glow'}[fx0]||'glow';
   PX.push({base,id,name:p.name+' · '+tn,col,desc:p.name+'의 '+tn+' 변이. 능력은 원래 펫 그대로예요.',map,fx,fc:[col,'#ffffff'],price:1000,tier:'변이',cat:'pet'})});
  PET59.list.push(...PX);const ob=PET59.byId.bind(PET59),oe=PET59.equip.bind(PET59);let ex=null;
  /* 새 펫 변이: 새 펫 그림을 작은 캔버스에 그려 색을 바꾼 뒤 붙이고 둘레에 빛 입자 */
  const off=document.createElement('canvas');
  function drawPX(c,v,x,y,now,k){k=k||1;const S=Math.ceil(44*k);if(off.width!==S){off.width=S;off.height=S}const o=off.getContext('2d');o.setTransform(1,0,0,1,0,0);o.clearRect(0,0,S,S);o.imageSmoothingEnabled=false;
   drawNewPet(o,v.base,S/2,S/2,now,k);try{RC&&RC(off,v.map,false)}catch(e){}const sm=c.imageSmoothingEnabled;c.imageSmoothingEnabled=false;c.drawImage(off,Math.round(x-S/2),Math.round(y-S/2));c.imageSmoothingEnabled=sm;
   const t=now/1000;c.save();for(let i=0;i<6;i++){const q=(t*.7+i/6)%1,a=i*1.05+t;c.globalAlpha=(1-q)*.85;c.fillStyle=i%2?v.fc[0]:v.fc[1];c.fillRect(Math.round(x+Math.cos(a)*(8+q*4)*k),Math.round(y+(4-q*14)*k),Math.ceil(1.4*k),Math.ceil(1.4*k))}c.restore()}
  {const od=PET59.draw;PET59.draw=(c,id,x,y,now,k)=>{const v=PX.find(q=>q.id===id);if(v)return drawPX(c,v,x,y,now,k);return od(c,id,x,y,now,k)}}
  PET59.byId=id=>ob(id)||PX.find(v=>v.id===id);
  /* 새 펫 변이는 PET59 안쪽 목록에 없어서 장착 상태를 여기서 따로 들고 있다가 그리기 때 바꿔 끼운다 */
  PET59.equip=id=>{if(id&&PX.find(v=>v.id===id)){ex=id;oe(null)}else{ex=null;oe(id)}};const og=PET59.get.bind(PET59);PET59.get=()=>ex||og();
  {const base=drawPet;drawPet=function(c,id,x,y,now,k){try{const sm=document.getElementById('shopModal');if(ex&&!(sm&&!sm.hidden)&&id===((shopInv().eq||{}).pt||0)){const v=PX.find(q=>q.id===ex);if(v&&v.base===id){PET59.draw(c,ex,x,y,now,k);return}}}catch(e){}return base.apply(this,arguments)}}}

 window.NG82={NC,NW,NP,C0,W0,P0,paintChar,variants:CVN};
}catch(e){console.error('v82 new gear',e)}})();
