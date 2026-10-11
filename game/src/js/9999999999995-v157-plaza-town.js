/* ================= v157 광장 마을 건물 · 섬세한 소품 (PT157) =================
   - 넓은 광장(PB156)에 건물을 세운다.
     ① 성벽 앞 건물 줄(배경에 구워 넣음, 걷는 곳이 아님): 서쪽 = 여관 · 빵집 · 대장간 · 물약 가게, 동쪽 = 온실 · 도서관 · 종탑 집 · 찻집.
        반목조(나무 뼈대 + 회벽) · 기와 줄 · 돌 기초 · 덧창 · 꽃 상자 · 걸린 간판 · 굴뚝.
     ② 걸어 다니는 곳의 건물(미리 두 배 해상도로 그려 두고 y 순서대로 — 뒤로 가면 가려짐): 호숫가 배 창고 · 숲속 통나무집 · 회전목마 매표소.
     ③ 시장 소품: 나무 상자 · 통 · 자루 · 바구니(가게 옆), 우물.
   - 창문 불빛은 over에서 깜빡이는 빛 번짐, 굴뚝은 연기, 대장간은 불빛이 일렁임.
   - PB156.extra(바깥 배경 조각)에 건물 줄을 더하고, objs/over를 감싼다. 막는 곳은 PLZ111.OBST. */
(()=>{try{
 const z=window.PLZ111,A=window.PLZART,PB=window.PB156;if(!z||!A||!A.kit||!PB)return;
 const K=A.kit,{hsl,rr}=K,TAU=Math.PI*2,TOPY=z.TOPY;
 const WIN=[],CHIM=[],FORGE=[];/* 불빛 · 굴뚝 · 대장간 자리(세상 좌표) */
 /* ---------- 공통 그리기 ---------- */
 function lin(o,x0,y0,x1,y1,st){const g=o.createLinearGradient(x0,y0,x1,y1);st.forEach(([t,c])=>g.addColorStop(t,c));return g}
 function noise(o,x,y,w,h,n,cols,a){for(let i=0;i<n;i++){o.fillStyle=cols[i%cols.length];o.globalAlpha=a*rr(.4,1);o.fillRect(x+rr(0,w),y+rr(0,h),rr(.6,1.6),rr(.5,1.2))}o.globalAlpha=1}
 /* 기와 지붕: 사다리꼴(앞에서 본 비탈) — 줄마다 반원 기와, 아래로 갈수록 밝게, 처마 그늘 */
 function roof(o,x,y,w,h,hue,over,ridge){const x0=x-over,x1=x+w+over,inset=Math.min(w*.18,h*.55);
  o.save();o.beginPath();o.moveTo(x0,y+h);o.lineTo(x0+inset,y);o.lineTo(x1-inset,y);o.lineTo(x1,y+h);o.closePath();o.clip();
  o.fillStyle=hsl(hue,35,18);o.fillRect(x0,y,x1-x0,h);
  for(let r=0,yy=y;yy<y+h;r++,yy+=3.4){const lt=14+(yy-y)/h*16;for(let xx=x0-(r%2)*2.5;xx<x1;xx+=5){o.fillStyle=hsl(hue+rr(-4,4),rr(30,45),lt+rr(-3,3));o.beginPath();o.arc(xx+2.5,yy+3.4,2.6,Math.PI,0);o.fill();
    o.fillStyle='rgba(255,230,200,.18)';o.fillRect(xx+1.2,yy+1,2,.6)}o.fillStyle='rgba(0,0,0,.22)';o.fillRect(x0,yy+3.2,x1-x0,.5)}
  o.fillStyle=lin(o,x0,0,x1,0,[[0,'rgba(0,0,0,.35)'],[.35,'rgba(255,220,180,.08)'],[1,'rgba(0,0,0,.4)']]);o.fillRect(x0,y,x1-x0,h);
  for(let k=0;k<6;k++){o.fillStyle='rgba(40,60,30,'+rr(.2,.45)+')';o.beginPath();o.ellipse(rr(x0+8,x1-8),rr(y+h*.4,y+h),rr(2,5),rr(1,2),0,0,TAU);o.fill()}/* 이끼 */
  o.restore();o.fillStyle=hsl(hue,30,12);o.fillRect(x0+inset-1,y-2,x1-x0-inset*2+2,3);if(ridge){o.fillStyle=hsl(hue,30,30);o.fillRect(x0+inset-1,y-2,x1-x0-inset*2+2,.8)}
  o.fillStyle='rgba(0,0,0,.45)';o.fillRect(x0+2,y+h,x1-x0-4,3);o.fillStyle=hsl(hue,25,10);o.fillRect(x0,y+h-1,x1-x0,1.6)}
 function chimney(o,x,y,h){o.fillStyle='#4a2c22';o.fillRect(x,y,8,h);for(let yy=y;yy<y+h;yy+=2.6)for(let xx=x+((yy-y)/2.6%2?0:-2);xx<x+8;xx+=4){o.fillStyle=hsl(rr(8,18),rr(35,50),rr(26,38));o.fillRect(Math.max(x,xx)+.3,yy+.3,Math.min(4,x+8-Math.max(x,xx))-.6,2)}
  o.fillStyle='#2a2a2e';o.fillRect(x-1.5,y-2,11,2.4);o.fillStyle='rgba(255,255,255,.15)';o.fillRect(x-1.5,y-2,11,.6);o.fillStyle='rgba(0,0,0,.35)';o.fillRect(x+5,y,3,h)}
 /* 창: 나무 테 · 불빛 유리 · 창살 · 덧창 · 꽃 상자 */
 function win(o,x,y,w,h,opt,rec){const lit=opt.lit!==false;o.fillStyle='rgba(0,0,0,.35)';o.fillRect(x-1,y-1,w+3,h+3);o.fillStyle='#3a2414';o.fillRect(x-1.5,y-1.5,w+3,h+3);
  o.fillStyle=lit?lin(o,0,y,0,y+h,[[0,'#ffe6a8'],[.6,'#f0a848'],[1,'#a85a20']]):lin(o,0,y,0,y+h,[[0,'#3a4a6a'],[1,'#141c2c']]);o.fillRect(x,y,w,h);
  if(lit){o.fillStyle='rgba(120,60,20,.5)';o.fillRect(x+w*.55,y+h*.35,w*.3,h*.65);/* 안쪽 가구 그림자 */}else{o.fillStyle='rgba(200,220,255,.25)';o.beginPath();o.moveTo(x,y+h*.6);o.lineTo(x+w*.5,y);o.lineTo(x+w*.7,y);o.lineTo(x,y+h);o.fill()}
  o.fillStyle='#2a1a0e';o.fillRect(x+w/2-.5,y,1,h);o.fillRect(x,y+h/2-.5,w,1);
  if(opt.sh){const sc=opt.sh;for(const sx of [x-w/2-2.5,x+w+2.5]){o.fillStyle=sc;o.fillRect(sx,y-1,w/2,h+2);o.fillStyle='rgba(0,0,0,.25)';for(let k=1;k<4;k++)o.fillRect(sx,y-1+k*(h+2)/4,w/2,.6);o.fillStyle='rgba(255,255,255,.12)';o.fillRect(sx,y-1,.7,h+2)}}
  o.fillStyle='#5a3a20';o.fillRect(x-2,y+h+1,w+4,2);o.fillStyle='rgba(255,230,190,.25)';o.fillRect(x-2,y+h+1,w+4,.6);
  if(opt.box){o.fillStyle='#4a2c16';o.fillRect(x-1,y+h+3,w+2,3);for(let k=0;k<w/2;k++){o.fillStyle=hsl(110,40,rr(20,32));o.beginPath();o.arc(x+rr(0,w),y+h+3,rr(.8,1.4),0,TAU);o.fill();o.fillStyle=['#ff6a8a','#ffd166','#ffffff','#c8a2ff'][k%4];o.fillRect(x+rr(0,w),y+h+1.6+rr(0,1.4),1.2,1.2)}}
  if(lit&&rec)rec(x+w/2,y+h/2,Math.max(w,h))}
 function door(o,x,y,w,h,col){o.fillStyle='#3a3430';K.arch(o,x-2,y-2,w+4,h+2,'#4a423c');o.save();K.arch(o,x,y,w,h,null,false,true);o.clip();
  for(let i=0;i<w;i+=w/4){o.fillStyle=lin(o,x+i,0,x+i+w/4,0,[[0,col[0]],[.5,col[1]],[1,col[0]]]);o.fillRect(x+i,y,w/4-.4,h)}o.fillStyle='rgba(0,0,0,.35)';o.fillRect(x,y+h*.35,w,1.2);o.fillRect(x,y+h*.75,w,1.2);o.restore();
  o.fillStyle='#d8b060';o.beginPath();o.arc(x+w*.78,y+h*.58,1,0,TAU);o.fill();o.fillStyle=hsl(30,8,40);o.fillRect(x-4,y+h,w+8,2.4);o.fillStyle='rgba(255,230,200,.25)';o.fillRect(x-4,y+h,w+8,.6)}
 function hangSign(o,x,y,txt,bg,fg,icon){o.fillStyle='#1e1e24';o.fillRect(x-2,y,16,1.4);o.fillRect(x-2,y-2,1.6,5);o.strokeStyle='#1e1e24';o.lineWidth=.5;o.beginPath();o.moveTo(x+3,y+1);o.lineTo(x+3,y+4);o.moveTo(x+12,y+1);o.lineTo(x+12,y+4);o.stroke();
  o.font='800 5.6px sans-serif';const tw=Math.max(18,o.measureText(txt).width+6);const bx=x+7.5-tw/2;o.fillStyle='rgba(0,0,0,.35)';o.fillRect(bx+1,y+5,tw,10);o.fillStyle=bg;o.fillRect(bx,y+4,tw,10);o.strokeStyle='#d8b060';o.lineWidth=.6;o.strokeRect(bx+.5,y+4.5,tw-1,9);
  o.fillStyle=fg;o.textAlign='center';o.fillText(txt,x+7.5,y+11.2);if(icon)icon(x+7.5,y-4)}
 /* 반목조 집 */
 function house(o,x,b,w,opt,rec,chim){const fl=opt.fl||2,fh=opt.fh||28,wh=fl*fh,top=b-wh,rh=opt.rh||26;
  o.fillStyle='rgba(0,0,0,.4)';o.fillRect(x+3,b-2,w,5);
  /* 돌 기초 */K.stones(o,x,b-7,w,7,[28,22,30],3,4,5,9);
  /* 회벽 */o.fillStyle=lin(o,x,top,x+w,b,[[0,opt.wall[0]],[1,opt.wall[1]]]);o.fillRect(x,top,w,wh-7);noise(o,x,top,w,wh-7,w*wh/14,['#00000033','#ffffff22','#6a5a4a44'],1);
  for(let k=0;k<4;k++){o.fillStyle='rgba(60,50,40,.12)';o.beginPath();o.ellipse(x+rr(4,w-4),b-9-rr(0,6),rr(4,10),rr(2,4),0,0,TAU);o.fill()}/* 아래쪽 얼룩 */
  if(opt.timber!==false){o.fillStyle=opt.beam||'#3a2414';const bw=2.2;o.fillRect(x,top,bw,wh-7);o.fillRect(x+w-bw,top,bw,wh-7);for(let f=0;f<=fl;f++)o.fillRect(x,top+f*fh-(f===fl?7:0)-(f?1:0),w,bw);
   const n=Math.max(2,Math.round(w/26));for(let k=1;k<n;k++){const bx=x+k*w/n-1;o.fillRect(bx,top,bw,wh-7)}
   for(let f=0;f<fl;f++)for(let k=0;k<n;k++){if((k+f)%2)continue;const x0=x+k*w/n+2,x1=x+(k+1)*w/n-1,y0=top+f*fh+2,y1=top+(f+1)*fh-(f===fl-1?8:1);o.save();o.strokeStyle=opt.beam||'#3a2414';o.lineWidth=1.8;o.globalAlpha=.9;o.beginPath();o.moveTo(x0,y1);o.lineTo(x0+(x1-x0)*.45,y0);o.stroke();o.restore()}
   o.fillStyle='rgba(255,230,190,.12)';o.fillRect(x,top,w,.8)}
  /* 지붕 · 굴뚝 */if(opt.chim!=null){chimney(o,x+opt.chim,top-rh-8,rh+4);if(chim)chim(x+opt.chim+4,top-rh-10)}
  roof(o,x,top-rh,w,rh,opt.roof,5,1);
  if(opt.dormer){const dx=x+w/2-8,dy=top-rh+6;o.fillStyle=opt.wall[0];o.fillRect(dx,dy,16,12);roof(o,dx,dy-6,16,7,opt.roof,2,0);win(o,dx+4,dy+2,8,8,{lit:true},rec)}
  /* 창 · 문 */const ws=opt.wins||[];for(const [wx,wf,ww,wh2,l] of ws)win(o,x+wx,top+wf*fh+6,ww||9,wh2||12,{lit:l!==0,sh:opt.sh,box:wf===fl-1?0:opt.box},rec);
  if(opt.door!=null)door(o,x+opt.door,b-7-22,13,22,opt.dc||['#5a3820','#7a5030']);
  if(opt.sign)hangSign(o,x+(opt.door!=null?opt.door-14:w/2-8),top+fh+2,opt.sign,opt.sbg||'#2a1a0e',opt.sfg||'#ffd166');
  if(opt.lamp){const lx=x+(opt.door||0)+18,ly=b-34;o.fillStyle='#1e1e24';o.fillRect(lx-3,ly-1,4,1);o.fillRect(lx-3,ly-1,1,3);o.fillStyle='#ffcf6a';o.fillRect(lx-4.5,ly+2,4,5);o.fillStyle='#1e1e24';o.fillRect(lx-5,ly+1.4,5,1);if(rec)rec(lx-2.5,ly+4.5,10)}}
 /* ---------- ① 성벽 앞 건물 줄 (배경에 구워 넣음) ---------- */
 const rec=(x,y,r)=>WIN.push([x,y,r]),chim=(x,y)=>CHIM.push([x,y]);
 function rowWest(o){const b=TOPY;
  house(o,-556,b,112,{fl:2,fh:30,rh:28,wall:['#e8dcc4','#b8a888'],roof:12,chim:84,door:50,dc:['#4a2a18','#6a4024'],sign:'여관',sh:'#2a5a3a',box:1,lamp:1,dormer:1,wins:[[10,0,10,13],[86,0,10,13],[12,1,10,12],[46,1,10,12,0],[84,1,10,12]]},rec,chim);
  /* 여관 마차 바퀴 장식 · 술통 */o.fillStyle='#4a2c16';o.beginPath();o.arc(-454,b-12,6,0,TAU);o.fill();o.strokeStyle='#8a6038';o.lineWidth=1;o.beginPath();o.arc(-454,b-12,6,0,TAU);o.stroke();for(let k=0;k<6;k++){const a=k/6*TAU;o.beginPath();o.moveTo(-454,b-12);o.lineTo(-454+Math.cos(a)*6,b-12+Math.sin(a)*6);o.stroke()}
  house(o,-436,b,104,{fl:2,fh:28,rh:24,wall:['#f0e0c8','#c8b090'],roof:22,chim:16,door:20,dc:['#6a3a1a','#8a5428'],sign:'빵집',sbg:'#6a3a1a',sh:'#8a3a2a',box:1,wins:[[44,0,22,13],[74,0,10,13],[14,1,10,12],[46,1,10,12],[78,1,10,12,0]]},rec,chim);
  /* 빵집 진열창 빵 */for(let k=0;k<4;k++){o.fillStyle='#c88a40';o.beginPath();o.ellipse(-436+48+k*5,b-28-6+13-3,2.4,1.4,0,0,TAU);o.fill()}
  /* 줄무늬 차양 */for(let k=0;k<7;k++){o.fillStyle=k%2?'#f4ece0':'#a8283c';o.beginPath();o.moveTo(-394+k*4,b-36);o.lineTo(-390+k*4,b-36);o.lineTo(-389.4+k*4,b-30);o.lineTo(-394.6+k*4,b-30);o.fill()}
  house(o,-236,b,112,{fl:1,fh:44,rh:30,wall:['#8a8478','#5a564e'],timber:false,roof:20,chim:90,door:null,wins:[]},rec,chim);
  /* 대장간: 돌벽 · 열린 앞 · 화덕 · 모루 */K.stones(o,-236,b-44,112,37,[24,14,26],5,6,8,14);o.fillStyle='rgba(0,0,0,.25)';o.fillRect(-236,b-44,112,37);
  o.fillStyle='#0e0a08';o.fillRect(-226,b-34,62,27);o.fillStyle='#5a3a20';o.fillRect(-228,b-36,66,3);o.fillRect(-228,b-36,3,30);o.fillRect(-165,b-36,3,30);
  o.fillStyle=lin(o,0,b-30,0,b-10,[[0,'#ff6a20'],[1,'#ffd070']]);o.fillRect(-220,b-22,20,10);o.fillStyle='#3a3430';o.fillRect(-222,b-12,24,5);FORGE.push([-210,b-17]);
  o.fillStyle='#2a2a30';o.fillRect(-190,b-16,16,4);o.fillRect(-186,b-12,8,5);o.fillStyle='#5a5a66';o.fillRect(-190,b-16,16,1);/* 모루 */
  for(let k=0;k<4;k++){o.fillStyle='#8a8a96';o.fillRect(-180+k*4,b-32,1,9);o.fillStyle='#4a2c16';o.fillRect(-180.5+k*4,b-24,2,4)}/* 걸린 연장 */
  win(o,-148,b-38,12,14,{lit:true,sh:'#3a2a1a'},rec);hangSign(o,-206,b-46,'대장간','#1a1a1e','#ff9a4a');o.fillStyle='#3a3a42';o.beginPath();o.ellipse(-140,b-10,7,3,0,0,TAU);o.fill();o.fillStyle='#4a6a8a';o.beginPath();o.ellipse(-140,b-11,5.6,2,0,0,TAU);o.fill();/* 물통 */
  house(o,-116,b,112,{fl:2,fh:28,rh:26,wall:['#d8c8e8','#9888b0'],beam:'#2a1a30',roof:270,chim:12,door:70,dc:['#2a1a40','#4a2a6a'],sign:'물약',sbg:'#2a1a40',sfg:'#c8a2ff',sh:'#3a2a6a',box:1,lamp:1,wins:[[12,0,10,13],[40,0,10,13],[14,1,10,12],[50,1,10,12],[86,1,10,12]]},rec,chim);
  for(let k=0;k<3;k++){o.fillStyle=['#ff4a6a','#4a8aff','#4aff8a'][k];o.beginPath();o.arc(-116+42+k*3.4,b-28-28+6+10,1.4,0,TAU);o.fill()}}
 function rowEast(o){const b=TOPY;
  /* 온실: 흰 철골 · 유리 · 안의 식물 */const gx=964,gw=126,gt=b-64;o.fillStyle='rgba(0,0,0,.4)';o.fillRect(gx+3,b-2,gw,5);K.stones(o,gx,b-8,gw,8,[28,20,32],4,4,6,10);
  o.fillStyle='rgba(40,70,60,.85)';o.fillRect(gx+2,gt+14,gw-4,50);o.beginPath();o.moveTo(gx+2,gt+14);o.quadraticCurveTo(gx+gw/2,gt-16,gx+gw-2,gt+14);o.fill();
  for(let i=0;i<90;i++){o.fillStyle=hsl(rr(90,140),rr(35,60),rr(18,40));o.beginPath();o.arc(rr(gx+6,gx+gw-6),rr(gt+10,b-10),rr(2,5),0,TAU);o.fill()}
  for(let i=0;i<14;i++){o.fillStyle=['#ff6a8a','#ffd166','#ff9a4a','#c8a2ff'][i%4];o.fillRect(rr(gx+6,gx+gw-6),rr(gt+20,b-12),1.6,1.6)}
  o.fillStyle='rgba(180,230,255,.14)';o.fillRect(gx+2,gt+14,gw-4,50);o.strokeStyle='#e8eef0';o.lineWidth=1.2;for(let k=0;k<=8;k++){const xx=gx+2+k*(gw-4)/8;o.beginPath();o.moveTo(xx,b-8);o.lineTo(xx,gt+14);const t=k/8,cy=gt+14-Math.sin(t*Math.PI)*28;o.lineTo(xx,cy);o.stroke()}
  for(const yy of [gt+14,gt+38]){o.beginPath();o.moveTo(gx+2,yy);o.lineTo(gx+gw-2,yy);o.stroke()}o.beginPath();o.moveTo(gx+2,gt+14);o.quadraticCurveTo(gx+gw/2,gt-16,gx+gw-2,gt+14);o.stroke();
  o.fillStyle='rgba(255,255,255,.22)';for(let k=0;k<5;k++){o.beginPath();o.moveTo(gx+10+k*24,b-10);o.lineTo(gx+18+k*24,gt+16);o.lineTo(gx+22+k*24,gt+16);o.lineTo(gx+14+k*24,b-10);o.fill()}
  o.fillStyle='#d8e0e0';o.fillRect(gx+gw/2-1,gt-18,2,6);o.beginPath();o.arc(gx+gw/2,gt-19,2,0,TAU);o.fill();WIN.push([gx+gw/2,b-30,40]);
  /* 도서관: 돌 · 기둥 · 아치 창 · 삼각 지붕 */const lx=1094,lw=136,lt=b-70;o.fillStyle='rgba(0,0,0,.4)';o.fillRect(lx+3,b-2,lw,5);K.stones(o,lx,lt,lw,70,[34,16,40],6,7,10,18);
  o.fillStyle=lin(o,lx,0,lx+lw,0,[[0,'rgba(0,0,0,.45)'],[.3,'rgba(255,220,180,.1)'],[1,'rgba(0,0,0,.5)']]);o.fillRect(lx,lt,lw,70);
  for(let k=0;k<4;k++){const wx=lx+14+k*30;K.arch(o,wx-2,lt+12,18,34,'#3a3430');o.fillStyle=lin(o,0,lt+14,0,lt+46,[[0,'#ffe6a8'],[1,'#c06a28']]);K.arch(o,wx,lt+14,14,32,null);o.fillStyle='#2a1a0e';o.fillRect(wx+6.5,lt+14,1,32);o.fillRect(wx,lt+30,14,1);
   for(let s=0;s<3;s++){o.fillStyle='rgba(90,40,20,.5)';o.fillRect(wx+1,lt+36+s*3,12,1.6)}/* 책장 */WIN.push([wx+7,lt+28,18])}
  for(let k=0;k<5;k++){const cx=lx+6+k*30;o.fillStyle=lin(o,cx,0,cx+6,0,[[0,'#8a847a'],[.5,'#e0d8c8'],[1,'#7a746a']]);o.fillRect(cx,lt+8,6,62);o.fillStyle='#c8c0b0';o.fillRect(cx-1,lt+6,8,3);o.fillRect(cx-1,b-10,8,3)}
  o.fillStyle='#b0a898';o.fillRect(lx-4,lt+2,lw+8,6);o.fillStyle='#9a9284';o.beginPath();o.moveTo(lx-6,lt+2);o.lineTo(lx+lw/2,lt-26);o.lineTo(lx+lw+6,lt+2);o.closePath();o.fill();
  o.fillStyle='#7a7266';o.beginPath();o.moveTo(lx+8,lt);o.lineTo(lx+lw/2,lt-20);o.lineTo(lx+lw-8,lt);o.closePath();o.fill();o.fillStyle='#ffd166';o.font='900 7px sans-serif';o.textAlign='center';o.fillText('도서관',lx+lw/2,lt-4);
  o.fillStyle='rgba(255,240,210,.3)';o.beginPath();o.moveTo(lx-6,lt+2);o.lineTo(lx+lw/2,lt-26);o.lineTo(lx+lw/2,lt-24);o.lineTo(lx-3,lt+2);o.fill();
  for(let i=0;i<3;i++){o.fillStyle=hsl(30,8,46-i*4);o.fillRect(lx+lw/2-22-i*5,b-6+i*2,44+i*10,2.4)}
  /* 종탑 집 */house(o,1324,b,96,{fl:2,fh:28,rh:24,wall:['#e0d8d0','#a8a098'],roof:200,door:42,dc:['#2a3a4a','#4a5a6a'],sh:'#2a4a6a',box:1,wins:[[12,0,10,13],[72,0,10,13],[12,1,10,12],[42,1,10,12],[72,1,10,12]]},rec,chim);
  const tx=1360,tt=b-56-24-40;K.stones(o,tx,tt,24,40,[30,12,40],5,6,6,10);o.fillStyle='#14100c';K.arch(o,tx+5,tt+6,14,18,'#14100c');o.fillStyle='#c8a050';o.beginPath();o.moveTo(tx+12,tt+10);o.quadraticCurveTo(tx+6,tt+20,tx+7,tt+22);o.lineTo(tx+17,tt+22);o.quadraticCurveTo(tx+18,tt+20,tx+12,tt+10);o.fill();o.fillStyle='#ffe08a';o.fillRect(tx+9,tt+14,1,6);
  o.fillStyle='#3a5a6a';o.beginPath();o.moveTo(tx-3,tt);o.lineTo(tx+12,tt-22);o.lineTo(tx+27,tt);o.closePath();o.fill();o.fillStyle='#5a7a8a';o.beginPath();o.moveTo(tx-3,tt);o.lineTo(tx+12,tt-22);o.lineTo(tx+12,tt);o.closePath();o.fill();o.fillStyle='#d8b060';o.fillRect(tx+11.4,tt-28,1.2,7);o.beginPath();o.arc(tx+12,tt-29,1.6,0,TAU);o.fill();
  /* 찻집 */house(o,1424,b,92,{fl:2,fh:27,rh:24,wall:['#f4e4d4','#c8a890'],beam:'#4a2a1a',roof:150,chim:70,door:14,dc:['#2a4a2a','#3a6a3a'],sign:'찻집',sbg:'#2a4a2a',sfg:'#c8ffe4',sh:'#3a6a3a',box:1,lamp:1,wins:[[44,0,26,13],[14,1,10,12],[44,1,10,12],[70,1,10,12]]},rec,chim);
  for(const [cx,cy] of [[1444,b+12],[1490,b+14]]){o.fillStyle='rgba(0,0,0,.3)';o.beginPath();o.ellipse(cx+2,cy+2,10,3,0,0,TAU);o.fill();o.fillStyle='#e8e0d0';o.beginPath();o.ellipse(cx,cy-8,9,3.4,0,0,TAU);o.fill();o.fillStyle='#2a2a30';o.fillRect(cx-.6,cy-8,1.2,9);
   o.fillStyle='#3a6a3a';o.beginPath();o.moveTo(cx-12,cy-18);o.lineTo(cx,cy-26);o.lineTo(cx+12,cy-18);o.closePath();o.fill();o.fillStyle='#2a2a30';o.fillRect(cx-.5,cy-26,1,18);o.fillStyle='#fff';o.fillRect(cx-3,cy-10.4,2,1.6)}/* 바깥 탁자 · 파라솔 */}
 PB.extra.push(rowWest,rowEast);
 /* ---------- ② 걸어 다니는 곳의 건물(두 배 해상도로 미리) ---------- */
 const SS=2;function pre(w,h,fn){const cv=document.createElement('canvas');cv.width=w*SS;cv.height=h*SS;const o=cv.getContext('2d');o.scale(SS,SS);fn(o);return cv}
 const BLD=[];/* {x,y(바닥),w,h,ax,ay,cv,make} */
 function addB(x,y,w,h,ax,ay,make,ob){BLD.push({x,y,w,h,ax,ay,make,cv:null});if(ob)z.OBST.push(ob)}
 /* 배 창고(호숫가) */addB(1420,884,110,96,55,92,o=>{const x=6,b=90,w=96;const loc=(lx,ly)=>[1420-55+lx,884-92+ly];const R2=(lx,ly,r)=>{const [a,c]=loc(lx,ly);WIN.push([a,c,r])};
  o.fillStyle='rgba(0,0,0,.4)';o.fillRect(x+3,b-2,w,5);
  /* 가로 판자 벽 */for(let y=b-50;y<b;y+=4){o.fillStyle=hsl(rr(22,30),rr(30,40),rr(26,34));o.fillRect(x,y,w,3.6);o.fillStyle='rgba(255,230,190,.15)';o.fillRect(x,y,w,.6);o.fillStyle='rgba(0,0,0,.3)';o.fillRect(x,y+3.4,w,.4);for(let k=0;k<3;k++){o.fillStyle='rgba(0,0,0,.2)';o.fillRect(x+rr(0,w),y+1,.6,2.4)}}
  o.fillStyle=lin(o,x,0,x+w,0,[[0,'rgba(0,0,0,.35)'],[.4,'rgba(255,220,180,.08)'],[1,'rgba(0,0,0,.45)']]);o.fillRect(x,b-50,w,50);
  /* 박공(세모 벽) */o.fillStyle=hsl(26,32,30);o.beginPath();o.moveTo(x,b-50);o.lineTo(x+w/2,b-82);o.lineTo(x+w,b-50);o.closePath();o.fill();for(let k=0;k<12;k++){o.fillStyle='rgba(0,0,0,.18)';o.fillRect(x+w/2-k*4,b-82+k*2.7,k*8,.6)}
  win(o,x+w/2-6,b-72,12,10,{lit:true},R2);
  /* 지붕 끝 판 */o.strokeStyle='#2a1a0e';o.lineWidth=3;o.beginPath();o.moveTo(x-6,b-46);o.lineTo(x+w/2,b-86);o.lineTo(x+w+6,b-46);o.stroke();o.strokeStyle='#5a3a20';o.lineWidth=1.2;o.stroke();
  /* 큰 문 · 안의 배 */o.fillStyle='#0e0a08';o.fillRect(x+30,b-40,36,40);o.fillStyle='#6a3a20';o.beginPath();o.moveTo(x+34,b-8);o.lineTo(x+62,b-9);o.lineTo(x+58,b-3);o.lineTo(x+37,b-3);o.closePath();o.fill();o.fillStyle='rgba(255,180,100,.15)';o.fillRect(x+30,b-40,36,40);
  for(const dx of [x+22,x+66]){o.fillStyle='#5a3a20';o.fillRect(dx,b-40,8,40);for(let k=0;k<4;k++){o.fillStyle='rgba(0,0,0,.3)';o.fillRect(dx,b-40+k*10,8,.6)}o.fillStyle='#2a2a30';o.fillRect(dx+1,b-30,6,1.4);o.fillRect(dx+1,b-12,6,1.4)}
  /* 구명 튜브 · 밧줄 · 노 */o.strokeStyle='#e8e0d0';o.lineWidth=2.4;o.beginPath();o.arc(x+12,b-28,5,0,TAU);o.stroke();o.strokeStyle='#c83a3a';o.lineWidth=2.4;for(let k=0;k<4;k++){o.beginPath();o.arc(x+12,b-28,5,k*Math.PI/2,k*Math.PI/2+.5);o.stroke()}
  o.strokeStyle='#c8a870';o.lineWidth=1;for(let k=0;k<3;k++){o.beginPath();o.ellipse(x+84,b-24,4-k,3-k*.6,0,0,TAU);o.stroke()}
  o.save();o.translate(x+92,b-6);o.rotate(-.25);o.fillStyle='#8a6038';o.fillRect(-1,-30,2,30);o.fillRect(-2.4,-36,4.8,8);o.restore();
  /* 지붕 등 */o.fillStyle='#1e1e24';o.fillRect(x+w/2-1,b-45,2,4);o.fillStyle='#ffcf6a';o.fillRect(x+w/2-2,b-46,4,4);R2(x+w/2,b-44,10);
  o.fillStyle='#e8e0d0';o.font='800 6px sans-serif';o.textAlign='center';o.fillText('배 창고',x+w/2,b-54)},{x:1371,y:870,w:98,h:16});
 /* 통나무집(숲) */addB(-60,1210,108,98,54,94,o=>{const x=8,b=92,w=92;const R2=(lx,ly,r)=>WIN.push([-60-54+lx,1210-94+ly,r]);
  o.fillStyle='rgba(0,0,0,.45)';o.fillRect(x+3,b-2,w,6);
  /* 돌 굴뚝 */o.fillStyle='#4a4644';o.fillRect(x+w-18,b-86,12,86);for(let y=b-86;y<b;y+=4)for(let k=0;k<3;k++){o.fillStyle=hsl(30,rr(4,10),rr(28,44));o.beginPath();o.ellipse(x+w-15+k*4+((y/4)%2?1.5:0),y+2,2,1.6,0,0,TAU);o.fill()}CHIM.push([-60-54+x+w-12,1210-94+b-88]);
  /* 통나무 벽 */for(let y=b-44;y<b;y+=5){const g=lin(o,0,y,0,y+5,[[0,'#8a5a30'],[.5,'#6a4220'],[1,'#3a2410']]);o.fillStyle=g;o.fillRect(x,y,w-12,5);
   for(const ex of [x-3,x+w-15]){o.fillStyle='#a8784a';o.beginPath();o.ellipse(ex+1.5,y+2.5,2.8,2.5,0,0,TAU);o.fill();o.strokeStyle='#6a4220';o.lineWidth=.4;o.beginPath();o.arc(ex+1.5,y+2.5,1.4,0,TAU);o.stroke()}}
  /* 지붕(나무판 + 이끼) */o.fillStyle='#3a2a1a';o.beginPath();o.moveTo(x-8,b-42);o.lineTo(x+(w-12)/2,b-76);o.lineTo(x+w,b-42);o.closePath();o.fill();
  for(let r=0;r<10;r++){const y=b-74+r*3.3;const half=(r+1)*((w-12)/2+8)/10;for(let xx=x+(w-12)/2-half;xx<x+(w-12)/2+half;xx+=4){o.fillStyle=hsl(rr(20,30),rr(25,40),rr(18,30));o.fillRect(xx,y,3.6,3.2)}}
  for(let k=0;k<30;k++){o.fillStyle=hsl(rr(90,120),rr(35,50),rr(20,32),.8);o.beginPath();o.arc(rr(x,x+w-10),rr(b-62,b-43),rr(1,2.6),0,TAU);o.fill()}
  /* 창 · 문 · 현관 */win(o,x+12,b-34,12,11,{lit:true,sh:'#4a2a18'},R2);door(o,x+46,b-28,14,24,['#4a2c16','#6a4024']);
  o.fillStyle='#5a3a20';o.fillRect(x-2,b-2,w-8,3);o.fillStyle='#3a2414';o.fillRect(x+40,b-40,2,38);o.fillRect(x+64,b-40,2,38);
  o.fillStyle='#6a4a2a';o.fillRect(x+70,b-10,12,8);o.fillStyle='#8a6a3a';o.fillRect(x+70,b-11,12,1.4);/* 장작 */for(let k=0;k<5;k++){o.fillStyle='#a8784a';o.beginPath();o.arc(x+4+k*5,b-4,2.2,0,TAU);o.fill();o.fillStyle='#6a4220';o.beginPath();o.arc(x+4+k*5,b-4,.8,0,TAU);o.fill()}
  o.save();o.translate(x+30,b-6);o.rotate(.5);o.fillStyle='#6a4a2a';o.fillRect(-.8,-14,1.6,14);o.fillStyle='#8a8a96';o.fillRect(-3,-15,5,3);o.restore()},{x:-114,y:1196,w:94,h:16});
 /* 매표소(회전목마) */addB(905,880,46,62,23,58,o=>{const x=5,b=56,w=36;o.fillStyle='rgba(0,0,0,.4)';o.fillRect(x+2,b-2,w,4);
  o.fillStyle=lin(o,x,0,x+w,0,[[0,'#8a2a4a'],[.5,'#c8486a'],[1,'#6a1a3a']]);o.fillRect(x,b-30,w,30);for(let k=0;k<6;k++){o.fillStyle='rgba(255,255,255,.08)';o.fillRect(x+k*6+3,b-30,1.4,30)}
  o.fillStyle='#ffe8b0';o.fillRect(x+6,b-26,w-12,13);o.fillStyle='#2a1a2a';o.fillRect(x+6,b-13,w-12,2);o.fillStyle='#ffd8b0';o.beginPath();o.arc(x+w/2,b-19,3,0,TAU);o.fill();o.fillStyle='#3a2a6a';o.fillRect(x+w/2-4,b-16,8,4);o.fillStyle='#d8b060';o.fillRect(x+w/2-4,b-23,8,1.6);
  for(let k=0;k<6;k++){o.fillStyle=k%2?'#f4ece0':'#c8283c';o.beginPath();o.moveTo(x-4+k*7.3,b-34);o.lineTo(x+3.3+k*7.3,b-34);o.lineTo(x+4+k*7.3,b-28);o.lineTo(x-4.6+k*7.3,b-28);o.fill();o.beginPath();o.arc(x-.3+k*7.3,b-28,3.6,0,Math.PI);o.fill()}
  o.fillStyle='#c8283c';o.beginPath();o.moveTo(x-4,b-34);o.lineTo(x+w/2,b-50);o.lineTo(x+w+4,b-34);o.closePath();o.fill();o.fillStyle='#f4ece0';for(let k=0;k<3;k++){o.beginPath();o.moveTo(x+w/2,b-50);o.lineTo(x+k*14,b-34);o.lineTo(x+k*14+6,b-34);o.closePath();o.fill()}
  o.fillStyle='#ffd166';o.beginPath();o.arc(x+w/2,b-51,2,0,TAU);o.fill();o.fillStyle='#2a1a2a';o.fillRect(x+4,b-8,w-8,6);o.fillStyle='#ffd166';o.font='800 5px sans-serif';o.textAlign='center';o.fillText('매표소',x+w/2,b-3.4);WIN.push([905-23+x+w/2,880-58+b-20,14])},{x:886,y:872,w:38,h:10});
 /* ---------- ③ 시장 소품 · 우물 ---------- */
 const PROP=[];
 function crate(o,x,y,s){o.fillStyle='rgba(0,0,0,.35)';o.fillRect(x-s/2+1,y-1,s,3);o.fillStyle=lin(o,0,y-s,0,y,[[0,'#a87a48'],[1,'#6a4424']]);o.fillRect(x-s/2,y-s,s,s);o.strokeStyle='#4a2c16';o.lineWidth=.8;o.strokeRect(x-s/2+.4,y-s+.4,s-.8,s-.8);o.beginPath();o.moveTo(x-s/2,y-s);o.lineTo(x+s/2,y);o.stroke();o.fillStyle='rgba(255,230,190,.25)';o.fillRect(x-s/2,y-s,s,.8)}
 function barrel(o,x,y){o.fillStyle='rgba(0,0,0,.35)';o.beginPath();o.ellipse(x+1,y,6,2,0,0,TAU);o.fill();o.fillStyle=lin(o,x-5,0,x+5,0,[[0,'#4a2c16'],[.4,'#9a6a3a'],[1,'#3a2210']]);o.beginPath();o.moveTo(x-4.4,y);o.quadraticCurveTo(x-6,y-6,x-4.4,y-12);o.lineTo(x+4.4,y-12);o.quadraticCurveTo(x+6,y-6,x+4.4,y);o.closePath();o.fill();
  o.fillStyle='#2a2a30';o.fillRect(x-5.4,y-9.6,10.8,1.2);o.fillRect(x-5.4,y-3,10.8,1.2);o.fillStyle='#7a5030';o.beginPath();o.ellipse(x,y-12,4.4,1.4,0,0,TAU);o.fill();o.fillStyle='rgba(0,0,0,.3)';o.beginPath();o.ellipse(x,y-12,3,.8,0,0,TAU);o.fill()}
 function sack(o,x,y,c){o.fillStyle='rgba(0,0,0,.3)';o.beginPath();o.ellipse(x+1,y,5,1.6,0,0,TAU);o.fill();o.fillStyle=lin(o,x-4,0,x+4,0,[[0,'#8a7a5a'],[.4,'#d8c8a0'],[1,'#7a6a4a']]);o.beginPath();o.moveTo(x-4.6,y);o.quadraticCurveTo(x-5.4,y-7,x-2,y-9);o.lineTo(x+2,y-9);o.quadraticCurveTo(x+5.4,y-7,x+4.6,y);o.closePath();o.fill();
  o.fillStyle='#5a4a30';o.fillRect(x-2,y-9.4,4,1);if(c){o.fillStyle=c;o.beginPath();o.ellipse(x,y-9.6,2.6,1,0,0,TAU);o.fill()}}
 function basket(o,x,y,c){o.fillStyle='rgba(0,0,0,.3)';o.beginPath();o.ellipse(x+1,y,6,1.8,0,0,TAU);o.fill();o.fillStyle='#a87a40';o.beginPath();o.moveTo(x-6,y-5);o.lineTo(x+6,y-5);o.lineTo(x+4.4,y);o.lineTo(x-4.4,y);o.closePath();o.fill();o.strokeStyle='#6a4a20';o.lineWidth=.4;for(let k=0;k<3;k++){o.beginPath();o.moveTo(x-5.6+k*.6,y-4+k*1.4);o.lineTo(x+5.6-k*.6,y-4+k*1.4);o.stroke()}
  for(let k=0;k<5;k++){o.fillStyle=c[k%c.length];o.beginPath();o.arc(x-4+k*2,y-5.6-(k%2),1.6,0,TAU);o.fill()}}
 for(const [sx,sy,i] of PB.STALLS){const side=i%2?-1:1,px=sx+side*44;PROP.push({x:px,y:sy,k:i});z.OBST.push({x:px-8,y:sy-6,w:16,h:7})}
 const WELL={x:-320,y:462};z.OBST.push({x:1444,y:188,r:9,ky:1.6},{x:1490,y:190,r:9,ky:1.6});/* 찻집 탁자 */z.OBST.push({x:WELL.x,y:WELL.y,r:15,ky:1.6});
 function props(o,p){const x=p.x,y=p.y;if(p.k%4===0){barrel(o,x-4,y);barrel(o,x+5,y-1)}else if(p.k%4===1){crate(o,x-3,y,10);crate(o,x+5,y+1,8);sack(o,x,y-9,null)}else if(p.k%4===2){sack(o,x-4,y,'#e8e0c0');sack(o,x+4,y+1,'#c8a060')}else{basket(o,x-4,y,['#d02a2a','#e8a020']);basket(o,x+5,y+1,['#5a8a2a','#c8d040'])}}
 function well(o,now){const {x,y}=WELL;o.fillStyle='rgba(0,0,0,.35)';o.beginPath();o.ellipse(x+3,y+3,17,6,0,0,TAU);o.fill();
  o.fillStyle='#14100c';o.beginPath();o.ellipse(x,y-8,11,4,0,0,TAU);o.fill();o.fillStyle='rgba(60,110,150,.6)';o.beginPath();o.ellipse(x,y-7,8,2.6,0,0,TAU);o.fill();
  for(let r=0;r<3;r++)for(let k=0;k<9;k++){const a=Math.PI*(k/8),xx=x-Math.cos(a)*13,yy=y-8+r*3.4+Math.sin(a)*4.4;o.fillStyle=hsl(30,rr(6,12),rr(34,50));o.beginPath();o.ellipse(xx,yy,2.6,1.8,0,0,TAU);o.fill()}
  o.fillStyle='#4a2c16';o.fillRect(x-13,y-30,2.4,24);o.fillRect(x+10.6,y-30,2.4,24);o.fillStyle='#6a3a2a';o.beginPath();o.moveTo(x-17,y-28);o.lineTo(x,y-38);o.lineTo(x+17,y-28);o.lineTo(x+15,y-26);o.lineTo(x,y-34);o.lineTo(x-15,y-26);o.closePath();o.fill();
  o.fillStyle='#3a2414';o.fillRect(x-11,y-24,22,2);const sw=Math.sin(now/700)*1.2;o.strokeStyle='#c8a870';o.lineWidth=.5;o.beginPath();o.moveTo(x,y-23);o.lineTo(x+sw,y-15);o.stroke();o.fillStyle='#6a4a2a';o.fillRect(x-2+sw,y-15,4,4);o.fillStyle='#2a2a30';o.fillRect(x-2.2+sw,y-14,4.4,.6)}
 /* 그림 기억(소품 · 우물 위 지붕은 매 프레임 가벼움) */const PC={};
 function propImg(p){const k=p.k;if(PC[k])return PC[k];PC[k]=pre(24,22,o=>props(o,{x:12,y:20,k}));return PC[k]}
 /* ---------- 물체 감싸기 ---------- */
 {const f=A.objs;A.objs=function(now){const L=f.apply(this,arguments)||[];try{const cam=z.S.cam,V=(x,y,m)=>PB.vis(cam,x,y,m);
   for(const B of BLD){if(!V(B.x,B.y-B.h/2,B.w))continue;if(!B.cv)B.cv=pre(B.w,B.h,B.make);L.push({y:B.y,fn:()=>ctx.drawImage(B.cv,B.x-B.ax,B.y-B.ay,B.w,B.h)})}
   for(const p of PROP)if(V(p.x,p.y,30))L.push({y:p.y,fn:()=>ctx.drawImage(propImg(p),p.x-12,p.y-20,24,22)});
   if(V(WELL.x,WELL.y,40))L.push({y:WELL.y,fn:()=>well(ctx,now)})}catch(e){}return L}}
 /* ---------- 빛 · 연기 · 대장간 불 ---------- */
 {const f=A.over;A.over=function(c,now,cam){f.apply(this,arguments);try{const t=now/1000,V=(x,y,m)=>PB.vis(cam,x,y,m);c.save();c.globalCompositeOperation='lighter';
   for(const [x,y,r] of WIN){if(!V(x,y,r))continue;const fl=.8+.2*Math.sin(t*2.3+x*.7)*Math.sin(t*1.7+y);const R=r*1.3,g=c.createRadialGradient(x,y,0,x,y,R);g.addColorStop(0,'rgba(255,200,120,'+(.3*fl)+')');g.addColorStop(1,'rgba(255,170,90,0)');c.fillStyle=g;c.fillRect(x-R,y-R,R*2,R*2)}
   for(const [x,y] of FORGE){if(!V(x,y,60))continue;const fl=.7+.3*Math.sin(t*9)*Math.sin(t*5.3);const g=c.createRadialGradient(x,y,0,x,y,40);g.addColorStop(0,'rgba(255,140,50,'+(.55*fl)+')');g.addColorStop(1,'rgba(255,100,30,0)');c.fillStyle=g;c.fillRect(x-40,y-40,80,80);
    for(let i=0;i<6;i++){const q=(t*.9+i/6)%1;c.fillStyle='rgba(255,'+Math.round(200-q*120)+',60,'+(1-q)+')';c.fillRect(x+Math.sin(t*4+i*2)*6*q,y-4-q*18,1,1)}}
   c.restore();
   for(const [x,y] of CHIM){if(!V(x,y-30,50))continue;for(let i=0;i<6;i++){const q=(t*.22+i/6)%1;c.fillStyle='rgba(150,140,150,'+(.22*(1-q))+')';c.beginPath();c.arc(x+Math.sin(t*.8+i)*3+q*14,y-q*46,2.4+q*8,0,TAU);c.fill()}}}catch(e){}}}
 window.PT157={v:1,WIN,CHIM,BLD,PROP,WELL};
}catch(e){console.error('v157 plaza town',e)}})();
