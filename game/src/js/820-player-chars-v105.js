/* ================= 플레이어 캐릭터 10명 리디자인 v105 =================
   기존 14×17 칸 → 두 배 해상도(28×34)로 새로 그림. 자동 외곽선 · 음영 · 테두리 빛,
   걷기 4프레임 · 숨쉬기 · 눈 깜빡임 · 머플러/망토/날개/꼬리 흔들림. drawKnight 자리에 그대로 들어감. */
const CH2={cv:null,out:null};
function ch2Cv(){if(!CH2.cv){for(const k of ['cv','sh','out']){const c=document.createElement('canvas');c.width=40;c.height=48;CH2[k]=c}}return CH2}
/* 그리기 도구 (좌표: 28×34 도트, 가운데 x=14, 발바닥 y=34 · 캔버스 안쪽으로 6px 여백) */
function ch2API(o){const OX=6,OY=10;const Q={o,
 R:(x,y,w,h,c,a)=>{if(a!=null)o.globalAlpha=a;o.fillStyle=c;o.fillRect(Math.round(x+OX),Math.round(y+OY),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)));if(a!=null)o.globalAlpha=1},
 C:(x,y,r,c,a)=>{if(a!=null)o.globalAlpha=a;o.fillStyle=c;for(let yy=-Math.ceil(r);yy<=Math.ceil(r);yy++){const dx=Math.sqrt(Math.max(0,r*r-yy*yy));if(dx<.5)continue;o.fillRect(Math.round(x+OX-dx),Math.round(y+OY+yy),Math.max(1,Math.round(dx*2)),1)}if(a!=null)o.globalAlpha=1},
 E:(x,y,rx,ry,c,a)=>{if(a!=null)o.globalAlpha=a;o.fillStyle=c;for(let yy=-Math.ceil(ry);yy<=Math.ceil(ry);yy++){const dx=rx*Math.sqrt(Math.max(0,1-(yy*yy)/(ry*ry)));if(dx<.5)continue;o.fillRect(Math.round(x+OX-dx),Math.round(y+OY+yy),Math.max(1,Math.round(dx*2)),1)}if(a!=null)o.globalAlpha=1},
 P:(pts,c,a)=>{if(a!=null)o.globalAlpha=a;o.fillStyle=c;o.beginPath();pts.forEach((p,i)=>{const X=Math.round(p[0]+OX),Y=Math.round(p[1]+OY);i?o.lineTo(X,Y):o.moveTo(X,Y)});o.closePath();o.fill();if(a!=null)o.globalAlpha=1},
 L:(x0,y0,x1,y1,c,a)=>{const n=Math.max(1,Math.ceil(Math.hypot(x1-x0,y1-y0)));for(let i=0;i<=n;i++){const k=i/n;Q.R(x0+(x1-x0)*k,y0+(y1-y0)*k,1,1,c,a)}},
 px:(x,y,c,a)=>Q.R(x,y,1,1,c,a)};return Q}
/* 공통 부품 */
function ch2Legs(Q,f,pants,boot,sock){const PO=CH2.pose;if(PO&&PO.legs){const L=PO.legs;if(L==='wide'){for(const x of [8,18]){Q.R(x,27,3,4,pants);if(sock)Q.R(x,30,3,1,sock);Q.R(x-(x<14?1:0),31,4,2,boot);Q.R(x-(x<14?1:0),31,4,1,shade(boot,1.35))}return}
  if(L==='kick'){const sd=PO.side||1,st=sd>0?10:16,kx=sd>0?16:10;Q.R(st,27,3,4,pants);if(sock)Q.R(st,30,3,1,sock);Q.R(st-1,31,4,2,boot);Q.R(kx,27,3,2,pants);Q.R(kx+sd*3,27,4,2,pants);Q.R(kx+sd*6,26,3,3,boot);return}
  if(L==='tuck'){for(const x of [10,16]){Q.R(x,26,3,3,pants);Q.R(x-(x<14?1:0),28,4,2,boot)}return}}const sw=[0,1,0,-1][f],lx=10+sw,rx=16-sw,ly=[0,-1,0,0][f],ry=[0,0,0,-1][f];Q.R(lx,27+ly,3,4,pants);Q.R(rx,27+ry,3,4,pants);if(sock){Q.R(lx,30+ly,3,1,sock);Q.R(rx,30+ry,3,1,sock)}Q.R(lx-1,31+ly,4,2,boot);Q.R(rx,31+ry,4,2,boot);Q.R(lx-1,31+ly,4,1,shade(boot,1.35));Q.R(rx,31+ry,4,1,shade(boot,1.35))}
function ch2Arms(Q,f,col,hand,dy){const PO=CH2.pose;dy=dy||0;if(PO&&PO.arms&&PO.arms!=='down'){const A=PO.arms,sd=PO.side||1;
  const up=(x)=>{Q.R(x,10+dy,3,9,col);Q.R(x,8+dy,3,2,hand)},down=(x)=>{Q.R(x,19+dy,3,6,col);Q.R(x,25+dy,3,2,hand)},out=(x,dir)=>{Q.R(dir<0?x-5:x,19+dy,8,3,col);Q.R(dir<0?x-7:x+8,19+dy,2,3,hand)},hip=(x,dir)=>{Q.R(x,19+dy,3,3,col);Q.R(x+dir*2,22+dy,3,3,col);Q.R(x,24+dy,3,1,hand)};
  const diag=(dir)=>{const x0=dir<0?8:20;for(let i=0;i<7;i++)Q.R(x0+dir*i*.9-1,19+dy-i*1.3,3,3,col);Q.R(x0+dir*7-1,9+dy,3,2,hand)};
  if(A==='up'){up(5);up(20)}else if(A==='wave'){if(sd>0){down(7);up(20)}else{up(5);down(18)}}else if(A==='out'){out(7,-1);out(18,1)}else if(A==='point'){if(sd>0){hip(7,-1);diag(1)}else{diag(-1);hip(18,1)}}else if(A==='vee'){diag(-1);diag(1)}else{down(7);down(18)}return}const sw=[0,-1,0,1][f];Q.R(7,19+(dy||0)+sw,3,6,col);Q.R(18,19+(dy||0)-sw,3,6,col);Q.R(7,25+(dy||0)+sw,3,2,hand);Q.R(18,25+(dy||0)-sw,3,2,hand)}
function ch2Eyes(Q,blink,iris,y,gap,big){y=y||14;gap=gap||3;const h=big?4:3;for(const s of [-1,1]){const x=14+s*gap-(s<0?2:0);if(blink){Q.R(x,y+h-2,2,1,'#1a1020')}else{Q.R(x,y,2,h,'#1a1020');Q.R(x,y+1,2,h-1,iris);Q.px(x,y,'#ffffff');if(big)Q.px(x+1,y+h-1,'#ffffff',.6)}}}
function ch2Head(Q,skin,y){y=y||12;Q.E(14,y,7.5,7,skin);Q.R(8,y+2,12,4,skin)}
function ch2Cheek(Q,y,c){Q.R(9,y,2,1,c||'#ff9aa8',.7);Q.R(17,y,2,1,c||'#ff9aa8',.7)}
/* ================= 10명 ================= */
const CH2DEF=[
 /* 0 하루 · 시계공 견습생: 부스스한 갈색 머리, 이마에 황동 고글, 주황 머플러, 청록 조끼와 회중시계 */
 {paint(Q,f,b,bl,t){const skin='#ffd8b8',hair='#6a3a1e',hd='#4a2410';
  /* 머플러 꼬리 (뒤) */for(let i=0;i<6;i++){const w=Math.sin(t*9+i*.9)*(i*.35);Q.R(19+i*1.6,19+b+w+i*.4,2,2,i%2?'#ff8a5c':'#e0603a')}
  ch2Legs(Q,f,'#3a4a5a','#5a3a22');Q.P([[8,19+b],[20,19+b],[21,28],[7,28]],'#2e8a86');Q.R(8,19+b,12,2,'#3aa8a0');Q.R(13,20+b,2,8,'#1e5a58');Q.R(15,23+b,3,3,'#e8c060');Q.px(16,24+b,'#6a4a10');Q.L(15,23+b,12,21+b,'#e8c060');
  ch2Arms(Q,f,'#2e8a86',skin,b);ch2Head(Q,skin,12+b);ch2Eyes(Q,bl,'#3a6ab0',13+b);ch2Cheek(Q,17+b);Q.R(13,18+b,2,1,'#c86a5a');
  /* 머리카락 */Q.E(14,7+b,8.5,5,hair);Q.P([[5,9+b],[9,5+b],[8,12+b]],hair);Q.P([[23,9+b],[19,5+b],[20,12+b]],hair);for(let i=0;i<5;i++)Q.P([[8+i*3,8+b],[10+i*3,8+b],[9+i*3,12+b]],hd);Q.P([[12,2+b],[15,1+b],[14,4+b]],hair);
  /* 고글 */Q.R(7,7+b,14,2,'#8a5a2a');for(const s of [-1,1]){Q.C(14+s*3.5,7.5+b,2.4,'#c89a40');Q.C(14+s*3.5,7.5+b,1.5,'#8ae8ff');Q.px(13+s*3.5,6.5+b,'#ffffff')}
  /* 머플러 (앞) */Q.R(8,17+b,12,3,'#ff8a5c');Q.R(8,17+b,12,1,'#ffb08a');Q.R(18,18+b,3,4,'#e0603a')}},
 /* 1 미나 · 고양이 후드: 분홍 고양이 귀 후드, 방울, 흔들리는 꼬리 */
 {paint(Q,f,b,bl,t){const skin='#ffe0d0';const tw=Math.sin(t*4)*2;Q.L(19,27,23+tw*.5,24,'#ff9ec4');Q.L(23+tw*.5,24,24+tw,19,'#ff9ec4');Q.C(24+tw,18.5,1.4,'#ffd0e0');
  ch2Legs(Q,f,'#fff6fa','#a0587a','#ff9ec4');Q.P([[8,19+b],[20,19+b],[21,28],[7,28]],'#ff9ec4');Q.R(8,26,13,2,'#d06a94');Q.R(12,21+b,4,3,'#ffd0e0');ch2Arms(Q,f,'#ff9ec4',skin,b);
  /* 후드 */Q.E(14,11+b,9.5,8.5,'#ff9ec4');Q.P([[5,6+b],[7,-1+b],[11,4+b]],'#ff9ec4');Q.P([[23,6+b],[21,-1+b],[17,4+b]],'#ff9ec4');Q.P([[7,5+b],[8,1+b],[10,4+b]],'#ffd0e0');Q.P([[21,5+b],[20,1+b],[18,4+b]],'#ffd0e0');
  Q.E(14,13+b,7,6.5,skin);Q.R(8,8+b,12,3,'#ff9ec4');for(let i=0;i<4;i++)Q.P([[8+i*3,10+b],[11+i*3,10+b],[9+i*3,13+b]],'#8a5a3a');ch2Eyes(Q,bl,'#8a4ac8',13+b,3,true);ch2Cheek(Q,17+b);Q.px(13,18+b,'#d06a94');Q.px(15,18+b,'#d06a94');Q.px(14,17+b,'#ff8aa0');
  /* 방울 */Q.C(14,20+b,1.6,'#ffd166');Q.px(14,21+b,'#8a6a10');Q.px(13,19+b,'#ffffff')}},
 /* 2 도윤 · 광부: 노란 안전모와 램프 빛, 흙 묻은 얼굴, 멜빵바지, 등에 곡괭이 */
 {paint(Q,f,b,bl,t){const skin='#f0c8a0';Q.L(4,10,22,26,'#6a4a28');Q.L(4,11,22,27,'#4a3218');Q.P([[1,8],[7,8],[8,10],[2,11]],'#8a969c');
  ch2Legs(Q,f,'#4a6a8a','#3a2a1a');Q.P([[8,19+b],[20,19+b],[21,28],[7,28]],'#c8561a');Q.R(9,21+b,10,7,'#4a6a8a');Q.R(10,19+b,2,3,'#4a6a8a');Q.R(16,19+b,2,3,'#4a6a8a');Q.px(10,22+b,'#ffcf3a');Q.px(17,22+b,'#ffcf3a');ch2Arms(Q,f,'#c8561a',skin,b);
  ch2Head(Q,skin,13+b);ch2Eyes(Q,bl,'#2a2018',14+b);Q.R(9,17+b,2,1,'#8a6a4a',.6);Q.R(17,16+b,1,2,'#8a6a4a',.6);Q.R(12,18+b,4,1,'#6a4a28');Q.R(8,10+b,12,2,'#3a2a1a');
  /* 안전모 */Q.E(14,8+b,9,5,'#ffcf3a');Q.R(4,9+b,20,2,'#e0a820');Q.R(10,4+b,8,1,'#fff08a');Q.R(12,4+b,4,5,'#c8961a');Q.C(14,6+b,2,'#fffbe0');Q.px(14,6+b,Math.floor(t*4)%2?'#ffffff':'#fff6a0')}},
 /* 3 세라 · 별빛 마법사: 큰 보라 마녀 모자(끝의 별이 박자에 맞춰 반짝), 긴 은발, 별무늬 망토 */
 {paint(Q,f,b,bl,t){const skin='#ffe8d8',tw=.5+.5*Math.sin(t*6);for(let i=0;i<5;i++){const w=Math.sin(t*5+i)*1.2;Q.P([[7+i*3,20],[10+i*3,20],[9+i*3+w,31]],i%2?'#5a3aa0':'#3a2470')}
  ch2Legs(Q,f,'#2a1a40','#5a3aa0');Q.P([[8,19+b],[20,19+b],[22,28],[6,28]],'#5a3aa0');Q.R(13,19+b,2,9,'#ffe36b');for(const [x,y] of [[9,23],[18,25],[11,26]])Q.px(x,y+b,'#ffe36b');ch2Arms(Q,f,'#5a3aa0',skin,b);
  /* 은발 */Q.P([[6,12+b],[22,12+b],[23,24+b],[5,24+b]],'#c8c8e8');Q.R(6,20+b,2,5,'#e8e8ff');ch2Head(Q,skin,13+b);Q.R(8,9+b,12,4,'#c8c8e8');ch2Eyes(Q,bl,'#7a4ac8',14+b,3,true);ch2Cheek(Q,18+b);Q.px(14,18+b,'#d06a94');
  /* 모자 */Q.E(14,9+b,11,2.5,'#3a2470');Q.P([[8,9+b],[20,9+b],[18,2+b],[21,-4+b],[13,1+b]],'#7a4ac8');Q.R(9,7+b,11,2,'#ffe36b');Q.P([[18,2+b],[21,-4+b],[19,1+b]],'#5a3aa0');
  Q.C(21.5,-4.5+b,1.4+tw*.6,'#ffe36b');Q.px(21,-5+b,'#ffffff');Q.R(21,-8+b,1,2,'#ffe36b',tw);Q.R(21,-2+b,1,1,'#ffe36b',tw)}},
 /* 4 강철 · 로봇 소년: 크롬 머리에 청록 바이저, 깜빡이는 안테나, 가슴 창 속 도는 태엽, 제트 부츠 */
 {paint(Q,f,b,bl,t){const g=t*6;ch2Legs(Q,f,'#7a8a94','#4a5a64');for(const x of [10,16])Q.R(x,33,3,1,'#ff9a3a',.5+.4*Math.sin(t*20));
  Q.P([[8,19+b],[20,19+b],[21,28],[7,28]],'#4a6a80');Q.R(8,19+b,12,2,'#b8c4cc');Q.C(14,23.5+b,3,'#1c2e38');for(let i=0;i<6;i++){const a=g+i*TAU/6;Q.px(14+Math.cos(a)*2,23.5+b+Math.sin(a)*2,'#ffd166')}Q.px(14,23+b,'#ffd166');ch2Arms(Q,f,'#b8c4cc','#7a8a94',b);Q.R(7,23+b,3,1,'#4a5a64');Q.R(18,23+b,3,1,'#4a5a64');
  /* 머리 */Q.R(6,5+b,16,13,'#b8c4cc');Q.R(6,5+b,16,2,'#eef4f8');Q.R(7,17+b,14,1,'#7a8a94');Q.R(7,9+b,14,5,'#1c2e38');const sc=(Math.floor(t*3)%12);if(!bl){Q.R(8+sc,10+b,2,3,'#7df9ff');Q.R(9,10+b,3,3,'#7df9ff',.7);Q.R(16,10+b,3,3,'#7df9ff',.7)}else Q.R(9,11+b,10,1,'#3a8a9a');
  Q.R(5,9+b,1,5,'#7a8a94');Q.R(22,9+b,1,5,'#7a8a94');Q.R(13,1+b,2,4,'#7a8a94');Q.C(14,1+b,1.5,Math.floor(t*2)%2?'#ff4d6d':'#6a1a24');Q.R(10,15+b,8,1,'#4a5a64')}},
 /* 5 루나 · 달의 기사: 은빛 투구 위 초승달 볏, 빛나는 눈구멍, 휘날리는 푸른 망토 */
 {paint(Q,f,b,bl,t){for(let i=0;i<6;i++){const w=Math.sin(t*4+i*.7)*1.5;Q.P([[6+i*3,19],[10+i*3,19],[9+i*3+w,32]],i%2?'#3a6ac8':'#24448a')}
  ch2Legs(Q,f,'#5a6a7c','#2a3448');Q.P([[8,19+b],[20,19+b],[21,28],[7,28]],'#d8e0ec');Q.R(8,19+b,12,2,'#ffffff');Q.R(13,21+b,2,6,'#8a9aac');Q.R(9,25+b,10,2,'#3a6ac8');ch2Arms(Q,f,'#d8e0ec','#8a9aac',b);Q.R(6,18+b,4,3,'#ffffff');Q.R(18,18+b,4,3,'#ffffff');
  /* 투구 */Q.E(14,11+b,8,8,'#d8e0ec');Q.R(6,11+b,16,7,'#d8e0ec');Q.R(7,5+b,14,2,'#ffffff');Q.R(8,12+b,12,3,'#161c22');if(!bl){Q.R(9,13+b,4,1,'#8dd8ff');Q.R(15,13+b,4,1,'#8dd8ff')}Q.R(13,11+b,2,7,'#8a9aac');for(let i=0;i<3;i++)Q.R(9+i*2,16+b,1,2,'#8a9aac');for(let i=0;i<3;i++)Q.R(16+i*2,16+b,1,2,'#8a9aac');
  /* 초승달 볏 */Q.C(14,1+b,4,'#fff0a0');Q.o.save();Q.o.globalCompositeOperation='destination-out';Q.C(15.5,-.5+b,3.4,'#000');Q.o.restore();Q.R(13,3+b,2,2,'#fff0a0')}},
 /* 6 카이 · 그림자 닌자: 검은 두건과 복면, 휘날리는 붉은 머리띠 두 가닥, 허리의 표창 */
 {paint(Q,f,b,bl,t){for(let k=0;k<2;k++)for(let i=0;i<7;i++){const w=Math.sin(t*10+i*.8+k)*(i*.4);Q.R(19+i*1.5,8+b+k*2+w+i*.3,2,1,'#ff3a4a')}
  ch2Legs(Q,f,'#1a1a24','#101018');Q.P([[8,19+b],[20,19+b],[21,28],[7,28]],'#2a2a3a');Q.R(8,24+b,13,2,'#ff3a4a');Q.C(18,25+b,1.6,'#c9d3d8');Q.px(18,25+b,'#1a1a24');ch2Arms(Q,f,'#2a2a3a','#f0caa4',b);Q.R(8,21+b,3,1,'#1a1a24');
  Q.E(14,12+b,8,7.5,'#2a2a3a');Q.R(8,11+b,12,4,'#f0caa4');if(!bl){Q.R(9,12+b,3,2,'#ffffff');Q.R(16,12+b,3,2,'#ffffff');Q.R(10,12+b,2,2,'#1a1a24');Q.R(17,12+b,2,2,'#1a1a24');Q.P([[8,11+b],[12,12+b],[12,11+b]],'#1a1a24');Q.P([[20,11+b],[16,12+b],[16,11+b]],'#1a1a24')}else{Q.R(9,13+b,3,1,'#1a1a24');Q.R(16,13+b,3,1,'#1a1a24')}
  Q.R(6,8+b,16,2,'#ff3a4a');Q.R(6,8+b,16,1,'#ff7a84');Q.R(8,15+b,12,4,'#1a1a24');Q.R(8,15+b,12,1,'#3a3a4a')}},
 /* 7 아린 · 숲의 요정: 나뭇잎 머리와 꽃, 파닥이는 꽃잎 날개, 늘 살짝 떠 있음 */
 {paint(Q,f,b,bl,t){const fl=Math.sin(t*14)>0,wy=fl?-2:1;b+=Math.round(Math.sin(t*3)*1)-1;
  Q.E(5,18+b+wy,5,fl?7:5,'#c8f8ff',.7);Q.E(23,18+b+wy,5,fl?7:5,'#c8f8ff',.7);Q.E(6,23+b,3.5,3,'#ffc8f0',.7);Q.E(22,23+b,3.5,3,'#ffc8f0',.7);Q.L(3,15+b+wy,7,21+b,'#ffffff',.6);Q.L(25,15+b+wy,21,21+b,'#ffffff',.6);
  ch2Legs(Q,0,'#2e8a4a','#2e6a3a');Q.P([[8,19+b],[20,19+b],[23,28],[5,28]],'#5ad07a');for(let i=0;i<5;i++)Q.P([[5+i*3.6,28],[8+i*3.6,28],[6.5+i*3.6,30]],'#2e8a4a');Q.R(12,20+b,4,2,'#ff8ad0');ch2Arms(Q,0,'#5ad07a','#ffe8d0',b);
  ch2Head(Q,'#ffe8d0',13+b);ch2Eyes(Q,bl,'#2e8a4a',14+b,3,true);ch2Cheek(Q,18+b);Q.px(14,18+b,'#ff9ab0');
  /* 나뭇잎 머리 */for(let i=0;i<7;i++){const a=-Math.PI+i*Math.PI/6;Q.P([[14+Math.cos(a)*5,9+b+Math.sin(a)*4],[14+Math.cos(a)*10,9+b+Math.sin(a)*8],[14+Math.cos(a+.3)*7,9+b+Math.sin(a+.3)*5]],i%2?'#5ad07a':'#2e8a4a')}Q.E(14,8+b,8,4,'#5ad07a');Q.C(20,6+b,2,'#ff8ad0');Q.px(20,6+b,'#ffe36b');
  for(let i=0;i<3;i++){const q=((t*.8)+i/3)%1;Q.px(4+i*9,30-q*20,'#ffe36b',1-q)}}},
 /* 8 제노 · 용기사: 붉은 용 투구와 흰 뿔, 불꽃 눈, 비늘 갑옷, 투구 틈에서 불씨 */
 {paint(Q,f,b,bl,t){ch2Legs(Q,f,'#801a24','#3a1010');Q.P([[7,19+b],[21,19+b],[22,28],[6,28]],'#c8323a');for(let j=0;j<3;j++)for(let i=0;i<4;i++)Q.P([[8+i*3+(j%2)*1.5,21+j*2+b],[11+i*3+(j%2)*1.5,21+j*2+b],[9.5+i*3+(j%2)*1.5,23+j*2+b]],'#801a24');ch2Arms(Q,f,'#c8323a','#801a24',b);Q.R(5,18+b,5,3,'#801a24');Q.R(18,18+b,5,3,'#801a24');
  /* 투구 */Q.E(14,11+b,8.5,7.5,'#c8323a');Q.P([[7,14+b],[21,14+b],[18,19+b],[10,19+b]],'#c8323a');Q.R(8,12+b,12,3,'#1a0608');if(!bl){Q.R(9,13+b,3,1,'#ffcf3a');Q.R(16,13+b,3,1,'#ffcf3a')}for(let i=0;i<4;i++)Q.R(10+i*2,17+b,1,2,'#f0e6c8');
  for(const s of [-1,1]){Q.P([[14+s*6,7+b],[14+s*8,6+b],[14+s*12,-1+b],[14+s*9,5+b]],'#f0e6c8');Q.P([[14+s*5,3+b],[14+s*6,1+b],[14+s*7,5+b]],'#801a24')}Q.P([[12,4+b],[14,-1+b],[16,4+b]],'#801a24');
  for(let i=0;i<3;i++){const q=((t*1.5)+i/3)%1;Q.px(14+Math.sin(q*9+i)*2,17+b-q*10,q<.5?'#ffcf3a':'#ff6a2a',1-q)}}},
 /* 9 오로라 · 황금 성기사: 왕관 투구, 머리 위 빛의 고리, 흰 금 갑옷, 금테 흰 망토 */
 {paint(Q,f,b,bl,t){for(let i=0;i<6;i++){const w=Math.sin(t*3.5+i*.7)*1.3;Q.P([[6+i*3,19],[10+i*3,19],[9+i*3+w,32]],i%2?'#f4f6f8':'#d8dce8')}Q.R(5,31,18,1,'#ffd84a');
  ch2Legs(Q,f,'#b8c4cc','#c89a20');Q.P([[7,19+b],[21,19+b],[22,28],[6,28]],'#f4f6f8');Q.R(7,19+b,14,2,'#ffd84a');Q.P([[11,21+b],[17,21+b],[14,27+b]],'#ffd84a');Q.C(14,23+b,1.3,'#ff4d6d');ch2Arms(Q,f,'#f4f6f8','#b8c4cc',b);for(const x of [5,19]){Q.R(x,18+b,5,3,'#ffd84a');Q.R(x,18+b,5,1,'#fff8c8')}
  Q.E(14,11+b,8,7.5,'#f4f6f8');Q.R(6,11+b,16,7,'#f4f6f8');Q.R(8,12+b,12,3,'#161c22');if(!bl){Q.R(9,13+b,4,1,'#8dd8ff');Q.R(15,13+b,4,1,'#8dd8ff')}Q.R(13,11+b,2,7,'#ffd84a');
  /* 왕관 */for(let i=0;i<5;i++)Q.P([[7+i*3,6+b],[10+i*3,6+b],[8.5+i*3,1+b-(i===2?2:0)]],'#ffd84a');Q.R(7,5+b,14,2,'#c89a20');Q.C(14,5+b,1,'#ff4d6d');
  /* 빛의 고리 */const r=.5+.5*Math.sin(t*2);Q.o.save();Q.o.globalAlpha=.6+.3*r;Q.o.strokeStyle='#fff6c8';Q.o.beginPath();Q.o.ellipse(20,5+b,6,1.6,0,0,TAU);Q.o.stroke();Q.o.restore()}}];
/* 외곽선 · 음영 · 테두리 빛 */
function ch2Finish(src){const M=ch2Cv(),out=M.out,oc=out.getContext('2d'),sh=M.sh,sc=sh.getContext('2d');oc.clearRect(0,0,40,48);sc.clearRect(0,0,40,48);
 sc.drawImage(src,0,0);sc.globalCompositeOperation='source-atop';const g=sc.createLinearGradient(0,10,0,44);g.addColorStop(0,'rgba(255,255,255,.12)');g.addColorStop(.5,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,20,.28)');sc.fillStyle=g;sc.fillRect(0,0,40,48);
 const rg=sc.createLinearGradient(6,0,34,0);rg.addColorStop(0,'rgba(255,255,255,.06)');rg.addColorStop(1,'rgba(0,0,30,.2)');sc.fillStyle=rg;sc.fillRect(0,0,40,48);sc.globalCompositeOperation='source-over';
 for(const [dx,dy] of [[-1,0],[1,0],[0,-1],[0,1]])oc.drawImage(sh,dx,dy);oc.globalCompositeOperation='source-in';oc.fillStyle='#0c0f16';oc.fillRect(0,0,40,48);oc.globalCompositeOperation='source-over';oc.drawImage(sh,0,0);
 /* 윗면 빛 */oc.globalCompositeOperation='source-atop';oc.globalAlpha=.35;oc.drawImage(sh,0,1);oc.globalAlpha=1;oc.globalCompositeOperation='source-over';return out}
function ch2Render(idx,f,b,bl,t){const D=CH2DEF[idx]||CH2DEF[0],M=ch2Cv(),o=M.cv.getContext('2d');o.setTransform(1,0,0,1,0,0);o.globalAlpha=1;o.globalCompositeOperation='source-over';o.clearRect(0,0,40,48);o.imageSmoothingEnabled=false;
 try{D.paint(ch2API(o),f,b,bl,t)}catch(e){if(!CH2.err){CH2.err=1;console.error('ch2',idx,e)}}return ch2Finish(M.cv)}
function ch2Draw(c,idx,x,y,s,fl,wt,idleT){const now=performance.now(),t=now/1000;
 let f=0,b=0;if(wt!=null){f=((Math.floor(wt/(Math.PI/2))%4)+4)%4;b=f%2?-1:0}else if(idleT!=null)b=Math.round(Math.sin(idleT)*.6);const bl=Math.floor(now/170)%26===0;
 const out=ch2Render(idx,f,b,bl,t);
 /* 원래 칸 상자(왼쪽 x-s, 위 y-6s, 14s×17s)에 맞춰 두 배 해상도로 붙임 */const k=s/2,X=x-s-6*k,Y=y-6*s-10*k;const sm=c.imageSmoothingEnabled;c.imageSmoothingEnabled=false;
 if(fl){c.save();c.translate(Math.round(X+40*k),Math.round(Y));c.scale(-1,1);c.drawImage(out,0,0,Math.round(40*k),Math.round(48*k));c.restore()}else c.drawImage(out,Math.round(X),Math.round(Y),Math.round(40*k),Math.round(48*k));c.imageSmoothingEnabled=sm}
{const _dk=drawKnight;drawKnight=function(c,x,y,s,fl,wt,idleT){const idx=(shopInv().eq.ch)||0;if(!CH2DEF[idx])return _dk.apply(this,arguments);ch2Draw(c,idx,x,y,s,fl,wt,idleT)}}
/* 상점 미리보기 등에서 특정 캐릭터를 그릴 때 */
function ch2DrawIdx(c,idx,x,y,s,fl,wt,idleT){ch2Draw(c,idx,x,y,s,fl,wt,idleT)}
/* ================= 로비 무대 댄스 ================= */
const DANCE=[
 {n:'통통 바운스',f(b,q,e){return {arms:'down',f:b%2?1:3,sy:1-.1*e,sx:1+.07*e,dy:-Math.sin(q*Math.PI)*2}}},
 {n:'손 흔들기',f(b,q,e){const sd=b%2?1:-1;return {arms:'wave',side:sd,tilt:sd*.1*Math.sin(q*Math.PI),dx:sd*2}}},
 {n:'점프 점프',f(b,q,e){const h=Math.sin(q*Math.PI);return {arms:h>.3?'vee':'down',legs:h>.4?'tuck':null,dy:-h*18,sy:q<.12||q>.88?.9:1.04,sx:q<.12||q>.88?1.1:.97}}},
 {n:'빙글빙글',f(b,q,e){const p=((b%2)+q)/2;return {arms:'out',sx:Math.cos(p*TAU),dy:-Math.sin(p*Math.PI)*6,spark:1}}},
 {n:'디스코 포인트',f(b,q,e){const sd=Math.floor(b/2)%2?1:-1;return {arms:'point',side:sd,tilt:sd*.14,dx:sd*3*Math.sin(q*Math.PI),legs:b%2?'wide':null}}},
 {n:'로봇 춤',f(b,q,e){const st=Math.floor(q*4)/4,sd=b%2?1:-1;return {arms:st<.5?'out':(sd>0?'wave':'wave'),side:sd,legs:'wide',tilt:sd*.06*(st<.5?1:-1),dx:Math.round(sd*st*4)}}},
 {n:'발차기 셔플',f(b,q,e){const sd=Math.floor(q*2)%2?1:-1;return {arms:'out',legs:'kick',side:sd,dx:sd*4,dy:-Math.abs(Math.sin(q*TAU))*3}}},
 {n:'피날레',f(b,q,e){if(b%8<6)return {arms:'down',legs:'wide',sy:.86+.02*b%8,sx:1.08,dy:3};return {arms:'vee',legs:'wide',dy:-Math.sin(q*Math.PI)*10,yeah:1}}}];
const DZ={last:-1,iv:484,prevAt:0,pops:[]};
function ch2Dance(c,cx,fy,s,now,beatN,lastBeat,env){const idx=(shopInv().eq.ch)||0;if(!CH2DEF[idx])return false;
 if(beatN!==DZ.last){if(DZ.prevAt){const d=now-DZ.prevAt;if(d>200&&d<1200)DZ.iv+=(d-DZ.iv)*.3}DZ.prevAt=now;DZ.last=beatN;if(Math.random()<.45)DZ.pops.push({t:now,x:(Math.random()-.5)*30,ch:['♪','♫','★','♥'][Math.floor(Math.random()*4)]})}
 const q=Math.min(.999,Math.max(0,(now-(lastBeat||now))/DZ.iv)),mv=DANCE[Math.floor(beatN/8)%DANCE.length],b=beatN%8,P=mv.f(b,q,env||0);
 CH2.pose={arms:P.arms,legs:P.legs,side:P.side};let out;try{out=ch2Render(idx,P.f||0,0,Math.floor(now/170)%26===0,now/1000)}finally{CH2.pose=null}
 const k=s/2,sm=c.imageSmoothingEnabled;c.imageSmoothingEnabled=false;
 /* 그림자 */c.save();c.globalAlpha=.35;c.fillStyle='#000';c.beginPath();c.ellipse(cx,fy+1,(10+(P.dy||0)*.2)*k*2,3*k,0,0,TAU);c.fill();c.restore();
 c.save();c.translate(Math.round(cx+(P.dx||0)*k),Math.round(fy+(P.dy||0)*k));if(P.tilt)c.rotate(P.tilt);c.scale((P.sx==null?1:P.sx)*(Math.abs(P.sx==null?1:P.sx)<.08?.08*Math.sign(P.sx||1):1),P.sy||1);c.drawImage(out,-20*k,-44*k,40*k,48*k);c.restore();
 /* 반짝이 · 음표 */if(P.spark)for(let i=0;i<6;i++){const a=now/150+i*TAU/6;c.fillStyle=i%2?'#ffe36b':'#8ae8ff';c.fillRect(Math.round(cx+Math.cos(a)*16*k),Math.round(fy-18*k+Math.sin(a)*6*k),Math.max(2,k),Math.max(2,k))}
 DZ.pops=DZ.pops.filter(p=>now-p.t<1100);c.save();c.textAlign='center';for(const p of DZ.pops){const e=(now-p.t)/1100;c.globalAlpha=1-e;c.font='900 '+Math.round(7*k)+'px sans-serif';c.fillStyle=p.ch==='♥'?'#ff8ab0':p.ch==='★'?'#ffe36b':'#8ae8ff';c.fillText(p.ch,cx+p.x*k+Math.sin(e*6)*4*k,fy-40*k-e*24*k)}c.globalAlpha=1;
 if(P.yeah){c.font='900 '+Math.round(9*k)+'px '+FONT_STACK;c.fillStyle='#ffffff';c.fillText('YEAH!',cx,fy-50*k)}
 c.font='700 '+Math.round(4.5*k)+'px '+FONT_STACK;c.fillStyle='#ffffff';c.globalAlpha=.55;c.fillText('♪ '+mv.n,cx,fy+10*k);c.restore();c.imageSmoothingEnabled=sm;return true}

