/* ================= v130 비밀의 방 · 봉인 보관소: 대시 칸 · 패링 방패 · 궁극기 · 배경음악 (SK130) =================
   v127 클라비스 결투(mode 'sec127')와 v129 던전(mode 'dg129')이 보스전과 같은 규칙을 쓰게 한다.
   - 대시: 보스전처럼 대시 칸(P.stam)을 쓰고, 다 쓰면 잠김(stamLock) → stamTick으로 다시 참
   - 패링: 발밑 작은 방패(준비/재사용 대기) · 성공하면 궁극기 게이지 +
   - 궁극기: 공격을 맞히면 게이지가 차고(SK130.gain), 꽉 차면 궁극기 키 · 폰 단추로 사용.
     그림은 보스전 궁극기(drawSpecialFX, 검 종류 · 현질 세트마다 모양)를 그대로, 피해는 화면의 적 전체에
   - 배경음악: 장면마다 곡을 골라 sched()로 연주 */
(()=>{try{
 const $=id=>document.getElementById(id);
 const ON=()=>mode==='sec127'||mode==='dg129';
 const fight=()=>{try{if(mode==='sec127'){const S=SEC127.SQ,F=SEC127.F;return !!(S&&S.ph==='duel'&&F&&F.st!=='intro'&&F.st!=='dead'&&!S.done)}
  if(mode==='dg129'){const D=DG129.D;return !!(D&&(D.ph==='floor'||D.ph==='boss')&&!D.exit&&!D.dead)}}catch(e){}return false};
 const me=()=>{try{return mode==='sec127'?SEC127.SQ&&SEC127.SQ.me:DG129.D&&DG129.D.me}catch(e){return null}};
 const U={g:0,act:null};
 function gain(n){if(!ON()||U.act)return;U.g=Math.min(100,U.g+n)}
 /* ---------- 대시 칸 ---------- */
 {const f=doDash;doDash=function(){if(!ON()||!fight())return f.apply(this,arguments);
   const now=performance.now(),cost=((typeof curPet==='function'&&curPet())||{}).dashCost||.2;if(P.stam===undefined)P.stam=stamMax();if(now<(P.dashCd||0))return;
   if(P.stamLock||P.stam<cost-.001){P.stamShake=now;try{sfx(140,.08,'square',.03,90)}catch(e){}return}
   const d0=P.dashCd;const r=f.apply(this,arguments);if(P.dashCd!==d0){P.stam=Math.max(0,P.stam-cost);if(P.stam<.01){P.stam=0;P.stamLock=true}}return r}}
 /* ---------- 궁극기 ---------- */
 const PLAN={sword:[200,520],dagger:[0,90,180,270,360,450,540,630],great:[560],katana:[900],axe:[380,560,740],rapier:[200,300,400,500,600],flame:[250,400,550,700,850],spear:[300,500,700,900],scythe:[520],chrono:[1100]};
 function targets(){try{if(mode==='sec127'){const F=SEC127.F;return F&&F.hp>0?[{o:F,boss:1}]:[]}const D=DG129.D,L=[];for(const m of D.mobs)if(m.hp>0&&m.st!=='spawn')L.push({o:m});if(D.boss&&D.boss.hp>0&&D.ph==='boss')L.push({o:D.boss,boss:1});return L}catch(e){return []}}
 function fire(){if(!fight()||U.act||U.g<100)return;const now=performance.now(),T=targets();let cx=W/2,cy=AY+AH/2;if(T.length){cx=T.reduce((s,q)=>s+q.o.x,0)/T.length;cy=T.reduce((s,q)=>s+q.o.y,0)/T.length-10}
  U.g=0;let S=null;try{S=window.SET61&&SET61.ultSet&&SET61.ultSet()}catch(e){}const w=curWp()||{},UU=S&&SET61.ULT[S];let sp,hits,name,col;
  if(UU){hits=UU.hits();const dur=Math.max(...hits)+UU.tail;name=UU.name;col=UU.c;sp={type:'p61',set:S,t0:now,dur,name,col,cx,cy,done:[],hits};try{UU.start()}catch(e){}}
  else{const type=w.ult||w.type||'sword';hits=PLAN[type]||[400];const dur=Math.max(...hits)+700;name=w.sp||'필살';col=w.trail||'#ffffff';sp={type,t0:now,dur,name,col,cx,cy,done:[]};try{sfx(220,.4,'sawtooth',.07,1760);sfx(110,.5,'square',.05,55)}catch(e){}}
  U.act={sp,hits,t0:now,k:0,end:now+sp.dur,UU,col,hitF:w.hitF||400,type:sp.type};const m=me();if(m)m.inv=now+sp.dur+400;try{const D=mode==='dg129'&&DG129.D;if(D){D.shots=[];D.tele=[]}}catch(e){}
  P.lungeT=now;P.lungeA=Math.atan2(cy-P.y,cx-P.x);P.lungeDur=260;try{banner('필살! '+name)}catch(e){}}
 function tickUlt(now){const A=U.act;if(!A)return;
  while(A.k<A.hits.length&&now-A.t0>=A.hits[A.k]){const k=A.k++,last=k===A.hits.length-1,n=A.hits.length,w=curWp()||{},wd=w.dmg||1,share=A.type==='p61'?(last?.3:.7/(n-1||1)):1/n;let pet=0;try{pet=(PETS[shopInv().eq.pt]||{}).dmg||0}catch(e){}
   for(const q of targets()){const o=q.o;let d;if(q.boss)d=Math.round(34*wd*(1+pet)*30*share);else d=Math.round((o.mx||100)*(o.el?.6:1.25)*share*Math.min(1.6,wd));d=Math.max(1,d);
    const was=o.hp;o.hp=Math.max(0,o.hp-d);o.hitT=now;o.hitF=now;try{const P2=mode==='dg129'?DG129.D:null;if(P2&&P2.pops)P2.pops.push({x:o.x+(Math.random()-.5)*16,y:o.y-(q.boss?60:28),s:'-'+d,c:k%2?'#ffffff':A.col,t:now})}catch(e){}
    if(was>0&&o.hp<=0){if(mode==='dg129'&&!q.boss){try{DG129.D.left--}catch(e){}}if(mode==='sec127'){o.st='dead';o.t=now}}
    if(mode==='sec127'&&o.hp>0&&!o.ph2&&o.hp<o.mx*.5){o.ph2=true}}
   A.sp.done.push(now);if(A.UU){try{A.UU.hit(k,last)}catch(e){}}else{try{sfx((A.hitF||400)*(1+k*.05),.18,'square',.06,(A.hitF||400)*.4);sfx(90,.2,'sawtooth',.05,40)}catch(e){}}}
  if(now>=A.end)U.act=null}
 function drawUlt(now){const A=U.act;if(!A)return;const og=(typeof G!=='undefined')?G:null;
  try{G=Object.assign(Object.create(og||{}),{sp:A.sp,ms:mus.ms||500,state:'play',B:BOSSES[0],boss:{x:A.sp.cx,y:A.sp.cy+26,slump:0},vuln:null,pops:[],parts:[]});drawSpecialFX(now)}catch(e){}finally{G=og}}
 function gauge(now){const og=(typeof G!=='undefined')?G:null;try{G=Object.assign(Object.create(og||{}),{ult:U.g,state:'play',sp:U.act?U.act.sp:null,spUsed:false});drawUltGauge(now)}catch(e){}finally{G=og}
  try{if(isTouchUI()){ensureUltBtn();const b=$('btnU');if(b.style.display!=='')b.style.display='';ultBtnPaint(U.g/100,!U.act)}}catch(e){}}
 function shield(now){/* 발밑 작은 방패: 패링 준비 / 재사용 대기 */const ready=now>=(P.parryCd||0),sx=P.x+10,sy=P.y+2;ctx.fillStyle='#05090b';ctx.fillRect(sx,sy,5,5);ctx.fillStyle=ready?'#9edbff':'#3a4a50';ctx.fillRect(sx+1,sy+1,3,3);ctx.fillRect(sx+2,sy+4,1,2)}
 if(typeof tryUlt==='function'){const f=tryUlt;tryUlt=function(){if(ON()){fire();return}return f.apply(this,arguments)}}
 /* 패링 F/L · 궁극기 C 키: 원래는 보스전(mode 'boss')에서만 받아서 클라비스 결투 · 던전에서 안 눌렸음 */
 addEventListener('keydown',e=>{if(!ON()||e.repeat||paused)return;if(e.code==='KeyF'||e.code==='KeyL'){e.preventDefault();tryParry()}else if(e.code==='KeyC'){e.preventDefault();tryUlt()}});
 /* 패링: 대기 시간을 보스전처럼(약 0.5초) */
 if(typeof tryParry==='function'){const f=tryParry;tryParry=function(){if(!ON())return f.apply(this,arguments);const now=performance.now();if(now<(P.parryCd||0))return;const r=f.apply(this,arguments);P.parryCd=Math.max(P.parryCd||0,now+520);try{sfx(1500,.04,'square',.018,1100)}catch(e){}return r}}

 /* ---------- 배경음악 ---------- */
 let MK=null,LT=performance.now();const SONG=k=>{try{if(k==='cave')return makeCaveSong(3);if(k==='arch')return makeCaveSong(7);if(k==='duel')return makeSong(7);if(k==='boss')return makeSong(19);if(k.startsWith('band'))return makeSong([12,15,6,17][+k.slice(4)]||12)}catch(e){}return null};
 function musicKey(){try{if(mode==='sec127'){const S=SEC127.SQ;if(!S)return null;return S.ph==='duel'||S.ph==='room'?'duel':'cave'}
  if(mode==='dg129'){const D=DG129.D;if(!D)return null;if(D.ph==='arch'||D.ph==='doc')return 'arch';if(D.ph==='boss'||D.ph==='bossIn')return 'boss';if(D.ph==='f20')return 'arch';return 'band'+(D.f>=16?3:D.f>=11?2:D.f>=6?1:0)}}catch(e){}return null}
 function music(now){const k=musicKey();if(k!==MK){/* 새 결투 · 던전을 시작하면 게이지는 0부터 */if(k==='duel'&&MK!=='duel'||k&&k.startsWith('band')&&(MK==='arch'||!MK)){U.g=0;U.act=null}MK=k;if(k){try{initAudio()}catch(e){}const S=SONG(k);if(S){try{stopMusic();startMusic(S,now,0)}catch(e){}}}else{try{stopMusic()}catch(e){}}}
  if(k){try{sched(now)}catch(e){}}}

 /* ---------- 매 프레임: 장면을 그린 뒤 위에 덧그림 ---------- */
 {const _f=frame;frame=function(){const r=_f.apply(this,arguments);const now=performance.now();
   if(!ON()){LT=now;if(MK){MK=null;try{stopMusic()}catch(e){}}return r}
   const dt=Math.min(.05,(now-LT)/1000);LT=now;try{music(now);try{stamTick(dt)}catch(e){}ctx.setTransform(SS,0,0,SS,0,0);
    if(fight()||U.act){tickUlt(now);drawUlt(now);shield(now);gauge(now);try{if(window.PV76&&PV76.paint)PV76.paint()}catch(e){}}
    else{try{const b=$('btnU');if(b&&b.style.display!=='none'&&mode==='dg129'&&DG129.D&&(DG129.D.ph==='arch'||DG129.D.ph==='doc'))b.style.display='none'}catch(e){}}}catch(e){console.error('sk130',e)}
   return r}}
 /* 새 결투 · 새 던전을 시작하면 게이지는 0부터 */
 window.SK130={gain,fire,get U(){return U}};
}catch(e){console.error('v130 secret kit',e)}})();
