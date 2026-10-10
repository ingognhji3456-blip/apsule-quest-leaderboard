/* ================= v127 비밀의 방 · 열쇠지기 클라비스 (SEC127) =================
   ① 광장 왼쪽 나무 뒤에 녹슨 열쇠가 숨어 있다(가끔 반짝). 가까이 가면 줍는다.
   ② 탑 10F 보스전에서 열쇠를 가진 채 K(폰은 「🗝 열쇠」 단추) → 보스가 꺼지는 연출과 함께 전투가 멈추고
      보스방 위쪽 벽이 갈라진다 → 직접 걸어 틈으로 들어가 이어진 복도를 쭉 올라가면 → 열쇠지기의 방
   ③ 방의 주인 「클라비스」와 1:1 결투(v128: 내 캐릭터와 같은 크기 · 탄막 없이 칼싸움 · 대시 · 회피 · 패링)를 이기면
      신화 캐릭터 클라비스가 상점(태엽 공방 · 캐릭터)에 나타난다. 얻기만 하고, 쓰려면 🪙로 사야 한다.
   기록: saveData.sec127 = {key:1(주움), beat:처음 이긴 시각}
   모드: mode='sec127'(꺼짐 · 문 · 복도 · 방 연출을 이 파일이 직접 그림) */
(()=>{try{
 const $=id=>document.getElementById(id),E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const sfx=k=>{try{gmSfx(k)}catch(e){}},save=()=>{try{saveNow()}catch(e){}},TAU=Math.PI*2;
 const SV=()=>saveData.sec127||(saveData.sec127={key:0,beat:0});
 const pop=(ic,t,s)=>{try{if(window.EGG126&&EGG126.pop)return EGG126.pop(ic,t,s)}catch(e){}try{banner(t)}catch(e){}};

 /* ---------- 신화 캐릭터 클라비스 ---------- */
 const NG=window.NG82;const IDX=CHARS.length;
 /* 비밀 캐릭터다운 모습: 왕관 · 은빛 긴 머리 · 보랏빛 열쇠지기 코트 · 반투명 날개 · 금 열쇠구멍 문장 · 몸을 도는 황금 열쇠들 */
 const KEYPX=[[0,1],[1,0],[1,2],[2,1],[3,1],[4,1],[4,2],[5,1],[5,2]];
 const S={skin:'#ecdff2',hair:'#f2f0ff',hairStyle:'long',hat:'crown',top:'#22143e',style:'coat',robe:'#2a1848',acc:'#ffd84a',cape:'#140a28',scarf:'#7a5ad0',emblem:'#ffd84a',wings:'#9a7ae8',belt:'#c9a24a',sleeve:'#3a2460',pants:'#160c2a',boot:'#0c0818',eye:'#ffe36b',
  fx:(Q,b,t,v)=>{try{const back=v==='back',side=v==='side';
   /* 은은한 보랏빛 기운 */for(let i=0;i<6;i++){const y=30+b-((t*14+i*6)%28),x=6+((i*7)%16);Q.px(Math.round(x+Math.sin(t*2+i)*1.5),Math.round(y),i%2?'#c9a8ff':'#8a6ad8',.35*(1-((t*14+i*6)%28)/28))}
   /* 가슴의 열쇠구멍 문장 */if(!back&&!side){const g=.6+.4*Math.sin(t*3);Q.px(14,20+b,'#ffd84a',1);Q.px(13,20+b,'#c9a24a',1);Q.px(15,20+b,'#c9a24a',1);Q.px(14,21+b,'#2a1008',1);Q.px(14,22+b,'#2a1008',1);Q.px(14,19+b,'#fff6c8',g)}
   /* 머리 옆에 떠 있는 황금 열쇠 하나 */if(!back){const fy=Math.round(8+b+Math.sin(t*2.2)*1.5),fx=side?2:22;for(const [dx,dy] of KEYPX)Q.px(fx+dx,fy+dy,dx<3?'#ffd84a':'#e8b830',.95);Q.px(fx+1,fy+1,'#2a1008',1);Q.px(fx+2,fy-1,'#fff6c8',.5+.5*Math.sin(t*4))}
   /* 왕관 위 별빛 */Q.px(14,0+b,'#fff6c8',.5+.5*Math.sin(t*6));Q.px(10,1+b,'#c9a8ff',.4+.4*Math.sin(t*5+1));Q.px(18,1+b,'#c9a8ff',.4+.4*Math.sin(t*5+2))}catch(e){}}};
 CHARS.push({name:'클라비스',sub:'비밀의 열쇠지기',price:30000,hp:236,dash:12,abl:{blink:1,counter:1},critAdd:.06,grade:'myth',myth:1,v100:1,sec127:1,scarf:null,hero:false,
  desc:'탑 10층 벽 너머 비밀의 방을 지키던 열쇠지기. 순간이동으로 피하고, 막는 순간 되받아친다.'});
 if(NG&&NG.paintChar)CH2DEF[IDX]={__v44:1,paint:NG.paintChar(S)};

 /* 상점: 쓰러뜨리기 전에는 진열대에 없음 */
 const hideCard=()=>{try{if(SV().clear)return;/* v129: 던전 20층을 깨야 상점에 나타남 */const cv=document.querySelector('#shopGrid canvas[data-k="ch"][data-i="'+IDX+'"]');if(!cv)return;let el=cv;while(el.parentElement&&el.parentElement.id!=='shopGrid')el=el.parentElement;if(el.style.display!=='none')el.style.display='none'}catch(e){}};
 {const f=renderShop;renderShop=function(){const r=f.apply(this,arguments);hideCard();return r}}
 setInterval(hideCard,700);

 /* 비밀 도감에 두 줄 */
 try{if(window.EGG126&&EGG126.EG){EGG126.EG.push({id:'key',ic:'🗝',n:'녹슨 열쇠',hint:'광장 가장자리, 나무 그늘에서 무언가 반짝여요.',how:'광장 왼쪽 나무 뒤에서 열쇠 줍기',dia:5},
   {id:'sec',ic:'🚪',n:'열쇠지기의 방',hint:'열쇠는 어딘가의 10층에서 쓰는 것 같아요…',how:'탑 10F 보스전에서 열쇠를 가진 채 K(폰은 🗝 단추) → 비밀 복도 → 클라비스와 결투에서 이기기(코어를 받음)',dia:50})}}catch(e){}
 const found=id=>{try{return window.EGG126&&EGG126.found(id)}catch(e){return false}};

 /* ---------- ① 광장의 열쇠 ---------- */
 const KEYP={x:84,y:404};
 function drawKey(c,x,y,t){const g=.5+.5*Math.sin(t*2.2);c.save();c.fillStyle='#000';c.globalAlpha=.35;c.fillRect(x-4,y+2,9,2);c.globalAlpha=1;
  const P1='#b8862a',P2='#e8c060';c.fillStyle=P1;c.fillRect(x-4,y-3,4,4);c.fillStyle='#2a1a08';c.fillRect(x-3,y-2,2,2);c.fillStyle=P2;c.fillRect(x,y-2,5,1);c.fillRect(x+3,y-1,1,2);c.fillRect(x+5,y-1,1,1);
  const sp=(t*.5)%3;if(sp<.5){const k=Math.sin(sp/.5*Math.PI);c.globalAlpha=k;c.fillStyle='#fff8d0';c.fillRect(x+1,y-6,1,7);c.fillRect(x-2,y-3,7,1);c.globalAlpha=k*.4;c.fillRect(x-1,y-5,5,5)}c.restore()}
 if(window.PLZART&&PLZART.objs){const f=PLZART.objs;PLZART.objs=function(now){const L=f.apply(this,arguments)||[];try{if(!SV().key)L.push({y:KEYP.y,fn:()=>drawKey(ctx,KEYP.x,KEYP.y,now/1000)})}catch(e){}return L}}
 setInterval(()=>{try{if(mode!=='plaza'||SV().key)return;if(Math.hypot(P.x-KEYP.x,(P.y-KEYP.y)*1.4)<20){SV().key=1;save();sfx('ok');found('key');pop('🗝','녹슨 열쇠를 주웠어요','어딘가의 10층에서 쓸 수 있을 것 같아요… (K)')}}catch(e){}},120);

 /* ---------- ② 10F 보스전에서 열쇠 ---------- */
 const can=()=>{try{return SV().key&&!SQ&&mode==='boss'&&G&&G.tw71&&G.tw71.f===10&&G.state==='play'&&!G.cine&&!paused&&!(window.DUO85&&T71duo())}catch(e){return false}};
 const T71duo=()=>{try{return TW71.T&&TW71.T.duo}catch(e){return false}};
 let kT=0;addEventListener('keydown',e=>{if(e.code==='KeyK'){kT=performance.now();if(can()){e.preventDefault();e.stopImmediatePropagation();useKey()}}},true);
 {const f=doDash;doDash=function(){let kd=false;try{kd=K.has('KeyK')}catch(e){}if((kd||performance.now()-kT<60)&&can()){useKey();return}return f.apply(this,arguments)}}
 const kb=document.createElement('button');kb.id='key127';kb.hidden=true;kb.textContent='🗝 열쇠';document.body.appendChild(kb);
 kb.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();if(can())useKey()});
 setInterval(()=>{const on=can()&&(matchMedia('(pointer:coarse)').matches||document.documentElement.classList.contains('ph'));if(kb.hidden===on)kb.hidden=!on},250);

 let SQ=null;
 function useKey(){const now=performance.now();SQ={ph:'off',t0:now,frz:now,hx:P.x,hy:P.y,bx:(G.boss&&G.boss.x)||W/2,by:((G.boss&&G.boss.y)||AY+AH*.6)-58/* G.boss는 발밑 */,parts:[],cy:0,py:0,px:0,walkT:0};
  lastT=now;try{mus.on=false}catch(e){}try{G.tw71.done=1}catch(e){}mode='sec127';kb.hidden=true;try{sfx('no');perc&&perc('crash',audio.currentTime)}catch(e){}}

 /* ---------- 그리기 도우미 ---------- */
 function hero(x,y,fl,walk,t){const om=mode;mode='village';try{drawSword(x-12,y-19,2,fl,performance.now());drawKnight(ctx,x-12,y-19,2,fl,walk?t*10:null,walk?null:t*2.3)}catch(e){}finally{mode=om}}
 function txt(s,x,y,sz,col,al){ctx.save();ctx.globalAlpha=al==null?1:al;ctx.font='900 '+sz+'px sans-serif';ctx.textAlign='center';ctx.fillStyle='#000';ctx.fillText(s,x+1,y+1);ctx.fillStyle=col;ctx.fillText(s,x,y);ctx.restore()}
 /* ---------- v128: 하나로 이어진 공간 — 보스방 위쪽 벽이 갈라지고, 그 틈으로 복도가 위로 이어진다 ---------- */
 const CX=W/2-128,HW=34,WT=AY-40,WB=AY+8,CL=760,TOPY=WT-CL;/* 벽 띠(WT~WB), 복도는 WT 위로 CL만큼 */
 const R0=(n)=>{let s=n*9301+49297;return()=>{s=(s*9301+49297)%233280;return s/233280}};
 function brickC(c,x0,y0,w,h,c1,c2,seed){const r=R0(seed||1);c.fillStyle=c1;c.fillRect(x0,y0,w,h);for(let y=y0;y<y0+h;y+=8){const off=((y-y0)/8)%2?7:0;for(let x=x0-off;x<x0+w;x+=14){const sh=r();c.fillStyle=sh<.33?c2:sh<.66?c1:'#00000018';c.fillRect(Math.max(x0,x+1),y+1,Math.min(12,x0+w-x-1),6)}c.fillStyle='#00000040';c.fillRect(x0,y,w,1)}}
 const brick=(...a)=>brickC(ctx,...a);
 function torch(x,y,now){const fl=Math.sin(now/90+x)*1.2+Math.sin(now/37+y)*.6;const g=ctx.createRadialGradient(x,y,1,x,y,58);g.addColorStop(0,'rgba(255,180,80,.32)');g.addColorStop(1,'rgba(255,180,80,0)');ctx.fillStyle=g;ctx.fillRect(x-58,y-58,116,116);
  ctx.fillStyle='#3a2a1a';ctx.fillRect(x-1,y+2,3,8);ctx.fillStyle='#6a5236';ctx.fillRect(x-3,y+1,7,2);ctx.fillStyle='#ff8a2a';ctx.fillRect(x-2,y-5+fl*.4,5,6);ctx.fillStyle='#ffd06a';ctx.fillRect(x-1,y-4+fl*.4,3,4);ctx.fillStyle='#fff6d0';ctx.fillRect(x,y-2+fl*.4,1,2)}
 function crackPts(){const r=R0(7),L=[],R=[];for(let y=WB;y>=WT;y-=4){const j=(r()-.5)*7;L.push([CX-HW+j,y]);R.push([CX+HW+(r()-.5)*7,y])}return {L,R}}
 const CK=crackPts();
 function wall(now,open){/* 보스방 위쪽 벽 */brick(0,WT,W,WB-WT,'#3a3448','#443e56',3);ctx.fillStyle='#5a5470';ctx.fillRect(0,WB-3,W,3);ctx.fillStyle='#00000055';ctx.fillRect(0,WB,W,4);
  for(const x of [AX+24,AX+190,AX+AW-70])torch(x,WT+18,now);
  for(const x of [AX+240,AX+AW-140]){ctx.fillStyle='#2a1a4a';ctx.fillRect(x-8,WT+6,16,26);ctx.fillStyle='#ffd84a';ctx.fillRect(x-2,WT+12,4,4);ctx.fillRect(x-1,WT+16,2,8);ctx.fillRect(x-1,WT+21,4,2);ctx.fillStyle='#2a1a4a';ctx.beginPath();ctx.moveTo(x-8,WT+32);ctx.lineTo(x,WT+27);ctx.lineTo(x+8,WT+32);ctx.fill()}
  if(open>=1){/* 갈라진 틈: 복도 바닥이 이어져 보임 */ctx.fillStyle='#1c1828';ctx.beginPath();ctx.moveTo(CK.L[0][0],CK.L[0][1]);for(const q of CK.L)ctx.lineTo(q[0],q[1]);for(let i=CK.R.length-1;i>=0;i--)ctx.lineTo(CK.R[i][0],CK.R[i][1]);ctx.closePath();ctx.fill();
   ctx.strokeStyle='#0a0810';ctx.lineWidth=2;for(const side of [CK.L,CK.R]){ctx.beginPath();side.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.stroke()}
   /* 무너진 돌무더기 */const r=R0(11);for(let i=0;i<14;i++){const sx=(i%2?CX+HW+2:CX-HW-14)+r()*12,sy=WB-2+r()*10;ctx.fillStyle=r()<.5?'#4a4460':'#383248';ctx.fillRect(sx,sy,3+r()*5,2+r()*4)}}
  else if(open>0){/* 금이 번져 나감 */const r=R0(5);ctx.strokeStyle='#120c1a';ctx.lineWidth=1.5;const n=Math.floor(open*26);for(let k=0;k<3;k++){ctx.beginPath();let x=CX+(k-1)*10,y=WB;ctx.moveTo(x,y);for(let i=0;i<n;i++){x+=(r()-.5)*12;y-=2+r()*2.5;if(y<WT)break;ctx.lineTo(x,y)}ctx.stroke()}
   ctx.strokeStyle='rgba(201,168,255,'+(.5*open)+')';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(CX,WB);ctx.lineTo(CX+(R0(9)()-.5)*8,WT+(1-open)*40);ctx.stroke()}}
 function corridor(now,cam){const y0=Math.max(TOPY-40,cam-20),y1=Math.min(WT,cam+H+20);if(y1<=y0)return;
  /* 바깥 어둠 */ctx.fillStyle='#05040a';ctx.fillRect(0,y0,W,y1-y0);
  /* 옆 벽 */brick(CX-HW-46,y0,46,y1-y0,'#2e2840','#38324c',21);brick(CX+HW,y0,46,y1-y0,'#2e2840','#38324c',22);ctx.fillStyle='#00000066';ctx.fillRect(CX-HW-4,y0,4,y1-y0);ctx.fillRect(CX+HW,y0,4,y1-y0);
  /* 바닥 타일 */for(let y=Math.floor(y0/14)*14;y<y1;y+=14)for(let x=CX-HW;x<CX+HW;x+=14){ctx.fillStyle=((x+y)/14)%2?'#1e1a2c':'#221d32';ctx.fillRect(x,y,14,14);ctx.fillStyle='#2c2640';ctx.fillRect(x,y,14,1)}
  /* 가운데 융단(금 테두리) */ctx.fillStyle='#3a1a5a';ctx.fillRect(CX-12,y0,24,y1-y0);ctx.fillStyle='#c9a24a';ctx.fillRect(CX-12,y0,2,y1-y0);ctx.fillRect(CX+10,y0,2,y1-y0);for(let y=Math.floor(y0/24)*24;y<y1;y+=24){ctx.fillStyle='#5a2a7a';ctx.fillRect(CX-3,y+8,6,6);ctx.fillStyle='#c9a24a';ctx.fillRect(CX-1,y+10,2,2)}
  for(let k=0;k*120+60<CL;k++){const y=WT-60-k*120;if(y<y0-60||y>y1+60)continue;
   /* 기둥 */for(const s of [-1,1]){const px=s<0?CX-HW-8:CX+HW;ctx.fillStyle='#4a4462';ctx.fillRect(px,y-10,8,26);ctx.fillStyle='#5e5878';ctx.fillRect(px,y-10,8,3);ctx.fillStyle='#00000040';ctx.fillRect(px+(s<0?6:0),y-7,2,23)}
   torch(CX-HW-4,y-4,now);torch(CX+HW+4,y-4,now);
   /* 바닥 룬 */if(k%2===0){const pul=.35+.25*Math.sin(now/400+k);ctx.save();ctx.translate(CX,y+40);ctx.scale(1,.45);ctx.strokeStyle='rgba(201,168,255,'+pul+')';ctx.lineWidth=1;ctx.beginPath();ctx.arc(0,0,14,0,TAU);ctx.stroke();ctx.rotate(now/2500+k);for(let i=0;i<6;i++){ctx.rotate(TAU/6);ctx.fillStyle='rgba(255,216,74,'+pul+')';ctx.fillRect(9,-1,3,2)}ctx.restore()}
   /* 벽감의 기사 석상 · 깃발 번갈아 */const s=k%2?-1:1,bx=s<0?CX-HW-36:CX+HW+12;if(k%3===1){ctx.fillStyle='#14101e';ctx.fillRect(bx,y+18,24,34);ctx.fillStyle='#6e6a80';ctx.fillRect(bx+8,y+22,8,8);ctx.fillRect(bx+6,y+30,12,14);ctx.fillRect(bx+7,y+44,4,6);ctx.fillRect(bx+13,y+44,4,6);ctx.fillStyle='#8e8aa0';ctx.fillRect(bx+19,y+24,2,22);ctx.fillStyle='#55516a';ctx.fillRect(bx+9,y+24,6,2)}
   else{ctx.fillStyle='#3a1a6a';ctx.fillRect(bx+3,y+20,18,30);ctx.fillStyle='#ffd84a';ctx.fillRect(bx+9,y+27,6,3);ctx.fillRect(bx+11,y+30,2,9);ctx.fillRect(bx+11,y+36,4,2);ctx.fillStyle='#3a1a6a';ctx.beginPath();ctx.moveTo(bx+3,y+50);ctx.lineTo(bx+12,y+44);ctx.lineTo(bx+21,y+50);ctx.fill();ctx.fillStyle='#c9a24a';ctx.fillRect(bx+2,y+19,20,2)}
   /* 늘어진 사슬 · 거미줄 · 바닥 금 · 뼈 */if(k%2){ctx.fillStyle='#6a6680';for(let i=0;i<7;i++)ctx.fillRect(CX+HW-6+(i%2),y-20+i*3,2,2)}if(k%4===2){ctx.strokeStyle='rgba(220,220,240,.25)';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(CX-HW,y-14);ctx.lineTo(CX-HW+12,y-14);ctx.moveTo(CX-HW,y-14);ctx.lineTo(CX-HW,y-2);ctx.moveTo(CX-HW,y-8);ctx.quadraticCurveTo(CX-HW+5,y-9,CX-HW+7,y-14);ctx.stroke()}
   if(k%3===2){ctx.strokeStyle='#120e1a';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(CX-HW+6,y+60);ctx.lineTo(CX-HW+12,y+66);ctx.lineTo(CX-HW+10,y+74);ctx.stroke();ctx.fillStyle='#d8d0c0';ctx.fillRect(CX+HW-14,y+70,6,2);ctx.fillRect(CX+HW-15,y+69,2,4);ctx.fillRect(CX+HW-9,y+69,2,4)}
   if(k%4===3){/* 물웅덩이 + 물방울 */const q=((now/1100)+k)%1;ctx.fillStyle='rgba(120,150,220,.18)';ctx.beginPath();ctx.ellipse(CX+18,y+30,9,3,0,0,TAU);ctx.fill();ctx.strokeStyle='rgba(180,200,255,'+(.5*(1-q))+')';ctx.beginPath();ctx.ellipse(CX+18,y+30,2+q*8,1+q*2.5,0,0,TAU);ctx.stroke();ctx.fillStyle='rgba(180,200,255,.7)';ctx.fillRect(CX+18,y+30-26*(1-((now/1100+k)%1))-2,1,2)}}
  /* 꼭대기: 열쇠지기의 방 문 */const dy=TOPY;brick(CX-HW-46,dy-40,HW*2+92,40,'#2e2840','#38324c',31);ctx.fillStyle='#4a3a6a';ctx.fillRect(CX-28,dy-34,56,40);ctx.fillStyle='#120c1e';ctx.fillRect(CX-22,dy-28,44,34);
  const pul=.5+.5*Math.sin(now/300);ctx.fillStyle='rgba(201,168,255,'+(.25+.25*pul)+')';ctx.fillRect(CX-22,dy-28,44,34);ctx.fillStyle='#ffd84a';ctx.fillRect(CX-3,dy-16,6,6);ctx.fillStyle='#2a1a08';ctx.fillRect(CX-1,dy-14,2,2);
  for(const s of [-1,1]){const bx=CX+s*30;ctx.fillStyle='#3a3448';ctx.fillRect(bx-4,dy+2,8,10);torch(bx,dy-2,now)}
  for(let i=0;i<3;i++){ctx.fillStyle=i%2?'#3a3450':'#443e5a';ctx.fillRect(CX-HW+i*3,dy+6+i*5,HW*2-i*6,5)}
  /* 떠다니는 먼지 */for(let i=0;i<40;i++){const yy=TOPY+((i*137+now/30)%(CL)),xx=CX-HW+((i*53)%(HW*2));if(yy<y0||yy>y1)continue;ctx.fillStyle='rgba(220,210,255,.25)';ctx.fillRect(xx+Math.sin(now/900+i)*3,yy,1,1)}}
 function okAt(x,y,open){if(y>=WB+4){/* 꺼진 보스는 지나갈 수 없음 */if(SQ&&Math.abs(x-SQ.bx)<64&&y<SQ.by+66)return false;return x>=AX+10&&x<=AX+AW-10&&y<=AY+AH-8}if(!open)return false;return Math.abs(x-CX)<=HW-8&&y>=TOPY+30}
 function snapNow(){/* 나와 보스 말풍선을 빼고 멈춘 보스방을 한 장 찍어 둠 */const sx=P.x;P.x=-9999;try{if(G)G.talk=null}catch(e){}try{drawScene(SQ.frz)}catch(e){}P.x=sx;const cv=$('game'),c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;const o=c.getContext('2d');o.drawImage(cv,0,0);
  o.setTransform(cv.width/W,0,0,cv.height/H,0,0);o.globalCompositeOperation='saturation';o.fillStyle='rgb(128,128,128)';o.beginPath();o.arc(SQ.bx,SQ.by,82,0,TAU);o.fill();o.globalCompositeOperation='source-over';o.fillStyle='rgba(0,0,12,.35)';o.fillRect(0,0,W,H);SQ.snap=c}
 function world(now,cam,open){ctx.save();ctx.translate(0,-cam);if(SQ.snap)ctx.drawImage(SQ.snap,0,0,W,H);corridor(now,cam);wall(now,open);
  /* 무너지는 벽 조각 */for(const c of SQ.chunks||[]){ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.r);ctx.fillStyle=c.c;ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h);ctx.fillStyle='#00000040';ctx.fillRect(-c.w/2,c.h/2-1,c.w,1);ctx.restore()}
  for(const p of SQ.parts||[]){ctx.globalAlpha=Math.max(0,.7-p.l);ctx.fillStyle=p.c||'#a89a80';ctx.fillRect(p.x,p.y,p.s||1.5,p.s||1.5)}ctx.globalAlpha=1;
  if(SQ.ph!=='crack')hero(P.x,P.y,(P.face.x||1)<0,!!SQ.walking,SQ.walkT||0);
  ctx.restore();
  /* 복도에 들어서면 내 둘레만 밝게 */const inC=Math.max(0,Math.min(1,(WB-P.y)/60));if(inC>0){const sx=P.x,sy=P.y-cam-10,g=ctx.createRadialGradient(sx,sy,30,sx,sy,190);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,'+(.7*inC)+')');ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}}
 function tick(now,dt){const t=(now-SQ.t0)/1000;ctx.setTransform(SS,0,0,SS,0,0);ctx.imageSmoothingEnabled=false;
  if(SQ.ph==='off'){/* 멈춘 전투 장면을 그대로(시간을 멈춘 채) */
   try{drawScene(SQ.frz)}catch(e){}ctx.setTransform(SS,0,0,SS,0,0);
   {const k=Math.min(1,t/2.4);
    /* 보스 전원 꺼짐: 깜빡임 → 색이 빠짐 → 어두워짐 */
    const fl=t<1.4?(Math.random()<.35?1:0):0;ctx.save();ctx.globalCompositeOperation='saturation';ctx.fillStyle='rgba(128,128,128,'+Math.min(1,k*1.4)+')';ctx.beginPath();ctx.arc(SQ.bx,SQ.by,82,0,TAU);ctx.fill();ctx.restore();
    ctx.save();ctx.fillStyle='rgba(0,0,10,'+(k*.5+fl*.25)+')';ctx.beginPath();ctx.arc(SQ.bx,SQ.by,82,0,TAU);ctx.fill();ctx.restore();
    if(Math.random()<.5)SQ.parts.push({x:SQ.bx+(Math.random()-.5)*60,y:SQ.by+(Math.random()-.5)*50,vx:(Math.random()-.5)*60,vy:-20-Math.random()*40,l:0});
    ctx.save();for(const p of SQ.parts){p.l+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=120*dt;ctx.globalAlpha=Math.max(0,1-p.l/.8);ctx.fillStyle=Math.random()<.5?'#ffe36b':'#8ad0ff';ctx.fillRect(p.x,p.y,2,2)}ctx.restore();SQ.parts=SQ.parts.filter(p=>p.l<.8);
    if(t<1.6&&Math.random()<.3){ctx.save();ctx.strokeStyle='#bfe8ff';ctx.lineWidth=1;ctx.beginPath();let x=SQ.bx-30+Math.random()*60,y=SQ.by-30;ctx.moveTo(x,y);for(let i=0;i<5;i++){x+=(Math.random()-.5)*14;y+=12;ctx.lineTo(x,y)}ctx.stroke();ctx.restore()}
    txt('SYSTEM SHUTDOWN',W/2,H/2-10,20,'#ff4d6d',(Math.sin(t*12)>0?1:.35));txt('열쇠가 보스의 심장을 멈췄다…',W/2,H/2+8,9,'#e8eef6',Math.min(1,t));
    if(t>2.6){snapNow();SQ.ph='crack';SQ.t0=now;SQ.parts=[];SQ.chunks=[];try{sfx('move')}catch(e){}}}}
  else if(SQ.ph==='crack'){/* 벽에 금이 번지고(1.4초) → 쩍 갈라지며 무너짐 */const k=Math.min(1,t/1.4),open=t<1.4?k:1;
   if(t>=1.4&&!SQ.broke){SQ.broke=1;try{perc&&perc('crash',audio.currentTime)}catch(e){}snd(90,.5,'sawtooth',.09,40);const r=R0(13);
    for(let i=0;i<22;i++)SQ.chunks.push({x:CX+(r()-.5)*HW*2,y:WT+r()*(WB-WT),vx:(r()-.5)*90,vy:-40+r()*30,r:0,vr:(r()-.5)*8,w:4+r()*8,h:3+r()*6,c:r()<.5?'#4a4460':'#3a3448',l:0});
    for(let i=0;i<60;i++)SQ.parts.push({x:CX+(r()-.5)*HW*2.4,y:WB-r()*30,vx:(r()-.5)*70,vy:-10+r()*40,l:0,s:1+r()*2})}
   for(const c of SQ.chunks){c.l+=dt;c.x+=c.vx*dt;c.y+=c.vy*dt;c.vy+=260*dt;c.r+=c.vr*dt;if(c.y>WB+18+((c.x*7)%14)){c.y=WB+18+((c.x*7)%14);c.vy*=-.25;c.vx*=.6;c.vr*=.5}}
   for(const p of SQ.parts){p.l+=dt*.5;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.98}SQ.parts=SQ.parts.filter(p=>p.l<.7);
   const sh=t<1.4?(Math.random()-.5)*2*k:t<2.2?(Math.random()-.5)*6*(2.2-t):0;ctx.save();ctx.translate(sh,sh*.5);world(now,0,open);ctx.restore();
   hero(P.x,P.y,(P.face.x||1)<0,false,0);
   txt(t<1.4?'쩌저적…':'쿠구궁!',CX,WB+30,t<1.4?10:14,'#ffe9a8',1);
   if(t>2.6){SQ.ph='free';SQ.t0=now;SQ.cam=0}}
  else if(SQ.ph==='free'){/* 직접 걸어서 틈으로 → 복도를 따라 위로 */
   let [mx,my]=moveInput();if(SQ.tgt){const ddx=SQ.tgt.x-P.x,ddy=SQ.tgt.y-P.y,dd=Math.hypot(ddx,ddy);if(dd<3)SQ.tgt=null;else{mx=ddx/dd;my=ddy/dd}}
   const l=Math.hypot(mx,my);SQ.walking=l>.1;if(SQ.walking){mx/=l;my/=l;const sp=74;const nx=P.x+mx*sp*dt,ny=P.y+my*sp*dt;if(okAt(nx,ny,1)){P.x=nx;P.y=ny}else if(okAt(nx,P.y,1))P.x=nx;else if(okAt(P.x,ny,1))P.y=ny;
    SQ.walkT=(SQ.walkT||0)+dt*8;P.face=Math.abs(mx)>=Math.abs(my)?{x:Math.sign(mx),y:0}:{x:0,y:Math.sign(my)}}
   const want=Math.max(TOPY-60,Math.min(0,P.y-H*.62));SQ.cam+=(want-SQ.cam)*Math.min(1,dt*6);
   for(const c of SQ.chunks)if(c.y<WB+30){c.vy+=260*dt;c.y+=c.vy*dt;if(c.y>WB+18+((c.x*7)%14)){c.y=WB+18+((c.x*7)%14);c.vy=0}}
   world(now,SQ.cam,1);
   if(t<6&&P.y>WB)txt('벽이 갈라졌다! 직접 걸어서 왼쪽 위 틈으로 들어가 보세요 ▲',W/2,H-16,9,'#e6d4ff',.6+.4*Math.sin(now/300));
   if(P.y<TOPY+40){SQ.ph='room';SQ.t0=now;try{sfx('ok')}catch(e){}}}
  else if(SQ.ph==='duel'){duel(now,dt,t)}
  else if(SQ.ph==='room'){
   ctx.fillStyle='#06040c';ctx.fillRect(0,0,W,H);const k=Math.min(1,t/1.2);
   const g=ctx.createRadialGradient(W/2,H*.55,10,W/2,H*.55,220);g.addColorStop(0,'rgba(120,80,200,'+(.45*k)+')');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
   ctx.save();ctx.translate(W/2,H*.7);ctx.scale(1,.3);ctx.strokeStyle='rgba(255,216,74,'+(.6*k)+')';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,70,0,TAU);ctx.stroke();ctx.rotate(now/2000);ctx.strokeStyle='rgba(201,168,255,'+(.5*k)+')';for(let i=0;i<8;i++){ctx.rotate(TAU/8);ctx.beginPath();ctx.moveTo(40,0);ctx.lineTo(62,0);ctx.stroke()}ctx.restore();
   try{const img=ch2Render(IDX,0,0,false,now/1000);ctx.globalAlpha=k;ctx.drawImage(img,0,0,40,48,W/2-40,H*.7-92+Math.sin(now/500)*2,80,96);ctx.globalAlpha=1}catch(e){}
   for(let i=0;i<14;i++){const a=now/1500+i*TAU/14;ctx.fillStyle=i%2?'#ffd84a':'#c9a8ff';ctx.globalAlpha=.5*k;ctx.fillRect(W/2+Math.cos(a)*90,H*.5+Math.sin(a)*40,2,2)}ctx.globalAlpha=1;
   txt('비밀의 열쇠지기 · 클라비스',W/2,52,16,'#ffd84a',k);
   if(t>1.2)txt('「…열쇠를 가져온 자인가. 칼로 증명해 봐라.」',W/2,74,10,'#e6d4ff',Math.min(1,(t-1.2)*2));
   if(t>3.6)startFight()}}

 /* ---------- ③ 클라비스와 1:1 결투 (v128: 결투처럼 — 같은 크기, 탄막 없이 칼싸움 · 자유롭게 움직이며 대시 · 회피 · 패링) ---------- */
 const BX0=AX+22,BX1=AX+AW-22,BY0=AY+64,BY1=AY+AH-14;
 const DM={easy:.7,normal:1,hard:1.35,extreme:1.75};
 let F=null,FX=[],POPS=[],ROOM=null;
 const foeWp=()=>{try{let i=-1;for(let k=WEAPONS.length-1;k>=0;k--){const w=WEAPONS[k];if(w&&w.myth&&(w.type==='katana'||w.type==='sword'||w.type==='rapier')){i=k;break}}return i<0?0:i}catch(e){return 0}};
 function startFight(){const m=DM[diff]||1,now=performance.now();try{resetP(BX0+70,(BY0+BY1)/2)}catch(e){P.x=BX0+70;P.y=(BY0+BY1)/2}P.face={x:1,y:0};P.maxhp=P.maxhp||110;P.hp=P.maxhp;P.hpShow=undefined;P._stun127=0;P._hit127=0;
  F={x:BX1-70,y:(BY0+BY1)/2,face:{x:-1,y:0},mx:Math.round(8000*m),hp:Math.round(8000*m),st:'intro',t:now,cd:900,walkT:0,walk:false,lungeT:0,lungeA:Math.PI,blinkCd:4000,parCd:2500,dashCd:2000,evCd:1500,ph2:false,hitF:0,combo:0,wp:foeWp(),goal:null,gT:0,tr:[]};
  FX=[];POPS=[];SQ.ph='duel';SQ.t0=now;SQ.me={atk:0,dash:null,parryT:0,inv:0};try{sfx('ok')}catch(e){}}
 const ang=(a,b)=>Math.abs(((a-b+Math.PI*3)%(Math.PI*2))-Math.PI);
 const clampB=o=>{o.x=Math.max(BX0,Math.min(BX1,o.x));o.y=Math.max(BY0,Math.min(BY1,o.y))};
 function dpop(x,y,s,c){POPS.push({x,y,s,c,t:performance.now()})}
 /* v137: 클라비스 기술이 나를 맞힐 때 공용 — 패링(막 누름) → 클라비스 기절, 무적 → 회피, 아니면 피해 · 밀림 */
 function hitMe(dmg,aa,now,o){o=o||{};const me=SQ.me,f=F;if(o.parry!==false&&now-me.parryT<200){try{window.SK130&&SK130.gain(10)}catch(e){}try{window.CA137&&CA137.onDuelParry()}catch(e){}if(o.stun!==false){f.st='stun';f.t=now;f.cnt=0}dpop(P.x,P.y-36,'PARRY!','#ffe79a');spark(P.x,P.y-14,'#ffe79a',18);snd(1600,.12,'square',.06,1200);return 'parry'}
  if(now<me.inv||now<(P._hit127||0)){dpop(P.x,P.y-34,'회피','#9fe8ff');return 'miss'}
  try{if(window.SK130)dmg=SK130.hurt(dmg)}catch(e){}if(dmg<=0){dpop(P.x,P.y-34,'회피','#9fe8ff');return 'miss'}
  P.hp=Math.max(0,P.hp-dmg);P._hit127=now+(o.iv||600);if(aa!=null){P.x+=Math.cos(aa)*(o.kb||9);P.y+=Math.sin(aa)*(o.kb||9);clampB(P)}dpop(P.x,P.y-34,'-'+dmg,'#ff5a7a');spark(P.x,P.y-12,'#ff5a7a',8);snd(160,.12,'square',.07,80);SQ.shake=now;return 'hit'}
 function slashFx(x,y,a,col){FX.push({k:'sl',x,y,a,col,t:performance.now()})}
 function spark(x,y,col,n){for(let i=0;i<(n||8);i++)FX.push({k:'sp',x,y,vx:(Math.random()-.5)*160,vy:(Math.random()-.5)*160-30,col,t:performance.now()})}
 function snd(f,d,w,v,e){try{sfx(f,d,w,v,e)}catch(_){}}
 const busy=st=>['dashin','evade','blink','stun','dead','intro'].includes(st);
 /* 내 공격 · 대시 · 패링 */
 function myAtk(){const now=performance.now(),me=SQ.me;if(now<(P.atkCd||0)||now<(P._stun127||0)||!F||F.st==='dead'||F.st==='intro'||P.hp<=0)return;P.atkCd=now+250;
  const dx=F.x-P.x,dy=F.y-P.y,d=Math.hypot(dx,dy);const a=d<60?Math.atan2(dy,dx):Math.atan2(P.face.y||0,P.face.x||1);P.face={x:Math.sign(Math.cos(a))||1,y:0};
  P.lungeT=now;P.lungeA=a;P.lungeDur=130;me.atk=now;const w=curWp()||{};slashFx(P.x+Math.cos(a)*6,P.y-9+Math.sin(a)*6,a,w.trail||'#ffffff');snd(520,.05,'square',.04,300);
  if(d<34&&ang(Math.atan2(dy,dx),a)<1.3){
   /* 회피 대시 */if(!busy(F.st)&&F.st!=='slash'&&F.st!=='parry'&&F.evCd<=0&&Math.random()<(F.ph2?.34:.22)){const s=Math.random()<.5?-1:1,l=d||1;F.dvx=(-dx/l)*.6+(-dy/l)*s;F.dvy=(-dy/l)*.6+(dx/l)*s;const L=Math.hypot(F.dvx,F.dvy)||1;F.dvx/=L;F.dvy/=L;F.st='evade';F.t=now;F.evCd=F.ph2?1600:2600;dpop(F.x,F.y-34,'회피!','#9fe8ff');snd(1100,.07,'triangle',.04,1800);return}
   if(F.st==='evade'||F.st==='blink'){dpop(F.x,F.y-34,'빗나감','#9fe8ff');return}
   /* 클라비스의 패링 */if(F.st==='parry'){F.blockT=now;F.x+=Math.cos(a)*3;F.y+=Math.sin(a)*3;clampB(F);spark((P.x+F.x)/2,(P.y+F.y)/2-12,'#ffe79a',16);dpop(F.x,F.y-36,'패링!','#ffe79a');snd(1600,.12,'square',.06,1200);P._stun127=now+700;F.st='wind';F.t=now;F.wd=260;F.cnt=1;F.cd=0;return}
   /* v134: 탑과 같은 피해 공식(박자 · 콤보 · 치명 · 장비/스킨/세트 배율) + 맞힘 효과(상태 이상 · 신화 스킬) */let pet=0;try{pet=(PETS[shopInv().eq.pt]||{}).dmg||0}catch(e){}const K=window.SK130?SK130.atk():{bg:0,mult:1,crit:()=>Math.random()<(w.crit||0)+.05,dmgMul:1,comboMul:1},crit=K.crit(),bg=K.bg;
   let dmg=Math.round(34*(w.dmg||1)*(1+pet)*K.mult*(crit?1.8:1)*K.comboMul*K.dmgMul*(F.st==='stun'?1.5:1));
   F.hp=Math.max(0,F.hp-dmg);F.hitF=now;F.hitT=now;try{if(window.SK130){SK130.onHit(F,dmg,crit,bg);SK130.swing(1,bg)}}catch(e){}F.x+=Math.cos(a)*5;F.y+=Math.sin(a)*5;clampB(F);dpop(F.x,F.y-34,(crit?'치명! ':'')+(bg===2?'PERFECT ':'')+dmg,bg===2?'#ffe79a':crit?'#ffd84a':'#ffffff');spark(F.x,F.y-12,w.trail||'#ffffff',crit||bg===2?12:6);snd(crit?900:700,.06,'sawtooth',.05,200);
   SQ.stop=now+(bg===2||crit?85:55);SQ.shake=now;try{const at=audio.currentTime;perc('snare',at,bg===2||crit?.55:.38);if(bg===2)perc('hat',at+.02,.4)}catch(e){}
   if(F.st==='wind'&&!F.cnt&&Math.random()<.35){F.st='idle';F.cd=300}
   if(F.hp<=0){F.st='dead';F.t=now;snd(220,.6,'triangle',.08,60)}
   else if(!F.ph2&&F.hp<F.mx*.5){F.ph2=true;dpop(F.x,F.y-46,'클라비스가 진심이 되었다!','#ffd84a');spark(F.x,F.y-20,'#ffd84a',20)}}}
 function myDash(){const now=performance.now(),me=SQ.me;if(now<(P.dashCd||0)||now<(P._stun127||0)||P.hp<=0)return;let [mx,my]=moveInput();if(Math.hypot(mx,my)<.1){mx=P.face.x||1;my=P.face.y||0}const l=Math.hypot(mx,my)||1;
  me.dash={vx:mx/l,vy:my/l,t:now};P.dash={t0:now,dur:150,vx:mx/l*290,vy:my/l*290};if(Math.abs(mx)>.2)P.face={x:Math.sign(mx),y:0};P.dashCd=now+520;me.inv=now+300;snd(330,.09,'sawtooth',.03,200)}
 function myParry(){const now=performance.now();if(now<(P.parryCd||0)||now<(P._stun127||0)||P.hp<=0)return;SQ.me.parryT=now;P.parryT=now;P.parryCd=now+600}
 {const f=doAttack;doAttack=function(){if(mode==='sec127'){if(SQ&&SQ.ph==='duel')myAtk();return}return f.apply(this,arguments)}}
 {const f=doDash;doDash=function(){if(mode==='sec127'){if(SQ&&SQ.ph==='duel')myDash();return}return f.apply(this,arguments)}}
 if(typeof tryParry==='function'){const f=tryParry;tryParry=function(){if(mode==='sec127'){if(SQ&&SQ.ph==='duel')myParry();return}return f.apply(this,arguments)}}
 if(typeof tryUlt==='function'){const f=tryUlt;tryUlt=function(){if(mode==='sec127')return;return f.apply(this,arguments)}}
 /* 클라비스의 움직임: 방 안을 자유롭게 — 빙 돌고 · 자리 바꾸고 · 파고들고 · 피하고 · 막고 */
 function pickGoal(now){const f=F,r=Math.random(),dx=P.x-f.x,dy=P.y-f.y;let gx,gy;
  if(r<.45){const a=Math.atan2(f.y-P.y,f.x-P.x)+(Math.random()<.5?1:-1)*(.8+Math.random()*.9),R=55+Math.random()*35;gx=P.x+Math.cos(a)*R;gy=P.y+Math.sin(a)*R*.8}
  else if(r<.75){gx=BX0+Math.random()*(BX1-BX0);gy=BY0+Math.random()*(BY1-BY0)}
  else{gx=P.x-dx*.2;gy=P.y-dy*.2}
  f.goal={x:Math.max(BX0,Math.min(BX1,gx)),y:Math.max(BY0,Math.min(BY1,gy))};f.gT=now+900+Math.random()*1300}
 function foeAI(now,dt){const f=F,me=SQ.me,dx=P.x-f.x,dy=P.y-f.y,d=Math.hypot(dx,dy),sp=f.ph2?108:90,m=DM[diff]||1;f.walk=false;
  for(const q of ['cd','blinkCd','parCd','dashCd','evCd'])f[q]-=dt*1000;
  if(['dashin','evade','blink'].includes(f.st)&&(!f.tr.length||now-f.tr[f.tr.length-1].t>30))f.tr.push({x:f.x,y:f.y,t:now,fl:f.face.x<0});f.tr=f.tr.filter(q=>now-q.t<280);
  if(f.st==='intro'){if(now-f.t>1400){f.st='idle'}return}
  /* v136: 늦게 들어온 피해로 체력이 0이 되어도 쓰러지게 */if(f.hp<=0&&f.st!=='dead'){f.st='dead';f.t=now;snd(220,.6,'triangle',.08,60)}
  if(f.st==='dead'||P.hp<=0)return;
  if(f.st==='stun'){if(now-f.t>1200){f.st='idle';f.cd=400}return}
  /* v134: 장비 · 스킬로 걸린 기절 · 냉기 */if(window.SK130&&SK130.stunned(f)){f.walk=false;return}if(window.SK130&&SK130.chilled(f))dt*=.55;
  if(f.st==='parry'){f.face={x:Math.sign(dx)||1,y:0};if(now-f.t>560){f.st='idle';f.parCd=f.ph2?2200:3200}return}
  /* v137: 새 기술(회오리 · 투척 · 감옥 · 찌르기 · 열쇠 비)은 CA137이 진행 */if(window.CA137){try{if(CA137.state(f,now,dt))return}catch(e){}}
  if(f.st==='evade'){f.x+=f.dvx*300*dt;f.y+=f.dvy*300*dt;clampB(f);if(now-f.t>170){f.st='idle';f.cd=Math.min(f.cd,250);if(f.ph2&&Math.random()<.5){f.st='dashin';f.t=now;const l=Math.hypot(P.x-f.x,P.y-f.y)||1;f.dvx=(P.x-f.x)/l;f.dvy=(P.y-f.y)/l}}return}
  if(f.st==='dashin'){f.x+=f.dvx*300*dt;f.y+=f.dvy*300*dt;clampB(f);f.face={x:Math.sign(f.dvx)||f.face.x,y:0};if(now-f.t>170||Math.hypot(P.x-f.x,P.y-f.y)<24){f.st='wind';f.t=now;f.wd=(f.ph2?220:300)}return}
  if(f.st==='blink'){if(now-f.t>260&&!f.bl){f.bl=1;const s=Math.random()<.5?-1:1;f.x=P.x-(P.face.x||1)*26;f.y=P.y+s*6;clampB(f);spark(f.x,f.y-12,'#c9a8ff',14);snd(1200,.1,'sine',.05,400)}if(now-f.t>420){f.bl=0;f.st='wind';f.t=now;f.wd=f.ph2?260:340}return}
  if(f.st==='wind'){f.face={x:Math.sign(dx)||f.face.x,y:0};f.aa=Math.atan2(dy,dx);if(now-f.t>(f.wd||420)){f.st='slash';f.t=now;f.lungeT=now;f.lungeA=f.aa;f.x+=Math.cos(f.aa)*6;f.y+=Math.sin(f.aa)*6;clampB(f);slashFx(f.x+Math.cos(f.aa)*6,f.y-9+Math.sin(f.aa)*6,f.aa,'#ffd84a');snd(440,.07,'sawtooth',.05,180);
    const hx=P.x-f.x,hy=P.y-f.y,hd=Math.hypot(hx,hy);
    if(hd<38&&ang(Math.atan2(hy,hx),f.aa)<1.35){
     if(now-me.parryT<200){try{window.SK130&&SK130.gain(10)}catch(e){}try{window.CA137&&CA137.onDuelParry()}catch(e){}f.st='stun';f.t=now;f.cnt=0;dpop(P.x,P.y-36,'PARRY!','#ffe79a');spark((P.x+f.x)/2,P.y-14,'#ffe79a',18);snd(1600,.12,'square',.06,1200);return}
     if(now<me.inv||now<(P._hit127||0)){dpop(P.x,P.y-34,'회피','#9fe8ff')}
     else{let dmg=Math.round(14*m*(f.ph2?1.2:1)*(f.cnt?1.3:1));/* v134: 장비 · 스킨 · 신화 스킬이 피해를 줄이거나 피함 */try{if(window.SK130)dmg=SK130.hurt(dmg)}catch(e){}if(dmg<=0){dpop(P.x,P.y-34,'회피','#9fe8ff');f.cnt=0;return}P.hp=Math.max(0,P.hp-dmg);P._hit127=now+600;P.x+=Math.cos(f.aa)*9;P.y+=Math.sin(f.aa)*9;clampB(P);dpop(P.x,P.y-34,'-'+dmg,'#ff5a7a');spark(P.x,P.y-12,'#ff5a7a',8);snd(160,.12,'square',.07,80);SQ.shake=now}}f.cnt=0}
   return}
  if(f.st==='slash'){if(now-f.t>230){if(f.ph2&&f.combo<1&&d<46){f.combo++;f.st='wind';f.t=now;f.wd=160;return}f.combo=0;f.st='idle';f.cd=(f.ph2?480:700)+Math.random()*400;f.goal=null}return}
  /* idle: 기술 고르기 */
  if(now-me.atk<200&&d<44&&f.parCd<=0&&Math.random()<(f.ph2?.45:.3)){f.st='parry';f.t=now;return}
  if(d>110&&f.blinkCd<=0&&Math.random()<.02){f.st='blink';f.t=now;f.blinkCd=f.ph2?3600:5600;spark(f.x,f.y-12,'#c9a8ff',14);return}
  if(d>46&&d<120&&f.dashCd<=0&&f.cd<=0){const l=d||1;f.dvx=dx/l;f.dvy=dy/l;f.st='dashin';f.t=now;f.dashCd=f.ph2?1500:2400;snd(260,.08,'triangle',.04,900);return}
  if(f.cd<=0&&window.CA137){try{if(CA137.pick(f,now,d))return}catch(e){}}
  if(d<36&&f.cd<=0){f.st='wind';f.t=now;f.wd=(f.ph2?280:400);return}
  /* 자유롭게 걷기: 목표 지점(빙 돌기 · 자리 바꾸기 · 다가가기) */
  if(!f.goal||now>f.gT||Math.hypot(f.goal.x-f.x,f.goal.y-f.y)<6)pickGoal(now);
  if(f.cd<=0&&d<90){f.goal={x:P.x,y:P.y};}
  const gx=f.goal.x-f.x,gy=f.goal.y-f.y,gl=Math.hypot(gx,gy);if(gl>3){f.x+=gx/gl*sp*dt;f.y+=gy/gl*sp*dt;f.walk=true;f.walkT+=dt*9;clampB(f)}
  f.face={x:Math.abs(dx)>4?Math.sign(dx):f.face.x,y:0}}
 /* 클라비스 그리기: 결투 상대처럼 내 캐릭터 그리기를 잠깐 빌림 */
 const KS=['x','y','face','walkOn','walkT','lungeT','lungeA','lungeDur','parryT','parryPerf','parryUsed','dash','inv'];
 function asFoe(fn){const inv=shopInv(),e0={ch:inv.eq.ch,wp:inv.eq.wp},sv={};for(const q of KS)sv[q]=P[q];const S5=window.SKIN58,g0=S5&&S5.get,mo=window.__skinMotion,tr=window.__skinTrail,om=mode;
  try{Object.assign(P,{x:F.x,y:F.y,face:F.face,walkOn:F.walk,walkT:F.walkT,lungeT:F.lungeT,lungeA:F.lungeA,lungeDur:150,parryT:F.st==='parry'?F.t:0,parryPerf:false,parryUsed:false,dash:null,inv:0});inv.eq.ch=IDX;inv.eq.wp=F.wp;if(S5)S5.get=()=>null;window.__skinMotion=null;window.__skinTrail=null;window.__mateDraw=1;mode='village';fn()}
  catch(e){}finally{mode=om;window.__mateDraw=0;inv.eq.ch=e0.ch;inv.eq.wp=e0.wp;if(S5)S5.get=g0;window.__skinMotion=mo;window.__skinTrail=tr;for(const q of KS)P[q]=sv[q]}}
 const GH={};function ghost(fl){const k=fl?1:0;if(GH[k])return GH[k];const cv=document.createElement('canvas');cv.width=64;cv.height=64;const o=cv.getContext('2d');o.imageSmoothingEnabled=false;const sf=F.face;F.face={x:fl?-1:1,y:0};
  asFoe(()=>{try{drawKnight(o,20,22,2,fl,null,0)}catch(e){}});F.face=sf;o.globalCompositeOperation='source-atop';o.fillStyle='#ffd84a';o.globalAlpha=.8;o.fillRect(0,0,64,64);return GH[k]=cv}
 function drawFoe(now){const f=F,fl=f.face.x<0;let lx=0,ly=0;if(now-f.lungeT<150){const p=Math.sin((now-f.lungeT)/150*Math.PI)*5;lx=Math.cos(f.lungeA)*p;ly=Math.sin(f.lungeA)*p}
  for(const q of f.tr){const a=1-(now-q.t)/280;ctx.save();ctx.globalAlpha=a*.45;ctx.globalCompositeOperation='lighter';ctx.drawImage(ghost(q.fl),q.x-32,q.y-41);ctx.restore()}
  ctx.save();ctx.globalAlpha=.35;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(f.x,f.y+2,9,3,0,0,TAU);ctx.fill();ctx.restore();
  ctx.save();ctx.globalAlpha=.75;ctx.strokeStyle='#ffd84a';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(f.x,f.y+2,11,4,0,0,TAU);ctx.stroke();ctx.restore();
  if(f.ph2){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.25+.15*Math.sin(now/120);const g=ctx.createRadialGradient(f.x,f.y-14,2,f.x,f.y-14,26);g.addColorStop(0,'#ffd84a');g.addColorStop(1,'rgba(255,216,74,0)');ctx.fillStyle=g;ctx.fillRect(f.x-26,f.y-40,52,52);ctx.restore()}
  let al=1;if(f.st==='blink'&&!f.bl)al=Math.max(0,1-(now-f.t)/260);if(f.st==='blink'&&f.bl)al=Math.min(1,(now-f.t-260)/160);
  if(f.st==='dead'){defeated(now);return}
  if(f.st==='parry'||now-(f.blockT||0)<220){guardDraw(now,fl);}else{
  ctx.save();ctx.globalAlpha=al;asFoe(()=>{drawSword(f.x-12+lx,f.y-19+ly,2,fl,now);drawKnight(ctx,f.x-12+lx,f.y-19+ly,2,fl,f.walk?f.walkT:null,f.walk?null:now/430)});ctx.restore();}
  if(now-f.hitF<90){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.5;ctx.fillStyle='#ffffff';ctx.fillRect(f.x-10,f.y-34,20,34);ctx.restore()}
  try{window.CA137&&CA137.drawFoe(f,now)}catch(e){}
  if(f.st==='wind'){ctx.save();ctx.globalAlpha=.6+.4*Math.sin(now/40);txt('!',f.x,f.y-40,14,'#ff5a7a');ctx.restore()}

  if(f.st==='stun')for(let i=0;i<3;i++){const a=now/250+i*TAU/3;ctx.fillStyle='#ffe79a';ctx.fillRect(f.x+Math.cos(a)*9-1,f.y-40+Math.sin(a)*3,3,3)}}
 /* v129: 패링 자세 — 검을 몸 앞에 비스듬히 세워 막음(검날이 빛나고, 막는 순간 번쩍 · 불꽃) */
 function guardDraw(now,fl){const f=F,d=fl?-1:1,q=Math.min(1,(now-f.t)/90),bx=f.x+d*(5+q*3),by=f.y-13,blk=now-(f.blockT||0)<220;
  ctx.save();asFoe(()=>{P.lungeT=0;drawKnight(ctx,f.x-12-d*1,f.y-19+1,2,fl,null,0)});ctx.restore();
  /* 검: 손잡이는 가슴 앞, 날은 위쪽 앞으로 비스듬히 */const a=-Math.PI/2+d*.42,L=19,hx=bx,hy=by+3,tx=hx+Math.cos(a)*L,ty=hy+Math.sin(a)*L;
  ctx.save();ctx.lineCap='square';ctx.strokeStyle='#2a2440';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(hx,hy);ctx.lineTo(tx,ty);ctx.stroke();ctx.strokeStyle='#d8e0f0';ctx.lineWidth=2.4;ctx.beginPath();ctx.moveTo(hx,hy);ctx.lineTo(tx,ty);ctx.stroke();ctx.strokeStyle='#ffffff';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(hx+d*.6,hy);ctx.lineTo(tx+d*.6,ty);ctx.stroke();
  /* 날밑 · 손잡이 */const ca=a+Math.PI/2;ctx.strokeStyle='#ffd84a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(hx+Math.cos(ca)*5,hy+Math.sin(ca)*5);ctx.lineTo(hx-Math.cos(ca)*5,hy-Math.sin(ca)*5);ctx.stroke();ctx.strokeStyle='#3a2a1a';ctx.lineWidth=2.4;ctx.beginPath();ctx.moveTo(hx,hy);ctx.lineTo(hx-Math.cos(a)*5,hy-Math.sin(a)*5);ctx.stroke();ctx.fillStyle='#ffd84a';ctx.fillRect(hx-Math.cos(a)*6-1,hy-Math.sin(a)*6-1,2,2);
  /* 날을 따라 흐르는 빛 */const sh=((now-f.t)/300)%1;ctx.globalCompositeOperation='lighter';ctx.fillStyle='rgba(255,240,180,.8)';ctx.fillRect(hx+Math.cos(a)*L*sh-1,hy+Math.sin(a)*L*sh-1,3,3);
  const g=ctx.createRadialGradient(hx+Math.cos(a)*L*.55,hy+Math.sin(a)*L*.55,1,hx+Math.cos(a)*L*.55,hy+Math.sin(a)*L*.55,blk?26:14);g.addColorStop(0,blk?'rgba(255,240,180,.85)':'rgba(255,231,154,.35)');g.addColorStop(1,'rgba(255,231,154,0)');ctx.fillStyle=g;ctx.fillRect(hx-30,hy-40,60,60);
  if(blk){const k=1-(now-f.blockT)/220;ctx.strokeStyle='rgba(255,255,255,'+k+')';ctx.lineWidth=1.5;for(let i=0;i<6;i++){const ra=i*Math.PI/3+now/100,cx=hx+Math.cos(a)*L*.55,cy=hy+Math.sin(a)*L*.55;ctx.beginPath();ctx.moveTo(cx+Math.cos(ra)*4,cy+Math.sin(ra)*4);ctx.lineTo(cx+Math.cos(ra)*(10+(1-k)*8),cy+Math.sin(ra)*(10+(1-k)*8));ctx.stroke()}}
  ctx.restore()}
 /* v129: 쓰러지면 — 검을 바닥에 꽂고 무릎을 반쯤 꿇고 「내가 졌다」 → 코어를 건넴 */
 let KN=null;function kneelImg(fl){const k=fl?1:0;KN=KN||{};if(KN[k])return KN[k];const cv=document.createElement('canvas');cv.width=64;cv.height=64;const o=cv.getContext('2d');o.imageSmoothingEnabled=false;const sf=F.face,sw=F.walk;F.face={x:fl?-1:1,y:0};F.walk=false;
  asFoe(()=>{try{drawKnight(o,20,22,2,fl,null,0)}catch(e){}});F.face=sf;F.walk=sw;return KN[k]=cv}
 function bubble(x,y,s2,al){ctx.save();ctx.globalAlpha=al;ctx.font='bold 9px sans-serif';const w=ctx.measureText(s2).width+12,h=15,bx=Math.round(x-w/2),by=Math.round(y-h);ctx.fillStyle='#000a';ctx.fillRect(bx+1,by+1,w,h);ctx.fillStyle='#f6f0ff';ctx.fillRect(bx,by,w,h);ctx.fillStyle='#3a2a5a';ctx.fillRect(bx,by,w,1);ctx.fillRect(bx,by+h-1,w,1);ctx.fillRect(bx,by,1,h);ctx.fillRect(bx+w-1,by,1,h);
  ctx.fillStyle='#f6f0ff';ctx.beginPath();ctx.moveTo(x-4,by+h-1);ctx.lineTo(x+4,by+h-1);ctx.lineTo(x,by+h+5);ctx.fill();ctx.fillStyle='#2a1a4a';ctx.textAlign='center';ctx.fillText(s2,x,by+11);ctx.restore()}
 function defeated(now){const f=F,t=(now-f.t)/1000,fl=f.face.x<0,sx=f.x+(fl?-11:11);
  /* 검: 0.5초에 바닥에 꽂힘 */if(t>.5){const q=Math.min(1,(t-.5)/.12),top=f.y-26+(1-q)*-14;ctx.fillStyle='#000a';ctx.fillRect(sx-1,f.y+1,4,2);ctx.fillStyle='#c8d0e0';ctx.fillRect(sx,top+6,2,f.y-top-4);ctx.fillStyle='#ffffff';ctx.fillRect(sx,top+6,1,f.y-top-6);ctx.fillStyle='#ffd84a';ctx.fillRect(sx-3,top+4,8,2);ctx.fillStyle='#3a2a1a';ctx.fillRect(sx,top,2,4);ctx.fillStyle='#ffd84a';ctx.fillRect(sx,top-1,2,1);
   if(!f.planted&&q>=1){f.planted=1;spark(sx,f.y,'#c8b89a',14);snd(1300,.12,'square',.06,600);SQ.shake=now}
   if(t<1.1){ctx.strokeStyle='#120e1a';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(sx-6,f.y+1);ctx.lineTo(sx,f.y);ctx.lineTo(sx+7,f.y+2);ctx.stroke()}}
  /* 무릎: 0.7~1.1초에 반쯤 꿇음(아래쪽 다리를 접고 몸을 내림) */const kq=Math.max(0,Math.min(1,(t-.7)/.4)),img=kneelImg(fl),dx=f.x-32,dy=f.y-41,cut=34,drop=Math.round(kq*7),lean=Math.round(kq*2)*(fl?-1:1);
  ctx.save();ctx.globalAlpha=.35;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(f.x,f.y+2,10,3,0,0,TAU);ctx.fill();ctx.restore();
  ctx.drawImage(img,0,0,64,cut,dx+lean,dy+drop,64,cut);ctx.drawImage(img,0,cut,64,64-cut,dx,dy+cut+drop,64,Math.max(1,64-cut-drop));
  /* 말풍선 */if(t>1.2&&t<3)bubble(f.x,f.y-34+drop,'…내가 졌다.',Math.min(1,(t-1.2)*3));
  if(t>3&&t<5.4)bubble(f.x,f.y-34+drop,'이 코어를 가져가라. 광장의 성문이 너를 기다린다.',Math.min(1,(t-3)*3));
  /* 코어: 가슴에서 떠올라 나에게 */if(t>3.2){const q=Math.min(1,(t-3.6)/1.1),ox=f.x,oy=f.y-18+drop,rx=ox+(P.x-ox)*Math.max(0,q),ry=oy-Math.min(1,(t-3.2)/.4)*10+(P.y-14-oy+10)*Math.max(0,q)-Math.sin(Math.max(0,q)*Math.PI)*16;
   if(q<1){ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(rx,ry,1,rx,ry,14);g.addColorStop(0,'rgba(201,168,255,.9)');g.addColorStop(1,'rgba(201,168,255,0)');ctx.fillStyle=g;ctx.fillRect(rx-14,ry-14,28,28);ctx.restore();ctx.fillStyle='#7a4ae8';ctx.fillRect(rx-3,ry-3,6,6);ctx.fillStyle='#c9a8ff';ctx.fillRect(rx-2,ry-2,3,3);ctx.fillStyle='#fff';ctx.fillRect(rx-1,ry-2,1,1);
    if(Math.random()<.5)FX.push({k:'sp',x:rx,y:ry,vx:(Math.random()-.5)*20,vy:(Math.random()-.5)*20,col:'#c9a8ff',t:now})}
   else if(!f.gotCore){f.gotCore=1;spark(P.x,P.y-14,'#c9a8ff',20);snd(880,.3,'sine',.07,1760);dpop(P.x,P.y-40,'🔮 열쇠지기의 코어!','#e6d4ff');const s=SV();s.core=1;save()}}}
 function drawFX(now){FX=FX.filter(e=>now-e.t<(e.k==='sl'?220:500));for(const e of FX){const q=(now-e.t)/(e.k==='sl'?220:500);ctx.save();
   if(e.k==='sl'){ctx.globalAlpha=(1-q)*.8;ctx.fillStyle=e.col;ctx.beginPath();ctx.arc(e.x,e.y,19,e.a-1.25+q*.5,e.a+1.25+q*.5);ctx.arc(e.x,e.y,12,e.a+1.05+q*.5,e.a-1.05+q*.5,true);ctx.closePath();ctx.fill();ctx.globalAlpha=1-q;ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(e.x,e.y,19,e.a-1.1+q*.5,e.a+1.1+q*.5);ctx.stroke()}
   else{const s=(now-e.t)/1000;ctx.globalAlpha=1-q;ctx.fillStyle=e.col;ctx.fillRect(e.x+e.vx*s,e.y+e.vy*s+200*s*s,2,2)}ctx.restore()}
  POPS=POPS.filter(p=>now-p.t<800);for(const p of POPS){const q=(now-p.t)/800;txt(p.s,p.x,p.y-q*16,p.s.length>6?9:10,p.c,1-q*q)}}
 /* 결투장: 열쇠지기의 방 (가만히 있는 것은 한 번만 그려 둠) */
 function roomBg(){const c=document.createElement('canvas'),k=3;c.width=W*k;c.height=H*k;const o=c.getContext('2d');o.scale(k,k);o.imageSmoothingEnabled=false;const r=R0(41);
  try{o.fillStyle='#07060c';o.fillRect(0,0,W,H);
   /* 뒤 벽 */brickC(o,0,0,W,AY+56,'#2a2440','#332c4c',51);o.fillStyle='#00000055';o.fillRect(0,AY+50,W,6);o.fillStyle='#5a5270';o.fillRect(0,AY+54,W,2);
   /* 스테인드글라스 창 3개 */for(const x of [W/2-110,W/2,W/2+110]){o.fillStyle='#14101e';o.fillRect(x-14,AY-26,28,52);o.beginPath();o.arc(x,AY-26,14,Math.PI,0);o.fill();const cs=['#5a3aa0','#c9a24a','#3a7ab0','#a03a6a'];for(let yy=0;yy<5;yy++)for(let xx=0;xx<3;xx++){o.fillStyle=cs[(xx+yy+(x|0))%4];o.fillRect(x-11+xx*8,AY-22+yy*9,7,8)}o.fillStyle='#ffd84a';o.fillRect(x-2,AY-34,4,6);o.fillStyle='#c9a24a';o.fillRect(x-15,AY+26,30,2)}
   /* 바닥: 돌 타일 + 열쇠 문양 모자이크 */for(let y=AY+56;y<H;y+=12)for(let x=0;x<W;x+=12){const v=r();o.fillStyle=v<.3?'#1c1830':v<.6?'#201b36':'#241f3c';o.fillRect(x,y,12,12);o.fillStyle='#2e2848';o.fillRect(x,y,12,1);o.fillRect(x,y,1,12)}
   o.save();o.translate(W/2,(BY0+BY1)/2+8);o.scale(1,.42);o.fillStyle='#2a1f48';o.beginPath();o.arc(0,0,128,0,TAU);o.fill();o.strokeStyle='#c9a24a';o.lineWidth=2;o.beginPath();o.arc(0,0,128,0,TAU);o.stroke();o.beginPath();o.arc(0,0,112,0,TAU);o.stroke();
   for(let i=0;i<16;i++){o.rotate(TAU/16);o.fillStyle=i%2?'#c9a24a':'#7a5aa8';o.fillRect(114,-2,12,4)}o.fillStyle='#c9a24a';o.fillRect(-36,-6,56,12);o.beginPath();o.arc(30,0,16,0,TAU);o.fill();o.fillStyle='#2a1f48';o.beginPath();o.arc(30,0,8,0,TAU);o.fill();o.fillStyle='#c9a24a';o.fillRect(-36,6,8,14);o.fillRect(-22,6,8,10);o.restore();
   /* 융단 (입구 → 가운데) */o.fillStyle='#3a1a5a';o.fillRect(W/2-14,H-40,28,40);o.fillStyle='#c9a24a';o.fillRect(W/2-14,H-40,2,40);o.fillRect(W/2+12,H-40,2,40);
   /* 기둥 4개 (모서리) */for(const [x,y] of [[AX+18,AY+60],[AX+AW-26,AY+60],[AX+18,AY+AH-50],[AX+AW-26,AY+AH-50]]){o.fillStyle='#00000055';o.beginPath();o.ellipse(x+4,y+40,10,3,0,0,TAU);o.fill();o.fillStyle='#4a4462';o.fillRect(x,y,8,40);o.fillStyle='#5e5878';o.fillRect(x,y,2,40);o.fillStyle='#6a6488';o.fillRect(x-2,y-3,12,4);o.fillRect(x-2,y+38,12,4)}
   /* 옆 벽의 깃발 · 사슬 */for(const x of [AX+60,AX+AW-60]){o.fillStyle='#3a1a6a';o.fillRect(x-8,AY+6,16,34);o.fillStyle='#ffd84a';o.fillRect(x-3,AY+14,6,3);o.fillRect(x-1,AY+17,2,10);o.fillRect(x-1,AY+24,4,2);o.fillStyle='#3a1a6a';o.beginPath();o.moveTo(x-8,AY+40);o.lineTo(x,AY+34);o.lineTo(x+8,AY+40);o.fill();o.fillStyle='#c9a24a';o.fillRect(x-9,AY+5,18,2)}
   /* 흩어진 돌 · 뼈 · 금 */for(let i=0;i<26;i++){const x=AX+r()*AW,y=AY+60+r()*(AH-60);o.fillStyle=r()<.5?'#3a3450':'#2e2a42';o.fillRect(x,y,2+r()*3,1+r()*2)}o.strokeStyle='#120e1a';o.lineWidth=1;for(let i=0;i<5;i++){let x=AX+30+r()*(AW-60),y=AY+70+r()*(AH-90);o.beginPath();o.moveTo(x,y);for(let j=0;j<4;j++){x+=(r()-.5)*14;y+=4+r()*5;o.lineTo(x,y)}o.stroke()}
   /* 가장자리 어둡게 */const vg=o.createRadialGradient(W/2,H*.6,60,W/2,H*.6,320);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.6)');o.fillStyle=vg;o.fillRect(0,0,W,H)}catch(e){}
  return c}
 function drawRoom(now){if(!ROOM)ROOM=roomBg();ctx.drawImage(ROOM,0,0,W,H);
  /* 움직이는 것: 창빛 · 횃불 · 화로 · 먼지 */ctx.save();ctx.globalCompositeOperation='lighter';for(const x of [W/2-110,W/2,W/2+110]){const a=.07+.03*Math.sin(now/1300+x);const g=ctx.createLinearGradient(x,AY,x+40,H);g.addColorStop(0,'rgba(200,170,255,'+a+')');g.addColorStop(1,'rgba(200,170,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x-12,AY+26);ctx.lineTo(x+12,AY+26);ctx.lineTo(x+70,H);ctx.lineTo(x+20,H);ctx.closePath();ctx.fill()}ctx.restore();
  for(const x of [AX+120,AX+AW-120])torch(x,AY+30,now);
  for(const [x,y] of [[AX+40,AY+AH-24],[AX+AW-40,AY+AH-24]]){ctx.fillStyle='#3a3448';ctx.fillRect(x-6,y,12,10);ctx.fillStyle='#5a5470';ctx.fillRect(x-8,y-2,16,3);const fl=Math.sin(now/80+x);ctx.fillStyle='#ff7a2a';ctx.fillRect(x-5,y-8+fl,10,7);ctx.fillStyle='#ffd06a';ctx.fillRect(x-3,y-6+fl,6,5);const g=ctx.createRadialGradient(x,y-4,1,x,y-4,60);g.addColorStop(0,'rgba(255,150,60,.28)');g.addColorStop(1,'rgba(255,150,60,0)');ctx.fillStyle=g;ctx.fillRect(x-60,y-64,120,120);
   if(Math.random()<.3)FX.push({k:'sp',x:x+(Math.random()-.5)*6,y:y-10,vx:(Math.random()-.5)*10,vy:-40-Math.random()*30,col:'#ffb84a',t:now})}
  ctx.save();ctx.translate(W/2,(BY0+BY1)/2+8);ctx.scale(1,.42);ctx.rotate(now/4000);ctx.strokeStyle='rgba(255,216,74,'+(.15+.1*Math.sin(now/500))+')';ctx.lineWidth=2;for(let i=0;i<8;i++){ctx.rotate(TAU/8);ctx.beginPath();ctx.moveTo(60,0);ctx.lineTo(100,0);ctx.stroke()}ctx.restore();
  for(let i=0;i<30;i++){const x=(i*71+now/50)%W,y=AY+((i*37+now/80)%(H-AY));ctx.fillStyle='rgba(230,220,255,.18)';ctx.fillRect(x,y,1,1)}}
 /* 체력: 클라비스 전용 열쇠 모양 체력바 + 나는 원래 HUD 그대로 */
 function ltxt(s2,x,y,font,col,al,align){ctx.save();ctx.globalAlpha=al==null?1:al;ctx.font=font;ctx.textAlign=align||'left';ctx.fillStyle='#000';ctx.fillText(s2,x+1,y+1);ctx.fillStyle=col;ctx.fillText(s2,x,y);ctx.restore()}
 function clavisBar(now){const f=F,r=Math.max(0,Math.min(1,f.hp/f.mx)),t=now/1000;f.show=f.show==null?r:(f.show>r?Math.max(r,f.show-.25*(1/60)):r);
  if(f.lastR!=null&&r<f.lastR-1e-4){f.hitT=now;f.sp=(f.sp||[]);for(let i=0;i<6;i++)f.sp.push({vx:(Math.random()-.3)*70,vy:(Math.random()-.5)*60,t:now})}f.lastR=r;const hitK=Math.max(0,1-(now-(f.hitT||0))/180);
  const gold='#ffd84a',gold2='#c9a24a',dk='#120c1e',main=f.ph2?'#ff9a3a':'#b48aff',main2=f.ph2?'#ffe06a':'#ffd84a';
  const cx=26,cy=17,R=14,x=44,y=12,w=300,h=10;
  ctx.save();
  /* 사슬 장식 */for(let i=0;i<6;i++){ctx.fillStyle=i%2?'#6a6480':'#8a84a0';ctx.fillRect(x+40+i*48,y-6+Math.sin(t*2+i)*.5,6,3)}
  /* 열쇠 몸통(체력바) 테두리 */ctx.fillStyle='#000a';ctx.fillRect(x-2,y-3,w+4,h+6);ctx.fillStyle=gold2;ctx.fillRect(x-1,y-2,w+2,h+4);ctx.fillStyle=dk;ctx.fillRect(x,y-1,w,h+2);
  /* 빈 칸 무늬 */for(let i=0;i<w;i+=10){ctx.fillStyle='#1c1430';ctx.fillRect(x+i,y,9,h)}
  /* v129: 여러 줄 체력바 — 전체를 10줄로, 남은 줄 수 ×N, 줄마다 색이 바뀜 */const LY=Math.max(400,Math.round(f.mx/10)),LC=[['#b48aff','#ffd84a'],['#7a8aff','#b48aff'],['#5ad0ff','#7a8aff'],['#5affb0','#5ad0ff'],['#ffd84a','#5affb0'],['#ff9a3a','#ffd84a'],['#ff5a7a','#ff9a3a'],['#ff4dd2','#ff5a7a']];
  const nL=Math.max(1,Math.ceil(f.hp/LY)),inL=f.hp<=0?0:(f.hp-(nL-1)*LY)/LY,shL=Math.max(inL,Math.min(1,(f.show*f.mx-(nL-1)*LY)/LY)),cc=LC[(nL-1)%LC.length],nc=nL>1?LC[(nL-2)%LC.length]:null;
  if(nc){ctx.fillStyle=nc[0];ctx.globalAlpha=.55;ctx.fillRect(x,y,w,h);ctx.globalAlpha=1}
  /* 잃은 만큼 흰 잔상 → 채움 */ctx.fillStyle='#fff0d0';ctx.fillRect(x,y,Math.round(w*shL),h);
  const fw=Math.round(w*inL),g=ctx.createLinearGradient(x,0,x+w,0);g.addColorStop(0,f.ph2&&nL===1?'#ff5a3a':cc[0]);g.addColorStop(1,cc[1]);ctx.fillStyle=g;ctx.fillRect(x,y,fw,h);
  ctx.fillStyle='#ffffff55';ctx.fillRect(x,y,fw,2);ctx.fillStyle='#00000040';ctx.fillRect(x,y+h-2,fw,2);
  /* 열쇠 홈 무늬 */for(let i=6;i<fw;i+=12){ctx.fillStyle='#00000030';ctx.fillRect(x+i,y+3,5,4);ctx.fillStyle='#ffffff30';ctx.fillRect(x+i,y+3,5,1)}
  /* 지나가는 빛 */const q=((now/1400)%1.6)-.3;if(q>0&&q<1&&fw>4){ctx.globalAlpha=.3;ctx.fillStyle='#fff';ctx.fillRect(x+fw*q,y-1,4,h+2);ctx.globalAlpha=1}
  if(hitK>0){ctx.globalAlpha=hitK*.7;ctx.fillStyle='#fff';ctx.fillRect(x+fw-4,y-2,8,h+4);ctx.globalAlpha=1}
  if(r<.25){ctx.globalAlpha=.15+.15*Math.sin(now/120);ctx.fillStyle='#ff2d55';ctx.fillRect(x,y,w,h);ctx.globalAlpha=1}
  /* 반 체력 눈금 */const hx=x+w/2;ctx.fillStyle='#000';ctx.fillRect(hx,y-1,1,h+2);ctx.fillStyle=r>=.5?main2:'#4a4060';ctx.beginPath();ctx.moveTo(hx-3,y+h+5);ctx.lineTo(hx+3,y+h+5);ctx.lineTo(hx,y+h+1);ctx.fill();
  /* 열쇠 이(오른쪽 끝): 남은 체력 3단계만큼 빛남 */const tx=x+w+1;ctx.fillStyle=gold2;ctx.fillRect(tx,y-2,6,h+4);for(let i=0;i<3;i++){const lit=r>i/3,th=[9,6,11][i];ctx.fillStyle='#000a';ctx.fillRect(tx+6+i*7,y+h-1,6,th+1);ctx.fillStyle=lit?(i===0?'#ff5a7a':gold):'#3a3450';ctx.fillRect(tx+6+i*7,y+h-2,5,th);if(lit){ctx.fillStyle='#ffffff60';ctx.fillRect(tx+6+i*7,y+h-2,5,1)}}
  ctx.fillStyle=gold;ctx.fillRect(tx+6,y-2,22,3);
  /* 파편 */if(f.sp){for(const p of f.sp){const k=(now-p.t)/400;if(k>=1)continue;ctx.globalAlpha=1-k;ctx.fillStyle=k<.4?'#fff':main2;ctx.fillRect(x+fw+p.vx*k*.4,y+h/2+p.vy*k*.4,2,2)}ctx.globalAlpha=1;f.sp=f.sp.filter(p=>now-p.t<400)}
  /* 열쇠 고리(얼굴) */ctx.fillStyle='#000a';ctx.beginPath();ctx.arc(cx+1,cy+1,R+2,0,TAU);ctx.fill();ctx.fillStyle=gold2;ctx.beginPath();ctx.arc(cx,cy,R+2,0,TAU);ctx.fill();ctx.fillStyle=gold;ctx.beginPath();ctx.arc(cx,cy,R+1,0,TAU);ctx.fill();
  ctx.fillStyle='#1a1030';ctx.beginPath();ctx.arc(cx,cy,R-1,0,TAU);ctx.fill();
  ctx.save();ctx.beginPath();ctx.arc(cx,cy,R-1,0,TAU);ctx.clip();const bg=ctx.createRadialGradient(cx,cy,2,cx,cy,R);bg.addColorStop(0,f.ph2?'#7a3a20':'#4a2a7a');bg.addColorStop(1,'#120a20');ctx.fillStyle=bg;ctx.fillRect(cx-R,cy-R,R*2,R*2);
   try{const img=ch2Render(IDX,0,0,false,t);ctx.imageSmoothingEnabled=false;ctx.drawImage(img,0,0,40,30,cx-20,cy-14+(hitK?1:0),40,30)}catch(e){}
   ctx.globalCompositeOperation='source-atop';const cut=Math.round(cy-R+(R*2)*(1-r));ctx.fillStyle='rgba(16,12,26,.7)';ctx.fillRect(cx-R,cy-R,R*2,cut-(cy-R));ctx.globalCompositeOperation='source-over';
   if(hitK>0){ctx.globalAlpha=hitK*.6;ctx.fillStyle='#fff';ctx.fillRect(cx-R,cy-R,R*2,R*2);ctx.globalAlpha=1}ctx.restore();
  for(let i=0;i<8;i++){const a=t*.8+i*TAU/8;ctx.fillStyle=i%2?gold:'#fff6c8';ctx.fillRect(cx+Math.cos(a)*(R+1)-1,cy+Math.sin(a)*(R+1)-1,2,2)}
  ctx.fillStyle=f.ph2?'#ff5a7a':'#c9a8ff';ctx.fillRect(cx-2,cy+R-1,4,4);
  /* 글자 */const nm='✪ 클라비스 · 비밀의 열쇠지기',pl=(f.ph2?'◆ PHASE 2 · 진심':'◆ PHASE 1')+' · '+Math.ceil(r*100)+'%';ctx.font='bold 10px sans-serif';const nw=ctx.measureText(nm).width;
  ctx.fillStyle='#04070acc';ctx.fillRect(x-2,y+h+4,nw+ctx.measureText(pl).width*.8+22,13);ltxt(nm,x+2,y+h+14,'bold 10px sans-serif',main2);ltxt(pl,x+nw+12,y+h+14,'bold 8px sans-serif',f.ph2?'#ffb0a0':'#e6d4ff');
  /* ×N */if(nL>1){ctx.fillStyle='#000c';ctx.fillRect(x+w+30,y-4,26,16);ltxt('×'+nL,x+w+43,y+8,'900 11px sans-serif',cc[0],1,'center')}
  const hp=Math.max(0,Math.ceil(f.hp)).toLocaleString('en-US')+' / '+f.mx.toLocaleString('en-US');ltxt(hp,x+w,y+h+14,'bold 10px monospace',r<.25?'#ff8a9a':'#fff6c8',1,'right');
  ctx.restore()}
 function hud(now){const og=(typeof G!=='undefined')?G:null;try{clavisBar(now)}catch(e){}
  try{G=Object.assign(Object.create(og||{}),{ult:0,state:'play',sp:null,spUsed:false});drawPlayerHUD(now)}catch(e){}finally{G=og}}
 function duel(now,dt0,t){const me=SQ.me,f=F,stun=now<(P._stun127||0),dt=now<(SQ.stop||0)?0:dt0;/* v134 히트스톱 */
  /* 나 */if(P.hp>0&&f.st!=='dead'&&f.st!=='intro'&&!SQ.done&&!stun){let [mx,my]=moveInput();if(SQ.tgt){const ddx=SQ.tgt.x-P.x,ddy=SQ.tgt.y-P.y,dd=Math.hypot(ddx,ddy);if(dd<3)SQ.tgt=null;else{mx=ddx/dd;my=ddy/dd}}
   if(me.dash){const q=(now-me.dash.t)/150;if(q>=1){me.dash=null;P.dash=null}else{P.x+=me.dash.vx*290*dt;P.y+=me.dash.vy*290*dt;P.walkOn=false}}
   else{const l=Math.hypot(mx,my);if(l>.1){P.x+=mx/l*80*dt;P.y+=my/l*80*dt;P.walkOn=true;P.walkT=(P.walkT||0)+dt*8;/* v137: 위 · 아래로 걸으면 뒷모습 · 앞모습(복도 · 던전과 같게) */P.face=Math.abs(mx)>=Math.abs(my)?{x:Math.sign(mx),y:0}:{x:0,y:Math.sign(my)}}else P.walkOn=false}clampB(P)}else P.walkOn=false;
  if(!SQ.done)foeAI(now,dt);
  const sh=SQ.shake&&now-SQ.shake<160?(Math.random()-.5)*3:0;ctx.save();ctx.translate(sh,0);
  drawRoom(now);
  const L=[{y:f.y,fn:()=>drawFoe(now)},{y:P.y,fn:()=>{if(P.hp<=0)ctx.globalAlpha=.4;const blink=now<(P._hit127||0)&&Math.floor(now/70)%2;if(!blink){if(SQ.me.parryT&&now-SQ.me.parryT<220){ctx.save();ctx.strokeStyle='#ffe79a';ctx.lineWidth=2;ctx.beginPath();ctx.arc(P.x+((P.face.x||1)<0?-8:8),P.y-12,10,0,TAU);ctx.stroke();ctx.restore()}hero(P.x,P.y,(P.face.x||1)<0,P.walkOn,P.walkT||0)}ctx.globalAlpha=1;
   if(stun)for(let i=0;i<3;i++){const a=now/200+i*TAU/3;ctx.fillStyle='#ffe79a';ctx.fillRect(P.x+Math.cos(a)*9-1,P.y-40+Math.sin(a)*3,3,3)}}}];
  try{window.SK130&&SK130.petList(L,now)}catch(e){}/* v134: 펫 */L.sort((a,b)=>a.y-b.y).forEach(o=>{try{o.fn()}catch(e){}});drawFX(now);ctx.restore();
  hud(now);
  if(f.st==='intro'){const k=Math.min(1,(now-f.t)/400);txt('DUEL',W/2,H/2-6,30,'#ffd84a',k);txt('클라비스와 1:1 결투',W/2,H/2+12,10,'#e6d4ff',k)}
  if(t<9&&f.st!=='intro'&&!SQ.done)txt('공격 J · 대시 K · 패링 F — 「!」가 뜨면 패링, 클라비스도 막고 피해요',W/2,AY+AH-3,8,'#e8eef6',.75);
  /* 끝 */if(f.st==='dead'&&now-f.t>5800&&!SQ.done){SQ.done=1;finish(true)}if(P.hp<=0&&!SQ.done){if(!SQ.lose)SQ.lose=now;if(now-SQ.lose>1200){SQ.done=1;finish(false)}}}
 function out(fn){$('overlay').hidden=true;SQ=null;mode='boss';try{fn()}catch(e){}}
 function finish(won){/* 결과창 뒤에는 결투장이 그대로 보이게(mode는 sec127 유지) */
  if(won){const s=SV(),first=!s.beat;if(first){s.beat=Date.now()}s.core=1;save();found('sec');try{window.LV83&&LV83.addXP(300)}catch(e){}/* v134: 보스처럼 경험치 */
   showOverlay('비밀의 방 · CLEAR','열쇠지기 클라비스를 쓰러뜨렸어요!','<b style="color:#c9a8ff">🔮 열쇠지기의 코어</b>를 받았어요.<br>광장 위쪽 <b>탑의 성문</b>에 코어를 박으면 문이 열려요.'+(s.gate?'<br><small style="opacity:.75">(성문은 이미 열려 있어요)</small>':''),
    [['⛲ 광장으로',()=>out(()=>{toLobby();setTimeout(()=>{try{PLZ111.enter()}catch(e){}},300)}),true],['▲ 10F 다시',()=>out(()=>TW71.start(10)),false],['로비로',()=>out(()=>toLobby()),false]])}
  else showOverlay('비밀의 방','클라비스에게 졌어요','열쇠는 그대로 있어요. 바로 다시 결투하거나, 탑 10F 보스전에서 K를 눌러 다시 올 수 있어요.',[['↺ 다시 결투',()=>{$('overlay').hidden=true;SQ={ph:'room',t0:performance.now(),parts:[]};mode='sec127';lastT=performance.now()},true],['로비로',()=>out(()=>toLobby()),false]])}
 /* 폰: 결투 중에는 누른 곳으로 걷기(조이스틱이 없을 때) */
 document.addEventListener('pointerdown',e=>{try{if(!SQ||(SQ.ph!=='duel'&&SQ.ph!=='free')||e.target.closest('button'))return;const cv=$('game'),r=cv.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)return;SQ.tgt={x:(e.clientX-r.left)/r.width*W,y:(e.clientY-r.top)/r.height*H+(SQ.ph==='free'?SQ.cam||0:0)}}catch(_){}},true);

 /* ---------- 메인 루프 ---------- */
 let lastT=performance.now();
 {const _f=frame;frame=function(){document.documentElement.classList.toggle('sec127on',mode==='sec127');if(mode!=='sec127'||!SQ)return _f.apply(this,arguments);const now=performance.now(),dt=Math.min((now-lastT)/1000,.05)||0;lastT=now;try{last=now}catch(e){}
  try{tick(now,dt)}catch(e){console.error('sec127',e)}try{if(window.PV76&&PV76.paint)PV76.paint()}catch(e){}requestAnimationFrame(frame)}}
 /* 폰: 화면을 누르고 있으면 앞으로 걷기 */
 {const f=toLobby;toLobby=function(){if(mode==='sec127'){SQ=null;mode='boss'}return f.apply(this,arguments)}}

 const st=document.createElement('style');st.textContent=`#key127{position:fixed;left:50%;bottom:calc(120px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:9400;padding:12px 22px;border:0;border-radius:999px;font:900 17px/1 sans-serif;color:#2a1c08;background:linear-gradient(180deg,#ffe58a,#e0a83a);box-shadow:0 0 0 2px #fff9,0 0 24px #ffd84aaa;animation:eg126c 1.4s ease-in-out infinite}#key127[hidden]{display:none}html.sec127on #songInfo{display:none!important}`;document.head.appendChild(st);
 window.SEC127={IDX,useKey,KEYP,SV,startFight,get SQ(){return SQ},get F(){return F},kit:{hitMe,spark,slashFx,clampB,B:{BX0,BX1,BY0,BY1},DM:()=>DM[diff]||1,dpop,hero,txt,ltxt,bubble,brickC,torch,R0,snd,asFoe,kneelImg,foeWp}};
}catch(e){console.error('v127 secret room',e)}})();
