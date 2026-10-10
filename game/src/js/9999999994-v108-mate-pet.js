/* ================= v108 듀오 동료 펫 (MPET108) =================
   - 듀오 위치 메시지(99999993 tick)와 관전 장면(99999998 frameMsg)에 펫 번호 pt · 변이 펫 pv를 실어 보낸다.
   - 동료를 그릴 때(99999993 drawMate 첫머리) 동료 펫이 동료 뒤쪽(바라보는 반대편)으로 부드럽게 따라온다.
     탑은 v106 내 펫과 같은 크기 · 자리, 보스전은 drawBossPet과 같은 크기 · 자리(땅 펫은 바닥, 나는 펫은 공중).
   - 변이 펫은 PET59.draw로 직접, 보통 펫은 drawPet으로 그리되 그동안 내 장착 펫 번호를 비워
     (변이 펫 그리기도 안에서 drawPet을 부르므로 두 경우 모두) 「내 변이 펫」이 동료 펫에 덮어씌워지지 않게 한다.
   - 결투(PvP) 상대 펫은 그리지 않는다(v106 내 펫도 결투에선 안 그림). 쓰러진 동료의 펫은 흐리게. */
(()=>{try{
 function petAt(m,x,y,fl,pn,boss){const id=m.pt|0,pv=m.pv||'',key=pv||id;
  const K=boss?(id||pv?.95:.75):1.0/* v116 작게 */,side=fl?1:-1,tx=x+side*(boss?20:26);
  const ty=boss?(window.PET105?PET105.at(key,y-34,y+2,K):y-34):y-4;
  const F=m._pet||(m._pet={x:null,y:null,t:0});const dt=Math.min(.05,Math.max(0,(pn-(F.t||pn))/1000));F.t=pn;
  if(F.x==null||F.boss!==boss||Math.hypot(tx-F.x,ty-F.y)>140){F.x=tx;F.y=ty;F.boss=boss}
  const k=Math.min(1,dt*5.5);F.x+=(tx-F.x)*k;F.y+=(ty-F.y)*k;
  const moving=Math.hypot(tx-F.x,ty-F.y)>3,step=!boss&&moving?Math.abs(Math.sin(pn/90))*1.5:0;
  return {id,pv,K,x:Math.round(F.x),y:Math.round(boss?F.y:F.y+2-10*K-step)}}
 function draw(m,x,y,fl,pn,boss){if(!m||m.pt==null)return;/* 펫 정보를 안 보내는 옛 버전 상대 */
  if(window.PVP92&&PVP92.on())return;
  const q=petAt(m,x,y,fl,pn,!!boss),c=ctx,inv=shopInv(),e0=inv.eq.pt;
  c.save();try{inv.eq.pt=-1;if(m.down)c.globalAlpha=.45;
   if(boss&&(!window.PET105||PET105.flies(q.pv||q.id)))glow(q.x,q.y,10,q.id||q.pv?'#ffffff':'#a8f0ff',.25);
   if(q.pv&&window.PET59&&PET59.byId&&PET59.byId(q.pv))PET59.draw(c,q.pv,q.x,q.y,pn,q.K);
   else drawPet(c,q.id,q.x,q.y,pn,q.K)}
  catch(e){}finally{inv.eq.pt=e0;c.restore();c.globalAlpha=1}}
 window.MPET108={draw};
}catch(e){console.error('v108 mate pet',e)}})();
