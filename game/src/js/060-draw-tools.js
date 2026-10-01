/* ================= 그리기 도구 ================= */
var _cx=null;
const R=(x,y,w,h,c)=>{const q=_cx||ctx;q.fillStyle=c;q.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)))};
const RA=(x,y,w,h,c,a)=>{const q=_cx||ctx;q.globalAlpha=a;R(x,y,w,h,c);q.globalAlpha=1};
function pcirc(cx,cy,r,c,a=1,cc){cc=cc||_cx||ctx;cc.globalAlpha=a;cc.fillStyle=c;for(let y=-r;y<r;y++){const dx=Math.sqrt(Math.max(0,r*r-(y+.5)*(y+.5)));cc.fillRect(Math.round(cx-dx),Math.round(cy+y),Math.max(1,Math.round(dx*2)),1)}cc.globalAlpha=1}
function shade(hex,f){const n=parseInt(hex.slice(1),16),r=(n>>16&255)*f,g=(n>>8&255)*f,b=(n&255)*f;return '#'+[r,g,b].map(v=>Math.round(clamp(v,0,255)).toString(16).padStart(2,'0')).join('')}
const KN=['....HHHH....','...HAAAAH...','...HAEEAH...','...HAAAAH...','....SSS.....','..CCBBBCC...','.CCCBBBBCC..','..CCBBBBC...','...BBBBB....','...B...B....','..DD...DD...'],KP={H:'#e4e9cd',A:'#8ea9aa',E:'#233c47',S:'#dbc28e',C:'#5fb69d',B:'#397c76',D:'#2c444b'};
function drawKnight(c,x,y,s,fl,wt,idleT){const bob=wt!=null?-Math.abs(Math.round(Math.sin(wt)*1)):(idleT!=null?Math.round(Math.sin(idleT)*.6):0);for(let j=0;j<KN.length;j++)for(let i=0;i<KN[j].length;i++){const k=KN[j][i];if(k!=='.'){let ox=0;if(wt!=null&&j>=9){const leftFoot=i<6,ph=Math.sin(wt+(leftFoot?0:Math.PI));ox=Math.round(ph*1.4)}c.fillStyle=KP[k];c.fillRect(Math.round(x+(fl?(11-i):i)*s+ox*s),Math.round(y+j*s+bob*s),s,s)}}}
function lungeOffset(now){if(!P.lungeT)return[0,0];const k=(now-P.lungeT)/(P.lungeDur||120);if(k>=1)return[0,0];const m=Math.sin(Math.min(1,k)*Math.PI)*4.2;return[Math.cos(P.lungeA)*m,Math.sin(P.lungeA)*m*.7]}
function drawSword(x,y,s,fl,now){const swing=P.lungeT?(now-P.lungeT)/(P.lungeDur||120):2,active=swing>=0&&swing<1;
 const hiltCol='#8a6b45',bladeCol='#eef4f6',edgeCol='#aab6bb',dirS=fl?-1:1;
 const hx=x+(fl?.5:11.5)*s,hy=y+5.5*s,ang=active?dirS*(-1.15+Math.min(1,swing)*2.1):dirS*.9,L=10*s;
 const bx=hx+Math.cos(ang)*L,by=hy+Math.sin(ang)*L;
 R(hx-1,hy-1,s+1,s+1,hiltCol);line(hx,hy,bx,by,2,(px,py)=>R(px-1,py-1,2,2,bladeCol));R(bx-1,by-1,2,2,edgeCol);
 if(active&&swing>.12&&swing<.88){const ang2=dirS*(-1.15+Math.max(0,swing-.12)*2.1),bx2=hx+Math.cos(ang2)*L*.75,by2=hy+Math.sin(ang2)*L*.75;RA(bx2-1,by2-1,2,2,'#ffffff',.3)}}
function line(x0,y0,x1,y1,step,fn){const n=Math.max(1,Math.floor(Math.hypot(x1-x0,y1-y0)/step));for(let i=0;i<=n;i++)fn(x0+(x1-x0)*i/n,y0+(y1-y0)*i/n,i)}

