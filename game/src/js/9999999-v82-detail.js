/* ================= v82 디테일 패스 (ND82): 새 펫 15 손그림 · 새 캐릭터 음영 · 소품 · 새 무기 칼날 무늬 =================
   ① 새 펫(PETS 10~24): 9×9 도트 대신 300(펫 v3)과 같은 방식(외곽선 → 바탕 → 밝은 면 → 그늘 → 눈 반짝임)으로 하나씩 그림.
      날개 · 꼬리 · 촉수 · 불씨처럼 움직이는 부분, 눈 깜빡임, 방향 뒤집기. 변이 스킨도 이 그림을 바탕으로 색만 바꿈.
   ② 새 캐릭터(CHARS 10~24): 몸통 좌우 음영 · 옷 주름 · 단 · 머리 결 · 앞머리 그늘 + 캐릭터마다 소품 하나(화살통 · 약초 주머니 · 망치 …).
   ③ 새 무기(칼날형 5종): 칼날 가운데 홈 · 빛나는 날 · 무늬. */
(()=>{try{
 const NG=window.NG82;if(!NG)return;const P0=NG.P0,C0=NG.C0;
 const sh=(c,k)=>{try{return shade(c,k)}catch(e){return c}},mx=(a,b,t)=>{try{return mixc(a,b,t)}catch(e){return a}};
 /* ---------- ① 새 펫 ---------- */
 function petHelpers(c,x,y,now,k,id){const t=now/1000,fl=!!(typeof P!=='undefined'&&P&&P.face&&P.face.x<0),d=fl?-1:1,bob=Math.sin(now/260+id)*1.2;y+=bob*k;
  const Px=(xx,yy,w,h,col,al)=>{if(al!=null)c.globalAlpha=al;c.fillStyle=col;c.fillRect(Math.round(x+(d<0?-(xx+w):xx)*k),Math.round(y+yy*k),Math.max(1,Math.round(w*k)),Math.max(1,Math.round(h*k)));if(al!=null)c.globalAlpha=1};
  const Ci=(xx,yy,r,col,al)=>pcirc(x+d*xx*k,y+yy*k,r*k,col,al==null?1:al,c);
  const El=(xx,yy,rx,ry,col,al)=>{const cx=x+d*xx*k,cy=y+yy*k,RX=rx*k,RY=ry*k;if(al!=null)c.globalAlpha=al;c.fillStyle=col;for(let j=-RY;j<RY;j++){const w=RX*Math.sqrt(Math.max(0,1-((j+.5)/RY)**2));c.fillRect(Math.round(cx-w),Math.round(cy+j),Math.max(1,Math.round(w*2)),1)}if(al!=null)c.globalAlpha=1};
  const Pg=(pts,col,al)=>{if(al!=null)c.globalAlpha=al;c.fillStyle=col;c.beginPath();pts.forEach(([a,b],i)=>{const X=x+d*a*k,Y=y+b*k;i?c.lineTo(X,Y):c.moveTo(X,Y)});c.closePath();c.fill();if(al!=null)c.globalAlpha=1};
  const OL='#12161c',blink=Math.floor(now/140+id*7)%28===0;
  const eye=(xx,yy,col,big)=>{if(blink){Px(xx-.8,yy,2,1,OL);return}const r=big?1.5:1.1;Ci(xx,yy,r+.3,OL);Ci(xx,yy,r,col||'#1a1a24');Px(xx-r*.6,yy-r*.7,.9,.9,'#ffffff');Px(xx+r*.2,yy+r*.1,.5,.5,'#ffffff',.6)};
  /* 몸통: 외곽선 → 바탕 → 아래 그늘 → 위 빛 */
  const body=(xx,yy,rx,ry,col)=>{El(xx,yy,rx+.7,ry+.7,OL);El(xx,yy,rx,ry,col);El(xx,yy+ry*.35,rx*.85,ry*.55,sh(col,.8),.55);El(xx-rx*.25,yy-ry*.4,rx*.5,ry*.3,sh(col,1.3),.7)};
  El(0,10.5,5,1.2,'#000',.25);return {t,Px,Ci,El,Pg,eye,body,OL,d}}
 const PD=[
  /* 약초 거북 */(H)=>{const {t,Px,Ci,El,Pg,eye,body,OL}=H,step=Math.sin(t*4);
   for(const [a,s] of [[-5,1],[4,-1]]){Px(a,5+(s*step>0?-.6:0),2.6,3,OL);Px(a+.3,5.3+(s*step>0?-.6:0),2,2.5,'#7ac86a')}
   El(0,2,8,5.6,OL);El(0,2,7.3,5,'#8a6a42');El(0,3.6,6.4,2.4,'#5a4028');for(const [a,b] of [[-3.5,0],[0,-1.5],[3.5,0],[-1.8,2.6],[1.8,2.6]]){Ci(a,b,1.8,'#6a5030');Ci(a-.3,b-.4,1.2,'#a8845a')}
   Px(-7.5,4.5,15,1,'#3a2a18');El(8.2,1.5,3,2.6,OL);El(8,1.5,2.4,2,'#7ac86a');El(7.6,.8,1.2,.8,'#b0f0a0');eye(8.6,1,'#1a2a1a');Px(9.8,2.6,1,.5,'#2a5a2a');
   /* 등에 난 약초 */for(let i=0;i<3;i++){const sw=Math.sin(t*2+i)*.6;Pg([[-2+i*2,-3],[-1+i*2+sw,-7.5],[i*2,-3]],i%2?'#b6ff4a':'#5ad07a')}Ci(sw0(t),-8,1,'#ff9ad0')},
  /* 전기 다람쥐 */(H)=>{const {t,Px,Ci,El,Pg,eye,body}=H,tw=Math.sin(t*6)*1.2;
   for(let i=0;i<7;i++){const q=i/6;Ci(-6-q*2+Math.sin(q*3+t*3)*.6,3-q*9+tw*q,2.8-q*.6+(i%2?.3:0),i>4?'#ffe9a0':'#e8b84a')}Ci(-8,-6+tw,1.6,'#fff6c0');
   body(0,3,4.6,4.2,'#e8b84a');El(.8,4.6,2.6,2.2,'#fff0d0');
   Ci(2,-2.6,3.6,'#12161c');Ci(2,-2.6,3,'#e8b84a');Ci(1.2,-3.6,1.4,'#ffd884');for(const s of [-.6,2.8]){Pg([[s,-5],[s+1,-8],[s+2,-5]],'#12161c');Pg([[s+.4,-5.2],[s+1,-7.2],[s+1.6,-5.2]],'#c8902a')}
   eye(3.2,-2.8,'#1a1a24',1);Ci(5,-1.6,.6,'#3a2a1a');Px(4,-1,1.4,.5,'#c8701a');Px(-1,-1,1.4,.7,'#ff9aa8',.6);
   Px(-2,6.6,1.6,2,'#c8902a');Px(1.6,6.6,1.6,2,'#c8902a');if(Math.floor(t*6)%3===0)for(let i=0;i<3;i++)Px(-9+Math.random()*4,-8+Math.random()*10,.8,1.6,'#8de4ff')},
  /* 아기 골렘 */(H)=>{const {t,Px,Ci,El,Pg,eye}=H,st=Math.sin(t*3)*.4;
   for(const s of [-1,1]){Px(s*6.4-1.5,-1+st*s,3.2,6,'#12161c');Px(s*6.4-1.1,-.6+st*s,2.4,5.2,'#9a8a70');Px(s*6.4-1.1,4,2.4,1.2,'#6a5a48')}
   Px(-5,-6,10,12,'#12161c');Px(-4.5,-5.5,9,11,'#9a8a70');Px(-4.5,-5.5,9,1.6,'#c8b898');Px(-4.5,4,9,1.5,'#6a5a48');Px(-4.5,-5.5,1.3,11,'#b8a888');
   for(const [a,b,w] of [[-3,-1,3],[1,2,2.5],[-1,3.5,2]])Px(a,b,w,.5,'#5a4a38');Px(2,-4,.5,3,'#5a4a38');
   Pg([[-2,-6],[-1,-9],[0,-6]],'#5aa02a');Pg([[0,-6],[1.5,-8.5],[2,-6]],'#7ad85a');
   for(const s of [-1.8,1.8]){Ci(s,-2,1.3,'#3a2a1a');Ci(s,-2,.9,'#ffb040');Px(s-.4,-2.6,.6,.6,'#fff0c0')}Px(-1.5,1,3,.8,'#3a2a1a');
   Px(-4,6,3,3,'#12161c');Px(1,6,3,3,'#12161c');Px(-3.6,6.3,2.2,2.3,'#7a6a5a');Px(1.4,6.3,2.2,2.3,'#7a6a5a')},
  /* 독침 벌 */(H)=>{const {t,Px,Ci,El,Pg,eye,body}=H,fw=Math.sin(t*30)>0;
   for(const s of [-1,1]){El(s*2.5,fw?-6:-4.5,3.6,2.2,'#dff6ff',.55);El(s*2.5,fw?-6:-4.5,2.6,1.3,'#ffffff',.55)}
   El(-3.5,2.6,4.6,3.8,'#12161c');El(-3.5,2.6,4,3.2,'#ffd84a');for(const x of [-5.5,-3.2,-1])Px(x,-.5,1.2,6.2,'#2a2a1a');El(-4.5,1,1.6,1,'#fff6c0',.7);
   Pg([[-7.5,2.4],[-10.5,3.4],[-7.5,4]],'#12161c');Pg([[-7.8,2.8],[-10,3.4],[-7.8,3.7]],'#8aff5a');Ci(-10.4,3.4,.6,'#c8ff8a',.6+.4*Math.sin(t*8));
   Ci(2.5,0,3.2,'#12161c');Ci(2.5,0,2.6,'#ffd84a');Ci(1.8,-.8,1,'#fff0a0');eye(3.6,-.3,'#1a1a24',1);
   for(const s of [-1,1]){Px(2+s*.8,-4,.5,2,'#12161c');Ci(2+s*1.2,-4.4,.6,'#2a2a1a')}Px(-4,6,1,2,'#2a2a1a');Px(-2,6,1,2,'#2a2a1a')},
  /* 불씨 도마뱀 */(H)=>{const {t,Px,Ci,El,Pg,eye}=H,wag=Math.sin(t*5)*1.4;
   for(let i=0;i<6;i++){const q=i/5;Ci(-5-q*5,3+q*wag*.8-q*1.5,2.2-q*1.4,'#12161c');Ci(-5-q*5,3+q*wag*.8-q*1.5,1.7-q*1.2,'#e85a2a')}
   for(let i=0;i<4;i++){const ph=(t*1.6+i/4)%1;Ci(-10.5+Math.sin(i+t*4)*.6,1.5+wag*.8-ph*6,1.1*(1-ph)+.3,ph<.4?'#ffe36b':'#ff7a2a',1-ph)}
   El(0,3,5.6,3.4,'#12161c');El(0,3,5,2.8,'#e85a2a');El(0,4.4,4,1.2,'#ffb070');for(let i=0;i<4;i++)Px(-3+i*1.8,1.2,.8,.8,'#a02a10');
   El(5.6,1.6,3,2.4,'#12161c');El(5.4,1.6,2.5,1.9,'#ff6a3a');eye(6,.8,'#ffe36b',1);Px(7.5,2.6,1.4,.5,'#7a1a08');
   for(const [a,s] of [[-3,1],[2.5,-1]]){const lift=Math.max(0,Math.sin(t*6)*s);Px(a,5.6-lift,1.4,2.4,'#12161c');Px(a+.2,5.8-lift,1,2,'#c8401a')}Pg([[-2,0],[-1,-2],[0,0],[1,-2.4],[2,0]],'#ffd166')},
  /* 눈송이 요정 */(H)=>{const {t,Px,Ci,El,Pg,eye}=H,fw=Math.sin(t*10);
   for(const s of [-1,1]){Pg([[0,0],[s*8,-6+fw],[s*9,0],[s*6,4]],'#bfe8ff',.5);Pg([[0,0],[s*6,-4+fw],[s*6.5,0]],'#ffffff',.55)}
   El(0,2.8,3,4.2,'#8a9aac');El(0,2.8,2.4,3.6,'#ffffff');El(-.6,1.6,1,1.6,'#e8f8ff');for(let i=0;i<3;i++)Px(-1.6+i*1.2,6,.8,1.4,'#bfe8ff');
   Ci(0,-3,3.2,'#8a9aac');Ci(0,-3,2.7,'#fff8f4');Ci(-.8,-3.8,1,'#ffffff');eye(-1.1,-2.8,'#4a8ab0');eye(1.2,-2.8,'#4a8ab0');Px(-2.2,-1.6,.9,.5,'#ffb0c8',.7);Px(1.4,-1.6,.9,.5,'#ffb0c8',.7);
   /* 눈꽃 왕관 */for(let i=0;i<5;i++){const a=-Math.PI/2+(i-2)*.45;Px(Math.cos(a)*3.6-.4,-3+Math.sin(a)*3.6-.4,.8,.8,'#bfe8ff')}Ci(0,-7.2,.9,'#ffffff');
   for(let i=0;i<3;i++){const ph=(t*.6+i/3)%1;Px(-6+i*6,-6+ph*14,1,1,'#ffffff',1-ph)}},
  /* 박쥐 쿠키 */(H)=>{const {t,Px,Ci,El,Pg,eye}=H,fl=Math.sin(t*12)*2;
   for(const s of [-1,1]){Pg([[s*2.5,-1],[s*10,-5+fl],[s*9,1+fl*.5],[s*7,-.5+fl*.4],[s*5.5,2],[s*3.5,1]],'#12161c');Pg([[s*3,-.6],[s*9,-4+fl],[s*8.3,.6+fl*.5],[s*6.6,-.2+fl*.4],[s*5.2,1.5],[s*3.6,.8]],'#5a2a7a')}
   Ci(0,0,4.2,'#12161c');Ci(0,0,3.6,'#7a4a9a');Ci(-1,-1,1.6,'#9a6aba');for(const s of [-1,1])Pg([[s*1.5,-3],[s*3,-6],[s*3.2,-2.6]],'#7a4a9a');
   /* 쿠키 무늬 배 */El(0,1.8,2.2,1.6,'#d8a060');for(const [a,b] of [[-.8,1.4],[.8,2.2],[.2,1]])Px(a,b,.6,.6,'#5a3018');
   eye(-1.4,-1,'#ff4d6d');eye(1.4,-1,'#ff4d6d');Px(-.8,.4,.5,.9,'#ffffff');Px(.4,.4,.5,.9,'#ffffff')},
  /* 시계 부엉이 */(H)=>{const {t,Px,Ci,El,Pg,eye,body}=H,hand=t*2;
   for(const s of [-1,1])Pg([[s*3,-6],[s*5,-9.5],[s*5.5,-5]],'#5a4028');body(0,1,5.6,6.4,'#8a6a42');El(0,3,3.6,3.6,'#e8d8b8');for(let i=0;i<3;i++)for(let j=0;j<2;j++)Px(-2+i*1.6,1.6+j*1.6+(i%2)*.6,.9,.6,'#c8a878');
   for(const s of [-1,1]){Ci(s*2.6,-2.6,2.8,'#12161c');Ci(s*2.6,-2.6,2.3,'#fff6e0');Ci(s*2.6,-2.6,.4,'#3a2a1a');Px(s*2.6-.15,-2.6-1.8,.3,1.8,'#3a2a1a');
    const a=hand*(s>0?1:12)/6;Px(s*2.6+Math.cos(a)*1.2-.25,-2.6+Math.sin(a)*1.2-.25,.5,.5,'#c8323a')}
   Pg([[-.8,-.6],[.8,-.6],[0,1]],'#ffb040');for(const s of [-1,1]){Px(s*5.6-.8,0,1.6,5,'#6a4a28');Px(s*5.6-.4,.6,.8,4,'#9a7a4a')}
   Px(-2.6,7,1.6,1.6,'#ffb040');Px(1,7,1.6,1.6,'#ffb040');Ci(0,-7.6,1,'#ffd166')},
  /* 행운 고양이 */(H)=>{const {t,Px,Ci,El,Pg,eye,body}=H,paw=Math.max(0,Math.sin(t*3))*2.5;
   Ci(-5.5,3+Math.sin(t*4),1.6,'#e8e0d8');body(0,3,5,4.4,'#ffffff');El(0,4.6,3,2,'#f4ece4');
   Px(3.6,-1-paw,2,4,'#12161c');Px(3.9,-.7-paw,1.4,3.4,'#ffffff');Ci(4.6,-1.6-paw,1.3,'#ffffff');Px(4.2,-2.2-paw,.4,.4,'#ffb0c8');
   Ci(0,-3,4,'#12161c');Ci(0,-3,3.4,'#ffffff');for(const s of [-1,1]){Pg([[s*1.4,-5.8],[s*3.4,-8.4],[s*3.8,-4.4]],'#12161c');Pg([[s*1.8,-5.6],[s*3.2,-7.4],[s*3.4,-4.8]],s<0?'#ff9a3a':'#3a3a3a')}
   Ci(-1.6,-3.6,1.2,'#ff9a3a',.85);eye(-1.4,-2.8,'#3a8a3a');eye(1.4,-2.8,'#c89a20');Px(-.4,-1.4,.8,.6,'#ff8aa0');Px(-2.6,-1.6,1,.4,'#ffb0c8',.6);
   Px(-2.6,0,5.2,.8,'#ff4d6d');Ci(0,1,1.1,'#ffd84a');Px(-.3,.8,.6,.6,'#c8961a');Ci(-4.6,6.4,1.8,'#ffd84a');Px(-5.2,6,1.2,.5,'#c8961a')},
  /* 방패 드론 */(H)=>{const {t,Px,Ci,El,Pg,eye}=H,sp=t*20;
   for(const s of [-1,1]){Px(s*6-2.5,-6,5,.8,'#6a7a8a');Px(s*6-.4,-6,.8,2.4,'#3a4a5a');const w=Math.abs(Math.sin(sp+s))*3+1;Px(s*6-w/2,-6.8,w,.6,'#dfe6ea',.8)}
   Pg([[-5,-3],[5,-3],[4,4],[0,7],[-4,4]],'#12161c');Pg([[-4.4,-2.5],[4.4,-2.5],[3.5,3.6],[0,6.2],[-3.5,3.6]],'#b8c4d4');Pg([[-4.4,-2.5],[0,-2.5],[0,6.2],[-3.5,3.6]],'#d8e0ec');
   Px(-.3,-2.5,.6,8.6,'#8a9aaa');Ci(0,.6,1.8,'#12161c');Ci(0,.6,1.3,'#5affd8');Ci(-.4,.2,.5,'#ffffff');
   Ci(0,.6,3.4+Math.sin(t*4)*.4,'#8de4ff',.15);Px(-3,-4.2,6,1.2,'#3a4a5a');Px(-2,-4,1,.8,'#ff4d6d',Math.floor(t*3)%2?1:.3)},
  /* 번개 해파리 */(H)=>{const {t,Px,Ci,El,Pg,eye}=H;
   for(let i=0;i<5;i++){const x0=-4+i*2;for(let j=0;j<5;j++){const w=Math.sin(t*4+i+j*.7)*.8;Px(x0+w-.3,2+j*1.4,.7,1.2,j%2?'#c8a8ff':'#8a6ae0',.85)}}
   El(0,-1,6,5,'#6a5a9a');El(0,-1,5.4,4.4,'#c8a8ff');El(0,.8,5,2,'#a888f0');El(-1.6,-3,2,1.4,'#f0e8ff',.8);for(let i=0;i<4;i++)Ci(-3+i*2,1.6,.6,'#8a6ae0');
   eye(-1.6,-1,'#1a1a3a');eye(1.6,-1,'#1a1a3a');Px(-.6,.4,1.2,.5,'#5a3aa0');
   if(Math.floor(t*7)%3===0){let x0=-5+Math.random()*10,y0=4;for(let i=0;i<3;i++){const nx=x0+(Math.random()-.5)*3;Px(Math.min(x0,nx),y0,Math.abs(nx-x0)+.6,1.4,'#fff6a0');x0=nx;y0+=1.4}}},
  /* 바람 매 */(H)=>{const {t,Px,Ci,El,Pg,eye}=H,fl=Math.sin(t*8)*2.4;
   for(const s of [-1,1]){Pg([[s*1.5,-1],[s*10,-4+fl],[s*9,0+fl*.6],[s*6,1.5],[s*2,2]],'#12161c');Pg([[s*2,-.6],[s*9,-3.4+fl],[s*8.2,.2+fl*.6],[s*5.6,1],[s*2.4,1.4]],'#8a6a42');for(let i=0;i<3;i++)Px(s*(4+i*1.6)-.3,-1.2+fl*.3*i,.6,2,'#5a4028')}
   El(0,2,3.4,4.6,'#12161c');El(0,2,2.8,4,'#8a6a42');El(0,3,1.8,2.6,'#f4f0e0');for(let i=0;i<3;i++)Px(-1+i*.8,2+i*.6,.6,.4,'#a08060');
   Ci(.5,-3,2.8,'#12161c');Ci(.5,-3,2.3,'#f4f6f8');eye(1.4,-3.2,'#ffb020');Pg([[2.4,-2.6],[4.6,-2],[2.6,-1.2]],'#ffd166');Px(3,-2.2,1.4,.4,'#c8961a');
   Pg([[-1,6],[0,9],[1,6]],'#5a4028');for(let i=0;i<3;i++){const ph=(t*1.4+i/3)%1;Px(-9+ph*18,-7+i*3,3,.5,'#c8ffd8',(1-ph)*.7)}},
  /* 맹독 뱀 */(H)=>{const {t,Px,Ci,El,Pg,eye}=H;
   for(let i=0;i<10;i++){const q=i/9,x=-5+q*8+Math.sin(t*3+q*6)*1.6,y=7-q*9;Ci(x,y,2.4-q*.5,'#12161c');Ci(x,y,1.9-q*.5,'#5aa02a');if(i%2)Ci(x,y-.6,.7,'#ffd84a')}
   El(4,-3.4,3.2,2.4,'#12161c');El(4,-3.4,2.7,1.9,'#5aa02a');El(3.4,-4,1.4,.8,'#8ad85a');eye(5,-4,'#ffd84a',1);Px(4.8,-4.6,.4,1.2,'#12161c');
   const tg=Math.floor(t*4)%2;if(tg){Px(6.8,-3,1.6,.4,'#ff4d6d');Px(8.2,-3.4,.6,.4,'#ff4d6d');Px(8.2,-2.6,.6,.4,'#ff4d6d')}
   const ph=(t*.9)%1;Ci(6+ph*2,-1+ph*6,.7,'#8aff5a',1-ph)},
  /* 별빛 고래 */(H)=>{const {t,Px,Ci,El,Pg,eye}=H,tw=Math.sin(t*3)*1.4;
   Pg([[-6,0],[-10,-3+tw],[-10.5,3+tw],[-6,2]],'#12161c');Pg([[-6.4,.4],[-9.4,-2+tw],[-9.6,2.2+tw],[-6.4,1.6]],'#3a6ab0');
   El(0,1,7,4.6,'#1a2a4a');El(0,1,6.4,4,'#3a6ab0');El(1,3,5,1.8,'#e8f4ff');for(let i=0;i<4;i++)Px(-1+i*1.4,3,.4,1.6,'#a8c8e8');El(-1,-1.6,3.6,1.2,'#6a9ae0',.8);
   for(let i=0;i<5;i++){const tw2=.5+.5*Math.sin(t*5+i*2);Px(-4+i*1.8,-1.4+Math.sin(i*2.3),.6,.6,i%2?'#ffe36b':'#ffffff',tw2)}
   eye(4.4,.4,'#ffffff');Px(5.8,2,1.4,.5,'#1a2a4a');Pg([[0,-3.4],[1,-6],[2,-3.4]],'#3a6ab0');
   const sp=(t*1.2)%1;for(let i=0;i<3;i++)Ci(1+(i-1)*1.4,-6-sp*5-i*.4,.6+sp*.4,'#bfe8ff',1-sp)},
  /* 창공의 용 */(H)=>{const {t,Px,Ci,El,Pg,eye}=H,fl=Math.sin(t*6)*2;
   for(const s of [-1,1]){Pg([[s*1,-2],[s*9,-8+fl],[s*8,-1+fl*.5],[s*5,1]],'#12161c');Pg([[s*1.6,-1.6],[s*8.2,-7+fl],[s*7.4,-1.4+fl*.5],[s*4.6,.6]],'#e8f8ff',.95);for(let i=0;i<2;i++)Px(s*(3+i*2.4)-.2,-3-i*1.5+fl*.3,.4,3,'#8ad8ff')}
   for(let i=0;i<6;i++){const q=i/5;Ci(-3-q*5,5+Math.sin(t*4+q*3)*.8-q*2,1.8-q*1,'#12161c');Ci(-3-q*5,5+Math.sin(t*4+q*3)*.8-q*2,1.4-q*.9,'#5ab8ff')}
   El(0,3,4,3.6,'#12161c');El(0,3,3.4,3,'#5ab8ff');El(.4,4,2,1.8,'#d8f4ff');
   El(2.6,-2,3.2,2.6,'#12161c');El(2.6,-2,2.7,2.1,'#5ab8ff');El(2,-2.8,1.2,.8,'#a8e0ff');for(const s of [0,2])Pg([[1+s,-4],[.5+s,-7],[2+s,-4.2]],'#ffd166');
   eye(3.4,-2.2,'#ffe36b',1);Px(5,-1.2,1,.5,'#1a3a6a');const ph=(t*1.4)%1;Ci(6+ph*3,-1.4-ph*2,.8+ph,'#c8f0ff',1-ph)}];
 function sw0(t){return Math.sin(t*2)*.4}
 const NEWP=window.NG82;
 {const base=drawPet;drawPet=function(c,id,x,y,now,k){const i=id-P0;if(i>=0&&i<PD.length){if(window.PET105&&PET105.draw(c,id,x,y,now,k))return;/* v105 새 그림 */try{const H=petHelpers(c,x,y,now,k||1,id);c.save();PD[i](H);c.restore();c.globalAlpha=1;return}catch(e){c.globalAlpha=1}}return base.apply(this,arguments)}}
 /* 변이: 새 그림으로 다시 그리도록 9999998의 PET59.draw를 한 번 더 감쌈 */
 if(window.PET59){const RC=window.RECOLOR59,off=document.createElement('canvas'),od=PET59.draw;
  PET59.draw=(c,id,x,y,now,k)=>{const v=(PET59.list||[]).find(q=>q.id===id);if(v&&v.base>=P0&&v.base<P0+PD.length){k=k||1;const S=Math.ceil(50*k);if(off.width!==S){off.width=S;off.height=S}const o=off.getContext('2d');o.setTransform(1,0,0,1,0,0);o.clearRect(0,0,S,S);o.imageSmoothingEnabled=false;
    drawPet(o,v.base,S/2,S/2,now,k);try{RC&&RC(off,v.map,false)}catch(e){}const sm=c.imageSmoothingEnabled;c.imageSmoothingEnabled=false;c.drawImage(off,Math.round(x-S/2),Math.round(y-S/2));c.imageSmoothingEnabled=sm;
    const t=now/1000;c.save();for(let i=0;i<7;i++){const q=(t*.7+i/7)%1,a=i*.9+t;c.globalAlpha=(1-q)*.85;c.fillStyle=i%2?v.fc[0]:'#ffffff';c.fillRect(Math.round(x+Math.cos(a)*(9+q*4)*k),Math.round(y+(4-q*15)*k),Math.ceil(1.3*k),Math.ceil(1.3*k))}c.restore();return}
   return od(c,id,x,y,now,k)}}

 /* ---------- ② 새 캐릭터: 음영 · 주름 · 머리 결 · 소품 ---------- */
 const PROP=[
  /* 리오: 화살통 끈 · 손목 보호대 */(Q,b,v)=>{if(v!=='back'){Q.L(8,19+b,19,27,'#7a5030');Q.L(8,20+b,19,28,'#5a3a20')}Q.R(6.5,23+b,3,1.2,'#c8a46a')},
  /* 하나: 청진기 · 약초 주머니 */(Q,b,v)=>{if(v!=='back'){Q.L(10,19+b,10,24+b,'#4a5a6a');Q.L(18,19+b,18,23+b,'#4a5a6a');Q.C(18,24+b,1.1,'#8a9aaa');Q.R(18.5,26,3,3,'#8a6a42');Q.R(18.5,26,3,.8,'#5ad07a')}},
  /* 가온: 등에 멘 망치 · 그을린 앞치마 */(Q,b,v)=>{Q.R(20,12+b,1.4,12,'#6a4a2a');Q.R(18.5,10+b,4.5,3,'#8a949c');Q.R(18.5,10+b,4.5,.8,'#c8d0d8');if(v!=='back'){for(const [x,y] of [[11,24],[16,22]])Q.px(x,y+b,'#2a1a10',.7)}},
  /* 소라: 안대 · 금귀걸이 · 금단추 */(Q,b,v)=>{if(v==='front'){Q.R(10,13.4+b,4,3,'#12161c');Q.L(8,11+b,20,13+b,'#12161c');Q.C(20.5,17+b,.9,'#ffd166')}if(v==='side'){Q.C(17.5,17+b,.9,'#ffd166')}},
  /* 유키: 붉은 리본 · 흰 소매 끝 */(Q,b,v)=>{Q.P([[17,8+b],[21,6+b],[21,10+b]],'#e03a5a');Q.P([[17,8+b],[19,11+b],[16,10+b]],'#c8324a');if(v!=='back'){Q.R(9,21+b,10,1.4,'#e03a5a');Q.R(13,21.4+b,2,4,'#e03a5a')}},
  /* 다크: 높은 깃 · 루비 브로치 */(Q,b,v)=>{Q.P([[7,19+b],[9,13+b],[11,19+b]],'#5a0a1a');Q.P([[21,19+b],[19,13+b],[17,19+b]],'#5a0a1a');if(v!=='back'){Q.C(14,20.6+b,1.2,'#c8323a');Q.px(13.6,20.2+b,'#ffb0b8')}},
  /* 볼트: 렌치 · 번쩍이는 고글 */(Q,b,v)=>{Q.R(19.5,24,1.2,5,'#8a949c');Q.C(20.1,23.6,1.3,'#8a949c');Q.px(20.1,23.4,'#3a5a8a');if(v!=='back')Q.px(9.6,8.9+b,'#ffffff')},
  /* 모모: 버섯 바구니 · 볼 점 */(Q,b,v)=>{Q.R(18.5,24,4,3,'#c89a5a');Q.R(18.5,24,4,.8,'#a87a3a');Q.C(19.6,23.6,1,'#ff4a6a');Q.C(21.4,23.4,.8,'#ffe0b0');if(v==='front')Q.px(10,16.6+b,'#ff9a7a')},
  /* 레오: 갈기 결 · 사자 문장 */(Q,b,v)=>{for(let i=0;i<6;i++)Q.R(5.6+i*3.1,10+b+(i%2),1,v==='back'?10:6,'#c87a2a',.7);if(v!=='back'){Q.C(14,22.5+b,1.6,'#ffd166');Q.px(13.5,22+b,'#8a6a20')}},
  /* 미르: 피리 · 용 비늘 띠 */(Q,b,v)=>{if(v!=='back'){Q.R(16,22+b,7,1.2,'#c8a46a');for(let i=0;i<3;i++)Q.px(17.5+i*1.8,22.2+b,'#5a3a20')}for(let i=0;i<4;i++)Q.px(9+i*3,27,'#4a8aff',.8)},
  /* 실비: 허리 단검 두 개 · 망토 고리 */(Q,b,v)=>{Q.R(8,25,1,4,'#c8d0e0');Q.R(7.5,25,2,.8,'#5a4a3a');Q.R(19,25,1,4,'#c8d0e0');Q.R(18.5,25,2,.8,'#5a4a3a');if(v!=='back')Q.C(14,19.6+b,.9,'#8de4ff')},
  /* 테라: 바위 갈라짐 · 이끼 */(Q,b,v)=>{Q.L(10,20+b,12,24+b,'#4a3a2a');Q.L(12,24+b,11,27,'#4a3a2a');Q.L(17,21+b,16,25+b,'#4a3a2a');for(const [x,y] of [[8,20],[19,22],[13,8]])Q.R(x,y+b,2,1,'#5aa02a',.85)},
  /* 노바: 별 지팡이 */(Q,b,v,t)=>{Q.R(21,14+b,1,15,'#8a6a42');const tw=.6+.4*Math.sin(t*5);Q.C(21.5,13+b,1.8,'#ffe36b',tw);Q.px(21.4,12.6+b,'#ffffff');for(const [dx,dy] of [[-2.4,0],[2.4,0],[0,-2.4]])Q.px(21.5+dx,13+b+dy,'#fff6c0',tw)},
  /* 카게: 쿠나이 · 독 병 */(Q,b,v)=>{Q.P([[19,24],[22,22],[20,25]],'#c8d0e0');Q.R(18.6,24.4,1.2,1.2,'#3a6a2a');Q.R(8,25,2,3,'#8aff5a',.8);Q.R(8,24.6,2,.6,'#5a4a3a')},
  /* 세레나: 깃털 장식 · 가슴 보석 · 금테 */(Q,b,v)=>{if(v!=='back'){Q.C(14,21.5+b,1.4,'#5ab8ff');Q.px(13.6,21+b,'#ffffff');Q.L(8,19+b,20,19+b,'#ffd84a')}Q.P([[6,9+b],[3,5+b],[7,7+b]],'#ffffff');Q.P([[22,9+b],[25,5+b],[21,7+b]],'#ffffff')}];
 for(let i=0;i<15;i++){const D=CH2DEF[C0+i];if(!D||D.__nd82)continue;const p0=D.paint,S=(NG.NC[i]||{}).S||{};
  D.paint=function(Q,f,b,bl,t){p0.apply(this,arguments);try{const v=(window.__HV&&__HV.view)||'front',top=S.top||'#888';
    /* 몸통 좌우 음영 · 주름 · 단 */if(!S.robe){Q.R(7.6,20+b,1.2,7,sh(top,.75),.8);Q.R(19.2,20+b,1.2,7,sh(top,1.2),.5);Q.R(8,27.4,12,.8,sh(top,.6),.8)}
    else{Q.R(6,26,1.4,5,sh(S.robe,.75),.8);Q.R(20.6,26,1.4,5,sh(S.robe,1.2),.5);Q.R(5.4,30.4,17.2,.8,sh(S.robe,1.35),.8)}
    if(v!=='back'){Q.L(11,22+b,12,25+b,sh(top,.82),.6);Q.L(17,22+b,16,25+b,sh(top,.82),.6)}
    /* 머리 결 · 앞머리 그늘 */const hr=S.hair;if(hr&&S.hairStyle!=='none'){Q.L(9,6+b,11,9+b,sh(hr,1.35),.7);Q.L(15,5.5+b,17,8.5+b,sh(hr,1.35),.6);if(v==='front')Q.R(8,13.2+b,12,.8,sh(S.skin||'#ffd8b8',.82),.55)}
    PROP[i](Q,b,v,t)}catch(e){}};D.__nd82=1}
 /* 그려 둔 캐릭터 그림(CH2C)은 새 그림으로 다시 그려지도록 비움 */try{if(typeof CH2C!=='undefined')CH2C.clear()}catch(e){}

 /* ---------- ③ 새 무기 15: 손으로 다시 그린 9칸 너비 도트 ----------
    글자: o 외곽 · P 손잡이 끝 · X 보석 · G/g 손잡이 감은 끈 · C/c 코등이 · L 밝은 날 · B 칼날 · F 가운데 홈 · D 어두운 날 · H/h 머리(망치 · 도끼) · E 빛 */
 const POM={gem:["...ooo...","..oXXXo..","..oXEXo..","...oXo..."],ring:["..ooooo..","..oP.Po..","..oPPPo..","...oPo..."],spike:["....o....","...oPo...","...oPo...","...oXo..."],orb:["...ooo...","..oEXEo..","..oXXXo..","...ooo..."]};
 const GUARD={cross:["ooooooooo","oCcCXCcCo","ooooooooo"],wing:["o.......o","oCo...oCo","oCCcXcCCo",".ooCCCoo."],fang:["oC.....Co",".oCo.oCo.","..oCXCo..","...ooo..."],
  cup:["..ooooo..",".oCcccCo.","oCcXEXcCo",".ooCCCoo."],gear:[".oCoCoCo.","oCCcXcCCo",".oCoCoCo."],star:["....o....","...oXo...","ooCCXCCoo","...oXo..."],sun:["oC.oCo.Co",".oCCXCCo.","oC.oCo.Co"],leaf:[".oo...oo.","oCCo.oCCo",".oCCXCCo.","...ooo..."]};
 function grip(n,wrap){const r=[];for(let i=0;i<n;i++)r.push(wrap&&i%2?"...ogo...":"...oGo...");return r}
 function blade(len,w,o){o=o||{};const r=[];for(let i=0;i<len;i++){let row;
   if(w>=5){row=o.fuller&&i>0&&i<len-2?".oLBFBDo.":".oLBBBDo.";if(o.serr&&i%3===1)row=".oLBFBDDo".slice(0,9);if(o.runes&&i%4===2)row=".oLBEBDo."}
   else{row=o.fuller&&i>0&&i<len-1?"..oLFDo..":"..oLBDo..";if(o.serr&&i%3===1)row="..oLBDDo.";if(o.runes&&i%4===2)row="..oLEDo.."}
   if(o.wave){const sft=Math.round(Math.sin(i*.9)*1);if(sft>0)row='.'+row.slice(0,8);else if(sft<0)row=row.slice(1)+'.'}r.push(row)}
  if(w>=5)r.push("..oLBDo..","...oLo...","....o....");else r.push("...oLo...","....o....");return r}
 const HEAD={hammer:["ooooooooo","oHHHHHHHo","oHhEXEhHo","oHhhhhhHo","oHHHHHHHo","ooooooooo"],
  /* 도끼: 한쪽 날(초승달) + 반대쪽 작은 가시 */
  axe:["...oo....","..oPoHo..",".oPPoHHo.","..ooHHHHo","...oHhHHo","...ohEhHo","...oHhHHo","..ooHHHHo",".oPPoHHo.","..oPoHo..","...oo...."],
  /* 창: 손잡이 쪽이 넓고 끝으로 갈수록 뾰족 (위 → 아래 = 손잡이 → 끝) */
  spear:["..oCCCo..",".oLBFBDo.",".oLBFBDo.",".oLBFBDo.","..oLBDo..","..oLBDo..","...oLo...","...oLo...","....o...."]};
 function shaft(n){const r=[];for(let i=0;i<n;i++)r.push(i%3===1?"...oGo...":"...ogo...");return r}
 const PALW=(o)=>Object.assign({o:'#0c0e12',P:'#c8d0d8',X:'#ff4d6d',E:'#ffffff',G:'#6a4a2a',g:'#3a2818',C:'#d4ae4a',c:'#8a6a20',L:'#ffffff',B:'#cfd8e0',F:'#8a96a2',D:'#6a7480',H:'#8a949c',h:'#5a646c'},o);
 const mk=(rows,pal,ex)=>Object.assign({g:Math.max(2,rows.findIndex(r=>/G|g/.test(r))+1),pal:PALW(pal),r:rows},ex||{});
 const ND={
  toxfang:mk([...POM.spike,...grip(4,1),...GUARD.fang,...blade(8,3,{serr:1})],{X:'#8aff5a',C:'#5aa02a',c:'#2a5a1a',B:'#a8e890',L:'#e8ffd0',F:'#5a9a3a',D:'#3a7a2a',G:'#2a3a1a',g:'#141c0e'}),
  hammer:mk([...POM.ring,...shaft(10),...HEAD.hammer],{H:'#8a949c',h:'#4a525a',X:'#ffd166',E:'#e8eef4',G:'#6a4a2a',g:'#3a2818',P:'#a8b0b8'}),
  frostgreat:mk([...POM.gem,...grip(5,1),...GUARD.wing,...blade(14,5,{fuller:1,runes:1})],{X:'#6ab8ff',E:'#e8f8ff',C:'#bfe8ff',c:'#4a8ab0',B:'#bfe8ff',L:'#ffffff',F:'#6ab8ff',D:'#4a8ab0',G:'#2a4a6a',g:'#16283a'}),
  voltrapier:mk([...POM.orb,...grip(4,1),...GUARD.cup,...blade(14,3,{fuller:1})],{X:'#ffe36b',E:'#fff6c0',C:'#ffd166',c:'#a87a1a',B:'#fff6c0',L:'#ffffff',F:'#ffd166',D:'#c8a020',G:'#3a3a5a',g:'#1e1e30'}),
  bloodscythe:Object.assign({},WSPR.scythe,{pal:Object.assign({},WSPR.scythe.pal,{C:'#ff4d6d',c:'#a01a2a',e:'#ffd0d8',S:'#4a1a24',s:'#2a0a14'})}),
  lavaaxe:mk([...POM.spike,...shaft(9),...HEAD.axe,"...ooo..."],{H:'#ff7a2a',h:'#a03a10',E:'#ffe36b',X:'#ff4d1a',G:'#3a1a10',g:'#1e0c06',P:'#ff9a4a'}),
  piercer:mk([...POM.ring,...shaft(12),...HEAD.spear],{C:'#8de4ff',L:'#ffffff',B:'#c8d0e0',F:'#6a8aa8',D:'#5a6a7a',G:'#4a5a6a',g:'#2a3440',P:'#8de4ff'}),
  starblade:mk([...POM.gem,...grip(4,1),...GUARD.star,...blade(12,5,{fuller:1,runes:1})],{X:'#ffe36b',E:'#fff6c0',C:'#ffd166',c:'#a87a1a',B:'#d8ccff',L:'#ffffff',F:'#8a7ae0',D:'#6a5ac8',G:'#3a2a6a',g:'#1e1640'}),
  windtwin:mk([...POM.orb,...grip(3,1),...GUARD.leaf,...blade(9,3,{fuller:1})],{X:'#5ad07a',E:'#e8ffe8',C:'#5ad07a',c:'#2a6a3a',B:'#d8ffe8',L:'#ffffff',F:'#8ad8a8',D:'#4a9a6a',G:'#2a6a3a',g:'#163a20'}),
  poisonlance:mk([...POM.spike,...shaft(12),"..oCXCo..",...HEAD.spear.slice(1)],{X:'#8aff5a',C:'#5aa02a',L:'#e8ffd0',B:'#8ad85a',F:'#3a7a2a',D:'#2a5a1a',G:'#2a3a1a',g:'#141c0e',P:'#5aa02a'}),
  judgment:mk([...POM.gem,...grip(6,1),...GUARD.wing,...blade(16,5,{fuller:1,runes:1})],{X:'#5ab8ff',E:'#ffffff',C:'#ffd84a',c:'#a87a1a',B:'#fff6d0',L:'#ffffff',F:'#d4ae4a',D:'#a8862a',G:'#6a2a1a',g:'#3a140c'}),
  shadowkatana:Object.assign({},mk([...POM.ring,...grip(6,1),"..oCXCo..","...ooo...",...blade(15,3,{fuller:0})],{X:'#8a6aff',C:'#3a3a4a',c:'#1a1a24',B:'#3a3a4a',L:'#b8a0ff',F:'#2a2a36',D:'#14141c',G:'#0a0a10',g:'#2a1a4a',P:'#8a6aff'}),{curve:2.4}),
  sunblade:mk([...POM.orb,...grip(5,1),...GUARD.sun,...blade(13,5,{fuller:1,wave:1})],{X:'#ff4d1a',E:'#fff6c0',C:'#ff8a3a',c:'#a03a10',B:'#ffe79a',L:'#ffffff',F:'#ffb040',D:'#ff7a2a',G:'#5a2a10',g:'#2a1408'}),
  thunderhammer:mk([...POM.orb,...shaft(10),...HEAD.hammer],{H:'#5a6a9a',h:'#2a3a5a',X:'#8de4ff',E:'#fff6a0',G:'#2a2a3a',g:'#14141e',P:'#8de4ff'}),
  infinity:mk([...POM.gem,...grip(5,1),...GUARD.cup,...blade(15,5,{fuller:1,runes:1})],{X:'#ff9af0',E:'#5affd8',C:'#c8a8ff',c:'#6a4a8a',B:'#e8f8ff',L:'#ffffff',F:'#a070e0',D:'#7a5ac8',G:'#3a2a4a',g:'#1e1428'})};
 for(const k in ND)WSPR[k]=ND[k];
 /* 기본 무기 10종도 같은 방식으로 더 섬세하게 (색 · 모양 성격은 그대로) */
 const BASEW={
  sword:mk([...POM.gem,...grip(4,1),...GUARD.cross,...blade(12,3,{fuller:1})],{X:'#5ab8ff',C:'#a8b0b8',c:'#5a646c',B:'#dfe6ea',L:'#ffffff',F:'#9aa4ac',D:'#7a848c',G:'#8a6b45',g:'#5a4028'}),
  dagger:mk([...POM.spike,...grip(3,1),...GUARD.fang,...blade(7,3,{})],{X:'#ffd166',P:'#ffd166',C:'#c8902a',c:'#7a5418',B:'#f0c890',L:'#fff0d0',F:'#c88a4a',D:'#a86a30',G:'#6a4a2a',g:'#3a2818'}),
  great:mk([...POM.ring,...grip(6,1),...GUARD.wing,...blade(15,5,{fuller:1})],{C:'#8a949c',c:'#4a525a',B:'#c8d0d8',L:'#f0f4f6',F:'#8a949c',D:'#5a646c',G:'#4a3a2a',g:'#2a2018',X:'#c8d0d8'}),
  katana:Object.assign({},mk([...POM.ring,...grip(7,1),"..oYXYo..","...ooo...",...blade(15,3,{fuller:0})],{Y:'#d4ae4a',X:'#c8323a',B:'#e8eef4',L:'#ffffff',F:'#c8d0d8',D:'#9aa8b8',G:'#c8323a',g:'#1a1a24',P:'#d4ae4a'}),{curve:2.4}),
  axe:mk([...POM.spike,...shaft(9),...HEAD.axe,"...ooo..."],{H:'#b8c0c8',h:'#6a747c',E:'#ffffff',X:'#c8a040',G:'#7a5530',g:'#4a3018',P:'#c8a040'}),
  rapier:mk([...POM.orb,...grip(4,1),...GUARD.cup,...blade(14,3,{fuller:1})],{X:'#9fe8ff',E:'#dff8ff',C:'#9fe8ff',c:'#4a8ab0',B:'#dff8ff',L:'#ffffff',F:'#9fe8ff',D:'#6ab8d8',G:'#2a4a6a',g:'#16283a'}),
  flame:mk([...POM.gem,...grip(4,1),...GUARD.sun,...blade(12,5,{fuller:1,wave:1})],{X:'#ff5a1f',E:'#fff6c0',C:'#8a1a10',c:'#4a0a06',B:'#ff9a3a',L:'#ffe36b',F:'#ff5a1f',D:'#c83a10',G:'#3a1a10',g:'#1e0c06'}),
  spear:mk([...POM.ring,...shaft(12),"..oYYYo..",...HEAD.spear.slice(1)],{Y:'#ffe36b',L:'#ffffff',B:'#ffe36b',F:'#c8a020',D:'#a88a20',G:'#5a5a78',g:'#3a3a50',P:'#8a8aa8'}),
  chrono:mk([...POM.gem,...grip(4,1),...GUARD.gear,...blade(13,5,{fuller:1,runes:1})],{X:'#ff4d6d',E:'#7df9ff',C:'#ffd84a',c:'#c89a20',B:'#fff0c8',L:'#ffffff',F:'#ffe79a',D:'#c8a040',G:'#8a6a20',g:'#5a4410'})};
 for(const k in BASEW){WSPR[k]=BASEW[k];ND[k]=BASEW[k]}
 /* 칼날 · 머리가 빛나는 종류는 반짝임 (그릴 때 E 글자 색을 시간에 따라) */
 {const base=drawWeaponShape;drawWeaponShape=function(w,hx,hy,ang,L,s,now,dirS,al){try{const sp=w&&ND[w.type];if(sp&&sp.pal){const k=.5+.5*Math.sin((now||performance.now())/180);sp.pal.E=mx(sp.__e||(sp.__e=sp.pal.E),'#ffffff',k*.6)}}catch(e){}return base.apply(this,arguments)}}
}catch(e){console.error('v82 detail',e)}})();
