/* ================= 캐릭터 · 무기 · 펫 · 코인 ================= */
const _mir=r=>r.length===7?r+r.split('').reverse().join(''):r;
const LEGP=(b,B,D,k)=>({b,B,D,k});
const CHARS=[
 {name:'하루',sub:'시계공 견습생',price:0,hp:0,dash:5,desc:'마을의 시계를 고치던 소년. 균형 잡힌 기본 캐릭터.',hero:true,scarf:['#ff8a5c','#c8583a']},
 {name:'미나',sub:'고양이 후드 소녀',price:200,hp:8,dash:5,desc:'방울 소리를 내며 달린다.',scarf:['#ff9ec4','#d06a94'],blink:'K',
  pal:{q:'#ffd0e0',h:'#8a5a3a',e:'#ffffff',o:'#161c22',P:'#ff9ec4',p:'#d06a94',K:'#ffe0c8',j:'#e0b098',E:'#3a2a4a',m:'#ff8aa0',W:'#fff6fa',w:'#d8c8d8',Y:'#ffd166',L:'#a0587a',l:'#6a3050',...LEGP('#b07aa0','#e8b8d8','#6a3050','#a0587a')},
  rows:["..o....",".oPo...",".oqPooo","..oPPPP",".oPPhhh",".oPhKKK",".oPKeEK",".oPKEEK","..oKmKK","...oPWW",".oPpWWW","oKjoWWY","oKjoWwW",".oo.oLL"]},
 {name:'도윤',sub:'동굴 광부',price:450,hp:16,dash:6,desc:'헬멧 램프로 어둠을 밝힌다.',scarf:null,blink:'K',
  pal:{h:'#3a2a1a',e:'#ffffff',M:'#6a4a28',g:'#c8561a',o:'#161c22',Y:'#ffcf3a',y:'#c8961a',L:'#fffbe0',K:'#f0c8a0',j:'#c89a70',E:'#2a2018',O:'#ff8a3a',G:'#7a8a92',l:'#6a4a28',...LEGP('#4a5a6a','#6a7a8a','#3a2a1a','#5a4a3a')},
  rows:[".......","....ooo","...oYYY","..oYYYL","..oyYYY",".oooooo","..ohKKK","..oKeEK","..oKEEK","..oKMMM",".oOgOOO","oOOoOGO","oKjoOOO",".oo.olL"]},
 {name:'세라',sub:'별빛 마법사',price:800,hp:25,dash:6,desc:'모자 끝의 별이 박자에 맞춰 빛난다.',scarf:['#b88aff','#7a4ac8'],blink:'K',
  pal:{e:'#ffffff',o:'#161c22',H:'#7a4ac8',h:'#c8c8e8',Y:'#ffe36b',K:'#ffe0c8',E:'#3a2a6a',m:'#ff9ab0',R:'#5a3aa0',r:'#3a2470',L:'#ffe36b',l:'#c8a030',j:'#e0b098',...LEGP('#3a2470','#5a3aa0','#2a1a40','#4a3a60')},
  rows:["......o",".....oH","....oHH","...oHHY","..oHHHH","oHHHHHH","..ohhKK","..ohEeK","..ohKmK","..ohoRR",".oHhRRR","oHHoRYR","oKjoRRR",".oo.oYY"]},
 {name:'강철',sub:'로봇 소년',price:1200,hp:35,dash:7,desc:'태엽 심장을 단 작은 기계 전사.',scarf:['#8dcdf5','#4a8ab0'],blink:'V',
  pal:{w:'#eef4f8',o:'#161c22',M:'#b8c4cc',m:'#7a8a94',A:'#ff4d6d',V:'#1c2e38',E:'#7df9ff',g:'#4a5a64',N:'#4a6a80',n:'#2a3a4a',Y:'#ffd166',L:'#7a8a94',l:'#4a5a64',j:'#7a8a94',K:'#b8c4cc',...LEGP('#4a5a64','#7a8a94','#2a3038','#4a5a64')},
  rows:["......o","......A","...oooo","..oMwMM","..oMVVV","..oMVEE","..oMVVV","..oMMMM","..oMMgM","...oooo",".oMmNnN","oMmoNNY","oMmoNNN",".oo.oNN"]},
 {name:'루나',sub:'달의 기사',price:1800,hp:52,dash:7,desc:'초승달 투구와 푸른 망토의 기사.',scarf:['#6ab4ff','#3a6ac8'],blink:'o',
  pal:{o:'#161c22',Y:'#fff0a0',S:'#d8e0ec',w:'#ffffff',E:'#8dd8ff',C:'#3a6ac8',c:'#24448a',L:'#8a9aac',l:'#5a6a7c',K:'#d8e0ec',j:'#8a9aac',...LEGP('#5a6a7c','#9aa8ba','#2a3448','#4a5a6c')},
  rows:[".....oY","....oYo","...oSSS","..oSwSS","..oSSSS","..oSooo","..oSoEo","..oSSSS","...oSSS","..oCCCC",".oCcSSS","oCcoSSY","oCcoSSS",".oo.oCC"]},
 {name:'카이',sub:'그림자 닌자',price:2600,hp:58,dash:8,desc:'붉은 머리띠를 휘날리며 가장 빨리 움직인다.',scarf:['#ff3a4a','#a01a2a'],blink:'K',
  pal:{e:'#ffffff',o:'#161c22',N:'#2a2a3a',n:'#1a1a24',R:'#ff3a4a',K:'#f0caa4',E:'#1a1a24',j:'#c89a78',L:'#ff3a4a',l:'#a01a2a',...LEGP('#1a1a24','#3a3a4a','#101018','#2a2a3a')},
  rows:[".......","....ooo","...oNNN","..oNNNN","..oRRRR","..oNKKK","..oNeEK","..oNNNN","..oNnNN","...oNNN",".oNnNNN","oNnoRRR","oKjoNnN",".oo.onN"]},
 {name:'아린',sub:'숲의 요정',price:3600,hp:68,dash:8,desc:'꽃잎 날개로 가볍게 떠다닌다.',scarf:['#8aff9a','#3aa05a'],blink:'K',
  pal:{e:'#ffffff',o:'#161c22',G:'#5ad07a',g:'#2e8a4a',F:'#ff8ad0',K:'#ffe8d0',E:'#2a5a3a',m:'#ff9ab0',X:'#c8f8ff',j:'#e0c0a0',L:'#ff8ad0',l:'#c05a90',...LEGP('#2e8a4a','#5ad07a','#1a4a2a','#2e6a3a')},
  rows:["....oGo","...oGGo","..oGGGG","..oGGGF","..oGGGG","..oGKKK","..oGeEK","..oKEEK","..oKKmK","XX.oGGG","XXoGgGG",".XogGGF","oKjoGGG",".oo.ogG"]},
 {name:'제노',sub:'용기사',price:5000,hp:82,dash:9,desc:'용의 투구를 쓴 전사. 뿔 사이로 불꽃 눈이 빛난다.',scarf:['#ff6a2a','#a02a10'],blink:'o',
  pal:{o:'#161c22',U:'#f0e6c8',Q:'#c8323a',q:'#801a24',E:'#ffcf3a',Y:'#ffcf3a',L:'#5a3a2a',K:'#c8323a',j:'#801a24',...LEGP('#801a24','#c8323a','#3a1010','#601a1a')},
  rows:[".oU....",".oUo...","..oUooo","..oQQQQ","..oQqQQ","..oQooo","..oQoEo","..oQQQQ","...oQQQ","..oqqqq",".oQqQQQ","oQqoQQY","oQqoqQQ",".oo.oLL"]},
 {name:'오로라',sub:'황금 성기사',price:7000,hp:116,dash:9,desc:'왕관 투구의 전설. 체력과 대시가 가장 많다.',scarf:['#ffe36b','#c89a20'],blink:'o',
  pal:{o:'#161c22',Y:'#ffd84a',y:'#c89a20',R:'#ff4d6d',W:'#f4f6f8',w:'#b8c4cc',E:'#8dd8ff',K:'#f4f6f8',j:'#b8c4cc',...LEGP('#b8c4cc','#f4f6f8','#8a6a20','#c89a20')},
  rows:["..oYoYo","..oYYYY","..oYYYR","..oWWWW","..oWwWW","..oWooo","..oWoEo","..oWWWW","...oWWW","..oYYYY",".oWwWWW","oWwoWWY","oWwoWWW",".oo.oYY"]},
];
CHARS.forEach(ch=>{if(ch.rows){ch.top=ch.rows.map(_mir);ch.topB=ch.top.map((r,i)=>i>=5&&i<=7?r.replace(/E/g,ch.blink||'K'):r)}});
const WEAPONS=[
 {name:'견습생의 검',price:0,type:'sword',dmg:1.0,crit:0.0,range:0,grogi:0.0,col:'#eef4f6',hilt:'#8a6b45',desc:'기본 검.'},
 {name:'청동 단검',price:150,type:'dagger',dmg:1.08,crit:0.05,range:-4,grogi:0.0,col:'#e0a060',hilt:'#6a4a2a',desc:'짧지만 빠르고 가끔 치명타.'},
 {name:'철 대검',price:350,type:'great',dmg:1.16,crit:0.0,range:8,grogi:0.05,col:'#c8d0d8',hilt:'#4a3a2a',desc:'묵직한 한 방, 넓은 범위.'},
 {name:'카타나',price:600,type:'katana',dmg:1.25,crit:0.12,range:4,grogi:0.0,col:'#f4f8ff',hilt:'#c8323a',desc:'치명타 확률이 높다.'},
 {name:'전투 도끼',price:900,type:'axe',dmg:1.33,crit:0.03,range:2,grogi:0.12,col:'#b8c0c8',hilt:'#6a4a2a',desc:'그로기 게이지를 더 크게 채운다.'},
 {name:'얼음 레이피어',price:1300,type:'rapier',dmg:1.42,crit:0.08,range:6,grogi:0.05,col:'#9fe8ff',hilt:'#4a8ab0',desc:'반격 원이 조금 커진다.',big:3},
 {name:'화염검',price:1900,type:'flame',dmg:1.52,crit:0.06,range:6,grogi:0.08,col:'#ff8a3a',hilt:'#5a2a1a',desc:'불꽃이 일렁이는 칼날.'},
 {name:'번개 창',price:2700,type:'spear',dmg:1.62,crit:0.08,range:14,grogi:0.08,col:'#ffe36b',hilt:'#4a4a6a',desc:'가장 긴 사거리.'},
 {name:'수정 대낫',price:3800,type:'scythe',dmg:1.75,crit:0.1,range:10,grogi:0.15,col:'#d8a8ff',hilt:'#3a2a4a',desc:'그로기와 치명타 모두 강하다.'},
 {name:'시간의 검',price:5500,type:'chrono',dmg:1.9,crit:0.12,range:10,grogi:0.15,col:'#ffe79a',hilt:'#8a6a20',desc:'멈춘 시간을 베어낸 전설의 검.',big:2},
];
const PETS=[
 {name:'똑딱',price:0,dmg:0.0,desc:'코인 +5%',coin:.05},
 {name:'반딧불',price:180,dmg:0.02,desc:'12초마다 체력 1 회복',heal:12},
 {name:'태엽 쥐',price:350,dmg:0.025,desc:'대시 충전 25% 빠름',regen:1.25},
 {name:'구름 양',price:600,dmg:0.03,desc:'피격 후 무적 시간 +20%',inv:1.2},
 {name:'부엉이 봇',price:900,dmg:0.043,desc:'그로기 +12%',grogi:.12},
 {name:'불꽃 여우',price:1300,dmg:0.053,desc:'코인 +25%',coin:.25},
 {name:'얼음 펭귄',price:1800,dmg:0.067,desc:'8초마다 체력 1 회복',heal:8},
 {name:'수정 드래곤',price:2500,desc:'그로기 +20% · 반격 피해 +6%',grogi:.2,dmg:0.083},
 {name:'유령 고양이',price:3400,dmg:0.097,desc:'대시 소모 20% → 16%',dashCost:.16},
 {name:'황금 불사조',price:5000,dmg:0.123,desc:'보스전마다 한 번, 쓰러지면 체력 30%로 부활',revive:.3},
];
function shopInv(){if(saveData.coins==null)saveData.coins=300;saveData.inv=saveData.inv||{ch:[0],wp:[0],pt:[0]};saveData.eq=saveData.eq||{ch:0,wp:0,pt:0};return saveData}
const curChar=()=>CHARS[shopInv().eq.ch]||CHARS[0],curWp=()=>WEAPONS[shopInv().eq.wp]||WEAPONS[0],curPet=()=>PETS[shopInv().eq.pt]||PETS[0];
function charStats(i){const c=CHARS[i];return {hp:Math.round((DIFF[diff]||DIFF.normal).hp*(1+c.hp/100)),dash:c.dash}}
function stamMax(){return curChar().dash*.2}
function addCoins(n){shopInv();saveData.coins=Math.max(0,Math.round(saveData.coins+n));saveNow();const el=$('coinVal');if(el)el.textContent=saveData.coins}
function awardCoins(won,rank){const bi=G.bi||0,base=won?80+bi*15:15+bi*3,rm=won?({P:1.6,S:1.35,A:1.15,B:1,C:.9}[rank]||1):1,dm={easy:.8,normal:1,hard:1.3,extreme:1.7}[diff]||1,n=Math.round(base*rm*dm*(1+(curPet().coin||0)));addCoins(n);return n}
/* ---- 캐릭터 그리기 (기존 drawKnight 대체) ---- */
function drawKnight(c,x,y,s,fl,wt,idleT){const ch=curChar(),X=x-s,Y=y-6*s,now=performance.now();let legs=HERO_LEG[0],bob=0;
 if(wt!=null){const f=((Math.floor(wt/(Math.PI/2))%4)+4)%4;legs=HERO_LEG[f%2===0?1:2];bob=f%2?-1:0}else if(idleT!=null)bob=Math.round(Math.sin(idleT)*.6);
 const sz=Math.max(1,Math.ceil(s));
 if(ch.scarf){for(let i=1;i<=4;i++){const wv=i>1?Math.round(Math.sin(now/130+i*.9)):0;c.fillStyle=i%2?ch.scarf[0]:ch.scarf[1];const col=fl?13+i:-i;c.fillRect(Math.round(X+col*s),Math.round(Y+(9+bob+wv+(i>2?1:0))*s),sz,sz)}}
 if(ch.name==='아린'){const fw=Math.sin(now/90)>0;c.globalAlpha=.5;c.fillStyle='#c8f8ff';for(const sd of [-1,1]){const bx=X+(sd<0?-2:15)*s;c.fillRect(Math.round(bx+(fw?0:sd*s)),Math.round(Y+(8+bob)*s),Math.round(2*s),Math.round(3*s))}c.globalAlpha=1}
 if(ch.hero){sprRows(c,Math.floor(now/170)%26===0?HERO_TOPB:HERO_TOP,HERO_PAL,X,Y,s,fl,14,0,bob);sprRows(c,legs,HERO_PAL,X,Y,s,fl,14,14,0);return}
 sprRows(c,Math.floor(now/170)%26===0?ch.topB:ch.top,ch.pal,X,Y,s,fl,14,0,bob);sprRows(c,legs,ch.pal,X,Y,s,fl,14,14,0);
 if(ch.name==='도윤'&&!(c===tctx&&false)){c.globalAlpha=.25+.1*Math.sin(now/200);c.fillStyle='#fffbe0';c.fillRect(Math.round(X+5*s),Math.round(Y+(1+bob)*s),Math.round(4*s),Math.round(3*s));c.globalAlpha=1}
 if(ch.name==='세라'&&Math.floor(now/300)%2){c.fillStyle='#ffffff';c.fillRect(Math.round(X+(fl?7:6)*s),Math.round(Y+(3+bob)*s),sz,sz)}}
/* ---- 무기 그리기 ---- */
function drawSword(x,y,s,fl,now){const w=curWp(),swing=P.lungeT?(now-P.lungeT)/(P.lungeDur||120):2,active=swing>=0&&swing<1,dirS=fl?-1:1;
 const hx=x+(fl?.5:11.5)*s,hy=y+5.5*s,ang=active?dirS*(-1.15+Math.min(1,swing)*2.1):dirS*.9,ca=Math.cos(ang),sa=Math.sin(ang);
 const L={sword:10,dagger:7,great:13,katana:12,axe:11,rapier:12,flame:11,spear:16,scythe:13,chrono:12}[w.type]*s/2*2;
 const P2=(d)=>[hx+ca*d,hy+sa*d],px=-sa,py=ca;
 const seg=(d0,d1,wd,col,al)=>{for(let d=d0;d<=d1;d+=1){const [a,b]=P2(d);if(al!=null)RA(a-wd/2,b-wd/2,wd,wd,col,al);else R(a-wd/2,b-wd/2,wd,wd,col)}};
 R(hx-1,hy-1,s+1,s+1,w.hilt);
 switch(w.type){
 case 'dagger':seg(1,L,2,w.col);R(hx+ca*2-2,hy+sa*2-2,4,2,'#6a4a2a');break;
 case 'great':seg(1,L,4,'#6a7278');seg(1,L,2,w.col);{const [a,b]=P2(3);R(a+px*4-1,b+py*4-1,2,2,'#8a6b45');R(a-px*4-1,b-py*4-1,2,2,'#8a6b45')}break;
 case 'katana':for(let d=1;d<=L;d++){const cv=(d/L)*(d/L)*2.2*dirS,[a,b]=P2(d);R(a+px*cv-1,b+py*cv-1,2,2,d>L-2?'#ffffff':w.col)}{const [a,b]=P2(2);R(a-2,b-1,4,2,'#2a2a2a')}break;
 case 'axe':seg(1,L,2,'#8a6b45');{const [a,b]=P2(L-2);for(let k=-4;k<=4;k++){const w2=4-Math.abs(k)*.5;RA(a+px*k-1+ca*w2*.5,b+py*k-1+sa*w2*.5,2+w2*.4,2+w2*.4,w.col,1)}R(a+px*4-1,b+py*4-1,2,2,'#ffffff');R(a-px*4-1,b-py*4-1,2,2,'#ffffff')}break;
 case 'rapier':seg(1,L,1,w.col);{const [a,b]=P2(1.5);pcirc(a,b,2.5,'#4a8ab0',.9)}{const [a,b]=P2(L);RA(a-2,b-2,4,4,'#ffffff',.6)}break;
 case 'flame':seg(1,L,3,'#c83a1a');seg(1,L,1.5,w.col);for(let i=0;i<4;i++){const d=2+((now/60+i*3)%L),[a,b]=P2(d);RA(a+px*(Math.sin(now/50+i)*2)-1,b+py*(Math.sin(now/50+i)*2)-2,2,2,i%2?'#ffe36b':'#ff5a1f',.8)}break;
 case 'spear':seg(0,L-3,1.5,'#6a6a8a');{const [a,b]=P2(L-3);for(let k=0;k<4;k++){const [c2,d2]=P2(L-3+k);R(c2-(2-k*.4),d2-(2-k*.4),4-k*.8,4-k*.8,w.col)}if(Math.floor(now/80)%3===0)RA(a+px*3,b+py*3-1,2,1,'#ffffff',.9)}break;
 case 'scythe':seg(0,L,1.5,'#4a3a5a');{const [a,b]=P2(L);for(let k=0;k<8;k++){const q=k/7,bx=a+px*dirS*(-q*7)+ca*(Math.sin(q*Math.PI)*3),by=b+py*dirS*(-q*7)+sa*(Math.sin(q*Math.PI)*3);R(bx-1,by-1,2+(k<4?1:0),2,k>5?'#ffffff':w.col)}glow(a,b,6,w.col,.35)}break;
 case 'chrono':seg(1,L,3,'#8a6a20');seg(1,L,1.5,w.col);{const [a,b]=P2(3);pcirc(a,b,2.5,'#fff6cf',.9);R(a-.5,b-2,1,2,'#8a6a20')}{const [a,b]=P2(L);glow(a,b,5,'#ffe79a',.4+.2*Math.sin(now/150))}break;
 default:seg(1,L,2,w.col);{const [a,b]=P2(L);R(a-1,b-1,2,2,'#aab6bb')}}
 if(active&&swing>.12&&swing<.88){const ang2=dirS*(-1.15+Math.max(0,swing-.12)*2.1);for(let k=.4;k<=1;k+=.2)RA(hx+Math.cos(ang2)*L*k-1,hy+Math.sin(ang2)*L*k-1,2,2,w.col,.35)}}
/* ---- 펫 그리기 ---- */
const PET_SPR={
 1:{p:{o:'#1a1a10',Y:'#ffe36b',y:'#c8a020',w:'#e8ffff',k:'#2a2a1a'},r:["..w...w..",".www.www.","..wwoww..","...oyo...","..oYYYo..","..oYkYo..","..oYYYo..","...oYo...","....o...."],glow:'#ffe36b'},
 2:{p:{o:'#161c22',G:'#a8b4bc',g:'#6a7a84',P:'#ff9ab0',E:'#1a1a1a',Y:'#ffd166'},r:["...Y.Y...","...YYY...","..oooo...",".oGGGGo..","oPGEGGGo.","oGGGGGGoo",".oGGGGo.o","..o..o...","........."]},
 3:{p:{o:'#161c22',W:'#ffffff',w:'#d8e0e8',K:'#4a4a5a',E:'#ffffff'},r:[".owowowo.","owwWWWwwo","oWWWWWWWo","oWKKKKWWo","oWKEKEWWo","oWWKKWWWo",".owwwwwo.","..K...K..","........."]},
 4:{p:{o:'#161c22',B:'#8a6a42',b:'#5a4028',E:'#ffe36b',e:'#1a1a1a',M:'#b8c4cc',Y:'#ff9a3a'},r:["oB.....Bo",".oBBBBBo.","oBEEBEEBo","oBEeBEeBo","oBBBYBBBo",".oMBBBMo.",".oMbbbMo.","..oM.Mo..","........."]},
 5:{p:{o:'#161c22',O:'#ff8a3a',o2:'#c85a1a',W:'#fff6e8',E:'#1a1a1a',F:'#ffe36b',R:'#ff4d1a'},r:["o.o......","OoO...FR.","OOOo..RFR","OEOO..oRF","WWOOOOOO.",".OOOOOOo.",".oW..oWo.","........."]},
 6:{p:{o:'#161c22',B:'#3a5a8a',W:'#ffffff',Y:'#ffb020',E:'#1a1a1a',C:'#9fe8ff'},r:["..oooo...",".oBBBBo..",".oBEBEo..",".oBYYBo..","oBWWWWBo.","oBWWWWBo.","oBWWWWBo.",".oYooYo..","........."]},
 7:{p:{o:'#161c22',V:'#b88aff',v:'#7a4ac8',C:'#e8d8ff',E:'#ffe36b',W:'#d8a8ff'},r:["W...o....","WW.oVo.o.","WWoVVVoVo",".oVEVVVVo",".oVVVVCVo","..oVVVVo.","..oVovVo.","...o..o..","........."]},
 8:{p:{o:'#8a9aac',W:'#f4f8ff',w:'#c8d8e8',E:'#5ad0ff'},r:["o.....o..","Wo...oW..","WWoooWW..","WEWWWEWo.","WWWwWWWWo",".WWWWWWWo",".oWWWWWo.","..w.w.w..","........."]},
 9:{p:{o:'#3a1a0a',Y:'#ffd84a',y:'#c89a20',R:'#ff4d1a',E:'#1a1a1a',F:'#fff0a0'},r:["...FRF...","..RYYYR..","R.oYEYo.R","RYoYYYoYR","RYYYYYYYR",".RYyYyYR.","..RRyRR..","...RFR...","....F...."]},
};
function drawPet(c,id,x,y,now,k){k=k||1;if(!id){drawTick(c,x,y,now,k);return}const sp=PET_SPR[id];if(!sp)return;const s=1.6*k,rows=sp.r,w=rows[0].length,bob=Math.round(Math.sin(now/260+id)*1.2*k);
 if(sp.glow){c.globalAlpha=.25+.15*Math.sin(now/180);c.fillStyle=sp.glow;c.fillRect(Math.round(x-6*k),Math.round(y-6*k+bob),Math.round(12*k),Math.round(12*k));c.globalAlpha=1}
 const pal=sp.p,fl2=(P&&P.face&&P.face.x<0);for(let j=0;j<rows.length;j++)for(let i=0;i<w;i++){let ch=rows[j][i];if(ch==='.')continue;if(ch==='o'&&j===0&&id===5)ch='o';const col=pal[ch]||(ch==='o'?'#161c22':null);if(!col)continue;c.fillStyle=col;const ii=fl2?w-1-i:i;c.fillRect(Math.round(x+(ii-w/2)*s),Math.round(y+(j-rows.length/2)*s+bob),Math.ceil(s),Math.ceil(s))}
 if(id===8){c.globalAlpha=.25;c.fillStyle='#c8d8e8';c.fillRect(Math.round(x-5*s),Math.round(y+3*s+bob),Math.round(10*s),Math.round(2*s));c.globalAlpha=1}
 if(id===9||id===5){if(Math.floor(now/90)%2){c.fillStyle='#ffe36b';c.fillRect(Math.round(x+(RND()-.5)*10*k),Math.round(y+4*k+bob),Math.ceil(k),Math.ceil(k))}}}
/* ---- 스탯 적용 ---- */
function doDash(){if(paused||dlg.active)return;if(!(mode==='boss'&&(G.state==='play'||G.state==='count'))&&!(mode==='cave'&&C&&C.state==='walk'))return;initAudio();const now=performance.now(),cost=curPet().dashCost||.2;
 if(P.stam===undefined)P.stam=stamMax();if(now<P.dashCd)return;if(P.stamLock||P.stam<cost-.001){P.stamShake=now;sfx(140,.08,'square',.03,90);return}
 let [ix,iy]=moveInput();if(!ix&&!iy){ix=P.face.x;iy=P.face.y}const l=Math.hypot(ix,iy)||1;ix/=l;iy/=l;
 const ms=mus.ms||600,b=(now-mus.T0)/ms,err=Math.abs((b-Math.round(b))*ms),good=err<=(mode==='boss'?win().g:9999);
 P.stam=Math.max(0,P.stam-cost);if(P.stam<cost-.001&&P.stam<.01||P.stam<.01){P.stam=0;P.stamLock=true}
 P.dash={t0:now,dur:150,vx:ix*290,vy:iy*290};P.inv=Math.max(P.inv,now+(good?520:300));P.dashCd=now+170;sfx(good?520:330,.09,'sawtooth',.03,good?900:200);
 if(mode==='boss'){G.pops.push({x:P.x,y:P.y-22,t:now,tx:good?'DASH!':'dash',col:good?'#8dcdf5':'#6a8090'});for(let i=0;i<8;i++)G.parts.push({x:P.x,y:P.y,vx:-ix*60+(RND()-.5)*50,vy:-iy*60+(RND()-.5)*50,life:.3,max:.3,col:'#8dcdf5',s:2})}}
function stamTick(dt){const mx=stamMax();if(P.stam===undefined)P.stam=mx;
 /* v96: 다 쓰지 않아도 대시 칸이 조금씩 다시 참(마지막 대시 0.6초 뒤부터 · 한 칸 약 1.1초). 전에는 칸을 전부 써야만 충전돼서 「안 차오른다」고 느껴졌음 */
 if(!P.stamLock&&P.stam<mx&&performance.now()>(P.dashCd||0)+430){P.stam=Math.min(mx,P.stam+dt*.18*(curPet().regen||1))}
 if(P.stamLock){P.stam=Math.min(mx,P.stam+dt*mx/3.4*(curPet().regen||1));if(P.stam>=mx-1e-6){P.stam=mx;P.stamLock=false;sfx(700,.12,'triangle',.03,1100)}}
 const pt=curPet();if(pt.heal&&(mode==='boss'&&G&&G.state==='play'||mode==='cave')){const now=performance.now();if(!P.healAt||P.healAt<now-60000)P.healAt=now+pt.heal*1000;if(now>=P.healAt){P.healAt=now+pt.heal*1000;if(P.hp<P.maxhp&&P.hp>0){P.hp=Math.min(P.maxhp,P.hp+1);if(mode==='boss')G.pops.push({x:P.x,y:P.y-30,t:now,tx:'+1',col:'#7dffa8'})}}}}
/* ---- 보스전 펫 따라다니기 ---- */
function drawBossPet(now){if(!G||G.state==='dead')return;G.pt=G.pt||{x:P.x-20,y:P.y-30};G.pt.x+=(P.x-(P.face.x<0?-22:22)-G.pt.x)*.06;G.pt.y+=(P.y-34-G.pt.y)*.06;const id=shopInv().eq.pt||0;glow(G.pt.x,G.pt.y,10,id?'#ffffff':'#a8f0ff',.25);drawPet(ctx,id,G.pt.x,G.pt.y,now,id?1.25:.95)}
/* ---- 상점 UI ---- */
let shopTab='ch',shopOpen=false;
function shopCardHTML(kind,i){const inv=shopInv(),list=kind==='ch'?CHARS:kind==='wp'?WEAPONS:PETS,it=list[i],own=inv.inv[kind].includes(i),eq=inv.eq[kind]===i;
 let stats='';if(kind==='ch'){const st=charStats(i);stats='❤ 체력 '+st.hp+' · ⚡ 대시 '+st.dash+'칸'}else if(kind==='wp'){stats='⚔ 피해 ×'+it.dmg.toFixed(2)+(it.crit?' · 치명 '+Math.round(it.crit*100)+'%':'')+(it.grogi?' · 그로기 +'+Math.round(it.grogi*100)+'%':'')+(it.range?' · 사거리 '+(it.range>0?'+':'')+it.range:'')+(it.sp?'<br>✦ 필살기: '+it.sp:'')}else stats='✦ '+it.desc;
 const btn=eq?'<button class="shopBtn eq" disabled>장착 중</button>':own?'<button class="shopBtn" data-act="eq" data-k="'+kind+'" data-i="'+i+'">장착</button>':'<button class="shopBtn buy'+(inv.coins<it.price?' poor':'')+'" data-act="buy" data-k="'+kind+'" data-i="'+i+'">🪙 '+it.price+'</button>';
 return '<div class="shopCard'+(eq?' on':'')+'"><canvas width="96" height="96" data-k="'+kind+'" data-i="'+i+'"></canvas><b>'+it.name+'</b><span class="sub">'+(it.sub||(kind==='wp'?it.desc:''))+'</span><span class="st">'+stats+'</span>'+(kind==='ch'?'<span class="sub">'+it.desc+'</span>':'')+btn+'</div>'}
function renderShop(){const m=$('shopModal');if(!m)return;const inv=shopInv();$('shopCoins').textContent=inv.coins;m.querySelectorAll('.shopTab').forEach(b=>b.classList.toggle('on',b.dataset.t===shopTab));
 const list=shopTab==='ch'?CHARS:shopTab==='wp'?WEAPONS:PETS;$('shopGrid').innerHTML=list.map((_,i)=>shopCardHTML(shopTab,i)).join('')}
function openShop(tab){setupShop();if(tab)shopTab=tab;shopOpen=true;$('shopModal').hidden=false;renderShop()}
function closeShop(){shopOpen=false;const m=$('shopModal');if(m)m.hidden=true;const cv=$('coinVal');if(cv)cv.textContent=shopInv().coins}
function setupShop(){if($('shopModal'))return;document.body.insertAdjacentHTML('beforeend','<div id="shopModal" class="rushModal" hidden><div class="rushBar"><span>✦ 캐릭터 · 무기 · 펫 <b class="coinTag">🪙 <span id="shopCoins">0</span></b></span><button id="shopClose">✕ 닫기</button></div><div class="shopTabs"><button class="shopTab" data-t="ch">🧍 캐릭터</button><button class="shopTab" data-t="wp">⚔ 무기</button><button class="shopTab" data-t="pt">🐾 펫</button></div><div class="rushBody"><p class="small" id="shopHint">코인은 보스를 이기면(랭크·난이도가 높을수록 더 많이) 얻고, 동굴 잡몹을 베어도 얻어요.</p><div id="shopGrid"></div></div></div>');
 $('shopClose').onclick=closeShop;$('shopModal').querySelectorAll('.shopTab').forEach(b=>b.onclick=()=>{shopTab=b.dataset.t;renderShop()});
 $('shopGrid').addEventListener('click',e=>{const b=e.target.closest('button[data-act]');if(!b)return;const k=b.dataset.k,i=+b.dataset.i,inv=shopInv(),list=k==='ch'?CHARS:k==='wp'?WEAPONS:PETS,it=list[i];initAudio();
  if(b.dataset.act==='buy'){if(inv.coins<it.price){b.classList.add('shake');sfx(140,.15,'square',.04,90);setTimeout(()=>b.classList.remove('shake'),300);return}inv.coins-=it.price;inv.inv[k].push(i);inv.eq[k]=i;sfx(660,.2,'triangle',.05,1200);sfx(990,.25,'triangle',.04,1500)}
  else{inv.eq[k]=i;sfx(520,.1,'triangle',.04,800)}saveNow();renderShop()})}
function drawShopPreviews(now){if(!shopOpen)return;document.querySelectorAll('#shopGrid canvas').forEach(cv=>{const c=cv.getContext('2d'),k=cv.dataset.k,i=+cv.dataset.i;c.imageSmoothingEnabled=false;c.fillStyle='#0b1418';c.fillRect(0,0,96,96);c.fillStyle='#132228';c.fillRect(0,72,96,24);
  const inv=shopInv(),save=inv.eq[k];
  if(k==='ch'){inv.eq.ch=i;const fl=false;c.fillStyle='#132228';c.fillRect(0,84,96,12);drawKnight(c,26,38,4,fl,null,now/430);inv.eq.ch=save}
  else if(k==='wp'){const w=WEAPONS[i],sp=WSPR[w.type]||WSPR.sword,n=sp.r.length,sc=Math.min(4,70/(n*.72)),ang=-.82+Math.sin(now/700)*.04;ctx.save();ctx.fillStyle='#0b1418';ctx.fillRect(0,0,96,96);glow(48,48,30,w.trail,.12);const L=(n-1)*sc*.72,hx=48-Math.cos(ang)*(L/2-sp.g*sc*.72),hy=50-Math.sin(ang)*(L/2-sp.g*sc*.72);drawWeaponShape(w,hx,hy,ang,0,sc,now,1);ctx.restore();c.drawImage($('game'),0,0,96*SS,96*SS,0,0,96,96)}
  else{drawPet(c,i,48,46,now,i?3.2:3)}})}
function setupLobbyShop(){setupShop();const host=$('namePanel');if(!host||$('shopOpenBtn'))return;const row=host.querySelector('.row:last-of-type')||host;host.insertAdjacentHTML('beforeend','<div class="row" style="margin-top:10px;justify-content:space-between"><button class="primary" id="shopOpenBtn">🧍 캐릭터 · ⚔ 무기 · 🐾 펫</button><b class="coinTag">🪙 <span id="coinVal">'+shopInv().coins+'</span> 코인</b></div>');$('shopOpenBtn').onclick=()=>openShop();
 const tc=$('titleCv');if(tc&&!tc._shop){tc._shop=1;tc.style.cursor='pointer';tc.addEventListener('click',e=>{const r=tc.getBoundingClientRect(),x=(e.clientX-r.left)*480/r.width,y=(e.clientY-r.top)*190/r.height;if(x>300&&x<400&&y>60&&y<160)openShop('ch');else if(x>300&&x<340&&y>40&&y<110)openShop('pt')})}}
/* ---- 챕터 2 로비 배경 ---- */
function drawTitle2(now){const cv=$('titleCv2');if(!cv)return;const c=cv.getContext('2d');c.imageSmoothingEnabled=false;const g=c.createLinearGradient(0,0,0,190);g.addColorStop(0,'#0c0612');g.addColorStop(.55,'#2a0e24');g.addColorStop(1,'#3a1224');c.fillStyle=g;c.fillRect(0,0,480,190);
 for(let i=0;i<50;i++){const tw=.3+.7*Math.abs(Math.sin(now/700+i*1.3));c.globalAlpha=tw*.8;c.fillStyle=i%4?'#c89aff':'#ff9ab0';c.fillRect((i*89)%480,(i*41)%110,1,1)}c.globalAlpha=1;
 pcirc(310,44,22,'#ff5d8f',.18,c);pcirc(310,44,11,'#ffd0dc',.9,c);pcirc(314,40,9,'#2a0e24',1,c);
 for(let L=0;L<3;L++){const off=(now/(120-L*30))%540;c.fillStyle=['#1a0a18','#240e22','#30122a'][L];for(let i=-1;i<11;i++){const x=((i*56+L*23)-off*(L+1)*.12)%560-40,h=30+((i*29+L*17)%36)+L*8;for(let yy=0;yy<h;yy+=2){const w=Math.max(2,18-yy*.25+Math.sin(yy*.3+i)*3);c.fillRect(x+20-w/2,150-yy+L*5,w,2)}}}
 c.fillStyle='#2a1020';c.fillRect(0,150,480,40);c.fillStyle='#6a2a4a';c.fillRect(0,148,480,2);for(let i=0;i<30;i++){c.fillStyle=i%2?'#241020':'#2e1428';c.fillRect(i*18-((now/34)%18),158,18,32)}
 for(let i=0;i<10;i++){const ph=((now/3000)+i/10)%1;c.globalAlpha=(1-ph)*.7;c.fillStyle=i%2?'#ff5d8f':'#c89aff';c.fillRect(250+(i*37)%220+Math.sin(ph*5+i)*10,150-ph*120,2,2)}c.globalAlpha=1;
 const B=BOSSES[19],bx=430,by=150,u=2;pcirc(bx,by-30,34,'#ff2d55',.08+.05*Math.sin(now/400),c);drawMech(c,B,bx,by,now,{},u);
 const hx=352,fy=150,s3=3;c.globalAlpha=.4;c.fillStyle='#000';c.fillRect(hx-15,fy-2,30,3);c.globalAlpha=1;drawKnight(c,hx-6*s3,fy-11*s3,s3,false,null,now/430);drawPet(c,shopInv().eq.pt||0,hx-30,fy-58+Math.sin(now/300)*3,now,1.5)}
/*SHOP_END*/
/*QUAL_BEGIN*/
