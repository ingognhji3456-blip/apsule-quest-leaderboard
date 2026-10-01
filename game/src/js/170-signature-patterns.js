/* ================= 시그니처 패턴 ================= */
const MV={};
['volley','eyeLaser','slam','missiles','sawThrow','rotor','turrets','laserPods','ringBurst','clockLaser','mines','starBurst','earthquake'].forEach(n=>{MV[n]=t=>{const r=ATK[n](t);return typeof r==='number'?r:(r&&r.len)||8}});
MV.charge=t=>{const r=ATK.charge(t).len;tweenBoss(HOME.x,HOME.y,t+r+.5,t+r+2.1);return r+2.2};
const handsUp=(t,dx,dy)=>{const g0=geo(G.B,HOME.x,HOME.y);for(const i of [0,1])tweenHand(i,g0.sh[i][0]+(i?dx:-dx),g0.top+dy,t,t+1)};
MV.gearRail=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.15,d.tel),rows=ph>=2?4:ph>=1?3:2,ys=shuffle([AY+48,AY+92,AY+136,AY+180,AY+226]).slice(0,rows);
 ys.forEach((y,i)=>{const t0=t+i*1.1,dir=(i+ph)%2?1:-1,x0=dir>0?AX-24:AX+AW+24,x1=dir>0?AX+AW+24:AX-24;mover({kind:'gear',x0,y0:y,x1,y1:y,t0:t0+tel,t1:t0+tel+3.2,tp:t0,r:15,dmg:14});
  sch(t0,()=>{sfx(160,.25,'square',.04,320);spawnPuff(x0+dir*20,y,5,G.B.pal[2])});sch(t0+tel,()=>{sfx(110,.3,'sawtooth',.05,70);G.shake=Math.max(G.shake,.1)})});
 let extra=0;if(ph>=1){const xs=shuffle([AX+70,AX+150,AX+230,AX+310,AX+390]).slice(0,ph>=2?3:2);xs.forEach((x,i)=>{const t0=t+rows*1.1+i*1.1,dir=i%2?1:-1,y0=dir>0?AY-24:AY+AH+24,y1=dir>0?AY+AH+24:AY-24;mover({kind:'gear',x0:x,y0,x1:x,y1,t0:t0+tel,t1:t0+tel+2.8,tp:t0,r:15,dmg:14})});extra=xs.length*1.1}
 handsUp(t,22,-20);const L=tel+rows*1.1+extra+3.4;idleHands(t+L-.5);return L};
MV.voltGrid=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.15,d.tel),rows=ph>=2?4:3,ys=shuffle([AY+34,AY+80,AY+126,AY+172,AY+218]).slice(0,rows);
 ys.forEach((y,i)=>{const td=t+tel+i*.9,side=i%2?-1:1,x=side<0?AX+9:AX+AW-9;G.laserPods.push({x,y,side,t0:td-tel,t1:td,t2:td+1.1,col:G.B.c});beam(td,x,y,side<0?0:Math.PI,10,tel,1.1,0,false)});
 let extra=0;if(ph>=1){const xs=shuffle([AX+60,AX+150,AX+240,AX+330,AX+410]).slice(0,ph>=2?3:2);xs.forEach((x,i)=>{const td=t+tel+rows*.9+i*.9;G.laserPods.push({x,y:AY+6,side:0,v:true,t0:td-tel,t1:td,t2:td+1.1,col:G.B.c});beam(td,x,AY+4,Math.PI/2,10,tel,1.1,0,false)});extra=xs.length*.9}
 handsUp(t,26,-30);const L=tel+rows*.9+extra+1.4;idleHands(t+L-.4);return L};
MV.voltStrike=t=>{const d=D2(),ph=G.phase,n=4+ph*2,tel=Math.max(1.1,d.tel*.8);
 for(let i=0;i<n;i++){const ts=t+i*.9;sch(ts,()=>{const x=clamp(P.x+(RND()-.5)*30,AX+22,AX+AW-22),y=clamp(P.y+(RND()-.5)*30,AY+34,AY+AH-16);zCirc(ts+tel,x,y,21,{tel,kind:'bolt',dmg:14,dur:.4,after:()=>{G.shake=Math.max(G.shake,.2);G.flash=Math.max(G.flash,.1);sfx(90,.3,'sawtooth',.07,40);spawnPuff(x,y,10,G.B.pal[3]);if(ph>=2)for(let j=0;j<6;j++)bul(G.beat,x,y,j*TAU/6+i,52*D2().sp,3,7)}})})}
 handsUp(t,28,-36);const L=n*.9+tel+.6;idleHands(t+L-.3);return L};
MV.geyserWave=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.15,d.tel),waves=ph>=2?3:ph>=1?2:1;
 for(let w=0;w<waves;w++){const t0=t+w*3.4;sch(t0,()=>{const horiz=(w+ph)%2===0,dir=RND()<.5?1:-1,N=9;for(let i=0;i<N;i++){const f=i/(N-1),td=t0+tel+i*.32,x=horiz?(dir>0?AX+24+f*(AW-48):AX+AW-24-f*(AW-48)):clamp(P.x,AX+30,AX+AW-30),y=horiz?clamp(P.y,AY+44,AY+AH-16):(dir>0?AY+34+f*(AH-50):AY+AH-16-f*(AH-50));zCirc(td,x,y,20,{tel,kind:'geyser',dmg:12,dur:.7})}})}
 handsUp(t,20,6);sch(t+tel,()=>{G.shake=Math.max(G.shake,.18);sfx(70,.5,'sawtooth',.06,40)});const L=waves*3.4+tel+9*.32+.8;idleHands(t+L-.3);return L};
MV.fireBomb=t=>{const d=D2(),ph=G.phase,n=4+ph*2;
 for(let i=0;i<n;i++){const tt=t+1+i*.75,h=i%2;sch(tt,()=>{const hd=G.boss.hands[h],px=clamp(P.x+(RND()-.5)*70,AX+24,AX+AW-24),py=clamp(P.y+(RND()-.5)*60,AY+40,AY+AH-16);hd.kick=1;G.arcs.push({x0:hd.x,y0:hd.y,x1:px,y1:py,t0:tt,t1:tt+1.1,h:80,kind:'fire'});zCirc(tt+1.1,px,py,25,{tel:1.1,kind:'pool',dmg:9,dur:4.2});spawnPuff(hd.x,hd.y,4,'#ffb020');sfx(200,.25,'sawtooth',.04,700)})}
 handsUp(t,18,2);const L=1+n*.75+1.5;idleHands(t+L-.3);return L};
MV.trainRun=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.3,d.tel),n=ph>=2?4:ph>=1?3:2,ys=shuffle([AY+40,AY+86,AY+132,AY+178,AY+224]).slice(0,n),len=100;
 ys.forEach((y,i)=>{const t0=t+i*1.0,dir=(i%2)?1:-1,x0=dir>0?AX-len-14:AX+AW+len+14,x1=dir>0?AX+AW+len+14:AX-len-14;mover({kind:'train',x0,y0:y,x1,y1:y,t0:t0+tel,t1:t0+tel+2.4,tp:t0,r:13,len,dmg:20});sch(t0+tel-.5,()=>{sfx(330,.5,'sawtooth',.06,240)});sch(t0+tel,()=>{G.shake=Math.max(G.shake,.12)})});
 const L=tel+n*1.0+2.6;return L};
MV.iceWave=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.05,d.tel*.85),arms=3+ph,cx=HOME.x,cy=HOME.y+2;
 sch(t,()=>{const a0=Math.atan2(P.y-cy,P.x-cx);for(let k=0;k<arms;k++){const a=a0+(k-(arms-1)/2)*(ph>=2?.5:.62);for(let i=0;i<8;i++){const dist=70+i*30,x=cx+Math.cos(a)*dist,y=cy+Math.sin(a)*dist*.9;if(x<AX+12||x>AX+AW-12||y<AY+18||y>AY+AH-8)continue;zCirc(t+tel+i*.22,x,y,15,{tel,kind:'spike',dmg:12,dur:.6})}}});
 handsUp(t,24,-12);const L=tel+8*.22+1;idleHands(t+L-.3);return L};
MV.frostNova=t=>{const d=D2(),ph=G.phase,g0=geo(G.B,HOME.x,HOME.y),cx=HOME.x,cy=g0.coreY,waves=ph>=2?4:ph>=1?3:2,tel=Math.max(1.15,d.tel);
 for(let w=0;w<waves;w++){const t0=t+tel+w*2.4,gapN=ph>=2?2:1,ga=RND()*TAU,gaps=[];for(let k=0;k<gapN;k++)gaps.push([ga+k*TAU/gapN,ph>=2?.42:.52]);ring(cx,cy,26,300,t0,t0+2.4,10,gaps,t0-tel)}
 handsUp(t,30,-40);sch(t,()=>{G.boss.openTw={b0:t,b1:t+1,to:1}});const L=tel+waves*2.4+.6;sch(t+L-.6,()=>{G.boss.openTw={b0:t+L-.6,b1:t+L,to:0}});idleHands(t+L);return L};
MV.droneSwarm=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.15,d.tel),waves=2+ph;
 for(let w=0;w<waves;w++){const t0=t+w*2.2,vert=(w+ph)%2===1,dir=(w%2)?1:-1,N=vert?9:6,span=vert?AW-30:AH-24,gapI=1+Math.floor(RND()*(N-3));
  for(let i=0;i<N;i++){if(i===gapI||i===gapI+1)continue;const f=(i+.5)/N,o=vert?{x0:AX+15+f*span,y0:dir>0?AY-16:AY+AH+16,x1:AX+15+f*span,y1:dir>0?AY+AH+16:AY-16}:{x0:dir>0?AX-16:AX+AW+16,y0:AY+12+f*span,x1:dir>0?AX+AW+16:AX-16,y1:AY+12+f*span};
   mover(Object.assign({kind:'drone',t0:t0+tel,t1:t0+tel+2.6,tp:t0,r:8,dmg:12,formation:{vert,dir}},o));
   if(ph>=1&&i%2===0)sch(t0+tel+1.3,()=>{const px=lerp(o.x0,o.x1,.5),py=lerp(o.y0,o.y1,.5);bul(G.beat,px,py,Math.atan2(P.y-py,P.x-px),60*d.sp,3,7)})}}
 return tel+waves*2.2+2.8};
MV.magnetField=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.15,d.tel),dur=6,g0=geo(G.B,HOME.x,HOME.y);
 sch(t,()=>{G.boss.warn=.5;sfx(120,.6,'sawtooth',.05,60)});G.pull={x:HOME.x,y:g0.coreY,str:54+ph*6,t0:t+tel,t1:t+tel+dur,flip:ph>=1?t+tel+dur/2:null,tp:t};
 for(let i=0;i<8+ph*3;i++){const td=t+tel+.6+i*.55;sch(td-1.5,()=>{const x=clamp(P.x+(RND()-.5)*120,AX+16,AX+AW-16);mover({kind:'scrap',x0:x,y0:AY-14,x1:x,y1:AY+AH+14,t0:td,t1:td+1.5,tp:td-1.5,r:10,dmg:11,spin:RND()*6})})}
 handsUp(t,30,-10);const L=tel+dur+.6;idleHands(t+L);return L};
MV.hourStrike=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.1,d.tel*.85),g0=geo(G.B,HOME.x,HOME.y),cx=HOME.x,cy=g0.coreY,step=ph>=2?.42:ph>=1?.5:.6,laps=ph>=2?2:1;
 for(let l=0;l<laps;l++)for(let i=0;i<12;i++){const a=-Math.PI/2+i*TAU/12,R1=l===0?92:158,x=cx+Math.cos(a)*R1,y=cy+Math.sin(a)*R1*.85;if(x<AX+16||x>AX+AW-16||y<AY+16||y>AY+AH-8)continue;zCirc(t+tel+(l*12+i)*step,x,y,22,{tel,kind:'hour',dmg:13,dur:.45,num:i===0?12:i})}
 G.rotors.push({cx,cy,L:128,arms:1,w:TAU/16,a0:-Math.PI/2,t0:t+tel-.5,t1:t+tel+.7,t2:t+tel+12*step*laps+1,dmg:12});
 return tel+12*step*laps+1.2};
MV.scanCones=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.25,d.tel),n=ph>=2?3:ph>=1?2:1;
 sch(t,()=>{const g=bgeo();G.boss.eyeC={b0:t,b1:t+tel,end:t+tel+2.4};const a0=Math.atan2(P.y-g.headY,P.x-g.x),sgn=RND()<.5?-1:1;for(let k=0;k<n;k++){const off=(k-(n-1)/2)*(ph>=2?1.15:1.5);cone({x:g.x,y:g.headY,a0:a0+off-sgn*.55,da:sgn*1.1,half:.2,len:330,t0:t,t1:t+tel,t2:t+tel+1.8})}});
 return tel+2.6};
MV.prism=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.3,d.tel),rounds=ph>=2?3:ph>=1?2:1;
 for(let r=0;r<rounds;r++){const t0=t+r*3.2;sch(t0,()=>{const T={x:clamp(P.x,AX+30,AX+AW-30),y:clamp(P.y,AY+30,AY+AH-20)};[[AX+6,AY+6],[AX+AW-6,AY+6],[AX+6,AY+AH-6],[AX+AW-6,AY+AH-6]].slice(0,ph>=1?4:3).forEach(([x,y])=>beam(t0+tel,x,y,Math.atan2(T.y-y,T.x-x),9,tel,.9,0,false))})}
 return tel+rounds*3.2};
MV.beatCollapse=t=>{const d=D2(),ph=G.phase,g0=geo(G.B,HOME.x,HOME.y),cx=HOME.x,cy=g0.coreY,N=8,tel=1.5;
 for(let i=0;i<N;i++){const tb=t+tel+i,ga=i*.6+RND()*.2,gaps=[[ga,.5]];if(ph>=2)gaps.push([ga+Math.PI,.42]);ring(cx,cy,26,290,tb,tb+2.2,9,gaps,tb-tel)}
 for(let i=0;i<N*2;i++){const tb=t+tel+i*.5;sch(tb,()=>{for(let a=0;a<3;a++)bul(tb,cx,cy,i*.45+a*TAU/3,42*d.sp,3,6)})}
 handsUp(t,34,-44);sch(t,()=>{G.boss.openTw={b0:t,b1:t+1.2,to:1}});const L=tel+N+2.4;sch(t+L-.8,()=>{G.boss.openTw={b0:t+L-.8,b1:t+L,to:0}});idleHands(t+L);return L};
/* ================= 챕터 2 시그니처 패턴 (괴물) ================= */
MV.rootBurst=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.15,d.tel),n=6+ph*3;
 for(let i=0;i<n;i++){const tt=t+i*.5,x=clamp(P.x+(RND()-.5)*160,AX+20,AX+AW-20),y=clamp(P.y+(RND()-.5)*100,AY+30,AY+AH-14);zCirc(tt+tel,x,y,18,{tel,kind:'spike',dmg:12,dur:.5})}
 handsUp(t,22,0);const L=tel+n*.5+.8;idleHands(t+L-.3);return L};
MV.sporeBloom=t=>{const d=D2(),ph=G.phase,waves=ph>=2?3:ph>=1?2:1,tel=Math.max(1.15,d.tel);
 for(let w=0;w<waves;w++){const t0=t+w*2.6;sch(t0,()=>{for(let i=0;i<3+ph;i++){const x=clamp(P.x+(RND()-.5)*140,AX+24,AX+AW-24),y=clamp(P.y+(RND()-.5)*90,AY+34,AY+AH-16);zCirc(t0+tel+i*.3,x,y,26,{tel,kind:'pool',dmg:9,dur:3.4})}})}
 handsUp(t,18,4);const L=waves*2.6+tel+2.4;idleHands(t+L-.3);return L};
MV.mireGrasp=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.15,d.tel),n=4+ph*2;
 for(let i=0;i<n;i++){const tt=t+i*.85,x=clamp(P.x+(RND()-.5)*130,AX+20,AX+AW-20);mover({kind:'scrap',x0:x,y0:AY+AH+20,x1:x,y1:AY+20,t0:tt+tel,t1:tt+tel+1.3,tp:tt,r:14,dmg:14,spin:i})}
 handsUp(t,26,10);const L=tel+n*.85+1.6;idleHands(t+L-.3);return L};
MV.boneHowl=t=>{const d=D2(),ph=G.phase,g0=geo(G.B,HOME.x,HOME.y),cx=HOME.x,cy=g0.coreY,tel=Math.max(1.15,d.tel);
 ring(cx,cy,20,260,t+tel,t+tel+1.8,10,null,t);
 sch(t+tel,()=>{for(let i=0;i<8+ph*3;i++)bul(G.beat,cx,cy,i*TAU/(8+ph*3),46*d.sp,3,7)});
 handsUp(t,20,-10);const L=tel+2.2;idleHands(t+L-.3);return L};
MV.webCage=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.3,d.tel),rounds=ph>=2?3:ph>=1?2:1;
 for(let r=0;r<rounds;r++){const t0=t+r*3.0;sch(t0,()=>{const T={x:clamp(P.x,AX+30,AX+AW-30),y:clamp(P.y,AY+30,AY+AH-20)};[[AX+6,AY+6],[AX+AW-6,AY+6],[AX+6,AY+AH-6],[AX+AW-6,AY+AH-6]].forEach(([x,y])=>beam(t0+tel,x,y,Math.atan2(T.y-y,T.x-x),8,tel,1.1,0,false))})}
 return tel+rounds*3.0+1};
MV.stingSwarm=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.05,d.tel*.9),waves=3+ph;
 for(let w=0;w<waves;w++){const t0=t+w*1.7,vert=(w+ph)%2===1,dir=(w%2)?1:-1,N=vert?8:7,span=vert?AW-30:AH-24,gapI=1+Math.floor(RND()*(N-3));
  for(let i=0;i<N;i++){if(i===gapI)continue;const f=(i+.5)/N,o=vert?{x0:AX+15+f*span,y0:dir>0?AY-16:AY+AH+16,x1:AX+15+f*span,y1:dir>0?AY+AH+16:AY-16}:{x0:dir>0?AX-16:AX+AW+16,y0:AY+12+f*span,x1:dir>0?AX+AW+16:AX-16,y1:AY+12+f*span};
   mover(Object.assign({kind:'hornet',t0:t0+tel,t1:t0+tel+2.0,tp:t0,r:7,dmg:11,formation:{vert,dir}},o))}}
 return tel+waves*1.7+2.2};
MV.shardStorm=t=>{const d=D2(),ph=G.phase,g0=geo(G.B,HOME.x,HOME.y),cx=g0.x,cy=g0.coreY,tel=Math.max(1.15,d.tel);
 G.rotors.push({cx,cy,L:120,arms:2+ph,w:TAU/14,a0:0,t0:t+tel-.4,t1:t+tel+.6,t2:t+tel+6,dmg:12});
 sch(t,()=>{G.boss.eyeC={b0:t,b1:t+tel,end:t+tel+2}});
 handsUp(t,24,-16);const L=tel+6.4;idleHands(t+L-.3);return L};
MV.tideCrush=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.3,d.tel),waves=ph>=2?3:ph>=1?2:1;
 for(let w=0;w<waves;w++){const t0=t+w*3.6,dir=RND()<.5?1:-1,N=10;for(let i=0;i<N;i++){const f=i/(N-1),td=t0+tel+i*.3,x=dir>0?AX+20+f*(AW-40):AX+AW-20-f*(AW-40),y=clamp(P.y+(RND()-.5)*40,AY+40,AY+AH-16);zCirc(td,x,y,24,{tel,kind:'geyser',dmg:13,dur:.8})}}
 handsUp(t,22,8);const L=waves*3.6+tel+3+.8;idleHands(t+L-.3);return L};
MV.emberWail=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.25,d.tel);
 sch(t,()=>{const g=bgeo();G.boss.eyeC={b0:t,b1:t+tel,end:t+tel+2.2};const a0=Math.atan2(P.y-g.headY,P.x-g.x);cone({x:g.x,y:g.headY,a0:a0-.5,da:1,half:.22,len:320,t0:t,t1:t+tel,t2:t+tel+2})});
 for(let i=0;i<3+ph;i++){const tt=t+tel+.6+i*.5,x=clamp(P.x+(RND()-.5)*100,AX+24,AX+AW-24),y=clamp(P.y+(RND()-.5)*70,AY+34,AY+AH-16);zCirc(tt,x,y,20,{tel:.4,kind:'pool',dmg:8,dur:2.2})}
 return tel+2.6+(3+ph)*.5};
MV.voidHunger=t=>{const d=D2(),ph=G.phase,g0=geo(G.B,HOME.x,HOME.y),cx=HOME.x,cy=g0.coreY,N=8,tel=1.6;
 for(let i=0;i<N;i++){const tb=t+tel+i*1.05,ga=i*.7+RND()*.2,gaps=[[ga,.48]];if(ph>=2)gaps.push([ga+Math.PI,.4]);ring(cx,cy,24,300,tb,tb+2.3,10,gaps,tb-tel)}
 for(let i=0;i<N;i++){const tb=t+tel+.5+i*1.05;sch(tb,()=>{for(let a=0;a<3;a++)bul(tb,cx,cy,i*.6+a*TAU/3,40*d.sp,3,6)})}
 for(let i=0;i<2+ph;i++){const tt=t+tel+i*1.4,x=clamp(P.x+(RND()-.5)*160,AX+20,AX+AW-20);mover({kind:'scrap',x0:x,y0:AY+AH+20,x1:x,y1:AY+20,t0:tt+.3,t1:tt+1.6,tp:tt,r:15,dmg:15,spin:i})}
 handsUp(t,32,-40);sch(t,()=>{G.boss.openTw={b0:t,b1:t+1.2,to:1}});const L=tel+N*1.05+2.6;sch(t+L-.8,()=>{G.boss.openTw={b0:t+L-.8,b1:t+L,to:0}});idleHands(t+L);return L};
/* 챕터 2 전용 패턴 — 챕터 1 패턴을 재사용하지 않는 독자 구현 */
MV.clawSlam=t=>{const d=D2(),tel=Math.max(1.0,d.tel*.8),g0=geo(G.B,HOME.x,HOME.y),passes=2+Math.floor(G.phase);
 for(let p=0;p<passes;p++){const h=p%2,t0=t+p*2.0,side=h?1:-1,y=AY+60+(p%3)*50,steps=6;
  tweenHand(h,g0.sh[h][0]+side*22,g0.top-16,t0,t0+.5);
  for(let i=0;i<steps;i++){const x=side>0?AX+30+i*(AW-60)/(steps-1):AX+AW-30-i*(AW-60)/(steps-1);zCirc(t0+.6+tel+i*.12,x,y+((i%2)-.5)*14,20,{tel,kind:'spike',dmg:11,dur:.3})}
  sch(t0+.6,()=>{sfx(140,.2,'square',.05,80)})}
 idleHands(t+passes*2.0+tel+1);return passes*2.0+tel+1.4};
MV.pounce=t=>{const tgt={x:HOME.x,y:HOME.y};
 sch(t,()=>{G.boss.warn=1});
 sch(t+.3,()=>{tgt.x=clamp(P.x,AX+30,AX+AW-30);tgt.y=clamp(P.y,AY+40,AY+AH-16)});
 sch(t+1.2,()=>{tweenBossNow(tgt.x,tgt.y-40,t+1.2,t+2.0,p=>Math.sin(p*Math.PI/2))});
 sch(t+2.0,()=>{tweenBossNow(tgt.x,tgt.y,t+2.0,t+2.35,p=>p*p);G.boss.warn=0});
 sch(t+2.35,()=>{G.shake=.5;sfx(70,.35,'square',.08,40);spawnPuff(tgt.x,tgt.y,12,'#8a969c');zCirc(t+2.55,tgt.x,tgt.y,34,{tel:.01,dmg:18,dur:.3})});
 sch(t+3.0,()=>{tweenBossNow(HOME.x,HOME.y,t+3.0,t+3.8)});
 return 4.2};
MV.thornSeed=t=>{const d=D2(),g0=geo(G.B,HOME.x,HOME.y),n=6+G.phase*2,tel=Math.max(1.0,d.tel*.9),dir=RND()<.5?1:-1;
 for(const i of [0,1])tweenHand(i,g0.sh[i][0]+(i?18:-18),g0.top+6,t,t+.6);
 for(let i=0;i<n;i++){const f=i/(n-1),x=dir>0?AX+24+f*(AW-48):AX+AW-24-f*(AW-48),t0=t+.8+i*.25;zCirc(t0+tel,x,AY+70+((i%3)*50),16,{tel,kind:'spike',dmg:10,dur:2.2})}
 idleHands(t+.8+n*.25+tel);return .8+n*.25+tel+.6};
MV.tailSpin=t=>{const ph=G.phase,g0=geo(G.B,HOME.x,HOME.y),cx=HOME.x,cy=g0.coreY||HOME.y,a0=RND()*TAU,dir=RND()<.5?1:-1,sweeps=1+Math.floor(ph);
 tweenHand(0,cx+Math.cos(a0)*80,cy+Math.sin(a0)*80,t,t+.8);
 sch(t,()=>{G.boss.warn=.5});
 for(let s=0;s<sweeps;s++){const t0=t+.8+s*2.6;G.rotors.push({cx,cy,L:90,arms:1,w:dir*Math.PI/1.1,a0:a0+(s%2?Math.PI:0),t0,t1:t0+.3,t2:t0+2.2,dmg:14})}
 const L=.8+sweeps*2.6+.4;sch(t+L-.3,()=>{G.boss.warn=0});idleHands(t+L);return L};
MV.sporeShot=t=>{const d=D2(),ph=G.phase,n=5+ph*2;
 sch(t,()=>{G.boss.eyeC={b0:t,b1:t+.6,end:t+.6+n*.3}});
 for(let i=0;i<n;i++){const t0=t+.8+i*.3;sch(t0,()=>{const gg=bgeo(),a=Math.atan2(P.y-gg.headY,P.x-gg.x)+(RND()-.5)*.5;bul(t0,gg.x,gg.headY,a,60*d.sp,4,8);sfx(240,.08,'sine',.03,90)})}
 return .8+n*.3+.6};
MV.mireRoot=t=>{const d=D2(),ph=G.phase,x=clamp(P.x,AX+40,AX+AW-40),y=clamp(P.y,AY+50,AY+AH-20),tel=Math.max(1.0,d.tel*.9);
 zCirc(t+tel,x,y,20,{tel,kind:'pool',dmg:9,dur:3.6});
 sch(t+tel+.5,()=>{zCirc(t+tel+1.7,x,y,34,{tel:1.2,kind:'pool',dmg:10,dur:1.6})});
 if(ph>=1)sch(t+tel+1.2,()=>{zCirc(t+tel+2.4,x,y,48,{tel:1.2,kind:'pool',dmg:11,dur:1.4})});
 return tel+3.6};
MV.gazePollen=t=>{const tel=1.3;
 sch(t,()=>{const g=bgeo(),a0=Math.atan2(P.y-g.headY,P.x-g.x);cone({x:g.x,y:g.headY,a0,da:0,half:.35,len:260,t0:t,t1:t+tel,t2:t+tel+2.4})});
 return tel+2.6};
MV.sporeNova=t=>{const ph=G.phase,g=bgeo(),cx=HOME.x,cy=g.coreY,waves=2+ph,tel=1.0;
 for(const i of [0,1])tweenHand(i,g.sh[i][0],cy-20,t,t+.6);
 for(let w=0;w<waves;w++){const t0=t+.8+w*1.3,n=10+ph*3;sch(t0+tel,()=>{sfx(220,.3,'sine',.04,600);for(let k=0;k<n;k++){const a=RND()*TAU,sp=(30+RND()*40)*D2().sp;bul(t0+tel,cx,cy,a,sp,3,7)}})}
 return .8+waves*1.3+tel+.6};
MV.tentacleWhip=t=>{const g0=geo(G.B,HOME.x,HOME.y),hits=2+G.phase;
 for(let i=0;i<hits;i++){const h=i%2,t0=t+i*1.3,tx=clamp(P.x+(RND()-.5)*30,AX+20,AX+AW-20),ty=clamp(P.y+(RND()-.5)*30,AY+30,AY+AH-14);
  tweenHand(h,g0.sh[h][0],g0.top-20,t0,t0+.35);tweenHand(h,tx,ty-10,t0+.35,t0+.62,p=>p*p);
  sch(t0+.62,()=>{zCirc(t0+.9,tx,ty,20,{tel:.28,dmg:13,dur:.2});sfx(120,.15,'square',.05,70)});
  sch(t0+1.0,()=>tweenHand(h,g0.sh[h][0],g0.top,t0+1.0,t0+1.25))}
 idleHands(t+hits*1.3+.3);return hits*1.3+.6};
MV.bileSpit=t=>{const n=3+G.phase,g0=geo(G.B,HOME.x,HOME.y);
 for(let i=0;i<n;i++){const t0=t+i*1.1,tx=clamp(P.x+(RND()-.5)*80,AX+24,AX+AW-24),ty=clamp(P.y+(RND()-.5)*60,AY+34,AY+AH-16);
  sch(t0,()=>{G.rockets.push({x:g0.sh[0][0],y:g0.top,t0,t1:t0+1.1});sfx(200,.16,'sawtooth',.04,300)});
  zCirc(t0+1.1,tx,ty,22,{tel:1.1,dmg:12,dur:.5})}
 return n*1.1+1.4};
MV.sludgePool=t=>{const d=D2(),ph=G.phase,n=3+ph,tel=Math.max(1.0,d.tel*.9);
 for(let i=0;i<n;i++){const x=clamp(P.x+(RND()-.5)*120,AX+30,AX+AW-30),y=clamp(P.y+(RND()-.5)*90,AY+40,AY+AH-18),t0=t+i*.5;zCirc(t0+tel,x,y,24,{tel,kind:'pool',dmg:8,dur:3.0})}
 return n*.5+tel+3.0};
MV.fangLunge=t=>{const hits=2;
 for(let i=0;i<hits;i++){const t0=t+i*1.8;
  sch(t0,()=>{G.boss.warn=1});
  sch(t0+.5,()=>{const b=G.boss,tx=clamp(P.x,AX+30,AX+AW-30),ty=clamp(P.y,AY+40,AY+AH-16);tweenBossNow(tx,ty,t0+.5,t0+.85,p=>p*p);b.dash=true;b.dashHit=false});
  sch(t0+.85,()=>{G.boss.dash=false;G.shake=.35;sfx(90,.25,'square',.07,40);spawnPuff(G.boss.x,G.boss.y,8,'#8a969c')});
  sch(t0+1.3,()=>{tweenBossNow(HOME.x,HOME.y,t0+1.3,t0+1.7)})}
 return hits*1.8+.6};
MV.boneShard=t=>{const d=D2(),n=3+G.phase,g0=geo(G.B,HOME.x,HOME.y);
 for(let i=0;i<n;i++){const h=i%2,t0=t+i*.9;tweenHand(h,g0.sh[h][0]+(h?14:-14),g0.top-10,t0,t0+.4);
  sch(t0+.55,()=>{const hd=G.boss.hands[h],a=Math.atan2(P.y-hd.y,P.x-hd.x);hd.kick=1;bul(t0+.55,hd.x,hd.y,a,95*d.sp,3,9);sfx(280,.08,'square',.03,100)})}
 idleHands(t+n*.9+.5);return n*.9+.8};
MV.howlSpin=t=>{const ph=G.phase,g0=geo(G.B,HOME.x,HOME.y),cx=HOME.x,cy=g0.coreY||HOME.y,bursts=2+Math.floor(ph);
 sch(t,()=>{ring(cx,cy,20,240,t+1,t+1.8,10,null,t)});
 for(let b=0;b<bursts;b++){const t0=t+1.9+b*1.6,dir=b%2?1:-1;G.rotors.push({cx,cy,L:80,arms:2,w:dir*TAU/.9,a0:RND()*TAU,t0,t1:t0+.15,t2:t0+.9,dmg:12})}
 idleHands(t+1.9+bursts*1.6);return 1.9+bursts*1.6+.4};
MV.fangBite=t=>{
 sch(t,()=>{G.boss.warn=1;tweenBossNow(clamp(P.x,AX+40,AX+AW-40),G.boss.y,t,t+1.1)});
 sch(t+1.1,()=>{const b=G.boss;zCirc(t+1.7,b.x,b.y+6,30,{tel:.6,dmg:15,dur:.3});G.boss.warn=0});
 sch(t+2.2,()=>tweenBossNow(HOME.x,HOME.y,t+2.2,t+2.8));
 return 3.2};
MV.silkShot=t=>{const tel=1.1,tgt={x:HOME.x,y:HOME.y};
 sch(t,()=>{tgt.x=clamp(P.x,AX+40,AX+AW-40);tgt.y=clamp(P.y,AY+40,AY+AH-20)});
 sch(t+.3,()=>{[[AX+4,tgt.y],[AX+AW-4,tgt.y],[tgt.x,AY+4],[tgt.x,AY+AH-4]].forEach(([x,y])=>beam(t+.3+tel,x,y,Math.atan2(tgt.y-y,tgt.x-x),9,tel,.6,0,false))});
 return .3+tel+.9};
MV.eggBurst=t=>{const d=D2(),ph=G.phase,pts=2+ph,tel=1.6;
 for(let i=0;i<pts;i++){const x=clamp(P.x+(RND()-.5)*140,AX+30,AX+AW-30),y=clamp(P.y+(RND()-.5)*90,AY+40,AY+AH-16),t0=t+i*1.3;
  sch(t0+tel,()=>{sfx(260,.2,'square',.04,300);for(let k=0;k<8;k++)bul(t0+tel,x,y,k*TAU/8,50*d.sp,3,8)})}
 return pts*1.3+tel+.4};
MV.stinger=t=>{const d=D2(),n=2+G.phase,g0=geo(G.B,HOME.x,HOME.y);
 for(let i=0;i<n;i++){const h=i%2,t0=t+i*1.5;tweenHand(h,g0.sh[h][0]+(h?30:-30),g0.top-10,t0,t0+.6);
  sch(t0+.9,()=>{const hd=G.boss.hands[h],a=Math.atan2(P.y-hd.y,P.x-hd.x);hd.kick=1;for(let k=0;k<3;k++)bul(t0+.9+k*.08,hd.x,hd.y,a,120*d.sp,3,7);sfx(320,.1,'sawtooth',.03,140)})}
 idleHands(t+n*1.5+.6);return n*1.5+1};
MV.hiveMines=t=>{const d=D2(),ph=G.phase,g0=geo(G.B,HOME.x,HOME.y),cx=clamp(P.x,AX+50,AX+AW-50),cy=clamp(P.y,AY+60,AY+AH-30),n=5+ph,tel=Math.max(1.0,d.tel*.9);
 for(const i of [0,1])tweenHand(i,g0.sh[i][0]+(i?20:-20),g0.top+10,t,t+.6);
 for(let i=0;i<n;i++){const a=i*TAU/n,x=cx+Math.cos(a)*46,y=cy+Math.sin(a)*36,t0=t+.6+i*.2;zCirc(t0+tel,x,y,18,{tel,dmg:11,dur:.3})}
 idleHands(t+.6+n*.2+tel);return .6+n*.2+tel+.6};
MV.hiveTurret=t=>{const d=D2(),g0=geo(G.B,HOME.x,HOME.y),pts=[[AX+50,AY+50],[AX+AW-50,AY+50]];
 for(const i of [0,1])tweenHand(i,g0.sh[i][0]+(i?18:-18),g0.top-12,t,t+.6);
 G.tb={n:pts.length,dead:0};pts.forEach((p,i)=>{const t0=t+.6+i*.3;sch(t0,()=>{const hd=G.boss.hands[i];hd.kick=1;G.arcs.push({x0:hd.x,y0:hd.y,x1:p[0],y1:p[1],t0,t1:t0+.7,h:40,kind:'turret'})});
  const td=t0+.7+1;sch(td,()=>{const tr={x:p[0],y:p[1],t0:td,t1:td+3.2,alive:true,aimAng:Math.PI/2,warn0:-1,fireAt:-1};G.turrets.push(tr);
   for(let k=0;k<2;k++){const fire=td+.8+k*1.0,warn=fire-.4;sch(warn,()=>{if(tr.alive){tr.aimAng=Math.atan2(P.y-tr.y,P.x-tr.x);tr.warn0=warn;tr.fireAt=fire}});
    sch(fire,()=>{if(tr.alive)bul(fire,tr.x,tr.y-6,tr.aimAng,66*d.sp,3,7)})}
   sch(td+3.2,()=>{tr.alive=false;if(G.turrets.every(x=>!x.alive))G.tb=null})})});
 idleHands(t+.6+pts.length*.3+2);return .6+pts.length*.3+5.6};
MV.shardThrow=t=>{const d=D2(),n=2+G.phase,g0=geo(G.B,HOME.x,HOME.y);
 for(let i=0;i<n;i++){const h=i%2,t0=t+i*1.2;tweenHand(h,g0.sh[h][0]+(h?16:-16),g0.top-14,t0,t0+.5);
  sch(t0+.7,()=>{const hd=G.boss.hands[h],a0=Math.atan2(P.y-hd.y,P.x-hd.x);hd.kick=1;for(const da of [-.2,0,.2])bul(t0+.7,hd.x,hd.y,a0+da,90*d.sp,3,8);sfx(300,.08,'square',.03,110)})}
 idleHands(t+n*1.2+.5);return n*1.2+.9};
MV.prismSpike=t=>{const d=D2(),ph=G.phase,cx=clamp(P.x,AX+40,AX+AW-40),cy=clamp(P.y,AY+50,AY+AH-20),rings=2+ph,tel=Math.max(1.0,d.tel*.9);
 sch(t,()=>{G.boss.eyeC={b0:t,b1:t+.6,end:t+.6+rings*1.0}});
 for(let r=0;r<rings;r++){const t0=t+.6+r*1.0,n=6+r*3,rad=30+r*30;for(let k=0;k<n;k++){const a=k*TAU/n;zCirc(t0+tel,cx+Math.cos(a)*rad,cy+Math.sin(a)*rad,14,{tel,kind:'spike',dmg:10,dur:.3})}}
 return .6+rings*1.0+tel+.4};
MV.mawBite=t=>{
 sch(t,()=>{G.boss.warn=1});
 sch(t+1.4,()=>{const tx=clamp(P.x,AX+40,AX+AW-40),ty=clamp(P.y,AY+50,AY+AH-16);G.flash=Math.max(G.flash,.3);tweenBossNow(tx,ty,t+1.4,t+1.45);G.boss.warn=0});
 sch(t+1.45,()=>{const b=G.boss;zCirc(t+1.85,b.x,b.y+4,32,{tel:.35,dmg:17,dur:.3});G.shake=.4;sfx(80,.3,'square',.08,35)});
 sch(t+2.4,()=>tweenBossNow(HOME.x,HOME.y,t+2.4,t+3.0));
 return 3.4};
MV.undertow=t=>{const ph=G.phase,g0=geo(G.B,HOME.x,HOME.y),dur=4+ph,tel=1.2;
 sch(t,()=>{G.boss.warn=.5});
 sch(t+tel,()=>{G.pull={x:HOME.x,y:g0.coreY||HOME.y,str:60+ph*8,t0:t+tel,t1:t+tel+dur,flip:t+tel+dur*.6,tp:t};G.boss.warn=0;sfx(100,.5,'sine',.05,80)});
 sch(t+tel+dur,()=>{const d=D2();for(let k=0;k<8;k++)bul(t+tel+dur,HOME.x,g0.coreY||HOME.y,k*TAU/8,46*d.sp,3,7)});
 return tel+dur+.6};
MV.sprayBile=t=>{const ph=G.phase,dur=3+ph,dir=RND()<.5?1:-1;
 sch(t,()=>{const g=bgeo(),a0=Math.atan2(P.y-g.headY,P.x-g.x);cone({x:g.x,y:g.headY,a0:a0-.6,da:1.2*dir,half:.2,len:280,t0:t,t1:t+1,t2:t+1+dur})});
 return 1+dur+.6};
MV.wailCone=t=>{const tel=1.3,dir=RND()<.5?1:-1;
 sch(t,()=>{const g=bgeo();cone({x:g.x,y:g.headY,a0:0,da:dir*1.4,half:.16,len:300,t0:t,t1:t+tel,t2:t+tel+2.2});cone({x:g.x,y:g.headY,a0:Math.PI,da:-dir*1.4,half:.16,len:300,t0:t,t1:t+tel,t2:t+tel+2.2})});
 return tel+2.4};
MV.ashDrift=t=>{const ph=G.phase,n=6+ph*2,dir=RND()<.5?1:-1,y0=AY+70+RND()*(AH-140);
 for(let i=0;i<n;i++){const f=i/(n-1),x=dir>0?AX+20+f*(AW-40):AX+AW-20-f*(AW-40),y=y0+Math.sin(f*TAU)*40,t0=t+i*.22;zCirc(t0+1.0,x,y,20,{tel:1.0,kind:'pool',dmg:9,dur:.6})}
 return n*.22+1.4};
MV.doomBite=t=>{const ph=G.phase;
 sch(t,()=>{G.boss.warn=1;G.boss.openTw={b0:t,b1:t+2.2,to:1}});
 sch(t+2.2,()=>{const b=G.boss;G.flash=Math.max(G.flash,.4);G.shake=.7;sfx(50,.8,'sawtooth',.1,25);zCirc(t+2.6,b.x,b.y+4,50+ph*10,{tel:.35,dmg:22,dur:.4});G.boss.warn=0;G.boss.openTw={b0:t+2.6,b1:t+3.2,to:0}});
 return 3.6};
/* 챕터 2 전용 — 챕터 1과 직접 공유하던 지진/광선/폭발/링 패턴도 독자 구현으로 교체 */
MV.tremor=t=>{const d=D2(),ph=G.phase,g0=geo(G.B,HOME.x,HOME.y),cx=HOME.x,cy=HOME.y-4,tel=Math.max(1.05,d.tel*.85),rings=2+ph;
 for(const i of [0,1])tweenHand(i,g0.sh[i][0]+(i?18:-18),g0.top-30,t,t+1);
 for(let r=0;r<rings;r++){const t0=t+1+r*1.3,rad=40+r*46,pts=8+r*2;sch(t0,()=>{G.boss.warn=.5});for(let k=0;k<pts;k++){const a=k*TAU/pts;zCirc(t0+tel,cx+Math.cos(a)*rad,cy+Math.sin(a)*rad*.7,18,{tel,kind:'spike',dmg:12,dur:.3})}}
 sch(t+1+(rings-1)*1.3+tel+.3,()=>{G.shake=.5;sfx(55,.6,'square',.09,30);G.boss.warn=0});
 idleHands(t+1+rings*1.3+tel+.6);return 1+rings*1.3+tel+1};
MV.gazeBeam=t=>{const ph=G.phase,dur=4+ph*1.5,dir=RND()<.5?1:-1;
 sch(t,()=>{G.boss.eyeC={b0:t,b1:t+.8,end:t+dur+.8}});
 sch(t+.8,()=>{const g=bgeo();beam(t+.8,g.x,g.headY,0,13,0,dur,dir*TAU/dur,ph>=2)});
 return .8+dur+.6};
MV.novaBloom=t=>{const ph=G.phase,g0=geo(G.B,HOME.x,HOME.y),cx=HOME.x,cy=g0.coreY||HOME.y,waves=2+ph,tel=1.3;
 for(const i of [0,1])tweenHand(i,g0.sh[i][0]+(i?26:-26),g0.top-28,t,t+.8);
 sch(t,()=>{G.boss.openTw={b0:t,b1:t+1,to:1}});
 for(let w=0;w<waves;w++){const t0=t+1+w*1.8;sch(t0,()=>{ring(cx,cy,10,260,t0+tel,t0+tel+1.3,11,null,t0)})}
 const L=1+waves*1.8+tel+1;sch(t+L-.6,()=>{G.boss.openTw={b0:t+L-.6,b1:t+L,to:0}});idleHands(t+L);return L};
MV.convergeRing=t=>{const ph=G.phase,cx=HOME.x,cy=HOME.y-10,n=10+ph*3,tel=1.2;
 sch(t,()=>{G.boss.warn=.4});
 sch(t+tel,()=>{const d=D2();for(let i=0;i<n;i++){const a=i*TAU/n,r=220;bul(t+tel,cx+Math.cos(a)*r,cy+Math.sin(a)*r*.7,a+Math.PI,70*d.sp,3,9)}G.boss.warn=0});
 return tel+2.2};
const EST2={rootBurst:11,clawSlam:8,pounce:9,thornSeed:8,tailSpin:11,sporeBloom:9,sporeShot:10,mireRoot:8,gazePollen:7,sporeNova:10,mireGrasp:11,tentacleWhip:8,bileSpit:9,sludgePool:8,boneHowl:9,fangLunge:9,boneShard:8,howlSpin:11,webCage:9,fangBite:8,silkShot:6,eggBurst:10,stingSwarm:11,stinger:10,hiveMines:8,hiveTurret:11,shardStorm:11,shardThrow:8,prismSpike:11,tideCrush:10,mawBite:9,undertow:8,sprayBile:9,emberWail:8,wailCone:8,ashDrift:8,voidHunger:13,doomBite:9,tremor:9,gazeBeam:7,novaBloom:10,convergeRing:6};
const CHAN2={rootBurst:'field',clawSlam:'hands',pounce:'all',thornSeed:'hands',tailSpin:'all',sporeBloom:'field',sporeShot:'hands',mireRoot:'hands',gazePollen:'head',sporeNova:'all',mireGrasp:'field',tentacleWhip:'hands',bileSpit:'hands',sludgePool:'hands',boneHowl:'field',fangLunge:'all',boneShard:'hands',howlSpin:'all',webCage:'field',fangBite:'hands',silkShot:'field',eggBurst:'hands',stingSwarm:'field',stinger:'hands',hiveMines:'hands',hiveTurret:'hands',shardStorm:'all',shardThrow:'hands',prismSpike:'head',tideCrush:'field',mawBite:'all',undertow:'hands',sprayBile:'hands',emberWail:'head',wailCone:'head',ashDrift:'hands',voidHunger:'all',doomBite:'all',tremor:'hands',gazeBeam:'head',novaBloom:'all',convergeRing:'all'};
Object.assign(EST,EST2);Object.assign(CHAN,CHAN2);
const SIGNAME2={rootBurst:'뿌리 분출',clawSlam:'발톱 강타',pounce:'덮치기',thornSeed:'가시씨 투척',tailSpin:'꼬리 휩쓸기',sporeBloom:'포자 만개',sporeShot:'포자 발사',mireRoot:'균사 함정',gazePollen:'최면 꽃가루',sporeNova:'포자 폭발',mireGrasp:'늪의 손아귀',tentacleWhip:'촉수 채찍',bileSpit:'독액 분사',sludgePool:'수렁 웅덩이',boneHowl:'백골의 포효',fangLunge:'송곳니 돌진',boneShard:'뼛조각 투척',howlSpin:'회전 강타',webCage:'거미줄 감옥',fangBite:'물어뜯기',silkShot:'실 가닥 발사',eggBurst:'알 부화',stingSwarm:'벌떼 습격',stinger:'독침 발사',hiveMines:'벌집 폭탄',hiveTurret:'수비 벌집',shardStorm:'수정 폭풍',shardThrow:'수정 파편 투척',prismSpike:'프리즘 가시',tideCrush:'해일 압박',mawBite:'아가리 강타',undertow:'역류',sprayBile:'점액 난사',emberWail:'잿빛 통곡',wailCone:'통곡의 시선',ashDrift:'잿가루 유영',voidHunger:'공허의 굶주림',doomBite:'파멸의 한입',tremor:'땅울림',gazeBeam:'응시의 빛',novaBloom:'만개 파동',convergeRing:'수렴의 고리'};
Object.assign(SIGNAME,SIGNAME2);Object.assign(ATK_NAME,SIGNAME2);
/*CH2MOVES_BEGIN*/
/* ===== 챕터 2: 괴수의 생김새에서 나오는 패턴 (입·눈·뿌리·꼬리·침에서 발사) ===== */
const ANAT={10:{mouth:[0,-8.5],eye:[0,-15],brL:[-10,-25],brR:[10,-26],feet:[0,-1]},
 11:{eye:[0,-20],cap:[0,-24],capL:[-10,-18],capR:[10,-18],mouth:[0,-9],feet:[0,-2]},
 12:{mouth:[0,-9],lure:[2,-23],eye:[0,-16],feet:[0,-1]},
 13:{mouth:[0,-14],eye:[0,-20],ribs:[0,-11],tail:[13,-16],feet:[0,-1]},
 14:{mouth:[0,-14],eye:[0,-18],abdomen:[0,-5],feet:[0,-1]},
 15:{mouth:[0,-13],eye:[0,-16],sting:[0,1],feet:[0,0]},
 16:{crystal:[7,-26],crystalL:[-9,-16],eye:[1,-16],mouth:[0,-5.5],feet:[0,-1]},
 17:{mouth:[0,-11],lure:[-3,-28],eye:[0,-19],feet:[0,-2]},
 18:{eye:[0,-18.5],mouth:[0,-17.5],chest:[0,-11],feet:[0,-2]},
 19:{eye:[0,-11.5],mouthL:[-7,-9],mouthR:[7,-9],mouth:[0,-5],top:[0,-19],feet:[0,-1]}};
const EYES16=[[-5,-8],[5,-7],[-3,-13],[7,-13],[-8,-11],[1,-16]];
function AN(part){const g=bgeo(),a=(ANAT[G.bi]||{})[part]||[0,(g.coreY-g.y)/U];return [g.x+a[0]*U,g.y+a[1]*U]}
function mouthOpen(t0,t1){sch(t0,()=>{G.boss.openTw={b0:t0,b1:t0+.35,to:1}});sch(t1,()=>{G.boss.openTw={b0:t1,b1:t1+.4,to:0}})}
function eyeCharge(t0,tel,hold){sch(t0,()=>{G.boss.eyeC={b0:t0,b1:t0+tel,end:t0+tel+hold}})}
const inA=(x,y,mx,my)=>[clamp(x,AX+(mx||24),AX+AW-(mx||24)),clamp(y,AY+(my||34),AY+AH-16)];

/* ── 10 뿌리아귀 ── */
MV.rootLine=t=>{const d=D2(),ph=G.phase,lines=1+ph,tel=Math.max(1,d.tel*.85);
 sch(t,()=>{G.boss.warn=.6});handsUp(t,20,14);
 for(let l=0;l<lines;l++){const t0=t+.6+l*1.4;sch(t0,()=>{const [fx,fy]=AN('feet'),ang=Math.atan2(P.y-fy,P.x-fx)+(l===0?0:(l%2?.38:-.38));sfx(90,.35,'square',.05,50);
  for(let i=0;i<10;i++){const r=24+i*24,x=fx+Math.cos(ang)*r,y=fy+Math.sin(ang)*r;if(x<AX+8||x>AX+AW-8||y<AY+10||y>AY+AH-6)break;zCirc(t0+tel+i*.16,x,y,17,{tel:tel+i*.16,kind:'spike',dmg:12,dur:.45})}})}
 const L=.6+lines*1.4+tel+2;sch(t+L-1,()=>{G.boss.warn=0});idleHands(t+L-.5);return L};
MV.thornVolley=t=>{const d=D2(),ph=G.phase,n=5+ph*2,tel=Math.max(1,d.tel*.9);
 for(let i=0;i<n;i++){const t0=t+.5+i*.35;sch(t0,()=>{const src=AN(i%2?'brR':'brL'),[tx,ty]=inA(P.x+(RND()-.5)*110,P.y+(RND()-.5)*80);G.arcs.push({x0:src[0],y0:src[1],x1:tx,y1:ty,t0,t1:t0+tel,h:70,kind:'seed'});zCirc(t0+tel,tx,ty,17,{tel,kind:'spike',dmg:11,dur:1.4});sfx(300,.06,'triangle',.03,160)})}
 return .5+n*.35+tel+1.6};
MV.sapSpit=t=>{const d=D2(),ph=G.phase,vol=2+ph;mouthOpen(t,t+.7+vol*.9);
 for(let v=0;v<vol;v++){const t0=t+.8+v*.9;sch(t0,()=>{const [mx,my]=AN('mouth'),a0=Math.atan2(P.y-my,P.x-mx),n=5+ph;for(let k=0;k<n;k++)bul(t0,mx,my,a0+(k-(n-1)/2)*.2,58*d.sp,3,9);sfx(160,.14,'sawtooth',.04,90)})}
 return 1+vol*.9+.8};
MV.branchSweep=t=>{const ph=G.phase,sweeps=1+Math.floor(ph);sch(t,()=>{G.boss.warn=.5});
 for(let s=0;s<sweeps;s++){const t0=t+1.1+s*2.4,dir=s%2?-1:1;sch(t0-1.1,()=>{const [cx,cy]=AN('eye');G.rotors.push({cx,cy,L:150,arms:2,w:dir*Math.PI/1.25,a0:RND()*TAU,t0:t0-1.1,t1:t0,t2:t0+1.9,dmg:13,skin:'branch'})})}
 const L=1.1+sweeps*2.4+.4;sch(t+L-.4,()=>{G.boss.warn=0});return L};
/* ── 11 포자여왕 ── */
MV.sporeCloud=t=>{const d=D2(),ph=G.phase,waves=1+ph,tel=Math.max(1.1,d.tel);
 for(let w=0;w<waves;w++){const t0=t+w*2.4;sch(t0,()=>{sfx(180,.3,'sine',.04,500);for(let i=0;i<3+ph;i++){const src=AN(i%2?'capR':'capL'),[tx,ty]=inA(P.x+(RND()-.5)*150,P.y+(RND()-.5)*100),tt=t0+i*.25;G.arcs.push({x0:src[0],y0:src[1],x1:tx,y1:ty,t0:tt,t1:tt+tel,h:90,kind:'spore'});zCirc(tt+tel,tx,ty,26,{tel,kind:'pool',dmg:9,dur:3.2})}})}
 return waves*2.4+tel+3.4};
MV.capSpin=t=>{const d=D2(),ph=G.phase,shots=14+ph*6,dir=RND()<.5?1:-1;eyeCharge(t,.8,shots*.13+.4);
 for(let i=0;i<shots;i++){const t0=t+.9+i*.13;sch(t0,()=>{const [cx,cy]=AN('cap'),a=i*.55*dir;for(const k of [0,Math.PI])bul(t0,cx+Math.cos(a+k)*44,cy+6+Math.sin(a+k)*10,a+k,40*d.sp,3,8)})}
 return .9+shots*.13+1};
/* ── 12 늪지 아귀 ── */
MV.lureHypno=t=>{const d=D2(),ph=G.phase,tel=1.1,dur=3+ph;
 sch(t,()=>{sfx(520,.6,'sine',.04,900)});
 sch(t+tel,()=>{const [mx,my]=AN('mouth');G.pull={x:mx,y:my+10,str:50+ph*10,t0:t+tel,t1:t+tel+dur,tp:t,kind:'lure'};G.boss.openTw={b0:t+tel,b1:t+tel+.5,to:1}});
 sch(t+tel+dur-.7,()=>{const [mx,my]=AN('mouth');zCirc(t+tel+dur,mx,my+22,42,{tel:.7,dmg:16,dur:.3})});
 sch(t+tel+dur,()=>{G.shake=.45;sfx(80,.35,'square',.08,40);const [mx,my]=AN('mouth'),n=8+ph*2;for(let k=0;k<n;k++)bul(t+tel+dur,mx,my,k*TAU/n,50*d.sp,3,8)});
 sch(t+tel+dur+.5,()=>{G.boss.openTw={b0:t+tel+dur+.5,b1:t+tel+dur+.9,to:0}});
 return tel+dur+1.2};
MV.tongueLash=t=>{const ph=G.phase,n=2+ph;
 for(let i=0;i<n;i++){const t0=t+i*1.5;sch(t0,()=>{G.boss.openTw={b0:t0,b1:t0+.3,to:1};const [mx,my]=AN('mouth'),a=Math.atan2(P.y-my,P.x-mx);beam(t0+.75,mx,my,a,14,.75,.45,0,false);const bm=G.beams[G.beams.length-1];bm.kind='tongue';bm.L=Math.min(600,Math.hypot(P.x-mx,P.y-my)+70);sfx(300,.12,'sine',.03,80)})}
 sch(t+n*1.5,()=>{G.boss.openTw={b0:t+n*1.5,b1:t+n*1.5+.4,to:0}});return n*1.5+.5};
MV.bileLob=t=>{const ph=G.phase,n=3+ph;mouthOpen(t,t+.3+n*.8);
 for(let i=0;i<n;i++){const t0=t+.4+i*.8;sch(t0,()=>{const [mx,my]=AN('mouth'),[tx,ty]=inA(P.x+(RND()-.5)*70,P.y+(RND()-.5)*60);G.arcs.push({x0:mx,y0:my,x1:tx,y1:ty,t0,t1:t0+1,h:70,kind:'bile'});zCirc(t0+1,tx,ty,24,{tel:1,kind:'pool',dmg:10,dur:2.6});sfx(200,.16,'sawtooth',.04,300)})}
 return .4+n*.8+1.2};
MV.frogLeap=t=>{const tgt={x:HOME.x,y:HOME.y};
 sch(t,()=>{G.boss.warn=1});sch(t+.3,()=>{const q=inA(P.x,P.y,40,50);tgt.x=q[0];tgt.y=q[1]});
 sch(t+1.1,()=>{tweenBossNow(tgt.x,tgt.y-70,t+1.1,t+1.8,p=>Math.sin(p*Math.PI/2))});
 sch(t+1.3,()=>{zCirc(t+2.1,tgt.x,tgt.y,36,{tel:.8,dmg:18,dur:.3})});
 sch(t+1.8,()=>{tweenBossNow(tgt.x,tgt.y,t+1.8,t+2.1,p=>p*p);G.boss.warn=0});
 sch(t+2.1,()=>{G.shake=.6;sfx(60,.4,'square',.09,30);spawnPuff(tgt.x,tgt.y,12,'#4f7a62');ring(tgt.x,tgt.y,20,210,t+2.15,t+3.1,10,null,null)});
 sch(t+3.3,()=>{tweenBossNow(HOME.x,HOME.y,t+3.3,t+4.1)});return 4.4};
/* ── 13 백골 사냥개 ── */
MV.ribSpikes=t=>{const d=D2(),ph=G.phase,rows=2+ph,tel=Math.max(1,d.tel*.85);sch(t,()=>{G.boss.warn=.5});
 for(let r=0;r<rows;r++){const t0=t+.5+r*1.1,dir=r%2?-1:1;sch(t0,()=>{const y=clamp(P.y+(RND()-.5)*30,AY+40,AY+AH-16);sfx(140,.2,'square',.05,70);for(let i=0;i<9;i++){const f=i/8,x=dir>0?AX+24+f*(AW-48):AX+AW-24-f*(AW-48);zCirc(t0+tel+i*.1,x,y+((i%2)-.5)*12,17,{tel:tel+i*.1,kind:'spike',dmg:11,dur:.35})}})}
 const L=.5+rows*1.1+tel+1.3;sch(t+L-1,()=>{G.boss.warn=0});return L};
/* ── 14 실크 여제 ── */
MV.venomRain=t=>{const d=D2(),ph=G.phase,n=6+ph*3,tel=Math.max(1.1,d.tel);
 for(let i=0;i<n;i++){const t0=t+i*.4;sch(t0,()=>{const [x,y]=inA(P.x+(RND()-.5)*150,P.y+(RND()-.5)*110);zCirc(t0+tel,x,y,19,{tel,kind:'drip',dmg:11,dur:.6})})}
 return n*.4+tel+.8};
MV.eggLay=t=>{const d=D2(),ph=G.phase,n=2+ph;
 for(let i=0;i<n;i++){const t0=t+.3+i*.9;sch(t0,()=>{const [ax,ay]=AN('abdomen'),[tx,ty]=inA(P.x+(RND()-.5)*150,P.y+(RND()-.5)*100,30,40);G.arcs.push({x0:ax,y0:ay,x1:tx,y1:ty,t0,t1:t0+.9,h:60,kind:'egg'});zCirc(t0+2.3,tx,ty,20,{tel:1.4,kind:'egg',dmg:10,dur:.3});
  sch(t0+2.3,()=>{sfx(260,.2,'square',.04,300);for(let k=0;k<8;k++)bul(t0+2.3,tx,ty,k*TAU/8+.2,50*d.sp,3,8)})})}
 return .3+n*.9+2.6};
/* ── 15 말벌 군주 ── */
MV.stingShot=t=>{const d=D2(),n=3+G.phase;sch(t,()=>{G.boss.warn=.4});
 for(let i=0;i<n;i++){const t0=t+.6+i*1.0;sch(t0,()=>{const [sx,sy]=AN('sting'),a=Math.atan2(P.y-sy,P.x-sx);for(let k=0;k<3;k++)bul(t0+k*.09,sx,sy,a+(k-1)*.06,125*d.sp,3,8);sfx(340,.1,'sawtooth',.03,150)})}
 sch(t+.6+n,()=>{G.boss.warn=0});return .6+n*1.0+.6};
MV.diveStrike=t=>{const n=1+Math.min(2,G.phase);
 for(let i=0;i<n;i++){const t0=t+i*2.3,tgt={x:0,y:0};
  sch(t0,()=>{G.boss.warn=1;tweenBossNow(G.boss.x,AY+70,t0,t0+.6);sfx(600,.4,'sawtooth',.02,900)});
  sch(t0+.6,()=>{const q=inA(P.x,P.y,40,60);tgt.x=q[0];tgt.y=q[1];zCirc(t0+1.45,tgt.x,tgt.y,30,{tel:.85,dmg:16,dur:.25})});
  sch(t0+1.2,()=>{tweenBossNow(tgt.x,tgt.y,t0+1.2,t0+1.45,p=>p*p);G.boss.dash=true;G.boss.dashHit=false});
  sch(t0+1.45,()=>{G.boss.dash=false;G.boss.warn=0;G.shake=.4;sfx(90,.25,'square',.07,40);spawnPuff(tgt.x,tgt.y,8,'#ffcf3a')})}
 sch(t+n*2.3,()=>tweenBossNow(HOME.x,HOME.y,t+n*2.3,t+n*2.3+.7));return n*2.3+1};
/* ── 16 수정 기생체 ── */
MV.crystalShot=t=>{const d=D2(),n=2+G.phase;
 for(let i=0;i<n;i++){const t0=t+.5+i*1.1;sch(t0,()=>{const [cx,cy]=AN(i%2?'crystalL':'crystal'),a0=Math.atan2(P.y-cy,P.x-cx);for(const da of [-.24,-.08,.08,.24])bul(t0,cx,cy,a0+da,88*d.sp,3,8);sfx(700,.08,'triangle',.03,1200)})}
 return .5+n*1.1+.8};
MV.eyeVolley=t=>{const d=D2(),ph=G.phase,rounds=1+ph;sch(t,()=>{G.boss.eyeC={b0:t,b1:t+.6,end:t+.6+rounds*2.2}});
 for(let r=0;r<rounds;r++)EYES16.forEach(([ex,ey],k)=>{const t0=t+.7+r*2.2+k*.28;sch(t0,()=>{const g=bgeo(),x=g.x+ex*U,y=g.y+ey*U,a=Math.atan2(P.y-y,P.x-x);bul(t0,x,y,a,80*d.sp,3,8);sfx(500+k*40,.05,'sine',.02,300)})});
 return .7+rounds*2.2+.6};
MV.crystalRain=t=>{const d=D2(),ph=G.phase,n=6+ph*3,tel=Math.max(1.1,d.tel);
 for(let i=0;i<n;i++){const t0=t+i*.35;sch(t0,()=>{const [x,y]=inA(P.x+(RND()-.5)*160,P.y+(RND()-.5)*110);zCirc(t0+tel,x,y,18,{tel,kind:'fall',dmg:12,dur:.5})})}
 return n*.35+tel+.8};
/* ── 17 심연 아귀왕 ── */
MV.abyssPull=t=>{const d=D2(),ph=G.phase,tel=1,dur=3.2+ph*.6;
 sch(t,()=>{sfx(70,1,'sine',.06,50)});
 sch(t+tel,()=>{const [mx,my]=AN('mouth');G.pull={x:mx,y:my+10,str:48+ph*10,t0:t+tel,t1:t+tel+dur,tp:t,kind:'lure'};G.boss.openTw={b0:t+tel,b1:t+tel+.5,to:1}});
 for(let w=0;w<2+ph;w++){const tw=t+tel+.4+w*1.1;sch(tw,()=>{const [mx,my]=AN('mouth');ring(mx,my,270,30,tw,tw+1.5,10,[[RND()*TAU,.5]],null)})}
 sch(t+tel+dur-.6,()=>{const [mx,my]=AN('mouth');zCirc(t+tel+dur,mx,my+18,44,{tel:.6,dmg:17,dur:.3})});
 sch(t+tel+dur+.3,()=>{G.boss.openTw={b0:t+tel+dur+.3,b1:t+tel+dur+.7,to:0}});return tel+dur+1};
MV.bubbleBarrage=t=>{const d=D2(),ph=G.phase,waves=3+ph;mouthOpen(t,t+.4+waves*.8);
 for(let w=0;w<waves;w++){const t0=t+.5+w*.8;sch(t0,()=>{const [mx,my]=AN('mouth'),a0=Math.atan2(P.y-my,P.x-mx),n=7;for(let k=0;k<n;k++)bul(t0,mx,my,a0+(k-(n-1)/2)*.28+(w%2?.14:0),(34+(k%2)*10)*d.sp,4,8);sfx(240+w*30,.12,'sine',.03,500)})}
 return .5+waves*.8+1.2};
MV.lureFlash=t=>{const ph=G.phase,dur=3+ph,dir=RND()<.5?1:-1;
 sch(t,()=>{sfx(800,.4,'sine',.03,1600)});
 sch(t+.9,()=>{const [lx,ly]=AN('lure'),a0=Math.atan2(P.y-ly,P.x-lx)-dir*.9;beam(t+.9,lx,ly,a0,12,.9,dur,dir*1.8/dur,false);G.beams[G.beams.length-1].kind='lure'});
 return .9+dur+.6};
/* ── 18 재의 유령 ── */
MV.phantomDash=t=>{const n=2+Math.min(1,G.phase);
 for(let i=0;i<n;i++){const t0=t+i*1.9,tgt={x:0,y:0};
  sch(t0,()=>{G.boss.warn=.8;sfx(200,.4,'sine',.04,60)});
  sch(t0+.5,()=>{const q=inA(P.x+(RND()<.5?-60:60),P.y-10,50,60);tgt.x=q[0];tgt.y=q[1];tweenBossNow(tgt.x,tgt.y,t0+.5,t0+.62);G.flash=Math.max(G.flash,.15)});
  sch(t0+.65,()=>{const dir=P.x>tgt.x?0:Math.PI;for(let k=0;k<5;k++){const a=dir-.9+k*.45;zCirc(t0+1.35+k*.05,tgt.x+Math.cos(a)*44,tgt.y+Math.sin(a)*30,18,{tel:.7+k*.05,dmg:12,dur:.25})}G.boss.warn=0})}
 sch(t+n*1.9,()=>tweenBossNow(HOME.x,HOME.y,t+n*1.9,t+n*1.9+.3));return n*1.9+.6};
/* ── 19 태초의 굶주림 ── */
MV.primalGaze=t=>{const ph=G.phase,dur=3.4+ph,dir=RND()<.5?1:-1;
 sch(t,()=>{G.boss.openTw={b0:t,b1:t+1,to:1};sfx(60,1,'sawtooth',.05,40)});
 sch(t+1,()=>{const [ex,ey]=AN('eye'),a0=Math.atan2(P.y-ey,P.x-ex)-dir*1.1;beam(t+1,ex,ey,a0,16,1,dur,dir*2.2/dur,ph>=2)});
 sch(t+1+dur,()=>{G.boss.openTw={b0:t+1+dur,b1:t+1.6+dur,to:0}});return 1+dur+.8};
MV.mouthVolley=t=>{const d=D2(),ph=G.phase,n=4+ph*2;
 for(let i=0;i<n;i++){const t0=t+.4+i*.45;sch(t0,()=>{const [mx,my]=AN(i%2?'mouthR':'mouthL'),a=Math.atan2(P.y-my,P.x-mx);for(const da of [-.15,0,.15])bul(t0,mx,my,a+da,72*d.sp,3,8);sfx(120,.1,'square',.04,60)})}
 return .4+n*.45+.8};
/* 기존 패턴의 발사 위치를 몸의 부위로 */
MV.boneHowl=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.15,d.tel);
 sch(t,()=>{G.boss.eyeC={b0:t,b1:t+tel,end:t+tel+.8};sfx(180,tel,'sawtooth',.03,90)});
 sch(t+tel-.05,()=>{const [mx,my]=AN('mouth');ring(mx,my,20,260,t+tel,t+tel+1.8,10,null,null);for(let i=0;i<8+ph*3;i++)bul(t+tel,mx,my,i*TAU/(8+ph*3),46*d.sp,3,7)});
 handsUp(t,20,-10);const L=tel+2.2;idleHands(t+L-.3);return L};
MV.boneShard=t=>{const d=D2(),n=3+G.phase;
 for(let i=0;i<n;i++){const t0=t+.4+i*.9;sch(t0,()=>{const [rx,ry]=AN('ribs'),a=Math.atan2(P.y-ry,P.x-rx);for(const da of [-.12,.12])bul(t0,rx+(i%2?12:-12),ry,a+da,92*d.sp,3,9);sfx(280,.08,'square',.03,100)})}
 return .4+n*.9+.8};
MV.tailSpin=t=>{const ph=G.phase,sweeps=1+Math.floor(ph),dir=RND()<.5?1:-1;sch(t,()=>{G.boss.warn=.5});
 for(let s=0;s<sweeps;s++){const t0=t+.9+s*2.6;sch(t0-.9,()=>{const g=bgeo();G.rotors.push({cx:g.x,cy:g.coreY,L:95,arms:1,w:dir*Math.PI/1.1,a0:RND()*TAU,t0:t0-.9,t1:t0,t2:t0+1.9,dmg:14,skin:'tail'})})}
 const L=.9+sweeps*2.6+.4;sch(t+L-.3,()=>{G.boss.warn=0});return L};
MV.gazePollen=t=>{const tel=1.3;eyeCharge(t,tel,2.4);
 sch(t,()=>{const [ex,ey]=AN('eye'),a0=Math.atan2(P.y-ey,P.x-ex);cone({x:ex,y:ey,a0,da:0,half:.35,len:260,t0:t,t1:t+tel,t2:t+tel+2.4})});
 return tel+2.6};
MV.emberWail=t=>{const d=D2(),ph=G.phase,tel=Math.max(1.25,d.tel);
 sch(t,()=>{const [ex,ey]=AN('mouth');G.boss.eyeC={b0:t,b1:t+tel,end:t+tel+2.2};const a0=Math.atan2(P.y-ey,P.x-ex);cone({x:ex,y:ey,a0:a0-.5,da:1,half:.22,len:320,t0:t,t1:t+tel,t2:t+tel+2})});
 for(let i=0;i<3+ph;i++){const tt=t+tel+.6+i*.5;sch(tt-.4,()=>{const [x,y]=inA(P.x+(RND()-.5)*100,P.y+(RND()-.5)*70);zCirc(tt,x,y,20,{tel:.4,kind:'pool',dmg:8,dur:2.2})})}
 return tel+2.6+(3+ph)*.5};
MV.wailCone=t=>{const tel=1.3,dir=RND()<.5?1:-1;
 sch(t,()=>{const [ex,ey]=AN('mouth');G.boss.eyeC={b0:t,b1:t+tel,end:t+tel+2.2};cone({x:ex,y:ey,a0:0,da:dir*1.4,half:.16,len:300,t0:t,t1:t+tel,t2:t+tel+2.2});cone({x:ex,y:ey,a0:Math.PI,da:-dir*1.4,half:.16,len:300,t0:t,t1:t+tel,t2:t+tel+2.2})});
 return tel+2.4};
MV.mawBite=t=>{
 sch(t,()=>{G.boss.warn=1;G.boss.openTw={b0:t,b1:t+1.2,to:1}});
 sch(t+1.4,()=>{const [tx,ty]=inA(P.x,P.y,40,50);G.flash=Math.max(G.flash,.3);tweenBossNow(tx,ty,t+1.4,t+1.45);G.boss.warn=0});
 sch(t+1.45,()=>{const b=G.boss;zCirc(t+1.85,b.x,b.y+4,32,{tel:.35,dmg:17,dur:.3});G.shake=.4;sfx(80,.3,'square',.08,35)});
 sch(t+1.9,()=>{G.boss.openTw={b0:t+1.9,b1:t+2.2,to:0}});
 sch(t+2.4,()=>tweenBossNow(HOME.x,HOME.y,t+2.4,t+3.0));
 return 3.4};
Object.assign(EST,{rootLine:10,thornVolley:9,sapSpit:8,branchSweep:9,sporeCloud:10,capSpin:9,lureHypno:10,tongueLash:8,bileLob:9,frogLeap:8,ribSpikes:9,venomRain:9,eggLay:9,stingShot:8,diveStrike:9,crystalShot:8,eyeVolley:9,crystalRain:9,abyssPull:9,bubbleBarrage:8,lureFlash:8,phantomDash:8,primalGaze:9,mouthVolley:8});
Object.assign(CHAN,{rootLine:'field',thornVolley:'head',sapSpit:'head',branchSweep:'all',sporeCloud:'field',capSpin:'head',lureHypno:'all',tongueLash:'head',bileLob:'head',frogLeap:'all',ribSpikes:'field',venomRain:'field',eggLay:'hands',stingShot:'head',diveStrike:'all',crystalShot:'hands',eyeVolley:'head',crystalRain:'field',abyssPull:'all',bubbleBarrage:'head',lureFlash:'head',phantomDash:'all',primalGaze:'head',mouthVolley:'hands'});
const SIGNAME3={rootLine:'뿌리 행렬',thornVolley:'가시씨 난사',sapSpit:'수액 토하기',branchSweep:'가지 휘두르기',sporeCloud:'포자 구름',capSpin:'포자 회오리',lureHypno:'유혹의 등불',tongueLash:'혀 채찍',bileLob:'독액 토하기',frogLeap:'개구리 도약',ribSpikes:'갈비뼈 창',venomRain:'독액 비',eggLay:'알 낳기',stingShot:'꽁무니 독침',diveStrike:'급강하',crystalShot:'수정 사격',eyeVolley:'여섯 눈의 응시',crystalRain:'수정 낙하',abyssPull:'심연 흡입',bubbleBarrage:'거품 포화',lureFlash:'발광 미끼',phantomDash:'망령 도약',primalGaze:'태초의 눈',mouthVolley:'이빨 뱉기'};
Object.assign(SIGNAME,SIGNAME3);Object.assign(ATK_NAME,SIGNAME3);
DECK[10]=[['rootBurst',4,0,'S'],['rootLine',4,0,'S'],['thornVolley',3,0],['sapSpit',3,0],['clawSlam',2,1],['branchSweep',2,1],['tremor',2,2]];
DECK[11]=[['sporeCloud',4,0,'S'],['capSpin',3,0,'S'],['sporeShot',3,0],['gazePollen',2,1],['mireRoot',2,1],['sporeNova',2,2]];
DECK[12]=[['lureHypno',4,0,'S'],['tongueLash',4,0,'S'],['bileLob',3,0],['tentacleWhip',2,0],['mireGrasp',3,1],['frogLeap',2,1],['sludgePool',2,2]];
DECK[13]=[['boneHowl',4,0,'S'],['fangLunge',3,0],['pounce',3,0],['boneShard',3,0],['ribSpikes',3,1,'S'],['tailSpin',2,1]];
DECK[14]=[['webCage',4,0,'S'],['venomRain',4,0,'S'],['silkShot',3,0],['fangBite',3,0],['eggLay',3,1]];
DECK[15]=[['stingSwarm',5,0,'S'],['diveStrike',3,0,'S'],['stingShot',3,0],['hiveMines',2,1],['hiveTurret',2,1]];
DECK[16]=[['shardStorm',4,0,'S'],['eyeVolley',4,0,'S'],['crystalShot',3,0],['prismSpike',3,1],['crystalRain',3,1]];
DECK[17]=[['tideCrush',4,0,'S'],['abyssPull',4,0,'S'],['mawBite',3,0],['bubbleBarrage',3,0],['lureFlash',2,1]];
DECK[18]=[['emberWail',4,0,'S'],['phantomDash',4,0,'S'],['wailCone',3,0],['ashDrift',3,1],['convergeRing',2,1]];
DECK[19]=[['voidHunger',3,0,'S'],['primalGaze',3,0,'S'],['mouthVolley',3,0],['doomBite',2,0],['rootLine',2,1],['boneHowl',2,1],['tideCrush',2,1],['stingSwarm',2,1],['webCage',2,1],['shardStorm',2,2],['emberWail',1,2]];
/*CH2MOVES_END*/
/* ---------- 프레이즈 설계기 ---------- */
function buildPhrase(S,EV){const ph=G.phase,gm=GAPM(),deck=DECK[G.bi].filter(m=>m[2]<=ph),end=S+EV,busy={hands:S,head:S,field:S,all:S},names=[];let tt=S+((diff==='hard'||diff==='extreme')?.6:diff==='easy'?1.8:1.1),last='',sig=false,tries=0;
 while(tt<end-1.8&&tries++<28){const pool=deck.filter(m=>m[0]!==last&&(sig||m[3]==='S'||tries>7)),src=pool.length?pool:deck,tot=src.reduce((a,m)=>a+m[1],0);let x=RND()*tot,pick=src[0];for(const m of src){x-=m[1];if(x<=0){pick=m;break}}
  const nm=pick[0],ch=CHAN[nm];let st=Math.max(tt,busy[ch]);if(ch==='all')st=Math.max(st,busy.hands,busy.head,busy.field);st=Math.max(st,busy.all);
  if(st+EST[nm]>end+2.5)continue;const len=MV[nm](st);names.push(nm);if(pick[3]==='S')sig=true;last=nm;busy[ch]=st+len;if(ch==='all')busy.hands=busy.head=busy.field=st+len;
  tt=st+(ph===0?(len+1)*gm:ph===1?Math.max(1.6,len*.68*gm):Math.max(1.3,len*.52*gm))}
 if(!names.length){const nm=DECK[G.bi].find(m=>m[3]==='S')[0];MV[nm](S+1.5);names.push(nm)}return names}
function planNext(S){clearPhraseHazards();const beatStart=Math.ceil(S/4)*4,ph=G.phase,EV=EVADE[ph]+(diff==='easy'?1:(diff==='hard'||diff==='extreme')?5:3),cl=(diff==='easy'?[15,13,12]:(diff==='hard'||diff==='extreme')?[11,9,8]:[13,11,9.5])[ph];
 G.lastAtk='phrase';G.phraseStart=beatStart;G.phraseEnd=beatStart+EV;tweenBoss(HOME.x,HOME.y,S,S+1);const names=buildPhrase(beatStart,EV),lastSig=names.filter(n=>SIGNAME[n]).pop()||names[names.length-1];
 G.phraseNames=names;const sigName=names.find(n=>SIGNAME[n]);banner(sigName?SIGNAME[sigName]:ATK_NAME[names[0]]);
 const last=names[names.length-1],kind=(last==='charge'||last==='rotor')?'stun':(last==='slam'||last==='earthquake')?'stuck':'overload';
 G.counterLen=cl;sch(beatStart+EV,()=>puzzleTimeout(kind,cl));if(G.puz&&!G.puz.done)continuePuzzle(beatStart,EV,kind,cl);else startPuzzle(beatStart,EV,kind,cl);G.nextPlan=beatStart+EV+cl+RISE()}
