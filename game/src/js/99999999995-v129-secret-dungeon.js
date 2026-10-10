/* ================= v129 성문 · 비밀 기록실 · 봉인 보관소 20층 (DG129) =================
   ① 광장 위쪽 탑의 성문에 「열쇠지기의 코어」(v127 클라비스를 이기면 받음)를 박으면 문이 열린다.
      한 번 열면 계속 열려 있어 들어갔다 나왔다 할 수 있다(saveData.sec127.gate).
   ② 성문 안 = 비밀 기록실(클라비스 방처럼): 서랍장을 열쇠로 열면 문서가 나오고, 「확인」을 누르면 던전.
   ③ 봉인 보관소 1~19층: 탑에 없는 괴물 6종(서랍 미믹 · 종이 나방 · 잉크 유령 · 열쇠 거미 · 자물쇠 골렘 · 빈 갑옷 기사).
      층이 오를수록 수 · 체력 · 공격력이 늘고, 다 잡으면 위쪽 계단으로 직접 걸어 올라간다. 체크포인트 1 · 6 · 11 · 16층.
   ④ 20층: 가운데 제단에 문서를 올리면 보스(봉인 기록관 아르카)가 위쪽 벽을 부수고 나와 「넌 누구냐」 → 보스전.
      쓰러뜨리면 포탈이 열리고, 직접 걸어 들어가면 비밀 캐릭터 클라비스를 얻는다(상점에 나타남 · 사야 씀).
   기록: saveData.dg129={cp:체크포인트, best:최고 층, clears:깬 횟수}
   모드: mode='dg129' (이 파일이 직접 그리고 움직임) */
(()=>{try{
 if(!window.SEC127||!SEC127.kit)return;
 const $=id=>document.getElementById(id),E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const K7=SEC127.kit,{hero,txt,ltxt,bubble,brickC,torch,R0,snd}=K7,TAU=Math.PI*2;
 const sfx2=k=>{try{gmSfx(k)}catch(e){}},save=()=>{try{saveNow()}catch(e){}};
 const SV=SEC127.SV,DV=()=>saveData.dg129||(saveData.dg129={cp:1,best:0,clears:0});
 const found=id=>{try{return window.EGG126&&EGG126.found(id)}catch(e){return false}};
 const pop=(ic,t,s)=>{try{if(window.EGG126&&EGG126.pop)return EGG126.pop(ic,t,s)}catch(e){}};
 try{if(window.EGG126&&EGG126.EG){EGG126.EG.push({id:'gate',ic:'🔮',n:'열린 성문',hint:'열쇠지기가 남긴 것을 광장의 성문에…',how:'클라비스에게 받은 코어를 광장 탑의 성문에 박기',dia:20},
   {id:'dungeon',ic:'📜',n:'봉인 보관소 정복',hint:'기록실 서랍 속 문서가 가리키는 스무 층 아래…',how:'봉인 보관소 20층의 기록관 아르카를 쓰러뜨리고 포탈로 나가기',dia:100})}}catch(e){}

 /* ================= ① 광장 성문 ================= */
 const GX=480,GY=176,GT=104;/* 성문 가운데 · 바닥 · 아치 꼭대기 */
 let GA=null;/* 코어 박는 연출 {t0} */
 function gateDraw(c,now){const s=SV(),t=now/1000,open=s.gate?1:GA?Math.max(0,Math.min(1,(now-GA.t0-900)/1200)):0;
  /* 문이 열리면: 안쪽 어둠 + 보랏빛 */if(open>0){c.save();c.beginPath();c.moveTo(GX-29,GY);c.lineTo(GX-29,GT+29);c.arc(GX,GT+29,29,Math.PI,0);c.lineTo(GX+29,GY);c.closePath();c.clip();
   c.fillStyle='#0a0614';c.fillRect(GX-30,GT,60,GY-GT);const g=c.createRadialGradient(GX,GY-20,2,GX,GY-20,50);g.addColorStop(0,'rgba(180,140,255,'+(.55*open)+')');g.addColorStop(1,'rgba(60,30,120,0)');c.fillStyle=g;c.fillRect(GX-30,GT,60,GY-GT);
   for(let i=0;i<6;i++){c.fillStyle='rgba(220,200,255,'+(.4*open)+')';c.fillRect(GX-20+((i*13+now/40)%40),GY-8-((i*29+now/25)%60),1,2)}
   /* 안쪽으로 젖혀진 문짝 */const pw=29*(1-open*.8);c.fillStyle='#4a2e18';c.fillRect(GX-29,GT+10,pw,GY-GT-10);c.fillRect(GX+29-pw,GT+10,pw,GY-GT-10);c.fillStyle='#2a1a0c';c.fillRect(GX-29+pw-1,GT+10,1,GY-GT-10);c.fillRect(GX+29-pw,GT+10,1,GY-GT-10);c.restore()}
  /* 코어 자리: 문 위 아치 돌에 박힌 둥근 홈 */const sx=GX,sy=GT-6,glow=s.gate||GA&&now-GA.t0>800;
  c.fillStyle='#1a1420';c.beginPath();c.arc(sx,sy,6,0,TAU);c.fill();c.strokeStyle='#8a7a9a';c.lineWidth=1.5;c.beginPath();c.arc(sx,sy,6.5,0,TAU);c.stroke();
  for(let i=0;i<4;i++){const a=i*TAU/4+t*.3;c.fillStyle=glow?'#c9a8ff':'#5a4a6a';c.fillRect(sx+Math.cos(a)*9-1,sy+Math.sin(a)*9-1,2,2)}
  if(glow){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(sx,sy,1,sx,sy,22);g.addColorStop(0,'rgba(201,168,255,.85)');g.addColorStop(1,'rgba(201,168,255,0)');c.fillStyle=g;c.fillRect(sx-22,sy-22,44,44);c.restore();c.fillStyle='#7a4ae8';c.fillRect(sx-3,sy-3,6,6);c.fillStyle='#e6d4ff';c.fillRect(sx-2,sy-2,2,2)}
  /* 코어가 날아가 박히는 중 */if(GA){const q=Math.min(1,(now-GA.t0)/800);if(q<1){const x=GA.x+(sx-GA.x)*q,y=GA.y+(sy-GA.y)*q-Math.sin(q*Math.PI)*24;c.fillStyle='#7a4ae8';c.fillRect(x-3,y-3,6,6);c.fillStyle='#e6d4ff';c.fillRect(x-1,y-2,2,2)}
   if(now-GA.t0>2200){GA=null}}
  /* 코어를 가진 채 가까이 오면 안내 */if(!s.gate&&!GA&&near()){const msg=s.core?'🔮 코어를 박을 수 있을 것 같다 (공격 키 · 단추)':'둥근 홈이 있다… 무언가를 박는 자리 같다';c.save();c.font='bold 8px sans-serif';c.textAlign='center';c.fillStyle='#000a';const w=c.measureText(msg).width+10;c.fillRect(sx-w/2,sy-24,w,12);c.fillStyle=s.core?'#e6d4ff':'#cfc6d8';c.fillText(msg,sx,sy-15);c.restore()}}
 const near=()=>{try{return mode==='plaza'&&Math.abs(P.x-GX)<40&&P.y<GY+36}catch(e){return false}};
 if(window.PLZART&&PLZART.objs){const f=PLZART.objs;PLZART.objs=function(now){const L=f.apply(this,arguments)||[];try{L.push({y:GY+.5,fn:()=>gateDraw(ctx,now)})}catch(e){}return L}}
 function insertCore(){const s=SV();if(s.gate||GA||!s.core)return;GA={t0:performance.now(),x:P.x,y:P.y-14};snd(660,.2,'sine',.06,1320);
  setTimeout(()=>{snd(110,.6,'sawtooth',.08,55);try{perc&&perc('crash',audio.currentTime)}catch(e){}},900);
  setTimeout(()=>{s.gate=Date.now();save();found('gate');pop('🔮','성문이 열렸어요!','이제 언제든 들어갔다 나왔다 할 수 있어요')},2100)}
 const gb=document.createElement('button');gb.id='gate129';gb.hidden=true;document.body.appendChild(gb);
 gb.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();if(!SV().gate)insertCore()});
 {const f=doAttack;doAttack=function(){if(mode==='plaza'&&near()&&SV().core&&!SV().gate){insertCore();return}return f.apply(this,arguments)}}
 let armed=true;
 setInterval(()=>{try{const s=SV(),show=near()&&s.core&&!s.gate&&!GA;if(gb.hidden===show){gb.hidden=!show;gb.textContent='🔮 코어 박기'}
   if(mode!=='plaza')return;if(P.y>GY+26)armed=true;
   if(s.gate&&armed&&Math.abs(P.x-GX)<20&&P.y<GY+14){armed=false;enterArchive()}}catch(e){}},100);

 /* ================= 공통: 장면 · 조작 ================= */
 const BX0=AX+22,BX1=AX+AW-22,BY0=AY+64,BY1=AY+AH-14,MX=W/2;
 let D=null;/* 지금 장면 */
 const clampB=o=>{o.x=Math.max(BX0,Math.min(BX1,o.x));o.y=Math.max(BY0,Math.min(BY1,o.y))};
 function go(ph,extra){D=Object.assign(D||{},{ph,t0:performance.now()},extra||{});lastT=performance.now()}
 function enterArchive(){try{PLZ111.leave()}catch(e){}mode='dg129';try{resetP(MX,BY1-8)}catch(e){P.x=MX;P.y=BY1-8}P.face={x:0,y:-1};D={fade:performance.now(),me:{atk:0,dash:null,parryT:0,inv:0},fx:[],pops:[]};go('arch');sfx2('ok')}
 function toPlaza(){D=null;mode='boss';try{$('doc129').hidden=true}catch(e){}try{PLZ111.enter();setTimeout(()=>{try{P.x=GX;P.y=GY+40;armed=false}catch(e){}},60)}catch(e){toLobby()}}
 let lastT=performance.now();
 /* 내 이동(걷기 · 대시 넉백), 막힌 곳은 미끄러지듯 */
 function moveMe(now,dt,ok){const me=D.me;if(now<(P._stun129||0)){P.walkOn=false;return}let [mx,my]=moveInput();if(D.tgt){const dx=D.tgt.x-P.x,dy=D.tgt.y-P.y,dd=Math.hypot(dx,dy);if(dd<3)D.tgt=null;else{mx=dx/dd;my=dy/dd}}
  if(me&&me.dash){const q=(now-me.dash.t)/150;if(q>=1)me.dash=null;else{const nx=P.x+me.dash.vx*300*dt,ny=P.y+me.dash.vy*300*dt;if(ok(nx,ny)){P.x=nx;P.y=ny}D.fx.push({k:'sp',x:P.x,y:P.y-10,vx:0,vy:0,col:'#8de4ff',t:now});return}}
  const l=Math.hypot(mx,my);if(l>.1){mx/=l;my/=l;const sp=80,nx=P.x+mx*sp*dt,ny=P.y+my*sp*dt;if(ok(nx,ny)){P.x=nx;P.y=ny}else if(ok(nx,P.y))P.x=nx;else if(ok(P.x,ny))P.y=ny;
   P.walkOn=true;P.walkT=(P.walkT||0)+dt*8;P.face=Math.abs(mx)>=Math.abs(my)?{x:Math.sign(mx),y:0}:{x:0,y:Math.sign(my)}}else P.walkOn=false}
 const okRect=(x,y)=>x>=BX0&&x<=BX1&&y>=BY0&&y<=BY1;
 function drawMe(now){const blink=now<(P._hit129||0)&&Math.floor(now/70)%2;if(blink)return;if(D.me&&D.me.parryT&&now-D.me.parryT<220){ctx.save();ctx.strokeStyle='#ffe79a';ctx.lineWidth=2;ctx.beginPath();ctx.arc(P.x+((P.face.x||1)<0?-8:8),P.y-12,10,0,TAU);ctx.stroke();ctx.restore()}
  hero(P.x,P.y,(P.face.x||1)<0,P.walkOn,P.walkT||0);if(now<(P._stun129||0))for(let i=0;i<3;i++){const a=now/200+i*TAU/3;ctx.fillStyle='#ffe79a';ctx.fillRect(P.x+Math.cos(a)*9-1,P.y-40+Math.sin(a)*3,3,3)}}
 function fxDraw(now){D.fx=(D.fx||[]).filter(e=>now-e.t<(e.k==='sl'?220:500));for(const e of D.fx){const q=(now-e.t)/(e.k==='sl'?220:500);ctx.save();
   if(e.k==='sl'){ctx.globalAlpha=(1-q)*.8;ctx.fillStyle=e.col;ctx.beginPath();ctx.arc(e.x,e.y,19,e.a-1.25+q*.5,e.a+1.25+q*.5);ctx.arc(e.x,e.y,12,e.a+1.05+q*.5,e.a-1.05+q*.5,true);ctx.closePath();ctx.fill();ctx.globalAlpha=1-q;ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(e.x,e.y,19,e.a-1.1+q*.5,e.a+1.1+q*.5);ctx.stroke()}
   else{const s=(now-e.t)/1000;ctx.globalAlpha=1-q;ctx.fillStyle=e.col;ctx.fillRect(e.x+e.vx*s,e.y+e.vy*s+(e.g==null?200:e.g)*s*s,2,2)}ctx.restore()}
  D.pops=(D.pops||[]).filter(p=>now-p.t<800);for(const p of D.pops){const q=(now-p.t)/800;txt(p.s,p.x,p.y-q*16,p.s.length>6?9:10,p.c,1-q*q)}}
 const dpop=(x,y,s,c)=>D.pops.push({x,y,s,c,t:performance.now()});
 const spark=(x,y,col,n)=>{for(let i=0;i<(n||8);i++)D.fx.push({k:'sp',x,y,vx:(Math.random()-.5)*160,vy:(Math.random()-.5)*160-30,col,t:performance.now()})};

 /* ================= ② 비밀 기록실 ================= */
 const DRW={x:MX,y:BY0-2};/* 서랍장(뒤 벽 앞) */
 let ARC=null;
 function archBg(){const c=document.createElement('canvas'),k=3;c.width=W*k;c.height=H*k;const o=c.getContext('2d');o.scale(k,k);o.imageSmoothingEnabled=false;const r=R0(71);
  o.fillStyle='#07060c';o.fillRect(0,0,W,H);brickC(o,0,0,W,AY+56,'#2a2440','#332c4c',73);o.fillStyle='#00000055';o.fillRect(0,AY+50,W,6);o.fillStyle='#5a5270';o.fillRect(0,AY+54,W,2);
  /* 책장 (양쪽 벽) */for(const bx of [AX+8,AX+60,AX+AW-100,AX+AW-48]){o.fillStyle='#3a2414';o.fillRect(bx,AY-6,42,60);o.fillStyle='#24160c';o.fillRect(bx+2,AY-4,38,56);for(let sh=0;sh<4;sh++){const y=AY-2+sh*14;o.fillStyle='#4a3020';o.fillRect(bx+2,y+11,38,2);let x=bx+3;while(x<bx+38){const w=2+Math.floor(r()*3),h=7+Math.floor(r()*4);o.fillStyle=['#7a2a3a','#2a4a7a','#3a6a3a','#8a6a2a','#5a3a7a','#a08060'][Math.floor(r()*6)];o.fillRect(x,y+11-h,w,h);o.fillStyle='#ffffff22';o.fillRect(x,y+11-h,1,h);x+=w+(r()<.15?2:0)}}}
  /* 스테인드글라스 둥근 창 */{const x=MX,y=AY-14;o.fillStyle='#14101e';o.beginPath();o.arc(x,y,16,0,TAU);o.fill();for(let i=0;i<8;i++){o.fillStyle=['#5a3aa0','#c9a24a','#3a7ab0','#a03a6a'][i%4];o.beginPath();o.moveTo(x,y);o.arc(x,y,13,i*TAU/8,(i+1)*TAU/8);o.closePath();o.fill()}o.fillStyle='#ffd84a';o.beginPath();o.arc(x,y,4,0,TAU);o.fill();o.strokeStyle='#c9a24a';o.lineWidth=1.5;o.beginPath();o.arc(x,y,16,0,TAU);o.stroke()}
  /* 바닥 */for(let y=AY+56;y<H;y+=12)for(let x=0;x<W;x+=12){const v=r();o.fillStyle=v<.3?'#1c1830':v<.6?'#201b36':'#241f3c';o.fillRect(x,y,12,12);o.fillStyle='#2e2848';o.fillRect(x,y,12,1);o.fillRect(x,y,1,12)}
  o.fillStyle='#3a1a5a';o.fillRect(MX-14,AY+56,28,H-AY-56);o.fillStyle='#c9a24a';o.fillRect(MX-14,AY+56,2,H-AY-56);o.fillRect(MX+12,AY+56,2,H-AY-56);
  /* 책상 · 종이 더미 · 촛대 */for(const [x,y] of [[AX+70,AY+130],[AX+AW-110,AY+150]]){o.fillStyle='#00000055';o.fillRect(x+2,y+14,44,4);o.fillStyle='#4a2e18';o.fillRect(x,y,44,14);o.fillStyle='#6a4428';o.fillRect(x,y,44,3);o.fillStyle='#3a2414';o.fillRect(x+2,y+14,3,6);o.fillRect(x+39,y+14,3,6);for(let i=0;i<5;i++){o.fillStyle=i%2?'#e8dcc0':'#d8ccb0';o.fillRect(x+6+i*2,y-2-i,14,2)}o.fillStyle='#c8c0b0';o.fillRect(x+30,y-6,2,6);o.fillStyle='#ffd84a';o.fillRect(x+30,y-8,2,2)}
  /* 기둥 */for(const [x,y] of [[AX+18,AY+60],[AX+AW-26,AY+60]]){o.fillStyle='#4a4462';o.fillRect(x,y,8,40);o.fillStyle='#5e5878';o.fillRect(x,y,2,40);o.fillStyle='#6a6488';o.fillRect(x-2,y-3,12,4);o.fillRect(x-2,y+38,12,4)}
  /* 아래쪽 문(광장으로) */o.fillStyle='#120c1e';o.fillRect(MX-18,H-16,36,16);o.fillStyle='#4a3a6a';o.fillRect(MX-20,H-18,40,3);
  const vg=o.createRadialGradient(W/2,H*.6,60,W/2,H*.6,320);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.55)');o.fillStyle=vg;o.fillRect(0,0,W,H);return c}
 function drawer(now){const x=DRW.x,y=DRW.y,op=D.drOpen?Math.min(1,(now-D.drOpen)/600):0;
  ctx.fillStyle='#000a';ctx.fillRect(x-25,y-38,52,42);ctx.fillStyle='#4a2e18';ctx.fillRect(x-24,y-40,48,40);ctx.fillStyle='#6a4428';ctx.fillRect(x-24,y-40,48,3);ctx.fillStyle='#3a2414';ctx.fillRect(x-24,y-1,48,3);
  for(let i=0;i<3;i++){const dy=y-35+i*11,out=i===1?op*6:0;ctx.fillStyle='#2a1a0c';ctx.fillRect(x-21,dy,42,9);ctx.fillStyle=i===1?'#7a5030':'#5a3a20';ctx.fillRect(x-21,dy+out,42,9);ctx.fillStyle='#c9a24a';ctx.fillRect(x-3,dy+3+out,6,2);if(i===1&&!D.drOpen){ctx.fillStyle='#ffd84a';ctx.fillRect(x+12,dy+2,3,4);ctx.fillStyle='#2a1008';ctx.fillRect(x+13,dy+3,1,2)}}
  /* 촛불 */for(const s of [-1,1]){const cx=x+s*20,fl=Math.sin(now/90+s)*.8;ctx.fillStyle='#e8e0d0';ctx.fillRect(cx-1,y-46,2,6);ctx.fillStyle='#ffb84a';ctx.fillRect(cx-1,y-49+fl*.4,2,3);const g=ctx.createRadialGradient(cx,y-48,1,cx,y-48,30);g.addColorStop(0,'rgba(255,190,90,.3)');g.addColorStop(1,'rgba(255,190,90,0)');ctx.fillStyle=g;ctx.fillRect(cx-30,y-78,60,60)}
  /* 문서가 떠오름 */if(D.drOpen){const q=Math.min(1,(now-D.drOpen-500)/900);if(q>0){const py=y-24-q*24+Math.sin(now/300)*1.5;ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(x,py,1,x,py,22);g.addColorStop(0,'rgba(255,230,160,.55)');g.addColorStop(1,'rgba(255,230,160,0)');ctx.fillStyle=g;ctx.fillRect(x-22,py-22,44,44);ctx.restore();ctx.fillStyle='#efe4c8';ctx.fillRect(x-6,py-8,12,15);ctx.fillStyle='#c8b890';for(let i=0;i<4;i++)ctx.fillRect(x-4,py-5+i*3,8,1);ctx.fillStyle='#a03a3a';ctx.fillRect(x+1,py+3,3,3)}}}
 const nearDrawer=()=>Math.hypot(P.x-DRW.x,P.y-(DRW.y+14))<32;
 function openDrawer(){if(D.drOpen)return;if(!SV().key){dpop(P.x,P.y-36,'열쇠가 필요해','#ffb0a0');return}D.drOpen=performance.now();snd(300,.15,'triangle',.05,600);setTimeout(()=>{snd(990,.2,'sine',.05,1480)},500);setTimeout(()=>{if(D&&D.ph==='arch')openDoc()},1600)}
 function arch(now,dt,t){moveMe(now,dt,(x,y)=>okRect(x,y)&&!(Math.abs(x-DRW.x)<28&&y<DRW.y+8));
  if(!ARC)ARC=archBg();ctx.drawImage(ARC,0,0,W,H);
  for(const x of [AX+120,AX+AW-120])torch(x,AY+30,now);
  const L=[{y:DRW.y,fn:()=>drawer(now)},{y:P.y,fn:()=>drawMe(now)}];L.sort((a,b)=>a.y-b.y).forEach(o=>{try{o.fn()}catch(e){}});
  for(let i=0;i<24;i++){const x=(i*71+now/50)%W,y=AY+((i*37+now/80)%(H-AY));ctx.fillStyle='rgba(230,220,255,.16)';ctx.fillRect(x,y,1,1)}
  fxDraw(now);
  txt('비밀 기록실',MX,22,14,'#e6d4ff',Math.min(1,t*2));
  if(nearDrawer()&&!D.drOpen)txt(SV().key?'🗝 서랍을 열쇠로 열기 (공격 키 · 단추)':'자물쇠가 걸려 있다',MX,DRW.y+30,9,'#ffe9a8',.7+.3*Math.sin(now/250));
  if(P.y>BY1-14)txt('▼ 광장으로',MX,H-20,9,'#cfc6e8',.8);
  if(P.y>BY1-3&&Math.abs(P.x-MX)<18&&t>1)toPlaza();
  if(D.fade&&now-D.fade<500){ctx.fillStyle='rgba(0,0,0,'+(1-(now-D.fade)/500)+')';ctx.fillRect(0,0,W,H)}}
 /* 문서 창 */
 const doc=document.createElement('div');doc.id='doc129';doc.hidden=true;document.body.appendChild(doc);
 function openDoc(){const d=DV(),cp=d.cp||1;D.ph='doc';
  doc.innerHTML='<div class="pp"><div class="seal">✦</div><h3>봉인 기록 · 제 0번 문서</h3><p>열쇠지기의 코어로 문을 연 자에게.</p><p>이 기록실 아래에는 <b>스무 층의 봉인 보관소</b>가 있다. 잊혀진 기록들이 괴물이 되어 층마다 떠돈다. 아래로 갈수록 그것들은 많아지고, 단단해지고, 사나워진다.</p><p><b>스무 번째 층의 제단</b>에 이 문서를 올려라. 그러면 기록의 주인이 깨어날 것이다.</p><p class="sg">— 비밀의 열쇠지기 클라비스</p>'+
   '<div class="info">'+(cp>1?'체크포인트: <b>'+cp+'층</b>부터 · ':'')+'최고 '+(d.best||0)+'층 · 깬 횟수 '+(d.clears||0)+'</div><div class="bt"><button class="ok">확인</button><button class="no">닫기</button></div></div>';
  doc.hidden=false;sfx2('ok');doc.querySelector('.ok').onclick=e=>{e.stopPropagation();doc.hidden=true;startDungeon(cp)};doc.querySelector('.no').onclick=e=>{e.stopPropagation();doc.hidden=true;D.ph='arch';D.drOpen=0;sfx2('back')}}
 doc.addEventListener('pointerdown',e=>e.stopPropagation());

 /* ================= ③ 던전 괴물 6종 (보스와 같은 MON 그리기 엔진) ================= */
 if(typeof MON!=='undefined'){const R=MON.reg,mix=(a,b,k)=>{try{return monMix(a,b,k)}catch(e){return a}};
  const pal=A=>{const p=A.o.pal||{a:'#9fb3c8',b:'#3c4a5c',c:'#5affd8'};return {a:p.a,b:p.b,c:p.c,lt:mix(p.a,'#ffffff',.38),dk:mix(p.a,'#000000',.42),dd:mix(p.b,'#000000',.35),cl:mix(p.c,'#ffffff',.45)}};
  const st=A=>{const o=A.o,w=o.walk,s=w==null?0:Math.sin(w*TAU),c=w==null?0:Math.cos(w*TAU);return {v:o.view||'front',w,s,c,walking:w!=null,k:o.atk?1:0,h:o.hit?1:0,bob:w!=null?-Math.abs(s)*.8:Math.sin(A.t*2.4)*.35}};
  const fin=(A,bb,p)=>{A.bbox=bb;A.aura=A.o.elite?'#ffd166':p.c;if(A.o.elite)A.rim='rgba(255,226,140,.75)'};
  /* 서랍 미믹: 낡은 서랍장 — 입을 벌리면 이빨과 혀 */
  R.m_dgmimic=A=>{const p=pal(A),S=st(A),side=S.v==='side',back=S.v==='back',hop=S.h?-4:S.walking?-Math.abs(S.s)*2.2:0,y0=-3+hop,w=side?14:18,hx=-w/2,op=S.k?3.5:S.h?6:Math.max(0,Math.sin(A.t*3))*1.2;
   for(const [x,sg] of [[hx+2,1],[-hx-4,-1]]){const lift=S.walking?Math.max(0,S.s*sg)*1.5:0;A.R(x,-3-lift,2,3,p.dd);A.R(x-.4,-1-lift,2.8,1,'#0a0b10')}
   A.R(hx,y0-13,w,13,p.dk);A.R(hx+.6,y0-12.4,w-1.2,11.8,p.a);A.R(hx+.6,y0-12.4,w-1.2,1.2,p.lt);
   if(!back){A.R(hx+1.5,y0-6,w-3,4.6,p.b);A.R(hx+1.8,y0-5.6,w-3.6,.8,p.lt,.5);A.R(-1.4,y0-4.4,2.8,1.2,'#c9a24a');}
   /* 뚜껑(입) */A.P([[hx-.6,y0-13],[-hx+.6,y0-13],[-hx+.6,y0-13-op-3],[hx-.6,y0-13-op-3]],p.dk);A.R(hx,y0-13-op-3,w,2.4,p.a);A.R(hx,y0-13-op-3,w,.8,p.lt);
   if(op>.5&&!back){A.R(hx+.8,y0-13-op,w-1.6,op,'#1a0610');for(let i=0;i<w-2;i+=2.4){A.P([[hx+1+i,y0-13-op],[hx+2.2+i,y0-13-op],[hx+1.6+i,y0-13-op+1.6]],'#f2ecd8');A.P([[hx+1+i,y0-13],[hx+2.2+i,y0-13],[hx+1.6+i,y0-14.4]],'#f2ecd8')}
    A.E(side?2:0,y0-13-op*.4,2.6,1.2,'#e05a7a');const ex=side?3:0;A.C(-3+ex,y0-13-op-1.6,1.1,p.c);if(!side)A.C(3,y0-13-op-1.6,1.1,p.c);A.glow(0,y0-13-op*.5,5,p.c,.6)}
   fin(A,[-11,y0-22,11,0],p)};
  /* 종이 나방: 룬이 적힌 종이 날개 */
  R.m_dgmoth=A=>{const p=pal(A),S=st(A),t=A.t,sp=S.walking?18:12,fl=S.k?-1:S.h?.9:Math.sin(t*sp),by=-15+Math.sin(t*5)*.8,side=S.v==='side',back=S.v==='back',PA='#efe4c8',PD='#c8b890';
   for(const s of [-1,1]){const far=side&&s<0,ww=far?.55:1,tip=[s*12*ww,by-7+fl*5],low=[s*9*ww,by+6+fl*2];
    A.P([[s*1.5,by-2],tip,[s*13*ww,by+1+fl*3],low,[s*2,by+3]],far?PD:'#8a7a5a');A.P([[s*2,by-1.4],[tip[0]-s*.9,tip[1]+1.2],[s*12*ww,by+1+fl*3],[low[0]-s*.6,low[1]-.8],[s*2.4,by+2.4]],far?PD:PA);
    A.L(s*3,by,tip[0]-s*1.5,tip[1]+2,p.c,.6,.8);A.C(s*7*ww,by+1+fl*1.5,1.2,p.c,.8);A.L(s*4,by+2,low[0]-s,low[1]-1,PD,.5)}
   A.E(0,by+1,2,5,p.dk);A.E(0,by,1.6,4.2,p.a);A.L(-1,by-4,-3,by-8,p.dk,.5);A.L(1,by-4,3,by-8,p.dk,.5);A.C(-3,by-8,.6,p.c);A.C(3,by-8,.6,p.c);
   if(!back){A.C(-.9,by-2.6,.8,p.c);A.C(.9,by-2.6,.8,p.c)}A.glow(0,by,6,p.c,.4);fin(A,[-13,by-10,13,by+8],p)};
  /* 잉크 유령: 흘러내리는 잉크 몸 + 떠도는 종잇조각 */
  R.m_dgink=A=>{const p=pal(A),S=st(A),t=A.t,by=-12+Math.sin(t*3)*1.2-(S.k?1:0),side=S.v==='side',back=S.v==='back';
   for(let i=0;i<5;i++){const x=-6+i*3,len=4+Math.sin(t*4+i)*1.5;A.R(x,by+4,2.2,len,p.b);A.C(x+1.1,by+4+len,1.1,p.b)}
   A.E(0,by,8,8.5,p.dd);A.E(0,by-.5,7.2,7.8,p.b);A.E(-2.4,by-3.6,3,2.4,p.lt,.35);A.C(-3.4,by-5,.8,'#ffffff',.6);
   if(!back){const ex=side?2.5:0;A.E(-2.6+ex,by-1,1.6,S.k?2.2:1.6,p.c);if(!side)A.E(2.6,by-1,1.6,S.k?2.2:1.6,p.c);A.R(-1.4+ex,by+2.6,2.8,S.h?1.8:.7,'#05040a')}
   if(S.k||S.h)A.glow(side?6:0,by,7,p.c,.8);
   for(let i=0;i<3;i++){const a=t*1.6+i*TAU/3,x=Math.cos(a)*11,y=by-2+Math.sin(a)*4;A.R(x-1.6,y-1.2,3.2,2.4,'#efe4c8',Math.sin(a)>0?.95:.4);A.R(x-1,y-.4,2,.4,'#8a7a5a',.8)}
   fin(A,[-12,by-10,12,by+10],p)};
  /* 열쇠 거미: 열쇠 고리 몸통 + 열쇠 막대 다리 */
  R.m_dgspider=A=>{const p=pal(A),S=st(A),t=A.t,by=-6+(S.walking?-Math.abs(S.s)*.6:0)-(S.k?1:0),side=S.v==='side',back=S.v==='back';
   for(const s of [-1,1])for(let i=0;i<3;i++){const ph=S.walking?Math.sin(A.o.walk*TAU*2+i*2+(s>0?1:0))*1.6:Math.sin(t*3+i)*.4,kx=s*(5+i*1.2),fx=s*(9+i*2.2)+ph*.4,fy=-1+(i-1)*1.5;
    A.L(s*2,by,kx,by-3-i*.4,p.b,1.1);A.L(kx,by-3-i*.4,fx,fy+ph*.3,p.b,1);A.R(fx-.6,fy-.8+ph*.3,1.2,1.6,p.lt);A.R(fx+(s>0?-1.2:.6),fy+.2+ph*.3,.8,.8,p.lt)}
   A.ring(0,by-2,4.4,1.6,p.a);A.ring(0,by-2,4.4,.5,p.lt,.6);A.orb(0,by+2.4,3.4,p.a,p.dk,p.lt);
   if(!back){const ex=side?1.6:0;for(const [x,y] of [[-1.6,-3.2],[1.6,-3.2],[-.8,-4.4],[.8,-4.4]])A.C(x+ex,by+y+5,.55,p.c);A.R(-1.2+ex,by+3.6,.6,S.h?1.8:.8,'#ffffff');A.R(.6+ex,by+3.6,.6,S.h?1.8:.8,'#ffffff')}
   A.glow(0,by-2,4,p.c,.5);fin(A,[-14,by-9,14,1],p)};
  /* 자물쇠 골렘: 커다란 자물쇠 몸 · 열쇠구멍 얼굴 */
  R.m_dglock=A=>{const p=pal(A),S=st(A),t=A.t,b=S.bob,side=S.v==='side',back=S.v==='back',w=side?14:18,arm=S.k?-6:S.h?3:0;
   for(const [x,sg] of [[-6,1],[3,-1]]){const lift=S.walking?Math.max(0,S.s*sg)*1.4:0;A.R(x,-5-lift,3.6,5,p.dk);A.R(x-.4,-1.2-lift,4.4,1.2,'#0a0b10')}
   A.ring(0,-22+b,7,2.6,p.lt);A.ring(0,-22+b,7,1,'#ffffff',.35);A.R(-7,-22+b,2.6,4,p.lt);A.R(4.4,-22+b,2.6,4,p.lt);
   A.R(-w/2,-19+b,w,15,p.dk);A.R(-w/2+.7,-18.3+b,w-1.4,13.6,p.a);A.R(-w/2+.7,-18.3+b,w-1.4,1.4,p.lt);A.R(-w/2+.7,-6+b,w-1.4,1.2,p.dd);
   for(const s of [-1,1]){A.R(s*(w/2+1.4)-1.6,-16+b+arm,3.2,8,p.dk);A.R(s*(w/2+1.4)-2,-9+b+arm,4,3,p.b)}
   if(!back){A.C(0,-13+b,2,'#0a0610');A.P([[-1.2,-12+b],[1.2,-12+b],[1.8,-8+b],[-1.8,-8+b]],'#0a0610');A.C(0,-13+b,1,p.c);A.glow(0,-12+b,6,p.c,S.k?1:.6);
    const ex=side?2:0;A.slit(-4.6+ex,-14+b,2.6,1.4,p.c,.3);if(!side)A.slit(4.6,-14+b,2.6,1.4,p.c,-.3)}
   for(let i=0;i<4;i++)A.C(-w/2+2+i*(w-4)/3,-7.6+b,.6,p.lt);fin(A,[-13,-30+b,13,0],p)};
  /* 빈 갑옷 기사: 속이 빈 갑옷 · 투구 틈의 빛 · 대검 */
  R.m_dgknight=A=>{const p=pal(A),S=st(A),t=A.t,b=S.bob,side=S.v==='side',back=S.v==='back',up=S.k?1:0,hit=S.h?1:0;
   for(const [x,sg] of [[-4.4,1],[1.4,-1]]){const lift=S.walking?Math.max(0,S.s*sg)*1.6:0;A.R(x,-8-lift,3,8,p.dk);A.R(x+.4,-8-lift,2.2,7,p.a);A.R(x-.4,-1.2-lift,3.8,1.2,'#0a0b10')}
   A.R(-6,-19+b,12,11,p.dk);A.R(-5.4,-18.4+b,10.8,10,p.a);A.R(-5.4,-18.4+b,10.8,1.2,p.lt);A.R(-1,-17+b,2,7,p.b);A.E(0,-13+b,3,3.4,'#0a0614',.85);A.glow(0,-13+b,5,p.c,.45);
   for(const s of [-1,1]){A.E(s*6.6,-17.4+b,3.2,2.2,p.dk);A.E(s*6.6,-17.8+b,2.8,1.8,p.a);A.E(s*6.2,-18.4+b,1.6,.8,p.lt,.6)}
   A.E(0,-23.6+b,4.6,4.6,p.dk);A.E(0,-23.8+b,4,4.2,p.a);A.R(-4,-25+b,8,1,p.lt,.6);A.P([[0,-29+b],[1.4,-27.6+b],[-1.4,-27.6+b]],p.c);
   if(!back){A.R(side?-.6:-3,-23.6+b,side?3.6:6,1.2,'#05040a');A.R(side?.4:-2.4,-23.4+b,side?2.4:4.8,.6,p.c);A.glow(side?1:0,-23.4+b,4,p.c,.7)}
   /* 대검 */const sx=side?5:7.4,ang=up?-2.3:hit?.4:-1.2,L=15,hx=sx,hy=-12+b;const tx=hx+Math.cos(ang)*L,ty=hy+Math.sin(ang)*L;
   A.L(hx,hy,tx,ty,p.lt,1.6);A.L(hx,hy,tx,ty,'#ffffff',.5,.7);A.L(hx-Math.sin(ang)*2,hy+Math.cos(ang)*2,hx+Math.sin(ang)*2,hy-Math.cos(ang)*2,'#c9a24a',1);A.C(hx,hy,1.1,p.b);
   if(hit)A.glow(tx,ty,6,p.c,.9);fin(A,[-13,-31+b,13,0],p)};
  /* 보스: 봉인 기록관 아르카 — 서랍장 몸통 · 열쇠구멍 외눈 · 사슬 팔 · 떠도는 문서 */
  R.c_dgarca=A=>{const t=A.t,o=A.o,b=Math.sin(t*1.6)*.8,up=o.atk?1:0,hit=o.hit?1:0,rage=o.rage?1:0,C1='#2a1a3a',C2='#4a3058',C3='#6a4a78',GD='#c9a24a',GL='#ffd84a',EY=rage?'#ff5a7a':'#c9a8ff',WD='#4a2e18',WL='#7a5030';
   A.E(0,1,22,2.6,'#000',.45);
   /* 다리: 책 더미 기둥 */for(const s of [-1,1]){for(let i=0;i<4;i++){const c=['#7a2a3a','#2a4a7a','#3a6a3a','#8a6a2a'][(i+(s>0?2:0))%4];A.R(s*9-5,-4-i*3.6,10,3.4,c);A.R(s*9-5,-4-i*3.6,10,.7,'#ffffff',.25);A.R(s*9-5,-1.2-i*3.6,10,.5,'#000',.3)}}
   /* 몸통: 서랍장 */A.R(-15,-38+b,30,24,WD);A.R(-14.2,-37.2+b,28.4,22.4,WL);A.R(-14.2,-37.2+b,28.4,1.4,'#9a6a40');
   for(let r=0;r<3;r++)for(let c=0;c<2;c++){const x=-13+c*13.4,y=-35+b+r*7;A.R(x,y,12.6,6,'#5a3a20');A.R(x+.4,y+.4,11.8,1,'#8a5a34');A.R(x+5,y+2.6,2.6,1,GD)}
   /* 가슴 열쇠구멍 핵 */A.C(0,-27+b,4.2,'#120818');A.C(0,-27+b,3,EY);A.P([[-1.4,-25.4+b],[1.4,-25.4+b],[2,-21.6+b],[-2,-21.6+b]],'#120818');A.C(0,-27.6+b,1.4,'#ffffff',.8);A.glow(0,-26+b,10,EY,.9);
   /* 어깨 · 사슬 팔 */for(const s of [-1,1]){A.E(s*17,-36+b,5.4,4,C2);A.E(s*17,-36.6+b,4.6,3.2,C3);const ay=-34+b+(up?-10:hit?6:0),hx=s*(22+(up?2:0)),hy=ay+14;
    for(let i=0;i<6;i++){const q=i/5,x=s*18+(hx-s*18)*q,y=ay+(hy-ay)*q+Math.sin(t*3+i)*.6;A.ring(x,y,1.4,.6,'#8a84a0')}
    A.R(hx-3.4,hy-1,6.8,7,'#efe4c8');A.R(hx-3.4,hy-1,6.8,1,'#ffffff',.6);for(let i=0;i<3;i++)A.R(hx-2.4,hy+1.4+i*1.6,4.8,.5,'#8a7a5a');if(hit)A.glow(hx,hy+3,7,GL,.8)}
   /* 머리: 두건 · 열쇠구멍 외눈 */A.E(0,-44+b,8.6,7.6,C1);A.E(0,-44.6+b,7.8,6.8,C2);A.P([[-8,-46+b],[0,-55+b],[8,-46+b]],C1);A.P([[-6.6,-46.6+b],[0,-53.4+b],[6.6,-46.6+b]],C2);
   A.E(0,-43+b,5,4,'#05030a');A.C(0,-44+b,2.4,EY);A.P([[-1,-43+b],[1,-43+b],[1.4,-40.6+b],[-1.4,-40.6+b]],EY);A.C(-.6,-44.8+b,.7,'#ffffff');A.glow(0,-43+b,8,EY,1);
   for(let i=0;i<3;i++){const a=t*.9+i*TAU/3;A.R(Math.cos(a)*24-2,-30+b+Math.sin(a)*8-1.6,4,3,'#efe4c8',Math.sin(a)>0?.9:.35)}
   A.rise&&A.rise(6,-14,14,-10,30,.4,EY,.8,3);
   A.bbox=[-28,-56+b,28,2];A.aura=EY;if(rage)A.rim='rgba(255,90,122,.7)'};
 }
 const MP={mimic:{n:'dgm',a:'#8a5a34',b:'#4a2e18',c:'#ffd84a'},moth:{n:'dgo',a:'#b8a07a',b:'#5a4a30',c:'#9ad8ff'},ink:{n:'dgi',a:'#3a3a6a',b:'#141428',c:'#5affd8'},spider:{n:'dgs',a:'#c9a24a',b:'#6a5020',c:'#ff5a7a'},lock:{n:'dgl',a:'#8a90a8',b:'#3a3e50',c:'#ffd84a'},knight:{n:'dgk',a:'#7a7e98',b:'#2a2c3a',c:'#b48aff'}};
 const SPC={mimic:{nm:'서랍 미믹',hp:60,dmg:8,sp:42,s:1,r:9},moth:{nm:'종이 나방',hp:38,dmg:6,sp:70,s:.95,r:8,fly:1},ink:{nm:'잉크 유령',hp:48,dmg:7,sp:46,s:1,r:9,fly:1},spider:{nm:'열쇠 거미',hp:44,dmg:7,sp:92,s:.95,r:8},lock:{nm:'자물쇠 골렘',hp:170,dmg:14,sp:30,s:1.15,r:11},knight:{nm:'빈 갑옷 기사',hp:115,dmg:12,sp:50,s:1.1,r:10}};
 const POOL=f=>f<=3?['mimic','moth']:f<=6?['mimic','moth','spider']:f<=9?['mimic','moth','spider','ink']:f<=13?['moth','spider','ink','knight','mimic']:['mimic','moth','spider','ink','knight','lock'];
 const DM={easy:.75,normal:1,hard:1.3,extreme:1.65};

 /* ================= ③ 던전 층 ================= */
 const BG={};function floorBg(band){if(BG[band])return BG[band];const c=document.createElement('canvas'),k=3;c.width=W*k;c.height=H*k;const o=c.getContext('2d');o.scale(k,k);o.imageSmoothingEnabled=false;const r=R0(91+band);
  const TH=[['#1e1a2e','#26203a','#2e2848','#3a3450','#7a5a3a'],['#14202a','#182834','#1e3240','#2a3a48','#3a7ab0'],['#2a1414','#341a18','#40201c','#4a2a24','#ff7a3a'],['#140c24','#1a1030','#22163e','#2e2050','#b48aff']][band];
  o.fillStyle='#06050a';o.fillRect(0,0,W,H);brickC(o,0,0,W,AY+56,TH[2],TH[3],95+band);o.fillStyle='#00000066';o.fillRect(0,AY+50,W,6);
  for(let y=AY+56;y<H;y+=14)for(let x=0;x<W;x+=14){const v=r();o.fillStyle=v<.33?TH[0]:v<.66?TH[1]:TH[2];o.fillRect(x,y,14,14);o.fillStyle=TH[3];o.fillRect(x,y,14,1);o.fillRect(x,y,1,14)}
  /* 구역별 꾸밈 */if(band===0){for(const bx of [AX+10,AX+AW-50]){o.fillStyle='#3a2414';o.fillRect(bx,AY,40,54);for(let sh=0;sh<3;sh++){let x=bx+2;while(x<bx+38){const w=2+Math.floor(r()*3),h=7+Math.floor(r()*5);o.fillStyle=['#7a2a3a','#2a4a7a','#3a6a3a','#8a6a2a'][Math.floor(r()*4)];o.fillRect(x,AY+14+sh*16-h,w,h);x+=w}}}for(let i=0;i<30;i++){o.fillStyle=r()<.5?'#e8dcc0':'#c8b890';o.fillRect(AX+r()*AW,AY+64+r()*(AH-70),3,2)}}
  if(band===1){for(let i=0;i<9;i++){const x=AX+30+r()*(AW-60),y=AY+70+r()*(AH-90);o.fillStyle='rgba(60,120,180,.25)';o.beginPath();o.ellipse(x,y,14+r()*20,5+r()*5,0,0,TAU);o.fill()}for(let x=AX;x<AX+AW;x+=6){o.fillStyle='#2a4a5a';o.fillRect(x,AY+44,2,6+r()*8)}}
  if(band===2){for(let i=0;i<7;i++){const x=AX+30+r()*(AW-60),y=AY+70+r()*(AH-90);o.strokeStyle='#ff6a2a';o.globalAlpha=.4;o.lineWidth=1;o.beginPath();o.moveTo(x,y);for(let j=0;j<5;j++)o.lineTo(x+(r()-.5)*20,y+(r()-.5)*10);o.stroke();o.globalAlpha=1}for(const x of [AX+60,AX+AW-60]){o.fillStyle='#3a2a2a';o.fillRect(x-10,AY+20,20,30);o.fillStyle='#ff7a2a';o.fillRect(x-6,AY+28,12,8)}}
  if(band===3){for(let i=0;i<40;i++){o.fillStyle='rgba(180,140,255,'+(.1+r()*.3)+')';o.fillRect(r()*W,r()*AY+20,1,1)}for(let i=0;i<6;i++){const x=AX+30+r()*(AW-60),y=AY+70+r()*(AH-90);o.strokeStyle='rgba(180,140,255,.3)';o.beginPath();o.arc(x,y,6+r()*8,0,TAU);o.stroke()}}
  for(const [x,y] of [[AX+18,AY+60],[AX+AW-26,AY+60],[AX+18,AY+AH-50],[AX+AW-26,AY+AH-50]]){o.fillStyle='#00000055';o.beginPath();o.ellipse(x+4,y+40,10,3,0,0,TAU);o.fill();o.fillStyle=TH[3];o.fillRect(x,y,8,40);o.fillStyle='#ffffff18';o.fillRect(x,y,2,40)}
  const vg=o.createRadialGradient(W/2,H*.6,60,W/2,H*.6,320);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.6)');o.fillStyle=vg;o.fillRect(0,0,W,H);return BG[band]=c}
 const bandOf=f=>f>=16?3:f>=11?2:f>=6?1:0,BAND=['낡은 서고','물에 잠긴 금고','열쇠 대장간','허공의 기록'],TCOL=['#ffb84a','#8ad8ff','#ff7a3a','#c9a8ff'];
 function startDungeon(f){const m=DM[diff]||1;try{resetP(MX,BY1-10)}catch(e){}P.face={x:0,y:-1};P.maxhp=P.maxhp||110;P.hp=P.maxhp;P._hit129=0;P._stun129=0;D={me:{atk:0,dash:null,parryT:0,inv:0},fx:[],pops:[]};startFloor(f)}
 function startFloor(f){const m=DM[diff]||1,N=f>=20?0:3+Math.round(f*.95);D.f=f;D.mobs=[];D.shots=[];D.tele=[];D.left=N;D.spawned=0;D.cap=3+Math.floor(f/3);D.spT=performance.now()+900;D.clear=f>=20?false:false;D.stair=0;D.m=m;D.bnm=null;D.boss=null;D.alt=0;D.portal=0;
  P.x=MX;P.y=BY1-10;P.face={x:0,y:-1};const d=DV();d.best=Math.max(d.best||0,f);if(f===1||f===6||f===11||f===16)d.cp=f;save();go(f>=20?'f20':'floor',{fade:performance.now()});sfx2('ok')}
 function spawnMob(){const f=D.f,pool=POOL(f),k=pool[Math.floor(Math.random()*pool.length)],b=SPC[k],m=D.m,el=f>=5&&Math.random()<.08+f*.012;let x,y,tries=0;do{x=BX0+20+Math.random()*(BX1-BX0-40);y=BY0+10+Math.random()*(BY1-BY0-30);tries++}while(Math.hypot(x-P.x,y-P.y)<80&&tries<20);
  const hp=Math.round(b.hp*(1+.22*(f-1))*m*(el?2.2:1));D.mobs.push({k,x,y,hp,mx:hp,dmg:Math.round(b.dmg*(1+.08*(f-1))*m*(el?1.3:1)),sp:b.sp*(1+.012*f),s:b.s*1.2*(el?1.3:1),r:b.r*(el?1.3:1),el,st:'spawn',t:performance.now(),cd:800+Math.random()*900,face:{x:Math.random()<.5?-1:1,y:0},hitT:0,kx:0,ky:0,view:'front',wk:0});D.spawned++}
 const ang=(a,b)=>Math.abs(((a-b+Math.PI*3)%(Math.PI*2))-Math.PI);
 function hurtMe(dmg,src){const now=performance.now(),me=D.me;if(now<me.inv||now<(P._hit129||0)){dpop(P.x,P.y-34,'회피','#9fe8ff');return false}P.hp=Math.max(0,P.hp-dmg);P._hit129=now+600;if(src){const a=Math.atan2(P.y-src.y,P.x-src.x);P.x+=Math.cos(a)*7;P.y+=Math.sin(a)*7;clampB(P)}dpop(P.x,P.y-34,'-'+dmg,'#ff5a7a');spark(P.x,P.y-12,'#ff5a7a',8);snd(160,.12,'square',.07,80);D.shake=now;return true}
 function myAtk(){const now=performance.now(),me=D.me;if(!D||now<(P.atkCd||0)||now<(P._stun129||0)||P.hp<=0)return;
  if(D.ph==='arch'){if(nearDrawer())openDrawer();return}if(D.ph==='f20'&&!D.alt&&Math.hypot(P.x-MX,P.y-((BY0+BY1)/2))<34){placePaper();return}if(D.ph!=='floor'&&D.ph!=='boss')return;
  P.atkCd=now+240;let tg=null,bd=60;for(const m of D.mobs){if(m.hp<=0||m.st==='spawn')continue;const d=Math.hypot(m.x-P.x,m.y-P.y);if(d<bd){bd=d;tg=m}}if(D.boss&&D.boss.hp>0){const d=Math.hypot(D.boss.x-P.x,D.boss.y-P.y)-12;if(d<bd){bd=d;tg=D.boss}}
  const a=tg?Math.atan2(tg.y-P.y,tg.x-P.x):Math.atan2(P.face.y||0,P.face.x||1);if(Math.abs(Math.cos(a))>.3)P.face={x:Math.sign(Math.cos(a)),y:0};P.lungeT=now;P.lungeA=a;P.lungeDur=130;me.atk=now;
  const w=curWp()||{};D.fx.push({k:'sl',x:P.x+Math.cos(a)*6,y:P.y-9+Math.sin(a)*6,a,col:w.trail||'#ffffff',t:now});snd(520,.05,'square',.04,300);
  let pet=0;try{pet=(PETS[shopInv().eq.pt]||{}).dmg||0}catch(e){}
  const hit=(m,big)=>{const dx=m.x-P.x,dy=m.y-P.y,d=Math.hypot(dx,dy);if(d>34+(big?14:m.r*.5))return;if(d>12&&ang(Math.atan2(dy,dx),a)>1.3)return;
   const crit=Math.random()<(w.crit||0)+.05,dmg=Math.round(34*(w.dmg||1)*(1+pet)*(crit?1.8:1)*(m.st==='stun'?1.5:1));m.hp=Math.max(0,m.hp-dmg);m.hitT=now;try{window.SK130&&SK130.gain(big?4:3)}catch(e){}if(!big){m.kx+=Math.cos(a)*90;m.ky+=Math.sin(a)*90;if(!m.el&&m.st==='wind'&&Math.random()<.35){m.st='move';m.cd=500}}
   dpop(m.x,m.y-(big?60:28),(crit?'치명! ':'')+dmg,crit?'#ffd84a':'#ffffff');spark(m.x,m.y-(big?30:10),w.trail||'#ffffff',5);snd(crit?900:700,.06,'sawtooth',.05,200);
   if(m.hp<=0&&!big){spark(m.x,m.y-8,MP[m.k].c,14);snd(300,.15,'triangle',.05,90);D.left--}};
  for(const m of D.mobs)if(m.hp>0&&m.st!=='spawn')hit(m,false);if(D.boss&&D.boss.hp>0&&D.boss.st!=='intro')hit(D.boss,true)}
 function myDash(){const now=performance.now(),me=D&&D.me;if(!me||now<(P.dashCd||0)||now<(P._stun129||0)||P.hp<=0)return;let [mx,my]=moveInput();if(Math.hypot(mx,my)<.1){mx=P.face.x||0;my=P.face.y||-1}const l=Math.hypot(mx,my)||1;me.dash={vx:mx/l,vy:my/l,t:now};P.dashCd=now+520;me.inv=now+200;snd(300,.08,'triangle',.04,800)}
 function myParry(){const now=performance.now();if(!D||!D.me||now<(P.parryCd||0)||P.hp<=0)return;D.me.parryT=now;P.parryT=now;P.parryCd=now+600}
 {const f=doAttack;doAttack=function(){if(mode==='dg129'){if(D&&D.ph!=='doc')myAtk();return}return f.apply(this,arguments)}}
 {const f=doDash;doDash=function(){if(mode==='dg129'){if(D&&D.me)myDash();return}return f.apply(this,arguments)}}
 if(typeof tryParry==='function'){const f=tryParry;tryParry=function(){if(mode==='dg129'){myParry();return}return f.apply(this,arguments)}}
 if(typeof tryUlt==='function'){const f=tryUlt;tryUlt=function(){if(mode==='dg129')return;return f.apply(this,arguments)}}
 /* 괴물 움직임 */
 function mobAI(m,now,dt){const dx=P.x-m.x,dy=P.y-m.y,d=Math.hypot(dx,dy)||1,me=D.me;m.cd-=dt*1000;m.x+=m.kx*dt;m.y+=m.ky*dt;m.kx*=.86;m.ky*=.86;clampB(m);m.walk=false;
  const step=(vx,vy,sp)=>{const l=Math.hypot(vx,vy)||1;m.x+=vx/l*sp*dt;m.y+=vy/l*sp*dt;clampB(m);m.walk=true;m.wk+=dt;m.view=Math.abs(vx)>Math.abs(vy)?'side':vy<0?'back':'front';if(Math.abs(vx)>.2)m.face={x:Math.sign(vx),y:0}};
  if(m.st==='spawn'){if(now-m.t>650)m.st='move';return}
  if(m.st==='stun'){if(now-m.t>1000){m.st='move';m.cd=500}return}
  const contact=(r)=>{if(Math.hypot(P.x-m.x,P.y-m.y)<r){if(now-me.parryT<200){try{window.SK130&&SK130.gain(8)}catch(e){}m.st='stun';m.t=now;dpop(m.x,m.y-30,'PARRY!','#ffe79a');spark(m.x,m.y-12,'#ffe79a',14);snd(1600,.12,'square',.06,1200);return true}hurtMe(m.dmg,m);return true}return false};
  const k=m.k;
  if(m.st==='wind'){if(Math.abs(dx)>3)m.face={x:Math.sign(dx),y:0};const wd={mimic:450,moth:300,ink:520,spider:220,lock:820,knight:600}[k]*(m.el?.85:1);if(now-m.t<wd)return;m.st='act';m.t=now;
   if(k==='mimic'){m.ax=P.x;m.ay=P.y}else if(k==='moth'||k==='knight'){m.vx=Math.cos(m.aa);m.vy=Math.sin(m.aa)}
   else if(k==='ink'){const n=D.f>=12?3:1;for(let i=0;i<n;i++){const a=m.aa+(i-(n-1)/2)*.28;D.shots.push({x:m.x,y:m.y-12,vx:Math.cos(a)*100,vy:Math.sin(a)*100,r:4,dmg:m.dmg,t:now,col:MP.ink.c})}snd(500,.08,'sine',.04,200);m.st='move';m.cd=2300}
   else if(k==='spider'){contact(22);m.st='move';m.cd=1000}
   else if(k==='lock'){if(Math.hypot(P.x-m.x,P.y-m.y)<32)contact(32);spark(m.x,m.y,'#c8c0d8',16);D.shake=now;snd(90,.25,'sawtooth',.07,50);m.st='move';m.cd=2200}
   return}
  if(m.st==='act'){const q=now-m.t;
   if(k==='mimic'){const t2=Math.min(1,q/350);m.x+=(m.ax-m.x)*Math.min(1,dt*10);m.y+=(m.ay-m.y)*Math.min(1,dt*10);clampB(m);if(t2>=1){contact(17);spark(m.x,m.y,'#c8b89a',8);m.st='move';m.cd=1600}return}
   if(k==='moth'){m.x+=m.vx*230*dt;m.y+=m.vy*230*dt;clampB(m);if(!m.hitDone&&contact(11))m.hitDone=1;if(q>450){m.hitDone=0;m.st='move';m.cd=2000}return}
   if(k==='knight'){m.x+=m.vx*260*dt;m.y+=m.vy*260*dt;clampB(m);D.fx.push({k:'sp',x:m.x,y:m.y-10,vx:0,vy:0,col:MP.knight.c,t:now,g:0});if(!m.hitDone&&contact(13))m.hitDone=1;if(q>420){m.hitDone=0;m.st='move';m.cd=2400}return}
   m.st='move';return}
  /* 걷기 + 기술 고르기 */
  if(k==='mimic'){if(d<64&&m.cd<=0){m.st='wind';m.t=now;return}step(dx,dy,m.sp)}
  else if(k==='moth'){if(m.cd<=0&&d<120){m.st='wind';m.t=now;m.aa=Math.atan2(dy,dx);return}const a=Math.atan2(m.y-P.y,m.x-P.x)+.9*dt*3,R=70;step(P.x+Math.cos(a)*R-m.x,P.y+Math.sin(a)*R*.7-m.y,m.sp)}
  else if(k==='ink'){if(m.cd<=0){m.st='wind';m.t=now;m.aa=Math.atan2(dy,dx);return}if(d<70)step(-dx,-dy,m.sp);else if(d>120)step(dx,dy,m.sp);else step(-dy,dx,m.sp*.5)}
  else if(k==='spider'){if(d<22&&m.cd<=0){m.st='wind';m.t=now;return}step(dx+Math.sin(now/300+m.x)*20,dy,m.sp)}
  else if(k==='lock'){if(d<40&&m.cd<=0){m.st='wind';m.t=now;D.tele.push({k:'c',x:m.x,y:m.y,r:32,t:now,dur:820*(m.el?.85:1)});return}step(dx,dy,m.sp)}
  else if(k==='knight'){if(d>46&&d<160&&m.cd<=0){m.st='wind';m.t=now;m.aa=Math.atan2(dy,dx);D.tele.push({k:'l',x:m.x,y:m.y-6,a:m.aa,len:150,w:12,t:now,dur:600*(m.el?.85:1)});return}step(dx,dy,m.sp)}}
 function drawMob(m,now){const p=MP[m.k],b=SPC[m.k],pose=m.st==='wind'?'a':m.st==='act'?'s':m.walk?'w':'i',fi=pose==='w'?Math.floor(now/110):pose==='i'?Math.floor(now/250):pose==='a'?Math.floor(now/90):Math.floor(now/120);
  let img=null;try{img=TW71.mobFrame('dg'+m.k,p,m.el,m.view||'front',pose,fi)}catch(e){}const s=m.s,al=m.st==='spawn'?Math.min(1,(now-m.t)/650):1;
  if(m.st==='spawn'){const q=(now-m.t)/650;ctx.save();ctx.strokeStyle=p.c;ctx.globalAlpha=1-q;ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(m.x,m.y+2,6+q*16,2+q*5,0,0,TAU);ctx.stroke();ctx.restore()}
  if(!b.fly){ctx.save();ctx.globalAlpha=.35*al;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(m.x,m.y+1,m.r,m.r*.35,0,0,TAU);ctx.fill();ctx.restore()}else{ctx.save();ctx.globalAlpha=.25*al;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(m.x,m.y+1,m.r*.8,m.r*.28,0,0,TAU);ctx.fill();ctx.restore()}
  if(img){ctx.save();ctx.translate(m.x,m.y);ctx.scale(m.view==='side'&&m.face.x<0?-s:s,s);ctx.globalAlpha=al;ctx.drawImage(img,-20,-35,40,40);if(now-m.hitT<90){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.7;ctx.drawImage(img,-20,-35,40,40)}ctx.restore()}
  else{ctx.fillStyle=p.a;ctx.fillRect(m.x-6,m.y-14,12,14)}
  if(m.st==='stun')for(let i=0;i<3;i++){const a=now/200+i*TAU/3;ctx.fillStyle='#ffe79a';ctx.fillRect(m.x+Math.cos(a)*8-1,m.y-30*s+Math.sin(a)*3,3,3)}
  if(m.st==='wind'&&(m.k==='mimic'||m.k==='spider'||m.k==='moth')){ctx.save();ctx.globalAlpha=.6+.4*Math.sin(now/40);txt('!',m.x,m.y-30*s,12,'#ff5a7a');ctx.restore()}
  if(m.hp<m.mx){const w=18*s;ctx.fillStyle='#000a';ctx.fillRect(m.x-w/2-1,m.y-34*s-1,w+2,4);ctx.fillStyle=m.el?'#ffd84a':'#ff5a7a';ctx.fillRect(m.x-w/2,m.y-34*s,w*m.hp/m.mx,2)}}
 function teleDraw(now){D.tele=D.tele.filter(e=>now-e.t<e.dur);for(const e of D.tele){const q=(now-e.t)/e.dur;ctx.save();ctx.fillStyle='rgba(255,60,90,'+(.12+q*.25)+')';ctx.strokeStyle='rgba(255,90,120,'+(.5+q*.4)+')';ctx.lineWidth=1;
   if(e.k==='c'){ctx.beginPath();ctx.ellipse(e.x,e.y,e.r,e.r*.6,0,0,TAU);ctx.fill();ctx.stroke();ctx.beginPath();ctx.ellipse(e.x,e.y,e.r*q,e.r*.6*q,0,0,TAU);ctx.fill()}
   else if(e.k==='l'){ctx.translate(e.x,e.y);ctx.rotate(e.a);ctx.fillRect(0,-e.w/2,e.len,e.w);ctx.strokeRect(0,-e.w/2,e.len,e.w);ctx.fillRect(0,-e.w/2,e.len*q,e.w)}
   else if(e.k==='cone'){ctx.beginPath();ctx.moveTo(e.x,e.y);ctx.arc(e.x,e.y,e.r,e.a-e.sp,e.a+e.sp);ctx.closePath();ctx.fill();ctx.stroke()}ctx.restore()}}
 function shotsTick(now,dt){for(const s of D.shots){s.x+=s.vx*dt;s.y+=s.vy*dt;if(Math.hypot(P.x-s.x,P.y-12-s.y)<s.r+6){if(now-D.me.parryT<200){try{window.SK130&&SK130.gain(8)}catch(e){}s.dead=1;dpop(P.x,P.y-34,'PARRY!','#ffe79a');spark(s.x,s.y,'#ffe79a',8);snd(1600,.1,'square',.05,1200)}else{if(hurtMe(s.dmg,s))s.dead=1}}
   if(s.x<AX||s.x>AX+AW||s.y<AY+30||s.y>AY+AH+10||now-s.t>5000)s.dead=1}D.shots=D.shots.filter(s=>!s.dead);
  for(const s of D.shots){ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(s.x,s.y,1,s.x,s.y,s.r*2.4);g.addColorStop(0,s.col);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(s.x-s.r*2.4,s.y-s.r*2.4,s.r*4.8,s.r*4.8);ctx.restore();ctx.fillStyle='#0a0814';ctx.beginPath();ctx.arc(s.x,s.y,s.r*.7,0,TAU);ctx.fill();ctx.fillStyle=s.col;ctx.fillRect(s.x-1,s.y-1,2,2)}}
 function stairDraw(now){const q=Math.min(1,(now-D.stair)/700),x=MX,y=BY0-6;ctx.save();ctx.globalAlpha=q;for(let i=0;i<4;i++){ctx.fillStyle=i%2?'#4a4462':'#5a5478';ctx.fillRect(x-20+i*2,y-i*5,40-i*4,5)}ctx.fillStyle='#0a0614';ctx.fillRect(x-12,y-30,24,12);
  ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(x,y-12,2,x,y-12,40);g.addColorStop(0,'rgba(255,230,160,.6)');g.addColorStop(1,'rgba(255,230,160,0)');ctx.fillStyle=g;ctx.fillRect(x-40,y-52,80,80);ctx.restore();txt('▲ '+(D.f+1)+'층으로',x,y+16,9,'#ffe9a8',(.6+.4*Math.sin(now/250))*q)}
 function hud(now){const og=(typeof G!=='undefined')?G:null;try{G=Object.assign(Object.create(og||{}),{ult:0,state:'play',sp:null,spUsed:false});drawPlayerHUD(now)}catch(e){}finally{G=og}
  if(D.f<20){const tc=TCOL[bandOf(D.f)],s1='봉인 보관소 '+D.f+'층',s2=BAND[bandOf(D.f)]+' · 남은 괴물 '+Math.max(0,D.left);ctx.save();ctx.fillStyle='#04070acc';ctx.fillRect(AX+4,6,190,24);ctx.fillStyle=tc;ctx.fillRect(AX+4,6,3,24);ltxt(s1,AX+12,17,'900 11px sans-serif',tc);ltxt(s2,AX+12,27,'bold 8px sans-serif','#e8eef6');
   /* 층 막대 20칸 */for(let i=0;i<20;i++){ctx.fillStyle=i<D.f-1?tc:i===D.f-1?'#ffffff':'#ffffff22';ctx.fillRect(AX+AW-126+i*6,12,5,4)}ltxt('20F',AX+AW-6,27,'bold 8px sans-serif','#e8eef6',1,'right');ctx.restore()}}
 function floor(now,dt,t){const me=D.me;if(P.hp>0)moveMe(now,dt,okRect);
  if(P.hp>0&&!D.stair&&now>D.spT){const alive=D.mobs.filter(m=>m.hp>0).length,total=3+Math.round(D.f*.95);if(alive<D.cap&&D.spawned<total){spawnMob();D.spT=now+500+Math.random()*500}}
  for(const m of D.mobs)if(m.hp>0)mobAI(m,now,dt);D.mobs=D.mobs.filter(m=>m.hp>0||now-m.hitT<60);
  if(!D.stair&&D.left<=0&&P.hp>0){D.stair=now;const g=30+D.f*10;try{addCoins(g)}catch(e){}P.hp=Math.min(P.maxhp,P.hp+Math.round(P.maxhp*.25));dpop(P.x,P.y-40,'층 정리! 🪙+'+g+' · 체력 회복','#ffe9a8');snd(880,.3,'sine',.06,1320)}
  const sh=D.shake&&now-D.shake<160?(Math.random()-.5)*3:0;ctx.save();ctx.translate(sh,0);ctx.drawImage(floorBg(bandOf(D.f)),0,0,W,H);
  for(const x of [AX+100,MX,AX+AW-100])torch(x,AY+30,now);teleDraw(now);if(D.stair)stairDraw(now);
  const L=D.mobs.map(m=>({y:m.y,fn:()=>drawMob(m,now)}));L.push({y:P.y,fn:()=>drawMe(now)});L.sort((a,b)=>a.y-b.y).forEach(o=>{try{o.fn()}catch(e){}});shotsTick(now,dt);fxDraw(now);ctx.restore();hud(now);
  if(D.fade&&now-D.fade<700){const q=(now-D.fade)/700;ctx.fillStyle='rgba(0,0,0,'+(1-q)+')';ctx.fillRect(0,0,W,H);txt(D.f+'층',W/2,H/2,26,TCOL[bandOf(D.f)],1-q*q)}
  if(t<5&&D.f===1)txt('괴물을 모두 쓰러뜨리면 위쪽에 계단이 열려요 · 공격 J · 대시 K · 패링 F',W/2,AY+AH-3,8,'#e8eef6',.75);
  if(D.stair&&Math.abs(P.x-MX)<18&&P.y<BY0+10&&now-D.stair>500)startFloor(D.f+1);
  if(P.hp<=0)die(now)}
 function die(now){if(D.dead)return;D.dead=now;setTimeout(()=>{const d=DV();showOverlay('봉인 보관소 · '+D.f+'층','쓰러졌어요','체크포인트 <b>'+(d.cp||1)+'층</b>부터 다시 할 수 있어요.',[['↺ '+(d.cp||1)+'층부터',()=>{$('overlay').hidden=true;mode='dg129';startDungeon(d.cp||1)},true],['기록실로',()=>{$('overlay').hidden=true;mode='dg129';try{resetP(MX,BY1-8)}catch(e){}D={fade:performance.now(),me:{atk:0,dash:null,parryT:0,inv:0},fx:[],pops:[]};go('arch')},false],['광장으로',()=>{$('overlay').hidden=true;toPlaza()},false]])},1200)}

 /* ================= ④ 20층 · 보스 ================= */
 const ALT={x:MX,y:(BY0+BY1)/2};
 function placePaper(){D.alt=performance.now();snd(990,.3,'sine',.05,1480);setTimeout(()=>{if(D&&D.ph==='f20'){go('bossIn',{alt:D.alt,chunks:[],parts:[]});snd(80,.8,'sawtooth',.09,40)}},1600)}
 const BW={x0:MX-40,x1:MX+40};/* 보스가 부수고 나오는 벽 자리 */
 function bossBg(now){ctx.drawImage(floorBg(3),0,0,W,H);for(const x of [AX+100,AX+AW-100])torch(x,AY+30,now);
  /* 제단 */const x=ALT.x,y=ALT.y;ctx.save();ctx.translate(x,y+6);ctx.scale(1,.42);ctx.strokeStyle='rgba(201,168,255,.5)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,40,0,TAU);ctx.stroke();ctx.rotate(now/3000);for(let i=0;i<8;i++){ctx.rotate(TAU/8);ctx.fillStyle='rgba(255,216,74,.5)';ctx.fillRect(30,-2,8,4)}ctx.restore();
  ctx.fillStyle='#000a';ctx.fillRect(x-13,y-2,28,8);ctx.fillStyle='#3a3450';ctx.fillRect(x-14,y-10,28,12);ctx.fillStyle='#5a5478';ctx.fillRect(x-14,y-10,28,2);ctx.fillStyle='#2a2440';ctx.fillRect(x-10,y-2,20,4);
  if(D.alt){const q=Math.min(1,(now-D.alt)/700),py=y-14-(1-q)*20;ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(x,py,1,x,py,26);g.addColorStop(0,'rgba(255,230,160,.6)');g.addColorStop(1,'rgba(255,230,160,0)');ctx.fillStyle=g;ctx.fillRect(x-26,py-26,52,52);ctx.restore();ctx.fillStyle='#efe4c8';ctx.fillRect(x-6,py-6,12,9);ctx.fillStyle='#a03a3a';ctx.fillRect(x+2,py+1,3,2)}}
 function wallBreak(now,q){/* 위쪽 벽에 구멍 */if(q<=0)return;const r=R0(19);ctx.fillStyle='#05030a';ctx.beginPath();ctx.moveTo(BW.x0,AY+54);for(let i=0;i<=10;i++){const x=BW.x0+(BW.x1-BW.x0)*i/10;ctx.lineTo(x,AY+54-(14+r()*24)*Math.min(1,q*1.4))}ctx.lineTo(BW.x1,AY+54);ctx.closePath();ctx.fill()}
 try{if(window.__V43BIG)__V43BIG.c_dgarca=1}catch(e){}/* 큰 그림판(80×70칸)에서 그림 */
 const BIG={cv:null};function bossImg(now,o){if(!BIG.cv){BIG.cv=document.createElement('canvas');BIG.cv.width=240;BIG.cv.height=210}const bo=BIG.cv.getContext('2d');bo.setTransform(1,0,0,1,0,0);bo.clearRect(0,0,240,210);bo.imageSmoothingEnabled=false;try{monDraw('c_dgarca',bo,{c:'#c9a8ff'},120,174,now,o,3)}catch(e){}return BIG.cv}
 function drawBoss(now){const b=D.boss,k=1.55,img=bossImg(now,{atk:b.st==='wind'?1:0,hit:b.st==='act'?1:0,rage:b.ph2?1:0});let al=1;if(b.st==='dead')al=Math.max(0,1-(now-b.t)/1800);
  ctx.save();ctx.globalAlpha=.4*al;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(b.x,b.y+2,28,7,0,0,TAU);ctx.fill();ctx.restore();
  ctx.save();ctx.globalAlpha=al;ctx.imageSmoothingEnabled=false;ctx.drawImage(img,b.x-40*k,b.y-58*k,80*k,70*k);if(now-b.hitT<90){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.45;ctx.drawImage(img,b.x-40*k,b.y-58*k,80*k,70*k)}ctx.restore();
  if(b.st==='dead'&&Math.random()<.6)D.fx.push({k:'sp',x:b.x+(Math.random()-.5)*60,y:b.y-Math.random()*70,vx:(Math.random()-.5)*40,vy:-30-Math.random()*40,col:Math.random()<.5?'#efe4c8':'#c9a8ff',t:now,g:-20})}
 function bossIn(now,dt,t){bossBg(now);const q=Math.max(0,Math.min(1,(t-.6)/.6));
  if(t>.6&&!D.broke){D.broke=1;const r=R0(23);for(let i=0;i<26;i++)D.chunks.push({x:BW.x0+r()*(BW.x1-BW.x0),y:AY+30+r()*24,vx:(r()-.5)*120,vy:-60+r()*40,rr:0,vr:(r()-.5)*8,w:4+r()*9,h:3+r()*6});try{perc&&perc('crash',audio.currentTime)}catch(e){}snd(70,.8,'sawtooth',.1,35);D.shake=now}
  const sh=t<1.6&&t>.4?(Math.random()-.5)*5:0;ctx.save();ctx.translate(sh,sh*.6);wallBreak(now,q);
  for(const c of D.chunks){c.vy+=300*dt;c.x+=c.vx*dt;c.y+=c.vy*dt;c.rr+=c.vr*dt;const fy=AY+80+((c.x*7)%60);if(c.y>fy){c.y=fy;c.vy*=-.2;c.vx*=.5;c.vr*=.4}ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rr);ctx.fillStyle='#3a3450';ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h);ctx.restore()}
  /* 보스가 걸어 나옴 */if(!D.boss){const m=DM[diff]||1;D.boss={x:MX,y:AY+40,hp:Math.round(7000*m),mx:Math.round(7000*m),st:'intro',t:now,cd:1500,hitT:0,ph2:false,sk:0,face:{x:1,y:0}}}
  const b=D.boss,wq=Math.max(0,Math.min(1,(t-1.2)/1.6));b.y=AY+40+(BY0+44-(AY+40))*wq;if(t>1.2)drawBoss(now);
  drawMe(now);ctx.restore();fxDraw(now);
  if(t>3.1&&t<5.2)bubble(b.x,b.y-82,'…넌 누구냐.',Math.min(1,(t-3.1)*3));
  if(t>5.2&&t<7.4)bubble(b.x,b.y-82,'그 문서를… 어디서 얻었지?',Math.min(1,(t-5.2)*3));
  if(t>7.4&&t<9.4)bubble(b.x,b.y-82,'기록을 건드린 자는 모두 잊혀진다!',Math.min(1,(t-7.4)*3));
  if(t>9.4){b.st='idle';b.t=now;go('boss');pop('📜','BOSS · 봉인 기록관 아르카','')}}
 function bossAI(now,dt){const b=D.boss,dx=P.x-b.x,dy=P.y-b.y,d=Math.hypot(dx,dy)||1,m=DM[diff]||1,me=D.me;b.cd-=dt*1000;if(b.hp<=0)return;if(!b.ph2&&b.hp<b.mx*.5){b.ph2=true;dpop(b.x,b.y-90,'아르카가 분노했다!','#ff5a7a');D.shake=now;spark(b.x,b.y-40,'#ff5a7a',24)}
  const sp=b.ph2?40:30;
  if(b.st==='idle'){if(b.cd<=0){const r=Math.random(),opts=['slam','pages','beam','sweep'].concat(b.ph2?['summon','pages2']:[]),pick=d<54?(r<.5?'sweep':'slam'):opts[Math.floor(Math.random()*opts.length)];b.sk=pick;b.st='wind';b.t=now;
     if(pick==='slam'){b.tx=P.x;b.ty=P.y;D.tele.push({k:'c',x:b.tx,y:b.ty,r:40,t:now,dur:900})}
     else if(pick==='beam'){b.aa=Math.atan2(dy+20,dx);D.tele.push({k:'l',x:b.x,y:b.y-30,a:b.aa,len:320,w:16,t:now,dur:750})}
     else if(pick==='sweep'){b.aa=Math.atan2(dy,dx);D.tele.push({k:'cone',x:b.x,y:b.y-6,a:b.aa,r:70,sp:1,t:now,dur:650})}
     return}
   if(d>50){const l=d;b.x+=dx/l*sp*dt;b.y+=dy/l*sp*dt;clampB(b);b.y=Math.max(BY0+30,b.y)}return}
  if(b.st==='wind'){const wd={slam:900,pages:600,pages2:500,beam:750,sweep:650,summon:900}[b.sk]*(b.ph2?.85:1);if(now-b.t<wd)return;b.st='act';b.t=now;
   if(b.sk==='slam'){b.x=b.tx;b.y=Math.max(BY0+30,b.ty);clampB(b);if(Math.hypot(P.x-b.tx,(P.y-b.ty)/.6)<40)hurtMe(Math.round(22*m),{x:b.tx,y:b.ty});D.shake=now;spark(b.tx,b.ty,'#c8c0d8',24);snd(70,.4,'sawtooth',.09,35)}
   else if(b.sk==='pages'||b.sk==='pages2'){const n=b.sk==='pages2'?18:12,off=Math.random()*TAU;for(let i=0;i<n;i++){const a=off+i*TAU/n;D.shots.push({x:b.x,y:b.y-40,vx:Math.cos(a)*85,vy:Math.sin(a)*85,r:4,dmg:Math.round(12*m),t:now,col:'#efe4c8'})}if(b.sk==='pages2')setTimeout(()=>{if(!D||!D.boss||D.boss.hp<=0)return;for(let i=0;i<12;i++){const a=off+.13+i*TAU/12;D.shots.push({x:D.boss.x,y:D.boss.y-40,vx:Math.cos(a)*70,vy:Math.sin(a)*70,r:4,dmg:Math.round(12*m),t:performance.now(),col:'#c9a8ff'})}},400);snd(600,.1,'sine',.05,300)}
   else if(b.sk==='beam'){const ex=b.x+Math.cos(b.aa)*320,ey=b.y-30+Math.sin(b.aa)*320,px=P.x,py=P.y-10,lx=ex-b.x,ly=ey-(b.y-30),L2=lx*lx+ly*ly,q=Math.max(0,Math.min(1,((px-b.x)*lx+(py-(b.y-30))*ly)/L2)),cx=b.x+lx*q,cy=b.y-30+ly*q;
    if(Math.hypot(px-cx,py-cy)<10)hurtMe(Math.round(18*m),b);b.beam={x:b.x,y:b.y-30,ex,ey,t:now};snd(300,.3,'sawtooth',.07,120)}
   else if(b.sk==='sweep'){const a=Math.atan2(P.y-(b.y-6),P.x-b.x),dd=Math.hypot(P.x-b.x,P.y-b.y+6);if(dd<72&&ang(a,b.aa)<1.05){if(now-me.parryT<200){try{window.SK130&&SK130.gain(8)}catch(e){}b.st='stun';b.t=now;dpop(b.x,b.y-90,'PARRY! 기절','#ffe79a');spark(P.x,P.y-14,'#ffe79a',18);snd(1600,.12,'square',.06,1200);return}hurtMe(Math.round(20*m),b)}for(let i=0;i<10;i++){const a2=b.aa-1+i*.22;D.fx.push({k:'sp',x:b.x+Math.cos(a2)*50,y:b.y-6+Math.sin(a2)*50,vx:Math.cos(a2)*40,vy:Math.sin(a2)*40,col:'#c9a8ff',t:now,g:0})}snd(400,.12,'sawtooth',.06,150)}
   else if(b.sk==='summon'){for(let i=0;i<3;i++){D.f=19;spawnMob();D.f=20;const mm=D.mobs[D.mobs.length-1];mm.x=b.x+(i-1)*40;mm.y=Math.min(BY1,b.y+30);clampB(mm)}dpop(b.x,b.y-90,'기록이여, 깨어나라!','#c9a8ff')}
   return}
  if(b.st==='act'){if(now-b.t>420){b.st='idle';b.cd=(b.ph2?900:1400)+Math.random()*600}return}
  if(b.st==='stun'){if(now-b.t>1400){b.st='idle';b.cd=600}return}}
 function boss(now,dt,t){const b=D.boss;if(P.hp>0)moveMe(now,dt,okRect);if(b.st!=='dead')bossAI(now,dt);for(const m of D.mobs)if(m.hp>0)mobAI(m,now,dt);D.mobs=D.mobs.filter(m=>m.hp>0||now-m.hitT<60);
  if(b.hp<=0&&b.st!=='dead'){b.st='dead';b.t=now;D.mobs.forEach(m=>m.hp=0);D.shots=[];D.tele=[];snd(120,1,'triangle',.09,40);D.shake=now}
  if(b.st==='dead'&&now-b.t>2200&&!D.portal){D.portal=now;snd(660,.6,'sine',.07,1320)}
  const sh=D.shake&&now-D.shake<200?(Math.random()-.5)*4:0;ctx.save();ctx.translate(sh,0);bossBg(now);wallBreak(now,1);teleDraw(now);
  if(b.beam&&now-b.beam.t<260){const q=(now-b.beam.t)/260;ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(201,168,255,'+(1-q)+')';ctx.lineWidth=14*(1-q*.5);ctx.beginPath();ctx.moveTo(b.beam.x,b.beam.y);ctx.lineTo(b.beam.ex,b.beam.ey);ctx.stroke();ctx.strokeStyle='rgba(255,255,255,'+(1-q)+')';ctx.lineWidth=4;ctx.stroke();ctx.restore()}
  if(D.portal)portalDraw(now);
  const L=D.mobs.map(m=>({y:m.y,fn:()=>drawMob(m,now)}));L.push({y:b.y,fn:()=>drawBoss(now)});L.push({y:P.y,fn:()=>drawMe(now)});L.sort((a,c)=>a.y-c.y).forEach(o=>{try{o.fn()}catch(e){}});
  shotsTick(now,dt);fxDraw(now);ctx.restore();hud(now);if(b.st!=='dead')bossBar(now);
  if(D.portal&&now-D.portal>600){txt('포탈이 열렸다! 직접 걸어 들어가세요',W/2,AY+AH-4,9,'#e6d4ff',.6+.4*Math.sin(now/250));if(Math.hypot(P.x-ALT.x,P.y-ALT.y)<16)exitPortal()}
  if(P.hp<=0)die(now)}
 function portalDraw(now){const q=Math.min(1,(now-D.portal)/800),x=ALT.x,y=ALT.y-6;ctx.save();ctx.translate(x,y);ctx.scale(1,.55);for(let i=0;i<4;i++){ctx.rotate(now/600+i);ctx.strokeStyle=['#c9a8ff','#ffd84a','#8ad8ff','#ffffff'][i];ctx.globalAlpha=.7*q;ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,(18+i*5)*q,0,4.4);ctx.stroke()}ctx.restore();
  ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(x,y,2,x,y,46*q);g.addColorStop(0,'rgba(220,200,255,.8)');g.addColorStop(1,'rgba(120,80,220,0)');ctx.fillStyle=g;ctx.fillRect(x-50,y-50,100,100);ctx.restore();
  if(Math.random()<.5)D.fx.push({k:'sp',x:x+(Math.random()-.5)*40,y:y+(Math.random()-.5)*20,vx:0,vy:-30,col:'#e6d4ff',t:now,g:0})}
 /* 아르카 전용 체력바: 낡은 두루마리 · 여러 줄 */
 function bossBar(now){const b=D.boss,LY=700,nL=Math.max(1,Math.ceil(b.hp/LY)),inL=b.hp<=0?0:(b.hp-(nL-1)*LY)/LY,LC=['#c9a8ff','#8a6ad8','#5ad0ff','#5affb0','#ffd84a','#ff9a3a','#ff5a7a','#ff4dd2','#e6d4ff','#b48aff'],cc=LC[(nL-1)%LC.length],nc=nL>1?LC[(nL-2)%LC.length]:null,x=60,y=10,w=300,h=10,t=now/1000;
  b.show=b.show==null?inL:(b.show>inL&&b.lastL===nL?Math.max(inL,b.show-.4/60):inL);b.lastL=nL;
  ctx.save();ctx.fillStyle='#000a';ctx.fillRect(x-8,y-4,w+16,h+8);ctx.fillStyle='#efe4c8';ctx.fillRect(x-6,y-3,w+12,h+6);ctx.fillStyle='#c8b890';ctx.fillRect(x-6,y-3,w+12,1);ctx.fillRect(x-6,y+h+2,w+12,1);
  for(const s of [-1,1]){const cx=s<0?x-8:x+w+8;ctx.fillStyle='#8a6a3a';ctx.fillRect(cx-3,y-6,6,h+12);ctx.fillStyle='#c9a24a';ctx.fillRect(cx-3,y-7,6,2);ctx.fillRect(cx-3,y+h+5,6,2)}
  ctx.fillStyle='#1a1028';ctx.fillRect(x,y,w,h);if(nc){ctx.fillStyle=nc;ctx.globalAlpha=.5;ctx.fillRect(x,y,w,h);ctx.globalAlpha=1}ctx.fillStyle='#fff0d0';ctx.fillRect(x,y,w*b.show,h);ctx.fillStyle=cc;ctx.fillRect(x,y,w*inL,h);ctx.fillStyle='#ffffff50';ctx.fillRect(x,y,w*inL,2);
  for(let i=8;i<w*inL;i+=16){ctx.fillStyle='#00000030';ctx.fillRect(x+i,y+3,8,1);ctx.fillRect(x+i,y+6,6,1)}
  const q=((now/1500)%1.6)-.3;if(q>0&&q<1){ctx.globalAlpha=.3;ctx.fillStyle='#fff';ctx.fillRect(x+w*inL*q,y,4,h);ctx.globalAlpha=1}
  /* 밀랍 봉인(얼굴) */const cx=x-22,cy=y+5;ctx.fillStyle='#000a';ctx.beginPath();ctx.arc(cx+1,cy+1,13,0,TAU);ctx.fill();ctx.fillStyle=b.ph2?'#a02a3a':'#6a2a8a';ctx.beginPath();ctx.arc(cx,cy,13,0,TAU);ctx.fill();for(let i=0;i<10;i++){const a=i*TAU/10;ctx.beginPath();ctx.arc(cx+Math.cos(a)*12,cy+Math.sin(a)*12,2.4,0,TAU);ctx.fill()}
  ctx.fillStyle='#05030a';ctx.beginPath();ctx.arc(cx,cy-1,5,0,TAU);ctx.fill();ctx.fillStyle=b.ph2?'#ff5a7a':'#c9a8ff';ctx.beginPath();ctx.arc(cx,cy-1,3,0,TAU);ctx.fill();ctx.fillRect(cx-1,cy+1,2,4);
  if(nL>1){ctx.fillStyle='#000c';ctx.fillRect(x+w+14,y-4,26,16);ltxt('×'+nL,x+w+27,y+8,'900 11px sans-serif',cc,1,'center')}
  const nm='📜 봉인 기록관 · 아르카',pl=b.ph2?'◆ 분노':'◆ PHASE 1';ctx.font='bold 10px sans-serif';const nw=ctx.measureText(nm).width;ctx.fillStyle='#04070acc';ctx.fillRect(x-2,y+h+5,nw+70,13);ltxt(nm,x+2,y+h+15,'bold 10px sans-serif','#efe4c8');ltxt(pl,x+nw+10,y+h+15,'bold 8px sans-serif',b.ph2?'#ff8a9a':'#c9a8ff');
  ltxt(Math.max(0,Math.ceil(b.hp)).toLocaleString('en-US')+' / '+b.mx.toLocaleString('en-US'),x+w,y+h+15,'bold 10px monospace','#fff6c8',1,'right');ctx.restore()}
 function f20(now,dt,t){if(P.hp>0)moveMe(now,dt,(x,y)=>okRect(x,y)&&!(Math.abs(x-ALT.x)<14&&Math.abs(y-ALT.y)<6));bossBg(now);drawMe(now);fxDraw(now);hud(now);
  ctx.save();ctx.fillStyle='#04070acc';ctx.fillRect(AX+4,6,190,24);ctx.fillStyle='#c9a8ff';ctx.fillRect(AX+4,6,3,24);ltxt('봉인 보관소 20층',AX+12,17,'900 11px sans-serif','#c9a8ff');ltxt('가장 깊은 곳 · 제단',AX+12,27,'bold 8px sans-serif','#e8eef6');ctx.restore();
  if(!D.alt&&Math.hypot(P.x-ALT.x,P.y-ALT.y)<34)txt('📜 제단에 문서를 올리기 (공격 키 · 단추)',ALT.x,ALT.y+26,9,'#ffe9a8',.7+.3*Math.sin(now/250));
  else if(!D.alt)txt('가운데 제단으로 가 보세요',W/2,AY+AH-4,9,'#e6d4ff',.7);
  if(D.fade&&now-D.fade<700){const q=(now-D.fade)/700;ctx.fillStyle='rgba(0,0,0,'+(1-q)+')';ctx.fillRect(0,0,W,H);txt('20층',W/2,H/2,26,'#c9a8ff',1-q*q)}}
 function exitPortal(){if(D.exit)return;D.exit=performance.now();snd(880,.8,'sine',.08,1760)}
 function ending(now){const q=(now-D.exit)/900;ctx.fillStyle='rgba(255,255,255,'+Math.min(1,q)+')';ctx.fillRect(0,0,W,H);
  if(q>1.2&&!D.done){D.done=1;const s=SV(),d=DV(),first=!s.clear;d.clears=(d.clears||0)+1;if(first){s.clear=Date.now();try{if(window.DIA80)DIA80.add(100)}catch(e){}try{addCoins(20000)}catch(e){}}else{try{addCoins(3000)}catch(e){}}save();found('dungeon');
   showOverlay('봉인 보관소 · CLEAR','기록관 아르카를 쓰러뜨렸어요!',first?'<b style="color:#ff4d6d">✪ 비밀 캐릭터 「클라비스」</b>를 얻었어요!<br>상점(캐릭터)에 나타났어요 · 쓰려면 🪙 30,000으로 사야 해요.<br><small>첫 정복 보상 💎 100 · 🪙 20,000</small>':'다시 정복했어요! 🪙 3,000',
    [['🛒 상점에서 보기',()=>{$('overlay').hidden=true;D=null;mode='boss';toLobby();setTimeout(()=>{try{openShop('ch');WS.sel.ch=SEC127.IDX;renderShop();const cv=document.querySelector('#shopGrid canvas[data-i="'+SEC127.IDX+'"]');cv&&cv.scrollIntoView({block:'center'})}catch(e){}},300)},true],['⛲ 광장으로',()=>{$('overlay').hidden=true;toPlaza()},false],['로비로',()=>{$('overlay').hidden=true;D=null;mode='boss';toLobby()},false]])}}

 /* ================= 메인 루프 ================= */
 {const _f=frame;frame=function(){if(mode!=='dg129'||!D)return _f.apply(this,arguments);const now=performance.now(),dt=Math.min((now-lastT)/1000,.05)||0;lastT=now;try{last=now}catch(e){}
  document.documentElement.classList.add('sec127on');try{ctx.setTransform(SS,0,0,SS,0,0);ctx.imageSmoothingEnabled=false;const t=(now-D.t0)/1000;
   if(D.exit)ending(now);else if(D.ph==='arch'||D.ph==='doc')arch(now,D.ph==='doc'?0:dt,t);else if(D.ph==='floor')floor(now,dt,t);else if(D.ph==='f20')f20(now,dt,t);else if(D.ph==='bossIn')bossIn(now,dt,t);else if(D.ph==='boss')boss(now,dt,t)}catch(e){console.error('dg129',e)}
  try{if(window.PV76&&PV76.paint)PV76.paint()}catch(e){}requestAnimationFrame(frame)}}
 {const f=toLobby;toLobby=function(){if(mode==='dg129'){D=null;mode='boss';try{doc.hidden=true}catch(e){}}return f.apply(this,arguments)}}
 /* 폰: 누른 곳으로 걷기 · 상호작용 단추 */
 document.addEventListener('pointerdown',e=>{try{if(mode!=='dg129'||!D||D.ph==='doc'||e.target.closest('button'))return;const cv=$('game'),r=cv.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)return;D.tgt={x:(e.clientX-r.left)/r.width*W,y:(e.clientY-r.top)/r.height*H}}catch(_){}},true);
 const ab=document.createElement('button');ab.id='act129';ab.hidden=true;document.body.appendChild(ab);ab.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();myAtk()});
 setInterval(()=>{try{let lb='';if(mode==='dg129'&&D){if(D.ph==='arch'&&nearDrawer()&&!D.drOpen&&SV().key)lb='🗝 서랍 열기';else if(D.ph==='f20'&&!D.alt&&Math.hypot(P.x-ALT.x,P.y-ALT.y)<34)lb='📜 문서 올리기'}const on=!!lb&&(matchMedia('(pointer:coarse)').matches||document.documentElement.classList.contains('ph'));if(ab.hidden===on)ab.hidden=!on;if(lb&&ab.textContent!==lb)ab.textContent=lb}catch(e){}},200);

 const st=document.createElement('style');st.textContent=`
 #gate129,#act129{position:fixed;left:50%;bottom:calc(150px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:9400;padding:12px 22px;border:0;border-radius:999px;font:900 16px/1 sans-serif;color:#fff;background:linear-gradient(180deg,#9a7ae8,#5a3aa8);box-shadow:0 0 0 2px #fff9,0 0 24px #b48affaa}
 #gate129[hidden],#act129[hidden]{display:none}
 #doc129{position:fixed;inset:0;z-index:9500;display:flex;align-items:center;justify-content:center;background:#000b}
 #doc129[hidden]{display:none}
 #doc129 .pp{position:relative;width:min(480px,90vw);max-height:84vh;overflow:auto;padding:26px 28px 20px;border-radius:6px;background:linear-gradient(180deg,#f3e8cc,#e6d6b0);color:#3a2a14;font:15px/1.65 serif;box-shadow:inset 0 0 40px #b8986088,0 20px 60px #000c;border:1px solid #a08050;animation:doc129in .5s cubic-bezier(.2,1.3,.4,1)}
 @keyframes doc129in{from{transform:scale(.6) rotate(-6deg);opacity:0}to{transform:none;opacity:1}}
 #doc129 h3{margin:0 0 10px;font:900 19px/1.3 serif;color:#5a2a14;text-align:center;letter-spacing:.06em}
 #doc129 p{margin:8px 0}#doc129 b{color:#7a2a14}#doc129 .sg{text-align:right;font-style:italic;color:#6a4a2a}
 #doc129 .seal{position:absolute;right:16px;top:12px;width:40px;height:40px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#c84a5a,#7a1a2a);color:#ffd8a0;font:900 20px/40px serif;text-align:center;box-shadow:0 2px 6px #0006}
 #doc129 .info{margin-top:10px;padding:6px 10px;border-radius:4px;background:#00000014;font:13px sans-serif;color:#5a4020}
 #doc129 .bt{display:flex;gap:10px;justify-content:center;margin-top:14px}
 #doc129 .bt button{font:900 15px sans-serif;padding:10px 26px;border-radius:8px;border:0;cursor:pointer}
 #doc129 .ok{background:linear-gradient(180deg,#7a4ae8,#4a2aa8);color:#fff}#doc129 .no{background:#00000022;color:#3a2a14}`;document.head.appendChild(st);
 window.DG129={enterArchive,startDungeon,startFloor,toPlaza,get D(){return D},openDoc,insertCore};
}catch(e){console.error('v129 dungeon',e)}})();
