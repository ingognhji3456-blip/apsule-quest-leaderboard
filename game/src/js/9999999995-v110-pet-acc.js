/* ================= v110 변이 펫 장신구 자리 다듬기 (ACC110) =================
   - 999999996 `PA`(변이 펫 25)와 v102 새 펫 스킨(15)의 장신구는 예전 펫 그림 기준 고정 자리라, v105 새 그림에서 떠 보였다.
   - 펫마다 새 그림의 머리 꼭대기 · 눈 · 몸 가운데 · 몸 크기 · 바라보는 쪽을 표 `PT`에 적고(그림 좌표: 가운데 x=0, 땅 y=0),
     장신구 종류별로 붙는 곳을 정한다: 왕관 · 후광 · 뿔 · 꽃 · 구름 · 동전 = 머리 위, 고글 · 외눈 안경 = 눈, 목도리 = 목,
     궤도 · 도깨비불 · 물방울 = 몸 둘레, 날개 = 등(펫 뒤), 꼬리 = 엉덩이 쪽(펫 뒤).
   - 펫이 돌아서면(PET105와 같은 규칙: P.face.x<0) 장신구도 같이 뒤집힌다. 머리가 오르내리면 그림의 맨 윗줄을 재서 같이 움직인다.
   - 그리기: PET59.draw와 「장착한 변이 펫」을 그리는 drawPet 둘 다 바깥에서 감싸 한 번만 그린다.
     예전 장식(PA · v.acc)은 비운다. 장식을 바꾸려면 `SPEC`(종류 · 색), 펫 자리를 바꾸려면 `PT`. */
(()=>{try{
 if(!window.PET59||!window.PET105||!window.LOOK102)return;
 const TAU=Math.PI*2;
 /* 펫 번호: [머리 위 x,y, 눈 x,y, 몸 x,y, 몸 반폭, 몸 반높이, 바라보는 쪽(1=오른쪽 · -1=왼쪽), 목 x,y(없으면 눈 아래)] */
 const PT=[
  [0,-28,1,-12,0,-12,10,10,-1],[0,-25,0,-19,0,-14,6,9,1],[8,-15,9,-9,0,-7,11,5,1],[-9,-18,-9,-13,2,-11,10,8,-1],[1,-22,1,-15,0,-11,9,10,1],
  [10,-17,11,-10,1,-6,8,5,1],[0,-21,0,-15,0,-9,6,9,1],[2,-21,3,-17,0,-9,8,8,1],[-3,-21,-3,-14,-3,-10,7,9,-1],[2,-31,3,-27,0,-17,7,10,1],
  [10,-8,11,-5,0,-5,10,5,1],[3,-21,4,-16,2,-8,5,7,1,2,-12],[-4,-14,0,-10,0,-8,10,6,1],[6,-17,7,-14,0,-14,8,5,1],[10,-8,11,-6,0,-4,13,3,1],
  [0,-25,0,-19,0,-14,6,9,1],[0,-20,0,-16,0,-15,6,5,1],[0,-25,1,-21,0,-12,6,11,1],[0,-22,1,-17,0,-9,7,9,1],[0,-21,0,-16,4,-15,10,7,-1],
  [0,-29,0,-22,0,-17,8,12,1],[0,-24,1,-21,0,-17,6,7,1,0,-17],[0,-26,0,-23,0,-11,6,12,1],[5,-18,6,-13,1,-11,9,6,1],[11,-18,12,-14,0,-14,14,5,1],
  [0,-26,1,-22,0,-15,6,9,1],[2,-24,3,-21,0,-11,8,9,1],[0,-29,0,-21,0,-11,9,10,1],[9,-20,10,-16,0,-9,10,6,1,7,-11],[8,-28,9,-25,0,-10,10,5,1],
  [0,-11,0,-5,0,-10,11,10,1],[5,-24,6,-20,0,-10,10,8,1],[0,-29,0,-24,0,-14,13,11,1],[0,-31,0,-22,0,-18,7,11,1],[4,-26,5,-22,0,-12,9,9,1],
  [2,-24,2,-21,0,-16,6,8,1],[6,-17,8,-13,0,-12,12,5,1],[7,-20,8,-16,0,-10,10,7,1],[0,-17,2,-13,0,-8,10,8,1],[0,-26,0,-22,0,-14,7,10,1]];
 /* 변이 펫 번호 → [종류, 색, 개수] (angel은 두 개) */
 const SPEC={
  p_tick:[['crown','#ffd84a']],p_firefly:[['halo','#7dffa8']],p_mouse:[['visor','#ff4dd8']],p_sheep:[['cloud']],p_owl:[['orbit','#c8b8ff',3]],
  p_fox:[['tails','#4ab0ff']],p_penguin:[['flower','#ff9ac8']],p_dragon:[['horns','#2a1a3a']],p_cat:[['wisp','#5affd8']],p_phoenix:[['wings','#bfe8ff']],
  p_turtle:[['flower','#ffe36b']],p_squirrel:[['scarf','#ff4d6d']],p_golem:[['crown','#8de4ff']],p_bee:[['halo','#ffd84a']],p_lizard:[['horns','#ffb040']],
  p_snowfairy:[['orbit','#ffffff',4]],p_batcookie:[['wings','#5a0a1a']],p_clockowl:[['monocle']],p_luckycat:[['coin']],p_drone:[['visor','#5affd8']],
  p_jelly:[['bubble']],p_hawk:[['scarf','#ffa060']],p_viper:[['crown','#b6ff4a']],p_whale:[['bubble']],p_skydragon:[['wings','#ffe79a']],
  p_phx:[['wings','#bfe8ff']],p_gdragon:[['halo','#ffd84a']],p_owlking:[['crown','#b48aff']],p_swolf:[['scarf','#4a8aff']],p_qilin:[['horns','#ffd84a']],
  p_cturtle:[['crown','#ffd84a']],p_sfox:[['tails','#c8d8ff']],p_lgolem:[['flower','#ffb0d4']],p_frost:[['orbit','#ffb040',4]],p_gold:[['wings','#2a1a4a']],
  p_crow:[['halo','#ffe79a']],p_rwhale:[['bubble']],p_griffin:[['cloud']],p_slime:[['coin']],p_angel:[['wings','#1a1020'],['horns','#ff4d6d']]};
 const BACK={wings:1,tails:1};
 /* 머리가 오르내리는 만큼: 그림의 머리 위 칸 근처 맨 윗줄을 틀마다 잼 */
 const TOPC=new Map();
 function topOf(id,fr,hx){const key=id+'|'+fr;if(TOPC.has(key))return TOPC.get(key);let v=null;
  try{const cv=PET105.render(id,fr),d=cv.getContext('2d').getImageData(32+hx-2,0,5,64).data;
   for(let y=0;y<64&&v==null;y++)for(let x=0;x<5;x++)if(d[(y*5+x)*4+3]>40){v=y-56;break}}catch(e){}
  TOPC.set(key,v);if(TOPC.size>4000)TOPC.delete(TOPC.keys().next().value);return v}
 /* ---------- 그리기 도구(뒤집기 s) ---------- */
 const RR=(c,x,y,w,h,col,a)=>{c.globalAlpha=a==null?1:a;c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)));c.globalAlpha=1};
 const D={
  crown(c,x,y,k,t,col){y-=2*k;RR(c,x-4*k,y,8*k,2*k,col);for(let i=0;i<3;i++)RR(c,x-4*k+i*3*k,y-2.4*k,2*k,2.4*k,col);RR(c,x-.6*k,y+.4*k,1.2*k,1.2*k,'#ff3a4a')},
  halo(c,x,y,k,t,col){y-=3*k;c.save();c.globalAlpha=.9;c.strokeStyle=col;c.lineWidth=1.2*k;c.beginPath();c.ellipse(x,y,5*k,1.5*k,0,0,TAU);c.stroke();c.restore()},
  horns(c,x,y,k,t,col){y+=2*k;for(const s of [-1,1]){c.fillStyle=col;c.beginPath();c.moveTo(x+s*1.5*k,y+1*k);c.lineTo(x+s*4.5*k,y-5*k);c.lineTo(x+s*3.6*k,y+1*k);c.fill()}},
  flower(c,x,y,k,t,col,s){x+=s*2*k;y-=1*k;for(let i=0;i<5;i++){const a=i*TAU/5;c.fillStyle=col;c.beginPath();c.arc(x+Math.cos(a)*1.6*k,y+Math.sin(a)*1.6*k,1.3*k,0,TAU);c.fill()}RR(c,x-.6*k,y-.6*k,1.2*k,1.2*k,'#fff6a0')},
  cloud(c,x,y,k,t){y-=7*k;for(const [dx,r] of [[-3,2.4],[0,3],[3,2.4]]){c.globalAlpha=.9;c.fillStyle='#5a6a8a';c.beginPath();c.arc(x+dx*k,y,r*k,0,TAU);c.fill()}c.globalAlpha=1;if(Math.floor(t*6)%3===0)RR(c,x,y+2*k,1*k,4*k,'#fff6a0')},
  coin(c,x,y,k,t){y-=6*k;const w=Math.abs(Math.cos(t*3))*3*k+.6*k;c.fillStyle='#ffd84a';c.beginPath();c.ellipse(x,y,w,3*k,0,0,TAU);c.fill();RR(c,x-.4*k,y-1.4*k,.8*k,2.8*k,'#b8861a')},
  visor(c,x,y,k,t,col){RR(c,x-4.5*k,y-1.2*k,9*k,2.4*k,'#14141e');RR(c,x-4*k,y-.7*k,8*k,1.3*k,col,.9)},
  monocle(c,x,y,k,t,col,s){x+=s*1*k;c.save();c.strokeStyle='#ffd84a';c.lineWidth=k;c.beginPath();c.arc(x,y,2.4*k,0,TAU);c.stroke();c.restore();RR(c,x+s*2*k,y+1.4*k,.6*k,5*k,'#ffd84a',.7)},
  scarf(c,x,y,k,t,col,s){RR(c,x-4*k,y-1*k,8*k,2*k,col);for(let i=0;i<4;i++)RR(c,x-s*(4+i*1.6)*k-(s<0?2*k:0),y+Math.sin(t*6-i)*k,2*k,1.6*k,col,1-i*.2)}};
 /* 몸 둘레 · 등 · 꼬리 */
 const B={
  orbit(c,b,k,t,col,s,n){for(let i=0;i<n;i++){const a=t*2+i*TAU/n;RR(c,b.x+Math.cos(a)*b.rx-k,b.y+Math.sin(a)*b.ry-k,2*k,2*k,col,.9)}},
  wisp(c,b,k,t,col){for(let i=0;i<3;i++){const a=t*2.4+i*TAU/3;c.globalAlpha=.8;c.fillStyle=col;c.beginPath();c.arc(b.x+Math.cos(a)*b.rx,b.y+Math.sin(a)*b.ry,1.7*k,0,TAU);c.fill()}c.globalAlpha=1},
  bubble(c,b,k,t){const r=b.r+3*k;c.save();c.globalAlpha=.35;c.strokeStyle='#bff8ff';c.lineWidth=1*k;c.beginPath();c.arc(b.x,b.y,r,0,TAU);c.stroke();c.globalAlpha=.6;c.fillStyle='#ffffff';c.fillRect(Math.round(b.x-r*.55),Math.round(b.y-r*.62),Math.ceil(2*k),Math.ceil(1*k));c.restore()},
  wings(c,b,k,t,col){const fl=Math.sin(t*8)*1.6*k,sp=Math.max(1,Math.min(1.35,b.hw/7)),x=b.x,y=b.y-b.hh*.35;for(const s of [-1,1]){c.globalAlpha=.85;c.fillStyle=col;c.beginPath();c.moveTo(x+s*2*k,y);c.lineTo(x+s*12*sp*k,y-8*k+fl);c.lineTo(x+s*10*sp*k,y+3*k);c.closePath();c.fill()}c.globalAlpha=1},
  tails(c,b,k,t,col,s){const x=b.x-s*b.hw*k*.85,y=b.y-b.hh*.45;for(let i=0;i<5;i++){const a=Math.PI*.6+i*.28+Math.sin(t*3+i)*.08;c.globalAlpha=.75;c.fillStyle=i%2?col:'#c8f4ff';c.beginPath();c.ellipse(x-s*Math.cos(a)*7*k,y-Math.sin(a)*7*k,2.3*k,5*k,-s*a,0,TAU);c.fill()}c.globalAlpha=1}};
 const HEAD={crown:'top',halo:'top',horns:'top',flower:'top',cloud:'top',coin:'top',visor:'eye',monocle:'eye',scarf:'neck'};
 function flipNow(){try{return !window.__petNoFlip&&typeof P!=='undefined'&&!!(P&&P.face&&P.face.x<0)}catch(e){return false}}
 function draw(c,vid,x,y,now,k,back){const L=SPEC[vid],v=PET59.byId(vid);if(!L||!v)return;const id=v.base,p=PT[id];if(!p)return;k=k||1;
  const t=now/1000,fr=Math.floor(now/83.33)%96,m=flipNow()?-1:1,s=p[8]*m,gy=y+10*k,X=px=>x+m*px*k,Y=py=>gy+py*k;
  const t0=topOf(id,0,p[0]),tn=topOf(id,fr,p[0]),dy=(t0!=null&&tn!=null)?Math.max(-4,Math.min(4,tn-t0)):0;
  for(const [kind,col,n] of L){if(!!BACK[kind]!==!!back)continue;c.save();try{
   if(D[kind]){const w=HEAD[kind],pt=w==='top'?[p[0],p[1]]:w==='eye'?[p[2],p[3]]:(p[9]!=null?[p[9],p[10]]:[p[2]-p[8]*3,p[3]+5]);D[kind](c,X(pt[0]),Y(pt[1]+dy),k,t,col,s)}
   else if(B[kind]){const b={x:X(p[4]),y:Y(p[5]+dy*.5),hw:p[6],hh:p[7]*k,rx:(p[6]+3)*k,ry:4*k,r:Math.max(p[6],p[7])*k};B[kind](c,b,k,t,col,s,n||3)}}
   catch(e){}finally{c.restore();c.globalAlpha=1}}}
 /* 예전 장식 비우기 */
 for(const id in SPEC){if(LOOK102.PA[id])delete LOOK102.PA[id];const v=PET59.byId(id);if(v&&v.acc)v.acc=()=>{}}
 let inside=0;
 function wrapDraw(c,vid,x,y,now,k,fn){draw(c,vid,x,y,now,k,true);inside++;let r;try{r=fn()}finally{inside--}draw(c,vid,x,y,now,k,false);return r}
 {const od=PET59.draw;PET59.draw=(c,id,x,y,now,k)=>{if(inside||!SPEC[id])return od(c,id,x,y,now,k);return wrapDraw(c,id,x,y,now,k||1,()=>od(c,id,x,y,now,k))}}
 /* 장착한 변이 펫은 drawPet(원래 번호)로 그려지는 곳(로비 · 전투 · 탑)이 많다 */
 {const bd=drawPet;drawPet=function(c,id,x,y,now,k){if(inside)return bd.apply(this,arguments);let vid=null;
   try{const sm=document.getElementById('shopModal');if(!(sm&&!sm.hidden)&&id===((shopInv().eq||{}).pt||0)){const g=PET59.get(),v=g&&PET59.byId(g);if(v&&v.base===id&&SPEC[g])vid=g}}catch(e){}
   if(!vid)return bd.apply(this,arguments);const a=arguments,th=this;return wrapDraw(c,vid,x,y,now,k||1,()=>bd.apply(th,a))}}
 window.ACC110={PT,SPEC,draw,topOf};
}catch(e){console.error('v110 pet acc',e)}})();
