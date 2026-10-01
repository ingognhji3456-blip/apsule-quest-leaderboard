/* ================= 챕터 3 보스 전용 손 (캐릭터에 맞춘 도구/부속) ================= */
function c3HandDraw(c,art,B,h,sx,sy,t,dorm,sc){const q=Math.max(2,Math.round(2.4*(sc||1))),x=Math.round(h.x),y=Math.round(h.y),P_=B.pal,dk=dorm?'#161e22':P_[1],bs=dorm?'#2a353a':P_[0],lt=dorm?'#3a484e':P_[2],ac=dorm?'#3a484e':P_[3],
 F=(a,b,w,hh,col,al)=>{c.globalAlpha=al==null?1:al;c.fillStyle=col;c.fillRect(Math.round(x+a*q),Math.round(y+b*q),Math.max(1,Math.round(w*q)),Math.max(1,Math.round(hh*q)));c.globalAlpha=1},
 C=(a,b,r,col)=>pcirc(x+a*q,y+b*q,r*q,col,1,c),aim=h.mode==='cannon'||h.aim?(h.ang||Math.atan2(P.y-y,P.x-x)):Math.atan2(P.y-y,P.x-x),fx=Math.cos(aim)>=0?1:-1,kick=(h.kick||0),bt=t/1000,
 rope=(col,step)=>line(sx,sy,x,y-3*q,step||4,(px,py,i)=>{c.fillStyle=i%2?col:dk;c.fillRect(Math.round(px-1),Math.round(py-1),2,2)});
 const kx=-Math.cos(aim)*kick*3*q,ky=-Math.sin(aim)*kick*3*q;c.save();c.translate(Math.round(kx),Math.round(ky));
 switch(art){
 case 'pendulum':{rope('#b8864a',3);const sw=dorm?0:Math.sin(bt*3.2+h.x)*.5,L=5,bx=Math.sin(sw)*L,by=Math.cos(sw)*L-4;line(x,y-4*q,x+bx*q,y+by*q,2,(px,py)=>{c.fillStyle='#8a6430';c.fillRect(Math.round(px-1),Math.round(py-1),2,2)});C(bx,by+1,3.6,'#3a2410');C(bx,by+1,3.1,'#b8864a');C(bx-.6,by+.4,1.8,'#e0a060');F(bx-1.2,by-.6,1,1,'#fff0c8');F(-1.5,-5,3,1.5,'#6a3c1c');break}
 case 'panopticon':{rope('#4a4a54',4);F(-4,-3,8,6,'#23232a');F(-3.5,-2.5,7,5,bs);F(-3.5,-2.5,7,1,lt);F(fx>0?3.5:-5.5,-2,2,4,'#23232a');C(fx*4.8,0,1.8,'#111');C(fx*4.8,0,1.2,dorm?'#333':'#ff3a3a');F(fx*4.8-.3,-.6,.6,.6,'#ffffff');F(-3,-3.8,1,1,Math.floor(bt*3)%2?ac:'#402020');
  if(!dorm&&(h.mode==='cannon'||h.charge>0)){for(let i=2;i<14;i++)if(i%2===0)F(fx*4.8+Math.cos(aim)*i*1.2-.3,Math.sin(aim)*i*1.2-.3,.6,.6,'#ff5a5a',.6)}break}
 case 'moth':{const fl=dorm?0:(Math.floor(bt*12)%2);pcirc(x,y,5*q,ac,.18,c);F(-6,fl?-4:-2,5,4,lt);F(1,fl?-4:-2,5,4,lt);F(-5,fl?-3:-1,2,2,ac);F(3,fl?-3:-1,2,2,ac);F(-1,-4,2,7,bs);F(-1,-6,.6,2,dk);F(.4,-6,.6,2,dk);C(0,-3.5,1,'#fff6d0');break}
 case 'bellows':{const pump=dorm?0:Math.abs(Math.sin(bt*4+h.x*.1)),hgt=3+pump*2;F(-5,-hgt,10,1.5,'#6a3a24');for(let i=0;i<3;i++)F(-4.5+i*.3,-hgt+1.5+i*(hgt-1)/3,9-i*.6,(hgt-1)/3,i%2?'#a86a3a':'#7a4a2a');F(-5,0,10,1.5,'#6a3a24');F(fx>0?5:-8,-1.5,3,1.5,'#c8a060');F(fx>0?7.5:-8.5,-2,1,2.5,'#ffe07a');
  if(!dorm&&pump>.85)for(let i=0;i<3;i++)F(fx*(9+i*1.5),-1.5-i*.4,1,1,'#e8e0d0',.7-i*.2);break}
 case 'metronome':{const wv=dorm?0:Math.sin(bt*5+h.x)*.7;C(0,0,3,'#ffffff');C(0,0,2.4,'#f4eef8');F(-3,-1,1.2,3,'#ffffff');F(-.4,2.6,1.2,1,'#d8d0e0');F(2,-.5,1,1,'#d8d0e0');const ba=-Math.PI/2+wv*(fx);for(let i=1;i<9;i++)F(Math.cos(ba+fx*.5)*i-.4,Math.sin(ba+fx*.5)*i-.4,.8,.8,i>6?ac:'#2a1a20');break}
 case 'calendar':{rope('#c83a3a',5);const wob=dorm?0:Math.sin(bt*4+h.x)*.5;F(-.5+wob,1.5,1,5,'#c9d3d8');F(wob,6,.5,1,'#ffffff');C(wob,0,3,'#7a1a1a');C(wob,-.3,2.6,'#c83a3a');F(wob-1.4,-1.8,1,1,'#ffb0b0');F(-3+wob,1.8,6,1,'#5a1010');break}
 case 'dust':{const sw=dorm?0:Math.sin(bt*3+h.x)*.6;for(let i=0;i<9;i++){const px=Math.sin(sw)*i*.8,py=-8+i;F(px-.5,py,1,1,'#8a6a40')}const bx=Math.sin(sw)*7;F(bx-4,1,8,2,'#6a5030');for(let i=0;i<8;i++)F(bx-4+i,3,.6,3+((i*7)%3)*.5,i%2?'#d8c890':'#b8a060');if(!dorm&&Math.floor(bt*6)%3===0)F(bx+(Math.floor(bt*20)%8)-4,7,1,1,'#b8a8d8',.7);break}
 case 'scales':{rope('#fff0b0',4);F(-1.5,-5.5,3,1,'#fff0b0');F(-.5,-6.5,1,1.5,'#b8a060');for(let i=0;i<6;i++)F(-2.5-i*.5,-4.5+i,5+i,1,i===0?'#fff0b0':i<3?'#d8c080':'#b8a060');F(-5,1.5,10,1,'#8a7440');c.font='bold '+Math.round(3*q)+'px monospace';c.textAlign='center';c.fillStyle='#5a4a20';c.fillText('⚖',x,Math.round(y+1*q));c.textAlign='left';break}
 case 'echo':{rope('#4a5a6a',4);const pul=dorm?0:Math.pow(1-((bt*2)%1),3);F(fx>0?-4:1,-2,3,4,'#2a3440');for(let i=0;i<4;i++)F(fx>0?-1+i:0-i,-2-i*.8-pul*.4,1,4+i*1.6+pul*.8,i%2?'#4a5a6a':'#6a7a8a');F(fx>0?3:-3.6,-5,.6,10,'#9ab8d0');if(!dorm&&pul>.2)for(let k=0;k<6;k++){const a=(k-2.5)*.25;F(fx*(6+pul*4)*Math.cos(a)-.3,(6+pul*4)*Math.sin(a)-.3,.6,.6,'#8ae8ff',pul)}break}
 case 'stillness':{const a=dorm?Math.PI/2:aim,L=9;for(let i=0;i<L;i++){const w=i<2?1.4:i>L-3?(L-i)*.8:.9;F(Math.cos(a)*i-w/2,Math.sin(a)*i-w/2,w,w,i>L-3?'#c8a0ff':'#6a5a8a')}C(0,0,1.8,'#1a1420');C(0,0,1.1,'#c8a0ff');F(-.3,-.3,.6,.6,'#ffffff');break}
 default:C(0,0,3,bs)}
 c.restore()}
{const _dhc3=drawHand;drawHand=function(c,B,h,sx,sy,t,dorm,sc){try{if(typeof _c3Swap!=='undefined'&&_c3Swap&&_c3Swap.art&&B===BOSSES[_c3Swap.bi]&&h){c3HandDraw(c,_c3Swap.art,B,h,sx,sy,t,dorm,sc);return}}catch(e){}return _dhc3.apply(this,arguments)}}

/* ================= 챕터 3 보스 존재감: 보스별 주변 연출 (선명한 도트) ================= */
function c3Ambient(now,g,ph){const art=_c3Swap.art,c=G.B.c,t=now/1000,cx=g.x,cy=g.coreY,fr=G.state==='play'?G.beat-Math.floor(G.beat):0,hw=g.hf*U;
 glow(cx,cy,56+ph*12,c,.2+.06*ph);
 switch(art){
 case 'pendulum':{const N=['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];ctx.font='bold 8px monospace';ctx.textAlign='center';for(let i=0;i<12;i++){const a=i*TAU/12-Math.PI/2+t*.05,x=cx+Math.cos(a)*92,y=cy+Math.sin(a)*58;ctx.globalAlpha=.35+(i===Math.floor((t*2)%12)?.55:0);ctx.fillStyle='#e0c890';ctx.fillText(N[i],Math.round(x),Math.round(y+3))}ctx.globalAlpha=1;ctx.textAlign='left';break}
 case 'panopticon':for(let k=0;k<3;k++){const a=t*.6+k*TAU/3;for(let s=30;s<200;s+=6)cPx(cx+Math.cos(a)*s,cy+Math.sin(a)*s*.7,2,'#ff7a6a',.25*(1-s/220))}{const a=t*1.3;cPx(cx+Math.cos(a)*140,cy+40+Math.sin(a*1.7)*40,3,'#ff3a3a',Math.floor(t*6)%2?.9:.4)}break;
 case 'moth':cRing(cx,g.top-6,hw*1.1,'#e8e0ff',.35,1,.5);for(let i=0;i<10;i++){const q=((t*.3)+i/10)%1;cPx(cx+Math.sin(i*2.3+t)*hw*1.3,g.top+q*(g.y-g.top+30),1,i%2?'#ffd98a':'#c8b8f0',.8*(1-q))}break;
 case 'bellows':for(const s of [-1,1])for(let i=0;i<4;i++){const q=((t*.5)+i/4+(s>0?.12:0))%1;cPx(cx+s*hw*.45+Math.sin(q*5)*3,g.top-6-q*34,2+Math.round(q*3),'#6a5a50',.5*(1-q))}for(let i=0;i<3;i++){const q=((t*.8)+i/3)%1;cPx(cx+(i-1)*14,g.y-4-q*50,1,'#ffb040',1-q)}break;
 case 'metronome':for(let i=0;i<4;i++){const q=((G.beat||t)*.5+i/4)%1;npSpr('note',cx+(i%2?-1:1)*(hw+14)+Math.sin(q*6)*4,g.top+20-q*50,4,now,{col:i%2?'#ff9ad0':'#ffe36b'},0)}break;
 case 'calendar':ctx.font='bold 8px monospace';ctx.textAlign='center';for(let i=0;i<6;i++){const a=t*.4+i*TAU/6,x=cx+Math.cos(a)*(hw+30),y=cy+Math.sin(a)*40;ctx.globalAlpha=.5;RA(Math.round(x-5),Math.round(y-6),10,9,'#fff6e0',.6);ctx.fillStyle='#c83a3a';ctx.fillText(String(((i*5+Math.floor(t))%31)+1),Math.round(x),Math.round(y+2))}ctx.globalAlpha=1;ctx.textAlign='left';break;
 case 'dust':for(let i=0;i<24;i++){const a=t*1.2+i*TAU/24,r=hw+18+Math.sin(i*1.7+t)*6;cPx(cx+Math.cos(a)*r,g.y-6+Math.sin(a)*r*.3-i%3*4,2,'#b8a8d8',.55)}break;
 case 'scales':for(let i=0;i<5;i++){const a=t*.5+i*TAU/5,x=cx+Math.cos(a)*(hw+26),y=cy-10+Math.sin(a)*22;RA(Math.round(x-2),Math.round(y-2),4,4,'#ffe08a',.8);RA(Math.round(x-1),Math.round(y-1),1,1,'#ffffff',.9)}break;
 case 'echo':for(let k=0;k<3;k++){const q=((G.beat||t*2)*.5+k/3)%1;cRing(cx,cy,20+q*110,'#8ae8ff',.5*(1-q),2,.7)}break;
 case 'stillness':for(let i=0;i<8;i++){const a=i*TAU/8+t*.08,x=cx+Math.cos(a)*(hw+36),y=cy+Math.sin(a)*48;npSpr('crystal',x,y,4,now,{},0)}for(const [L,sp] of [[70,.2],[50,.9]]){const a=t*sp;line(cx,cy,cx+Math.cos(a)*L,cy+Math.sin(a)*L*.7,3,(px,py)=>cPx(px,py,2,'#c8a0ff',.3))}break}
 if(ph>=1)for(let i=0;i<6+ph*3;i++){const a=i*TAU/(6+ph*3)+t*.8,r=hw*1.2;cPx(cx+Math.cos(a)*r,cy+Math.sin(a)*r*.8-((t*30+i*13)%18),2,ph>=2?'#ffffff':c,.6)}}
{const _bbx=bossFXBack;bossFXBack=function(now,g,ph){if(typeof _c3Swap!=='undefined'&&_c3Swap&&_c3Swap.art){try{c3Ambient(now,g,ph)}catch(e){}return}return _bbx.apply(this,arguments)}}
{const _bfx=bossFXFront;bossFXFront=function(now,g,ph){if(typeof _c3Swap!=='undefined'&&_c3Swap&&_c3Swap.art)return;return _bfx.apply(this,arguments)}}

