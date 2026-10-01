/* ================= 챕터 5 공격 연출 퀄리티 v34 — 예고 · 발사체 · 착탄 전부 '심해' 질감으로 =================
   예고: 음파(소나) 고리가 조여 오고 물이 차오름 · 발사체: 외곽선 + 발광 + 물방울 꼬리 · 착탄: 물보라 · 파편 · 충격 고리 */
const c5On=()=>typeof G!=='undefined'&&G&&(G.s5!=null||G._s5hold!=null)&&typeof mode!=='undefined'&&mode==='boss';
const C5W={warn:'#ff5a6a',warn2:'#ffb0a0',foam:'#e8fbff',deep:'#04121c',cy:'#7ef0ff'};
const c5Bc=()=>{try{return S5[c5Cur()].c}catch(e){return '#9de8dc'}};
const C5FX={p:[],rings:[]};
function c5Burst(x,y,n,col,sp,life,up){for(let i=0;i<n;i++){const a=Math.random()*TAU,v=(sp||60)*(.4+Math.random()*.8);C5FX.p.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-(up||0),t0:performance.now(),life:(life||600)*(.6+Math.random()*.6),c:Array.isArray(col)?col[i%col.length]:col,s:Math.random()<.3?2:1,g:90})}}
function c5Ring(x,y,r0,r1,col,life,w){C5FX.rings.push({x,y,r0,r1,c:col,t0:performance.now(),life:life||420,w:w||2})}
function c5FxDraw(now){if(!C5FX.p.length&&!C5FX.rings.length)return;const dt=1/60;C5FX.p=C5FX.p.filter(p=>{const k=(now-p.t0)/p.life;if(k>=1)return false;p.vy+=p.g*dt;p.vx*=.97;p.x+=p.vx*dt;p.y+=p.vy*dt;RA(Math.round(p.x),Math.round(p.y),p.s,p.s,p.c,1-k);return true});
 C5FX.rings=C5FX.rings.filter(r=>{const k=(now-r.t0)/r.life;if(k>=1)return false;const e=1-Math.pow(1-k,3);cRing(r.x,r.y,Math.max(1,lerp(r.r0,r.r1,e)),r.c,(1-k)*.9,r.w);return true})}
/* ---------- 예고 ---------- */
function c5Caustic(x,y,w,h,t,col,a){for(let i=0;i<w;i+=7)for(let j=((i*5)%7);j<h;j+=7){const q=Math.sin(t*3+i*.35+j*.27)+Math.sin(t*2.1-i*.21+j*.4);if(q>1.1)RA(Math.round(x+i),Math.round(y+j),2,1,col,a*(q-1.1))}}
{const T=NPK.circ.tel;NPK.circ.tel=function(o,b,now){if(!c5On())return T.apply(this,arguments);const p=clamp((b-o.t0)/(o.t1-o.t0),0,1),[x,y,r]=o.cf?o.cf(o.t1):[o.x,o.y,o.r],t=now/1000,bl=p>.8&&Math.floor(now/70)%2,col=o.harm===false?C5W.cy:C5W.warn;
 /* 바닥 그림자 + 차오르는 물 */pcirc(x,y,r,C5W.deep,.32+.2*p);pcirc(x,y,Math.max(1,r*p),col,.16+.12*p);c5Caustic(x-r,y-r,r*2,r*2,t,'#ffffff',.25*p);
 /* 조여 오는 소나 고리 3겹 */for(let k=0;k<3;k++){const q=((1-p)+k/3)%1,rr=r*(1+q*1.2);cRing(x,y,rr,col,(1-q)*.35*(.4+p),1)}
 /* 테두리: 점선이 돌며 채워짐 */const n=Math.max(16,Math.round(r*1.4));for(let i=0;i<n;i++){const a=i*TAU/n-t*1.2;if(i/n>p+.08&&i%2)continue;cPx(x+Math.cos(a)*r,y+Math.sin(a)*r,i/n<p?2:1,bl?'#ffffff':col,.55+.45*p)}
 /* 떠오르는 기포 */for(let i=0;i<4;i++){const q=(t*.9+i*.25)%1,bx=x+Math.sin(i*2.3+t)*r*.5;cRing(bx,y+r*.4-q*r*.9,1+(i%2),'#e8fbff',(1-q)*.5*p,1)}
 /* 마지막 순간 번쩍 */if(p>.86)cRing(x,y,r+2,'#ffffff',.5+.5*Math.sin(now/40),1);
 if(o.label){ctx.font='bold 11px monospace';ctx.textAlign='center';ctx.fillStyle='#000';ctx.globalAlpha=.9;ctx.fillText(o.label,Math.round(x)+1,Math.round(y+5));ctx.fillStyle='#ffffff';ctx.fillText(o.label,Math.round(x),Math.round(y+4));ctx.globalAlpha=1;ctx.textAlign='left'}}}
{const T=NPK.rect.tel;NPK.rect.tel=function(o,b,now){if(!c5On())return T.apply(this,arguments);const p=clamp((b-o.t0)/(o.t1-o.t0),0,1),[x,y,w,h]=o.rf?o.rf(o.t1):[o.x,o.y,o.w,o.h],t=now/1000,bl=p>.8&&Math.floor(now/70)%2;if(w<1||h<1)return;const X=Math.round(x),Y=Math.round(y),Wd=Math.round(w),Hd=Math.round(h);
 RA(X,Y,Wd,Hd,C5W.deep,.25+.15*p);/* 아래에서 차오르는 물 + 물결 윗면 */const fh=Math.round(Hd*p);RA(X,Y+Hd-fh,Wd,fh,C5W.warn,.13+.08*p);for(let i=0;i<Wd;i+=2){const wy=Math.round(Math.sin(i*.2+t*6)*1.5);RA(X+i,Y+Hd-fh+wy,2,1,C5W.warn2,.7*p)}c5Caustic(X,Y+Hd-fh,Wd,fh,t,'#ffffff',.3);
 /* 흐르는 점선 테두리 */const ph=Math.floor(t*24)%8,c=bl?'#ffffff':C5W.warn;for(let i=ph;i<Wd;i+=8){RA(X+i,Y,4,1,c,.95);RA(X+Wd-i-4,Y+Hd-1,4,1,c,.95)}for(let j=ph;j<Hd;j+=8){RA(X,Y+Hd-j-4,1,4,c,.95);RA(X+Wd-1,Y+j,1,4,c,.95)}
 /* 모서리 꺾쇠 */for(const [cx,cy,sx,sy] of [[X,Y,1,1],[X+Wd-1,Y,-1,1],[X,Y+Hd-1,1,-1],[X+Wd-1,Y+Hd-1,-1,-1]]){RA(cx,cy,sx*5,1,'#ffffff',.8);RA(cx,cy,1,sy*5,'#ffffff',.8)}
 if(o.safe)npSafeDraw(o,now)}}
{const T=NPK.seg.tel;NPK.seg.tel=function(o,b,now){if(!c5On())return T.apply(this,arguments);const p=clamp((b-o.t0)/(o.t1-o.t0),0,1),bl=p>.78&&Math.floor(now/70)%2,tb=o.live?b:o.t1,[ax,ay]=o.a(tb),[bx,by]=o.b(tb),t=now/1000,L=Math.hypot(bx-ax,by-ay)||1,nx=-(by-ay)/L,ny=(bx-ax)/L,hw=Math.max(3,o.w/2),c=bl?'#ffffff':C5W.warn;
 /* 폭 표시: 옅은 띠 + 양쪽 점선 */line(ax,ay,bx,by,3,(x,y)=>cPx(x,y,hw*2,C5W.warn,.05+.08*p));for(const s of [-1,1])line(ax+nx*hw*s,ay+ny*hw*s,bx+nx*hw*s,by+ny*hw*s,5,(x,y,i)=>{if(i%2===0)cPx(x,y,1,c,.35+.55*p)});
 /* 가운데 흐르는 물살 입자 */for(let k=0;k<6;k++){const q=((t*.8+k/6)%1);cPx(ax+(bx-ax)*q,ay+(by-ay)*q,2,'#ffffff',(.3+.6*p)*Math.sin(q*Math.PI))}
 /* 끝 화살표 */cChevron(bx,by,Math.atan2(by-ay,bx-ax),c,.7+.3*p,3)}}
{const T=NPK.orb.tel;NPK.orb.tel=function(o,b,now){if(!c5On()||o.ray==null)return T.apply(this,arguments);const p=clamp((b-o.t0)/(o.t1-o.t0),0,1),[x,y]=o.pos(o.t1),bl=p>.78&&Math.floor(now/70)%2,L=(o.rayL||40)*(.4+.6*p),c=bl?'#ffffff':C5W.warn,t=now/1000;
 for(let s=6;s<L;s+=5){const k=s/L;cRing(x+Math.cos(o.ray)*s,y+Math.sin(o.ray)*s,k<.5?1:1,c,(.25+.55*p)*(1-k*.4),1)}cChevron(x+Math.cos(o.ray)*L,y+Math.sin(o.ray)*L,o.ray,c,.9,3);
 if(o.chg!==false){const cr=o.r*(.4+.8*p);pcirc(x,y,cr+2,c5Bc(),.15+.2*p);cRing(x,y,cr+3+Math.sin(t*12)*1,c5Bc(),.6*p,1)}
 if(o.prev){const n=o.prevN||7;for(let i=1;i<=n;i++){const u=o.t1+o.prev*i/n,[a,cc]=o.pos(u),[a2,c2]=o.pos(u+.02);cChevron(a,cc,Math.atan2(c2-cc,a2-a),C5W.warn,(.35+.5*p)*(1-i/(n+2)),3)}}}}
/* ---------- 발사체: 꼬리 · 외곽 발광 ---------- */
{const S=npSpr;npSpr=function(sty,x,y,r,now,o,b){if(!c5On()||!o||!o.pos||b==null)return S.apply(this,arguments);const col=o.col||c5Bc();
 /* 물방울 꼬리 */try{for(let i=1;i<=5;i++){const [tx,ty]=o.pos(b-i*.035);if(!Number.isFinite(tx))break;const k=1-i/6;pcirc(tx,ty,Math.max(1,r*.55*k),col,.18*k);if(i%2)RA(Math.round(tx+Math.sin(now/90+i)*2),Math.round(ty),1,1,'#e8fbff',.6*k)}}catch(e){}
 n4G(x,y,r*2.4,col,.35);pcirc(x,y,r+1.5,'#020a10',.55);const r2=S.apply(this,arguments);return r2}}
/* ---------- 착탄 효과: 원/칸이 켜지는 순간 한 번 ---------- */
{const D=npCircDraw;npCircDraw=function(o,x,y,r,now,b){if(c5On()&&!o._c5b&&o.harm!==false){o._c5b=1;const st=o.sty||'';const cols=st==='c5crush'?['#ffe0c0','#c8583e','#ffffff']:st==='c5bell'||st==='c5gold'?['#fff2c0','#d8b060','#ffffff']:st==='c5ink'?['#4a5ad8','#12142e','#8a9aff']:st==='c5elec'?['#c8ff8a','#f4ffd8','#ffffff']:st==='c5coral'?['#ff8a6a','#e0503c','#ffc2a8']:['#e8fbff','#7ef0ff','#ffffff'];
  c5Burst(x,y,Math.round(10+r*.6),cols,50+r*2,650,40);c5Ring(x,y,r*.4,r*1.5,cols[0],450,2);c5Ring(x,y,r*.2,r*1.1,'#ffffff',300,1);G.shake=Math.max(G.shake||0,Math.min(.25,r/140))}
 if(!c5On()||(o.sty&&o.sty.startsWith('c5')))return D.apply(this,arguments);
 /* 기본 원 공격 → 물기둥 분출 */const k=clamp((b-o.t1)/Math.max(.1,o.t2-o.t1),0,1),t=now/1000,c=o.col||c5Bc();pcirc(x,y,r,'#1a6aa8',.45*(1-k*.5));pcirc(x,y,r*.7,'#6ad0f0',.5*(1-k));for(let i=0;i<10;i++){const a=i*TAU/10+t*2,rr=r*(.3+.6*((i*37)%10)/10);RA(Math.round(x+Math.cos(a)*rr),Math.round(y+Math.sin(a)*rr-k*r*.8),2,3,'#e8fbff',1-k)}cRing(x,y,r*(1+k*.3),'#ffffff',1-k,2);cRing(x,y,r*.6,c,.7*(1-k),1)}}
{const D=npRectDraw;npRectDraw=function(o,x,y,w,h,now,b){if(c5On()&&!o._c5b&&o.harm!==false&&w>2&&h>2){o._c5b=1;const n=Math.min(40,Math.round((w+h)/12));for(let i=0;i<n;i++)c5Burst(x+Math.random()*w,y+Math.random()*h,1,['#e8fbff','#7ef0ff','#ffffff'],40,500,30);G.shake=Math.max(G.shake||0,.15)}
 if(!c5On()||(o.sty&&o.sty!=='plain'))return D.apply(this,arguments);
 /* 기본 칸(집게 등) → 붉은 해류 */const t=now/1000,c=o.col||c5Bc();RA(x,y,w,h,c,.38);for(let i=0;i<w;i+=4){const k=Math.sin(i*.18+t*8);RA(x+i,y+h/2+k*h*.3-1,4,2,'#ffffff',.35)}c5Caustic(x,y,w,h,t,'#ffffff',.5);RA(x,y,w,2,'#ffffff',.9);RA(x,y+h-2,w,2,'#ffffff',.6)}}
{const D=npSegDraw;npSegDraw=function(o,ax,ay,bx,by,now,b){if(c5On()&&!o._c5b&&o.harm!==false){o._c5b=1;for(let i=0;i<8;i++){const q=i/7;c5Burst(lerp(ax,bx,q),lerp(ay,by,q),2,['#ffffff',o.col||c5Bc()],35,400,10)}}
 if(c5On()&&(o.sty==='laser'||!o.sty)){const c=o.col||c5Bc(),w=Math.max(2,o.w),t=now/1000;line(ax,ay,bx,by,2,(x,y)=>cPx(x,y,w+6,c,.14));line(ax,ay,bx,by,2,(x,y)=>cPx(x,y,w,c,.8));line(ax,ay,bx,by,2,(x,y)=>cPx(x,y,Math.max(1,w*.35),'#ffffff',1));const L=Math.hypot(bx-ax,by-ay)||1;for(let i=0;i<6;i++){const q=(t*1.5+i/6)%1;cRing(ax+(bx-ax)*q,ay+(by-ay)*q,1.5,'#e8fbff',.7,1)}return}
 return D.apply(this,arguments)}}
/* 기존 챕터 5 전용 모양 보강 */
{const D=npSegDraw;npSegDraw=function(o,ax,ay,bx,by,now,b){if(!c5On())return D.apply(this,arguments);const s=o.sty,t=now/1000,w=Math.max(2,o.w);
 if(s==='c5beam'){const L=Math.hypot(bx-ax,by-ay)||1,ux=(bx-ax)/L,uy=(by-ay)/L;ctx.save();ctx.globalCompositeOperation='lighter';for(let k=0;k<3;k++){const sp=(k+1)*w*.9;ctx.globalAlpha=.1;ctx.fillStyle='#ffd06a';ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx-uy*sp,by+ux*sp);ctx.lineTo(bx+uy*sp,by-ux*sp);ctx.closePath();ctx.fill()}ctx.restore();ctx.globalAlpha=1;
  line(ax,ay,bx,by,2,(x,y)=>cPx(x,y,w,'#ffe6a0',.8));line(ax,ay,bx,by,2,(x,y)=>cPx(x,y,Math.max(1,w*.4),'#ffffff',1));for(let i=0;i<10;i++){const q=(t*.6+i/10)%1;cPx(ax+ux*L*q-uy*Math.sin(t*7+i)*w*.6,ay+uy*L*q+ux*Math.sin(t*7+i)*w*.6,2,'#fff8e0',.8)}n4G(ax,ay,14,'#ffd06a',.8);return}
 if(s==='c5chain'){let i=0;const L=Math.hypot(bx-ax,by-ay)||1,a=Math.atan2(by-ay,bx-ax);line(ax,ay,bx,by,4,(x,y)=>{i++;ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.rotate(a+(i%2?Math.PI/2:0));ctx.fillStyle='#050b12';ctx.fillRect(-3,-2,6,4);ctx.fillStyle=i%2?'#8a9096':'#c8d0d8';ctx.fillRect(-2.5,-1.5,5,3);ctx.fillStyle='#050b12';ctx.fillRect(-1.5,-.5,3,1);ctx.restore()});return}
 if(s==='c5stitch'){line(ax,ay,bx,by,2,(x,y)=>cPx(x,y,w+5,'#c8ff8a',.14));let px=ax,py=ay;const L=Math.hypot(bx-ax,by-ay)||1,n=Math.max(3,Math.round(L/10)),seed=Math.floor(now/60);for(let i=1;i<=n;i++){const q=i/n,j=i===n?0:((hash(seed+'st'+i)%7)-3)*1.2,nx=lerp(ax,bx,q)-(by-ay)/L*j,ny=lerp(ay,by,q)+(bx-ax)/L*j;line(px,py,nx,ny,1,(x,y)=>{cPx(x,y,2,'#c8ff8a',.9);cPx(x,y,1,'#ffffff',1)});px=nx;py=ny}
  let i=0;line(ax,ay,bx,by,7,(x,y)=>{i++;const ux=(bx-ax)/L,uy=(by-ay)/L;line(x-uy*w*.8-ux*2,y+ux*w*.8-uy*2,x+uy*w*.8+ux*2,y-ux*w*.8+uy*2,1,(qx,qy)=>cPx(qx,qy,1,i%2?'#ffcf8a':'#ff8aa6',1))});return}
 if(s==='c5thread'){line(ax,ay,bx,by,2,(x,y)=>cPx(x,y,w+3,'#ff5a50',.18));line(ax,ay,bx,by,2,(x,y,i)=>cPx(x,y+Math.sin(i*.3+t*10)*.8,2,i%6<3?'#ff6a60':'#a82a26',1));return}
 return D.apply(this,arguments)}}
/* 바늘 끝 · 탄 스프라이트 보강 */
Object.assign(C5SPR,{
 pearl(x,y,r,t,c){n4G(x,y,r*3.2,'#ffb8e6',.55);pcirc(x,y,r+1.5,'#2a1030',1);pcirc(x,y,r+.5,'#e8c8e8',1);pcirc(x,y,r,'#fff6fb',1);pcirc(x+r*.35,y+r*.35,r*.5,'#ffc8ea',.9);RA(x-Math.round(r*.5),y-Math.round(r*.5),Math.max(1,Math.round(r*.45)),Math.max(1,Math.round(r*.45)),'#ffffff',1);cRing(x,y,r+3+Math.sin(t*10)*1,'#ffb8e6',.35,1)},
 gem(x,y,r,t,c){n4G(x,y,r*3.4,'#a8ffe9',.6);const s=1+.15*Math.sin(t*8);ctx.fillStyle='#050b12';ctx.beginPath();ctx.moveTo(x,y-r*s-1.5);ctx.lineTo(x+r+1.5,y);ctx.lineTo(x,y+r*s+1.5);ctx.lineTo(x-r-1.5,y);ctx.closePath();ctx.fill();ctx.fillStyle='#2aa89a';ctx.beginPath();ctx.moveTo(x,y-r*s);ctx.lineTo(x+r,y);ctx.lineTo(x,y+r*s);ctx.lineTo(x-r,y);ctx.closePath();ctx.fill();ctx.fillStyle='#a8ffe9';ctx.beginPath();ctx.moveTo(x,y-r*s);ctx.lineTo(x+r,y);ctx.lineTo(x,y);ctx.closePath();ctx.fill();RA(x-1,y-Math.round(r*.6),1,Math.max(1,Math.round(r*.5)),'#ffffff',1)},
 note(x,y,r,t,c){n4G(x,y,r*2.6,'#ffe6a0',.5);pcirc(x-1,y+2,r*.8,'#050b12',1);pcirc(x-1,y+2,r*.62,'#ffe6a0',1);RA(x+Math.round(r*.3),y-Math.round(r*1.5),2,Math.round(r*2),'#050b12',1);RA(x+Math.round(r*.3),y-Math.round(r*1.5),1,Math.round(r*1.9),'#ffe6a0',1);RA(x+Math.round(r*.3),y-Math.round(r*1.5),Math.round(r),2,'#ffe6a0',1);RA(x-2,y+1,1,1,'#ffffff',1)},
 sand(x,y,r,t,c){n4G(x,y,r*2.4,'#e8c890',.4);pcirc(x,y,r*.75,'#5a3a18',1);pcirc(x,y,r*.6,'#c8a060',1);for(let i=0;i<7;i++){const a=i*.9+t*4,d=r*(.4+.5*((i*3)%5)/5);cPx(x+Math.cos(a)*d,y+Math.sin(a)*d,1,i%2?'#fff0c0':'#e8c890',1)}RA(x-1,y-1,1,1,'#ffffff',1)},
 lure(x,y,r,t,c){const g=.7+.3*Math.sin(t*8);n4G(x,y,r*5*g,'#c8ff8a',.8);pcirc(x,y,r+1,'#1a3a10',1);pcirc(x,y,r,'#c8ff8a',1);pcirc(x,y,r*.5,'#ffffff',1);for(let i=0;i<4;i++){const a=hash(Math.floor(t*14)+'lu'+i)%628/100;line(x,y,x+Math.cos(a)*(r+6),y+Math.sin(a)*(r+6),2,(px,py)=>cPx(px,py,1,'#f4ffd8',.9))}}});
/* 포물선 투척: 착지점 그림자 + 궤적 점선 */
{const L=c5Lob;c5Lob=function(T0,T1,from,to,sty,r,h){const o=L.apply(this,arguments);o.deco=(q,b,now)=>{if(b>=q.t2)return;const p=clamp((b-T0)/(T1-T0),0,1);ctx.fillStyle='#000';ctx.globalAlpha=.25+.35*p;ctx.beginPath();ctx.ellipse(to[0],to[1]+2,4+p*8,1.5+p*3,0,0,TAU);ctx.fill();ctx.globalAlpha=1;
  try{const [x0,y0]=typeof from==='function'?from():from;for(let i=0;i<14;i++){const u=i/14;if(u<p)continue;cPx(lerp(x0,to[0],u),lerp(y0,to[1],u)-Math.sin(u*Math.PI)*(h||60),1,'#ffffff',.35)}}catch(e){}
  if(b>=q.t2-.02&&!q._land){q._land=1;c5Burst(to[0],to[1],12,['#ffffff','#e8fbff',c5Bc()],70,500,40)}};return o}}
/* 효과 그리기: 탄 위에 */{const _d=npDrawTop;npDrawTop=function(now,beat){const r=_d.apply(this,arguments);try{if(c5On())c5FxDraw(now);else if(C5FX.p.length)C5FX.p=[]}catch(e){}return r}}
{const _c=clearPhraseHazards;clearPhraseHazards=function(){const r=_c.apply(this,arguments);C5FX.p=[];C5FX.rings=[];return r}}

/* ================= 챕터 5 등장 연출 — 보스 10명 모두 다르게 =================
   tick(t,E) → {dx,dy,al}, back/front(t,E,g,f), clip(c,t,E,g) · t ms · 착지 ~2000~2300ms */
const c5eWater=(a)=>RA(0,0,W,H,'#021018',a);
function c5eBub(t,n,x0,x1,col,a){for(let i=0;i<n;i++){const q=((t/1400)+i*.37)%1,x=x0+((i*53)%Math.max(1,x1-x0))+Math.sin(t/300+i)*4,y=AY+AH-q*AH;cRing(x,y,1+(i%3),col||'#cfefff',(1-q)*(a||.6),1)}}
function c5eSplash(x,y,n,col){try{c5Burst(x,y,n,['#ffffff','#e8fbff',col||'#7ef0ff'],110,700,80);c5Ring(x,y,6,90,'#e8fbff',600,2)}catch(e){}}
/* 1 등대 껍질게: 어둠 속 등대 불빛이 한 바퀴 돌며 비추다 → 모래를 뚫고 솟아오름 */
ENT2.c_s5_beacon={tick(t,E){E.fire('a',200,()=>sfx(90,1.2,'sine',.08,70));E.fire('b',1500,()=>{G.shake=.6;sfx(60,.6,'square',.1,30)});E.fire('l',2100,()=>{E.boom('#ffd06a',true);c5eSplash(HOME.x,HOME.y,30,'#ffd06a')});const k=eOut(e2S(t,1500,2100));return {dy:(1-k)*70,al:t<1500?0:1}},
 clip(c,t,E,g){c.rect(0,0,W,g.y+2)},
 back(t,E,g,f){c5eWater(t<2100?.75:.75*Math.max(0,1-(t-2100)/500));const a=-Math.PI/2+(t/1500)*TAU,ox=g.x,oy=g.y-6;if(t<1600){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.25;ctx.fillStyle='#ffd06a';ctx.beginPath();ctx.moveTo(ox,oy);ctx.lineTo(ox+Math.cos(a-.2)*420,oy+Math.sin(a-.2)*420);ctx.lineTo(ox+Math.cos(a+.2)*420,oy+Math.sin(a+.2)*420);ctx.fill();ctx.restore();e2Glow(ox,oy,16,'#ffd06a',.9)}
  if(t>1300&&t<2200){for(let i=0;i<12;i++){const q=e2S(t,1300+i*30,2100);RA(g.x-40+i*7,g.y-q*20*Math.abs(Math.sin(i)),3,3,'#8a7a5a',1-q)}}}};
/* 2 접힌 항로: 종이 해도가 화면에 펼쳐졌다가 접히며 가오리가 됨 */
ENT2.c_s5_manta={tick(t,E){for(let i=0;i<4;i++)E.fire('f'+i,300+i*300,()=>sfx(700-i*80,.12,'triangle',.04,300));E.fire('l',2000,()=>E.boom('#9fe6dd',false));return {al:t<1800?0:e2S(t,1800,2100)}},
 back(t,E,g,f){const k=eIn(e2S(t,300,1800)),w=lerp(W*.9,20,k),h=lerp(AH*.8,14,k),x=g.x-w/2,y=g.coreY-h/2;if(t<2000){ctx.globalAlpha=f;RA(x,y,w,h,'#e6d8b4',.85);RA(x,y,w/2,h,'#c8b68c',.6);for(let i=0;i<6;i++){RA(x+w*i/6,y,1,h,'#3a5566',.4);RA(x,y+h*i/6,w,1,'#3a5566',.4)}const pts=[[.1,.8],[.3,.5],[.55,.6],[.8,.25]];for(let i=0;i<pts.length-1;i++)line(x+w*pts[i][0],y+h*pts[i][1],x+w*pts[i+1][0],y+h*pts[i+1][1],3,(px,py)=>RA(px,py,2,2,'#d4403c',.9));ctx.globalAlpha=1}
  else{const q=e2S(t,2000,2600);for(let i=0;i<10;i++){const a=i*TAU/10;RA(g.x+Math.cos(a)*q*120,g.coreY+Math.sin(a)*q*60,6,4,'#e6d8b4',1-q)}}}};
/* 3 닻을 짊어진 기사: 위에서 닻이 사슬과 함께 떨어져 꽂히고, 사슬을 타고 기사가 내려옴 */
ENT2.c_s5_anchor={tick(t,E){E.fire('d',900,()=>{G.shake=1;sfx(50,.7,'square',.12,25);c5eSplash(HOME.x+30,HOME.y,24,'#5ef0e0')});E.fire('l',2200,()=>E.boom('#5ef0e0',false));const k=eOut(e2S(t,1200,2200));return {dy:-(1-k)*200,al:t<1200?0:1}},
 back(t,E,g,f){c5eWater(t<2200?.6:.6*Math.max(0,1-(t-2200)/500));const ax=g.x+30,k=eIn(e2S(t,200,900)),ay=lerp(AY-60,g.y,k);for(let y=AY-10;y<ay-20;y+=5)cRing(ax,y,2,y%10?'#8a9096':'#c8d0d8',f,1);RA(ax-2,ay-30,4,26,'#8a9096',f);RA(ax-9,ay-26,18,3,'#7a3a22',f);line(ax,ay,ax-10,ay-8,2,(x,y)=>RA(x,y,3,3,'#8a9096',f));line(ax,ay,ax+10,ay-8,2,(x,y)=>RA(x,y,3,3,'#8a9096',f));if(t>900&&t<1600)cRing(ax,ay,(t-900)/5,'#5ef0e0',1-(t-900)/700,2)}};
/* 4 진주 성가대: 진주 다섯 개가 음계로 울리며 모이고 → 빛 기둥 속 해파리 */
ENT2.c_s5_organ={tick(t,E){[0,4,7,12,16].forEach((d,i)=>E.fire('n'+i,250+i*250,()=>{try{voice('bell',72+d,.7,.03,audio.currentTime)}catch(e){sfx(523+d*40,.3,'triangle',.04)}}));E.fire('l',2000,()=>E.boom('#eab7ff',false));return {al:e2S(t,1600,2100),dy:(1-eOut(e2S(t,1500,2100)))*-30}},
 back(t,E,g,f){c5eWater(t<2100?.7:.7*Math.max(0,1-(t-2100)/500));for(let i=0;i<5;i++){const on=t>250+i*250;if(!on)continue;const q=eIn(e2S(t,1300,1900)),a=Math.PI*(1.15+i*.175),sx=g.x+(i-2)*70,sy=AY+40,x=lerp(sx,g.x+Math.cos(a)*20,q),y=lerp(sy,g.coreY+Math.sin(a)*12,q);e2Glow(x,y,14,'#ffb8e6',.8*f);pcirc(x,y,4,'#fff6fb',f);if(t<1300)cRing(x,y,(t-250-i*250)/20%20,'#ffb8e6',.5,1)}
  if(t>1500&&t<2600){const k=e2S(t,1500,2600);ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=(1-k)*.35;ctx.fillStyle='#eab7ff';ctx.fillRect(g.x-30,0,60,H);ctx.restore()}}};
/* 5 유리 잠항선: 어둠 속에서 탐조등이 나를 찾다가 → 소나 핑과 함께 옆에서 미끄러져 들어옴 */
ENT2.c_s5_nautilus={tick(t,E){for(let i=0;i<3;i++)E.fire('p'+i,300+i*400,()=>sfx(1800,.15,'sine',.05,1800));E.fire('l',2200,()=>E.boom('#88d8ff',false));const k=eOut(e2S(t,900,2200));return {dx:(1-k)*260,al:t<900?0:1}},
 back(t,E,g,f){c5eWater(t<2200?.8:.8*Math.max(0,1-(t-2200)/500));const bx=g.x+(1-eOut(e2S(t,900,2200)))*260-40,by=g.coreY,a=Math.atan2(P.y-by,P.x-bx)+Math.sin(t/300)*.3;if(t<2300){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.22*f;ctx.fillStyle='#fff0b0';ctx.beginPath();ctx.moveTo(bx,by);ctx.lineTo(bx+Math.cos(a-.3)*380,by+Math.sin(a-.3)*380);ctx.lineTo(bx+Math.cos(a+.3)*380,by+Math.sin(a+.3)*380);ctx.fill();ctx.restore()}for(let i=0;i<3;i++){const e=t-300-i*400;if(e>0&&e<900)cRing(bx,by,e/3,'#bff4ff',1-e/900,1)}c5eBub(t,10,g.x,W,'#cfefff',.5*f)}};
/* 6 전류의 봉합사: 칠흑 속 초록 등불 하나 → 번개가 몸의 봉합선을 따라 켜지며 아귀가 드러남 */
ENT2.c_s5_eel={tick(t,E){E.fire('z',1500,()=>{sfx(2200,.4,'sawtooth',.06,200);G.flash=.4});E.fire('l',2100,()=>E.boom('#bcff9c',false));return {al:t<1500?0:(Math.floor(t/60)%3===0&&t<2000?.3:1)}},
 back(t,E,g,f){c5eWater(t<2100?.92:.92*Math.max(0,1-(t-2100)/500));const lx=g.x-40+Math.sin(t/500)*30,ly=g.coreY-30+Math.cos(t/650)*10;if(t<1600){e2Glow(lx,ly,30,'#c8ff8a',.8);pcirc(lx,ly,3,'#f4ffd8',1)}
  if(t>1400&&t<2200){for(let k=0;k<5;k++){let px=lx,py=ly;for(let i=0;i<6;i++){const nx=px+(Math.random()-.3)*30,ny=py+(Math.random()-.2)*20;line(px,py,nx,ny,2,(x,y)=>RA(x,y,1,1,'#c8ff8a',.9));px=nx;py=ny}}}}};
/* 7 여덟 종의 집행관: 여덟 번의 종소리마다 화면이 한 칸씩 어두워지고 → 두건 처형인이 어둠에서 걸어 나옴 */
ENT2.c_s5_octopus={tick(t,E){for(let i=0;i<8;i++)E.fire('b'+i,150+i*210,()=>sfx([262,294,330,349,392,440,494,523][i],.35,'triangle',.05));E.fire('l',2100,()=>E.boom('#ffb2c4',false));return {al:e2S(t,1600,2100),dy:(1-eOut(e2S(t,1600,2200)))*14}},
 back(t,E,g,f){const n=Math.min(8,Math.floor((t-150)/210)+1);for(let i=0;i<8;i++){const x=AX+AW*i/8;RA(x,AY,AW/8,AH,'#05030a',i<n?(t<2100?.55:.55*Math.max(0,1-(t-2100)/500)):0);if(i<n&&t<2100){const bx=x+AW/16,by=AY+18;ctx.fillStyle='#d8b060';ctx.globalAlpha=f;ctx.beginPath();ctx.moveTo(bx-3,by-4);ctx.lineTo(bx+3,by-4);ctx.lineTo(bx+5,by+4);ctx.lineTo(bx-5,by+4);ctx.fill();ctx.globalAlpha=1;const e=t-150-i*210;if(e>=0&&e<500)cRing(bx,by,e/12,'#ffe6a0',1-e/500,1)}}}};
/* 8 모래시계 고래: 모래가 거꾸로(아래→위) 쏟아져 올라가고 → 거대한 고래가 위에서 천천히 가라앉아 내려옴 */
ENT2.c_s5_whale={tick(t,E){E.fire('a',100,()=>sfx(55,2,'sine',.09,40));E.fire('l',2300,()=>{E.boom('#f7d8a3',true);c5eSplash(HOME.x,HOME.y,26,'#f7d8a3')});const k=eOut(e2S(t,700,2300));return {dy:-(1-k)*180,al:t<700?0:1}},
 back(t,E,g,f){c5eWater(t<2300?.6:.6*Math.max(0,1-(t-2300)/500));for(let i=0;i<120;i++){const q=((t/1600)+i*.0831)%1,x=AX+((i*37)%AW);RA(x,AY+AH-q*AH,1,2,'#e8c890',.8*f*Math.sin(q*Math.PI))}if(t>700&&t<2400)RA(g.x-60,g.y-2,120,4,'#000',.3*e2S(t,700,2300))}};
/* 9 산호 기록관: 책장이 휘몰아쳐 하나의 책장이 되고 → 산호가 바닥에서 뻗어 자라며 형체가 됨 */
ENT2.c_s5_archive={tick(t,E){for(let i=0;i<6;i++)E.fire('p'+i,200+i*180,()=>sfx(900+i*60,.06,'triangle',.03,1300));E.fire('c',1400,()=>sfx(200,.6,'triangle',.05,400));E.fire('l',2100,()=>E.boom('#ffbd8b',false));return {al:1}},
 clip(c,t,E,g){const k=eOut(e2S(t,1300,2100)),top=g.y-(g.y-g.top+40)*k;c.rect(0,top,W,H)},
 back(t,E,g,f){c5eWater(t<2100?.6:.6*Math.max(0,1-(t-2100)/500));for(let i=0;i<30;i++){const a=i*.7+t/400,q=eIn(e2S(t,0,1500)),r=lerp(180,10,q)*(.6+(i%5)/10),x=g.x+Math.cos(a)*r,y=g.coreY+Math.sin(a)*r*.6;if(t<1600){RA(x-3,y-2,6,4,'#050b12',f);RA(x-2,y-1,5,3,i%2?'#efe2c0':'#c8b890',f)}}
  if(t>1200)for(let i=0;i<9;i++){const k=eOut(e2S(t,1200+i*40,2000)),x=g.x-40+i*10,h=k*(30+(i%3)*10);line(x,g.y,x+Math.sin(i)*6,g.y-h,2,(px,py)=>RA(px,py,2,2,i%2?'#e0503c':'#ff8a6a',f))}}};
/* 10 무음의 심장: 완전한 정적(소리 끊김) → 세 번의 거대한 수문 고리가 차례로 닫히며 → 여신상이 떠오름 */
ENT2.c_s5_heart={tick(t,E){for(let i=0;i<3;i++)E.fire('r'+i,400+i*500,()=>{sfx([196,262,392][i],1,'triangle',.08,0);G.shake=.4+i*.2});E.fire('l',2200,()=>E.boom('#a8ffe9',true));const k=eOut(e2S(t,1600,2300));return {dy:(1-k)*40,al:t<1600?0:1}},
 back(t,E,g,f){c5eWater(t<2200?.85:.85*Math.max(0,1-(t-2200)/600));for(let i=0;i<3;i++){const e=t-400-i*500;if(e<0)continue;const k=eOut(clamp(e/450,0,1)),r=lerp(260,60+i*22,k);cRing(g.x,g.coreY-10,r,i===2?'#a8ffe9':'#d8b870',f*(e<450?1:.7),3);for(let j=0;j<8;j++){const a=j*Math.PI/4+i*.2;RA(g.x+Math.cos(a)*r-2,g.coreY-10+Math.sin(a)*r-2,4,4,'#d8b870',f)}}
  if(t>1500)e2Glow(g.x,g.coreY,lerp(10,90,e2S(t,1500,2300)),'#a8ffe9',.6*f);if(t<400){ctx.font='bold 10px monospace';ctx.textAlign='center';ctx.fillStyle='#a8ffe9';ctx.globalAlpha=.6;ctx.fillText('— 정적 —',W/2,H/2);ctx.globalAlpha=1;ctx.textAlign='left'}}};
/* 스토리 전투에서도 등장 연출이 나오도록 (예전엔 스토리에서 건너뜀) */
{const _f=s5Fight;s5Fight=function(k,practice,rush){const r=_f.apply(this,arguments);try{if(G&&G.s5===k&&G.cine&&G.cine.type==='intro'&&G.cine.dur===0)G.cine.dur=3800}catch(e){}return r}}

