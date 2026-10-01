/* ================= 펫 v3 (손으로 그린 절차 픽셀 · 똑딱 수준 디테일) + 자연스러운 무기 자세 ================= */
function drawPet(c,id,x,y,now,k){k=k||1;if(!id){drawTick(c,x,y,now,k);return}
 const t=now/1000,fl=!!(P&&P.face&&P.face.x<0),d=fl?-1:1,bob=Math.sin(now/260+id)*1.2;y+=bob*k;
 const Px=(xx,yy,w,h,col,al)=>{if(al!=null)c.globalAlpha=al;c.fillStyle=col;c.fillRect(Math.round(x+(d<0?-(xx+w):xx)*k),Math.round(y+yy*k),Math.max(1,Math.round(w*k)),Math.max(1,Math.round(h*k)));if(al!=null)c.globalAlpha=1};
 const Ci=(xx,yy,r,col,al)=>pcirc(x+d*xx*k,y+yy*k,r*k,col,al==null?1:al,c);
 const El=(xx,yy,rx,ry,col,al)=>{const cx=x+d*xx*k,cy=y+yy*k,RX=rx*k,RY=ry*k;if(al!=null)c.globalAlpha=al;c.fillStyle=col;for(let j=-RY;j<RY;j++){const w=RX*Math.sqrt(Math.max(0,1-((j+.5)/RY)**2));c.fillRect(Math.round(cx-w),Math.round(cy+j),Math.max(1,Math.round(w*2)),1)}if(al!=null)c.globalAlpha=1};
 const OL='#12161c',blink=Math.floor(now/140+id*7)%28===0;
 const eye=(xx,yy,col)=>{if(blink){Px(xx-.5,yy,2,1,OL);return}Px(xx-.5,yy-.5,2,2,col||OL);Px(xx-.5,yy-.5,1,1,'#ffffff')};
 El(0,10.5,5,1.2,'#000',.25);
 switch(id){
 case 1:{/* 반딧불 */const fw=Math.sin(t*28)>0,pu=.6+.4*Math.sin(t*4);Ci(0,3,9,'#ffe36b',.1*pu);Ci(0,3,6,'#ffe36b',.16*pu);
  for(const s2 of [-1,1]){El(s2*4.5,fw?-4:-2.5,4,2.6,'#dff6ff',.55);El(s2*4.5,fw?-4:-2.5,3,1.6,'#ffffff',.5)}
  Px(-1.5,-9,1,4,OL);Px(1,-9,1,4,OL);Ci(-1.5,-9.5,1,'#ffe36b');Ci(1.5,-9.5,1,'#ffe36b');
  Ci(0,-4,3.2,OL);Ci(0,-4,2.6,'#4a3e5a');Ci(-.8,-4.8,.8,'#6a5e7a');Px(-2,-4.5,1.6,1.6,'#ffffff');Px(.6,-4.5,1.6,1.6,'#ffffff');Px(-1.6,-4.1,.8,.8,OL);Px(1,-4.1,.8,.8,OL);
  El(0,0,2.6,2,OL);El(0,0,2,1.4,'#5a4a3a');
  El(0,4,3.8,4.4,OL);El(0,4,3.2,3.8,mixc('#ffcf3a','#fff6b0',pu));El(0,4.8,1.8,2.4,'#fffbe0');Px(-2.5,2,1,1,'#ffffff',.7);for(let i=0;i<3;i++)Px(-3,1.5+i*2,6,.5,'#c8961a',.35);break}
 case 2:{/* 태엽 쥐 */const kr=Math.cos(t*6);Px(-8,2,3,1,'#ff9ab0');Px(-10,0,2,2,'#ff9ab0');Px(-11,-2,1,2,'#ff9ab0');
  El(0,1.5,7,4.8,OL);El(0,1.5,6.3,4.2,'#aeb8c0');El(.5,3,5,2.4,'#dfe6ea');El(-1,-.5,4,1.6,'#c8d2d8');
  Px(-1-Math.abs(kr)*2,-6,2+Math.abs(kr)*4,1.2,'#d4ae4a');Px(-.5,-6,1,3,'#8a6a20');Ci(-1-Math.abs(kr)*2,-5.4,1.2,'#d4ae4a');Ci(1+Math.abs(kr)*2,-5.4,1.2,'#d4ae4a');
  Ci(3,-3,2.6,OL);Ci(3,-3,2.1,'#aeb8c0');Ci(3,-3,1.2,'#ffb0c4');
  El(6.4,1,2.8,2.4,OL);El(6.2,1,2.3,2,'#c8d2d8');Ci(8.8,1.4,.9,'#ff8aa0');eye(6.5,.2);
  Px(8,2.6,3,.4,'#6a7a84',.8);Px(8,3.4,3,.4,'#6a7a84',.8);
  for(const wx of [-3,2]){Ci(wx,6.2,1.3,OL);Ci(wx,6.2,.8,'#6a7a84');Px(wx-.3+Math.cos(t*9+wx)*.6,6,.6,.6,'#dfe6ea')}break}
 case 3:{/* 구름 양 */const puff=Math.sin(t*2)*.3;
  for(const [a,b,r] of [[-5,0,4],[5,0,4],[-3,-4,4],[3,-4,4],[0,-6,3.6],[0,2,4.6],[-6,4,3],[6,4,3]])Ci(a,b,r+.7,OL);
  for(const [a,b,r] of [[-5,0,4],[5,0,4],[-3,-4,4],[3,-4,4],[0,-6,3.6],[0,2,4.6],[-6,4,3],[6,4,3]]){Ci(a,b+.6,r,'#c8d4e4');Ci(a-.4,b-.2,r-.6+puff,'#ffffff')}
  El(0,.5,3.4,3.6,OL);El(0,.5,2.8,3,'#5a5a6a');El(-.6,-.6,1.4,1,'#7a7a8a');eye(-1.2,0,'#ffffff');eye(1.4,0,'#ffffff');Px(-1.6,.2,.8,.8,OL);Px(1,.2,.8,.8,OL);Px(-.5,2.2,1,.6,'#ffb0c4');Px(-3,1.6,1,.6,'#ff9ab0',.7);Px(2,1.6,1,.6,'#ff9ab0',.7);
  Px(-4,7,1.4,2.4,'#5a5a6a');Px(2.6,7,1.4,2.4,'#5a5a6a');for(let i=0;i<2;i++){const q=(t*.7+i*.5)%1;Ci(-8+i*16,5-q*6,1+q,'#ffffff',.5*(1-q))}break}
 case 4:{/* 부엉이 봇 */const fl2=Math.sin(t*8)*1;
  for(const s2 of [-1,1]){Px(s2*4-1,-10,2,3,OL);Px(s2*4-.6,-9.6,1.2,2.6,'#8a6a42')}
  Px(-6.5,-7.5,13,15,OL);Px(-6,-7,12,14,'#9a7a4a');Px(-6,-7,12,1,'#c8a878');Px(-6,6,12,1,'#6a4a28');
  for(const s2 of [-1,1]){Px(s2>0?6:-8,-2+fl2,2.4,7,OL);Px(s2>0?6:-7.6,-1.6+fl2,1.6,6,'#b8c4cc');Px(s2>0?6.2:-7.4,-1+fl2,1,1,'#ffffff')}
  El(0,3,3.6,3.2,'#e8d8b8');for(let i=0;i<3;i++)Px(-2+i*1.5,2+((i%2)?1:0),1,1,'#c8a878');
  for(const s2 of [-1,1]){Ci(s2*2.8,-3,3.1,OL);Ci(s2*2.8,-3,2.6,'#ffd166');Ci(s2*2.8,-3,1.7,'#1a1a24');if(!blink){Ci(s2*2.8,-3,.9,'#ff9a3a');Px(s2*2.8-1.3,-4.3,.9,.9,'#ffffff')}else Px(s2*2.8-2.4,-3.4,4.8,1,'#8a6a42')}
  Px(-.8,-1,1.6,2.2,'#ff9a3a');Px(-.4,.8,.8,.6,'#c86a1a');Px(-.3,-12,.6,2,'#6a7a84');Ci(0,-12.4,.8,Math.floor(t*2)%2?'#ff4d6d':'#5a1a2a');
  for(const [a,b] of [[-5,-6],[5,-6],[-5,5],[5,5]])Px(a-.4,b-.4,.8,.8,'#dfe6ea');Px(-3,7,1.6,1.6,'#ff9a3a');Px(1.6,7,1.6,1.6,'#ff9a3a');break}
 case 5:{/* 불꽃 여우 */const wag=Math.sin(t*5)*1.5;
  for(let i=0;i<9;i++){const q=i/8,fx=-6-q*5,fy=2-q*6+Math.sin(t*9+i)*.8+wag*q;Ci(fx,fy,2.6-q*1.2,q<.4?'#ff5a1f':q<.75?'#ff9a3a':'#ffe36b',.95)}Ci(-11,-4+wag,1.2,'#fff6c0');
  El(0,3,5.4,4,OL);El(0,3,4.8,3.4,'#ff8a3a');El(.6,4.6,3,1.8,'#fff0e0');
  Px(-3.5,6,1.6,2.6,'#3a1a10');Px(2,6,1.6,2.6,'#3a1a10');
  for(const s2 of [-1,1]){const ex=3+s2*3.2;c.fillStyle=OL;for(let j=0;j<4;j++)Px(ex-2+j*.5,-8+j,4-j,1,j===0?OL:'#ff8a3a');Px(ex-.5,-7,1,2,'#ffd0b0')}
  El(3,-3,5,4,OL);El(3,-3,4.4,3.4,'#ff8a3a');El(3,-1.2,3.4,2,'#fff6e8');eye(1.2,-3.4);eye(4.8,-3.4);Px(2.6,-1.6,.9,.8,OL);Px(.2,-2,1,.5,'#ff9ab0',.7);Px(5.2,-2,1,.5,'#ff9ab0',.7);break}
 case 6:{/* 얼음 펭귄 */const wv=Math.sin(t*6)*1.2;
  El(0,1,5.8,7.6,OL);El(0,1,5.2,7,'#2a4a7a');El(0,2.6,3.6,5.2,'#ffffff');El(-.8,1,1.2,2,'#e8f4ff');
  for(const s2 of [-1,1]){c.fillStyle=OL;Px(s2>0?4.6:-6.2,-1+(s2>0?-wv:wv)*.5,1.6,5,'#1a3458')}
  Px(-5,-2.5,10,1.6,'#9fe8ff');Px(2,-1,1.6,3.4,'#9fe8ff');Px(2,1.8,1.6,.6,'#ffffff');
  eye(-1.6,-4.4);eye(1.8,-4.4);Px(-.9,-3.2,1.8,1.1,'#ffb020');Px(-.4,-2.2,.8,.5,'#c87a10');Px(-3.4,-3.2,1,.5,'#ff9ab0',.6);Px(2.4,-3.2,1,.5,'#ff9ab0',.6);
  Px(-3.4,8,2.4,1.2,'#ffb020');Px(1,8,2.4,1.2,'#ffb020');
  for(let j=0;j<3;j++){const w2=j<1?1:j<2?2:1;Px(-w2/2,-9.5+j,w2,1,'#bff6ff')}if(Math.floor(t*3)%3===0)Px(-6+(Math.sin(t*7)*6),-8,.7,.7,'#ffffff');break}
 case 7:{/* 수정 드래곤 */const wf=Math.sin(t*10);
  for(const s2 of [-1,1]){const wy=-4-wf*2;c.fillStyle=OL;for(let j=0;j<6;j++){const w2=6-j;Px(s2>0?3:-3-w2,wy+j,w2,1,j===0?'#e8d8ff':'#8a5ac8')}Px(s2>0?3:-4,wy,1,6,'#6a3aa8')}
  for(let i=0;i<5;i++){const q=i/4;Ci(-4-q*4,5-q*2+Math.sin(t*4+i)*.5,1.8-q*.8,'#b88aff')}{const tx=-9,ty=2+Math.sin(t*4+5)*.5;for(let j=0;j<3;j++)Px(tx-1+j*.3,ty-j,1.4,1,'#e8fbff')}
  El(0,2,4.6,4.2,OL);El(0,2,4,3.6,'#b88aff');El(.4,3.4,2.4,2,'#e8d8ff');
  El(2,-4,4.2,3.6,OL);El(2,-4,3.6,3,'#b88aff');El(4.4,-3,2,1.6,'#c8a8ff');eye(1.2,-4.6,'#ffe36b');Px(4.6,-3.4,.8,.6,'#5a2a8a');
  for(const [hx,hh] of [[0,3],[2.6,3.6]]){for(let j=0;j<hh;j++)Px(hx-.5+(j*.25),-7.2-j,1,1,j===hh-1?'#ffffff':'#bff6ff')}
  for(let i=0;i<3;i++)Px(-2+i*1.4,-.8-(i%2),1,1.4,'#e8fbff');Ci(0,2,6,'#c8a8ff',.08+.05*Math.sin(t*3));break}
 case 8:{/* 유령 고양이 */const wob=t*5;Ci(0,1,7.5,'#bfe8ff',.08+.04*Math.sin(t*2));
  c.globalAlpha=.88;El(0,1,6,6.4,'#c8d8ec');El(0,.4,5.4,5.8,'#f4f8ff');for(let i=0;i<5;i++){const wx=-5+i*2.5,wy=6.4+Math.sin(wob+i*1.3)*1;Ci(wx,wy,1.4,'#f4f8ff')}
  for(const s2 of [-1,1]){for(let j=0;j<4;j++)Px(s2*3.6-(4-j)/2,-6.4+j,4-j,1,j===0?'#c8d8ec':'#f4f8ff');Px(s2*3.6-.5,-5,1,1.4,'#ffc8d8')}c.globalAlpha=1;
  const ge=.7+.3*Math.sin(t*3);for(const s2 of [-2,2]){if(blink)Px(s2-1,-1,2,.8,'#5ad0ff');else{Ci(s2,-1,1.3,'#5ad0ff',ge);Px(s2-.3,-1.6,.7,.7,'#ffffff')}}
  Px(-.5,.8,1,.6,'#ffb0c4');Px(-1.6,1.6,1.2,.5,'#8a9aac');Px(.4,1.6,1.2,.5,'#8a9aac');for(const s2 of [-1,1])Px(s2*5-1,.6,3,.4,'#c8d8ec',.8);
  for(let i=0;i<2;i++){const q=(t*.5+i*.5)%1;Ci(7-i*14,-4-q*6,.8,'#bfe8ff',.7*(1-q))}break}
 case 9:{/* 황금 불사조 */const fw=Math.sin(t*7);Ci(0,0,11,'#ffb020',.1+.05*Math.sin(t*4));
  for(let i=0;i<4;i++){const q=i/3,ty=5+q*5,sw=Math.sin(t*6+i)*1.2;Ci(-1+sw,ty,2.2-q*.8,q<.5?'#ff4d1a':'#ffd84a',.9)}Ci(Math.sin(t*6)*1.5-1,11,1,'#fff6c0');
  for(const s2 of [-1,1]){for(let j=0;j<5;j++){const L=9-j*1.2,a=(-.5-fw*.35)+j*.28,ex=s2*(2+Math.cos(a)*L),ey=-1+Math.sin(a)*L*.8;const col=j<2?'#ff4d1a':j<4?'#ff8a3a':'#ffd84a';for(let q=0;q<=6;q++){const k2=q/6;Px(s2*2+(ex-s2*2)*k2-.6,-1+(ey+1)*k2-.6,1.3,1.3,col)}Px(ex-.5,ey-.5,1,1,'#fff6c0')}}
  El(0,1,3.4,4.4,OL);El(0,1,2.8,3.8,'#ffd84a');El(.4,2.4,1.6,2.2,'#fff0a0');
  Ci(0,-5,3,OL);Ci(0,-5,2.5,'#ffd84a');Px(1.8,-5.2,2,1.2,'#ff8a3a');Px(2.8,-4.6,.8,.6,'#c85a10');eye(.6,-5.8);
  for(let i=0;i<3;i++){const cy=-8-i*1.4,cx=-1+i*.4+Math.sin(t*5+i)*.4;Px(cx,cy,1.2,1.4,i===2?'#fff6c0':'#ff4d1a')}
  if(Math.floor(t*10)%2){Px((RND()-.5)*14,(RND()-.5)*10,.8,.8,'#ffe36b')}break}
 }}
/* ---- 자연스러운 무기 자세 ---- */
const WPOSE={sword:{idle:1.05,len:10},dagger:{idle:1.9,len:7,rev:true},great:{idle:-2.3,len:13,shoulder:true},katana:{idle:.75,len:12},axe:{idle:-2.1,len:11,shoulder:true},rapier:{idle:.35,len:12},flame:{idle:1.0,len:11},spear:{idle:-1.45,len:16,thrust:true,butt:5},scythe:{idle:-1.75,len:13,butt:4},chrono:{idle:1.0,len:12}};
function drawWeaponShape(w,hx,hy,ang,L,s,now,dirS,al){const ca=Math.cos(ang),sa=Math.sin(ang),px=-sa,py=ca,P2=d=>[hx+ca*d,hy+sa*d],A=al==null?1:al;
 const seg=(d0,d1,wd,col,a2)=>{for(let d=d0;d<=d1;d+=.8){const [a,b]=P2(d);RA(a-wd/2,b-wd/2,wd,wd,col,(a2==null?1:a2)*A)}};
 switch(w.type){
 case 'dagger':seg(-1.5,0,2,w.hilt);seg(1,L,2.2,w.col);seg(1,L*.6,.8,'#fff6e0',.8);{const [a,b]=P2(.8);RA(a+px*2.5-1,b+py*2.5-1,2,2,'#6a4a2a',A);RA(a-px*2.5-1,b-py*2.5-1,2,2,'#6a4a2a',A)}break;
 case 'great':seg(-3,0,2,w.hilt);seg(1,L,4.2,'#5a6268');seg(1,L-1,2.6,w.col);seg(2,L-2,.8,'#ffffff',.6);{const [a,b]=P2(.8);for(let k=-4;k<=4;k++)RA(a+px*k-1,b+py*k-1,2,2,'#8a6b45',A)}break;
 case 'katana':seg(-3,0,1.8,w.hilt);for(let d=1;d<=L;d+=.7){const cv=(d/L)*(d/L)*2*dirS,[a,b]=P2(d);RA(a+px*cv-1,b+py*cv-1,2,2,d>L-2?'#ffffff':w.col,A);RA(a+px*(cv+1)-.5,b+py*(cv+1)-.5,1,1,'#aab6c8',A*.8)}{const [a,b]=P2(.6);RA(a-2,b-2,4,4,'#2a2a2a',A)}break;
 case 'axe':seg(-2,L,2,'#7a5a35');{const [a,b]=P2(L-2);for(let k=0;k<=5;k++){const ww=5-k*.6;RA(a+px*dirS*k-ww/2+ca*1,b+py*dirS*k-ww/2+sa*1,ww,ww,k>3?'#ffffff':w.col,A)}RA(a-px*dirS*2-1.5,b-py*dirS*2-1.5,3,3,'#8a9098',A)}break;
 case 'rapier':seg(-2,0,1.6,w.hilt);seg(1,L,1.2,w.col);{const [a,b]=P2(.5);pcirc(a,b,2.6,'#4a8ab0',.9*A);pcirc(a,b,1.4,'#9fe8ff',A)}{const [a,b]=P2(L);RA(a-1.5,b-1.5,3,3,'#ffffff',.6*A)}break;
 case 'flame':seg(-2,0,2,w.hilt);seg(1,L,3.2,'#b8321a');seg(1,L,1.6,w.col);seg(2,L-1,.7,'#fff0a0',.8);for(let i=0;i<5;i++){const d=2+((now/55+i*2.3)%L),[a,b]=P2(d),o=Math.sin(now/45+i)*2.2;RA(a+px*o-1,b+py*o-2,2,2,i%2?'#ffe36b':'#ff5a1f',.85*A)}break;
 case 'spear':{const bt=WPOSE.spear.butt;seg(-bt,L-3,1.6,'#5a5a78');seg(-bt,L-3,.6,'#8a8aa8',.8);for(let k=0;k<5;k++){const [c2,d2]=P2(L-3+k),ww=4-k*.7;RA(c2-ww/2,d2-ww/2,ww,ww,k>2?'#ffffff':w.col,A)}if(Math.floor(now/70)%3===0){const [a,b]=P2(L-2);RA(a+px*3,b+py*3-1,2,1,'#ffffff',.9*A);RA(a-px*3,b-py*3,1,2,'#fff6a0',.9*A)}break}
 case 'scythe':{const bt=WPOSE.scythe.butt;seg(-bt,L,1.6,'#3a2a4a');seg(-bt,L,.6,'#6a5a7a',.8);const [a,b]=P2(L);for(let k=0;k<10;k++){const q=k/9,bx=a+px*dirS*(-q*8)+ca*(Math.sin(q*Math.PI)*3.2),by=b+py*dirS*(-q*8)+sa*(Math.sin(q*Math.PI)*3.2);RA(bx-1.2,by-1.2,2.4+(k<5?.8:0),2.4,k>7?'#ffffff':w.col,A);RA(bx-.5,by-.5,1,1,'#f4e8ff',A*.7)}glow(a,b,7,w.col,.3*A);break}
 case 'chrono':seg(-2,0,2,w.hilt);seg(1,L,3.2,'#8a6a20');seg(1,L,1.8,w.col);seg(2,L-1,.6,'#ffffff',.7);{const [a,b]=P2(2.2);pcirc(a,b,2.6,'#fff6cf',.95*A);const q=now/200;RA(a+Math.cos(q)*1.5-.5,b+Math.sin(q)*1.5-.5,1,1,'#8a6a20',A)}{const [a,b]=P2(L);glow(a,b,6,'#ffe79a',(.4+.2*Math.sin(now/150))*A)}break;
 default:seg(-2,0,2,w.hilt);seg(1,L,2.2,w.col);seg(1,L-1,.7,'#ffffff',.6);{const [a,b]=P2(.8);RA(a+px*3-1,b+py*3-1,2,2,'#8a6b45',A);RA(a-px*3-1,b-py*3-1,2,2,'#8a6b45',A)}}}
function drawSword(x,y,s,fl,now){const w=curWp(),pose=WPOSE[w.type]||WPOSE.sword,dirS=fl?-1:1,L=pose.len*s/2*2;
 let bob=0;if(P.walkOn&&P.walkT!=null){const f=((Math.floor(P.walkT/(Math.PI/2))%4)+4)%4;bob=f%2?-1:0}const sway=Math.sin(now/520)*.06;
 const hx=x+(fl?.5:11.5)*s,hy=y+(6.2+bob)*s;
 const swing=P.lungeT?(now-P.lungeT)/(P.lungeDur||120):2,active=swing>=0&&swing<1;
 const toDir=a=>fl?Math.PI-a:a;
 if(!active){let a=pose.idle+sway;if(P.walkOn)a+=Math.sin((P.walkT||0)*2)*.08;drawWeaponShape(w,hx,hy,toDir(a),L,s,now,dirS);return}
 const e=swing<.5?2*swing*swing:1-Math.pow(-2*swing+2,2)/2;
 if(pose.thrust){const aim=toDir(-.1),ext=Math.sin(Math.min(1,swing)*Math.PI)*L*.55;drawWeaponShape(w,hx+Math.cos(aim)*ext,hy+Math.sin(aim)*ext,aim,L,s,now,dirS);for(let k=1;k<4;k++)RA(hx+Math.cos(aim)*(ext+L)-k*3*dirS,hy+Math.sin(aim)*(ext+L)-1,3,2,'#ffffff',.3-.08*k);return}
 const a0=pose.shoulder?-2.4:-1.5,a1=pose.shoulder?1.3:1.4,ac=a0+(a1-a0)*e;
 for(let k=4;k>=1;k--){const ak=a0+(a1-a0)*Math.max(0,e-k*.07);const aa=toDir(ak);for(let d=L*.35;d<=L;d+=1.5)RA(hx+Math.cos(aa)*d-1,hy+Math.sin(aa)*d-1,2,2,k===1?'#ffffff':w.col,.14*(5-k)/4)}
 drawWeaponShape(w,hx,hy,toDir(ac),L,s,now,dirS)}
/*PETS2_END*/
/*FEAT3_BEGIN*/
