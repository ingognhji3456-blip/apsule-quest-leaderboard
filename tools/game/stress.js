const { chromium } = require('./_pw');
// usage: node stress.js file diff secsPerBoss from to
(async()=>{
 const [file,dif,secs,from,to]=[process.argv[2],process.argv[3]||'normal',+(process.argv[4]||8),+(process.argv[5]||0),+(process.argv[6]||49)];
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--autoplay-policy=no-user-gesture-required']});
 const ctx=await b.newContext({viewport:{width:1280,height:800}});
 const p=await ctx.newPage(); let errs=[];
 p.on('pageerror',e=>errs.push('PAGEERR '+e.message+' @'+(e.stack||'').split('\n').slice(1,3).join(' | ')));
 p.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE '+m.text().slice(0,300))});
 await p.addInitScript(d=>{try{localStorage.setItem('beatmachina-diff',d)}catch(e){}},dif);
 await p.goto(require('./_pw').url(file)); await p.waitForTimeout(1200);
 await p.evaluate(d=>{const s=document.getElementById('splash');if(s)s.remove();diff=d;
  // unlock everything
  saveData.chapter=40;saveData.done=true;saveData.ch4=saveData.ch4||{ci:10,best:{}};saveData.ch4.ci=10;saveData.ch4.best={9:'A'};
  window.__bot=setInterval(()=>{try{
   if(typeof dlg!=='undefined'&&dlg.active){dlgAdvance();return}
   if(typeof SCN!=='undefined'&&mode==='scene'){try{sceneNext&&sceneNext()}catch(e){}}
   P.hp=P.maxhp; // invincible-ish
   const dirs=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'];K.clear();K.add(dirs[(Math.random()*4)|0]);
   if(Math.random()<.4)doAttack(); if(Math.random()<.1)doDash();
   if(G&&G.clickTarget&&G.clickTarget.key){window.dispatchEvent(new KeyboardEvent('keydown',{code:'Key'+G.clickTarget.key,key:G.clickTarget.key.toLowerCase()}))}
   if(Math.random()<.2)window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyF',key:'f'}));
   if(G&&G.state==='play'&&G.hp>1&&Math.random()<.08)G.hp=Math.max(1,G.hp-G.maxHp*.03);
  }catch(e){window.__botErr=(window.__botErr||0)+1;window.__lastBotErr=String(e)}},120)},dif);
 const res=[];
 for(let i=from;i<=to;i++){
  errs=[];
  await p.evaluate(i=>{try{$('overlay').hidden=true;if(i<20)startRush(i);else if(i<30)c3RushFight(i-20);else if(i<40)s4RushFight(i-30);else s5Fight(i-40,true,true)}catch(e){console.error('START '+e.message)}
   window.__ft=[];let last=performance.now();const f=()=>{const n=performance.now();window.__ft.push(n-last);last=n;window.__raf=requestAnimationFrame(f)};cancelAnimationFrame(window.__raf);f()},i);
  await p.waitForTimeout(secs*1000);
  const st=await p.evaluate(()=>{const ft=window.__ft.slice(10).sort((a,b)=>a-b);return {state:G&&G.state,phase:G&&G.phase,hp:G&&Math.round(G.hp/G.maxHp*100),p50:ft[ft.length>>1]|0,p95:ft[Math.floor(ft.length*.95)]|0,max:ft[ft.length-1]|0,shots:(G&&G.shots||[]).length,boss:$('bossName').textContent,botErr:window.__botErr||0,lastBotErr:window.__lastBotErr||''}});
  console.log(i,JSON.stringify(st)); const u=[...new Set(errs)]; if(u.length)console.log('   ERR x'+errs.length+': '+u.slice(0,4).join('\n   '));
  await p.evaluate(()=>{try{toLobby()}catch(e){console.error('LOBBY '+e.message)}});await p.waitForTimeout(300);
 }
 await b.close();
})();
