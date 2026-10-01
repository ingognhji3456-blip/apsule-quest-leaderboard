/* ================= 전투 연출 v73: 선명한 도트 공격 임팩트 · 보스 존재감 · 전투 UI ================= */
/* 원칙: 번지는 빛(글로우 헤이즈) 없이, 정수 좌표 · 2px 도트 · 단계식 투명도로만 표현 */
const CFX={ev:[],seen:new WeakSet(),hist:new WeakMap(),lastThud:0,lastZap:0,lastHp:null,hurtT:0,atkT:0,atkNm:''};
const cQ=a=>Math.ceil(clamp(a,0,1)*4)/4; /* 단계식 투명도 */
function cPx(x,y,s,col,a){RA(Math.round(x-s/2),Math.round(y-s/2),s,s,col,cQ(a))}
function cRing(x,y,r,col,a,s,sq){s=s||2;sq=sq||1;const n=Math.max(16,Math.round(r*.9));for(let i=0;i<n;i++){const t=i*TAU/n;cPx(x+Math.cos(t)*r,y+Math.sin(t)*r*sq,s,col,a)}}
function cStar(x,y,r,col,a){for(let i=-r;i<=r;i++){const w=Math.abs(i)<r*.35?2:1;cPx(x+i,y,w,col,a);cPx(x,y+i,w,col,a)}const d=Math.round(r*.45);for(let i=-d;i<=d;i++){cPx(x+i,y+i,1,col,a*.7);cPx(x+i,y-i,1,col,a*.7)}}
function cCol(){return G.bi>=10&&typeof TH2!=='undefined'&&TH2[G.bi]?TH2[G.bi].tel:'#ff4d6d'}
function cZoneCol(z){const k=z.kind||'plain';return k==='geyser'||k==='pool'?'#ff8a3d':k==='spike'?'#8fe0ff':k==='bolt'?'#a8e2ff':(G.bi>=10?cCol():'#ff4d6d')}
function cThud(now,big){if(now-CFX.lastThud<70)return;CFX.lastThud=now;sfx(big?52:66,big?.26:.18,'sine',big?.16:.11,30);sfx(big?110:150,.07,'square',.03,50)}
function cDust(x,y,n,spd,col){for(let i=0;i<n;i++){const a=RND()*TAU,v=spd*(.4+RND()*.8);G.parts.push({x:x+Math.cos(a)*4,y:y+Math.sin(a)*3,vx:Math.cos(a)*v,vy:Math.sin(a)*v*.55-40-RND()*40,life:.35+RND()*.35,max:.7,col:col||(i%3?'#6e6458':'#a89c88'),s:RND()<.3?3:2,g:260})}}
function cSpark(x,y,n,col,ang,spread){for(let i=0;i<n;i++){const a=(ang==null?RND()*TAU:ang+(RND()-.5)*(spread||1.4)),v=90+RND()*160;G.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:.18+RND()*.2,max:.38,col:i%2?'#ffffff':col,s:RND()<.35?2:1,g:320})}}
function cAdd(e){e.t=e.t||performance.now();CFX.ev.push(e);if(CFX.ev.length>90)CFX.ev.splice(0,CFX.ev.length-90)}
/* 공격 발동 감지 */
function cfxDetect(now,beat){if(G.state!=='play')return;const S=CFX.seen;
 for(const z of G.zones){if(S.has(z)||beat<z.t1)continue;S.add(z);if(z.harm===false)continue;const col=cZoneCol(z),big=z.r>=40;
  cAdd({k:'slam',x:z.cx,y:z.cy,r:z.r,col,dur:big?460:360,seed:(z.cx*7+z.cy*13)|0});cDust(z.cx,z.cy,Math.min(14,4+Math.round(z.r/5)),60+z.r*2);G.shake=Math.max(G.shake,big?.3:.18);cThud(now,big)}
 for(const b of G.bullets){if(S.has(b)||beat<b.t0)continue;S.add(b);cAdd({k:'muzzle',x:b.x0,y:b.y0,col:cCol(),dur:150})}
 for(const bm of G.beams){if(S.has(bm)||beat<bm.t1)continue;S.add(bm);const col=(G.bi>=10&&typeof skBeamCol==='function'&&skBeamCol(bm))||bm.col||'#ff4d6d';cAdd({k:'beamOn',x:bm.ox,y:bm.oy,col,dur:260});G.shake=Math.max(G.shake,.26);if(now-CFX.lastZap>90){CFX.lastZap=now;sfx(880,.12,'sawtooth',.03,220);sfx(60,.2,'sine',.1,40)}}
 for(const r of G.rockets){if(S.has(r)||beat<r.t0)continue;S.add(r);cAdd({k:'launch',x:r.x,y:r.y,col:'#ffb020',dur:260});cDust(r.x,r.y+2,5,50,'#8a8478')}
 for(const a of G.arcs){if(S.has(a)){if(!a._cfxL&&beat>=a.t1){a._cfxL=1;cAdd({k:'land',x:a.x1,y:a.y1,col:a.kind==='fire'?'#ff8a3d':'#c9d3d8',dur:300});cDust(a.x1,a.y1,5,60)}continue}if(beat>=a.t0)S.add(a)}
 if(G.rings)for(const r of G.rings){if(S.has(r)||beat<r.t0)continue;S.add(r);G.shake=Math.max(G.shake,.16);cAdd({k:'ringOn',x:r.cx,y:r.cy,col:'#ffffff',dur:220})}}
/* 공격 연출 그리기 (drawScene 변환 안쪽, 파티클 다음) */
function cfxDraw(now,beat){try{cfxDetect(now,beat)}catch(e){}
 /* 탄환 궤적: 뒤로 3칸 도트 꼬리 */
 if(G.state==='play'||G.state==='dying'){const tc=cCol();for(const b of G.bullets){if(beat<b.t0)continue;for(let i=1;i<=3;i++){const tb=beat-.035*i;if(tb<b.t0)break;const [x,y]=bpos(b,tb);cPx(x,y,4-i,i===1?'#ffffff':tc,.7-i*.18)}}
  /* 레이저: 1px 백열 코어 + 벽 충돌 불꽃 */
  for(const bm of G.beams){if(beat<bm.t1||beat>=bm.t2||!bm.fireDur)continue;const p=clamp((beat-bm.t1)/bm.fireDur,0,1),tip=bm.L*(p*p*(3-2*p)),a=beamAng(bm,beat),dx=Math.cos(a),dy=Math.sin(a);
   let ex=bm.ox,ey=bm.oy;for(let s=0;s<tip;s+=6){const x=bm.ox+dx*s,y=bm.oy+dy*s;if(x<AX||x>AX+AW||y<AY||y>AY+AH)break;ex=x;ey=y}
   const fl=Math.floor(now/50)%2;if(fl)for(const e of [-1,1]){const ox=-dy*(bm.w/2+1)*e,oy=dx*(bm.w/2+1)*e;line(bm.ox+ox,bm.oy+oy,ex+ox,ey+oy,4,(x,y,i)=>{if(i%3!==0)cPx(x,y,1,'#ffffff',.75)})}
   if(RND()<.55)cSpark(ex,ey,1,bm.col||'#ff4d6d',a+Math.PI,2.2);cStar(ex,ey,3+fl*2,'#ffffff',.9)}
  /* 톱날 불꽃 */
  for(const s of G.saws){if(beat<s.ts||beat>s.te)continue;if(RND()<.25){const [x,y]=sawPos(s,beat);cSpark(x,y+6,1,'#ffe79a',-Math.PI/2,2.4)}}}
 /* 보스 기 모으기: 도트 불꽃이 코어로 빨려듦 */
 const b=G.boss;if(b&&b.warn>0&&!b.dorm&&G.state==='play'){const g=bgeo(),c=G.B.c;for(let i=0;i<14;i++){const q=((now/420+i*.071)%1),a=i*2.39996+Math.floor(now/420+i*.071)*1.3,r=(1-q)*(70+(i%3)*14);cPx(g.x+Math.cos(a)*r,g.coreY+Math.sin(a)*r*.8,q>.7?1:2,i%3?c:'#ffffff',.35+q*.6)}if(Math.floor(now/90)%2)cStar(g.x,g.coreY,5,'#ffffff',.85)}
 /* 돌진: 가로 속도선 */
 if(b&&b.dash&&G.state==='play'){const g=bgeo(),w=g.hf*U,c=G.B.c;for(let i=0;i<9;i++){const y=g.top+((i*17+Math.floor(now/40)*5)%Math.max(10,g.y-g.top)),L=16+((i*11)%20),side=(i%2?1:-1),x0=g.x+side*(w+4+((now/6+i*13)%18));R(Math.round(Math.min(x0,x0+side*L)),Math.round(y),L,1,i%3?c:'#ffffff')}}
 /* 이벤트 */
 CFX.ev=CFX.ev.filter(e=>now-e.t<e.dur);for(const e of CFX.ev){const k=clamp((now-e.t)/e.dur,0,1),ek=1-Math.pow(1-k,3);
  if(e.k==='slam'){const r=e.r*(.6+ek*.9);cRing(e.x,e.y,r,'#ffffff',(1-k)*.95,2,.8);cRing(e.x,e.y,r+3,e.col,(1-k)*.8,2,.8);
   if(k<.7){const n=7;for(let i=0;i<n;i++){const a=i*TAU/n+((e.seed%10)*.31),len=e.r*(.5+((e.seed>>i)&3)*.18)*Math.min(1,k*4+.3);let px=e.x,py=e.y;for(let s=1;s<=3;s++){const nx=e.x+Math.cos(a+((s*e.seed+i)%5-2)*.12)*len*s/3,ny=e.y+Math.sin(a+((s*e.seed+i)%5-2)*.12)*len*s/3*.8;line(px,py,nx,ny,2,(x,y)=>cPx(x,y,2,'#1a1210',(.7-k)*1.2));line(px,py,nx,ny,2,(x,y)=>cPx(x+1,y-1,1,e.col,(.7-k)*.9));px=nx;py=ny}}}
   if(k<.12){const s=Math.round(e.r*.5);R(Math.round(e.x-s),Math.round(e.y-1),s*2,2,'#ffffff');R(Math.round(e.x-1),Math.round(e.y-s*.6),2,Math.round(s*1.2),'#ffffff')}}
  else if(e.k==='muzzle'){cStar(e.x,e.y,Math.round(6*(1-k))+2,k<.4?'#ffffff':e.col,1-k)}
  else if(e.k==='beamOn'){cStar(e.x,e.y,Math.round(10*(1-k))+3,'#ffffff',1-k);cRing(e.x,e.y,8+ek*26,e.col,(1-k),2)}
  else if(e.k==='launch'){cStar(e.x,e.y-4,Math.round(7*(1-k))+2,'#ffe79a',1-k);for(let i=0;i<5;i++){const a=i*TAU/5,rr=4+ek*12;cPx(e.x+Math.cos(a)*rr,e.y+Math.sin(a)*rr*.5+2,3,'#8a8478',(1-k)*.8)}}
  else if(e.k==='land'){cRing(e.x,e.y,4+ek*18,e.col,1-k,2,.7);if(k<.15)cStar(e.x,e.y,5,'#ffffff',1)}
  else if(e.k==='ringOn'){cStar(e.x,e.y,Math.round(8*(1-k))+2,'#ffffff',1-k)}
  else if(e.k==='roar'){const g=bgeo(),r=10+ek*90;cRing(g.x,g.headY,r,G.B.c,(1-k)*.85,2,.75);cRing(g.x,g.headY,r*.7,'#ffffff',(1-k)*.6,1,.75);if(k<.35)cStar(g.x+6,g.headY-2,Math.round(9*(1-k/.35))+1,'#ffffff',1)}}}
/* 손 잔상: 빠르게 휘두르는 손에만 */
{const _dh=drawHand;drawHand=function(c,B,h,sx,sy,now,dorm,HS2){if(mode==='boss'&&c===ctx&&h&&typeof h==='object'&&!dorm&&G.state==='play'){let q=CFX.hist.get(h);if(!q){q=[];CFX.hist.set(h,q)}if(!q.length||now-q[q.length-1].t>=16)q.push({x:h.x,y:h.y,t:now});while(q.length>6)q.shift();
  const o=q[0],sp=Math.hypot(h.x-o.x,h.y-o.y)/Math.max(16,now-o.t)*1000;if(sp>260&&q.length>=4){const a0=c.globalAlpha;for(let i=0;i<q.length-1;i+=2){c.globalAlpha=a0*(.12+i*.05);try{_dh.call(this,c,B,Object.assign({},h,{x:q[i].x,y:q[i].y}),sx,sy,now,dorm,HS2)}catch(e){}}c.globalAlpha=a0;
   const dx=h.x-o.x,dy=h.y-o.y,L=Math.hypot(dx,dy)||1;for(let i=0;i<4;i++){const px=h.x-dx/L*(10+i*7)+(-dy/L)*(i%2?6:-6),py=h.y-dy/L*(10+i*7)+(dx/L)*(i%2?6:-6);line(px,py,px-dx/L*14,py-dy/L*14,2,(x,y)=>cPx(x,y,1,'#ffffff',.7))}}}
 return _dh.apply(this,arguments)}}
/* 보스 존재감: 발밑 그림자 · 박자 파동 · 증기 · 방전 */
{const _bb=bossFXBack;bossFXBack=function(now,g,ph){const cx=Math.round(g.x),gy=Math.round(g.y+3),w=Math.round(g.hf*U*1.25);
 for(let i=0;i<5;i++){const hw=Math.round(w*Math.sqrt(1-Math.pow((i-2)/2.6,2)));RA(cx-hw,gy-2+i,hw*2,1,'#000',.32)}
 const r=_bb.apply(this,arguments);
 if(G.state==='play'){const fr=G.beat-Math.floor(G.beat),bn=Math.floor(G.beat);if(fr<.45&&bn%2===0){const k=fr/.45;cRing(cx,gy,w*.8+k*w*1.1,ph>=2?'#ff2d55':G.B.c,(1-k)*.55,2,.3)}}
 if(ph>=1&&G.state!=='dying'){const col=ph>=2?'#ff9aa8':'#d8d0c4';for(const s of [-1,1])for(let i=0;i<4;i++){const q=((now/700+i*.25+(s>0?.13:0))%1),x=g.x+s*(g.hf*U*.85+q*8*s*s)+Math.sin(q*6+i)*2,y=g.top+4-q*30;cPx(x,y,q<.5?3:2,col,(1-q)*.7)}}
 return r}}
{const _bf=bossFXFront;bossFXFront=function(now,g,ph){const r=_bf.apply(this,arguments);if(false&&ph>=1&&G.state==='play'){const seed=Math.floor(now/110);if(seed%3!==0){const w=g.hf*U,col=ph>=2?'#ff5d7d':'#fff0a0';let x=g.x+(((seed*37)%100)/100-.5)*w*1.6,y=g.top+((seed*53)%Math.max(8,Math.round(g.y-g.top)));for(let i=0;i<5;i++){const nx=x+(((seed*(i+3))%7)-3)*3,ny=y+4+((seed*(i+5))%4);line(x,y,nx,ny,1,(px,py)=>cPx(px,py,1,i%2?'#ffffff':col,.95));x=nx;y=ny}}}return r}}
/* 공격 이름 선언 → 보스 포효 파동 + 경고 배너 */
const CFX_ATK=new Set();try{for(const T of [ATK_NAME,SIGNAME,typeof SIGNAME2!=='undefined'?SIGNAME2:{},typeof SIGNAME3!=='undefined'?SIGNAME3:{}])for(const v of Object.values(T))CFX_ATK.add(v)}catch(e){}
(function(){const st=document.createElement('style');st.textContent=
 '#banner.atk{top:calc(var(--u)*31);left:50%;right:auto;transform:translateX(-50%);padding:calc(var(--u)*1.5) calc(var(--u)*12);background:#0b0507;color:#fff;font-size:calc(var(--u)*11);letter-spacing:.12em;border-top:calc(var(--u)*1.5) solid #ff2d55;border-bottom:calc(var(--u)*1.5) solid #ff2d55;box-shadow:0 calc(var(--u)*-3) 0 #3a0a14,0 calc(var(--u)*3) 0 #3a0a14;text-shadow:1px 0 #ff2d55,-1px 0 #ff2d55,0 1px #7a0a1e,0 -1px #7a0a1e;white-space:nowrap}'+
 '#banner.atk::before{content:"⚠ ";color:#ffd23a}#banner.atk::after{content:" ⚠";color:#ffd23a}'+
 '#banner.atk.show{animation:bnAtk 1.8s steps(1,end) forwards,bnAtkIn .18s steps(3,end)}'+
 '@keyframes bnAtkIn{0%{transform:translateX(-50%) scaleY(0)}100%{transform:translateX(-50%) scaleY(1)}}'+
 '@keyframes bnAtk{0%{opacity:1}6%{opacity:.4}10%{opacity:1}14%{opacity:.4}18%{opacity:1}80%{opacity:1}90%{opacity:.5}100%{opacity:0}}';try{(document.head||document.body).appendChild(st)}catch(e){}})();
{const _bn=banner;banner=function(txt){const r=_bn.apply(this,arguments);try{const el=$('banner'),atk=mode==='boss'&&CFX_ATK.has(txt);el.classList.toggle('atk',!!atk);if(atk){const now=performance.now();cAdd({k:'roar',x:0,y:0,dur:520,t:now});G.shake=Math.max(G.shake,.14);sfx(98,.22,'sawtooth',.04,70)}}catch(e){}return r}}
/* 말풍선: 화자 색 테두리 · 이름표 · 꼬리 · 두 줄 줄바꿈 */
function cWrap(txt,maxW){const out=[];let cur='';for(const ch of txt){if(ctx.measureText(cur+ch).width>maxW&&cur){const sp=cur.lastIndexOf(' ');if(sp>cur.length*.5){out.push(cur.slice(0,sp));cur=cur.slice(sp+1)+ch}else{out.push(cur);cur=ch}}else cur+=ch}if(cur)out.push(cur);return out}
function drawTalk(now){if(!G.talk||!G.talk.length)return;const g=bgeo();G.talk=G.talk.filter(b=>now-b.t0<b.dur);
 for(const b of G.talk){const k=(now-b.t0)/b.dur,a=k>.85?(1-k)/.15:1,shown=Math.min(b.text.length,Math.floor((now-b.t0)/30)),txt=b.text.slice(0,shown);if(!txt)continue;
  let ax,ay,col,bg,nm;if(b.who==='boss'){const bnOn=CFX.ev.some(e=>e.k==='roar'&&now-e.t<1900);ax=g.x;ay=Math.max(AY+30,g.top-12);if(bnOn){ax=g.x+(g.x<W/2?1:-1)*(g.hf*U+70);ay=Math.max(AY+62,g.headY+16)}col=G.B.c;bg='#12070b';nm=G.B.name}else if(b.who==='hero'){ax=P.x;ay=P.y-42;col='#a6f5c6';bg='#07120d';nm=(typeof PNAME==='function'?PNAME():'하루')}else{const pt=G.pt||{x:P.x-22,y:P.y-34};ax=pt.x;ay=pt.y-12;col='#a8f0ff';bg='#061216';nm=(typeof curPet==='function'&&curPet().name)||'펫'}
  ctx.font='bold 9px monospace';const full=cWrap(b.text,190),lines=cWrap(txt,190).slice(0,3),tw=Math.round(Math.min(200,Math.max(...full.map(l=>ctx.measureText(l).width)))+12),th=lines.length*11+8;
  const pop=k<.06?Math.round((1-k/.06)*3):0,x=Math.round(clamp(ax-tw/2,AX+3,AX+AW-tw-3)),y=Math.round(clamp(ay-th-6,AY+10,H-th-20))+pop;ctx.globalAlpha=clamp(a,0,1);
  R(x-2,y-2,tw+4,th+4,'#000');R(x-1,y-1,tw+2,th+2,col);R(x,y,tw,th,bg);RA(x+1,y+th-2,tw-2,1,'#000',.5);
  const tx=clamp(Math.round(ax),x+8,x+tw-9);for(let i=0;i<4;i++){R(tx-3+i,y+th+i,7-i*2,1,col);if(i<3)R(tx-2+i,y+th+i,5-i*2,1,bg)}
  ctx.font='bold 8px monospace';const nw=Math.round(ctx.measureText(nm).width+8);R(x+4,y-7,nw,9,col);R(x+5,y-6,nw-2,7,'#000');ctx.fillStyle=col;ctx.textAlign='left';ctx.fillText(nm,x+8,y);
  ctx.font='bold 9px monospace';ctx.fillStyle='#ffffff';lines.forEach((l,i)=>ctx.fillText(l,x+6,y+13+i*11));if(shown<b.text.length&&Math.floor(now/120)%2)R(x+6+Math.round(ctx.measureText(lines[lines.length-1]).width)+1,y+6+(lines.length-1)*11,4,7,col);ctx.globalAlpha=1}}
/* 피격 · 위험 HUD: 선명한 가장자리 테두리 */
function cfxHud(now){if(mode!=='boss'||!G||G.state!=='play')return;if(CFX.lastHp!=null&&P.hp<CFX.lastHp)CFX.hurtT=now;CFX.lastHp=P.hp;
 const d=now-CFX.hurtT;if(d<320){const k=1-d/320,t=Math.max(2,Math.round(8*k));RA(0,0,W,t,'#ff2d55',cQ(k*.9));RA(0,H-t,W,t,'#ff2d55',cQ(k*.9));RA(0,0,t,H,'#ff2d55',cQ(k*.9));RA(W-t,0,t,H,'#ff2d55',cQ(k*.9));for(let i=0;i<4;i++){const cxp=i%2?W-1:0,cyp=i<2?0:H-1;for(let j=0;j<5;j++)RA(cxp-(i%2?14-j*3:0),cyp-(i<2?0:j*3),14-j*3,3,'#ff2d55',cQ(k*.6))}}
 const r=P.hp/Math.max(1,P.maxhp);if(r>0&&r<.3){const pl=Math.floor(now/400)%2;if(pl){RA(0,0,W,2,'#ff2d55',.5);RA(0,H-2,W,2,'#ff2d55',.5);RA(0,0,2,H,'#ff2d55',.5);RA(W-2,0,2,H,'#ff2d55',.5)}}}
{const _ds2=drawScene;drawScene=function(now){const r=_ds2.apply(this,arguments);try{cfxHud(now)}catch(e){}return r}}

