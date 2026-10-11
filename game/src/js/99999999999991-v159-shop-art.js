/* ================= v159 재화 상점 그림 (CSART) =================
   재화 상점(9999999999999 CS159) 칸 12개의 뒤 그림을 한 칸(1px)씩 찍는다. 그림 판 144×104.
   - 바닥은 멀어질수록 좁아지는 원근(나무 마루 · 돌 타일 · 대리석 · 눈), 벽은 벽돌 · 나무 · 벽지 · 강철 · 동굴.
   - 빛은 왼쪽 위에서. 물건마다 바닥에 닿는 그림자, 쌓인 동전은 뒤에서 앞으로 겹쳐 쌓고 아래일수록 어둡게.
   - 바닥에 흘린 동전은 누워 있고(납작한 동전 + 아래 그림자), 몇 개는 서서 굴러가고, 보석은 옆으로 누워 바닥에 색빛을 비춘다.
   - 움직이는 것(촛불 · 횃불 · 눈 · 떠 있는 다이아 · 레이저)은 anim(key,k,t)이 매 순간 덧그린다. */
(()=>{try{
 const W=144,H=104,TAU=Math.PI*2;
 let sd=1;const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647,ri=(a,b)=>Math.floor(a+rnd()*(b-a+1));
 const hsh=(a,b)=>{const v=Math.sin(a*127.1+b*311.7)*43758.5453;return v-Math.floor(v)};
 function K(x){const k={x,
  p:(X,Y,c)=>{x.fillStyle=c;x.fillRect(X|0,Y|0,1,1)},
  a:(X,Y,c,al)=>{x.globalAlpha=al;x.fillStyle=c;x.fillRect(X|0,Y|0,1,1);x.globalAlpha=1},
  r:(X,Y,w,h,c)=>{x.fillStyle=c;x.fillRect(X|0,Y|0,Math.max(0,w|0),Math.max(0,h|0))},
  el:(cx,cy,rx,ry,c)=>{x.fillStyle=c;for(let y=-ry;y<=ry;y++){const w=Math.round(rx*Math.sqrt(Math.max(0,1-(y*y)/((ry+.45)*(ry+.45)))));x.fillRect(Math.round(cx-w),Math.round(cy+y),w*2+1,1)}},
  poly:(pts,c)=>{x.fillStyle=c;const ys=pts.map(p=>p[1]),y0=Math.floor(Math.min(...ys)),y1=Math.ceil(Math.max(...ys));for(let y=y0;y<y1;y++){const yy=y+.5,xs=[];for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];if((a[1]<=yy&&b[1]>yy)||(b[1]<=yy&&a[1]>yy))xs.push(a[0]+(yy-a[1])/(b[1]-a[1])*(b[0]-a[0]))}xs.sort((p,q)=>p-q);for(let i=0;i+1<xs.length;i+=2){const a=Math.round(xs[i]),b=Math.round(xs[i+1]);if(b>a)x.fillRect(a,y,b-a,1)}}},
  ln:(x0,y0,x1,y1,c)=>{x.fillStyle=c;x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);const dx=Math.abs(x1-x0),dy=-Math.abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1;let e=dx+dy;for(let n=0;n<999;n++){x.fillRect(x0,y0,1,1);if(x0===x1&&y0===y1)break;const e2=2*e;if(e2>=dy){e+=dy;x0+=sx}if(e2<=dx){e+=dx;y0+=sy}}},
  spr:(rows,X,Y,pal,flip)=>{const w=rows[0].length;rows.forEach((r,y)=>{for(let i=0;i<r.length;i++){const ch=r[i];if(ch==='.'||!pal[ch])continue;x.fillStyle=pal[ch];x.fillRect(X+(flip?w-1-i:i),Y+y,1,1)}})},
  /* 띠로 끊은 그림자 · 빛(도트 느낌: 3~4단계) */
  shade:(cx,cy,rx,ry,al,col)=>{col=col||'#000';for(let y=-ry;y<=ry;y++)for(let i=-rx;i<=rx;i++){const d=(i*i)/(rx*rx)+(y*y)/(ry*ry);if(d>1)continue;const s=Math.ceil((1-d)*3)/3;x.globalAlpha=al*s;x.fillStyle=col;x.fillRect(cx+i,cy+y,1,1)}x.globalAlpha=1},
  vband:(X,Y,w,h,cols)=>{const n=cols.length;for(let y=0;y<h;y++){const t=y/h*n;const B=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];for(let i=0;i<w;i++){const f=t-Math.floor(t),j=Math.min(n-1,Math.floor(t)+(B[((Y+y)&3)*4+((X+i)&3)]/16<f?1:0));x.fillStyle=cols[j];x.fillRect(X+i,Y+y,1,1)}}}};
  return k}
 /* ---------- 팔레트 ---------- */
 const GOLDP=[{K:'#5a3404',Y:'#fff6b8',y:'#ffd23a',o:'#c08414'},{K:'#4a2a04',Y:'#f4dc78',y:'#e0aa22',o:'#9a640c'},{K:'#3a2004',Y:'#d8b048',y:'#b88418',o:'#7a4c08'}];
 const gp=h=>({K:'hsl('+h+',70%,14%)',W:'#ffffff',L:'hsl('+h+',100%,84%)',m:'hsl('+h+',92%,60%)',d:'hsl('+h+',88%,38%)',D:'hsl('+h+',80%,24%)'});
 /* ---------- 동전 ---------- */
 const COINF=['.KKKKK.','KYYYyyK','KyyyyyK','KooooOK','.KKKKK.'];/* 누운 동전(윗면 + 테) */
 const COINF5=['.KKK.','KYyyK','KoooK','.KKK.'];
 const COINE=['.KK.','KYoK','KyoK','KyoK','KyoK','KyoK','.KK.'];/* 선 동전 */
 const COINB=['...KKKKK...','..KYYYYyK..','.KYYKKKyyK.','KYYKyyyKyoK','KYyKyYyKyoK','KyyKyyyKooK','.KyyKKKooK.','..KyyyooK..','...KKKKK...'];/* 앞에서 본 큰 동전(새김) */
 const cp=(i)=>Object.assign({O:GOLDP[i].o},GOLDP[i]);
 function coin(k,X,Y,t){k.spr(COINF,X,Y,cp(t||0))}
 function coinS(k,X,Y,t){k.spr(COINF5,X,Y,cp(t||0))}
 /* 바닥에 누운 동전: 아래 그림자 한 줄 + 동전 */
 function lyingCoin(k,X,Y,t){k.a(X+1,Y+5,'#000',.35);k.a(X+2,Y+5,'#000',.45);k.a(X+3,Y+5,'#000',.45);k.a(X+4,Y+5,'#000',.45);k.a(X+5,Y+5,'#000',.35);k.a(X+6,Y+4,'#000',.3);coin(k,X,Y,t)}
 function edgeCoin(k,X,Y){k.shade(X+3,Y+7,3,1,.5);k.spr(COINE,X,Y,cp(0))}
 /* 동전 산: 뒤(위)부터 앞(아래)으로 겹쳐 쌓기, 아래 · 가장자리일수록 어둡게 */
 function pile(k,cx,by,w,h,seed,opt){opt=opt||{};sd=seed;k.shade(cx,by+1,Math.round(w/2)+4,4,.55);const L=[];const n=Math.round(w*h/7);
  for(let i=0;i<n;i++){const u=rnd()*2-1,top=h*Math.pow(Math.max(0,1-u*u),.75),v=rnd();const y=by-4-v*top,x=cx+u*w/2-3+(rnd()-.5)*2;L.push({x:Math.round(x),y:Math.round(y),v,u})}
  L.sort((a,b)=>a.y-b.y||a.x-b.x);for(const c of L){const t=c.v>.62?0:c.v>.28?1:2,ed=Math.abs(c.u)>.85?1:0;coin(k,c.x,c.y,Math.min(2,t+ed))}
  /* 위에 몇 개는 서 있거나 앞을 보는 동전 */const tops=L.filter(c=>c.v>.75);for(let i=0;i<(opt.face||2)&&tops.length;i++){const c=tops[ri(0,tops.length-1)];k.spr(COINB,c.x-2,c.y-7,cp(0))}
  for(let i=0;i<(opt.edge||2)&&tops.length;i++){const c=tops[ri(0,tops.length-1)];k.spr(COINE,c.x+2,c.y-5,cp(0))}
  for(let i=0;i<Math.round(n/14);i++){const c=L[ri(Math.floor(L.length*.4),L.length-1)];if(c.v>.4)k.p(c.x+2,c.y+1,'#ffffff')}return L}
 /* 흘린 동전: 무리 지어 겹친 것 + 따로 떨어진 것 + 굴러가는 것 */
 function spill(k,pts,seed){sd=seed;for(const [x,y,n] of pts){for(let i=0;i<(n||1);i++)lyingCoin(k,x+ri(-3,3)*(i?1:0),y+ri(-1,1)*(i?1:0)-i,i?0:rnd()<.3?1:0)}}
 function stack(k,X,by,n,t){for(let i=0;i<n;i++){const j=(hsh(X,i)>.6?1:0)-(hsh(i,X)>.7?1:0);k.spr(['.KKKKK.','KoooooK','.KKKKK.'],X+j,by-3-i*2,cp(t||1))}k.spr(COINF,X,by-6-(n-1)*2,cp(0));k.shade(X+3,by,4,1,.5)}
 /* 금괴(3/4에서 본): 윗면 · 앞면 · 옆면 */
 function bar(k,X,Y,s){s=s||1;const w=13*s,h=5*s,d=3*s;
  k.poly([[X+d,Y],[X+w+d,Y],[X+w,Y+d],[X,Y+d]],'#fff2a8');k.poly([[X+d+1,Y+1],[X+w+d-1,Y+1],[X+w-1,Y+d],[X+1,Y+d]],'#ffd84a');
  k.r(X,Y+d,w,h,'#e0a422');k.r(X,Y+d,w,1,'#ffe070');k.poly([[X+w,Y+d],[X+w+d,Y],[X+w+d,Y+h],[X+w,Y+d+h]],'#a06a0c');
  k.r(X,Y+d+h-1,w,1,'#8a5408');k.r(X+Math.round(w/2)-2,Y+d+1,4,h-2,'#c88a14');k.p(X+Math.round(w/2)-1,Y+d+2,'#ffe070');/* 찍힌 표 */
  k.ln(X,Y+d,X+d,Y,'#5a3404');k.ln(X+d,Y,X+w+d,Y,'#5a3404');k.ln(X+w+d,Y,X+w+d,Y+h,'#5a3404');k.ln(X+w+d,Y+h,X+w,Y+d+h,'#5a3404');k.r(X,Y+d+h,w+1,1,'#5a3404');k.r(X-1,Y+d,1,h,'#5a3404');k.p(X+d+2,Y+1,'#ffffff')}
 function barPyr(k,cx,by,rows,s){s=s||1;for(let r=0;r<rows;r++){const n=rows-r;for(let i=0;i<n;i++)bar(k,Math.round(cx-n*7*s+i*14*s+r*0),by-(8+r*7)*s+0,s)}}
 /* ---------- 보석 ---------- */
 const GEMS=['..KKKKK..','.KWLLmmK.','KLLLmmmdK','KDLmmmddK','.KDmmdDK.','..KDmDK..','...KDK...','....K....'];
 const GEMSM=['.KKK.','KWLmK','KLmdK','.KdK.','..K..'];
 function gem(k,X,Y,h){k.spr(GEMS,X,Y,gp(h))}
 function gemSm(k,X,Y,h){k.spr(GEMSM,X,Y,gp(h))}
 /* 누운 보석: 위에서 본 팔각 + 그림자 + 바닥에 번지는 색빛 */
 function lyingGem(k,X,Y,h,big){const P=gp(h);k.shade(X+3,Y+5,big?6:4,big?2:1,.5);k.shade(X+5,Y+6,big?9:6,big?3:2,.35,'hsl('+h+',100%,60%)');
  if(big){k.poly([[X+2,Y],[X+7,Y],[X+9,Y+2],[X+9,Y+4],[X+7,Y+6],[X+2,Y+6],[X,Y+4],[X,Y+2]],P.K);k.poly([[X+2,Y+1],[X+7,Y+1],[X+8,Y+2],[X+8,Y+4],[X+7,Y+5],[X+2,Y+5],[X+1,Y+4],[X+1,Y+2]],P.d);
   k.poly([[X+3,Y+2],[X+6,Y+2],[X+7,Y+3],[X+6,Y+4],[X+3,Y+4],[X+2,Y+3]],P.m);k.r(X+3,Y+2,2,1,P.L);k.p(X+3,Y+2,'#ffffff');k.r(X+6,Y+4,2,1,P.D)}
  else{k.poly([[X+1,Y],[X+5,Y],[X+6,Y+2],[X+5,Y+4],[X+1,Y+4],[X,Y+2]],P.K);k.r(X+1,Y+1,5,3,P.d);k.r(X+2,Y+1,3,2,P.m);k.p(X+2,Y+1,P.L);k.p(X+2,Y+1,'#ffffff');k.p(X+5,Y+3,P.D)}}
 /* 보석 산(서 있는 보석 + 누운 보석 섞어) */
 function gemPile(k,cx,by,w,h,seed,hues){sd=seed;k.shade(cx,by+1,Math.round(w/2)+3,3,.5);const L=[];const n=Math.round(w*h/9);for(let i=0;i<n;i++){const u=rnd()*2-1,top=h*Math.pow(Math.max(0,1-u*u),.8),v=rnd();L.push({x:Math.round(cx+u*w/2-4),y:Math.round(by-6-v*top),h:hues[i%hues.length],v,s:rnd()<.35})}
  L.sort((a,b)=>a.y-b.y);for(const g of L){if(g.s)gemSm(k,g.x+2,g.y+3,g.h);else gem(k,g.x,g.y,g.h);if(g.v<.3){k.a(g.x+3,g.y+5,'#000',.25);k.a(g.x+4,g.y+5,'#000',.25)}}return L}
 /* 큰 다이아(면 나눔) */
 function bigGem(k,cx,cy,s,h){const T=cy-s*.55,M=cy-s*.12,B=cy+s*.85,Wd=s,P=gp(h);
  k.poly([[cx-Wd-1,M],[cx-Wd*.55-1,T-1],[cx+Wd*.55+1,T-1],[cx+Wd+1,M],[cx,B+1]],P.K);
  const fc=[[[cx-Wd,M],[cx-Wd*.55,T],[cx-Wd*.2,T],[cx-Wd*.45,M]],[[cx-Wd*.45,M],[cx-Wd*.2,T],[cx+Wd*.2,T],[cx+Wd*.45,M]],[[cx+Wd*.45,M],[cx+Wd*.2,T],[cx+Wd*.55,T],[cx+Wd,M]],
   [[cx-Wd,M],[cx-Wd*.45,M],[cx-Wd*.1,B]],[[cx-Wd*.45,M],[cx,M],[cx-Wd*.1,B],[cx,B]],[[cx,M],[cx+Wd*.45,M],[cx,B]],[[cx+Wd*.45,M],[cx+Wd,M],[cx,B]]];
  const cs=[P.L,'#ffffff',P.m,P.m,P.L,P.d,P.D];fc.forEach((f,i)=>k.poly(f,cs[i]));k.ln(cx-Wd,M,cx+Wd,M,'hsl('+h+',100%,92%)');
  k.ln(cx-Wd*.45,M,cx-Wd*.1,B-1,'hsl('+h+',100%,88%)');k.ln(cx+Wd*.45,M,cx,B-1,P.d);k.p(cx-Wd*.3,T+2,'#ffffff');k.p(cx-Wd*.3+1,T+2,'#ffffff');k.p(cx-Wd*.3,T+3,'#ffffff')}
 /* ---------- 바닥 · 벽 ---------- */
 function floorP(k,y0,kind,o){o=o||{};const VX=o.vx||72,VY=y0-70;for(let y=y0;y<H;y++){const s=(y-VY)/(H-VY),dep=y-y0;for(let x=0;x<W;x++){let c;
   if(kind==='wood'){const bw=13*s,b=Math.floor((x-VX)/bw),f=((x-VX)/bw)-b,t=hsh(b,3);const seam=f<1/bw;const end=Math.floor((y+t*40)/(10+s*12))%5===0&&((y+Math.floor(t*40))%(Math.round(10+s*12)))===0;
    const l=26+t*8+dep*.25;c=seam||end?'#2a1608':'hsl('+(26+t*6)+','+(42+t*10)+'%,'+l+'%)';if(!seam&&hsh(x,y)>.93)c='hsl(24,40%,'+(l-6)+'%)'}
   else if(kind==='stone'||kind==='marble'||kind==='snow'){const tw=(kind==='marble'?18:15)*s,cx=Math.floor((x-VX)/tw),fx=((x-VX)/tw)-cx,dz=1/s,rz=Math.floor(dz*3.2),fz=dz*3.2-rz;const edge=fx<1/tw||fz<.06*dz;const t=hsh(cx,rz);
    if(kind==='stone'){c=edge?'#1a1612':'hsl('+(28+t*10)+','+(6+t*8)+'%,'+(22+t*10+dep*.18)+'%)';if(!edge&&fz<.16*dz)c='hsl(30,10%,'+(34+t*10)+'%)'}
    else if(kind==='marble'){const ch=(cx+rz)%2===0;c=edge?'#3a3440':ch?'hsl(40,20%,'+(76+t*8)+'%)':'hsl(260,10%,'+(18+t*6)+'%)';if(!edge&&hsh(x*3,y*7)>.96)c=ch?'#c8c0d0':'#4a4458'}
    else{c='hsl(200,'+(30+t*10)+'%,'+(78+t*6+dep*.1)+'%)';if(hsh(x,y*3)>.985)c='#ffffff';if(edge&&hsh(cx,rz+9)>.5)c='hsl(200,40%,70%)'}}
   if(c)k.r(x,y,1,1,c)}}
  /* 벽과 닿는 곳 그늘 */for(let i=0;i<5;i++){k.x.globalAlpha=.35*(1-i/5);k.r(0,y0+i,W,1,'#000')}k.x.globalAlpha=1;
  if(o.sheen){const [sx,sy,sr]=o.sheen;k.shade(sx,sy,sr,Math.round(sr/3),.18,'#fff4d0')}}
 function brick(k,y0,h1,h2,o){o=o||{};for(let y=0;y<y0;y+=6){const off=(y/6)%2?6:0;for(let x=-off;x<W;x+=12){const t=hsh(x,y);k.r(x,y,12,6,'#140e0c');k.r(x+1,y+1,10,4,'hsl('+(h1+t*h2)+','+(o.sat||14)+'%,'+((o.l||22)+t*8)+'%)');k.r(x+1,y+1,10,1,'hsl('+(h1+t*h2)+','+(o.sat||14)+'%,'+((o.l||22)+t*8+8)+'%)');k.r(x+1,y+4,10,1,'hsl('+(h1+t*h2)+','+(o.sat||14)+'%,'+((o.l||22)+t*8-6)+'%)');if(t>.8)k.r(x+3+Math.floor(t*5),y+2,2,1,'rgba(0,0,0,0.35)')}}}
 function woodWall(k,y0,hue,l){for(let x=0;x<W;x+=7){const t=hsh(x,1);k.r(x,0,7,y0,'hsl('+hue+',40%,'+(l+t*6)+'%)');k.r(x,0,1,y0,'hsl('+hue+',40%,'+(l-8)+'%)');k.r(x+1,0,1,y0,'hsl('+hue+',40%,'+(l+t*6+5)+'%)');for(let j=0;j<6;j++)k.r(x+2+Math.floor(hsh(x,j)*4),Math.floor(hsh(j,x)*y0),1,ri(2,6),'hsl('+hue+',40%,'+(l-4)+'%)');k.p(x+3,4,'#1a0e06');k.p(x+3,y0-6,'#1a0e06')}}
 function steelWall(k,y0){for(let y=0;y<y0;y+=16)for(let x=0;x<W;x+=24){k.r(x,y,24,16,'#1a1e26');k.r(x+1,y+1,22,14,'#4a5262');k.r(x+1,y+1,22,1,'#7a8292');k.r(x+1,y+1,1,14,'#6a7282');k.r(x+1,y+14,22,1,'#2e3440');k.r(x+22,y+1,1,14,'#2e3440');for(const [a,b] of [[3,3],[20,3],[3,12],[20,12]]){k.p(x+a,y+b,'#9aa2b2');k.p(x+a+1,y+b+1,'#2a2e38')}}}
 function lamp(k,x,y,col){k.r(x,0,1,y,'#1e1e24');k.r(x-3,y,7,2,'#2a2a34');k.r(x-2,y+2,5,4,col||'#ffd070');k.r(x-2,y+6,5,1,'#2a2a34');k.p(x-1,y+3,'#ffffff');k.shade(x,y+14,18,10,.18,col||'#ffd070')}
 function torchB(k,x,y){k.r(x-1,y,3,9,'#4a2c16');k.r(x-2,y-1,5,2,'#6a6a76');k.r(x-2,y+3,5,1,'#6a6a76');k.shade(x,y-4,16,13,.22,'#ffb050')}
 function rug(k,cx,cy,rx,ry,c1,c2){k.el(cx,cy,rx+1,ry+1,'#1a0e06');k.el(cx,cy,rx,ry,c1);k.el(cx,cy,rx-3,ry-2,c2);k.el(cx,cy,rx-5,ry-3,c1);for(let i=-rx;i<=rx;i+=3){k.p(cx+i,cy+ry+2,c2)}}
 function vign(k){for(let y=0;y<H;y++)for(let x=0;x<W;x++){const dx=(x-W/2)/(W/2),dy=(y-H/2)/(H/2),d=dx*dx*.8+dy*dy*.9;if(d<.55)continue;const s=Math.min(1,(d-.55)/.6);if((x+y)%2&&s<.5)continue;k.a(x,y,'#000',.38*s)}
  for(let x=0;x<W;x++){k.a(x,0,'#000',.5);k.a(x,H-1,'#000',.5)}for(let y=0;y<H;y++){k.a(0,y,'#000',.5);k.a(W-1,y,'#000',.5)}}
 /* ---------- 상자 · 금고 · 주머니 ---------- */
 /* 3/4 상자: 앞면 x,y(앞 위) 폭 w 높이 h 깊이 d, 뚜껑은 뒤로 열림 */
 function chest(k,x,y,w,h,d,st,fill){const S=st;
  /* 뚜껑(뒤로 젖힘): 안쪽 면 */k.poly([[x+d,y-d],[x+w+d,y-d],[x+w+d-2,y-d-h*.95],[x+d+2,y-d-h*.95]],S.edge);k.poly([[x+d+2,y-d-1],[x+w+d-2,y-d-1],[x+w+d-3,y-d-h*.95+2],[x+d+3,y-d-h*.95+2]],S.lin);
  for(let i=x+d+6;i<x+w+d-4;i+=6)k.ln(i,y-d-2,i+1,y-d-h*.9+2,S.lin2);k.r(x+d+2,y-d-h*.95,w-4,2,S.band);
  /* 안 · 채움 */k.poly([[x,y],[x+d,y-d],[x+w+d,y-d],[x+w,y]],'#140a04');if(fill)fill();
  /* 옆면 */k.poly([[x+w,y],[x+w+d,y-d],[x+w+d,y-d+h],[x+w,y+h]],S.side);for(let j=y+3;j<y+h;j+=4)k.ln(x+w,j,x+w+d,j-d,S.sideL);
  /* 앞면 판자 */for(let j=0;j<h;j+=4){const t=hsh(x,j);k.r(x,y+j,w,4,S.front(t));k.r(x,y+j,w,1,S.frontL);k.r(x,y+j+3,w,1,S.frontD)}
  /* 쇠띠 · 못 · 자물쇠 */for(const bx of S.bands(w)){k.r(x+bx,y,3,h,S.band);k.r(x+bx,y,1,h,S.bandL);for(let j=y+2;j<y+h;j+=4)k.p(x+bx+1,j,S.bandL)}k.r(x,y,w,2,S.band);k.r(x,y,w,1,S.bandL);k.r(x,y+h-2,w,2,S.band);
  const lx=x+Math.round(w/2)-4;k.r(lx,y+2,8,9,'#2a1a08');k.r(lx+1,y+3,6,7,S.lock);k.r(lx+1,y+3,6,1,'#fff4c0');k.r(lx+3,y+5,2,2,'#14100a');k.r(lx+3,y+7,2,2,'#14100a');k.p(lx+4,y+9,'#14100a');
  k.ln(x,y,x,y+h,'#140a04');k.ln(x,y+h,x+w,y+h,'#140a04');k.ln(x+w+d,y-d,x+w+d,y-d+h,'#140a04');k.ln(x+w,y+h,x+w+d,y-d+h,'#140a04');
  k.shade(x+w/2+d/2,y+h+1,Math.round(w/2+d/2+3),3,.55)}
 const ST={wood:{edge:'#3a2210',lin:'#5a3a1c',lin2:'#4a2e14',band:'#4a4a56',bandL:'#8a8a9a',side:'#4a2a12',sideL:'#3a200c',front:t=>'hsl(28,45%,'+(30+t*6)+'%)',frontL:'#a87444',frontD:'#3a2210',bands:w=>[3,w-6],lock:'#c8a050'},
  royal:{edge:'#3a0a14',lin:'#8a1a2a',lin2:'#6a1020',band:'#c8a050',bandL:'#fff0a0',side:'#4a2410',sideL:'#3a1a08',front:t=>'hsl(22,50%,'+(28+t*6)+'%)',frontL:'#a8683a',frontD:'#2a1408',bands:w=>[2,Math.round(w*.28),Math.round(w*.68),w-5],lock:'#ffd23a'},
  ice:{edge:'#3a7aa8',lin:'#bff0ff',lin2:'#8ad8f8',band:'#e8fbff',bandL:'#ffffff',side:'#4a9ac8',sideL:'#7ac8f0',front:t=>'hsla(198,80%,'+(62+t*10)+'%,1)',frontL:'#e8fbff',frontD:'#3a8ac0',bands:w=>[3,w-6],lock:'#e8fbff'},
  jewel:{edge:'#3a1408',lin:'#e06a9a',lin2:'#c84a7a',band:'#c8a050',bandL:'#fff0a0',side:'#4a2410',sideL:'#3a1a08',front:t=>'hsl(18,55%,'+(32+t*5)+'%)',frontL:'#b8784a',frontD:'#2a1408',bands:w=>[2,w-5],lock:'#ffd23a'}};
 function pouch(k,cx,cy,r,c){/* 옆으로 누운 천 주머니: 둥근 몸통 · 오른쪽 입구로 모이는 주름 · 빛 · 바느질 */const [d1,m,l]=c;k.shade(cx+2,cy+r-1,r+5,3,.6);
  k.el(cx,cy,r+1,r,'#140a04');k.el(cx,cy,r,r-1,d1);k.el(cx-1,cy-1,r-1,r-2,m);k.el(cx-3,cy-3,Math.round(r*.55),Math.round(r*.45),l);k.el(cx-4,cy-5,2,1,'#ffffff');
  k.x.globalAlpha=.55;k.el(cx+2,cy+3,r-3,r-5,d1);k.x.globalAlpha=1;/* 아래 그늘 */
  const nx=cx+r-1,ny=cy-3;/* 입구 쪽으로 모이는 주름(곡선) */for(let i=-2;i<=2;i++){const sx=cx-r*.55,sy=cy+i*r*.32;for(let t=0;t<=1;t+=.04){const x=sx+(nx-sx)*t,y=sy+(ny-sy)*t+Math.sin(t*Math.PI)*i*1.6;k.p(x,y,t<.3?m:d1)}}
  for(let a=0.4;a<5.9;a+=.32){const x=cx+Math.cos(a+Math.PI)*(r-2),y=cy+Math.sin(a+Math.PI)*(r-3);if(x<nx-3)k.p(x,y,l)}/* 바느질 점 */}
 function candle(k,x,y,h){k.shade(x+1,y+h+1,4,1,.5);k.r(x-1,y+h,5,2,'#c8a050');k.r(x-2,y+h+1,7,1,'#8a6a2a');k.r(x,y,3,h,'#f4ecd8');k.r(x,y,1,h,'#ffffff');k.r(x+2,y,1,h,'#d8ccb0');k.p(x+2,y+2,'#f4ecd8');k.p(x+2,y+3,'#f4ecd8');k.r(x+1,y-1,1,1,'#2a1a0e');k.shade(x+1,y-3,14,10,.2,'#ffd070')}
 function safe(k,x,y,w,h,d,inner){/* 강철 금고 몸통(3/4) + 안쪽 */k.shade(x+w/2+d,y+h+1,w/2+d+3,3,.6);k.poly([[x,y],[x+d,y-d],[x+w+d,y-d],[x+w,y]],'#8a92a4');k.ln(x+1,y-1,x+w+d-1,y-d,'#c8d0e0');
  k.poly([[x+w,y],[x+w+d,y-d],[x+w+d,y+h-d],[x+w,y+h]],'#3a4050');k.r(x,y,w,h,'#5a6274');k.r(x,y,w,1,'#9aa2b4');k.r(x,y,1,h,'#7a8294');k.r(x,y+h-1,w,1,'#2a2e38');
  k.r(x+3,y+3,w-6,h-6,'#14161c');k.r(x+4,y+4,w-8,h-8,'#2a2e38');k.vband(x+4,y+4,w-8,h-8,['#3a3020','#2a2418','#1a1610']);if(inner)inner();
  k.r(x+2,y+h,3,2,'#2a2e38');k.r(x+w-5,y+h,3,2,'#2a2e38')}
 function safeDoor(k,x,y,w,h){/* 열린 문(오른쪽으로 젖혀짐, 두께 보임) */k.poly([[x,y],[x+w,y+3],[x+w,y+h+2],[x,y+h]],'#4a5262');k.poly([[x+1,y+1],[x+w-1,y+4],[x+w-1,y+h+1],[x+1,y+h-1]],'#7a8294');k.ln(x+1,y+1,x+w-1,y+4,'#aab2c4');
  k.r(x-2,y,2,h,'#2a2e38');for(const j of [6,h/2,h-7]){k.r(x-4,y+j,4,3,'#c8ccd8');k.p(x-4,y+j,'#ffffff')}
  const cx=x+Math.round(w/2),cy=y+Math.round(h*.42);k.el(cx,cy,5,5,'#2a2e38');k.el(cx,cy,4,4,'#c8ccd8');k.el(cx,cy,2,2,'#8a92a4');for(let a=0;a<12;a++)k.p(cx+Math.round(Math.cos(a/12*TAU)*4),cy+Math.round(Math.sin(a/12*TAU)*4),'#4a5262');k.p(cx,cy-4,'#ff4a4a');
  k.r(cx-1,cy+8,3,6,'#c8ccd8');k.r(cx-4,cy+13,9,2,'#c8ccd8');k.p(cx-4,cy+13,'#ffffff')}
 /* ---------- 장면 12개 ---------- */
 const S={};
 S.g0=k=>{/* 동전 주머니: 나무 벽 · 탁자 위로 쏟아진 동전 · 양초 · 장부 */sd=3;woodWall(k,58,26,22);k.r(0,20,W,2,'#6a4424');k.r(0,22,W,1,'#1a0e06');
  for(const [x,c,hh] of [[10,'#ffd23a',10],[22,'#c8d0dc',8],[34,'#ff9a4a',10],[104,'#8ad8ff',9],[118,'#ffd23a',10],[130,'#c86a4a',8]]){k.r(x,20-hh,9,hh,'#c8e4ec');k.r(x+1,21-hh,7,hh-2,c);k.r(x,19-hh,9,2,'#8a5a30');k.p(x+1,21-hh,'#ffffff');k.p(x+1,22-hh,'#ffffff');k.r(x+8,21-hh,1,hh-1,'#8aa8b0')}
  k.r(60,0,1,10,'#1e1e24');k.r(56,10,9,2,'#2a2a34');k.r(57,12,7,8,'#ffcf6a');k.r(57,12,7,1,'#fff0b0');k.r(60,12,1,8,'#c88a2a');k.r(56,20,9,1,'#2a2a34');k.shade(60,24,28,14,.2,'#ffd070');
  /* 탁자 윗면(원근) */for(let y=58;y<H;y++){const s=(y-58)/(H-58);for(let x=0;x<W;x++){const b=Math.floor((x-72)/(18*(0.6+s*.6)));const t=hsh(b,7);let c='hsl(26,'+(46+t*8)+'%,'+(28+t*6+s*6)+'%)';if(((x-72)/(18*(0.6+s*.6))-b)<.05)c='#2a1608';if(hsh(x,y)>.95)c='hsl(24,40%,24%)';k.r(x,y,1,1,c)}}
  for(let i=0;i<4;i++){k.x.globalAlpha=.4*(1-i/4);k.r(0,58+i,W,1,'#000')}k.x.globalAlpha=1;k.shade(70,80,46,14,.15,'#fff0d0');
  /* 장부 · 깃펜 · 잉크병 */k.poly([[100,66],[126,64],[130,74],[104,77]],'#2a1408');k.poly([[101,66],[125,64],[129,73],[104,76]],'#f4ecd8');k.ln(114,65,117,75,'#b8a888');for(let i=0;i<4;i++){k.ln(103,68+i*2,112,67+i*2,'#8a7a5a');k.ln(118,67+i*2,127,66+i*2,'#8a7a5a')}
  k.r(132,62,7,7,'#1a1a2a');k.r(133,61,5,2,'#3a3a4a');k.p(133,63,'#6a6a8a');k.ln(135,61,128,46,'#f4f4ff');k.ln(136,60,130,47,'#d8d8e8');k.ln(134,58,131,52,'#ffffff');
  candle(k,12,48,14);
  /* 쓰러진 주머니 · 쏟아진 동전 */pouch(k,46,70,13,['#5a3216','#8a5426','#b8783e']);k.el(58,66,4,5,'#140a04');k.el(58,66,3,4,'#2a1408');k.ln(54,58,58,62,'#c8a050');k.ln(55,57,60,60,'#c8a050');k.r(52,56,3,3,'#a87a30');
  pile(k,66,74,16,4,41,{face:0,edge:0});spill(k,[[74,72,2],[80,76,1],[86,73,2],[92,78,1],[78,82,1],[96,84,2],[70,84,1],[88,88,1],[60,88,1],[104,90,1]],5);edgeCoin(k,112,80);k.p(118,84,'#e8c050');k.p(121,85,'#c8981a');
  k.spr(COINB,30,82,cp(0));k.shade(35,92,6,1,.45);vign(k)};
 S.g1=k=>{/* 나무 상자: 돌 지하실 · 횃불 · 통 · 자루 */brick(k,62,20,14,{l:20});torchB(k,16,26);torchB(k,128,26);floorP(k,62,'stone',{sheen:[72,80,40]});
  /* 통 */const bx=6;k.shade(bx+9,93,11,3,.55);k.r(bx,66,18,27,'#3a2210');for(let i=0;i<18;i+=3)k.r(bx+i,66,3,27,'hsl(26,40%,'+(26+hsh(i,4)*8)+'%)');k.r(bx,66,18,1,'#7a5228');k.r(bx-1,70,20,2,'#4a4a56');k.r(bx-1,85,20,2,'#4a4a56');k.el(bx+9,66,9,2,'#5a3a1a');k.el(bx+9,66,7,1,'#2a1608');
  /* 자루 */k.shade(132,92,10,2,.5);k.poly([[124,92],[122,78],[127,70],[133,70],[138,78],[137,92]],'#8a7a5a');k.poly([[125,90],[124,79],[128,72],[131,72],[133,79],[130,90]],'#b8a880');k.r(126,69,9,2,'#5a4a30');k.ln(130,76,132,86,'#7a6a4a');
  chest(k,44,64,50,22,10,ST.wood,()=>pile(k,74,64,44,9,17,{face:2,edge:1}));
  spill(k,[[38,92,2],[30,96,1],[100,90,1],[108,94,2],[96,98,1]],9);edgeCoin(k,116,86);vign(k)};
 S.g2=k=>{/* 보물 상자 넘침: 지하 보물방 · 거미줄 · 쇠사슬 */brick(k,60,265,25,{l:16,sat:18});torchB(k,12,24);torchB(k,132,24);floorP(k,60,'stone',{sheen:[72,84,50]});
  k.ln(0,0,16,0,'#c8c8d8');k.ln(0,0,0,14,'#c8c8d8');k.ln(0,0,12,10,'#c8c8d8');for(let r=4;r<14;r+=4){k.ln(r,0,0,r,'#9898a8')}for(let y=0;y<16;y+=2){k.p(124,y,'#6a6a76');k.p(125,y+1,'#8a8a96')}
  k.shade(72,52,40,20,.25,'#ffd23a');
  chest(k,40,60,54,24,12,ST.royal,()=>{pile(k,79,58,58,22,23,{face:3,edge:3});gem(k,64,40,330);gem(k,92,44,200);bar(k,68,46)});
  /* 앞으로 흘러내린 동전 · 금괴 · 목걸이 · 잔 */pile(k,30,96,30,8,31,{face:1,edge:1});pile(k,112,94,26,7,37,{face:1,edge:0});spill(k,[[56,92,2],[66,96,1],[84,95,2],[96,98,1],[48,100,1]],13);
  bar(k,6,84);bar(k,118,80);lyingGem(k,102,88,140,1);lyingGem(k,20,100,200);lyingGem(k,90,100,50);
  for(let i=0;i<14;i++){const x=60+i*2,y=84+Math.round(Math.sin(i/13*Math.PI)*5);k.p(x,y,'#f4f4ff');k.p(x,y+1,'#a8a8c0')}gem(k,72,86,330);
  k.shade(130,98,5,1,.5);k.r(127,86,7,3,'#ffd23a');k.r(128,89,5,4,'#e0a422');k.r(130,93,1,3,'#c88a14');k.r(127,96,7,1,'#c88a14');k.p(128,86,'#fff4b0');vign(k)};
 S.g3=k=>{/* 작은 금고: 벽지 · 판벽 · 액자 · 스탠드 · 양탄자 */for(let y=0;y<44;y++)for(let x=0;x<W;x++){const p=((x+(Math.floor(y/8)%2)*6)%12),q=y%8;k.p(x,y,(p===6&&q===4)||(Math.abs(p-6)+Math.abs(q-4)===3)?'#2e5a46':'#1e3a2e')}
  k.r(0,44,W,16,'#4a2c16');for(let x=2;x<W;x+=24){k.r(x,46,20,12,'#3a2210');k.r(x,46,20,1,'#6a4424');k.r(x,46,1,12,'#6a4424')}k.r(0,43,W,2,'#7a5228');
  k.r(98,6,32,24,'#8a5a20');k.r(100,8,28,20,'#c8a050');k.r(101,9,26,18,'#5a8ac8');k.r(101,20,26,7,'#3a7a3a');k.el(120,13,3,3,'#fff0a0');k.poly([[101,20],[110,12],[118,20]],'#5a6a7a');k.poly([[106,20],[114,15],[122,20]],'#4a5a6a');
  floorP(k,60,'wood',{sheen:[60,82,40]});rug(k,62,88,48,10,'#7a1a2a','#c8a050');
  /* 탁자 · 스탠드 */k.r(118,62,22,3,'#6a4424');k.r(120,65,2,26,'#4a2c16');k.r(136,65,2,26,'#4a2c16');k.shade(129,92,12,2,.5);k.r(127,52,3,10,'#c8a050');k.poly([[121,52],[136,52],[132,44],[125,44]],'#2a6a4a');k.r(121,51,15,1,'#ffe080');k.shade(128,62,18,8,.3,'#ffe0a0');
  safe(k,26,40,48,46,8,()=>{const x=30,y=44;k.r(x,y+13,40,1,'#5a5242');k.r(x,y+27,40,1,'#5a5242');for(let i=0;i<3;i++)bar(k,x+1+i*13,y+4);for(let i=0;i<4;i++)stack(k,x+3+i*9,y+26,3+i%2);
   for(let i=0;i<3;i++){k.shade(x+7+i*12,y+38,5,1,.4);k.el(x+7+i*12,y+34,5,4,'#8a6a3a');k.el(x+6+i*12,y+33,3,2,'#b8986a');k.r(x+5+i*12,y+29,4,2,'#5a4a2a');k.p(x+7+i*12,y+34,'#ffd23a')}});
  safeDoor(k,82,37,16,48);spill(k,[[30,94,2],[44,96,1],[58,92,1],[80,96,2],[94,90,1]],21);stack(k,104,96,6);stack(k,112,98,4);vign(k)};
 S.g4=k=>{/* 은행 금고: 대여 금고 칸 벽 · 금괴 수레 · 금자루 · 반짝이는 바닥 */for(let y=2;y<56;y+=11)for(let x=2;x<W;x+=14){k.r(x,y,13,10,'#14161c');k.r(x+1,y+1,11,8,'#8a92a4');k.r(x+1,y+1,11,1,'#c8d0e0');k.r(x+5,y+4,3,2,'#2a2e38');k.p(x+6,y+5,'#ffd23a');k.r(x+2,y+7,3,1,'#c8a050')}
  lamp(k,40,0,'#fff4d0');lamp(k,104,0,'#fff4d0');floorP(k,58,'marble',{sheen:[72,78,50]});
  /* 금괴 수레 */k.shade(72,98,40,3,.55);k.r(34,86,76,4,'#3a3e4a');k.r(34,86,76,1,'#8a92a4');for(const wx of [40,104]){k.el(wx,93,4,4,'#14161c');k.el(wx,93,2,2,'#6a7282')}k.r(32,70,2,18,'#6a7282');k.r(30,68,6,2,'#8a92a4');
  for(let r=0;r<4;r++){const n=5-r;for(let i=0;i<n;i++)bar(k,72-n*8+i*16+r*0,78-r*7)}
  /* 금자루 */for(const [x,y] of [[118,80],[128,86],[8,82]]){k.shade(x+6,y+12,9,2,.5);k.el(x+6,y+5,8,7,'#5a4a2a');k.el(x+6,y+5,7,6,'#a88a5a');k.el(x+4,y+3,3,2,'#d8bc8a');k.r(x+3,y-3,6,3,'#7a6a4a');k.r(x+2,y-1,8,1,'#c8a050');k.spr(['.K.','KyK','.K.','KyK','.K.'],x+5,y+3,cp(1))}
  pile(k,22,98,22,5,47,{face:1,edge:1});spill(k,[[60,100,1],[84,100,2],[112,100,1]],27);
  /* 큰 문 테두리(왼쪽) */k.r(0,0,6,H,'#2a2e38');k.r(1,0,4,H,'#5a6274');for(let y=8;y<H;y+=14){k.el(3,y,2,2,'#c8ccd8');k.p(3,y,'#ffffff')}vign(k)};
 S.g5=k=>{/* 황금 대금고: 둥근 문 · 황금 산 · 왕관 · 붉은 융단 · 빛줄기 */k.r(0,0,W,62,'#2a0e14');for(let x=0;x<W;x+=16){k.r(x,0,8,62,'#341218')}
  for(let i=0;i<6;i++){const x0=60+i*12;k.x.globalAlpha=.08;k.poly([[x0,0],[x0+6,0],[x0+20,62],[x0+8,62]],'#fff0b0');k.x.globalAlpha=1}
  floorP(k,62,'marble',{sheen:[84,80,40]});k.poly([[64,104],[78,62],[108,62],[124,104]],'#8a0a1e');k.poly([[66,104],[79,63],[81,63],[70,104]],'#ffd166');k.poly([[118,104],[106,63],[108,63],[122,104]],'#ffd166');
  k.shade(92,44,46,28,.3,'#ffe080');
  pile(k,92,78,84,46,53,{face:6,edge:4});bar(k,58,64);bar(k,104,58);bar(k,80,52);bar(k,118,70);
  for(const [x,y,h] of [[70,60,330],[96,48,200],[112,64,120],[86,66,280],[64,74,50]])gem(k,x,y,h);
  /* 왕관 */const cx=92,cy=24;k.poly([[cx-10,cy+8],[cx-11,cy-2],[cx-6,cy+3],[cx,cy-5],[cx+6,cy+3],[cx+11,cy-2],[cx+10,cy+8]],'#5a3404');k.poly([[cx-9,cy+7],[cx-10,cy],[cx-6,cy+4],[cx,cy-3],[cx+6,cy+4],[cx+10,cy],[cx+9,cy+7]],'#ffd23a');
  k.r(cx-9,cy+5,19,3,'#e0a422');k.r(cx-9,cy+5,19,1,'#fff4b0');for(const [x,h] of [[-6,350],[0,200],[6,120]]){k.el(cx+x,cy+6,1,1,'hsl('+h+',90%,55%)')}for(const x of [-10,0,10])k.el(cx+x,cy-(x?2:5),1,1,'#ffffff');k.shade(cx,cy+12,12,2,.45);
  /* 홀 · 잔 */k.ln(120,40,132,62,'#c8a050');k.ln(121,40,133,62,'#ffe080');k.el(120,39,2,2,'#ff3a5a');
  spill(k,[[60,92,2],[50,98,1],[130,92,2],[138,98,1],[44,90,1]],33);lyingGem(k,128,84,330,1);lyingGem(k,52,84,200);
  /* 둥근 금고문(왼쪽에 굴려 둠, 두께 보임) */const dx=26,dy=54;k.shade(dx+6,dy+31,26,4,.6);k.el(dx+5,dy,24,28,'#1a1c24');k.el(dx+3,dy,24,28,'#4a5262');k.el(dx,dy,24,28,'#8a92a4');k.el(dx,dy,21,25,'#6a7282');k.el(dx,dy,16,19,'#9aa2b4');k.el(dx,dy,13,15,'#5a6274');k.el(dx,dy,4,4,'#c8ccd8');
  for(let a=0;a<8;a++){const an=a/8*TAU;k.ln(dx,dy,dx+Math.cos(an)*12,dy+Math.sin(an)*14,'#c8ccd8');k.el(dx+Math.round(Math.cos(an)*12),dy+Math.round(Math.sin(an)*14),1,1,'#e8ecf4')}
  for(let a=0;a<20;a++){const an=a/20*TAU;k.r(dx+Math.round(Math.cos(an)*22)-1,dy+Math.round(Math.sin(an)*26)-1,2,2,'#ffd23a')}k.ln(dx-14,dy-22,dx-6,dy-26,'#e8ecf4');vign(k)};
 S.d0=k=>{/* 보석 주머니: 보라 벨벳 탁자 · 쏟아진 보석 · 돋보기 · 촛대 */k.vband(0,0,W,56,['#0c1230','#141c44','#1e2858']);for(let x=0;x<W;x+=18){k.r(x,0,9,56,'rgba(0,0,0,0)');k.x.globalAlpha=.25;k.r(x,0,2,56,'#000');k.x.globalAlpha=1}
  for(let i=0;i<W;i+=5){k.r(i,0,4,3,'#e8e0f0');k.p(i+1,3,'#c8c0d8');k.p(i+2,4,'#c8c0d8')}
  /* 벨벳 탁자보(주름) */for(let y=56;y<H;y++)for(let x=0;x<W;x++){const f=Math.sin(x/9+y/30)*.5+.5;k.p(x,y,'hsl(275,'+(45+f*10)+'%,'+(16+f*10+(y-56)*.12)+'%)')}for(let i=0;i<4;i++){k.x.globalAlpha=.4*(1-i/4);k.r(0,56+i,W,1,'#000')}k.x.globalAlpha=1;
  candle(k,10,40,14);candle(k,130,42,12);
  pouch(k,52,72,13,['#3a1458','#6a2a9a','#9a5ac8']);k.el(64,68,4,5,'#14081e');k.el(64,68,3,4,'#2a1040');k.ln(46,58,40,54,'#ffd166');k.ln(47,58,42,55,'#ffd166');k.r(38,52,3,4,'#c8901a');k.r(39,56,1,3,'#ffd166');
  gemPile(k,72,76,16,4,61,[200,330,120]);for(const [x,y,h,b] of [[78,72,200,1],[88,78,330,0],[96,74,50,1],[84,86,120,0],[104,82,200,0],[74,90,280,1],[112,90,190,0],[94,94,330,0],[62,92,50,0]])lyingGem(k,x,y,h,b);
  /* 돋보기 */k.shade(122,96,10,2,.5);k.el(118,84,8,6,'#c8a050');k.el(118,84,6,4,'rgba(200,230,255,0.35)');k.p(115,82,'#ffffff');k.p(116,81,'#ffffff');k.ln(124,88,134,96,'#4a2c16');k.ln(125,88,135,96,'#6a4424');vign(k)};
 S.d1=k=>{/* 보석함: 화장대 · 거울 · 향수 · 반지 */k.r(0,0,W,58,'#2a1438');for(let y=0;y<58;y+=6)for(let x=(y/6%2)*6;x<W;x+=12){k.p(x,y+2,'#4a2a5a');k.p(x+1,y+3,'#3a1e4a');k.p(x-1,y+3,'#3a1e4a');k.p(x,y+4,'#4a2a5a')}
  k.el(72,22,26,20,'#8a5a20');k.el(72,22,24,18,'#c8a050');k.el(72,22,22,16,'#a8c8d8');k.el(72,22,20,14,'#7898b0');k.ln(58,14,66,8,'#ffffff');k.ln(60,16,70,8,'#e0f0ff');k.shade(72,22,14,10,.15,'#ffffff');
  /* 화장대 윗면 */for(let y=58;y<H;y++)for(let x=0;x<W;x++){const t=hsh(Math.floor(x/22),3);k.p(x,y,hsh(x,y)>.94?'#5a3018':'hsl(20,'+(40+t*8)+'%,'+(24+t*5+(y-58)*.15)+'%)')}for(let i=0;i<4;i++){k.x.globalAlpha=.4*(1-i/4);k.r(0,58+i,W,1,'#000')}k.x.globalAlpha=1;
  for(const [x,c,h] of [[8,'#ff8ad0',14],[20,'#8ad8ff',11],[124,'#ffd166',13],[134,'#c8ffd0',10]]){k.shade(x+4,74,6,1,.5);k.r(x,74-h,9,h,c);k.r(x,74-h,9,1,'#ffffff');k.r(x+1,74-h+1,2,h-3,'rgba(255,255,255,0.6)');k.r(x+2,72-h,5,2,'#e8e8f0');k.r(x+3,68-h,3,4,'#c8a050');k.p(x+4,67-h,'#fff0a0')}
  chest(k,40,66,52,18,10,ST.jewel,()=>{k.r(44,58,48,6,'#e06a9a');for(let i=0;i<5;i++){k.r(46+i*9,59,7,4,'#a83a6a');k.el(49+i*9,60,2,1,'#ffd23a');k.p(49+i*9,59,'hsl('+(i*70)+',90%,60%)')}gemPile(k,70,62,40,6,71,[200,330,120,50,280])});
  /* 목걸이가 상자 앞으로 늘어짐 */for(let i=0;i<20;i++){const x=58+i*1.2,y=80+Math.sin(i/19*Math.PI)*12;k.p(x,y,'#f8f8ff');k.p(x,y+1,'#b8b8d0')}gem(k,66,90,330);
  for(const [x,y,h,b] of [[22,86,200,1],[34,94,120,0],[104,90,280,1],[116,98,50,0],[96,98,200,0]])lyingGem(k,x,y,h,b);
  /* 반지 */for(const [x,y,h] of [[120,84,200],[14,96,330]]){k.shade(x+3,y+4,4,1,.45);k.el(x+3,y+1,3,2,'#c8a050');k.el(x+3,y+1,2,1,'hsl(20,40%,26%)');gemSm(k,x+1,y-4,h)}vign(k)};
 S.d2=k=>{/* 얼음 보석 상자: 얼음 동굴 · 오로라 · 고드름 · 눈에 반쯤 묻힌 보석 */k.vband(0,0,W,58,['#06142a','#0a2a44','#124a66']);for(let x=0;x<W;x+=2){const y=10+Math.sin(x/14)*5;k.a(x,y,'#5aff9a',.35);k.a(x,y+1,'#5aff9a',.25);k.a(x+1,y+6,'#5ad8ff',.25)}
  for(const [x,h] of [[6,14],[16,8],[30,18],[44,10],[60,6],[84,12],[100,16],[116,9],[130,15],[140,7]]){k.poly([[x-4,0],[x+4,0],[x,h]],'#a8e8ff');k.poly([[x-4,0],[x,0],[x,h]],'#e8fbff');k.p(x,h,'#ffffff')}
  for(const [x,y,s] of [[10,58,10],[132,56,12],[24,60,6]]){k.poly([[x-s/2,y],[x-1,y-s*1.8],[x+s/2,y]],'#5ac8f0');k.poly([[x-s/2,y],[x-1,y-s*1.8],[x,y]],'#bff0ff')}
  floorP(k,58,'snow',{sheen:[72,80,40]});
  chest(k,42,64,50,22,10,ST.ice,()=>gemPile(k,72,62,44,12,81,[195,200,185,210]));
  /* 얼음 상자 안 비치는 보석 */for(const [x,y,h] of [[52,72,200],[66,76,330],[80,70,190]]){k.a(x,y,'hsl('+h+',100%,40%)',.5);k.a(x+1,y,'hsl('+h+',100%,40%)',.5);k.a(x,y+1,'hsl('+h+',100%,30%)',.5)}
  /* 눈에 반쯤 묻힌 보석 */for(const [x,y,h] of [[22,92,200],[110,94,190],[96,100,330],[34,100,210]]){gem(k,x,y-5,h);k.r(x-1,y,11,3,'#e8f6ff');k.r(x,y,9,1,'#ffffff')}vign(k)};
 S.d3=k=>{/* 보석 진열장: 박물관 · 스포트라이트 · 벨벳 줄 */k.vband(0,0,W,60,['#0a0a12','#12121e','#1a1a28']);for(let x=6;x<W;x+=34){k.r(x,6,22,30,'#2a2a38');k.r(x+1,7,20,28,'#1a1a28');k.r(x+2,8,18,26,'#14141e')}
  k.x.globalAlpha=.12;k.poly([[64,0],[80,0],[100,80],[44,80]],'#fff4d0');k.x.globalAlpha=1;floorP(k,60,'marble',{sheen:[72,86,30]});
  /* 받침대 */k.shade(72,96,22,3,.6);k.r(56,74,32,22,'#2a2430');k.r(56,74,32,1,'#5a5060');k.r(54,72,36,3,'#c8a050');k.r(54,72,36,1,'#fff0a0');k.r(54,94,36,3,'#a07a30');for(let y=78;y<92;y+=4)k.r(58,y,28,1,'#3a3440');
  k.el(72,70,10,3,'#6a1030');k.el(72,69,9,2,'#8a1a40');bigGem(k,72,56,11,200);
  /* 유리 */k.x.globalAlpha=.14;k.r(52,32,40,40,'#c8e8ff');k.x.globalAlpha=1;k.r(52,32,40,1,'#e8f8ff');k.r(52,32,1,40,'#e8f8ff');k.r(91,32,1,40,'#a8c8e8');k.ln(56,66,70,36,'#ffffff');k.ln(58,68,74,36,'#e8f8ff');k.ln(80,60,88,42,'#e8f8ff');
  /* 벨벳 줄 기둥 */for(const x of [22,122]){k.shade(x+1,98,4,1,.5);k.r(x,80,3,18,'#c8a050');k.r(x,80,1,18,'#fff0a0');k.el(x+1,79,2,2,'#ffe080');k.r(x-2,97,7,2,'#a07a30')}
  for(let i=0;i<=30;i++){const t=i/30;k.p(24+t*30,84+Math.sin(t*Math.PI)*6,'#a8142a');k.p(24+t*30,85+Math.sin(t*Math.PI)*6,'#6a0a1a');k.p(92+t*30,84+Math.sin(t*Math.PI)*6,'#a8142a');k.p(92+t*30,85+Math.sin(t*Math.PI)*6,'#6a0a1a')}
  k.r(100,40,30,12,'#6a5030');k.r(101,41,28,10,'#c8a050');k.r(103,44,24,1,'#6a5030');k.r(103,47,18,1,'#6a5030');vign(k)};
 S.d4=k=>{/* 수정 금고: 수정 동굴 · 빛나는 금고 칸 · 수정 기둥 */k.vband(0,0,W,60,['#06041a','#0e0a30','#160e44']);
  const cr=(x,y,s,h)=>{k.poly([[x-s,y],[x-s*.6,y-s*2.4],[x,y-s*3],[x+s*.6,y-s*2.4],[x+s,y]],'hsl('+h+',70%,30%)');k.poly([[x-s*.6,y],[x-s*.4,y-s*2.3],[x,y-s*2.9],[x,y]],'hsl('+h+',90%,62%)');k.poly([[x,y],[x,y-s*2.9],[x+s*.4,y-s*2.3],[x+s*.6,y]],'hsl('+h+',85%,45%)');k.p(x-s*.3,y-s*2,'#ffffff')};
  cr(10,62,5,280);cr(22,60,3,190);cr(130,62,6,200);cr(118,60,3,300);cr(6,30,3,200);cr(138,26,3,280);
  for(let y=60;y<H;y++)for(let x=0;x<W;x++){const t=hsh(Math.floor(x/9),Math.floor(y/5));k.p(x,y,'hsl(255,'+(20+t*15)+'%,'+(10+t*8+(y-60)*.1)+'%)')}for(let i=0;i<4;i++){k.x.globalAlpha=.4*(1-i/4);k.r(0,60+i,W,1,'#000')}k.x.globalAlpha=1;
  safe(k,34,20,70,62,10,()=>{const x=38,y=24;k.vband(x,y,62,54,['#0a2a5a','#123a7a','#0a2050']);k.r(x,y+26,62,2,'#5a6a8a');k.r(x,y+26,62,1,'#9aa8c8');gemPile(k,x+31,y+25,54,12,91,[200,280,190]);gemPile(k,x+31,y+53,56,14,93,[200,300,180,330]);k.shade(x+31,y+14,28,10,.15,'#8ad8ff')});
  for(let i=0;i<6;i++){const x=40+i*12;k.r(x,16,1,4,'#c8ccd8')}k.el(69,13,4,2,'#5ad8ff');k.p(69,12,'#ffffff');
  cr(30,98,4,200);cr(112,100,5,280);for(const [x,y,h] of [[50,94,200,1],[62,100,330,0],[88,96,190,1],[100,102,280,0]])lyingGem(k,x,y,h,1);vign(k)};
 S.d5=k=>{/* 전설의 다이아: 하늘 신전 · 성운 · 황금 제단 · 기둥 · 깃발 (다이아는 떠서 움직임) */sd=121;k.vband(0,0,W,64,['#04021a','#0c0632','#1a0a4a']);
  for(const [x,y,r,h] of [[20,16,18,320],[120,12,20,200],[72,40,26,280]])k.shade(x,y,r,Math.round(r*.6),.22,'hsl('+h+',90%,60%)');for(let i=0;i<70;i++){const x=ri(0,W-1),y=ri(0,62);k.p(x,y,rnd()<.25?'#ffe9a8':'#c8d0ff')}
  for(const [x,y] of [[30,10],[110,30],[90,6]]){k.p(x,y,'#ffffff');k.p(x-1,y,'#a8b0ff');k.p(x+1,y,'#a8b0ff');k.p(x,y-1,'#a8b0ff');k.p(x,y+1,'#a8b0ff')}
  floorP(k,64,'marble',{sheen:[72,82,40]});
  for(const x of [10,124]){k.shade(x+5,98,9,2,.6);k.r(x,26,10,72,'#c8a050');k.r(x+1,26,2,72,'#fff0a0');k.r(x+7,26,2,72,'#a07a30');for(let y=30;y<96;y+=8)k.r(x+3,y,4,1,'#a07a30');k.r(x-2,22,14,4,'#e0b860');k.r(x-2,96,14,3,'#a07a30');
   k.r(x+2,30,6,22,'#5a1a8a');k.poly([[x+2,52],[x+5,48],[x+8,52]],'#1a0a4a');k.r(x+2,30,6,1,'#c8a050');k.el(x+5,38,1,1,'#ffd166')}
  /* 제단(계단) */for(let i=0;i<4;i++){const w=56-i*10,y=96-i*5;k.r(72-w/2,y,w,5,i%2?'#e0b860':'#c8a050');k.r(72-w/2,y,w,1,'#fff0a0');k.r(72-w/2,y+4,w,1,'#8a6020')}k.shade(72,100,32,3,.5);
  k.el(72,76,10,2,'#5a1a8a');k.el(72,75,9,1,'#8a3ac8');k.shade(72,72,26,16,.25,'#ffb0ff')};
 const AN={};
 const flame=(k,x,y,t,s)=>{const f=Math.floor(t*9+x)%3;s=s||1;k.r(x,y-1,1,1,'#ffe070');k.r(x-1+(f===1?1:0),y-2,2,1,'#ffb040');k.p(x+(f===2?1:0),y-3,'#ff7a20');if(s>1){k.r(x-1,y-1,3,1,'#ffd050');k.p(x+(f===0?-1:1),y-4,'#ff5a10');k.p(x,y-5+(f%2),'#ff9a30')}k.a(x,y-2,'#ffffff',.6)};
 AN.g0=(k,t)=>{flame(k,13,48,t)};AN.g1=(k,t)=>{flame(k,16,25,t,2);flame(k,128,25,t,2)};AN.g2=(k,t)=>{flame(k,12,23,t,2);flame(k,132,23,t,2)};
 AN.d0=(k,t)=>{flame(k,11,40,t);flame(k,131,42,t)};
 AN.d2=(k,t)=>{for(let i=0;i<24;i++){const x=(hsh(i,1)*W+t*(3+hsh(i,2)*4))%W,y=(hsh(i,3)*H+t*(8+hsh(i,4)*8))%H;k.a(x,y,'#ffffff',.85)}};
 AN.d3=(k,t)=>{const a=.35+.25*Math.sin(t*6);for(const y of [40,50,60]){for(let x=0;x<50;x+=1)k.a(x,y+Math.round(x*.08),'#ff2a3a',a);for(let x=94;x<W;x+=1)k.a(x,y+Math.round((W-x)*.08),'#ff2a3a',a)}};
 AN.d5=(k,t)=>{const b=Math.round(Math.sin(t*2)*2);bigGem(k,72,46+b,17,280);for(let i=0;i<14;i++){const an=i/14*TAU+t*.8;const x=72+Math.cos(an)*28,y=50+Math.sin(an)*9;if(Math.sin(an)<0)continue;k.p(x,y,'hsl('+(i*25)+',100%,75%)')}
  for(let i=0;i<14;i++){const an=i/14*TAU+t*.8;const x=72+Math.cos(an)*28,y=50+Math.sin(an)*9;if(Math.sin(an)>=0)continue;k.a(x,y,'#ffffff',.5)}k.shade(72,76,10,1,.3+.1*Math.sin(t*2))};
 const IMG={};function art(key){if(IMG[key])return IMG[key];const cv=document.createElement('canvas');cv.width=W;cv.height=H;const k=K(cv.getContext('2d'));try{S[key](k)}catch(e){console.warn('csart',key,e)}return IMG[key]=cv}
 /* 반짝임 자리: 밝은 칸 중에서 */const SP={};function sparks(key){if(SP[key])return SP[key];const d=art(key).getContext('2d').getImageData(0,0,W,H).data,L=[];for(let y=2;y<H-2;y++)for(let x=2;x<W-2;x++){const i=(y*W+x)*4;if(d[i]+d[i+1]+d[i+2]>700)L.push([x,y])}
  sd=7;const o=[];for(let i=0;i<Math.min(16,L.length);i++)o.push(L[Math.floor(rnd()*L.length)]);return SP[key]=o}
 const WK=document.createElement('canvas');WK.width=W;WK.height=H;const wk=K(WK.getContext('2d'));
 /* 한 장면 그리기: 바탕 + 움직임 + 반짝임 → 큰 캔버스에 */
 function paint(cv,key,t){const c=WK.getContext('2d');c.clearRect(0,0,W,H);c.drawImage(art(key),0,0);try{AN[key]&&AN[key](wk,t)}catch(e){}
  sparks(key).forEach(([x,y],j)=>{const ph=(t*.7+j*.29)%1;if(ph>.3)return;wk.p(x,y,'#ffffff');if(ph>.08&&ph<.22){wk.a(x-1,y,'#ffffff',.8);wk.a(x+1,y,'#ffffff',.8);wk.a(x,y-1,'#ffffff',.8);wk.a(x,y+1,'#ffffff',.8)}});
  if(key==='d5')vign(wk);const o=cv.getContext('2d');o.imageSmoothingEnabled=false;o.drawImage(WK,0,0,cv.width,cv.height)}
 window.CSART={W,H,art,paint,K,COINF,GEMSM,cp,gp};
}catch(e){console.error('v159 shop art',e)}})();
