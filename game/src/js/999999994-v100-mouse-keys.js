/* ================= v100 마우스 조작 · 키 안내 (MK100) =================
   ① 설정 → 키 설정에서 키 대신 마우스 버튼도 넣을 수 있다(왼쪽 · 오른쪽 · 가운데 · 뒤로 · 앞으로).
      「＋」를 누른 뒤 키를 누르거나 마우스 버튼을 누르면 그 동작에 들어간다. 키보드 지도 옆에 마우스 그림.
      저장은 키와 같은 saveData.keys(예: 'Mouse0'). 게임 중에 그 버튼을 누르면 그 동작의 키를 누른 것과 똑같이 처리.
      마우스 버튼을 하나라도 넣었으면 게임 중 오른쪽 클릭 메뉴는 뜨지 않는다. 손가락 터치가 흉내 내는 마우스 입력은 무시.
   ② 컴퓨터 · 노트북(마우스 화면)에서 전투(탑 · 보스전)를 시작하면 화면 맨 아래에 조작 안내 막대가 9초 동안 뜬다.
      지금 설정된 키(바꾼 키 · 마우스 포함)로 보여 주고, 기본값과 다른 동작에는 「바꾼 키」 표시,
      지난번 안내 이후 키를 바꿨으면 「⌨ 키가 바뀌었어요」 문구가 함께 뜬다. 설정에서 바꾸는 순간에도 화면 아래에 바뀐 내용이 잠깐 뜬다. */
(()=>{try{
 if(typeof KB_ACT==='undefined')return;const $=id=>document.getElementById(id);
 const MB={Mouse0:'🖱 왼쪽',Mouse1:'🖱 가운데',Mouse2:'🖱 오른쪽',Mouse3:'🖱 뒤로',Mouse4:'🖱 앞으로'};
 {const f=kbLabel;kbLabel=function(code){if(MB[code])return MB[code];return f.apply(this,arguments)}}
 const fake=e=>!!(e.sourceCapabilities&&e.sourceCapabilities.firesTouchEvents);
 /* ---------- ① 설정에서 마우스 버튼 받기 ---------- */
 addEventListener('mousedown',e=>{if(!KB.cap||fake(e))return;if(e.target&&e.target.closest&&e.target.closest('.cfDef,.cfChip'))return;e.preventDefault();e.stopImmediatePropagation();const cb=KB.cap;KB.cap=null;cb('Mouse'+e.button)},true);
 addEventListener('contextmenu',e=>{if(KB.cap){e.preventDefault();return}if(anyMouse()&&kbInGame()&&!(e.target&&e.target.closest&&e.target.closest('input,textarea')))e.preventDefault()},true);
 addEventListener('auxclick',e=>{if(KB.cap||(anyMouse()&&kbInGame()))e.preventDefault()},true);
 /* 키보드 지도 옆 마우스 그림 */
 {const f=cfKeys;cfKeys=function(){const r=f.apply(this,arguments);try{const kb=$('cfKbd');if(!kb||kb.querySelector('.cfMouse100'))return r;const b=kbGet(),own={};for(const a of KB_ACT)for(const k of b[a.id])(own[k]=own[k]||[]).push(a);
   const btn=(code,cls,lab)=>{const o=own[code];return '<div class="mb '+cls+(o?' on':'')+'" data-code="'+code+'" style="'+(o?'--kc:'+o[0].col:'')+'" title="'+(o?o.map(a=>a.n).join(', '):'비어 있음')+'"><span>'+lab+'</span>'+(o?'<i>'+o[0].ico+'</i>':'')+'</div>'};
   const d=document.createElement('div');d.className='cfMouse100';d.innerHTML='<div class="body">'+btn('Mouse0','l','왼쪽')+btn('Mouse2','r','오른쪽')+btn('Mouse1','m','휠')+'</div><div class="side">'+btn('Mouse3','s','뒤로')+btn('Mouse4','s','앞으로')+'</div><small>🖱 마우스</small>';kb.appendChild(d);
   const msg=$('cfKbMsg');if(msg&&!msg.dataset.m100&&!msg.textContent.trim()){msg.dataset.m100=1;msg.innerHTML='동작 옆 <b>＋</b>를 누른 뒤 <b>키</b>나 <b>마우스 버튼</b>을 누르면 바뀌어요'}}catch(e){console.error('mk100',e)}return r}}
 {const f=cfCapture;cfCapture=function(id,row){const r=f.apply(this,arguments);try{const A=KB_ACT.find(a=>a.id===id);cfMsg('<b>'+A.n+'</b>에 쓸 <b>키</b>나 <b>마우스 버튼</b>을 눌러 주세요 · <b>Esc</b> 취소')}catch(e){}return r}}
 /* 바꿀 때마다 화면 아래 잠깐 알림 */
 {const f=cfSave;cfSave=function(cur){const before=kbGet();const r=f.apply(this,arguments);try{const ch=KB_ACT.filter(a=>(before[a.id]||[]).join()!==(cur[a.id]||[]).join());if(ch.length)toast('⌨ 키가 바뀌었어요 · '+ch.map(a=>a.n.split(' ')[0]+' = '+cur[a.id].map(kbLabel).join(' / ')).join(' · '))}catch(e){}return r}}
 /* ---------- 게임 중 마우스 → 동작 ---------- */
 const mouseMap=()=>{const b=kbGet(),m={};for(const a of KB_ACT)for(const k of b[a.id])if(MB[k])m[k]=a;return m};
 const anyMouse=()=>Object.keys(mouseMap()).length>0;
 const uiHit=t=>!!(t&&t.closest&&t.closest('button,a,input,select,textarea,label,.gmBtn,#gameMenu,#shopModal,#bbShop,#fr94,#duo85,#more98,#wt95,#acctBox,#tut63,.frT,#overlay:not([hidden]) button'));
 const held=new Set();
 function send(type,a){const ev=new KeyboardEvent(type,{code:a.c,key:'',bubbles:true,cancelable:true});document.dispatchEvent(ev)}
 addEventListener('mousedown',e=>{if(KB.cap||fake(e)||!kbInGame())return;const a=mouseMap()['Mouse'+e.button];if(!a||uiHit(e.target))return;e.preventDefault();held.add(e.button);send('keydown',a)},true);
 addEventListener('mouseup',e=>{if(!held.has(e.button))return;held.delete(e.button);const a=mouseMap()['Mouse'+e.button];if(a)send('keyup',a)},true);
 addEventListener('blur',()=>{for(const b of held){const a=mouseMap()['Mouse'+b];if(a)send('keyup',a)}held.clear()});

 /* ---------- ② 키 안내 막대 ---------- */
 const pc=()=>{try{return matchMedia('(hover:hover) and (pointer:fine)').matches&&!document.documentElement.classList.contains('ph')}catch(e){return false}};
 const bar=document.createElement('div');bar.id='kh100';bar.hidden=true;document.body.appendChild(bar);
 const tst=document.createElement('div');tst.id='kt100';tst.hidden=true;document.body.appendChild(tst);
 let tT=0;function toast(t){tst.textContent=t;tst.hidden=false;tst.classList.remove('in');void tst.offsetWidth;tst.classList.add('in');clearTimeout(tT);tT=setTimeout(()=>{tst.hidden=true},3200)}
 const SHOW=['up','atk','dash','parry','ult','pause'];
 const ls=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}};
 let hideT=0;
 function show(){if(!pc())return;const b=kbGet(),snap=JSON.stringify(b),changed=ls('bb-kh100')&&ls('bb-kh100')!==snap;ls('bb-kh100',snap);
  const keyB=k=>'<kbd'+(MB[k]?' class="ms"':'')+'>'+kbLabel(k)+'</kbd>';
  const item=a=>{const ks=a.id==='up'?null:b[a.id].slice().sort((x,y)=>(MB[y]?1:0)-(MB[x]?1:0)).slice(0,2),diff=a.id==='up'?['up','down','left','right'].some(i=>{const A=KB_ACT.find(x=>x.id===i);return b[i].join()!==A.d.join()}):b[a.id].join()!==a.d.join();
   const keys=a.id==='up'?['up','left','down','right'].map(i=>keyB(b[i][0])).join(''):ks.map(keyB).join('<i>/</i>');
   return '<span class="it'+(diff?' ch':'')+'" style="--kc:'+a.col+'"><b>'+(a.id==='up'?'이동':a.n.split(' ')[0])+'</b>'+keys+(diff?'<em>바꾼 키</em>':'')+'</span>'};
  bar.innerHTML=(changed?'<div class="hd">⌨ 키가 바뀌었어요 — 지금 설정대로 보여 드려요</div>':'')+'<div class="row">'+SHOW.map(id=>item(KB_ACT.find(a=>a.id===id))).join('')+'</div>';tst.hidden=true;
  bar.hidden=false;bar.classList.remove('out');clearTimeout(hideT);hideT=setTimeout(()=>{bar.classList.add('out');setTimeout(()=>{if(bar.classList.contains('out'))bar.hidden=true},700)},changed?12000:9000)}
 function hide(){bar.hidden=true;clearTimeout(hideT)}
 let lastMode=null,lastKey='';
 setInterval(()=>{try{const m=typeof mode!=='undefined'?mode:'',fight=m==='tower'||m==='boss';const spec=!!(window.WATCH95&&WATCH95.specOn());
  if(fight&&!spec){const k=m+(m==='tower'&&window.TW71&&TW71.T?'':'');if(lastMode!=='tower'&&lastMode!=='boss')show()}else if(!bar.hidden)hide();lastMode=spec?null:m}catch(e){}},250);
 /* 키를 처음 누르면 안내를 조금 흐리게 */
 addEventListener('keydown',()=>{if(!bar.hidden)bar.classList.add('dim')},true);

 const st=document.createElement('style');st.id='mk100s';st.textContent=`
 .cfMouse100{display:flex;flex-direction:column;align-items:center;gap:6px}
 .cfMouse100 .body{position:relative;width:74px;height:104px;border-radius:37px 37px 32px 32px;background:linear-gradient(180deg,#1c282c,#10181a);box-shadow:inset 0 0 0 1px #3a4a4e,0 6px 16px #0008;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:46px 1fr;overflow:hidden}
 .cfMouse100 .mb{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;font-size:9px;font-weight:800;color:#8aa0a8;cursor:default;position:relative}
 .cfMouse100 .mb.l{border-right:1px solid #3a4a4e;border-bottom:1px solid #3a4a4e}.cfMouse100 .mb.r{border-bottom:1px solid #3a4a4e}
 .cfMouse100 .mb.m{position:absolute;left:31px;top:12px;width:12px;height:22px;border-radius:6px;background:#0a1012;box-shadow:inset 0 0 0 1px #3a4a4e;font-size:0}
 .cfMouse100 .mb.on{color:#05070a;background:var(--kc)}.cfMouse100 .mb.m.on{background:var(--kc)}.cfMouse100 .mb i{font-style:normal;font-size:13px}.cfMouse100 .mb.m i{font-size:0}
 .cfMouse100 .side{display:flex;gap:4px}.cfMouse100 .mb.s{padding:3px 6px;border-radius:6px;background:#10181a;box-shadow:inset 0 0 0 1px #3a4a4e;flex-direction:row}
 .cfMouse100 .mb.s.on{background:var(--kc)}.cfMouse100 small{font-size:10px;color:#8aa0a8;font-weight:800}
 #kh100{position:fixed;left:50%;bottom:6px;transform:translateX(-50%);z-index:8000;pointer-events:none;display:flex;flex-direction:column;align-items:center;gap:4px;max-width:min(560px,38vw);animation:kh100in .35s ease-out;transition:opacity .6s}
 #kh100[hidden]{display:none}#kh100.out{opacity:0}#kh100.dim{opacity:.55}
 #kh100 .hd{font-size:12.5px;font-weight:900;color:#05070a;background:linear-gradient(180deg,#ffe79a,#ffb020);padding:4px 12px;border-radius:999px;box-shadow:0 0 16px #ffb02088;animation:kh100p 1s ease-in-out infinite}
 #kh100 .row{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:4px 10px;padding:6px 10px;border-radius:14px;background:#05070add;border:1px solid #ffffff22;box-shadow:0 8px 24px #000a;backdrop-filter:blur(4px)}
 #kh100 .it{display:flex;align-items:center;gap:3px;font-size:11px;color:#e8f4ef}#kh100 .it b{color:var(--kc);font-weight:900;margin-right:2px}
 #kh100 kbd{font:800 10px/1 inherit;font-family:inherit;min-width:16px;text-align:center;padding:3px 5px;border-radius:6px;color:#e8f4ef;background:linear-gradient(180deg,#2a3436,#161e20);border:1px solid #ffffff2a;border-bottom-width:2px}
 #kh100 kbd.ms{color:#05070a;background:linear-gradient(180deg,#d8f4ff,#8de4ff)}#kh100 .it i{font-style:normal;color:#5a6a70}
 #kh100 .it em{font-style:normal;font-size:9.5px;font-weight:900;color:#05070a;background:#ffd166;border-radius:5px;padding:1px 4px}
 #kh100 .it.ch kbd{border-color:#ffd166;box-shadow:0 0 6px #ffd16688}#kh100 .set{font-size:10.5px;color:#8aa0a8}
 #kt100{position:fixed;left:50%;bottom:74px;transform:translateX(-50%);z-index:9500;pointer-events:none;font-size:13px;font-weight:800;color:#05070a;background:linear-gradient(180deg,#d4ffe6,#74d3b0);padding:8px 14px;border-radius:12px;box-shadow:0 8px 24px #000a;max-width:92vw;text-align:center}
 #kt100[hidden]{display:none}#kt100.in{animation:kh100in .3s ease-out}
 @keyframes kh100in{from{transform:translate(-50%,12px);opacity:0}}@keyframes kh100p{50%{box-shadow:0 0 26px #ffb020cc}}`;document.head.appendChild(st);
 window.MK100={show,hide,toast,mouseMap};
}catch(e){console.error('v100 mouse keys',e)}})();
