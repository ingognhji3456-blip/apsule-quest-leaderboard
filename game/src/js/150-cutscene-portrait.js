/* ================= 컷신 · 초상화 · 똑딱 ================= */
const hexRGB=c=>[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];
const mixc=(a,b,t)=>{const A=hexRGB(a),B=hexRGB(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*clamp(t,0,1)).toString(16).padStart(2,'0')).join('')};
const skyBands=(y0,y1,c0,c1,n)=>{n=n||24;const h=(y1-y0)/n;for(let i=0;i<n;i++)R(0,y0+i*h,W,h+1,mixc(c0,c1,i/(n-1)))};
let SCN=null;
function playScene(id,cb){$('bossName').style.visibility='';const now=performance.now();SCN={id,pages:SCENES[id],pi:0,cb,artT0:now,art:SCENES[id][0].art};mode='scene';paused=false;$('touch').style.display='none';$('overlay').hidden=true;
 stopMusic();startMusic(makeCaveSong(id.slice(0,4)==='cave'?+id.slice(4):({prologue:0,lastTrain:3,watch:6,truth:7,dawn:9,gatehall:0,lanternmemory:1,forgekey:2,coreseal:4,hivebell:5,horizonwatch:8}[id]||0)),now,0);$('bossName').textContent='';$('songInfo').textContent='';sceneLines()}
function sceneLines(){const pg=SCN.pages[SCN.pi];SCN.art=pg.art;SCN.artT0=performance.now();say(pg.lines,()=>{SCN.pi++;if(SCN.pi>=SCN.pages.length){const cb=SCN.cb;SCN=null;if(cb)cb()}else sceneLines()})}
/* ---- 일러스트 ---- */
function artVillage(now,t){skyBands(0,H,'#060a1a','#26375e');
 for(let i=0;i<80;i++){const x=(i*97+13)%W,y=(i*53+7)%140,a=.3+.5*(.5+.5*Math.sin(now/500+i*1.7));RA(x,y,i%9===0?2:1,i%9===0?2:1,'#dfe8ff',a)}
 glow(390,52,46,'#9ab4ff',.55);pcirc(390,52,15,'#e9eefc');pcirc(396,49,12,'#cfd9f2',.5);
 for(let x=0;x<W;x+=4){const h=150+Math.sin(x*.02)*14+Math.sin(x*.05+1)*6;R(x,h,4,H-h,'#121c34')}
 for(let x=0;x<W;x+=4){const h=192+Math.sin(x*.015+2)*10;R(x,h,4,H-h,'#0b1226')}
 [[20,168,44,34],[78,176,38,30],[236,172,46,34],[300,178,40,28],[356,170,48,36],[420,178,40,30]].forEach(([x,y,w,h],i)=>{R(x,y,w,h,'#1a2340');for(let k=0;k<w+4;k+=2){const m=Math.min(k,w+4-k)/2;R(x-2+k,y-m-1,2,m+2,'#10162c')}
  const lit=(i*7)%3===0;R(x+w/2-4,y+10,8,8,lit?'#ffcf7a':'#0d1226');if(lit)glow(x+w/2,y+14,15,'#ffcf7a',.5);
  else{ctx.font='bold 8px monospace';ctx.fillStyle='#8fa6d8';ctx.globalAlpha=.3+.4*Math.sin(now/600+i);ctx.fillText('z',x+w/2+4,y-8-((now/60+i*9)%16));ctx.globalAlpha=1}});
 R(150,84,34,108,'#1c2544');R(146,80,42,6,'#252f55');for(let k=0;k<22;k++)R(148+k*.9,58+k,40-k*1.8,2,'#141b36');R(165,40,4,20,'#252f55');
 pcirc(167,112,14,'#3a4468');pcirc(167,112,12,'#cbd3ea');pcirc(167,112,10,'#161f3d');RA(150,96,34,34,'#9ab4ff',.05+.06*Math.sin(now/900));
 for(let i=0;i<12;i++){const a=i*TAU/12;R(167+Math.cos(a)*9,112+Math.sin(a)*9,1,1,'#cbd3ea')}R(166,103,2,10,'#e9eefc');R(167,112,7,2,'#e9eefc');
 R(157,150,20,14,'#0e1428');for(let i=0;i<3;i++)RA(0,206+i*10,W,12,'#8fa6d8',.04);
 for(let i=0;i<12;i++){const a=now/900+i*1.3,x=220+Math.cos(a*.7+i)*180+i*8,y=210+Math.sin(a+i)*24;RA(x,y,2,2,'#ffe79a',.4+.4*Math.sin(now/200+i))}
 ctx.font='bold 12px monospace';ctx.fillStyle='#dfe8ff';ctx.globalAlpha=clamp((t-.5)/1,0,1);ctx.fillText('시계골 · 사흘째',16,24);ctx.globalAlpha=1}
function artWorkshop(now,t){R(0,0,W,H,'#2a1b12');for(let x=0;x<W;x+=24)R(x,0,1,190,'#20140d');R(0,190,W,H-190,'#3a2618');for(let x=0;x<W;x+=32)R(x,190,1,H-190,'#2a1a10');
 R(340,36,64,80,'#1a120c');R(344,40,56,72,'#0d1530');pcirc(372,66,10,'#e9eefc');R(371,40,2,72,'#1a120c');R(344,74,56,2,'#1a120c');
 R(30,64,150,5,'#5a3a22');for(let i=0;i<5;i++){const cx=48+i*30;pcirc(cx,50,10,'#c9b48a');pcirc(cx,50,8,'#efe4c2');R(cx,43,1,7,'#3a2a1a');R(cx,50,5,1,'#3a2a1a')}
 glow(150,165,120,'#ffcf7a',.4);R(56,150,190,30,'#5b2e2e');R(56,142,190,10,'#e6dcc8');R(56,138,34,14,'#f2ead8');
 pcirc(78,146,11,'#e0b894');R(66,150,26,10,'#f0f0f0');R(72,143,5,1,'#3a2a1a');R(81,143,5,1,'#3a2a1a');R(66,136,24,5,'#e8e8e8');
 for(let i=0;i<4;i++)RA(96+i*36,146,30,3,'#000',.15);R(50,176,6,26,'#3a2416');R(246,176,6,26,'#3a2416');
 R(270,172,124,7,'#5b3d22');R(276,179,6,30,'#3a2416');R(382,179,6,30,'#3a2416');
 const tx=330,ty=150,sw=Math.sin(now/260)*.6;for(let y=0;y<22;y++){const w=8+y*.55;R(tx-w/2,ty-4+y,w,1,y%6<1?'#a88530':'#d4ae4a')}R(tx-9,ty+18,18,3,'#8a6a20');line(tx,ty+16,tx+Math.sin(sw)*13,ty+16-Math.cos(sw)*13,2,(x,y)=>R(x-1,y-1,2,2,'#3a2a12'));
 pcirc(tx,ty+4,4,'#a8f0ff',.6+.4*Math.sin(now/240));pcirc(tx,ty+4,2,'#ffffff');
 for(let k=0;k<3;k++){const r=((now/35+k*36)%110);const a=1-r/110;for(let i=0;i<24;i++){const an=i*TAU/24;RA(tx+Math.cos(an)*r,ty+4+Math.sin(an)*r*.7,2,2,'#a8f0ff',a*.4)}}
 R(420,96,22,50,'#3a4a52');R(416,92,30,10,'#5a6a72');R(424,84,14,12,'#6a7a82');R(427,88,8,3,'#0d1320');R(410,150,3,50,'#2a3237');R(448,150,3,50,'#2a3237');
 line(400,104,400,124,2,(x,y)=>R(x,y,2,2,'#c9a24a'));pcirc(400,128,5,'#c9a24a');pcirc(400,128,2,'#efe4c2');glow(400,128,16,'#ffcf7a',.6+.3*Math.sin(now/300));
 drawKnight(ctx,248,118,3,true)}
function artTrain(now,t){skyBands(0,150,'#2a1236','#ff9a5c');pcirc(360,148,30,'#ffd9a0');glow(360,148,64,'#ffb070',.55);
 for(let x=0;x<W;x+=4){const h=132+Math.sin(x*.025)*12+Math.sin(x*.07)*5;R(x,h,4,150-h+2,'#1c0f26')}R(0,150,W,150,'#150c1c');
 for(let i=0;i<16;i++){const y=160+i*8;R(0,y,W,2,'#2a1c30')}R(0,176,W,3,'#6a5a70');R(0,190,W,3,'#6a5a70');for(let x=0;x<W;x+=12)R(x,172,6,26,'#2a1c30');
 R(0,196,180,10,'#3a2a44');R(0,206,180,80,'#22162a');
 const tx=120+Math.max(0,t-1.5)*Math.max(0,t-1.5)*22,dark='#0f0814';for(let c=0;c<5;c++){const x=tx+c*66;R(x,148,60,32,dark);R(x+4,152,10,8,'#ffcf7a');R(x+20,152,10,8,'#ffcf7a');R(x+36,152,10,8,'#ffcf7a');R(x,180,60,4,'#2a1c30');pcirc(x+12,186,5,'#1a1020');pcirc(x+48,186,5,'#1a1020')}
 R(tx+318,138,28,42,dark);R(tx+340,128,10,14,dark);for(let i=0;i<8;i++)pcirc(tx+345-i*14-(now/30+i*20)%20,120-i*6,5+i*.6,'#3a2a44',.4-i*.04);
 R(30,168,10,28,'#0a0610');pcirc(35,163,6,'#0a0610');R(40,172,10,3,'#0a0610');const wv=Math.sin(now/180)*5;line(40,170,52,164+wv,2,(x,y)=>R(x,y,3,3,'#0a0610'));R(24,192,5,3,'#ffcf7a');glow(30,192,22,'#ffcf7a',.5);
 ctx.font='bold 12px monospace';ctx.fillStyle='#ffd9a0';ctx.globalAlpha=clamp((t-.4)/1,0,1);ctx.fillText('마지막 열차 · 삼백 년 전',16,24);ctx.globalAlpha=1}
function artWatch(now,t){R(0,0,W,H,'#1a1008');for(let i=0;i<8;i++)RA(0,0,W,H,'#000',.05);glow(240,120,130,'#ffb070',.4);
 const cx=240,cy=120;for(let i=0;i<14;i++)R(cx-1,cy-100+i*4,3,3,'#8a6a20');pcirc(cx,cy-98,7,'#c9a24a');pcirc(cx,cy,84,'#8a6a20');pcirc(cx,cy,80,'#c9a24a');pcirc(cx,cy,74,'#efe2bd');
 for(let i=0;i<12;i++){const a=i*TAU/12-Math.PI/2,big=i%3===0;line(cx+Math.cos(a)*(big?58:64),cy+Math.sin(a)*(big?58:64),cx+Math.cos(a)*70,cy+Math.sin(a)*70,2,(x,y)=>R(x-1,y-1,big?3:2,big?3:2,'#3a2a12'))}
 const ha=now/26000-Math.PI/2,ma=now/2200-Math.PI/2;line(cx,cy,cx+Math.cos(ha)*36,cy+Math.sin(ha)*36,2,(x,y)=>R(x-1,y-1,3,3,'#2a1a0a'));line(cx,cy,cx+Math.cos(ma)*56,cy+Math.sin(ma)*56,2,(x,y)=>R(x-1,y-1,2,2,'#2a1a0a'));pcirc(cx,cy,4,'#8a6a20');
 ctx.font='bold 13px monospace';ctx.fillStyle='#5a4420';ctx.textAlign='center';ctx.fillText('선',cx,cy+30);ctx.textAlign='left';R(cx-40,cy+50,80,1,'#c9b48a');
 for(let i=0;i<30;i++){const x=(i*61+now/40)%W,y=(i*37+now/70*((i%3)+1))%H;RA(x,y,1,1,'#ffe79a',.3+.3*Math.sin(now/300+i))}
 const lift=Math.max(0,1-t/1.6);RA(0,0,W,H,'#000',lift*.6)}
function artTruth(now,t){R(0,0,W,H,'#070818');for(let i=0;i<50;i++)RA((i*79)%W,(i*41)%H,1,1,'#6a7ac0',.3+.3*Math.sin(now/500+i));
 const ox=372,oy=118;for(let k=0;k<5;k++){const r=((now/28+k*44)%210),a=1-r/210;for(let i=0;i<48;i++){const an=i*TAU/48;RA(ox+Math.cos(an)*r,oy+Math.sin(an)*r,2,2,'#d04a80',a*.5)}}
 const pu=1+.06*Math.pow(Math.max(0,Math.sin(now/520)),8);pcirc(ox,oy,50*pu,'#2a0c22');pcirc(ox,oy,40*pu,'#6a1c48');pcirc(ox,oy,26*pu,'#c8407a');pcirc(ox,oy,12*pu,'#ffd0e0');
 for(let i=0;i<40;i++){const a=i*2.4+now/2400,r=52+((i*13)%20);RA(ox+Math.cos(a)*r,oy+Math.sin(a)*r,2,2,'#8a8a94',.5)}
 const kx=104+Math.sin(now/700)*6,ky=134+Math.cos(now/900)*5;glow(kx,ky,32,'#a8f0ff',.55);pcirc(kx,ky,13,'#a8f0ff',.55);pcirc(kx,ky,8,'#dffaff');pcirc(kx,ky,3,'#ffffff');
 for(let i=0;i<30;i++){const p=((i/30)+now/3200)%1;RA(lerp(kx+14,ox-54,p),lerp(ky,oy,p)+Math.sin(p*9+now/300)*4,2,2,'#a8f0ff',.5*(1-Math.abs(p-.5)*1.4))}
 let px=0;for(let x=0;x<W;x+=2){const ph=((x-now/14)%150+150)%150,fade=clamp(1-x/W*.7,.2,1);let y=250;if(ph>60&&ph<66)y-=26*fade*Math.sin((ph-60)/6*Math.PI);if(ph>66&&ph<72)y+=10*fade*Math.sin((ph-66)/6*Math.PI);R(x,y,2,2,'#ff8fb0');px=y}
 ctx.font='bold 12px monospace';ctx.fillStyle='#ff8fb0';ctx.globalAlpha=clamp((t-.4)/1,0,1);ctx.fillText('첫 박동 · 오메가 엔진',16,24);ctx.globalAlpha=1}
function artDawn(now,t){const p=clamp(t/10,0,1),q=Math.pow(p,.8);skyBands(0,190,mixc('#141a48','#5aa0e8',q),mixc('#3a3878','#ffe0a8',q));
 const sy=210-q*118;glow(310,sy,130,'#ffd9a0',.55*q);pcirc(310,sy,28,'#fff1b0');for(let i=0;i<14;i++){const a=i*TAU/14+now/4000;line(310+Math.cos(a)*32,sy+Math.sin(a)*32,310+Math.cos(a)*(90+q*60),sy+Math.sin(a)*(90+q*60),8,(x,y,k)=>RA(x-1,y-1,2,2,'#fff1b0',.14*(1-k/14)))}
 for(let x=0;x<W;x+=4){const h=170+Math.sin(x*.02)*14+Math.sin(x*.05+1)*6;R(x,h,4,H-h,mixc('#1c2a3c','#5a7a5a',q))}for(let x=0;x<W;x+=4){const h=200+Math.sin(x*.015+2)*10;R(x,h,4,H-h,mixc('#101a28','#3a5a3a',q))}
 [[20,176,44,34],[78,184,38,30],[236,180,46,34],[300,186,40,28],[356,178,48,36],[420,186,40,30]].forEach(([x,y,w,h],i)=>{R(x,y,w,h,mixc('#1a2340','#d9b48a',q));for(let k=0;k<w+4;k+=2){const m=Math.min(k,w+4-k)/2;R(x-2+k,y-m-1,2,m+2,mixc('#10162c','#a04a3a',q))}R(x+w/2-4,y+10,8,8,'#ffcf7a');
  for(let k=0;k<3;k++)pcirc(x+w-8+Math.sin(now/500+k+i)*3,y-14-k*9-((now/90+i*7)%12),3+k,'#e8ecf4',.3-k*.07)});
 R(150,92,34,108,mixc('#1c2544','#c9b48a',q));R(146,88,42,6,mixc('#252f55','#e0cfa8',q));for(let k=0;k<22;k++)R(148+k*.9,66+k,40-k*1.8,2,mixc('#141b36','#a04a3a',q));
 pcirc(167,120,14,'#e0cfa8');pcirc(167,120,12,'#fff8e0');const ha=now/1500,ma=now/180;line(167,120,167+Math.cos(ha)*7,120+Math.sin(ha)*7,2,(x,y)=>R(x,y,2,2,'#3a2a1a'));line(167,120,167+Math.cos(ma)*10,120+Math.sin(ma)*10,2,(x,y)=>R(x,y,1,1,'#3a2a1a'));
 const ring=Math.max(0,1-((now/1000)%4)/1.2);if(t>3)for(let i=0;i<24;i++){const a=i*TAU/24,r=20+(1-ring)*70;RA(167+Math.cos(a)*r,120+Math.sin(a)*r,2,2,'#fff1b0',ring*.6)}
 for(let i=0;i<6;i++){const bx=(now/30+i*90)%(W+60)-30,by=60+i*14+Math.sin(now/300+i)*4,fl=Math.sin(now/90+i)>0?1:-1;R(bx,by,3,1,'#2a2a3a');R(bx+3,by+fl,3,1,'#2a2a3a');R(bx-3,by+fl,3,1,'#2a2a3a')}
 drawKnight(ctx,58,150,3,false);pcirc(96,158,3,'#a8f0ff',.7+.3*Math.sin(now/200));glow(96,158,10,'#a8f0ff',.5);RA(0,0,W,H,'#ffffff',Math.max(0,1-t/1.2)*.8)}
function artGatehall(now,t){R(0,0,W,H,'#0c0f14');skyBands(0,H,'#0c0f14','#17202a');
 const gx=240,gw=150,gy=260;RA(0,0,W,H,'#000',.15);glow(gx,120,140,'#ffcf7a',.28);
 R(gx-gw/2,40,gw,gy-40,'#1a1410');R(gx-gw/2+8,48,gw-16,gy-56,'#241c14');
 for(let i=0;i<14;i++){const y=52+i*15;R(gx-gw/2+10,y,gw-20,2,'#3a2c1c')}
 const period=1.8,cyc=Math.floor(Math.max(0,t-.6)/period),ph=Math.max(0,((t-.6)%period))/period,doneCount=Math.min(13,cyc);
 for(let i=0;i<doneCount;i++){ctx.font='8px monospace';ctx.fillStyle='#5a4a30';ctx.fillText('|',gx-gw/2+14+i*9,66)}
 if(doneCount<13&&t>.6){const wx=gx-gw/2+22+ph*(gw-44),wy=gy-44,bob=Math.sin(ph*TAU*3)*2;
  RA(wx-7,wy+21,16,3,'#000',.35);drawKnight(ctx,wx-6,wy-19+bob,1.35,ph>.5);
  if(ph>.94){ctx.font='8px monospace';ctx.fillStyle='#5a4a30';ctx.fillText('|',gx-gw/2+14+doneCount*9,66)}}
 glow(gx,150,50,'#ffcf7a',.4+.15*Math.sin(now/300));pcirc(gx,150,10,'#ffe0a0',.7);
 ctx.font='bold 12px monospace';ctx.fillStyle='#e8c98a';ctx.globalAlpha=clamp((t-.4)/1,0,1);ctx.fillText('박동의 문 · 삼백 년 전',16,24);ctx.globalAlpha=1}
function artLanternmemory(now,t){R(0,0,W,H,'#0a1416');for(let i=0;i<10;i++)RA(0,0,W,H,'#04080a',.06);
 for(let x=0;x<W;x+=4){const h=60+Math.sin(x*.03)*10;R(x,0,4,h,'#0e1c1e')}
 const p=Math.min(1,Math.max(0,t-1.5)/7),cx=170-p*p*130,cy=190-p*8,sc=1-p*.55;
 R(cx,cy,70*sc,36*sc,'#0a1418');R(cx+8*sc,cy+6*sc,54*sc,10*sc,'#12242a');pcirc(cx+16*sc,cy+42*sc,7*sc,'#060a0c');pcirc(cx+54*sc,cy+42*sc,7*sc,'#060a0c');
 for(let i=0;i<3;i++)glow(cx+(30+i*10)*sc,cy+14*sc,10*sc,'#ffcf7a',.5*(1-p*.3));
 if(t<3){const wp=clamp((t-.4)/2,0,1),wx=cx+16-wp*6;drawKnight(ctx,wx,cy-16,1.15,true);
  if(t>1.6&&t<3){const wave=Math.sin((t-1.6)*6)*8;RA(wx+14,cy-16+wave,2,2,'#c9b48a',.6)}}
 const wx=340,wy=140,blink=(Math.sin(now/450)+1)/2,farewell=t>2&&t<5.5?1+.5*Math.sin((t-2)*3):.5+.5*blink;
 glow(wx,wy,90,'#3ad0e8',.3*farewell);pcirc(wx,wy,26,'#123a3e');pcirc(wx,wy,20,'#1c5a5e');pcirc(wx,wy,13,'#3ad0e8',Math.min(1,.5+.4*farewell));
 for(let i=0;i<10;i++){const a=i*TAU/10+now/900;line(wx,wy,wx+Math.cos(a)*34,wy+Math.sin(a)*34,4,(x,y)=>RA(x-1,y-1,2,2,'#3ad0e8',.3))}
 for(let i=0;i<24;i++){const x=(i*53+now/50)%W,y=(i*29)%180;RA(x,y,1,1,'#8ad8e0',.2+.2*Math.sin(now/400+i))}
 ctx.font='bold 12px monospace';ctx.fillStyle='#8ad8e0';ctx.globalAlpha=clamp((t-.4)/1,0,1);ctx.fillText('푸른 전압의 회랑 · 갱도가 닫히던 날',16,24);ctx.globalAlpha=1}
function artForgekey(now,t){R(0,0,W,H,'#160c08');for(let i=0;i<6;i++)RA(0,0,W,H,'#000',.04);
 const fx=140,fy=170;glow(fx,fy,110,'#ff8a3d',.4+.15*Math.sin(now/180));R(fx-50,fy-10,100,60,'#241008');R(fx-42,fy-2,84,44,'#3a1a0c');
 pcirc(fx,fy+8,30,'#ff8a3d',.85);pcirc(fx,fy+8,18,'#ffd27a');for(let i=0;i<18;i++){const a=RND()*TAU,r=10+RND()*22;RA(fx+Math.cos(a)*r,fy+8+Math.sin(a)*r*.6,2,2,'#ffe0a0',.5)}
 const ax=300,ay=200;R(ax-30,ay,60,14,'#2a2a30');R(ax-24,ay-4,48,6,'#3a3a42');
 const kt=Math.min(1,t/6),kx=ax-2,ky=ay-14-kt*4;
 const period=1.1,ph=Math.max(0,t%period)/period,hy=ay-58+Math.pow(ph,2.4)*46;
 R(kx-3,ay-62,6,hy-(ay-62),'#8a6a4a');R(kx-9,hy-6,18,11,'#3a3a42');R(kx-9,hy-6,18,3,'#4a4a54');
 const impact=ph>.92&&t>.3;
 if(impact){for(let i=0;i<12;i++){const a=RND()*TAU,r=RND()*18;RA(kx+Math.cos(a)*r,ky-4+Math.sin(a)*r*.5,2,2,'#ffe79a',.85)}glow(kx,ky-4,24,'#ffe79a',.6);G.shake=Math.max(G.shake||0,0)}
 RA(kx-1,ky-8,2,14,'#ffcf7a',.5+.5*kt);pcirc(kx,ky-10,4,'#ffe0a0',.6+.4*kt);
 for(let i=0;i<8;i++){const spx=ax+(RND()-.5)*40,spy=ay-10-RND()*30;if(Math.floor(now/60+i)%9===0)RA(spx,spy,2,2,'#ffcf7a',.6)}
 ctx.font='bold 12px monospace';ctx.fillStyle='#ffcf7a';ctx.globalAlpha=clamp((t-.4)/1,0,1);ctx.fillText('잿불 용광로 · 열쇠를 벼리던 밤',16,24);ctx.globalAlpha=1}
function artCoreseal(now,t){R(0,0,W,H,'#050a12');for(let i=0;i<60;i++)RA((i*67)%W,(i*53)%H,1,1,'#8ac0e8',.2+.2*Math.sin(now/450+i));
 const cx=240,cy=140;glow(cx,cy,90,'#8ac0e8',.3+.1*Math.sin(now/300));pcirc(cx,cy,54,'#0c2030');pcirc(cx,cy,46,'#123044',.9);
 for(let ring=0;ring<3;ring++){const r=20+ring*10,pulse=(Math.sin(now/300-ring*.8)+1)/2;pcirc(cx,cy,r,'#8ac0e8',.15+.15*pulse)}
 pcirc(cx,cy,10,'#e8f4ff',.7+.3*Math.sin(now/220));
 for(let i=0;i<22;i++){const a=i*TAU/22+now/2200,r=60+((i*7)%14);RA(cx+Math.cos(a)*r,cy+Math.sin(a)*r,1,1,'#c8e8ff',.35)}
 const sealP=clamp((t-1)/6,0,1);for(let a=0;a<sealP*TAU;a+=.16){const r=51,px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r;RA(px,py,2,2,'#dff4ff',.55);if(Math.sin(a*7)>0)RA(px,py,3,3,'#dff4ff',.2)}
 for(let x=0;x<W;x+=3){const h=Math.abs(Math.sin(x*.08+now/260))*10;RA(x,236-h/2,2,h,'#4a90b8',.35)}
 ctx.font='bold 12px monospace';ctx.fillStyle='#a8d8f0';ctx.globalAlpha=clamp((t-.4)/1,0,1);ctx.fillText('서리 냉각실 · 봉인된 기록 #4473',16,24);ctx.globalAlpha=1}
function artHivebell(now,t){skyBands(0,190,'#141230','#3a2a4a');R(0,190,W,H-190,'#1a1420');
 const tx=220,ty=90;R(tx-16,ty,32,110,'#241a2a');R(tx-22,ty-14,44,16,'#2e2034');pcirc(tx,ty+30,13,'#0e0812');
 const swing=Math.sin(now/500)*.35;line(tx,ty+18,tx+Math.sin(swing)*10,ty+38,3,(x,y)=>RA(x-1,y-1,2,2,'#c9b48a',.7));
 const ringPh=(now%3142)/3142;for(const off of [0,.5]){const rp=(ringPh+off)%1,r=14+rp*70,a=Math.max(0,.4*(1-rp));if(a>0)for(let k=0;k<20;k++){const an=k*TAU/20;RA(tx+Math.cos(an)*r,ty+30+Math.sin(an)*r*.4,2,2,'#ffe79a',a)}}
 for(let i=0;i<26;i++){const a=i*.9+now/700,r=40+((i*11)%70),x=tx+Math.cos(a)*r*1.6,y=60+Math.sin(a)*r*.5+((i*13)%40);
  if(x>4&&x<W-4&&y>10&&y<170)RA(x,y,2,2,i%3?'#ffe79a':'#ffb0d0',.5+.3*Math.sin(now/200+i))}
 glow(tx,ty+30,40,'#ffe79a',.3+.15*Math.sin(now/260));
 ctx.font='bold 12px monospace';ctx.fillStyle='#ffe79a';ctx.globalAlpha=clamp((t-.4)/1,0,1);ctx.fillText('폭풍 관제탑 · 마지막으로 종을 맡긴 날',16,24);ctx.globalAlpha=1}
function artHorizonwatch(now,t){const q=.3;skyBands(0,180,mixc('#1a1030','#3a2050',q),mixc('#2a1840','#5a3868',q));
 for(let x=0;x<W;x+=4){const h=170+Math.sin(x*.02)*8;R(x,h,4,H-h,'#100a18')}R(0,178,W,3,'#241832');
 const tx=90,ty=110;R(tx-8,ty,16,68,'#1c1428');R(tx-14,ty-10,28,12,'#241a30');
 for(let i=0;i<3;i++)pcirc(tx,ty-4-i*3,3-i*.5,'#c8a0e8',.4);
 const ang=-Math.PI/2+Math.sin(now/1600)*1.1,ex=tx+Math.cos(ang)*380,ey=ty-4+Math.sin(ang)*90;
 line(tx,ty-4,ex,ey,4,(x,y,i)=>{if(i%3===0)RA(x-1,y-1,2,2,'#c8a0e8',.28)});
 glow(tx,ty-4,20,'#c8a0e8',.4+.1*Math.sin(now/300));
 const blipCyc=(t%9)/9,blipVis=blipCyc>.7&&blipCyc<.97?Math.sin((blipCyc-.7)/.27*Math.PI):0;
 if(blipVis>.02){const bx=390,by=175;RA(bx,by-2,3,3,'#fff1d0',blipVis*.75);glow(bx,by-2,16,'#fff1d0',blipVis*.45)}
 for(let i=0;i<40;i++){const x=(i*61+now/60)%W,y=(i*23)%160;RA(x,y,1,1,'#e8d0f8',.2+.2*Math.sin(now/500+i))}
 ctx.font='bold 12px monospace';ctx.fillStyle='#c8a0e8';ctx.globalAlpha=clamp((t-.4)/1,0,1);ctx.fillText('눈먼 요새 · 첫 관측이 시작된 날',16,24);ctx.globalAlpha=1}
const ART={village:artVillage,workshop:artWorkshop,train:artTrain,watch:artWatch,truth:artTruth,dawn:artDawn,gatehall:artGatehall,lanternmemory:artLanternmemory,forgekey:artForgekey,coreseal:artCoreseal,hivebell:artHivebell,horizonwatch:artHorizonwatch};
function artPart2Intro(now,t){const p=clamp(t/8,0,1);skyBands(0,190,mixc('#0d1a20','#3a5a52',p*.4),mixc('#182e35','#4a6a5a',p*.4));
 for(let i=0;i<9;i++){R(i*58,60-i%3*18,44,130,i%2?'#14262c':'#182e35')}R(0,150,W,40,'#22383a');R(0,148,W,3,'#3d5a52');
 drawKnight(ctx,120,120,3);const shake=t>4?Math.sin(now/40)*(t<4.6?2:0):0;
 if(t>4){RA(0,0,W,H,'#3a1a1a',.06*Math.max(0,1-((t-4)/1.2)));for(let i=0;i<6;i++)R(340+shake+i*4,90+((i*37)%40),2,6,'#2a1a10')}
 if(t>4.4)glow(360,150,30,'#7ad84f',.15+.1*Math.sin(now/200))}
function artRootdeep(now,t){R(0,0,W,H,'#0a0f08');skyBands(0,190,'#0a0f08','#141f10');
 const cx=W/2,cy=170;for(let i=0;i<7;i++){const a=i*TAU/7+now/4000,len=60+((i*29)%40);line(cx,cy,cx+Math.cos(a)*len,cy+Math.sin(a)*len*.7,4,(x,y)=>RA(x-1,y-1,2,2,'#4a6a3a',.5))}
 glow(cx,cy,40,'#7ad84f',.25+.1*Math.sin(now/500));pcirc(cx,cy,10,'#1a2410');for(let i=0;i<20;i++)RA((i*53)%W,(i*71+now/30)%190,1,1,'#3a5a2a',.4)}
function artAbyssEcho(now,t){R(0,0,W,H,'#040a14');skyBands(0,190,'#040a14','#0a1830');
 const ripple=(now/1000)%3;for(let i=0;i<4;i++){const r=((ripple+i*.7)%3)*60;RA(W/2-r,150,r*2,3,'#3a7ddc',.25*(1-r/180))}
 glow(W/2,150,50+Math.sin(now/700)*10,'#3a7ddc',.2);for(let i=0;i<14;i++)RA((i*67)%W,40+((i*53+now/20)%140),1,1,'#7ab8f0',.3)}
function artPart2End(now,t){const p=clamp(t/9,0,1),q=Math.pow(p,.8);skyBands(0,190,mixc('#141a48','#5aa0e8',q),mixc('#3a3878','#ffe0a8',q));
 for(let i=0;i<9;i++)R(i*58,60-i%3*18,44,130,i%2?'#14262c':'#182e35');R(0,150,W,40,'#22383a');R(0,148,W,3,'#3d5a52');
 drawKnight(ctx,120,120+Math.round(Math.sin(now/350)*2),3);
 const ring=Math.max(0,1-((now/1000)%4)/1.2);if(t>3)for(let i=0;i<24;i++){const a=i*TAU/24,r=20+(1-ring)*70;RA(167+Math.cos(a)*r,120+Math.sin(a)*r,2,2,'#c9a86a',ring*.5)}}
Object.assign(ART,{part2intro:artPart2Intro,rootdeep:artRootdeep,abyssecho:artAbyssEcho,part2end:artPart2End});
Object.assign(SCENES,{
part2intro:[{art:'part2intro',lines:['종소리가 다시 규칙적으로 울린 지 한 달. 시계골은 서서히 평범한 일상을 되찾아가고 있었다.',
  ['똑딱','좋다… 이 느낌. 다들 잘 자고, 잘 일어나고.'],'그날 밤, 마을을 둘러싼 담장 저 너머 황무지에서 낮고 긴 울음소리가 들려왔다.',
  ['똑딱','(굳은 얼굴로) …하루. 저 소리, 나 알아. 저건, 정적이 남기고 간 무언가가 깨어나는 소리야.'],
  ['하루','또…?'],['똑딱','이번엔 기계가 아니야. 뭔가 살아있는 것들이야. 저 멀리서, 이 종소리를 향해 다가오고 있어. 가보자. 이번에도, 끝까지.']]}],
rootdeep:[{art:'rootdeep',lines:['늪지 아귀가 돌려준 기억 속에서, 황무지 곳곳에서 몰려오는 것들이 결국 하나의 뿌리로 이어져 있는 광경이 스쳐 지나갔다.',
  ['똑딱','…이게 다 하나로 이어져 있어. 우리가 만난 애들 전부, 저 먼 곳 하나에서 온 거야.'],
  ['하루','그럼 그 끝에는—'],['똑딱','아마도, 제일 처음 잠들었던 무언가가 있겠지. 이 시계탑에서 가장 가까운, 가장 높은 곳에.']]}],
abyssecho:[{art:'abyssecho',lines:['심연 아귀왕이 가라앉으며 남긴 마지막 울림이 저수지 둑을 넘어 퍼져나갔다. 그 메아리 끝에서 아주 오래된, 낮은 숨소리가 들렸다.',
  ['똑딱','(속삭이듯) …들었어? 저 위, 시계탑 옥상에서 무언가 숨 쉬고 있어. 아주, 아주 오랫동안.'],
  ['하루','무섭지 않아?'],['똑딱','무서워. 그래도 갈 거야. 하루가 있으니까.']]}],
part2end:[{art:'part2end',lines:['새로운 종소리가 울려 퍼진 다음 날 아침, 시계골은 유난히 조용하고 평화로웠다. 나쁜 의미의 조용함이 아니었다.',
  ['선 할아버지','…하루야. 이번엔 또 뭘 물리치고 온 게냐.'],['하루','괴물이 아니었어요, 할아버지. 그냥… 오래 외로웠던 것들이었어요.'],
  ['선 할아버지','그렇구나. 세상엔 그런 것들이 참 많단다. 미워하지 않고 돌려보낸 거라면, 잘한 거다.'],
  ['똑딱','하루, 이제 정말 끝난 걸까?'],['하루','아니. 아마 또 무슨 일이 생기겠지. 그래도 괜찮아. 우리가 있잖아.'],
  '시계탑의 종이 다시 열두 번 울렸다. 이번엔 그 소리를 무서워하는 것이 이 산 아래 어디에도 없었다.','— 끝 —']}]
});
function drawStoryScene(now){const t=(now-SCN.artT0)/1000;(ART[SCN.art]||artVillage)(now,t);RA(0,H-70,W,70,'#000',.35);RA(0,H-48,W,48,'#000',.3);RA(0,0,W,16,'#000',.25);if(SQ22.previous&&t<.32){ctx.save();ctx.globalAlpha=1-scE(t/.32);ctx.imageSmoothingEnabled=false;ctx.drawImage(SQ22.previous,0,0,W,H);ctx.restore()}else if(SQ22.previous){SQ22.previous=null}else if(t<.32){RA(0,0,W,H,'#000',clamp(1-t/.32,0,1))}}
/* ---- 초상화 ---- */
function drawPortrait(who){const c=$('dlgPortrait');if(!c)return;const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.clearRect(0,0,56,56);if(!who){c.style.display='none';return}c.style.display='block';
 const F=(a,b,w,h,col)=>{x.fillStyle=col;x.fillRect(a,b,w,h)},bi=BOSSES.findIndex(b=>b.name===who);let frame='#a6f5c6';x.fillStyle='#0b1218';x.fillRect(0,0,56,56);
 if(bi>=0){const B=BOSSES[bi];frame=B.c;F(0,40,56,16,shade(B.c,.2));drawMech(x,B,28,52,0,{still:true},2)}
 else if(who==='하루'){frame='#a6f5c6';F(12,10,32,30,'#e4e9cd');F(12,10,32,4,'#f4f8e0');F(14,20,28,12,'#233c47');F(18,24,6,4,'#a6f5c6');F(32,24,6,4,'#a6f5c6');F(12,34,32,6,'#8ea9aa');F(8,40,40,16,'#5fb69d');F(22,40,12,6,'#397c76')}
 else if(who==='똑딱'){frame='#a8f0ff';for(let y=8;y<50;y++){const w=10+(y-8)*.75;F(28-w/2,y,w,1,y%8<1?'#a88530':'#d4ae4a')}F(16,48,24,5,'#8a6a20');pcirc(28,26,8,'#3a5a6a',1,x);pcirc(28,26,6,'#a8f0ff',.9,x);pcirc(28,26,3,'#ffffff',1,x);F(27,4,2,14,'#3a2a12');F(23,10,10,4,'#c9a24a')}
 else if(who.indexOf('선 할아버지')===0){frame='#e6dcc8';F(14,12,28,26,'#e0b894');F(10,12,6,20,'#f0f0f0');F(40,12,6,20,'#f0f0f0');F(14,8,28,6,'#f0f0f0');F(16,22,10,6,'#3a2a1a');F(30,22,10,6,'#3a2a1a');F(18,24,6,2,'#9ad0e0');F(32,24,6,2,'#9ad0e0');F(14,34,28,18,'#f4f4f4');F(20,34,16,4,'#e0b894');F(6,48,44,8,'#5a3a22')}
 else if(who==='윤서'){frame='#ffb070';F(14,10,28,28,'#e8c6a0');F(10,8,36,8,'#e8722a');F(10,14,6,22,'#e8722a');F(40,14,6,22,'#e8722a');F(16,10,24,4,'#3a4a52');F(18,11,8,3,'#8ad0ff');F(30,11,8,3,'#8ad0ff');F(19,24,5,3,'#2a2a3a');F(33,24,5,3,'#2a2a3a');F(6,44,44,12,'#3a5a7a')}
 else{frame='#8a8a94';for(let i=0;i<220;i++)F(Math.floor(RND()*56),Math.floor(RND()*56),3,3,['#3a3a44','#8a8a94','#c8c8d0','#1a1a22'][Math.floor(RND()*4)])}
 F(0,0,56,2,frame);F(0,54,56,2,frame);F(0,0,2,56,frame);F(54,0,2,56,frame)}
/* ---- 똑딱 스프라이트 ---- */
function drawTick(c,x,y,now){const sw=Math.sin(now/240)*.7;for(let j=0;j<11;j++){const w=5+j*.5;c.fillStyle=j%5===0?'#a88530':'#d4ae4a';c.fillRect(Math.round(x-w/2),Math.round(y-6+j),Math.round(w),1)}c.fillStyle='#8a6a20';c.fillRect(Math.round(x-6),Math.round(y+5),12,2);
 c.fillStyle='#3a2a12';for(let i=0;i<7;i++)c.fillRect(Math.round(x+Math.sin(sw)*i*.9),Math.round(y+4-i*Math.cos(sw)),1,1);pcirc(x,y-1,3,'#a8f0ff',.55+.35*Math.sin(now/220),c);c.fillStyle='#ffffff';c.fillRect(Math.round(x-1),Math.round(y-2),2,2)}

