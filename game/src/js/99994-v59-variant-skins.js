/* ================= v59 변이 스킨: 기존 캐릭터 10명 · 펫 10마리의 변이종 =================
   새 인물이 아니라 원래 캐릭터·펫을 그대로 그린 뒤 → 색을 바꾸고(변이) → 입자·빛을 덧붙인다.
   캐릭터 변이는 SKIN58 목록에 들어가 기존 스킨처럼 장착(입어보기)되고, 공격 이펙트도 변이마다 다르다(984의 __skinMotion.fx).
   펫 변이는 PET59로 따로 장착: drawPet이 내 펫을 그릴 때 변이 그림으로 바꾼다.
   색 바꾸기: 원래 그림의 각 칸을 색상·채도·밝기(HSL)로 읽어서 변이 규칙대로 바꿈. 사람 피부색은 그대로 둔다. */
(function(){try{
 if(typeof CH2DEF==='undefined'||!window.SKIN58)return;
 const HV=window.__HV||{view:'front'};
 /* ---------- 색 도구 ---------- */
 function rgb2hsl(r,g,b){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let h=0,s=0;if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;h*=60}return [h,s,l]}
 function hsl2rgb(h,s,l){h=((h%360)+360)%360;const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;let r=0,g=0,b=0;if(h<60){r=c;g=x}else if(h<120){r=x;g=c}else if(h<180){g=c;b=x}else if(h<240){g=x;b=c}else if(h<300){r=x;b=c}else{r=c;b=x}return [Math.round((r+m)*255),Math.round((g+m)*255),Math.round((b+m)*255)]}
 const isSkin=(h,s,l)=>h>=8&&h<=45&&s>=.2&&l>=.6&&l<=.96;
 const C=(v,a,b)=>v<a?a:v>b?b:v;
 /* 캔버스의 그림을 규칙(fn)대로 바꿈: fn(h,s,l,x,y,a) → [h,s,l,(a)] 또는 null(그대로) */
 function recolor(cv,fn,keepSkin){const o=cv.getContext('2d'),W=cv.width,H=cv.height,im=o.getImageData(0,0,W,H),d=im.data;
  for(let i=0;i<d.length;i+=4){const a=d[i+3];if(a<8)continue;const [h,s,l]=rgb2hsl(d[i],d[i+1],d[i+2]);if(keepSkin&&isSkin(h,s,l))continue;const p=i>>2,r=fn(h,s,l,p%W,(p/W)|0,a);if(!r)continue;const [R,G,B]=hsl2rgb(r[0],C(r[1],0,1),C(r[2],0,1));d[i]=R;d[i+1]=G;d[i+2]=B;if(r[3]!=null)d[i+3]=C(r[3],0,255)}
  o.putImageData(im,0,0)}
 window.RECOLOR59=recolor;
 const hash=n=>{const x=Math.sin(n*127.1)*43758.5453;return x-Math.floor(x)};
 const RAW=(c,x,y,w,h,col,a)=>{c.globalAlpha=a;c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)))};
 const tipOf=(H,q)=>{const [px,py,pa]=H.handQ(q),[tx,ty]=H.toW(px,py),a=H.wAng(pa+.25);return {x:tx,y:ty,a,tx:tx+Math.cos(a)*H.L,ty:ty+Math.sin(a)*H.L}};
 /* 칼끝에서 터지는 입자 (공통 틀) */
 function burst(c,H,k,opt){const T=tipOf(H,opt.at||.45);if(k<opt.from||k>opt.to)return;const q=(k-opt.from)/(opt.to-opt.from);c.save();
  for(let i=0;i<(opt.n||12);i++){const a=i*TAU/(opt.n||12)+(opt.spin||0)*q,d=H.L*(.15+q*(opt.r||.9)),x=T.tx+Math.cos(a)*d,y=T.ty+Math.sin(a)*d*(opt.flat||1)+(opt.fall||0)*q*q*20;opt.dot(c,x,y,i,q,a)}c.restore();c.globalAlpha=1}
 function trail(c,H,k,cols,from,to){if(k<from||k>to)return;for(let j=1;j<=8;j++){const T=tipOf(H,Math.max(from,k-j*.022));for(let d=H.L*.35;d<=H.L;d+=1.8)RAW(c,T.x+Math.cos(T.a)*d-1,T.y+Math.sin(T.a)*d-1,2.2,2.2,cols[j%cols.length],.26*(9-j)/8)}c.globalAlpha=1}
 const star5=(c,x,y,r,col,a)=>{RAW(c,x-r,y-.5,r*2+1,1,col,a);RAW(c,x-.5,y-r,1,r*2+1,col,a);RAW(c,x-r*.5,y-r*.5,r+1,r+1,col,a*.6)};

 /* ================= 캐릭터 변이 10 ================= */
 /* map: 색 규칙, extra(Q,f,b,bl,t): 덧그림(그림 좌표), fx: 공격 이펙트, trail: 궤적 색 */
 const CV=[
  {base:0,id:'v_haru',name:'하루 · 은하 변이',en:'HARU · GALAXY',col:'#8a7aff',tier:'변이',
   desc:'밤하늘을 삼킨 하루. 옷 위로 별이 반짝이고 발밑에 별가루가 흩날려요.',tags:['남보라 은하 색','옷 위에 반짝이는 별','칼끝 별 폭발'],
   map:(h,s,l)=>[245+(l-.5)*30,Math.max(.45,s*.9),l*.92],
   extra(Q,f,b,bl,t){for(let i=0;i<7;i++){const x=7+hash(i)*14,y=18+hash(i+9)*10+b,tw=.5+.5*Math.sin(t*5+i*2);Q.px(x,y,i%2?'#ffffff':'#ffe36b',tw)}for(let i=0;i<6;i++){const q=(t*.5+i/6)%1,a=i*1.7+t;Q.px(14+Math.cos(a)*(9+q*3),31-q*4,'#c8b8ff',(1-q)*.8)}},
   trail:'#c8b8ff',fx(c,k,H){trail(c,H,k,['#c8b8ff','#ffffff','#ffe36b'],.22,.62);burst(c,H,k,{from:.4,to:.85,n:7,r:1.1,spin:1,dot:(c,x,y,i,q)=>star5(c,x,y,2.2*(1-q)+1,i%2?'#ffe36b':'#ffffff',1-q)})}},
  {base:1,id:'v_mina',name:'미나 · 벚꽃 여우불',en:'MINA · SAKURA FOXFIRE',col:'#ffb0d4',tier:'변이',
   desc:'벚꽃잎처럼 하얗게 바랜 고양이 후드. 곁에서 푸른 여우불 세 개가 맴돌아요.',tags:['벚꽃빛 하양·분홍','맴도는 푸른 여우불','칼끝 꽃잎 소용돌이'],
   map:(h,s,l)=>(h>300||h<20)&&s>.3?[338,s*.55,Math.min(.95,l*1.18)]:null,
   extra(Q,f,b,bl,t){for(let i=0;i<3;i++){const a=t*2+i*TAU/3,x=14+Math.cos(a)*11,y=16+b+Math.sin(a)*4;Q.C(x,y,1.6,'#6ad8ff',.85);Q.px(x,y-2,'#c8f4ff',.8)}for(let i=0;i<4;i++){const q=(t*.35+i/4)%1;Q.R(4+i*6+Math.sin(t*2+i)*2,q*34,1.5,1,'#ffc8e0',.8*(1-q))}},
   trail:'#ffc8e0',fx(c,k,H){trail(c,H,k,['#ffc8e0','#ffffff','#6ad8ff'],.22,.62);burst(c,H,k,{from:.4,to:.9,n:10,r:1,spin:2.5,flat:.8,dot:(c,x,y,i,q)=>{RAW(c,x,y,3,2,i%3?'#ffc8e0':'#6ad8ff',1-q);RAW(c,x+1,y-1,1,1,'#ffffff',1-q)}})}},
  {base:2,id:'v_doyun',name:'도윤 · 용암 광부',en:'DOYUN · MAGMA',col:'#ff6a2a',tier:'변이',
   desc:'용암 갱도에서 돌아온 도윤. 검게 탄 옷 틈으로 용암 빛이 맥박처럼 일렁여요.',tags:['검게 탄 옷 + 용암 균열','솟아오르는 불씨','칼끝 용암 튀김'],
   map:(h,s,l,x,y)=>{const glow=.5+.5*Math.sin(performance.now()/300+y*.6);return l>.55?[18+l*20,.95,.45+.15*glow]:[10,.5,l*.45]},
   extra(Q,f,b,bl,t){for(let i=0;i<6;i++){const q=(t*.8+i/6)%1;Q.px(6+hash(i)*16+Math.sin(t*3+i)*1.5,30-q*26,q<.5?'#ffd166':'#ff5a1f',1-q)}},
   trail:'#ff8a3a',fx(c,k,H){trail(c,H,k,['#ff8a3a','#ffd166','#ff3a1a'],.22,.62);burst(c,H,k,{from:.42,to:.95,n:12,r:.8,fall:1,dot:(c,x,y,i,q)=>RAW(c,x,y,2.5,2.5,q<.4?'#ffe36b':'#ff5a1f',1-q)})}},
  {base:3,id:'v_sera',name:'세라 · 서리 마녀',en:'SERA · FROST',col:'#8ae8ff',tier:'변이',
   desc:'별 대신 서리를 다루는 세라. 망토 끝이 얼어붙고 주위에 눈송이가 내려요.',tags:['얼음빛 하늘색','내리는 눈송이','칼끝 얼음 조각 폭발'],
   map:(h,s,l)=>[195+(h%30),Math.min(.85,s*.8+.15),Math.min(.97,l*1.12)],
   extra(Q,f,b,bl,t){for(let i=0;i<6;i++){const q=(t*.25+i/6)%1,x=3+hash(i+3)*22+Math.sin(t+i)*2;Q.px(x,q*34-4,'#ffffff',.9*(1-q*.6));if(i%2)Q.px(x+1,q*34-4,'#c8f4ff',.6)}},
   trail:'#c8f4ff',fx(c,k,H){trail(c,H,k,['#c8f4ff','#ffffff','#6ab8ff'],.22,.62);burst(c,H,k,{from:.4,to:.85,n:8,r:1,dot:(c,x,y,i,q,a)=>{for(let j=0;j<3;j++)RAW(c,x+Math.cos(a)*j*1.5,y+Math.sin(a)*j*1.5,2,2,j?'#8ae8ff':'#ffffff',1-q)}})}},
  {base:4,id:'v_steel',name:'강철 · 황금 코어',en:'STEEL · GOLD CORE',col:'#ffd166',tier:'변이',
   desc:'코어를 황금으로 갈아 끼운 강철. 몸 곳곳에서 금빛 전류가 튀어요.',tags:['번쩍이는 황금 몸체','몸에서 튀는 전류','칼끝 황금 번개'],
   map:(h,s,l)=>s<.35||(h>180&&h<260)?[44,.75,Math.min(.92,l*1.05)]:null,
   extra(Q,f,b,bl,t){if(Math.floor(t*6)%3===0){let x=8+hash(Math.floor(t*6))*12,y=18+b;for(let i=0;i<4;i++){const nx=x+(hash(i+Math.floor(t*6)*3)-.5)*4,ny=y+2;Q.L(x,y,nx,ny,'#fff6a0');x=nx;y=ny}}Q.C(14,23.5+b,3.6,'#ffd166',.2+.15*Math.sin(t*8))},
   trail:'#ffe36b',fx(c,k,H){trail(c,H,k,['#ffe36b','#ffffff','#ffb020'],.22,.62);if(k>.42&&k<.8){const T=tipOf(H,.45);c.save();for(let r=0;r<3;r++){let x=T.tx,y=T.ty;for(let i=0;i<5;i++){const nx=x+(Math.random()-.5)*10,ny=y+(Math.random()-.5)*10;c.strokeStyle=r?'#ffe36b':'#ffffff';c.globalAlpha=.9;c.lineWidth=1;c.beginPath();c.moveTo(x,y);c.lineTo(nx,ny);c.stroke();x=nx;y=ny}}c.restore();c.globalAlpha=1}}},
  {base:5,id:'v_luna',name:'루나 · 일식 기사',en:'LUNA · ECLIPSE',col:'#ff4d6d',tier:'변이',
   desc:'달이 가려진 밤의 루나. 검은 갑옷에 붉은 빛, 머리 뒤에 일식 고리가 떠 있어요.',tags:['검은 갑옷 + 진홍 빛','머리 뒤 일식 고리','칼끝 진홍 초승달'],
   map:(h,s,l)=>s>.35&&(h>180&&h<260)?[352,.85,l*.8]:[240,.15,l*.38],
   extra(Q,f,b,bl,t){if(HV.view!=='back'){const o=Q.o;o.save();o.globalAlpha=.85;o.strokeStyle='#ff4d6d';o.beginPath();o.arc(20,4+b+10,8.5,0,TAU);o.stroke();o.globalAlpha=.35;o.beginPath();o.arc(20,14+b,10,0,TAU);o.stroke();o.restore()}},
   trail:'#ff4d6d',fx(c,k,H){trail(c,H,k,['#ff4d6d','#1a0a10','#ff8a9a'],.22,.62);if(k>.42&&k<.88){const T=tipOf(H,.45),q=(k-.42)/.46,r=H.L*(.4+q*.7);c.save();c.globalAlpha=.85*(1-q);c.fillStyle='#ff4d6d';c.beginPath();c.arc(T.tx,T.ty,r,0,TAU);c.arc(T.tx+r*.35,T.ty-r*.15,r*.9,0,TAU,true);c.fill();c.restore();c.globalAlpha=1}}},
  {base:6,id:'v_kai',name:'카이 · 그림자 혼',en:'KAI · PHANTOM',col:'#5affd8',tier:'변이',
   desc:'반쯤 사라진 그림자 닌자. 몸이 비치고 지나간 자리에 잔상이 남아요.',tags:['비치는 청록 유령빛','움직일 때 잔상','그림자 분신 베기'],
   map:(h,s,l,x,y,a)=>[170,.6,Math.min(.9,l*1.3+.1),a*(.55+.25*Math.sin(performance.now()/180+y*.5))],
   extra(Q,f,b,bl,t){for(let i=0;i<5;i++){const q=(t*.6+i/5)%1;Q.px(6+hash(i+5)*16,26-q*20,'#5affd8',(1-q)*.7)}},
   trail:'#5affd8',fx(c,k,H){if(k>.2&&k<.7){for(let j=1;j<=3;j++){const T=tipOf(H,Math.max(.2,k-j*.06));c.save();c.globalAlpha=.4/j;c.strokeStyle='#5affd8';c.lineWidth=2;c.beginPath();c.moveTo(T.x+j*4,T.y);c.lineTo(T.tx+j*4,T.ty);c.stroke();c.restore()}}trail(c,H,k,['#5affd8','#0a2a2a'],.22,.62)}},
  {base:7,id:'v_arin',name:'아린 · 독버섯 요정',en:'ARIN · TOXIC',col:'#c86aff',tier:'변이',
   desc:'버섯 숲의 아린. 보랏빛 몸에 형광 연두 포자가 둥실둥실 떠다녀요.',tags:['보라 + 형광 연두','떠다니는 포자','칼끝 포자 구름'],
   map:(h,s,l)=>h>80&&h<170?[285,Math.max(.5,s),l*.9]:(h>300||h<20)&&s>.3?[95,.9,.6]:null,
   extra(Q,f,b,bl,t){for(let i=0;i<6;i++){const q=(t*.3+i/6)%1,x=3+hash(i+2)*22+Math.sin(t*1.5+i)*2;Q.C(x,30-q*28,.9,'#b6ff4a',Math.sin(q*Math.PI)*.85)}},
   trail:'#b6ff4a',fx(c,k,H){trail(c,H,k,['#b6ff4a','#c86aff'],.22,.62);burst(c,H,k,{from:.4,to:.95,n:9,r:.7,flat:.7,dot:(c,x,y,i,q)=>{c.globalAlpha=.55*(1-q);c.fillStyle=i%2?'#b6ff4a':'#c86aff';c.beginPath();c.arc(x,y,2+q*4,0,TAU);c.fill()}})}},
  {base:8,id:'v_zeno',name:'제노 · 청염 용기사',en:'ZENO · AZURE FLAME',col:'#4ab0ff',tier:'변이',
   desc:'푸른 불꽃을 삼킨 용기사. 투구 틈에서 청색 불씨가 피어올라요.',tags:['푸른 용 갑옷','피어오르는 청염','칼끝 푸른 불기둥'],
   map:(h,s,l)=>(h<30||h>330)&&s>.3?[214,s,l]:null,
   extra(Q,f,b,bl,t){for(let i=0;i<5;i++){const q=(t*1.2+i/5)%1;Q.px(9+hash(i)*10+Math.sin(q*9+i)*2,17+b-q*12,q<.5?'#c8f0ff':'#4ab0ff',1-q)}},
   trail:'#8ad8ff',fx(c,k,H){trail(c,H,k,['#8ad8ff','#ffffff','#2a6aff'],.22,.62);burst(c,H,k,{from:.42,to:.95,n:10,r:.5,fall:-1,dot:(c,x,y,i,q)=>RAW(c,x,y-q*14,2.5,3,q<.4?'#ffffff':'#4ab0ff',1-q)})}},
  {base:9,id:'v_aurora',name:'오로라 · 무지개 성기사',en:'AURORA · PRISM',col:'#ff9af0',tier:'변이',
   desc:'빛이 갈라지는 갑옷. 몸 위로 무지개 색이 천천히 흘러가요.',tags:['흐르는 무지개 갑옷','반짝이는 빛 고리','칼끝 무지개 광선'],
   map:(h,s,l,x,y)=>s<.4&&l>.55?[(performance.now()/12+y*9+x*4)%360,.55,Math.min(.9,l*.95)]:null,
   extra(Q,f,b,bl,t){for(let i=0;i<4;i++){const a=t*1.5+i*TAU/4;Q.px(14+Math.cos(a)*12,18+b+Math.sin(a)*4,'#ffffff',.8)}},
   trail:'rainbow',fx(c,k,H){const cols=['#ff3ad6','#ffe14d','#5affb0','#29f0ff','#b05cff'];trail(c,H,k,cols,.22,.62);if(k>.42&&k<.8){const T=tipOf(H,.45),q=(k-.42)/.38;for(let i=0;i<5;i++)RAW(c,T.tx-1,T.ty-2-i*3-q*20,3,3,cols[i],1-q)}}}];
 CV.forEach((v,i)=>{const B=CH2DEF[v.base];if(!B)return;const idx=110+i;
  CH2DEF[idx]={__v44:1,skin:v.id,paint(Q,f,b,bl,t){B.paint.call(B,Q,f,b,bl,t);try{recolor(Q.o.canvas,v.map,true)}catch(e){}try{v.extra&&v.extra(Q,f,b,bl,t)}catch(e){}}};
  SKIN58.list.push({id:v.id,name:v.name,en:v.en,price:1500,tier:'변이',tc:'#a6f5c6',col:v.col,idx,base:v.base,map:v.map,desc:v.desc,tags:v.tags,trail:v.trail,motion:{fx:v.fx},variant:true})});

 /* ================= 펫 변이 10 ================= */
 const PV=[
  {base:0,id:'p_tick',name:'똑딱 · 황금 시계',col:'#ffd166',desc:'금으로 다시 태어난 똑딱. 째깍일 때마다 금빛 불씨가 튀어요.',map:(h,s,l)=>[44,.85,Math.min(.92,l*1.08)],fx:'spark',fc:['#ffe36b','#ffffff']},
  {base:1,id:'p_firefly',name:'반딧불 · 오로라',col:'#6affc8',desc:'오로라 빛을 품은 반딧불. 날개빛이 초록·하늘·보라로 바뀌어요.',map:(h,s,l)=>[(performance.now()/15)%360,.8,l],fx:'glow',fc:['#6affc8','#8ad8ff','#c88aff']},
  {base:2,id:'p_mouse',name:'태엽 쥐 · 네온',col:'#ff3ad6',desc:'네온 회로로 개조한 태엽 쥐. 박자에 맞춰 몸이 번쩍여요.',map:(h,s,l,x,y)=>l>.6?[y%2?320:185,.95,.6+.15*Math.sin(performance.now()/120)]:[240,.4,l*.5],fx:'notes',fc:['#ff3ad6','#29f0ff']},
  {base:3,id:'p_sheep',name:'구름 양 · 번개 먹구름',col:'#a0a8ff',desc:'먹구름이 된 양. 털 사이에서 작은 번개가 번쩍여요.',map:(h,s,l)=>[235,.2,l*.55],fx:'bolt',fc:['#fff6a0','#a0a8ff']},
  {base:4,id:'p_owl',name:'부엉이 봇 · 은하',col:'#8a7aff',desc:'우주를 관측하던 부엉이 봇. 몸에 별이 떠 있어요.',map:(h,s,l)=>[250,.55,l*.9],fx:'stars',fc:['#ffffff','#ffe36b']},
  {base:5,id:'p_fox',name:'불꽃 여우 · 청염 구미호',col:'#4ab0ff',desc:'꼬리마다 푸른 불을 단 구미호. 여우불이 꼬리를 따라와요.',map:(h,s,l)=>(h<60||h>330)&&s>.3?[212,s,l]:null,fx:'flame',fc:['#c8f0ff','#4ab0ff']},
  {base:6,id:'p_penguin',name:'얼음 펭귄 · 벚꽃',col:'#ffb0d4',desc:'봄을 맞은 펭귄. 하늘색 몸이 벚꽃빛으로 물들었어요.',map:(h,s,l)=>h>170&&h<260&&l>.5?[335,.65,Math.min(.92,l*1.05)]:h>170&&h<260?[300,.25,l*.9]:null,fx:'petal',fc:['#ffc8e0','#ffffff']},
  {base:7,id:'p_dragon',name:'수정 드래곤 · 흑요석',col:'#ff6a2a',desc:'흑요석 비늘 사이로 용암이 흐르는 드래곤.',map:(h,s,l)=>l>.78?[24,1,.58]:l>.55?[270,.2,.22]:[265,.25,l*.35],fx:'ember',fc:['#ffd166','#ff5a1f']},
  {base:8,id:'p_cat',name:'유령 고양이 · 도깨비불',col:'#7dff9a',desc:'초록 도깨비불을 거느린 유령 고양이. 몸이 반쯤 비쳐요.',map:(h,s,l,x,y,a)=>[130,.7,Math.min(.9,l*1.1),a*.7],fx:'wisp',fc:['#7dff9a','#d8ffe0']},
  {base:9,id:'p_phoenix',name:'황금 불사조 · 얼음 불사조',col:'#8ae8ff',desc:'불꽃 대신 얼음으로 타오르는 불사조. 날갯짓마다 눈꽃이 흩어져요.',map:(h,s,l)=>[195,Math.max(.5,s*.8),Math.min(.95,l*1.1)],fx:'snow',fc:['#ffffff','#8ae8ff']}];
 let petCur=null;const off=document.createElement('canvas');
 const PET59=window.PET59={list:PV.map(v=>Object.assign({price:1000,tier:'변이',cat:'pet'},v)),get:()=>petCur,byId:id=>PV.find(v=>v.id===id),
  equip(id){petCur=id&&PV.find(v=>v.id===id)?id:null}};
 function petParticles(c,v,x,y,now,k){const t=now/1000,[a,b]=v.fc;c.save();
  for(let i=0;i<6;i++){const q=(t*.7+i/6)%1,ang=i*1.05+t,px=x+Math.cos(ang)*(8+q*4)*k,py=y+(4-q*14)*k;
   if(v.fx==='bolt'){if(Math.floor(t*8+i)%5===0)RAW(c,x+(hash(i+Math.floor(t*8))-.5)*14*k,y-(4+hash(i)*6)*k,1.2*k,3*k,a,.9)}
   else if(v.fx==='notes'){RAW(c,px,py,1*k,3*k,i%2?a:b,1-q);RAW(c,px-1.2*k,py+2.2*k,1.6*k,1.2*k,i%2?a:b,1-q)}
   else if(v.fx==='stars'){const tw=.5+.5*Math.sin(t*6+i);RAW(c,x+(hash(i)-.5)*18*k,y+(hash(i+7)-.8)*14*k,1*k,1*k,i%2?a:b,tw)}
   else if(v.fx==='petal'){RAW(c,x+(hash(i)-.5)*20*k+Math.sin(t*2+i)*3*k,y-12*k+q*22*k,2*k,1.2*k,i%2?a:b,1-q)}
   else if(v.fx==='snow'){RAW(c,x+(hash(i+2)-.5)*22*k,y-10*k+q*20*k,1.2*k,1.2*k,i%2?a:b,1-q)}
   else if(v.fx==='wisp'){const wa=t*2.4+i*TAU/3;if(i<3){pcirc(x+Math.cos(wa)*11*k,y-4*k+Math.sin(wa)*4*k,1.6*k,a,.75,c)}}
   else RAW(c,px,py,1.4*k,1.4*k,i%2?a:b,(1-q)*.85)}
  c.restore();c.globalAlpha=1}
 /* 펫 하나를 변이로 그림 (오프스크린에 원래 펫 → 색 바꾸기 → 화면에) */
 function drawPetVariant(base,c,v,x,y,now,k){k=k||1;const S=Math.ceil(44*k);if(off.width!==S){off.width=S;off.height=S}const o=off.getContext('2d');o.setTransform(1,0,0,1,0,0);o.clearRect(0,0,S,S);o.imageSmoothingEnabled=false;
  base.call(this,o,v.base,S/2,S/2,now,k);try{recolor(off,v.map,false)}catch(e){}const sm=c.imageSmoothingEnabled;c.imageSmoothingEnabled=false;c.drawImage(off,Math.round(x-S/2),Math.round(y-S/2));c.imageSmoothingEnabled=sm;try{petParticles(c,v,x,y,now,k)}catch(e){}}
 PET59.draw=(c,id,x,y,now,k)=>{const v=PET59.byId(id);if(v)drawPetVariant(baseDraw,c,v,x,y,now,k)};
 let baseDraw=drawPet;
 {const base=drawPet;baseDraw=base;drawPet=function(c,id,x,y,now,k){try{const sm=document.getElementById('shopModal');if(petCur&&!(sm&&!sm.hidden)&&id===((shopInv().eq||{}).pt||0)){const v=PET59.byId(petCur);if(v&&v.base===id)return drawPetVariant(base,c,v,x,y,now,k)}}catch(e){}return base.apply(this,arguments)}}
}catch(e){console.error('v59 variants',e)}})();
