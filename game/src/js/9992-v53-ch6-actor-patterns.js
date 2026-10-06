/* ================= v53 챕터 6 공격 다시 만들기: 보스가 "자기 물건"을 꺼내서 공격 =================
   - 풍향계 기사: 방패의 나침반이 떠올라 돌며 쏨 · 투구의 수탉이 울면 깃털 고리 · 탄이 화살 모양
   - 연줄의 거인: 진짜 연이 날아와 내리꽂힘 · 탄이 작은 연 모양
   - 번개구름 고래: 먹구름이 줄 위에 몰려와 번개를 떨굼 · 고래가 몸으로 줄을 들이받음
   - 비행선 함장: 대포가 나와 포탄을 쏨 · 닻이 사슬에 매달려 떨어짐 · 망원경 조준경이 나를 따라옴 · 폭탄이 떨어짐
   - 깃털 시계탑: 커다란 시계추가 줄에 매달려 흔들림 · 탄이 깃털 모양
   - 풍금 합창단: 탄이 음표 모양
   - 무지개 다리 수문장: 무지개 대검이 실제로 휘둘러짐
   - 메아리 사냥매: 매가 직접 급강하(잔상 매가 뒤따름) · 탄이 칼날 깃털
   - 공명탑: 종이 사슬에 매달려 휘둘러짐
   이름·덱은 그대로, 같은 이름으로 다시 정의한다. 판정은 늘 예고가 먼저. */
(function(){try{
 const L6=window.S6ART,H=window.S6H,A=window.ACT;if(!L6||!H||!A)return;
 const {tel,spd,ph,P6,toP,shot,circ,snd,shake,wind}=H;
 const D=(n,kr,ch,est,tip,fn)=>defPat(n,kr,ch,est,tip,fn);
 const C=(v,a,b)=>v<a?a:v>b?b:v,KK='#1a1420';
 const seg=(T0,ax,ay,bx,by,col,w,hold,dmg,o)=>NP(Object.assign({k:'seg',sty:'laser',col,w,t0:T0,t1:T0+tel(),t2:T0+tel()+hold,a:()=>[ax,ay],b:()=>[bx,by],dmg:dmg||12},o||{}));
 const rect=(T0,x,y,w,h,col,sty,hold,dmg,o)=>NP(Object.assign({k:'rect',x,y,w,h,sty:sty||'light',col,t0:T0,t1:T0+tel(),t2:T0+tel()+(hold||.3),dmg:dmg||11},o||{}));
 const path=(T0,T1,ax,ay,bx,by,col)=>NP({k:'seg',sty:'laser',harm:false,noCharge:true,col:col||'#ff4d6d',w:3,t0:T0,t1:T1,t2:T1+.01,a:()=>[ax,ay],b:()=>[bx,by],dmg:0});
 const lane=(T0,T1,x,y,w,h)=>NP({k:'rect',harm:false,x,y,w,h,t0:T0,t1:T1,t2:T1+.01,dmg:0});

 /* ---------- 도트 그림 ---------- */
 const ARROW=A.pix(["K.........K..","KK.......KYK.","KFKKKKKKKYYYK","KFFYYYYYYYYYY","KFKKKKKKKYYYK","KK.......KYK.","K.........K.."],{K:KK,F:'#c89a5a',Y:'#ffe8a0'});
 const KITEP=["....K....","...KCK...","..KCCCK..",".KCCWCCK.","KCCCWCCCK",".KCCWCCK.","..KCCCK..","...KCK...","....K....","....T....","...T.....","....T....",".....T..."];
 const KITE=['#ff6a5a','#ffd08a','#5ad0b0','#8ad8ff'].map(c=>A.pix(KITEP,{K:KK,C:c,W:'#ffffff',T:'#f0e8d8'}));
 const ROOSTER=A.pix(["...RR.....","..RRRK....","..KWWWK...",".KWWKWWYY.",".KWWWWWYK.","..KWWWWK..","KKWWWWWWK.","KCKWWWWWK.","KCCKWWWK..",".KCCKKK...","..K.Y.Y...","....Y.Y..."],{K:KK,R:'#ff4a4a',W:'#ffe8c8',Y:'#ffb84a',C:'#5ad0b0'});
 const CLOUD=A.pix(["....KKKK.......","..KKGGGGKK.....",".KGGWWGGGGKKK..","KGGWWGGGGGGGGK.","KGGGGGGGGGGGGGK","KDGGGGGGGGGGGDK",".KDDDDDDDDDDDK.","..KKKKKKKKKKK.."],{K:'#141a28',G:'#5a6888',W:'#8a9ac0',D:'#3a4868'});
 const CANNON=A.pix(["...KKKK...","..KMMMMK..",".KMMWMMMK.",".KMMMMMMK.","KMMMMMMMMK","KBBBBBBBBK","KMKKKKKKMK","KK......KK"],{K:'#0a0c14',M:'#5a5a6a',W:'#c8c8d8',B:'#a8703a'});
 const ANCHOR=A.pix(["....KKK....","....KSK....","....KKK....","..KKKSKKK..","..KSSSSSK..","....KSK....","....KSK....","....KSK....","K...KSK...K","KSK.KSK.KSK",".KSKKSKKSK.","..KSSSSSK..","...KKKKK..."],{K:'#0a0c14',S:'#8a9aac'});
 const BOMB=A.pix(["......YF.",".....K...","...KKKK..","..KDDDDK.",".KDWDDDDK",".KDDDDDDK",".KDDDDDDK","..KDDDDK.","...KKKK.."],{K:'#0a0c14',D:'#2a2a36',W:'#8a8aa0',Y:'#ffd04a',F:'#ff6a20'});
 const SCOPE=A.pix(["KKKK..........","KGGKKKKKKK....","KGWGGGGGGKKKK.","KGGGGGGGGGGGGK","KGWGGGGGGKKKK.","KGGKKKKKKK....","KKKK.........."],{K:'#0a0c14',G:'#c8a050',W:'#fff0c0'});
 const FALCON=A.pix(["K.................K","KK...............KK",".KBK.....K.....KBK.","..KBBK..KOK..KBBK..","...KBBKKOOOKKBBK...","....KBBOOOOOBBK....",".....KKKOWOKKK.....","........KYK........",".........K........."],{K:'#1a1008',B:'#8a6a40',O:'#ffb84a',W:'#ffffff',Y:'#ffe08a'});
 const BELL=A.pix(["....KK....","...KYYK...","..KYYYYK..","..KYWYYK..",".KYWYYYYK.",".KYYYYYYK.","KYYYYYYYYK","KKKKKKKKKK","....KK...."],{K:'#1c2238',Y:'#ffe8a0',W:'#ffffff'});
 const WHALE=A.pix(["........KKKKKKK.........","......KKGGGGGGGKK.......","....KKGGGGGGGGGGGKK...KK","...KGGGWGGGGGGGGGGGK.KGK","..KGGGKGGGGGGGGGGGGGKGGK",".KGGGGGGGGGGGGGGGGGGGGK.","KYYYYYYGGGGGGGGGGGGGGK..",".KYYYYYYYYGGGGGGGGGKK...","..KKKKYYYYYYYYYYKKK.....","......KKKKKKKKKK........"],{K:'#141a28',G:'#5a6888',W:'#ffffff',Y:'#c8d4e8'});
 const SWORD=A.pix(["..K..","KKYKK",".KRK.",".KOK.",".KYK.",".KGK.",".KBK.",".KVK.",".KWK.",".KWK.",".KWK.","..K.."],{K:'#1a1420',Y:'#ffd08a',R:'#ff4a5a',O:'#ff9a3a',G:'#4ae08a',B:'#3aa8ff',V:'#c85aff',W:'#ffffff'});
 const FEATHER=A.pix(["....W","...WC","..WCC",".WCCK","WCCK.","CCK..","CK...","K...."],{K:'#2a3a52',W:'#ffffff',C:'#8ad8ff'});
 const NOTE=A.pix(["...KK","...KC","...K.","...K.",".KKK.","KCCK.",".KK.."],{K:'#2a2040',C:'#c8a0ff'});
 const SHARD=A.pix(["..K..",".KWK.","KWCRK",".KBK.","..K.."],{K:'#24304a',W:'#ffffff',C:'#8ad8ff',R:'#ff8ab0',B:'#c8a0ff'});
 const BLADE=A.pix(["......KW","....KKWC","..KKWCCK",".KWCCKK.","KWCKK...","KKK....."],{K:'#2a2420',W:'#ffffff',C:'#c8d4e8'});
 const DROP=A.pix(["..K..",".KCK.","KCWCK","KCCCK",".KKK."],{K:'#141a28',C:'#8ac8ff',W:'#ffffff'});
 const BALL=A.pix([".KKK.","KDWDK","KDDDK","KDDDK",".KKK."],{K:'#0a0c14',D:'#3a3a48',W:'#8a8aa0'});
 window.S6PIX={ARROW,KITE,ROOSTER,CLOUD,CANNON,ANCHOR,BOMB,SCOPE,FALCON,BELL,WHALE,SWORD};

 /* ---------- 탄 모양 입히기: 보스마다 자기 물건 모양 ---------- */
 const OSK=[ARROW,KITE[0],DROP,BALL,FEATHER,NOTE,SHARD,BLADE,null,NOTE];
 const SKIP={bob:1,crate:1,scrap:1,coal:1,steam:1,crystal:1};
 const dirOf=(o,b)=>{if(o.ray!=null&&b<o.t1+.05)return o.ray;try{const [x0,y0]=o.pos(b-.04),[x1,y1]=o.pos(b);if(Math.hypot(x1-x0,y1-y0)>.05)return Math.atan2(y1-y0,x1-x0)}catch(e){}return o.ray!=null?o.ray:Math.PI/2};
 {const base=NPK.orb.draw;NPK.orb.draw=function(o,b,now){try{if(G&&G.s6!=null&&!o.noSkin&&!o.hide&&!SKIP[o.sty]&&o.harm!==false){const k=G.s6,sp=k===1?KITE[(o.t0*7|0)%4]:OSK[k];if(sp){const [x,y]=o.pos(b),a=dirOf(o,b);if(k===5||k===9){sp(x,y,1.6,{})}else sp(x,y,1.5,{rot:a});return}}}catch(e){}return base.apply(this,arguments)}}

 /* ================= 1 풍향계 기사 ================= */
 const COMPASS=(x,y,s,o)=>{const r=8*s/1.5,a=o&&o.rot||0;pcirc(x,y,r+1,KK);pcirc(x,y,r,'#e8d8b0');cRing(x,y,r-1,'#c89a5a',1,1);const c=Math.cos(a),sn=Math.sin(a);for(let i=-r+2;i<r-1;i++){cPx(x+c*i,y+sn*i,i>0?2:1,i>0?'#ff5a4a':'#3a4a5a',1)}pcirc(x,y,1.5,'#ffd08a')};COMPASS.h=16;
 D('s6CompassSpin','나침반 회전','hands',10,'방패의 나침반이 떠올라 바늘을 돌리며 8방향으로 쏨 → 바늘 사이 빈 방향으로',t=>{const n=3+ph();
  sch(t,()=>{const [x,y]=P6(-11,-19),T1=t+tel();A.put({spr:COMPASS,s:2,t0:t,t2:T1+(n-1)*1.1+.6,pos:A.at(x-14,y+6),rot:b=>b*2.2,glow:'#e0965a'})});
  for(let k=0;k<n;k++){const T0=t+k*1.1;sch(T0,()=>{const [x,y]=P6(-11,-19),off=k*.2;for(let i=0;i<8;i++)shot(T0,x-14,y+6,off+i*TAU/8,70,{sty:'spark',col:'#e0965a',rayL:30})});snd(T0+tel(),660,.08,'square',.04,990)}
  return n*1.1+tel()+1});
 D('s6Rooster','수탉의 외침','head',10,'투구 위 수탉이 날개를 펴고 울면 깃털 고리가 퍼짐 → 고리의 틈으로',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.3;sch(T0,()=>{const [x,y]=P6(0,-48),T1=T0+tel(),gap=toP(x,y)+(k%2?Math.PI:0);A.put({spr:ROOSTER,s:1.8,t0:T0,t2:T1+.5,pos:b=>[x,y-6-(b>T1-.2&&b<T1+.2?3:0)],deco:(Q,b,now,xx,yy)=>{if(b>T1-.15&&b<T1+.4){for(let i=0;i<3;i++)cRing(xx,yy,8+i*6+(b-T1)*30,'#ffffff',.6-i*.15,1)}}});
   for(let i=0;i<24;i++){const a=i*TAU/24;if(Math.abs(((a-gap+Math.PI*3)%TAU)-Math.PI)<.45)continue;shot(T0,x,y,a,64,{sty:'light',col:'#ff9a4a',r:4,rayL:20})}});snd(T0+tel(),880,.3,'sawtooth',.04,1320)}
  return n*1.3+tel()+1});

 /* ================= 2 연줄의 거인 ================= */
 D('s6KiteDive','연 급강하','all',11,'거인의 손에서 연이 줄을 끌고 날아올라 내 자리로 내리꽂힘 → 원이 차오르면 벗어나',t=>{const n=6+ph()*2;
  for(let i=0;i<n;i++){const T0=t+i*.45;sch(T0,()=>{const [hx,hy]=P6(i%2?14:-14,-26),x=P.x+(RND()-.5)*30,y=P.y+(RND()-.5)*20,col=['#ff5a4a','#ffd04a','#4a8aff','#5ad08a'][i%4];const c=circ(T0,x,y,15,col,{label:'◆'}),T1=T0+tel();
   const pos=b=>{if(b<T1-.5){const q=C((b-T0)/Math.max(.1,tel()-.5),0,1);return [hx+(c.x-hx)*.3*q,hy-50*q+Math.sin(b*6+i)*4]}const q=C((b-(T1-.5))/.5,0,1),sx=hx+(c.x-hx)*.3,sy=hy-50;return [sx+(c.x-sx)*q*q,sy+(c.y-sy)*q*q]};
   A.put({spr:KITE[i%4],s:2.6,t0:T0,t2:T1+.15,pos,rot:b=>b<T1-.5?Math.sin(b*5)*.3:Math.atan2(c.y-hy,c.x-hx)-Math.PI/2,deco:(Q,b,now,xx,yy)=>{line(hx,hy,xx,yy,5,(px,py)=>cPx(px,py,1,'#f0e8d8',.6))}})});shake(T0+tel(),.18)}
  return n*.45+tel()+1});
 D('s6xThousandKites','천 개의 연','all',12,'[익스트림] 수십 개의 연이 하늘에서 내 자리로 연달아 꽂히고, 네 번째마다 파편이 튐 → 멈추지 말고 원을 그리며 움직여',t=>{const n=14+ph()*3;
  for(let i=0;i<n;i++){const T0=t+i*.3;sch(T0,()=>{const c=circ(T0,P.x+(RND()-.5)*24,P.y+(RND()-.5)*20,14,'#ff6a5a',{label:'◆'}),T1=T0+tel(),sx=c.x+(RND()-.5)*120,sy=AY-10;
   A.put({spr:KITE[i%4],s:2.3,t0:T0,t2:T1+.1,pos:A.lin(sx,sy,c.x,c.y,T0,T1),rot:()=>Math.atan2(c.y-sy,c.x-sx)-Math.PI/2});
   if(i%4===3)sch(T1,()=>{for(let j=0;j<6;j++)npShot(T1,T1,c.x,c.y,j*TAU/6+i,60*spd(),{sty:'light',col:'#ffd04a',r:3,noTel:true,dmg:9})})})}
  return n*.3+tel()+1.4});

 /* ================= 3 번개구름 고래 ================= */
 D('s6ThunderRain','번개 비','field',11,'먹구름이 내 머리 위 줄로 몰려와 번개를 세로로 떨굼 → 구름 아래 줄을 피해',t=>{const n=5+ph()*2;
  for(let i=0;i<n;i++){const T0=t+i*.5;sch(T0,()=>{const x=i%3===2?P.x-12:AX+20+RND()*(AW-40),T1=T0+tel(),sx=x+(RND()<.5?-60:60);
   A.put({spr:CLOUD,s:1.8,t0:T0,t2:T1+.5,pos:A.lin(sx,AY+10,x,AY+10,T0,T0+tel()*.6,true),deco:(Q,b,now,xx,yy)=>{if(b>T1-.3&&b<T1&&Math.floor(now/60)%2)pcirc(xx,yy+6,6,'#ffe25a',.6)}});
   NP({k:'rect',x:x-12,y:AY,w:24,h:AH,sty:'elec',t0:T0,t1:T1,t2:T1+.25,col:'#ffe25a',dmg:13,deco:(o,b,now)=>{if(b<o.t1)return;let px=x,py=AY+16;const sd=Math.floor(now/50);for(let j=0;j<10;j++){const nx=x+((hash(sd+'b'+j)%13)-6),ny=py+AH/10;line(px,py,nx,ny,2,(qx,qy)=>{cPx(qx,qy,3,'#ffe25a',.8);cPx(qx,qy,1,'#ffffff',1)});px=nx;py=ny}}})});
   sch(T0+tel(),()=>{G.flash=Math.max(G.flash||0,.12);sfx(70,.3,'sawtooth',.06,40)})}
  return n*.5+tel()+.5});
 D('s6hThunderBreach','번개 돌파','all',12,'[어려움] 고래가 내 줄을 가로로 통째로 들이받고, 지나간 자리에 번개 기둥 → 위아래로 비켰다가 기둥 사이로',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.9;sch(T0,()=>{const y=C(P.y,AY+24,AY+AH-24),T1=T0+tel(),fromL=k%2===0,x0=fromL?AX-60:AX+AW+60,x1=fromL?AX+AW+60:AX-60,go=.5,pos=b=>b<T1?[x0,y]:[x0+(x1-x0)*C((b-T1)/go,0,1),y];
   lane(T0,T1,AX,y-24,AW,48);A.put({spr:WHALE,s:2.4,t0:T1-.08,t2:T1+go,inT:.05,pos,face:()=>fromL?-1:1,deco:(Q,b,now,xx,yy)=>{for(let i=1;i<6;i++)RA(xx-(fromL?1:-1)*i*14,yy-10,10,20,'#c8d4e8',.3-i*.05)}});
   NP({k:'rect',hide:true,noTel:true,t0:T0,t1:T1,t2:T1+go,dmg:14,rf:b=>{const [xx]=pos(b);return [xx-30,y-22,60,44]}});
   for(let j=0;j<3;j++){const T2=T0+.8+j*.2,x=AX+30+RND()*(AW-60);rect(T2,x-11,AY,22,AH,'#ffe25a','elec',.25,12)}});shake(T0+tel(),.35);snd(T0+tel(),60,.5,'sawtooth',.06,30)}
  return n*1.9+tel()+1.4});

 /* ================= 4 비행선 함장 ================= */
 D('s6Broadside','일제 포격','hands',11,'곤돌라 아래로 대포 다섯 문이 나와 세 번 일제 사격 → 포탄 사이 틈으로',t=>{const n=3+ph();
  sch(t,()=>{for(let i=-2;i<=2;i++){const [x,y]=P6(i*3,-14);A.put({spr:CANNON,s:1.5,t0:t,t2:t+n+tel()+.4,pos:A.at(x+i*8,y+8),rot:()=>i*.22,deco:(Q,b,now,xx,yy)=>{for(let k=0;k<n;k++){const Tk=t+k+tel();if(b>Tk&&b<Tk+.2){pcirc(xx+Math.cos(Math.PI/2+i*.22)*8,yy+Math.sin(Math.PI/2+i*.22)*8,5*(1-(b-Tk)/.2),'#ffd08a',.9)}}}})}});
  for(let k=0;k<n;k++){const T0=t+k*1;sch(T0,()=>{for(let i=-2;i<=2;i++){const [x,y]=P6(i*3,-14);shot(T0,x+i*8,y+12,Math.PI/2+i*.22+(k%2?.11:0),80,{sty:'coal',col:'#3a2a1a',r:5})}});snd(T0+tel(),90,.25,'square',.06,40);shake(T0+tel(),.2)}
  return n+tel()+1});
 D('s6AnchorDrop','닻 투하','all',11,'비행선에서 닻이 사슬에 매달려 내 자리로 떨어지고 충격파 → 원 밖으로, 충격파는 대시로',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.1;sch(T0,()=>{const c=circ(T0,P.x,P.y,18,'#8a9aac',{label:'⚓'}),T1=T0+tel(),[sx,sy]=P6(0,-10);
   A.put({spr:ANCHOR,s:1.8,t0:T0,t2:T1+.6,pos:b=>{const q=C((b-T0)/tel(),0,1);return [c.x,AY-10+(c.y-12-(AY-10))*q*q]},deco:(Q,b,now,xx,yy)=>{line(xx,AY,xx,yy-10,3,(px,py)=>{cPx(px,py,2,'#5a6a7a',.9);cPx(px,py,1,'#c8d4e8',.9)})}});
   sch(T1,()=>{for(let i=0;i<14;i++)npShot(T1,T1,c.x,c.y,i*TAU/14,70*spd(),{sty:'default',col:'#8a9aac',r:4,noTel:true,dmg:9})})});shake(T0+tel(),.3)}
  return n*1.1+tel()+1.2});
 D('s6ScopeSnipe','망원경 저격','hands',10,'함장이 망원경을 들어 조준경이 나를 따라오다 굳으면 저격 → 조준경이 멈추면 옆으로',t=>{const n=3+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.2;sch(T0,()=>{const [x,y]=P6(18,-26),a=toP(x,y),T1=T0+tel()+.2;A.put({spr:SCOPE,s:1.6,t0:T0,t2:T1+.4,pos:A.at(x+10,y-4),rot:()=>a});
   let lx=P.x,ly=P.y;A.put({spr:(xx,yy,s)=>{cRing(xx,yy,9,'#ff5a6a',1,1);for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]])RA(Math.round(xx+dx*6-(dy?0:dx>0?0:4)),Math.round(yy+dy*6-(dx?0:dy>0?0:4)),dx?4:1,dy?4:1,'#ff5a6a',1)},s:1,t0:T0,t2:T1+.2,pos:b=>{if(b<T1-.35){lx+=(P.x-lx)*.15;ly+=(P.y-ly)*.15}return [lx,ly]}});
   NP({k:'seg',sty:'laser',col:'#ff5a6a',w:6,t0:T0,t1:T1,t2:T1+.3,a:()=>[x,y],b:()=>[x+Math.cos(a)*600,y+Math.sin(a)*600],dmg:13})});snd(T0+tel()+.2,1400,.1,'square',.05,200)}
  return n*1.2+tel()+.8});
 D('s6hCarpetBomb','융단 폭격','field',12,'[어려움] 비행선이 지나가며 폭탄을 왼쪽부터 줄지어 떨어뜨림 → 줄마다 비어 있는 칸을 따라 걸어',t=>{const rows=5,cols=9,cw=AW/cols,rh=AH/rows,n=1+Math.min(2,ph());
  for(let k=0;k<n;k++){const T0=t+k*3.2,dir=k%2?-1:1;let gap=Math.floor(RND()*rows);for(let c=0;c<cols;c++){const cc=dir>0?c:cols-1-c,Tc=T0+c*.28,g=gap;sch(Tc,()=>{for(let r=0;r<rows;r++){if(r===g)continue;const x=AX+cw*(cc+.5),y=AY+rh*(r+.5),T1=Tc+tel();circ(Tc,x,y,Math.min(cw,rh)*.52,'#8a9aac',{label:'●',t2:T1+.2});
     A.put({spr:BOMB,s:1.4,t0:T1-.45,t2:T1+.05,inT:.05,outT:.05,pos:A.lin(x,AY-6,x,y,T1-.45,T1)})}});gap=C(gap+(RND()<.5?-1:1),0,rows-1)}shake(T0+tel()+1,.25)}
  return n*3.2+tel()+.6});

 /* ================= 5 깃털 시계탑 ================= */
 D('s6Pendulum','시계추','all',11,'시계탑 아래 커다란 추가 줄에 매달려 좌우로 흔들림 → 추가 지나간 뒤 그 자리로',t=>{const dur=4+ph();
  sch(t,()=>{const [px,py]=P6(0,-10),pos=b=>{const q=Math.max(0,b-t-tel())*1.8*spd(),a=Math.PI/2+Math.sin(q)*1.1;return [px+Math.cos(a)*170,py+Math.sin(a)*150]};
   A.put({spr:(x,y,s)=>{pcirc(x,y,16,'#3a2410');pcirc(x,y,14,'#c8964a');pcirc(x,y,9,'#e8b86a');pcirc(x-4,y-5,3,'#fff0c8');cRing(x,y,11,'#8a5a2a',1,1)},s:1,t0:t,t2:t+tel()+dur,pos,deco:(Q,b,now,x,y)=>{line(px,py,x,y,3,(qx,qy)=>{cPx(qx,qy,2,'#8a5a2a',1);cPx(qx,qy,1,'#e8b86a',1)})}});
   NP({k:'orb',sty:'bob',col:'#c8964a',r:16,hide:true,t0:t,t1:t+tel(),t2:t+tel()+dur,prev:.8,pos,dmg:14})});
  return tel()+dur+.3});

 /* ================= 7 무지개 다리 수문장 ================= */
 D('s6LightSword','빛의 대검','hands',11,'치켜든 무지개 대검이 실제로 크게 휘둘러 내려침 → 칼이 지나는 반대편으로',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.6,dir=k%2?-1:1;sch(T0,()=>{const [x,y]=P6(22,-35),T1=T0+tel(),ang=b=>-Math.PI/2+dir*(.2+C((b-T1)/.6,0,1)*2.6);
   A.put({spr:SWORD,s:5,t0:T0,t2:T1+.7,pos:b=>{const a=ang(b);return [x+Math.cos(a)*30,y+Math.sin(a)*30]},rot:b=>ang(b)+Math.PI/2,deco:(Q,b,now)=>{if(b>T1&&b<T1+.6){const a=ang(b);for(let i=1;i<6;i++){const aa=a-dir*i*.12;line(x+Math.cos(aa)*20,y+Math.sin(aa)*20,x+Math.cos(aa)*80,y+Math.sin(aa)*80,6,(px,py)=>cPx(px,py,2,['#ff4a5a','#ffe04a','#4ae08a','#3aa8ff','#c85aff'][i-1],.5-i*.07))}}}});
   NP({k:'seg',sty:'laser',col:'#ffffff',w:14,live:true,t0:T0,t1:T1,t2:T1+.6,a:()=>[x,y],b:b=>{const a=ang(b);return [x+Math.cos(a)*420,y+Math.sin(a)*420]},dmg:15})});shake(T0+tel()+.3,.4)}
  return n*1.6+tel()+.8});

 /* ================= 8 메아리 사냥매 ================= */
 function dive(T0,sx,sy,a,col,w,dmg,ghost){const T1=T0+tel(),L=600,go=.3,ex=sx+Math.cos(a)*L,ey=sy+Math.sin(a)*L,pos=b=>b<T1?[sx,sy]:A.lin(sx,sy,ex,ey,T1,T1+go)(b);
  path(T0,T1,sx,sy,ex,ey,col);A.put({spr:FALCON,s:ghost?1.6:2,t0:T1-.1,t2:T1+go,inT:.06,pos,rot:()=>a-Math.PI/2,tint:ghost?'#ffc860':null,deco:(Q,b,now,x,y)=>{for(let i=1;i<6;i++)pcirc(x-Math.cos(a)*i*9,y-Math.sin(a)*i*9,5-i*.7,col,.3)}});
  NP({k:'seg',hide:true,noTel:true,col,w,live:true,t0:T0,t1:T1,t2:T1+go,a:b=>{const [x,y]=pos(b);return [x-Math.cos(a)*30,y-Math.sin(a)*30]},b:b=>pos(b),dmg})}
 D('s6EchoDive','메아리 급강하','all',12,'사냥매가 조준선을 긋고 직접 급강하, 메아리 잔상 매가 조금씩 다른 각도로 뒤따름 → 선 밖으로, 잔상까지 피해',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.8;sch(T0,()=>{const [x,y]=P6(0,-28),a=toP(x,y);dive(T0,x,y,a,'#ff9a3a',16,14,false);for(let e=1;e<=2;e++){const o=e*.18*(k%2?1:-1);sch(T0+e*.35,()=>dive(T0+e*.35,x,y,a+o,'#ffc860',10,11,true))}});shake(T0+tel(),.35);snd(T0+tel(),1600,.3,'sawtooth',.05,200)}
  return n*1.8+tel()+1.4});
 D('s6hTwinDive','쌍 급강하','all',12,'[어려움] 양 날개에서 매 두 마리가 X자로 엇갈려 급강하하며 나를 지남 → 두 길이 만나는 곳을 벗어나',t=>{const n=2+ph();
  for(let k=0;k<n;k++){const T0=t+k*1.6;sch(T0,()=>{for(const s of [-1,1]){const [x,y]=P6(s*24,-38),a=toP(x,y);dive(T0,x,y,a,s<0?'#ff9a3a':'#ffc860',14,14,s>0)}});shake(T0+tel(),.3);snd(T0+tel(),1600,.25,'sawtooth',.05,200)}
  return n*1.6+tel()+.6});
 D('s6xHuntingStorm','사냥 폭풍','all',12,'[익스트림] 사냥매가 화면 가장자리 아무 데서나 나를 향해 연달아 급강하 → 선이 보이면 직각으로 비켜',t=>{const n=6+ph();
  for(let k=0;k<n;k++){const T0=t+k*.75;sch(T0,()=>{const e=Math.floor(RND()*4),q=RND(),sx=e===0?AX:e===1?AX+AW:AX+q*AW,sy=e===2?AY:e===3?AY+AH:AY+q*AH,a=toP(sx,sy);dive(T0,sx,sy,a,'#ff9a3a',13,13,k%2===1)});snd(T0+tel(),1800,.2,'sawtooth',.04,300)}
  return n*.75+tel()+.6});
 D('s6BellChain','사슬 종','all',11,'발톱에 사슬로 매단 종이 크게 휘둘러지고 울림 고리가 퍼짐 → 종이 지나간 뒤 고리 틈으로',t=>{const dur=3+ph();
  sch(t,()=>{const [px,py]=P6(0,-8),pos=b=>{const q=Math.max(0,b-t-tel())*2*spd(),a=Math.PI/2+Math.sin(q)*1.2;return [px+Math.cos(a)*140,py+Math.sin(a)*120]};
   A.put({spr:BELL,s:2.6,t0:t,t2:t+tel()+dur,pos,rot:b=>{const q=Math.max(0,b-t-tel())*2*spd();return -Math.sin(q)*1.2},deco:(Q,b,now,x,y)=>{line(px,py,x,y-10,4,(qx,qy)=>{cPx(qx,qy,2,'#5a4a3a',1);cPx(qx,qy,1,'#c8a870',1)})}});
   NP({k:'orb',sty:'bob',col:'#ffc860',r:12,hide:true,t0:t,t1:t+tel(),t2:t+tel()+dur,prev:.6,pos,dmg:13})});
  for(let k=0;k<3;k++){const T0=t+tel()+k*1.1;sch(T0,()=>{const [x,y]=P6(0,-8);for(let i=0;i<16;i++)npShot(T0,T0+.01,x,y,i*TAU/16+k*.2,60*spd(),{sty:'echo',col:'#ffc860',r:4,noTel:true,dmg:9})})}
  return tel()+dur+.4});
}catch(e){console.error('v53 ch6 actors',e)}})();
