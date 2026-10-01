/* ================= 보스 컨셉 체력바 v3 =================
   왼쪽: 보스 모양 그대로의 체력 게이지(실루엣이 위에서부터 비어 감)
   가운데: 보스 컨셉별로 모양이 다른 체력바 (기차 · 톱니 · 배터리 · 벌집 · 척추뼈 · 아가리 …) */
const BBX=56,BBY=9,BBW=270,BBH=12;
let _bbCv=null,_bbC=null,_bbCv2=null,_bbC2=null;const _bbFit={};
function bbCanvas(){if(_bbCv)return true;if(typeof document==='undefined'||!document.createElement)return false;
 _bbCv=document.createElement('canvas');_bbCv.width=112;_bbCv.height=96;_bbC=_bbCv.getContext('2d');
 _bbCv2=document.createElement('canvas');_bbCv2.width=112;_bbCv2.height=96;_bbC2=_bbCv2.getContext('2d');
 if(!_bbC||!_bbC.getImageData||!_bbC2){_bbCv=null;return false}_bbC.imageSmoothingEnabled=false;_bbC2.imageSmoothingEnabled=false;return true}
function bbBo(){const b=G.boss||{};return {pulse:0,expose:!!G.exposed,open:b.open||0,eye:b.eye||0,dorm:false,flash:false,warn:0}}
function bbFit(bi,B){if(_bbFit[bi])return _bbFit[bi];let best=null;
 for(const u of [1.5,1.25,1]){_bbC.setTransform(1,0,0,1,0,0);_bbC.globalCompositeOperation='source-over';_bbC.globalAlpha=1;_bbC.clearRect(0,0,112,96);
  try{drawMech(_bbC,B,56,84,0,bbBo(),u)}catch(e){}
  const d=_bbC.getImageData(0,0,112,96).data;let x0=999,y0=999,x1=-1,y1=-1;
  for(let y=0;y<96;y++)for(let x=0;x<112;x++)if(d[(y*112+x)*4+3]>40){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}
  if(x1<0)continue;best={u,x0,y0,w:x1-x0+1,h:y1-y0+1};if(best.h<=31&&best.w<=46)break}
 _bbFit[bi]=best||{u:1,x0:40,y0:60,w:30,h:24};return _bbFit[bi]}
/* ---------- 왼쪽: 보스 모양 게이지 ---------- */
function bbPortrait(now,S){const bx=3,by=1,bw=48,bh=32,cx=bx+bw/2,cy=by+bh/2,{edge,fr,acc,org}=S;
 // 받침판 (보스 계열마다 모양)
 RA(bx-1,by+1,bw+3,bh+2,'#000000',.4);
 R(bx,by,bw,bh,'#07090c');R(bx+1,by+1,bw-2,bh-2,fr);R(bx+2,by+2,bw-4,bh-4,'#0a0d12');
 for(let i=0;i<bh-4;i+=3)RA(bx+2,by+2+i,bw-4,1,'#ffffff',.025);
 R(bx+1,by+1,bw-2,1,edge);if(org){for(let i=0;i<5;i++){R(bx+3+i*10,by+bh-1,3,2,fr);R(bx+4+i*10,by+bh,1,2,fr)}}else{for(const [ax,ay] of [[bx+2,by+2],[bx+bw-4,by+2],[bx+2,by+bh-4],[bx+bw-4,by+bh-4]])R(ax,ay,2,2,'#c9d2d8')}
 if(S.low)RA(bx+2,by+2,bw-4,bh-4,'#ff2d55',.12*S.pul);
 if(!bbCanvas()){return}
 const B=S.B,f=bbFit(S.bi,B),c=_bbC,c2=_bbC2;
 c.setTransform(1,0,0,1,0,0);c.globalCompositeOperation='source-over';c.globalAlpha=1;c.clearRect(0,0,112,96);
 try{if(G.omega&&G.revForm==='mutant'&&typeof drawMutant==='function')drawMutant(c,56,84,now,bbBo(),f.u*.85);else if(G.omega&&S.bi===OMEGA_BI)drawOmegaTrue(c,56,84,now,bbBo(),f.u*.8);else drawMech(c,B,56,84,now,bbBo(),f.u)}catch(e){}
 // 잃은 체력만큼 위에서부터 비어 감
 const cut=Math.round(f.y0+f.h*(1-S.r)),wob=Math.sin(now/180)*.8;
 c.globalCompositeOperation='source-atop';
 c.globalAlpha=.84;c.fillStyle='#10131a';c.fillRect(0,0,112,cut);
 c.globalAlpha=.25;c.fillStyle='#6a7080';c.fillRect(0,0,112,cut);
 if(S.r>0&&S.r<1){c.globalAlpha=.95;c.fillStyle=mixc(S.main,'#ffffff',.55);for(let x=0;x<112;x+=2)c.fillRect(x,cut+Math.round(Math.sin(x*.5+now/140)*wob),2,1);
  c.globalAlpha=.5;c.fillStyle=S.main;c.fillRect(0,cut+1,112,2)}
 if(S.hitK>0){c.globalAlpha=S.hitK*.7;c.fillStyle='#ffffff';c.fillRect(0,0,112,96)}
 c.globalCompositeOperation='source-over';c.globalAlpha=1;
 // 외곽선용 실루엣
 c2.setTransform(1,0,0,1,0,0);c2.globalCompositeOperation='source-over';c2.globalAlpha=1;c2.clearRect(0,0,112,96);c2.drawImage(_bbCv,0,0);
 c2.globalCompositeOperation='source-in';c2.fillStyle=S.low?mixc('#000000','#ff2d55',S.pul*.8):'#000000';c2.fillRect(0,0,112,96);c2.globalCompositeOperation='source-over';
 const sh=S.hitK>0?Math.round((RND()-.5)*3*S.hitK):0,dx=Math.round(cx-(f.x0+f.w/2))+sh,dy=Math.round(cy-(f.y0+f.h/2))+1;
 BXC().save();BXC().beginPath();BXC().rect(bx+2,by+2,bw-4,bh-4);BXC().clip();
 for(const [ox,oy] of [[-1,0],[1,0],[0,-1],[0,1]])BXC().drawImage(_bbCv2,dx+ox,dy+oy);
 BXC().drawImage(_bbCv,dx,dy);BXC().restore();
 // 페이즈 표시 (작은 불)
 for(let i=0;i<3;i++){const lit=S.ph>=i,px=bx+bw-7-i*6,py=by+bh-5;R(px,py,4,3,'#07090c');R(px+1,py+1,2,1,lit?(i===2?'#ff2d55':i===1?'#ffb020':acc):'#2a2e36')}}
/* ---------- 도우미 ---------- */
function bbTriV(x,y,w,h,col,dir){for(let k=0;k<h;k++){const ww=Math.max(1,Math.round(w*(1-k/h)));R(x+(w-ww)/2,dir>0?y+k:y-k-1,ww,1,col)}}
function bbTriH(x,y,w,h,col,dir){for(let k=0;k<w;k++){const hh=Math.max(1,Math.round(h*(1-k/w)));R(dir>0?x+k:x-k-1,y+(h-hh)/2,1,hh,col)}}
function bbGear(cx,cy,r,n,ang,col,dk,hi){for(let i=0;i<n;i++){const q=ang+i*TAU/n;R(cx+Math.cos(q)*(r+.8)-1.5,cy+Math.sin(q)*(r+.8)-1.5,3,3,col)}pcirc(cx,cy,r+.5,col);pcirc(cx,cy,r-1.2,dk);pcirc(cx,cy,Math.max(1.5,r*.45),col);for(let i=0;i<3;i++){const q=ang+i*TAU/3;line(cx,cy,cx+Math.cos(q)*(r-1.5),cy+Math.sin(q)*(r-1.5),1,(a,b)=>R(a,b,1,1,col))}R(cx-.5,cy-.5,1,1,hi)}
function bbLine(x0,y0,x1,y1,col,a){line(x0,y0,x1,y1,1,(p,q)=>RA(p,q,1,1,col,a==null?1:a))}
function bbRect(S,c){const {x,y,w,h}=S;R(x,y,w,h,c.l);R(x,y,w,h-3,c.b);R(x,y,w,3,c.m);R(x,y,w,1,c.h)}
/* ---------- 컨셉별 바 ---------- */
const BB_TH=[
/* 0 톱니 파수꾼: 양 끝 톱니바퀴 + 톱니 랙 */
{main:'#8eda9e',frame:'#2b3a33',
 back(S){const {x,y,w,h,t,r}=S,sp=(.6+r*1.6);for(let i=0;i<w;i+=6){R(x+i,y-3,3,3,'#46584d');R(x+i,y-3,3,1,'#7f9a88');R(x+i+1,y+h,3,2,'#34453c')}
  for(let i=40;i<w-20;i+=70)bbGear(x+i,y-3,4,6,(i%140?1:-1)*t*sp*2,'#7f9a88','#1a2620','#ffd166')},
 tex(S){const {x,y,h,now,fw}=S,off=Math.floor(now/60)%8;for(let i=-8;i<fw;i+=8){RA(x+i+off,y+3,2,h-6,'#1a2620',.35);RA(x+i+off+2,y+3,1,h-6,'#ffffff',.25)}},
 front(S){const {x,y,w,h,t,r}=S,sp=(.6+r*1.6);bbGear(x+w+10,y+h/2,11,12,t*sp,'#a9d6b4','#26382f','#ffd166');bbGear(x+w+4,y-4,5,7,-t*sp*2.2,'#7f9a88','#1a2620','#ffffff');
  const pc=S.fx;RA(pc-1,y-2,3,h+4,'#ffd166',.6)}},
/* 1 볼트 월: 배터리 셀 + 단자 + 스파크 */
{main:'#7fd6ff',frame:'#16324a',
 shape(S,c){const {x,y,w,h}=S,n=10,g=2,cw=(w-g*(n-1))/n;for(let i=0;i<n;i++){const cx=x+i*(cw+g);R(cx,y,cw,h,c.l);R(cx,y,cw,h-3,c.b);R(cx,y,cw,2,c.m);R(cx,y,cw,1,c.h)}},
 back(S){const {x,y,w,h}=S;R(x-3,y-3,w+6,h+6,'#0b1a26');R(x-2,y-2,w+4,h+4,'#2a5a7a');R(x-1,y-1,w+2,h+2,'#06101a')},
 front(S){const {x,y,w,h,now,t}=S;R(x+w+2,y+2,7,h-4,'#2a5a7a');R(x+w+3,y+3,5,h-6,'#b8c8d4');R(x+w+3,y+3,5,1,'#ffffff');
  R(x-9,y+h/2-1,5,2,'#7fd6ff');R(x+w+11,y+h/2-1,5,2,'#ffe36b');R(x+w+12.5,y+h/2-2.5,2,5,'#ffe36b');
  if(S.r>0&&Math.floor(now/70)%3!==0){const rr=rng(Math.floor(now/70));const ax=x+rr()*S.fw,ay=y-1;let px=ax,py=ay;for(let k=0;k<4;k++){const nx=px+(rr()-.5)*8,ny=py-2-rr()*2;bbLine(px,py,nx,ny,k%2?'#ffffff':'#bfefff');px=nx;py=ny}}}},
/* 2 용광로 골렘: 벽돌 수로 + 용암 + 불꽃 */
{main:'#ff8a3a',frame:'#3a1d10',
 back(S){const {x,y,w,h}=S;R(x-4,y-4,w+8,h+8,'#1a0c08');for(let row=0;row<2;row++)for(let i=-4+(row?5:0);i<w+4;i+=10){R(x+i,y-4+row*(h+5),9,3,'#6a3a24');R(x+i,y-4+row*(h+5),9,1,'#8a5236')}},
 tex(S){const {x,y,w,h,now,fw}=S;for(let i=0;i<fw;i+=2){const q=Math.round(Math.sin(i*.3+now/200)*1.2);R(x+i,y+q+1,2,1,'#ffe36b')}
  for(let k=0;k<5;k++){const bx=x+((k*53+Math.floor(now/40)*(k+1))%Math.max(8,fw)),ph=((now/600)+k*.37)%1;pcirc(bx,y+h-3-ph*6,1+ph*1.5,'#fff2b0',.8*(1-ph))}},
 front(S){const {x,y,w,h,now,fw}=S;for(let i=8;i<fw-4;i+=22){const fl=3+Math.abs(Math.sin(now/90+i))*5;bbTriV(x+i,y-1,5,fl,'#ff8a3a',-1);bbTriV(x+i+1,y-1,3,fl*.6,'#ffe36b',-1)}
  R(x+w+2,y-2,10,h+4,'#3a1d10');R(x+w+3,y-1,8,h+2,'#6a3a24');pcirc(x+w+7,y+h/2,3,'#ff8a3a');pcirc(x+w+7,y+h/2,1.5,'#ffe36b')}},
/* 3 철갑 열차: 객차 + 바퀴 + 레일 + 기관차 */
{main:'#ffb45a',frame:'#2a2a2e',rev:true,
 shape(S,c){const {x,y,w,h}=S,n=5,g=5,cw=(w-g*(n-1))/n;for(let i=0;i<n;i++){const cx=x+i*(cw+g);R(cx,y,cw,h-1,c.l);R(cx,y+1,cw,h-5,c.b);R(cx+1,y-1,cw-2,2,c.m);R(cx+1,y-1,cw-2,1,c.h);
  for(let k=5;k<cw-6;k+=9)R(cx+k,y+3,5,3,S.mode==='f'?'#fff0b8':S.mode==='t'?'#ffd0c0':'#20242a')}},
 back(S){const {x,y,w,h,now}=S;R(x-8,y+h+3,w+44,1,'#9aa2aa');R(x-8,y+h+4,w+44,1,'#4a5058');const off=Math.floor(now/30)%6;for(let i=-8;i<w+36;i+=6)R(x+i-off+6,y+h+5,3,1,'#5a3a22')},
 front(S){const {x,y,w,h,now,t}=S,n=5,g=5,cw=(w-g*(n-1))/n,a=now/90;
  for(let i=0;i<n;i++){const cx=x+i*(cw+g);for(const wx of [cx+6,cx+cw-6]){pcirc(wx,y+h+1,2.5,'#1a1c20');pcirc(wx,y+h+1,1.5,'#6a7078');R(wx+Math.cos(a)*1.5-.5,y+h+1+Math.sin(a)*1.5-.5,1,1,'#ffffff')}if(i<n-1){R(cx+cw,y+h-4,g,2,'#3a3a40');R(cx+cw+1,y+h-5,g-2,1,'#6a7078')}}
  const lx=x+w+2,bob=Math.floor(now/120)%2;R(lx,y-2+bob,24,h+1,'#2a2e36');R(lx,y-2+bob,24,1,'#6a7078');R(lx+1,y+h-4+bob,22,2,'#b83a2a');R(lx+2,y-1+bob,8,6,'#1a1c20');R(lx+3,y+bob,6,4,'#ffe9a8');
  R(lx+14,y-8+bob,4,6,'#1a1c20');R(lx+13,y-8+bob,6,1,'#6a7078');bbTriH(lx+24,y+2+bob,5,h-2,'#8a9098',1);pcirc(lx+22,y+3+bob,1.5,'#fff6c8');RA(lx+24,y+1+bob,14,5,'#fff6c8',.12+.08*Math.sin(now/80));
  for(let k=0;k<4;k++){const q=((now/700)+k/4)%1;pcirc(lx+16-q*18,y-10-q*8+bob,1.5+q*3.5,'#c8ccd0',.55*(1-q))}
  for(const wx of [lx+5,lx+12,lx+19]){pcirc(wx,y+h+1,2.5,'#1a1c20');pcirc(wx,y+h+1,1.5,'#b83a2a');R(wx+Math.cos(a)*1.5-.5,y+h+1+Math.sin(a)*1.5-.5,1,1,'#ffffff')}}},
/* 4 극저온 코어: 얼음 틀 + 고드름 + 결정 */
{main:'#a8f0ff',frame:'#1a3a4a',
 back(S){const {x,y,w,h}=S;R(x-3,y-3,w+6,h+6,'#0a1a24');R(x-2,y-2,w+4,h+4,'#6fb8d0');R(x-2,y-2,w+4,1,'#e8ffff');R(x-1,y-1,w+2,h+2,'#08141c')},
 tex(S){const {x,y,h,now,fw}=S;for(let i=-10;i<fw;i+=14){bbLine(x+i,y+h-1,x+i+8,y+1,'#ffffff',.35)}const k=Math.floor(now/110);for(let s=0;s<3;s++){const rr=rng(k*7+s);const sx=x+rr()*fw,sy=y+2+rr()*(h-5);R(sx,sy-1,1,3,'#ffffff');R(sx-1,sy,3,1,'#ffffff')}},
 front(S){const {x,y,w,h,now}=S,rr=rng(4401);for(let i=4;i<w;i+=9+Math.floor(rr()*6)){const L=2+Math.floor(rr()*5)+(Math.sin(now/400+i)>.95?1:0);bbTriV(x+i,y+h+2,4,L,'#bfefff',1);R(x+i+1,y+h+2,1,Math.max(1,L-2),'#ffffff')}
  for(let i=10;i<w;i+=38){const cx=x+i,cy=y-4;R(cx-3,cy,7,1,'#e8ffff');R(cx,cy-3,1,7,'#e8ffff');R(cx-2,cy-2,1,1,'#bfefff');R(cx+2,cy+2,1,1,'#bfefff');R(cx+2,cy-2,1,1,'#bfefff');R(cx-2,cy+2,1,1,'#bfefff')}
  const cx=x+w+9,cy=y+h/2;for(let k=0;k<6;k++){const q=k*TAU/6+now/1500;bbLine(cx,cy,cx+Math.cos(q)*8,cy+Math.sin(q)*8,'#bfefff')}pcirc(cx,cy,3,'#e8ffff');pcirc(cx,cy,1.5,'#4dc3ff')}},
/* 5 스톰 하이브: 벌집 육각 셀 */
{main:'#b89cff',frame:'#241a40',
 shape(S,c){const {x,y,w,h}=S,n=Math.floor(w/13);for(let i=0;i<n;i++){const cx=x+i*13+6.5+(w-n*13)/2,cy=y+h/2;for(let dy=-6;dy<=6;dy++){const a=Math.abs(dy),hw=a<=3?6:6-(a-3);R(cx-hw,cy+dy,hw*2,1,dy<-4?c.h:dy<-2?c.m:dy>3?c.l:c.b)}}},
 back(S){const {x,y,w,h}=S;RA(x-2,y-2,w+4,h+4,'#0c0818',.9)},
 front(S){const {x,y,w,h,now,t}=S;for(let k=0;k<4;k++){const q=(t*1.6+k*.25)%1,bx=x+w*((k*.29+t*.07)%1),by=y-4+Math.sin(t*9+k*3)*2;R(bx,by,2,2,'#ffe36b');R(bx-1,by-1,1,1,'#ffffff');R(bx+2,by-1,1,1,'#ffffff')}
  if(Math.floor(now/90)%4===0){const rr=rng(Math.floor(now/90));let px=x+rr()*w,py=y-6;for(let k=0;k<3;k++){const nx=px+(rr()-.5)*8,ny=py+4;bbLine(px,py,nx,ny,'#e8dcff');px=nx;py=ny}}
  const cx=x+w+9,cy=y+h/2;for(let dy=-8;dy<=8;dy++){const a=Math.abs(dy),hw=a<=4?7:7-(a-4);R(cx-hw,cy+dy,hw*2,1,dy<-5?'#e8dcff':'#6a4aa8')}pcirc(cx,cy,3,'#ffe36b')}},
/* 6 자석 크레인: 트러스 붐 + 말굽자석 + 흔들리는 갈고리 */
{main:'#ffcf5a',frame:'#3a2c10',
 back(S){const {x,y,w,h}=S;R(x-3,y-3,w+6,h+6,'#1a1408');R(x-2,y-2,w+4,1,'#c8a040');R(x-2,y+h+1,w+4,1,'#c8a040');R(x-8,y-3,6,h+6,'#4a4a50');R(x-8,y-3,6,1,'#8a8a90')},
 tex(S){const {x,y,h,fw}=S;for(let i=0;i<fw;i+=10){bbLine(x+i,y+1,x+i+5,y+h-2,'#000000',.3);bbLine(x+i+5,y+h-2,x+i+10,y+1,'#000000',.3)}},
 front(S){const {x,y,w,h,now,t}=S,mx=x+w+10,my=y-1;for(let k=0;k<3;k++){R(mx-9+k,my+k,3,h-k,'#d23a3a');R(mx+6-k,my+k,3,h-k,'#d23a3a')}R(mx-9,my,18,4,'#d23a3a');R(mx-9,my,18,1,'#ff7a7a');R(mx-9,my+h-2,4,3,'#dfe6ea');R(mx+5,my+h-2,4,3,'#dfe6ea');
  for(let k=0;k<3;k++){const q=((now/500)+k/3)%1;RA(mx-3-q*6,my+h+2+q*3,7+q*12,1,'#7fd6ff',.7*(1-q))}
  const hx=x+w*.45,sw=Math.sin(t*2.2)*4;bbLine(hx,y+h,hx+sw,y+h+6,'#8a8a90');R(hx+sw-1,y+h+6,3,2,'#dfe6ea');R(hx+sw+1,y+h+8,1,2,'#dfe6ea');R(hx+sw-1,y+h+9,2,1,'#dfe6ea')}},
/* 7 시계탑: 눈금자 + 시계판 + 진자 */
{main:'#ffd98a',frame:'#3a2a18',
 back(S){const {x,y,w,h}=S;R(x-3,y-3,w+6,h+6,'#1a120a');R(x-2,y-2,w+4,h+4,'#8a6a3a');R(x-2,y-2,w+4,1,'#e8c880');R(x-1,y-1,w+2,h+2,'#0e0a06');for(let i=0;i<=w;i+=9)R(x+i,y-5,1,i%45===0?3:2,'#e8c880')},
 tex(S){const {x,y,h,fw}=S;for(let i=0;i<fw;i+=18)RA(x+i,y+1,9,h-4,'#ffffff',.12)},
 front(S){const {x,y,w,h,now,t}=S,cx=x+w+12,cy=y+h/2;const pa=Math.sin(t*3)*.45;bbLine(cx,cy,cx+Math.sin(pa)*10,cy+10,'#c8a060');pcirc(cx+Math.sin(pa)*10,cy+11,2.5,'#e8c880');
  pcirc(cx,cy,11,'#3a2a18');pcirc(cx,cy,10,'#e8c880');pcirc(cx,cy,9,'#fff6e0');for(let i=0;i<12;i++){const q=i*TAU/12;R(cx+Math.cos(q)*7.5-.5,cy+Math.sin(q)*7.5-.5,1,1,i%3?'#8a6a3a':'#3a2a18')}
  const mh=now/400,hh=now/4800;bbLine(cx,cy,cx+Math.cos(mh)*6.5,cy+Math.sin(mh)*6.5,'#1a120a');bbLine(cx,cy,cx+Math.cos(hh)*4,cy+Math.sin(hh)*4,'#b83a2a');R(cx-1,cy-1,2,2,'#1a120a')}},
/* 8 광학 요새: 렌즈형 바 + 플레이어를 보는 눈 */
{main:'#ff6ab8',frame:'#2a1030',
 shape(S,c){const {x,y,w,h}=S;for(let i=0;i<w;i++){const e=Math.min(i,w-1-i),k=Math.min(1,e/14),hh=Math.max(2,Math.round(h*Math.sqrt(k))),yy=y+(h-hh)/2;R(x+i,yy,1,hh,c.b);R(x+i,yy,1,1,c.h);R(x+i,yy+hh-2,1,2,c.l)}},
 tex(S){const {x,y,h,now,fw}=S,cols=['#ff4d6d','#ffb020','#ffe36b','#7dff9a','#4dc3ff','#b89cff'];for(let i=0;i<fw;i+=3){const k=Math.floor((i+now/25)/12)%6;RA(x+i,y+3,3,h-6,cols[k],.35)}},
 front(S){const {x,y,w,h,now}=S,cx=x+w+11,cy=y+h/2,blink=(now%3800)<140;pcirc(cx,cy,10,'#2a1030');
  if(blink){R(cx-8,cy,16,2,'#ff6ab8')}else{pcirc(cx,cy,9,'#f4eef8');const ang=Math.atan2(P.y-cy,P.x-cx),ix=cx+Math.cos(ang)*3.5,iy=cy+Math.sin(ang)*3;pcirc(ix,iy,4.5,'#ff3a8a');pcirc(ix,iy,2.5,'#1a0610');R(ix-2,iy-3,1,1,'#ffffff')}
  for(let k=0;k<2;k++){const q=((now/900)+k*.5)%1;RA(x+q*w,y-1,2,h+2,'#ffffff',.25*(1-Math.abs(q-.5)*2))}}},
/* 9 오메가 엔진: 위험 줄무늬 + 펌프질하는 피스톤 + 코어 */
{main:'#ff5a3a',frame:'#2a0e0a',
 back(S){const {x,y,w,h,now}=S,o=Math.floor(now/80)%8;for(let i=-8;i<w+8;i++){const k=((i+o)%8+8)%8<4;R(x+i,y-3,1,2,k?'#ffd166':'#141414');R(x+i,y+h+1,1,2,k?'#ffd166':'#141414')}},
 tex(S){const {x,y,h,now,fw}=S;for(let k=0;k<3;k++){const q=((now/700)+k/3)%1;RA(x+q*fw-6,y,12,h,'#ffffff',.22)}},
 front(S){const {x,y,w,h,now}=S;for(let i=0;i<6;i++){const px=x+20+i*44,ph=(now/180+i*1.3)%TAU,up=Math.round((Math.sin(ph)+1)*1.5);R(px-3,y-5,7,3,'#3a3a40');R(px-3,y-5,7,1,'#8a8a90');R(px-1,y-6-up,3,up+1,'#dfe6ea');R(px-3,y-8-up,7,2,'#b83a2a');if(up<1)RA(px-4,y-9,9,1,'#ffd166',.8)}
  const cx=x+w+11,cy=y+h/2,p=.5+.5*Math.sin(now/110);pcirc(cx,cy,11,'#1a0606');pcirc(cx,cy,9,'#6a1a10');pcirc(cx,cy,6+p,'#ff5a3a');pcirc(cx,cy,3,'#ffe36b');glow(cx,cy,14,'#ff5a3a',.25*p)}},
/* 10 뿌리아귀: 나무 껍질 + 감기는 덩굴 + 가시 */
{main:'#9bff5a',frame:'#2b1d10',
 back(S){const {x,y,w,h}=S,rr=rng(1010);R(x-3,y-3,w+6,h+6,'#1a1008');R(x-2,y-2,w+4,h+4,'#6a4a2a');for(let i=0;i<w;i+=5)R(x+i,y-2+Math.floor(rr()*2),3,1,'#8a6a42');
  for(let i=6;i<w;i+=12+Math.floor(rr()*8)){bbTriV(x+i,y-2,3,2+Math.floor(rr()*3),'#4a3018',-1)}for(let i=10;i<w;i+=26+Math.floor(rr()*10)){const L=3+Math.floor(rr()*5);R(x+i,y+h+2,1,L,'#6a4a2a');R(x+i+1,y+h+2+L-1,1,2,'#6a4a2a')}},
 tex(S){const {x,y,h,now,fw}=S;for(let k=0;k<4;k++){const q=((now/900)+k/4)%1;RA(x+q*fw,y+2,3,h-5,'#e8ffc8',.35)}},
 front(S){const {x,y,w,h,t}=S;let prev=null;for(let i=-4;i<w+4;i+=2){const vy=y+h/2+Math.sin(i*.09+t*.8)*(h/2+2);if(prev)bbLine(prev[0],prev[1],x+i,vy,'#3a6a1a');prev=[x+i,vy];if(i%22===0){R(x+i,vy-2,3,2,'#6ad63a');R(x+i+1,vy-3,1,1,'#c8ff8a')}}
  const cx=x+w+9,cy=y+h/2;pcirc(cx,cy,9,'#2b1d10');pcirc(cx,cy,7,'#6a4a2a');for(let k=0;k<5;k++){bbTriV(cx-6+k*3,cy-3,2,4,'#e8dcc8',1)}}},
/* 11 포자여왕: 버섯갓 + 떠오르는 포자 */
{main:'#caff6b',frame:'#3a2350',
 back(S){const {x,y,w,h}=S;R(x-3,y-3,w+6,h+6,'#1a0e24');R(x-2,y-2,w+4,h+4,'#5a3a78');R(x-1,y-1,w+2,h+2,'#120a1a')},
 tex(S){const {x,y,h,now,fw}=S;for(let i=3;i<fw;i+=8){const a=.3+.3*Math.sin(now/300+i);RA(x+i,y+3+(i%3),2,2,'#f6ffd8',a)}},
 front(S){const {x,y,w,h,now,t}=S,rr=rng(1111);for(let i=12;i<w;i+=34+Math.floor(rr()*14)){const s=4+Math.floor(rr()*3),cx=x+i,cy=y-2;R(cx-1,cy-2,2,4,'#e8dcc8');for(let dy=0;dy<s;dy++){const hw=Math.round(s*Math.sqrt(1-(dy/s)**2)*1.3);R(cx-hw,cy-2-dy,hw*2,1,dy>s-2?'#d88aff':'#9a4ad6')}R(cx-2,cy-4-Math.floor(s/2),1,1,'#f6ffd8');R(cx+2,cy-3-Math.floor(s/2),1,1,'#f6ffd8')}
  for(let k=0;k<8;k++){const q=((t*.3)+k/8)%1,sx=x+((k*97)%w)+Math.sin(t*2+k)*3;RA(sx,y-2-q*14,1,1,k%2?'#caff6b':'#f6ffd8',1-q)}
  const cx=x+w+9,cy=y+h/2+2;R(cx-1,cy-2,3,7,'#e8dcc8');for(let dy=0;dy<7;dy++){const hw=Math.round(7*Math.sqrt(1-(dy/7)**2)*1.2);R(cx-hw,cy-2-dy,hw*2+1,1,dy>5?'#d88aff':'#9a4ad6')}}},
/* 12 늪지 아귀: 물결 + 연잎 + 부들 + 튀어나온 눈 */
{main:'#5bd6a0',frame:'#1a3024',
 back(S){const {x,y,w,h}=S;R(x-3,y-3,w+6,h+6,'#0a1a12');R(x-2,y-2,w+4,h+4,'#3a5a3a');R(x-1,y-1,w+2,h+2,'#08140e');for(const ex of [x-5,x+w+2])for(let k=0;k<3;k++){R(ex+k*2,y-8+k,1,h+8-k,'#4a7a3a');R(ex+k*2,y-9+k,1,3,'#6a3a1a')}},
 tex(S){const {x,y,h,now,fw}=S;for(let i=0;i<fw;i++){const q=Math.round(Math.sin(i*.35+now/220)*1.4+Math.sin(i*.13-now/400));RA(x+i,y+2+q,1,1,'#e0fff0',.7)}for(let k=0;k<4;k++){const q=((now/800)+k/4)%1,bx=x+((k*71)%Math.max(8,fw));pcirc(bx,y+h-2-q*8,1+q,'#e0fff0',.6*(1-q))}},
 front(S){const {x,y,w,h,now}=S,rr=rng(1212);for(let i=20;i<w;i+=40+Math.floor(rr()*20)){const cx=x+i+Math.sin(now/900+i)*2;for(let dy=0;dy<3;dy++)R(cx-5+dy,y-1-dy+1,10-dy*2,1,dy===2?'#8ae07a':'#3a8a3a');R(cx,y-1,2,1,'#0a1a12')}
  const ex=x+w-10,blink=(now%4200)<150;for(const o of [0,9]){pcirc(ex+o,y-3,4,'#3a8a5a');if(!blink){pcirc(ex+o,y-3,2.5,'#ffe36b');R(ex+o-.5,y-4,1,3,'#0a1a12')}else R(ex+o-3,y-3,6,1,'#1a3024')}}},
/* 13 백골 사냥개: 척추뼈 마디 + 해골 + 꼬리뼈 */
{main:'#f0e6d0',frame:'#2a1e1a',
 shape(S,c){const {x,y,w,h}=S,n=11,g=3,cw=(w-g*(n-1))/n;for(let i=0;i<n;i++){const cx=x+i*(cw+g);R(cx+1,y,cw-2,h,c.l);R(cx,y+1,cw,h-3,c.b);R(cx+1,y,cw-2,2,c.m);R(cx+2,y,cw-4,1,c.h);R(cx+cw/2-2,y-3,4,3,c.m);R(cx+cw/2-1,y+h,3,2,c.l)}},
 back(S){const {x,y,w,h}=S,n=11,g=3,cw=(w-g*(n-1))/n;RA(x-2,y-4,w+4,h+7,'#0a0606',.8);for(let i=0;i<n-1;i++)R(x+i*(cw+g)+cw,y+h/2-2,g,4,'#6a5a48')},
 tex(S){const {x,y,h,fw}=S;for(let i=4;i<fw;i+=23)R(x+i,y+4,2,h-8,'#c8b898')},
 front(S){const {x,y,w,h,now}=S;for(let k=0;k<4;k++){const tx=x-3-k*3;R(tx,y+h/2-2+k,3,4-k,'#d8ccb4')}
  const cx=x+w+11,cy=y+h/2,jaw=Math.floor(now/260)%2;pcirc(cx,cy-1,8,'#2a1e1a');pcirc(cx,cy-1,7,'#f0e6d0');R(cx-2,cy+4,11,4+jaw,'#f0e6d0');for(let k=0;k<4;k++)R(cx+k*2.4-1,cy+6+jaw,1,2,'#2a1e1a');
  pcirc(cx-2,cy-2,2,'#1a0606');pcirc(cx+3,cy-2,2,'#1a0606');R(cx-2,cy-2,1,1,S.low?'#ff2d55':'#ff6a3a');R(cx+3,cy-2,1,1,S.low?'#ff2d55':'#ff6a3a');R(cx+6,cy+1,3,1,'#1a0606')}},
/* 14 실크 여제: 거미줄에 매달린 바 + 거미 */
{main:'#d88aff',frame:'#2a1438',
 back(S){const {x,y,w,h}=S;for(const px of [x+20,x+w*.35,x+w*.65,x+w-20])bbLine(px,0,px,y,'#e8dcff',.6);R(x-3,y-3,w+6,h+6,'#140a1c');R(x-2,y-2,w+4,h+4,'#4a2a5a');R(x-1,y-1,w+2,h+2,'#0e0614');
  const cx=x+w+14,cy=y-2;for(let k=0;k<7;k++){const q=Math.PI*.5+k*Math.PI/6;bbLine(cx,cy,cx+Math.cos(q)*18,cy+Math.sin(q)*18,'#e8dcff',.5)}for(const rr of [6,11,16]){let pv=null;for(let k=0;k<=6;k++){const q=Math.PI*.5+k*Math.PI/6,px=cx+Math.cos(q)*rr,py=cy+Math.sin(q)*rr;if(pv)bbLine(pv[0],pv[1],px,py,'#e8dcff',.4);pv=[px,py]}}},
 tex(S){const {x,y,h,now,fw}=S;for(let i=0;i<fw;i+=7)bbLine(x+i,y+1,x+i+4,y+h-2,'#ffffff',.18);const q=(now/1400)%1;RA(x+q*fw,y,4,h,'#ffffff',.3)},
 front(S){const {x,y,w,h,now}=S,sx=S.fx,sy=y+h+4+Math.sin(now/300)*1.5;bbLine(sx,y+h,sx,sy-2,'#e8dcff',.8);pcirc(sx,sy,2.5,'#1a0a24');pcirc(sx,sy-3,1.5,'#1a0a24');R(sx-1,sy-3,1,1,'#ff2d55');R(sx+1,sy-3,1,1,'#ff2d55');
  for(let k=0;k<4;k++){const lg=Math.floor(now/140+k)%2;R(sx-5,sy-2+k,3,1,'#1a0a24');R(sx+3,sy-2+k+lg,3,1,'#1a0a24')}}},
/* 15 말벌 군주: 줄무늬 배 + 침 + 날개 */
{main:'#ffd23a',frame:'#1a1408',
 shape(S,c){const {x,y,w,h}=S;for(let i=0;i<w;i++){const e=Math.min(i,8),k=e/8,hh=Math.max(3,Math.round(h*(.6+.4*k))),yy=y+(h-hh)/2;R(x+i,yy,1,hh,c.b);R(x+i,yy,1,1,c.h);R(x+i,yy+hh-2,1,2,c.l)}},
 back(S){const {x,y,w,h}=S;RA(x-2,y-2,w+4,h+4,'#0a0804',.9)},
 tex(S){const {x,y,h,now,fw}=S,o=Math.floor(now/70)%18;for(let i=-18;i<fw;i+=18)R(x+i+o,y,6,h,'#1a1408')},
 front(S){const {x,y,w,h,now}=S;bbTriH(x+w,y+1,14,h-2,'#1a1408',1);bbTriH(x+w,y+3,11,h-6,'#6a5a3a',1);R(x+w+11,y+h/2-.5,6,1,'#e8e0c8');
  const fl=Math.floor(now/40)%2;for(const [ox,oy,s] of [[x+6,y-5,1],[x+14,y-6,1]]){RA(ox-2,oy-(fl?4:2),12,fl?5:3,'#dff4ff',.55);R(ox-2,oy-(fl?4:2),12,1,'#ffffff')}}},
/* 16 수정 기생체: 비스듬한 결정 조각 + 삐죽한 결정 */
{main:'#6ae0ff',frame:'#1a1440',
 shape(S,c){const {x,y,w,h}=S,n=9,cw=w/n;for(let i=0;i<n;i++){const cx=x+i*cw;for(let dy=0;dy<h;dy++){const sk=Math.round((h-dy)*.4);R(cx+sk+1,y+dy,cw-3,1,dy<2?c.h:dy<4?c.m:dy>h-3?c.l:c.b)}}},
 back(S){const {x,y,w,h}=S;RA(x-2,y-2,w+8,h+4,'#08061a',.9)},
 tex(S){const {x,y,h,now,fw}=S;for(let i=0;i<fw;i+=30){bbLine(x+i+4,y+h-2,x+i+10,y+2,'#ffffff',.4)}const k=Math.floor(now/90);const rr=rng(k);R(x+rr()*fw,y+2+rr()*(h-4),1,1,'#ffffff')},
 front(S){const {x,y,w,h,now}=S,rr=rng(1616);for(let i=6;i<w;i+=16+Math.floor(rr()*14)){const L=3+Math.floor(rr()*6),up=rr()<.6;const col=rr()<.5?'#b89cff':'#6ae0ff';bbTriV(x+i,up?y-1:y+h+1,4,L,col,up?-1:1);R(x+i+1,up?y-L:y+h+1,1,Math.max(1,L-2),'#ffffff')}
  const cx=x+w+10,cy=y+h/2;for(let k=0;k<3;k++){bbTriV(cx-4+k*3,cy+6,4,10+((k*5)%4),k===1?'#e8dcff':'#8a6aff',-1)}glow(cx,cy,10,'#6ae0ff',.2+.1*Math.sin(now/200))}},
/* 17 심연 아귀왕: 이빨 아가리 + 초롱 미끼 */
{main:'#4d8aff',frame:'#0a1030',
 back(S){const {x,y,w,h}=S;R(x-3,y-4,w+6,h+8,'#050818');R(x-2,y-3,w+4,h+6,'#1a2a5a');R(x-1,y-1,w+2,h+2,'#04060e')},
 tex(S){const {x,y,h,now,fw}=S;for(let k=0;k<5;k++){const q=((now/1000)+k/5)%1;pcirc(x+((k*61)%Math.max(8,fw)),y+h-2-q*(h-3),1,'#bfe0ff',.6*(1-q))}},
 front(S){const {x,y,w,h,now}=S,cl=Math.round(Math.sin(now/400)*1);for(let i=2;i<w;i+=9){const L=3+((i*7)%2)+cl;bbTriV(x+i,y-1,4,L,'#f4f0e0',1);bbTriV(x+i+4,y+h+1,4,L,'#f4f0e0',-1)}
  const ax=x+w+4;bbLine(x+w-6,y-3,ax+6,y-10,'#1a2a5a');bbLine(ax+6,y-10,ax+12,y-4,'#1a2a5a');const p=.5+.5*Math.sin(now/160);glow(ax+12,y-2,8,'#ff4dd2',.25+.2*p);pcirc(ax+12,y-2,2.5,'#ffb0f0');R(ax+11,y-3,1,1,'#ffffff')}},
/* 18 재의 유령: 찢어진 천 + 연기 + 불씨 + 사슬 */
{main:'#ff9a5a',frame:'#2a2226',
 back(S){const {x,y,w,h,now}=S,rr=rng(1818);R(x-3,y-3,w+6,h+5,'#141014');R(x-2,y-2,w+4,h+3,'#3a3236');for(let i=-2;i<w+2;i+=2){const L=1+Math.floor(rr()*4)+Math.round(Math.sin(now/300+i*.2));R(x+i,y+h+1,2,Math.max(1,L),'#3a3236')}
  for(const ex of [x-8,x+w+3]){for(let k=0;k<3;k++){R(ex,y-2+k*5,5,3,'#6a6a70');R(ex+1,y-1+k*5,3,1,'#141014')}}},
 tex(S){const {x,y,h,now,fw}=S;for(let i=0;i<fw;i+=2){const f=.5+.5*Math.sin(i*.7+now/90);RA(x+i,y+h-4,2,3,'#ffe36b',.25*f)}},
 front(S){const {x,y,w,h,t}=S;for(let k=0;k<6;k++){const q=((t*.25)+k/6)%1,sx=x+((k*53)%w)+Math.sin(t+k)*6;pcirc(sx,y-q*14,2+q*4,'#8a8088',.3*(1-q))}for(let k=0;k<8;k++){const q=((t*.5)+k/8)%1,sx=x+((k*37+11)%w)+Math.sin(t*3+k)*3;RA(sx,y-1-q*16,1,1,k%2?'#ff9a5a':'#ffe36b',1-q)}
  const cx=x+w+14,cy=y+h/2;pcirc(cx,cy,8,'#141014');pcirc(cx,cy-1,6,'#2a2226');R(cx-3,cy-2,2,2,'#ff9a5a');R(cx+2,cy-2,2,2,'#ff9a5a')}},
/* 19 태초의 굶주림: 울퉁불퉁한 살덩이 + 눈 + 이빨 */
{main:'#ff4d6d',frame:'#2a0a14',
 shape(S,c){const {x,y,w,h,now}=S;for(let i=0;i<w;i++){const b=Math.round(Math.sin(i*.28+now/300)*1.2+Math.sin(i*.07)*1),hh=h+b,yy=y-(b>>1);R(x+i,yy,1,hh,c.b);R(x+i,yy,1,1,c.h);R(x+i,yy+1,1,1,c.m);R(x+i,yy+hh-2,1,2,c.l)}},
 back(S){const {x,y,w,h}=S;RA(x-3,y-4,w+6,h+8,'#0a0206',.9)},
 tex(S){const {x,y,h,now,fw}=S;let pv=null;for(let i=0;i<fw;i+=3){const vy=y+h/2+Math.sin(i*.2)*3;if(pv)bbLine(pv[0],pv[1],x+i,vy,'#8a0a24',.6+.3*Math.sin(now/150));pv=[x+i,vy]}},
 front(S){const {x,y,w,h,now}=S;for(let i=0;i<5;i++){const ex=x+30+i*52,ey=y-4,op=((now/700+i*1.7)%6)>.4;pcirc(ex,ey,3.5,'#2a0a14');if(op){pcirc(ex,ey,2.5,'#ffe36b');const a=Math.atan2(P.y-ey,P.x-ex);R(ex+Math.cos(a)*1.2-.5,ey+Math.sin(a)*1.2-1,1,2,'#1a0206')}else R(ex-3,ey,6,1,'#8a2a3a')}
  const cx=x+w+2;for(let k=0;k<4;k++){bbTriH(cx,y+k*3.3,6+(k%2)*3,3,'#f4f0e0',1)}pcirc(cx+12,y+h/2,6,'#2a0a14');pcirc(cx+12,y+h/2,4.5,'#ff4d6d');R(cx+10,y+h/2-1,4,2,'#ffe36b')}}
];
/* ---------- 메인 ---------- */
function BXC(){return _cx||ctx}
function drawBossBarRaw(now){const bn=document.getElementById('bossName');if(bn&&bn.style.visibility!=='hidden')bn.style.visibility='hidden';
 const B=G.B,bi=G.bi,ph=G.phase||0,r=clamp(G.hp/G.maxHp,0,1),T=bi>=10?TH2[bi]:null,org=!!T,TH=BB_TH[bi]||BB_TH[0];
 const x=BBX,y=BBY,w=BBW,h=BBH;
 if(G._barLast!==undefined&&r<G._barLast-1e-4){G._barHitT=now;G._barSp=G._barSp||[];for(let i=0;i<5;i++)G._barSp.push({x:0,y:0,vx:(RND()-.3)*60,vy:(RND()-.5)*60,t:now})}G._barLast=r;
 const dtb=Math.min(.25,(now-(G._hpT||now))/1000);G._hpT=now;G.hpShow=G.hpShow===undefined?r:(G.hpShow>r?Math.max(r,G.hpShow-.1*dtb):r);
 const OMC=['#ffd166','#fff8ec','#ff3a6a','#ffe9b0','#7fe8ff','#ff8fb0'],oq=now/260,main=G.omega&&G.revForm==='mutant'?mixc(['#ff2d55','#8a2aff','#ff4dd2','#3aff8a','#8a2aff','#ff2d55'][Math.floor(oq)%6],['#ff2d55','#8a2aff','#ff4dd2','#3aff8a','#8a2aff','#ff2d55'][(Math.floor(oq)+1)%6],oq%1):G.omega?mixc(OMC[Math.floor(oq)%6],OMC[(Math.floor(oq)+1)%6],oq%1):mixc(TH.main,'#ff2d55',ph*.14),acc=T?T.tel:B.pal[3],fr=T?T.dk:B.pal[1],edge=T?T.hi:B.pal[2],low=r<.25,pul=low?.5+.5*Math.sin(now/120):0,hitK=G._barHitT?clamp(1-(now-G._barHitT)/260,0,1):0;
 const rev=!!TH.rev,fw=Math.max(0,w*r),tw=w*G.hpShow,fx=rev?x+w-fw:x+fw;
 const trc=mixc('#ff6a5a','#fff0d0',hitK);
 const S={B,bi,ph,r,org,x,y,w,h,fw,fx,now,t:now/1000,main,acc,fr,edge,low,pul,hitK,mode:'e',
  c:{e:{b:'#161a22',m:'#1e232c',h:'#262c36',l:'#0c0f14'},t:{b:trc,m:mixc(trc,'#ffffff',.2),h:mixc(trc,'#ffffff',.45),l:shade(trc,.6)},f:{b:main,m:mixc(main,'#ffffff',.2),h:mixc(main,'#ffffff',.55),l:shade(main,.55)}}};
 const shape=TH.shape||bbRect;
 const clip=(a,b)=>{BXC().save();BXC().beginPath();BXC().rect(a,y-16,Math.max(0,b-a),h+32);BXC().clip()};
 // 1) 뒤 장식
 if(!TH.shape&&!TH.back){R(x-3,y-3,w+6,h+6,'#07090c');R(x-2,y-2,w+4,h+4,TH.frame)}
 if(TH.back)TH.back(S);
 // 2) 빈 몸체 → 잔상 → 채움
 S.mode='e';shape(S,S.c.e);
 S.mode='t';if(rev)clip(x+w-tw,x+w);else clip(x,x+tw);shape(S,S.c.t);BXC().restore();
 S.mode='f';if(rev)clip(x+w-fw,x+w);else clip(x,x+fw);shape(S,S.c.f);
 if(TH.tex){const s0=S.x;if(rev){S.x=x+w-fw}TH.tex(S);S.x=s0}
 const sh=((now/1500)%1.6)-.3;if(sh>0&&sh<1)RA(rev?x+w-fw+fw*sh:x+fw*sh,y-4,5,h+8,'#ffffff',.18);
 if(G.exposed&&Math.floor(now/90)%2)RA(x,y-4,w,h+8,'#ffe79a',.35);if(low)RA(x,y-4,w,h+8,'#ff2d55',pul*.22);if(hitK>0)RA(fx-4,y-4,8,h+8,'#ffffff',hitK*.7);
 BXC().restore();
 if(fw>1&&fw<w)R(fx-(rev?0:1),y,1,h,mixc(main,'#ffffff',.7));
 // 3) 앞 장식
 S.mode='f';TH.front&&TH.front(S);
 // 페이즈 경계 눈금
 for(const f of [.66,.33]){const px=Math.round(rev?x+w-w*f:x+w*f),lit=r>=f;R(px,y+h-2,1,4,'#06080a');bbTriV(px-2,y+h+2,5,3,lit?acc:'#3a3a44',1)}
 // 튀는 파편
 if(G._barSp){for(const p of G._barSp){const k=(now-p.t)/400;if(k>=1)continue;RA(fx+p.vx*k*.4,y+h/2+p.vy*k*.4,2,2,k<.4?'#ffffff':main,1-k)}G._barSp=G._barSp.filter(p=>now-p.t<400)}
 // 4) 보스 모양 게이지
 bbPortrait(now,S);
 // 5) 글자
 const hpN=Math.max(0,Math.ceil(G.hp)),txt=hpN.toLocaleString('en-US')+' / '+G.maxHp.toLocaleString('en-US');
 const OT=(t,tx,ty,al,col,f)=>hudText(t,tx,ty,al,col,f);
 const ty=y+h+12,pl=(G.omega?(G.revForm==='mutant'?'MUTATION':'OVERDRIVE'):'◆ PHASE '+(ph+1))+' · '+Math.ceil(r*100)+'%';BXC().font='bold 10px monospace';const bnm=B.name+(G.omega?(G.revForm==='mutant'?' ‡':' Ω'):''),nw=BXC().measureText(bnm).width;BXC().font='bold 8px monospace';const pw=BXC().measureText(pl).width;
 RA(x-2,ty-10,nw+pw+20,13,'#04070a',.85);R(x-2,ty+2,nw+pw+20,1,shade(edge,.6));OT(bnm,x+2,ty,'left',G.omega?mixc('#ffffff',main,.35):'#ffffff','bold 10px monospace');OT(pl,x+nw+12,ty,'left',mixc(main,'#ffffff',.4),'bold 8px monospace');
 BXC().font='bold 10px monospace';const tw2=BXC().measureText(txt).width;RA(x+w-tw2-6,ty-10,tw2+8,13,'#04070a',.85);R(x+w-tw2-6,ty+2,tw2+8,1,shade(edge,.6));OT(txt,x+w-2,ty,'right',low?mixc('#ffffff','#ff8a9a',pul):'#fff6c8','bold 10px monospace');
 BXC().textAlign='left'}

function drawBossBar(now){drawBossBarRaw(now)}
/*BB3_END*/
/*OMG_BEGIN*/
