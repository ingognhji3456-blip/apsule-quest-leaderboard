const { chromium } = require('./_pw');
// node strip.js file out boss diff waitMs n intervalMs
(async()=>{const [file,out,boss,dif,wait,n,iv]=process.argv.slice(2);const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
 const p=await (await b.newContext({viewport:{width:960,height:640}})).newPage();p.on('pageerror',e=>console.log('PAGEERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CERR',m.text())});
 await p.goto(require('./_pw').url(file));await p.waitForTimeout(1000);
 await p.evaluate(([d,i])=>{document.getElementById('splash')?.remove();diff=d;saveData.done=true;saveData.ch4={ci:10,best:{9:'A'}};setInterval(()=>{if(dlg.active)dlgAdvance();P.hp=P.maxhp;if(Math.random()<.5)doAttack()},200);
  i=+i;if(i<20)startRush(i);else if(i<30)c3RushFight(i-20);else if(i<40)s4RushFight(i-30);else if(i<50)s5Fight(i-40,true,true);else s6Fight(i-50)},[dif,boss]);
 await p.waitForTimeout(+wait);const shots=[];const box=await p.evaluate(()=>{const r=$('arena').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}});
 for(let k=0;k<+n;k++){shots.push((await p.screenshot({clip:box})).toString('base64'));await p.waitForTimeout(+iv)}
 const u=await p.evaluate(async s=>{const ims=await Promise.all(s.map(x=>new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src='data:image/png;base64,'+x})));const w=ims[0].width/2,h=ims[0].height/2,cols=4,cv=document.createElement('canvas');cv.width=w*cols;cv.height=h*Math.ceil(ims.length/cols);const c=cv.getContext('2d');ims.forEach((im,i)=>c.drawImage(im,(i%cols)*w,Math.floor(i/cols)*h,w,h));return cv.toDataURL()},shots);
 require('fs').writeFileSync(out,Buffer.from(u.split(',')[1],'base64'));await b.close()})();
