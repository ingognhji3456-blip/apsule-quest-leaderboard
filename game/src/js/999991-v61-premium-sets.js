/* ================= v61 현질 세트 전용 궁극기 · 패리 (SET61) =================
   현질 세트(공허 · 태엽 · 네온)의 스킨과 검마다
   ① 궁극기(C키)를 따로 만든다: 공허 붕괴 · 태엽 심판 · 네온 드롭. 검이 정하고, 검이 없으면 스킨이 정한다.
      피해량 공식은 원래 궁극기와 같다(현질 검은 「시간의 검」 칸으로 계산 — 전에는 장착 칸 번호로 계산돼 약했다).
   ② 패리 자세(984의 __parryPose)와 막는 방패 모양 · 패리 성공 이펙트 · 소리를 세트마다 다르게.
   ③ 스킨 없이 현질 검만 낄 때도 그 세트의 휘두르기 몸동작을 쓴다(걷기 파티클은 99997이 검 테마로 그린다).
   몸(자세 · 패리)은 스킨이 먼저, 궁극기는 검이 먼저 정한다. */
(()=>{try{
 const SW2SET={voidreaver:'void',gearsaber:'clock',beatbreaker:'neon'},SETS=['void','clock','neon'];
 const RB=['#ff3ad6','#b05cff','#29f0ff','#5affb0','#ffe14d','#ff9a3a'];
 const swordSet=()=>{try{return SW2SET[window.SWORD59&&SWORD59.get()]||null}catch(e){return null}};
 const skinSet=()=>{try{const s=window.SKIN58&&SKIN58.get();return SETS.includes(s)?s:null}catch(e){return null}};
 const bodySet=()=>skinSet()||swordSet(),ultSet=()=>swordSet()||skinSet();
 const LN=(x0,y0,x1,y1,c,w2,a)=>line(x0,y0,x1,y1,1,(x,y)=>RA(x-w2/2,y-w2/2,w2,w2,c,a));
 const ease=q=>1-Math.pow(1-Math.min(1,Math.max(0,q)),3);

 /* ---------- ① 궁극기 ---------- */
 const ULT={
  void:{name:'공허 붕괴',c:'#5affd8',c2:'#a066ff',hits:()=>[350,550,750,950,1450],tail:700,
   start(){sfx(55,1.2,'sawtooth',.07,28);sfx(880,.6,'sine',.03,110)},hit(k,last){if(last){sfx(40,.8,'square',.09,20);sfx(1760,.5,'sine',.05,220)}else sfx(300+k*60,.14,'sawtooth',.05,90)}},
  clock:{name:'태엽 심판',c:'#ffcf5a',c2:'#ffffff',hits:()=>[300,480,660,840,1020,1500],tail:800,
   start(){sfx(1200,.05,'square',.03,1200);sfx(220,.6,'triangle',.05,440)},hit(k,last){if(last){sfx(523,1.2,'sine',.07,523);sfx(784,1.2,'sine',.05,784);sfx(1046,1,'sine',.04,1046)}else{sfx(1800,.04,'square',.04,1500);sfx(900,.08,'square',.03,700)}}},
  neon:{name:'네온 드롭',c:'#ff3ad6',c2:'#29f0ff',hits:()=>{const b=Math.max(170,Math.min(330,(G&&G.ms?G.ms:420)*.5));return Array.from({length:8},(_,i)=>Math.round(300+i*b))},tail:800,
   start(){sfx(110,.5,'sawtooth',.06,880);sfx(880,.5,'square',.03,110)},hit(k,last){sfx(k%2?60:90,.16,'square',.08,40);sfx(RB.length?[523,659,784,1046][k%4]:600,.1,'square',.03,0);if(last)sfx(1046,.6,'sawtooth',.04,2093)}}};

 if(typeof useSpecial==='function'){const base=useSpecial;useSpecial=function(){
  const S=ultSet();if(!S||mode!=='boss'||!G||!G.vuln)return base.apply(this,arguments);
  if(typeof Q19!=='undefined'&&Q19&&Q19.practice)return; /* 연습 모드는 원래처럼 막음 */
  const U=ULT[S],now=performance.now(),w=curWp(),prem=!!(window.SWORD59&&SWORD59.list.some(x=>x.type===w.type)),idx=WEAPONS.indexOf(w),wi=prem||idx<0?WEAPONS.length-1:idx,g=bgeo();G.spUsed=true;G.spMeter=0;try{initAudio()}catch(e){}
  const total=G.maxHp*(.07+.015*wi)*(1+((curPet()||{}).dmg||0)),hits=U.hits(),dur=Math.max(...hits)+U.tail;
  G.sp={type:'p61',set:S,t0:now,dur,name:U.name,col:U.c,cx:g.x,cy:g.coreY,done:[],hits};
  G.vuln.t1=Math.max(G.vuln.t1,G.beat+dur/G.ms+1);G.clickTarget=null;G.nextCircle=now+dur;
  banner('필살! '+U.name);G.flash=Math.max(G.flash,.5);G.hitstop=now+140;U.start();P.lungeT=now;P.lungeA=Math.atan2(g.coreY-P.y,g.x-P.x);P.lungeDur=260;
  hits.forEach((ms,k)=>setTimeout(()=>{if(!G||G.state!=='play')return;const n2=performance.now(),last=k===hits.length-1,per=total*(last?.3:.7/(hits.length-1));
   spDmg(per,g.x+(RND()-.5)*30,g.coreY+(RND()-.5)*24,k%2?U.c2:U.c,n2);G.sp&&G.sp.done.push(n2);U.hit(k,last);fxRing(g.x,g.coreY,n2,last?600:340,last?90:40+k*5,S==='neon'?RB[k%6]:(k%2?U.c2:U.c));
   if(last){G.shake=Math.max(G.shake,.8);G.flash=Math.max(G.flash,.6)}},ms))}}

 function drawUlt(s,now){const t=now-s.t0,k=t/s.dur,cx=s.cx,cy=s.cy,U=ULT[s.set],last=s.hits[s.hits.length-1],fade=k>.85?(1-k)/.15:1;
  switch(s.set){
  case 'void':{RA(0,0,W,H,'#07020f',Math.min(.62,t/300)*fade);
   /* 빨려 드는 줄기 */for(let i=0;i<34;i++){const a=i*2.39,q=((t/900)+i*.137)%1,r=(1-ease(q))*260+8;const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r*.7;LN(x,y,x-Math.cos(a)*8*(1-q),y-Math.sin(a)*6*(1-q),i%3?U.c2:U.c,1.5,(q*.9)*fade)}
   /* 강착 원반 */const grow=Math.min(1,t/600),col=t>last-150&&t<last?1-(t-(last-150))/150:1,R0=26*grow*(t<last?col:0);
   for(let i=0;i<48;i++){const a=i*TAU/48+t/180,rr=(R0+14+Math.sin(i*3.1)*4)*grow;RA(cx+Math.cos(a)*rr*1.6-1,cy+Math.sin(a)*rr*.45-1,2,2,i%2?U.c:U.c2,.85*fade)}
   if(R0>0){pcirc(cx,cy,R0+3,U.c2,.35*fade);pcirc(cx,cy,R0,'#000000',.96);pcirc(cx,cy,R0*.6,'#05000a',1)}
   /* X자 베기 */s.hits.slice(0,-1).forEach((ms,i)=>{const d=t-ms;if(d<0||d>320)return;const a=(i%2?.75:-.75)+i*.2,L2=70+i*12,f=1-d/320;LN(cx-Math.cos(a)*L2,cy-Math.sin(a)*L2,cx+Math.cos(a)*L2,cy+Math.sin(a)*L2,'#ffffff',3,f);LN(cx-Math.cos(a)*L2,cy-Math.sin(a)*L2,cx+Math.cos(a)*L2,cy+Math.sin(a)*L2,U.c,7,f*.45)});
   /* 붕괴 폭발 */if(t>=last){const f=(t-last)/(s.dur-last);RA(0,0,W,H,'#e8dcff',Math.max(0,.75-f*1.4));for(let i=0;i<3;i++){const r=f*(120+i*50);for(let j=0;j<40;j++){const a=j*TAU/40;RA(cx+Math.cos(a)*r-1,cy+Math.sin(a)*r*.75-1,3,3,i===1?U.c2:U.c,(1-f)*.9)}}}
   break}
  case 'clock':{RA(0,0,W,H,'#140e02',Math.min(.5,t/300)*fade);const q=ease(t/450),R0=58*q;
   /* 구석 톱니 */for(const [gx,gy,gr,dir] of [[AX+30,AY+40,22,1],[AX+AW-30,AY+40,18,-1],[AX+40,AY+AH-30,16,-1],[AX+AW-40,AY+AH-30,24,1]]){const ga=t/400*dir;for(let i=0;i<10;i++){const a=ga+i*TAU/10;RA(gx+Math.cos(a)*gr-2,gy+Math.sin(a)*gr-2,4,4,'#c8962a',.7*fade)}pcirc(gx,gy,gr-4,'#5a3e10',.6*fade);pcirc(gx,gy,4,'#ffcf5a',.8*fade)}
   /* 시계판 */pcirc(cx,cy,R0+4,'#ffcf5a',.25*fade);pcirc(cx,cy,R0,'#fff6e0',.12*fade);
   for(let i=0;i<12;i++){const a=i*TAU/12-Math.PI/2,on=s.done.length>i%6;RA(cx+Math.cos(a)*R0*.86-1.5,cy+Math.sin(a)*R0*.86-1.5,3,3,on?'#ffffff':'#ffcf5a',.95*fade)}
   const snap=t>=last?1:0,ha=snap?-Math.PI/2:-Math.PI/2+t/90,ma=snap?-Math.PI/2:-Math.PI/2+t/30;
   LN(cx,cy,cx+Math.cos(ha)*R0*.5,cy+Math.sin(ha)*R0*.5,'#ffe79a',3,fade);LN(cx,cy,cx+Math.cos(ma)*R0*.78,cy+Math.sin(ma)*R0*.78,'#ffffff',2,fade);pcirc(cx,cy,3,'#ffcf5a',fade);
   /* 째깍 글자 */s.done.slice(0,-1).forEach((d0,i)=>{const d=now-d0;if(d>500)return;ctx.globalAlpha=1-d/500;ctx.font='bold 11px monospace';ctx.textAlign='center';ctx.fillStyle='#ffe79a';ctx.fillText('째깍',cx+(i%2?40:-40),cy-30-d*.03-i*4);ctx.textAlign='left';ctx.globalAlpha=1});
   /* 종 울림 */if(t>=last){const f=(t-last)/(s.dur-last);RA(0,0,W,H,'#fff6e0',Math.max(0,.6-f*1.2));for(let i=0;i<4;i++){const r=R0+f*(60+i*40);for(let j=0;j<48;j++){const a=j*TAU/48;RA(cx+Math.cos(a)*r-1,cy+Math.sin(a)*r-1,2,2,i%2?'#ffffff':'#ffcf5a',(1-f)*.85)}}}
   break}
  case 'neon':{RA(0,0,W,H,'#04010a',Math.min(.6,t/250)*fade);
   const bi=s.done.length,lastHit=s.done[bi-1]||s.t0,pulse=Math.max(0,1-(now-lastHit)/220);
   if(bi)RA(0,0,W,H,RB[(bi-1)%6],.14*pulse*fade);
   /* 이퀄라이저 */for(let i=0;i<20;i++){const bh=(18+Math.abs(Math.sin(i*1.7+bi*2.3))*60)*(.4+.6*pulse)*Math.min(1,t/300),x=AX+6+i*(AW-12)/20;for(let y=0;y<bh;y+=4)RA(x,AY+AH-4-y,(AW-12)/20-3,3,RB[(i+Math.floor(y/12))%6],.8*fade)}
   /* 레이저 */s.done.forEach((d0,i)=>{const d=now-d0;if(d>420)return;const f=1-d/420,corner=[[AX,AY],[AX+AW,AY],[AX,AY+AH],[AX+AW,AY+AH]][i%4],c=RB[i%6];LN(corner[0],corner[1],cx,cy,c,2,f);LN(corner[0],corner[1],cx,cy,c,6,f*.3)});
   /* 회전 레이저 */for(let i=0;i<4;i++){const a=t/300+i*TAU/4;LN(cx,cy,cx+Math.cos(a)*200,cy+Math.sin(a)*140,RB[(i+bi)%6],1,.35*fade)}
   /* DROP 글자 */if(t<s.dur-300){const sc=1+.15*pulse;ctx.save();ctx.translate(W/2,AY+AH-70);ctx.scale(sc,sc);ctx.font='bold 18px monospace';ctx.textAlign='center';ctx.fillStyle='#05090b';ctx.fillText('♪ DROP ♪',1,1);ctx.fillStyle=RB[bi%6];ctx.fillText('♪ DROP ♪',0,0);ctx.restore();ctx.textAlign='left'}
   if(t>=last){const f=(t-last)/(s.dur-last);RA(0,0,W,H,'#ffffff',Math.max(0,.55-f*1.2));for(let i=0;i<6;i++){const r=f*(90+i*22);for(let j=0;j<36;j++){const a=j*TAU/36;RA(cx+Math.cos(a)*r-1,cy+Math.sin(a)*r*.8-1,3,3,RB[(i+j)%6],(1-f)*.9)}}
    for(let i=0;i<30;i++){const a=i*2.4,d=f*160;RA(cx+Math.cos(a)*d,cy+Math.sin(a)*d*.7+f*f*40,3,2,RB[i%6],1-f)}}
   break}}
  /* 이름 */if(t<1000){const a=t<120?t/120:t>800?(1000-t)/200:1;ctx.globalAlpha=a;ctx.font='bold 14px monospace';ctx.textAlign='center';ctx.fillStyle='#05090b';ctx.fillText('필살 · '+s.name,W/2+1,AY+AH-29);ctx.fillStyle=s.set==='neon'?RB[Math.floor(t/90)%6]:U.c;ctx.fillText('필살 · '+s.name,W/2,AY+AH-30);ctx.textAlign='left';ctx.globalAlpha=1}}
 if(typeof drawSpecialFX==='function'){const base=drawSpecialFX;drawSpecialFX=function(now){const s=G&&G.sp;if(s&&s.type==='p61'){if((now-s.t0)/s.dur>=1){G.sp=null;return}try{drawUlt(s,now)}catch(e){}return}return base.apply(this,arguments)}}
 /* 궁극기 게이지에 세트 궁극기 이름 */
 if(typeof drawUltGauge==='function'){const base=drawUltGauge;drawUltGauge=function(now){const S=ultSet();if(!S)return base.apply(this,arguments);const w=curWp(),o=w.sp;w.sp=ULT[S].name;try{return base.apply(this,arguments)}finally{w.sp=o}}}

 /* ---------- ② 패리 ---------- */
 const PARRY={
  /* 자세: 손 위치(그림 좌표 40×48)와 검 각도(앞 기준, 0=앞, -π/2=위) */
  void:(q,used,perf,side)=>{const e=ease(q/.18),x=(side?13:20)+e*1.5,y=24-e*6;return {x,y,a:-Math.PI/2+.12-(used?Math.sin(q*40)*.06:0)}},
  clock:(q,used,perf,side)=>{const e=ease(q/.2);return {x:side?14:20,y:22-e*12,a:lerp(.9,-.04,e)}},
  neon:(q,used,perf,side)=>{const e=ease(q/.15);return {x:(side?13:20)+Math.cos(q*TAU*2)*1.5,y:20-e*3,a:-Math.PI/2+q*TAU*2.5}}};
 function guard(S,now){const pw=(typeof parryWin==='function'?parryWin():190),k=(now-P.parryT)/pw,used=P.parryUsed,a0=Math.atan2(P.face.y,P.face.x),px=P.x,py=P.y-8,al=k>1?.45*(1-(k-1)/.6):.95;if(al<=0)return;
  if(S==='void'){for(let i=-8;i<=8;i++){const a=a0+i*.15,r=14+Math.sin(i*1.7+now/60)*1.2,dk=Math.abs(i)/8;RA(px+Math.cos(a)*r-1.5,py+Math.sin(a)*r-1.5,3,3,'#1a0a2a',al);RA(px+Math.cos(a)*(r+1.6)-.5,py+Math.sin(a)*(r+1.6)-.5,1,1,dk>.7?'#a066ff':'#5affd8',al)}}
  else if(S==='clock'){const rot=now/120;for(let i=-7;i<=7;i++){const a=a0+i*.16,r=14;RA(px+Math.cos(a)*r-1,py+Math.sin(a)*r-1,2,2,'#c8962a',al);if((i+Math.floor(rot))%2===0)RA(px+Math.cos(a)*(r+2)-1,py+Math.sin(a)*(r+2)-1,2,2,'#ffcf5a',al)}pcirc(px+Math.cos(a0)*14,py+Math.sin(a0)*14,2.5,'#fff6e0',al*.8)}
  else{for(let j=0;j<6;j++){const a=a0-.9+j*.36,b=a+.36;LN(px+Math.cos(a)*15,py+Math.sin(a)*15,px+Math.cos(b)*15,py+Math.sin(b)*15,RB[(j+Math.floor(now/100))%6],1.5,al);RA(px+Math.cos(a)*15-1,py+Math.sin(a)*15-1,2,2,'#ffffff',al)}}}
 const FXP=[];
 if(typeof doParry==='function'){const base=doParry;doParry=function(now,beat,dmg){const r=base.apply(this,arguments);try{const S=bodySet();if(S){const perf=!!P.parryPerf;FXP.push({t:now,S,perf,x:P.x,y:P.y-8});if(FXP.length>4)FXP.shift();
   if(S==='void'){sfx(70,.4,'sawtooth',.06,35);sfx(1400,.2,'sine',.03,700)}else if(S==='clock'){sfx(2400,.05,'square',.04,2400);sfx(1600,.05,'square',.03,1600);if(perf)sfx(784,.5,'sine',.05,784)}else{sfx(660,.08,'square',.04,1320);sfx(990,.08,'square',.03,1980);if(perf)sfx(1320,.3,'sawtooth',.03,2640)}
   if(G.pops&&G.pops.length){const pp=G.pops[G.pops.length-1];if(/PARRY/.test(pp.tx||''))pp.col=S==='void'?'#5affd8':S==='clock'?'#ffcf5a':RB[Math.floor(now/80)%6]}}}catch(e){}return r}}
 function drawParryBursts(now){for(let i=FXP.length-1;i>=0;i--){const o=FXP[i],d=now-o.t,dur=o.perf?700:520;if(d>dur){FXP.splice(i,1);continue}const q=d/dur,a=1-q,R0=o.perf?1.4:1;
  if(o.S==='void'){/* 빨려 들었다 터짐 */for(let j=0;j<18;j++){const an=j*TAU/18+o.t,r=q<.4?(1-q/.4)*40*R0:((q-.4)/.6)*55*R0;RA(o.x+Math.cos(an)*r-1,o.y+Math.sin(an)*r*.8-1,2,2,j%2?'#5affd8':'#a066ff',a)}if(q<.4)pcirc(o.x,o.y,(1-q/.4)*8*R0,'#000000',.7);
   LN(o.x-24*R0,o.y+10,o.x+24*R0,o.y-10,'#5affd8',2,a);LN(o.x-24*R0,o.y+10,o.x+24*R0,o.y-10,'#1a0a2a',5,a*.4)}
  else if(o.S==='clock'){const r=16*R0+q*10;pcirc(o.x,o.y,r,'#ffcf5a',.18*a);for(let j=0;j<12;j++){const an=j*TAU/12;RA(o.x+Math.cos(an)*r-1,o.y+Math.sin(an)*r-1,2,2,j%3?'#ffcf5a':'#ffffff',a)}const ha=-Math.PI/2+Math.min(1,q*3)*TAU;LN(o.x,o.y,o.x+Math.cos(ha)*r*.75,o.y+Math.sin(ha)*r*.75,'#ffffff',2,a);
   for(let j=0;j<8;j++){const an=j*.8+o.t,d2=q*36*R0;RA(o.x+Math.cos(an)*d2-1,o.y+Math.sin(an)*d2-1+q*q*8,2,2,'#ffe79a',a)}}
  else{for(let j=0;j<6;j++){const an=j*TAU/6+q*2,r=10*R0+q*26*R0,bn=an+TAU/6;LN(o.x+Math.cos(an)*r,o.y+Math.sin(an)*r,o.x+Math.cos(bn)*r,o.y+Math.sin(bn)*r,RB[j],2,a)}
   for(let j=0;j<5;j++){ctx.globalAlpha=a;ctx.font='bold 9px monospace';ctx.fillStyle=RB[(j+2)%6];ctx.fillText(j%2?'♪':'♫',o.x-14+j*7,o.y-10-q*30-j*3)}ctx.globalAlpha=1;
   for(let j=0;j<8;j++){const bh=(4+Math.abs(Math.sin(j*1.9+o.t))*12)*a*R0;RA(o.x-16+j*4,o.y+12-bh,3,bh,RB[j%6],.85*a)}}}}
 if(typeof drawParryFX==='function'){const base=drawParryFX;drawParryFX=function(now){const S=bodySet();if(!S||mode!=='boss'||!G)return base.apply(this,arguments);
  const pt=P.parryT,show=pt&&now-pt<(typeof parryWin==='function'?parryWin():190)+120;if(show)P.parryT=0;let r;try{r=base.apply(this,arguments)}finally{if(show)P.parryT=pt}
  try{if(show)guard(S,now);if(FXP.length)drawParryBursts(now)}catch(e){}return r}}

 /* ---------- ③ 현질 검만 낄 때 그 세트의 몸동작 + 매 프레임 패리 자세 연결 ---------- */
 let mine=false;
 function sync(){try{const sk=window.SKIN58&&SKIN58.get(),ss=swordSet();
  if(!sk&&ss){const s=SKIN58.byId(ss);if(s&&s.motion){if(!window.__skinMotion||mine&&window.__skinMotion._set!==ss){window.__skinMotion=Object.assign({},s.motion,{fx:null,_set:ss});mine=true}}}
  else if(mine&&!sk){window.__skinMotion=null;mine=false}else if(sk)mine=false;
  const B=bodySet();window.__parryPose=B?PARRY[B]:null}catch(e){}}
 {const base=drawScene;drawScene=function(now){sync();return base.apply(this,arguments)}}

 window.SET61={ULT,PARRY,bodySet,ultSet,swordSet,skinSet};
}catch(e){console.error('v61 sets',e)}})();
