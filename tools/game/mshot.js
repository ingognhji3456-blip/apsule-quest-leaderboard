const { chromium } = require('./_pw');
(async()=>{const [file,out]=process.argv.slice(2);
 const VPS={desk:{viewport:{width:1280,height:800}},land:{viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true},port:{viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true}};
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
 for(const [vn,VP] of Object.entries(VPS)){const p=await (await b.newContext(VP)).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message+' @'+(e.stack||'').split('\n').slice(1,4).join(' | ')));
 await p.goto(require('./_pw').url(file));await p.waitForTimeout(1000);
 await p.evaluate(()=>{document.getElementById('splash')?.remove();saveData.coins=5000;saveData.chapter=12});
 for(const s of ['story','rush','shop','hall','set','help']){await p.evaluate(s=>gmShow(s),s);await p.waitForTimeout(900);await p.screenshot({path:`${out}-${vn}-${s}.png`})}
 console.log(vn,errs);await p.close()}
 await b.close()})();
