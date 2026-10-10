/* ================= v59 상점 「✦ 스킨 · 무기 · 연출」 (v58 스킨 상점을 분류별로 넓힘) =================
   상점(태엽 공방)의 「✦ 스킨 · 무기 · 연출」 탭 → 이 창(window.BBShopOpen). 보스팩은 뺐다.
   분류 탭: 캐릭터 스킨(프리미엄 3 + 변이 10, 99992·99994) · 펫 스킨(변이 10, 99994) · 무기(새 검 3, 99995)
            · 연출(승리 연출 3 + 로비 테마 3, 99996) · 세트(묶음 할인) · 내 보관함(로그인하면 /api/shop/owned)
   왼쪽 큰 무대에서 고른 상품을 움직이며 보여 주고, 오른쪽 카드 목록에서 고른다.
   「입어보기」는 바로 게임에 적용(저장 안 함). 「구매하기」는 결제 준비 중 안내만 보여 준다.
   서버 상품 번호: skin_<id> · pet_<id> · sword_<id> · fx_<id> · set_<id> (app.py SHOP_PRODUCTS와 같게)
   v119: 탭은 프리미엄 캐릭터(+ 전용 스킨 PREM119) · 펫 묶음(pack_<펫 스킨>, ₩ 또는 v124부터 💎) · 무기 · 연출 · 세트 · 보관함. 변이 스킨 · 펫 스킨은 태엽 공방(9999999998)으로 옮김 — window.BBShopAPI로 같은 상품 · 보유 · 장착을 씀. */
(()=>{try{
 const FONT=typeof FONT_STACK!=='undefined'?FONT_STACK:'sans-serif';
 const won=n=>'₩'+Number(n).toLocaleString('ko-KR');
 const safe=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const account=()=>window.ACCT55?.get()||{};
 const sheet=document.createElement('dialog');sheet.id='bbShop';sheet.setAttribute('aria-label','스킨 · 무기 · 연출 상점');
 const style=document.createElement('style');
 style.textContent=`
 #bbShop{box-sizing:border-box;width:min(1040px,96vw);max-height:94dvh;overflow:auto;padding:0;border:0;border-radius:18px;background:#0a0f17;color:#eef4ff;font:14px ${FONT};box-shadow:0 0 0 1px #ffffff1a,0 30px 90px #000d}
 #bbShop::backdrop{background:radial-gradient(ellipse at 50% 30%,#1a1030cc,#000000e6)}
 #bbShop *{box-sizing:border-box}
 .ssHead{position:sticky;top:0;z-index:3;display:flex;align-items:center;gap:14px;flex-wrap:wrap;padding:14px 18px;background:linear-gradient(90deg,#1b1233f2,#0d1a26f2);border-bottom:1px solid #ffffff14;backdrop-filter:blur(6px)}
 .ssHead h2{margin:0;font-size:20px;font-weight:900;letter-spacing:.06em;background:linear-gradient(90deg,#ffe58a,#ff8fd0,#8ad8ff);-webkit-background-clip:text;background-clip:text;color:transparent}
 .ssHead small{display:block;color:#9fb0c8;font-size:12px;font-weight:600;margin-top:2px}
 .ssTabs{display:flex;gap:6px;margin-left:auto;flex-wrap:wrap}
 .ssTabs button,.ssX{font:800 13px ${FONT};color:#cfdcf0;background:#ffffff0d;border:1px solid #ffffff1a;border-radius:999px;padding:8px 13px;cursor:pointer;transition:background .15s,border-color .15s;white-space:nowrap}
 .ssTabs button[aria-pressed=true]{background:linear-gradient(180deg,#ffe58a,#f0b23a);color:#2a1a06;border-color:#fff2b0}
 .ssTabs button:hover,.ssX:hover{border-color:#ffe58a88}
 .ssBody{padding:16px 18px 20px}
 .ssGrid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:16px}
 .ssStage{position:relative;border-radius:16px;overflow:hidden;background:#06080e;border:1px solid #ffffff14;display:flex;flex-direction:column}
 .ssStage canvas{width:100%;aspect-ratio:4/3;image-rendering:pixelated;display:block}
 .ssTier{position:absolute;top:12px;left:12px;font:900 11px ${FONT};letter-spacing:.12em;padding:5px 10px;border-radius:6px;color:#0a0f17}
 .ssViews{position:absolute;top:10px;right:10px;display:flex;gap:4px}
 .ssViews button{font:800 11px ${FONT};padding:5px 9px;border-radius:999px;border:1px solid #ffffff26;background:#0a0f17aa;color:#cfdcf0;cursor:pointer}
 .ssViews button[aria-pressed=true]{background:#eef4ff;color:#0a0f17}
 .ssInfo{padding:14px 16px 16px;background:linear-gradient(180deg,#0e1420,#0a0f17);border-top:1px solid #ffffff10}
 .ssInfo h3{margin:0;font-size:23px;font-weight:900}
 .ssInfo .en{color:#8ea2c0;font-size:11px;font-weight:800;letter-spacing:.22em;margin-top:2px}
 .ssInfo p{margin:8px 0 10px;color:#c2cee0;line-height:1.55;font-size:13px}
 .ssTags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}
 .ssTags span{font-size:11px;font-weight:800;padding:4px 9px;border-radius:999px;background:#ffffff0f;border:1px solid #ffffff1c;color:#dfe8f6}
 .ssBuy{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
 .ssPrice{font:900 25px ${FONT};margin-right:auto;color:#fff4c2;text-shadow:0 0 14px #ffd16655}
 .ssPrice s{font-size:14px;color:#8ea2c0;margin-right:6px;font-weight:700}
 .ssPrice small{font-size:11px;color:#8ea2c0;font-weight:700;margin-left:6px}
 .ssBtn{font:900 14px ${FONT};padding:11px 18px;border-radius:12px;cursor:pointer;border:1px solid #ffffff2a;background:#ffffff10;color:#eef4ff;transition:transform .1s,filter .15s}
 .ssBtn:hover{filter:brightness(1.15)}.ssBtn:active{transform:translateY(1px)}
 .ssBtn.lock118{display:flex;flex-direction:column;align-items:center;gap:2px;background:#3a2a10;border-color:#ffd16688;color:#ffe3a0}.ssBtn.lock118 small{font-size:10.5px;opacity:.8}.ssCard.lk118{opacity:.62}.ssCard.lk118::after{content:'🔒';position:absolute;right:8px;top:6px;font-size:13px}
 .ssBtn.try[aria-pressed=true]{background:#5affd822;border-color:#5affd8;color:#c8fff2}
 .ssBtn.buy{background:linear-gradient(180deg,#ffe58a,#f0a82a);color:#2a1606;border-color:#fff2b0;box-shadow:0 6px 20px #f0a82a44}
 .ssNote{min-height:18px;margin-top:8px;font-size:12px;color:#ffcf8a}
 .ssSide{display:flex;flex-direction:column;gap:10px;min-width:0}
 .ssList{display:flex;flex-direction:column;gap:8px;max-height:min(62dvh,560px);overflow:auto;padding-right:4px}
 .ssSec{font:900 12px ${FONT};letter-spacing:.14em;color:#8ea2c0;margin:6px 2px 0}
 .ssCard{position:relative;display:grid;grid-template-columns:72px 1fr auto;gap:12px;align-items:center;padding:8px 10px;border-radius:12px;background:linear-gradient(135deg,#121a28,#0d131e);border:1px solid #ffffff14;cursor:pointer;text-align:left;color:inherit;font:inherit;transition:border-color .15s,transform .12s,box-shadow .15s}
 .ssCard:hover{transform:translateY(-1px);border-color:#ffffff33}
 .ssCard[aria-pressed=true]{border-color:var(--tc);box-shadow:0 0 0 1px var(--tc),0 8px 22px #0008}
 .ssCard canvas{width:72px;height:72px;border-radius:9px;image-rendering:pixelated;background:#070a10}
 .ssCard b{display:block;font-size:15px;font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 .ssCard em{font-style:normal;display:inline-block;font-size:10px;font-weight:900;letter-spacing:.1em;padding:2px 7px;border-radius:5px;color:#0a0f17;margin-bottom:3px}
 .ssCard .sub{color:#8ea2c0;font-size:11px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 .ssCard .pr{font-weight:900;color:#fff0b0;font-size:14px;text-align:right}
 .ssCard .pr.own{color:#7dffb0}.ssBtn.buy.own{background:#1d3a2c!important;color:#7dffb0!important;cursor:default}
 .ssCard .on{display:block;font-size:10px;font-weight:900;color:#5affd8;text-align:right;margin-top:2px}
 .ssPromise{padding:11px 13px;border-radius:12px;background:#ffffff08;border:1px dashed #ffffff22;color:#9fb0c8;font-size:12px;line-height:1.6}
 .ssEmpty{padding:30px;text-align:center;color:#9fb0c8;border-radius:14px;background:#ffffff06;border:1px solid #ffffff12}
 .ssSet{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 10px}.ssSet span{font-size:12px;font-weight:800;padding:5px 9px;border-radius:8px;background:#ffffff0c;border:1px solid #ffffff1a}
 @media (max-width:760px){.ssGrid{grid-template-columns:1fr}.ssTabs{margin-left:0;width:100%}.ssTabs button{flex:1 1 auto;padding:7px 9px;font-size:12px}.ssList{max-height:none}}
 `;
 document.head.appendChild(style);document.body.appendChild(sheet);

 /* ---------- 상품 목록 모으기 ---------- */
 const TIER_BG={'변이':'linear-gradient(90deg,#c8ffe0,#6affc8)','희귀':'linear-gradient(90deg,#b8ecff,#6ab8ff)','영웅':'linear-gradient(90deg,#e0b0ff,#a070ff)','전설':'linear-gradient(90deg,#ffe58a,#ffb03a)','세트':'linear-gradient(90deg,#ffb0d4,#ff6a9a)','전용':'linear-gradient(90deg,#fff2a8,#ff9af0,#8ad8ff)','묶음':'linear-gradient(90deg,#b8ffd8,#6ad8ff)'};
 const TIER_EN={'변이':'VARIANT','희귀':'RARE','영웅':'EPIC','전설':'LEGENDARY','세트':'BUNDLE','전용':'EXCLUSIVE','묶음':'PET PACK'};
 /* v119 펫 묶음 값(원래 펫 등급별) — app.py _PACK_PRICE와 같게 */
 const PACK_PRICE={'일반':1500,'희귀':2500,'영웅':3500,'전설':4500,'유물':5200,'신화':5500,'초월':5900};
 const SETS=[
  {id:'set_void',name:'공허 세트',en:'VOID BUNDLE',price:6900,col:'#9a66ff',items:[['skin','void'],['sword','voidreaver'],['fx','v_void'],['fx','p_void']],desc:'공허 검사 + 공허의 대검 + 공허의 붕괴 + 공허의 무대를 한 번에.'},
  {id:'set_clock',name:'태엽 세트',en:'CLOCKWORK BUNDLE',price:7900,col:'#ffcf5a',items:[['skin','clock'],['sword','gearsaber'],['fx','v_clock'],['fx','p_clock']],desc:'태엽 성기사 + 태엽 톱니검 + 태엽 꽃가루 + 황금 시계탑을 한 번에.'},
  {id:'set_neon',name:'네온 세트',en:'NEON BUNDLE',price:8900,col:'#ff3ad6',items:[['skin','neon'],['sword','beatbreaker'],['fx','v_neon'],['fx','p_neon']],desc:'네온 비트 + 비트 브레이커 + 네온 레이저쇼 + 네온 클럽을 한 번에.'}];
 function items(){const L=[];
  for(const s of (window.SKIN58?.list||[]))L.push({cat:'skin',kind:'skin',pid:'skin_'+s.id,id:s.id,name:s.name,en:s.en,price:s.price,tier:s.tier,col:s.col,desc:s.desc,tags:s.tags,variant:!!s.variant,base:s.base});
  for(const s of (window.PET59?.list||[]))L.push({cat:'pet',kind:'pet',pid:'pet_'+s.id,id:s.id,name:s.name,en:'PET VARIANT',price:s.price,tier:'변이',col:s.col,desc:s.desc,tags:['원래 펫의 변이 모습','둘레에 도는 입자','능력은 원래 펫 그대로'],base:s.base});
  for(const s of (window.SWORD59?.list||[]))L.push({cat:'sword',kind:'sword',pid:'sword_'+s.id,id:s.id,name:s.name,en:s.en,price:s.price,tier:s.tier,col:s.col,desc:s.desc,tags:s.tags});
  for(const s of (window.VIC59?.list||[]))L.push({cat:'fx',kind:'vic',pid:'fx_'+s.id,id:s.id,name:s.name,en:s.en,price:s.price,tier:s.tier,col:s.col,desc:s.desc,tags:['승리 연출',...s.tags]});
  for(const s of (window.LOB59?.list||[]))L.push({cat:'fx',kind:'lob',pid:'fx_'+s.id,id:s.id,name:s.name,en:s.en,price:s.price,tier:s.tier,col:s.col,desc:s.desc,tags:['로비 테마',...s.tags]});
  /* v119: 프리미엄 캐릭터 전용 스킨(9999999998 PREM119) · 펫 묶음(원래 펫 + 그 펫의 스킨, ₩ 또는 💎) */
  for(const s of (window.PREM119?.list||[]))L.push({cat:'skin',kind:'prem',pid:'skin_'+s.id,id:s.id,name:s.name,en:s.en,price:s.price,tier:'전용',col:s.col,desc:s.desc,tags:s.tags,base:s.base});
  for(const s of (window.PET59?.list||[])){const bp=(typeof PETS!=='undefined')&&PETS[s.base];if(!bp||!bp.price)continue;const g=wsTier(bp).n,pr=PACK_PRICE[g];if(!pr)continue;
   L.push({cat:'pack',kind:'pack',pid:'pack_'+s.id,id:s.id,name:bp.name+' + '+s.name.split(' · ').pop(),en:'PET + SKIN PACK',price:pr,tier:'묶음',col:s.col,desc:'펫 「'+bp.name+'」('+g+')과 그 펫의 스킨 「'+s.name+'」을 한 번에. '+s.desc,tags:['펫 '+bp.name+' ('+g+')','스킨 '+s.name.split(' · ').pop(),'산 펫은 공방에 바로 들어가요'],base:s.base,grade:g})}
  /* v122: 캐릭터 전용 스킨 40종(99999999991 ELITE122) — 공방의 그 캐릭터 아래에서 판다 */
  for(const s of (window.ELITE122?.list||[]))L.push({cat:'elite',kind:'elite',pid:'skin_'+s.id,id:s.id,name:((typeof CHARS!=='undefined'&&CHARS[s.i])||{}).name+' · '+s.name,en:s.en,price:s.price,tier:'전용',col:s.c1,desc:s.desc,tags:s.tags,base:s.i});
  for(const s of SETS){const sum=s.items.reduce((a,[c,id])=>a+((L.find(x=>x.cat===c&&x.id===id)||{}).price||0),0);L.push({cat:'set',kind:'set',pid:s.id,id:s.id,name:s.name,en:s.en,price:s.price,full:sum,tier:'세트',col:s.col,desc:s.desc,tags:['4개 묶음',sum?Math.round((1-s.price/sum)*100)+'% 할인':''],parts:s.items})}
  return L}
 /* 각 상품 파일(99992~99996)이 이 파일보다 뒤에 실행되므로, 쓸 때마다 찾는다 */
 const API0=()=>({skin:window.SKIN58,pet:window.PET59,pack:window.PET59,prem:window.PREM119,elite:window.ELITE122,sword:window.SWORD59,vic:window.VIC59,lob:window.LOB59});
 const isOn=it=>{const API=API0();return it.kind==='set'?it.parts.every(([c,id])=>{const k=c==='fx'?(id.startsWith('v_')?'vic':'lob'):c;return API[k]&&API[k].get()===id}):!!(API[it.kind]&&API[it.kind].get()===it.id)};
 function toggle(it){const API=API0(),on=isOn(it);if(it.kind==='set'){for(const [c,id] of it.parts){const k=c==='fx'?(id.startsWith('v_')?'vic':'lob'):c;API[k]&&API[k].equip(on?null:id)}return !on}
  /* v119: 펫 · 캐릭터 스킨을 끼면 그 스킨의 원래 펫 · 캐릭터도 함께 고른다(가지고 있을 때) */
  if(!on&&it.base!=null&&typeof it.base==='number')try{const inv=shopInv(),k=(it.kind==='skin'||it.kind==='elite')?'ch':'pt';/* v123: 테스터는 원래 캐릭터 · 펫이 없으면 공방 보유에 넣어 줌 */if(PAY()&&PAY().tester()&&!(inv.inv[k]||[]).includes(it.base))inv.inv[k].push(it.base);if((inv.inv[k]||[]).includes(it.base)){inv.eq[k]=it.base;saveNow()}}catch(e){}
  API[it.kind].equip(on?null:it.id);return !on}
 const PAY=()=>window.PAY58;const owns=it=>{try{if(it&&it.kind==='pack')return !!(PAY()&&PAY().ownsItem({pid:'pet_'+it.id}))&&(shopInv().inv.pt||[]).includes(it.base);return !!(PAY()&&PAY().ownsItem(it))}catch(e){return false}};
 /* v119: 펫 묶음을 사면 서버가 petbase_<번호>를 준다 → 그 펫을 공방 보유 목록에 넣는다
    v120: 테스터(「모두 보유」)도 펫 묶음의 펫을 받는다(한 번 받으면 저장 기록에 남음) */
 function grantBases(){try{const P=PAY();if(!P)return false;const inv=shopInv();let n=0;/* v123: 테스터는 공방의 캐릭터 · 무기 · 펫을 코인 없이 모두 보유 */if(P.tester()){for(const [k,L] of [['ch',typeof CHARS!=='undefined'?CHARS:[]],['wp',typeof WEAPONS!=='undefined'?WEAPONS:[]],['pt',typeof PETS!=='undefined'?PETS:[]]]){const a=inv.inv[k]||(inv.inv[k]=[]);for(let i=0;i<L.length;i++)if(!a.includes(i)){a.push(i);n++}}}for(const x of P.owned()){const m=/^petbase_(\d+)$/.exec(x);if(!m)continue;const i=+m[1];if(typeof PETS!=='undefined'&&PETS[i]&&!inv.inv.pt.includes(i)){inv.inv.pt.push(i);n++}}if(n){saveNow();try{P.apply()}catch(e){}}return n>0}catch(e){return false}}
 setInterval(grantBases,2000);
 function toggleSave(it){const r=toggle(it);try{PAY()&&PAY().sync()}catch(e){}return r}

 let tab='skin',sel={},viewMode='auto',raf=0,owned=null,ownedErr='';
 /* v119: 캐릭터 변이 스킨 · 펫 스킨은 태엽 공방(그 캐릭터 · 펫 아래)으로 옮기고, 펫 묶음 탭을 새로 */
 const TABS=[['skin','프리미엄 캐릭터','♛'],['pack','펫 묶음','🐾'],['sword','무기','⚔'],['fx','연출','✨'],['set','세트','🎁'],['owned','내 보관함','🗄']];
 function build(){loop.mt=0;
  sheet.innerHTML='<div class="ssHead"><div><h2>💎 현질 상점</h2><small>프리미엄 캐릭터 · 펫 묶음 · 무기 · 연출 · 세트 · 실력은 공평하게</small></div><div class="ssTabs" role="tablist">'+TABS.map(([k,n,ic])=>'<button data-tab="'+k+'" aria-pressed="'+(tab===k)+'"><i class="ti">'+ic+'</i>'+n+'</button>').join('')+'</div><button class="ssX" aria-label="닫기">✕</button></div><div class="ssBody" id="ssBody"></div>';
  sheet.querySelector('.ssX').onclick=()=>sheet.close();
  sheet.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{tab=b.dataset.tab;try{gmSfx('move')}catch(_){}build()});
  try{const tb=sheet.querySelector('.ssTabs'),on=tb&&tb.querySelector('[aria-pressed=true]');if(on&&tb.scrollWidth>tb.clientWidth)tb.scrollLeft=on.offsetLeft-tb.clientWidth/2+on.offsetWidth/2}catch(e){}
  const body=sheet.querySelector('#ssBody');if(tab==='owned')ownedTab(body);else listTab(body)}
 function card(x){const lk=petLock(x);return '<button class="ssCard'+(lk?' lk118':'')+'" title="'+(lk?'먼저 공방에서 '+safe(lk)+'을(를) 사야 해요':'')+'" data-tier="'+x.tier+'" data-id="'+x.id+'" data-cat="'+x.cat+'" aria-pressed="'+(sel[tab]===x.id)+'" style="--tc:'+x.col+'"><canvas width="72" height="72" data-k="'+x.kind+'" data-id="'+x.id+'"></canvas><div style="min-width:0"><em style="background:'+TIER_BG[x.tier]+'">'+x.tier+'</em><b>'+safe(x.name)+'</b><div class="sub">'+safe(x.en)+'</div></div><div>'+(owns(x)?'<div class="pr own">✓ 보유</div>':'<div class="pr">'+won(x.price)+'</div>'+(window.DIA80?'<div class="dpr">💎 '+DIA80.price(x).toLocaleString()+'</div>':''))+(isOn(x)?'<span class="on">'+(owns(x)?'장착 중':'입어보는 중')+'</span>':'')+'</div></button>'}
 /* v118: 펫 스킨(변이 펫)은 원래 펫을 공방에서 산 사람만 살 수 있고 장착할 수 있다(안 사면 스킨이 보이지 않았음) */
 function petLock(x){try{/* v123: 테스터는 잠금 없음 */if(PAY()&&PAY().tester())return null;/* v119: 프리미엄 전용 스킨은 그 프리미엄 캐릭터를 먼저 */if(x&&x.kind==='prem'){const P=PAY();if(P&&P.ownsKind('skin',x.base))return null;const b=window.SKIN58&&SKIN58.byId(x.base);return (b&&b.name)||'프리미엄 캐릭터'}
  if(!x||x.kind!=='pet'||x.base==null)return null;const inv=(typeof shopInv==='function')?shopInv():null;if(!inv||(inv.inv.pt||[]).includes(x.base))return null;return (PETS[x.base]&&PETS[x.base].name)||'원래 펫'}catch(e){return null}}
 function listTab(body){const L=items().filter(x=>x.cat===tab&&!(x.kind==='skin'&&x.variant));if(!L.length){body.innerHTML='<div class="ssEmpty">상품을 불러오지 못했어요.</div>';return}
  if(!sel[tab]||!L.find(x=>x.id===sel[tab]))sel[tab]=L[0].id;const s=L.find(x=>x.id===sel[tab]),on=isOn(s),own=owns(s),P=PAY(),test=P&&P.test();
  let list='';if(tab==='skin'){const pr=L.filter(x=>!x.variant),va=L.filter(x=>x.variant);list='<div class="ssSec">프리미엄 캐릭터 · 사면 캐릭터 목록에 들어가요</div>'+pr.filter(x=>x.kind==='skin').map(card).join('')+'<div class="ssSec">♛ 프리미엄 전용 스킨 · 한 명에 하나 · 특별한 휘두르기 · 검 쥐는 자세</div>'+L.filter(x=>x.kind==='prem').map(card).join('')+'<div class="ssPromise" style="margin-top:4px">일반 캐릭터의 스킨은 이제 <b>태엽 공방</b>에서 그 캐릭터를 고르면 바로 아래에 있어요.</div>'}
  else if(tab==='pack'){const G=['일반','희귀','영웅','전설','유물','신화','초월'];list=G.map(g=>{const a=L.filter(x=>x.grade===g);return a.length?'<div class="ssSec">'+g+' 펫 묶음 · '+won(PACK_PRICE[g])+'</div>'+a.map(card).join(''):''}).join('')+'<div class="ssPromise" style="margin-top:4px">펫 스킨만 따로 사려면 <b>태엽 공방</b>에서 그 펫을 고르면 바로 아래에 있어요.</div>'}
  else if(tab==='fx'){list='<div class="ssSec">승리 연출 · 보스를 쓰러뜨리는 순간</div>'+L.filter(x=>x.kind==='vic').map(card).join('')+'<div class="ssSec">로비 테마 · 메인 메뉴 무대</div>'+L.filter(x=>x.kind==='lob').map(card).join('')}
  else list=L.map(card).join('');
  const views=s.kind==='skin'||s.kind==='prem'?'<div class="ssViews">'+[['auto','돌려 보기'],['front','정면'],['side','옆'],['back','뒤']].map(([k,n])=>'<button data-v="'+k+'" aria-pressed="'+(viewMode===k)+'">'+n+'</button>').join('')+'</div>':'';
  const setParts=s.kind==='set'?'<div class="ssSet">'+s.parts.map(([c,id])=>{const it=items().find(x=>x.cat===c&&x.id===id);return it?'<span style="border-color:'+it.col+'66">'+safe(it.name)+((window.BB_APP||window.BB_FREE)?'':' · '+won(it.price))+'</span>':''}).join('')+'</div>':'';
  const hasBase=s.kind==='pack'&&(()=>{try{return shopInv().inv.pt.includes(s.base)}catch(e){return false}})(),hasSkin=s.kind==='pack'&&!!(PAY()&&PAY().ownsItem({pid:'pet_'+s.id}));
  const note=s.kind==='pack'?'<div class="ssNote" style="color:#9fb0c8">'+(own?'둘 다 가지고 있어요. 「장착하기」를 누르면 이 펫이 이 모습으로 따라다녀요.':hasBase?'펫 「'+safe(PETS[s.base].name)+'」은 이미 있어요. 스킨만 필요하면 태엽 공방에서 '+won(1000)+'대로 따로 살 수 있어요.':hasSkin?'스킨은 이미 있어요. 펫은 태엽 공방에서 코인으로도 살 수 있어요.':'펫(공방에 바로 들어가요) + 스킨을 한 번에 사요. 사면 바로 장착돼요.')+'</div>':s.kind==='prem'?'<div class="ssNote" style="color:#9fb0c8">'+safe((SKIN58.byId(s.base)||{}).name||'')+' 캐릭터 위에 덧입는 전용 스킨이에요. 능력 · 세트 효과는 그대로, 겉모습 · 휘두르기 · 검 쥐는 자세가 바뀌어요.</div>':s.kind==='skin'&&s.variant?'<div class="ssNote" style="color:#9fb0c8">'+safe(s.name.split(' · ')[0])+'의 변이 모습이에요. 사서 장착하면 지금 캐릭터 위에 이 모습이 입혀져요.</div>':s.kind==='pet'?'<div class="ssNote" style="color:#9fb0c8">'+safe(s.name.split(' · ')[0])+'을(를) 데리고 다닐 때 이 모습으로 바뀌어요.</div>':s.kind==='sword'?'<div class="ssNote" style="color:#9fb0c8">'+(own?'보유 중! 장착하면 공격력도 이 검(피해 ×'+(((window.SWORD59&&SWORD59.byId(s.id))||{}).stat||{dmg:1.9}).dmg.toFixed(2)+')으로 바뀌어요.':'장착하면 모양·궤적·이펙트와 공격력이 이 검으로 바뀌어요.')+'</div>':'';
  body.innerHTML='<div class="ssGrid"><div class="ssStage" style="--tc:'+s.col+'" data-tier="'+s.tier+'"><span class="ssTier" style="background:'+TIER_BG[s.tier]+'">'+TIER_EN[s.tier]+' · '+s.tier+'</span>'+views+'<canvas id="ssCv" width="480" height="360"></canvas><div class="ssInfo"><h3 style="color:'+s.col+'">'+safe(s.name)+'</h3><div class="en">'+safe(s.en)+'</div><p>'+safe(s.desc)+'</p>'+setParts+
   '<div class="ssTags">'+s.tags.filter(x=>x&&!((window.BB_APP||window.BB_FREE)&&/할인/.test(x))).map(x=>'<span>'+safe(x)+'</span>').join('')+'</div><div class="ssBuy"><div class="ssPrice">'+(s.full?'<s>'+won(s.full)+'</s>':'')+won(s.price)+'<small>부가세 포함</small></div>'+(petLock(s)?'<button class="ssBtn lock118" data-base="'+s.base+'">🔒 먼저 '+safe(petLock(s))+' 사기<small>공방으로 가기</small></button>':'')+(petLock(s)?'':own?'<button class="ssBtn try" aria-pressed="'+on+'">'+(on?'✓ 장착 중':'장착하기')+'</button>':'')+(petLock(s)?(own?'<button class="ssBtn buy own" disabled>✓ 보유 중</button>':''):own?'<button class="ssBtn buy own" disabled>✓ 보유 중</button>':'<button class="ssBtn buy">구매하기</button>')+(own||!window.DIA80||petLock(s)?'':'<button class="ssBtn dia80">💎 '+DIA80.price(s).toLocaleString()+'<small>다이아로 사기</small></button>')+'</div>'+(own||!window.DIA80?'':'<div class="ssDiaHave">보유 💎 <b>'+DIA80.get().toLocaleString()+'</b> · 다이아는 탑 보스 층을 깨면 얻어요</div>')+'<div class="ssNote" id="ssNote"></div>'+note+'</div></div>'+
   '<div class="ssSide"><div class="ssList">'+list+'</div><div class="ssPromise">'+(window.BB_FREE?'• 지금은 판매하지 않아요.':window.BB_APP?'• 모든 상품은 겉모습·연출만 바꿔요.<br>• 이미 가지고 있는 상품은 로그인하면 이 앱에서도 장착할 수 있어요.':(test?'<b style="color:#ffb0c8">🧪 테스트 결제 중 — 실제로 돈이 나가지 않아요.</b><br>':'')+'• 결제는 <b>토스페이먼츠</b>로 해요: 카드 · 토스페이 · 카카오페이 · 네이버페이 · 계좌이체 · 휴대폰.<br>• 산 상품은 계정에 남아서, 같은 계정으로 로그인한 모든 기기에서 쓸 수 있어요.<br>• 새 검도 공격력은 상점 최고 검(시간의 검)과 비슷해요. 돈으로 더 세지지 않아요.<br>• 왼쪽 무대에서 미리 돌려 볼 수 있고, 사면 「장착하기」로 바로 입어요.<br>• <b>만 19세 미만은 보호자(부모님) 동의를 받고 결제해 주세요.</b>')+'</div></div></div>';
  body.querySelectorAll('.ssCard').forEach(c=>c.onclick=()=>{sel[tab]=c.dataset.id;try{gmSfx('move')}catch(_){}build()});
  {const lb=body.querySelector('.ssBtn.lock118');if(lb){const m=sheet.querySelector('#ssNote');if(m){m.textContent='이 스킨은 공방에서 '+petLock(s)+'을(를) 먼저 사야 '+(own?'장착할':'살')+' 수 있어요(스킨은 그 펫의 모습만 바꿔요).';m.style.color='#ffd166'}
   if(s.kind==='prem'){lb.innerHTML='🔒 먼저 '+safe(petLock(s))+' 사기<small>이 창에서 바로</small>';if(m)m.textContent='이 스킨은 프리미엄 캐릭터 「'+petLock(s)+'」을(를) 가진 사람만 살 수 있어요.';lb.onclick=()=>{try{gmSfx('ok')}catch(_){}sel[tab]=s.base;build()}}else
   lb.onclick=()=>{try{gmSfx('ok')}catch(_){}try{sheet.close()}catch(_){}setTimeout(()=>{try{openShop('pt');if(typeof WS!=='undefined'){WS.sel.pt=+lb.dataset.base;wsRefresh()}}catch(e){}},120)}}}
  body.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{viewMode=b.dataset.v;build()});
  const tb=body.querySelector('.ssBtn.try');if(tb)tb.onclick=()=>{const now=toggleSave(s);try{gmSfx('ok')}catch(_){}build();const n=sheet.querySelector('#ssNote');if(n)n.textContent=now?(own?s.name+' 장착! 다음에 켜도 그대로예요.':s.name+' 입어보는 중! 게임 화면에서도 이대로 보여요.'):'원래대로 돌아왔어요.'};
  /* v80: 다이아로 사기 — 한 번 누르면 확인, 한 번 더 누르면 산다(돈이 아니라 게임 재화) */
  const db=body.querySelector('.ssBtn.dia80');if(db)db.onclick=()=>{const say=(t,c)=>{const m=sheet.querySelector('#ssNote');if(m){m.textContent=t;m.style.color=c||''}};const D=window.DIA80,need=D.price(s);
   if(D.get()<need){try{gmSfx('no')}catch(_){}say('다이아가 '+(need-D.get()).toLocaleString()+'개 모자라요. 탑의 보스 층(10층마다)을 깨면 다이아를 얻어요.','#ffb2a8');return}
   if(!db.dataset.ok){db.dataset.ok='1';db.classList.add('ask');db.innerHTML='💎 '+need.toLocaleString()+' 쓸까요?<small>한 번 더 누르면 사요</small>';try{gmSfx('move')}catch(_){}setTimeout(()=>{if(db.isConnected&&db.dataset.ok){delete db.dataset.ok;db.classList.remove('ask');db.innerHTML='💎 '+need.toLocaleString()+'<small>다이아로 사기</small>'}},4000);return}
   /* v124: 펫 묶음도 💎로 — 펫 스킨(pet_<id>)을 다이아 보유로 넣고 원래 펫을 공방에 넣어 줌 */
   const r=D.buy(s.kind==='pack'?Object.assign({},s,{pid:'pet_'+s.id}):s);if(!r.ok){say(r.err||'살 수 없어요.','#ffb2a8');return}
   if(s.kind==='pack')try{const inv=shopInv();if(!inv.inv.pt.includes(s.base))inv.inv.pt.push(s.base);saveNow();P&&P.apply()}catch(e){}
   try{if(!isOn(s))toggle(s);P&&P.sync()}catch(e){}try{gmSfx('ok')}catch(_){}build();say('🎉 '+s.name+' — 💎 '+need.toLocaleString()+'로 샀어요! 바로 장착했어요.','#7dffb0')};
  const bb=body.querySelector('.ssBtn.buy:not(.own)');if(bb)bb.onclick=()=>{const n=sheet.querySelector('#ssNote'),say=(t,c)=>{const m=sheet.querySelector('#ssNote');if(m){m.textContent=t;m.style.color=c||''}};
   if(!P){say('결제 기능을 불러오지 못했어요.');return}
   if(!account().token){try{gmSfx('no')}catch(_){}if(n){n.style.color='';n.innerHTML='산 상품은 계정에 보관돼요. 먼저 로그인해 주세요. <button class="ssBtn buy" id="ssLogin2" style="padding:6px 12px;font-size:12px">로그인</button>'}const lb=sheet.querySelector('#ssLogin2');if(lb)lb.onclick=()=>{sheet.close();window.ACCT55&&ACCT55.open()};return}
   try{gmSfx('ok')}catch(_){}bb.disabled=true;bb.textContent='결제창 여는 중…';say('');
   P.buy(s.pid,res=>{if(!sheet.open)return;
    if(res.opened){const b2=sheet.querySelector('.ssBtn.buy:not(.own)');if(b2){b2.disabled=true;b2.textContent='결제 진행 중…'}say('새 창에서 결제를 마쳐 주세요. 끝나면 여기 저절로 들어와요.'+(res.test?' (테스트 결제)':''));return}
    if(res.ok){try{grantBases();if(!isOn(s))toggle(s);P.sync()}catch(e){}try{gmSfx('ok')}catch(_){}build();say('🎉 '+s.name+' 구매 완료! 보관함에 들어갔고 바로 장착했어요.','#7dffb0');return}
    build();if(res.need==='login')say('먼저 로그인해 주세요.','#ffb2a8');else if(res.fail)say('결제가 승인되지 않았어요. 돈은 빠져나가지 않았어요.','#ffb2a8');else if(res.cancel)say('결제를 마치지 않았어요. 다시 「구매하기」를 눌러 주세요.','#ffd166');else if(res.err)say(res.err,'#ffb2a8')})}}
 async function ownedTab(body){const a=account();if(!a.token){body.innerHTML='<div class="ssEmpty">로그인하면 산 상품을 모든 기기에서 확인할 수 있어요.<br><br><button class="ssBtn buy" id="ssLogin">로그인</button></div>';body.querySelector('#ssLogin').onclick=()=>{sheet.close();window.ACCT55?.open()};return}
  body.innerHTML='<div class="ssEmpty">보관함을 확인하는 중…</div>';
  try{const o=PAY()?await PAY().refresh():new Set();owned=[...o];ownedErr=''}
  catch(e){ownedErr=e.name==='AbortError'?'서버가 늦게 답하고 있어요. 잠시 뒤 다시 열어 주세요.':e.message}
  if(tab!=='owned'||!sheet.open)return;const mine=items().filter(x=>(owned||[]).includes(x.pid));
  body.innerHTML=ownedErr?'<div class="ssEmpty">'+safe(ownedErr)+'</div>':mine.length?'<div class="ssSec" style="margin:0 0 8px">카드를 누르면 그 상품 화면에서 장착할 수 있어요</div><div class="ssList">'+mine.map(card).join('')+'</div>':'<div class="ssEmpty">아직 산 상품이 없어요.<br>마음에 드는 상품을 입어 보세요!</div>';
  body.querySelectorAll('.ssCard').forEach(c=>c.onclick=()=>{const it=items().find(x=>x.id===c.dataset.id&&x.cat===c.dataset.cat);if(it&&toWorkshop(it))return;tab=c.dataset.cat;sel[tab]=c.dataset.id;try{gmSfx('move')}catch(_){}build()})}
 /* v119: 변이 스킨 · 펫 스킨은 공방의 그 캐릭터 · 펫 화면에서 */
 function toWorkshop(it){if(!(it.kind==='pet'||it.kind==='elite'||(it.kind==='skin'&&it.variant))||typeof it.base!=='number')return false;try{gmSfx('ok')}catch(_){}try{sheet.close()}catch(_){}
  const k=it.kind==='pet'?'pt':'ch';setTimeout(()=>{try{openShop(k);if(typeof WS!=='undefined'){WS.sel[k]=it.base;wsRefresh()}}catch(e){}},120);return true}

 /* ---------- 무대 그리기 ---------- */
 function stageBg(c,w,h,col,t){c.imageSmoothingEnabled=false;const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0b0f1c');g.addColorStop(.7,'#121a2c');g.addColorStop(1,'#05070c');c.fillStyle=g;c.fillRect(0,0,w,h);
  const rg=c.createRadialGradient(w/2,h*.5,10,w/2,h*.5,h*.6);rg.addColorStop(0,col+'55');rg.addColorStop(1,'#00000000');c.fillStyle=rg;c.fillRect(0,0,w,h);
  c.save();c.globalCompositeOperation='lighter';for(const sx of [-1,1]){const gg=c.createLinearGradient(w/2+sx*w*.32,0,w/2,h*.8);gg.addColorStop(0,'#ffffff22');gg.addColorStop(1,'#ffffff00');c.fillStyle=gg;c.beginPath();c.moveTo(w/2+sx*w*.3,0);c.lineTo(w/2+sx*w*.36,0);c.lineTo(w/2+sx*w*.06,h*.84);c.lineTo(w/2-sx*w*.06,h*.84);c.fill()}c.restore();
  c.fillStyle='#00000088';c.beginPath();c.ellipse(w/2,h*.84,w*.2,h*.05,0,0,TAU);c.fill();c.strokeStyle=col+'aa';c.lineWidth=2;c.beginPath();c.ellipse(w/2,h*.84,w*.2+Math.sin(t*2)*3,h*.05,0,0,TAU);c.stroke();
  for(let i=0;i<20;i++){const q=(t*.15+i*.137)%1;c.globalAlpha=(1-q)*.6;c.fillStyle=i%2?col:'#ffffff';c.fillRect(((i*97)%w),h*(.9-q*.8),2,2)}c.globalAlpha=1}
 function drawItem(c,it,w,h,now,mini){const t=now/1000;
  if(it.kind==='vic'){VIC59.preview(c,it.id,w,h,now);return}if(it.kind==='lob'){LOB59.preview(c,it.id,w,h,now);return}
  if(mini){c.clearRect(0,0,w,h);const rg=c.createRadialGradient(w/2,h*.55,4,w/2,h*.55,w*.6);rg.addColorStop(0,it.col+'44');rg.addColorStop(1,'#07090f');c.fillStyle=rg;c.fillRect(0,0,w,h);c.imageSmoothingEnabled=false}else stageBg(c,w,h,it.col,t);
  if(it.kind==='pack'){const k=mini?2.2:6.4;PET59.draw(c,it.id,mini?w*.6:w*.58,mini?h*.58:h*.5+Math.sin(t*2)*4,now,k);
   c.save();try{if(!mini){c.fillStyle='#ffffff10';c.beginPath();c.arc(w*.18,h*.3,h*.16,0,TAU);c.fill()}drawPet(c,it.base,mini?w*.22:w*.18,mini?h*.32:h*.3,now,mini?1.3:3)}catch(e){}c.restore();
   c.fillStyle='#ffffffdd';c.font='900 '+(mini?12:22)+'px '+FONT;c.textAlign='center';c.fillText('+',mini?w*.38:w*.33,mini?h*.42:h*.36);
   if(!mini){c.font='800 12px '+FONT;c.fillStyle='#8ea2c0';c.fillText('펫',w*.18,h*.5);c.fillText('스킨',w*.58,h*.9)}c.textAlign='left';return}
  if(it.kind==='skin'||it.kind==='prem'||it.kind==='elite'){const ph=Math.floor(t/1.6)%4,v=mini?'front':viewMode==='auto'?['front','side','back','side'][ph]:viewMode,flip=!mini&&viewMode==='auto'&&ph===3,walk=v==='side'?Math.floor(t*6)%4:0;
   const o=it.kind==='prem'?PREM119.render(it.id,v,walk,t):it.kind==='elite'?ELITE122.render(it.id,v,walk,t):SKIN58.render(it.id,v,walk,t),S=mini?1.6:Math.floor(Math.min(w/40,h/48)*.78),dw=40*S,dh=48*S,x=w/2-dw/2,y=(mini?h*.98:h*.84)-dh*.94;
   c.save();if(flip){c.translate(w/2,0);c.scale(-1,1);c.translate(-w/2,0)}if(v==='side'){c.translate(w/2,0);c.scale(.86,1);c.translate(-w/2,0)}c.drawImage(o,Math.round(x),Math.round(y),dw,dh);c.restore();return}
  if(it.kind==='pet'){const k=mini?2.4:7;PET59.draw(c,it.id,w/2,mini?h*.55:h*.5+Math.sin(t*2)*4,now,k);if(!mini){c.globalAlpha=.75;try{drawPet(c,it.base,w*.14,h*.22,now,2.4)}catch(e){}c.globalAlpha=1;c.fillStyle='#8ea2c0';c.font='800 12px '+FONT;c.textAlign='center';c.fillText('원래 모습',w*.14,h*.36);c.textAlign='left'}return}
  if(it.kind==='sword'){const ang=mini?-Math.PI/2+.7:-Math.PI/2+.55+Math.sin(t*1.2)*.12;SWORD59.preview(c,it.id,mini?w*.38:w*.42,mini?h*.86:h*.8,ang,mini?3:12,now);return}
  if(it.kind==='set'){const p=it.parts;const sk=p.find(x=>x[0]==='skin'),sw=p.find(x=>x[0]==='sword');
   if(mini){const o=SKIN58.render(sk[1],'front',0,t);c.drawImage(o,w*.1,h*.12,40*1.4,48*1.4);SWORD59.preview(c,sw[1],w*.78,h*.9,-Math.PI/2+.4,2,now);return}
   const lb=LOB59.byId(p.find(x=>x[1].startsWith('p_'))[1]);if(lb){c.save();lb.draw(c,w,h,t);c.restore()}
   const o=SKIN58.render(sk[1],'front',0,t),S=Math.floor(h/48*.6);c.drawImage(o,Math.round(w*.34-20*S),Math.round(h*.84-48*S*.94),40*S,48*S);SWORD59.preview(c,sw[1],w*.66,h*.82,-Math.PI/2+.45,8,now);
   c.fillStyle='#ffffffcc';c.font='900 13px '+FONT;c.textAlign='center';c.fillText('+ 승리 연출 · 로비 테마',w/2,h*.95);c.textAlign='left'}}
 function loop(now){if(!sheet.open){raf=0;return}try{const L=items(),cur=L.find(x=>x.cat===tab&&x.id===sel[tab]);const cv=sheet.querySelector('#ssCv');if(cv&&cur)drawItem(cv.getContext('2d'),cur,cv.width,cv.height,now,false);
  /* v76: 렉 줄이기 — 목록 카드 그림은 1초에 8번만, 화면에 보이는 카드만 다시 그린다 */
  if(now-(loop.mt||0)>=120){loop.mt=now;const vh=innerHeight;sheet.querySelectorAll('.ssCard canvas[data-id]').forEach(m=>{const r=m.getBoundingClientRect();if(r.bottom<0||r.top>vh||!r.width)return;const it=L.find(x=>x.id===m.dataset.id&&x.kind===m.dataset.k);if(it)drawItem(m.getContext('2d'),it,m.width,m.height,now,true)})}}catch(e){}raf=requestAnimationFrame(loop)}
 function open(t,id){if(t==='pet'||(t==='skin'&&id&&window.SKIN58&&(SKIN58.byId(id)||{}).variant)){const it=items().find(x=>x.id===id&&(x.kind==='pet'||x.kind==='skin'));if(it&&toWorkshop(it))return;t='skin';id=null}if(t)tab=t;if(t&&id)sel[t]=id;/* v84: 특정 상품을 바로 보여 주기 */if(!sheet.open)sheet.showModal();build();if(!raf)raf=requestAnimationFrame(loop);try{if(PAY()&&account().token)PAY().refresh().then(()=>{if(sheet.open&&tab!=='owned')build()}).catch(()=>{})}catch(e){}}
 sheet.addEventListener('close',()=>{if(raf)cancelAnimationFrame(raf);raf=0});
 sheet.addEventListener('keydown',e=>e.stopPropagation());
 sheet.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===sheet)sheet.close()});
 /* 상점(태엽 공방) 탭 줄에 「✦ 스킨 · 무기」 탭 → 이 창 */
 window.BBShopOpen=open;
 /* v119: 태엽 공방의 스킨 줄(9999999998)이 같은 상품 · 보유 · 장착 · 그림을 쓴다 */
 window.BBShopAPI={items,owns,isOn,toggle,toggleSave,petLock,drawItem,grantBases,PACK_PRICE,won};
 function mount(){const tabs=document.querySelector('#shopModal .shopTabs');if(!tabs||tabs.querySelector('[data-addon]'))return;const b=document.createElement('button');b.className='shopTab bbAddonTab';b.dataset.addon='1';b.innerHTML='💎 <span class="bbL">현질 상점</span><span class="bbS">현질</span>';b.title='현질 상점 (프리미엄 캐릭터 · 펫 묶음 · 무기 · 연출 · 세트)';b.onclick=e=>{e.stopPropagation();try{gmSfx('ok')}catch(_){}open();};tabs.appendChild(b);}
 {const _rs=renderShop;renderShop=function(){const r=_rs.apply(this,arguments);try{mount()}catch(e){}return r}}
}catch(e){console.error('v59 shop',e)}})();
