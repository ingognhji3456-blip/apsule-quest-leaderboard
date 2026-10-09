/* ===== keymap0.js : 키 설정 (맨 먼저 실행되어 모든 입력보다 앞에서 키를 바꿔 끼움) ===== */
const KB_ACT=[
 {id:'up',g:'이동',n:'위로',c:'ArrowUp',d:['ArrowUp','KeyW'],col:'#8ae8ff',ico:'▲'},
 {id:'down',g:'이동',n:'아래로',c:'ArrowDown',d:['ArrowDown','KeyS'],col:'#8ae8ff',ico:'▼'},
 {id:'left',g:'이동',n:'왼쪽',c:'ArrowLeft',d:['ArrowLeft','KeyA'],col:'#8ae8ff',ico:'◀'},
 {id:'right',g:'이동',n:'오른쪽',c:'ArrowRight',d:['ArrowRight','KeyD'],col:'#8ae8ff',ico:'▶'},
 {id:'atk',g:'전투',n:'공격',c:'KeyJ',d:['KeyJ','Space','KeyZ'],col:'#ff9a5a',ico:'⚔'},
 {id:'dash',g:'전투',n:'대시',c:'KeyK',d:['KeyK','ShiftLeft','KeyX'],col:'#a6f5c6',ico:'»'},
 {id:'parry',g:'전투',n:'패링 (막기)',c:'KeyF',d:['KeyF','KeyL'],col:'#ffd166',ico:'◈'},
 {id:'ult',g:'전투',n:'필살기',c:'KeyC',d:['KeyC'],col:'#ff7ad9',ico:'✦'},
 {id:'pause',g:'시스템',n:'일시정지',c:'KeyP',d:['KeyP','Escape'],col:'#c8c8d8',ico:'Ⅱ'},
 {id:'note',g:'챕터 3 탐정',hide:1,n:'수첩 열기',c:'KeyN',d:['KeyN','Tab'],col:'#c8a0ff',ico:'✎'},
 {id:'hint',g:'챕터 3 탐정',hide:1,n:'힌트',c:'KeyH',d:['KeyH'],col:'#c8a0ff',ico:'?'},
 {id:'deduce',g:'챕터 3 탐정',hide:1,n:'추리하기',c:'KeyR',d:['KeyR'],col:'#c8a0ff',ico:'!'},
 {id:'present',g:'챕터 3 탐정',hide:1,n:'증거 제시',c:'KeyE',d:['KeyE','KeyQ'],col:'#c8a0ff',ico:'⎘'}];
const KB={cap:null,map:null,block:null,ver:0,pre:[]};
function kbPre(e){for(const f of KB.pre){try{if(f(e)){e.preventDefault();e.stopImmediatePropagation();return true}}catch(_){}}return false}
function kbGet(){let s=null;try{s=saveData.keys}catch(e){}const o={};for(const a of KB_ACT)o[a.id]=(s&&Array.isArray(s[a.id]))?s[a.id].slice(0,3):a.d.slice();return o}
function kbRebuild(){const b=kbGet(),map={},used=new Set(),defs=new Set();for(const a of KB_ACT){for(const d of a.d)defs.add(d);for(const p of b[a.id]){used.add(p);if(p!==a.c&&!a.d.includes(p))map[p]=a.c}}
 /* 기본 키 중 이제 아무 동작에도 안 쓰는 키는 전투 중에 막음 (Esc · Enter 는 항상 살려 둠) */const block=new Set();for(const d of defs)if(!used.has(d)&&!['Escape','Enter','KeyQ','KeyW','KeyE','KeyR'].includes(d))block.add(d);
 /* 정식 코드(c)가 다른 동작 키로 쓰이는 경우: 그 물리 키는 위 map 으로 옮겨짐. 정식 코드가 아무 데도 없으면 막기 */for(const a of KB_ACT)if(!used.has(a.c)&&!['KeyE','KeyR'].includes(a.c))block.add(a.c);
 KB.map=map;KB.block=block;KB.ver++}
function kbInGame(){try{return typeof mode!=='undefined'&&mode!=='menu'||document.body.classList.contains('inBattle')}catch(e){return false}}
function kbLabel(code){if(!code)return '';const M={ArrowUp:'↑',ArrowDown:'↓',ArrowLeft:'←',ArrowRight:'→',Space:'Space',ShiftLeft:'L-Shift',ShiftRight:'R-Shift',ControlLeft:'L-Ctrl',ControlRight:'R-Ctrl',AltLeft:'L-Alt',AltRight:'R-Alt',Enter:'Enter',Escape:'Esc',Tab:'Tab',Backspace:'⌫',CapsLock:'Caps',Semicolon:';',Quote:"'",Comma:',',Period:'.',Slash:'/',BracketLeft:'[',BracketRight:']',Backslash:'\\',Minus:'-',Equal:'=',Backquote:'`'};
 if(M[code])return M[code];if(/^Key[A-Z]$/.test(code))return code.slice(3);if(/^Digit\d$/.test(code))return code.slice(5);if(/^Numpad/.test(code))return 'Num'+code.slice(6);return code}
function kbKeysOf(id){return kbGet()[id]||[]}
(function(){const H=(e)=>{if(!e.isTrusted){kbPre(e);return}
  /* 키 입력 받기 모드 (설정 화면) */if(KB.cap&&e.type==='keydown'){e.preventDefault();e.stopImmediatePropagation();const cb=KB.cap;KB.cap=null;cb(e.code==='Escape'?null:e.code);return}
  if(KB.cap){e.preventDefault();e.stopImmediatePropagation();return}
  const tg=e.target&&e.target.tagName;if(tg==='INPUT'||tg==='TEXTAREA'||tg==='SELECT')return;
  if(!KB.map)kbRebuild();
  /* 약점 반격(Q W E R) 시간에는 원래 키 그대로 */try{if(/^Key[QWER]$/.test(e.code)&&typeof mode!=='undefined'&&mode==='boss'&&typeof G!=='undefined'&&G&&G.vuln)return}catch(_){}
  const to=KB.map[e.code];
  if(to){e.preventDefault();e.stopImmediatePropagation();const ev=new KeyboardEvent(e.type,{code:to,key:e.key,repeat:e.repeat,bubbles:true,cancelable:true,shiftKey:e.shiftKey,ctrlKey:e.ctrlKey,altKey:e.altKey,metaKey:e.metaKey});(e.target||document).dispatchEvent(ev);return}
  if(KB.block.has(e.code)&&kbInGame()){e.preventDefault();e.stopImmediatePropagation();return}
  kbPre(e)};
 addEventListener('keydown',H,true);addEventListener('keyup',H,true)})();

'use strict';
const $=id=>document.getElementById(id);
const cv=$('game'),ctx=cv.getContext('2d');ctx.imageSmoothingEnabled=false;
const W=480,H=300,TAU=Math.PI*2,U=5,HS=1.35,AX=16,AY=34,AW=448,AH=250,HOME={x:240,y:186};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),lerp=(a,b,t)=>a+(b-a)*t,RND=Math.random;
function rng(seed){let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
function hash(s){let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(RND()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const ease=p=>p*p*(3-2*p);

/* ================= 난이도 ================= */
const DIFF={easy:{name:'쉬움',bpm:.9,sp:.8,dn:.8,tel:2.5,hp:150,dm:.6,win:1.3,info:'느린 박자 · 예고가 길고 공격이 드묾 · 받는 피해 60% · 체력 150 · 기본 공격만'},
normal:{name:'보통',bpm:1.0,sp:1.05,dn:1.15,tel:1.65,hp:110,dm:1.0,win:1.0,info:'기본 박자 · 적당한 예고 · 받는 피해 100% · 체력 110 · 추가 공격 +3종'},
hard:{name:'어려움',bpm:1.1,sp:1.35,dn:1.6,tel:1.15,hp:90,dm:1.5,win:.78,info:'빠른 박자 · 짧은 예고 · 처음부터 2페이즈 공격 · 쉬는 틈 절반 · 받는 피해 150% · 보스 체력 130% · 추가 공격 +6종'},
extreme:{name:'익스트림',bpm:1.2,sp:1.65,dn:2.1,tel:.82,hp:70,dm:2.2,win:.6,info:'극한 박자 · 예고 거의 없음 · 처음부터 최종 페이즈 공격 · 쉬는 틈 없음 · 받는 피해 220% · 보스 체력 160% · 추가 공격 +10종'}};
let diff='normal';const D=()=>DIFF[diff];

