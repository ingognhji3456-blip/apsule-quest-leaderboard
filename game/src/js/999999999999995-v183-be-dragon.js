/* ================= v183 내가 드래곤 되기 (DB183) =================
   이번엔 내가 대형 드래곤(월드 보스 그림 WB177.VD)이 되어 몰려오는 AI 용사들을 막는다. 서버 없이 혼자 하는 모드(mode='db183').
   - 조작: 이동(방향키/WASD · 조이스틱) · 불 숨결 J/Space(공격 단추) · 급강하 K/Shift(대시 단추) · 꼬리 휘두르기 F/L(패링 단추)
           · 유성 포효 C(궁극기 단추, 게이지 100%).
   - 용사 5종: 검사(붙어서 벰) · 방패병(단단함) · 궁수(화살 — 꼬리로 쳐 낼 수 있음) · 마법사(바닥 원 예고 뒤 폭발) · 사제(용사 치료).
   - 웨이브마다 10 → 15 → 20 → 25 → 30명, 6웨이브부터는 30명이 점점 세짐. 웨이브를 깨면 체력 20% 회복.
   - 끝나면(드래곤 체력 0) 쓰러뜨린 용사 · 웨이브만큼 골드(하루 상한 DAY_CAP), 최고 기록은 saveData.db183.
   - 화면은 이 파일이 직접 그린다(frame 감싸기, SEC127과 같은 방식). 배경은 용의 둥지(WB177.EXT.arena). */
(function(){try{
 const WB=window.WB177;if(!WB||!WB.VD)return;
 const TAU=Math.PI*2,rnd=(a,b)=>a+Math.random()*(b-a),$=id=>document.getElementById(id),num=n=>Math.round(+n||0).toLocaleString();
 const VD=WB.VD,FP=WB.FP,dPose=WB.dPose;
 const S=.5,PXU=1.25,HOV=8,DAY_CAP=8000;
 const TRI=()=>({easy:0,normal:1,hard:2,extreme:3})[typeof diff!=='undefined'?diff:'normal']||0;
 const DM=()=>[.75,1,1.3,1.7][TRI()];
 const sv=()=>saveData.db183||(saveData.db183={best:{wave:0,kills:0},day:'',got:0});
 let D=null,last=0;
 /* ---------- 용사 종류 ---------- */
 const CL={sword:{n:'검사',hp:90,sp:62,dmg:9,col:'#e8f0ff'},shield:{n:'방패병',hp:230,sp:42,dmg:7,col:'#c8a24a'},bow:{n:'궁수',hp:60,sp:55,dmg:6,col:'#8ad86a'},
  mage:{n:'마법사',hp:55,sp:50,dmg:20,col:'#b48aff'},priest:{n:'사제',hp:65,sp:48,dmg:0,col:'#ffe08a'}};
 const chars=(()=>{let L=null;return ()=>{if(L)return L;L=[];try{for(let i=0;i<25;i++)if(CH2DEF[i])L.push(i)}catch(e){}if(!L.length)L=[0];return L}})();
 function waveSize(n){return Math.min(30,5+5*n)}
 function pickCls(n){const r=Math.random();if(n>=3&&r<.12)return 'priest';if(n>=2&&r<.28)return 'shield';if(r<.45)return 'bow';if(n>=2&&r<.6)return 'mage';return 'sword'}
 function hero(n){const c=pickCls(n),k=CL[c],m=(1+.15*(n-1))*DM(),side=Math.floor(Math.random()*3);let x,y;
  if(side===0){x=AX+6;y=rnd(AY+40,AY+AH-8)}else if(side===1){x=AX+AW-6;y=rnd(AY+40,AY+AH-8)}else{x=rnd(AX+20,AX+AW-20);y=AY+AH-4}
  return {c,x,y,hp:k.hp*m,max:k.hp*m,dmg:k.dmg*(1+.1*(n-1))*DM(),sp:k.sp*rnd(.9,1.1),cd:rnd(.6,1.6),ch:chars()[Math.floor(Math.random()*chars().length)],face:1,kx:0,ky:0,stun:0,wind:0,born:.45,hitT:-9,walk:Math.random()*6,mv:false,dieT:null}}
 /* ---------- 시작 · 끝 ---------- */
 function start(){try{initAudio()}catch(e){}try{if(typeof CS!=='undefined')CS=null}catch(e){}story=false;
  enterGame();$('overlay').hidden=true;mode='db183';paused=false;
  const hp=2400;D={x:AX+AW/2,y:AY+AH/2+30,face:1,hp,max:hp,flash:-9,inv:0,t:0,st:'move',st0:0,cd:{b:0,d:0,t:0},gauge:0,
   H:[],q:[],ar:[],mt:[],tel:[],fx:[],pops:[],wave:0,kills:0,next:1.2,banner:null,dv:null,breath:null,shake:0,dead:null,res:false,gold:0};
  try{$('bvTitle').textContent='BEAT BLADE · 내가 드래곤'}catch(e){}
  try{stopMusic();startMusic(makeSong(9),performance.now(),0)}catch(e){}
  try{if(typeof ensureUltBtn==='function')ensureUltBtn()}catch(e){}last=performance.now()}
 function nextWave(){D.wave++;const n=D.wave,c=waveSize(n);for(let i=0;i<c;i++)D.q.push(n);D.spawnT=0;D.banner={t:D.t,txt:'WAVE '+n,sub:'용사 '+c+'명이 몰려온다!'};try{sfx(220,.5,'sawtooth',.05,440)}catch(e){}}
 function gameOver(){if(D.res)return;D.res=true;const s=sv(),today=new Date().toISOString().slice(0,10);if(s.day!==today){s.day=today;s.got=0}
  const raw=D.kills*10+Math.max(0,D.wave-1)*150,g=Math.max(0,Math.min(raw,DAY_CAP-s.got));s.got+=g;D.gold=g;try{if(g>0)addCoins(g)}catch(e){}
  const nb=D.wave>s.best.wave||(D.wave===s.best.wave&&D.kills>s.best.kills);if(nb)s.best={wave:D.wave,kills:D.kills};try{saveNow()}catch(e){}
  setTimeout(()=>{try{stopMusic()}catch(e){}try{showOverlay('🐉 내가 드래곤','드래곤이 쓰러졌어요',
   '<b style="color:#ffd166;font-size:1.25em">WAVE '+D.wave+' · 용사 '+num(D.kills)+'명 처치</b>'+(nb?'<br><b style="color:#8affc8">★ 새 최고 기록!</b>':'<br>최고 기록 WAVE '+s.best.wave+' · '+num(s.best.kills)+'명')+
   '<br>보상 🪙 '+num(g)+(g<raw?' <small>(오늘 받을 수 있는 골드 '+num(DAY_CAP)+'까지)</small>':''),
   [['로비로',()=>{try{toLobby()}catch(e){}},true],['↺ 다시',()=>{$('overlay').hidden=true;start()},false]])}catch(e){console.error(e)}},1400)}
 /* ---------- 드래곤 ---------- */
 const center=()=>[D.x,D.y-38-HOV-(D.dv?D.dv.h:0)];/* 몸 가운데(맞는 곳) */
 function hurtD(d){if(!D||D.dead||D.inv>D.t||(D.dv&&!D.dv.land))return;D.hp-=d;D.flash=D.t;D.shake=Math.max(D.shake,.25);pop(D.x,D.y-70,'-'+Math.round(d),'#ff6a5a');if(D.hp<=0){D.hp=0;D.dead=D.t;D.st='die';D.st0=D.t;try{sfx(70,1.2,'sawtooth',.08,30)}catch(e){}gameOver()}}
 function pop(x,y,t,c){if(D.pops.length<60)D.pops.push({x:x+rnd(-6,6),y,t:D.t,txt:t,c})}
 function dmgH(h,d,col,kb,kx,ky){if(h.dieT!=null)return;h.hp-=d;h.hitT=D.t;D.gauge=Math.min(100,D.gauge+d/25);if(kb){const l=Math.hypot(kx,ky)||1;h.kx+=kx/l*kb;h.ky+=ky/l*kb}
  if(Math.random()<.4)pop(h.x,h.y-30,Math.round(d),col||'#ffd166');if(h.hp<=0){h.dieT=D.t;D.kills++;D.gauge=Math.min(100,D.gauge+4);try{sfx(300,.12,'square',.03,120)}catch(e){}}}
 const near=(x,y,r)=>D.H.filter(h=>h.dieT==null&&Math.hypot(h.x-x,(h.y-y)*1.3)<r);
 /* 기술 */
 function breath(){if(!D||D.dead||D.cd.b>D.t||D.dv)return;D.cd.b=D.t+1.5;D.breath={t0:D.t,dur:.95,tick:0};D.st='breath';D.st0=D.t;try{sfx(120,.9,'sawtooth',.05,60)}catch(e){}}
 function dive(){if(!D||D.dead||D.cd.d>D.t||D.dv)return;D.cd.d=D.t+4;const [ix,iy]=moveInput();let dx=ix,dy=iy;if(!dx&&!dy)dx=D.face;const l=Math.hypot(dx,dy)||1;
  const tx=Math.max(AX+62,Math.min(AX+AW-62,D.x+dx/l*130)),ty=Math.max(AY+80,Math.min(AY+AH-6,D.y+dy/l*90));D.dv={t0:D.t,sx:D.x,sy:D.y,tx,ty,h:0,land:false};D.breath=null;if(Math.abs(dx)>.1)D.face=dx>0?1:-1;D.st='dive';D.st0=D.t;try{sfx(400,.5,'triangle',.05,120)}catch(e){}}
 function tail(){if(!D||D.dead||D.cd.t>D.t||D.dv)return;D.cd.t=D.t+2.6;D.st='tail';D.st0=D.t;D.fx.push({k:'ring',x:D.x,y:D.y-6,t:D.t,r:70,c:'#ffb060'});
  for(const h of near(D.x,D.y,72))dmgH(h,60,'#ffb060',90,h.x-D.x,h.y-D.y);const [cx,cy]=center();D.ar=D.ar.filter(a=>{if(Math.hypot(a.x-cx,a.y-cy)<80){D.fx.push({k:'spark',x:a.x,y:a.y,t:D.t});return false}return true});try{sfx(160,.3,'square',.05,60)}catch(e){}}
 function roar(){if(!D||D.dead||D.gauge<100||D.dv)return;D.gauge=0;D.st='roar';D.st0=D.t;D.banner={t:D.t,txt:'유성 포효!',sub:'',c:'#ff8a3a'};D.shake=Math.max(D.shake,1);
  const L=D.H.filter(h=>h.dieT==null).sort(()=>Math.random()-.5).slice(0,12);for(const h of D.H)if(h.dieT==null)h.stun=D.t+1.4;
  L.forEach((h,i)=>D.mt.push({x:h.x+rnd(-8,8),y:h.y+rnd(-4,4),t0:D.t+.25+i*.12,r:38}));for(let i=L.length;i<6;i++)D.mt.push({x:rnd(AX+30,AX+AW-30),y:rnd(AY+50,AY+AH-10),t0:D.t+.3+i*.12,r:38});try{sfx(90,1.4,'sawtooth',.07,40)}catch(e){}}
 /* ---------- 매 프레임 ---------- */
 function tick(dt){const t=(D.t+=dt);if(D.shake>0)D.shake=Math.max(0,D.shake-dt*2.5);
  /* 웨이브 */if(!D.dead){if(D.next!=null){D.next-=dt;if(D.next<=0){D.next=null;nextWave()}}
   if(D.q.length){D.spawnT-=dt;if(D.spawnT<=0){D.spawnT=.28;D.H.push(hero(D.q.shift()))}}
   else if(D.next==null&&D.wave>0&&!D.H.some(h=>h.dieT==null)){D.hp=Math.min(D.max,D.hp+D.max*.2);D.banner={t,txt:'WAVE '+D.wave+' 클리어!',sub:'체력 20% 회복',c:'#8affc8'};D.next=2.6;try{sfx(523,.3,'triangle',.06,1046)}catch(e){}}}
  /* 드래곤 움직임 */if(!D.dead){const [ix,iy]=moveInput();
   if(D.dv){const q=Math.min(1,(t-D.dv.t0)/.55),e=q<.5?2*q*q:1-Math.pow(-2*q+2,2)/2;D.x=D.dv.sx+(D.dv.tx-D.dv.sx)*e;D.y=D.dv.sy+(D.dv.ty-D.dv.sy)*e;D.dv.h=Math.sin(q*Math.PI)*46;
    if(q>=1){D.dv=null;D.shake=Math.max(D.shake,.9);D.fx.push({k:'ring',x:D.x,y:D.y,t,r:66,c:'#ff6a2a'});D.fx.push({k:'ring',x:D.x,y:D.y,t:t+.06,r:44,c:'#ffe08a'});for(const h of near(D.x,D.y,66))dmgH(h,95,'#ff8a3a',80,h.x-D.x,h.y-D.y);try{sfx(60,.5,'sawtooth',.08,30)}catch(e){}}}
   else{const sp=D.breath?45:100;D.x=Math.max(AX+62,Math.min(AX+AW-62,D.x+ix*sp*dt));D.y=Math.max(AY+80,Math.min(AY+AH-6,D.y+iy*sp*dt));if(Math.abs(ix)>.15&&!D.breath)D.face=ix>0?1:-1;D.mv=Math.hypot(ix,iy)>.1}
   if(D.st!=='move'&&!D.breath&&!D.dv&&t-D.st0>({tail:.65,roar:1.7}[D.st]||.3))D.st='move'}
  /* 불 숨결 */if(D.breath){const B=D.breath,e=t-B.t0;if(e>B.dur||D.dead){D.breath=null;D.st='move'}else{B.tick-=dt;if(B.tick<=0){B.tick=.1;const [mx,my]=mouth(),[ix,iy]=moveInput(),a=Math.atan2(iy*.7,D.face);
    for(const h of D.H){if(h.dieT!=null)continue;const dx=h.x-mx,dy=(h.y-16)-my,d=Math.hypot(dx,dy);if(d>175)continue;let da=Math.atan2(dy,dx)-a;da=Math.atan2(Math.sin(da),Math.cos(da));if(Math.abs(da)<.42)dmgH(h,h.c==='shield'?10:18,'#ffb040',10,dx,dy)}}}}
  /* 유성 */for(const m of D.mt){if(!m.done&&t>=m.t0+.55){m.done=1;D.shake=Math.max(D.shake,.5);D.fx.push({k:'boom',x:m.x,y:m.y,t,r:m.r});for(const h of near(m.x,m.y,m.r))dmgH(h,220,'#ff6a2a',60,h.x-m.x,h.y-m.y)}}D.mt=D.mt.filter(m=>t<m.t0+1);
  /* 용사 */const [cx,cy]=center();
  for(const h of D.H){if(h.dieT!=null)continue;if(h.born>0){h.born-=dt;continue}const k=CL[h.c];h.x+=h.kx*dt;h.y+=h.ky*dt;h.kx*=Math.pow(.02,dt);h.ky*=Math.pow(.02,dt);
   if(h.stun>t){continue}const dx=D.x-h.x,dy=D.y-h.y,d=Math.hypot(dx,dy)||1;h.face=dx>0?1:-1;let vx=0,vy=0;
   const want=h.c==='sword'||h.c==='shield'?28:h.c==='bow'?150:h.c==='mage'?125:165;
   if(d>want+8){vx=dx/d;vy=dy/d}else if(d<want-14&&want>40){vx=-dx/d;vy=-dy/d}else if(want>40){vx=-dy/d*.5*(h.ang||1);vy=dx/d*.5*(h.ang||1)}
   h.mv=!!(vx||vy);if(h.mv){h.x+=vx*h.sp*dt;h.y+=vy*h.sp*dt*.8;h.walk+=dt*9}
   h.cd-=dt;if(h.cd<=0&&!D.dead){
    if((h.c==='sword'||h.c==='shield')&&d<40){if(!h.wind){h.wind=t;h.cd=.28}else{h.wind=0;h.cd=rnd(.8,1.1);h.sw=t;if(Math.hypot(D.x-h.x,D.y-h.y)<44)hurtD(h.dmg)}}
    else if(h.c==='bow'&&d<240){h.cd=rnd(1.6,2.2);h.sw=t;const sx=h.x,sy=h.y-20,ax=cx-sx,ay=cy-sy,l=Math.hypot(ax,ay)||1;D.ar.push({x:sx,y:sy,vx:ax/l*170,vy:ay/l*170,t,dmg:h.dmg})}
    else if(h.c==='mage'&&d<220){h.cd=rnd(3.2,4);h.sw=t;D.tel.push({x:D.x+rnd(-10,10),y:D.y+rnd(-6,6),t0:t,dur:1.1,r:30,dmg:h.dmg})}
    else if(h.c==='priest'){h.cd=rnd(4,5);h.sw=t;D.fx.push({k:'heal',x:h.x,y:h.y,t});for(const o of D.H)if(o.dieT==null&&Math.hypot(o.x-h.x,o.y-h.y)<90)o.hp=Math.min(o.max,o.hp+o.max*.25)}
    else h.cd=.3}
   h.x=Math.max(AX+8,Math.min(AX+AW-8,h.x));h.y=Math.max(AY+30,Math.min(AY+AH-3,h.y))}
  /* 용사끼리 겹치지 않게 */const L=D.H.filter(h=>h.dieT==null);for(let i=0;i<L.length;i++)for(let j=i+1;j<L.length;j++){const a=L[i],b=L[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);if(d>0&&d<12){const p=(12-d)/2/d;a.x-=dx*p;a.y-=dy*p;b.x+=dx*p;b.y+=dy*p}}
  D.H=D.H.filter(h=>h.dieT==null||t-h.dieT<.5);
  /* 화살 · 마법 원 */for(const a of D.ar){a.x+=a.vx*dt;a.y+=a.vy*dt;const [x2,y2]=center();if(!a.hit&&Math.hypot(a.x-x2,a.y-y2)<24){a.hit=1;hurtD(a.dmg)}}D.ar=D.ar.filter(a=>!a.hit&&t-a.t<2.5&&a.x>AX-20&&a.x<AX+AW+20&&a.y>AY-20&&a.y<AY+AH+20);
  for(const c of D.tel){if(!c.done&&t>=c.t0+c.dur){c.done=1;D.fx.push({k:'boom',x:c.x,y:c.y,t,r:c.r,c:'#b48aff'});if(Math.hypot(D.x-c.x,(D.y-c.y)*1.3)<c.r+10)hurtD(c.dmg)}}D.tel=D.tel.filter(c=>t<c.t0+c.dur+.1);
  D.fx=D.fx.filter(f=>t-f.t<.8);D.pops=D.pops.filter(p=>t-p.t<.9)}
 function pose(){const e=D.t-D.st0;if(D.dead)return dPose('die',D.t-D.dead,D.t,false,0);
  if(D.breath)return dPose('breath',1+Math.min(.95,e),D.t,false,0);if(D.dv)return dPose('gust',.6+e,D.t,false,0);
  if(D.st==='tail')return dPose('tail',e*2.2,D.t,false,0);if(D.st==='roar')return dPose('roar',e,D.t,false,0);return dPose('move',0,D.t,D.mv,0)}
 const mouth=()=>{const [mx,my]=VD.mouth(pose());return [D.x+D.face*mx/.8*S,D.y-HOV-(D.dv?D.dv.h:0)+my/.8*S]};
 /* ---------- 그리기 ---------- */
 const DC={cv:document.createElement('canvas'),key:''},HV=window.__HV;
 function drawDragon(c){const Q=pose(),tr=TRI(),fl=D.t-D.flash<.08,key=[D.st,D.breath?1:0,D.dv?1:0,D.dead?1:0,Math.floor(D.t*12),tr,fl?1:0].join('|');
  const W2=150,H2=130,OX=78,OY=112;if(DC.key!==key){DC.key=key;const cv=DC.cv;cv.width=Math.ceil(W2/PXU);cv.height=Math.ceil(H2/PXU);const o=cv.getContext('2d');o.setTransform(1/PXU,0,0,1/PXU,OX/PXU,OY/PXU);o.scale(S/.8*.8,S/.8*.8);
   VD.PXM.on=1;VD.PXM.k=1.5;try{VD.draw(o,FP[tr],Q,D.t,D.hp<D.max*.3,false)}catch(e){}finally{VD.PXM.on=0;VD.PXM.k=1}try{VD.pix(cv,FP[tr])}catch(e){}
   if(fl){o.setTransform(1,0,0,1,0,0);o.globalCompositeOperation='source-atop';o.fillStyle='rgba(255,255,255,.35)';o.fillRect(0,0,cv.width,cv.height);o.globalCompositeOperation='source-over'}}
  const lift=HOV+(D.dv?D.dv.h:0)+Math.sin(D.t*3.2)*1.5;c.save();c.globalAlpha=Math.max(.15,.4-lift/200);c.fillStyle='#000';c.beginPath();c.ellipse(D.x,D.y,30,8,0,0,TAU);c.fill();c.restore();
  c.save();c.translate(D.x,D.y-lift);c.scale(D.face,1);c.imageSmoothingEnabled=false;if(D.dead)c.globalAlpha=Math.max(0,1-(D.t-D.dead)/1.6);c.drawImage(DC.cv,-OX,-OY,W2,H2);c.restore()}
 function drawHero(c,h){const t=D.t;let out=null;let f=0,b=0;if(h.mv){f=((Math.floor(h.walk/(Math.PI/2))%4)+4)%4;b=f%2?-1:0}
  const sv2=HV?[HV.view,HV.sw]:null;try{if(HV){HV.view=h.mv?'side':'front';HV.sw=null}out=ch2Render(h.ch,f,b,false,0)}catch(e){}finally{if(HV){HV.view=sv2[0];HV.sw=sv2[1]}}
  const al=h.dieT!=null?Math.max(0,1-(t-h.dieT)/.5):h.born>0?1-h.born/.45:1;c.save();c.globalAlpha=al*.35;c.fillStyle='#000';c.beginPath();c.ellipse(h.x,h.y,8,2.6,0,0,TAU);c.fill();c.globalAlpha=al;c.imageSmoothingEnabled=false;
  const k=CL[h.c],sw=t-(h.sw||-9),hx=h.x+h.face*5,hy=h.y-12;
  /* 무기 */c.save();c.translate(hx,hy);c.scale(h.face,1);
  if(h.c==='sword'){const a=h.wind?-1.8:sw<.18?(-1.6+sw/.18*2.6):-.5;c.rotate(a);c.fillStyle='#3a2a1a';c.fillRect(-1,-1,3,3);c.fillStyle=k.col;c.fillRect(1,-.5,12,2)}
  else if(h.c==='shield'){c.fillStyle='#6a4a1a';c.fillRect(-1,-8,8,13);c.fillStyle=k.col;c.fillRect(0,-7,6,11);c.fillStyle='#fff4';c.fillRect(1,-6,2,9)}
  else if(h.c==='bow'){c.strokeStyle='#8a5a2a';c.lineWidth=1.5;c.beginPath();c.arc(2,-4,8,-1.2,1.2);c.stroke();c.strokeStyle='#eee';c.lineWidth=.6;c.beginPath();c.moveTo(2+Math.cos(-1.2)*8,-4+Math.sin(-1.2)*8);c.lineTo(sw<.25?-2:2+Math.cos(1.2)*8*.0,-4);c.lineTo(2+Math.cos(1.2)*8,-4+Math.sin(1.2)*8);c.stroke()}
  else{c.fillStyle='#6a4a2a';c.fillRect(2,-14,1.6,20);c.fillStyle=k.col;c.beginPath();c.arc(2.8,-15,2.6+(sw<.4?1.5:0),0,TAU);c.fill()}c.restore();
  if(out){const fl=t-h.hitT<.08;if(h.face<0){c.save();c.translate(Math.round(h.x-20+40),Math.round(h.y-41));c.scale(-1,1);c.drawImage(out,0,0,40,48);c.restore()}else c.drawImage(out,Math.round(h.x-20),Math.round(h.y-41),40,48);
   if(fl){c.globalAlpha=al*.55;c.fillStyle='#fff';c.fillRect(h.x-7,h.y-30,14,30)}}
  if(h.stun>t&&h.dieT==null){c.globalAlpha=al;c.fillStyle='#ffe08a';for(let i=0;i<3;i++){const a=t*6+i*2.1;c.fillRect(h.x+Math.cos(a)*7-1,h.y-38+Math.sin(a)*2-1,2,2)}}
  if(h.wind&&h.dieT==null){c.globalAlpha=.8;c.fillStyle='#ff5a4a';c.fillRect(h.x-1,h.y-50,2,5)}
  /* 체력 막대 */if(h.dieT==null&&h.hp<h.max){c.globalAlpha=.9;c.fillStyle='#000a';c.fillRect(h.x-9,h.y-45,18,3);c.fillStyle=k.col;c.fillRect(h.x-9,h.y-45,18*Math.max(0,h.hp/h.max),3)}
  c.restore()}
 function draw(now){const c=ctx,t=D.t;c.save();c.setTransform(SS,0,0,SS,0,0);c.imageSmoothingEnabled=false;
  if(D.shake>0)c.translate(rnd(-1,1)*D.shake*3,rnd(-1,1)*D.shake*3);
  let bg=null;try{bg=WB.EXT&&WB.EXT.arena()}catch(e){}if(bg)c.drawImage(bg,0,0,W,H);else{c.fillStyle='#1a0a08';c.fillRect(0,0,W,H)}
  /* 바닥 예고: 마법 원 · 유성 */for(const m of D.tel){const q=(t-m.t0)/m.dur;c.save();c.globalAlpha=.25+.4*q;c.strokeStyle='#b48aff';c.lineWidth=1.5;c.beginPath();c.ellipse(m.x,m.y,m.r,m.r*.42,0,0,TAU);c.stroke();c.fillStyle='#b48aff44';c.beginPath();c.ellipse(m.x,m.y,m.r*q,m.r*.42*q,0,0,TAU);c.fill();c.restore()}
  for(const m of D.mt){if(m.done)continue;const q=Math.max(0,(t-m.t0)/.55);if(t<m.t0)continue;c.save();c.globalAlpha=.6;c.strokeStyle='#ff6a2a';c.lineWidth=1.5;c.beginPath();c.ellipse(m.x,m.y,m.r,m.r*.42,0,0,TAU);c.stroke();
   const fy=m.y-200*(1-q);c.globalCompositeOperation='lighter';const g=c.createRadialGradient(m.x+40*(1-q),fy,0,m.x+40*(1-q),fy,9);g.addColorStop(0,'#fff6c0');g.addColorStop(.5,'#ff8a2a');g.addColorStop(1,'rgba(255,60,10,0)');c.fillStyle=g;c.fillRect(m.x+40*(1-q)-10,fy-10,20,20);c.restore()}
  /* 몸들(y 순서) */const L=D.H.map(h=>({y:h.y,f:()=>drawHero(c,h)}));L.push({y:D.y,f:()=>drawDragon(c)});L.sort((a,b)=>a.y-b.y).forEach(o=>o.f());
  /* 불 숨결 */if(D.breath){const [mx,my]=mouth(),[ix,iy]=moveInput(),a=Math.atan2(iy*.7,D.face);c.save();c.globalCompositeOperation='lighter';
   for(let i=0;i<44;i++){const q=((t*2.6+i/44)%1),aa=a+Math.sin(i*7.3)*.36,Lq=q*170,r=2+q*12,x=mx+Math.cos(aa)*Lq,y=my+Math.sin(aa)*Lq;const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,q<.3?'#fff8d0':'#ffb040');g.addColorStop(1,'rgba(255,60,10,0)');c.globalAlpha=(1-q)*.85;c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2)}c.restore()}
  /* 화살 */c.save();for(const a of D.ar){const l=Math.hypot(a.vx,a.vy)||1;c.strokeStyle='#e8d8b0';c.lineWidth=1.2;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(a.x-a.vx/l*9,a.y-a.vy/l*9);c.stroke();c.fillStyle='#ccc';c.fillRect(a.x-1,a.y-1,2,2)}c.restore();
  /* 효과 */for(const f of D.fx){const e=t-f.t;if(e<0)continue;c.save();if(f.k==='ring'){const q=e/.45;c.globalAlpha=Math.max(0,1-q);c.strokeStyle=f.c;c.lineWidth=3;c.beginPath();c.ellipse(f.x,f.y,f.r*Math.min(1,q*1.4),f.r*.42*Math.min(1,q*1.4),0,0,TAU);c.stroke()}
   else if(f.k==='boom'){const q=e/.5;c.globalCompositeOperation='lighter';c.globalAlpha=Math.max(0,1-q);const g=c.createRadialGradient(f.x,f.y-6,0,f.x,f.y-6,f.r*1.2);g.addColorStop(0,'#fff6c0');g.addColorStop(.4,f.c||'#ff8a2a');g.addColorStop(1,'rgba(255,60,10,0)');c.fillStyle=g;c.fillRect(f.x-f.r*1.2,f.y-6-f.r*1.2,f.r*2.4,f.r*2.4)}
   else if(f.k==='heal'){const q=e/.7;c.globalAlpha=Math.max(0,1-q);c.strokeStyle='#8aff9a';c.lineWidth=2;c.beginPath();c.ellipse(f.x,f.y,90*q,38*q,0,0,TAU);c.stroke()}
   else if(f.k==='spark'){c.globalAlpha=Math.max(0,1-e/.3);c.fillStyle='#fff';c.fillRect(f.x-2,f.y-2,4,4)}c.restore()}
  c.save();c.textAlign='center';for(const p of D.pops){const e=t-p.t;c.globalAlpha=Math.max(0,1-e/.9);c.font='bold 7px sans-serif';c.fillStyle=p.c;c.fillText(p.txt,p.x,p.y-e*16)}c.restore();
  hud(c,now);c.restore()}
 function hud(c,now){const t=D.t;c.save();c.textBaseline='middle';
  /* 왼쪽 위: 이름 · 웨이브 · 처치 */c.fillStyle='#05070acc';c.fillRect(AX,4,150,24);c.fillStyle='#ff6a2a';c.fillRect(AX,4,3,24);c.font='900 11px sans-serif';c.fillStyle='#fff';c.fillText('WAVE '+Math.max(1,D.wave),AX+8,16);
  c.font='700 8px sans-serif';c.fillStyle='#ffb060';c.fillText('🐉 내가 드래곤',AX+64,12);c.fillStyle='#e8dcc8';c.fillText('쓰러뜨린 용사 '+num(D.kills)+'명',AX+64,22);
  /* 가운데 위: 드래곤 체력 */const bw=220,bx=W/2-bw/2+40,by=8;c.fillStyle='#05070acc';c.fillRect(bx-6,3,bw+12,27);c.font='800 8px sans-serif';c.fillStyle='#ffd8b0';c.fillText('내 드래곤 체력',bx,by+3);c.textAlign='right';c.fillStyle='#c8b8a8';c.fillText(num(D.hp)+' / '+num(D.max)+' · 남은 용사 '+(D.H.filter(h=>h.dieT==null).length+D.q.length),bx+bw,by+3);c.textAlign='left';
  c.fillStyle='#2a0806';c.fillRect(bx,by+10,bw,7);const q=D.hp/D.max,g=c.createLinearGradient(bx,0,bx+bw,0);g.addColorStop(0,'#ff2a1a');g.addColorStop(1,'#ffb040');c.fillStyle=g;c.fillRect(bx,by+10,bw*q,7);c.fillStyle='#ffffff44';c.fillRect(bx,by+10,bw*q,2);
  /* 아래: 기술 4칸 */const K=[['J','불 숨결',D.cd.b,1.5],['K','급강하',D.cd.d,4],['F','꼬리',D.cd.t,2.6],['C','유성 포효',null,0]],sx=W/2-4*30;
  K.forEach(([k,n,cd,full],i)=>{const x=sx+i*60,y=H-30;c.fillStyle='#05070acc';c.fillRect(x,y,56,24);let r=0;if(cd!=null)r=Math.max(0,(cd-t)/full);else r=1-D.gauge/100;
   c.fillStyle=i===3&&D.gauge>=100?'#ffd16655':'#ff6a2a22';c.fillRect(x,y,56,24);if(r>0){c.fillStyle='#000a';c.fillRect(x,y,56,24*r)}c.strokeStyle=i===3&&D.gauge>=100&&Math.floor(now/200)%2?'#ffd166':'#ff6a2a88';c.lineWidth=1;c.strokeRect(x+.5,y+.5,55,23);
   c.font='900 9px sans-serif';c.fillStyle='#ffd166';c.fillText(k,x+5,y+8);c.font='700 8px sans-serif';c.fillStyle='#fff';c.fillText(n,x+5,y+18);if(i===3){c.textAlign='right';c.fillStyle='#ffd166';c.fillText(Math.floor(D.gauge)+'%',x+52,y+8);c.textAlign='left'}});
  /* 가운데 큰 글씨 */if(D.banner){const e=t-D.banner.t;if(e<2.2){c.globalAlpha=Math.min(1,e*4,(2.2-e)*2);c.textAlign='center';c.font='900 22px serif';c.lineWidth=5;c.strokeStyle='#1a0604';c.strokeText(D.banner.txt,W/2,AY+80);c.fillStyle=D.banner.c||'#ffd166';c.fillText(D.banner.txt,W/2,AY+80);
   if(D.banner.sub){c.font='700 10px sans-serif';c.lineWidth=3;c.strokeText(D.banner.sub,W/2,AY+100);c.fillStyle='#fff';c.fillText(D.banner.sub,W/2,AY+100)}c.globalAlpha=1;c.textAlign='left'}else D.banner=null}
  c.restore()}
 /* ---------- 조작: 공격 · 대시 · 패링 · 궁극기 단추와 키를 드래곤 기술로 ---------- */
 if(typeof doAttack==='function'){const f=doAttack;doAttack=function(){if(mode==='db183'){if(D&&!paused)breath();return}return f.apply(this,arguments)}}
 if(typeof doDash==='function'){const f=doDash;doDash=function(){if(mode==='db183'){if(D&&!paused)dive();return}return f.apply(this,arguments)}}
 if(typeof tryParry==='function'){const f=tryParry;tryParry=function(){if(mode==='db183'){if(D&&!paused)tail();return}return f.apply(this,arguments)}}
 if(typeof tryUlt==='function'){const f=tryUlt;tryUlt=function(){if(mode==='db183'){if(D&&!paused)roar();return}return f.apply(this,arguments)}}
 addEventListener('keydown',e=>{if(typeof mode==='undefined'||mode!=='db183'||!D||paused||e.repeat)return;if(e.code==='KeyF'||e.code==='KeyL'){e.preventDefault();tail()}else if(e.code==='KeyC'){e.preventDefault();roar()}});
 /* ---------- 화면: 이 모드일 때는 이 파일이 그린다 ---------- */
 {const f=frame;frame=function(){if(typeof mode==='undefined'||mode!=='db183'||!D)return f.apply(this,arguments);const now=performance.now(),dt=Math.min(.05,(now-(last||now))/1000);last=now;
   try{sched(now)}catch(e){}try{if(!paused)tick(dt);draw(now)}catch(e){console.error('db183',e)}
   try{const u=$('btnU');if(u){u.style.display='';if(typeof ultBtnPaint==='function')ultBtnPaint(D.gauge/100,D.gauge>=100)}}catch(e){}
   requestAnimationFrame(frame)}}
 {const f=toLobby;toLobby=function(){if(mode==='db183'){D=null;try{const u=$('btnU');if(u)u.style.display='none'}catch(e){}}return f.apply(this,arguments)}}
 /* ---------- 들어가는 곳: 소개 창 ---------- */
 function open(){try{document.getElementById('db183q')?.remove()}catch(e){}const s=sv(),ov=document.createElement('div');ov.id='db183q';
  ov.innerHTML='<div class="bx"><h3>🐉 내가 드래곤 <small>AI 용사 막기</small></h3><p class="d">이번엔 내가 대형 드래곤이에요! 몰려오는 AI 용사들을 불로 태워 막아요. 웨이브마다 10명 → 15명 → … → <b>30명</b>, 그 뒤로는 30명이 점점 강해져요.</p>'+
   '<div class="k"><div><b>J / 공격</b> 불 숨결 — 앞쪽 부채꼴(방향키로 위아래 조준)</div><div><b>K / 대시</b> 급강하 — 날아올라 내려찍기(그동안 안 맞음)</div><div><b>F / 패링</b> 꼬리 휘두르기 — 주변 밀쳐 내기 · 화살 쳐 내기</div><div><b>C / 궁극기</b> 유성 포효 — 게이지 100%면 유성 비</div></div>'+
   '<div class="k"><div>🗡 검사 · 🛡 방패병: 붙어서 공격 · 🏹 궁수: 화살 · 🔮 마법사: 바닥 원(피하기!) · ✨ 사제: 용사 치료(먼저 잡기)</div></div>'+
   '<div class="me">최고 기록 WAVE <b>'+(s.best.wave||0)+'</b> · 용사 <b>'+num(s.best.kills||0)+'</b>명 · 보상 처치 1명 🪙10 + 웨이브 🪙150 (하루 🪙'+num(DAY_CAP)+'까지)</div>'+
   '<div class="r"><button class="no">닫기</button><button class="go">🐉 드래곤으로 시작</button></div></div>';
  document.body.appendChild(ov);ov.querySelector('.no').onclick=()=>ov.remove();ov.querySelector('.go').onclick=()=>{ov.remove();try{gmSfx&&gmSfx('ok')}catch(e){}start()};ov.addEventListener('click',e=>{if(e.target===ov)ov.remove()})}
 const css=document.createElement('style');css.textContent=`#db183q{position:fixed;inset:0;z-index:9700;display:flex;align-items:center;justify-content:center;background:#000a}
 #db183q .bx{width:min(420px,92vw);max-height:92vh;overflow-y:auto;padding:16px;border-radius:16px;background:radial-gradient(120% 80% at 50% 0%,#4a1408,#160806 70%);border:2px solid #ff6a2a88;color:#f4e6d8;box-shadow:0 0 34px #ff4a1a55;font:13px/1.5 sans-serif}
 #db183q h3{margin:0 0 4px;color:#ffd166;font-size:20px}#db183q h3 small{font-size:11px;color:#ff9a6a;margin-left:6px}#db183q .d{font-size:12px;color:#d8c4b4;margin:0 0 8px}
 #db183q .k{background:#00000044;border-radius:10px;padding:6px 10px;font-size:12px;margin-bottom:8px}#db183q .k b{color:#ffd166}#db183q .me{margin:6px 2px 10px;font-size:12px}#db183q .me b{color:#ffd166}
 #db183q .r{display:flex;gap:8px}#db183q button{flex:1;font:inherit;font-weight:900;padding:11px;border-radius:11px;border:0;cursor:pointer}#db183q .no{background:#3a2a22;color:#e8d8c8}#db183q .go{background:linear-gradient(180deg,#ff8a3a,#d8361a);color:#fff;box-shadow:0 0 14px #ff4a1a88}`;document.head.appendChild(css);
 window.DB183={open,start,get D(){return D}};
}catch(e){console.error('DB183',e)}})();
