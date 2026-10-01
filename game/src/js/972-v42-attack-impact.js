
/* ================= v42 공격 연출: 자연스러운 등장·소멸 + 발동 임팩트 (보스 50명 공통) =================
   패턴 엔진(NP: t0 예고 → t1 발동 → t2 종료)에 단계별 연출을 더한다. 판정(크기·시간)은 그대로, 그림만 바뀐다.
   · 탄: 발사 지점에서 섬광과 함께 작게 튀어나와 커지고(살짝 넘쳤다 제자리), 끝날 때 퍽 하고 흩어짐
   · 광선: 가늘게 켜졌다 확 굵어지는 점화, 끝부분 불꽃, 끝날 땐 가늘어지며 꺼짐
   · 장판(사각·원): 내려꽂히는 순간 흰 섬광 · 충격파 고리 · 파편 · 크기에 비례한 흔들림 · 낮은 쿵 소리
   · 보스: 공격이 나가는 순간 반동(화면이 발사 반대쪽으로 살짝 밀림)
   · 주인공 타격: 맞힌 자리에 흰 충격 고리와 십자 섬광, 강한 타격일수록 크게 */
(function(){
 const NAT={hs:[],bp:{t:-1e9,x:0,y:0,k:0},lastThump:0,lastKick:0};
 const inA=(x,y)=>x>AX-4&&x<AX+AW+4&&y>AY-4&&y<AY+AH+4;
 const ease=k=>k<.7?.35+.8*(k/.7):1.15-.15*((k-.7)/.3);
 const puff=(x,y,n,col,spd,up)=>{for(let i=0;i<n;i++){const a=RND()*TAU,v=(spd||70)*(.4+RND()*.8);G.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-(up||0),life:.28+RND()*.25,max:.5,col:i%3?col:'#ffffff',s:1.5+RND()*1.5,g:up?260:60})}};
 const kick=(now,x,y,k)=>{if(now-NAT.lastKick<90)return;NAT.lastKick=now;const g=bgeo(),dx=x-g.x,dy=y-g.coreY,l=Math.hypot(dx,dy)||1;NAT.bp={t:now,x:-dx/l,y:-dy/l,k:Math.min(1,k)}};

 /* ---------- 탄: 등장 ---------- */
 try{const od=NPK.orb.draw;NPK.orb.draw=function(o,b,now){const e=b-o.t1;
   if(o.harm===false||o.noGrow||e>=.16||e<0)return od.apply(this,arguments);
   const k=e/.16,r0=o.r,col=o.col||npCol(),[sx,sy]=o.pos(o.t1);
   /* 발사 섬광 (발사 지점에 남음) */pcirc(sx,sy,Math.max(1,Math.round(r0*1.5*(.7+k*.6))),'#ffffff',.6*(1-k));cRing(sx,sy,Math.round(r0+3+k*10),col,.9*(1-k),2);
   o.r=Math.max(1,Math.round(r0*ease(k)));try{return od.apply(this,arguments)}finally{o.r=r0}}}catch(e){console.error('v42 orb',e)}

 /* ---------- 광선: 점화 · 끝불꽃 · 꺼짐 ---------- */
 try{const sd=NPK.seg.draw;NPK.seg.draw=function(o,b,now){const sty=o.sty||'laser';if(sty==='chain'||sty==='hand'||o.harm===false)return sd.apply(this,arguments);
   const e=b-o.t1,rem=o.t2-b,w0=o.w;let s=1;if(e<.1)s=.2+1.1*(e/.1);else if(e<.2)s=1.3-.3*((e-.1)/.1);if(rem<.15)s*=Math.max(.15,rem/.15);
   o.w=Math.max(1,w0*s);let r;try{r=sd.apply(this,arguments)}finally{o.w=w0}
   try{const [ax,ay]=o.a(b),[bx,by]=o.b(b),col=o.col||npCol();
    if(e<.22){const f=1-e/.22;line(ax,ay,bx,by,3,(x,y)=>cPx(x,y,Math.round(w0*1.8+4),'#ffffff',.22*f));pcirc(ax,ay,Math.round(w0+5),'#ffffff',.7*f)}
    if(inA(bx,by)&&rem>.1&&Math.floor(now/50)%2){cStar(bx,by,Math.round(3+w0*.4),'#ffffff',.8);cPx(bx+(RND()-.5)*8,by+(RND()-.5)*8,2,col,.9)}}catch(_){}
   return r}}catch(e){console.error('v42 seg',e)}

 /* ---------- 장판: 내려꽂히는 섬광 ---------- */
 const flashOver=(o,now,shape)=>{const d=now-(o._fT||-1e9);if(d<0||d>140)return;const a=.55*(1-d/140);try{shape(a)}catch(_){}};
 try{const rd=NPK.rect.draw;NPK.rect.draw=function(o,b,now){const r=rd.apply(this,arguments);flashOver(o,now,a=>{const [x,y,w,h]=o.rf?o.rf(b):[o.x,o.y,o.w,o.h];RA(Math.round(x),Math.round(y),Math.round(w),Math.round(h),'#ffffff',a)});return r}}catch(e){}
 try{const cd=NPK.circ.draw;NPK.circ.draw=function(o,b,now){const r=cd.apply(this,arguments);flashOver(o,now,a=>{const [x,y,rr]=o.cf?o.cf(b):[o.x,o.y,o.r];pcirc(x,y,Math.max(1,Math.round(rr)),'#ffffff',a)});return r}}catch(e){}

 /* ---------- 발동 순간 감지 → 임팩트 (프레임마다 한 번 훑음) ---------- */
 function scan(now,beat){if(!G||G.state!=='play')return;let fired=0;
  for(const o of npA()){if(o.harm===false)continue;
   if(!o._fired&&beat>=o.t1&&beat<o.t2){o._fired=1;fired++;if(fired>6)continue;const col=o.col||npCol();
    if(o.k==='orb'){const [x,y]=o.pos(o.t1);if(inA(x,y)){puff(x,y,3,col,60);kick(now,x,y,.35)}}
    else if(o.k==='seg'){const [ax,ay]=o.a(beat),[bx,by]=o.b(beat);G.shake=Math.max(G.shake,.12);if(inA(ax,ay))puff(ax,ay,4,col,80);if(inA(bx,by))puff(bx,by,5,col,90,40);kick(now,(ax+bx)/2,(ay+by)/2,.6)}
    else if(o.k==='rect'||o.k==='circ'){let cx,cy,rad,area;if(o.k==='rect'){const [x,y,w,h]=o.rf?o.rf(beat):[o.x,o.y,o.w,o.h];cx=x+w/2;cy=y+h/2;rad=Math.max(w,h)/2;area=w*h}else{const [x,y,r]=o.cf?o.cf(beat):[o.x,o.y,o.r];cx=x;cy=y;rad=r;area=Math.PI*r*r}
     o._fT=now;const big=clamp(area/9000,0,1);
     fxRing(cx,cy,now,300+big*200,Math.min(120,rad*1.15+8),col);if(big>.15)fxRing(cx,cy,now+40,260,Math.min(90,rad*.8+6),'#ffffff');
     puff(cx,cy,Math.round(3+big*9),col,60+big*80,70);G.shake=Math.max(G.shake,.08+big*.3);if(big>.3)G.flash=Math.max(G.flash||0,.06+big*.08);
     if(big>.25&&now-NAT.lastThump>120){NAT.lastThump=now;try{sfx(70,.16,'sine',.06+big*.05,38)}catch(_){}}kick(now,cx,cy,.4+big*.6)}}
   /* (구형 장판도 같은 임팩트) */
   /* 탄 소멸: 화면 안에서 끝나면 퍽 */
   if(o.k==='orb'&&!o._pop&&beat>=o.t2&&beat<o.t2+.2){o._pop=1;try{const [x,y]=o.pos(o.t2);if(inA(x,y)){const col=o.col||npCol();puff(x,y,4,col,50);fxRing(x,y,now,200,(o.r||4)+7,col)}}catch(_){}}}
  for(const z of (G.zones||[])){if(z.harm===false||z._fired||beat<z.t1||beat>=z.t2)continue;z._fired=1;fired++;if(fired>8)continue;const col=npCol(),big=clamp(Math.PI*z.r*z.r/9000,0,1);
   fxRing(z.cx,z.cy,now,300+big*200,Math.min(110,z.r*1.15+8),col);fxRing(z.cx,z.cy,now+40,240,Math.min(80,z.r*.8+6),'#ffffff');puff(z.cx,z.cy,Math.round(3+big*8),col,60+big*70,70);G.shake=Math.max(G.shake,.08+big*.28);
   if(big>.2&&now-NAT.lastThump>120){NAT.lastThump=now;try{sfx(70,.16,'sine',.06+big*.05,38)}catch(_){}}kick(now,z.cx,z.cy,.4+big*.5)}}
 /* ---------- 장판의 출처 잇기: 보스가 던지거나(포물선) 하늘에서 떨어져(여러 개 동시) 정확히 발동 순간에 꽂힘 ---------- */
 function drawLobs(now,beat){if(!G||!(G.state==='play'||G.state==='count'))return;const L=npA(),cnt={};
  for(const o of L)if((o.k==='rect'||o.k==='circ')&&o.harm!==false&&beat<o.t1){const key=Math.round(o.t1*20);cnt[key]=(cnt[key]||0)+1}
  const g=bgeo();let drawn=0;
  for(const o of L){if(drawn>12)break;if(!(o.k==='rect'||o.k==='circ')||o.harm===false||o.deco||o.noTel||o.rf||o.cf||beat>=o.t1)continue;
   const tel=o.t1-o.t0,Ld=Math.min(.7,Math.max(.25,tel*.55)),p=(beat-(o.t1-Ld))/Ld;if(p<0||p>1)continue;drawn++;
   const tx=o.k==='rect'?o.x+o.w/2:o.x,ty=o.k==='rect'?o.y+o.h/2:o.y,col=o.col||npCol(),sky=(cnt[Math.round(o.t1*20)]||0)>=4;
   const P0=sky?[tx+(tx<W/2?-14:14),AY-6]:[g.x,g.coreY],arc=sky?0:Math.min(70,30+Math.hypot(tx-P0[0],ty-P0[1])*.35);
   const at=q=>{const e=sky?q*q:q;return [P0[0]+(tx-P0[0])*e,P0[1]+(ty-P0[1])*e-arc*4*q*(1-q)]};
   for(let i=4;i>=1;i--){const q=p-i*.05;if(q<0)continue;const [x,y]=at(q);cPx(x,y,Math.max(1,4-i*.6),col,.18+.12*(4-i))}
   const [x,y]=at(p),s=sky?3:3+Math.round(Math.sin(p*Math.PI)*2);pcirc(x,y,s+1,col,.9);pcirc(x,y,Math.max(1,s-1),'#ffffff',.95);
   if(!sky&&p<.15)cRing(P0[0],P0[1],Math.round(6+p*40),col,(1-p/.15)*.8,2)}}
 try{const _nd=npDrawTop;npDrawTop=function(now,beat){try{scan(now,beat)}catch(e){if(!NAT.err){NAT.err=1;console.error('v42 scan',e)}}const r=_nd.apply(this,arguments);try{drawLobs(now,beat)}catch(e){if(!NAT.err2){NAT.err2=1;console.error('v42 lob',e)}}return r}}catch(e){}

 /* ---------- 주인공 타격 임팩트 ---------- */
 try{const _hi=hdImpact;hdImpact=function(now,kind,x,y){const r=_hi.apply(this,arguments);try{const s={hit:1,perfect:1.3,crit:1.6,fin:2.2,kill:2.6}[kind]||1;
   NAT.hs.push({x,y,t:now,s,kind});if(NAT.hs.length>8)NAT.hs.shift();fxRing(x,y,now,180+s*60,10+s*9,'#ffffff');if(s>1.2)fxRing(x,y,now+30,260,14+s*12,G.B.c)}catch(_){}return r}}catch(e){console.error('v42 imp',e)}
 function drawHitSparks(now){NAT.hs=NAT.hs.filter(h=>now-h.t<150);for(const h of NAT.hs){const k=(now-h.t)/150,a=1-k,R=Math.round((6+h.s*5)*(1-k*.4));
   cStar(h.x,h.y,R,'#ffffff',a);pcirc(h.x,h.y,Math.max(1,Math.round((3+h.s*2)*(1-k))),'#ffffff',a);
   const n=h.kind==='hit'?4:6;for(let i=0;i<n;i++){const ang=i*TAU/n+h.t*.001,r0=R*.6+k*R*1.2,r1=r0+R*.8;line(h.x+Math.cos(ang)*r0,h.y+Math.sin(ang)*r0,h.x+Math.cos(ang)*r1,h.y+Math.sin(ang)*r1,2,(px,py)=>cPx(px,py,1,'#fff6c8',a))}}}

 /* ---------- 화면: 보스 반동 + 타격 섬광 ---------- */
 try{const _ds=drawScene;drawScene=function(now){const d=now-NAT.bp.t;let push=false;if(mode==='boss'&&d>=0&&d<150){const k=NAT.bp.k*Math.sin(d/150*Math.PI)*(1-d/150)*3.2;ctx.save();ctx.translate(Math.round(NAT.bp.x*k),Math.round(NAT.bp.y*k));push=true}
   let r;try{r=_ds.apply(this,arguments)}finally{if(push)ctx.restore()}try{if(mode==='boss'&&NAT.hs.length)drawHitSparks(now)}catch(_){}return r}}catch(e){console.error('v42 ds',e)}
})();
