/* ================= v81 새 잡몹 디자인 2종 (999998과 같은 MON 그리기 엔진) =================
   m_toad  독두꺼비: 울퉁불퉁한 등에 독 사마귀 · 볼주머니가 부풀었다가(준비) 독을 뱉음(공격 순간). 옆모습은 길쭉, 뒷모습은 등 무늬.
   m_wraith 기력 망령: 너덜너덜한 천 같은 몸 · 아래가 흩어지며 떠다님 · 가슴의 보랏빛 구멍이 기력을 빨아들임(준비 때 소용돌이).
   A.o: pal(구역 색) · elite · view · walk · atk · hit · tier — 999998 머리말과 같음. */
(()=>{try{
 if(typeof MON==='undefined')return;
 const R=MON.reg,TAU2=Math.PI*2,mix=(a,b,k)=>{try{return monMix(a,b,k)}catch(e){return a}};
 function pal(A,base,dark,acc){const p0=A.o.pal||{a:base,b:dark,c:acc},tr=A.o.tier||0;
  const a=tr>=3?mix(p0.a,'#4a1030',.22):tr>=2?mix(p0.a,'#000000',.12):p0.a,b=tr>=3?mix(p0.b,'#1a0010',.3):p0.b,c=tr>=3?mix(p0.c,'#ff3a5a',.55):tr>=2?mix(p0.c,'#ffb040',.35):p0.c;
  return {a,b,c,lt:mix(a,'#ffffff',.38),dk:mix(a,'#000000',.42),dd:mix(b,'#000000',.35),cl:mix(c,'#ffffff',.45),tr}}
 function st(A){const o=A.o,w=o.walk,s=w==null?0:Math.sin(w*TAU2);return {v:o.view||'front',w,s,walking:w!=null,k:o.atk?1:0,h:o.hit?1:0}}
 function fin(A,bb,p){A.bbox=bb;A.aura=A.o.elite?'#ffd166':p.c;if(A.o.elite)A.rim='rgba(255,226,140,.75)'}

 /* ---------- 독두꺼비 ---------- */
 R.m_toad=A=>{const p=pal(A,'#6ac85a','#1e4a2a','#b0ff5a'),S=st(A),t=A.t,side=S.v==='side',back=S.v==='back';
  const hop=S.walking?Math.abs(S.s)*3:0,puff=S.k*.9+Math.sin(t*3)*.08,spit=S.h,by=-6-hop,bw=side?11:10,bh=6.4+puff*.6;
  /* 뒷다리 · 앞다리 */
  if(side){A.E(-6,-2-hop*.4,4.5,2.6,p.dk);A.E(-7.5,-.8,3.6,1.1,p.b);A.R(5,-3-hop*.2,1.6,3,p.dk);A.R(4.6,-1,2.6,1,p.b)}
  else{for(const s of [-1,1]){A.E(s*8,-2-hop*.4,3.6,2.4,p.dk);A.E(s*9,-.8,2.8,1,p.b);A.R(s*4-.8,-3-hop*.2,1.6,3,p.dk)}}
  /* 몸통 */
  A.E(side?-1:0,by+.6,bw,bh,p.dd);A.E(side?-1:0,by,bw-.8,bh-.8,p.a);A.E(side?-2:0,by-bh*.45,bw*.62,bh*.38,p.lt,.5);
  /* 등 사마귀(독 혹) */
  for(let i=0;i<(back?7:5);i++){const ax=(back?-7:-6)+i*(back?2.3:3)+(side?-1:0),ay=by-bh*.55+Math.sin(i*1.9)*1.2;A.C(ax,ay,1.1,p.b);A.C(ax-.3,ay-.3,.5,p.c,.9);if(p.tr>=1)A.glow(ax,ay,2,p.c,.25)}
  if(back){A.E(0,by-1,5,2,p.b,.5);A.glow(0,by-1,7,p.c,.2)}
  else{
   /* 볼주머니: 준비 때 크게 부풀고 빛남 */
   const cx=side?bw-4:0,cy=by+bh*.45,cr=1.6+puff*2.6;A.E(cx,cy,cr*1.4,cr,mix(p.lt,p.c,.4));A.E(cx,cy-.4,cr*1.1,cr*.6,'#ffffff',.25);if(S.k)A.glow(cx,cy,cr*3,p.c,.6);
   /* 눈: 위로 튀어나온 두 눈 */
   const ey=by-bh+1.2;for(const s of (side?[1]:[-1,1])){const ex=side?bw-6:s*4.5;A.C(ex,ey,2.3,p.dk);A.C(ex,ey-.3,1.9,'#ffe36b');A.R(ex-1.4,ey-.6,2.8,.9,'#120a00');A.C(ex-.7,ey-1,.4,'#ffffff')}
   /* 입: 공격 순간 크게 벌리고 독 줄기 */
   const mx=side?bw-3:0,my=by+.5;if(spit){A.E(mx,my,side?2:4,1.8,'#2a0a12');A.E(mx,my,side?1.2:2.6,.9,'#ff6a8a');for(let i=0;i<4;i++)A.C(mx+(side?3+i*2:0),my-1-i*1.3+(side?0:-i),1.2-i*.15,p.c,.9);A.glow(mx+(side?4:0),my-2,6,p.c,.8)}
   else A.R(mx-(side?1:3.6),my,side?2.6:7.2,.7,p.dd)}
  /* 발밑 독 방울 */
  if(S.k||p.tr>=2){for(let i=0;i<3;i++){const ph=(t*1.4+i/3)%1;A.C(-6+i*6,-1-ph*6,.8,p.c,.7*(1-ph))}}
  fin(A,[-13,-17,13,0],p)};

 /* ---------- 기력 망령 ---------- */
 R.m_wraith=A=>{const p=pal(A,'#8a9ad8','#20284a','#c08aff'),S=st(A),t=A.t,side=S.v==='side',back=S.v==='back',k=S.k,h=S.h;
  const cy=-15+Math.sin(t*2.2)*1.2,lean=side?(S.walking?2:1):0,tw=S.walking?1.4:1;
  /* 아래로 흩어지는 꼬리(천 조각) */
  for(let i=0;i<5;i++){const x=-5+i*2.5+lean*.5,len=6+Math.sin(t*4+i*1.3)*2*tw,w=2.2;A.P([[x-w,cy+5],[x+w,cy+5],[x+Math.sin(t*3+i)*2,cy+5+len]],i%2?p.dk:p.b,.85)}
  /* 몸(후드 망토) */
  A.P([[-7+lean,cy+6],[7+lean,cy+6],[5+lean,cy-6],[0+lean,cy-11],[-5+lean,cy-6]],p.dd);
  A.P([[-6+lean,cy+5],[6+lean,cy+5],[4.4+lean,cy-5.5],[0+lean,cy-10],[-4.4+lean,cy-5.5]],p.a);
  A.P([[-3+lean,cy-4],[1+lean,cy-9.4],[-4.2+lean,cy-5]],p.lt,.45);
  /* 팔(너덜한 소매): 준비 때 앞으로 뻗음 */
  for(const s of (side?[1]:[-1,1])){const ax=s*6+lean+(k?s*3:0),ay=cy-1+(k?-2:0);A.P([[s*4+lean,cy-3],[ax+s*3,ay+2],[ax,ay+4]],p.b);A.C(ax+s*2.4,ay+2.6,1,p.lt)}
  if(!back){
   /* 얼굴: 후드 속 어둠 + 빛나는 눈 */
   const fx=lean+(side?2:0);A.E(fx,cy-5,side?2.6:3.6,3,'#05040a');
   for(const s of (side?[1]:[-1,1])){const ex=fx+s*1.4+(side?.5:0);A.C(ex,cy-5.2,.9,p.cl);A.glow(ex,cy-5.2,2.4,p.c,.6)}
   /* 가슴 구멍: 기력을 빨아들이는 소용돌이 */
   const hx=fx,hy=cy+1.5,hr=1.8+k*1.6+h*1;A.C(hx,hy,hr+.8,'#0a0418');A.C(hx,hy,hr,p.c,.85);A.C(hx,hy,hr*.45,'#ffffff',.9);
   if(k||h){for(let i=0;i<6;i++){const a=t*7+i/6*TAU2,r=hr+3+Math.sin(t*10+i)*1.2;A.C(hx+Math.cos(a)*r,hy+Math.sin(a)*r*.7,.6,p.cl,.8)}A.glow(hx,hy,8+h*4,p.c,.7)}}
  else{A.P([[-2,cy-8],[2,cy-8],[0,cy+3]],p.b,.6);A.glow(0,cy,6,p.c,.25)}
  /* 둘레에 떠다니는 영혼 조각 */
  for(let i=0;i<3;i++){const a=t*1.6+i*2.1,r=10+Math.sin(t+i)*1.5;A.C(Math.cos(a)*r+lean,cy+Math.sin(a)*r*.45,.7,p.cl,.6)}
  fin(A,[-13,-30,13,-1],p)};
}catch(e){console.error('v81 new mobs',e)}})();
