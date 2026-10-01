/* ================= 화려한 로비 =================
   움직이는 배경(시계탑 · 톱니 · 오로라 · 별똥별 · 박자 파동) · 반짝이는 로고와 버튼 · 타이틀 화면 효과 · 보스 메달 전당 · 시작 스플래시 */
const LB={cv:null,c:null,w:320,h:200,last:0,stars:[],gears:[],shoot:[],parts:[]};
(function(){try{if(typeof document==='undefined')return;
 const st=document.createElement('style');st.textContent=`
 #lobbyBg{position:fixed;inset:0;width:100vw;height:100vh;z-index:0;image-rendering:pixelated;pointer-events:none}
 body.inBattle #lobbyBg{display:none}
 header,main{position:relative;z-index:1}
 header{border-bottom:1px solid #ffffff14!important;backdrop-filter:blur(3px)}
 .panel{background:rgba(20,28,32,.72)!important;backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);border-color:#ffffff22!important;box-shadow:0 8px 30px #0008,inset 0 1px 0 #ffffff14;transition:transform .2s,box-shadow .2s}
 .panel:hover{transform:translateY(-2px);box-shadow:0 12px 36px #000a,0 0 0 1px #a6f5c633,inset 0 1px 0 #ffffff22}
 .logo{font-size:22px!important;letter-spacing:.18em;text-shadow:0 0 12px #a6f5c688}
 .logo b{background:linear-gradient(90deg,#a6f5c6,#ffe36b,#ff8fb0,#8ad0ff,#a6f5c6);background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent!important;animation:lbShine 4s linear infinite;filter:drop-shadow(0 0 6px #a6f5c6aa)}
 @keyframes lbShine{to{background-position:300% 0}}
 .hero{border:0!important;border-radius:10px!important;box-shadow:0 18px 50px #000b}
 .hero::before{content:'';position:absolute;inset:0;border-radius:10px;padding:2px;background:conic-gradient(from var(--lbA,0deg),#a6f5c6,#ffe36b,#ff8fb0,#8ad0ff,#a6f5c6);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;z-index:3;pointer-events:none;animation:lbSpin 6s linear infinite;opacity:.85}
 @property --lbA{syntax:'<angle>';inherits:false;initial-value:0deg}
 @keyframes lbSpin{to{--lbA:360deg}}
 .hero::after{content:'';position:absolute;top:0;bottom:0;width:30%;left:-40%;background:linear-gradient(100deg,transparent,#ffffff18,transparent);animation:lbSweep 5.5s ease-in-out infinite;pointer-events:none;z-index:2}
 @keyframes lbSweep{0%,60%{left:-40%}100%{left:130%}}
 .heroText h1{text-shadow:0 0 18px #ffffff44,0 4px 0 #0008}
 .heroText h1 span{background:linear-gradient(180deg,#fff6c8,#ffb050 55%,#ff6a3a);-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important;filter:drop-shadow(0 0 10px #ffb05088);animation:lbPulse 1s ease-in-out infinite}
 .ch2Hero .heroText h1 span{background:linear-gradient(180deg,#ffe0ff,#ff4dd2 55%,#8a2aff)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important;filter:drop-shadow(0 0 10px #ff4dd288)}
 @keyframes lbPulse{0%,100%{filter:drop-shadow(0 0 8px #ffb05088)}50%{filter:drop-shadow(0 0 18px #ffb050cc)}}
 button.primary{position:relative;overflow:hidden;box-shadow:0 0 0 1px #a6f5c688,0 0 18px #a6f5c666;animation:lbBtn 1.6s ease-in-out infinite}
 button.primary::after{content:'';position:absolute;top:0;bottom:0;width:40%;left:-60%;background:linear-gradient(100deg,transparent,#ffffffaa,transparent);animation:lbBtnSweep 2.8s ease-in-out infinite}
 @keyframes lbBtn{0%,100%{box-shadow:0 0 0 1px #a6f5c688,0 0 14px #a6f5c655}50%{box-shadow:0 0 0 1px #a6f5c6,0 0 26px #a6f5c6aa}}
 @keyframes lbBtnSweep{0%,55%{left:-60%}100%{left:130%}}
 button:not(.tbtn){transition:transform .12s,filter .12s}button:not(.tbtn):hover{transform:translateY(-1px);filter:brightness(1.15)}button:not(.tbtn):active{transform:translateY(1px) scale(.98)}
 .pagerNav .dot.active{box-shadow:0 0 10px #a6f5c6}
 .pagerNav{background:rgba(8,14,18,.78);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border:1px solid #ffffff22;border-radius:999px;padding:4px 10px;width:max-content;margin-left:auto;margin-right:auto;box-shadow:0 4px 18px #0008}
 .pagerLabel{color:#e8f4ee!important}
 #medalRow{display:grid;grid-template-columns:repeat(10,1fr);gap:6px;margin-top:12px}
 #medalRow .md{position:relative;aspect-ratio:1;border-radius:8px;background:#0b1418;border:1px solid #ffffff18;overflow:hidden}
 #medalRow .md canvas{width:100%;height:100%;image-rendering:pixelated;display:block}
 #medalRow .md.off canvas{filter:grayscale(1) brightness(.35)}
 #medalRow .md .rk{position:absolute;right:2px;bottom:1px;font:bold 11px sans-serif;text-shadow:0 0 3px #000,0 0 6px #000}
 #medalRow .md.P{border-color:#fff6cf;box-shadow:0 0 12px #fff6cf88}#medalRow .md.S{border-color:#f4d996;box-shadow:0 0 8px #f4d99666}
 #statsBar{height:8px;border-radius:4px;background:#0b1418;margin-top:10px;overflow:hidden;border:1px solid #ffffff18}
 #statsBar i{display:block;height:100%;background:linear-gradient(90deg,#a6f5c6,#ffe36b,#ff8fb0);box-shadow:0 0 10px #ffe36b}
 @media (max-width:640px){#medalRow{grid-template-columns:repeat(5,1fr)}}
 #splash{position:fixed;inset:0;z-index:99999;background:#05070c;display:flex;align-items:center;justify-content:center;flex-direction:column;cursor:pointer;transition:opacity .5s}
 #splash canvas{width:min(96vw,900px);image-rendering:pixelated}
 #splash .tap{color:#cfe8d0;font:bold 14px sans-serif;letter-spacing:.3em;margin-top:18px;animation:lbBlink 1s steps(2) infinite}
 @keyframes lbBlink{50%{opacity:.2}}`;document.head.appendChild(st);
 LB.cv=document.createElement('canvas');LB.cv.id='lobbyBg';LB.cv.width=LB.w;LB.cv.height=LB.h;document.body.insertBefore(LB.cv,document.body.firstChild);LB.c=LB.cv.getContext('2d');
 const r=rng(777);for(let i=0;i<90;i++)LB.stars.push({x:r()*LB.w,y:r()*LB.h*.75,s:r()<.12?2:1,p:r()*6});
 LB.gears=[{x:18,y:30,r:26,n:12,sp:.15},{x:302,y:40,r:34,n:14,sp:-.1},{x:40,y:176,r:30,n:13,sp:-.12},{x:290,y:170,r:22,n:10,sp:.2}];
 splashStart()}catch(e){console.error(e)}})();
function lbGear(c,x,y,r,n,a,col){c.fillStyle=col;for(let i=0;i<n;i++){const q=a+i*TAU/n;c.fillRect(Math.round(x+Math.cos(q)*(r+2)-2),Math.round(y+Math.sin(q)*(r+2)-2),4,4)}c.beginPath();c.arc(x,y,r,0,TAU);c.fill();c.globalCompositeOperation='destination-out';c.beginPath();c.arc(x,y,r*.45,0,TAU);c.fill();c.globalCompositeOperation='source-over'}
function drawLobbyBg(now){if(!LB.c)return;if(now-LB.last<33)return;LB.last=now;const c=LB.c,w=LB.w,h=LB.h,t=now/1000,ch2=document.querySelector('.pagerTrack.p1')!==null;
 const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,ch2?'#12061c':'#050c18');g.addColorStop(.55,ch2?'#2a0c2e':'#0c2230');g.addColorStop(1,ch2?'#140818':'#081418');c.fillStyle=g;c.fillRect(0,0,w,h);
 // 오로라
 for(let k=0;k<3;k++){c.globalAlpha=.12;c.fillStyle=ch2?['#ff4dd2','#8a2aff','#ff8fb0'][k]:['#a6f5c6','#4dc3ff','#ffe36b'][k];for(let x=0;x<w;x+=2){const y=40+k*14+Math.sin(x*.03+t*.6+k)*10+Math.sin(x*.011-t*.3)*8;c.fillRect(x,y,2,18+Math.sin(x*.05+t+k)*6)}}c.globalAlpha=1;
 for(const s of LB.stars){const a=.35+.65*Math.abs(Math.sin(t*1.3+s.p));c.globalAlpha=a;c.fillStyle='#ffffff';c.fillRect(Math.round(s.x),Math.round(s.y),s.s,s.s)}c.globalAlpha=1;
 // 별똥별
 if(Math.random()<.02)LB.shoot.push({x:Math.random()*w,y:Math.random()*60,t:now});LB.shoot=LB.shoot.filter(s=>now-s.t<700);for(const s of LB.shoot){const k=(now-s.t)/700;for(let i=0;i<12;i++){c.globalAlpha=(1-k)*(1-i/12);c.fillStyle='#fff6d0';c.fillRect(Math.round(s.x+k*90-i*2),Math.round(s.y+k*40-i),2,1)}}c.globalAlpha=1;
 // 톱니 실루엣
 for(const gr of LB.gears)lbGear(c,gr.x,gr.y,gr.r,gr.n,t*gr.sp,ch2?'#1e0c24':'#0e1c26');
 // 거대한 시계탑
 const tx=w/2,ty=h;c.fillStyle=ch2?'#0e0612':'#07121a';c.fillRect(tx-26,ty-150,52,150);for(let k=0;k<12;k++){c.fillRect(tx-30+k*2.5,ty-150-k*2,60-k*5,2)}c.fillRect(tx-2,ty-190,4,20);
 const cy=ty-118,beat=(t*2)%1,pulse=Math.pow(1-beat,3);c.fillStyle=ch2?'#3a1030':'#123040';c.beginPath();c.arc(tx,cy,18,0,TAU);c.fill();c.fillStyle=ch2?'#ffb0e8':'#fff4c8';c.globalAlpha=.85+.15*pulse;c.beginPath();c.arc(tx,cy,15,0,TAU);c.fill();c.globalAlpha=1;
 c.strokeStyle='#2a1a1a';c.lineWidth=1.5;c.beginPath();c.moveTo(tx,cy);c.lineTo(tx+Math.cos(t*.8)*11,cy+Math.sin(t*.8)*11);c.moveTo(tx,cy);c.lineTo(tx+Math.cos(t*.07)*7,cy+Math.sin(t*.07)*7);c.stroke();
 // 박자 파동
 for(let k=0;k<3;k++){const q=((t*.5)+k/3)%1;c.globalAlpha=.35*(1-q);c.strokeStyle=ch2?'#ff4dd2':'#a6f5c6';c.lineWidth=1;c.beginPath();c.arc(tx,cy,18+q*140,0,TAU);c.stroke()}c.globalAlpha=1;
 const gl=c.createRadialGradient(tx,cy,0,tx,cy,60);gl.addColorStop(0,ch2?'rgba(255,77,210,.35)':'rgba(255,240,180,.35)');gl.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gl;c.fillRect(tx-60,cy-60,120,120);
 // 지붕들
 for(let i=0;i<14;i++){const x=i*26-8,bh=18+((i*37)%22);if(Math.abs(x+10-tx)<40)continue;c.fillStyle=ch2?'#0a040e':'#040a10';c.fillRect(x,h-bh,24,bh);c.beginPath();c.moveTo(x-2,h-bh);c.lineTo(x+12,h-bh-10);c.lineTo(x+26,h-bh);c.fill();if(((i*7+Math.floor(t))%5)<3){c.fillStyle=ch2?'#ff8fd8':'#ffd88a';c.fillRect(x+9,h-bh+6,4,4)}}
 // 떠오르는 빛가루 · 음표
 if(LB.parts.length<40&&Math.random()<.4)LB.parts.push({x:Math.random()*w,y:h+4,vy:-8-Math.random()*16,vx:(Math.random()-.5)*4,n:Math.random()<.15,col:ch2?['#ff4dd2','#b89cff','#ffd0f0'][Math.floor(Math.random()*3)]:['#a6f5c6','#ffe36b','#8ad0ff'][Math.floor(Math.random()*3)]});
 const dt=.033;for(const p of LB.parts){p.x+=p.vx*dt+Math.sin(t*2+p.y*.05)*.2;p.y+=p.vy*dt;c.globalAlpha=Math.min(1,p.y/h*1.5);c.fillStyle=p.col;if(p.n){c.fillRect(Math.round(p.x),Math.round(p.y),2,2);c.fillRect(Math.round(p.x)+1,Math.round(p.y)-5,1,5);c.fillRect(Math.round(p.x)+2,Math.round(p.y)-5,2,1)}else c.fillRect(Math.round(p.x),Math.round(p.y),1,1)}c.globalAlpha=1;LB.parts=LB.parts.filter(p=>p.y>-10);
 const vg=c.createRadialGradient(w/2,h/2,h*.3,w/2,h/2,h*.9);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.55)');c.fillStyle=vg;c.fillRect(0,0,w,h)}
/* 타이틀 캔버스 위 효과 */
function drawTitleFX(now){try{const t=now/1000;for(const [cvId,ch2] of [['titleCv',false],['titleCv2',true]]){const cvv=$(cvId);if(!cvv)continue;const c=cvId==='titleCv'?tctx:cvv.getContext('2d');if(!c)continue;
  const beat=(t*2)%1,pulse=Math.pow(1-beat,3),col=ch2?'#ff4dd2':'#a6f5c6';
  // 바닥 조명 줄기
  for(let k=0;k<3;k++){const a=Math.sin(t*.7+k*2.1)*.5,x0=160+k*120;c.save();c.globalAlpha=.07+.05*pulse;c.fillStyle=col;c.beginPath();c.moveTo(x0-6,190);c.lineTo(x0+6,190);c.lineTo(x0+6+Math.sin(a)*120+40,0);c.lineTo(x0-6+Math.sin(a)*120-40,0);c.closePath();c.fill();c.restore()}
  // 바닥 박자 파동
  c.save();c.globalAlpha=.5*pulse;c.fillStyle=col;c.fillRect(0,158,480,1);c.globalAlpha=.25*pulse;c.fillRect(0,159,480,3);c.restore();
  // 반짝이 · 음표
  for(let i=0;i<14;i++){const q=((t*.25)+i/14)%1,x=(i*67+Math.sin(t+i)*10)%480,y=170-q*170;c.save();c.globalAlpha=(1-q)*.9;c.fillStyle=i%3===0?'#ffe36b':col;if(i%4===0){c.fillRect(x,y,3,3);c.fillRect(x+2,y-7,1,7);c.fillRect(x+3,y-7,3,1)}else{c.fillRect(x,y,1,1);if(i%2)c.fillRect(x-1,y,3,1),c.fillRect(x,y-1,1,3)}c.restore()}
  // 별똥별
  const sp=(t*.23+(ch2?.5:0))%1;if(sp<.25){const k=sp/.25;for(let i=0;i<16;i++){c.save();c.globalAlpha=(1-k)*(1-i/16);c.fillStyle='#fff6d0';c.fillRect(260+k*200-i*2.2,10+k*50-i,2,1);c.restore()}}}}catch(e){}}
/* 명예의 전당: 보스 메달 */
function buildMedals(){try{const panel=$('statsPanel');if(!panel)return;let row=$('medalRow');if(!row){panel.insertAdjacentHTML('beforeend','<div id="statsBar"><i style="width:0"></i></div><div id="medalRow"></div>');row=$('medalRow')}
 const best={};for(const [k,v] of Object.entries(saveData.clear||{})){const bi=+k.split('|')[0],o='PSABC';if(best[bi]===undefined||o.indexOf(v)<o.indexOf(best[bi]))best[bi]=v}
 const n=Object.keys(best).length;$('statsBar').firstChild.style.width=(n/20*100)+'%';row.innerHTML='';
 BOSSES.forEach((B,i)=>{const d=document.createElement('div'),rk=best[i];d.className='md'+(rk?' '+rk:' off');d.title=B.name+(rk?' · '+rk:' · 미클리어');const cc=document.createElement('canvas');cc.width=48;cc.height=48;const x=cc.getContext('2d');x.imageSmoothingEnabled=false;
  const gg=x.createLinearGradient(0,0,0,48);gg.addColorStop(0,shade(B.c,.18));gg.addColorStop(1,shade(B.c,.4));x.fillStyle=gg;x.fillRect(0,0,48,48);try{drawMech(x,B,24,44,0,{still:true,pulse:0,expose:false,open:0,eye:0,dorm:false,flash:false,warn:0},1.1)}catch(e){}
  d.appendChild(cc);if(rk){const s=document.createElement('span');s.className='rk';s.textContent=rk==='P'?'★':rk;s.style.color=rk==='P'?'#fff6cf':rk==='S'?'#f4d996':'#cfe8d0';d.appendChild(s)}row.appendChild(d)})}catch(e){}}
/* 시작 스플래시 */
function splashStart(){let sp=document.getElementById('splash');if(!sp){sp=document.createElement('div');sp.id='splash';sp.innerHTML='<canvas width="480" height="200"></canvas><div class="tap">TAP / PRESS ANY KEY</div>';document.body.appendChild(sp)}
 sp.classList.add('live');document.body.appendChild(sp);const cc=sp.querySelector('canvas'),x=cc.getContext('2d'),t0=performance.now();let raf=0,done=false;
 const end=()=>{if(done)return;done=true;try{initAudio&&initAudio()}catch(e){}sp.style.opacity='0';setTimeout(()=>{sp.remove();cancelAnimationFrame(raf)},520);removeEventListener('keydown',end,true)};
 setTimeout(()=>{if(done)return;sp.addEventListener('pointerdown',end);addEventListener('keydown',end,true)},250);
const parts=[];const loop=now=>{const t=(now-t0)/1000;x.setTransform(1,0,0,1,0,0);x.fillStyle='#05070c';x.fillRect(0,0,480,200);
  const r=rng(5);for(let i=0;i<60;i++){x.globalAlpha=.3+.5*Math.abs(Math.sin(t*2+i));x.fillStyle='#fff';x.fillRect(r()*480,r()*200,1,1)}x.globalAlpha=1;
  const k=Math.min(1,t/.45),sc=1+(1-k)*3,shake=t>.45&&t<.75?(Math.random()-.5)*8*(1-(t-.45)/.3):0;
  if(t>.45&&parts.length===0)for(let i=0;i<80;i++){const a=Math.random()*TAU,s=40+Math.random()*220;parts.push({x:240,y:96,vx:Math.cos(a)*s,vy:Math.sin(a)*s,c:['#a6f5c6','#ffe36b','#ff8fb0','#8ad0ff'][i%4]})}
  for(const p of parts){const d=t-.45;x.globalAlpha=Math.max(0,1-d/1.4);x.fillStyle=p.c;x.fillRect(p.x+p.vx*d,p.y+p.vy*d+40*d*d,2,2)}x.globalAlpha=1;
  x.save();x.translate(240+shake,92);x.scale(sc,sc);x.globalAlpha=k;x.textAlign='center';x.font='900 52px '+FONT_STACK;x.fillStyle='#000';x.fillText('BEAT BLADE',3,4);
  const gr=x.createLinearGradient(-160,0,160,0);const o=(t*.4)%1;gr.addColorStop(0,'#a6f5c6');gr.addColorStop(Math.min(.99,Math.max(.01,o)),'#ffffff');gr.addColorStop(1,'#ffe36b');x.fillStyle=gr;x.fillText('BEAT BLADE',0,0);
  x.font='bold 14px '+FONT_STACK;x.fillStyle='#ff8fb0';x.fillText('— M A C H I N A —',0,26);x.restore();
  if(t>.45&&t<.7){x.globalAlpha=1-(t-.45)/.25;x.fillStyle='#ffffff';x.fillRect(0,0,480,200);x.globalAlpha=1}
  const bp=Math.pow(1-((t*2)%1),3);x.globalAlpha=.4*bp;x.strokeStyle='#a6f5c6';x.beginPath();x.arc(240,92,60+((t*2)%1)*120,0,TAU);x.stroke();x.globalAlpha=1;
  raf=requestAnimationFrame(loop)};loop(performance.now());}
/*LOB_END*/
/*GMN_BEGIN*/
