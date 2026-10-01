/* ================= 동굴 탐험 ================= */
const CT=24,CW=72,CH=40;
function genCave(ci){return ci>=10?genOutpost(ci):genCaveOrganic(ci)}
function genHazards(r,rooms,g,ci){const isOpen=(x,y)=>x>=0&&y>=0&&x<CW&&y<CH&&!g[Math.round(y)*CW+Math.round(x)];
 const traps=[],trapWant=6+Math.floor(ci*.55);let tries=0;
 while(traps.length<trapWant&&tries<400){tries++;const rm=rooms[1+Math.floor(r()*(rooms.length-2))],ang=r()*TAU,rad=r()*Math.min(rm.rx,rm.ry)*.75,tx=rm.cx+Math.cos(ang)*rad,ty=rm.cy+Math.sin(ang)*rad;
  if(!isOpen(tx,ty)||Math.hypot(tx-rooms[0].cx,ty-rooms[0].cy)<5)continue;
  traps.push({x:(tx+.5)*CT,y:(ty+.5)*CT,seed:r(),period:1000+Math.floor(r()*600)})}
 const mobs=[],mobWant=3+Math.floor(ci*.4);tries=0;
 while(mobs.length<mobWant&&tries<400){tries++;const rm=rooms[1+Math.floor(r()*(rooms.length-2))],ang=r()*TAU,rad=r()*Math.min(rm.rx,rm.ry)*.55,ax=rm.cx+Math.cos(ang)*rad,ay=rm.cy+Math.sin(ang)*rad;
  if(!isOpen(ax,ay)||Math.hypot(ax-rooms[0].cx,ay-rooms[0].cy)<5)continue;
  const ang2=ang+Math.PI+(r()-.5)*1.2,rad2=r()*Math.min(rm.rx,rm.ry)*.55,bx=rm.cx+Math.cos(ang2)*rad2,by=rm.cy+Math.sin(ang2)*rad2;
  if(!isOpen(bx,by))continue;
  const ax_=(ax+.5)*CT,ay_=(ay+.5)*CT,bx_=(bx+.5)*CT,by_=(by+.5)*CT;
  mobs.push({ax:ax_,ay:ay_,bx:bx_,by:by_,x:ax_,y:ay_,seed:r()*1000,per:2200+Math.floor(r()*1400),alive:true,hitT:0})}
 return {traps,mobs}}
function genCaveOrganic(ci){const r=rng(hash('cave|'+ci)),g=new Uint8Array(CW*CH).fill(1),B=BOSSES[ci];
const carve=(cx,cy,rad)=>{for(let y=Math.max(2,Math.floor(cy-rad));y<=Math.min(CH-3,Math.ceil(cy+rad));y++)for(let x=Math.max(2,Math.floor(cx-rad));x<=Math.min(CW-3,Math.ceil(cx+rad));x++)if((x-cx)*(x-cx)+(y-cy)*(y-cy)<=rad*rad)g[y*CW+x]=0};
const ell=(cx,cy,rx,ry)=>{for(let y=Math.max(2,Math.floor(cy-ry));y<=Math.min(CH-3,Math.ceil(cy+ry));y++)for(let x=Math.max(2,Math.floor(cx-rx));x<=Math.min(CW-3,Math.ceil(cx+rx));x++)if(((x-cx)/rx)**2+((y-cy)/ry)**2<=1)g[y*CW+x]=0};
const n=6,rooms=[];for(let i=0;i<n;i++){const cx=7+i*((CW-24)/(n-1)),cy=10+r()*(CH-20),rx=3.5+r()*2.5,ry=3+r()*2;rooms.push({cx,cy,rx,ry});ell(cx,cy,rx,ry)}
const paths=[];for(let i=0;i<n-1;i++){const a=rooms[i],b=rooms[i+1],pts=[],steps=Math.ceil(Math.hypot(b.cx-a.cx,b.cy-a.cy)*2),ph=r()*6;for(let s=0;s<=steps;s++){const t=s/steps,x=lerp(a.cx,b.cx,t),y=lerp(a.cy,b.cy,t)+Math.sin(t*Math.PI*2+ph)*2.2*Math.sin(t*Math.PI);carve(x,y,1.75);pts.push([x,y])}paths.push(pts)}
const notes=[];[1,3].forEach((ri,k)=>{const rm=rooms[ri],up=r()<.5,ax=rm.cx+(r()-.5)*4,ay=clamp(rm.cy+(up?-1:1)*(rm.ry+5),6,CH-7);const steps=24;for(let s=0;s<=steps;s++)carve(lerp(rm.cx,ax,s/steps),lerp(rm.cy,ay,s/steps),1.6);ell(ax,ay,3,2.4);notes.push({x:(ax+.5)*CT,y:(ay+.5)*CT,read:false,text:STORY[ci].notes[k]})});
for(let k=0;k<50;k++){const x=2+Math.floor(r()*(CW-4)),y=2+Math.floor(r()*(CH-4));if(!g[y*CW+x]&&(g[(y-1)*CW+x]||g[(y+1)*CW+x]||g[y*CW+x-1]||g[y*CW+x+1])&&r()<.55)carve(x,y,1+r()*1.2)}
const last=rooms[n-1],dcx=last.cx+last.rx+1.6;carve(dcx,last.cy,1.7);ell(dcx+1,last.cy,2.4,2);
const start={x:(rooms[0].cx+.5)*CT,y:(rooms[0].cy+.5)*CT},door={x:(dcx+2.7)*CT,y:(last.cy+.5)*CT,open:0};
const gates=[];const fl=(u,v)=>!g[Math.round(v)*CW+Math.round(u)];
const mkGate=pi=>{const pts=paths[pi];let best=null;for(let k=4;k<pts.length-4;k++){const p=pts[k];if(rooms.some(rm=>((p[0]-rm.cx)/(rm.rx+.8))**2+((p[1]-rm.cy)/(rm.ry+.8))**2<1))continue;const q=pts[k-3],s2=pts[k+3];let dx=s2[0]-q[0],dy=s2[1]-q[1];const l=Math.hypot(dx,dy)||1;dx/=l;dy/=l;const nx=-dy,ny=dx;let a=0,b=0;while(a<9&&fl(p[0]+nx*a,p[1]+ny*a))a+=.25;while(b<9&&fl(p[0]-nx*b,p[1]-ny*b))b+=.25;const w=a+b;if(!best||w<best.w)best={w,p,nx,ny,a,b}}
 if(best){const {p,nx,ny,a,b}=best;gates.push({x1:(p[0]-nx*(b+.25)+.5)*CT,y1:(p[1]-ny*(b+.25)+.5)*CT,x2:(p[0]+nx*(a+.25)+.5)*CT,y2:(p[1]+ny*(a+.25)+.5)*CT,x:(p[0]+.5)*CT,y:(p[1]+.5)*CT,w:(a+b)*CT,seen:false})}};
mkGate(2);if(ci>=3)mkGate(4);if(ci>=6)mkGate(0);
const torches=[],crystals=[],props=[];for(let y=3;y<CH-2;y++)for(let x=3;x<CW-2;x++){if(!g[y*CW+x]&&g[(y-1)*CW+x]===1){const h=hash(x+'t'+y+ci);if(h%23===0)torches.push({x:x*CT+CT/2,y:y*CT+2});else if(h%41===1)crystals.push({x:x*CT+CT/2,y:y*CT+CT*.6,s:1+(h>>4)%2});else if(h%29===2)props.push({x:x*CT+CT/2+((h>>3)%9-4),y:y*CT+CT/2+((h>>6)%9),k:(h>>9)%3})}}
const {traps,mobs}=genHazards(r,rooms,g,ci);
C={ci,g,rooms,paths,notes,gates,torches,crystals,props,traps,mobs,door,start,state:'walk',cam:{x:0,y:0},B,dust:[],slashFx:[],rings:[],mshots:[],shake:0,flash:0,hitstop:0,doorAnim:0,t0:performance.now()};
resetP(start.x,start.y)}
/* ===== Part 2 map generator: blocky courtyards + straight right-angle corridors (fortress approach), NOT the Part 1 organic-cave algorithm ===== */
function genOutpost(ci){const r=rng(hash('outpost|'+ci)),g=new Uint8Array(CW*CH).fill(1),B=BOSSES[ci];
const rect=(cx,cy,rw,rh)=>{const x0=Math.max(2,Math.round(cx-rw)),x1=Math.min(CW-3,Math.round(cx+rw)),y0=Math.max(2,Math.round(cy-rh)),y1=Math.min(CH-3,Math.round(cy+rh));for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)g[y*CW+x]=0};
const strip=(x0,y0,x1,y1,half)=>{const steps=Math.ceil((Math.abs(x1-x0)+Math.abs(y1-y0))*2)+1;for(let s=0;s<=steps;s++){const t=s/steps,x=lerp(x0,x1,t),y=lerp(y0,y1,t);for(let dy=-half;dy<=half;dy++)for(let dx=-half;dx<=half;dx++){const gx=Math.round(x+dx),gy=Math.round(y+dy);if(gx>=2&&gy>=2&&gx<CW-2&&gy<CH-2)g[gy*CW+gx]=0}}};
const n=6,rooms=[];for(let i=0;i<n;i++){const cx=7+i*((CW-24)/(n-1)),cy=10+r()*(CH-20),rw=3.2+r()*2.2,rh=2.6+r()*1.8;rooms.push({cx,cy,rx:rw,ry:rh});rect(cx,cy,rw,rh)}
const paths=[];for(let i=0;i<n-1;i++){const a=rooms[i],b=rooms[i+1],pts=[],elbowV=i%2===0;
 if(elbowV){strip(a.cx,a.cy,b.cx,a.cy,1.7);strip(b.cx,a.cy,b.cx,b.cy,1.7);
  for(let x=Math.min(a.cx,b.cx);x<=Math.max(a.cx,b.cx);x+=.5)pts.push([x,a.cy]);
  for(let y=Math.min(a.cy,b.cy);y<=Math.max(a.cy,b.cy);y+=.5)pts.push([b.cx,y])}
 else{strip(a.cx,a.cy,a.cx,b.cy,1.7);strip(a.cx,b.cy,b.cx,b.cy,1.7);
  for(let y=Math.min(a.cy,b.cy);y<=Math.max(a.cy,b.cy);y+=.5)pts.push([a.cx,y]);
  for(let x=Math.min(a.cx,b.cx);x<=Math.max(a.cx,b.cx);x+=.5)pts.push([x,b.cy])}
 paths.push(pts)}
const notes=[];[1,3].forEach((ri,k)=>{const rm=rooms[ri],up=r()<.5,ax=rm.cx+(r()-.5)*3,ay=clamp(rm.cy+(up?-1:1)*(rm.ry+5),6,CH-7);strip(rm.cx,rm.cy,ax,ay,1.5);rect(ax,ay,2.6,2.2);notes.push({x:(ax+.5)*CT,y:(ay+.5)*CT,read:false,text:STORY[ci].notes[k]})});
for(let k=0;k<36;k++){const x=2+Math.floor(r()*(CW-4)),y=2+Math.floor(r()*(CH-4));if(!g[y*CW+x]&&(g[(y-1)*CW+x]||g[(y+1)*CW+x]||g[y*CW+x-1]||g[y*CW+x+1])&&r()<.45)rect(x,y,1+r()*.8,1+r()*.8)}
const last=rooms[n-1],dcx=last.cx+last.rx+1.6;strip(last.cx,last.cy,dcx+1,last.cy,1.7);rect(dcx+1,last.cy,2.2,1.9);
const start={x:(rooms[0].cx+.5)*CT,y:(rooms[0].cy+.5)*CT},door={x:(dcx+2.7)*CT,y:(last.cy+.5)*CT,open:0};
const gates=[];const fl=(u,v)=>!g[Math.round(v)*CW+Math.round(u)];
const mkGate=pi=>{const pts=paths[pi];let best=null;for(let k=4;k<pts.length-4;k++){const p=pts[k];if(rooms.some(rm=>((p[0]-rm.cx)/(rm.rx+.8))**2+((p[1]-rm.cy)/(rm.ry+.8))**2<1))continue;const q=pts[k-3],s2=pts[k+3];let dx=s2[0]-q[0],dy=s2[1]-q[1];const l=Math.hypot(dx,dy)||1;dx/=l;dy/=l;const nx=-dy,ny=dx;let a=0,b=0;while(a<9&&fl(p[0]+nx*a,p[1]+ny*a))a+=.25;while(b<9&&fl(p[0]-nx*b,p[1]-ny*b))b+=.25;const w=a+b;if(!best||w<best.w)best={w,p,nx,ny,a,b}}
 if(best){const {p,nx,ny,a,b}=best;gates.push({x1:(p[0]-nx*(b+.25)+.5)*CT,y1:(p[1]-ny*(b+.25)+.5)*CT,x2:(p[0]+nx*(a+.25)+.5)*CT,y2:(p[1]+ny*(a+.25)+.5)*CT,x:(p[0]+.5)*CT,y:(p[1]+.5)*CT,w:(a+b)*CT,seen:false})}};
mkGate(2);mkGate(4);if(ci>=15)mkGate(0);
const torches=[],crystals=[],props=[];for(let y=3;y<CH-2;y++)for(let x=3;x<CW-2;x++){if(!g[y*CW+x]&&g[(y-1)*CW+x]===1){const h=hash(x+'t'+y+ci);if(h%23===0)torches.push({x:x*CT+CT/2,y:y*CT+2});else if(h%41===1)crystals.push({x:x*CT+CT/2,y:y*CT+CT*.6,s:1+(h>>4)%2});else if(h%29===2)props.push({x:x*CT+CT/2+((h>>3)%9-4),y:y*CT+CT/2+((h>>6)%9),k:(h>>9)%3})}}
const {traps,mobs}=genHazards(r,rooms,g,ci);
C={ci,g,rooms,paths,notes,gates,torches,crystals,props,traps,mobs,door,start,state:'walk',cam:{x:0,y:0},B,dust:[],slashFx:[],rings:[],mshots:[],shake:0,flash:0,hitstop:0,doorAnim:0,t0:performance.now()};
resetP(start.x,start.y)}
const caveSolid=(x,y)=>{const tx=Math.floor(x/CT),ty=Math.floor(y/CT);return tx<0||ty<0||tx>=CW||ty>=CH||C.g[ty*CW+tx]===1};
function caveMove(dx,dy){const bx=6,by=3;const hit=(x,y)=>caveSolid(x-bx,y-by)||caveSolid(x+bx,y-by)||caveSolid(x-bx,y+by+3)||caveSolid(x+bx,y+by+3);if(!hit(P.x+dx,P.y))P.x+=dx;if(!hit(P.x,P.y+dy))P.y+=dy}
const gateOn=b=>{const p=((b%4)+4)%4;return p<2.5};
const gateWarn=b=>{const p=((b%4)+4)%4;return p>=3.6};
function updateCave(now,dt){const cb=(now-mus.T0)/mus.ms;sched(now);
if(C.state==='walk'&&!dlg.active){stepPlayer(dt,now,caveMove,78);
 for(const n of C.notes){if(!n.read&&Math.hypot(P.x-n.x,P.y-n.y)<30){n.read=true;sfx(660,.15,'triangle',.05,990);say([[n.text[0],n.text[1]]])}}
 for(const gt of C.gates){const d=Math.hypot(P.x-gt.x,P.y-gt.y);if(!gt.seen&&d<140){gt.seen=true;banner('박자에 맞춰 통과하세요')}
  if(gateOn(cb)&&now>=P.inv&&segDist(P.x,P.y-3,gt.x1,gt.y1,gt.x2,gt.y2)<8){hurtP(10,now);C.shake=Math.max(C.shake,.65);C.flash=Math.max(C.flash,.3);C.hitstop=now+55;C.rings.push({x:P.x,y:P.y,t:now,dur:360,r1:44,col:'#ff4d6d'});let nx=gt.y2-gt.y1,ny=-(gt.x2-gt.x1);const l=Math.hypot(nx,ny)||1;nx/=l;ny/=l;const sg=((P.x-gt.x)*nx+(P.y-gt.y)*ny)>=0?1:-1;caveMove(nx*sg*24,ny*sg*24);for(let i=0;i<14;i++)C.dust.push({x:P.x,y:P.y,vx:(RND()-.5)*120,vy:(RND()-.5)*120,l:.45,c:'#ff6b81'})}}
 for(const tr of C.traps){const ph=((now/tr.period)+tr.seed)%1;tr.active=ph>.55&&ph<.85;
  if(tr.active&&now>=P.inv&&Math.hypot(P.x-tr.x,P.y-tr.y)<15){hurtP(9,now);C.shake=Math.max(C.shake,.6);C.flash=Math.max(C.flash,.28);C.hitstop=now+50;C.rings.push({x:tr.x,y:tr.y,t:now,dur:340,r1:38,col:'#ffb060'});let dx=P.x-tr.x,dy=P.y-tr.y,l=Math.hypot(dx,dy)||1;caveMove(dx/l*20,dy/l*20);for(let i=0;i<12;i++)C.dust.push({x:tr.x,y:tr.y,vx:(RND()-.5)*120,vy:(RND()-.5)*120-30,l:.4,c:'#ffb060'})}}
 for(const mb of C.mobs){if(!mb.alive)continue;mobAI(mb,now,dt)}
 mobShots(now,dt);updateChests(now,dt);updateCaveStory(now);
 if(Math.hypot(P.x-C.door.x,P.y-C.door.y)<58){C.state='door';P.dash=null;const ci=C.ci;say(STORY[ci].door,()=>{C.doorAnim=performance.now();sfx(70,1.2,'sawtooth',.08,40)})}}
if(C.state==='door'&&!dlg.active&&C.doorAnim){const k=(now-C.doorAnim)/1600;C.door.open=clamp(k,0,1);if(k>=1.4){C.state='enter';startFight(C.ci,true)}}
if(RND()<.08){const _a=caveAmbientSpawn(C.ci);C.dust.push({x:P.x+(RND()-.5)*W,y:P.y+(RND()-.5)*H,..._a})}
for(const d of C.dust){d.x+=d.vx*dt;d.y+=d.vy*dt;d.l-=dt}C.dust=C.dust.filter(d=>d.l>0);
C.slashFx=C.slashFx.filter(s=>now-s.t<260);
C.rings=C.rings.filter(r=>now-r.t<r.dur);
C.shake=Math.max(0,(C.shake||0)-dt*2.6);
C.flash=Math.max(0,(C.flash||0)-dt*2.2)}
function outpostHorizon(ci,now,cx){const B=BOSSES[ci];skyBands(0,90,shade(B.c,.32),shade(B.c,.6),9);
 R(0,90,W,H-90,shade(B.c,.4));
 const par=(cx||0)*.08;for(let i=0;i<9;i++){const bx=((i*97-par*.3)%(W+60)+(W+60))%(W+60)-30,bh=18+((i*37)%22);RA(bx,90-bh,40,bh,shade(B.c,.24),.8)}
 for(let i=0;i<5;i++){const drift=(now/2600+i*1.7)%1,mx=W*drift,my=64+((i*23)%18);RA(mx-1,my-1,3,3,'#000',.4);RA(mx,my,1,1,B.c,.7+.3*Math.sin(now/300+i))}
 RA(0,86,W,10,'#000',.15)}
function drawCave(now){const B=C.B,th=B.c,cb=(now-mus.T0)/mus.ms,shk=C.shake||0,sx=shk>.02?Math.round((RND()-.5)*shk*7):0,sy=shk>.02?Math.round((RND()-.5)*shk*7):0,cx=Math.round(clamp(P.x-W/2,0,CW*CT-W))+sx,cy=Math.round(clamp(P.y-H/2,0,CH*CT-H))+sy;C.cam={x:cx,y:cy};
const ext=C.ci>=10;
const f1=shade(th,.3),f2=shade(th,.27),wt=shade(th,.12),wf=shade(th,.46),mo=shade(th,.28),hl=shade(th,.8),sp=shade(th,.4);
if(ext){outpostHorizon(C.ci,now,cx)}else{R(0,0,W,H,'#04070a')}
const tx0=Math.floor(cx/CT),ty0=Math.floor(cy/CT),tx1=Math.min(CW-1,Math.floor((cx+W)/CT)),ty1=Math.min(CH-1,Math.floor((cy+H)/CT)),g=C.g;
for(let ty=ty0;ty<=ty1;ty++)for(let tx=tx0;tx<=tx1;tx++){const X=tx*CT-cx,Y=ty*CT-cy,wall=g[ty*CW+tx],h=((tx*73856093)^(ty*19349663))>>>0;
 if(!wall){caveFloorMotif(C.ci,X,Y,tx,ty,th,now,h);if(ty>0&&g[(ty-1)*CW+tx])RA(X,Y,CT,8,'#000',.42)}
 else{const below=ty+1<CH&&!g[(ty+1)*CW+tx];caveWallMotif(C.ci,X,Y,tx,ty,th,now,h,below)}}
// 물체
for(const c of C.crystals){const X=c.x-cx,Y=c.y-cy;if(X<-20||X>W+20||Y<-20||Y>H+20)continue;caveCrystal(C.ci,c,X,Y,now)}
for(const p of C.props){const X=p.x-cx,Y=p.y-cy;if(X<-20||X>W+20||Y<-20||Y>H+20)continue;caveProp(C.ci,p,X,Y,now)}
for(const t of C.torches){const X=t.x-cx,Y=t.y-cy;if(X<-10||X>W+10||Y<-10||Y>H+10)continue;caveTorch(C.ci,X,Y,now,t.x)}
for(const n of C.notes){const X=n.x-cx,Y=n.y-cy;if(X<-20||X>W+20||Y<-20||Y>H+20)continue;R(X-7,Y-12,14,16,'#1d272c');R(X-6,Y-11,12,9,n.read?'#3a4a52':'#7ad8ff');R(X-4,Y-9,8,1,'#0b0f11');R(X-4,Y-7,6,1,'#0b0f11');if(!n.read){RA(X-14,Y-18,28,26,'#7ad8ff',.14+.08*Math.sin(now/200));R(X-1,Y-18-Math.round(Math.sin(now/200)*2),3,4,'#ffe79a')}}
for(const gt of C.gates){const on=gateOn(cb),wr=gateWarn(cb),ax=gt.x1-cx,ay=gt.y1-cy,bx=gt.x2-cx,by=gt.y2-cy;
 R(ax-4,ay-4,8,8,'#2b3439');R(bx-4,by-4,8,8,'#2b3439');R(ax-2,ay-2,4,4,on?'#ff4d6d':'#3a1a22');R(bx-2,by-2,4,4,on?'#ff4d6d':'#3a1a22');
 if(on)line(ax,ay,bx,by,2,(x,y)=>{const j=Math.round((RND()-.5)*2);R(x-2+j,y-2,4,4,'#ff4d6d');R(x-1,y-1,2,2,'#ffffff')});else line(ax,ay,bx,by,5,(x,y,i)=>{if(i%2===0||wr&&Math.floor(now/60)%2)RA(x-1,y-1,2,2,'#ff4d6d',wr?.9:.25)})}
for(const tr of C.traps){const X=tr.x-cx,Y=tr.y-cy;if(X<-20||X>W+20||Y<-20||Y>H+20)continue;
 const ph=((now/tr.period)+tr.seed)%1;let hgt=0;if(ph<.4)hgt=0;else if(ph<.55)hgt=(ph-.4)/.15;else if(ph<.85)hgt=1;else hgt=Math.max(0,1-(ph-.85)/.15);
 const warn=ph>=.25&&ph<.55,shake=warn?Math.round((RND()-.5)*2):0;
 R(X-7,Y-2,14,4,'#2b1c14');R(X-6,Y-1,12,2,'#1a100a');
 if(ph<.25)for(let i=0;i<3;i++)RA(X-5+i*5,Y-1,1,1,'#c9d3d8',.3+.2*Math.sin(now/260+i+tr.seed*4));
 if(warn){RA(X-6+shake,Y-3,12,3,'#ff6b3d',.35+.25*Math.sin(now/70));if(RND()<.15)C.dust.push({x:tr.x+shake,y:tr.y-4,vx:(RND()-.5)*20,vy:-RND()*30,l:.2,c:'#ff8a4d'})}
 if(hgt>0){const sh=Math.round(hgt*9);for(let i=0;i<3;i++){const sx=X-5+i*5;R(sx,Y-2-sh,2,sh+2,'#c9d3d8');R(sx,Y-3-sh,2,2,'#ff4d6d')}}}
for(const mb of C.mobs){if(!mb.alive||mb.elite)continue;const X=mb.x-cx,Y=mb.y-cy;if(X<-20||X>W+20||Y<-20||Y>H+20)continue;
 const distP=Math.hypot(P.x-mb.x,P.y-mb.y),alert=distP<46||(mb.st&&mb.st!=='patrol'),bob=Math.round(Math.sin(now/(alert?110:180)+mb.seed)*(alert?2:1.4)),dir=(mb.st&&mb.st!=='patrol')?(P.x<mb.x?-1:1):(mb.x<lerp(mb.ax,mb.bx,.5)?-1:1);drawMobExtras(mb,X,Y,now);
 if(C.ci>=10){if(alert)glow(X,Y,12,'#ff4d6d',.12+.06*Math.sin(now/90));drawMob2(C.ci,X,Y,now,mb,alert,dir);continue}
 const bodyCol=alert?'#a35fe0':'#7a4fb0',coreCol=alert?'#d7a0ff':'#a877e8',sc=alert?1.15:1,blink=Math.floor(now/220+mb.seed*3)%17===0;
 if(alert)glow(X,Y+bob,13,'#c98cff',.22+.1*Math.sin(now/90));
 RA(X-6,Y+5,12,3,'#000',.35);pcirc(X,Y+bob,6*sc,bodyCol,1);pcirc(X,Y+bob,4*sc,coreCol,1);
 if(blink){R(X-3+dir,Y-1+bob,2,1,'#1a0f2a');R(X+1+dir,Y-1+bob,2,1,'#1a0f2a')}
 else{R(X-3+dir,Y-2+bob,2,2,'#1a0f2a');R(X+1+dir,Y-2+bob,2,2,'#1a0f2a')}}
{const d=C.door,X=d.x-cx,Y=d.y-cy,op=d.open*18;R(X-22,Y-40,44,72,'#1a2226');R(X-20,Y-38,40,68,shade(th,.3));R(X-20,Y-38,40,3,hl);
 R(X-18-op,Y-36,17,64,'#3a4a52');R(X+1+op,Y-36,17,64,'#3a4a52');R(X-18-op,Y-36,17,3,'#5d6a71');R(X+1+op,Y-36,17,3,'#5d6a71');
 if(d.open<.1){const pu=Math.floor(now/(mus.ms/2))%2;R(X-6,Y-14,12,8,'#0b0f11');R(X-4,Y-12,8,4,pu?'#ff4d6d':'#7a1a2a');R(X-1,Y-12,2,4,'#fff')}else{RA(X-op,Y-36,op*2,64,'#ffe79a',.6)}}
const nearNote=null;
drawCaveStory(now,cx,cy);drawChests(now,cx,cy);drawElites(now,cx,cy);
// 플레이어
{const X=P.x-cx,Y=P.y-cy,blink=now<P.inv&&Math.floor(now/70)%2===0;if(!blink){RA(X-9,Y+1,18,4,'#000',.4);const [lx,ly]=lungeOffset(now),fl=P.face.x<0;drawSword(X-12+lx,Y-19+ly,2,fl,now);drawKnight(ctx,X-12+lx,Y-19+ly,2,fl,P.walkOn?P.walkT:null,P.walkOn?null:now/430)}}
for(const s of C.slashFx){const X=s.x-cx,Y=s.y-cy,k=(now-s.t)/260;if(k>=1)continue;const sweep=s.big?2.3:1.35,L=(s.big?36:20)*Math.min(1,k*5),col=s.hit?'#ffe79a':'#bcd8ff',ae=s.a-sweep/2+sweep*Math.min(1,k*1.7);
 for(let i=0;i<=(s.big?16:7);i++){const n=s.big?16:7,ang=s.a-sweep/2+sweep*(i/n);if(ang>ae)break;for(let q=0;q<(s.big?3:1);q++){const LL=L-q*4,ex=Math.cos(ang)*LL,ey=Math.sin(ang)*LL*.65;RA(X+ex-1,Y+ey-1,2+(q?0:1),2+(q?0:1),q?'#ffffff':col,(1-k)*(q?.45:.85))}}
 const bx=Math.cos(ae)*L,by=Math.sin(ae)*L*.65;line(X,Y,X+bx,Y+by,2,(x,y)=>RA(x-1,y-1,2,2,'#ffffff',1-k));glow(X+bx,Y+by,10,col,(1-k)*.5)}
for(const m of (C.mshots||[])){const X=m.x-cx,Y=m.y-cy;glow(X,Y,8,m.col,.6);pcirc(X,Y,3,m.col,1);R(X-1,Y-1,2,2,'#ffffff');RA(X-m.vx*.03-1,Y-m.vy*.03-1,2,2,m.col,.5)}
{C.tk=C.tk||{x:P.x,y:P.y};C.tk.x+=(P.x-24-C.tk.x)*.07;C.tk.y+=(P.y-46-C.tk.y)*.07;const tx=C.tk.x-cx,ty=C.tk.y-cy+Math.sin(now/300)*2;glow(tx,ty,14,'#a8f0ff',.45);drawPet(ctx,shopInv().eq.pt||0,tx,ty,now,(shopInv().eq.pt||0)?1.25:1)}
for(const d of C.dust)RA(d.x-cx,d.y-cy,2,2,d.c,clamp(d.l/2,0,.5));
// 어둠 + 조명
const lights=[{x:P.x,y:P.y,r:150}];for(const t of C.torches)if(Math.abs(t.x-P.x)<W&&Math.abs(t.y-P.y)<H)lights.push({x:t.x,y:t.y+8,r:120+Math.sin(now/110+t.x)*6});for(const c of C.crystals)if(Math.abs(c.x-P.x)<W&&Math.abs(c.y-P.y)<H)lights.push({x:c.x,y:c.y,r:80});
lights.push({x:C.door.x,y:C.door.y,r:130+C.door.open*60});for(const n of C.notes)if(!n.read)lights.push({x:n.x,y:n.y,r:70});for(const gt of C.gates)lights.push({x:gt.x,y:gt.y,r:100});for(const tr of C.traps)lights.push({x:tr.x,y:tr.y,r:55});for(const mb of C.mobs)if(mb.alive)lights.push({x:mb.x,y:mb.y,r:60});
const vis=lights.filter(l=>Math.abs(l.x-P.x)<W&&Math.abs(l.y-P.y)<H);
const fogCol=ext?shade(th,.18):'#03060a',fogMax=ext?.22:.8;
for(let yy=0;yy<H;yy+=8)for(let xx=0;xx<W;xx+=8){let L=0;const wx=xx+4+cx,wy=yy+4+cy;for(const l of vis){const d=Math.hypot(wx-l.x,wy-l.y);if(d<l.r)L=Math.max(L,1-d/l.r)}const a=Math.round((1-Math.pow(L,.6))*6)/6*fogMax;if(a>.02)RA(xx,yy,8,8,fogCol,a)}
for(const rg of C.rings){const k=(now-rg.t)/rg.dur;if(k<0||k>=1)continue;const r=rg.r1*(1-Math.pow(1-k,3)),n=Math.max(16,Math.round(r*.6)),X=rg.x-cx,Y=rg.y-cy;for(let i=0;i<n;i++){const a=i*TAU/n;RA(X+Math.cos(a)*r-1.5,Y+Math.sin(a)*r*.8-1.5,3,3,rg.col,(1-k)*.85)}}
if(C.flash>0)RA(0,0,W,H,'#ffffff',Math.min(1,C.flash)*.55);
// HUD
caveAmbientOverlay(C.ci,now);
drawPlayerBarCave(now)}
function drawPlayerBarCave(now){const w=110;R(8,H-14,w+2,8,'#05090b');R(9,H-13,w,6,'#2a1a20');R(9,H-13,w*(P.hp/P.maxhp),6,'#a6f5c6');ctx.font='bold 8px monospace';ctx.textAlign='left';ctx.fillStyle='#fff';ctx.fillText('HP '+P.hp,12,H-7.5);
ctx.fillStyle='#ffe79a';ctx.font='bold 9px monospace';ctx.textAlign='right';ctx.fillText('CHAPTER '+(C.ci+1)+' · '+STORY[C.ci].cave,W-8,H-6);ctx.fillStyle='#ff8fa0';ctx.font='bold 8px monospace';{const [lbl,val]=chStatusLabel(C.ci);ctx.fillText(lbl+' '+val+'%',W-8,H-17)}ctx.fillStyle='#ffe79a';ctx.font='bold 9px monospace';ctx.textAlign='center';if(C.ci===0&&now-C.t0<12000&&!dlg.active){ctx.fillStyle='#ffffff';ctx.fillText('이동: WASD / 방향키 (터치: 화면 왼쪽 드래그)  ·  대시: SHIFT',W/2,H-24);ctx.fillText('깜빡이는 단말기와 저 끝의 문을 찾아보세요',W/2,H-36)}ctx.textAlign='left'}

