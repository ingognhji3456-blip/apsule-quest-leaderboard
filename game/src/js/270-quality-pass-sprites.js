/* ================= 퀄리티 패스: 셀아웃 음영 스프라이트 · 새 펫 · 보스 게이지 ================= */
function shadeGrid(rows,pal){const Hh=rows.length,Wd=rows[0].length,at=(i,j)=>(j<0||j>=Hh||i<0||i>=Wd)?'.':(rows[j][i]||'.');const out=[];
 for(let j=0;j<Hh;j++){const r=[];for(let i=0;i<Wd;i++){const k=at(i,j);if(k==='.'){r.push(null);continue}
  if(k==='o'){let nb=null;for(const [di,dj] of [[0,1],[0,-1],[-1,0],[1,0]]){const q=at(i+di,j+dj);if(q!=='.'&&q!=='o'&&pal[q]&&pal[q].length===7){nb=pal[q];break}}r.push(nb?mixc(shade(nb,.32),'#0c1016',.5):'#0c1016');continue}
  let c=pal[k];if(!c||c.length!==7){r.push(c||'#ff00ff');continue}const up=at(i,j-1),rt=at(i+1,j),dn=at(i,j+1),lf=at(i-1,j);
  if(up==='o'||up==='.')c=mixc(c,'#ffffff',.2);else if(lf==='o'||lf==='.')c=mixc(c,'#ffffff',.08);
  if(rt==='o'||rt==='.'||dn==='o'||dn==='.')c=shade(c,.78);r.push(c)}out.push(r)}return out}
function drawGrid(c,g,X,Y,s,fl,w,y0,dy){const sz=Math.max(1,Math.ceil(s));for(let j=0;j<g.length;j++){const r=g[j];for(let i=0;i<r.length;i++){const col=r[i];if(!col)continue;c.fillStyle=col;c.fillRect(Math.round(X+(fl?(w-1-i):i)*s),Math.round(Y+(y0+j+dy)*s),sz,sz)}}}
const _GC={};
function charGrids(idx){if(_GC[idx])return _GC[idx];const ch=CHARS[idx],pal=ch.hero?HERO_PAL:ch.pal,top=ch.hero?HERO_TOP:ch.top,topB=ch.hero?HERO_TOPB:ch.topB;
 return _GC[idx]={top:shadeGrid(top,pal),topB:shadeGrid(topB,pal),legs:HERO_LEG.map(l=>shadeGrid(l,pal))}}
/* 캐릭터별 장식 (뒤: back, 앞: front) */
function charExtra(c,idx,X,Y,s,fl,bob,now,layer){const P2=(i,j,w,h,col,al)=>{const xx=fl?X+(14-i-w)*s:X+i*s;if(al!=null)c.globalAlpha=al;c.fillStyle=col;c.fillRect(Math.round(xx),Math.round(Y+(j+bob)*s),Math.max(1,Math.round(w*s)),Math.max(1,Math.round(h*s)));if(al!=null)c.globalAlpha=1};
 const t=now/1000;
 const SK={1:['#ff9ec4','#d06a94','#fff6fa'],3:['#5a3aa0','#3a2470','#ffe36b'],7:['#5ad07a','#2e8a4a','#ff8ad0']}[idx];
 if(SK&&layer==='front'){const sw=Math.round(Math.sin(t*6)*.4);P2(3,13,8,1,SK[0]);P2(2+sw*.5,14,10,1,SK[0]);P2(2+sw*.5,15,10,.6,SK[1]);for(let i=0;i<5;i++)P2(2.5+i*2+sw*.5,15.2,.8,.5,SK[2]);P2(2,13,1,2,'#10141a');P2(11,13,1,2,'#10141a')}
 switch(idx){
 case 1:if(layer==='back'){const wg=Math.round(Math.sin(t*5)*1.2);P2(-1,11,1,1,'#161c22');P2(-2,10+wg*.5,1,2,'#ff9ec4');P2(-3,8+wg,1,3,'#ff9ec4');P2(-3,7+wg,1,1,'#fff6fa');P2(-2,12,2,1,'#d06a94')}else{P2(6,11,2,1,'#ffd166');P2(6.5,11.8,1,.6,'#8a6a20')}break;
 case 2:if(layer==='back'){P2(11,4,1,8,'#6a4a28');P2(10,3,4,1,'#9aa8b0');P2(13,4,1,1,'#9aa8b0')}else{const f=.3+.15*Math.sin(t*6);P2(5,1.5,4,1.5,'#fffbe0',f)}break;
 case 3:if(layer==='front'){for(let i=0;i<3;i++){const a=t*2+i*2.1,px=7+Math.cos(a)*8,py=6+Math.sin(a)*5;P2(px,py,.8,.8,i%2?'#ffe36b':'#c8a8ff',.5+.5*Math.sin(t*6+i))}if(Math.floor(t*3)%2)P2(6.5,2.5,1,1,'#ffffff')}break;
 case 4:if(layer==='front'){P2(6,0,2,1,Math.floor(t*2)%2?'#ff4d6d':'#5a1a2a');P2(6,6,2,.6,'#7df9ff',.4+.3*Math.sin(t*8))}else{const k=(t*1.5)%1;P2(-1-k*2,9-k*3,1+k,1+k,'#8a9aa4',.5*(1-k))}break;
 case 5:if(layer==='back'){const wv=Math.sin(t*4);for(let j=0;j<7;j++){const sw=Math.round(Math.sin(t*4-j*.6)*1.2);P2(2+sw*.3-j*.1,9+j,10+j*.2,1,j%2?'#24448a':'#3a6ac8')}P2(1,15,12,1,'#24448a')}else{P2(6,-1,2,.8,'#fff0a0',.6+.4*Math.sin(t*3))}break;
 case 6:if(layer==='front'&&P&&P.dash){for(let k=1;k<3;k++)P2(-k*2,2,14,10,'#3a3a4a',.2)}break;
 case 7:if(layer==='back'){const fw=Math.sin(t*14)>0,a=.35+.15*Math.sin(t*3);for(const side of [0,1]){const bx=side?13:-3;P2(bx,7+(fw?0:1),3,4,'#c8f8ff',a);P2(bx+(side?1:0),8+(fw?0:1),2,2,'#ffffff',a*.8);P2(bx,11,2,2,'#aee8ff',a*.7)}}else{for(let i=0;i<2;i++){const k=(t*.7+i*.5)%1;P2(3+i*8,12-k*10,.6,.6,'#ffb0e0',1-k)}}break;
 case 8:if(layer==='back'){const f=Math.round(Math.sin(t*5));for(const side of [0,1]){const bx=side?12:-2;P2(bx,6+f,3,1,'#801a24');P2(bx+(side?1:-1),5+f,2,1,'#c8323a');P2(bx+(side?2:-2),4+f,1,1,'#f0e6c8')}}else{if(Math.floor(t*8)%3===0)P2(5+Math.random()*4,5,.6,.6,'#ffcf3a')}break;
 case 9:if(layer==='back'){const a=.55+.25*Math.sin(t*3);for(let i=0;i<14;i++){const q=i/14*TAU+t,rx=Math.cos(q)*4.5,ry=Math.sin(q)*1.1;P2(7+rx-.4,-2.5+ry,.9,.7,'#ffe36b',a)}}else{for(let i=0;i<3;i++){const k=(t*.6+i/3)%1;P2(2+i*5,13-k*14,.6,.6,'#fff6cf',1-k)}}break}}
function drawKnight(c,x,y,s,fl,wt,idleT){const idx=shopInv().eq.ch||0,ch=CHARS[idx]||CHARS[0],X=x-s,Y=y-6*s,now=performance.now();let li=0,bob=0;
 if(wt!=null){const f=((Math.floor(wt/(Math.PI/2))%4)+4)%4;li=f%2===0?1:2;bob=f%2?-1:0}else if(idleT!=null)bob=Math.round(Math.sin(idleT)*.6);
 const g=charGrids(idx),sz=Math.max(1,Math.ceil(s));
 charExtra(c,idx,X,Y,s,fl,bob,now,'back');
 if(ch.scarf){for(let i=1;i<=5;i++){const wv=i>1?Math.round(Math.sin(now/130+i*.9)):0;c.fillStyle=i===1?shade(ch.scarf[0],.8):i%2?ch.scarf[0]:ch.scarf[1];const col=fl?13+i:-i;c.fillRect(Math.round(X+col*s),Math.round(Y+(9+bob+wv+(i>2?1:0))*s),sz,sz);if(i===5){c.globalAlpha=.5;c.fillRect(Math.round(X+(fl?13+i+1:-i-1)*s),Math.round(Y+(10+bob+wv)*s),sz,sz);c.globalAlpha=1}}}
 drawGrid(c,Math.floor(now/170)%26===0?g.topB:g.top,X,Y,s,fl,14,0,bob);drawGrid(c,g.legs[li],X,Y,s,fl,14,14,0);
 charExtra(c,idx,X,Y,s,fl,bob,now,'front')}
/* ---- 새 펫 (12x12, 셀아웃 음영) ---- */
const _m6=r=>r.length===6?r+r.split('').reverse().join(''):r;
const PET2={
 1:{p:{a:'#6a5a3a',H:'#4a3a5a',E:'#ffffff',w:'#e8ffff',W:'#ffffff',B:'#5a4a3a',Y:'#ffe36b',L:'#fffbe0'},glow:'#ffe36b',wing:true,r:["..a...","...a..","....oo",".w.oHH","wWwoEH","wWWwoH",".wwoBB","...oYY","..oYYY","..oYYL","...oYY","....oo"]},
 2:{p:{K:'#ffd166',k:'#b8961a',P:'#ffb0c4',G:'#b8c4cc',g:'#8a9aa4',E:'#1a1a24',N:'#ff8aa0',W:'#e8eef0',t:'#ff9ab0'},r:[".....KK.....","....KkkK....",".....KK.....","..oo..K.....",".oPPo.oooo..",".oPoGGGGGGo.","oGGGGGGGGGgo","NGEGGGGGGGgo","oGGGGGGGGggot",".ogGgggggGo.t","..oWo..oWo.t","..oo....oo.."]},
 3:{p:{W:'#ffffff',F:'#5a5a6a',E:'#ffffff',m:'#ffb0c4',p:'#ffd6e0'},r:["...oo.","..oWWo",".oWWWW","oWWWWW","oWWFFF","oWFEFF","oWFFFF","oWWFFm",".oWWWW","..oWWW","..oF.o","..oo.."]},
 4:{p:{B:'#9a7a4a',E:'#ffd166',e:'#1a1a24',Y:'#ff9a3a',M:'#b8c4cc',b:'#e8d8b8'},r:[".oo...",".oBo..",".oBBoo","oBBBBB","oBEEEB","oBEeEB","oBEEEY",".oBBBY",".oMBBB",".oMbbb","..oMbb","...oY."]},
 5:{p:{O:'#ff8a3a',W:'#fff6e8',E:'#1a1a24',n:'#1a1a24',F:'#ffe36b',R:'#ff4d1a',i:'#ffd0b0'},r:[".o......o...","oOo....oOo..","oiOoooooOio.","oOOOOOOOOOo.","oOEOOOOOEOo.","oWOOOOOOOWoF",".oWWWnWWWoFR","..oWWWWWoFRF","..oOOOOOoRFF",".oOOOOOOOoF.",".oWo.oo.oWo.",".oo......oo."]},
 6:{p:{B:'#2a4a7a',E:'#ffffff',Y:'#ffb020',W:'#ffffff',C:'#9fe8ff'},r:["....oo","...oBB","..oBBB","..oEBB","..oBBY",".oBCCC","oBBWWW","oBoWWW",".oBWWW","..oBWW","..oYYo","......"]},
 7:{p:{C:'#e8f8ff',V:'#b88aff',E:'#ffe36b',n:'#5a2a8a',W:'#8a5ac8',w:'#d8c0ff',T:'#b88aff'},r:["..o.....o...",".oCo...oCo..","..oVoooVo.oW",".oVVVVVVVoWw",".oVEVVVEVoWW",".oVVVVVVVVWo","..oVVnnVVo..",".oVVwCCwVVo.","oVVowCCwoVVo",".oVVVVVVVVoT","..oVo..oVoTT","..oo....oo.."]},
 8:{p:{W:'#eef6ff',E:'#5ad0ff',p:'#ffb0c4'},ghost:true,r:[".o....","oWo...","oWWooo","oWWWWW","oWWEWW","oWWWWW","oWWWWp",".oWWWW",".oWWWW","oWWWWW","oW.oWW",".o..oo"]},
 9:{p:{F:'#fff0a0',R:'#ff4d1a',Y:'#ffd84a',y:'#e8a020',E:'#1a1a24',O:'#ff8a3a'},glow:'#ffb020',wing:true,r:["....FR","....oR","...oYY","R..oYE","RR.oYY","RYooYO","RYYYYY",".RYyYY","..RRyY","...RRF","....FF",".....F"]},
};
const _PG={};function petGrid(id,frame){const k=id+'_'+frame;if(_PG[k])return _PG[k];const sp=PET2[id],rows=sp.r.map(_m6).map(r=>r.padEnd(12,'.').slice(0,12));let rr=rows;if(frame&&sp.wing)rr=rows.map((r,j)=>j>=3&&j<=6?r.replace(/[wW]/g,'.'):r);return _PG[k]=shadeGrid(rr,sp.p)}
function drawPet(c,id,x,y,now,k){k=k||1;if(!id){drawTick(c,x,y,now,k);return}const sp=PET2[id];if(!sp)return;const s=Math.max(1,Math.round(1.6*k)),bob=Math.round(Math.sin(now/260+id)*1.2*k),fr=sp.wing?Math.floor(now/90)%2:0,g=petGrid(id,fr),fl2=!!(P&&P.face&&P.face.x<0);
 if(sp.glow){const f=.8+.2*Math.sin(now/180);for(const [r,a] of [[10,.1],[7,.14],[4,.22]])pcirc(x,y+bob,r*k,sp.glow,a*f,c)}
 c.globalAlpha=.3;c.fillStyle='#000';c.fillRect(Math.round(x-4*s),Math.round(y+7*s),Math.round(8*s),Math.max(1,Math.round(s)));c.globalAlpha=1;if(sp.ghost)pcirc(x,y+bob,8*k,'#bfe8ff',.12+.06*Math.sin(now/300),c);
 drawGrid(c,g,x-6*s,y-6*s,s,fl2,12,0,bob/s);c.globalAlpha=1;
 if(id===9||id===5){for(let i=0;i<2;i++){const q=((now/600)+i*.5)%1;c.globalAlpha=1-q;c.fillStyle=i?'#ffe36b':'#ff8a3a';c.fillRect(Math.round(x+(id===5?5*s:(i?-4:4)*s)),Math.round(y+(4-q*10)*s+bob),Math.ceil(s),Math.ceil(s))}c.globalAlpha=1}
 if(id===6&&Math.floor(now/400)%3===0){c.fillStyle='#e8fbff';c.fillRect(Math.round(x+(RND()-.5)*14*k),Math.round(y-6*k+bob),Math.ceil(k),Math.ceil(k))}
 if(id===7){c.globalAlpha=.5+.3*Math.sin(now/200);c.fillStyle='#ffffff';c.fillRect(Math.round(x-1*s),Math.round(y+1.5*s+bob),Math.ceil(s),Math.ceil(s));c.globalAlpha=1}}
/* ---- 보스 체력 게이지 (고퀄) ---- */
function drawBossBar(now){const bn=document.getElementById('bossName');if(bn&&bn.style.visibility!=='hidden')bn.style.visibility='hidden';
 const B=G.B,bi=G.bi,ph=G.phase,x=46,y=4,w=300,h=14,r=clamp(G.hp/G.maxHp,0,1),T=bi>=10?TH2[bi]:null,organic=!!T;
 if(G._barLast!==undefined&&r<G._barLast-1e-4){G._barHitT=now;G._barSp=G._barSp||[];for(let i=0;i<5;i++)G._barSp.push({x:x+w*r,y:y+h/2,vx:(RND()-.3)*60,vy:(RND()-.5)*60,t:now})}G._barLast=r;
 G.hpShow=G.hpShow===undefined?r:(G.hpShow>r?Math.max(r,G.hpShow-.1*(1/60)):r);
 const base=ph>=2?'#ff2d55':ph>=1?'#ffb020':B.c,acc=T?T.tel:B.pal[3],c2=T?T.act:B.pal[2],fr=T?T.dk:B.pal[1],edge=T?T.hi:B.pal[2],low=r<.25,pul=low?.5+.5*Math.sin(now/120):0;
 // 뒤판 + 그림자
 RA(x-4,y-3,w+14,h+9,'#000',.35);
 // 프레임 (3단 베벨)
 R(x-3,y-3,w+8,h+6,'#07090c');R(x-2,y-2,w+6,h+4,fr);R(x-2,y-2,w+6,1,mixc(edge,'#ffffff',.3));R(x-2,y-1,w+6,1,edge);R(x-2,y+h+1,w+6,1,shade(fr,.45));R(x-1,y-1,w+4,h+2,'#06080a');
 if(!organic){for(let i=8;i<w;i+=24){R(x+i,y-2,2,2,'#dfe6ea');R(x+i+1,y-2,1,1,'#ffffff');R(x+i,y+h+1,2,1,shade(edge,.55))}
  // 오른쪽 끝 캡: 볼트 판
  R(x+w+3,y-4,8,h+8,'#07090c');R(x+w+4,y-3,6,h+6,fr);R(x+w+4,y-3,6,1,edge);pcirc(x+w+7,y+2,1.5,'#dfe6ea');pcirc(x+w+7,y+h-2,1.5,'#dfe6ea')}
 else{for(let i=4;i<w;i+=10){const hh=2+((i*7+bi*3)%3),sw=Math.round(Math.sin(now/600+i)*.6);R(x+i,y-2-hh,2,hh,fr);R(x+i+sw,y-3-hh,1,1,edge);const hb=1+((i+bi)%3);R(x+i+5,y+h+2,2,hb,fr)}
  for(let k=0;k<3;k++){R(x+w+4+k*2,y-3+k*3,3,2,fr);R(x+w+5+k*2,y-3+k*3,1,1,edge)}}
 // 채움 영역
 R(x,y,w,h,'#140d11');for(let i=0;i<w;i+=4)R(x+i,y+h-2,2,1,'#1e1418');
 const trail=w*G.hpShow,fw=Math.max(0,w*r),hitK=G._barHitT?clamp(1-(now-G._barHitT)/260,0,1):0;
 R(x,y,trail,h,mixc('#ff6a5a','#fff0d0',hitK));
 const cTop=mixc(base,'#ffffff',.35),cMid=base,cBot=shade(base,.55);
 R(x,y,fw,h,cBot);R(x,y,fw,h-3,cMid);R(x,y,fw,4,mixc(base,'#ffffff',.18));R(x,y,fw,1,cTop);
 // 흐르는 텍스처
 if(!organic){const off=(now/40)%12;for(let i=-12;i<fw;i+=12){for(let j=0;j<h-1;j++){const px=x+i+off+j*.6;if(px>=x&&px<x+fw-1)RA(px,y+j,2,1,'#ffffff',.1)}}}
 else{for(let i=0;i<fw-4;i+=7){const q=Math.sin(now/300+i*.35);RA(x+i,y+6+Math.round(q*2),5,1,shade(base,.6),.55);RA(x+i+2,y+5+Math.round(q*2),2,1,'#ffffff',.14)}}
 const sh=((now/1500)%1.6)-.3;if(sh>0&&sh<1&&fw>8){for(let k=0;k<6;k++)RA(x+fw*sh-4+k,y+(k%2),2,h-1,'#ffffff',.08+.04*(3-Math.abs(k-3)))}
 if(fw>2){R(x+fw-1,y,1,h,mixc(base,'#ffffff',.6));if(hitK>0)RA(x+fw-3,y-1,4,h+2,'#ffffff',hitK*.8)}
 if(G.exposed&&Math.floor(now/90)%2)RA(x,y,fw,h,'#ffe79a',.4);if(low)RA(x,y,fw,h,'#ff2d55',pul*.25);
 // 페이즈 보석
 for(const f of [.66,.33]){const px=Math.round(x+w*f),lit=r>=f;R(px,y,1,h,'#06080a');const gy=y-3;for(let k=0;k<3;k++)R(px-k,gy+k,1+k*2,1,lit?acc:'#3a3a44');for(let k=0;k<2;k++)R(px-1+k,gy+3+k,3-k*2,1,lit?shade(acc,.7):'#2a2a30');if(lit){RA(px-2,gy-1,5,6,acc,.2+.15*Math.sin(now/200))}else{R(px,gy+1,1,2,'#6a6a74')}}
 // 불꽃 파편
 if(G._barSp){for(const p of G._barSp){const k=(now-p.t)/400;if(k>=1)continue;RA(p.x+p.vx*k*.4,p.y+p.vy*k*.4,2,2,k<.4?'#ffffff':base,1-k)}G._barSp=G._barSp.filter(p=>now-p.t<400)}
 // 메달리온 (보스 아이콘)
 const mx=x-14,my=y+h/2;pcirc(mx,my,12,'#07090c');pcirc(mx,my,11,fr);pcirc(mx,my,10,edge);pcirc(mx,my,9,shade(fr,.7));pcirc(mx,my,8,'#0b1014');
 if(low){pcirc(mx,my,12+pul*2,'#ff2d55',.18*pul)}for(let i=0;i<12;i++){const a=i*TAU/12+(organic?0:now/2000);RA(mx+Math.cos(a)*10-.5,my+Math.sin(a)*10-.5,1,1,i%3?shade(edge,.8):'#ffffff',.8)}
 barIcon(BAR_ICON[bi]||'gear',mx-5,my-5,acc,c2,now);
 // 글자
 const hpN=Math.max(0,Math.ceil(G.hp)),txt=hpN.toLocaleString('en-US')+' / '+G.maxHp.toLocaleString('en-US');
 const OT=(t,tx,ty,al,col,f)=>hudText(t,tx,ty,al,col,f);
 ctx.font='bold 10px monospace';const nw=ctx.measureText(B.name).width;R(x+1,y+1,nw+10,h-2,'#04070a');R(x+1,y+h-2,nw+10,1,shade(edge,.5));OT(B.name,x+6,y+h-3,'left','#ffffff','bold 10px monospace');
 ctx.font='bold 10px monospace';const tw=ctx.measureText(txt).width;R(x+w-tw-10,y+1,tw+9,h-2,'#04070a');R(x+w-tw-10,y+h-2,tw+9,1,shade(edge,.5));OT(txt,x+w-5,y+h-3,'right',low?mixc('#ffffff','#ff8a9a',pul):'#fff6c8','bold 10px monospace');
 const pl='◆ PHASE '+(ph+1),pc=Math.ceil(r*100)+'%';ctx.font='bold 9px monospace';const pw=ctx.measureText(pl).width,qw=ctx.measureText(pc).width;RA(x-2,y+h+3,pw+qw+18,11,'#04070a',.8);
 OT(pl,x+2,y+h+12,'left',mixc(base,'#ffffff',.35),'bold 9px monospace');OT(pc,x+pw+10,y+h+12,'left','#ffffff','bold 9px monospace');ctx.textAlign='left'}
function hudText(t,tx,ty,al,col,f){ctx.font=f;ctx.textAlign=al;ctx.fillStyle='#000000';for(const [ox,oy] of [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1],[0,2],[1,2]])ctx.fillText(t,tx+ox,ty+oy);ctx.fillStyle=col;ctx.fillText(t,tx,ty)}
/*QUAL_END*/
/*MUSIC2_BEGIN*/
const MVOL=[0.23, 0.163, 0.047, 0.149, 0.142, 0.128, 0.081, 0.122, 0.147, 0.13, 0.086, 0.135, 0.107, 0.044, 0.106, 0.133, 0.141, 0.121, 0.062, 0.053];
