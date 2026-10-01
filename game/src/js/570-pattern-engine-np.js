/* ================= 새 패턴 엔진 v76: 보스별 전용 위험물 (구체 · 선분 · 사각 · 원) ================= */
/* 공통 규칙: t0~t1 예고(빨간 점선/채워지는 표시) → t1~t2 실제 판정. 좌표는 캔버스(480×300) 기준 */
const NPK={},NPS={lb:null};
function npA(){if(!G.np)G.np=[];return G.np}
function NP(o){o.dmg=o.dmg||12;o.t0=o.t0==null?o.t1-1.2:o.t0;npA().push(o);return o}
const npTel=()=>Math.max({easy:1.9,normal:1.3,hard:.95,extreme:.72}[diff]||1.2,D2().tel);
const npIn=(x,y,m)=>[clamp(x,AX+(m||10),AX+AW-(m||10)),clamp(y,AY+(m||10),AY+AH-(m||10))];
const npCol=()=>G.B.c,npAcc=()=>(G.B.pal&&G.B.pal[3])||'#ffe79a';
/* 위치 함수 도우미 */
const npLin=(x0,y0,x1,y1,b0,b1)=>b=>{const p=clamp((b-b0)/(b1-b0),0,1);return [lerp(x0,x1,p),lerp(y0,y1,p)]};
const npVel=(x0,y0,ang,spd,b0)=>b=>{const s=spd*(b-b0);return [x0+Math.cos(ang)*s,y0+Math.sin(ang)*s]};
/* 벽에 튕기는 궤적 (반사) */
function npBounce(x0,y0,ang,spd,b0,m){m=m||8;const L=AX+m,Rr=AX+AW-m,T=AY+m,Bt=AY+AH-m,W2=Rr-L,H2=Bt-T;return b=>{const s=spd*Math.max(0,b-b0);let x=x0-L+Math.cos(ang)*s,y=y0-T+Math.sin(ang)*s;x=((x%(2*W2))+2*W2)%(2*W2);y=((y%(2*H2))+2*H2)%(2*H2);if(x>W2)x=2*W2-x;if(y>H2)y=2*H2-y;return [L+x,T+y]}}
/* 판정 */
function npHit(px,py,beat,pr){for(const o of npA()){if(beat<o.t1||beat>=o.t2||o.off||o.harm===false)continue;const d=NPK[o.k].hit(o,beat,px,py,pr);if(d){G.q19HitObj=o;G.src='np:'+(o.sty||o.k);return o.dmg}}return 0}
NPK.orb={hit:(o,b,px,py,pr)=>{const [x,y]=o.pos(b);return Math.hypot(px-x,py-y)<o.r+pr*.8},
 tel(o,b,now){const p=clamp((b-o.t0)/(o.t1-o.t0),0,1),[x,y]=o.pos(o.t1);if(o.ray!=null){const bl=p>.75&&Math.floor(now/70)%2,L=(o.rayL||56)*(.4+.6*p);for(let s2=6;s2<L;s2+=5)cPx(x+Math.cos(o.ray)*s2,y+Math.sin(o.ray)*s2,2,bl?'#ffffff':'#ff4d6d',.3+.6*p);cChevron(x+Math.cos(o.ray)*L,y+Math.sin(o.ray)*L,o.ray,bl?'#ffffff':'#ff4d6d',.9,3);if(o.chg!==false)pcirc(x,y,Math.max(1,o.r*p),o.col||npCol(),.8)}else cRing(x,y,o.r+2+Math.round((1-p)*8),'#ff4d6d',.4+.5*p,2);if(o.prev){const n=o.prevN||7;for(let i=1;i<=n;i++){const u=o.t1+o.prev*i/n,[a,c]=o.pos(u),[a2,c2]=o.pos(u+.02);cChevron(a,c,Math.atan2(c2-c,a2-a),'#ff4d6d',(.35+.5*p)*(1-i/(n+2)),3)}}},
 draw(o,b,now){const [x,y]=o.pos(b);npSpr(o.sty,x,y,o.r,now,o,b)}};
NPK.seg={hit:(o,b,px,py,pr)=>{const [ax,ay]=o.a(b),[bx,by]=o.b(b);return segDist(px,py,ax,ay,bx,by)<o.w/2+pr*.8},
 tel(o,b,now){const p=clamp((b-o.t0)/(o.t1-o.t0),0,1),bl=p>.75&&Math.floor(now/70)%2,tb=o.live?b:o.t1,[ax,ay]=o.a(tb),[bx,by]=o.b(tb);line(ax,ay,bx,by,4,(x,y,i)=>{if(i%2===0)cPx(x,y,2,bl?'#ffffff':'#ff4d6d',.35+.6*p)});if(o.w>6){const nx=-(by-ay),ny=bx-ax,l=Math.hypot(nx,ny)||1;for(const s of [-1,1])line(ax+nx/l*o.w/2*s,ay+ny/l*o.w/2*s,bx+nx/l*o.w/2*s,by+ny/l*o.w/2*s,6,(x,y,i)=>{if(i%2===0)cPx(x,y,1,'#ff4d6d',.3+.4*p)})}},
 draw(o,b,now){const [ax,ay]=o.a(b),[bx,by]=o.b(b);npSegDraw(o,ax,ay,bx,by,now,b)}};
NPK.rect={hit:(o,b,px,py,pr)=>{const [x,y,w,h]=o.rf?o.rf(b):[o.x,o.y,o.w,o.h];if(o.safe)for(const [sx,sy,sr] of o.safe)if(Math.hypot(px-sx,py-sy)<sr-pr*.5)return false;return px>x-pr&&px<x+w+pr&&py>y-pr&&py<y+h+pr},
 tel(o,b,now){const p=clamp((b-o.t0)/(o.t1-o.t0),0,1),[x,y,w,h]=o.rf?o.rf(o.t1):[o.x,o.y,o.w,o.h],bl=p>.78&&Math.floor(now/70)%2;RA(Math.round(x),Math.round(y),Math.round(w),Math.round(h),'#ff4d6d',.08+.14*p+(bl?.12:0));const fh=Math.round(h*p);RA(Math.round(x),Math.round(y+h-fh),Math.round(w),fh,'#ff4d6d',.1);
  for(let i=0;i<w;i+=6){cPx(x+i,y,2,'#ff4d6d',.8);cPx(x+i,y+h,2,'#ff4d6d',.8)}for(let i=0;i<h;i+=6){cPx(x,y+i,2,'#ff4d6d',.8);cPx(x+w,y+i,2,'#ff4d6d',.8)}npSafeDraw(o,now)},
 draw(o,b,now){const [x,y,w,h]=o.rf?o.rf(b):[o.x,o.y,o.w,o.h];npRectDraw(o,Math.round(x),Math.round(y),Math.round(w),Math.round(h),now,b);npSafeDraw(o,now)}};
NPK.circ={hit:(o,b,px,py,pr)=>{const [x,y,r]=o.cf?o.cf(b):[o.x,o.y,o.r];return Math.hypot(px-x,py-y)<=r+pr*.8},
 tel(o,b,now){const p=clamp((b-o.t0)/(o.t1-o.t0),0,1),[x,y,r]=o.cf?o.cf(o.t1):[o.x,o.y,o.r],bl=p>.78&&Math.floor(now/70)%2;pcirc(x,y,r,'#ff4d6d',.08+.16*p+(bl?.14:0));pcirc(x,y,r*p,'#ff4d6d',.18);cRing(x,y,r,bl?'#ffffff':'#ff4d6d',.9,2);if(o.label){ctx.font='bold 10px monospace';ctx.textAlign='center';ctx.fillStyle='#ffffff';ctx.globalAlpha=.9;ctx.fillText(o.label,Math.round(x),Math.round(y+4));ctx.globalAlpha=1;ctx.textAlign='left'}},
 draw(o,b,now){const [x,y,r]=o.cf?o.cf(b):[o.x,o.y,o.r];npCircDraw(o,x,y,r,now,b)}};
/* 활성 모습 */
function npSegDraw(o,ax,ay,bx,by,now,b){const c=o.col||npCol(),w=Math.max(2,o.w),sty=o.sty||'laser';
 if(sty==='elec'){let px=ax,py=ay;const n=Math.max(3,Math.round(Math.hypot(bx-ax,by-ay)/14)),seed=Math.floor(now/60);for(let i=1;i<=n;i++){const u=i/n,j=i===n?0:((hash(seed+'e'+i)%9)-4)*1.6,nx=lerp(ax,bx,u)-(by-ay)/Math.hypot(bx-ax,by-ay||1)*j,ny=lerp(ay,by,u)+(bx-ax)/Math.hypot(bx-ax||1,by-ay)*j;line(px,py,nx,ny,2,(x,y)=>{cPx(x,y,3,c,.7);cPx(x,y,1,'#ffffff',1)});px=nx;py=ny}return}
 if(sty==='chain'){line(ax,ay,bx,by,5,(x,y,i)=>{cPx(x,y,4,'#2a3238',1);cPx(x,y,2,i%2?'#8a969c':'#c9d3d8',1)});return}
 if(sty==='hand'){line(ax,ay,bx,by,2,(x,y,i)=>{cPx(x,y,w,c,1);if(i%3===0)cPx(x,y,Math.max(1,w-4),'#ffffff',.8)});return}
 line(ax,ay,bx,by,2,(x,y)=>cPx(x,y,w+2,c,.35));line(ax,ay,bx,by,2,(x,y)=>cPx(x,y,w,c,1));line(ax,ay,bx,by,2,(x,y)=>cPx(x,y,Math.max(1,Math.round(w*.35)),'#ffffff',1))}
function npRectDraw(o,x,y,w,h,now,b){const c=o.col||npCol(),sty=o.sty||'plain',t=now/1000;RA(x,y,w,h,c,.42);
 if(sty==='lava'){for(let i=0;i<w;i+=4)for(let j=0;j<h;j+=4){const q=hash(i*7+j*13)%5;if(q===0)RA(x+i,y+j,2,2,'#ffe79a',.8);else if(q===1&&Math.floor(t*4+i)%2)RA(x+i,y+j,2,2,'#ff6a20',.8)}}
 else if(sty==='ice'){for(let i=0;i<w;i+=6)RA(x+i,y,1,h,'#ffffff',.25);RA(x,y,w,1,'#ffffff',.8)}
 else if(sty==='elec'){for(let k=0;k<3;k++){const yy=y+((t*90+k*h/3)%h);RA(x,yy,w,1,'#ffffff',.8)}}
 else if(sty==='light'){RA(x,y,w,h,'#ffffff',.25+.1*Math.sin(t*20))}
 RA(x,y,w,2,'#ffffff',.9);RA(x,y+h-2,w,2,'#ffffff',.5);RA(x,y,2,h,c,1);RA(x+w-2,y,2,h,c,1)}
function npSafeDraw(o,now){if(!o.safe)return;for(const [sx,sy,sr] of o.safe){pcirc(sx,sy,sr,'#1e5a3a',1);pcirc(sx,sy,sr-2,'#4fbf6a',1);cRing(sx,sy,sr,'#a6f5c6',1,1);RA(Math.round(sx-1),Math.round(sy-sr+3),2,Math.round(sr-3),'#2e7a44',1)}}
function npCircDraw(o,x,y,r,now,b){const c=o.col||npCol(),k=clamp((b-o.t1)/Math.max(.1,o.t2-o.t1),0,1);pcirc(x,y,r,c,.5*(1-k*.5));cRing(x,y,r,'#ffffff',.9*(1-k),2);if(k<.3)cRing(x,y,r*(1+k),c,1-k/.3,2)}
/* 스프라이트 (도트) */
function npSpr(sty,x,y,r,now,o,b){x=Math.round(x);y=Math.round(y);const t=now/1000,c=(o&&o.col)||npCol(),S=(a,bq,w,h,col,al)=>RA(x+a,y+bq,w,h,col,al==null?1:al);
 switch(sty){
 case 'gear':{for(let i=0;i<8;i++){const a=t*6*(o&&o.spin||1)+i*TAU/8;cPx(x+Math.cos(a)*(r+1),y+Math.sin(a)*(r+1),3,'#c9d3d8',1)}pcirc(x,y,r,'#8eda9e',1);pcirc(x,y,r*.6,'#3a5a44',1);S(-1,-1,3,3,'#ffd166');break}
 case 'spark':pcirc(x,y,r+2,c,.35);pcirc(x,y,r,c,1);S(-1,-1,3,3,'#ffffff');for(let i=0;i<3;i++){const a=hash(Math.floor(t*12)+'s'+i)%628/100;line(x,y,x+Math.cos(a)*(r+5),y+Math.sin(a)*(r+5),2,(px,py)=>cPx(px,py,1,'#ffffff',1))}break;
 case 'fire':pcirc(x,y,r+1,'#ff6a20',1);pcirc(x,y-1,r*.7,'#ffb020',1);S(-1,-2,2,2,'#fff4c8');for(let i=1;i<4;i++)cPx(x+Math.sin(t*20+i)*2,y+r+i*2,3-i*.6,'#ff6a20',.6-i*.12);break;
 case 'coal':pcirc(x,y,r,'#2a2420',1);S(-1,-1,2,2,'#ff6a20');S(1,1,1,1,'#ffb020');break;
 case 'snow':for(let i=0;i<3;i++){const a=i*Math.PI/3+t*2;line(x-Math.cos(a)*r,y-Math.sin(a)*r,x+Math.cos(a)*r,y+Math.sin(a)*r,1,(px,py)=>cPx(px,py,1,'#e8fbff',1))}pcirc(x,y,2,'#ffffff',1);break;
 case 'icicle':{for(let k=0;k<r*2;k++)RA(x-Math.max(0,Math.round((r*2-k)/3)),y-r+k,Math.max(1,Math.round((r*2-k)/1.5)),1,k<2?'#ffffff':'#a8f0ff',1);break}
 case 'drone':S(-5,-2,10,4,'#39434a');S(-4,-1,8,2,'#8a969c');S(-1,-1,2,2,Math.floor(t*8)%2?'#ff4d6d':'#ffe79a');S(-7,-4,4,1,'#c9d3d8');S(3,-4,4,1,'#c9d3d8');break;
 case 'scrap':S(-r,-r+1,r*2,r*2-2,'#5a646c');S(-r+1,-r+1,r*2-2,2,'#9aa5ad');S(-2,0,3,2,'#2a3238');break;
 case 'bird':{const f=Math.floor(t*10)%2;S(-3,-2,6,4,'#ffe7a8');S(-4,f?-4:0,3,2,'#ffd166');S(1,f?-4:0,3,2,'#ffd166');S(2,-1,2,1,'#ff9a40');S(-1,-2,1,1,'#1a1a1a');break}
 case 'light':pcirc(x,y,r+2,c,.3);pcirc(x,y,r,'#ffffff',1);cStar(x,y,r+4,c,.9);break;
 case 'crate':S(-r,-r,r*2,r*2,'#6a4a28');S(-r,-r,r*2,2,'#9a7040');S(-r,-1,r*2,2,'#3a2818');S(-1,-r,2,r*2,'#3a2818');break;
 case 'spore':pcirc(x,y,r,'#c98fe6',1);pcirc(x,y,r*.55,'#f0d8ff',1);for(let i=0;i<4;i++){const a=i*TAU/4+t*3;cPx(x+Math.cos(a)*(r+2),y+Math.sin(a)*(r+2),1,'#caff6b',1)}break;
 case 'bone':{const a=t*8;const dx=Math.cos(a)*r,dy=Math.sin(a)*r;line(x-dx,y-dy,x+dx,y+dy,1,(px,py)=>cPx(px,py,2,'#efe4cd',1));cPx(x-dx,y-dy,4,'#efe4cd',1);cPx(x+dx,y+dy,4,'#efe4cd',1);break}
 case 'egg':pcirc(x,y,r,'#f0f0d8',1);S(-1,-r+1,2,2,'#ffffff');if(o&&b>o.t2-.6&&Math.floor(t*12)%2)cRing(x,y,r+2,'#ff4d6d',1,1);break;
 case 'bee':S(-3,-2,6,4,'#ffd23a');S(-1,-2,1,4,'#1a1a1a');S(1,-2,1,4,'#1a1a1a');S(-2,Math.floor(t*20)%2?-5:-4,4,2,'#e8fbff',.8);S(3,0,2,1,'#1a1a1a');break;
 case 'crystal':for(let k=0;k<r*2;k++){const w=Math.round(r-Math.abs(k-r));RA(x-w,y-r+k,w*2+1,1,k<r?'#e0c3ff':'#9a6ad8',1)}S(-1,-r+2,1,2,'#ffffff');break;
 case 'bubble':cRing(x,y,r,'#a8e8ff',1,1);S(-Math.round(r/2),-Math.round(r/2),2,2,'#ffffff');break;
 case 'ghost':pcirc(x,y,r,'#d8d0ff',.75);S(-3,-2,2,2,'#2a1a3a');S(1,-2,2,2,'#2a1a3a');for(let i=-r;i<r;i+=3)S(i,r-1+(Math.floor(t*8+i)%2),2,2,'#d8d0ff',.75);break;
 case 'void':pcirc(x,y,r+2,c,.5);pcirc(x,y,r,'#0a0612',1);cRing(x,y,r,c,1,1);break;
 case 'bob':pcirc(x,y,r,'#b8864a',1);pcirc(x,y,r*.65,'#e0a060',1);S(-2,-Math.round(r*.6),3,2,'#fff0c8');break;
 case 'moth':{const f=Math.floor(t*14)%2;S(-1,-3,2,6,'#5a4a7a');S(-6,f?-4:-2,5,4,'#c8b8f0');S(1,f?-4:-2,5,4,'#c8b8f0');S(-4,f?-3:-1,1,1,'#ffd98a');S(3,f?-3:-1,1,1,'#ffd98a');break}
 case 'dust':for(let i=0;i<5;i++){const a=i*TAU/5+t*2;cPx(x+Math.cos(a)*r*.6,y+Math.sin(a)*r*.6,2,'#b8a8d8',.8)}cPx(x,y,3,'#e8e0ff',1);break;
 case 'weight':S(-r,-r+2,r*2,r*2-2,'#8a7a4a');S(-r+2,-r,r*2-4,2,'#b8a060');S(-r+1,-r+3,r*2-2,1,'#fff0b0');ctx.font='bold 7px monospace';ctx.textAlign='center';ctx.fillStyle='#3a2a10';ctx.fillText('t',x,y+3);ctx.textAlign='left';break;
 case 'note':S(-2,0,4,3,c);S(1,-7,1,8,c);S(2,-7,3,1,c);break;
 case 'page':S(-5,-6,10,12,'#fff6e0');S(-5,-6,10,3,'#c83a3a');for(let i=0;i<3;i++)S(-3,-1+i*2,6,1,'#8a7a5a');break;
 case 'eye':pcirc(x,y,r,'#ffffff',1);pcirc(x,y,r*.55,c,1);S(-1,-1,2,2,'#05070a');break;
 case 'steam':pcirc(x,y,r,'#c8c8c8',.85);pcirc(x-1,y-1,r*.6,'#ffffff',.9);break;
 case 'echo':cRing(x,y,r,c,1,1);cRing(x,y,Math.max(1,r-3),'#ffffff',.6,1);break;
 default:pcirc(x,y,r,c,1);S(-1,-1,2,2,'#ffffff')}}
/* 그리기 · 정리 */
function npDrawFloor(now,beat){const L=npA();if(!L.length)return;G.np=L.filter(o=>beat<o.t2+.2&&!o.dead);const dt=NPS.lb==null?0:clamp(beat-NPS.lb,0,.2);NPS.lb=beat;if(G.state==='play')for(const o of G.np)if(o.step&&beat>=o.t0&&beat<o.t2)try{o.step(o,beat,dt)}catch(e){}
 for(const o of G.np){if(beat<o.t0)continue;if(beat<o.t1){if(!o.noTel)try{NPK[o.k].tel(o,beat,now)}catch(e){}}else if(beat<o.t2&&(o.k==='rect'||o.k==='circ')){try{NPK[o.k].draw(o,beat,now)}catch(e){}}}}
function npDrawTop(now,beat){for(const o of npA()){if(beat<o.t1||beat>=o.t2||o.k==='rect'||o.k==='circ')continue;try{NPK[o.k].draw(o,beat,now)}catch(e){}}
 for(const o of npA())if(o.deco&&beat>=o.t0&&beat<o.t2)try{o.deco(o,beat,now)}catch(e){}}
{const _dr=drawRings;drawRings=function(beat){const r=_dr.apply(this,arguments);try{npDrawFloor(performance.now(),beat)}catch(e){}return r}}
{const _cd5=cfxDraw;cfxDraw=function(now,beat){const r=_cd5.apply(this,arguments);try{npDrawTop(now,beat)}catch(e){}return r}}
{const _hh=hazardHit;hazardHit=function(px,py,beat,pr,lead){const d=_hh.apply(this,arguments);if(d)return d;try{return npHit(px,py,beat,pr)}catch(e){return 0}}}
{const _cp=clearPhraseHazards;clearPhraseHazards=function(){const r=_cp.apply(this,arguments);G.np=[];return r}}
{const _fv=forceVuln;forceVuln=function(){G.np=[];return _fv.apply(this,arguments)}}
{const _sd=startDying;startDying=function(){const r=_sd.apply(this,arguments);if(G.state==='dying')G.np=[];return r}}
{const _nf=newFight;newFight=function(){const r=_nf.apply(this,arguments);G.np=[];return r}}
/* 패턴 등록 */
const NPDEF={};
function defPat(name,kr,chan,est,tip,fn){NPDEF[name]=1;MV[name]=t=>{sch(t,()=>{try{banner(kr)}catch(e){}});const r=fn(t);return typeof r==='number'?r:est};EST[name]=est;CHAN[name]=chan;SIGNAME[name]=kr;ATK_NAME[name]=kr;
 try{ATK_TIP[name]=tip;ATK_KEYOF[kr]=name;CFX_ATK.add(kr)}catch(e){}}
/* 보스 동작 도우미 */
const npWarn=(t,v)=>sch(t,()=>{G.boss.warn=v==null?1:v});
const npEye=(t,b1,end)=>sch(t,()=>{G.boss.eyeC={b0:t,b1,end}});
const npHands=(t,dur,fx,fy)=>{const g0=geo(G.B,HOME.x,HOME.y);for(const i of [0,1])tweenHand(i,g0.sh[i][0]+(i?1:-1)*(fx||24),g0.top+(fy==null?-10:fy),t,t+(dur||.8))};
const npRest=t=>idleHands(t);
const npG=()=>geo(G.B,HOME.x,HOME.y);

/* 예고 달린 탄: T0에 방향 점선이 뜨고 tf에 발사 */
function npShot(T0,tf,x,y,a,spd,o){return NP(Object.assign({k:'orb',sty:'default',r:5,t0:T0,t1:tf,t2:tf+5,pos:npVel(x,y,a,spd,tf),ray:a,rayL:56,dmg:9},o||{}))}
/* 발원 지점 충전 표시 (보스 부위가 빛남) */
function npCharge(T0,tf,xf,col,r){NP({k:'orb',harm:false,noTel:true,r:1,t0:T0,t1:tf,t2:tf+.01,pos:()=>xf(),deco:(o,b,now)=>{if(b>=o.t1)return;const p=clamp((b-o.t0)/(o.t1-o.t0),0,1),[x,y]=xf();cRing(x,y,Math.round(4+(1-p)*16),col||npCol(),.5+.5*p,2);if(p>.6)cStar(x,y,Math.round(3+p*5),'#ffffff',.8);for(let i=0;i<4;i++){const a=now/150+i*TAU/4,rr=(1-((now/400+i/4)%1))*22;cPx(x+Math.cos(a)*rr,y+Math.sin(a)*rr,2,col||npCol(),.8)}}})}

