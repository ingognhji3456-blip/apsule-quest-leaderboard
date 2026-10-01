/* ================= 챕터 2 괴수 전용 그리기 (완전히 새로 그린 생물형 실루엣) ================= */
const _bHex=c=>[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];
const _bMix=(a,b,k)=>{const A=_bHex(a),B=_bHex(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*k).toString(16).padStart(2,'0')).join('')};
const _bGrey=h=>{const [r,g,b]=_bHex(h),l=Math.round((r*.3+g*.55+b*.15)*.42+14);return '#'+[l,l+4,l+7].map(v=>Math.min(255,v).toString(16).padStart(2,'0')).join('')};
function beastKit(c,x,y,u,o,t){
 const sil=!!o.sil,dm=!!o.dorm||sil,fl=!!o.flash,still=!!(o.still||(dm&&!sil));
 const wr=!dm&&!fl&&(o.warn||0)>0&&Math.floor(t/70)%2===0?.4*Math.min(1,o.warn):0;
 const cc=h=>sil?_bMix(h,'#07060a',.9):fl?_bMix(h,'#ffffff',.78):dm?_bGrey(h):wr?_bMix(h,'#ff2d55',wr):h;
 const F=(a,b,w,h,col)=>{const X0=Math.round(x+a*u),Y0=Math.round(y+b*u),X1=Math.round(x+(a+w)*u),Y1=Math.round(y+(b+h)*u);if(X1>X0&&Y1>Y0){c.fillStyle=cc(col);c.fillRect(X0,Y0,X1-X0,Y1-Y0)}};
 const FA=(a,b,w,h,col,al)=>{if(al<=0)return;c.globalAlpha=Math.min(1,al);F(a,b,w,h,col);c.globalAlpha=1};
 const E=(cx,cy,rx,ry,col)=>{if(rx<=0||ry<=0)return;for(let j=Math.floor(cy-ry);j<Math.ceil(cy+ry);j++){const d=(j+.5-cy)/ry;if(Math.abs(d)>1)continue;const w=rx*Math.sqrt(1-d*d),a0=Math.round(cx-w),a1=Math.round(cx+w);if(a1>a0)F(a0,j,a1-a0,1,col)}};
 const EA=(cx,cy,rx,ry,col,al)=>{if(al<=0)return;c.globalAlpha=Math.min(1,al);E(cx,cy,rx,ry,col);c.globalAlpha=1};
 const BLOB=(cx,cy,rx,ry,base,dark,light,ol)=>{E(cx,cy,rx+1,ry+1,ol||'#0a0a0c');E(cx,cy,rx,ry,dark);E(cx-.5,cy-.7,rx-.8,ry-.9,base);if(light)E(cx-rx*.33,cy-ry*.42,Math.max(.8,rx*.3),Math.max(.6,ry*.22),light)};
 const LN=(a0,b0,a1,b1,w,col)=>{const n=Math.max(1,Math.ceil(Math.hypot(a1-a0,b1-b0)*1.5));for(let i=0;i<=n;i++){const k=i/n;F(Math.round(a0+(a1-a0)*k-w/2),Math.round(b0+(b1-b0)*k-w/2),w,w,col)}};
 const GL=(cx,cy,r,col,al)=>{if(fl||dm||al<=0)return;const X0=x+(cx+.5)*u,Y0=y+(cy+.5)*u,R0=r*u;pcirc(X0,Y0,R0,col,al*.1,c);pcirc(X0,Y0,R0*.68,col,al*.16,c);pcirc(X0,Y0,R0*.4,col,al*.26,c)};
 const SHARD=(a,b,ang,L,Wd,lit,sh,edge)=>{const dx=Math.cos(ang),dy=Math.sin(ang),px=-dy,py=dx;for(let s=0;s<=L;s+=.5){const w=Wd*Math.pow(1-s/L,.8);for(let p=-w-.6;p<=w+.6;p+=.5){const X1=Math.round(a+dx*s+px*p),Y1=Math.round(b+dy*s+py*p);F(X1,Y1,1,1,Math.abs(p)>w?OLc:(p<-.2?lit:p>.2?sh:edge))}}};
 const OLc='#0a0a0c';
 const THREAD=(a,b0,b1,al)=>{if(fl||dm)return;c.globalAlpha=al;c.fillStyle='#ffffff';c.fillRect(Math.round(x+(a+.5)*u),Math.round(y+b0*u),1,Math.max(1,Math.round((b1-b0)*u)));c.globalAlpha=1};
 const blink=seed=>!still&&((t/170+seed*37)%29)<1.1;
 const W_=(s,amp,sp)=>still?0:Math.round(Math.sin(t/(sp||300)+s)*(amp||1));
 const FANG=(a,b,len,col,dir)=>{for(let i=0;i<len;i++){const w=i<len-1?1:1;F(a,b+(dir>0?i:-i-1),w,1,col)}};
 const TEETH=(a0,a1,b,len,col,dir,gap)=>{for(let a=a0;a<=a1;a+=(gap||2))FANG(a,b,len,col,dir)};
 return {dm,fl,still,cc,F,FA,E,EA,BLOB,LN,GL,blink,W_,TEETH,FANG,SHARD,THREAD};
}
/* 약점(코어) 공통 처리: 닫힘/열림/노출 */
function beastCore(K,o,t,cx,cy,r,col,lid,style){
 const {F,E,EA,GL,dm}=K,ex=!dm&&o.expose,op=dm?0:(o.open||0),f2=Math.floor(t/70)%2;
 if(ex){GL(cx,cy,r+6,col,1);E(cx,cy,r+1,r+1,'#0a0a0c');E(cx,cy,r,r,f2?col:'#ffffff');E(cx,cy,r*.45,r*.45,f2?'#ffffff':col);return}
 if(op>0){GL(cx,cy,r+4,col,.8*op);E(cx,cy,r+1,r+1,'#0a0a0c');E(cx,cy,r,r,col);E(cx-r*.3,cy-r*.3,r*.35,r*.35,'#ffffff');return}
 if(style==='eye'){E(cx,cy,r+1,r*.75+1,'#0a0a0c');E(cx,cy,r,r*.75,lid);F(Math.round(cx-r),Math.round(cy),Math.round(r*2),1,'#0a0a0c')}
 else if(style==='gem'){E(cx,cy,r+1,r+1,'#0a0a0c');E(cx,cy,r,r,lid);EA(cx,cy,r*.5,r*.5,col,dm?0:.35+.2*Math.sin(t/260))}
 else{E(cx,cy,r+1,r+1,'#0a0a0c');E(cx,cy,r,r,lid);EA(cx,cy,r*.6,r*.6,col,dm?0:.25+.2*Math.max(0,Math.sin(t/220)))}
}
/* 눈 레이저 충전 표시 */
function beastEyeGlow(K,o,cx,cy){const eg=o.eye||0;if(eg<=0||K.dm)return;const {GL,E,F}=K;GL(cx,cy,2.5+eg*5,'#ff4d6d',.6+.4*eg);E(cx,cy,.8+eg*.8,.8+eg*.8,'#ff4d6d');F(Math.round(cx),Math.round(cy),1,1,'#ffffff');for(let i=0;i<Math.round(eg*5);i++)F(Math.round(cx+(RND()-.5)*10),Math.round(cy+(RND()-.5)*8),1,1,'#ffb0bd')}

function drawBeast(c,B,x,y,t,o,u){o=o||{};const bid=BOSSES.indexOf(B),cf=B.cfg,P_=B.pal;
 const K=beastKit(c,x,y,u,o,t),{F,FA,E,EA,BLOB,LN,GL,blink,W_,TEETH,FANG,SHARD,THREAD,still,dm}=K;
 const bt=BASEH[cf.base],bh=cf.bh,hf=cf.bw/2,top=-(bt+bh),cy=-(bt+bh/2),hy=-(bt+bh+3);
 const pul=o.pulse||0,br=still?0:Math.round(Math.sin(t/300)*.6-pul*.9),T=still?0:t;
 const OL='#0a0a0c';
 switch(bid){
 /* ───── 10 뿌리아귀: 부러진 고목 괴수, 몸통을 가로지르는 톱니 아가리 ───── */
 case 10:{const bark='#5a3f26',barkD='#2b1d10',barkL='#8a6a42',moss='#6a9a32',glow='#9bff5a',tooth='#efe3b8';
  for(let i=0;i<6;i++){const sg=i<3?-1:1,k=i%3,sw=W_(i*1.7,1,420),x0=sg*(2+k*2),x1=sg*(6+k*4)+sw;LN(x0,-6,x1,-1,2,OL);LN(x0,-6,x1,-1,1,k===1?barkL:bark);F(x1-1,-1,3,1,barkD);F(x1+sg*2,0,1,1,barkD)}
  LN(-4,-19+br,-9,-26+br,2,OL);LN(-4,-19+br,-9,-26+br,1,barkD);LN(-7,-23+br,-11,-24+br,1,barkD);
  LN(4,-19+br,8,-27+br,2,OL);LN(4,-19+br,8,-27+br,1,barkD);LN(7,-24+br,11,-25+br,1,barkD);LN(8,-27+br,7,-30+br,1,barkD);
  E(0,-10+br,9.6,7.2,OL);E(0,-16+br,6.8,4.4,OL);E(0,-10+br,8.7,6.4,barkD);E(0,-16+br,6,3.6,barkD);E(-.6,-10.8+br,7.4,5.2,bark);E(-.5,-16.4+br,4.8,2.6,bark);
  const crown=[2,4,1,3,5,2,4,1,3,2,4];for(let i=-5;i<=5;i++){const hg=crown[i+5];F(i,-19-hg+br,1,hg+1,i%2?barkD:bark);F(i,-20-hg+br,1,1,OL)}
  for(const a of [-6,-3,3,6])LN(a,-17+br,a+(a>0?1:-1),-5+br,1,barkD);LN(-5,-15+br,-6,-8+br,1,barkL);
  for(const [a,b] of [[-11,-25],[11,-26],[7,-31],[-9,-27]]){E(a,b+br,1.5,1,moss);F(a,b-1+br,1,1,'#b8ff6a')}
  for(const [a,b,l] of [[-10,-24,3],[10,-25,4],[-6,-21,2]])LN(a,b+br,a+W_(a,1,500),b+l+br,1,moss);
  E(-7,-7+br,1.8,1,moss);E(6,-13+br,1.5,.9,moss);E(4,-4+br,2,.8,moss);
  const ey=-15+br;for(const [a,r] of [[-3,1.6],[3,1.9]]){E(a,ey,r+.4,r*.8+.4,OL);E(a,ey,r,r*.8,'#140a04')}
  if(!blink(1)&&!dm){F(-3,ey,1,1,glow);F(3,ey,1,1,glow);F(3,ey-1,1,1,'#eaffd0');GL(-3,ey,2,glow,.7);GL(3,ey,2.3,glow,.7)}
  const op=dm?0:(o.expose?1:(o.open||0)),gap=1.8+op*2.2+(still?0:Math.max(0,Math.sin(T/380))*.7),my=-8.5+br;
  E(0,my,7.6,gap+1.1,OL);E(0,my,7,gap+.3,'#1a0806');GL(0,my,4.5,glow,.35+op*.55);
  for(let a=-6;a<=6;a+=2)FANG(a,Math.round(my-gap-.3),2+((a+8)%3===0?1:0),tooth,1);
  for(let a=-5;a<=5;a+=2)FANG(a,Math.round(my+gap+.3),2,'#d8c89a',-1);
  beastCore(K,o,t,0,my,1.7,glow,'#2b3a12','heart');
  if(!still)for(let i=0;i<3;i++){const ph=((T/900)+i*.37)%1;FA(-4+i*4,Math.round(my+gap+1+ph*5),1,2,glow,1-ph*.6)}
  beastEyeGlow(K,o,0,ey);break}
 /* ───── 11 포자여왕: 거대 버섯갓에 박힌 외눈, 포자를 흩뿌리는 여왕 ───── */
 case 11:{const cap='#7a4f9a',capD='#3a2350',capL='#b98ad6',stalk='#d8c4e8',stalkD='#8a70a0',spot='#caff6b';
  for(let i=0;i<6;i++){const x0=-4+i*1.6;for(let j=0;j<7;j++){const sw=still?0:Math.sin(t/300+i*1.3+j*.6)*(j*.4);FA(Math.round(x0+sw),-6+j,1,1,j%2?stalkD:'#6a5a80',1-j/8)}if(!still&&i%2===0)FA(Math.round(x0+Math.sin(t/300+i*1.3+3.6)*2.4),1,1,1,spot,.8)}
  for(let j=-15;j<=-5;j++){const k=(j+15)/10,w=2+1.9*Math.sin(k*Math.PI*.85),yy=j+br;F(Math.round(-w)-1,yy,Math.round(w*2)+2,1,OL);F(Math.round(-w),yy,Math.round(w*2),1,stalkD);F(Math.round(-w)+1,yy,Math.max(1,Math.round(w*2)-2),1,stalk);F(Math.round(-w)+1,yy,1,1,'#f4ecff')}
  for(const [a0,b0,a1,b1] of [[0,-9,-2,-6],[0,-9,2,-12],[0,-9,-2,-13],[0,-9,2,-6]])K.LN(a0,b0+br,a1,b1+br,1,_bMix(stalkD,spot,.45));
  beastCore(K,o,t,0,-9+br,1.9,spot,'#4a5a2a','heart');
  E(0,-14+br,5.2,1.4,OL);E(0,-14+br,4.6,.9,'#b8a0c8');for(let a=-4;a<=4;a+=2)F(a,-13+br,1,1+((a+4)%4?1:0),'#b8a0c8');
  const cb=-17+br+W_(0,1,500);
  E(0,cb+1,11.5,2.2,'#241a30');for(let a=-10;a<=10;a+=2)F(a,cb,1,2,'#e0c3ff');if(!dm)GL(0,cb+1,6,spot,.35);
  BLOB(0,cb-3,11.5,4.8,cap,capD,capL);
  for(const [a,b,r] of [[-7,-2,1.4],[6,-3,1.2],[-3,-5,1],[9,-1,.9],[-10,-1,.8],[3,-6,.8]]){const p=still?.8:.6+.4*Math.sin(t/300+a);E(a,cb+b,r+.4,r+.4,capD);E(a,cb+b,r,r,_bMix(capL,spot,p))}
  const eo=o.eye>0||o.expose,bl=blink(3)||dm;E(0,cb-3,3.4,2.4,OL);
  if(bl)F(-3,cb-3,7,1,capL);else{E(0,cb-3,2.8,1.9,'#f6ffd8');const pv=still?0:Math.round(Math.sin(t/700)*1.2);E(pv,cb-3,1.3,1.5,eo?'#ff4d6d':'#6a9a10');F(pv,cb-4,1,2,OL)}
  if(!still)for(let i=0;i<12;i++){const ph=((T/2600)+i*.083)%1,ax=Math.sin(i*2.3)*10+Math.sin(ph*6+i)*2,ay=cb-4-ph*16;FA(Math.round(ax),Math.round(ay),1,1,i%3?spot:'#ffffff',(1-ph)*.9)}
  beastEyeGlow(K,o,0,cb-3);break}
 /* ───── 12 늪지 아귀: 개구리+초롱아귀, 몸통 전체를 가로지르는 입 ───── */
 case 12:{const sk='#2e4d3f',skD='#16241d',skL='#4f7a62',belly='#8fbfa6',lure='#ffcf5a';
  for(const sg of [-1,1]){E(sg*7,-4,3,2.6,OL);E(sg*7,-4,2.2,1.8,skD);E(sg*7.5,-1,3.2,1.2,skD);for(let k=-1;k<=1;k++)F(sg*7.5+k*2,0,1,1,skL)}
  BLOB(0,-10+br,10,6,sk,skD,skL);E(0,-6+br,7,2.5,belly);
  for(const [a,b] of [[-7,-13],[6,-14],[-2,-15],[8,-10],[-9,-9]])E(a,b+br,.9,.7,skL);
  const op=dm?0:(o.expose?1:(o.open||0)),gap=1+op*2.2+(still?0:Math.max(0,Math.sin(T/420))*.8),my=-9+br;
  E(0,my,8.2,gap+.7,OL);E(0,my,7.6,gap,'#3a0e14');
  TEETH(-7,7,Math.round(my-gap),2,'#eaf6ee',1,1);TEETH(-6,6,Math.round(my+gap),2,'#cfe2d6',-1,2);
  beastCore(K,o,t,0,my,1.8,lure,'#5a1a22','heart');
  if(!still)for(const a of [-6,-1,5]){const ph=((T/1100)+a*.13)%1;F(a,Math.round(my+gap+1+ph*5),1,1+Math.round(ph*2),'#7fc9a0')}
  for(const sg of [-1,1]){const ex=sg*5,ey=-16+br,bl=blink(sg+5)||dm;BLOB(ex,ey,2.8,2.6,sk,skD,skL);if(bl)F(ex-2,ey,5,1,OL);else{E(ex,ey,2.1,1.9,'#ffe07a');F(ex,ey-1,1,3,OL)}}
  const sw=W_(0,2,520),lx=2+sw,ly=-23+br;LN(0,-15+br,1,-20+br,1,skD);LN(1,-20+br,lx,ly+1,1,skD);GL(lx,ly,3.2,lure,.9);E(lx,ly,1.3,1.3,lure);F(lx,ly,1,1,'#ffffff');
  for(const a of [-8,-4,3,7])LN(a,-5+br,a+W_(a,1,600),-1+br,1,'#3f6b3a');
  beastEyeGlow(K,o,0,hy+2);break}
 /* ───── 13 백골 사냥개: 갈비뼈 속에서 뛰는 심장, 붉은 눈의 해골 늑대 ───── */
 case 13:{const bn='#e8e2c8',bnS='#b3aa8c',bnD='#6b5f45',vd='#140e08',red='#ff3b3b';
  const tw=still?0:Math.sin(t/240);for(let i=0;i<7;i++){const k=i/6,tx=7+k*6+Math.sin(k*2.4)*1,ty=-9-k*7+tw*k*k*3;E(tx,ty+br,1.1-k*.3,1.1-k*.3,OL);F(Math.round(tx),Math.round(ty+br),1,1,i%2?bn:bnS)}
  for(const [sg,k] of [[-1,1],[1,1],[-1,0],[1,0]]){const xo=sg*(k?8:5),col=k?bnS:bn;LN(sg*(k?6:4),-7,xo,-3,2,OL);LN(sg*(k?6:4),-7,xo,-3,1,col);LN(xo,-3,xo+sg,0,1,col);F(xo-1+sg,0,3,1,bnD);E(xo,-3,.9,.9,bn)}
  E(0,-11+br,8.5,4.8,OL);E(0,-11+br,7.8,4.2,vd);
  beastCore(K,o,t,0,-11+br,1.9,red,'#5a1010','heart');
  if(!dm&&!o.expose&&!(o.open>0)){const hb=still?0:Math.max(0,Math.sin(t/180));K.EA(0,-11+br,1.5+hb,1.5+hb,red,.45+hb*.4);GL(0,-11+br,3+hb,red,.4)}
  for(let i=-3;i<=3;i++){if(i===0)continue;const rx=i*2.1;for(let j=0;j<8;j++){const yy=-14.5+j,bend=Math.sin(j/7*Math.PI)*Math.sign(i)*.9;F(Math.round(rx+bend),Math.round(yy+br),1,1,j%3?bn:bnS)}}
  F(-1,-15+br,2,8,bn);F(-7,-7+br,14,1,bnS);
  for(let i=-6;i<=6;i+=2){E(i,-15.5+br,1,1,bn);F(i,-18+br+(i%4?1:0),1,2,bnS)}
  const hy2=-20+br,jaw=still?0:Math.max(0,Math.round(Math.sin(t/140)*1.3));
  for(const sg of [-1,1]){LN(sg*3,hy2-2,sg*6,hy2-4,2,OL);LN(sg*3,hy2-2,sg*6,hy2-4,1,bn);F(sg*7,hy2-5,1,1,bnS);F(sg*6,hy2-5,1,1,bn)}
  E(0,hy2,5,3.4,OL);E(0,hy2,4.3,2.8,bnS);E(-.4,hy2-.5,3.6,2.2,bn);F(-3,hy2-1,7,1,bnS);
  for(const sg of [-1,1]){E(sg*2,hy2+.4,1.5,1,vd);if(!dm){F(sg*2,Math.round(hy2+.4),1,1,red);GL(sg*2,hy2+.4,2.2,red,.8)}}
  F(-2,hy2+2,5,4,OL);F(-1,hy2+2,3,4,bn);F(-1,hy2+2,3,1,bnS);F(0,hy2+3,1,1,vd);
  F(-2,hy2+5,1,2,'#ffffff');F(2,hy2+5,1,2,'#ffffff');
  F(-2,hy2+6+jaw,5,2,OL);F(-1,hy2+6+jaw,3,1,bnS);F(-1,hy2+5+jaw,1,1,bn);F(1,hy2+5+jaw,1,1,bn);
  if(!still)for(let i=0;i<2;i++){const ph=((T/700)+i*.5)%1;FA(i?2:-2,Math.round(hy2-1-ph*6),1,1,red,1-ph)}
  beastEyeGlow(K,o,0,hy2);break}
 /* ───── 14 실크 여제: 거미 하반신 위로 솟은 창백한 상체, 여덟 개의 눈 ───── */
 case 14:{const ch='#5a2e5e',chD='#231226',chL='#8a4e90',leg='#7a3e80',skin='#e8d6ee',skinD='#9a7aa6',mk='#ff3a6a';
  THREAD(-6,-30,-19+br,.3);THREAD(6,-30,-19+br,.3);THREAD(0,-30,-22+br,.22);
  for(let i=3;i>=0;i--)for(const sg of [-1,1]){const tw=W_(i*1.9+sg,1,260),kx=sg*(7+i*2.4),ky=-13+i*1.4+tw,fx=sg*(9+i*3.2),col=i%2?leg:chL;LN(sg*3,-6,kx,ky,2,OL);LN(kx,ky,fx,0,2,OL);LN(sg*3,-6,kx,ky,1,col);LN(kx,ky,fx,0,1,col);F(kx,ky,1,1,'#e0b0ff');F(fx,0,1,1,'#e0b0ff')}
  BLOB(0,-5,8,4,ch,chD,chL);for(let i=-5;i<=5;i+=2)F(i,-6+(i%4?0:1),1,2,chL);
  E(0,-4,2,2.2,OL);F(-1,-5,3,1,mk);F(0,-4,1,1,mk);F(-1,-3,3,1,mk);
  BLOB(0,-11+br,3.6,3.8,skin,skinD,'#ffffff');for(const sg of [-1,1])F(sg*2,-10+br,1,3,skinD);
  beastCore(K,o,t,0,-10.5+br,1.5,mk,'#6a1a36','gem');
  for(const sg of [-1,1]){LN(sg*3,-13+br,sg*5,-15+br,1,skinD)}
  const hy2=-17+br;
  for(let i=-4;i<=4;i++){const hl=6+Math.abs(i)+W_(i,1,380);LN(i,hy2-3,Math.round(i*1.4),hy2+hl-2,1,i%2?'#d8ccf0':'#f6f0ff')}
  BLOB(0,hy2,3.2,3,skin,skinD,'#ffffff');
  const bl=dm;for(const [a,b,r] of [[-1.5,-1,.9],[1.5,-1,.9],[-2.5,0,.6],[2.5,0,.6],[-1,1,.5],[1,1,.5],[-2,-2.3,.5],[2,-2.3,.5]]){if(bl)F(Math.round(a),Math.round(hy2+b),1,1,OL);else{E(a,hy2+b,r+.3,r+.3,OL);E(a,hy2+b,r,r,mk)}}
  if(!dm){GL(-1.5,hy2-1,2.2,mk,.6);GL(1.5,hy2-1,2.2,mk,.6)}
  F(-1,hy2+2,1,2,'#fff7ff');F(1,hy2+2,1,2,'#fff7ff');if(!still&&Math.floor(t/800)%3===0)F(1,hy2+4,1,1,'#b8ff6a');
  F(-3,hy2-4,1,2,'#ffe79a');F(0,hy2-6,1,3,'#ffe79a');F(2,hy2-4,1,2,'#ffe79a');F(-2,hy2-3,5,1,'#c9a030');F(0,hy2-5,1,1,mk);
  beastEyeGlow(K,o,0,hy2-1);break}
 /* ───── 15 말벌 군주: 겹눈·큰턱·윙윙대는 두 쌍의 날개 ───── */
 case 15:{const yl='#ffcf3a',ylD='#8a6a10',bk='#1a1a1a',bkL='#3a3a3a',wing='#e8f4ff';
  const wf=still?0:Math.floor(t/35)%3;
  for(const sg of [-1,1]){for(const [k,a0,b0,rx,ry] of [[0,7,-17,7,3],[1,6,-13,5,2.2]]){const ph=(wf+k)%3,dy=ph===0?-1:ph===1?0:1;EA(sg*a0,b0+dy+br,rx,ry,wing,.38);EA(sg*a0,b0+dy+br,rx-.8,ry-.6,'#ffffff',.18);LN(sg*1,b0+br,sg*(a0+rx-1),b0+dy+br,1,'#b0c8e0')}}
  for(let i=0;i<4;i++){const yy=-6+i*1.6;E(0,yy,3.2-i*.7,1.2,i%2?bk:yl)}F(0,0,1,1,bk);F(0,1,1,1,'#ffe79a');
  for(const sg of [-1,1])for(let k=0;k<3;k++){const sw=W_(k+sg,1,300);LN(sg*2,-9+k,sg*(4+k),-5+k+sw,1,bk)}
  BLOB(0,-10+br,4.8,3.8,bk,'#0a0a0a',bkL);for(let i=-4;i<=4;i+=2)F(i,-13+br+((i/2)%2?1:0),1,1,yl);F(-3,-9+br,7,1,ylD);
  beastCore(K,o,t,0,-10+br,1.6,yl,'#4a3a08','gem');
  const hy2=-16+br;BLOB(0,hy2,4.6,3.2,yl,ylD,'#fff0a0');
  const ec=o.eye>0?'#ff4d6d':'#241a08';for(const sg of [-1,1]){E(sg*2.6,hy2-.5,2.2,2.6,OL);E(sg*2.6,hy2-.5,1.8,2.2,ec);F(Math.round(sg*2.6-(sg>0?0:1)),Math.round(hy2-2),1,1,'#fff7c0');F(Math.round(sg*2),Math.round(hy2),1,1,'#6a5a20')}
  const mo=still?1:1+Math.round(Math.abs(Math.sin(t/120)));F(-2-mo,hy2+2,2,2,ylD);F(1+mo,hy2+2,2,2,ylD);F(-2-mo,hy2+4,1,1,bk);F(2+mo,hy2+4,1,1,bk);
  for(const sg of [-1,1]){const sw=W_(sg*2,1,450);LN(sg*1,hy2-3,sg*3,hy2-6,1,bk);LN(sg*3,hy2-6,sg*5+sw,hy2-8,1,bk);F(sg*5+sw,hy2-9,1,1,yl)}
  beastEyeGlow(K,o,0,hy2);break}
 /* ───── 16 수정 기생체: 등에서 거대한 수정이 자라난 살덩이, 여기저기 뜨는 눈 ───── */
 case 16:{const fl2='#5a2e6e',flD='#231230',flL='#8a4a9e',cr='#9ff0ff',crD='#2a7a9a',crM='#5ac8e8',vein='#c85ad8';
  for(let i=-7;i<=7;i+=2){const ph=still?0:Math.sin(t/140+i*.8);LN(i*.8,-5,i+Math.round(ph),-1,1,flD);F(i+Math.round(ph),0,1,1,flL)}
  SHARD(-6,-11+br,-2.1,6,1.6,cr,crD,crM);
  BLOB(0,-9+br,8,5.4,fl2,flD,flL);BLOB(-5,-12+br,3.4,2.8,fl2,flD,flL);BLOB(4,-13+br,4,3.4,fl2,flD,flL);
  for(const [a0,b0,a1,b1] of [[-6,-7,-2,-11],[2,-5,6,-9],[-1,-12,3,-15],[5,-10,8,-8]])LN(a0,b0+br,a1,b1+br,1,_bMix(fl2,vein,still?.6:.4+.3*Math.sin(t/300+a0)));
  SHARD(3,-15+br,-1.25,12,2.4,cr,crD,crM);SHARD(-1,-15+br,-1.75,6,1.4,cr,crD,crM);SHARD(7,-11+br,-.4,5,1.3,cr,crD,crM);SHARD(-8,-9+br,-2.8,4,1.1,cr,crD,crM);
  if(!dm){GL(6,-24+br,4,cr,.6);GL(-8,-15+br,3,cr,.45);GL(0,-10+br,5,cr,.25)}
  beastCore(K,o,t,0,-9.5+br,2,cr,'#3a1a4a','gem');
  const mo=still?0:Math.max(0,Math.round(Math.sin(t/330)));E(0,-5.5+br,3,1+mo*.6,OL);if(mo)for(const a of [-2,0,2])F(a,-6+br,1,1,'#f0e0ff');
  for(const [a,b,r,s2] of [[-5,-8,1.2,1],[5,-7,1,2],[-3,-13,.9,3],[7,-13,1.1,4],[-8,-11,.8,5],[1,-16,1,6]]){const bl=blink(s2)||dm;E(a,b+br,r+.5,r+.5,OL);if(bl)F(Math.round(a-r),Math.round(b+br),Math.round(r*2)+1,1,flL);else{E(a,b+br,r,r,'#fff4ff');F(Math.round(a+(still?0:Math.round(Math.sin(t/500+s2)))),Math.round(b+br),1,1,o.eye>0?'#ff4d6d':'#2a0a3a')}}
  if(!still)for(let i=0;i<4;i++){const ph=((T/1500)+i*.25)%1;FA(Math.round(5+Math.sin(i*3+ph*5)*4),Math.round(-20-ph*8+br),1,1,cr,1-ph)}
  beastEyeGlow(K,o,1,-16+br);break}
 /* ───── 17 심연 아귀왕: 몸 전체가 이빨 가득한 아가리, 발광 미끼 ───── */
 case 17:{const bd='#1a3a5e',bdD='#0c1a2c',bdL='#3a6a9e',lure='#ff5d8f',bio='#7ab8f0';
  for(let i=0;i<5;i++){const sw=W_(i*1.4,2,340),x0=-6+i*3;LN(x0,-6,x0+sw,0,1,bdD);F(x0+sw,0,1,1,bio)}
  for(const sg of [-1,1]){const fp=W_(sg,1,260);E(sg*11,-13+fp,2.4,4,OL);E(sg*11,-13+fp,1.8,3.4,bdL)}
  BLOB(0,-13+br,10.5,8,bd,bdD,bdL);
  const op=dm?0:(o.expose?1:(o.open||0)),gap=3.4+op*1.8+(still?0:Math.max(0,Math.sin(T/500))*.8),my=-11+br;
  E(0,my,8.4,gap+.8,OL);E(0,my,7.8,gap,'#200410');
  GL(0,my,5,lure,.35+op*.6);
  for(let a=-7;a<=7;a+=2){const L=3+((a+9)%3);FANG(a,Math.round(my-gap),L,'#e8f4ff',1)}
  for(let a=-6;a<=6;a+=2){const L=2+((a+8)%3);FANG(a,Math.round(my+gap),L,'#c9dcf0',-1)}
  for(let a=-5;a<=5;a+=3)FANG(a,Math.round(my-gap+1),1,'#8aa8c8',1);
  beastCore(K,o,t,0,my+.5,1.8,lure,'#4a0a20','heart');
  for(const [a,b] of [[-8,-17],[8,-17],[-10,-12],[10,-12],[-7,-7],[7,-7]]){const p=still?.7:.5+.5*Math.sin(t/400+a*b);E(a,b+br,.7,.7,_bMix(bdD,bio,p))}
  for(const sg of [-1,1]){const bl=blink(sg*3)||dm;E(sg*4,-19+br,1.2,1,OL);if(!bl)F(sg*4,-19+br,1,1,'#ffffff')}
  const sw=W_(0,2,600),lx=-3+sw,ly=-28+br;LN(0,-20+br,-2,-25+br,1,bdD);LN(-2,-25+br,lx,ly+1,1,bdD);GL(lx,ly,3.5,lure,1);E(lx,ly,1.4,1.4,lure);F(lx,ly,1,1,'#ffffff');
  beastEyeGlow(K,o,0,hy+1);break}
 /* ───── 18 재의 유령: 찢긴 망토, 불타는 두 눈, 가슴 속 잿불 심장 ───── */
 case 18:{const cl='#4a4a52',clD='#1e1e22',clL='#8a8a94',em='#ff8a3a';
  const fl3=still?0:t/260;
  for(let i=-8;i<=8;i+=2){const len=4+((i+10)*7%5)+(still?0:Math.round(Math.sin(fl3+i)*1.5)),a=.9-Math.abs(i)/16;FA(i,-7,2,len,i%4?clD:cl,a*.8);FA(i,-7+len,1,1,clL,.35)}
  E(0,-12+br,8,6.5,OL);E(0,-12+br,7.3,6,clD);E(-.5,-12.5+br,6.4,5.2,cl);
  for(let i=-5;i<=5;i+=3)LN(i,-16+br,i*1.3,-7+br,1,clD);
  for(let j=-15;j<=-7;j++){const w=Math.max(.6,2-Math.abs(j+11)*.35)+((j*7)%3===0?.6:0);F(Math.round(-w),j+br,Math.round(w*2),1,'#0e0808')}GL(0,-11+br,4,em,.6);beastCore(K,o,t,0,-11+br,1.5,em,'#3a1408','heart');
  if(!dm&&!o.expose&&!(o.open>0)){const fk=still?0:Math.round(Math.sin(t/90));E(0,-11+br,2,2.6,'#7a1a08');E(0,-10.6+br,1.5,1.9,em);E(0,-10.2+br,.8,1+fk*.3,'#ffe08a')}
  const hy2=-19+br;E(0,hy2,5,4.5,OL);E(0,hy2,4.3,3.9,cl);E(-.8,hy2-.8,3,2.4,clL);E(0,hy2+.8,3,3,'#050505');
  if(!dm){const fk=still?1:.75+.25*Math.sin(t/60);E(-1.3,hy2+.5,.8,.9*fk,em);E(1.3,hy2+.5,.8,.9*fk,em);GL(-1.3,hy2+.5,2.6,em,.8);GL(1.3,hy2+.5,2.6,em,.8)}
  for(const sg of [-1,1]){LN(sg*6,-16+br,sg*8,-13+br,1,clD)}
  if(!still)for(let i=0;i<6;i++){const ph=((T/1800)+i*.17)%1;FA(Math.round(Math.sin(i*1.7+ph*4)*7),Math.round(-8-ph*18+br),1,1,i%2?em:'#ffd08a',(1-ph)*.9)}
  beastEyeGlow(K,o,0,hy2+.5);break}
 /* ───── 19 태초의 굶주림: 눈과 입으로 뒤덮인 살덩이, 중앙의 거대한 눈 ───── */
 case 19:{const fsh='#4a1a2a',fD='#1a0a12',fL='#8a3a52',vein='#ff3a5d',iris='#b83aff',bn='#e8d8c8';
  for(const [a,w] of [[-7,4],[0,5],[7,4]]){const sw=W_(a,1,380);E(a+sw*.3,-3,w*.6+.5,3.6,OL);E(a+sw*.3,-3,w*.6,3,fD);F(a-1,0,3,1,fL)}
  for(const sg of [-1,1]){LN(sg*6,-18+br,sg*9,-22+br,2,'#5a4a3a');LN(sg*9,-22+br,sg*12,-24+br,1,bn);LN(sg*9,-16+br,sg*12,-18+br,1,'#5a4a3a');F(sg*13,-19+br,1,1,bn)}
  const tw=W_(1,3,280);LN(-9,-6,-13,-4+tw*.3,2,fD);LN(-13,-4,-15+tw*.5,-9,1,fL);
  BLOB(0,-12+br,11,8.5,fsh,fD,fL);
  for(const [a0,b0,a1,b1] of [[-9,-8,-4,-14],[8,-9,4,-15],[-5,-4,-2,-8],[6,-5,3,-8]]){const p=still?.6:.4+.4*Math.max(0,Math.sin(t/200));LN(a0,b0+br,a1,b1+br,1,_bMix(fD,vein,p))}
  for(let i=-8;i<=8;i+=2)F(i,-21+br+(i%4?1:0),1,2,bn);
  const ex=!dm&&o.expose,op=dm?0:(ex?1:(o.open||0)),lidOpen=Math.max(op,still?0:Math.max(0,Math.sin(t/900))*.25);
  const eyR=4.2;E(0,-11.5+br,eyR+1.2,3.4+1.2,OL);
  if(lidOpen>.05){const ih=3.4*Math.min(1,lidOpen*1.4+.2);E(0,-11.5+br,eyR,ih,'#f8e8f0');E(0,-11.5+br,2.2,Math.min(ih,2.2),ex&&Math.floor(t/70)%2?'#ffffff':iris);F(0,Math.round(-13+br),1,3,OL);GL(0,-11.5+br,6,iris,.4+op*.5)}
  else{E(0,-11.5+br,eyR,3.4,fL);F(-4,Math.round(-11.5+br),9,1,OL);for(let a=-3;a<=3;a+=2)F(a,Math.round(-11+br),1,1,bn)}
  if(ex){E(0,-11.5+br,1.2,1.2,'#ffffff')}
  for(const [a,b,r,s] of [[-7,-15,1,1],[6,-16,1.1,2],[-3,-18,.8,3],[3,-19,.8,4],[-9,-11,.9,5],[9,-11,.9,6],[0,-19,1,7],[-6,-6,.7,8],[7,-6,.7,9]]){const bl=blink(s)||dm;E(a,b+br,r+.5,r+.5,OL);if(bl)F(Math.round(a-r),Math.round(b+br),Math.round(2*r)+1,1,fL);else{E(a,b+br,r,r,'#fff0f4');F(Math.round(a),Math.round(b+br),1,1,o.eye>0?'#ff4d6d':iris)}}
  for(const sg of [-1,1]){const mo=still?0:Math.max(0,Math.round(Math.sin(t/260+sg*2)*1.5));E(sg*7,-9+br,2.2,1+mo*.6,OL);if(mo>0){F(sg*7-2,Math.round(-9-mo*.5+br),1,1,bn);F(sg*7,Math.round(-9-mo*.5+br),1,1,bn);F(sg*7+1,Math.round(-9+mo*.5+br),1,1,bn)}}
  const bm=-5+br,bgap=1.4+(still?0:Math.max(0,Math.sin(t/340)*1.4));E(0,bm,5.4,bgap+1,OL);E(0,bm,4.8,bgap+.3,'#2a0412');for(let a=-4;a<=4;a+=2)FANG(a,Math.round(bm-bgap-.3),2+(a%4?0:1),bn,1);for(let a=-3;a<=3;a+=2)FANG(a,Math.round(bm+bgap+.3),2,bn,-1);
  if(!dm)GL(0,-12+br,12,vein,.12+pul*.2);
  beastEyeGlow(K,o,0,-19+br);break}
 }
}
/* 괴수 팔: 살덩이 촉수/뼈/거미다리 + 보스별 전용 손 */
function drawBeastHand(c,B,h,sx,sy,t,dorm,sc){sc=sc||1;const bid=BOSSES.indexOf(B),P_=B.pal,q=Math.max(1,2*sc);
 const hx=Math.round(h.x),hy=Math.round(h.y),K=beastKit(c,hx,hy,q,{dorm},t),{F,FA,E,EA,BLOB,LN,GL,W_,FANG,cc}=K;
 const OL='#0a0a0c';
 // 팔: 어깨→손, 화면 좌표에서 굵기가 줄어드는 곡선 살덩이
 const limbCol={10:['#2b1d10','#5a3f26'],11:['#3a5a1a','#7aa83a'],12:['#16241d','#2e4d3f'],13:['#6b5f45','#e8e2c8'],14:['#231226','#5a2e5e'],15:['#0a0a0a','#2a2a2a'],16:['#231230','#5a2e6e'],17:['#0c1a2c','#1a3a5e'],18:['#1e1e22','#4a4a52'],19:['#1a0a12','#4a1a2a']}[bid]||['#111','#333'];
 const n=Math.max(4,Math.ceil(Math.hypot(hx-sx,hy-sy)/(3*sc))),nx=-(hy-sy),ny=hx-sx,nl=Math.hypot(nx,ny)||1;
 const wig=bid===13||bid===14||bid===15?0:(K.still?0:1);
 for(let pass=0;pass<2;pass++)for(let i=0;i<=n;i++){const k=i/n,off=wig*Math.sin(k*Math.PI)*Math.sin(t/240+k*5+bid)*5*sc,px=sx+(hx-sx)*k+nx/nl*off,py=sy+(hy-sy)*k+ny/nl*off,w=Math.max(2,Math.round((bid===14||bid===15?2.2:5.5-k*2.5)*sc))+(pass?0:2);
  if(bid===18){c.globalAlpha=pass?.45*(1-k*.3):.2}
  c.fillStyle=cc(pass?(i%3===0?limbCol[0]:limbCol[1]):OL);c.fillRect(Math.round(px-w/2),Math.round(py-w/2),w,w);c.globalAlpha=1}
 if(bid===13||bid===14||bid===15){const mx=(sx+hx)/2,my=(sy+hy)/2-4*sc;c.fillStyle=cc(bid===13?'#fffaf0':'#8a4e90');c.fillRect(Math.round(mx-2*sc),Math.round(my-2*sc),Math.round(4*sc),Math.round(4*sc))}
 // 손: 로컬 단위(q px) 좌표, (0,0)=손 중심
 switch(bid){
 case 10:{BLOB(0,0,3,2.6,'#5a3f26','#2b1d10','#8a6a42');for(const [a,b,dx] of [[-2,2,-1],[0,2,0],[2,2,1]]){LN(a,b,a+dx,b+3,1,'#2b1d10');F(a+dx*2,b+4,1,1,'#d8c89a')}E(-1,-2,1.2,.8,'#5f8f2f');break}
 case 11:{const p=K.still?.5:.5+.5*Math.sin(t/260);BLOB(0,0,3,3,'#7a4f9a','#3a2350','#b98ad6');E(0,0,1.6+p*.5,1.6+p*.5,_bMix('#7aa83a','#caff6b',p));GL(0,0,4,'#caff6b',.4+p*.3);if(!K.still)for(let i=0;i<3;i++){const ph=((t/900)+i*.33)%1;FA(Math.round(Math.sin(i*2)*3),Math.round(-3-ph*5),1,1,'#caff6b',1-ph)}break}
 case 12:{BLOB(0,0,3,2.4,'#2e4d3f','#16241d','#4f7a62');for(const a of [-3,0,3]){LN(0,1,a,4,1,'#16241d');E(a,4,.9,.7,'#8fbfa6')}EA(0,3,3,1,'#4f7a62',.6);if(!K.still){const ph=(t/800)%1;F(1,Math.round(4+ph*4),1,1,'#7fc9a0')}break}
 case 13:{BLOB(0,0,2.8,2.2,'#e8e2c8','#b3aa8c','#fffaf0');for(const a of [-3,-1,1,3]){LN(a,1,a+(a>0?1:-1),4,1,'#e8e2c8');F(a+(a>0?1:-1),5,1,1,'#6b5f45')}E(-1,-.5,.6,.6,'#6b5f45');E(1,-.5,.6,.6,'#6b5f45');break}
 case 14:{E(0,0,1.8,1.8,OL);E(0,0,1.2,1.2,'#5a2e5e');LN(0,1,2,5,1,'#231226');LN(2,5,1,7,1,'#e8d6ee');F(1,7,1,1,'#ffffff');if(!K.still)FA(0,Math.round(2+(t/300)%4),1,3,'#ffffff',.4);break}
 case 15:{BLOB(0,-1,2.4,2,'#ffcf3a','#8a6a10','#fff0a0');const mo=K.still?1:1+Math.round(Math.abs(Math.sin(t/140)));LN(-1,1,-1-mo,5,1,'#1a1a1a');LN(1,1,1+mo,5,1,'#1a1a1a');F(-1-mo,5,1,1,'#ffe79a');F(1+mo,5,1,1,'#ffe79a');for(const a of [-2,0,2])F(a,-1,1,1,'#1a1a1a');break}
 case 16:{BLOB(0,0,2.6,2.2,'#5a2e6e','#231230','#8a4a9e');for(const [a,l] of [[-2,3],[0,4],[2,3]]){for(let i=0;i<l;i++)F(a+(i>1?(a>0?1:a<0?-1:0):0),1+i,1,1,i===l-1?'#e8fbff':'#7de0ff')}GL(0,3,3,'#7de0ff',.4);break}
 case 17:{BLOB(0,0,2.6,2.6,'#1a3a5e','#0c1a2c','#3a6a9e');for(let i=0;i<4;i++){const a=i/4*TAU+(K.still?0:t/700);E(Math.cos(a)*1.6,Math.sin(a)*1.6,.5,.5,'#7ab8f0')}const lp=K.still?1:.6+.4*Math.sin(t/200);GL(0,0,4,'#ff5d8f',.6*lp);E(0,0,.9,.9,'#ff5d8f');break}
 case 18:{c.globalAlpha=.8;E(0,0,2.4,2,'#8a8a94');c.globalAlpha=1;const fk=K.still?0:Math.round(Math.sin(t/90));for(const a of [-3,-1,1,3]){LN(a*.7,1,a,5+(a===1?fk:0),1,'#c8c8d0')}GL(0,0,4,'#ff8a3a',.45);E(0,0,.9,.9,'#ff8a3a');break}
 case 19:{const mo=K.still?1:Math.max(0,Math.round(Math.sin(t/220)*2)+1);BLOB(0,0,3,3,'#4a1a2a','#1a0a12','#8a3a52');E(0,1,2.4,mo*.7+.4,OL);E(0,1,2,mo*.6,'#2a0412');if(mo>0){for(const a of [-2,0,2]){F(a,Math.round(1-mo*.6),1,1,'#e8d8c8');F(a-1,Math.round(1+mo*.6)-1,1,1,'#e8d8c8')}}E(-1,-2,.8,.8,'#fff0f4');F(-1,-2,1,1,'#b83aff');break}
 default:{BLOB(0,0,3,3,P_[0],P_[1],P_[2])}
 }
 if(h.charge>0){EA(0,6,1+h.charge*3,1+h.charge*3,'#ffb0bd',.8)}
 if(h.stuck){c.fillStyle='#0b0f11';c.fillRect(hx-12*sc,hy+9*sc,24*sc,3*sc);if(Math.floor(t/120)%2){c.fillStyle='#ffe79a';c.fillRect(hx-10*sc,hy-10*sc,3,3)}}
}
/* 챕터 2 던전 잡몹: 보스의 생태계를 따라가는 10종의 괴물 */
function drawMob2(ci,X,Y,now,mb,alert,dir){const K=beastKit(ctx,X,Y-2,3,{},now),{F,FA,E,EA,BLOB,LN,GL,blink,FANG,SHARD}=K,OL='#0a0a0c',s=mb.seed,t=now;
 const step=Math.sin(now/(alert?70:120)+s),st=Math.round(step),hop=Math.round(Math.abs(step)*(alert?2:1)),ey=alert?'#ff4d6d':null;
 EA(0,4,4,1,'#000000',.22);
 switch(ci){
 case 10:{for(const sg of [-1,1])LN(sg*1,2,sg*(2+(sg*st>0?1:0)),4,1,'#2b1d10');BLOB(0,-1-hop,3.2,3.2,'#5a3f26','#2b1d10','#8a6a42');LN(-3,-1-hop,-5,-3-hop+st,1,'#2b1d10');LN(3,-1-hop,5,-3-hop-st,1,'#2b1d10');LN(0,-4-hop,1,-7-hop,1,'#2b1d10');E(2,-7-hop,1.3,.8,'#6a9a32');
  F(-2,-2-hop,1,1,ey||'#9bff5a');F(1,-2-hop,1,1,ey||'#9bff5a');GL(-1,-2-hop,2.5,ey||'#9bff5a',.5);F(-1,0-hop,3,1,OL);FANG(-1,0-hop,1,'#efe3b8',1);FANG(1,0-hop,1,'#efe3b8',1);break}
 case 11:{const sq=hop;F(-1,1,3,3-sq*.5,'#d8c4e8');F(-2,1,1,2,'#8a70a0');E(0,-2-sq,4.5,2.4,OL);E(0,-2-sq,3.8,1.8,'#7a4f9a');E(-1,-3-sq,2,.8,'#b98ad6');for(const a of [-3,2])F(a,-2-sq,1,1,'#caff6b');
  const bl=blink(s);E(0,-1-sq,1.4,1,OL);if(!bl)F(0,-1-sq,1,1,ey||'#caff6b');if(Math.floor(now/200+s)%4===0)FA(Math.round(Math.sin(now/300+s)*3),-6-sq,1,1,'#caff6b',.8);break}
 case 12:{BLOB(0,0-hop,4,2.8,'#2e4d3f','#16241d','#4f7a62');E(0,1-hop,3,1,'#8fbfa6');for(const sg of [-1,1]){E(sg*2,-3-hop,1.4,1.3,OL);F(sg*2,-3-hop,1,1,ey||'#ffe07a')}const mo=alert?1:0;F(-3,0-hop,7,1+mo,OL);FANG(-2,0-hop,1,'#eaf6ee',1);FANG(0,0-hop,1,'#eaf6ee',1);FANG(2,0-hop,1,'#eaf6ee',1);for(const sg of [-1,1])F(sg*4+(sg*st>0?sg:0),3,2,1,'#16241d');break}
 case 13:{for(let i=0;i<3;i++)for(const sg of [-1,1]){const ph=Math.round(Math.sin(now/90+s+i*2+sg));LN(sg*1,0,sg*(3+i*.6),2+(i===1?ph:0),1,'#b3aa8c')}E(0,-1-hop,3.2,2.6,OL);E(0,-1-hop,2.6,2,'#e8e2c8');F(-1,1-hop,3,2,'#e8e2c8');F(-1,2-hop,1,1,OL);F(1,2-hop,1,1,OL);
  for(const sg of [-1,1]){F(sg-(sg>0?0:1),-2-hop,2,1,'#140e08');F(sg>0?1:-1,-2-hop,1,1,'#ff3b3b')}GL(0,-2-hop,3,'#ff3b3b',alert?.7:.4);LN(3,0-hop,6,-2-hop+st,1,'#b3aa8c');break}
 case 14:{for(let i=0;i<4;i++)for(const sg of [-1,1]){const ph=Math.round(Math.sin(now/70+s+i*1.7+sg*1.3));LN(sg*1,0,sg*(3+i*.5),-2+i+ph,1,'#7a3e80');LN(sg*(3+i*.5),-2+i+ph,sg*(4+i*.6),3,1,'#7a3e80')}BLOB(0,-1,2.6,2.2,'#5a2e5e','#231226','#8a4e90');E(0,2,2,1.6,'#231226');F(0,2,1,1,'#ff3a6a');
  for(const [a,b] of [[-1,-2],[1,-2],[-2,-1],[2,-1]])F(a,b,1,1,ey||'#ff3a6a');break}
 case 15:{const wf=Math.floor(now/35)%2;for(const sg of [-1,1]){EA(sg*3,-4+wf,2.8,1.4,'#e8f4ff',.5)}for(let i=0;i<3;i++)E(0,1+i*1.2,1.8-i*.4,.8,i%2?'#1a1a1a':'#ffcf3a');F(0,4,1,1,'#ffe79a');BLOB(0,-2,2,1.8,'#1a1a1a','#0a0a0a','#3a3a3a');E(0,-4,1.8,1.4,'#ffcf3a');
  for(const sg of [-1,1])F(sg>0?1:-2,-4,1,1,ey||'#241a08');LN(-1,-5,-2,-7,1,'#1a1a1a');LN(1,-5,2,-7,1,'#1a1a1a');break}
 case 16:{for(let i=-3;i<=3;i+=2)F(i+(i%4?st:-st)*.5|0,3,1,1,'#231230');BLOB(0,0,3.6,2.6,'#5a2e6e','#231230','#8a4a9e');SHARD(1,-2,-1.3,5,1.2,'#9ff0ff','#2a7a9a','#5ac8e8');SHARD(-2,-1,-2,3,.8,'#9ff0ff','#2a7a9a','#5ac8e8');GL(1,-6,2.5,'#9ff0ff',.5);
  const bl=blink(s);E(-1,0,1,1,OL);if(!bl)F(-1,0,1,1,ey||'#fff4ff');break}
 case 17:{const fl=Math.round(Math.sin(now/100+s)*1.2);E(-4+(dir>0?0:0),0,1.4,1.8+fl*.3,'#0c1a2c');BLOB(0,-1,3.8,3,'#1a3a5e','#0c1a2c','#3a6a9e');E(1*dir,0,2.6,1.4,OL);E(1*dir,0,2.2,1,'#200410');for(let a=-1;a<=3;a+=2){FANG(a*dir,-1,1,'#e8f4ff',1);FANG(a*dir,1,1,'#c9dcf0',-1)}
  F(-1*dir,-3,1,1,ey||'#ffffff');LN(0,-4,-2*dir,-7,1,'#0c1a2c');E(-2*dir,-7,.9,.9,'#ff5d8f');GL(-2*dir,-7,3,'#ff5d8f',.7);break}
 case 18:{for(let i=-2;i<=2;i++){const len=2+((i+3)*3%3)+Math.round(Math.sin(now/120+i+s));FA(i,1,1,len,'#4a4a52',.6)}E(0,-2-hop,3,3,OL);E(0,-2-hop,2.5,2.5,'#4a4a52');E(-.5,-2.5-hop,1.6,1.4,'#8a8a94');E(0,-1.5-hop,1.6,1.6,'#050505');
  F(-1,-2-hop,1,1,'#ff8a3a');F(1,-2-hop,1,1,'#ff8a3a');GL(0,-2-hop,4,'#ff8a3a',alert?.8:.5);if(Math.floor(now/150+s)%3===0)FA(Math.round(Math.sin(now/200+s)*2),-6-hop,1,1,'#ffd08a',.8);break}
 case 19:{for(let i=0;i<4;i++){const a=i/4*Math.PI+.4+Math.sin(now/150+i+s)*.3;LN(0,1,Math.round(Math.cos(a)*5),Math.round(1+Math.sin(a)*3),1,'#4a1a2a')}BLOB(0,-2-hop,3.6,3.4,'#f8e8f0','#c8a0b0','#ffffff');LN(-3,-1-hop,-1,-3-hop,1,'#ff3a5d');LN(3,-3-hop,1,-2-hop,1,'#ff3a5d');
  const bl=blink(s);E(dir,-2-hop,1.6,1.6,bl?'#c8a0b0':'#b83aff');if(!bl)F(dir,-3-hop,1,2,OL);if(alert)GL(0,-2-hop,4,'#ff3a5d',.5);break}
 }
}
/*ROBOT_BEGIN*/
