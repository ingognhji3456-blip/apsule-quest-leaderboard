/* ================= 챕터 5 「종소리 없는 바다」 스토리 연출 v32 =================
   프롤로그 → (보스마다) 잠수 · 만남 · 전투 · 쓰러짐 · 기억 → 마지막 세 번의 귀환종 엔딩. 4장 컷신 엔진(scPlay) 사용 */
const C5ST={end:null};
const c5X=(k)=>S5[k];
function c5Snow(c,T,n,col,a){c.fillStyle=col||'#cfefff';for(let i=0;i<n;i++){const q=(T*.03+i*.618)%1,x=(i*73.7)%SCW+Math.sin(T*.5+i)*4,y=q*SCH;c.globalAlpha=(a||.35)*Math.sin(q*Math.PI);c.fillRect(Math.round(x),Math.round(y),1,1)}c.globalAlpha=1}
function c5Rays(c,T,col,a){c.save();c.globalCompositeOperation='lighter';for(let i=0;i<5;i++){const x=40+i*100+Math.sin(T*.3+i)*20;c.globalAlpha=(a||.05)*(.6+.4*Math.sin(T*.7+i*1.7));c.fillStyle=col||'#a8f0ff';c.beginPath();c.moveTo(x,0);c.lineTo(x+24,0);c.lineTo(x+90,SCH);c.lineTo(x+30,SCH);c.fill()}c.restore()}
function c5Bubbles(c,T,x0,x1,n,col){c.strokeStyle=col||'#cfefff';for(let i=0;i<n;i++){const q=(T*.25+i*.37)%1,x=x0+((i*53)%Math.max(1,x1-x0))+Math.sin(T*2+i)*3,y=SCH-q*SCH,r=1+(i%3);c.globalAlpha=.5*(1-q);c.beginPath();c.arc(x,y,r,0,TAU);c.stroke()}c.globalAlpha=1}
function c5Fish(c,T,n,y0,col){c.fillStyle=col||'#0a1a26';for(let i=0;i<n;i++){const q=((T*(.03+i*.01))+i/n)%1,x=-40+q*(SCW+80),y=y0+Math.sin(T+i*2)*10+i*14,d=i%2?1:-1,xx=d>0?x:SCW-x;c.globalAlpha=.6;c.beginPath();c.ellipse(xx,y,8,3,0,0,TAU);c.fill();c.beginPath();c.moveTo(xx-d*8,y);c.lineTo(xx-d*13,y-4);c.lineTo(xx-d*13,y+4);c.fill()}c.globalAlpha=1}
function c5Card(c,T,top,mid,sub,col){const a=scCl(T*2)*scCl((2.8-T)*2+1);c.globalAlpha=.55*a;c.fillStyle='#000';c.fillRect(0,SCH/2-34,SCW,64);c.globalAlpha=1;scTxt(c,top,SCW/2,SCH/2-16,9,col,a,'center',800);scTxt(c,mid,SCW/2,SCH/2+6,22,'#ffffff',a);scTxt(c,sub,SCW/2,SCH/2+22,9,'#cfe8e4',a,'center',600)}
function c5Depth(c,T,from,to,k){const d=Math.round(lerp(from,to,scE(scCl(T/2.2))));c.fillStyle='#04121c';c.globalAlpha=.8;c.fillRect(SCW-70,40,54,150);c.globalAlpha=1;c.strokeStyle='#9de8dc';c.strokeRect(SCW-70.5,40.5,54,150);for(let i=0;i<10;i++){const y=48+i*14;c.fillStyle=i<=k?'#9de8dc':'#2a4a54';c.fillRect(SCW-64,y,8,8)}scTxt(c,'DEPTH',SCW-43,54,7,'#9de8dc',1);scTxt(c,d+'m',SCW-43,182,10,'#ffffff',1)}
/* 관리자(기록 속 인물) 실루엣 */function c5Keeper(c,x,y,s,T,lamp){c.fillStyle='#2a1e14';c.beginPath();c.moveTo(x-5*s,y);c.lineTo(x+5*s,y);c.lineTo(x+3*s,y-14*s);c.lineTo(x-3*s,y-14*s);c.fill();c.beginPath();c.arc(x,y-17*s,3.4*s,0,TAU);c.fill();c.fillRect(x-4*s,y-21*s,8*s,2*s);if(lamp){c.strokeStyle='#2a1e14';c.lineWidth=s;c.beginPath();c.moveTo(x+4*s,y-10*s);c.lineTo(x+7*s,y-8*s);c.stroke();scGlow(c,x+7*s,y-6*s,10*s,'#ffd06a',.6+.2*Math.sin(T*6));c.fillStyle='#fff0b0';c.fillRect(x+6*s,y-7*s,2*s,2*s)}}
/* 장소마다 한 장면 (배경은 전투 배경과 같은 s5Backdrop + 앞쪽 장식) */
function c5Loc(c,k,T){s5Backdrop(c,k,T,SCW,SCH);c5Rays(c,T,S5[k].c,.045);c5Fish(c,T,3,70,'#06121c');c5Snow(c,T,40);
 const col=S5[k].c;c.save();c.globalAlpha=.9;
 if(k===0){/* 방파제 + 꺼져 가는 부표 */c.fillStyle='#0a1620';c.fillRect(0,214,SCW,56);for(let i=0;i<8;i++){c.fillStyle='#132a36';c.fillRect(i*64,200+(i%2)*6,50,20)}const bl=Math.floor(T*1.3)%2;c.fillStyle=bl?'#ffd06a':'#5a3a10';c.fillRect(60,186,4,4);scGlow(c,62,188,14,'#ffd06a',bl?.5:.1)}
 if(k===1){/* 가라앉은 해도 조각들 */for(let i=0;i<7;i++){const x=30+i*66,y=200+Math.sin(T+i)*4;c.fillStyle='#d8c8a0';c.globalAlpha=.25;c.fillRect(x,y,34,22);c.strokeStyle='#d4403c';c.globalAlpha=.4;c.beginPath();c.moveTo(x+4,y+18);c.lineTo(x+30,y+4);c.stroke()}}
 if(k===2){/* 거대한 침수 관문 */c.globalAlpha=.5;c.fillStyle='#10202a';c.fillRect(150,60,180,160);c.fillStyle='#1c3440';for(let i=0;i<6;i++)c.fillRect(160+i*28,70,18,150);c.fillStyle='#8a4a2a';c.fillRect(150,130,180,6)}
 if(k===3){/* 예배당 창과 오르간 */c.globalAlpha=.35;for(let i=0;i<4;i++){c.fillStyle='#6a4a8a';c.beginPath();c.moveTo(60+i*110,190);c.lineTo(60+i*110,110);c.arc(80+i*110,110,20,Math.PI,0);c.lineTo(100+i*110,190);c.fill()}}
 if(k===4){/* 난파선 묘지 */c.globalAlpha=.55;c.fillStyle='#0c1a24';for(let i=0;i<3;i++){c.save();c.translate(70+i*160,215);c.rotate(-.2+i*.18);c.fillRect(-50,-18,100,22);c.fillRect(-10,-50,6,34);c.restore()}}
 if(k===5){/* 끊긴 송전 케이블 */c.globalAlpha=.6;c.strokeStyle='#c8884a';c.lineWidth=2;for(let i=0;i<4;i++){c.beginPath();c.moveTo(0,60+i*40);c.quadraticCurveTo(200,90+i*40+Math.sin(T+i)*10,300+i*10,70+i*40);c.stroke();if(Math.floor(T*4+i)%3===0){c.fillStyle='#c8ff8a';c.fillRect(300+i*10-2,70+i*40-2,4,4)}}}
 if(k===6){/* 무음 재판정: 늘어선 빈 의자와 종 */c.globalAlpha=.45;for(let i=0;i<9;i++){c.fillStyle='#2a1830';c.fillRect(20+i*52,190,30,30);c.fillRect(20+i*52,176,4,16)}c.fillStyle='#a8783a';for(let i=0;i<8;i++){c.beginPath();c.arc(40+i*58,40+Math.sin(T+i)*3,5+i*.6,Math.PI,0);c.fill()}}
 if(k===7){/* 뒤집힌 해류: 거꾸로 떨어지는 모래 */c.globalAlpha=.5;c.fillStyle='#e8c890';for(let i=0;i<60;i++){const q=(T*.2+i*.137)%1;c.fillRect((i*41)%SCW,SCH-q*SCH,1,2)}}
 if(k===8){/* 기록 서가 */c.globalAlpha=.45;for(let i=0;i<5;i++){c.fillStyle='#2e1a12';c.fillRect(10+i*96,70,70,150);c.fillStyle='#8a5a34';for(let r=0;r<5;r++)c.fillRect(10+i*96,90+r*28,70,3)}}
 if(k===9){/* 침묵 수문: 거대한 원형 문 */c.globalAlpha=.4;c.strokeStyle=col;c.lineWidth=6;c.beginPath();c.arc(SCW/2,120,95,0,TAU);c.stroke();c.lineWidth=2;for(let i=0;i<8;i++){const a=i*Math.PI/4+T*.05;c.beginPath();c.moveTo(SCW/2+Math.cos(a)*60,120+Math.sin(a)*60);c.lineTo(SCW/2+Math.cos(a)*95,120+Math.sin(a)*95);c.stroke()}}
 c.restore();c5Bubbles(c,T,0,SCW,14)}
/* ---------- 프롤로그 ---------- */
function c5Prologue(){return [
 {d:600,la:700,lines:[['','별들이 제자리로 돌아온 다음 날 아침, 시계골.'],['하루','…어? 종이 흔들리는데 소리가 안 나.'],['똑딱','종만이 아니야. 새소리도, 바람 소리도… 아무것도 안 들려.']],draw(c,T){scSky(c,T,'#2a4a6a','#e8b890',3,.2);scTown(c,T,1,208);const sw=Math.sin(T*3)*.35,bx=330,by=96;c.fillStyle='#3a2a20';c.fillRect(bx-14,by,28,112);c.save();c.translate(bx,by+12);c.rotate(sw);c.fillStyle='#b8883a';c.beginPath();c.moveTo(-8,0);c.lineTo(8,0);c.lineTo(12,18);c.lineTo(-12,18);c.fill();c.restore();scBubble(c,bx+30,by+10,'…',  '#9de8dc',scCl(T));scHero(c,150,236,2,T)}},
 {d:700,la:600,lines:[['똑딱','봐! 소리들이… 바다 쪽으로 흘러가고 있어!'],['','마을의 모든 소리가 빛의 실처럼 풀려, 밤바다 아래로 가라앉고 있었다.']],draw(c,T){const g=c.createLinearGradient(0,0,0,SCH);g.addColorStop(0,'#10203a');g.addColorStop(.55,'#1c3a5a');g.addColorStop(.56,'#0a2238');g.addColorStop(1,'#04121c');c.fillStyle=g;c.fillRect(0,0,SCW,SCH);scTown(c,T,.4,150);
  for(let i=0;i<26;i++){const q=(T*.18+i/26)%1,x=lerp(80+(i*37)%200,380,q),y=lerp(120,250,q*q)+Math.sin(q*9+i)*6;c.globalAlpha=Math.sin(q*Math.PI);c.fillStyle=['#9de8dc','#ffd06a','#ffb8e6'][i%3];c.fillRect(Math.round(x),Math.round(y),2,2);c.fillRect(Math.round(x)+2,Math.round(y)-5,1,5)}c.globalAlpha=1;for(let i=0;i<6;i++){c.fillStyle='#8ac0d0';c.globalAlpha=.25;c.fillRect(0,160+i*18+Math.sin(T+i)*2,SCW,1)}c.globalAlpha=1;scHero(c,120,150,1.5,T)}},
 {d:900,la:800,lines:[['','썰물이 빠진 자리에, 삼백 년 동안 잠겨 있던 돌계단이 드러났다.'],['하루','해저 방재청… 옛날에 마을을 홍수에서 지키던 곳이랬지.'],['똑딱','소리를 되찾으러 가자. 이번엔 바다 밑이야.']],draw(c,T){const d=scE(scCl((T-.5)/4));const g=c.createLinearGradient(0,0,0,SCH);g.addColorStop(0,'#0c3a50');g.addColorStop(1,'#020a12');c.fillStyle=g;c.fillRect(0,0,SCW,SCH);c5Rays(c,T,'#a8f0ff',.08);c5Snow(c,T,60);
  for(let i=0;i<9;i++){c.fillStyle='#1a3a48';c.fillRect(60+i*22,120+i*16-d*120,40,8)}const bx=SCW/2+40,by=60+d*110;c.fillStyle='#0a1a24';c.beginPath();c.arc(bx,by,26,Math.PI,0);c.lineTo(bx+26,by+20);c.lineTo(bx-26,by+20);c.fill();c.fillStyle='#8ac8d8';c.globalAlpha=.35;c.beginPath();c.arc(bx,by,20,Math.PI,0);c.lineTo(bx+20,by+14);c.lineTo(bx-20,by+14);c.fill();c.globalAlpha=1;scHero(c,bx-8,by+12,1.3,T,true);c.strokeStyle='#6a7078';c.beginPath();c.moveTo(bx,0);c.lineTo(bx,by-26);c.stroke();scGlow(c,bx,by,40,'#9de8dc',.2);c5Bubbles(c,T,bx-30,bx+30,10);c5Depth(c,T,0,40,-1)}}]}
/* ---------- 보스 전 ---------- */
const C5TALK=[
 [['하루','바다 밑인데… 등대가 켜져 있어.'],['똑딱','불빛 신호가 반복되고 있어. 「항로 폐쇄. 귀환 신호 없음」…'],['등대 껍질게','접근 선박 확인. 돌아가라. 이 바다에 돌아올 곳은 없다.']],
 [['하루','종이 지도가 헤엄치고 있어!'],['똑딱','찢긴 해도를 꿰매 붙였어. 모든 항로가 한 곳에서 끊겨 있어.'],['접힌 항로','돌아오는 길은 접어 두었다. 아무도 이 길로 오지 못하게.']],
 [['닻을 짊어진 기사','멈춰라. 마지막 피난민이 나갈 때까지 이 문은 열리지 않는다.'],['하루','마지막 피난민은… 삼백 년 전에 떠났어.'],['닻을 짊어진 기사','그렇다면 더더욱. 돌아올 자를 위해 문을 지킨다.']],
 [['똑딱','저 노래… 들어 봐. 마을 사람들 목소리야.'],['진주 성가대','울음도, 비명도 깨지지 않도록. 진주 속에서 영원히 노래하라.'],['하루','그건 노래가 아니라 감옥이야!']],
 [['유리 잠항선','잔류 인원 수색 중. 마지막 승객의 탑승을 기다립니다.'],['똑딱','빈 객실마다 이름표가 붙어 있어…'],['하루','이 배는 아직도 구조하러 가는 중이구나.']],
 [['하루','으, 저 불빛… 바늘이 달려 있어.'],['똑딱','끊어진 신호선을 자기 몸에 꿰매서 이어 붙였어. 저건 아귀가 아니라 통신선이야.'],['전류의 봉합사','수신 대기. 수신 대기. …반대편 응답 없음. 계속 꿰맨다.']],
 [['여덟 종의 집행관','소리는 파도를 부른다. 파도는 마을을 삼킨다. 고로 침묵이 판결이다.'],['하루','종소리 때문에 홍수가 난 게 아니야!'],['여덟 종의 집행관','증거를 대라. 여덟 종이 너를 심판하리라.']],
 [['똑딱','저 배 속의 모래… 홍수가 일어난 바로 그 순간이야.'],['하루','삼백 년 동안 같은 순간을 삼키고 있었어?'],['모래시계 고래','…흘려보내면, 잊힌다. 잊히면, 없던 일이 된다.']],
 [['산호 기록관','여기는 기록의 끝. 관리자는 돌아오지 않았다. 약속만이 남았다.'],['똑딱','그 약속 때문에 아직도 모든 소리를 가두고 있는 거야?'],['산호 기록관','기록은 지워지지 않는다. 너희의 발자국까지 전부 받아 적겠다.']],
 [['무음의 심장','관리자의… 귀환을… 기다린다.'],['하루','관리자는 돌아오지 못해. 하지만 네가 지킨 마을은 살아 있어.'],['무음의 심장','증명하라. 세 번의 종으로.']]];
function c5Dive(k){const b=c5X(k);return {d:2900,noSkip:false,draw(c,T){c5Loc(c,k,T);const g=c.createLinearGradient(0,0,0,SCH);g.addColorStop(0,'rgba(2,8,14,0)');g.addColorStop(1,'rgba(2,8,14,.7)');c.fillStyle=g;c.fillRect(0,0,SCW,SCH);
  const bx=150,by=40+scE(scCl(T/2.4))*120;c.fillStyle='#0a1a24';c.beginPath();c.arc(bx,by,18,Math.PI,0);c.lineTo(bx+18,by+14);c.lineTo(bx-18,by+14);c.fill();c.fillStyle='#8ac8d8';c.globalAlpha=.35;c.beginPath();c.arc(bx,by,14,Math.PI,0);c.lineTo(bx+14,by+10);c.lineTo(bx-14,by+10);c.fill();c.globalAlpha=1;c.strokeStyle='#6a7078';c.beginPath();c.moveTo(bx,0);c.lineTo(bx,by-18);c.stroke();scGlow(c,bx,by,26,'#9de8dc',.2);
  c5Depth(c,T,k*120+40,(k+1)*120+40,k);c5Card(c,T,'수문 '+(k+1)+' / 10  ·  '+b.place,b.name,b.title,b.c)}}}
function c5Meet(k){const b=c5X(k);return {d:700,la:1300,lines:C5TALK[k],draw(c,T,dt,now){c5Loc(c,k,T+4);const q=scE(scCl(T/1.4)),by=236+(1-q)*30;scGlow(c,320,by-60,70,b.c,.25*q);c.globalAlpha=q;scBoss(c,b.art,320,by,5,{pulse:.1,eye:T>1.2&&T<2.2?1:0});c.globalAlpha=1;scHero(c,-20+scE(scCl(T/1.6))*140,238,2,T);
  if(T<1.4){c.fillStyle='#000';c.globalAlpha=(1-T/1.4)*.6;c.fillRect(0,0,SCW,SCH);c.globalAlpha=1}}}}
/* ---------- 보스 후: 쓰러짐 · 되찾은 소리 · 기억 ---------- */
const C5SOUND=['등대의 뱃고동','길 잃은 뱃노래','관문의 망치 소리','아이들의 웃음','구조선의 기적 소리','통신탑의 신호음','여덟 종의 화음','파도의 숨소리','기록관의 펜 소리','귀환종'];
function c5Fall(k){const b=c5X(k);return {d:4200,draw(c,T,dt,now){c5Loc(c,k,T+8);const shk=T<1.6?(Math.random()-.5)*4*(1-T/1.6):0,fade=scCl((T-1.2)/1.6);c.save();c.translate(shk,0);c.globalAlpha=1-fade*.9;scBoss(c,b.art,320,236,5,{pulse:.4,flash:T<1.2&&Math.floor(T*10)%2,dorm:T>1.6});c.restore();c.globalAlpha=1;
  for(let i=0;i<40;i++){const q=scCl(T-1.2-i*.02),x=320+Math.sin(i*2.3)*50*q+Math.sin(T*3+i)*4,y=200-q*140-(i%5)*6;if(q<=0||q>=1)continue;c.globalAlpha=1-q;c.fillStyle=i%3?b.c:'#ffffff';c.fillRect(Math.round(x),Math.round(y),2,2)}c.globalAlpha=1;
  /* 되찾은 소리가 떠오름 */const s=scCl((T-1.6)/1.2),ox=lerp(320,140,scE(scCl((T-2.6)/1.2))),oy=lerp(200,120-Math.sin(s*Math.PI)*20,s);if(T>1.6){scGlow(c,ox,oy,24,b.c,.6);c.fillStyle='#ffffff';c.beginPath();c.arc(ox,oy,4+Math.sin(T*8),0,TAU);c.fill();c.fillStyle=b.c;c.fillRect(ox+4,oy-12,2,12);c.fillRect(ox+4,oy-12,6,2)}
  scHero(c,120,238,2,T);if(T>2.8)scTxt(c,'되찾은 소리 · '+C5SOUND[k]+'   ('+(k+1)+' / 10)',SCW/2,48,11,'#fff4c8',scCl((T-2.8)*2))}}}
function c5MemArt(c,k,T){/* 세피아 기억: 삼백 년 전 그날 */const g=c.createLinearGradient(0,0,0,SCH);g.addColorStop(0,'#3a2a1a');g.addColorStop(1,'#140c06');c.fillStyle=g;c.fillRect(0,0,SCW,SCH);for(let i=0;i<3;i++){c.fillStyle='#5a4028';c.globalAlpha=.4;c.beginPath();c.moveTo(0,190+i*14+Math.sin(T*1.4+i)*6);for(let x=0;x<=SCW;x+=20)c.lineTo(x,190+i*14+Math.sin(T*1.4+i+x*.03)*6);c.lineTo(SCW,SCH);c.lineTo(0,SCH);c.fill()}c.globalAlpha=1;
 c.fillStyle='#24180e';if(k===0){c.fillRect(360,70,30,130);c.fillRect(350,60,50,12);scGlow(c,375,64,30,'#ffd06a',.5);for(let i=0;i<3;i++)c.fillRect(60+i*70,200+Math.sin(T+i)*3,40,8)}
 else if(k===1){for(let i=0;i<4;i++){c.fillRect(80+i*80,210,40,6);c.fillRect(96+i*80,190,4,20)}c.strokeStyle='#8a4a2a';c.beginPath();c.moveTo(40,120);c.lineTo(440,90);c.stroke()}
 else if(k===2){c.fillRect(200,70,90,140);c.fillStyle='#3a2a18';for(let i=0;i<4;i++)c.fillRect(206+i*22,76,14,134)}
 else if(k===3){c.fillRect(170,90,140,110);c.beginPath();c.moveTo(170,90);c.lineTo(240,40);c.lineTo(310,90);c.fill();for(let i=0;i<5;i++){c.fillStyle='#3a2a18';c.fillRect(190+i*24,170,10,26)}}
 else if(k===4){c.save();c.translate(260,190);c.fillRect(-80,-20,160,26);c.fillRect(-6,-60,8,40);c.restore()}
 else if(k===5){c.strokeStyle='#24180e';c.lineWidth=3;for(let i=0;i<3;i++){c.beginPath();c.moveTo(0,80+i*30);c.lineTo(SCW,70+i*30);c.stroke()}c.lineWidth=1}
 else if(k===6){for(let i=0;i<8;i++){c.beginPath();c.arc(60+i*52,70,6+i,Math.PI,0);c.fill()}}
 else if(k===7){c.beginPath();c.moveTo(0,200);for(let x=0;x<=SCW;x+=10)c.lineTo(x,120-Math.sin(x*.02+T)*40-(x>200&&x<300?60:0));c.lineTo(SCW,SCH);c.lineTo(0,SCH);c.globalAlpha=.6;c.fill();c.globalAlpha=1}
 else if(k===8){for(let i=0;i<5;i++)c.fillRect(40+i*90,70,60,130)}
 else{c.strokeStyle='#24180e';c.lineWidth=8;c.beginPath();c.arc(SCW/2,120,80,0,TAU);c.stroke();c.lineWidth=1}
 c5Keeper(c,k===0?375:k===7?250:230,200,2,T,true);scSepia(c,.25);for(let i=0;i<30;i++){c.fillStyle='#ffffff';c.globalAlpha=.05;c.fillRect((i*97+Math.floor(T*20)*31)%SCW,(i*53)%SCH,1,3)}c.globalAlpha=1;scTxt(c,'— 삼백 년 전의 기록 —',SCW/2,34,10,'#e8d0a0',scCl(T))}
function c5Mem(k){const b=c5X(k);return {d:800,la:900,lines:k===9?[['','기억 속에서, 관리자는 마지막까지 수문을 붙잡고 있었다.'],['관리자의 기록','소리를 잠시만 맡아 줘. 반드시 돌아와서… 종을 세 번 울릴게.'],['하루','그 약속, 우리가 대신 지킬게.']]:b.outro,draw(c,T){c5MemArt(c,k,T)}}}
/* ---------- 엔딩: 세 번의 귀환종 ---------- */
function c5Ending(){return [
 {d:1200,la:900,lines:[['산호 기록관의 마지막 기록','「종은 재앙이 아니라 귀환의 신호다. 내가 돌아오지 못하면, 누군가 세 번 울려다오.」'],['하루','관리자는 약속을 지키려고… 끝까지 수문을 붙잡고 있었구나.'],['똑딱','이제 우리가 대신 울리자. 세 번.']],draw(c,T){c5Loc(c,9,T);scBoss(c,S5[9].art,SCW/2,236,5,{dorm:true});scHero(c,120,238,2,T)}},
 {d:5200,draw(c,T){c5Loc(c,9,T);const rings=[.6,1.9,3.2];let hit=0;for(let i=0;i<3;i++){const e=T-rings[i];if(e>0){hit=i+1;for(let r=0;r<3;r++){const q=scCl((e-r*.15)/1.6);if(q<=0||q>=1)continue;c.strokeStyle=['#ffd06a','#a8ffe9','#ffb8e6'][i];c.globalAlpha=1-q;c.lineWidth=3;c.beginPath();c.arc(SCW/2,150,20+q*260,0,TAU);c.stroke()}}}c.globalAlpha=1;c.lineWidth=1;
  const sw=Math.sin(T*6)*.4*(T<4?1:0);c.save();c.translate(SCW/2,80);c.rotate(sw);c.fillStyle='#050b12';c.beginPath();c.moveTo(-22,0);c.lineTo(22,0);c.lineTo(34,56);c.lineTo(-34,56);c.fill();c.fillStyle='#c8904a';c.beginPath();c.moveTo(-18,4);c.lineTo(18,4);c.lineTo(30,54);c.lineTo(-30,54);c.fill();c.fillStyle='#f0c080';c.fillRect(-28,50,56,4);c.restore();scGlow(c,SCW/2,110,60,'#fff4c8',.3+hit*.12);
  scHero(c,150,238,2,T);if(hit)scTxt(c,['첫 번째 종 · 돌아간 사람들에게','두 번째 종 · 남아서 지킨 너에게','세 번째 종 · 함께 맞을 내일에게'][hit-1],SCW/2,238,11,'#fff4c8',1);if(T-rings[hit-1||0]<.2)SC4.shake=Math.max(SC4.shake,.5)},on(){try{for(const [i,f] of [[0,392],[1,523],[2,784]])setTimeout(()=>{try{sfx(f,1.6,'triangle',.08,f*.5)}catch(e){}},[600,1900,3200][i])}catch(e){}}},
 {d:900,la:900,lines:[['무음의 심장','귀환 신호… 확인. 무음 격리를… 해제한다.'],['','가둬 두었던 소리들이 한꺼번에 터지지 않고, 종을 따라 차례로 수면 위로 떠올랐다.']],draw(c,T){c5Loc(c,9,T);for(let i=0;i<60;i++){const q=(T*.2+i/60)%1,x=(i*53)%SCW+Math.sin(T+i)*6,y=SCH-q*SCH;c.globalAlpha=Math.sin(q*Math.PI);c.fillStyle=['#ffd06a','#a8ffe9','#ffb8e6','#ffffff'][i%4];c.fillRect(Math.round(x),Math.round(y),2,2);c.fillRect(Math.round(x)+2,Math.round(y)-4,1,4)}c.globalAlpha=1;scBoss(c,S5[9].art,SCW/2,236,5,{dorm:true,pulse:.5});scHero(c,120,238,2,T)}},
 {d:1500,la:900,lines:[['똑딱','들려? 종소리야. 마을 사람들이 웃고 있어.'],['하루','…바다도 이제 조용히 잠들 수 있겠다.'],['','이번 침묵은 기다림이 아니라, 안식이었다.']],draw(c,T){scSky(c,T,'#e8a870','#fff0c8',5,.1);scTown(c,T,1,200);for(let i=0;i<3;i++){const x=120+i*120,sw=Math.sin(T*3+i)*.4;c.save();c.translate(x,70);c.rotate(sw);c.fillStyle='#8a5a28';c.beginPath();c.moveTo(-6,0);c.lineTo(6,0);c.lineTo(9,14);c.lineTo(-9,14);c.fill();c.restore();for(let r=1;r<3;r++){const q=(T*.8+r*.5+i*.3)%1;c.strokeStyle='#fff4c8';c.globalAlpha=1-q;c.beginPath();c.arc(x,78,6+q*30,0,TAU);c.stroke()}}c.globalAlpha=1;scHero(c,240,236,2,T);if(T>1)scTxt(c,'CHAPTER 5  ·  종소리가 돌아온 바다',SCW/2,40,13,'#fff4c8',scCl(T-1))}}]}
function c5After(k){const seq=[c5Fall(k),c5Mem(k)];if(k===9)seq.push(...c5Ending());return seq}
/* ---------- 연결 ---------- */
s5Go=function(k,first){if(!s5Unlocked()||k>s5Save().ci||!S5[k])return;initAudio();s5Close();const sv=s5Save(),seq=[];if(k===0&&(first||!sv.seen5)){seq.push(...c5Prologue());sv.seen5=1;try{saveNow()}catch(e){}}seq.push(c5Dive(k),c5Meet(k));scPlay(seq,()=>s5Fight(k,false))};
{const _e=s5End;s5End=function(won){const story=G&&G.state!=='result'&&won&&!G.s5Practice&&!G.s5Rush;if(story)C5ST.end=G.s5;try{return _e.apply(this,arguments)}finally{C5ST.end=null}}}
{const _sp=scPlay;scPlay=function(seq,done){if(C5ST.end!=null){const k=C5ST.end;C5ST.end=null;return _sp.call(this,c5After(k),done)}return _sp.apply(this,arguments)}}
/* 안전 원: 챕터 5는 물방울 모양 */{const _sd=npSafeDraw;npSafeDraw=function(o,now){if(!(G&&(G.s5!=null||G._s5hold!=null)&&o.safe))return _sd.apply(this,arguments);const t=now/1000;for(const [sx,sy,sr] of o.safe){pcirc(sx,sy,sr,'#0a2a3a',.85);pcirc(sx,sy,sr-2,'#1a5a7a',.7);cRing(sx,sy,sr,'#bff4ff',1,2);cRing(sx,sy,sr-4+Math.sin(t*4)*1.5,'#8ae8ff',.6,1);pcirc(sx-sr*.35,sy-sr*.35,sr*.2,'#ffffff',.5)}}}

/* ================= 챕터 5 ABYSS 보스 러시 — 러시 화면의 CHAPTER 5 탭 · 10연전 · 기록 ================= */
function s5RushLocked(k){if(!s5Unlocked())return true;const ci=(s5Save().ci)||0;return k==null?ci<10:k>=ci}
function s5RushBest(k){const o='PSABC',r=saveData.s5rush||{};let b=null;for(const d of ['easy','normal','hard','extreme']){const v=r[k+'|'+d];if(v&&(b===null||o.indexOf(v)<o.indexOf(b)))b=v}return b}
function s5RushFight(k){if(s5RushLocked(k))return;s5Fight(k,false,true);G.s5RushK=k;$('bvTitle').textContent='BEAT BLADE · ABYSS 러시 '+(k+1)+'/10'}
/* 탭 */function s5TabPaint(){document.querySelectorAll('#gmRush .gmTabs [data-ch]').forEach(b=>{const ch=+b.dataset.ch;b.classList.toggle('on',ch===GM.rushCh);if(ch===4){b.style.setProperty('--pc','#9de8dc');b.textContent=s5Unlocked()?'🌊 CHAPTER 5':'🔒 CHAPTER 5'}})}
{const _gb=gmBuild;gmBuild=function(){_gb.apply(this,arguments);try{const old=$('s5RushTab');if(old)old.remove();const tabs=document.querySelector('#gmRush .gmTabs');if(tabs&&!tabs.querySelector('[data-ch="4"]')){const b=document.createElement('button');b.className='gmPill';b.dataset.ch='4';b.textContent='CHAPTER 5';b.onclick=()=>{GM.rushCh=4;GM.rushSel=0;gmSfx('move');gmRushBuild()};tabs.appendChild(b)}s5TabPaint()}catch(e){}}}
{const _gs=gmShow;gmShow=function(){const r=_gs.apply(this,arguments);try{const old=$('s5RushTab');if(old)old.remove();s5TabPaint()}catch(e){}return r}}
/* 격자 · 정보 · 전투 시작 */
{const _rb=gmRushBuild;gmRushBuild=function(){if(GM.rushCh!==4){const r=_rb.apply(this,arguments);s5TabPaint();return r}
 const grid=$('gmGrid');grid.innerHTML='';s5TabPaint();for(let k=0;k<10;k++){const lk=s5RushLocked(k),b0=S5[k],b=document.createElement('button');b.className='gmTile'+(k===GM.rushSel?' sel':'')+(lk?' lock':'');b.style.setProperty('--bc',b0.c);const cv=document.createElement('canvas');cv.width=96;cv.height=72;b.appendChild(cv);const rk=s5RushBest(k);
  b.insertAdjacentHTML('beforeend','<span class="no">'+String(k+1).padStart(2,'0')+'</span>'+(rk?'<span class="rk" style="color:'+(rk==='P'?'#fff6cf':rk==='S'?'#ffd166':'#cfe8d0')+'">'+(rk==='P'?'★':rk)+'</span>':'')+'<span class="nm">'+(lk?'???':b0.name)+'</span>');
  b.onmouseenter=()=>{if(GM.rushSel!==k){GM.rushSel=k;gmSfx('move');gmRushSelUpd()}};b.onclick=()=>{if(GM.rushSel===k)gmFight();else{GM.rushSel=k;gmSfx('move');gmRushSelUpd()}};grid.appendChild(b)}
 gmRushInfo()}}
{const _ri=gmRushInfo;gmRushInfo=function(){if(GM.rushCh!==4)return _ri.apply(this,arguments);const k=GM.rushSel,b=S5[k],lk=s5RushLocked(k);
 $('gmPrevName').textContent=lk?'???':b.name;$('gmPrevName').style.color=b.c;$('gmPrevEpi').textContent=lk?(s5Unlocked()?'스토리 챕터 5에서 이 수문의 수호자를 쓰러뜨리면 열려요':'챕터 4의 마지막 별을 쓰러뜨리면 열리는 바다예요'):'"'+b.title+'"  ·  '+b.en;
 $('gmPrevStat').innerHTML='<span>ABYSS '+String(k+1).padStart(2,'0')+' / 10</span><span>♩ '+Math.round(b.bpm||120)+' BPM</span><span>HP '+(lk?'???':Math.round((7600+k*820)*(DF_HP[diff]||1)).toLocaleString())+'</span><span>CHAPTER 5 · ABYSS</span>';
 const r=saveData.s5rush||{};$('gmPrevRanks').innerHTML=GM_DIFF.map(([kk,n,c])=>{const v=r[k+'|'+kk];return '<div style="'+(kk===diff?'box-shadow:0 0 0 2px '+c:'')+'">'+n+'<b style="color:'+(v?(v==='P'?'#fff6cf':c):'#3a4a50')+'">'+(v?(v==='P'?'★':v):'—')+'</b></div>'}).join('');
 $('gmFight').disabled=lk;try{rpDetail()}catch(e){}}}
{const _gf=gmFight;gmFight=function(){if(GM.rushCh!==4)return _gf.apply(this,arguments);const k=GM.rushSel;if(s5RushLocked(k)){gmSfx('no');return}gmSfx('ok');s5RushFight(k)}}
{const _pd=gmPrevDraw;gmPrevDraw=function(now){if(GM.rushCh!==4||GM.scr!=='rush'||($('gmRush')&&$('gmRush').classList.contains('rqFull')))return _pd.apply(this,arguments);const cv=$('gmPrevCv');if(!cv)return;const c=cv.getContext('2d'),k=GM.rushSel,b=S5[k],t=now/1000;c.imageSmoothingEnabled=false;s5Backdrop(c,k,t,cv.width,cv.height);c3ArtOn(c,b.art,cv.width/2,cv.height-16+Math.sin(t*2.2)*2,now,5.4,{pulse:Math.pow(1-((t*2)%1),3)});
 if(s5RushLocked(k)){c.fillStyle='rgba(2,10,16,.92)';c.fillRect(0,0,cv.width,cv.height);c.fillStyle='#9de8dc';c.font='900 30px '+FONT_STACK;c.textAlign='center';c.fillText('🔒',cv.width/2,cv.height/2);c.textAlign='left'}}}
/* 러시 상세(패턴 · 기록 · 음악)와 캐러셀 */
{const f=rpKey;rpKey=function(){return GM.rushCh===4?'a'+GM.rushSel:f.apply(this,arguments)}}
{const f=rpDeck;rpDeck=function(){if(GM.rushCh!==4)return f.apply(this,arguments);const b=S5[GM.rushSel];return (C3BOSS[b.art]&&C3BOSS[b.art].deck)||[]}}
{const f=rpMusId;rpMusId=function(){return GM.rushCh===4&&!S5UI.open?S5[GM.rushSel].art:f.apply(this,arguments)}}
{const f=rpBpm;rpBpm=function(){return GM.rushCh===4&&!S5UI.open?S5[GM.rushSel].bpm:f.apply(this,arguments)}}
{const f=rpRunLk;rpRunLk=function(){return GM.rushCh===4?s5RushLocked(null):f.apply(this,arguments)}}
{const f=rpLocked;rpLocked=function(){return GM.rushCh===4?s5RushLocked(GM.rushSel):f.apply(this,arguments)}}
{const f=rqLk;rqLk=function(k){return GM.rushCh===4?s5RushLocked(k):f.apply(this,arguments)}}
{const f=rfLocked;rfLocked=function(k){return GM.rushCh===4?s5RushLocked(k):f.apply(this,arguments)}}
{const f=rqBoss;rqBoss=function(k){if(GM.rushCh!==4)return f.apply(this,arguments);const b=S5[k];return {art:b.art,base:b.base,c:b.c,name:b.name,en:b.en,bpm:b.bpm||120}}}
/* 10연전 */
{const f=rpRunList;rpRunList=function(ch){return ch===4?[...Array(10)].map((_,i)=>({s5:i})):f.apply(this,arguments)}}
{const f=rpRunFight;rpRunFight=function(){const it=RUSH&&RUSH.list[RUSH.i];if(!it||it.s5==null)return f.apply(this,arguments);$('overlay').hidden=true;s5Fight(it.s5,false,true);G.s5RushK=it.s5;if(RUSH.carry!=null)P.hp=Math.min(P.maxhp,Math.round(RUSH.carry+P.maxhp*.35));RUSH.fightT0=performance.now()}}
const c5RunName=it=>it.s5!=null?S5[it.s5].name:it.s4!=null?window.__S4[it.s4].name:it.c3!=null?C3CASES[it.c3].boss.name:(BOSSES[it.bi]||{}).name;
rpRunEnd=function(won){if(!RUSH)return;const it=RUSH.list[RUSH.i],t=Math.round((performance.now()-(G.startReal||RUSH.fightT0))/1000),rank=won?(G.hits===0?'P':G.hits<=2?'S':G.hits<=4?'A':G.hits<=7?'B':'C'):'✕';
 RUSH.splits.push({name:it.s5!=null||it.s4!=null||it.c3!=null?c5RunName(it):G.B.name,t,rank,score:G.score||0,hits:G.hits||0});RUSH.total+=t;RUSH.score+=G.score||0;RUSH.carry=P.hp;
 setTimeout(()=>{if(!RUSH)return;if(won&&RUSH.i<9){RUSH.i++;const nx=RUSH.list[RUSH.i],nm=c5RunName(nx);showOverlay('BOSS RUSH · '+RUSH.i+' / 10','다음 상대: '+nm,rpRunTable()+'<div style="margin-top:8px;color:#a6f5c6">체력 '+P.hp+' → 다음 판 시작 시 35% 회복</div>',[['계속 ▶',()=>rpRunFight(),true],['그만두기',()=>rpRunSummary(false),false]])}else rpRunSummary(won)},200)};
/* 러시 전투 결과: 기록 저장 + 10연전 이어가기 */
{const _e=s5End;s5End=function(won){const rush=G&&G.s5Rush,k=G&&G.s5,was=G&&G.state;if(rush&&typeof RUSH!=='undefined'&&RUSH&&RUSH.ch===4&&was!=='result'){/* 10연전: 결과 창 대신 러시 진행 */G.state='result';G.won=won;stopMusic();try{c3SwapOut()}catch(e){}c5RushRec(k,won);try{rplStop(null)}catch(e){}rpRunEnd(won);return}
 const r=_e.apply(this,arguments);if(rush&&was!=='result')c5RushRec(k,won);return r}}
function c5RushRec(k,won){try{const rank=G.hits===0?'P':G.hits<=2?'S':G.hits<=4?'A':G.hits<=7?'B':'C';if(won){saveData.s5rush=saveData.s5rush||{};const kk=k+'|'+diff,o='PSABC';if(!saveData.s5rush[kk]||o.indexOf(rank)<o.indexOf(saveData.s5rush[kk]))saveData.s5rush[kk]=rank}if(typeof rpSaveRec==='function')rpSaveRec('a'+k,won);saveNow()}catch(e){}}
{const f=rpDetail;rpDetail=function(){const r=f.apply(this,arguments);try{if(GM.rushCh===4&&rpLocked()){const n=document.querySelector('#gmRushDet .rpNote');if(n)n.textContent='🔒 '+(s5Unlocked()?'스토리 챕터 5에서 쓰러뜨린 수호자만 공격 정보와 기록이 열려요.':'챕터 4의 마지막 별을 쓰러뜨리면 열리는 바다예요.')}}catch(e){}return r}}
try{S5[5].shape='구리 실로 몸을 꿰매 붙인 거대 아귀, 이마에 매달린 전기 바늘 등불, 전극 지느러미';S5[6].shape='해초 수의를 두른 두건의 처형인, 등 뒤 종탑 날개의 여덟 종, 종 추 망치와 판결의 저울'}catch(e){}

/* ================= 챕터 5: 보스 목록 팝업 없애기 · 심해 컨셉 체력바 ================= */
/* 1) 팝업 대신 바로 스토리로 (다른 챕터와 같게) */
s5Open=function(k){s5Close();if(!s5Unlocked()){try{gmSfx('no')}catch(e){}return}const ci=s5Save().ci||0;const kk=Math.min(9,k==null?ci:Math.min(k,ci));try{gmSfx('ok')}catch(e){}s5Go(kk,kk===0&&ci===0)};
{const b=$('btnStory5');if(b){b.textContent='▶ 심해로 잠수';b.onclick=()=>s5Open()}}
{const _cp=s_csPage;s_csPage=function(i){const r=_cp.apply(this,arguments);try{if(i===4)document.querySelectorAll('#csPage .csBtns button').forEach(x=>{if(/보스 10명/.test(x.textContent))x.remove()})}catch(e){}return r}}
{const _so=showOverlay;showOverlay=function(tag,title,text,btns){try{if(G&&G.s5!=null&&Array.isArray(btns))btns=btns.filter(x=>x[0]!=='보스 목록')}catch(e){}return _so.call(this,tag,title,text,btns)}}
{const _g=gmShow;gmShow=function(){const r=_g.apply(this,arguments);try{const h=$('s5HallTab');if(h)h.remove()}catch(e){}return r}}
/* 2) 체력바: 물이 찬 황동 파이프 · 수면 물결 · 기포 · 보스별 문장(오른쪽 끝) */
function c5BarEmblem(k,cx,cy,t,col,r){const s=Math.sin(t*3);
 pcirc(cx,cy,10,'#050b12');pcirc(cx,cy,9,'#b8884a');pcirc(cx,cy,7.5,'#0a2230');cRing(cx,cy,9,'#f0d090',1,1);for(let i=0;i<8;i++){const a=i*Math.PI/4;RA(Math.round(cx+Math.cos(a)*8.3),Math.round(cy+Math.sin(a)*8.3),1,1,'#fff0c0',.8)}
 const P=(x,y,w,h,c,a)=>RA(Math.round(cx+x),Math.round(cy+y),w,h,c,a==null?1:a);
 if(k===0){P(-2,-4,4,8,'#e8e0cc');P(-2,-2,4,2,'#c24a3c');P(-2,2,4,2,'#c24a3c');P(-3,-6,6,2,'#3a2a20');pcirc(cx,cy-6,1.4,'#ffd06a');const a=t*1.6;for(let i=2;i<8;i++)RA(Math.round(cx+Math.cos(a)*i),Math.round(cy-6+Math.sin(a)*i*.5),1,1,'#ffd06a',1-i/8)}
 if(k===1){cRing(cx,cy,5,'#d9b063',1,1);const a=t*.9;for(let i=0;i<5;i++){RA(Math.round(cx+Math.cos(a)*i),Math.round(cy+Math.sin(a)*i),1,1,'#ff5a50',1);RA(Math.round(cx-Math.cos(a)*i*.7),Math.round(cy-Math.sin(a)*i*.7),1,1,'#e8f4f0',1)}}
 if(k===2){P(0,-5,1,9,'#a8b0b8');P(-3,-3,7,1,'#a8b0b8');cRing(cx+.5,cy-6,1.2,'#a8b0b8',1,1);for(const sd of [-1,1]){P(sd*3,2,1,1,'#a8b0b8');P(sd*2,3,1,1,'#a8b0b8');P(sd*1,4,1,1,'#a8b0b8')}}
 if(k===3){for(let i=0;i<5;i++){const a=Math.PI*(1.1+i*.2);pcirc(cx+Math.cos(a)*4.5,cy+2+Math.sin(a)*4,1.3,'#fff6fb')}pcirc(cx,cy+2,1.6,'#ffb8e6')}
 if(k===4){for(let i=0;i<40;i++){const a=i*.3,rr=i*.13;RA(Math.round(cx+Math.cos(a)*rr),Math.round(cy+Math.sin(a)*rr),1,1,'#c8904a',1)}pcirc(cx-5,cy,1.2,'#fff0b0')}
 if(k===5){P(-4,-1,7,4,'#27434a');P(-4,1,6,1,'#e8e0cc');for(let i=0;i<4;i++)P(-5+i*.5,-3-i,1,1,'#436a70');pcirc(cx-5,cy-6,1.3,'#c8ff8a');n4G&&n4G(cx-5,cy-6,4,'#c8ff8a',.4+.3*s)}
 if(k===6){ctx.fillStyle='#d8b060';ctx.beginPath();ctx.moveTo(cx-2,cy-4);ctx.lineTo(cx+2,cy-4);ctx.lineTo(cx+4,cy+3);ctx.lineTo(cx-4,cy+3);ctx.fill();P(-4,3,8,1,'#fff0c0');P(0,4,1,1,'#6a4a1a');if(r>0&&Math.floor(t*2)%2)cRing(cx,cy,5+((t*6)%3),'#ffe6a0',.5,1)}
 if(k===7){P(-3,-5,7,1,'#e0b860');P(-3,5,7,1,'#e0b860');ctx.fillStyle='#e8c890';ctx.beginPath();ctx.moveTo(cx-3,cy-4);ctx.lineTo(cx+3,cy-4);ctx.lineTo(cx,cy);ctx.fill();ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+3,cy+4);ctx.lineTo(cx-3,cy+4);ctx.fill();P(0,((t*6)%4),1,1,'#fff0c0')}
 if(k===8){P(-4,-3,4,6,'#efe2c0');P(1,-3,4,6,'#c8b890');P(0,-3,1,6,'#5a3420');for(let i=0;i<3;i++){P(-3,-1+i*1.5,2,1,'#12142e');P(2,-1+i*1.5,2,1,'#12142e')}}
 if(k===9){ctx.fillStyle='#c8904a';ctx.beginPath();ctx.moveTo(cx-2,cy-4);ctx.lineTo(cx+2,cy-4);ctx.lineTo(cx+4,cy+3);ctx.lineTo(cx-4,cy+3);ctx.fill();P(-4,3,8,1,'#f0c080');n4G&&n4G(cx,cy,6+s*2,'#a8ffe9',.5);for(let i=0;i<3;i++){const a=-Math.PI/2+(i-1)*.5;P(Math.cos(a)*6,Math.sin(a)*6-2,1,1,'#fff2c0')}}}
function c5BarTh(k){const b=S5[k],col=b.c;return {main:col,frame:'#0a2230',
 back(S){const {x,y,w,h,t}=S;/* 황동 파이프 테 */R(x-4,y-4,w+8,h+8,'#050b12');R(x-3,y-3,w+6,h+6,'#6a4a28');R(x-3,y-3,w+6,1,'#d8b070');R(x-3,y+h+2,w+6,1,'#3a2610');R(x-2,y-2,w+4,h+4,'#081820');
  /* 리벳 · 이음새 */for(let i=10;i<w-20;i+=40){R(x+i-1,y-4,3,h+8,'#8a6234');R(x+i-1,y-4,3,1,'#f0d090');RA(x+i,y-3,1,1,'#fff0c0',1);RA(x+i,y+h+2,1,1,'#fff0c0',.8)}
  /* 위로 떠오르는 기포 */for(let i=0;i<9;i++){const q=(t*.5+i*.37)%1,bx=x+((i*53)%Math.max(1,w)),by=y-2-q*10;RA(Math.round(bx),Math.round(by),1,1,'#bff4ff',(1-q)*.8);if(i%3===0)cRing(bx,by,1.5,'#bff4ff',(1-q)*.5,1)}
  /* 왼쪽 끝: 밸브 핸들 */const vx=x-10,vy=y+h/2;pcirc(vx,vy,5,'#050b12');cRing(vx,vy,4,'#c24a3c',1,2);const a=t*.6;for(let i=0;i<4;i++){const aa=a+i*Math.PI/2;RA(Math.round(vx+Math.cos(aa)*3),Math.round(vy+Math.sin(aa)*3),1,1,'#ff8a6a',1)}pcirc(vx,vy,1.2,'#d8b070')},
 tex(S){const {x,y,h,now,fw}=S,t=now/1000;RA(x,y+Math.ceil(h/2),fw,Math.floor(h/2),'#001018',.28);RA(x,y+h-2,fw,2,'#001018',.3);/* 수면 물결(위) */for(let i=0;i<fw;i+=2){const wy=Math.round(Math.sin(i*.25+t*4)*1.2+1);RA(x+i,y+wy,2,1,'#ffffff',.55)}
  /* 흔들리는 물빛(코스틱) */for(let i=0;i<fw;i+=5){const q=hash(i+'c5')%7;RA(x+i+Math.sin(t*2+i)*1.5,y+3+(q%Math.max(1,h-5)),2,1,'#e8fbff',.2+.25*Math.sin(t*3+i))}
  /* 안에서 오르는 기포 */for(let i=0;i<Math.floor(fw/18);i++){const q=(t*.8+i*.43)%1,bx=x+((i*37)%Math.max(1,fw));RA(Math.round(bx),Math.round(y+h-1-q*(h-2)),1,1,'#ffffff',.7*(1-q))}},
 front(S){const {x,y,w,h,t,r,fx}=S;/* 채움 끝: 거품 */if(S.fw>2&&S.fw<w){for(let i=0;i<h;i+=2)RA(fx-1+Math.round(Math.sin(t*9+i)),y+i,2,2,'#ffffff',.6)}
  c5BarEmblem(k,x+w-8,y+h/2,t,col,r);
  /* 깊이 눈금 (아래) */for(let i=0;i<=10;i++){const px=Math.round(x+w*i/10);RA(px,y+h+3,1,i%5===0?3:2,'#9de8dc',.5)}}}}
(function(){try{S5.forEach((b,k)=>{const key='s5bar'+k;BB_TH[key]=c5BarTh(k);if(C3BOSS[b.art])C3BOSS[b.art].th=key})}catch(e){console.error('c5bar',e)}})();
/* 곡 정보 상자가 체력바 끝 문장을 가리지 않게: 챕터 5 전투에서는 시작 5초 뒤 살며시 사라짐 */
setInterval(()=>{try{const e=$('songInfo');if(!e)return;const on=typeof mode!=='undefined'&&mode==='boss'&&G&&G.s5!=null&&G.state==='play'&&G.startReal&&performance.now()-G.startReal>5000;e.style.transition='opacity .6s';e.style.opacity=on?'0':''}catch(_){}},300);

