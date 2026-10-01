/* ================= 컷신 강화: 카메라 · 큰 초상화(표정) · 긴 이야기 · 진 엔딩 · 크레딧 ================= */
/* ---------- 카메라 (천천히 다가가기 + 줄마다 초점) ---------- */
let _camCv=null;
function memApplyCam(c,now,S){if(typeof document==='undefined')return;const ln=memLine(c),o=(ln&&ln[2])||{},tg=o.cam||(Array.isArray(S.cam)?S.cam:null)||[W/2,H/2,1],st=(now-(c.st0||now))/1000;
 if(!c.cam||c.camSi!==c.si){c.cam=tg.slice();c.camSi=c.si}const dt=Math.min(.1,(now-(c.camT||now))/1000);c.camT=now;const kk=1-Math.exp(-dt*2.2);for(let i=0;i<3;i++)c.cam[i]+=(tg[i]-c.cam[i])*kk;
 const z=c.cam[2]*(1+Math.min(.06,st*.006)),fx=clamp(c.cam[0],0,W),fy=clamp(c.cam[1],0,H);if(z<1.003)return;
 if(!_camCv){_camCv=document.createElement('canvas')}if(_camCv.width!==cv.width){_camCv.width=cv.width;_camCv.height=cv.height}const x=_camCv.getContext('2d');x.drawImage(cv,0,0);
 ctx.save();ctx.imageSmoothingEnabled=false;ctx.drawImage(_camCv,0,0,cv.width,cv.height,fx-fx*z,fy-fy*z,W*z,H*z);ctx.restore()}
/* ---------- 초상화 ---------- */
function ell(cx,cy,rx,ry,col,a){for(let dy=-ry;dy<=ry;dy++){const w=rx*Math.sqrt(Math.max(0,1-(dy/ry)**2));RA(cx-w,cy+dy,w*2,1,col,a==null?1:a)}}
const BUST_SIDE={'윤서':'R','???':'R','태초의 굶주림':'R','하루':'L','똑딱':'L','선':'L','선 할아버지':'L','태엽지기 선':'L','선 (편지)':'L'};
function bustWho(spk){if(!spk)return null;if(spk==='선'||spk.indexOf('선 ')===0||/ 선$/.test(spk))return '선';if(spk==='???'||spk==='태초의 굶주림')return '괴물';return ['윤서','하루','똑딱'].includes(spk)?spk:null}
function memBusts(c,now,baseY){const ln=memLine(c);if(!ln)return;const who=bustWho(ln[0]);const o=ln[2]||{};
 if(who!==c.bWho){c.bPrev=c.bWho;c.bPrevE=c.bE;c.bPrevT=now;c.bWho=who;c.bT=now}c.bE=o.e||'n';
 const talking=!memDone(c,now);
 if(c.bPrev&&now-c.bPrevT<260){const k=(now-c.bPrevT)/260,side=BUST_SIDE[c.bPrev==='괴물'?'???':c.bPrev]||'L',x=side==='L'?86-k*40:W-86+k*40;drawBust(c.bPrev,x,baseY,c.bPrevE||'n',now,side==='R',1-k,false)}
 if(!who)return;const k=Math.min(1,(now-c.bT)/260),e=k*k*(3-2*k),side=BUST_SIDE[who==='괴물'?'???':who]||'L',x=side==='L'?46+40*e:W-46-40*e;drawBust(who,x,baseY+Math.round(Math.sin(now/600)*1),c.bE,now,side==='R',e,talking)}
function drawBust(who,cx,by,e,now,flip,al,talk){ctx.save();ctx.globalAlpha=1;const A=al==null?1:al;if(A<=0){ctx.restore();return}
 const blink=!['close','hollow'].includes(e)&&(now%3600)<130,mo=talk&&Math.floor(now/110)%2===0,hy=by-66;
 const RR=(x,y,w,h,col,a)=>RA(flip?2*cx-x-w:x,y,w,h,col,(a==null?1:a)*A),EL=(x,y,rx,ry,col,a)=>{const xx=flip?2*cx-x:x;for(let dy=-ry;dy<=ry;dy++){const w=rx*Math.sqrt(Math.max(0,1-(dy/ry)**2));RA(xx-w,y+dy,w*2,1,col,(a==null?1:a)*A)}};
 // 은은한 뒷빛
 EL(cx,hy+10,58,56,'#000000',.25);
 if(who==='윤서'||who==='괴물'){const HR=who==='괴물'?'#8a3a5a':'#e8722a',HD=who==='괴물'?'#4a1a3a':'#b8521a',HL=who==='괴물'?'#b85a8a':'#ffa860',SK=who==='괴물'?'#c8a8b8':'#f0cfae',SKD=who==='괴물'?'#9a7a8a':'#d8a888';
  EL(cx,hy+8,30,36,HD);EL(cx,hy+4,29,32,HR);RR(cx-31,hy+10,10,44,HR);RR(cx+21,hy+10,10,44,HR);RR(cx-31,hy+10,3,44,HD);
  EL(cx,by+2,44,26,who==='괴물'?'#3a2a3a':'#f0f0ea');RR(cx-44,by-24,88,26,'#000',0);RR(cx-10,by-26,20,26,'#3a5a7a');RR(cx-3,by-26,6,12,SK);RR(cx-7,hy+20,14,16,SK);
  EL(cx,hy,23,26,SK);EL(cx+6,hy+4,16,20,SKD,.25);
  for(let i=-24;i<=24;i+=4){const L=8+((i*7+48)%9);for(let k=0;k<L;k++){const w=Math.max(1,5-k*.5);RR(cx+i-w/2+(i<0?k*.25:-k*.25),hy-26+k,w,1,k<2?HL:HR)}}
  RR(cx-26,hy-22,52,5,'#3a4a52');for(const s of [-11,11]){EL(cx+s,hy-22,7,6,'#2a3a42');EL(cx+s,hy-22,5,4,'#8ad0ff');RR(cx+s-3,hy-24,2,2,'#ffffff')}
  bustEyes(RR,EL,cx,hy+2,e,blink,who==='괴물'?'#ff2d55':'#c8782a',who==='괴물'?'hollow':e);
  bustMouth(RR,cx,hy+15,e,mo,'#a8505a');if(e==='smile'||e==='close'||e==='cry'){RR(cx-17,hy+9,6,2,'#ff9a9a',.5);RR(cx+11,hy+9,6,2,'#ff9a9a',.5)}
  if(who==='괴물'||e==='hollow'){for(let i=0;i<7;i++){const r=rng(i*11);let px=cx+(r()-.2)*22,py=hy-8+r()*30;for(let s=0;s<5;s++){const nx=px+(r()-.5)*8,ny=py+r()*6;bbLine(flip?2*cx-px:px,py,flip?2*cx-nx:nx,ny,'#8a2aff',.8*A);px=nx;py=ny}}EL(cx+10,hy+2,9,8,'#ff2d55',.15+.1*Math.sin(now/200))}}
 else if(who==='하루'){EL(cx,by+2,46,26,'#6ccaa9');RR(cx-46,by-8,92,2,'#3f8f7a');EL(cx,by-6,30,10,'#9fe8cc');RR(cx-9,hy+22,18,14,'#b8c4b0');
  for(let k=0;k<14;k++){const w=Math.max(1,10-k*.6);RR(cx-w/2+Math.sin(now/400+k*.3)*1,hy-30-k*1.5,w,2,k<3?'#ffb08a':'#ff8a5c')}
  EL(cx,hy,27,29,'#d8dcc8');EL(cx,hy-2,26,27,'#eef2dc');EL(cx-8,hy-12,10,8,'#ffffff',.6);RR(cx-22,hy-6,44,18,'#161c22');RR(cx-21,hy-5,42,16,'#1c2e38');
  const G2='#a6f5c6',ey=hy+3;
  for(const s of [-9,9]){if(blink){RR(cx+s-4,ey,8,1,G2);continue}
   if(e==='smile'||e==='close'){RR(cx+s-4,ey,2,1,G2);RR(cx+s-2,ey-2,4,1,G2);RR(cx+s+2,ey,2,1,G2)}
   else if(e==='sad'||e==='cry'){RR(cx+s-4,ey-1,8,4,G2);RR(cx+s+(s<0?-4:0),ey-2,4,2,'#1c2e38')}
   else if(e==='shock'){EL(cx+s,ey+1,4,4,G2);EL(cx+s,ey+1,1.5,1.5,'#1c2e38')}
   else if(e==='determined'){RR(cx+s-4,ey-1,8,4,G2);RR(cx+s+(s<0?0:-4),ey-2,4,2,'#1c2e38')}
   else{RR(cx+s-3,ey-2,6,5,G2);RR(cx+s-2,ey-1,2,2,'#ffffff')}}
  if(e==='cry')bustTears(RR,cx,ey+7,now,A);RR(cx-28,hy+14,56,4,'#b8c4b0')}
 else if(who==='똑딱'){const sw=Math.sin(now/300)*.35;for(let k=0;k<26;k++)RR(cx-1+Math.sin(sw)*k,hy-34-k,3,1,'#3a2a12');EL(cx+Math.sin(sw)*26,hy-60,4,4,'#c9a24a');
  for(let y=hy-34;y<by;y++){const w=24+(y-(hy-34))*.45;RR(cx-w/2,y,w,1,((y-hy)%10+10)%10<1?'#a88530':'#d4ae4a')}RR(cx-30,by-8,60,8,'#8a6a20');
  EL(cx,hy+4,19,19,'#8a6a20');EL(cx,hy+4,17,17,'#23394a');for(let i=0;i<12;i++){const a=i*TAU/12;RR(cx+Math.cos(a)*15-1,hy+4+Math.sin(a)*15-1,2,2,'#fff0c0')}
  if(blink){RR(cx-12,hy+4,24,2,'#6ad8f0')}else if(e==='smile'||e==='close'){for(let i=-10;i<=10;i++)RR(cx+i,hy+4-Math.round(Math.sqrt(100-i*i)*.6),2,3,'#6ad8f0')}
  else{const r=e==='shock'?13:10;EL(cx,hy+4,r,r,'#6ad8f0');EL(cx,hy+4,r-3,r-3,'#a8f0ff');EL(cx,hy+4,e==='shock'?3:5,e==='shock'?3:5,'#10202a');RR(cx-5,hy-3,4,4,'#ffffff');if(e==='sad'||e==='cry'){EL(cx,hy-6,14,6,'#23394a')}}
  if(e==='cry')bustTears(RR,cx,hy+18,now,A)}
 else if(who==='선'){EL(cx,by+2,46,26,'#7a4a28');RR(cx-12,by-24,24,24,'#4e2e18');RR(cx-8,hy+20,16,14,'#e0b894');
  EL(cx,hy,24,27,'#e8b894');EL(cx,hy-20,20,8,'#f0c8a0');EL(cx-24,hy+2,6,12,'#f0f0ee');EL(cx+24,hy+2,6,12,'#f0f0ee');
  RR(cx-16,hy-8,12,3,'#f0f0ee');RR(cx+4,hy-8,12,3,'#f0f0ee');
  for(const s of [-10,10]){EL(cx+s,hy+1,7,6,'#3a2a1a');EL(cx+s,hy+1,6,5,'#dff0f8');if(blink||e==='close'||e==='smile'){RR(cx+s-4,hy+1,8,1,'#3a2a1a')}else{EL(cx+s,hy+1,2,2,'#2a1a10')}}RR(cx-3,hy,6,1,'#3a2a1a');
  EL(cx,hy+20,20,16,'#f4f4f0');EL(cx,hy+30,14,12,'#f4f4f0');RR(cx-5,hy+13,10,2,mo?'#8a4a3a':'#c89a80');if(e==='cry'||e==='sad')bustTears(RR,cx,hy+7,now,A)}
 ctx.restore()}
function bustEyes(RR,EL,cx,ey,e,blink,iris,mode){for(const s of [-10,10]){const x=cx+s;
  if(mode==='hollow'){if(s>0){EL(x,ey,5,4,'#1a0010');EL(x,ey,3,3,'#ff2d55');RR(x-1,ey-1,1,1,'#ffffff')}else{RR(x-5,ey,10,1,'#3a1a2a');RR(x-4,ey+1,8,2,'#6a4a5a')}continue}
  const bro=e==='sad'||e==='cry'?(s<0?[1,-2]:[-2,1]):e==='determined'?(s<0?[-2,1]:[1,-2]):[0,0];for(let i=0;i<9;i++)RR(x-5+i,ey-9+Math.round(bro[0]+(bro[1]-bro[0])*i/8),1,2,'#8a3a1a');
  if(blink||e==='close'){for(let i=-4;i<=4;i++)RR(x+i,ey-Math.round(Math.sqrt(16-i*i)*.5),1,2,'#3a1a1a');continue}
  const big=e==='shock'?1:0;RR(x-5,ey-4-big,10,1,'#2a1418');RR(x-5,ey-3-big,10,8+big,'#ffffff');EL(x,ey+1,3+big,4+big,iris);EL(x,ey+1,1.5,2,'#2a1418');RR(x-3,ey-2,2,2,'#ffffff');
  if(e==='sad'||e==='cry'){RR(x-5,ey-4,10,3,'#f0cfae')}if(e==='cry')RR(x-5,ey+4,10,1,'#9ad8ff')}
 if(e==='cry')bustTears(RR,cx,ey+6,performance.now(),1)}
function bustMouth(RR,cx,y,e,mo,col){if(mo){RR(cx-3,y-1,6,4,'#6a2a2a');RR(cx-2,y+1,4,1,'#c86a6a');return}
 if(e==='smile'||e==='close'){RR(cx-4,y,8,1,col);RR(cx-5,y-1,1,1,col);RR(cx+4,y-1,1,1,col)}else if(e==='shock'){RR(cx-2,y-2,4,5,'#6a2a2a')}else if(e==='sad'||e==='cry'||e==='hollow'){RR(cx-3,y,6,1,col);RR(cx-4,y+1,1,1,col);RR(cx+3,y+1,1,1,col)}else RR(cx-3,y,6,1,col)}
function bustTears(RR,cx,y,now,A){for(const s of [-10,10])for(let i=0;i<3;i++){const q=((now/900)+i/3)%1;RR(cx+s-1+(s<0?-2:2)*q,y+q*22,2,3,'#9ad8ff',(1-q)*.9)}}
/* ---------- 새 장면 그림 ---------- */
function f0Workshop(now,k){const t=now/1000;memSky('#3a2a1a','#6a4a2a',0,H);for(let i=0;i<4;i++){const x=40+i*120;R(x,30,60,70,'#fff0c8');R(x,30,60,70,'#fff0c8');R(x+29,30,2,70,'#6a4a2a');R(x,64,60,2,'#6a4a2a');for(let j=0;j<40;j++)RA(x+10+j*1.5,100+j*2,20,2,'#fff0c8',.05)}
 bbGear(420,150,34,14,t*.4,'#8a6a3a','#2a1a10','#ffd166');bbGear(60,170,24,10,-t*.6,'#8a6a3a','#2a1a10','#ffd166');R(0,214,W,86,'#3a2414');
 R(150,176,200,8,'#8a5a30');R(160,184,6,30,'#5a3a20');R(334,184,6,30,'#5a3a20');R(170,160,160,18,'#dff0ff');for(let i=0;i<6;i++)R(176,164+i*2,60+((i*37)%80),1,'#6a8ab0');memRing(290,168,8,'#3a5a8a',.8);
 yunseo(250,214,3,t,1,'#3a5a7a');for(const [x,cl] of [[110,'#4a6a8a'],[380,'#6a4a3a']])memPerson(x,214,cl,'#2a1a10','hammer',t*10+x,false,2.4)}
function yunseoC(x,y,s,t,a,body){ctx.save();ctx.globalAlpha=a==null?1:a;memPerson(x,y,body||'#f0f0ea','#e8722a','hold',t,true,s);R(x-2*s,y-12*s,4*s,1*s,'#3a4a52');R(x-1.5*s,y-12.5*s,1.2*s,1*s,'#8ad0ff');R(x+.5*s,y-12.5*s,1.2*s,1*s,'#8ad0ff');ctx.restore()}
function fLetters(now,k){const t=now/1000;memSky('#0a0c18','#141a2a',0,H);R(300,40,120,110,'#1a2438');for(let i=0;i<40;i++){const q=((t*1.2)+i/40)%1;RA(300+((i*29)%120),40+q*110,1,5,'#8aa8d8',.5)}R(300,40,120,3,'#3a2a1a');R(358,40,3,110,'#3a2a1a');R(300,94,120,3,'#3a2a1a');
 R(80,190,260,8,'#5a3a24');R(90,198,5,40,'#3a2414');R(326,198,5,40,'#3a2414');R(230,170,2,20,'#e8e0d0');pcirc(231,168,2.5,'#ffcf6a');glow(231,170,50,'#ffb050',.3+.05*Math.sin(t*9));
 const n=Math.floor(3+k*14);for(let i=0;i<n;i++)R(100+(i%6)*18,186-Math.floor(i/6)*3,16,3,i%2?'#e8dcc0':'#d8ccb0');R(170,182,30,8,'#f4ecd8');for(let i=0;i<3;i++)R(174,184+i*2,20,1,'#8a7a5a');
 yunseoC(210,238,2.6,t,1,'#3a5a7a')}
function fWatch(now,k){const t=now/1000;memSky('#0a1424','#1a2a40',0,H);for(let i=0;i<60;i++){const r=rng(i*13),q=((t*.1)+r())%1;RA(r()*W,q*H,1,1,'#e8f0ff',.7)}
 memBoss(OMEGA_BI,340,230,now,2.2,Math.pow(1-((t*1.2)%1),3)*.5);R(0,232,W,68,'#141c28');
 memPerson(250,232,'#6a4a2a','#3a2a1a','hold',0,false,2.6);bbLine(258,212,300,190,'#ffd166');
 R(40,40,140,110,'#05080e');for(let i=0;i<20;i++){const r=rng(i*3);pcirc(40+r()*140,40+r()*110,6+r()*10,'#0a0e16',.9)}
 const ea=.6+.3*Math.sin(t*1.5);R(98,92,3,2,'#ff4dd2');R(108,92,3,2,'#ff4dd2');glow(104,93,14,'#ff4dd2',.2*ea);
 R(150,226,10,8,'#8a8a90');R(152,222,6,4,'#6a6a70');if(k>.5)glow(155,228,12,'#ffe9a8',.3)}
function fLastPage(now,k){const t=now/1000;R(0,0,W,H,'#2a1a10');R(60,24,360,200,'#e8dcc0');R(60,24,360,3,'#f4ecd8');for(let i=0;i<14;i++)R(76,44+i*13,328,1,'#c8b898');
 ctx.save();ctx.font='bold 12px '+SERIF;ctx.fillStyle='#4a2a1a';const lines=['언젠가 태엽지기의 아이가','이 옥상까지 올라온다면,','망설이지 말고 나를 멈춰 줘.','','오메가에게 전해 줘.','약속을 못 지켜서 미안하다고.','                         — 윤서'];
 const n=Math.floor(k*lines.length*1.2+1);lines.slice(0,n).forEach((l,i)=>{ctx.save();ctx.translate(90,58+i*20);ctx.rotate(Math.sin(i*3.1)*.012+(i>3?.01:0));ctx.fillText(l,Math.sin(t*20+i)*.3*(i>2?1:0),0);ctx.restore()});ctx.restore();
 for(let i=0;i<3;i++){const x=140+i*110,y=110+i*30;pcirc(x,y,6+i,'#b8a888',.35)}}
function e1Plaza(now,k){const t=now/1000;memSky('#ffb88a','#ffe8c8',0,160);pcirc(120,150,30,'#fff4c8');glow(120,150,90,'#fff0c0',.35);
 R(0,160,W,140,'#8a7a68');for(let y=166;y<300;y+=8)for(let x=((y/8)%2)*8;x<W;x+=16)R(x,y,14,6,'#948470');
 const X=W/2;R(X-24,20,48,140,'#8a7a8a');for(let k2=0;k2<14;k2++){const ww=56-k2*4;R(X-ww/2,20-k2*2,ww,2,'#7a2a3a')}const sw=Math.sin(t*3)*.4;ctx.save();ctx.translate(X,40);ctx.rotate(sw);R(-9,0,18,15,'#ffd166');R(-10,14,20,3,'#ffe9a8');ctx.restore();memRing(X,48,20+((t*60)%40),'#fff6d0',.6*(1-((t*60)%40)/40));
 for(let s=0;s<W;s+=10){const y=70+Math.sin(s/W*Math.PI)*20;bbTriV(s,y,7,7,['#ff4d6d','#ffd166','#4dc3ff','#7dff9a','#b89cff'][(s/10)%5],1)}
 const ids=Object.keys(V_LOOK);ids.forEach((id,i)=>{const x=40+i*44,y=250+(i%2)*14,L=V_LOOK[id];vDrawPerson(id,L,V_SKIN[i%4],x,y,2,now+i*100,false,x>W/2,false);if(Math.floor(now/400+i)%2===0)R(x-1,y-50,2,5,'#ffd166')});
 for(let i=0;i<30;i++){const q=((t*.3)+i/30)%1;RA((i*67)%W,q*H,2,2,['#ff4d6d','#ffd166','#4dc3ff','#7dff9a'][i%4],.9)}}
function e2Memorial(now,k){const t=now/1000;memSky('#ffd8a8','#fff0d8',0,170);R(0,170,W,130,'#8a7a68');
 const X=W/2;R(X-30,196,60,16,'#9a9aa2');R(X-24,184,48,14,'#b0b0b8');ctx.save();ctx.globalAlpha=1;memPerson(X,184,'#c8c8d0','#b8b8c0','hold',0,true,3);ctx.restore();R(X-6,148,12,2,'#8a8a92');RR2(X,149);
 for(let i=0;i<12;i++){const x=X-36+i*6;R(x,206,2,6,'#4a8a3a');pcirc(x+1,204,2.5,['#ff6a8a','#ffd166','#ffffff','#b89cff'][i%4])}
 ctx.font='bold 8px '+SERIF;ctx.textAlign='center';ctx.fillStyle='#3a3a44';ctx.fillText('기술장 윤서 — 좋은 아침',X,209);ctx.textAlign='left';
 memPerson(140,250,'#6a4a2a','#d8d8d8','none',0,false,3,'#e8e8e8');try{drawKnight(ctx,300,232,2.6,true,null,t*2)}catch(e){}try{drawTick(ctx,345,196+Math.sin(t*3)*3,now,1.5)}catch(e){}
 for(let i=0;i<14;i++){const q=((t*.2)+i/14)%1;RA(X-40+((i*29)%80),200-q*150,2,2,'#ffe9b0',(1-q)*.8)}}
function RR2(x,y){R(x-8,y,16,3,'#3a4a52');R(x-6,y-1,4,3,'#8ad0ff');R(x+2,y-1,4,3,'#8ad0ff')}
function e3Winding(now,k){const t=now/1000;memSky('#1a2438','#3a4a68',0,H);for(let i=0;i<70;i++){const r=rng(i*7),q=((t*.1)+r())%1;RA(r()*W,q*H,1,1,'#ffffff',.8)}
 try{drawOmegaTrue(ctx,320,236,now,{pulse:Math.pow(1-((t*1.2)%1),3)},3)}catch(e){}R(0,236,W,64,'#1a2230');
 try{drawKnight(ctx,150,212,2.8,false,null,t*2)}catch(e){}const a=t*3;bbLine(185,195,236,178,'#ffd166');const bw=Math.abs(Math.cos(a))*6+1;for(let yy=-6;yy<=6;yy++){const ww=Math.sqrt(Math.max(0,36-yy*yy))*bw/6;R(180-ww,195+yy,ww*2,1,'#ffd166')}
 try{drawTick(ctx,120,170+Math.sin(t*3)*3,now,1.6)}catch(e){}R(90,226,12,10,'#8a8a90');R(92,222,8,4,'#6a6a70');glow(96,230,10,'#ffe9a8',.25)}
function eCredits(now,k,c){const t=(now-(c.st0||now))/1000;const sky=mixc('#0a0c20','#ffb88a',Math.min(1,t/40));memSky(sky,mixc('#1a1830','#ffe8c8',Math.min(1,t/40)),0,H);
 R(0,238,W,62,'#1a1420');for(let i=0;i<20;i++){const x=((i*70+t*24)%(20*70))-60;if(x<-40||x>W+40)continue;try{drawMech(ctx,BOSSES[i],x,262,now,{pulse:0,expose:false,open:0,eye:0,dorm:false,flash:false,warn:0},1.3)}catch(e){}}
 try{drawKnight(ctx,W/2-60,262,2,false,now/140,null)}catch(e){}try{drawTick(ctx,W/2-30,228+Math.sin(now/300)*3,now,1)}catch(e){}
 const nm=(saveData.name||'모험가');const L=[['BEAT BLADE · MACHINA',20,'#ffe9b0'],['',10],['— 등장인물 —',12,'#b8c8d8'],['하루 · 태엽지기의 손자',11],['똑딱 · 오메가의 첫 박동',11],['선 할아버지 · 태엽지기',11],['기술장 윤서 · 오메가를 만든 사람',11],['',10],['— 수호자들 —',12,'#b8c8d8']];
 BOSSES.forEach((B,i)=>L.push([B.name+' · '+BOSS_META[i].epi,10]));L.push(['',10],['— 시계골의 이웃들 —',12,'#b8c8d8']);V_NPC.forEach(n=>L.push([n.name,10]));
 L.push(['',10],['',10],['그리고, 끝까지 함께해 준',12],[nm+' 님께',16,'#ffd166'],['',10],['플레이해 주셔서 감사합니다.',13,'#ffe9b0']);
 let y=H-20-t*18;ctx.textAlign='center';for(const [tx,sz,col] of L){if(y>-20&&y<236){ctx.font=(sz>=12?'bold ':'')+sz+'px '+SERIF;ctx.fillStyle='#000';ctx.fillText(tx,W/2+1,y+1);ctx.fillStyle=col||'#ffffff';ctx.fillText(tx,W/2,y)}y+=sz+10}ctx.textAlign='left'}
function eFinal(now,k,c){const t=(now-(c.st0||now))/1000;memSky('#ffb88a','#fff4e0',0,H);pcirc(W/2,200,50+Math.min(20,t*4),'#fff6d0');glow(W/2,190,160,'#fff0c0',.4);R(0,230,W,70,'#6a5a58');
 const a=Math.min(1,t/1.5);ctx.save();ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='bold 34px '+SERIF;ctx.fillStyle='#6a3a2a';ctx.fillText('좋은 아침.',W/2,120);ctx.font='12px '+SERIF;ctx.fillStyle='#8a5a3a';ctx.fillText('— BEAT BLADE · MACHINA —',W/2,146);ctx.restore();ctx.textAlign='left';
 if(t>.2&&!c._bell){c._bell=1;sfx(392,2.2,'sine',.05,388);setTimeout(()=>sfx(523,2,'sine',.04,520),600);setTimeout(()=>sfx(659,2.4,'sine',.04,655),1200)}}
/* ---------- 긴 이야기: 윤서의 일기 (다시 씀) ---------- */
(function(){const S=(title,tone,draw,mel,st,lines,extra)=>Object.assign({title,tone,draw,mel,st,lines},extra||{});
 const NEW=[
 S('기술장 윤서','#ffcf8a',f0Workshop,['C5','E5','G5','E5','D5','F5','E5','C5'],430,[
  ['','삼백 년 전. 시계골에는 세상에서 가장 바쁜 공방이 있었다.',{cam:[250,170,1.1]}],
  ['윤서','톱니 하나라도 어긋나면 안 돼! 이 아이는 세상의 심장이 될 거니까.',{e:'determined',cam:[250,180,1.25]}],
  ['윤서','(설계도를 쓰다듬으며) …오메가. 네 이름이야. 마음에 들면 좋겠다.',{e:'smile',cam:[250,170,1.4]}],
  ['','사람들은 그녀를 "기술장"이라 불렀다. 그녀는 자기가 만든 기계를 전부 "우리 아이"라고 불렀다.',{cam:[240,150,1]}]]),
 S('마지막 열차','#d88aff',memS4,['E5','D5','C5','A4','C5','D5','E5','D5'],430,[
  ['','그리고 잠드는 병이 찾아왔다. 사람들은 산 아래로 피해야 했다.',{cam:[240,160,1]}],
  ['윤서','수호자들아, 잘 지켜 줘. 우리는 잠시만 떠났다 올게.',{e:'sad',cam:[190,160,1.3]}],
  ['윤서','(창가에서, 작게) …잠시만이야. 금방 돌아올게, 오메가.',{e:'cry',cam:[190,160,1.5]}]]),
 S('부치지 못한 편지','#8aa8d8',fLetters,['A4','C5','E5','C5','B4','G4','A4','E4'],480,[
  ['','산 아래 먼 도시. 윤서는 매일 밤 편지를 썼다.',{cam:[220,190,1.15]}],
  ['윤서','"오메가에게. 오늘은 비가 왔어. 너도 빗소리를 들을 수 있을까."',{e:'close',cam:[200,190,1.3]}],
  ['윤서','"수호자들에게. 모두 잘 지내니? 조금만, 조금만 더 기다려 줘."',{e:'smile'}],
  ['','편지는 한 통도 부쳐지지 않았다. 시계골로 가는 길은 이미 끊겨 있었다.',{cam:[200,180,1.05]}],
  ['','해가 바뀌어도 아무도 돌아가자고 말하지 않았다.'],
  ['윤서','…아무도 가지 않는다면— 나 혼자라도 가야 해.',{e:'determined',cam:[210,200,1.45]}]]),
 S('홀로 돌아온 길','#a8c8e8',f2Return,['A4','C5','E5','C5','B4','G4','A4','E4'],480,[
  ['','몇 해 뒤, 한 사람이 홀로 시계골로 돌아왔다. 등에는 무거운 공구 가방을 지고.',{cam:[300,160,1.1]}],
  ['윤서','오메가… 늦어서 미안해. 박동이 이렇게나 약해졌구나.',{e:'sad'}],
  ['윤서','태엽만으로는 모자라. 새 심장이 필요해. 세상을 전부 뛰게 할 만큼 커다란 심장이.',{e:'determined'}]]),
 S('시계탑 옥상','#b03aff',f3Roof,['E4','G4','B4','G4','A4','F4','E4','D4'],520,[
  ['윤서','찾았다. 이 옥상 아래에, 소리를 먹는 무언가가 잠들어 있어.',{e:'shock',cam:[240,215,1.4]}],
  ['윤서','이 굶주림을 박동으로 바꿀 수만 있다면… 오메가는 다시는 멈추지 않아.',{e:'n',cam:[200,200,1.1]}],
  ['윤서','실험이 필요해. 하지만 누구에게 이런 걸 시킬 수 있겠어.',{e:'sad'}],
  ['윤서','…그래. 나로 하자.',{e:'smile',cam:[140,210,1.6]}]]),
 S('실험','#9affc8',f4Exp,['C5','E5','G5','E5','D5','F5','E5','C5'],440,[
  ['','실험은 성공했다. 윤서의 몸 안에서, 굶주림은 박동이 되었다.',{cam:[170,150,1.3]}],
  ['윤서','느껴지니, 오메가? 이 박동이 너에게 닿고 있어.',{e:'smile',cam:[280,160,1.1]}],
  ['윤서','조금만… 조금만 더 버텨. 사람들이 돌아올 때까지만.',{e:'close',cam:[170,150,1.5]}]]),
 S('지켜보던 눈','#a8c8e8',fWatch,['G4','C5','E5','D5','C5','E5','D5','G4'],460,[
  ['','해마다 첫눈이 내리면, 한 젊은 태엽지기가 계단을 내려왔다. 이름은 선이었다.',{cam:[280,200,1.15]}],
  ['윤서','(그림자 속에서) …태엽지기. 약속을 지키는 사람이, 아직 있었구나.',{e:'cry',cam:[104,95,1.8]}],
  ['','그녀는 한 번도 모습을 드러내지 않았다. 이미 사람의 모습이 아니었으니까.',{cam:[110,100,1.3]}],
  ['','대신 해마다 계단 끝에 반짝이는 기름통 하나를 놓아두었다.',{cam:[155,226,1.8]}],
  ['선','(젊은 목소리) 허, 올해도 누가 두고 갔네. …고맙소, 누군지 몰라도!',{e:'smile',cam:[230,210,1.2]}]]),
 S('굶주림','#ff4d6d',f5Hunger,['A4','G4','F4','E4','F4','E4','D4','E4'],560,[
  ['','하지만 굶주림은 박동만 만들지 않았다. 대가를 원했다.',{cam:[240,180,1.1]}],
  ['윤서','배가 고파… 이름이… 내 이름이 뭐였지……',{e:'hollow',cam:[240,190,1.4]}],
  ['','그녀는 먼저 목소리를 잃고, 다음엔 얼굴을, 마지막엔 이름을 잃었다.',{cam:[240,190,1.7]}],
  ['','그리고 굶주림만 남았다. 사람들은 그것을 "태초의 굶주림"이라 불렀다.',{cam:[240,160,1]}]]),
 S('마지막 쪽','#e8dcc0',fLastPage,['E5','C5','A4','C5','E5','G5','E5','C5'],480,[
  ['','일기의 마지막 쪽은, 떨리는 글씨로 적혀 있었다.',{cam:[240,120,1.05]}],
  ['윤서','"언젠가 태엽지기의 아이가 이 옥상까지 올라온다면."',{e:'close',cam:[200,90,1.3]}],
  ['윤서','"망설이지 말고 나를 멈춰 줘. 나는 이미 충분히 오래 뛰었어."',{e:'cry',cam:[200,110,1.3]}],
  ['윤서','"그리고 오메가에게 전해 줘. 약속을 못 지켜서 미안하다고."',{e:'cry',cam:[200,160,1.3]}]]),
 S('마지막 빛','#ffd8a8',f6Light,['C5','E5','G5','C6','G5','E5','D5','C5'],420,[
  ['윤서','…아. 이제야 조용하다. 배가… 고프지 않아.',{e:'close',cam:[330,190,1.4]}],
  ['똑딱','…윤서? 기술장 윤서야? 오메가의 첫 박동을 만든…',{e:'shock',cam:[196,170,1.3]}],
  ['윤서','똑딱… 많이 컸구나. 그 작던 첫 박동이, 이렇게.',{e:'smile',cam:[260,190,1.15]}],
  ['윤서','그리고 너는— 선의 손자구나. 손이 빠른 아이.',{e:'smile'}],
  ['하루','당신이… 이 모든 걸 혼자 버텨 온 거예요? 삼백 년을?',{e:'sad',cam:[150,200,1.3]}],
  ['윤서','약속을 했거든. 돌아와서 태엽을 감아 주겠다고. …결국 지키지 못했지만.',{e:'sad',cam:[330,190,1.3]}],
  ['하루','아니에요! 지켰어요. 오메가가 삼백 년이나 뛸 수 있었던 건 당신 덕분이에요.',{e:'determined',cam:[150,200,1.3]}],
  ['똑딱','(울먹이며) …나, 기억나. 처음 뛰던 날, 누가 나를 꼭 안아 줬어. 그게 당신이었어.',{e:'cry',cam:[196,170,1.5]}],
  ['윤서','…그렇게 말해 주니, 좋다. 정말로.',{e:'cry',cam:[330,190,1.5]}],
  ['윤서','선에게 전해 줄래? 기름통, 매년 받아 줘서 고마웠다고.',{e:'smile'}],
  ['하루','할아버지가 그러셨어요. 그 기름통 덕분에 태엽이 한 번도 녹슬지 않았다고.',{e:'cry',cam:[150,200,1.3]}],
  ['윤서','…그래. 이제 네가 태엽지기구나. 부탁할게.',{e:'close',cam:[330,190,1.6]}],
  ['','윤서의 모습이 새벽빛 속으로 천천히 흩어졌다. 마지막으로, 아주 작은 목소리가 들렸다.',{cam:[240,160,1]}],
  ['윤서','좋은 아침.',{e:'close',cam:[330,180,1.8]}]])];
 FIN_SC.length=0;NEW.forEach(x=>FIN_SC.push(x));FIN_SC.style='diary';
 REV2_SC.splice(2,0,Object.assign({title:'실험 기록 · 제3일',tone:'#9affc8',draw:r2Lab2,mel:['C5','E5','G5','E5','D5','C5','D5','E5'],st:460,cam:'CAM-02',stamp:'DAY 003  05:41:19',lines:[
  ['실험 기록','"쿵. …방금, 내 안에서 박동이 났다. 내 심장 말고, 다른 박동이."'],['실험 기록','"오메가, 들었니? 조금만 기다려. 이걸로 너를 다시 뛰게 할게."']]}));
 REV2_SC.forEach((s,i)=>{if(s.cam==='CAM-02'&&!s.stamp)s.stamp='DAY 003'});
})();
/* ---------- 진 엔딩 ---------- */
const END_SC=[
 {title:'새벽',tone:'#ffd8a8',draw:e1Plaza,now:true,mel:['C5','E5','G5','E5','F5','A5','G5','E5'],st:360,lines:[
  ['','종탑의 종이 열두 번 울렸다. 그 소리는 이제 누구에게도 무섭지 않았다.',{cam:[240,60,1.3]}],
  ['','잠들었던 사람도, 멀리 떠났던 사람도, 모두 광장으로 모여들었다.',{cam:[240,200,1]}],
  ['똑딱','하루! 다들 너를 기다리고 있어! 빨리!',{e:'smile'}],
  ['하루','…응. 가자.',{e:'smile'}]]},
 {title:'윤서의 자리',tone:'#ffe9b0',draw:e2Memorial,now:true,mel:['G4','C5','E5','D5','C5','E5','D5','G4'],st:420,lines:[
  ['','광장 한가운데, 작은 동상이 세워졌다. 고글을 쓴 채 웃고 있는 기술장.',{cam:[240,170,1.5]}],
  ['선','…기름통의 주인이 이 사람이었구나. 삼백 년 동안, 우리 곁에.',{e:'sad',cam:[140,220,1.2]}],
  ['선','고맙소. 이번엔 얼굴을 보고 인사하는구려.',{e:'smile'}],
  ['하루','윤서 씨가 마지막에 그랬어요. "좋은 아침"이라고.',{e:'smile',cam:[300,210,1.2]}],
  ['선','허허. 그래. 좋은 아침이다.',{e:'close',cam:[240,180,1]}]]},
 {title:'일 년 후',tone:'#a8c8e8',draw:e3Winding,now:true,mel:['E5','C5','D5','G4','C5','D5','E5','C5'],st:420,lines:[
  ['','일 년 후. 첫눈이 내린 날.',{cam:[240,160,1]}],
  ['하루','(끼릭, 끼릭) …오메가, 올해도 잘 버텼어. 태엽 감아 줄게.',{e:'smile',cam:[200,200,1.3]}],
  ['똑딱','기름통도 챙겨 왔어! 윤서 거랑 똑같은 걸로.',{e:'smile',cam:[110,190,1.4]}],
  ['','심장이 한 번, 기쁘게 뛰었다. 쿵.',{cam:[320,180,1.4]}],
  ['하루','내년에도 올게. 그 다음 해에도. 약속이야.',{e:'close',cam:[200,190,1.2]}]]},
 {title:'크레딧',tone:'#ffffff',draw:eCredits,now:true,noBox:true,mel:['C5','E5','G5','C6','G5','E5','D5','C5','A4','C5','E5','A5','G5','E5','D5','E5'],st:420,lines:[['','']]},
 {title:'',tone:'#ffffff',draw:eFinal,now:true,noBox:true,mel:['C5'],st:2000,lines:[['','']]}];
function startEnding(cb){const now=performance.now();mode='boss';paused=false;$('overlay').hidden=true;dlg.active=false;$('dlg').hidden=true;
 if(!G)return cb&&cb();G.state='epi';stopMusic();G.cine={type:'revive',ph:'mem',mem:true,epi:true,mset:END_SC,si:0,li:0,lt0:now+900,st0:now,trans:null,memIn:now,st:0,onEnd:()=>{G.state='result';cb&&cb()}}}

function yunseo(x,y,s,t,a,col){yunseoC(x,y,s,t,a,col)}
/*FIN3_END*/
/*LOB_BEGIN*/
