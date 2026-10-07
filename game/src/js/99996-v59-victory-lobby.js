/* ================= v59 승리 연출 팩 · 로비 테마 팩 (현금 상품) =================
   승리 연출: 보스를 쓰러뜨리는 순간(G.state가 'dying'이 될 때)부터 3초 동안 전장 위에 그림.
     공허의 붕괴 ₩2,000 · 태엽 꽃가루 ₩2,000 · 네온 레이저쇼 ₩2,500
   로비 테마: 메인 메뉴 무대(lvDraw)의 조명 색(LV_COL)과 덧그림을 바꿈. 설정의 로비 배경 목록에 🔒로 보이고, 상점에서 입어볼 수 있다.
     공허의 무대 ₩2,500 · 황금 시계탑 ₩2,500 · 네온 클럽 ₩2,500
   지금은 결제가 없어서 「입어보기」만 된다(저장 안 함). 그리는 함수는 (캔버스, 폭, 높이, 시간)만 받아서 상점 미리보기에도 그대로 쓴다. */
(function(){try{
 const TAU2=Math.PI*2,R=(c,x,y,w,h,col,a)=>{c.globalAlpha=a==null?1:a;c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)))};
 const hash=n=>{const x=Math.sin(n*127.1)*43758.5453;return x-Math.floor(x)};
 function beat(){try{if(typeof mus!=='undefined'&&mus&&mus.ms&&mus.T0){const q=(performance.now()-mus.T0)/mus.ms;return q-Math.floor(q)}}catch(e){}const q=performance.now()/500;return q-Math.floor(q)}

 /* ================= 승리 연출 ================= */
 /* draw(c, q(0~1 진행), bx, by(보스 자리), x0,y0,w,h(전장), u(크기 배율), t(초)) */
 const VIC=[
  {id:'v_void',name:'공허의 붕괴',en:'VOID COLLAPSE',price:2000,tier:'영웅',col:'#5affd8',desc:'쓰러진 보스가 검은 구멍으로 빨려 들어가며 사라지고, 청록 충격파가 전장을 휩쓸어요.',tags:['보스가 빨려 드는 블랙홀','청록 충격파','흩어지는 공허 조각'],
   draw(c,q,bx,by,x0,y0,w,h,u,t){const grow=q<.55?q/.55:1-(q-.55)/.45*0.95,r=Math.max(0,grow)*36*u;
    c.save();c.globalAlpha=.85;c.fillStyle='#05030c';c.beginPath();c.arc(bx,by,r,0,TAU2);c.fill();c.strokeStyle='#5affd8';c.lineWidth=2*u;c.beginPath();c.arc(bx,by,r+2*u,0,TAU2);c.stroke();
    for(let i=0;i<28;i++){const a=i*TAU2/28+q*6,d=(1-((q*1.6+hash(i))%1))*90*u;R(c,bx+Math.cos(a)*d,by+Math.sin(a)*d*.6,2*u,2*u,i%2?'#5affd8':'#b07aff',.9)}
    if(q>.55){const k=(q-.55)/.45;c.globalAlpha=.6*(1-k);c.strokeStyle='#5affd8';c.lineWidth=3*u;c.beginPath();c.ellipse(bx,by,k*w*.7,k*h*.5,0,0,TAU2);c.stroke();c.globalAlpha=.25*(1-k);c.fillStyle='#5affd8';c.fillRect(x0,y0,w,h)}
    c.restore();c.globalAlpha=1}},
  {id:'v_clock',name:'태엽 꽃가루',en:'CLOCKWORK CONFETTI',price:2000,tier:'영웅',col:'#ffcf5a',desc:'보스 자리에서 종소리 고리가 퍼지고, 하늘에서 금빛 톱니와 꽃가루가 쏟아져요.',tags:['쏟아지는 금빛 톱니 · 꽃가루','종소리 고리','반짝이는 시곗바늘'],
   draw(c,q,bx,by,x0,y0,w,h,u,t){c.save();
    for(let i=0;i<3;i++){const k=Math.max(0,q*1.4-i*.18);if(k>0&&k<1){c.globalAlpha=.7*(1-k);c.strokeStyle=i%2?'#ffffff':'#ffcf5a';c.lineWidth=2*u;c.beginPath();c.arc(bx,by,k*80*u,0,TAU2);c.stroke()}}
    for(let i=0;i<46;i++){const x=x0+hash(i)*w,fall=((q*1.2+hash(i+3)*.4))*h*1.1,y=y0-20*u+fall,rot=t*4+i,col=['#ffcf5a','#ffe9a8','#ff8fb0','#8ad8ff','#ffffff'][i%5];if(y>y0+h)continue;
     if(i%4===0){c.globalAlpha=.95;c.strokeStyle=col;c.lineWidth=1.5*u;c.beginPath();c.arc(x,y,3*u,0,TAU2);c.stroke();for(let k=0;k<6;k++){const a=rot+k*TAU2/6;R(c,x+Math.cos(a)*4*u-.5*u,y+Math.sin(a)*4*u-.5*u,1.5*u,1.5*u,col,.95)}}
     else{c.save();c.translate(x,y);c.rotate(rot);R(c,-2*u,-1*u,4*u,2*u,col,.95);c.restore()}}
    c.globalAlpha=.9;c.strokeStyle='#fff8d8';c.lineWidth=2*u;c.beginPath();c.moveTo(bx,by);c.lineTo(bx+Math.cos(t*6)*20*u,by+Math.sin(t*6)*20*u);c.moveTo(bx,by);c.lineTo(bx+Math.cos(t*1.5)*12*u,by+Math.sin(t*1.5)*12*u);c.stroke();
    c.restore();c.globalAlpha=1}},
  {id:'v_neon',name:'네온 레이저쇼',en:'NEON LASER SHOW',price:2500,tier:'전설',col:'#ff3ad6',desc:'전장 위로 레이저가 쏟아지고 바닥에 이퀄라이저가 춤추며, 네온 VICTORY 글자가 번쩍여요.',tags:['위에서 쏟아지는 레이저','바닥 이퀄라이저','번쩍이는 네온 VICTORY'],
   draw(c,q,bx,by,x0,y0,w,h,u,t){const cols=['#ff3ad6','#29f0ff','#ffe14d','#5affb0','#b05cff'],fade=q>.85?(1-q)/.15:1;c.save();c.globalCompositeOperation='lighter';
    for(let i=0;i<6;i++){const sx=x0+(i<3?0:w),a=(i<3?.3:Math.PI-.3)+Math.sin(t*2.4+i)*.5+(i%3)*.25;c.globalAlpha=.45*fade;c.strokeStyle=cols[i%5];c.lineWidth=2*u;c.beginPath();c.moveTo(sx,y0);c.lineTo(sx+Math.cos(a)*w*1.2,y0+Math.sin(a)*w*1.2);c.stroke()}
    const n=24,bw=w/n;for(let i=0;i<n;i++){const hh=(.2+.8*Math.abs(Math.sin(t*8+i*.7)))*h*.22*fade;R(c,x0+i*bw+1,y0+h-hh,bw-2,hh,cols[i%5],.55)}
    c.globalCompositeOperation='source-over';if(q>.15){const k=Math.min(1,(q-.15)/.15),fl=.75+.25*Math.sin(t*20);c.globalAlpha=k*fade*fl;c.font='900 '+Math.round(26*u)+'px '+(typeof FONT_STACK!=='undefined'?FONT_STACK:'sans-serif');c.textAlign='center';c.lineWidth=4*u;c.strokeStyle='#29f0ff';c.strokeText('VICTORY',x0+w/2,y0+h*.38);c.fillStyle='#ffffff';c.fillText('VICTORY',x0+w/2,y0+h*.38);c.textAlign='left'}
    c.restore();c.globalAlpha=1}}];
 let vic=null;
 const VIC59=window.VIC59={list:VIC.map(v=>Object.assign({cat:'fx'},v)),get:()=>vic,byId:id=>VIC.find(v=>v.id===id),equip(id){vic=id&&VIC.find(v=>v.id===id)?id:null},
  /* 상점 미리보기: 작은 전장에서 2.6초마다 되풀이 */
  preview(c,id,W,H,now){const v=VIC59.byId(id);if(!v)return;const t=now/1000,q=(t%2.8)/2.8;c.fillStyle='#0a1218';c.fillRect(0,0,W,H);c.strokeStyle='#ffffff14';for(let x=0;x<W;x+=24){c.beginPath();c.moveTo(x,0);c.lineTo(x,H);c.stroke()}
   const bx=W/2,by=H*.42,u=W/300;if(q<.5){c.globalAlpha=1-q*1.6;c.fillStyle='#3a4458';c.beginPath();c.ellipse(bx,by,34*u,28*u,0,0,TAU2);c.fill();c.fillStyle='#ff4d6d';c.fillRect(bx-14*u,by-6*u,8*u,4*u);c.fillRect(bx+6*u,by-6*u,8*u,4*u);c.globalAlpha=1}
   v.draw(c,q,bx,by,0,0,W,H,u,t)}};
 {const base=drawScene;drawScene=function(now){const r=base.apply(this,arguments);try{if(vic&&typeof G!=='undefined'&&G&&mode==='boss'){if(G.state==='dying'&&!G._v59)G._v59=now;if(G._v59&&now-G._v59<3000){const v=VIC59.byId(vic),q=(now-G._v59)/3000,b=G.boss||{x:AX+AW/2,y:AY+AH*.35};ctx.save();v.draw(ctx,q,b.x,b.y,AX,AY,AW,AH,1,now/1000);ctx.restore()}}}catch(e){}return r}}

 /* ================= 로비 테마 ================= */
 const LOB=[
  {id:'p_void',name:'공허의 무대',en:'VOID STAGE',price:2500,tier:'영웅',col:'#9a66ff',pal:['#5affd8','#9a66ff','#c8bcff','#3a2a86'],icon:'🌀',
   desc:'메인 무대가 보라 안개에 잠기고, 하늘이 갈라진 틈에서 공허 조각이 떠다녀요.',tags:['보라·청록 조명','하늘의 공허 틈','떠다니는 조각 · 바닥 안개'],
   draw(c,w,h,t){c.save();c.globalAlpha=.16;c.fillStyle='#2a1050';c.fillRect(0,0,w,h);const gx=w*.62,gy=h*.18;c.globalAlpha=.8;c.strokeStyle='#5affd8';c.lineWidth=Math.max(1,h/300);c.beginPath();c.moveTo(gx-w*.12,gy);for(let i=0;i<=12;i++)c.lineTo(gx-w*.12+i*w*.02,gy+Math.sin(i*1.9+t)*h*.015);c.stroke();
    for(let i=0;i<16;i++){const x=hash(i)*w,y=((hash(i+5)*h-t*h*.03*(1+i%3))%h+h)%h,s=(2+i%4)*h/300;c.save();c.translate(x,y);c.rotate(t*.6+i);c.globalAlpha=.5;c.fillStyle=i%2?'#5affd8':'#b07aff';c.beginPath();c.moveTo(0,-s*2);c.lineTo(s,0);c.lineTo(0,s*2);c.lineTo(-s,0);c.fill();c.restore()}
    const g=c.createLinearGradient(0,h*.75,0,h);g.addColorStop(0,'rgba(60,20,120,0)');g.addColorStop(1,'rgba(90,40,170,.45)');c.globalAlpha=1;c.fillStyle=g;c.fillRect(0,h*.75,w,h*.25);c.restore()}},
  {id:'p_clock',name:'황금 시계탑',en:'GOLDEN CLOCKTOWER',price:2500,tier:'영웅',col:'#ffcf5a',pal:['#ffcf5a','#ffe9a8','#d8a23a','#ff8f6a'],icon:'🕰',
   desc:'무대 양쪽에서 거대한 황금 톱니가 돌고, 금빛 먼지가 천천히 내려앉아요.',tags:['황금빛 조명','양쪽에서 도는 거대 톱니','내려앉는 금빛 먼지'],
   draw(c,w,h,t){c.save();c.globalAlpha=.1;c.fillStyle='#ffcf5a';c.fillRect(0,0,w,h);
    const gear=(x,y,r,rot,a)=>{c.globalAlpha=a;c.strokeStyle='#ffcf5a';c.lineWidth=Math.max(2,r*.12);c.beginPath();c.arc(x,y,r,0,TAU2);c.stroke();for(let i=0;i<12;i++){const an=rot+i*TAU2/12;c.fillStyle='#ffcf5a';c.save();c.translate(x+Math.cos(an)*r*1.12,y+Math.sin(an)*r*1.12);c.rotate(an);c.fillRect(-r*.1,-r*.08,r*.2,r*.16);c.restore()}c.lineWidth=Math.max(1,r*.06);for(let i=0;i<6;i++){const an=-rot*1.2+i*TAU2/6;c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(an)*r*.85,y+Math.sin(an)*r*.85);c.stroke()}};
    gear(w*.06,h*.3,h*.22,t*.25,.28);gear(w*.95,h*.42,h*.3,-t*.18,.22);gear(w*.88,h*.12,h*.1,t*.6,.3);
    for(let i=0;i<30;i++){const x=hash(i)*w+Math.sin(t+i)*w*.01,y=((hash(i+9)+t*.04*(1+i%2))%1)*h;R(c,x,y,Math.max(1,h/260),Math.max(1,h/260),i%3?'#ffe9a8':'#ffffff',.6)}c.restore()}},
  {id:'p_neon',name:'네온 클럽',en:'NEON CLUB',price:2500,tier:'전설',col:'#ff3ad6',pal:['#ff3ad6','#29f0ff','#ffe14d','#5affb0'],icon:'🎧',
   desc:'메인 무대가 클럽으로! 레이저가 박자에 맞춰 휘젓고, 박자마다 화면이 번쩍여요.',tags:['분홍·하늘색 네온 조명','박자에 맞춰 도는 레이저','박자마다 번쩍임'],
   draw(c,w,h,t){const b=Math.pow(1-beat(),3),cols=['#ff3ad6','#29f0ff','#ffe14d','#5affb0'];c.save();c.globalCompositeOperation='lighter';
    for(let i=0;i<8;i++){const sx=w*(.1+i*.11),a=Math.PI/2+Math.sin(t*1.6+i*1.3)*.7;c.globalAlpha=.18+.2*b;c.strokeStyle=cols[i%4];c.lineWidth=Math.max(1.5,h/220);c.beginPath();c.moveTo(sx,0);c.lineTo(sx+Math.cos(a)*h*1.3,Math.sin(a)*h*1.3);c.stroke()}
    c.globalAlpha=.08*b;c.fillStyle='#ffffff';c.fillRect(0,0,w,h);const g=c.createLinearGradient(0,h*.8,0,h);g.addColorStop(0,'rgba(255,58,214,0)');g.addColorStop(1,'rgba(41,240,255,'+(.25+.25*b)+')');c.globalAlpha=1;c.fillStyle=g;c.fillRect(0,h*.8,w,h*.2);c.restore()}}];
 let lob=null;
 const LOB59=window.LOB59={list:LOB.map(v=>Object.assign({cat:'fx'},v)),get:()=>lob,byId:id=>LOB.find(v=>v.id===id),equip(id){lob=id&&LOB.find(v=>v.id===id)?id:null;try{if(typeof GM!=='undefined'&&GM.scr==='main'){lbStage();if(typeof lvBuild==='function')lvBuild()}}catch(e){}},
  preview(c,id,W,H,now){const v=LOB59.byId(id);if(!v)return;const t=now/1000;const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#05070d');g.addColorStop(1,'#141a28');c.fillStyle=g;c.fillRect(0,0,W,H);
   /* 무대 조명 + 바닥 */for(let i=0;i<4;i++){const x=W*(.2+i*.2);c.save();c.globalAlpha=.22;c.fillStyle=v.pal[i];c.beginPath();c.moveTo(x-6,0);c.lineTo(x+6,0);c.lineTo(x+W*.08+Math.sin(t+i)*W*.05,H*.82);c.lineTo(x-W*.08+Math.sin(t+i)*W*.05,H*.82);c.fill();c.restore()}
   c.fillStyle='#0b0f18';c.fillRect(0,H*.82,W,H*.18);c.fillStyle=v.pal[0];c.globalAlpha=.6;c.fillRect(0,H*.82,W,2);c.globalAlpha=1;
   v.draw(c,W,H,t)}};
 try{for(const v of LOB){LB_THEMES.push([v.id,v.icon,v.name,'PREMIUM · 상점 로비 테마']);if(typeof LV_COL!=='undefined')LV_COL[v.id]=v.pal;if(typeof LP_ALB!=='undefined')LP_ALB[v.id]=LP_ALB[v.id]||Object.assign({},LP_ALB.c1,{t:v.en});if(typeof LW_P!=='undefined')LW_P[v.id]=LW_P[v.id]||LW_P.c1}}catch(e){}
 const isP=th=>LOB.some(v=>v.id===th);
 {const base=lbLocked;lbLocked=function(th){if(isP(th))return lob!==th;return base.apply(this,arguments)}}
 {const base=lbTheme;lbTheme=function(){if(lob)return lob;return base.apply(this,arguments)}}
 {const base=lbCv;lbCv=function(th){return isP(th)?base.call(this,'c1'):base.apply(this,arguments)}}
 {const base=lvDraw;lvDraw=function(now){const r=base.apply(this,arguments);try{if(!lob)return r;const v=LOB59.byId(lob),cv=$('lvCv');if(!cv)return r;const c=cv.getContext('2d');c.save();c.setTransform(1,0,0,1,0,0);v.draw(c,cv.width,cv.height,now/1000);c.restore()}catch(e){}return r}}
}catch(e){console.error('v59 victory/lobby',e)}})();
