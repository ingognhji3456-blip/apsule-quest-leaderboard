/* ================= v56 공허 검사 스킨 (ChatGPT 작업을 원본으로 옮김) =================
   상점 창의 「공허 검사 체험」 → 미리보기 창(정면·옆·뒤 돌려 보기) → 「체험 장착」.
   장착하면 ch2Render(820)를 가로채서 주인공 그림만 바꾼다. 검 휘두르기 모션은 984의 armAng/handQ/leanOf가
   window.__voidSkinEquipped를 보고 바꾼다. 능력치·판정은 그대로. 장착은 창을 닫으면 풀린다(저장 안 함). */
(()=>{try{
 let equipped=false,raf=0,turn=0;
 const sprite=document.createElement('canvas');sprite.width=40;sprite.height=48;
 const palette={o:'#0a0c20',a:'#262449',b:'#493577',c:'#9566ea',h:'#dbc8ff',e:'#6cffe0',d:'#173c4a'};
 function oldPaint(c,t,frame=0){
  c.clearRect(0,0,40,48);c.save();c.imageSmoothingEnabled=false;
  const bob=Math.sin(t*2.6)*.6;
  c.translate(0,Math.round(bob));
  const r=(x,y,w,h,color)=>{c.fillStyle=palette[color]||color;c.fillRect(x,y,w,h)};
  // Split mantle, with its lit edges following the breathing animation.
  for(let y=18;y<40;y++){const wave=Math.round(Math.sin(t*3-y*.28)*1.3);r(6+wave,y,25,1,'o');r(7+wave,y,23,1,y%4?'a':'b');r(7+wave,y,1,1,'c');r(29+wave,y,1,1,'d');}
  const step=frame%2?2:0;
  r(12,32,7,10-step,'o');r(21,32,7,10,'o');
  r(13,33,5,7-step,'b');r(22,33,5,7,'b');
  r(11,40-step,8,3,'a');r(21,40,8,3,'a');r(11,40-step,7,1,'e');r(22,40,6,1,'c');
  r(10,19,20,15,'o');r(12,20,16,12,'a');r(13,21,6,8,'b');r(21,21,6,8,'b');
  r(12,30,16,3,'c');r(14,31,12,2,'a');r(19,30,3,2,'e');
  r(7,20,6,9,'o');r(8,21,4,6,'b');r(8,27,4,4,'a');
  r(28,20,6,9,'o');r(29,21,4,6,'b');r(29,27,4,4,'a');
  r(6,18,9,4,'c');r(7,18,7,1,'h');r(26,18,9,4,'b');r(27,18,7,1,'c');
  r(11,7,18,13,'o');r(12,8,16,11,'b');r(14,7,12,3,'c');r(15,8,10,1,'h');
  r(13,12,14,5,'o');r(14,13,5,2,'e');r(21,13,5,2,'e');r(18,17,5,2,'c');
  r(10,4,3,7,'c');r(9,2,2,4,'h');r(27,4,3,7,'b');r(29,2,2,4,'c');
  r(19,21,3,6,'e');r(17,23,7,2,'e');r(20,22,1,3,'#ffffff');
  // Orbiting motes are part of the appearance only.
  for(let i=0;i<4;i++){const a=t*.9+i*Math.PI/2;c.globalAlpha=.45+.3*Math.sin(t*2+i);r(Math.round(19+17*Math.cos(a)),Math.round(23+19*Math.sin(a)),1,2,i%2?'e':'h');}
  c.restore();
 }
 function paint(c,t,frame=0,view='front',hand=null){
  c.clearRect(0,0,40,48);c.save();c.imageSmoothingEnabled=false;
  const moving=frame!==0,step=moving?Math.sin(t*10)*2:0;
  c.translate(0,moving?Math.abs(step)*.3:Math.sin(t*2.3)*.35);
  const poly=(pts,fill,edge='#080c18')=>{c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fillStyle=fill;c.fill();if(edge){c.strokeStyle=edge;c.lineWidth=.6;c.stroke();}};
  const metal=(x,y,w,h,light=false)=>{
   const g=c.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,light?'#dae0f1':'#8991b2');g.addColorStop(.22,'#525b7b');g.addColorStop(.48,'#232b45');g.addColorStop(.7,'#42415f');g.addColorStop(1,'#111727');
   poly([[x+1,y],[x+w-1,y],[x+w,y+2],[x+w-1,y+h],[x+1,y+h],[x,y+2]],g);
   c.strokeStyle='#b4b6d0';c.lineWidth=.45;c.beginPath();c.moveTo(x+1,y+.7);c.lineTo(x+w-1,y+.7);c.stroke();
  };
  const glow=(pts,color='#78ffe0')=>{c.save();c.strokeStyle=color;c.lineWidth=.7;c.shadowColor=color;c.shadowBlur=2;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.stroke();c.restore();};
  const side=view==='side',back=view==='back',cx=side?19:20;
  // Long split cloak with shaded folds and delayed movement.
  const wave=Math.sin(t*3.2-.8)*(moving?2.2:1);
  const cloak=c.createLinearGradient(8,18,31,39);cloak.addColorStop(0,'#151626');cloak.addColorStop(.32,'#493060');cloak.addColorStop(.52,'#201a35');cloak.addColorStop(.76,'#573773');cloak.addColorStop(1,'#111828');
  poly(side?[[22,18],[28,21],[32+wave,40],[25,37],[22,41],[20,23]]:[[10,18],[30,18],[32+wave,39],[24,42],[20,35],[16,42],[7+wave,39]],cloak);
  glow(side?[[28,23],[29,31],[32+wave,39]]:[[10,23],[9,32],[7+wave,39]],'#af7bdf');
  if(side){metal(16-step*.4,31,5,10);metal(20+step*.4,31,5,10,true);metal(14-step*.4,40,7,3);metal(18+step*.4,40,8,3);}
  else{metal(12,31+step*.4,7,10);metal(21,31-step*.4,7,10,true);metal(11,40+step*.4,8,3);metal(21,40-step*.4,8,3);metal(13,34+step*.4,5,3,true);metal(22,34-step*.4,5,3);}
  metal(side?13:11,19,side?15:18,12,true);
  if(!back){glow([[cx,21],[cx-2,24],[cx+1,25],[cx-1,28]]);if(!side){poly([[12,21],[18,22],[19,26],[13,25]],'#525678');poly([[21,22],[27,21],[26,25],[21,26]],'#303c58');}}
  for(let i=0;i<3;i++)metal(side?14:12,28+i*2,side?14:16,2.5,i===0);
  const arm=(x,far=false)=>{const h=hand&&!far?hand:[x+2,29+(moving?step*.35:0)];c.strokeStyle='#202840';c.lineWidth=4;c.beginPath();c.moveTo(x+2,22);c.lineTo(h[0],h[1]);c.stroke();metal(h[0]-2,h[1]-4,4,5,!far);metal(x-1,18,7,5,!far);metal(x,21,6,3);};
  if(side){arm(25,true);arm(13);metal(12,17,10,6,true);}else{arm(7,true);arm(28);}
  // Formed helmet: raised crown, cheek plates and an actual side visor.
  metal(side?12:12,8,side?15:16,12,true);
  poly(side?[[14,8],[17,4],[21,3],[24,8]]:[[14,8],[17,4],[22,3],[26,8]],'#7c739d');
  if(back){metal(16,10,8,9);glow([[20,10],[20,15],[22,17]],'#aa8aec');}
  else if(side){poly([[14,11],[11,14],[14,17],[19,17],[20,11]],'#141d2d');glow([[12,13],[18,13]]);metal(15,16,6,4);}
  else{poly([[13,12],[19,13],[20,15],[21,13],[27,12],[26,17],[21,19],[19,19],[14,17]],'#111b2b');glow([[14,13],[18,14]]);glow([[22,14],[26,13]]);metal(18,15,4,5);}
  if(back){poly([[11,21],[29,21],[30+wave,37],[23,40],[20,34],[16,40],[9+wave,37]],cloak);for(let i=0;i<3;i++)glow([[18+i*2,23],[16+i*2,27],[19+i*2,31]],i===1?'#80ffe0':'#aa76da');}
  // Light escapes from shoulder seams and cloak hem, not random screen positions.
  const anchors=side?[[15,21],[25,22],[30+wave,36]]:[[9,21],[31,21],[10+wave,36],[28+wave,37]];
  for(let i=0;i<12;i++){const a=anchors[i%anchors.length],life=(t*(moving?1.2:.65)+i*.173)%1;
   const x=a[0]+Math.sin(i*2.4)*life*3+(side?life*2:0),y=a[1]-life*6;
   c.globalAlpha=(1-life)*.7;c.fillStyle=i%3?'#85e8df':'#b089ed';c.shadowColor=c.fillStyle;c.shadowBlur=1.5;
   c.fillRect(x,y,i%3?.55:.9,i%3?1.1:.55);
  }
  c.restore();
 }
 const original=ch2Render;
 ch2Render=function(idx,f,b,bl,t){
  if(!equipped||idx!==(shopInv().eq.ch||0))return original.apply(this,arguments);
  paint(sprite.getContext('2d'),t,f,window.__HV?.view||'front',window.__HV?.sw?.hand);return sprite;
 };
 const d=document.createElement('dialog');d.id='voidWardrobe';d.setAttribute('aria-label','공허 검사 스킨 미리보기');
 const st=document.createElement('style');st.textContent='#voidWardrobe{box-sizing:border-box;width:min(620px,94vw);max-height:92dvh;overflow:auto;background:#101326;color:#eeeaff;border:1px solid #9975df;border-radius:20px;padding:22px;font:15px system-ui}#voidWardrobe::backdrop{background:#050610cc}#voidWardrobe h2{margin:6px 0}#voidWardrobe p{color:#c2b9d9;line-height:1.6}#voidWardrobe canvas{width:100%;height:220px;object-fit:contain;background:radial-gradient(ellipse at 50% 75%,#3c2968,#101326 65%);border-radius:14px;image-rendering:pixelated}#voidWardrobe button{padding:12px 16px;color:#f4edff;background:#463367;border:1px solid #a183d1;border-radius:10px;font:inherit;cursor:pointer}#voidWardrobe .actions{display:flex;gap:8px;flex-wrap:wrap}#voidWardrobe small{color:#74ead7}';
 document.head.appendChild(st);document.body.appendChild(d);
 d.innerHTML='<small>첫 번째 스킨 · 개발 체험판</small><h2>공허 검사</h2><p>흑자색 갑옷, 청록색 눈빛, 갈라진 망토와 떠도는 빛 조각.</p><canvas width="400" height="220" aria-label="공허 검사 애니메이션"></canvas><p>외형만 바뀌며 공격력·판정·점수는 그대로예요. 판매 전 체험용으로, 장착은 이 게임 창을 닫을 때까지 유지돼요.</p><div class="actions"><button id="voidEquip"></button><button id="voidTurn">방향 바꾸기</button><button id="voidClose">닫기</button></div><p id="voidState" role="status"></p>';
 function update(){d.querySelector('#voidEquip').textContent=equipped?'스킨 해제':'체험 장착';d.querySelector('#voidState').textContent=equipped?'공허 검사 장착 중 · 캐릭터 외형에 적용됩니다.':'기존 캐릭터 외형을 사용 중입니다.';}
 function animate(ms){if(!d.open)return;const c=d.querySelector('canvas').getContext('2d');c.clearRect(0,0,400,220);c.imageSmoothingEnabled=false;c.save();c.translate(turn===3?280:120,10);if(turn===3)c.scale(-1,1);paint(sprite.getContext('2d'),ms/1000,Math.floor(ms/180)%4,['front','side','back','side'][turn]);c.drawImage(sprite,0,0,160,192);c.restore();raf=requestAnimationFrame(animate);}
 function open(){if(d.open)return;update();d.showModal();raf=requestAnimationFrame(animate);}
 d.querySelector('#voidEquip').onclick=()=>{equipped=!equipped;window.__voidSkinEquipped=equipped;update();};
 d.querySelector('#voidTurn').onclick=()=>{turn=(turn+1)%4;d.querySelector('#voidTurn').textContent=['정면','왼쪽','뒷모습','오른쪽'][turn]+' · 방향 바꾸기';};
 d.querySelector('#voidClose').onclick=()=>d.close();
 d.addEventListener('close',()=>cancelAnimationFrame(raf));
 d.addEventListener('keydown',e=>e.stopPropagation());d.addEventListener('pointerdown',e=>e.stopPropagation());
 function mount(){const nav=document.querySelector('#bbShop nav');if(nav&&!nav.querySelector('[data-void]')){const b=document.createElement('button');b.dataset.void='1';b.textContent='공허 검사 체험';b.onclick=open;nav.appendChild(b);}}
 /* 상점 창 안쪽만 감시: 상점이 목록을 다시 그릴 때 체험 단추를 다시 붙임 */
 const shopEl=document.getElementById('bbShop');if(shopEl)new MutationObserver(mount).observe(shopEl,{childList:true,subtree:true});mount();
}catch(e){console.error('v56 void skin',e)}})();
