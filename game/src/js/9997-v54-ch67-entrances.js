/* ================= v54 챕터 6·7 보스 20명 등장 움직임 (전에는 20명 모두 같은 기본 등장이었음) =================
   800의 등장 정의(ENT2)와 같은 틀: tick(t,E) → {dx,dy,al} · back/front(t,E,g,f) · clip(c,t,E,g). t는 ms, 착지는 2000~2400ms 무렵.
   챕터 6 (하늘): 회오리 낙하 · 연줄 타고 내려옴 · 먹구름 속에서 · 비행선 비스듬히 하강 · 종 치며 솟음 · 파이프가 차례로 솟음
                  무지개 다리 위에 · 급강하 · 소용돌이 한가운데 · 빛기둥과 공명
   챕터 7 (거울): 거울문이 열리고 걸어 나옴 · 꼬리 부채가 펼쳐짐 · 물이 거꾸로 솟아 몸이 됨 · 체스판 칸을 건너옴 · 불꽃이 먼저 켜짐
                  오르골 뚜껑이 열리고 돌며 솟음 · 기둥 타고 내려옴 · 실에 매달려 내려옴 · 하늘에서 날아와 착지 · 거울이 깨지며 나타남 */
(function(){try{
 if(typeof ENT2==='undefined')return;
 const S=(t,a,b)=>clamp((t-a)/(b-a),0,1),O=k=>1-Math.pow(1-clamp(k,0,1),3),col=()=>G.B.c,ht=g=>g.y-g.top;
 const snd=(f,l,w,v,f2)=>{try{sfx(f,l,w||'triangle',v||.04,f2||f)}catch(e){}};
 const D=(k,o)=>{ENT2['c_'+k]=o};
 /* ---------- 챕터 6 ---------- */
 D('s6_vane',{tick(t,E){const k=O(S(t,400,2000));E.fire('w',100,()=>snd(200,1.4,'sine',.03,90));E.fire('l',2000,()=>E.boom(col(),true));if(t>1500&&t<2000)G.shake=Math.max(G.shake,.3);return {dy:-(1-k)*(ht(E.g)+170),dx:Math.sin(t/120)*(1-k)*30}},
  back(t,E,g,f){if(t>2300)return;for(let i=0;i<40;i++){const q=((t/900)+i/40)%1,a=i*2.4+t/200,r=20+q*120;cPx(g.x+Math.cos(a)*r,g.y-20-q*160+Math.sin(a)*r*.3,2,'#ffffff',(1-q)*.6*f)}}});
 D('s6_kite',{tick(t,E){const k=O(S(t,200,2200));E.fire('l',2200,()=>E.boom(col(),false));return {dy:-(1-k)*(ht(E.g)+150),dx:Math.sin(t/300)*(1-k)*40}},
  back(t,E,g,f){if(t>2600)return;const b=G.boss;for(const s of [-1,1])line(b.x+s*g.hf*U*.6,b.y-ht(g),b.x+s*80,0,4,(x,y)=>cPx(x,y,1,'#f0e8d8',.6*f));
   const cols=['#ff6a5a','#ffd08a','#5ad0b0','#8ad8ff'];for(let i=0;i<6;i++){const x=(i*90+t/6)%(W+40)-20,y=40+Math.sin(t/300+i)*15+(i%2)*30;try{S6PIX.KITE[i%4](x,y,1.8,{rot:Math.sin(t/200+i)*.3})}catch(e){}}}});
 D('s6_cloudwhale',{tick(t,E){E.fire('b',1700,()=>{G.flash=Math.max(G.flash,.9);G.shake=Math.max(G.shake,.6);snd(70,.6,'sawtooth',.08,40)});E.fire('l',2000,()=>E.boom('#ffe25a',true));return {al:S(t,900,1900)}},
  back(t,E,g,f){if(t>2600)return;const k=O(S(t,0,1600));for(let i=0;i<10;i++){const a=i*TAU/10,r=(1-k)*240+40,x=g.x+Math.cos(a)*r,y=g.coreY+Math.sin(a)*r*.5;for(let j=0;j<3;j++)pcirc(x+j*10-10,y+Math.sin(j)*4,16,'#3a4868',.8*f)}
   if(t>1650&&t<1900)e2Bolt(g.x,0,g.x,g.coreY,'#ffe25a',7,1-(t-1650)/250)}});
 D('s6_captain',{tick(t,E){const k=O(S(t,200,2100));E.fire('p',100,()=>snd(120,1.8,'sawtooth',.02,140));E.fire('l',2100,()=>E.boom(col(),false));return {dx:(1-k)*300,dy:-(1-k)*180}},
  back(t,E,g,f){if(t>2400)return;const b=G.boss;for(let i=0;i<8;i++)RA(b.x+30+i*14,b.y-ht(g)*.6+Math.sin(t/80+i)*3,10,2,'#ffffff',.35*f*(1-i/8))}});
 D('s6_clock',{tick(t,E){[500,1100,1700].forEach((a,i)=>E.fire('d'+i,a,()=>{snd(392-i*60,1.2,'triangle',.06,380-i*60);G.shake=Math.max(G.shake,.25)}));E.fire('l',2100,()=>E.boom(col(),true));return {dy:(1-O(S(t,300,2100)))*(ht(E.g)+30)}},
  clip(c,t,E,g){c.rect(0,0,W,HOME.y+2)},back(t,E,g,f){if(t>2400)return;[500,1100,1700].forEach(a=>{const k=(t-a)/700;if(k>0&&k<1)cRing(g.x,g.y-ht(g)*.6,10+k*120,'#8ad8ff',(1-k)*.7,2)})}});
 D('s6_organ',{tick(t,E){[400,700,1000,1300,1600].forEach((a,i)=>E.fire('n'+i,a,()=>snd(262*[1,1.25,1.5,2,2.5][i],.6,'triangle',.04)));E.fire('l',2000,()=>E.boom(col(),false));return {}},
  clip(c,t,E,g){const k=O(S(t,300,1900));c.rect(0,g.y-(ht(g)+20)*k,W,H)},back(t,E,g,f){if(t>2400)return;for(let i=0;i<14;i++){const q=((t/1200)+i/14)%1;const x=g.x+((i*29)%120-60);cPx(x,g.y-q*140,2,'#c8a0ff',(1-q)*f);cPx(x+2,g.y-q*140-4,1,'#c8a0ff',(1-q)*f)}}});
 D('s6_prism',{tick(t,E){E.fire('r',200,()=>snd(880,1.2,'triangle',.03,1320));E.fire('l',2000,()=>E.boom('#ffffff',true));return {al:S(t,1000,2000)}},
  back(t,E,g,f){if(t>2600)return;const k=O(S(t,0,1100)),RB=['#ff4a5a','#ff9a3a','#ffe04a','#4ae08a','#3aa8ff','#6a5aff','#c85aff'];for(let i=0;i<7;i++){ctx.save();ctx.globalAlpha=.6*f;ctx.strokeStyle=RB[i];ctx.lineWidth=3;ctx.beginPath();ctx.arc(g.x,g.y+40,170-i*4,Math.PI,Math.PI+Math.PI*k);ctx.stroke();ctx.restore()}}});
 D('s6_falcon',{tick(t,E){const k=O(S(t,200,1700));E.fire('s',1500,()=>snd(1600,.5,'sawtooth',.05,300));E.fire('l',1800,()=>{E.boom(col(),true);for(let i=0;i<24;i++)G.parts.push({x:E.g.x,y:E.g.coreY,vx:(RND()-.5)*300,vy:(RND()-.7)*250,life:1,max:1,col:i%2?'#ffb84a':'#c8d4e8',s:3})});
   const a=Math.PI*(1-k);return {dx:-Math.cos(a)*260*(1-k),dy:-Math.sin(a)*200*(1-k)-(1-k)*60}},
  back(t,E,g,f){if(t>1800)return;const b=G.boss;for(let i=1;i<7;i++)RA(b.x-i*12,b.y-ht(g)*.5-i*6,10,3,'#ffb84a',.3*(1-i/7))}});
 D('s6_storm',{tick(t,E){E.fire('w',0,()=>snd(60,2,'sawtooth',.04,30));E.fire('l',2100,()=>E.boom(col(),true));if(t<2100)G.shake=Math.max(G.shake,.15);return {al:S(t,1200,2000)}},
  back(t,E,g,f){if(t>2600)return;const k=S(t,0,2000);for(let i=0;i<60;i++){const q=((t/700)+i/60)%1,a=i*2.4+t/150,r=(1-q)*(60+k*120);cPx(g.x+Math.cos(a)*r,g.coreY+Math.sin(a)*r*.6,i%5?2:3,i%3?'#7af0ff':'#c8d4e8',.7*f)}}});
 D('s6_spire',{tick(t,E){E.fire('h',300,()=>snd(110,2,'sine',.05,110));E.fire('l',2100,()=>E.boom('#ffe8a0',true));return {dy:-(1-O(S(t,600,2100)))*(ht(E.g)+120)}},
  back(t,E,g,f){if(t>2600)return;const a=S(t,0,600)*f;RA(g.x-14,0,28,g.y,'#ffe8a0',.25*a);RA(g.x-4,0,8,g.y,'#ffffff',.35*a);for(let i=0;i<3;i++){const q=((t/900)+i/3)%1;cRing(g.x,g.y-20,10+q*130,'#ffe8a0',(1-q)*.5*f,2)}}});
 /* ---------- 챕터 7 ---------- */
 const MIR=(x,y,w,h,a)=>{RA(x-w/2-3,y-h,w+6,h+3,'#0a0c18',a);RA(x-w/2,y-h+3,w,h-3,'#8492b0',a);RA(x-w/2+3,y-h+6,w-6,h-9,'#c4e8f0',a*.5)};
 D('s7_gate',{tick(t,E){E.fire('c',300,()=>snd(220,1.5,'square',.03,110));E.fire('l',2000,()=>E.boom(col(),true));return {al:S(t,900,1900),dy:(1-O(S(t,900,2000)))*-6}},
  clip(c,t,E,g){const k=O(S(t,700,1800)),w=g.hf*U*1.6*k+2;c.rect(g.x-w,0,w*2,H)},back(t,E,g,f){if(t>2400)return;const k=O(S(t,700,1800)),h=ht(g)+20,w=g.hf*U*1.6;MIR(g.x-w*k-w/2*(1-k)*0,g.y,w*.98,h,.9*f*(1-k*.3));for(const s of [-1,1])RA(g.x+s*w*k-(s<0?w:0),g.y-h,w,h,'#5af0e0',.18*f*(1-k))}});
 D('s7_peacock',{tick(t,E){E.fire('o',600,()=>snd(880,.8,'triangle',.03,1760));E.fire('l',1900,()=>E.boom(col(),false));return {al:S(t,200,600)}},
  clip(c,t,E,g){const k=O(S(t,500,1800));c.rect(g.x-(8+k*g.hf*U*2),0,(8+k*g.hf*U*2)*2,H)},back(t,E,g,f){if(t>2400)return;for(let i=0;i<12;i++){const a=Math.PI+i*Math.PI/11,k=O(S(t,500,1800));cPx(g.x+Math.cos(a)*k*90,g.coreY+Math.sin(a)*k*70,3,'#7af0d0',.7*f)}}});
 D('s7_fountain',{tick(t,E){E.fire('w',200,()=>snd(300,1.5,'sawtooth',.02,900));E.fire('l',2000,()=>E.boom('#7ad8ff',true));return {}},
  clip(c,t,E,g){const k=O(S(t,400,1900));c.rect(0,g.y-(ht(g)+20)*k,W,H)},back(t,E,g,f){if(t>2400)return;for(let i=0;i<30;i++){const q=((t/600)+i/30)%1;cPx(g.x+((i*13)%60-30)*(1+q),g.y-q*(ht(g)+60),2,i%2?'#e8fbff':'#7ad8ff',(1-q)*.8*f)}}});
 D('s7_chess',{tick(t,E){const st=Math.min(4,Math.floor(S(t,300,1900)*5));[0,1,2,3,4].forEach(i=>E.fire('s'+i,300+i*320,()=>{snd(160,.15,'square',.05,80);G.shake=Math.max(G.shake,.15)}));E.fire('l',2000,()=>E.boom('#f2f6ff',true));return {dx:(4-st)*60}},
  back(t,E,g,f){if(t>2400)return;for(let i=0;i<10;i++)for(let j=0;j<3;j++){const x=AX+i*AW/10,y=g.y-j*16+4;if((i+j)%2)RA(x,y-16,AW/10,16,'#f2f6ff',.12*f)}}});
 D('s7_candle',{tick(t,E){E.fire('f',300,()=>snd(600,.6,'triangle',.03,300));E.fire('l',1900,()=>E.boom('#a8fff0',false));return {al:S(t,1100,1900)}},
  back(t,E,g,f){if(t>2400)return;RA(0,0,W,H,'#000000',.5*f*(1-S(t,1500,2200)));const fx=g.x,fy=g.top+4,k=S(t,300,900);e2Glow(fx,fy,20+k*40,'#5af0e0',k*f);pcirc(fx,fy,3+k*3,'#ffffff',k*f)}});
 D('s7_ballet',{tick(t,E){[300,600,900,1200,1500].forEach((a,i)=>E.fire('n'+i,a,()=>snd(1047*[1,1.12,1.26,1.5,2][i],.4,'triangle',.03)));E.fire('l',1900,()=>E.boom('#ffb0d8',false));return {dy:(1-O(S(t,600,1900)))*40,dx:Math.sin(t/60)*(1-S(t,600,1900))*4}},
  clip(c,t,E,g){c.rect(0,0,W,HOME.y+2)},back(t,E,g,f){if(t>2400)return;const k=O(S(t,100,600));RA(g.x-40,g.y-6,80,10,'#5a3a2a',.9*f);RA(g.x-40,g.y-6-k*30,80,4,'#8a5a3a',.9*f)}});
 D('s7_carousel',{tick(t,E){E.fire('l',2100,()=>E.boom('#ffd27a',true));return {dy:-(1-O(S(t,300,2100)))*(ht(E.g)+140)}},
  back(t,E,g,f){if(t>2600)return;const b=G.boss;RA(b.x-1,0,3,b.y-ht(g),'#ffd27a',.8*f);for(let i=0;i<12;i++){const on=(Math.floor(t/120)+i)%2;pcirc(g.x+Math.cos(i*TAU/12+t/500)*90,g.coreY+Math.sin(i*TAU/12+t/500)*30,2,on?'#fff0c0':'#ff7ad0',.8*f)}}});
 D('s7_puppet',{tick(t,E){const k=O(S(t,200,2100));E.fire('l',2100,()=>E.boom('#b48aff',false));return {dy:-(1-k)*(ht(E.g)+150)+Math.sin(t/180)*(1-k)*8}},
  back(t,E,g,f){if(t>2600)return;const b=G.boss;for(const s of [-2,-1,1,2])line(b.x+s*12,b.y-ht(g)*.8,b.x+s*20,0,4,(x,y)=>cPx(x,y,1,'#c4d0e4',.7*f))}});
 D('s7_dragon',{tick(t,E){const k=O(S(t,300,2000));E.fire('r',300,()=>snd(90,1.2,'sawtooth',.05,60));E.fire('l',2000,()=>{E.boom('#8af0ff',true);G.shake=Math.max(G.shake,.9)});return {dx:-(1-k)*320,dy:-(1-k)*220}},
  back(t,E,g,f){if(t>2400)return;const b=G.boss;for(let i=1;i<8;i++)pcirc(b.x+i*16,b.y-ht(g)*.6-i*10,10-i,'#8af0ff',.2*f)}});
 D('s7_mharu',{tick(t,E){[700,1100,1500].forEach((a,i)=>E.fire('c'+i,a,()=>{snd(2000-i*300,.2,'square',.04,800);G.shake=Math.max(G.shake,.2)}));E.fire('x',1900,()=>{snd(1200,.6,'sawtooth',.05,200);for(let i=0;i<30;i++)G.parts.push({x:E.g.x+(RND()-.5)*80,y:E.g.coreY+(RND()-.5)*80,vx:(RND()-.5)*300,vy:(RND()-.5)*300,life:1.2,max:1.2,col:i%2?'#e0ccff':'#ffffff',s:3})});E.fire('l',2000,()=>E.boom('#b48aff',true));return {al:t<1900?.25:1}},
  front(t,E,g,f){if(t>1950)return;const w=g.hf*U*1.8,h=ht(g)+30;MIR(g.x,g.y,w,h,.55);ctx.save();ctx.strokeStyle='#ffffff';ctx.lineWidth=1;[700,1100,1500].forEach((a,i)=>{if(t<a)return;ctx.globalAlpha=.9;let x=g.x+(i-1)*10,y=g.y-h*.6;ctx.beginPath();ctx.moveTo(x,y);for(let s=0;s<6;s++){x+=((hash(i*9+s+'k')%30)-15);y+=((hash(i*7+s+'j')%30)-15);ctx.lineTo(x,y)}ctx.stroke()});ctx.restore()}});
}catch(e){console.error('v54 ch67 entrances',e)}})();
