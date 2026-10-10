/* ================= v115 사실적인 광장 그림 (PLZART) =================
   - 광장(9999999996 PLZ111)의 배경 · 물체 · 빛을 사실적으로 다시 그린다. 자리(분수 · 나무 · 가로등 · 의자 · 걷는 곳)는 그대로라 판정은 같다.
   - build(): 해 질 녘 하늘 · 먼 마을 · 돌 성벽(담쟁이) · 둥근 돌탑(창문 불빛 · 나무 문 · 깃발) · 하나하나 음영을 넣은 자갈 · 분수 둘레 원형 포석 ·
     사암 길 · 웅덩이(하늘 비침) · 이끼 · 낙엽 · 꽃밭 · 의자 · 고정 그림자를 두 배 해상도(R) 그림 한 장에 미리 그린다.
   - under(): 보이는 부분만 잘라 그리고 가로등 빛 웅덩이를 더한다. objs(): 분수(물줄기 · 물결 · 물보라) · 나무(흔들림) · 가로등(깜빡임) ·
     횃불 · 비둘기(가까이 가면 날아감)를 y 순서 목록으로. over(): 저녁 빛(곱하기) · 빛 번짐 · 떨어지는 잎 · 가장자리 어둡게.
   - PLZ111이 이 모듈이 있으면 예전 도트 배경 대신 쓴다(배경 그림에 _art 표시). */
(()=>{try{
 const R=2,TAU=Math.PI*2;
 const Z=()=>window.PLZ111;
 let sd=11;const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647,rr=(a,b)=>a+(b-a)*rnd();
 const hsl=(h,s,l,a)=>'hsla('+h+','+s+'%,'+l+'%,'+(a==null?1:a)+')';
 /* ---------- 배경 ---------- */
 function build(){const z=Z();if(!z)return null;const WW=z.WW,WH=z.WH,F=z.FOUNT,TOPY=z.TOPY;sd=11;
  const cv=document.createElement('canvas');cv.width=WW*R;cv.height=WH*R;const o=cv.getContext('2d');o.scale(R,R);o.imageSmoothingEnabled=true;
  /* 하늘: 해 질 녘 */let g=o.createLinearGradient(0,0,0,170);g.addColorStop(0,'#101a3a');g.addColorStop(.45,'#3b3f72');g.addColorStop(.78,'#b0607a');g.addColorStop(1,'#f0a060');o.fillStyle=g;o.fillRect(0,0,WW,176);
  g=o.createRadialGradient(780,150,0,780,150,260);g.addColorStop(0,'rgba(255,214,150,.75)');g.addColorStop(.25,'rgba(255,170,110,.35)');g.addColorStop(1,'rgba(255,150,100,0)');o.fillStyle=g;o.fillRect(0,0,WW,176);
  for(let i=0;i<90;i++){const y=rr(0,80);o.fillStyle='rgba(255,255,255,'+(.15+.5*(1-y/80))*rnd()+')';o.fillRect(rr(0,WW),y,.8,.8)}
  /* 구름 */for(let i=0;i<14;i++){const cx=rr(-40,WW+40),cy=rr(40,120),w=rr(60,150),h=rr(6,14);for(let k=0;k<6;k++){const x=cx+rr(-w/2,w/2),y=cy+rr(-h/2,h/2),r=rr(h*.8,h*1.8);
    g=o.createRadialGradient(x,y-r*.3,0,x,y,r*1.6);g.addColorStop(0,'rgba(255,190,160,.28)');g.addColorStop(.6,'rgba(150,110,150,.16)');g.addColorStop(1,'rgba(80,70,120,0)');o.fillStyle=g;o.beginPath();o.ellipse(x,y,r*2.2,r,0,0,TAU);o.fill()}}
  /* 먼 언덕 · 마을(대기 원근) */o.fillStyle='rgba(70,60,110,.85)';o.beginPath();o.moveTo(0,176);for(let x=0;x<=WW;x+=8)o.lineTo(x,150-Math.sin(x/90)*10-Math.sin(x/37)*5);o.lineTo(WW,176);o.fill();
  for(let x=-10;x<WW;x+=rr(14,30)){const w=rr(12,26),h=rr(10,28),y=166-h;o.fillStyle=hsl(250,22,22+rr(0,6));o.fillRect(x,y,w,h+12);o.beginPath();o.moveTo(x-2,y);o.lineTo(x+w/2,y-rr(6,12));o.lineTo(x+w+2,y);o.fill();
   for(let k=0;k<3;k++)if(rnd()<.55){o.fillStyle='rgba(255,200,120,'+rr(.5,.9)+')';o.fillRect(x+rr(2,w-4),y+rr(4,h),1.6,2)}}
  g=o.createLinearGradient(0,120,0,176);g.addColorStop(0,'rgba(240,150,110,0)');g.addColorStop(1,'rgba(240,160,120,.35)');o.fillStyle=g;o.fillRect(0,120,WW,56);/* 아지랑이 */
  /* 성벽 */const wallTop=106;stones(o,0,wallTop,WW,TOPY-wallTop,[28,24,30],7,9,16,30);
  for(let x=0;x<WW;x+=34){if(x>380&&x<580)continue;stones(o,x,wallTop-12,20,12,[28,24,32],5,6,8,10);o.fillStyle='rgba(0,0,0,.35)';o.fillRect(x+20,wallTop-12,14,12)}
  g=o.createLinearGradient(0,wallTop,0,TOPY);g.addColorStop(0,'rgba(255,190,140,.12)');g.addColorStop(1,'rgba(0,0,0,.45)');o.fillStyle=g;o.fillRect(0,wallTop-12,WW,TOPY-wallTop+12);
  /* 담쟁이 */for(const vx of [70,250,700,880]){for(let i=0;i<220;i++){const y=rr(wallTop-6,TOPY-2),sp=(y-wallTop)/(TOPY-wallTop),x=vx+rr(-22,22)*(0.4+sp)+Math.sin(y/9)*4;
    o.fillStyle=hsl(rr(95,135),rr(35,55),rr(16,34));o.beginPath();o.ellipse(x,y,rr(1.2,2.6),rr(1,2),rr(0,3),0,TAU);o.fill()}}
  /* 탑 */tower(o,400,160);
  /* 땅 */ground(o,WW,WH,TOPY,F);
  /* 탑 · 벽 그림자 */g=o.createLinearGradient(0,TOPY,0,TOPY+40);g.addColorStop(0,'rgba(10,8,20,.55)');g.addColorStop(1,'rgba(10,8,20,0)');o.fillStyle=g;o.fillRect(0,TOPY,WW,40);
  o.fillStyle='rgba(10,8,20,.28)';o.beginPath();o.moveTo(400,TOPY);o.lineTo(560,TOPY);o.lineTo(600,TOPY+70);o.lineTo(430,TOPY+70);o.closePath();o.fill();
  /* 꽃밭 · 의자 · 고정 그림자 */for(const [bx,by] of [[40,190],[820,190],[40,560],[830,560]])bed(o,bx,by,100,26);
  for(const [x,y,h] of z.BENCH)bench(o,x,y,h);
  for(const [x,y] of z.TREES){g=o.createRadialGradient(x+10,y+4,2,x+10,y+4,30);g.addColorStop(0,'rgba(5,5,15,.5)');g.addColorStop(1,'rgba(5,5,15,0)');o.fillStyle=g;o.beginPath();o.ellipse(x+10,y+4,34,12,.15,0,TAU);o.fill()}
  for(const [x,y] of z.LAMPS){o.fillStyle='rgba(5,5,15,.35)';o.beginPath();o.ellipse(x+3,y+2,5,2,0,0,TAU);o.fill()}
  g=o.createRadialGradient(F.x+6,F.y+10,F.r*.6,F.x+6,F.y+10,F.r*1.5);g.addColorStop(0,'rgba(5,5,15,.45)');g.addColorStop(1,'rgba(5,5,15,0)');o.fillStyle=g;o.beginPath();o.ellipse(F.x+6,F.y+10,F.r*1.5,F.r*1.5/1.6,0,0,TAU);o.fill();
  cv._art=1;return cv}
 /* 돌 쌓기: 줄마다 길이가 다른 돌, 돌마다 색 · 위 빛 · 아래 그늘 · 줄눈 */
 function stones(o,x0,y0,w,h,base,rhMin,rhMax,swMin,swMax){o.fillStyle='#2a2522';o.fillRect(x0,y0,w,h);let y=y0;
  while(y<y0+h){const rh=Math.min(rr(rhMin,rhMax),y0+h-y);let x=x0-rr(0,swMax);while(x<x0+w){const sw=rr(swMin,swMax),l=rr(30,44),hu=rr(18,34),sa=rr(8,18);
    const xa=Math.max(x0,x+.6),xb=Math.min(x0+w,x+sw-.6);if(xb>xa){o.fillStyle=hsl(hu,sa,l);o.fillRect(xa,y+.6,xb-xa,rh-1.2);o.fillStyle=hsl(hu,sa,l+10,.7);o.fillRect(xa,y+.6,xb-xa,1);o.fillStyle='rgba(0,0,0,.28)';o.fillRect(xa,y+rh-1.8,xb-xa,1.2);
     for(let k=0;k<3;k++){o.fillStyle='rgba(0,0,0,'+rr(.04,.12)+')';o.fillRect(rr(xa,xb-2),rr(y+1,y+rh-2),rr(1,3),rr(.6,1.4))}}
    x+=sw}y+=rh}}
 function tower(o,tx,tw){const top=0,bot=176;
  /* 둥근 돌: 줄마다 돌 폭이 가장자리로 갈수록 좁아짐(원통) */o.fillStyle='#2a2522';o.fillRect(tx,top,tw,bot);
  for(let y=top;y<bot;y+=9){let a=-Math.PI/2+(Math.floor(y/9)%2?.12:0);while(a<Math.PI/2){const da=rr(.22,.34),x1=tx+tw/2+Math.sin(a)*tw/2,x2=tx+tw/2+Math.sin(Math.min(Math.PI/2,a+da))*tw/2;
    const l=rr(34,46);o.fillStyle=hsl(rr(20,32),rr(8,16),l);o.fillRect(x1+.5,y+.6,Math.max(0,x2-x1-1),7.8);o.fillStyle=hsl(28,14,l+12,.6);o.fillRect(x1+.5,y+.6,Math.max(0,x2-x1-1),1);a+=da}}
  let g=o.createLinearGradient(tx,0,tx+tw,0);g.addColorStop(0,'rgba(0,0,0,.55)');g.addColorStop(.18,'rgba(255,190,140,.12)');g.addColorStop(.35,'rgba(255,200,150,.18)');g.addColorStop(.7,'rgba(0,0,0,.2)');g.addColorStop(1,'rgba(0,0,0,.7)');o.fillStyle=g;o.fillRect(tx,top,tw,bot);
  /* 창문 */for(const [wx,wy] of [[tx+34,26],[tx+tw-50,26],[tx+34,72],[tx+tw-50,72]]){arch(o,wx-2,wy-2,20,28,'#3a3430');arch(o,wx,wy,16,24,'#140e0a');
   g=o.createRadialGradient(wx+8,wy+16,1,wx+8,wy+14,16);g.addColorStop(0,'#ffe2a0');g.addColorStop(.5,'#f0a040');g.addColorStop(1,'#6a2e10');o.fillStyle=g;arch(o,wx+1.5,wy+1.5,13,21,null,true);
   o.fillStyle='#1a120c';o.fillRect(wx+7.3,wy+2,1.4,22);o.fillRect(wx+1,wy+12,14,1.4);o.fillStyle='rgba(255,220,150,.35)';o.fillRect(wx-2,wy+24,20,2)}
  /* 문: 돌 아치 · 나무판 · 쇠띠 · 징 */const dx=tx+tw/2-26,dy=108;arch(o,dx-6,dy-6,64,76,'#4a423c');for(let i=0;i<11;i++){const a=Math.PI+i/10*Math.PI,cx=dx+26,cy=dy+26;o.strokeStyle='#2a2420';o.lineWidth=1;o.beginPath();o.moveTo(cx+Math.cos(a)*26,cy+Math.sin(a)*26);o.lineTo(cx+Math.cos(a)*32,cy+Math.sin(a)*32);o.stroke()}
  arch(o,dx,dy,52,70,'#1a110a');for(let i=0;i<6;i++){g=o.createLinearGradient(dx+i*8.6,0,dx+i*8.6+8.6,0);g.addColorStop(0,'#5a3820');g.addColorStop(.5,'#7a5030');g.addColorStop(1,'#4a2c18');o.fillStyle=g;o.save();arch(o,dx+1,dy+1,50,69,null,false,true);o.clip();o.fillRect(dx+i*8.6+.4,dy,8,70);o.restore()}
  for(const by of [dy+24,dy+50]){o.fillStyle='#2a2a30';o.fillRect(dx+2,by,48,3);o.fillStyle='#5a5a66';o.fillRect(dx+2,by,48,.8);for(let i=0;i<6;i++){o.fillStyle='#8a8a96';o.beginPath();o.arc(dx+6+i*8,by+1.5,1,0,TAU);o.fill()}}
  o.fillStyle='#c8a050';o.beginPath();o.arc(dx+40,dy+40,2,0,TAU);o.fill();
  /* 계단 */for(let i=0;i<3;i++){const sy=176+i*4,sx=dx-12-i*6,sw=76+i*12;o.fillStyle=hsl(30,10,40-i*3);o.fillRect(sx,sy,sw,4);o.fillStyle='rgba(255,220,180,.25)';o.fillRect(sx,sy,sw,.8);o.fillStyle='rgba(0,0,0,.4)';o.fillRect(sx,sy+3.2,sw,.8)}
  /* 깃발(천 주름) */for(const fx of [tx-34,tx+tw+12]){o.fillStyle='#3a3a42';o.fillRect(fx+10,30,2,90);o.fillStyle='#c8a050';o.beginPath();o.arc(fx+11,29,2,0,TAU);o.fill();
   for(let i=0;i<22;i++){const sh=.75+.25*Math.sin(i/22*TAU*2.2);o.fillStyle='rgb('+Math.round(150*sh)+','+Math.round(24*sh)+','+Math.round(40*sh)+')';o.fillRect(fx-1+i,36,1,46+Math.sin(i/3)*2)}
   o.fillStyle='#c8a050';o.fillRect(fx-1,36,22,2);o.beginPath();o.moveTo(fx-1,82);o.lineTo(fx+10,90);o.lineTo(fx+21,82);o.lineTo(fx+21,80);o.lineTo(fx-1,80);o.fillStyle='rgb(120,20,32)';o.fill();
   o.strokeStyle='#e0c070';o.lineWidth=1.2;o.beginPath();o.moveTo(fx+10,48);o.lineTo(fx+16,60);o.lineTo(fx+10,72);o.lineTo(fx+4,60);o.closePath();o.stroke()}}
 function arch(o,x,y,w,h,col,glow,pathOnly){o.beginPath();o.moveTo(x,y+h);o.lineTo(x,y+w/2);o.arc(x+w/2,y+w/2,w/2,Math.PI,0);o.lineTo(x+w,y+h);o.closePath();if(pathOnly)return;if(col){o.fillStyle=col}o.fill()}
 function ground(o,WW,WH,TOPY,F){o.fillStyle='#24211f';o.fillRect(0,TOPY,WW,WH-TOPY);
  const inRing=(x,y)=>{const dx=x-F.x,dy=(y-F.y)*1.6;return dx*dx+dy*dy<170*170};
  /* 자갈: 줄마다 어긋나게, 돌마다 모양 · 색 · 빛 */for(let y=TOPY+2;y<WH+6;y+=7){const off=(Math.floor(y/7)%2)*5;for(let x=-off;x<WW+8;x+=rr(9,12)){if(inRing(x,y))continue;cobble(o,x+rr(-1,1),y+rr(-1,1),rr(4,5.6),rr(2.8,3.6),rr(24,40),rr(6,14),rr(30,44))}}
  /* 분수 둘레: 원형 포석(밝은 화강암) */for(let r=60;r<=170;r+=9){const n=Math.floor(r*TAU/10);for(let i=0;i<n;i++){const a=i/n*TAU+(r%2)*.05,x=F.x+Math.cos(a)*r,y=F.y+Math.sin(a)*r/1.6;cobble(o,x,y,rr(4.2,5.4),rr(2.4,3.2),rr(30,42),rr(4,10),rr(42,54),a)}}
  for(const r of [58,120,172]){o.strokeStyle='rgba(20,18,16,.85)';o.lineWidth=3;o.beginPath();o.ellipse(F.x,F.y,r,r/1.6,0,0,TAU);o.stroke();o.strokeStyle='rgba(220,200,170,.35)';o.lineWidth=1.2;o.beginPath();o.ellipse(F.x,F.y-1,r,r/1.6,0,Math.PI,TAU);o.stroke()}
  /* 탑 문에서 분수까지 사암 판석 */for(let y=TOPY+10;y<F.y-F.r/1.6-4;y+=9)for(let x=448;x<512;x+=rr(14,20)){const w=Math.min(rr(12,18),512-x);o.fillStyle=hsl(rr(30,40),rr(22,32),rr(44,54));o.fillRect(x+.6,y+.6,w-1.2,7.8);o.fillStyle='rgba(255,240,210,.25)';o.fillRect(x+.6,y+.6,w-1.2,1);o.fillStyle='rgba(0,0,0,.25)';o.fillRect(x+.6,y+7.6,w-1.2,.8)}
  /* 닳은 길(밝게) · 구석 때(어둡게) */for(const [x,y,rx,ry] of [[480,500,120,60],[300,380,90,50],[660,380,90,50],[480,230,40,50]]){const g=o.createRadialGradient(x,y,0,x,y,rx);g.addColorStop(0,'rgba(255,230,200,.07)');g.addColorStop(1,'rgba(255,230,200,0)');o.fillStyle=g;o.beginPath();o.ellipse(x,y,rx,ry,0,0,TAU);o.fill()}
  for(const [x,y] of [[0,WH],[WW,WH],[0,TOPY],[WW,TOPY]]){const g=o.createRadialGradient(x,y,0,x,y,180);g.addColorStop(0,'rgba(0,0,0,.4)');g.addColorStop(1,'rgba(0,0,0,0)');o.fillStyle=g;o.fillRect(x-180,y-180,360,360)}
  /* 이끼 · 풀(줄눈 사이) */for(let i=0;i<700;i++){const x=rnd()<.5?rr(0,140):rr(WW-140,WW),y=rr(TOPY,WH);if(inRing(x,y))continue;o.fillStyle=hsl(rr(80,120),rr(30,50),rr(18,30),rr(.5,.9));o.fillRect(x,y,rr(.8,2),rr(.6,1.4))}
  /* 웅덩이: 하늘 비침 */for(const [x,y,w,h] of [[220,520,26,7],[760,300,20,6],[620,540,30,8]]){const g=o.createLinearGradient(0,y-h,0,y+h);g.addColorStop(0,'#141a2c');g.addColorStop(.55,'#2a2c44');g.addColorStop(1,'#5a4250');o.globalAlpha=.7;o.fillStyle=g;o.beginPath();
   for(let k=0;k<=24;k++){const a=k/24*TAU,rw=w*(1+.18*Math.sin(a*3+x)),rh=h*(1+.2*Math.cos(a*2+y));k?o.lineTo(x+Math.cos(a)*rw,y+Math.sin(a)*rh):o.moveTo(x+Math.cos(a)*rw,y+Math.sin(a)*rh)}o.fill();o.globalAlpha=.35;o.strokeStyle='#c8c0c8';o.lineWidth=.5;o.stroke();o.globalAlpha=.25;o.fillStyle='#e8d0c0';o.fillRect(x-w*.4,y-h*.3,w*.5,.6);o.globalAlpha=1}
  /* 낙엽 */for(const [tx,ty] of Z().TREES)for(let i=0;i<26;i++){const x=tx+rr(-40,44),y=ty+rr(-8,26);if(y<TOPY+4)continue;o.fillStyle=hsl(rr(14,42),rr(55,80),rr(30,48),.9);o.save();o.translate(x,y);o.rotate(rr(0,3));o.beginPath();o.ellipse(0,0,1.8,.9,0,0,TAU);o.fill();o.restore()}
  /* 맨홀 · 배수구 */o.fillStyle='#1c1a1a';o.beginPath();o.ellipse(330,520,9,5.4,0,0,TAU);o.fill();o.strokeStyle='#4a4644';o.lineWidth=1;for(let k=-6;k<=6;k+=3){o.beginPath();o.moveTo(330+k,516);o.lineTo(330+k,524);o.stroke()}
  /* 게시판 */o.fillStyle='rgba(0,0,0,.4)';o.fillRect(566,222,46,4);o.fillStyle='#4a3018';o.fillRect(566,190,4,34);o.fillRect(604,190,4,34);o.fillStyle='#6a4626';o.fillRect(560,184,54,34);o.fillStyle='#e8dcc0';o.fillRect(563,187,48,28);
  for(const [px,py,pw,ph,pc] of [[565,189,18,12,'#f4ecd8'],[586,190,22,14,'#efe0c0'],[568,203,26,10,'#f8f0e0']]){o.fillStyle=pc;o.fillRect(px,py,pw,ph);o.fillStyle='rgba(60,40,20,.5)';for(let k=0;k<3;k++)o.fillRect(px+2,py+3+k*3,pw-4-k*3,.8);o.fillStyle='#c83a3a';o.beginPath();o.arc(px+pw/2,py+1,.9,0,TAU);o.fill()}}
 function cobble(o,x,y,rx,ry,hu,sa,l,rot){o.fillStyle='rgba(0,0,0,.45)';o.beginPath();o.ellipse(x+.5,y+.7,rx,ry,rot||0,0,TAU);o.fill();o.fillStyle=hsl(hu,sa,l);o.beginPath();o.ellipse(x,y,rx,ry,rot||0,0,TAU);o.fill();
  o.fillStyle=hsl(hu,sa,l+12,.55);o.beginPath();o.ellipse(x-rx*.25,y-ry*.35,rx*.55,ry*.4,rot||0,0,TAU);o.fill();if(rnd()<.25){o.fillStyle='rgba(0,0,0,.12)';o.fillRect(x+rr(-rx/2,rx/2),y+rr(-ry/2,ry/2),1,.6)}}
 function bed(o,x,y,w,h){o.fillStyle='rgba(0,0,0,.45)';o.fillRect(x+2,y+3,w,h);o.fillStyle='#6a6460';o.fillRect(x-2,y-2,w+4,h+4);o.fillStyle='#8a847e';o.fillRect(x-2,y-2,w+4,1.2);
  const g=o.createLinearGradient(0,y,0,y+h);g.addColorStop(0,'#3a2a1c');g.addColorStop(1,'#24180e');o.fillStyle=g;o.fillRect(x,y,w,h);
  for(let i=0;i<120;i++){o.fillStyle=hsl(rr(90,130),rr(35,55),rr(18,34));o.beginPath();o.ellipse(x+rr(2,w-2),y+rr(2,h-2),rr(1,2.4),rr(.8,1.6),rr(0,3),0,TAU);o.fill()}
  const FC=[[350,80,62],[45,95,60],[0,0,96],[280,60,70],[20,90,58]];for(let i=0;i<46;i++){const [hh,ss,ll]=FC[i%FC.length],fx=x+rr(4,w-4),fy=y+rr(3,h-3);for(let k=0;k<5;k++){const a=k/5*TAU;o.fillStyle=hsl(hh,ss,ll);o.beginPath();o.arc(fx+Math.cos(a)*1.1,fy+Math.sin(a)*1.1,.9,0,TAU);o.fill()}o.fillStyle='#ffe070';o.beginPath();o.arc(fx,fy,.6,0,TAU);o.fill()}}
 function bench(o,x,y,back){o.fillStyle='rgba(0,0,0,.4)';o.beginPath();o.ellipse(x+3,y+6,20,4,0,0,TAU);o.fill();
  o.fillStyle='#1e1e24';for(const lx of [-14,11]){o.fillRect(x+lx,y-2,3,8);o.fillRect(x+lx-1,y+5,5,1.2)}
  for(let i=0;i<3;i++){const g=o.createLinearGradient(0,y-5+i*2,0,y-3+i*2);g.addColorStop(0,'#9a6a3a');g.addColorStop(1,'#5a3a1c');o.fillStyle=g;o.fillRect(x-17,y-5+i*2.2,34,1.8)}
  if(back){o.fillStyle='#1e1e24';o.fillRect(x-14,y-15,2,11);o.fillRect(x+12,y-15,2,11);for(let i=0;i<2;i++){const g=o.createLinearGradient(0,y-15+i*3,0,y-13+i*3);g.addColorStop(0,'#9a6a3a');g.addColorStop(1,'#5a3a1c');o.fillStyle=g;o.fillRect(x-17,y-15+i*3.4,34,2.2)}}}
 /* ---------- 나무: 잎 덩어리를 미리 그려 둠 ---------- */
 const TC={};
 function treeImg(i){if(TC[i])return TC[i];sd=101+i*7;const S2=3,w=90,h=96,cv=document.createElement('canvas');cv.width=w*S2;cv.height=h*S2;const o=cv.getContext('2d');o.scale(S2,S2);const cx=w/2,cy=40;
  /* 줄기 */let g=o.createLinearGradient(cx-5,0,cx+5,0);g.addColorStop(0,'#2a1a10');g.addColorStop(.35,'#6a4628');g.addColorStop(1,'#1e120a');o.fillStyle=g;o.beginPath();o.moveTo(cx-4,h-6);o.lineTo(cx-3,cy+8);o.lineTo(cx+3,cy+8);o.lineTo(cx+5,h-6);o.closePath();o.fill();
  o.fillStyle='#3a2414';o.beginPath();o.ellipse(cx-6,h-6,4,1.6,0,0,TAU);o.ellipse(cx+7,h-6,4,1.6,0,0,TAU);o.fill();for(let k=0;k<10;k++){o.fillStyle='rgba(0,0,0,.25)';o.fillRect(cx+rr(-3,3),rr(cy+10,h-8),rr(.6,1.2),rr(2,5))}
  /* 잎: 아래 · 안쪽은 어둡게, 위 왼쪽은 밝게 */const blobs=[];for(let k=0;k<70;k++){const a=rr(0,TAU),d=Math.sqrt(rnd())*30;blobs.push([cx+Math.cos(a)*d*1.15,cy-6+Math.sin(a)*d*.85,rr(6,11)])}
  blobs.sort((p,q)=>p[1]-q[1]);for(const [x,y,r] of blobs){const lit=Math.max(0,Math.min(1,.55-(x-cx)/70-(y-cy)/60));g=o.createRadialGradient(x-r*.35,y-r*.4,r*.1,x,y,r);
   g.addColorStop(0,hsl(rr(95,115),rr(40,55),18+lit*30));g.addColorStop(1,hsl(rr(110,130),rr(40,55),8+lit*12));o.fillStyle=g;o.beginPath();o.arc(x,y,r,0,TAU);o.fill()}
  for(let k=0;k<160;k++){const a=rr(0,TAU),d=Math.sqrt(rnd())*36,x=cx+Math.cos(a)*d*1.1,y=cy-8+Math.sin(a)*d*.85,lit=Math.max(0,.6-(x-cx)/60-(y-cy)/50);o.fillStyle=hsl(rr(85,120),rr(40,60),20+lit*40,.8);o.beginPath();o.ellipse(x,y,rr(.8,1.8),rr(.6,1.2),rr(0,3),0,TAU);o.fill()}
  TC[i]={cv,w,h,ax:cx,ay:h-6};return TC[i]}
 /* ---------- 비둘기 ---------- */
 const BIRDS=[];let lastT=0;
 function birdsInit(){const z=Z();if(BIRDS.length)return;for(let i=0;i<9;i++)BIRDS.push(spawnBird(z,true))}
 function spawnBird(z,ground){const F=z.FOUNT;let x,y;do{x=rr(60,900);y=rr(z.TOPY+20,580)}while(Math.hypot(x-F.x,(y-F.y)*1.6)<F.r+20);
  return {x,y,tx:x,ty:y,st:ground?'walk':'land',t:rr(0,3),fx:rnd()<.5?-1:1,h:ground?0:60,vx:0,vy:0,peck:0,col:rr(-6,6)}}
 function birdsTick(dt){const z=Z();if(!z)return;const S=z.S,pts=[[P.x,P.y]];for(const k in S.O){const M=S.O[k];if(M.sx!=null)pts.push([M.sx,M.sy])}
  for(let i=0;i<BIRDS.length;i++){const b=BIRDS[i];b.t+=dt;
   if(b.st==='walk'){const near=pts.some(([x,y])=>Math.hypot(x-b.x,(y-b.y)*1.3)<34);if(near){b.st='fly';b.vx=(b.x<P.x?-1:1)*rr(60,90);b.vy=-rr(40,70);b.fx=Math.sign(b.vx);try{sfx(900,.05,'triangle',.008,1400)}catch(e){}continue}
    if(b.peck>0){b.peck-=dt;continue}const dx=b.tx-b.x,dy=b.ty-b.y,d=Math.hypot(dx,dy);if(d<1.5){if(rnd()<.5)b.peck=rr(.6,1.6);else{b.tx=b.x+rr(-30,30);b.ty=Math.max(z.TOPY+16,Math.min(585,b.y+rr(-16,16)))}}
    else{b.x+=dx/d*14*dt;b.y+=dy/d*14*dt;b.fx=dx<0?-1:1}}
   else if(b.st==='fly'){b.x+=b.vx*dt;b.h+=-b.vy*dt;b.vy*=.995;if(b.h>140||b.x<-30||b.x>990)BIRDS[i]=Object.assign(spawnBird(z,false),{st:'land',h:140})}
   else if(b.st==='land'){b.h-=50*dt;if(b.h<=0){b.h=0;b.st='walk'}}}}
 function drawBird(c,b,now){const y=b.y-b.h,fl=b.fx<0,flap=b.st!=='walk'?Math.sin(now/45+b.x)*1:0;
  if(b.h>0){c.fillStyle='rgba(0,0,0,'+Math.max(.05,.3-b.h/300)+')';c.beginPath();c.ellipse(b.x,b.y+1,5,1.6,0,0,TAU);c.fill()}else{c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(b.x,b.y+1,5.4,1.7,0,0,TAU);c.fill()}
  c.save();c.translate(b.x,y);c.scale(fl?-1.7:1.7,1.7);const pk=b.peck>0?Math.abs(Math.sin(now/90))*1.6:0;
  if(b.st==='walk'){c.strokeStyle='#c86a6a';c.lineWidth=.5;c.beginPath();c.moveTo(-.5,-1);c.lineTo(-1,0);c.moveTo(.6,-1);c.lineTo(1,0);c.stroke()}
  let g=c.createLinearGradient(0,-5,0,-1);g.addColorStop(0,hsl(230,8+b.col,62));g.addColorStop(1,hsl(230,6,40));c.fillStyle=g;c.beginPath();c.ellipse(0,-2.6,3.4,2,0,0,TAU);c.fill();
  c.fillStyle=hsl(230,6,32);c.beginPath();c.moveTo(-2.8,-2.6);c.lineTo(-5,-3.6+flap);c.lineTo(-4.6,-2);c.fill();
  if(b.st!=='walk'){c.fillStyle=hsl(230,8,55);c.beginPath();c.moveTo(-1,-3.4);c.lineTo(1.5,-7-flap*3);c.lineTo(2,-3);c.fill()}else{c.fillStyle=hsl(230,6,48);c.beginPath();c.ellipse(-.4,-2.9,2,1.1,-.2,0,TAU);c.fill();c.fillStyle='rgba(30,30,40,.6)';c.fillRect(-1.6,-2.6,1.6,.4);c.fillRect(-1.2,-2.1,1.4,.4)}
  c.fillStyle=hsl(150,30,40,.8);c.beginPath();c.ellipse(2.4,-3.6+pk,1,1.2,0,0,TAU);c.fill();c.fillStyle=hsl(230,8,58);c.beginPath();c.arc(3,-4.6+pk,1.2,0,TAU);c.fill();
  c.fillStyle='#e8d0a0';c.fillRect(4,-4.7+pk,1,.5);c.fillStyle='#ff6a3a';c.fillRect(3.2,-5.1+pk,.5,.5);c.restore()}
 /* ---------- 매 프레임 ---------- */
 function under(c,now,cam){const z=Z(),S=z.S,bg=S.bg;const sx=Math.max(0,cam.x),sy=Math.max(0,cam.y);c.imageSmoothingEnabled=true;
  c.drawImage(bg,sx*R,sy*R,W*R,H*R,sx,sy,W,H);
  /* 가로등 빛 웅덩이 */c.save();c.globalCompositeOperation='lighter';for(const [x,y] of z.LAMPS){if(x<cam.x-90||x>cam.x+W+90||y<cam.y-60||y>cam.y+H+80)continue;const f=.85+.15*Math.sin(now/90+x)*Math.sin(now/37+y);
   c.save();c.translate(x,y+4);c.scale(1,.55);const g=c.createRadialGradient(0,0,0,0,0,70);g.addColorStop(0,'rgba(255,190,110,'+(.32*f)+')');g.addColorStop(.5,'rgba(255,150,80,'+(.12*f)+')');g.addColorStop(1,'rgba(255,140,70,0)');c.fillStyle=g;c.beginPath();c.arc(0,0,70,0,TAU);c.fill();c.restore()}
  /* 탑 창문 빛이 땅에 */const g2=c.createRadialGradient(480,190,0,480,190,90);g2.addColorStop(0,'rgba(255,170,90,.16)');g2.addColorStop(1,'rgba(255,170,90,0)');c.fillStyle=g2;c.fillRect(380,150,200,120);c.restore()}
 function fountain(c,now){const F=Z().FOUNT,t=now/1000,{x,y,r}=F;
  /* 바깥 돌 테 */let g=c.createLinearGradient(x-r,0,x+r,0);g.addColorStop(0,'#5a544e');g.addColorStop(.4,'#9a928a');g.addColorStop(1,'#46403a');c.fillStyle='#2a2622';c.beginPath();c.ellipse(x,y+5,r+7,(r+7)/1.6,0,0,TAU);c.fill();
  c.fillStyle=g;c.beginPath();c.ellipse(x,y+2,r+6,(r+6)/1.6,0,0,TAU);c.fill();c.fillStyle='#b8b0a6';c.beginPath();c.ellipse(x,y,r+5,(r+5)/1.6,0,0,TAU);c.fill();
  /* 물 */g=c.createLinearGradient(0,y-r/1.6,0,y+r/1.6);g.addColorStop(0,'#1a4a6a');g.addColorStop(.5,'#2a7aa0');g.addColorStop(1,'#14405a');c.fillStyle=g;c.beginPath();c.ellipse(x,y,r,r/1.6,0,0,TAU);c.fill();
  c.save();c.beginPath();c.ellipse(x,y,r,r/1.6,0,0,TAU);c.clip();g=c.createLinearGradient(0,y-r/1.6,0,y);g.addColorStop(0,'rgba(240,160,120,.35)');g.addColorStop(1,'rgba(240,160,120,0)');c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r);
  for(let i=0;i<4;i++){const q=(t*.45+i/4)%1,rr2=8+q*(r-6);c.strokeStyle='rgba(220,245,255,'+(.35*(1-q))+')';c.lineWidth=.8;c.beginPath();c.ellipse(x,y+2,rr2,rr2/1.6,0,0,TAU);c.stroke()}
  for(let i=0;i<26;i++){const a=i*2.4+t*.6,d=12+((i*37)%(r-14)),px=x+Math.cos(a)*d,py=y+Math.sin(a)*d/1.6,tw=.5+.5*Math.sin(t*5+i*1.7);c.fillStyle='rgba(255,255,255,'+(.5*tw)+')';c.fillRect(px,py,1.6,.6)}c.restore();
  c.strokeStyle='rgba(255,255,255,.25)';c.lineWidth=.8;c.beginPath();c.ellipse(x,y,r,r/1.6,0,Math.PI*1.05,Math.PI*1.95);c.stroke();
  /* 기둥 · 위 그릇 */g=c.createLinearGradient(x-7,0,x+7,0);g.addColorStop(0,'#6a645e');g.addColorStop(.4,'#c8c0b6');g.addColorStop(1,'#5a544e');c.fillStyle=g;c.fillRect(x-5,y-24,10,24);c.fillRect(x-8,y-3,16,4);
  c.fillStyle='#4a443e';c.beginPath();c.ellipse(x,y-24,18,6,0,0,TAU);c.fill();g=c.createLinearGradient(x-18,0,x+18,0);g.addColorStop(0,'#7a746c');g.addColorStop(.4,'#d0c8be');g.addColorStop(1,'#6a645c');c.fillStyle=g;c.beginPath();c.ellipse(x,y-26,18,6,0,0,TAU);c.fill();
  c.fillStyle='#2a7aa0';c.beginPath();c.ellipse(x,y-27,15,4.4,0,0,TAU);c.fill();c.fillStyle='#a8a096';c.fillRect(x-2,y-38,4,11);c.beginPath();c.arc(x,y-38,3,0,TAU);c.fill();
  /* 물줄기: 위에서 솟고 그릇 가장자리로 흘러내림 */c.save();c.globalCompositeOperation='lighter';for(let i=0;i<10;i++){const a=i/10*TAU,q=(t*1.2+i*.1)%1;c.strokeStyle='rgba(190,230,255,.35)';c.lineWidth=1;c.beginPath();c.moveTo(x,y-40);
   c.quadraticCurveTo(x+Math.cos(a)*8,y-52,x+Math.cos(a)*14,y-27+Math.sin(a)*4);c.stroke();c.fillStyle='rgba(230,248,255,.7)';const bx=x+Math.cos(a)*14*q,by=y-40-Math.sin(q*Math.PI)*12+q*13+Math.sin(a)*4*q;c.fillRect(bx,by,1.2,1.2)}
  for(let i=0;i<16;i++){const a=i/16*TAU,q=(t*1.5+i*.37)%1,ex=x+Math.cos(a)*16,ey=y-26+Math.sin(a)*4.6;c.strokeStyle='rgba(190,230,255,'+(.3*(1-q*.5))+')';c.beginPath();c.moveTo(ex,ey);c.lineTo(ex+Math.cos(a)*q*3,ey+q*22);c.stroke()}
  for(let i=0;i<20;i++){const q=(t*.9+i*.29)%1,a=i*1.9;c.fillStyle='rgba(220,240,255,'+(.4*(1-q))+')';c.fillRect(x+Math.cos(a)*(16+q*8),y-4+Math.sin(a)*6-q*6,1,1)}c.restore()}
 function lamp(c,x,y,now){const f=.85+.15*Math.sin(now/90+x)*Math.sin(now/37+y);
  let g=c.createLinearGradient(x-2,0,x+2,0);g.addColorStop(0,'#141418');g.addColorStop(.5,'#4a4a56');g.addColorStop(1,'#101014');c.fillStyle='#18181e';c.fillRect(x-4,y-3,8,4);c.fillRect(x-3,y-6,6,3);c.fillStyle=g;c.fillRect(x-1.4,y-34,2.8,30);
  c.fillStyle='#18181e';c.fillRect(x-3,y-36,6,2.4);c.beginPath();c.moveTo(x-5,y-48);c.lineTo(x+5,y-48);c.lineTo(x+3,y-36);c.lineTo(x-3,y-36);c.closePath();c.fill();
  g=c.createLinearGradient(0,y-47,0,y-37);g.addColorStop(0,'rgba(255,240,190,'+f+')');g.addColorStop(1,'rgba(255,170,80,'+f+')');c.fillStyle=g;c.beginPath();c.moveTo(x-3.8,y-47);c.lineTo(x+3.8,y-47);c.lineTo(x+2.4,y-38);c.lineTo(x-2.4,y-38);c.closePath();c.fill();
  c.fillStyle='#18181e';c.fillRect(x-.4,y-47,.8,9);c.beginPath();c.moveTo(x-6,y-48);c.lineTo(x,y-53);c.lineTo(x+6,y-48);c.closePath();c.fill();c.beginPath();c.arc(x,y-54,1.2,0,TAU);c.fill()}
 function torch(c,x,y,now){c.fillStyle='#2a2420';c.fillRect(x-1,y,2,8);c.fillStyle='#4a3a2a';c.fillRect(x-2.4,y-1,4.8,2);for(let i=0;i<6;i++){const q=(now/160+i/6)%1;c.fillStyle='rgba(255,'+Math.round(200-q*140)+',60,'+(1-q)+')';c.beginPath();c.arc(x+Math.sin(now/80+i)*1.2*q,y-2-q*8,2.4*(1-q)+.6,0,TAU);c.fill()}}
 function objs(now){const z=Z(),t=now/1000,L=[];const dt=Math.min(.05,Math.max(0,(now-(lastT||now))/1000));lastT=now;birdsInit();birdsTick(dt);
  L.push({y:z.FOUNT.y,fn:()=>fountain(ctx,now)});
  const ppl=[[P.x,P.y]];for(const k in z.S.O){const M=z.S.O[k];if(M.sx!=null)ppl.push([M.sx,M.sy])}
  z.TREES.forEach(([x,y],i)=>L.push({y,fn:()=>{const T=treeImg(i),sw=Math.sin(t*1.1+i)*.6,hid=ppl.some(([px,py])=>py<y-2&&py>y-80&&Math.abs(px-x)<40);/* 뒤에 사람이 있으면 잎을 비치게 */ctx.save();if(hid)ctx.globalAlpha=.55;ctx.translate(x,y);ctx.transform(1,0,sw*.012,1,0,0);ctx.drawImage(T.cv,-T.ax,-T.ay,T.w,T.h);ctx.restore()}}));
  for(const [x,y] of z.LAMPS)L.push({y,fn:()=>lamp(ctx,x,y,now)});
  L.push({y:176,fn:()=>{torch(ctx,446,138,now);torch(ctx,514,138,now)}});
  for(const b of BIRDS)L.push({y:b.y,fn:()=>drawBird(ctx,b,now)});
  return L}
 /* 떨어지는 잎 */const LEAF=[];
 function over(c,now,cam){const z=Z();
  /* 저녁 빛: 살짝 푸르스름하게 어둡게(곱하기) */c.save();c.globalCompositeOperation='multiply';c.fillStyle='#cfc6dc';c.fillRect(cam.x,cam.y,W,H);c.restore();
  /* 빛 번짐 */c.save();c.globalCompositeOperation='lighter';for(const [x,y] of z.LAMPS){const f=.85+.15*Math.sin(now/90+x)*Math.sin(now/37+y),g=c.createRadialGradient(x,y-42,0,x,y-42,26);g.addColorStop(0,'rgba(255,220,150,'+(.55*f)+')');g.addColorStop(1,'rgba(255,170,90,0)');c.fillStyle=g;c.fillRect(x-26,y-68,52,52)}
  for(const tx of [446,514]){const g=c.createRadialGradient(tx,132,0,tx,132,30);g.addColorStop(0,'rgba(255,160,70,.45)');g.addColorStop(1,'rgba(255,140,60,0)');c.fillStyle=g;c.fillRect(tx-30,102,60,60)}
  for(const [wx,wy] of [[442,40],[518,40],[442,86],[518,86]]){const g=c.createRadialGradient(wx,wy,0,wx,wy,22);g.addColorStop(0,'rgba(255,200,120,.3)');g.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=g;c.fillRect(wx-22,wy-22,44,44)}c.restore();
  /* 잎 */if(LEAF.length<14&&Math.random()<.03){const [tx,ty]=z.TREES[Math.floor(Math.random()*z.TREES.length)];LEAF.push({x:tx+rr(-20,20),y:ty-40,vx:rr(4,14),vy:rr(8,14),r:rr(0,6),h:hsl(rr(20,45),70,rr(35,50)),t:now})}
  for(let i=LEAF.length-1;i>=0;i--){const l=LEAF[i],a=(now-l.t)/1000;if(a>6){LEAF.splice(i,1);continue}const x=l.x+l.vx*a+Math.sin(a*2+l.r)*6,y=l.y+l.vy*a;c.save();c.globalAlpha=Math.min(1,(6-a)/1.5);c.translate(x,y);c.rotate(a*2+l.r);c.fillStyle=l.h;c.beginPath();c.ellipse(0,0,1.8,.9,0,0,TAU);c.fill();c.restore()}
  /* 가장자리 어둡게 */const g=c.createRadialGradient(cam.x+W/2,cam.y+H/2,H*.45,cam.x+W/2,cam.y+H/2,W*.62);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(5,5,20,.42)');c.fillStyle=g;c.fillRect(cam.x,cam.y,W,H)}
 window.PLZART={build,under,objs,over,R};
}catch(e){console.error('v115 plaza art',e)}})();
