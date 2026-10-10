/* ================= v125 다듬기 (POL125) =================
   ① 오프닝(TAP 화면) → 로그인 창(로그인 안 했으면, 뒤의 로비는 가림) → 로딩 화면 → 로비
   ② 「◀ 뒤로」 단추를 모두 왼쪽 ✕ 단추로 · 창의 ✕ 단추는 모두 왼쪽으로
   ③ 보스 러시: 컴퓨터에서는 「공격 패턴」 칸을 오른쪽 아래로, ✕를 누르면 닫히고 「📋 공격 패턴」으로 다시 열기
   ④ 상점이 열려 있으면 뒤의 로비 그림을 쉬게 해서 렉을 줄임
   ⑤ 로비 메뉴: 처음부터 빛나고, 마우스를 올리면 반짝 효과
   ⑥ 명예의 전당: 별자리(10명)를 다 모으면 · 모든 보스를 다 모으면 보상 · 단추들을 가운데로
   ⑦ 설정 → 프로필에서 이름 바꾸기 (로그인했으면 서버 POST /api/account/name)
   ⑧ 광장 채팅 크게 · 탑 「이어하기」/「선택한 층 플레이」 단추 모양 */
(()=>{try{
 const $=id=>document.getElementById(id),E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const sfx=k=>{try{gmSfx(k)}catch(e){}},save=()=>{try{saveNow()}catch(e){}};
 const st=document.createElement('style');st.id='pol125';st.textContent=`
 /* ① 로그인 창이 떠 있는 동안 뒤의 로비를 가림 */
 html.gate125 #acctBox{background:radial-gradient(ellipse at 50% 30%,#13283a,#05070c 70%)!important}
 #ld125{position:fixed;inset:0;z-index:99998;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;background:radial-gradient(ellipse at 50% 35%,#102632,#05070c 70%);color:#eaf6ef;font-family:${typeof FONT_STACK!=='undefined'?FONT_STACK:'sans-serif'};transition:opacity .35s}
 #ld125.out{opacity:0;pointer-events:none}
 #ld125 .lg{font:900 clamp(34px,7vw,64px)/1 ${typeof FONT_STACK!=='undefined'?FONT_STACK:'sans-serif'};letter-spacing:.06em;background:linear-gradient(90deg,#a6f5c6,#fff,#ffe36b);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 18px #a6f5c655)}
 #ld125 .sb{font-size:13px;letter-spacing:.6em;color:#ff8fb0;margin:-4px 0 10px}
 #ld125 .bar{width:min(420px,76vw);height:12px;border-radius:99px;background:#ffffff14;box-shadow:inset 0 0 0 1px #ffffff22;overflow:hidden}
 #ld125 .bar i{display:block;height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,#5affd8,#a6f5c6,#ffe36b);box-shadow:0 0 14px #5affd8aa}
 #ld125 .tx{font-size:13px;color:#cfe8d0;min-height:18px}#ld125 .tx b{color:#ffe36b;margin-left:6px}
 #ld125 .kn{width:120px;height:120px;image-rendering:pixelated;animation:ld125b .5s ease-in-out infinite alternate}
 @keyframes ld125b{from{transform:translateY(0)}to{transform:translateY(-6px)}}
 /* ② ✕ 단추는 왼쪽 */
 html body .cx125L{margin:0 10px 0 0!important}
 #acPanel>button#acClose.cx77{left:10px!important;right:auto!important}#acPanel>h3{padding-left:52px!important;padding-right:0!important}
 html body #bbShop .ssX{position:relative!important;top:auto!important;right:auto!important;left:auto!important}
 html body #bbShop .ssHead{padding-right:14px!important}
 .dHd>button.cx77{flex:none}
 /* ③ 보스 러시 공격 패턴(컴퓨터) */
 #rq125Open{display:none}
 @media (min-width:1001px){
  html body #rqLeft{left:auto!important;right:18px!important;top:auto!important;bottom:16px!important;width:min(340px,22vw)!important;max-height:min(32vh,320px)!important;--cxs:32px}
  html body #rqStage{left:0!important;width:66vw!important}
  html body #rqPrevB{left:16px!important}
  html body #rqLeft #mbDetX{position:sticky!important;top:0;float:left;margin:0 8px 4px 0!important}
  html body #gmRush.rq125Off #rqLeft{display:none!important}
  #gmRush.rq125Off #rq125Open{display:flex;position:absolute;right:18px;bottom:16px;z-index:6;align-items:center;gap:6px;padding:9px 16px!important;font-size:13px!important;font-weight:900;border-radius:999px!important;background:rgba(6,10,14,.85)!important;border:1px solid #a6f5c666!important;color:#e8fff2!important;box-shadow:0 0 14px #a6f5c633;cursor:pointer}
  #gmRush.rq125Off #rq125Open:hover{box-shadow:0 0 22px #a6f5c688;transform:translateY(-2px)}}
 /* ⑤ 로비 메뉴: 처음부터 빛 · 올리면 효과 */
 #lvSet .lvI{overflow:hidden;background:linear-gradient(90deg,color-mix(in srgb,var(--c) 15%,transparent),transparent 80%);box-shadow:inset 2px 0 0 color-mix(in srgb,var(--c) 75%,transparent);color:#fff;transition:transform .2s cubic-bezier(.2,1.4,.4,1),background .2s,box-shadow .2s}
 #lvSet .lvI b{color:#fff!important;text-shadow:0 0 6px var(--c),0 0 16px color-mix(in srgb,var(--c) 65%,transparent);transition:text-shadow .2s,letter-spacing .2s}
 #lvSet .lvI .n{color:var(--c)!important;text-shadow:0 0 6px var(--c)}#lvSet .lvI small{color:#ffffffa0!important}
 #lvSet .lvI::after{content:'';position:absolute;inset:0;pointer-events:none;opacity:0;background:linear-gradient(110deg,transparent 30%,#ffffff45 50%,transparent 70%);background-size:250% 100%;background-position:130% 0}
 #lvSet .lvI:hover{transform:translateX(12px) scale(1.03);background:linear-gradient(90deg,color-mix(in srgb,var(--c) 36%,transparent),transparent 92%)!important;box-shadow:inset 4px 0 0 var(--c),0 0 24px color-mix(in srgb,var(--c) 45%,transparent)!important}
 #lvSet .lvI:hover::after{opacity:1;animation:lv125sh .7s ease-out forwards}
 #lvSet .lvI:hover b{text-shadow:0 0 8px var(--c),0 0 22px var(--c),0 0 42px var(--c)!important;letter-spacing:.08em}
 #lvSet .lvI:active{transform:translateX(8px) scale(.98)}
 @keyframes lv125sh{from{background-position:130% 0}to{background-position:-30% 0}}
 #gameMenu #lvGoBtn{animation:lv125g 2s ease-in-out infinite;transition:transform .15s,filter .15s}
 #gameMenu #lvGoBtn:hover{transform:scale(1.06);filter:brightness(1.15)}
 @keyframes lv125g{0%,100%{box-shadow:0 0 14px #a6f5c688,0 0 0 2px #a6f5c655}50%{box-shadow:0 0 30px #a6f5c6cc,0 0 0 3px #a6f5c6aa}}
 html.ph #phNav button{box-shadow:0 0 10px color-mix(in srgb,#a6f5c6 40%,transparent)}
 /* ⑥ 명예의 전당 */
 html:not(.ph) #hfNav{left:50%!important;right:auto!important;top:auto!important;bottom:176px!important;transform:translateX(-50%)!important;flex-direction:row!important;flex-wrap:nowrap!important;align-items:center}
 html:not(.ph) #hfNav i{height:auto!important;width:10px}
 #hfRw125{position:absolute;left:50%;top:76px;transform:translateX(-50%);z-index:6;display:flex;flex-direction:column;align-items:center;gap:6px;pointer-events:auto}
 #hfRw125>button.t{all:unset;cursor:pointer;display:flex;align-items:center;gap:8px;padding:8px 16px;border-radius:999px;font-weight:900;font-size:14px;color:#fff3c4;background:linear-gradient(180deg,#3a2c10e6,#1a1408e6);box-shadow:inset 0 0 0 1px #ffd16688,0 0 16px #ffd16633}
 #hfRw125>button.t.rdy{animation:hf125p 1.2s ease-in-out infinite}
 #hfRw125>button.t em{font-style:normal;color:#ffd166}
 @keyframes hf125p{0%,100%{box-shadow:inset 0 0 0 1px #ffd166,0 0 10px #ffd16655}50%{box-shadow:inset 0 0 0 2px #fff3c4,0 0 28px #ffd166cc}}
 #hfRw125 .pn{display:none;width:min(440px,86vw);padding:12px;border-radius:14px;background:#0b0c22f2;box-shadow:inset 0 0 0 1px #ffd16655,0 10px 30px #000a;color:#e8e8ff;font-size:13px}
 #hfRw125.op .pn{display:block}
 #hfRw125 .row{display:flex;align-items:center;gap:8px;padding:6px 4px;border-bottom:1px solid #ffffff10}
 #hfRw125 .row b{color:var(--c,#fff);min-width:62px}#hfRw125 .row .g{flex:1;color:#cfd3ff;font-size:12px}
 #hfRw125 .row button{all:unset;cursor:pointer;padding:5px 12px;border-radius:9px;font-weight:900;font-size:12px;background:#ffd166;color:#2a1c08}
 #hfRw125 .row button[disabled]{background:#ffffff18;color:#9aa;cursor:default}
 #hfRw125 .row.all{border:0;margin-top:4px;padding:8px;border-radius:10px;background:linear-gradient(90deg,#3a2c10,#2a1440)}
 html.ph #hfRw125{top:auto;bottom:12px;left:auto;right:10px;transform:none;align-items:flex-end}
 /* ⑦ 이름 바꾸기 */
 #nm125{display:flex;flex-direction:column;gap:8px;padding:12px 14px;border-radius:12px;background:#ffffff08;box-shadow:inset 0 0 0 1px #ffffff18;margin-bottom:10px}
 #nm125 .cur{font-size:14px;color:#cfe8d0}#nm125 .cur b{color:#ffe36b;font-size:17px;margin-left:4px}
 #nm125 form{display:flex;gap:8px;flex-wrap:wrap}
 #nm125 input{flex:1;min-width:150px;font:inherit;font-size:16px;padding:10px 12px;border-radius:10px;border:1px solid #a6f5c655;background:#0b1220;color:#fff;outline:none}#nm125 input:focus{border-color:#a6f5c6}
 #nm125 button{font:inherit;font-weight:900;font-size:14px;padding:10px 16px;border-radius:10px;border:0;background:linear-gradient(180deg,#a6f5c6,#5ad79a);color:#06240f;cursor:pointer}
 #nm125 .m{font-size:12px;color:#9fb0c8;min-height:16px}#nm125 .m.ok{color:#a6f5c6}#nm125 .m.no{color:#ff8fa0}
 /* ⑧ 광장 채팅 크게 */
 html body #plzChat{width:min(560px,70vw)!important;left:12px;bottom:12px;gap:6px}
 html body #plzChat .lg{background:#0b1220a8;border-radius:12px;padding:8px 12px;box-shadow:inset 0 0 0 1px #7dd8ff33}
 html body #plzChat .lg:empty{display:none}
 html body #plzChat .lg div{font-size:15px!important;line-height:1.5}
 html body #plzChat input{font-size:16px!important;padding:11px 14px!important;border-radius:12px}
 html body #plzChat button{font-size:14px!important;padding:10px 15px!important;border-radius:12px}
 html body #plzChat .eb{font-size:20px!important;padding:6px 11px!important}
 html.ph body #plzChat{width:min(440px,88vw)!important}html.ph body #plzChat .lg div{font-size:13.5px!important}
 /* ⑧ 탑: 「이어하기」가 크게 빛나고, 「선택한 층 플레이」는 옆에 */
 .twBtns{gap:10px!important}
 .twBtns small{display:block;font-size:11px;font-weight:700;letter-spacing:0;opacity:.8;margin-top:3px}
 #twCont{font-size:22px!important;padding:14px 26px!important;position:relative;overflow:hidden;line-height:1.15;box-shadow:0 0 0 2px #ffffff30,0 8px 24px color-mix(in srgb,var(--tz,#5affd8) 40%,transparent)!important;animation:twGlow 1.8s ease-in-out infinite}
 #twCont::after{content:'';position:absolute;inset:0;background:linear-gradient(110deg,transparent 35%,#ffffffaa 50%,transparent 65%);background-size:260% 100%;animation:twShine 2.2s linear infinite;pointer-events:none}
 html body #gmTower #twGo.sel125{font-size:16px!important;padding:11px 18px!important;line-height:1.15;animation:none!important;background:#0c1418!important;color:#fff!important;border:2px solid var(--tz,#5affd8)!important;box-shadow:0 0 12px color-mix(in srgb,var(--tz,#5affd8) 35%,transparent)!important}
 html body #gmTower #twGo.sel125::after{display:none}
 html body #gmTower #twGo.sel125:hover{background:color-mix(in srgb,var(--tz,#5affd8) 20%,#0c1418)!important}
 html body #gmTower.twBossSel #twGo.sel125{border-color:#ff5a7a!important;color:#ffd0da!important;background:#1e0a10!important;box-shadow:0 0 12px #ff2d5555!important}
 html.phL #twCont{font-size:18px!important;padding:10px 16px!important}html.phL #twGo.sel125{font-size:14px!important;padding:8px 12px!important}
 `;document.head.appendChild(st);

 /* ================= ① 오프닝 → 로그인 → 로딩 → 로비 ================= */
 const head=()=>{try{return navigator.webdriver&&!localStorage.getItem('bb-gate-test')}catch(e){return false}};
 const T0=performance.now();let ldDone=false;
 const boxOpen=()=>{const b=$('acctBox');return !!(b&&!b.hidden)};
 function showLoad(ms){if($('ld125'))return;const d=document.createElement('div');d.id='ld125';
  d.innerHTML='<canvas class="kn" width="18" height="18"></canvas><div class="lg">BEAT BLADE</div><div class="sb">MACHINA</div><div class="bar"><i></i></div><div class="tx"></div>';document.body.appendChild(d);
  try{const c=d.querySelector('.kn'),x=c.getContext('2d');c.width=96;c.height=96;x.imageSmoothingEnabled=false;drawKnight(x,26,38,4,false,null,0)}catch(e){}
  const bar=d.querySelector('.bar i'),tx=d.querySelector('.tx'),msgs=['장비를 챙기는 중…','탑의 문을 여는 중…','보스를 깨우는 중…','무대 조명을 켜는 중…'],t0=performance.now();
  const step=()=>{const k=Math.min(1,(performance.now()-t0)/ms),e=1-Math.pow(1-k,2);bar.style.width=(e*100).toFixed(1)+'%';tx.innerHTML=E(msgs[Math.min(msgs.length-1,Math.floor(e*msgs.length))])+'<b>'+Math.round(e*100)+'%</b>';
   if(k<1||(d._hold&&performance.now()<d._hold))requestAnimationFrame(step);else{/* v126: 캐릭터를 누르면 _hold까지 조금 더 머묾 */d.classList.add('out');setTimeout(()=>d.remove(),380)}};requestAnimationFrame(step)}
 function waitLobby(){if(ldDone)return;if($('splash')||performance.now()-T0<950||boxOpen())return void setTimeout(waitLobby,100);
  ldDone=true;document.documentElement.classList.remove('gate125');if(!head())showLoad(1300)}
 setTimeout(waitLobby,100);

 /* ================= ② 뒤로 → ✕ , ✕는 왼쪽 ================= */
 const SKIP=new Set(['mbDetX','acClose']);
 function fixX(){
  document.querySelectorAll('button.gmBack:not(.cx77),button.dBack:not(.cx77)').forEach(b=>{b.textContent='닫기'});
  try{if(window.CX77)CX77.fix()}catch(e){}
  document.querySelectorAll('button.cx77,#bbShop .ssX').forEach(b=>{if(b._l125||SKIP.has(b.id))return;b._l125=1;const p=b.parentElement;if(!p||p.children.length<2)return;
   const cs=getComputedStyle(p);if(!/flex/.test(cs.display)||cs.flexDirection.indexOf('column')===0)return;
   if(p.lastElementChild!==b){if(p.firstElementChild===b)b.classList.add('cx125L');return}
   const js=cs.justifyContent;p.prepend(b);b.classList.add('cx125L');if(/space/.test(js)){p.style.justifyContent='flex-start';if(p.children.length>2)p.lastElementChild.style.marginLeft='auto'}})}
 let q=0;const run=()=>{q=0;try{fixX()}catch(e){}};
 try{new MutationObserver(()=>{if(!q)q=requestAnimationFrame(run)}).observe(document.body,{childList:true,subtree:true})}catch(e){}
 setTimeout(run,300);setInterval(run,1500);

 /* ================= ③ 보스 러시 공격 패턴 ✕ ================= */
 document.addEventListener('click',e=>{try{const t=e.target.closest&&e.target.closest('#mbDetX');if(t&&innerWidth>1000){const s=$('gmRush');if(s){s.classList.add('rq125Off');sfx('back')}}}catch(_){}},true);
 function rushOpenBtn(){const s=$('gmRush');if(!s||$('rq125Open'))return;const b=document.createElement('button');b.id='rq125Open';b.className='gmBtn';b.textContent='📋 공격 패턴';b.onclick=e=>{e.stopPropagation();s.classList.remove('rq125Off');sfx('move')};s.appendChild(b)}

 /* ================= ④ 상점이 열려 있으면 뒤의 로비 그림은 쉼 ================= */
 const covered=()=>{try{if(typeof shopOpen!=='undefined'&&shopOpen){const m=$('shopModal');if(m&&!m.hidden)return true}const c=$('bbShop');if(c&&c.open)return true}catch(e){}return false};
 ['drawTitle','drawTitleFX','drawLobbyBg','lvDraw'].forEach(n=>{try{const f=window[n];if(typeof f!=='function')return;window[n]=function(){if(covered())return;return f.apply(this,arguments)}}catch(e){}});

 /* ================= ⑥ 명예의 전당 수집 보상 ================= */
 const RW_CON={dia:30,gold:3000},RW_ALL={dia:300,gold:30000};
 const HS=()=>{const h=saveData.hof125||(saveData.hof125={c:{},all:0});if(!h.c)h.c={};return h};
 function give(r){try{if(window.DIA80)DIA80.add(r.dia)}catch(e){}try{addCoins(r.gold)}catch(e){}save();try{gmHud()}catch(e){}try{if(window.DIA80&&DIA80.chip)DIA80.chip()}catch(e){}}
 function hallRw(){const s=$('gmHall');if(!s||typeof HF==='undefined'||!HF.data)return;let w=$('hfRw125');if(!w){w=document.createElement('div');w.id='hfRw125';s.appendChild(w)}
  const D=HF.data,N=Math.floor(D.length/10),h=HS(),cons=[...document.querySelectorAll('#hfNav .con')];let tot=0,ready=0,rows='';
  for(let c=0;c<N;c++){let n=0;for(let i=c*10;i<c*10+10;i++)if(D[i]&&D[i].rk)n++;tot+=n;const btn=cons.find(b=>+b.dataset.c===c),nm=btn?btn.textContent.trim():'별자리 '+(c+1),col=btn?getComputedStyle(btn).getPropertyValue('--c'):'';
   const done=n>=10,got=!!h.c[c];if(done&&!got)ready++;
   rows+='<div class="row" style="--c:'+E(col||'#fff')+'"><b>'+E(nm)+'</b><span class="g">'+n+'/10 · 💎'+RW_CON.dia+' · 🪙'+RW_CON.gold.toLocaleString()+'</span><button data-c="'+c+'"'+(done&&!got?'':' disabled')+'>'+(got?'✓ 받음':done?'받기':'🔒')+'</button></div>'}
  const all=tot>=D.length&&D.length>0;if(all&&!h.all)ready++;
  rows+='<div class="row all"><b>🏆 전부</b><span class="g">모든 보스 '+tot+'/'+D.length+' · 💎'+RW_ALL.dia+' · 🪙'+RW_ALL.gold.toLocaleString()+'</span><button data-all="1"'+(all&&!h.all?'':' disabled')+'>'+(h.all?'✓ 받음':all?'받기':'🔒')+'</button></div>';
  const op=w.classList.contains('op');
  w.innerHTML='<button class="t'+(ready?' rdy':'')+'">🏆 수집 보상 <em>'+tot+'/'+D.length+'</em>'+(ready?' · 받을 보상 '+ready+'개':'')+' '+(op?'▲':'▼')+'</button><div class="pn">'+rows+'<div style="font-size:11px;color:#9aa;margin-top:6px">별자리 하나(보스 10명)를 다 모을 때마다, 그리고 모든 보스를 다 모으면 보상을 받아요.</div></div>';
  w.querySelector('.t').onclick=e=>{e.stopPropagation();w.classList.toggle('op');sfx('move');hallRw()};
  w.querySelectorAll('.pn button').forEach(b=>b.onclick=e=>{e.stopPropagation();if(b.disabled)return;const H=HS();
   if(b.dataset.all){if(H.all)return;H.all=Date.now();give(RW_ALL);toast('🏆 모든 수호자 수집! 💎 '+RW_ALL.dia+' · 🪙 '+RW_ALL.gold.toLocaleString())}
   else{const c=+b.dataset.c;if(H.c[c])return;H.c[c]=Date.now();give(RW_CON);toast('✦ 별자리 완성 보상! 💎 '+RW_CON.dia+' · 🪙 '+RW_CON.gold.toLocaleString())}
   sfx('ok');hallRw()});
  w.onpointerdown=e=>e.stopPropagation()}
 function toast(t){try{if(typeof showToast==='function'){showToast(t);return}}catch(e){}const d=document.createElement('div');d.textContent=t;d.style.cssText='position:fixed;left:50%;top:18%;transform:translateX(-50%);z-index:99990;padding:12px 20px;border-radius:14px;background:#1a1408f0;color:#fff3c4;font-weight:900;box-shadow:inset 0 0 0 1px #ffd166,0 10px 30px #000a;pointer-events:none;transition:opacity .4s';document.body.appendChild(d);setTimeout(()=>d.style.opacity='0',1800);setTimeout(()=>d.remove(),2300)}

 /* ================= ⑦ 이름 바꾸기 ================= */
 const NRE=/^[0-9A-Za-z가-힣_]{2,10}$/;
 function nameBox(){const slot=$('gmNameSlot');if(!slot)return;let b=$('nm125');if(!b){b=document.createElement('div');b.id='nm125';slot.prepend(b);
   b.innerHTML='<div class="cur">지금 이름 <b></b></div><form><input maxlength="10" placeholder="새 이름 (2~10자)" autocomplete="off"><button type="submit">이름 바꾸기</button></form><div class="m">한글 · 영문 · 숫자 · _ 로 2~10자. 랭킹 · 친구 · 광장에 이 이름이 나와요.</div>';
   const inp=b.querySelector('input'),m=b.querySelector('.m');inp.addEventListener('keydown',e=>e.stopPropagation());
   const say=(t,c)=>{m.textContent=t;m.className='m'+(c?' '+c:'')};
   b.querySelector('form').onsubmit=async e=>{e.preventDefault();const nm=inp.value.trim();if(!NRE.test(nm)||/^g_/i.test(nm)){say('이름은 2~10자의 한글 · 영문 · 숫자 · _ 만 쓸 수 있어요.','no');sfx('no');return}
    const A=window.ACCT55&&ACCT55.get();
    if(A&&A.token){say('바꾸는 중…');try{const r=await fetch(String(A.url||'').replace(/\/+$/,'')+'/api/account/name',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+A.token},body:JSON.stringify({name:nm})});const j=await r.json().catch(()=>({}));
      if(r.ok&&j.ok){saveData.name=j.username||nm;save();try{await ACCT55.checkName()}catch(_){}say('이름을 「'+saveData.name+'」(으)로 바꿨어요!','ok');sfx('ok');inp.value=''}
      else{say(j.error||'바꾸지 못했어요. 잠시 뒤에 다시 해 주세요.','no');sfx('no')}}catch(_){say('서버에 연결하지 못했어요.','no');sfx('no')}}
    else{saveData.name=nm;save();say('이름을 「'+nm+'」(으)로 바꿨어요!','ok');sfx('ok');inp.value=''}
    try{gmHud()}catch(_){}paint()};}
  const paint=()=>{const c=b.querySelector('.cur b');if(c)c.textContent=(typeof PNAME==='function'?PNAME():saveData.name)||'모험가'};paint()}

 {const f=gmShow;gmShow=function(scr){const r=f.apply(this,arguments);try{if(scr==='hall')setTimeout(hallRw,60);if(scr==='set')nameBox();if(scr==='rush')rushOpenBtn();setTimeout(run,0)}catch(e){}return r}}
 window.POL125={showLoad,hallRw,fixX};
}catch(e){console.error('v125 polish',e)}})();
