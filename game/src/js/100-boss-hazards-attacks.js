/* ================= 보스전: 위험요소/정확도 ================= */
const win=()=>{const d=D(),ms=G.ms||600,k=(window.CB81&&CB81.winMul)?CB81.winMul():1;return {p:Math.min(75,ms*.15)*d.win*k,g:Math.min(140,ms*.28)*d.win*k}};/* v81 네온 세트: PERFECT 범위 넓힘(k) */
const mkHand=()=>({x:0,y:0,mode:'idle',ang:Math.PI/2,aim:false,charge:0,kick:0,stuck:false,tw:null,drv:null,armed:true});
function newFight0(bi,st){const B=BOSSES[bi],now=performance.now();song=makeSong(bi);stopMusic();resetP(HOME.x,AY+AH-34);
const boss={x:HOME.x,y:HOME.y,hands:[mkHand(),mkHand()],slump:0,tw:null,patrol:0,eye:0,open:0,warn:0,dash:false,dorm:true,track:false,aimAng:0,lock:false,flashT:0,dashHit:false,eyeC:null};
const g0=geo(B,HOME.x,HOME.y);boss.hands.forEach((h,i)=>{h.x=g0.idl[i][0];h.y=g0.idl[i][1]});
G={state:'wake',bi,B,story:st,ms:song.ms,T0:0,beat:-9,hp:4200+bi*450,maxHp:4200+bi*450,phase:0,exposed:false,vuln:null,stagger:0,shots:[],tb:null,nextPlan:0,lastAtk:'',patternHistory:[],comboMoves:[],boss,
evs:[],bullets:[],zones:[],beams:[],laserPods:[],saws:[],rings:[],rotors:[],turrets:[],rockets:[],arcs:[],lanes:[],parts:[],pops:[],slashes:[],
combo:0,maxCombo:0,score:0,swings:0,onbeat:0,perfect:0,hits:0,lastBeat:-999,shake:0,flash:0,hurt:0,crash:false,startReal:now,dyingAt:0,won:false,pauseAt:0,special:{nextAt:0,active:null}}}
const sch=(t,fn)=>{const q=window.__BBQ19,owner=q&&q.owner;G.evs.push({t,fn:owner?()=>q19Run(owner,fn):fn})};
const bgeo=()=>geo(G.B,G.boss.x,G.boss.y+G.boss.slump*U*2);
const dmgOf=v=>v;
const BUL_CAP={easy:14,normal:18,hard:22,extreme:26};
function bul(t,x,y,a,spd,r,dmg){if(G.bullets.length>=(BUL_CAP[diff]||32)){let live=0;for(const b of G.bullets)if(b.t0>t-10)live++;if(live>=(BUL_CAP[diff]||32))return}G.bullets.push({x0:x+Math.cos(a)*8,y0:y+Math.sin(a)*8,ang:a,spd,t0:t,r:r||3,dmg:dmg||8})}
const QZ=t=>Math.round(t*4)/4;
function zCirc(td,cx,cy,r,o){td=QZ(td);G.zones.push(Object.assign({cx,cy,r,t0:td-(o.tel||1.5),t1:td,t2:td+(o.dur||.4),dmg:16},o))}

function beam(td,ox,oy,ang,w,tel,dur,sweep,both){td=QZ(td);const fireDur=Math.max(.26,Math.min(.55,(dur||.5)*.55));G.beams.push({ox,oy,a0:ang,da:sweep||0,w,t0:td-tel,t1:td,t2:td+(dur||.5),fireDur,fired:false,both,L:600,dmg:14,col:G.B.pal[3]||'#ff4d6d'})}
const beamAng=(b,beat)=>b.a0+b.da*clamp((beat-b.t1)/(b.t2-b.t1),0,1);
const tweenHand=(i,x,y,b0,b1)=>sch(b0,()=>{const h=G.boss.hands[i];h.tw={x0:h.x,y0:h.y,x1:x,y1:y,b0,b1};h.drv=null});
const setHand=(i,pr,b)=>sch(b,()=>Object.assign(G.boss.hands[i],pr));
const tweenBoss=(x,y,b0,b1)=>sch(b0,()=>{const s=G.boss;s.tw={x0:s.x,y0:s.y,x1:x,y1:y,b0,b1}});
const idleHands=b=>{for(const i of [0,1])setHand(i,{mode:'idle',aim:false,charge:0,stuck:false,armed:true},b)};
const clampArena=(x,y,mx,my)=>[clamp(x,AX+mx,AX+AW-mx),clamp(y,AY+my,AY+AH-8)];
const shoulderOut=(i,dx,dy)=>{const g=geo(G.B,HOME.x,HOME.y);return [g.sh[i][0]+(i?dx:-dx),g.sh[i][1]+dy]};
function spawnPuff(x,y,n,col){for(let i=0;i<n;i++)G.parts.push({x,y,vx:(RND()-.5)*60,vy:-RND()*50,life:.6,max:.6,col:col||'#9aa5ad',s:3})}

/* ================= 보스 공격 (보스의 손·눈·대포가 직접 공격) ================= */
const ATK={
volley(S){const d=D2(),ph=G.phase,n=Math.round((4+ph*2)*Math.min(1.5,d.dn)),spd=85*d.sp;
 for(const i of [0,1]){const [tx,ty]=shoulderOut(i,26,-8);tweenHand(i,tx,ty,S,S+1);setHand(i,{mode:'cannon',aim:true},S+1)}
 for(let k=0;k<n;k++){const t=S+2.5+k,both=k>=n-2;for(const i of both?[0,1]:[k%2]){sch(t-.85,()=>{const h=G.boss.hands[i];h.aim=false;h.charge=1});
  sch(t,()=>{const h=G.boss.hands[i],mx=h.x+Math.cos(h.ang)*24*HS,my=h.y+Math.sin(h.ang)*24*HS,fan=ph>=2?5:3;sfx(260,.07,'square',.03,120);h.kick=1;h.charge=0;for(let j=0;j<fan;j++)bul(t,mx,my,h.ang+(j-(fan-1)/2)*.22,spd);spawnPuff(mx,my,3,'#ffe79a')});
  setHand(i,{aim:true},t+.12)}}
 idleHands(S+n+3);return {len:n+3}},
eyeLaser(S){const d=D2(),shots=G.phase>=1?2:1;
 for(let s=0;s<shots;s++){const t0=S+s*5.2,sign=RND()<.5?-1:1;
  sch(t0,()=>{const b=G.boss;b.eyeC={b0:t0,b1:t0+3,end:t0+5};b.track=true;b.lock=false});
  sch(t0+1.4,()=>{const b=G.boss,g=bgeo();b.track=false;b.lock=true;b.aimAng=Math.atan2(P.y-g.headY,P.x-g.x);b.sweep=sign*.6});
  sch(t0+3.2,()=>{const b=G.boss,g=bgeo();b.lock=false;sfx(90,.5,'sawtooth',.06,50);G.shake=.25;beam(t0+3.2,g.x,g.headY,b.aimAng,14,0,2,b.sweep)})}
 return {len:shots*5.2+.4}},
slam(S){const d=D2(),n=Math.max(2,Math.round((2+G.phase)*Math.min(1.4,d.dn))),g0=geo(G.B,HOME.x,HOME.y);
 for(let i=0;i<n;i++){const h=i%2,t0=S+i*2.6;
  tweenHand(h,g0.sh[h][0]+(h?18:-18),g0.top-30,t0,t0+1);
  sch(t0+.9,()=>{const T={x:clamp(P.x,AX+22,AX+AW-22),y:clamp(P.y,AY+34,AY+AH-14)};
   zCirc(t0+2,T.x,T.y,26,{tel:1.1,shadow:true,dmg:20,after:()=>{const hd=G.boss.hands[h];hd.stuck=true;hd.mode='stuck';G.shake=.35;sfx(70,.3,'square',.08,35);ring(T.x,T.y,26,105,t0+2,t0+3.1,10);spawnPuff(T.x,T.y,10,'#8a969c')}});
   tweenHand(h,T.x,T.y-58,t0+.9,t0+1.6);tweenHand(h,T.x,T.y-6,t0+1.75,t0+2.0)});
  sch(t0+5.0,()=>{const hd=G.boss.hands[h];hd.stuck=false;hd.mode='idle'})}
 return {len:(n-1)*2.6+3.3,rec:3}},
charge(S){const d=D2();
 sch(S,()=>{const b=G.boss;b.warn=1;const dx=P.x-b.x,dy=P.y-b.y,l=Math.hypot(dx,dy)||1;tweenBossNow(b.x-dx/l*16,b.y-dy/l*10,S,S+1.5)});
 sch(S+1.3,()=>{const b=G.boss,g=bgeo(),hw=g.hf*U;let dx=P.x-b.x,dy=(P.y-b.y)*.9,l=Math.hypot(dx,dy)||1;dx/=l;dy/=l;let ex=b.x,ey=b.y;for(let s=0;s<700;s+=4){const nx=b.x+dx*s,ny=b.y+dy*s;if(nx<AX+hw||nx>AX+AW-hw||ny<AY+g.bt*U+g.bh*U||ny>AY+AH-6)break;ex=nx;ey=ny}
  G.lanes.push({x0:b.x,y0:b.y,x1:ex,y1:ey,w:g.hf*2*U,t0:S+1.3,t1:S+3.3});b.chg={x:ex,y:ey}});
 sch(S+3.3,()=>{const b=G.boss;b.dash=true;b.dashHit=false;b.warn=0;sfx(120,.4,'sawtooth',.07,300);tweenBossNow(b.chg.x,b.chg.y,S+3.3,S+3.85,p=>p*p)});
 sch(S+3.85,()=>{const b=G.boss;b.dash=false;G.shake=.5;sfx(60,.4,'square',.1,30);spawnPuff(b.x,b.y-20,14);for(let j=0;j<8;j++)bul(S+3.85,b.x,b.y-30,j*TAU/8+RND()*.3,55*d.sp,3,8)});
 return {len:3.9,rec:6.5,stay:true}},
missiles(S){const d=D2(),n=Math.max(5,Math.round((6+G.phase*2)*d.dn)),sp=.65,g0=geo(G.B,HOME.x,HOME.y),tel=Math.max(1.3,d.tel);
 for(const i of [0,1])tweenHand(i,g0.sh[i][0]+(i?22:-22),g0.top-20,S,S+1);
 for(let i=0;i<n;i++){const t=S+1.2+i*sp,h=i%2;sch(t,()=>{const hd=G.boss.hands[h];hd.kick=1;G.rockets.push({x:hd.x,y:hd.y,t0:t,t1:t+.7});sfx(200,.2,'sawtooth',.04,700);spawnPuff(hd.x,hd.y,4,'#c9d3d8');
  const T={x:clamp(P.x+(RND()-.5)*40,AX+20,AX+AW-20),y:clamp(P.y+(RND()-.5)*40,AY+30,AY+AH-14)};zCirc(t+tel+.7,T.x,T.y,26,{tel,missile:true,dmg:16})})}
 idleHands(S+1.2+n*sp+.4);return {len:1.2+n*sp+tel+.9}},
sawThrow(S){const d=D2(),cnt=Math.max(1,Math.round((1+G.phase)*Math.min(1.4,d.dn))),g0=geo(G.B,HOME.x,HOME.y);
 for(let k=0;k<cnt;k++){const h=k%2,t0=S+k*3.3;tweenHand(h,g0.sh[h][0]+(h?36:-36),g0.top+24,t0,t0+1);
  sch(t0+1.1,()=>{const hd=G.boss.hands[h],T={x:clamp(P.x,AX+20,AX+AW-20),y:clamp(P.y,AY+30,AY+AH-14)};hd.armed=false;
   G.saws.push({x0:hd.x,y0:hd.y,x1:T.x,y1:T.y,tp:t0+1.1,ts:t0+2.3,tt:t0+4.1,te:t0+5.9,curve:(h?-1:1)*46,h,dmg:12})});
  sch(t0+5.9,()=>{const hd=G.boss.hands[h];hd.armed=true;hd.kick=1;hd.mode='idle'});setHand(h,{mode:'wind'},t0+1)}
 return {len:(cnt-1)*3.3+6.0}},
rotor(S){const d=D2(),arms=G.phase>=1?3:2,dur=Math.round(8*Math.min(1.25,d.dn)),L=96,w=TAU/4*d.sp*(G.phase>=2?1.25:1),a0=RND()*TAU,g0=geo(G.B,HOME.x,HOME.y),cx=HOME.x,cy=g0.coreY;
 for(const i of [0,1])tweenHand(i,cx+Math.cos(a0+i*TAU/arms)*L,cy+Math.sin(a0+i*TAU/arms)*L,S,S+1);
 sch(S,()=>{G.boss.warn=.5});
 const rt={cx,cy,L,arms,w,a0,t0:S+1,t1:S+2,t2:S+1+dur,dmg:12};G.rotors.push(rt);
 sch(S+1,()=>{for(const i of [0,1])G.boss.hands[i].drv=b=>rotorTip(rt,i,b)});
 sch(S+1+dur,()=>{for(const i of [0,1])G.boss.hands[i].drv=null;G.boss.warn=0});idleHands(S+1+dur+.1);
 return {len:1+dur+.6}},
turrets(S){const d=D2(),n=Math.max(2,Math.round((2+G.phase)*Math.min(1.25,d.dn))),g0=geo(G.B,HOME.x,HOME.y),pts=shuffle([[AX+34,AY+42],[AX+AW-34,AY+42],[AX+34,AY+AH-30],[AX+AW-34,AY+AH-30],[AX+AW/2-110,AY+AH-24],[AX+AW/2+110,AY+AH-24],[AX+70,AY+AH/2],[AX+AW-70,AY+AH/2]]).slice(0,n);
 for(const i of [0,1])tweenHand(i,g0.sh[i][0]+(i?20:-20),g0.top-14,S,S+.8);
 G.tb={n:pts.length,dead:0};pts.forEach((p,i)=>{const t=S+.6+i*.5,h=i%2;sch(t,()=>{const hd=G.boss.hands[h];hd.kick=1;G.arcs.push({x0:hd.x,y0:hd.y,x1:p[0],y1:p[1],t0:t,t1:t+.9,h:50,kind:'turret'})});
  const td=t+.9+1.2;zCirc(td,p[0],p[1],12,{tel:1.2,dur:.05,harm:false,dmg:0});
  sch(td,()=>{const tr={x:p[0],y:p[1],t0:td,t1:td+4.2,alive:true,aimAng:Math.PI/2,warn0:-1,fireAt:-1};G.turrets.push(tr);spawnPuff(p[0],p[1],6,'#c9d3d8');
   for(let k=0;k<3;k++){const fire=td+.9+k*1.05,warn=fire-.48;
    sch(warn,()=>{if(tr.alive){tr.aimAng=Math.atan2(P.y-tr.y,P.x-tr.x);tr.warn0=warn;tr.fireAt=fire}});
    sch(fire,()=>{if(tr.alive){bul(fire,tr.x,tr.y-6,tr.aimAng,62*d.sp,3,6);tr.fireAt=-1;sfx(300,.05,'square',.02,150)}})}
   sch(td+4.2,()=>{if(tr.alive){tr.alive=false;spawnPuff(tr.x,tr.y,5,'#8a969c')}if(G.turrets.every(x=>!x.alive||G.beat>=x.t1))G.tb=null})})});
 idleHands(S+n*.5+2);return {len:n*.5+6.5}},
laserPods(S){const d=D2(),count=G.phase>=2?3:G.phase>=1?2:1,tel=d.tel,gap=2.65;
 for(let i=0;i<count;i++){const td=S+1.4+i*gap,side=i%2===0?-1:1;
  sch(td-tel,()=>{const y=clamp(P.y,AY+32,AY+AH-30),x=side<0?AX+8:AX+AW-8;
   G.laserPods.push({x,y,side,t0:td-tel,t1:td,t2:td+.58,col:G.B.c});beam(td,x,y,side<0?0:Math.PI,11,tel,.58,0,false);
   G.beams[G.beams.length-1].support=true;sfx(390,.18,'triangle',.035,160);G.shake=.08})}
 return {len:1.4+(count-1)*gap+.68}},
ringBurst(S){const d=D2(),ph=G.phase,g0=geo(G.B,HOME.x,HOME.y),cx=HOME.x,cy=g0.coreY,arms=2+ph;
 for(const i of [0,1])tweenHand(i,g0.sh[i][0]+(i?30:-30),g0.top-30,S,S+1);
 sch(S,()=>{G.boss.openTw={b0:S,b1:S+1.2,to:1}});
 const dir=RND()<.5?1:-1,a0=RND()*TAU;
 for(let j=0;j<12;j++){const t=S+1.6+j*.5;sch(t,()=>{for(let a=0;a<arms;a++)bul(t,cx,cy,a0+dir*j*.4+a*TAU/arms,44*d.sp)})}
 if(ph>=1){for(let k=0;k<(ph>=2?4:2);k++){const t=S+3+k*2;sch(t,()=>{const an=Math.atan2(P.y-cy,P.x-cx);for(let j=-2;j<=2;j++)bul(t,cx,cy,an+j*.2,80*d.sp)})}}
 if(ph>=2){for(let j=0;j<12;j++){const t=S+1.8+j*.5;sch(t,()=>{for(let a=0;a<arms;a++)bul(t,cx,cy,a0-dir*j*.5+a*TAU/arms+.3,40*d.sp)})}}
 for(let r=0;r<3;r++){const t=S+2.5+r*2,n=Math.round(14*d.dn),off=r*.2;sch(t-.5,()=>{G.boss.warn=.4});sch(t,()=>{sfx(180,.12,'sawtooth',.03,90);for(let j=0;j<n;j++)bul(t,cx,cy,off+j*TAU/n,50*d.sp)})}
 sch(S+8.2,()=>{G.boss.openTw={b0:S+8.2,b1:S+9,to:0}});idleHands(S+8.2);return {len:8.6}},
clockLaser(S){const d=D2(),ph=G.phase,steps=Math.round((8+ph*2)*Math.min(1.3,d.dn)),it=ph>=2?.75:1,dir=RND()<.5?1:-1;let a0=0;
 sch(S+.5,()=>{const g=bgeo();a0=Math.atan2(P.y-g.headY,P.x-g.x);G.boss.eyeC={b0:S+.5,b1:S+2,end:S+2+steps*it}});
 for(let i=0;i<steps;i++){const td=S+2+i*it;sch(td-it,()=>{const g=bgeo();beam(td,g.x,g.headY,a0+dir*i*(TAU/steps),12,it,.4,0,false);if(ph>=1)beam(td,g.x,g.headY,a0+dir*i*(TAU/steps)+Math.PI,12,it,.4,0,false)})}
 return {len:2+steps*it+.5}},
mines(S){const d=D2(),n=Math.max(3,Math.round(5*d.dn)),g0=geo(G.B,HOME.x,HOME.y),pts=[],tel=Math.min(d.tel+.5,2.5);let tr=0;
 while(pts.length<n&&tr++<100){const x=AX+30+RND()*(AW-60),y=AY+50+RND()*(AH-80);if(Math.abs(x-HOME.x)<74&&y<HOME.y+8)continue;if(pts.every(p=>Math.hypot(p[0]-x,p[1]-y)>64))pts.push([x,y])}
 for(const i of [0,1])tweenHand(i,g0.sh[i][0]+(i?24:-24),g0.top+14,S,S+.8);
 pts.forEach((p,i)=>{const t=S+.9+i*.55,h=i%2;sch(t,()=>{const hd=G.boss.hands[h];hd.kick=1;G.arcs.push({x0:hd.x,y0:hd.y,x1:p[0],y1:p[1],t0:t,t1:t+.9,h:60,kind:'mine'})});
  const td=t+.9+tel;zCirc(td,p[0],p[1],28,{tel,mine:true,dmg:16,dur:.4,after:()=>{for(let j=0;j<6;j++)bul(td,p[0],p[1],j*TAU/6+RND()*.3,44*d.sp,3,7);spawnPuff(p[0],p[1],8,'#ffb020')}})});
 idleHands(S+n*.55+1.5);return {len:.9+n*.55+.9+tel+.6}},
starBurst(S){const d=D2(),ph=G.phase,n=Math.round((ph>=2?6:4)*Math.min(1.3,d.dn)),g0=geo(G.B,HOME.x,HOME.y),cx=HOME.x,cy=g0.coreY,a0=RND()*TAU,sign=RND()<.5?-1:1,tel=Math.max(1.1,d.tel),rounds=ph>=2?2:1,gap=4;
 for(const i of [0,1])tweenHand(i,g0.sh[i][0]+(i?30:-30),g0.top-34,S,S+.8);
 sch(S,()=>{G.boss.openTw={b0:S,b1:S+1.2,to:1}});
 for(let r=0;r<rounds;r++){const t=S+1+tel+r*gap,off=a0+r*TAU/n/2;sch(t-tel,()=>{sfx(220,.4,'sawtooth',.04,800);for(let k=0;k<n;k++)beam(t,cx,cy,off+k*TAU/n,12,tel,2.4,sign*.5)})}
 const te=S+1+tel+(rounds-1)*gap+2.6;sch(te,()=>{G.boss.openTw={b0:te,b1:te+.8,to:0}});idleHands(te);return {len:te-S+.2}},
earthquake(S){const d=D2(),ph=G.phase,g0=geo(G.B,HOME.x,HOME.y),cx=HOME.x,cy=HOME.y-6,tel=Math.max(1.3,d.tel*.85),t=S+1+tel;
 for(const i of [0,1])tweenHand(i,g0.sh[i][0]+(i?14:-14),g0.top-46,S,S+1);
 sch(S+1,()=>{G.boss.warn=.7});zCirc(t,cx,cy,46,{tel,shadow:true,dmg:16,dur:.3});
 tweenHand(0,cx-24,cy,t-.3,t);tweenHand(1,cx+24,cy,t-.3,t);
 sch(t,()=>{for(const i of [0,1]){const h=G.boss.hands[i];h.stuck=true;h.mode='stuck'}G.shake=.65;sfx(55,.6,'square',.1,30);spawnPuff(cx,cy,14,'#8a969c');G.boss.warn=0;
  ring(cx,cy,30,340,t,t+1.9,12);if(ph>=2)ring(cx,cy,30,340,t+1.1,t+3.0,12);
  const nd=Math.round((5+ph*3)*Math.min(1.4,d.dn));for(let k=0;k<nd;k++){const px=AX+30+RND()*(AW-60),py=AY+50+RND()*(AH-70);zCirc(t+1.4+k*.35,px,py,22,{tel:Math.max(1.1,d.tel*.8),missile:true,dmg:14})}});
 sch(t+4.6,()=>{for(const i of [0,1]){const h=G.boss.hands[i];h.stuck=false;h.mode='idle'}});
 return {len:1+tel+3.8}},
roar(S){const g0=geo(G.B,HOME.x,HOME.y),cx=HOME.x,cy=g0.coreY;
 for(const i of [0,1])tweenHand(i,g0.sh[i][0]+(i?34:-34),g0.top-40,S,S+.8);
 sch(S+.8,()=>{G.shake=.6;sfx(60,.9,'sawtooth',.09,30);banner('PHASE '+(G.phase+1));ring(cx,cy,30,250,S+.8,S+2.3,10);spawnPuff(cx,cy,20,'#ffe79a');P.hp=Math.min(P.maxhp,P.hp+Math.round(P.maxhp*.25));G.pops.push({x:P.x,y:P.y-22,t:performance.now(),tx:'+HP',col:'#a6f5c6'})});
 idleHands(S+2.6);return {len:2.4,rec:6}}
};
function tweenBossNow(x,y,b0,b1,ez){const s=G.boss;s.tw={x0:s.x,y0:s.y,x1:x,y1:y,b0,b1,ez}}
function rotorAng(rt,b){const s=Math.max(0,b-rt.t0);return rt.a0+rt.w*(s<2?s*s/4:s-1)}
function rotorTip(rt,i,b){const a=rotorAng(rt,b)+i*TAU/rt.arms;return [rt.cx+Math.cos(a)*rt.L,rt.cy+Math.sin(a)*rt.L]}
function sawPos(s,b){if(b<s.ts)return [s.x0,s.y0];const out=b<=s.tt,u=out?clamp((b-s.ts)/(s.tt-s.ts),0,1):clamp((b-s.tt)/(s.te-s.tt),0,1),ax=out?s.x0:s.x1,ay=out?s.y0:s.y1,bx=out?s.x1:s.x0,by=out?s.y1:s.y0,dx=bx-ax,dy=by-ay,l=Math.hypot(dx,dy)||1,off=Math.sin(u*Math.PI)*s.curve*(out?1:-1);return [lerp(ax,bx,u)-dy/l*off,lerp(ay,by,u)+dx/l*off]}
const VN={overload:'과부하!  지금 공격!',stun:'기절!  지금 공격!',stuck:'손이 박혔다!  지금 공격!'};
const VL={laserPods:['overload',4.5],volley:['overload',5],eyeLaser:['overload',5],slam:['stuck',4],charge:['stun',6.5],missiles:['overload',5],sawThrow:['overload',4.5],rotor:['stun',5.5],turrets:['overload',4],ringBurst:['overload',6],clockLaser:['overload',5],mines:['overload',4.5],starBurst:['overload',5],earthquake:['stuck',5],roar:['stun',4],combo:['overload',6]};
const VF=[1,.85,.72];
function RISE(){return {easy:2,normal:1,hard:.45,extreme:.12}[diff]||1}
function GAPM(){return diff==='easy'?.95:(diff==='hard'||diff==='extreme')?.5:.8}
const D2=()=>{const d=D(),ph=G.phase||0;return {sp:d.sp*[1,1.14,1.3][ph],dn:d.dn*[1,1.18,1.4][ph],tel:Math.max({easy:1.6,normal:1.1,hard:.82,extreme:.62}[diff]||1,d.tel*[1,.85,.7][ph]),dm:d.dm}};



function forceVuln(type,len){const beat=G.beat,b=G.boss;G.evs=[];G.zones=G.zones.filter(z=>beat>=z.t1);G.beams=G.beams.filter(x=>beat>=x.t1&&!x.support);G.laserPods=[];G.rotors=[];G.lanes=[];G.rockets=[];b.dash=false;b.warn=0;b.eyeC=null;b.eye=0;b.track=false;b.lock=false;b.openTw=null;b.open=0;b.tw=null;
for(const h of b.hands){h.drv=null;h.tw=null;h.aim=false;h.charge=0;h.mode='idle';h.armed=true;h.stuck=false}tweenBossNow(HOME.x,HOME.y,beat,beat+.9);startVuln(type,len*VF[G.phase])}

// These boss specials use wall-clock timers, so they land between musical beats.


/* ================= 보스전: 업데이트 ================= */
function bodyRect(){const g=bgeo();return {l:g.x-g.hf*U,r:g.x+g.hf*U,t:g.top+10,b:g.y}}
function circRect(cx,cy,r,rc){const nx=clamp(cx,rc.l,rc.r),ny=clamp(cy,rc.t,rc.b);return Math.hypot(cx-nx,cy-ny)<=r}
function segDist(px,py,ax,ay,bx,by){const dx=bx-ax,dy=by-ay,l2=dx*dx+dy*dy||1,t=clamp(((px-ax)*dx+(py-ay)*dy)/l2,0,1);return Math.hypot(px-(ax+dx*t),py-(ay+dy*t))}
function bpos(b,beat){const s=b.spd*(beat-b.t0);return [b.x0+Math.cos(b.ang)*s,b.y0+Math.sin(b.ang)*s]}
function hurtP(dmg,now){if(now<P.inv)return;dmg=Math.max(1,Math.round(dmg*D().dm));P.hp-=dmg;P.inv=now+((diff==='hard'||diff==='extreme')?1450:diff==='easy'?1400:1250)*(curPet().inv||1);
if(mode==='boss'){G.hits++;G.combo=0;G.shake=.3;G.flash=.22;G.pops.push({x:P.x,y:P.y-22,t:now,tx:'-'+dmg,col:'#ff6b81'});for(let i=0;i<14;i++)G.parts.push({x:P.x,y:P.y,vx:(RND()-.5)*140,vy:(RND()-.5)*140,life:.5,max:.5,col:'#ff6b81',s:2});sfx(100,.25,'sawtooth',.07,40);
 if(P.hp<=0&&curPet().revive&&!G.revived&&G.state==='play'){G.revived=true;P.hp=Math.round(P.maxhp*curPet().revive);P.inv=now+2500;G.flash=.6;G.shake=.5;G.pops.push({x:P.x,y:P.y-34,t:now,tx:'불사조의 가호! 부활',col:'#ffd84a'});for(let i=0;i<24;i++)G.parts.push({x:P.x,y:P.y,vx:(RND()-.5)*160,vy:-RND()*160,life:.8,max:.8,col:i%2?'#ffd84a':'#ff4d1a',s:3});sfx(520,.5,'triangle',.07,1400)}
 if(P.hp<=0&&G.state!=='dead'&&G.state!=='dying'){P.hp=0;G.state='dead';G.dyingAt=now;stopMusic();G.zones=[];G.beams=[];G.bullets=[];G.saws=[];G.rings=[];G.rotors=[];G.turrets=[];G.laserPods=[];G.evs=[]}}
else{P.hp=Math.max(1,P.hp);sfx(100,.2,'sawtooth',.06,40)}}

function pickTarget(){const g=bgeo(),c=[],fx=P.face.x,fy=P.face.y,fl=Math.hypot(fx,fy)||1,vul=!!G.vuln;
const ang=(x,y)=>{const dx=x-P.x,dy=y-P.y,l=Math.hypot(dx,dy)||1;return Math.acos(clamp((dx*fx+dy*fy)/(l*fl),-1,1))};
c.push({kind:vul?'core':'armor',x:g.x,y:g.coreY,mul:vul?3:.35,s:ang(g.x,g.coreY)-(vul?.6:.3)});
for(const h of G.boss.hands)if(h.stuck)c.push({kind:'hand',x:h.x,y:h.y,mul:4,s:ang(h.x,h.y)-.5,obj:h});
for(const t of G.turrets)if(t.alive)c.push({kind:'turret',x:t.x,y:t.y,mul:0,s:ang(t.x,t.y)-.35,obj:t});
c.sort((a,b)=>a.s-b.s);return c[0]}


cv.addEventListener('pointerdown',e=>{if((mode!=='boss'&&mode!=='cave')||dlg.active)return;e.preventDefault();if(mode==='boss'&&e.pointerType==='mouse')return;const rc=cv.getBoundingClientRect();doAttack({x:(e.clientX-rc.left)*W/rc.width,y:(e.clientY-rc.top)*H/rc.height})});

function stepBoss(beat,dt){const b=G.boss;
if(b.tw){const p=clamp((beat-b.tw.b0)/(b.tw.b1-b.tw.b0),0,1),e=b.tw.ez?b.tw.ez(p):ease(p);b.x=lerp(b.tw.x0,b.tw.x1,e);b.y=lerp(b.tw.y0,b.tw.y1,e);if(p>=1)b.tw=null}
else if(b.patrol&&G.state==='play'){const tx=HOME.x+Math.sin(beat*.45)*34;b.x+=(tx-b.x)*Math.min(1,dt*3);b.y+=(HOME.y-b.y)*Math.min(1,dt*3)}
if(b.eyeC){const e=b.eyeC;if(beat<e.b1)b.eye=clamp((beat-e.b0)/(e.b1-e.b0),0,1);else if(beat<e.end)b.eye=1;else{b.eye=Math.max(0,b.eye-dt*2);if(b.eye<=0)b.eyeC=null}}
if(b.track){const g=bgeo();b.aimAng=Math.atan2(P.y-g.headY,P.x-g.x)}
if(b.openTw){const o=b.openTw,p=clamp((beat-o.b0)/(o.b1-o.b0),0,1);b.open=o.to?p:1-p;if(p>=1)b.openTw=null}
b.warn=Math.max(0,b.warn-dt*.4);b.slump+=((G.vuln?1:0)-b.slump)*Math.min(1,dt*(G.vuln?6:2.6));
const g=bgeo();
G.boss.hands.forEach((h,i)=>{if(h.drv){[h.x,h.y]=h.drv(beat)}
 else if(h.tw){const p=clamp((beat-h.tw.b0)/(h.tw.b1-h.tw.b0),0,1),e=ease(p);h.x=lerp(h.tw.x0,h.tw.x1,e);h.y=lerp(h.tw.y0,h.tw.y1,e);if(p>=1)h.tw=null}
 else if(h.mode==='idle'){const dr=b.slump*16,tx=g.idl[i][0]+Math.sin(beat*1.3+i*2)*2,ty=g.idl[i][1]+dr+Math.cos(beat*1.1+i)*2;h.x+=(tx-h.x)*Math.min(1,dt*6);h.y+=(ty-h.y)*Math.min(1,dt*6)}
 if(h.mode==='cannon'&&h.aim)h.ang=Math.atan2(P.y-h.y,P.x-h.x);
 h.kick=Math.max(0,h.kick-dt*4)})}
function pushOutBoss(){const rc=bodyRect(),r=5;const nx=clamp(P.x,rc.l,rc.r),ny=clamp(P.y,rc.t,rc.b);let dx=P.x-nx,dy=P.y-ny,d=Math.hypot(dx,dy);
if(d<r){if(Math.abs(dx)<1){const ol=P.x-rc.l,or=rc.r-P.x;if(ol<=or)P.x=rc.l-r;else P.x=rc.r+r}else{P.x=nx+dx/d*r;P.y=ny+dy/d*r}}}


