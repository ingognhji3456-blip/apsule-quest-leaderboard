/* ================= v45 챕터 6 ZENITH 「바람이 머무는 곳」: 이야기 장면 · 저장 · 메뉴(이야기 시계 · 보스 러시 탭) 연결 ================= */
(function(){try{
 const L6=window.S6ART;if(!L6||typeof window.s6Fight!=='function')return;
 /* ---------- 보스별 이야기 ---------- */
 const S6STORY=window.S6STORY=[
  {place:'구름 선착장',title:'바람을 지키는 마지막 문지기',
   intro:[['풍향계 기사','멈춰라. 바람이 어디로 불지 모르니, 아무도 지나갈 수 없다.'],['하루','우린 위로 가야 해! 비켜 줘!']],
   outro:[['풍향계 기사','어디로 가야 할지 몰라서… 모두 막고 있었어.'],['','기사의 화살표가 처음으로 한 방향을 가리켰다. 하늘 위였다.']],
   phase:['바람이 방향을 바꾼다!','풍향계가 미친 듯이 돈다!'],dying:'…북쪽… 아니, 위쪽이었구나.'},
  {place:'연 날리는 언덕',title:'줄을 놓지 못한 손',
   intro:[['','수천 개의 연줄을 움켜쥔 거인이 언덕을 가로막았다.'],['연줄의 거인','하나도… 놓치지 않을 거야. 다시는 울게 하지 않을 거야.']],
   outro:[['','기억: 연을 놓친 아이가 울던 날, 거인은 다시는 연을 놓치지 않겠다고 약속했다.'],['연줄의 거인','놓아주는 것도… 날려 보내는 거였구나.']],
   phase:['연줄이 팽팽해진다!','수천 개의 연이 한꺼번에 떠오른다!'],dying:'…줄이… 가벼워졌어.'},
  {place:'폭풍 해협',title:'소리를 삼킨 먹구름',
   intro:[['똑딱','저 구름… 메아리를 삼키고 있어!'],['번개구름 고래','(우르릉… 삼킨 소리들이 번개가 되어 울린다)']],
   outro:[['','고래의 울음은 바다의 모래시계 고래와 같은 노래였다.'],['똑딱','바다의 동생이 하늘로 올라갔던 거야.']],
   phase:['먹구름이 부풀어 오른다!','삼킨 메아리가 번개로 터진다!'],dying:'…우르르… 이제 비가 되어 내릴게.'},
  {place:'녹슨 부두',title:'출항하지 못한 배',
   intro:[['비행선 함장','탑이 허락하지 않으면 아무도 내려갈 수 없다!'],['라온','함장님은… 마지막 피난선을 지키고 있어.']],
   outro:[['','기억: 함장은 사람들을 다 태우고도 출항 명령을 받지 못했다. 탑이 소리를 붙잡고 놓지 않았다.'],['비행선 함장','…닻을 올려라. 이번엔 내가 허락하지.']],
   phase:['전 포문 개방!','프로펠러 최대 출력!'],dying:'…출항… 하라…'},
  {place:'거꾸로 선 광장',title:'거꾸로 흐르는 정오',
   intro:[['','광장 위에 거꾸로 매달린 시계탑. 바늘은 정오에 멈춰 있다.'],['똑딱','시계가… 거꾸로 가려고 해!']],
   outro:[['','기억: 탑이 세워진 날 정오, 도시의 모든 시계가 그 시각에 맞춰졌다.'],['라온','그 뒤로 이 도시엔 오후가 오지 않았어.']],
   phase:['바늘이 거꾸로 돈다!','정오의 종이 울린다!'],dying:'…째깍… 한 시…'},
  {place:'바람 오르간 성당',title:'숨을 쉬지 못한 노래',
   intro:[['','성당 가득, 떠난 사람들이 남긴 목소리가 오르간 바람에 실려 되풀이된다.'],['라온','저 노래 속에… 아는 목소리가 있어.']],
   outro:[['','마지막 화음이 길게 이어지다가, 처음으로 숨을 쉬듯 멈췄다.'],['라온','…고마워. 이제 쉬어도 돼.']],
   phase:['풀무가 크게 부푼다!','돌림노래가 시작된다!'],dying:'…아아… 쉼표…'},
  {place:'일곱 빛 다리',title:'색을 잃은 약속',
   intro:[['무지개 다리 수문장','탑으로 가는 길은 하나. 너희의 소리를 일곱 색으로 나누어 보겠다.'],['하루','나눌 필요 없어. 우린 같이 갈 거야!']],
   outro:[['','부서진 무지개 사이로, 처음 보는 사람의 모습이 비쳤다.'],['라온','…아리아.']],
   phase:['일곱 빛이 갈라진다!','다리가 무너진다!'],dying:'…약속의 색이… 돌아온다…'},
  {place:'공명 나선 계단',title:'돌아오지 않는 소리를 쫓는 새',
   intro:[['','나선 계단을 오르자, 흩어지는 소리를 하나도 놓치지 않는 매가 날아들었다.'],['하루','…!'],['똑딱','하루 목소리를 훔쳐 갔어!']],
   outro:[['','매가 물고 있던 하루의 목소리를 조용히 내려놓았다.'],['하루','…돌아왔다. 고마워.']],
   phase:['날개 칼깃이 곤두선다!','사슬 종이 울린다!'],dying:'…돌려줄게… 다…'},
  {place:'탑 꼭대기 바람길',title:'고요를 연기하는 소용돌이',
   intro:[['폭풍의 눈','가운데는 조용하지? 모아 두면 아무도 다치지 않아.'],['라온','아니야. 바깥은 다 부서지고 있잖아!']],
   outro:[['','소용돌이가 풀리며, 탑 꼭대기로 가는 마지막 바람길이 열렸다.'],['라온','하루… 이다음엔 나도 같이 싸울게.']],
   phase:['소용돌이가 빨라진다!','폭풍이 눈을 뜬다!'],dying:'…고요는… 바깥에도 있었구나.'},
  {place:'제니스 정상',title:'끝나지 않는 노래',
   intro:[['','세상의 모든 소리가 한꺼번에 울린다. 노래가 아니라, 굉음이다.'],['라온','하루! 부수지 마. 놓아줘야 해!'],['하루','알았어. 바람에 실어 보내자!']],
   outro:[['','탑의 굉음이 하나씩 풀려, 서로 다른 음이 되었다.'],['','처음으로, 노래가 들렸다.']],
   phase:['지나온 모든 챕터의 소리가 쏟아진다!','라온: "바람길을 열게! 지금이야, 하루!"'],dying:'…라… 라라…'}];
 /* 하늘 곡: 보스마다 다른 곡 (없으면 1장 보스 곡이 나옴) */
 try{const BPM=[124,132,118,136,128,112,140,146,150,138],SCL=['maj','mix','dor','mix','dor','maj','mix','dor','min','hmin'],PR=[[0,4,5,3],[0,5,3,4],[0,3,4,4],[0,5,4,3],[0,4,3,5],[0,3,5,4]],HK=['soar','sparkle','swing','drive','baroque','soar','sparkle','run','frantic','final'],DR=['dance','gallop','half','rock','waltz','half','dance','gallop','break','rock'];
  L6.forEach((b,k)=>{if(typeof C3MUS!=='undefined'&&!C3MUS[b.art])C3MUS[b.art]={title:S6STORY[k].title,tag:'제니스의 바람',bpm:BPM[k],root:45+k%5,sc:SCL[k],pr:PR[k%PR.length],cp:{duty:k%2?.25:.5,bass:k%3?'oct':'gal',dr:DR[k],arp:k%2,hook:HK[k]}}})}catch(e){}
 /* 러시 미리보기 배경도 하늘 전장 */
 {const base=c3PaintArena;c3PaintArena=function(c,art){const k=L6.findIndex(b=>b.art===art);if(k<0||!window.s6SkyArena)return base.apply(this,arguments);c.drawImage(s6SkyArena(k),0,0)}}

 /* ---------- 저장 ---------- */
 const sv=window.s6Save=()=>{const s=saveData.ch6||(saveData.ch6={ci:0,best:{}});s.best=s.best||{};return s};
 const unlocked=window.s6Unlocked=()=>{try{const s=saveData.ch5||{};return (s.ci||0)>=10||!!(s.best||{})[9]}catch(e){return false}};
 const info=()=>{const s=sv();return {slots:L6.map((b,k)=>({k,art:b.art,name:b.name,rank:s.best[k]||null,seen:k<s.ci,cur:k===s.ci})),done:s.ci>=10,prog:Math.min(1,(s.ci||0)/10)}};
 const rankOf=h=>h===0?'P':h<=2?'S':h<=4?'A':h<=7?'B':'C';

 /* ---------- 장면 그리기 도구 (480×270) ---------- */
 const TONE=k=>k>=7?2:k>=3?1:0;/* 0 새벽 · 1 한낮 · 2 폭풍 · 3 노을(엔딩) · 4 시계골 언덕 */
 const SKY=[['#2e2c66','#d8786a','#ffd3a0'],['#2f7fd0','#8fd2f6','#dff3ff'],['#080c22','#1a2450','#2c3664'],['#3a2a5a','#e87a5a','#ffcf8a'],['#4a8ad8','#a8dcf8','#e8f6ff']];
 function sky(c,tone,T){const p=SKY[tone],g=c.createLinearGradient(0,0,0,270);g.addColorStop(0,p[0]);g.addColorStop(.62,p[1]);g.addColorStop(1,p[2]);c.fillStyle=g;c.fillRect(0,0,480,270);
  if(tone===0||tone===3){scGlow(c,380,190,120,tone===3?'#ffb070':'#ffd8a0',.35)}
  if(tone===2){for(let i=0;i<30;i++){c.globalAlpha=.25+.25*Math.sin(T*2+i);c.fillStyle='#cfe0ff';c.fillRect((i*97)%480,(i*41)%120,1,1)}c.globalAlpha=1;if(Math.sin(T*1.7)>.97){c.globalAlpha=.25;c.fillStyle='#e8f4ff';c.fillRect(0,0,480,270);c.globalAlpha=1}}
  /* 먼 구름층 */const cc=tone===2?'#3a4878':'#ffffff';for(let i=0;i<9;i++){const x=((i*83+T*(6+i%3*3))%600)-60,y=60+(i*37)%120,s=30+(i*13)%30;c.globalAlpha=tone===2?.3:.45;c.fillStyle=cc;for(let j=0;j<4;j++){c.beginPath();c.ellipse(x+j*s*.35,y+Math.sin(j*1.7)*3,s*.42,s*.2,0,0,TAU);c.fill()}}c.globalAlpha=1}
 function windLines(c,T,a=.35,col='#ffffff'){for(let i=0;i<14;i++){const q=(T*.45+i*.137)%1,x=q*580-60,y=30+((i*53)%190);c.globalAlpha=Math.sin(q*Math.PI)*a;c.fillStyle=col;c.fillRect(Math.round(x),y,24+i%3*12,1);c.fillRect(Math.round(x)+10,y+3,10,1)}c.globalAlpha=1}
 function island(c,x,y,w,col,dark){c.fillStyle=dark;c.beginPath();c.moveTo(x-w,y);c.lineTo(x+w,y);c.lineTo(x+w*.5,y+w*.35);c.lineTo(x+w*.15,y+w*.75);c.lineTo(x-w*.3,y+w*.4);c.closePath();c.fill();c.fillStyle=col;c.fillRect(x-w,y-3,w*2,4)}
 /* 거꾸로 매달린 시계탑이 있는 하늘 도시 (up=1이면 바로 선 모습) */
 function city(c,x,y,s,T,up){c.save();c.translate(x,y);c.scale(s,s);island(c,0,0,60,'#c8b89a','#5a4a40');for(const [bx,bh] of [[-40,18],[-24,26],[20,22],[38,14]]){c.fillStyle='#e8dcc8';c.fillRect(bx-6,-bh,12,bh);c.fillStyle='#7a5a4a';c.fillRect(bx-7,-bh-4,14,4)}
  const dir=up?-1:1,base=up?-2:20;c.fillStyle='#d8ccb4';c.fillRect(-7,up?base-58:base,14,58);c.fillStyle='#8a6a52';c.fillRect(-9,up?base-62:base+56,18,6);
  const cy=up?base-44:base+44;c.fillStyle='#fff8e8';c.beginPath();c.arc(0,cy,8,0,TAU);c.fill();c.strokeStyle='#3a2a20';c.lineWidth=1;c.stroke();
  const hr=up?(-Math.PI/2+Math.min(1,T*.25)*Math.PI/6):Math.PI/2,mn=up?(-Math.PI/2+T*.6):Math.PI/2;c.beginPath();c.moveTo(0,cy);c.lineTo(Math.cos(hr)*4.5,cy+Math.sin(hr)*4.5);c.moveTo(0,cy);c.lineTo(Math.cos(mn)*7,cy+Math.sin(mn)*7);c.stroke();
  for(let i=0;i<3;i++){const yy=up?base-62-6-i*5:base+62+i*5;c.fillStyle=i%2?'#8ad8ff':'#ffd08a';c.fillRect(-1-i,yy,2+i*2,2)}c.restore()}
 /* 연 */function kite(c,x,y,s,col,rot,a=1){c.save();c.globalAlpha=a;c.translate(x,y);c.rotate(rot||0);c.fillStyle='#1a1420';c.beginPath();c.moveTo(0,-7*s);c.lineTo(5*s,0);c.lineTo(0,9*s);c.lineTo(-5*s,0);c.closePath();c.fill();c.fillStyle=col;c.beginPath();c.moveTo(0,-6*s);c.lineTo(4*s,0);c.lineTo(0,8*s);c.lineTo(-4*s,0);c.closePath();c.fill();c.fillStyle='#ffffff';c.globalAlpha=a*.35;c.beginPath();c.moveTo(0,-6*s);c.lineTo(4*s,0);c.lineTo(0,0);c.closePath();c.fill();c.restore();c.globalAlpha=1}
 /* 비행선 바람개비호 */function ship(c,x,y,s,T){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='#1a1420';c.beginPath();c.ellipse(0,-14,31,13,0,0,TAU);c.fill();c.fillStyle='#e8d0a0';c.beginPath();c.ellipse(0,-14,30,12,0,0,TAU);c.fill();c.fillStyle='#c86a4a';for(const xx of [-18,-6,6,18]){c.beginPath();c.ellipse(xx,-14,3,11.5,0,0,TAU);c.fill()}
  c.strokeStyle='#5a4030';c.lineWidth=1;c.beginPath();c.moveTo(-14,-3);c.lineTo(-10,6);c.moveTo(14,-3);c.lineTo(10,6);c.stroke();c.fillStyle='#7a4a2a';c.fillRect(-14,6,28,7);c.fillStyle='#a8703a';c.fillRect(-14,6,28,2);
  c.save();c.translate(-34,-14);c.rotate(T*8);for(let i=0;i<4;i++){c.rotate(Math.PI/2);c.fillStyle=['#ff6a5a','#ffd08a','#5ad0b0','#8ad8ff'][i];c.beginPath();c.moveTo(0,0);c.lineTo(7,-2);c.lineTo(5,3);c.closePath();c.fill()}c.restore();c.restore()}
 /* 라온: 연 조각 망토 · 긴 목도리 · 바람 지도. fade(0~1)면 연 조각으로 흩어짐 */
 function raon(c,x,y,s,T,o){o=o||{};const f=o.fade||0,P=(xx,yy,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x+xx*s),Math.round(y+yy*s),Math.ceil(w*s),Math.ceil(h*s))},bob=Math.round(Math.sin(T*3)*.6);
  c.save();c.globalAlpha=1-f*.85;
  /* 목도리 (바람에 날림) */for(let i=0;i<7;i++){const yy=-11+bob+Math.sin(T*6-i*.8)*1.2+i*.25;P(3+i*1.6,yy,1.8,1.4,i%2?'#ff8a5a':'#ffb07a')}
  /* 망토: 연 조각 */P(-4,-10+bob,8,8,'#1a1420');P(-3.5,-9.5+bob,3.5,3.5,'#ff6a5a');P(0,-9.5+bob,3.5,3.5,'#ffd08a');P(-3.5,-6+bob,3.5,3.5,'#5ad0b0');P(0,-6+bob,3.5,3.5,'#8ad8ff');
  /* 다리 */P(-2,-2,1.6,2,'#3a2a3a');P(.6,-2,1.6,2,'#3a2a3a');
  /* 머리 */P(-3,-16+bob,6,6,'#1a1420');P(-2.5,-15.5+bob,5,5,'#ffe0c8');P(-3,-17+bob,6,2.5,'#5a8ab8');P(-3.6,-16+bob,1.6,4,'#5a8ab8');P(2,-17.6+bob,1.6,1.4,'#5a8ab8');
  if(!o.closed){P(-1.5,-13.5+bob,1,1,'#1a1420');P(1,-13.5+bob,1,1,'#1a1420')}else{P(-1.5,-13+bob,1.2,.5,'#1a1420');P(.8,-13+bob,1.2,.5,'#1a1420')}P(-.6,-11.8+bob,1.4,.5,'#d8786a');
  /* 바람 지도 두루마리 */if(!o.noMap){P(-6.5,-7+bob,3,4,'#f4e8c8');P(-6.5,-7+bob,3,.6,'#a8703a');P(-6,-5.5+bob,2,.4,'#5ad0b0')}
  c.restore();
  if(f>0){const r=rng(77);for(let i=0;i<14;i++){const q=Math.min(1,Math.max(0,f*1.6-i*.05)),a=Math.sin(q*Math.PI);if(a<=0)continue;kite(c,x+(r()*10-5)*s+q*(40+r()*80)*s/2,y-(8+r()*8)*s-q*(30+r()*60)*s/2,s*.28,['#ff6a5a','#ffd08a','#5ad0b0','#8ad8ff'][i%4],q*4+i,a)}}}
 /* 조율사 아리아 (회상): 긴 머리 · 소리굽쇠 지팡이 */
 function aria(c,x,y,s,T,a){c.save();c.globalAlpha=a==null?1:a;const P=(xx,yy,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x+xx*s),Math.round(y+yy*s),Math.ceil(w*s),Math.ceil(h*s))};
  P(-5,-18,10,18,'#1a1420');P(-4.5,-17.5,9,17.5,'#e8e0f8');P(-4.5,-6,9,1,'#c8a0ff');P(-4,-24,8,7,'#1a1420');P(-3.5,-23.5,7,6,'#ffe8d8');P(-4.5,-25,9,3,'#d8c8a0');P(-5,-23,2,12,'#d8c8a0');P(3,-23,2,12,'#d8c8a0');P(-1.6,-21,1,1,'#3a2a3a');P(1,-21,1,1,'#3a2a3a');
  P(7,-26,1,26,'#a8885a');P(5.5,-30,1,5,'#ffe8a0');P(8.5,-30,1,5,'#ffe8a0');P(5.5,-26,4,1,'#ffe8a0');scGlow(c,x+7.5*s,y-29*s,10*s,'#ffe8a0',.35+.15*Math.sin(T*3));c.restore()}
 /* 하늘에 쌓인 메아리 고리 (프롤로그·엔딩) */
 function echoes(c,cx,cy,T,n,out){const cols=['#ffd08a','#8ad8ff','#ff8ab0','#a6f5c6','#c8a0ff'];for(let i=0;i<n;i++){const q=((T*.35+i/n)%1),r=out?10+q*260:150-q*140;c.globalAlpha=(out?1-q:q)*.5;c.strokeStyle=cols[i%5];c.lineWidth=1;c.beginPath();c.arc(cx,cy,r,0,TAU);c.stroke()}c.globalAlpha=1}
 function notes(c,cx,cy,T,out){const cols=['#ffd08a','#8ad8ff','#ff8ab0','#a6f5c6','#c8a0ff','#ffffff'];for(let i=0;i<36;i++){const a=i*2.39996,q=out?((T*.25+i*.029)%1):1-((T*.25+i*.029)%1),d=20+q*300,x=cx+Math.cos(a)*d,y=cy+Math.sin(a)*d*.6;c.globalAlpha=Math.sin(q*Math.PI)*.9;c.fillStyle=cols[i%6];c.fillRect(Math.round(x),Math.round(y),2,2);c.fillRect(Math.round(x)+2,Math.round(y)-4,1,5)}c.globalAlpha=1}
 function ledge(c,tone){c.fillStyle=tone===2?'#222438':'#5a4a40';c.fillRect(0,236,480,40);c.fillStyle=tone===2?'#3a3c58':'#b8a890';c.fillRect(0,232,480,6);c.globalAlpha=.25;c.fillStyle='#000';for(let x=0;x<480;x+=24)c.fillRect(x,238,1,30);c.globalAlpha=1}
 function hills(c,T){c.fillStyle='#6ab06a';c.beginPath();c.moveTo(0,215);for(let x=0;x<=480;x+=20)c.lineTo(x,215-Math.sin(x*.012+1)*18);c.lineTo(480,270);c.lineTo(0,270);c.fill();c.fillStyle='#4a8a4a';c.beginPath();c.moveTo(0,240);for(let x=0;x<=480;x+=20)c.lineTo(x,236-Math.sin(x*.02)*10);c.lineTo(480,270);c.lineTo(0,270);c.fill();
  /* 시계골 지붕 */for(let i=0;i<8;i++){const x=20+i*58,y=226-(i%3)*4;c.fillStyle='#e8dcc8';c.fillRect(x,y,22,14);c.fillStyle=['#c86a4a','#5a8ab8','#8a6a4a'][i%3];c.beginPath();c.moveTo(x-3,y);c.lineTo(x+11,y-9);c.lineTo(x+25,y);c.fill()}}
 const heroes=(c,T,x,withRaon,o)=>{scHero(c,x,231,2,T);if(withRaon)raon(c,x+42,232,2,T,o)};
 /* 보스 장면 */
 function bossShot(k,lines,d,kind){const B=L6[k],ST=S6STORY[k],tone=TONE(k);return {d:d||4200,lines,la:500,draw(c,T){sky(c,tone,T);windLines(c,T,tone===2?.25:.35);
  if(kind==='memory')scSepia(c,.24);const q=scE(T/1.4),y=kind==='meet'?214+(1-q)*30:214;ledge(c,tone);scGlow(c,330,y-60,75,B.c,.3*q);
  try{c3ArtOn(c,B.art,330,y,performance.now(),4.6,{pulse:.12,open:kind==='memory'?.4:0})}catch(e){}heroes(c,T,96,k>=3&&k<=9);
  scTxt(c,ST.place,22,32,10,'#ffffff',scCl(T*2),'left');scTxt(c,'「'+ST.title+'」',22,46,8,B.c==='#ffffff'?'#e8f0ff':B.c,scCl(T*2-.4),'left',700)}}}
 /* 막 카드 */
 function actCard(n,title,sub,tone){return {d:2600,draw(c,T){sky(c,tone,T);windLines(c,T,.4);c.globalAlpha=.55;c.fillStyle='#000';c.fillRect(0,100,480,70);c.globalAlpha=1;const q=scE(scCl(T/.7));c.fillStyle='#ffd08a';c.fillRect(Math.round(240-q*170),100,Math.round(q*340),1);c.fillRect(Math.round(240-q*170),169,Math.round(q*340),1);
  scTxt(c,'CHAPTER 6 · ZENITH  ·  '+n+'막',240,120,9,'#ffd08a',q,'center',800);scTxt(c,title,240,145,18,'#ffffff',q);scTxt(c,sub,240,162,9,'#e8e0d0',scCl((T-.6)*2),'center',700)}}}
 /* ---------- 프롤로그 ---------- */
 function prologue(){return [
  {d:4600,lines:[['','종소리가 돌아온 지 사흘째. 바다에서 떠오른 소리들이 흩어지지 않고 시계골 하늘에 쌓였다.'],['','웃음소리, 종소리, 파도 소리가 겹쳐 천둥처럼 울린다.']],draw(c,T){sky(c,4,T);echoes(c,240,60,T,9,false);notes(c,240,60,T,false);hills(c,T);if(Math.sin(T*2.3)>.9)SC4.shake=Math.max(SC4.shake,.3)}},
  {d:4200,lines:[['똑딱','소리들이 내려오질 않아. 위에서 누가 끌어당기고 있어.'],['하루','저기… 구름 사이에 뭐가 있어!']],draw(c,T){sky(c,4,T);echoes(c,240,40,T,7,false);hills(c,T);scHero(c,200,236,2.4,T)}},
  {d:4400,lines:[['','구름이 갈라지고, 거꾸로 매달린 시계탑이 보였다. 하늘 도시 제니스였다.']],draw(c,T){sky(c,0,T);const q=scE(scCl(T/2.5));city(c,240,70+(1-q)*20,1.25,T,false);for(const s of [-1,1]){c.fillStyle='#ffffff';c.globalAlpha=.8*(1-q);c.beginPath();c.ellipse(240+s*(60+q*200),90,140,40,0,0,TAU);c.fill()}c.globalAlpha=1;windLines(c,T,.4)}},
  {d:4600,lines:[['','낡은 비행선 정류장에 종이 연 하나가 떨어졌다.'],['연에 적힌 글씨','도와줘. 탑이 멈추지 않아.']],draw(c,T){sky(c,0,T);ledge(c,0);ship(c,360,200,1.6,T*.1);scHero(c,150,231,2,T);const q=scE(scCl(T/2.2));kite(c,190+Math.sin(T*2)*12*(1-q),40+q*170,2.2,'#ff6a5a',Math.sin(T*3)*.4*(1-q));
   if(T>2.4){c.globalAlpha=scCl((T-2.4)*2);c.fillStyle='#f4e8c8';c.fillRect(150,40,180,36);c.strokeStyle='#a8703a';c.strokeRect(150.5,40.5,179,35);c.globalAlpha=1;scTxt(c,'도와줘. 탑이 멈추지 않아.',240,62,10,'#5a3a2a',scCl((T-2.6)*2),'center',800)}}},
  {d:4000,lines:[['하루','바람개비호, 아직 날 수 있겠지?'],['똑딱','바람만 잘 타면! 꽉 잡아!']],draw(c,T){sky(c,0,T);const q=scE(scCl((T-1)/3));city(c,400,50,.55,T,false);ship(c,200+q*60,170-q*70,2,T);windLines(c,T,.5);try{drawKnight(c,200+q*60,170-q*70+4,1.4,false,null,T*2.3)}catch(e){}}},
  actCard(1,'바람의 항로','하늘로 올라가는 길',0)]}
 /* 1막 끝: 제니스 도착 · 라온 */
 function meetRaon(){return [
  {d:3800,lines:[['','번개구름이 걷히자, 하늘 도시 제니스의 부두가 눈앞에 펼쳐졌다.']],draw(c,T){sky(c,1,T);city(c,240,120,1.6,T,false);ship(c,90+T*12,200,1.3,T);windLines(c,T,.35)}},
  {d:5200,lines:[['???','…너희가 내 연을 받은 거야?'],['라온','나는 라온. 바람 지도를 그려. 어른들은 다 아래로 내려갔어.'],['라온','나만 탑 소리가 무서워서 숨어 있었어. 탑까지 가는 바람길은… 내가 알아.']],draw(c,T){sky(c,1,T);windLines(c,T,.3);ledge(c,1);
   c.fillStyle='#8a6a4a';c.fillRect(300,206,40,28);c.fillStyle='#a8885a';c.fillRect(300,206,40,3);const q=scE(scCl((T-.8)/1.2));raon(c,320+q*-40,232,2.2,T);c.fillStyle='#8a6a4a';if(q<.5)c.fillRect(300,214,40,20);scHero(c,140,231,2,T)}},
  actCard(2,'떠 있는 도시','도시는 왜 멈췄을까',1)]}
 /* 2막 반전: 아리아의 기억 · 라온의 비밀 */
 function twist(){const mem=(c,T)=>{sky(c,1,T);scSepia(c,.4);windLines(c,T,.2,'#ffe8c8')};return [
  {d:5200,lines:[['','다리의 빛 속에서 오래된 기억이 흘러나왔다.'],['아리아','아래 세상은 너무 시끄러워. 아이들이 지치지 않도록… 모든 소리를 모아, 하나의 완벽한 노래를 만들 거야.']],draw(c,T){mem(c,T);city(c,330,150,1.3,T,true);aria(c,150,232,2.4,T,scCl(T));notes(c,330,90,T,false)}},
  {d:4800,lines:[['','노래가 완성되기 직전, 조율사 아리아는 사라졌다.'],['','탑은 지금도 노래를 끝내려고, 세상의 소리를 끌어당기고 있다.']],draw(c,T){mem(c,T);city(c,330,150,1.3,T,true);aria(c,150,232,2.4,T,1-scCl(T/3));echoes(c,330,100,T,8,false)}},
  {d:5600,lines:[['아리아','바람아, 이 아이를 지켜 줘. 이름은… 라온.'],['하루','라온… 너, 연으로 만들어진 거야?'],['라온','응. 노래가 완성되면 나는 바람에 흩어져. 알고 있었어. 그래도… 탑을 멈추고 싶어.']],draw(c,T){if(T<3){mem(c,T);aria(c,170,232,2.4,T,.8);for(let i=0;i<4;i++)kite(c,260+i*14,200-i*10+Math.sin(T*2+i)*3,1.4,['#ff6a5a','#ffd08a','#5ad0b0','#8ad8ff'][i],T+i);raon(c,300,232,2.2,T,{fade:1-scCl(T/2.6),noMap:true})}else{sky(c,1,T);ledge(c,1);scHero(c,150,231,2,T);raon(c,300,232,2.2,T)}}},
  {d:4600,lines:[['똑딱','그럼 노래를 완성시키지 않으면 되잖아!'],['라온','아니야. 소리를 놓아주는 거야. 그게 아리아가 끝내 못 한 일이야.']],draw(c,T){sky(c,1,T);windLines(c,T,.35);ledge(c,1);heroes(c,T,150,true)}},
  actCard(3,'폭풍의 눈','놓아주기',2)]}
 /* 엔딩 · 에필로그 */
 function ending(){return [
  {d:5400,lines:[['','탑에 모여 있던 소리들이 바람을 타고 세상 곳곳으로 흩어졌다.'],['','톱니 소리, 짐승의 울음, 초침, 별빛, 파도. 저마다 돌아갈 곳으로.']],draw(c,T){sky(c,3,T);city(c,240,150,1.4,T,true);echoes(c,240,100,T,10,true);notes(c,240,100,T,true)}},
  {d:5400,lines:[['라온','괜찮아. 바람이 부는 곳엔 내가 있을 거야.'],['하루','라온…!']],draw(c,T){sky(c,3,T);windLines(c,T,.4,'#ffe8c8');ledge(c,3);scHero(c,150,231,2,T);raon(c,300,232,2.4,T,{fade:scCl((T-1.5)/3.5),closed:T>1.2})}},
  {d:5600,lines:[['아리아의 마지막 기록','완벽한 노래는 없었다.'],['아리아의 마지막 기록','모든 소리는 저마다 다른 곳으로 흘러갈 때, 비로소 노래가 된다.']],draw(c,T){c.fillStyle='#120e1c';c.fillRect(0,0,480,270);scGlow(c,240,135,160,'#ffe8a0',.12);aria(c,240,200,2,T,.35);
   scTxt(c,'완벽한 노래는 없었다.',240,96,13,'#ffe8c8',scCl((T-.6)*1.5));scTxt(c,'모든 소리는 저마다 다른 곳으로 흘러갈 때,',240,226,10,'#e8e0f8',scCl((T-2.4)*1.5),'center',700);scTxt(c,'비로소 노래가 된다.',240,242,10,'#e8e0f8',scCl((T-2.9)*1.5),'center',700)}},
  {d:4600,lines:[['똑딱','하루, 들려? 바람 소리.'],['하루','응. 라온 목소리 같아.']],draw(c,T){sky(c,3,T);windLines(c,T,.45,'#ffe8c8');ship(c,240,160+Math.sin(T)*3,2,T);try{drawKnight(c,240,164+Math.sin(T)*3,1.4,false,null,T*2.3)}catch(e){}kite(c,400-T*10,60+Math.sin(T*2)*6,1.6,'#5ad0b0',Math.sin(T)*.3)}},
  {d:4800,lines:[['','며칠 뒤, 시계골 언덕. 아이들이 연을 날린다.'],['','연 하나가 혼자 높이 올라가 바람개비처럼 돌았다.']],draw(c,T){sky(c,4,T);hills(c,T);const cols=['#ff6a5a','#ffd08a','#8ad8ff','#c8a0ff'];for(let i=0;i<4;i++){const x=90+i*90,y=110+Math.sin(T*1.5+i)*8;c.strokeStyle='#ffffff';c.globalAlpha=.5;c.beginPath();c.moveTo(x-30,236);c.quadraticCurveTo(x-20,180,x,y+8);c.stroke();c.globalAlpha=1;kite(c,x,y,1.6,cols[i],Math.sin(T+i)*.3)}
   const q=scE(scCl((T-1.5)/2.5));c.save();c.translate(260,90-q*50);c.rotate(T*3*q);for(let i=0;i<4;i++){c.rotate(Math.PI/2);c.fillStyle=['#ff6a5a','#ffd08a','#5ad0b0','#8ad8ff'][i];c.beginPath();c.moveTo(0,0);c.lineTo(9,-3);c.lineTo(7,4);c.closePath();c.fill()}c.restore();scGlow(c,260,90-q*50,24,'#ffffff',.3*q)}},
  {d:4800,lines:[['','거꾸로 매달렸던 시계탑이 바로 서고, 바늘이 정오를 지나 한 시를 가리켰다.'],['','시간이 다시 흐르기 시작했다.']],draw(c,T){sky(c,4,T);city(c,240,190,1.6,T,true)}},
  {d:4400,noFade:false,lines:[['','…그리고 어딘가에서, 바람에 실려 간 소리 하나가 거울에 부딪혀 거꾸로 돌아왔다.'],['???','…다시 들려?']],draw(c,T){c.fillStyle='#08080e';c.fillRect(0,0,480,270);const q=scCl(T/3);c.strokeStyle='#c8d8ff';c.globalAlpha=.5;c.strokeRect(200.5,60.5,80,130);c.globalAlpha=.12;c.fillStyle='#c8d8ff';c.fillRect(201,61,79,129);c.globalAlpha=1;
   for(let i=0;i<5;i++){const x=40+q*160-i*6,y=125+Math.sin(i)*4;c.fillStyle='#ffd08a';c.globalAlpha=(1-i/5)*(q<1?1:0);c.fillRect(x,y,2,2)}c.globalAlpha=1;if(q>=1){const r=scCl(T-3);for(let i=0;i<5;i++){c.fillStyle='#ff8ab0';c.globalAlpha=1-i/5;c.fillRect(200-r*150+i*6,125-Math.sin(i)*4,2,2)}c.globalAlpha=1;scTxt(c,'REVERSE',240,220,10,'#ff8ab0',r*.7,'center',800)}}},
  {d:3600,draw(c,T){c.fillStyle='#000';c.fillRect(0,0,480,270);const q=scE(scCl(T/1.2));scTxt(c,'CHAPTER 6 · ZENITH',240,118,9,'#ffd08a',q,'center',800);scTxt(c,'바람에 실린 노래',240,142,18,'#ffffff',q);scTxt(c,'THE END',240,166,10,'#e8e0d0',scCl((T-.8)*2),'center',800)}}]}

 /* ---------- 이야기 흐름 ---------- */
 window.s6Go=function(k,first){const s=sv();if(!unlocked()||k>(s.ci||0)||!L6[k])return;try{initAudio()}catch(e){}const seq=[];
  if(first||(k===0&&!s.pro)){seq.push(...prologue());s.pro=1;saveNow()}
  seq.push(bossShot(k,S6STORY[k].intro,4400,'meet'));scPlay(seq,()=>s6Fight(k,'story'))};
 window.s6Start=function(k){if(!unlocked()){try{gmSfx('no')}catch(e){}return}const ci=sv().ci||0,kk=Math.min(9,k==null?ci:Math.min(k,ci));try{gmSfx('ok')}catch(e){}s6Go(kk,kk===0&&ci===0)};
 window.s6StoryEnd=function(k,won,rank,coins,html){const B=L6[k];
  if(!won){showOverlay('CHAPTER 6 · ZENITH',S6STORY[k].place+' · 바람에 휩쓸렸다…',html,[['다시 도전',()=>{$('overlay').hidden=true;s6Fight(k,'story')},true],['로비로',toLobby,false]]);return true}
  const s=sv(),o='PSABC';if(!s.best[k]||o.indexOf(rank)<o.indexOf(s.best[k]))s.best[k]=rank;s.ci=Math.max(s.ci||0,k+1);saveNow();
  const seq=[bossShot(k,S6STORY[k].outro,4400,'memory')];if(k===2)seq.push(...meetRaon());if(k===6)seq.push(...twist());if(k===9)seq.push(...ending());
  seq.push(cxResultCard({tag:'CHAPTER 6 · ZENITH  ·  바람길 '+(k+1)+' / 10',name:B.name,rank,coins,prog:'열린 바람길 '+Math.min(10,s.ci)+'/10',next:k<9?L6[k+1].name:null,col:B.c==='#ffffff'?'#e8f0ff':B.c,bg0:'#0c1430',bg1:B.dark}));
  scPlay(seq,()=>{if(k<9){s6Go(k+1,false);return}showOverlay('CHAPTER 6 · CLEAR','바람에 실린 노래',html+'<br><br><b style="color:#ffd08a">챕터 6을 모두 마쳤어요!</b><br>보스 러시의 CHAPTER 6 탭에서 다시 도전할 수 있어요.',[['로비로',toLobby,true]])});return true};
 /* 최종전 마지막 단계: 라온이 연이 되어 바람길을 열어 줌 (이야기 모드만) */
 {const _ds=drawScene;drawScene=function(now){const r=_ds.apply(this,arguments);try{if(G&&G.s6===9&&G.s6How==='story'&&(G.phase||0)>=2&&G.state!=='result'){const t=now/1000,x=AX+44+Math.sin(t*1.3)*20,y=AY+30+Math.sin(t*2.1)*6;
   for(let i=0;i<10;i++){const q=(t*.8+i/10)%1;RA(Math.round(x+q*AW*.8),Math.round(y+8+Math.sin(q*6+t*3)*6),10,1,'#ffe8c8',(1-q)*.45)}raon(ctx,x,y+16,1.2,t,{noMap:true});kite(ctx,x+12,y-4,1,'#ffd08a',Math.sin(t*2)*.4)}}catch(e){}return r}}
 /* 이야기 전투 중 부활 연출 없음 */
 try{const _tr=tryRevive;tryRevive=function(){if(G&&G.s6!=null)return false;return _tr.apply(this,arguments)}}catch(e){}

 /* ---------- 메뉴 ① 이야기 시계 (6번째 칸) ---------- */
 CS_CH.push({cv:'titleCv6',btn:'btnStory6',col:'#ffd08a',ang:150,num:'VI',tag:'CHAPTER 6 · ZENITH',title:'바람이 머무는 곳',desc:'바다에서 돌아온 소리들이 하늘에 쌓여 내려오지 않는다. 구름 위 거꾸로 매달린 시계탑, 하늘 도시 제니스로.',unit:'바람길'});
 {const c=document.createElement('canvas');c.id='titleCv6';c.width=480;c.height=190;c.style.display='none';document.body.appendChild(c);const b=document.createElement('button');b.id='btnStory6';b.hidden=true;b.textContent='▶ 하늘 도시로';b.onclick=()=>s6Start();document.body.appendChild(b)}
 {const base=csLocked;csLocked=function(i){return i===5?!unlocked():base.apply(this,arguments)}}
 {const base=csInfo;csInfo=function(i){return i===5?info():base.apply(this,arguments)}}
 {const base=s_csPage;s_csPage=function(i){const r=base.apply(this,arguments);try{if(i===5){const l=document.querySelector('#csPage .csLock');if(l)l.textContent='🔒 챕터 5의 마지막 수문을 해방하면 열려요.'}}catch(e){}return r}}
 {const base=menuTick;menuTick=function(now){base.apply(this,arguments);try{if(GM.scr==='story'){const cv=$('titleCv6');if(cv&&cv.parentNode&&cv.parentNode.id==='csWin'){const c=cv.getContext('2d'),T=now/1000;c.imageSmoothingEnabled=false;c.save();c.scale(1,190/270);sky(c,0,T);windLines(c,T,.4);city(c,240,70,1.1,T,false);ship(c,120+Math.sin(T*.5)*20,190,1.3,T);c.restore()}}}catch(e){}}}

 /* ---------- 메뉴 ② 보스 러시: CHAPTER 6 탭 (rushCh=5) ---------- */
 const RC=5;
 const rushLk=k=>{if(!unlocked())return true;const ci=sv().ci||0;return k==null?ci<10:k>=ci};
 const rushBest=k=>{const o='PSABC',r=saveData.s6rush||{};let b=null;for(const d of ['easy','normal','hard','extreme']){const v=r[k+'|'+d];if(v&&(b===null||o.indexOf(v)<o.indexOf(b)))b=v}return b};
 const bpmOf=k=>((typeof C3MUS!=='undefined'&&C3MUS[L6[k].art])||{}).bpm||120;
 function tabPaint(){document.querySelectorAll('#gmRush .gmTabs [data-ch]').forEach(b=>{if(+b.dataset.ch===RC){b.classList.toggle('on',GM.rushCh===RC);b.style.setProperty('--pc','#ffd08a');b.textContent=unlocked()?'🪁 CHAPTER 6':'🔒 CHAPTER 6'}})}
 {const _gb=gmBuild;gmBuild=function(){_gb.apply(this,arguments);try{const tabs=document.querySelector('#gmRush .gmTabs');if(tabs&&!tabs.querySelector('[data-ch="'+RC+'"]')){const b=document.createElement('button');b.className='gmPill';b.dataset.ch=String(RC);b.textContent='CHAPTER 6';b.onclick=()=>{GM.rushCh=RC;GM.rushSel=0;gmSfx('move');gmRushBuild()};tabs.appendChild(b)}tabPaint()}catch(e){}}}
 {const _gs=gmShow;gmShow=function(){const r=_gs.apply(this,arguments);try{tabPaint()}catch(e){}return r}}
 {const _rb=gmRushBuild;gmRushBuild=function(){if(GM.rushCh!==RC){const r=_rb.apply(this,arguments);tabPaint();return r}
  /* 다른 챕터 탭의 'on' 표시를 지우고 격자를 새로 */document.querySelectorAll('#gmRush .gmTabs [data-ch]').forEach(b=>b.classList.toggle('on',+b.dataset.ch===RC));tabPaint();
  const grid=$('gmGrid');grid.innerHTML='';for(let k=0;k<10;k++){const lk=rushLk(k),b0=L6[k],b=document.createElement('button');b.className='gmTile'+(k===GM.rushSel?' sel':'')+(lk?' lock':'');b.style.setProperty('--bc',b0.c);const cv=document.createElement('canvas');cv.width=96;cv.height=72;b.appendChild(cv);const rk=rushBest(k);
   b.insertAdjacentHTML('beforeend','<span class="no">'+String(k+1).padStart(2,'0')+'</span>'+(rk?'<span class="rk" style="color:'+(rk==='P'?'#fff6cf':rk==='S'?'#ffd166':'#cfe8d0')+'">'+(rk==='P'?'★':rk)+'</span>':'')+'<span class="nm">'+(lk?'???':b0.name)+'</span>');
   b.onmouseenter=()=>{if(GM.rushSel!==k){GM.rushSel=k;gmSfx('move');gmRushSelUpd()}};b.onclick=()=>{if(GM.rushSel===k)gmFight();else{GM.rushSel=k;gmSfx('move');gmRushSelUpd()}};grid.appendChild(b);
   try{const c=cv.getContext('2d');c.imageSmoothingEnabled=false;c.drawImage(s6SkyArena(k),120,60,240,180,0,0,96,72);if(!lk)c3ArtOn(c,b0.art,48,68,0,1.3,{still:true});else{c.fillStyle='rgba(5,8,10,.75)';c.fillRect(0,0,96,72)}}catch(e){}}
  gmRushInfo();try{if(typeof rfLabels==='function')rfLabels()}catch(e){}}}
 {const _ri=gmRushInfo;gmRushInfo=function(){if(GM.rushCh!==RC)return _ri.apply(this,arguments);const k=GM.rushSel,b=L6[k],lk=rushLk(k);
  $('gmPrevName').textContent=lk?'???':b.name;$('gmPrevName').style.color=b.c;$('gmPrevEpi').textContent=lk?(unlocked()?'스토리 챕터 6에서 이 바람길의 보스를 쓰러뜨리면 열려요':'챕터 5의 마지막 수문을 해방하면 열리는 하늘이에요'):'"'+S6STORY[k].title+'"  ·  '+b.en;
  $('gmPrevStat').innerHTML='<span>ZENITH '+String(k+1).padStart(2,'0')+' / 10</span><span>♩ '+bpmOf(k)+' BPM</span><span>HP '+(lk?'???':s6Hp(k).toLocaleString())+'</span><span>CHAPTER 6 · ZENITH</span>';
  const r=saveData.s6rush||{};$('gmPrevRanks').innerHTML=GM_DIFF.map(([kk,n,c])=>{const v=r[k+'|'+kk];return '<div style="'+(kk===diff?'box-shadow:0 0 0 2px '+c:'')+'">'+n+'<b style="color:'+(v?(v==='P'?'#fff6cf':c):'#3a4a50')+'">'+(v?(v==='P'?'★':v):'—')+'</b></div>'}).join('');
  $('gmFight').disabled=lk;try{rpDetail()}catch(e){}}}
 {const _gf=gmFight;gmFight=function(){if(GM.rushCh!==RC)return _gf.apply(this,arguments);const k=GM.rushSel;if(rushLk(k)){gmSfx('no');return}gmSfx('ok');s6Fight(k,'rush');$('bvTitle').textContent='BEAT BLADE · ZENITH 러시 '+(k+1)+'/10'}}
 {const f=rpKey;rpKey=function(){return GM.rushCh===RC?'z'+GM.rushSel:f.apply(this,arguments)}}
 {const f=rpDeck;rpDeck=function(){if(GM.rushCh!==RC)return f.apply(this,arguments);return (C3BOSS[L6[GM.rushSel].art]||{}).deck||[]}}
 {const f=rpMusId;rpMusId=function(){return GM.rushCh===RC?L6[GM.rushSel].art:f.apply(this,arguments)}}
 {const f=rpBpm;rpBpm=function(){return GM.rushCh===RC?bpmOf(GM.rushSel):f.apply(this,arguments)}}
 {const f=rpRunLk;rpRunLk=function(){return GM.rushCh===RC?rushLk(null):f.apply(this,arguments)}}
 {const f=rpLocked;rpLocked=function(){return GM.rushCh===RC?rushLk(GM.rushSel):f.apply(this,arguments)}}
 {const f=rqLk;rqLk=function(k){return GM.rushCh===RC?rushLk(k):f.apply(this,arguments)}}
 {const f=rfLocked;rfLocked=function(k){return GM.rushCh===RC?rushLk(k):f.apply(this,arguments)}}
 {const f=rqBoss;rqBoss=function(k){if(GM.rushCh!==RC)return f.apply(this,arguments);const b=L6[k];return {art:b.art,base:0,c:b.c,name:b.name,en:b.en,bpm:bpmOf(k)}}}
 {const f=rpDetail;rpDetail=function(){const r=f.apply(this,arguments);try{if(GM.rushCh===RC&&rpLocked()){const n=document.querySelector('#gmRushDet .rpNote');if(n)n.textContent='🔒 '+(unlocked()?'스토리 챕터 6에서 쓰러뜨린 보스만 공격 정보와 기록이 열려요.':'챕터 5의 마지막 수문을 해방하면 열리는 하늘이에요.')}}catch(e){}return r}}
 /* 10연전 */
 {const f=rpRunList;rpRunList=function(ch){return ch===RC?[...Array(10)].map((_,i)=>({s6:i})):f.apply(this,arguments)}}
 {const f=rpRunFight;rpRunFight=function(){const it=RUSH&&RUSH.list[RUSH.i];if(!it||it.s6==null)return f.apply(this,arguments);$('overlay').hidden=true;s6Fight(it.s6,'rush');if(RUSH.carry!=null)P.hp=Math.min(P.maxhp,Math.round(RUSH.carry+P.maxhp*.35));RUSH.fightT0=performance.now()}}
 function runEnd(won,k){const t=Math.round((performance.now()-(G.startReal||RUSH.fightT0))/1000),rank=won?rankOf(G.hits):'✕';
  RUSH.splits.push({name:L6[k].name,t,rank,score:G.score||0,hits:G.hits||0});RUSH.total+=t;RUSH.score+=G.score||0;RUSH.carry=P.hp;
  setTimeout(()=>{if(!RUSH)return;if(won&&RUSH.i<9){RUSH.i++;const nx=RUSH.list[RUSH.i];showOverlay('BOSS RUSH · '+RUSH.i+' / 10','다음 상대: '+L6[nx.s6].name,rpRunTable()+'<div style="margin-top:8px;color:#a6f5c6">체력 '+P.hp+' → 다음 판 시작 시 35% 회복</div>',[['계속 ▶',()=>rpRunFight(),true],['그만두기',()=>rpRunSummary(false),false]])}else rpRunSummary(won)},200)}
 /* 러시 전투 끝: 기록 + 10연전 이어가기 (가장 바깥에서 가로챔) */
 {const _fe=fightEnd;fightEnd=function(won){try{if(G&&G.s6!=null&&G.s6How==='rush'&&G.state!=='result'){const k=G.s6;try{if(typeof rpSaveRec==='function')rpSaveRec('z'+k,won)}catch(e){}
   if(typeof RUSH!=='undefined'&&RUSH&&RUSH.ch===RC){G.state='result';G.won=won;stopMusic();try{c3SwapOut()}catch(e){}G.s6=null;G.s6w=null;
    if(won){saveData.s6rush=saveData.s6rush||{};const rank=rankOf(G.hits),kk=k+'|'+diff,o='PSABC';if(!saveData.s6rush[kk]||o.indexOf(rank)<o.indexOf(saveData.s6rush[kk]))saveData.s6rush[kk]=rank}saveNow();runEnd(won,k);return}}}catch(e){console.error('v45 ch6 rush',e)}return _fe.apply(this,arguments)}}
 /* 러시 결과 창의 '다음 보스'는 잠긴 보스로 넘어가지 않게 */
 {const _so=showOverlay;showOverlay=function(tag,title,text,btns){try{if(typeof tag==='string'&&tag.indexOf('ZENITH · ')===0&&Array.isArray(btns)){const m=/(\d\d)$/.exec(tag),k=m?+m[1]-1:-1;if(k>=0&&rushLk(k+1))btns=btns.filter(x=>x[0]!=='다음 보스 →')}}catch(e){}return _so.call(this,tag,title,text,btns)}}
}catch(e){console.error('v45 ch6 story',e)}})();
