/* ================= 챕터 1 보스: 10종 로봇 전용 그리기 ================= */
function drawRobot(c,B,x,y,t,o,u,bid){
 const cf=B.cfg,P_=B.pal,dm=o.dorm,fl=o.flash,ga0=c.globalAlpha;
 const pal=k=>fl?['#ffffff','#d5dde0','#ffffff','#ffffff'][k]:dm?['#2a353a','#161e22','#3a484e','#3a484e'][k]:P_[k];
 const bs=pal(0),dk=pal(1),lt=pal(2),ac=pal(3),bk='#0b0f11',ol='#06080a',wh=fl?'#ffffff':dm?'#4a5458':'#f4f7f5';
 const R2=(a,b,w,h,cl,al)=>{if(al!=null)c.globalAlpha=ga0*al;c.fillStyle=cl;c.fillRect(Math.round(x+a*u),Math.round(y+b*u),Math.max(1,Math.round(w*u)),Math.max(1,Math.round(h*u)));if(al!=null)c.globalAlpha=ga0};
 const M=(a,b,w,h,cl,al)=>{R2(a,b,w,h,cl,al);R2(-a-w,b,w,h,cl,al)};
 const CI=(a,b,r,cl,al)=>{const cx=x+a*u,cy=y+b*u,rr=r*u;if(al!=null)c.globalAlpha=ga0*al;c.fillStyle=cl;for(let yy=-rr;yy<rr;yy++){const dx=Math.sqrt(Math.max(0,rr*rr-(yy+.5)*(yy+.5)));c.fillRect(Math.round(cx-dx),Math.round(cy+yy),Math.max(1,Math.round(dx*2)),1)}if(al!=null)c.globalAlpha=ga0};
 const EL=(a,b,rx,ry,cl,al)=>{const cx=x+a*u,cy=y+b*u,RX=rx*u,RY=ry*u;if(al!=null)c.globalAlpha=ga0*al;c.fillStyle=cl;for(let yy=-RY;yy<RY;yy++){const dx=RX*Math.sqrt(Math.max(0,1-((yy+.5)/RY)**2));c.fillRect(Math.round(cx-dx),Math.round(cy+yy),Math.max(1,Math.round(dx*2)),1)}if(al!=null)c.globalAlpha=ga0};
 const GL=(a,b,r,cl,al)=>{if(dm)return;al=al==null?1:al;CI(a,b,r,cl,.14*al);CI(a,b,r*.66,cl,.22*al);CI(a,b,r*.38,cl,.4*al)};
 const LN=(a0,b0,a1,b1,cl,w,al)=>{w=w||1;const n=Math.max(1,Math.ceil(Math.hypot(a1-a0,b1-b0)*2));for(let i=0;i<=n;i++){const k=i/n;R2(a0+(a1-a0)*k-w/2,b0+(b1-b0)*k-w/2,w,w,cl,al)}};
 const PN=(a,b,w,h,f,hi,sh)=>{R2(a-.4,b-.4,w+.8,h+.8,ol);R2(a,b,w,h,f);R2(a,b,w,.6,hi||lt);R2(a,b+h-.6,w,.6,sh||dk)};
 const GEAR=(a,b,r,n,ang,f,tooth)=>{for(let i=0;i<n;i++){const q=ang+i*TAU/n;R2(a+Math.cos(q)*(r+.2)-.55,b+Math.sin(q)*(r+.2)-.55,1.1,1.1,tooth||f)}CI(a,b,r,ol);CI(a,b,r-.35,f);CI(a,b,r*.45,dk)};
 const bw=cf.bw,bh=cf.bh,hf=bw/2,pul=o.pulse||0,bob=(o.still||dm)?0:Math.round(Math.sin(t/300)*.7-pul*.7),fx=dm?0:1;
 const base=BASEH[cf.base],ty=-base-bh+bob,cyC=ty+bh/2,hy=ty-3;
 const eg=o.eye||0,ec=dm?'#333':(o.expose?'#ffffff':(eg>0?'#ff4d6d':ac)),warn=(o.warn||0)>0&&!dm,wf=warn&&Math.floor(t/70)%2;
 const flick=k=>.75+.25*Math.sin(t/(70+k*13)+k);
 const CORE=(a,b,r,shape)=>{if(shape==='sq'){R2(a-r-.4,b-r-.4,r*2+.8,r*2+.8,ol);R2(a-r,b-r,r*2,r*2,bk)}else{CI(a,b,r+.4,ol);CI(a,b,r,bk)}
  if(o.expose){const f2=Math.floor(t/70)%2;GL(a,b,r*3,ac,1);CI(a,b,r*.8,f2?ac:'#ffffff');CI(a,b,r*.4,f2?'#ffffff':ac)}
  else if(o.open>0){GL(a,b,r*2.5,ac,o.open);CI(a,b,r*.75,ac);CI(a,b,r*.35,'#ffffff',.8)}
  else{CI(a,b,r*.7,dk);R2(a-r*.7,b-.2,r*1.4,.4,bk);R2(a-.2,b-r*.7,.4,r*1.4,bk);if(!dm)CI(a,b,r*.25,ac,.35+.3*pul)}};
 const EYECH=(a,b)=>{if(eg<=0||dm)return;GL(a,b,2+eg*5,'#ff4d6d',.6+.4*eg);CI(a,b,.6+eg*.8,'#ffffff');for(let i=0;i<Math.round(eg*6);i++)R2(a+(RND()-.5)*8,b+(RND()-.5)*6,.4,.4,'#ffb0bd')};
 const SMOKE=(a,b,n,cl)=>{if(dm)return;for(let i=0;i<n;i++){const k=((t/1400)+i/n)%1;CI(a+Math.sin(k*5+i)*1.2*k,b-k*9,.6+k*1.6,cl||'#6a7478',.5*(1-k))}};
 if(warn){c.globalAlpha=ga0*.35;EL(0,cyC-1,hf+3,bh/2+base/2+3,'#ff2d55');c.globalAlpha=ga0}
 switch(bid){
 /* 0 톱니 파수꾼 — 궤도 전차 + 가슴의 거대 톱니 */
 case 0:{const rot=t/500;
  R2(-hf-2.4,-4.4,bw+4.8,4.8,ol);R2(-hf-2,-4,bw+4,4,dk);R2(-hf-2,-4,bw+4,.7,lt);
  for(let i=0;i<bw+4;i+=1.5){const k=((i+t/120)%(bw+4));R2(-hf-2+k,-.8,.6,.6,lt)}
  for(let i=0;i<5;i++){const wx=-hf+.5+i*(bw-1)/4;CI(wx,-2,1.3,bs);CI(wx,-2,.5,bk);const q=rot*2+i;R2(wx+Math.cos(q)*.9-.25,-2+Math.sin(q)*.9-.25,.5,.5,lt)}
  PN(-hf,ty+1,bw,bh-1,bs);R2(-hf+.6,ty+bh-2.2,bw-1.2,1,dk);for(let i=0;i<bw-1;i+=2)R2(-hf+.6+i,ty+bh-2.2,1,1,ac);
  for(const s of [-1,1]){GEAR(s*(hf+.6),ty+2.6,2.4,7,rot*s,dk,lt);CI(s*(hf+.6),ty+2.6,.7,ac)}
  GEAR(0,cyC+.5,3.4,10,rot,lt,lt);CI(0,cyC+.5,2.7,bs);for(let i=0;i<5;i++){const q=rot+i*TAU/5;LN(0,cyC+.5,Math.cos(q)*2.4,cyC+.5+Math.sin(q)*2.4,dk,.5)}CORE(0,cyC+.5,1.3,'c');
  for(const s of [-1,1]){R2(s>0?hf-3:-hf+1.4,ty+2,1.6,.5,dk);R2(s>0?hf-3:-hf+1.4,ty+3,1.6,.5,dk)}
  PN(-3.6,ty-5,7.2,5.2,bs);EL(0,ty-5,3.6,1.6,bs);R2(-3.6,ty-5.2,7.2,.6,lt);R2(-3,ty-3.2,6,1.6,bk);
  {const sx=dm?0:Math.sin(t/380)*2.2;GL(sx,ty-2.4,2.2,ec,.7);R2(sx-.8,ty-3,1.6,1,ec);R2(sx-.3,ty-2.9,.6,.4,'#ffffff')}
  R2(1.6,ty-8,.5,3,lt);R2(1.2,ty-8.6,1.3,.8,Math.floor(t/400)%2?ac:dk);EYECH(0,hy);break}
 /* 1 볼트 월 — 배터리 장벽 + 테슬라 코일 두 탑 */
 case 1:{
  for(const px of [-hf+1,-1.5,hf-4]){PN(px,-5,3,5,dk);for(let j=0;j<3;j++)R2(px-.3,-4.4+j*1.5,3.6,.6,j%2?lt:bs)}
  PN(-hf,ty,bw,bh,bs);R2(-hf+.5,ty+.6,bw-1,.5,lt);
  for(let r=0;r<2;r++)for(let q=0;q<4;q++){if(q===1||q===2){if(r===0)continue}const cx=-hf+1.4+q*((bw-2.8-2.4)/3),cy=ty+1.8+r*4;R2(cx-.3,cy-.3,2.4+.6,3.2,ol);R2(cx,cy,2.4,2.6,bk);const lv=dm?0:(.4+.6*((Math.sin(t/500+q*1.7+r)+1)/2));R2(cx+.3,cy+2.6-2.2*lv-.2,1.8,2.2*lv,q%2?ac:lt);R2(cx+.8,cy-.6,.8,.6,lt)}
  CI(0,cyC,2.6,dk);CI(0,cyC,2.1,lt);CORE(0,cyC,1.4,'c');
  LN(-1,ty+bh-1.6,0,ty+bh-2.8,ac,.5);LN(0,ty+bh-2.8,-.3,ty+bh-2.2,ac,.5);LN(-.3,ty+bh-2.2,1,ty+bh-3.6,ac,.5);
  const tops=[];for(const s of [-1,1]){const cx=s*(hf-1.8);for(let j=0;j<5;j++){const w=2.6-j*.25;R2(cx-w/2-.3,ty-1.2-j*1.6-.3,w+.6,1.6,ol);R2(cx-w/2,ty-1.2-j*1.6,w,1,j%2?ac:lt)}R2(cx-.4,ty-9,.8,1.2,dk);CI(cx,ty-9.8,1.3,ol);CI(cx,ty-9.8,1,lt);CI(cx-.3,ty-10.1,.35,'#ffffff');tops.push([cx,ty-9.8])}
  if(!dm&&Math.floor(t/90)%3!==0){let px=tops[0][0],py=tops[0][1];for(let i=1;i<=10;i++){const nx=lerp(tops[0][0],tops[1][0],i/10),ny=tops[0][1]+Math.sin(i*1.9+t/40)*1.2*(i<10?1:0);LN(px,py,nx,ny,'#ffffff',.4);LN(px,py,nx,ny,ac,.9,.35);px=nx;py=ny}GL(tops[0][0],tops[0][1],2,ac,.7);GL(tops[1][0],tops[1][1],2,ac,.7)}
  PN(-3.4,ty-4.2,6.8,4.2,dk);R2(-3,ty-3.2,6,1.8,bk);for(const s of [-1,1]){GL(s*1.5,ty-2.3,1.5,ec,.6);R2(s*1.5-.6,ty-2.8,1.2,1,ec)}EYECH(0,hy);break}
 /* 2 용광로 골렘 — 불타는 화로 몸통 + 굴뚝 */
 case 2:{
  for(const s of [-1,1]){PN(s>0?hf-5:-hf+1,-6,4,5,dk);R2(s>0?hf-4.6:-hf+1.4,-4.6,3.2,1,bs);PN(s>0?hf-5.6:-hf+.4,-1.4,5.2,1.4,dk,lt,bk)}
  for(const s of [-1,1]){const sx=s*(hf-3.4);PN(sx-1.2,ty-7,2.4,7,dk,lt,bk);R2(sx-1.6,ty-7.4,3.2,.8,lt);SMOKE(sx,ty-8,4,dm?'#333':'#5a5652')}
  PN(-hf,ty+1,bw,bh-1,bs);M(hf-.2,ty+2.5,1,bh-4,bs);M(hf+.2,ty+3,.6,bh-5,ol);R2(-hf+.6,ty+1.6,bw-1.2,.5,lt);
  for(let i=0;i<6;i++){const sx=-hf+1.2+i*(bw-2.4)/5;R2(sx,ty+1.4,.5,.5,dk);R2(sx,ty+bh-.9,.5,.5,dk)}
  const gx=-4,gy=cyC-2.4,gw=8,gh=6;R2(gx-.5,gy-.5,gw+1,gh+1,ol);R2(gx,gy,gw,gh,'#1a0806');
  if(!dm){for(let i=0;i<14;i++){const fx2=gx+.5+((i*37)%70)/10,k=((t/260)+i*.37)%1;R2(fx2,gy+gh-.6-k*gh*.9,.8,.8,k<.4?'#fff0a0':k<.7?'#ffb020':'#ff5a1f',1-k)}GL(0,gy+gh/2,5,'#ff7a2a',.5+.2*Math.sin(t/90))}
  CORE(0,gy+gh/2,1.3,'c');for(let i=0;i<5;i++)R2(gx+.6+i*1.6,gy,.5,gh,dk);R2(gx,gy+gh*.45,gw,.5,dk);
  if(!dm)for(const [ax,ay,al] of [[-hf+1,ty+3,5],[hf-2,ty+5,4],[-hf+2,ty+bh-2,3]]){for(let i=0;i<al;i++)R2(ax+(i%2)*.5,ay+i*.5,.5,.5,'#ff8a3a',flick(i))}
  if(!dm){const dk2=((t/900)%1);R2(hf-2.4,ty+bh+dk2*3,.5,.8,'#ffb020',1-dk2)}
  PN(-2.8,ty-3.2,5.6,4.4,dk);R2(-2.8,ty-3.4,5.6,.6,lt);CI(0,ty-1.5,1.3,bk);GL(0,ty-1.5,2.6,ec,.8);CI(0,ty-1.5,.8,ec);R2(-.2,ty-1.9,.4,.4,'#ffffff');EYECH(0,ty-1.5);break}
 /* 3 철갑 열차 — 정면에서 본 증기 기관차 */
 case 3:{const rot=t/160;
  for(const s of [-1,1]){const wx=s*(hf-2.2);CI(wx,-2.4,2.5,ol);CI(wx,-2.4,2.1,dk);CI(wx,-2.4,1.5,bs);for(let i=0;i<6;i++){const q=rot*s+i*TAU/6;LN(wx,-2.4,wx+Math.cos(q)*1.5,-2.4+Math.sin(q)*1.5,lt,.35)}CI(wx,-2.4,.45,ac)}
  const rodK=Math.sin(rot);R2(-hf+.5,-2.6+rodK*.6,bw-1,.5,lt);
  for(let i=0;i<4;i++){R2(-3.5+i*.3,-1-i*.9,7-i*.6,.6,ac);R2(-3.5+i*.3,-1-i*.9,.5,.6,dk)}
  PN(-hf,ty+bh-2,bw,1.4,dk,lt,bk);for(const s of [-1,1]){CI(s*(hf-.6),ty+bh-1.3,1,ol);CI(s*(hf-.6),ty+bh-1.3,.7,lt)}
  PN(-hf+1.5,ty+1,bw-3,bh-3,bs);for(let i=0;i<3;i++)M(hf-3-i*1.6,ty+1.2,.4,bh-3.4,dk);
  CI(0,cyC-.3,4.1,ol);CI(0,cyC-.3,3.7,dk);CI(0,cyC-.3,3.2,bs);for(let i=0;i<12;i++){const q=i*TAU/12;R2(Math.cos(q)*3.4-.25,cyC-.3+Math.sin(q)*3.4-.25,.5,.5,lt)}R2(-3.2,cyC-.5,6.4,.4,dk);CORE(0,cyC-.3,1.2,'c');
  PN(-5.6,ty-8,2.2,7,dk,lt,bk);R2(-6.2,ty-8.6,3.4,1,dk);SMOKE(-4.5,ty-9,5,dm?'#333':'#8a8a86');
  EL(4.6,ty-1.5,1.6,1.4,dk);EL(4.6,ty-2.2,1,.8,lt);
  R2(-2.6,ty-4.6,5.2,4.4,ol);CI(0,ty-2.6,2.2,dk);CI(0,ty-2.6,1.6,ec);CI(-.4,ty-3,.5,'#ffffff');
  if(!dm){const al=.08+.05*Math.sin(t/120);for(let k=0;k<16;k+=.5){const w=.8+k*.42;R2(-w,ty-1+k,w*2,.5,ec,al)}}
  EYECH(0,hy);break}
 /* 4 극저온 코어 — 떠다니는 얼음 결정 반응로 */
 case 4:{const rot=t/900;
  if(!dm){for(let i=0;i<6;i++){const k=((t/1100)+i/6)%1;CI((i-2.5)*1.6,-2+k*2.5,.5+k*.8,'#c8f6ff',.4*(1-k))}GL(0,-2.6,3,'#7ad8ff',.6)}
  const cy=cyC;for(let yy=-bh/2-.8;yy<bh/2+.8;yy+=.5){const hw=Math.min(hf+1.4,(bh/2+.8-Math.abs(yy))*1.5);R2(-hw-.4,cy+yy,hw*2+.8,.5,ol)}
  for(let yy=-bh/2-.4;yy<bh/2+.4;yy+=.5){const hw=Math.min(hf+1,(bh/2+.4-Math.abs(yy))*1.5);R2(-hw,cy+yy,hw*2,.5,yy<-1?lt:yy<2?bs:dk)}
  for(let i=0;i<4;i++){LN(-hf*.7+i*1.2,cy-bh/2+1,-hf*.2+i*1.5,cy-.5,'#ffffff',.3,.35)}
  CI(0,cy,2.6,ol);CI(0,cy,2.3,'#10283a');if(!dm)for(let i=0;i<3;i++){const q=rot*3+i*TAU/3;R2(Math.cos(q)*1.5-.3,cy+Math.sin(q)*1.5-.3,.6,.6,'#c8f6ff')}CORE(0,cy,1.2,'c');
  for(let i=0;i<6;i++){const q=rot+i*TAU/6,d=hf+1.6+Math.sin(t/400+i)*.4,sx=Math.cos(q)*d,sy=cy+Math.sin(q)*d*.75;LN(sx-Math.cos(q)*1.6,sy-Math.sin(q)*1.2,sx+Math.cos(q)*.6,sy+Math.sin(q)*.45,i%2?'#ffffff':lt,.8);R2(sx-.3,sy-.3,.6,.6,'#ffffff')}
  EL(0,ty-2,3,2.6,ol);EL(0,ty-2,2.6,2.2,'#bff2ff',.55);EL(-.8,ty-2.8,.9,.6,'#ffffff',.8);GL(0,ty-2.2,2,ec,.7);CI(0,ty-2.2,.8,ec);
  if(!dm)for(let i=0;i<5;i++){const k=((t/2400)+i/5)%1;R2(Math.sin(i*2.3+k*3)*(hf+3),ty-4+k*(bh+8),.4,.4,'#ffffff',.6*(1-k))}EYECH(0,hy);break}
 /* 5 스톰 하이브 — 벌집 모선 + 회전날개 + 드론 */
 case 5:{
  for(const s of [-1,1]){const rx=s*(hf+2.6),ry=ty+1;R2(rx-.4,ry-.2,.8,2.4,dk);const sp=Math.floor(t/40)%3;for(let k=0;k<3;k++)R2(rx-3.5+(k===sp?0:.8),ry-.6+k*.05,7-(k===sp?0:1.6),.4,k===sp?lt:bs,k===sp?.9:.35);R2(rx-.6,ry-.9,1.2,.8,ac);LN(s*hf,ty+2.5,rx,ry+1.6,dk,.8)}
  if(!dm){R2(-2.5,-3.2,5,.6,ac,.4+.3*Math.sin(t/70));GL(0,-2.8,2.4,ac,.5)}
  const cy=cyC;for(let yy=-bh/2-.4;yy<bh/2+.4;yy+=.5){const hw=Math.min(hf+.4,hf*.55+(bh/2+.4-Math.abs(yy))*1.1);R2(-hw-.4,cy+yy,hw*2+.8,.5,ol);R2(-hw,cy+yy,hw*2,.5,yy<-bh/2+1?lt:bs)}
  for(let r=0;r<3;r++)for(let q=0;q<5-(r===1?1:0);q++){const cx=-hf+2.5+q*2.6+(r===1?1.3:0),cyy=cy-2.4+r*2.2;if(Math.abs(cx)<1.6&&r===1)continue;R2(cx-.9,cyy-.7,1.8,1.4,dk);const on=!dm&&Math.sin(t/300+q*2.1+r*1.3)>.3;R2(cx-.6,cyy-.4,1.2,.8,on?ac:'#2a2440');if(on)GL(cx,cyy,1.2,ac,.4)}
  CORE(0,cy,1.3,'c');
  for(let i=0;i<4;i++){const q=t/700+i*TAU/4,dx=Math.cos(q)*(hf+4.5),dy=cy+Math.sin(q)*3;if(dm)continue;R2(dx-.8,dy-.5,1.6,1,dk);R2(dx-1.2,dy-.8,.8,.3,lt,.7);R2(dx+.4,dy-.8,.8,.3,lt,.7);R2(dx-.2,dy-.3,.4,.4,ac)}
  PN(-3.8,ty-4,7.6,4,dk);for(const s of [-1,1]){CI(s*1.7,ty-2,1.3,ol);CI(s*1.7,ty-2,1,'#1a1830');GL(s*1.7,ty-2,1.6,ec,.6);CI(s*1.7,ty-2,.55,ec);R2(s*1.7-.4,ty-2.5,.35,.35,'#ffffff')}
  R2(-.2,ty-7,.4,3,lt);R2(-.6,ty-7.4,1.2,.6,Math.floor(t/250)%2?ac:dk);EYECH(0,hy);break}
 /* 6 자석 크레인 — 조종석 + 붐대 + 흔들리는 전자석 */
 case 6:{const sw=dm?0:Math.sin(t/700)*2.2;
  for(const s of [-1,1]){LN(s*(hf-2),-5,s*(hf+1.5),-.8,dk,1.2);PN(s*(hf+1.5)-1.4,-1,2.8,1,lt,lt,dk);R2(s*(hf-1.5)-.4,-6,.8,2,ac)}
  PN(-hf+1,-6,bw-2,1.2,dk);
  PN(-hf,ty+1,bw,bh-1,bs);for(let i=0;i<bw;i+=2)R2(-hf+i,ty+bh-1.6,1,1,i%4?bk:ac);R2(-hf,ty+bh-1.6,bw,.3,dk);
  R2(-hf+1.6,ty+1.8,bw-3.2,3.6,ol);R2(-hf+2,ty+2.1,bw-4,3,'#1a2830');R2(-hf+2,ty+2.1,bw-4,.5,'#5a7a88');LN(-hf+3,ty+4.8,-hf+5,ty+2.3,'#ffffff',.3,.4);
  CORE(0,ty+bh-3.6,1.1,'sq');
  PN(-hf-3.5,ty+2,3.5,4,dk);for(let i=0;i<3;i++)R2(-hf-3.2,ty+2.6+i*1.2,2.9,.4,lt);
  const bx0=hf-2,by0=ty+1,bx1=hf+13,by1=ty-12;LN(bx0,by0,bx1,by1,ol,1.6);LN(bx0,by0,bx1,by1,ac,1);LN(bx0+.8,by0+1,bx1,by1+1.2,ac,.6);for(let i=1;i<8;i++){const k=i/8,k2=(i+.5)/8;LN(lerp(bx0,bx1,k),lerp(by0,by1,k),lerp(bx0+.8,bx1,k2),lerp(by0+1,by1+1.2,k2),dk,.35)}
  const mx=bx1+sw,my=by1+9;LN(bx1,by1+.6,mx,my-1.4,'#9aa5ad',.3);EL(mx,my,2.4,1.3,ol);EL(mx,my,2,1,dk);EL(mx,my-.3,2,.5,lt);R2(mx-2,my+.4,4,.4,ac);
  if(!dm&&Math.floor(t/120)%2){for(let i=0;i<3;i++)LN(mx-1.6+i*1.6,my+1.2,mx-1.4+i*1.6+Math.sin(t/60+i)*.5,my+2.6,'#8dcdf5',.3,.8)}
  PN(-3,ty-4,6,4,dk);R2(-2.4,ty-3.2,4.8,2,'#1a2830');GL(0,ty-2.2,1.8,ec,.7);R2(-.6,ty-2.8,1.2,1.2,ec);
  {const bl=Math.floor(t/150)%4;R2(-.6,ty-5,1.2,1,bl<2?'#ff5d5d':'#5a1a1a');if(bl<2&&!dm)GL(0,ty-4.6,2,'#ff5d5d',.5)}EYECH(0,hy);break}
 /* 7 시계탑 자동인형 — 시계 문자판 몸통 + 진자 + 도자기 가면 */
 case 7:{
  for(const px of [-hf+1,-1.25,hf-3.5]){PN(px,-5,2.5,5,lt,wh,dk);R2(px-.3,-5.2,3.1,.6,ac);R2(px-.3,-.6,3.1,.6,ac)}
  PN(-hf,ty+1,bw,bh-1,bs);for(let i=0;i<3;i++){R2(-hf+.4+i*.4,ty+1.4,.3,bh-1.8,i===1?ac:dk)}for(let i=0;i<3;i++)R2(hf-1.2-i*.4,ty+1.4,.3,bh-1.8,i===1?ac:dk);
  for(let i=0;i<=hf;i++)R2(-i-.5,ty+1-(hf-i)*.25,1,.6,ac);
  const cy=ty+4.6;CI(0,cy,3.6,ol);CI(0,cy,3.3,ac);CI(0,cy,2.9,wh);for(let i=0;i<12;i++){const q=i*TAU/12;R2(Math.cos(q)*2.4-.2,cy+Math.sin(q)*2.4-.2,.4,i%3?.4:.7,bk)}
  {const hq=dm?-1.2:t/2000,mq=dm?.4:t/170;LN(0,cy,Math.cos(hq)*1.4,cy+Math.sin(hq)*1.4,bk,.5);LN(0,cy,Math.cos(mq)*2.2,cy+Math.sin(mq)*2.2,'#84566b',.35)}
  if(o.expose||o.open>0)CORE(0,cy,1,'c');else{CI(0,cy,.5,ac)}
  const pcx=0,pcy=ty+bh-3.8;R2(pcx-2.1,pcy-.3,4.2,3.6,ol);R2(pcx-1.8,pcy,3.6,3,'#1a1016');const pa=dm?0:Math.sin(t/420)*.6;LN(pcx,pcy,pcx+Math.sin(pa)*2,pcy+Math.cos(pa)*2,ac,.3);CI(pcx+Math.sin(pa)*2.2,pcy+Math.cos(pa)*2.2,.6,ac);
  for(let i=-4;i<4;i++)R2(i+.1,ty-.4+(i%2?0:.4),1,.8,wh);R2(-4,ty+.2,8,.4,dk);
  EL(0,ty-2.8,2.5,2.8,ol);EL(0,ty-2.8,2.2,2.5,wh);EL(-.6,ty-3.6,.6,.4,'#ffffff');for(const s of [-1,1]){EL(s*.9,ty-3,.6,.5,bk);R2(s*.9-.25,ty-3.2,.5,.5,ec)}R2(-.8,ty-1.6,1.6,.3,'#c0506a');R2(-1.8,ty-2.4,.6,.3,'#f0a6c8',.6);R2(1.2,ty-2.4,.6,.3,'#f0a6c8',.6);
  R2(-2.4,ty-6.2,4.8,.8,dk);R2(-1.6,ty-8.6,3.2,2.6,dk);R2(-1.6,ty-7.2,3.2,.4,ac);{const bs2=dm?0:Math.sin(t/300)*.3;CI(bs2,ty-9.4,.7,ac)}EYECH(0,hy);break}
 /* 8 광학 요새 — 성벽 + 거대 렌즈 + 거울 날개 */
 case 8:{const rot=t/700;
  R2(-hf-1.4,-4.4,bw+2.8,4.8,ol);R2(-hf-1,-4,bw+2,4,dk);R2(-hf-1,-4,bw+2,.6,lt);for(let i=0;i<bw+2;i+=1.4)R2(-hf-1+((i+t/150)%(bw+2)),-1.4,.7,.5,lt);for(let i=0;i<6;i++)CI(-hf+.4+i*(bw-.8)/5,-2.2,.9,bs);
  PN(-hf,ty+1,bw,bh-1,bs);for(let r=0;r<3;r++)for(let q=0;q<5;q++)R2(-hf+.5+q*(bw-1)/5+(r%2)*1.2,ty+2.2+r*2.8,(bw-1)/5-.4,.3,dk);
  for(let i=0;i<Math.floor(bw/2);i++)if(i%2===0)PN(-hf+i*2,ty-.8,1.6,1.4,bs);
  for(const s of [-1,1]){const tx=s>0?hf-.4:-hf-2.6;PN(tx,ty-3,3,bh+1,lt,wh,dk);for(let j=0;j<3;j++)R2(tx+1.1,ty-1.6+j*2.6,.8,1.4,bk);R2(tx-.3,ty-3.8,3.6,.8,ac)}
  for(const s of [-1,1]){const mx=s*(hf+4);for(let j=0;j<3;j++){R2(mx-.8+s*j*.6,ty+1+j*2.2,1.6,1.8,ol);R2(mx-.6+s*j*.6,ty+1.2+j*2.2,1.2,1.4,'#9fffe0',.7)}if(!dm){const g2=((t/900)+(s>0?.5:0))%1;R2(mx-.6,ty+1.2+g2*6,1.2,.3,'#ffffff',.8)}}
  CI(0,cyC+.5,3.8,ol);CI(0,cyC+.5,3.4,dk);for(let i=0;i<8;i++){const q=rot+i*TAU/8;LN(Math.cos(q)*1.2,cyC+.5+Math.sin(q)*1.2,Math.cos(q+.6)*3.1,cyC+.5+Math.sin(q+.6)*3.1,lt,.5)}CI(0,cyC+.5,2.2,'#0e2a24');if(!dm){R2(-1.6,cyC-.8,.8,.5,'#ffffff',.7);R2(.6,cyC+1.6,.5,.4,'#9fffe0',.7)}CORE(0,cyC+.5,1.2,'c');
  EL(0,ty-2.2,2.8,2.4,ol);EL(0,ty-2.2,2.4,2,lt);R2(-2.4,ty-2,4.8,.4,dk);CI(0,ty-2.6,1.1,ol);{const pr=['#ff4d6d','#ffe36b','#7dffd0','#8dcdf5'][Math.floor(t/200)%4];GL(0,ty-2.6,2,dm?'#333':eg>0?'#ff4d6d':pr,.7);CI(0,ty-2.6,.7,dm?'#333':eg>0?'#ff4d6d':pr)}
  R2(-.2,ty-6.4,.4,2,lt);R2(-1,ty-6.8,2,.5,ac);EYECH(0,hy);break}
 /* 9 오메가 엔진 — 왕관 헤일로 + 반응로 심장 + 칼날 날개 */
 case 9:{const rot=t/600,fl2=dm?0:Math.sin(t/260)*.6+pul*1.5;
  if(!dm){for(let i=0;i<5;i++){const k=((t/300)+i/5)%1;R2(-2.4+i*1.2,-3+k*3,.8,1.2,k<.4?'#fff0a0':'#ff5d8f',.8*(1-k))}GL(0,-2.4,3.4,'#ff5d8f',.7)}
  PN(-3.6,-4.4,7.2,1.6,dk,lt,bk);
  for(const s of [-1,1])for(let k=0;k<4;k++){const a0=-.35-k*.32-fl2*.08,L=7+k*1.6,sx=s*(hf-1),sy=ty+2+k*.8,ex=sx+s*Math.cos(a0)*L,ey=sy+Math.sin(a0)*L;LN(sx,sy,ex,ey,ol,1.4);LN(sx,sy,ex,ey,k%2?lt:bs,.8);R2(ex-.4,ey-.4,.8,.8,ac)}
  for(let yy=0;yy<bh;yy+=.5){const hw=hf+.4-(yy/bh)*3.2;R2(-hw-.4,ty+yy,hw*2+.8,.5,ol);R2(-hw,ty+yy,hw*2,.5,yy<1?lt:yy<bh-2?bs:dk)}
  for(const s of [-1,1]){PN(s>0?hf-3.2:-hf-1.2,ty-.6,4.4,2.6,dk);R2(s>0?hf-2.8:-hf-.8,ty-.2,3.6,.5,ac)}
  if(!dm)for(const s of [-1,1])for(let i=0;i<3;i++){const ph=(Math.sin(t/200-i)+1)/2;LN(s*1.6,cyC+1.5+i*1.2,s*(hf-1.6),cyC-1.4+i*2,ac,.35,.3+.6*ph)}
  EL(0,cyC,4.2,1.4,ac,.25);{const q=rot;for(let i=0;i<16;i++){const a=i*TAU/16+q;R2(Math.cos(a)*4-.25,cyC+Math.sin(a)*1.4-.25,.5,.5,i%4?lt:'#ffffff',.9)}for(let i=0;i<12;i++){const a=i*TAU/12-q*1.4;R2(Math.cos(a)*1.2-.2,cyC+Math.sin(a)*3-.2,.4,.4,ac,.8)}}
  CI(0,cyC,2.3,ol);CI(0,cyC,2,dk);GL(0,cyC,4,ac,.35+.3*pul);CORE(0,cyC,1.4,'c');
  if(!dm){c.globalAlpha=ga0*.8;for(let i=0;i<18;i++){const a=i*TAU/18+rot*.5;R2(Math.cos(a)*4.6-.25,ty-3.4+Math.sin(a)*1.3-.25,.5,.5,i%3?ac:'#ffffff')}c.globalAlpha=ga0}
  PN(-2.6,ty-4.6,5.2,4.6,dk);R2(-2.6,ty-4.8,5.2,.6,lt);R2(-2,ty-3.2,4,.9,ec);R2(-.45,ty-3.2,.9,2.4,ec);GL(0,ty-2.8,2.4,ec,.6);
  for(const [px,h] of [[-2.4,1.6],[-1.2,2.4],[0,3.4],[1.2,2.4],[2.4,1.6]]){R2(px-.35,ty-4.8-h,.7,h,ac);R2(px-.15,ty-4.8-h-.4,.3,.4,'#ffffff')}EYECH(0,hy);break}
 }
 if(fl){c.globalAlpha=ga0}
}
/*ROBOT_END*/
