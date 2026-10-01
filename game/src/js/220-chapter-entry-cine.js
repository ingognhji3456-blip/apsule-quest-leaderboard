/* ===== per-cave intro cinematics (Part A) ===== */
/* ================= 챕터 진입 연출 (동굴마다 다른 컨셉) ================= */
function caveMouthFrame(dark){
 for(let x=0;x<W;x+=4){const h=40+Math.sin(x*.05)*11+Math.sin(x*.13+2)*6;R(x,0,4,h,dark)}
 for(let x=0;x<W;x+=4){const h=34+Math.sin(x*.045+1)*9+Math.sin(x*.11+3)*5;R(x,H-h,4,h,dark)}
 for(let y=0;y<H;y+=4){const wl=26+Math.sin(y*.07)*10;R(0,y,wl,4,dark);const wr=26+Math.sin(y*.065+2)*10;R(W-wr,y,wr,4,dark)}
 for(let i=0;i<10;i++){const x=(i*53)%W,y=i%2?6:H-6;R(x,y-2,2,4,shade(dark,.6))}
}
function caveWalkIn(now,t,vx,vy){const t0=.25,t1=1.9;if(t<t0)return;const k=clamp((t-t0)/(t1-t0),0,1),e=k*k*(3-2*k);
 const x=lerp(W/2,vx,e),y=lerp(H-14,vy+10,e),s=lerp(3.4,.9,e),a=k>.88?(1-k)/.12:1;
 ctx.globalAlpha=Math.max(0,a);RA(x-9*s,y+2,18*s,4*s,'#000',.4);drawKnight(ctx,x-12*s,y-19*s,s,false);
 const tx=x+11*s,ty=y-6*s+Math.sin(now/200)*1.4*s;glow(tx,ty,3.6*s+2,'#a8f0ff',.6);R(tx-1,ty-1,2,2,'#eaffff');ctx.globalAlpha=1}
function caveTitleCard(now,t,ci,accent){if(t<1.05)return;const k=clamp((t-1.05)/.35,0,1),e=k*k*(3-2*k);RA(0,108,W,52,'#000',.5*e);ctx.textAlign='center';
 ctx.font='bold 9px monospace';shText((ci<10?'CHAPTER '+String(ci+1).padStart(2,'0')+' / 20':'PART 2 · CHAPTER '+String(ci+1).padStart(2,'0')+' / 20'),W/2,124,'#f4d996');
 ctx.font='bold 20px monospace';shText(STORY[ci].cave,W/2,148,'#ffffff');
 ctx.font='9px monospace';shText(BOSSES[ci].en,W/2,161,accent);ctx.textAlign='left'}
function caveEmber(now,seed,x0,y0,rise,col){const ph=((now/1000+seed)%rise)/rise,x=x0+Math.sin(now/500+seed*7)*8,y=y0-ph*100;RA(x,y,2,2,col,(1-ph)*.7)}

function artCave0(now,t){const B=BOSSES[0];R(0,0,W,H,'#0a120c');skyBands(0,150,'#0a1a10','#12241a',10);
 const vx=W/2,vy=132;glow(vx,vy,58,B.c,.35+.1*Math.sin(now/500));
 R(vx-70,60,140,150,'#16211a');R(vx-64,66,128,138,'#1c2b21');
 for(let ring=0;ring<3;ring++){const r1=26+ring*24,teeth=8+ring*3,rot=now/(1800+ring*400)*(ring%2?-1:1);
  pcirc(vx,vy,r1+3,shade(B.c,.22),1);pcirc(vx,vy,r1-3,'#101a13',1);
  for(let i=0;i<teeth;i++){const a=rot+i*TAU/teeth;R(vx+Math.cos(a)*r1-2,vy+Math.sin(a)*r1*.86-2,4,5,ring===0?B.c:shade(B.c,.55))}}
 pcirc(vx,vy,10,'#0c140e');pcirc(vx,vy,6,B.c,.8);
 for(const dx of [-92,92]){R(vx+dx-3,vy-4,6,52,'#26382f');R(vx+dx-4,vy-48,8,7,shade(B.c,.5));glow(vx+dx,vy-44,7,B.c,.5+.2*Math.sin(now/300+dx))}
 for(let i=0;i<9;i++){const x=(i*53+now/40)%W,y=40+(i*37)%140;RA(x,y,1,1,'#9fc7a8',.25)}
 caveWalkIn(now,t,vx,vy);caveMouthFrame('#050a06');caveTitleCard(now,t,0,B.c)}

function artCave1(now,t){const B=BOSSES[1];R(0,0,W,H,'#05080e');skyBands(0,170,'#050a16','#0a1626',10);
 const vx=W/2,vy=128;
 for(const side of [-1,1]){for(let i=0;i<4;i++){const x=W/2+side*(30+i*36),h=170-i*20,y=H-6-h;R(x-3,y,6,h,'#141d2c');R(x-4,y-6,8,6,shade(B.c,.35))
   if(i<3){const nx=W/2+side*(30+(i+1)*36),ny=H-6-(170-(i+1)*20)-6;const bolt=Math.floor(now/260+i+side)%5===0;line(x,y-4,nx,ny-4,6,(px,py)=>RA(px-1,py-1,2,2,bolt?'#eaffff':shade(B.c,.4),bolt?.9:.3))}}}
 for(const side of [-1,1]){const p=((now/650+(side<0?0:.5))%1),x0=W/2+side*160,y0=H-8,x1=vx+side*10,y1=vy+16,px=lerp(x0,x1,p),py=lerp(y0,y1,p);glow(px,py,5,'#eaffff',.85);R(px-1,py-1,2,2,'#ffffff')}
 glow(vx,vy,30,B.c,.5+.25*Math.sin(now/220));R(vx-14,vy-6,28,14,'#0d1620');R(vx-10,vy-3,20,8,B.c);
 if(RND()<.05)RA(0,0,W,H,'#dff4ff',.06);
 caveWalkIn(now,t,vx,vy);caveMouthFrame('#03050a');caveTitleCard(now,t,1,B.c)}

function artCave2(now,t){const B=BOSSES[2];R(0,0,W,H,'#180d08');skyBands(0,120,'#1a0c06','#2a1408',8);
 const vx=W/2,vy=150;RA(0,140,W,60,'#3a1206',.6);RA(vx-140,150,280,26,'#ff5a20',.22+.1*Math.sin(now/260));
 for(let x=vx-140;x<vx+140;x+=14){const h=6+((x*7)%9);R(x,158-h,10,h,'#3a180a')}
 for(let i=0;i<8;i++)caveEmber(now,i,vx-120+i*34,168,1.6+i%3*.3,i%2?'#ffb020':'#ff5a20');
 R(vx-40,90,80,56,'#20120a');R(vx-34,96,68,44,'#160b06');R(vx-30,100,60,4,'#5a2a12');
 glow(vx,120,34,B.c,.45+.2*Math.sin(now/240));
 caveWalkIn(now,t,vx,vy-20);caveMouthFrame('#0d0603');caveTitleCard(now,t,2,B.c)}

function artCave3(now,t){const B=BOSSES[3];R(0,0,W,H,'#0a0a08');skyBands(0,130,'#0a0a08','#161510',8);
 const vx=W/2,vy=150;for(const side of [-1,1])line(W/2+side*46,H-6,vx+side*3,vy+30,6,(x,y,i)=>{R(x-3,y-1,6,2,'#6d6a60');if(i%2===0)R(x-1,y-3,2,7,'#3a3934')});
 R(vx-2,vy+26,4,4,'#8a2a2a');R(vx-1,vy+18,2,10,'#3a1a1a');const on=now%1400<700;pcirc(vx,vy+16,3,on?'#ff4d6d':'#4a1a1a',1);glow(vx,vy+16,6,on?'#ff4d6d':'#3a1010',.7);
 R(vx-56,vy-6,112,44,'#141410');R(vx-50,vy-2,100,4,'#3a3934');R(vx-46,vy+18,10,14,'#2a2a26');R(vx+36,vy+18,10,14,'#2a2a26');
 glow(vx,vy+2,20,'#fff0a0',.4+.2*Math.sin(now/150));
 for(let i=0;i<5;i++){const x=(i*71+now/20)%W;RA(x,60+((i*37)%40),10,3,'#9a9a92',.08)}
 caveWalkIn(now,t,vx,vy+8);caveMouthFrame('#050503');caveTitleCard(now,t,3,B.c)}

function artCave4(now,t){const B=BOSSES[4];R(0,0,W,H,'#060b10');skyBands(0,150,'#050c14','#0d1c28',8);
 const vx=W/2,vy=126;for(let i=0;i<9;i++){const x=40+i*46,len=10+((i*37)%22);R(x-1,0,2,len,'#cdeeff');R(x-3,len-2,6,3,'#eaffff')}
 R(vx-56,74,112,90,'#0c1a22');R(vx-50,80,100,78,'#12242e');
 for(let i=0;i<24;i++){const x=(i*41+now/22)%W,y=(i*67+now/16)%H;RA(x,y,1,1,'#eaffff',.35+.2*Math.sin(now/300+i))}
 glow(vx,vy,30,B.c,.5+.2*Math.sin(now/260));pcirc(vx,vy,8,'#dff4ff',.7);
 caveWalkIn(now,t,vx,vy+10);caveMouthFrame('#040709');caveTitleCard(now,t,4,B.c)}

function artCave5(now,t){const B=BOSSES[5];R(0,0,W,H,'#08050f');skyBands(0,90,'#0a0618','#150b28',6);
 if(Math.floor(now/1500)%4===0&&(now%1500)<70)RA(0,0,W,110,'#e8dfff',.35);
 const vx=W/2,vy=150;const hs=15;for(let row=0;row<7;row++)for(let col=-4;col<=4;col++){const x=vx+col*hs+(row%2?hs/2:0),y=90+row*hs*.9;if(Math.hypot(x-vx,y-92)<14)continue;const dead=((row*7+col*13+9)%5===0);
  for(let i=0;i<6;i++){const a=i*TAU/6;R(x+Math.cos(a)*hs*.42-1,y+Math.sin(a)*hs*.42-1,2,2,dead?'#1a1626':shade(B.c,.55))}}
 for(let i=0;i<3;i++){const bx=60+i*160+Math.sin(now/900+i)*10;R(bx-5,80,10,6,'#25213f');R(bx-3,86,3,6,'#5f5a86');R(bx+1,86,3,6,'#5f5a86')}
 glow(vx,92,26,B.c,.45+.2*Math.sin(now/240));
 caveWalkIn(now,t,vx,vy);caveMouthFrame('#06040c');caveTitleCard(now,t,5,B.c)}

function artCave6(now,t){const B=BOSSES[6];R(0,0,W,H,'#0e0a05');skyBands(0,140,'#100b05','#1c150a',8);
 const vx=W/2,vy=148;
 R(vx-110,120,70,44,'#3a3018');R(vx-104,110,50,14,'#4a3a1c');R(vx-90,96,26,18,'#2a2010');
 R(vx+40,126,80,38,'#332a16');R(vx+50,112,40,16,'#4a3a1c');
 R(vx-6,20,4,66,'#3a3018');R(vx-30,80,56,10,'#2a2010');RA(vx-30,80,56,10,'#000',.3);
 for(let i=0;i<3;i++){const b=now/900+i*2.1,ox=Math.sin(b)*18,oy=90+Math.cos(b*1.3)*6;RA(vx-8+ox,vy-40+oy,4,4,'#ffd166',.6)}
 glow(vx,vy-10,24,B.c,.5+.2*Math.sin(now/240));
 caveWalkIn(now,t,vx,vy);caveMouthFrame('#070502');caveTitleCard(now,t,6,B.c)}

function artCave7(now,t){const B=BOSSES[7];R(0,0,W,H,'#0a070c');skyBands(0,150,'#0a060e','#180f1c',8);
 const vx=W/2,vy=128,rot=now/2600;
 for(let ring=0;ring<2;ring++){const r1=44+ring*30,teeth=10+ring*4;pcirc(vx,vy,r1+3,shade(B.c,ring?.16:.24),1);
  for(let i=0;i<teeth;i++){const a=rot*(ring?-1:1)+i*TAU/teeth;R(vx+Math.cos(a)*r1-2,vy+Math.sin(a)*r1-2,4,4,ring===0?shade(B.c,.7):shade(B.c,.4))}}
 pcirc(vx,vy,30,'#150f1a');pcirc(vx,vy,26,'#1e1424');
 const ha=now/1600,ma=now/220;line(vx,vy,vx+Math.cos(ha)*17,vy+Math.sin(ha)*17,3,(x,y)=>R(x-1,y-1,3,3,'#fff0a0'));line(vx,vy,vx+Math.cos(ma)*24,vy+Math.sin(ma)*24,3,(x,y)=>R(x-1,y-1,2,2,'#fff0a0'));
 pcirc(vx,vy,3,'#fff0a0');
 caveWalkIn(now,t,vx,vy+16);caveMouthFrame('#050308');caveTitleCard(now,t,7,B.c)}

function artCave8(now,t){const B=BOSSES[8];R(0,0,W,H,'#050a09');skyBands(0,150,'#040907','#0b1613',8);
 const vx=W/2,vy=128;for(let i=0;i<6;i++){const a=i*TAU/6+now/3000,r=76,x=vx+Math.cos(a)*r,y=vy+Math.sin(a)*r*.62,look=Math.sin(now/700+i)*2;
  pcirc(x,y,7,'#0a1a16');pcirc(x,y,5,shade(B.c,.85));R(x-1+look,y-1,2,2,'#ff4d6d');glow(x,y,9,B.c,.25)}
 pcirc(vx,vy,10,'#0a1a16');pcirc(vx,vy,7,shade(B.c,.9));R(vx-1+Math.sin(now/600)*2,vy-1,2,2,'#ff4d6d');
 glow(vx,vy,22,B.c,.5+.2*Math.sin(now/220));
 caveWalkIn(now,t,vx,vy+8);caveMouthFrame('#030605');caveTitleCard(now,t,8,B.c)}

function artCave9(now,t){const B=BOSSES[9];R(0,0,W,H,'#0a0509');skyBands(0,150,'#0a0509','#180a12',8);
 const vx=W/2,vy=130,pulse=.5+.5*Math.pow(Math.max(0,Math.sin(now/520)),6);
 for(let i=0;i<10;i++){const a=i*TAU/10,r=44+pulse*20;line(vx,vy,vx+Math.cos(a)*r,vy+Math.sin(a)*r*.78,4,(x,y)=>RA(x-1,y-1,2,2,B.c,.4+.3*pulse))}
 glow(vx,vy,32+pulse*14,B.c,.5+.3*pulse);pcirc(vx,vy,9+pulse*3,B.c,.85);pcirc(vx,vy,4,'#ffe0e8',.9);
 for(let i=0;i<10;i++){const x=vx+(RND()-.5)*160,y=H-10-((now/40+i*37)%160);RA(x,y,1,1,'#ff9ab0',.3)}
 caveWalkIn(now,t,vx,vy+14);caveMouthFrame('#050208');caveTitleCard(now,t,9,B.c)}

Object.assign(ART,{cave0:artCave0,cave1:artCave1,cave2:artCave2,cave3:artCave3,cave4:artCave4,cave5:artCave5,cave6:artCave6,cave7:artCave7,cave8:artCave8,cave9:artCave9});
const CAVE_CAPTION=['어딘가 깊은 곳에서 톱니가 맞물리는 소리가 울린다.','전류가 빛으로 길을 밝히는 회랑이다.','뜨거운 공기가 훅 끼쳐온다.','녹슨 철로가 어둠 속으로 뻗어 있다.','숨이 하얗게 얼어붙는다.','수백 개의 날갯소리가 벌집처럼 울린다.','쇳조각 냄새와 자석 특유의 웅웅거림이 느껴진다.','거대한 톱니가 허공에 멈춰 있다.','수천 개의 눈이 어둠 속에서 나를 본다.','벽 전체가 심장처럼 뛰고 있다.'];
Object.assign(SCENES,Object.fromEntries(Array.from({length:10},(_,i)=>['cave'+i,[{art:'cave'+i,lines:[['',CAVE_CAPTION[i]]]}]])));
function battlementFrame(dark){
 for(let x=-4;x<W;x+=26){R(x,0,15,18,dark)}
 for(let x=0;x<W;x+=5){const h=9+Math.round((Math.sin(x*.5)+1)*3);R(x,H-h,5,h,dark)}
 for(let y=0;y<H;y+=32){R(0,y,9,24,dark);R(W-9,y,9,24,dark)}
}
function approachHorizon(now,B,y0){R(0,0,W,H,shade(B.c,.16));skyBands(0,y0,shade(B.c,.22),shade(B.c,.42),10);
 R(0,y0,W,H-y0,shade(B.c,.28));
 for(let i=0;i<11;i++){const bx=(i*61)%(W+40)-20,bh=14+((i*29)%18);RA(bx,y0-bh,32,bh,shade(B.c,.18),.85)}
 RA(0,y0-6,W,8,'#000',.2);
 for(let i=0;i<6;i++){const drift=((now/2400+i*1.3)%1),mx=lerp(-10,W+10,drift),my=y0-14-((i*11)%14);
  RA(mx-1,my-1,3,2,'#000',.7);RA(mx,my-2,1,2,B.c,.7+.3*Math.sin(now/260+i))}}
function artCave10(now,t){const B=BOSSES[10];approachHorizon(now,B,140);
 const vx=W/2,vy=132;for(let i=0;i<7;i++){const a=i*TAU/7+now/5000,len=70+((i*23)%30);line(vx,vy,vx+Math.cos(a)*len,vy+Math.sin(a)*len*.4,5,(x,y)=>RA(x-1,y-1,2,2,'#4a3a26',.5))}
 R(vx-46,vy-4,92,10,'#241f18');R(vx-46,vy-4,92,2,'#3a3226');
 glow(vx,vy,22,B.c,.3+.2*Math.sin(now/300));pcirc(vx,vy,8,'#1a2410');
 caveWalkIn(now,t,vx,vy);battlementFrame('#0a0a08');caveTitleCard(now,t,10,B.c)}
function artCave11(now,t){const B=BOSSES[11];approachHorizon(now,B,140);
 const vx=W/2,vy=126;for(let i=0;i<4;i++){const cx=vx+((i-1.5)*44),cy=140-((i%2)*14),r=18+((i*13)%12);glow(cx,cy,r,B.c,.35);pcirc(cx,cy,r*.6,shade(B.c,.6),.8)}
 for(let i=0;i<16;i++){const x=(i*61+now/40)%W,y=(i*37+now/70)%140;RA(x,y,1,1,'#caff6b',.3+.2*Math.sin(now/400+i))}
 caveWalkIn(now,t,vx,vy+10);battlementFrame('#0c0a10');caveTitleCard(now,t,11,B.c)}
function artCave12(now,t){const B=BOSSES[12];approachHorizon(now,B,138);
 const vx=W/2,vy=140;RA(0,vy,W,H-vy,'#0a2018',.55);for(let i=0;i<3;i++){const ripple=((now/900+i*.7)%3)*70;RA(vx-ripple,vy,ripple*2,2,B.c,.2*(1-ripple/210))}
 for(let i=0;i<10;i++){const x=(i*73)%W,y=vy+((i*31+now/30)%(H-vy));RA(x,y,2,2,'#5bd6a8',.3+.2*Math.sin(now/500+i))}
 R(vx-40,vy-2,80,4,'#3a2f22');glow(vx,vy-6,20,B.c,.3);caveWalkIn(now,t,vx,vy-4);battlementFrame('#040a08');caveTitleCard(now,t,12,B.c)}
function artCave13(now,t){const B=BOSSES[13];approachHorizon(now,B,136);
 const vx=W/2,vy=130;for(let i=0;i<5;i++){const x=vx+(i-2)*38,h=30+((i%2)*12);R(x-3,vy-h,6,h,'#e8e2c8');pcirc(x,vy-h-6,7,'#e8e2c8')}
 for(let i=0;i<8;i++)RA((i*59+now/50)%W,10+((i*23)%20),1,1,'#fff7dd',.3);
 caveWalkIn(now,t,vx,vy+4);battlementFrame('#0a0806');caveTitleCard(now,t,13,B.c)}
function artCave14(now,t){const B=BOSSES[14];approachHorizon(now,B,134);
 const vx=W/2,vy=128;R(vx-60,vy+10,120,3,'#2a2018');R(vx-60,vy+14,120,3,'#241c14');
 for(let i=0;i<8;i++){const a=i*TAU/8;line(vx,vy,vx+Math.cos(a)*70,vy+Math.sin(a)*46,6,(x,y)=>RA(x-1,y-1,1,1,'#f0b8ff',.3))}
 for(let i=0;i<3;i++){const cx=vx+((i-1)*50),cy=vy+16;RA(cx-6,cy-8,12,16,'#3a2a44',.6);glow(cx,cy,10,B.c,.3)}
 caveWalkIn(now,t,vx,vy+10);battlementFrame('#08060c');caveTitleCard(now,t,14,B.c)}
function artCave15(now,t){const B=BOSSES[15];approachHorizon(now,B,132);
 R(0,132,W,20,'#4a3d1c');R(0,132,W,3,'#6e5a2a');
 const hs=22;for(let rx=-1;rx<9;rx++){const ox=rx*hs;pcirc(ox+12,140,hs*.42,shade(B.c,.25),.5)}
 const vx=W/2,vy=126;glow(vx,vy,22,B.c,.4+.2*Math.sin(now/200));for(let i=0;i<10;i++){const a=i*TAU/10+now/300,r=32+((i*7)%16);RA(vx+Math.cos(a)*r-1,vy+Math.sin(a)*r*.6-1,2,2,'#fff0a0',.5)}
 caveWalkIn(now,t,vx,vy+8);battlementFrame('#0e0a04');caveTitleCard(now,t,15,B.c)}
function artCave16(now,t){const B=BOSSES[16];approachHorizon(now,B,132);
 const vx=W/2,vy=126;R(vx-30,vy+14,60,10,'#3a3540');R(vx-24,vy+8,48,8,'#2c2836');
 for(let i=0;i<6;i++){const a=i*TAU/6+now/4000,len=24+((i*17)%30);line(vx,vy,vx+Math.cos(a)*len,vy-Math.abs(Math.sin(a))*len,4,(x,y)=>RA(x-1,y-1,2,2,'#7de0ff',.4))}
 glow(vx,vy,26,B.c,.35+.2*Math.sin(now/260));pcirc(vx,vy,10,shade(B.c,.3));
 caveWalkIn(now,t,vx,vy+8);battlementFrame('#08050e');caveTitleCard(now,t,16,B.c)}
function artCave17(now,t){const B=BOSSES[17];approachHorizon(now,B,138);
 const vx=W/2,vy=136;RA(0,vy+4,W,H-vy-4,'#0a1a2c',.5);for(let i=0;i<5;i++){const ripple=((now/1100+i*.6)%4)*60;RA(vx-ripple,vy,ripple*2,2,'#3a9ddc',.2*(1-ripple/240))}
 for(let i=0;i<14;i++)RA((i*67)%W,120+((i*11)%16),1,1,'#7ab8f0',.4);
 glow(vx,vy-10,30,B.c,.3+.2*Math.sin(now/500));caveWalkIn(now,t,vx,vy-6);battlementFrame('#020610');caveTitleCard(now,t,17,B.c)}
function artCave18(now,t){const B=BOSSES[18];approachHorizon(now,B,136);
 for(let i=0;i<7;i++)caveEmber(now,i*17,W/2+(i-3)*40,140,3+i*.3,'#c0c0c8');
 const vx=W/2,vy=132;R(vx-30,vy-10,60,10,'#1a1a1a');R(vx-20,vy-22,40,12,'#141414');glow(vx,vy,18,B.c,.25);
 caveWalkIn(now,t,vx,vy+6);battlementFrame('#0a0a0a');caveTitleCard(now,t,18,B.c)}
function artCave19(now,t){const B=BOSSES[19];approachHorizon(now,B,130);
 const vx=W/2,vy=130,pulse=.5+.5*Math.pow(Math.max(0,Math.sin(now/500)),6);
 R(vx-50,vy+8,100,10,'#2a1420');R(vx-50,vy+8,100,2,'#4a2436');
 for(let i=0;i<12;i++){const a=i*TAU/12,r=40+pulse*18;line(vx,vy,vx+Math.cos(a)*r,vy+Math.sin(a)*r*.6,5,(x,y)=>RA(x-1,y-1,2,2,B.c,.4+.3*pulse))}
 glow(vx,vy,32+pulse*14,B.c,.5+.3*pulse);pcirc(vx,vy,11+pulse*3,B.c,.85);pcirc(vx,vy,4,'#ffe0e8',.9);
 caveWalkIn(now,t,vx,vy+14);battlementFrame('#0a0410');caveTitleCard(now,t,19,B.c)}
Object.assign(ART,{cave10:artCave10,cave11:artCave11,cave12:artCave12,cave13:artCave13,cave14:artCave14,cave15:artCave15,cave16:artCave16,cave17:artCave17,cave18:artCave18,cave19:artCave19});
const CAVE_CAPTION2=['담장 너머로 뒤엉킨 뿌리가 꿈틀거리며 넘어온다.','달콤하고 나른한 포자 냄새가 안개처럼 퍼진다.','범람한 수로에 차가운 물이 발밑까지 차오른다.','뼈로 이어진 이정표가 끝없이 늘어서 있다.','다리 위로 은빛 거미줄이 정교한 무늬를 그린다.','지붕 가득, 수천 마리의 날갯소리가 하나의 박자를 이룬다.','수정 표면마다 작은 눈동자가 나를 비춘다.','거대한 저수지 아래서 무언가 숨죽이고 있다.','불탄 초소 위로 재가 눈처럼 흩날린다.','옥상의 거대한 심장 장치가 온 탑처럼 맥동한다.'];
Object.assign(SCENES,Object.fromEntries(Array.from({length:10},(_,i)=>['cave'+(i+10),[{art:'cave'+(i+10),lines:[['',CAVE_CAPTION2[i]]]}]])));

/*PUZZLE_BEGIN*/
