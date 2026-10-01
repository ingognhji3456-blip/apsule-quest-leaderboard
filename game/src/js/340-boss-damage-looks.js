/* ================= 페이즈가 오를수록 망가지는 보스 외형 ================= */
let _dmgCv=null,_dmgCtx=null;
function dmgCanvas(){if(_dmgCv)return _dmgCtx;if(typeof document==='undefined'||!document.createElement)return null;_dmgCv=document.createElement('canvas');_dmgCv.width=W;_dmgCv.height=H;_dmgCtx=_dmgCv.getContext('2d');if(!_dmgCtx||!_dmgCtx.fillRect){_dmgCv=null;return null}_dmgCtx.imageSmoothingEnabled=false;return _dmgCtx}
function dmgLevel(){if(!G||G.state==='wake')return 0;const r=clamp(G.hp/G.maxHp,0,1),ph=G.phase||0;return Math.min(1,ph*.4+(1-r)*.35)}
function drawBossDamaged(B,x,y,now,bo){if(G.omega&&G.revForm==='mutant'){drawMutant(ctx,x,y,now,bo,U);return}if(G.omega&&G.bi===OMEGA_BI){drawOmegaTrue(ctx,x,y,now,bo,U);return}const lv=dmgLevel(),c=lv>.05?dmgCanvas():null;if(!c){drawMech(ctx,B,x,y,now,bo,U);return}
 c.setTransform(1,0,0,1,0,0);c.globalCompositeOperation='source-over';c.globalAlpha=1;c.clearRect(0,0,W,H);drawMech(c,B,x,y,now,bo,U);
 const g=geo(B,x,y,U),hw=g.hf*U,top=g.top-4,bot=g.y,r=rng(hash('dmg|'+G.bi)),org=G.bi>=10,t=now/1000,ph=G.phase||0;
 const P2=(px,py,w,h,col,a)=>{c.globalAlpha=a==null?1:a;c.fillStyle=col;c.fillRect(Math.round(px),Math.round(py),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)))};
 const LNc=(x0,y0,x1,y1,col,w,a)=>{const n=Math.max(1,Math.ceil(Math.hypot(x1-x0,y1-y0)));for(let i=0;i<=n;i++)P2(x0+(x1-x0)*i/n-w/2,y0+(y1-y0)*i/n-w/2,w,w,col,a)};
 c.globalCompositeOperation='source-atop';
 /* 1) 그을음 · 멍 */
 const nScorch=Math.round(2+lv*8);for(let i=0;i<nScorch;i++){const sx=x+(r()-.5)*hw*1.8,sy=top+r()*(bot-top),sr=4+r()*9*(.5+lv);for(let k=0;k<3;k++){const rr=sr*(1-k*.3);c.globalAlpha=(org?.22:.28)*(.6+lv);c.fillStyle=org?'#2a0610':'#0c0a08';c.beginPath&&0;for(let yy=-rr;yy<rr;yy++){const w2=Math.sqrt(Math.max(0,rr*rr-yy*yy));c.fillRect(Math.round(sx-w2),Math.round(sy+yy),Math.round(w2*2),1)}}}
 /* 2) 균열 (빛나는 가장자리) */
 const nCrack=Math.round(1+lv*7),hot=org?'#ff4d6d':'#ffb020';for(let i=0;i<nCrack;i++){let cx0=x+(r()-.5)*hw*1.6,cy0=top+r()*(bot-top);const segs=3+Math.floor(r()*4);for(let k=0;k<segs;k++){const nx=cx0+(r()-.5)*14,ny=cy0+(r()-.3)*12;LNc(cx0,cy0,nx,ny,'#08060a',2,.95);if(lv>.35)LNc(cx0,cy0-1,nx,ny-1,hot,1,(.35+.35*Math.sin(t*6+i))*lv);cx0=nx;cy0=ny}}
 /* 3) 구멍 · 노출된 내부 (전선/뼈) */
 if(lv>.3){const nHole=Math.round((lv-.3)*8);for(let i=0;i<nHole;i++){const hx=x+(r()-.5)*hw*1.3,hy=top+(.2+r()*.7)*(bot-top),hr=3+r()*5;for(let yy=-hr;yy<hr;yy++){const w2=Math.sqrt(Math.max(0,hr*hr-yy*yy))*(1+Math.sin(yy*1.7+i)*.2);P2(hx-w2,hy+yy,w2*2,1,'#050304',1)}
   if(org){LNc(hx-hr*.7,hy,hx+hr*.7,hy+1,'#e8dcc8',2,.9);P2(hx-1,hy-hr*.5,2,hr,'#8a1a2a',.8)}else{for(let k=0;k<3;k++){const col=['#ff4d6d','#4dc3ff','#ffe36b'][k];let wx=hx-hr*.6+k*hr*.5,wy=hy-hr*.4;LNc(wx,wy,wx+Math.sin(t*3+k+i)*2,wy+hr*.9,col,1,.95)}if(Math.floor(t*8+i)%5===0)P2(hx-1,hy-1,3,3,'#ffffff',.9)}
   P2(hx-hr,hy-hr-1,hr*2,1,org?'#ff6a8a':'#ffb020',.35*lv)}}
 /* 4) 깜빡이는 손상 */
 if(lv>.5&&Math.floor(t*7)%9===0){P2(x-hw*1.2,top,hw*2.4,bot-top,'#000000',.25)}
 if(org&&lv>.2){for(let i=0;i<Math.round(lv*5);i++){const dx=x+(r()-.5)*hw*1.4,dy=top+(.3+r()*.6)*(bot-top),k=((t*.6)+r())%1;P2(dx,dy,2,2+k*10,'#6a0a1e',.8*(1-k))}}
 /* 5) 떨어져 나간 조각 (실루엣에 구멍) */
 c.globalCompositeOperation='destination-out';
 if(ph>=1){const nCut=ph>=2?6:3;for(let i=0;i<nCut;i++){const side=r()<.5?-1:1,ex=x+side*(hw*(.7+r()*.35)),ey=top+(.15+r()*.75)*(bot-top),s=3+r()*(ph>=2?7:4);for(let k=0;k<s;k++)P2(ex-side*k*.6,ey+k-s/2,s-k*.8,1,'#000',1)}
  if(ph>=2){for(let i=0;i<4;i++){const ex=x+(r()-.5)*hw*1.6,ey=top+r()*6,s=3+r()*5;for(let k=0;k<s;k++)P2(ex-(s-k)/2,ey+k,s-k,1,'#000',1)}}}
 c.globalCompositeOperation='source-over';c.globalAlpha=1;
 ctx.drawImage(_dmgCv,0,0);
 /* 6) 외부 효과: 연기 · 불꽃 · 파편 */
 const r2=rng(hash('dmgfx|'+G.bi)),nSmoke=Math.round(lv*5);for(let i=0;i<nSmoke;i++){const sx=x+(r2()-.5)*hw*1.4,sy=top+(r2()*.6)*(bot-top);for(let k=0;k<4;k++){const q=((t*.5)+k/4+i*.13)%1;pcirc(sx+Math.sin(q*5+i)*4*q,sy-q*34,2+q*6,org?'#3a1020':'#3a3a3a',.4*(1-q)*lv)}}
 if(!org&&lv>.25&&Math.floor(t*10)%3===0){const sx=x+(r2()-.5)*hw*1.4,sy=top+r2()*(bot-top);for(let k=0;k<4;k++)RA(sx+(RND()-.5)*10,sy+(RND()-.5)*8,1,1,k%2?'#ffe36b':'#ffffff',.9)}
 if(lv>.45&&RND()<.04*lv){G.parts&&G.parts.push({x:x+(RND()-.5)*hw*1.6,y:top+RND()*(bot-top),vx:(RND()-.5)*40,vy:-20-RND()*40,life:.9,max:.9,col:org?'#6a0a1e':'#5a646c',s:2+Math.floor(RND()*2)})}}
/*DMG_END*/
/*BB3_BEGIN*/
