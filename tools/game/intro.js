const { chromium } = require('./_pw');
// node intro.js file out boss diff
(async()=>{const [file,out,boss,dif]=process.argv.slice(2);const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
 const p=await (await b.newContext({viewport:{width:960,height:640}})).newPage();p.on('pageerror',e=>console.log('PAGEERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CERR',m.text())});
 await p.goto(require('./_pw').url(file));await p.waitForTimeout(1000);
 await p.evaluate(([d,i])=>{document.getElementById('splash')?.remove();diff=d;saveData.done=true;saveData.ch4={ci:10,best:{9:'A'}};setInterval(()=>{if(dlg.active)dlgAdvance()},300);
  i=+i;if(i<20)startRush(i);else if(i<30)c3RushFight(i-20);else if(i<40)s4RushFight(i-30);else if(i<50)s5Fight(i-40,true,true);else if(i<60)s6Fight(i-50);else s7Fight(i-60)},[dif,boss]);
 const box=await p.evaluate(()=>{const r=$('arena').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}});
 const shots=[];const t0=Date.now();for(let k=0;k<16;k++){const tgt=t0+150+k*450;const w=tgt-Date.now();if(w>0)await p.waitForTimeout(w);shots.push((await p.screenshot({clip:box})).toString('base64'))}
 console.log(await p.evaluate(()=>JSON.stringify({cine:G.cine&&G.cine.type,dur:G.cine&&G.cine.dur,state:G.state})));
 const u=await p.evaluate(async s=>{const ims=await Promise.all(s.map(x=>new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src='data:image/png;base64,'+x})));const w=ims[0].width/2,h=ims[0].height/2,cols=4,cv=document.createElement('canvas');cv.width=w*cols;cv.height=h*Math.ceil(ims.length/cols);const c=cv.getContext('2d');ims.forEach((im,i)=>c.drawImage(im,(i%cols)*w,Math.floor(i/cols)*h,w,h));return cv.toDataURL()},shots);
 require('fs').writeFileSync(out,Buffer.from(u.split(',')[1],'base64'));await b.close()})();
