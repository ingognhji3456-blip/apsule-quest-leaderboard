/* ================= 챕터 5 ABYSS 공격 패턴 v32 — 몸의 부위에서 나오고, 반드시 예고 먼저 =================
   보스 10 × 4 = 40 패턴. 모든 공격은 준비 동작(G.s5act) → 예고 → 실제 판정 순서. 흐름은 다른 챕터와 같은 '회피 → 그로기 → 반격' */
const c5T=()=>Math.max(1.25,npTel()),c5S=()=>{try{return D2().sp}catch(e){return 1}};
function c5Cur(){return G.s5!=null?G.s5:(G._s5hold!=null?G._s5hold:0)}
function c5W(T0,T1,n){sch(T0,()=>{G.s5act={n,ph:'w',at:performance.now()}});sch(T1,()=>{G.s5act={n,ph:'s',at:performance.now()}})}
function c5Snd(t,f,len,type,f2,g){sch(t,()=>{try{sfx(f,len||.12,type||'square',g||.05,f2||f*.5)}catch(e){}})}
function c5Shake(t,v){sch(t,()=>{G.shake=Math.max(G.shake||0,v)})}
const c5Col=()=>(S5[c5Cur()]||{}).c||'#9de8dc';
const c5P=(ax,ay)=>()=>c5Pt(ax,ay);
/* ---------- 스프라이트 ---------- */
const C5SPR={
 shell(x,y,r,t,c,a){n4G(x,y,r*2.4,'#ffd06a',.35);const s=Math.sin(t*9)*.5+.5;pcirc(x,y,r+1,'#1a1010',1);pcirc(x,y,r,'#e8d8b0',1);for(let i=-2;i<=2;i++){const q=i/2.4;line(x,y+r*.7,x+q*r*1.6,y-r*.8,1,(px,py)=>cPx(px,py,1,'#a8906a',1))}RA(x-1,y-1,2,2,'#ffffff',.8);if(s>.5)RA(x-r,y+r-1,r*2,1,'#ff9a5a',.8)},
 pearl(x,y,r,t,c){n4G(x,y,r*3,'#ffb8e6',.5);pcirc(x,y,r+1,'#2a1030',1);pcirc(x,y,r,'#fff6fb',1);pcirc(x+r*.3,y+r*.3,r*.45,'#ffc8ea',.8);RA(x-r*.45,y-r*.45,Math.max(1,r*.4),Math.max(1,r*.4),'#ffffff',1)},
 dart(x,y,r,t,c,a){const ca=Math.cos(a),sa=Math.sin(a),nx=-sa,ny=ca,P=(u,v)=>[x+ca*u+nx*v,y+sa*u+ny*v];ctx.fillStyle='#1a1410';ctx.beginPath();ctx.moveTo(...P(r*1.6,0));ctx.lineTo(...P(-r,r*1.1));ctx.lineTo(...P(-r*.5,0));ctx.lineTo(...P(-r,-r*1.1));ctx.closePath();ctx.fill();ctx.fillStyle='#efe2c0';ctx.beginPath();ctx.moveTo(...P(r*1.3,0));ctx.lineTo(...P(-r*.8,r*.9));ctx.lineTo(...P(-r*.4,0));ctx.closePath();ctx.fill();ctx.fillStyle='#c8b68c';ctx.beginPath();ctx.moveTo(...P(r*1.3,0));ctx.lineTo(...P(-r*.8,-r*.9));ctx.lineTo(...P(-r*.4,0));ctx.closePath();ctx.fill();line(...P(-r*2.6,0),...P(-r*.6,0),2,(px,py)=>cPx(px,py,1,'#d4403c',.8))},
 torp(x,y,r,t,c,a){const ca=Math.cos(a),sa=Math.sin(a);for(let i=1;i<6;i++){cPx(x-ca*(r+i*3)+Math.sin(t*20+i)*1.2,y-sa*(r+i*3),2-i*.25,'#cfefff',.7-i*.12)}line(x-ca*r*1.4,y-sa*r*1.4,x+ca*r*1.4,y+sa*r*1.4,1,(px,py)=>cPx(px,py,r*1.1,'#0a1420',1));line(x-ca*r*1.2,y-sa*r*1.2,x+ca*r*1.2,y+sa*r*1.2,1,(px,py)=>cPx(px,py,r*.75,'#6a7a88',1));pcirc(x+ca*r*1.2,y+sa*r*1.2,r*.45,Math.floor(t*10)%2?'#ff5a3a':'#ffd06a',1);n4G(x+ca*r*1.2,y+sa*r*1.2,r*2,'#ff7a4a',.4)},
 barrel(x,y,r,t,c){RA(x-r-1,y-r-1,r*2+2,r*2+2,'#050b12',1);RA(x-r,y-r,r*2,r*2,'#5a4a3a',1);RA(x-r,y-r+2,r*2,1,'#2a2018',1);RA(x-r,y+r-3,r*2,1,'#2a2018',1);RA(x-r,y-r,1,r*2,'#8a7a5a',1);const on=Math.floor(t*6)%2;pcirc(x,y-r-1,1.5,on?'#ff4a3a':'#5a1a14',1);if(on)n4G(x,y-r-1,6,'#ff4a3a',.6)},
 spark(x,y,r,t,c){n4G(x,y,r*3,'#c8ff8a',.6);pcirc(x,y,r,'#c8ff8a',1);pcirc(x,y,r*.5,'#ffffff',1);for(let i=0;i<3;i++){const a=hash(Math.floor(t*14)+'c5'+i)%628/100;line(x,y,x+Math.cos(a)*(r+5),y+Math.sin(a)*(r+5),2,(px,py)=>cPx(px,py,1,'#f4ffd8',1))}},
 bell(x,y,r,t,c){n4G(x,y,r*2.6,'#ffe6a0',.35);const sw=Math.sin(t*10)*1.2;ctx.fillStyle='#050b12';ctx.beginPath();ctx.moveTo(x-r*.5+sw*.3,y-r);ctx.lineTo(x+r*.5+sw*.3,y-r);ctx.lineTo(x+r+sw,y+r*.8);ctx.lineTo(x-r+sw,y+r*.8);ctx.closePath();ctx.fill();ctx.fillStyle='#b8883a';ctx.beginPath();ctx.moveTo(x-r*.35+sw*.3,y-r+1);ctx.lineTo(x+r*.35+sw*.3,y-r+1);ctx.lineTo(x+r*.8+sw,y+r*.6);ctx.lineTo(x-r*.8+sw,y+r*.6);ctx.closePath();ctx.fill();RA(x-r*.6+sw,y-r*.2,1,r*.6,'#f0d080',1);pcirc(x+sw,y+r,1.4,'#6a4a1a',1)},
 sand(x,y,r,t,c){n4G(x,y,r*2,'#e8c890',.3);for(let i=0;i<6;i++){const a=i*2.1+t*3,d=r*.6*(i%3)/2;cPx(x+Math.cos(a)*d,y+Math.sin(a)*d,2,i%2?'#e8c890':'#fff0c0',1)}pcirc(x,y,r*.55,'#c8a060',1)},
 page(x,y,r,t,c,a){const f=Math.sin(t*12+x*.3);RA(x-r,y-r*.8,r*2,r*1.6,'#050b12',1);RA(x-r+1,y-r*.8+1,r*2-2,r*1.6-2,f>0?'#efe2c0':'#c8b890',1);for(let i=0;i<3;i++)RA(x-r+2,y-r*.4+i*2,r*2-4,1,'#3a3a5a',.7);n4G(x,y,r*2,'#fff0c0',.25)},
 ink(x,y,r,t,c){pcirc(x,y,r+1,'#050b12',1);pcirc(x,y,r,'#1c1e4a',1);pcirc(x-r*.3,y-r*.3,r*.35,'#5a6ad8',.9);n4G(x,y,r*2,'#4a5ad8',.35)},
 note(x,y,r,t,c){n4G(x,y,r*2.4,c,.4);pcirc(x-1,y+2,r*.7,'#050b12',1);pcirc(x-1,y+2,r*.55,c,1);RA(x+r*.3,y-r*1.4,1.4,r*1.9,c,1);RA(x+r*.3,y-r*1.4,r,1.4,c,1)},
 anchorP(x,y,r,t,c,a){const s=Math.sin(t*14);line(x,y-r,x,y+r,1,(px,py)=>cPx(px,py,3,'#050b12',1));line(x,y-r,x,y+r,1,(px,py)=>cPx(px,py,2,'#8a9096',1));line(x-r*.7,y-r*.5,x+r*.7,y-r*.5,1,(px,py)=>cPx(px,py,2,'#7a3a22',1));for(const sd of [-1,1])line(x,y+r,x+sd*r,y+r*.3,1,(px,py)=>cPx(px,py,2,'#8a9096',1));n4G(x,y,r*2,'#5ef0e0',.3+.2*s)},
 lure(x,y,r,t,c){n4G(x,y,r*4,'#c8ff8a',.7);pcirc(x,y,r,'#c8ff8a',1);pcirc(x,y,r*.5,'#ffffff',1)},
 coral(x,y,r,t,c){line(x,y+r,x,y-r,1,(px,py)=>cPx(px,py,2.4,'#8a2a22',1));line(x,y-r*.2,x-r*.6,y-r*.8,1,(px,py)=>cPx(px,py,1.6,'#e0503c',1));line(x,y,x+r*.6,y-r*.6,1,(px,py)=>cPx(px,py,1.6,'#e0503c',1));pcirc(x,y-r,1.4,'#ff8a6a',1)},
 gem(x,y,r,t,c){n4G(x,y,r*3,'#a8ffe9',.5);ctx.fillStyle='#050b12';ctx.beginPath();ctx.moveTo(x,y-r-1);ctx.lineTo(x+r+1,y);ctx.lineTo(x,y+r+1);ctx.lineTo(x-r-1,y);ctx.closePath();ctx.fill();ctx.fillStyle='#4ad0c0';ctx.beginPath();ctx.moveTo(x,y-r);ctx.lineTo(x+r,y);ctx.lineTo(x,y+r);ctx.lineTo(x-r,y);ctx.closePath();ctx.fill();RA(x-1,y-r*.5,1,r*.6,'#d0fff4',1)}};
{const _sp=npSpr;npSpr=function(sty,x,y,r,now,o,b){const f=C5SPR[sty];if(!f)return _sp.apply(this,arguments);x=Math.round(x);y=Math.round(y);try{f(x,y,r,now/1000,(o&&o.col)||'#ffffff',o&&o.pos?n4Dir(o,b):0)}catch(e){}}}
/* 선 모양 */{const _sd=npSegDraw;npSegDraw=function(o,ax,ay,bx,by,now,b){const s=o.sty,t=now/1000,w=Math.max(2,o.w),L=Math.hypot(bx-ax,by-ay)||1,ux=(bx-ax)/L,uy=(by-ay)/L;
 if(s==='c5beam'){line(ax,ay,bx,by,2,(x,y)=>cPx(x,y,w+6,'#ffd06a',.16));line(ax,ay,bx,by,2,(x,y)=>cPx(x,y,w,'#ffe6a0',.75));line(ax,ay,bx,by,2,(x,y)=>cPx(x,y,Math.max(1,w*.35),'#ffffff',1));for(let i=0;i<5;i++){const q=((t*.8+i/5)%1);cPx(ax+ux*L*q+Math.sin(t*9+i)*2,ay+uy*L*q,2,'#ffffff',.7)}return}
 if(s==='c5chain'){let i=0;line(ax,ay,bx,by,5,(x,y)=>{i++;cRing(x,y,3,'#050b12',1,2);cRing(x,y,2.4,i%2?'#8a9096':'#b8c0c8',1,1)});return}
 if(s==='c5thread'){line(ax,ay,bx,by,2,(x,y)=>cPx(x,y,w+2,'#d4403c',.25));line(ax,ay,bx,by,2,(x,y,i)=>cPx(x,y,Math.max(2,w*.5),i%4<2?'#ff5a50':'#a82a26',1));return}
 if(s==='c5stitch'){line(ax,ay,bx,by,2,(x,y)=>cPx(x,y,w+3,'#c8ff8a',.22));line(ax,ay,bx,by,2,(x,y)=>cPx(x,y,w*.5,'#ffcf8a',1));let i=0;line(ax,ay,bx,by,6,(x,y)=>{i++;line(x-uy*w,y+ux*w,x+uy*w,y-ux*w,1,(px,py)=>cPx(px,py,1,i%2?'#f4ffd8':'#c8884a',1))});return}
 if(s==='c5tent'){const n=Math.max(4,Math.round(L/8));let px=ax,py=ay;for(let i=1;i<=n;i++){const q=i/n,j=Math.sin(q*9+t*6)*3,x=ax+ux*L*q-uy*j,y=ay+uy*L*q+ux*j;line(px,py,x,y,2,(qx,qy)=>{cPx(qx,qy,w+2,'#2a1040',1);cPx(qx,qy,w,'#b07ad8',1)});if(i%2===0)pcirc(x,y,1.5,'#fff0ff',1);px=x;py=y}return}
 if(s==='c5sonar'){line(ax,ay,bx,by,3,(x,y)=>cPx(x,y,w,'#8ae8ff',.3));line(ax,ay,bx,by,3,(x,y,i)=>{if(i%3===0)cPx(x,y,2,'#e8fbff',1)});return}
 if(s==='c5water'){line(ax,ay,bx,by,2,(x,y)=>cPx(x,y,w+4,'#2a8ac8',.3));line(ax,ay,bx,by,2,(x,y)=>cPx(x,y,w,'#6ad0f0',.85));line(ax,ay,bx,by,2,(x,y,i)=>{if((i+Math.floor(t*20))%5===0)cPx(x+Math.sin(i)*w*.3,y,2,'#ffffff',1)});return}
 return _sd.apply(this,arguments)}}
/* 바닥 모양 */{const _rd=npRectDraw;npRectDraw=function(o,x,y,w,h,now,b){const s=o.sty,t=now/1000;
 if(s==='c5water'){RA(x,y,w,h,'#1a6aa8',.5);for(let i=0;i<w;i+=6){const k=Math.sin(i*.25+t*6);RA(x+i,y+(k>0?1:3),4,2,'#8ae8ff',.7)}for(let j=6;j<h;j+=8)RA(x+((j*7+Math.floor(t*30))%Math.max(1,w)),y+j,3,1,'#ffffff',.6);RA(x,y,w,2,'#e8fbff',.8);return}
 if(s==='c5sand'){RA(x,y,w,h,'#c8a060',.45);for(let i=0;i<w;i+=3)for(let j=((t*40)|0)%6;j<h;j+=6)cPx(x+i+((j*3)%3),y+j,1,(i+j)%2?'#fff0c0':'#e8c890',.9);RA(x,y,w,1,'#fff0c0',.8);return}
 if(s==='c5paper'){RA(x,y,w,h,'#e8dcc0',.4);for(let i=0;i<w;i+=10)RA(x+i,y,1,h,'#3a5566',.35);for(let j=0;j<h;j+=10)RA(x,y+j,w,1,'#3a5566',.35);RA(x,y,w,2,'#ffffff',.8);RA(x,y+h-2,w,2,'#d4403c',.7);return}
 if(s==='c5ink'){RA(x,y,w,h,'#12142e',.6);for(let i=0;i<w;i+=5)RA(x+i,y+h-3-Math.abs(Math.sin(i+t*4))*4,3,3,'#4a5ad8',.6);RA(x,y,w,1,'#8a9aff',.7);return}
 if(s==='c5shock'){RA(x,y,w,h,'#a8ffe9',.3+.1*Math.sin(t*20));RA(x,y,w,2,'#ffffff',.9);RA(x,y+h-2,w,2,'#ffffff',.6);return}
 if(s==='c5bellz'){RA(x,y,w,h,'#d8b060',.35);for(let i=4;i<w;i+=12)for(let j=4;j<h;j+=12)cPx(x+i,y+j,2,'#fff0c0',.7);RA(x,y,w,2,'#ffe6a0',.9);return}
 return _rd.apply(this,arguments)}}
{const _cd=npCircDraw;npCircDraw=function(o,x,y,r,now,b){const s=o.sty;if(!s||!s.startsWith('c5'))return _cd.apply(this,arguments);const t=now/1000,k=clamp((b-o.t1)/Math.max(.1,o.t2-o.t1),0,1);
 if(s==='c5splash'){pcirc(x,y,r,'#6ad0f0',.45*(1-k*.5));cRing(x,y,r*(1+k*.4),'#e8fbff',1-k,2);for(let i=0;i<8;i++){const a=i*TAU/8+t;cPx(x+Math.cos(a)*r*(.6+k*.6),y+Math.sin(a)*r*(.6+k*.6)-k*6,2,'#ffffff',1-k)}return}
 if(s==='c5crush'){pcirc(x,y,r,'#c8583e',.5*(1-k*.4));cRing(x,y,r,'#ffe0c0',1-k,3);for(let i=0;i<6;i++){const a=i*TAU/6;line(x,y,x+Math.cos(a)*r*(.5+k*.5),y+Math.sin(a)*r*(.5+k*.5),2,(px,py)=>cPx(px,py,1,'#fff0d0',1-k))}return}
 if(s==='c5bell'){pcirc(x,y,r,'#d8b060',.45*(1-k*.5));for(let i=0;i<3;i++)cRing(x,y,r*(.4+i*.3+k*.4),'#ffe6a0',(1-k)*(1-i*.25),2);return}
 if(s==='c5ink'){pcirc(x,y,r,'#12142e',.7);pcirc(x,y,r*.7,'#1c1e4a',.8);for(let i=0;i<6;i++){const a=i*1.1+t;pcirc(x+Math.cos(a)*r*.8,y+Math.sin(a)*r*.8,2,'#4a5ad8',.7)}cRing(x,y,r,'#8a9aff',.8,1);return}
 if(s==='c5coral'){pcirc(x,y,r,'#e0503c',.35);for(let i=0;i<5;i++){const a=-Math.PI/2+(i-2)*.45,L=r*(1.1-Math.abs(i-2)*.15)*(k<.2?k/.2:1);line(x,y+r*.4,x+Math.cos(a)*L,y+r*.4+Math.sin(a)*L,1,(px,py)=>cPx(px,py,2.2,i%2?'#ff8a6a':'#e0503c',1))}return}
 if(s==='c5elec'){pcirc(x,y,r,'#c8ff8a',.35*(1-k*.5));cRing(x,y,r,'#f4ffd8',1-k,2);for(let i=0;i<5;i++){const a=hash(Math.floor(t*14)+'q'+i)%628/100;line(x,y,x+Math.cos(a)*r,y+Math.sin(a)*r,2,(px,py)=>cPx(px,py,1,'#ffffff',1))}return}
 if(s==='c5gold'){pcirc(x,y,r,'#a8ffe9',.4*(1-k*.5));cRing(x,y,r,'#fff2c0',1-k,3);cRing(x,y,r*(1+k*.5),'#a8ffe9',(1-k)*.6,2);return}
 return _cd.apply(this,arguments)}}
/* 링: 가운데서 퍼지는 탄 고리 (틈 있음) */function c5RingShot(T0,tf,x,y,n,spd,gapA,gapW,sty,r,rayL){for(let i=0;i<n;i++){const a=i*TAU/n+(gapA||0)*0;if(gapA!=null&&Math.abs(((a-gapA+Math.PI*3)%TAU)-Math.PI)<(gapW||.5))continue;NP({k:'orb',sty,r:r||5,t0:T0,t1:tf,t2:tf+6,pos:npVel(x,y,a,spd,tf),ray:a,rayL:rayL||12,dmg:10})}}
/* 포물선 투척: from → to, 착탄 시각 T1 */function c5Lob(T0,T1,from,to,sty,r,h){return NP({k:'orb',sty,r:r||5,noTel:true,harm:false,t0:T0,t1:T0,t2:T1,pos:b=>{const [x0,y0]=typeof from==='function'?from():from,p=clamp((b-T0)/(T1-T0),0,1);return [lerp(x0,to[0],p),lerp(y0,to[1],p)-Math.sin(p*Math.PI)*(h||60)]},dmg:0})}

/* ═════════ 1. 등대 껍질게 ═════════ */
defPat('beamSweep','등대 탐조광','head',9,'등대 꼭대기 등불이 눈처럼 나를 보다가 긴 빛줄기로 쓸어감 → 빛이 도는 반대쪽으로 크게 돌아 들어가기',t=>{const tel=c5T(),dur=2.6/Math.max(.8,c5S()),n=G.phase>=1?2:1;
 for(let k=0;k<n;k++){const T0=t+k*(dur+.8),T1=T0+tel;c5W(T0,T1+dur,'beamSweep');sch(T0,()=>{const L=c5P(0,-43),[lx,ly]=L(),a0=Math.atan2(P.y-ly,P.x-lx),dir=(k%2?-1:1)*(P.x<lx?-1:1),span=2;const A=b=>a0-dir*span/2+dir*span*clamp((b-T1)/dur,0,1);
  NP({k:'seg',sty:'c5beam',w:12,live:true,t0:T0,t1:T1,t2:T1+dur,a:L,b:b=>{const [x,y]=L(),a=A(b);return [x+Math.cos(a)*420,y+Math.sin(a)*420]},dmg:12,deco:(o,b,now)=>{if(b>=o.t1)return;const [x,y]=L(),a=A(o.t1);for(let i=1;i<6;i++)cChevron(x+Math.cos(a+dir*.2*i)*80,y+Math.sin(a+dir*.2*i)*80,a+dir*.2*i+dir*Math.PI/2,'#ff4d6d',.8,3)}})});c5Snd(T1,1200,.5,'triangle',300,.05)}
 return n*(dur+.8)+tel});
defPat('clawPincer','부수개 집게','hands',8,'렌즈 집게가 크게 벌어졌다가 내 자리를 위아래로 물어 버림 → 가로 띠에서 벗어나고, 부서진 파편은 틈으로',t=>{const tel=c5T(),n=2+Math.min(1,G.phase);
 for(let k=0;k<n;k++){const T0=t+k*1.5,T1=T0+tel;c5W(T0,T1,'clawPincer');sch(T0,()=>{const y=clamp(P.y,AY+20,AY+AH-20),x=clamp(P.x,AX+40,AX+AW-40),gap=34,cl=.35;
  NP({k:'rect',sty:'plain',col:'#c8583e',t0:T0,t1:T1+cl,t2:T1+cl+.3,x:AX,y:y-12,w:AW,h:24,dmg:12,deco:(o,b,now)=>{if(b>o.t2)return;const q=clamp((b-T0)/(T1+cl-T0),0,1),e=q*q*q,gy=40*(1-e)+12;for(const s of [-1,1]){const yy=y+s*gy;RA(AX,yy-(s<0?8:0),AW,8,'#050b12',.55);for(let xx=AX;xx<AX+AW;xx+=10){ctx.fillStyle='#e8cdb0';ctx.beginPath();ctx.moveTo(xx,yy);ctx.lineTo(xx+10,yy);ctx.lineTo(xx+5,yy-s*6);ctx.closePath();ctx.fill()}RA(AX,yy-(s<0?8:0),AW,2,'#c8583e',.9)}}});c5Shake(T1+cl,.4);c5Snd(T1+cl,120,.2,'square',60,.08);
  sch(T1+cl,()=>{for(let i=0;i<6;i++){const a=i*TAU/6+(k%2)*.5;NP({k:'orb',sty:'shell',r:4,t0:T1+cl,t1:T1+cl,t2:T1+cl+4,pos:npVel(x,y,a,70*c5S(),T1+cl),dmg:9})}})})}
 return (n-1)*1.5+tel+1});
defPat('shellMortar','조개 박격포','field',8,'등딱지 구멍에서 조개탄이 포물선으로 날아와 표시된 자리에 떨어짐 → 원 밖으로, 터진 파편 사이로',t=>{const tel=Math.max(1.5,c5T()),n=3+G.phase*2;
 c5W(t,t+.6,'shellMortar');for(let i=0;i<n;i++){const T0=t+i*.45,T1=T0+tel;sch(T0,()=>{const near=i%2===0,[tx,ty]=npIn(near?P.x+(Math.random()-.5)*30:AX+30+Math.random()*(AW-60),near?P.y+(Math.random()-.5)*30:AY+30+Math.random()*(AH-60),20);
  NP({k:'circ',sty:'c5crush',x:tx,y:ty,r:20,t0:T0,t1:T1,t2:T1+.35,dmg:11});c5Lob(T0,T1,c5P(i%2?10:-10,-22),[tx,ty],'shell',5,70);sch(T1,()=>{if(G.phase>=1)c5RingShot(T1,T1+.01,tx,ty,6,56*c5S(),null,0,'shell',3,6)});c5Snd(T1,160,.15,'square',70,.06);c5Shake(T1,.18)})}
 return (n-1)*.45+tel+.8});
defPat('fogHorn','안개 경적','head',8,'등대가 낮게 울리면 소리 고리가 퍼짐 → 고리의 빈 틈을 찾아 통과',t=>{const tel=c5T(),n=3;c5W(t,t+tel,'fogHorn');
 for(let k=0;k<n;k++){const tf=t+tel+k*1.1;sch(t+k*1.1,()=>{const [x,y]=c5P(0,-43)(),ga=Math.atan2(P.y-y,P.x-x)+(k%2?.9:-.9);c5RingShot(t+k*1.1,tf,x,y,22+G.phase*4,62*c5S(),ga,.42,'pearl',4,10)});c5Snd(tf,90,.6,'sawtooth',70,.07);c5Shake(tf,.2)}
 return tel+(n-1)*1.1+4});

/* ═════════ 2. 접힌 항로 ═════════ */
defPat('foldSea','접히는 바다','all',9,'해도가 반으로 접히듯 한쪽 절반이 덮침 → 접는 선 반대쪽으로 넘어가고, 다음엔 다시 반대로',t=>{const tel=Math.max(1.5,c5T()),n=2+Math.min(1,G.phase);
 for(let k=0;k<n;k++){const T0=t+k*(tel+.9),T1=T0+tel;c5W(T0,T1,'foldSea');sch(T0,()=>{const ver=k%2===0,side=ver?(P.x<AX+AW/2?-1:1):(P.y<AY+AH/2?-1:1),mid=ver?AX+AW/2:AY+AH/2;
  const r=ver?(side<0?[AX,AY,AW/2,AH]:[mid,AY,AW/2,AH]):(side<0?[AX,AY,AW,AH/2]:[AX,mid,AW,AH/2]);NP({k:'rect',sty:'c5paper',x:r[0],y:r[1],w:r[2],h:r[3],t0:T0,t1:T1,t2:T1+.5,dmg:12,deco:(o,b,now)=>{if(b>=o.t1)return;const bl=Math.floor(now/90)%2;if(ver)for(let yy=AY;yy<AY+AH;yy+=6)cPx(mid,yy,2,bl?'#fff':'#d4403c',.9);else for(let xx=AX;xx<AX+AW;xx+=6)cPx(xx,mid,2,bl?'#fff':'#d4403c',.9);for(let i=0;i<3;i++){if(ver)cChevron(mid-side*14,AY+AH*(i+1)/4,side<0?0:Math.PI,'#a6f5c6',1,4);else cChevron(AX+AW*(i+1)/4,mid-side*14,side<0?Math.PI/2:-Math.PI/2,'#a6f5c6',1,4)}}})});c5Snd(T1,600,.25,'triangle',180,.05)}
 return n*(tel+.9)});
defPat('paperDarts','종이 비행기 편대','hands',8,'날개 끝에서 종이 비행기가 곡선을 그리며 날아옴 → 화살표 궤적을 보고 곡선 안쪽으로',t=>{const tel=c5T(),n=3+G.phase;c5W(t,t+tel,'paperDarts');
 for(let w=0;w<2;w++){const T0=t+w*1.3,tf=T0+tel;sch(T0,()=>{for(let i=0;i<n;i++){const s=i%2?1:-1,[sx,sy]=c5P(s*26,-36)(),bend=s*(.6+i*.15),a0=Math.atan2(P.y-sy,P.x-sx)-bend*.8,v=78*c5S();
  NP({k:'orb',sty:'dart',r:5,t0:T0,t1:tf+i*.12,t2:tf+i*.12+5,pos:b=>{const u=Math.max(0,b-(tf+i*.12)),a=a0+bend*Math.min(1,u*.5);let x=sx,y=sy;for(let q=0;q<u;q+=.1){const aa=a0+bend*Math.min(1,q*.5);x+=Math.cos(aa)*v*.1;y+=Math.sin(aa)*v*.1}return [x,y]},prev:1.6,prevN:8,dmg:10})}});c5Snd(tf,900,.1,'triangle',1500,.04)}
 return 1.3+tel+5});
defPat('routeThread','붉은 항로','field',10,'핀이 차례로 꽂히고 붉은 실이 핀을 이어 조여짐 → 실 사이 빈 칸에 서기',t=>{const tel=Math.max(1.4,c5T()),n=5+G.phase;c5W(t,t+tel+n*.3,'routeThread');const pts=[];
 for(let i=0;i<n;i++){const T0=t+i*.3;sch(T0,()=>{const a=i*TAU/n+Math.random()*.4,d=50+Math.random()*60,[x,y]=npIn(P.x+Math.cos(a)*d,P.y+Math.sin(a)*d*.7,16);pts[i]=[x,y];NP({k:'orb',sty:'default',r:3,col:'#d4403c',harm:false,noTel:true,t0:T0,t1:T0,t2:t+tel+n*.3+1.2,pos:()=>[x,y],dmg:0,deco:(o,b)=>{if(b<o.t2){pcirc(x,y,4,'#050b12',1);pcirc(x,y,3,'#d4403c',1);RA(x-.5,y-8,1,7,'#c8c8c8',1)}}});c5Snd(T0,1400,.05,'square',1400,.03)})}
 const Tf=t+tel+n*.3;sch(t+n*.3,()=>{for(let i=0;i<n;i++){const j=(i+2)%n;NP({k:'seg',sty:'c5thread',w:6,t0:t+n*.3,t1:Tf,t2:Tf+1,a:()=>pts[i]||[HOME.x,HOME.y],b:()=>pts[j]||[HOME.x,HOME.y],dmg:11})}});c5Snd(Tf,300,.3,'sawtooth',900,.05);
 return tel+n*.3+1.2});
defPat('compassSpin','나침반 바늘','all',9,'바닥에 커다란 나침반이 그려지고 바늘 네 개가 돌아감 → 바늘과 같은 방향으로 따라 돌기',t=>{const tel=c5T(),dur=4.6,dir=Math.random()<.5?1:-1,rot=(.5+G.phase*.12)*dir,cx=AX+AW/2,cy=AY+AH*.56;c5W(t,t+tel,'compassSpin');
 for(let i=0;i<4;i++){const L=i===0?AW*.55:AW*.36,A0=i*Math.PI/2;NP({k:'seg',sty:i===0?'c5thread':'laser',col:i===0?'#d4403c':'#e8f4f0',w:i===0?9:7,live:true,t0:t,t1:t+tel,t2:t+tel+dur,a:()=>[cx,cy],b:b=>{const a=A0+rot*Math.max(0,b-(t+tel));return [cx+Math.cos(a)*L,cy+Math.sin(a)*L]},dmg:11,deco:i?null:(o,b)=>{cRing(cx,cy,36,'#d9b063',.5,1);cRing(cx,cy,8,'#d9b063',.9,2);for(let k=0;k<8;k++){const a=k*Math.PI/4;cPx(cx+Math.cos(a)*36,cy+Math.sin(a)*36,3,'#d9b063',.8)}if(b<o.t1)for(let k=0;k<4;k++){const a=k*Math.PI/2+.4*dir;cChevron(cx+Math.cos(a)*50,cy+Math.sin(a)*50,a+dir*Math.PI/2,'#ff4d6d',.8,3)}}})}
 c5Snd(t+tel,500,.4,'triangle',250,.05);return tel+dur+.3});

/* ═════════ 3. 닻을 짊어진 기사 ═════════ */
defPat('anchorSlam','닻 내려찍기','all',10,'닻을 머리 위로 들었다가 내 자리에 던져 꽂음 → 원 밖으로, 꽂힌 뒤 보스와 이어진 사슬과 충격파 조심',t=>{const tel=Math.max(1.5,c5T()),n=1+Math.min(2,G.phase);
 for(let k=0;k<n;k++){const T0=t+k*2.2,T1=T0+tel;c5W(T0,T1,'anchorSlam');sch(T0,()=>{const [tx,ty]=npIn(P.x,P.y,24);NP({k:'circ',sty:'c5crush',x:tx,y:ty,r:26,t0:T0,t1:T1,t2:T1+.4,dmg:13});c5Lob(T1-.5,T1,c5P(17,-34),[tx,ty],'anchorP',7,40);
  sch(T1,()=>{G.shake=Math.max(G.shake,.5);NP({k:'circ',sty:'c5splash',t0:T1,t1:T1+.25,t2:T1+1.4,cf:b=>[tx,ty,26+clamp((b-T1-.25)/1.15,0,1)*70],x:tx,y:ty,r:26,dmg:10,noTel:true,harm:true});
   NP({k:'seg',sty:'c5chain',w:7,t0:T1,t1:T1+.35,t2:T1+1.8,a:c5P(17,-20),b:()=>[tx,ty],dmg:10})});c5Snd(T1,70,.4,'square',40,.1)})}
 return (n-1)*2.2+tel+1.9});
defPat('chainSweep','사슬 닻 휘두르기','hands',9,'사슬 끝의 닻을 크게 휘둘러 반원을 쓸어냄 → 보스 쪽으로 파고들거나 끝보다 멀리',t=>{const tel=c5T(),dur=1.6/Math.max(.8,c5S()),n=1+Math.min(1,G.phase);
 for(let k=0;k<n;k++){const T0=t+k*(dur+1),T1=T0+tel;c5W(T0,T1,'chainSweep');sch(T0,()=>{const O=c5P(17,-20),dir=k%2?-1:1,a0=dir>0?-.2:Math.PI+.2,span=Math.PI*1.25*dir,R=190,A=b=>a0+span*clamp((b-T1)/dur,0,1);
  NP({k:'seg',sty:'c5chain',w:8,live:true,t0:T0,t1:T1,t2:T1+dur,a:O,b:b=>{const [x,y]=O(),a=A(b);return [x+Math.cos(a)*R,y+Math.sin(a)*R*.9]},dmg:11});
  NP({k:'orb',sty:'anchorP',r:12,t0:T0,t1:T1,t2:T1+dur,pos:b=>{const [x,y]=O(),a=A(b);return [x+Math.cos(a)*R,y+Math.sin(a)*R*.9]},dmg:13,noTel:true,deco:(o,b,now)=>{if(b>=o.t1)return;const [x,y]=O();for(let i=0;i<=8;i++){const a=A(o.t1)+span*i/8;cPx(x+Math.cos(a)*R,y+Math.sin(a)*R*.9,3,Math.floor(now/90)%2?'#fff':'#ff4d6d',.8)}}})});c5Snd(T1,140,dur,'sawtooth',60,.06)}
 return n*(dur+1)+tel-1+.4});
defPat('chainCage','사슬 감옥','field',9,'네 방향에서 사슬이 조여 들어오며 감옥을 만듦 → 초록 화살표가 가리키는 한 모서리의 틈으로',t=>{const tel=c5T(),dur=2.2;c5W(t,t+tel,'chainCage');
 sch(t,()=>{const cx=P.x,cy=P.y,R0=120,R1=22,gap=Math.floor(Math.random()*4),rr=b=>lerp(R0,R1,clamp((b-t-tel)/dur,0,1));for(let i=0;i<4;i++){if(i===gap)continue;const a=i*Math.PI/2,nx=Math.cos(a),ny=Math.sin(a),tx=-ny,ty=nx;
  NP({k:'seg',sty:'c5chain',w:7,live:true,t0:t,t1:t+tel,t2:t+tel+dur+.4,a:b=>{const r=rr(b);return [cx+nx*r-tx*r,cy+ny*r-ty*r]},b:b=>{const r=rr(b);return [cx+nx*r+tx*r,cy+ny*r+ty*r]},dmg:11})}
  const ga=gap*Math.PI/2;NP({k:'orb',harm:false,noTel:true,r:1,t0:t,t1:t+tel+dur,t2:t+tel+dur+.01,pos:()=>[cx,cy],deco:(o,b)=>{const r=rr(b);cChevron(cx+Math.cos(ga)*(r+8),cy+Math.sin(ga)*(r+8),ga,'#a6f5c6',1,5)}})});c5Snd(t+tel,180,1,'sawtooth',120,.05);
 return tel+dur+.6});
defPat('hullBreach','방패 돌진','all',9,'둥근 방패를 앞세우고 가로질러 돌진 → 빨간 길에서 비켜서고, 부서진 창살 거품을 피하기',t=>{const tel=2;let y=HOME.y,xs=HOME.x,xe=HOME.x;c5W(t,t+1+tel,'hullBreach');
 sch(t,()=>{const side=P.x<HOME.x?1:-1;y=clamp(P.y+10,AY+80,AY+AH-10);xs=side>0?AX+AW-50:AX+50;xe=side>0?AX+50:AX+AW-50;tweenBossNow(xs,y,t,t+1);
  const g=bgeo(),cy=y-(g.y-g.coreY);NP({k:'rect',sty:'plain',col:'#5ef0e0',t0:t+1,t1:t+1+tel,t2:t+1+tel+.6,x:Math.min(xs,xe)-20,y:cy-g.hf*U,w:Math.abs(xe-xs)+40,h:g.hf*2*U,dmg:13})});
 sch(t+1+tel,()=>{tweenBossNow(xe,y,t+1+tel,t+1+tel+.6,p=>p*p);G.shake=.4});sch(t+1+tel+.6,()=>{for(let i=0;i<8;i++){const x=lerp(xs,xe,i/8),T0=t+1+tel+.6;NP({k:'orb',sty:'pearl',r:4,t0:T0,t1:T0+.8,t2:T0+4,pos:npVel(x,y-10,-Math.PI/2+(i%2?.3:-.3),50,T0+.8),ray:-Math.PI/2,rayL:18,dmg:9})}});
 sch(t+1+tel+2,()=>tweenBossNow(HOME.x,HOME.y,t+1+tel+2,t+1+tel+3));return 1+tel+3.2});

/* ═════════ 4. 진주 성가대 ═════════ */
defPat('choirChord','진주 화음','head',9,'다섯 진주가 차례로 빛난 뒤 다섯 갈래로 동시에 노래를 쏨 → 갈래 사이 빈 각도에 서기',t=>{const tel=c5T(),n=3+G.phase;c5W(t,t+tel+n*.9,'choirChord');
 for(let k=0;k<n;k++){const T0=t+k*.9,tf=T0+tel;sch(T0,()=>{const [cx,cy]=c5P(0,-24)(),a0=Math.atan2(P.y-cy,P.x-cx)+(k%2?.3:-.3);for(let i=0;i<5;i++){const a=a0+(i-2)*.42,[sx,sy]=c5P(Math.cos(Math.PI*(1.15+i*.175))*9,-24+Math.sin(Math.PI*(1.15+i*.175))*5.4)();NP({k:'orb',sty:'pearl',r:5,t0:T0,t1:tf,t2:tf+5,pos:npVel(sx,sy,a,(70+G.phase*6)*c5S(),tf),ray:a,rayL:30,dmg:10})}});c5Snd(tf,[523,659,784,880,1047][k%5],.25,'triangle',0,.05)}
 return (n-1)*.9+tel+4});
defPat('pipeHymn','오르간 찬가','field',9,'오르간 관이 선율대로 울리면 그 칸이 음표 기둥으로 채워짐 → 조용한 칸으로 옮겨 다니기',t=>{const tel=Math.max(1.3,c5T()),cols=9,cw=AW/cols,mel=[0,2,4,6,8,6,4,2,1,3,5,7].slice(0,7+G.phase*2);c5W(t,t+tel+mel.length*.45,'pipeHymn');
 mel.forEach((ci,i)=>{const T0=t+i*.45,T1=T0+tel;sch(T0,()=>{const w=G.phase>=2?2:1;for(let d=0;d<w;d++){const c=Math.min(cols-1,ci+d);NP({k:'rect',sty:'c5bellz',x:AX+c*cw+1,y:AY,w:cw-2,h:AH,t0:T0,t1:T1,t2:T1+.5,dmg:11,deco:(o,b,now)=>{if(b<o.t1||b>o.t2)return;for(let j=0;j<3;j++){const q=((b-o.t1)*2+j/3)%1;C5SPR.note(AX+c*cw+cw/2,AY+AH-q*AH,5,now/1000,'#ffe6a0')}}})}});c5Snd(T1,[262,294,330,349,392,440,494,523,587][ci],.3,'square',0,.04)});
 return tel+mel.length*.45+.6});
defPat('tentacleVeil','촉수 장막','field',8,'빛나는 촉수들이 위에서 커튼처럼 내려와 좌우로 흔들림 → 촉수 사이 넓은 틈 따라 이동',t=>{const tel=c5T(),dur=3.4,n=5+G.phase,gap=Math.floor(Math.random()*(n-1));c5W(t,t+tel,'tentacleVeil');
 for(let i=0;i<n;i++){if(i===gap&&n>4)continue;const bx=AX+AW*(i+.5)/n,ph=i*.7;NP({k:'seg',sty:'c5tent',w:5,live:true,t0:t,t1:t+tel,t2:t+tel+dur,a:b=>[bx+Math.sin((b-t)*1.8+ph)*24,AY],b:b=>{const q=clamp((b-t-tel)/.8,0,1);return [bx+Math.sin((b-t)*1.8+ph+1)*30,AY+AH*(.35+.65*q)]},dmg:10})}
 NP({k:'orb',harm:false,noTel:true,r:1,t0:t,t1:t+tel,t2:t+tel+.01,pos:()=>[0,0],deco:(o,b)=>{if(b<o.t1&&n>4)cChevron(AX+AW*(gap+.5)/n,AY+AH*.6,Math.PI/2,'#a6f5c6',1,5)}});
 return tel+dur+.3});
defPat('pearlCanon','진주 돌림노래','field',9,'세 자리에서 같은 노래가 차례로 울려 퍼짐(돌림노래) → 먼저 울린 곳의 고리가 지나간 뒤 그 자리로',t=>{const tel=c5T(),n=3+Math.min(1,G.phase);c5W(t,t+tel,'pearlCanon');
 for(let k=0;k<n;k++){const T0=t+k*.9,tf=T0+tel;sch(T0,()=>{const [x,y]=npIn(AX+AW*(.2+.3*(k%3))+(Math.random()-.5)*40,AY+AH*(.35+.3*((k+1)%2)),30);NP({k:'circ',sty:'c5bell',x,y,r:16,t0:T0,t1:tf,t2:tf+.3,dmg:10,label:'♪'});sch(tf,()=>c5RingShot(tf,tf+.01,x,y,12+G.phase*2,58*c5S(),Math.atan2(P.y-y,P.x-x),.35,'note',4,6))});c5Snd(tf,[659,784,988,1175][k%4],.25,'triangle',0,.05)}
 return (n-1)*.9+tel+4});

/* ═════════ 5. 유리 잠항선 ═════════ */
defPat('torpedoSalvo','어뢰 일제사격','head',9,'어뢰관이 붉게 달아오른 뒤 어뢰가 나를 향해 살짝 꺾이며 날아와 터짐 → 옆으로 크게, 폭발 원 밖으로',t=>{const tel=c5T(),n=2+G.phase;c5W(t,t+tel,'torpedoSalvo');
 for(let i=0;i<n;i++){const T0=t+i*.55,tf=T0+tel;sch(T0,()=>{const [sx,sy]=c5P(-16,i%2?-18:-16)(),tx0=P.x,ty0=P.y,v=90*c5S();const o={k:'orb',sty:'torp',r:5,t0:T0,t1:tf,t2:tf+3.2,dmg:12,vx:0,vy:0,cx:sx,cy:sy,ray:Math.atan2(ty0-sy,tx0-sx),rayL:40};o.pos=()=>[o.cx,o.cy];o.vx=Math.cos(o.ray);o.vy=Math.sin(o.ray);
  o.step=(q,b,dt)=>{if(b<q.t1)return;const a2=Math.atan2(P.y-q.cy,P.x-q.cx),a1=Math.atan2(q.vy,q.vx);let d=a2-a1;while(d>Math.PI)d-=TAU;while(d<-Math.PI)d+=TAU;const na=a1+clamp(d,-.9*dt,.9*dt);q.vx=Math.cos(na);q.vy=Math.sin(na);q.cx+=q.vx*v*dt;q.cy+=q.vy*v*dt;if((q.cx<AX-10||q.cx>AX+AW+10||q.cy<AY-10||q.cy>AY+AH+10)&&!q.dead){q.dead=true}};
  const O=NP(o);sch(tf+2.4,()=>{if(O.dead)return;const x=O.cx,y=O.cy;O.dead=true;NP({k:'circ',sty:'c5splash',x,y,r:28,t0:tf+2.4,t1:tf+2.4+.55,t2:tf+2.4+.9,dmg:12});c5Snd(tf+2.95,90,.3,'square',40,.08)})});c5Snd(tf,300,.2,'sawtooth',120,.05)}
 return (n-1)*.55+tel+3.6});
defPat('sonarPing','음파 탐지','all',9,'음파 고리가 퍼지며 내 위치를 찍고, 찍힌 자리에 기뢰가 떠오름 → 찍히면 바로 자리를 옮기기',t=>{const tel=c5T(),n=3+G.phase;c5W(t,t+1,'sonarPing');
 for(let k=0;k<n;k++){const T0=t+k*1,T1=T0+tel*.7;sch(T0,()=>{const [cx,cy]=c5P(-14,-24)();NP({k:'circ',sty:'c5gold',harm:false,noTel:true,t0:T0,t1:T0,t2:T0+1,cf:b=>[cx,cy,(b-T0)*300],x:cx,y:cy,r:10,dmg:0});const mx=P.x,my=P.y;
  NP({k:'circ',sty:'c5splash',x:mx,y:my,r:22,t0:T0+.3,t1:T1+.5,t2:T1+.9,dmg:11,label:'◎'});c5Snd(T0,1800,.08,'sine',1800,.05);c5Snd(T1+.5,120,.2,'square',60,.07)})}
 return (n-1)+tel*.7+1.2});
defPat('searchLight','탐조등 추적','head',9,'탐조등 원뿔이 나를 따라다니다 멈춘 곳에 어뢰가 꽂힘 → 빛이 멈추는 순간 옆으로',t=>{const tel=c5T(),dur=2.4;c5W(t,t+tel+dur,'searchLight');
 const S={a:0};sch(t,()=>{const [x,y]=c5P(-14,-24)();S.a=Math.atan2(P.y-y,P.x-x)});
 const ang=b=>S.a;for(const s of [-1,1])NP({k:'seg',sty:'c5beam',w:3,live:true,harm:false,t0:t,t1:t+.2,t2:t+tel+dur,a:c5P(-14,-24),b:b=>{const [x,y]=c5P(-14,-24)();return [x+Math.cos(S.a+s*.22)*400,y+Math.sin(S.a+s*.22)*400]},dmg:0,step:(o,b,dt)=>{if(s>0&&b<t+tel+dur-.6){const [x,y]=c5P(-14,-24)(),ta=Math.atan2(P.y-y,P.x-x);let d=ta-S.a;while(d>Math.PI)d-=TAU;while(d<-Math.PI)d+=TAU;S.a+=clamp(d,-1.4*dt,1.4*dt)}}});
 sch(t+tel+dur-.6,()=>{const [x,y]=c5P(-14,-24)();for(let i=0;i<3+G.phase;i++){const T0=t+tel+dur-.6,a=S.a+(i-1)*.12;NP({k:'orb',sty:'torp',r:5,t0:T0,t1:T0+.6,t2:T0+5,pos:npVel(x,y,a,150*c5S(),T0+.6),ray:a,rayL:60,dmg:12})}});c5Snd(t+tel+dur,280,.3,'sawtooth',100,.06);
 return tel+dur+3});
defPat('depthCharge','폭뢰 투하','field',9,'위에서 폭뢰 통이 가라앉다가 십자로 터짐 → 통과 같은 줄·칸을 피하기',t=>{const tel=c5T(),n=3+G.phase;c5W(t,t+.6,'depthCharge');
 for(let i=0;i<n;i++){const T0=t+i*.7,sink=1.6;sch(T0,()=>{const x=clamp(i%2?P.x:AX+30+Math.random()*(AW-60),AX+20,AX+AW-20),y=clamp(i%2?P.y:AY+40+Math.random()*(AH-80),AY+30,AY+AH-30),T1=T0+sink+tel*.5;
  NP({k:'orb',sty:'barrel',r:5,harm:false,noTel:true,t0:T0,t1:T0,t2:T1,pos:npLin(x,AY-8,x,y,T0,T0+sink),dmg:0});for(const [w,h] of [[AW,16],[16,AH]])NP({k:'rect',sty:'c5water',x:w===AW?AX:x-8,y:w===AW?y-8:AY,w,h,t0:T0+sink*.4,t1:T1,t2:T1+.35,dmg:11});c5Snd(T1,80,.3,'square',40,.08);c5Shake(T1,.25)})}
 return (n-1)*.7+1.6+tel*.5+.5});

/* ═════════ 6. 전류의 봉합사 (꿰맨 아귀) ═════════ */
defPat('needleStitch','바늘 꿰매기','all',9,'초롱의 바늘이 지그재그로 아레나를 꿰매며 지나가고, 지나간 자리에 전기 실이 남음 → 바늘 길 예고를 보고 실 사이 빈칸으로',t=>{const tel=c5T(),n=5+G.phase,sp=.28;c5W(t,t+tel,'needleStitch');const pts=[];
 sch(t,()=>{const top=P.y<AY+AH/2;let x=AX+20;for(let i=0;i<=n;i++){pts.push([x,i%2?(top?AY+AH-20:AY+20):(top?AY+20:AY+AH-20)]);x+=(AW-40)/n}for(let i=0;i<n;i++){const T1=t+tel+i*sp;NP({k:'seg',sty:'c5stitch',w:6,t0:t,t1:T1+sp,t2:T1+sp+1.4,a:()=>pts[i],b:()=>pts[i+1],dmg:11})}
  NP({k:'orb',sty:'lure',r:6,t0:t,t1:t+tel,t2:t+tel+n*sp,pos:b=>{const q=clamp((b-t-tel)/sp,0,n-.001),i=Math.floor(q),f=q-i,[ax,ay]=pts[i],[bx,by]=pts[i+1];return [lerp(ax,bx,f),lerp(ay,by,f)]},dmg:12,prev:n*sp,prevN:n*3})});c5Snd(t+tel,1600,n*sp,'sawtooth',800,.03);
 return tel+n*sp+1.5});
defPat('suturePull','봉합 당기기','field',9,'가로로 꿰맨 실 세 줄이 팽팽해졌다가 보스 쪽으로 확 당겨짐 → 줄 사이에서 실이 지나갈 때 위아래로 피하기',t=>{const tel=c5T(),dur=1.6;c5W(t,t+tel,'suturePull');
 sch(t,()=>{const n=3+Math.min(1,G.phase);for(let i=0;i<n;i++){const y0=AY+AH*(.55+i*.13),gx=AX+40+Math.random()*(AW-80),gw=46;const Y=b=>lerp(y0,AY+20,clamp((b-t-tel-i*.15)/dur,0,1)**2);
  NP({k:'seg',sty:'c5stitch',w:5,live:true,t0:t,t1:t+tel+i*.15,t2:t+tel+i*.15+dur,a:b=>[AX,Y(b)],b:b=>[gx-gw/2,Y(b)],dmg:10});NP({k:'seg',sty:'c5stitch',w:5,live:true,t0:t,t1:t+tel+i*.15,t2:t+tel+i*.15+dur,a:b=>[gx+gw/2,Y(b)],b:b=>[AX+AW,Y(b)],dmg:10,deco:(o,b)=>{if(b<o.t1)cChevron(gx,Y(b)-8,-Math.PI/2,'#a6f5c6',1,4)}})}});c5Snd(t+tel,200,dur,'sawtooth',900,.04);
 return tel+dur+.8});
defPat('arcGap','전극 아크','field',8,'전극 지느러미가 번쩍이면 아레나 곳곳의 전극 쌍 사이로 번개가 이어짐 → 전극 쌍을 잇는 선 위를 피하기',t=>{const tel=c5T(),waves=2+Math.min(1,G.phase);c5W(t,t+tel,'arcGap');
 for(let w=0;w<waves;w++){const T0=t+w*1.3,T1=T0+tel;sch(T0,()=>{const n=3+G.phase;for(let i=0;i<n;i++){const ver=(i+w)%2===0,c=ver?AX+AW*(i+.5)/n:AY+AH*(i+.5)/n,off=(Math.random()-.5)*20,a=ver?[c+off,AY+8]:[AX+8,c+off*.5],b=ver?[c-off,AY+AH-8]:[AX+AW-8,c-off*.5];
  NP({k:'seg',sty:'elec',col:'#c8ff8a',w:8,t0:T0,t1:T1,t2:T1+.5,a:()=>a,b:()=>b,dmg:11,deco:(o,bb,now)=>{for(const p of [a,b]){pcirc(p[0],p[1],4,'#050b12',1);pcirc(p[0],p[1],3,'#c8884a',1);if(bb>o.t0)n4G(p[0],p[1],8,'#c8ff8a',.5)}}})}});c5Snd(T1,2200,.2,'sawtooth',300,.05)}
 return (waves-1)*1.3+tel+.7});
defPat('lureBite','미끼와 아가리','all',9,'등불 미끼가 내 쪽으로 다가오며 유혹 → 미끼가 멈춘 자리에서 거대한 아가리가 물어뜯음. 미끼에서 떨어지기',t=>{const tel=Math.max(1.4,c5T()),n=1+Math.min(2,G.phase);
 for(let k=0;k<n;k++){const T0=t+k*2.2,T1=T0+tel;c5W(T0,T1,'lureBite');sch(T0,()=>{const [lx,ly]=c5P(-12,-39)(),tx=P.x,ty=P.y;NP({k:'orb',sty:'lure',r:6,harm:false,noTel:true,t0:T0,t1:T0,t2:T1+.6,pos:npLin(lx,ly,tx,ty,T0,T1-.3),dmg:0});
  NP({k:'circ',sty:'c5elec',x:tx,y:ty,r:34,t0:T0+.5,t1:T1,t2:T1+.45,dmg:14,deco:(o,b,now)=>{if(b<o.t1||b>o.t2)return;const q=clamp((b-o.t1)/.2,0,1);for(let i=0;i<7;i++){const a=Math.PI+i*Math.PI/6;cPx(tx+Math.cos(a)*34*(1-q*.6),ty-6+Math.sin(a)*14*(1-q),3,'#e8e0cc',1);cPx(tx+Math.cos(a)*34*(1-q*.6),ty+6-Math.sin(a)*14*(1-q),3,'#e8e0cc',1)}}});c5Snd(T1,70,.35,'square',30,.1);c5Shake(T1,.35)})}
 return (n-1)*2.2+tel+.7});

/* ═════════ 7. 여덟 종의 집행관 (두건 처형인) ═════════ */
defPat('bellToll','여덟 종의 판결','field',10,'도·레·미… 여덟 종이 음계 순서대로 바닥을 침 → 숫자 순서를 보고 이미 울린 자리로 피하기',t=>{const tel=Math.max(1.3,c5T()),st=.42-G.phase*.05;c5W(t,t+tel+8*st,'bellToll');
 sch(t,()=>{const cx=P.x,cy=P.y,rev=Math.random()<.5;for(let i=0;i<8;i++){const a=i*TAU/8+(rev?Math.PI:0),[x,y]=npIn(cx+Math.cos(a)*48,cy+Math.sin(a)*38,18),T1=t+tel+i*st;NP({k:'circ',sty:'c5bell',x,y,r:22,t0:t,t1:T1,t2:T1+.35,dmg:11,label:String(i+1)});c5Snd(T1,[262,294,330,349,392,440,494,523][i],.35,'triangle',0,.05)}
  NP({k:'circ',sty:'c5bell',x:cx,y:cy,r:26,t0:t+tel+8*st-.8,t1:t+tel+8*st,t2:t+tel+8*st+.4,dmg:12,label:'8va'})});
 return tel+8*st+.6});
defPat('octaveScale','옥타브 계단','field',9,'가로 여덟 줄이 음계처럼 한 칸씩 울리며 올라갔다 내려옴 → 계단이 지나간 줄로 따라 들어가기',t=>{const tel=Math.max(1.3,c5T()),n=8,rh=AH/n,st=.36;c5W(t,t+tel,'octaveScale');const up=Math.random()<.5;
 for(let i=0;i<n*2-1;i++){const r=i<n?i:2*n-2-i,row=up?n-1-r:r,T1=t+tel+i*st;NP({k:'rect',sty:'c5bellz',x:AX,y:AY+row*rh+1,w:AW,h:rh-2,t0:T1-tel,t1:T1,t2:T1+st*1.1,dmg:10});c5Snd(T1,[262,294,330,349,392,440,494,523][r],.2,'square',0,.035)}
 return tel+(n*2-1)*st+.4});
defPat('gavelStrike','처형 망치','hands',9,'종 추 망치를 높이 들어 내려침 → 큰 원 밖으로, 뒤이어 퍼지는 종소리 파동은 틈으로',t=>{const tel=Math.max(1.4,c5T()),n=1+Math.min(2,G.phase);
 for(let k=0;k<n;k++){const T0=t+k*2,T1=T0+tel;c5W(T0,T1,'gavelStrike');sch(T0,()=>{const [x,y]=npIn(P.x,P.y,30);NP({k:'circ',sty:'c5crush',x,y,r:32,t0:T0,t1:T1,t2:T1+.4,dmg:14});sch(T1,()=>{G.shake=Math.max(G.shake,.5);c5RingShot(T1,T1+.2,x,y,18,70*c5S(),Math.atan2(HOME.y-y,HOME.x-x),.5,'bell',4,8)});c5Snd(T1,60,.5,'square',30,.1)})}
 return (n-1)*2+tel+3});
defPat('verdictScales','판결의 저울','all',9,'저울이 한쪽으로 기울면 무거운 쪽 절반에 종 파편이 쏟아짐 → 저울이 올라간(가벼운) 쪽으로',t=>{const tel=Math.max(1.6,c5T()),n=2+Math.min(1,G.phase);
 for(let k=0;k<n;k++){const T0=t+k*(tel+.6),T1=T0+tel;c5W(T0,T1,'verdictScales');sch(T0,()=>{const heavy=Math.random()<.5?-1:1,x=heavy<0?AX:AX+AW/2;
  NP({k:'rect',sty:'c5bellz',x,y:AY,w:AW/2,h:AH,t0:T0,t1:T1,t2:T1+.6,dmg:12,deco:(o,b)=>{if(b>=o.t1)return;const cx=AX+AW/2,cy=AY+18,tl=clamp((b-o.t0)/(o.t1-o.t0),0,1)*10*heavy;line(cx-40,cy-tl,cx+40,cy+tl,2,(px,py)=>cPx(px,py,2,'#d8b060',1));pcirc(cx-40,cy-tl+8,6,'#d8b060',.8);pcirc(cx+40,cy+tl+8,6,'#d8b060',.8);cChevron(AX+AW/2-heavy*AW/4,AY+AH/2,heavy<0?0:Math.PI,'#a6f5c6',1,6)}});
  sch(T1,()=>{for(let i=0;i<5;i++)NP({k:'orb',sty:'bell',r:4,t0:T1,t1:T1,t2:T1+.6,pos:npLin(x+AW/2*(i+.5)/5,AY,x+AW/2*(i+.5)/5,AY+AH,T1,T1+.6),dmg:0,harm:false})});c5Snd(T1,110,.4,'square',55,.08);c5Shake(T1,.3)})}
 return n*(tel+.6)});

/* ═════════ 8. 모래시계 고래 ═════════ */
defPat('sandFall','모래 폭포','field',9,'유리 배의 모래가 쏟아지며 모래 기둥이 천천히 옆으로 흘러감 → 기둥 사이 틈을 따라 같이 걷기',t=>{const tel=c5T(),dur=4,n=3+Math.min(2,G.phase),dir=Math.random()<.5?1:-1,w=30;c5W(t,t+tel,'sandFall');
 for(let i=0;i<n;i++){const x0=AX+AW*(i+.3)/n;NP({k:'rect',sty:'c5sand',t0:t,t1:t+tel,t2:t+tel+dur,x:x0,y:AY,w,h:AH,rf:b=>{const q=Math.max(0,b-t-tel)*22*dir,xx=AX+((x0-AX+q)%AW+AW)%AW;return [Math.min(xx,AX+AW-w),AY,w,AH]},dmg:10})}
 return tel+dur+.3});
defPat('reverseTide','거꾸로 흐르는 시간','all',9,'모래알이 사방으로 퍼졌다가 멈춘 뒤 거꾸로 되감겨 돌아옴 → 퍼질 때 틈으로 나가고, 되돌아올 땐 다시 비켜서기',t=>{const tel=c5T(),out=1.6,hold=.5,back=1.6;c5W(t,t+tel,'reverseTide');
 sch(t,()=>{const [cx,cy]=c5P(1,-20)(),n=16+G.phase*4,gap=Math.atan2(P.y-cy,P.x-cx);for(let i=0;i<n;i++){const a=i*TAU/n,R=150+(i%2)*40;if(Math.abs(((a-gap+Math.PI*3)%TAU)-Math.PI)<.35)continue;const T1=t+tel;
  NP({k:'orb',sty:'sand',r:5,t0:t,t1:T1,t2:T1+out+hold+back,pos:b=>{const u=b-T1;let d;if(u<out)d=R*(1-Math.pow(1-u/out,2));else if(u<out+hold)d=R;else d=R*(1-Math.pow((u-out-hold)/back,2));return [cx+Math.cos(a)*d,cy+Math.sin(a)*d*.8]},ray:a,rayL:18,dmg:10})}});c5Snd(t+tel+1.6+.5,900,.3,'sine',300,.05);
 return tel+out+hold+back+.2});
defPat('breach','고래의 도약','all',10,'고래가 물러났다가 아레나를 가로질러 몸통 박치기 → 빨간 길 밖으로, 떨어지는 물방울 조심',t=>{const tel=2.2;let y=HOME.y,xs=HOME.x,xe=HOME.x;c5W(t,t+1+tel,'breach');
 sch(t,()=>{const side=P.x<HOME.x?1:-1;y=clamp(P.y+14,AY+70,AY+AH-10);xs=side>0?AX+AW-40:AX+40;xe=side>0?AX+40:AX+AW-40;tweenBossNow(xs,y,t,t+1);const g=bgeo(),cy=y-(g.y-g.coreY);
  NP({k:'rect',sty:'c5water',x:AX,y:cy-g.hf*U*.9,w:AW,h:g.hf*1.8*U,t0:t+1,t1:t+1+tel,t2:t+1+tel+.7,dmg:14})});
 sch(t+1+tel,()=>{tweenBossNow(xe,y,t+1+tel,t+1+tel+.7,p=>p*p);G.shake=.5});sch(t+1+tel+.7,()=>{for(let i=0;i<10;i++){const T0=t+1+tel+.7,x=lerp(xs,xe,i/10)+(Math.random()-.5)*20,yy=AY+20+Math.random()*(AH-40);NP({k:'circ',sty:'c5splash',x,y:yy,r:14,t0:T0,t1:T0+.9,t2:T0+1.2,dmg:9})}});
 sch(t+1+tel+2.2,()=>tweenBossNow(HOME.x,HOME.y,t+1+tel+2.2,t+1+tel+3.2));return 1+tel+3.4});
defPat('tidePull','시간의 조류','all',9,'고래가 입을 벌려 물살을 빨아들임 → 반대 방향으로 걸으며 날아오는 모래 덩이를 피하기',t=>{const tel=c5T(),dur=3.2;c5W(t,t+tel+dur,'tidePull');
 sch(t,()=>{const [mx,my]=c5P(-22,-17)();G.pull={x:mx,y:my,str:34+G.phase*8,t0:t+tel,t1:t+tel+dur,tp:t,kind:'suck'};for(let i=0;i<6+G.phase*2;i++){const T1=t+tel+i*.4,a=Math.random()*TAU,sx=mx+Math.cos(a)*220,sy=clamp(my+Math.sin(a)*140,AY+10,AY+AH-10);NP({k:'orb',sty:'sand',r:6,t0:T1-.8,t1:T1,t2:T1+3,pos:npLin(sx,sy,mx,my,T1,T1+2.6),ray:Math.atan2(my-sy,mx-sx),rayL:24,dmg:10})}});
 return tel+dur+.4});

/* ═════════ 9. 산호 기록관 ═════════ */
defPat('copyRecord','기록 복사','all',10,'내가 지나간 길을 마도서가 받아 적은 뒤, 그 길을 그대로 잉크로 되살림 → 방금 지나온 길로 되돌아가지 않기',t=>{const rec=2.4,tel=c5T();c5W(t,t+rec,'copyRecord');const path=[];
 for(let i=0;i<12;i++){const T0=t+i*rec/12;sch(T0,()=>{const x=P.x,y=P.y;path.push([x,y]);NP({k:'orb',harm:false,noTel:true,r:1,t0:T0,t1:T0,t2:t+rec+tel+i*.12+.4,pos:()=>[x,y],deco:(o,b)=>{pcirc(x,y,3,'#4a5ad8',.6);RA(x-2,y-1,4,1,'#efe2c0',.8)}});NP({k:'circ',sty:'c5ink',x,y,r:15,t0:t+rec,t1:t+rec+tel+i*.12,t2:t+rec+tel+i*.12+.4,dmg:11})})}
 return rec+tel+12*.12+.5});
defPat('pageStorm','책장 폭풍','field',9,'펼친 마도서에서 책장이 소용돌이치며 쏟아짐 → 소용돌이 팔 사이 틈을 따라 돌기',t=>{const tel=c5T(),waves=5+G.phase*2,arms=4,dir=Math.random()<.5?1:-1;c5W(t,t+tel+waves*.4,'pageStorm');
 for(let k=0;k<waves;k++){const T0=t+tel+k*.4;sch(T0,()=>{const [cx,cy]=c5P(-18,-27)();for(let i=0;i<arms;i++){const a0=i*TAU/arms+k*.3*dir,v=60*c5S();NP({k:'orb',sty:'page',r:5,t0:T0-.4,t1:T0,t2:T0+5,pos:b=>{const u=Math.max(0,b-T0),a=a0+dir*u*.35;return [cx+Math.cos(a)*v*u,cy+Math.sin(a)*v*u*.85]},ray:a0,rayL:14,dmg:10})}});if(k%2===0)c5Snd(T0,700,.08,'triangle',1100,.03)}
 return tel+waves*.4+4});
defPat('inkFlood','잉크 범람','field',9,'조개 문서함에서 잉크가 흘러 웅덩이가 번져 커짐 → 번지기 전에 웅덩이 사이로 빠져나가기',t=>{const tel=c5T(),n=3+G.phase,grow=1.8;c5W(t,t+tel,'inkFlood');
 for(let i=0;i<n;i++){const T0=t+i*.5;sch(T0,()=>{const s=i%2?1:-1,[bx,by]=c5P(s*15,-14)(),[x,y]=npIn(i%2?P.x+(Math.random()-.5)*40:AX+40+Math.random()*(AW-80),i%2?P.y:AY+40+Math.random()*(AH-80),24),T1=T0+tel;c5Lob(T0,T1-.2,[bx,by],[x,y],'ink',4,50);
  NP({k:'circ',sty:'c5ink',x,y,r:12,t0:T0,t1:T1,t2:T1+grow+1,cf:b=>[x,y,12+clamp((b-T1)/grow,0,1)*30],dmg:10})})}
 return (n-1)*.5+tel+grow+1.1});
defPat('coralGrowth','산호 성장','field',9,'보스 발밑에서 산호가 가지를 뻗으며 바닥을 따라 자라남 → 가지가 뻗는 방향 옆으로 비켜서기',t=>{const tel=c5T(),br=3+G.phase;c5W(t,t+tel,'coralGrowth');
 sch(t,()=>{const [ox,oy]=c5P(0,-2)(),a0=Math.atan2(P.y-oy,P.x-ox);for(let k=0;k<br;k++){const a=a0+(k-(br-1)/2)*.45;for(let i=0;i<7;i++){const d=24+i*26,x=ox+Math.cos(a)*d,y=oy+Math.sin(a)*d;if(x<AX+8||x>AX+AW-8||y<AY+8||y>AY+AH-8)break;const T1=t+tel+i*.16;NP({k:'circ',sty:'c5coral',x,y,r:14,t0:t+i*.1,t1:T1,t2:T1+.9,dmg:10})}}});c5Snd(t+tel,200,.6,'triangle',400,.05);c5Shake(t+tel,.2);
 return tel+7*.16+1});

/* ═════════ 10. 무음의 심장 ═════════ */
defPat('returnBell','세 번의 귀환종','all',10,'종 심장이 한 번·두 번·세 번 울리며 고리가 퍼짐(울릴 때마다 고리가 늘어남) → 고리의 빈 틈을 찾아 통과',t=>{const tel=c5T();c5W(t,t+tel+2.6,'returnBell');
 for(let k=0;k<3;k++){const T0=t+k*1.3,tf=T0+tel;sch(T0,()=>{const [x,y]=c5P(0,-23)();for(let r=0;r<=k;r++){const tt=tf+r*.35,ga=Math.atan2(P.y-y,P.x-x)+(r%2?1.2:-1.2)+k*.4;c5RingShot(T0,tt,x,y,20+G.phase*2,(58+r*6)*c5S(),ga,.4,'gem',4,8)}});c5Snd(tf,[392,523,784][k],.8,'triangle',0,.07);c5Shake(tf,.15+k*.1)}
 return 2.6+tel+4});
defPat('silentPulse','무음의 고동','all',9,'심장이 뛸 때마다 아레나 전체가 충격파로 채워짐 → 초록 안전 원 안에서 버티고, 다음 박동엔 다른 원으로',t=>{const tel=Math.max(1.6,c5T()),n=2+Math.min(1,G.phase);c5W(t,t+tel,'silentPulse');
 for(let k=0;k<n;k++){const T0=t+k*(tel+.5),T1=T0+tel;sch(T0,()=>{const safe=[];for(let i=0;i<2;i++){const [x,y]=npIn(AX+AW*(.25+i*.5)+(Math.random()-.5)*60,AY+AH*(.35+Math.random()*.4),30);safe.push([x,y,30])}NP({k:'rect',sty:'c5shock',x:AX,y:AY,w:AW,h:AH,safe,t0:T0,t1:T1,t2:T1+.4,dmg:12})});c5Snd(T1,55,.5,'sine',40,.12);c5Shake(T1,.4)}
 return n*(tel+.5)});
defPat('floodGate','수문 개방','field',9,'후광의 수문이 하나씩 열리며 그 방향으로 물줄기가 뿜어짐 → 열리는 문의 반대편, 물줄기 사이로',t=>{const tel=c5T(),n=3+G.phase;c5W(t,t+tel,'floodGate');
 for(let i=0;i<n;i++){const T0=t+i*.7,T1=T0+tel;sch(T0,()=>{const hor=i%2===0,pos=hor?clamp(P.y+(Math.random()-.5)*30,AY+24,AY+AH-24):clamp(P.x+(Math.random()-.5)*40,AX+30,AX+AW-30),w=36;
  NP({k:'rect',sty:'c5water',x:hor?AX:pos-w/2,y:hor?pos-w/2:AY,w:hor?AW:w,h:hor?w:AH,t0:T0,t1:T1,t2:T1+.7,dmg:12});c5Snd(T1,160,.6,'sawtooth',60,.05)})}
 return (n-1)*.7+tel+.9});
defPat('finalChorus','마지막 합창','all',12,'날개를 활짝 펴고 수문 · 종 · 고동이 한꺼번에 몰아침 → 순서대로: 물줄기 피하고, 고리 틈 찾고, 안전 원으로',t=>{const tel=c5T();c5W(t,t+tel+4,'finalChorus');let L=0;
 L=Math.max(L,MV.floodGate(t));sch(t+2.2,()=>{const [x,y]=c5P(0,-23)();c5RingShot(t+2.2,t+2.2+tel,x,y,24,60*c5S(),Math.atan2(P.y-y,P.x-x),.45,'gem',4,8)});
 const T0=t+4.6,T1=T0+Math.max(1.6,tel);sch(T0,()=>{NP({k:'rect',sty:'c5shock',x:AX,y:AY,w:AW,h:AH,safe:[[AX+AW*.5,AY+AH*.6,32]],t0:T0,t1:T1,t2:T1+.4,dmg:12})});c5Snd(T1,55,.6,'sine',40,.12);
 return Math.max(L,T1+.5-t)});

/* ---------- 덱 · 흐름 ---------- */
const C5DECK={beacon:[['beamSweep',4,0,'S'],['clawPincer',3,0],['shellMortar',3,0],['fogHorn',3,1]],manta:[['routeThread',4,0,'S'],['paperDarts',3,0],['foldSea',3,0],['compassSpin',3,1]],anchor:[['anchorSlam',4,0,'S'],['chainSweep',3,0],['hullBreach',3,0],['chainCage',3,1]],
 organ:[['choirChord',4,0,'S'],['pipeHymn',3,0],['tentacleVeil',3,0],['pearlCanon',3,1]],nautilus:[['torpedoSalvo',4,0,'S'],['sonarPing',3,0],['depthCharge',3,0],['searchLight',3,1]],eel:[['needleStitch',4,0,'S'],['arcGap',3,0],['lureBite',3,0],['suturePull',3,1]],
 octopus:[['bellToll',4,0,'S'],['gavelStrike',3,0],['octaveScale',3,0],['verdictScales',3,1]],whale:[['sandFall',4,0,'S'],['reverseTide',3,0],['breach',3,0],['tidePull',3,1]],archive:[['copyRecord',4,0,'S'],['pageStorm',3,0],['inkFlood',3,0],['coralGrowth',3,1]],heart:[['returnBell',4,0,'S'],['silentPulse',3,0],['floodGate',3,0],['finalChorus',3,2]]};
for(const b of S5){if(C3BOSS[b.art]&&C5DECK[b.key]){C3BOSS[b.art].deck=C5DECK[b.key].map(m=>m.slice());b.sig=C5DECK[b.key][0][0]}}
/* 챕터 5도 다른 챕터와 같은 흐름: 회피 → 그로기(되받아치기) → 반격. (예전에는 공격이 끝날 때마다 반격이 자동으로 열렸음) */
{const _pn=planNext;planNext=function(S){if(G&&G.s5!=null&&!(typeof Q19!=='undefined'&&Q19.practice)){const k=G.s5;G._s5hold=k;G.s5=null;try{return _pn.apply(this,arguments)}finally{G.s5=k}}return _pn.apply(this,arguments)}}
/* 준비 동작이 없는 경우 대비: 공격 시작 시 G.s5act 초기화 */
{const _sf=startFight;startFight=function(){const r=_sf.apply(this,arguments);try{G.s5act=null}catch(e){}return r}}

