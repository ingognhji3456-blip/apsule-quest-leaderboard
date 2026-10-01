/* ================= 봉인 퍼즐: 피하기만 해서는 반격할 수 없다 ================= */
const PUZ_OF=['seq','lights','reflect','lure','color','count','color','count','seq','mix','lure','lights','color','lure','seq','count','reflect','color','lights','mix'];
const PUZ_INFO={seq:['순서 기억','보스가 보여준 순서대로 발판을 밟아라'],lights:['등불 켜기','밟은 등불과 양옆이 뒤집힌다 · 전부 켜라'],reflect:['되받아치기','금빛 조각이 가까이 오면 박자에 맞춰 공격(스페이스 · 모바일 터치)'],
 lure:['유인','보스가 돌진한다 · 기둥 뒤에 서서 기둥에 처박히게 하라'],color:['색 맞추기','보스 심장과 같은 색 구슬을 주워라 · 색은 4박마다 바뀐다'],count:['박자 세기','금색 섬광만 세고, 그 숫자 발판을 밟아라']};
const PUZ_SEEN={};
const SEQ_COL=['#ff5d6d','#5db4ff','#6dffa0','#ffd166'],ORB_COL=[['#ff5d5d','빨강'],['#5db4ff','파랑'],['#7dff8a','초록']];
function puzPads(list){return list.map(([x,y])=>({x,y,r:15,flash:0}))}
function startPuzzle(S,EV,kind,cl){let type=PUZ_OF[G.bi]||'seq';if(type==='mix'){G.puzN=(G.puzN||0)+1;type=['seq','lights','reflect','lure','color','count'][G.puzN%6]}
 const easy=diff==='easy',hard=diff==='hard'||diff==='extreme',ph=G.phase,pz={type,S,end:S+EV,kind,cl,done:false,prog:0,inPad:-1,fx:[]};
 if(type==='seq'){const n=(easy?3:hard?5:4)+(ph>=2?1:0);pz.pads=puzPads([[78,118],[402,118],[96,246],[384,246]]);pz.seq=Array.from({length:n},()=>Math.floor(RND()*4));pz.show=Math.ceil(S)+1;pz.idx=0}
 else if(type==='lights'){const n=5;pz.pads=puzPads([[96,250],[168,262],[240,268],[312,262],[384,250]]);pz.on=Array(n).fill(true);const k=easy?1:hard?3:2,used=new Set();while(used.size<k){const j=Math.floor(RND()*n);if(!used.has(j)){used.add(j);puzToggle(pz.on,j)}}if(pz.on.every(v=>v))puzToggle(pz.on,2)}
 else if(type==='reflect'){pz.need=easy?2:hard?4:3;pz.orbs=[];const cnt=pz.need+3;for(let i=0;i<cnt;i++){const t=S+2+i*((EV-5)/cnt);sch(t,()=>puzSpawnOrb(t))}}
 else if(type==='lure'){pz.pillars=[[96,208],[384,208],[168,262],[312,262]].map(([x,y])=>({x,y,r:13,broken:false}));const tries=2;for(let i=0;i<tries;i++)puzLure(S+4+i*((EV-7)/tries))}
 else if(type==='color'){pz.need=easy?2:hard?4:3;puzColorOrbs(pz)}
 else if(type==='count'){puzNewCount(pz,Math.ceil(S)+1)}
 G.puz=pz;const info=PUZ_INFO[type];banner(PUZ_SEEN[type]?'봉인 퍼즐 · '+info[0]:'봉인 퍼즐 · '+info[0]+' — '+info[1]);PUZ_SEEN[type]=1}
function puzToggle(on,j){for(const k of [j-1,j,j+1])if(k>=0&&k<on.length)on[k]=!on[k]}
function puzSpawnOrb(t){const pz=G.puz;if(!pz||pz.done||pz.type!=='reflect')return;const g=bgeo();pz.orbs.push({x:g.x,y:g.coreY,vx:0,vy:0,ref:false,born:t});sfx(520,.2,'triangle',.04,300)}
function puzColorOrbs(pz){const spots=[[70,110],[410,110],[90,250],[390,250],[240,262],[160,200],[320,200]].sort(()=>RND()-.5).slice(0,3);pz.orbs=spots.map(([x,y],i)=>({x,y,c:i}))}
function puzNewCount(pz,start){const easy=diff==='easy',total=easy?6:(diff==='hard'||diff==='extreme')?9:7,gold=[];for(let i=0;i<total;i++)gold.push(RND()<.55);if(gold.filter(Boolean).length<2){gold[0]=gold[2]=true}
 pz.flashes=gold.map((g,i)=>({t:start+i*(easy?1:.75),gold:g,col:g?'#ffd166':['#ff5d6d','#5db4ff','#b88aff'][i%3]}));pz.answer=gold.filter(Boolean).length;pz.showEnd=start+total*(easy?1:.75)+.5;
 const opts=new Set([pz.answer]);while(opts.size<4){const v=pz.answer+Math.floor(RND()*5)-2;if(v>=1)opts.add(v)}pz.nums=[...opts].sort(()=>RND()-.5);pz.pads=puzPads([[78,118],[402,118],[96,246],[384,246]])}
function puzLure(t){const tgt={x:0,y:0};
 sch(t,()=>{const pz=G.puz;if(!pz||pz.done)return;G.boss.warn=1;pz.aim={t0:t,lock:null};banner('돌진 조준! 기둥 뒤로!');sfx(160,.6,'sawtooth',.05,90)});
 sch(t+1.6,()=>{const pz=G.puz;if(!pz||pz.done||!pz.aim)return;tgt.x=P.x;tgt.y=P.y;pz.aim.lock={x:P.x,y:P.y}});
 sch(t+2,()=>{const pz=G.puz;if(!pz||pz.done)return;const b=G.boss,dx=tgt.x-b.x,dy=tgt.y-b.y,l=Math.hypot(dx,dy)||1,ux=dx/l,uy=dy/l;let hit=null,best=1e9;
  for(const p of pz.pillars){if(p.broken)continue;const px=p.x-b.x,py=p.y-b.y,proj=px*ux+py*uy;if(proj<0)continue;if(Math.abs(px*uy-py*ux)<p.r+20&&proj<best){best=proj;hit=p}}
  let dist=hit?Math.max(0,best-p0r(hit)):520;const ex=clamp(b.x+ux*dist,AX+30,AX+AW-30),ey=clamp(b.y+uy*dist,AY+60,AY+AH-4);
  tweenBossNow(ex,ey,t+2,t+2.45,p=>p*p);b.dash=true;b.dashHit=false;pz.aim=null;sfx(90,.4,'square',.08,40);
  sch(t+2.45,()=>{b.dash=false;b.warn=0;if(G.puz!==pz||pz.done)return;if(hit){hit.broken=true;G.shake=1;sfx(50,.8,'square',.1,25);spawnPuff(hit.x,hit.y,24,'#c9d3d8');puzSolved('기둥에 처박혔다','stun')}else{G.shake=.45;sch(t+3.1,()=>tweenBossNow(HOME.x,HOME.y,t+3.1,t+3.9))}})})}
const p0r=p=>p.r+14;
function puzSolved(msg,kind){const pz=G.puz;if(!pz||pz.done)return;pz.done=true;const now=performance.now(),g=bgeo(),cl=pz.cl;G.puzSolved=(G.puzSolved||0)+1;
 G.flash=Math.max(G.flash,.35);G.shake=Math.max(G.shake,.5);sfx(660,.3,'triangle',.07,1200);sfx(990,.35,'triangle',.05,1500);fxRing(g.x,g.coreY,now,900,170,'#ffe79a');
 G.pops.push({x:P.x,y:P.y-34,t:now,tx:'봉인 해제!',col:'#ffe79a'});startVuln(kind||pz.kind,cl*1.15);G.vuln.bonus=1.5;banner('봉인 해제! '+msg+' · 반격 피해 ×1.5')}
function puzzleTimeout(kind,cl){const pz=G.puz;if(pz&&!pz.done){banner('봉인이 아직 버틴다 · 퍼즐을 풀어야 반격할 수 있다!');sfx(110,.4,'sawtooth',.05,80);G.nextPlan=Math.ceil(G.beat)+1;return}if(!G.vuln&&!pz)startVuln(kind,cl)}
function continuePuzzle(S,EV,kind,cl){const pz=G.puz;pz.S=S;pz.end=S+EV;pz.kind=kind;pz.cl=cl;pz.rounds=(pz.rounds||1)+1;
 if(pz.type==='reflect'){const cnt=Math.max(2,pz.need-pz.prog)+2;for(let i=0;i<cnt;i++){const t=S+2+i*((EV-5)/cnt);sch(t,()=>puzSpawnOrb(t))}}
 else if(pz.type==='lure'){for(const p of pz.pillars)if(p.broken)p.broken=false;const tries=2;for(let i=0;i<tries;i++)puzLure(S+4+i*((EV-7)/tries))}
 else if(pz.type==='seq'){pz.idx=0;pz.show=Math.ceil(S)+1}
 else if(pz.type==='count'&&G.beat>=pz.showEnd)puzNewCount(pz,Math.ceil(S)+1);
 banner('봉인 퍼즐 계속 · '+PUZ_INFO[pz.type][0])}
function puzMiss(txt){const now=performance.now();G.pops.push({x:P.x,y:P.y-30,t:now,tx:txt,col:'#ff8a9a'});sfx(140,.2,'square',.05,70);G.combo=0}
function tryReflect(){const pz=G.puz,now=performance.now();if(!pz||pz.done)return;initAudio();let best=null,bd=34;for(const o of pz.orbs){if(o.ref)continue;const d=Math.hypot(o.x-P.x,o.y-(P.y-10));if(d<bd){bd=d;best=o}}
 P.lungeT=now;P.lungeA=best?Math.atan2(best.y-P.y,best.x-P.x):-Math.PI/2;P.lungeDur=120;
 if(!best){sfx(220,.06,'triangle',.02,80);return}const bf=G.beat,errMs=Math.abs(bf-Math.round(bf))*G.ms;
 if(errMs<=win().g*1.2){best.ref=true;const g=bgeo(),a=Math.atan2(g.coreY-best.y,g.x-best.x);best.vx=Math.cos(a)*360;best.vy=Math.sin(a)*360;G.pops.push({x:best.x,y:best.y-12,t:now,tx:'받아쳤다!',col:'#ffe79a'});sfx(760,.12,'square',.05,1400);G.shake=Math.max(G.shake,.2)}
 else{puzMiss('박자가 어긋났다')}}
function updatePuzzle(now,beat,dt){const pz=G.puz;if(!pz||pz.done||G.cine||G.vuln)return;
 let inP=-1;if(pz.pads)pz.pads.forEach((p,i)=>{if(Math.hypot(P.x-p.x,P.y-p.y)<p.r)inP=i});const entered=inP>=0&&inP!==pz.inPad;pz.inPad=inP;
 for(const p of pz.pads||[])p.flash=Math.max(0,p.flash-dt*2.5);
 if(pz.type==='seq'){const showing=beat<pz.show+pz.seq.length;if(entered&&!showing){const p=pz.pads[inP];if(inP===pz.seq[pz.idx]){pz.idx++;p.flash=1;p.ok=1;sfx(440+pz.idx*110,.12,'triangle',.05,600);if(pz.idx>=pz.seq.length)puzSolved('순서를 기억해냈다','overload')}else{p.flash=1;p.ok=0;pz.idx=0;pz.show=Math.ceil(beat)+1;puzMiss('틀렸다! 다시 보여준다')}}}
 else if(pz.type==='lights'){if(entered){puzToggle(pz.on,inP);pz.pads[inP].flash=1;sfx(pz.on[inP]?620:300,.1,'triangle',.04,500);if(pz.on.every(v=>v))puzSolved('모든 등불이 켜졌다','overload')}}
 else if(pz.type==='count'){if(entered&&beat>=pz.showEnd){const v=pz.nums[inP];pz.pads[inP].flash=1;if(v===pz.answer)puzSolved('정확히 '+v+'번','stun');else{puzMiss(v+'번이 아니다! 다시 센다');puzNewCount(pz,Math.ceil(beat)+1)}}}
 else if(pz.type==='color'){const cur=Math.floor(beat/4)%3;for(const o of pz.orbs){if(Math.hypot(P.x-o.x,P.y-5-o.y)<14){if(o.c===cur){pz.prog++;sfx(520+pz.prog*120,.14,'triangle',.05,900);G.pops.push({x:o.x,y:o.y-14,t:now,tx:pz.prog+'/'+pz.need,col:ORB_COL[o.c][0]});if(pz.prog>=pz.need){puzSolved('심장의 색을 읽어냈다','overload');return}}else{pz.prog=Math.max(0,pz.prog-1);hurtP(6,now);puzMiss('색이 다르다!')}puzColorOrbs(pz);break}}}
 else if(pz.type==='reflect'){const g=bgeo();for(const o of pz.orbs){if(o.ref){o.x+=o.vx*dt;o.y+=o.vy*dt;if(Math.hypot(o.x-g.x,o.y-g.coreY)<18){o.dead=true;pz.prog++;G.shake=Math.max(G.shake,.35);spawnPuff(g.x,g.coreY,12,'#ffe79a');sfx(300,.2,'square',.07,120);G.pops.push({x:g.x,y:g.coreY-20,t:now,tx:'균열 '+pz.prog+'/'+pz.need,col:'#ffe79a'});if(pz.prog>=pz.need){puzSolved('조각으로 봉인을 깼다','overload');return}}}
   else{const a=Math.atan2(P.y-10-o.y,P.x-o.x),sp=52*(D2().sp);o.vx+=(Math.cos(a)*sp-o.vx)*Math.min(1,dt*1.4);o.vy+=(Math.sin(a)*sp-o.vy)*Math.min(1,dt*1.4);o.x+=o.vx*dt;o.y+=o.vy*dt;if(Math.hypot(o.x-P.x,o.y-(P.y-8))<9){o.dead=true;hurtP(9,now)}}}
  pz.orbs=pz.orbs.filter(o=>!o.dead&&o.x>0&&o.x<W&&o.y>0&&o.y<H)}}
/* ---- 그리기 ---- */
function drawPadBase(p,col,lit){pcirc(p.x,p.y+2,p.r+1,'#000',.35);pcirc(p.x,p.y,p.r,'#1a2226');pcirc(p.x,p.y,p.r-2,lit?col:shade(col,.35));if(p.flash>0)pcirc(p.x,p.y,p.r+p.flash*8,p.ok===0?'#ff4d6d':'#ffffff',.4*p.flash);for(let i=0;i<12;i++){const a=i*TAU/12;R(p.x+Math.cos(a)*(p.r-1)-.5,p.y+Math.sin(a)*(p.r-1)-.5,1,1,'#3a4a50')}}
function drawIcon(k,x,y,s,col){ctx.fillStyle=col;if(k===0){for(let j=-s;j<=s;j++){const w=s-Math.abs(j);R(x-w,y+j,w*2+1,1,col)}}else if(k===1)pcirc(x,y,s,col);else if(k===2){for(let j=0;j<=s*2;j++){const w=j/2;R(x-w,y-s+j,w*2+1,1,col)}}else R(x-s,y-s,s*2+1,s*2+1,col)}
function drawPuzzle(now,beat){const pz=G.puz;if(!pz||G.cine)return;
 if(pz.type==='seq'){const showing=beat<pz.show+pz.seq.length&&beat>=pz.show-.2,si=Math.floor(beat-pz.show);pz.pads.forEach((p,i)=>{const hl=showing&&pz.seq[si]===i;drawPadBase(p,SEQ_COL[i],hl);drawIcon(i,p.x,p.y,5,hl?'#ffffff':SEQ_COL[i])})}
 else if(pz.type==='lights'){for(let i=0;i<pz.pads.length-1;i++){const a=pz.pads[i],b=pz.pads[i+1];line(a.x,a.y,b.x,b.y,4,(x,y,j)=>{if(j%2===0)RA(x,y,2,1,'#6a5a3a',.6)})}pz.pads.forEach((p,i)=>{const on=pz.on[i];drawPadBase(p,'#ffcf5a',on);R(p.x-2,p.y-3,4,7,'#3a2a12');if(on){const f=Math.sin(now/90+i);pcirc(p.x,p.y-6+f*.3,4,'#ff8a3a');pcirc(p.x,p.y-7,2.5,'#ffe79a');glow(p.x,p.y-6,16,'#ffcf5a',.45)}else R(p.x-1,p.y-6,2,3,'#555')})}
 else if(pz.type==='count'){if(beat>=pz.showEnd)pz.pads.forEach((p,i)=>{drawPadBase(p,'#ffd166',true);ctx.font='bold 12px monospace';ctx.textAlign='center';ctx.fillStyle='#1a1206';ctx.fillText(String(pz.nums[i]),p.x,p.y+4);ctx.textAlign='left'})}
 else if(pz.type==='color'){const cur=Math.floor(beat/4)%3;for(const o of pz.orbs){const b=Math.sin(now/200+o.c)*2,hit=o.c===cur;pcirc(o.x,o.y+10,7,'#000',.3);glow(o.x,o.y+b,hit?20:14,ORB_COL[o.c][0],hit?.7:.4);pcirc(o.x,o.y+b,9,'#161c22');pcirc(o.x,o.y+b,8,ORB_COL[o.c][0]);pcirc(o.x-2,o.y+b-2,3,'#ffffff',.5);R(o.x-3,o.y+b-4,2,2,'#ffffff')}}
 else if(pz.type==='lure'){for(const p of pz.pillars){if(p.broken){R(p.x-10,p.y-4,20,6,'#4a5258');R(p.x-6,p.y-8,5,4,'#5a646a');continue}pcirc(p.x,p.y+3,p.r+1,'#000',.35);R(p.x-p.r,p.y-34,p.r*2,36,'#161c22');R(p.x-p.r+1,p.y-33,p.r*2-2,34,'#6a767c');R(p.x-p.r+1,p.y-33,4,34,'#8a969c');for(let y=p.y-30;y<p.y;y+=7)R(p.x-p.r+1,y,p.r*2-2,1,'#4a5258');R(p.x-p.r-2,p.y-37,p.r*2+4,4,'#8a969c')}}}
function drawPuzzleTop(now,beat){const pz=G.puz;if(!pz||G.cine||pz.done)return;const g=bgeo();
 if(pz.type==='seq'){const showing=beat<pz.show+pz.seq.length&&beat>=pz.show-.2,si=Math.floor(beat-pz.show),bx=g.x,by=g.coreY;if(showing&&si>=0&&si<pz.seq.length){const k=pz.seq[si];pcirc(bx,by,16,'#05090b',.75);glow(bx,by,26,SEQ_COL[k],.8);drawIcon(k,bx,by,9,SEQ_COL[k]);ctx.font='bold 9px monospace';ctx.textAlign='center';ctx.fillStyle='#ffffff';ctx.fillText((si+1)+'/'+pz.seq.length,bx,by+26);ctx.textAlign='left'}}
 else if(pz.type==='count'){const f=pz.flashes.find(fl=>beat>=fl.t&&beat<fl.t+.45);if(f){const k=1-(beat-f.t)/.45;glow(g.x,g.coreY,44*k+10,f.col,.9*k);pcirc(g.x,g.coreY,16*k+5,f.col,.85*k);if(!f.gold){ctx.font='bold 12px monospace';ctx.textAlign='center';ctx.fillStyle='#ffffff';ctx.globalAlpha=k;ctx.fillText('✕',g.x,g.coreY+4);ctx.globalAlpha=1;ctx.textAlign='left'}}}
 else if(pz.type==='color'){const cur=Math.floor(beat/4)%3,col=ORB_COL[cur][0];for(let i=0;i<24;i++){const a=i*TAU/24+now/600;RA(g.x+Math.cos(a)*24-1.5,g.coreY+Math.sin(a)*20-1.5,3,3,col,.95)}glow(g.x,g.coreY,34,col,.5);pcirc(g.x,g.coreY,7,col)}
 else if(pz.type==='reflect'){for(const o of pz.orbs){const near=!o.ref&&Math.hypot(o.x-P.x,o.y-(P.y-10))<34;glow(o.x,o.y,near?16:11,o.ref?'#ffffff':'#ffd166',.7);pcirc(o.x,o.y,6,'#6a4a10');pcirc(o.x,o.y,4.5,o.ref?'#ffffff':'#ffd166');R(o.x-1,o.y-2,2,2,'#ffffff');if(near){for(let i=0;i<12;i++){const a=i*TAU/12+now/200;RA(o.x+Math.cos(a)*11-1,o.y+Math.sin(a)*11-1,2,2,'#ffe79a',.8)}}if(o.ref)for(let k=1;k<4;k++)RA(o.x-o.vx*.012*k-1,o.y-o.vy*.012*k-1,3,3,'#ffffff',.4-k*.1)}}
 else if(pz.type==='lure'){const a=pz.aim;if(a){const tg=a.lock||{x:P.x,y:P.y},bl=Math.floor(now/80)%2;line(g.x,g.y-10,tg.x,tg.y,5,(x,y,i)=>{if(i%2===0)RA(x-1,y-1,3,3,'#ff4d6d',a.lock?.95:.45)});pcirc(tg.x,tg.y,12,'#ff4d6d',a.lock?(bl?.5:.25):.15);ctx.font='bold 16px monospace';ctx.textAlign='center';ctx.fillStyle=bl?'#ff4d6d':'#ffffff';ctx.fillText('!',g.x,g.coreY);ctx.textAlign='left'}}}
function drawPuzzleHUD(now,beat){const pz=G.puz;if(!pz||pz.done||G.vuln||G.cine||G.state!=='play')return;const info=PUZ_INFO[pz.type];let st='';
 if(pz.type==='seq')st=beat<pz.show+pz.seq.length?'보스를 봐라':(pz.idx+'/'+pz.seq.length);else if(pz.type==='lights')st=pz.on.filter(Boolean).length+'/5';else if(pz.type==='count')st=beat<pz.showEnd?'세는 중…':'발판 선택';else if(pz.type==='color'){const c=Math.floor(beat/4)%3;st=pz.prog+'/'+pz.need+' · 지금 '+ORB_COL[c][1]+' → 다음 '+ORB_COL[(c+1)%3][1]+' ('+Math.ceil(4-(beat%4))+'박)'}else if(pz.type==='reflect')st='균열 '+pz.prog+'/'+pz.need;else st=pz.pillars.filter(p=>!p.broken).length+'개 기둥';
 ctx.font='bold 9px monospace';ctx.textAlign='center';RA(W/2-150,56,300,24,'#05090b',.6);ctx.fillStyle='#ffe79a';ctx.fillText('◆ '+info[0]+' · '+st,W/2,66);ctx.fillStyle='#c8d8dc';ctx.font='8px monospace';ctx.fillText(info[1],W/2,76);ctx.textAlign='left'}
/*PUZZLE_END*/
/*BRAIN_BEGIN*/
/* ================= 전투 두뇌: 그로기 게이지 =================
   반격은 시간이 지나서 오는 게 아니라 '그로기'를 채워야 온다.
   · 금빛 조각: 보스가 쏘는 추적탄. 박자에 맞춰 공격하면 보스에게 되받아친다.
   · 불안정 코어: 보스가 바닥에 떨군다. 공격으로 차서 '보스 자신의 공격' 속에 넣으면 폭발.
   · 저스트 회피: 공격이 닿기 직전 대시로 빠져나가면 그로기가 조금 찬다. */
const BR_HINT={};
function brHint(k,txt){if(BR_HINT[k])return;BR_HINT[k]=1;banner(txt)}
function brNew(){return {type:'reflect',brain:true,done:false,stag:0,stagShow:0,shards:[],cores:[],atkCd:0}}
function brCoreCol(){return '#c49bff'}
function brMul(){return diff==='extreme'?.75:diff==='easy'?1.1:(diff==='hard'||diff==='extreme')?.85:1}
function brKey(){return isTouchUI()?'터치':'SPACE'}
function startPuzzle(S,EV,kind,cl){if(!G.puz||!G.puz.brain)G.puz=brNew();brainPhrase(S,EV,kind,cl)}
function continuePuzzle(S,EV,kind,cl){if(!G.puz||!G.puz.brain)G.puz=brNew();brainPhrase(S,EV,kind,cl)}
function brainPhrase(S,EV,kind,cl){const pz=G.puz;pz.kind=kind;pz.cl=cl;pz.S=S;pz.end=S+EV;
 const easy=diff==='easy',hard=diff==='hard'||diff==='extreme',nS=3,nC=hard?1:2;
 brHint('stag','그로기 게이지를 채워야 반격할 수 있다!');
 for(let i=0;i<nC;i++){const t=S+3+i*((EV-6)/Math.max(1,nC));sch(t,()=>brDropCore(t))}
 for(let i=0;i<nS;i++){const t=S+5.5+i*((EV-7)/nS);sch(t,()=>brSpawnShard(t))}}
function brDropCore(t){const pz=G.puz;if(!pz||!pz.brain||G.vuln)return;const g=bgeo();let x=0,y=0;
 for(let k=0;k<20;k++){x=AX+40+RND()*(AW-80);y=AY+110+RND()*(AH-130);if(Math.hypot(x-P.x,y-P.y)>60&&Math.hypot(x-g.x,y-g.coreY)>50&&!pz.cores.some(c=>Math.hypot(c.x-x,c.y-y)<50))break}
 pz.cores.push({x,y,vx:0,vy:0,arm:0,col:brCoreCol(),fly:{x0:g.x,y0:g.coreY,t0:performance.now(),dur:520},seed:RND()*9});
 sfx(300,.25,'triangle',.04,120);brHint('core','불안정 코어! 공격('+brKey()+')으로 차서 보스의 공격 속에 넣어라 → 폭발');}
function brSpawnShard(t){const pz=G.puz;if(!pz||!pz.brain||G.vuln)return;const g=bgeo(),a=Math.atan2(P.y-g.coreY,P.x-g.x);
 pz.shards.push({x:g.x,y:g.coreY,vx:Math.cos(a)*90,vy:Math.sin(a)*90,ref:false,life:9,power:0});sfx(620,.18,'triangle',.04,380);
 brHint('shard','금빛 조각! 가까이 왔을 때 박자에 맞춰 '+brKey()+' → 보스에게 되받아친다');}
function puzzleTimeout(kind,cl){if(G.vuln)return;const pz=G.puz;if(pz&&pz.brain){for(const c of pz.cores)if(!c.fly)spawnPuff(c.x,c.y,6,'#6a7478');pz.cores=[];pz.shards=pz.shards.filter(s=>s.ref)}
 G.nextPlan=Math.ceil(G.beat)+1}
function brStag(v,x,y,txt){const pz=G.puz;if(!pz||G.vuln)return;const now=performance.now();v=Math.round(v);pz.stag=Math.min(100,pz.stag+v);pz.bump=now;if(typeof ultAdd==='function')ultAdd(v*.3);
 G.pops.push({x,y,t:now,tx:txt+' +'+v,col:'#ffcf5a'});
 if(pz.stag>=100){pz.stag=0;pz.stagShow=100;const g=bgeo();G.flash=Math.max(G.flash,.45);G.shake=Math.max(G.shake,.8);G.hitstop=now+160;fxRing(g.x,g.coreY,now,900,170,'#ffcf5a');spawnPuff(g.x,g.coreY,26,'#ffcf5a');
  sfx(90,.6,'square',.08,40);sfx(660,.3,'triangle',.06,1300);pz.shards=[];pz.cores=[];startVuln(pz.kind||'stun',(pz.cl||11)*1.1);G.vuln.bonus=1.3;banner('그로기! 반격 시간 · 피해 ×1.3')}}
function brBlast(c,now,val,txt){c.dead=true;const pz=G.puz;G.shake=Math.max(G.shake,.6);G.flash=Math.max(G.flash,.2);fxRing(c.x,c.y,now,500,42,c.col);fxRing(c.x,c.y,now,700,60,'#ffffff');spawnPuff(c.x,c.y,22,c.col);sfx(70,.5,'square',.09,30);sfx(200,.25,'sawtooth',.05,60);
 if(now>=P.inv&&Math.hypot(P.x-c.x,P.y-c.y)<34){hurtP(10,now);G.pops.push({x:P.x,y:P.y-26,t:now,tx:'폭발에 휘말렸다!',col:'#ff8a9a'})}
 G.hp=Math.max(1,G.hp-Math.round(G.maxHp*.015));G.hurt=.14;brStag(val*brMul(),c.x,c.y-16,txt)}
function updatePuzzle(now,beat,dt){const pz=G.puz;
 if(isTouchUI()){const want=pz&&pz.brain&&!G.vuln&&G.state==='play'?'':'none',bA=$('btnA');if(bA.style.display!==want)bA.style.display=want}
 if(!pz||!pz.brain||G.cine)return;pz.stagShow+=(pz.stag-pz.stagShow)*Math.min(1,dt*6);
 if(G.vuln){pz.shards=[];pz.cores=[];return}
 const g=bgeo(),m=brMul();
 for(const o of pz.shards){
  if(o.ref){o.x+=o.vx*dt;o.y+=o.vy*dt;if(Math.hypot(o.x-g.x,o.y-g.coreY)<22){o.dead=true;spawnPuff(g.x,g.coreY,12,'#ffe79a');fxRing(g.x,g.coreY,now,400,40,'#ffe79a');sfx(300,.2,'square',.07,120);G.hurt=.12;brStag(o.power*m,g.x,g.coreY-24,o.power>20?'반사 명중!':'명중')}}
  else{const a=Math.atan2(P.y-10-o.y,P.x-o.x),sp=diff==='easy'?44:(diff==='hard'||diff==='extreme')?66:56;o.vx+=(Math.cos(a)*sp-o.vx)*Math.min(1,dt*1.3);o.vy+=(Math.sin(a)*sp-o.vy)*Math.min(1,dt*1.3);o.x+=o.vx*dt;o.y+=o.vy*dt;o.life-=dt;
   if(o.life<=0){o.dead=true;spawnPuff(o.x,o.y,5,'#ffd166')}
   else if(Math.hypot(o.x-P.x,o.y-(P.y-8))<8){o.dead=true;if(now>=P.inv)hurtP(8,now);spawnPuff(o.x,o.y,8,'#ffd166')}}}
 if(pz.shards.length)pz.shards=pz.shards.filter(o=>!o.dead&&o.x>AX-20&&o.x<AX+AW+20&&o.y>AY-30&&o.y<AY+AH+20);
 for(const c of pz.cores){
  if(c.fly){if((now-c.fly.t0)/c.fly.dur>=1){c.fly=null;sfx(120,.15,'square',.04,60);spawnPuff(c.x,c.y,8,c.col)}continue}
  const armed=c.armT&&now<c.armT;if(c.armT&&!armed){c.armT=0}const spd=Math.hypot(c.vx,c.vy);
  if(spd>0){c.x+=c.vx*dt;c.y+=c.vy*dt;const fr=Math.pow(.22,dt);c.vx*=fr;c.vy*=fr;
   if(c.x<AX+10||c.x>AX+AW-10){c.vx*=-.7;c.x=clamp(c.x,AX+10,AX+AW-10)}if(c.y<AY+40||c.y>AY+AH-8){c.vy*=-.7;c.y=clamp(c.y,AY+40,AY+AH-8)}
   if(spd<6){c.vx=0;c.vy=0}}
  if(spd>60&&Math.hypot(c.x-g.x,c.y-g.coreY)<26){brBlast(c,now,22,'직격!');continue}
  if(armed&&hazardHit(c.x,c.y,beat,5,0)){brBlast(c,now,45,'역이용!');continue}}
 if(pz.cores.length)pz.cores=pz.cores.filter(c=>!c.dead);
 if(P.dash&&!P.dash.jd&&now-P.dash.t0<200&&hazardHit(P.x,P.y,beat,7,0)){P.dash.jd=true;G.hitstop=now+70;spawnPuff(P.x,P.y-8,10,'#8dcdf5');brStag(10*m,P.x,P.y-30,'저스트 회피!')}}
function tryReflect(){const pz=G.puz,now=performance.now();if(!pz||!pz.brain)return;if(now<(pz.atkCd||0))return;pz.atkCd=now+180;initAudio();
 let best=null,bd=40;for(const o of pz.shards){if(o.ref)continue;const d=Math.hypot(o.x-P.x,o.y-(P.y-10));if(d<bd){bd=d;best=o}}
 let core=null,cd=30;for(const c of pz.cores){if(c.fly)continue;const d=Math.hypot(c.x-P.x,c.y-(P.y-4));if(d<cd){cd=d;core=c}}
 const a0=best?Math.atan2(best.y-P.y,best.x-P.x):core?Math.atan2(core.y-P.y,core.x-P.x):Math.atan2(P.face.y||-1,P.face.x||0);
 P.lungeT=now;P.lungeA=a0;P.lungeDur=120;G.slashFx.push({x:P.x+Math.cos(a0)*14,y:P.y-10+Math.sin(a0)*14,a:a0+Math.PI/2,t:now});
 if(best){const err=Math.abs(G.beat-Math.round(G.beat))*G.ms,on=err<=win().g*1.3,g=bgeo(),a=Math.atan2(g.coreY-best.y,g.x-best.x);best.ref=true;best.power=on?30:12;best.vx=Math.cos(a)*(on?380:260);best.vy=Math.sin(a)*(on?380:260);
  G.pops.push({x:best.x,y:best.y-12,t:now,tx:on?'PERFECT 반사!':'박자 어긋남 · 약한 반사',col:on?'#ffe79a':'#c8d8dc'});sfx(on?820:520,.12,'square',.05,on?1500:700);G.shake=Math.max(G.shake,on?.25:.1);if(on)G.hitstop=now+50;return}
 if(core){const a=Math.atan2(core.y-(P.y-4),core.x-P.x);core.vx=Math.cos(a)*250;core.vy=Math.sin(a)*250;core.armT=now+4000;sfx(260,.1,'square',.05,140);G.pops.push({x:core.x,y:core.y-14,t:now,tx:'차기!',col:core.col});G.shake=Math.max(G.shake,.12);return}
 sfx(220,.06,'triangle',.02,80)}
/* ---- 그리기 ---- */
function drawPuzzle(now,beat){const pz=G.puz;if(!pz||!pz.brain||G.cine||G.vuln)return;
 for(const c of pz.cores){let x=c.x,y=c.y,h=0;if(c.fly){const k=clamp((now-c.fly.t0)/c.fly.dur,0,1);x=lerp(c.fly.x0,c.x,k);y=lerp(c.fly.y0,c.y,k);h=Math.sin(k*Math.PI)*40;pcirc(c.x,c.y,6,'#000',.3*k);for(let i=0;i<16;i++){const a=i*TAU/16;RA(c.x+Math.cos(a)*10-1,c.y+Math.sin(a)*7-1,2,2,c.col,.6)}}
  const pu=.5+.5*Math.sin(now/(c.vx||c.vy?60:160)+c.seed),yy=y-h;
  if(!c.fly){for(let i=0;i<28;i++){if(i%2)continue;const a=i*TAU/28+now/2000;RA(x+Math.cos(a)*34-1,y+Math.sin(a)*26-1,2,1,c.col,.28)}pcirc(x,y+4,8,'#000',.35)}
  const armed=c.armT&&now<c.armT;if(armed){const k=(c.armT-now)/4000,fl=Math.floor(now/(60+k*140))%2;for(let i=0;i<20;i++){const a=i*TAU/20-now/150;RA(x+Math.cos(a)*12-1,yy+Math.sin(a)*12-1,2,2,fl?'#ffffff':c.col,.9)}}
  glow(x,yy,16+pu*4,c.col,.45+pu*.2);pcirc(x,yy,8,'#0a0c10');pcirc(x,yy,7,shade(c.col,.35));pcirc(x,yy,4+pu,c.col);pcirc(x-2,yy-2,2,'#ffffff',.7);
  for(let k=0;k<3;k++){const a=c.seed+k*2.1;line(x,yy,x+Math.cos(a)*7,yy+Math.sin(a)*7,1,(px,py)=>R(px,py,1,1,'#ffffff'))}}}
function drawPuzzleTop(now,beat){const pz=G.puz;if(!pz||!pz.brain||G.cine||G.vuln)return;
 let nearS=null,bd=40;for(const o of pz.shards){if(o.ref)continue;const d=Math.hypot(o.x-P.x,o.y-(P.y-10));if(d<bd){bd=d;nearS=o}}
 let nearC=null,cd=30;for(const c of pz.cores){if(c.fly)continue;const d=Math.hypot(c.x-P.x,c.y-(P.y-4));if(d<cd){cd=d;nearC=c}}
 const bp=1-Math.abs(G.beat-Math.round(G.beat))*2;
 for(const o of pz.shards){const near=o===nearS;glow(o.x,o.y,near?18:12,o.ref?'#ffffff':'#ffd166',.75);
  if(!o.ref){const r=6+bp*4;for(let i=0;i<14;i++){const a=i*TAU/14;RA(o.x+Math.cos(a)*(r+4)-1,o.y+Math.sin(a)*(r+4)-1,2,2,'#ffe79a',near?.9:.35*bp)}}
  R(o.x-1,o.y-6,3,12,'#6a4a10');R(o.x-6,o.y-1,12,3,'#6a4a10');R(o.x,o.y-5,1,10,o.ref?'#ffffff':'#ffd166');R(o.x-5,o.y,10,1,o.ref?'#ffffff':'#ffd166');pcirc(o.x+.5,o.y+.5,2.5,'#ffffff');
  if(o.ref)for(let k=1;k<5;k++)RA(o.x-o.vx*.012*k-1.5,o.y-o.vy*.012*k-1.5,3,3,'#ffffff',.45-k*.09)}
 ctx.textAlign='center';ctx.font='bold 8px monospace';
 const tag=(x,y,t,col)=>{const w=ctx.measureText(t).width+6;RA(x-w/2,y-8,w,11,'#05090b',.8);R(x-w/2,y+2,w,1,col);ctx.fillStyle=col;ctx.fillText(t,x,y)};
 if(nearS)tag(nearS.x,nearS.y-14,brKey()+(bp>.6?' ♪ 지금!':' ♪'),bp>.6?'#ffe79a':'#c8d8dc');
 else if(nearC)tag(nearC.x,nearC.y-16,brKey()+' 차기',nearC.col);
 ctx.textAlign='left'}
function drawPuzzleHUD(now,beat){const pz=G.puz;if(!pz||!pz.brain||G.state!=='play'||G.cine)return;
 const x=W/2-80,w=160,y=H-23,h=4,k=clamp(pz.stagShow/100,0,1),bump=pz.bump&&now-pz.bump<300?1-(now-pz.bump)/300:0,full=G.vuln;if(full)return;RA(x-3,y-3,w+6,h+6,'#04070a',.75);
 R(x-1,y-1,w+2,h+2,'#05090b');R(x,y,w,h,'#2a2410');R(x,y,w*(full?1:k),h,full?(Math.floor(now/90)%2?'#ffe79a':'#ff9a3a'):'#ffcf5a');R(x,y,w*(full?1:k),1,'#fff3c0');
 for(let i=1;i<4;i++)R(x+w*i/4,y,1,h,'#05090b');if(bump>0)RA(x,y-1,w*k,h+2,'#ffffff',bump*.6);
 if(full)return;const t='그로기 '+Math.floor(k*100)+'%';hudText(t,x+w+4,y+5,'left','#ffcf5a','bold 8px monospace');ctx.textAlign='left'}
/*BRAIN_END*/
/*STORY2_BEGIN*/
