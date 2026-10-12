/* ================= v177 월드 보스 · 용의 둥지 (WB177) =================
   ① 광장 분수 아래에 포탈이 열린다(PLZART.objs). 걸어 들어가면 정보 창 → 「입장」
   ② 싸움은 탑 경기장을 빌린다(TW71 · T.ext, 잊힌 주조소와 같은 방식) → 탑의 전투 기능이 모두 같다.
   ③ 서버 전체가 같은 체력을 깎는다(app.py /api/wb/*): 알 → (알이 깨지면) 아기 드래곤 무리 → (다 잡으면) 대형 드래곤.
      내 판에서 넣은 피해는 3초마다 서버로 보내고, 지금 단계를 받아 단계가 바뀌면 그 자리에서 알이 깨지거나 드래곤이 날아온다.
   ④ v178: 드래곤은 몇 시간마다 나타난다(서버 WB_LIFE_H시간 안에 못 잡으면 도망, 끝나면 WB_REST_H시간 뒤 다음 드래곤).
      한 판 시간 제한 · 입장 횟수 없음 — 쓰러지면 바로 다시 들어오면 된다. 끝나면(토벌 · 도망) 피해를 넣은 사람 모두에게 우편 보상.
   그림: 알 m_wb_egg · 아기 드래곤 m_wb_baby(앞/옆/뒤 · 날갯짓 · 불 뿜기) · 대형 드래곤 VD(매끈한 곡선으로 직접 그린 옆모습, 1칸=1픽셀 도트로 굳힘 · 공격마다 몸동작) — 난이도마다 비늘 색이 다름 */
(function(){try{
 if(!window.TW71||!TW71.SP||typeof MON==='undefined')return;
 const TAU=Math.PI*2,$=id=>document.getElementById(id),num=n=>Math.round(+n||0).toLocaleString(),RG=MON.reg;
 const mix=(a,b,k)=>{try{return monMix(a,b,k)}catch(e){return a}};
 const TRI=()=>({easy:0,normal:1,hard:2,extreme:3})[typeof diff!=='undefined'?diff:'normal']||0;
 /* 난이도별 비늘: 쉬움 붉은 · 보통 진홍 · 어려움 쇠비늘+금 · 익스트림 흑요석+용암 */
 const DPAL=[{sc:'#c8402a',md:'#8a2418',dk:'#4a0e08',lt:'#ff8a5a',bl:'#ffd9a0',blD:'#c89a5a',wing:'#a82a1a',wingL:'#ff6a3a',horn:'#f4e6c8',eye:'#ffe74a',hot:'#ffb040'},
  {sc:'#9a1e1a',md:'#6e1410',dk:'#3a0606',lt:'#d8483a',bl:'#e8c08a',blD:'#a87a4a',wing:'#7a1a18',wingL:'#c8382a',horn:'#e8dcc0',eye:'#ffd23a',hot:'#ff8a2a'},
  {sc:'#4a3a46',md:'#2e2430',dk:'#140c14',lt:'#8a7484',bl:'#d8b060',blD:'#8a6a2a',wing:'#3a2434',wingL:'#7a4a5a',horn:'#ffd166',eye:'#7af0ff',hot:'#7ad8ff'},
  {sc:'#24141a',md:'#160a10',dk:'#050204',lt:'#5a2a34',bl:'#ff6a2a',blD:'#8a1a08',wing:'#1a0a12',wingL:'#ff4a1a',horn:'#2a1a1a',eye:'#ff3a1a',hot:'#ff4a1a'}];

 /* ================= 알 (넓은 그림판, sp.draw로 바로 그림) ================= */
 const pulse=t=>{const p=(t%1.1)/1.1;return Math.max(0,1-p*5)+Math.max(0,1-Math.abs(p-.22)*7)*.7};/* 심장 박동 두 번 */
 RG.m_wb_egg=A=>{const o=A.o,t=A.t,k=o.crack||0,h=o.hatch||0,tr=o.tier||0,D=DPAL[tr],hb=pulse(t);
  const sx=h>0?Math.sin(t*70)*h*1.6:(k>.75?Math.sin(t*45)*.5*(k-.75)*4:0);
  /* 둥지 뒤쪽 · 뼈 · 금화 */
  for(let i=0;i<26;i++){const a=Math.PI+i/25*Math.PI,x=Math.cos(a)*21,y=-3+Math.sin(a)*6,c=['#6a4a2a','#4a3018','#8a6a3a','#5a3a20'][i%4];A.L(x-2.4,y-.6+(i%3)*.4,x+2.6,y+.5-(i%2),c,1.3)}
  A.E(0,-2,19,4.6,'#2a1a0e');A.E(0,-2.6,16,3,'#140a04');
  for(const [x,y,r] of [[-12,-3.5,1.1],[10,-3.8,1],[-6,-2.6,.9],[14,-2.4,.8],[4,-3.2,.9]]){A.C(x,y,r,'#ffd84a');A.C(x-.3,y-.3,r*.4,'#fff6c0')}
  /* 알 */const ex=sx,ey=-19;A.E(ex,ey,13.2,17.2,'#140404');A.E(ex,ey,12.6,16.6,D.md);A.E(ex+2.6,ey+2.5,10,13.6,D.dk,.55);A.E(ex-3.5,ey-5,7,9,D.sc,.65);
  /* 비늘 무늬 */for(let row=0;row<9;row++){const y=ey-14+row*3.4,w=12.4*Math.sqrt(Math.max(0,1-Math.pow((y-ey)/16.6,2)));for(let x=-w+1.6;x<w-1;x+=3.2){const xx=ex+x+(row%2)*1.6;A.E(xx,y,1.5,1,D.dk,.5);A.E(xx-.2,y-.45,1.2,.5,D.lt,.35)}}
  /* 금빛 반점 */for(let i=0;i<12;i++){const a=i*2.39,r=(i%4)/4*9+2;A.C(ex+Math.cos(a)*r*.9,ey+Math.sin(a)*r*1.3,.55,'#ffd166',.8)}
  /* 핏줄(박동) */const va=.25+.65*hb;for(const [pts] of [[[[-6,-8],[-3,-14],[-5,-20],[-2,-26]]],[[[5,-6],[7,-13],[4,-19],[6,-25]]],[[[0,-4],[1,-10],[-1,-16]]]])for(let i=1;i<pts.length;i++)A.L(ex+pts[i-1][0],pts[i-1][1]-2,ex+pts[i][0],pts[i][1]-2,D.hot,.55,va);
  A.glow(ex,ey+2,14+hb*6,D.hot,.35+hb*.4);
  /* 금 간 자리: 서버 알 체력이 줄수록 늘어남 */const n=Math.floor(k*9);const CR=[[[0,-35],[-1.5,-31],[1,-28],[-1,-24]],[[4,-33],[6,-29],[4.5,-26],[7,-22]],[[-5,-32],[-7,-28],[-5,-25],[-8,-21]],[[9,-24],[11.5,-21],[10,-17]],[[-10,-22],[-12,-18],[-10.5,-14]],[[2,-24],[0,-19],[2.5,-15],[0.5,-11]],[[-3,-14],[-5.5,-10],[-3.5,-6]],[[7,-14],[9,-10],[6.5,-6]],[[-8,-9],[-10.5,-6]]];
  for(let i=0;i<n&&i<CR.length;i++){const c=CR[i];for(let j=1;j<c.length;j++){A.L(ex+c[j-1][0],c[j-1][1],ex+c[j][0],c[j][1],'#140404',1.1);A.L(ex+c[j-1][0],c[j-1][1],ex+c[j][0],c[j][1],'#ffd070',.45)}A.glow(ex+c[1][0],c[1][1],3+k*4,'#ffb040',.5+k*.5)}
  if(h>0){A.glow(ex,ey,10+h*30,'#fff0c0',h)}
  A.E(ex-5,ey-9,2.2,3.6,'#ffffff',.18);
  /* 둥지 앞쪽 */for(let i=0;i<22;i++){const a=i/21*Math.PI,x=Math.cos(a)*21,y=-2+Math.sin(a)*5.4,c=['#7a5a32','#5a3a1e','#9a7a4a'][i%3];A.L(x-2.6,y+(i%2)*.5,x+2.6,y-.6,c,1.4)}
  A.L(-15,-.4,-10,1.2,'#e8e0d0',1);A.C(-15.2,-.6,.8,'#e8e0d0');A.C(-9.8,1.4,.8,'#e8e0d0');
  A.aura=D.hot;A.rim='rgba(255,200,150,.6)';A.bbox=[-24,-38,24,4]};

 /* ================= 아기 드래곤 (40×40 칸 · 잡몹처럼 미리 그려 둠) ================= */
 RG.m_wb_baby=A=>{const o=A.o,t=A.t,v=o.view||'front',tr=o.tier||0,D=DPAL[tr],atk=o.atk||o.hit,fl=o.hit?.9:o.atk?-.6:Math.sin(t*12+(o.walk||0)*TAU),by=-5+Math.sin(t*6)*.6;
  const horn=(x,y,s)=>A.P([[x,y],[x+s*-1.8,y-3.2],[x+s*.9,y-.4]],D.horn);
  const wing=(s,x0,y0,dk)=>{const tipx=x0+s*9,tipy=y0-9-fl*4,p=[[x0,y0],[tipx,tipy],[x0+s*10.5,y0-1-fl*1.5],[x0+s*7,y0+2.5],[x0+s*3.5,y0+3]];A.P(p,dk?mix(D.wing,'#000',.35):D.wing);A.P([[x0,y0],[tipx,tipy],[x0+s*6,y0+1]],dk?mix(D.wingL,'#000',.4):D.wingL,.55);
   A.L(x0,y0,tipx,tipy,D.dk,.7);A.L(tipx,tipy,x0+s*10.5,y0-1-fl*1.5,D.dk,.5);A.L(tipx,tipy,x0+s*7,y0+2.5,D.dk,.4)};
  if(v==='side'){/* 옆(오른쪽을 봄) */
   A.L(-4,by-8,-9,by-6,D.dk,2.4);A.L(-9,by-6,-12,by-9,D.sc,1.6);A.P([[-12,by-9],[-15,by-11.5],[-14,by-7.6]],D.dk);
   wing(-1,-1,by-13,true);
   A.E(0,by-9,6,4.6,D.sc);A.E(1,by-7.6,4.2,2.4,D.bl);for(let i=0;i<3;i++)A.R(-1+i*2,by-8.4,.4,1.8,D.blD,.6);A.E(-1.5,by-11.4,3.4,1.6,D.lt,.35);
   for(let i=0;i<4;i++)A.P([[-4+i*2,by-13.2],[-3.2+i*2,by-15.4],[-2.4+i*2,by-13.2]],D.dk);
   A.R(-3.4,by-5,1.6,2.6,D.dk);A.R(2.6,by-5,1.6,2.6,D.dk);A.R(-3.6,by-2.6,2,.7,D.horn);A.R(2.4,by-2.6,2,.7,D.horn);
   A.E(5,by-13,2.6,3,D.sc);A.E(7.6,by-16,3.8,3.1,D.sc);A.E(10.8,by-15.2,2.6,1.9,D.lt);A.C(12.2,by-15.6,.45,D.dk);
   if(atk){A.P([[8.5,by-14],[13.2,by-13.4],[9,by-12]],D.dk);A.glow(13.5,by-14,4,D.hot,1);A.C(13.2,by-14,1,'#fff0c0')}
   A.C(8,by-17,1.15,D.eye);A.R(7.9,by-17.9,.35,1.7,'#1a0600');A.C(7.6,by-17.5,.3,'#fff');horn(6,by-18.6,1);horn(7.8,by-18.8,1);A.L(9,by-18.2,10.4,by-17.6,D.dk,.5);
   wing(-1,1,by-12,false)}
  else if(v==='back'){wing(-1,-2,by-12,false);wing(1,2,by-12,false);
   A.E(0,by-9,5.4,5.4,D.sc);A.E(0,by-10.5,3.6,3,D.lt,.35);A.L(0,by-5,1,by-1.5,D.sc,2.2);A.L(1,by-1.5,3.4,by-.6,D.sc,1.4);A.P([[3.4,by-.6],[5.6,by-1.6],[4.6,by+.8]],D.dk);
   for(let i=0;i<4;i++)A.P([[-.8,by-13+i*2.2],[0,by-15+i*2.2],[.8,by-13+i*2.2]],D.dk);
   A.E(0,by-17,4.2,3.6,D.sc);A.E(0,by-18,3,2,D.lt,.3);horn(-2.4,by-19.6,1);horn(2.4,by-19.6,-1);A.R(-3.6,by-4.4,1.8,2.4,D.dk);A.R(1.8,by-4.4,1.8,2.4,D.dk)}
  else{/* 앞 */wing(-1,-3,by-12,false);wing(1,3,by-12,false);
   A.E(0,by-8.6,5,5.4,D.sc);A.E(0,by-7.6,3.2,4,D.bl);for(let i=0;i<3;i++)A.R(-2.4,by-9.6+i*1.8,4.8,.4,D.blD,.7);
   A.R(-3.6,by-4,1.9,2.6,D.dk);A.R(1.7,by-4,1.9,2.6,D.dk);A.R(-3.8,by-1.6,2.3,.7,D.horn);A.R(1.5,by-1.6,2.3,.7,D.horn);
   A.E(0,by-16.5,4.6,3.9,D.sc);A.E(0,by-14,3,2.1,D.lt);A.C(-.9,by-14.4,.4,D.dk);A.C(.9,by-14.4,.4,D.dk);
   if(atk){A.E(0,by-12.6,1.8,1.2,'#2a0600');A.glow(0,by-12.4,4.5,D.hot,1);A.C(0,by-12.5,.9,'#fff0c0')}
   for(const s of [-1,1]){A.C(s*2,by-17.6,1.3,D.eye);A.R(s*2-.18,by-18.6,.36,2,'#1a0600');A.C(s*2-.4,by-18,.32,'#fff');horn(s*2.6,by-19.6,s)}}
  A.aura=D.hot;A.bbox=[-16,-30,16,0]};

 /* ================= 대형 드래곤 · 불꽃 드래곤 (넓은 그림판 80×70칸) =================
    떠 있는 채로 몸을 세운 자세: 높이 든 날개 · 앞으로 뻗은 발톱 · 아래로 감기는 긴 꼬리. 갈기 · 등가시 · 날개 끝 · 꼬리 끝에서 불꽃이 일렁임(빛 층 A.beam, 외곽선 없음) */
 const FP=[{b:'#c83a12',dk:'#5a1004',md:'#8a2008',lt:'#ff9a4a',bl:'#ffd070',blD:'#c87a2a',w:'#9a2a10',wl:'#e0641e',f0:'#ff4a12',f1:'#ffa830',f2:'#fff2a8',horn:'#ffe8b0',eye:'#fff6b0'},
  {b:'#a81c0c',dk:'#3a0604',md:'#6a120a',lt:'#ff6a2a',bl:'#ffc050',blD:'#b8601a',w:'#80180c',wl:'#d04a1a',f0:'#ff3a0a',f1:'#ff9a20',f2:'#fff0a0',horn:'#f4dcb0',eye:'#ffe060'},
  {b:'#1c3c80',dk:'#060c26',md:'#122458',lt:'#5aa8ff',bl:'#a8e4ff',blD:'#4a8ac8',w:'#14306e',wl:'#3a86d8',f0:'#2a6aff',f1:'#6ad0ff',f2:'#f0ffff',horn:'#d8f0ff',eye:'#e8ffff'},
  {b:'#3c1a20',dk:'#0e0406',md:'#26100f',lt:'#8a3434',bl:'#ff4a14',blD:'#8a1006',w:'#4a1418',wl:'#a0281a',f0:'#c80c06',f1:'#ff3a10',f2:'#ffb07a',horn:'#3a2020',eye:'#ff2a10'}];
 const KF=(L,e)=>{if(e<=L[0][0])return L[0][1];for(let i=1;i<L.length;i++)if(e<=L[i][0]){const p=L[i-1],q=L[i],k=Math.max(0,Math.min(1,(e-p[0])/(q[0]-p[0])));return p[1]+(q[1]-p[1])*k*k*(3-2*k)}return L[L.length-1][1]};
 /* 자세: wing 들어 올림(0~1) · flap · hx/hy 머리 · jaw 입 · tail 꼬리 흔들기 · fly 더 높이(px) · glow 속불 */
 function dPose(st,e,clk,moving,rage){const Q={st,e,wing:.75,flap:Math.sin(clk*3.2)*.55,hx:0,hy:Math.sin(clk*3.2+.6)*.8,jaw:.25+Math.sin(clk*1.3)*.1,tail:Math.sin(clk*1.4)*.35,fly:0,fire:0,glow:rage?.7:.35};
  if(st==='breath'){Q.hx=KF([[0,0],[.8,-3],[1.0,3],[2.0,3],[2.3,0]],e);Q.hy=KF([[0,0],[.8,-4],[1.0,4],[2.0,4],[2.3,0]],e);Q.jaw=KF([[0,.25],[.7,.5],[1.0,1],[2.0,1],[2.3,.25]],e);Q.fire=e>=1&&e<2?1:0;Q.glow=KF([[0,.35],[1,1],[2,1],[2.3,.35]],e)}
  else if(st==='gust'){Q.wing=1;Q.flap=e<.5?KF([[0,0],[.5,1.2]],e):Math.sin((e-.5)*11)*1.3;Q.jaw=.5}
  else if(st==='tail'){Q.tail=KF([[0,0],[.6,-1.6],[.85,2],[1.2,1.6],[1.5,0]],e);Q.hx=KF([[0,0],[.6,-2],[.9,3],[1.5,0]],e)}
  else if(st==='dive'){Q.wing=1;Q.flap=e<2.2?Math.sin(e*12)*1.2:0;Q.fly=KF([[0,0],[.3,6],[.9,90],[1.9,90],[2.3,0],[2.6,0]],e);Q.jaw=e>2.2&&e<2.6?1:.3}
  else if(st==='meteor'||st==='roar'||st==='arrive'){Q.hy=KF([[0,0],[.4,-6],[1.4,-6],[1.8,0]],e);Q.hx=KF([[0,0],[.4,-2],[1.4,-2],[1.8,0]],e);Q.jaw=KF([[0,.25],[.4,1],[1.4,1],[1.8,.25]],e);Q.wing=1;Q.flap=Math.sin(e*7)*.8;Q.glow=KF([[0,.35],[.4,1],[1.4,1],[1.8,.35]],e)}
  if(st==='arrive'){Q.fly=KF([[0,140],[1.4,0]],e);Q.flap=Math.sin(e*14)*1.3}
  if(st==='die'){Q.fly=-Math.min(10,e*12);Q.hy=Math.min(10,e*10);Q.jaw=.7;Q.wing=Math.max(.1,.75-e*.5);Q.flap=0}
  if(rage)Q.glow=Math.max(Q.glow,.7);return Q}
 try{if(window.__V43BIG){__V43BIG.m_wb_egg=1}}catch(e){}

 /* ================= 서버 ================= */
 const api=(p,b)=>window.DUO85&&DUO85.api?DUO85.api(p,'POST',b||{}):Promise.resolve({s:0,j:{}});
 const logged=()=>{try{return !!DUO85.acc().token}catch(e){return false}};
 const WS={st:null,at:0,busy:0};/* 마지막으로 받은 서버 상태(공동 체력 · 순위 · 내 기록) */
 async function pull(){if(WS.busy||!logged())return;WS.busy=1;try{const r=await api('/api/wb/state');if(r.s===200&&r.j.ok){WS.st=r.j;WS.at=performance.now()}}catch(e){}finally{WS.busy=0}}
 setInterval(()=>{try{if(typeof mode!=='undefined'&&mode==='plaza'&&!document.hidden&&performance.now()-WS.at>20000)pull()}catch(e){}},2000);
 const frac=ph=>{const s=WS.st;if(!s)return 1;if(s.killed||ph<s.phase)return 0;if(ph>s.phase)return 1;return Math.max(0,s.hp[ph]/Math.max(1,s.max[ph]))};
 const rageOn=()=>frac(2)<.4;
 /* 서버 시각(받은 now + 그 뒤 흐른 시간) · 남은 시간 글자 */
 const srvNow=()=>WS.st?WS.st.now+(performance.now()-WS.at)/1000:Date.now()/1000;
 const alive=()=>{const s=WS.st;return !!s&&!s.killed&&srvNow()<s.ends};
 const hm=sec=>{sec=Math.max(0,Math.floor(sec));const h=Math.floor(sec/3600),m=Math.floor(sec%3600/60);return h?h+'시간 '+m+'분':m?m+'분 '+(sec%60)+'초':(sec%60)+'초'};
 const clk=sec=>{sec=Math.max(0,Math.floor(sec));const h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s2=sec%60;return (h?h+':'+String(m).padStart(2,'0'):m)+':'+String(s2).padStart(2,'0')};

 /* ================= 탑 엔진에 새 종류 ================= */
 const TSP=TW71.SP,SPC=TW71.SPC||{},ELN=TW71.ELN||{},U=2.2,FL=101;
 const DM=()=>({easy:.8,normal:1,hard:1.5,extreme:2.2}[typeof diff!=='undefined'?diff:'normal']||1);
 TSP.wb_egg={n:'드래곤의 알',hp:1e9,r:18,us:U,top:42,noTouch:1,noBar:1,rows:TSP.golem.rows,upd:eggUpd,draw:eggDraw};
 TSP.wb_baby={n:'아기 드래곤',hp:150,r:7,rows:(TSP.bat||TSP.slime).rows,upd:babyUpd};
 TSP.wb_dragon={n:'대형 드래곤',hp:1e9,r:22,us:U,top:60,touch:16,noBar:1,rows:TSP.golem.rows,upd:dragonUpd,draw:dragonDraw};
 SPC.wb_egg=['#9a1e1a','#3a0606'];SPC.wb_baby=['#c8402a','#4a0e08'];SPC.wb_dragon=['#9a1e1a','#3a0606'];
 ELN.wb_egg='드래곤의 알';ELN.wb_baby='불꽃 아기 용';ELN.wb_dragon='대형 드래곤';
 const R={on:false,run:null,t0:0,acc:0,my:0,ph:0,saved:null,end:false,kill:false,sending:0,fx:[],last:0};
 function newMob(sp,x,y,extra){const T=TW71.T;const m=Object.assign({sp,elite:false,x,y,vx:0,vy:0,hp:TSP[sp].hp,max:TSP[sp].hp,s:1,born:.8,bornMax:.8,st:'idle',st0:0,cd:1,face:1,hitT:-9,stunT:-9,ang:0,seed:Math.random()*99,id:(T.mid=(T.mid||0)+1)},extra||{});T.mobs.push(m);return m}
 const ember=()=>({sp:'wisp',elite:false,hp:Math.round(TSP.wisp.hp*TW71.TF(FL)*DM()*.6)});
 const baby=()=>({sp:'wb_baby',elite:false,hp:Math.round(TSP.wb_baby.hp*TW71.TF(FL)*DM())});
 const FPAL=()=>{const z=TW71.ZPAL;return Object.assign({},(z&&z[2])||{},{n:'용의 둥지',a:'#ff9a4a',b:'#3a0a06',c:'#ff6a2a'})};

 /* ---------- 알 ---------- */
 function eggUpd(m,dt){const T=TW71.T;if(!m._i){m._i=1;m.wbc=1;m.fx=m.x;m.fy=m.y;m.cd=2.6}m.x=m.fx;m.y=m.fy;m.vx=m.vy=0;
  if(m.hatchT!=null){if(T.clk-m.hatchT>1.7&&!m._gone){m._gone=1;hatchOut(m)}return [0,0]}
  m.cd-=dt;if(m.cd<=0){m.cd=3.2+Math.random()*1.2;if(Math.random()<.55){TW71.eTel({k:'c',x:m.x,y:m.y,r:70,dmg:10},1.1);m.pulseT=T.clk+1.1;TW71.addPop(m.x,m.y-86,'★ 열기 폭발!','#ffb060');try{sfx(90,.5,'sine',.05,180)}catch(e){}}
   else{for(let i=0;i<2;i++)T.queue.push({sp:'wisp',elite:false,hp:Math.round(TSP.wisp.hp*TW71.TF(FL)*DM()*.6)});TW71.addPop(m.x,m.y-86,'★ 불씨가 깨어난다!','#ffd070')}}
  return [0,0]}
 function hatchOut(m){const T=TW71.T;R.hatch={x:m.x,y:m.y,t:performance.now()};m.wbc=0;T.queue=[];for(let i=0;i<8;i++)T.queue.push(baby());T.nextSpawn=0;T.cap=10;
  T.mobs=T.mobs.filter(q=>q!==m);for(let i=0;i<3;i++)TW71.burst(m.x,m.y-30,14,['#ffd070','#ff6a2a','#fff0c0'][i],180);T.shake=Math.max(T.shake||0,.9);
  try{sfx(60,.9,'sawtooth',.08,30);sfx(880,.4,'triangle',.05,1760)}catch(e){}TW71.addPop(m.x,m.y-90,'알이 깨졌다!','#fff0c0');R.ph=1}
 /* ---------- 아기 드래곤 ---------- */
 function babyUpd(m,dt,o){const T=TW71.T;if(!m._i){m._i=1;m.wbc=1;m.cd=.8+Math.random()*1.2;if(R.hatch&&performance.now()-R.hatch.t<1500){m.x=R.hatch.x+(Math.random()-.5)*50;m.y=R.hatch.y+(Math.random()-.5)*24}}
  if(m.flee){m.wbc=0;m.fleeT=(m.fleeT||0)+dt;if(m.fleeT>1.3)m._rm=1;return [(m.x<AX+AW/2?-1:1)*140,-170]}
  const a=o.a,d=o.d;m.cd-=dt;
  if(m.st==='dash'){if(T.clk-m.st0>.32){m.st='idle';m.cd=1.4+Math.random()}return [Math.cos(m.ra)*240,Math.sin(m.ra)*240]}
  if(m.cd<=0){m.hitPose=T.clk;if(d<75){m.st='dash';m.st0=T.clk;m.ra=a;try{sfx(900,.1,'sine',.03,400)}catch(e){}}else{TW71.shoot(m,a,115,7,4,'#ffb040','fire');m.cd=1.7+Math.random()*.8}}
  const tx=P.x-Math.cos(a)*85+Math.cos(T.clk*1.3+m.seed)*30,ty=(P.y-6)-Math.sin(a)*85+Math.sin(T.clk*1.7+m.seed)*20;return [(tx-m.x)*1.6,(ty-m.y)*1.6]}
 /* ---------- 대형 드래곤 ---------- */
 const DG={st:'move',t0:0,cd:2.5,n:0,view:'side',face:1};
 const viewTo=(dx,dy)=>Math.abs(dx)>Math.abs(dy)*.9?['side',dx>=0?1:-1]:[dy>0?'front':'back',dx>=0?1:-1];
 const mouthW=(m,Q)=>{const fy=m.y+TSP.wb_dragon.r*.75-(Q?Q.fly:0)-HOV;const [mx,my]=VD.mouth(Q||dPose('move',0,0,false,0));return [m.x+DG.face*mx,fy+my]};
 function dragonUpd(m,dt,o){const T=TW71.T,c=T.clk,eT=TW71.eTel;if(!m._i){m._i=1;m.wbc=1;Object.assign(DG,{st:m.arrive?'arrive':'move',t0:c,cd:2.6,n:0,view:'side',face:1,a1:0})}
  const e=c-DG.t0,rage=rageOn(),k=rage?.75:1,end=()=>{DG.st='move';DG.t0=c;DG.cd=(rage?1.3:2.1)+Math.random()*.7;DG.a1=DG.a2=DG.a3=0};
  if(DG.st==='die')return [0,0];
  if(DG.st==='arrive'){if(!DG.a1&&e>1.35){DG.a1=1;T.shake=Math.max(T.shake||0,1);try{sfx(55,1,'sawtooth',.09,28)}catch(err){}TW71.burst(m.x,m.y+10,24,'#c8a070',160);TW71.addPop(m.x,m.y-140,'🐉 대형 드래곤이 내려왔다!','#ffd166')}if(e>1.9)end();return [0,0]}
  if(DG.st==='move'){DG.cd-=dt;const tx=AX+AW/2+Math.sin(c*.35)*110,ty=AY+142+Math.sin(c*.6)*10;
   if(DG.cd<=0){DG.n++;const L=['breath','gust','tail','dive','meteor','breath'];DG.st=DG.force||L[(DG.n*5+Math.floor(c*7))%L.length];DG.force=null;DG.t0=c;DG.a1=DG.a2=DG.a3=0;
    let [v,f]=viewTo(P.x-m.x,(P.y-6)-(m.y-40));v='side';/* 큰 용은 늘 비스듬한 옆모습(정면은 날개가 납작해 보여서) */if(DG.st==='tail')f=P.x>=m.x?-1:1;DG.view=v;DG.face=f;
    TW71.addPop(m.x,m.y-140,'★ '+{breath:'화염 숨결',gust:'날개 돌풍',tail:'꼬리 휩쓸기',dive:'급강하',meteor:'유성 포효'}[DG.st]+'!','#ffe79a');try{sfx(DG.st==='meteor'?70:150,.6,'sawtooth',.05,60)}catch(err){}
    if(DG.st==='breath'){const Q=dPose('breath',1,c,false,rage),[mx,my]=mouthW(m,Q),a0=Math.atan2((P.y-6)-my,P.x-mx);DG.mo=[mx,my];DG.ba=[-.42,-.21,0,.21,.42].map(d=>a0+d);for(const a of DG.ba)eT({k:'l',x:mx,y:my,a,len:330,w:13,dmg:11},1.0*k);
     for(const dl of [1.35,1.7])for(const a of DG.ba)T.tels.push({k:'l',x:mx,y:my,a,len:330,w:13,t1:c+dl*k,t2:c+dl*k+.12,dmg:7})}
    if(DG.st==='tail'){eT({k:'c',x:m.x-DG.face*34,y:m.y+4,r:64,dmg:14},.85*k)}
    if(DG.st==='meteor'){const n=rage?9:6;DG.mt=[];for(let i=0;i<n;i++){const x=Math.max(AX+20,Math.min(AX+AW-20,P.x+(Math.random()-.5)*190)),y=Math.max(AY+30,Math.min(AY+AH-10,P.y+(Math.random()-.5)*110)),w=(.9+i*.12)*k;eT({k:'c',x,y,r:30,dmg:13,boom:1},w);DG.mt.push({x,y,t1:c+w})}}}
   return [(tx-m.x)*.9,(ty-m.y)*.9]}
  if(DG.st==='breath'){if(e>2.3*k)end();return [0,0]}
  if(DG.st==='gust'){if(e>.5&&e<1.6){const dx=P.x-m.x,dy=P.y-m.y,d=Math.hypot(dx,dy)||1;if(d<230){P.x=Math.max(AX+8,Math.min(AX+AW-8,P.x+dx/d*dt*150));P.y=Math.max(AY+22,Math.min(AY+AH-3,P.y+dy/d*dt*90))}}
   for(const [key,tt] of [['a1',.7],['a2',1.2]])if(!DG[key]&&e>tt){DG[key]=1;TW71.ring({x:m.x,y:m.y-30,sp:'wb_dragon'},rage?14:10,95,8,4,'#ffd0a0','sonic',c);try{sfx(200,.3,'sine',.05,90)}catch(err){}}
   if(e>2*k)end();return [0,0]}
  if(DG.st==='tail'){if(!DG.a1&&e>.85*k){DG.a1=1;T.shake=Math.max(T.shake||0,.5);TW71.burst(m.x-DG.face*40,m.y+6,12,'#c8a070',140)}if(e>1.5*k)end();return [0,0]}
  if(DG.st==='dive'){if(e<.9){return [0,0]}if(e<1.9){if(!DG.a1){DG.a1=1;DG.tx=P.x;DG.ty=P.y}DG.tx+=(P.x-DG.tx)*Math.min(1,dt*3);DG.ty+=(P.y-DG.ty)*Math.min(1,dt*3);
    if(!DG.a2&&e>1.45){DG.a2=1;eT({k:'c',x:DG.tx,y:DG.ty,r:58,dmg:18},.8);DG.lx=DG.tx;DG.ly=DG.ty}return [0,0]}
   if(!DG.a3){DG.a3=1;m.x=DG.lx;m.y=DG.ly-10}if(e>2.26&&!DG.a4){DG.a4=1;T.shake=Math.max(T.shake||0,1);TW71.ring({x:m.x,y:m.y,sp:'wb_dragon'},12,100,9,4,'#ffb060','fire',c);TW71.burst(m.x,m.y+10,22,'#c8a070',170);try{sfx(50,.7,'square',.08,25)}catch(err){}}
   if(e>2.7){DG.a4=0;end()}return [0,0]}
  if(DG.st==='meteor'){if(e>1.9*k)end();return [0,0]}
  end();return [0,0]}
 /* ---------- 큰 그림 그리기(1초에 20번만 새로) ---------- */
 /* ================= 대형 드래곤 그림 v2: 매끈한 곡선 · 명암으로 직접 그림(옆모습, 오른쪽을 봄) =================
    좌표는 게임 단위, (0,0)=발밑. 몸을 비스듬히 세우고 떠 있는 불의 용 — 날개는 위로 솟고 꼬리는 앞으로 감김. */
 const VD=(()=>{
  const PXM={on:0,k:1};/* 도트로 굳힐 때: 빛 생략 · 선 굵게 */
  const mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];
  const sm=(o,P,closed)=>{o.beginPath();if(closed){const m=mid(P[P.length-1],P[0]);o.moveTo(m[0],m[1]);for(let i=0;i<P.length;i++){const p=P[i],q=mid(p,P[(i+1)%P.length]);o.quadraticCurveTo(p[0],p[1],q[0],q[1])}o.closePath()}
   else{o.moveTo(P[0][0],P[0][1]);for(let i=1;i<P.length-1;i++){const q=mid(P[i],P[i+1]);o.quadraticCurveTo(P[i][0],P[i][1],q[0],q[1])}const L=P[P.length-1];o.lineTo(L[0],L[1])}};
  const poly=(o,P)=>{o.beginPath();o.moveTo(P[0][0],P[0][1]);for(let i=1;i<P.length;i++)o.lineTo(P[i][0],P[i][1]);o.closePath()};
  const cb=(p0,p1,p2,p3,n)=>{const R=[];for(let i=0;i<=n;i++){const t=i/n,u=1-t;R.push([u*u*u*p0[0]+3*u*u*t*p1[0]+3*u*t*t*p2[0]+t*t*t*p3[0],u*u*u*p0[1]+3*u*u*t*p1[1]+3*u*t*t*p2[1]+t*t*t*p3[1]])}return R};
  const nrm=(C,i)=>{const a=C[Math.max(0,i-1)],b=C[Math.min(C.length-1,i+1)],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1;return [-dy/l,dx/l]};
  /* 굵기가 변하는 관(목 · 꼬리 · 다리): 왼쪽 가장자리 + 거꾸로 오른쪽 가장자리 */
  const tube=(C,w0,w1,sh)=>{const L=[],R=[],n=C.length;for(let i=0;i<n;i++){const [nx,ny]=nrm(C,i),w=(w0+(w1-w0)*Math.pow(i/(n-1),sh||1))/2,[x,y]=C[i];L.push([x+nx*w,y+ny*w]);R.push([x-nx*w,y-ny*w])}return L.concat(R.reverse())};
  const edge=(C,w0,w1,side,k,sh)=>C.map(([x,y],i)=>{const [nx,ny]=nrm(C,i),w=(w0+(w1-w0)*Math.pow(i/(C.length-1),sh||1))/2*side*k;return [x+nx*w,y+ny*w]});
  const OL='#140305';
  /* 채우기 + 결 그림자(clip 안에서 그라데이션) + 외곽선 */
  function shape(o,P,fill,opt){opt=opt||{};if(PXM.on){opt=Object.assign({},opt,{g:0,tex:0})}o.save();(opt.sharp?poly:sm)(o,P,true);o.fillStyle=fill;o.fill();
   if(opt.g){o.clip();const [x0,y0,x1,y1,c0,c1]=opt.g,g=o.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,c0);g.addColorStop(1,c1);o.fillStyle=g;o.fillRect(-200,-260,400,300)}
   if(opt.tex){o.clip();opt.tex(o)}o.restore();if(opt.ol!==0){(opt.sharp?poly:sm)(o,P,true);o.lineWidth=(opt.lw||1.7)*PXM.k;o.lineJoin='round';o.strokeStyle=opt.ol||OL;o.stroke()}}
  const rgba=(h,a)=>{const n=parseInt(h.slice(1),16);return `rgba(${n>>16},${n>>8&255},${n&255},${a})`};
  /* 불꽃 혀(빛 더하기): 바깥 → 속 3겹 */
  function flame(o,C,x,y,ang,len,wid,ph,t,al){al=al==null?1:al;if(PXM.on){if(al<.5)return;al=1}const L=len*(.82+.22*Math.sin(t*9+ph)),wig=Math.sin(t*11+ph*1.7)*.35,ca=Math.cos(ang),sa=Math.sin(ang);o.save();if(!PXM.on)o.globalCompositeOperation='lighter';
   for(const [k,w,c,a] of (PXM.on?[[1,1,C.f0,1],[.62,.55,C.f1,1],[.3,.25,C.f2,1]]:[[1,1,C.f0,.6],[.72,.6,C.f1,.6],[.4,.28,C.f2,.45]])){const l=L*k,h=wid*w/2,a2=ang+wig*k,tx=x+Math.cos(a2)*l,ty=y+Math.sin(a2)*l,mx=x+ca*l*.4,my=y+sa*l*.4;
    o.beginPath();o.moveTo(x-sa*h,y+ca*h);o.quadraticCurveTo(mx-sa*h*1.2,my+ca*h*1.2,tx,ty);o.quadraticCurveTo(mx+sa*h*1.2,my-ca*h*1.2,x+sa*h,y-ca*h);o.closePath();o.globalAlpha=a*al;o.fillStyle=c;o.fill()}o.restore()}
  function glow(o,x,y,r,c,a){if(PXM.on)return;o.save();o.globalCompositeOperation='lighter';const g=o.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,rgba(c,a));g.addColorStop(1,rgba(c,0));o.fillStyle=g;o.fillRect(x-r,y-r,r*2,r*2);o.restore()}
  /* 비늘 무늬: 반달 줄 */
  const scaleTex=(col,x0,y0,x1,y1,s)=>o=>{if(PXM.on)return;o.strokeStyle=col;o.lineWidth=.8;o.globalAlpha=.32;for(let y=y0,r=0;y<y1;y+=s*.62,r++)for(let x=x0+(r%2)*s/2;x<x1;x+=s){o.beginPath();o.arc(x,y,s*.5,.15*Math.PI,.85*Math.PI);o.stroke()}o.globalAlpha=1};
  const claw=(o,C,x,y,ang,n,len)=>{len*=1.35;for(let i=0;i<n;i++){const a=ang+(i-(n-1)/2)*.42,bx=x+Math.cos(a)*1.6,by=y+Math.sin(a)*1.6,tx=bx+Math.cos(a+.45)*len,ty=by+Math.sin(a+.45)*len,nx=-Math.sin(a)*1.3,ny=Math.cos(a)*1.3;
   o.beginPath();o.moveTo(bx+nx,by+ny);o.quadraticCurveTo(bx+Math.cos(a)*len*.7+nx*.6,by+Math.sin(a)*len*.7+ny*.6,tx,ty);o.quadraticCurveTo(bx+Math.cos(a)*len*.5-nx*.4,by+Math.sin(a)*len*.5-ny*.4,bx-nx,by-ny);o.closePath();o.fillStyle=C.horn;o.fill();o.lineWidth=.9;o.strokeStyle=OL;o.stroke()}};
  const rot=(p,c,a,sy)=>{const dx=p[0]-c[0],dy=(p[1]-c[1])*(sy||1),ca=Math.cos(a),sa=Math.sin(a);return [c[0]+dx*ca-dy*sa,c[1]+dx*sa+dy*ca]};
  /* 날개 v3: 어깨 S → 팔꿈치 E → 손목 W → 손가락 끝 F[], 막은 B에서 몸에 붙음. 손가락 사이는 오목한 물결, 가장자리에 불 */
  function wing(o,C,t,Q,S,E0,W0,F0,B0,far){const fl=Q.flap,a=-fl*.22,sy=.84+.16*Q.wing+fl*.06,R=p=>rot(p,S,a,sy),E=R(E0),W=R(W0),F=F0.map(R),B=R(B0);
   const mem=[S,E,W,F[0]],scal=[];for(let i=0;i<F.length;i++){const p=F[i],q=F[i+1]||B,m=mid(p,q),k=i===F.length-1?.12:.3,c=[m[0]+(W[0]-m[0])*k,m[1]+(W[1]-m[1])*k];scal.push([p,c,q]);mem.push(c,q)}
   const OLc=C.ol,base=far?C.wDk:C.w;
   /* 막: 손목 쪽이 밝고(불빛이 비침) 가장자리로 갈수록 어두움 */o.save();sm(o,mem,true);o.fillStyle=base;o.fill();o.clip();
   if(PXM.on){sm(o,mem.map(p=>[W[0]+(p[0]-W[0])*.55,W[1]+(p[1]-W[1])*.55+6]),true);o.fillStyle=hm(base,far?C.w:C.wl,.45);o.fill()}else{const g=o.createRadialGradient(W[0],W[1]+18,4,W[0],W[1]+18,110);g.addColorStop(0,rgba(far?C.w:C.wl,far?.55:.9));g.addColorStop(.55,rgba(base,.2));g.addColorStop(1,rgba(C.dk,.75));o.fillStyle=g;o.fillRect(-220,-260,440,320)}
   /* 핏줄 */o.strokeStyle=PXM.on?hm(base,C.dk,.55):rgba(C.dk,far?.5:.55);o.lineWidth=PXM.on?1.5:.6;for(const [p,c,q] of scal)for(let k=1;k<4;k++){const u=k/4,x=(1-u)*(1-u)*p[0]+2*(1-u)*u*c[0]+u*u*q[0],y=(1-u)*(1-u)*p[1]+2*(1-u)*u*c[1]+u*u*q[1];o.beginPath();o.moveTo(W[0]+(x-W[0])*.25,W[1]+(y-W[1])*.25);o.quadraticCurveTo(W[0]+(x-W[0])*.6+2,W[1]+(y-W[1])*.6+2,x,y);o.stroke()}
   /* 가장자리 안쪽 불빛 */if(PXM.on){o.lineWidth=5;o.strokeStyle=hm(base,C.dk,.45)}else{o.globalCompositeOperation='lighter';o.lineWidth=7;o.strokeStyle=rgba(C.f0,far?.18:.35)}o.beginPath();o.moveTo(F[0][0],F[0][1]);for(const [p,c,q] of scal)o.quadraticCurveTo(c[0],c[1],q[0],q[1]);o.stroke();o.restore();
   sm(o,mem,true);o.lineWidth=1.2*PXM.k;o.lineJoin='round';o.strokeStyle=OLc;o.stroke();
   /* 뼈: 팔은 굵고 손가락은 가늘어짐 */const bone=far?C.dk:C.md,hl=far?C.md:C.lt;const bl=(p,q,w0,w1)=>{const T=tube([p,mid(p,q),q],w0,w1);sm(o,T,true);o.fillStyle=bone;o.fill();o.lineWidth=1;o.strokeStyle=OLc;o.stroke();o.beginPath();o.moveTo(p[0],p[1]-w0*.2);o.lineTo(q[0],q[1]-w1*.2);o.lineWidth=Math.max(.5,w1*.35);o.strokeStyle=rgba(hl,.6);o.stroke()};
   bl(S,E,5.4,3.6);bl(E,W,3.6,2.4);for(const p of F){const c=[(W[0]+p[0])/2+(p[1]-W[1])*.06,(W[1]+p[1])/2-(p[0]-W[0])*.06];const T=tube([W,c,p],2.8,.8);sm(o,T,true);o.fillStyle=bone;o.fill();o.lineWidth=.8;o.strokeStyle=OLc;o.stroke()}
   claw(o,C,W[0],W[1],Math.atan2(W[1]-E[1],W[0]-E[0])-.3,1,5);{const ea=Math.atan2(E[1]-S[1],E[0]-S[0])+Math.PI*.7;claw(o,C,E[0],E[1],ea,1,4)}
   /* 뒷가장자리 불꽃: 굵고 부드러운 혀 */for(let i=0;i<scal.length;i++){const [p,c,q]=scal[i];for(let k=0;k<2;k++){const u=k?.7:.3,x=(1-u)*(1-u)*p[0]+2*(1-u)*u*c[0]+u*u*q[0],y=(1-u)*(1-u)*p[1]+2*(1-u)*u*c[1]+u*u*q[1],ang=Math.atan2(y-W[1],x-W[0])+.35;flame(o,C,x,y,ang,13+((i+k)%3)*4,7,i*3+k,t,far?.4:.85)}flame(o,C,p[0],p[1],Math.atan2(p[1]-W[1],p[0]-W[0])+.2,11,5,i*5+2,t,far?.45:.9)}}
  const HS=1.05,hx2=h=>{const n=parseInt(h.slice(1),16);return [n>>16,n>>8&255,n&255]},hm=(a,b,k)=>{const A=hx2(a),B=hx2(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*k).toString(16).padStart(2,'0')).join('')};
  /* 덩어리 칠하기: 바탕 → 위는 밝게/아래는 어둡게 → 위 가장자리 빛 · 아래 가장자리 불빛 반사 → 어두운 붉은 외곽선 */
  function vol(o,C,P,base,opt){opt=opt||{};if(PXM.on){o.save();sm(o,P,true);o.fillStyle=hm(base,C.lt,.45);o.fill();o.clip();o.save();o.translate(0,2.6);sm(o,P,true);o.clip();o.fillStyle=hm(base,C.dk,.5);o.fillRect(-220,-260,440,320);o.translate(0,-2.6-3.4);sm(o,P,true);o.fillStyle=base;o.fill();o.restore();o.restore();
    sm(o,P,true);o.lineWidth=(opt.lw||1.25)*PXM.k;o.lineJoin='round';o.strokeStyle=C.ol;o.stroke();return}
   o.save();sm(o,P,true);o.fillStyle=base;o.fill();o.clip();const b=opt.b||[0,-100,0,-40];const g=o.createLinearGradient(b[0],b[1],b[2],b[3]);g.addColorStop(0,rgba(C.lt,opt.la==null?.55:opt.la));g.addColorStop(.5,rgba(base,0));g.addColorStop(1,rgba(C.dk,.7));o.fillStyle=g;o.fillRect(-220,-260,440,320);
   if(opt.tex)opt.tex(o);o.translate(0,1.6);sm(o,P,true);o.lineWidth=2.2;o.strokeStyle=rgba(C.lt,.45);o.stroke();o.translate(0,-3.2);sm(o,P,true);o.globalCompositeOperation='lighter';o.strokeStyle=rgba(C.f1,.28);o.stroke();o.restore();
   sm(o,P,true);o.lineWidth=(opt.lw||1.25)*PXM.k;o.lineJoin='round';o.strokeStyle=C.ol;o.stroke()}
  const prep=C=>C.__p||(C.__p=Object.assign({},C,{wDk:hm(C.w,'#1a0004',.5),ol:hm(C.dk,'#000000',.5)}));
  /* 도트로 굳히기: 반투명 빛은 버리고, 색은 정해진 색표에서 가장 가까운 것으로, 바깥에 1칸 외곽선 */
  function pix(cv,C0){const C=prep(C0),o=cv.getContext('2d'),w=cv.width,h=cv.height;if(!w||!h)return;const id=o.getImageData(0,0,w,h),d=id.data;
   const pal=C.__pal||(C.__pal=[C.ol,C.dk,C.md,C.b,C.lt,C.bl,C.blD,C.w,C.wDk,C.wl,C.horn,C.eye,C.f0,C.f1,C.f2,'#f6eedc','#2a0405',hm(C.b,C.lt,.5),hm(C.md,C.b,.5),hm(C.dk,C.md,.5),hm(C.w,C.wl,.5),hm(C.wDk,C.w,.5)].map(hx2));
   const cache=C.__qc||(C.__qc=new Map()),op=new Uint8Array(w*h);
   for(let i=0;i<w*h;i++){const q=i*4;if(d[q+3]<110){d[q+3]=0;continue}const r=d[q],g=d[q+1],b=d[q+2],k=(r>>2)<<12|(g>>2)<<6|(b>>2);let pi=cache.get(k);
    if(pi===undefined){let best=1e12;for(let j=0;j<pal.length;j++){const P=pal[j],dr=r-P[0],dg=g-P[1],db=b-P[2],dd=dr*dr*3+dg*dg*4+db*db*2;if(dd<best){best=dd;pi=j}}cache.set(k,pi)}
    const P=pal[pi];d[q]=P[0];d[q+1]=P[1];d[q+2]=P[2];d[q+3]=255;op[i]=1}
   {const U=new Uint32Array(d.buffer);for(let pass=0;pass<2;pass++)for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const i=y*w+x;if(!op[i])continue;const c=U[i],n=[U[i-1],U[i+1],U[i-w],U[i+w]];if(n.includes(c))continue;
     if(!op[i-1]||!op[i+1]||!op[i-w]||!op[i+w])continue;let best=n[0],bc=0;for(const a of n){let k=0;for(const b of n)if(a===b)k++;if(k>bc){bc=k;best=a}}if(bc>=2)U[i]=best}}
   const L=pal[0];for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x;if(op[i])continue;if((x>0&&op[i-1])||(x<w-1&&op[i+1])||(y>0&&op[i-w])||(y<h-1&&op[i+w])){const q=i*4;d[q]=L[0];d[q+1]=L[1];d[q+2]=L[2];d[q+3]=255}}
   o.putImageData(id,0,0)}
  function draw(o,C,Q,t,rage,flash){C=prep(C);const hb=Q.hy*1.6,hx=Q.hx*1.8,sw=Q.tail*7,gl=Math.min(1.2,.45+.3*Math.sin(t*2.6)+Q.glow*.4);
   /* ── 먼 날개(뒤로 비켜서 위로 솟음) ── */wing(o,C,t,Q,[12,-92],[20,-130],[38,-164],[[2,-180],[-28,-172],[-44,-142],[-36,-110]],[-8,-94],true);
   /* ── 꼬리: 엉덩이에서 뒤로 물결치며 뻗고 끝이 아래로 ── */{const TC=cb([-38,-64],[-64,-50+sw*.4],[-78,-84+sw],[-100,-80+sw],10).concat(cb([-100,-80+sw],[-118,-76+sw],[-126,-58+sw*.6],[-114,-46+sw*.4],8).slice(1));const TP=tube(TC,17,2.6,.9);
    vol(o,C,TP,C.b,{b:[0,-90,0,-50],tex:scaleTex(C.dk,-130,-100,-30,-30,4.5)});const be=edge(TC,17,2.6,1,.35,.9),be2=edge(TC,17,2.6,1,.95,.9);o.save();sm(o,TP,true);o.clip();o.beginPath();o.moveTo(be[0][0],be[0][1]);for(const p of be)o.lineTo(p[0],p[1]);for(let i=be2.length-1;i>=0;i--)o.lineTo(be2[i][0],be2[i][1]);o.closePath();o.fillStyle=C.bl;o.globalAlpha=.8;o.fill();o.restore();
    const top=edge(TC,17,2.6,-1,1,.9);for(let i=2;i<top.length-2;i+=2){const [x,y]=top[i],[nx,ny]=nrm(TC,i),q=i/top.length;A_spike(o,C,x,y,Math.atan2(-ny,-nx)-.5,7-q*4,4-q*2)}
    const e1=TC[TC.length-1],e0=TC[TC.length-2],ta=Math.atan2(e1[1]-e0[1],e1[0]-e0[0]);shape(o,[[e1[0]+Math.cos(ta+1.6)*5,e1[1]+Math.sin(ta+1.6)*5],[e1[0]+Math.cos(ta)*9,e1[1]+Math.sin(ta)*9],[e1[0]+Math.cos(ta-1.6)*5,e1[1]+Math.sin(ta-1.6)*5],[e1[0]-Math.cos(ta)*2,e1[1]-Math.sin(ta)*2]],C.md,{sharp:1,ol:C.ol,lw:1});
    flame(o,C,e1[0]+Math.cos(ta)*6,e1[1]+Math.sin(ta)*6,ta,22,10,2,t,1);glow(o,e1[0],e1[1],16,C.f1,.45)}
   /* ── 먼 뒷다리 · 먼 앞발(어둡게, 조금 뒤) ── */{const c=hm(C.b,'#000000',.45),c2=hm(C.md,'#000000',.4),dx=9,dy=-3,M=pts=>pts.map(([x,y])=>[x+dx,y+dy]);
    shape(o,M([[-30,-66],[-16,-68],[-8,-58],[-9,-48],[-17,-46],[-26,-54]]),c,{ol:C.ol,lw:1});shape(o,tube(M(cb([-11,-47],[-14,-39],[-20,-33],[-24,-27],5)),8,5.5),c2,{ol:C.ol,lw:1});shape(o,tube(M([[-24,-28],[-22,-22],[-18,-17]]),5.5,4),c2,{ol:C.ol,lw:1});claw(o,C,-17+dx,-16+dy,1.25,3,5);
    shape(o,tube(M(cb([30,-72],[28,-64],[26,-58],[24,-52],5)),8,6),c,{ol:C.ol,lw:1});shape(o,tube(M(cb([24,-53],[28,-48],[34,-45],[40,-44],5)),6,5),c2,{ol:C.ol,lw:1});claw(o,C,41+dx,-44+dy,.55,3,5)}
   /* ── 몸통(거의 눕혀서 나는 자세) ── */const BD=[[-48,-66],[-32,-80],[-8,-89],[14,-93],[33,-89],[43,-77],[41,-64],[27,-57],[4,-52],[-22,-52],[-42,-57]];
   vol(o,C,BD,C.b,{b:[0,-93,0,-52],tex:scaleTex(C.dk,-50,-100,50,-40,5)});
   /* 배 판 + 판 사이 불빛 */{const OUT=cb([43,-74],[41,-60],[10,-50],[-28,-53],12),IN=cb([33,-82],[33,-66],[8,-58],[-26,-59],12);o.save();sm(o,BD,true);o.clip();const BL=OUT.concat(IN.slice().reverse());sm(o,BL,true);o.fillStyle=C.bl;o.fill();
    const g=o.createLinearGradient(0,-80,0,-46);g.addColorStop(0,rgba('#ffffff',.25));g.addColorStop(1,rgba(C.blD,.65));o.fillStyle=g;o.fill();for(let i=1;i<OUT.length-1;i++){o.beginPath();o.moveTo(OUT[i][0],OUT[i][1]+1);o.lineTo(IN[i][0],IN[i][1]);o.lineWidth=1;o.strokeStyle=C.blD;o.stroke();o.save();o.globalCompositeOperation='lighter';o.lineWidth=.8;o.strokeStyle=rgba(C.f1,Math.min(1,gl));o.stroke();o.restore()}o.restore();glow(o,18,-66,30,C.f1,.28*gl+.08)}
   /* 등 가시 */for(let i=0;i<7;i++){const u=i/6,x=-36+u*58,y=-70-Math.sin(u*Math.PI*.9)*15-u*3;A_spike(o,C,x,y,-Math.PI/2-.55,8-Math.abs(u-.5)*5,5)}
   /* ── 목 ── */const H=[66+hx,-122+hb],NC=cb([28,-86],[40,-104],[48,-124],H,12),NT=tube(NC,24,14,1);vol(o,C,NT,C.b,{b:[30,-130,50,-90],tex:scaleTex(C.dk,10,-140,80,-80,4.2)});
   {const f1=edge(NC,24,14,1,.3),f2=edge(NC,24,14,1,.95);o.save();sm(o,NT,true);o.clip();o.beginPath();o.moveTo(f1[0][0],f1[0][1]);for(const p of f1)o.lineTo(p[0],p[1]);for(let i=f2.length-1;i>=0;i--)o.lineTo(f2[i][0],f2[i][1]);o.closePath();o.fillStyle=C.bl;o.fill();o.strokeStyle=C.blD;o.lineWidth=.9;for(let i=1;i<f1.length-1;i++){o.beginPath();o.moveTo(f1[i][0],f1[i][1]);o.lineTo(f2[i][0],f2[i][1]);o.stroke()}o.restore()}
   {const bk=edge(NC,24,14,-1,.9);for(let i=1;i<bk.length-1;i++){const [nx,ny]=nrm(NC,i);if(i%2)A_spike(o,C,bk[i][0],bk[i][1],Math.atan2(-ny,-nx)-.6,6,4);flame(o,C,bk[i][0],bk[i][1],Math.atan2(-ny,-nx)-.7,11-i*.4,6,i*1.3,t,.7)}}
   /* ── 머리(아래의 플레이어를 내려다봄) ── */o.save();o.translate(H[0],H[1]);o.scale(HS,HS);o.translate(-H[0],-H[1]);{const j=Math.max(0,Math.min(1,Q.jaw)),ha=.2+hb*.01,P=(x,y)=>{const ca=Math.cos(ha),sa=Math.sin(ha);return [H[0]+x*ca-y*sa,H[1]+x*sa+y*ca]},M=L=>L.map(([x,y])=>P(x,y));
    /* 먼 뿔 */shape(o,M([[-3,-9],[-16,-17],[-30,-20],[-38,-17],[-28,-14],[-14,-9],[-6,-5]]),hm(C.horn,'#000000',.45),{ol:C.ol,lw:.9});
    /* 턱 깃(막) */shape(o,M([[-6,2],[-18,-2],[-24,4],[-16,6],[-22,11],[-10,9],[-4,8]]),C.wDk,{ol:C.ol,lw:.9,sharp:1});
    const ja=j*.6,J=([x,y])=>{const dy=y-5,ca=Math.cos(ja),sa=Math.sin(ja);return [x*ca-dy*sa,5+x*sa+dy*ca]};
    if(j>.08){shape(o,M([[0,4],[37,5],[36,9],[0,10]].map(J).concat([[2,5]])),'#2a0405',{ol:0});if(!PXM.on){o.save();o.globalCompositeOperation='lighter';const [gx,gy]=P(...J([22,6]));const g=o.createRadialGradient(gx,gy,0,gx,gy,10+j*10+Q.fire*12);g.addColorStop(0,rgba(C.f2,.7));g.addColorStop(.4,rgba(C.f1,.5));g.addColorStop(1,rgba(C.f0,0));o.fillStyle=g;o.fillRect(gx-40,gy-40,80,80);o.restore()}else{shape(o,M([[4,5.6],[34,6],[33,8],[4,9]].map(J)),C.f1,{ol:0})}}
    const LJ=[[-6,5],[8,5],[24,5.5],[38,6],[37.5,8.5],[26,11.5],[10,13],[-2,12],[-6,9]].map(J);vol(o,C,M(LJ),C.md,{b:[...P(10,5),...P(10,13)],lw:1});{const c=P(...J([2,12.5]));A_spike(o,C,c[0],c[1],ha+Math.PI*.62+ja,5,3)}
    for(let i=0;i<6;i++){const a=P(...J([8+i*5,5.2])),b=P(...J([9.5+i*5,1.8])),c=P(...J([11+i*5,5.2]));o.beginPath();o.moveTo(...a);o.lineTo(...b);o.lineTo(...c);o.closePath();o.fillStyle='#f6eedc';o.fill()}
    const SK=[[-12,-1],[-9,-8],[0,-11],[9,-10.5],[15,-8],[25,-5.6],[35,-3.6],[40.5,-.6],[40,3],[31,4.6],[16,5],[3,5.6],[-8,5]];vol(o,C,M(SK),C.b,{b:[...P(10,-11),...P(10,6)]});
    for(let i=0;i<7;i++){const a=P(5+i*5,4.6),b=P(6.5+i*5,8.2),c=P(8+i*5,4.6);o.beginPath();o.moveTo(...a);o.lineTo(...b);o.lineTo(...c);o.closePath();o.fillStyle='#f6eedc';o.fill();o.lineWidth=.4;o.strokeStyle=C.ol;o.stroke()}
    o.strokeStyle=rgba(C.dk,.55);o.lineWidth=.7;for(let i=0;i<5;i++){const a=P(17+i*4.4,-5.6+i*.45),b=P(18.6+i*4.4,-2.6+i*.45);o.beginPath();o.moveTo(...a);o.lineTo(...b);o.stroke()}
    {const [nx,ny]=P(35.5,-1.6);o.beginPath();o.ellipse(nx,ny,1.8,.9,ha-.5,0,Math.PI*2);o.fillStyle='#2a0405';o.fill();flame(o,C,nx+1,ny-1,ha-1.1,7,3,5,t,.55)}
    /* 이마 뿔 · 눈썹 */for(let i=0;i<3;i++){const b=P(12+i*6,-8-i*.4);A_spike(o,C,b[0],b[1],ha-Math.PI/2-.9,4-i,2.6-i*.5)}
    shape(o,M([[1,-10],[15,-8.6],[20,-6.6],[12,-5.8],[3,-6.4]]),C.md,{ol:C.ol,lw:.9});{const [ex,ey]=P(11,-5.2);o.save();o.translate(ex,ey);o.rotate(ha);o.beginPath();o.moveTo(-3.6,.6);o.quadraticCurveTo(0,-1.8,3.8,-.6);o.quadraticCurveTo(0,1.6,-3.6,.6);o.fillStyle=C.eye;o.fill();if(PXM.on){o.fillStyle=C.eye;o.fillRect(-2.6,-1.4,5.2,2.4)}o.fillStyle='#250500';o.fillRect(-.4,-1.3,PXM.on?1.3:.9,2.4);o.restore();glow(o,ex,ey,8,C.f1,.85)}
    /* 큰 뿔 두 개: 뒤로 휘어 뻗음 */shape(o,M([[-1,-10],[-12,-16],[-26,-20.5],[-40,-19],[-30,-15.5],[-16,-10],[-6,-5]]),C.horn,{ol:C.ol,lw:1});o.strokeStyle=rgba(C.dk,.45);o.lineWidth=.6;for(let i=0;i<5;i++){const a=P(-6-i*6,-13.5-i*1.5),b=P(-5-i*6,-9-i*1.5);o.beginPath();o.moveTo(...a);o.lineTo(...b);o.stroke()}
    shape(o,M([[-7,-3],[-18,-5.5],[-30,-4],[-20,-1.5],[-8,1]]),C.horn,{ol:C.ol,lw:.9})}o.restore();
   /* ── 가까운 뒷다리: 굵은 허벅지 → 앞으로 굽힌 무릎 → 뒤로 내려가는 정강이 → 아래로 늘어진 발(발톱 벌림) ── */{const TH=[[-42,-68],[-27,-75],[-12,-69],[-5,-57],[-7,-46],[-15,-41],[-26,-47],[-37,-56]];vol(o,C,TH,C.b,{b:[-20,-75,-20,-42],tex:scaleTex(C.dk,-44,-80,0,-38,4.5)});
    const sh=tube(cb([-10,-46],[-13,-38],[-19,-32],[-24,-26],5),9.5,6.5);vol(o,C,sh,C.md,{b:[-20,-46,-20,-26],lw:1});const ft=tube([[-24,-27],[-22,-21],[-18,-16]],6.5,5);vol(o,C,ft,C.md,{lw:1});claw(o,C,-17,-15,1.25,3,5.5);claw(o,C,-25,-25,2.5,1,3.5)}
   /* ── 가까운 앞발: 어깨에서 아래로 → 팔꿈치 → 앞으로 내민 손(발톱 벌림) ── */{const s2=Math.sin(t*2)*1.2;const UA=tube(cb([31,-73],[28,-65],[26,-59],[24,-53+s2*.4],5),9.5,7);vol(o,C,UA,C.b,{b:[24,-73,24,-52],lw:1});const FA=tube(cb([24,-54+s2*.4],[28,-49+s2],[34,-46+s2],[40,-45+s2],5),7,5.5);vol(o,C,FA,C.md,{lw:1});claw(o,C,41,-45+s2,.55,4,5.5)}
   /* ── 가까운 날개(크게, 위로 솟아 뒤로 펼침) ── */wing(o,C,t,Q,[2,-90],[-16,-128],[8,-166],[[-32,-182],[-72,-168],[-100,-132],[-104,-98],[-82,-74]],[-40,-72],false);
   /* 열기 · 불티 */glow(o,10,-80,80,C.f0,.1+(rage?.12:0)+Q.glow*.06);if(rage){o.save();o.globalCompositeOperation='lighter';for(let i=0;i<12;i++){const q=(t*.6+i/12)%1,x=-60+((i*37)%120),y=-40-q*120;o.globalAlpha=(1-q)*.8;o.fillStyle=C.f1;o.fillRect(x+Math.sin(t*3+i)*4,y,1.6,1.6)}o.restore()}
   if(flash){o.save();o.globalCompositeOperation='source-atop';o.fillStyle='rgba(255,255,255,.55)';o.fillRect(-220,-260,440,320);o.restore()}}
  function A_spike(o,C,x,y,a,L,w){const px=Math.cos(a+Math.PI/2),py=Math.sin(a+Math.PI/2);o.beginPath();o.moveTo(x+px*w/2,y+py*w/2);o.quadraticCurveTo(x+Math.cos(a)*L*.55+px*w*.25,y+Math.sin(a)*L*.55+py*w*.25,x+Math.cos(a)*L,y+Math.sin(a)*L);o.quadraticCurveTo(x+Math.cos(a)*L*.4-px*w*.1,y+Math.sin(a)*L*.4-py*w*.1,x-px*w/2,y-py*w/2);o.closePath();o.fillStyle=C.horn;o.fill();o.lineWidth=.8;o.strokeStyle=C.ol||OL;o.stroke()}
  /* 입 위치(불 뿜기 시작점, 발밑 기준 · 오른쪽을 볼 때) */
  const mouth=Q=>{const hb=Q.hy*1.6,hx=Q.hx*1.8,H=[66+hx,-122+hb],ha=.2+hb*.01,lx=38,ly=6;return [(H[0]+(lx*Math.cos(ha)-ly*Math.sin(ha))*HS)*VK,(H[1]+(lx*Math.sin(ha)+ly*Math.cos(ha))*HS)*VK]};
  return {draw,mouth,pix,PXM}})();
 const PXU=1.6;/* 도트 한 칸 = 게임 1.6칸 */
 const VK=.8;/* 그림 전체 크기 */
 const BCs={},HOV=14;/* 대형 드래곤은 늘 땅에서 떠 있음(px) */
 function bigDraw(name,key,c,draw,fix){const sc=fix||Math.min(3,(typeof SS!=='undefined'&&SS)||2);let B=BCs[name];if(!B||B.sc!==sc){B=BCs[name]={cv:document.createElement('canvas'),sc,key:''};B.cv.width=220*sc;B.cv.height=200*sc}
  if(B.key!==key){B.key=key;const o=B.cv.getContext('2d');o.setTransform(1,0,0,1,0,0);o.clearRect(0,0,B.cv.width,B.cv.height);o.imageSmoothingEnabled=false;draw(o,sc)}const sm0=c.imageSmoothingEnabled;if(fix)c.imageSmoothingEnabled=false;c.drawImage(B.cv,-110,-170,220,200);c.imageSmoothingEnabled=sm0}
 function eggDraw(m,c){const T=TW71.T,h=m.hatchT!=null?Math.min(1,(T.clk-m.hatchT)/1.7):0,crack=1-frac(0),k=[Math.round(crack*20),Math.floor(T.clk*15),TRI(),Math.round(h*20),T.clk-m.hitT<.07?1:0].join('|');
  bigDraw('egg',k,c,(o,sc)=>{o.setTransform(sc,0,0,sc,110*sc,170*sc);try{monDraw('m_wb_egg',o,{c:'#ff8a2a'},0,0,T.clk*1000,{tier:TRI(),crack,hatch:h,flash:T.clk-m.hitT<.07},U)}catch(e){}})}
 function dragonDraw(m,c){const T=TW71.T,e=T.clk-DG.t0;let view='side',face=DG.face||1;if(DG.st==='move'){const PP=typeof P!=='undefined'?P:null;if(PP&&Math.abs(PP.x-m.x)>14)DG.face=face=PP.x>=m.x?1:-1}
  const Q=dPose(DG.st,e,T.clk,Math.hypot(m.vx,m.vy)>10,rageOn()),fl=view==='side'&&face<0;
  {const hv=HOV+Q.fly+Math.sin(T.clk*3.2)*2;c.save();c.globalAlpha=Math.max(.12,.42-hv/320);c.fillStyle='#000';c.beginPath();c.ellipse(0,0,44-hv*.08,11,0,0,TAU);c.fill();c.globalCompositeOperation='lighter';c.globalAlpha=.25;const g=c.createRadialGradient(0,0,2,0,0,50);g.addColorStop(0,'#ff8a2a');g.addColorStop(1,'rgba(255,80,20,0)');c.fillStyle=g;c.fillRect(-50,-20,100,40);c.restore()}
  c.save();c.translate(0,-(HOV+Q.fly+Math.sin(T.clk*3.2)*2));const key=[view,fl?1:0,TRI(),DG.st,Math.floor(T.clk*12),rageOn()?1:0,T.clk-m.hitT<.07?1:0].join('|');
  bigDraw('dragon',key,c,(o,sc)=>{o.setTransform(sc*(fl?-1:1),0,0,sc,110*sc,170*sc);try{o.scale(VK,VK);VD.PXM.on=1;VD.PXM.k=1.5;try{VD.draw(o,FP[TRI()],Q,T.clk,rageOn(),false)}finally{VD.PXM.on=0;VD.PXM.k=1}VD.pix(o.canvas,FP[TRI()]);if(T.clk-m.hitT<.07){o.setTransform(1,0,0,1,0,0);o.globalCompositeOperation='source-atop';o.fillStyle='rgba(255,255,255,.6)';o.fillRect(0,0,o.canvas.width,o.canvas.height);o.globalCompositeOperation='source-over'}}catch(err){}},1/PXU);/* 작게 그려 도트로 굳힘 */c.restore();
  /* 화염 숨결: 입에서 뻗어 나가는 불길(몸 위에) */if(DG.st==='breath'&&DG.mo&&e>=1&&e<2){const lx=DG.mo[0]-m.x,ly=DG.mo[1]-(m.y+TSP.wb_dragon.r*.75);c.save();c.globalCompositeOperation='lighter';
   for(let i=0;i<46;i++){const q=((T.clk*2.4+i/46)%1),a=DG.ba[i%5]+(Math.sin(i*7.3)*.08),L=q*320,r=3+q*14;const g=c.createRadialGradient(lx+Math.cos(a)*L,ly+Math.sin(a)*L,0,lx+Math.cos(a)*L,ly+Math.sin(a)*L,r);g.addColorStop(0,q<.3?'#fff8d0':'#ffb040');g.addColorStop(1,'rgba(255,60,10,0)');c.globalAlpha=(1-q)*.85;c.fillStyle=g;c.fillRect(lx+Math.cos(a)*L-r,ly+Math.sin(a)*L-r,r*2,r*2)}c.restore()}}

 /* ================= 판 진행 ================= */
 async function enter(){if(R.on||R.starting)return;if(!logged()){toast('로그인이 필요해요','광장에서 로그인한 뒤 들어올 수 있어요');return}R.starting=1;let r=null;try{r=await api('/api/wb/start')}catch(e){}R.starting=0;
  if(!r||r.s!==200||!r.j||!r.j.ok){toast('입장할 수 없어요',(r&&r.j&&(r.j.error||r.j.msg))||'서버에 연결할 수 없어요');pull();return}WS.st=r.j;WS.at=performance.now();begin(r.j.run,r.j.phase)}
 function begin(run,ph){const s=saveData.tw71||(saveData.tw71={});R.saved={floor:s.floor,best:s.best};Object.assign(R,{on:true,fled:0,bon:[],ai:0,run,t0:performance.now(),acc:0,my:0,ph,end:false,kill:false,fx:[],hatch:null,last:performance.now(),pz:0,res:null});
  window.__nosr=1;try{PLZ111.leave()}catch(e){}try{TW71.start(1)}catch(e){console.error(e)}setup(ph,true);try{sfx(110,.8,'sawtooth',.06,55)}catch(e){}}
 function setup(ph,fresh){const T=TW71.T;try{TW71.buildFloor(FL)}catch(e){}T.ext=EXT;T.pal=FPAL();T.queue=[];T.mobs=[];T.cap=10;T.nextSpawn=.3;T.total=0;R.ph=ph;
  if(ph===0)newMob('wb_egg',AX+AW/2,AY+108);else if(ph===1){for(let i=0;i<5;i++)T.queue.push(baby())}else if(ph===2)newMob('wb_dragon',AX+AW/2,AY+142,{arrive:!fresh});
  T.trans={t:0,txt:['드래곤의 알','아기 드래곤 무리','대형 드래곤'][Math.min(2,ph)],sub:'용의 둥지 · 월드 보스 · '+(ph+1)+'단계'};try{$('bvTitle').textContent='BEAT BLADE · 용의 둥지'}catch(e){}}
 function transition(ph){const T=TW71.T;if(ph===1&&R.ph===0){const egg=T.mobs.find(m=>m.sp==='wb_egg');if(egg&&egg.hatchT==null){egg.hatchT=T.clk;TW71.addPop(egg.x,egg.y-90,'…알이 흔들린다!','#ffd070');try{sfx(70,1.4,'sine',.07,140)}catch(e){}}else if(!egg){R.ph=1;for(let i=0;i<5;i++)T.queue.push(baby())}return}
  if(ph===2&&R.ph<2){R.ph=2;T.queue=[];for(const m of T.mobs){if(m.sp==='wb_baby')m.flee=1;if(m.sp==='wb_egg')m._rm=1}newMob('wb_dragon',AX+AW/2,AY+142,{arrive:true});TW71.addPop(AX+AW/2,AY+60,'하늘이 어두워진다…','#ffb060')}}
 function scan(){const T=TW71.T;for(const m of T.mobs){if(m.wbc==null&&(m.sp==='wisp'||m.sp==='wb_baby'))m.wbc=1;/* v179: 불씨 · 아기 드래곤 피해도 셈 */if(!m.wbc){m._lh=null;continue}if(m._lh==null){m._lh=m.hp;continue}if(m.hp<m._lh){const d=m._lh-Math.max(0,m.hp);R.acc+=d;R.my+=d}m._lh=m.hp;if(m.max>=1e8&&m.hp<m.max*.6){m.hp+=m.max*.3;m._lh=m.hp}}
  if(T.mobs.some(m=>m._rm))T.mobs=T.mobs.filter(m=>!m._rm)}
 async function sync(final){if(R.sending&&!final)return null;const d=Math.floor(R.acc);R.acc-=d;const ai=Math.floor(R.ai||0);R.ai=(R.ai||0)-ai;/* v181: AI 동료 피해는 따로(공동 체력만) */R.sending=1;let r=null;try{r=await api('/api/wb/hit',{run:R.run,dmg:d,ai,end:!!final})}catch(e){}R.sending=0;
  if(!r||r.s!==200||!r.j||!r.j.ok){R.acc+=d;R.ai=(R.ai||0)+ai;return null}WS.st=r.j;WS.at=performance.now();R.runDmg=r.j.runDmg;try{gotBonus(r.j.bonus||[])}catch(e){}if(R.on&&!R.end)onState(r.j);return r.j}
 /* v180: 단계를 넘긴 마지막 한 방 보상(알 깨기 · 아기 드래곤 정리 · 막타) — 우편으로 옴 */
 const BN={egg:['🥚 알 깨기 보상!','#ffe08a'],baby:['🐲 아기 드래곤 정리 보상!','#ffb070'],kill:['⚔ 막타 보상!','#ffd166']};
 function gotBonus(L){for(const k of L){const b=BN[k];if(!b)continue;const v=((WS.st&&WS.st.rw&&WS.st.rw.bonus)||{})[k]||[0,0];R.bon=(R.bon||[]).concat(k);try{TW71.addPop(AX+AW/2,AY+96,b[0]+' 🪙'+num(v[0])+' 💎'+v[1],b[1])}catch(e){}toast(b[0],'🪙 '+num(v[0])+' · 💎 '+v[1]+' — 우편함으로 왔어요');try{sfx(784,.3,'triangle',.06,1568)}catch(e){}}}
 function onState(st){if(st.killed&&!R.kill){R.kill=true;const d=TW71.T.mobs.find(m=>m.sp==='wb_dragon');if(d){DG.st='die';DG.t0=TW71.T.clk;d.wbc=0}TW71.addPop(AX+AW/2,AY+70,'🐉 대형 드래곤 토벌!','#ffd166');try{sfx(523,.3,'triangle',.06,1046);setTimeout(()=>sfx(784,.5,'triangle',.06,1568),200)}catch(e){}setTimeout(()=>finish('kill'),3200);return}
  if(st.alive===false&&!st.killed){if(R.fled)return;R.fled=1;TW71.addPop(AX+AW/2,AY+70,'드래곤이 날아가 버렸어요…','#ffb0a0');setTimeout(()=>finish('fled'),1500);return}
  if(st.phase>R.ph&&st.phase<3)transition(st.phase)}
 function restore(){const s=saveData.tw71||(saveData.tw71={});if(R.saved){s.floor=R.saved.floor;s.best=R.saved.best}R.saved=null;window.__nosr=0;try{saveNow()}catch(e){}}
 async function finish(why){if(!R.on||R.end)return;R.end=true;const my=Math.round(R.my);let st=null;for(let i=0;i<3&&!st;i++)st=await sync(true);R.on=false;restore();try{stopMusic()}catch(e){}
  const S2=st||WS.st||{},me=S2.me||{},killed=st?st.killed:R.kill,again=!killed&&S2.alive!==false;
  setTimeout(()=>{try{showOverlay('🐉 용의 둥지',why==='kill'?'대형 드래곤 토벌!':why==='dead'?'쓰러졌어요':why==='fled'?'드래곤이 날아갔어요':'나왔어요',
   '<b style="color:#ffd166;font-size:1.25em">이번 판 피해 '+num(st?st.runDmg:my)+'</b>'+((R.bon||[]).length?'<br><b style="color:#ffe08a">⭐ '+R.bon.map(k=>(BN[k]||[''])[0].replace('!','')).join(' · ')+' — 우편함으로 왔어요</b>':'')+'<br>이번 드래곤 내 피해 '+num(me.dmg)+(me.rank?' · <b>'+me.rank+'위</b>':'')+'<br>'+(killed?'토벌 보상은 우편함으로 와요!':again?'몇 번이든 다시 들어갈 수 있어요 · 드래곤이 도망가기까지 <b>'+hm(S2.ends-srvNow())+'</b>':'보상은 우편함으로 와요 · 다음 드래곤은 <b>'+hm((S2.next||0)-srvNow())+'</b> 뒤')+(st?'':'<br><small>서버에 마지막 피해를 보내지 못했어요</small>'),
   [['광장으로',toPlaza,true]].concat(again?[['↺ 다시 도전',()=>{$('overlay').hidden=true;enter()},false]]:[]))}catch(e){console.error(e)}},600)}
 function toPlaza(){try{$('overlay').hidden=true}catch(e){}try{toLobby()}catch(e){}setTimeout(()=>{try{PLZ111.enter();setTimeout(()=>{try{P.x=PX;P.y=PY+46;armed=false}catch(e){}},60)}catch(e){}},300)}
 /* ---------- 경기장 그림 · 위쪽 정보 ---------- */
 const AC={};
 function arena(){const k=TRI();if(AC[k])return AC[k];const D=DPAL[k],cv=document.createElement('canvas');cv.width=W;cv.height=H;const o=cv.getContext('2d'),F=Math.round,Rr=(x,y,w,h,col,a)=>{if(a!=null)o.globalAlpha=a;o.fillStyle=col;o.fillRect(F(x),F(y),F(w),F(h));o.globalAlpha=1};
  const glow=(x,y,r,col,a)=>{const g=o.createRadialGradient(x,y,1,x,y,r);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');o.globalAlpha=a;o.fillStyle=g;o.fillRect(x-r,y-r,r*2,r*2);o.globalAlpha=1};
  const base=['#2a1a16','#221414','#1c1a20','#120a0c'][k],stone=['#3a2620','#301c1a','#2a2830','#1c1014'][k];Rr(0,0,W,H,'#0c0606');
  /* 위쪽: 하늘 · 화산 */const g=o.createLinearGradient(0,0,0,AY);g.addColorStop(0,'#1a0606');g.addColorStop(1,'#4a1408');o.fillStyle=g;o.fillRect(0,0,W,AY);for(let i=0;i<7;i++){const x=i*80+20,h=10+(i*37%14);o.fillStyle='#120606';o.beginPath();o.moveTo(x-40,AY);o.lineTo(x,AY-h);o.lineTo(x+40,AY);o.fill()}glow(W*.7,AY-10,60,'#ff6a1a',.35);
  /* 바닥: 갈라진 현무암 판 */for(let y=AY;y<AY+AH;y+=20)for(let x=AX+((y-AY)/20%2)*14;x<AX+AW;x+=28){const h=(x*7+y*13)%9;Rr(x,y,27,19,h<3?stone:base);Rr(x,y,27,1,'#ffffff',.04);Rr(x,y+18,27,1,'#000',.35)}
  /* 용암 균열 */let sd=11;const rn=()=>((sd=(sd*9301+49297)%233280)/233280);for(let c2=0;c2<12;c2++){let x=AX+rn()*AW,y=AY+rn()*AH;for(let j=0;j<5;j++){const nx=x+(rn()-.5)*40,ny=y+(rn()-.5)*28;o.strokeStyle=D.hot;o.globalAlpha=.25;o.lineWidth=3;o.beginPath();o.moveTo(x,y);o.lineTo(nx,ny);o.stroke();o.globalAlpha=.85;o.lineWidth=1;o.strokeStyle='#ffb060';o.stroke();o.globalAlpha=1;x=nx;y=ny}}
  /* 둥지 자리 · 뼈 · 금화 · 용암 웅덩이 */glow(AX+AW/2,AY+110,90,'#ff4a1a',.18);for(const [x,y] of [[AX+40,AY+40],[AX+AW-50,AY+60],[AX+60,AY+AH-40],[AX+AW-40,AY+AH-50]]){o.fillStyle='#2a0a04';o.beginPath();o.ellipse(x,y,22,10,0,0,TAU);o.fill();const lg=o.createRadialGradient(x,y,2,x,y,20);lg.addColorStop(0,'#ffd070');lg.addColorStop(.5,D.hot);lg.addColorStop(1,'#5a1004');o.fillStyle=lg;o.beginPath();o.ellipse(x,y,18,7.5,0,0,TAU);o.fill();glow(x,y,40,D.hot,.35)}
  for(let i=0;i<14;i++){const x=AX+30+rn()*(AW-60),y=AY+30+rn()*(AH-50);if(rn()<.5){Rr(x,y,7,1.6,'#d8d0c0');Rr(x-1,y-1,2,3.6,'#d8d0c0');Rr(x+6,y-1,2,3.6,'#d8d0c0')}else{o.fillStyle='#ffd84a';o.beginPath();o.arc(x,y,1.8,0,TAU);o.fill();Rr(x-.6,y-.8,1,1,'#fff6c0')}}
  return AC[k]=cv}
 function bar(x,y,w,h,q,c1,c2){ctx.fillStyle='#000c';ctx.fillRect(x-2,y-2,w+4,h+4);ctx.fillStyle='#2a0806';ctx.fillRect(x,y,w,h);const g=ctx.createLinearGradient(x,0,x+w,0);g.addColorStop(0,c1);g.addColorStop(1,c2);ctx.fillStyle=g;ctx.fillRect(x,y,w*Math.max(0,Math.min(1,q)),h);ctx.fillStyle='#ffffff44';ctx.fillRect(x,y,w*Math.max(0,Math.min(1,q)),2)}
 const EXT={arena,mark(){return 'NEST'},under(){},
  gap(){return .2+Math.random()*.3}/* v179: 몬스터가 빨리 나옴(탑은 0.9~1.6초) */,ultSpawn:1/* 궁극기 중에도 계속 나옴 */,
  hud(now){const st=WS.st,ph=Math.min(2,st?st.phase:R.ph);ctx.save();ctx.textBaseline='middle';
   /* 왼쪽 위: 이번 판 시간 · 도망까지 · 내 피해 */const el=(performance.now()-R.t0)/1000,fl=st?st.ends-srvNow():0;ctx.fillStyle='#05070acc';ctx.fillRect(AX,4,170,24);ctx.fillStyle='#ff6a2a';ctx.fillRect(AX,4,3,24);
   ctx.font='900 11px sans-serif';ctx.fillStyle='#fff';ctx.fillText(clk(el),AX+8,16);
   ctx.font='700 8px sans-serif';ctx.fillStyle='#ffb060';ctx.fillText('도망까지 '+clk(fl),AX+44,12);ctx.fillStyle='#e8dcc8';ctx.fillText('이번 판 피해 '+num(R.my),AX+44,22);
   /* 가운데 위: 단계 · 서버 전체 체력 */const bw=230,bx=W/2-bw/2+40,by=8,q=st?frac(ph):1;ctx.fillStyle='#05070acc';ctx.fillRect(bx-6,3,bw+12,27);
   for(let i=0;i<3;i++){const x=bx+i*14,on=i===ph,done=i<ph;ctx.fillStyle=done?'#ffd166':on?'#ff6a2a':'#3a2a2a';ctx.beginPath();ctx.arc(x+4,by+3,3.2,0,TAU);ctx.fill();if(on){ctx.strokeStyle='#fff';ctx.lineWidth=1;ctx.stroke()}}
   ctx.font='800 8px sans-serif';ctx.fillStyle='#ffd8b0';ctx.fillText(['드래곤의 알','아기 드래곤 무리','대형 드래곤'][ph]+(ph===2&&rageOn()?' · 분노':''),bx+44,by+3);ctx.textAlign='right';ctx.fillStyle='#c8b8a8';ctx.fillText('서버 전체 '+Math.ceil(q*100)+'%'+(st?' · '+st.players+'명':''),bx+bw,by+3);ctx.textAlign='left';
   bar(bx,by+10,bw,7,q,ph===2?'#ff2a1a':'#ff6a2a',ph===2?'#ffb040':'#ffd166');ctx.restore();return true},
  die(){setTimeout(()=>finish('dead'),900);return true}};
 /* 매 프레임: 피해 세기 · 3초마다 서버로 · 시간 · 아기 드래곤 채우기 · 덧그림 */
 {const f=frame;frame=function(){const r=f.apply(this,arguments);try{if(R.on&&!R.end){const T=TW71.T,now=performance.now();
    if(mode!=='tower'||T.ext!==EXT){if(mode!=='tower'&&mode!=='menu'){}if(T.ext!==EXT&&mode==='tower'){R.on=false;restore()}}
    else{if(paused)R.t0+=now-(R.last||now);R.last=now;scan();
     /* v179: 몬스터를 늘 채워 둠 — 알 단계 불씨 5 · 아기 드래곤 단계 8 · 대형 드래곤 단계 아기 드래곤 3 */if(!R.kill){const want=R.ph===0?['wisp',5]:R.ph===1?['wb_baby',8]:['wb_baby',3];const n=T.mobs.filter(m=>m.sp===want[0]&&!m.flee&&m.hp>0).length+T.queue.filter(q=>q.sp===want[0]).length;if(n<want[1])T.queue.push(want[0]==='wisp'?ember():baby())}
     if(now-(R.sentAt||0)>3000){R.sentAt=now;sync(false)}
     overlay(now)}}}catch(e){}return r}}
 if(typeof toLobby==='function'){const f=toLobby;toLobby=function(){if(R.on&&!R.end){R.end=true;R.on=false;try{api('/api/wb/hit',{run:R.run,dmg:Math.floor(R.acc),end:true})}catch(e){}restore()}return f.apply(this,arguments)}}
 /* 덧그림: 알 껍데기 · 유성 · 돌진 그림자 */
 function overlay(now){const T=TW71.T;ctx.save();try{ctx.setTransform(SS,0,0,SS,0,0)}catch(e){}
  if(R.hatch){const k=(now-R.hatch.t)/1400;if(k<1){ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(R.hatch.x,R.hatch.y-40,4,R.hatch.x,R.hatch.y-40,160*k+20);g.addColorStop(0,'rgba(255,240,200,'+(1-k)+')');g.addColorStop(1,'rgba(255,120,40,0)');ctx.fillStyle=g;ctx.fillRect(AX,AY,AW,AH);ctx.globalCompositeOperation='source-over';
    for(let i=0;i<14;i++){const a=i/14*TAU,d=k*90,x=R.hatch.x+Math.cos(a)*d,y=R.hatch.y-40+Math.sin(a)*d*.6+k*k*80;ctx.save();ctx.translate(x,y);ctx.rotate(a+k*8);ctx.globalAlpha=1-k;ctx.fillStyle=i%2?'#8a1a14':'#c8483a';ctx.beginPath();ctx.moveTo(-6,-3);ctx.lineTo(5,-4);ctx.lineTo(3,4);ctx.lineTo(-4,3);ctx.fill();ctx.restore()}}}
  const dg=T.mobs.find(m=>m.sp==='wb_dragon');if(dg&&DG.st==='meteor'&&DG.mt){for(const q of DG.mt){const tl=q.t1-T.clk;if(tl>0&&tl<.8){const k=1-tl/.8,sx=q.x+120*(1-k),sy=q.y-200*(1-k);ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(sx,sy,1,sx,sy,10);g.addColorStop(0,'#fff0c0');g.addColorStop(1,'rgba(255,90,20,0)');ctx.fillStyle=g;ctx.fillRect(sx-10,sy-10,20,20);ctx.strokeStyle='rgba(255,140,40,.6)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(sx+30,sy-50);ctx.stroke();ctx.globalCompositeOperation='source-over'}}}
  if(dg&&DG.st==='dive'&&DG.a1&&!DG.a3){ctx.globalAlpha=.4;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(DG.tx,DG.ty+6,40,11,0,0,TAU);ctx.fill();ctx.globalAlpha=1}
  if(R.kill){const d=TW71.T.mobs.find(m=>m.sp==='wb_dragon');const k=Math.min(1,(T.clk-DG.t0)/3);ctx.globalAlpha=Math.sin(k*Math.PI);ctx.font='900 26px serif';ctx.textAlign='center';ctx.lineWidth=5;ctx.strokeStyle='#1a0604';ctx.strokeText('토벌 성공!',W/2,AY+90);ctx.fillStyle='#ffd166';ctx.fillText('토벌 성공!',W/2,AY+90);ctx.textAlign='left';ctx.globalAlpha=1}
  ctx.restore();try{if(document.documentElement.classList.contains('phP')&&window.PV76&&PV76.paint)PV76.paint()}catch(e){}}

 /* ================= 광장 포탈 ================= */
 const PX=480,PY=505;let armed=true;
 function portalDraw(c,now){const t=now/1000,st=WS.st,ph=st?Math.min(2,st.phase):0,done=!!st&&!alive();c.save();c.imageSmoothingEnabled=false;
  /* 바닥 문양 */c.globalAlpha=.85;for(let i=0;i<40;i++){const a=i/40*TAU+t*.3,x=PX+Math.cos(a)*34,y=PY+Math.sin(a)*12;c.fillStyle=i%5?'#ff6a2a':'#ffd166';c.fillRect(Math.round(x)-1,Math.round(y)-1,2,2)}
  for(let i=0;i<24;i++){const a=i/24*TAU-t*.5,x=PX+Math.cos(a)*24,y=PY+Math.sin(a)*8;c.fillStyle='#c84a2a';c.fillRect(Math.round(x),Math.round(y),1,1)}c.globalAlpha=1;
  /* 양옆 돌기둥 · 용 뿔 장식 */for(const s of [-1,1]){const x=PX+s*36;c.fillStyle='#2a1a16';c.fillRect(x-5,PY-50,10,52);c.fillStyle='#4a3028';c.fillRect(x-4,PY-50,8,50);c.fillStyle='#5a3a30';for(let y=PY-46;y<PY;y+=8)c.fillRect(x-4,y,8,1);c.fillStyle='#e8dcc0';c.fillRect(x-2+s*3,PY-58,3,8);c.fillRect(x-1+s*6,PY-64,2,6);c.fillStyle='#ff6a2a';c.fillRect(x-1,PY-40,2,2)}
  /* 소용돌이 */const vy=PY-26;if(!done){c.save();c.globalCompositeOperation='lighter';for(let r=0;r<6;r++){const rr=24-r*3.6,a0=t*(1.2+r*.4)*(r%2?-1:1);for(let i=0;i<18;i++){const a=a0+i/18*TAU,x=PX+Math.cos(a)*rr,y=vy+Math.sin(a)*rr*1.1;c.fillStyle=['#ff4a1a','#ff8a2a','#c83a8a','#8a2aa8','#ffb040','#ffffff'][r];c.globalAlpha=.25+r*.1;c.fillRect(Math.round(x)-1,Math.round(y)-1,2,2)}}
   const g=c.createRadialGradient(PX,vy,2,PX,vy,30);g.addColorStop(0,'rgba(255,200,120,.55)');g.addColorStop(.6,'rgba(200,50,40,.25)');g.addColorStop(1,'rgba(0,0,0,0)');c.globalAlpha=1;c.fillStyle=g;c.fillRect(PX-30,vy-30,60,60);c.restore();
   c.fillStyle='#1a0408';c.beginPath();c.ellipse(PX,vy,9,11,0,0,TAU);c.fill();const eo=Math.max(0,Math.sin(t*.7))>.6?1:0;if(eo){c.fillStyle='#ffd23a';c.fillRect(PX-4,vy-1,8,2);c.fillStyle='#200';c.fillRect(PX-.5,vy-1.5,1,3)}}
  else{c.fillStyle='#1a1414';c.beginPath();c.ellipse(PX,vy,22,24,0,0,TAU);c.fill()}
  /* 불티 */for(let i=0;i<6;i++){const q=(t*.5+i/6)%1;c.globalAlpha=(1-q)*.8;c.fillStyle=i%2?'#ffb040':'#ff6a2a';c.fillRect(Math.round(PX-20+i*8+Math.sin(q*6+i)*3),Math.round(PY-10-q*50),1,2)}c.globalAlpha=1;
  /* 위 간판: 단계 · 서버 체력 */const by=PY-92,bw=92;c.fillStyle='#000c';c.fillRect(PX-bw/2,by,bw,24);c.fillStyle='#ff6a2a';c.fillRect(PX-bw/2,by,bw,1);c.font='bold 7px sans-serif';c.textAlign='center';c.fillStyle='#ffd166';c.fillText('🐉 용의 둥지 · 월드 보스',PX,by+8);
  c.fillStyle='#e8d8c8';c.fillText(done?'다음 드래곤 '+clk(st.next-srvNow())+' 뒤':(['알','아기 드래곤','대형 드래곤'][ph]+' 단계 · '+Math.ceil(frac(ph)*100)+'%'),PX,by+16);if(!done){c.fillStyle='#2a0806';c.fillRect(PX-40,by+19,80,3);c.fillStyle=ph===2?'#ff3a1a':'#ff8a2a';c.fillRect(PX-40,by+19,80*frac(ph),3)}
  const near=Math.hypot(P.x-PX,P.y-PY)<60;if(near){c.font='bold 8px sans-serif';const msg='포탈로 들어가면 용의 둥지';const tw=c.measureText(msg).width+10;c.fillStyle='#000c';c.fillRect(PX-tw/2,PY+14,tw,12);c.fillStyle='#ffe9a8';c.fillText(msg,PX,PY+23)}
  c.textAlign='left';c.restore()}
 if(window.PLZART&&PLZART.objs){const f=PLZART.objs;PLZART.objs=function(now){const L=f.apply(this,arguments)||[];try{L.push({y:PY+.5,fn:()=>portalDraw(ctx,now)})}catch(e){}return L}}
 try{if(window.PLZ111&&PLZ111.OBST)PLZ111.OBST.push({x:PX-42,y:PY-8,w:12,h:10},{x:PX+30,y:PY-8,w:12,h:10})}catch(e){}
 setInterval(()=>{try{if(mode!=='plaza'){armed=true;return}if(WS.st&&!alive()&&srvNow()>WS.st.next+2&&performance.now()-WS.at>5000)pull();const d=Math.hypot(P.x-PX,(P.y-PY)*1.6);if(d>40)armed=true;if(armed&&d<16&&!$('wb177q')){armed=false;askEnter()}}catch(e){}},100);
 /* 정보 창 */
 async function askEnter(){if(!WS.st||performance.now()-WS.at>3000)await pull();const st=WS.st;const ov=document.createElement('div');ov.id='wb177q';
  const ph=st?Math.min(2,st.phase):0,done=!!st&&!alive(),me=(st&&st.me)||{},killed=st&&st.killed;
  const row=(i,ic,n)=>{const q=frac(i),cur=i===ph&&!done;return '<div class="ph'+(cur?' cur':'')+(q<=0?' dn':'')+'"><b>'+ic+' '+n+'</b><i><s style="width:'+(q*100)+'%"></s></i><em>'+(q<=0?'✓ 처치':Math.ceil(q*100)+'%')+'</em></div>'};
  ov.innerHTML='<div class="bx"><h3>🐉 용의 둥지 <small>월드 보스</small></h3><p class="d">서버의 모든 사람이 함께 깎는 드래곤이에요. 알을 깨면 아기 드래곤 무리가, 아기 드래곤을 다 잡으면 대형 드래곤이 나타나요.</p>'+
   row(0,'🥚','드래곤의 알')+row(1,'🐲','아기 드래곤 무리')+row(2,'🐉','대형 드래곤')+
   '<div class="mt"><span>참여 <b>'+(st?st.players:0)+'</b>명</span><span>'+(!st?'':done?'다음 드래곤 <b>'+hm(st.next-srvNow())+'</b> 뒤':'도망까지 <b>'+hm(st.ends-srvNow())+'</b>')+'</span></div>'+
   '<div class="tp">'+((st&&st.top.length)?st.top.slice(0,5).map((t,i)=>'<div><b>'+(i+1)+'</b> '+esc(t.name)+'<em>'+num(t.dmg)+'</em></div>').join(''):'<div class="no">아직 아무도 싸우지 않았어요</div>')+'</div>'+
   '<div class="me">내 피해 <b>'+num(me.dmg)+'</b>'+(me.rank?' · '+me.rank+'위':'')+' · 시간 제한 · 입장 횟수 없음</div>'+
   rwHtml(st)+
   '<div class="r"><button class="no">닫기</button><button class="go"'+(done||!st?' disabled':'')+'>'+(!st?'연결 중…':done?(killed?'토벌 완료 · ':'')+'다음 드래곤 '+hm(st.next-srvNow())+' 뒤':'⚔ 입장')+'</button></div></div>';
  document.body.appendChild(ov);ov.querySelector('.no').onclick=()=>ov.remove();ov.querySelector('.go').onclick=()=>{ov.remove();enter()};ov.addEventListener('click',e=>{if(e.target===ov)ov.remove()})}
 /* 보상표(서버 st.rw — WB_REWARD_MUL이 곱해진 값) */
 function rwHtml(st){const w=st&&st.rw;if(!w)return '<p class="rw">보상은 우편으로 와요</p>';const gd=v=>'🪙'+num(v[0])+(v[1]?' 💎'+v[1]:'');
  return '<div class="rw"><b>보상(우편)</b><div>토벌 성공 · 참여자 모두 <em>'+gd(w.clear)+'</em> (도망가면 '+gd(w.join)+')</div>'+
   '<div>피해 순위 '+w.rank.map(r=>(r[0]===r[1]?r[0]+'위':r[0]+'~'+r[1]+'위')+' <em>+'+gd([r[2],r[3]])+'</em>').join(' · ')+'</div>'+
   '<div>⭐ 추가 · 마지막 한 방: 알 깨기 <em>'+gd(w.bonus.egg)+'</em> · 아기 드래곤 정리 <em>'+gd(w.bonus.baby)+'</em> · 막타 <em>'+gd(w.bonus.kill)+'</em></div>'+
   '<div>⭐ 추가 · 내 피해 단계: '+w.step.map(t=>num(t[0])+' <em>+'+gd([t[1],t[2]])+'</em>').join(' · ')+'</div></div>'}
 const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 const tb=document.createElement('div');tb.id='wb177t';tb.hidden=true;document.body.appendChild(tb);let tbT=0;
 function toast(a,b){tb.innerHTML='<b>'+a+'</b><small>'+(b||'')+'</small>';tb.hidden=false;clearTimeout(tbT);tbT=setTimeout(()=>{tb.hidden=true},3200)}
 const css=document.createElement('style');css.textContent=`
 #wb177q{position:fixed;inset:0;z-index:9500;display:grid;place-items:center;background:#000a}
 #wb177q .bx{width:min(400px,92vw);max-height:92vh;overflow-y:auto;padding:16px;border-radius:16px;background:radial-gradient(120% 80% at 50% 0%,#4a1408,#160806 70%);border:2px solid #ff6a2a88;color:#f4e6d8;box-shadow:0 0 34px #ff4a1a55}
 #wb177q h3{margin:0 0 4px;color:#ffd166;font-size:20px}#wb177q h3 small{font-size:11px;color:#ff9a6a;margin-left:6px}#wb177q .d{font-size:12px;line-height:1.55;color:#d8c4b4;margin:0 0 10px}
 #wb177q .ph{display:grid;grid-template-columns:118px 1fr 44px;align-items:center;gap:8px;padding:6px 8px;border-radius:10px;margin-bottom:5px;background:#ffffff08;font-size:12px}
 #wb177q .ph.cur{background:#ff6a2a22;box-shadow:inset 0 0 0 1px #ff8a4a99}#wb177q .ph.dn{opacity:.55}#wb177q .ph i{display:block;height:8px;border-radius:5px;background:#2a0806;overflow:hidden}#wb177q .ph s{display:block;height:100%;background:linear-gradient(90deg,#ff3a1a,#ffd166)}#wb177q .ph em{font-style:normal;text-align:right;color:#ffd8b0;font-weight:800}
 #wb177q .mt{display:flex;justify-content:space-between;font-size:12px;color:#d8c4b4;margin:8px 2px}#wb177q .mt b{color:#fff}
 #wb177q .tp{background:#00000044;border-radius:10px;padding:6px 10px;font-size:12px}#wb177q .tp div{display:flex;gap:8px;padding:2px 0}#wb177q .tp b{width:14px;color:#ffd166}#wb177q .tp em{margin-left:auto;font-style:normal;color:#ffb080}#wb177q .tp .no{color:#a89888}
 #wb177q .me{margin:8px 2px;font-size:13px}#wb177q .me b{color:#ffd166}#wb177q .rw{font-size:11px;color:#c8a888;line-height:1.5;margin:0 2px 10px}#wb177q .rw>b{display:block;color:#ffb060;font-size:12px;margin-bottom:2px}#wb177q .rw>div{padding:1px 0}#wb177q .rw em{font-style:normal;color:#ffe9a8;white-space:nowrap}
 #wb177q .r{display:flex;gap:8px}#wb177q button{flex:1;font:inherit;font-weight:900;padding:11px;border-radius:11px;border:0;cursor:pointer}#wb177q .no{background:#3a2a22;color:#e8d8c8}#wb177q .go{background:linear-gradient(180deg,#ff8a3a,#d8361a);color:#fff;box-shadow:0 0 14px #ff4a1a88}#wb177q .go:disabled{background:#4a3a34;color:#a89888;box-shadow:none}
 #wb177t{position:fixed;left:50%;top:16%;transform:translateX(-50%);z-index:9800;display:flex;flex-direction:column;align-items:center;gap:2px;padding:12px 22px;border-radius:16px;background:radial-gradient(120% 120% at 50% 0%,#5a1a08,#160806);border:2px solid #ff8a4a;color:#fff;pointer-events:none}#wb177t[hidden]{display:none}#wb177t b{font-size:17px;color:#ffd8a8}#wb177t small{font-size:12px;color:#d8c0a8}`;document.head.appendChild(css);
 window.WB177={EXT,TSP,gotBonus:L=>gotBonus(L),VD,FP,DPAL,dPose,pulse,R,W:WS,DG,enter,begin,setup,transition,onState,finish,pull,askEnter,PX,PY,force:k=>{DG.force=k;DG.cd=0}};
}catch(e){console.error('v177 world boss',e)}})();
