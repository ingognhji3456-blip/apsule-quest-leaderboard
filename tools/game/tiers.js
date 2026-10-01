const { chromium } = require('./_pw');
(async()=>{const [file,out,list]=process.argv.slice(2);const idx=list.split(',').map(Number);const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
 const p=await (await b.newContext()).newPage();p.on('pageerror',e=>console.log('PAGEERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CERR',m.text())});
 await p.goto(require('./_pw').url(file));await p.waitForTimeout(1000);
 const u=await p.evaluate(idx=>{document.getElementById('splash')?.remove();const arts=[];for(let i=0;i<20;i++)arts.push(['b',i]);C3CASES.forEach(D=>arts.push(['a',D.boss.art]));S4.forEach(s=>arts.push(['a',s.art]));S5.forEach(s=>arts.push(['a',s.art]));
  const CW=330,CH=300,cv=document.createElement('canvas');cv.width=CW*4;cv.height=CH*idx.length;const c=cv.getContext('2d');c.imageSmoothingEnabled=false;
  idx.forEach((i,r)=>['easy','normal','hard','extreme'].forEach((d,j)=>{diff=d;const [k,v]=arts[i];c.fillStyle=(r+j)%2?'#1d252c':'#182026';c.fillRect(j*CW,r*CH,CW,CH);const x=j*CW+CW/2,y=r*CH+CH-24;try{if(k==='b')drawMech(c,BOSSES[v],x,y,1234567,{pulse:0,expose:false,open:0,eye:0,dorm:false,flash:false,warn:0},5.5);else c3ArtOn(c,v,x,y,1234567,5.5,{})}catch(e){console.error(e.message)}c.fillStyle='#fff';c.font='16px sans-serif';c.fillText(d,j*CW+6,r*CH+18)}));return cv.toDataURL()},idx);
 require('fs').writeFileSync(out,Buffer.from(u.split(',')[1],'base64'));await b.close()})();
