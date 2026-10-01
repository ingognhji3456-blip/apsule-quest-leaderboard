/* ================= v43 잘린 보스 수정: 그림판보다 크게 그려지는 보스(챕터 5 전원 · 챕터 4 일부 · 익스트림 장식)는 넓은 그림판에서 그린다 ================= */
(function(){const BIG={b7:1,c_s4_comet:1,c_s4_void:1,c_s4_nova:1,c_s4_last:1};try{for(const s of S5)BIG['c_s5_'+s.art.replace(/^s5_/,'')]=1;for(const s of S5)BIG['c_'+s.art]=1}catch(e){}
 const L={SW:80,SH:70,OX:40,OY:58,S:null,F:null,T:null,tex:null};
 function mk(){if(L.S)return;const D=MON.D;for(const k of ['S','F','T']){const c=document.createElement('canvas');c.width=L.SW*D;c.height=L.SH*D;if(k==='S')c.getContext('2d',{willReadFrequently:true});L[k]=c}}
 try{const _md=monDraw;monDraw=function(key){if(!BIG[key])return _md.apply(this,arguments);mk();monCv();const sv={SW:MON.SW,SH:MON.SH,OX:MON.OX,OY:MON.OY,S:MON.S,F:MON.F,T:MON.T,tex:MON.tex};
   MON.SW=L.SW;MON.SH=L.SH;MON.OX=L.OX;MON.OY=L.OY;MON.S=L.S;MON.F=L.F;MON.T=L.T;MON.tex=L.tex;
   try{return _md.apply(this,arguments)}finally{L.tex=MON.tex;Object.assign(MON,sv)}}}catch(e){console.error('v43 clip',e)}
 window.__V43BIG=BIG})();

/* ================= v43 등장씬 시네마틱: 챕터 컨셉별 전조 → 눈빛 → 착지 임팩트 프레임 → 이름 카드 (익스트림은 경보·각성 연출 추가) =================
   보스마다 다른 '움직임'(솟아오름·낙하·조립 등)은 기존 정의를 그대로 쓰고, 그 위의 연출층(어둠·전조·이름판)을 새로 만든다. */
(function(){
 const IN={boom:0,boomN:0,last:null};
 const chOf=()=>{try{if(G.s5!=null||G._s5hold!=null)return 5;if(G.s4!=null||G.s4Rush!=null)return 4;if(typeof _c3Swap!=='undefined'&&_c3Swap&&_c3Swap.art)return 3;return G.bi<10?1:2}catch(e){return 1}};
 const ease=k=>{k=clamp(k,0,1);return 1-Math.pow(1-k,3)},sm=k=>{k=clamp(k,0,1);return k*k*(3-2*k)};
 const txt=(s,x,y,size,col,stroke,align,wt)=>{ctx.font=(wt||'900')+' '+size+'px '+FONT_STACK;ctx.textAlign=align||'center';ctx.lineJoin='round';if(stroke){ctx.lineWidth=Math.max(2,size*.18);ctx.strokeStyle=stroke;ctx.strokeText(s,x,y)}ctx.fillStyle=col;ctx.fillText(s,x,y)};
 const hexA=(h,a)=>{h=(h||'#ffffff').replace('#','');const n=parseInt(h.slice(0,6),16);return 'rgba('+((n>>16)&255)+','+((n>>8)&255)+','+(n&255)+','+a+')'};
 try{const _eb=entBoom;entBoom=function(){IN.boom=performance.now();IN.boomN++;return _eb.apply(this,arguments)}}catch(e){}
 /* 익스트림은 더 길게 */
 try{const _es=entStart;entStart=function(now){const r=_es.apply(this,arguments);try{if(G.cine&&G.cine.type==='intro'){G.cine.dur=diff==='extreme'?7400:6000;IN.boom=0;IN.boomN=0;IN.t0=G.cine.t0;IN.snd={}}}catch(e){}return r}}catch(e){}
 const once=(k,f)=>{if(!IN.snd)IN.snd={};if(!IN.snd[k]){IN.snd[k]=1;try{f()}catch(e){}}};

 /* ---------- 챕터별 전조 (보스가 나타나기 전 · 보스 색으로 물듦) ---------- */
 function omen(ch,T,g,B,a,ex){const t=T/1000,col=B.c,acc=(B.pal&&B.pal[3])||'#ffe79a',cx=g.x,cy=g.coreY;
  if(ch===1){/* 기계: 사방에서 불똥이 나선으로 빨려 들고, 가장자리에서 전류가 코어로 꽂힌다 */
   for(let i=0;i<40;i++){const q=((t*.55)+i/40)%1,ang=i*2.39+t*(1.5+q),r=(1-q)*260;cPx(cx+Math.cos(ang)*r,cy+Math.sin(ang)*r*.62,q>.8?3:2,i%3?acc:'#ffffff',a*(.3+.7*q))}
   if(Math.floor(t*6)%3===0){const s=Math.floor(t*6);const ang=hash(s+'arc')%628/100;e2Bolt(cx+Math.cos(ang)*240,cy+Math.sin(ang)*150,cx,cy,col,s,a*.9)}
   for(let k=0;k<2;k++){const R0=90+k*70,n=14+k*6,rot=t*(k?-.4:.6);for(let i=0;i<n;i++){const an=rot+i*TAU/n;cPx(cx+Math.cos(an)*R0,cy+Math.sin(an)*R0*.6,4,col,a*.18)}cRing(cx,cy,R0-6,col,a*.12,2,.6)}}
  else if(ch===2){/* 굶주림: 발밑에서 균열이 뻗고, 붉은 숨결이 오르며, 심장 박동처럼 화면이 울린다 */
   const beat=Math.pow(1-((t*1.6)%1),4);RA(0,0,W,H,col,a*.12*beat);
   for(let i=0;i<9;i++){const ang=Math.PI+.15+i*(Math.PI-.3)/8,L=Math.min(1,t/1.6)*(90+(hash(i+'c')%60));let x=cx,y=g.y;for(let s=0;s<L;s+=6){const nx=x+Math.cos(ang+Math.sin(s*.2+i)*.5)*6*-1,ny=y+Math.sin(ang)*-1*.25*6;line(x,y,nx,ny,1,(px,py)=>cPx(px,py,2,acc,a*.75));x=nx;y=ny}}
   for(let i=0;i<26;i++){const q=((t*.4)+i/26)%1;cPx(cx+((i*53)%200-100)*(1+q*.4),g.y-q*170,2,i%2?col:acc,a*(1-q)*.8)}}
  else if(ch===3){/* 기원(골동품): 거대한 시계 문자판이 떠오르고 바늘이 미친 듯이 돌다가 멈춘다 · 세피아 필름 */
   RA(0,0,W,H,'#3a2a14',a*.18);const R0=118,spin=T<1900?t*t*3:1.9*1.9*3;cRing(cx,cy,R0,acc,a*.55,2);cRing(cx,cy,R0-8,acc,a*.25,1);
   for(let i=0;i<12;i++){const an=i*TAU/12;cPx(cx+Math.cos(an)*(R0-14),cy+Math.sin(an)*(R0-14),i%3?2:4,acc,a*.7)}
   for(const [L,sp,w] of [[R0*.75,1,2],[R0*.5,1/12,3]]){const an=spin*sp*TAU/4-Math.PI/2;line(cx,cy,cx+Math.cos(an)*L,cy+Math.sin(an)*L,2,(px,py)=>cPx(px,py,w,acc,a*.8))}
   for(let i=0;i<70;i++)cPx((hash(i+'g'+Math.floor(t*20))%W),(hash(i+'h'+Math.floor(t*20))%H),1,'#fff0d0',a*.25);if(Math.floor(t*12)%7===0)RA((hash(Math.floor(t*12)+'l')%W),0,1,H,'#fff0d0',a*.2)}
  else if(ch===4){/* 별: 별빛이 날아와 박히며 별자리 선이 보스의 윤곽을 그린다 · 일식 고리 */
   for(let i=0;i<34;i++){const q=((t*.7)+i/34)%1,ang=i*1.83,r=(1-q*q)*300;const x=cx+Math.cos(ang)*r,y=cy+Math.sin(ang)*r*.6;line(x,y,x+Math.cos(ang)*14*(1-q),y+Math.sin(ang)*9*(1-q),1,(px,py)=>cPx(px,py,1,'#ffffff',a*q))}
   const pts=[];for(let i=0;i<9;i++){const an=i*TAU/9+.3,rr=60+(hash(i+'k')%30);pts.push([cx+Math.cos(an)*rr,cy+Math.sin(an)*rr*.8])}const n=Math.floor(clamp(t/1.7,0,1)*9);
   for(let i=0;i<n;i++){const [x0,y0]=pts[i],[x1,y1]=pts[(i+1)%9];line(x0,y0,x1,y1,3,(px,py)=>cPx(px,py,1,col,a*.8));e2Star(x0,y0,3,'#ffffff',a)}
   const ec=sm(t/1.8);pcirc(cx,cy-30,Math.round(26*ec),'#000000',a*.9);cRing(cx,cy-30,Math.round(27*ec)+1,acc,a*ec,2);e2Glow(cx,cy-30,60*ec,hexA(acc,.5),a*.6)}
  else{/* 심해: 위에서 흔들리는 빛줄기, 거품이 오르고, 소나 고리가 보스 자리에서 퍼진다 */
   RA(0,0,W,H,'#03141f',a*.25);for(let i=0;i<5;i++){const x=60+i*95+Math.sin(t*.7+i)*25;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=a*.07;ctx.fillStyle='#bff4ff';ctx.beginPath();ctx.moveTo(x-8,0);ctx.lineTo(x+8,0);ctx.lineTo(x+40,H);ctx.lineTo(x-20,H);ctx.fill();ctx.restore()}
   for(let i=0;i<30;i++){const q=((t*.35)+i/30)%1;cRing((i*61)%W+Math.sin(t*2+i)*5,H-q*H,1+(i%3),'#bff4ff',a*.6*(1-q*.5),1)}
   for(let k=0;k<3;k++){const q=((t*.6)+k/3)%1;cRing(cx,cy,Math.round(10+q*150),col,a*(1-q)*.6,2,.55)}}}

 /* ---------- 익스트림 경보 ---------- */
 function warning(T,B,a){const t=T/1000,bl=Math.floor(t*4)%2;RA(0,0,W,H,'#ff1e3c',a*(.08+.08*bl));
  const yy=H/2-20;RA(0,yy,W,40,'#000',a*.7);for(let x=-40;x<W+40;x+=20){const xo=(x+t*60)%(W+40)-20;ctx.save();ctx.globalAlpha=a*.85;ctx.fillStyle='#ffcf3a';ctx.beginPath();ctx.moveTo(xo,yy);ctx.lineTo(xo+10,yy);ctx.lineTo(xo+4,yy+5);ctx.lineTo(xo-6,yy+5);ctx.fill();ctx.beginPath();ctx.moveTo(xo,yy+35);ctx.lineTo(xo+10,yy+35);ctx.lineTo(xo+4,yy+40);ctx.lineTo(xo-6,yy+40);ctx.fill();ctx.restore()}
  ctx.globalAlpha=a*(bl?1:.75);txt('W A R N I N G',W/2,yy+26,22,'#ff2d55','#1a0006');ctx.globalAlpha=a;txt('EXTREME · 각성 개체 접근',W/2,yy+36,7,'#ffd0d8',null,'center','700');ctx.globalAlpha=1;
  once('siren',()=>{for(let i=0;i<3;i++){sfx(880,.22,'square',.035,660);setTimeout(()=>{try{sfx(660,.22,'square',.035,880)}catch(e){}},240+i*480);setTimeout(()=>{try{sfx(880,.22,'square',.035,660)}catch(e){}},480+i*480)}})}

 /* ---------- 메인 오버레이 ---------- */
 function introDraw(now){try{const bn=$('bossName');if(bn&&bn.style.visibility!=='hidden')bn.style.visibility='hidden'}catch(e){}const c=G.cine,B=G.B,T=now-c.t0,D=c.dur,g=bgeo(),ch=chOf(),ex=diff==='extreme',col=B.c,acc=(B.pal&&B.pal[3])||'#ffe79a';
  const boomT=IN.boom&&IN.boom>=c.t0?now-IN.boom:-1,landed=boomT>=0||T>2600;
  /* 1) 전조 단계: 화면을 덮는 어둠(보스 자리만 열린 비네트) + 챕터 전조 */
  const pre=landed?Math.max(0,1-(boomT>=0?boomT:T-2600)/500):1;
  if(pre>0){const gr=ctx.createRadialGradient(g.x,g.coreY,20,g.x,g.coreY,330);gr.addColorStop(0,'rgba(0,0,0,'+(.25*pre)+')');gr.addColorStop(1,'rgba(0,0,0,'+(.9*pre)+')');ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
   omen(ch,T,g,B,pre*Math.min(1,T/400),ex);
   if(ex&&T>200&&T<1700)warning(T-200,B,Math.min(1,(T-200)/200)*Math.min(1,(1700-T)/250)*pre)}
  /* 2) 눈빛: 착지 직전 어둠 속에서 두 눈이 번쩍 */
  const eyeT=landed?-1:T-(ex?1650:1250);if(eyeT>0&&eyeT<900){const k=eyeT<120?eyeT/120:Math.max(0,1-(eyeT-500)/400),ey=g.headY+(g.coreY-g.headY)*.55,dx=Math.max(6,g.hf*U*.28);
   for(const s of [-1,1]){e2Glow(g.x+s*dx,ey,24,hexA(col,.9),k);e2Star(g.x+s*dx,ey,Math.round(5+k*9),'#ffffff',k);RA(Math.round(g.x+s*dx-8*k),Math.round(ey),Math.round(16*k),1,'#ffffff',k)}once('eye',()=>{sfx(1760,.35,'triangle',.03,2600);sfx(220,.6,'sawtooth',.03,110)})}
  /* 3) 착지 임팩트 프레임: 흰 섬광 → 반전된 집중선 → 충격파 */
  if(boomT>=0&&boomT<520){const k=boomT/520;if(boomT<70){RA(0,0,W,H,'#ffffff',.85)}else if(boomT<150){RA(0,0,W,H,'#000000',.55);}
   ctx.save();ctx.globalAlpha=.8*(1-k);ctx.strokeStyle=boomT<150?'#ffffff':col;ctx.lineWidth=boomT<150?2.4:1.4;const n=36;for(let i=0;i<n;i++){const a=i*TAU/n+(i%3)*.05,r0=40+k*60+(i%4)*8,r1=r0+120+(i%5)*40;ctx.beginPath();ctx.moveTo(g.x+Math.cos(a)*r0,g.coreY+Math.sin(a)*r0);ctx.lineTo(g.x+Math.cos(a)*r1,g.coreY+Math.sin(a)*r1);ctx.stroke()}ctx.restore();
   if(ex&&boomT<400){/* 익스트림: 화면 금 */ctx.save();ctx.globalAlpha=.7*(1-boomT/400);ctx.strokeStyle='#ffffff';ctx.lineWidth=1;for(let i=0;i<7;i++){let x=g.x,y=g.y-6;ctx.beginPath();ctx.moveTo(x,y);const a0=hash(i+'cr')%628/100;for(let s=0;s<6;s++){x+=Math.cos(a0+(hash(i*7+s+'q')%60-30)/60)*22;y+=Math.sin(a0+(hash(i*5+s+'w')%60-30)/60)*16;ctx.lineTo(x,y)}ctx.stroke()}ctx.restore()}}
  if(boomT>=0)once('boom2',()=>{const n2=performance.now();if(ex){fxRing(g.x,g.y-4,n2+120,900,300,'#ffffff');fxRing(g.x,g.coreY,n2+220,1100,340,acc);G.shake=Math.max(G.shake,1.4)}});
  /* 4) 익스트림 각성 오라: 착지 뒤 보스 주위로 타오르는 빛 */
  if(ex&&landed){const k=Math.min(1,(boomT>=0?boomT:0)/600),t=now/1000;ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<34;i++){const q=((t*.9)+i/34)%1,x=g.x+((i*37)%100/100-.5)*g.hf*U*2.4+Math.sin(t*3+i)*4,y=g.y-q*(g.y-g.top+40);ctx.globalAlpha=k*(1-q)*.55;ctx.fillStyle=q<.25?'#ffffff':(i%3?col:acc);const s=Math.max(2,(1-q)*6);ctx.fillRect(x-s/2,y-s,s,s*1.8)}ctx.restore();e2Glow(g.x,g.coreY,140,hexA(col,.35),k*.8)}
  /* 5) 레터박스 (익스트림은 경고 줄무늬) */
  const bin=ease(T/450),bout=T>D-450?ease((D-T)/450):1,bh=Math.round((ex?40:32)*Math.min(bin,bout));R(0,0,W,bh,'#000');R(0,H-bh,W,bh,'#000');
  if(bh>4){RA(0,bh-1,W,1,col,.8);RA(0,H-bh,W,1,col,.8);if(ex){for(let x=-20;x<W+20;x+=14){const xo=((x-now/30)%(W+28)+W+28)%(W+28)-14;RA(Math.round(xo),bh-6,7,3,'#ffcf3a',.7);RA(Math.round(W-xo),H-bh+3,7,3,'#ffcf3a',.7)}}
   ctx.globalAlpha=Math.min(1,T/800);txt((ch===5?'CHAPTER 5 · ABYSS':ch===4?'CHAPTER 4 · ECLIPSE':ch===3?'CHAPTER 3 · ORIGIN':ch===2?'CHAPTER 2 · THE HUNGER':'CHAPTER 1 · BEAT MACHINA')+(ex?'   ·  EXTREME':''),10,bh-11,8,ex?'#ff8a9a':'#a8b8b4',null,'left','700');
   if(T>900)txt('클릭하면 건너뜁니다',W-8,H-bh+14,7,'#7a8a8c',null,'right','400');ctx.globalAlpha=1}
  /* 6) 이름 카드: 아래쪽 1/3에 비스듬한 띠가 쓸고 들어오고, 이름 글자가 하나씩 박힌다 */
  const nameAt=Math.max(landed?(boomT>=0?now-boomT+250:c.t0+2700):c.t0+2900,c.t0+(ex?2900:2400)),nT=now-nameAt;
  if(nT>0&&T<D-150){const out=T>D-450?ease((D-T)/300):1,k=ease(nT/320),y0=H-(ex?40:32)-64;ctx.save();ctx.globalAlpha=out;
   ctx.beginPath();const bx=-40+(1-k)*-W;ctx.moveTo(bx,y0+6);ctx.lineTo(bx+W*.82,y0);ctx.lineTo(bx+W*.82+26,y0+50);ctx.lineTo(bx,y0+56);ctx.closePath();ctx.fillStyle='rgba(4,6,10,.82)';ctx.fill();ctx.strokeStyle=col;ctx.lineWidth=1.5;ctx.stroke();
   ctx.fillStyle=col;ctx.fillRect(bx,y0+56,W*.82*k+20,2);ctx.restore();
   if(nT>180){ctx.save();ctx.globalAlpha=out;
    const tag=(ch===5?'ABYSS '+String((G.s5!=null?G.s5:0)+1).padStart(2,'0')+' / 10':ch===4?'ECLIPSE '+String((G.s4!=null?G.s4:G.s4Rush||0)+1).padStart(2,'0')+' / 10':ch===3?'ORIGIN':'GUARDIAN '+String(G.bi+1).padStart(2,'0')+' / 20');
    const tk=ease((nT-180)/260),tagC=(c2=>{const n=parseInt(c2.slice(1,7),16);return ((n>>16&255)*.3+(n>>8&255)*.59+(n&255)*.11)<120?'#f4d996':c2})(acc);ctx.globalAlpha=out*tk;txt(tag,22-(1-tk)*30,y0+15,8,tagC,null,'left','800');ctx.globalAlpha=out;
    const name=B.name||'',n=[...name],cw=21;ctx.font='900 24px '+FONT_STACK;const full=ctx.measureText(name).width;let x=22;
    n.forEach((chr,i)=>{const lt=nT-260-i*55;if(lt<0)return;const pk=Math.min(1,lt/140),sc=1+(1-pk)*1.6;ctx.save();ctx.translate(x+ctx.measureText(chr).width/2,y0+40);ctx.scale(sc,sc);ctx.globalAlpha=out*Math.min(1,pk*1.5);txt(chr,0,0,24,'#ffffff',col);ctx.restore();ctx.font='900 24px '+FONT_STACK;x+=ctx.measureText(chr).width;if(lt>0&&lt<30)once('l'+i,()=>sfx(200+i*30,.05,'square',.025,120))});
    const allT=nT-260-n.length*55-140;if(allT>0&&allT<420){const sx=22+(full+40)*(allT/420);ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.5*out;ctx.fillStyle='#ffffff';ctx.beginPath();ctx.moveTo(sx-6,y0+20);ctx.lineTo(sx+6,y0+20);ctx.lineTo(sx-4,y0+46);ctx.lineTo(sx-16,y0+46);ctx.fill();ctx.restore()}
    if(allT>0)once('slam',()=>{sfx(60,.3,'sine',.08,35);G.shake=Math.max(G.shake,.25)});
    /* 이름이 박히고 나면 보스가 자기 대표 공격 자세로 위협 (익스트림은 두 번) */
    const roar=(k,at)=>{if(allT>at)once(k,()=>{try{const dk=DECK[G.bi]||[],pick=dk[k==='roar2'?Math.min(1,dk.length-1):0];if(pick)G.curPat={n:pick[0],chan:(typeof CHAN!=='undefined'&&CHAN[pick[0]])||'',at:performance.now()};G.shake=Math.max(G.shake,.45);fxRing(g.x,g.coreY,performance.now(),600,160,col);sfx(48,.9,'sawtooth',.07,30);sfx(96,.5,'square',.04,60)}catch(e){}})};
    roar('roar',200);if(ex)roar('roar2',1900);
    const en=B.en||'';if(allT>60){ctx.globalAlpha=out*ease((allT-60)/300);txt(en,22+full+10,y0+40,8,col,null,'left','800')}
    const epi=((BOSS_META[G.bi]||{}).epi)||'';if(allT>120){const ty=Math.floor(clamp((allT-120)/700,0,1)*[...epi].length);ctx.globalAlpha=out;txt([...epi].slice(0,ty).join(''),22,y0+52,9,'#d8e4e0',null,'left','600')}
    if(ex&&allT>380){const sk=ease((allT-380)/160),s2=1+(1-sk)*2.2;ctx.save();ctx.translate(W-70,y0+30);ctx.rotate(-.18);ctx.scale(s2,s2);ctx.globalAlpha=out*sk;ctx.strokeStyle='#ff2d55';ctx.lineWidth=2;ctx.strokeRect(-48,-13,96,24);txt('AWAKENED',0,6,14,'#ff2d55','#1a0006');ctx.restore();once('stamp',()=>{sfx(90,.25,'square',.06,45);G.shake=Math.max(G.shake,.35)})}
    ctx.restore()}}
  ctx.textAlign='left';ctx.globalAlpha=1}

 try{const _dc=drawCineOverlay;drawCineOverlay=function(now){const c=G.cine;if(!(c&&c.type==='intro'))return _dc.apply(this,arguments);c.type='intro_v43';try{_dc.apply(this,arguments)}finally{c.type='intro'}try{introDraw(now)}catch(e){if(!IN.err){IN.err=1;console.error('v43 intro',e)}}}}catch(e){console.error('v43 intro wrap',e)}
})();

/* ================= v43 전투 맵 퀄리티: 깊이감 있는 대기층 (빛줄기 · 보스 발밑 광원 · 챕터별 떠다니는 입자 · 박자 바닥 파동 · 바닥 안개 · 비네트) ================= */
(function(){
 const chOf=()=>{try{if(G.s5!=null||G._s5hold!=null)return 5;if(G.s4!=null||G.s4Rush!=null)return 4;if(typeof _c3Swap!=='undefined'&&_c3Swap&&_c3Swap.art)return 3;return G.bi<10?1:2}catch(e){return 1}};
 const TH={1:{ray:'#ffe2b0',mote:['#ffb050','#ffe79a','#ffffff'],fog:'#0b1418',kind:'spark'},2:{ray:'#ffb0c8',mote:['#ff5d8f','#ffb070','#caff6b'],fog:'#14060c',kind:'ember'},3:{ray:'#ffe8c0',mote:['#e8d8b0','#c8b088','#ffffff'],fog:'#140f08',kind:'dust'},4:{ray:'#d8d0ff',mote:['#ffffff','#c8b8ff','#9af0ff'],fog:'#05040e',kind:'star'},5:{ray:'#bff4ff',mote:['#bff4ff','#8ae8ff','#ffffff'],fog:'#021018',kind:'bubble'}};
 const AR={vg:null,vgKey:''};
 function layers(now,beat){if(!G||!G.B)return;const ch=chOf(),T=TH[ch],t=now/1000,g=bgeo(),col=G.B.c||'#ffffff';
  ctx.save();
  /* 1) 위에서 내려오는 빛줄기 (천천히 흔들림) */ctx.globalCompositeOperation='lighter';for(let i=0;i<4;i++){const x=AX+AW*(.15+i*.24)+Math.sin(t*.25+i*1.7)*18,w=16+(i%2)*10;ctx.globalAlpha=.045+.025*Math.sin(t*.6+i);const gr=ctx.createLinearGradient(0,AY,0,AY+AH);gr.addColorStop(0,T.ray);gr.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(x-w*.4,AY);ctx.lineTo(x+w*.4,AY);ctx.lineTo(x+w*2.2,AY+AH);ctx.lineTo(x-w*1.4,AY+AH);ctx.closePath();ctx.fill()}
  /* 2) 보스 발밑 광원 + 바닥에 비친 빛 */const pul=Math.pow(1-((beat%1+1)%1),3);ctx.globalAlpha=.16+.08*pul;const R=g.hf*U*2.4+30,lg=ctx.createRadialGradient(g.x,g.y,4,g.x,g.y,R);lg.addColorStop(0,col);lg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=lg;ctx.save();ctx.translate(g.x,g.y);ctx.scale(1,.32);ctx.translate(-g.x,-g.y);ctx.fillRect(g.x-R,g.y-R,R*2,R*2);ctx.restore();
  /* 3) 박자마다 보스에서 바닥으로 퍼지는 파동 */for(let k=0;k<2;k++){const q=(((beat+k*.5)%1)+1)%1;ctx.globalAlpha=(1-q)*.18;ctx.strokeStyle=col;ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(g.x,g.y+2,20+q*170,(20+q*170)*.22,0,0,TAU);ctx.stroke()}
  ctx.globalCompositeOperation='source-over';
  /* 4) 챕터별 떠다니는 입자 (원근: 큰 입자는 빠르고 밝게) */for(let i=0;i<34;i++){const z=(i%3)/2,sp=.04+z*.06,q=((t*sp)+i*.618)%1,x=AX+((i*97.3+Math.sin(t*.3+i)*14)%AW+AW)%AW;let y,s=1+Math.round(z),a=.25+z*.45,c=T.mote[i%T.mote.length];
   if(T.kind==='spark'||T.kind==='ember'){y=AY+AH-q*AH;a*=Math.sin(q*Math.PI)}else if(T.kind==='bubble'){y=AY+AH-q*AH;a*=.8}else if(T.kind==='star'){y=AY+((i*53)%AH);a*=.5+.5*Math.sin(t*2+i*3);s=z>.6?2:1}else{y=AY+((i*61+t*8*(1+z))%AH);a*=.7}
   if(T.kind==='bubble'){ctx.globalAlpha=a;ctx.strokeStyle=c;ctx.lineWidth=1;ctx.beginPath();ctx.arc(Math.round(x),Math.round(y),s+1,0,TAU);ctx.stroke()}else{ctx.globalAlpha=a;ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),s,s);if(T.kind==='star'&&z>.6&&a>.5){ctx.globalAlpha=a*.5;ctx.fillRect(Math.round(x)-2,Math.round(y),5,1);ctx.fillRect(Math.round(x),Math.round(y)-2,1,5)}}}
  /* 5) 심해: 바닥 위로 흐르는 물빛 무늬 */if(ch===5){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.05;ctx.fillStyle='#bff4ff';for(let yy=AY+AH*.45;yy<AY+AH;yy+=6)for(let xx=AX;xx<AX+AW;xx+=8){const v=Math.sin(xx*.05+t*1.3)+Math.sin(yy*.09-t*.9+xx*.02);if(v>1.2)ctx.fillRect(xx,yy,6,2)}ctx.globalCompositeOperation='source-over'}
  /* 6) 바닥 안개 */ctx.globalAlpha=.5;const fg=ctx.createLinearGradient(0,AY+AH-50,0,AY+AH);fg.addColorStop(0,'rgba(0,0,0,0)');fg.addColorStop(1,T.fog);ctx.fillStyle=fg;ctx.fillRect(AX,AY+AH-50,AW,50);
  /* 7) 비네트 */const key=AX+','+AY+','+ch;if(!AR.vg||AR.vgKey!==key){AR.vgKey=key;const v=ctx.createRadialGradient(AX+AW/2,AY+AH*.55,AH*.35,AX+AW/2,AY+AH*.5,AW*.62);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.42)');AR.vg=v}ctx.globalAlpha=1;ctx.fillStyle=AR.vg;ctx.fillRect(AX,AY,AW,AH);
  ctx.restore()}
 try{const _ab=drawArenaBG2;drawArenaBG2=function(now,beat,fr,th){const r=_ab.apply(this,arguments);try{if(mode==='boss')layers(now,G.state==='wake'?now/500:beat)}catch(e){if(!AR.err){AR.err=1;console.error('v43 arena',e)}}return r}}catch(e){console.error('v43 arena wrap',e)}
})();

/* ================= v43 보스가 '직접' 공격: 예고 동안 몸을 젖히며 기를 모으고 → 발동 순간 공격 방향으로 몸을 내지름 · 레이저/탄은 보스 몸에서 에너지가 뻗어 만들어짐 ================= */
(function(){
 const AK={off:[0,0],fireT:-1e9,fireDir:[0,1],fireK:0};
 const coreOf=()=>{const g=bgeo();return [g.x,g.coreY,g]};
 const tgtOf=(o,b)=>{try{if(o.k==='orb')return o.pos(o.t1);if(o.k==='seg'){const a=o.a(o.t1),c=o.b(o.t1);return [(a[0]+c[0])/2,(a[1]+c[1])/2]}if(o.k==='rect')return o.rf?(r=>[r[0]+r[2]/2,r[1]+r[3]/2])(o.rf(o.t1)):[o.x+o.w/2,o.y+o.h/2];if(o.k==='circ')return o.cf?o.cf(o.t1):[o.x,o.y]}catch(e){}return null};
 /* 이번 프레임의 몸 동작 계산 */
 function motion(now,beat){if(!G||G.state!=='play'){AK.off=[0,0];return}const [cx,cy]=coreOf();let best=null,bp=0;
  for(const o of npA()){if(o.harm===false||beat<o.t0||beat>=o.t1)continue;const p=(beat-o.t0)/Math.max(.01,o.t1-o.t0);if(p>bp){bp=p;best=o}}
  let ox=0,oy=0;
  if(best){const tg=tgtOf(best,beat);if(tg){const dx=tg[0]-cx,dy=tg[1]-cy,l=Math.hypot(dx,dy)||1,k=Math.min(1,bp*1.2),pull=3.2*k*k;ox-=dx/l*pull;oy-=dy/l*pull*.7;if(bp>.72){const tr=Math.floor(now/40)%2?1:-1;ox+=tr*.8}}}
  const d=now-AK.fireT;if(d>=0&&d<320){const k=d<70?d/70:1-(d-70)/250,s=7*AK.fireK*Math.max(0,k);ox+=AK.fireDir[0]*s;oy+=AK.fireDir[1]*s*.75}
  AK.off=[ox,oy]}
 /* 발동 순간 기록 (가장 최근 공격 방향으로 내지름) */
 function onFire(now,o,beat){const tg=tgtOf(o,beat);if(!tg)return;const [cx,cy]=coreOf(),dx=tg[0]-cx,dy=tg[1]-cy,l=Math.hypot(dx,dy)||1;if(now-AK.fireT<110&&AK.fireK>=.7)return;AK.fireT=now;AK.fireDir=[dx/l,dy/l];AK.fireK=o.k==='orb'?.55:o.k==='seg'?.9:1}
 /* 보스 몸에서 뻗는 에너지 */
 function conduits(now,beat){if(!G||!(G.state==='play'))return;const [cx,cy,g]=coreOf(),t=now/1000;let chargeP=0,n=0;
  for(const o of npA()){if(o.harm===false)continue;
   if(!o._akF&&beat>=o.t1){o._akF=1;if(beat<o.t1+.3)onFire(now,o,beat)}
   /* 발동 중인 레이저가 보스에게서 멀리서 시작하면: 보스가 먼저 그 지점으로 쏘고, 거기서 꺾여 나가는 것처럼(중계점) */
   if(o.k==='seg'&&beat>=o.t1&&beat<o.t2&&(o.sty||'laser')!=='chain'&&(o.sty||'')!=='hand'){let A;try{A=o.a(beat)}catch(e){A=null}
    if(A&&Math.hypot(A[0]-cx,A[1]-cy)>34){const col=o.col||npCol(),e=beat-o.t1,rem=o.t2-beat,k=Math.min(1,e/.08)*Math.min(1,rem/.15),w=Math.max(1,Math.round((o.w||6)*.45*k));
     line(cx,cy,A[0],A[1],2,(x,y)=>cPx(x,y,w+2,col,.35*k));line(cx,cy,A[0],A[1],2,(x,y)=>cPx(x,y,w,col,.9*k));line(cx,cy,A[0],A[1],2,(x,y)=>cPx(x,y,1,'#ffffff',k));
     const sp=t*4;ctx.save();ctx.translate(A[0],A[1]);ctx.rotate(sp);ctx.globalAlpha=k;ctx.fillStyle='#ffffff';ctx.fillRect(-3,-3,6,6);ctx.strokeStyle=col;ctx.lineWidth=1.5;ctx.strokeRect(-5,-5,10,10);ctx.restore();cRing(A[0],A[1],7+Math.round(Math.sin(t*20)*1.5),col,.8*k,1)}}
   if(beat<o.t0||beat>=o.t1)continue;const p=(beat-o.t0)/Math.max(.01,o.t1-o.t0);chargeP=Math.max(chargeP,p);const col=o.col||npCol();
   if(o.k==='seg'&&n<6){n++;let A;try{A=o.a(o.t1)}catch(e){continue}const d=Math.hypot(A[0]-cx,A[1]-cy);
    if(p>.35){const q=(p-.35)/.65;
     if(d>34){/* 몸 → 포구로 흐르는 기운 */for(let i=0;i<7;i++){const u=((t*2.4)+i/7)%1;if(u>q*1.2)continue;cPx(lerp(cx,A[0],u),lerp(cy,A[1],u)+Math.sin(u*9+t*8)*2,2,i%2?col:'#ffffff',.35+.5*q)}
      line(cx,cy,A[0],A[1],5,(x,y,i)=>{if((i+Math.floor(t*20))%3===0)cPx(x,y,1,col,.25*q)})}
     /* 포구에 모이는 빛 */pcirc(A[0],A[1],Math.max(1,Math.round(2+q*5)),col,.55);pcirc(A[0],A[1],Math.max(1,Math.round(1+q*3)),'#ffffff',.9);for(let i=0;i<5;i++){const a=t*5+i*TAU/5,r=(1-((t*1.8+i/5)%1))*16;cPx(A[0]+Math.cos(a)*r,A[1]+Math.sin(a)*r,2,col,.8)}}}
   else if(o.k==='orb'&&n<10&&p>.55){let S;try{S=o.pos(o.t1)}catch(e){continue}const d=Math.hypot(S[0]-cx,S[1]-cy);if(d<46)continue;n++;
    /* 보스가 던지는 기운: 발사 순간에 정확히 도착하는 짧은 섬광 */const q=(p-.55)/.45,u=q*q,x=lerp(cx,S[0],u),y=lerp(cy,S[1],u)-Math.sin(u*Math.PI)*12;for(let i=0;i<4;i++){const uu=Math.max(0,u-i*.06);cPx(lerp(cx,S[0],uu),lerp(cy,S[1],uu)-Math.sin(uu*Math.PI)*12,3-i*.6,i?col:'#ffffff',.85-i*.18)}}}
  /* 몸의 코어가 차오름 */
  if(chargeP>0){const k=chargeP;try{e2Glow(cx,cy,26+k*30,'rgba(255,255,255,.9)',.12+k*.25)}catch(e){}cRing(cx,cy,Math.round(8+(1-k)*26),npCol(),.25+.55*k,2);if(k>.7&&Math.floor(now/60)%2)cStar(cx,cy,Math.round(4+k*6),'#ffffff',.8)}
  const d=now-AK.fireT;if(d>=0&&d<160){const k=1-d/160;pcirc(cx,cy,Math.round(6+12*(1-k)),'#ffffff',.5*k);cRing(cx,cy,Math.round(10+(1-k)*30),npCol(),k,2)}}
 try{const _nd=npDrawTop;npDrawTop=function(now,beat){try{motion(now,beat)}catch(e){}const r=_nd.apply(this,arguments);try{conduits(now,beat)}catch(e){if(!AK.err){AK.err=1;console.error('v43 atk',e)}}return r}}catch(e){}
 /* 그리기 동안만 보스 위치를 몸 동작만큼 옮김 (판정 계산엔 영향 없음) */
 try{const _ds=drawScene;drawScene=function(now){const b=G&&G.boss,ok=mode==='boss'&&b&&!G.ent&&(AK.off[0]||AK.off[1]);let sx,sy,nx,ny;
   if(ok){sx=b.x;sy=b.y;nx=b.x=sx+AK.off[0];ny=b.y=sy+AK.off[1]}
   try{return _ds.apply(this,arguments)}finally{if(ok){if(b.x===nx)b.x=sx;if(b.y===ny)b.y=sy}}}}catch(e){console.error('v43 ds',e)}
})();

/* ================= v43 이야기 도중 난이도 바꾸기: 전투 화면 위 막대의 [난이도] 버튼 · 일시정지 창 ================= */
(function(){
 const L=()=>(typeof GM_DIFF!=='undefined'?GM_DIFF:[['easy','쉬움','#7dff9a'],['normal','보통','#8ad0ff'],['hard','어려움','#ffb020'],['extreme','익스트림','#ff4d6d']]);
 const cur=()=>L().find(d=>d[0]===diff)||L()[1];
 function setDiff(v){setTimeout(()=>{try{fitBattle()}catch(e){}},0);try{$('diffSel').value=v;updDiff()}catch(e){diff=v;try{localStorage.setItem('beatmachina-diff',v)}catch(_){}}try{saveData.diff=v}catch(e){}try{if(typeof gmHud==='function')gmHud()}catch(e){}paint();try{sfx(660,.08,'square',.04,990)}catch(e){}
  try{if(mode==='boss'&&G&&G.state&&G.state!=='result'&&typeof banner==='function')banner('난이도 · '+cur()[1]+' — 외형·예고는 바로, 체력·패턴 수는 다음 전투부터')}catch(e){}}
 function rowHTML(){return '<div class="v43dRow">'+L().map(d=>'<button data-d="'+d[0]+'" style="--dc:'+d[2]+'" class="'+(d[0]===diff?'on':'')+'">'+d[1]+'</button>').join('')+'</div><small class="v43dNote">외형·예고 시간은 바로, 보스 체력·패턴 수는 다음 전투부터 바뀌어요.</small>'}
 function bind(root){root.querySelectorAll('[data-d]').forEach(b=>{b.onpointerdown=e=>e.stopPropagation();b.onclick=e=>{e.stopPropagation();setDiff(b.dataset.d);root.querySelectorAll('[data-d]').forEach(x=>x.classList.toggle('on',x.dataset.d===diff))}})}
 function paint(){const b=$('v43Diff');if(b){const d=cur();b.innerHTML='<span class="v43lbl">난이도 · </span>'+d[1];b.style.color=d[2]}}
 try{const st=document.createElement('style');st.textContent='#v43Diff{font-weight:800}#v43DiffPop{position:absolute;right:8px;top:40px;z-index:70;background:#0a1014f2;border:1px solid #3a4a50;border-radius:8px;padding:10px;box-shadow:0 6px 24px #000a;max-width:300px}'+
  '.v43dRow{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}.v43dRow button{padding:7px 12px;font-size:12px;border-radius:999px;border:1px solid color-mix(in srgb,var(--dc) 55%,#000);color:var(--dc);background:#0d1418}.v43dRow button.on{background:var(--dc);color:#0a1014;font-weight:900}'+
  '.v43dNote{display:block;margin-top:8px;font-size:10.5px;color:#9fb3ad;text-align:center;line-height:1.5}#overlay .v43dWrap{margin-top:14px;padding-top:12px;border-top:1px solid #2a3437}#overlay .v43dWrap b{display:block;font-size:11px;letter-spacing:2px;color:#a6f5c6;margin-bottom:8px}'+
  '#battleView.mobileWide .v43lbl{display:none}#battleView.mobileWide #v43DiffPop{top:44px}#overlay .v43dRow button{border-radius:999px!important;color:var(--dc)!important;background:#0d1418!important;padding:7px 14px!important;font-size:12px!important;border:1px solid var(--dc)!important;box-shadow:none!important}#overlay .v43dRow button.on{background:var(--dc)!important;color:#0a1014!important;font-weight:900}';(document.head||document.body).appendChild(st)}catch(e){}
 /* 위 막대 버튼 */
 try{const bar=document.querySelector('#battleView .bar > div');if(bar&&!$('v43Diff')){const b=document.createElement('button');b.id='v43Diff';b.onpointerdown=e=>e.stopPropagation();b.onclick=e=>{e.stopPropagation();let p=$('v43DiffPop');if(p){p.remove();return}p=document.createElement('div');p.id='v43DiffPop';p.innerHTML=rowHTML();p.addEventListener('pointerdown',e=>e.stopPropagation());$('battleView').appendChild(p);bind(p)};bar.insertBefore(b,bar.firstChild);paint()}}catch(e){console.error('v43 diff',e)}
 /* 일시정지 창에도 */
 try{const _so=showOverlay;showOverlay=function(tag){const r=_so.apply(this,arguments);try{if(tag==='PAUSED'){const w=document.createElement('div');w.className='v43dWrap';w.innerHTML='<b>난이도</b>'+rowHTML();$('mText').appendChild(w);bind(w)}}catch(e){}return r}}catch(e){}
 /* 로비에서 바꿔도 버튼 표시 갱신, 전투를 나가면 창 닫기 */
 try{const _ud=updDiff;}catch(e){}
 try{const _tl=toLobby;toLobby=function(){try{const p=$('v43DiffPop');if(p)p.remove()}catch(e){}return _tl.apply(this,arguments)}}catch(e){}
 try{const _eg=enterGame;enterGame=function(){const r=_eg.apply(this,arguments);paint();try{fitBattle()}catch(e){}return r}}catch(e){}
})();

/* ================= v43 디자인 보강: 단순했던 보스 6명에 구조·재질 디테일 추가 (모든 난이도) ================= */
(function(){
 const DQ={};
 /* 자석 크레인: 판넬 이음새 · 리벳 · 경광등 · 유압 실린더 · 배기관 */
 DQ.b6=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.5,wW=A.win('wreckingBall'),wP=A.win('scrapPull'),sh=A.shake(wW>.5||wP>.6?.3:0),cr=wW*1.2,top=g.top+b+cr,bot=-4.4+b+cr;
  for(const s of [-1,1])for(const f of [0,1]){const hx=s*(3+f*3.4)+sh,hy=-4.6+b+cr,kx=s*(6+f*4.4)+sh,ky=-7.6+b+cr*.4;A.L(hx,hy-.2,lerp(hx,kx,.7),lerp(hy,ky,.7)-.2,'#d8dde4',.35,.9);A.R(lerp(hx,kx,.25)-.5,lerp(hy,ky,.25)-.6,1,1.2,'#2a2a30')}
  for(const x of [-g.hf*.45,g.hf*.15]){A.L(x+sh,top+3.4,x+sh,bot-1.6,'#0a0806',.3,.7);A.C(x+sh,top+3.6,.3,'#c8b070');A.C(x+sh,bot-2,.3,'#c8b070')}
  for(let i=0;i<6;i++)A.C(-g.hf+1.2+i*(g.hf*2-2.4)/5+sh,bot-1,.28,'#a89a70');
  {const bx=g.hf-3.4+sh,by=top-.4,on=Math.floor(t*2.2)%2===0;A.R(bx-1.1,by,2.2,.6,'#2a2418');A.C(bx,by-.2,1,on?'#ffb020':'#8a5a10');A.R(bx-.3,by-.9,.6,.4,'#ffffff',on?.9:.3);if(on&&!A.dm)A.glow(bx,by-.2,6,'#ffb020',.9)}
  {const px=g.hf-.4+sh,py=top+1.6;A.R(px,py-3.4,1.2,3.6,'#3a3a42');A.R(px-.2,py-3.8,1.6,.6,'#6a6a72');if(!A.dm)A.rise(3,px,px+1.2,py-4,6,.7,'#8a8a92',.9,.3)}};
 /* 광학 요새: 렌즈 황동 고리 · 프리즘 결정 · 측면 렌즈 포트 · 바닥 빛 홈 */
 DQ.b8=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.4,top=g.top+b,ey=g.core+b-.8,R=4.6,wF=Math.min(1,A.win('focusLens')+A.eyeC);
  A.ring(0,ey,R+1.9,.6,'#c8a048');for(let i=0;i<10;i++){const a=i*TAU/10+t*.2;A.C(Math.cos(a)*(R+1.6),ey+Math.sin(a)*(R+1.6),.3,'#fff0b0')}
  for(let i=0;i<24;i++){const a=i*TAU/24-t*.4;if(i%3)A.R(Math.cos(a)*(R+3)-.15,ey+Math.sin(a)*(R+3)-.15,.3,.3,'#8a7a50',.8)}
  for(const s of [-1,1]){const tx=s*(g.hf-1.2),cy=top-8.2,hue=['#ff5a8a','#ffe36b','#5affc8','#7ab8ff'][Math.floor(t*3+s)&3];A.P([[tx,cy-1.6],[tx+1,cy],[tx,cy+1.4],[tx-1,cy]],'#c8f4ff');A.P([[tx,cy-1.6],[tx+1,cy],[tx,cy]],'#ffffff',.8);A.R(tx-.2,cy-.3,.4,.4,hue);if(!A.dm)A.glow(tx,cy,3+wF*3,hue,.6)}
  for(const s of [-1,1]){const px=s*(g.hf-2.8),py=top+6;A.C(px,py,1.1,'#14181e');A.C(px,py,.7,'#5affc8',.9);A.R(px-.25,py-.35,.3,.3,'#ffffff');if(!A.dm)A.glow(px,py,2.4,'#5affc8',.5)}
  if(!A.dm){const p=.5+.5*Math.sin(t*3);A.R(-g.hf+.6,-5.4,g.hf*2-1.2,.35,'#5affc8',.35+.4*p)}};
 /* 풀무: 가죽 띠와 버클 · 송풍 노즐 · 주름 틈 불빛 · 굴뚝 불똥 */
 DQ.c_bellows=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.4,wA=A.win('airBlast'),br=Math.sin(t*2.4)*.5+.5,infl=br*.8+wA*2,sh=A.shake(wA>.6?.3:0),cy=g.core+b,w=g.hf+infl*.6,h=g.bh/2+infl*.4;
  for(let i=1;i<7;i++){const y=cy-h+i*(h*2/7);A.R(-w+1+sh,y-.15,w*2-2,.3,'#ff7a2a',.18+.3*br*(i%2))}
  for(const s of [-1,1]){const x=s*w*.55+sh;A.R(x-.55,cy-h,1.1,h*2,'#2a1810');A.R(x-.55,cy-h,.3,h*2,'#5a3a24',.8);A.R(x-.9,cy-.7,1.8,1.4,'#c8a048');A.R(x-.4,cy-.3,.8,.6,'#2a1810')}
  {const nx=w+.8+sh;A.P([[nx,cy-1.2],[nx+3.2,cy-.5],[nx+3.2,cy+.5],[nx,cy+1.2]],'#8a6a30');A.P([[nx,cy-1.2],[nx+3.2,cy-.5],[nx,cy-.4]],'#c8a048',.9);A.C(nx+3.4,cy,.5,'#ff7a2a');if(!A.dm)A.glow(nx+3.4,cy,2+wA*4,'#ff7a2a',.6+wA)}
  if(!A.dm)A.rise(5,-2+sh,2+sh,g.top+b-5.6,9,.9,'#ffb040',.45,.7)};
 /* 광산의 메아리: 광석 결정 · 광부 랜턴 · 곡괭이 · 모서리 철물 */
 DQ.c_echo=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.5,cy=g.core+b,bot=-4.4+b,top=cy-1;
  for(const [x,y] of [[-g.hf+.4,top],[g.hf-1.2,top],[-g.hf+.4,bot-.8],[g.hf-1.2,bot-.8]])A.R(x,y,.8,.8,'#6a8098');
  for(const [x,h,c] of [[-g.hf+1.2,2.2,'#8ae8ff'],[-g.hf+2.6,1.4,'#c8a0ff'],[g.hf-1.6,1.8,'#8ae8ff']]){A.P([[x-.7,top],[x+.7,top],[x+.2,top-h],[x-.3,top-h+.3]],c);A.R(x-.2,top-h*.7,.3,h*.4,'#ffffff',.7);if(!A.dm)A.glow(x,top-h*.5,2,c,.4)}
  {const lx=-g.hf-1.2,ly=top+1.6,fl=.75+.25*Math.sin(t*9)*Math.sin(t*3.3);A.L(-g.hf,top+.4,lx,ly-1.4,'#4a4a52',.25);A.R(lx-.7,ly-1.4,1.4,2,'#2a2a30');A.R(lx-.45,ly-1,0.9,1.3,'#ffd070',fl);if(!A.dm)A.glow(lx,ly-.4,4,'#ffd070',.7*fl)}
  {const px=g.hf+.6;A.L(px,bot,px+1.6,top-1.4,'#6a4428',.45);A.P([[px+.4,top-1.6],[px+3,top-2.2],[px+1.4,top-1]],'#8a9098');A.R(px+2.4,top-2.3,.4,.3,'#ffffff',.8)}};
 /* 공허 방랑자: 로브 속 별빛 · 밑단의 룬 · 두건 테두리 · 빨려드는 파편 */
 DQ.c_s4_void=A=>{const t=A.t,b=A.bob*.8,cy=-16+b,wG=A.win('gravityWell');
  for(let i=0;i<16;i++){const x=-5+((i*37)%100)/10,y=cy-2+((i*53)%120)/10,tw=.4+.6*Math.abs(Math.sin(t*1.7+i*2.3));A.R(x,y,i%5?.35:.6,i%5?.35:.6,i%3?'#ffffff':'#d8b8ff',tw*.9)}
  for(let i=0;i<7;i++){const x=-6+i*2,y=cy+9.4+((i%2)?.8:0),on=.5+.5*Math.sin(t*2+i);A.R(x-.4,y-.6,.8,.25,'#b86aff',on);A.R(x-.1,y-.9,.25,1,'#b86aff',on);if(!A.dm&&on>.8)A.glow(x,y-.4,1.6,'#b86aff',.5)}
  {const hy=cy-8;A.L(-5.8,hy-1,-4,hy-4.6,'#8a5ab0',.3,.9);A.L(-4,hy-4.6,-1,hy-7,'#8a5ab0',.3,.9);A.L(-1,hy-7,2,hy-6.4,'#8a5ab0',.25,.7)}
  for(let i=0;i<6;i++){const a=t*(.6+wG*2)+i*TAU/6,r=13-((t*.5+i/6)%1)*5;const x=Math.cos(a)*r,y=cy+2+Math.sin(a)*r*.45;A.P([[x-.6,y],[x,y-.7],[x+.7,y+.1],[x,y+.6]],'#2a1c3a');A.R(x-.1,y-.6,.4,.3,'#b86aff',.8)}};
 /* 먼지 원동기: 압력계 · 배관 · 탱크 리벳 */
 DQ.c_dust=A=>{const g=m1G(A.B),t=A.t,b=A.bob*.5,top=g.top+b,cy=g.core+b,wM=A.win('moteCloud'),sh=A.shake(wM>.5?.2:0),R=g.hf-2.4;
  for(let i=0;i<12;i++){const a=i*TAU/12;A.C(sh+Math.cos(a)*(R+.7),cy+Math.sin(a)*(g.bh/2-.5),.28,'#a89ab8')}
  {const gx=g.hf-1.6+sh,gy=top+2.8,nd=-2.2+Math.sin(t*3)*.4+wM*1.5;A.C(gx,gy,1.3,'#1a1420');A.C(gx,gy,1,'#e8d8a0');A.L(gx,gy,gx+Math.cos(nd)*.85,gy+Math.sin(nd)*.85,'#c8202e',.2);A.C(gx,gy,.2,'#1a1420')}
  for(const s of [-1,1]){const px=s*(g.hf+.2)+sh;A.L(px,cy-1,px+s*1.4,cy+1,'#6a5e7a',.7);A.L(px+s*1.4,cy+1,px+s*1.4,-4.6+b,'#6a5e7a',.7);A.L(px,cy-1.2,px+s*1.4,cy+.8,'#a89ab8',.2,.8);A.C(px+s*1.4,cy+1,.45,'#8a7a9a')}};
 for(const k in DQ){const o=MON.reg[k];if(!o)continue;const f=function(A){o(A);try{DQ[k](A)}catch(e){if(!DQ.err){DQ.err=1;console.error('v43 dq',k,e)}}};for(const p in o)f[p]=o[p];if(o.ol)f.ol=o.ol;MON.reg[k]=f}
})();

/* ================= v43 이야기 흐름 · 애니메이션: 장면 전환 효과 · 여정 카드 · 챕터 1·2 자동 결과 카드 · 대화창/결과창 등장 · 주인공 몸짓 ================= */
(function(){
 /* ---------- 1) 장면 전환: 모드가 바뀌는 순간 이전 화면을 붙잡아 두고 새 화면으로 넘김 ---------- */
 const TR={snap:null,t0:0,dur:0,style:'',lastMode:null,lastArt:null};
 function snap(style,dur){try{const s=TR.snap||(TR.snap=document.createElement('canvas'));if(s.width!==cv.width||s.height!==cv.height){s.width=cv.width;s.height=cv.height}const g=s.getContext('2d');g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.globalCompositeOperation='copy';g.drawImage(cv,0,0);g.globalCompositeOperation='source-over';TR.t0=performance.now();TR.dur=dur;TR.style=style}catch(e){}}
 const styleFor=m=>m==='boss'?['iris',700]:m==='cave'?['wipe',650]:m==='journey'?['black',600]:['fade',520];
 function drawTR(now){if(!TR.dur)return;const k=(now-TR.t0)/TR.dur;if(k>=1||mode==='menu'){TR.dur=0;return}const w=cv.width,h=cv.height,S=TR.snap,e=k*k*(3-2*k);ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.imageSmoothingEnabled=false;
  if(TR.style==='fade'){ctx.globalAlpha=1-e;ctx.drawImage(S,0,0)}
  else if(TR.style==='black'){if(k<.5){ctx.drawImage(S,0,0);ctx.globalAlpha=Math.min(1,k*2);ctx.fillStyle='#000';ctx.fillRect(0,0,w,h)}else{ctx.globalAlpha=1-(k-.5)*2;ctx.fillStyle='#000';ctx.fillRect(0,0,w,h)}}
  else if(TR.style==='wipe'){/* 사선으로 쓸어 넘김 + 빛 가장자리 */const x=-h*.4+(w+h*.8)*e;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(w+10,0);ctx.lineTo(w+10,h);ctx.lineTo(x-h*.4,h);ctx.closePath();ctx.save();ctx.clip();ctx.drawImage(S,0,0);ctx.restore();ctx.strokeStyle='#ffffff';ctx.globalAlpha=.8*(1-k);ctx.lineWidth=Math.max(2,w/240);ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x-h*.4,h);ctx.stroke()}
  else if(TR.style==='iris'){/* 전투 진입: 이전 화면이 가운데부터 원형으로 열리며 새 화면이 드러남 */const R=Math.hypot(w,h)*.55*e;ctx.beginPath();ctx.rect(0,0,w,h);ctx.arc(w/2,h*.45,Math.max(1,R),0,TAU,true);ctx.save();ctx.clip('evenodd');ctx.drawImage(S,0,0);ctx.fillStyle='#000';ctx.globalAlpha=.35+.4*e;ctx.fillRect(0,0,w,h);ctx.restore();ctx.globalAlpha=1-k;ctx.strokeStyle='#ffffff';ctx.lineWidth=Math.max(2,w/160);ctx.beginPath();ctx.arc(w/2,h*.45,Math.max(1,R),0,TAU);ctx.stroke()}
  ctx.restore()}

 /* ---------- 2) 여정 카드: 다음 무대로 가는 길 (챕터 1·2) ---------- */
 const JR={on:false};
 const ro=w=>{const c=w.charCodeAt(w.length-1)-0xAC00;if(c<0||c>11171)return '로';const j=c%28;return j===0||j===8?'로':'으로'};
 function journey(ci,next){const now=performance.now();JR.on=true;JR.ci=ci;JR.t0=now;JR.next=next;JR.done=false;mode='journey';paused=false;try{$('dlg').hidden=true;$('overlay').hidden=true;$('bossName').textContent='';$('songInfo').textContent='';$('touch').style.display='none'}catch(e){}
  const prev=BOSSES[ci-1],cave=(STORY[ci]||{}).cave||'';JR.line=(prev?prev.name+'의 박동이 멎었다. ':'')+'길은 '+cave+ro(cave)+' 이어진다.';try{sfx(330,.5,'triangle',.04,440);setTimeout(()=>{try{sfx(495,.6,'triangle',.035,660)}catch(e){}},260)}catch(e){}}
 function jEnd(){if(!JR.on||JR.done)return;JR.done=true;JR.on=false;const f=JR.next;JR.next=null;if(f)f()}
 function drawJourney(now){const ci=JR.ci,T=(now-JR.t0)/1000,base=ci>=10?10:0,ch2=ci>=10,col=ch2?'#ff7ab0':'#a6f5c6',acc='#ffe79a';
  const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,ch2?'#120612':'#06121a');g.addColorStop(1,ch2?'#2a0c22':'#0c2a2a');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  for(let i=0;i<60;i++){const q=((T*.05)+i/60)%1;RA(Math.round((i*83)%W),Math.round(H-q*H),1,1,i%4?'#ffffff':col,.15+.4*Math.sin(q*Math.PI))}
  const nx=i=>48+i*(W-96)/9,ny=i=>150+Math.sin(i*.9)*22;
  ctx.globalAlpha=Math.min(1,T*3);ctx.font='800 9px '+FONT_STACK;ctx.textAlign='center';ctx.fillStyle=col;ctx.fillText(ch2?'CHAPTER 2 · THE HUNGER  —  여정':'CHAPTER 1 · BEAT MACHINA  —  여정',W/2,30);
  for(let i=0;i<9;i++)line(nx(i),ny(i),nx(i+1),ny(i+1),4,(x,y,k)=>{if(k%2===0)cPx(x,y,2,i<ci-base?col:'#3a4a50',.8)});
  for(let i=0;i<10;i++){const B=BOSSES[base+i],x=nx(i),y=ny(i),done=base+i<ci,cur=base+i===ci;
   if(done){pcirc(x,y,7,B.c,1);pcirc(x,y,4,'#ffffff',.9);ctx.font='900 8px '+FONT_STACK;ctx.fillStyle='#0a1014';ctx.fillText('✓',x,y+3)}
   else if(cur){const p=.5+.5*Math.sin(T*5);pcirc(x,y,8,'#0a1014',1);cRing(x,y,9,acc,1,2);cRing(x,y,12+Math.round(p*5),acc,.6*(1-p)+.2,1)}
   else{pcirc(x,y,5,'#1c262a',1);cRing(x,y,6,'#3a4a50',1,1)}
   if(done||cur){ctx.font='700 7px '+FONT_STACK;ctx.fillStyle=cur?acc:'#a8b8b4';ctx.fillText(cur?'?':B.name,x,y+(i%2?-14:22))}}
  /* 주인공이 이전 마디에서 다음 마디로 걸어감 */const k=Math.min(1,Math.max(0,(T-.35)/1.5)),e=k*k*(3-2*k),i0=ci-1-base,hx=lerp(nx(Math.max(0,i0)),nx(ci-base),e),hy=lerp(ny(Math.max(0,i0)),ny(ci-base),e)-Math.abs(Math.sin(T*9))*2*(k<1?1:0);
  try{const sv=shopInv().eq.ch;drawKnight(ctx,hx-12,hy-30,2,false,k<1?T*9:null,k<1?null:T*2)}catch(err){}
  /* 다음 목적지 */const cave=(STORY[ci]||{}).cave||'',q=Math.min(1,Math.max(0,(T-.9)/.5));ctx.globalAlpha=q;RA(0,206,W,62,'#000',.55*q);RA(0,206,W,1,col,q);RA(0,267,W,1,col,q);
  ctx.font='800 8px '+FONT_STACK;ctx.fillStyle=acc;ctx.fillText('NEXT  STAGE  '+String(ci-base+1).padStart(2,'0')+' / 10',W/2,222);ctx.font='900 18px '+FONT_STACK;ctx.lineWidth=3;ctx.strokeStyle='#000';ctx.strokeText(cave,W/2,243);ctx.fillStyle='#ffffff';ctx.fillText(cave,W/2,243);
  const n=Math.floor(Math.max(0,(T-1.3)/1.6)*[...JR.line].length);ctx.font='600 9px '+FONT_STACK;ctx.fillStyle='#d8e4e0';ctx.fillText([...JR.line].slice(0,n).join(''),W/2,259);
  if(T>1.2){ctx.globalAlpha=.5+.5*Math.sin(T*4);ctx.font='700 7px '+FONT_STACK;ctx.fillStyle='#8b9b9c';ctx.fillText('클릭 · 스페이스로 계속',W/2,290)}ctx.globalAlpha=1;ctx.textAlign='left';
  if(T>4.6)jEnd()}
 const jSkip=e=>{if(mode!=='journey'||!JR.on)return;if((now=>now-JR.t0<500)(performance.now()))return;e.preventDefault();e.stopImmediatePropagation();jEnd()};
 addEventListener('keydown',e=>{if(mode==='journey'){if(e.code==='Space'||e.code==='Enter'||e.code==='KeyJ'||e.code==='KeyZ'||e.code==='Escape')jSkip(e);else{e.stopImmediatePropagation()}}},true);
 addEventListener('pointerdown',e=>{if(mode==='journey'&&!(e.target&&e.target.closest&&e.target.closest('button')))jSkip(e)},true);
 try{const _ec=enterCave;enterCave=function(ci){if(story&&ci>0&&ci!==10&&ci<20&&!JR.on)return journey(ci,()=>_ec.call(this,ci));return _ec.apply(this,arguments)}}catch(e){console.error('v43 journey',e)}

 /* ---------- 3) 챕터 1·2 승리: 결과창 버튼 없이 결과 카드 → 다음 이야기로 자동 연결 (챕터 4·5와 같은 흐름) ---------- */
 try{const _so=showOverlay;showOverlay=function(tag,title,text,btns){try{if(tag==='BOSS DOWN'&&G&&G.story&&btns&&btns[0]&&btns[0][0]==='계속 →'&&typeof scPlay==='function'&&typeof cxResultCard==='function'){
    const bi=G.bi,h=G.hits,rank=h===0?'P':h<=2?'S':h<=4?'A':h<=7?'B':'C',m=/\+(\d+)/.exec(text||''),coins=m?+m[1]:0,nb=BOSSES[bi+1],ch2=bi>=10,go=btns[0][1];
    const n=Object.keys(saveData.clear||{}).filter(k=>+k.split('|')[0]<20).map(k=>k.split('|')[0]).filter((v,i,a)=>a.indexOf(v)===i).length;
    $('overlay').hidden=true;scPlay([cxResultCard({tag:(ch2?'CHAPTER 2 · THE HUNGER':'CHAPTER 1 · BEAT MACHINA')+'  ·  수호자 '+(bi%10+1)+' / 10',name:G.B.name,rank,coins,prog:'쓰러뜨린 수호자 '+n+'/20',next:nb&&bi!==9&&bi<19?(STORY[bi+1]||{}).cave||nb.name:null,col:G.B.c,bg0:ch2?'#120612':'#06121a',bg1:ch2?'#2a0c22':'#0c2a2a'})],go);return}}catch(e){console.error('v43 result',e)}
   return _so.apply(this,arguments)}}catch(e){}

 /* ---------- 4) 대화창 · 결과창 · 초상화 등장 애니메이션 ---------- */
 try{const st=document.createElement('style');st.textContent=
  '#dlg:not([hidden]){animation:v43dlg .26s cubic-bezier(.2,.9,.25,1.2)}@keyframes v43dlg{0%{opacity:0;transform:translateY(calc(var(--u)*8)) scale(.97)}100%{opacity:1;transform:none}}'+
  '#dlgPortrait{animation:v43bob 2.6s ease-in-out infinite}@keyframes v43bob{0%,100%{transform:translateY(0)}50%{transform:translateY(calc(var(--u)*-.8))}}'+
  '#dlgName{animation:v43name .3s ease-out}@keyframes v43name{0%{opacity:0;transform:translateX(calc(var(--u)*-6))}100%{opacity:1;transform:none}}'+
  '#overlay:not([hidden]){animation:v43ov .3s ease-out}#overlay:not([hidden]) .modal{animation:v43modal .38s cubic-bezier(.2,.9,.25,1.15)}@keyframes v43ov{0%{opacity:0}100%{opacity:1}}@keyframes v43modal{0%{opacity:0;transform:translateY(14px) scale(.94)}100%{opacity:1;transform:none}}'+
  '#overlay .actions button{animation:v43btn .4s ease-out backwards}#overlay .actions button:nth-child(2){animation-delay:.06s}#overlay .actions button:nth-child(3){animation-delay:.12s}#overlay .actions button:nth-child(4){animation-delay:.18s}@keyframes v43btn{0%{opacity:0;transform:translateY(8px)}100%{opacity:1;transform:none}}';
  (document.head||document.body).appendChild(st)}catch(e){}
 /* 대화 이름이 바뀔 때마다 이름표 애니메이션 다시 */try{const _dl=dlgLine;dlgLine=function(){const r=_dl.apply(this,arguments);try{const n=$('dlgName');n.style.animation='none';void n.offsetWidth;n.style.animation=''}catch(e){}return r}}catch(e){}

 /* ---------- 5) 주인공 몸짓: 이동 방향으로 기울기 · 공격 순간 눌림/늘어남 · 달릴 때 발먼지 ---------- */
 const PM={x:null,y:null,t:0,vx:0,vy:0,dust:0};
 try{const _dk=drawKnight;drawKnight=function(c,x,y,s,fl,wt,idleT){if(c!==ctx||!(mode==='boss'||mode==='cave'||mode==='village')||typeof P==='undefined')return _dk.apply(this,arguments);
   const now=performance.now();if(PM.x!=null&&now>PM.t){const dt=Math.min(.1,(now-PM.t)/1000);if(dt>0){PM.vx+=((P.x-PM.x)/dt-PM.vx)*.25;PM.vy+=((P.y-PM.y)/dt-PM.vy)*.25}}PM.x=P.x;PM.y=P.y;PM.t=now;
   const fx=x+6*s,fy=y+11*s,sk=clamp(PM.vx/140,-1,1)*.09,sp=Math.hypot(PM.vx,PM.vy);let sx=1,sy=1;
   const la=P.lungeT?now-P.lungeT:1e9;if(la>=0&&la<160){const q=la<60?la/60:1-(la-60)/100;sx=1+.12*q;sy=1-.1*q}
   else if(sp<15&&idleT!=null){const br=Math.sin(now/520)*.018;sy=1+br;sx=1-br*.6}
   if(mode==='boss'&&sp>45&&now-PM.dust>130&&G&&G.parts){PM.dust=now;G.parts.push({x:fx-Math.sign(PM.vx||1)*4,y:fy,vx:-PM.vx*.15+(RND()-.5)*20,vy:-10-RND()*15,life:.35,max:.35,col:'#9aa5ad',s:2,g:40})}
   c.save();c.translate(fx,fy);c.transform(1,0,-sk,1,0,0);c.scale(sx,sy);c.translate(-fx,-fy);try{return _dk.apply(this,arguments)}finally{c.restore()}}}catch(e){console.error('v43 knight',e)}

 /* ---------- 프레임: 여정 카드 그리기 + 전환 효과 ---------- */
 try{const _fr=frame;frame=function(){const now=performance.now();
   if(TR.lastMode!==null&&mode!==TR.lastMode&&mode!=='menu'&&TR.lastMode!=='menu'){const [s2,d2]=styleFor(mode);snap(s2,d2)}
   else if(mode==='scene'&&typeof SCN!=='undefined'&&SCN&&TR.lastArt!==null&&SCN.art!==TR.lastArt)snap('fade',420);
   TR.lastMode=mode;TR.lastArt=(typeof SCN!=='undefined'&&SCN)?SCN.art:null;
   const r=_fr.apply(this,arguments);try{if(mode==='journey')drawJourney(now);drawTR(now)}catch(e){if(!TR.err){TR.err=1;console.error('v43 tr',e)}}return r}}catch(e){console.error('v43 frame',e)}
})();
try{const _pz=pause;pause=function(){if(mode==='journey')return;return _pz.apply(this,arguments)}}catch(e){}

/* ================= v43 보스 러시 화면: 가운데 보스가 가끔 자기 공격 동작(준비 → 발사 → 반동)을 보여줌 ================= */
(function(){
 const P=4.8;/* 한 번의 시연 주기(초) */
 const deckOf=o=>{try{if(o.bi!=null&&DECK[o.bi])return DECK[o.bi].map(d=>d[0]);if(o.art){const X=C3BOSS[o.art];if(X&&X.deck)return X.deck.map(d=>d[0]);const s4=(typeof S4!=='undefined'?S4:[]).find(s=>s.art===o.art);if(s4)return s4Deck(s4).map(d=>d[0]);const s5=(typeof S5!=='undefined'?S5:[]).find(s=>s.art===o.art);if(s5)return [s5.sig].concat(Object.keys(MON.alias).slice(0,0))}}catch(e){}return []};
 const seedOf=s=>{let h=7;s=String(s);for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return (h%1000)/1000};
 /* 시연 상태: tc(주기 안 시간), 패턴 이름, 준비/발사 정도 */
 function state(o,now){const names=deckOf(o);if(!names.length)return null;const id=o.art||o.bi,t=now/1000+seedOf(id)*P,cyc=Math.floor(t/P),tc=t-cyc*P,n=names[cyc%names.length];return {n,tc,win:tc<1.3?tc/1.3:0,rel:tc>=1.3&&tc<1.8?1-(tc-1.3)/.5:0,act:tc<2.4}}
 function fx(c,o,x,y,u,now,st){if(!st||!st.act)return;const col=o.c||'#ffffff',cy=y-18*u,t=now/1000;c.save();
  if(st.win>0){/* 기를 모음: 몸 쪽으로 빨려드는 빛 */const k=st.win;c.globalCompositeOperation='lighter';for(let i=0;i<10;i++){const a=t*4+i*TAU/10,r=(1-((t*1.6+i/10)%1))*30*u/3;c.globalAlpha=.6*k;c.fillStyle=i%2?col:'#ffffff';c.fillRect(Math.round(x+Math.cos(a)*r),Math.round(cy+Math.sin(a)*r*.7),2,2)}
   const g=c.createRadialGradient(x,cy,0,x,cy,24*u/3*(.5+k));g.addColorStop(0,'rgba(255,255,255,'+(.5*k)+')');g.addColorStop(1,'rgba(0,0,0,0)');c.globalAlpha=1;c.fillStyle=g;c.fillRect(x-80,cy-80,160,160)}
  if(st.rel>0){/* 발사: 섬광 + 퍼지는 고리 + 바닥 충격파 */const k=st.rel,q=1-k;c.globalCompositeOperation='lighter';c.globalAlpha=k;c.strokeStyle='#ffffff';c.lineWidth=2;c.beginPath();c.arc(x,cy,6+q*40*u/3,0,TAU);c.stroke();c.strokeStyle=col;c.beginPath();c.arc(x,cy,10+q*70*u/3,0,TAU);c.stroke();
   c.globalAlpha=k*.8;c.beginPath();c.ellipse(x,y,10+q*90*u/3,3+q*14*u/3,0,0,TAU);c.stroke();for(let i=0;i<12;i++){const a=i*TAU/12+t,r1=8+q*55*u/3,r2=r1+8;c.globalAlpha=k*.7;c.beginPath();c.moveTo(x+Math.cos(a)*r1,cy+Math.sin(a)*r1);c.lineTo(x+Math.cos(a)*r2,cy+Math.sin(a)*r2);c.stroke()}}
  c.restore()}
 /* 시연 중 몸 움직임: 준비 땐 살짝 들어 올렸다가, 발사 땐 앞으로 쿵 + 떨림 */
 const bodyOff=st=>{if(!st||!st.act)return [0,0];if(st.win>0)return [st.win>.75?(Math.floor(performance.now()/45)%2?1:-1):0,-2*st.win];if(st.rel>0)return [(Math.floor(performance.now()/40)%2?1.5:-1.5)*st.rel,3*st.rel];return [0,0]};
 try{const _rd=rqDrawBoss;rqDrawBoss=function(c,o,x,y,now,u,bo){if(!bo||bo.dorm)return _rd.apply(this,arguments);const st=state(o,now);if(!st)return _rd.apply(this,arguments);
   const b2=Object.assign({},bo);if(st.act){b2.__pat={n:st.n,chan:(typeof CHAN!=='undefined'&&CHAN[st.n])||'',e:st.tc};b2.__act=st.tc<1.8?st.n:null;b2.pulse=Math.max(bo.pulse||0,st.rel);b2.warn=st.win*.6}
   const [ox,oy]=bodyOff(st);const r=_rd.call(this,c,o,x+ox,y+oy,now,u,b2);try{fx(c,o,x,y,u,now,st)}catch(e){}return r}}catch(e){console.error('v43 rush',e)}
 /* 챕터 5 패널 미리보기도 같은 방식 */
 try{const _ca=c3ArtOn;c3ArtOn=function(c,art,x,y,now,u,o){if(!(typeof S5UI!=='undefined'&&S5UI.open&&u===3.5&&o&&o.pulse===.1&&c.canvas&&c.canvas.id==='s5Preview'))return _ca.apply(this,arguments);
   const s5=S5.find(s=>s.art===art),ob={art,c:s5&&s5.c};const st=state(ob,now);if(!st)return _ca.apply(this,arguments);const o2=Object.assign({},o);if(st.act){o2.__pat={n:st.n,chan:'',e:st.tc};o2.__act=st.tc<1.8?st.n:null;o2.pulse=Math.max(o.pulse,st.rel)}
   const [ox,oy]=bodyOff(st);const r=_ca.call(this,c,art,x+ox,y+oy,now,u,o2);try{fx(c,ob,x,y,u,now,st)}catch(e){}return r}}catch(e){}
})();

/* ================= v43 난이도별 보스 외형 단계: 쉬움(기본) → 보통(디테일 일부) → 어려움(컨셉 디테일 전부 + 각성 빛) → 익스트림(완전 각성 리마스터) ================= */
(function(){
 const TIER=()=>({easy:0,normal:1,hard:2,extreme:3})[typeof diff!=='undefined'?diff:'normal']||0;
 window.__tier=TIER;
 /* 보통·어려움: 익스트림의 보스별 디테일층(EXU)을 단계적으로 켬 — 보통은 몸 위 디테일만, 어려움은 몸 뒤 부위까지 */
 try{const _md=monDraw;monDraw=function(key,c,B){const tr=TIER(),U=EXU[key],orig=MON.reg[key];if(!(tr===1||tr===2)||!U||!orig)return _md.apply(this,arguments);
   const f=function(A){A.ex=true;A.tier=tr;if(tr>=2&&U.pre)try{U.pre(A)}catch(e){}orig(A);if(U.post)try{if(tr===1){const s=A.c,ga=s.globalAlpha;U.post(A);s.globalAlpha=ga}else U.post(A)}catch(e){}};f.ol=orig.ol;for(const k in orig)f[k]=orig[k];
   MON.reg[key]=f;try{return _md.apply(this,arguments)}finally{MON.reg[key]=orig}}}catch(e){console.error('v43 tier',e)}
 /* 어려움: 몸을 감싸는 각성 빛 테두리 + 바닥 빛 고리 (익스트림보다 은은하게) */
 const HG={tmp:null};
 try{const _mf=monFinish;monFinish=function(c,A,x,y,u,ol){try{if(TIER()===2&&A&&!A.dm&&A.B){const M=monCv(),F=M.S,W2=F.width,H2=F.height,uu=u*(A.sc||1),k=uu/M.D,sx=Math.round(x-M.OX*uu),sy=Math.round(y-M.OY*uu),sw=Math.round(W2*k),sh=Math.round(H2*k),col=A.B.c||'#ffffff',t=A.t||0;
    const T=HG.tmp||(HG.tmp=document.createElement('canvas'));if(T.width!==W2||T.height!==H2){T.width=W2;T.height=H2}const g=T.getContext('2d');g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='copy';g.drawImage(F,0,0);g.globalCompositeOperation='source-in';g.fillStyle=col;g.fillRect(0,0,W2,H2);g.globalCompositeOperation='source-over';
    const ga=c.globalAlpha,gco=c.globalCompositeOperation,sm=c.imageSmoothingEnabled;c.save();c.globalCompositeOperation='lighter';c.imageSmoothingEnabled=false;const pul=.5+.5*Math.sin(t*2.6),o=Math.max(1,Math.round(uu*.7));for(const [dx,dy] of [[-o,0],[o,0],[0,-o],[0,o]]){c.globalAlpha=ga*(.22+.1*pul);c.drawImage(T,sx+dx,sy+dy,sw,sh)}
    c.globalCompositeOperation='lighter';c.globalAlpha=ga*.35;c.strokeStyle=col;c.lineWidth=Math.max(1,uu*.3);c.beginPath();const bb=A.bbox||[-14,-30,14,0],hw=((bb[2]-bb[0])/2+5)*uu;c.ellipse(x,y+uu*.3,hw,hw*.18,0,0,TAU);c.stroke();c.restore();c.globalAlpha=ga;c.globalCompositeOperation=gco;c.imageSmoothingEnabled=sm}}catch(e){}return _mf.apply(this,arguments)}}catch(e){}
})();
/* ================= v43 안전장치: 음수 반지름으로 원을 그리면 브라우저가 오류를 내며 그 애니메이션이 멈춤 (시작 화면 등) → 0으로 고정 ================= */
(function(){try{const P=CanvasRenderingContext2D.prototype,a=P.arc,e=P.ellipse;P.arc=function(x,y,r,s,en,cc){return a.call(this,x,y,r>0?r:0,s,en,cc)};if(e)P.ellipse=function(x,y,rx,ry,rot,s,en,cc){return e.call(this,x,y,rx>0?rx:0,ry>0?ry:0,rot,s,en,cc)}}catch(e){}})();
