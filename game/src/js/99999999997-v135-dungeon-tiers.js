/* v135: 봉인 보관소(던전) 난이도별 디자인 + 아르카 꾸미기
   - 난이도 단계 tr: 쉬움 0 · 보통 1 · 어려움 2 · 익스트림 3 (탑 잡몹 v75와 같은 방식, mobFrame이 A.o.tier를 넘겨줌)
   - 아르카(c_dgarca): 모든 난이도에 망토 · 금장식 · 봉인 부적, 보통부터 룬 고리, 어려움부터 책장 날개 · 사슬 · 열쇠 뿔, 익스트림은 붉은 봉인 · 불타는 책장 · 잉크 눈
   - 던전 괴물 6종: 보통 부적 · 눈빛 → 어려움 금사슬 · 밀랍 봉인 · 룬 → 익스트림 불타는 종이 · 붉은 기운 · 봉인 문양
   - 바닥 · 보스방: 난이도마다 덧그림(봉인 원 · 사슬 · 금빛 룬 · 붉은 균열 · 떠다니는 책장 · 불티)
   99999999995의 floor · bossBg · drawBoss가 DG135.floorUnder/bossUnder/bossBack/bossFront/bossK를 부른다. */
(function(){try{
 const TR=()=>({easy:0,normal:1,hard:2,extreme:3}[typeof diff!=='undefined'?diff:'normal']||0);
 const mix=(a,b,k)=>{try{return monMix(a,b,k)}catch(e){return a}};
 const monMixS=c=>mix(c,'#000000',.35);
 const R0=n=>{let s=n*9301+49297;return()=>{s=(s*9301+49297)%233280;return s/233280}};

 /* ================= ① 아르카: 앞 · 옆모습, 걷기, 공격마다 준비 → 내려치기 자세 =================
    o.view 'front'|'side'(오른쪽을 봄, 왼쪽은 drawBoss가 뒤집음) · o.walk 걷기 위상 · o.sk 기술 · o.ph 'wind'|'act'|'stun' · o.q 진행 0~1 */
 const POSE={
  idle:(q,t,sd)=>({h:sd?[[-5,-22+Math.sin(t*2)],[12,-22+Math.sin(t*2+1)]]:[[-22,-22+Math.sin(t*2)],[22,-22+Math.sin(t*2+1)]]}),
  slam_wind:(q,t,sd)=>{const e=1-Math.pow(1-q,2);return {lean:sd?-3*e:0,cr:-1.5*e,h:sd?[[2,-22-27*e],[6,-22-27*e]]:[[-22+12*e,-22-26*e],[22-12*e,-22-26*e]],tome:{x:sd?4:0,y:-22-27*e,open:0,show:e>.15},eye:1+.3*e,shake:q>.8?.5:0}},
  slam_act:(q,t,sd)=>{const e=Math.min(1,q*4);return {lean:sd?4*e:0,cr:4*e-Math.max(0,q-.6)*6,h:sd?[[12,-49+43*e],[16,-49+43*e]]:[[-10+4*e,-49+43*e],[10-4*e,-49+43*e]],tome:{x:sd?18:0,y:-49+44*e,open:e,show:1},quake:e>=1?1-(q-.25)/.75:0,eye:1.3}},
  pages_wind:(q,t,sd)=>({open:q,h:sd?[[-8,-30-8*q],[18,-30-10*q]]:[[-22-2*q,-26-14*q],[22+2*q,-26-14*q]],spin:q,eye:1+.2*q}),
  pages_act:(q,t,sd)=>({open:1,h:sd?[[-12,-46],[26,-44]]:[[-31,-44],[31,-44]],spin:1,burst:1-q,lean:sd?-2:0,eye:1.4}),
  beam_wind:(q,t,sd)=>({eye:1+q*1.4,charge:q,h:sd?[[2,-30],[8,-31]]:[[-7,-29],[7,-29]],lean:sd?2*q:0,cr:.5*q}),
  beam_act:(q,t,sd)=>({eye:2.4-q*.6,fire:1-q,h:sd?[[-2,-34],[4,-34]]:[[-12,-36],[12,-36]],lean:sd?-2.5*(1-q):0,cr:-1*(1-q)}),
  sweep_wind:(q,t,sd)=>{const e=1-Math.pow(1-q,2);return {lean:sd?-2.5*e:-2*e,h:sd?[[-6,-24],[12-26*e,-26-14*e]]:[[-22,-22],[22-40*e,-24-16*e]],eye:1+.2*e,twist:e}},
  sweep_act:(q,t,sd)=>{const e=Math.min(1,q*3.2);return {lean:sd?3.5*e:2*e,h:sd?[[-6,-24],[-14+46*e,-40+22*e]]:[[-22,-22],[-18+52*e,-40+20*e]],whip:{e,q},eye:1.3}},
  summon_wind:(q,t,sd)=>({h:sd?[[0,-30-20*q],[10,-30-22*q]]:[[-20+4*q,-26-24*q],[20-4*q,-26-24*q]],runes:q,tome:{x:sd?16:0,y:-26,open:q,show:q>.1,float:1},eye:1+.3*q}),
  summon_act:(q,t,sd)=>({h:sd?[[-2,-52],[12,-52]]:[[-18,-52],[18,-52]],runes:1,flash:1-q,tome:{x:sd?16:0,y:-26,open:1,show:1,float:1},eye:1.5}),
  stun:(q,t,sd)=>({cr:3,lean:sd?-2:Math.sin(t*3)*1.2,h:sd?[[-2,-6],[8,-6]]:[[-18,-6],[18,-6]],eye:.5,dizzy:1})};
 if(typeof MON!=='undefined'){const R=MON.reg;
  R.c_dgarca=A=>{const tr=TR(),t=A.t,o=A.o,sd=o.view==='side',rage=!!(o.rage||tr>=3),
    GD='#c9a24a',GL='#ffd84a',RED='#ff3a5a',C1=tr>=3?'#2a0e20':'#2a1a3a',C2=tr>=3?'#4a1a30':'#4a3058',C3=tr>=3?'#6a2a40':'#6a4a78',
    CL=tr>=3?'#2a0a18':'#1c1230',CL2=tr>=3?'#4a1426':'#30204a',EY=rage?'#ff5a7a':'#c9a8ff',PG=tr>=3?'#f0c8b0':'#efe4c8',WD='#4a2e18',WL='#7a5030',WM='#5a3a20';
   const eRing=(cx,cy,rx,ry,col,al,n)=>{n=n||Math.round(rx*1.6);for(let i=0;i<n;i++){const a=i*TAU/n;A.R(cx+Math.cos(a)*rx-.5,cy+Math.sin(a)*ry-.5,1,1,col,al)}};
   const key=(o.sk||'')+'_'+(o.ph||''),pf=o.ph==='stun'?POSE.stun:POSE[key]||POSE.idle,S=Object.assign({lean:0,cr:0,open:0,eye:1},pf(Math.max(0,Math.min(1,o.q||0)),t,sd));
   const w=o.walk,ws=w==null?0:Math.sin(w*TAU),wb=w==null?Math.sin(t*1.6)*.8:-Math.abs(ws)*1.3,sh=S.shake?(Math.random()-.5)*S.shake:0,b=wb+S.cr,lx=S.lean+sh;/* b: 몸 위아래, lx: 몸 앞뒤 기울기 */
   /* --- 땅: 소환 룬 · 내려치기 충격 --- */
   if(S.runes){const r=22+S.runes*6;eRing(sd?6:0,0,r,r*.3,EY,.35+.4*S.runes);for(let i=0;i<10;i++){const a=t*1.5+i*TAU/10;A.R((sd?6:0)+Math.cos(a)*r-.6,Math.sin(a)*r*.3-.6,1.2,1.2,GL,.8)}if(S.flash)A.glow(sd?6:0,-2,30,EY,S.flash)}
   if(S.quake){{const r1=10+20*(1-S.quake),r2=6+12*(1-S.quake);eRing(sd?18:0,0,r1,r1*.3,'#ffffff',S.quake*.8);eRing(sd?18:0,0,r2,r2*.3,EY,S.quake)}}
   A.E(lx*.3,1,sd?16:22,2.6,'#000',.45);
   /* --- 뒤: 룬 고리 · 책장 날개 --- */
   const HX=(sd?2:0)+lx,HY=-44+b;
   if(tr>=1&&!S.dizzy){const r=tr>=3?13:11,col=tr>=3?RED:GD;if(sd){A.ring(HX-3,HY,r*.9,.7,col,.7)}else{A.ring(HX,HY,r,.7,col,.8);for(let i=0;i<8;i++){const a=t*.8*(tr>=3?-1:1)+i*Math.PI/4;A.R(HX+Math.cos(a)*r-.7,HY+Math.sin(a)*r-.7,1.4,1.4,i%2?col:'#ffffff',.9)}}A.glow(HX,HY,r+3,col,.35)}
   if(tr>=2){const sides=sd?[-1]:[-1,1],spread=1+(S.spin||0)*.35+(S.burst||0)*.3;for(const s of sides)for(let i=0;i<5;i++){const a=(-.35-i*.26*spread)+Math.sin(t*2+i)*.05,ca=Math.cos(a),sa=Math.sin(a),x0=(sd?-6:s*16)+lx,y0=-38+b,L=14+i*1.6-(i===4?3:0),ww=3.2;
     const ex=x0+s*ca*L,ey=y0+sa*L,nx=-sa*ww*s,ny=ca*ww*.5;A.P([[x0,y0],[ex,ey],[ex+nx,ey+ny+2],[x0+nx*.3,y0+3]],PG);A.L(x0+s*ca*3,y0+sa*3+1,ex,ey+1,'#8a7a5a',.4,.7);if(tr>=3){A.R(ex-1,ey-1.6,2,2,'#ff8a3a',.9);A.R(ex-.5,ey-2.6,1,1,'#ffd84a',.9)}}}
   /* 망토: 어깨에서 바닥까지, 걸으면 뒤로 날림 */{const hem=[],n=8,fl=sd?(w==null?0:Math.abs(ws)*3)+2:0;for(let i=0;i<=n;i++){const x=sd?-14+i*22/n-fl*(1-i/n):-23+i*46/n;hem.push([x,(i%2?-1:1.4)+Math.sin(t*2.4+i)*.6])}
    if(sd){A.P([[-6+lx,-40+b],[6+lx,-40+b],...hem.reverse()],CL);A.L(-6+lx,-40+b,-14-fl,1,GD,.8,.9)}
    else{A.P([[-17+lx,-40+b],[17+lx,-40+b],...hem.reverse()],CL);A.P([[-15+lx,-39+b],[15+lx,-39+b],[19,-4],[-19,-4]],CL2);A.L(-17+lx,-40+b,-23,1,GD,.8,.9);A.L(17+lx,-40+b,23,1,GD,.8,.9)}}
   /* --- 팔: 사슬 + 종이 장갑 --- */
   const arm=(sx,sy,hx,hy,back)=>{const n=7;for(let i=0;i<=n;i++){const q=i/n,x=sx+(hx-sx)*q,y=sy+(hy-sy)*q+Math.sin(q*Math.PI)*3+Math.sin(t*3+i)*.4;A.ring(x,y,1.4,.6,back?'#5a5470':'#8a84a0')}
    A.R(hx-3.4,hy-3,6.8,7,back?'#b8ac90':'#efe4c8');A.R(hx-3.4,hy-3,6.8,1,'#ffffff',back?.2:.6);for(let i=0;i<3;i++)A.R(hx-2.4,hy-.6+i*1.6,4.8,.5,'#8a7a5a');if(o.ph==='act'||S.charge>.5)A.glow(hx,hy,6,o.ph==='act'?GL:EY,.7)};
   const H=S.h;
   /* 다리: 책 더미 기둥 — 걸을 때 번갈아 들림 */
   const legs=sd?[[-4,1,Math.max(0,-ws)*3],[4,0,Math.max(0,ws)*3]]:[[-9,0,Math.max(0,ws)*3],[9,0,Math.max(0,-ws)*3]],BK=['#7a2a3a','#2a4a7a','#3a6a3a','#8a6a2a'];
   for(const [x,back,up] of legs){const ww=sd?8:10;for(let i=0;i<4;i++){const c=BK[(i+(x>0?2:0))%4],y=-4-i*3.6-up+(i>1?S.cr*.5:0);A.R(x-ww/2+(i>1?lx*.3:0),y,ww,3.4,back?monMixS(c):c);A.R(x-ww/2+(i>1?lx*.3:0),y,ww,.7,'#ffffff',back?.1:.25);A.R(x-ww/2+(i>1?lx*.3:0),y+2.8,ww,.5,'#000',.3)}}
   if(sd)arm(-4+lx,-36+b,H[0][0]+lx,H[0][1]+b*.5,1);
   /* --- 몸통: 서랍장 --- */
   if(sd){const x0=-10+lx,y0=-38+b;A.R(x0,y0,20,24,WD);A.R(x0+.8,y0+.8,18.4,22.4,WL);A.R(x0+.8,y0+.8,18.4,1.4,'#9a6a40');for(let i=0;i<4;i++)A.R(x0+2+i*4.4,y0+3,.5,18,'#5a3a20',.5);
    for(let r=0;r<3;r++){const out=S.open*(5-r*1.2),y=y0+3+r*7;A.R(x0+18+out-1,y,2+0,6,WM);A.R(x0+18,y,out,6,'#3a2414');if(out>.5){A.R(x0+18.5,y-.6,out,1.2,PG);A.R(x0+19+out-1.4,y+2,1.4,2.2,GD)}else A.R(x0+19.4,y+2.6,1,1,GD)}
    A.C(x0+20.6,-27+b,2.4,'#120818');A.C(x0+20.6,-27+b,1.6,EY);A.glow(x0+21,-26+b,7+S.eye*3,EY,.8)}
   else{const x0=-15+lx,y0=-38+b;A.R(x0,y0,30,24,WD);A.R(x0+.8,y0+.8,28.4,22.4,WL);A.R(x0+.8,y0+.8,28.4,1.4,'#9a6a40');
    for(let r=0;r<3;r++)for(let c=0;c<2;c++){const x=x0+2+c*13.4,y=y0+3+r*7,op=S.open*(1.6-r*.3);if(op>.2){A.R(x,y-op,12.6,op,'#120818');A.R(x+1,y-op,10.6,Math.min(op,1),PG,.9)}A.R(x,y,12.6,6,WM);A.R(x+.4,y+.4,11.8,1,'#8a5a34');A.R(x+5,y+2.6,2.6,1,GD)}
    const cy=-27+b,cr=4.2+(S.charge||0)*1.4;A.C(lx,cy,cr,'#120818');A.C(lx,cy,cr-1.2,EY);A.P([[lx-1.4,cy+1.6],[lx+1.4,cy+1.6],[lx+2,cy+5.4],[lx-2,cy+5.4]],'#120818');A.C(lx,cy-.6,1.4,'#ffffff',.8);A.glow(lx,cy+1,10+(S.charge||0)*8,EY,.9)}
   /* 금 모서리 장식 */if(!sd)for(const [x,y] of [[-15,-38],[13.6,-38],[-15,-15.6],[13.6,-15.6]]){A.R(x+lx,y+b,1.4,1.4,GL);A.R(x+lx+(x<0?1.4:-1.4),y+b,1.4,.6,GD);A.R(x+lx,y+b+(y<-20?1.4:-1.4),.6,1.4,GD)}
   /* 봉인 부적 */for(const s of (sd?[1]:[-1,1])){const sw=Math.sin(t*2.2+s)*1.2-(w!=null&&sd?2:0),x=(sd?6:s*7)+lx,y=-14.4+b;A.P([[x-1.6,y],[x+1.6,y],[x+1.6+sw,y+7],[x-1.6+sw,y+7]],tr>=3?'#e8c070':'#f3e2a0');A.R(x-.6+sw*.5,y+2,1.2,2.6,tr>=3?'#7a0a1a':'#c0303a')}
   if(tr>=1&&!sd)for(let i=0;i<4;i++){const ph=(t*1.4+i*.7)%2;A.R(-11+i*7+lx,-17.6+b,1,1,tr>=3?RED:'#8de4ff',.4+.5*Math.abs(Math.sin(ph*Math.PI)))}
   if(tr>=2){for(let i=0;i<9;i++){const q=i/8;A.ring((sd?-10+20*q:-15+30*q)+lx,-34+b+16*q,1.1,.5,GD,.95)}}
   /* 어깨 */if(sd){A.E(2+lx,-36+b,5,4,C2);A.E(2+lx,-36.6+b,4.2,3.2,C3)}else for(const s of [-1,1]){A.E(s*17+lx,-36+b,5.4,4,C2);A.E(s*17+lx,-36.6+b,4.6,3.2,C3)}
   /* --- 머리: 두건 · 열쇠구멍 외눈 --- */
   if(sd){A.E(HX,HY,8,7.6,C1);A.E(HX+.4,HY-.6,7.2,6.8,C2);A.P([[HX-7,HY-2],[HX-9,HY-10],[HX-1,HY-6]],C1);A.P([[HX-5.6,HY-2.4],[HX-7.6,HY-8.6],[HX-1.6,HY-5.6]],C2);
    A.E(HX+4,HY+1,3.6,3.6,'#05030a');const er=Math.min(3.2,1.6*S.eye);A.C(HX+5,HY,er,EY);A.C(HX+4.6,HY-.8,.6,'#ffffff');A.glow(HX+5,HY+1,6+S.eye*4,EY,1)}
   else{A.E(HX,HY,8.6,7.6,C1);A.E(HX,HY-.6,7.8,6.8,C2);A.P([[HX-8,HY-2],[HX,HY-11],[HX+8,HY-2]],C1);A.P([[HX-6.6,HY-2.6],[HX,HY-9.4],[HX+6.6,HY-2.6]],C2);
    A.E(HX,HY+1,5,4,'#05030a');const er=Math.min(3.6,2.4*S.eye);A.C(HX,HY,er,EY);A.P([[HX-1,HY+1],[HX+1,HY+1],[HX+1.4,HY+3.4],[HX-1.4,HY+3.4]],EY);A.C(HX-.6,HY-.8,.7,'#ffffff');A.glow(HX,HY+1,8+S.eye*4,EY,1)}
   if(S.charge){const n=3;for(let i=0;i<n;i++){const k=((t*2+i/n)%1),r=10*(1-k)+2;A.ring(HX+(sd?5:0),HY,r,.5,EY,S.charge*k)}}
   if(S.fire)A.glow(HX+(sd?6:0),HY+1,16,'#ffffff',S.fire*.9);
   if(tr>=2){for(const s of (sd?[-1]:[-1,1])){A.L(HX+s*7,HY-5,HX+s*12,HY-10,GL,1.2);A.ring(HX+s*12.6,HY-10.6,1.6,.7,GL);A.R(HX+s*7.4-.5,HY-4,1.6,1,GL)}}
   if(S.dizzy)for(let i=0;i<3;i++){const a=t*4+i*TAU/3;A.R(HX+Math.cos(a)*9-1,HY-9+Math.sin(a)*2-1,2,2,'#ffe79a')}
   /* 앞 팔 */if(sd)arm(4+lx,-36+b,H[1][0]+lx,H[1][1]+b*.5,0);else{arm(-17+lx,-34+b,H[0][0]+lx,H[0][1]+b*.5,0);arm(17+lx,-34+b,H[1][0]+lx,H[1][1]+b*.5,0)}
   /* 손에 든 큰 책 */if(S.tome&&S.tome.show){const T0=S.tome,x=T0.x+lx,y=T0.y+(T0.float?Math.sin(t*3)*1.2:0),op=T0.open;
    if(op<.5){A.R(x-6,y-4.5,12,9,'#3a1a4a');A.R(x-5.4,y-3.9,10.8,7.8,'#5a2a6a');A.R(x-1,y-4.5,2,9,GD);A.C(x,y,1.6,EY)}
    else{A.P([[x-10,y-3],[x,y-1],[x,y+3],[x-10,y+1]],PG);A.P([[x,y-1],[x+10,y-3],[x+10,y+1],[x,y+3]],'#e0d4b4');for(let i=0;i<3;i++){A.L(x-8,y-1.6+i*1.2,x-2,y-.6+i*1.2,'#8a7a5a',.4);A.L(x+2,y-.6+i*1.2,x+8,y-1.6+i*1.2,'#8a7a5a',.4)}A.glow(x,y-2,10,EY,.6*op)}}
   /* 휘두른 사슬 궤적 */if(S.whip){const e=S.whip.e,al=1-S.whip.q;for(let i=0;i<10;i++){const a=-1.6+i/9*2.2*e,r=26;A.R((sd?4:0)+lx+Math.cos(a)*r-.8,-30+Math.sin(a)*r*.8-.8,1.6,1.6,i%2?'#ffffff':EY,al*.9)}}
   /* 책장 폭발 · 회오리 */if(S.spin){const n=S.burst?10:6;for(let i=0;i<n;i++){const a=t*(2+S.spin*3)+i*TAU/n,r=(S.burst?20+14*(1-S.burst):16+4*S.spin);if(Math.abs(Math.cos(a)*r)>37)continue;A.R(lx+Math.cos(a)*r-1.6,-28+b+Math.sin(a)*r*.5-1.2,3.2,2.4,PG,.9)}}
   else for(let i=0;i<3;i++){const a=t*.9+i*TAU/3;A.R(Math.cos(a)*24-2,-30+b+Math.sin(a)*8-1.6,4,3,PG,Math.sin(a)>0?.9:.35)}
   if(tr>=3){for(let i=0;i<3;i++){const a=t*1.1+i*TAU/3,x=Math.cos(a)*30,y=-24+b+Math.sin(a)*6;if(Math.abs(x)>36)continue;A.E(x,y,2.6,1.8,'#120818');A.C(x,y,1.1,RED);A.C(x-.3,y-.4,.4,'#ffffff');A.R(x-.5,y+1.6,1,2+Math.sin(t*3+i),'#120818',.8)}
    A.rise(10,-22,22,-2,46,.5,'#ff6a3a',.9,7);A.glow(0,-26+b,30,RED,.35);A.aura=RED;A.rim='rgba(255,90,122,.8)'}
   else{A.rise(6,-14,14,-10,30,.4,EY,.8,3);A.aura=EY;if(tr>=2)A.rim='rgba(255,226,140,.6)';if(rage)A.rim='rgba(255,90,122,.7)'}
   A.bbox=[-38,-57,38,3]};
 }
 /* 보스 상태 → 그림 옵션 (걷기 위상 · 바라보는 쪽 · 기술 진행) */
 const BS={x:0,y:0,w:0,v:'front',fx:1,vt:0};
 function bossO(b,now,o0){const dx=b.x-BS.x,dy=b.y-BS.y,mv=Math.hypot(dx,dy);BS.x=b.x;BS.y=b.y;const o=Object.assign({},o0);
  const px=(typeof P!=='undefined'?P.x:b.x)-b.x,py=(typeof P!=='undefined'?P.y:b.y)-b.y;
  if(b.st==='idle'&&mv>.05&&mv<20){BS.w=(BS.w+mv/26)%1;o.walk=BS.w;if(now-BS.vt>250){const nv=Math.abs(dx)>Math.abs(dy)*.7?'side':'front';if(nv!==BS.v){BS.v=nv;BS.vt=now}}if(Math.abs(dx)>.05)BS.fx=dx>0?1:-1}
  else if(b.st==='wind'||b.st==='act'){if(b.st==='wind'&&now-b.t<80){BS.v=Math.abs(px)>Math.abs(py)*1.1?'side':'front';BS.fx=px>=0?1:-1}}
  else if(b.st==='idle'&&now-BS.vt>600){BS.v='front';BS.vt=now}
  o.view=BS.v;o.fx=BS.fx;
  if(b.st==='wind'){const wd={slam:900,pages:600,pages2:500,beam:750,sweep:650,summon:900}[b.sk]*(b.ph2?.85:1);o.sk=b.sk==='pages2'?'pages':b.sk;o.ph='wind';o.q=(now-b.t)/wd}
  else if(b.st==='act'){o.sk=b.sk==='pages2'?'pages':b.sk;o.ph='act';o.q=(now-b.t)/420}
  else if(b.st==='stun'){o.ph='stun';o.q=(now-b.t)/1400}
  return o}

 /* ================= ② 던전 괴물 6종: 난이도 꾸밈 ================= */
 if(typeof MON!=='undefined'){const R=MON.reg;
  /* t: 머리 꼭대기 y, c: 몸 가운데 y, w: 몸 반폭 */
  const ANC={dgmimic:{t:-20,c:-10,w:8},dgmoth:{t:-21,c:-15,w:5},dgink:{t:-21,c:-12,w:7},dgspider:{t:-11,c:-6,w:6},dglock:{t:-24,c:-12,w:8},dgknight:{t:-25,c:-12,w:6}};
  const tierPal=(p,tr)=>tr>=3?{a:mix(p.a,'#4a1030',.25),b:mix(p.b,'#1a0010',.3),c:mix(p.c,'#ff3a5a',.55),n:p.n}:tr>=2?{a:mix(p.a,'#000000',.1),b:p.b,c:mix(p.c,'#ffd84a',.25),n:p.n}:p;
  function deco(k,A){const tr=A.o.tier||0;if(!tr)return;const n=ANC[k],t=A.t,side=(A.o.view||'front')==='side',back=A.o.view==='back',hx=side?1.5:0,bob=A.o.walk!=null?-Math.abs(Math.sin(A.o.walk*TAU))*.8:Math.sin(t*2.4)*.35;
   /* 보통: 봉인 부적 한 장 · 눈빛 */if(!back){const sw=Math.sin(t*3.3)*.6;A.P([[hx-1.4,n.c-3+bob],[hx+1.4,n.c-3+bob],[hx+1.4+sw,n.c+2.4+bob],[hx-1.4+sw,n.c+2.4+bob]],tr>=3?'#e8c070':'#f3e2a0');A.R(hx-.5+sw*.5,n.c-2+bob,1,2.6,tr>=3?'#6a0a1a':'#c0303a')}
   A.glow(hx,n.t+4,4,tr>=3?'#ff3a5a':'#ffe9a8',.4);
   if(tr>=2){/* 어려움: 금사슬 띠 · 밀랍 봉인 · 머리 위 룬 */for(let i=0;i<5;i++)A.ring(-n.w+hx+i*n.w/2,n.c+3.2+bob+(i%2)*.5,.8,.4,'#c9a24a',.95);
    A.C(hx+n.w*.55,n.c+3.6+bob,1.3,'#a01a2a');A.C(hx+n.w*.55,n.c+3.4+bob,.6,'#ff6a6a');
    const ry=n.t-3+Math.sin(t*2.5)*.8;A.R(hx-.6,ry-1.6,1.2,3.2,'#ffd84a',.85);A.R(hx-1.6,ry-.6,3.2,1.2,'#ffd84a',.85);A.glow(hx,ry,3,'#ffd84a',.6)}
   if(tr>=3){/* 익스트림: 불타는 종이 조각 · 붉은 기운 · 뿔 같은 말린 두루마리 */for(const s of (side?[1]:[-1,1])){A.P([[s*2+hx,n.t+2],[s*3.6+hx,n.t+1],[s*6+hx,n.t-4],[s*4.4+hx,n.t-.6]],'#efe0c0');A.R(s*6+hx-.6,n.t-5,1.2,1.2,'#ff6a3a')}
    A.rise(6,-n.w,n.w,n.c+4,16,.7,'#ff6a3a',.8,k.length);A.glow(0,n.c,n.w*2.4,'#ff2d55',.5);A.aura='#ff2d55';A.rim='rgba(255,110,130,.75)'}
   else if(tr>=2)A.rim=A.rim||'rgba(255,226,140,.45)'}
  for(const k of Object.keys(ANC)){const b0=R['m_'+k];if(!b0)continue;R['m_'+k]=A=>{const tr=A.o.tier||0;if(tr>=2&&A.o.pal)A.o.pal=tierPal(A.o.pal,tr);b0(A);try{deco(k,A)}catch(e){}}}
 }

 /* ================= ③ 바닥 · 보스방 덧그림 ================= */
 const OV={};
 function floorLayer(band,tr){const key=band+'|'+tr;if(OV[key])return OV[key];const c=document.createElement('canvas'),K=3;c.width=W*K;c.height=H*K;const o=c.getContext('2d');o.scale(K,K);const r=R0(300+band*7+tr);
  const GD='rgba(201,162,74,',RD='rgba(255,58,90,';
  if(tr>=1){/* 보통: 바닥에 희미한 봉인 원 · 흩어진 종이 */for(let i=0;i<3;i++){const x=AX+60+r()*(AW-120),y=AY+80+r()*(AH-110),rr=16+r()*10;o.save();o.translate(x,y);o.scale(1,.45);o.strokeStyle=(tr>=3?RD:'rgba(180,150,255,')+'.35)';o.lineWidth=1.2;o.beginPath();o.arc(0,0,rr,0,TAU);o.stroke();o.beginPath();o.arc(0,0,rr-5,0,TAU);o.stroke();for(let j=0;j<6;j++){const a=j*TAU/6;o.fillStyle=(tr>=3?RD:GD)+'.5)';o.fillRect(Math.cos(a)*(rr-2.5)-1,Math.sin(a)*(rr-2.5)-1,2,2)}o.restore()}
   for(let i=0;i<14;i++){o.save();o.translate(AX+r()*AW,AY+64+r()*(AH-70));o.rotate(r()*3);o.fillStyle=tr>=3?'#c8a090':'#e8dcc0';o.globalAlpha=.55;o.fillRect(-2.5,-2,5,4);o.fillStyle='#8a7a5a';o.fillRect(-1.5,-.8,3,.5);o.restore()}}
  if(tr>=2){/* 어려움: 위쪽 벽에서 늘어진 사슬 · 바닥 금빛 룬 줄 */for(let i=0;i<6;i++){const x=AX+30+i*(AW-60)/5+(r()-.5)*16,L=14+r()*22;for(let y=AY;y<AY+L;y+=3){o.strokeStyle='#6a6070';o.lineWidth=1;o.strokeRect(x-1+(y/3%2),y,2,3)}o.fillStyle='#8a8090';o.fillRect(x-2,AY+L,4,3)}
   o.strokeStyle=GD+'.3)';o.lineWidth=1;for(let i=0;i<3;i++){const y=AY+90+i*60+r()*10;o.beginPath();o.moveTo(AX+20,y);for(let x=AX+20;x<AX+AW-20;x+=12)o.lineTo(x,y+(Math.floor(x/12)%2?2:-2));o.stroke()}}
  if(tr>=3){/* 익스트림: 붉은 빛이 새는 균열 · 붉은 그늘 */for(let i=0;i<6;i++){let x=AX+30+r()*(AW-60),y=AY+70+r()*(AH-90);o.strokeStyle=RD+'.55)';o.lineWidth=1.4;o.shadowColor='#ff2d55';o.shadowBlur=6;o.beginPath();o.moveTo(x,y);for(let j=0;j<6;j++){x+=(r()-.5)*22;y+=(r()-.3)*10;o.lineTo(x,y)}o.stroke();o.shadowBlur=0}
   const g=o.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(120,0,30,.25)');g.addColorStop(1,'rgba(60,0,20,.12)');o.fillStyle=g;o.fillRect(0,0,W,H)}
  return OV[key]=c}
 /* 움직이는 것: 떠다니는 종이 · 먼지 · 불티 */
 const FL=[];function drift(now,tr,n){if(tr<1)return;const want=tr>=3?16:tr>=2?10:5;while(FL.length<want)FL.push({x:AX+Math.random()*AW,y:AY+Math.random()*AH,ph:Math.random()*TAU,s:.5+Math.random(),k:Math.random()});FL.length=want;
  ctx.save();for(const f of FL){const tt=now/1000;f.y+=(tr>=3?-.25:.12)*f.s;f.x+=Math.sin(tt*f.s+f.ph)*.25;if(f.y>AY+AH)f.y=AY+40;if(f.y<AY+30)f.y=AY+AH;
   if(tr>=3&&f.k<.6){ctx.globalAlpha=.5+.4*Math.sin(tt*4+f.ph);ctx.fillStyle=f.k<.3?'#ff6a3a':'#ffd84a';ctx.fillRect(f.x,f.y,1.5,1.5)}
   else{ctx.globalAlpha=.55;ctx.translate(f.x,f.y);ctx.rotate(Math.sin(tt*1.5*f.s+f.ph)*.8);ctx.fillStyle=tr>=3?'#d8a890':'#efe4c8';ctx.fillRect(-2.5,-1.6,5,3.2);if(tr>=3){ctx.fillStyle='#ff6a3a';ctx.fillRect(1.5,-1.6,1,3.2)}ctx.setTransform(SS,0,0,SS,0,0)}}ctx.restore()}
 function floorUnder(now,band){const tr=TR();if(!tr)return;ctx.drawImage(floorLayer(band,tr),0,0,W,H);drift(now,tr)}

 /* 보스방: 모든 난이도에 책장 · 깃발 · 큰 봉인진, 난이도마다 더함 */
 const BR={};function bossLayer(tr){if(BR[tr])return BR[tr];const c=document.createElement('canvas'),K=3;c.width=W*K;c.height=H*K;const o=c.getContext('2d');o.scale(K,K);o.imageSmoothingEnabled=false;const r=R0(777+tr);
  /* 뒷벽 책장 */for(const bx of [AX+8,AX+52,AX+AW-92,AX+AW-48]){o.fillStyle='#24140c';o.fillRect(bx,AY+4,40,50);o.fillStyle='#3a2414';o.fillRect(bx+1,AY+5,38,48);for(let sh=0;sh<3;sh++){let x=bx+3;o.fillStyle='#24140c';o.fillRect(bx+1,AY+19+sh*16,38,2);while(x<bx+37){const w=2+Math.floor(r()*3),h=8+Math.floor(r()*5);o.fillStyle=(tr>=3?['#7a1a2a','#4a1020','#8a3a2a','#3a1a2a']:['#7a2a3a','#2a4a7a','#3a6a3a','#8a6a2a'])[Math.floor(r()*4)];o.fillRect(x,AY+19+sh*16-h,w,h);o.fillStyle='rgba(255,255,255,.15)';o.fillRect(x,AY+19+sh*16-h,w,1);x+=w}}}
  /* 열쇠 깃발 */for(const x of [AX+150,AX+AW-150]){const col=tr>=3?'#5a0a1a':tr>=2?'#3a1a5a':'#2a2050';o.fillStyle=col;o.beginPath();o.moveTo(x-11,AY+2);o.lineTo(x+11,AY+2);o.lineTo(x+11,AY+44);o.lineTo(x,AY+38);o.lineTo(x-11,AY+44);o.closePath();o.fill();o.fillStyle='#c9a24a';o.fillRect(x-11,AY+2,22,2);o.beginPath();o.arc(x,AY+16,4,0,TAU);o.fill();o.fillRect(x-1,AY+19,2,12);o.fillRect(x,AY+26,4,2);o.fillRect(x,AY+29,3,2);o.fillStyle=col;o.beginPath();o.arc(x,AY+16,1.6,0,TAU);o.fill()}
  /* 큰 봉인진(바닥) */{const x=W/2,y=AY+AH*.52,col=tr>=3?'255,58,90':tr>=2?'255,216,74':'180,150,255';o.save();o.translate(x,y);o.scale(1,.42);o.strokeStyle='rgba('+col+',.28)';o.lineWidth=2;for(const rr of [120,104,70])(o.beginPath(),o.arc(0,0,rr,0,TAU),o.stroke());
   o.lineWidth=1;o.beginPath();for(let i=0;i<=5;i++){const a=-Math.PI/2+i*TAU*2/5;o[i?'lineTo':'moveTo'](Math.cos(a)*104,Math.sin(a)*104)}o.stroke();
   for(let i=0;i<24;i++){const a=i*TAU/24;o.fillStyle='rgba('+col+',.4)';o.fillRect(Math.cos(a)*112-1.5,Math.sin(a)*112-1.5,3,3)}o.restore()}
  if(tr>=2){for(let i=0;i<8;i++){const x=AX+20+i*(AW-40)/7,L=12+r()*30;for(let y=AY;y<AY+L;y+=3){o.strokeStyle='#6a6070';o.strokeRect(x-1+(y/3%2),y,2,3)}o.fillStyle='#c9a24a';o.fillRect(x-1.5,AY+L,3,4)}}
  if(tr>=3){for(let i=0;i<8;i++){let x=AX+20+r()*(AW-40),y=AY+70+r()*(AH-80);o.strokeStyle='rgba(255,58,90,.6)';o.lineWidth=1.5;o.shadowColor='#ff2d55';o.shadowBlur=7;o.beginPath();o.moveTo(x,y);for(let j=0;j<7;j++){x+=(r()-.5)*26;y+=(r()-.3)*12;o.lineTo(x,y)}o.stroke();o.shadowBlur=0}
   const g=o.createRadialGradient(W/2,H*.5,40,W/2,H*.5,300);g.addColorStop(0,'rgba(120,0,30,.08)');g.addColorStop(1,'rgba(90,0,20,.35)');o.fillStyle=g;o.fillRect(0,0,W,H)}
  return BR[tr]=c}
 function bossUnder(now){const tr=TR();ctx.drawImage(bossLayer(tr),0,0,W,H);
  /* 봉인진이 천천히 숨 쉬듯 빛남 */{const x=W/2,y=AY+AH*.52,col=tr>=3?'255,58,90':tr>=2?'255,216,74':'180,150,255';ctx.save();ctx.translate(x,y);ctx.scale(1,.42);ctx.rotate(now/(tr>=3?2500:5000));ctx.globalAlpha=.25+.15*Math.sin(now/600);ctx.strokeStyle='rgba('+col+',1)';ctx.lineWidth=1.5;ctx.setLineDash([6,10]);ctx.beginPath();ctx.arc(0,0,88,0,TAU);ctx.stroke();ctx.setLineDash([]);ctx.restore()}
  drift(now,Math.max(1,tr))}

 /* 보스 뒤 · 앞 빛 (그림판 밖으로 넓게 퍼지는 것만) */
 function bossBack(b,now,al,k){const tr=TR(),col=tr>=3?'255,45,85':tr>=2?'255,216,74':'180,150,255';ctx.save();ctx.globalAlpha=al;ctx.globalCompositeOperation='lighter';
  const g=ctx.createRadialGradient(b.x,b.y-30*k,4,b.x,b.y-30*k,(tr>=2?70:52)*k/1.6);g.addColorStop(0,'rgba('+col+','+(.18+tr*.05)+')');g.addColorStop(1,'rgba('+col+',0)');ctx.fillStyle=g;ctx.fillRect(b.x-90,b.y-130,180,150);ctx.restore()}
 function bossFront(b,now,al,k){const tr=TR();if(tr<2||b.st==='dead')return;/* 어려움부터: 보스 둘레를 도는 책 세 권 */ctx.save();ctx.globalAlpha=al;for(let i=0;i<3;i++){const a=now/900+i*TAU/3,x=b.x+Math.cos(a)*44*k/1.6,y=b.y-40*k/1.6+Math.sin(a)*10,fr=Math.sin(a)>0;if(!fr)continue;
   ctx.fillStyle=tr>=3?'#5a0a1a':'#3a2a5a';ctx.fillRect(x-5,y-4,10,8);ctx.fillStyle=tr>=3?'#f0c8b0':'#efe4c8';ctx.fillRect(x-4,y-3,8,6);ctx.fillStyle='#c9a24a';ctx.fillRect(x-.5,y-4,1,8);if(tr>=3){ctx.fillStyle='#ff6a3a';ctx.fillRect(x+3,y-5,2,2)}}ctx.restore()}
 const bossK=()=>[1.6,1.7,1.8,1.9][TR()];

 window.DG135={TR,floorUnder,bossUnder,bossBack,bossFront,bossK,bossO,POSE};
}catch(e){console.warn('v135',e)}})();
