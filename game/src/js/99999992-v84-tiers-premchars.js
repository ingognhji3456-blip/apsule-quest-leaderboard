/* ================= v84 등급 정리 · 프리미엄 캐릭터 (TP84) =================
   ① 태엽 공방 목록을 등급(값) 순서로: 기본 → 일반 ★ → 희귀 ★★ → 영웅 ★★★ → 전설 ★★★★ → 프리미엄 ♛.
      (저장된 번호는 그대로 두고 화면 순서만 바꿈 — 새로 넣은 싼 장비가 전설 뒤에 나와 헷갈리던 문제)
      공방 · 스킨 상점 모두 같은 등급 이름과 색.
   ② 프리미엄 스킨 3종(공허 검사 · 태엽 성기사 · 네온 비트)을 「캐릭터」로: 캐릭터 목록 맨 끝에 ♛ 프리미엄으로 들어간다.
      - 사지 않았으면 「₩ · 💎 스킨 상점에서」 → 누르면 스킨 상점의 그 캐릭터 화면.
      - 샀으면 「장착하기」 → 내 캐릭터가 그 캐릭터가 됨(체력 · 대시도 그 캐릭터 것). 능력(CB81 PERK) · 세트 효과 · 대시 잔상은 그대로.
      - 스킨 상점에서 장착해도 캐릭터 목록과 맞춰진다. 다른 캐릭터를 고르면 프리미엄 모습은 벗겨진다. */
(()=>{try{
 if(typeof CHARS==='undefined'||!window.SKIN58)return;
 /* ---------- 등급 ---------- */
 const TIER=[{n:'기본',c:'#a8b8c0',k:0},{n:'일반',c:'#8ff0b0',k:1},{n:'희귀',c:'#6ab8ff',k:2},{n:'영웅',c:'#c88aff',k:3},{n:'전설',c:'#ffd166',k:4},{n:'프리미엄',c:'#ff9af0',k:5}];
 {const f=wsTier;wsTier=function(it){if(it&&it.prem)return TIER[5];return f.apply(this,arguments)}}
 /* ---------- 프리미엄 캐릭터 ---------- */
 const PC=[{id:'void',hp:85,dash:9,sub:'공허의 검사'},{id:'clock',hp:100,dash:9,sub:'태엽 성기사'},{id:'neon',hp:90,dash:10,sub:'네온 비트'}];
 const PI={};
 for(const p of PC){const s=SKIN58.byId(p.id);if(!s)continue;const idx=CHARS.length;
  CHARS.push({name:s.name,sub:p.sub,price:0,prem:p.id,hp:p.hp,dash:p.dash,desc:(s.desc||'')+' ◆ 능력: '+(((window.CB81&&CB81.PERK[p.id])||{}).d||''),scarf:null,v84:1});
  CH2DEF[idx]=CH2DEF[s.idx];PI[p.id]=idx}
 const isPrem=i=>!!(CHARS[i]&&CHARS[i].prem);
 const owns=id=>{try{return !!(window.PAY58&&PAY58.ownsKind('skin',id))}catch(e){return false}};
 /* 공방 카드 · 버튼 */
 {const f=wsItemHTML;wsItemHTML=function(k,i){let h=f.apply(this,arguments);if(k==='ch'&&isPrem(i)){const inv=shopInv(),own=owns(CHARS[i].prem),eq=inv.eq.ch===i;
   h=h.replace(/<em class="tg[^"]*">[^<]*<\/em>/,eq?'<em class="tg eq">장착 중</em>':own?'<em class="tg own">✓ 보유</em>':'<em class="tg prem84">₩ · 💎</em>').replace(/<i>★*<\/i>/,'<i>♛</i>')}return h}}
 {const f=wsRefresh;wsRefresh=function(){const r=f.apply(this,arguments);try{const i=wsSelOf('ch');if(shopTab==='ch'&&isPrem(i)){const inv=shopInv(),it=CHARS[i],own=owns(it.prem),eq=inv.eq.ch===i,b=$('wsBtn');
   if(b&&!eq){b.className=own?'own':'buy prem84';b.innerHTML=own?'장착하기':'♛ 스킨 상점에서 사기<small>₩ 또는 💎 다이아로 살 수 있어요</small>'}
   const t=document.querySelector('#wsInfo .tier');if(t)t.textContent='♛ 프리미엄'}}catch(e){}return r}}
 {const f=wsAct;wsAct=function(){const k=shopTab,i=wsSelOf(k);if(k==='ch'&&isPrem(i)){const inv=shopInv(),it=CHARS[i];if(inv.eq.ch===i)return;
   if(!owns(it.prem)){try{gmSfx('ok')}catch(_){}try{window.BBShopOpen&&BBShopOpen('skin',it.prem)}catch(e){}return}
   if(!inv.inv.ch.includes(i))inv.inv.ch.push(i);inv.eq.ch=i;try{SKIN58.equip(it.prem);PAY58&&PAY58.sync()}catch(e){}try{sfx(660,.15,'triangle',.05,1200)}catch(e){}saveNow();renderShop();return}
  return f.apply(this,arguments)}}
 /* 캐릭터 목록 ↔ 스킨 장착 맞추기: 어느 쪽에서 바꿨는지 보고 다른 쪽을 따라가게 */
 let lastCh=null,lastSk=null;
 function sync(){const inv=shopInv(),ch=inv.eq.ch,sk=SKIN58.get();if(ch===lastCh&&sk===lastSk)return;
  const chChanged=ch!==lastCh,skChanged=sk!==lastSk;
  if(skChanged&&sk&&PI[sk]!=null&&ch!==PI[sk]){if(!inv.inv.ch.includes(PI[sk]))inv.inv.ch.push(PI[sk]);inv.eq.ch=PI[sk];try{saveNow()}catch(e){}}
  else if(skChanged&&!sk&&isPrem(ch)){inv.eq.ch=0;try{saveNow()}catch(e){}}
  else if(chChanged&&isPrem(ch)){const id=CHARS[ch].prem;if(owns(id)){if(sk!==id)try{SKIN58.equip(id);PAY58&&PAY58.sync()}catch(e){}}else{inv.eq.ch=0;try{saveNow()}catch(e){}}}
  else if(chChanged&&sk&&PI[sk]!=null&&!isPrem(ch)){try{SKIN58.equip(null);PAY58&&PAY58.sync()}catch(e){}}
  lastCh=inv.eq.ch;lastSk=SKIN58.get()}
 setInterval(()=>{try{sync()}catch(e){}},400);setTimeout(()=>{try{sync()}catch(e){}},1700);

 /* ---------- ① 공방 목록 정렬 (등급 → 값 → 원래 순서) ---------- */
 const rankOf=it=>{const T=wsTier(it);return T.k*1e6+(it.price||0)};
 function sortGrid(){const g=$('shopGrid');if(!g||!g.firstElementChild)return;const L=WS_LIST(shopTab),items=[...g.querySelectorAll(':scope > .wsItem')];if(items.length<2)return;
  const want=items.slice().sort((a,b)=>{const ia=+a.dataset.i,ib=+b.dataset.i;return rankOf(L[ia])-rankOf(L[ib])||ia-ib});
  if(want.every((el,j)=>el===items[j]))return;for(const el of want)g.appendChild(el)}
 {const f=renderShop;renderShop=function(){const r=f.apply(this,arguments);try{sortGrid()}catch(e){}return r}}
 /* 등급 구분선: 같은 등급이 끝나는 곳에 이름표 */
 const st=document.createElement('style');st.id='tp84';st.textContent=`
 #shopGrid .wsItem .tg.prem84{background:linear-gradient(180deg,#ff9af0,#a05ac8)!important;color:#1a0a20!important}
 #wsBtn.prem84{background:linear-gradient(180deg,#ff9af0,#a05ac8)!important;color:#1a0a20!important;border-color:#ffd8f8!important}
 #shopGrid .wsItem.t5 b i{color:#ff9af0}`;document.head.appendChild(st);
 window.TP84={TIER,PI,sync,sortGrid};
}catch(e){console.error('v84 tiers',e)}})();
