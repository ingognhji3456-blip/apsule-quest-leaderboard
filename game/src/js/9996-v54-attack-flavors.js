/* ================= v54 공격 생김새를 보스마다 다르게 =================
   1) 레이저 맛: 같은 굵은 빛줄기 대신 보스에 맞는 줄기로 그린다 (판정 두께는 그대로)
      fire 불꽃 줄기(불 혀·불씨) · elec 번개 갈래 · ice 서리(얼음 가시) · water 물줄기(물결·물보라)
      sound 음파(둥근 물결이 흘러감) · void 어둠(검은 심지·빨려드는 입자) · vine 가시 덩굴 · thread 팽팽한 실
      prism 무지개 띠 · mirror 거울빛(반짝이는 조각)
   2) 땅에서 솟구치기(emerge): 땅이 갈라지는 예고 → 톱날·뿌리·갈비뼈·수정이 땅을 뚫고 솟아 갈아 버림 → 다시 꺼짐
      톱날은 빠르게 돌며 불똥을 튀김. 보스 쪽에서 나를 향해 땅을 가르며 다가온다.
   보스 열쇠는 t5Key()(1~5장)와 챕터 6·7 보스 그림 이름(s6_*, s7_*)을 같이 쓴다. */
(function(){try{
 const A=window.ACT,C=(v,a,b)=>v<a?a:v>b?b:v;
 const FL={};const set=(f,keys)=>keys.split(' ').forEach(k=>FL[k]=f);
 set('fire','b2 bellows s4_meteor s4_nova s6_captain');set('elec','b1 b9 s5_eel s6_cloudwhale s6_storm');set('ice','b4 s4_comet s4_luna');
 set('water','b12 b17 s5_manta s5_organ s5_nautilus s5_whale s7_fountain s6_kite');set('sound','metronome echo s5_octopus s5_heart s6_organ s6_spire s6_falcon s7_ballet');
 set('void','b18 b19 s4_void s4_eclipse stillness s7_puppet');set('vine','b10 b11');set('thread','b14 s4_weaver');set('prism','b8 s6_prism s7_peacock scales s4_last s4_gemini s6_clock');
 set('mirror','s7_gate s7_chess s7_dragon s7_mharu s7_carousel s7_candle');
 window.FL54=FL;
 const keyNow=()=>{try{if(G.s7!=null)return S7ART[G.s7].art;if(G.s6!=null)return S6ART[G.s6].art;return t5Key()}catch(e){return ''}};
 let kF=0,kV='';const flav=()=>{const n=performance.now();if(n-kF>250){kF=n;kV=FL[keyNow()]||''}return kV};
 const E=q=>1-Math.pow(1-q,3);
 /* 줄기 그리기: (g, 시작, 끝, 굵기, 색, 시간, 사라짐, 번쩍임) */
 const LINE=(g,ax,ay,ex,ey,w,col,al)=>{g.globalAlpha=al;g.strokeStyle=col;g.lineWidth=w;g.beginPath();g.moveTo(ax,ay);g.lineTo(ex,ey);g.stroke()};
 const DRAW={
  fire(g,ax,ay,ex,ey,w,c,t,fd,L,ux,uy){LINE(g,ax,ay,ex,ey,w*2.6+4,'#ff4a10',.25*fd);LINE(g,ax,ay,ex,ey,w,'#ff7a2a',.95);LINE(g,ax,ay,ex,ey,Math.max(1,w*.45),'#ffe8a0',.95);
   const sd=Math.floor(t*20);for(let d=4;d<L;d+=7){const h=hash(sd+'f'+d)%7,px=ax+ux*d,py=ay+uy*d;for(const s of [-1,1]){const len=w*.5+h*1.2,fx=px-uy*s*(w/2+len*.5)+ux*2,fy=py+ux*s*(w/2+len*.5)+uy*2;g.globalAlpha=.8*fd;g.fillStyle=h>4?'#ffe8a0':'#ff9a3a';g.fillRect(fx-1,fy-1,2,2+len*.3)}}
   for(let i=0;i<6;i++){const q=((t*.8+i/6)%1),px=ax+ux*L*q-uy*Math.sin(t*9+i)*w,py=ay+uy*L*q+ux*Math.sin(t*9+i)*w-q*6;g.globalAlpha=(1-q)*fd;g.fillStyle='#ffd08a';g.fillRect(px,py,2,2)}},
  elec(g,ax,ay,ex,ey,w,c,t,fd,L,ux,uy){LINE(g,ax,ay,ex,ey,w*2+4,c,.18*fd);const sd=Math.floor(t*25);for(let s=0;s<3;s++){g.globalAlpha=s?.75*fd:1;g.strokeStyle=s?c:'#ffffff';g.lineWidth=s?Math.max(1,w*.35):Math.max(1,w*.3);g.beginPath();g.moveTo(ax,ay);const n=Math.max(3,Math.floor(L/10));
   for(let i=1;i<=n;i++){const q=i/n,j=i===n?0:((hash(sd+'e'+s+i)%11)-5)*w*.18,px=ax+ux*L*q-uy*j,py=ay+uy*L*q+ux*j;g.lineTo(px,py)}g.stroke()}
   for(let i=0;i<3;i++){const q=(hash(sd+'b'+i)%100)/100,px=ax+ux*L*q,py=ay+uy*L*q,a=(hash(sd+'a'+i)%628)/100;g.globalAlpha=.9*fd;g.strokeStyle='#ffffff';g.lineWidth=1;g.beginPath();g.moveTo(px,py);g.lineTo(px+Math.cos(a)*w*1.5,py+Math.sin(a)*w*1.5);g.stroke()}},
  ice(g,ax,ay,ex,ey,w,c,t,fd,L,ux,uy){LINE(g,ax,ay,ex,ey,w*2.2+3,'#a8f0ff',.22*fd);LINE(g,ax,ay,ex,ey,w,'#a8f0ff',.95);LINE(g,ax,ay,ex,ey,Math.max(1,w*.4),'#ffffff',.95);
   for(let d=6;d<L;d+=11){const px=ax+ux*d,py=ay+uy*d,s=(d/11|0)%2?1:-1,h=w*.6+((d*7)%5);g.globalAlpha=.9*fd;g.fillStyle='#e8fbff';g.beginPath();g.moveTo(px-uy*s*w/2-ux*2,py+ux*s*w/2-uy*2);g.lineTo(px-uy*s*(w/2+h),py+ux*s*(w/2+h));g.lineTo(px-uy*s*w/2+ux*2,py+ux*s*w/2+uy*2);g.closePath();g.fill()}},
  water(g,ax,ay,ex,ey,w,c,t,fd,L,ux,uy){LINE(g,ax,ay,ex,ey,w*2+3,'#5ac8f0',.2*fd);for(let s=0;s<2;s++){g.globalAlpha=.9;g.strokeStyle=s?'#e8fbff':'#5ab8f0';g.lineWidth=s?Math.max(1,w*.35):w;g.beginPath();for(let d=0;d<=L;d+=4){const o=Math.sin(d*.12-t*14+s)*w*.25,px=ax+ux*d-uy*o,py=ay+uy*d+ux*o;d?g.lineTo(px,py):g.moveTo(px,py)}g.stroke()}
   for(let d=((t*90)%14);d<L;d+=14){g.globalAlpha=.8*fd;g.fillStyle='#ffffff';g.fillRect(ax+ux*d-uy*w*.4,ay+uy*d+ux*w*.4,2,2)}for(let i=0;i<5;i++){const a=Math.atan2(uy,ux)+Math.PI+(i-2)*.4,q=((t*2+i*.2)%1);g.globalAlpha=(1-q)*fd;g.fillStyle='#bff4ff';g.fillRect(ex+Math.cos(a)*q*w*2,ey+Math.sin(a)*q*w*2,2,2)}},
  sound(g,ax,ay,ex,ey,w,c,t,fd,L,ux,uy){LINE(g,ax,ay,ex,ey,Math.max(1,w*.3),c,.7);const an=Math.atan2(uy,ux);g.lineWidth=2;for(let d=((t*120)%16);d<L;d+=16){const px=ax+ux*d,py=ay+uy*d,r=w*.9+d*.02;g.globalAlpha=.85*fd*(1-d/L*.5);g.strokeStyle=(d/16|0)%2?'#ffffff':c;g.beginPath();g.arc(px,py,r,an-1,an+1);g.stroke()}},
  void(g,ax,ay,ex,ey,w,c,t,fd,L,ux,uy){LINE(g,ax,ay,ex,ey,w*1.6+4,c,.5*fd);LINE(g,ax,ay,ex,ey,w*1.1,'#1a0a2a',.95);LINE(g,ax,ay,ex,ey,Math.max(1,w*.5),'#05020a',1);
   for(let i=0;i<10;i++){const q=1-((t*.9+i*.1)%1),o=Math.sin(i*2.3)*w*1.4*(q),px=ax+ux*L*q-uy*o,py=ay+uy*L*q+ux*o;g.globalAlpha=.8*fd;g.fillStyle=i%2?c:'#e0c8ff';g.fillRect(px,py,2,2)}},
  vine(g,ax,ay,ex,ey,w,c,t,fd,L,ux,uy){g.lineCap='round';LINE(g,ax,ay,ex,ey,w+2,'#1a2a10',.95);g.strokeStyle='#5a8a2a';g.lineWidth=w;g.globalAlpha=1;g.beginPath();for(let d=0;d<=L;d+=5){const o=Math.sin(d*.09)*w*.3,px=ax+ux*d-uy*o,py=ay+uy*d+ux*o;d?g.lineTo(px,py):g.moveTo(px,py)}g.stroke();
   for(let d=8;d<L;d+=12){const s=(d/12|0)%2?1:-1,px=ax+ux*d,py=ay+uy*d;g.globalAlpha=1;g.fillStyle=s>0?'#c8e070':'#a8c860';g.beginPath();g.moveTo(px-uy*s*w*.4,py+ux*s*w*.4);g.lineTo(px-uy*s*(w*.4+w)+ux*3,py+ux*s*(w*.4+w)+uy*3);g.lineTo(px+ux*4,py+uy*4);g.closePath();g.fill()}},
  thread(g,ax,ay,ex,ey,w,c,t,fd,L,ux,uy){for(let s=-1;s<=1;s++){const o=s*w*.3+Math.sin(t*40+s)*.6;LINE(g,ax-uy*o,ay+ux*o,ex-uy*o,ey+ux*o,s?1:1.6,s?c:'#ffffff',.95)}LINE(g,ax,ay,ex,ey,w*1.4,c,.12*fd)},
  prism(g,ax,ay,ex,ey,w,c,t,fd,L,ux,uy){const RB=['#ff4a5a','#ff9a3a','#ffe04a','#4ae08a','#3aa8ff','#6a5aff','#c85aff'];LINE(g,ax,ay,ex,ey,w*2.4+4,'#ffffff',.15*fd);for(let i=0;i<7;i++){const o=(i-3)/3*w*.6;LINE(g,ax-uy*o,ay+ux*o,ex-uy*o,ey+ux*o,Math.max(1,w*.2),RB[(i+Math.floor(t*8))%7],.9)}LINE(g,ax,ay,ex,ey,Math.max(1,w*.3),'#ffffff',.95)},
  mirror(g,ax,ay,ex,ey,w,c,t,fd,L,ux,uy){LINE(g,ax,ay,ex,ey,w*2.4+4,c,.22*fd);LINE(g,ax,ay,ex,ey,w,'#e8f4ff',.95);for(const s of [-1,1])LINE(g,ax-uy*s*w*.5,ay+ux*s*w*.5,ex-uy*s*w*.5,ey+ux*s*w*.5,1.4,s<0?'#5af0e0':'#c89aff',.9);
   const sd=Math.floor(t*14);for(let i=0;i<8;i++){const q=(hash(sd+'m'+i)%100)/100,px=ax+ux*L*q,py=ay+uy*L*q,o=((hash(sd+'o'+i)%9)-4)*w*.35;g.globalAlpha=.95*fd;g.fillStyle='#ffffff';g.fillRect(px-uy*o-1,py+ux*o-1,3,1);g.fillRect(px-uy*o,py+ux*o-2,1,3)}}};
 const _sd=npSegDraw;
 npSegDraw=function(o,ax,ay,bx,by,now,b){const sty=o.sty||'laser';const f=sty==='laser'&&!o.thin&&!o.plain?(o.flav||flav()):'';const D=f&&DRAW[f];if(!D)return _sd.apply(this,arguments);
  const c=o.col||npCol(),w=Math.max(2,o.w),age=b-o.t1,rem=o.t2-b,g=ctx,t=now/1000,ext=E(C(age/(f==='vine'?.3:.14),0,1)),fade=C(rem/.18,0,1),flash=C(1-age/.1,0,1),ww=w*(.45+.55*fade)*(1+flash*.4);
  const ex=ax+(bx-ax)*ext,ey=ay+(by-ay)*ext,L=Math.hypot(ex-ax,ey-ay)||1,ux=(ex-ax)/L,uy=(ey-ay)/L;g.save();g.lineCap='round';try{D(g,ax,ay,ex,ey,ww,c,t,fade,L,ux,uy)}catch(e){}g.restore();g.globalAlpha=1;
  pcirc(ax,ay,ww*.7+flash*4,f==='void'?'#1a0a2a':c,.7);pcirc(ax,ay,Math.max(1,ww*.35),f==='void'?c:'#ffffff',.9)};

 /* ---------- 땅에서 솟구치기 ---------- */
 const DUST=(x,y,col,n,t)=>{for(let i=0;i<n;i++){const a=-Math.PI*(.1+.8*((i*37)%10)/10),q=(t*2+i*.13)%1;cPx(x+Math.cos(a)*q*16,y+Math.sin(a)*q*14+q*q*10,2,col,(1-q)*.8)}};
 function emerge(t,c,L){const n=6+L*2,gap=.28;
  sch(t,()=>{const [cx,cy]=t5Core(),tx=P.x,ty=P.y,a=Math.atan2(ty-cy,tx-cx),step=Math.max(26,Math.hypot(tx-cx,ty-cy)/(n-2));
   for(let i=0;i<n;i++){const x=C(cx+Math.cos(a)*step*(i+1),AX+14,AX+AW-14),y=C(cy+Math.sin(a)*step*(i+1)+10,AY+18,AY+AH-8),T0=t+i*gap,T1=T0+t5T(),up=.6,gy=y+8;
    NP({k:'circ',x,y,r:14,col:c.col,hide:true,t0:T0,t1:T1,t2:T1+up,dmg:12,deco:(o,b,now)=>{const tt=now/1000;
      if(b<T1){const p=C((b-T0)/(T1-T0),0,1);for(let j=-3;j<=3;j++){const len=4+p*10;cPx(x+j*3,gy+Math.sin(j*1.7)*1.5,1,'#1a1410',.4+.5*p);if(Math.abs(j)<2)cPx(x+j*3,gy-len*.2,1,'#3a2a20',.6*p)}line(x-12*p,gy,x+12*p,gy+1,2,(px,py)=>cPx(px,py,2,'#0a0806',.8));if(p>.5)DUST(x,gy,'#8a7a6a',4,tt);return}
      const q=C((b-T1)/.12,0,1),sink=C((T1+up-b)/.15,0,1),h=(c.spr.h||12)*(c.s||1.8),rise=E(q)*sink;
      ctx.save();ctx.beginPath();ctx.rect(x-h,gy-h*1.6,h*2,h*1.6);ctx.clip();c.spr(x,gy-h*.5*rise+h*.35,(c.s||1.8),{rot:c.grind?tt*14:(Math.sin(tt*20)*.1)});ctx.restore();
      RA(Math.round(x-h*.6),gy-1,Math.round(h*1.2),3,'#1a1410',.9);DUST(x,gy,'#a89070',6,tt);
      if(c.grind){for(let j=0;j<6;j++){const aa=-Math.PI/2+(hash(Math.floor(tt*30)+'g'+j)%100-50)/50*1.2,d=4+hash(Math.floor(tt*30)+'d'+j)%14;cPx(x+Math.cos(aa)*d,gy-h*.4*rise+Math.sin(aa)*d,2,j%2?'#ffffff':'#ffd166',1)}}}});
    if(i%2===0)sch(T1,()=>{try{sfx(c.grind?180:90,.12,c.grind?'sawtooth':'square',.04,c.grind?900:50)}catch(e){}G.shake=Math.max(G.shake||0,.12)})}});
  return n*gap+t5T()+1}
 window.EMERGE54=emerge;
 /* 몇몇 보스의 추가 공격을 "솟구치기"로 바꿈: [보스, 순번, 이름, 그림, 크기, 갈기] */
 try{const B=window.B53,TM=window.TM53;if(B&&TM){TM.emerge={chan:'field',tip:n=>'보스 쪽에서 나를 향해 땅을 가르며 '+n+' 줄이 차례로 솟구침 → 갈라지는 줄에서 옆으로 비켜',fn:emerge};
  const SW=[['b0',3,'톱날 솟구치기','gear',2.6,1,'톱날'],['b10',3,'뿌리 솟구치기','thorn',2.6,0,'뿌리'],['b13',3,'갈비뼈 창 솟구치기','bone',2.6,0,'갈비뼈'],['b16',3,'수정 솟구치기','crystal',2.4,0,'수정'],['b6',0,'고철 톱날 솟구치기','gear',2.4,1,'고철 톱날'],['b11',3,'버섯 솟구치기','spore',2.6,0,'버섯'],['b19',0,'이빨 솟구치기','tooth',2.6,0,'이빨']];
  for(const [key,i,kr,spN,s,grind,noun] of SW){const nm='t6_'+key+'_'+i;if(!MV[nm])continue;const PX=window.PX53||{},spr=PX[spN]||ACT.spr(spN,6);const c={spr:spr||ACT.spr('crystal',6),s,col:B[key][4],grind:!!grind};
   defPat(nm,kr,'field',8,(i===0?'':i===1?'[어려움] ':'[익스트림] ')+TM.emerge.tip(noun),tt=>emerge(tt,c,Math.max([0,1,2,2][i]+1,t5L())))}}}catch(e){console.error('v54 emerge',e)}
}catch(e){console.error('v54 flavors',e)}})();
