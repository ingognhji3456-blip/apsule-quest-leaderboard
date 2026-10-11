/* ================= v158 잔디 위 풀 · 꽃 (GR158) =================
   - 넓은 광장(PB156)의 잔디밭(달빛 정원 · 숲속 캠프 · 풍차 언덕 · 회전목마 마당 · 별빛 호수)에 풀포기 · 꽃을 하나하나 심는다.
   - 그림은 한 칸씩 찍은 도트(아래 SPR 글자 격자, 글자 = 색). 풀 6가지 · 꽃 10가지.
   - 바람: 그림마다 살랑이는 8장(위로 갈수록 더 기울게)을 미리 그려 두고, 자리 · 시간에 따라 장을 고른다(바람이 물결처럼 지나감).
     사람이 바로 옆을 지나가면 풀이 옆으로 눕는다.
   - 화면에 보이는 칸(120px 구역)만 그린다. under 뒤(바닥 바로 위)에 그려서 사람 · 물체는 그 위에 온다. */
(()=>{try{
 const z=window.PLZ111,A=window.PLZART,PB=window.PB156;if(!z||!A||!PB||!z.B)return;
 const TAU=Math.PI*2,B=z.B;
 /* ---------- 도트 그림 (. = 빈칸) ---------- */
 const PAL={g:'#2f6a2c',G:'#4c9a3c',l:'#7cc85a',d:'#1e4a22',y:'#c8d860',
  r:'#e8344a',R:'#ff7a8a',w:'#f4f4ec',W:'#ffffff',o:'#ffd23a',O:'#ff9a2a',b:'#5a8aff',B:'#a8c8ff',p:'#a86ae8',P:'#d8b0ff',k:'#ff8ad0',K:'#ffd0ec',c:'#ffe070',n:'#6a3a1a'};
 const SPR=[
  /* 풀 6 */
  ['..l....l..','..G.l..G..','.lG.G.lG..','.GG.G.GG.l','.Gg.GgGg.G','gGg.gGg.gG','gdg.ggd.gg','dgdgdgdgdd'],
  ['....l....','..l.G..l.','..G.G..G.','.lG.Gg.Gl','.GgGgg.gG','.gggdg.gd','ddgdgdgdd'],
  ['.l...','.G.l.','lG.G.','GgGg.','gggdg','ddgdd'],
  ['...y...','..lG.l.','l.GG.G.','G.Gg.Gl','GgggGgG','dgdgdgd'],
  ['..l.....l.','..G..l..G.','.lG..G.lG.','.Gg.lGgGg.','lggGGggggl','ggdgdgdggg','dddgdgdddd'],
  ['.l.l.','lGlG.','GgGgl','ggggG','ddgdd'],
  /* 꽃 10 */
  ['..R..','.RrR.','RrcrR','.RrR.','..G..','.lG..','..Gl.','.gG..','ddgdd'],/* 빨간 꽃 */
  ['..w..','.wWw.','wWcWw','.wWw.','..G..','..Gl.','.lG..','..g..','.dgd.'],/* 데이지 */
  ['.ooo.','oOcOo','oc.co','oOcOo','.ooo.','..G..','.lGl.','..G..','.dgd.'],/* 해바라기 */
  ['.B.B.','BbBbB','.bbb.','..G..','.lG..','..Gl.','..g..','.dgd.'],/* 파란 꽃 */
  ['..P..','.PpP.','.pPp.','.PpP.','..p..','..G..','.lGl.','..G..','.dgd.'],/* 라벤더 */
  ['.K.K.','KkKkK','.kkk.','..k..','.lG..','..G..','.dgd.'],/* 분홍 클로버 */
  ['r...r','rr.rr','.rGr.','..G..','.lGl.','..G..','.dgd.'],/* 튤립 */
  ['..o..','.oco.','..o..','..G.w','.lGWw','..G.w','.dgd.'],/* 노랑+흰 */
  ['.w.w.w','wcwcwc','.G.G.G','.GlG.G','.gGgG.','dgdgd.'],/* 작은 흰 꽃 무리 */
  ['..k..','.kKk.','kKcKk','.kKk.','..k..','..G..','.lG..','..G..','..g..','.dgd.']/* 큰 분홍 꽃 */];
 const NG=6,NF=SPR.length-NG,FR=8,PX=3;/* 바람 장 수 · 한 칸 크기(그림 판) */
 const FRAMES=SPR.map(rows=>{const h=rows.length,w=Math.max(...rows.map(r=>r.length)),out=[];
  for(let f=0;f<FR;f++){const sw=Math.sin(f/FR*TAU)*1.6,cv=document.createElement('canvas');cv.width=(w+4)*PX;cv.height=h*PX;const o=cv.getContext('2d');
   rows.forEach((r,y)=>{const k=(h-1-y)/(h-1||1),dx=Math.round(sw*k*k*PX)/PX;for(let x=0;x<r.length;x++){const ch=r[x];if(ch==='.')continue;o.fillStyle=PAL[ch];o.fillRect(Math.round((x+2+dx)*PX),y*PX,PX,PX)}});
   /* 빛 · 그늘 한 겹: 칸 위쪽 밝게 */o.globalCompositeOperation='source-atop';const g=o.createLinearGradient(0,0,cv.width,cv.height);g.addColorStop(0,'rgba(255,255,220,.18)');g.addColorStop(1,'rgba(0,0,0,.18)');o.fillStyle=g;o.fillRect(0,0,cv.width,cv.height);
   out.push(cv)}return {w:w+4,h,fr:out}});
 /* ---------- 심을 곳 ---------- */
 let sd=4242;const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647;
 const inEl=(x,y,cx,cy,rx,ry)=>{const a=(x-cx)/rx,b=(y-cy)/ry;return a*a+b*b<1};
 const LAWN=[[960,176,1520,600],[-560,760,120,1240],[120,760,300,1240],[660,760,960,1240],[960,760,1520,1240]];
 const P0=PB.POND,L0=PB.LAKE,C0=PB.CARO,F0=PB.FIRE;
 function ok(x,y){if(x<B.x0+16||x>B.x1-16||y>B.y1-18||y<z.TOPY+14)return false;
  if(z.blocked&&z.blocked(x,y))return false;
  if(x>=960&&y<600){if(y>585)return false;if(y>366&&y<408&&x<P0.x-P0.rx-20)return false;if(x>1082&&x<1118)return false;if(inEl(x,y,P0.x,P0.y,P0.rx+44,P0.ry+40))return false;
   for(const [bx,by,bw] of [[990,200,120],[1360,200,120],[1000,470,90],[1400,500,90]])if(x>bx-4&&x<bx+bw+4&&y>by-4&&y<by+30)return false;if(x>1426&&y<214)return false}
  if(y>=760){if(x>=960&&inEl(x,y,L0.x,L0.y,L0.rx+50,L0.ry+44))return false;if(x>=660&&x<960&&inEl(x,y,C0.x,C0.y,C0.r+66,(C0.r+66)/1.6))return false;if(x>792&&x<828&&y<C0.y)return false;
   if(x>192&&x<228&&y<884)return false;if(x<120&&inEl(x,y,F0.x,F0.y,120,74))return rnd()<.15;if(Math.abs(x-120)<3||Math.abs(x-300)<5||Math.abs(x-660)<5||Math.abs(x-960)<3)return false}
  return true}
 const CELL=120,GRID={};let total=0;
 function plant(){for(const [x0,y0,x1,y1] of LAWN){const area=(x1-x0)*(y1-y0),n=Math.round(area/230),meadow=x0===120;
   for(let i=0;i<n;i++){const x=x0+rnd()*(x1-x0),y=y0+rnd()*(y1-y0);if(!ok(x,y))continue;
    const fl=rnd()<(meadow?.45:x0===960&&y0===176?.28:.14);const s=fl?NG+Math.floor(rnd()*NF):Math.floor(rnd()*NG);
    const k=Math.floor(x/CELL)+','+Math.floor(y/CELL);(GRID[k]||(GRID[k]=[])).push({x:Math.round(x),y:Math.round(y),s,ph:rnd(),fl:fl?1:0});total++}}
  for(const k in GRID)GRID[k].sort((a,b)=>a.y-b.y)}
 plant();
 /* ---------- 그리기 ---------- */
 function draw(c,now,cam){const t=now/1000,S=z.S,ppl=[[P.x,P.y]];for(const k in S.O){const M=S.O[k];if(M.sx!=null)ppl.push([M.sx,M.sy])}
  const cx0=Math.floor((cam.x-20)/CELL),cx1=Math.floor((cam.x+W+20)/CELL),cy0=Math.floor((cam.y-10)/CELL),cy1=Math.floor((cam.y+H+20)/CELL);c.imageSmoothingEnabled=false;
  for(let gy=cy0;gy<=cy1;gy++)for(let gx=cx0;gx<=cx1;gx++){const L=GRID[gx+','+gy];if(!L)continue;
   for(const p of L){if(p.x<cam.x-12||p.x>cam.x+W+12||p.y<cam.y-4||p.y>cam.y+H+14)continue;const F=FRAMES[p.s];
    /* 바람 물결: 시간 + 자리 → 장 */let ph=(t*.55-p.x*.004-p.y*.002+p.ph*.25)%1;if(ph<0)ph+=1;let f=Math.floor(ph*FR);
    /* 사람이 밟고 지나가면 옆으로 눕기 */let push=0;for(const [qx,qy] of ppl){const dx=p.x-qx,dy=(p.y-qy)*1.8;if(dx*dx+dy*dy<64){push=dx<0?-1:1;break}}
    if(push)f=push>0?2:6;/* 장 2 = 오른쪽, 6 = 왼쪽으로 가장 기운 모양 */
    c.drawImage(F.fr[f],p.x-F.w/2,p.y-F.h+1,F.w,F.h)}}
  c.imageSmoothingEnabled=true}
 {const f=A.under;A.under=function(c,now,cam){f.apply(this,arguments);try{draw(c,now,cam)}catch(e){}}}
 window.GR158={v:1,SPR,PAL,GRID,total:()=>total};
}catch(e){console.error('v158 grass',e)}})();
