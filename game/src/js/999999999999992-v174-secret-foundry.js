/* ================= v174 두 번째 비밀 · 잊힌 주조소 (FD174) =================
   ① 태엽 공방의 부엉이를 누르면 말을 한다. 50번 누르면 공방이 반으로 갈라지며 「비밀 작업실」이 나오고, 책상 위 「봉인 설계도」를 가져갈 수 있다.
   ② 광장 성벽의 「녹슨 철문」에 설계도를 넣으면 문이 열린다(saveData.fd174.door). 열린 문으로 걸어 들어가면 던전.
   ③ 잊힌 주조소 20웨이브: 탑 오르기 경기장을 그대로 빌려 쓴다(TW71 · T.ext) → 탑의 전투 기능(박자 · 치명 · 스킬 · 펫 · 패링 · 궁극기 …)이 모두 같다.
      새 몬스터 6종(톱니 병정 · 기름 나방 · 태엽 사냥개 · 램프 마녀 · 압착 골렘 · 스파크 정령) — 난이도마다 모습이 다르다
      (쉬움 녹슨 구리 · 보통 황동 · 어려움 강철 갑옷 · 익스트림 흑요석 + 달아오른 균열과 불꽃). 20웨이브는 보스 「주조 군주 기어하트」.
   ④ 깨면 공방 무기 칸에 비밀 무기 「클라비스의 검」이 나타난다(🪙 10,000으로 사야 씀). 전용 궁극기 「봉인 해제 · 천 개의 열쇠」.
   기록: saveData.fd174 = {owl 부엉이 누른 수, paper 설계도, door 철문 열림, clear 깬 횟수, best 최고 웨이브} */
(function(){try{
 if(!window.TW71||!TW71.SP||typeof MON==='undefined')return;
 const TAU=Math.PI*2,$=id=>document.getElementById(id),num=n=>(+n||0).toLocaleString();
 const SV=()=>saveData.fd174||(saveData.fd174={owl:0,paper:0,door:0,clear:0,best:0});
 const save=()=>{try{saveNow()}catch(e){}};
 const mix=(a,b,k)=>{try{return monMix(a,b,k)}catch(e){return a}};

 /* ================= 새 몬스터 그림 (MON, 발밑 (0,0) · 40×40 칸: 위 35 · 좌우 20) ================= */
 /* 난이도 단계별 재질: 0 녹슨 구리 · 1 황동 · 2 강철 · 3 흑요석 */
 const TM=[{m:'#a8673a',d:'#5a3018',l:'#d89a6a',g:'#ffb060',k:'#2a1408'},{m:'#d8a848',d:'#7a5418',l:'#ffe08a',g:'#ffe79a',k:'#3a2408'},
  {m:'#8a98a8',d:'#3a4656',l:'#d8e2ec',g:'#7ad8ff',k:'#141c26'},{m:'#2a2230',d:'#0e0a12',l:'#5a4a62',g:'#ff4a2a',k:'#000000'}];
 const st=A=>{const o=A.o,w=o.walk,s=w==null?0:Math.sin(w*TAU),tr=o.tier||0;return {v:o.view||'front',s,walking:w!=null,k:o.atk?1:0,h:o.hit?1:0,bob:w!=null?-Math.abs(s)*.8:Math.sin(A.t*2.4/1000*1000/1000)*.35,tr,M:TM[tr]}};
 function fin(A,bb,S){A.bbox=bb;A.aura=A.o.elite?'#ffd166':S.M.g;if(A.o.elite)A.rim='rgba(255,226,140,.75)';if(S.tr>=3){A.aura='#ff4a2a';A.rim='rgba(255,120,80,.7)'}}
 /* 난이도 꾸밈: 1 빛나는 리벳 · 2 어깨 판 · 가시 · 3 뿔 · 달아오른 균열 · 불티 */
 function tierAdd(A,S,top,cy,w){const M=S.M,side=S.v==='side';if(S.tr>=1){for(const s of [-1,1])A.C(s*w*.7,cy,.55,M.l)}
  if(S.tr>=2){for(const s of (side?[1]:[-1,1])){A.P([[s*w,top+6],[s*(w+3),top+4],[s*(w+2.4),top+9],[s*w,top+10]],M.d);A.spike(s*(w+1.6),top+4.4,-1.57+s*.6,3,1.4,M.m,M.l)}}
  if(S.tr>=3){for(const s of (side?[1]:[-1,1])){A.P([[s*2,top+1],[s*3.6,top],[s*6.6,top-5],[s*4.6,top-1.4]],'#120a10');A.L(s*3.4,top-.4,s*6.2,top-4.6,'#ff6a3a',.5)}
   A.L(-w*.6,cy-3,-w*.1,cy+2,'#ff6a2a',.5);A.L(w*.5,cy-4,w*.1,cy+1,'#ff8a3a',.5);A.glow(0,cy,w*2.4,'#ff3a1a',.6);A.rise(6,-w,w,cy+3,16,.7,'#ff8a4a',.9,.3)}}
 const RG=MON.reg;
 /* 톱니 병정: 방패 든 태엽 병사 */
 RG.m_fd_cog=A=>{const S=st(A),M=S.M,t=A.t/1000,side=S.v==='side',b=S.walking?-Math.abs(S.s)*1.2:S.bob;
  for(const [x,sg] of side?[[-1,1],[1,-1]]:[[-4,1],[1.6,-1]]){const lift=Math.max(0,S.s*sg)*1.4,sw=side?S.s*1.8*sg:0;A.box(x+sw,-7-lift,2.6,7,M.d,M.k,M.m)}
  A.plate([[-6,-7+b],[6,-7+b],[7,-17+b],[-7,-17+b]],M.m,M.d,M.l);A.gear(side?1:0,-12+b,3.4,8,t*2,M.l,M.d,M.k);
  A.box(-4,-24+b,8,7,M.m,M.d,M.l);A.R(-4.5,-25+b,9,1.4,M.d);A.R(-1,-27.5+b,2,2.6,M.l);
  if(S.v!=='back'){A.R(-3+(side?2:0),-21.8+b,side?3.6:6,1.6,M.k);A.slit(-1.4+(side?2.4:0),-21+b,1.6,1.1,M.g);if(!side)A.slit(1.4,-21+b,1.6,1.1,M.g)}
  /* 방패 · 창 */const sx=side?5:-8.5,ab=S.k?-2:S.h?2:0;A.plate([[sx-2.6,-19+b],[sx+2.6,-19+b],[sx+3,-9+b],[sx,-6+b],[sx-3,-9+b]],M.d,M.k,M.m);A.gear(sx,-13+b,1.6,6,-t,M.g,M.d,M.k);
  if(!side||S.k||S.h){const hx=side?7:8,hy=-16+b+ab;A.L(hx,hy+8,hx+(S.h?6:1),hy-8-(S.h?0:2),'#5a3a1a',1.2);A.spike(hx+(S.h?6:1),hy-8-(S.h?0:2),S.h?-.6:-1.45,4,2,M.l,'#ffffff')}
  tierAdd(A,S,-26+b,-12+b,7);fin(A,[-12,-30,12,0],S)};
 /* 기름 나방: 날개에 기름 무늬, 촛불 같은 더듬이 */
 RG.m_fd_moth=A=>{const S=st(A),M=S.M,t=A.t/1000,fl=S.k?-1:S.h?.9:Math.sin(t*14),by=-14+Math.sin(t*6)*.7+(S.h?3:0),side=S.v==='side';
  const wc=S.tr>=3?'#3a1a10':S.tr>=2?'#4a5868':S.tr>=1?'#8a6a2a':'#6a4a30',wl=S.tr>=3?'#ff5a2a':M.g;
  for(const s of [-1,1]){const far=side&&s<0,ww=far?.55:1;A.P([[s*1.5,by-1],[s*12*ww,by-8+fl*5],[s*13*ww,by+1+fl*2],[s*3,by+3]],far?mix(wc,'#000',.4):wc);A.E(s*7*ww,by-2+fl*2.4,2.2*ww,1.6,wl,.8);A.C(s*10*ww,by-3+fl*3,.8,'#fff8d0',.8)
   A.P([[s*1.2,by+1],[s*8*ww,by+6+fl],[s*5*ww,by+9],[s*2,by+4]],mix(wc,'#000',.25))}
  A.E(0,by+1,2.4,5,M.m);A.E(0,by-1,1.8,2.6,M.l,.6);for(let i=0;i<3;i++)A.R(-1.8,by+1.6+i*1.3,3.6,.5,M.d);
  if(S.v!=='back'){A.C(-1,by-3,.8,M.g);A.C(1,by-3,.8,M.g)}for(const s of [-1,1]){A.L(s*.6,by-4,s*3,by-9,M.d,.6);A.C(s*3,by-9.4,.9,'#ffd166');A.glow(s*3,by-9.4,3,'#ffb040',.9)}
  A.E(0,-1,4,1,'#000',.25);if(S.tr>=3)A.rise(5,-6,6,by,12,.8,'#ff7a3a',.8,.2);if(S.tr>=2){A.spike(0,by+5.5,1.57,3,1.4,M.l)}fin(A,[-14,-26,14,0],S)};
 /* 태엽 사냥개: 네 발 · 등에 태엽 열쇠 */
 RG.m_fd_hound=A=>{const S=st(A),M=S.M,t=A.t/1000,side=S.v==='side',b=S.walking?-Math.abs(S.s):S.bob,run=S.k||S.h;
  const L=side?12:7;for(let i=0;i<4;i++){const fx=side?(i<2?-6:5)+(i%2)*1.6:(i%2?3.4:-5.4),sw=S.s*(i%2?1:-1)*1.6,lift=Math.max(0,S.s*(i%2?1:-1))*1.4;A.box(fx+sw,-5-lift,2,5,i<2&&side?M.d:M.m,M.k,M.l)}
  if(side){A.plate([[-9,-5+b],[8,-5+b],[9,-11+b],[-8,-12+b]],M.m,M.d,M.l);A.box(7,-14+b,7,5.4,M.m,M.d,M.l);A.R(12,-11+b,3,2.2,M.d);if(S.h){A.R(12,-9+b,3.6,1.4,'#ffffff');A.spike(15,-10+b,0,2,1.4,'#ffffff')}A.slit(10.4,-12.6+b,1.6,1.1,M.g);A.P([[8,-14+b],[9.6,-17+b],[11,-14+b]],M.d);A.L(-9,-10+b,-13,-14+b+Math.sin(t*9),M.d,1)}
  else{A.plate([[-7,-5+b],[7,-5+b],[8,-12+b],[-8,-12+b]],M.m,M.d,M.l);A.box(-4,-18+b,8,6.6,M.m,M.d,M.l);for(const s of [-1,1])A.P([[s*2.4,-18+b],[s*4.6,-21.4+b],[s*4.6,-17.6+b]],M.d);
   if(S.v!=='back'){A.slit(-1.8,-15+b,1.6,1.1,M.g);A.slit(1.8,-15+b,1.6,1.1,M.g);A.R(-2,-12.8+b,4,run?1.4:.8,M.k)}}
  /* 등의 태엽 */const kx=side?-2:0,ky=-13+b,r=t*(run?8:3);A.R(kx-.4,ky-3,.8,3,M.d);A.L(kx+Math.cos(r)*2.6,ky-3+Math.sin(r)*.8,kx-Math.cos(r)*2.6,ky-3-Math.sin(r)*.8,M.l,1.2);for(const s of [-1,1])A.C(kx+s*Math.cos(r)*2.6,ky-3+s*Math.sin(r)*.8,1,M.g);
  if(run)A.rise(4,-10,-4,-4,6,1.4,'#c8c0b0',1,.4);tierAdd(A,S,-19+b,-8+b,7);fin(A,[-15,-24,16,0],S)};
 /* 램프 마녀: 머리가 등불, 망토 */
 RG.m_fd_lamp=A=>{const S=st(A),M=S.M,t=A.t/1000,side=S.v==='side',b=S.bob,cast=S.k||S.h;
  const cl=S.tr>=3?'#1a0a14':S.tr>=2?'#2a3448':S.tr>=1?'#5a2a1a':'#3a2a1a';A.P([[-6,-1],[6,-1],[3.6,-17+b],[-3.6,-17+b]],cl);A.P([[-5,-1],[-1,-1],[-1.6,-15+b],[-3.6,-15+b]],mix(cl,'#fff',.08));
  for(let i=0;i<5;i++)A.R(-6+i*2.6,-1.4+Math.sin(t*4+i)*.4,1.6,1.4,cl);
  /* 등불 머리 */const hy=-22+b;A.box(-3.6,hy-4,7.2,8,M.m,M.d,M.l);A.R(-2.6,hy-3,5.2,6,'#2a1408');const fl=.75+.25*Math.sin(t*11);A.E(0,hy+.6,1.6*fl,2.4*fl,S.tr>=3?'#ff4a2a':'#ffd060');A.E(0,hy+1,.8,1.2,'#fff8d0');A.glow(0,hy,7,S.tr>=3?'#ff4a2a':'#ffb040',1.2);
  A.P([[-4.4,hy-4],[4.4,hy-4],[0,hy-8.6]],M.d);A.R(-.4,hy-10,.8,1.6,M.l);
  /* 지팡이 */const sx=side?5:7,sy=-14+b-(cast?3:0);A.L(sx,sy+14,sx+(cast?2:0),sy-4,'#5a3a1a',1);A.gear(sx+(cast?2:0),sy-5,1.8,6,t*3,M.g,M.d,M.k);if(cast){A.glow(sx+2,sy-5,6,M.g,1.2);A.rise(5,sx-2,sx+5,sy-4,10,1.2,M.g,.9,.5)}
  if(S.tr>=2){A.R(-4,-11+b,8,1.2,M.m);A.R(-4,-11+b,8,.4,M.l)}if(S.tr>=3){A.glow(0,-8,10,'#ff3a1a',.5);A.rise(6,-6,6,-4,16,.6,'#ff6a3a',.9,.1)}fin(A,[-10,-34,12,0],S)};
 /* 압착 골렘: 커다란 프레스 팔 */
 RG.m_fd_press=A=>{const S=st(A),M=S.M,t=A.t/1000,side=S.v==='side',b=S.walking?-Math.abs(S.s)*1.2:S.bob*.6,tw=side?.7:1;
  for(const [x,sg] of [[-7*tw,1],[2.6*tw,-1]]){const lift=Math.max(0,S.s*sg)*1.6;A.box(x,-6-lift,4.6,6,M.d,M.k,M.m)}
  A.plate([[-10*tw,-6+b],[10*tw,-6+b],[11*tw,-20+b],[-11*tw,-20+b]],M.m,M.d,M.l);A.vent(-5*tw,-15+b,4,4,M.g,S.k||S.tr>=2);A.vent(1.4*tw,-15+b,4,4,M.g,S.k||S.tr>=2);
  A.box(-4,-26+b,8,6,M.m,M.d,M.l);if(S.v!=='back'){A.R(-3,-24+b,6,1.6,M.k);A.slit(0,-23.2+b,4,1,M.g)}
  /* 굴뚝 · 증기 */A.box(side?-8:-9*tw,-30+b,2.6,8,M.d,M.k,M.m);A.rise(4,-9,-6,-30+b,8,.9,'#d8d8e0',1.4,.6);
  /* 프레스 팔 */const up=S.k?-5:S.h?3:0;for(const s of [-1,1]){if(side&&s<0)continue;const ax=s*12.5*tw+(side?3:0);A.box(ax-2,-21+b,4,9,M.d,M.k,M.m);A.box(ax-3.6,-13+b+up,7.2,4.4,M.m,M.d,M.l);A.R(ax-3.6,-9+b+up,7.2,1,M.k)}
  if(S.h){A.glow(0,-2,14,M.g,.8)}tierAdd(A,S,-27+b,-13+b,10);fin(A,[-17,-32,17,0],S)};
 /* 스파크 정령: 떠다니는 번개 코일 */
 RG.m_fd_spark=A=>{const S=st(A),M=S.M,t=A.t/1000,by=-16+Math.sin(t*3)*1.4,sp=S.tr>=3?'#ff6a3a':S.tr>=2?'#7ad8ff':'#ffe74a';
  A.ring(0,by,6.4,1.2,M.m);A.ring(0,by,6.4,.5,M.l);for(let i=0;i<3;i++){const a=t*4+i*2.09;A.C(Math.cos(a)*6.4,by+Math.sin(a)*6.4*.4,1,M.l)}
  A.orb(0,by,3.6,sp,mix(sp,'#000',.4),'#ffffff');A.glow(0,by,9,sp,1.3);
  for(let i=0;i<4;i++){const a=i*1.57+t*2;A.L(Math.cos(a)*3.6,by+Math.sin(a)*3.6,Math.cos(a)*8.6+Math.sin(t*20+i),by+Math.sin(a)*6,sp,.7)}
  if(S.v!=='back'){A.C(-1.2,by-.6,.6,'#000');A.C(1.2,by-.6,.6,'#000')}A.E(0,-1,4,1,'#000',.25);if(S.k||S.h)A.ring(0,by,9+S.h*2,.6,sp);
  if(S.tr>=2){for(let i=0;i<4;i++)A.spike(Math.cos(i*1.57+.78)*6.8,by+Math.sin(i*1.57+.78)*6.8*.5,i*1.57+.78,2.4,1.2,M.l)}if(S.tr>=3)A.rise(6,-7,7,by+4,14,.8,'#ff8a4a',.8,.4);fin(A,[-11,-28,11,0],S)};
 /* ===== 보스 · 주조 군주 기어하트 — 넓은 그림판(80×70칸) · 앞/옆/뒤 모습 · 공격마다 다른 몸동작 =====
    자세(Q)는 bossPose()가 지금 공격(B.st)과 지난 시간으로 만들고, 보스는 잡몹처럼 미리 그려 두지 않고 매 프레임 바로 그린다(TW71 sp.draw).
    오른팔 = 증기 망치, 왼팔 = 톱날 · 가슴 = 용광로 문(레이저가 나오는 곳, 뒤에서는 등의 배기 창살) · 옆구리 = 톱니 덮개(톱니 폭풍이 나오는 곳) */
 try{if(window.__V43BIG)__V43BIG.m_fd_boss=1}catch(e){}
 const BU=2.3,BFY=12,smo=(a,b,x)=>{const k=Math.max(0,Math.min(1,(x-a)/(b-a)));return k*k*(3-2*k)};
 const KF=(L,e)=>{if(e<=L[0][0])return L[0][1];for(let i=1;i<L.length;i++)if(e<=L[i][0]){const p=L[i-1],q=L[i];return p[1]+(q[1]-p[1])*smo(p[0],q[0],e)}return L[L.length-1][1]};
 function bossPose(st,e,clk,moving,ph){const Q={st,e,cr:0,lean:0,ra:[.25,.3],la:[.25,.3],door:0,core:.35,hatch:0,saw:1,hot:0,crown:.35,steam:.35,imp:0,walk:null,flare:0,charge:0},s=Math.sin(clk*3);
  if(st==='move'){if(moving)Q.walk=(clk*1.5)%1;Q.ra=[.25+s*.08,.3];Q.la=[.25-s*.08,.3]}
  else if(st==='hammer'){const L=ph===2?[[0,.2],[.62,1],[.74,1],[.9,-1],[.98,-1],[1.07,.8],[1.15,-1],[1.23,-1],[1.32,.8],[1.4,-1],[1.6,-1],[1.75,.2]]:[[0,.2],[.62,1],[.74,1],[.9,-1],[1.25,-1],[1.45,.2]],up=KF(L,e);
   Q.ra=up>=0?[.25+up*2.3,.3-up*.12]:[.25+up*.62,.3-up*.5];Q.la=[.4-Math.min(0,up)*.3,.75];Q.cr=up<0?-up*2.6:-up*.4;Q.lean=up>0?-up*1.5:-up*2.6;Q.hot=Math.min(1,e/.5);
   for(const ts of (ph===2?[.9,1.15,1.4]:[.9]))if(e>=ts&&e<ts+.22)Q.imp=Math.max(Q.imp,1-(e-ts)/.22);Q.steam=.5+Q.imp*.5}
  else if(st==='laser'){Q.door=KF([[0,0],[.35,1],[1.3,1],[1.5,0]],e);Q.core=KF([[0,.35],[.95,1],[1.0,1.35],[1.3,1.1],[1.5,.35]],e);Q.cr=KF([[0,0],[.4,1.6],[.98,1.6],[1.05,-.6],[1.3,0]],e);
   Q.lean=KF([[0,0],[.9,.8],[1.02,-1.6],[1.3,0]],e);const br=KF([[0,.25],[.35,.85],[1.3,.85],[1.5,.25]],e);Q.ra=[br,.3+br*1.2];Q.la=[br,.3+br*1.2];Q.flare=e>=1&&e<1.3?1-(e-1)/.3:0;Q.charge=e<1?e:0}
  else if(st==='saws'){Q.hatch=KF([[0,0],[.35,1],[1.15,1],[1.4,0]],e);Q.saw=1+Q.hatch*7;const a=KF([[0,.25],[.4,1.45],[1.15,1.45],[1.4,.25]],e);Q.ra=[a,.15];Q.la=[a,.15];
   for(const ts of [.6,1])if(e>=ts&&e<ts+.15)Q.imp=Math.max(Q.imp,1-(e-ts)/.15);Q.cr=KF([[0,0],[.4,.8],[1.15,.8],[1.4,0]],e)}
  else if(st==='press'){Q.cr=KF([[0,0],[.6,3],[.7,3],[.82,-.4],[1.22,0],[1.32,2.6],[1.6,0]],e);Q.lean=KF([[0,0],[.6,2.4],[1.22,3.2],[1.34,1.2],[1.6,0]],e);
   const a=KF([[0,.25],[.6,1.35],[1.22,1.55],[1.32,.1],[1.6,.25]],e);Q.ra=[a,.2];Q.la=[a,.2];Q.dash=e>=.7&&e<1.25;if(Q.dash)Q.walk=(e*3.4)%1;if(e>=1.25&&e<1.45)Q.imp=1-(e-1.25)/.2;Q.steam=.7}
  else if(st==='roar'){const a=KF([[0,.25],[.35,2.5],[1.0,2.5],[1.25,.25]],e);Q.ra=[a,.15];Q.la=[a,.15];Q.crown=KF([[0,.35],[.3,1],[1,1],[1.25,.35]],e);Q.core=KF([[0,.35],[.3,1.2],[1,1.2],[1.25,.5]],e);
   Q.door=KF([[0,0],[.3,.6],[1,.6],[1.25,0]],e);Q.cr=KF([[0,0],[.3,-1.2],[1,-1.2],[1.25,0]],e);Q.steam=1;Q.flare=e>.3&&e<1?.45:0}
  if(ph===2){Q.core=Math.max(Q.core,.6);Q.hot=Math.max(Q.hot,.5);Q.steam=Math.max(Q.steam,.7)}return Q}
 /* 가슴 용광로(레이저가 나오는 곳)의 그림판 위치 */
 const coreL=(v,Q)=>v==='side'?[11.4+Q.lean*.475,-26.5+Q.cr]:v==='back'?[0,-27+Q.cr]:[0,-26.5+Q.cr];
 RG.m_fd_boss=A=>{const o=A.o,v=o.view||'front',tr=o.tier||0,M=TM[tr],t=A.t,Q=o.Q||bossPose('move',0,t,false,1),hot=tr>=3?'#ff3a1a':'#ff8a2a',hot2=tr>=3?'#ffb060':'#ffd070';
  const br=Math.sin(t*2.2)*.35,cr=Q.cr,Y=y=>y+cr+(y<-17?br*.3:0),X=(x,y)=>v==='side'?x+Q.lean*Math.max(0,-y-17)/20:x,far=k=>mix(M.m,'#000',k);
  const seg=(x0,y0,x1,y1,w,base,dk,lt)=>{const dx=x1-x0,dy=y1-y0,l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l,h=w/2,g=h+.45;A.P([[x0+nx*g,y0+ny*g],[x1+nx*g,y1+ny*g],[x1-nx*g,y1-ny*g],[x0-nx*g,y0-ny*g]],M.k);
   A.P([[x0+nx*h,y0+ny*h],[x1+nx*h,y1+ny*h],[x1-nx*h,y1-ny*h],[x0-nx*h,y0-ny*h]],base);A.L(x0+nx*(h-.5),y0+ny*(h-.5),x1+nx*(h-.5),y1+ny*(h-.5),lt,.5,.55);A.L(x0-nx*(h-.5),y0-ny*(h-.5),x1-nx*(h-.5),y1-ny*(h-.5),dk,.5,.6)};
  const rbox=(cx,cy,ang,w,h,base,dk,lt)=>{const ca=Math.cos(ang),sa=Math.sin(ang),pt=(a,b)=>[cx+ca*a-sa*b,cy+sa*a+ca*b],q=(w2,h2)=>[pt(-w2,-h2),pt(w2,-h2),pt(w2,h2),pt(-w2,h2)];A.P(q(w/2+.45,h/2+.45),M.k);A.P(q(w/2,h/2),base);const e=q(w/2-.4,h/2-.4);A.L(e[0][0],e[0][1],e[3][0],e[3][1],lt,.5,.6);A.L(e[1][0],e[1][1],e[2][0],e[2][1],dk,.5,.6)};
  /* 팔: 어깨(sx,sy) · 방향 s · 각도 [어깨, 팔꿈치] · 도구(망치 ham / 톱날 saw) · 먼 팔이면 어둡게 */
  const arm=(sx,sy,s,an,tool,fr)=>{const [a1,a2]=an,L1=7.4,L2=7.2,ex=sx+s*Math.sin(a1)*L1,ey=sy+Math.cos(a1)*L1,b=a1+a2,hx=ex+s*Math.sin(b)*L2,hy=ey+Math.cos(b)*L2,dx=s*Math.sin(b),dy=Math.cos(b),base=fr?far(.38):M.m;
   seg(sx,sy,ex,ey,4.4,base,M.d,M.l);seg(ex,ey,hx,hy,4,mix(base,M.d,.2),M.d,M.l);A.L(sx+s*Math.sin(a1)*1.6,sy+Math.cos(a1)*1.6,ex,ey,fr?M.d:M.l,.7,.4);A.gear(ex,ey,1.9,7,t*2*s,fr?M.d:M.l,M.d,M.k);
   if(tool==='ham'){const hl=7.4,qx=hx+dx*hl,qy=hy+dy*hl,ang=Math.atan2(dy,dx),hcx=qx+dx*1.7,hcy=qy+dy*1.7;seg(hx,hy,qx,qy,1.6,'#5a3a1e','#2a1608','#8a5a30');
    rbox(hcx,hcy,ang,5.6,10,fr?M.k:M.d,M.k,M.m);rbox(hcx,hcy,ang,3.4,11.2,base,M.d,M.l);for(const k of [-3.4,3.4]){const px=hcx-Math.sin(ang)*k,py=hcy+Math.cos(ang)*k;A.C(px,py,.7,Q.hot>.3?hot:M.k)}
    if(Q.hot>0){A.C(hcx,hcy,1.4,hot2,.4+Q.hot*.6);A.glow(hcx,hcy,5+Q.hot*5,hot,.3+Q.hot*.6)}
    if(Q.imp>0){A.glow(hcx+dx*2,hcy+dy*2,6+Q.imp*10,'#fff0c0',Q.imp);for(let i=0;i<8;i++){const g=i/8*TAU;A.spark(hcx+dx*2+Math.cos(g)*(1.2-Q.imp)*9,hcy+dy*2+Math.sin(g)*(1.2-Q.imp)*5,1.2,i%2?'#ffd070':'#ffffff',Q.imp)}}}
   else{const cx=hx+dx*2,cy=hy+dy*2;A.gear(cx,cy,4.1,14,t*Q.saw*s*3,fr?'#8a8a94':'#d8d8e2',M.k,M.d);A.ring(cx,cy,2.7,.5,M.l);A.C(cx,cy,1,'#ffd166');if(Q.saw>2)A.glow(cx,cy,7,'#ffe79a',.45)}
   A.box(hx-1.8,hy-1.6,3.6,3.2,mix(base,M.d,.3),M.k,M.l)};
  const leg=(x,ph,fr,swing)=>{const lift=ph==null?0:Math.max(0,Math.sin(ph*TAU))*2.4,sw=ph==null||!swing?0:Math.cos(ph*TAU)*2.2,hy=Y(-17),ky=-8.6-lift*.6+cr*.5,fy=-lift,base=fr?far(.38):M.m;
   seg(x,hy,x+sw*.5,ky,5.2,base,M.d,M.l);A.R(x+sw*.25-.4,Math.min(hy,ky)+1,.8,Math.abs(ky-hy)-2,M.l,.35);A.gear(x+sw*.5,ky,1.8,7,t*1.5,fr?M.d:M.l,M.d,M.k);seg(x+sw*.5,ky,x+sw,fy-2.8,4.6,mix(base,M.d,.2),M.d,M.l);
   A.plate([[x+sw-4.6,fy-3.8],[x+sw+4.6,fy-3.8],[x+sw+5.8,fy],[x+sw-5.8,fy]],base,M.k,M.l);A.R(x+sw-5.6,fy-.8,11.2,.8,M.k);for(const r of [-3,0,3])A.C(x+sw+r,fy-2.3,.45,tr>=1?'#ffd166':M.l);if(tr>=2)A.spike(x+sw,fy-3.8,-1.57,2,1.8,M.d,M.l)};
  const chim=(x,h)=>{const y0=Y(-35),y1=Y(-35-h);A.box(x-1.7,y1,3.4,y0-y1,M.d,M.k,M.m);A.R(x-2.4,y1-1.2,4.8,1.5,M.k);A.R(x-2.4,y1-1.2,4.8,.45,M.l,.6);A.R(x-1.7,y1+2,3.4,.6,M.l,.35);A.R(x-1.7,y1+5,3.4,.6,M.l,.35);
   if(tr>=3){A.rise(6,x-1.4,x+1.4,y1-1,9+Q.steam*6,1.6,'#ff7a2a',1.1,x*.13);A.glow(x,y1-2,4,'#ff4a1a',.6)}else{for(let i=0;i<4;i++){const q=(t*(.55+Q.steam*.4)+i/4+x*.07)%1,r=.8+q*(1.6+Q.steam*1.2);A.C(x+Math.sin(q*5+i+x)*1.4*q,y1-1.5-q*(7+Q.steam*8),r,'#e8e4e0',(1-q)*.55);A.C(x+Math.sin(q*5+i+x)*1.4*q-.4,y1-1.9-q*(7+Q.steam*8),r*.55,'#ffffff',(1-q)*.35)}}};
  const paul=(x,y,fr)=>{const b=fr?far(.38):M.m;A.C(x,y,5.3,M.k);A.C(x,y-.2,4.8,b);A.E(x-1.3,y-1.9,2.6,1.4,M.l,fr?.15:.45);A.ring(x,y,4.8,.6,M.d);for(let i=0;i<5;i++){const g=Math.PI+.3+i*.6;A.C(x+Math.cos(g)*3.6,y+Math.sin(g)*3.6,.42,tr>=1?'#ffd166':M.l)}if(tr>=2)A.spike(x,y-4.5,-1.57,3.2,2,M.d,M.l)};
  const head=(x,face,back)=>{const hy=Y(-38.5);A.R(x-2.4,hy,4.8,2.4,M.d);A.box(x-5,hy-7,10,7.4,M.m,M.d,M.l);A.R(x-5.4,hy-7.6,10.8,1.2,M.d);
   if(back){A.vent(x-3,hy-5.6,6,4,hot,Q.core>.8)}else if(face===0){A.R(x-3.8,hy-5.2,7.6,2.2,M.k);A.slit(x-1.8,hy-4.1,2.2,1.2,hot);A.slit(x+1.8,hy-4.1,2.2,1.2,hot);for(let i=0;i<4;i++)A.R(x-2.4+i*1.4,hy-1.8,.6,1.6,M.k)}
   else{A.R(x+.8,hy-5.2,4.2,2.2,M.k);A.slit(x+3.2,hy-4.1,2.2,1.2,hot);for(let i=0;i<2;i++)A.R(x+1.6+i*1.4,hy-1.8,.6,1.6,M.k);A.C(x-2,hy-3.6,1.2,M.d);A.C(x-2,hy-3.6,.5,M.l)}
   const cg=Q.crown;A.R(x-5.6,hy-9.6,11.2,2,'#c8963a');A.R(x-5.6,hy-9.6,11.2,.5,'#fff0b0',.7);for(let i=0;i<5;i++)A.spike(x-4.4+i*2.2,hy-9.6,-1.57,2.2+(i%2?0:1.4)+(i===2?1:0),1.6,'#ffd166','#fff0b0');
   if(!back){A.C(x,hy-8.6,1.1,hot)}A.glow(x,hy-9,3+cg*6,'#ffd166',.2+cg*.8);
   if(tr>=3)for(const s of [-1,1]){A.P([[x+s*4.6,hy-8],[x+s*6,hy-9],[x+s*8.4,hy-14],[x+s*6.2,hy-10]],'#140a10');A.L(x+s*6,hy-9.4,x+s*8,hy-13.2,'#ff6a3a',.45)}};
  const bands=(xa,xb,xf)=>{for(const by of [-34,-20.6]){A.P([[xf(xa,by),Y(by)],[xf(xb,by),Y(by)],[xf(xb,by+1.6),Y(by+1.6)],[xf(xa,by+1.6),Y(by+1.6)]],M.d);A.L(xf(xa,by),Y(by)+.25,xf(xb,by),Y(by)+.25,M.l,.4,.5);for(let x=xa+1.6;x<=xb-1;x+=2.6)A.C(xf(x,by),Y(by)+.8,.38,tr>=1?'#ffd166':M.l)}};
  const fire=(cx,cy,rx,ry)=>{const k=Q.core;A.E(cx,cy,rx,ry,mix('#5a1a08',hot,Math.min(1,k)));A.E(cx,cy,rx*.75,ry*.75,hot,Math.min(1,.4+k*.6));A.E(cx,cy,rx*.5,ry*.5,hot2,Math.min(1,k));A.E(cx,cy,rx*.27,ry*.27,'#fff8e0',Math.min(1,k*1.1));A.glow(cx,cy,7+k*12,hot,.35+k*.75)};
  const cracks=xf=>{if(tr<3)return;A.L(xf(-11,-31),Y(-31),xf(-7,-24),Y(-24),'#ff6a2a',.5);A.L(xf(-7,-24),Y(-24),xf(-9,-21),Y(-21),'#ff8a3a',.5);A.L(xf(10,-30),Y(-30),xf(8,-25),Y(-25),'#ff6a2a',.5);A.glow(xf(-9,-25),Y(-25),4,'#ff4a1a',.5)};
  const gearbox=xf=>{A.box(xf(-9.6,-19),Y(-19.2),19.2,4.2,M.d,M.k,M.m);A.gear(xf(0,-17),Y(-17.1),2.3,9,t*1.2,M.l,M.d,M.k)};
  const hatch=(x,s)=>{const hy=Y(-27.5),hx=x+s*Q.hatch*2.6;if(Q.hatch>.05){A.gear(x,hy+2.6,3.3,12,t*Q.saw*s*2,'#d8d8e2',M.k,M.d);A.glow(x,hy+2.6,5+Q.imp*7,'#ffe79a',.3+Q.imp*.7)}A.box(hx-1.6,hy-1,3.2,7.2,M.d,M.k,M.m);A.R(hx-1,hy+.6,2,.5,M.l,.6);A.R(hx-1,hy+3.4,2,.5,M.l,.6)};
  const charge=()=>{const [cx,cy]=coreL(v,Q);if(Q.charge>0){for(let i=0;i<14;i++){const q=(t*1.6+i/14)%1,g=i*2.4+Math.floor(t*1.6+i/14)*1.7,d=(1-q)*16;A.spark(cx+Math.cos(g)*d,cy+Math.sin(g)*d*.8,1.1,i%2?'#fff0c0':hot2,q)}A.glow(cx,cy,4+Q.charge*11,'#ffffff',Q.charge*.85)}if(Q.flare>0)A.glow(cx,cy,8+18*Q.flare,'#fff8e0',Q.flare)};
  const I=x=>x;let RA=Q.ra,LA=Q.la;if(v!=='side'&&Q.st==='press'){const k=Math.max(0,Math.min(1,(Q.ra[0]-.25)/1.3));RA=LA=[.25-.6*k,.3-1.25*k]}
  /* 무릎 덮개 · 어깨 관 · 석탄 창살 */const knee=(x,fr)=>{A.E(x,-8.6+cr*.5,2.2,1.7,fr?far(.4):M.m);A.E(x-.5,-9.2+cr*.5,1.1,.6,M.l,fr?.15:.5)};
  const pipe=(x0,s2)=>{const y0=Y(-36.4);A.L(x0,y0,x0+s2*3,y0-2.4,M.k,1.9);A.L(x0+s2*3,y0-2.4,x0+s2*6.2,y0-1.6,M.k,1.9);A.L(x0,y0,x0+s2*3,y0-2.4,'#b8743a',1.1);A.L(x0+s2*3,y0-2.4,x0+s2*6.2,y0-1.6,'#b8743a',1.1);A.C(x0+s2*3,y0-2.4,.7,'#e0a060')};
  const grate=(xf)=>{const gy=Y(-21.6);A.R(xf(-5,-21),gy-.4,10,2,M.k);for(let i=0;i<5;i++)A.R(xf(-4.4+i*2,-21),gy,1.2,1.2,mix('#5a1a08',hot,Math.min(1,.3+Q.core*.7)))};
  if(v==='side'){/* 옆: 오른쪽을 봄. 먼 팔 = 톱날, 가까운 팔 = 망치 */
   chim(X(-8.4,-40),13);chim(X(-4.6,-40),10);arm(X(1.2,-33),Y(-33.4),1,Q.la,'saw',true);paul(X(1.2,-34),Y(-34),true);
   leg(1.4,Q.walk==null?null:(Q.walk+.5)%1,true,true);leg(-1.8,Q.walk,false,true);
   A.plate([[X(-11.5,-37),Y(-37)],[X(8.5,-37),Y(-37)],[X(11,-30),Y(-30)],[X(9.6,-17.5),Y(-17.5)],[X(-10,-17.5),Y(-17.5)],[X(-12.6,-30),Y(-30)]],M.m,M.d,M.l);bands(-12.4,10.6,X);cracks(X);
   /* 등의 태엽 열쇠 */{const kx=X(-12.6,-30),ky=Y(-30),ka=t*1.4,h2=Math.max(1,Math.abs(Math.sin(ka))*3.8);A.R(kx-3,ky-.7,3,1.4,M.d);A.E(kx-4.4,ky,1.3,h2,M.l);A.E(kx-4.4,ky,.6,Math.max(.5,h2*.55),M.d)}
   /* 앞의 용광로 문(옆에서 본 모양) — 레이저 때 문짝이 앞으로 열림 */{const fx=X(10.2,-26.5),fy=Y(-26.5),op=Q.door;A.E(fx,fy,2,6.8,M.k);fire(fx+.3,fy,1.3,5.6);
    if(op<.5){A.E(fx+.2,fy,1.5,6.2,M.d,1-op*2);for(let i=-1;i<=1;i++)A.R(fx-.4,fy+i*2.2-.3,1.6,.6,M.k,1-op*2)}A.P([[fx+.8,fy-6.6],[fx+.8+op*5.4,fy-6.6+op*1.2],[fx+.8+op*5.4,fy+6.6-op*1.2],[fx+.8,fy+6.6]],M.d);A.L(fx+.8+op*5.4,fy-6.4+op*1.2,fx+.8+op*5.4,fy+6.4-op*1.2,M.l,.5,.6)}
   grate(X);hatch(X(-1,-27),1);gearbox(X);knee(1.4,true);knee(-1.8);arm(X(-.6,-33),Y(-33.4),1,Q.ra,'ham',false);paul(X(-.6,-34),Y(-34),false);head(X(.8,-40),1,false)}
  else if(v==='back'){/* 뒤: 화면 왼쪽 = 오른팔(망치) */
   leg(-6.8,Q.walk,false,false);leg(6.8,Q.walk==null?null:(Q.walk+.5)%1,false,false);
   A.plate([[-14,Y(-37)],[14,Y(-37)],[15.6,Y(-30)],[13.4,Y(-17.5)],[-13.4,Y(-17.5)],[-15.6,Y(-30)]],M.m,M.d,M.l);bands(-15,15,I);cracks(I);
   /* 등의 배기 창살 — 레이저 때 여기로도 빛이 샘 */A.box(-6.6,Y(-32.4),13.2,11,M.k,M.k,M.d);for(let i=0;i<6;i++)A.R(-5.8,Y(-31.5)+i*1.7,11.6,.9,mix('#3a1408',hot,Math.min(1,Q.core)));A.glow(0,Y(-27),6+Q.core*12,hot,.3+Q.core*.8);
   /* 등의 큰 태엽 열쇠 */{const ka=t*1.4;A.R(-1,Y(-36.6),2,4,M.d);for(const s2 of [-1,1]){const lx=Math.cos(ka)*s2*4.4,w2=Math.max(.9,Math.abs(Math.cos(ka))*3);A.E(lx,Y(-39),w2,2.4,M.l);A.E(lx,Y(-39),Math.max(.5,w2*.55),1.2,M.d)}}
   gearbox(I);hatch(-12.6,-1);hatch(12.6,1);knee(-6.8);knee(6.8);arm(16.4,Y(-33.4),1,LA,'saw',false);arm(-16.4,Y(-33.4),-1,RA,'ham',false);paul(-16.4,Y(-34),false);paul(16.4,Y(-34),false);head(0,0,true);chim(-8,13);chim(8,11)}
  else{/* 앞: 화면 오른쪽 = 오른팔(망치), 왼쪽 = 톱날 */
   chim(-8,13);chim(8,11);leg(-6.8,Q.walk,false,false);leg(6.8,Q.walk==null?null:(Q.walk+.5)%1,false,false);
   A.plate([[-14,Y(-37)],[14,Y(-37)],[15.6,Y(-30)],[13.4,Y(-17.5)],[-13.4,Y(-17.5)],[-15.6,Y(-30)]],M.m,M.d,M.l);bands(-15,15,I);A.R(-7.6,Y(-32),.5,11,M.d,.6);A.R(7.1,Y(-32),.5,11,M.d,.6);cracks(I);
   /* 가슴 용광로 문(조리개) — 레이저 때 열리며 불이 하얗게 달아오름 */{const cy=Y(-26.5),op=Q.door;A.C(0,cy,7.3,M.k);A.ring(0,cy,7,1.2,M.d);fire(0,cy,5.7,5.7);
    if(op<.98){const r0=5.8*(1-op*.82);A.ring(0,cy,5.8,5.8-r0+.01,M.d);for(let i=0;i<6;i++){const g=i/6*TAU+op*1.2;A.L(Math.cos(g)*r0,cy+Math.sin(g)*r0,Math.cos(g+.7)*5.7,cy+Math.sin(g+.7)*5.7,M.k,.4)}}
    if(op<.3)for(let i=-2;i<=2;i++)A.R(i*1.9-.3,cy-4.6,.6,9.2,M.k,.85*(1-op/.3));A.ring(0,cy,7.3,.5,M.l,.5);A.R(-7.9,cy-1.2,1.4,2.4,M.d);A.R(6.5,cy-1.2,1.4,2.4,M.d)}
   for(const s2 of [-1,1]){const gx=s2*10,gy=Y(-31.2);A.C(gx,gy,1.9,M.k);A.C(gx,gy,1.5,'#f0e8d0');const na=-2.4+Math.min(1,Q.core)*2.2+(Q.core>.8?Math.sin(t*9+s2)*.2:0);A.L(gx,gy,gx+Math.cos(na)*1.2,gy+Math.sin(na)*1.2,'#c0201a',.4)}
   grate(I);pipe(-9.4,-1);pipe(9.4,1);hatch(-12.6,-1);hatch(12.6,1);gearbox(I);knee(-6.8);knee(6.8);arm(-16.4,Y(-33.4),-1,LA,'saw',false);arm(16.4,Y(-33.4),1,RA,'ham',false);paul(-16.4,Y(-34),false);paul(16.4,Y(-34),false);head(0,0,false)}
  charge();if(o.ph2&&tr<3)A.rise(5,-12,12,Y(-20),14,.7,'#ff8a3a',.9,.3);
  A.aura=hot;A.rim='rgba(255,190,130,.7)';A.bbox=[-26,-58,26,0]};

 /* ================= 탑 엔진에 새 종류 넣기 ================= */
 const TSP=TW71.SP,SPC=TW71.SPC||{},ELN=TW71.ELN||{};
 const KINDS={fd_cog:['톱니 병정',90,7,'knight','#c8a060','#5a3a18','강철 백부장'],fd_moth:['기름 나방',45,6,'bat','#b08a50','#4a2a10','등불 여왕나방'],fd_hound:['태엽 사냥개',80,7,'boar','#a89070','#4a3a2a','강철 늑대왕'],
  fd_lamp:['램프 마녀',60,6,'mage','#c86a3a','#4a1a10','용광로 마녀'],fd_press:['압착 골렘',170,9,'golem','#9a8a7a','#3a3028','대형 압착기'],fd_spark:['스파크 정령',55,6,'wisp','#ffe74a','#6a5a10','폭풍 코일']};
 for(const k in KINDS){const [n,hp,r,ai,a,b,el]=KINDS[k];TSP[k]={n,hp,r,ai,rows:(TSP[ai]||TSP.slime).rows};SPC[k]=[a,b];ELN[k]=el}
 TSP.fd_boss={n:'주조 군주 기어하트',hp:1000,r:16,us:2.3,top:52,touch:14,rows:TSP.golem.rows,upd:bossUpd,draw:bossDraw,noBar:1};SPC.fd_boss=['#a07a50','#3a2414'];ELN.fd_boss='주조 군주 기어하트';

 /* ================= 보스 움직임 · 공격 ================= */
 const B={st:'move',t0:0,cd:2,ph:1,n:0,summ:0,cracks:[]};
 const viewTo=(dx,dy)=>Math.abs(dx)>Math.abs(dy)*1.1?['side',dx>=0?1:-1]:[dy>0?'front':'back',dx>=0?1:-1];
 /* 용광로(레이저 나오는 곳)의 실제 화면 위치 */
 function coreW(m,view,face,Q){const [lx,ly]=coreL(view,Q);return [m.x+lx*BU*(view==='side'&&face<0?-1:1),m.y+BFY+ly*BU]}
 function hamW(m){const v=B.view,f=B.face;return v==='side'?[m.x+f*17*BU,m.y+BFY-2]:[m.x+(v==='back'?-1:1)*9*BU,m.y+BFY-1]}
 function slamFx(m,x,y){const T=TW71.T,[hx,hy]=hamW(m);T.shake=Math.max(T.shake||0,.55);try{sfx(60,.35,'square',.07,30);perc&&perc('kick',audio.currentTime)}catch(e){}
  B.cracks.push({x0:hx,y0:hy,x1:x,y1:y,t:T.clk,sd:Math.random()*9});for(let i=1;i<=5;i++){const f=i/5;TW71.burst(hx+(x-hx)*f,hy+(y-hy)*f,3,'#c8a070',70)}TW71.burst(x,y,10,'#ffb060',120)}
 function sawRing(m,n,v,off){const p={x:m.x,y:m.y+BFY-26*BU+4,sp:m.sp};TW71.ring(p,n,v,8,4,'#e8c870','saw',off);m.hitPose=TW71.T.clk;try{sfx(900,.15,'square',.04,300)}catch(e){}}
 function bossUpd(m,dt,o){const T=TW71.T,c=T.clk,eT=TW71.eTel;if(!m._b){m._b=1;Object.assign(B,{st:'move',t0:c,cd:2.2,ph:1,n:0,summ:0,cracks:[],view:null})}
  if(B.ph===1&&m.hp<m.max*.5){B.ph=2;B.st='roar';B.t0=c;B.view='front';B.face=1;B.r1=0;TW71.addPop(m.x,m.y-136,'⚙ 용광로 폭주!','#ff6a3a');try{sfx(80,.6,'sawtooth',.07,40)}catch(e){}}
  const e=c-B.t0;
  if(B.st==='roar'){if(e>.35&&!B.r1){B.r1=1;T.shake=Math.max(T.shake||0,.8);try{sfx(55,.9,'sawtooth',.08,30)}catch(err){}TW71.burst(m.x,m.y-60,24,'#ff8a3a',160)}
   if(e>1.3){if(!B.summ){B.summ=1;for(let i=0;i<3;i++)T.queue.push({sp:'fd_moth',elite:false,hp:Math.round(TSP.fd_moth.hp*hpz())})}end()}return [0,0]}
  if(B.st==='move'){B.cd-=dt;const tx=AX+AW/2+Math.sin(c*.5)*120,ty=AY+150+Math.sin(c*.8)*18;
   if(B.cd<=0){B.n++;const L=['hammer','saws','laser','press'];if(B.ph===2)L.push('saws','laser','hammer');B.st=B.force||L[(B.n*7+Math.floor(c*3))%L.length];B.force=null;B.t0=c;
    [B.view,B.face]=viewTo(P.x-m.x,(P.y-6)-(m.y-40));
    TW71.addPop(m.x,m.y-136,'★ '+{hammer:'증기 망치',saws:'톱니 폭풍',laser:'용광로 광선',press:'압착 돌진'}[B.st]+'!','#ffe79a');
    if(B.st==='hammer'){const cl=x=>Math.max(AX+24,Math.min(AX+AW-24,x));B.ht=(B.ph===2?[.9,1.15,1.4]:[.9]).map((ts,i)=>[cl(P.x+(i?(i%2?-1:1)*46:0)),P.y,ts]);for(const [x,y,ts] of B.ht)eT({k:'c',x,y,r:34,dmg:16},ts);B.hi=0}
    if(B.st==='laser'){const [cx,cy]=coreW(m,B.view,B.face,{cr:1.6,lean:.8});const a=Math.atan2((P.y-6)-cy,P.x-cx);B.la=[-1,0,1].map(k=>a+k*.55);B.lo=[cx,cy];for(const aa of B.la)eT({k:'l',x:cx,y:cy,a:aa,len:460,w:10,dmg:14},1.0)}
    if(B.st==='press'){B.px=P.x;B.py=P.y}
    try{sfx(B.st==='laser'?220:160,.4,'sawtooth',.04,B.st==='laser'?660:80)}catch(err){}}
   return [(tx-m.x)*1.2,(ty-m.y)*1.2]}
  if(B.st==='hammer'){const S=B.ht||[];while(B.hi<S.length&&e>=S[B.hi][2]){const [x,y]=S[B.hi];B.hi++;slamFx(m,x,y)}if(e>(B.ph===2?1.75:1.45))end();return [0,0]}
  if(B.st==='saws'){if(!B.s1&&e>.6){B.s1=1;sawRing(m,14,90,c)}if(!B.s2&&e>1.0){B.s2=1;sawRing(m,14,70,c+.22)}if(e>1.4)end();return [0,0]}
  if(B.st==='laser'){if(!B.l1&&e>1.0){B.l1=1;T.shake=Math.max(T.shake||0,.45);try{sfx(140,.5,'sawtooth',.07,70)}catch(err){}}if(e>1.5)end();return [0,0]}
  if(B.st==='press'){if(e<.7)return [0,0];if(e<1.25){const dx=B.px-m.x,dy=B.py-m.y,d=Math.hypot(dx,dy)||1;if(d>30)[B.view,B.face]=viewTo(dx,dy);return d>8?[dx/d*260,dy/d*260]:[0,0]}
   if(!B.p1){B.p1=1;eT({k:'c',x:m.x,y:m.y,r:42,dmg:15},.05);T.shake=Math.max(T.shake||0,.5);try{sfx(70,.4,'square',.07,35)}catch(err){}TW71.burst(m.x,m.y+10,16,'#c8a070',120)}if(e>1.6)end();return [0,0]}
  end();return [0,0];
  function end(){B.st='move';B.t0=c;B.cd=(B.ph===2?1.3:2.0)+Math.random()*.6;B.s1=B.s2=B.p1=B.l1=0}}
 /* 보스 그리기(탑 drawMob이 발밑으로 옮긴 뒤 부름): 공격 중에는 공격하는 쪽을 봄 */
 const BC={cv:null,sc:0,key:''};
 function bossDraw(m,c){const T=TW71.T,e=T.clk-B.t0;let view=m.view||'front',face=m.face||1;if(B.st!=='move'&&B.view){view=B.view;face=B.face}
  const Q=bossPose(B.st,e,T.clk,Math.hypot(m.vx,m.vy)>12,B.ph),fl=view==='side'&&face<0;
  /* 그림은 1초에 20번만 새로 그려 두고(오프스크린) 매 프레임은 붙이기만 — 보스 그림이 커서 매 프레임 그리면 무거움 */
  const sc=Math.min(3,(typeof SS!=='undefined'&&SS)||2),flash=T.clk-m.hitT<.07,key=[view,fl?1:0,TRI(),B.st,Math.floor(T.clk*20),B.ph,flash?1:0].join('|');
  if(!BC.cv||BC.sc!==sc){BC.cv=document.createElement('canvas');BC.cv.width=220*sc;BC.cv.height=190*sc;BC.sc=sc;BC.key=''}
  if(BC.key!==key){BC.key=key;const o=BC.cv.getContext('2d');o.setTransform(1,0,0,1,0,0);o.clearRect(0,0,BC.cv.width,BC.cv.height);o.setTransform(sc*(fl?-1:1),0,0,sc,110*sc,160*sc);o.imageSmoothingEnabled=false;
   try{monDraw('m_fd_boss',o,{c:'#ff8a2a'},0,0,T.clk*1000,{view,tier:TRI(),Q,flash,ph2:B.ph===2},BU)}catch(err){}}
  c.drawImage(BC.cv,-110,-160,220,190);
  /* 레이저가 용광로에서 뻗어 나가는 모습(몸 위에 겹쳐 그림) */
  if(B.st==='laser'&&B.la&&B.lo){const lx=B.lo[0]-m.x,ly=B.lo[1]-(m.y+BFY);c.save();c.globalCompositeOperation='lighter';
   if(e<1){for(const a of B.la){c.globalAlpha=.2+.55*e;c.strokeStyle='#ffd070';c.lineWidth=.8+e*1.6;c.beginPath();c.moveTo(lx,ly);c.lineTo(lx+Math.cos(a)*46*e,ly+Math.sin(a)*46*e);c.stroke()}}
   else if(e<1.3){const q=1-(e-1)/.3;for(const a of B.la){c.globalAlpha=q;c.strokeStyle='#ff8a2a';c.lineWidth=11;c.beginPath();c.moveTo(lx,ly);c.lineTo(lx+Math.cos(a)*70,ly+Math.sin(a)*70);c.stroke();c.strokeStyle='#fff8e0';c.lineWidth=4;c.stroke()}
    const g=c.createRadialGradient(lx,ly,1,lx,ly,26);g.addColorStop(0,'#ffffff');g.addColorStop(1,'rgba(255,140,40,0)');c.globalAlpha=q;c.fillStyle=g;c.fillRect(lx-26,ly-26,52,52)}
   c.restore()}
  /* 돌진 중: 속도선 */if(B.st==='press'&&e>=.7&&e<1.25){c.save();c.globalAlpha=.5;c.strokeStyle='#ffe0b0';c.lineWidth=1;const a=Math.atan2(m.vy,m.vx);for(let i=0;i<7;i++){const ox=Math.sin(i*2.3)*26,oy=-20-i*12;c.beginPath();c.moveTo(ox-Math.cos(a)*10,oy-Math.sin(a)*10);c.lineTo(ox-Math.cos(a)*44,oy-Math.sin(a)*44);c.stroke()}c.restore()}}
 /* 망치가 땅을 친 금 (바닥 위 · 몹 아래) */
 function drawCracks(){const T=TW71.T,c=T.clk;B.cracks=(B.cracks||[]).filter(k=>c-k.t<.9);for(const k of B.cracks){const q=(c-k.t)/.9;ctx.save();ctx.globalAlpha=1-q;ctx.lineJoin='round';ctx.beginPath();const n=9;
  for(let i=0;i<=n;i++){const f=i/n,j=(i>0&&i<n)?Math.sin(k.sd+i*2.7)*4:0,x=k.x0+(k.x1-k.x0)*f-(k.y1-k.y0)/(Math.hypot(k.x1-k.x0,k.y1-k.y0)||1)*j,y=k.y0+(k.y1-k.y0)*f+(k.x1-k.x0)/(Math.hypot(k.x1-k.x0,k.y1-k.y0)||1)*j;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}
  ctx.strokeStyle='#1a0a04';ctx.lineWidth=4;ctx.stroke();ctx.strokeStyle='#ff8a2a';ctx.lineWidth=2;ctx.stroke();ctx.strokeStyle='#fff0c0';ctx.lineWidth=.7;ctx.stroke();ctx.restore()}}

 /* ================= 던전 진행 ================= */
 const R={on:false,w:0,saved:null,adv:false,t0:0};
 const DM=()=>({easy:.8,normal:1,hard:1.5,extreme:2.2}[typeof diff!=='undefined'?diff:'normal']||1);
 const eqF=w=>{let f=20+w*9;if(f%10===0)f++;return f};
 const hpz=()=>{try{return TW71.TF(eqF(R.w))*DM()}catch(e){return 1}};
 const FPAL=()=>{const z=TW71.ZPAL;const base=(z&&z[3])||(z&&z[0])||{};return Object.assign({},base,{n:'잊힌 주조소',a:'#ff9a4a',b:'#3a1a0a',c:'#ffb040'})};
 function waveList(w){const pool=['fd_cog','fd_moth'];if(w>=4)pool.push('fd_hound');if(w>=7)pool.push('fd_lamp');if(w>=10)pool.push('fd_press');if(w>=13)pool.push('fd_spark');
  if(w===20)return [{sp:'fd_boss',elite:false}];const n=5+Math.floor(w*.7),L=[];for(let i=0;i<n;i++)L.push({sp:pool[(i*7+w*3)%pool.length],elite:false});
  const el=(w%5===0?1:0)+(w>=12&&w%3===0?1:0)+(w===19?2:0);for(let i=0;i<el;i++)L.push({sp:pool[(w+i*2)%pool.length],elite:true});return L}
 function setupWave(w){R.w=w;R.adv=false;const T=TW71.T,f=eqF(w);try{TW71.buildFloor(f)}catch(e){}T.ext=EXT;T.pal=FPAL();
  const z=hpz(),L=waveList(w),norm=L.filter(q=>!q.elite).sort(()=>Math.random()-.5),els=L.filter(q=>q.elite);
  T.queue=norm.concat(els).map(q=>({sp:q.sp,elite:q.elite,hp:Math.round(TSP[q.sp].hp*z*(q.elite?3.5+Math.min(2.5,f/200):1))}));
  T.total=T.queue.length;T.cap=Math.min(7,3+Math.floor(w/4));T.nextSpawn=.8;T.vets=[];
  T.trans={t:0,txt:w===20?'⚙ 최종 웨이브':'WAVE '+w,sub:w===20?'주조 군주 기어하트가 깨어납니다':'잊힌 주조소 · '+w+' / 20'};
  try{$('bvTitle').textContent='BEAT BLADE · 잊힌 주조소 '+w+'/20'}catch(e){}}
 function start(){if(R.on)return;const s=saveData.tw71||(saveData.tw71={});R.saved={floor:s.floor,best:s.best};R.on=true;R.t0=performance.now();
  window.__nosr=1;try{TW71.start(1)}catch(e){console.error(e)}setupWave(1);try{sfx(110,.6,'sawtooth',.06,55)}catch(e){}}
 function restore(){const s=saveData.tw71||(saveData.tw71={});if(R.saved){s.floor=R.saved.floor;s.best=R.saved.best}R.saved=null;window.__nosr=0;save()}
 function toPlaza(){try{$('overlay').hidden=true}catch(e){}try{toLobby()}catch(e){}setTimeout(()=>{try{PLZ111.enter();setTimeout(()=>{try{P.x=DX;P.y=DY+40;armed=false}catch(e){}},60)}catch(e){}},300)}
 function finish(won){if(!R.on)return;R.on=false;const w=R.w,sv=SV();sv.best=Math.max(sv.best||0,won?20:w-1);if(won)sv.clear=(sv.clear|0)+1;restore();
  const first=won&&sv.clear===1;try{stopMusic()}catch(e){}
  setTimeout(()=>{try{showOverlay(won?'⚙ 잊힌 주조소 · 정복':'⚙ 잊힌 주조소 · '+w+'웨이브',won?'주조 군주를 쓰러뜨렸어요!':'쓰러졌어요',
    won?(first?'<b style="color:#ffd166">✪ 비밀 무기 「클라비스의 검」이 태엽 공방에 나타났어요!</b><br>공방 무기 칸에서 🪙 10,000에 살 수 있어요.':'다시 정복했어요! (정복 '+sv.clear+'번)'):'<b>'+w+'웨이브</b>에서 쓰러졌어요. (최고 '+sv.best+'웨이브)<br>다시 들어가면 1웨이브부터예요.',
    [['광장으로',toPlaza,true],['↺ 다시 도전',()=>{$('overlay').hidden=true;start()},false]])}catch(e){console.error(e)}},700);
  if(won){try{if(window.EGG126&&EGG126.found)EGG126.found('foundry')}catch(e){}}}
 /* 주조소 경기장 배경 (난이도마다 바닥 재질이 다름: 녹슨 철판 · 황동 · 강철 · 흑요석 + 용암 균열) */
 const TRI=()=>({easy:0,normal:1,hard:2,extreme:3})[typeof diff!=='undefined'?diff:'normal']||0,AC={};
 const APAL=[{pl:'#3a2a1e',pl2:'#33251a',sm:'#140e08',rv:'#9a6a3a',hi:'#5a4030',wall:'#1e140e',lava:'#ff8a2a'},
  {pl:'#3c3326',pl2:'#352d21',sm:'#16120c',rv:'#d8b060',hi:'#5e5038',wall:'#1c160e',lava:'#ffa040'},
  {pl:'#2c333c',pl2:'#272d35',sm:'#0e1216',rv:'#a8b8c8',hi:'#48525e',wall:'#141820',lava:'#ff9a3a'},
  {pl:'#1e1a22',pl2:'#19151d',sm:'#060408',rv:'#6a5a72',hi:'#342a3c',wall:'#0c080e',lava:'#ff4a1a'}];
 function buildArena(tr){const Q=APAL[tr],cv=document.createElement('canvas');cv.width=W;cv.height=H;const o=cv.getContext('2d'),F=Math.round,R=(x,y,w,h,c,a)=>{if(a!=null)o.globalAlpha=a;o.fillStyle=c;o.fillRect(F(x),F(y),F(w),F(h));o.globalAlpha=1};
  const glow=(x,y,r,c,a)=>{const g=o.createRadialGradient(x,y,1,x,y,r);g.addColorStop(0,c);g.addColorStop(1,'rgba(0,0,0,0)');o.globalAlpha=a;o.fillStyle=g;o.fillRect(x-r,y-r,r*2,r*2);o.globalAlpha=1};
  /* 바깥 벽돌 */R(0,0,W,H,Q.wall);for(let y=0;y<H;y+=8)for(let x=-((y/8)%2)*8;x<W;x+=16){R(x,y,15,7,(x*3+y*5)%7<2?'#ffffff':'#000000',.05);R(x,y,15,1,'#ffffff',.04)}
  /* 위쪽 용광로 입구 · 관 */R(0,AY-6,W,6,'#0a0604');for(const fx of [W*.18,W*.82]){for(let dy=0;dy<26;dy+=2){const hw=dy<10?F(Math.sqrt(100-(10-dy)*(10-dy))*1.9):19;R(fx-hw,4+dy,hw*2,2,'#080402')}
   const g=o.createLinearGradient(0,10,0,AY-6);g.addColorStop(0,'rgba(255,80,20,.1)');g.addColorStop(1,Q.lava);o.fillStyle=g;o.fillRect(fx-16,14,32,AY-20);glow(fx,AY-8,30,Q.lava,.55);
   for(let i=0;i<5;i++)R(fx-14+i*7,12,2,AY-18,'#1a0e08');R(fx-21,2,42,3,Q.hi);R(fx-21,2,42,1,Q.rv,.6)}
  for(const px of [W*.36,W*.64]){R(px-3,0,6,AY-6,'#5a3418');R(px-2,0,2,AY-6,'#b8743a');for(let y=6;y<AY-6;y+=10)R(px-4,y,8,2,'#2a1608')}
  /* 양옆 용암 도랑 */for(const sx of [2,W-14]){R(sx,AY,12,AH,'#0a0402');const g=o.createLinearGradient(0,AY,0,AY+AH);g.addColorStop(0,Q.lava);g.addColorStop(.5,'#ffd070');g.addColorStop(1,Q.lava);o.globalAlpha=.75;o.fillStyle=g;o.fillRect(sx+2,AY,8,AH);o.globalAlpha=1;for(let y=AY;y<AY+AH;y+=14)R(sx+3+((y*7)%5),y,2,4,'#fff0b0',.6)}
  /* 바닥 철판 */for(let y=AY;y<AY+AH;y+=32)for(let x=AX;x<AX+AW;x+=32){const gx=(x-AX)/32,gy=(y-AY)/32,k=(gx+gy)%2;R(x,y,32,32,k?Q.pl:Q.pl2);R(x,y,32,1,Q.hi);R(x,y,1,32,Q.hi,.6);R(x,y+31,32,1,Q.sm);R(x+31,y,1,32,Q.sm);
   for(const [rx,ry] of [[3,3],[27,3],[3,27],[27,27]]){R(x+rx,y+ry,2,2,Q.rv);R(x+rx,y+ry,1,1,'#ffffff',.3);R(x+rx+1,y+ry+1,1,1,'#000',.4)}
   const h=(gx*73+gy*151)%11;if(h===0){R(x+8,y+12,12,1,'#000',.35);R(x+11,y+18,7,1,'#000',.3)}if(h===3)R(x+6,y+8,20,2,'#ffffff',.04);
   if(tr===0&&h%4===1){R(x+12,y+5,9,7,'#8a4a1a',.28);R(x+15,y+12,2,7,'#8a4a1a',.2)}if(tr===1&&h===5){R(x+10,y+10,12,12,'#d8b060',.06)}}
  /* 쇠창살 (아래 불빛) */for(const [gx,gy] of [[2,2],[11,2],[6,0],[7,6],[3,6],[10,6]]){const x=AX+gx*32,y=AY+gy*32;R(x+3,y+3,26,26,'#080402');glow(x+16,y+16,18,Q.lava,.6);for(let i=0;i<6;i++){R(x+4+i*4.4,y+3,2,26,Q.hi);R(x+4+i*4.4,y+3,1,26,Q.rv,.35)}R(x+3,y+3,26,1,Q.rv,.5)}
  /* 바닥 가운데 큰 톱니 문장 */{const cx=AX+AW/2,cy=AY+AH/2+6;o.save();o.globalAlpha=.16;o.strokeStyle=Q.rv;o.lineWidth=3;o.beginPath();o.arc(cx,cy,58,0,TAU);o.stroke();o.lineWidth=2;o.beginPath();o.arc(cx,cy,24,0,TAU);o.stroke();o.fillStyle=Q.rv;for(let i=0;i<14;i++){o.save();o.translate(cx,cy);o.rotate(i/14*TAU);o.fillRect(-6,-70,12,12);o.restore()}
   for(let i=0;i<6;i++){o.save();o.translate(cx,cy);o.rotate(i/6*TAU);o.fillRect(-2,-56,4,32);o.restore()}o.restore()}
  /* 어려움: 위아래 경고 줄무늬 · 익스트림: 용암 균열 */if(tr>=2){for(let x=AX;x<AX+AW;x+=12){R(x,AY,6,3,'#e8b020',.55);R(x+6,AY,6,3,'#111',.55);R(x,AY+AH-3,6,3,'#e8b020',.55);R(x+6,AY+AH-3,6,3,'#111',.55)}}
  if(tr>=3){let sd=7;const rn=()=>((sd=(sd*9301+49297)%233280)/233280);for(let c=0;c<9;c++){let x=AX+30+rn()*(AW-60),y=AY+20+rn()*(AH-40);for(let j=0;j<6;j++){const nx=x+(rn()-.5)*34,ny=y+(rn()-.5)*24;o.strokeStyle=Q.lava;o.lineWidth=3;o.globalAlpha=.25;o.beginPath();o.moveTo(x,y);o.lineTo(nx,ny);o.stroke();o.lineWidth=1;o.globalAlpha=.9;o.strokeStyle='#ffb060';o.beginPath();o.moveTo(x,y);o.lineTo(nx,ny);o.stroke();o.globalAlpha=1;x=nx;y=ny}}}
  return cv}
 const EXT={under(){drawCracks()},arena(){const k=TRI();return AC[k]||(AC[k]=buildArena(k))},mark(){return 'W'+R.w},hud(now){const T=TW71.T;ctx.save();ctx.fillStyle='#05070acc';ctx.fillRect(AX,4,200,24);ctx.fillStyle='#ffb040';ctx.fillRect(AX,4,3,24);ctx.textBaseline='middle';
   ctx.font='900 12px sans-serif';ctx.fillStyle='#fff';ctx.fillText('⚙ '+R.w+'/20',AX+8,16);ctx.font='700 8px sans-serif';ctx.fillStyle='#ffb040';ctx.fillText('잊힌 주조소 · 웨이브',AX+56,12);
   ctx.fillStyle='#c8d4e0';ctx.fillText(T.clear?'웨이브 클리어!':'남은 적 '+(T.mobs.filter(m=>m.hp>0).length+((T.queue||[]).length))+' / '+(T.total||0),AX+56,22);
   const bm=T.mobs.find(m=>m.sp==='fd_boss'&&m.hp>0);if(bm){const bw=260,bx=W/2-bw/2,by=34,q=Math.max(0,bm.hp/bm.max);ctx.fillStyle='#000a';ctx.fillRect(bx-3,by-3,bw+6,15);ctx.fillStyle='#3a1408';ctx.fillRect(bx,by,bw,9);
    const g=ctx.createLinearGradient(bx,0,bx+bw,0);g.addColorStop(0,'#ff3a1a');g.addColorStop(1,'#ffd166');ctx.fillStyle=g;ctx.fillRect(bx,by,bw*q,9);ctx.fillStyle='#ffffff55';ctx.fillRect(bx,by,bw*q,2);
    ctx.font='900 8px sans-serif';ctx.textAlign='center';ctx.fillStyle='#fff';ctx.fillText('⚙ 주조 군주 기어하트 '+(B.ph===2?'· 폭주':''),W/2,by+4.5);ctx.textAlign='left'}
   ctx.textBaseline='alphabetic';ctx.restore();return true},
  die(){setTimeout(()=>finish(false),900);return true}};
 /* 웨이브가 끝나면 다음 웨이브 · 20웨이브면 정복 */
 {const f=frame;frame=function(){const r=f.apply(this,arguments);try{if(R.on){const T=TW71.T;if(mode!=='tower'&&mode!=='menu'&&mode!=='plaza'){/* 다른 장면으로 나가면 정리 */}
   if(mode==='tower'&&T.ext!==EXT&&!T.dead){R.on=false;restore()}
   else if(mode==='tower'&&T.clear&&!R.adv&&!T.dead){R.adv=true;const w=R.w;try{sfx(784,.2,'triangle',.06,1568)}catch(e){}
    if(w>=20)setTimeout(()=>finish(true),1400);else{TW71.addPop(AX+AW/2,AY+80,'WAVE '+w+' CLEAR!','#ffd166');setTimeout(()=>{if(R.on&&mode==='tower')setupWave(w+1)},1600)}}}}catch(e){}return r}}
 if(typeof toLobby==='function'){const f=toLobby;toLobby=function(){if(R.on){R.on=false;restore()}return f.apply(this,arguments)}}

 /* ================= 광장의 녹슨 철문 ================= */
 const DX=300,DY=176;let DA=null;/* 설계도 넣는 연출 */
 const nearDoor=()=>{try{return mode==='plaza'&&Math.abs(P.x-DX)<34&&P.y<DY+34}catch(e){return false}};
 /* 계단처럼 깎은 아치 문틀 안쪽 모양(도트) */
 function archPath(c,x,y,w,h,r){c.beginPath();for(let dy=-r;dy<0;dy+=2){const hw=Math.round(Math.sqrt(r*r-(dy+1)*(dy+1)));c.rect(DX-hw,y+dy,hw*2,2)}c.rect(x,y,w,h)}
 function doorDraw(c,now){const s=SV(),t=now/1000,open=s.door?1:DA?Math.max(0,Math.min(1,(now-DA.t0-900)/1100)):0;c.save();c.imageSmoothingEnabled=false;
  const w=36,h=38,r=18,x=DX-w/2,y=DY-h;
  c.fillStyle='rgba(0,0,0,.35)';c.fillRect(x-14,DY-1,w+28,4);
  /* 양옆 구리 증기관 · 압력계 */for(const sd of [-1,1]){const px=sd<0?x-15:x+w+9;c.fillStyle='#4a2a12';c.fillRect(px-1,y-12,8,h+12);c.fillStyle='#9a5a2a';c.fillRect(px,y-12,6,h+12);c.fillStyle='#d8945a';c.fillRect(px+1,y-12,2,h+12);c.fillStyle='#6a3a18';c.fillRect(px+4,y-12,1,h+12);
   for(let i=0;i<3;i++){const yy=y-6+i*15;c.fillStyle='#2a1a10';c.fillRect(px-2,yy,10,3);c.fillStyle='#e8b070';c.fillRect(px-2,yy,10,1);c.fillStyle='#3a2a20';c.fillRect(px-1,yy+1,1,1);c.fillRect(px+6,yy+1,1,1)}
   c.fillStyle='#4a2a12';c.fillRect(px-1,y-14,8,3);c.fillStyle='#c88a4a';c.fillRect(px,y-14,6,1);
   for(let i=0;i<3;i++){const q=(t*.5+i/3+(sd>0?.5:0))%1;c.globalAlpha=(1-q)*.45;c.fillStyle='#e8e0d8';const z=2+Math.round(q*3);c.fillRect(px+2+Math.round(Math.sin(q*6+i)*2)-z/2,y-16-q*18,z,z)}c.globalAlpha=1}
  {const gx=x+w+12,gy=y+14;c.fillStyle='#2a1a10';c.fillRect(gx-4,gy-4,9,9);c.fillStyle='#e8dcc0';c.fillRect(gx-3,gy-3,7,7);c.fillStyle='#c88a4a';c.fillRect(gx-4,gy-4,9,1);const na=-2.3+(open>0?2.2:Math.sin(t*1.3)*.4);c.fillStyle='#c0201a';for(let k=0;k<3;k++)c.fillRect(Math.round(gx+Math.cos(na)*k),Math.round(gy+Math.sin(na)*k),1,1)}
  /* 돌 문틀(옆 기둥 + 아치 돌) */const stone=(sx,sy,sw,sh,k)=>{c.fillStyle='#1e1812';c.fillRect(sx-1,sy-1,sw+2,sh+2);c.fillStyle=k?'#5e5044':'#6e5e4c';c.fillRect(sx,sy,sw,sh);c.fillStyle='#8e7c66';c.fillRect(sx,sy,sw,1);c.fillStyle='#3a3026';c.fillRect(sx,sy+sh-1,sw,1)};
  for(let i=0;i<4;i++){stone(x-7,y+i*9.5,6,8.5,i%2);stone(x+w+1,y+i*9.5,6,8.5,(i+1)%2)}
  for(let k=0;k<9;k++){const a=Math.PI+k/8*Math.PI,ax=Math.round(DX+Math.cos(a)*(r+3.5)-3),ay=Math.round(y+Math.sin(a)*(r+3.5)-3);stone(ax,ay,6,6,k%2)}
  /* 쐐기돌 · 톱니 문장 */stone(DX-5,y-r-9,10,9,0);{const gy=y-r-4.5;c.fillStyle='#c8963a';for(let k=0;k<8;k++){const a=k/8*TAU+t*.4;c.fillRect(Math.round(DX+Math.cos(a)*3.5-.5),Math.round(gy+Math.sin(a)*3.5-.5),2,2)}c.fillRect(DX-2,gy-2,4,4);c.fillStyle='#3a2410';c.fillRect(DX-1,gy-1,2,2)}
  /* 안쪽: 닫혀 있으면 어둠, 열리면 용광로 빛 · 돌아가는 톱니 · 불티 */c.save();archPath(c,x,y,w,h,r);c.clip();c.fillStyle='#050302';c.fillRect(x-1,y-r-1,w+2,h+r+2);
  if(open>0){const g=c.createLinearGradient(0,y-r,0,DY);g.addColorStop(0,'rgba(255,90,30,'+(.35*open)+')');g.addColorStop(1,'rgba(255,190,90,'+(.7*open)+')');c.fillStyle=g;c.fillRect(x,y-r,w,h+r);
   c.globalAlpha=open*.8;c.fillStyle='#2a0e04';for(const [gx,gy,gr,sp] of [[DX-8,y+6,9,.8],[DX+10,y-4,6,-1.2]]){for(let k=0;k<8;k++){const a=k/8*TAU+t*sp;c.fillRect(Math.round(gx+Math.cos(a)*gr-1.5),Math.round(gy+Math.sin(a)*gr-1.5),3,3)}c.beginPath();c.arc(gx,gy,gr-1,0,TAU);c.fill()}
   c.fillStyle='#3a1206';c.fillRect(x,DY-8,w,8);for(let i=0;i<6;i++){const q=(t*.7+i/6)%1;c.globalAlpha=(1-q)*open;c.fillStyle=i%2?'#ffd166':'#ff7a2a';c.fillRect(Math.round(x+4+((i*13+Math.floor(t*.7+i/6)*7)%(w-8))),Math.round(DY-6-q*(h+r-8)),1,2)}c.globalAlpha=1}
  /* 철문 두 짝(열리면 양옆으로 밀려 들어감) */const dw=Math.round(w/2*(1-open*.9));for(const sd of [0,1]){const lx=sd?x+w-dw:x;if(dw<=0)continue;
   c.fillStyle='#4e3420';c.fillRect(lx,y-r,dw,h+r);for(let i=0;i<dw;i+=6){c.fillStyle='#342214';c.fillRect(lx+i,y-r,1,h+r);c.fillStyle='#6a4a2e';c.fillRect(lx+i+1,y-r,1,h+r)}
   for(const by of [y-6,y+8,y+24]){c.fillStyle='#24242a';c.fillRect(lx,by,dw,4);c.fillStyle='#6a6a78';c.fillRect(lx,by,dw,1);c.fillStyle='#a8a8b8';for(let i=2;i<dw-1;i+=5)c.fillRect(lx+i,by+2,1,1)}
   c.fillStyle='#8a4a1a';c.fillRect(lx+(sd?3:dw-7),y+13,3,2);c.fillRect(lx+(sd?5:dw-5),y+15,1,4);c.fillStyle='rgba(150,70,20,.6)';c.fillRect(lx+(sd?dw-6:2),y+29,4,3);
   c.fillStyle='#1a120a';c.fillRect(sd?lx:lx+dw-1,y-r,1,h+r)}
  /* 가운데 톱니 자물쇠 · 설계도 꽂는 틈 (닫혀 있을 때) */if(open<.08){const cy=y+2,sp2=DA?t*6:0;c.fillStyle='#2a1a0a';c.fillRect(DX-8,cy-8,16,16);c.fillStyle='#b88a3a';for(let k=0;k<10;k++){const a=k/10*TAU+sp2;c.fillRect(Math.round(DX+Math.cos(a)*6.5-1),Math.round(cy+Math.sin(a)*6.5-1),2,2)}
   c.beginPath();c.arc(DX,cy,5,0,TAU);c.fill();c.fillStyle='#e8c070';c.fillRect(DX-3,cy-4,4,1);c.fillStyle='#5a3a14';c.beginPath();c.arc(DX,cy,2.4,0,TAU);c.fill();c.fillStyle='#1a0e04';c.fillRect(DX-.5,cy-1,1,3);
   const sy=y+14,gl=DA?1:s.paper?.55+.45*Math.sin(t*4):.15;c.fillStyle='#000';c.fillRect(DX-7,sy,14,3);c.fillStyle='rgba(255,180,80,'+gl+')';c.fillRect(DX-7,sy+1,14,1);
   if(s.paper&&!DA){c.globalAlpha=.35+.25*Math.sin(t*4);c.fillStyle='#ffb040';c.fillRect(DX-9,sy-2,18,7);c.globalAlpha=1}}
  c.restore();
  if(nearDoor()&&!DA){const msg=s.door?'⚙ 잊힌 주조소 — 문으로 걸어 들어가요':s.paper?'📜 봉인 설계도를 넣을 수 있을 것 같다 (공격 키 · 단추)':'녹슨 철문… 가느다란 틈이 있다';c.font='bold 8px sans-serif';c.textAlign='center';const tw=c.measureText(msg).width+10,ty=y-r-24;c.fillStyle='#000c';c.fillRect(DX-tw/2,ty,tw,13);c.fillStyle='#ffe9a8';c.fillText(msg,DX,ty+9)}
  if(DA&&now-DA.t0<900){const q=(now-DA.t0)/900;c.fillStyle='#e8f0ff';c.fillRect(DX-6,y+14-16*(1-q),12,Math.max(1,10*(1-q)));c.fillStyle='#3a6ab0';c.fillRect(DX-5,y+15-16*(1-q),10,Math.max(0,8*(1-q)))}
  c.restore()}
 if(window.PLZART&&PLZART.objs){const f=PLZART.objs;PLZART.objs=function(now){const L=f.apply(this,arguments)||[];try{L.push({y:DY+.5,fn:()=>doorDraw(ctx,now)})}catch(e){}return L}}
 try{if(window.PLZ111&&PLZ111.OBST){PLZ111.OBST.push({x:DX-34,y:DY-14,w:14,h:14},{x:DX+20,y:DY-14,w:14,h:14})}}catch(e){}
 function insertPaper(){const s=SV();if(s.door||DA||!s.paper)return;DA={t0:performance.now()};try{sfx(520,.2,'sine',.05,1040)}catch(e){}
  setTimeout(()=>{try{sfx(90,.7,'sawtooth',.08,45);perc&&perc('crash',audio.currentTime)}catch(e){}},900);
  setTimeout(()=>{s.door=Date.now();DA=null;save();toast('⚙ 녹슨 철문이 열렸어요!','안으로 걸어 들어가면 「잊힌 주조소」예요')},2100)}
 const db=document.createElement('button');db.id='fd174b';db.hidden=true;document.body.appendChild(db);
 db.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();insertPaper()});
 if(typeof doAttack==='function'){const f=doAttack;doAttack=function(){if(mode==='plaza'&&nearDoor()&&SV().paper&&!SV().door){insertPaper();return}return f.apply(this,arguments)}}
 let armed=true;
 setInterval(()=>{try{const s=SV(),show=nearDoor()&&s.paper&&!s.door&&!DA;if(db.hidden===show){db.hidden=!show;db.textContent='📜 설계도 넣기'}
   if(mode!=='plaza'){armed=true;return}if(P.y>DY+26)armed=true;if(s.door&&armed&&Math.abs(P.x-DX)<16&&P.y<DY+14){armed=false;askEnter()}}catch(e){}},100);
 function askEnter(){const s=SV();const ov=document.createElement('div');ov.id='fd174q';ov.innerHTML='<div class="bx"><h3>⚙ 잊힌 주조소</h3><p>녹슨 문 너머에서 쇠 부딪히는 소리가 들려요.<br><b>20웨이브</b> · 마지막엔 주조 군주가 기다려요.<br><small>최고 기록 '+(s.best|0)+'웨이브 · 정복 '+(s.clear|0)+'번</small></p><div class="r"><button class="no">돌아가기</button><button class="go">⚔ 들어가기</button></div></div>';
  document.body.appendChild(ov);ov.querySelector('.no').onclick=()=>ov.remove();ov.querySelector('.go').onclick=()=>{ov.remove();try{if(window.PLZ111&&PLZ111.leave)PLZ111.leave()}catch(e){}start()}}

 /* ================= 공방 부엉이 · 비밀 작업실 ================= */
 const LINES=['어서 와! 오늘은 뭘 고칠까?','부엉! 나를 왜 콕콕 찔러?','내 깃털은 기름칠이 잘 돼 있다고.','태엽은 하루에 한 번 감아 줘야 해.','손님, 뭐 사러 온 거 맞지?',
  '이 공방은 내가 지은 거라니까.','쉿… 벽 뒤에서 무슨 소리 안 들려?','자꾸 누르면 깃털 빠진다!','부엉… 부엉…','그만 좀 눌러!','…정말 궁금한 거야?','이 공방엔 비밀이 하나 있긴 하지.',
  '벽에 금이 간 건 신경 쓰지 마.','계속 누르면 큰일 난다니까?','…알았어, 알았다고!'];
 function owlLine(n){if(SV().paper)return ['설계도는 잘 가지고 있지?','광장의 녹슨 철문… 조심해.','주조 군주는 아직도 화가 나 있을 거야.','부엉!'][n%4];
  if(n>=45)return ['그만!! 벽이… 벽이 갈라진다!','더 누르면 정말 몰라!','…'][n%3];if(n>=30)return LINES[8+(n%7)];if(n>=10)return LINES[4+(n%8)];return LINES[n%LINES.length]}
 document.addEventListener('pointerdown',e=>{try{const cv=e.target;if(!cv||cv.id!=='wsCv')return;const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*cv.width,y=(e.clientY-r.top)/r.height*cv.height;
   if(x<240||x>284||y<66||y>110)return;const s=SV();s.owl=(s.owl|0)+1;const n=s.owl;try{WS.jump=performance.now();wsSay(owlLine(n))}catch(_){}try{sfx(700+Math.random()*300,.06,'square',.04,500)}catch(_){}
   if(!s.paper&&n>=50){s.owl=0;save();splitShop()}else if(n%10===0)save()}catch(err){}},true);
 /* 비밀 작업실 그림 */
 function roomDraw(c,now,o){const W2=c.canvas.width,H2=c.canvas.height,t=now/1000,F=Math.round,R=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(F(x),F(y),F(w),F(h))};c.imageSmoothingEnabled=false;
  const FY=Math.round(H2*.62);R(0,0,W2,H2,'#0c0806');
  /* 벽돌 */for(let y=0;y<FY;y+=8)for(let x=-((y/8)%2)*8;x<W2;x+=16){const k=(x*7+y*13)%5;R(x,y,15,7,k===0?'#2a1c12':k===1?'#22170f':'#1e140d');R(x,y,15,1,'#33241a')}
  /* 천장 들보 · 바닥 판자 */R(0,0,W2,10,'#2a1a0e');R(0,9,W2,2,'#120a04');for(let x=20;x<W2;x+=90){R(x,0,8,14,'#3a2414');R(x,12,8,2,'#120a04')}
  R(0,FY,W2,H2-FY,'#2e1d10');for(let x=0;x<W2;x+=24){R(x,FY,1,H2-FY,'#1e1208');R(x+1,FY,1,H2-FY,'#3e2816')}R(0,FY,W2,2,'#4a3018');
  /* 벽 톱니 */for(const [gx,gy,gr,sp] of [[44,46,26,.3],[W2-46,58,20,-.4],[W2/2+120,30,12,.6]]){c.save();c.translate(gx,gy);c.rotate(t*sp);c.fillStyle='#3a2a1a';for(let i=0;i<10;i++){c.save();c.rotate(i*TAU/10);c.fillRect(-3,-gr-4,6,6);c.restore()}c.beginPath();c.arc(0,0,gr,0,TAU);c.fill();c.fillStyle='#4a3622';c.beginPath();c.arc(0,0,gr*.7,0,TAU);c.fill();c.fillStyle='#1a1008';c.beginPath();c.arc(0,0,gr*.3,0,TAU);c.fill();c.restore()}
  /* 구리 관 · 증기 */for(const px of [96,W2-104]){R(px,10,6,FY-10,'#7a4220');R(px+1,10,2,FY-10,'#c8804a');for(let y=30;y<FY;y+=44){R(px-2,y,10,3,'#3a2010');R(px-2,y,10,1,'#e0a060')}}
  for(let i=0;i<5;i++){const q=(t*.35+i/5)%1;c.globalAlpha=(1-q)*.3;R(W2-102+Math.sin(q*7+i)*4,40-q*30,3+q*4,3+q*4,'#d8d0c8')}c.globalAlpha=1;
  /* 벽에 붙인 설계도들 */for(const [bx,by,bw,bh,rt] of [[108,24,46,32,-.06],[160,42,34,24,.08],[296,24,52,34,.05],[250,46,30,22,-.1]]){c.save();c.translate(bx+bw/2,by+bh/2);c.rotate(rt);c.fillStyle='#d8e4f4';c.fillRect(-bw/2-1,-bh/2-1,bw+2,bh+2);c.fillStyle='#2e5a9a';c.fillRect(-bw/2,-bh/2,bw,bh);
   c.strokeStyle='#bcd4f4';c.lineWidth=.7;c.beginPath();c.arc(-bw/4,0,bh/4,0,TAU);c.moveTo(-bw/4-bh/4-2,0);c.lineTo(-bw/4+bh/4+2,0);for(let k=0;k<3;k++){c.moveTo(2,-bh/4+k*bh/4);c.lineTo(bw/2-4,-bh/4+k*bh/4)}c.stroke();c.fillStyle='#c83a2a';c.fillRect(-1,-bh/2-2,2,2);c.restore()}
  /* 오른쪽 벽: 비어 있는 열쇠 검 받침(빛나는 테두리) — 클라비스의 검 자리 */{const kx=W2-132,ky=78,gl=.35+.25*Math.sin(t*2);R(kx-14,ky-4,28,86,'#160e08');R(kx-13,ky-3,26,84,'#24160c');c.globalAlpha=gl;c.strokeStyle='#ffd84a';c.lineWidth=1;c.setLineDash([2,2]);c.beginPath();c.arc(kx,ky+10,7,0,TAU);c.moveTo(kx,ky+17);c.lineTo(kx,ky+74);c.moveTo(kx-6,ky+24);c.lineTo(kx+6,ky+24);c.moveTo(kx,ky+62);c.lineTo(kx+5,ky+62);c.moveTo(kx,ky+68);c.lineTo(kx+4,ky+68);c.stroke();c.setLineDash([]);c.globalAlpha=1;
   c.font='bold 6px sans-serif';c.textAlign='center';c.fillStyle='#8a6a3a';c.fillText('CLAVIS',kx,ky+88)}
  /* 왼쪽 선반 · 병 · 부품 */for(const sy of [70,104]){R(16,sy,70,4,'#5a3a1e');R(16,sy+4,70,1,'#1a0e06');R(20,sy+4,3,8,'#3a2410');R(78,sy+4,3,8,'#3a2410')}
  for(const [jx,jy,jc,jh] of [[20,58,'#6ad8a8',12],[32,62,'#ff9a4a',8],[44,56,'#a88aff',14],[58,60,'#ffd166',10],[24,94,'#c8a060',10],[40,92,'#7ad8ff',12],[60,96,'#ff6a5a',8]]){R(jx,jy,8,jh,'#1a1410');R(jx+1,jy+1,6,jh-1,jc);c.globalAlpha=.35+.2*Math.sin(t*2+jx);R(jx+1,jy+jh*.4,6,jh*.6,'#ffffff');c.globalAlpha=1;R(jx+2,jy-2,4,2,'#5a3a1e')}
  /* 매달린 등불 */for(const lx of [214,364]){R(lx,10,1,28,'#4a4a52');R(lx-5,38,10,12,'#2a1a0e');const fl=.8+.2*Math.sin(t*9+lx);R(lx-3,40,6,8,'rgba(255,200,90,'+fl+')');const g=c.createRadialGradient(lx,44,2,lx,44,60);g.addColorStop(0,'rgba(255,180,80,.22)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(lx-60,0,120,110)}
  /* 책상 · 촛불 · 공구 */const dx=W2/2-80,dy=FY-2;R(dx-2,dy-2,164,4,'#7a5430');R(dx,dy,160,10,'#5a3a1e');R(dx,dy+9,160,2,'#2a1608');R(dx+8,dy+10,8,40,'#3a2410');R(dx+144,dy+10,8,40,'#3a2410');R(dx+16,dy+30,128,3,'#2a1608');
  const fl=.8+.2*Math.sin(t*12);R(dx+130,dy-14,6,14,'#e8dcc0');R(dx+130,dy-14,6,2,'#fff4e0');c.fillStyle='#ffd060';c.beginPath();c.ellipse(dx+133,dy-18,2.4*fl,4*fl,0,0,TAU);c.fill();
  const g=c.createRadialGradient(dx+133,dy-18,2,dx+133,dy-18,110);g.addColorStop(0,'rgba(255,190,90,.38)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,W2,H2);
  R(dx+10,dy-4,20,4,'#8a8a90');R(dx+10,dy-4,20,1,'#c8c8d0');R(dx+28,dy-7,4,3,'#5a3a1e');c.fillStyle='#c89a40';c.beginPath();c.arc(dx+44,dy-4,5,0,TAU);c.fill();R(dx+42,dy-6,4,4,'#6a4a1a');
  R(dx+98,dy-10,16,10,'#4a5a6a');R(dx+98,dy-10,16,2,'#7a8a9a');R(dx+116,dy-6,10,6,'#3a2414');R(dx+117,dy-5,8,1,'#c8a060');
  /* 바닥: 상자 · 부품 */R(30,FY+18,40,30,'#4a2e16');R(30,FY+18,40,2,'#6a4628');R(30,FY+32,40,2,'#2a1808');R(48,FY+18,2,30,'#2a1808');R(W2-78,FY+30,26,18,'#3a2414');R(W2-78,FY+30,26,2,'#5a3a1e');
  for(const [px,py] of [[100,FY+40],[120,FY+52],[W2-110,FY+46],[W2-130,FY+58]]){c.fillStyle='#5a4a3a';c.beginPath();c.arc(px,py,3,0,TAU);c.fill();R(px-1,py-1,2,2,'#1a1008')}
  /* 설계도 */if(!o.taken){const px=W2/2-22,py=dy-12+Math.sin(t*2)*1.5,gl=.5+.5*Math.sin(t*3);c.globalAlpha=.25*gl+.1;R(px-8,py-8,60,30,'#ffe9a8');c.globalAlpha=1;R(px-1,py-1,46,16,'#e8f0ff');R(px,py,44,14,'#3a6ab0');
   c.strokeStyle='#cfe0ff';c.lineWidth=.8;c.beginPath();c.arc(px+12,py+7,4,0,TAU);c.moveTo(px+20,py+4);c.lineTo(px+38,py+4);c.moveTo(px+20,py+7);c.lineTo(px+34,py+7);c.moveTo(px+20,py+10);c.lineTo(px+36,py+10);c.stroke();
   for(let i=0;i<4;i++){const a=t*2+i*1.57;R(W2/2+Math.cos(a)*30,py+7+Math.sin(a)*12,2,2,'#ffe9a8')}
   c.fillStyle='#ffe9a8';c.font='bold 9px sans-serif';c.textAlign='center';c.fillText('눌러서 가져가기',W2/2,py-12);c.beginPath();c.moveTo(W2/2-4,py-8);c.lineTo(W2/2+4,py-8);c.lineTo(W2/2,py-4);c.fill()}
  /* 먼지 */for(let i=0;i<18;i++){const q=(t*.08+i/18)%1;R((i*67)%W2,FY-q*FY,1.5,1.5,'rgba(255,220,160,'+(.25*(1-q))+')')}
  /* 가장자리 어둡게 */const v=c.createRadialGradient(W2/2,H2*.55,H2*.3,W2/2,H2*.55,W2*.62);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.6)');c.fillStyle=v;c.fillRect(0,0,W2,H2)}
 function splitShop(){const sm=$('shopModal');if(!sm)return;const ov=document.createElement('div');ov.id='fd174s';
  ov.innerHTML='<canvas width="480" height="270"></canvas><div class="hl"></div><div class="hr"></div><div class="tx"></div><button class="cl">닫기</button>';document.body.appendChild(ov);
  const cv=ov.querySelector('canvas'),o={taken:false};try{sfx(60,1.2,'sawtooth',.08,30);perc&&perc('crash',audio.currentTime)}catch(e){}
  try{wsSay('으아악?! 벽이…!')}catch(e){}
  setTimeout(()=>ov.classList.add('open'),60);
  let raf=0;const loop=now=>{if(!ov.isConnected)return;roomDraw(cv.getContext('2d'),now,o);raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop);
  setTimeout(()=>{ov.querySelector('.tx').innerHTML='<b>🦉 부엉이:</b> …결국 들켰군. 여긴 내가 숨겨 둔 <b>비밀 작업실</b>이야.<br>책상 위 설계도는 <b>잊힌 주조소</b>로 가는 열쇠지. 광장의 <b>녹슨 철문</b>에 넣어 봐.'},1400);
  cv.addEventListener('pointerdown',e=>{if(o.taken)return;const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*480,y=(e.clientY-r.top)/r.height*270;if(Math.abs(x-240)<44&&y>120&&y<175){o.taken=true;const s=SV();s.paper=Date.now();save();
    try{sfx(880,.15,'triangle',.06,1760);setTimeout(()=>sfx(1320,.3,'triangle',.06,2640),120)}catch(_){}toast('📜 봉인 설계도를 얻었어요!','광장의 녹슨 철문에 넣어 보세요');
    ov.querySelector('.tx').innerHTML='<b>🦉 부엉이:</b> 조심해. 그 안의 <b>주조 군주</b>는 아직 깨어 있으니까.<br>그리고… 거기서 <b>클라비스의 검</b>에 대한 이야기를 들을지도 몰라.'}});
  ov.querySelector('.cl').onclick=()=>{if(!o.taken){const s=SV();s.owl=49;save()}/* 안 가져가고 닫으면 한 번만 더 누르면 다시 열림 */ov.classList.remove('open');setTimeout(()=>ov.remove(),700)}}
 /* 알림 */
 const tb=document.createElement('div');tb.id='fd174t';tb.hidden=true;document.body.appendChild(tb);let tbT=0;
 function toast(a,b){tb.innerHTML='<b>'+a+'</b><small>'+b+'</small>';tb.hidden=false;tb.classList.remove('on');void tb.offsetWidth;tb.classList.add('on');clearTimeout(tbT);tbT=setTimeout(()=>{tb.hidden=true},3800)}

 /* ================= 비밀 무기 · 클라비스의 검 ================= */
 const KEYPAL={o:'#0c0a12',X:'#ffd84a',E:'#fff6c0',G:'#4a2a6a',g:'#2a1440',C:'#ffd84a',c:'#a8862a',L:'#ffffff',B:'#fff0b0',F:'#e8c060',D:'#b08a2a',T:'#c9a8ff'};
 try{WSPR.clavis174={g:7,pal:KEYPAL,r:["..ooooo..",".oXXXXXo.","oXXoooXXo","oXo.T.oXo","oXXoooXXo",".oXXXXXo.","..ooCoo..","...oGo...","...ogo...","...oGo...","...ogo...","oooCCCooo","oCCcTcCCo",".ooCCCoo.",
   "..oLBDo..","..oLBDo..","..oLFDo..","..oLBDo..","..oLBDo..","..oLTDo..","..oLBDo..","..oLBDo..","..oLFDo..","..oLBDo..","..oLBDoo.","..oLBDXo.","..oLBDoo.","..oLBDXXo","..oLBDoo.","...oLo...","....o...."]}}catch(e){}
 const CL_IDX=WEAPONS.length;
 WEAPONS.push({name:'클라비스의 검',type:'clavis174',ult:'clavis174',price:10000,dmg:2.24,crit:.18,range:8,grogi:.15,abl:{keythrow:1,keyspin:1},col:'#ffd84a',hilt:'#4a2a6a',trail:'#ffe9a8',
  sp:'봉인 해제 · 천 개의 열쇠',desc:'열쇠지기 클라비스가 남긴 열쇠 검. 🗝 열쇠 투척 · 열쇠 회오리. ⚡궁극기 「봉인 해제 · 천 개의 열쇠」 시간을 잠그고 하늘에서 열쇠가 쏟아진 뒤 모든 자물쇠가 한꺼번에 풀리며 터져요.',hitF:520,myth:1,v100:1,grade:'myth',secret174:1});
 /* 전용 궁극기 (ULT139 형식) */
 try{const U=ULT139.U,ea=k=>1-Math.pow(1-Math.max(0,Math.min(1,k)),3),fd=(t,a,b)=>t<a||t>b?0:Math.sin((t-a)/(b-a)*Math.PI);
  U.clavis174={n:'봉인 해제 · 천 개의 열쇠',c:'#ffd84a',m:1.4,freeze:1,s:[330,.5,'sine',.07,990],tn:['#1a0a2a',.4],
   h:[[420,.12,'all','stun'],[760,.14,'rand'],[960,.14,'rand'],[1160,.14,'rand'],[1600,.46,'all','exec']],
   fx(o,S,t){const cx=AX+AW/2,cy=AY+AH/2;o.save();
    /* ① 거대한 자물쇠 문양이 열리며 시간이 잠김 */const q1=ea(t/420),a1=fd(t,0,1900);if(a1>0){o.globalAlpha=a1*.8;o.strokeStyle='#ffd84a';o.lineWidth=2;o.beginPath();o.arc(cx,cy,90*q1,0,TAU);o.stroke();o.beginPath();o.arc(cx,cy,72*q1,0,TAU);o.stroke();
     for(let i=0;i<12;i++){const a=i/12*TAU+t/900;o.save();o.translate(cx+Math.cos(a)*81*q1,cy+Math.sin(a)*81*q1);o.rotate(a);o.fillStyle='#ffd84a';o.fillRect(-3,-1,6,2);o.restore()}
     o.globalAlpha=a1*.5;o.fillStyle='#c9a8ff';o.font='900 10px serif';o.textAlign='center';o.fillText('✦ SEAL · RELEASE ✦',cx,cy-96*q1)}
    /* ② 하늘에서 열쇠 비 */for(let i=0;i<26;i++){const st=380+i*38,k=(t-st)/420;if(k<0||k>1.2)continue;const x=AX+((i*97)%AW),y=AY-10+(AH+20)*Math.min(1,k);o.globalAlpha=Math.min(1,(1.2-k)*3);o.save();o.translate(x,y);o.rotate(Math.PI/2);o.fillStyle='#ffe9a8';o.fillRect(-8,-1,12,2);o.beginPath();o.arc(-10,0,3,0,TAU);o.fill();o.fillRect(2,0,2,3);o.fillRect(-2,0,2,2);o.restore()}
    /* ③ 사슬 · 마지막에 한꺼번에 풀리며 터짐 */const a3=fd(t,1100,1700);if(a3>0){o.globalAlpha=a3;o.strokeStyle='#c9a8ff';o.lineWidth=1.5;for(let i=0;i<6;i++){const a=i*TAU/6;o.beginPath();for(let j=0;j<10;j++){const r=j*14;o.lineTo(cx+Math.cos(a)*r+(j%2?2:-2),cy+Math.sin(a)*r)}o.stroke()}}
    const a4=fd(t,1550,2100);if(a4>0){o.globalAlpha=a4;const g=o.createRadialGradient(cx,cy,4,cx,cy,220*ea((t-1550)/300));g.addColorStop(0,'#ffffff');g.addColorStop(.4,'#ffe9a8');g.addColorStop(1,'rgba(201,168,255,0)');o.fillStyle=g;o.fillRect(AX,AY,AW,AH)}
    o.restore()}};
  ULT139.DESC.clavis174='시간을 잠그고(적이 멈춤) 하늘에서 열쇠가 쏟아진 뒤, 모든 자물쇠가 한꺼번에 풀리며 화면 전체가 터져요. 남은 체력이 적은 적은 바로 쓰러져요.'}catch(e){console.error('fd174 ult',e)}
 /* 공방 카드: 정복 전에는 숨기고, 정복하면 「✪ 비밀」로 맨 앞에 */
 const unlocked=()=>{try{return (SV().clear|0)>0||shopInv().inv.wp.includes(CL_IDX)}catch(e){return false}};
 setInterval(()=>{try{const cv=document.querySelector('#shopGrid canvas[data-k="wp"][data-i="'+CL_IDX+'"]');if(!cv)return;let el=cv;while(el.parentElement&&el.parentElement.id!=='shopGrid')el=el.parentElement;
   const u=unlocked();el.classList.toggle('lk152',!u);el.classList.toggle('sc152',u);if(u&&!SV().seen&&typeof shopTab!=='undefined'&&shopTab==='wp'){SV().seen=1;save();try{WS.sel.wp=CL_IDX;renderShop()}catch(e){}}}catch(e){}},700);
 /* 정복 전에 사려고 하면 막기(목록에서 숨겼지만 혹시 고른 경우) */
 if(typeof wsRefresh==='function'){const f=wsRefresh;wsRefresh=function(){const r=f.apply(this,arguments);try{if(shopTab==='wp'&&wsSelOf('wp')===CL_IDX&&!unlocked()){const b=$('wsBtn');if(b){b.disabled=true;b.textContent='🔒 잊힌 주조소를 정복하면 열려요'}}}catch(e){}return r}}
 if(typeof wsAct==='function'){const f=wsAct;wsAct=function(){try{if(shopTab==='wp'&&wsSelOf('wp')===CL_IDX&&!unlocked()){wsSay('그 검은… 잊힌 주조소를 정복한 사람만 살 수 있어.');return}}catch(e){}return f.apply(this,arguments)}}
 try{if(window.EGG126&&EGG126.EG&&!EGG126.EG.some(x=>x.id==='foundry'))EGG126.EG.push({id:'foundry',ic:'⚙',n:'잊힌 주조소 정복',hint:'공방 주인은 귀찮게 하면 비밀을 털어놓는다…',how:'공방 부엉이를 50번 눌러 설계도를 얻고, 광장의 녹슨 철문으로 들어가 20웨이브를 정복하기',dia:100})}catch(e){}

 const css=document.createElement('style');css.textContent=`
 #fd174s{position:fixed;inset:0;z-index:9700;background:#000;display:grid;place-items:center;opacity:0;transition:opacity .3s}#fd174s.open{opacity:1}
 #fd174s canvas{width:min(92vw,calc(78vh*480/270));height:auto;image-rendering:pixelated;border-radius:12px;box-shadow:0 0 40px #ff9a3a44}
 #fd174s .hl,#fd174s .hr{position:fixed;top:0;bottom:0;width:50%;background:repeating-linear-gradient(90deg,#3a2414 0 22px,#2e1c10 22px 24px),#3a2414;box-shadow:inset 0 0 40px #000;transition:transform 1.3s cubic-bezier(.6,.05,.3,1) .35s;animation:fd174sh .35s linear 2}
 #fd174s .hl{left:0;border-right:3px solid #1a0e06;clip-path:polygon(0 0,100% 0,96% 18%,100% 36%,95% 55%,100% 72%,96% 88%,100% 100%,0 100%)}#fd174s .hr{right:0;border-left:3px solid #1a0e06;clip-path:polygon(4% 0,100% 0,100% 100%,0 100%,4% 88%,0 72%,5% 55%,0 36%,4% 18%)}
 #fd174s.open .hl{transform:translateX(-102%)}#fd174s.open .hr{transform:translateX(102%)}@keyframes fd174sh{25%{margin-left:-6px}75%{margin-left:6px}}
 #fd174s .tx{position:fixed;left:50%;bottom:6vh;transform:translateX(-50%);width:min(560px,92vw);padding:10px 14px;border-radius:12px;background:#120a06e6;border:1px solid #c89a4066;color:#f4e6d0;font-size:13px;line-height:1.6;text-align:center}#fd174s .tx:empty{display:none}#fd174s .tx b{color:#ffd166}
 #fd174s .cl{position:fixed;left:30px;top:24px;font:inherit;font-weight:900;padding:8px 14px;border-radius:10px;border:0;background:#3a2414;color:#ffe9a8;cursor:pointer}
 #fd174b{position:fixed;left:50%;bottom:120px;transform:translateX(-50%);z-index:80;font:inherit;font-weight:900;font-size:15px;padding:12px 20px;border-radius:14px;border:0;background:linear-gradient(180deg,#ffe9a8,#c89a40);color:#2a1406;box-shadow:0 0 0 2px #000,0 0 18px #ffb04088;cursor:pointer}#fd174b[hidden]{display:none}
 #fd174q{position:fixed;inset:0;z-index:9500;display:grid;place-items:center;background:#000a}#fd174q .bx{width:min(380px,92vw);padding:16px;border-radius:16px;background:linear-gradient(180deg,#2a1a0e,#120a06);border:2px solid #ffb04088;color:#f4e6d0;text-align:center;box-shadow:0 0 30px #ff7a2a55}
 #fd174q h3{margin:0 0 8px;color:#ffd166}#fd174q p{font-size:13px;line-height:1.7;margin:0 0 12px}#fd174q small{color:#c8a880}#fd174q .r{display:flex;gap:8px}#fd174q button{flex:1;font:inherit;font-weight:900;padding:11px;border-radius:11px;border:0;cursor:pointer}
 #fd174q .no{background:#3a2a1e;color:#e8d8c0}#fd174q .go{background:linear-gradient(180deg,#ffb060,#e85a1a);color:#fff;box-shadow:0 0 12px #ff7a2a88}
 #fd174t{position:fixed;left:50%;top:18%;transform:translateX(-50%);z-index:9800;display:flex;flex-direction:column;align-items:center;gap:2px;padding:12px 22px;border-radius:16px;background:radial-gradient(120% 120% at 50% 0%,#5a3414,#120a06);border:2px solid #ffd166;color:#fff;box-shadow:0 0 30px #ffb04088;pointer-events:none;font-family:inherit}
 #fd174t[hidden]{display:none}#fd174t b{font-size:19px;color:#ffe9a8}#fd174t small{font-size:12px;color:#d8c0a0}#fd174t.on{animation:fd174t 3.8s ease-out forwards}@keyframes fd174t{0%{opacity:0;transform:translateX(-50%) scale(.6)}8%{opacity:1;transform:translateX(-50%) scale(1.08)}14%{transform:translateX(-50%) scale(1)}85%{opacity:1}100%{opacity:0}}`;document.head.appendChild(css);
 window.FD174={SV,start,finish,R,B,bossPose,bossDraw,force:k=>{B.force=k;B.cd=0},setupWave,splitShop,insertPaper,CL_IDX,doorDraw,DX,DY};
}catch(e){console.error('v174 foundry',e)}})();
