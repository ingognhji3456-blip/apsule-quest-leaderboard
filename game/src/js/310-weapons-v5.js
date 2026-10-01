/* ================= v5: 무기 개성(스프라이트·오라) · 무기 필살기 · 최종 각성 · 엘리트 잡몹 · 보물상자 ================= */
/* ---------- 무기 픽셀 스프라이트 (손잡이 끝 → 칼끝 순서) ---------- */
const WSPR={
 sword:{g:4,pal:{o:'#12161a',P:'#9aa4ac',g:'#6a4a2a',G:'#8a6b45',C:'#8a949c',B:'#dfe6ea',e:'#ffffff'},r:[".ooo.",".oPo.",".ogo.",".oGo.",".ogo.",".oGo.","oCCCo","ooCoo",".eBo.",".eBo.",".eBo.",".eBo.",".eBo.",".eBo.",".eBo.",".eBo.",".eBo.","..eo.","..o.."]},
 dagger:{g:2,pal:{o:'#1a120a',Y:'#ffd166',b:'#6a4a2a',C:'#e0a060',e:'#ffe0b0',d:'#a86a30'},r:["..o..",".oYo.",".obo.",".obo.","oYYYo",".eCo.","oeCdo","oeCdo",".eCo.",".eCo.","..e.."]},
 great:{g:5,pal:{o:'#0e1114',P:'#8a949c',g:'#4a3a2a',G:'#6a5238',C:'#5a646c',R:'#c8d0d8',B:'#b8c2ca',F:'#6a747c',e:'#f0f4f6'},r:["..ooo..",".oPPPo.","..oPo..","..ogo..","..oGo..","..ogo..","..oGo..","..ogo..","oCCCCCo","oCRCRCo","ooCCCoo",".oeBBo.",".oeFBo.",".oeFBo.",".oeFBo.",".oeFBo.",".oeFBo.",".oeFBo.",".oeFBo.",".oeBBo.","..oeo..","...o..."]},
 katana:{g:4,curve:2.4,pal:{o:'#101014',K:'#1a1a24',R:'#c8323a',Y:'#d4ae4a',B:'#e8eef4',h:'#ffffff',s:'#9aa8b8'},r:["..o..",".oKo.",".oRo.",".oKo.",".oRo.",".oKo.",".oRo.","YYYYY",".oYo.",".hBs.",".hBs.",".hBs.",".hBs.",".hBs.",".hBs.",".hBs.",".hBs.",".hBs.",".hBs.","..hs.","..h.."]},
 axe:{g:4,pal:{o:'#141008',Y:'#c8a040',H:'#7a5530',A:'#b8c0c8',e:'#ffffff',d:'#6a747c'},r:["...oYo...","...oHo...","...oHo...","...oHo...","...oHo...","...oHo...","...oHo...","...oHo...","...oHo...","...oHo...",".oAAHAAo.","oAAAHAAAo","oedAHAdeo","oedAHAdeo","oAAAHAAAo",".oAAHAAo.","...oYo...","....o...."]},
 rapier:{g:3,pal:{o:'#0e1820',Y:'#9fe8ff',b:'#2a4a6a',c:'#4a8ab0',I:'#dff8ff',e:'#ffffff'},r:["...o...","..oYo..","..obo..","..obo..","..obo..",".cYYYc.","c.oYo.c",".c...c.","...I...","...I...","...I...","...I...","...I...","...I...","...I...","...I...","...I...","...I...","...e..."]},
 flame:{g:3,wave:true,pal:{o:'#1a0806',g:'#3a1a10',R:'#8a1a10',F:'#ff7a2a',W:'#ffe36b',Y:'#fff6c0'},r:["..ooo..","..oRo..","..ogo..","..ogo..","..ogo..","oRRRRRo",".oRRRo.",".oFWFo.",".oFWFo.",".oFWFo.",".oFWFo.",".oFWFo.",".oFWFo.",".oFWFo.",".oFWFo.",".oFWFo.",".oFWFo.","..oFo..","...Y..."]},
 spear:{g:5,pal:{o:'#10101a',s:'#5a5a78',S:'#8a8aa8',Y:'#ffe36b',y:'#c8a020',e:'#ffffff'},r:["...o...","..oYo..","...s...","...S...","...s...","...S...","...s...","..YYY..","...s...","...S...","...s...","...S...","...s...","...S...","...s...","..YYY..","oY.S.Yo","ooYYYoo",".oeYyo.",".oeYyo.","..eYo..","..oYo..","...e..."]},
 scythe:{g:4,side:true,pal:{o:'#140e1a',s:'#3a2a4a',S:'#6a5a7a',C:'#d8a8ff',c:'#a070e0',e:'#f4e8ff'},r:["....oSo....","....oso....","....oSo....","....oso....","....oSo....","....oso....","....oSo....","....oso....","....oSo....","....oso....","....oSo....","....oso....","....oSocc..","....oSoCCc.","....oSooCCc","....oSo..CC","....oSo...C","....oSo...e","....oeo...."]},
 chrono:{g:4,pal:{o:'#1a1206',R:'#ff4d6d',Y:'#ffd84a',y:'#c89a20',W:'#fff6e0',C:'#8a6a20',G:'#ffe79a',B:'#fff0c8',u:'#7df9ff'},r:["..ooo..","..oRo..","..oYo..","..oyo..","..oYo..","..oyo..","oYYYYYo","YWWCWWY","YWCWCWY","oYYYYYo",".oGBGo.",".oGuGo.",".oGBGo.",".oGBGo.",".oGuGo.",".oGBGo.",".oGBGo.",".oGuGo.",".oGBGo.","..oGo..","...W..."]},
};
WEAPONS.forEach((w,i)=>{w.trail=['#ffffff','#ffc080','#c8d0d8','#ff8a9a','#e0e6ea','#9fe8ff','#ff8a3a','#ffe36b','#d8a8ff','#ffe79a'][i];w.hitF=[520,700,300,820,260,900,440,1000,380,660][i];
 w.sp=['십자 베기','그림자 난무','대지 가르기','일섬','회전 도끼','빙결 찌르기','화염 폭풍','천둥 낙뢰','영혼 수확','시간 정지'][i]});
function drawWeaponShape(w,hx,hy,ang,L,s,now,dirS,al){const sp=WSPR[w.type]||WSPR.sword,rows=sp.r,n=rows.length,wd=rows[0].length,cx=(wd-1)/2,cs=s*.72,A=al==null?1:al,ca=Math.cos(ang),sa=Math.sin(ang),px=-sa*(sp.side?dirS:1),py=ca*(sp.side?dirS:1),sz=Math.ceil(cs)+1;
 for(let j=0;j<n;j++){const d=(j-sp.g)*cs;let off=0;if(sp.curve&&j>sp.g+3){const k=(j-sp.g-3)/(n-sp.g-3);off=k*k*sp.curve}if(sp.wave&&j>6&&j<n-2)off=Math.sin(j*1.3)*.6;
  const row=rows[j];for(let i=0;i<wd;i++){const k=row[i];if(k==='.')continue;const col=sp.pal[k];if(!col)continue;const o2=(i-cx+off*dirS)*cs,x=hx+ca*d+px*o2,y=hy+sa*d+py*o2;ctx.globalAlpha=A;ctx.fillStyle=col;ctx.fillRect(Math.round(x-sz/2),Math.round(y-sz/2),sz,sz)}}
 ctx.globalAlpha=1;const tip=(n-1-sp.g)*cs,tx=hx+ca*tip,ty=hy+sa*tip,mid=(n*.62-sp.g)*cs,mx=hx+ca*mid,my=hy+sa*mid,t=now/1000;
 switch(w.type){
 case 'katana':if(Math.floor(now/900)%3===0){const q=(now%900)/900;RA(hx+ca*(q*tip)-1,hy+sa*(q*tip)-1,2,2,'#ffffff',.9*A)}break;
 case 'rapier':for(let i=0;i<2;i++){const q=((t*1.3+i*.5)%1);RA(hx+ca*tip*q+Math.sin(t*9+i)*2,hy+sa*tip*q-q*3,1,1,'#e8fbff',(1-q)*A)}break;
 case 'flame':for(let i=0;i<4;i++){const q=((t*1.8+i/4)%1),d2=tip*(.3+.7*((i*37)%10)/10);RA(hx+ca*d2+Math.sin(t*8+i)*2-1,hy+sa*d2-q*8-1,2,2,q<.4?'#ffe36b':'#ff5a1f',(1-q)*.9*A)}glow(mx,my,7,'#ff7a2a',.18*A);break;
 case 'spear':if(Math.floor(t*7)%4===0){let x0=tx,y0=ty;for(let k=0;k<4;k++){const x1=x0+(RND()-.5)*8,y1=y0-3-RND()*3;line(x0,y0,x1,y1,1,(a,b)=>RA(a,b,1,1,'#fff6a0',.9*A));x0=x1;y0=y1}}glow(tx,ty,5,'#ffe36b',.3*A);break;
 case 'scythe':for(let i=0;i<3;i++){const q=((t*.7+i/3)%1);RA(tx+Math.cos(t*2+i*2)*5,ty+Math.sin(t*2+i*2)*4-q*6,1,1,'#d8a8ff',(1-q)*A)}glow(tx,ty,7,'#b88aff',.22*A);break;
 case 'chrono':{const gx=hx+ca*(7.5-sp.g)*cs,gy=hy+sa*(7.5-sp.g)*cs;glow(gx,gy,6,'#ffe79a',(.25+.15*Math.sin(t*3))*A);for(let i=0;i<3;i++){const q=t*1.2+i*2.1;RA(gx+Math.cos(q)*7-.5,gy+Math.sin(q)*7-.5,1,1,'#7df9ff',.8*A)}break}
 case 'axe':if(Math.floor(now/1200)%4===0)RA(tx-1,ty-1,2,2,'#ffffff',.8*A);break;
 case 'great':RA(mx-1,my-1,2,2,'#ffffff',.25*A);break;
 case 'dagger':if(Math.floor(now/700)%3===0)RA(tx-1,ty-1,2,2,'#fff0d0',.9*A);break}}
WPOSE.great.idle=-1.2;WPOSE.dagger.idle=1.25;WPOSE.axe.idle=-1.25;WPOSE.great.shoulder=true;
/* 무기 궤적 색 반영: 동굴·보스 휘두르기 잔상 */
function drawSword(x,y,s,fl,now){const w=curWp(),pose=WPOSE[w.type]||WPOSE.sword,dirS=fl?-1:1,sp=WSPR[w.type]||WSPR.sword,L=(sp.r.length-sp.g)*s*.72;
 let bob=0;if(P.walkOn&&P.walkT!=null){const f=((Math.floor(P.walkT/(Math.PI/2))%4)+4)%4;bob=f%2?-1:0}const sway=Math.sin(now/520)*.06;
 const hx=x+(fl?.5:11.5)*s,hy=y+(6.2+bob)*s,swing=P.lungeT?(now-P.lungeT)/(P.lungeDur||120):2,active=swing>=0&&swing<1,toDir=a=>fl?Math.PI-a:a;
 if(!active){let a=pose.idle+sway;if(P.walkOn)a+=Math.sin((P.walkT||0)*2)*.08;drawWeaponShape(w,hx,hy,toDir(a),L,s,now,dirS);return}
 const e=swing<.5?2*swing*swing:1-Math.pow(-2*swing+2,2)/2;
 if(pose.thrust){const aim=toDir(-.1),ext=Math.sin(Math.min(1,swing)*Math.PI)*L*.5;drawWeaponShape(w,hx+Math.cos(aim)*ext,hy+Math.sin(aim)*ext,aim,L,s,now,dirS);for(let k=1;k<5;k++)RA(hx+Math.cos(aim)*(ext+L)-k*3*dirS,hy+Math.sin(aim)*(ext+L)-1,3,2,w.trail,.35-.07*k);return}
 const a0=pose.shoulder?-2.4:-1.5,a1=pose.shoulder?1.3:1.4,ac=a0+(a1-a0)*e;
 for(let k=5;k>=1;k--){const ak=a0+(a1-a0)*Math.max(0,e-k*.06),aa=toDir(ak);for(let d=L*.3;d<=L;d+=1.4)RA(hx+Math.cos(aa)*d-1,hy+Math.sin(aa)*d-1,2,2,k===1?'#ffffff':w.trail,.16*(6-k)/5)}
 drawWeaponShape(w,hx,hy,toDir(ac),L,s,now,dirS)}
/* ---------- 필살기 ---------- */
function spOnHit(now){if(!G.vuln)return;if(G._spV!==G.vuln){G._spV=G.vuln;G.spMeter=G.spMeter||0;G.spUsed=false}G.spMeter=Math.min(5,(G.spMeter||0)+1);if(G.spMeter===5&&!G.spUsed){G.pops.push({x:P.x,y:P.y-40,t:now,tx:'필살기 준비!',col:'#ffe79a'});sfx(880,.2,'triangle',.05,1320)}}
function spDmg(amt,x,y,col,now){if(G.state!=='play'||(G.cine&&G.cine.type==='revive'))return;const d=Math.round(amt);G.hp=Math.max(0,G.hp-d);G.hurt=.16;G.score+=d*12;G.pops.push({x:x+(RND()-.5)*20,y:y-10-RND()*16,t:now,tx:'-'+d,col:col||'#ffffff'});spawnPuff(x,y,10,col||'#ffffff');G.shake=Math.max(G.shake,.35);if(G.hp<=0)startDying(now)}
function useSpecial(){const now=performance.now(),w=curWp(),wi=WEAPONS.indexOf(w),g=bgeo();G.spUsed=true;G.spMeter=0;initAudio();
 const total=G.maxHp*(.07+.015*wi)*(1+(curPet().dmg||0)),type=w.type;
 const plan={sword:[2,[200,520]],dagger:[8,[0,90,180,270,360,450,540,630]],great:[1,[560]],katana:[1,[900]],axe:[3,[380,560,740]],rapier:[5,[200,300,400,500,600]],flame:[5,[250,400,550,700,850]],spear:[4,[300,500,700,900]],scythe:[1,[520]],chrono:[12,[1100]]}[type]||[1,[400]];
 const hits=plan[1],dur=Math.max(...hits)+700;G.sp={type,t0:now,dur,name:w.sp,col:w.trail,cx:g.x,cy:g.coreY,done:[]};
 G.vuln.t1=Math.max(G.vuln.t1,G.beat+dur/G.ms+(type==='chrono'?2:type==='rapier'?1.5:.6));G.clickTarget=null;G.nextCircle=now+dur;
 banner('필살! '+w.sp);G.flash=Math.max(G.flash,.5);G.hitstop=now+120;sfx(220,.4,'sawtooth',.07,1760);sfx(110,.5,'square',.05,55);P.lungeT=now;P.lungeA=Math.atan2(g.coreY-P.y,g.x-P.x);P.lungeDur=260;
 hits.forEach((ms,k)=>setTimeout(()=>{if(!G||G.state!=='play')return;const n2=performance.now(),per=type==='chrono'?total:total/hits.length;
  if(type==='chrono'){for(let i=0;i<12;i++)setTimeout(()=>spDmg(per/12,g.x+(RND()-.5)*50,g.coreY+(RND()-.5)*40,'#ffe79a',performance.now()),i*35)}else spDmg(per,g.x,g.coreY,w.trail,n2);
  G.sp&&G.sp.done.push(n2);sfx(w.hitF*(1+k*.05),.18,'square',.06,w.hitF*.4);sfx(90,.2,'sawtooth',.05,40);fxRing(g.x,g.coreY,n2,380,50+k*6,w.trail)},ms));
 if(type==='scythe')setTimeout(()=>{P.hp=Math.min(P.maxhp,P.hp+15);G.pops.push({x:P.x,y:P.y-30,t:performance.now(),tx:'+15',col:'#7dffa8'})},900)}
function drawSpecialFX(now){const s=G.sp;if(!s)return;const k=(now-s.t0)/s.dur;if(k>=1){G.sp=null;return}const t=now-s.t0,cx=s.cx,cy=s.cy,col=s.col,gx=bgeo();
 const dark=Math.min(1,t/150)*(k>.85?(1-k)/.15:1);RA(0,0,W,H,s.type==='chrono'?'#20202a':'#000',(s.type==='chrono'?.45:.3)*dark);
 const LN=(x0,y0,x1,y1,c,w2,a)=>line(x0,y0,x1,y1,1,(x,y)=>RA(x-w2/2,y-w2/2,w2,w2,c,a));
 switch(s.type){
 case 'sword':for(const [st,a] of [[200,.8],[520,-.8]]){if(t<st)continue;const q=Math.min(1,(t-st)/120),fa=Math.max(0,1-(t-st)/500),L=90*q;LN(cx-Math.cos(a)*L,cy-Math.sin(a)*L,cx+Math.cos(a)*L,cy+Math.sin(a)*L,'#ffffff',4,fa);LN(cx-Math.cos(a)*L,cy-Math.sin(a)*L,cx+Math.cos(a)*L,cy+Math.sin(a)*L,col,8,fa*.4)}break;
 case 'dagger':for(let i=0;i<8;i++){const st=i*90;if(t<st||t>st+300)continue;const a=i*2.4,x=cx+Math.cos(a)*40,y=cy+Math.sin(a)*30,fa=1-(t-st)/300;RA(x-6,y-9,12,18,'#2a1a3a',fa*.6);LN(x,y,cx-Math.cos(a)*30,cy-Math.sin(a)*22,col,3,fa)}break;
 case 'great':{const st=560,q=Math.min(1,t/st);const by=cy-160+q*160;for(let yy=by-60;yy<by;yy+=3)RA(cx-6,yy,12,3,'#c8d0d8',.8);RA(cx-10,by-64,20,6,'#6a5238',.9);if(t>st){const f=(t-st)/500;for(const sg of [-1,1])for(let i=0;i<8;i++)RA(cx+sg*(10+f*150)+sg*i*6,cy+30-i,4,8,'#e0c8a0',(1-f)*.8);RA(0,0,W,H,'#ffffff',Math.max(0,.5-f))}break}
 case 'katana':{if(t<700){const q=t/700;RA(0,cy-1,W*q,2,'#ffffff',.9);RA(0,cy-3,W*q,6,col,.25);ctx.font='bold 22px monospace';ctx.textAlign='center';ctx.fillStyle='#ffffff';ctx.globalAlpha=Math.min(1,t/200);ctx.fillText('一 閃',W/2,cy-30);ctx.globalAlpha=1;ctx.textAlign='left'}else{const f=(t-700)/600;RA(0,0,W,H,'#ffffff',Math.max(0,.8-f*1.5));RA(0,cy-1,W,2,col,1-f)}break}
 case 'axe':for(let i=0;i<3;i++){const st=i*180,q=clamp((t-st)/380,0,1);if(t<st||q>=1&&t>st+600)continue;const a=t/60+i*2.1,rr=(1-q)*110+8,x=cx+Math.cos(i*2.1+q*4)*rr,y=cy+Math.sin(i*2.1+q*4)*rr*.7;for(let b=0;b<2;b++){const aa=a+b*Math.PI;LN(x,y,x+Math.cos(aa)*9,y+Math.sin(aa)*9,'#b8c0c8',3,1)}RA(x-2,y-2,4,4,'#7a5530',1)}break;
 case 'rapier':for(let i=0;i<5;i++){const st=100+i*100,q=clamp((t-st)/100,0,1);if(t<st)continue;const sx=P.x+(i-2)*6,sy=P.y-14,x=lerp(sx,cx,q),y=lerp(sy,cy,q),a=Math.atan2(cy-sy,cx-sx);LN(x-Math.cos(a)*12,y-Math.sin(a)*12,x,y,'#dff8ff',2,q<1?1:Math.max(0,1-(t-st-100)/400))}if(t>600){const f=Math.min(1,(t-600)/200);for(let i=0;i<8;i++){const a=i*TAU/8;LN(cx,cy,cx+Math.cos(a)*30*f,cy+Math.sin(a)*24*f,'#9fe8ff',3,.8)}pcirc(cx,cy,14*f,'#c8f6ff',.35)}break;
 case 'flame':for(let i=0;i<5;i++){const st=250+i*150;if(t<st)continue;const f=(t-st)/500;if(f>1)continue;const x=cx+(i-2)*28,h=100*Math.sin(Math.min(1,f*2)*Math.PI/2);for(let yy=0;yy<h;yy+=4){const w2=10-yy*.05+Math.sin(yy*.3+t/40)*3;RA(x-w2/2,cy+30-yy,w2,4,yy<h*.3?'#ffe36b':yy<h*.7?'#ff7a2a':'#c83a1a',(1-f)*.85)}}break;
 case 'spear':for(let i=0;i<4;i++){const st=300+i*200;if(t<st||t>st+250)continue;const f=(t-st)/250,x=cx+(i%2?14:-14);let x0=x,y0=0;for(let s2=0;s2<10;s2++){const x1=x+(RND()-.5)*20,y1=(s2+1)*(cy-10)/10;LN(x0,y0,x1,y1,'#fff6a0',3,1-f);LN(x0,y0,x1,y1,'#ffe36b',7,(1-f)*.35);x0=x1;y0=y1}RA(0,0,W,H,'#fffbe0',(1-f)*.3)}break;
 case 'scythe':{const q=clamp((t-200)/320,0,1);if(t>200&&t<900){for(let i=0;i<24;i++){const a=-2.4+q*3.8*(i/24),rr=70;RA(cx+Math.cos(a)*rr-2,cy+Math.sin(a)*rr*.7-2,4,4,i%3?'#d8a8ff':'#ffffff',Math.max(0,1-(t-520)/400))}}if(t>600){for(let i=0;i<6;i++){const f=clamp((t-600-i*40)/500,0,1);RA(lerp(cx,P.x,f)+Math.sin(f*6+i)*8-2,lerp(cy,P.y-14,f)-2,4,4,'#b8ffd8',1-f)}}break}
 case 'chrono':{const q=Math.min(1,t/300);pcirc(cx,cy,60*q,'#fff6e0',.12);for(let i=0;i<12;i++){const a=i*TAU/12;RA(cx+Math.cos(a)*56*q-1,cy+Math.sin(a)*56*q-1,3,3,'#ffe79a',.9)}const ha=t/300;line(cx,cy,cx+Math.cos(ha)*40*q,cy+Math.sin(ha)*40*q,2,(x,y)=>RA(x-1,y-1,3,3,'#ffe79a',.9));
  if(t<1100){for(let i=0;i<12;i++){if(t<i*80)continue;const a=i*1.7;LN(cx-Math.cos(a)*50,cy-Math.sin(a)*40,cx+Math.cos(a)*50,cy+Math.sin(a)*40,'#ffffff',2,.7)}ctx.font='bold 16px monospace';ctx.textAlign='center';ctx.fillStyle='#ffe79a';ctx.fillText('시간 정지',W/2,AY+30);ctx.textAlign='left'}else{RA(0,0,W,H,'#ffffff',Math.max(0,.7-(t-1100)/500))}break}}
 if(t<900){const a=t<120?t/120:t>700?(900-t)/200:1;ctx.globalAlpha=a;ctx.font='bold 14px monospace';ctx.textAlign='center';ctx.fillStyle='#05090b';ctx.fillText('필살 · '+s.name,W/2+1,AY+AH-29);ctx.fillStyle=col;ctx.fillText('필살 · '+s.name,W/2,AY+AH-30);ctx.textAlign='left';ctx.globalAlpha=1}}
function drawSpecialHUD(now){if(G._spV!==G.vuln&&G.vuln){G._spV=G.vuln;G.spUsed=false}if(!G.vuln){G.spMeter=0}
 drawSpecialFX(now);drawAwakenFX(now);
 const ready=G.vuln&&G.spMeter>=5&&!G.spUsed&&!G.sp;if(isTouchUI()){const bA=$('btnA'),want=ready?'':null;if(ready){if(bA.style.display!=='')bA.style.display='';if(bA.textContent!=='필살')bA.textContent='필살'}else if(bA.textContent==='필살')bA.textContent='ATTACK'}
 if(!G.vuln||G.state!=='play')return;const cx=W/2,y=AY+AH-22;for(let i=0;i<5;i++){const on=i<(G.spMeter||0),x=cx-26+i*13;for(let k=0;k<4;k++)R(x-k,y+k,1+k*2,1,on?(ready?(Math.floor(now/90)%2?'#ffffff':'#ffe79a'):'#ffcf5a'):'#3a3a44');for(let k=0;k<3;k++)R(x-2+k,y+4+k,5-k*2,1,on?'#c8961a':'#2a2a30')}
 if(ready){ctx.font='bold 10px monospace';ctx.textAlign='center';ctx.fillStyle='#05090b';const tx=isTouchUI()?'필살 버튼!':'SPACE → 필살 '+curWp().sp;ctx.fillText(tx,cx+1,y-3);ctx.fillStyle=Math.floor(now/120)%2?'#ffe79a':'#ffffff';ctx.fillText(tx,cx,y-4);ctx.textAlign='left'}}
/* ---------- 최종 각성 ---------- */
function drawAwakenAura(now,back){if(G.omega||G.phase<2||G.state==='dying'||G.boss.dorm)return;const g=bgeo(),t=now/1000,hw=g.hf*U,top=g.top,bot=g.y;
 if(back){for(let i=0;i<22;i++){const q=((t*.8)+i/22)%1,x=g.x+Math.sin(i*2.7)*hw*1.1,y=bot-q*(bot-top+40);RA(x-2,y-3,4+(i%2)*2,6,i%3?'#ff2d55':'#1a0006',.55*(1-q))}glow(g.x,g.coreY,hw*1.6,'#ff2d55',.12+.06*Math.sin(t*4));return}
 const r=rng(hash('awk|'+G.bi)),pu=.55+.45*Math.sin(t*6);
 for(let i=0;i<5;i++){let x=g.x+(r()-.5)*hw*1.4,y=top+(r()*.8+.1)*(bot-top);for(let k=0;k<4;k++){const nx=x+(r()-.5)*14,ny=y+(r()-.3)*12;line(x,y,nx,ny,1,(a,b)=>{RA(a-1,b-1,2,2,'#ff4d1a',pu);RA(a,b,1,1,'#fff0a0',pu)});x=nx;y=ny}}
 for(let i=0;i<4;i++){const ex=g.x+(r()-.5)*hw*1.2,ey=g.headY+(r()-.2)*16,bl=Math.floor(t*3+i)%9===0;if(bl)continue;glow(ex,ey,4,'#ff2d55',.6);R(ex-1,ey-1,3,2,'#ff2d55');R(ex,ey-1,1,1,'#ffffff')}
 for(let i=0;i<7;i++){const x=g.x-hw+i*(hw*2/6),h=6+((i*3)%4)*3+Math.sin(t*5+i)*2;for(let j=0;j<h;j++)RA(x-(h-j)/h*2,top-j,Math.max(1,(h-j)/h*4),1,j>h-3?'#ffffff':'#ff2d55',.8)}}
function drawAwakenFX(now){const c=G.cine;if(!c||c.type!=='phase'||c.ph<2)return;const t=now-c.t0,p=t/c.dur;
 RA(0,0,W,H,'#2a0008',Math.min(.45,t/600)*(p>.9?(1-p)/.1:1));
 if(Math.floor(t/140)%5===0&&t<3000){let x=40+RND()*(W-80),y=0;for(let k=0;k<9;k++){const nx=x+(RND()-.5)*30,ny=y+H/9;line(x,y,nx,ny,1,(a,b)=>{RA(a-1,b-1,3,3,'#ff9ab0',.9);RA(a,b,1,1,'#ffffff',1)});x=nx;y=ny}RA(0,0,W,H,'#ffffff',.08)}
 for(let i=0;i<10;i++){const a=i*TAU/10+t/400,rr=40+((t/6+i*30)%200);RA(W/2+Math.cos(a)*rr-1,AY+AH/2+Math.sin(a)*rr*.6-1,3,3,'#ff2d55',.5*(1-rr/240))}
 if(t>600&&t<3600){ctx.textAlign='center';ctx.font='bold 12px monospace';const a=t<900?(t-600)/300:t>3300?(3600-t)/300:1;ctx.globalAlpha=Math.max(0,a);const sh=Math.round((RND()-.5)*3);ctx.fillStyle='#05090b';ctx.fillText('— 한계를 넘어선 '+G.B.name+' —',W/2+1+sh,AY+48);ctx.fillStyle='#ff9ab0';ctx.fillText('— 한계를 넘어선 '+G.B.name+' —',W/2+sh,AY+47);ctx.globalAlpha=1;ctx.textAlign='left'}}
function awakenStart(now){if(G._awoke)return;G._awoke=true;const c=G.cine;if(c)c.dur=4600;P.inv=Math.max(P.inv,now+5600);G.shake=1.2;G.flash=1;G.hitstop=now+500;
 sfx(40,2,'sawtooth',.12,20);sfx(80,1.4,'square',.07,35);setTimeout(()=>{sfx(55,1.2,'sawtooth',.1,30);G.shake=1},900);setTimeout(()=>{sfx(880,.6,'triangle',.05,220);G.flash=.8;G.shake=1.1},1800);
 if(typeof song!=='undefined'&&song&&song.root!=null&&!song._keyUp){song._keyUp=true;song.root+=2;if(song.vol)song.vol*=1.08}}
/* ---------- 엘리트 잡몹 · 보물상자 ---------- */
function setupCaveExtras(ci){if(!C)return;const r=rng(hash('extras|'+ci));C.chests=[];
 const alive=C.mobs.filter(m=>m.alive);const nE=Math.min(alive.length,1+(ci>=5?1:0)+(ci>=12?1:0));for(let i=0;i<nE;i++){const mb=alive[Math.floor(r()*alive.length)];if(mb.elite){continue}mb.elite=true;mb.hp=3;mb.maxhp=3;mb.ranged=true}
 const rooms=(C.rooms||[]).slice(1,-1);const nC=2+(ci%2);for(let i=0;i<nC&&rooms.length;i++){const rm=rooms.splice(Math.floor(r()*rooms.length),1)[0];const x=(rm.cx+.5)*CT+(r()-.5)*CT,y=(rm.cy+.5)*CT+(r()-.5)*CT;if(caveSolid(x,y)||caveSolid(x,y-10))continue;C.chests.push({x,y,open:false,coins:15+Math.floor(r()*25)+ci*2,gold:false})}}
function eliteHit(mb,now){mb.hp--;mb.hitT=now;C.shake=Math.max(C.shake,.45);C.hitstop=now+60;sfx(220,.12,'square',.05,90);const dx=mb.x-P.x,dy=mb.y-P.y,l=Math.hypot(dx,dy)||1;mobMove(mb,dx/l*16,dy/l*16);mb.st='cool';mb.t=now;
 C.rings.push({x:mb.x,y:mb.y,t:now,dur:300,r1:34,col:'#ffd166'});for(let i=0;i<10;i++)C.dust.push({x:mb.x,y:mb.y,vx:(RND()-.5)*120,vy:(RND()-.5)*120-20,l:.4,c:'#ffd166'})}
function eliteDie(mb,now){C.chests.push({x:mb.x,y:mb.y,open:false,coins:45+Math.floor(RND()*40)+C.ci*3,gold:true,pop:now});banner('엘리트 처치! 황금 상자가 나타났다');sfx(520,.3,'triangle',.06,1040)}
function updateChests(now,dt){if(!C||!C.chests)return;for(const ch of C.chests){if(ch.open){ch.k=(ch.k||0)+dt;continue}if(Math.hypot(P.x-ch.x,P.y-ch.y)<16){ch.open=true;ch.t=now;ch.k=0;const n=Math.round(ch.coins*(1+(curPet().coin||0)));addCoins(n);ch.got=n;C.flash=Math.max(C.flash,.2);sfx(660,.15,'triangle',.05,990);setTimeout(()=>sfx(990,.2,'triangle',.05,1480),120);
  for(let i=0;i<(ch.gold?26:14);i++)C.dust.push({x:ch.x,y:ch.y-6,vx:(RND()-.5)*110,vy:-40-RND()*110,l:.9,c:i%3?'#ffd166':'#fff6c0'});banner((ch.gold?'황금 ':'')+'보물상자! +'+n+' 코인')}}}
function drawChests(now,cx,cy){if(!C||!C.chests)return;for(const ch of C.chests){const X=Math.round(ch.x-cx),Y=Math.round(ch.y-cy);if(X<-30||X>W+30||Y<-30||Y>H+30)continue;
  const pop=ch.pop?clamp((now-ch.pop)/400,0,1):1,dy=Math.round((1-pop)*-14),gold=ch.gold,bd=gold?'#c89a20':'#7a5530',bl=gold?'#ffd84a':'#a8783f',band=gold?'#fff0a0':'#c8c0b0';
  RA(X-9,Y+4,18,3,'#000',.35);if(!ch.open){const sh=Math.sin(now/300+ch.x)*.5;glow(X,Y-4,gold?16:10,gold?'#ffd84a':'#ffe79a',.2+.1*Math.sin(now/250));R(X-9,Y-10+dy,18,13,'#1a1008');R(X-8,Y-9+dy,16,11,bd);R(X-8,Y-9+dy,16,4,bl);R(X-8,Y-5+dy,16,1,'#1a1008');R(X-6,Y-9+dy,2,11,band);R(X+4,Y-9+dy,2,11,band);R(X-1,Y-6+dy,2,3,'#fff6c0');if(Math.floor(now/500+ch.x)%4===0)R(X+5,Y-10+dy+sh,1,1,'#ffffff')}
  else{const k=Math.min(1,(ch.k||0)*4);R(X-9,Y-6,18,9,'#1a1008');R(X-8,Y-5,16,7,bd);R(X-6,Y-5,2,7,band);R(X+4,Y-5,2,7,band);R(X-8,Y-5,16,2,'#2a1a0a');R(X-9,Y-10-k*4,18,4,bl);R(X-9,Y-10-k*4,18,1,'#1a1008');
   if((ch.k||0)<1.4){const a=1-(ch.k||0)/1.4;ctx.font='bold 9px monospace';ctx.textAlign='center';ctx.fillStyle='#05090b';ctx.fillText('+'+ch.got,X+1,Y-17-(ch.k||0)*14);ctx.fillStyle='#ffd166';ctx.globalAlpha=a;ctx.fillText('+'+ch.got,X,Y-18-(ch.k||0)*14);ctx.globalAlpha=1;ctx.textAlign='left'}}}}
function drawElites(now,cx,cy){if(!C)return;for(const mb of C.mobs){if(!mb.alive||!mb.elite)continue;const X=mb.x-cx,Y=mb.y-cy;if(X<-30||X>W+30||Y<-30||Y>H+30)continue;
  const alert=mb.st&&mb.st!=='patrol',dir=alert?(P.x<mb.x?-1:1):1,hitF=mb.hitT&&now-mb.hitT<120;glow(X,Y,20,'#ffd84a',.22+.1*Math.sin(now/120));drawMobExtras(mb,X,Y,now);
  ctx.save();ctx.translate(X,Y);ctx.scale(1.55,1.55);ctx.translate(-X,-Y);
  if(C.ci>=10)drawMob2(C.ci,X,Y,now,mb,alert,dir);else{const bob=Math.round(Math.sin(now/110+mb.seed)*2);pcirc(X,Y+bob,6.5,'#1a0f2a');pcirc(X,Y+bob,6,alert?'#c05ae0':'#9a4fc0');pcirc(X,Y+bob,4,'#e0b0ff');R(X-3+dir,Y-2+bob,2,2,'#ff2d55');R(X+1+dir,Y-2+bob,2,2,'#ff2d55');R(X-5,Y-8+bob,2,3,'#ffd84a');R(X+3,Y-8+bob,2,3,'#ffd84a')}
  ctx.restore();if(hitF)pcirc(X,Y,12,'#ffffff',.6);
  R(X-4,Y-24,8,3,'#ffd84a');R(X-4,Y-26,2,2,'#ffd84a');R(X-1,Y-27,2,3,'#ffd84a');R(X+2,Y-26,2,2,'#ffd84a');
  for(let i=0;i<mb.maxhp;i++){R(X-10+i*7,Y-19,6,3,'#1a0f0a');R(X-9+i*7,Y-18,4,1,i<mb.hp?'#ff4d6d':'#3a2a2a')}}}
/*FEAT3_END*/
/*FEAT4_BEGIN*/
