/* ================= v156 넓은 광장 (PB156) =================
   - 광장(PLZ111)을 약 5배로 넓힌다. 가운데 원래 광장(0~960 × 0~600)은 그대로 두고(분수 · 탑 · 열쇠 · 성문 자리 그대로)
     왼쪽 · 오른쪽 · 아래로 세상을 늘린다: x -560~1520, y 0~1240 (PLZ111.B).
   - 새 구역: 서쪽 「시장 거리」(가게 8채 · 상인 · 등불 줄) · 동쪽 「달빛 정원」(정자 · 연못 · 잉어 · 꽃밭) · 가운데 아래 「큰길」(가로등 · 의자) ·
     남서 「숲속 캠프」(텐트 · 모닥불 · 반딧불) · 「풍차 언덕」(돌아가는 풍차 · 꽃) · 「야외 무대」(조명 · 연주자 · 관객석) ·
     「회전목마」(돌아가는 말 · 전구) · 남동 「별빛 호수」(배 · 오리 · 나무 다리).
   - 배경은 build() 감싸기: 원래 가운데 그림(두 배 해상도)은 그대로, 바깥 넓은 그림은 한 배 해상도 한 장(_out)과 작은 지도(_mini).
   - 움직이는 물체는 objs() 감싸기(화면에 보이는 것만), 물결 · 빛 웅덩이는 under() 대신, 빛 · 반딧불 · 구역 이름은 over() 감싸기.
   - 막는 곳은 PLZ111.OBST에 더한다(원 · 네모 · 함수). */
(()=>{try{
 const z=window.PLZ111,A=window.PLZART;if(!z||!A||!z.B||!A.kit)return;
 const K=A.kit,{hsl,rr}=K,TAU=Math.PI*2,R=A.R;
 const B=z.B;B.x0=-560;B.x1=1520;B.y1=1240;
 const WW=z.WW,WH=z.WH,TOPY=z.TOPY;
 /* ---------- 자리 ---------- */
 const STALLS=[[-500,262,0],[-380,262,1],[-260,262,2],[-140,262,3],[-500,520,4],[-380,520,5],[-260,520,6],[-140,520,7]];
 const GAZ={x:1100,y:268},POND={x:1300,y:400,rx:118,ry:62};
 const TENTS=[[-440,930,0],[-150,950,1],[-340,1160,2]],FIRE={x:-280,y:1030};
 const MILL={x:210,y:910},CARO={x:810,y:990,r:62};
 const STAGE={x:380,y:846,w:200,h:76},SEATS=[[420,1000],[540,1000],[420,1060],[540,1060],[420,1120],[540,1120]];
 const LAKE={x:1260,y:1040,rx:210,ry:118},PIER={x:1150,w:30,y0:880,y1:1010};
 const SIGNS=[[-40,318,'← 시장 거리'],[1000,318,'달빛 정원 →'],[480,780,'▼ 야외 무대'],[-120,800,'숲속 캠프'],[230,790,'풍차 언덕'],[810,800,'회전목마'],[1080,800,'별빛 호수 →']];
 const NT=[[-520,230],[-30,560],[1480,230],[1490,560],[990,560],[1180,580],[1440,300],
  [-520,820],[-460,1060],[-500,1200],[-380,820],[-220,860],[-80,880],[-60,1080],[-180,1200],[60,1180],[40,830],[-420,1090],[80,1000],
  [300,1200],[640,1200],[690,800],[940,1210],[970,860],[1490,800],[1500,1200],[990,1200]];
 const NL=[];for(let x=-500;x<=1460;x+=196){if(Math.abs(x-480)<60)continue;NL.push([x,614],[x,750])}
 NL.push([-440,330],[-200,330],[-440,432],[-200,432],[1030,440],[1180,520],[1178,1006],[640,880],[320,880],[700,1100],[920,1100],[150,1100],[-40,1000]);
 const ZONES=[{n:'🏮 시장 거리',x0:-560,x1:0,y0:176,y1:600},{n:'🌙 달빛 정원',x0:960,x1:1520,y0:176,y1:600},{n:'🛤 큰길',x0:-560,x1:1520,y0:600,y1:760},
  {n:'🔥 숲속 캠프',x0:-560,x1:120,y0:760,y1:1240},{n:'🌾 풍차 언덕',x0:120,x1:300,y0:760,y1:1240},{n:'🎤 야외 무대',x0:300,x1:660,y0:760,y1:1240},
  {n:'🎠 회전목마',x0:660,x1:960,y0:760,y1:1240},{n:'🌊 별빛 호수',x0:960,x1:1520,y0:760,y1:1240},{n:'⛲ 중앙 광장',x0:0,x1:960,y0:176,y1:600}];
 /* ---------- 막는 곳 ---------- */
 const O=z.OBST;
 for(const [x,y] of STALLS)O.push({x:x-34,y:y-22,w:68,h:24});
 O.push({x:GAZ.x,y:GAZ.y,r:38,ky:1.6},{x:POND.x,y:POND.y,r:POND.rx+4,ky:POND.rx/POND.ry});
 for(const [x,y] of TENTS)O.push({x:x-28,y:y-16,w:56,h:18});
 O.push({x:FIRE.x,y:FIRE.y,r:17,ky:1.6},{x:MILL.x,y:MILL.y,r:28,ky:1.6},{x:CARO.x,y:CARO.y,r:CARO.r+4,ky:1.6},{x:STAGE.x,y:STAGE.y,w:STAGE.w,h:STAGE.h});
 for(const [x,y] of SEATS)O.push({x:x-30,y:y-5,w:60,h:7});
 O.push({fn:(x,y)=>{const dx=(x-LAKE.x)/LAKE.rx,dy=(y-LAKE.y)/LAKE.ry;if(dx*dx+dy*dy>=1)return false;return !(x>PIER.x+4&&x<PIER.x+PIER.w-4&&y<PIER.y1)}});
 for(const [x,y] of NT){z.TREES.push([x,y]);O.push({x,y:y+2,r:13,ky:1.6})}
 for(const [x,y] of NL){z.LAMPS.push([x,y]);O.push({x,y,r:5,ky:1.6})}
 /* ---------- 바깥 배경(한 배 해상도) ---------- */
 const inZ=(x,y,a,b,c,d)=>x>=a&&x<b&&y>=c&&y<d;
 function grass(o,x0,y0,x1,y1,h,l){o.fillStyle=hsl(h,32,l);o.fillRect(x0,y0,x1-x0,y1-y0);
  const pal=[...Array(16)].map(()=>hsl(Math.round(rr(h-12,h+12)),Math.round(rr(28,50)),Math.round(rr(l-6,l+10)),.75));/* 색 목록을 미리(빨리 그리기) */
  for(let i=0;i<(x1-x0)*(y1-y0)/48;i++){o.fillStyle=pal[i&15];o.fillRect(rr(x0,x1),rr(y0,y1),rr(.8,1.6),rr(1.5,3.2))}
  for(let i=0;i<(x1-x0)*(y1-y0)/2600;i++){const x=rr(x0,x1),y=rr(y0,y1),g=o.createRadialGradient(x,y,0,x,y,rr(14,34));g.addColorStop(0,'rgba(0,0,0,.12)');g.addColorStop(1,'rgba(0,0,0,0)');o.fillStyle=g;o.fillRect(x-34,y-34,68,68)}}
 function cobArea(o,x0,y0,x1,y1,hu,l){o.fillStyle='#24211f';o.fillRect(x0,y0,x1-x0,y1-y0);o.save();o.beginPath();o.rect(x0,y0,x1-x0,y1-y0);o.clip();
  for(let y=y0+2;y<y1+6;y+=7){const off=(Math.floor(y/7)%2)*5;for(let x=x0-off;x<x1+8;x+=rr(9,12))K.cobble(o,x+rr(-1,1),y+rr(-1,1),rr(4,5.6),rr(2.8,3.6),rr(hu-8,hu+8),rr(6,14),rr(l-7,l+7))}o.restore()}
 function slabs(o,x0,y0,x1,y1,hu,l,sw,sh){for(let y=y0;y<y1;y+=sh)for(let x=x0+((Math.floor((y-y0)/sh)%2)?-sw/2:0);x<x1;x+=sw){const xa=Math.max(x0,x),xb=Math.min(x1,x+sw),hh=Math.min(sh,y1-y);if(xb<=xa)continue;
   o.fillStyle=hsl(rr(hu-5,hu+5),rr(18,30),rr(l-5,l+5));o.fillRect(xa+.6,y+.6,xb-xa-1.2,hh-1.2);o.fillStyle='rgba(255,240,210,.22)';o.fillRect(xa+.6,y+.6,xb-xa-1.2,1);o.fillStyle='rgba(0,0,0,.28)';o.fillRect(xa+.6,y+hh-1.4,xb-xa-1.2,.8)}}
 function dirt(o,x,y,rx,ry){const g=o.createRadialGradient(x,y,0,x,y,rx);g.addColorStop(0,'#6a5038');g.addColorStop(.75,'#5a4430');g.addColorStop(1,'rgba(70,56,40,0)');o.save();o.translate(x,y);o.scale(1,ry/rx);o.fillStyle=g;o.beginPath();o.arc(0,0,rx,0,TAU);o.fill();o.restore();
  for(let i=0;i<rx*ry/14;i++){const a=rr(0,TAU),d=Math.sqrt(rr(0,1))*.9;o.fillStyle=hsl(rr(25,38),rr(20,35),rr(22,42),.8);o.fillRect(x+Math.cos(a)*rx*d,y+Math.sin(a)*ry*d,rr(.8,2),rr(.6,1.4))}}
 function flowers(o,x0,y0,x1,y1,n,cols){for(let i=0;i<n;i++){const x=rr(x0,x1),y=rr(y0,y1),c=cols[i%cols.length];o.fillStyle='#2a4a24';o.fillRect(x,y,.6,3);for(let k=0;k<5;k++){const a=k/5*TAU;o.fillStyle=c;o.beginPath();o.arc(x+Math.cos(a)*1.1,y+Math.sin(a)*1.1,.85,0,TAU);o.fill()}o.fillStyle='#ffe070';o.beginPath();o.arc(x,y,.55,0,TAU);o.fill()}}
 function hedge(o,x,y,w,h){o.fillStyle='rgba(0,0,0,.4)';o.fillRect(x+2,y+h-2,w,5);o.fillStyle='#1e3a1e';o.fillRect(x,y,w,h);const pal=[...Array(8)].map(()=>hsl(Math.round(rr(100,130)),Math.round(rr(35,50)),Math.round(rr(14,30))));for(let i=0;i<w*h/9;i++){o.fillStyle=pal[i&7];const r=rr(1.4,2.8);o.fillRect(rr(x,x+w)-r/2,rr(y,y+h)-r/2,r,r*.8)}
  o.fillStyle='rgba(255,240,200,.08)';o.fillRect(x,y,w,2)}
 function water(o,x,y,rx,ry,deep){o.save();o.translate(x,y);o.scale(1,ry/rx);o.fillStyle='#8a7a5a';o.beginPath();o.arc(0,0,rx+14,0,TAU);o.fill();o.fillStyle='#6a6a62';o.beginPath();o.arc(0,0,rx+5,0,TAU);o.fill();
  const g=o.createRadialGradient(0,-rx*.3,rx*.1,0,0,rx);g.addColorStop(0,deep?'#1c4a74':'#2a6a88');g.addColorStop(.7,deep?'#143a60':'#1e5070');g.addColorStop(1,'#0e2a44');o.fillStyle=g;o.beginPath();o.arc(0,0,rx,0,TAU);o.fill();
  o.strokeStyle='rgba(255,255,255,.18)';o.lineWidth=1.4;o.beginPath();o.arc(0,0,rx-2,Math.PI*1.08,Math.PI*1.92);o.stroke();o.restore();
  for(let i=0;i<rx*ry/40;i++){const a=rr(0,TAU),d=rr(1,1.12);o.fillStyle=hsl(rr(30,45),rr(10,25),rr(40,60),.8);o.beginPath();o.ellipse(x+Math.cos(a)*(rx+8)*d,y+Math.sin(a)*(ry+8*ry/rx)*d,rr(1,2.4),rr(.8,1.6),0,0,TAU);o.fill()}}
 function buildOut(core){const OW=B.x1-B.x0,OH=B.y1,cv=document.createElement('canvas');cv.width=OW;cv.height=OH;const o=cv.getContext('2d');o.translate(-B.x0,0);let g;
  /* 여러 조각으로 나눠 프레임마다 하나씩 그림(들어갈 때 멈춤 없게) */const steps=[()=>{
  /* 하늘 · 별 · 구름 · 언덕 · 먼 집 (가운데 그림과 같은 색) */g=o.createLinearGradient(0,0,0,170);g.addColorStop(0,'#101a3a');g.addColorStop(.45,'#3b3f72');g.addColorStop(.78,'#b0607a');g.addColorStop(1,'#f0a060');o.fillStyle=g;o.fillRect(B.x0,0,OW,176);
  for(let i=0;i<200;i++){const y=rr(0,80);o.fillStyle='rgba(255,255,255,'+(.15+.5*(1-y/80))*rr(0,1)+')';o.fillRect(rr(B.x0,B.x1),y,.8,.8)}
  g=o.createRadialGradient(-300,40,0,-300,40,40);g.addColorStop(0,'rgba(255,250,220,.95)');g.addColorStop(.3,'rgba(255,240,200,.35)');g.addColorStop(1,'rgba(255,240,200,0)');o.fillStyle=g;o.fillRect(-340,0,80,80);o.fillStyle='#f6f0dc';o.beginPath();o.arc(-300,40,9,0,TAU);o.fill();o.fillStyle='rgba(180,170,150,.5)';o.beginPath();o.arc(-303,38,2,0,TAU);o.arc(-297,43,1.4,0,TAU);o.fill();/* 달 */
  for(let i=0;i<22;i++){const cx=rr(B.x0,B.x1),cy=rr(40,120),w=rr(60,150),h=rr(6,14);for(let k=0;k<6;k++){const x=cx+rr(-w/2,w/2),y=cy+rr(-h/2,h/2),r=rr(h*.8,h*1.8);g=o.createRadialGradient(x,y-r*.3,0,x,y,r*1.6);g.addColorStop(0,'rgba(255,190,160,.26)');g.addColorStop(.6,'rgba(150,110,150,.14)');g.addColorStop(1,'rgba(80,70,120,0)');o.fillStyle=g;o.beginPath();o.ellipse(x,y,r*2.2,r,0,0,TAU);o.fill()}}
  o.fillStyle='rgba(70,60,110,.85)';o.beginPath();o.moveTo(B.x0,176);for(let x=B.x0;x<=B.x1;x+=8)o.lineTo(x,150-Math.sin(x/90)*10-Math.sin(x/37)*5);o.lineTo(B.x1,176);o.fill();
  for(let x=B.x0-10;x<B.x1;x+=rr(14,30)){const w=rr(12,26),h=rr(10,28),y=166-h;o.fillStyle=hsl(250,22,22+rr(0,6));o.fillRect(x,y,w,h+12);o.beginPath();o.moveTo(x-2,y);o.lineTo(x+w/2,y-rr(6,12));o.lineTo(x+w+2,y);o.fill();for(let k=0;k<3;k++)if(rr(0,1)<.55){o.fillStyle='rgba(255,200,120,'+rr(.5,.9)+')';o.fillRect(x+rr(2,w-4),y+rr(4,h),1.6,2)}}
  g=o.createLinearGradient(0,120,0,176);g.addColorStop(0,'rgba(240,150,110,0)');g.addColorStop(1,'rgba(240,160,120,.35)');o.fillStyle=g;o.fillRect(B.x0,120,OW,56);
  },()=>{
  /* 성벽(양쪽) */const wt=106;for(const [a,b] of [[B.x0,0],[WW,B.x1]]){K.stones(o,a,wt,b-a,TOPY-wt,[28,24,30],7,9,16,30);for(let x=a;x<b;x+=34){K.stones(o,x,wt-12,20,12,[28,24,32],5,6,8,10);o.fillStyle='rgba(0,0,0,.35)';o.fillRect(x+20,wt-12,14,12)}
   g=o.createLinearGradient(0,wt,0,TOPY);g.addColorStop(0,'rgba(255,190,140,.12)');g.addColorStop(1,'rgba(0,0,0,.45)');o.fillStyle=g;o.fillRect(a,wt-12,b-a,TOPY-wt+12)}
  for(const vx of [-470,-90,1050,1420])for(let i=0;i<220;i++){const y=rr(wt-6,TOPY-2),sp=(y-wt)/(TOPY-wt),x=vx+rr(-22,22)*(.4+sp)+Math.sin(y/9)*4;o.fillStyle=hsl(rr(95,135),rr(35,55),rr(16,34));o.beginPath();o.ellipse(x,y,rr(1.2,2.6),rr(1,2),rr(0,3),0,TAU);o.fill()}
  /* 성벽 망루 2개(창 불빛) */for(const tx of [-320,1240]){const tw=74;K.stones(o,tx,40,tw,TOPY-40,[26,22,30],7,8,12,20);g=o.createLinearGradient(tx,0,tx+tw,0);g.addColorStop(0,'rgba(0,0,0,.5)');g.addColorStop(.3,'rgba(255,200,150,.12)');g.addColorStop(1,'rgba(0,0,0,.6)');o.fillStyle=g;o.fillRect(tx,40,tw,TOPY-40);
   for(let x=tx-4;x<tx+tw+4;x+=14){K.stones(o,x,28,9,12,[26,22,30],5,6,8,9)}for(const [wx,wy] of [[tx+14,64],[tx+tw-30,64],[tx+tw/2-8,108]]){K.arch(o,wx-2,wy-2,20,26,'#3a3430');g=o.createRadialGradient(wx+8,wy+14,1,wx+8,wy+12,14);g.addColorStop(0,'#ffe2a0');g.addColorStop(.6,'#e09040');g.addColorStop(1,'#5a2a10');o.fillStyle=g;K.arch(o,wx,wy,16,22,null)}
   o.fillStyle='#3a3a42';o.fillRect(tx+tw/2-1,0,2,30);o.fillStyle=tx<0?'#2a6a9a':'#6a2a9a';o.beginPath();o.moveTo(tx+tw/2+1,2);o.lineTo(tx+tw/2+22,8);o.lineTo(tx+tw/2+1,15);o.fill()}
  g=o.createLinearGradient(0,TOPY,0,TOPY+40);g.addColorStop(0,'rgba(10,8,20,.55)');g.addColorStop(1,'rgba(10,8,20,0)');
  /* ── 땅 ── */
  },()=>{
  /* 시장 거리 */cobArea(o,B.x0,TOPY,0,600,30,38);slabs(o,B.x0,342,0,418,34,50,22,9);o.fillStyle='rgba(0,0,0,.35)';o.fillRect(B.x0,341,560,1.4);o.fillRect(B.x0,418,560,1.4);
  for(const [x,y] of STALLS){const gg=o.createRadialGradient(x+6,y+4,4,x+6,y+4,48);gg.addColorStop(0,'rgba(5,5,15,.5)');gg.addColorStop(1,'rgba(5,5,15,0)');o.fillStyle=gg;o.beginPath();o.ellipse(x+6,y+4,50,14,0,0,TAU);o.fill()}
  for(let i=0;i<40;i++){const x=rr(-550,-10),y=rr(350,410);o.fillStyle=hsl(rr(10,50),rr(40,70),rr(30,50),.8);o.fillRect(x,y,rr(1,2.4),rr(.8,1.6))}/* 떨어진 과일 껍질 · 종이 */
  },()=>{
  /* 달빛 정원 */grass(o,WW,TOPY,B.x1,600,110,24);
  o.save();o.translate(POND.x,POND.y);o.scale(1,(POND.ry+26)/(POND.rx+30));o.strokeStyle='#8a7a5e';o.lineWidth=20;o.beginPath();o.arc(0,0,POND.rx+30,0,TAU);o.stroke();o.restore();
  for(let i=0;i<500;i++){const a=rr(0,TAU),d=rr(.9,1.1);o.fillStyle=hsl(35,rr(10,25),rr(42,62));o.beginPath();o.arc(POND.x+Math.cos(a)*(POND.rx+30)*d,POND.y+Math.sin(a)*(POND.ry+26)*d,rr(.6,1.4),0,TAU);o.fill()}
  slabs(o,WW,372,POND.x-POND.rx-30,402,36,46,18,10);slabs(o,GAZ.x-14,TOPY,GAZ.x+14,GAZ.y-30,36,46,14,9);slabs(o,GAZ.x-12,GAZ.y+30,GAZ.x+12,372,36,46,12,9);
  water(o,POND.x,POND.y,POND.rx,POND.ry,0);
  for(const [x,y,w] of [[990,200,120],[1360,200,120],[1000,470,90],[1400,500,90]])K.bed(o,x,y,w,24);
  hedge(o,WW+4,585,180,12);hedge(o,1330,585,186,12);
  o.fillStyle='rgba(5,5,15,.4)';o.beginPath();o.ellipse(GAZ.x+6,GAZ.y+8,52,22,0,0,TAU);o.fill();
  },()=>{
  /* 큰길 */cobArea(o,B.x0,600,B.x1,760,24,36);slabs(o,B.x0,664,B.x1,696,32,48,24,8);
  for(const yy of [600,760]){o.fillStyle='#7a7470';o.fillRect(B.x0,yy-2,OW,4);o.fillStyle='rgba(255,240,220,.25)';o.fillRect(B.x0,yy-2,OW,1)}
  for(let x=-460;x<1500;x+=196){if(Math.abs(x-480)<80)continue;K.bench(o,x+40,628,1);K.bench(o,x+40,744,0)}
  },()=>{
  /* 숲속 캠프 */grass(o,B.x0,760,120,B.y1,118,17);dirt(o,FIRE.x,FIRE.y,150,92);
  for(let i=0;i<260;i++){const x=rr(-555,115),y=rr(765,1235);o.fillStyle=hsl(rr(20,40),rr(50,70),rr(22,36),.8);o.save();o.translate(x,y);o.rotate(rr(0,3));o.beginPath();o.ellipse(0,0,1.8,.9,0,0,TAU);o.fill();o.restore()}
  for(const [x,y] of [[-500,880],[-120,1150],[60,940],[-380,1220]]){o.fillStyle='#5a5652';o.beginPath();o.ellipse(x,y,9,5,0,0,TAU);o.fill();o.fillStyle='#7a7672';o.beginPath();o.ellipse(x-1,y-1.4,7,3.4,0,0,TAU);o.fill()}/* 바위 */
  for(const [x,y] of [[-200,900],[-60,1000],[-470,1010],[0,1140]]){for(let k=0;k<3;k++){o.fillStyle=hsl(rr(0,10),rr(50,70),rr(40,50));o.beginPath();o.ellipse(x+k*5-5,y-2,3,2,0,Math.PI,TAU);o.fill();o.fillStyle='#e8e0d0';o.fillRect(x+k*5-5.6,y-2,1.2,2.4)}}/* 버섯 */
  },()=>{
  /* 풍차 언덕 */grass(o,120,760,300,B.y1,92,30);flowers(o,124,950,296,1236,420,['#ffd166','#ff8aa8','#ffffff','#c8a2ff','#ff9a4a']);
  slabs(o,196,770,224,880,36,44,14,9);for(let y=770;y<B.y1;y+=40)for(let k=0;k<4;k++){o.fillStyle=hsl(rr(40,55),rr(50,70),rr(48,60),.7);o.fillRect(rr(126,190),y+rr(0,40),.8,rr(3,6))}
  /* 야외 무대 앞마당 */slabs(o,300,760,660,B.y1,30,42,30,15);
  g=o.createRadialGradient(480,1060,0,480,1060,160);g.addColorStop(0,'rgba(255,220,180,.08)');g.addColorStop(1,'rgba(255,220,180,0)');o.fillStyle=g;o.fillRect(300,900,360,320);
  for(const [x,y] of SEATS)K.bench(o,x,y,1);
  for(const [x0,x1] of [[300,304],[656,660]]){o.fillStyle='#6a6460';o.fillRect(x0,760,x1-x0,B.y1-760)}
  },()=>{
  /* 회전목마 마당 */grass(o,660,760,960,B.y1,112,22);o.save();o.translate(CARO.x,CARO.y);o.scale(1,1/1.6);
  for(let r=CARO.r+60;r>CARO.r+4;r-=8){const n=Math.floor(r*TAU/10);for(let i=0;i<n;i++){const a=i/n*TAU;K.cobble(o,Math.cos(a)*r,Math.sin(a)*r,rr(4,5),rr(4,5)*1.4,rr(30,40),rr(4,10),rr(40,52))}}o.restore();
  slabs(o,796,760,824,CARO.y-CARO.r/1.6-40,36,44,14,9);
  },()=>{
  /* 별빛 호수 */grass(o,960,760,B.x1,B.y1,128,20);
  o.save();o.translate(LAKE.x,LAKE.y);o.scale(1,(LAKE.ry+40)/(LAKE.rx+46));const sg=o.createRadialGradient(0,0,LAKE.rx,0,0,LAKE.rx+46);sg.addColorStop(0,'#c8b48a');sg.addColorStop(.7,'#b09a70');sg.addColorStop(1,'rgba(150,130,90,0)');o.fillStyle=sg;o.beginPath();o.arc(0,0,LAKE.rx+46,0,TAU);o.fill();o.restore();
  water(o,LAKE.x,LAKE.y,LAKE.rx,LAKE.ry,1);
  for(let i=0;i<70;i++){const a=rr(Math.PI*.15,Math.PI*.85),x=LAKE.x+Math.cos(a)*(LAKE.rx-4)+rr(-6,6),y=LAKE.y+Math.sin(a)*(LAKE.ry-3);o.strokeStyle=hsl(rr(70,100),rr(30,50),rr(20,34));o.lineWidth=.8;o.beginPath();o.moveTo(x,y);o.lineTo(x+rr(-2,2),y-rr(5,10));o.stroke()}/* 갈대 */
  /* 나무 다리 */o.fillStyle='rgba(0,0,0,.4)';o.fillRect(PIER.x+3,PIER.y0+4,PIER.w,PIER.y1-PIER.y0);for(let y=PIER.y0;y<PIER.y1;y+=5){o.fillStyle=hsl(28,rr(30,42),rr(30,40));o.fillRect(PIER.x,y,PIER.w,4.2);o.fillStyle='rgba(255,230,190,.2)';o.fillRect(PIER.x,y,PIER.w,.8)}
  for(const py of [PIER.y0+30,PIER.y0+70,PIER.y1-4])for(const px of [PIER.x-2,PIER.x+PIER.w-1]){o.fillStyle='#3a2414';o.fillRect(px,py-6,3,10)}
  },()=>{
  /* 가장자리 울타리 · 생울타리 */hedge(o,B.x0,B.y1-14,OW,14);hedge(o,B.x0,TOPY,12,B.y1-TOPY);hedge(o,B.x1-12,TOPY,12,B.y1-TOPY);
  for(const x of [120,300,660,960])if(x!==300&&x!==660){o.fillStyle='rgba(0,0,0,.18)';o.fillRect(x-1,760,2,B.y1-760)}
  /* 새 나무 · 가로등 그늘 */for(const [x,y] of NT){g=o.createRadialGradient(x+10,y+4,2,x+10,y+4,30);g.addColorStop(0,'rgba(5,5,15,.5)');g.addColorStop(1,'rgba(5,5,15,0)');o.fillStyle=g;o.beginPath();o.ellipse(x+10,y+4,34,12,.15,0,TAU);o.fill()}
  for(const [x,y] of NL){o.fillStyle='rgba(5,5,15,.35)';o.beginPath();o.ellipse(x+3,y+2,5,2,0,0,TAU);o.fill()}
  /* 이음매(가운데 광장 둘레 돌테) */o.fillStyle='#7a7470';o.fillRect(-4,TOPY,4,600-TOPY);o.fillRect(WW,TOPY,4,600-TOPY)}];
  return {cv,steps,o}}
 function seamCore(core){const o=core.getContext('2d');o.save();o.setTransform(R,0,0,R,0,0);o.fillStyle='#7a7470';o.fillRect(0,596,WW,4);o.fillRect(0,TOPY,3,600-TOPY);o.fillRect(WW-3,TOPY,3,600-TOPY);o.fillStyle='rgba(255,240,220,.25)';o.fillRect(0,596,WW,1);o.restore()}
 function buildMini(core,out){const OW=B.x1-B.x0,mw=Math.round(OW/6),mh=Math.round(B.y1/6),m=document.createElement('canvas');m.width=mw;m.height=mh;const o=m.getContext('2d');o.imageSmoothingEnabled=true;
  o.drawImage(out,0,0,mw,mh);o.drawImage(core,(0-B.x0)/6,0,WW/6,WH/6);return m}
 {const f=A.build;A.build=function(){const core=f.apply(this,arguments);if(!core)return core;try{seamCore(core);const {cv,steps,o}=buildOut(core);core._out=cv;for(const f of ((window.PB156&&PB156.extra)||[]))steps.push(()=>f(o));/* v157 건물 등 덧그림 */
   /* 바깥 그림은 조각마다 다음 차례에(첫 화면은 가운데 광장이라 바로 보임) */let i=0;const run=()=>{try{steps[i++]()}catch(e){console.warn('v156 step',e)}if(i<steps.length)setTimeout(run,0);else{try{core._mini=buildMini(core,cv)}catch(e){}}};setTimeout(run,0)}catch(e){console.warn('v156 build',e)}return core}}
 /* ---------- 움직이는 물 · 빛 웅덩이 (under 대신) ---------- */
 const vis=(cam,x,y,m)=>x>cam.x-m&&x<cam.x+W+m&&y>cam.y-m&&y<cam.y+H+m;
 const KOI=[...Array(7)].map((_,i)=>({a:i*.9,r:.3+((i*37)%50)/100,s:(i%2?1:-1)*(.22+i*.03),c:['#ff7a2a','#ffffff','#ffb040','#ff5a3a','#f0e0c0','#ff8a4a','#e04a2a'][i]}));
 const PADS=[[-60,-20,9],[40,10,7],[70,-28,6],[-20,30,8],[-90,14,6]];
 function pondAnim(c,now){const t=now/1000,{x,y,rx,ry}=POND;c.save();c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.clip();
  for(const k of KOI){const a=k.a+t*k.s,px=x+Math.cos(a)*rx*k.r*1.6*.6,py=y+Math.sin(a)*ry*k.r,dir=a+Math.PI/2*Math.sign(k.s),sw=Math.sin(t*6+k.a)*.4;
   c.save();c.translate(px,py);c.rotate(dir+sw*.2);c.globalAlpha=.85;c.fillStyle=k.c;c.beginPath();c.ellipse(0,0,4.6,1.7,0,0,TAU);c.fill();c.beginPath();c.moveTo(-4,0);c.lineTo(-7,-1.8+sw);c.lineTo(-7,1.8+sw);c.fill();if(k.c==='#ffffff'){c.fillStyle='#ff5a2a';c.fillRect(-1,-1,2.4,2)}c.restore()}
  c.globalAlpha=1;for(const [dx,dy,r] of PADS){c.fillStyle='#2e6a34';c.beginPath();c.ellipse(x+dx,y+dy,r,r*.55,0,.3,TAU-.1);c.lineTo(x+dx,y+dy);c.fill();c.fillStyle='rgba(180,255,160,.25)';c.beginPath();c.ellipse(x+dx-r*.2,y+dy-r*.15,r*.5,r*.22,0,0,TAU);c.fill()}
  c.fillStyle='#ff9ac8';c.beginPath();c.arc(x-56,y-23,2.2,0,TAU);c.arc(x-18,y+28,2,0,TAU);c.fill();
  for(let i=0;i<3;i++){const q=(t*.35+i/3)%1;c.strokeStyle='rgba(220,245,255,'+(.3*(1-q))+')';c.lineWidth=.7;c.beginPath();c.ellipse(x+[30,-40,10][i],y+[-10,6,24][i],q*18,q*7,0,0,TAU);c.stroke()}
  for(let i=0;i<20;i++){const a=i*2.3+t*.3,d=(i*41%100)/100,tw=.5+.5*Math.sin(t*4+i);c.fillStyle='rgba(255,255,255,'+(.35*tw)+')';c.fillRect(x+Math.cos(a)*rx*d,y+Math.sin(a)*ry*d,1.4,.5)}c.restore()}
 const BOATS=[{a:0,s:.05,c:'#8a4a2a'},{a:2.6,s:-.04,c:'#3a5a8a'},{a:4.4,s:.035,c:'#8a2a3a'}];
 function lakeAnim(c,now){const t=now/1000,{x,y,rx,ry}=LAKE;c.save();c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.clip();
  /* 달 비침 · 반짝임 */const mg=c.createLinearGradient(0,y-ry,0,y+ry);mg.addColorStop(0,'rgba(255,240,200,.0)');mg.addColorStop(.5,'rgba(255,240,200,.14)');mg.addColorStop(1,'rgba(255,240,200,0)');c.fillStyle=mg;for(let i=0;i<16;i++){const yy=y-ry+i*ry*2/16,w=10+Math.sin(t*2+i)*6;c.fillRect(x+60-w/2+Math.sin(t+i)*4,yy,w,2)}
  for(let i=0;i<46;i++){const a=i*2.17+t*.15,d=((i*53)%100)/100,tw=.5+.5*Math.sin(t*3+i*1.3);c.fillStyle='rgba(220,235,255,'+(.4*tw)+')';c.fillRect(x+Math.cos(a)*rx*d,y+Math.sin(a)*ry*d,2.2,.5)}
  for(let i=0;i<4;i++){const q=(t*.25+i/4)%1;c.strokeStyle='rgba(220,245,255,'+(.22*(1-q))+')';c.lineWidth=.8;c.beginPath();c.ellipse(x+[-80,60,-20,120][i],y+[20,-30,50,30][i],q*30,q*10,0,0,TAU);c.stroke()}
  /* 배 */for(const b of BOATS){const a=b.a+t*b.s,bx=x+Math.cos(a)*rx*.62,by=y+Math.sin(a)*ry*.55,fl=Math.sin(a)*b.s>0?1:-1,bob=Math.sin(t*2+b.a)*.8;
   c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(bx,by+4,16,3.4,0,0,TAU);c.fill();c.strokeStyle='rgba(220,245,255,.3)';c.lineWidth=.6;c.beginPath();c.moveTo(bx-fl*16,by+3);c.lineTo(bx-fl*30,by+1);c.moveTo(bx-fl*16,by+4);c.lineTo(bx-fl*30,by+6);c.stroke();
   c.save();c.translate(bx,by+bob);c.scale(fl,1);c.fillStyle=b.c;c.beginPath();c.moveTo(-14,-3);c.lineTo(14,-4);c.lineTo(10,3);c.lineTo(-11,3);c.closePath();c.fill();c.fillStyle='rgba(255,255,255,.25)';c.fillRect(-13,-3.6,27,1);
   c.fillStyle='#5a3a20';c.fillRect(-9,-3,18,1.6);c.fillStyle='#2a2a3a';c.fillRect(-2,-11,5,8);c.fillStyle='#ffd8b0';c.beginPath();c.arc(.5,-13,2.6,0,TAU);c.fill();c.fillStyle=b.c==='#3a5a8a'?'#ffd166':'#e8e0d0';c.fillRect(-2,-16,5,2);
   const row=Math.sin(t*3+b.a);c.strokeStyle='#7a5030';c.lineWidth=1;c.beginPath();c.moveTo(.5,-7);c.lineTo(-8+row*3,2);c.stroke();c.restore()}
  c.restore();
  /* 오리 */for(let i=0;i<4;i++){const a=t*.08*(i%2?1:-1)+i*1.6,dx=x+Math.cos(a)*(rx*.82),dy=y+Math.sin(a)*(ry*.8),fl=(i%2?1:-1)*(Math.sin(a)>0?-1:1);c.save();c.translate(dx,dy+Math.sin(t*3+i)*.4);c.scale(fl*1.3,1.3);
   c.fillStyle='rgba(220,245,255,.25)';c.fillRect(-6,1,4,.5);c.fillStyle='#f0f0e8';c.beginPath();c.ellipse(0,0,3.6,1.8,0,0,TAU);c.fill();c.fillStyle=i===0?'#2a7a4a':'#f8f8f0';c.beginPath();c.arc(2.6,-2,1.4,0,TAU);c.fill();c.fillStyle='#ffa030';c.fillRect(3.8,-2.2,1.4,.8);c.restore()}}
 function pools(c,now,cam,list,col,rad,sy){c.save();c.globalCompositeOperation='lighter';for(const [x,y] of list){if(!vis(cam,x,y,rad))continue;const f=.85+.15*Math.sin(now/90+x)*Math.sin(now/37+y);c.save();c.translate(x,y+4);c.scale(1,sy);
   const g=c.createRadialGradient(0,0,0,0,0,rad);g.addColorStop(0,'rgba('+col+','+(.32*f)+')');g.addColorStop(.5,'rgba('+col+','+(.12*f)+')');g.addColorStop(1,'rgba('+col+',0)');c.fillStyle=g;c.beginPath();c.arc(0,0,rad,0,TAU);c.fill();c.restore()}c.restore()}
 A.under=function(c,now,cam){const S=z.S,bg=S.bg,out=bg&&bg._out;c.imageSmoothingEnabled=true;
  if(out&&!(cam.x>=0&&cam.x+W<=WW&&cam.y+H<=WH)){/* 가운데 광장만 보이면 바깥 그림은 건너뜀 */const sx=Math.max(0,Math.min(out.width-W,cam.x-B.x0)),sy=Math.max(0,Math.min(out.height-H,cam.y));c.drawImage(out,sx,sy,W,H,sx+B.x0,sy,W,H)}
  const x0=Math.max(0,cam.x),x1=Math.min(WW,cam.x+W),y0=Math.max(0,cam.y),y1=Math.min(WH,cam.y+H);if(x1>x0&&y1>y0)c.drawImage(bg,x0*R,y0*R,(x1-x0)*R,(y1-y0)*R,x0,y0,x1-x0,y1-y0);
  if(vis(cam,POND.x,POND.y,POND.rx))pondAnim(c,now);if(vis(cam,LAKE.x,LAKE.y,LAKE.rx))lakeAnim(c,now);
  pools(c,now,cam,z.LAMPS,'255,190,110',70,.55);
  if(vis(cam,FIRE.x,FIRE.y,120)){const f=.8+.2*Math.sin(now/70)*Math.sin(now/43);c.save();c.globalCompositeOperation='lighter';c.translate(FIRE.x,FIRE.y);c.scale(1,.6);const g=c.createRadialGradient(0,0,0,0,0,120);g.addColorStop(0,'rgba(255,150,60,'+(.45*f)+')');g.addColorStop(.5,'rgba(255,110,40,'+(.15*f)+')');g.addColorStop(1,'rgba(255,90,30,0)');c.fillStyle=g;c.beginPath();c.arc(0,0,120,0,TAU);c.fill();c.restore()}
  if(vis(cam,480,200,100)){c.save();c.globalCompositeOperation='lighter';const g2=c.createRadialGradient(480,190,0,480,190,90);g2.addColorStop(0,'rgba(255,170,90,.16)');g2.addColorStop(1,'rgba(255,170,90,0)');c.fillStyle=g2;c.fillRect(380,150,200,120);c.restore()}};
 /* ---------- 물체 ---------- */
 const AW=[['#c8283c','#f4ece0'],['#2a6ab0','#f4ece0'],['#2a8a4a','#ffd166'],['#7a3aa8','#f0d0ff'],['#e07a20','#fff0d0'],['#1a8a8a','#e8fff8'],['#b0283c','#ffd166'],['#4a4ab0','#d0e0ff']];
 const GOODS=['apple','fish','potion','bread','gem','cloth','flower','sword'];
 function stall(c,x,y,i,now){const t=now/1000,[a1,a2]=AW[i],gd=GOODS[i];
  /* 상인 */const bob=Math.sin(t*2.4+i)*.8,sk=['#ffd8b0','#e8b890','#c89070','#ffe0c0'][i%4],cl=['#6a3a8a','#2a5a3a','#8a4a2a','#3a4a8a'][i%4];
  c.fillStyle=cl;c.fillRect(x-5,y-34+bob,10,12);c.fillStyle=sk;c.beginPath();c.arc(x,y-38+bob,4,0,TAU);c.fill();c.fillStyle=['#3a2414','#ffd166','#1a1a1a','#a04a2a'][i%4];c.fillRect(x-4,y-42+bob,8,3);c.fillStyle='#1a1a1a';c.fillRect(x-2,y-38+bob,1,1);c.fillRect(x+1,y-38+bob,1,1);
  if(Math.sin(t*.7+i*2)>.7){c.fillStyle=sk;c.fillRect(x+5,y-36+bob-Math.abs(Math.sin(t*8))*3,3,2)}/* 손 흔들기 */
  /* 기둥 · 지붕 */c.fillStyle='#3a2414';c.fillRect(x-33,y-52,3,52);c.fillRect(x+30,y-52,3,52);
  for(let k=0;k<8;k++){c.fillStyle=k%2?a2:a1;c.beginPath();c.moveTo(x-36+k*9,y-56);c.lineTo(x-36+k*9+9,y-56);c.lineTo(x-36+k*9+10,y-46);c.lineTo(x-36+k*9-1,y-46);c.closePath();c.fill()}
  c.fillStyle='rgba(0,0,0,.25)';c.fillRect(x-37,y-46,74,1.4);for(let k=0;k<8;k++){c.fillStyle=k%2?a2:a1;c.beginPath();c.arc(x-32+k*9.2,y-46,4.6,0,Math.PI);c.fill()}
  c.fillStyle='rgba(255,255,255,.2)';c.fillRect(x-36,y-56,72,1.2);
  /* 매달린 등 */const sw=Math.sin(t*1.6+i)*1.5;c.strokeStyle='#2a2420';c.lineWidth=.6;c.beginPath();c.moveTo(x+24,y-44);c.lineTo(x+24+sw,y-36);c.stroke();c.fillStyle='#ffcf6a';c.fillRect(x+22+sw,y-36,4,5);c.fillStyle='#8a2a1a';c.fillRect(x+22+sw,y-37,4,1);
  /* 계산대 */let g=c.createLinearGradient(0,y-20,0,y);g.addColorStop(0,'#8a5a30');g.addColorStop(1,'#4a2c16');c.fillStyle=g;c.fillRect(x-32,y-20,64,20);c.fillStyle='#a87040';c.fillRect(x-34,y-22,68,4);c.fillStyle='rgba(255,230,190,.35)';c.fillRect(x-34,y-22,68,1);
  for(let k=0;k<4;k++){c.fillStyle='rgba(0,0,0,.18)';c.fillRect(x-30+k*16,y-17,1,16)}
  c.fillStyle=a1;c.fillRect(x-14,y-14,28,8);c.fillStyle=a2;c.font='bold 5.5px sans-serif';c.textAlign='center';c.fillText(['과일','생선','물약','빵','보석','옷감','꽃','무기'][i],x,y-8.6);
  /* 물건 */for(let k=0;k<6;k++){const gx=x-27+k*10.4,gy=y-25;
   if(gd==='apple'){c.fillStyle=k%2?'#d02a2a':'#e8a020';c.beginPath();c.arc(gx,gy,2.6,0,TAU);c.fill();c.fillStyle='#fff7';c.fillRect(gx-1.4,gy-1.6,1,1)}
   else if(gd==='fish'){c.fillStyle='#8ab0c8';c.beginPath();c.ellipse(gx,gy,4,1.6,0,0,TAU);c.fill();c.beginPath();c.moveTo(gx+3,gy);c.lineTo(gx+5.4,gy-1.6);c.lineTo(gx+5.4,gy+1.6);c.fill();c.fillStyle='#000';c.fillRect(gx-2.6,gy-.6,.8,.8)}
   else if(gd==='potion'){const pc=['#ff4a6a','#4a8aff','#4aff8a'][k%3];c.fillStyle='#e0e0f0';c.fillRect(gx-.8,gy-6,1.6,2);c.fillStyle=pc;c.beginPath();c.arc(gx,gy-1,2.8,0,TAU);c.fill();c.fillStyle='#fff8';c.fillRect(gx-1.4,gy-2.4,1,1)}
   else if(gd==='bread'){c.fillStyle='#c88a40';c.beginPath();c.ellipse(gx,gy,4,2.4,0,0,TAU);c.fill();c.fillStyle='#e8b060';c.fillRect(gx-2,gy-1.6,1,1);c.fillRect(gx+1,gy-1.6,1,1)}
   else if(gd==='gem'){const pc=['#ff5aa8','#5ad8ff','#ffd84a'][k%3];c.fillStyle=pc;c.beginPath();c.moveTo(gx,gy-3.4);c.lineTo(gx+2.6,gy);c.lineTo(gx,gy+2.2);c.lineTo(gx-2.6,gy);c.closePath();c.fill();c.fillStyle='#fff';c.fillRect(gx-.6,gy-2,1,1)}
   else if(gd==='cloth'){c.fillStyle=['#c83a5a','#3a8ac8','#e8c040'][k%3];c.fillRect(gx-4,gy-3,8,5);c.fillStyle='rgba(255,255,255,.3)';c.fillRect(gx-4,gy-3,8,1)}
   else if(gd==='flower'){c.fillStyle='#3a6a2a';c.fillRect(gx-.4,gy-3,.8,5);c.fillStyle=['#ff6a8a','#ffd166','#c8a2ff'][k%3];c.beginPath();c.arc(gx,gy-4,2.2,0,TAU);c.fill()}
   else {c.fillStyle='#c8d0dc';c.fillRect(gx-.6,gy-8,1.4,8);c.fillStyle='#8a5a2a';c.fillRect(gx-2,gy,4,1.4)}}}
 function gazebo(c,x,y,now){const t=now/1000;c.fillStyle='#8a847c';c.beginPath();c.ellipse(x,y+2,40,22,0,0,TAU);c.fill();c.fillStyle='#b8b0a4';c.beginPath();c.ellipse(x,y,38,20,0,0,TAU);c.fill();
  for(let k=0;k<3;k++){c.fillStyle=hsl(30,10,48-k*4);c.fillRect(x-14+k*0,y+18+k*3,28,3)}
  const posts=[];for(let k=0;k<6;k++){const a=k/6*TAU+.26;posts.push([x+Math.cos(a)*32,y+Math.sin(a)*16,Math.sin(a)])}
  for(const [px,py,s] of posts.filter(p=>p[2]<0)){c.fillStyle='#e8e0d0';c.fillRect(px-1.6,py-42,3.2,42)}
  c.fillStyle='#6a4a2a';c.fillRect(x-14,y-6,28,4);c.fillStyle='#2a2a30';c.fillRect(x-1,y-20,2,14);/* 탁자 */
  for(const [px,py,s] of posts.filter(p=>p[2]>=0)){const g=c.createLinearGradient(px-2,0,px+2,0);g.addColorStop(0,'#c8c0b0');g.addColorStop(.5,'#fff8ea');g.addColorStop(1,'#a8a090');c.fillStyle=g;c.fillRect(px-1.8,py-42,3.6,42)}
  /* 지붕 */c.fillStyle='#4a2a3a';c.beginPath();c.moveTo(x-46,y-40);c.quadraticCurveTo(x-20,y-52,x,y-74);c.quadraticCurveTo(x+20,y-52,x+46,y-40);c.quadraticCurveTo(x,y-30,x-46,y-40);c.fill();
  let g=c.createLinearGradient(x-46,0,x+46,0);g.addColorStop(0,'#3a1a2a');g.addColorStop(.4,'#7a3a5a');g.addColorStop(1,'#2a1020');c.fillStyle=g;c.beginPath();c.moveTo(x-44,y-42);c.quadraticCurveTo(x-18,y-52,x,y-72);c.quadraticCurveTo(x+18,y-52,x+44,y-42);c.quadraticCurveTo(x,y-34,x-44,y-42);c.fill();
  c.strokeStyle='#d8b060';c.lineWidth=1;c.beginPath();c.moveTo(x-44,y-42);c.quadraticCurveTo(x,y-34,x+44,y-42);c.stroke();for(let k=-3;k<=3;k++){c.strokeStyle='rgba(0,0,0,.25)';c.beginPath();c.moveTo(x,y-72);c.quadraticCurveTo(x+k*8,y-50,x+k*14,y-37);c.stroke()}
  c.fillStyle='#d8b060';c.beginPath();c.arc(x,y-75,2.4,0,TAU);c.fill();c.fillRect(x-.5,y-82,1,6);
  const sw=Math.sin(t*1.3)*1.2;c.strokeStyle='#2a2420';c.lineWidth=.6;c.beginPath();c.moveTo(x,y-38);c.lineTo(x+sw,y-30);c.stroke();c.fillStyle='#ffcf6a';c.fillRect(x-2.5+sw,y-30,5,6);c.fillStyle='#8a2a1a';c.fillRect(x-2.5+sw,y-31,5,1)}
 function tent(c,x,y,i,now){const col=[['#c8a060','#a07a40'],['#4a7aa8','#2a5a88'],['#a84a4a','#883030']][i];
  c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.ellipse(x+4,y+1,34,6,0,0,TAU);c.fill();
  c.fillStyle=col[1];c.beginPath();c.moveTo(x-30,y);c.lineTo(x-4,y-36);c.lineTo(x+30,y);c.closePath();c.fill();c.fillStyle=col[0];c.beginPath();c.moveTo(x-30,y);c.lineTo(x-4,y-36);c.lineTo(x+4,y);c.closePath();c.fill();
  c.fillStyle='rgba(255,255,255,.15)';for(let k=1;k<4;k++){c.beginPath();c.moveTo(x-4,y-36);c.lineTo(x-30+k*8,y);c.lineTo(x-29+k*8,y);c.closePath();c.fill()}
  c.fillStyle='#1a120c';c.beginPath();c.moveTo(x-12,y);c.lineTo(x-4,y-20);c.lineTo(x+4,y);c.closePath();c.fill();c.fillStyle='rgba(255,180,90,.35)';c.beginPath();c.moveTo(x-8,y);c.lineTo(x-4,y-10);c.lineTo(x,y);c.closePath();c.fill();
  c.strokeStyle='#d8c8a0';c.lineWidth=.5;c.beginPath();c.moveTo(x-4,y-36);c.lineTo(x-40,y+2);c.moveTo(x-4,y-36);c.lineTo(x+36,y+2);c.stroke();c.fillStyle='#3a2a1a';c.fillRect(x-5,y-40,2,5);
  if(i===0){c.fillStyle='#6a4a2a';c.fillRect(x+14,y-6,10,6);c.fillStyle='#8a6a3a';c.fillRect(x+14,y-7,10,1.4)}/* 상자 */}
 function campfire(c,x,y,now){const t=now/1000;for(let k=0;k<9;k++){const a=k/9*TAU;c.fillStyle=hsl(30,6,30+(k%3)*6);c.beginPath();c.ellipse(x+Math.cos(a)*15,y+Math.sin(a)*8,4,2.6,0,0,TAU);c.fill()}
  c.fillStyle='#4a2c16';c.save();c.translate(x,y);c.rotate(.4);c.fillRect(-11,-1.6,22,3.2);c.rotate(-.8);c.fillRect(-11,-1.6,22,3.2);c.restore();c.fillStyle='#ff6a20';c.beginPath();c.ellipse(x,y,6,2.6,0,0,TAU);c.fill();
  c.save();c.globalCompositeOperation='lighter';for(let i=0;i<16;i++){const q=(t*1.6+i/16)%1,dx=Math.sin(t*5+i*1.7)*3*q,r=(5.2*(1-q)+1)*(i%3?1:.7);c.fillStyle='rgba(255,'+Math.round(220-q*170)+','+Math.round(80-q*60)+','+(1-q)*.85+')';c.beginPath();c.arc(x+dx+(i%5-2)*1.4,y-2-q*20,r,0,TAU);c.fill()}
  for(let i=0;i<6;i++){const q=(t*.5+i/6)%1;c.fillStyle='rgba(255,200,90,'+(1-q)+')';c.fillRect(x+Math.sin(t*2+i*3)*8*q,y-8-q*44,1,1)}c.restore();
  for(let i=0;i<4;i++){const q=(t*.18+i/4)%1;c.fillStyle='rgba(120,110,120,'+(.18*(1-q))+')';c.beginPath();c.arc(x+Math.sin(t+i)*6+q*12,y-28-q*50,4+q*10,0,TAU);c.fill()}
  /* 통나무 의자 */for(const [lx,ly] of [[-34,-14],[34,-10],[0,22]]){c.fillStyle='#5a3a20';c.fillRect(x+lx-12,y+ly-3,24,6);c.fillStyle='#8a6038';c.beginPath();c.ellipse(x+lx-12,y+ly,2,3,0,0,TAU);c.ellipse(x+lx+12,y+ly,2,3,0,0,TAU);c.fill()}
  /* 냄비 */c.fillStyle='#2a2a30';c.fillRect(x-9,y-26,1.4,24);c.fillRect(x+8,y-26,1.4,24);c.fillRect(x-9,y-26,18,1.4);c.beginPath();c.ellipse(x,y-12,5,4,0,0,TAU);c.fill();c.fillStyle='rgba(240,240,255,'+(.2+.1*Math.sin(t*3))+')';c.beginPath();c.arc(x+Math.sin(t*2)*2,y-20-(t*8%6),2.4,0,TAU);c.fill()}
 function mill(c,x,y,now){const t=now/1000;c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.ellipse(x+8,y+3,36,9,0,0,TAU);c.fill();
  let g=c.createLinearGradient(x-22,0,x+22,0);g.addColorStop(0,'#8a8074');g.addColorStop(.4,'#e8e0d0');g.addColorStop(1,'#7a7064');c.fillStyle=g;c.beginPath();c.moveTo(x-24,y);c.lineTo(x-15,y-80);c.lineTo(x+15,y-80);c.lineTo(x+24,y);c.closePath();c.fill();
  for(let k=1;k<6;k++){c.fillStyle='rgba(0,0,0,.08)';c.fillRect(x-24+k*1.6,y-k*14,48-k*3.2,1)}
  c.fillStyle='#4a2c16';K.arch(c,x-7,y-20,14,20,'#4a2c16');c.fillStyle='#ffcf6a';c.fillRect(x-4,y-56,8,10);c.fillStyle='#4a2c16';c.fillRect(x-.5,y-56,1,10);c.fillRect(x-4,y-51.5,8,1);
  c.fillStyle='#8a3a2a';c.beginPath();c.moveTo(x-20,y-78);c.lineTo(x,y-104);c.lineTo(x+20,y-78);c.closePath();c.fill();c.fillStyle='#b05a3a';c.beginPath();c.moveTo(x-20,y-78);c.lineTo(x,y-104);c.lineTo(x+2,y-78);c.closePath();c.fill();
  /* 날개 */const hx=x,hy=y-82,a0=t*.9;c.save();c.translate(hx,hy);for(let k=0;k<4;k++){const a=a0+k*Math.PI/2;c.save();c.rotate(a);c.fillStyle='#4a2c16';c.fillRect(-1,0,2,46);
   c.fillStyle='rgba(240,230,210,.88)';c.fillRect(1,8,9,36);c.strokeStyle='#5a3a20';c.lineWidth=.6;for(let j=0;j<5;j++){c.beginPath();c.moveTo(1,8+j*9);c.lineTo(10,8+j*9);c.stroke()}c.beginPath();c.moveTo(5.5,8);c.lineTo(5.5,44);c.stroke();c.restore()}
  c.fillStyle='#2a1a10';c.beginPath();c.arc(0,0,3.4,0,TAU);c.fill();c.restore()}
 function carousel(c,x,y,now){const t=now/1000,r=CARO.r,ry=r/1.6,rot=t*.55;
  c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.ellipse(x+4,y+6,r+8,ry+6,0,0,TAU);c.fill();
  c.fillStyle='#6a3a5a';c.beginPath();c.ellipse(x,y+4,r+2,ry+2,0,0,TAU);c.fill();c.fillStyle='#d8c0a0';c.beginPath();c.ellipse(x,y,r,ry,0,0,TAU);c.fill();
  c.save();c.translate(x,y);c.scale(1,1/1.6);for(let k=0;k<16;k++){const a=k/16*TAU+rot;c.fillStyle=k%2?'#c8b090':'#e8d8b8';c.beginPath();c.moveTo(0,0);c.arc(0,0,r-2,a,a+TAU/16);c.closePath();c.fill()}c.restore();
  c.fillStyle='#c0a8d8';c.fillRect(x-6,y-58,12,58);c.fillStyle='#ffd166';c.fillRect(x-6,y-58,12,2);
  const H=[];for(let k=0;k<8;k++){const a=k/8*TAU+rot;H.push({a,s:Math.sin(a),k})}H.sort((p,q)=>p.s-q.s);
  for(const h of H){const hx=x+Math.cos(h.a)*(r-14),hy=y+Math.sin(h.a)*(ry-9),bob=Math.sin(t*3+h.k*1.3)*3,fl=Math.cos(h.a+Math.PI/2)<0;
   c.fillStyle='#e0c060';c.fillRect(hx-.7,hy-58+Math.sin(h.a)*4,1.4,58-Math.sin(h.a)*4);
   c.save();c.translate(hx,hy-14+bob);c.scale(fl?-1:1,1);const cl=['#ffffff','#ffb0c8','#a8d8ff','#fff0a0'][h.k%4];
   c.fillStyle=cl;c.beginPath();c.ellipse(0,0,8,3.6,0,0,TAU);c.fill();c.fillRect(5,-8,3,8);c.beginPath();c.ellipse(8.4,-8.6,3.8,2,-.4,0,TAU);c.fill();
   c.fillRect(-6,1,1.6,7);c.fillRect(-2,1,1.6,6);c.fillRect(3,1,1.6,7);c.fillRect(6,1,1.6,6);c.fillStyle='#c83a5a';c.fillRect(-3,-4,6,3);c.fillStyle='#ffd166';c.fillRect(-3,-4,6,.8);
   c.fillStyle='#5a3a2a';c.fillRect(4,-10,1.6,6);c.beginPath();c.moveTo(-8,-1);c.lineTo(-12,4);c.lineTo(-9,-2);c.fill();c.fillStyle='#000';c.fillRect(9.6,-9.4,.9,.9);c.restore()}
  /* 지붕 */const top=y-70;c.fillStyle='#4a2a4a';c.beginPath();c.ellipse(x,top+12,r+8,ry*.55+4,0,0,TAU);c.fill();
  for(let k=0;k<12;k++){const a1=Math.PI+k/12*Math.PI,a2=Math.PI+(k+1)/12*Math.PI;c.fillStyle=k%2?'#f4ece0':'#c8283c';c.beginPath();c.moveTo(x,top-26);c.lineTo(x+Math.cos(a1)*(r+8),top+12+Math.sin(a1)*-(ry*.55+4)*-1);c.lineTo(x+Math.cos(a2)*(r+8),top+12+Math.sin(a2)*-(ry*.55+4)*-1);c.closePath();c.fill()}
  for(let k=0;k<12;k++){const a1=k/12*Math.PI,a2=(k+1)/12*Math.PI;c.fillStyle=k%2?'#e8dccc':'#a8202e';c.beginPath();c.moveTo(x,top-26);c.lineTo(x+Math.cos(a1)*(r+8),top+12+Math.sin(a1)*(ry*.55+4));c.lineTo(x+Math.cos(a2)*(r+8),top+12+Math.sin(a2)*(ry*.55+4));c.closePath();c.fill()}
  for(let k=0;k<18;k++){const a=k/18*Math.PI,bx=x+Math.cos(a)*(r+8),by=top+12+Math.sin(a)*(ry*.55+4),on=((k+Math.floor(t*4))%3)!==0;c.fillStyle=on?'#ffe08a':'#7a6040';c.beginPath();c.arc(bx,by+2,1.4,0,TAU);c.fill();c.fillStyle='#c8283c';c.beginPath();c.arc(bx,by,3.2,0,Math.PI);c.fill()}
  c.fillStyle='#ffd166';c.beginPath();c.arc(x,top-27,2.6,0,TAU);c.fill();c.fillStyle='#3a3a42';c.fillRect(x-.5,top-42,1,14);c.fillStyle='#ff6ad5';c.beginPath();c.moveTo(x+.5,top-42);c.lineTo(x+12+Math.sin(t*4)*2,top-38);c.lineTo(x+.5,top-34);c.fill()}
 function stage(c,now){const t=now/1000,{x,y,w,h}=STAGE,bot=y+h;
  /* 뒤 벽 · 막 */c.fillStyle='#1a1424';c.fillRect(x+6,y-60,w-12,64);
  /* 화면: 박자 막대 */const sx=x+60,sw=w-120;c.fillStyle='#0a0814';c.fillRect(sx,y-52,sw,40);for(let k=0;k<16;k++){const v=(Math.sin(t*6+k*.7)*.5+.5)*(Math.sin(t*2.3+k*1.9)*.3+.7),bh=Math.max(2,v*34);c.fillStyle=hsl((k*22+t*60)%360,90,60);c.fillRect(sx+3+k*(sw-6)/16,y-14-bh,(sw-6)/16-1.4,bh)}
  c.fillStyle='rgba(255,255,255,.08)';c.fillRect(sx,y-52,sw,2);
  for(const side of [0,1]){const cx0=side?x+w-60:x+6;for(let k=0;k<9;k++){const g=c.createLinearGradient(cx0+k*6,0,cx0+k*6+6,0);g.addColorStop(0,'#5a0a1a');g.addColorStop(.5,'#b0203a');g.addColorStop(1,'#4a0814');c.fillStyle=g;c.fillRect(cx0+k*6,y-60,6.2,64)}
   c.fillStyle='#d8b060';c.fillRect(cx0+(side?6:40),y-30,14,3)}
  /* 위 철골 · 조명 */c.fillStyle='#2a2a34';c.fillRect(x-4,y-72,w+8,6);for(let k=0;k<20;k++){c.strokeStyle='#4a4a58';c.lineWidth=.6;c.beginPath();c.moveTo(x-4+k*10.4,y-72);c.lineTo(x+6+k*10.4,y-66);c.stroke()}
  c.fillStyle='#2a2a34';c.fillRect(x-4,y-72,4,76);c.fillRect(x+w,y-72,4,76);
  for(let k=0;k<6;k++){const lx=x+20+k*32,col=hsl((k*60+t*80)%360,100,65);c.fillStyle='#1a1a20';c.fillRect(lx-3,y-66,6,6);c.fillStyle=col;c.beginPath();c.arc(lx,y-60,2.4,0,TAU);c.fill()}
  /* 무대 바닥 */let g=c.createLinearGradient(0,y,0,bot);g.addColorStop(0,'#7a5030');g.addColorStop(1,'#5a3a20');c.fillStyle=g;c.fillRect(x,y,w,h-14);for(let k=0;k<10;k++){c.fillStyle='rgba(0,0,0,.18)';c.fillRect(x,y+k*6.2,w,.8)}
  c.fillStyle='#2a1a12';c.fillRect(x,bot-14,w,14);c.fillStyle='#d8b060';c.fillRect(x,bot-14,w,1.6);for(let k=0;k<12;k++){c.fillStyle=((k+Math.floor(t*3))%2)?'#ffe08a':'#6a5030';c.beginPath();c.arc(x+8+k*16.8,bot-7,1.6,0,TAU);c.fill()}
  for(let k=0;k<3;k++){c.fillStyle=hsl(30,10,36-k*4);c.fillRect(x+w/2-24-k*4,bot+k*3-1,48+k*8,3)}
  /* 스피커 */for(const sx2 of [x+8,x+w-30]){c.fillStyle='#14141a';c.fillRect(sx2,y-4,22,30);const p=1+Math.max(0,Math.sin(t*12))*.4;c.fillStyle='#3a3a44';c.beginPath();c.arc(sx2+11,y+5,6*p,0,TAU);c.fill();c.beginPath();c.arc(sx2+11,y+19,4*p,0,TAU);c.fill();c.fillStyle='#14141a';c.beginPath();c.arc(sx2+11,y+5,2,0,TAU);c.fill()}
  /* 연주자 */const bx=x+w/2,by=y+30,j=Math.abs(Math.sin(t*4))*2;c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.ellipse(bx,by+1,8,2.4,0,0,TAU);c.fill();
  c.fillStyle='#2a2a3a';c.fillRect(bx-4,by-8-j,3,8+j);c.fillRect(bx+1,by-8-j,3,8+j);c.fillStyle='#c83a8a';c.fillRect(bx-5,by-20-j,10,12);c.fillStyle='#ffd8b0';c.beginPath();c.arc(bx,by-24-j,4.2,0,TAU);c.fill();c.fillStyle='#ffd166';c.fillRect(bx-4.6,by-29-j,9.2,3.4);
  c.save();c.translate(bx+1,by-14-j);c.rotate(-.5+Math.sin(t*8)*.08);c.fillStyle='#a05a20';c.beginPath();c.ellipse(-3,2,4.6,3.4,0,0,TAU);c.fill();c.fillStyle='#3a2010';c.fillRect(0,-1,12,1.8);c.fillStyle='#1a1a1a';c.beginPath();c.arc(-3,2,1.2,0,TAU);c.fill();c.restore();
  c.fillStyle='#4a4a58';c.fillRect(bx-14,by-26,1.2,26);c.fillStyle='#2a2a30';c.beginPath();c.arc(bx-13.4,by-27,1.8,0,TAU);c.fill();
  /* 음표 */for(let k=0;k<4;k++){const q=(t*.4+k/4)%1;c.fillStyle='rgba(255,230,140,'+(1-q)+')';c.font='bold 8px sans-serif';c.textAlign='center';c.fillText(k%2?'♪':'♫',bx+Math.sin(t*2+k*2)*20+(k-1.5)*14,by-34-q*40)}}
 function sign(c,x,y,txt){c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.ellipse(x+2,y+1,6,2,0,0,TAU);c.fill();c.fillStyle='#4a2c16';c.fillRect(x-1.4,y-26,2.8,26);
  c.font='800 7px sans-serif';const tw=c.measureText(txt).width+10;let g=c.createLinearGradient(0,y-34,0,y-22);g.addColorStop(0,'#a87040');g.addColorStop(1,'#6a4220');c.fillStyle=g;c.fillRect(x-tw/2,y-35,tw,12);
  c.fillStyle='rgba(255,230,190,.35)';c.fillRect(x-tw/2,y-35,tw,1);c.fillStyle='#2a1a0a';c.fillRect(x-tw/2,y-23.6,tw,.8);c.textAlign='center';c.fillStyle='#2a1406';c.fillText(txt,x+.5,y-26.5);c.fillStyle='#fff0d0';c.fillText(txt,x,y-27)}
 {const f=A.objs;A.objs=function(now){const L=f.apply(this,arguments)||[];try{const cam=z.S.cam,V=(x,y,m)=>vis(cam,x,y,m||80);
   STALLS.forEach(([x,y,i])=>V(x,y)&&L.push({y,fn:()=>stall(ctx,x,y,i,now)}));
   if(V(GAZ.x,GAZ.y,90))L.push({y:GAZ.y+10,fn:()=>gazebo(ctx,GAZ.x,GAZ.y,now)});
   TENTS.forEach(([x,y,i])=>V(x,y)&&L.push({y,fn:()=>tent(ctx,x,y,i,now)}));
   if(V(FIRE.x,FIRE.y))L.push({y:FIRE.y,fn:()=>campfire(ctx,FIRE.x,FIRE.y,now)});
   if(V(MILL.x,MILL.y,130))L.push({y:MILL.y,fn:()=>mill(ctx,MILL.x,MILL.y,now)});
   if(V(CARO.x,CARO.y,130))L.push({y:CARO.y+CARO.r/1.6,fn:()=>carousel(ctx,CARO.x,CARO.y,now)});
   if(V(STAGE.x+STAGE.w/2,STAGE.y,180))L.push({y:STAGE.y+STAGE.h-1,fn:()=>stage(ctx,now)});
   for(const [x,y,t] of SIGNS)if(V(x,y,60))L.push({y,fn:()=>sign(ctx,x,y,t)})}catch(e){}return L}}
 /* ---------- 빛 · 반딧불 · 등불 줄 · 구역 이름 ---------- */
 const FLY=[...Array(46)].map((_,i)=>{const inC=i<26;return {x:inC?rr(-540,100):rr(980,1500),y:inC?rr(780,1220):rr(190,590),p:rr(0,TAU),s:rr(.3,.8)}});
 let zoneNow='',zoneT=0;
 {const f=A.over;A.over=function(c,now,cam){f.apply(this,arguments);try{const t=now/1000;c.save();c.globalCompositeOperation='lighter';
   /* 시장 등불 줄 */for(const yy of [330,432]){if(!vis(cam,-280,yy,300))continue;for(let x=-556;x<0;x+=8){const q=((x+556)%140)/140,sag=Math.sin(q*Math.PI)*10;c.fillStyle='rgba(60,40,30,.6)';c.fillRect(x,yy-48+sag,8,.6)}
    for(let x=-546;x<0;x+=20){const q=((x+556)%140)/140,sag=Math.sin(q*Math.PI)*10,hy=yy-46+sag,col=['255,90,70','255,200,80','255,140,60','255,110,150'][Math.abs(Math.round(x/20))%4],f2=.8+.2*Math.sin(t*3+x);
     const g=c.createRadialGradient(x,hy+3,0,x,hy+3,14);g.addColorStop(0,'rgba('+col+','+(.5*f2)+')');g.addColorStop(1,'rgba('+col+',0)');c.fillStyle=g;c.fillRect(x-14,hy-11,28,28);c.fillStyle='rgb('+col+')';c.beginPath();c.ellipse(x,hy+3,2.6,3.4,0,0,TAU);c.fill()}}
   /* 모닥불 빛 */if(vis(cam,FIRE.x,FIRE.y,80)){const f2=.8+.2*Math.sin(now/70);const g=c.createRadialGradient(FIRE.x,FIRE.y-12,0,FIRE.x,FIRE.y-12,46);g.addColorStop(0,'rgba(255,170,70,'+(.5*f2)+')');g.addColorStop(1,'rgba(255,120,40,0)');c.fillStyle=g;c.fillRect(FIRE.x-46,FIRE.y-58,92,92)}
   /* 무대 조명 */if(vis(cam,STAGE.x+STAGE.w/2,STAGE.y,220))for(let k=0;k<4;k++){const lx=STAGE.x+36+k*42,ly=STAGE.y-60,a=Math.sin(t*1.2+k*1.7)*.45,len=200,col=hsl((k*90+t*70)%360,100,65,.13);c.save();c.translate(lx,ly);c.rotate(a);
    const g=c.createLinearGradient(0,0,0,len);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.beginPath();c.moveTo(-2,0);c.lineTo(2,0);c.lineTo(28,len);c.lineTo(-28,len);c.closePath();c.fill();c.restore()}
   /* 망루 · 풍차 · 정자 창 */for(const [x,y,r] of [[-320+22,74,18],[-320+52,74,18],[1240+22,74,18],[1240+52,74,18],[MILL.x,MILL.y-51,16],[GAZ.x,GAZ.y-27,20]]){if(!vis(cam,x,y,30))continue;const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba(255,200,120,.32)');g.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2)}
   /* 반딧불 */for(const b of FLY){const x=b.x+Math.sin(t*b.s+b.p)*22,y=b.y+Math.cos(t*b.s*1.3+b.p)*14;if(!vis(cam,x,y,10))continue;const a=.5+.5*Math.sin(t*3*b.s+b.p*3);const g=c.createRadialGradient(x,y,0,x,y,6);g.addColorStop(0,'rgba(220,255,140,'+(.7*a)+')');g.addColorStop(1,'rgba(200,255,120,0)');c.fillStyle=g;c.fillRect(x-6,y-6,12,12)}
   c.restore();
   /* 구역 이름: 들어갈 때 잠깐 */const Zn=ZONES.find(q=>P.x>=q.x0&&P.x<q.x1&&P.y>=q.y0&&P.y<q.y1);const nm=Zn?Zn.n:'';if(nm!==zoneNow){zoneNow=nm;zoneT=now}
   const ag=now-zoneT;if(nm&&ag<2600&&zoneT>0){const a=ag<300?ag/300:ag>2100?(2600-ag)/500:1;c.save();c.globalAlpha=a;const cr=z.S.crop,fs=cr?8:13,bh=cr?15:22;/* 폰 세로는 크게 확대돼 보이므로 작게 · 잘라 낸 띠 가운데 */c.font='900 '+fs+'px sans-serif';c.textAlign='center';const cx=cam.x+(cr?cr.x0+cr.w/2:W/2),cy=cam.y+(cr?40:52)-(ag<300?(1-a)*6:0),tw=c.measureText(nm).width+fs*2.4;
    c.fillStyle='rgba(8,12,24,.72)';c.beginPath();c.roundRect?c.roundRect(cx-tw/2,cy-bh*.64,tw,bh,bh/2):c.rect(cx-tw/2,cy-bh*.64,tw,bh);c.fill();c.strokeStyle='rgba(255,209,102,.6)';c.lineWidth=1;c.stroke();c.fillStyle='#ffd166';c.fillText(nm,cx,cy+fs*.12);c.restore()}}catch(e){}}}
 window.PB156={v:1,ZONES,STALLS,LAKE,POND,FIRE,TENTS,CARO,MILL,GAZ,STAGE,vis,extra:[]};
}catch(e){console.error('v156 plaza big',e)}})();
