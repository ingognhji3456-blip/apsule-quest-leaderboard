/* ================= v52 챕터 6 · 7 보스 체력바: 보스 20명 각자 디자인이 다른 체력바 =================
   전에는 챕터 6·7 보스가 모두 1번(톱니) 체력바를 같이 썼다. 이제 보스마다 그 캐릭터의 모양·재질로 바꾼다.
   구조는 350의 체력바 틀(BB_TH)을 그대로 따른다: back(뒤 장식) · shape(몸통 모양) · tex(채운 부분 무늬) · front(앞 장식)
   S: x,y,w,h(바 위치) · fw(채운 길이) · fx(채움 끝) · t(초) · r(남은 비율) · main(주색) · c(빈/잔상/채움 색 묶음) */
(function(){try{
 const L6=window.S6ART,L7=window.S7ART;if(typeof BB_TH==='undefined'||typeof C3BOSS==='undefined')return;
 const frame=(S,a,b,c)=>{const {x,y,w,h}=S;R(x-3,y-3,w+6,h+6,a);R(x-2,y-2,w+4,h+4,b);R(x-1,y-1,w+2,h+2,c||'#06080c')};
 const tri=(x0,y0,x1,y1,x2,y2,col,al)=>{const c=BXC();c.save();c.globalAlpha=al==null?1:al;c.fillStyle=col;c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.lineTo(x2,y2);c.closePath();c.fill();c.restore()};
 const kite=(x,y,s,col,rot)=>{const c=BXC();c.save();c.translate(x,y);c.rotate(rot||0);c.fillStyle='#1a1420';c.beginPath();c.moveTo(0,-5*s);c.lineTo(3.6*s,0);c.lineTo(0,6*s);c.lineTo(-3.6*s,0);c.closePath();c.fill();c.fillStyle=col;c.beginPath();c.moveTo(0,-4*s);c.lineTo(2.8*s,0);c.lineTo(0,5*s);c.lineTo(-2.8*s,0);c.closePath();c.fill();c.restore()};
 const th={};

 /* ================= 챕터 6 ZENITH ================= */
 /* 0 풍향계 기사: 화살 모양 바 (뒤 깃 · 앞 화살촉) + 바람 줄기 */
 th.s6_vane={main:'#5ad0b0',frame:'#1e3a3a',
  back(S){frame(S,'#0a1414','#8a6a3a');const {x,y,w,h}=S;for(let i=0;i<3;i++){R(x-9+i*2,y-3-i,2,3,'#c89a5a');R(x-9+i*2,y+h+i,2,3,'#c89a5a')}},
  tex(S){const {x,y,h,fw,t}=S;for(let i=0;i<fw;i+=14){const q=(i+t*60)%fw;RA(x+q,y+3+(i%3)*2,8,1,'#ffffff',.35)}},
  front(S){const {x,y,w,h,t}=S;bbTriH(x+w+3,y-4,9,h+8,'#0a1414',1);bbTriH(x+w+3,y-2,7,h+4,'#c89a5a',1);const a=Math.sin(t*1.3)*.5;pcirc(x+w+16,y+h/2,4,'#0a1414');RA(x+w+16+Math.cos(a)*-5,y+h/2+Math.sin(a)*-5-1,2,2,'#ffe8a0',1);bbLine(x+w+16,y+h/2,x+w+16+Math.cos(a)*6,y+h/2+Math.sin(a)*6,'#ff6a5a')}};
 /* 1 연줄의 거인: 꼰 연줄 테 + 줄에 매달린 연들 */
 th.s6_kite={main:'#ff6a5a',frame:'#3a2418',
  back(S){frame(S,'#140c08','#d8c8a0');const {x,y,w,h}=S;for(let i=0;i<w+4;i+=4){RA(x-2+i,y-2,2,1,'#8a6a40',.8);RA(x-1+i,y+h+1,2,1,'#8a6a40',.8)}},
  tex(S){const {x,y,h,fw}=S;for(let i=0;i<fw;i+=6)RA(x+i,y+2,3,h-4,'#ffffff',.1)},
  front(S){const {x,y,w,h,t}=S,cols=['#ff6a5a','#ffd08a','#5ad0b0','#8ad8ff'];for(let i=0;i<5;i++){const kx=x+30+i*55,ky=y-7+Math.sin(t*2+i)*2;bbLine(kx,ky+5,kx,y,'#d8c8a0',.7);kite(kx,ky,1,cols[i%4],Math.sin(t*1.5+i)*.25)}kite(x+w+10,y+h/2-2+Math.sin(t*2)*2,1.6,'#ff6a5a',Math.sin(t)*.2)}};
 /* 2 번개구름 고래: 뭉게구름 테 + 안쪽 번개 + 끝에 고래 꼬리 */
 th.s6_cloudwhale={main:'#ffe25a',frame:'#2a3448',
  back(S){const {x,y,w,h,t}=S;for(let i=-4;i<w+8;i+=9){const b=Math.sin(t+i*.1)*.6;pcirc(x+i,y-1+b,5,'#3a4868');pcirc(x+i+4,y+h+1-b,5,'#2a3448')}frame(S,'#141a28','#5a6888')},
  tex(S){const {x,y,h,fw,now}=S;if(Math.floor(now/90)%5===0){const rr=rng(Math.floor(now/90));let px=x+rr()*fw,py=y+1;for(let k=0;k<4;k++){const nx=px+(rr()-.5)*6,ny=py+3;bbLine(px,py,nx,ny,'#ffffff');px=nx;py=ny}}},
  front(S){const {x,y,w,h,t}=S,wx=x+w+6,wy=y+h/2+Math.sin(t*1.6)*1.5;R(wx-1,wy-2,8,5,'#0a0e18');R(wx,wy-1,7,3,'#8a9ac0');tri(wx+5,wy,wx+15,wy-8,wx+12,wy+1,'#0a0e18');tri(wx+6,wy,wx+14,wy-6,wx+11,wy,'#b8c8e8');tri(wx+5,wy,wx+15,wy+8,wx+12,wy-1,'#0a0e18');tri(wx+6,wy,wx+14,wy+6,wx+11,wy,'#8a9ac0');RA(wx+1,wy,5,1,'#ffe25a',.9)}};
 /* 3 비행선 함장: 리벳 박힌 선체 + 대포 구멍 + 프로펠러 */
 th.s6_captain={main:'#ff5a6a',frame:'#1a2440',
  back(S){frame(S,'#0a0c14','#a8703a','#1a1008');const {x,y,w,h}=S;for(let i=6;i<w;i+=18){RA(x+i,y-2,1,1,'#ffe0a0',1);RA(x+i,y+h+1,1,1,'#ffe0a0',1)}for(let i=20;i<w-10;i+=45){pcirc(x+i,y+h+3,2,'#0a0c14');pcirc(x+i,y+h+3,1.2,'#3a2a20')}},
  tex(S){const {x,y,h,fw}=S;for(let i=0;i<fw;i+=12)RA(x+i,y,1,h,'#3a0a10',.35);RA(x,y+h-3,fw,1,'#ffffff',.2)},
  front(S){const {x,y,w,h,t}=S,cx=x+w+9,cy=y+h/2;pcirc(cx,cy,3,'#a8703a');for(let i=0;i<3;i++){const a=t*14+i*TAU/3;bbLine(cx,cy,cx+Math.cos(a)*8,cy+Math.sin(a)*8,['#ff6a5a','#ffd08a','#5ad0b0'][i])}pcirc(cx,cy,1.5,'#ffe0a0')}};
 /* 4 깃털 시계탑: 위쪽 시계 눈금 + 초침처럼 도는 빛 + 끝에 시계 얼굴과 깃털 */
 th.s6_clock={main:'#8ad8ff',frame:'#2a3a52',
  back(S){frame(S,'#0a1020','#d8ccb4');const {x,y,w}=S;for(let i=0;i<=60;i++){const px=Math.round(x+w*i/60);R(px,y-5,1,i%5===0?3:1,'#d8ccb4')}},
  tex(S){const {x,y,h,fw,t}=S,q=(t*.5)%1;RA(x+fw*q,y,2,h,'#ffffff',.5)},
  front(S){const {x,y,w,h,t}=S,cx=x+w+11,cy=y+h/2;for(let i=0;i<3;i++){const a=-.6+i*.6;tri(cx,cy,cx+Math.cos(a-1.6)*12-2,cy+Math.sin(a-1.6)*12,cx+Math.cos(a-1.6)*12+2,cy+Math.sin(a-1.6)*12,'#f4f8ff',.9)}pcirc(cx,cy,7,'#0a1020');pcirc(cx,cy,6,'#fff8e8');const a1=-t*.4,a2=-t*3;bbLine(cx,cy,cx+Math.cos(a1)*3.5,cy+Math.sin(a1)*3.5,'#1a1420');bbLine(cx,cy,cx+Math.cos(a2)*5,cy+Math.sin(a2)*5,'#ff5a6a')}};
 /* 5 풍금 합창단: 바가 오르간 파이프 줄 + 위로 떠오르는 음표 */
 th.s6_organ={main:'#c8a0ff',frame:'#2a2040',
  shape(S,c){const {x,y,w,h}=S,n=27,cw=w/n;for(let i=0;i<n;i++){const hh=h-((i*5)%4),px=x+i*cw;R(px,y+(h-hh),cw-1,hh,c.l);R(px,y+(h-hh),cw-1,hh-2,c.b);R(px,y+(h-hh),1,hh,c.h);R(px,y+h-4,cw-1,1,'#0a0814')}},
  back(S){const {x,y,w,h}=S;R(x-3,y-4,w+6,h+8,'#0a0814');R(x-2,y+h+1,w+4,2,'#c8a070');R(x-2,y-3,w+4,1,'#8a6a4a')},
  front(S){const {x,y,w,t,fw}=S;for(let i=0;i<5;i++){const q=(t*.4+i*.21)%1,nx=x+((i*61)%Math.max(1,fw)),ny=y-2-q*8;RA(nx,ny,2,2,'#e0ccff',1-q);RA(nx+2,ny-4,1,5,'#e0ccff',1-q)}}};
 /* 6 무지개 다리 수문장: 일곱 빛 줄 + 아래 돌다리 아치 */
 th.s6_prism={main:'#ffffff',frame:'#24304a',
  back(S){const {x,y,w,h}=S;frame(S,'#0a0e18','#8a96b0');for(let i=0;i<w;i+=30){for(let a=0;a<=10;a++){const px=x+i+a*3,py=y+h+2+Math.round(Math.sin(a/10*Math.PI)*-2);R(px,py,2,2,'#5a6680')}}},
  tex(S){const {x,y,h,fw,t}=S,RB=['#ff4a5a','#ff9a3a','#ffe04a','#4ae08a','#3aa8ff','#6a5aff','#c85aff'],bh=h/7;for(let i=0;i<7;i++)RA(x,y+i*bh,fw,Math.ceil(bh),RB[(i+Math.floor(t*3))%7],.55)},
  front(S){const {x,y,w,h,t}=S;tri(x+w+3,y+h,x+w+11,y-3,x+w+15,y+h,'#e8f0ff',.9);RA(x+w+9,y+1,2,6,'#ffffff',.6+.3*Math.sin(t*4))}};
 /* 7 메아리 사냥매: 뒤로 젖힌 날개깃 테 + 속도선 + 끝에 매의 눈 */
 th.s6_falcon={main:'#ffb84a',frame:'#2a2420',
  back(S){frame(S,'#100c08','#6a4a2a');const {x,y,w,h}=S;for(let i=0;i<w;i+=10){tri(x+i,y-2,x+i+9,y-2,x+i-2,y-6,'#8a6a40');tri(x+i,y+h+2,x+i+9,y+h+2,x+i-2,y+h+5,'#5a4028')}},
  tex(S){const {x,y,h,fw,t}=S;for(let i=0;i<6;i++){const q=(t*1.6+i*.17)%1;RA(x+fw*(1-q),y+2+i*1.5,10,1,'#ffffff',.3)}},
  front(S){const {x,y,w,h,t}=S,cx=x+w+9,cy=y+h/2;tri(cx-6,cy-5,cx+8,cy,cx-6,cy+5,'#3a2818');pcirc(cx,cy,3,'#ffb84a');pcirc(cx+.5,cy,1.4,'#0a0806');tri(cx+6,cy-1,cx+11,cy+1,cx+6,cy+2,'#ffe08a')}};
 /* 8 폭풍의 눈: 먹구름 테 + 소용돌이 무늬 + 가운데 눈 */
 th.s6_storm={main:'#7af0ff',frame:'#141c38',
  back(S){const {x,y,w,h,t}=S;for(let i=-4;i<w+8;i+=8)pcirc(x+i,y-1+Math.sin(t*2+i)*.8,4,'#1c2448');frame(S,'#05070e','#3a4878')},
  tex(S){const {x,y,h,fw,t}=S;for(let i=0;i<fw;i+=3){const vy=y+h/2+Math.sin(i*.18-t*6)*(h/2-2);RA(x+i,vy,2,1,'#ffffff',.45)}},
  front(S){const {x,y,w,h,t}=S,cx=x+w+11,cy=y+h/2;for(let i=0;i<3;i++){const a=t*3+i*TAU/3;for(let d=2;d<9;d++)RA(cx+Math.cos(a+d*.3)*d,cy+Math.sin(a+d*.3)*d*.7,1,1,'#7af0ff',.7)}pcirc(cx,cy,2.5,'#ffffff');pcirc(cx,cy,1.2,'#141c38')}};
 /* 9 공명탑: 탑 성가퀴 테 + 소리 물결 + 흔들리는 종 */
 th.s6_spire={main:'#ffe8a0',frame:'#1c2238',
  back(S){frame(S,'#0a0c18','#c8b890');const {x,y,w}=S;for(let i=0;i<w;i+=10)R(x+i,y-6,6,3,'#c8b890')},
  tex(S){const {x,y,h,fw,t}=S;for(let i=0;i<fw;i+=2){RA(x+i,y+h/2+Math.sin(i*.3-t*8)*3,1,1,'#ffffff',.6)}},
  front(S){const {x,y,w,h,t}=S,sw=Math.sin(t*3)*.3,cx=x+w+10,cy=y-2,c=BXC();c.save();c.translate(cx,cy);c.rotate(sw);c.fillStyle='#0a0c18';c.beginPath();c.moveTo(-6,13);c.lineTo(6,13);c.lineTo(4,2);c.lineTo(-4,2);c.closePath();c.fill();c.fillStyle='#ffe8a0';c.beginPath();c.moveTo(-5,12);c.lineTo(5,12);c.lineTo(3.5,3);c.lineTo(-3.5,3);c.closePath();c.fill();c.restore();
   const q=(t*.8)%1;cRing(cx,cy+8,3+q*9,'#ffe8a0',(1-q)*.6,1)}};

 /* ================= 챕터 7 REVERSE ================= */
 /* 0 거울문 수문장: 문틀 + 금 테 + 끝에 열쇠 구멍과 열쇠 */
 th.s7_gate={main:'#5af0e0',frame:'#1c2a38',
  back(S){frame(S,'#0a0c18','#8492b0');const {x,y,w,h}=S;R(x-4,y-5,w+8,2,'#ffd27a');R(x-4,y+h+3,w+8,1,'#c8a050');for(const px of [x-5,x+w+2])R(px,y-5,3,h+9,'#46526e')},
  tex(S){const {x,y,h,fw,t}=S,q=((t*.35)%1.4)-.2;if(q>0&&q<1)for(let j=0;j<h;j++)RA(x+fw*q-j,y+j,3,1,'#ffffff',.35)},
  front(S){const {x,y,w,h,t}=S,cx=x+w+11,cy=y+h/2;R(cx-6,cy-8,12,16,'#0a0c18');R(cx-5,cy-7,10,14,'#ffd27a');pcirc(cx,cy-2,2.2,'#0a0c18');R(cx-1,cy,2,4,'#0a0c18');
   const kx=cx+9+Math.sin(t*2)*1;R(kx,cy-1,7,2,'#ffd27a');cRing(kx+9,cy,2.5,'#ffd27a',1,1);R(kx+1,cy+1,1,2,'#ffd27a');R(kx+3,cy+1,1,2,'#ffd27a')}};
 /* 1 유리 공작: 유리 테에 박힌 깃털 눈 + 끝에서 부채처럼 펼친 꼬리 */
 th.s7_peacock={main:'#7af0d0',frame:'#14283a',
  back(S){frame(S,'#06121a','#3a8a8a');const {x,y,w,h}=S;for(let i=16;i<w;i+=34){pcirc(x+i,y-3,2.6,'#1a3a8a');pcirc(x+i,y-3,1.3,'#ffd27a')}},
  tex(S){const {x,y,h,fw,t}=S;for(let i=0;i<fw;i+=9){const g=(Math.sin(t*3+i*.4)+1)/2;RA(x+i,y+2,1,h-4,'#ffffff',.15+.3*g)}},
  front(S){const {x,y,w,h,t}=S,cx=x+w+4,cy=y+h/2;for(let i=0;i<5;i++){const a=-1.1+i*.55+Math.sin(t*2)*.05,L=12;bbLine(cx,cy,cx+Math.cos(a)*L,cy+Math.sin(a)*L,'#3a8a8a');pcirc(cx+Math.cos(a)*L,cy+Math.sin(a)*L,2.4,'#7af0d0');pcirc(cx+Math.cos(a)*L,cy+Math.sin(a)*L,1.2,'#1a3a8a')}pcirc(cx,cy,2.5,'#14283a')}};
 /* 2 역류의 분수: 물이 오른쪽에서 차오르는 거꾸로 바 + 위로 오르는 거품 + 돌 수반 */
 th.s7_fountain={main:'#7ad8ff',frame:'#142a3a',rev:true,
  back(S){frame(S,'#08121a','#8492b0');const {x,y,w,h}=S;R(x-4,y+h+2,w+8,2,'#c4d0e4');R(x-4,y-4,w+8,1,'#46526e')},
  tex(S){const {x,y,h,fw,t}=S;for(let i=0;i<fw;i+=2){const wy=Math.round(Math.sin(i*.25-t*4)*1.2+1);RA(x+i,y+wy,2,1,'#ffffff',.55)}for(let i=0;i<Math.floor(fw/16);i++){const q=(t*.9+i*.41)%1;RA(x+((i*29)%Math.max(1,fw)),y+h-1-q*(h-2),1,1,'#ffffff',.8*(1-q))}},
  front(S){const {x,y,w,h,t}=S,cx=x-8,cy=y+h/2;for(let i=0;i<6;i++){const q=(t*1.2+i/6)%1;RA(cx+Math.sin(i*2)*2,cy+6-q*14,1,2,'#bff4ff',1-q)}pcirc(cx,cy+4,3,'#46526e')}};
 /* 3 흑백 체스 왕: 흑백 칸으로 된 바 + 위에 말들 + 끝에 왕관 */
 th.s7_chess={main:'#f2f6ff',frame:'#16161e',
  shape(S,c){const {x,y,w,h}=S,n=18,cw=w/n;for(let i=0;i<n;i++){const px=Math.round(x+i*cw),dk=i%2===1;R(px,y,Math.ceil(cw),h,c.l);if(S.mode==='f'){R(px,y,Math.ceil(cw),h-2,dk?'#2a2a36':c.b);R(px,y,Math.ceil(cw),1,dk?'#4a4a5a':c.h)}else{R(px,y,Math.ceil(cw),h-2,dk?mixc(c.b,'#000000',.35):c.b);R(px,y,Math.ceil(cw),1,c.h)}}},
  back(S){frame(S,'#000000','#8492b0','#16161e')},
  front(S){const {x,y,w,h,t}=S;for(let i=0;i<6;i++){const px=x+20+i*44,dk=i%2;R(px-2,y-4,5,2,dk?'#16161e':'#f2f6ff');R(px-1,y-6,3,2,dk?'#16161e':'#f2f6ff');pcirc(px+.5,y-7,1.5,dk?'#16161e':'#f2f6ff')}
   const cx=x+w+10,cy=y+h/2+1;R(cx-6,cy,12,4,'#0a0c18');R(cx-5,cy,10,3,'#ffd27a');for(const dx of [-5,-1,3])tri(cx+dx,cy,cx+dx+1,cy-6,cx+dx+2,cy,'#ffd27a');RA(cx-1,cy-8,2,2,'#ff4a5a',.8+.2*Math.sin(t*4))}};
 /* 4 거꾸로 타는 초: 촛농 몸통 + 흘러내린 촛농 + 채움 끝에 거꾸로 선 청록 불꽃 */
 th.s7_candle={main:'#a8fff0',frame:'#2a2234',
  back(S){const {x,y,w,h}=S;R(x-4,y+h+1,w+8,3,'#c8a050');R(x-4,y+h+1,w+8,1,'#ffe0a0');R(x-3,y-3,w+6,h+4,'#0a0814')},
  tex(S){const {x,y,h,fw}=S;for(let i=3;i<fw;i+=11){const L=3+(hash(i+'d')%Math.max(2,h-4));RA(x+i,y,2,L,'#ffffff',.35);RA(x+i,y+L,2,1,'#ffffff',.5)}},
  front(S){const {x,y,w,h,t,fx,r}=S;if(r<=0)return;const fl=Math.sin(t*14)*.8;for(let d=0;d<8;d++){const ww=Math.max(.5,3.6*(1-d/8));pcirc(fx+1,y+h/2+d+fl*d*.12,ww,d<2?'#ffffff':d<4?'#b8fff6':'#5af0e0',.9)}pcirc(fx+1,y+h/2-1,2,'#ffffff');R(fx,y-3,1,3,'#3a2a20')}};
 /* 5 오르골 발레리나: 나무 오르골 상자 + 금속 빗살 + 채움 끝에서 도는 무희 + 태엽 */
 th.s7_ballet={main:'#ffb0d8',frame:'#2a1a2a',
  back(S){frame(S,'#140a10','#8a5a3a','#2a1408');const {x,y,w,h}=S;R(x-3,y-3,w+6,1,'#ffd27a');R(x-3,y+h+2,w+6,1,'#ffd27a')},
  tex(S){const {x,y,h,fw,t}=S;for(let i=0;i<fw;i+=4){const on2=((i/4)+Math.floor(t*8))%7===0;RA(x+i,y+2,1,h-4,on2?'#ffffff':'#ffd27a',on2?.8:.25)}},
  front(S){const {x,y,w,h,t,fx,r}=S;if(r>0){const sp=Math.cos(t*5),bx=Math.round(fx),by=y-2;R(bx-1,by-8,2,5,'#ffe0d0');pcirc(bx,by-9,1.5,'#ffe0d0');R(bx-Math.round(4*Math.abs(sp)),by-4,Math.max(1,Math.round(8*Math.abs(sp))),2,'#ffb0d8');R(bx,by-3,1,3,'#ffe0d0')}
   const kx=x+w+8,ky=y+h/2,a=t*2;R(kx-2,ky-1,4,2,'#c8a050');for(const s of [-1,1])pcirc(kx+2+Math.cos(a)*0+3,ky+s*Math.abs(Math.sin(a))*3,2,'#ffd27a')}};
 /* 6 뒤집힌 회전목마: 천막 장식(위) + 깜빡이는 전구(아래) + 채움 끝에서 오르내리는 목마 */
 th.s7_carousel={main:'#ffd27a',frame:'#261a30',
  back(S){frame(S,'#0a0610','#c86a8a');const {x,y,w,h,t}=S;for(let i=0;i<w;i+=10){R(x+i,y-5,10,2,(i/10)%2?'#ff7ad0':'#fff0f0');pcirc(x+i+5,y-3,2.5,(i/10)%2?'#ff7ad0':'#fff0f0')}for(let i=4;i<w;i+=9){const on2=((i/9|0)+Math.floor(t*6))%2;RA(x+i,y+h+2,2,2,on2?'#fff0c0':'#6a4a3a',1)}},
  tex(S){const {x,y,h,fw}=S;for(let i=0;i<fw;i+=8)RA(x+i,y,4,h,'#ffffff',.12)},
  front(S){const {x,y,h,t,fx,r}=S;if(r<=0)return;const bob=Math.round(Math.sin(t*5)*2),hx=Math.round(fx)-4,hy=y+h/2-3+bob;R(hx+3,y-6,1,h+10,'#ffd27a');R(hx,hy,8,4,'#0a0c18');R(hx+1,hy+1,6,2,'#f2e8ff');R(hx+6,hy-3,3,4,'#0a0c18');R(hx+6,hy-2,2,3,'#f2e8ff');R(hx+1,hy+4,1,2,'#f2e8ff');R(hx+5,hy+4,1,2,'#f2e8ff')}};
 /* 7 그림자 인형사: 위 조종 막대에서 실이 바로 내려와 바를 붙듦 + 그림자 */
 th.s7_puppet={main:'#b48aff',frame:'#120e1e',
  back(S){const {x,y,w,h,t}=S;R(x-3,y-3,w+6,h+6,'#05030a');R(x-2,y-2,w+4,h+4,'#3a2a5a');R(x-1,y-1,w+2,h+2,'#08060e');
   const sw=Math.sin(t*1.4)*3;R(x+w/2-61+sw,y-10,122,3,'#05030a');R(x+w/2-60+sw,y-9,120,2,'#c8a070');for(let i=0;i<5;i++){const ax=x+w/2-56+i*28+sw,bx2=x+20+i*(w-40)/4;bbLine(ax,y-8,bx2,y-2,'#e0e8f4',.9)}},
  tex(S){const {x,y,h,fw,t}=S;RA(x+2,y+h-4,fw,3,'#000000',.35);for(let i=0;i<fw;i+=12)RA(x+i+Math.sin(t*2+i)*2,y+2,1,h-6,'#e0ccff',.2)},
  front(S){const {x,y,w,h,t}=S,cx=x+w+10,cy=y+h/2;pcirc(cx,cy,5,'#0a0814');pcirc(cx,cy,4,'#f2eef8');RA(cx-2,cy-1,1,1,'#0a0814',1);RA(cx+1,cy-1,1,1,'#0a0814',1);for(let i=-2;i<=2;i++)RA(cx+i,cy+2-Math.abs(i)*.4,1,1,'#ff7ad0',1)}};
 /* 8 반사룡: 겹친 비늘 마디 + 끝에 용 머리 */
 th.s7_dragon={main:'#8af0ff',frame:'#101c2c',
  shape(S,c){const {x,y,w,h}=S,n=22,cw=w/n;R(x,y,w,h,c.l);for(let i=0;i<n;i++){const px=Math.round(x+i*cw);R(px,y,Math.ceil(cw)-1,h-2,c.b);R(px,y,2,h-2,c.h);R(px+Math.ceil(cw)-2,y+1,1,h-3,c.m)}},
  back(S){frame(S,'#04080e','#46607e');const {x,y,w}=S;for(let i=0;i<w;i+=12)tri(x+i,y-2,x+i+6,y-7,x+i+10,y-2,'#46607e')},
  tex(S){const {x,y,h,fw,t}=S,q=(t*.7)%1;RA(x+fw*q-6,y,12,h,'#ffffff',.25);RA(x,y+1,fw,1,'#ffffff',.3)},
  front(S){const {x,y,w,h,t}=S,cx=x+w+3,cy=y+h/2;tri(cx,cy-6,cx+16,cy-1,cx,cy+6,'#0a1828');tri(cx+1,cy-5,cx+14,cy-1,cx+1,cy+4,'#8af0ff');tri(cx+2,cy-6,cx+5,cy-11,cx+7,cy-5,'#c8dcf0');pcirc(cx+7,cy-2,1.2,'#ff7ad0');if(Math.sin(t*2)>.6)RA(cx+15,cy-1,6,2,'#ffffff',.7)}};
 /* 9 거울 하루: 오른쪽에서 줄어드는 거꾸로 바 + 은빛 거울 테 + 아래 거울 잔상 + 거꾸로 도는 시계 */
 th.s7_mharu={main:'#b48aff',frame:'#141228',rev:true,
  back(S){frame(S,'#05040c','#c4d0e4','#0a0816');const {x,y,w,h,fw,r}=S;RA(x+w-fw,y+h+3,fw,2,'#b48aff',.35);RA(x+w-fw,y+h+5,fw,1,'#b48aff',.15)},
  tex(S){const {x,y,h,fw,t}=S;for(let i=0;i<fw;i+=16){const q=(i/16+t*1.2)%3;if(q<1)RA(x+i,y+2,3,h-4,'#e0ccff',.5*(1-q))}},
  front(S){const {x,y,w,h,t}=S,cx=x+w+11,cy=y+h/2;pcirc(cx,cy,7,'#0a0816');pcirc(cx,cy,6,'#e0e8f4');for(let i=0;i<12;i+=3)RA(cx+Math.cos(i*TAU/12)*4.5,cy+Math.sin(i*TAU/12)*4.5,1,1,'#141228',1);const a1=-Math.PI/2-t*.6,a2=-Math.PI/2-t*4;bbLine(cx,cy,cx+Math.cos(a1)*3,cy+Math.sin(a1)*3,'#141228');bbLine(cx,cy,cx+Math.cos(a2)*5,cy+Math.sin(a2)*5,'#b48aff');
   const sh=(t*.5)%1;RA(x+w-1,y-1,2,h+2,'#e0ccff',.4+.4*Math.sin(t*3));RA(cx-1+Math.cos(sh*TAU)*9,cy+Math.sin(sh*TAU)*9,2,2,'#e0ccff',.8)}};

 /* 등록: 보스 열쇠 → 체력바 */
 const reg=(L,pre)=>{if(!L)return;L.forEach(b=>{const T=th[b.art];if(!T)return;const key=pre+b.art;BB_TH[key]=T;if(C3BOSS[b.art])C3BOSS[b.art].th=key})};
 reg(L6,'bar_');reg(L7,'bar_');
 window.BB67=th;
 /* 왼쪽 보스 모양 게이지: 바뀐 보스마다 크기 맞춤을 다시 계산 (같은 자리를 여러 보스가 나눠 써서) */
 try{const base=c3SwapIn;c3SwapIn=function(b){const r=base.apply(this,arguments);try{if(typeof _bbFit!=='undefined'&&b&&b.base!=null)delete _bbFit[b.base];if(G)G._barLast=undefined}catch(e){}return r}}catch(e){}
}catch(e){console.error('v52 ch67 bars',e)}})();
