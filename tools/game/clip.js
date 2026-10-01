const { chromium } = require('./_pw');
(async()=>{const [file,dif]=process.argv.slice(2);const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
 const p=await (await b.newContext()).newPage();p.on('pageerror',e=>console.log('PAGEERR',e.message));
 await p.goto(require('./_pw').url(file));await p.waitForTimeout(1000);
 const r=await p.evaluate(d=>{document.getElementById('splash')?.remove();diff=d;const res={};
  const _mf=monFinish;monFinish=function(c,A){try{const M=monCv(),S=M.S,w=S.width,h=S.height,data=S.getContext('2d').getImageData(0,0,w,h).data,key=EXL.key||'?';const e=res[key]||(res[key]={L:0,R:0,T:0,B:0,ex:null});
    for(let y=0;y<h;y++){if(data[(y*w)*4+3]>40)e.L++;if(data[(y*w+w-1)*4+3]>40)e.R++}for(let x=0;x<w;x++){if(data[x*4+3]>40)e.T++;if(data[((h-1)*w+x)*4+3]>40)e.B++}}catch(err){}return _mf.apply(this,arguments)};
  const pats=[...new Set([...Object.keys(CHAN||{}),...Object.keys(MON.alias),...Object.values(MON.alias)])];
  const arts=[];for(let i=0;i<20;i++)arts.push(['b',i]);C3CASES.forEach(D=>arts.push(['a',D.boss.art]));S4.forEach(s=>arts.push(['a',s.art]));S5.forEach(s=>arts.push(['a',s.art]));
  const cv=document.createElement('canvas');cv.width=400;cv.height=300;const c=cv.getContext('2d');
  for(const [k,v] of arts){for(let t=0;t<6000;t+=700){const base={pulse:(t%1400)/1400,expose:t%2100<700,open:(t%2800)/2800,eye:(t%1400)/1400,dorm:false,flash:false,warn:(t%2100)/2100};
     const draw=o=>{if(k==='b')drawMech(c,BOSSES[v],200,250,t,o,3);else c3ArtOn(c,v,200,250,t,3,o)};draw(base);
     if(t===0)for(const n of pats)for(const e of [.6,1.3,1.6])draw(Object.assign({},base,{__pat:{n,chan:CHAN[n]||'',e}}))}}
  return res},dif);
 const bad=Object.entries(r).filter(([k,e])=>e.L+e.R+e.T+e.B>0);console.log(dif,'checked',Object.keys(r).length,'clipped',bad.length);bad.forEach(([k,e])=>console.log(k,JSON.stringify(e)));await b.close()})();
