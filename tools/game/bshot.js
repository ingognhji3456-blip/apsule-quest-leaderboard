const { chromium } = require('./_pw');
(async()=>{const [file,out,dif,list,vpn]=process.argv.slice(2);
 const VP={desk:{viewport:{width:1280,height:800}},land:{viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true},port:{viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true}}[vpn||'desk'];
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
 const p=await (await b.newContext(VP)).newPage();p.on('pageerror',e=>console.log('PAGEERR',e.message));
 await p.goto(require('./_pw').url(file));await p.waitForTimeout(1000);
 await p.evaluate(d=>{document.getElementById('splash')?.remove();diff=d;saveData.done=true;saveData.ch4={ci:10,best:{9:'A'}};setInterval(()=>{if(dlg.active)dlgAdvance();P.hp=P.maxhp;if(Math.random()<.3)doAttack()},250)},dif);
 for(const i of list.split(',').map(Number)){await p.evaluate(i=>{$('overlay').hidden=true;if(i<20)startRush(i);else if(i<30)c3RushFight(i-20);else if(i<40)s4RushFight(i-30);else if(i<50)s5Fight(i-40,true,true);else if(i<60)s6Fight(i-50);else s7Fight(i-60)},i);
  await p.waitForTimeout(6500);await p.screenshot({path:`${out}-${vpn||'desk'}-${dif}-${i}.png`});await p.evaluate(()=>toLobby());await p.waitForTimeout(300)}
 await b.close()})();
