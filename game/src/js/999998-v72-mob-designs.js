/* ================= v72 탑 잡몹 12종 — 보스와 같은 그리기 엔진(MON) · 방향 · 걷기 · 공격 동작 =================
   보스처럼 외곽선 · 위쪽 빛과 아래 그늘 · 질감 · 테두리 빛 · 빛 번짐 · 입자.
   열쇠 'm_<종류>'. A.o 값:
     pal  구역 색 {a 주색, b 어두운 색, c 강조}     elite 정예
     view 'front'(아래로 걸음 · 서 있음) | 'side'(옆, 오른쪽을 봄 → 왼쪽은 뒤집어 그림) | 'back'(위로 걸음)
     walk 걸음 단계 0~1(걷지 않으면 null)   atk 공격 준비 0/1   hit 공격하는 순간 0/1
   좌표: 발밑이 (0,0), 위쪽이 음수. 999997(TW71)이 자세별로 미리 그려 두고 꺼내 쓴다. */
(()=>{try{
 if(typeof MON==='undefined')return;
 const mix=(a,b,k)=>{try{return monMix(a,b,k)}catch(e){return a}};
 const TAU2=Math.PI*2,R=MON.reg;
 function pal(A){const p=A.o.pal||{a:'#9fb3c8',b:'#3c4a5c',c:'#5affd8'};return {a:p.a,b:p.b,c:p.c,lt:mix(p.a,'#ffffff',.38),dk:mix(p.a,'#000000',.42),dd:mix(p.b,'#000000',.35),cl:mix(p.c,'#ffffff',.45)}}
 function st(A){const o=A.o,w=o.walk,s=w==null?0:Math.sin(w*TAU2),c=w==null?0:Math.cos(w*TAU2);return {v:o.view||'front',w,s,c,walking:w!=null,k:o.atk?1:0,h:o.hit?1:0,bob:w!=null?-Math.abs(s)*.8:Math.sin(A.t*2.4)*.35}}
 function fin(A,bb,p){A.bbox=bb;A.aura=A.o.elite?'#ffd166':p.c;if(A.o.elite)A.rim='rgba(255,226,140,.75)'}
 /* 다리 두 개: 앞·뒤 모습은 번갈아 들리고, 옆모습은 앞뒤로 벌어짐 */
 function legs(A,S,x0,x1,w,h,col,dk,shoe){if(S.v==='side'){for(const [o,sg] of [[-1,1],[1,-1]]){const sw=S.s*1.8*sg,lift=Math.max(0,S.s*sg)*1;const x=(x0+x1)/2+sw-w/2;A.R(x,-h-lift,w,h,o<0?dk:col);A.R(x-.2,-1-lift,w+.8,1,shoe||'#0a0b10')}}
  else for(const [x,sg] of [[x0,1],[x1,-1]]){const lift=Math.max(0,S.s*sg)*1.2;A.R(x,-h-lift,w,h-lift*.2,col);A.R(x-.3,-1-lift,w+.6,1,shoe||'#0a0b10')}}

 /* ---------- 슬라임 ---------- */
 R.m_slime=A=>{const p=pal(A),S=st(A),t=A.t,sq=(S.walking?Math.abs(S.s)*.12:Math.sin(t*5)*.06)+S.k*.22-S.h*.25,ry=7.6*(1-sq),rx=10*(1+sq*.6),cy=-ry-(S.walking?Math.abs(S.s)*1.5:0);
  A.E(0,cy+.4,rx,ry,p.dk);A.E(0,cy,rx-.9,ry-.8,p.a);A.E(-1.5,cy-ry*.35,rx*.55,ry*.4,p.lt,.55);A.E(-4.5,cy-ry*.55,2.2,1.3,'#ffffff',.75);A.C(-3,cy-ry*.75,.6,'#ffffff');
  A.C(0,cy+3.4,2,p.b,.8);A.C(0,cy+3.4,1.4,p.c,.85);A.glow(0,cy+3.4,5,p.c,.7);
  if(S.v!=='back'){const ex=S.v==='side'?3:0;A.eye(-3.4+ex,cy-1.5,1.9,p.c);if(S.v!=='side'||true)A.eye(3.4+ex,cy-1.5,S.v==='side'?1.5:1.9,p.c);
   A.brow(-3.4+ex,cy-3.6,2.6,S.k?1:0,p.dd);A.brow(3.4+ex,cy-3.6,2.6,S.k?-1:0,p.dd);A.R(-1.8+ex,cy+1.2,3.6,S.h?1.8:.9,'#0a0c12');A.R(-1+ex,cy+2.1,2,.5,'#ff8aa0',.8)}
  else{A.E(2,cy-2,3,1.4,p.lt,.4);A.E(-3,cy+1,2,1,p.lt,.3)}
  A.E(-8.5,-1,2,1.1,p.a);A.E(8,-.8,1.6,1,p.a);fin(A,[-11,-17,11,0],p)};

 /* ---------- 박쥐 ---------- */
 R.m_bat=A=>{const p=pal(A),S=st(A),t=A.t,sp=S.walking?16:11,fl=S.k?-1:S.h?.9:Math.sin(t*sp),by=-13+Math.sin(t*7)*.6+(S.h?3:0),back=S.v==='back',side=S.v==='side';
  for(const s of [-1,1]){const far=side&&s<0,ww=far?.6:1,tip=[s*13*ww,by-5+fl*5],mid=[s*8*ww,by+3+fl*2];const col=far?p.dd:p.b;
   A.P([[s*3,by-2],tip,[s*11.5*ww,by+2+fl*3],mid,[s*5*ww,by+3.5],[s*3,by+2]],p.dd);
   A.P([[s*3.4,by-1.4],[tip[0]-s*1.2,tip[1]+1],[s*10.6*ww,by+1.6+fl*3],[mid[0],mid[1]-.8],[s*5*ww,by+2.6],[s*3.4,by+1.4]],col);
   A.L(s*3.4,by-1,tip[0],tip[1],p.dk,.6);A.L(s*4,by,s*11*ww,by+1.8+fl*3,p.dk,.45)}
  A.orb(side?1:0,by,4.6,p.a,p.dk,p.lt);
  A.spike(-2.6+(side?1:0),by-3.4,-1.95,4.2,2.2,p.a,p.lt);A.spike(2.6+(side?1:0),by-3.4,-1.2,4.2,2.2,p.a,p.lt);
  if(!back){const ex=side?2:0;A.slit(-1.7+ex,by-.5,1.8,1.4,p.c,.3);if(!side)A.slit(1.7,by-.5,1.8,1.4,p.c,-.3);A.R(-1.4+ex,by+2.2,.6,S.h?2.2:1.4,'#ffffff');A.R(.8+ex,by+2.2,.6,S.h?2.2:1.4,'#ffffff');if(S.h)A.R(-.6+ex,by+2,1.4,1.6,'#3a0610')}
  else{A.R(-2,by-1,4,3,p.dk,.6);A.L(0,by-3,0,by+3,p.lt,.4)}
  fin(A,[-13,by-9,13,by+5],p)};

 /* ---------- 궁수: 걸을 때 팔다리 · 조준하면 옆으로 서서 시위를 당기고 · 쏘면 놓음 ---------- */
 R.m_archer=A=>{const p=pal(A),S=st(A),b=S.bob;let v=S.v;if(S.k||S.h)v='side';
  const cloak=p.b,hood=p.a,wood=mix(p.b,'#7a5a3a',.5);
  legs(A,Object.assign({},S,{v}),-3,1,2.2,5,p.dd,p.dk);
  if(v==='back'){A.plate([[-5.5,-5],[5.5,-5],[4,-14+b],[-4,-14+b]],cloak,p.dd,p.lt);A.R(-1.6,-16+b,3.2,9,p.dk);for(let i=0;i<4;i++)A.R(-1.2+i*.8,-19+b+i*.2,.45,4,i%2?p.cl:'#e8e8f0');A.R(-1.6,-12+b,3.2,.8,p.c,.6);
   A.P([[-5,-14+b],[5,-14+b],[3.4,-21+b],[0,-23.5+b],[-3.4,-21+b]],hood);A.L(0,-22+b,0,-15+b,p.dk,.6);
   const sw=S.s*1.5;A.R(-6.6,-13+b+sw,1.8,5,cloak);A.R(4.8,-13+b-sw,1.8,5,cloak);fin(A,[-8,-24,8,0],p);return}
  if(v==='side'){/* 오른쪽을 봄 */A.plate([[-4,-5],[4,-5],[3,-14+b],[-3,-14+b]],cloak,p.dd,p.lt);A.R(-4.6,-15+b,2,8,p.dk);for(let i=0;i<3;i++)A.R(-4.4+i*.6,-17.6+b+i*.3,.4,3,p.cl);
   A.P([[-3.6,-14+b],[3.8,-14+b],[3.6,-20+b],[0,-23.5+b],[-3.4,-20+b]],hood);A.P([[.6,-15+b],[3.8,-15+b],[3.4,-19.6+b],[.8,-19.6+b]],'#07080c');A.slit(2.4,-17.5+b,1.6,1,p.c);
   const pull=S.k?1:0,rel=S.h?1:0,bx=7.5-rel*.6,top=-20+b,bot=-6+b,mid=-13+b;
   for(let i=0;i<10;i++){const a=-1.25+i*.278;A.R(bx-3.8+Math.cos(a)*3.8,mid+Math.sin(a)*7.4,1,1,wood)}
   const hx=pull?1:bx-3.3+rel*.4;A.L(bx-.6,top,hx,mid,'#e8e8f0',.3);A.L(bx-.6,bot,hx,mid,'#e8e8f0',.3);
   A.L(.5,-12+b,bx-3.6,mid,cloak,1.4);A.C(bx-3.6,mid,.8,p.lt);A.L(-.5,-12+b,hx,mid,cloak,1.4);A.C(hx,mid,.8,p.lt);
   if(pull){A.L(hx,mid,bx+3,mid,p.cl,.5);A.spike(bx+3,mid,0,2.2,1.6,p.c,p.cl);A.glow(bx+1,mid,6,p.c,.9)}
   if(rel){A.L(bx+1,mid,bx+12,mid,p.c,.5);A.glow(bx+5,mid,7,p.c,1);for(let i=0;i<4;i++)A.spark(bx+2+i*2.5,mid+(i%2?-1:1)*.8,1,p.cl,1-i*.2)}
   fin(A,[-6,-24,12,0],p);return}
  /* 앞모습 */const sw=S.s*1.6;
  A.plate([[-5.5,-5],[5.5,-5],[4,-14+b],[-4,-14+b]],cloak,p.dd,p.lt);A.R(-.4,-13.5+b,.8,8.5,p.dk,.6);A.R(-5,-7,10,1.2,p.c,.55);
  A.R(4,-15+b,2.4,8,p.dk);for(let i=0;i<3;i++)A.R(4.3+i*.7,-17.5+b+i*.3,.4,3,p.cl);
  A.R(-6.8,-13+b+sw,1.8,5.5,cloak);A.C(-5.9,-7.2+b+sw,.8,p.lt);A.R(5,-13+b-sw,1.8,5.5,cloak);A.C(5.9,-7.2+b-sw,.8,p.lt);
  for(let i=0;i<9;i++){const a=-1.3+i*.325;A.R(-7.4-Math.cos(a)*1.4,-11+Math.sin(a)*6.8+b+sw*.5,1,1,wood)}A.L(-7.6,-17.6+b+sw*.5,-7.6,-4.4+b+sw*.5,'#e8e8f0',.3);
  A.P([[-5,-14+b],[5,-14+b],[3.4,-21+b],[0,-23.5+b],[-3.4,-21+b]],hood);A.P([[-3.8,-15+b],[3.8,-15+b],[2.6,-20+b],[-2.6,-20+b]],'#07080c');
  A.slit(-1.4,-17.5+b,1.6,1,p.c);A.slit(1.4,-17.5+b,1.6,1,p.c);fin(A,[-9,-24,8,0],p)};

 /* ---------- 돌진수(멧돼지): 옆이 기본 · 앞은 엄니 얼굴 · 뒤는 엉덩이와 꼬리 ---------- */
 R.m_boar=A=>{const p=pal(A),S=st(A),t=A.t,k=S.k,h=S.h,v=(k||h)?'side':S.v,g=S.walking||h?Math.sin((S.w==null?t*3:S.w)*TAU2)*(h?1.6:1):0,hd=k*2.2-h*.6;
  if(v==='front'){A.R(-6,-5,2.4,5,p.dd);A.R(3.6,-5,2.4,5,p.dd);A.R(-3,-4.4+Math.max(0,g),2.2,4.4,p.dk);A.R(.8,-4.4+Math.max(0,-g),2.2,4.4,p.dk);
   A.E(0,-9,8.5,5.6,p.dk);A.E(0,-9.5,7.8,5,p.a);for(let i=0;i<5;i++)A.spike(-4+i*2,-14,-1.57+(i-2)*.3,3,1.6,p.b,p.c);
   A.E(0,-7,4.6,3.6,p.dk);A.E(0,-7.4,4,3,p.a);A.E(0,-5.4,2.4,1.6,mix(p.a,'#ff9aa0',.35));A.R(-1.2,-5.6,.7,.8,'#0a0c12');A.R(.5,-5.6,.7,.8,'#0a0c12');
   A.spike(-2.6,-4.6,-2.2,3.4,1.3,'#f4f0e0',p.cl);A.spike(2.6,-4.6,-.94,3.4,1.3,'#f4f0e0',p.cl);A.slit(-2.4,-9,1.6,1,p.c,.4);A.slit(2.4,-9,1.6,1,p.c,-.4);fin(A,[-9,-17,9,0],p);return}
  if(v==='back'){for(const [x,o] of [[-5,g],[3,-g]]){A.R(x,-5+Math.max(0,o),2.4,5-Math.max(0,o),p.dd)}A.E(0,-8.5,8.5,6,p.dk);A.E(0,-9,7.8,5.4,p.a);A.E(0,-11,5,2,p.lt,.4);
   for(let i=0;i<5;i++)A.spike(-4+i*2,-14.4,-1.57+(i-2)*.25,2.6,1.5,p.b,p.c);A.L(0,-7,1.5,-4+Math.sin(t*8),p.dd,.7);A.C(1.6,-3.6+Math.sin(t*8),.7,p.b);fin(A,[-9,-17,9,0],p);return}
  for(const [x,o] of [[-7,g],[-3,-g],[3,g],[7,-g]]){const st2=h?o*2:o;A.L(x,-5,x+st2*1.2,-.6,p.dd,2.2);A.R(x+st2*1.2-1.4,-1,2.8,1,'#0a0c12')}
  A.E(0,-8,10.5,5.8,p.dk);A.E(-.5,-8.6,9.6,5,p.a);A.E(-2,-11,7,2,p.lt,.5);for(let i=0;i<6;i++)A.spike(-7+i*2.6,-12.6+Math.abs(i-2.5)*.3,-1.75+i*.07-(h?.3:0),3+(i%2)*1.5,1.8,p.b,p.c);
  A.L(-10,-9,-12,-11+Math.sin(t*10),p.dd,.6);
  A.E(9,-7.5+hd,5,4.2,p.dk);A.E(8.6,-8+hd,4.4,3.6,p.a);A.E(12.4,-6.6+hd,2,1.8,mix(p.a,'#ff9aa0',.35));A.R(12.6,-7.2+hd,.6,.8,'#0a0c12');A.R(13.4,-6.6+hd,.6,.8,'#0a0c12');
  A.spike(11,-5+hd,-.5,4.2,1.6,'#f4f0e0',p.cl);A.spike(9,-5.4+hd,-.35,3,1.2,'#e8e0c8');A.slit(8.2,-9.6+hd,1.9,1.1,k||h?'#ff4d6d':p.c,.4);A.brow(8.4,-11+hd,3,1,p.dd);A.spike(6.6,-11.5+hd,-1.2,3,1.6,p.b);
  if(k){for(let i=0;i<3;i++){const q=(t*3+i/3)%1;A.spark(14+q*4,-6+hd-q*2,1.2*(1-q),'#e8f4ff',.6*(1-q))}A.glow(9,-8,8,'#ff4d6d',.8);A.R(-9,-1.2,4,.8,p.lt,.5)}
  if(h){for(let i=0;i<5;i++)A.L(-14-i*1.5,-12+i*2.2,-10-i*1.5,-12+i*2.2,p.cl,.4);A.glow(12,-7,9,'#ff4d6d',1)}
  fin(A,[-15,-17,16,0],p)};

 /* ---------- 톱니: 돌면서 굴러감 · 준비하면 가시가 뻗고 빨리 돎 ---------- */
 R.m_gear=A=>{const p=pal(A),S=st(A),t=A.t,a=t*(S.k?7:2.4)+(S.walking?S.w*TAU2:0),cy=-9,ex=S.v==='side'?2:0;
  A.gear(0,cy,8.2,12,a,p.b,p.dd,false);A.gear(0,cy,7,12,a,p.a,p.dk,false);A.ring(0,cy,5.8,1.2,p.dk);
  for(let i=0;i<6;i++){const q=a+i*TAU2/6;A.C(Math.cos(q)*6.6,cy+Math.sin(q)*6.6,.6,p.lt)}
  const sl=S.k?4:2.6;for(let i=0;i<4;i++){const q=-a*1.6+i*TAU2/4;A.spike(Math.cos(q)*8.4,cy+Math.sin(q)*8.4,q,sl,1.4,p.c,p.cl)}
  if(S.v!=='back'){A.C(ex,cy,4.4,'#07080c');A.ring(ex,cy,4.4,.6,p.c);A.glow(ex,cy,7+S.k*5,p.c,.8);A.eye(ex,cy,3,S.k?'#ff4d6d':p.c);A.brow(ex,cy-3.6,4,S.k?1:0,p.dd)}
  else{A.C(0,cy,3.4,p.dk);A.gear(0,cy,2.4,6,-a,p.b,p.dd);A.C(0,cy,.8,p.c)}
  if(S.k)A.glow(0,cy,12,p.c,.6);fin(A,[-12,-21,12,0],p)};

 /* ---------- 술사: 로브 자락이 흔들리고 · 지팡이를 들어 모으고 · 내밀며 쏨 ---------- */
 R.m_mage=A=>{const p=pal(A),S=st(A),t=A.t,v=S.v,fy=Math.sin(t*2.6)*1.2-1.5,sway=S.walking?S.s*1.2:Math.sin(t*2)*.4,ex=v==='side'?1.2:0;
  A.P([[-6.5+sway,0],[6.5+sway,0],[4,-12+fy],[-4,-12+fy]],p.dd);A.plate([[-6+sway,-.4],[6+sway,-.4],[3.6,-12+fy],[-3.6,-12+fy]],p.b,p.dd,p.lt);for(let i=0;i<4;i++)A.R(-5+i*3.2+sway,-1.6,1.6,1.2,p.c,.5);
  if(v!=='back')A.R(-.5,-11.5+fy,1,11,p.c,.45);else{A.R(-2,-11+fy,4,9,p.dk,.5);A.ring(0,-7+fy,1.8,.5,p.c,.7)}
  /* 지팡이 손 */let sx,sy;if(S.h){sx=9;sy=-12+fy}else if(S.k){sx=1;sy=-20+fy}else{sx=v==='side'?6.5:-8.5;sy=-12+fy+(S.walking?-S.s*1.2:0)}
  const hx=v==='side'?2.4:(S.k||S.h?3:-5.2);A.L(hx,-9+fy,sx,sy+2,p.b,1.6);A.C(sx,sy+2,.9,p.lt);
  A.L(sx,sy+(S.h?1:9),sx+(S.h?1.5:0),sy-1,mix(p.b,'#7a5a3a',.4),.8);A.ring(sx,sy-2.2,2.2,.6,p.lt);A.C(sx,sy-2.2,1.6+S.k*.8+S.h*.6,p.c);A.C(sx-.5,sy-2.8,.5,'#ffffff');A.glow(sx,sy-2.2,5+S.k*7+S.h*9,p.c,.9);
  if(S.k){for(let i=0;i<8;i++){const q=i/8*TAU2+t*5;A.spark(sx+Math.cos(q)*4.5,sy-2.2+Math.sin(q)*4.5,1,p.cl,.9)}}
  if(S.h){for(let i=0;i<5;i++)A.spark(sx+3+i*1.8,sy-2.2+(i%2?-1:1),1.2,p.cl,1-i*.15)}
  if(v!=='side'||true){const ox=v==='side'?-3:5;if(!(S.k||S.h)&&v!=='side'){A.E(ox,-8+fy,2.2,1.6,p.b);A.C(ox+.8,-7+fy,.9,p.lt)}}
  A.P([[-4.6,-11.6+fy],[4.6,-11.6+fy],[2.6,-18+fy],[1.5-ex,-24+fy],[-.5,-20+fy],[-3,-18+fy]],p.a);
  if(v!=='back'){A.P([[-3.4+ex,-12.5+fy],[3.4+ex,-12.5+fy],[2.2+ex,-17+fy],[-2.2+ex,-17+fy]],'#06070b');A.slit(-1.3+ex*1.6,-15+fy,1.6,1.1,p.c);if(v!=='side')A.slit(1.3,-15+fy,1.6,1.1,p.c)}
  else A.L(0,-12+fy,1,-22+fy,p.dk,.6);
  A.R(1-ex,-23.5+fy,1.2,1.2,p.c);A.rise(5,-7,7,-2,16,.5,p.c,.7,.3);fin(A,[-11,-26,12,0],p)};

 /* ---------- 폭탄: 짧은 발로 뒤뚱 · 심지 · 준비하면 빨갛게 부풀어 깜빡 ---------- */
 R.m_bomb=A=>{const p=pal(A),S=st(A),t=A.t,k=S.k,hot=k&&Math.floor(t*14)%2,base=hot?mix('#3a3a44','#ff4d4d',.6):mix(p.b,'#1a1c24',.45),sw=1+k*.12,cy=-8.5,wad=S.walking?S.s*.6:0,ex=S.v==='side'?2.4:0;
  for(const [x,sg] of [[-3.2,1],[1.6,-1]]){const lift=Math.max(0,S.s*sg)*1.2;A.R(x,-2.4-lift,1.8,2.4,'#1a1c24');A.R(x-.4,-1-lift,2.6,1,'#0a0b10')}
  A.push(sw,0,cy);A.orb(wad,cy,7.2,base,'#0a0b10',mix(base,'#ffffff',.35));A.ring(wad,cy,7.2,.7,'#05060a');A.R(-7+wad,cy-.6,14,1.4,p.dk);A.R(-7+wad,cy-.6,14,.4,p.lt,.6);for(const x of [-5,-1.5,2,5.4])A.C(x+wad,cy+.1,.45,p.lt);A.pop();
  A.box(-2+wad,cy-9.4,4,2.6,p.dk,p.dd,p.lt);const fx=1.5+Math.sin(t*3)*.4+wad;A.L(wad,cy-9.4,fx,cy-12.3,'#c8a060',.6);
  const fl=1+Math.sin(t*30)*.3+k*.8;A.C(fx+1.4,cy-13,1*fl,'#ffd166');A.C(fx+1.4,cy-13,.5*fl,'#ffffff');A.glow(fx+1.4,cy-13,3+fl*2,'#ff9a3a',1);
  for(let i=0;i<4;i++){const q=(t*2.4+i/4)%1;A.spark(fx+1.4+Math.sin(i*2.1+t*9)*q*3,cy-13.4-q*3,.8*(1-q),'#ffb35a',1-q)}
  if(S.v!=='back'){A.slit(-2.6+ex+wad,cy-1.6,2.2,1.6,k?'#ff4d6d':p.c,.4);if(S.v!=='side')A.slit(2.6+wad,cy-1.6,2.2,1.6,k?'#ff4d6d':p.c,-.4);A.brow(-2.6+ex+wad,cy-3.6,3,1,'#05060a');if(S.v!=='side')A.brow(2.6+wad,cy-3.6,3,-1,'#05060a');A.R(-2+ex+wad,cy+2.2,4,k?1.6:.8,'#05060a')}
  else{A.R(-.5+wad,cy-6,1,10,p.dk,.7);A.C(wad,cy+3,1.2,p.lt,.4)}
  if(k)A.glow(0,cy,12,'#ff4d4d',1);fin(A,[-9,-23,9,0],p)};

 /* ---------- 골렘: 쿵쿵 걷기 · 두 주먹을 들어 올렸다가 · 땅을 내려침 ---------- */
 R.m_golem=A=>{const p=pal(A),S=st(A),t=A.t,v=S.v,stone=mix(p.a,'#6a6a70',.45),sd=mix(stone,'#000',.4),sl=mix(stone,'#fff',.3),moss=mix(p.c,'#3a8a3a',.6),b=S.walking?-Math.abs(S.s)*1.2:S.bob*.6,side=v==='side';
  if(side){for(const [o,sg] of [[-1,1],[1,-1]]){const sw=S.s*2*sg,lift=Math.max(0,S.s*sg)*1.4;A.box(-2.2+sw,-6-lift,4.4,6,o<0?sd:stone,'#0a0b10',sl)}}
  else{for(const [x,sg] of [[-7,1],[2.6,-1]]){const lift=Math.max(0,S.s*sg)*1.6;A.box(x,-6-lift,4.4,6,sd,'#0a0b10',stone)}}
  const tw=side?.7:1;A.plate([[-9*tw,-6+b],[9*tw,-6+b],[10*tw,-15+b],[5*tw,-19+b],[-5*tw,-19+b],[-10*tw,-15+b]],stone,sd,sl);
  if(v!=='back'){A.L(-4*tw,-17+b,-1,-12+b,p.c,.6);A.L(-1,-12+b,-3*tw,-8+b,p.c,.6);A.L(4*tw,-16+b,2,-10+b,p.c,.5);A.glow(-1.5,-12,6,p.c,.7);A.C(side?2:0,-12+b,1.8,'#07080c');A.C(side?2:0,-12+b,1.2,p.c);A.glow(0,-12,4,p.c,1)}
  else{A.L(-6,-16+b,6,-9+b,sd,.8);A.L(5,-17+b,-4,-8+b,sd,.6);A.E(0,-15+b,5,2,moss,.7)}
  A.E(-6*tw,-17.6+b,2.6,1,moss,.8);A.E(5.6*tw,-18+b,2,.8,moss,.8);
  A.box(-3.4+(side?1.4:0),-23.5+b,6.8,5,stone,sd,sl);if(v!=='back'){A.R(-2.6+(side?2.4:0),-21.6+b,side?3.6:5.2,1.4,'#07080c');A.slit(-1.3+(side?3:0),-21+b,1.6,1,p.c);if(!side)A.slit(1.3,-21+b,1.6,1,p.c)}
  /* 팔 */const up=S.k,down=S.h;for(const s of [-1,1]){if(side&&s<0&&!(up||down))continue;let ax=s*11.5*tw,ay=-13+b+(S.walking?-S.s*s*1.4:0);
   if(up){ax=s*6;ay=-27+b}if(down){ax=side?9+s*2:s*7;ay=-3}
   A.orb(ax,ay,3.4,stone,sd,sl);A.orb(ax+s*.5,ay+(up?-3:5),3.9,stone,sd,sl);if(up||down)A.glow(ax,ay,7,p.c,.9)}
  if(down){for(let i=0;i<6;i++){const q=i/5;A.spark(-12+q*24,-1-Math.sin(q*Math.PI)*3,1.4,sl,.9)}A.R(-12,-.8,24,.8,p.c,.5)}
  fin(A,[-15,-31,15,0],p)};

 /* ---------- 도깨비불 ---------- */
 R.m_wisp=A=>{const p=pal(A),S=st(A),t=A.t,k=S.k,h=S.h,cy=-13+Math.sin(t*3)*1.2,w=Math.sin(t*9)*.9+(S.walking?S.s*1.5:0),sc=1+k*.18+h*.3,ex=S.v==='side'?1.6:0,lean=S.walking&&S.v==='side'?-1.5:0;
  A.glow(0,cy,14+k*6+h*10,p.c,1);A.push(sc,0,cy+4);
  A.P([[-7,cy+4],[7,cy+4],[6+w,cy-3],[3+lean,cy-9],[1.5-w+lean*1.5,cy-13],[0+lean,cy-8],[-2+lean,cy-12+w],[-4,cy-6],[-6.5,cy-3+w]],p.b);
  A.P([[-5.5,cy+3],[5.5,cy+3],[4.6+w,cy-2.5],[2+lean,cy-7.5],[.6-w+lean,cy-10.5],[-1+lean,cy-6.5],[-2.6,cy-9],[-4.6,cy-3]],p.c);
  A.P([[-3.5,cy+2.5],[3.5,cy+2.5],[2.6,cy-2],[.6,cy-5.6-w],[-1.6,cy-2]],p.cl);A.E(0,cy+1,2.6,2,'#ffffff',.85);A.pop();
  if(S.v!=='back'){A.eye(-2.2+ex,cy-.5,1.5,p.b);if(S.v!=='side')A.eye(2.2,cy-.5,1.5,p.b);A.R(-1+ex,cy+2,2,h?1.4:.6,p.dd)}
  A.rise(8,-6,6,cy-6,12,.8,p.cl,.8,.2);for(let i=0;i<3;i++){const q=t*1.1+i*TAU2/3;A.C(Math.cos(q)*9,cy+Math.sin(q)*4,.9,p.c,.8)}
  if(h){for(let i=0;i<8;i++){const q=i/8*TAU2;A.spark(Math.cos(q)*10,cy+Math.sin(q)*7,1.3,p.cl,1)}}
  A.texA=.25;fin(A,[-10,cy-15,10,cy+6],p)};

 /* ---------- 드론: 프로펠러 · 렌즈 · 조준하면 렌즈가 빨갛게 · 쏘면 반동 ---------- */
 R.m_drone=A=>{const p=pal(A),S=st(A),t=A.t,k=S.k,h=S.h,cy=-13+Math.sin(t*4)*.8-(h?-1.2:0),steel=mix(p.a,'#8a96a8',.4),sd=mix(steel,'#000',.45),sl=mix(steel,'#fff',.35),v=S.v,tilt=S.walking&&v==='side'?1.2:0;
  for(const s of [-1,1]){if(v==='side'&&s<0){A.R(-6,cy-1.6,3,1.2,sd);continue}A.R(s>0?5:-9,cy-1+tilt*s*.3,4,1.4,sd);const rx=v==='side'?(s*7):s*10,ry=cy-3.5+tilt*s*.6,ra=t*40*s;A.C(rx,ry,.9,sl);for(let i=0;i<2;i++){const q=ra+i*Math.PI;A.L(rx-Math.cos(q)*4.6,ry-Math.sin(q)*.9,rx+Math.cos(q)*4.6,ry+Math.sin(q)*.9,sl,.5)}A.E(rx,ry,5,1.2,sl,.18)}
  const bw=v==='side'?.75:1;A.plate([[-6.5*bw,cy-4],[6.5*bw,cy-4],[7.5*bw,cy+1],[5*bw,cy+4.5],[-5*bw,cy+4.5],[-7.5*bw,cy+1]],steel,sd,sl);A.R(-6*bw,cy-1.6,12*bw,.8,p.dk);
  if(v==='back'){A.vent(-4,cy-1,8,4,p.c,true);A.L(0,cy-4,0,cy-8,sl,.4);A.C(0,cy-8.3,.7,p.c);fin(A,[-15,cy-9,15,cy+7],p);return}
  A.vent(-5*bw,cy+1.2,2.6,2,p.c,true);if(v!=='side')A.vent(2.4,cy+1.2,2.6,2,p.c,true);
  const lx=v==='side'?3.6:0,lc=k||h?'#ff4d6d':p.c;A.C(lx,cy,3.6,'#07080c');A.ring(lx,cy,3.6,.7,sl);A.C(lx,cy,2.2+k*.4,lc);A.C(lx-.7,cy-.7,.7,'#ffffff');A.glow(lx,cy,5+k*9+h*12,lc,1);
  if(k){A.ring(lx,cy,5+Math.sin(t*20),.4,'#ff4d6d',.8)}if(h){for(let i=0;i<5;i++)A.spark(lx+4+i*2,cy,1.2,'#ffd0d8',1-i*.18)}
  A.L(0,cy-4,1.5,cy-8,sl,.4);A.C(1.5,cy-8.3,.7,Math.floor(t*3)%2?'#ff4d6d':p.c);A.E(0,cy+5.6,3,1.3,p.c,.5);A.glow(0,cy+6,5,p.c,.7);A.spark(Math.sin(t*20)*1.5,cy+7.5,1,p.cl,.8);
  fin(A,[-15,cy-9,15,cy+7],p)};

 /* ---------- 거미: 다리를 번갈아 움직이며 기어감 · 앞다리를 들고 · 거미줄을 뱉음 ---------- */
 R.m_spider=A=>{const p=pal(A),S=st(A),t=A.t,k=S.k,h=S.h,cy=-6,v=S.v,ph0=S.walking?S.w*TAU2*2:t*2;
  for(let i=0;i<4;i++)for(const s of [-1,1]){const ph=ph0+i*1.3+(s>0?Math.PI:0),lift=(S.walking?Math.max(0,Math.sin(ph))*1.8:Math.max(0,Math.sin(ph))*.4)+((k||h)&&i===0?5:0),hx=s*(1.5+i*.6),hy=cy-.5+i*.6,kx=s*(6+i*1.4),ky=cy-4.5-i*.4-lift,fx=s*(9+i*1.2)+(S.walking?Math.cos(ph)*1.2:0),fy=-.2-lift*.4-((k||h)&&i===0?3:0);
   A.L(hx,hy,kx,ky,p.dd,1.1);A.L(kx,ky,fx,fy,p.dd,.9);A.C(kx,ky,.55,p.b)}
  const ab=v==='back'?0:-3.6,hdx=v==='back'?0:3.6;
  A.E(ab,cy-.6,6.4,4.8,p.dk);A.E(ab-.2,cy-1.1,5.8,4.2,p.b);A.P([[ab-1.8,cy-3.4],[ab+1.8,cy-3.4],[ab,cy-1.2]],p.c);A.P([[ab-1.6,cy-.6],[ab+1.6,cy-.6],[ab,cy+1.6]],p.c);A.glow(ab,cy-1,4,p.c,.6);A.E(ab-1.2,cy-3.4,2.2,1,p.lt,.4);
  if(v!=='back'){A.E(hdx,cy-.8,3.6,3.2,p.dk);A.E(hdx-.1,cy-1.1,3.1,2.7,p.a);
   for(const [x,y,r] of [[-.6,-2.4,.8],[1.2,-2.2,.8],[-1.4,-1.1,.5],[2,-1,.5],[.3,-.6,.5]]){A.C(hdx+x,cy+y,r,k?'#ff4d6d':p.c);A.C(hdx+x-.2,cy+y-.2,r*.4,'#ffffff')}A.glow(hdx,cy-1.8,4,p.c,.7);
   const op=k||h?.6:0;A.spike(hdx+.9,cy+1.4,1.2+op,2.2,1,'#f0e8e0');A.spike(hdx+2.4,cy+1.2,1.6-op,2,1,'#f0e8e0');if(h){A.glow(hdx+3,cy+2,6,'#ffffff',.8);for(let i=0;i<4;i++)A.spark(hdx+4+i*2,cy+1.5,1,'#e8e8f0',1-i*.2)}}
  fin(A,[-14,-16,14,0],p)};

 /* ---------- 방패병: 걸을 때 팔다리 · 검을 머리 위로 들었다가 · 앞으로 내려벰 ---------- */
 R.m_knight=A=>{const p=pal(A),S=st(A),b=S.bob,steel=mix(p.a,'#a8b0c0',.35),sd=mix(steel,'#000',.45),sl=mix(steel,'#fff',.4);let v=S.v;if(S.k||S.h)v='side';
  legs(A,Object.assign({},S,{v}),-3.4,.8,2.6,6,steel,sd);
  const helm=(x0)=>{A.P([[-4+x0,-14+b],[4+x0,-14+b],[4.4+x0,-19+b],[2+x0,-21.6+b],[-2+x0,-21.6+b],[-4.4+x0,-19+b]],steel);A.L(x0,-21.6+b,x0,-24+b,p.c,.8);A.L(x0,-24+b,x0-2,-22.6+b,p.c,.6)};
  const sword=(hx,hy,ang,glow)=>{A.R(hx-1.2,hy-.5,2.4,1,mix(p.b,'#c8a060',.4));A.spike(hx,hy,ang,9,1.8,'#e8eef6',p.cl);if(glow)A.glow(hx+Math.cos(ang)*6,hy+Math.sin(ang)*6,6,p.c,.9)};
  const shield=(cx,cy,sc)=>{A.plate([[cx-3.5*sc,cy-6],[cx+3.5*sc,cy-6],[cx+3.9*sc,cy+5],[cx,cy+8.5],[cx-3.9*sc,cy+5]],p.b,p.dd,p.lt);A.ring(cx,cy,2.6*sc,.7,p.c);A.C(cx,cy,1*sc,p.cl);A.glow(cx,cy,4,p.c,.6)};
  if(v==='back'){A.plate([[-5,-6+b],[5,-6+b],[5.5,-14+b],[-5.5,-14+b]],steel,sd,sl);A.P([[-5,-14+b],[5,-14+b],[6,-3+b],[-6,-3+b]],mix(p.c,p.b,.5));A.R(-.3,-13+b,.6,9,p.dk,.6);helm(0);shield(6.5,-10+b,.7);A.R(-7.5,-14+b,1.6,7,sd);fin(A,[-9,-25,10,0],p);return}
  if(v==='side'){A.plate([[-4,-6+b],[4,-6+b],[4.4,-14+b],[-4.4,-14+b]],steel,sd,sl);A.R(-4,-9+b,8,1.2,p.b);helm(.6);A.R(.8,-18.2+b,3.8,1.6,'#07080c');A.slit(2.8,-17.4+b,1.6,.9,p.c);
   if(S.k){A.L(-1,-12+b,-2,-20+b,sd,1.6);sword(-2,-20+b,-2.3,true);A.glow(-4,-26,7,p.c,.8)}
   else if(S.h){A.L(1,-12+b,7,-10+b,sd,1.6);sword(7,-10+b,.35,true);for(let i=0;i<7;i++){const a=-1.6+i*.3;A.R(3+Math.cos(a)*10,-12+Math.sin(a)*10,1,1,p.cl,1-i*.1)}A.glow(10,-8,9,'#ffffff',.7)}
   else{const sw=S.s*1.5;A.L(-1,-12+b,-2-sw,-6+b,sd,1.4);sword(-2-sw,-6+b,1.9,false)}
   shield(4.8,-10+b,.8);fin(A,[-10,-30,15,0],p);return}
  A.plate([[-5,-6+b],[5,-6+b],[5.5,-14+b],[-5.5,-14+b]],steel,sd,sl);A.R(-5,-9+b,10,1.2,p.b);A.C(0,-11+b,1.2,p.c);A.glow(0,-11,3,p.c,.6);
  helm(0);A.R(-3.4,-18.2+b,6.8,1.6,'#07080c');A.slit(-1.4,-17.4+b,1.6,.9,p.c);A.slit(1.4,-17.4+b,1.6,.9,p.c);A.E(-1.5,-20.4+b,1.4,.6,'#ffffff',.4);
  const sw=S.s*1.6;A.L(5.6,-12+b,7.6,-7+b-sw,sd,1.6);sword(7.6,-7+b-sw,1.3-sw*.05,false);
  shield(-7.5,-10+b+sw*.3,1);fin(A,[-12,-25,12,0],p)};
 /* ---------- v73 정예 12종: 종류마다 다른 꾸밈 (기본 그림 위에 덧그림) ---------- */
 const GOLD='#ffd166',GD='#a8761a',GL='#fff2b8';
 const crown=(A,x,y,w)=>{A.R(x-w/2,y,w,1.6,GD);A.R(x-w/2,y,w,.6,GL);for(let i=0;i<3;i++){const cx=x-w/2+.6+i*(w-1.2)/2;A.P([[cx-.9,y],[cx+.9,y],[cx,y-2.4]],GOLD)}A.C(x,y+.8,.6,'#ff4d6d');A.glow(x,y,4,GOLD,.6)};
 const EL={
  slime:(A,p,S)=>{const cy=-8;crown(A,0,cy-8.4,7);for(let i=0;i<3;i++)A.E(-6+i*6,-2.6,1.4,.9,GOLD,.9);A.C(0,cy+3.4,2.4,GOLD,.5);A.ring(0,cy,10.4,.6,GOLD,.6)},
  bat:(A,p,S)=>{const by=-13;A.P([[-4,by+2],[4,by+2],[3,by+6],[0,by+8],[-3,by+6]],'#5a0a1a');A.L(-3.6,by+2,3.6,by+2,GOLD,.5);
   A.spike(-2.6,by-3.4,-2.1,6,2,'#3a0a14',GOLD);A.spike(2.6,by-3.4,-1.05,6,2,'#3a0a14',GOLD);if(S.v!=='back'){A.glow(-1.7,by-.5,4,'#ff2d55',1);A.glow(1.7,by-.5,4,'#ff2d55',1)}
   for(const s of [-1,1])A.spike(s*12,by-5,-1.57+s*.6,2.4,1,GL)},
  archer:(A,p,S)=>{const b=S.bob;A.R(-4.4,-19.2+b,8.8,1,GOLD);A.C(0,-19+b,.7,'#ff4d6d');A.P([[-5.5,-14+b],[5.5,-14+b],[7,-1],[-7,-1]],'#5a1a2a',.85);A.L(-6.8,-1.4,6.8,-1.4,GOLD,.5);
   for(let i=0;i<3;i++)A.R(S.v==='side'?-4.6:4.3,-19.5+b+i*.3,.6,1.6,'#ff6a3a');A.glow(0,-17,5,GOLD,.5)},
  boar:(A,p,S)=>{if(S.v==='front'){A.box(-6,-15,12,3,'#5a6270','#20242c','#c8d0dc');A.R(-6,-13.4,12,.6,GOLD);for(const x of [-4,0,4])A.C(x,-13.5,.5,GOLD);return}
   const hd=(S.k?2.2:0);A.box(5.6,-12+hd,7,3,'#5a6270','#20242c','#c8d0dc');A.R(5.6,-10.4+hd,7,.6,GOLD);A.ring(11,-5+hd,1.2,.5,GOLD);
   for(let i=0;i<3;i++)A.box(-7+i*4.4,-14,3.6,2.6,'#5a6270','#20242c','#c8d0dc');A.L(-8,-8,6,-8,'#ff4d6d',.5)},
  gear:(A,p,S)=>{const cy=-9,a=A.t*-3;A.ring(0,cy,10.2,1.1,GD);for(let i=0;i<8;i++){const q=a+i*Math.PI/4;A.spike(Math.cos(q)*10,cy+Math.sin(q)*10,q,3,1.4,GOLD,GL)}A.ring(0,cy,4.9,.5,GOLD)},
  mage:(A,p,S)=>{const fy=Math.sin(A.t*2.6)*1.2-1.5;A.C(1.5,-25.5+fy,1.4,GOLD);A.glow(1.5,-25.5,5,GOLD,.9);A.R(-6,-1.4,12,.8,GOLD);A.L(-3.6,-12+fy,-6.6,-.4,GOLD,.4);A.L(3.6,-12+fy,6.6,-.4,GOLD,.4);
   for(let i=0;i<3;i++){const q=A.t*1.6+i*TAU2/3;A.C(Math.cos(q)*10,-12+Math.sin(q)*4,1.3,p.c);A.C(Math.cos(q)*10,-12+Math.sin(q)*4,.6,'#ffffff');A.glow(Math.cos(q)*10,-12+Math.sin(q)*4,3,p.c,.8)}},
  bomb:(A,p,S)=>{const cy=-8.5;for(let i=0;i<8;i++){const q=i*Math.PI/4+.39;A.spike(Math.cos(q)*7,cy+Math.sin(q)*7,q,2.4,1.4,'#3a3a44',GOLD)}A.R(-7,cy+2.6,14,1,GOLD,.9);A.C(0,cy+5.2,.9,'#ff4d6d')},
  golem:(A,p,S)=>{const b=S.walking?-Math.abs(S.s)*1.2:S.bob*.6;for(const s of [-1,1]){A.spike(s*8,-19+b,-1.57+s*.5,5,2.4,p.c,'#ffffff');A.spike(s*10,-17+b,-1.57+s*.9,3.4,1.8,p.c,'#ffffff')}
   A.glow(0,-19,8,p.c,.8);A.L(-6,-10+b,6,-14+b,'#ff7a2a',.6);A.L(-4,-16+b,3,-7+b,'#ff7a2a',.5);crown(A,S.v==='side'?1.4:0,-25.2+b,6)},
  wisp:(A,p,S)=>{const cy=-13+Math.sin(A.t*3)*1.2;for(let i=0;i<4;i++){const q=A.t*2.2+i*TAU2/4,x=Math.cos(q)*11,y=cy+Math.sin(q)*5;A.C(x,y,1.6,'#f4f0e8');A.R(x-.8,y-.4,.6,.6,'#05060a');A.R(x+.2,y-.4,.6,.6,'#05060a');A.glow(x,y,4,p.c,.9)}
   A.P([[-3,cy-10],[-1.6,cy-14],[0,cy-11],[1.6,cy-15],[3,cy-10]],GOLD,.9)},
  drone:(A,p,S)=>{const cy=-13+Math.sin(A.t*4)*.8;for(const s of (S.v==='side'?[1]:[-1,1])){A.box(s*6.4-(s<0?3:0),cy+3,3,3,'#3a4250','#14181e','#8a96a8');A.R(s>0?s*6.4+3:s*6.4-6,cy+4,3,1,'#14181e');A.C(s>0?s*6.4+6:s*6.4-6,cy+4.5,.6,'#ff4d6d')}
   A.R(-6.6,cy-4.4,13.2,.8,GOLD);A.L(-2,cy-4,-3.5,cy-8,GOLD,.4);A.C(-3.5,cy-8.3,.7,GOLD)},
  spider:(A,p,S)=>{const cy=-6,ab=S.v==='back'?0:-3.6;A.P([[ab-2,cy-2.4],[ab+2,cy-2.4],[ab+.6,cy-.6],[ab+2,cy+1.2],[ab-2,cy+1.2],[ab-.6,cy-.6]],'#ff2d55');A.glow(ab,cy-.6,5,'#ff2d55',.9);
   for(let i=0;i<4;i++)for(const s of [-1,1])A.C(s*(9+i*1.2),-.4,.6,GOLD);if(S.v!=='back')crown(A,3.6,cy-5.6,4.4)},
  knight:(A,p,S)=>{const b=S.bob,x0=S.v==='side'||S.k||S.h?.6:0;A.P([[x0-1,-24+b],[x0+5,-27+b],[x0+7,-23+b],[x0+2,-22+b]],'#ff4d6d');A.P([[x0,-24+b],[x0+4.6,-26+b],[x0+6,-23.6+b],[x0+2,-22.6+b]],'#ff8aa0');
   A.R(-5.5,-14.2+b,11,.8,GOLD);A.R(-5,-6.6+b,10,.8,GOLD);if(S.v==='back')A.P([[-5,-14+b],[5,-14+b],[7,-1],[-7,-1]],'#7a1a2a',.9);A.glow(0,-20,5,GOLD,.5)}};
 for(const k of Object.keys(EL)){const base=R['m_'+k];if(!base)continue;R['m_'+k]=A=>{base(A);if(A.o.elite){try{EL[k](A,pal(A),st(A))}catch(e){}A.aura='#ffd166';A.rim='rgba(255,226,140,.8)'}}}
 window.MOB72=true;
}catch(e){console.error('v72 mobs',e)}})();
