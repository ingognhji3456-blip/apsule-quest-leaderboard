/* ================= 로비 무대 v74: 시계골 밤거리 (시계탑 · 창문 불빛 · 가로등 · 박자 타일 · 보스 교대 등장 · 연습 합) ================= */
const LST={bi:0,t0:0,flash:0,lastSwing:-1};
function lsR(c,x,y,w,h,col,a){c.globalAlpha=a==null?1:a;c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}
function lsBuildings(c,now,L,seed,base,win,y0,hMin,hVar,speed){const off=(now*speed)%600;for(let i=-1;i<12;i++){const h0=hash(seed+'b'+i),w=34+(h0%4)*8,h=hMin+(h0>>3)%hVar,x=((i*56+(h0%17))-off+600*2)%660-60,top=y0-h;
  lsR(c,x,top,w,h,base);const roof=(h0>>7)%4;if(roof===0){lsR(c,x+4,top-6,8,6,base);lsR(c,x+6,top-9,4,3,base)}else if(roof===1){lsR(c,x+w/2-1,top-14,2,14,base);if(Math.floor(now/700+i)%2)lsR(c,x+w/2-1,top-15,2,2,'#ff5d5d')}else if(roof===2){for(let k=0;k<5;k++)lsR(c,x+k*2,top-5+k,w-k*4,1,base)}
  if(win)for(let yy=top+6;yy<y0-6;yy+=8)for(let xx=x+5;xx<x+w-6;xx+=7){const hh=hash(seed+'w'+i+','+yy+','+xx);if(hh%3)continue;const fl=hh%11===0&&Math.floor(now/(300+hh%500))%3===0;lsR(c,xx,yy,3,3,fl?base:(hh%5?win:'#ffe7a8'),fl?1:.85)}}}
function lsClockTower(c,now,x,y){const col='#0b1d24',mid='#12303a';lsR(c,x-16,y-104,32,104,col);lsR(c,x-20,y-110,40,8,col);for(let k=0;k<12;k++)lsR(c,x-12+k,y-126+k,24-k*2+0,1,col);lsR(c,x-1,y-138,2,14,col);if(Math.floor(now/900)%2)lsR(c,x-1,y-140,2,2,'#ffd166');
 lsR(c,x-13,y-100,26,26,mid);const cx=x,cy=y-87;pcirc(cx,cy,11,'#f4e2b0',1,c);pcirc(cx,cy,9,'#fff6dc',1,c);for(let k=0;k<12;k++){const a=k*TAU/12;lsR(c,cx+Math.cos(a)*8-.5,cy+Math.sin(a)*8-.5,1,1,'#6a5a3a')}
 const s=now/1000,ah=-Math.PI/2+(s/60)*TAU/12*6,am=-Math.PI/2+Math.floor(s)*TAU/60;for(let r=0;r<5;r++)lsR(c,cx+Math.cos(ah)*r,cy+Math.sin(ah)*r,1,1,'#3a2a18');for(let r=0;r<8;r++)lsR(c,cx+Math.cos(am)*r,cy+Math.sin(am)*r,1,1,'#c83a3a');lsR(c,cx-1,cy-1,2,2,'#3a2a18');
 for(let yy=y-66;yy<y-8;yy+=12){lsR(c,x-8,yy,4,6,'#ffd98a',.7);lsR(c,x+4,yy+4,4,6,'#ffd98a',.5)}
 /* 정각 종 파동 */const ph=(s%8)/8;if(ph<.3){const k=ph/.3;for(let i=0;i<24;i++){const a=i*TAU/24;lsR(c,cx+Math.cos(a)*(14+k*40),cy+Math.sin(a)*(14+k*40)*.7,1,1,'#ffe7a8',(1-k)*.8)}}}
function lsLamp(c,now,x,y){lsR(c,x-1,y-44,3,44,'#34504f');lsR(c,x,y-44,1,44,'#4a6a66');lsR(c,x-3,y-2,7,2,'#34504f');lsR(c,x-1,y-46,8,2,'#34504f');lsR(c,x+5,y-46,4,4,'#4a6a66');const on=Math.floor(now/97)%47!==0;if(on){lsR(c,x+6,y-42,2,2,'#fff4c8');for(let k=0;k<30;k++){const w=2+k*.9;lsR(c,x+7-w/2,y-40+k*1.3,w,1,'#ffe7a8',.06)}lsR(c,x-4,y-1,22,1,'#ffe7a8',.35)}}
function lsCrate(c,x,y,w,h){lsR(c,x,y-h,w,h,'#5a4028');lsR(c,x,y-h,w,1,'#8a6a40');lsR(c,x,y-h,1,h,'#7a5a34');lsR(c,x+1,y-h/2,w-2,1,'#3a2818');for(let k=1;k<w-1;k++)lsR(c,x+k,y-h+Math.round(k*(h-2)/w)+1,1,1,'#3a2818')}
function lsGear(c,x,y,r,a,col){for(let k=0;k<8;k++){const t=a+k*TAU/8;lsR(c,x+Math.cos(t)*r-1,y+Math.sin(t)*r-1,3,3,col)}pcirc(x,y,r-1,col,1,c);pcirc(x,y,r*.4,'#12262a',1,c)}

/* ---- 추가 레이어 ---- */
function lsSkyGear(c,x,y,r,a,col,al){const n=Math.max(8,Math.round(r/3));for(let k=0;k<n;k++){const t=a+k*TAU/n;for(let d=0;d<4;d++)lsR(c,x+Math.cos(t)*(r+d)-2,y+Math.sin(t)*(r+d)-2,4,4,col,al)}for(let k=0;k<Math.round(r*4);k++){const t=k*TAU/Math.round(r*4);lsR(c,x+Math.cos(t)*r-1,y+Math.sin(t)*r-1,3,3,col,al)}for(let k=0;k<4;k++){const t=a+k*TAU/4;for(let d=r*.25;d<r;d+=2)lsR(c,x+Math.cos(t)*d-1,y+Math.sin(t)*d-1,2,2,col,al)}pcirc(x,y,r*.22,col,al,c)}
function lsAirship(c,now){const t=now/1000,x=((t*9)%620)-70,y=30+Math.sin(t*.5)*3;lsR(c,x,y,34,9,'#27404a');lsR(c,x+2,y-2,30,2,'#27404a');lsR(c,x+2,y+9,30,1,'#1a2c34');lsR(c,x+4,y+2,26,1,'#3a5a64');lsR(c,x+11,y+11,12,5,'#1a2c34');lsR(c,x+13,y+12,2,2,'#ffd98a');lsR(c,x+17,y+12,2,2,'#ffd98a');lsR(c,x-4,y+2,4,5,'#1a2c34');if(Math.floor(now/400)%2)lsR(c,x+33,y+3,2,2,'#ff5d5d');const pr=Math.floor(now/60)%2;lsR(c,x-6,y+(pr?1:4),2,3,'#4a6a70')}
function lsRail(c,now){const y=118;lsR(c,0,y,480,3,'#10262e');lsR(c,0,y+3,480,1,'#1c3a44');for(let x=-((now/200)%40);x<480;x+=40){lsR(c,x,y+4,3,30,'#0f232a');for(let k=0;k<6;k++)lsR(c,x+3+k*2,y+4+k*2,2,2,'#0f232a')}
 const T=(now/1000)%16;if(T<5){const k=T/5,tx=-160+k*800;for(let car=0;car<4;car++){const cx=tx-car*38;lsR(c,cx,y-12,36,12,car?'#2a3c44':'#3a2c2a');lsR(c,cx,y-12,36,1,'#4a6068');for(let w=0;w<4;w++)lsR(c,cx+4+w*8,y-9,5,4,'#ffe7a8',.9);lsR(c,cx+2,y,4,2,'#111');lsR(c,cx+30,y,4,2,'#111')}lsR(c,tx+36,y-10,4,8,'#3a2c2a');lsR(c,tx+40,y-7,2,2,'#fff4c8');for(let i=0;i<5;i++){const q=(now/300+i/5)%1;lsR(c,tx+4-q*30-i*6,y-16-q*10,3,3,'#8a9aa0',(1-q)*.6)}}}
function lsBunting(c,now,x0,x1,y0,sag,bt){const n=Math.round((x1-x0)/10);for(let i=0;i<=n;i++){const k=i/n,x=x0+(x1-x0)*k,y=y0+Math.sin(k*Math.PI)*sag+Math.sin(now/700+i)*.6;lsR(c,x,y,2,1,'#2a3a40');if(i%2===0){const cols=['#ff7ad0','#ffd166','#7ae8ff','#a6f5c6','#ff9a5c'],on=(i/2+Math.floor(bt))%3!==0;lsR(c,x,y+1,2,3,cols[(i/2)%5],on?1:.35);if(on)lsR(c,x-1,y+2,4,1,cols[(i/2)%5],.3)}}}
function lsSpeaker(c,x,y,pul){lsR(c,x,y-34,18,34,'#141c20');lsR(c,x,y-34,18,1,'#34464c');lsR(c,x+1,y-33,1,33,'#22303a');const cone=(cy,r)=>{pcirc(x+9,cy,r+pul*1.2,'#2a383e',1,c);pcirc(x+9,cy,r*.55+pul,'#3a4a50',1,c);lsR(c,x+8,cy-1,2,2,'#a6f5c6',.4+pul*.6)};cone(y-24,6);cone(y-9,5)}
function lsCrowd(c,now,bt){const cols=[['#ffb3c7','#7a3a5a'],['#a6f5c6','#2a5a4a'],['#ffd98a','#6a4a2a'],['#9ad0ff','#2a4a6a'],['#d5b4ff','#4a3a6a'],['#ffc49a','#6a3a2a']];
 for(let i=0;i<6;i++){const x=64+i*20+(i%2)*4,ph=(bt+i*.17)%1,jmp=Math.round(Math.max(0,Math.sin(ph*Math.PI))*(i%3===1?4:3)),y=150-jmp,[hc,bc]=cols[i];
  lsR(c,x-3,151,8,2,'#000',.3);lsR(c,x-3,y-9,7,9,bc);lsR(c,x-2,y-9,5,1,brkMix?brkMix(bc,'#ffffff',.25):bc);pcirc(x,y-13,4,hc,1,c);lsR(c,x-2,y-14,1,2,'#1a1a1a');lsR(c,x+1,y-14,1,2,'#1a1a1a');
  const up=ph<.5;lsR(c,x+3,y-(up?15:9),1,up?7:4,hc);if(i%2===0){lsR(c,x+3,y-(up?19:12),2,4,['#ff7ad0','#7ae8ff','#ffd166'][i%3]);lsR(c,x+3,y-(up?20:13),2,1,'#ffffff',.8)}else lsR(c,x-4,y-(up?14:9),1,up?6:4,hc)}}
function lsSteam(c,now,x,y){for(let i=0;i<5;i++){const q=(now/1400+i/5)%1;lsR(c,x+Math.sin(q*5+i)*3-q*6,y-q*26,3+Math.round(q*3),3+Math.round(q*3),'#6a8a90',(1-q)*.35)}}
function lsVines(c,now){for(let i=0;i<22;i++){const x=i*5,y=Math.round(10+Math.sin(i*.8)*6+i*.8);lsR(c,x,0,5,y,'#06121a');if(i%3===0){const L=6+(i*7)%10,sw=Math.round(Math.sin(now/900+i)*1);for(let k=0;k<L;k++)lsR(c,x+2+sw*(k/L),y+k,1,1,'#0c2a26')}}
 for(let i=0;i<18;i++){const x=480-i*5-5,y=Math.round(8+Math.cos(i*.9)*5+i*.7);lsR(c,x,0,5,y,'#06121a');if(i%4===1){const L=5+(i*5)%8;for(let k=0;k<L;k++)lsR(c,x+2,y+k,1,1,'#0c2a26');lsR(c,x+1,y+L,3,2,'#ffd98a',.5+.5*Math.sin(now/500+i))}}}

function drawTitle(now){const c=tctx;c.imageSmoothingEnabled=false;const t=now/1000;
 const g=c.createLinearGradient(0,0,0,190);g.addColorStop(0,'#071019');g.addColorStop(.55,'#10283a');g.addColorStop(1,'#1c3a3a');c.fillStyle=g;c.globalAlpha=1;c.fillRect(0,0,480,190);
 for(let i=0;i<80;i++){const tw=.35+.65*Math.abs(Math.sin(now/600+i*1.7));lsR(c,(i*97)%480,(i*53)%110,i%7?1:2,i%7?1:2,i%5?'#9ad0d8':'#ffe79a',tw)}
 /* 달 + 크레이터 + 흐르는 구름 */
 pcirc(300,38,22,'#ffe8b0',.14,c);pcirc(300,38,13,'#fff4d8',1,c);lsR(c,295,33,3,3,'#eadcb4');lsR(c,303,40,4,3,'#eadcb4');lsR(c,298,43,2,2,'#eadcb4');
 for(let k=0;k<4;k++){const cx=((k*150-t*(6+k*2))%640+640)%640-80,cy=22+k*13;for(let r=0;r<4;r++)lsR(c,cx+r*10-(r%2)*4,cy-r%2*3,34-r*4,4,'#1e3a4a',.55)}
 lsSkyGear(c,70,70,34,t*.12,'#132a36',1);lsSkyGear(c,410,58,24,-t*.18,'#132a36',1);lsSkyGear(c,440,96,14,t*.3,'#15303c',1);lsAirship(c,now);
 /* 먼 도시 · 시계탑 · 가까운 도시 */
 lsBuildings(c,now,0,'far',"#0d1f28",'#2f5a66',128,30,34,.004);
 lsClockTower(c,now,118,150);
 lsRail(c,now);
 lsBuildings(c,now,1,'mid',"#12303a",'#ffd98a',150,20,40,.009);
 /* 거리: 난간 · 가로등 · 상자 · 톱니 */
 for(let x=0;x<480;x+=12){lsR(c,x,136,1,14,'#1a3238');}lsR(c,0,136,480,2,'#24444a');
 lsLamp(c,now,40,150);lsLamp(c,now,232,150);
 lsCrate(c,8,150,20,14);lsCrate(c,24,150,14,10);lsCrate(c,14,136,12,9);lsGear(c,196,146,5,t*.6,'#3a5a52');lsGear(c,207,148,3,-t*.9,'#4a6a5a');
 lsSteam(c,now,152,104);lsSteam(c,now,268,112);
 /* 네온 간판 */{const on=Math.floor(now/120)%23!==0,col=on?'#ff7ad0':'#4a2a44';lsR(c,160,98,46,16,'#0a141a');lsR(c,160,98,46,1,col);lsR(c,160,113,46,1,col);lsR(c,160,98,1,16,col);lsR(c,205,98,1,16,col);c.globalAlpha=1;c.font='bold 9px monospace';c.fillStyle=col;c.textAlign='center';c.fillText('♪ BEAT',183,109);c.textAlign='left'}
 /* 박자 타일 바닥 */
 lsR(c,0,150,480,40,'#1e3436');lsR(c,0,148,480,2,'#4a7a6a');const bt=t*2,bi2=Math.floor(bt),pul=Math.pow(1-(bt%1),3);
 for(let i=0;i<24;i++){const x=i*20-((now/30)%20),lit=((i+bi2)%6===0);lsR(c,x,152,19,8,i%2?'#1a2d31':'#223a3e');lsR(c,x,160,19,30,i%2?'#172a2d':'#1e3438');if(lit)lsR(c,x,152,19,8,'#a6f5c6',.25*pul+.05);lsR(c,x,152,19,1,'#2e4a4e')}
 {const bt0=t*2;lsBunting(c,now,40,232,104,10,bt0);lsBunting(c,now,232,470,104,14,bt0+1);lsCrowd(c,now,bt0);lsSpeaker(c,262,151,Math.pow(1-(bt0%1),3))}
 /* 물웅덩이 반사 */lsR(c,300,171,70,3,'#2a4a58',.8);lsR(c,310,171,20,1,'#ffe7a8',.3);
 /* 보스: 챕터 1 수호자들이 교대로 등장 */
 if(now-LST.t0>7000){LST.t0=now;const n=ch1Cleared()?10:Math.max(1,Math.min(10,(saveData.chapter||0)+1));LST.bi=(LST.bi+1)%n}
 const B=BOSSES[LST.bi],bx=432,by=150,u=2.2,g2=geo(B,bx,by,u),ap=clamp((now-LST.t0)/500,0,1),dy=Math.round((1-ap)*(1-ap)*40);
 c.globalAlpha=.35;c.fillStyle='#000';c.fillRect(bx-g2.hf*u-4,by-1,g2.hf*u*2+8,3);c.globalAlpha=1;
 const hit=now-LST.flash<110;c.save();c.globalAlpha=ap;drawMech(c,B,bx+(hit?2:0),by-dy,now,{pulse:pul*.5,flash:hit},u);const hs=idleHandsAt(B,bx,by-dy,u);hs.forEach((h,i)=>{h.y+=Math.sin(now/400+i*2)*2;drawHand(c,B,h,g2.sh[i][0],g2.sh[i][1],now,false,.6)});c.restore();c.globalAlpha=1;
 if(ap<1)for(let i=0;i<10;i++){lsR(c,bx-30+i*6,by-2-((i*7)%5),2,2,'#8a8478',1-ap)}
 c.font='bold 8px monospace';c.textAlign='center';const nm=B.name,tw=c.measureText(nm).width+10;lsR(c,bx-tw/2,by+8,tw,11,'#05090b',.8);lsR(c,bx-tw/2,by+8,tw,1,B.c);c.globalAlpha=ap;c.fillStyle=B.c;c.fillText(nm,bx,by+16);c.textAlign='left';c.globalAlpha=1;
 /* 주인공: 박자마다 검 휘두르기 연습 */
 const hx=352,fy=150,s3=3,sw=Math.floor(bt/4),sp=bt%4;if(sw!==LST.lastSwing&&sp<.15){LST.lastSwing=sw;LST.flash=now}
 const lung=sp<.35?Math.round(Math.sin(sp/.35*Math.PI)*6):0;lsR(c,hx-15+lung,fy-2,30,3,'#000',.4);
 drawKnight(c,hx-6*s3+lung,fy-11*s3,s3,false,null,now/430);drawPet(c,shopInv().eq.pt||0,hx-30,fy-58+Math.sin(now/300)*3,now,1.5);
 if(sp<.3){const k=sp/.3;for(let i=0;i<9;i++){const a=-1.1+i*.28*Math.min(1,k*2),r=26;lsR(c,hx+10+Math.cos(a)*r,fy-26+Math.sin(a)*r,2,2,i%2?'#ffffff':'#a6f5c6',1-k)}if(k<.5)for(let i=0;i<6;i++){const a=i*TAU/6+k;lsR(c,bx-g2.hf*u+Math.cos(a)*k*18,g2.coreY+Math.sin(a)*k*18,2,2,'#ffe79a',1-k*2)}}
 if(Math.floor(now/500)%2){c.font='bold 9px monospace';c.textAlign='center';c.fillStyle='#ffe79a';c.fillText('▼ 클릭',hx,fy-80);c.textAlign='left'}
 const pn=PNAME();c.font='bold 10px monospace';c.textAlign='center';const tw2=c.measureText(pn).width+12;lsR(c,hx-tw2/2,fy-74,tw2,14,'#05090b',.8);lsR(c,hx-tw2/2,fy-74,tw2,2,'#a6f5c6');c.globalAlpha=1;c.fillStyle='#ffffff';c.fillText(pn,hx,fy-63);c.textAlign='left';
 /* 반딧불 */for(let i=0;i<16;i++){const ph=((now/2600)+i/16)%1,x=(i*53)%470+Math.sin(ph*6+i)*8,y=146-ph*110;lsR(c,x,y,i%3?1:2,i%3?1:2,i%2?'#ffe79a':'#a6f5c6',(1-ph)*.8)}c.globalAlpha=1;
 lsVines(c,now);c.globalAlpha=1;try{drawTitle2(now)}catch(e){}}

/* ================= 로비 배경음 v74: 밤거리 칩튠 (8마디 반복 · 앞선 예약 재생) ================= */
const LBGM={next:0,step:0,on:false,bpm:96};
const LBGM_N=m=>440*Math.pow(2,(m-69)/12);
/* 코드 진행: C  Am  F  G  C  Em  F  G (한 마디 = 16스텝) */
const LBGM_CH=[[48,52,55],[45,48,52],[41,45,48],[43,47,50],[48,52,55],[40,43,47],[41,45,48],[43,47,50]];
/* 멜로디 (스텝당 음, -1 = 쉼) 2마디 × 4 */
const LBGM_MEL=[
 [72,-1,76,-1,79,-1,76,-1,74,-1,72,-1,-1,-1,67,-1, 69,-1,72,-1,76,-1,-1,-1,74,-1,72,-1,69,-1,-1,-1],
 [65,-1,69,-1,72,-1,74,-1,76,-1,-1,-1,74,-1,72,-1, 71,-1,-1,-1,67,-1,71,-1,74,-1,-1,-1,-1,-1,-1,-1],
 [72,-1,76,-1,79,-1,81,-1,79,-1,76,-1,-1,-1,72,-1, 71,-1,72,-1,74,-1,76,-1,79,-1,-1,-1,76,-1,-1,-1],
 [77,-1,76,-1,74,-1,72,-1,69,-1,-1,-1,72,-1,74,-1, 74,-1,-1,-1,71,-1,67,-1,72,-1,-1,-1,-1,-1,-1,-1]];
function lbgmStep(n,at){const bar=Math.floor(n/16)%8,st=n%16,ch=LBGM_CH[bar],g=.9;
 /* 킥 · 스네어 · 하이햇 */
 if(st===0||st===8||(st===10&&bar%2===1))tk(110,.16,'sine',.09*g,at,40);
 if(st===4||st===12)nz(.09,.035*g,at,1800);
 if(st%2===0)nz(.025,st%4===2?.014*g:.008*g,at,7000);
 /* 베이스 (8분음표 · 루트/5도) */
 if(st%2===0){const r=ch[0]-12,f=LBGM_N(st%8===6?r+7:r);tk(f,.2,'triangle',.07*g,at,f)}
 /* 아르페지오 (16분 · 부드러운 사각파) */
 {const nt=ch[[0,1,2,1][st%4]]+12+(st>=8?12:0);tk(LBGM_N(nt),.09,'square',.011*g,at,LBGM_N(nt))}
 /* 패드 (마디 시작) */
 if(st===0)for(const v of ch){const f=LBGM_N(v+12);tk(f,1.9,'sine',.012*g,at,f*1.002)}
 /* 멜로디 */
 {const ph=Math.floor(bar/2),m=LBGM_MEL[ph][(bar%2)*16+st];if(m>0){const f=LBGM_N(m);tk(f,.34,'triangle',.034*g,at,f);tk(f*2,.18,'sine',.006*g,at,f*2)}}
 /* 시계골 종소리: 8마디마다 */
 if(bar===0&&st===0){tk(LBGM_N(84),1.4,'sine',.02,at,LBGM_N(84));tk(LBGM_N(91),1.1,'sine',.01,at+.02,LBGM_N(91))}}
function lobbyBgmTick(){const want=mode==='menu'&&sound&&audio&&audio.state==='running'&&!document.hidden;if(!want){LBGM.on=false;return}
 const sp=60/LBGM.bpm/4,now=audio.currentTime;if(!LBGM.on){LBGM.on=true;LBGM.next=now+.1;LBGM.step=0}
 if(LBGM.next<now-.25)LBGM.next=now+.05;
 while(LBGM.next<now+.25){try{lbgmStep(LBGM.step,LBGM.next)}catch(e){}LBGM.next+=sp;LBGM.step=(LBGM.step+1)%(16*8)}}
{const _mt=typeof menuTick==='function'?menuTick:null;menuTick=function(now){const r=_mt?_mt.apply(this,arguments):undefined;try{lobbyBgmTick()}catch(e){}return r}}

