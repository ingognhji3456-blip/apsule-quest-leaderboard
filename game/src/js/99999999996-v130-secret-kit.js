/* ================= v130 · v134 비밀의 방 · 봉인 보관소: 탑과 같은 전투 규칙 (SK130) =================
   ★ 원칙: 탑 오르기에 있는 전투 기능은 클라비스 결투(mode 'sec127') · 봉인 보관소(mode 'dg129')에도 똑같이 있어야 한다.
     새 전투 장면을 만들 때도 이 파일의 「아레나」(enemies · fight · me)에 그 장면을 더하면 아래가 모두 따라온다.
   - 대시 칸(P.stam · stamTick) · 패링(즉시: 가까운 탄을 되받아치고 · 가까운 괴물 기절) · 궁극기(보스전 궁극기 그림 그대로)
   - 박자: 박자에 맞춘 공격 PERFECT ×1.5 · GOOD ×1.2(TW71.beatGood) · 박자 대시는 무적이 길게
   - 콤보: 맞힐 때마다 +1, 피해 +2%/콤보(최대 20) · 맞으면 0 · 화면 오른쪽 아래 표시
   - CB81(9999996) 그대로: 치명 추가 · 확정 치명 · 피해 배율(장비 · 현질 스킨 능력 · 세트) · 상태 이상(화상 · 냉기 · 독) · 처치 · 대시 · 패링 · 피격 효과 · 그림
   - MYTH100(999999992) 그대로: 신화 · 프리미엄 · 전용 스킨 · 클라비스 캐릭터의 스킬(회피 · 연쇄 · 분신 · 궤도 · 반격 · 섬광 대시 …)
   - 처치하면 경험치(LV83, CB81.onKill에 붙어 있음) · 🪙 · 궁극기 게이지 / 펫이 따라다님(TPET106)
   방법: 두 엔진은 「탑」만 알아보므로, 부를 때만 잠깐 mode='tower' + TW71.T(가짜 탑 정보) + TW71.hitMob/addPop을 이 장면 것으로 바꿔 끼운다(asTower).
   배경음악: 장면마다 곡을 골라 sched()로 연주 */
(()=>{try{
 const $=id=>document.getElementById(id),now0=()=>performance.now();
 const ON=()=>md()==='sec127'||md()==='dg129';
 /* asTower 중에는 mode가 잠깐 'tower'라서, 진짜 장면 이름은 RM에 둔다 */
 let RM=null;const md=()=>RM||mode;
 const fight=()=>{try{if(md()==='sec127'){const S=SEC127.SQ,F=SEC127.F;return !!(S&&S.ph==='duel'&&F&&F.st!=='intro'&&F.st!=='dead'&&!S.done)}
  if(md()==='dg129'){const D=DG129.D;return !!(D&&(D.ph==='floor'||D.ph==='boss')&&!D.exit&&!D.dead)}}catch(e){}return false};
 const me=()=>{try{return md()==='sec127'?SEC127.SQ&&SEC127.SQ.me:DG129.D&&DG129.D.me}catch(e){return null}};
 const U={g:0,act:null,combo:0,comboT:0,best:0};
 function gain(n){if(!ON()||U.act)return;U.g=Math.min(100,U.g+n)}

 /* ---------- 아레나: 지금 장면의 적 목록 · 피해 주기 ---------- */
 let SEQ=0;
 function norm(e,boss){e.max=e.mx||e.max||1;e.elite=!!(e.el||boss);e.born=e.st==='spawn'?1:0;if(!e.id)e.id='a'+(++SEQ);e.isBoss=!!boss;return e}
 function enemies(){const L=[];try{if(md()==='sec127'){const F=SEC127.F;if(F&&F.hp>0&&F.st!=='intro')L.push(norm(F,1))}
  else if(md()==='dg129'){const D=DG129.D;if(D&&D.mobs)for(const m of D.mobs)if(m.hp>0)L.push(norm(m,0));if(D&&D.boss&&D.boss.hp>0&&D.ph==='boss')L.push(norm(D.boss,1))}}catch(e){}return L}
 function pop(x,y,tx,col){try{if(md()==='dg129'&&DG129.D&&DG129.D.pops)DG129.D.pops.push({x,y,s:String(tx),c:col||'#ffffff',t:now0()});else if(md()==='sec127'&&SEC127.kit&&SEC127.kit.dpop)SEC127.kit.dpop(x,y,String(tx),col||'#ffffff')}catch(e){}}
 /* 모든 「추가 피해」(화상 · 연쇄 · 궤도 · 운석 · 되받아친 탄 …)는 여기로 */
 function hitMob(m,d,col,tx){if(!m||m.hp<=0)return;d=Math.max(1,Math.round(d));m.hp=Math.max(0,m.hp-d);m.hitT=now0();m.hitF=now0();pop(m.x+(Math.random()-.5)*8,m.y-(m.isBoss?(md()==='dg129'?60:34):24),(tx||'')+d,col);
  if(m.hp<=0)died(m)}
 function died(m){const now=now0();if(md()==='sec127'&&m.isBoss){m.st='dead';m.t=now;return}if(md()==='dg129'&&!m.isBoss){try{DG129.killFx(m,now)}catch(e){}kill(m)}}
 const FT={get mobs(){return enemies()},get clk(){return now0()/1000},get ult(){return U.g},set ult(v){if(!U.act)U.g=Math.max(0,Math.min(100,v))},get dead(){return !(P.hp>0)},bossCard:null,clear:false,trans:null,
  get f(){try{return md()==='dg129'?(DG129.D.f||1):10}catch(e){return 1}},slash:[],pal:{a:'#b48aff',c:'#ffd84a',n:'비밀'},duo:null,get combo(){return U.combo}};
 function asTower(fn){const om=mode,r0=RM,T0=TW71.T,h0=TW71.hitMob,a0=TW71.addPop;try{RM=md();mode='tower';TW71.T=FT;TW71.hitMob=hitMob;TW71.addPop=pop;return fn()}catch(e){}finally{mode=om;RM=r0;TW71.T=T0;TW71.hitMob=h0;TW71.addPop=a0}}
 const CB=()=>window.CB81,MY=()=>window.MYTH100;

 /* ---------- 공격 · 처치 · 피격 · 대시 · 패링 (각 장면이 부름) ---------- */
 function atk(){/* 휘두를 때 한 번: 박자 · 치명 · 피해 배율 */let bg=0;try{bg=TW71.beatGood()}catch(e){}const mult=bg===2?1.5:bg===1?1.2:1;FT.slash.push(now0());if(FT.slash.length>20)FT.slash.shift();
  return {bg,mult,crit:()=>asTower(()=>{const c=CB(),w=curWp()||{};return Math.random()<(w.crit||0)+(c?c.critAdd():0)||!!(c&&c.forceCrit())}),
   dmgMul:asTower(()=>CB()?CB().dmgMul(U.combo):1)||1,comboMul:1+Math.min(U.combo,20)*.02}}
 function onHit(m,dmg,crit,bg){norm(m,m.isBoss);asTower(()=>{const c=CB();if(!c)return;c.onHit(m,dmg,crit,bg)})}
 function swing(hits,bg){if(!hits)return;U.combo+=1;U.comboT=now0();U.best=Math.max(U.best,U.combo);gain(3+hits*2);if(bg===2)pop(P.x,P.y-44,'PERFECT','#ffe79a')}
 function kill(m){if(m._k134)return;m._k134=1;asTower(()=>{try{CB()&&CB().onKill(m)}catch(e){}});const g=m.elite?8:2;try{addCoins(g)}catch(e){}pop(m.x,m.y-34,'+'+g+' 🪙','#ffd166');gain(m.elite?25:10)}
 function hurt(dmg){/* 맞기 전: 장비 · 스킨 · 신화 스킬(회피 · 오로라 …)이 피해를 줄이거나 없앰 */let d=dmg;asTower(()=>{const c=CB();if(c)d=c.onHurt(d)});d=Math.round(d||0);if(d>0)U.combo=0;return d}
 function dash(){let bg=0;try{bg=TW71.beatGood()}catch(e){}asTower(()=>{try{CB()&&CB().onDash()}catch(e){}});return bg>0}
 function parry(){/* 탑과 같은 즉시 패링: 가까운 탄을 되받아치고 · 가까운 괴물 기절 */let n=0;const clk=now0()/1000;
  try{if(md()==='dg129'){const D=DG129.D;for(const s of (D.shots||[]).slice()){if(s.mine)continue;if(Math.hypot(s.x-P.x,s.y-(P.y-8))<34){s.mine=true;const tg=enemies().sort((a,b)=>Math.hypot(a.x-s.x,a.y-s.y)-Math.hypot(b.x-s.x,b.y-s.y))[0];const a=tg?Math.atan2(tg.y-10-s.y,tg.x-s.x):Math.atan2(-s.vy,-s.vx),v=Math.hypot(s.vx,s.vy)*1.6+60;s.vx=Math.cos(a)*v;s.vy=Math.sin(a)*v;s.col='#ffe79a';n++;
     if(asTower(()=>CB()&&CB().doubleParry()))D.shots.push(Object.assign({},s,{vx:Math.cos(a+.3)*v,vy:Math.sin(a+.3)*v,col:'#ffd166'}))}}
    for(const m of D.mobs||[]){if(m.hp<=0||m.st==='spawn')continue;if(Math.hypot(m.x-P.x,m.y-P.y)<36){m.stunT=clk;m.st='stun';m.t=now0();const a=Math.atan2(m.y-P.y,m.x-P.x);m.kx+=Math.cos(a)*160;m.ky+=Math.sin(a)*160;n++}}}}catch(e){}
  asTower(()=>{try{CB()&&CB().onParry(n)}catch(e){}});if(n){const m0=me();if(m0)m0.inv=Math.max(m0.inv||0,now0()+300);pop(P.x,P.y-28,'PARRY!','#ffe79a');gain(8);try{sfx(1200,.12,'square',.04,1800)}catch(e){}}return n}
 /* 되받아친 탄이 적에게 맞으면 */
 function mineShot(s){for(const m of enemies()){if(Math.hypot(m.x-s.x,m.y-(m.isBoss?30:10)-s.y)<(m.isBoss?24:12)){hitMob(m,20+(s.dmg||8)*2,'#ffe79a','↩');return true}}return false}
 function petList(L,now){try{if(window.TPET106)asTower(()=>TPET106.list(L,now))}catch(e){}}
 /* 괴물 상태: 기절 · 냉기(느려짐) */
 const stunned=m=>{const c=now0()/1000;return m.stunT!=null&&c<m.stunT+1.1},chilled=m=>m.chillT!=null&&now0()/1000<m.chillT;

 /* ---------- 대시 칸 ---------- */
 {const f=doDash;doDash=function(){if(!ON()||!fight())return f.apply(this,arguments);
   const now=now0(),cost=((typeof curPet==='function'&&curPet())||{}).dashCost||.2;if(P.stam===undefined)P.stam=stamMax();if(now<(P.dashCd||0))return;
   if(P.stamLock||P.stam<cost-.001){P.stamShake=now;try{sfx(140,.08,'square',.03,90)}catch(e){}return}
   const d0=P.dashCd;const r=f.apply(this,arguments);if(P.dashCd!==d0){P.stam=Math.max(0,P.stam-cost);if(P.stam<.01){P.stam=0;P.stamLock=true}if(dash()){const m=me();if(m)m.inv=Math.max(m.inv||0,now+520);pop(P.x,P.y-30,'DASH!','#8dcdf5')}}return r}}
 /* ---------- 궁극기 ---------- */
 const PLAN={sword:[200,520],dagger:[0,90,180,270,360,450,540,630],great:[560],katana:[900],axe:[380,560,740],rapier:[200,300,400,500,600],flame:[250,400,550,700,850],spear:[300,500,700,900],scythe:[520],chrono:[1100]};
 function fire(){if(!fight()||U.act||U.g<100)return;const now=now0(),T=enemies();let cx=W/2,cy=AY+AH/2;if(T.length){cx=T.reduce((s,q)=>s+q.x,0)/T.length;cy=T.reduce((s,q)=>s+q.y,0)/T.length-10}
  U.g=0;let S=null;try{S=window.SET61&&SET61.ultSet&&SET61.ultSet()}catch(e){}const w=curWp()||{},UU=S&&SET61.ULT[S];let sp,hits,name,col;
  if(UU){hits=UU.hits();const dur=Math.max(...hits)+UU.tail;name=UU.name;col=UU.c;sp={type:'p61',set:S,t0:now,dur,name,col,cx,cy,done:[],hits};try{UU.start()}catch(e){}}
  else{const type=w.ult||w.type||'sword';hits=PLAN[type]||[400];const dur=Math.max(...hits)+700;name=w.sp||'필살';col=w.trail||'#ffffff';sp={type,t0:now,dur,name,col,cx,cy,done:[]};try{sfx(220,.4,'sawtooth',.07,1760);sfx(110,.5,'square',.05,55)}catch(e){}}
  U.act={sp,hits,t0:now,k:0,end:now+sp.dur,UU,col,hitF:w.hitF||400,type:sp.type};const m=me();if(m)m.inv=now+sp.dur+400;try{const D=md()==='dg129'&&DG129.D;if(D){D.shots=[];D.tele=[]}}catch(e){}
  P.lungeT=now;P.lungeA=Math.atan2(cy-P.y,cx-P.x);P.lungeDur=260;try{banner('필살! '+name)}catch(e){}}
 function tickUlt(now){const A=U.act;if(!A)return;
  while(A.k<A.hits.length&&now-A.t0>=A.hits[A.k]){const k=A.k++,last=k===A.hits.length-1,n=A.hits.length,w=curWp()||{},wd=w.dmg||1,share=A.type==='p61'?(last?.3:.7/(n-1||1)):1/n;let pet=0;try{pet=(PETS[shopInv().eq.pt]||{}).dmg||0}catch(e){}
   for(const o of enemies()){let d;if(o.isBoss)d=Math.round(34*wd*(1+pet)*30*share);else d=Math.round((o.max||100)*(o.elite?.6:1.25)*share*Math.min(1.6,wd));hitMob(o,Math.max(1,d),k%2?'#ffffff':A.col,'')}
   A.sp.done.push(now);if(A.UU){try{A.UU.hit(k,last)}catch(e){}}else{try{sfx((A.hitF||400)*(1+k*.05),.18,'square',.06,(A.hitF||400)*.4);sfx(90,.2,'sawtooth',.05,40)}catch(e){}}}
  if(now>=A.end)U.act=null}
 function drawUlt(now){const A=U.act;if(!A)return;const og=(typeof G!=='undefined')?G:null;
  try{G=Object.assign(Object.create(og||{}),{sp:A.sp,ms:mus.ms||500,state:'play',B:BOSSES[0],boss:{x:A.sp.cx,y:A.sp.cy+26,slump:0},vuln:null,pops:[],parts:[]});drawSpecialFX(now)}catch(e){}finally{G=og}}
 function gauge(now){const og=(typeof G!=='undefined')?G:null;try{G=Object.assign(Object.create(og||{}),{ult:U.g,state:'play',sp:U.act?U.act.sp:null,spUsed:false});drawUltGauge(now)}catch(e){}finally{G=og}
  try{if(isTouchUI()){ensureUltBtn();const b=$('btnU');if(b.style.display!=='')b.style.display='';ultBtnPaint(U.g/100,!U.act)}}catch(e){}}
 function shield(now){/* 발밑 작은 방패: 패링 준비 / 재사용 대기 */const ready=now>=(P.parryCd||0),sx=P.x+10,sy=P.y+2;ctx.fillStyle='#05090b';ctx.fillRect(sx,sy,5,5);ctx.fillStyle=ready?'#9edbff':'#3a4a50';ctx.fillRect(sx+1,sy+1,3,3);ctx.fillRect(sx+2,sy+4,1,2)}
 function comboHud(now){if(U.combo<2)return;const k=Math.min(1,(now-U.comboT)/200),sc=1+(1-k)*.35,x=AX+AW-8,y=H-50;ctx.save();ctx.translate(x,y);ctx.scale(sc,sc);ctx.textAlign='right';ctx.font='900 18px sans-serif';ctx.fillStyle='#000a';ctx.fillText(U.combo,1,1);ctx.fillStyle=U.combo>=20?'#ffd84a':U.combo>=10?'#ffe79a':'#ffffff';ctx.fillText(U.combo,0,0);ctx.font='bold 7px sans-serif';ctx.fillStyle='#e8eef6';ctx.fillText('COMBO · +'+Math.min(U.combo,20)*2+'%',0,9);ctx.restore()}
 if(typeof tryUlt==='function'){const f=tryUlt;tryUlt=function(){if(ON()){fire();return}return f.apply(this,arguments)}}
 /* 패링 F/L · 궁극기 C 키: 원래는 보스전(mode 'boss')에서만 받아서 클라비스 결투 · 던전에서 안 눌렸음 */
 addEventListener('keydown',e=>{if(!ON()||e.repeat||paused)return;if(e.code==='KeyF'||e.code==='KeyL'){e.preventDefault();tryParry()}else if(e.code==='KeyC'){e.preventDefault();tryUlt()}});
 /* 패링: 대기 시간을 보스전처럼(약 0.5초) + 탑과 같은 즉시 효과 */
 if(typeof tryParry==='function'){const f=tryParry;tryParry=function(){if(!ON())return f.apply(this,arguments);const now=now0();if(now<(P.parryCd||0))return;const r=f.apply(this,arguments);P.parryCd=Math.max(P.parryCd||0,now+520);if(fight())parry();else try{sfx(1500,.04,'square',.018,1100)}catch(e){}return r}}

 /* ---------- 배경음악 ---------- */
 let MK=null,LT=now0();const SONG=k=>{try{if(k==='cave')return makeCaveSong(3);if(k==='arch')return makeCaveSong(7);if(k==='duel')return makeSong(7);if(k==='boss')return makeSong(19);if(k.startsWith('band'))return makeSong([12,15,6,17][+k.slice(4)]||12)}catch(e){}return null};
 function musicKey(){try{if(md()==='sec127'){const S=SEC127.SQ;if(!S)return null;return S.ph==='duel'||S.ph==='room'?'duel':'cave'}
  if(md()==='dg129'){const D=DG129.D;if(!D)return null;if(D.ph==='arch'||D.ph==='doc')return 'arch';if(D.ph==='boss'||D.ph==='bossIn')return 'boss';if(D.ph==='f20')return 'arch';return 'band'+(D.f>=16?3:D.f>=11?2:D.f>=6?1:0)}}catch(e){}return null}
 function music(now){const k=musicKey();if(k!==MK){/* 새 결투 · 던전을 시작하면 게이지 · 콤보는 0부터 */if(k==='duel'&&MK!=='duel'||k&&k.startsWith('band')&&(MK==='arch'||!MK)){U.g=0;U.act=null;U.combo=0}MK=k;if(k){try{initAudio()}catch(e){}const S=SONG(k);if(S){try{stopMusic();startMusic(S,now,0)}catch(e){}}}else{try{stopMusic()}catch(e){}}}
  if(k){try{sched(now)}catch(e){}}}

 /* ---------- 매 프레임: 장면을 그린 뒤 엔진 틱 · 덧그림 ---------- */
 {const _f=frame;frame=function(){const r=_f.apply(this,arguments);const now=now0();
   if(!ON()){LT=now;if(MK){MK=null;try{stopMusic()}catch(e){}}return r}
   const dt=Math.min(.05,(now-LT)/1000);LT=now;try{music(now);try{stamTick(dt)}catch(e){}ctx.setTransform(SS,0,0,SS,0,0);
    if(fight()||U.act){
     /* 콤보는 3초 안에 다시 맞히지 않으면 끊김 */if(U.combo&&now-U.comboT>3000)U.combo=0;
     asTower(()=>{const c=CB(),y=MY();try{if(y&&y.tick)y.tick()}catch(e){}try{if(c&&c.tick)c.tick()}catch(e){}if(c)for(const m of enemies()){try{c.mobTick(m,dt)}catch(e){}}
      try{if(c){c.drawWorld();for(const m of enemies())c.drawMobFx(m);c.drawPlayer()}}catch(e){}try{if(y&&y.draw)y.draw()}catch(e){}});
     ctx.setTransform(SS,0,0,SS,0,0);tickUlt(now);drawUlt(now);shield(now);gauge(now);comboHud(now);try{if(window.PV76&&PV76.paint)PV76.paint()}catch(e){}}
    else{try{const b=$('btnU');if(b&&b.style.display!=='none'&&md()==='dg129'&&DG129.D&&(DG129.D.ph==='arch'||DG129.D.ph==='doc'))b.style.display='none'}catch(e){}}}catch(e){console.error('sk130',e)}
   return r}}
 window.SK130={gain,fire,atk,onHit,swing,kill,hurt,dash,parry,hitMob,mineShot,petList,stunned,chilled,enemies,asTower,get U(){return U}};
}catch(e){console.error('v130 secret kit',e)}})();
