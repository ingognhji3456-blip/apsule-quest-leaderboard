/* ================= 보스 그리기 (몸통 + 떨어져 움직이는 손) ================= */
const BASEH={tread:4,legs:6,hover:6,wheel:5,pillars:5};
function geo(B,x,y,u){u=u||U;const cf=B.cfg,bt=BASEH[cf.base],bh=cf.bh,hf=cf.bw/2;return {u,hf,bt,bh,x,y,w:cf.bw*u,top:y-(bt+bh)*u,headY:y-(bt+bh+3)*u,coreY:y-(bt+bh/2)*u,sh:[[x-(hf+1)*u,y-(bt+bh*.65)*u],[x+(hf+1)*u,y-(bt+bh*.65)*u]],idl:[[x-(hf+6)*u,y-(bt+bh*.3)*u],[x+(hf+6)*u,y-(bt+bh*.3)*u]]}}
function drawMech(c,B,x,y,t,o,u){if(BOSSES.indexOf(B)>=10){drawBeast(c,B,x,y,t,o||{},u||U);return}{const _bi=BOSSES.indexOf(B);if(_bi>=0&&_bi<10){drawRobot(c,B,x,y,t,o||{},u||U,_bi);return}}u=u||U;o=o||{};const cf=B.cfg,P_=B.pal,dm=o.dorm,bs=o.flash?'#ffffff':dm?'#2a353a':P_[0],dk=o.flash?'#d5dde0':dm?'#161e22':P_[1],lt=dm?'#3a484e':P_[2],ac=dm?'#3a484e':P_[3],bk='#0b0f11';
const R2=(a,b,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x+a*u),Math.round(y+b*u),Math.round(w*u),Math.round(h*u))},M=(a,b,w,h,col)=>{R2(a,b,w,h,col);R2(-a-w,b,w,h,col)};
const bw=cf.bw,bh=cf.bh,hf=bw/2,pul=o.pulse||0,bob=(o.still||dm)?0:Math.round(Math.sin(t/300)*.7-pul*.7),fl=Math.floor(t/80)%2;let bH=4,lift=0;
const bid=BOSSES.indexOf(B),organic=bid>=10;
switch(cf.base){
case 'tread':bH=4;R2(-hf-1,-4,bw+2,4,dk);R2(-hf-1,-4,bw+2,1,lt);for(let i=0;i<4;i++)R2(-hf+i*(bw/3.4),-3,2,2,bk);for(let i=0;i<bw+2;i+=3)R2(-hf-1+((i+Math.floor(t/90))%(bw+2)),-1,1,1,lt);break;
case 'legs':if(organic){bH=6;M(hf-5,-7,4,6,dk);M(hf-4,-6,2,4,bs);M(hf-6,-1,2,2,bk);M(hf-3,-1,2,2,bk);M(hf-5,0,1,1,ac)}else{bH=6;M(hf-4,-6,3,5,dk);M(hf-4,-6,3,1,lt);M(hf-6,-1,6,1,bk)}break;
case 'hover':if(organic){bH=3;lift=3;for(const sg of [-1,0,1])R2(sg*4-1,sg===0?-4:-3,3,2,dk);if(!dm)R2(-1,-2,2,1+fl,ac)}else{bH=3;lift=3;M(hf-4,-3,4,2,dk);if(!dm)M(hf-3,-1,2,1+fl,ac);R2(-2,-2,4,1,dk)}break;
case 'wheel':if(organic){bH=5;for(let i=0;i<3;i++)R2(-hf+2+i*3,-2-((i+bid)%2),3,2,i%2?dk:bs);R2(-hf,-1,bw,2,dk)}else{bH=5;for(let r=-4;r<=4;r++){const w=Math.round(Math.sqrt(16-r*r)*2);R2(-w/2,-4+r,w,1,dk)}R2(-1,-4,2,2,lt);R2(-hf,-3,bw,2,dk)}break;
case 'pillars':if(organic){bH=5;R2(-hf+1,-5,4,5,dk);R2(-1,-5,4,5,dk);R2(hf-5,-5,4,5,dk);R2(-hf+1,-5,4,1,bs);R2(-1,-5,4,1,bs);R2(hf-5,-5,4,1,bs)}else{bH=5;R2(-hf+1,-5,3,5,dk);R2(-1,-5,3,5,dk);R2(hf-4,-5,3,5,dk);R2(-hf+1,-5,3,1,lt);R2(-1,-5,3,1,lt);R2(hf-4,-5,3,1,lt)}break}
const ty=-bH-lift-bh+bob,cy0=ty+Math.floor(bh/2)-2;
if(organic){
 R2(-hf+1,ty,bw-2,1,dk);R2(-hf,ty+1,bw,bh-2,dk);R2(-hf+1,ty+bh-1,bw-2,1,dk);
 R2(-hf+1,ty+1,bw-2,bh-2,bs);
 R2(-hf+1,ty+bh-3,bw-2,2,shade(dk,.5));
 const lumps=[[-hf,ty+2,2,3],[hf-2,ty+bh-6,2,3],[-hf+2,ty+bh-1,3,2],[hf-5,ty,3,2]];
 lumps.forEach(([lx,ly,lw,lh],k)=>{if((k+bid)%2===0)R2(lx,ly,lw,lh,dk)});
 for(let i=0;i<5;i++){const mx=-hf+2+((i*5+bid)%Math.max(1,bw-4)),my=ty+2+((i*3+bid)%Math.max(1,bh-3));R2(mx,my,2,1,shade(ac,.45))}
}else{
 R2(-hf,ty,bw,bh,dk);R2(-hf+1,ty+1,bw-2,bh-2,bs);R2(-hf+1,ty+1,bw-2,1,lt);R2(-hf+1,ty+bh-2,bw-2,1,dk);
 for(const [a,b] of [[-hf+1,ty+1],[hf-2,ty+1],[-hf+1,ty+bh-3],[hf-2,ty+bh-3]])R2(a,b,1,1,dk);
 R2(-hf+3,ty+3,2,1,dk);R2(hf-5,ty+3,2,1,dk);
 // Layered shoulder plates, seam lines, rivets, and a boss-specific insignia.
 R2(-hf+2,ty+2,3,1,lt);R2(hf-5,ty+2,3,1,lt);R2(-hf+2,ty+bh-3,3,1,dk);R2(hf-5,ty+bh-3,3,1,dk);
 R2(-hf+2,ty+3,1,Math.max(1,bh-6),dk);R2(hf-3,ty+3,1,Math.max(1,bh-6),dk);
 for(let i=0;i<Math.floor((bw-10)/3);i++)R2(-hf+5+i*3,ty+bh-3,1,1,lt);
}
// Large silhouette parts keep each pixel boss readable even at a glance.
switch(bid){
case 0:for(const sg of [-1,1]){R2(sg*(hf+1),ty+3,4,7,dk);R2(sg*(hf+2),ty+4,2,5,lt);R2(sg*(hf+3),ty+5,1,3,ac)}R2(-2,ty-7,4,3,lt);R2(-1,ty-8,2,1,ac);break;
case 1:R2(-1,ty-12,2,8,dk);R2(-5,ty-14,2,3,lt);R2(3,ty-14,2,3,lt);R2(-6,ty-15,3,1,ac);R2(3,ty-15,3,1,ac);for(let j=0;j<3;j++){R2(-hf-3,ty+2+j*3,3,1,j%2?lt:ac);R2(hf,ty+2+j*3,3,1,j%2?ac:lt)}break;
case 2:M(hf-1,ty+1,5,5,dk);M(hf-2,ty+2,5,2,lt);M(hf-1,ty+5,4,2,ac);R2(-2,ty-8,4,4,dk);R2(-1,ty-10,2,2,lt);R2(-1,ty-2,2,2,'#ffb020');break;
case 3:R2(-hf+2,ty+bh, bw-4,3,dk);R2(-hf+4,ty+bh+3,bw-8,2,lt);R2(-hf+6,ty+bh+5,bw-12,2,dk);R2(-4,ty-9,8,5,dk);R2(-3,ty-11,6,2,lt);R2(-2,ty-13,4,2,'#ff6b3d');break;
case 4:for(const sg of [-1,1]){R2(sg*(hf+2),ty+1,3,2,'#c8f6ff');R2(sg*(hf+3),ty-1,2,3,'#7ad8ff');R2(sg*(hf+4),ty-3,1,3,'#ffffff');R2(sg*(hf+2),ty+5,3,3,'#5a8394')}R2(-2,ty-8,4,3,'#c8f6ff');R2(-1,ty-10,2,2,'#ffffff');break;
case 5:for(const sg of [-1,1]){R2(sg*(hf+1),ty+1,4,2,dk);R2(sg*(hf+3),ty-1,5,2,lt);R2(sg*(hf+6),ty-3,4,2,ac);R2(sg*(hf+7),ty-5,2,2,lt);R2(sg*(hf+5),ty+3,3,3,dk)}R2(-2,ty-8,4,2,ac);R2(-1,ty-10,2,2,lt);break;
case 6:R2(hf-2,ty-12,3,13,dk);R2(hf-1,ty-13,20,3,lt);R2(hf+17,ty-12,3,4,dk);R2(hf+18,ty-9,1,6,lt);R2(hf+16,ty-4,5,2,ac);R2(hf+17,ty-2,3,2,dk);R2(-hf-4,ty+1,4,4,dk);break;
case 7:R2(-2,ty-14,4,7,dk);R2(-1,ty-16,2,3,ac);R2(-hf-3,ty+1,2,9,lt);R2(-hf-4,ty+8,4,3,dk);R2(hf+1,ty+1,2,7,lt);R2(hf,ty+7,4,3,dk);R2(-1,ty-8,2,2,'#fff0a0');break;
case 8:for(const sg of [-1,1]){R2(sg*(hf+1),ty,3,9,dk);R2(sg*(hf+3),ty-2,4,9,lt);R2(sg*(hf+6),ty-4,3,8,ac);R2(sg*(hf+8),ty-6,2,6,'#9fffe0');R2(sg*(hf+3),ty+8,5,2,'#17322b')}R2(-3,ty-8,6,2,lt);break;
case 9:for(const sg of [-1,1]){R2(sg*7,ty-12,2,5,ac);R2(sg*10,ty-10,2,3,lt);R2(sg*13,ty-7,2,3,ac);R2(sg*15,ty-4,2,2,lt)}R2(-2,ty-12,4,3,dk);R2(-1,ty-14,2,2,'#ffe066');R2(-2,ty+bh,4,4,ac);break;
case 10:for(const sg of [-1,1]){R2(sg*(hf+1),ty+bh-4,3,6,dk);R2(sg*(hf+2),ty+bh-3,2,4,'#3a2a18');R2(sg*(hf+3),ty+bh-1,1,3,ac)}R2(-3,ty-6,6,4,dk);R2(-2,ty-8,4,3,'#7ad84f');break;
case 11:for(let i=0;i<5;i++){const a=i*TAU/5+t/900;R2(Math.cos(a)*(hf+4)-1,ty-2+Math.sin(a)*4,3,3,ac)}R2(-3,ty-9,6,5,lt);break;
case 12:M(hf,ty+1,7,3,dk);M(hf+1,ty+3,5,3,lt);R2(-2,ty-7,4,4,dk);R2(-1,ty-9,2,3,'#8fd6b8');break;
case 13:R2(-hf-3,ty+2,3,7,lt);R2(-hf-4,ty+8,2,4,dk);R2(hf,ty+2,3,7,lt);R2(hf+2,ty+8,2,4,dk);R2(-2,ty-9,4,4,'#fff7dd');break;
case 14:for(const sg of [-1,1]){R2(sg*(hf+1),ty-1,5,2,dk);R2(sg*(hf+5),ty-3,5,2,lt);R2(sg*(hf+9),ty-5,4,2,ac)}R2(-2,ty-8,4,3,'#f0b8ff');break;
case 15:M(hf-1,ty-6,10,4,dk);M(hf+2,ty-9,7,3,lt);R2(-2,ty-2,4,2,'#1a1a1a');break;
case 16:for(let i=0;i<6;i++){const a=i*TAU/6+t/700;R2(Math.cos(a)*(hf+3)-1,ty+bh/2+Math.sin(a)*6-1,2,2,'#7de0ff')}R2(-3,ty-8,6,5,dk);break;
case 17:M(hf-1,ty+2,9,4,dk);M(hf+3,ty+5,6,3,lt);R2(-3,ty-9,6,5,dk);R2(-2,ty-11,4,3,'#ff5d8f');break;
case 18:for(let i=0;i<7;i++)R2(-hf+i*3,ty-4-((i%3)*2),1,3,lt);R2(-2,ty-9,4,3,dk);break;
case 19:R2(-hf-5,ty-9,3,7,ac);R2(hf+2,ty-9,3,7,ac);for(const sg of [-1,1]){R2(sg*(hf+1),ty+bh-3,4,6,dk);R2(sg*(hf+2),ty+bh,2,5,lt)}R2(-3,ty-11,6,5,'#b83aff');break;
}
switch(bid){
case 0:R2(-hf+4,ty+2,2,2,ac);R2(hf-6,ty+2,2,2,ac);R2(-hf+4,ty+5,2,1,lt);R2(hf-6,ty+5,2,1,lt);break;
case 1:R2(-hf+3,ty+3,2,1,ac);R2(-hf+3,ty+5,3,1,lt);R2(hf-6,ty+3,3,1,lt);R2(hf-5,ty+5,2,1,ac);break;
case 2:for(let i=0;i<3;i++){R2(-hf+4,ty+3+i*2,2,1,i===1?'#fff0a0':ac);R2(hf-6,ty+3+i*2,2,1,i===1?'#fff0a0':ac)}break;
case 3:R2(-hf+3,ty+3,bw-6,1,lt);R2(-hf+3,ty+5,bw-6,1,ac);R2(-hf+4,ty+7,2,1,'#ff6b3d');break;
case 4:R2(-hf+4,ty+3,2,2,ac);R2(-hf+5,ty+2,1,1,'#ffffff');R2(hf-6,ty+3,2,2,ac);R2(hf-6,ty+2,1,1,'#ffffff');break;
case 5:for(let i=0;i<3;i++){R2(-hf+3+i*2,ty+3,1,2,lt);R2(hf-4-i*2,ty+3,1,2,lt)}R2(-2,ty+2,4,1,ac);break;
case 6:R2(-hf+3,ty+2,2,1,ac);R2(-hf+5,ty+3,1,3,ac);R2(hf-5,ty+2,2,1,ac);R2(hf-6,ty+3,1,3,ac);break;
case 7:for(let i=0;i<4;i++){R2(-1,ty+2+i*2,2,1,i%2?lt:ac)}R2(-hf+3,ty+3,2,1,ac);R2(hf-5,ty+3,2,1,ac);break;
case 8:R2(-hf+3,ty+3,2,1,ac);R2(-hf+5,ty+4,1,2,lt);R2(hf-5,ty+3,2,1,ac);R2(hf-6,ty+4,1,2,lt);break;
case 9:R2(-hf+3,ty+3,2,2,ac);R2(hf-5,ty+3,2,2,ac);R2(-hf+5,ty+6,bw-10,1,lt);break;
case 10:R2(-hf+3,ty+4,2,1,'#7ad84f');R2(hf-5,ty+4,2,1,'#7ad84f');break;
case 11:R2(-2,ty+3,4,1,ac);R2(-hf+3,ty+5,2,1,lt);R2(hf-5,ty+5,2,1,lt);break;
case 12:R2(-hf+3,ty+3,2,2,ac);R2(hf-5,ty+3,2,2,ac);break;
case 13:for(let i=0;i<3;i++)R2(-hf+4+i*3,ty+4,1,2,'#fff7dd');break;
case 14:R2(-2,ty+2,4,2,ac);R2(-1,ty+4,2,1,'#ffffff');break;
case 15:R2(-hf+3,ty+3,2,1,'#1a1a1a');R2(hf-5,ty+3,2,1,'#1a1a1a');break;
case 16:for(let i=0;i<3;i++)R2(-hf+4+i*3,ty+3+((i%2)),1,2,'#7de0ff');break;
case 17:R2(-2,ty+3,4,2,ac);break;
case 18:R2(-hf+3,ty+3,2,1,lt);R2(hf-5,ty+3,2,1,lt);break;
case 19:R2(-hf+3,ty+3,2,2,ac);R2(hf-5,ty+3,2,2,ac);R2(-2,ty+6,4,1,'#b83aff');break;
}
if(organic){
 const ecx=Math.round(x),ecy=Math.round(y+(cy0+2)*u),er=3.3*u;
 pcirc(ecx,ecy,er,bk,1,c);
 if(o.expose){const f2=Math.floor(t/70)%2;pcirc(ecx,ecy,er-1,f2?ac:'#ffffff',1,c);pcirc(ecx,ecy,1.3*u,f2?'#ffffff':ac,1,c);c.globalAlpha=.3;pcirc(ecx,ecy,er+3,ac,1,c);c.globalAlpha=1}
 else if(o.open>0){pcirc(ecx,ecy,er-1,ac,1,c);c.globalAlpha=.25*o.open;pcirc(ecx,ecy,er+4,ac,1,c);c.globalAlpha=1}
 else{pcirc(ecx,ecy,er-1,dk,1,c);pcirc(ecx,ecy,er-2.2,bk,.85,c)}
}else{
 R2(-3,cy0-1,6,6,bk);
 if(o.expose){const f2=Math.floor(t/70)%2;R2(-2,cy0,4,4,f2?ac:'#ffffff');R2(-1,cy0+1,2,2,f2?'#ffffff':ac);c.globalAlpha=.3;R2(-6,cy0-4,12,12,ac);c.globalAlpha=1}
 else if(o.open>0){R2(-2,cy0,4,4,ac);c.globalAlpha=.25*o.open;R2(-5,cy0-3,10,10,ac);c.globalAlpha=1}
 else{R2(-2,cy0,4,4,dk);R2(-2,cy0+1,4,1,bk);R2(-2,cy0+2,4,1,bk)}
}
const eg=o.eye||0,ec=dm?'#333':(o.expose?'#ffffff':(eg>0?'#ff4d6d':ac));
switch(cf.head){
case 'visor':R2(-4,ty-4,8,4,dk);R2(-3,ty-3,6,2,bk);R2(-3+(dm?0:Math.floor((t/220)%5)),ty-3,2,2,ec);R2(-4,ty-4,8,1,lt);break;
case 'twin':R2(-5,ty-4,10,4,dk);R2(-5,ty-4,10,1,lt);R2(-4,ty-3,3,2,bk);R2(1,ty-3,3,2,bk);R2(-3,ty-3,1,1,ec);R2(2,ty-3,1,1,ec);break;
case 'dome':R2(-2,ty-5,4,1,lt);R2(-3,ty-4,6,1,bs);R2(-4,ty-3,8,3,dk);R2(-2,ty-3,4,2,bk);R2(-1,ty-3,2,2,ec);break;
case 'cyclops':R2(-3,ty-5,6,5,dk);R2(-2,ty-4,4,3,bk);R2(-1,ty-3,2,2,ec);if(!dm&&Math.floor(t/1200)%7===0)R2(-2,ty-4,4,2,dk);R2(-3,ty-5,6,1,lt);break;
case 'skull':R2(-4,ty-6,8,6,lt);R2(-3,ty-5,2,2,bk);R2(1,ty-5,2,2,bk);R2(-3,ty-5,1,1,ec);R2(2,ty-5,1,1,ec);R2(-1,ty-3,2,1,dk);for(let i=-3;i<3;i+=2)R2(i,ty-2,1,2,dk);break;
case 'crown':R2(-4,ty-3,8,3,dk);R2(-4,ty-6,1,3,ac);R2(-1,ty-7,2,4,ac);R2(3,ty-6,1,3,ac);R2(-3,ty-2,6,1,ec);break;
case 'maw':R2(-5,ty-6,10,6,dk);R2(-4,ty-5,8,4,bk);for(let i=-3;i<4;i+=2)R2(i,ty-5,1,2,'#fff7dd');R2(-1,ty-3,2,2,ec);R2(-5,ty-6,10,1,lt);break;
case 'insect':R2(-4,ty-5,8,5,dk);R2(-4,ty-5,8,1,lt);for(const sg of [-2,0,2])R2(sg-1,ty-4,2,2,ec);R2(-2,ty-2,4,1,bk);break}
if(eg>0){const gs=2+Math.round(eg*6);c.globalAlpha=.4+.5*eg;R2(-gs/2,ty-3-gs/2+1,gs,gs,'#ff4d6d');R2(-1,ty-3,2,2,'#ffffff');c.globalAlpha=1;for(let i=0;i<Math.round(eg*5);i++)R2((RND()-.5)*10,ty-3+(RND()-.5)*8,1,1,'#ffb0bd')}
for(const e of cf.ex){
if(e==='gears'){for(const sg of [-1,1]){const gx=sg*(hf-2),gy=ty-3,a=t/400*sg;R2(gx-1,gy-1,2,2,dk);for(let i=0;i<4;i++)R2(gx+Math.cos(a+i*Math.PI/2)*2-.5,gy+Math.sin(a+i*Math.PI/2)*2-.5,1,1,lt)}}
if(e==='pipes'){M(hf-3,ty-4,2,4,dk);R2(-hf+1,ty-6-Math.floor((t/200)%3),2,2,'#3a4348');R2(hf-3,ty-6-Math.floor((t/260)%3),2,2,'#3a4348')}
if(e==='antenna'){R2(hf-3,ty-9,1,5,lt);R2(hf-4,ty-10,3,1,Math.floor(t/300)%2?ac:dk)}
if(e==='fins'){M(hf,ty-2,2,3,ac);M(hf+1,ty-3,1,1,ac)}
if(e==='fangs'){M(hf-4,ty+bh-2,1,3,'#fff7dd');M(hf-2,ty+bh-2,1,4,'#fff7dd')}
if(e==='horns'){M(hf-5,ty-8,2,5,ac);M(hf-6,ty-10,2,3,shade(ac,.7))}
if(e==='tail'){const sw=Math.sin(t/260)*4;R2(-hf-2,ty+bh-3,4,3,dk);R2(-hf-6+sw*.2,ty+bh-1,5,3,lt);R2(-hf-9+sw*.4,ty+bh+1,4,3,ac)}
if(e==='wings'){const fl2=Math.sin(t/180)*2;M(hf-1,ty-2+fl2,9,3,dk);M(hf+2,ty-4+fl2,6,2,lt)}
if(e==='fur'){for(let i=0;i<6;i++)R2(-hf+2+i*2,ty-1+((i%2)?1:0),1,3,lt)}
}}
function drawHand(c,B,h,sx,sy,t,dorm,sc){if(BOSSES.indexOf(B)>=10){drawBeastHand(c,B,h,sx,sy,t,dorm,sc);return}sc=sc||1;const P_=B.pal,dk=dorm?'#161e22':P_[1],bs=dorm?'#2a353a':P_[0],lt=dorm?'#3a484e':P_[2],ac=dorm?'#3a484e':P_[3],x=Math.round(h.x),y=Math.round(h.y),F=(a,b,w,hh,col)=>{c.fillStyle=col;c.fillRect(Math.round(x+a*sc),Math.round(y+b*sc),Math.max(1,Math.round(w*sc)),Math.max(1,Math.round(hh*sc)))};
line(sx,sy,x,y,5*sc,(px,py,i)=>{c.fillStyle=i%2?dk:'#0b0f11';c.fillRect(Math.round(px-1),Math.round(py-1),3,3)});
const arm=B.cfg.arms;
if(arm==='piston'||arm==='none'&&false){F(-8,-8,16,15,dk);F(-7,-7,14,4,lt);F(-7,-3,14,9,bs);F(-3,-3,1,9,dk);F(2,-3,1,9,dk)}
else if(arm==='claw'){F(-6,-6,12,10,dk);F(-5,-5,10,7,bs);F(-7,4,4,9,lt);F(-2,4,4,10,lt);F(3,4,4,9,lt)}
else if(arm==='cannon'){F(-7,-6,14,12,dk);F(-6,-5,12,4,lt);const a=h.ang||0,k=(h.kick||0)*4*sc;for(let i=6*sc;i<22*sc;i+=2){c.fillStyle=i>18*sc?lt:bs;c.fillRect(Math.round(x+Math.cos(a)*(i-k)-2*sc),Math.round(y+Math.sin(a)*(i-k)-2*sc),Math.round(4*sc),Math.round(4*sc))}
 if(h.charge>0){pcirc(x+Math.cos(a)*24*sc,y+Math.sin(a)*24*sc,(3+Math.round(h.charge*4))*sc,'#ffb0bd',.9,c)}}
else if(arm==='coil'){F(-5,-7,10,14,dk);for(let i=0;i<3;i++)F(-6,-6+i*5,12,2,i%2?lt:ac);if(Math.floor(t/90)%3===0){F(6,-3,3,1,'#ffffff');F(-9,1,3,1,'#ffffff')}}
else if(arm==='tentacle'){const wv=Math.sin(t/220)*3;for(let i=0;i<5;i++){const seg=i/4;F(-4+wv*seg-3*(1-seg),-6+i*3,8-i,3,i%2?dk:bs)}F(-2,7,4,4,ac)}
else if(arm==='fang'){F(-5,-7,10,9,dk);F(-4,-6,8,6,bs);F(-3,2,2,5,'#fff7dd');F(1,2,2,5,'#fff7dd')}
else if(arm==='saw'){if(h.armed!==false){pcirc(x,y,9*sc,'#9aa5ad',1,c);pcirc(x,y,6*sc,'#5c6870',1,c);for(let i=0;i<8;i++){const a=t/90+i*Math.PI/4;c.fillStyle='#e8eef0';c.fillRect(Math.round(x+Math.cos(a)*9.5*sc-1),Math.round(y+Math.sin(a)*9.5*sc-1),3,3)}F(-2,-2,4,4,ac)}else{F(-5,-5,10,10,dk);F(-2,-2,4,4,ac)}}
else{pcirc(x,y,8*sc,dk,1,c);pcirc(x,y,6*sc,ac,1,c);pcirc(x,y,3*sc,'#ffffff',1,c)}
if(h.stuck){F(-12,9,24,3,'#0b0f11');if(Math.floor(t/120)%2)F(-10,-10,3,3,'#ffe79a')}}
function idleHandsAt(B,x,y,u){const g=geo(B,x,y,u);return [{x:g.idl[0][0],y:g.idl[0][1],ang:Math.PI*.5},{x:g.idl[1][0],y:g.idl[1][1],ang:Math.PI*.5}]}

