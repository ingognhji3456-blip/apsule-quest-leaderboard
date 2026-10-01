/* ================= 입력 이벤트 ================= */
addEventListener('keydown',e=>{
if(dlg.active&&(e.code==='Space'||e.code==='Enter'||e.code==='KeyZ'||e.code==='KeyJ')){e.preventDefault();if(!e.repeat)dlgAdvance();return}
if(mode==='menu')return;
if(e.code==='Escape'||e.code==='KeyP'){e.preventDefault();pause();return}
if(paused)return;if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();
if(e.code==='Space'||e.code==='KeyJ'||e.code==='KeyZ'){if(!e.repeat)doAttack();return}
if(e.code==='ShiftLeft'||e.code==='ShiftRight'||e.code==='KeyK'||e.code==='KeyX'){if(!e.repeat)doDash();return}
K.add(e.code)});
addEventListener('keyup',e=>K.delete(e.code));addEventListener('blur',()=>{K.clear();if(mode!=='menu'&&!paused)pause()});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&mode!=='menu'&&!paused)pause()});
$('pauseBtn').onclick=pause;$('dlg').addEventListener('pointerdown',e=>{e.preventDefault();dlgAdvance()});
$('fsBtn').onclick=()=>{const v=$('battleView');if(v.requestFullscreen){try{const r=v.requestFullscreen();if(r&&r.catch)r.catch(()=>{})}catch(e){}}fitBattle()};
addEventListener('pointerdown',e=>{if(e.pointerType==='touch')document.body.classList.add('touch')},{passive:true});
if(typeof matchMedia==='function'&&matchMedia('(pointer:coarse)').matches)document.body.classList.add('touch');
const sz=$('stickZone'),sb=$('stickBase'),kn=$('stickKnob');let sid=null,so=null;
sz.addEventListener('pointerdown',e=>{if(dlg.active){dlgAdvance();return}if(sid!==null)return;e.preventDefault();sid=e.pointerId;so={x:e.clientX,y:e.clientY};try{sz.setPointerCapture(sid)}catch(_){}sb.hidden=false;sb.style.left=so.x+'px';sb.style.top=so.y+'px';kn.style.transform='translate(0,0)'});
sz.addEventListener('pointermove',e=>{if(e.pointerId!==sid)return;const dx=e.clientX-so.x,dy=e.clientY-so.y,l=Math.hypot(dx,dy)||1,m=Math.min(1,l/46);stick.x=l>9?dx/l*m:0;stick.y=l>9?dy/l*m:0;kn.style.transform='translate('+(dx/l*Math.min(l,46))+'px,'+(dy/l*Math.min(l,46))+'px)'});
const endS=e=>{if(e.pointerId!==sid)return;sid=null;stick.x=stick.y=0;sb.hidden=true};sz.addEventListener('pointerup',endS);sz.addEventListener('pointercancel',endS);
$('btnA').addEventListener('pointerdown',e=>{e.preventDefault();doAttack()});$('btnD').addEventListener('pointerdown',e=>{e.preventDefault();doDash()});



/* Arena action retained: musical attack phrases, then a safe counter window. */





