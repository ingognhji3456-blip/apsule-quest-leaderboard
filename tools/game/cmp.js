const { chromium } = require('./_pw');
// node cmp.js out.png diff idxlist fileA fileB ...
(async()=>{const [out,dif,list,...files]=process.argv.slice(2);const idx=list.split(',').map(Number);const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
 const rows=[];for(const f of files){const p=await (await b.newContext({viewport:{width:1200,height:900}})).newPage();p.on('pageerror',e=>console.log('PAGEERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CERR',m.text())});
  await p.goto(require('./_pw').url(f));await p.waitForTimeout(1000);
  rows.push(await p.evaluate(([d,idx])=>{document.getElementById('splash')?.remove();diff=d;const arts=[];for(let i=0;i<20;i++)arts.push(['b',i]);C3CASES.forEach(D=>arts.push(['a',D.boss.art]));S4.forEach(s=>arts.push(['a',s.art]));S5.forEach(s=>arts.push(['a',s.art]));
   const CW=420,CH=380,cv=document.createElement('canvas');cv.width=CW*idx.length;cv.height=CH;const c=cv.getContext('2d');c.imageSmoothingEnabled=false;
   idx.forEach((i,j)=>{const [k,v]=arts[i];c.fillStyle='#1d252c';c.fillRect(j*CW,0,CW,CH);const x=j*CW+CW/2,y=CH-28;try{if(k==='b')drawMech(c,BOSSES[v],x,y,1234567,{pulse:0,expose:false,open:0,eye:0,dorm:false,flash:false,warn:0},8);else c3ArtOn(c,v,x,y,1234567,8,{})}catch(e){console.error(e.message)}});return cv.toDataURL()},[dif,idx]));await p.close()}
 const p=await (await b.newContext()).newPage();const u=await p.evaluate(async rows=>{const ims=await Promise.all(rows.map(r=>new Promise(res=>{const i=new Image();i.onload=()=>res(i);i.src=r})));const cv=document.createElement('canvas');cv.width=ims[0].width;cv.height=ims.reduce((s,i)=>s+i.height,0);const c=cv.getContext('2d');let y=0;for(const i of ims){c.drawImage(i,0,y);y+=i.height}return cv.toDataURL()},rows);
 require('fs').writeFileSync(out,Buffer.from(u.split(',')[1],'base64'));await b.close()})();
