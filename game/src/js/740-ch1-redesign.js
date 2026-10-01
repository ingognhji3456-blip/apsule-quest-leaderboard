/* ================= 챕터 1 수호자 리디자인 v94b — 위압감: 각진 장갑 · 가느다란 발광 눈 · 뿔과 칼날 · 짙은 그림자와 테두리 빛 ================= */
function m1G(B){const cf=B.cfg,bt=BASEH[cf.base],bh=cf.bh,hf=cf.bw/2;return {bt,bh,hf,top:-(bt+bh),core:-(bt+bh/2),sh:-(bt+bh*.65),head:-(bt+bh+3)}}
const M1S={st:'#2a3038',sd:'#12161c',sl:'#6a7684',sk:'#07090c'};/* 공통 강철 */
/* ── 0 톱니 파수꾼 GEAR SENTRY: 톱날 견갑을 단 공성 전차 기사 ── */
MON.reg.b0=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.6,C={a:'#6affb0',w:'#ffd166',r:'#ff4d5d'},S=M1S;
 const wL=A.win('gearLaunch'),wR=Math.max(A.win('treadRush'),A.warn),wC=A.win('coreOrbit'),rel=A.rel('gearLaunch')>0,sh=A.shake(wR>.3||wL>.7?.3:0),lean=wR*1.2;
 /* 가시 궤도 */A.plate([[-12,-5],[12,-5],[13.4,-2.4],[11,0],[-11,0],[-13.4,-2.4]],'#1c2026',S.sk,S.sl);const tr=(t*(1.5+wR*8)*3)%2.4;for(let i=-11;i<12;i+=2.4){A.P([[i+tr-.8,-5],[i+tr+.8,-5],[i+tr,-6.4]],'#8a94a0')}for(const wx of [-8.5,-4,0,4,8.5]){A.C(wx,-2.4,1.7,'#0c0f14');A.gear(wx,-2.4,1.2,6,t*(2+wR*8),'#4a5460','#0c0f14')}
 if(wR>.2)for(let i=0;i<4;i++)A.C(-13-i*1.6-((t*8)%1.6),-1-i*.5,.9-i*.15,'#6a6458',.45);
 const Y=b+lean*.4;
 /* 몸통: 역사다리꼴 장갑 */A.plate([[-g.hf-1.4+sh,g.top+Y+1],[g.hf+1.4+sh,g.top+Y+1],[g.hf+.2+sh,-4.6+Y],[-g.hf-.2+sh,-4.6+Y]],S.st,S.sd,S.sl);
 A.P([[-g.hf-.4+sh,g.top+Y+1.8],[-2+sh,g.top+Y+1.8],[-3+sh,g.core+Y+2],[-g.hf+.4+sh,g.core+Y+2]],'#3a434e');A.P([[g.hf+.4+sh,g.top+Y+1.8],[2+sh,g.top+Y+1.8],[3+sh,g.core+Y+2],[g.hf-.4+sh,g.core+Y+2]],'#343c46');
 for(const rx of [-6,-3.4,3.4,6])A.C(rx+sh,g.core+Y+3,.35,S.sl);A.R(-g.hf+sh,g.core+Y+.5,g.hf*2,.5,C.a,.35+wC*.6);
 /* 가슴 화로 그릴 + 톱니 심장 */{const cy=g.core+Y-.3,op=Math.max(wC,A.open,A.expose?1:0);A.P([[-3.2+sh,cy-2.6],[3.2+sh,cy-2.6],[2.2+sh,cy+2.8],[-2.2+sh,cy+2.8]],S.sk);A.gear(sh,cy,1.8,8,t*(2+wC*10),op>0?'#ffe07a':'#b88a30','#3a2808');A.C(sh,cy,.7,op>0?'#ffffff':C.r);A.glow(sh,cy,4+op*6,op>0?C.w:C.r,.5+op);for(let i=-2;i<=2;i++)A.R(i*1.2-.2+sh,cy-2.4,.4,5,S.sd,.9)}
 /* 톱날 견갑 (사출 준비 때 회전 가속 · 불꽃) */for(const s of [-1,1]){const gx=s*(g.hf+1.2)+sh,gy=g.sh+Y-1.6;A.plate([[gx-s*2.8,gy+2.6],[gx+s*2.6,gy+2],[gx+s*3,gy-.4],[gx-s*1,gy-3]],S.st,S.sd,S.sl);
  if(!rel){const n=10,r=2.8,sp=t*s*(1.5+wL*14);for(let i=0;i<n;i++){const a=sp+i*TAU/n;A.spike(gx+Math.cos(a)*r,gy-2+Math.sin(a)*r,a+.5,1.6,1.2,'#c8ccd4')}A.C(gx,gy-2,r,'#8a9098');A.C(gx,gy-2,r*.55,S.sd);A.C(gx,gy-2,.6,wL>0?C.w:'#4a5058');if(wL>0){A.glow(gx,gy-2,4+wL*5,C.w,wL);if(wL>.5)for(let k=0;k<2;k++){const a=Math.random()*TAU;A.L(gx+Math.cos(a)*3,gy-2+Math.sin(a)*3,gx+Math.cos(a)*5,gy-2+Math.sin(a)*5,'#ffe9a8',.3)}}}else A.C(gx,gy-2,1,'#07090c')}
 /* 투구 머리: 앞으로 숙인 뾰족 투구 + 붉은 T자 바이저 + 뿔 파이프 */{const hy=g.top+Y-2.6-(wC>0?wC*.5:0),hx=sh+lean;A.plate([[hx-4,hy+2.6],[hx+4,hy+2.6],[hx+3.4,hy-1.8],[hx,hy-4.4],[hx-3.4,hy-1.8]],'#343c46',S.sd,S.sl);
  for(const s of [-1,1]){A.R(hx+s*3.6-.6,hy-4,1.2,3,'#4a5058');A.spike(hx+s*3.6,hy-4,-Math.PI/2+s*.35,2.6,1,'#8a9098');A.C(hx+s*3.6,hy-6.4,.4,C.r)}
  const ec=wL>0||wR>0||A.eyeC>0?C.r:C.a;A.R(hx-2.8,hy-.3,5.6,1.2,S.sk);A.R(hx-.5,hy-.3,1,2.6,S.sk);if(!A.dm){A.R(hx-2.5+A.look[0]*.3,hy+.05,5,.5,ec);A.R(hx-.2,hy+.1,.4,2,ec,.8);A.glow(hx,hy+.3,4+A.eyeC*4+wR*3,ec,.9)}A.brow(hx-1.8,hy-.9,2.4,1,S.sd);A.brow(hx+1.8,hy-.9,2.4,-1,S.sd)}};
MON.hand.b0=H=>{const k=H.h.mode&&H.h.mode!=='idle';H.chain('#12161c','#4a5460',3.2,2.6);H.R(-5,-6,10,9,'#12161c');H.R(-4.4,-5.4,8.8,7.4,'#2a3038');H.R(-4.4,-5.4,8.8,1,'#6a7684');for(const s of [-1,0,1]){H.R(s*3-1,2,2,4,'#3a434e');H.R(s*3-.6,5.4,1.2,1.6,'#c8ccd4')}H.R(-1,-3,2,2,k?'#ffd166':'#ff4d5d');H.glow(0,-2,5,k?'#ffd166':'#ff4d5d',.5)};
/* ── 1 볼트 월 VOLT WALL: 검은 오벨리스크 요새, 가로로 긴 외눈 틈, 테슬라 첨탑 ── */
MON.reg.b1=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.4,C={a:'#6ae8ff',w:'#ffffff',c:'#b86a2a'},S=M1S;
 const wA=A.win('teslaArc'),wB=A.win('currentBarrier'),ch=Math.max(wA,wB,A.eyeC),sh=A.shake(ch>.5?.3:0),ra=(.35+ch*.65);
 /* 기둥 다리: 절연체 애자 */for(const s of [-1,1]){const lx=s*5.6+sh;A.P([[lx-2.4,0],[lx+2.4,0],[lx+1.6,-5.6],[lx-1.6,-5.6]],'#161a20');for(let i=0;i<4;i++)A.E(lx,-1+-i*1.3,2.2-i*.15,.45,i%2?'#c8d0d8':'#8a96a4');A.R(lx-.3,-5.6,.6,5.6,C.a,.3*ra)}
 const top=g.top+b-1.4,bot=-5.2+b;/* 오벨리스크 몸통 */A.plate([[-g.hf+1.4+sh,bot],[g.hf-1.4+sh,bot],[g.hf-.2+sh,top+4],[g.hf-2.6+sh,top],[-g.hf+2.6+sh,top],[-g.hf+.2+sh,top+4]],'#1a1f27',S.sk,'#5a6878');
 /* 흉곽 갈비 */for(let i=0;i<4;i++){const yy=top+5+i*1.6;A.L(-g.hf+1.6+sh,yy,-1.6+sh,yy+.8,'#0c0f14',.5);A.L(g.hf-1.6+sh,yy,1.6+sh,yy+.8,'#0c0f14',.5)}
 /* 가운데 룬 코어 (전류가 흐르는 기둥) */{const cy=g.core+b+.6,op=Math.max(A.open,A.expose?1:0);A.P([[sh,cy-4],[sh+2,cy],[sh,cy+4],[sh-2,cy]],S.sk);A.P([[sh,cy-3.2],[sh+1.4,cy],[sh,cy+3.2],[sh-1.4,cy]],op?C.w:C.a,op?1:ra);A.R(sh-.2,cy-3,.4,6,C.w,.8);A.glow(sh,cy,5+ch*5+op*4,C.a,.6+ch)}
 /* 흐르는 회로 */for(let i=0;i<5;i++){const x=-g.hf+2.2+i*(g.hf*2-4.4)/4+sh;if(Math.abs(x-sh)<2)continue;const q=((t*1.4+i*.3)%1),y0=bot-.6,y1=top+5;A.L(x,y0,x,y1,'#0c1620',.4);A.R(x-.2,y0-(y0-y1)*q,.4,1.2,C.a,ra)}
 /* 변압기 코일 견갑 */for(const s of [-1,1]){const ox=s*(g.hf+.6)+sh,oy=top+3.4;A.E(ox,oy,3.4,3,'#161a20');for(let i=0;i<5;i++)A.E(ox,oy-2+i*1,3-(i%2)*.3,.45,i%2?C.c:'#d8904a');A.E(ox,oy-2.8,2.2,.8,'#2a323c');A.C(ox,oy-3.4,.8,C.w);A.glow(ox,oy-3.4,2+ch*4,C.a,.6+ch)}
 /* 머리: 좁은 투구 + 가로 외눈 틈 + 첨탑 뿔 */{const hy=top-.6,w=7;A.plate([[-w/2+sh,hy+2.2],[w/2+sh,hy+2.2],[w/2-.8+sh,hy-1.6],[-w/2+.8+sh,hy-1.6]],'#242a34',S.sk,'#7a8898');A.R(-w/2+.6+sh,hy,w-1.2,1.3,S.sk);
  if(!A.dm){const o=A.blink?.25:1;A.R(-w/2+.9+sh,hy+.35*o,w-1.8,.6*o,C.a);A.R(A.look[0]*1.6-.8+sh,hy+.1,1.6,1.1*o,C.w);A.glow(A.look[0]*1.6+sh,hy+.6,4+ch*5,C.a,.9+ch)}
  for(const s of [-1,1]){A.spike(s*2.6+sh,hy-1.4,-Math.PI/2+s*.2,4.4+ch*.8,1.3,'#3a4450');A.C(s*2.6+s*.9+sh,hy-5.6-ch*.8,.8,C.w);A.glow(s*3.5+sh,hy-5.8,2.4+ch*5,C.a,.7+ch)}}
 /* 아크: 뿔 사이 + 견갑까지 */{const k=Math.max(.3,ch),pts=[[-3.5+sh,top-6.4-ch*.8],[3.5+sh,top-6.4-ch*.8]],arc=(x0,y0,x1,y1,n,amp)=>{let px=x0,py=y0;for(let i=1;i<=n;i++){const nx=x0+(x1-x0)*i/n,ny=y0+(y1-y0)*i/n+(i<n?Math.sin(t*47+i*2.9+x0)*amp:0);A.L(px,py,nx,ny,C.w,.4,.9);A.L(px,py,nx,ny,C.a,.9,.35);px=nx;py=ny}};
  arc(pts[0][0],pts[0][1],pts[1][0],pts[1][1],8,1.6*k);if(ch>.3){for(const s of [-1,1])arc(s*3.5+sh,top-6.4,s*(g.hf+.6)+sh,top,6,1.2*ch)}if(ch>.6)for(let i=0;i<3;i++){const a=t*20+i*2;arc(sh,g.core+b,sh+Math.cos(a)*9,g.core+b+Math.sin(a)*6,5,1)}}};
MON.hand.b1=H=>{H.chain('#07090c','#6ae8ff',2.4,2.4);H.R(-4,-7,8,14,'#12161c');H.R(-3.4,-6.4,6.8,12.8,'#1e242c');for(let i=0;i<4;i++)H.R(-4.6,-5.6+i*3.4,9.2,1,i%2?'#8a5a2a':'#6ae8ff');H.R(-1,-9,2,3,'#3a4450');if(Math.floor(H.t*14)%3===0){H.R(4,-4,4,.8,'#ffffff');H.R(-8,3,4,.8,'#ffffff')}H.glow(0,-8,5,'#6ae8ff',.6)};
/* ── 2 용광로 골렘 FURNACE GOLEM: 흑요석 거인, 용암 균열, 파묻힌 뿔 머리, 가슴 화로 ── */
MON.reg.b2=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.5,C={f:'#ff5a1f',a:'#ffb020',w:'#fff0a0',o:'#1c1210',o2:'#2e1e18',o3:'#4a3024',k:'#07040a'};
 const wD=A.win('doorBlast'),wC=A.win('chimneyEmber'),wF=A.win('moltenFist'),heat=Math.max(wD,wC,wF,A.open*.8),hb=.35+heat*.65,sh=A.shake(heat>.6?.3:0),hunch=wF*1.2;
 const lava=(x0,y0,x1,y1,w)=>{A.L(x0,y0,x1,y1,C.k,(w||.5)+.3);A.L(x0,y0,x1,y1,heat>.5?C.w:C.a,w||.5,hb);A.glow((x0+x1)/2,(y0+y1)/2,2.4,C.f,hb*.5)};
 /* 짧고 굵은 다리 */for(const s of [-1,1]){const lx=s*5+sh;A.E(lx,-3.4,3,3.6,C.o);A.E(lx-.6,-3.8,2.4,3,C.o2);A.P([[lx-3.2,0],[lx+3.2,0],[lx+2.6,-1.4],[lx-2.6,-1.4]],C.o);lava(lx-1,-5.6,lx+.4,-2.4,.4);for(let i=-1;i<=1;i++)A.spike(lx+i*1.4,-.2,Math.PI/2,.8,1,'#3a2a24')}
 const cy=g.core+b+hunch*.6;
 /* 배: 화로 */A.E(sh,cy+1.6,g.hf-.6,g.bh/2+.4,C.o);A.E(sh-.6,cy+1,g.hf-1.4,g.bh/2-.4,C.o2);
 {const op=Math.max(wD,A.open,A.expose?1:0),dy=cy+2;A.E(sh,dy,3.6,3.2,C.k);A.E(sh,dy,3,2.6,op>.05?C.f:'#3a1006');A.C(sh,dy+.4,1.6+op*1,op>.05?C.w:'#6a1e08',op>.05?1:.8);A.glow(sh,dy,4+op*9,C.a,.35+op);for(let i=-2;i<=2;i++){const gh=2.6*(1-op*.8);A.R(i*1.2-.25+sh,dy-gh,.5,gh*2,'#140a08')}A.E(sh,dy-2.9,3.4,.5,'#5a3a2c')}
 /* 거대한 어깨 바위 (머리보다 높음) */for(const s of [-1,1]){const ox=s*(g.hf-.4)+sh,oy=g.top+b+2.2-hunch*.4;A.E(ox,oy,5.2,4.4,C.o);A.E(ox-s*.6,oy-.6,4.4,3.6,C.o2);A.E(ox-s*1.4,oy-1.6,2.2,1.4,C.o3);
  lava(ox-s*3.6,oy+1.4,ox-s*1,oy-1.6);lava(ox-s*1,oy-1.6,ox+s*1.6,oy+.2,.4);lava(ox+s*.4,oy+3.4,ox+s*2.6,oy+1.2,.4);
  /* 굴뚝 뿔 */const cx=ox+s*1.6,cy0=oy-3.4;A.P([[cx-1.3,cy0+1],[cx+1.3,cy0+1],[cx+s*1.4+.9,cy0-5],[cx+s*1.4-.9,cy0-5.4]],'#241612');A.E(cx+s*1.4,cy0-5.2,1.3,.6,C.k);if(wC>0||heat>.2){A.C(cx+s*1.4,cy0-5.6,.7+wC*.8,C.f,.7+wC*.3);A.glow(cx+s*1.4,cy0-5.8,3+wC*6,C.f,.6+wC)}
  const q=(t*1.4+s*.5)%1;A.C(cx+s*1.4+Math.sin(q*6)*.8,cy0-6.6-q*4,.7+q*1.6,wC>0?C.a:'#2a2220',(1-q)*.7);if(wC>0)A.rise(4,cx+s*1.4-1,cx+s*1.4+1,cy0-6,8,1.8,C.a,.5,s)}
 /* 가슴판 */A.P([[-g.hf+2.2+sh,g.top+b+3-hunch*.3],[g.hf-2.2+sh,g.top+b+3-hunch*.3],[g.hf-3+sh,cy-1],[-g.hf+3+sh,cy-1]],C.o2);lava(-3.4+sh,g.top+b+4,-1.8+sh,cy-1.2,.4);lava(3.2+sh,g.top+b+3.6,2+sh,cy-1.6,.4);
 /* 푹 파묻힌 머리: 뿔 투구 + 이글거리는 눈 + 쇠창살 입 */{const hy=g.top+b+2.4+hunch*.8,hx=sh+hunch*.3;A.E(hx,hy,3.2,2.6,C.k);A.E(hx,hy-.2,2.8,2.2,'#241612');for(const s of [-1,1]){A.P([[hx+s*1.8,hy-1.4],[hx+s*.8,hy-2],[hx+s*4.2,hy-5.4],[hx+s*3.4,hy-3]],'#8a7a6a');A.P([[hx+s*3.4,hy-4.4],[hx+s*4.2,hy-5.4],[hx+s*3.6,hy-3.8]],'#c8b8a8')}
  const ec=heat>.4||A.eyeC>0?C.w:C.a;A.slit(hx-1.1,hy-.4,1.5,.7,ec,.25);A.slit(hx+1.1,hy-.4,1.5,.7,ec,-.25);A.brow(hx-1.1,hy-1.1,1.8,1,C.k);A.brow(hx+1.1,hy-1.1,1.8,-1,C.k);A.R(hx-1.4,hy+.8,2.8,.9,C.k);for(let i=-1;i<=1;i++)A.R(hx+i*.8-.15,hy+.8,.3,.9,C.f,hb)}};
MON.hand.b2=H=>{const hot=H.h.mode&&H.h.mode!=='idle';H.chain('#120a08','#2a1c18',3.8,3);H.C(0,0,6.4,'#120a08');H.C(-.3,-.5,5.6,'#2a1c18');for(let i=-1;i<=1;i++)H.R(i*2.6-1,3.6,2,2.6,'#1e1210');H.R(-3,-2,6,.8,hot?'#fff0a0':'#ff5a1f');H.R(-.4,-4,.8,5,hot?'#fff0a0':'#ff5a1f');H.glow(0,0,hot?10:6,'#ff7a2a',hot?.8:.4)};
/* ── 3 철갑 열차 IRON RAILER: 전투 기관차 — 송곳니 배장기, 성난 쌍전조등, 투구 굴뚝 ── */
MON.reg.b3=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.4,C={r:'#b8301e',a:'#ffe07a',w:'#fff6d0'},S=M1S;
 const wH=Math.min(1,A.win('headlamp')+A.eyeC),wS=A.win('steamWhistle'),wR=A.warn,sh=A.shake(wS>.4||wR>.3?.3:0),rot=t*(2+wR*12);
 for(const s of [-1,1])for(const wx of [4.4,8.8]){const X=s*wx+sh;A.C(X,-2.6,2.7,S.sk);A.C(X,-2.6,2.1,'#5a1a12');for(let i=0;i<8;i++){const a=rot*s+i*TAU/8;A.spike(X+Math.cos(a)*2,-2.6+Math.sin(a)*2,a,.8,.8,'#8a9098')}A.C(X,-2.6,.7,'#8a9098')}
 for(const s of [-1,1]){const a=rot*s,ox=Math.cos(a)*1.3,oy=Math.sin(a)*1.3;A.L(s*4.4+sh+ox,-2.6+oy,s*8.8+sh+ox,-2.6+oy,'#c8ccd4',.6)}
 const top=g.top+b;A.plate([[-g.hf-.6+sh,top+g.bh],[g.hf+.6+sh,top+g.bh],[g.hf+.6+sh,top+1.4],[g.hf-1.6+sh,top],[-g.hf+1.6+sh,top],[-g.hf-.6+sh,top+1.4]],S.st,S.sd,S.sl);A.R(-g.hf+sh,top+g.bh-2,g.hf*2,.8,C.r);for(let i=-8;i<=8;i+=2)A.C(i+sh,top+1.4,.3,S.sl);
 /* 연기실 얼굴 */const fx=sh,fy=g.core+b-.4;A.C(fx,fy,5.8,S.sk);A.C(fx,fy,5.2,'#22262c');A.ring(fx,fy,5.2,.5,'#5a6470');
 /* 성난 쌍전조등 */for(const s of [-1,1]){const lx=fx+s*2.3,ly=fy-1.6;A.P([[lx-1.6,ly-1+(s<0?.6:0)],[lx+1.6,ly-1+(s>0?.6:0)],[lx+1.4,ly+1],[lx-1.4,ly+1]],S.sk);const ec=wH>0?C.w:C.a;if(!A.dm){A.P([[lx-1.2,ly-.5+(s<0?.5:0)],[lx+1.2,ly-.5+(s>0?.5:0)],[lx+1,ly+.6],[lx-1,ly+.6]],ec);A.glow(lx,ly,3.5+wH*8,ec,.8+wH)}}
 if(wH>.3)for(const s of [-1,1])A.beam([[fx+s*2.3,fy-1.6],[fx+s*2.3+A.look[0]*18-3,fy-1.6+A.look[1]*18],[fx+s*2.3+A.look[0]*18+3,fy-1.6+A.look[1]*18]],C.w,wH*.25);
 /* 송곳니 배장기 */{const my=fy+2;A.P([[fx-5.6,my-.4],[fx+5.6,my-.4],[fx+3.6,my+3.4],[fx-3.6,my+3.4]],'#1a1c20');for(let i=-4;i<=4;i++){const long=Math.abs(i)===1;A.spike(fx+i*1.2,my,Math.PI/2+i*.08,long?3.4:2.4,1,'#c8ccd4')}A.R(fx-5.6,my-.8,11.2,.7,C.r)}
 if(A.open>0||A.expose){const op=A.expose?1:A.open;A.R(-g.hf+1.2+sh,g.core+b-1,2.4,2.4,C.a);A.glow(-g.hf+2.4+sh,g.core+b,5,C.a,op)}
 /* 투구 굴뚝 + 기적 */{const cx=fx,cy2=top-.4,v=wS>0?Math.sin(t*60)*.35*wS:0;A.P([[cx-2.2+v,cy2],[cx+2.2+v,cy2],[cx+3+v,cy2-4.4],[cx-3+v,cy2-4.4]],S.sd);A.R(cx-3.4+v,cy2-5.4,6.8,1.2,'#3a3f46');A.spike(cx+v,cy2-5.4,-Math.PI/2,2.4,1.6,C.r);
  for(let i=0;i<4;i++){const q=(t*1.1+i/4)%1;A.C(cx+Math.sin(q*4+i)*1,cy2-7-q*7,1.2+q*2,wS>0?'#e8e8ec':'#3a3a40',(1-q)*(.55+wS*.35))}if(wS>0){A.R(cx+3.6,cy2-3,1.4,3,'#c8a050');for(let i=0;i<5;i++)A.C(cx+5+i*1.4,cy2-4-i*.8,.7+i*.35,'#ffffff',wS*(1-i/5))}}};
MON.hand.b3=H=>{const a=H.h.ang||0,k=(H.h.kick||0)*3;H.chain('#07090c','#5a6470',3,3);H.C(0,0,5.4,'#07090c');H.C(0,0,4.4,'#2a3038');for(let i=2;i<12;i++){const x=Math.cos(a)*(i-k),y=Math.sin(a)*(i-k);H.R(x-1.8,y-1.8,3.6,3.6,i>9?'#b8301e':'#22262c')}if(H.h.charge>0){H.C(Math.cos(a)*13,Math.sin(a)*13,1.6+H.h.charge*2.6,'#ffe07a');H.glow(Math.cos(a)*13,Math.sin(a)*13,9,'#ffb040',.9)}};
/* ── 4 극저온 코어 CRYO CORE: 칼날 같은 얼음 결정 파수병, 어두운 심장 속 차가운 외눈 ── */
MON.reg.b4=A=>{const g=m1G(A.B),t=A.t,b=A.bob*1.2,C={i:'#a8e8ff',m:'#3a7aa8',d:'#0c2034',w:'#eafcff',a:'#5ad8ff',k:'#030810'};
 const wS=A.win('shardLaunch'),wG=A.win('crystalGrow'),wM=A.win('mirrorShard'),ch=Math.max(wS,wG,wM,A.eyeC),cy=g.core+b-.8;
 const shard=(x,y,ang,len,w)=>{const ca=Math.cos(ang),sa=Math.sin(ang),nx=-sa*w/2,ny=ca*w/2;A.P([[x+nx,y+ny],[x-nx,y-ny],[x+ca*len,y+sa*len]],C.d);A.P([[x+nx*.6,y+ny*.6],[x,y],[x+ca*len*.94,y+sa*len*.94]],C.m);A.P([[x-nx*.6,y-ny*.6],[x,y],[x+ca*len*.94,y+sa*len*.94]],C.i);A.L(x,y,x+ca*len*.9,y+sa*len*.9,C.w,.25,.8)};
 /* 서리 안개 망토 */for(let i=0;i<5;i++){const q=(t*.4+i/5)%1;A.E(Math.sin(i*2.1)*2,-1.2-q*2,5+q*5,.8+q*.4,C.w,(1-q)*.22)}
 /* 아래 고드름 턱 */for(let i=-3;i<=3;i++){const L=3.4-Math.abs(i)*.5+(i%2?0:.8);shard(i*1.4,cy+3.6,Math.PI/2+i*.06,L,1.2)}
 /* 뒤쪽 결정 왕관 가시 (성장 준비 때 자람) */const gr=1+wG*.35;[[-5,-1.25,7],[-3,-1.45,9.5],[-1.2,-1.55,11],[1.4,-1.62,10],[3.4,-1.75,8.5],[5.4,-1.9,6],[-6.4,-1.05,5],[6.6,-2.1,4.4]].forEach(([x,a,L])=>shard(x,cy-2,a,L*gr,2.2));
 /* 몸: 다면 결정 */A.P([[0,cy-6],[g.hf,cy-1],[g.hf-1.4,cy+3.8],[0,cy+5],[-g.hf+1.4,cy+3.8],[-g.hf,cy-1]],C.k);A.P([[0,cy-5.2],[g.hf-.8,cy-1],[g.hf-2,cy+3.2],[0,cy+4.2],[-g.hf+2,cy+3.2],[-g.hf+.8,cy-1]],C.d);
 A.P([[0,cy-5.2],[-g.hf+.8,cy-1],[-3,cy-.6]],C.m);A.P([[0,cy-5.2],[g.hf-.8,cy-1],[3,cy-.6]],'#2a5a80');A.P([[-g.hf+2,cy+3.2],[0,cy+4.2],[-2,cy+1.8]],'#1a3a58');
 /* 금 간 틈 빛 */A.L(-4,cy-2,-1.6,cy+.6,C.a,.3,.6+ch*.4);A.L(3.6,cy+2.4,1.8,cy+.8,C.a,.3,.6+ch*.4);
 /* 심장 외눈: 세로 동공 */{const r=2.4+(A.expose?.6:0);A.C(0,cy,r+.7,C.k);A.C(0,cy,r,'#0a1a2a');if(!A.dm){const ex=A.look[0]*.7,ey=A.look[1]*.4,o=A.blink?.15:1;A.E(ex,cy+ey,r*.85,r*.5*o,A.expose?C.w:C.a);A.E(ex,cy+ey,r*.18,r*.45*o,C.k);A.R(ex-r*.5,cy+ey-r*.25,.5,.5,C.w);A.glow(ex,cy+ey,r+5+ch*7,C.a,.9+ch)}}
 /* 궤도 칼날 */const n=7;for(let i=0;i<n;i++){let a=t*1.4+i*TAU/n,rr=g.hf+4.4;if(wS>0){const tg=Math.atan2(A.look[1],A.look[0])+(i-n/2+.5)*.2;a=a+(tg-a)*Math.min(1,wS*1.5);rr+=wS*2}const X=Math.cos(a)*rr,Y=cy+Math.sin(a)*rr*.5,pa=wS>0?Math.atan2(A.look[1],A.look[0]):a+Math.PI/2;shard(X-Math.cos(pa)*1.4,Y-Math.sin(pa)*1.4,pa,3,1.2);if(wS>0)A.glow(X,Y,2+wS*2,C.a,wS)}
 if(wM>0)for(let i=0;i<4;i++){const a=t*4+i*1.57;A.L(0,cy,Math.cos(a)*g.hf*1.2,cy+Math.sin(a)*g.hf,C.w,.3,wM)}};
MON.hand.b4=H=>{const a=H.t*2.4;for(let i=0;i<5;i++){const q=a+i*TAU/5;H.R(Math.cos(q)*5.4-.8,Math.sin(q)*5.4-.8,1.6,1.6,'#e8fbff')}H.R(-1.6,-7,3.2,14,'#3a7aa8');H.R(-.8,-8,1.6,16,'#a8e8ff');H.R(-3,-1,6,2,'#0e2438');H.glow(0,0,9,'#5ad8ff',.55)};
/* ── 5 스톰 하이브 STORM HIVE: 뇌운 위 장갑 벌집, 붉은 겹눈 무리, 침 드론 ── */
MON.reg.b5=A=>{const g=m1G(A.B),t=A.t,b=A.bob*1.1,C={y:'#e8b020',y2:'#a87010',d:'#2a1a06',k:'#0a0608',r:'#ff2a3a',l:'#fff6a0',c:'#1a1628',c2:'#2c2640'};
 const wD=A.win('droneLaunch'),wB=A.win('carpetBomb'),ch=Math.max(wD,wB,A.eyeC),cy=g.core+b,sh=A.shake(wB>.6?.2:0);
 /* 뇌운 치마 + 번개 */for(let i=-4;i<=4;i++)A.C(i*2.3+sh,-2.8+Math.sin(t*1.3+i)*.3,2.4+(i%2)*.5,C.c);for(let i=-3;i<=3;i++)A.C(i*2.4+sh,-4.2,1.6,C.c2);
 const bolt=(x0,y0,n)=>{let px=x0,py=y0;for(let k=0;k<n;k++){const nx=px+(Math.sin(t*37+k*3+x0)*1.4),ny=py+1.3;A.L(px,py,nx,ny,C.l,.35);px=nx;py=ny}A.glow(x0,y0+n*.6,3,C.l,.8)};if(!A.dm&&(Math.floor(t*6)%4===0||wB>.2)){bolt(((Math.floor(t*6)*7)%12)-6,-2,3);if(wB>.4)bolt(((Math.floor(t*6)*3)%12)-6,-2,4)}
 /* 층층이 쌓인 벌집 첨탑 */const rings=6;for(let r=0;r<rings;r++){const k=r/(rings-1),w=g.hf+1-k*(g.hf-2.4),yy=-5.4+b-r*2.2;A.E(sh,yy,w,1.6,C.k);A.E(sh,yy-.2,w-.4,1.3,r%2?C.y2:C.y);A.E(sh-w*.3,yy-.6,w*.4,.4,C.l,.35);
  for(let h=0;h<Math.max(2,Math.round(w/1.4));h++){const hx=-w+1+h*2.2+(r%2)*1.1;if(Math.abs(hx)>w-.8)continue;const on=((h+r+Math.floor(t*4))%6===0)||ch>.3;A.C(hx+sh,yy,.45,on?C.l:C.d,on?.9:1)}}
 A.spike(sh,-5.4+b-rings*2.2+.6,-Math.PI/2,3.4,1.6,C.k);A.C(sh,-5.4+b-rings*2.2-2.8,.6,C.l);A.glow(sh,-5.4+b-rings*2.2-2.8,3+ch*4,C.l,.8);
 /* 피뢰 뿔 */for(const s of [-1,1]){A.L(s*2.4+sh,cy-3,s*6+sh,cy-8.4,C.k,.7);A.spike(s*6+sh,cy-8.4,-Math.PI/2+s*.5,1.8,.8,C.y);A.glow(s*6.4+sh,cy-9.6,2+ch*3,C.l,.6)}
 /* 가면: 붉은 겹눈 무리 + 큰 턱 */{const my=cy+.6,op=Math.max(wD,A.open,A.expose?1:0);A.P([[-4.4+sh,my-3],[4.4+sh,my-3],[3.4+sh,my+2],[0+sh,my+3.4],[-3.4+sh,my+2]],C.k);A.P([[-3.8+sh,my-2.5],[3.8+sh,my-2.5],[2.9+sh,my+1.6],[sh,my+2.8],[-2.9+sh,my+1.6]],'#1a1010');
  if(!A.dm)[[-1.9,-1.2,.8],[1.9,-1.2,.8],[-.8,-1.8,.5],[.8,-1.8,.5],[-2.8,-.2,.5],[2.8,-.2,.5],[0,-.6,.6]].forEach(([ex,ey,r])=>{A.C(ex+sh+A.look[0]*.2,my+ey,A.blink?.12:r,C.r);A.R(ex+sh-r*.3,my+ey-r*.4,r*.4,r*.4,'#ffc0c8')});A.glow(sh,my-1,5+ch*4,C.r,.7+ch);
  for(const s of [-1,1]){const oa=op*.6;A.P([[s*1.2+sh,my+1.4],[s*3+sh,my+1],[s*(1.6+oa*2)+sh,my+4.4+oa]],'#3a2a10');A.spike(s*(1.6+oa*2)+sh,my+4.2+oa,Math.PI/2-s*.4,1,.6,C.l)}if(op>.1){A.E(sh,my+2.6,1.4*op,1*op,C.l);A.glow(sh,my+2.6,5,C.y,op)}}
 /* 침 드론 편대 */const n=6;for(let i=0;i<n;i++){const a=t*(1.8+wD*5)+i*TAU/n,rr=g.hf+3-wD*1.8,X=Math.cos(a)*rr+sh,Y=cy-2+Math.sin(a)*rr*.4,wf=Math.floor(t*24+i)%2;A.E(X,Y,1.1,.7,C.y);A.R(X-.3,Y-.7,.6,1.4,C.k);A.R(X+.3,Y-.7,.3,1.4,C.k);A.spike(X,Y+.5,Math.PI/2,1.4,.6,C.k);A.E(X-.3,Y-1-wf*.3,.7,.4,'#e8e8ff',.55);A.C(X+.8,Y-.2,.25,C.r)}};
MON.hand.b5=H=>{const a=H.h.ang||Math.PI/2,k=(H.h.kick||0)*3;H.chain('#0c0810','#e0a820',2.4,3);H.C(0,0,4.8,'#0c0810');H.C(0,0,4,'#2a1c08');H.R(-4,-.8,8,1.4,'#e0a820');for(let i=3;i<10;i++)H.R(Math.cos(a)*(i-k)-1,Math.sin(a)*(i-k)-1,2,2,i>8?'#ff3a4d':'#3a2a10');if(H.h.charge>0){H.C(Math.cos(a)*11,Math.sin(a)*11,1.6+H.h.charge*2,'#fff6a0');H.glow(Math.cos(a)*11,Math.sin(a)*11,8,'#e0a820',.9)}};
/* ── 6 자석 크레인 MAGNET CRANE: 웅크린 산업 괴수, 전갈 꼬리 같은 붐 끝의 전자석 ── */
MON.reg.b6=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.5,C={y:'#d8a820',d:'#3a2c08',k:'#0a0806',r:'#ff3a3a',bl:'#4a7aff',m:'#2a2418'},S=M1S;
 const wW=A.win('wreckingBall'),wP=A.win('scrapPull'),wC=A.win('clawDrop'),sh=A.shake(wW>.5||wP>.6?.3:0),crouch=wW*1.2;
 /* 네 개의 유압 다리 (곤충처럼 꺾임) */for(const s of [-1,1])for(const f of [0,1]){const hx=s*(3+f*3.4)+sh,hy=-4.6+b+crouch,kx=s*(6+f*4.4)+sh,ky=-7.6+b+crouch*.4,fx=s*(7+f*4.6)+sh;A.L(hx,hy,kx,ky,S.sk,1.5);A.L(hx,hy,kx,ky,'#4a4a52',.9);A.L(kx,ky,fx,0,S.sk,1.4);A.L(kx,ky,fx,0,f?'#3a3a42':'#4a4a52',.8);A.C(kx,ky,.8,C.y);A.spike(fx,-.6,Math.PI/2,.8,1.1,'#8a9098')}
 const top=g.top+b+crouch;/* 몸통: 앞으로 숙인 장갑 */A.plate([[-g.hf-1+sh,-4.4+b+crouch],[g.hf+1+sh,-4.4+b+crouch],[g.hf+.4+sh,top+2],[g.hf-3+sh,top],[-g.hf+2.4+sh,top+.4],[-g.hf-1.8+sh,top+3]],C.m,C.k,'#6a5a30');
 for(let i=0;i<10;i++){const x=-g.hf-.8+i*2.1;A.P([[x+sh,-4.6+b+crouch],[x+1+sh,-4.6+b+crouch],[x+2.2+sh,-6.4+b+crouch],[x+1.2+sh,-6.4+b+crouch]],i%2?C.y:C.k)}
 /* 앞으로 튀어나온 조종실 머리 */{const hx=-g.hf+.6+sh,hy=top+3.2;A.plate([[hx-3.4,hy-2],[hx+3.4,hy-2.4],[hx+3,hy+2.4],[hx-2.6,hy+2]],'#1e1a12',C.k,'#6a5a30');const ec=wP>0?(Math.floor(t*10)%2?C.r:C.bl):C.r;if(!A.dm){const o=A.blink?.3:1;A.P([[hx-2.6,hy-.4],[hx+2.6,hy-.9],[hx+2.4,hy-.9+.9*o],[hx-2.4,hy-.4+.9*o]],ec);A.R(hx+A.look[0]*1.4-.5,hy-.6,1,.5*o,'#ffffff');A.glow(hx,hy-.2,5,ec,.9)}A.brow(hx,hy-1.4,6,.35,C.k);for(let i=0;i<4;i++)A.R(hx-2+i*1.2,hy+1.2,.5,.9,'#8a9098')}
 {const op=Math.max(A.open,A.expose?1:0),cy=g.core+b+1.8+crouch;A.vent(-1+sh,cy-1.2,4,2.6,C.y,op>0)}
 /* 전갈 붐 (철구 준비 때 크게 젖힘) */{const bx=g.hf-1.6+sh,by=top+.6,a1=-1.95-wW*.55+Math.sin(t*.8)*.05,L1=7.6,jx=bx+Math.cos(a1)*L1,jy=by+Math.sin(a1)*L1,a2=a1+1.25+wW*.45,L2=6.4,ex=jx+Math.cos(a2)*L2,ey=jy+Math.sin(a2)*L2;
  for(const [x0,y0,x1,y1] of [[bx,by,jx,jy],[jx,jy,ex,ey]]){A.L(x0,y0,x1,y1,C.k,2.4);A.L(x0,y0,x1,y1,C.y,1.4);for(let k=.12;k<1;k+=.2)A.L(x0+(x1-x0)*k-.6,y0+(y1-y0)*k-.6,x0+(x1-x0)*(k+.1)+.6,y0+(y1-y0)*(k+.1)+.6,C.k,.35)}A.C(jx,jy,1.2,'#5a5040');A.C(jx,jy,.5,C.r);A.L(bx,by+1,jx,jy+1,'#8a9098',.3);
  const sw=Math.sin(t*1.6)*.3-wW*.6,mx=ex+Math.sin(sw)*4.4,my=ey+Math.cos(sw)*4.4;A.L(ex,ey,mx,my,'#8a8a90',.35);const mc=wP>0?(Math.floor(t*12)%2?C.r:C.bl):C.r;A.E(mx,my+1,3,1.1,'#5a5a60');A.R(mx-2.8,my+1,1.8,3.8,mc);A.R(mx+1,my+1,1.8,3.8,C.bl);A.R(mx-2.8,my+4.4,1.8,1,'#e8e8f0');A.R(mx+1,my+4.4,1.8,1,'#e8e8f0');
  if(wP>0){A.glow(mx,my+3,5+wP*9,'#9a8aff',wP);for(let i=0;i<3;i++)A.ring(mx,my+3,2+i*1.8+((t*5)%1.8),.3,'#c8c0ff',wP*.5)}}};
MON.hand.b6=H=>{const md=H.h.mode;const cl=md&&md!=='idle'&&!H.h.stuck?1:0;H.chain('#0a0806','#d8a820',2.8,3);H.R(-4.6,-5.6,9.2,5.4,'#0a0806');H.R(-4,-5,8,4.2,'#2a2418');H.R(-4,-3.4,8,.8,'#d8a820');for(const s of [-1,0,1]){const ox=s*(3.4-cl*1.4);H.R(ox-.9,0,1.8,5.4,'#3a3a40');H.R(ox-1.3+(s*.4),4.6,2.6,1.6,'#c8ccd4')}H.R(-.8,-4,1.6,1.4,'#ff3a3a')};
/* ── 7 시계탑 자동인형 CLOCKWORK: 금 간 도자기 가면의 마리오네트, 시계 후광, 가위 칼날 ── */
MON.reg.b7=A=>{const g=m1G(A.B),t=A.t,b=A.bob,C={p:'#6a1a3a',d:'#200814',g:'#c8a040',w:'#e8e0d8',k:'#0a0408',r:'#ff3a6a'};
 const wS=A.win('scissorHands'),wK=A.win('cuckoo'),wW=A.win('windSpiral'),sw=Math.sin(t*1.6)*.5,tilt=Math.sin(t*.9)*.15+wS*.2;
 if(!A.still)for(const s of [-1,1])A.L(s*(g.hf-.4),g.sh+b-3,s*(g.hf-.4)+sw*.5,-40,'#c8c0d0',.15,.5);
 /* 시계 후광 (뒤) */{const hy=g.top+b-1.4,R=g.hf+2;A.ring(0,hy,R,.6,C.g,.6);for(let i=0;i<12;i++){const a=i*TAU/12+t*.1;A.spike(Math.cos(a)*R,hy+Math.sin(a)*R,a,1.4,.6,C.g)}const ah=t*.5*(1+wS*8);A.L(0,hy,Math.cos(ah)*R*.9,hy+Math.sin(ah)*R*.9,C.g,.4,.6)}
 for(const s of [-1,1]){A.L(s*1.6,-5.4,s*2+sw*.3,0,C.k,.8);A.spike(s*2+sw*.3,-.4,Math.PI/2,1,.8,C.g)}
 /* 톱날 치마 */{const ty=-5.4+b;for(let i=0;i<16;i++){const a=i/16*TAU+t*.8,x=Math.cos(a)*6.6;A.spike(x*.9,ty,Math.PI/2+Math.cos(a)*.3,2.6,1.4,i%2?C.p:C.d)}A.E(0,ty,6,1.2,C.d)}
 /* 좁은 몸통 + 유리 진자 */{const top=g.top+b+3.6,hgt=g.bh-4.2;A.P([[-3.2,top],[3.2,top],[2,top+hgt],[-2,top+hgt]],C.d);A.P([[-2.6,top+.5],[2.6,top+.5],[1.5,top+hgt-.5],[-1.5,top+hgt-.5]],'#3a1a2a');const pa=Math.sin(t*3.1)*.5,L=hgt-2;A.L(0,top+.6,Math.sin(pa)*L,top+.6+Math.cos(pa)*L,C.g,.3);A.C(Math.sin(pa)*L,top+.6+Math.cos(pa)*L,.9,A.expose?'#ffffff':C.r);if(A.open>0||A.expose)A.glow(0,g.core+b,5,C.r,A.expose?1:A.open);A.R(-3.6,top-.6,7.2,.8,C.g)}
 /* 태엽 열쇠 */{const ky=g.core+b-2,a=t*(1+wW*12);A.L(3,ky,5.6,ky,C.g,.6);A.R(5.4,ky-1.8*Math.abs(Math.cos(a)),1.4,3.6*Math.abs(Math.cos(a))+.3,C.g);if(wW>0)A.glow(5.8,ky,3+wW*4,C.g,wW)}
 /* 금 간 도자기 가면 */{const hy=g.top+b+.2,hx=Math.sin(tilt)*1;A.E(hx,hy,3.4,4.2,C.k);A.E(hx,hy-.2,3,3.8,C.w);A.E(hx+1,hy-1.2,1.2,1.8,'#ffffff',.5);A.L(hx+.6,hy-3.8,hx-.4,hy-1,C.k,.3);A.L(hx-.4,hy-1,hx+.4,hy+.6,C.k,.3);
  for(const s of [-1,1]){const ex=hx+s*1.3,ey=hy-.4;A.P([[ex-.9,ey-.2+(s*.3)],[ex+.9,ey-.2-(s*.3)],[ex+.6,ey+.9],[ex-.6,ey+.9]],C.k);if(!A.dm&&!A.blink){A.C(ex+A.look[0]*.2,ey+.3,.35,wS>0||A.eyeC>0?'#ffffff':C.r);A.glow(ex,ey+.3,1.8,C.r,.9)}}
  A.R(hx-1.4,hy+2,2.8,.4,C.k);for(let i=-1;i<=1;i++)A.R(hx+i*.8-.1,hy+1.8,.2,.8,C.k);A.R(hx+s0(1.8),hy+2.4,.3,1.4,C.r,.5)
  /* 뻐꾸기 뿔 문 */const dy=hy-6;A.P([[hx-2.2,dy+1.6],[hx,dy-1],[hx+2.2,dy+1.6]],C.p);A.R(hx-1.6,dy+1.6,3.2,1.8,C.k);if(wK>0){const pop=Math.min(1,wK*1.4);A.C(hx,dy+1.8-pop*1.6,.9,'#3a2a2a');A.spike(hx+.6,dy+1.8-pop*1.6,0,1.6,.7,C.g);A.C(hx+.2,dy+1.5-pop*1.6,.25,C.r);A.glow(hx,dy+1,3,C.r,wK)}}};
function s0(v){return v}
MON.hand.b7=H=>{H.chain('#200814','#c8a040',2,3);if(H.h.armed!==false){const op=Math.abs(Math.sin(H.t*6))*.5+.2;for(const s of [-1,1]){const a=Math.PI/2+s*op;for(let i=0;i<10;i++)H.R(Math.cos(a)*i-.8,Math.sin(a)*i-.8,1.6,1.6,i>6?'#e8e0d8':'#8a8a90')}H.C(0,0,2.2,'#c8a040');H.C(0,0,.8,'#ff3a6a');H.glow(0,4,6,'#ff3a6a',.3)}else{H.C(0,0,3.4,'#200814');H.C(0,0,2.4,'#c8a040')}};
/* ── 8 광학 요새 OPTIC FORTRESS: 거대한 조리개 눈을 품은 흑성채, 회전 거울, 붉은 탐조등 ── */
MON.reg.b8=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.4,C={r:'#ff2a4a',w:'#ffffff',g:'#5affc8'},S=M1S;
 const wR=A.win('ricochetLaser'),wF=Math.min(1,A.win('focusLens')+A.eyeC),wP=A.win('spectrum'),ch=Math.max(wR,wF,wP);
 A.plate([[-12,-4.6],[12,-4.6],[13,-2],[11,0],[-11,0],[-13,-2]],'#1c2026',S.sk,S.sl);for(let i=-11;i<11.5;i+=2)A.P([[i+((t*3)%2)-.8,-4.6],[i+((t*3)%2)+.8,-4.6],[i+((t*3)%2),-5.8]],'#6a7684');
 const top=g.top+b;A.plate([[-g.hf-.6,-4.6],[g.hf+.6,-4.6],[g.hf,top+2],[-g.hf,top+2]],'#22262c',S.sk,'#5a6470');for(let r=0;r<4;r++)for(let i=0;i<7;i++)A.R(-g.hf+.4+i*2.8+(r%2)*1.4,top+3+r*2,.3,1.6,'#141820');
 for(let i=0;i<6;i++){A.P([[-g.hf+i*3.6,top+2.2],[-g.hf+i*3.6+2.4,top+2.2],[-g.hf+i*3.6+2,top-.2],[-g.hf+i*3.6+.4,top-.2]],'#22262c')}
 for(const s of [-1,1]){const tx=s*(g.hf-1.2);A.P([[tx-1.4,top],[tx+1.4,top],[tx+.8,top-5],[tx-.8,top-5]],'#1c2026');A.spike(tx,top-5,-Math.PI/2,2.4,1.8,'#3a4048');A.C(tx,top-3,.5,C.r);A.glow(tx,top-3,2,C.r,.8)}
 /* 조리개 눈 */{const ey=g.core+b-.8,R=4.6;A.C(0,ey,R+.8,S.sk);A.C(0,ey,R,'#14181e');const ap=.35+.55*(1-wF)*(A.expose?.3:1),rot=t*.3+wF*2;for(let i=0;i<8;i++){const a=rot+i*TAU/8;A.P([[Math.cos(a)*R,ey+Math.sin(a)*R],[Math.cos(a+.9)*R,ey+Math.sin(a+.9)*R],[Math.cos(a+.5)*R*ap,ey+Math.sin(a+.5)*R*ap]],i%2?'#3a4048':'#2a3038')}
  const ir=R*ap*.9;if(!A.dm){A.C(A.look[0]*.8,ey+A.look[1]*.5,ir,A.blink?'#14181e':(wF>0?C.w:C.r));A.C(A.look[0]*.8,ey+A.look[1]*.5,ir*.4,'#07090c');A.glow(0,ey,R+2+wF*9,wF>0?C.w:C.r,.8+wF)}
  if(wP>0){const cols=['#ff4d4d','#ffb020','#ffe36b','#6affc8','#6ab8ff','#b08aff'];cols.forEach((cl,i)=>A.L(R*.6,ey,R+5+wP*6,ey-3+i*1.2,cl,.5))}}
 if(A.open>0||A.expose){A.vent(-2,top+g.bh-3,4,2.4,C.g,true)}
 /* 회전 거울 */for(const s of [-1,1]){const mx=s*(g.hf+2.4),my=g.sh+b-.8,ang=Math.sin(t*1.2+s)*.6+wR*s*1.4,w=Math.abs(Math.cos(ang))*2.6+.4;A.L(s*g.hf,my,mx,my,S.sd,.8);A.P([[mx-w/2,my-3.2],[mx+w/2,my-3.2],[mx+w/2,my+3.2],[mx-w/2,my+3.2]],'#c8f0ff');A.R(mx-w/2,my-3.2,Math.max(.3,w*.3),6.4,'#ffffff');if(wR>0&&Math.floor(t*10)%2)A.glow(mx,my,4+wR*4,C.w,wR)}};
MON.hand.b8=H=>{const a=H.h.ang||0,k=(H.h.kick||0)*3;H.chain('#07090c','#ff2a4a',2.6,3);H.R(-4.4,-4.4,8.8,8.8,'#07090c');H.R(-3.8,-3.8,7.6,7.6,'#22262c');H.C(0,0,1.4,'#ff2a4a');for(let i=3;i<11;i++)H.R(Math.cos(a)*(i-k)-1.5,Math.sin(a)*(i-k)-1.5,3,3,i>9?'#c8f0ff':'#14181e');if(H.h.charge>0){H.C(Math.cos(a)*12,Math.sin(a)*12,1.6+H.h.charge*2.6,'#ffffff');H.glow(Math.cos(a)*12,Math.sin(a)*12,9,'#ff2a4a',.9)}};
/* ── 9 오메가 엔진 OMEGA ENGINE: 칼날 후광을 두른 흑금 거신, 새장 속 붉은 심장, 왕관 첨탑 ── */
function m1Omega(A,ascend){const g=m1G(A.B),t=A.t,b=A.bob*1.1,C={g:'#d8a840',gd:'#5a3a10',h:ascend?'#ffffff':'#ff2a5a',hd:ascend?'#ff7ab0':'#5a0a24',k:'#08050a',w:'#fff0d8'};
 const beat=A.pul,any=A.any||0,cy=g.core+b,sh=A.shake(any>.5?.25:0),S=M1S;
 /* 칼날 후광 (두 겹 반대 회전) */for(const [r,n,sp,col,len] of [[g.hf+5+(ascend?2:0),16,.18,C.gd,3],[g.hf+2.6,12,-.3,C.g,2.2]]){for(let i=0;i<n;i++){const a=t*sp+i*TAU/n;A.spike(sh+Math.cos(a)*r,cy+Math.sin(a)*r,a,len,1.2,col)}A.ring(sh,cy,r,.6,col,.9)}
 if(ascend)for(let i=0;i<12;i++){const a=t*.5+i*TAU/12;A.L(sh+Math.cos(a)*(g.hf+8),cy+Math.sin(a)*(g.hf+8),sh+Math.cos(a)*(g.hf+13),cy+Math.sin(a)*(g.hf+13),C.w,.35,.5)}
 /* 파이프 날개 */for(const s of [-1,1])for(let i=0;i<5;i++){const px=s*(g.hf-1.4+i*1.5)+sh,h=5+i*2+(ascend?2:0),py=cy+2.4-i*.5;A.P([[px-.7,py],[px+.7,py],[px+.5,py-h],[px-.5,py-h]],i%2?'#2a2018':'#3a2c1c');A.spike(px,py-h,-Math.PI/2,1.4,1,C.g);if(any>0||beat>.6)A.C(px,py-h-1.8-((t*3+i)%1)*1.6,.4,C.h,(1-((t*3+i)%1))*.8)}
 /* 흑금 흉갑 */A.plate([[-g.hf+1+sh,cy-6],[g.hf-1+sh,cy-6],[g.hf+.4+sh,cy+3],[sh,cy+7],[-g.hf-.4+sh,cy+3]],'#1a1418',C.k,C.g);for(const s of [-1,1])A.L(s*(g.hf-1)+sh,cy-6,s*1.4+sh,cy+6,C.g,.35,.6);
 /* 피스톤 */for(const s of [-1,1]){const px=s*(g.hf-2.2)+sh,push=beat*1.4;A.R(px-1,cy+2,2,3,C.gd);A.R(px-.6,cy-.4-push,1.2,3,'#8a8a90');A.R(px-1.4,cy-1-push,2.8,.9,C.g)}
 /* 새장 + 심장 */for(let i=-3;i<=3;i++){const x=i*1.3+sh,hh=Math.sqrt(Math.max(0,1-(i/3.5)**2))*4.8;A.L(x,cy-hh,x,cy+hh*.9,C.g,.3,.8)}
 {const s2=1+beat*.14+(A.expose?.12:0),hs=2.6*s2,hy=cy;A.C(sh-hs*.5,hy-hs*.35,hs*.6,C.hd);A.C(sh+hs*.5,hy-hs*.35,hs*.6,C.hd);A.P([[sh-hs*1.05,hy-hs*.2],[sh+hs*1.05,hy-hs*.2],[sh,hy+hs*1.1]],C.hd);A.C(sh-hs*.5,hy-hs*.4,hs*.46,A.expose?'#ffffff':C.h);A.C(sh+hs*.5,hy-hs*.4,hs*.46,A.expose?'#ffffff':C.h);A.P([[sh-hs*.9,hy-hs*.25],[sh+hs*.9,hy-hs*.25],[sh,hy+hs*.85]],A.expose?'#ffffff':C.h);A.glow(sh,hy,hs*3+beat*4,C.h,.7+beat*.6+(A.open||0))}
 /* 투구 얼굴 + 왕관 첨탑 */{const fy=g.top+b-1.6;A.plate([[-3.6+sh,fy+2.2],[3.6+sh,fy+2.2],[3+sh,fy-1.8],[sh,fy-3.4],[-3+sh,fy-1.8]],'#1a1418',C.k,C.g);A.slit(-1.5+sh,fy+.2,2,.8,any>0?C.w:C.h,.3);A.slit(1.5+sh,fy+.2,2,.8,any>0?C.w:C.h,-.3);A.R(sh-.2,fy-2.8,.4,2.4,C.g);
  for(let i=-3;i<=3;i++){const h=3+(i===0?3:Math.abs(i)===1?1.8:Math.abs(i)===2?.8:0)+(ascend?1.6:0),a=i*.24;A.spike(sh+i*1.1,fy-2.6+Math.abs(i)*.4,-Math.PI/2+a,h,1,i%2?C.gd:C.g);if(i===0){A.C(sh,fy-2.6-h-.6,.7,C.h);A.glow(sh,fy-2.6-h-.6,3,C.h,.8)}}}
 for(let i=-2;i<=2;i++){const q=(t*2.4+i*.3)%1;A.C(i*2+sh,-2-q*2.4,.9*(1-q)+.2,ascend?C.w:C.h,(1-q)*.6)}}
MON.reg.b9=A=>m1Omega(A,false);MON.reg.b9t=A=>m1Omega(A,true);
MON.hand.b9=H=>{H.chain('#5a3a10','#d8a840',2.4,3);if(H.h.armed!==false){for(let i=0;i<12;i++){const a=-H.t*9+i*TAU/12;const x=Math.cos(a)*8,y=Math.sin(a)*8;H.R(x-1.1,y-1.1,2.2,2.2,'#fff0d8')}H.C(0,0,7.4,'#08050a');H.C(0,0,6.6,'#1a1418');H.C(0,0,6,'#d8a840');H.C(0,0,4.6,'#08050a');H.C(0,0,2,'#ff2a5a');H.glow(0,0,7,'#ff2a5a',.6)}else{H.C(0,0,4,'#5a3a10');H.C(0,0,3,'#ff2a5a')}};
/* ---- 연결: drawRobot / drawOmegaTrue / 손 ---- */
function drawRobot(c,B,x,y,t,o,u,bid){monDraw('b'+bid,c,B,x,y,t,o,u)}
{const _ot=typeof drawOmegaTrue==='function'?drawOmegaTrue:null;drawOmegaTrue=function(cc,x,y,now,bo,u){if(!monDraw('b9t',cc,BOSSES[OMEGA_BI],x,y,now,bo||{},u||U)&&_ot)_ot.apply(this,arguments)}}
function monHandHook(c,B,h,sx,sy,t,dorm,sc){const bi=BOSSES.indexOf(B);if(typeof _c3Swap!=='undefined'&&_c3Swap&&_c3Swap.art&&B===BOSSES[_c3Swap.bi])return false;if(bi>=0&&bi<20)return monHandDraw('b'+bi,c,B,h,sx,sy,t,dorm,sc);return false}

/* ===== 챕터 1 디테일 패스: 크기 박스 · 기운 색 · 입자 · 상처/리벳/케이블 등 잔디테일 ===== */
const M1X={
 b0:{bb:[-14,-24,14,0],aura:'#6affb0',f:A=>{const g=m1G(A.B),t=A.t;A.rise(5,-12,12,-5,6,.9,'#8a8478',.7,1);for(const s of [-1,1]){A.L(s*3.4,g.core+2.6,s*5.8,g.core+.6,'#07090c',.25);A.L(s*6,g.top+2,s*6.6,g.top+4.4,'#07090c',.25)}for(let i=0;i<3;i++)A.R(-7+i*.5,g.core+3.8,.4,.4,'#ffd166',.6);if(A.any>.3)A.rise(6,-8,8,g.top,8,1.6,'#ffd166',.6,2)}},
 b1:{bb:[-12,-30,12,0],aura:'#6ae8ff',f:A=>{const g=m1G(A.B),t=A.t;/* 늘어진 케이블 */for(const s of [-1,1]){for(let i=0;i<8;i++){const k=i/7;A.R(s*(g.hf+.4)+s*Math.sin(k*Math.PI)*1.6-.3,g.top+1+k*(g.bh-1),.6,.6,'#07090c')}}A.rise(6,-10,10,g.top-2,6,.7,'#6ae8ff',.45,3);if(Math.floor(t*9)%5===0)A.spark(Math.sin(t*33)*g.hf,g.core+Math.cos(t*21)*3,.8,'#ffffff',.9)}},
 b2:{bb:[-13,-26,13,0],aura:'#ff5a1f',f:A=>{const g=m1G(A.B),t=A.t;A.rise(9,-11,11,-2,20,.5,'#ffb020',.55,4);A.rise(4,-4,4,g.top-4,10,.8,'#ff5a1f',.8,5);/* 흘러내리는 용암 방울 */for(const s of [-1,1]){const q=(t*.5+(s>0?.5:0))%1;A.C(s*(g.hf-1.4),g.core+3.6+q*5,.45*(1-q)+.2,'#ffb020',1-q)}}},
 b3:{bb:[-12,-28,12,0],aura:'#ffb040',f:A=>{const g=m1G(A.B),t=A.t;for(let i=0;i<2;i++){const q=(t*1.4+i*.5)%1;A.C(-11-q*4,-1-q*1.4,.6+q*1.4,'#b8b8c0',(1-q)*.35)}A.rise(3,-10,10,-1,4,1.4,'#ffb040',.5,6);for(let i=-3;i<=3;i+=2)A.L(i*2.4,g.top+g.bh-4,i*2.4+.6,g.top+g.bh-2.6,'#07090c',.2)}},
 b4:{bb:[-13,-30,13,0],aura:'#5ad8ff',f:A=>{const g=m1G(A.B);A.rise(10,-13,13,-1,26,.25,'#e8fbff',.45,7);A.rise(5,-6,6,g.core+4,10,.5,'#5ad8ff',.6,8)}},
 b5:{bb:[-13,-24,13,0],aura:'#e0a820',f:A=>{const g=m1G(A.B);A.rise(6,-10,10,-3,10,.6,'#fff6a0',.45,9);for(let i=0;i<5;i++){const a=A.t*3+i;A.spark(Math.cos(a)*(g.hf+5),g.core-2+Math.sin(a*1.3)*2,.5,'#e0a820',.7)}}},
 b6:{bb:[-13,-30,14,0],aura:'#ff3a3a',f:A=>{const g=m1G(A.B),t=A.t;/* 경고등 */const on=Math.floor(t*3)%2;A.C(-g.hf+.6,g.top+.4,.7,on?'#ff3a3a':'#4a1010');if(on)A.glow(-g.hf+.6,g.top+.4,3,'#ff3a3a',.8);A.rise(3,-6,6,-1,4,1,'#8a8478',.6,10);for(let i=0;i<4;i++)A.L(-g.hf+1+i*4,g.top+3.4,-g.hf+1.6+i*4,g.top+4.6,'#07090c',.2)}},
 b7:{bb:[-12,-30,12,0],aura:'#ff3a6a',f:A=>{A.rise(7,-9,9,-2,24,.35,'#c8a040',.4,11);if(A.any>.3)A.rise(6,-6,6,-6,14,1.2,'#ff3a6a',.5,12)}},
 b8:{bb:[-14,-28,14,0],aura:'#ff2a4a',f:A=>{const g=m1G(A.B),t=A.t;/* 탐조등 빔 흔들림 */if(!A.dm&&!A.still){const a=Math.PI/2+Math.sin(t*.7)*.8,x0=0,y0=g.core-.8;A.beam([[x0,y0],[x0+Math.cos(a-.12)*16,y0+Math.sin(a-.12)*16],[x0+Math.cos(a+.12)*16,y0+Math.sin(a+.12)*16]],'#ff2a4a',.12)}A.rise(4,-10,10,-1,5,.8,'#6a7684',.5,13)}},
 b9:{bb:[-16,-34,16,0],aura:'#ff2a5a',f:A=>{const g=m1G(A.B);A.rise(12,-15,15,-2,34,.3,'#ffd9a0',.45,14);A.rise(6,-4,4,g.core+2,12,.9,'#ff2a5a',.6,15)}},
 b9t:{bb:[-18,-36,18,0],aura:'#ffffff',f:A=>{A.rise(16,-17,17,-2,36,.35,'#fff0d8',.5,16)}}};
for(const k of Object.keys(M1X)){const base=MON.reg[k];if(!base)continue;const X=M1X[k];MON.reg[k]=A=>{A.bbox=X.bb;A.aura=X.aura;base(A);try{X.f(A)}catch(e){}}}

