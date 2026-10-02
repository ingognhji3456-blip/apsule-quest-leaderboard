/* ================= v43 등장씬 시네마틱: 챕터 컨셉별 전조 → 눈빛 → 착지 임팩트 프레임 → 이름 카드 (익스트림은 경보·각성 연출 추가) =================
   보스마다 다른 '움직임'(솟아오름·낙하·조립 등)은 기존 정의를 그대로 쓰고, 그 위의 연출층(어둠·전조·이름판)을 새로 만든다. */
(function(){
 const IN={boom:0,boomN:0,last:null};
 const chOf=()=>{try{if(G.s7!=null)return 7;if(G.s6!=null)return 6;if(G.s5!=null||G._s5hold!=null)return 5;if(G.s4!=null||G.s4Rush!=null)return 4;if(typeof _c3Swap!=='undefined'&&_c3Swap&&_c3Swap.art)return 3;return G.bi<10?1:2}catch(e){return 1}};
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
  else if(ch===7){/* 거울: 화면이 좌우로 접혔다 펴지며 거울 조각이 보스 자리로 모임 */
   RA(0,0,W,H,'#140e24',a*.3);const fold=Math.abs(Math.sin(t*1.6))*(1-Math.min(1,t/1.6));RA(cx-W*fold*.5,0,W*fold,H,'#e0ccff',a*.12);
   for(let i=0;i<24;i++){const q=((t*.55)+i/24)%1,ang=i*2.4,r=(1-q)*220,x=cx+Math.cos(ang)*r,y=cy+Math.sin(ang)*r*.6;cStar(Math.round(x),Math.round(y),1+(i%2),i%3?'#e0ccff':'#b8fff6',a*q)}
   for(let k=0;k<2;k++){const q=((t*.5)+k/2)%1;cRing(cx,cy,Math.round(10+q*120),col,a*(1-q)*.5,2,.5)}line(cx,AY,cx,AY+AH,4,(px,py)=>cPx(px,py,1,'#ffffff',a*.25))}
  else if(ch===6){/* 하늘: 구름이 갈라지고 바람 줄기가 보스 자리로 휘감기며 모임 */
   RA(0,0,W,H,'#f0a070',a*.12);for(let i=0;i<8;i++){const x=((i*83+t*30)%(W+120))-60,y=50+i*24;for(let j=0;j<4;j++)pcirc(Math.round(x+j*14),Math.round(y+Math.sin(j)*3),10-j,'#ffffff',a*.18)}
   for(let i=0;i<30;i++){const q=((t*.6)+i/30)%1,ang=i*2.4+t*2,r=(1-q)*240;line(cx+Math.cos(ang)*r,cy+Math.sin(ang)*r*.5,cx+Math.cos(ang+.25)*(r-14),cy+Math.sin(ang+.25)*(r-14)*.5,3,(px,py)=>cPx(px,py,1,'#ffffff',a*q*.8))}
   for(let k=0;k<2;k++){const q=((t*.5)+k/2)%1;cRing(cx,cy,Math.round(10+q*120),col,a*(1-q)*.5,2,.5)}}
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
   ctx.globalAlpha=Math.min(1,T/800);txt((ch===7?'CHAPTER 7 · REVERSE':ch===6?'CHAPTER 6 · ZENITH':ch===5?'CHAPTER 5 · ABYSS':ch===4?'CHAPTER 4 · ECLIPSE':ch===3?'CHAPTER 3 · ORIGIN':ch===2?'CHAPTER 2 · THE HUNGER':'CHAPTER 1 · BEAT MACHINA')+(ex?'   ·  EXTREME':''),10,bh-11,8,ex?'#ff8a9a':'#a8b8b4',null,'left','700');
   if(T>900)txt('클릭하면 건너뜁니다',W-8,H-bh+14,7,'#7a8a8c',null,'right','400');ctx.globalAlpha=1}
  /* 6) 이름 카드: 아래쪽 1/3에 비스듬한 띠가 쓸고 들어오고, 이름 글자가 하나씩 박힌다 */
  const nameAt=Math.max(landed?(boomT>=0?now-boomT+250:c.t0+2700):c.t0+2900,c.t0+(ex?2900:2400)),nT=now-nameAt;
  if(nT>0&&T<D-150){const out=T>D-450?ease((D-T)/300):1,k=ease(nT/320),y0=H-(ex?40:32)-64;ctx.save();ctx.globalAlpha=out;
   ctx.beginPath();const bx=-40+(1-k)*-W;ctx.moveTo(bx,y0+6);ctx.lineTo(bx+W*.82,y0);ctx.lineTo(bx+W*.82+26,y0+50);ctx.lineTo(bx,y0+56);ctx.closePath();ctx.fillStyle='rgba(4,6,10,.82)';ctx.fill();ctx.strokeStyle=col;ctx.lineWidth=1.5;ctx.stroke();
   ctx.fillStyle=col;ctx.fillRect(bx,y0+56,W*.82*k+20,2);ctx.restore();
   if(nT>180){ctx.save();ctx.globalAlpha=out;
    const tag=(ch===7?'REVERSE '+String((G.s7||0)+1).padStart(2,'0')+' / 10':ch===6?'ZENITH '+String((G.s6||0)+1).padStart(2,'0')+' / 10':ch===5?'ABYSS '+String((G.s5!=null?G.s5:0)+1).padStart(2,'0')+' / 10':ch===4?'ECLIPSE '+String((G.s4!=null?G.s4:G.s4Rush||0)+1).padStart(2,'0')+' / 10':ch===3?'ORIGIN':'GUARDIAN '+String(G.bi+1).padStart(2,'0')+' / 20');
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

