/* ================= v106 탑에서도 펫이 따라다님 (TPET106) =================
   - 999997 탑 draw()가 그리는 목록(아래쪽부터 차례로)에 펫 한 칸을 넣는다(TPET106.list).
   - 펫은 캐릭터 뒤쪽(바라보는 반대편) 조금 떨어진 자리로 부드럽게 따라온다. 멀리 떨어지면(층 이동) 바로 옆으로.
   - 캐릭터가 공격하면 펫이 살짝 뛰고, 멈춰 있으면 제자리에서 숨 쉬듯 움직인다(그림 자체 움직임).
   - 관전 중(내 캐릭터를 안 그릴 때) · 결투 중에는 그리지 않는다. 크기는 탑 캐릭터(2배)에 맞춰 K. */
(()=>{try{
 if(!window.TW71)return;
 const K=1.35,F={x:null,y:null,t:0,hop:0,last:0,an:-1};
 function update(now){const dt=Math.min(.05,Math.max(0,(now-(F.t||now))/1000));F.t=now;
  const side=(P.face&&P.face.x<0)?1:-1,tx=P.x+side*32,ty=P.y-4;
  if(F.x==null||Math.hypot(tx-F.x,ty-F.y)>140){F.x=tx;F.y=ty}
  const k=Math.min(1,dt*5.5);F.x+=(tx-F.x)*k;F.y+=(ty-F.y)*k;
  /* 공격할 때 살짝 뛰기 */const T=TW71.T,n=T&&T.slash?T.slash.length:0;if(n>F.an&&F.an>=0)F.hop=now;F.an=n}
 function draw(now){const id=(shopInv().eq||{}).pt||0;if(!id&&id!==0)return;
  const hp=now-F.hop<260?Math.sin((now-F.hop)/260*Math.PI)*5:0,moving=Math.hypot((P.x+((P.face&&P.face.x<0)?1:-1)*32)-F.x,(P.y-4)-F.y)>3,step=moving?Math.abs(Math.sin(now/90))*1.5:0;
  drawPet(ctx,id,Math.round(F.x),Math.round(F.y+2-10*K-hp-step),now,K)}
 function list(L,now){try{if(window.WATCH95&&WATCH95.specOn())return;if(window.PVP92&&PVP92.on())return;const T=TW71.T;if(!T||T.bossCard)return;
  if(T.dead&&Math.floor(now/90)%2)return;update(now);L.push({y:F.y,fn:()=>{try{draw(now)}catch(e){}}})}catch(e){}}
 window.TPET106={list,F};
}catch(e){console.error('v106 tower pet',e)}})();
