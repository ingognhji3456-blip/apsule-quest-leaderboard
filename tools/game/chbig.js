const { chromium } = require('./_pw');
// node chbig.js out file1 [file2]  -> rows per file, 10 chars at 8x native
(async()=>{const [out,...files]=process.argv.slice(2);const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const rows=[];
 for(const f of files){const p=await (await b.newContext()).newPage();p.on('pageerror',e=>console.log('PAGEERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CERR',m.text())});await p.addInitScript(r=>{window.__R=r},JSON.parse(process.env.R||"[0,10]"));await p.goto(require('./_pw').url(f));await p.waitForTimeout(900);
  rows.push(await p.evaluate(()=>{document.getElementById('splash')?.remove();const R=window.__R||[0,10],S=8,cv=document.createElement("canvas");cv.width=40*S*(R[1]-R[0]);cv.height=48*S;const c=cv.getContext('2d');c.imageSmoothingEnabled=false;c.fillStyle='#2a333c';c.fillRect(0,0,cv.width,cv.height);
   for(let i=R[0];i<R[1];i++){const o=ch2Render(i,0,0,false,1.3);c.drawImage(o,(i-R[0])*40*S,0,40*S,48*S)}return cv.toDataURL()}));await p.close()}
 const p=await (await b.newContext()).newPage();const u=await p.evaluate(async rows=>{const ims=await Promise.all(rows.map(r=>new Promise(res=>{const i=new Image();i.onload=()=>res(i);i.src=r})));const cv=document.createElement('canvas');cv.width=ims[0].width;cv.height=ims.reduce((s,i)=>s+i.height,0);const c=cv.getContext('2d');let y=0;for(const i of ims){c.drawImage(i,0,y);y+=i.height}return cv.toDataURL()},rows);
 require('fs').writeFileSync(out,Buffer.from(u.split(',')[1],'base64'));await b.close()})();
