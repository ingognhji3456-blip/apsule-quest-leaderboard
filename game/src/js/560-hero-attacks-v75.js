/* ================= 주인공 공격 다양화 v75: 가로베기 · 올려베기 · 찌르기 · 십자베기 · 회전베기 · 검기 · 연속베기 · 필살 ================= */
const PAK={list:[],n:0};
const PA_MOVES=['h','up','thrust','x','beam','spin','multi'];
const PA_NAME={h:'가로베기',up:'올려베기',thrust:'찌르기',x:'십자베기',beam:'검기',spin:'회전베기',multi:'연속베기',fin:'필살 · 성광 십자참'};
function paArc(cx,cy,r,a0,a1,th,col,hi,a,rev){const n=Math.max(8,Math.round(Math.abs(a1-a0)*r/2));for(let i=0;i<=n;i++){const u=i/n,ang=a0+(a1-a0)*(rev?1-u:u),taper=Math.sin(u*Math.PI),w=Math.max(1,Math.round(th*taper));for(let k=0;k<w;k++){const rr=r-k;cPx(cx+Math.cos(ang)*rr,cy+Math.sin(ang)*rr,2,k===0?hi:col,a)}}}
function paAdd(o){o.t=performance.now();PAK.list.push(o);if(PAK.list.length>24)PAK.list.shift()}
{const _da=doAttack;doAttack=function(point){const sw=G&&G.swings,res=_da.apply(this,arguments);
 try{if(mode==='boss'&&G&&G.swings>sw){const now=performance.now(),s=G.slashFx[G.slashFx.length-1],sh=G.shots[G.shots.length-1];if(!s||now-s.t>30)return res;
  G.slashFx.pop();if(sh&&now-sh.t<30)G.shots.pop();const fin=!!s.fin,jd=sh?sh.jd:'HIT',perf=jd==='PERFECT'||fin,col=s.col||'#ffffff';
  const mv=fin?'fin':PA_MOVES[PAK.n++%PA_MOVES.length],a=Math.atan2(s.y-(P.y-8),s.x-P.x);
  paAdd({mv,x:s.x,y:s.y,sx:P.x,sy:P.y-8,a,perf,col:perf?'#ffe79a':col,fin});
  P.lungeMag={thrust:11,beam:2,spin:3,fin:14,multi:6}[mv]||6;
  const f={h:[520,.07,'sawtooth'],up:[620,.07,'sawtooth'],thrust:[900,.05,'square'],x:[480,.09,'sawtooth'],beam:[1100,.14,'sine'],spin:[380,.16,'sawtooth'],multi:[700,.04,'square'],fin:[240,.3,'sawtooth']}[mv];sfx(f[0],f[1],f[2],.03,f[0]*.4);if(mv==='multi'){sfx(760,.04,'square',.025,300);setTimeout(()=>sfx(820,.04,'square',.025,320),60)}}}catch(e){}return res}}
{const _lo=lungeOffset;lungeOffset=function(now){if(!P.lungeT)return[0,0];const k=(now-P.lungeT)/(P.lungeDur||120);if(k>=1)return[0,0];const m=Math.sin(Math.min(1,k)*Math.PI)*(P.lungeMag||4.2);return[Math.cos(P.lungeA)*m,Math.sin(P.lungeA)*m*.7]}}
function paDraw(now){PAK.list=PAK.list.filter(o=>now-o.t<(o.fin?700:380));
 for(const o of PAK.list){const d=now-o.t,dur=o.fin?700:380,k=d/dur,rev=clamp(k/.35,0,1),fade=k<.35?1:1-(k-.35)/.65,R0=o.perf?1.2:1,c=o.col,x=o.x,y=o.y,a=o.a;
  switch(o.mv){
  case 'h':paArc(x,y,Math.round(32*R0),a-1.3,a-1.3+2.6*rev,5,c,'#ffffff',fade);break;
  case 'up':paArc(x-2,y+6,Math.round(34*R0),Math.PI*.95,Math.PI*.95+2.2*rev,6,c,'#ffffff',fade,false);break;
  case 'thrust':{const L=Math.round(58*R0*Math.min(1,k*5)),ex=x+Math.cos(a)*18,ey=y+Math.sin(a)*18;line(o.sx,o.sy,ex,ey,3,(px,py,i)=>{cPx(px,py,i%2?2:3,c,fade*.7)});line(o.sx,o.sy,ex,ey,2,(px,py)=>cPx(px,py,1,'#ffffff',fade));
   for(let i=1;i<=3;i++){const gx=lerp(o.sx,x,i/4),gy=lerp(o.sy,y,i/4);cPx(gx,gy+6,8-i,c,fade*.25)}if(k<.5){cRing(ex,ey,4+k*30,'#ffffff',(.5-k)*2,1);cStar(ex,ey,Math.round(10*(1-k*2))+2,'#ffffff',1)}void L;break}
  case 'x':paArc(x,y,Math.round(30*R0),-2.4,-2.4+1.6*rev,5,c,'#ffffff',fade);if(k>.12)paArc(x,y,Math.round(30*R0),-.7,-.7+1.6*clamp((k-.12)/.3,0,1),5,c,'#ffffff',fade);if(k>.3&&k<.55)cStar(x,y,12,'#ffffff',1);break;
  case 'beam':{const q=Math.min(1,k/.45),bx=lerp(o.sx,x,q),by=lerp(o.sy,y,q);if(q<1){paArc(bx-Math.cos(a)*10,by-Math.sin(a)*10,14,a-1,a+1,5,c,'#ffffff',1);for(let i=1;i<4;i++)cPx(bx-Math.cos(a)*i*9,by-Math.sin(a)*i*9,4-i,c,.6)}else{paArc(x-Math.cos(a)*10,y-Math.sin(a)*10,14+(k-.45)*50,a-1,a+1,4,c,'#ffffff',fade);cRing(x,y,6+(k-.45)*60,c,fade,2)}break}
  case 'spin':{const r=Math.round(26*R0);paArc(x,y,r,a,a+TAU*rev,4,c,'#ffffff',fade);if(k>.3)for(let i=0;i<6;i++){const t=i*TAU/6+k*4;cPx(x+Math.cos(t)*(r+6+k*20),y+Math.sin(t)*(r+6+k*20),2,'#ffffff',fade)}break}
  case 'multi':for(let i=0;i<3;i++){const ki=clamp((k-i*.12)/.35,0,1);if(ki<=0)continue;const aa=-1.9+i*1.3,ox=(i-1)*6,oy=(i%2?-5:4);paArc(x+ox,y+oy,18,aa,aa+1.8*ki,3,c,'#ffffff',Math.min(1,fade*1.2))}break;
  case 'fin':{const q=clamp(k/.25,0,1);/* 주인공 잔상이 보스까지 돌진 */for(let i=0;i<6;i++){const u=i/6*q,gx=lerp(o.sx,x,u),gy=lerp(o.sy,y,u);R(Math.round(gx-4),Math.round(gy-6),8,14,'#a6f5c6');RA(Math.round(gx-4),Math.round(gy-6),8,14,'#ffffff',.3)}
   if(k>.2){const kk=clamp((k-.2)/.3,0,1),ff=k<.6?1:1-(k-.6)/.4;paArc(x,y,40,-2.5,-2.5+2*kk,8,'#ffe79a','#ffffff',ff);paArc(x,y,40,-.64,-.64+2*kk,8,'#ffe79a','#ffffff',ff);if(k>.35){for(let i=0;i<12;i++){const t=i*TAU/12,r0=20+(k-.35)*60;line(x+Math.cos(t)*r0,y+Math.sin(t)*r0,x+Math.cos(t)*(r0+16),y+Math.sin(t)*(r0+16),2,(px,py)=>cPx(px,py,2,i%2?'#ffffff':'#ffe79a',ff))}}}
   if(k>.2&&k<.3)RA(AX,AY,AW,AH,'#ffffff',.25);
   ctx.font='900 12px monospace';ctx.textAlign='center';ctx.globalAlpha=clamp(k<.2?0:k>.8?(1-k)/.2:1,0,1);ctx.lineWidth=3;ctx.strokeStyle='#05070a';ctx.strokeText(PA_NAME.fin,x,y-52);ctx.fillStyle='#ffe79a';ctx.fillText(PA_NAME.fin,x,y-52);ctx.globalAlpha=1;ctx.textAlign='left';ctx.lineWidth=1;break}}
  if(o.mv!=='fin'&&k<.6){ctx.font='bold 8px monospace';ctx.textAlign='center';ctx.globalAlpha=1-k/.6;ctx.lineWidth=2;ctx.strokeStyle='#05070a';const ty=Math.round(y+30);ctx.strokeText(PA_NAME[o.mv],x,ty);ctx.fillStyle=o.perf?'#ffe79a':'#cfe8ff';ctx.fillText(PA_NAME[o.mv],x,ty);ctx.globalAlpha=1;ctx.textAlign='left';ctx.lineWidth=1}}}
{const _cd4=cfxDraw;cfxDraw=function(now,beat){const r=_cd4.apply(this,arguments);try{paDraw(now)}catch(e){}return r}}

