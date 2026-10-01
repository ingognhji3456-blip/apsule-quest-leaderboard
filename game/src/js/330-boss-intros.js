/* ================= 보스별 등장 연출 (컨셉 맞춤 · 간지) ================= */
const ENT_KIND=['rise','bolt','pour','charge','freeze','assemble','drop','clock','eyes','heart','rise','spore','rise','assemble','drop','drop','freeze','rise','assemble','heart'];
const ENT_SUB=['gear','','','','','drone','crane','','','omega','root','','bog','bone','silk','wasp','crystal','abyss','ash','hunger'];
const eOut=k=>1-Math.pow(1-clamp(k,0,1),3),eIn=k=>Math.pow(clamp(k,0,1),2),seg=(t,a,b)=>clamp((t-a)/(b-a),0,1);
function entStart(now){const bi=G.bi;try{arenaCanvas(bi)}catch(e){}now=performance.now();if(G.cine)G.cine.t0=now;G.ent={bi,kind:ENT_KIND[bi],sub:ENT_SUB[bi],t0:now,fired:{},parts:[],hideHands:true};G.boss.dorm=false;G.cine.dur=5600;
 const g=bgeo(),n=G.ent.kind==='assemble'?60:0;for(let i=0;i<n;i++){const a=RND()*TAU,r=260+RND()*120;G.ent.parts.push({sx:g.x+Math.cos(a)*r,sy:g.coreY+Math.sin(a)*r*.7,tx:g.x+(RND()-.5)*g.hf*U*1.8,ty:g.top+RND()*(g.y-g.top),d:RND()*500,s:2+Math.floor(RND()*3)})}}
function entFire(key,t,at,fn){const e=G.ent;if(!e.fired[key]&&t>=at){e.fired[key]=1;fn()}}
function entBoom(g,col,big){G.shake=Math.max(G.shake,big?1.1:.7);G.flash=Math.max(G.flash,big?.7:.4);G.hitstop=performance.now()+(big?160:80);const now=performance.now();fxRing(g.x,g.y-6,now,700,big?220:150,'#ffffff');fxRing(g.x,g.coreY,now+80,900,big?280:190,col);for(let i=0;i<(big?40:24);i++)G.parts.push({x:g.x+(RND()-.5)*g.hf*U*2,y:g.y-4,vx:(RND()-.5)*300,vy:-RND()*220,life:1,max:1,col:i%2?G.B.pal[2]:'#ffffff',s:3});sfx(55,1.2,'sawtooth',.1,25);sfx(110,.5,'square',.06,40);if(typeof perc==='function'&&audio){perc('taiko',audio.currentTime,1.2);perc('crash',audio.currentTime,1)}}
/* 매 프레임: 보스 위치/투명도 결정 + 효과음 타이밍 */
function entTick(now){const e=G.ent;if(!e||!G.cine||G.cine.type!=='intro'){if(e&&!G.cine){G.ent=null;G.boss.x=HOME.x;G.boss.y=HOME.y}return}
 const t=now-e.t0,b=G.boss;let dx=0,dy=0,al=1,sil=false;const g0=geo(G.B,HOME.x,HOME.y),hgt=g0.y-g0.top+30;
 switch(e.kind){
 case 'rise':{const k=eOut(seg(t,500,2100));dy=(1-k)*hgt;entFire('rumble',t,0,()=>{sfx(40,2,'sawtooth',.06,30)});entFire('land',t,2100,()=>entBoom(g0,G.B.c,true));if(t<2100)G.shake=Math.max(G.shake,.25);break}
 case 'drop':{if(e.sub==='silk'){const k=eOut(seg(t,300,2200));dy=-(1-k)*300;dx=Math.sin(t/260)*10*(1-k);entFire('land',t,2200,()=>entBoom(g0,G.B.c,false))}
  else if(e.sub==='wasp'){const k=eIn(seg(t,1100,1500));dy=-(1-k)*340;dx=(1-k)*120;entFire('buzz',t,300,()=>{sfx(180,1.2,'sawtooth',.04,220)});entFire('land',t,1500,()=>entBoom(g0,G.B.c,true))}
  else{const k=eIn(seg(t,500,1600));dy=-(1-k)*320;entFire('clang',t,1600,()=>{entBoom(g0,G.B.c,true);sfx(880,.6,'square',.05,440)})}break}
 case 'charge':{const k=eOut(seg(t,300,1500));dx=(1-k)*460;entFire('whistle',t,100,()=>{if(typeof perc==='function'&&audio)perc('whistle',audio.currentTime,1.2,700)});entFire('skid',t,1300,()=>{sfx(1400,.7,'sawtooth',.03,300)});entFire('land',t,1550,()=>entBoom(g0,G.B.c,false));if(t>300&&t<1500)G.shake=Math.max(G.shake,.35);break}
 case 'bolt':{al=t<700?0:t<2000?(Math.floor(t/60)%3===0?1:.15):1;[700,1150,1600].forEach((a,i)=>entFire('b'+i,t,a,()=>{G.flash=Math.max(G.flash,.8);G.shake=Math.max(G.shake,.6);sfx(90,.5,'sawtooth',.08,40);sfx(2400,.2,'square',.03,200)}));entFire('land',t,2100,()=>entBoom(g0,G.B.c,false));break}
 case 'pour':{al=seg(t,900,2100);entFire('hiss',t,300,()=>{sfx(300,1.5,'sawtooth',.03,120)});entFire('land',t,2100,()=>entBoom(g0,'#ff7a2a',true));break}
 case 'freeze':{al=t<1700?0:1;entFire('crack',t,1200,()=>{sfx(1800,.4,'square',.03,900)});entFire('land',t,1700,()=>{entBoom(g0,G.B.c,true);for(let i=0;i<40;i++)G.parts.push({x:g0.x+(RND()-.5)*40,y:g0.coreY+(RND()-.5)*40,vx:(RND()-.5)*360,vy:(RND()-.5)*300,life:1.2,max:1.2,col:i%2?'#e8fbff':'#9fe8ff',s:3})});break}
 case 'assemble':{al=seg(t,900,1900);entFire('swarm',t,100,()=>{sfx(e.sub==='bone'?900:200,1.4,e.sub==='bone'?'square':'sawtooth',.03,e.sub==='bone'?400:260)});entFire('land',t,1900,()=>entBoom(g0,G.B.c,false));break}
 case 'clock':{dy=(1-eOut(seg(t,400,2200)))*40;al=seg(t,300,1400);for(let i=0;i<12;i++)entFire('c'+i,t,300+i*150,()=>{sfx(660+(i%2)*220,.25,'triangle',.05,660);G.flash=Math.max(G.flash,.12)});entFire('land',t,2200,()=>entBoom(g0,G.B.c,true));break}
 case 'eyes':{al=seg(t,1500,2000);entFire('scan',t,400,()=>sfx(1200,1,'sine',.03,2400));entFire('land',t,2000,()=>entBoom(g0,'#9fffe0',true));break}
 case 'heart':{const beats=[500,1100,1700];beats.forEach((a,i)=>entFire('h'+i,t,a,()=>{G.shake=Math.max(G.shake,.5+i*.2);G.flash=Math.max(G.flash,.25+i*.1);sfx(45,.5,'sine',.12,30);if(typeof perc==='function'&&audio){perc('kick',audio.currentTime,1.3);perc('kick',audio.currentTime+.16,.9)}fxRing(g0.x,g0.coreY,performance.now(),700,160+i*50,G.B.c)}));
  let v=0;for(const a of beats){const k=(t-a)/400;if(k>=0&&k<1)v=Math.max(v,1-k)}al=t<2300?v*.8:1;sil=t<2300;entFire('land',t,2300,()=>entBoom(g0,G.B.c,true));break}
 case 'spore':{al=seg(t,600,2000);entFire('land',t,2000,()=>entBoom(g0,'#caff6b',false));break}}
 if(t>2400)e.hideHands=false;if(!e.hideHands&&!e.handsSet){e.handsSet=1;const hs=idleHandsAt(G.B,HOME.x,HOME.y,U);b.hands.forEach((h,i)=>{h.x=hs[i].x;h.y=hs[i].y;h.hide=false});for(const h of b.hands)spawnPuff(h.x,h.y,8,G.B.pal[2])}
 b.x=HOME.x+dx;b.y=HOME.y+dy;e.al=al;e.sil=sil;e.dy=dy}
/* 보스 뒤 */
function entBack(now){const e=G.ent;if(!e)return;const t=now-e.t0,g=geo(G.B,HOME.x,HOME.y),col=G.B.c;if(t>3200)return;
 const fade=t>2600?1-(t-2600)/600:1;
 switch(e.kind){
 case 'heart':case 'eyes':RA(0,0,W,H,'#000',(t<2300?.92:.92*Math.max(0,1-(t-2300)/500))*fade);break;
 case 'bolt':RA(0,0,W,H,'#000',(t<2100?.75:.75*Math.max(0,1-(t-2100)/500)));break;
 case 'rise':if(t<2400){for(let i=0;i<8;i++){const x=g.x+(i-3.5)*g.hf*U*.3,cr=seg(t,0,500);line(x,g.y+2,x+(RND()-.5)*20*cr,g.y+2+(RND()-.5)*8,2,(a,b)=>RA(a,b,2,1,'#000',.6*fade))}if(e.sub==='gear'){const op=eOut(seg(t,200,700))*g.hf*U*1.3;R(g.x-g.hf*U*1.3-op,g.y-4,g.hf*U*1.3,8,'#2a3430');R(g.x+op,g.y-4,g.hf*U*1.3,8,'#2a3430');RA(g.x-g.hf*U*1.2,g.y-3,g.hf*U*2.4,6,'#ff4d3a',.25*fade)}
  if(e.sub==='root')for(let i=0;i<6;i++){const k=seg(t,100+i*120,700+i*120),a=-Math.PI/2+(i-2.5)*.35,L=90*eOut(k);line(g.x+(i-2.5)*14,g.y,g.x+(i-2.5)*14+Math.cos(a)*L,g.y+Math.sin(a)*L,2,(a2,b)=>R(a2-1.5,b-1.5,3,3,'#3a2a18'))}
  if(e.sub==='bog'||e.sub==='abyss'){for(let i=0;i<3;i++){const k=((t/600)+i/3)%1;pcirc(g.x,g.y,20+k*90,e.sub==='abyss'?'#1a3a6a':'#2e5a4a',(1-k)*.35*fade)}}}break;
 case 'drop':if(e.sub==='crane'||e.sub==='silk'){const b=G.boss,top=geo(G.B,b.x,b.y).top;line(b.x,0,b.x,top,2,(a,c)=>R(a-.5,c,e.sub==='silk'?1:2,2,e.sub==='silk'?'#e0d8f0':'#6a6a6a'))}if(e.sub==='wasp'&&t<1500){const b=G.boss;for(let k=1;k<5;k++)RA(b.x+k*18-20,b.y-60-k*24,40,30,col,.08*fade)}break;
 case 'charge':if(t<1800){const b=G.boss;for(let i=0;i<10;i++){const y=b.y-20-i*6;RA(b.x+40,y,80+RND()*60,2,'#ffffff',.12*fade)}for(let i=0;i<4;i++){const k=((t/400)+i/4)%1;pcirc(b.x+30+k*40,geo(G.B,b.x,b.y).top-10-k*20,6+k*10,'#8a8a86',.4*(1-k))}if(t>1100&&t<1700)for(let i=0;i<6;i++)RA(b.x-20+RND()*40,b.y-2,2,2,'#ffe36b',.9)}break;
 case 'pour':if(t<2200){const w2=6+Math.sin(t/60)*2,y1=g.coreY;for(let y=0;y<y1;y+=4)RA(g.x-w2/2+Math.sin(y*.1+t/80)*2,y,w2,4,y%8?'#ff7a2a':'#ffb020',.9*fade);pcirc(g.x,g.y-6,14+seg(t,300,1500)*30,'#ff5a1f',.35*fade)}break;
 case 'freeze':if(t<1750){const k=eOut(seg(t,100,1200)),s=g.hf*U*1.3*k,cy=g.coreY;for(let j=-s;j<s;j+=2){const w2=(s-Math.abs(j))*.9;RA(g.x-w2,cy+j,w2*2,2,j<0?'#dff8ff':'#9fe8ff',.75)}if(t>1200)for(let i=0;i<5;i++){const a=i*1.3;line(g.x,cy,g.x+Math.cos(a)*s,cy+Math.sin(a)*s,2,(a2,b)=>RA(a2,b,1,1,'#ffffff',.9))}}break;
 case 'clock':if(t<2900){const r=g.hf*U*1.8;pcirc(g.x,g.coreY,r,'#fff6e0',.08*fade);for(let i=0;i<12;i++){const a=i*TAU/12;RA(g.x+Math.cos(a)*r-2,g.coreY+Math.sin(a)*r-2,4,4,'#f0b8d2',.8*fade)}const hq=t/80,mq=t/25;line(g.x,g.coreY,g.x+Math.cos(hq)*r*.5,g.coreY+Math.sin(hq)*r*.5,2,(a,b)=>RA(a-1,b-1,3,3,'#f0b8d2',.8*fade));line(g.x,g.coreY,g.x+Math.cos(mq)*r*.8,g.coreY+Math.sin(mq)*r*.8,2,(a,b)=>RA(a-1,b-1,2,2,'#ffffff',.8*fade))}break;
 case 'spore':break}}
/* 보스 앞 */
function entFront(now){const e=G.ent;if(!e)return;const t=now-e.t0,g=geo(G.B,HOME.x,HOME.y),col=G.B.c;if(t>3400)return;const fade=t>2600?Math.max(0,1-(t-2600)/700):1;
 switch(e.kind){
 case 'rise':if(t<2200){for(let i=0;i<3;i++){RA(g.x-g.hf*U*1.4+RND()*g.hf*U*2.8,g.y-2-RND()*6,3,3,'#8a7a6a',.8)}RA(0,g.y+2,W,H-g.y,'#000',0)}break;
 case 'bolt':[700,1150,1600].forEach(a=>{const k=(t-a)/260;if(k<0||k>=1)return;let x=g.x+(RND()-.5)*30,y=0;for(let s=0;s<10;s++){const nx=g.x+(RND()-.5)*60,ny=(s+1)*g.coreY/10;line(x,y,nx,ny,1,(a2,b)=>{RA(a2-2,b-2,5,5,'#7fd6ff',.35*(1-k));RA(a2-1,b-1,2,2,'#ffffff',1-k)});x=nx;y=ny}});break;
 case 'assemble':for(const p of e.parts){const k=eIn(seg(t-p.d,200,1500));if(k>=1)continue;const x=lerp(p.sx,p.tx,k),y=lerp(p.sy,p.ty,k);const c2=e.sub==='bone'?'#e8e2c8':e.sub==='ash'?'#6a6460':'#c9bff0';R(x-p.s/2,y-p.s/2,p.s+(e.sub==='bone'?3:0),p.s,c2);if(e.sub==='drone')RA(x-3,y-2,6,1,'#ffe36b',.7)}break;
 case 'eyes':if(t<2200){for(let i=0;i<16;i++){const ot=200+i*70;if(t<ot)continue;const a=i*2.4,x=g.x+Math.cos(a)*(150+(i%3)*30),y=g.coreY+Math.sin(a)*90,op=Math.min(1,(t-ot)/150);pcirc(x,y,4*op,'#9fffe0',.9);R(x-1,y-1,2,2,'#000');if(t>1300){const k=seg(t,1300,1800);line(x,y,lerp(x,g.x,k),lerp(y,g.coreY,k),3,(a2,b)=>RA(a2-1,b-1,2,2,'#ff4d6d',.6))}}}break;
 case 'heart':if(t<2300&&e.sil){const b=G.boss;for(let i=0;i<4;i++){const a=i*1.57+.4,x=g.x+Math.cos(a)*g.hf*U*.6,y=g.headY+6+Math.sin(a)*6,op=t>600+i*300?1:0;if(op){pcirc(x,y,2.5,'#ff2d55',.9);R(x-.5,y-.5,1,1,'#ffffff')}}}break;
 case 'spore':if(t<2400){const a=t<600?.95:.95*Math.max(0,1-(t-600)/1600);for(let i=0;i<60;i++){const x=(i*53+Math.sin(t/400+i)*20)%W,y=AY+((i*37)%AH)+Math.cos(t/500+i)*10;pcirc(x,y,14+(i%4)*4,i%3?'#6a3a8a':'#9ad63a',a*.35)}for(let i=0;i<5;i++)entFire('pop'+i,t,700+i*220,()=>{sfx(500+i*80,.12,'sine',.04,900)})}break;
 case 'drop':case 'charge':case 'freeze':case 'pour':case 'clock':break}
 if(t>2300&&t<3300){const k=(t-2300)/1000;RA(0,0,W,H,'#ffffff',Math.max(0,.35-k*.6))}}
function entClipStart(){const e=G.ent;if(!e)return;ctx.save();if(e.kind==='rise'){ctx.beginPath();ctx.rect(0,0,W,HOME.y+2);ctx.clip()}ctx.globalAlpha=ctx.globalAlpha*(e.al==null?1:e.al)}
function entClipEnd(){if(G.ent)ctx.restore()}
function entEnd(){if(!G.ent)return;G.ent=null;const b=G.boss;b.x=HOME.x;b.y=HOME.y;const hs=idleHandsAt(G.B,HOME.x,HOME.y,U);b.hands.forEach((h,i)=>{if(h.x<-40||h.hide){h.x=hs[i].x;h.y=hs[i].y}h.hide=false})}
/*ENT_END*/
/*DMG_BEGIN*/
