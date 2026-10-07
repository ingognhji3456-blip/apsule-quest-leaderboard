/* ================= v58 스킨 상점 (v56 「보스팩 · 스킨」 창을 상점답게 새로 만듦) =================
   상점(태엽 공방)의 「✦ 보스팩 · 스킨」 탭 → 이 창이 열린다(window.BBShopOpen).
   - 스킨: 왼쪽 큰 무대에서 고른 스킨이 정면 → 옆 → 뒤로 돌며 걷는다(방향 단추로 고정 가능).
           오른쪽 카드 3장(등급 · 이름 · 특징 · 가격). 「입어보기」로 바로 게임 캐릭터에 입혀 볼 수 있다(저장 안 함).
           「구매하기」는 결제가 아직 연결되지 않아서 안내만 보여 준다.
   - 보스팩: 출시 예정 안내.  - 보관함: 로그인하면 서버(/api/shop/owned)에서 산 상품을 확인.
   스킨 그림과 장착은 99992의 SKIN58. */
(()=>{try{
 const FONT=typeof FONT_STACK!=='undefined'?FONT_STACK:'sans-serif';
 const won=n=>'₩'+Number(n).toLocaleString('ko-KR');
 const safe=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const account=()=>window.ACCT55?.get()||{};
 const SK=()=>(window.SKIN58&&SKIN58.list)||[];
 const sheet=document.createElement('dialog');sheet.id='bbShop';sheet.setAttribute('aria-label','스킨 상점');
 const style=document.createElement('style');
 style.textContent=`
 #bbShop{box-sizing:border-box;width:min(980px,96vw);max-height:94dvh;overflow:auto;padding:0;border:0;border-radius:18px;background:#0a0f17;color:#eef4ff;font:14px ${FONT};box-shadow:0 0 0 1px #ffffff1a,0 30px 90px #000d}
 #bbShop::backdrop{background:radial-gradient(ellipse at 50% 30%,#1a1030cc,#000000e6)}
 #bbShop *{box-sizing:border-box}
 .ssHead{position:sticky;top:0;z-index:3;display:flex;align-items:center;gap:14px;padding:16px 20px;background:linear-gradient(90deg,#1b1233f2,#0d1a26f2);border-bottom:1px solid #ffffff14;backdrop-filter:blur(6px)}
 .ssHead h2{margin:0;font-size:20px;font-weight:900;letter-spacing:.06em;background:linear-gradient(90deg,#ffe58a,#ff8fd0,#8ad8ff);-webkit-background-clip:text;background-clip:text;color:transparent}
 .ssHead small{display:block;color:#9fb0c8;font-size:12px;font-weight:600;letter-spacing:0;margin-top:2px}
 .ssTabs{display:flex;gap:6px;margin-left:auto}
 .ssTabs button,.ssX{font:800 13px ${FONT};color:#cfdcf0;background:#ffffff0d;border:1px solid #ffffff1a;border-radius:999px;padding:8px 14px;cursor:pointer;transition:background .15s,border-color .15s}
 .ssTabs button[aria-pressed=true]{background:linear-gradient(180deg,#ffe58a,#f0b23a);color:#2a1a06;border-color:#fff2b0}
 .ssTabs button:hover,.ssX:hover{border-color:#ffe58a88}
 .ssX{padding:8px 12px}
 .ssBody{padding:18px 20px 22px}
 .ssGrid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:18px}
 /* 무대 */
 .ssStage{position:relative;border-radius:16px;overflow:hidden;background:#06080e;border:1px solid #ffffff14;min-height:380px;display:flex;flex-direction:column}
 .ssStage canvas{width:100%;flex:1;min-height:300px;image-rendering:pixelated;display:block}
 .ssTier{position:absolute;top:14px;left:14px;font:900 11px ${FONT};letter-spacing:.14em;padding:5px 10px;border-radius:6px;color:#0a0f17}
 .ssViews{position:absolute;top:12px;right:12px;display:flex;gap:4px}
 .ssViews button{font:800 11px ${FONT};padding:5px 9px;border-radius:999px;border:1px solid #ffffff26;background:#0a0f17aa;color:#cfdcf0;cursor:pointer}
 .ssViews button[aria-pressed=true]{background:#eef4ff;color:#0a0f17}
 .ssInfo{padding:14px 16px 16px;background:linear-gradient(180deg,#0e1420,#0a0f17);border-top:1px solid #ffffff10}
 .ssInfo h3{margin:0;font-size:24px;font-weight:900;letter-spacing:.02em}
 .ssInfo .en{color:#8ea2c0;font-size:11px;font-weight:800;letter-spacing:.24em;margin-top:2px}
 .ssInfo p{margin:8px 0 10px;color:#c2cee0;line-height:1.55;font-size:13px}
 .ssTags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}
 .ssTags span{font-size:11px;font-weight:800;padding:4px 9px;border-radius:999px;background:#ffffff0f;border:1px solid #ffffff1c;color:#dfe8f6}
 .ssBuy{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
 .ssPrice{font:900 26px ${FONT};letter-spacing:.01em;margin-right:auto;color:#fff4c2;text-shadow:0 0 14px #ffd16655}
 .ssPrice small{font-size:11px;color:#8ea2c0;font-weight:700;margin-left:6px;letter-spacing:0}
 .ssBtn{font:900 14px ${FONT};padding:11px 18px;border-radius:12px;cursor:pointer;border:1px solid #ffffff2a;background:#ffffff10;color:#eef4ff;transition:transform .1s,filter .15s}
 .ssBtn:hover{filter:brightness(1.15)}.ssBtn:active{transform:translateY(1px)}
 .ssBtn.try[aria-pressed=true]{background:#5affd822;border-color:#5affd8;color:#c8fff2}
 .ssBtn.buy{background:linear-gradient(180deg,#ffe58a,#f0a82a);color:#2a1606;border-color:#fff2b0;box-shadow:0 6px 20px #f0a82a44}
 .ssNote{min-height:18px;margin-top:8px;font-size:12px;color:#ffcf8a}
 /* 카드 목록 */
 .ssList{display:flex;flex-direction:column;gap:10px}
 .ssCard{position:relative;display:grid;grid-template-columns:96px 1fr;gap:12px;align-items:center;padding:10px;border-radius:14px;background:linear-gradient(135deg,#121a28,#0d131e);border:1px solid #ffffff14;cursor:pointer;text-align:left;color:inherit;font:inherit;transition:border-color .15s,transform .12s,box-shadow .15s}
 .ssCard:hover{transform:translateY(-1px);border-color:#ffffff33}
 .ssCard[aria-pressed=true]{border-color:var(--tc);box-shadow:0 0 0 1px var(--tc),0 8px 26px #0008}
 .ssCard canvas{width:96px;height:96px;border-radius:10px;image-rendering:pixelated;background:#070a10}
 .ssCard b{display:block;font-size:16px;font-weight:900}
 .ssCard em{font-style:normal;display:inline-block;font-size:10px;font-weight:900;letter-spacing:.12em;padding:2px 7px;border-radius:5px;color:#0a0f17;margin-bottom:4px}
 .ssCard .pr{font-weight:900;color:#fff0b0;margin-top:4px}
 .ssCard .on{position:absolute;top:8px;right:10px;font-size:10px;font-weight:900;color:#5affd8;letter-spacing:.06em}
 .ssPromise{margin-top:12px;padding:12px 14px;border-radius:12px;background:#ffffff08;border:1px dashed #ffffff22;color:#9fb0c8;font-size:12px;line-height:1.6}
 /* 보스팩 · 보관함 */
 .ssTease{display:grid;grid-template-columns:200px 1fr;gap:18px;align-items:center;padding:20px;border-radius:16px;background:radial-gradient(ellipse at 20% 50%,#3a103066,transparent 60%),linear-gradient(135deg,#140e22,#0b1018);border:1px solid #ff8fd033}
 .ssTease canvas{width:200px;height:160px;image-rendering:pixelated}
 .ssTease h3{margin:0 0 6px;font-size:22px}.ssTease p{color:#c2cee0;line-height:1.6;margin:0 0 10px}
 .ssEmpty{padding:30px;text-align:center;color:#9fb0c8;border-radius:14px;background:#ffffff06;border:1px solid #ffffff12}
 @media (max-width:760px){.ssGrid{grid-template-columns:1fr}.ssStage{min-height:300px}.ssStage canvas{min-height:230px}.ssHead{flex-wrap:wrap}.ssTabs{margin-left:0;order:3;width:100%}.ssTabs button{flex:1}.ssTease{grid-template-columns:1fr}.ssTease canvas{width:100%}}
 `;
 document.head.appendChild(style);document.body.appendChild(sheet);

 let tab='skin',sel=null,viewMode='auto',raf=0,owned=null,ownedErr='';
 const tierBg=s=>s.tier==='전설'?'linear-gradient(90deg,#ffe58a,#ffb03a)':s.tier==='영웅'?'linear-gradient(90deg,#e0b0ff,#a070ff)':'linear-gradient(90deg,#b8ecff,#6ab8ff)';
 function build(){
  const L=SK();if(!sel&&L.length)sel=L[L.length-1].id;
  sheet.innerHTML='<div class="ssHead"><div><h2>✦ 스킨 상점</h2><small>외형만 바뀌어요 · 공격력·판정·점수는 그대로</small></div><div class="ssTabs" role="tablist">'+
   [['skin','스킨'],['boss','보스팩'],['owned','내 보관함']].map(([k,n])=>'<button data-tab="'+k+'" aria-pressed="'+(tab===k)+'">'+n+'</button>').join('')+'</div><button class="ssX" aria-label="닫기">✕</button></div><div class="ssBody" id="ssBody"></div>';
  sheet.querySelector('.ssX').onclick=()=>sheet.close();
  sheet.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{tab=b.dataset.tab;build()});
  const body=sheet.querySelector('#ssBody');
  if(tab==='skin')skinTab(body);else if(tab==='boss')bossTab(body);else ownedTab(body)}
 function skinTab(body){const L=SK(),s=L.find(x=>x.id===sel)||L[0];if(!s){body.innerHTML='<div class="ssEmpty">스킨을 불러오지 못했어요.</div>';return}
  const eq=window.SKIN58&&SKIN58.get();
  body.innerHTML='<div class="ssGrid"><div class="ssStage"><span class="ssTier" style="background:'+tierBg(s)+'">'+({'희귀':'RARE','영웅':'EPIC','전설':'LEGENDARY'}[s.tier]||'')+' · '+safe(s.tier)+'</span>'+
   '<div class="ssViews">'+[['auto','돌려 보기'],['front','정면'],['side','옆'],['back','뒤']].map(([k,n])=>'<button data-v="'+k+'" aria-pressed="'+(viewMode===k)+'">'+n+'</button>').join('')+'</div>'+
   '<canvas id="ssCv" width="480" height="360"></canvas><div class="ssInfo"><h3 style="color:'+s.col+'">'+safe(s.name)+'</h3><div class="en">'+safe(s.en)+'</div><p>'+safe(s.desc)+'</p>'+
   '<div class="ssTags">'+s.tags.map(x=>'<span>'+safe(x)+'</span>').join('')+'</div>'+
   '<div class="ssBuy"><div class="ssPrice">'+won(s.price)+'<small>부가세 포함</small></div><button class="ssBtn try" aria-pressed="'+(eq===s.id)+'">'+(eq===s.id?'✓ 입어보는 중':'입어보기')+'</button><button class="ssBtn buy">구매하기</button></div><div class="ssNote" id="ssNote"></div></div></div>'+
   '<div><div class="ssList">'+L.map(x=>'<button class="ssCard" data-id="'+x.id+'" aria-pressed="'+(x.id===s.id)+'" style="--tc:'+x.col+'"><canvas width="96" height="96" data-id="'+x.id+'"></canvas><div><em style="background:'+tierBg(x)+'">'+x.tier+'</em><b>'+safe(x.name)+'</b><div style="color:#8ea2c0;font-size:11px;font-weight:800;letter-spacing:.14em">'+safe(x.en)+'</div><div class="pr">'+won(x.price)+'</div></div>'+(eq===x.id?'<span class="on">착용 중</span>':'')+'</button>').join('')+'</div>'+
   '<div class="ssPromise">• 스킨은 겉모습만 바꿔요. 공격력·판정·점수는 모두 같아요.<br>• 한 번 사면 같은 계정으로 로그인한 모든 기기에서 쓸 수 있게 할 예정이에요.<br>• 결제는 준비 중이에요. 지금은 「입어보기」로 게임 안에서 미리 써 볼 수 있어요(창을 닫으면 그대로 유지, 게임을 다시 켜면 풀려요).</div></div></div>';
  body.querySelectorAll('.ssCard').forEach(c=>c.onclick=()=>{sel=c.dataset.id;try{gmSfx('move')}catch(_){}build()});
  body.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{viewMode=b.dataset.v;build()});
  body.querySelector('.ssBtn.try').onclick=()=>{const on=window.SKIN58.get()===s.id;SKIN58.equip(on?null:s.id);try{gmSfx('ok')}catch(_){}build();const n=sheet.querySelector('#ssNote');if(n)n.textContent=on?'기본 모습으로 돌아왔어요.':s.name+' 스킨을 입었어요. 게임 화면에서도 이 모습으로 보여요.'};
  body.querySelector('.ssBtn.buy').onclick=()=>{try{gmSfx('no')}catch(_){}const n=sheet.querySelector('#ssNote');if(n)n.textContent='결제는 아직 준비 중이에요. 열리면 '+won(s.price)+'로 살 수 있어요. 지금은 「입어보기」로 먼저 써 보세요!'}}
 function bossTab(body){body.innerHTML='<div class="ssTease"><canvas id="ssBossCv" width="200" height="160"></canvas><div><span class="ssTier" style="position:static;display:inline-block;background:linear-gradient(90deg,#ff8fd0,#ff4d6d);margin-bottom:8px">COMING SOON</span><h3>추가 보스팩</h3><p>새 보스 · 전용 음악 · 이야기를 묶은 확장팩을 준비하고 있어요.<br>출시되면 이곳에서 가장 먼저 만날 수 있어요.</p><div class="ssTags"><span>새 보스 10명</span><span>보스마다 3분 음악</span><span>새 이야기 챕터</span></div><button class="ssBtn" disabled style="opacity:.6;cursor:default">출시 예정 · 가격 미정</button></div></div>'}
 async function ownedTab(body){const a=account();if(!a.token){body.innerHTML='<div class="ssEmpty">로그인하면 산 스킨을 모든 기기에서 확인할 수 있어요.<br><br><button class="ssBtn buy" id="ssLogin">로그인</button></div>';body.querySelector('#ssLogin').onclick=()=>{sheet.close();window.ACCT55?.open()};return}
  body.innerHTML='<div class="ssEmpty">보관함을 확인하는 중…</div>';
  try{const base=(a.url||'https://capsule-quest-leaderboard.onrender.com').replace(/\/+$/,''),ctl=new AbortController(),tm=setTimeout(()=>ctl.abort(),20000);
   const r=await fetch(base+'/api/shop/owned',{headers:{Authorization:'Bearer '+a.token},signal:ctl.signal});clearTimeout(tm);if(!r.ok)throw Error(r.status===401?'다시 로그인해 주세요.':'보관함을 확인하지 못했어요.');const j=await r.json();owned=j.owned||[];ownedErr=''}
  catch(e){ownedErr=e.name==='AbortError'?'서버가 늦게 답하고 있어요. 잠시 뒤 다시 열어 주세요.':e.message}
  if(tab!=='owned'||!sheet.open)return;const mine=SK().filter(s=>(owned||[]).includes('skin_'+s.id));
  body.innerHTML=ownedErr?'<div class="ssEmpty">'+safe(ownedErr)+'</div>':mine.length?'<div class="ssList">'+mine.map(s=>'<div class="ssCard" style="--tc:'+s.col+'"><canvas width="96" height="96" data-id="'+s.id+'"></canvas><div><b>'+safe(s.name)+'</b><div class="pr">보유 중</div></div></div>').join('')+'</div>':'<div class="ssEmpty">아직 산 스킨이 없어요.<br>스킨 탭에서 마음에 드는 모습을 입어 보세요!</div>'}

 /* 무대 그리기 */
 function drawStage(cv,id,now){const c=cv.getContext('2d'),w=cv.width,h=cv.height,t=now/1000,s=window.SKIN58&&SKIN58.byId(id);if(!s)return;
  c.imageSmoothingEnabled=false;const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0b0f1c');g.addColorStop(.7,'#121a2c');g.addColorStop(1,'#05070c');c.fillStyle=g;c.fillRect(0,0,w,h);
  /* 뒤 빛 */const rg=c.createRadialGradient(w/2,h*.48,10,w/2,h*.48,h*.6);rg.addColorStop(0,s.col+'55');rg.addColorStop(1,'#00000000');c.fillStyle=rg;c.fillRect(0,0,w,h);
  /* 조명 */c.save();c.globalCompositeOperation='lighter';for(const sx of [-1,1]){const gg=c.createLinearGradient(w/2+sx*w*.32,0,w/2,h*.8);gg.addColorStop(0,'#ffffff22');gg.addColorStop(1,'#ffffff00');c.fillStyle=gg;c.beginPath();c.moveTo(w/2+sx*w*.3,0);c.lineTo(w/2+sx*w*.36,0);c.lineTo(w/2+sx*w*.06,h*.82);c.lineTo(w/2-sx*w*.06,h*.82);c.fill()}c.restore();
  /* 바닥 원판 */c.fillStyle='#00000088';c.beginPath();c.ellipse(w/2,h*.83,w*.2,h*.05,0,0,TAU);c.fill();c.strokeStyle=s.col+'aa';c.lineWidth=2;c.beginPath();c.ellipse(w/2,h*.83,w*.2+Math.sin(t*2)*3,h*.05,0,0,TAU);c.stroke();
  /* 반짝이 */for(let i=0;i<24;i++){const q=(t*.15+i*.137)%1;c.globalAlpha=(1-q)*.7;c.fillStyle=i%2?s.col:'#ffffff';c.fillRect(((i*97)%w),h*(.9-q*.8),2,2)}c.globalAlpha=1;
  /* 캐릭터: 돌려 보기면 정면 → 옆(왼) → 뒤 → 옆(오른) */
  const ph=Math.floor(t/1.6)%4,v=viewMode==='auto'?['front','side','back','side'][ph]:viewMode,flip=viewMode==='auto'?ph===3:false,walk=v==='side'?Math.floor(t*6)%4:0;
  const o=SKIN58.render(id,v,walk,t),S=Math.floor(Math.min(w/40,h/48)*.78),dw=40*S,dh=48*S,x=w/2-dw/2,y=h*.83-dh*.94;
  c.save();if(flip){c.translate(w/2,0);c.scale(-1,1);c.translate(-w/2,0)}if(v==='side'){c.translate(w/2,0);c.scale(.86,1);c.translate(-w/2,0)}c.drawImage(o,Math.round(x),Math.round(y),dw,dh);c.restore()}
 function drawMini(cv,id,now){const c=cv.getContext('2d'),w=cv.width,h=cv.height,s=window.SKIN58&&SKIN58.byId(id);if(!s)return;c.imageSmoothingEnabled=false;c.clearRect(0,0,w,h);const rg=c.createRadialGradient(w/2,h*.55,4,w/2,h*.55,w*.6);rg.addColorStop(0,s.col+'44');rg.addColorStop(1,'#07090f');c.fillStyle=rg;c.fillRect(0,0,w,h);
  const o=SKIN58.render(id,'front',0,now/1000);c.drawImage(o,w/2-40,h-92,80,96)}
 function drawBoss(cv,now){const c=cv.getContext('2d'),w=cv.width,h=cv.height,t=now/1000;c.clearRect(0,0,w,h);c.fillStyle='#0b0812';c.fillRect(0,0,w,h);
  /* 실루엣 보스 + 물음표 */c.fillStyle='#1d1430';c.beginPath();c.ellipse(w/2,h*.55,60+Math.sin(t*2)*2,48,0,0,TAU);c.fill();for(const s of [-1,1]){c.beginPath();c.moveTo(w/2+s*30,h*.3);c.lineTo(w/2+s*55,h*.08);c.lineTo(w/2+s*44,h*.36);c.fill()}
  c.fillStyle='#ff4d6d';for(const s of [-1,1]){c.globalAlpha=.6+.4*Math.sin(t*3);c.fillRect(w/2+s*18-4,h*.48,8,4)}c.globalAlpha=1;c.fillStyle='#ffffffcc';c.font='900 34px '+FONT;c.textAlign='center';c.fillText('?',w/2,h*.72)}
 function loop(now){if(!sheet.open){raf=0;return}try{const cv=sheet.querySelector('#ssCv');if(cv&&sel)drawStage(cv,sel,now);sheet.querySelectorAll('.ssCard canvas[data-id]').forEach(m=>drawMini(m,m.dataset.id,now));const bc=sheet.querySelector('#ssBossCv');if(bc)drawBoss(bc,now)}catch(e){}raf=requestAnimationFrame(loop)}
 function open(t){if(t)tab=t;if(!sheet.open)sheet.showModal();build();if(!raf)raf=requestAnimationFrame(loop)}
 sheet.addEventListener('close',()=>{if(raf)cancelAnimationFrame(raf);raf=0});
 sheet.addEventListener('keydown',e=>e.stopPropagation());
 sheet.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===sheet)sheet.close()});
 /* 메뉴 위 단추는 없고, 상점(태엽 공방) 탭 줄에 「보스팩 · 스킨」 탭을 붙임 → 누르면 이 창이 열림 */
 window.BBShopOpen=open;
 function mount(){const tabs=document.querySelector('#shopModal .shopTabs');if(!tabs||tabs.querySelector('[data-addon]'))return;const b=document.createElement('button');b.className='shopTab bbAddonTab';b.dataset.addon='1';b.innerHTML='✦ <span class="bbL">보스팩 · 스킨</span><span class="bbS">팩·스킨</span>';b.title='보스팩 · 스킨';b.onclick=e=>{e.stopPropagation();try{gmSfx('ok')}catch(_){}open();};tabs.appendChild(b);}
 {const _rs=renderShop;renderShop=function(){const r=_rs.apply(this,arguments);try{mount()}catch(e){}return r}}
}catch(e){console.error('v58 shop',e)}})();
