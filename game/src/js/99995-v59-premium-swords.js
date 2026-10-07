/* ================= v59 새 검 3자루 (현금 상품) =================
   스킨이 아니라 새 무기다. 능력은 「시간의 검」과 비슷한 최고 수준(아래 stat)으로, 돈으로 더 세지지는 않게 맞췄다.
     ① 공허의 대검 VOIDREAVER   ₩3,000  검은 칼날에 청록 날, 칼날에서 피어오르는 공허 안개 · 휘두르면 공허 충격파
     ② 태엽 톱니검 GEARSABER    ₩3,500  톱니 이빨이 달린 황동 칼날, 손잡이 톱니가 돎 · 휘두르면 톱니 불꽃과 째깍 고리
     ③ 비트 브레이커 BEAT BREAKER ₩4,500  칼날 마디가 박자마다 차례로 켜지는 네온 검 · 휘두르면 소리 파동 고리
   지금은 결제가 없어서 「입어보기」만 된다: 들고 있는 검의 그림·궤적·이펙트만 바뀌고 공격력은 지금 검 그대로.
   (산 뒤에는 stat을 쓰도록 할 예정 — 서버 /api/shop/owned에 sword_<id>가 있으면)
   그리기: WSPR(310)에 새 모양을 넣고, drawWeaponShape를 감싸서 지금 내 검을 그릴 때만 새 검으로 바꿔 그린다.
   휘두르기 이펙트는 984가 부르는 window.__wpFx. */
(function(){try{
 if(typeof WSPR==='undefined'||typeof WPOSE==='undefined')return;
 WSPR.voidblade={g:3,pal:{o:'#07060f',P:'#5affd8',g:'#2a2350',G:'#3d3570',C:'#4a3f86',c:'#8c80d8',V:'#5affd8',B:'#1d1838',b:'#3a3266',e:'#5affd8',w:'#c8fff2'},
  r:["..oPo..","..oGo..","..ogo..","..oGo..","..ogo..","oCcVcCo","oCCVCCo",".oeBbo.",".oeBbo.",".oeBbo.",".oeBbo.",".oeBbo.",".oeBbo.",".oeBbo.",".oeBbo.",".oeBbo.",".oeBbo.","..eBo..","..eb...","...w..."]};
 WSPR.gearsaber={g:3,pal:{o:'#1a1206',P:'#ffd84a',g:'#5a3a14',G:'#8a5a14',C:'#d8a23a',c:'#ffe9a8',R:'#ff4d6d',B:'#efe6d2',b:'#c9bc9c',T:'#d8a23a',e:'#fff8e0'},
  r:["..oPo..","..oGo..","..ogo..","..oGo..","..ogo..","oCcRcCo",".oCCCo.",".TeBbo.","T.eBbo.",".TeBbo.","T.eBbo.",".TeBbo.","T.eBbo.",".TeBbo.","T.eBbo.",".TeBbo.","..eBo..","..eb...","...e..."]};
 WSPR.beatbreaker={g:3,pal:{o:'#0a0c14',P:'#ff3ad6',g:'#262c46',G:'#3a4262',C:'#29f0ff',c:'#ffe14d',B:'#151a2a','1':'#ff3ad6','2':'#b05cff','3':'#29f0ff','4':'#5affb0','5':'#ffe14d',e:'#ffffff'},
  r:["..oPo..","..oGo..","..ogo..","..oGo..","..ogo..","oCCcCCo","oC.c.Co",".oB1Bo.",".oB1Bo.",".oB2Bo.",".oB2Bo.",".oB3Bo.",".oB3Bo.",".oB4Bo.",".oB4Bo.",".oB5Bo.",".oB5Bo.","..oeo..","...e..."]};
 WPOSE.voidblade=Object.assign({},WPOSE.great||WPOSE.sword);WPOSE.gearsaber=Object.assign({},WPOSE.sword);WPOSE.beatbreaker=Object.assign({},WPOSE.katana||WPOSE.sword);
 const BEAT_COL={'1':'#ff3ad6','2':'#b05cff','3':'#29f0ff','4':'#5affb0','5':'#ffe14d'};
 function beatPh(){try{if(typeof mus!=='undefined'&&mus&&mus.ms&&mus.T0){const q=(performance.now()-mus.T0)/mus.ms;return q}}catch(e){}return performance.now()/500}
 const RAW=(c,x,y,w,h,col,a)=>{c.globalAlpha=a;c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)))};
 const tipOf=(H,q)=>{const [px,py,pa]=H.handQ(q),[tx,ty]=H.toW(px,py),a=H.wAng(pa+.25);return {x:tx,y:ty,a,tx:tx+Math.cos(a)*H.L,ty:ty+Math.sin(a)*H.L}};
 const SW=[
  {id:'voidreaver',type:'voidblade',name:'공허의 대검',en:'VOIDREAVER',price:3000,tier:'영웅',col:'#5affd8',trail:'#5affd8',
   stat:{dmg:1.88,crit:.1,range:12,grogi:.18},desc:'빛을 삼키는 검은 대검. 청록 날을 따라 공허 안개가 피어오르고, 휘두르면 공허 충격파가 퍼져요.',tags:['공격력 「시간의 검」급','칼날의 공허 안개','휘두르면 공허 충격파'],
   fx(c,k,H){if(k>.22&&k<.62)for(let j=1;j<=7;j++){const T=tipOf(H,Math.max(.22,k-j*.02));for(let d=H.L*.35;d<=H.L;d+=1.8)RAW(c,T.x+Math.cos(T.a)*d-1,T.y+Math.sin(T.a)*d-1,2.4,2.4,j%2?'#5affd8':'#3a3266',.3*(8-j)/7)}
    if(k>.45&&k<.95){const T=tipOf(H,.5),q=(k-.45)/.5,r=H.L*(.3+q*1.1);c.save();c.globalAlpha=.7*(1-q);c.strokeStyle='#07060f';c.lineWidth=Math.max(2,H.s*1.2);c.beginPath();c.arc(T.tx,T.ty,r,T.a-1.2,T.a+1.2);c.stroke();c.strokeStyle='#5affd8';c.lineWidth=Math.max(1,H.s*.45);c.stroke();c.restore();c.globalAlpha=1}}},
  {id:'gearsaber',type:'gearsaber',name:'태엽 톱니검',en:'GEARSABER',price:3500,tier:'영웅',col:'#ffcf5a',trail:'#ffdf8a',
   stat:{dmg:1.9,crit:.14,range:9,grogi:.12},desc:'날에 톱니 이빨이 달린 황동 검. 손잡이 톱니가 쉬지 않고 돌고, 휘두르면 톱니 불꽃이 튀어요.',tags:['공격력 「시간의 검」급','손잡이에서 도는 톱니','휘두르면 톱니 불꽃 · 째깍 고리'],
   fx(c,k,H){if(k>.22&&k<.62)for(let j=1;j<=6;j++){const T=tipOf(H,Math.max(.22,k-j*.022));for(let d=H.L*.3;d<=H.L;d+=2)RAW(c,T.x+Math.cos(T.a)*d-1,T.y+Math.sin(T.a)*d-1,2.2,2.2,j===1?'#fff8d8':'#ffcf5a',.26*(7-j)/6)}
    if(k>.42&&k<.9){const T=tipOf(H,.45),q=(k-.42)/.48;for(let i=0;i<12;i++){const a=i*TAU/12+q*3,d=H.L*(.2+q*.9);RAW(c,T.tx+Math.cos(a)*d-1,T.ty+Math.sin(a)*d-1+q*q*10,2.4,2.4,i%3?'#ffcf5a':'#ffffff',1-q)}c.save();c.globalAlpha=.6*(1-q);c.strokeStyle='#ffe9a8';c.lineWidth=1.5;c.setLineDash([3,2]);c.beginPath();c.arc(T.tx,T.ty,H.L*(.35+q*.5),0,TAU);c.stroke();c.restore();c.globalAlpha=1}}},
  {id:'beatbreaker',type:'beatbreaker',name:'비트 브레이커',en:'BEAT BREAKER',price:4500,tier:'전설',col:'#ff3ad6',trail:'rainbow',
   stat:{dmg:1.86,crit:.12,range:10,grogi:.16},desc:'칼날 마디가 박자마다 차례로 켜지는 네온 검. 휘두르면 소리 파동이 고리처럼 번져요.',tags:['공격력 「시간의 검」급','박자에 맞춰 켜지는 칼날','휘두르면 소리 파동 고리'],
   fx(c,k,H){const cols=['#ff3ad6','#b05cff','#29f0ff','#5affb0','#ffe14d'];if(k>.22&&k<.62)for(let j=1;j<=8;j++){const T=tipOf(H,Math.max(.22,k-j*.02));for(let d=H.L*.35;d<=H.L;d+=1.8)RAW(c,T.x+Math.cos(T.a)*d-1,T.y+Math.sin(T.a)*d-1,2.2,2.2,cols[j%5],.3*(9-j)/8)}
    if(k>.45){const T=tipOf(H,.5),q=Math.min(1,(k-.45)/.55);c.save();for(let i=0;i<3;i++){const qq=Math.max(0,q-i*.15);c.globalAlpha=.7*(1-qq);c.strokeStyle=cols[(i*2)%5];c.lineWidth=1.5;c.beginPath();c.arc(T.tx,T.ty,H.L*(.2+qq*1.1),0,TAU);c.stroke()}c.restore();c.globalAlpha=1}}}];
 let cur=null;
 const SWORD59=window.SWORD59={list:SW.map(s=>Object.assign({cat:'sword'},s)),get:()=>cur,byId:id=>SW.find(s=>s.id===id),
  equip(id){cur=id&&SW.find(s=>s.id===id)?id:null;const s=cur&&SWORD59.byId(cur);window.__wpFx=s?s.fx:null;window.__wpTrail=s?s.trail:null}};
 /* 미리보기(상점 무대): 아무 캔버스에나 검 그림을 그림. cs = 한 칸 크기 */
 SWORD59.preview=(c,id,hx,hy,ang,cs,now)=>{const S=SWORD59.byId(id);if(!S)return;const sp=WSPR[S.type];if(S.type==='beatbreaker'){const lit=Math.floor(beatPh()*2)%5;for(const k of ['1','2','3','4','5'])sp.pal[k]=(+k-1)===lit?'#ffffff':BEAT_COL[k]}
  const rows=sp.r,n=rows.length,wd=rows[0].length,cx=(wd-1)/2,ca=Math.cos(ang),sa=Math.sin(ang),px=-sa,py=ca,sz=Math.ceil(cs)+1;
  for(let j=0;j<n;j++){const d=(j-sp.g)*cs,row=rows[j];for(let i=0;i<wd;i++){const col=sp.pal[row[i]];if(!col)continue;const o2=(i-cx)*cs;c.fillStyle=col;c.fillRect(Math.round(hx+ca*d+px*o2-sz/2),Math.round(hy+sa*d+py*o2-sz/2),sz,sz)}}
  const t=now/1000,tip=(n-1-sp.g)*cs;c.save();
  for(let i=0;i<8;i++){const q=(t*.6+i/8)%1,d=tip*(.25+.7*((i*37)%10)/10),x=hx+ca*d+Math.sin(t*3+i)*cs*2,y=hy+sa*d-q*cs*8;c.globalAlpha=(1-q)*.8;c.fillStyle=S.type==='voidblade'?(i%2?'#5affd8':'#8c80d8'):S.type==='gearsaber'?(i%2?'#ffe9a8':'#ffcf5a'):['#ff3ad6','#29f0ff','#ffe14d','#5affb0'][i%4];c.fillRect(Math.round(x),Math.round(y),Math.ceil(cs*.8),Math.ceil(cs*.8))}c.restore();c.globalAlpha=1};
 let baseShape=drawWeaponShape;
 /* 칼날 위 장식 (가만히 있을 때도) */
 function deco(w,hx,hy,ang,s,now,A){const sp=WSPR[w.type];if(!sp)return;const n=sp.r.length,cs=s*.72,ca=Math.cos(ang),sa=Math.sin(ang),tip=(n-1-sp.g)*cs,t=now/1000;A=A==null?1:A;
  if(w.type==='voidblade'){for(let i=0;i<5;i++){const q=(t*.7+i/5)%1,d=tip*(.3+.6*((i*37)%10)/10);RA(hx+ca*d+Math.sin(t*3+i)*2-1,hy+sa*d-q*7-1,2,2,i%2?'#5affd8':'#8c80d8',(1-q)*.7*A)}glow(hx+ca*tip*.6,hy+sa*tip*.6,7,'#5affd8',.14*A)}
  else if(w.type==='gearsaber'){const gx=hx+ca*(5.5-sp.g)*cs,gy=hy+sa*(5.5-sp.g)*cs;for(let i=0;i<8;i++){const a=t*4+i*TAU/8;RA(gx+Math.cos(a)*3.2*s*.5-.5,gy+Math.sin(a)*3.2*s*.5-.5,1.4,1.4,i%2?'#ffe9a8':'#8a5a14',A)}if(Math.floor(t*3)%4===0)RA(hx+ca*tip-1,hy+sa*tip-1,2,2,'#ffffff',.8*A)}
  else if(w.type==='beatbreaker'){glow(hx+ca*tip*.6,hy+sa*tip*.6,8,'#ff3ad6',.12*A)}}
 {const base=drawWeaponShape;baseShape=base;drawWeaponShape=function(w,hx,hy,ang,L,s,now,dirS,al){
   let ww=w;try{const sm=document.getElementById('shopModal');if(cur&&!(sm&&!sm.hidden)&&w===curWp()){const S=SWORD59.byId(cur);ww=Object.assign({},w,{type:S.type,col:S.col,trail:S.trail==='rainbow'?'#ff3ad6':S.trail})}}catch(e){}
   if(ww.type==='beatbreaker'){const ph=beatPh(),lit=Math.floor(ph*2)%5;for(const k of ['1','2','3','4','5']){const on=(+k-1)===lit;WSPR.beatbreaker.pal[k]=on?'#ffffff':BEAT_COL[k]}}
   const r=base.call(this,ww,hx,hy,ang,L,s,now,dirS,al);try{if(ww!==w||WSPR[ww.type]&&/voidblade|gearsaber|beatbreaker/.test(ww.type))deco(ww,hx,hy,ang,s,now,al)}catch(e){}return r}}
}catch(e){console.error('v59 swords',e)}})();
