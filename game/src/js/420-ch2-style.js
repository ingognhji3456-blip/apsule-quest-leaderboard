/* ================= 챕터 2 전용 연출 스타일 =================
   부활 전: 녹화 테이프(VHS) 감시 카메라 · 초록 터미널 글씨 · 전파 잡음 전환
   부활: 유리처럼 금 가고 깨지는 화면 · 흩뿌려지는 비명 글자 · 색 반전
   최종 회상: 손으로 쓴 일기장 · 사진 액자 · 종이 넘기는 전환 · 피아노 */
REV2_SC.style='vhs';FIN_SC.style='diary';REVIVE_CFG[19].rise='shatter';
[['CAM-01','DAY 000  00:00:00'],['CAM-02','DAY 001  02:14:07'],['CAM-02','DAY 040  03:12:44'],['CAM-??','DAY ???  ??:??:??'],['LIVE','NOW']].forEach(([cam,st],i)=>{REV2_SC[i].cam=cam;REV2_SC[i].stamp=st});
const SERIF='"Nanum Myeongjo","NanumMyeongjo","Batang","AppleMyungjo","Noto Serif KR",serif',VHSF='"Courier New",Courier,"D2Coding",monospace';
function revGlitchSfx(i){sfx(60+i*10,.45,'sawtooth',.09,30);sfx(1800+RND()*1500,.08,'square',.025,300);setTimeout(()=>sfx(2600,.05,'square',.02,1200),90);G.shake=.3+i*.15}
function memMusicStyle(sty,S,ni,n,now){const f=ni<S.mel.length?N5[S.mel[ni]]:0;
 if(sty==='vhs'){if(n%4===0)sfx(55,1.4,'sawtooth',.016,52);if(RND()<.3)sfx(1800+RND()*2400,.03,'square',.008,900);if(f&&n%2===0)sfx(f*.99,.7,'sine',.014,f*.94)}
 else if(sty==='diary'){if(f){sfx(f,1.3,'sine',.03,f);sfx(f*2,.5,'sine',.006,f*2);setTimeout(()=>sfx(f,1.1,'sine',.011,f),280)}if(ni===0)sfx(N5[S.mel[0]]/2,2,'sine',.02,N5[S.mel[0]]/2)}}
function vhsNoise(a,n){for(let i=0;i<n;i++){const v=RND();RA(RND()*W,RND()*H,1+RND()*3,1,v<.5?'#ffffff':'#8a8a8a',a*RND())}}
function drawMemVHS(now){const c=G.cine,SC=MSC(),S=SC[c.si],k=memProg(c,now),t=now/1000;ctx.save();R(0,0,W,H,'#000');S.draw(now,k,c);if(typeof memApplyCam==='function')memApplyCam(c,now,S);
 for(let i=0;i<3;i++)if(RND()<.3){const y=RND()*H,h=2+RND()*8;try{ctx.drawImage(cv,0,y*SS,W*SS,h*SS,(RND()-.5)*18,y,W,h)}catch(e){}}
 RA(0,0,W,H,'#20ff80',.05);for(let y=0;y<H;y+=2)RA(0,y,W,1,'#000',.22);
 const yb=((t*50)%(H+60))-30;for(let j=0;j<8;j++)for(let i=0;i<14;i++)RA(RND()*W,yb+j,4+RND()*14,1,'#ffffff',.18);
 for(let i=0;i<26;i++){const a=.5*(1-i/26);RA(0,i,W,1,'#000',a);RA(0,H-1-i,W,1,'#000',a);RA(i,0,1,H,'#000',a);RA(W-1-i,0,1,H,'#000',a)}
 ctx.font='bold 10px '+VHSF;ctx.textAlign='left';if(Math.floor(now/500)%2===0){pcirc(14,12,3,'#ff2d2d');}ctx.fillStyle='#ff4d4d';ctx.fillText('REC',21,15);ctx.fillStyle='#d8ffe0';ctx.fillText(S.stamp||'',12,28);
 ctx.textAlign='right';ctx.fillText(S.cam||'',W-12,34);ctx.textAlign='center';ctx.fillStyle='#7aff9a';ctx.fillText('FILE '+String(c.si+1).padStart(2,'0')+' · '+S.title,W/2,15);
 if(c.si<SC.length-1){ctx.textAlign='right';ctx.fillStyle='#9ac8a8';ctx.fillText('[SKIP ▶▶]',W-10,15)}
 // 터미널 글상자
 const by=H-64;RA(8,by,W-16,56,'#000',.8);R(8,by,W-16,1,'#1a8a4a');R(8,by+55,W-16,1,'#1a8a4a');
 const [spk,txt]=memLine(c);ctx.textAlign='left';if(spk){ctx.font='bold 10px '+VHSF;ctx.fillStyle='#5aff9a';ctx.fillText('['+spk+']',16,by+13)}
 ctx.font='12px '+VHSF;const shown=txt.slice(0,memTyped(c,now)),rows=memWrap(txt,W-44);let used=0,lx=16,ly=by+28;
 rows.forEach((row,i)=>{const part=shown.slice(used,used+row.length);used+=row.length;ctx.fillStyle='#c8ffd8';ctx.fillText((i===0?'> ':'  ')+part,16,by+28+i*14);if(part.length){lx=16+ctx.measureText((i===0?'> ':'  ')+part).width;ly=by+28+i*14}});
 if(Math.floor(now/350)%2===0)R(lx+1,ly-9,6,11,'#5aff9a');
 if(memDone(c,now)&&!c.trans){ctx.textAlign='right';ctx.font='bold 9px '+VHSF;ctx.fillStyle='#5aff9a';ctx.fillText(c.li<S.lines.length-1?'[CLICK]':'[NEXT FILE ▶]',W-16,H-12)}
 ctx.textAlign='left';
 const din=now-c.memIn;if(din<900){R(0,0,W,H,'#000');vhsNoise(1,900);ctx.font='bold 14px '+VHSF;ctx.textAlign='center';ctx.fillStyle='#d8ffe0';ctx.fillText('▶ PLAY',W/2,H/2);ctx.textAlign='left'}
 if(c.trans){const d=now-c.trans.t0,a=clamp(1-Math.abs(d-320)/320,0,1);RA(0,0,W,H,'#000',a*.85);vhsNoise(a,Math.round(a*1200));if(a>.6){ctx.font='bold 16px '+VHSF;ctx.textAlign='center';ctx.fillStyle='#ffffff';ctx.fillText(c.trans.to>=SC.length?'SIGNAL LOST':'NO SIGNAL',W/2,H/2);ctx.textAlign='left'}}
 ctx.restore()}
let _dSnap=null;
function drawMemDiary(now){const c=G.cine,SC=MSC(),S=SC[c.si],k=memProg(c,now),t=now/1000;ctx.save();R(0,0,W,H,'#000');S.draw(now,k,c);if(typeof memApplyCam==='function')memApplyCam(c,now,S);
 if(!_dSnap&&typeof document!=='undefined'){_dSnap=document.createElement('canvas')}if(_dSnap){if(_dSnap.width!==cv.width){_dSnap.width=cv.width;_dSnap.height=cv.height}const sc=_dSnap.getContext('2d');sc.drawImage(cv,0,0)}
 const PAP='#efe3c6',fx=38,fy=24,fw=404,fh=178;R(0,0,W,H,PAP);const rr=rng(33);for(let i=0;i<120;i++)RA(rr()*W,rr()*H,4+rr()*20,1,'#c8b48a',.25);for(let i=0;i<5;i++)pcirc(rr()*W,rr()*H,10+rr()*20,'#d8c49a',.15);
 for(let i=0;i<20;i++){const a=.12*(1-i/20);RA(0,i,W,1,'#6a4a2a',a);RA(0,H-1-i,W,1,'#6a4a2a',a);RA(i,0,1,H,'#6a4a2a',a);RA(W-1-i,0,1,H,'#6a4a2a',a)}
 const tilt=[-.012,.01,-.008,.012,-.01,.006][c.si%6];ctx.save();ctx.translate(W/2,fy+fh/2);ctx.rotate(tilt);
 R(-fw/2-7,-fh/2-7,fw+14,fh+14,'#00000022');R(-fw/2-6,-fh/2-6,fw+12,fh+12,'#fbf6ea');
 if(_dSnap)ctx.drawImage(_dSnap,0,22*SS,W*SS,212*SS,-fw/2,-fh/2,fw,fh);RA(-fw/2,-fh/2,fw,fh,'#ffcf90',.14);
 for(const [tx,ty,ta] of [[-fw/2-8,-fh/2-6,-.6],[fw/2-18,-fh/2-6,.6],[-fw/2-8,fh/2-4,.6],[fw/2-18,fh/2-4,-.6]]){ctx.save();ctx.translate(tx+13,ty+5);ctx.rotate(ta);RA(-14,-5,28,10,'#e8d49a',.75);ctx.restore()}ctx.restore();
 ctx.font='bold 11px '+SERIF;ctx.textAlign='left';ctx.fillStyle='#6a4a2a';ctx.fillText(S.title,fx,16);ctx.textAlign='center';ctx.font='10px '+SERIF;ctx.fillStyle='#8a6a4a';ctx.fillText('— 윤서의 일기 —',W/2,16);
 if(c.si<SC.length-1){ctx.textAlign='right';ctx.font='bold 10px '+SERIF;ctx.fillStyle='#8a5a3a';ctx.fillText('건너뛰기 ▶▶',W-10,16)}
 if(typeof memBusts==='function')memBusts(c,now,214);
 const [spk,txt]=memLine(c),by=214;ctx.textAlign='left';if(spk){ctx.font='italic bold 11px '+SERIF;ctx.fillStyle=mixc(MSPK[spk]||'#6a4a2a','#3a2a1a',.55);ctx.fillText(spk,fx,by+10)}
 ctx.font='14px '+SERIF;const shown=txt.slice(0,memTyped(c,now)),rows=memWrap(txt,W-fx*2);let used=0;
 rows.forEach((row,i)=>{const part=shown.slice(used,used+row.length);used+=row.length;ctx.fillStyle='#3a2a1a';ctx.fillText(part,fx,by+30+i*18)});
 for(let i=0;i<4;i++)R(fx,by+34+i*18,W-fx*2,1,'#d8c8a4');
 ctx.textAlign='right';ctx.font='italic 10px '+SERIF;ctx.fillStyle='#8a6a4a';ctx.fillText('p. '+(c.si+1),W-16,H-8);
 if(memDone(c,now)&&!c.trans&&Math.floor(now/450)%2===0){ctx.font='bold 11px '+SERIF;ctx.fillStyle='#8a4a2a';ctx.fillText(c.li<S.lines.length-1?'▼':'넘기기 ▶',W-44,H-8)}
 ctx.textAlign='left';
 const din=now-c.memIn;if(din<900)RA(0,0,W,H,PAP,1-din/900);
 if(c.trans){const d=now-c.trans.t0,end=c.trans.to>=SC.length;if(end){RA(0,0,W,H,'#fff6e0',clamp(d/320,0,1))}else if(d<320){const x=W-(d/320)*W;R(x,0,W-x+2,H,PAP);for(let i=0;i<14;i++)RA(x-i,0,1,H,'#6a4a2a',.25*(1-i/14));R(x,0,2,H,'#fbf6ea')}else{RA(0,0,W,H,PAP,1-(d-320)/320)}}
 ctx.restore()}
function drawRiseShatter(now,t,c,g){const p=t/REV_DUR,cx=W/2,cy=150;
 const bar=30*(p>.95?(1-p)/.05:1);R(0,0,W,bar,'#000');R(0,H-bar,W,bar,'#000');
 const dk=t<3300?.82:t<4800?.82-(t-3300)/1500*.5:Math.max(0,.32-(t-4800)/1200*.32);RA(0,0,W,H,'#0a000a',dk);
 if(t<3300){if(RND()<.3){const y=RND()*H,h=2+RND()*14;try{ctx.drawImage(cv,0,y*SS,W*SS,h*SS,(RND()-.5)*30,y,W,h)}catch(e){}}
  const ws=['…아파','…약속','배고파','…멈춰 줘','여기가 어디지'],sl=Math.floor(t/420),r=rng(sl);ctx.font='bold 12px '+SERIF;ctx.textAlign='center';ctx.globalAlpha=.35+.3*r();ctx.fillStyle='#d8b8ff';ctx.fillText(ws[sl%ws.length],60+r()*360,70+r()*160);ctx.globalAlpha=1;
  glow(g.x,g.coreY,18+Math.random()*10,c.cfg.col,.3)}
 if(t>=3300&&t<5000){const gr=Math.min(1,(t-3300)/650);for(let i=0;i<14;i++){const r=rng(1919+i),a=i*TAU/14+r()*.3;let px=cx,py=cy;const segs=Math.floor(3+gr*7);for(let s=0;s<segs;s++){const nx=px+Math.cos(a+(r()-.5)*.9)*26,ny=py+Math.sin(a+(r()-.5)*.9)*20;bbLine(px,py,nx,ny,'#e8d8ff',.9);bbLine(px+1,py,nx+1,ny,'#b03aff',.5);px=nx;py=ny}}
  const txt=c.cfg.cry,n=Math.min(txt.length,Math.floor((t-3350)/110)+1);ctx.textAlign='center';
  for(let i=0;i<n;i++){const r=rng(700+i),x=70+r()*340,y=80+r()*130,rot=(r()-.5)*.7,sz=26+Math.floor(r()*18),jx=(RND()-.5)*3,jy=(RND()-.5)*3;ctx.save();ctx.translate(x+jx,y+jy);ctx.rotate(rot);ctx.font='bold '+sz+'px '+SERIF;
   ctx.fillStyle='#ff2d55';ctx.fillText(txt[i],-2,0);ctx.fillStyle='#3affff';ctx.fillText(txt[i],2,0);ctx.fillStyle='#ffffff';ctx.fillText(txt[i],0,0);ctx.restore()}
  ctx.font='bold 9px '+SERIF;shText(c.cfg.who,W/2,40,c.cfg.col)}
 if(t>=4800&&t<6400){const q=(t-4800)/1600;for(let i=0;i<40;i++){const r=rng(4040+i),x0=(i%8)*60+r()*30,y0=Math.floor(i/8)*60+r()*30,vx=(x0-cx)*.9,vy=-60+r()*40,x=x0+vx*q,y=y0+vy*q+260*q*q,rot=(r()-.5)*6*q,sz=14+r()*22;
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalAlpha=Math.max(0,1-q);ctx.fillStyle='#140814';ctx.beginPath();ctx.moveTo(-sz/2,-sz/3);ctx.lineTo(sz/2,-sz/4);ctx.lineTo(0,sz/2);ctx.closePath();ctx.fill();ctx.strokeStyle='#e8d8ff';ctx.lineWidth=.8;ctx.stroke();ctx.restore()}ctx.globalAlpha=1}
 if(t>4800&&t<4980){ctx.save();ctx.globalCompositeOperation='difference';ctx.fillStyle='#ffffff';ctx.fillRect(0,0,W,H);ctx.restore()}
 if(t>4900){const a=t<5100?(t-4900)/200:t>REV_DUR-400?(REV_DUR-t)/400:1,jx=Math.random()<.2?(Math.random()-.5)*8:0;ctx.globalAlpha=clamp(a,0,1);ctx.textAlign='center';
  ctx.font='bold 9px '+VHSF;ctx.fillStyle=c.cfg.col2;ctx.fillText(c.cfg.t1,W/2,118);ctx.font='bold 32px '+SERIF;
  ctx.fillStyle='#ff2d55';ctx.fillText(c.cfg.t2,W/2-3+jx,154);ctx.fillStyle='#3affff';ctx.fillText(c.cfg.t2,W/2+3+jx,154);ctx.fillStyle='#ffffff';ctx.fillText(c.cfg.t2,W/2+jx,154);
  if(t>5600){const by=180;RA(24,by,W-48,40,'#000',.82);R(24,by,W-48,1,'#1a8a4a');R(24,by+39,W-48,1,'#1a8a4a');ctx.textAlign='left';ctx.font='bold 10px '+VHSF;ctx.fillStyle='#5aff9a';ctx.fillText('[똑딱]',32,by+14);ctx.font='12px '+VHSF;ctx.fillStyle='#c8ffd8';ctx.fillText('> '+typed(c.cfg.tick,(t-5700)/1300),32,by+31)}
  ctx.globalAlpha=1;ctx.textAlign='left'}}
/*FIN2_END*/
/*FIN3_BEGIN*/
