/* ================= v52 챕터 7 공격에 "그 보스다움" 입히기 =================
   1) 외침: 공격을 시작할 때 보스가 그 공격에 맞는 한마디를 말풍선으로 외친다 (체스 왕 "룩, 전진!" 등)
   2) 시전 부위: 공격이 나오는 몸의 부위(열쇠 창·깃털 눈·물의 손·홀·불꽃·조종 막대·입·대검)가 빛나고,
      예고 동안 그 부위에서 공격 자리까지 보스다운 줄(실·물줄기·빛 점선)이 이어진다
   3) 공격 모양: 같은 판정이라도 보스마다 모양을 바꾼다
      열쇠 · 유리 깃털 · 물방울 · 체스 말 · 거꾸로 불꽃 · 음표와 칼날 별 · 목마와 전구 · 꼭두각시 · 비늘 결정 · 거울 조각
   판정(맞는 범위)은 바꾸지 않는다. 그림만 바뀐다. */
(function(){try{
 const L7=window.S7ART,H=window.S7H;if(!L7||!H)return;
 const on=()=>typeof G!=='undefined'&&G&&G.s7!=null;
 /* ---------- 1) 공격별 외침 + 시전 부위 [대사, x, y] (보스 그림 좌표) ---------- */
 const CAST={
  s7GateKey:['열쇠로 잠근다!',20,-49],s7GateMirror:['비춰라, 거울 면!',0,-26],s7GateClose:['문을 닫아라!',0,-26],s7GateClock:['열세 시를 쳐라!',0,-51],s7hGateLock:['갇혀라, 영원히!',0,-26],s7xGateThirteen:['열세 번째 문이 열린다…',0,-51],
  s7PeaFan:['내 깃털을 봐!',0,-14],s7PeaGaze:['어디로 숨든 보인다!',0,-14],s7PeaFeather:['유리 깃털, 쏟아져라!',0,-14],s7PeaSpin:['날개를 펼친다!',0,-14],s7hPeaHundred:['백 개의 눈이 너를 본다!',0,-14],s7xPeaPrismTail:['일곱 빛으로 부서져라!',0,-14],
  s7FountUp:['물아, 거꾸로 솟아라!',0,-30],s7FountArc:['받아라, 물덩이!',19,-30],s7FountRain:['하늘로 떨어지는 비!',0,-30],s7FountWave:['수면이 차오른다!',0,-30],s7hFountGeyser:['발밑을 조심해!',0,-30],s7xFountFlood:['모두 거꾸로 잠겨라!',0,-30],
  s7ChessRook:['룩, 전진!',0,-34],s7ChessBishop:['비숍, 대각선으로!',0,-34],s7ChessKnight:['나이트, 뛰어라!',0,-34],s7ChessCheck:['체크!',0,-34],s7hChessQueen:['퀸, 출격!',0,-34],s7xChessPromotion:['폰을 퀸으로!',0,-34],
  s7CandleDrip:['녹아내려라…',0,-44],s7CandleFlame:['거꾸로 타올라라!',0,-44],s7CandleWick:['심지에 불을!',11,-24],s7CandleOut:['불꽃 고리로 가둬!',0,-44],s7hCandleCandelabra:['일곱 촛불이 너를 향한다!',0,-30],s7xCandleMelt:['시간이 녹아내린다…',0,-44],
  s7BalletSpin:['피루엣!',0,-30],s7BalletLeap:['그랑 주테!',0,-30],s7BalletNotes:['오르골, 처음부터!',0,-30],s7BalletMirror:['거울 무대로!',0,-28],s7hBalletDuet:['거울 속 나와 함께!',0,-30],s7xBalletFinale:['커튼콜이에요!',0,-30],
  s7CarHorse:['목마들아, 달려라!',0,-26],s7CarRing:['한 바퀴만 더!',0,-26],s7CarLights:['불을 켜라!',0,-26],s7CarFlag:['깃발을 꽂아라!',0,-40],s7hCarGallop:['질주다!',0,-26],s7xCarDerail:['축이… 빠진다!',0,-26],
  s7PupString:['실을 당겨라.',0,-50],s7PupDoll:['꼭두각시들아, 가라.',0,-18],s7PupMask:['웃어라, 가면아!',0,-39],s7PupWeb:['그물을 쳐라.',0,-50],s7hPupMarionette:['네 그림자는 내 것이다.',0,-50],s7xPupCurtain:['막을 내려라.',0,-50],
  s7DragonBreath:['되돌려 주마!',-19,-40],s7DragonWing:['비늘이 떨어진다!',0,-30],s7DragonDive:['내려간다!',-19,-40],s7DragonPrism:['빛을 튕겨라!',-19,-40],s7hDragonTwin:['두 숨결을 받아라!',-19,-40],s7xDragonKaleido:['만화경 속에 갇혀라!',0,-30],
  s7HaruSlash:['거울처럼 벤다!',-11,-22],s7HaruShards:['조각들아!',0,-36],s7HaruHalo:['바늘을 되감아!',0,-43],s7HaruMirror:['나는 너야.',0,-30],s7hHaruCounter:['반격이다!',-11,-22],s7xHaruZero:['0시야. 다 되감겨.',0,-43]};
 for(const n in CAST){const f=MV[n];if(!f)continue;MV[n]=function(t){try{const c=CAST[n];sch(t,()=>{if(on())G.s7cast={n,t,line:c[0],ax:c[1],ay:c[2],real:performance.now()}})}catch(e){}return f.apply(this,arguments)}}
 window.S7CAST=CAST;
 const castPt=()=>{const c=G.s7cast;return c?H.P7(c.ax,c.ay):H.P7(0,-30)};
 /* 말풍선 + 시전 부위 빛 */
 function drawCast(now){const c=G.s7cast;if(!c)return;const age=(now-c.real)/1000;if(age>2.2)return;const B=L7[G.s7],col=B.c,[sx,sy]=castPt(),k=G.s7;
  /* 부위 빛: 커졌다가 사라지는 고리 + 빛살 */const p=Math.min(1,age/.6),a=age<1.4?1:Math.max(0,1-(age-1.4)/.8);
  pcirc(sx,sy,3+p*4,col,.35*a);pcirc(sx,sy,2,'#ffffff',.9*a);cRing(sx,sy,4+p*14,col,(1-p)*.8*a,1);
  for(let i=0;i<6;i++){const ang=i*TAU/6+now/700,L=6+p*8;for(let s=4;s<L;s+=2)cPx(sx+Math.cos(ang)*s,sy+Math.sin(ang)*s,1,i%2?'#ffffff':col,.6*a*(1-s/L))}
  /* 말풍선 */const ctx2=ctx;ctx2.save();ctx2.font='bold 8px '+(typeof FONT_STACK!=='undefined'?FONT_STACK:'sans-serif');const tw=Math.ceil(ctx2.measureText(c.line).width),bw=tw+10,bh=13;
  const pos=H.POS['c_'+B.art],hx=pos?pos.x:sx,hy=pos?pos.y-44*pos.u:sy-20,side=pos?26*pos.u:18;let bx=Math.round(hx+side),by=Math.round(hy-6);if(bx+bw>AX+AW-4)bx=Math.round(hx-side-bw);bx=clamp(bx,AX+4,AX+AW-bw-4);by=clamp(by,AY+54,AY+AH-30);
  const pop=age<.15?age/.15:1,ba=Math.min(1,(2.2-age)/.4);ctx2.globalAlpha=ba;RA(bx+1,by+2,bw,bh,'#000000',.4*ba);RA(bx,by,bw,bh,'#0a0c18',.92*ba);RA(bx,by,bw,1,col,ba);RA(bx,by+bh-1,bw,1,col,.6*ba);RA(bx,by,1,bh,col,.6*ba);RA(bx+bw-1,by,1,bh,col,.6*ba);
  const tx=bx<hx?bx+bw-6:bx+6;for(let i=0;i<3;i++)RA(bx<hx?tx-i+2:tx+i-2,by+bh+i,3-i,1,col,.8*ba);
  ctx2.globalAlpha=ba*pop;ctx2.fillStyle='#000';ctx2.textAlign='left';ctx2.fillText(c.line,bx+5+1,by+10);ctx2.fillStyle=k===3?'#ffffff':mixc(col,'#ffffff',.55);ctx2.fillText(c.line,bx+5,by+9);ctx2.restore();ctx.globalAlpha=1}
 {const _ds=drawScene;drawScene=function(now){const r=_ds.apply(this,arguments);try{if(on()&&G.state==='play')drawCast(now)}catch(e){}return r}}

 /* ---------- 2·3) 공격 모양 입히기 ---------- */
 {const base=NP;NP=function(o){try{if(on()&&o&&['seg','orb','circ','rect'].includes(o.k)&&o.harm!==false){o.s7k=G.s7;const c=G.s7cast;if(c&&G.beat-c.t<8)o.s7src=castPt()}}catch(e){}return base.apply(this,arguments)}}
 const dirOf=(o,b)=>{if(o.ray!=null&&b<o.t1+.05)return o.ray;try{const [x0,y0]=o.pos(b-.04),[x1,y1]=o.pos(b);if(Math.hypot(x1-x0,y1-y0)>.05)return Math.atan2(y1-y0,x1-x0)}catch(e){}return o.ray!=null?o.ray:Math.PI/2};
 const LN=(ax,ay,bx,by,st,fn)=>{const L=Math.hypot(bx-ax,by-ay),n=Math.max(1,Math.floor(L/st));for(let i=0;i<=n;i++){const q=i/n;fn(ax+(bx-ax)*q,ay+(by-ay)*q,i,q)}};
 const along=(x,y,a,d,s)=>[x+Math.cos(a)*d-Math.sin(a)*s,y+Math.sin(a)*d+Math.cos(a)*s];
 /* 구슬 → 보스다운 물체 */
 const ORB=[
  /* 0 열쇠 */(o,x,y,a,t,col)=>{for(let d=-6;d<=5;d++){const [px,py]=along(x,y,a,d,0);cPx(px,py,2,'#3a2a10',1);cPx(px,py,1,'#ffd27a',1)}const [hx,hy]=along(x,y,a,-8,0);cRing(hx,hy,3,'#ffd27a',1,2);pcirc(hx,hy,1,'#5af0e0',1);for(const d of [3,5]){const [px,py]=along(x,y,a,d,2.5);cPx(px,py,2,'#ffd27a',1)}const [gx,gy]=along(x,y,a,5,0);cPx(gx,gy,1,'#ffffff',1)},
  /* 1 유리 깃털 */(o,x,y,a,t,col)=>{for(let d=-9;d<=6;d++){const w=Math.max(0,Math.round(2.6*(1-Math.abs(d+1)/9)));for(let s=-w;s<=w;s++){const [px,py]=along(x,y,a,d,s);cPx(px,py,1,Math.abs(s)===w?'#0e3a3a':s===0?'#ffffff':col,.95)}}const [ex,ey]=along(x,y,a,-4,0);pcirc(ex,ey,2,'#1a3a8a',1);pcirc(ex,ey,1,'#ffd27a',1)},
  /* 2 물방울 */(o,x,y,a,t,col)=>{for(let d=1;d<=5;d++){const [px,py]=along(x,y,a,-d*1.6-2,0);cPx(px,py,Math.max(1,4-d),'#bff4ff',.7-d*.1)}pcirc(x,y,o.r,'#0a3a5a',1);pcirc(x,y,o.r-1,col,1);cPx(x-1.5,y-1.5,1.5,'#ffffff',1)},
  /* 3 체스 폰 */(o,x,y,a,t,col)=>{const dk=(o.col==='#16161e')||hash((o.t0*97|0)+'p')%2===0,f=dk?'#16161e':'#f2f6ff',e=dk?'#8492b0':'#0a0c18',s=o.r>=7?1.4:1;const P2=(dx,dy,w,h,c)=>RA(Math.round(x+dx*s),Math.round(y+dy*s),Math.max(1,Math.round(w*s)),Math.max(1,Math.round(h*s)),c,1);
   P2(-4,3,8,3,e);P2(-3.5,3.5,7,2,f);P2(-2.5,-1,5,5,e);P2(-2,-.5,4,4.5,f);pcirc(x,y-3*s,2.6*s,e,1);pcirc(x,y-3*s,2*s,f,1);cPx(x-.8*s,y-3.8*s,1,dk?'#c4d0e4':'#ffffff',1)},
  /* 4 거꾸로 불꽃 (끝이 날아온 쪽을 향함) */(o,x,y,a,t,col)=>{const fl=Math.sin(t*30+(o.t0||0))*.8;for(let d=0;d<=7;d++){const w=Math.max(0,3.6*(1-d/7.5));const [px,py]=along(x,y,a,-d,fl*d*.15);pcirc(px,py,w,d<2?'#ffffff':d<4?'#b8fff6':col,.9)}pcirc(x,y,1.4,'#ffffff',1)},
  /* 5 음표 · 칼날 별 */(o,x,y,a,t,col)=>{if(o.sty==='note'){pcirc(x,y+1,2.4,'#0a0c18',1);pcirc(x,y+1,1.8,col,1);RA(Math.round(x+1),Math.round(y-6),1,7,col,1);RA(Math.round(x+1),Math.round(y-6),3,1,col,1);RA(Math.round(x+3),Math.round(y-5),1,2,col,1);return}
   const r=t*9;for(let i=0;i<4;i++){const q=r+i*Math.PI/2;for(let d=0;d<=5;d++)cPx(x+Math.cos(q)*d,y+Math.sin(q)*d,d<3?2:1,d<2?'#ffffff':col,1)}pcirc(x,y,1.5,'#fff0f8',1)},
  /* 6 목마 · 전구 */(o,x,y,a,t,col)=>{if(o.sty==='bob'){const fx=Math.cos(a)>=0?1:-1,bob=Math.round(Math.sin(t*12+(o.t0||0))*1);const P2=(dx,dy,w,h,c)=>RA(Math.round(x+(fx>0?dx:-dx-w)),Math.round(y+dy+bob),w,h,c,1);
    P2(-6,-2,10,5,'#0a0c18');P2(-5,-1,8,3,'#f2e8ff');P2(2,-6,4,5,'#0a0c18');P2(3,-5,2,4,'#f2e8ff');P2(4,-4,1,1,'#0a0c18');P2(-5,3,1,3,'#f2e8ff');P2(1,3,1,3,'#f2e8ff');P2(-6,-1,1,1,col);P2(-1,-9,1,16,'#ffd27a');P2(-3,-2,4,1,'#ff7ad0');return}
   pcirc(x,y,o.r+2,col,.25);pcirc(x,y,o.r,'#3a2a10',1);pcirc(x,y,o.r-1,col,1);pcirc(x,y,Math.max(1,o.r-2.5),'#fff8e0',1)},
  /* 7 꼭두각시 (머리 위로 실) */(o,x,y,a,t,col)=>{const sw=Math.sin(t*10+(o.t0||0))*1.5;LN(x,y-6,x+sw*3,AY,6,(px,py)=>cPx(px,py,1,'#c4d0e4',.35));
   RA(Math.round(x-3),Math.round(y-2),6,6,'#0a0814',1);RA(Math.round(x-2),Math.round(y-1),4,4,o.col||'#3e3058',1);pcirc(x,y-4.5,2.6,'#0a0814',1);pcirc(x,y-4.5,2,'#e8e0f0',1);cPx(x-.8,y-4.8,1,'#0a0814',1);cPx(x+.8,y-4.8,1,'#0a0814',1);
   RA(Math.round(x-5),Math.round(y-1+sw*.5),2,1,'#e8e0f0',1);RA(Math.round(x+3),Math.round(y-1-sw*.5),2,1,'#e8e0f0',1);RA(Math.round(x-2),Math.round(y+4),1,2,'#e8e0f0',1);RA(Math.round(x+1),Math.round(y+4),1,2,'#e8e0f0',1)},
  /* 8 비늘 결정 */(o,x,y,a,t,col)=>{const r=o.r+1;for(let d=-r;d<=r;d++){const w=Math.round((r-Math.abs(d))*.6);for(let s=-w;s<=w;s++){const [px,py]=along(x,y,a,d,s);cPx(px,py,1,Math.abs(s)===w||Math.abs(d)===r?'#0a1828':s<0?'#ffffff':col,1)}}const [gx,gy]=along(x,y,a,-1,-1);cPx(gx,gy,1,'#ffffff',1)},
  /* 9 거울 조각 */(o,x,y,a,t,col)=>{if(o.sty==='bob'){pcirc(x,y,o.r+3,col,.25);pcirc(x,y,o.r,'#141228',1);pcirc(x,y,o.r-1,col,1);cPx(x-2,y-2,2,'#ffffff',1);return}const sp=t*6+(o.t0||0);const pts=[[0,-5],[4,3],[-3,4]].map(([px,py])=>[x+px*Math.cos(sp)-py*Math.sin(sp),y+px*Math.sin(sp)+py*Math.cos(sp)]);
   ctx.save();ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);ctx.lineTo(pts[1][0],pts[1][1]);ctx.lineTo(pts[2][0],pts[2][1]);ctx.closePath();ctx.fillStyle='#0a0c18';ctx.globalAlpha=1;ctx.lineWidth=2;ctx.strokeStyle='#0a0c18';ctx.stroke();ctx.fillStyle=col;ctx.fill();ctx.restore();cPx((pts[0][0]+pts[1][0])/2,(pts[0][1]+pts[1][1])/2,1,'#ffffff',1)}];
 {const base=NPK.orb.draw;NPK.orb.draw=function(o,b,now){if(o.s7k==null||!ORB[o.s7k])return base.apply(this,arguments);try{const [x,y]=o.pos(b);ORB[o.s7k](o,x,y,dirOf(o,b),now/1000,o.col||L7[o.s7k].c);ctx.globalAlpha=1}catch(e){return base.apply(this,arguments)}}}
 /* 선 공격 → 보스다운 장식 */
 const SEG=[
  /* 0 열쇠 창: 열쇠 이빨 */(ax,ay,bx,by,w,col,t)=>{const a=Math.atan2(by-ay,bx-ax);LN(ax,ay,bx,by,14,(x,y,i)=>{if(i%2)return;const [px,py]=along(x,y,a,0,w/2+1);cPx(px,py,2,'#ffd27a',.9);const [qx,qy]=along(x,y,a,3,w/2+1);cPx(qx,qy,1,'#ffd27a',.9)})},
  /* 1 깃털 가지 */(ax,ay,bx,by,w,col,t)=>{const a=Math.atan2(by-ay,bx-ax);LN(ax,ay,bx,by,7,(x,y,i)=>{for(const s of [-1,1]){const [px,py]=along(x,y,a,-3,s*(w/2+3));LN(x,y,px,py,1,(qx,qy)=>cPx(qx,qy,1,col,.55))}if(i%6===3){pcirc(x,y,2.5,'#1a3a8a',.9);pcirc(x,y,1.2,'#ffd27a',1)}})},
  /* 2 물줄기: 물방울이 흐름 */(ax,ay,bx,by,w,col,t)=>{const a=Math.atan2(by-ay,bx-ax);LN(ax,ay,bx,by,5,(x,y,i)=>{const s=Math.sin(i*.9-t*14)*(w/2+1);const [px,py]=along(x,y,a,0,s);cPx(px,py,2,'#e8fbff',.7)})},
  /* 3 체스판 칸 */(ax,ay,bx,by,w,col,t)=>{LN(ax,ay,bx,by,6,(x,y,i)=>cPx(x,y,Math.max(2,w-2),i%2?'#16161e':'#f2f6ff',.85))},
  /* 4 불꽃 혀 */(ax,ay,bx,by,w,col,t)=>{const a=Math.atan2(by-ay,bx-ax),sd=Math.floor(t*20);LN(ax,ay,bx,by,4,(x,y,i)=>{const h=hash(sd+'f'+i)%5;for(const s of [-1,1]){const [px,py]=along(x,y,a,0,s*(w/2+1+h));cPx(px,py,1,h>2?'#ffffff':'#b8fff6',.8)}})},
  /* 5 리본 */(ax,ay,bx,by,w,col,t)=>{const a=Math.atan2(by-ay,bx-ax);LN(ax,ay,bx,by,2,(x,y,i)=>{const s=Math.sin(i*.35+t*8)*(w/2+3);const [px,py]=along(x,y,a,0,s);cPx(px,py,1,'#ffe0f0',.85)})},
  /* 6 놋쇠 기둥 줄무늬 */(ax,ay,bx,by,w,col,t)=>{LN(ax,ay,bx,by,4,(x,y,i)=>{if((i+Math.floor(t*6))%3===0)cPx(x,y,Math.max(2,w-1),'#ff7ad0',.8)})},
  /* 7 실 매듭 */(ax,ay,bx,by,w,col,t)=>{LN(ax,ay,bx,by,16,(x,y,i)=>{pcirc(x,y,1.5,'#e8e0f0',.9)})},
  /* 8 무지개 테 */(ax,ay,bx,by,w,col,t)=>{const a=Math.atan2(by-ay,bx-ax);LN(ax,ay,bx,by,3,(x,y)=>{const [p1x,p1y]=along(x,y,a,0,-(w/2+1)),[p2x,p2y]=along(x,y,a,0,w/2+1);cPx(p1x,p1y,1,'#ff7a9a',.75);cPx(p2x,p2y,1,'#7ab8ff',.75)})},
  /* 9 대검: 칼날 빛이 흐름 + 날밑 */(ax,ay,bx,by,w,col,t)=>{const a=Math.atan2(by-ay,bx-ax),L=Math.hypot(bx-ax,by-ay),q=(t*2)%1,[gx,gy]=along(ax,ay,a,L*q,0);pcirc(gx,gy,w*.5,'#ffffff',.7);for(let s=-7;s<=7;s++){const [px,py]=along(ax,ay,a,10,s);cPx(px,py,2,'#ffd27a',1)}}];
 {const base=NPK.seg.draw;NPK.seg.draw=function(o,b,now){const r=base.apply(this,arguments);if(o.s7k==null||!SEG[o.s7k])return r;try{const [ax,ay]=o.a(b),[bx,by]=o.b(b);SEG[o.s7k](ax,ay,bx,by,Math.max(2,o.w),o.col||L7[o.s7k].c,now/1000);ctx.globalAlpha=1}catch(e){}return r}}
 /* 장판(사각) → 보스다운 무늬 */
 const RECT=[
  /* 0 문짝: 세로 널판 + 열쇠 구멍 */(x,y,w,h,col,t)=>{for(let i=6;i<w;i+=8)RA(x+i,y+2,1,h-4,'#3a2a10',.45);if(w>14&&h>20){const cx=Math.round(x+w/2),cy=Math.round(y+h/2);pcirc(cx,cy-2,2.5,'#0a0c18',.9);RA(cx-1,cy,2,5,'#0a0c18',.9)}RA(x,y+Math.round(h*.3),w,1,'#ffd27a',.5);RA(x,y+Math.round(h*.7),w,1,'#ffd27a',.5)},
  /* 1 유리판 격자 */(x,y,w,h,col,t)=>{for(let i=10;i<w;i+=12)RA(x+i,y,1,h,'#ffffff',.3);for(let j=10;j<h;j+=12)RA(x,y+j,w,1,'#ffffff',.3);RA(x+2,y+2,Math.min(w-4,6),1,'#ffffff',.8)},
  /* 2 물기둥: 위로 오르는 거품 */(x,y,w,h,col,t)=>{for(let i=0;i<Math.max(2,w/6);i++){const q=(t*.9+i*.37)%1,bx=x+3+((i*13)%Math.max(1,w-6)),by=y+h-q*h;cRing(bx,by,1.5,'#e8fbff',.7*(1-q),1)}},
  /* 3 체스판 */(x,y,w,h,col,t)=>{const s=10;for(let i=0;i<w;i+=s)for(let j=0;j<h;j+=s)if(((i+j)/s)%2===0)RA(x+i,y+j,Math.min(s,w-i),Math.min(s,h-j),col==='#16161e'?'#3a3a4a':'#16161e',.35)},
  /* 4 촛농 흘러내림 */(x,y,w,h,col,t)=>{for(let i=2;i<w-2;i+=5){const L=4+(hash(i+'w')%Math.max(2,Math.min(18,h/3)));RA(x+i,y,3,L,'#e8fff8',.55);pcirc(x+i+1.5,y+L,1.5,'#e8fff8',.55)}},
  /* 5 리본 사선 */(x,y,w,h,col,t)=>{ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();for(let i=-h;i<w;i+=12)LN(x+i+(t*20%12),y,x+i+h+(t*20%12),y+h,2,(px,py)=>cPx(px,py,2,'#ffe0f0',.35));ctx.restore()},
  /* 6 천막 줄무늬 */(x,y,w,h,col,t)=>{for(let i=0;i<w;i+=8)RA(x+i,y,4,h,'#ff7ad0',.25);for(let i=4;i<w;i+=10)pcirc(x+i,y+3,1.5,'#fff0c0',.8)},
  /* 7 무대 막: 주름 + 금색 술 */(x,y,w,h,col,t)=>{for(let i=3;i<w;i+=6)RA(x+i,y,2,h,'#0a0814',.35);RA(x,y+h-3,w,2,'#ffd27a',.8);for(let i=1;i<w;i+=4)RA(x+i,y+h-1,1,2,'#ffd27a',.8)},
  /* 8 거울판 빛 */(x,y,w,h,col,t)=>{const q=(t*.6)%1;ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();LN(x+(q*2-.5)*w,y,x+(q*2-.5)*w-h*.5,y+h,2,(px,py)=>cPx(px,py,4,'#ffffff',.35));ctx.restore()},
  /* 9 금 간 거울 */(x,y,w,h,col,t)=>{const cx=x+w/2,cy=y+h/2;for(let i=0;i<5;i++){const a=i*1.3+.4,L=Math.min(w,h)*.45;LN(cx,cy,cx+Math.cos(a)*L,cy+Math.sin(a)*L,2,(px,py)=>cPx(px,py,1,'#ffffff',.55))}}];
 {const base=NPK.rect.draw;NPK.rect.draw=function(o,b,now){const r=base.apply(this,arguments);if(o.s7k==null||!RECT[o.s7k])return r;try{const [x,y,w,h]=o.rf?o.rf(b):[o.x,o.y,o.w,o.h];if(w>2&&h>2)RECT[o.s7k](Math.round(x),Math.round(y),Math.round(w),Math.round(h),o.col||L7[o.s7k].c,now/1000);ctx.globalAlpha=1}catch(e){}return r}}
 /* 원 → 보스다운 그림 */
 const CIRC=[
  /* 0 열쇠 구멍 */(x,y,r,col,t)=>{pcirc(x,y-r*.2,r*.28,'#0a0c18',.8);RA(Math.round(x-r*.12),Math.round(y-r*.1),Math.max(2,Math.round(r*.24)),Math.round(r*.5),'#0a0c18',.8);cRing(x,y,r,'#ffd27a',.8,1)},
  /* 1 거울 눈 */(x,y,r,col,t)=>{pcirc(x,y,r*.5,'#1a3a8a',.85);pcirc(x,y,r*.28,'#ffd27a',.9);pcirc(x,y,r*.12,'#0a0c18',1);cRing(x,y,r*.75,'#ffffff',.5,1)},
  /* 2 물결 */(x,y,r,col,t)=>{for(let i=0;i<3;i++){const q=(t*1.2+i/3)%1;cRing(x,y,r*q,'#e8fbff',(1-q)*.8,1)}},
  /* 3 나이트 말 머리 */(x,y,r,col,t)=>{const s=r/9,P2=(dx,dy,w,h,c)=>RA(Math.round(x+dx*s),Math.round(y+dy*s),Math.max(1,Math.round(w*s)),Math.max(1,Math.round(h*s)),c,.9);P2(-3,-6,6,12,'#0a0c18');P2(-6,-4,4,4,'#0a0c18');P2(-5,4,10,3,'#0a0c18');P2(-2,-5,4,10,col==='#16161e'?'#8492b0':'#f2f6ff');P2(-5,-3,3,2,col==='#16161e'?'#8492b0':'#f2f6ff')},
  /* 4 둘레 촛불 */(x,y,r,col,t)=>{for(let i=0;i<8;i++){const a=i*TAU/8,px=x+Math.cos(a)*r,py=y+Math.sin(a)*r;RA(Math.round(px-1),Math.round(py-1),2,4,'#e8fff8',.9);pcirc(px,py-2+Math.sin(t*20+i)*.5,1.5,'#5af0e0',1)}},
  /* 5 무대 조명 별 */(x,y,r,col,t)=>{for(let i=0;i<4;i++){const a=i*Math.PI/2+t;LN(x,y,x+Math.cos(a)*r*.7,y+Math.sin(a)*r*.7,2,(px,py)=>cPx(px,py,1,'#fff0f8',.8))}pcirc(x,y,2,'#ffffff',1)},
  /* 6 둘레 전구 */(x,y,r,col,t)=>{for(let i=0;i<10;i++){const a=i*TAU/10+t*.6,on2=(i+Math.floor(t*8))%2;pcirc(x+Math.cos(a)*r,y+Math.sin(a)*r,1.8,on2?'#fff0c0':col,1)}},
  /* 7 그림자 손 */(x,y,r,col,t)=>{const s=r/10;for(let i=-2;i<=2;i++)RA(Math.round(x+i*2.4*s-s),Math.round(y-6*s+Math.abs(i)*s),Math.max(1,Math.round(1.6*s)),Math.round(6*s),'#0a0814',.8);pcirc(x,y+2*s,4.5*s,'#0a0814',.8)},
  /* 8 육각 비늘 */(x,y,r,col,t)=>{for(let i=0;i<6;i++){const a=i*TAU/6,b2=(i+1)*TAU/6;LN(x+Math.cos(a)*r*.8,y+Math.sin(a)*r*.8,x+Math.cos(b2)*r*.8,y+Math.sin(b2)*r*.8,1,(px,py)=>cPx(px,py,1,'#ffffff',.6))}},
  /* 9 시계 바늘 */(x,y,r,col,t)=>{for(let i=0;i<12;i++){const a=i*TAU/12;cPx(x+Math.cos(a)*r*.85,y+Math.sin(a)*r*.85,1,'#ffffff',.8)}const h1=-t*2,h2=-t*.3;LN(x,y,x+Math.cos(h1)*r*.7,y+Math.sin(h1)*r*.7,1,(px,py)=>cPx(px,py,1,'#ffffff',.9));LN(x,y,x+Math.cos(h2)*r*.45,y+Math.sin(h2)*r*.45,1,(px,py)=>cPx(px,py,2,'#e0ccff',.9))}];
 {const base=NPK.circ.draw;NPK.circ.draw=function(o,b,now){const r=base.apply(this,arguments);if(o.s7k==null||!CIRC[o.s7k])return r;try{const [x,y,rr]=o.cf?o.cf(b):[o.x,o.y,o.r];CIRC[o.s7k](x,y,rr,o.col||L7[o.s7k].c,now/1000);ctx.globalAlpha=1}catch(e){}return r}}
 /* 예고 동안: 시전 부위 → 공격 자리로 이어지는 줄 (한 화면에 너무 많지 않게) */
 let lkF=0,lkN=0;const target=(o)=>{if(o.k==='orb')return o.pos(o.t1);if(o.k==='circ'){const c=o.cf?o.cf(o.t1):[o.x,o.y];return [c[0],c[1]]}if(o.k==='rect'){const r=o.rf?o.rf(o.t1):[o.x,o.y,o.w,o.h];return [r[0]+r[2]/2,r[1]+r[3]/2]}return o.b(o.t1)};
 function link(o,b,now){if(o.s7k==null||!o.s7src||o.noTel)return;if(now!==lkF){lkF=now;lkN=0}if(++lkN>9)return;const p=clamp((b-o.t0)/Math.max(.01,o.t1-o.t0),0,1);if(p>=1)return;const [sx,sy]=o.s7src,[tx,ty]=target(o),k=o.s7k,col=L7[k].c,a=.45*(1-p*.6),t=now/1000;
  if(k===7){LN(sx,sy,tx,ty,3,(x,y)=>cPx(x,y,1,'#c4d0e4',a));return}/* 인형사: 실 */
  if(k===2){LN(sx,sy,tx,ty,6,(x,y,i,q)=>cPx(x,y-Math.sin(q*Math.PI)*30,2,'#bff4ff',a*(Math.sin(q*Math.PI)*.5+.5)));return}/* 분수: 물줄기 포물선 */
  const L=Math.hypot(tx-sx,ty-sy),n=Math.max(2,Math.floor(L/9));for(let i=0;i<n;i++){const q=((i/n)+t*.9)%1;if(q>p+.15)continue;cPx(sx+(tx-sx)*q,sy+(ty-sy)*q,k===3?2:1,k===3?(i%2?'#16161e':'#f2f6ff'):i%3?col:'#ffffff',a)}}
 for(const k of ['orb','seg','rect','circ']){const base=NPK[k].tel;NPK[k].tel=function(o,b,now){const r=base.apply(this,arguments);try{if(o.s7k!=null)link(o,b,now);ctx.globalAlpha=1}catch(e){}return r}}
}catch(e){console.error('v52 ch7 character attacks',e)}})();
