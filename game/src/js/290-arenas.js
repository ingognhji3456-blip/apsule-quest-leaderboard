/* ================= 보스별 전투 무대 (20종) ================= */
const _ARC={};
function arenaCanvas(bi){if(_ARC[bi])return _ARC[bi];if(typeof document==='undefined'||!document.createElement)return null;const cv=document.createElement('canvas');cv.width=W;cv.height=H;const c=cv.getContext('2d');if(!c||!c.fillRect)return null;c.imageSmoothingEnabled=false;paintArena(c,bi);return _ARC[bi]=cv}
function paintArena(c,bi){const B=BOSSES[bi],r=rng(hash('arena|'+bi)),F=(x,y,w,h,col,a)=>{if(a!=null)c.globalAlpha=a;c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)));if(a!=null)c.globalAlpha=1},Ci=(x,y,rad,col,a)=>pcirc(x,y,rad,col,a==null?1:a,c),
 LN=(x0,y0,x1,y1,col,wd,a)=>{wd=wd||1;const n=Math.max(1,Math.ceil(Math.hypot(x1-x0,y1-y0)));for(let i=0;i<=n;i++)F(x0+(x1-x0)*i/n-wd/2,y0+(y1-y0)*i/n-wd/2,wd,wd,col,a)},
 X0=AX,Y0=AY,X1=AX+AW,Y1=AY+AH,speck=(n,cols,a)=>{for(let i=0;i<n;i++)F(X0+r()*AW,Y0+r()*AH,1+(r()<.2?1:0),1,cols[Math.floor(r()*cols.length)],a)},
 frame=(wall,wallHi,wallDk)=>{F(0,0,W,Y0,wall);F(0,Y0-3,W,3,wallDk);F(0,Y0-1,W,1,'#000');F(0,Y0,X0,AH,wall);F(X1,Y0,W-X1,AH,wall);F(X0-2,Y0,2,AH,wallDk);F(X1,Y0,2,AH,wallDk);F(0,Y1,W,H-Y1,'#05070a');F(X0-2,Y1,AW+4,3,wallHi)};
 switch(bi){
 case 0:{/* 공장: 리벳 강판 + 경고 줄무늬 + 벽 톱니 */F(X0,Y0,AW,AH,'#1a2420');for(let y=Y0;y<Y1;y+=24)for(let x=X0;x<X1;x+=32){F(x,y,31,23,(x/32+y/24|0)%2?'#1e2a25':'#1b2622');F(x,y,31,1,'#2c3a33');F(x,y+22,31,1,'#111815');for(const [a,b] of [[2,2],[28,2],[2,20],[28,20]])F(x+a,y+b,1,1,'#3a4a42')}
  for(let x=X0;x<X1;x+=8){F(x,Y0,4,4,'#c8a020',.5);F(x+4,Y0,4,4,'#161616',.5);F(x,Y1-4,4,4,'#c8a020',.5);F(x+4,Y1-4,4,4,'#161616',.5)}
  frame('#233029','#3a4a42','#141c18');for(let x=0;x<W;x+=40){F(x,4,38,24,'#1a2420');F(x,4,38,1,'#3a4a42');F(x+18,6,2,20,'#141c18')}speck(120,['#2a3830','#161f1b']);break}
 case 1:{/* 발전소: 회로 기판 */F(X0,Y0,AW,AH,'#0e1822');for(let i=0;i<46;i++){let x=X0+r()*AW,y=Y0+r()*AH;const col=r()<.5?'#1c3a52':'#15304a';for(let k=0;k<5;k++){const hz=r()<.5,L2=10+r()*40;const nx=hz?x+(r()<.5?-L2:L2):x,ny=hz?y:y+(r()<.5?-L2:L2);LN(x,y,clamp(nx,X0,X1),clamp(ny,Y0,Y1),col,1);x=clamp(nx,X0,X1);y=clamp(ny,Y0,Y1)}F(x-1,y-1,3,3,'#2a5a7a')}
  frame('#16222e','#2a4a62','#0a121a');for(let x=6;x<W;x+=30){F(x,5,20,24,'#0e1822');F(x,5,20,1,'#3a6a8a');for(let j=0;j<4;j++)F(x+3,9+j*5,14,3,'#123048')}break}
 case 2:{/* 주조장: 현무암 + 용암 균열 */F(X0,Y0,AW,AH,'#1e1412');for(let i=0;i<60;i++){const x=X0+r()*AW,y=Y0+r()*AH,rr=6+r()*14;Ci(x,y,rr,r()<.5?'#241816':'#1a100e')}
  for(let i=0;i<9;i++){let x=X0+r()*AW,y=Y0+r()*AH;for(let k=0;k<6;k++){const nx=x+(r()-.5)*40,ny=y+(r()-.5)*30;LN(x,y,nx,ny,'#5a1a08',3);LN(x,y,nx,ny,'#c8401a',1);x=clamp(nx,X0,X1);y=clamp(ny,Y0,Y1)}}
  frame('#2a1a16','#5a2a1a','#140a08');for(let x=10;x<W;x+=60){F(x,6,36,24,'#140a08');Ci(x+18,22,12,'#3a1008');Ci(x+18,24,9,'#ff5a1f',.5);Ci(x+18,25,6,'#ffb020',.6)}speck(90,['#3a2420','#140c0a']);break}
 case 3:{/* 철로 */F(X0,Y0,AW,AH,'#1e1c18');speck(500,['#2a2620','#15130f','#34302a'],.9);
  for(const ty of [Y0+60,Y0+130,Y0+200]){for(let x=X0;x<X1;x+=12)F(x,ty-9,6,26,'#3a2a1c');F(X0,ty-4,AW,3,'#6d6a60');F(X0,ty-4,AW,1,'#b8b4a8');F(X0,ty+8,AW,3,'#6d6a60');F(X0,ty+8,AW,1,'#b8b4a8')}
  frame('#2a2824','#5a564c','#141310');for(let x=20;x<W;x+=90){F(x,4,3,26,'#141310');F(x-4,4,11,8,'#0e0e0c');Ci(x+1,8,2,'#ff4d3a',.8)}break}
 case 4:{/* 얼음 동굴 */F(X0,Y0,AW,AH,'#132a38');for(let i=0;i<40;i++){const x=X0+r()*AW,y=Y0+r()*AH;Ci(x,y,8+r()*20,r()<.5?'#16303f':'#11283a')}
  for(let i=0;i<14;i++){let x=X0+r()*AW,y=Y0+r()*AH;for(let k=0;k<4;k++){const nx=x+(r()-.5)*36,ny=y+(r()-.5)*24;LN(x,y,nx,ny,'#5a9ab8',1,.5);x=nx;y=ny}}
  for(let i=0;i<30;i++)F(X0+r()*AW,Y0+r()*AH,3,1,'#bfe8ff',.35);
  frame('#1a3444','#5a9ab8','#0c1a24');for(let x=0;x<W;x+=9){const h2=6+r()*16;for(let j=0;j<h2;j++)F(x+j*.15,Y0-2+j,Math.max(1,4-j*.2),1,'#bfe8ff',.7)}break}
 case 5:{/* 벌집 */F(X0,Y0,AW,AH,'#1c1a28');for(let y=Y0-8,row=0;y<Y1;y+=14,row++)for(let x=X0-10+(row%2)*12;x<X1;x+=24){for(let j=-6;j<=6;j++){const hw=11-Math.abs(j)*.8;F(x-hw,y+j,hw*2,1,(row+x)%3?'#221f32':'#262238')}F(x-6,y-7,12,1,'#3a3450');F(x-6,y+6,12,1,'#141220')}
  frame('#221f32','#4a4468','#100e18');for(let x=0;x<W;x+=18){F(x,6,16,20,'#2a2640');F(x+2,8,12,16,'#1a1828')}break}
 case 6:{/* 공사장 */F(X0,Y0,AW,AH,'#2a2418');speck(700,['#342c1e','#221c12','#3c3424'],.9);for(let i=0;i<5;i++)F(X0+r()*AW,Y0+r()*AH,40+r()*50,20+r()*30,'#302a1c',.7);
  for(let x=X0;x<X1;x+=10){F(x,Y0+2,5,3,'#ffd166',.55);F(x+5,Y0+2,5,3,'#1a1a1a',.55)}
  frame('#3a3018','#8a7440','#1a1408');for(let x=0;x<W;x+=24){F(x,4,2,28,'#6a5a30');F(x,4,24,2,'#6a5a30');LN(x,4,x+24,30,'#5a4a28',1)}break}
 case 7:{/* 시계탑: 쪽마루 + 바닥 시계판 */F(X0,Y0,AW,AH,'#2a1a18');for(let y=Y0;y<Y1;y+=6)for(let x=X0-((y/6)%2)*12;x<X1;x+=24){F(x,y,23,5,((x+y)/6|0)%2?'#33201c':'#2e1c19');F(x,y+5,23,1,'#1a100e')}
  const cx=W/2,cy=Y0+AH/2+20;Ci(cx,cy,78,'#3a2622',.8);Ci(cx,cy,74,'#241614',.8);for(let i=0;i<12;i++){const a=i*TAU/12;F(cx+Math.cos(a)*64-2,cy+Math.sin(a)*64-2,4,i%3?4:8,'#84566b',.8)}
  frame('#33202b','#84566b','#1a1016');for(let x=20;x<W;x+=70){Ci(x,16,11,'#1a1016');Ci(x,16,8,'#84566b',.5)}break}
 case 8:{/* 광학 요새: 광택 바닥 */F(X0,Y0,AW,AH,'#10241f');for(let y=Y0;y<Y1;y+=20)for(let x=X0;x<X1;x+=20){F(x,y,19,19,(x/20+y/20|0)%2?'#132a24':'#0f221d');F(x,y,19,1,'#1f3e36')}
  for(let i=0;i<5;i++){const x=X0+r()*AW;LN(x,Y0,x+80,Y1,'#9fffe0',2,.05)}
  frame('#17322b','#3f7a6a','#0a1a16');for(let x=0;x<W;x+=16){F(x,Y0-12,12,10,'#1f3e36');F(x+2,Y0-10,8,6,'#0a1a16')}break}
 case 9:{/* 오메가 반응로 */F(X0,Y0,AW,AH,'#140a12');const cx=W/2,cy=Y0+AH/2;for(let rr=150;rr>10;rr-=18){Ci(cx,cy,rr,rr%36?'#1a0e18':'#160c14')}for(let i=0;i<16;i++){const a=i*TAU/16;LN(cx,cy,cx+Math.cos(a)*170,cy+Math.sin(a)*120,'#3a1a2e',1)}
  for(let i=0;i<60;i++)F(r()*W,r()*Y0,1,1,'#f08ab0',.5);frame('#1a0c16','#6b3a52','#0a0408');for(let i=0;i<50;i++)F(r()*W,r()*(Y0-4),1,1,r()<.3?'#ffe066':'#f08ab0',.6);break}
 case 10:{/* 숲 바닥 */F(X0,Y0,AW,AH,'#1a1810');for(let i=0;i<50;i++)Ci(X0+r()*AW,Y0+r()*AH,6+r()*16,r()<.5?'#1e1c12':'#16140c');for(let i=0;i<14;i++){let x=X0+r()*AW,y=r()<.5?Y0:Y1;for(let k=0;k<8;k++){const nx=x+(r()-.5)*24,ny=y+(y<Y0+AH/2?1:-1)*(4+r()*10);LN(x,y,nx,ny,'#3a2a18',2);x=nx;y=ny}}
  for(let i=0;i<30;i++)Ci(X0+r()*AW,Y0+r()*AH,2+r()*5,'#2a4a1a',.8);frame('#1e1a10','#3a5a20','#0c0a06');for(let x=0;x<W;x+=14){F(x,0,10,Y0-2,'#2a2014');F(x+4,0,2,Y0-2,'#3a2e1c')}break}
 case 11:{/* 버섯 동굴 */F(X0,Y0,AW,AH,'#1a1224');for(let i=0;i<60;i++)Ci(X0+r()*AW,Y0+r()*AH,5+r()*14,r()<.5?'#1e1428':'#160e1e');
  for(let i=0;i<16;i++){const x=X0+8+r()*(AW-16),y=Y0+8+r()*(AH-16),s2=2+r()*3;F(x-.5,y,1,s2+1,'#d8c8b0');Ci(x,y,s2,'#9ad63a',.8);Ci(x-1,y-1,s2*.4,'#f6ffd8',.8)}
  frame('#221630','#6a4a8a','#0e0818');break}
 case 12:{/* 늪 */F(X0,Y0,AW,AH,'#122018');for(let i=0;i<40;i++)Ci(X0+r()*AW,Y0+r()*AH,10+r()*24,r()<.5?'#142a1f':'#0f1e16',.9);for(let i=0;i<18;i++){const x=X0+r()*AW,y=Y0+r()*AH;Ci(x,y,5,'#2e5a2a');F(x,y-1,5,2,'#122018')}
  frame('#16241c','#3f7a4a','#08120c');for(let x=0;x<W;x+=7){const h2=8+r()*20;F(x,Y0-h2,1,h2,'#2e5a2a')}break}
 case 13:{/* 뼈 구덩이 */F(X0,Y0,AW,AH,'#2a241a');speck(600,['#342c20','#221c14','#3c3426']);
  for(let i=0;i<22;i++){const x=X0+r()*AW,y=Y0+r()*AH,a=r()*Math.PI,L2=6+r()*8;LN(x,y,x+Math.cos(a)*L2,y+Math.sin(a)*L2,'#c8c0a0',2,.7);Ci(x,y,1.5,'#e8e2c8',.7);Ci(x+Math.cos(a)*L2,y+Math.sin(a)*L2,1.5,'#e8e2c8',.7)}
  for(let i=0;i<3;i++){const x=X0+30+r()*(AW-60),y=Y0+30+r()*(AH-60);for(let k=0;k<5;k++)LN(x+k*4,y,x+k*4+2,y+10,'#c8c0a0',1.5,.6)}
  frame('#2e2618','#6b5f45','#141008');break}
 case 14:{/* 거미 둥지 */F(X0,Y0,AW,AH,'#1a1220');speck(300,['#221828','#140e18']);
  for(const [cx,cy] of [[X0,Y0],[X1,Y0],[X0,Y1],[X1,Y1]]){for(let i=0;i<7;i++){const a=Math.atan2(Y0+AH/2-cy,W/2-cx)+(i-3)*.22;LN(cx,cy,cx+Math.cos(a)*90,cy+Math.sin(a)*90,'#e0d8f0',1,.25)}for(const rr of [30,55,80]){for(let i=0;i<7;i++){const a1=Math.atan2(Y0+AH/2-cy,W/2-cx)+(i-3)*.22,a2=a1+.22;if(i<6)LN(cx+Math.cos(a1)*rr,cy+Math.sin(a1)*rr,cx+Math.cos(a2)*rr,cy+Math.sin(a2)*rr,'#e0d8f0',1,.2)}}}
  for(let i=0;i<6;i++){const x=X0+20+r()*(AW-40),y=Y0+20+r()*(AH-40);Ci(x,y,4,'#f0e0ff',.35)}frame('#1e1426','#5a2e5e','#0c0810');break}
 case 15:{/* 말벌집: 호박색 밀랍 */F(X0,Y0,AW,AH,'#2a1c08');for(let y=Y0-8,row=0;y<Y1;y+=12,row++)for(let x=X0-8+(row%2)*10;x<X1;x+=20){for(let j=-5;j<=5;j++){const hw=9-Math.abs(j)*.8;F(x-hw,y+j,hw*2,1,(row*3+x)%5?'#3a2810':'#44300e')}Ci(x,y,2,'#5a3a0e',.6)}
  frame('#3a2808','#c8961a','#1a1004');for(let x=0;x<W;x+=26){const h2=4+r()*10;F(x+10,Y0,3,h2,'#ffcf3a',.6);Ci(x+11,Y0+h2,2,'#ffcf3a',.6)}break}
 case 16:{/* 수정 동굴 */F(X0,Y0,AW,AH,'#101a24');for(let i=0;i<40;i++)Ci(X0+r()*AW,Y0+r()*AH,6+r()*14,r()<.5?'#14202c':'#0c141c');
  for(let i=0;i<14;i++){const x=X0+10+r()*(AW-20),y=Y0+10+r()*(AH-20),h2=6+r()*10;for(let j=0;j<h2;j++){const w2=Math.max(1,(1-j/h2)*5);F(x-w2/2,y-j,w2,1,j<2?'#2a7a9a':'#7de0ff',.7)}F(x-1,y-h2+2,1,3,'#ffffff',.8)}
  frame('#142230','#2a7a9a','#08101a');break}
 case 17:{/* 심연: 깊은 물 */F(X0,Y0,AW,AH,'#0a1428');for(let i=0;i<30;i++)Ci(X0+r()*AW,Y0+r()*AH,10+r()*26,r()<.5?'#0c1830':'#081022',.9);for(let i=0;i<60;i++)F(X0+r()*AW,Y0+r()*AH,1,1,'#ff5d8f',.35);
  frame('#0c1830','#2a4a8a','#040810');for(let x=0;x<W;x+=11){const h2=6+r()*14;for(let j=0;j<h2;j++)F(x+Math.sin(j*.5)*1.5,j,1,1,'#1a3a5a')}break}
 case 18:{/* 잿더미 */F(X0,Y0,AW,AH,'#222020');speck(800,['#2c2a28','#1a1818','#383432']);for(let i=0;i<10;i++){const x=X0+r()*AW,y=Y0+r()*AH;Ci(x,y,6+r()*10,'#161414',.8);Ci(x,y,2,'#ff8a3a',.35)}
  frame('#2a2424','#5a5652','#100e0e');for(let x=12;x<W;x+=48){F(x,2,3,Y0-4,'#141212');LN(x+1,10,x-6,4,'#141212',2);LN(x+1,16,x+8,8,'#141212',2)}break}
 case 19:{/* 공허: 맥동하는 살 */F(X0,Y0,AW,AH,'#1e060e');for(let i=0;i<40;i++)Ci(X0+r()*AW,Y0+r()*AH,8+r()*20,r()<.5?'#240812':'#18040a');
  for(let i=0;i<20;i++){let x=X0+r()*AW,y=Y0+r()*AH;for(let k=0;k<7;k++){const nx=x+(r()-.5)*30,ny=y+(r()-.5)*30;LN(x,y,nx,ny,'#5a0e22',2);LN(x,y,nx,ny,'#8a1a36',1,.7);x=clamp(nx,X0,X1);y=clamp(ny,Y0,Y1)}}
  frame('#2a0612','#8a1a36','#10020a');for(let x=20;x<W;x+=60){Ci(x,16,8,'#10020a');Ci(x,16,6,'#e8e0e0',.8);Ci(x,16,3,'#b83aff')}break}
 default:F(X0,Y0,AW,AH,'#141a1e');frame('#1e262a','#3a4a4f','#0a0e10')}}
function arenaAnim(bi,now,beat){const t=now/1000;
 switch(bi){
 case 0:for(let i=0;i<3;i++){const x=40+i*200,a=t*(i%2?-1:1);pcirc(x,18,11,'#2c3a33');for(let k=0;k<8;k++){const q=a+k*TAU/8;R(x+Math.cos(q)*12-1.5,18+Math.sin(q)*12-1.5,3,3,'#3a4a42')}pcirc(x,18,4,'#141c18')}for(let x=AX;x<AX+AW;x+=12){const o=(now/40)%12;RA(x+o,AY+AH-8,4,2,'#3a4a42',.6)}break;
 case 1:{const k=(now/900)%1;for(let x=6;x<W;x+=30)for(let j=0;j<4;j++){const on=Math.floor(t*3+x+j)%3===0;RA(x+3,9+j*5,14,3,'#7fd6ff',on?.5:.12)}RA(AX,AY+k*AH,AW,2,'#7fd6ff',.06);break}
 case 2:for(let i=0;i<8;i++){const q=((t*.3)+i/8)%1;RA(AX+((i*97)%AW),AY+AH-q*AH,2,2,i%2?'#ffb020':'#ff5a1f',.6*(1-q))}for(let x=10;x<W;x+=60)RA(x+6,18,24,10,'#ff7a2a',.12+.08*Math.sin(t*6+x));break;
 case 3:for(let x=20;x<W;x+=90)RA(x-2,6,6,6,'#ff4d3a',Math.floor(t*2)%2?.8:.2);break;
 case 4:for(let i=0;i<20;i++){const q=((t*.15)+i/20)%1;RA((i*53+Math.sin(t+i)*10)%W,q*H,1,1,'#ffffff',.6)}break;
 case 5:for(let i=0;i<5;i++){const x=(t*30+i*97)%W,y=10+Math.sin(t*2+i)*6;R(x,y,3,2,'#1a1828');RA(x-1,y-1,5,1,'#c9bff0',.4)}break;
 case 6:{const sw=Math.sin(t*.8)*20;line(W/2,0,W/2+sw,24,2,(x,y)=>R(x,y,1,1,'#6a6a6a'));R(W/2+sw-6,24,12,5,'#8a7440');R(W/2+sw-6,28,12,1,'#ff5d5d')}break;
 case 7:{const cx=W/2,cy=AY+AH/2+20,hq=t*.3,mq=t*2;line(cx,cy,cx+Math.cos(hq)*40,cy+Math.sin(hq)*40,3,(x,y)=>RA(x-1,y-1,3,3,'#84566b',.5));line(cx,cy,cx+Math.cos(mq)*58,cy+Math.sin(mq)*58,3,(x,y)=>RA(x-1,y-1,2,2,'#f0b8d2',.4));pcirc(cx,cy,4,'#fff0a0',.5)}break;
 case 8:for(let i=0;i<3;i++){const x=AX+((t*40+i*150)%(AW+100))-50;line(x,AY,x+80,AY+AH,4,(px,py)=>RA(px-2,py-2,4,4,['#ff4d6d','#9fffe0','#ffe36b'][i],.06))}break;
 case 9:{const cx=W/2,cy=AY+AH/2;for(let k=0;k<3;k++){const rr=((t*30+k*60)%180);for(let i=0;i<36;i++){const a=i*TAU/36;RA(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr*.7,2,2,'#f08ab0',.15*(1-rr/180))}}}break;
 case 10:for(let i=0;i<6;i++){const q=((t*.12)+i/6)%1;RA(AX+((i*131)%AW)+Math.sin(t*2+i)*8,AY+q*AH,3,2,'#6a8a2a',.5)}break;
 case 11:for(let i=0;i<14;i++){const q=((t*.08)+i/14)%1;RA(AX+((i*67)%AW)+Math.sin(t+i)*10,AY+AH-q*AH,2,2,'#caff6b',.5*(1-q))}break;
 case 12:for(let i=0;i<6;i++){const q=((t*.6)+i/6)%1,x=AX+((i*113)%AW),y=AY+((i*71)%AH);pcirc(x,y,1+q*4,'#8fd6b8',.3*(1-q))}break;
 case 13:for(let i=0;i<8;i++){const q=((t*.2)+i/8)%1;RA(AX+((i*89+t*20)%AW),AY+((i*47)%AH),2,1,'#c8c0a0',.3*(1-q))}break;
 case 14:for(let i=0;i<3;i++){const x=AX+40+i*160,y=AY+10+Math.sin(t*1.5+i)*20+20;line(x,AY,x,y,4,(px,py)=>RA(px,py,1,1,'#e0d8f0',.5));pcirc(x,y,2.5,'#2a1a30');R(x-1,y-1,1,1,'#ff3a6a')}break;
 case 15:for(let x=0;x<W;x+=26){const q=((t*.5)+x/100)%1;RA(x+10,AY+14+q*20,2,3,'#ffcf3a',.7*(1-q))}break;
 case 16:for(let i=0;i<10;i++){const a=.3+.3*Math.sin(t*3+i);RA(AX+((i*97)%AW),AY+((i*61)%AH),2,2,'#ffffff',a)}break;
 case 17:for(let i=0;i<14;i++){const q=((t*.2)+i/14)%1;pcirc(AX+((i*83)%AW)+Math.sin(t*2+i)*4,AY+AH-q*AH,1+(i%3)*.5,'#8dcdf5',.35*(1-q))}break;
 case 18:for(let i=0;i<24;i++){const q=((t*.1)+i/24)%1;RA((i*41+t*12)%W,q*H,1,1,i%4?'#8a8480':'#ff8a3a',.6)}break;
 case 19:{const pu=.05+.04*Math.sin(t*2.4);RA(AX,AY,AW,AH,'#ff2d55',pu);for(let x=20;x<W;x+=60){const lx=Math.sin(t+x)*2;pcirc(x+lx,16,2.5,'#b83aff')}}break}}
function drawArenaBG2(now,beat,fr,th){const bi=G.bi,cv=arenaCanvas(bi);if(!cv){drawArenaBG(now,beat,fr,th);return}ctx.drawImage(cv,0,0);arenaAnim(bi,now,beat);
 RA(AX,AY,AW,AH,'#000',.12);const on=fr>.88||fr<.05,bc=mixc(th,'#ffffff',.5);RA(AX,AY,AW,2,bc,on?.45:.08);RA(AX,AY+AH-2,AW,2,bc,on?.45:.08);RA(AX,AY,2,AH,bc,on?.45:.08);RA(AX+AW-2,AY,2,AH,bc,on?.45:.08);
 RA(AX,AY,AW,AH,th,Math.pow(1-fr,2)*.07);if(G.exposed)RA(AX,AY,AW,AH,'#ffe79a',.05+.04*Math.sin(now/90));if(G.phase>=1)RA(AX,AY,AW,AH,G.phase>=2?'#ff2d55':'#ff9a2d',.05+.02*G.phase*Math.sin(now/200))}
/*ARENA_END*/
/*PETS2_BEGIN*/
