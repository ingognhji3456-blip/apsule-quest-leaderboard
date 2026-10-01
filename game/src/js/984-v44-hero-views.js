/* ================= v44 주인공 방향별 모습 · 검 휘두르는 몸동작 =================
   1) 이동 방향에 따라 앞모습 / 옆모습(왼·오른쪽) / 뒷모습. 멈춰 있을 때는 앞모습.
      - 옆: 먼 쪽 눈·볼을 지우고 옆얼굴(머리카락·코)로, 팔·다리는 앞뒤로 엇갈려 걷기, 몸 폭을 줄여 옆으로 선 느낌
      - 뒤: 얼굴 대신 뒷머리·투구 뒤, 몸 앞 장식 대신 등판, 망토·등에 멘 물건이 앞으로 보임
   2) 공격하면 팔이 어깨에서 원을 그리며 검을 들어 올렸다(예비) → 내려베고(타격) → 따라 돌고(여운) 돌아온다.
      검은 손에 붙어 함께 움직이고, 휘두르는 동안 몸이 앞으로 기울며, 검이 몸 앞에 그려진다.
   판정·타이밍은 그대로이고, 그림만 바뀐다. */
(function(){
 if(typeof CH2DEF==='undefined'||typeof ch2Eyes!=='function')return;
 const HV={view:'front',sw:null,pend:null};window.__HV=HV;
 /* 캐릭터별: 머리(뒤) 색, 머리카락 그늘, 몸통(등) 색, 피부색 */
 const SPEC=[
  {hair:'#6a3a1e',hd:'#4a2410',body:'#2e8a86',skin:'#ffd8b8'},
  {hair:'#ff9ec4',hd:'#d06a94',body:'#ff9ec4',skin:'#ffe0d0'},
  {hair:'#4a3218',hd:'#2a1a0c',body:'#c8561a',skin:'#f0c8a0'},
  {hair:'#c8c8e8',hd:'#9a9ac0',body:'#5a3aa0',skin:'#ffe8d8'},
  {hair:'#b8c4cc',hd:'#7a8a94',body:'#4a6a80',skin:null},
  {hair:'#d8e0ec',hd:'#8a9aac',body:'#d8e0ec',skin:null},
  {hair:'#2a2a3a',hd:'#1a1a24',body:'#2a2a3a',skin:'#f0caa4'},
  {hair:'#5ad07a',hd:'#2e8a4a',body:'#5ad07a',skin:'#ffe8d0'},
  {hair:'#c8323a',hd:'#801a24',body:'#c8323a',skin:null},
  {hair:'#f4f6f8',hd:'#b8c4cc',body:'#f4f6f8',skin:null}];
 const curIdx=()=>{try{return shopInv().eq.ch||0}catch(e){return 0}};

 /* ---------- 공용 부품을 방향에 맞게 ---------- */
 {const _e=ch2Eyes;ch2Eyes=function(Q,blink,iris,y,gap,big){const v=HV.view;if(v==='back')return;if(v!=='side')return _e.apply(this,arguments);
   y=y||14;const h=big?4:3,x=9;if(blink){Q.R(x,y+h-2,2,1,'#1a1020');return}Q.R(x,y,2,h,'#1a1020');Q.R(x,y+1,1,h-1,iris);Q.px(x,y,'#ffffff')}}
 {const _c=ch2Cheek;ch2Cheek=function(Q,y,c){const v=HV.view;if(v==='back')return;if(v!=='side')return _c.apply(this,arguments);Q.R(10,y,2,1,c||'#ff9aa8',.7)}}
 {const _l=ch2Legs;ch2Legs=function(Q,f,pants,boot,sock){if(HV.view!=='side'||(CH2.pose&&CH2.pose.legs))return _l.apply(this,arguments);
   const st=[0,2,0,-2][f],far=shade(pants,.72),farB=shade(boot,.72);
   /* 먼 다리 (어둡게) → 가까운 다리, 발끝은 앞(왼쪽) */Q.R(14-st,27,3,4,far);if(sock)Q.R(14-st,30,3,1,shade(sock,.75));Q.R(13-st,31,4,2,farB);
   Q.R(11+st,27,3,4,pants);if(sock)Q.R(11+st,30,3,1,sock);Q.R(10+st,31,4,2,boot);Q.R(10+st,31,4,1,shade(boot,1.35))}}
 {const _a=ch2Arms;ch2Arms=function(Q,f,col,hand,dy){dy=dy||0;const S=HV.sw,side=HV.view==='side';
   if(!S&&(!side||(CH2.pose&&CH2.pose.arms&&CH2.pose.arms!=='down')))return _a.apply(this,arguments);
   const sw=side?[0,2,0,-2][f]:[0,-1,0,1][f];
   /* 먼 팔 */if(side){Q.R(15-sw,19+dy,3,6,shade(col,.72));Q.R(15-sw,25+dy,3,2,shade(hand,.8))}else{Q.R(7,19+dy+sw,3,6,col);Q.R(7,25+dy+sw,3,2,hand)}
   /* 오른팔: 휘두르는 중이면 어깨 → 손으로 */
   if(S){const sx=side?12.5:19.5,sy=19.5+dy,[hx,hy]=S.hand;const n=Math.max(1,Math.ceil(Math.hypot(hx-sx,hy-sy)));for(let i=0;i<=n;i++){const k=i/n;Q.R(sx+(hx-sx)*k-1.5,sy+(hy-sy)*k-1.5,3,3,col)}Q.R(hx-1.5,hy-1.5,3,3,hand);Q.px(hx-1,hy-1.5,shade(hand,1.2))}
   else if(side){Q.R(11+sw,19+dy,3,6,col);Q.R(11+sw,25+dy,3,2,hand)}else{Q.R(18,19+dy-sw,3,6,col);Q.R(18,25+dy-sw,3,2,hand)}}}

 /* ---------- 캐릭터별 옆·뒤 덧그림 (각 캐릭터 그림 위에) ---------- */
 const BACK=[
  (Q,b,S)=>{Q.R(6,7+b,16,2,'#8a5a2a');Q.R(8,17+b,12,3,'#e0603a');Q.R(8,17+b,12,1,'#ff8a5c')},
  (Q,b,S)=>{Q.P([[7,5+b],[8,1+b],[10,4+b]],'#ff7ab0');Q.P([[21,5+b],[20,1+b],[18,4+b]],'#ff7ab0')},
  (Q,b,S)=>{Q.L(4,10,22,26,'#6a4a28');Q.L(4,11,22,27,'#4a3218');Q.P([[1,8],[7,8],[8,10],[2,11]],'#8a969c');Q.L(10,19+b,17,27,'#4a6a8a');Q.L(17,19+b,10,27,'#4a6a8a')},
  (Q,b,S,t)=>{Q.R(7,12+b,14,12,S.hair);for(let i=0;i<4;i++)Q.R(8+i*3.4,13+b,1,10,'#e8e8ff',.7);Q.P([[7,22],[21,22],[23,31],[5,31]],'#3a2470');for(const [x,y] of [[10,26],[17,28],[13,29]])Q.px(x,y,'#ffe36b')},
  (Q,b,S)=>{Q.R(7,9+b,14,5,S.hair);for(let i=0;i<3;i++)Q.R(9,10+b+i*1.4,10,.6,'#7a8a94');Q.R(10,21+b,8,5,'#2e4a5e');for(const [x,y] of [[10,21],[17,21],[10,25],[17,25]])Q.px(x,y+b,'#b8c4cc')},
  (Q,b,S,t)=>{Q.R(8,12+b,12,3,S.hair);Q.R(13,11+b,2,7,'#8a9aac');for(let i=0;i<6;i++){const w=Math.sin(t*4+i*.7)*.8;Q.P([[7+i*2.3,19],[10+i*2.3,19],[9+i*2.3+w,32]],i%2?'#3a6ac8':'#24448a')}},
  (Q,b,S,t)=>{Q.R(8,11+b,12,4,S.hair);Q.R(12,8+b,4,3,'#ff3a4a');Q.px(13,9+b,'#ff7a84')},
  (Q,b,S)=>{for(let i=0;i<4;i++)Q.L(10+i*2.5,8+b,9+i*2.6,17+b,'#2e8a4a',.6)},
  (Q,b,S)=>{Q.R(8,12+b,12,3,S.hair);Q.R(10,17+b,8,2,S.hair);for(let i=0;i<3;i++)Q.P([[13,10+b+i*3],[15,10+b+i*3],[14,8+b+i*3]],'#801a24')},
  (Q,b,S,t)=>{Q.R(8,12+b,12,3,S.hair);for(let i=0;i<6;i++){const w=Math.sin(t*3.5+i*.7)*.8;Q.P([[6+i*2.6,19],[9+i*2.6,19],[8+i*2.6+w,32]],i%2?'#f4f6f8':'#e0e4ec')}Q.R(5,31,18,1,'#ffd84a')}];
 const SIDE=[
  (Q,b,S)=>{Q.R(17,10+b,5,8,S.hair);Q.R(17,10+b,5,1,S.hd)},
  (Q,b,S)=>{Q.R(17,10+b,4,8,'#8a5a3a');Q.R(20,9+b,2,9,S.hair)},
  (Q,b,S)=>{Q.R(17,11+b,4,7,S.hair)},
  (Q,b,S)=>{Q.R(17,12+b,5,12,S.hair);Q.R(20,13+b,1,10,'#e8e8ff',.7)},
  (Q,b,S)=>{Q.R(15,9+b,6,5,S.hair);Q.R(16,10+b,4,.6,'#7a8a94')},
  (Q,b,S)=>{Q.R(15,12+b,5,3,S.hair)},
  (Q,b,S)=>{Q.R(14,11+b,6,4,S.hair)},
  (Q,b,S)=>{Q.R(17,10+b,5,8,S.hair);Q.R(20,11+b,1,6,S.hd)},
  (Q,b,S)=>{Q.R(15,12+b,5,3,S.hair)},
  (Q,b,S)=>{Q.R(15,12+b,5,3,S.hair)}];
 CH2DEF.forEach((D,i)=>{if(!D||D.__v44)return;const p=D.paint,S=SPEC[i];D.paint=function(Q,f,b,bl,t){p.apply(this,arguments);try{const v=HV.view;
   if(v==='back'){/* 얼굴 → 뒷머리 · 몸 앞 → 등판 */if(S.skin){Q.E(14,13.4+b,7.4,6.2,S.hair);Q.R(8,15+b,12,3,S.hair);for(let k=0;k<4;k++)Q.R(9.5+k*2.6,9+b,1,8,S.hd,.55)}
    Q.R(10,20+b,8,6,S.body);Q.R(13.5,20.5+b,1,5,shade(S.body,.72));BACK[i](Q,b,S,t)}
   else if(v==='side'){SIDE[i](Q,b,S,t);if(S.skin){Q.px(6,15+b,S.skin);Q.px(6,16+b,shade(S.skin,.85))}}}catch(e){}};D.__v44=1});

 /* ---------- 검 휘두르기 ---------- */
 const SWV={};/* 휘두르기 진행: lungeDur보다 길게 보여 줘서 예비·여운이 보이게 */
 function swingK(now){if(!P.lungeT)return -1;const d=now-P.lungeT,dur=Math.max(260,(P.lungeDur||120)*2.1);return d>=0&&d<dur?d/dur:-1}
 /* 0~.22 들어올림 · .22~.5 내려베기 · .5~.75 따라 돎 · .75~1 제자리 */
 const ease=k=>k*k*(3-2*k);
 function armAng(k){const rest=1.35,up=-2.35,down=.75,over=1.15;if(k<.22)return rest+(up-rest)*ease(k/.22);if(k<.5){const q=(k-.22)/.28;return up+(down-up)*(q*q*(3-2*q))}if(k<.75)return down+(over-down)*ease((k-.5)/.25);return over+(rest-over)*ease((k-.75)/.25)}
 function handQ(k,side){const a0=armAng(k),a=side?Math.PI-a0:a0,sx=side?12.5:19.5,sy=19.5,R=side?6.2:6.6;return [sx+Math.cos(a)*R,sy+Math.sin(a)*R,a0]}
 /* 몸 기울기 */function leanOf(k){if(k<0)return 0;if(k<.22)return -.09*ease(k/.22);if(k<.5)return -.09+.24*ease((k-.22)/.28);return .15*(1-ease((k-.5)/.5))}

 /* drawSword: 휘두르는 동안은 여기서 그리지 않고, 몸을 그린 뒤 손 위치에 그림 */
 {const _ds=drawSword;drawSword=function(x,y,s,fl,now){const k=swingK(now);if(k<0||!(mode==='boss'||mode==='cave'||mode==='village'))return _ds.apply(this,arguments);HV.pend={x,y,s,fl,now,k,t:now};}}
 function drawPendingSword(c,X,Y,kk,fl,side,lean,fx,fy,dfl){const p=HV.pend;HV.pend=null;if(!p)return;const w=curWp(),pose=WPOSE[w.type]||WPOSE.sword,sp=WSPR[w.type]||WSPR.sword,s=p.s,L=(sp.r.length-sp.g)*s*.72,dirS=fl?-1:1,k=p.k;
  /* 그림 좌표(40×48, 옆모습은 왼쪽을 보는 그림) → 화면 좌표: 뒤집기 → 옆모습 폭 → 몸 기울기 */
  const sk=lean*dirS,toW=(px,py)=>{let wx=dfl?X+40*kk-(px+6)*kk:X+(px+6)*kk,wy=Y+(py+10)*kk;if(side)wx=fx+(wx-fx)*.86;wx-=sk*(wy-fy);return [wx,wy]};
  /* 팔 각도 a0는 '앞(오른쪽)을 보는' 기준 → 화면에서는 바라보는 쪽으로 */const wAng=a0=>fl?Math.PI-a0:a0;
  const [qx,qy,a]=handQ(k,side),[hx,hy]=toW(qx,qy);
  if(pose.thrust){const ext=Math.sin(Math.min(1,k/.5)*Math.PI)*L*.45,aw=wAng(-.1);drawWeaponShape(w,hx+Math.cos(aw)*ext,hy+Math.sin(aw)*ext,aw,L,s,p.now,dirS);return}
  /* 궤적: 내려베는 구간 */if(k>.2&&k<.62){for(let j=6;j>=1;j--){const kj=Math.max(.22,k-j*.035),[jx,jy,ja]=handQ(kj,side),[wx,wy]=toW(jx,jy),aa=wAng(ja+.25);for(let d=L*.35;d<=L*1.05;d+=1.6)RA(wx+Math.cos(aa)*d-1,wy+Math.sin(aa)*d-1,2,2,j===1?'#ffffff':(w.trail||'#ffffff'),.14*(7-j)/6)}}
  drawWeaponShape(w,hx,hy,wAng(a+.25),L,s,p.now,dirS)}

 /* ---------- drawKnight: 방향 결정 · 휘두르기 손 위치 · 기울기 · 옆모습 폭 ---------- */
 {const _dk=drawKnight;drawKnight=function(c,x,y,s,fl,wt,idleT){const live=c===ctx&&(mode==='boss'||mode==='cave'||mode==='village')&&typeof P!=='undefined';
   if(!live){const v=HV.view,sw=HV.sw;HV.view='front';HV.sw=null;try{return _dk.apply(this,arguments)}finally{HV.view=v;HV.sw=sw}}
   const now=performance.now(),moving=wt!=null,fx=P.face||{x:0,y:1};let v='front';if(moving){if(Math.abs(fx.y)>Math.abs(fx.x)*1.1)v=fx.y<0?'back':'front';else if(fx.x)v='side'}
   const k=swingK(now);if(k>=0&&v==='back')v='side';
   HV.view=v;const side=v==='side',dfl=side?!fl:fl;HV.sw=k>=0?{hand:handQ(k,side).slice(0,2)}:null;
   const kk=s/2,X=x-s-6*kk,Y=y-6*s-10*kk,cx=X+20*kk,fy=Y+44*kk,lean=leanOf(k),dir=fl?-1:1;
   c.save();try{if(side||lean){c.translate(cx,fy);if(lean)c.transform(1,0,-lean*dir,1,0,0);if(side)c.scale(.86,1);c.translate(-cx,-fy)}
    _dk.call(this,c,x,y,s,dfl,wt,idleT)}finally{c.restore();HV.view='front';HV.sw=null}
   try{if(HV.pend&&now-HV.pend.t<40)drawPendingSword(c,X,Y,kk,fl,side,lean,cx,fy,dfl);else HV.pend=null}catch(e){HV.pend=null}}}
})();
