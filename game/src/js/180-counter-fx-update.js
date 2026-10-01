/* ================= 반격 시간 (원 클릭) ================= */
const VN2={overload:'과부하!',stun:'기절!',stuck:'손이 박혔다!'};
function startVuln(type,len){const beat=G.beat,b=G.boss;clearPhraseHazards();G.vuln={type,t0:beat,t1:beat+len};G.exposed=true;G.stagger=0;b.patrol=0;G.nextPlan=beat+len+RISE();G.finisherDone=false;G.nextCircle=performance.now()+420;G.ai=Math.floor(RND()*6);
 banner('반격 시간! '+({overload:'과부하',stun:'기절',stuck:'손이 박혔다'})[type]);sfx(type==='stun'?300:200,.3,'triangle',.06,type==='stun'?120:60);const g=bgeo();spawnPuff(b.x,g.coreY,10,type==='overload'?'#ff9a5c':'#c9d3d8');fxRing(b.x,g.coreY,performance.now(),700,120,'#ffe79a');G.shake=Math.max(G.shake,.25)}
function endVuln(beat){G.vuln=null;G.exposed=false;G.clickTarget=null;const b=G.boss;tweenBossNow(HOME.x,HOME.y,beat,beat+1.1);banner('보스 재가동 — 다음 공격에 대비!');G.shake=.25;sfx(120,.5,'sawtooth',.06,300);spawnPuff(b.x,bgeo().top,8,'#ffe79a');for(const h of b.hands){h.stuck=false;if(h.mode==='stuck')h.mode='idle'}}
function updateClickTarget(now){$('stickZone').style.pointerEvents=G.vuln?'none':'auto';if(!G.vuln||G.state!=='play'||G.cine){G.clickTarget=null;return}
 if(G.clickTarget&&now>G.clickTarget.expires){if(G.combo>2)G.pops.push({x:G.clickTarget.x,y:G.clickTarget.y-16,t:now,tx:'MISS',col:'#8a98a0'});G.combo=0;G.clickTarget=null;G.nextCircle=now+200}
 if(!G.clickTarget&&!G.finisherDone&&now>=(G.nextCircle||0)){const g=bgeo(),left=(G.vuln.t1-G.beat)*G.ms/1000,fin=!G.finisherDone&&left<=1.9&&left>.4;
  const A=[[g.x,g.coreY],[g.x,g.headY+8],[g.x-g.hf*U*.55,g.coreY+10],[g.x+g.hf*U*.55,g.coreY+10],[G.boss.hands[0].x,G.boss.hands[0].y],[G.boss.hands[1].x,G.boss.hands[1].y]];
  G.ai=(G.ai+1+Math.floor(RND()*2))%A.length;const a=fin?[g.x,g.coreY]:A[G.ai],r=(curWp().big||0)+(fin?28:(diff==='easy'?20:(diff==='hard'||diff==='extreme')?15:17)),life=fin?left*1000+300:(diff==='easy'?2100:(diff==='hard'||diff==='extreme')?1450:1750);
  G.clickTarget={x:clamp(a[0]+(fin?0:(RND()-.5)*10),AX+r+4,AX+AW-r-4),y:clamp(a[1]+(fin?0:(RND()-.5)*10),AY+r+8,AY+AH-r-4),r,born:now,life,expires:now+life,fin,key:(()=>{const pool=HITKEYS.filter(k=>k!==G.lastKey);const k=pool[Math.floor(RND()*pool.length)];G.lastKey=k;return k})()};if(fin)banner(isTouchUI()?'FINISH! 큰 원을 터치!':'FINISH! '+G.clickTarget.key+' 키!')}}
cv.addEventListener('pointerdown',e=>{if(dlg.active)return;if(mode==='boss'&&G.cine&&G.cine.type==='intro'&&performance.now()-G.cine.t0>900){G.cine.dur=0;return}});
function caveAttack(){if(!C||paused||dlg.active||C.state!=='walk')return;const now=performance.now();if(now<(P.atkCd||0))return;P.atkCd=now+260;
 let best=null,bd=24;for(const mb of C.mobs){if(!mb.alive)continue;const d=Math.hypot(P.x-mb.x,P.y-mb.y);if(d<bd){bd=d;best=mb}}
 const a=best?Math.atan2(best.y-P.y,best.x-P.x):Math.atan2(P.face.y||1,P.face.x||0);
 C.slashFx.push({x:P.x,y:P.y-11,a,t:now,hit:!!best});
 P.lungeT=now;P.lungeA=a;P.lungeDur=150;
 initAudio();
 if(best){best.alive=false;C.shake=Math.max(C.shake,.55);C.flash=Math.max(C.flash,.35);C.hitstop=now+65;C.rings.push({x:best.x,y:best.y,t:now,dur:420,r1:56,col:'#c98cff'});sfx(340,.13,'square',.05,120);sfx(150,.1,'triangle',.04,60);sfx(480,.08,'sine',.03,900);banner('처치!');for(let i=0;i<26;i++)C.dust.push({x:best.x,y:best.y,vx:(RND()-.5)*150,vy:(RND()-.5)*150-30,l:.5,c:i%3?'#c98cff':'#eeddff'})}
 else{sfx(220,.07,'triangle',.03,60)}}
function doAttack(point){if(dlg.active){dlgAdvance();return}if(mode==='case'){caseAction();return}if(mode==='cave'){caveAttack();return}if(mode==='village'){villageInteract();return}if(mode==='boss'&&G&&G.cine&&G.cine.type==='revive'){if(!point)memClick(null);return}if(mode==='boss'&&G&&G.cine&&G.cine.type==='intro'){skipIntro();return}if(mode==='boss'&&!paused&&G.state==='play'&&!G.cine&&!G.vuln&&G.puz&&G.puz.type==='reflect'&&!G.puz.done){tryReflect();return}if(paused||mode!=='boss'||G.state!=='play'||!G.vuln||!point||G.cine)return;const c=G.clickTarget;if(!c||Math.hypot(point.x-c.x,point.y-c.y)>c.r+6)return;
 const now=performance.now();initAudio();G.clickTarget=null;G.nextCircle=now+300;G.swings++;G.combo++;G.maxCombo=Math.max(G.maxCombo,G.combo);
 P.lungeT=now;P.lungeA=Math.atan2(c.y-(P.y-8),c.x-P.x);P.lungeDur=c.fin?190:110;
 const w=win(),bf=G.beat,errMs=Math.abs(bf-Math.round(bf))*G.ms,onBeat=errMs<=w.p,nearBeat=errMs<=w.g;if(onBeat||nearBeat)G.onbeat++;
 const timing=onBeat?'perfect':nearBeat?'good':'ok',tMult=onBeat?1.35:nearBeat?1.12:1;
 const base=(diff==='easy'?1.15:(diff==='hard'||diff==='extreme')?.92:1)*(78+Math.min(G.combo,15)*3),crit=RND()<curWp().crit,dmg=Math.round(base*(c.fin?3.2:1)*tMult*((G.vuln&&G.vuln.bonus)||1)*curWp().dmg*(1+(curPet().dmg||0))*(crit?1.8:1));G.hp=Math.max(0,G.hp-dmg);G.score+=dmg*10+(onBeat?60:nearBeat?20:0);G.hurt=.16;G.shake=c.fin?.4:.13;G.hitstop=now+(c.fin?170:45);
 const jd=c.fin?'FINISH':onBeat?'PERFECT':nearBeat?'GOOD':'HIT',jcol=c.fin?'#ffffff':onBeat?'#ffe79a':nearBeat?'#a6f5c6':'#8dcdf5';
 G.shots.push({x0:P.x,y0:P.y-8,x1:c.x,y1:c.y,t:now,jd});G.slashFx.push({x:c.x,y:c.y,a:RND()*Math.PI,t:now,fin:c.fin,col:curWp().trail});
 G.pops.push({x:c.x,y:c.y-18,t:now,tx:(crit?'CRIT! ':'')+(c.fin?'FINISH! -':(onBeat?'PERFECT! -':nearBeat?'GOOD -':'HIT -'))+dmg,col:jcol});spawnPuff(c.x,c.y,c.fin?26:14,jcol);fxRing(c.x,c.y,now,c.fin?600:340,c.fin?90:36,c.fin?'#ffffff':jcol);
 sfx(300+Math.min(G.combo,14)*24+(c.fin?200:0)+(onBeat?60:0),.15,'triangle',.06,90);sfx(c.fin?90:180,.14,'square',.05,60);if(G.combo%5===0)P.hp=Math.min(P.maxhp,P.hp+2);
 if(G.combo>0&&G.combo%10===0){const tier=G.combo>=50?'#ff2d55':G.combo>=30?'#ffb020':'#ffe79a';G.shake=Math.max(G.shake,.35);G.flash=Math.max(G.flash,.26);G.pops.push({x:P.x,y:P.y-30,t:now,tx:G.combo+' COMBO!',col:tier});spawnPuff(P.x,P.y,20,tier);fxRing(P.x,P.y,now,750,120,tier);sfx(420+Math.min(G.combo,60)*6,.22,'triangle',.08,240)}
 if(c.fin){G.finisherDone=true;G.flash=Math.max(G.flash,.3);P.hp=Math.min(P.maxhp,P.hp+5);G.vuln.t1=Math.min(G.vuln.t1,G.beat+.9)}
 spOnHit(now,c.fin);sfx(curWp().hitF,.08,'triangle',.04,curWp().hitF*1.5);
 if(G.hp<=0)startDying(now)}
/* ================= 연출: 입장 · 각성 · 처치 ================= */
function startPhaseCine(now,tgt){clearPhraseHazards();G.vuln=null;G.exposed=false;G.clickTarget=null;G.phase=tgt;G.crash=true;const g=bgeo();G.cine={type:'phase',t0:now,dur:3300,ph:tgt};G.hitstop=now+300;G.shake=.9;G.flash=.75;P.inv=Math.max(P.inv,now+4200);
 sfx(60,1,'sawtooth',.1,30);sfx(120,.7,'square',.06,600);G.nextPlan=1e9;tweenBossNow(HOME.x,HOME.y,G.beat,G.beat+.8);
 for(let i=0;i<30;i++)G.parts.push({x:g.x+(RND()-.5)*g.w,y:g.top+RND()*(g.y-g.top),vx:(RND()-.5)*280,vy:-RND()*220-40,life:1.3,max:1.3,col:i%3?G.B.pal[1]:G.B.pal[3],s:3+Math.floor(RND()*3)});
 fxRing(g.x,g.coreY,now,900,300,'#ffffff');fxRing(g.x,g.coreY,now+120,1100,340,tgt>=2?'#ff2d55':'#ffb020');fxRing(g.x,g.coreY,now+260,1300,380,G.B.c);if(tgt>=2)awakenStart(now)}
function updateCine(now,beat){const c=G.cine;if(!c)return;if(c.type==='revive'){updateRevive(now,beat);return}if(c.type==='phase'&&now>=c.t0+c.dur){G.cine=null;G.nextPlan=beat+1.5;banner('PHASE '+(G.phase+1)+' — 각성');P.inv=Math.max(P.inv,now+700)}}
function updateIntro(now){const c=G.cine;if(!c||c.type!=='intro')return;entTick(now);const p=(now-c.t0)/Math.max(1,c.dur);
 if(p>.38&&G.boss.dorm&&c.dur>0){G.boss.dorm=false;G.shake=.8;G.flash=.5;sfx(60,1.1,'sawtooth',.1,28);const g=bgeo();fxRing(g.x,g.coreY,now,900,260,'#ffffff');fxRing(g.x,g.coreY,now+150,1100,320,G.B.c);spawnPuff(g.x,g.y,18,G.B.pal[2])}
 if(now>=c.t0+c.dur){G.cine=null;G.boss.dorm=false;entEnd();const f=G.afterIntro;G.afterIntro=null;if(f)f()}}
function startDying(now){if(G.cine&&G.cine.type==='revive'){G.hp=Math.max(1,G.hp);return}if(tryRevive(now))return;clearPhraseHazards();G.state='dying';G.dyingAt=now;G.exposed=false;G.vuln=null;G.clickTarget=null;G.hitstop=now+420;G.shake=1;G.flash=.9;sfx(70,1,'sawtooth',.1,28);P.inv=now+9999;const g=bgeo();fxRing(g.x,g.coreY,now,1000,320,'#ffffff');fxRing(g.x,g.coreY,now+200,1200,380,G.B.c)}
function updateDying(now){const t=now-G.dyingAt,g=bgeo();G.boss.dorm=false;
 if(t<3200){if(RND()<.5){const ex=g.x+(RND()-.5)*g.w*1.2,ey=g.top+RND()*(g.y-g.top);fxRing(ex,ey,now,420,26+RND()*22,['#ffe79a','#ff9a5c','#ffffff'][Math.floor(RND()*3)]);for(let i=0;i<6;i++)G.parts.push({x:ex,y:ey,vx:(RND()-.5)*200,vy:-RND()*160,life:.8,max:.8,col:['#ffe79a','#ff9a5c','#fff'][i%3],s:3});sfx(70+RND()*120,.14,'sawtooth',.04,30)}
  if(t>1000&&!G.dieHands){G.dieHands=1;for(const h of G.boss.hands){for(let i=0;i<10;i++)G.parts.push({x:h.x,y:h.y,vx:(RND()-.5)*160,vy:-RND()*160,life:1.2,max:1.2,col:G.B.pal[2],s:4});h.hide=true;h.mode='gone'}}
  if(RND()<.2)G.shake=Math.max(G.shake,.18)}
 else if(!G.dieFlash){G.dieFlash=1;G.flash=1;G.shake=1;stopMusic();sfx(50,1.4,'sawtooth',.12,20);for(let i=0;i<70;i++)G.parts.push({x:g.x,y:g.coreY,vx:(RND()-.5)*420,vy:(RND()-.5)*420,life:1.4,max:1.4,col:['#ffe79a','#ffffff',G.B.c][i%3],s:2+Math.floor(RND()*4)});fxRing(g.x,g.coreY,now,1400,420,'#ffffff');G.shard={x:g.x,y:g.coreY}}
 if(t>=4700)fightEnd(true)}
function skipIntro(){if(G.cine&&G.cine.type==='intro'&&performance.now()-G.cine.t0>900)G.cine.dur=0}
/* ================= 업데이트 ================= */
function updateBoss(now,dt){if(G.state==='epi'){if(G.cine)updateMemory(now);return}const beat=(now-G.T0)/G.ms;if(G.state!=='wake')G.beat=beat;
 if(G.state!=='wake')sched(now);if(now<G.hitstop)return;
 if(G.state==='wake'){stepBoss(0,dt);updateIntro(now);G.shake=Math.max(0,G.shake-dt);G.flash=Math.max(0,G.flash-dt);for(const p of G.parts){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=160*dt;p.life-=dt}G.parts=G.parts.filter(p=>p.life>0);G.fxr=G.fxr.filter(f=>now-f.t<f.dur);return}
 if(G.state==='count'&&beat>=0){G.state='play';banner('START!')}
 sched(now);
 if(G.state==='play'){
  if(G.cine)updateCine(now,beat);
  else{const r=G.hp/G.maxHp,tgt=r>.66?0:r>.33?1:2;if(tgt>G.phase)startPhaseCine(now,tgt);
   else{if(beat>=G.nextPlan)planNext(G.nextPlan);for(let i=0;i<G.evs.length;){const e=G.evs[i];if(e.t<=beat){G.evs.splice(i,1);e.fn()}else i++}
    for(const bm of G.beams)if(beat>=bm.t1&&!bm.fired){bm.fired=true;bm.firedAt=now;G.shake=Math.max(G.shake,.13);G.flash=Math.max(G.flash,.08);sfx(620,.18,'sawtooth',.055,150);spawnPuff(bm.ox,bm.oy,7,bm.col)}
    if(G.vuln&&beat>=G.vuln.t1)endVuln(beat)}}}
 updateClickTarget(now);G.exposed=!!G.vuln;
 if(G.state==='play'||G.state==='count'){stepPlayer(dt,now,(dx,dy)=>{P.x=clamp(P.x+dx,AX+6,AX+AW-6);P.y=clamp(P.y+dy,AY+10,AY+AH-3);pushOutBoss()},105);
  const pl=G.pull;if(pl&&G.state==='play'&&beat>=pl.t0&&beat<pl.t1){const sg=(pl.flip&&beat>=pl.flip)?-1:1,dx=pl.x-P.x,dy=pl.y-P.y,l=Math.hypot(dx,dy)||1;P.x=clamp(P.x+dx/l*pl.str*sg*dt,AX+6,AX+AW-6);P.y=clamp(P.y+dy/l*pl.str*sg*dt,AY+10,AY+AH-3);pushOutBoss()}}
 stepBoss(beat,dt);
 if(G.state==='play'){
  G.zones=G.zones.filter(z=>{if(beat>=z.t1&&z.after&&!z.fired){z.fired=true;z.after()}return beat<z.t2});
  G.beams=G.beams.filter(b=>beat<b.t2);G.saws=G.saws.filter(s=>beat<s.te);G.rings=G.rings.filter(r=>beat<r.t1);G.rotors=G.rotors.filter(r=>beat<r.t2);G.rockets=G.rockets.filter(r=>beat<r.t1);G.arcs=G.arcs.filter(a=>beat<a.t1);G.lanes=G.lanes.filter(l=>beat<l.t1+.6);G.turrets=G.turrets.filter(t=>t.alive&&beat<t.t1);G.laserPods=G.laserPods.filter(t=>beat<t.t2);G.movers=G.movers.filter(m=>beat<m.t1+.4);G.cones=G.cones.filter(c=>beat<c.t2);if(G.pull&&beat>=G.pull.t1)G.pull=null;
  G.bullets=G.bullets.filter(b=>{if(beat<b.t0)return true;const [x,y]=bpos(b,beat);return x>-16&&x<W+16&&y>-16&&y<H+16});
  aimRings(beat);hitTest(now,beat);updatePuzzle(now,beat,dt)}
 G.shake=Math.max(0,G.shake-dt);G.flash=Math.max(0,G.flash-dt);G.hurt=Math.max(0,G.hurt-dt);
 for(const p of G.parts){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=(p.g===undefined?160:p.g)*dt;p.life-=dt}G.parts=G.parts.filter(p=>p.life>0);
 G.pops=G.pops.filter(p=>now-p.t<900);G.shots=G.shots.filter(s=>now-s.t<200);G.slashFx=G.slashFx.filter(s=>now-s.t<320);G.fxr=G.fxr.filter(f=>now-f.t<f.dur);
 if(G.state==='play'){bossAmbient(now,dt)}
 if(G.state==='dying')updateDying(now);
 if(G.state==='dead'&&now-G.dyingAt>900)fightEnd(false)}
function bossAmbient(now,dt){const g=bgeo(),ph=G.phase,c=ph>=2?'#ff2d55':'#ffb020';
 if(ph>=1&&RND()<.3)G.parts.push({x:g.x+(RND()-.5)*g.w,y:g.top+RND()*30,vx:(RND()-.5)*20,vy:-60,life:.7,max:.7,col:c,s:2,g:40});
 if(G.vuln&&RND()<.5){const ty=G.vuln.type;G.parts.push({x:g.x+(RND()-.5)*g.w*.8,y:g.top+RND()*(g.y-g.top),vx:(RND()-.5)*40,vy:-70-RND()*40,life:.6,max:.6,col:ty==='overload'?(RND()<.5?'#ff9a5c':'#ffe79a'):'#9aa5ad',s:ty==='overload'?2:3,g:60})}
 const bi=G.bi;if(bi===2&&RND()<.35)G.parts.push({x:g.x+(RND()-.5)*g.w,y:g.y-RND()*30,vx:(RND()-.5)*16,vy:-40-RND()*40,life:1,max:1,col:RND()<.5?'#ffb020':'#ff6a20',s:2,g:-20});
 if(bi===3&&RND()<.3)G.parts.push({x:g.x+g.hf*U*.6,y:g.top-4,vx:(RND()-.5)*10,vy:-30-RND()*20,life:1.4,max:1.4,col:'#6a6a70',s:5,g:-10});
 if(bi===4&&RND()<.25)G.parts.push({x:AX+RND()*AW,y:AY+RND()*AH,vx:(RND()-.5)*10,vy:10+RND()*10,life:1.6,max:1.6,col:'#dffaff',s:1,g:0});
 if(bi===1&&RND()<.2){const x=g.x+(RND()-.5)*g.w;G.parts.push({x,y:g.top+RND()*20,vx:(RND()-.5)*120,vy:(RND()-.5)*120,life:.2,max:.2,col:'#ffffff',s:2,g:0})}}

