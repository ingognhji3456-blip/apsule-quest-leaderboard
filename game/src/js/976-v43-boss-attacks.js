/* ================= v43 보스가 '직접' 공격: 예고 동안 몸을 젖히며 기를 모으고 → 발동 순간 공격 방향으로 몸을 내지름 · 레이저/탄은 보스 몸에서 에너지가 뻗어 만들어짐 ================= */
(function(){
 const AK={off:[0,0],fireT:-1e9,fireDir:[0,1],fireK:0};
 const coreOf=()=>{const g=bgeo();return [g.x,g.coreY,g]};
 const tgtOf=(o,b)=>{try{if(o.k==='orb')return o.pos(o.t1);if(o.k==='seg'){const a=o.a(o.t1),c=o.b(o.t1);return [(a[0]+c[0])/2,(a[1]+c[1])/2]}if(o.k==='rect')return o.rf?(r=>[r[0]+r[2]/2,r[1]+r[3]/2])(o.rf(o.t1)):[o.x+o.w/2,o.y+o.h/2];if(o.k==='circ')return o.cf?o.cf(o.t1):[o.x,o.y]}catch(e){}return null};
 /* 이번 프레임의 몸 동작 계산 */
 function motion(now,beat){if(!G||G.state!=='play'){AK.off=[0,0];return}const [cx,cy]=coreOf();let best=null,bp=0;
  for(const o of npA()){if(o.harm===false||beat<o.t0||beat>=o.t1)continue;const p=(beat-o.t0)/Math.max(.01,o.t1-o.t0);if(p>bp){bp=p;best=o}}
  let ox=0,oy=0;
  if(best){const tg=tgtOf(best,beat);if(tg){const dx=tg[0]-cx,dy=tg[1]-cy,l=Math.hypot(dx,dy)||1,k=Math.min(1,bp*1.2),pull=3.2*k*k;ox-=dx/l*pull;oy-=dy/l*pull*.7;if(bp>.72){const tr=Math.floor(now/40)%2?1:-1;ox+=tr*.8}}}
  const d=now-AK.fireT;if(d>=0&&d<320){const k=d<70?d/70:1-(d-70)/250,s=7*AK.fireK*Math.max(0,k);ox+=AK.fireDir[0]*s;oy+=AK.fireDir[1]*s*.75}
  AK.off=[ox,oy]}
 /* 발동 순간 기록 (가장 최근 공격 방향으로 내지름) */
 function onFire(now,o,beat){const tg=tgtOf(o,beat);if(!tg)return;const [cx,cy]=coreOf(),dx=tg[0]-cx,dy=tg[1]-cy,l=Math.hypot(dx,dy)||1;if(now-AK.fireT<110&&AK.fireK>=.7)return;AK.fireT=now;AK.fireDir=[dx/l,dy/l];AK.fireK=o.k==='orb'?.55:o.k==='seg'?.9:1}
 /* 보스 몸에서 뻗는 에너지 */
 function conduits(now,beat){if(!G||!(G.state==='play'))return;const [cx,cy,g]=coreOf(),t=now/1000;let chargeP=0,n=0;
  for(const o of npA()){if(o.harm===false)continue;
   if(!o._akF&&beat>=o.t1){o._akF=1;if(beat<o.t1+.3)onFire(now,o,beat)}
   /* 발동 중인 레이저가 보스에게서 멀리서 시작하면: 보스가 먼저 그 지점으로 쏘고, 거기서 꺾여 나가는 것처럼(중계점) */
   if(o.k==='seg'&&beat>=o.t1&&beat<o.t2&&(o.sty||'laser')!=='chain'&&(o.sty||'')!=='hand'){let A;try{A=o.a(beat)}catch(e){A=null}
    if(A&&Math.hypot(A[0]-cx,A[1]-cy)>34){const col=o.col||npCol(),e=beat-o.t1,rem=o.t2-beat,k=Math.min(1,e/.08)*Math.min(1,rem/.15),w=Math.max(1,Math.round((o.w||6)*.45*k));
     line(cx,cy,A[0],A[1],2,(x,y)=>cPx(x,y,w+2,col,.35*k));line(cx,cy,A[0],A[1],2,(x,y)=>cPx(x,y,w,col,.9*k));line(cx,cy,A[0],A[1],2,(x,y)=>cPx(x,y,1,'#ffffff',k));
     const sp=t*4;ctx.save();ctx.translate(A[0],A[1]);ctx.rotate(sp);ctx.globalAlpha=k;ctx.fillStyle='#ffffff';ctx.fillRect(-3,-3,6,6);ctx.strokeStyle=col;ctx.lineWidth=1.5;ctx.strokeRect(-5,-5,10,10);ctx.restore();cRing(A[0],A[1],7+Math.round(Math.sin(t*20)*1.5),col,.8*k,1)}}
   if(beat<o.t0||beat>=o.t1)continue;const p=(beat-o.t0)/Math.max(.01,o.t1-o.t0);chargeP=Math.max(chargeP,p);const col=o.col||npCol();
   if(o.k==='seg'&&n<6){n++;let A;try{A=o.a(o.t1)}catch(e){continue}const d=Math.hypot(A[0]-cx,A[1]-cy);
    if(p>.35){const q=(p-.35)/.65;
     if(d>34){/* 몸 → 포구로 흐르는 기운 */for(let i=0;i<7;i++){const u=((t*2.4)+i/7)%1;if(u>q*1.2)continue;cPx(lerp(cx,A[0],u),lerp(cy,A[1],u)+Math.sin(u*9+t*8)*2,2,i%2?col:'#ffffff',.35+.5*q)}
      line(cx,cy,A[0],A[1],5,(x,y,i)=>{if((i+Math.floor(t*20))%3===0)cPx(x,y,1,col,.25*q)})}
     /* 포구에 모이는 빛 */pcirc(A[0],A[1],Math.max(1,Math.round(2+q*5)),col,.55);pcirc(A[0],A[1],Math.max(1,Math.round(1+q*3)),'#ffffff',.9);for(let i=0;i<5;i++){const a=t*5+i*TAU/5,r=(1-((t*1.8+i/5)%1))*16;cPx(A[0]+Math.cos(a)*r,A[1]+Math.sin(a)*r,2,col,.8)}}}
   else if(o.k==='orb'&&n<10&&p>.55){let S;try{S=o.pos(o.t1)}catch(e){continue}const d=Math.hypot(S[0]-cx,S[1]-cy);if(d<46)continue;n++;
    /* 보스가 던지는 기운: 발사 순간에 정확히 도착하는 짧은 섬광 */const q=(p-.55)/.45,u=q*q,x=lerp(cx,S[0],u),y=lerp(cy,S[1],u)-Math.sin(u*Math.PI)*12;for(let i=0;i<4;i++){const uu=Math.max(0,u-i*.06);cPx(lerp(cx,S[0],uu),lerp(cy,S[1],uu)-Math.sin(uu*Math.PI)*12,3-i*.6,i?col:'#ffffff',.85-i*.18)}}}
  /* 몸의 코어가 차오름 */
  if(chargeP>0){const k=chargeP;try{e2Glow(cx,cy,26+k*30,'rgba(255,255,255,.9)',.12+k*.25)}catch(e){}cRing(cx,cy,Math.round(8+(1-k)*26),npCol(),.25+.55*k,2);if(k>.7&&Math.floor(now/60)%2)cStar(cx,cy,Math.round(4+k*6),'#ffffff',.8)}
  const d=now-AK.fireT;if(d>=0&&d<160){const k=1-d/160;pcirc(cx,cy,Math.round(6+12*(1-k)),'#ffffff',.5*k);cRing(cx,cy,Math.round(10+(1-k)*30),npCol(),k,2)}}
 try{const _nd=npDrawTop;npDrawTop=function(now,beat){try{motion(now,beat)}catch(e){}const r=_nd.apply(this,arguments);try{conduits(now,beat)}catch(e){if(!AK.err){AK.err=1;console.error('v43 atk',e)}}return r}}catch(e){}
 /* 그리기 동안만 보스 위치를 몸 동작만큼 옮김 (판정 계산엔 영향 없음) */
 try{const _ds=drawScene;drawScene=function(now){const b=G&&G.boss,ok=mode==='boss'&&b&&!G.ent&&(AK.off[0]||AK.off[1]);let sx,sy,nx,ny;
   if(ok){sx=b.x;sy=b.y;nx=b.x=sx+AK.off[0];ny=b.y=sy+AK.off[1]}
   try{return _ds.apply(this,arguments)}finally{if(ok){if(b.x===nx)b.x=sx;if(b.y===ny)b.y=sy}}}}catch(e){console.error('v43 ds',e)}
})();

