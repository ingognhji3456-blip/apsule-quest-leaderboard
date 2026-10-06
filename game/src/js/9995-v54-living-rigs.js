/* ================= v54 살아 움직이는 보스: 부위별 섬세한 움직임 + 직접 공격하는 몸동작 =================
   전에는 보스 그림이 한 장으로 붙어서 몸 전체만 위아래로 움직였다(피규어 같은 느낌).
   이제 마지막에 붙이는 순간 그림을 가는 띠로 잘라, 부위마다 따로 움직인다.
   ◆ 평소(공격하지 않을 때)
     tail  꼬리: 한쪽 끝이 물결치며 흔들림 (끝으로 갈수록 크게)
     wings 날개: 양쪽 바깥이 위아래로 퍼덕임 (seesaw면 좌우가 반대로 — 저울·팔)
     sway  윗부분 흔들림: 나무 꼭대기·굴뚝·깃털·안테나·불꽃
     fringe 아랫부분 물결: 촉수·뿌리·망토·유령 꼬리·드레스
     pend  매달린 몸이 시계추처럼 흔들림
     br    숨쉬기(몸이 살짝 부풀었다 줄어듦) · float 떠서 오르내림
   ◆ 공격할 때 (그 공격의 몸 쓰는 곳에 따라, 준비 → 내지르기)
     head  머리·윗몸이 뒤로 젖혔다가 나를 향해 쭉 내밂 (입·눈에서 쏘는 공격)
     hands 양팔(바깥쪽)이 번쩍 들렸다가 내리침
     field 몸을 웅크렸다가 쭉 펴며 내리찍음
     all   뒤로 물러섰다가 나를 향해 덮침
   판정·위치는 바꾸지 않는다. 그림만 움직인다. 미리보기(정지 그림)는 그대로 둔다. */
(function(){try{
 if(typeof monFinish!=='function'||typeof MON==='undefined')return;
 const TAU2=Math.PI*2;
 /* 보스별 움직임 설정 (비율은 보스 그림 크기 기준) */
 const RIG={
  b0:{sway:[.3,.25,1.4],br:1},b1:{sway:[.35,.3,1.1],br:1},b2:{sway:[.3,.25,.9],br:1.6},b3:{sway:[.3,.6,2.2],br:1},b4:{float:1,fringe:[.7,.5,1.5]},
  b5:{sway:[.35,.6,1.6],float:1},b6:{sway:[.45,.6,.9],br:1},b7:{pend:[1.4,.8]},b8:{sway:[.35,.3,1.2],br:1},b9:{sway:[.3,.3,1],br:1.6},
  b10:{sway:[.55,.9,.8],fringe:[.8,.8,1.2]},b11:{sway:[.4,.7,1],fringe:[.75,.8,1.4]},b12:{sway:[.3,.9,1.3],br:2.2},b13:{tail:[-1,.28,1.4,2.4],sway:[.35,.25,1.6],br:1},b14:{fringe:[.6,.6,2],sway:[.3,.2,.8]},
  b15:{wings:[.35,1.4,9],fringe:[.8,.6,1.5],float:1},b16:{fringe:[.75,.5,2],sway:[.3,.4,1.2]},b17:{tail:[1,.25,1.2,2],wings:[.6,.4,3],sway:[.3,.6,1.4],float:1},b18:{fringe:[.6,1,1.6],float:1},b19:{sway:[.5,.5,1],fringe:[.7,.6,1.2],br:1},
  c_pendulum:{pend:[1,.9],br:1},c_panopticon:{float:1,sway:[.3,.5,1.4]},c_moth:{wings:[.18,1.6,6],float:1},c_bellows:{br:3,sway:[.3,.5,1.5]},c_metronome:{sway:[.6,1.2,1.8]},
  c_calendar:{sway:[.3,.4,1.6],wings:[.6,.6,2]},c_dust:{sway:[.4,.4,1.2],br:1},c_scales:{wings:[.3,.8,1.2],seesaw:1},c_echo:{sway:[.45,.5,1.1]},c_stillness:{float:1,br:1},
  c_s4_meteor:{sway:[.3,.3,1.5],br:1},c_s4_eclipse:{float:1,fringe:[.75,.4,1]},c_s4_comet:{sway:[.6,1,1.6],tail:[-1,.3,1,1.6]},c_s4_nebula:{tail:[-1,.3,1.4,1.2],wings:[.7,.4,1.5],float:1},c_s4_gemini:{sway:[.5,.5,1.2]},
  c_s4_void:{fringe:[.55,1.2,1.2],float:1},c_s4_nova:{br:1.5,sway:[.3,.3,1]},c_s4_luna:{fringe:[.6,.9,1.3],float:1},c_s4_weaver:{pend:[.9,.7]},c_s4_last:{wings:[.3,.6,1],fringe:[.8,.6,1.4],float:1},
  c_s5_beacon:{sway:[.4,.4,1.3],br:1},c_s5_manta:{wings:[.25,1.6,2],fringe:[.8,1,1.6],float:1},c_s5_anchor:{br:1.5,sway:[.3,.2,1]},c_s5_organ:{fringe:[.55,1.4,1.6],float:1},c_s5_nautilus:{fringe:[.6,.8,1.6],float:1},
  c_s5_eel:{tail:[1,.3,1.4,2.4],float:1},c_s5_octopus:{wings:[.35,.8,1.6],fringe:[.75,.6,1.4],seesaw:1},c_s5_whale:{tail:[1,.3,1.6,1.3],float:1},c_s5_archive:{sway:[.3,.4,1.2],fringe:[.75,.5,1.3]},c_s5_heart:{float:1,br:1.5},
  c_s6_vane:{sway:[.35,.6,1.4]},c_s6_kite:{sway:[.4,.8,1.8]},c_s6_cloudwhale:{tail:[1,.25,1.4,1.4],float:1,br:2},c_s6_captain:{sway:[.5,.5,1],float:1},c_s6_clock:{wings:[.3,1,3],pend:[.4,.8]},
  c_s6_organ:{sway:[.4,.3,1.2],wings:[.55,.5,1.4]},c_s6_prism:{br:1.2,sway:[.3,.3,1.2]},c_s6_falcon:{wings:[.25,1.4,3.5],float:1},c_s6_storm:{fringe:[.5,.8,1.4],sway:[.4,.6,1.4],float:1},c_s6_spire:{sway:[.3,.4,1]},
  c_s7_gate:{br:1,sway:[.3,.2,1.2]},c_s7_peacock:{sway:[.5,.5,1.2],wings:[.4,.6,1.6]},c_s7_fountain:{sway:[.35,.6,1.5],wings:[.4,.5,1.8],seesaw:1},c_s7_chess:{br:1,sway:[.25,.2,1]},c_s7_candle:{sway:[.2,1,3]},
  c_s7_ballet:{sway:[.6,.6,1.4]},c_s7_carousel:{sway:[.3,.4,1],fringe:[.4,.4,2]},c_s7_puppet:{pend:[.6,.8],fringe:[.7,.6,1.4]},c_s7_dragon:{wings:[.3,1.4,2.2],tail:[1,.2,1.2,2],float:1},c_s7_mharu:{wings:[.35,.6,1.8],fringe:[.75,.5,1.4]}};
 window.RIG54=RIG;
 /* 그림이 실제로 차지하는 칸(투명하지 않은 곳) — 보스마다 한 번 계산 */
 const BOX=new Map();
 function bbox(F,key){const id=key+'|'+F.width+'x'+F.height+'|'+(typeof diff!=='undefined'?diff:'');let b=BOX.get(id);if(b)return b;const W=F.width,H=F.height;let x0=W,y0=H,x1=0,y1=0;
  try{const d=F.getContext('2d').getImageData(0,0,W,H).data;for(let y=0;y<H;y+=2)for(let x=0;x<W;x+=2)if(d[(y*W+x)*4+3]>30){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}}catch(e){}
  if(x1<=x0){x0=0;y0=0;x1=W;y1=H}b={x0,y0,x1,y1,w:Math.max(1,x1-x0),h:Math.max(1,y1-y0)};BOX.set(id,b);return b}
 const TC=document.createElement('canvas');
 /* 공격 몸동작 값: 준비(wind 0→1) · 내지르기(rel) */
 function pose(A){const p=A&&A.pat;if(!p)return null;const e=p.e,wind=e<1.2?e/1.2:Math.max(0,1-(e-1.2)/.6),rel=e>=1.15&&e<1.75?Math.sin((e-1.15)/.6*Math.PI):0;return {chan:p.chan||'',wind,rel}}
 function deform(c,F,dx,dy,dw,dh,R,A,key){const W=F.width,H=F.height,k=dw/W,b=bbox(F,key),t=A.t||performance.now()/1000,P2=pose(A),dir=(A.look&&A.look[0]<0)?-1:1,cx=b.x0+b.w/2;
  const ST=4,yLim=b.y1-b.h*.1;
  /* 1) 세로 띠: 꼬리 · 날개 · 팔 (바닥 10%는 고정) */
  const col=xp=>{let o=0;if(R.tail){const [side,fr,amp,f]=R.tail,edge=side<0?b.x0+fr*b.w:b.x1-fr*b.w,d=side<0?(edge-xp)/(fr*b.w):(xp-edge)/(fr*b.w);if(d>0)o+=amp*b.h*.06*Math.pow(Math.min(1,d),1.5)*Math.sin(TAU2*f*t*.5-d*2.5)}
   if(R.wings){const [fw,amp,f]=R.wings,dist=Math.abs(xp-cx)/(b.w/2);if(dist>fw){const q=Math.min(1,(dist-fw)/(1-fw)),sg=R.seesaw&&xp<cx?-1:1;o+=-amp*b.h*.05*q*Math.sin(TAU2*f*t*.25)*sg}}
   if(P2&&P2.chan==='hands'){const dist=Math.abs(xp-cx)/(b.w/2);if(dist>.5){const q=Math.min(1,(dist-.5)/.5);o+=-(P2.wind*.1-P2.rel*.16)*b.h*q}}return o};
  let src=F;const anyCol=R.tail||R.wings||(P2&&P2.chan==='hands');
  if(anyCol){if(TC.width!==W||TC.height!==H){TC.width=W;TC.height=H}const g=TC.getContext('2d');g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.globalCompositeOperation='source-over';g.clearRect(0,0,W,H);g.imageSmoothingEnabled=false;
   for(let xp=0;xp<W;xp+=ST){const o=Math.round(col(xp+ST/2));if(xp+ST<b.x0||xp>b.x1){continue}g.drawImage(F,xp,0,ST,yLim,xp,o,ST,yLim);g.drawImage(F,xp,yLim,ST,H-yLim,xp,yLim,ST,H-yLim)}src=TC}
  /* 2) 가로 띠: 윗부분 흔들림 · 아랫부분 물결 · 시계추 · 머리 내밀기 · 덮치기 + 숨쉬기 · 웅크리기 */
  let AIM=null;try{if(typeof G!=='undefined'&&G&&G.aim54&&mode==='boss'&&performance.now()<G.aim54.until)AIM=G.aim54.a}catch(e){}
  let sc=1+(R.br||0)*.012*Math.sin(t*1.8);if(P2&&P2.chan==='field')sc*=1-P2.wind*.07+P2.rel*.1;const fl=R.float?Math.sin(t*1.4)*b.h*.025:0;
  const sm=c.imageSmoothingEnabled;c.imageSmoothingEnabled=false;
  for(let yp=0;yp<H;yp+=ST){if(yp+ST<b.y0-b.h*.2||yp>b.y1+2){continue}const fy=(yp-b.y0)/b.h;let ox=0,oy=0;
   if(R.sway){const [ft,amp,f]=R.sway;if(fy<ft){const d=(ft-fy)/ft;ox+=amp*b.w*.03*Math.pow(Math.min(1,d),1.3)*Math.sin(TAU2*f*t*.25)}}
   if(R.fringe){const [fb,amp,f]=R.fringe;if(fy>fb){const d=Math.min(1,(fy-fb)/(1-fb));ox+=amp*b.w*.025*d*Math.sin(TAU2*f*t*.25+fy*6)}}
   if(R.pend){const [amp,f]=R.pend;ox+=amp*b.w*.04*Math.max(0,fy)*Math.sin(TAU2*f*t*.25)}
   if(P2){if(P2.chan==='head'&&fy<.42){const d=(.42-fy)/.42;ox+=dir*(-P2.wind*.03+P2.rel*.09)*b.w*d;oy+=(-P2.wind*.03+P2.rel*.03)*b.h*d}
    if(P2.chan==='all')ox+=dir*(-P2.wind*.04+P2.rel*.09)*b.w*Math.max(0,1-fy)}
   /* 숨결·조준: 공격이 고개 방향을 정해 주면(G.aim54) 머리가 그쪽으로 돈다 */if(AIM&&fy<.42){const d=(.42-fy)/.42;ox+=Math.cos(AIM)*b.w*.07*d;oy+=Math.sin(AIM)*b.h*.05*d}
   const yy=b.y1-(b.y1-yp)*sc+oy+fl;c.drawImage(src,0,yp,W,ST,dx+ox*k,dy+yy*k,dw,ST*k*sc+.6)}
  c.imageSmoothingEnabled=sm}
 /* 지금 그리는 보스 열쇠 기억 */
 {const _md=monDraw;monDraw=function(key){const sv=MON.curKey;MON.curKey=key;try{return _md.apply(this,arguments)}finally{MON.curKey=sv}}}
 /* 마지막 붙이기를 가로채서 부위별로 움직여 붙임 */
 {const _mf=monFinish;monFinish=function(c,A,x,y,u,ol){const key=MON.curKey,R=RIG[key];if(!R||!A||A.still||!c||c.__rig54||(typeof RIG54OFF!=='undefined'&&RIG54OFF))return _mf.apply(this,arguments);
  const own=Object.prototype.hasOwnProperty.call(c,'drawImage'),orig=c.drawImage;c.__rig54=1;
  c.drawImage=function(img,a,b2,w,h){if(arguments.length===5&&img===MON.F){try{deform(c,img,a,b2,w,h,R,A,key);return}catch(e){if(!MON.rigErr){MON.rigErr=1;console.error('v54 rig',key,e)}}}return orig.apply(c,arguments)};
  try{return _mf.apply(this,arguments)}finally{c.__rig54=0;if(own)c.drawImage=orig;else delete c.drawImage}}}
}catch(e){console.error('v54 rigs',e)}})();
