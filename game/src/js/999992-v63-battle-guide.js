/* ================= v63 첫 전투 가이드 (GUIDE63) =================
   처음 하는 사람에게 첫 보스 전투에서 조작을 하나씩 알려 준다.
   이동 → 대시 → 공격 → 패링 → 그로기 → 반격 → 궁극기. 해 보면 다음 단계로 넘어간다.
   - 화면 위쪽 카드(HTML)에 지금 할 일과 실제 키(설정에서 바꾼 키)를 보여 준다. 폰에서는 버튼 이름.
   - 가이드 중에는 받는 피해를 절반으로 줄인다. 「건너뛰기」로 언제든 끌 수 있다.
   - 진행은 saveData.tut63 에 저장(전투를 나가도 다음 전투에서 이어서). 끝나면 다시 나오지 않는다.
   - HOW TO PLAY 화면의 「▶ 전투 가이드 다시 보기」로 처음부터 다시 볼 수 있다. */
(()=>{try{
 const STEPS=[
  {id:'move',t:'이동',keys:['up','left','down','right'],mob:'왼쪽 스틱',d:'걸어서 움직여 봐요. 바닥에 빨갛게 예고되는 곳을 피해요.'},
  {id:'dash',t:'대시',keys:['dash'],mob:'DASH 버튼',d:'순간적으로 빠르게 움직여요. 대시하는 순간에는 맞지 않아요.'},
  {id:'atk',t:'공격',keys:['atk'],mob:'ATTACK 버튼',d:'보스 가까이 가서 두 번 베어 봐요.'},
  {id:'parry',t:'패링',keys:['parry'],mob:'🛡 버튼',d:'맞기 직전에 막아요. 박자에 맞추면 PERFECT — 반사탄이 보스를 때려요. 한 번 눌러 봐요!'},
  {id:'grogi',t:'그로기',keys:['atk'],mob:'ATTACK 버튼',d:'보스가 쏘는 금빛 조각을 공격으로 되받아치거나, 저스트 회피 · 패링을 하면 그로기 게이지가 차요.'},
  {id:'counter',t:'반격',keys:[],extra:'원에 적힌 키 · 원 클릭',mob:'원 터치',d:'그로기가 되면 반격 시간! 나타나는 원에 적힌 키를 눌러 크게 때려요.',wait:'그로기 게이지를 가득 채우면 반격 시간이 와요'},
  {id:'ult',t:'궁극기',keys:['ult'],mob:'궁 버튼',d:'궁극기 게이지(왼쪽 아래)가 가득 차면 발동! 검마다 궁극기가 달라요.',wait:'궁극기 게이지를 채워요 — 반격 · 되받아치기 · 패링으로 차요'}];
 const S=()=>{try{return saveData.tut63||(saveData.tut63={i:0})}catch(e){return {i:0}}};
 /* 이미 보스를 깬 적이 있는 사람은 가이드를 끝낸 것으로 본다 */
 try{if(!saveData.tut63&&saveData.clear&&Object.keys(saveData.clear).length)saveData.tut63={i:STEPS.length,done:1,auto:1}}catch(e){}
 const save=()=>{try{saveNow()}catch(e){}};
 const touch=()=>{try{return isTouchUI()}catch(e){return false}};
 const keyCaps=ids=>{const out=[];try{const b=kbGet();for(const id of ids)for(const k of (b[id]||[]).slice(0,ids.length>1?1:2))out.push(k)}catch(e){}return out.slice(0,4)};
 const lab=k=>{try{return kbLabel(k)}catch(e){return k}};

 /* ---------- 카드 ---------- */
 const st=document.createElement('style');st.textContent=`
 #tut63{position:fixed;left:12px;top:64px;z-index:9000;width:min(330px,calc(100vw - 24px));display:none;pointer-events:none;
  font-family:inherit;color:#eef4ff;filter:drop-shadow(0 8px 24px #000a)}
 #tut63 .tc{position:relative;border-radius:14px;padding:10px 14px 11px;background:linear-gradient(180deg,#121a2cf2,#0a0f1cf2);border:1px solid #ffffff26;box-shadow:inset 0 1px 0 #ffffff14;overflow:hidden}
 #tut63 .tc:before{content:'';position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(180deg,#ffe36b,#ff7ad9)}
 #tut63 .tt{display:flex;align-items:center;gap:8px;font-weight:900;font-size:15px;letter-spacing:.04em}
 #tut63 .tt span,#tut63 .sk{white-space:nowrap}#tut63 .tt{font-size:14px}
 #tut63 .no{flex:none;font:900 11px monospace;color:#0a0d14;background:#ffe36b;border-radius:99px;padding:2px 8px}
 #tut63 .sp{flex:1}
 #tut63 .sk{pointer-events:auto;font:inherit;font-size:11px;font-weight:800;color:#9fb0c8;background:#ffffff10;border:1px solid #ffffff26;border-radius:8px;padding:3px 8px;cursor:pointer}
 #tut63 .kk{display:flex;flex-wrap:wrap;gap:5px;align-items:center;margin:7px 0 4px;min-height:26px}
 #tut63 kbd{display:inline-grid;place-items:center;min-width:26px;height:24px;padding:0 7px;border-radius:6px;font:900 12px/1 inherit;color:#0a0d14;background:linear-gradient(180deg,#fff,#cdd6e2);box-shadow:0 3px 0 #6a7a90,0 3px 0 1px #05080a}
 #tut63 .ex{font-size:12px;font-weight:800;color:#ffe79a}
 #tut63 .d{font-size:13px;line-height:1.5;color:#d6e4ea}
 #tut63 .w{font-size:12px;color:#ffd166;margin-top:4px}
 #tut63 .dots{display:flex;gap:4px;margin-top:7px}#tut63 .dots i{flex:1;height:3px;border-radius:2px;background:#ffffff1f}#tut63 .dots i.on{background:#7dffb0}#tut63 .dots i.cur{background:#ffe36b}
 #tut63.ok .tc{border-color:#7dffb0;box-shadow:0 0 0 2px #7dffb055,inset 0 1px 0 #ffffff14}
 #tut63 .ck{position:absolute;right:12px;bottom:8px;font-size:22px;color:#7dffb0;opacity:0;transform:scale(.6);transition:.18s}
 #tut63.ok .ck{opacity:1;transform:scale(1)}
 #tut63 .d{font-size:12.5px}
 @media (max-height:520px){#tut63 .tc{padding:7px 10px 8px}#tut63 .tt{font-size:12px;gap:6px}#tut63 .no{font-size:10px;padding:1px 6px}#tut63 .sk{font-size:10px;padding:2px 6px}#tut63 .kk{margin:4px 0 2px;min-height:20px}#tut63 kbd{height:20px;min-width:22px;font-size:11px}#tut63 .ex{font-size:11px}#tut63 .d{font-size:11px;line-height:1.4}#tut63 .w{font-size:10.5px}}`;
 document.head.appendChild(st);
 const box=document.createElement('div');box.id='tut63';box.innerHTML='<div class="tc"></div>';document.body.appendChild(box);
 let shownI=-1,shownWait=null,okUntil=0;
 function render(i,waiting){const s=STEPS[i];if(!s)return;const ks=keyCaps(s.keys);
  const keyHtml=touch()?'<span class="ex">'+s.mob+'</span>':(ks.map(k=>'<kbd>'+lab(k)+'</kbd>').join('')+(s.extra?'<span class="ex">'+(ks.length?' · ':'')+s.extra+'</span>':''));
  box.querySelector('.tc').innerHTML='<div class="tt"><span class="no">'+(i+1)+' / '+STEPS.length+'</span><span>가이드 · '+s.t+'</span><span class="sp"></span><button class="sk">건너뛰기</button></div>'+
   '<div class="kk">'+keyHtml+'</div><div class="d">'+s.d+'</div>'+(waiting&&s.wait?'<div class="w">⏳ '+s.wait+'</div>':'')+
   '<div class="dots">'+STEPS.map((_,j)=>'<i class="'+(j<i?'on':j===i?'cur':'')+'"></i>').join('')+'</div><span class="ck">✓</span>';
  box.querySelector('.sk').onclick=e=>{e.stopPropagation();finish(true)};shownI=i;shownWait=waiting}
 /* 경기장 왼쪽 빈 곳에 붙임 (보스 체력바 · 보스 · 내 체력 칸을 가리지 않게) */
 function place(){try{const g=document.getElementById('game');if(!g)return;const r=g.getBoundingClientRect(),w=Math.max(210,Math.min(330,r.width*.3));box.style.width=w+'px';box.style.left=Math.max(6,r.left+r.width*.035)+'px';box.style.top=Math.max(6,r.top+r.height*.2)+'px'}catch(e){}}
 function finish(skip){const s=S();s.done=1;s.i=STEPS.length;save();box.style.display='none';
  try{if(!skip){banner('전투 가이드 끝! 이제 마음껏 싸워 봐요');sfx(784,.3,'triangle',.05,1568)}}catch(e){}}

 /* ---------- 해 봤는지 알아보기 ---------- */
 let cur=null;   /* 이번 단계의 기준값 */
 let atkN=0;
 {const base=doAttack;doAttack=function(){try{if(mode==='boss'&&G&&G.state==='play'&&!G.cine)atkN++}catch(e){}return base.apply(this,arguments)}}
 function begin(i){cur={i,t:performance.now(),x:P.x,y:P.y,atk:atkN,stag:(G.puz&&G.puz.stag)||0,vulnHp:null,used:false}}
 function check(i){const s=STEPS[i],now=performance.now();
  switch(s.id){
   case 'move':return Math.hypot(P.x-cur.x,P.y-cur.y)>36;
   case 'dash':return !!(P.dash&&P.dash.t0>cur.t);
   case 'atk':return atkN-cur.atk>=2;
   case 'parry':return (P.parryT||0)>cur.t;
   case 'grogi':return !!G.vuln&&!G.vuln.fake||((G.puz&&G.puz.stag)||0)>cur.stag+4;
   case 'counter':{if(!G.vuln||G.vuln.fake)return false;if(cur.vulnHp==null){cur.vulnHp=G.hp;return false}return G.hp<cur.vulnHp-1}
   case 'ult':return !!G.sp}
  return false}
 const waiting=i=>{const s=STEPS[i];if(s.id==='counter')return !G.vuln||G.vuln.fake;if(s.id==='ult')return (G.ult||0)<100;return false};

 /* 가이드 중에는 피해 절반 */
 if(typeof hurtP==='function'){const base=hurtP;hurtP=function(dmg,now){try{if(active())dmg=dmg*.5}catch(e){}return base.call(this,dmg,now)}}
 const active=()=>{const s=S();return !s.done&&mode==='boss'&&G&&G.state==='play'};

 function tick(){const s=S();
  if(s.done||mode!=='boss'||!G||G.state!=='play'||G.cine||paused){if(box.style.display!=='none'&&performance.now()>okUntil)box.style.display='none';if(mode!=='boss')cur=null;return}
  const i=Math.min(s.i||0,STEPS.length-1);
  if(!cur||cur.i!==i)begin(i);
  const w=waiting(i);if(box.style.display==='none')box.style.display='block';place();if(shownI!==i||shownWait!==w)render(i,w);
  if(performance.now()<okUntil)return;
  if(box.classList.contains('ok'))box.classList.remove('ok');
  if(check(i)){box.classList.add('ok');okUntil=performance.now()+700;try{sfx(1046,.12,'triangle',.04,1568)}catch(e){}
   setTimeout(()=>{const s2=S();s2.i=i+1;save();if(s2.i>=STEPS.length)finish(false);cur=null},650)}}
 {const base=drawScene;drawScene=function(now){const r=base.apply(this,arguments);try{tick()}catch(e){}return r}}

 /* HOW TO PLAY 화면에 「전투 가이드 다시 보기」 */
 function mountReplay(){const tabs=document.getElementById('h2Tabs'),ks=document.getElementById('h2Keyset');if(!tabs||!ks||document.getElementById('tutReplay63'))return;
  const b=document.createElement('button');b.className='h2go';b.id='tutReplay63';b.textContent='▶ 전투 가이드 다시 보기';
  b.onclick=()=>{saveData.tut63={i:0};save();shownI=-1;try{gmSfx('ok')}catch(e){}b.textContent='✓ 다음 전투에서 가이드가 나와요'};tabs.insertBefore(b,ks)}
 if(typeof gmShow==='function'){const base=gmShow;gmShow=function(){const r=base.apply(this,arguments);try{setTimeout(mountReplay,0)}catch(e){}return r}}

 window.GUIDE63={STEPS,reset(){saveData.tut63={i:0};save()},state:S};
}catch(e){console.error('v63 guide',e)}})();
