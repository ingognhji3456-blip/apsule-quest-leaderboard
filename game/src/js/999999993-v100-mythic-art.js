/* ================= v100 신화 장비 디테일 (MART100) =================
   ① 신화 무기 15: 색만 바꾼 그림 대신 칼날 · 날 · 홈 · 룬 · 보석 · 코등이를 한 칸씩 찍은 넓은 도트(9~11칸 폭)로 새로 그림.
      휘두를 때 칼날을 따라 흐르는 빛 · 끝의 반짝임 · 무기마다 다른 효과(번개 · 불씨 · 달빛 · 별 · 안개 …).
   ② 신화 펫 15: 9×9 도트 대신 손그림 방식(외곽선 → 바탕 → 밝은 면 → 그늘 → 눈 반짝임)으로 하나씩 그리고,
      날개 · 꼬리 · 불꽃 · 톱니처럼 움직이는 부분과 은은한 기운을 넣음. 일반 펫보다 조금 크게. */
(()=>{try{
 const M=window.MYTH100;if(!M||typeof WSPR==='undefined')return;const TAU=Math.PI*2;
 const sh=(c,k)=>{try{return shade(c,k)}catch(e){return c}};

 /* ================= ① 무기 ================= */
 const S={};
 S.m_godgreat={g:6,pal:{o:'#0e0a06',X:'#ff3a4a',x:'#ffb0b8',Y:'#ffd84a',y:'#b8861a',g:'#3a2410',G:'#6a4418',w:'#fff6c8',e:'#fffbe8',B:'#f0e2b0',b:'#c8b07a',D:'#8a7440',F:'#2a1e0c',R:'#ffd84a'},
  r:["....oXo....","...oXxXo...","....oYo....","...oYyYo...","....ogo....","....oGo....","....ogo....","....oGo....","....ogo....","oYo.oYo.oYo","oYYoYXYoYYo",".oYYYyYYYo.","..oyYYYyo..","..oeBFbDo..",".oeBbFbBDo.",".oeBRFRbDo.",".oeBbFbBDo.",".oeBbFbBDo.",".oeBRFRbDo.",".oeBbFbBDo.",".oeBbFbBDo.",".oeBRFRbDo.",".oeBbFbBDo.","..oeBFbDo..","..oeBbBDo..","...oeBDo...","...oewDo...","....oeo....",".....o....."]};
 S.m_moonkatana={g:5,curve:2.8,pal:{o:'#0a0c18',K:'#1a1e3a',k:'#2a3260',S:'#8ab8ff',M:'#ffffff',m:'#c8d8ff',h:'#ffffff',B:'#e0ecff',b:'#a8c0e8',C:'#8ad8ff',s:'#6a7aa8',n:'#fff6d0'},
  r:["...o...","..oMo..","..oKo..","..oSo..","..oKo..","..oSo..","..oKo..","..oSo..",".mMnMm.","omMMMmo","..oKo..","..hBs..","..hBs..","..hCs..","..hBb..","..hBs..","..hCs..","..hBb..","..hBs..","..hCs..","..hBb..","..hBs..","..hCs..","...hs..","...hs..","...h..."]};
 S.m_thunderspear={g:7,pal:{o:'#0c0c1e',s:'#3a3a6a',S:'#6a6aa8',Y:'#ffe36b',y:'#c8a020',W:'#ffffff',B:'#fff6a0',b:'#ffd84a',e:'#ffffff',c:'#8de4ff'},
  r:["....o....","...oYo...","....s....","....S....","....s....","....S....","....s....","...oYo...","....s....","....S....","....s....","....S....","....s....","...YyY...","...oYo...","..YoYoY..",".YyYYYyY.","..oYcYo..","...oWbo..","..oeWbo..","..oWbbo..","...oWbo..","..oeWBbo.","..oWBbo..","...oWbo..","....Wbo..","....oW...","....oW...",".....W..."]};
 S.m_dragonaxe={g:5,pal:{o:'#140606',Y:'#ffb040',H:'#5a1a0a',h:'#8a2a12',A:'#d83a2a',a:'#8a1a10',e:'#ffd0a0',E:'#ff8a3a',S:'#ffe36b',d:'#4a0a06',W:'#fff6d0'},
  r:["....oSo....","....oYo....","....oHo....","....oho....","....oHo....","....oho....","....oHo....","....oho....","....oHo....","....oho....","....oHo....",".oAAoHoAAo.","oAAAAHAAAAo","oeEAaHaAEeo","oeEAaHaAEeo","oeEASHSAEeo","oeEAaHaAEeo","oAAAAHAAAAo",".oAdaHadAo.","..oo.Y.oo..","....oYo....",".....o....."]};
 S.m_reaper={g:5,side:true,pal:{o:'#0a0610',s:'#2a1a3a',S:'#5a3a7a',C:'#d8a8ff',c:'#8a4ae0',e:'#f8f0ff',X:'#c86aff',x:'#ffd0ff',K:'#1a0a24'},
  r:[".....oXo.....",".....oxo.....",".....oSo.....",".....oso.....",".....oSo.....",".....oso.....",".....oSo.....",".....oso.....",".....oSo.....",".....oso.....",".....oSo.....",".....oso.....",".....oSo.....",".....oKoccc..",".....oKoCCcc.",".....oKooCCCc",".....oSo..eCC",".....oSo...eC",".....oSo....e",".....oso.....",".....oXo.....","......o......"]};
 S.m_holyrapier={g:4,pal:{o:'#1a1408',Y:'#ffd84a',y:'#c8a040',b:'#fff6e0',c:'#ffffff',W:'#ffffff',I:'#fff6d0',i:'#e8d8a0',X:'#5ab8ff'},
  r:["....o....","...oXo...","...oYo...","...obo...","...oyo...","...obo...","..YcYcY..",".Y.oYo.Y.","Y..oXo..Y",".Y.....Y.","....W....","....I....","....i....","....I....","....W....","....I....","....i....","....I....","....W....","....I....","....i....","....I....","....W....","....I....","....W...."]};
 S.m_chaoshammer={g:7,pal:{o:'#0a0610',H:'#2a1a3a',h:'#4a2a6a',M:'#6a3a9a',m:'#3a1a5a',L:'#d8a8ff',X:'#ff4dd8',x:'#ffb0f0',Y:'#c86aff',G:'#8a5aff'},
  r:["...oXo...","...oYo...","...oHo...","...oho...","...oHo...","...oho...","...oHo...","...oho...","...oHo...","...oho...","...oHo...","...oho...","ooooooooo","oLLLLLLLo","oMGMMMGMo","oMmXxXmMo","oMmxXxmMo","oMGMMMGMo","ommmmmmmo","ooooooooo","...oYo...","....o...."]};
 S.m_timedagger={g:3,pal:{o:'#06121a',Y:'#ffd166',y:'#b8861a',b:'#2a4a6a',C:'#8de4ff',c:'#4ab0e0',e:'#ffffff',G:'#bfffff',T:'#ffd166',d:'#2a6a8a'},
  r:["...o...","..oTo..","..oyo..","..obo..","..obo..","oYYCYYo","oyYTYyo",".oeCdo.","oeGCcdo","oeGCcdo","oeGTcdo",".oeCdo.",".oeCdo.","..eCo..","..eG...","...e..."]};
 S.m_seastar={g:5,pal:{o:'#06081a',Y:'#ffe36b',y:'#c8a020',g:'#1a2a5a',G:'#2a3a8a',C:'#3a5ac8',e:'#ffffff',B:'#a8c8ff',b:'#6a8ae0',N:'#1e2a6a',S:'#ffe36b',s:'#ffffff'},
  r:["....o....","...oSo...","...oYo...","...ogo...","...oGo...","...ogo...","...oGo...","oCo.Y.oCo","oCCYSYCCo",".oCCYCCo.","..oeBbo..","..oeNbo..","..oSNbo..","..oeNbo..","..oeNso..","..oeNbo..","..oeNbo..","..oSNbo..","..oeNbo..","..oeNbo..","..oeNso..","..oeBbo..","...eBo...","...es....","....e...."]};
 S.m_bloodlord={g:5,pal:{o:'#140408',R:'#ff2a3a',r:'#8a0a14',Y:'#c8a040',K:'#2a0a10',k:'#4a0a18',e:'#ffd0d8',B:'#e83a4a',b:'#a01a2a',D:'#5a0a14',X:'#ff4d6d',V:'#ff8a9a'},
  r:["....o....","...oXo...","...oRo...","...oKo...","...oko...","...oKo...","...oko...","oRo.R.oRo","orRRXRRro",".oRrRrRo.","..oeBDo..","..oeBbDo.","..oeVbDo.","..oeBbDo.","..oeBbDo.","..oeVbDo.","..oeBbDo.","..oeBbDo.","..oeVbDo.","..oeBbDo.","..oeBDo..","...eBo...","...eb....","....V...."]};
 S.m_frostcrown={g:6,pal:{o:'#06121e',W:'#ffffff',C:'#bfe8ff',c:'#6ab8ff',g:'#2a4a6a',G:'#4a7aa0',e:'#ffffff',B:'#d8f4ff',b:'#9ad8f8',F:'#4a8ab0',X:'#8de4ff'},
  r:["....oXo....","...oWXWo...","....oCo....","....ogo....","....oGo....","....ogo....","....oGo....","....ogo....","W.C.oCo.C.W","oCcCCXCCcCo",".oCCcCcCCo.","..oeBFbbo..","..oeBFBbo..",".WoeBFbbo..","..oeBFBbo..","..oeBFbboW.","..oeBFBbo..",".WoeBFbbo..","..oeBFBbo..","..oeBFbbo..","..oeBFBbo..","...oeBbo...","...oeBo....","....oe.....","....W......"]};
 S.m_primeflame={g:4,wave:true,pal:{o:'#1a0804',g:'#3a1408',R:'#8a1a0a',F:'#ff6a1a',f:'#ff9a3a',W:'#ffe36b',Y:'#fff6c0',X:'#ff3a1a'},
  r:["...ooo...","...oXo...","...ogo...","...oRo...","...ogo...","..FRRRF..","oRRRXRRRo",".oRRFRRo.","..oFWFo..",".FoFWYFo.","..oFWFfo.","..ofWYFo.",".FoFWFfo.","..oFWYFo.","..ofWFfo.","..oFWFFoF","..oFWYfo.",".FoFWFFo.","..oFWFo..","...oFo...","...fWf...","....Y...."]};
 S.m_galetwin={g:3,pal:{o:'#0a1a10',G:'#3a8a5a',g:'#2a6a3a',C:'#7ad8a0',c:'#c8ffd8',e:'#ffffff',B:'#e8fff0',b:'#a8e8c0',W:'#ffffff'},
  r:["...o...","..oWo..","..oGo..","..ogo..","..oGo..","cCCcCCc",".oCcCo.","..eBo..","..eBb..","..eBo..","..eBb..","..eBo..","..eBb..","..eBo..","..eBb..","..eBo..","..eb...","...e..."]};
 S.m_guardian={g:7,pal:{o:'#141006',s:'#8a6a20',S:'#c8a040',Y:'#ffd84a',W:'#ffffff',B:'#fff6e0',b:'#e8d8a8',e:'#ffffff',X:'#5ab8ff',L:'#fff0c0'},
  r:["....o....","...oXo...","....s....","....S....","....s....","....S....","....s....","...YYY...","....s....","....S....","....s....","....S....","....s....","....S....","..YYXYY..","oL.oYo.Lo","oLLYYYLLo",".oLoBoLo.","...oeBo..","..oeBBbo.","..oeBXbo.","..oeBBbo.","...oeBo..","...oeBbo.","....eBo..","....eo...","....W...."]};
 S.m_eternal={g:5,pal:{o:'#100616',R:'#ff6ad8',Y:'#ffe36b',C:'#5affd8',g:'#3a1a4a',G:'#6a3a8a',e:'#ffffff',B:'#fff0fa',b:'#e8c8f0',P:'#c8a8ff',X:'#ff9af0',u:'#8de4ff'},
  r:["...ooo...","...oXo...","...oYo...","...ogo...","...oGo...","...ogo...","...oGo...","oPo.Y.oPo","oPCPXPCPo","oPPPYPPPo",".oPCPCPo.","..oeBbo..","..oeXbo..","..oeBbo..","..oeuBo..","..oeBbo..","..oeYbo..","..oeBbo..","..oeCbo..","..oeBbo..","..oeXbo..","..oeBbo..","..oeuBo..","...eBo...","...eb....","....X...."]};
 for(const k in S)WSPR[k]=S[k];
 /* 무기 빛 효과: 칼날을 따라 흐르는 빛 + 끝 반짝임 + 무기마다 다른 효과 */
 const FXW={m_godgreat:'rune',m_moonkatana:'moon',m_thunderspear:'bolt',m_dragonaxe:'ember',m_reaper:'soul',m_holyrapier:'holy',m_chaoshammer:'chaos',m_timedagger:'clock',m_seastar:'star',m_bloodlord:'blood',m_frostcrown:'frost',m_primeflame:'ember',m_galetwin:'wind',m_guardian:'holy',m_eternal:'prism'};
 function deco(w,hx,hy,ang,s,now,A){const sp=WSPR[w.type],kind=FXW[w.type];if(!sp||!kind)return;A=A==null?1:A;const n=sp.r.length,cs=s*.72,ca=Math.cos(ang),sa=Math.sin(ang),tip=(n-1-sp.g)*cs,t=now/1000,base=(sp.g+3)*cs,col=w.trail||w.col||'#ffffff';
  const at=q=>{const d=base+(tip-base)*q;return [hx+ca*(d-sp.g*cs+sp.g*cs),hy+sa*d]};
  const P_=(q)=>{const d=(sp.g+3-sp.g)*cs+(tip-(3)*cs)*q;return [hx+ca*d,hy+sa*d]};
  /* 흐르는 빛 */{const q=(t*.9)%1,[x,y]=P_(q);glow(x,y,4,col,.35*A);RA(x-1,y-1,2,2,'#ffffff',.85*A*(1-Math.abs(q-.5)))}
  /* 끝 반짝임 */{const [x,y]=P_(1),tw=.5+.5*Math.sin(t*6);RA(x-.5,y-3,1,6,'#ffffff',.6*tw*A);RA(x-3,y-.5,6,1,'#ffffff',.6*tw*A)}
  const R=(x,y,c,a)=>RA(x-.5,y-.5,1,1,c,a*A);
  if(kind==='rune'){for(let i=0;i<3;i++){const [x,y]=P_(.2+i*.28);glow(x,y,3,'#ffd84a',(.2+.15*Math.sin(t*4+i))*A)}}
  else if(kind==='moon'){for(let i=0;i<3;i++){const q=(t*.5+i/3)%1,[x,y]=P_(q);R(x+Math.sin(t*3+i)*3,y-q*4,'#e8f0ff',1-q)}}
  else if(kind==='bolt'){if(Math.floor(t*8)%3===0){let [x0,y0]=P_(1);for(let k=0;k<4;k++){const x1=x0+(Math.random()-.5)*9,y1=y0-2-Math.random()*4;line(x0,y0,x1,y1,1,(a,b)=>RA(a,b,1,1,'#fff6a0',.9*A));x0=x1;y0=y1}}glow(...P_(1),6,'#ffe36b',.3*A)}
  else if(kind==='ember'){for(let i=0;i<4;i++){const q=(t*1.5+i/4)%1,[x,y]=P_(.3+((i*37)%10)/14);RA(x+Math.sin(t*7+i)*2-1,y-q*9-1,2,2,q<.4?'#ffe36b':'#ff5a1f',(1-q)*.85*A)}}
  else if(kind==='soul'){for(let i=0;i<3;i++){const q=(t*.6+i/3)%1,[x,y]=P_(.85);R(x+Math.cos(t*2+i*2)*6,y+Math.sin(t*2+i*2)*4-q*6,'#e8c8ff',1-q)}glow(...P_(.9),7,'#b48aff',.25*A)}
  else if(kind==='holy'){glow(...P_(.5),8,'#fff6d0',(.15+.08*Math.sin(t*3))*A);for(let i=0;i<2;i++){const q=(t*.8+i/2)%1,[x,y]=P_(q);R(x,y-3,'#ffffff',1-q)}}
  else if(kind==='chaos'){const [x,y]=P_(1);for(let i=0;i<4;i++){const a=t*3+i*TAU/4;R(x+Math.cos(a)*7,y+Math.sin(a)*5,i%2?'#ff4dd8':'#8a5aff',.9)}glow(x,y,8,'#c86aff',.3*A)}
  else if(kind==='clock'){const [x,y]=P_(.5);for(let i=0;i<6;i++){const a=t*1.5+i*TAU/6;R(x+Math.cos(a)*6,y+Math.sin(a)*6,'#8de4ff',.7)}}
  else if(kind==='star'){for(let i=0;i<4;i++){const [x,y]=P_(.15+i*.25),tw=.5+.5*Math.sin(t*5+i*2);R(x+Math.sin(i)*2,y,'#ffe36b',tw)}}
  else if(kind==='blood'){for(let i=0;i<2;i++){const q=(t*.9+i/2)%1,[x,y]=P_(.3+i*.4);RA(x-.5,y+q*7,1,2,'#ff2a3a',(1-q)*.9*A)}glow(...P_(.6),6,'#ff2a3a',.18*A)}
  else if(kind==='frost'){for(let i=0;i<3;i++){const q=(t*.4+i/3)%1,[x,y]=P_(.2+i*.3);R(x+Math.sin(t+i)*4,y+q*6,'#ffffff',1-q)}}
  else if(kind==='wind'){for(let i=0;i<3;i++){const q=(t*1.4+i/3)%1,[x,y]=P_(q);RA(x-2-q*4,y-.5,3,1,'#e8fff0',(1-q)*.7*A)}}
  else if(kind==='prism'){const C=['#ff6ad8','#ffe36b','#5affd8','#8de4ff'];for(let i=0;i<4;i++){const q=(t*.7+i/4)%1,[x,y]=P_(q);R(x+Math.sin(t*4+i)*2,y,C[i],.9)}glow(...P_(.5),7,C[Math.floor(t*2)%4],.18*A)}}
 {const f=drawWeaponShape;drawWeaponShape=function(w,hx,hy,ang,L,s,now,dirS,al){const r=f.apply(this,arguments);try{if(w&&FXW[w.type])deco(w,hx,hy,ang,s,now,al)}catch(e){}return r}}

 /* ================= ② 펫 ================= */
 function H(c,x,y,now,k,id){const t=now/1000,fl=!!(typeof P!=='undefined'&&P&&P.face&&P.face.x<0),d=fl?-1:1,bob=Math.sin(now/260+id)*1.3;y+=bob*k;
  const Px=(xx,yy,w,h,col,al)=>{if(al!=null)c.globalAlpha=al;c.fillStyle=col;c.fillRect(Math.round(x+(d<0?-(xx+w):xx)*k),Math.round(y+yy*k),Math.max(1,Math.round(w*k)),Math.max(1,Math.round(h*k)));if(al!=null)c.globalAlpha=1};
  const Ci=(xx,yy,r,col,al)=>{c.globalAlpha=al==null?1:al;c.fillStyle=col;c.beginPath();c.arc(x+d*xx*k,y+yy*k,Math.max(.5,r*k),0,TAU);c.fill();c.globalAlpha=1};
  const El=(xx,yy,rx,ry,col,al)=>{c.globalAlpha=al==null?1:al;c.fillStyle=col;c.beginPath();c.ellipse(x+d*xx*k,y+yy*k,Math.max(.5,rx*k),Math.max(.5,ry*k),0,0,TAU);c.fill();c.globalAlpha=1};
  const Pg=(pts,col,al)=>{c.globalAlpha=al==null?1:al;c.fillStyle=col;c.beginPath();pts.forEach(([a,b],i)=>{const X=x+d*a*k,Y=y+b*k;i?c.lineTo(X,Y):c.moveTo(X,Y)});c.closePath();c.fill();c.globalAlpha=1};
  const OL='#10121a',blink=Math.floor(now/140+id*7)%28===0;
  const eye=(xx,yy,col,big)=>{if(blink){Px(xx-.9,yy,2,.8,OL);return}const r=big?1.6:1.15;Ci(xx,yy,r+.35,OL);Ci(xx,yy,r,col||'#1a1a24');Ci(xx-r*.35,yy-r*.4,r*.38,'#ffffff');Ci(xx+r*.3,yy+r*.25,r*.18,'#ffffff',.7)};
  const body=(xx,yy,rx,ry,col)=>{El(xx,yy,rx+.7,ry+.7,OL);El(xx,yy,rx,ry,col);El(xx,yy+ry*.38,rx*.84,ry*.5,sh(col,.75),.6);El(xx-rx*.28,yy-ry*.42,rx*.48,ry*.28,sh(col,1.35),.75)};
  const wing=(xx,yy,len,ang,col,col2)=>{const a=ang,pts=[[xx,yy],[xx+Math.cos(a-.5)*len,yy+Math.sin(a-.5)*len],[xx+Math.cos(a)*len*1.15,yy+Math.sin(a)*len*1.15],[xx+Math.cos(a+.45)*len*.8,yy+Math.sin(a+.45)*len*.8]];Pg(pts.map(([a2,b])=>[a2+(a2>xx?.5:-.5),b+.5]),OL);Pg(pts,col);Pg([pts[0],pts[1],[(pts[1][0]+pts[2][0])/2,(pts[1][1]+pts[2][1])/2]],col2||sh(col,1.3),.8)};
  const aura=(col,r)=>{const g=c.createRadialGradient(x,y,1,x,y,(r||13)*k);g.addColorStop(0,col+'55');g.addColorStop(1,col+'00');c.globalAlpha=.6+.25*Math.sin(t*3);c.fillStyle=g;c.beginPath();c.arc(x,y,(r||13)*k,0,TAU);c.fill();c.globalAlpha=1};
  const spark=(n,col,R)=>{for(let i=0;i<n;i++){const a=t*1.2+i*TAU/n,q=.5+.5*Math.sin(t*4+i*2);Ci(Math.cos(a)*(R||11),Math.sin(a)*(R||11)*.6-2,.55,col,q)}};
  El(0,10.5,6,1.3,'#000',.25);return {t,Px,Ci,El,Pg,eye,body,wing,aura,spark,OL,d}}
 const PD=[
  /* 불사조 */h=>{const {t,Px,Ci,El,Pg,eye,body,wing,aura}=h,fl=Math.sin(t*7)*.5;aura('#ff8a3a');
   for(let i=0;i<5;i++){const q=i/4,fy=Math.sin(t*9+i)*1;Pg([[-4,3],[-9-q*3,4+q*3+fy],[-6,6]],i%2?'#ffd166':'#ff5a1a',.9)}
   wing(-1,0,9,-2.3+fl,'#ff5a1a','#ffd166');body(0,2,4.6,4,'#ff6a2a');El(.6,3.6,2.6,1.8,'#ffd884',.8);
   Ci(3.4,-2.6,3.3,h.OL);Ci(3.4,-2.6,2.7,'#ff7a2a');Ci(2.8,-3.2,1.1,'#ffd884');for(let i=0;i<3;i++)Pg([[2+i,-5],[1.5+i+Math.sin(t*6+i)*.5,-8.5+i*.6],[3+i,-5]],i===1?'#ffe36b':'#ff4d1a');
   eye(4.4,-2.8,'#2a0a0a');Pg([[6,-2.4],[8.4,-1.6],[6,-1.2]],'#ffd166');wing(1,0,8,-.9-fl,'#ff7a2a','#fff0a0')},
  /* 은하 용 */h=>{const {t,Px,Ci,El,Pg,eye,body,wing,aura,spark}=h,fl=Math.sin(t*5)*.4;aura('#8a7aff');spark(4,'#ffe36b',12);
   for(let i=0;i<6;i++){const q=i/5;Ci(-4-q*5,4-q*2+Math.sin(t*3+q*4)*1.2,2.2-q*1.4,i%2?'#4a3ac8':'#5a4aff')}
   wing(-1,-1,7,-2.4+fl,'#3a2ab0','#8a7aff');body(0,2,4.6,4,'#5a4aff');for(const [a,b] of [[-2,1],[1,3],[-1,4]])Ci(a,b,.5,'#ffe36b',.5+.5*Math.sin(t*4+a));
   Ci(3.6,-2.4,3.4,h.OL);Ci(3.6,-2.4,2.8,'#6a5aff');Ci(2.9,-3.1,1.2,'#a89aff');Pg([[2,-4.8],[1,-8],[3,-5]],'#e8e0ff');Pg([[4,-5],[4.4,-8.4],[5,-5]],'#e8e0ff');
   eye(4.6,-2.6,'#ffe36b');Px(6,-1.4,1.2,.6,'#2a1a6a');wing(1,-1,6.5,-.8-fl,'#5a4aff','#c8c0ff')},
  /* 시간 부엉이왕 */h=>{const {t,Px,Ci,El,Pg,eye,body,aura}=h;aura('#ffd166');
   for(let i=0;i<2;i++){const a=t*(i?-1.2:1)+i;for(let j=0;j<6;j++){const b=a+j*TAU/6;Ci((i?7:-7)+Math.cos(b)*2.4,5+Math.sin(b)*2.4,.6,'#c89a40')}Ci(i?7:-7,5,1.6,'#8a6420')}
   body(0,1.5,6,6.4,'#c89a40');El(0,4,3.6,3.4,'#fff0d0',.85);for(let i=0;i<3;i++)Pg([[-2+i*1.6,3+i%2],[-1.2+i*1.6,4.4+i%2],[-.4+i*1.6,3+i%2]],'#c8a060',.7);
   for(const s of [-1,1]){Ci(s*2.6,-1.6,2.6,h.OL);Ci(s*2.6,-1.6,2.2,'#fff6e0');const a=t*2*s;Px(s*2.6-.2,-1.6-1.6,.4,1.6,'#2a1a08');c_line(h,s*2.6,-1.6,a);Ci(s*2.6,-1.6,.5,'#8de4ff')}
   Pg([[-.7,.5],[.7,.5],[0,2]],'#ff9a3a');for(let i=0;i<3;i++)Pg([[-3+i*2.2,-6.6],[-2.2+i*2.2,-9],[-1.4+i*2.2,-6.6]],'#ffd84a');Px(-3,-6.8,6,1,'#ffd84a');Ci(0,-7.6,.6,'#ff4d6d')},
  /* 그림자 늑대 */h=>{const {t,Px,Ci,El,Pg,eye,body,aura}=h,run=Math.sin(t*6);aura('#6a3aff',12);
   for(let i=0;i<4;i++){const q=(t*.8+i/4)%1;Ci(-7-q*4,1-q*6,1.6*(1-q),'#3a2a5a',(1-q)*.6)}
   for(const [a,s] of [[-4,1],[-1.5,-1],[1.5,1],[3.8,-1]]){Px(a,5+(s*run>0?-.6:0),1.6,4,h.OL);Px(a+.3,5+(s*run>0?-.6:0),1,3.6,'#2a2440')}
   Pg([[-6,0],[-9,-3+run],[-8,1]],'#2a2440');body(-.5,2.4,5.6,3.4,'#3a3050');El(-.5,4.2,4,1.2,'#1e1830',.7);
   Ci(4.6,-.8,3.1,h.OL);Ci(4.6,-.8,2.6,'#3a3050');Pg([[6,-.4],[9.2,.6],[6.2,1.6]],h.OL);Pg([[6,0],[8.6,.7],[6.2,1.2]],'#4a3a6a');Ci(8.8,.6,.5,'#0a0814');
   for(const s of [0,1.8])Pg([[3+s,-2.6],[3.6+s,-6],[4.6+s,-2.6]],'#2a2440');eye(5.4,-1.2,'#b48aff');Ci(5.4,-1.2,2.2,'#b48aff',.18)},
  /* 천둥 기린 */h=>{const {t,Px,Ci,El,Pg,eye,body,aura}=h,run=Math.sin(t*5);aura('#fff6a0',12);
   for(const [a,s] of [[-3.6,1],[-1.4,-1],[1.2,1],[3.2,-1]]){Px(a,4.6+(s*run>0?-.5:0),1.4,4.6,h.OL);Px(a+.2,4.6+(s*run>0?-.5:0),1,4.2,'#e8c84a');Px(a+.2,8.4,1,.8,'#3a2a1a')}
   body(0,2.6,5,3.2,'#ffe36b');for(const [a,b] of [[-2,2],[1,3],[-1,4],[2.6,1.6]])Ci(a,b,.7,'#c8a020',.7);
   Px(2.6,-3.6,2.4,5,h.OL);Px(3,-3.4,1.6,5,'#ffe36b');Ci(4.4,-4.6,2.6,h.OL);Ci(4.4,-4.6,2.1,'#ffe36b');Pg([[5.6,-4.4],[7.6,-3.6],[5.6,-3]],'#fff0b0');
   for(let i=0;i<4;i++)Pg([[1.6,-3+i*1.4],[-.4,-2.4+i*1.4],[1.8,-1.6+i*1.4]],'#8de4ff');eye(5,-5,'#1a1a2a');
   Pg([[3.6,-6.4],[3.2,-9.6],[4.4,-6.6]],'#fff6a0');if(Math.floor(t*7)%3===0){let a=3.2,b=-9.6;for(let i=0;i<3;i++){const na=a+(Math.random()-.5)*3,nb=b-1.6;Pg([[a,b],[na,nb],[na+.4,nb]],'#ffffff');a=na;b=nb}}
   Pg([[-5,1],[-8,-1+Math.sin(t*4)],[-7,2]],'#8de4ff')},
  /* 수정 거북왕 */h=>{const {t,Px,Ci,El,Pg,eye,body,aura}=h,step=Math.sin(t*4);aura('#8de4ff',12);
   for(const [a,s] of [[-5.4,1],[4.2,-1]]){Px(a,5+(s*step>0?-.6:0),2.6,3,h.OL);Px(a+.3,5.3+(s*step>0?-.6:0),2,2.5,'#5ad07a')}
   El(0,2,8.4,5.6,h.OL);El(0,2,7.7,5,'#4a8ab0');El(0,3.8,6.6,2.2,'#2a5a80');
   for(const [a,b,hh] of [[-4,-1,4],[-1.2,-2.6,6],[1.8,-2.2,5],[4.4,-.6,3.6]]){Pg([[a-1.2,b+1.4],[a,b-hh],[a+1.2,b+1.4]],'#bfefff');Pg([[a-.3,b+.8],[a,b-hh+1],[a+.5,b+.6]],'#ffffff',.8);Ci(a,b-hh*.5,.5,'#ffffff',.5+.5*Math.sin(t*4+a))}
   Px(-8,4.6,16,1,'#1e3a5a');El(8.6,1.6,3,2.6,h.OL);El(8.4,1.6,2.4,2,'#5ad07a');El(8,.9,1.2,.8,'#b0f0a0');eye(9,1.1,'#1a2a1a');
   Px(7,-1.6,3.2,.9,'#ffd84a');for(let i=0;i<3;i++)Pg([[7+i*1.1,-1.6],[7.5+i*1.1,-3],[8+i*1.1,-1.6]],'#ffd84a')},
  /* 별빛 여우 */h=>{const {t,Px,Ci,El,Pg,eye,body,aura,spark}=h,sw=Math.sin(t*3);aura('#ffe36b',12);
   for(let i=0;i<7;i++){const q=i/6;Ci(-5-q*4+Math.sin(q*2+t*2)*.6,3-q*7+sw*q*1.5,2.6-q*.4,i>4?'#ffffff':'#ff9a40')}const tx=-9+Math.sin(2+t*2)*.6,ty=-4+sw*1.5;
   for(let j=0;j<5;j++){const a=j*TAU/5-Math.PI/2+t;Pg([[tx,ty],[tx+Math.cos(a)*2.6,ty+Math.sin(a)*2.6],[tx+Math.cos(a+.6)*1,ty+Math.sin(a+.6)*1]],'#ffe36b')}
   for(const [a,s] of [[-2.4,1],[1.6,-1]])Px(a,5.2,1.4,3.4,'#c8702a');body(0,3,4.6,3.6,'#ff9a40');El(1,4.4,2.6,1.8,'#fff0d8');
   Ci(3.6,-1.8,3.2,h.OL);Ci(3.6,-1.8,2.7,'#ff9a40');El(4.8,-.6,2,1.4,'#fff0d8');Ci(6.6,-.8,.6,'#1a1a1a');
   for(const s of [1.4,4.6]){Pg([[s,-3.6],[s+.6,-7.6],[s+2,-3.6]],h.OL);Pg([[s+.4,-3.8],[s+.7,-6.6],[s+1.6,-3.8]],'#ff9a40');Pg([[s+.7,-4],[s+.8,-5.6],[s+1.2,-4]],'#ffe0c8')}
   eye(4.4,-2.2,'#1a1a1a');spark(3,'#ffffff',10)},
  /* 용암 골렘 */h=>{const {t,Px,Ci,El,Pg,eye,aura}=h,st=Math.sin(t*3)*.4,gl=.6+.4*Math.sin(t*4);aura('#ff6a1a',12);
   const blk=(xx,yy,w,hh,col)=>{Px(xx-.6,yy-.6,w+1.2,hh+1.2,h.OL);Px(xx,yy,w,hh,col);Px(xx,yy,w,.8,sh(col,1.3));Px(xx,yy+hh-.8,w,.8,sh(col,.7))};
   blk(-4.4,6,3,3.6,'#5a3a2a');blk(1.4,6,3,3.6,'#5a3a2a');blk(-6,-1+st,12,7.4,'#6a4a32');blk(-8.6,0+st,2.6,5.4,'#5a3a2a');blk(6,0+st,2.6,5.4,'#5a3a2a');blk(-3.6,-6.6+st,7.2,5.6,'#6a4a32');
   for(const [a,b,w2,hh] of [[-3,1,1,4],[-1,2,4,.8],[2,0,.8,3],[-5,3,2.6,.8],[-1.6,-5,.8,2.6]])Px(a,b+st,w2,hh,'#ff6a1a',gl);
   for(const [a,b] of [[-1.6,-4],[1.6,-4]]){Px(a-.6,b+st,1.4,1.2,'#ffd166');Ci(a+.1,b+.6+st,1.4,'#ffd166',.25*gl)}
   for(let i=0;i<3;i++){const q=(t*.7+i/3)%1;Ci(-4+i*4,-7-q*5,.6,'#ffb040',1-q)}},
  /* 서리 정령 */h=>{const {t,Px,Ci,El,Pg,eye,aura}=h;aura('#bfe8ff',13);
   for(let i=0;i<6;i++){const a=t*1.4+i*TAU/6,x2=Math.cos(a)*9,y2=Math.sin(a)*4-1;for(let j=0;j<3;j++){const b=j*Math.PI/3;Pg([[x2-Math.cos(b)*1.4,y2-Math.sin(b)*1.4],[x2+Math.cos(b)*1.4,y2+Math.sin(b)*1.4],[x2+Math.cos(b)*1.4+.3,y2+Math.sin(b)*1.4+.3]],'#ffffff',.8)}}
   Pg([[0,-8.6],[4.6,-2],[3.2,5],[0,8],[-3.2,5],[-4.6,-2]],h.OL);Pg([[0,-7.8],[3.8,-2],[2.6,4.6],[0,7.2],[-2.6,4.6],[-3.8,-2]],'#9ad8f8');
   Pg([[0,-7.8],[3.8,-2],[0,0]],'#d8f4ff');Pg([[-3.8,-2],[0,0],[-2.6,4.6]],'#6ab8ff');Pg([[0,0],[2.6,4.6],[0,7.2]],'#4a8ab0',.8);
   eye(-1.3,-1,'#2a6ab0');eye(1.4,-1,'#2a6ab0');Px(-.6,1.4,1.4,.5,'#2a6ab0');Ci(0,-9.6,.8,'#ffffff',.5+.5*Math.sin(t*5))},
  /* 황금 드래곤 */h=>{const {t,Px,Ci,El,Pg,eye,body,wing,aura,spark}=h,fl=Math.sin(t*5)*.45;aura('#ffd84a');spark(3,'#fff6d0',11);
   for(let i=0;i<6;i++){const q=i/5;Ci(-4-q*5,4-q*2+Math.sin(t*3+q*4)*1.2,2.3-q*1.5,i%2?'#c89a20':'#ffd84a')}Pg([[-9.4,1.2],[-11.4,-.4],[-10,2.4]],'#ff6a2a');
   wing(-1,-1,8,-2.4+fl,'#c89a20','#ffe79a');body(0,2,4.8,4.2,'#ffd84a');for(let i=0;i<4;i++)Px(-2+i*1.3,4.4,1,.6,'#c89a20',.8);
   Ci(3.8,-2.4,3.5,h.OL);Ci(3.8,-2.4,2.9,'#ffd84a');Ci(3.1,-3.1,1.2,'#fff6c0');Pg([[2.2,-4.8],[1,-8.4],[3,-5]],'#fff6d0');Pg([[4.2,-5],[4.8,-8.6],[5.2,-5]],'#fff6d0');
   eye(4.8,-2.6,'#ff4d6d');Pg([[6.4,-1.8],[8.4,-1.4],[6.4,-.8]],'#c89a20');wing(1,-1,7,-.8-fl,'#ffd84a','#fff6c0')},
  /* 암흑 까마귀 */h=>{const {t,Px,Ci,El,Pg,eye,body,wing,aura}=h,fl=Math.sin(t*8)*.6;aura('#ff4d6d',11);
   for(let i=0;i<3;i++)Pg([[-4,3],[-9,1+i*1.6],[-5,5]],i%2?'#14141e':'#2a2a3a');wing(-.5,0,8.5,-2.5+fl,'#1e1e2a','#4a4a6a');
   body(0,2,4.4,4,'#2a2a3a');El(.8,3.6,2.4,1.6,'#3a3a50',.8);Ci(3.4,-2,3.1,h.OL);Ci(3.4,-2,2.6,'#2a2a3a');Ci(2.8,-2.8,1,'#4a4a60');
   Pg([[5.4,-2.6],[9,-1.4],[5.4,-.6]],h.OL);Pg([[5.6,-2.2],[8.4,-1.4],[5.6,-1]],'#ffd166');eye(4.2,-2.4,'#ff4d6d');Ci(4.2,-2.4,2,'#ff4d6d',.2);
   for(const a of [-1,1.4])Px(a,5.8,.8,3,'#ffd166');wing(1,0,7.5,-.7-fl,'#2a2a3a','#5a5a7a');
   for(let i=0;i<2;i++){const q=(t*.5+i/2)%1;Pg([[-3+i*5,8+q*2],[-2.4+i*5,7+q*2],[-1.8+i*5,8.4+q*2]],'#2a2a3a',1-q)}},
  /* 무지개 고래 */h=>{const {t,Px,Ci,El,Pg,eye,body,aura}=h,C=['#ff6a8a','#ffb040','#ffe36b','#7dff9a','#8de4ff','#b48aff'];aura('#ff9af0',13);
   for(let i=0;i<6;i++){const q=(t*.8+i/6)%1;Ci(4+Math.sin(t*2+i)*.6,-6-q*6,1.1*(1-q*.4),C[i],(1-q)*.9)}
   Pg([[-6,1],[-10.5,-2.6+Math.sin(t*3)],[-9.6,1.6],[-10.5,4.6+Math.sin(t*3)]],h.OL);Pg([[-6,1.2],[-10,-1.8+Math.sin(t*3)],[-9,1.6],[-10,4+Math.sin(t*3)]],'#3a7ae0');
   El(0,1.4,7.4,4.8,h.OL);El(0,1.4,6.8,4.2,'#5a9aff');El(.6,3.4,5.6,2,'#e8f4ff');for(let i=0;i<5;i++)Px(-3+i*1.6,3,.5,2.2,'#a8c8ff',.7);El(-2,-1.2,3,1.2,'#a8d0ff',.8);
   eye(4,0,'#1a2a4a',1);Px(5,2,1.6,.5,'#2a4a8a');Ci(1.4,2,.9,'#ff9aa8',.5);Pg([[-1,3.6],[-3.6,6.6],[1,4.6]],'#3a7ae0')},
  /* 바람 그리핀 */h=>{const {t,Px,Ci,El,Pg,eye,body,wing,aura}=h,fl=Math.sin(t*6)*.5,run=Math.sin(t*5);aura('#c8ffd8',12);
   for(const [a,s] of [[-3.4,1],[-1,-1],[1.6,1],[3.6,-1]]){Px(a,4.6+(s*run>0?-.5:0),1.4,4.2,h.OL);Px(a+.2,4.6+(s*run>0?-.5:0),1,3.8,s>0?'#c8a060':'#ffd166')}
   Pg([[-5.6,1],[-9,-2+Math.sin(t*4)],[-8.4,2.6]],'#a07a40');Ci(-9,-2+Math.sin(t*4),1,'#5a3a1a');
   wing(-.6,-.6,8.6,-2.3+fl,'#f4f6f8','#c8ffd8');body(-.4,2.4,5.2,3.4,'#c8a060');El(2.4,1.2,2.6,2.6,'#ffffff',.9);
   Ci(4,-2.6,3,h.OL);Ci(4,-2.6,2.5,'#ffffff');Ci(3.3,-3.2,1,'#ffffff');Pg([[5.6,-3],[8.6,-2],[5.8,-.6]],h.OL);Pg([[5.8,-2.7],[8,-2],[5.8,-1.1]],'#ffd166');
   eye(4.6,-3,'#1a1a1a');for(let i=0;i<3;i++)Pg([[2+i,-4.6],[1.4+i,-7+i*.4],[2.8+i,-4.6]],'#e8eef4');wing(.6,-.6,7.6,-.8-fl,'#ffffff','#e8fff0')},
  /* 혼돈 슬라임 */h=>{const {t,Px,Ci,El,Pg,eye,aura}=h,w=Math.sin(t*4),C=['#ff4dd8','#8a5aff','#5affd8','#ffe36b'];aura('#c86aff',13);
   for(let i=0;i<4;i++){const a=t*2+i*TAU/4;Pg([[Math.cos(a)*10,Math.sin(a)*5-2],[Math.cos(a)*10+1.2,Math.sin(a)*5-3.4],[Math.cos(a)*10+2,Math.sin(a)*5-1.4]],C[i])}
   const rx=6.6+w*.6,ry=5.6-w*.6;Pg([[-rx-.7,7.4],[-rx-.7,2],[-rx*.6,-ry],[0,-ry-2.4+w],[rx*.6,-ry],[rx+.7,2],[rx+.7,7.4]],h.OL);
   Pg([[-rx,7],[-rx,2],[-rx*.55,-ry+.6],[0,-ry-1.6+w],[rx*.55,-ry+.6],[rx,2],[rx,7]],'#c86aff');El(0,5,rx*.85,2,'#8a3ac8',.7);El(-2.4,-1.6,1.6,2.4,'#ffffff',.55);
   Ci(-1.8,-1,1.9,'#ffffff');Ci(2.2,-1,1.9,'#ffffff');Ci(-1.6+Math.sin(t*2)*.5,-.8,1,'#1a0a24');Ci(2.4+Math.sin(t*2)*.5,-.8,1,'#1a0a24');Pg([[-1.4,2.2],[0,3.4],[1.6,2.2]],'#5a1a6a');
   for(let i=0;i<3;i++){const q=(t*.9+i/3)%1;Ci(-4+i*4,6-q*12,.6,C[i],1-q)}},
  /* 여신의 천사 */h=>{const {t,Px,Ci,El,Pg,eye,wing,aura,spark}=h,fl=Math.sin(t*4)*.5;aura('#fff6d0',13);spark(5,'#ffe79a',11);
   wing(-1.6,0,8.6,-2.6+fl,'#ffffff','#fff6d0');wing(1.6,0,8.6,-.55-fl,'#ffffff','#fff6d0');
   Pg([[-4,8],[-2.6,1],[2.6,1],[4,8]],h.OL);Pg([[-3.4,7.6],[-2.2,1.4],[2.2,1.4],[3.4,7.6]],'#ffffff');Pg([[-.8,1.4],[.8,1.4],[1.4,7.6],[-1.4,7.6]],'#fff0c0',.8);Px(-2.2,3,4.4,.8,'#ffd84a');
   Ci(0,-2.6,3.4,h.OL);Ci(0,-2.6,2.9,'#ffe0c8');Pg([[-3.4,-3],[-3,-6],[0,-6.6],[3,-6],[3.4,-3],[2,-4.4],[0,-4.8],[-2,-4.4]],'#ffe79a');
   eye(-1.1,-2.4,'#5ab8ff');eye(1.3,-2.4,'#5ab8ff');Ci(-2,-1,.7,'#ff9aa8',.5);Ci(2.2,-1,.7,'#ff9aa8',.5);
   const o=h;El(0,-8.6+Math.sin(t*2)*.4,3.4,.9,'#ffd84a',.9);El(0,-8.6+Math.sin(t*2)*.4,2.4,.45,'#fff6d0',.9)}];
 function c_line(h,x,y,a){h.Pg([[x,y],[x+Math.cos(a)*1.8,y+Math.sin(a)*1.8],[x+Math.cos(a)*1.8+.3,y+Math.sin(a)*1.8+.3]],'#2a1a08')}
 const P0=M.P0;
 {const base=drawPet;drawPet=function(c,id,x,y,now,k){const i=id-P0;if(i>=0&&i<PD.length){try{c.save();PD[i](H(c,x,y,now,(k||1)*1.12,id));c.restore();c.globalAlpha=1;return}catch(e){c.globalAlpha=1;console.error('pet100',e)}}return base.apply(this,arguments)}}
 window.MART100={PD,S,FXW};
}catch(e){console.error('v100 art',e)}})();
