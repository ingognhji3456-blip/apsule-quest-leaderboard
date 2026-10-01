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

