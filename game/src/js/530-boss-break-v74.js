/* ================= 보스 파괴 v74: 체력이 깎일 때마다 장갑이 실제로 떨어져 나감 · 공격 동작(예비/돌진/반동) ================= */
const BRK={cache:new Map(),st:new WeakMap(),scr:null,tint:null};
function brkCv(w,h){const cv=document.createElement('canvas');cv.width=Math.max(1,w);cv.height=Math.max(1,h);const c=cv.getContext('2d');if(c)c.imageSmoothingEnabled=false;return [cv,c]}
function brkKey(){return G.bi+'|'+((typeof _c3Swap!=='undefined'&&_c3Swap&&_c3Swap.art)||'')+'|'+(typeof _modVer!=='undefined'?_modVer:0)}
function brkTheme(){const c3=typeof _c3Swap!=='undefined'&&_c3Swap&&_c3Swap.art;return c3?'clock':G.bi>=10?'flesh':'metal'}
/* 실루엣을 U×U 도트 칸으로 나누고, 조각(청크)으로 분할 */
function brkBuild(B){const key=brkKey();if(BRK.cache.has(key))return BRK.cache.get(key);let out=null;
 try{if(!BRK.scr){const [cv,c]=brkCv(W,H);if(!c||!c.getImageData)throw 0;BRK.scr={cv,c}}const c=BRK.scr.c,X0=240,Y0=250;c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.clearRect(0,0,W,H);drawMech(c,B,X0,Y0,0,{still:true},U);
  const d=c.getImageData(0,0,W,H).data,A=(x,y)=>(x<0||y<0||x>=W||y>=H)?0:d[(y*W+x)*4+3];
  /* 도트 격자 정렬 찾기 */
  let best=[0,0],bs=[-1,-1];for(let o=0;o<U;o++){let sx=0,sy=0;for(let y=Y0-170;y<Y0+10;y+=2)for(let x=X0-120+o;x<X0+120;x+=U){const i=(y*W+x)*4,j=(y*W+x-1)*4;if(d[i]!==d[j]||d[i+1]!==d[j+1]||d[i+3]!==d[j+3])sx++}for(let y=Y0-170+o;y<Y0+10;y+=U)for(let x=X0-120;x<X0+120;x+=2){const i=(y*W+x)*4,j=((y-1)*W+x)*4;if(d[i]!==d[j]||d[i+1]!==d[j+1]||d[i+3]!==d[j+3])sy++}if(sx>bs[0]){bs[0]=sx;best[0]=o}if(sy>bs[1]){bs[1]=sy;best[1]=o}}
  const ox=best[0],oy=best[1],I0=-26,I1=26,J0=-36,J1=4,NI=I1-I0,NJ=J1-J0,sol=new Uint8Array(NI*NJ),ix=(i,j)=>(j-J0)*NI+(i-I0),inb=(i,j)=>i>=I0&&i<I1&&j>=J0&&j<J1;
  let ns=0;for(let j=J0;j<J1;j++)for(let i=I0;i<I1;i++){let n=0;const px=X0+ox+i*U,py=Y0+oy+j*U;for(let yy=0;yy<U;yy++)for(let xx=0;xx<U;xx++)if(A(px+xx,py+yy)>100)n++;if(n>=13){sol[ix(i,j)]=1;ns++}}
  if(ns<12)throw 0;
  /* 가장자리로부터 깊이 */
  const dep=new Uint8Array(NI*NJ),q=[];for(let j=J0;j<J1;j++)for(let i=I0;i<I1;i++){if(!sol[ix(i,j)])continue;let edge=false;for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]])if(!inb(i+a,j+b)||!sol[ix(i+a,j+b)])edge=true;if(edge){dep[ix(i,j)]=1;q.push([i,j])}}
  for(let h=0;h<q.length;h++){const [i,j]=q[h],dv=dep[ix(i,j)];for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]]){const ni=i+a,nj=j+b;if(inb(ni,nj)&&sol[ix(ni,nj)]&&!dep[ix(ni,nj)]){dep[ix(ni,nj)]=dv+1;q.push([ni,nj])}}}
  const g0=geo(B,X0,Y0,U),ci=Math.round((X0-X0-ox)/U-.5),cj=Math.round((g0.coreY-Y0-oy)/U-.5),cells=[];for(let j=J0;j<J1;j++)for(let i=I0;i<I1;i++)if(sol[ix(i,j)])cells.push([i,j]);
  /* 씨앗: 코어에서 먼 곳부터 최원점 샘플링 */
  const N=Math.max(8,Math.min(18,Math.round(ns/9))),seeds=[];let far=cells[0],fd=-1;for(const c2 of cells){const dd=Math.hypot(c2[0]-ci,c2[1]-cj);if(dd>fd){fd=dd;far=c2}}seeds.push(far);
  while(seeds.length<N){let bc=null,bd=-1;for(const c2 of cells){let m=1e9;for(const s of seeds)m=Math.min(m,Math.hypot(c2[0]-s[0],c2[1]-s[1]));if(m>bd){bd=m;bc=c2}}if(!bc||bd<1.5)break;seeds.push(bc)}
  const own=new Int16Array(NI*NJ).fill(-1);for(const [i,j] of cells){let bk=0,bv=1e9;for(let k=0;k<seeds.length;k++){const v=Math.hypot(i-seeds[k][0],j-seeds[k][1])+(hash(i+','+j+','+k)%100)/100*1.6;if(v<bv){bv=v;bk=k}}own[ix(i,j)]=bk}
  let chunks=seeds.map(()=>({cells:[],cx:0,cy:0}));for(const [i,j] of cells){const k=own[ix(i,j)];chunks[k].cells.push([i,j,dep[ix(i,j)]])}
  chunks=chunks.filter(ch=>ch.cells.length);for(const ch of chunks){let sx=0,sy=0;for(const [i,j] of ch.cells){sx+=i;sy+=j}ch.cx=sx/ch.cells.length;ch.cy=sy/ch.cells.length;ch.dist=Math.hypot(ch.cx-ci,ch.cy-cj);ch.core=ch.cells.some(([i,j])=>Math.abs(i-ci)<=0&&Math.abs(j-cj)<=0)}
  if(!chunks.some(ch=>ch.core)){let m=chunks[0];for(const ch of chunks)if(ch.dist<m.dist)m=ch;m.core=true}
  const outer=chunks.filter(ch=>!ch.core).sort((a,b)=>b.dist-a.dist),L=outer.filter(ch=>ch.cx<0),Rr=outer.filter(ch=>ch.cx>=0),order=[];while(L.length||Rr.length){if(Rr.length)order.push(Rr.shift());if(L.length)order.push(L.shift())}
  order.push(chunks.find(ch=>ch.core));order.forEach((ch,k)=>{ch.id=k;ch.wire=hash('w'+k)%3});
  out={ox,oy,chunks:order,own,sol,ix,inb,NI,I0,J0,chunkOf:null};const map=new Int16Array(NI*NJ).fill(-1);order.forEach((ch,k)=>{for(const [i,j] of ch.cells)map[ix(i,j)]=k});out.map=map}catch(e){out=null}
 BRK.cache.set(key,out);return out}
function brkState(){let s=BRK.st.get(G);const key=brkKey();if(!s||s.key!==key){s={key,nb:0,brT:new Map(),deb:[],lastT:0,pv:null,trail:[],wasDash:false,dashEnd:-1e9,slamT:-1e9,slamSide:0,hs:[],beamSeen:new WeakSet(),beamT:-1e9,beamA:0,nextBrk:0,lastSp:0};BRK.st.set(G,s)}return s}
/* 조각 떼어내기 → 날아가는 파편 */
function brkCapture(c,m,ch,X,Y,full){const cs=ch.cells;let mi=1e9,mj=1e9,Mi=-1e9,Mj=-1e9;for(const [i,j] of cs){mi=Math.min(mi,i);mj=Math.min(mj,j);Mi=Math.max(Mi,i);Mj=Math.max(Mj,j)}
 const w=(Mi-mi+1)*U,h=(Mj-mj+1)*U,[cv,dc]=brkCv(w,h);if(!dc)return null;dc.fillStyle='#000';for(const [i,j] of cs)dc.fillRect((i-mi)*U,(j-mj)*U,U,U);dc.globalCompositeOperation='source-in';dc.drawImage(c.canvas,X+m.ox+mi*U,Y+m.oy+mj*U,w,h,0,0,w,h);dc.globalCompositeOperation='source-over';
 return {cv,w,h,x:X+m.ox+mi*U+w/2,y:Y+m.oy+mj*U+h/2}}
function brkBreak(s,m,k,c,X,Y,now,big){const ch=m.chunks[k];if(!ch)return;s.brT.set(k,now);const th=brkTheme(),core=[X,Y-30];
 const pieces=[];const main=brkCapture(c,m,ch,X,Y);if(main)pieces.push(main);
 const n=Math.min(5,1+Math.floor(ch.cells.length/4));for(let f=0;f<n;f++){const cc=ch.cells[(hash(k+'f'+f)%ch.cells.length)];const p=brkCapture(c,m,{cells:[cc]},X,Y);if(p){p.small=1;pieces.push(p)}}
 const dirx=Math.sign(ch.cx)||(RND()<.5?-1:1),floorY=Y+4;
 for(const p of pieces){const sp=p.small?1.4:1;s.deb.push({cv:p.cv,w:p.w,h:p.h,x:p.x,y:p.y,vx:(dirx*(50+RND()*110)+(RND()-.5)*60)*sp,vy:(-150-RND()*120)*(p.small?1.1:1)*(big?1.3:1),a:0,va:(RND()-.5)*14,fy:clamp(floorY+RND()*34,AY+20,AY+AH-6),rest:false,b:0,t:now})}
 while(s.deb.length>46){const i=s.deb.findIndex(d=>d.rest);s.deb.splice(i>=0?i:0,1)}
 const cx=X+m.ox+ch.cx*U+U/2,cy=Y+m.oy+ch.cy*U+U/2;
 if(typeof cSpark==='function'){cSpark(cx,cy,big?16:10,th==='flesh'?G.B.c:'#ffd166')}for(let i=0;i<(big?10:6);i++)G.parts.push({x:cx+(RND()-.5)*10,y:cy+(RND()-.5)*10,vx:(RND()-.5)*40,vy:-30-RND()*40,life:.8,max:.8,col:th==='flesh'?brkMix(G.B.c,'#ffffff',.5):'#6a6a6a',s:th==='flesh'?2:3,g:-30});
 G.shake=Math.max(G.shake,big?.55:.3);if(typeof cAdd==='function')cAdd({k:'brk',x:cx,y:cy,col:G.B.c,dur:620,t:now});
 if(th==='flesh'){sfx(1320,.18,'sine',.05,1320);sfx(1760,.22,'triangle',.03,1980);sfx(80,.2,'sine',.1,40)}else{sfx(1500,.05,'square',.03,700);sfx(430,.14,'square',.045,110);sfx(75,.24,'sine',.13,35)}}
/* 부서진 칸: 구멍(실루엣 변화) + 드러난 내부 + 찢긴 가장자리 */
function brkMix(a,b,k){const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));const A=p(a),Bq=p(b);return '#'+A.map((v,i)=>Math.round(v+(Bq[i]-v)*k).toString(16).padStart(2,'0')).join('')}
function brkPal(B){const th=brkTheme(),pl=B.pal||['#667','#334','#aab','#fd6'],d=pl[1],L=pl[2];
 if(th==='flesh')return {th,base:brkMix(pl[0],d,.55),a:brkMix(pl[0],d,.3),b:brkMix(pl[0],B.c,.35),gem:B.c,hi:'#ffffff',rim:brkMix(L,'#ffffff',.35),edge:brkMix(d,'#000000',.1),hot:brkMix(B.c,'#ffffff',.4)};
 if(th==='clock')return {th,base:brkMix(pl[0],d,.6),a:brkMix(d,'#6a4a24',.5),b:'#8a6430',gem:B.c,hi:'#e8c078',rim:brkMix(L,'#ffe0a0',.4),edge:brkMix(d,'#000000',.1),hot:'#ffe07a'};
 return {th,base:brkMix(pl[0],d,.6),a:brkMix(pl[0],d,.3),b:brkMix(pl[0],'#8c9aa6',.35),gem:B.c,hi:brkMix(L,'#ffffff',.3),rim:brkMix(L,'#ffffff',.25),edge:brkMix(d,'#000000',.1),hot:pl[3]||'#ffe07a'}}
function brkPaint(c,m,s,X,Y,now,B){const t=now,pal=brkPal(B),th=pal.th;
 const P1=(x,y,w,h,col,a)=>{c.globalAlpha=a==null?1:a;c.fillStyle=col;c.fillRect(x,y,w,h)};const brk=k=>k>=0&&k<s.nb;
 /* 1) 일부 가장자리는 떨어져 나가고, 안쪽은 귀여운 내부 부품(톱니 · 빛나는 코어 · 수정)이 보임 */
 for(let k=0;k<s.nb;k++){const ch=m.chunks[k];if(!ch)continue;const fl=now-(s.brT.get(k)||0)<90;
  for(const [i,j,dp] of ch.cells){const px=X+m.ox+i*U,py=Y+m.oy+j*U,h=hash(i*131+j*7919);
   if(dp<=1&&!ch.core&&h%5<2){c.clearRect(px,py,U,U);continue}
   c.globalCompositeOperation='source-atop';P1(px,py,U,U,fl?'#ffffff':pal.base);if(fl)continue;
   if((j+ch.wire)%3===0)P1(px,py+2,U,1,pal.a);
   if(th==='flesh'){if(h%9===0){P1(px+2,py,1,1,pal.gem);P1(px+1,py+1,3,2,pal.gem);P1(px+2,py+3,1,1,pal.gem);P1(px+2,py+1,1,1,pal.hi)}else if(h%7===1)P1(px+1,py+1,1,1,pal.b);
    if(h%13===0&&Math.floor(t/200+h)%4===0)P1(px+2,py+2,1,1,'#ffffff')}
   else{if(h%5===0){P1(px+1,py+2,3,1,pal.b);P1(px+2,py+1,1,3,pal.b);P1(px+2,py+2,1,1,pal.base)}else if(h%9===2)P1(px+1,py+1,1,1,pal.hi);
    if(h%8===3){const on=Math.floor(t/300+h)%3!==0;P1(px+1,py+1,3,3,brkMix(pal.base,pal.gem,on?.55:.3));if(on)P1(px+2,py+2,1,1,brkMix(pal.gem,'#ffffff',.5))}}}}
 c.globalCompositeOperation='source-atop';
 /* 2) 경계: 떨어진 장갑 가장자리에 밝은 테두리(휘어진 판) */
 for(let k=0;k<s.nb;k++){const ch=m.chunks[k];if(!ch)continue;for(const [i,j,dp] of ch.cells){const px=X+m.ox+i*U,py=Y+m.oy+j*U,gone=dp<=1&&!ch.core&&hash(i*131+j*7919)%5<2;
  for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]]){const ni=i+a,nj=j+b;if(!m.inb(ni,nj)||!m.sol[m.ix(ni,nj)])continue;const nk=m.map[m.ix(ni,nj)];if(brk(nk))continue;
   const qx=px+a*U,qy=py+b*U;
   if(a===1)P1(qx,qy,1,U,pal.edge);if(a===-1)P1(qx+U-1,qy,1,U,pal.edge);if(b===1)P1(qx,qy,U,1,pal.edge);if(b===-1)P1(qx,qy+U-1,U,1,pal.edge);
   if(!gone){if(a===1)P1(px+U-1,py,1,U,pal.rim);if(a===-1)P1(px,py,1,U,pal.rim);if(b===-1)P1(px,py,U,1,pal.rim)}
   if(Math.floor(t/160+i*3+j)%9===0){if(a)P1(qx+(a>0?1:U-2),qy+2,1,1,pal.hot);else P1(qx+2,qy+(b>0?1:U-2),1,1,pal.hot)}}}}
 c.globalCompositeOperation='source-over';c.globalAlpha=1}
/* 파편 물리 + 그리기 */
function brkDebris(s,now,air){const dt=s.lastT?clamp((now-s.lastT)/1000,0,.05):0;if(air)s.lastT=now;const old=ctx.imageSmoothingEnabled;ctx.imageSmoothingEnabled=false;
 for(const d of s.deb){if(air&&!d.rest){d.vy+=620*dt;d.x+=d.vx*dt;d.y+=d.vy*dt;d.a+=d.va*dt;if(d.x<AX+4||d.x>AX+AW-4){d.vx*=-.5;d.x=clamp(d.x,AX+4,AX+AW-4)}
   if(d.y>=d.fy&&d.vy>0){d.y=d.fy;if(d.b<1&&d.vy>120){d.vy*=-.32;d.vx*=.55;d.va*=.5;d.b++;if(G.parts)for(let i=0;i<3;i++)G.parts.push({x:d.x,y:d.y,vx:(RND()-.5)*50,vy:-20-RND()*30,life:.35,max:.35,col:'#6e6458',s:2,g:200})}else{d.rest=true;d.vx=0;d.vy=0;d.a=Math.round(d.a/(Math.PI/2))*(Math.PI/2);d.rt=now}}}
  if(d.rest&&now-d.rt>700){d.dead=1;continue}
  if(d.rest===air)continue;const qa=Math.round(d.a/(Math.PI/8))*(Math.PI/8);ctx.save();ctx.translate(Math.round(d.x),Math.round(d.y));
  if(d.rest){const f=(now-d.rt)/700;ctx.globalAlpha=f>.5&&Math.floor(now/60)%2?0:1-f*.6}
  ctx.rotate(qa);ctx.drawImage(d.cv,Math.round(-d.w/2),Math.round(-d.h/2));ctx.restore()}
 s.deb=s.deb.filter(d=>!d.dead);
 ctx.imageSmoothingEnabled=old}
/* 동작: 예비 동작 · 돌진 · 착지 · 반동 · 포효 · 피격 */
function brkPose(s,now,x,y){const b=G.boss,o={sx:1,sy:1,sk:0,ox:0,oy:0,dash:false};const pv=s.pv;s.pv={x,y,t:now};if(b.dorm||G.state!=='play'&&G.state!=='count')return o;
 const g=bgeo(),dirP=Math.sign(P.x-x)||1,dtm=pv?Math.max(8,now-pv.t):16,vx=pv?(x-pv.x)/dtm*1000:0,vy=pv?(y-pv.y)/dtm*1000:0,tr=()=>(Math.floor(now/34)%2?1:-1);
 o.sy+=.014*Math.sin(now/520);
 if(G.phase>=2&&Math.floor(now/1700)%3===0&&(now%1700)<90)o.ox+=tr();
 /* 돌진 준비: 웅크리고 뒤로 젖힘 + 발 끌기 + 떨림 */
 if(b.warn>0&&!b.dash){const w=clamp(.3+(1-b.warn)*1.0,0,1);o.sy-=.11*w;o.sx+=.08*w;o.sk+=dirP*.12*w;o.oy+=Math.round(2*w);if(w>.45)o.ox+=tr()*(w>.8?2:1);
  if(now-s.lastSp>70){s.lastSp=now;const hw=g.hf*U;for(const sd of [-1,1])G.parts.push({x:x+sd*hw*.7,y:y+1,vx:-dirP*(40+RND()*70),vy:-20-RND()*30,life:.4,max:.4,col:RND()<.5?'#6e6458':'#a89c88',s:2,g:180});if(w>.7&&typeof cSpark==='function')cSpark(x+(RND()-.5)*g.hf*U,y,1,'#ffe79a',-Math.PI/2,1.2)}}
 /* 돌진 중: 진행 방향으로 늘어나고 기울어짐 + 잔상 */
 if(b.dash){o.dash=true;const hx=Math.abs(vx)>=Math.abs(vy);if(hx){o.sx+=.16;o.sy-=.1}else{o.sy+=.12;o.sx-=.07}o.sk-=Math.sign(vx||1)*.18;s.trail.push({x,y});if(s.trail.length>8)s.trail.shift();
  if(now-s.lastSp>40){s.lastSp=now;G.parts.push({x:x+(RND()-.5)*g.hf*U,y:y+1,vx:-vx*.15+(RND()-.5)*30,vy:-30-RND()*40,life:.45,max:.45,col:'#8a8478',s:3,g:120})}}else if(s.trail.length)s.trail.shift();
 if(s.wasDash&&!b.dash){s.dashEnd=now;if(typeof cDust==='function')cDust(x,y,16,160)}s.wasDash=!!b.dash;
 {const d=now-s.dashEnd;if(d<280){const k=1-d/280;o.sy-=.2*k;o.sx+=.14*k;o.oy+=Math.round(2*k)}}
 /* 손: 내려찍기 착지 → 몸이 눌림, 손을 치켜들면 몸도 따라 젖혀짐, 포격 반동 */
 b.hands.forEach((h,i)=>{const was=s.hs[i];if(h.stuck&&!was){s.slamT=now;s.slamSide=Math.sign(h.x-x)||1}s.hs[i]=!!h.stuck;
  if(!h.stuck&&h.y<g.top-8&&h.mode!=='idle'){const sd=Math.sign(h.x-x)||1;o.sy+=.05;o.sk-=sd*.05}
  if(h.kick>0)o.ox-=Math.round(dirP*2.5*h.kick);if(h.charge>0)o.ox+=Math.floor(now/40)%2?1:0});
 {const d=now-s.slamT;if(d<260){const k=1-d/260;o.sy-=.09*k;o.sx+=.05*k;o.sk-=s.slamSide*.08*k;o.oy+=Math.round(3*k)}}
 /* 눈 레이저: 차오를 때 몸을 일으킴, 조준 고정 시 떨림, 발사 반동 */
 if(b.eyeC&&b.eye>0){o.sy+=.05*b.eye;o.oy-=Math.round(b.eye)}if(b.lock)o.ox+=tr();
 for(const bm of G.beams){if(s.beamSeen.has(bm)||G.beat<bm.t1)continue;s.beamSeen.add(bm);if(Math.abs(bm.ox-g.x)<30&&Math.abs(bm.oy-g.headY)<40){s.beamT=now;s.beamA=bm.a0||0}}
 {const d=now-s.beamT;if(d<320){const k=1-d/320;o.ox-=Math.round(Math.cos(s.beamA)*4*k);o.oy-=Math.round(Math.sin(s.beamA)*2*k);o.sy-=.06*k}}
 /* 공격 선언(포효): 몸을 크게 일으켰다 떨며 내려옴 */
 if(typeof CFX!=='undefined'){let rt=-1e9;for(const e of CFX.ev)if(e.k==='roar')rt=Math.max(rt,e.t);const d=now-rt;if(d>=0&&d<520){const up=d<110?d/110:d<380?1:1-(d-380)/140;o.sy+=.09*up;o.sx-=.04*up;if(d>110&&d<380)o.ox+=tr()}}
 /* 피격 움찔 */
 if(typeof IMP!=='undefined'){const d=now-IMP.t;if(d>=0&&d<150){const k=(1-d/150)*Math.min(1.4,IMP.k);o.sy-=.05*k;o.sx+=.035*k}}
 if(G.vuln&&b.slump>.1){o.sy-=.05*b.slump;o.sk+=Math.sin(now/280)*.035*b.slump}
 o.sx=clamp(o.sx,.8,1.25);o.sy=clamp(o.sy,.78,1.22);o.sk=clamp(o.sk,-.26,.26);return o}
function brkTint(cv,col){if(!BRK.tint){const [c2,cx2]=brkCv(W,H);BRK.tint={cv:c2,c:cx2}}const t=BRK.tint.c;t.globalCompositeOperation='source-over';t.globalAlpha=1;t.clearRect(0,0,W,H);t.drawImage(cv,0,0);t.globalCompositeOperation='source-in';t.fillStyle=col;t.fillRect(0,0,W,H);t.globalCompositeOperation='source-over';return BRK.tint.cv}
function brkBlit(cv,x,y,o){const X=Math.round(x),Y=Math.round(y);ctx.translate(X+Math.round(o.ox),Y+Math.round(o.oy));ctx.transform(o.sx,0,o.sk,o.sy,0,0);ctx.translate(-X,-Y);ctx.drawImage(cv,0,0)}
function drawBossDamaged(B,x,y,now,bo){if(G.omega&&G.revForm==='mutant'){drawMutant(ctx,x,y,now,bo,U);return}if(G.omega&&G.bi===OMEGA_BI){drawOmegaTrue(ctx,x,y,now,bo,U);return}
 const c=dmgCanvas();if(!c){drawMech(ctx,B,x,y,now,bo,U);return}
 const m=brkBuild(B),s=brkState(),X=Math.round(x),Y=Math.round(y);
 c.setTransform(1,0,0,1,0,0);c.globalCompositeOperation='source-over';c.globalAlpha=1;c.clearRect(0,0,W,H);drawMech(c,B,x,y,now,bo,U);
 if(m){const n=m.chunks.length,outer=n-1,r=clamp(G.hp/G.maxHp,0,1);let tgt=Math.min(outer,Math.floor((1-r)*outer*.62+.35+(G.phase||0)*.3));
  if(G.state==='dying'){const t=now-G.dyingAt;tgt=Math.min(n,s.nb+(t>300?1:0));if(t<300)tgt=Math.min(tgt,s.nb)}
  if(G.state==='wake'||G.state==='count')tgt=s.nb;
  if(tgt>s.nb&&now>=s.nextBrk){const k=s.nb;brkBreak(s,m,k,c,X,Y,now,G.state==='dying'||k===n-1);s.nb++;s.nextBrk=now+(G.state==='dying'?170:130)}
  if(s.nb>0){brkPaint(c,m,s,X,Y,now,B);
   /* 부서진 곳에서 새는 불꽃 · 연기 */
   if(G.state==='play'&&RND()<.06+s.nb*.012){const ch=m.chunks[Math.floor(RND()*s.nb)];if(ch){const [i,j]=ch.cells[Math.floor(RND()*ch.cells.length)],px=X+m.ox+i*U+2,py=Y+m.oy+j*U+2;if(brkTheme()==='flesh')G.parts.push({x:px,y:py,vx:(RND()-.5)*20,vy:-30,life:.7,max:.7,col:RND()<.5?'#ffffff':G.B.c,s:1,g:-10});else if(RND()<.5&&typeof cSpark==='function')cSpark(px,py,2,'#ffe36b');else G.parts.push({x:px,y:py,vx:(RND()-.5)*12,vy:-25,life:.9,max:.9,col:'#4a4a4a',s:3,g:-20})}}}}
 brkDebris(s,now,false);
 const o=brkPose(s,now,x,y);ctx.save();ctx.imageSmoothingEnabled=false;
 if(o.dash&&s.trail.length>2){const tc=brkTint(_dmgCv,G.B.c),a0=ctx.globalAlpha;for(let i=0;i<s.trail.length-1;i+=2){const p=s.trail[i];ctx.save();ctx.globalAlpha=a0*(.12+i*.04);brkBlit(tc,p.x,p.y,o);ctx.restore()}ctx.globalAlpha=a0}
 brkBlit(_dmgCv,x,y,o);ctx.restore()}
/* 날아가는 파편은 모든 것 위에 */
{const _cd=cfxDraw;cfxDraw=function(now,beat){const r=_cd.apply(this,arguments);try{const s=BRK.st.get(G);if(s)brkDebris(s,now,true)}catch(e){}return r}}
{const _ev=cfxDraw;cfxDraw=function(now,beat){const r=_ev.apply(this,arguments);for(const e of CFX.ev){if(e.k!=='brk')continue;const k=clamp((now-e.t)/e.dur,0,1);if(k<.25)cStar(e.x,e.y,Math.round(12*(1-k/.25))+2,'#ffffff',1);if(k<.5)cRing(e.x,e.y,6+k*60,'#ffffff',(.5-k)*2,2);
  const y=Math.round(e.y-18-k*14);ctx.globalAlpha=k>.7?(1-k)/.3:1;ctx.font='900 10px monospace';ctx.textAlign='center';ctx.lineWidth=3;ctx.lineJoin='miter';ctx.strokeStyle='#05070a';ctx.strokeText('BREAK!',e.x,y);ctx.fillStyle=Math.floor(now/60)%2?'#ffffff':'#ffd23a';ctx.fillText('BREAK!',e.x,y);ctx.globalAlpha=1;ctx.textAlign='left';ctx.lineWidth=1}return r}}
/* 각성(3페이즈) 표현 정리: 몸에 그어지던 주황 균열 · 붉은/검은 얼룩 대신, 보스 색 반짝이만 */
function drawAwakenAura(now,back){if(G.omega||G.phase<2||G.state==='dying'||G.boss.dorm)return;const g=bgeo(),t=now/1000,hw=g.hf*U,top=g.top,bot=g.y,c=G.B.c;
 if(back){for(let i=0;i<12;i++){const q=((t*.6)+i/12)%1,x=g.x+Math.sin(i*2.7)*hw*1.2,y=bot-q*(bot-top+30);cPx(x,y,2,i%3?c:'#ffffff',.7*(1-q))}return}
 for(let i=0;i<3;i++){const a=t*1.5+i*TAU/3,x=g.x+Math.cos(a)*hw*1.1,y=g.coreY+Math.sin(a)*hw*.5;if(Math.floor(t*4+i)%3)cStar(x,y,2,'#ffffff',.8)}}
{const _bf2=bossFXFront;bossFXFront=function(now,g,ph){if(G.bi>=10){if(ph<1)return;const t=now/1000,c=G.B.c;for(let i=0;i<6;i++){const a=i*TAU/6+t*.7,rr=g.hf*U*1.15;cPx(g.x+Math.cos(a)*rr,g.coreY+Math.sin(a)*rr*.8-((t*30+i*13)%18),2,c,.6)}return}return _bf2.apply(this,arguments)}}

