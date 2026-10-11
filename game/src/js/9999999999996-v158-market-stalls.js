/* ================= v158 시장 가게 새로 만들기 (MK158) =================
   - 시장 거리(PB156)의 가게 8곳을 하나하나 새로 그린다. 가게마다 구조 · 물건 · 장식 · 상인이 모두 다르다.
     0 과일(나무 상자 비탈 진열 · 수박 · 포도 · 바나나 송이)  1 생선(얼음 위 생선 · 문어 · 새우 · 말린 생선 줄 · 저울)
     2 물약(층층 선반 병 · 끓는 가마솥 · 양초)  3 빵(바게트 바구니 · 둥근 빵 · 크루아상 · 파이 · 칠판 메뉴)
     4 보석(유리 진열장 · 벨벳 받침 · 목걸이 · 반짝임)  5 옷감(천 두루마리 · 걸린 스카프 · 실패)
     6 꽃(양동이 꽃다발 · 걸이 화분 · 화분)  7 무기(검 받침대 · 방패 · 도끼 · 투구)
   - 그림은 세 겹: 뒤(기둥 · 뒤 천 · 뒤 선반) → 상인(매 프레임, 몸짓 · 눈 깜빡임) → 앞(계산대 · 진열 물건 · 차양 · 매단 것).
     뒤 · 앞은 처음 보일 때 세 배 해상도 캔버스로 그려 두고 그대로 붙인다.
   - 상인 8명: 과일 아주머니(두건 · 사과 들어 보이기) · 어부(노란 비옷 모자 · 수염 · 손짓) · 연금술사(뾰족 모자 · 안경 · 솥 젓기) ·
     제빵사(흰 모자 · 콧수염 · 반죽) · 보석상(실크 모자 · 외알 안경 · 보석 닦기) · 재단사(올린 머리 · 줄자) ·
     꽃집 소녀(꽃관 · 땋은 머리 · 꽃 향기) · 대장장이(민머리 · 수염 · 가죽 앞치마 · 망치질).
   - 가끔 상인이 말풍선으로 손님을 부른다. PB156.stall 로 원래 가게 그리기를 대신한다. */
(()=>{try{
 const PB=window.PB156;if(!PB)return;
 const TAU=Math.PI*2,SC=3,OX=50,OY=84,IW=100,IH=92;/* 그림 판: 가게 바닥 가운데 기준 왼쪽 50 · 위 84 */
 let sd=1;const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647,rr=(a,b)=>a+(b-a)*rnd();
 const hr=(k,j)=>{const v=Math.sin(k*12.9898+j*78.233)*43758.5453;return v-Math.floor(v)};/* 매 프레임 같은 값(깜빡임 없게) */
 const hsl=(h,s,l,a)=>'hsla('+h+','+s+'%,'+l+'%,'+(a==null?1:a)+')';
 const LG=(o,x0,y0,x1,y1,st)=>{const g=o.createLinearGradient(x0,y0,x1,y1);st.forEach(([t,c])=>g.addColorStop(t,c));return g};
 const RG=(o,x,y,r0,r,st)=>{const g=o.createRadialGradient(x,y,r0,x,y,r);st.forEach(([t,c])=>g.addColorStop(t,c));return g};
 const el=(o,x,y,rx,ry,c,rot)=>{o.fillStyle=c;o.beginPath();o.ellipse(x,y,Math.max(.01,rx),Math.max(.01,ry),rot||0,0,TAU);o.fill()};
 const rc=(o,x,y,w,h,c)=>{o.fillStyle=c;o.fillRect(x,y,w,h)};
 const rrect=(o,x,y,w,h,r)=>{o.beginPath();if(o.roundRect)o.roundRect(x,y,w,h,r);else o.rect(x,y,w,h)};
 /* ---------- 나무 · 천 · 차양 ---------- */
 function planks(o,x,y,w,h,hue,l,vert){const n=vert?Math.ceil(w/5):Math.ceil(h/4);for(let i=0;i<n;i++){const L=l+rr(-5,5);
   if(vert){const px=x+i*5,pw=Math.min(5,x+w-px);o.fillStyle=LG(o,px,0,px+pw,0,[[0,hsl(hue,38,L-4)],[.5,hsl(hue,40,L+3)],[1,hsl(hue,38,L-6)]]);o.fillRect(px,y,pw-.3,h);rc(o,px+pw-.4,y,.4,h,'rgba(0,0,0,.35)')}
   else{const py=y+i*4,ph=Math.min(4,y+h-py);o.fillStyle=LG(o,0,py,0,py+ph,[[0,hsl(hue,38,L+4)],[1,hsl(hue,38,L-5)]]);o.fillRect(x,py,w,ph-.3);rc(o,x,py+ph-.4,w,.4,'rgba(0,0,0,.35)')}
   for(let k=0;k<3;k++)rc(o,vert?x+i*5+rr(.5,4):x+rr(0,w),vert?y+rr(0,h):y+i*4+rr(.8,3),vert?.3:rr(2,6),vert?rr(2,6):.3,'rgba(30,15,5,.25)')}/* 나뭇결 */
  rc(o,x,y,w,.6,'rgba(255,230,190,.25)')}
 function post(o,x,y0,y1){o.fillStyle=LG(o,x-1.6,0,x+1.6,0,[[0,'#2a1a0e'],[.4,'#7a5030'],[1,'#22140a']]);o.fillRect(x-1.6,y0,3.2,y1-y0);rc(o,x-2.2,y1-2,4.4,2,'#3a2414')}
 function cloth(o,x,y,w,h,c1,c2){for(let i=0;i<w;i+=3){const t=Math.sin(i*1.3)*.5+.5;o.fillStyle=LG(o,x+i,0,x+i+3,0,[[0,c2],[.5,c1],[1,c2]]);o.fillRect(x+i,y,Math.min(3,x+w-x-i),h)}
  o.fillStyle=LG(o,0,y,0,y+h,[[0,'rgba(0,0,0,.35)'],[.3,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.25)']]);o.fillRect(x,y,w,h)}
 /* 차양: 비스듬한 천 + 물결 끝 + 아래 그늘. kind 0 줄무늬 / 1 무늬 없음 + 테 / 2 격자 */
 function awning(o,c1,c2,kind,w){const x0=-w/2,x1=w/2,yt=-82,yb=-66,n=Math.round(w/8);
  o.fillStyle='rgba(0,0,0,.28)';o.beginPath();o.moveTo(x0+2,yb+1);o.lineTo(x1-2,yb+1);o.lineTo(x1-4,yb+8);o.lineTo(x0+4,yb+8);o.fill();/* 아래 그늘 */
  for(let k=0;k<n;k++){const a=x0+k*w/n,b=x0+(k+1)*w/n,col=kind===0?(k%2?c2:c1):c1;
   o.fillStyle=LG(o,0,yt,0,yb,[[0,col],[1,col]]);o.beginPath();o.moveTo(a+3,yt);o.lineTo(b+3,yt);o.lineTo(b,yb);o.lineTo(a,yb);o.closePath();o.fill();
   o.fillStyle=col;o.beginPath();o.arc((a+b)/2,yb,(b-a)/2,0,Math.PI);o.fill();
   o.fillStyle=LG(o,a,0,b,0,[[0,'rgba(0,0,0,.18)'],[.5,'rgba(255,255,255,.12)'],[1,'rgba(0,0,0,.2)']]);o.beginPath();o.moveTo(a+3,yt);o.lineTo(b+3,yt);o.lineTo(b,yb);o.lineTo(a,yb);o.closePath();o.fill()}
  o.fillStyle=LG(o,0,yt,0,yb+4,[[0,'rgba(255,240,220,.28)'],[.5,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.3)']]);o.fillRect(x0,yt,w+3,yb-yt+4);
  if(kind===1){o.strokeStyle=c2;o.lineWidth=1;o.beginPath();o.moveTo(x0,yb-1.5);o.lineTo(x1,yb-1.5);o.stroke();for(let k=0;k<n;k++){o.fillStyle=c2;o.beginPath();o.arc(x0+(k+.5)*w/n,yb+3.2,.9,0,TAU);o.fill()}}
  if(kind===2){o.strokeStyle='rgba(255,255,255,.25)';o.lineWidth=.5;for(let x=x0;x<x1;x+=4){o.beginPath();o.moveTo(x+3,yt);o.lineTo(x,yb);o.stroke()}for(let y=yt+3;y<yb;y+=3.5){o.beginPath();o.moveTo(x0,y);o.lineTo(x1+3,y);o.stroke()}}
  rc(o,x0+2,yt-1.4,w+2,1.6,'#3a2414');rc(o,x0+2,yt-1.4,w+2,.5,'#8a6038')}
 /* 계산대: 판자 + 윗판 + (천 덮개) */
 function counter(o,w,hue,l,drape,dc){const x=-w/2;planks(o,x,-21,w,21,hue,l,1);o.fillStyle=LG(o,0,-25,0,-21,[[0,hsl(hue,40,l+14)],[1,hsl(hue,40,l)]]);o.fillRect(x-2,-25,w+4,4);rc(o,x-2,-25,w+4,.7,'rgba(255,240,210,.45)');rc(o,x-2,-21.2,w+4,1,'rgba(0,0,0,.45)');
  if(drape){o.fillStyle=dc[0];o.beginPath();o.moveTo(x-1,-21);o.lineTo(x+w+1,-21);o.lineTo(x+w+1,-14);for(let k=0;k<=10;k++){const xx=x+w+1-k*(w+2)/10;o.quadraticCurveTo(xx+(w+2)/20,-10,xx,-14)}o.closePath();o.fill();
   o.fillStyle=dc[1];for(let k=0;k<10;k++)o.fillRect(x+k*(w+2)/10+(w+2)/20-.3,-21,.6,7);rc(o,x-1,-21,w+2,.8,dc[1])}}
 function plate(o,y,txt,bg,fg){o.font='900 6.4px sans-serif';const tw=o.measureText(txt).width+9;rc(o,-tw/2+.6,y+.8,tw,9,'rgba(0,0,0,.4)');o.fillStyle=bg;rrect(o,-tw/2,y,tw,9,2);o.fill();o.strokeStyle='#e8c060';o.lineWidth=.6;rrect(o,-tw/2+.6,y+.6,tw-1.2,7.8,1.6);o.stroke();
  o.fillStyle=fg;o.textAlign='center';o.fillText(txt,0,y+6.8);for(const sx of [-tw/2+2,tw/2-2]){el(o,sx,y+4.5,.6,.6,'#e8c060')}}
 function tag(o,x,y,t){o.save();o.translate(x,y);o.rotate(-.12);rc(o,-4,-2.6,8,5.2,'#f4ecd8');rc(o,-4,-2.6,8,.6,'#fff');o.fillStyle='#3a2a1a';o.font='800 3.4px sans-serif';o.textAlign='center';o.fillText(t,0,1.4);o.restore()}
 /* ---------- 물건 ---------- */
 const apple=(o,x,y,r,c)=>{el(o,x+.3,y+.4,r,r*.9,'rgba(0,0,0,.3)');o.fillStyle=RG(o,x-r*.35,y-r*.35,r*.1,r*1.1,[[0,hsl(c[0],c[1],c[2]+22)],[.6,hsl(c[0],c[1],c[2])],[1,hsl(c[0],c[1],c[2]-14)]]);o.beginPath();o.arc(x,y,r,0,TAU);o.fill();
  rc(o,x-.15,y-r-.8,.3,1,'#4a2c16');el(o,x+.6,y-r-.4,.7,.3,'#4a8a2a',-.4);el(o,x-r*.35,y-r*.4,r*.25,r*.18,'rgba(255,255,255,.55)')};
 const crateBox=(o,x,y,w,h,tilt)=>{o.save();o.translate(x,y);o.rotate(tilt||0);planks(o,-w/2,-h,w,h,30,40,0);o.strokeStyle='#3a2414';o.lineWidth=.6;o.strokeRect(-w/2+.3,-h+.3,w-.6,h-.6);o.restore()};
 function fish(o,x,y,len,rot,col,bel){o.save();o.translate(x,y);o.rotate(rot);const h=len*.32;
  o.fillStyle=LG(o,0,-h,0,h,[[0,col],[.55,col],[.6,bel],[1,bel]]);o.beginPath();o.moveTo(-len/2,0);o.quadraticCurveTo(-len*.1,-h*1.1,len*.35,-h*.2);o.lineTo(len/2,-h*.8);o.lineTo(len*.44,0);o.lineTo(len/2,h*.8);o.lineTo(len*.35,h*.2);o.quadraticCurveTo(-len*.1,h*1.1,-len/2,0);o.fill();
  o.strokeStyle='rgba(0,0,0,.25)';o.lineWidth=.25;for(let k=1;k<5;k++){o.beginPath();o.arc(-len*.28+k*len*.1,0,h*.5,-1,1);o.stroke()}
  o.fillStyle='rgba(255,255,255,.4)';o.beginPath();o.ellipse(-len*.05,-h*.45,len*.25,h*.15,0,0,TAU);o.fill();
  el(o,-len*.36,-h*.15,h*.28,h*.28,'#f0f0f0');el(o,-len*.36,-h*.15,h*.14,h*.14,'#101010');rc(o,-len*.28,-h*.5,.3,h,'rgba(0,0,0,.3)');o.restore()}
 function bottle(o,x,y,kind,c,sz){sz=sz||1;o.save();o.translate(x,y);o.scale(sz,sz);const g=RG(o,-1,-3,.3,4.5,[[0,'rgba(255,255,255,.9)'],[.3,c],[1,'rgba(0,0,0,.6)']]);
  if(kind===0){o.fillStyle=g;o.beginPath();o.arc(0,-2.8,2.8,0,TAU);o.fill();rc(o,-.7,-7.4,1.4,2.2,'#d8e0f0');rc(o,-.9,-8.2,1.8,1,'#8a5a2a')}
  else if(kind===1){o.fillStyle=g;rrect(o,-2,-7,4,7,1);o.fill();rc(o,-.6,-9,1.2,2,'#d8e0f0');rc(o,-.8,-9.8,1.6,.9,'#c8a050')}
  else{o.fillStyle=g;o.beginPath();o.moveTo(-.7,-7);o.lineTo(.7,-7);o.lineTo(2.8,0);o.lineTo(-2.8,0);o.closePath();o.fill();rc(o,-.9,-8,1.8,1,'#4a2c16')}
  rc(o,-1.4,-4.4,.6,2.4,'rgba(255,255,255,.55)');o.restore()}
 function loaf(o,x,y,kind){if(kind===0){o.save();o.translate(x,y);o.rotate(-.5);o.fillStyle=LG(o,0,-1.6,0,1.6,[[0,'#e8b060'],[1,'#a8642a']]);rrect(o,-7,-1.6,14,3.2,1.6);o.fill();for(let k=-2;k<=2;k++){o.strokeStyle='#f4d8a0';o.lineWidth=.5;o.beginPath();o.moveTo(k*2.4-.8,-1.2);o.lineTo(k*2.4+.8,1);o.stroke()}o.restore()}
  else if(kind===1){o.fillStyle=RG(o,x-1,y-2,.4,4.6,[[0,'#f0c070'],[.7,'#b8702c'],[1,'#7a4818']]);o.beginPath();o.ellipse(x,y,4.4,3,0,0,TAU);o.fill();o.strokeStyle='#f4d8a0';o.lineWidth=.5;o.beginPath();o.moveTo(x-2.4,y-1.2);o.lineTo(x+2.4,y-1.2);o.moveTo(x-1.4,y+.4);o.lineTo(x+1.4,y+.4);o.stroke()}
  else if(kind===2){for(let k=-2;k<=2;k++){el(o,x+k*1.5,y-Math.abs(k)*-.3,1.5-Math.abs(k)*.15,1.7-Math.abs(k)*.3,k%2?'#d8903a':'#e8a850')}el(o,x-.5,y-1,1.4,.5,'rgba(255,240,200,.6)')}
  else{el(o,x,y+.6,5,2,'#7a4818');el(o,x,y,5,1.8,'#c87a30');o.fillStyle='#8a1a3a';o.beginPath();o.ellipse(x,y-.3,3.6,1.1,0,0,TAU);o.fill();o.strokeStyle='#f0c080';o.lineWidth=.5;for(let k=-1;k<=1;k++){o.beginPath();o.moveTo(x+k*2-1,y-1);o.lineTo(x+k*2+1,y+.4);o.stroke()}}}
 function gem(o,x,y,r,c){o.fillStyle=c;o.beginPath();o.moveTo(x,y-r);o.lineTo(x+r*.9,y-r*.2);o.lineTo(x,y+r);o.lineTo(x-r*.9,y-r*.2);o.closePath();o.fill();o.fillStyle='rgba(255,255,255,.55)';o.beginPath();o.moveTo(x,y-r);o.lineTo(x+r*.9,y-r*.2);o.lineTo(x,y-r*.1);o.closePath();o.fill();o.fillStyle='rgba(0,0,0,.3)';o.beginPath();o.moveTo(x,y+r);o.lineTo(x+r*.9,y-r*.2);o.lineTo(x,y-r*.1);o.closePath();o.fill()}
 function flower(o,x,y,c,r){for(let k=0;k<5;k++){const a=k/5*TAU;el(o,x+Math.cos(a)*r*.7,y+Math.sin(a)*r*.7,r*.55,r*.55,c)}el(o,x,y,r*.4,r*.4,'#ffe070');el(o,x-r*.3,y-r*.5,r*.3,r*.2,'rgba(255,255,255,.4)')}
 function sword(o,x,y,len,rot,hilt){o.save();o.translate(x,y);o.rotate(rot);o.fillStyle=LG(o,-1.2,0,1.2,0,[[0,'#8a92a0'],[.5,'#f0f4fa'],[1,'#6a7280']]);o.beginPath();o.moveTo(-1.1,0);o.lineTo(1.1,0);o.lineTo(1.1,-len+2);o.lineTo(0,-len);o.lineTo(-1.1,-len+2);o.closePath();o.fill();rc(o,-.15,-len+2,.3,len-3,'rgba(80,90,100,.6)');
  rc(o,-3.4,0,6.8,1.3,hilt);rc(o,-.8,1.3,1.6,4,'#4a2c16');el(o,0,6,1.2,1.2,hilt);o.restore()}
 /* ---------- 가게별 뒤 · 앞 ---------- */
 const D=[
 {/* 0 과일 */aw:['#c8283c','#f8f0e4',0],ct:[30,42],sign:['과일','#2a6a2a','#fff8d0'],
  back(o){cloth(o,-38,-64,76,40,'#e8dcc0','#b8a888');rc(o,-36,-40,72,2.4,'#5a3a20');
   for(let k=0;k<3;k++)crateBox(o,-26+k*26,-40,22,9,0);for(let k=0;k<22;k++){const cx=-36+((k*7)%72)+rr(-1,1);apple(o,cx,-41-(k%3)*1.4,1.8,[[0,80,46],[28,90,52],[50,85,55]][k%3])}},
  front(o){/* 비탈 진열 상자 4칸 */const C=[[0,80,46],[30,95,52],[95,55,40],[48,90,58]];for(let k=0;k<4;k++){const bx=-30+k*20;crateBox(o,bx,-25,18,7,0);for(let j=0;j<9;j++)apple(o,bx-6+(j%3)*6+rr(-.4,.4),-31+Math.floor(j/3)*-2.6+ (j%2)*.3,2.6-(k===2?.6:0),C[k])}
   /* 포도 */for(let j=0;j<12;j++)el(o,-40+(j%4)*1.6+Math.floor(j/4)*.8,-30+Math.floor(j/4)*1.6,1,1,j%3?'#6a2a8a':'#8a4aaa');rc(o,-38,-33,.4,2,'#4a6a2a');
   /* 수박 반쪽 */el(o,36,-29,5.6,3.6,'#2a6a2a');el(o,36,-29.6,5,3,'#e83a4a');for(let k=0;k<5;k++)el(o,33+k*1.5,-29.6+(k%2)*.6,.3,.5,'#1a1a1a');el(o,36,-29.6,5.4,3.4,'rgba(0,0,0,0)');o.strokeStyle='#e8f0c0';o.lineWidth=.5;o.beginPath();o.ellipse(36,-29.6,5.1,3.1,0,0,TAU);o.stroke();
   tag(o,-22,-21,'3G');tag(o,2,-21,'2G');tag(o,22,-21,'5G');
   /* 바나나 송이(매달림) */for(let k=0;k<5;k++){o.save();o.translate(22+k*1.2,-60);o.rotate(.3-k*.12);o.fillStyle=LG(o,-1,0,1,0,[[0,'#c8a020'],[.5,'#ffe060'],[1,'#a88010']]);o.beginPath();o.moveTo(0,0);o.quadraticCurveTo(2.6,4,1,8);o.lineTo(-.4,7.6);o.quadraticCurveTo(1,4,-1,0);o.fill();rc(o,.4,7.4,.8,.8,'#3a2a10');o.restore()}rc(o,23.5,-66,.6,6,'#6a5030')}},
 {/* 1 생선 */aw:['#2a6ab0','#f0f6ff',0],ct:[205,30],sign:['생선','#1a3a6a','#d8f0ff'],
  back(o){cloth(o,-38,-64,76,40,'#5a7a9a','#3a5a7a');/* 그물 */o.strokeStyle='rgba(220,230,240,.35)';o.lineWidth=.4;for(let x=-36;x<36;x+=3.4){o.beginPath();o.moveTo(x,-62);o.lineTo(x+6,-40);o.stroke();o.beginPath();o.moveTo(x+6,-62);o.lineTo(x,-40);o.stroke()}
   for(const [x,y] of [[-28,-56],[24,-54]]){o.strokeStyle='#e8c070';o.lineWidth=.8;o.beginPath();o.arc(x,y,3,0,TAU);o.stroke()}/* 부표 */el(o,-28,-50,2.6,2.6,'#e84a3a');el(o,-28,-50,2.6,1.2,'#f8f0e8')},
  front(o){/* 얼음 상자 */rc(o,-40,-30,80,6,'#5a4a3a');o.fillStyle=LG(o,0,-34,0,-26,[[0,'#f4fcff'],[1,'#b8d8e8']]);o.fillRect(-39,-33,78,4);for(let k=0;k<40;k++){o.fillStyle='rgba(255,255,255,'+rr(.4,.9)+')';o.fillRect(rr(-39,39),rr(-34,-29),rr(.6,1.6),rr(.4,1))}
   const F=[['#7a8aa0','#e8eef4'],['#c86a4a','#f8e0d0'],['#4a6a5a','#d8e8d0'],['#8a7aa0','#e8e0f0']];for(let k=0;k<7;k++)fish(o,-32+k*10.4,-33.2-(k%2)*.8,11,(k%2?-.12:.1),F[k%4][0],F[k%4][1]);
   /* 새우 바구니 */el(o,-36,-27,5,2,'#8a6030');for(let k=0;k<6;k++){o.strokeStyle='#ff7a5a';o.lineWidth=1.1;o.beginPath();o.arc(-38+k*1.4,-29,1.2,Math.PI*.2,Math.PI*1.4);o.stroke()}
   /* 문어 */el(o,34,-31,3.6,3,'#c84a6a');for(let k=0;k<5;k++){o.strokeStyle='#c84a6a';o.lineWidth=.9;o.beginPath();o.moveTo(31+k*1.5,-29);o.quadraticCurveTo(30+k*1.8,-26,32+k*1.4,-25);o.stroke()}el(o,33,-32,.6,.6,'#fff');el(o,35,-32,.6,.6,'#fff');
   /* 저울 */rc(o,10,-40,.6,8,'#8a8a96');rc(o,4,-40,12,.6,'#8a8a96');el(o,4,-37,3,1,'#b0b0bc');el(o,16,-37,3,1,'#b0b0bc');rc(o,8,-32,5,1.4,'#6a6a76');
   tag(o,-14,-21,'7G');tag(o,14,-21,'9G');
   /* 말린 생선 줄 */o.strokeStyle='#6a5030';o.lineWidth=.4;o.beginPath();o.moveTo(-36,-64);o.quadraticCurveTo(-18,-60,-2,-64);o.stroke();for(let k=0;k<5;k++)fish(o,-32+k*7,-58+Math.sin(k)*.6,6,Math.PI/2,'#a8885a','#d8c8a0')}},
 {/* 2 물약 */aw:['#5a2a8a','#e8c060',1],ct:[270,22],drape:['#3a1a5a','#e8c060'],sign:['물약','#2a1040','#e8d0ff'],
  back(o){cloth(o,-38,-64,76,40,'#3a2a50','#22182e');for(let k=0;k<20;k++){o.fillStyle='rgba(255,230,150,'+rr(.3,.8)+')';const x=rr(-36,36),y=rr(-62,-42);o.fillRect(x,y,.6,.6);o.fillRect(x-.6,y+.1,.3,.3)}/* 별 무늬 */
   for(const sy of [-52,-40]){planks(o,-36,sy,72,2.4,25,30,0);for(let k=0;k<12;k++)bottle(o,-33+k*6,sy,k%3,hsl((k*47+sy)%360,80,55),.85)}},
  front(o){/* 가마솥 */el(o,24,-26,8,2.4,'#14141a');o.fillStyle=RG(o,22,-31,1,9,[[0,'#4a4a56'],[1,'#14141a']]);o.beginPath();o.arc(24,-30,7.6,0,Math.PI);o.fill();el(o,24,-30,7.6,2.2,'#2a2a32');el(o,24,-30,6.6,1.7,'#5aff8a');el(o,22,-30.4,2.4,.6,'rgba(220,255,230,.7)');
   for(let k=0;k<8;k++){const x=-36+k*6.6;bottle(o,x,-25,(k+1)%3,hsl((k*61)%360,85,55),1.1)}
   /* 양초 */for(const [x,h] of [[-6,6],[-2,4]]){rc(o,x-1,-25-h,2,h,'#f4ecd8');rc(o,x-.2,-26.4-h,.4,1.4,'#2a1a0e');el(o,x,-28-h,.8,1.6,'#ffd070')}
   /* 책 */rc(o,6,-29,9,4,'#6a2a2a');rc(o,6,-29,9,.6,'#c8a050');rc(o,7,-33,8,4,'#2a4a6a');rc(o,7,-33,8,.6,'#c8a050');
   tag(o,-28,-21,'15G');
   /* 매단 마른 약초 */for(let k=0;k<4;k++){const x=-30+k*7;rc(o,x,-66,.4,4,'#6a5030');for(let j=0;j<6;j++)el(o,x+rr(-1.4,1.4),-60+j*1.2,.9,.5,hsl(rr(80,110),40,rr(28,40)),rr(-1,1))}}},
 {/* 3 빵 */aw:['#e07a20','#fff4dc',0],ct:[32,48],sign:['빵','#6a3a1a','#ffe8c0'],
  back(o){cloth(o,-38,-64,76,40,'#f0e0c0','#c8b090');rc(o,-36,-40,72,2.4,'#7a5030');/* 칠판 메뉴 */rc(o,-34,-62,22,16,'#5a3a20');rc(o,-33,-61,20,14,'#2a3a30');o.fillStyle='#f0f0e8';o.font='700 2.8px sans-serif';o.textAlign='left';['바게트 2G','크루아상 3G','파이 6G'].forEach((t,i)=>o.fillText(t,-32,-56+i*3.6));
   for(let k=0;k<5;k++)loaf(o,-4+k*8,-43,1);for(let k=0;k<3;k++)loaf(o,2+k*10,-50,2)},
  front(o){/* 바게트 바구니 2개 */for(const bx of [-30,30]){o.fillStyle='#a87a40';o.beginPath();o.moveTo(bx-8,-31);o.lineTo(bx+8,-31);o.lineTo(bx+6,-25);o.lineTo(bx-6,-25);o.closePath();o.fill();o.strokeStyle='#6a4a20';o.lineWidth=.4;for(let k=0;k<3;k++){o.beginPath();o.moveTo(bx-7.4+k*.6,-30+k*1.8);o.lineTo(bx+7.4-k*.6,-30+k*1.8);o.stroke()}
    for(let k=0;k<4;k++)loaf(o,bx-4+k*2.6,-34-k*.6,0)}
   for(let k=0;k<4;k++)loaf(o,-14+k*7.4,-28,1);for(let k=0;k<3;k++)loaf(o,-10+k*8,-31.6,2);loaf(o,14,-28.4,3);
   /* 둥근 빵 위 밀가루 */for(let k=0;k<20;k++)rc(o,rr(-18,14),rr(-31,-26),.3,.3,'rgba(255,255,255,.7)');
   tag(o,-30,-21,'2G');tag(o,30,-21,'3G');
   /* 매단 밀 이삭 */for(let k=0;k<3;k++){const x=26+k*3;rc(o,x,-66,.4,8,'#c8a050');for(let j=0;j<5;j++){el(o,x-.6,-60+j*1.1,.6,.4,'#e8c060',-.5);el(o,x+.8,-60+j*1.1,.6,.4,'#e8c060',.5)}}}},
 {/* 4 보석 */aw:['#1a1a2a','#e8c060',1],ct:[260,18],drape:['#6a1030','#e8c060'],sign:['보석','#14141e','#ffe8a0'],
  back(o){cloth(o,-38,-64,76,40,'#5a1030','#3a0820');/* 목걸이 걸이 */rc(o,-34,-60,68,1,'#c8a050');for(let k=0;k<5;k++){const x=-28+k*14;o.strokeStyle='#e8d090';o.lineWidth=.5;o.beginPath();o.moveTo(x-4,-60);o.quadraticCurveTo(x,-50,x+4,-60);o.stroke();gem(o,x,-51,1.8,hsl(k*70,85,60))}},
  front(o){/* 유리 진열장 */rc(o,-36,-34,72,9,'#2a1a14');rc(o,-35,-33,70,7,'#4a0a20');for(let k=0;k<9;k++){el(o,-30+k*7.4,-28.4,2.6,1.2,'#7a1a3a');gem(o,-30+k*7.4,-30.2,1.9,['#ff4a8a','#4ad8ff','#ffd84a','#7aff8a','#c8a2ff'][k%5])}
   o.fillStyle='rgba(200,230,255,.16)';o.fillRect(-36,-38,72,13);o.strokeStyle='rgba(230,240,255,.6)';o.lineWidth=.5;o.strokeRect(-36,-38,72,13);o.fillStyle='rgba(255,255,255,.35)';for(let k=0;k<4;k++){o.beginPath();o.moveTo(-30+k*18,-25);o.lineTo(-26+k*18,-38);o.lineTo(-24.6+k*18,-38);o.lineTo(-28.6+k*18,-25);o.fill()}
   /* 반지 받침 */for(const x of [-42,40]){rc(o,x-2,-33,4,8,'#3a3a44');el(o,x,-33,3.6,1.4,'#6a1a3a');o.strokeStyle='#e8c060';o.lineWidth=.6;o.beginPath();o.arc(x,-35,1.6,0,TAU);o.stroke();gem(o,x,-36.8,1,'#ff4a8a')}
   tag(o,0,-21,'99G')}},
 {/* 5 옷감 */aw:['#1a8a8a','#f0fff8',2],ct:[30,36],sign:['옷감','#0a4a4a','#d8fff4'],
  back(o){cloth(o,-38,-64,76,40,'#e8e0d0','#b8b0a0');/* 걸린 스카프 */const C=['#c83a5a','#3a8ac8','#e8c040','#8a4ac8','#3aa85a'];for(let k=0;k<5;k++){const x=-32+k*15;o.fillStyle=LG(o,x,0,x+8,0,[[0,C[k]],[.5,hsl(k*60,70,70)],[1,C[k]]]);o.beginPath();o.moveTo(x,-62);o.lineTo(x+8,-62);o.lineTo(x+7,-44);o.lineTo(x+4,-42);o.lineTo(x+1,-44);o.closePath();o.fill();for(let j=0;j<4;j++)rc(o,x+1+j*2,-44,.3,2,C[k])}
   rc(o,-36,-63,72,1.2,'#8a6038')},
  front(o){/* 천 두루마리 더미 */const C=[['#c83a5a','#ff8aa0'],['#2a6ab0','#8ac0ff'],['#e8b030','#fff0a0'],['#3a9a5a','#a0f0b0'],['#7a3aa8','#d0a0ff'],['#e0e0e0','#ffffff'],['#a8582a','#e8a070']];
   for(let r=0;r<2;r++)for(let k=0;k<(r?6:7);k++){const x=-36+k*11+r*5.5,y=-27-r*4.6,c=C[(k+r*3)%7];o.fillStyle=LG(o,0,y-2.4,0,y+2.4,[[0,c[1]],[.5,c[0]],[1,hsl(0,0,10,.6)]]);rrect(o,x-5,y-2.4,10,4.8,1.6);o.fill();el(o,x+5,y,1.2,2.4,c[1]);el(o,x+5,y,.5,.9,'#6a4a2a');for(let j=0;j<3;j++)rc(o,x-4+j*3,y-2.2,.3,4.4,'rgba(0,0,0,.12)')}
   /* 실패 · 가위 */for(let k=0;k<3;k++){const x=30+k*4;rc(o,x-1.4,-38,2.8,.8,'#a87a40');el(o,x,-40,1.4,2,['#ff4a6a','#4a8aff','#ffd84a'][k]);rc(o,x-1.4,-42,2.8,.8,'#a87a40')}
   o.strokeStyle='#c8d0dc';o.lineWidth=.6;o.beginPath();o.moveTo(-40,-36);o.lineTo(-34,-38);o.moveTo(-40,-38);o.lineTo(-34,-36);o.stroke();o.strokeStyle='#c83a3a';o.beginPath();o.arc(-41,-36,.9,0,TAU);o.arc(-41,-38,.9,0,TAU);o.stroke();
   tag(o,-20,-21,'4G');tag(o,20,-21,'6G')}},
 {/* 6 꽃 */aw:['#2a8a4a','#fff0a0',0],ct:[35,46],sign:['꽃','#2a5a2a','#ffe8f0'],
  back(o){cloth(o,-38,-64,76,40,'#d8e8c8','#a8b898');/* 덩굴 */for(let k=0;k<70;k++)el(o,rr(-37,37),-64+Math.abs(rr(-1,1))*10+rr(0,8),rr(1,2.2),rr(.8,1.6),hsl(rr(95,130),rr(40,55),rr(22,38)),rr(0,3));for(let k=0;k<14;k++)flower(o,rr(-34,34),rr(-62,-50),['#ff8aa8','#ffffff','#ffd166'][k%3],1.3);
   rc(o,-36,-40,72,2.4,'#6a4a2a');for(let k=0;k<6;k++){const x=-30+k*12;o.fillStyle=LG(o,x-3,0,x+3,0,[[0,'#8a4a2a'],[.5,'#c87a4a'],[1,'#6a3a1a']]);o.beginPath();o.moveTo(x-3,-46);o.lineTo(x+3,-46);o.lineTo(x+2.2,-40);o.lineTo(x-2.2,-40);o.closePath();o.fill();for(let j=0;j<6;j++)el(o,x+rr(-3,3),-47-rr(0,4),1.4,1,hsl(115,45,30));flower(o,x,-50,['#ff4a6a','#c8a2ff','#ffd166','#ff9a4a','#ffffff','#ff8aa8'][k],1.8)}},
  front(o){/* 양동이 꽃다발 */const C=['#ff4a6a','#ffd166','#ffffff','#c8a2ff','#ff9a4a','#ff8ad0'];for(let k=0;k<5;k++){const x=-32+k*16;o.fillStyle=LG(o,x-5,0,x+5,0,[[0,'#6a7280'],[.4,'#c8d0dc'],[1,'#4a5260']]);o.beginPath();o.moveTo(x-5,-34);o.lineTo(x+5,-34);o.lineTo(x+4,-25);o.lineTo(x-4,-25);o.closePath();o.fill();rc(o,x-5,-34,10,.8,'#e8f0f8');
    for(let j=0;j<10;j++){rc(o,x+rr(-3,3),-40+rr(0,4),.4,6,'#3a6a2a')}for(let j=0;j<9;j++)flower(o,x+rr(-4,4),-38-rr(0,5),C[(k+j%2)%6],1.6);for(let j=0;j<5;j++)el(o,x+rr(-5,5),-35-rr(0,3),1.6,.8,hsl(110,45,30),rr(-1,1))}
   tag(o,0,-21,'1G');
   /* 걸이 화분 */for(const x of [-30,30]){o.strokeStyle='#6a5030';o.lineWidth=.4;o.beginPath();o.moveTo(x-3,-58);o.lineTo(x,-66);o.lineTo(x+3,-58);o.stroke();el(o,x,-57,4,2.4,'#8a4a2a');for(let j=0;j<10;j++){o.strokeStyle=hsl(115,45,32);o.lineWidth=.6;o.beginPath();const a=rr(-1,1);o.moveTo(x+a*2,-57);o.quadraticCurveTo(x+a*5,-54,x+a*4,-50+rr(0,3));o.stroke()}for(let j=0;j<4;j++)flower(o,x+rr(-3,3),-59+rr(0,2),'#ff8aa8',1.1)}}},
 {/* 7 무기 */aw:['#4a3a3a','#c8a050',1],ct:[22,26],drape:['#3a2a2a','#a88040'],sign:['무기','#1a1a1e','#ffcf8a'],
  back(o){planks(o,-38,-64,76,40,22,24,1);/* 방패 3개 */for(let k=0;k<3;k++){const x=-24+k*24,y=-54,c=['#8a2a2a','#2a4a8a','#3a6a3a'][k];o.fillStyle=LG(o,x-6,0,x+6,0,[[0,c],[.5,hsl(k*120,40,50)],[1,c]]);o.beginPath();o.moveTo(x-6,y-6);o.lineTo(x+6,y-6);o.lineTo(x+6,y+1);o.quadraticCurveTo(x,y+9,x-6,y+1);o.closePath();o.fill();
    o.strokeStyle='#c8c0b0';o.lineWidth=.9;o.stroke();rc(o,x-.6,y-5,1.2,10,'#e8c060');rc(o,x-5,y-1.6,10,1.2,'#e8c060');el(o,x,y-1,1.2,1.2,'#f0e0a0')}
   /* 도끼 · 창 */o.save();o.translate(-34,-40);o.rotate(-.15);rc(o,-.6,-22,1.2,22,'#6a4424');o.fillStyle='#b8c0cc';o.beginPath();o.moveTo(0,-20);o.quadraticCurveTo(6,-18,6,-13);o.lineTo(0,-15);o.fill();o.restore();o.save();o.translate(34,-40);o.rotate(.12);rc(o,-.5,-24,1,24,'#6a4424');o.fillStyle='#d8e0ea';o.beginPath();o.moveTo(0,-29);o.lineTo(1.6,-24);o.lineTo(-1.6,-24);o.fill();o.restore()},
  front(o){/* 검 받침대 */rc(o,-34,-40,30,2,'#4a2c16');rc(o,-34,-30,30,2,'#4a2c16');for(let k=0;k<5;k++)sword(o,-31+k*6,-25,18,0,['#c8a050','#8a8a96','#c83a3a','#3a6ac8','#e8c060'][k]);
   /* 투구 */const hx=12,hy=-28;o.fillStyle=RG(o,hx-2,hy-4,.5,7,[[0,'#e8eef4'],[.6,'#8a929e'],[1,'#3a3e48']]);o.beginPath();o.arc(hx,hy,6,Math.PI,0);o.lineTo(hx+6,hy+2);o.lineTo(hx-6,hy+2);o.closePath();o.fill();rc(o,hx-4,hy-1,8,1,'#14141a');rc(o,hx-.5,hy-1,1,3,'#14141a');o.fillStyle='#c83a3a';o.beginPath();o.moveTo(hx,hy-6);o.quadraticCurveTo(hx+5,hy-10,hx+8,hy-4);o.lineTo(hx+1,hy-5);o.fill();
   /* 단검 · 숫돌 */sword(o,28,-26.4,10,Math.PI/2+.1,'#c8a050');sword(o,30,-29,9,Math.PI/2-.08,'#8a8a96');rc(o,-2,-28,6,2.4,'#6a6a72');rc(o,-2,-28,6,.5,'#9a9aa6');
   tag(o,-18,-21,'40G');tag(o,18,-21,'25G')}}];
 /* ---------- 그림 만들기 ---------- */
 const IMG={};
 function mk(fn){const cv=document.createElement('canvas');cv.width=IW*SC;cv.height=IH*SC;const o=cv.getContext('2d');o.scale(SC,SC);o.translate(OX,OY);fn(o);return cv}
 function build(i){if(IMG[i])return IMG[i];const d=D[i];sd=17+i*31;
  const back=mk(o=>{el(o,0,1,46,7,'rgba(5,5,15,.35)');post(o,-38,-82,0);post(o,38,-82,0);d.back(o);rc(o,-38,-26,76,3,'rgba(0,0,0,.35)')});
  const front=mk(o=>{counter(o,80,d.ct[0],d.ct[1],!!d.drape,d.drape);d.front(o);plate(o,-15,d.sign[0],d.sign[1],d.sign[2]);awning(o,d.aw[0],d.aw[1],d.aw[2],84);
   /* 차양 그늘이 계산대 위에 */o.fillStyle=LG(o,0,-62,0,-30,[[0,'rgba(0,0,0,.25)'],[1,'rgba(0,0,0,0)']]);o.globalCompositeOperation='source-atop';o.fillRect(-42,-62,84,32);o.globalCompositeOperation='source-over'});
  return IMG[i]={back,front}}
 /* ---------- 상인 ---------- */
 const SKIN=['#f4c8a0','#e0a878','#f8d8b8','#f0c090','#e8b890','#f8d0b0','#ffe0c8','#c88a60'];
 function face(c,x,y,i,t,o){/* 머리 */const sk=SKIN[i];c.fillStyle=RG(c,x-1.4,y-1.6,.4,5.4,[[0,'#fff0e0'],[.35,sk],[1,'rgba(150,90,60,1)']]);c.beginPath();c.ellipse(x,y,4.2,4.6,0,0,TAU);c.fill();
  el(c,x-4.1,y+.4,.9,1.3,sk);el(c,x+4.1,y+.4,.9,1.3,sk);/* 귀 */
  const bl=((t*1000+i*733)%3800)<130;/* 눈 깜빡 */const lk=o.look||0;
  for(const s of [-1,1]){const ex=x+s*1.6+lk*.4,ey=y+.2;if(bl){c.strokeStyle='#2a1a10';c.lineWidth=.45;c.beginPath();c.moveTo(ex-.8,ey);c.lineTo(ex+.8,ey);c.stroke()}else{el(c,ex,ey,.85,1,'#fff');el(c,ex+lk*.3,ey+.1,.55,.75,o.eye||'#3a2414');el(c,ex+lk*.3-.2,ey-.25,.18,.18,'#fff')}
   c.strokeStyle=o.brow||'#4a2c16';c.lineWidth=.45;c.beginPath();c.moveTo(ex-.9,ey-1.5+(o.raise||0));c.lineTo(ex+.9,ey-1.7+(o.raise||0));c.stroke()}
  el(c,x+lk*.3,y+1.6,.5,.4,'rgba(150,80,50,.45)');/* 코 */el(c,x-2.4,y+2,.8,.45,'rgba(255,120,120,.35)');el(c,x+2.4,y+2,.8,.45,'rgba(255,120,120,.35)');
  c.strokeStyle='#8a3a2a';c.lineWidth=.45;c.beginPath();if(o.mouth==='o'){el(c,x,y+3.1,.7,.8,'#6a2a20')}else{c.arc(x,y+2.6,1.1,.3,Math.PI-.3);c.stroke()}}
 function torso(c,x,y,col,col2,w){c.fillStyle=LG(c,x-w,0,x+w,0,[[0,col2],[.4,col],[1,col2]]);c.beginPath();c.moveTo(x-w,y+21);c.quadraticCurveTo(x-w-.4,y+1,x-w*.55,y);c.lineTo(x+w*.55,y);c.quadraticCurveTo(x+w+.4,y+1,x+w,y+21);c.closePath();c.fill()}/* 계산대 아래까지(떠 보이지 않게) */
 function arm(c,sx,sy,hx,hy,col,sk){c.strokeStyle=col;c.lineWidth=2.6;c.lineCap='round';c.beginPath();const mx=(sx+hx)/2+(hx>sx?1:-1)*1.2,my=(sy+hy)/2+1.4;c.moveTo(sx,sy);c.quadraticCurveTo(mx,my,hx,hy);c.stroke();c.lineCap='butt';el(c,hx,hy,1.3,1.2,sk)}
 const SAY=['싱싱한 과일 있어요!','오늘 잡은 생선이에요!','신비한 물약 한 병?','갓 구운 빵이에요~','반짝반짝 보석 구경하세요','고운 천 있어요','꽃 한 송이 어때요?','튼튼한 무기 팝니다!'];
 function merchant(c,x,y,i,t){const by=y-45+Math.sin(t*2+i)*.35,sk=SKIN[i];/* by = 어깨 높이 */
  if(i===0){/* 과일 아주머니 */torso(c,x,by,'#7a3a6a','#4a1a3a',6);rc(c,x-3.4,by+2,6.8,10,'#f4ecd8');el(c,x,by+3,3.4,.6,'#e8dcc0');face(c,x,by-5,i,t,{look:Math.sin(t*.6)});
   c.fillStyle='#c83a3a';c.beginPath();c.ellipse(x,by-7.6,4.8,3,0,Math.PI,0);c.fill();c.beginPath();c.moveTo(x+3.6,by-7);c.lineTo(x+6,by-4);c.lineTo(x+4,by-6.6);c.fill();for(let k=0;k<5;k++)el(c,x-3+k*1.5,by-8.4,.4,.4,'#fff');/* 두건 */
   const up=Math.max(0,Math.sin(t*.9+1));arm(c,x-4,by+2,x-5,by+10,'#7a3a6a',sk);arm(c,x+4,by+2,x+6,by+9-up*9,'#7a3a6a',sk);if(up>.3)apple(c,x+6.4,by+7.4-up*9,1.6,[0,80,48])}
  else if(i===1){/* 어부 */torso(c,x,by,'#e8c020','#a88010',6.4);rc(c,x-.4,by+1,.8,11,'#8a7010');face(c,x,by-5,i,t,{brow:'#6a6a6a',eye:'#2a4a6a',mouth:Math.sin(t*1.3)>.6?'o':0});
   for(let k=0;k<14;k++)el(c,x-3.4+hr(k,1)*6.8,by-1.6+hr(k,2)*2.6,.7,.6,k%2?'#c8c8c8':'#a8a8a8');/* 수염 */
   c.fillStyle='#f0c818';c.beginPath();c.ellipse(x,by-8,6.6,1.6,.06,0,TAU);c.fill();c.fillStyle='#e0b810';c.beginPath();c.ellipse(x,by-9.4,4.2,3,0,Math.PI,0);c.fill();rc(c,x-4.2,by-9.6,8.4,.6,'rgba(0,0,0,.2)');
   const w=Math.sin(t*5)*.8;arm(c,x-4.4,by+2,x-6,by+10,'#e8c020',sk);if(Math.sin(t*1.3)>.4)arm(c,x+4.4,by+2,x+8+w,by-5,'#e8c020',sk);else arm(c,x+4.4,by+2,x+5,by+10,'#e8c020',sk)}
  else if(i===2){/* 연금술사 */torso(c,x,by,'#4a2a7a','#22104a',6);rc(c,x-.5,by,1,12,'#e8c060');face(c,x,by-5,i,t,{brow:'#c8c8d8',eye:'#5a2a8a',look:.8});
   for(let k=0;k<10;k++)el(c,x-4.4+k*.2,by-4+k*.6,.8,.9,'#d8d8e8');for(let k=0;k<10;k++)el(c,x+4.4-k*.2,by-4+k*.6,.8,.9,'#d8d8e8');/* 흰 머리 */
   c.strokeStyle='#c8a050';c.lineWidth=.45;c.beginPath();c.arc(x-1.6,by-4.8,1.2,0,TAU);c.arc(x+1.6,by-4.8,1.2,0,TAU);c.moveTo(x-.4,by-4.8);c.lineTo(x+.4,by-4.8);c.stroke();/* 안경 */
   c.fillStyle='#3a1a6a';c.beginPath();c.ellipse(x,by-8.4,7,1.6,0,0,TAU);c.fill();c.fillStyle=LG(c,x-4,0,x+4,0,[[0,'#2a104a'],[.5,'#5a2a9a'],[1,'#2a104a']]);c.beginPath();c.moveTo(x-4,by-8.6);c.lineTo(x+1+Math.sin(t)*1.2,by-20);c.lineTo(x+4,by-8.6);c.closePath();c.fill();rc(c,x-4,by-10,8,1.2,'#e8c060');
   for(let k=0;k<3;k++)el(c,x-2+k*2,by-13-k*2,.4,.4,'#ffe08a');
   const a=t*3;arm(c,x-4,by+2,x-5,by+10,'#4a2a7a',sk);arm(c,x+4,by+2,x+13+Math.cos(a)*2,by+10+Math.sin(a)*.8,'#4a2a7a',sk);rc(c,x+13+Math.cos(a)*2,by+10+Math.sin(a)*.8,.6,6,'#8a6038')}
  else if(i===3){/* 제빵사 */torso(c,x,by,'#f4f4f0','#c8c8c0',6.4);for(let k=0;k<3;k++)el(c,x+1.4,by+3+k*3,.5,.5,'#c8c8c0');rc(c,x-3.6,by+5,7.2,7,'#e8dcc8');face(c,x,by-5,i,t,{});
   c.fillStyle='#3a2414';c.beginPath();c.ellipse(x-1.2,by-2.6,1.6,.6,.3,0,TAU);c.ellipse(x+1.2,by-2.6,1.6,.6,-.3,0,TAU);c.fill();/* 콧수염 */
   c.fillStyle='#ffffff';rc(c,x-4,by-10,8,2.6,'#e8e8e8');for(let k=0;k<4;k++)el(c,x-3+k*2,by-12.4,2,2.2,'#ffffff');el(c,x,by-13.6,2.2,1.6,'#fff');
   const kn=Math.abs(Math.sin(t*4));arm(c,x-4.4,by+2,x-3,by+9+kn*1.4,'#f4f4f0',sk);arm(c,x+4.4,by+2,x+3,by+9+(1-kn)*1.4,'#f4f4f0',sk);el(c,x,by+11,4.4,1.6,'#f0e0c0');for(let k=0;k<3;k++)rc(c,x-3+hr(k,3)*6,by+9.6,.3,.3,'#fff')}
  else if(i===4){/* 보석상 */torso(c,x,by,'#2a2a3a','#14141e',6);rc(c,x-2.2,by,4.4,12,'#f4f4f0');c.fillStyle='#6a1030';c.beginPath();c.moveTo(x-2.2,by);c.lineTo(x,by+3);c.lineTo(x+2.2,by);c.fill();rc(c,x-3,by+4,6,7,'#6a5a20');rc(c,x-.3,by+4,.6,7,'#e8c060');
   face(c,x,by-5,i,t,{look:-.6,raise:-.2});c.fillStyle='#2a1a10';c.beginPath();c.moveTo(x-2.4,by-2.4);c.quadraticCurveTo(x,by-1.6,x+2.4,by-2.4);c.lineTo(x+3,by-3.2);c.quadraticCurveTo(x,by-2.2,x-3,by-3.2);c.fill();
   c.strokeStyle='#e8c060';c.lineWidth=.5;c.beginPath();c.arc(x+1.4,by-4.8,1.2,0,TAU);c.stroke();c.beginPath();c.moveTo(x+2.6,by-4.6);c.quadraticCurveTo(x+3.6,by-1,x+3,by+2);c.stroke();const gl=(t%4)<.25;if(gl)el(c,x+1,by-5.3,.5,.5,'#fff');
   rc(c,x-4.6,by-9,9.2,.9,'#14141a');rc(c,x-3,by-16,6,7,'#1e1e28');rc(c,x-3,by-10.6,6,1,'#8a1a3a');
   const p=Math.sin(t*6)*1.2;arm(c,x-4,by+2,x-1.6+p,by+8,'#2a2a3a',sk);arm(c,x+4,by+2,x+2,by+8.6,'#2a2a3a',sk);gem(c,x+.4,by+8,1.6,'#4ad8ff');el(c,x-1.6+p,by+8.4,1.6,1,'#f0f0e8')}
  else if(i===5){/* 재단사 */torso(c,x,by,'#e87a9a','#b0486a',5.8);c.fillStyle='#f8e8f0';c.beginPath();c.moveTo(x-2,by);c.lineTo(x,by+3.6);c.lineTo(x+2,by);c.fill();face(c,x,by-5,i,t,{eye:'#3a6a3a',look:Math.sin(t*.5)*.6});
   c.fillStyle='#6a3a1a';c.beginPath();c.ellipse(x,by-7.4,4.6,3,0,Math.PI,0);c.fill();el(c,x,by-10.6,2.6,2.2,'#6a3a1a');el(c,x-.6,by-11.2,.8,.5,'rgba(255,220,180,.4)');rc(c,x-3,by-11.4,6,.5,'#e8c060');/* 올린 머리 · 비녀 */
   const st=Math.sin(t*1.4)*.5+.5,lx=x-6-st*3,rx=x+6+st*3;arm(c,x-4,by+2,lx,by+6,'#e87a9a',sk);arm(c,x+4,by+2,rx,by+6,'#e87a9a',sk);c.strokeStyle='#f0d020';c.lineWidth=.9;c.beginPath();c.moveTo(lx,by+6);c.quadraticCurveTo(x,by+7.6,rx,by+6);c.stroke();
   c.strokeStyle='#3a3a2a';c.lineWidth=.25;for(let k=0;k<8;k++){const xx=lx+(rx-lx)*k/8;c.beginPath();c.moveTo(xx,by+6.4+Math.sin(k/8*Math.PI)*1.4);c.lineTo(xx,by+7.1+Math.sin(k/8*Math.PI)*1.4);c.stroke()}
   c.strokeStyle='#f0d020';c.lineWidth=.6;c.beginPath();c.moveTo(x-3,by);c.quadraticCurveTo(x-4,by+6,x-3.4,by+10);c.moveTo(x+3,by);c.quadraticCurveTo(x+4,by+6,x+3.4,by+10);c.stroke()}
  else if(i===6){/* 꽃집 소녀 */const sw=Math.sin(t*1.2)*.8;torso(c,x+sw*.3,by,'#ffe0a0','#d8b060',5.6);rc(c,x-3.2+sw*.3,by+3,6.4,9,'#8ad0a0');face(c,x+sw,by-5,i,t,{eye:'#4a7a3a',look:sw});
   c.fillStyle='#a85a2a';c.beginPath();c.ellipse(x+sw,by-6.6,4.6,3.6,0,Math.PI,0);c.fill();for(const s of [-1,1]){for(let k=0;k<5;k++)el(c,x+sw+s*4.2,by-4+k*1.6,1,.9,k%2?'#a85a2a':'#8a4a20')}/* 땋은 머리 */
   for(let k=0;k<7;k++)flower(c,x+sw-4+k*1.35,by-9-Math.sin(k/6*Math.PI)*1,['#ff8aa8','#ffffff','#ffd166'][k%3],.8);
   const sn=Math.sin(t*.7)>.5;arm(c,x-3.6,by+2,x-4,by+9,'#ffe0a0',sk);arm(c,x+3.6,by+2,sn?x+2+sw:x+5,sn?by-1:by+6,'#ffe0a0',sk);const fx=sn?x+2+sw:x+5,fy=sn?by-3:by+4;for(let k=0;k<4;k++)flower(c,fx-1.6+k*1.1,fy-1.6-(k%2),['#ff4a6a','#c8a2ff','#ffd166','#ff8aa8'][k],.9);rc(c,fx-.3,fy,.6,3,'#3a6a2a')}
  else{/* 대장장이 */torso(c,x,by,'#c88a60','#8a5a3a',7.4);rc(c,x-4.6,by+1,9.2,11,'#5a3a20');rc(c,x-4.6,by+1,9.2,.6,'#7a5030');rc(c,x-5,by+.4,1,4,'#5a3a20');rc(c,x+4,by+.4,1,4,'#5a3a20');
   face(c,x,by-5,i,t,{brow:'#2a1a10',raise:.3});c.fillStyle='rgba(255,255,255,.3)';c.beginPath();c.ellipse(x-1.4,by-8.6,1.6,.8,-.3,0,TAU);c.fill();/* 민머리 빛 */
   for(let k=0;k<18;k++)el(c,x-3.6+hr(k,4)*7.2,by-1.4+hr(k,5)*4,.8,.8,k%2?'#4a2a14':'#6a3a1a');
   const h=Math.max(0,Math.sin(t*3.2));arm(c,x-5,by+2,x-4,by+10,'#c88a60',sk);arm(c,x+5,by+2,x+9,by+2-h*7,'#c88a60',sk);c.save();c.translate(x+9,by+2-h*7);c.rotate(-1.2+h*1.4);rc(c,-.5,-1,1,8,'#6a4424');rc(c,-2.4,6,4.8,2.6,'#5a5a66');rc(c,-2.4,6,4.8,.6,'#9a9aa6');c.restore()}}
 function bubble(c,x,y,text,a){c.save();c.globalAlpha=a;c.font='700 6px sans-serif';const w=c.measureText(text).width+8;c.fillStyle='rgba(0,0,0,.3)';rrect(c,x-w/2+1,y-10,w,10,4);c.fill();c.fillStyle='#fffaf0';rrect(c,x-w/2,y-11,w,10,4);c.fill();c.strokeStyle='#8a6038';c.lineWidth=.6;c.stroke();
  c.beginPath();c.moveTo(x-2,y-1.2);c.lineTo(x,y+2.4);c.lineTo(x+2,y-1.2);c.fill();c.fillStyle='#3a2414';c.textAlign='center';c.fillText(text,x,y-4);c.restore()}
 /* ---------- 움직이는 덧그림(가게 앞) ---------- */
 function live(c,x,y,i,t){if(i===2){/* 솥 거품 · 김 */for(let k=0;k<5;k++){const q=(t*.8+k/5)%1;el(c,x+24+Math.sin(k*2.3)*4,y-30-q*3,.7*(1-q)+.3,.7*(1-q)+.3,'rgba(160,255,190,'+(1-q)+')')}for(let k=0;k<3;k++){const q=(t*.3+k/3)%1;el(c,x+24+Math.sin(t+k)*2,y-34-q*16,1.4+q*3,1+q*2,'rgba(200,255,220,'+(.25*(1-q))+')')}
   c.save();c.globalCompositeOperation='lighter';const g=RG(c,x+24,y-31,0,12,[[0,'rgba(90,255,140,.35)'],[1,'rgba(90,255,140,0)']]);c.fillStyle=g;c.fillRect(x+12,y-43,24,24);for(const cx of [-6,-2]){const g2=RG(c,x+cx,y-34+(cx===-2?2:0),0,6,[[0,'rgba(255,200,100,.4)'],[1,'rgba(255,200,100,0)']]);c.fillStyle=g2;c.fillRect(x+cx-6,y-40,12,12)}c.restore()}
  if(i===4){c.save();c.globalCompositeOperation='lighter';for(let k=0;k<9;k++){const ph=(t*1.3+k*.37)%1;if(ph>.25)continue;const s=Math.sin(ph/.25*Math.PI)*2.4,gx=x-30+k*7.4,gy=y-30.2;c.strokeStyle='rgba(255,255,255,.9)';c.lineWidth=.4;c.beginPath();c.moveTo(gx-s,gy);c.lineTo(gx+s,gy);c.moveTo(gx,gy-s);c.lineTo(gx,gy+s);c.stroke()}c.restore()}
  if(i===1){c.save();c.globalCompositeOperation='lighter';for(let k=0;k<7;k++){const ph=(t*.7+k*.29)%1;if(ph>.2)continue;el(c,x-32+k*10.4,y-34,1.4,.4,'rgba(255,255,255,'+(.8*Math.sin(ph/.2*Math.PI))+')')}c.restore()}
  if(i===6){for(let k=0;k<3;k++){const q=(t*.25+k/3)%1;c.save();c.translate(x-30+k*25+Math.sin(t+k)*6,y-40+q*30);c.rotate(t*2+k);c.globalAlpha=1-q;el(c,0,0,1,.5,'#ff9ac8');c.restore()}}}
 const MP=[TAU/.9,TAU/1.3,TAU/3,Math.PI/4*4,TAU/6*3,TAU/1.4,TAU/.7,Math.PI/3.2*2];/* 상인마다 몸짓 한 바퀴(초) */
 function stall(c,x,y,i,now){const t=now/1000,I=build(i),X=window.PXL,mx=x+(i%2?3:-3);
  if(X){/* v158: 가게 · 상인 · 움직임 모두 도트 */const sm=c.imageSmoothingEnabled;c.imageSmoothingEnabled=false;
   const bk=I.bT||(I.bT={cv:I.back,w:IW,h:IH}),ft=I.fT||(I.fT={cv:I.front,w:IW,h:IH});c.drawImage(X.img(bk),x-OX,y-OY,IW,IH);
   const N=Math.max(12,Math.round(MP[i]*7)),[k,tm]=X.fr(now+i*977,MP[i],N);X.stamp(c,'mc'+i+'_'+k,-22,-74,44,52,mx,y,o=>merchant(o,0,0,i,tm/1000));
   c.imageSmoothingEnabled=false;c.drawImage(X.img(ft),x-OX,y-OY,IW,IH);c.imageSmoothingEnabled=sm;
   if(i===1||i===2||i===4||i===6){const [k2,t2]=X.fr(now,5,30);X.stamp(c,'lv'+i+'_'+k2,-46,-66,92,60,x,y,o=>live(o,0,0,i,t2/1000))}}
  else{c.drawImage(I.back,x-OX,y-OY,IW,IH);merchant(c,mx,y,i,t);c.drawImage(I.front,x-OX,y-OY,IW,IH);live(c,x,y,i,t)}
  const per=9,ph=((t+i*2.3)%per);if(ph<3.2){const a=ph<.3?ph/.3:ph>2.8?(3.2-ph)/.4:1;bubble(c,x+(i%2?3:-3),y-86,SAY[i],a)}}
 PB.stall=stall;window.MK158={v:1,build,D,SAY};
}catch(e){console.error('v158 market',e)}})();
