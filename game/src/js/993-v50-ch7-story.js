/* ================= v50 챕터 7 REVERSE 「거울 속 시계골」: 이야기 장면 · 저장 · 메뉴(이야기 시계 · 보스 러시 탭) 연결 =================
   등장인물: 하루 · 똑딱 · 딱똑(거울 쪽 시계 요정, 말을 거꾸로 함) · 거울 하루 · 라온(목소리만)
   흐름: 프롤로그 → 거울 1~3 → 은빛 탑 발견 → 거울 4~7 → 반전(거울 하루의 기억) → 거울 8~10 → 엔딩 */
(function(){try{
 const L7=window.S7ART;if(!L7||typeof window.s7Fight!=='function')return;
 /* 딱똑의 거꾸로 말: 글자를 뒤집고 괄호 안에 뜻을 적는다 */
 const rv=s=>Array.from(s).reverse().join(''),TT=s=>['딱똑',rv(s)+'  ('+s+')'];
 /* ---------- 보스별 이야기 ---------- */
 const S7STORY=window.S7STORY=[
  {place:'연못 아래 거울문',title:'나갈 수 없는 문',
   intro:[['','거울 속으로 뛰어들자, 커다란 문 하나가 길을 막았다. 열쇠 구멍이 거꾸로 달려 있다.'],['거울문 수문장','들어온 자는 나갈 수 없다. 나간 자는… 돌아오지 않았다.']],
   outro:[['거울문 수문장','…열쇠는 안쪽에 있었구나. 나는 늘 바깥만 지켰어.'],['','거꾸로 달린 열쇠 구멍이 바로 돌아가며, 문이 열렸다.']],
   phase:['열쇠 구멍이 거꾸로 돈다!','문짝이 거울처럼 갈라진다!'],dying:'…문은… 양쪽으로 열리는 거였어.'},
  {place:'뒤집힌 광장',title:'모든 것을 비추는 눈',
   intro:[['','광장 한가운데, 깃마다 거울 눈이 달린 유리 공작이 날개를 폈다.'],['유리 공작','내 깃털에 비친 너는 몇 명일까? 진짜는 어느 쪽이지?'],['하루','여기 있는 내가 진짜야!']],
   outro:[['','깃털 속 수많은 하루가 하나로 겹쳐졌다.'],TT('비친 모습도 다 하루예요')],
   phase:['깃털 눈이 일제히 뜬다!','유리 깃이 부채처럼 펼쳐진다!'],dying:'…비춰 주기만 했지, 본 적은 없었어.'},
  {place:'거꾸로 흐르는 수로',title:'위로 흐르는 물',
   intro:[['','물이 아래에서 위로, 하늘을 향해 거슬러 오른다.'],['똑딱','물이 왜 거꾸로 흘러?'],TT('시간이 거꾸로 가서 그래요')],
   outro:[['','분수가 잠시 멈추더니, 처음으로 물방울 하나가 아래로 떨어졌다.'],['하루','…떨어지는 소리, 오랜만이다.']],
   phase:['물줄기가 하늘로 치솟는다!','역류가 소용돌이친다!'],dying:'…아래로… 흘러도 괜찮구나.'},
  {place:'흑백 성',title:'지지 않는 왕',
   intro:[['흑백 체스 왕','이 판은 한 번도 진 적이 없다. 질 것 같으면 한 수 물렀으니까.'],['하루','그건 이긴 게 아니잖아!']],
   outro:[['','기억: 첫 판을 지고 울던 날, 왕은 다시는 지지 않겠다며 모든 수를 되돌렸다.'],['흑백 체스 왕','…체크메이트. 이 말을 듣는 쪽도, 나쁘지 않군.']],
   phase:['말들이 거꾸로 걸어온다!','왕이 직접 움직인다!'],dying:'…물리지 않겠다. 이 수는.'},
  {place:'촛불 회랑',title:'거꾸로 타는 시간',
   intro:[['','촛농이 위로 기어오르고, 초는 탈수록 길어진다.'],['거꾸로 타는 초','다 타 버리는 게 무서웠어. 그래서 거꾸로 타기로 했지.']],
   outro:[['거꾸로 타는 초','…짧아지는 것도, 빛나는 거였어.'],['','초가 처음으로 아래로 타들어 가며, 회랑이 따뜻해졌다.']],
   phase:['불꽃이 거꾸로 솟는다!','촛농이 비처럼 거슬러 오른다!'],dying:'…후… 따뜻하다.'},
  {place:'멈춘 오르골 극장',title:'같은 춤만 추는 무희',
   intro:[['','태엽 소리. 같은 마디, 같은 동작이 끝없이 되풀이된다.'],['오르골 발레리나','틀리면 처음부터. 틀리면 처음부터. 틀리면…']],
   outro:[['','하루가 박자에 맞춰 칼을 거두자, 무희가 처음 보는 동작으로 한 바퀴 돌았다.'],['오르골 발레리나','…틀렸는데. 이상하게, 즐거워.']],
   phase:['태엽이 거꾸로 감긴다!','같은 마디가 빨라진다!'],dying:'…다음 마디는… 어떤 춤일까.'},
  {place:'거꾸로 도는 놀이공원',title:'끝나지 않는 한 바퀴',
   intro:[['','천장에 매달린 회전목마가 거꾸로 돈다. 목마들은 내리지 못한다.'],['뒤집힌 회전목마','한 바퀴만 더. 한 바퀴만 더 돌면 그날로 돌아갈 수 있어.']],
   outro:[['','목마들이 하나씩 내려, 저마다 다른 쪽으로 걸어갔다.'],TT('이 앞이 그 애의 탑이에요')],
   phase:['회전이 거꾸로 빨라진다!','목마들이 뛰어내린다!'],dying:'…이제… 내려도 돼.'},
  {place:'은빛 계단',title:'줄에 묶인 그림자',
   intro:[['','계단을 오를수록 그림자가 따로 움직인다. 위에서 누가 줄을 당긴다.'],['그림자 인형사','그림자는 주인을 닮아야지. 내가 맞춰 주마.'],['똑딱','하루 그림자가 거꾸로 걸어!']],
   outro:[['','줄이 끊어지자, 그림자들이 주인 발밑으로 돌아왔다.'],['그림자 인형사','…따라 하는 것보다, 같이 걷는 게 더 어렵더군.']],
   phase:['줄이 팽팽하게 당겨진다!','그림자 인형이 춤춘다!'],dying:'…줄 없이도… 서 있네.'},
  {place:'탑의 심장부',title:'되비치는 날개',
   intro:[['','탑의 심장부. 비늘마다 빛을 되쏘는 커다란 용이 몸을 일으켰다.'],['반사룡','받은 건 그대로 돌려준다. 아픔도, 소리도.'],['하루','그럼 이번엔 박자를 돌려받아!']],
   outro:[['','용의 비늘이 하나씩 맑아지며, 꼭대기로 가는 길을 비췄다.'],TT('고마워요 하루 이제 그 애한테 가요')],
   phase:['비늘이 일제히 빛난다!','날개가 하늘을 덮는다!'],dying:'…돌려주지 않고… 받기만 해도 되는구나.'},
  {place:'은빛 시계탑 꼭대기',title:'반대편의 나',
   intro:[['','시계탑 꼭대기. 바늘이 거꾸로 돌고, 그 아래 나와 똑같은 아이가 서 있었다.'],['거울 하루','왔구나, 이쪽의 나. 조금만 기다려. 곧 다 되감겨.'],['하루','되감으면… 그다음은?'],['거울 하루','…그다음은 없어. 그래서 좋은 거야.']],
   outro:[['','거울 하루의 칼이 바닥에 떨어졌다. 거꾸로 돌던 바늘이 멈췄다.']],
   phase:['거울 하루가 내 움직임을 따라 한다!','딱똑: "'+rv('같이 박자를 맞춰요 하루')+'"'],dying:'…앞으로… 가도 될까.'}];
 /* 거울 세계 곡: 보스마다 다른 곡 */
 try{const BPM=[126,134,120,130,116,138,144,148,152,140],SCL=['min','dor','mix','hmin','dor','maj','mix','min','hmin','min'],PR=[[0,5,3,4],[0,3,5,4],[0,4,5,3],[0,5,4,3]],HK=['drive','sparkle','soar','baroque','swing','sparkle','run','frantic','final','final'],DR=['rock','dance','half','gallop','waltz','dance','gallop','break','rock','break'];
  L7.forEach((b,k)=>{if(typeof C3MUS!=='undefined'&&!C3MUS[b.art])C3MUS[b.art]={title:S7STORY[k].title,tag:'거울 세계',bpm:BPM[k],root:44+(k*3)%7,sc:SCL[k],pr:PR[k%PR.length],cp:{duty:k%2?.125:.5,bass:k%3?'oct':'gal',dr:DR[k],arp:(k+1)%2,hook:HK[k]}}})}catch(e){}

 /* ---------- 저장 ---------- */
 const sv=window.s7Save=()=>{const s=saveData.ch7||(saveData.ch7={ci:0,best:{}});s.best=s.best||{};return s};
 const unlocked=window.s7Unlocked=()=>{try{const s=saveData.ch6||{};return (s.ci||0)>=10||!!(s.best||{})[9]}catch(e){return false}};
 const info=()=>{const s=sv();return {slots:L7.map((b,k)=>({k,art:b.art,name:b.name,rank:s.best[k]||null,seen:k<s.ci,cur:k===s.ci})),done:s.ci>=10,prog:Math.min(1,(s.ci||0)/10)}};
 const rankOf=h=>h===0?'P':h<=2?'S':h<=4?'A':h<=7?'B':'C';

 /* ---------- 장면 그리기 도구 (480×270) ---------- */
 const TONE=k=>k>=7?2:k>=3?1:0;/* 0 거울 연못 · 1 되비친 놀이터 · 2 은빛 탑 · 3 새벽(엔딩) · 4 진짜 시계골 아침 */
 const SKY=[['#101828','#2a4a62','#7ab8c8'],['#1c1430','#4a3a6a','#b8a0d8'],['#08060f','#1c1438','#3a2a5a'],['#2a2450','#c88ab8','#ffd8c0'],['#4a8ad8','#a8dcf8','#e8f6ff']];
 function sky(c,tone,T){const p=SKY[tone],g=c.createLinearGradient(0,0,0,270);g.addColorStop(0,p[0]);g.addColorStop(.62,p[1]);g.addColorStop(1,p[2]);c.fillStyle=g;c.fillRect(0,0,480,270);
  if(tone<3){/* 떠다니는 거울 조각 반짝임 */for(let i=0;i<26;i++){const x=(i*97+T*(4+i%4))%500-10,y=(i*53)%200+10,s=Math.sin(T*2+i*1.7);c.globalAlpha=.15+.25*Math.max(0,s);c.fillStyle=i%3?'#e0ccff':'#b8fff6';c.fillRect(Math.round(x),Math.round(y),2,2);if(s>.9){c.fillRect(Math.round(x)-2,Math.round(y),6,1);c.fillRect(Math.round(x),Math.round(y)-2,1,6)}}c.globalAlpha=1}
  if(tone===3)scGlow(c,240,230,160,'#ffd8a0',.35)}
 /* 거꾸로 매달린 시계골 (위에서 아래로) */
 function hangTown(c,T,a,col,roof){c.save();c.globalAlpha=a==null?1:a;for(let i=0;i<9;i++){const x=10+i*54,h=18+(i*7)%14;c.fillStyle=col||'#c4d0e4';c.fillRect(x,0,24,h);c.fillStyle=roof||['#8a6ac8','#5a8ab8','#6a5a8a'][i%3];c.beginPath();c.moveTo(x-3,h);c.lineTo(x+12,h+10);c.lineTo(x+27,h);c.fill();c.fillStyle='#ffe8a0';c.globalAlpha=(a==null?1:a)*(.4+.3*Math.sin(T*2+i));c.fillRect(x+8,h-10,4,4);c.globalAlpha=a==null?1:a}
  c.restore()}
 /* 시계 (dir 1 = 앞으로, -1 = 거꾸로) */
 function clock(c,x,y,r,T,dir,col){c.fillStyle='#0a0c18';c.beginPath();c.arc(x,y,r+1.5,0,TAU);c.fill();c.fillStyle=col||'#f2f6ff';c.beginPath();c.arc(x,y,r,0,TAU);c.fill();c.fillStyle='#46526e';for(let i=0;i<12;i++){const a=i*TAU/12;c.fillRect(Math.round(x+Math.cos(a)*r*.8)-1,Math.round(y+Math.sin(a)*r*.8)-1,i%3?1:2,i%3?1:2)}
  const hr=-Math.PI/2+dir*T*.25,mn=-Math.PI/2+dir*T*1.6;c.strokeStyle='#0a0c18';c.lineWidth=Math.max(1,r*.12);c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(hr)*r*.5,y+Math.sin(hr)*r*.5);c.moveTo(x,y);c.lineTo(x+Math.cos(mn)*r*.8,y+Math.sin(mn)*r*.8);c.stroke();c.lineWidth=1}
 /* 은빛 거울 바닥 */
 function floor(c,tone){const g=c.createLinearGradient(0,232,0,270);g.addColorStop(0,tone===2?'#3a3260':'#8492b0');g.addColorStop(1,tone===2?'#120e22':'#232a40');c.fillStyle=g;c.fillRect(0,232,480,38);c.fillStyle=tone===2?'#c8b0ff':'#f2f6ff';c.globalAlpha=.6;c.fillRect(0,232,480,1);c.globalAlpha=.12;for(let i=0;i<6;i++){c.beginPath();c.moveTo(i*96,234);c.lineTo(i*96+30,234);c.lineTo(i*96-10,270);c.lineTo(i*96-40,270);c.fill()}c.globalAlpha=1}
 /* 은빛 시계탑 (fwd면 바늘이 앞으로) */
 function tower(c,x,y,s,T,fwd){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='#0a0c18';c.fillRect(-15,-120,30,120);c.fillStyle='#8492b0';c.fillRect(-14,-119,28,119);c.fillStyle='#c4d0e4';c.fillRect(-14,-119,8,119);c.fillStyle='#46526e';for(let yy=-110;yy<0;yy+=14)c.fillRect(-14,yy,28,1);
  c.fillStyle='#0a0c18';c.beginPath();c.moveTo(-19,-120);c.lineTo(0,-150);c.lineTo(19,-120);c.fill();c.fillStyle='#b48aff';c.beginPath();c.moveTo(-17,-121);c.lineTo(0,-147);c.lineTo(17,-121);c.fill();c.fillStyle='#e0ccff';c.fillRect(-1,-158,2,10);
  clock(c,0,-96,11,T,fwd?1:-1,'#f2f6ff');c.restore();scGlow(c,x,y-96*s,26*s,fwd?'#ffe8a0':'#b48aff',.3)}
 /* 거울 연못 (안에 거꾸로 된 마을이 비침) */
 function pond(c,x,y,rx,ry,T,q){c.fillStyle='#0a0c18';c.beginPath();c.ellipse(x,y,rx+2,ry+2,0,0,TAU);c.fill();c.save();c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.clip();
  const g=c.createLinearGradient(0,y-ry,0,y+ry);g.addColorStop(0,q>.5?'#c4d0e4':'#3a6a8a');g.addColorStop(1,q>.5?'#8492b0':'#1c3a52');c.fillStyle=g;c.fillRect(x-rx,y-ry,rx*2,ry*2);
  if(q>0){c.globalAlpha=q;c.translate(x-rx,y-ry);c.scale(rx*2/480,ry*2/60);hangTown(c,T,.8,'#e0e8f4','#8a6ac8')}c.restore();
  c.globalAlpha=.35*(q||0);c.fillStyle='#ffffff';c.fillRect(x-rx*.5,y-ry*.4,rx*.4,1);c.globalAlpha=1}
 /* 딱똑: 똑딱을 좌우로 뒤집고 보라빛으로 물들인 거울 쪽 요정 */
 const TK=document.createElement('canvas');TK.width=TK.height=96;
 function tickM(c,x,y,k,a){const g=TK.getContext('2d');g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='source-over';g.globalAlpha=1;g.clearRect(0,0,96,96);g.imageSmoothingEnabled=false;try{drawTick(g,48,48,performance.now(),k)}catch(e){}
  g.globalCompositeOperation='source-atop';g.globalAlpha=.5;g.fillStyle='#b48aff';g.fillRect(0,0,96,96);g.globalCompositeOperation='source-over';g.globalAlpha=1;
  const ga=c.globalAlpha;c.save();c.globalAlpha=ga*(a==null?1:a);c.translate(Math.round(x),Math.round(y));c.scale(-1,1);c.drawImage(TK,-48,-48);c.restore();scGlow(c,x,y,10*k,'#b48aff',.22*(a==null?1:a))}
 /* 하루 · 똑딱 + 딱똑 */
 const heroes=(c,T,x,noM)=>{scHero(c,x,231,2,T);if(!noM)tickM(c,x-26,206+Math.sin(T*3+1)*2,1.1)};
 /* 보스 장면 */
 function bossShot(k,lines,d,kind){const B=L7[k],ST=S7STORY[k],tone=TONE(k);return {d:d||4200,lines,la:500,draw(c,T){sky(c,tone,T);hangTown(c,T,.35,tone===2?'#3a3260':'#8492b0');
  if(kind==='memory')scSepia(c,.24);const q=scE(T/1.4),y=kind==='meet'?214+(1-q)*30:214;floor(c,tone);scGlow(c,330,y-60,75,B.c,.3*q);
  try{c3ArtOn(c,B.art,330,y,performance.now(),4.2,{pulse:.12,open:kind==='memory'?.4:0})}catch(e){}heroes(c,T,110);
  scTxt(c,ST.place,22,32,10,'#ffffff',scCl(T*2),'left');scTxt(c,'「'+ST.title+'」',22,46,8,B.c,scCl(T*2-.4),'left',700)}}}
 /* 막 카드 */
 function actCard(n,title,sub,tone){return {d:2600,draw(c,T){sky(c,tone,T);c.globalAlpha=.55;c.fillStyle='#000';c.fillRect(0,100,480,70);c.globalAlpha=1;const q=scE(scCl(T/.7));c.fillStyle='#b48aff';c.fillRect(Math.round(240-q*170),100,Math.round(q*340),1);c.fillRect(Math.round(240-q*170),169,Math.round(q*340),1);
  scTxt(c,'CHAPTER 7 · REVERSE  ·  '+n+'막',240,120,9,'#e0ccff',q,'center',800);scTxt(c,title,240,145,18,'#ffffff',q);scTxt(c,sub,240,162,9,'#e0e8f4',scCl((T-.6)*2),'center',700)}}}
 /* 진짜 시계골 언덕 (프롤로그·에필로그) */
 function town(c,T,dir){c.fillStyle='#6ab06a';c.beginPath();c.moveTo(0,215);for(let x=0;x<=480;x+=20)c.lineTo(x,215-Math.sin(x*.012+1)*18);c.lineTo(480,270);c.lineTo(0,270);c.fill();
  for(let i=0;i<8;i++){const x=20+i*58,y=226-(i%3)*4;c.fillStyle='#e8dcc8';c.fillRect(x,y,22,14);c.fillStyle=['#c86a4a','#5a8ab8','#8a6a4a'][i%3];c.beginPath();c.moveTo(x-3,y);c.lineTo(x+11,y-9);c.lineTo(x+25,y);c.fill()}
  c.fillStyle='#d8ccb4';c.fillRect(232,150,16,70);c.fillStyle='#8a6a52';c.fillRect(229,146,22,6);clock(c,240,166,9,T,dir,'#fff8e8')}
 /* 로비·명예의 전당(994)에서 같은 그림 도구를 씀 */
 window.S7SC={sky,hangTown,clock,floor,tower,pond,tickM,TONE};

 /* ---------- 프롤로그 ---------- */
 function prologue(){return [
  {d:4600,lines:[['','바람에 실린 노래가 끝나고 한 달. 시계골의 시계들이 하나둘 거꾸로 돌기 시작했다.'],['','째깍, 째깍… 아니, 깍째, 깍째.']],draw(c,T){sky(c,4,T);town(c,T*3,-1);for(let i=0;i<3;i++)clock(c,90+i*150,70+Math.sin(T+i)*4,14,T*(2+i),-1)}},
  {d:4400,lines:[['빵집 아저씨',rv('안녕하세요 하루야')+'…?'],['하루','아저씨 말이… 거꾸로 들려!']],draw(c,T){sky(c,4,T);town(c,T*3,-1);scHero(c,160,236,2.4,T);const x=320;c.fillStyle='#1a1420';c.fillRect(x-8,196,16,40);c.fillStyle='#f4e8d8';c.fillRect(x-7,197,14,38);c.fillStyle='#ffe0c8';c.fillRect(x-6,180,12,14);c.fillStyle='#ffffff';c.fillRect(x-7,174,14,7);c.fillStyle='#1a1420';c.fillRect(x-3,185,2,2);c.fillRect(x+2,185,2,2)}},
  {d:4800,lines:[['','마을 연못이 은빛 거울로 굳었다. 거울 속엔 거꾸로 매달린 시계골이 비쳤다.'],['라온의 목소리',rv('도와줘')+'… '+rv('들려')+'…?']],draw(c,T){sky(c,4,T);town(c,T*3,-1);const q=scE(scCl(T/2.5));pond(c,240,246,120,18,T,q);for(let i=0;i<4;i++){const r=(T*30+i*30)%120;c.globalAlpha=(1-r/120)*.4*q;c.strokeStyle='#e0ccff';c.beginPath();c.ellipse(240,246,r,r*.15,0,0,TAU);c.stroke()}c.globalAlpha=1}},
  {d:4600,lines:[['똑딱','라온 목소리야! 그런데 거꾸로…'],TT('빨리 와요 하루'),['하루','거울 속에… 똑딱이 또 있어?']],draw(c,T){sky(c,4,T);town(c,T*3,-1);pond(c,240,246,120,18,T,1);scHero(c,140,236,2.2,T);const q=scE(scCl((T-.6)/1.4));tickM(c,240,246-q*40,1.6,q)}},
  {d:4600,lines:[TT('나는 딱똑이에요 거울 쪽 시계 요정'),TT('저쪽 하루가 시간을 되감고 있어요'),['하루','저쪽… 하루?']],draw(c,T){sky(c,0,T);hangTown(c,T,.6);floor(c,0);heroes(c,T,150,true);tickM(c,300,196+Math.sin(T*3)*3,1.8)}},
  {d:4000,lines:[['하루','가자, 똑딱. 거울 속으로!'],['똑딱','꽉 잡아! 하나, 둘…']],draw(c,T){sky(c,4,T);town(c,T*3,-1);const q=scE(scCl((T-1)/2.4));pond(c,240,246,120+q*240,18+q*260,T,1);if(q<.6)scHero(c,240,236-q*30,2.2,T);if(q>.5){c.globalAlpha=(q-.5)*2;c.fillStyle='#f2f6ff';c.fillRect(0,0,480,270);c.globalAlpha=1}}},
  actCard(1,'거울 문','거꾸로 비친 마을',0)]}
 /* 1막 끝: 은빛 시계탑 발견 */
 function seeTower(){return [
  {d:4600,lines:[['','역류의 분수를 지나자, 거울 세계 한가운데 은빛 시계탑이 보였다.'],['','탑의 바늘이 거꾸로 돌 때마다, 거울 세계가 조금씩 뒤로 감겼다.']],draw(c,T){sky(c,1,T);hangTown(c,T,.4,'#8492b0');const q=scE(scCl(T/2.2));tower(c,240,232+(1-q)*30,1.2,T*3,false);floor(c,1)}},
  {d:4400,lines:[TT('저 탑에 그 애가 있어요'),['똑딱','그 애가… 저쪽 하루?'],TT('네 내 친구였어요')]
   ,draw(c,T){sky(c,1,T);tower(c,380,232,.8,T*3,false);floor(c,1);heroes(c,T,150,true);tickM(c,240,200+Math.sin(T*3)*3,1.6)}},
  actCard(2,'되비친 놀이터','거꾸로 도는 것들',1)]}
 /* 2막 반전: 거울 하루의 기억 */
 function twist(){const mem=(c,T)=>{sky(c,0,T);scSepia(c,.4)};return [
  {d:5200,lines:[['','회전목마가 멈추자, 거울 속 오래된 기억이 흘러나왔다.'],['','거울 세계의 하루는 첫 번째 싸움에서 졌다. 그쪽 시계골은 그날 그대로 멈췄다.']],draw(c,T){mem(c,T);hangTown(c,T,.7,'#c8b8a0','#8a6a52');floor(c,0);try{c3ArtOn(c,'s7_mharu',240,236,performance.now(),3.4,{open:.5,still:true})}catch(e){}}},
  {d:5200,lines:[['거울 하루','되감으면 돼. 흩어진 소리를 다 모아서… 지기 전으로.'],['거울 하루','그러면 아무도 지지 않아. 아무것도 끝나지 않아.']],draw(c,T){mem(c,T);tower(c,360,240,1,-T*4,false);floor(c,0);try{c3ArtOn(c,'s7_mharu',180,236,performance.now(),3.6,{pulse:.15})}catch(e){}}},
  {d:5400,lines:[TT('그만하자고 했다가 쫓겨났어요'),TT('그래도 다시 그 애의 친구가 되고 싶어요')],draw(c,T){if(T<2.6){mem(c,T);tickM(c,300,180+T*10,1.6,1-scCl(T-1.6));try{c3ArtOn(c,'s7_mharu',160,236,performance.now(),3.4,{still:true})}catch(e){}}else{sky(c,1,T);floor(c,1);heroes(c,T,150,true);tickM(c,300,196+Math.sin(T*3)*3,1.7)}}},
  {d:4600,lines:[['하루','그럼 같이 가자. 이번엔 우리가 박자를 맞춰 줄게.'],['똑딱','딱똑, 넌 이제 우리 편이야!']],draw(c,T){sky(c,2,T);tower(c,380,232,.9,T*3,false);floor(c,2);heroes(c,T,150,true);tickM(c,200,200+Math.sin(T*3)*3,1.4)}},
  actCard(3,'은빛 시계탑','반대편의 나',2)]}
 /* 엔딩 · 에필로그 */
 function ending(){return [
  {d:5200,lines:[['거울 하루','…졌네. 이번에도.'],['하루','아니. 이번엔 끝까지 같이 쳤잖아. 박자 하나도 안 놓치고.']],draw(c,T){sky(c,2,T);tower(c,400,232,.7,0,false);floor(c,2);scHero(c,140,231,2,T,true);try{c3ArtOn(c,'s7_mharu',300,244,performance.now(),3.4,{open:.6,still:true})}catch(e){}}},
  {d:5600,lines:[['딱똑','…같이 가자.'],['','처음으로, 딱똑의 말이 바로 들렸다.'],['거울 하루','…응.']],draw(c,T){sky(c,2,T);floor(c,2);scHero(c,140,231,2,T,true);try{c3ArtOn(c,'s7_mharu',300,244,performance.now(),3.4,{open:.3,still:true})}catch(e){}const q=scE(scCl(T/2));tickM(c,300-q*10,170-q*10,1.8);scGlow(c,290,160,40,'#ffe8a0',.3*q)}},
  {d:5000,lines:[['','은빛 시계탑의 바늘이, 앞으로 한 칸 움직였다.'],['','째깍.']],draw(c,T){sky(c,3,T);floor(c,2);const t2=T<1.8?0:Math.min(1,(T-1.8)*1.5)*.4;tower(c,240,240,1.4,t2,true);if(T>1.8&&T<2.4){c.globalAlpha=(2.4-T)*.6;c.fillStyle='#ffffff';c.fillRect(0,0,480,270);c.globalAlpha=1}}},
  {d:5200,lines:[['라온의 목소리','…다시 들려?'],['하루','…응. 잘 들려, 라온.']],draw(c,T){sky(c,3,T);floor(c,0);heroes(c,T,170,true);for(let i=0;i<14;i++){const q=(T*.25+i*.07)%1,x=480-q*520,y=60+Math.sin(q*6+i)*30+(i%4)*14;c.globalAlpha=Math.sin(q*Math.PI)*.6;c.fillStyle='#ffe8c8';c.fillRect(Math.round(x),Math.round(y),18,1)}c.globalAlpha=1;if(window.S6SC)try{S6SC.kite(c,380+Math.sin(T)*10,70+Math.sin(T*2)*6,1.6,'#5ad0b0',Math.sin(T)*.3)}catch(e){}}},
  {d:5000,lines:[['','시계골의 시계들이 다시 앞으로 간다. 빵집 아저씨가 "안녕, 하루야!" 하고 웃었다.'],['','연못에 비친 두 그림자가, 이쪽을 향해 손을 흔들었다.']],draw(c,T){sky(c,4,T);town(c,T*2,1);pond(c,240,246,120,18,T,1);scHero(c,150,236,2,T);c.save();c.beginPath();c.ellipse(240,246,118,16,0,0,TAU);c.clip();c.globalAlpha=.6;try{c3ArtOn(c,'s7_mharu',220,236,performance.now(),1.2,{still:true})}catch(e){}tickM(c,256,236,.8,.8);c.restore()}},
  {d:4400,lines:[['???','…0시.']],draw(c,T){c.fillStyle='#04040a';c.fillRect(0,0,480,270);const q=scCl(T/2.5);c.globalAlpha=q;clock(c,240,128,34,0,1,'#4a3a6a');c.globalAlpha=1;scGlow(c,240,128,70,'#ff5a7a',.4*q*(.6+.4*Math.sin(T*4)));if(T>2.4)scTxt(c,'00 : 00',240,196,12,'#ff8aa8',scCl((T-2.4)*1.5),'center',800)}},
  {d:3800,draw(c,T){c.fillStyle='#000';c.fillRect(0,0,480,270);const q=scE(scCl(T/1.2));scTxt(c,'CHAPTER 7 · REVERSE',240,112,9,'#e0ccff',q,'center',800);scTxt(c,'거울 속 시계골',240,138,18,'#ffffff',q);scTxt(c,'THE END',240,162,10,'#e0e8f4',scCl((T-.8)*2),'center',800);scTxt(c,'— 다음 박자 —',240,184,8,'#b48aff',scCl((T-1.6)*2),'center',700)}}]}

 /* ---------- 이야기 흐름 ---------- */
 window.s7Go=function(k,first){const s=sv();if(!unlocked()||k>(s.ci||0)||!L7[k])return;try{initAudio()}catch(e){}const seq=[];
  if(first||(k===0&&!s.pro)){seq.push(...prologue());s.pro=1;saveNow()}
  seq.push(bossShot(k,S7STORY[k].intro,4400,'meet'));scPlay(seq,()=>s7Fight(k,'story'))};
 window.s7Start=function(k){if(!unlocked()){try{gmSfx('no')}catch(e){}return}const ci=sv().ci||0,kk=Math.min(9,k==null?ci:Math.min(k,ci));try{gmSfx('ok')}catch(e){}s7Go(kk,kk===0&&ci===0)};
 window.s7StoryEnd=function(k,won,rank,coins,html){const B=L7[k];
  if(!won){showOverlay('CHAPTER 7 · REVERSE',S7STORY[k].place+' · 거울 속에 갇혔다…',html,[['다시 도전',()=>{$('overlay').hidden=true;s7Fight(k,'story')},true],['로비로',toLobby,false]]);return true}
  const s=sv(),o='PSABC';if(!s.best[k]||o.indexOf(rank)<o.indexOf(s.best[k]))s.best[k]=rank;s.ci=Math.max(s.ci||0,k+1);saveNow();
  const seq=[bossShot(k,S7STORY[k].outro,4400,'memory')];if(k===2)seq.push(...seeTower());if(k===6)seq.push(...twist());if(k===9)seq.push(...ending());
  seq.push(cxResultCard({tag:'CHAPTER 7 · REVERSE  ·  거울 '+(k+1)+' / 10',name:B.name,rank,coins,prog:'되찾은 거울 '+Math.min(10,s.ci)+'/10',next:k<9?L7[k+1].name:null,col:B.c,bg0:'#0c0a1c',bg1:B.dark}));
  scPlay(seq,()=>{if(k<9){s7Go(k+1,false);return}showOverlay('CHAPTER 7 · CLEAR','거울 속 시계골',html+'<br><br><b style="color:#e0ccff">챕터 7을 모두 마쳤어요!</b><br>보스 러시의 CHAPTER 7 탭에서 다시 도전할 수 있어요.',[['로비로',toLobby,true]])});return true};
 /* 최종전 마지막 단계: 똑딱과 딱똑이 양쪽에서 박자를 맞춰 줌 (이야기 모드만) */
 {const _ds=drawScene;drawScene=function(now){const r=_ds.apply(this,arguments);try{if(G&&G.s7===9&&G.s7How==='story'&&(G.phase||0)>=2&&G.state!=='result'){const t=now/1000,y=AY+22+Math.sin(t*2.1)*4,xl=AX+26,xr=AX+AW-26,beat=(G.beat||0)%1,fl=Math.max(0,1-beat*3);
   for(let x=xl+8;x<xr-8;x+=6)RA(x,Math.round(y+Math.sin(x*.05+t*4)*2),3,1,(x/6|0)%2?'#ffe8a0':'#e0ccff',.18+.3*fl);
   drawTick(ctx,xl,y,now,1.2);tickM(ctx,xr,y,1.2);ctx.globalAlpha=1}}catch(e){}return r}}

 /* ---------- 메뉴 ① 이야기 시계 (7번째 칸) ---------- */
 CS_CH.push({cv:'titleCv7',btn:'btnStory7',col:'#b48aff',ang:150,num:'VII',tag:'CHAPTER 7 · REVERSE',title:'거울 속 시계골',desc:'시계골의 시계가 거꾸로 돌고, 사람들의 말이 뒤집혔다. 은빛 거울이 된 연못 너머, 반대편의 나를 만나러.',unit:'거울'});
 /* 메달 7개를 다이얼 둘레에 고르게 다시 배치 */
 CS_CH.forEach((c,i)=>{c.ang=Math.round(-150+i*360/CS_CH.length)});
 {const c=document.createElement('canvas');c.id='titleCv7';c.width=480;c.height=190;c.style.display='none';document.body.appendChild(c);const b=document.createElement('button');b.id='btnStory7';b.hidden=true;b.textContent='▶ 거울 속으로';b.onclick=()=>s7Start();document.body.appendChild(b)}
 const CI=CS_CH.length-1;
 {const base=csLocked;csLocked=function(i){return i===CI?!unlocked():base.apply(this,arguments)}}
 {const base=csInfo;csInfo=function(i){return i===CI?info():base.apply(this,arguments)}}
 {const base=s_csPage;s_csPage=function(i){const r=base.apply(this,arguments);try{if(i===CI){const l=document.querySelector('#csPage .csLock');if(l)l.textContent='🔒 챕터 6의 제니스 정상에서 노래를 풀어 주면 열려요.'}}catch(e){}return r}}
 {const base=menuTick;menuTick=function(now){base.apply(this,arguments);try{if(GM.scr==='story'){const cv=$('titleCv7');if(cv&&cv.parentNode&&cv.parentNode.id==='csWin'){const c=cv.getContext('2d'),T=now/1000;c.imageSmoothingEnabled=false;c.save();c.scale(1,190/270);sky(c,0,T);hangTown(c,T,.6);tower(c,240,232,1,T*2,false);floor(c,0);c.restore()}}}catch(e){}}}

 /* ---------- 메뉴 ② 보스 러시: CHAPTER 7 탭 (rushCh=6) ---------- */
 const RC=6;
 const rushLk=k=>{if(!unlocked())return true;const ci=sv().ci||0;return k==null?ci<10:k>=ci};
 const rushBest=k=>{const o='PSABC',r=saveData.s7rush||{};let b=null;for(const d of ['easy','normal','hard','extreme']){const v=r[k+'|'+d];if(v&&(b===null||o.indexOf(v)<o.indexOf(b)))b=v}return b};
 const bpmOf=k=>((typeof C3MUS!=='undefined'&&C3MUS[L7[k].art])||{}).bpm||120;
 function tabPaint(){document.querySelectorAll('#gmRush .gmTabs [data-ch]').forEach(b=>{if(+b.dataset.ch===RC){b.classList.toggle('on',GM.rushCh===RC);b.style.setProperty('--pc','#b48aff');b.textContent=unlocked()?'🪞 CHAPTER 7':'🔒 CHAPTER 7'}})}
 {const _gb=gmBuild;gmBuild=function(){_gb.apply(this,arguments);try{const tabs=document.querySelector('#gmRush .gmTabs');if(tabs&&!tabs.querySelector('[data-ch="'+RC+'"]')){const b=document.createElement('button');b.className='gmPill';b.dataset.ch=String(RC);b.textContent='CHAPTER 7';b.onclick=()=>{GM.rushCh=RC;GM.rushSel=0;gmSfx('move');gmRushBuild()};tabs.appendChild(b)}tabPaint()}catch(e){}}}
 {const _gs=gmShow;gmShow=function(){const r=_gs.apply(this,arguments);try{tabPaint()}catch(e){}return r}}
 {const _rb=gmRushBuild;gmRushBuild=function(){if(GM.rushCh!==RC){const r=_rb.apply(this,arguments);tabPaint();return r}
  document.querySelectorAll('#gmRush .gmTabs [data-ch]').forEach(b=>b.classList.toggle('on',+b.dataset.ch===RC));tabPaint();
  const grid=$('gmGrid');grid.innerHTML='';for(let k=0;k<10;k++){const lk=rushLk(k),b0=L7[k],b=document.createElement('button');b.className='gmTile'+(k===GM.rushSel?' sel':'')+(lk?' lock':'');b.style.setProperty('--bc',b0.c);const cv=document.createElement('canvas');cv.width=96;cv.height=72;b.appendChild(cv);const rk=rushBest(k);
   b.insertAdjacentHTML('beforeend','<span class="no">'+String(k+1).padStart(2,'0')+'</span>'+(rk?'<span class="rk" style="color:'+(rk==='P'?'#fff6cf':rk==='S'?'#ffd166':'#cfe8d0')+'">'+(rk==='P'?'★':rk)+'</span>':'')+'<span class="nm">'+(lk?'???':b0.name)+'</span>');
   b.onmouseenter=()=>{if(GM.rushSel!==k){GM.rushSel=k;gmSfx('move');gmRushSelUpd()}};b.onclick=()=>{if(GM.rushSel===k)gmFight();else{GM.rushSel=k;gmSfx('move');gmRushSelUpd()}};grid.appendChild(b);
   try{const c=cv.getContext('2d');c.imageSmoothingEnabled=false;c.drawImage(s7MirrorArena(k),120,60,240,180,0,0,96,72);if(!lk)c3ArtOn(c,b0.art,48,68,0,1.15,{still:true});else{c.fillStyle='rgba(5,8,10,.75)';c.fillRect(0,0,96,72)}}catch(e){}}
  gmRushInfo();try{if(typeof rfLabels==='function')rfLabels()}catch(e){}}}
 {const _ri=gmRushInfo;gmRushInfo=function(){if(GM.rushCh!==RC)return _ri.apply(this,arguments);const k=GM.rushSel,b=L7[k],lk=rushLk(k);
  $('gmPrevName').textContent=lk?'???':b.name;$('gmPrevName').style.color=b.c;$('gmPrevEpi').textContent=lk?(unlocked()?'스토리 챕터 7에서 이 거울의 보스를 쓰러뜨리면 열려요':'챕터 6의 제니스 정상을 지나면 열리는 거울이에요'):'"'+S7STORY[k].title+'"  ·  '+b.en;
  $('gmPrevStat').innerHTML='<span>REVERSE '+String(k+1).padStart(2,'0')+' / 10</span><span>♩ '+bpmOf(k)+' BPM</span><span>HP '+(lk?'???':s7Hp(k).toLocaleString())+'</span><span>CHAPTER 7 · REVERSE</span>';
  const r=saveData.s7rush||{};$('gmPrevRanks').innerHTML=GM_DIFF.map(([kk,n,c])=>{const v=r[k+'|'+kk];return '<div style="'+(kk===diff?'box-shadow:0 0 0 2px '+c:'')+'">'+n+'<b style="color:'+(v?(v==='P'?'#fff6cf':c):'#3a4a50')+'">'+(v?(v==='P'?'★':v):'—')+'</b></div>'}).join('');
  $('gmFight').disabled=lk;try{rpDetail()}catch(e){}}}
 {const _gf=gmFight;gmFight=function(){if(GM.rushCh!==RC)return _gf.apply(this,arguments);const k=GM.rushSel;if(rushLk(k)){gmSfx('no');return}gmSfx('ok');s7Fight(k,'rush');$('bvTitle').textContent='BEAT BLADE · REVERSE 러시 '+(k+1)+'/10'}}
 {const f=rpKey;rpKey=function(){return GM.rushCh===RC?'r'+GM.rushSel:f.apply(this,arguments)}}
 {const f=rpDeck;rpDeck=function(){if(GM.rushCh!==RC)return f.apply(this,arguments);return (C3BOSS[L7[GM.rushSel].art]||{}).deck||[]}}
 {const f=rpMusId;rpMusId=function(){return GM.rushCh===RC?L7[GM.rushSel].art:f.apply(this,arguments)}}
 {const f=rpBpm;rpBpm=function(){return GM.rushCh===RC?bpmOf(GM.rushSel):f.apply(this,arguments)}}
 {const f=rpRunLk;rpRunLk=function(){return GM.rushCh===RC?rushLk(null):f.apply(this,arguments)}}
 {const f=rpLocked;rpLocked=function(){return GM.rushCh===RC?rushLk(GM.rushSel):f.apply(this,arguments)}}
 {const f=rqLk;rqLk=function(k){return GM.rushCh===RC?rushLk(k):f.apply(this,arguments)}}
 {const f=rfLocked;rfLocked=function(k){return GM.rushCh===RC?rushLk(k):f.apply(this,arguments)}}
 {const f=rqBoss;rqBoss=function(k){if(GM.rushCh!==RC)return f.apply(this,arguments);const b=L7[k];return {art:b.art,base:0,c:b.c,name:b.name,en:b.en,bpm:bpmOf(k)}}}
 {const f=rpDetail;rpDetail=function(){const r=f.apply(this,arguments);try{if(GM.rushCh===RC&&rpLocked()){const n=document.querySelector('#gmRushDet .rpNote');if(n)n.textContent='🔒 '+(unlocked()?'스토리 챕터 7에서 쓰러뜨린 보스만 공격 정보와 기록이 열려요.':'챕터 6의 제니스 정상을 지나면 열리는 거울이에요.')}}catch(e){}return r}}
 /* 10연전 */
 {const f=rpRunList;rpRunList=function(ch){return ch===RC?[...Array(10)].map((_,i)=>({s7:i})):f.apply(this,arguments)}}
 {const f=rpRunFight;rpRunFight=function(){const it=RUSH&&RUSH.list[RUSH.i];if(!it||it.s7==null)return f.apply(this,arguments);$('overlay').hidden=true;s7Fight(it.s7,'rush');if(RUSH.carry!=null)P.hp=Math.min(P.maxhp,Math.round(RUSH.carry+P.maxhp*.35));RUSH.fightT0=performance.now()}}
 function runEnd(won,k){const t=Math.round((performance.now()-(G.startReal||RUSH.fightT0))/1000),rank=won?rankOf(G.hits):'✕';
  RUSH.splits.push({name:L7[k].name,t,rank,score:G.score||0,hits:G.hits||0});RUSH.total+=t;RUSH.score+=G.score||0;RUSH.carry=P.hp;
  setTimeout(()=>{if(!RUSH)return;if(won&&RUSH.i<9){RUSH.i++;const nx=RUSH.list[RUSH.i];showOverlay('BOSS RUSH · '+RUSH.i+' / 10','다음 상대: '+L7[nx.s7].name,rpRunTable()+'<div style="margin-top:8px;color:#a6f5c6">체력 '+P.hp+' → 다음 판 시작 시 35% 회복</div>',[['계속 ▶',()=>rpRunFight(),true],['그만두기',()=>rpRunSummary(false),false]])}else rpRunSummary(won)},200)}
 /* 러시 전투 끝: 기록 + 10연전 이어가기 (가장 바깥에서 가로챔) */
 {const _fe=fightEnd;fightEnd=function(won){try{if(G&&G.s7!=null&&G.s7How==='rush'&&G.state!=='result'){const k=G.s7;try{if(typeof rpSaveRec==='function')rpSaveRec('r'+k,won)}catch(e){}
   if(typeof RUSH!=='undefined'&&RUSH&&RUSH.ch===RC){G.state='result';G.won=won;stopMusic();try{c3SwapOut()}catch(e){}G.s7=null;G.s7echo=null;
    if(won){saveData.s7rush=saveData.s7rush||{};const rank=rankOf(G.hits),kk=k+'|'+diff,o='PSABC';if(!saveData.s7rush[kk]||o.indexOf(rank)<o.indexOf(saveData.s7rush[kk]))saveData.s7rush[kk]=rank}saveNow();runEnd(won,k);return}}}catch(e){console.error('v50 ch7 rush',e)}return _fe.apply(this,arguments)}}
 /* 러시 결과 창의 '다음 보스'는 잠긴 보스로 넘어가지 않게 */
 {const _so=showOverlay;showOverlay=function(tag,title,text,btns){try{if(typeof tag==='string'&&tag.indexOf('REVERSE · ')===0&&Array.isArray(btns)){const m=/(\d\d)$/.exec(tag),k=m?+m[1]-1:-1;if(k>=0&&rushLk(k+1))btns=btns.filter(x=>x[0]!=='다음 보스 →')}}catch(e){}return _so.call(this,tag,title,text,btns)}}
}catch(e){console.error('v50 ch7 story',e)}})();
