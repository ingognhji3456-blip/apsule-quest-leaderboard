/* ================= 캐릭터 v2 · 스토리 연출 v2 ================= */
const HERO_PAL={o:'#161c22',H:'#eef2dc',h:'#c2cbb0',g:'#8e9a86',w:'#ffffff',V:'#1c2e38',E:'#a6f5c6',S:'#ff8a5c',s:'#c8583a',C:'#6ccaa9',c:'#3f8f7a',d:'#2a5f55',B:'#9fb9ba',b:'#6d8889',L:'#8a6a42',l:'#5a4228',D:'#34505a',k:'#1f3038',Y:'#ffd166'};
const HERO_TOP=[".....oSSo.....","....ooSsoo....","...oHwHHHHo...","..oHwHHHHHho..","..oHVVVVVVgo..","..oVEEVVEEVo..","..oVEEVVEEVo..","..ohVVVVVVgo..","...ohhhhhgo...","..ooSSSSSSoo..",".oCsBBBBBBsCo.","oCcoBBYBBBocdo","oBboBBBBBBobBo",".oo.olLLLlo.o."];
const HERO_TOPB=HERO_TOP.map((r,i)=>i===5||i===6?r.replace(/E/g,'V'):r);
const HERO_LEG=[["...obBooBbo...","...oDDooDDo...","..okDDookDDo..","..oooooooooo.."],["..obBo..oBbo..","..oDDo...oDDo.",".okDDo...okDDo",".ooooo...ooooo"],["....obBBbo....","....oDDDDo....","...okDDkDDo...","...oooooooo..."]];
function sprRows(c,rows,pal,X,Y,s,fl,w,y0,dy){const sz=Math.max(1,Math.ceil(s));for(let j=0;j<rows.length;j++){const r=rows[j];for(let i=0;i<r.length;i++){const k=r[i];if(k==='.')continue;c.fillStyle=pal[k];c.fillRect(Math.round(X+(fl?(w-1-i):i)*s),Math.round(Y+(y0+j+dy)*s),sz,sz)}}}
function drawKnight(c,x,y,s,fl,wt,idleT){const X=x-s,Y=y-6*s,now=performance.now();let legs=HERO_LEG[0],bob=0;
 if(wt!=null){const f=((Math.floor(wt/(Math.PI/2))%4)+4)%4;legs=HERO_LEG[f%2===0?1:2];bob=f%2?-1:0}else if(idleT!=null)bob=Math.round(Math.sin(idleT)*.6);
 const sz=Math.max(1,Math.ceil(s));for(let i=1;i<=4;i++){const wv=i>1?Math.round(Math.sin(now/130+i*.9)):0;c.fillStyle=i%2?'#ff8a5c':'#c8583a';const col=fl?13+i:-i;c.fillRect(Math.round(X+col*s),Math.round(Y+(9+bob+wv+(i>2?1:0))*s),sz,sz)}
 sprRows(c,Math.floor(now/170)%26===0?HERO_TOPB:HERO_TOP,HERO_PAL,X,Y,s,fl,14,0,bob);sprRows(c,legs,HERO_PAL,X,Y,s,fl,14,14,0)}
function heroAt(x,fy,s,fl,wt,idleT){drawKnight(ctx,x-6*s,fy-11*s,s,fl,wt,idleT)}
/* NPC: 선 할아버지 / 윤서 (발 중심 좌표) */
const NPC_SPR={
 sun:{w:16,pal:{o:'#161c22',K:'#e8b894',k:'#c08a68',W:'#f2f2ee',w:'#b8b8b0',G:'#9ad0e0',V:'#7a4a28',v:'#4e2e18',T:'#e6dcc8',t:'#b8ac98',P:'#44424e',D:'#2a2018',Y:'#ffd166',R:'#c8584a'},rows:["................",".....oooooo.....","....oKKKKKKo....","...oKKKKKKKKo...","..oWkKKKKKKkWo..",".oWWWWKKKKWWWWo.",".oWwooooKoooowWo","..oKoGGoKoGGoKo.","..oKooooKooooKo.","..okKKKkkKKKkko.","..oWWWWkkWWWWo..",".oWWWWWRRWWWWWo.",".oWWWWWWWWWWWWo.","..oWWWWWWWWWWo..",".oTVoWWWWWWoVTo.","oTTVVoWWWWoVVTTo","oKtVVYVVVVVVtKo.",".oovVVVVVVVVvoo.","...oPPPPPPPPo...","...oPPPooPPPo...","...oDDDo.oDDDo..","...ooooo.ooooo.."]},
 yun:{w:16,pal:{o:'#161c22',R:'#e8722a',r:'#b04e1a',O:'#3a4a52',G:'#8ad0ff',K:'#f0caa4',k:'#c89a78',e:'#2a2a3a',J:'#3a6a9a',j:'#24466a',L:'#8a6a42',Y:'#ffd166',D:'#2a3038',m:'#d86a6a'},rows:["......oooo......","....ooRRRRoo....","...oRRRRRRRRo...","..oRROOOOOORRo..","..oRoGGoOGGoRo..","..oRROOOOOORRo..","..oRKKKKKKKKRRo.","..oRKeKKKKeKRrRo","..oRKKKKKKKKorRo","...oKKKmmKKKorRo","....ookkkkoo.oro","...oJJJJJJJJo.o.","..oJJjJJJJjJJo..",".oKJjoJJJJojJKo.",".okjjoLLYLLojko.","...oJJJooJJJo...","...oJJo..oJJo...","...oDDo..oDDo...","..okDDo..okDDo..","..ooooo..ooooo.."]}};
function drawNPC(c,who,x,fy,s,fl,now,opt){const N=NPC_SPR[who];opt=opt||{};const h=N.rows.length,bob=opt.still?0:Math.round(Math.sin(now/520+(opt.seed||0))*.6);let rows=N.rows;
 if(opt.rows)rows=rows.slice(0,opt.rows);
 if(!opt.still&&Math.floor(now/160+(opt.seed||0)*7)%31===0)rows=rows.map((r,i)=>who==='yun'&&i===7?r.replace(/e/g,'K'):r);
 if(opt.sleep&&who==='sun')rows=rows.map((r,i)=>i===7?r.replace(/G/g,'o'):r);
 sprRows(c,rows,N.pal,x-N.w*s/2,fy-h*s,s,fl,N.w,0,bob);
 if(opt.wave){const hx=fl?x-N.w*s/2-s:x+N.w*s/2,hy=fy-h*s+(12+bob)*s,wv=Math.round(Math.sin(now/140)*1.5);c.fillStyle=N.pal.o;c.fillRect(Math.round(hx),Math.round(hy-(3+wv)*s),Math.ceil(s*2),Math.ceil(s*4));c.fillStyle=N.pal.K;c.fillRect(Math.round(hx),Math.round(hy-(4+wv)*s),Math.ceil(s*2),Math.ceil(s*2))}}
/* 똑딱: 태엽 회중시계 로봇 */
function drawTick(c,x,y,now,k){k=k||1;const fl=Math.floor(now/60)%2,P=(xx,yy,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x+xx*k),Math.round(y+yy*k),Math.max(1,Math.round(w*k)),Math.max(1,Math.round(h*k)))};
 P(-8,-2+fl,3,2,'#d8f4ff');P(5,-2+fl,3,2,'#d8f4ff');
 pcirc(x,y,6.4*k,'#161c22',1,c);pcirc(x,y,5.6*k,'#8a6a20',1,c);pcirc(x-.6*k,y-.6*k,4.8*k,'#d4ae4a',1,c);pcirc(x,y,3.6*k,'#23394a',1,c);
 const pu=.65+.35*Math.sin(now/220);pcirc(x,y,2.5*k,'#a8f0ff',pu,c);P(-1,-1,2,2,'#ffffff');
 P(-1,-8,2,2,'#d4ae4a');P(-2,-9,4,1,'#8a6a20');P(-3,-4,1,1,'#fff0c0');
 const sw=Math.sin(now/240)*.6;for(let i=0;i<4;i++)P(Math.round(Math.sin(sw)*(i+1)*1.2)-.5,6+i,1,1,'#3a2a12');P(Math.round(Math.sin(sw)*5)-1,10,2,2,'#d4ae4a')}
/* 초상화 v2 */
function drawPortrait(who){const cv=$('dlgPortrait');if(!cv)return;const x=cv.getContext('2d');x.imageSmoothingEnabled=false;x.clearRect(0,0,56,56);if(!who){cv.style.display='none';return}cv.style.display='block';
 const bi=BOSSES.findIndex(b=>b.name===who);let frame='#a6f5c6';const K=beastKit(x,0,0,2,{},0),{F,E,BLOB}=K;
 const bg=(a,b)=>{for(let j=0;j<28;j++)F(0,j,28,1,mixc(a,b,j/27))};
 if(bi>=0){const B=BOSSES[bi];frame=B.c;bg(shade(B.c,.12),shade(B.c,.3));drawMech(x,B,28,56,0,{still:true},bi>=10?2.2:2)}
 else if(who==='하루'){frame='#a6f5c6';bg('#10202a','#1f3a44');BLOB(14,27,12,6,'#6ccaa9','#3f8f7a','#9fe8cc');E(14,21.5,8,2.2,'#161c22');E(14,21.5,7.4,1.6,'#ff8a5c');F(18,22,3,4,'#c8583a');
  E(14,3,2.4,2,'#161c22');E(14,3,1.8,1.4,'#ff8a5c');BLOB(14,12.5,9.5,8.5,'#eef2dc','#9aa592','#ffffff');F(6,10,16,7,'#161c22');F(7,11,14,5,'#1c2e38');E(10.5,13.5,1.6,1.4,'#a6f5c6');E(17.5,13.5,1.6,1.4,'#a6f5c6');F(10,13,1,1,'#ffffff');F(17,13,1,1,'#ffffff');F(8,6,2,1,'#ffffff')}
 else if(who==='똑딱'){frame='#a8f0ff';bg('#0c1a24','#1a3444');F(13,1,2,3,'#8a6a20');F(11,0,6,1,'#d4ae4a');E(14,15,11,11,'#161c22');E(14,15,10.2,10.2,'#8a6a20');E(13.4,14.4,9.2,9.2,'#d4ae4a');E(14,15,7,7,'#23394a');for(let i=0;i<12;i++){const a=i*TAU/12;F(Math.round(14+Math.cos(a)*8.6),Math.round(15+Math.sin(a)*8.6),1,1,'#fff0c0')}E(14,15,4.6,4.6,'#6ad8f0');E(14,15,3,3,'#a8f0ff');F(12,13,2,2,'#ffffff');F(2,13,3,3,'#d8f4ff');F(23,13,3,3,'#d8f4ff')}
 else if(who.indexOf('선 할아버지')===0){frame='#e6dcc8';bg('#1e1610','#3a2a1c');BLOB(14,28,12,5,'#7a4a28','#4e2e18','#9a6a44');E(14,11,7.5,8,'#161c22');E(14,11,6.8,7.3,'#e8b894');E(12,7,3,2,'#f4d0b0');E(6.5,12,2.4,4,'#f2f2ee');E(21.5,12,2.4,4,'#f2f2ee');F(8,9,5,1,'#f2f2ee');F(15,9,5,1,'#f2f2ee');
  for(const cx of [10.5,17.5]){E(cx,11.5,2.6,2.2,'#161c22');E(cx,11.5,1.9,1.5,'#9ad0e0');F(Math.round(cx)-1,11,1,1,'#ffffff')}F(13,11,2,1,'#161c22');F(13,13,2,2,'#c08a68');E(14,20,8,6.5,'#161c22');E(14,20,7.3,5.8,'#f2f2ee');E(14,17,4,1.3,'#f2f2ee');F(12,18,4,1,'#c8584a');F(9,22,1,2,'#c8c8c0');F(18,22,1,2,'#c8c8c0')}
 else if(who==='윤서'){frame='#ffb070';bg('#101a28','#233a58');BLOB(14,27.5,11,5,'#3a6a9a','#24466a','#5a8aba');F(12,21,4,3,'#f0caa4');E(14,12,10,10,'#161c22');E(14,12,9.2,9.2,'#e8722a');E(23.5,16,3,5.5,'#b04e1a');E(14,14.5,6.6,7,'#f0caa4');F(4,7,20,4,'#3a4a52');E(10,9,2.4,2,'#161c22');E(18,9,2.4,2,'#161c22');E(10,9,1.7,1.4,'#8ad0ff');E(18,9,1.7,1.4,'#8ad0ff');F(9,8,1,1,'#ffffff');F(17,8,1,1,'#ffffff');
  F(7,11,14,2,'#e8722a');F(10,14,2,2,'#2a2a3a');F(16,14,2,2,'#2a2a3a');F(10,14,1,1,'#ffffff');F(16,14,1,1,'#ffffff');F(12,18,4,1,'#c85a5a');F(8,16,2,1,'#f0a898');F(18,16,2,1,'#f0a898')}
 else{frame='#8a8a94';bg('#14141a','#26262e');for(let i=0;i<110;i++)F(Math.floor(RND()*28),Math.floor(RND()*28),1,1,['#3a3a44','#8a8a94','#c8c8d0','#1a1a22'][Math.floor(RND()*4)])}
 x.fillStyle=frame;x.fillRect(0,0,56,2);x.fillRect(0,54,56,2);x.fillRect(0,0,2,56);x.fillRect(54,0,2,56)}

/* ---------- 장면 공용 도구 ---------- */
const S2={
 stars(n,yMax,now,seed){for(let i=0;i<n;i++){const x=(i*97+13+(seed||0))%W,y=(i*53+7)%yMax,a=.25+.55*(.5+.5*Math.sin(now/500+i*1.7));RA(x,y,i%11===0?2:1,i%11===0?2:1,'#e8eeff',a)}},
 ridge(y0,amp,f,ph,col,step){step=step||3;for(let x=0;x<W;x+=step){const h=y0+Math.sin(x*f+ph)*amp+Math.sin(x*f*2.7+ph*1.3)*amp*.4;R(x,h,step,H-h,col)}},
 house(x,y,w,h,wall,roof,win,lit,now,smoke,seed){R(x,y,w,h,'#0c0e14');R(x+1,y+1,w-2,h-1,wall);for(let k=0;k<h;k+=5)R(x+1,y+k,w-2,1,shade(wall,.85));
  for(let k=0;k<=w/2+3;k++){const yy=y-k*.7;R(x-3+k,yy,w+6-k*2,2,k%3===0?shade(roof,.8):roof)}
  R(x+w-9,y-w*.35-6,5,10,shade(wall,.7));if(smoke)for(let i=0;i<6;i++){const ph=((now/1600)+i/6+(seed||0))%1;pcirc(x+w-7+Math.sin(ph*5+i)*4+ph*8,y-w*.35-8-ph*40,2+ph*5,'#c8c8d0',.28*(1-ph))}
  const wx=x+Math.round(w/2)-4,wy=y+Math.round(h*.3);R(wx-1,wy-1,10,10,'#0c0e14');R(wx,wy,8,8,lit?win:'#10162a');if(lit){R(wx,wy,8,1,'#fff0c0');glow(wx+4,wy+4,14,win,.45)}R(wx+3,wy,1,8,'#0c0e14');R(wx,wy+3,8,1,'#0c0e14');
  R(x+4,y+h-12,7,12,shade(wall,.55));R(x+9,y+h-6,1,1,'#ffd166')},
 tower(x,y,h,now,ring){const w=36;R(x-w/2-1,y,w+2,h,'#0c0e14');R(x-w/2,y,w,h,'#2a3150');for(let k=0;k<h;k+=6)for(let i=0;i<w;i+=10)R(x-w/2+((k/6)%2?i:i+5),y+k,1,6,'#20263e');R(x-w/2,y,4,h,'#343c60');
  R(x-w/2-4,y-4,w+8,6,'#3a4270');for(let k=0;k<16;k++)R(x-w/2-2+k*1.2,y-6-k*1.6,w+4-k*2.4,2,k%2?'#1c2240':'#232a4c');R(x-1,y-40,2,14,'#8a94c0');pcirc(x,y-42,2,'#ffd166');
  pcirc(x,y+26,14,'#0c0e14');pcirc(x,y+26,13,'#e8e0c8');pcirc(x,y+26,11,'#fff6dc');for(let i=0;i<12;i++){const a=i*TAU/12;R(x+Math.cos(a)*9.5-.5,y+26+Math.sin(a)*9.5-.5,i%3?1:2,i%3?1:2,'#3a2a1a')}
  line(x,y+26,x,y+17,1,(px,py)=>R(px-1,py,2,1,'#2a1a0a'));line(x,y+26,x+(ring?Math.cos(now/400)*6:0),y+19,1,(px,py)=>R(px,py,1,1,'#2a1a0a'));pcirc(x,y+26,1.5,'#8a6a20');
  R(x-8,y+48,16,16,'#0c0e14');const bs=ring?Math.sin(now/260)*4:0;pcirc(x+bs*.3,y+56,6,'#c9a24a');R(x-6+bs*.3,y+58,12,3,'#8a6a20');if(ring)for(let k=0;k<3;k++){const r=((now/18+k*40)%120);for(let i=0;i<28;i++){const a=i*TAU/28;RA(x+Math.cos(a)*r,y+56+Math.sin(a)*r*.6,2,2,'#ffe79a',.45*(1-r/120))}}},
 fireflies(n,now,y0,y1,col){for(let i=0;i<n;i++){const x=(i*83+Math.sin(now/900+i)*30+now/60*(i%3?1:-1))%W,xx=x<0?x+W:x,y=y0+((i*47)%(y1-y0))+Math.sin(now/400+i)*6;RA(xx,y,2,2,col||'#ffe79a',.35+.35*Math.sin(now/200+i*2))}},
 grass(y,now,col,col2){for(let x=0;x<W;x+=3){const h=4+((x*7)%5),sw=Math.round(Math.sin(now/500+x*.08)*1.2);R(x,y-h,1,h,col);R(x+sw,y-h-1,1,2,col2||col)}},
 title(txt,col,t){ctx.font='bold 12px monospace';ctx.fillStyle=col;ctx.globalAlpha=clamp((t-.4)/1,0,1);ctx.fillText(txt,16,24);ctx.globalAlpha=1}
};

/* ---------- 프롤로그 1: 잠든 시계골 ---------- */
function artVillage2(now,t){skyBands(0,210,'#04070f','#1f2d52',14);S2.stars(110,150,now);
 glow(392,50,60,'#9ab4ff',.5);pcirc(392,50,17,'#e9eefc');pcirc(398,46,14,'#cfd9f2',.45);pcirc(386,55,3,'#c0cbe8');pcirc(395,57,2,'#c0cbe8');
 for(let i=0;i<3;i++){const x=((now/90+i*170)%(W+160))-80;RA(x,40+i*22,80,5,'#1a2440',.5);RA(x+10,36+i*22,50,4,'#1a2440',.4)}
 S2.ridge(150,10,.018,0,'#0f1830');S2.ridge(176,8,.024,2,'#0b1226');
 S2.tower(150,86,120,now,false);
 [[22,178,40,30,'#2a3050','#3a2230'],[70,184,34,26,'#2c2f48','#2a2640'],[208,176,44,34,'#2a3050','#402630'],[262,184,34,26,'#262b44','#302a44'],[304,174,46,36,'#2a3050','#3a2230'],[356,182,36,28,'#2c2f48','#2a2640'],[398,176,44,34,'#262b44','#402630']].forEach(([x,y,w,h,wa,ro],i)=>{S2.house(x,y,w,h,wa,ro,'#ffcf7a',i===4,now,false,i*.3);
  if(i!==4){ctx.font='bold 8px monospace';ctx.fillStyle='#9fb4e8';ctx.globalAlpha=.25+.35*(.5+.5*Math.sin(now/700+i));ctx.fillText('z',x+w/2+6,y-12-((now/70+i*9)%14));ctx.fillText('z',x+w/2+10,y-20-((now/70+i*9+7)%14));ctx.globalAlpha=1}});
 RA(0,196,W,30,'#8fa6d8',.05);RA(0,206,W,12,'#8fa6d8',.05);
 R(0,214,W,H-214,'#070b16');for(let x=0;x<W;x+=3){const h=214-Math.sin(x*.012+1)*6-(x>300?10:0)*Math.min(1,(x-300)/60);R(x,h,3,H-h,'#070b16')}S2.grass(212,now,'#101a2c','#18243a');
 S2.fireflies(14,now,150,215);
 const hx=392,fy=210;RA(hx-16,fy-2,32,4,'#000',.35);heroAt(hx,fy,3,true,null,now/430);drawTick(ctx,hx+30,fy-52+Math.sin(now/300)*3,now,1.6);
 S2.title('시계골 · 종이 멈춘 지 사흘째','#dfe8ff',t)}
/* ---------- 프롤로그 2: 할아버지의 공방 ---------- */
function artWorkshop2(now,t){R(0,0,W,H,'#241710');for(let x=0;x<W;x+=22){R(x,0,1,200,'#1a100a');R(x+11,0,1,200,'#2c1c12')}for(let y=0;y<200;y+=40)R(0,y,W,1,'#1a100a');
 R(0,196,W,H-196,'#3a2618');for(let x=0;x<W;x+=30){R(x,196,1,H-196,'#2a1a10')}R(0,196,W,2,'#4a3220');
 R(346,30,70,86,'#140c08');R(350,34,62,78,'#0b1430');S2.stars(12,70,now,350);pcirc(390,58,9,'#e9eefc');R(380,34,2,78,'#140c08');R(350,72,62,2,'#140c08');RA(350,34,62,78,'#9ab4ff',.06);
 R(20,58,160,6,'#5a3a22');R(20,64,160,2,'#3a2416');R(20,110,160,6,'#5a3a22');R(20,116,160,2,'#3a2416');
 for(let i=0;i<5;i++){const cx=38+i*32;pcirc(cx,44,11,'#161c22');pcirc(cx,44,10,'#c9a24a');pcirc(cx,44,8,'#f4ecd2');R(cx,38,1,6,'#3a2a1a');R(cx,44,4,1,'#3a2a1a')}
 for(let i=0;i<4;i++){const cx=36+i*40,top=74,sw=Math.sin(now/(420+i*37)+i)*.35;R(cx-9,top,18,34,'#4a2e1a');R(cx-7,top+2,14,12,'#f4ecd2');pcirc(cx,top+8,4,'#c9a24a');line(cx,top+15,cx+Math.sin(sw)*14,top+15+Math.cos(sw)*14,1,(x,y)=>R(x,y,1,1,'#c9a24a'));pcirc(cx+Math.sin(sw)*14,top+15+Math.cos(sw)*14,2.5,'#ffd166')}
 for(const [gx,gy,r,sp] of [[250,40,14,1],[272,58,9,-1.6],[236,62,7,2]]){const a=now/1400*sp;pcirc(gx,gy,r,'#3a2a1a');pcirc(gx,gy,r-2,'#6a4a2a');for(let i=0;i<8;i++){const aa=a+i*TAU/8;R(gx+Math.cos(aa)*r-1.5,gy+Math.sin(aa)*r-1.5,3,3,'#6a4a2a')}pcirc(gx,gy,2,'#241710')}
 glow(120,170,150,'#ffcf7a',.32);
 R(44,150,176,34,'#161c22');R(46,152,172,30,'#6a2e2e');for(let i=0;i<5;i++)R(60+i*34,152,2,30,'#5a2424');R(44,146,176,8,'#e6dcc8');R(44,146,176,2,'#f6f0e0');R(40,128,10,60,'#4a2e1a');R(214,138,10,50,'#4a2e1a');
 R(52,136,40,14,'#f6f0e0');R(52,146,40,4,'#d8ccb8');
 drawNPC(ctx,'sun',74,168,2,false,now,{rows:14,sleep:true,still:true});R(44,160,176,24,'#6a2e2e');R(44,158,176,4,'#8a3e3e');for(let i=0;i<6;i++)R(56+i*28,162,2,20,'#5a2424');
 ctx.font='bold 9px monospace';ctx.fillStyle='#e8d8c0';for(let i=0;i<3;i++){const ph=((now/1400)+i/3)%1;ctx.globalAlpha=(1-ph)*.7;ctx.fillText('z',96+ph*18+i*2,136-ph*26)}ctx.globalAlpha=1;
 R(268,168,110,6,'#5a3a22');R(274,174,5,24,'#3a2416');R(368,174,5,24,'#3a2416');R(284,158,20,10,'#8a969c');R(310,160,14,8,'#c9a24a');pcirc(346,160,6,'#3a4a52');
 const lx=330,ly=132;R(lx-1,ly,2,36,'#3a2a1a');pcirc(lx,ly,6,'#ffcf7a');glow(lx,ly,40,'#ffcf7a',.5+.1*Math.sin(now/180));
 for(let i=0;i<18;i++){const x=(i*47+now/80)%W,y=40+((i*29+now/50)%150);RA(x,y,1,1,'#ffe0a0',.3+.3*Math.sin(now/300+i))}
 const hx=258,fy=196;RA(hx-16,fy-2,32,4,'#000',.35);heroAt(hx,fy,3,true,null,now/430);drawTick(ctx,hx-34,fy-60+Math.sin(now/300)*3,now,1.6);
 S2.title('선 할아버지의 공방','#ffe0b0',t)}
/* ---------- 새벽 (챕터 1 엔딩) ---------- */
function artDawn2(now,t){const p=clamp(t/6,0,1);skyBands(0,200,mixc('#2a2c60','#6ab0f0',p),mixc('#ff9a6a','#ffe8c0',p),14);
 const sy=150-p*50;glow(360,sy,90,'#ffd9a0',.6);pcirc(360,sy,24,'#fff0c8');for(let i=0;i<12;i++){const a=i*TAU/12+now/4000;line(360+Math.cos(a)*30,sy+Math.sin(a)*30,360+Math.cos(a)*44,sy+Math.sin(a)*44,3,(x,y)=>RA(x,y,2,2,'#fff0c8',.4))}
 for(let i=0;i<6;i++){const x=((now/50+i*97)%(W+40))-20,y=50+((i*23)%40),f=Math.floor(now/180+i)%2;R(x,y,2,1,'#3a3a5a');R(x-2,y-f,2,1,'#3a3a5a');R(x+2,y-f,2,1,'#3a3a5a')}
 S2.ridge(160,10,.02,1,mixc('#2a3a50','#4a7a6a',p));S2.ridge(182,8,.026,3,mixc('#1c2a38','#3a6a4a',p));
 S2.tower(150,92,110,now,true);
 [[22,184,40,30],[70,190,34,26],[208,182,44,34],[262,190,34,26],[304,180,46,36],[356,188,36,28],[398,182,44,34]].forEach(([x,y,w,h],i)=>S2.house(x,y,w,h,mixc('#4a4a68','#b89a7a',p),mixc('#5a2a30','#b04a3a',p),'#ffcf7a',true,now,true,i*.37));
 drawNPC(ctx,'sun',236,216,2,false,now,{wave:true});
 R(0,218,W,H-218,mixc('#1a2a1a','#3a6a3a',p));S2.grass(218,now,mixc('#223a22','#4a8a3a',p),mixc('#2a4a2a','#7ab84a',p));
 const hx=392,fy=216,jump=Math.abs(Math.sin(now/260))*6;RA(hx-16,fy-2,32,4,'#000',.3);heroAt(hx,fy-jump,3,true,null,now/430);drawTick(ctx,hx-34,fy-56+Math.sin(now/220)*5,now,1.6);
 S2.title('사흘 만의 아침','#fff4d8',t)}
/* ---------- 마지막 열차 (윤서) ---------- */
function artTrain2(now,t){skyBands(0,160,'#2a1236','#ff9a5c',12);glow(360,146,70,'#ffb070',.55);pcirc(360,146,28,'#ffd9a0');
 for(let i=0;i<4;i++){const x=((now/120+i*140)%(W+100))-50;RA(x,30+i*18,90,4,'#6a2a4a',.4)}
 S2.ridge(132,12,.025,0,'#1c0f26');R(0,150,W,H-150,'#150c1c');
 for(let x=0;x<W;x+=12)R(x,176,6,26,'#2a1c30');R(0,178,W,3,'#8a7a90');R(0,190,W,3,'#8a7a90');
 const tx=110+Math.max(0,t-2.5)*Math.max(0,t-2.5)*24,dk='#0f0814';
 for(let c=0;c<5;c++){const x=tx+c*70;R(x,140,64,40,'#161c22');R(x+1,141,62,38,'#3a2a44');R(x+1,141,62,3,'#5a4a64');for(let w=0;w<4;w++){R(x+5+w*15,150,11,10,'#ffcf7a');R(x+5+w*15,150,11,2,'#fff0c0');if((w+c)%3===0)RA(x+8+w*15,153,4,7,'#1a1020',.8)}R(x,178,64,4,'#1a1020');pcirc(x+14,186,6,'#1a1020');pcirc(x+50,186,6,'#1a1020');pcirc(x+14,186,3,'#5a4a64');pcirc(x+50,186,3,'#5a4a64')}
 R(tx+350,128,40,52,'#161c22');R(tx+351,129,38,50,'#4a3a54');R(tx+376,112,12,18,'#161c22');for(let i=0;i<10;i++)pcirc(tx+382-i*12-(now/30+i*20)%20,104-i*6,5+i*.8,'#5a4a64',.4-i*.035);
 R(0,196,200,10,'#4a3a54');R(0,196,200,2,'#6a5a74');R(0,206,200,90,'#22162a');
 drawNPC(ctx,'yun',70,198,2,false,now,{wave:true});
 for(const [cx,s2,fl] of [[110,1.4,true],[132,1.2,true],[150,1.3,true]])heroAt(cx,198,s2,fl,null,now/400+cx);
 R(34,168,3,28,'#161c22');pcirc(35,166,5,'#ffcf7a');glow(35,166,24,'#ffcf7a',.5);
 S2.title('마지막 열차 · 삼백 년 전','#ffd9a0',t)}
/* ---------- 파트 2 시작 / 끝 ---------- */
function artPart2Intro2(now,t){const p=clamp(t/8,0,1);skyBands(0,200,mixc('#0d1a20','#3a5a52',p*.6),mixc('#182e35','#6a8a6a',p*.6),12);S2.stars(40,100,now);
 for(let i=0;i<7;i++){const x=40+i*70,h=40+((i*37)%30);R(x,176-h,10,h,'#0e1a18');pcirc(x+5,176-h,12,'#0e1a18')}
 S2.ridge(176,6,.03,2,'#12201e');
 for(let i=0;i<3;i++){const x=260+i*60,h=24+i*10;for(let j=0;j<h;j+=2){const w=3+Math.sin(j*.3+now/400+i)*2;R(x+Math.sin(j*.2+i)*6,176-j,w,2,'#1a2a18')}}
 for(let i=0;i<5;i++){const x=(i*97+now/80)%W;RA(x,170-(i%3)*8,2,2,'#caff6b',.4+.3*Math.sin(now/300+i))}
 R(0,200,W,H-200,'#1a2622');S2.grass(200,now,'#22342c','#2e4a3a');
 R(0,182,150,18,'#2a3a40');R(0,182,150,2,'#3a4a54');for(let x=0;x<150;x+=14)R(x,172,4,10,'#2a3a40');
 const walk=clamp((t-.5)/5,0,1),hx=lerp(60,230,walk),fy=200;RA(hx-16,fy-2,32,4,'#000',.3);heroAt(hx,fy,3,false,walk<1?now/1000*9:null,now/430);drawTick(ctx,hx+34,fy-56+Math.sin(now/300)*3,now,1.6);
 S2.title('한 달 뒤 · 시계골 바깥','#cfe8e0',t)}
function artPart2End2(now,t){const p=clamp(t/9,0,1),q=Math.pow(p,.8);skyBands(0,200,mixc('#141a48','#5aa0e8',q),mixc('#3a3878','#ffe0a8',q),14);
 const sy=160-q*70;glow(240,sy,100,'#ffe8b0',.55);pcirc(240,sy,26,'#fff4d8');
 S2.ridge(168,10,.02,1,mixc('#1a2240','#4a7a6a',q));S2.tower(120,96,110,now,true);
 [[200,186,40,30],[252,190,34,26],[300,182,44,34],[352,190,36,26],[400,184,44,32]].forEach(([x,y,w,h],i)=>S2.house(x,y,w,h,mixc('#3a3a58','#b89a7a',q),mixc('#4a2a30','#b04a3a',q),'#ffcf7a',true,now,true,i*.4));
 R(0,218,W,H-218,mixc('#1a2a1a','#3a6a3a',q));S2.grass(218,now,mixc('#223a22','#4a8a3a',q),mixc('#2a4a2a','#7ab84a',q));
 drawNPC(ctx,'sun',300,218,2,false,now,{});heroAt(340,218,3,true,null,now/430);drawTick(ctx,368,160+Math.sin(now/260)*4,now,1.6);
 for(let i=0;i<8;i++){const ph=((now/3000)+i/8)%1;RA(40+i*52+Math.sin(ph*6)*10,200-ph*120,2,2,'#fff0c8',.5*(1-ph))}
 S2.title('평온한 아침','#fff4d8',t)}
/* ---------- 회상: 문지기 / 수평선 — 윤서 등장 ---------- */
const _artGate0=typeof artGatehall==='function'?artGatehall:null,_artHor0=typeof artHorizonwatch==='function'?artHorizonwatch:null;
function artGatehall2(now,t){_artGate0(now,t);drawNPC(ctx,'yun',96,236,2.4,false,now,{})}
function artHorizon2(now,t){_artHor0(now,t);drawNPC(ctx,'yun',128,180,1.6,false,now,{})}

/* ---------- 동굴 입장 연출: 걷는 하루 ---------- */
function caveWalkIn(now,t,vx,vy){const t0=.25,t1=1.9,m=SCN&&/^cave(\d+)$/.exec(SCN.art),ci=m?+m[1]:-1;
 if(ci>=0&&ci<10){const B=BOSSES[ci],a=clamp((t-.6)/1.2,0,1),u=2,g=geo(B,vx,vy-2,u);if(a>0){ctx.globalAlpha=a*.85;drawMech(ctx,B,vx,vy-2,now,{dorm:true},u);ctx.globalAlpha=1;const pu=.5+.5*Math.sin(now/350);for(const d of [-3,3]){glow(vx+d,g.headY+2,6,'#ff4d6d',a*(.5+.4*pu));R(vx+d-1,g.headY+1,2,2,'#ffb0bd')}}}
 if(t<t0)return;const k=clamp((t-t0)/(t1-t0),0,1),e=k*k*(3-2*k);
 const x=lerp(W/2,vx,e),y=lerp(H-10,vy+10,e),s=lerp(3.4,.9,e),a=k>.88?(1-k)/.12:1;
 ctx.globalAlpha=Math.max(0,a);RA(x-8*s,y-1,16*s,3*s,'#000',.4);drawKnight(ctx,x-6*s,y-11*s,s,false,k<1?now/1000*10:null,now/430);
 drawTick(ctx,x+12*s,y-16*s+Math.sin(now/200)*s,now,Math.max(.5,s*.55));ctx.globalAlpha=1}
/* ---------- 파트 2 입구: 생태계 풍경 + 멀리 도사리는 괴수 ---------- */
const BIOME2={10:{sky:['#0e140a','#3a4a22'],far:'#1a2410',mid:'#231a10',gnd:'#1a140c',fx:'#9bff5a',prop:'root'},11:{sky:['#140c1e','#4a3060'],far:'#241a34',mid:'#2e1f40',gnd:'#1c1428',fx:'#caff6b',prop:'shroom'},12:{sky:['#07140f','#1f4a3a'],far:'#0f261c',mid:'#12301f',gnd:'#0a1a12',fx:'#8fd6b8',prop:'reed'},
 13:{sky:['#161410','#6a5a48'],far:'#2a241c',mid:'#3a3228',gnd:'#211c16',fx:'#fff7dd',prop:'bone'},14:{sky:['#120a16','#4a2a50'],far:'#24142a',mid:'#2e1a34',gnd:'#180e1c',fx:'#f0b8ff',prop:'web'},15:{sky:['#1a1206','#8a6a20'],far:'#3a2a0c',mid:'#4a3810',gnd:'#261c08',fx:'#fff0a0',prop:'hive'},
 16:{sky:['#0e0818','#4a2a6a'],far:'#1e1230',mid:'#2a1840',gnd:'#140c20',fx:'#7de0ff',prop:'crystal'},17:{sky:['#030814','#123a5e'],far:'#081a30',mid:'#0a2440',gnd:'#040c1a',fx:'#7ab8f0',prop:'water'},18:{sky:['#101012','#5a4a44'],far:'#221e1e',mid:'#2a2626',gnd:'#141214',fx:'#ff8a3a',prop:'ash'},
 19:{sky:['#12040a','#6a1a2a'],far:'#2a0a14',mid:'#3a0e1c',gnd:'#1a060c',fx:'#ff3a5d',prop:'flesh'}};
function biomeProp(k,x,y,s,now,i){switch(k){
 case 'root':for(let j=0;j<5;j++)line(x,y,x+Math.cos(-1.8+j*.35)*26*s,y+Math.sin(-1.8+j*.35)*26*s,2,(px,py)=>R(px-1,py-1,3,3,'#2a1c10'));R(x-3*s,y-30*s,6*s,30*s,'#2a1c10');break;
 case 'shroom':R(x-2*s,y-14*s,4*s,14*s,'#8a70a0');pcirc(x,y-14*s,10*s,'#4a2a60');pcirc(x-3*s,y-16*s,2*s,'#caff6b',.7);break;
 case 'reed':for(let j=0;j<4;j++){const sw=Math.sin(now/500+i+j)*2;line(x+j*3*s,y,x+j*3*s+sw,y-(20+j*4)*s,2,(px,py)=>R(px,py,2,2,'#1e4a32'))}break;
 case 'bone':R(x-2*s,y-24*s,4*s,24*s,'#bdb4a0');pcirc(x,y-26*s,5*s,'#e8e2c8');R(x-2*s,y-27*s,1.5*s,1.5*s,'#140e08');R(x+.5*s,y-27*s,1.5*s,1.5*s,'#140e08');break;
 case 'web':for(let j=0;j<6;j++){const a=j*TAU/6;line(x,y-20*s,x+Math.cos(a)*18*s,y-20*s+Math.sin(a)*18*s,2,(px,py)=>RA(px,py,1,1,'#f0e0ff',.4))}for(const r of [6,12])for(let j=0;j<18;j++){const a=j*TAU/18;RA(x+Math.cos(a)*r*s,y-20*s+Math.sin(a)*r*s,1,1,'#f0e0ff',.4)}break;
 case 'hive':pcirc(x,y-16*s,12*s,'#6e5a1a');pcirc(x-2*s,y-18*s,10*s,'#b08a28');for(let j=0;j<4;j++)R(x-10*s,y-24*s+j*4*s,20*s,1,'#6e5a1a');R(x-2*s,y-12*s,4*s,3*s,'#1a1206');break;
 case 'crystal':for(let j=0;j<3;j++){const hh=(18+j*8)*s,xx=x+(j-1)*7*s;for(let q=0;q<hh;q+=2){const w=5*s*(1-q/hh)+1;R(xx-w/2,y-q,w,2,q>hh*.6?'#e8fbff':'#5ac8e8')}}glow(x,y-16*s,14*s,'#7de0ff',.3);break;
 case 'water':RA(x-20*s,y-2,40*s,3,'#7ab8f0',.3+.2*Math.sin(now/400+i));break;
 case 'ash':R(x-2*s,y-22*s,4*s,22*s,'#1a1414');line(x,y-16*s,x+10*s,y-24*s,2,(px,py)=>R(px,py,2,2,'#1a1414'));pcirc(x+6*s,y-10*s,2*s,'#ff8a3a',.5+.3*Math.sin(now/120+i));break;
 case 'flesh':pcirc(x,y-8*s,10*s,'#4a1a2a');pcirc(x,y-10*s,4*s,'#f8e8f0');pcirc(x+Math.sin(now/700+i)*1.5*s,y-10*s,2*s,'#b83aff');break}}
function approachHorizon(now,B,y0){const bi=BOSSES.indexOf(B),Z=BIOME2[bi]||BIOME2[10];
 skyBands(0,y0+10,Z.sky[0],Z.sky[1],12);
 const g=geo(B,W/2,y0-6,3.4);ctx.globalAlpha=.9;drawBeast(ctx,B,W/2,y0-6,now,{sil:true},3.4);ctx.globalAlpha=1;
 const an=ANAT[bi];if(an&&an.eye){const ex=W/2+an.eye[0]*3.4,ey=y0-6+an.eye[1]*3.4,pu=.5+.5*Math.sin(now/400);for(const d of [-5,5]){glow(ex+d,ey,8,Z.fx,.5+.3*pu);R(ex+d-1,ey-1,3,2,'#ffffff')}}
 RA(0,y0-40,W,50,Z.sky[1],.35);
 S2.ridge(y0-4,6,.03,bi,Z.far,4);
 for(let i=0;i<9;i++)biomeProp(Z.prop,(i*61+17)%W,y0+8+((i*13)%10),.6,now,i);
 S2.ridge(y0+10,4,.05,bi*2,Z.mid,4);
 R(0,y0+20,W,H-y0-20,Z.gnd);for(let i=0;i<30;i++)RA((i*71)%W,y0+24+((i*37)%(H-y0-30)),3,1,Z.mid,.8);
 for(let i=0;i<4;i++)biomeProp(Z.prop,[30,110,370,450][i],H-4,1.6,now,i+20);
 for(let i=0;i<14;i++){const ph=((now/2600)+i/14)%1;RA((i*67+Math.sin(ph*6+i)*20)%W,H-20-ph*170,2,2,Z.fx,.5*(1-ph))}}
/* 회상 장면: 지금의 하루와 똑딱이 지켜보는 구도 */
function witness(now,x,fy,fl){RA(x-16,fy-2,32,4,'#000',.35);heroAt(x,fy,3,fl,null,now/430);drawTick(ctx,x+(fl?-34:34),fy-58+Math.sin(now/280)*3,now,1.6)}
const _WIT={};['watch','truth','coreseal','rootdeep','abyssecho'].forEach(k=>{const f=ART[k];if(f)_WIT[k]=(now,t)=>{f(now,t);RA(0,H-70,W,70,'#000',.25);witness(now,k==='watch'||k==='truth'?420:60,236,k==='watch'||k==='truth')}});
Object.assign(ART,_WIT);
Object.assign(ART,{village:artVillage2,workshop:artWorkshop2,dawn:artDawn2,train:artTrain2,part2intro:artPart2Intro2,part2end:artPart2End2,gatehall:artGatehall2,horizonwatch:artHorizon2});
/*STORY2_END*/
/*UPD3_BEGIN*/
