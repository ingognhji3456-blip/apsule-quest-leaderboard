/* ================= 메인 루프 ================= */
/* Chapter 4 custom art: use the same slot in combat and previews. */
{const original=c3Art;c3Art=function(c,B,x,y,t,o,u,id){const k=S4.findIndex(b=>b.art===id),M=k>=0&&MODS['c4boss'+k];if(M){modDrawBossImg(c,M,B,x,y,t,o||{},u||U);return}return original.apply(this,arguments)}}
/* Capture chapter 4 metadata before the end handlers restore the base boss. */
{const end=s4End;s4End=function(won){const pending=G&&G.state!=='result',info=pending?rplInfo(won):null;const result=end.apply(this,arguments);if(pending&&G.state==='result')rplStop(info);return result}}
{const end=s4RushEnd;s4RushEnd=function(won){const pending=G&&G.state!=='result',info=pending?rplInfo(won):null;const result=end.apply(this,arguments);if(pending&&G.state==='result')rplStop(info);return result}}
/* STORY_QUALITY_22_BEGIN: retain existing scene art, add local detail. */
const SQ22={previous:null,scPrevious:null};
function sq22Snapshot(source,w,h){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(source,0,0,w,h);return c}
{const base=playScene;playScene=function(){SQ22.previous=null;return base.apply(this,arguments)}}
{const base=sceneLines;sceneLines=function(){const art=SCN.art,t0=SCN.artT0,next=SCN.pages[SCN.pi].art;
 if(SCN.pi>0&&next!==art)SQ22.previous=sq22Snapshot(cv,W,H);
 const out=base.apply(this,arguments);if(SCN&&next===art)SCN.artT0=t0;return out}}
function sq22Dust(c,T,x,y,w,h,col,n){c.save();c.fillStyle=col;for(let i=0;i<n;i++){const phase=(T*(.035+(i%3)*.013)+i*.618)%1,px=x+(i*43%w)+Math.sin(T*.45+i)*3,py=y+h*(1-phase);c.globalAlpha=Math.sin(phase*Math.PI)*(.12+(i%3)*.06);c.fillRect(Math.round(px),Math.round(py),1,1)}c.restore()}
{const base=ART.workshop;ART.workshop=function(now,t){base(now,t);ctx.save();ctx.beginPath();ctx.rect(0,26,W,166);ctx.clip();
 for(let i=0;i<3;i++){ctx.fillStyle='#a8c7ff';ctx.globalAlpha=.022+Math.sin(now/2100)*.004;ctx.beginPath();ctx.moveTo(352+i*18,76);ctx.lineTo(362+i*18,76);ctx.lineTo(302+i*25,192);ctx.lineTo(278+i*25,192);ctx.closePath();ctx.fill()}
 sq22Dust(ctx,now/1000,282,86,102,95,'#d7e8ff',14);ctx.restore()}}
{const base=ART.train;ART.train=function(now,t){base(now,t);const d=Math.max(0,t-2.5),tx=110+d*d*24,a=(tx-110)/6;
 ctx.save();ctx.beginPath();ctx.rect(201,132,W-201,62);ctx.clip();
 for(let j=0;j<5;j++){const x=tx+j*70,dx=Math.cos(a)*2,dy=Math.sin(a)*2;ctx.strokeStyle='#a38eac';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(Math.round(x+14+dx),Math.round(186+dy));ctx.lineTo(Math.round(x+50+dx),Math.round(186+dy));ctx.stroke();for(const wx of [x+14,x+50]){ctx.fillStyle='#c4b3c9';ctx.fillRect(Math.round(wx+dx),Math.round(186+dy),1,1)}}
 // Steam drifts away from the moving wheel instead of jumping each frame.
 for(let i=0;i<9;i++){const p=(t*.7+i/9)%1,at=Math.max(0,t-p/.7-2.5),x=110+at*at*24+354-p*26,y=178-p*30;if(x>W+20)continue;ctx.globalAlpha=Math.sin(p*Math.PI)*.13;ctx.fillStyle='#c4b3c9';ctx.fillRect(Math.round(x),Math.round(y),3+Math.floor(p*8),2+Math.floor(p*5))}ctx.restore()}}
for(const key of ['dawn','part2end']){const base=ART[key];ART[key]=function(now,t){base(now,t);ctx.save();ctx.beginPath();ctx.rect(0,28,W,178);ctx.clip();sq22Dust(ctx,now/1000,20,135,430,65,'#fff0b0',20);ctx.restore()}}
// Sparkle travels across the watch glass without obscuring its hands.
{const base=ART.watch;ART.watch=function(now,t){base(now,t);const p=(t/6)%1;if(p<.26){const a=-2.5+p*5;ctx.save();ctx.fillStyle='#fff4d3';ctx.globalAlpha=Math.sin(p/.26*Math.PI)*.65;const x=Math.round(240+Math.cos(a)*77),y=Math.round(120+Math.sin(a)*77);ctx.fillRect(x-2,y,5,1);ctx.fillRect(x,y-2,1,5);ctx.restore()}}}
// Chapter 4: a bounded afterimage follows the actual curved travel path.
{const base=scPlay;scPlay=function(){SQ22.scPrevious=null;return base.apply(this,arguments)}}
{const base=scNext;scNext=function(){SQ22.scPrevious=null;if(SC4.on&&SC4.i>=0&&SC4.seq&&SC4.i+1<SC4.seq.length){const m=$('s4Cine');if(m)SQ22.scPrevious=sq22Snapshot(m.querySelector('canvas'),SCW,SCH)}return base.apply(this,arguments)}}
scMeteors=function(c,T,n,col,sp){c.save();const color=col||'#ffd8a8';for(let i=0;i<n;i++){const q=((T*(sp||.5))+i/n)%1,x=SCW+40-q*(SCW+160)+((i*73)%160),y=-20+q*(SCH*.8)+((i*41)%60),alpha=Math.sin(q*Math.PI)*.8;
 for(let j=12;j>=1;j--){c.globalAlpha=alpha*(1-j/13)*.65;c.fillStyle=color;c.fillRect(Math.round(x+j*2.5),Math.round(y-j*1.35),j<4?2:1,1)}
 c.globalAlpha=alpha;c.fillStyle='#fff6df';c.fillRect(Math.round(x),Math.round(y),2,2);c.fillStyle=color;for(let j=0;j<3;j++){c.globalAlpha=alpha*.3*(1-j/3);c.fillRect(Math.round(x+9+j*6),Math.round(y-2-j*2+Math.sin(T*4+i+j)*3),1,1)}}c.restore()};
/* STORY_QUALITY_22_END */

/* CHAPTER5_24_BEGIN */
const S5=[
 {key:'beacon',name:'등대 껍질게',en:'BEACON CRAB',c:'#ffd58a',dark:'#343d51',sig:'s5Beacon',title:'꺼지지 않는 마지막 등대',place:'침묵의 방파제',shape:'등대가 자란 비대칭 갑각, 렌즈 집게와 여섯 개의 청동 다리',intro:[['똑딱','종은 움직이는데 소리가 없어. 저 등대만 같은 신호를 보내고 있어.'],['등대 껍질게','항로 폐쇄. 귀환 신호 없음. 접근 선박을 돌려보낸다.']],outro:[['','금이 간 렌즈에서, 삼백 년 전의 구조 신호가 흘러나왔다.'],['하루','공격 신호가 아니었어. 누군가를 기다리고 있었던 거야.'],['똑딱','신호의 끝이 바다 밑으로 이어져. 내려가 보자.']]},
 {key:'manta',name:'접힌 항로',en:'CHART MANTA',c:'#9fe6dd',dark:'#214b53',sig:'s5Chart',title:'돌아오는 길을 접어 둔 지도',place:'해도 산호초',shape:'찢어진 해도로 된 마름모 날개, 나침반 눈, 붉은 항로 실',intro:[['하루','지도 위의 길이 움직여!'],['똑딱','종이 물속에서 썩지 않았어. 이건 누군가의 귀환 경로야.']],outro:[['','겹쳐진 해도가 펼쳐졌다. 모든 길은 같은 곳에서 끊겨 있었다.'],['똑딱','해저 방재청… 마을을 홍수에서 지키던 시설이래.']]},
 {key:'anchor',name:'닻을 짊어진 기사',en:'ANCHOR WARDEN',c:'#f0ac7d',dark:'#3f4655',sig:'s5Anchor',title:'문을 닫은 채 남은 사람',place:'침수 관문',shape:'녹슨 잠수복, 창살 투구, 등보다 큰 닻과 길게 끌리는 사슬',intro:[['닻을 짊어진 기사','안쪽은 위험하다. 마지막 피난민이 나갈 때까지 문은 열지 않는다.'],['하루','이제 밖은 안전해. 네가 기다리는 사람들은 오래전에 나갔어.']],outro:[['닻을 짊어진 기사','그렇다면… 내 근무는 끝났군.'],['','관문 뒤에는 사람 대신 봉인된 소리들이 줄지어 있었다.']]},
 {key:'organ',name:'진주 성가대',en:'PEARL CHOIR',c:'#eab7ff',dark:'#4b3265',sig:'s5Choir',title:'목소리들을 품은 악기',place:'수몰 예배당',shape:'오르간 관을 등에 단 종 모양 해파리, 다섯 진주 성대와 빛나는 촉수',intro:[['똑딱','저 노래… 마을 사람들 목소리야.'],['진주 성가대','울음도, 비명도, 부서지지 않도록. 여기서 영원히 노래하라.']],outro:[['','진주 하나가 열리자 아이의 웃음소리가 떠올랐다.'],['하루','보관하는 것과 가둬 두는 건 달라. 이 소리들은 집으로 가야 해.']]},
 {key:'nautilus',name:'유리 잠항선',en:'GLASS NAUTILUS',c:'#88d8ff',dark:'#254c69',sig:'s5Sonar',title:'승객 없는 구조선',place:'난파선 묘지',shape:'나선 유리 선체 안의 빈 객실, 황동 잠망경, 꼬리 추진기와 탐조등',intro:[['유리 잠항선','잔류 인원 수색 중. 마지막 승객의 탑승을 기다립니다.'],['똑딱','빈 객실마다 이름표가 있어. 구조하지 못한 사람들인가 봐.']],outro:[['','항해 일지의 마지막 줄이 켜졌다. 「전원 대피 완료. 수신 확인 없음」'],['하루','다들 돌아갔는데… 아무도 이 배에 알려 주지 못했어.']]},
 {key:'eel',name:'전류의 봉합사',en:'SUTURE EEL',c:'#bcff9c',dark:'#284a48',sig:'s5Suture',title:'끊어진 신호를 잇는 손',place:'절연 송전로',shape:'투명한 긴 몸속 구리 척추, 바늘 같은 주둥이, 전극 지느러미',intro:[['똑딱','대피 완료 신호가 여기서 끊겼어.'],['하루','저 장어가 전선을 잇고 있어. 하지만 반대편엔 아무도 없잖아.']],outro:[['','신호가 다시 흐르자 시설 전체에 같은 문장이 울렸다.'],['시설 방송','최종 관리자: 응답 없음. 무음 격리 절차를 계속합니다.']]},
 {key:'octopus',name:'여덟 종의 집행관',en:'OCTAVE JUDGE',c:'#ffb2c4',dark:'#5c304c',sig:'s5Octave',title:'침묵만을 안전으로 배운 파수꾼',place:'무음 재판정',shape:'여덟 촉수 끝의 크기가 다른 종, 법관 가면과 자주색 망토',intro:[['여덟 종의 집행관','소리는 파도를 부른다. 파도는 마을을 삼킨다. 침묵하라.'],['하루','종소리 때문에 홍수가 난 게 아니야! 기록을 보여 줄게.']],outro:[['','여덟 종이 서로 다른 높이로 울렸다. 파도는 일어나지 않았다.'],['똑딱','소리 자체가 위험한 게 아니었어. 한 번에 터뜨리는 게 위험했던 거야.']]},
 {key:'whale',name:'모래시계 고래',en:'HOURGLASS WHALE',c:'#f7d8a3',dark:'#304968',sig:'s5Whale',title:'재난의 순간을 삼킨 고래',place:'뒤집힌 해류',shape:'모래시계 갈비뼈와 유리 배를 가진 거대한 고래, 안팎으로 흐르는 금빛 모래',intro:[['똑딱','저 배 속의 모래는… 홍수가 일어난 그 순간이야.'],['하루','삼백 년 동안 같은 순간을 삼키고 있었구나.']],outro:[['','고래가 내쉰 기억 속에서, 관리자는 혼자 수문을 붙잡고 있었다.'],['관리자의 기록','소리를 잠시만 맡아 줘. 내가 돌아오면 종을 세 번 울릴게.']]},
 {key:'archive',name:'산호 기록관',en:'CORAL ARCHIVIST',c:'#ffbd8b',dark:'#31515d',sig:'s5Archive',title:'돌아오지 않은 약속의 기록',place:'해저 방재청',shape:'산호 뿔과 책장 갑옷, 조개 문서함, 잉크가 흐르는 네 개의 팔',intro:[['산호 기록관','관리자는 돌아오지 않았다. 약속만이 남았다.'],['똑딱','그 약속 때문에 아직도 모든 소리를 가두는 거야?']],outro:[['산호 기록관','심장은 세 번의 귀환종을 기다린다. 서로 다른 박동으로, 차례대로.'],['하루','우리가 대신 전할게. 이제 쉬어도 된다고.']]},
 {key:'heart',name:'무음의 심장',en:'HEART OF THE TIDE',c:'#a8ffe9',dark:'#2e435d',sig:'s5Heart',title:'마지막 귀환종을 기다리는 수호자',place:'침묵 수문',shape:'세 겹의 수문 고리와 왕관, 유리 흉곽 안의 거대한 종 심장, 파도처럼 펼친 망토',intro:[['무음의 심장','관리자의 귀환을 기다린다. 마을은… 반드시 지켜야 한다.'],['하루','마을은 살아 있어. 네가 지켰어. 이제 우리 목소리를 들어 줘.']],outro:[['하루','첫 번째 종은 돌아간 사람들에게. 두 번째 종은 남아 지킨 너에게.'],['똑딱','마지막 종은… 함께 맞이할 내일에게.'],['무음의 심장','귀환 신호… 확인. 격리를… 해제한다.']]}
].map((b,k)=>Object.assign(b,{art:'s5_'+b.key,base:k,genre:['deep',43+k%5,'min',[0,5,3,4]],bpm:[118,130,114,126,122,144,132,110,136,140][k]}));
const S5UI={open:false,sel:0,raf:0};
function s5Save(){const s=saveData.ch5||(saveData.ch5={ci:0,best:{}});s.best=s.best||{};return s}
function s5Unlocked(){return ((saveData.ch4||{}).ci||0)>=10||!!((saveData.ch4||{}).best||{})[9]}
function s5Info(){const s=s5Save();return {slots:S5.map((b,k)=>({k,art:b.art,name:b.name,rank:s.best[k]||null,seen:k<s.ci,cur:k===s.ci})),done:s.ci>=10,prog:Math.min(1,(s.ci||0)/10)}}
/* Distinct code-native pixel silhouettes, drawn by the existing MON renderer. */
function s5Eye(A,x,y,col,r=1){A.C(x,y,r+ .6,'#071320');A.E(x,y,r,A.blink?.2:r,col);A.R(x-.4,y-.4,.5,.5,'#fffbea')}
function s5Core(A,x,y,col){A.ring(x,y,3,.6,'#bb9e75');A.C(x,y,2.3,A.expose?'#ffffff':col);A.glow(x,y,5,col,.35+(A.open||0)*.5)}
function s5Rivet(A,x,y){A.C(x,y,.45,'#baac91');A.R(x-.2,y-.2,.3,.3,'#fff1c5')}
function s5Tent(A,x,y,side,i,col){let px=x,py=y;for(let j=1;j<=9;j++){const nx=x+side*j*.6+Math.sin(A.t*2+i+j*.7)*1.2,ny=y+j*1.15;A.L(px,py,nx,ny,col,1.8-j*.12);if(j%2===0)A.C(nx,ny,.36,'#ead2c9');px=nx;py=ny}}
MON.reg.c_s5_beacon=A=>{const t=A.t,y=-10+A.bob*.3;for(const s of [-1,1])for(let i=0;i<3;i++){const x=s*(9+i),ey=-2+Math.sin(t*2+i)*.6;A.L(s*7,y+4,x+ s*3,ey-4,'#8b7161',1.7);A.L(x+s*3,ey-4,x+s*6,ey,'#bca079',1.2)}A.E(0,y,13,7,'#13222c');A.E(-1,y-1,12,6,'#3c5b65');A.P([[-9,y-4],[1,y-9],[10,y-2],[8,y+3],[-6,y+4]],'#687977');for(let i=-2;i<3;i++)A.L(i*4,y-4,i*4-1,y+3,'#b7ac84',.4);A.box(-4,y-24,8,21,'#b6ad90','#555d66','#eee0b2');for(let j=0;j<3;j++)A.R(-4,y-21+j*6,8,2,'#bc645b');A.box(-6,y-28,12,6,'#5c8790','#17333d','#bed2cc');A.C(0,y-25,2,'#fff3bb');A.glow(0,y-25,7,'#ffda8a',.6);A.P([[-7,y-28],[0,y-33],[7,y-28]],'#355360');for(const s of [-1,1]){const x=s*16,cy=y+Math.sin(t*2+s);A.L(s*10,y,x,cy,'#8a735d',2);A.C(x,cy,4,s<0?'#748f8a':'#b88956');A.P([[x,cy],[x+s*7,cy-5],[x+s*5,cy+1]],'#cfb381');A.P([[x,cy+1],[x+s*6,cy+6],[x+s*6,cy+2]],'#8a735d')}s5Eye(A,-5,y-1,'#ffdda2');s5Eye(A,5,y-1,'#ffdda2');s5Core(A,0,y+2,'#ffd58a')};
MON.reg.c_s5_manta=A=>{const t=A.t,y=-18+A.bob;for(const s of [-1,1]){const flap=Math.sin(t*2)*3;A.P([[0,y-9],[s*11,y-6],[s*26,y+flap],[s*17,y+5],[s*8,y+11],[0,y+6]],'#224550');A.P([[s*2,y-7],[s*12,y-4],[s*24,y+flap],[s*15,y+4],[s*8,y+8]],'#c6d9b5');for(let i=0;i<4;i++)A.L(s*4,y-4+i*3,s*(17-i*2),y+i,'#699b95',.35);A.L(s*5,y-3,s*17,y+2,'#cc6b62',.5);A.R(s*13,y,1,1,'#f2c386')}A.P([[-3,y-9],[3,y-9],[5,y+5],[0,y+10],[-5,y+5]],'#4e8680');for(let j=0;j<15;j++)A.L(Math.sin(t*2+j*.4)*(j/12),y+8+j,Math.sin(t*2+(j+1)*.4)*((j+1)/12),y+9+j,'#b17765',.8);A.ring(0,y,3.5,.6,'#d8b977');A.P([[0,y-3],[1.6,y+1],[-1.6,y+1]],'#f49379');s5Eye(A,0,y,'#e6fff0',1);A.glow(0,y,5,'#9fe6dd',.4)};
MON.reg.c_s5_anchor=A=>{const y=-17+A.bob*.25,t=A.t;for(const s of [-1,1]){A.box(s<0?-7:2,-9,5,8,'#566577','#1b2f3b','#9b947e');A.box(s<0?-9:2,-2,7,3,'#3a4855','#112430','#8c7c68');A.L(s*7,y-7,s*11,y+4,'#787966',3);s5Rivet(A,s*7,y-6)}A.P([[-8,y-9],[8,y-9],[9,y+4],[5,y+10],[-5,y+10],[-9,y+4]],'#273a4a');A.P([[-6,y-8],[6,y-8],[5,y+5],[-5,y+5]],'#927d61');A.box(-6,y-19,12,12,'#6b7b83','#1b2a39','#d2bc8c');A.C(0,y-13,4.3,'#17242f');for(let i=-2;i<=2;i++)A.R(i*1.5-.2,y-17,.45,8,'#b69b73');A.glow(0,y-13,4,'#f0ac7d',.45);A.C(0,y-13,1.3,'#ffe0a8');s5Core(A,0,y,'#f0ac7d');for(let j=0;j<12;j++)A.ring(9+j*.75,y+4+j*.7+Math.sin(j*.4+t)*.5,.8,.3,'#80776c');A.L(18,-22,18,-2,'#b29f87',2.1);A.ring(18,-24,3,.8,'#d6be99');A.P([[8,-10],[11,-4],[18,1],[25,-5],[27,-11],[23,-8],[18,-4],[13,-8]],'#9e8770');A.L(13,-18,23,-18,'#d1b38a',1.4)};
MON.reg.c_s5_organ=A=>{const y=-19+A.bob,t=A.t;for(let i=0;i<7;i++){const x=(i-3)*3.5,h=8+(3-Math.abs(i-3))*3;A.box(x-1,y-7-h,2,h,'#907caa','#433853','#e9c7dd');A.E(x,y-7-h,1, .5,'#ffe1fa')}for(let i=0;i<7;i++)s5Tent(A,(i-3)*3,y+4,i%2?1:-1,i,'#ac86c2');A.E(0,y,14,9,'#443c69');A.E(0,y-2,13,8,'#886994');A.E(-2,y-4,9,4,'#bc9cba');A.ring(0,y+1,8,.5,'#f9d9ed');for(let i=0;i<5;i++){const x=(i-2)*4,yy=y+3+Math.sin(t*2+i);A.orb(x,yy,1.5,'#f9e4ff','#795a94','#ffffff')}s5Eye(A,-4,y-3,'#f4d6ff');s5Eye(A,4,y-3,'#f4d6ff');A.glow(0,y,12,'#eab7ff',.23)};
MON.reg.c_s5_nautilus=A=>{const y=-16+A.bob*.6,t=A.t;A.P([[10,y+1],[23,y-8],[20,y+8],[12,y+9]],'#3c7796');for(let i=0;i<4;i++)A.L(12,y+3,22,y-6+i*4,'#99c3c7',.6);A.E(-1,y,16,12,'#1a344a');A.E(-2,y-1,14,11,'#628b9c');A.E(-3,y-2,12,9,'#bad1cf');for(let i=0;i<50;i++){const a=i*.27,r=i*.21;A.L(-3+Math.cos(a)*r,y-2+Math.sin(a)*r*.8,-3+Math.cos(a+.27)*(r+.21),y-2+Math.sin(a+.27)*(r+.21)*.8,'#53718a',.7)}for(let i=0;i<3;i++)A.box(-11+i*7,y-1,5,5,'#163b56','#294553','#e0c89c');A.L(1,y-11,1,y-20,'#baa482',1.5);A.L(1,y-20,6,y-20,'#ddc89c',1.5);A.C(6,y-20,1.5,'#b9f1ff');for(let j=0;j<3;j++)A.ring(23+j*4,y+3+Math.sin(t*2+j),1+j*.3,.35,'#c7f4ff',.5-j*.12);s5Eye(A,-14,y-1,'#c9f6ff',1.2);A.glow(-15,y,7,'#88d8ff',.4)};
MON.reg.c_s5_eel=A=>{const t=A.t;for(let j=28;j>=0;j--){const x=Math.sin(j*.16+t*.8)*14,y=-4-j*1.05,rr=1.2+(1-j/35)*2;A.C(x,y,rr+ .8,'#193539');A.C(x-.25,y-.25,rr,'#487567');A.C(x,y,rr*.45,'#d8bd7c');if(j%3===0){A.P([[x,y],[x-6,y-2],[x-3,y+3]],'#86b993');A.P([[x,y],[x+5,y+1],[x+2,y+4]],'#507f7b')}if(j%4===0)A.glow(x,y,3,'#bcff9c',.2)}const x=Math.sin(t*.8)*14;A.P([[x-4,-7],[x+3,-8],[x+8,-4],[x+3,1],[x-4,-1]],'#7da592');A.L(x+6,-5,x+15,-7,'#eadc9b',.7);s5Eye(A,x+2,-5,'#dcffb2');A.R(x+3,-1,4,.4,'#162c32')};
MON.reg.c_s5_octopus=A=>{const y=-24+A.bob*.6,t=A.t;for(let i=0;i<8;i++){const a=Math.PI*(.12+i*.11),sx=Math.cos(a)*7,ex=Math.cos(a)*23,ey=-3+Math.sin(t*2+i)*2;let px=sx,py=y+8;for(let j=1;j<=10;j++){const q=j/10,x=sx+(ex-sx)*q+Math.sin(q*4+t+i)*1.3,yy=y+8+(ey-y-8)*q;A.L(px,py,x,yy,'#9d617b',2-q);px=x;py=yy}A.P([[ex-2,ey-3],[ex+2,ey-3],[ex+3,ey+1],[ex-3,ey+1]],'#c3a285');A.C(ex,ey+2,.65,'#ffe2ac')}A.E(0,y,10,12,'#512f4d');A.P([[-7,y-7],[7,y-7],[5,y+7],[0,y+10],[-5,y+7]],'#d1b5be');A.R(-4,y-2,2.5,1,'#1c2837');A.R(2,y-2,2.5,1,'#1c2837');A.R(-1,y+3,2,2,'#5e3f56');A.P([[-11,y-8],[11,y-8],[8,y-12],[-8,y-12]],'#9e536e');A.L(-9,y-9,9,y-9,'#e3bb95',.7);s5Core(A,0,y+12,'#ffb2c4')};
MON.reg.c_s5_whale=A=>{const y=-18+A.bob*.5,t=A.t;A.P([[11,y],[24,y-10],[21,y+1],[28,y+9],[15,y+8],[9,y+4]],'#476785');A.E(-3,y,20,12,'#223b53');A.E(-4,y-2,18,10,'#507894');A.P([[-20,y+2],[-13,y+10],[7,y+9],[15,y+2]],'#9cbbb7');A.E(-1,y+1,11,8,'#1b3444');for(let i=-2;i<=2;i++){A.L(i*4-1,y-6,i*2,y,'#d6c492',.8);A.L(i*2,y,i*4-1,y+8,'#d6c492',.8)}A.P([[-7,y-5],[7,y-5],[0,y],[-7,y+7],[7,y+7],[0,y]],'#f1d7a3',.65);for(let i=0;i<8;i++)A.R(Math.sin(i*3)*2,y-4+(t*4+i)%11,.5,.6,'#ffebbc');A.P([[-9,y+5],[-3,y+5],[4,y+16],[-5,y+11]],'#638ca1');s5Eye(A,-16,y-1,'#fae5b8',1.1);A.L(-21,y+4,-12,y+6,'#182e43',.5);A.glow(0,y,10,'#f7d8a3',.24)};
MON.reg.c_s5_archive=A=>{const y=-19+A.bob*.3,t=A.t;for(const s of [-1,1]){A.L(s*5,y-12,s*8,y-25,'#df9a81',1.4);for(let i=0;i<3;i++){A.L(s*(6+i*.6),y-15-i*3,s*(11+i),y-18-i*3,'#ffbea2',.8);A.C(s*(11+i),y-18-i*3,.7,'#ffe2c7')}for(let i=0;i<2;i++){const x=s*(12+i*5),yy=y+3+i*6+Math.sin(t+i);A.L(s*6,y+i*3,x,yy,'#578e88',1.6);A.box(x-3,yy-3,6,5,'#c3b49a','#5a766f','#eee0b9');A.L(x-2,yy-2,x+2,yy-2,'#856f6b',.4)}}A.P([[-8,y-9],[8,y-9],[10,-3],[5,1],[0,-2],[-5,1],[-10,-3]],'#35585e');for(let j=0;j<4;j++){A.box(-7,y-5+j*4,14,3,'#735f68','#16323e','#ad9a87');for(let i=0;i<5;i++)A.R(-6+i*2.6,y-4.7+j*4,1.8,2.4,['#c58e77','#839d85','#ae9bbb'][i%3])}A.E(0,y-9,6,5,'#b4c7b5');s5Eye(A,-2.3,y-10,'#fff0c7',.7);s5Eye(A,2.3,y-10,'#fff0c7',.7);A.L(-2,y-6,2,y-6,'#365363',.4);A.glow(0,y-8,5,'#ffbd8b',.2)};
MON.reg.c_s5_heart=A=>{const y=-19+A.bob*.4,t=A.t,ch=Math.max(A.open||0,A.eyeC||0);for(let z=0;z<3;z++){const r=17+z*4;for(let j=0;j<32;j++){const a=j*TAU/32+t*(z%2?-.22:.16),x=Math.cos(a)*r,yy=y+Math.sin(a)*r*.58;A.R(x-.6,yy-.6,1.2,1.2,j%4?'#6a9b9e':'#e6d6a7');if(j%8===0)A.C(x,yy,1.2,'#a8ffe9')}}for(const s of [-1,1]){A.P([[s*5,y-6],[s*16,y],[s*24,y+14],[s*16,y+10],[s*21,y+21],[s*8,y+15],[s*4,0]],'#225363');for(let j=0;j<5;j++)A.L(s*7,y+j*3,s*(17+Math.sin(t+j)*3),y+8+j*3,'#5bb9b6',.4,.65)}A.P([[-7,y-9],[7,y-9],[9,y+9],[5,y+16],[-5,y+16],[-9,y+9]],'#80aaa6');A.P([[-5,y-7],[5,y-7],[6,y+8],[0,y+12],[-6,y+8]],'#15333f');A.P([[-4,y-3],[4,y-3],[6,y+5],[-6,y+5]],'#dacfa3');A.L(-5,y+5,5,y+5,'#fff1c5',.6);A.C(0,y+7,1.5,'#a8ffe9');A.glow(0,y+2,9+ch*5,'#a8ffe9',.5);A.E(0,y-13,6,5,'#d9dbb9');A.R(-4,y-14,8,1,'#214b59');for(const s of [-1,1])A.R(s*2- .5,y-14,1,1,'#a8ffe9');for(let i=-2;i<=2;i++)A.P([[i*2-1,y-17],[i*2,y-22-Math.abs(i)],[i*2+1,y-17]],'#e8c88f');for(let i=0;i<3;i++)A.ring(0,y+2,3+i*2+Math.sin(t*2+i)*.4,.3,'#efffe7',.3)};
for(const b of S5){MON.hand['c_'+b.art]=()=>{};MON.scl['c_'+b.art]=.9}

// Engraved plates and reflected edges sit on the original silhouettes.
for(const [k,b] of S5.entries()){const base=MON.reg['c_'+b.art];MON.reg['c_'+b.art]=A=>{base(A);A.bbox=[-28,-43,28,6];A.texA=.65;A.aura=b.c;
 const t=A.t,y=[-10+A.bob*.3,-18+A.bob,-17+A.bob*.25,-19+A.bob,-16+A.bob*.6,0,-24+A.bob*.6,-18+A.bob*.5,-19+A.bob*.3,-19+A.bob*.4][k];
 if(k===0){for(let j=-2;j<=2;j++){s5Rivet(A,j*4,y+3);A.L(j*4-1,y-3,j*4+1,y-5,'#afc2b5',.3)}A.L(-3,y-22,-3,y-7,'#f2deb5',.5);for(let j=0;j<4;j++)A.R(-3,y-20+j*4,1.2,1.8,'#294551');A.R(-5,y-26,10,.35,'#e9f3d2');A.ring(0,y-25,2.6,.35,'#b7965d');A.glow(0,y-25,10,b.c,.2+(A.eyeC||0)*.5)}
 if(k===1){for(const s of [-1,1]){for(let j=0;j<3;j++)A.L(s*(6+j*3),y-4,s*(8+j*3),y+4,'#e9f0ca',.25,.7);A.P([[s*18,y+2],[s*20,y+2],[s*16,y+4]],'#718f85');for(let j=0;j<4;j++)A.R(s*(6+j*3),y+(j%2)*2,.55,.55,'#b5675e')}A.ring(0,y,4.2,.25,'#fff0bd');A.R(-.3,y-4.5,.6,1,'#f2d38a');A.R(-.3,y+3.5,.6,1,'#f2d38a')}
 if(k===2){for(const s of [-1,1]){A.P([[s*6,y-10],[s*10,y-9],[s*11,y-5],[s*7,y-4]],'#a79779');A.L(s*7,y-9,s*10,y-7,'#ddd0a2',.5);s5Rivet(A,s*8,y-6);A.L(s*4,y+3,s*6,y+8,'#c7b188',.5);A.R(s<0?-6:3,-7,2,3,'#91a2a0')}for(let i=0;i<3;i++)A.R(-3,y+5+i,6,.3,'#344956');for(const s of [-1,1])s5Rivet(A,s*5,y-18);A.L(16,-20,16,-8,'#e2cdaa',.5);A.L(18,-3,24,-7,'#dac69c',.5)}
 if(k===3){for(let j=0;j<5;j++){const x=(j-2)*4;A.L(x,y-8,x*.7,y-3,'#e5bfdc',.35,.7)}A.E(-4,y-5,4,1,'#f8dcf1',.45);for(let j=0;j<8;j++){const a=j*TAU/8+t*.3;A.C(Math.cos(a)*10,y+Math.sin(a)*5,.3,'#ffeafd')}A.L(-10,y+3,10,y+3,'#f4caff',.3,.7)}
 if(k===4){for(let j=0;j<16;j++){const a=j*TAU/16;s5Rivet(A,-2+Math.cos(a)*14,y-1+Math.sin(a)*10)}for(let j=0;j<3;j++){const x=-11+j*7;A.R(x+1,y,1,3,'#9acbd2');A.R(x+1,y+3,3,.5,'#697d87');A.L(x,y-1,x+4,y-1,'#e2d8b1',.4)}A.E(-5,y-6,5,1,'#e1eddf',.5);A.box(10,y+5,4,3,'#b39775','#315066','#e3d3a5')}
 if(k===5){for(let j=0;j<20;j+=2){const x=Math.sin(j*.16+t*.8)*14,yy=-4-j*1.05;A.L(x-1,yy-1,x+1.7,yy,'#d1eab6',.3);A.C(x+.4,yy,.4,'#eddfa1')}const x=Math.sin(t*.8)*14;A.L(x+3,-6,x+6,-5,'#d9ffd4',.4);A.R(x+4,-2,2,.3,'#efffe0')}
 if(k===6){A.L(-6,y-6,-4,y+4,'#f2d5cf',.35);A.L(6,y-6,4,y+4,'#f2d5cf',.35);for(const s of [-1,1]){A.P([[s*3,y],[s*4,y+3],[s*2,y+2]],'#8f566e');A.C(s*5,y-5,.5,'#edd39c')}for(let j=-2;j<=2;j++)A.R(j*2,y-10,.5,.5,'#f9d5a4');A.R(-.2,y-4,.4,4,'#8f637b')}
 if(k===7){for(let j=0;j<6;j++)A.L(-17+j*3,y-7,-16+j*3,y-8,'#96b9bd',.5);for(let j=0;j<3;j++)A.L(-11+j*1.2,y+2,-12+j*1.2,y+5,'#243f52',.45);A.L(-8,y+8,1,y+10,'#d9d3ad',.4);A.L(-1,y-6,-1,y-3,'#fff7d4',.3,.65);for(const s of [-1,1])A.L(s*8,y-5,s*8,y+6,'#e3d1a5',.4)}
 if(k===8){for(const s of [-1,1]){A.ring(s*2.3,y-10,1.65,.3,'#6c7976');A.L(s*3.7,y-10,s*5,y-11,'#e3c98f',.3);A.L(s*7,y+1,s*8,y+11,'#92b2a0',.5)}A.L(-.6,y-10,.6,y-10,'#6c7976',.4);for(let j=0;j<4;j++)s5Rivet(A,0,y-4+j*4);for(let j=0;j<3;j++)A.L(-2+j*2,y-5,-1+j*2,y-3,'#e7cfb0',.3)}
 if(k===9){for(let z=0;z<3;z++){const r=17+z*4;for(let j=0;j<64;j++){if(j%8>5)continue;const a=j*TAU/64+t*(z%2?-.22:.16),aa=a+TAU/64;A.L(Math.cos(a)*r,y+Math.sin(a)*r*.58,Math.cos(aa)*r,y+Math.sin(aa)*r*.58,z===1?'#87c9bd':'#d2c998',.3,.65)}}A.L(-6,y-6,-7,y+7,'#ebedc8',.6);A.L(6,y-6,7,y+7,'#ebedc8',.6);for(let j=0;j<3;j++)A.R(-2,y-1+j,4,.3,'#a99b77');for(const s of [-1,1]){A.L(s*7,y+7,s*15,y+13,'#a5d7c4',.5);s5Rivet(A,s*5,y+10)}A.glow(0,y+3,8,b.c,.25+(A.eyeC||0)*.5)}
};MON.noArm['c_'+b.art]=1}

/* Telegraphs are at least 1.6 beats; every wall leaves a traversable opening. */
const s5Tel=()=>Math.max(1.6,npTel()),s5Col=()=>S5[G.s5==null?0:G.s5].c;
function s5Beam(t,a,b,w=8,col=s5Col(),life=.55){NP({k:'seg',sty:'laser',col,w,t0:t,t1:t+s5Tel(),t2:t+s5Tel()+life,a:()=>a,b:()=>b,dmg:10})}
function s5Drops(t,count,spread=34){for(let j=0;j<count;j++){const at=t+j*.65;sch(at,()=>{const x=clamp(P.x+(j%2?spread:-spread),AX+18,AX+AW-18),y=clamp(P.y,AY+18,AY+AH-18);NP({k:'circ',x,y,r:15,t0:at,t1:at+s5Tel(),t2:at+s5Tel()+.45,col:s5Col(),dmg:10})})}return (count-1)*.65+s5Tel()+.5}
function s5Wave(t,vertical,gap,offset=0){const tel=s5Tel(),dur=3.5,span=vertical?AW:AH,start=vertical?AX:AY;
 for(const side of [-1,1])NP({k:'seg',sty:'elec',col:s5Col(),w:7,live:true,t0:t,t1:t+tel,t2:t+tel+dur,a:b=>{const q=clamp((b-t-tel)/dur,0,1),v=(vertical?AY:AX)+(vertical?AH:AW)*q;return vertical?[side<0?start:gap+26,v]:[v,side<0?start:gap+26]},b:b=>{const q=clamp((b-t-tel)/dur,0,1),v=(vertical?AY:AX)+(vertical?AH:AW)*q;return vertical?[side<0?gap-26:start+span,v]:[v,side<0?gap-26:start+span]},dmg:10});return tel+dur}
defPat('s5Beacon','귀환등 삼연사','all',9,'빛줄기가 멈춘 곳을 확인하고 옆으로 이동. 세 번째 발사 뒤 반격.',t=>{for(let j=0;j<3;j++){const at=t+j*1.4;sch(at,()=>{const g=bgeo(),x=clamp(P.x,AX+24,AX+AW-24);s5Beam(at,[g.x,g.top],[x,AY+AH],8)})}return 2.8+s5Tel()+.6});
defPat('s5Chart','접히는 항로','all',8,'지도에 그어진 대각선 두 줄 사이의 넓은 틈을 따라 이동.',t=>{for(let j=0;j<2+G.phase;j++){const at=t+j*1.3;sch(at,()=>{const d=j%2?1:-1,x=AX+AW*.5;for(const s of [-1,1])s5Beam(at,[clamp(x+s*80-d*55,AX,AX+AW),AY],[clamp(x+s*80+d*55,AX,AX+AW),AY+AH],9)})}return (1+G.phase)*1.3+s5Tel()+.6});
defPat('s5Anchor','닻과 끌리는 사슬','all',9,'발밑의 닻 표시를 피한 뒤, 닻과 보스를 잇는 사슬에서 떨어지기.',t=>{for(let j=0;j<2;j++){const at=t+j*2.4;sch(at,()=>{const g=bgeo(),x=P.x,y=P.y;NP({k:'circ',x,y,r:22,col:s5Col(),t0:at,t1:at+s5Tel(),t2:at+s5Tel()+.6,dmg:12});s5Beam(at+.75,[g.x,g.coreY],[x,y],7,s5Col(),.65)})}return 3.15+s5Tel()+.7});
defPat('s5Choir','진주의 교대 합창','all',8,'홀수 줄과 짝수 줄이 번갈아 울린다. 꺼진 줄로 이동.',t=>{for(let j=0;j<3;j++)for(let i=0;i<6;i++)if(i%2===j%2){const x=AX+(i+.5)*AW/6;s5Beam(t+j*1.5,[x,AY],[x,AY+AH],10)}return 3+s5Tel()+.6});
defPat('s5Sonar','귀환 음파','all',8,'음파 벽의 밝게 열린 틈으로 통과. 두 번째 틈은 반대편.',t=>{s5Wave(t,true,AX+AW*.32);s5Wave(t+2.6,true,AX+AW*.68);return 2.6+s5Tel()+3.5});
defPat('s5Suture','전류 봉합','all',8,'바늘 자국이 아래에서 위로 이어진다. 전선이 아닌 넓은 옆 공간으로.',t=>{const n=3+G.phase;for(let j=0;j<n;j++){const at=t+j*.8;sch(at,()=>{const x=clamp(P.x,AX+24,AX+AW-24);s5Beam(at,[x-18,AY+AH],[x+18,AY],7)})}return (n-1)*.8+s5Tel()+.6});
defPat('s5Octave','여덟 종의 판결','all',9,'여덟 종이 차례대로 바닥을 친다. 예고 원을 따라가지 말고 빈 공간으로.',t=>{const n=8,rx=AW*.34,ry=AH*.32;for(let i=0;i<n;i++){const a=i*TAU/n;NP({k:'circ',x:AX+AW/2+Math.cos(a)*rx,y:AY+AH/2+Math.sin(a)*ry,r:17,t0:t+i*.55,t1:t+i*.55+s5Tel(),t2:t+i*.55+s5Tel()+.45,col:s5Col(),label:String(i+1),dmg:10})}return 3.85+s5Tel()+.5});
defPat('s5Whale','뒤집히는 모래바다','all',9,'첫 파도는 위에서, 다음 파도는 옆에서 온다. 틈을 각각 확인.',t=>{s5Wave(t,true,AX+AW*.5);s5Wave(t+3,false,AY+AH*.58);return 3+s5Tel()+3.5});
defPat('s5Archive','삭제되지 않은 기록','all',9,'기록된 내 위치에 잉크가 떨어진다. 지나온 자리에 바로 되돌아가지 않기.',t=>s5Drops(t,5+G.phase,0));
defPat('s5Heart','세 번의 귀환종','all',12,'첫 종: 세로 줄, 둘째: 가로 줄, 셋째: 틈 있는 파도. 차례를 기억.',t=>{for(const q of [.23,.77])s5Beam(t,[AX+AW*q,AY],[AX+AW*q,AY+AH],10);for(const q of [.25,.75])s5Beam(t+2.3,[AX,AY+AH*q],[AX+AW,AY+AH*q],9);s5Wave(t+4.6,true,AX+AW*.5);return 4.6+s5Tel()+3.5});
defPat('s5Foam','떠오르는 기포','all',7,'기포가 바닥에서 떠오른다. 두 칸마다 남은 틈을 이용.',t=>{for(let i=0;i<9;i++){if(i%3===1)continue;const x=AX+AW*(i+.5)/9;NP({k:'orb',sty:'default',r:5,col:s5Col(),t0:t,t1:t+s5Tel(),t2:t+s5Tel()+4,pos:b=>[x+Math.sin((b-t)*2+i)*8,AY+AH-clamp((b-t-s5Tel())/4,0,1)*AH],ray:-Math.PI/2,rayL:40,dmg:9})}return s5Tel()+4});
defPat('s5Undertow','엇갈린 해류','all',7,'가로 해류가 남긴 통로로 이동.',t=>s5Wave(t,false,AY+AH*.5));
for(const [k,b] of S5.entries()){const cfg={bw:k===7?24:18,bh:k===0?24:18,base:'hover',head:'visor',arms:'piston',ex:[]};C3BOSS[b.art]={base:b.base,c:b.c,pal:[b.dark,'#081b2b',b.c,'#e6f5de'],cfg,th:b.base,deck:[[b.sig,5,0,'S'],['s5Foam',2,1],['s5Undertow',2,2]]};C3MUS[b.art]={title:b.title,tag:'심해의 박동',bpm:b.bpm,root:43+k%5,sc:k===3?'dor':'min',pr:k%2?[0,3,5,4]:[0,5,3,4],cp:{duty:k%2?.25:.5,bass:k%3?'oct':'chug',dr:k===7?'half':'break',arp:k%2,hook:k%2?'soar':'baroque'}}}
function s5Backdrop(c,k,T,w=480,h=270){const b=S5[k],g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#071928');g.addColorStop(1,b.dark);c.fillStyle=g;c.fillRect(0,0,w,h);c.save();c.scale(w/480,h/270);for(let i=0;i<6;i++){const x=i*90-30;c.fillStyle='#a0e2de';c.globalAlpha=.035;c.beginPath();c.moveTo(x,0);c.lineTo(x+16,0);c.lineTo(x+70,240);c.lineTo(x+30,240);c.fill()}c.globalAlpha=1;
 for(let i=0;i<10;i++){const x=i*53;c.fillStyle='#122c3b';c.fillRect(x,175-(i%3)*20,36,95);c.fillStyle='#0b202e';c.fillRect(x+6,183-(i%3)*20,24,42)}
 // Each arena has its own architectural landmark.
 c.strokeStyle=b.c;c.lineWidth=2;c.globalAlpha=.2;if(k===0){c.fillStyle=b.c;c.fillRect(370,65,22,145);c.fillRect(365,60,32,8)}else if(k===1||k===8){for(let i=0;i<12;i++){const x=24+i*39;c.beginPath();c.moveTo(x,220);c.lineTo(x+Math.sin(i)*14,170-i%3*12);c.lineTo(x-10,140-i%4*10);c.stroke()}}else if(k===2||k===9){for(let i=0;i<3;i++){c.beginPath();c.arc(240,155,55+i*24,Math.PI,TAU);c.stroke()}}else if(k===3||k===6){for(let i=0;i<7;i++)c.strokeRect(100+i*42,70+Math.abs(3-i)*13,16,140)}else if(k===4){c.beginPath();c.moveTo(65,190);c.lineTo(100,225);c.lineTo(385,225);c.lineTo(435,170);c.closePath();c.stroke()}else if(k===5){for(let i=0;i<5;i++){c.beginPath();c.moveTo(0,100+i*20);for(let x=0;x<=480;x+=12)c.lineTo(x,100+i*20+Math.sin(x*.035+i)*10);c.stroke()}}else{c.beginPath();c.moveTo(130,45);c.lineTo(350,45);c.lineTo(130,225);c.lineTo(350,225);c.closePath();c.stroke()}c.globalAlpha=1;
 c.fillStyle='#0a1e29';c.fillRect(0,232,480,38);for(let i=0;i<26;i++){const q=(T*.04+i/26)%1;c.globalAlpha=Math.sin(q*Math.PI)*.3;c.fillStyle=b.c;c.fillRect((i*67)%480,240-q*225,1+i%2,1+i%2)}c.restore()}
{const base=c3PaintArena;c3PaintArena=function(c,art){const k=S5.findIndex(b=>b.art===art);if(k<0)return base.apply(this,arguments);s5Backdrop(c,k,0,W,H);c.fillStyle='#06111e';c.fillRect(0,0,W,AY);c.fillRect(0,AY+AH,W,H-AY-AH)}}
function s5Shot(k,lines,d=3200,kind='meet'){return {d,lines,la:500,draw(c,T){s5Backdrop(c,k,T);const b=S5[k];if(kind==='memory'){scSepia(c,.22);scTxt(c,b.title,240,38,11,b.c,scCl(T*2))}const q=scE(T/1.5),y=kind==='meet'?225+(1-q)*28:224;scGlow(c,315,y-50,45,b.c,.3*q);c3ArtOn(c,b.art,315,y,performance.now(),2.7,{pulse:.1,open:kind==='memory'?.4:0});scHero(c,112,231,2,T);scTxt(c,b.place,22,30,10,'#d6eee6',scCl(T*2),'left')}}}
function s5Prologue(){return [s5Shot(0,[['','별들이 제자리로 돌아온 다음 날, 시계골의 종에서 소리가 사라졌다.'],['하루','움직이고 있는데… 아무 소리도 안 나.']],4200),s5Shot(1,[['똑딱','소리가 없어지는 게 아니야. 바다 쪽으로 흘러가고 있어.'],['','썰물 아래에서, 오래된 해저 방재청으로 향하는 길이 드러났다.']],4200),s5Shot(9,[['시설 방송','관리자 미귀환. 무음 격리를 유지합니다.'],['하루','누가 아직 기다리고 있는 거야. 우리가 가 보자.']],3800)]}
function s5Go(k,first=false){if(!s5Unlocked()||k>s5Save().ci||!S5[k])return;initAudio();s5Close();const seq=first?s5Prologue():[];seq.push(s5Shot(k,S5[k].intro,4200));scPlay(seq,()=>s5Fight(k,false))}
function s5Fight(k,practice=false,rush=false){const b=S5[k];if(!b||(!practice&&(!s5Unlocked()||k>s5Save().ci)))return;s5Close();initAudio();story=false;enterGame();CS=null;c3SwapIn({art:b.art,base:b.base,name:b.name,en:b.en,epi:b.title,phase:['수압이 높아진다!','봉인된 소리가 넘쳐난다!'],dying:'…신호를… 들었다…'});startFight(b.base,false);G.s5=k;G.s5Practice=practice;G.s5Rush=rush;G.hp=G.maxHp=Math.round((7600+k*820)*(DF_HP[diff]||1));$('bossName').textContent=b.name+' · ABYSS';$('bvTitle').textContent='CHAPTER 5 · ABYSS '+(k+1)+'/10'+(practice?' · 시연':'');if(!practice&&!rush){G.afterIntro=()=>beginCount();if(G.cine)G.cine.dur=0}}
function s5End(won){if(!G||G.state==='result')return;const k=G.s5,b=S5[k],demo=G.s5Practice,rush=G.s5Rush,info=rplInfo(won),rank=G.hits===0?'P':G.hits<=2?'S':G.hits<=4?'A':G.hits<=7?'B':'C';G.state='result';G.won=won;stopMusic();c3SwapOut();rplStop(demo?null:info);let coins=0;
 if(won&&!demo){const s=s5Save(),o='PSABC';if(!s.best[k]||o.indexOf(rank)<o.indexOf(s.best[k]))s.best[k]=rank;if(!rush)s.ci=Math.max(s.ci||0,k+1);coins=210+k*45+(rank==='P'?200:rank==='S'?100:40);saveData.coins=(saveData.coins||0)+coins;saveNow()}
 const result=()=>{const btns=[['다시 도전',()=>s5Fight(k,demo,rush),!won]];if(won&&!demo&&!rush&&k<9)btns.push(['다음 수문 →',()=>s5Go(k+1),true]);btns.push(['보스 목록',()=>{toLobby();s5Open(k)},false],['로비로',toLobby,false]);showOverlay(demo?'CHAPTER 5 · 시연':'CHAPTER 5 · ABYSS',won?b.name+' · 신호 해방':'잠시 물러났다',demo?'시연 전투는 진행도·보상·기록에 반영되지 않습니다.':won?'RANK '+rank+' · 🪙 +'+coins+'<br>해방한 수문 '+s5Save().ci+'/10':'다시 도전하여 다음 신호를 찾으세요.',btns)};
 if(!won||demo||rush){result();return}const seq=[s5Shot(k,b.outro,4400,'memory')];if(k===9)seq.push(s5Shot(0,[['','갇혀 있던 소리들이 한꺼번에 터지지 않고, 세 번의 종을 따라 차례로 수면 위로 올랐다.'],['똑딱','들려? 마을 사람들이 웃고 있어.']],4400,'memory'),s5Shot(9,[['무음의 심장','내 임무는 침묵을 지키는 것이… 아니었구나.'],['하루','응. 돌아올 곳을 지키는 거였어.'],['','바다가 처음으로 조용히 잠들었다. 이번에는 기다림이 아닌, 안식이었다.']],5200,'memory'));scPlay(seq,result)}
{const base=fightEnd;fightEnd=function(won){if(Q19.practice)return base.apply(this,arguments);if(G&&G.s5!=null)return s5End(won);return base.apply(this,arguments)}}
{const base=updateDying;updateDying=function(now){if(G&&G.s5!=null&&now-G.dyingAt>1100){fightEnd(true);return}return base.apply(this,arguments)}}
// Avoid base-chapter revival stories on a chapter 5 boss.
{const base=tryRevive;tryRevive=function(){if(G&&G.s5!=null)return false;return base.apply(this,arguments)}}

for(const b of S5){const base=MV[b.sig];MV[b.sig]=t=>{npWarn(t,.65);npEye(t,t+s5Tel(),t+s5Tel()+.5);return base(t)}}

for(const id of S5.map(b=>b.sig).concat(['s5Foam','s5Undertow'])){const base=MV[id];MV[id]=function(){const self=this,args=arguments;return q19Run(id,()=>base.apply(self,args))}}

function s5Close(){if(S5UI.open)rpMusStop();S5UI.open=false;const m=$('s5Panel');if(m)m.remove();cancelAnimationFrame(S5UI.raf)}
function s5Open(k=0){s5Close();S5UI.open=true;S5UI.sel=clamp(k,0,9);const m=document.createElement('div');m.id='s5Panel';m.innerHTML='<section class="s5Box"><header><div><small>CHAPTER 5 · ABYSS</small><h2>종소리 없는 바다</h2></div><button class="gmBtn" id="s5Close">닫기 ✕</button></header><p class="s5Story">별이 돌아온 다음 날, 마을의 종소리가 바다로 사라졌다.<br>1막 · 사라진 신호를 따라 잠수 → 2막 · 돌아오지 않은 관리자의 기록 → 3막 · 세 번의 귀환종으로 격리 해제</p><div class="s5Layout"><div class="s5Roster"></div><article><canvas id="s5Preview" width="480" height="270"></canvas><h3 id="s5Name"></h3><p id="s5Shape"></p><p id="s5Tip"></p><div class="s5Record"></div><div class="s5Actions"></div><section class="s5Music"><button class="gmBtn" id="s5MusicBtn">▶ 음악 듣기</button><span id="s5MusicTime"></span><input id="s5Seek" type="range" min="0" max="1" step=".1" value="0" aria-label="챕터 5 음악 재생 위치"><small id="s5MusicLabel"></small></section></article></div></section>';
 (document.fullscreenElement||document.body).appendChild(m);$('s5Close').onclick=s5Close;m.addEventListener('pointerdown',e=>e.stopPropagation());const roster=m.querySelector('.s5Roster');S5.forEach((b,i)=>{const button=document.createElement('button');button.className='s5Tile';button.innerHTML='<canvas width="96" height="88"></canvas><small>'+String(i+1).padStart(2,'0')+'</small><b>'+b.name+'</b>';button.onclick=()=>{rpMusStop();S5UI.sel=i;s5PanelInfo()};roster.appendChild(button);const c=button.querySelector('canvas').getContext('2d');c.imageSmoothingEnabled=false;c3ArtOn(c,b.art,48,82,0,1.4,{still:true})});
 $('s5MusicBtn').onclick=()=>{rpMusToggle()};$('s5Seek').oninput=e=>rpMusSeek(+e.target.value);s5PanelInfo();
 const tick=now=>{if(!S5UI.open||!$('s5Preview'))return;const b=S5[S5UI.sel],c=$('s5Preview').getContext('2d');c.imageSmoothingEnabled=false;s5Backdrop(c,S5UI.sel,now/1000);c3ArtOn(c,b.art,240,240,now,3.5,{pulse:.1});const pos=rpMusPosition();$('s5MusicTime').textContent=rpMusicTime(pos)+' / '+rpMusicTime(RPM.duration);$('s5Seek').value=pos;$('s5MusicBtn').textContent=RPM.on?'⏸ 일시정지':'▶ 음악 듣기';S5UI.raf=requestAnimationFrame(tick)};S5UI.raf=requestAnimationFrame(tick)}
function s5PanelInfo(){const k=S5UI.sel,b=S5[k],s=s5Save(),m=$('s5Panel');if(!m)return;m.querySelectorAll('.s5Tile').forEach((e,i)=>e.classList.toggle('on',i===k));$('s5Name').textContent=b.name+' · '+b.en;$('s5Shape').textContent=b.shape;$('s5Tip').textContent='대표 공격 · '+ATK_NAME[b.sig]+' — '+ATK_TIP[b.sig];m.querySelector('.s5Record').textContent='기록 '+(s.best[k]||'—')+' · '+b.place+' · '+(b.musicBpm||b.bpm)+' BPM';
 const a=m.querySelector('.s5Actions');a.replaceChildren();const add=(label,fn,disabled)=>{const x=document.createElement('button');x.className='gmBtn';x.textContent=label;x.disabled=!!disabled;x.onclick=fn;a.appendChild(x)};const locked=!s5Unlocked()||k>(s.ci||0);add(locked?'🔒 스토리 전투':'▶ 스토리 전투',()=>s5Go(k,k===0),locked);add('⚔ 보스 러쉬',()=>s5Fight(k,false,true),locked);add('외형·패턴 시연 (기록 없음)',()=>s5Fight(k,true));if(locked){const p=document.createElement('p');p.textContent=!s5Unlocked()?'스토리는 챕터 4를 완료하면 열립니다. 외형·음악·시연은 지금 확인할 수 있어요.':'앞선 수문을 해방하면 열립니다.';a.appendChild(p)}
 const ok=rpMusLoad();$('s5Seek').max=RPM.duration||1;$('s5Seek').disabled=!ok;$('s5MusicBtn').disabled=!ok;$('s5MusicLabel').textContent=RPM.loopOnly?'반복 구간 길이 · 막대를 끌어 이동':'곡 길이 · 막대를 끌어 이동'}
{const base=rpMusId;rpMusId=function(){return S5UI.open?S5[S5UI.sel].art:base.apply(this,arguments)}}
{const base=rpBpm;rpBpm=function(){return S5UI.open?S5[S5UI.sel].bpm:base.apply(this,arguments)}}
// Story dial and all menu entry points.
CS_CH.push({cv:'titleCv5',btn:'btnStory5',col:'#9de8dc',ang:90,num:'V',tag:'CHAPTER 5 · ABYSS',title:'종소리 없는 바다',desc:'별이 돌아온 다음 날, 마을의 종소리가 바다로 사라졌다. 하루와 똑딱은 아직 귀환 신호를 기다리는 해저 방재청으로 내려간다.',unit:'수문'});
{const c=document.createElement('canvas');c.id='titleCv5';c.width=480;c.height=190;c.style.display='none';document.body.appendChild(c);const b=document.createElement('button');b.id='btnStory5';b.hidden=true;b.textContent='▶ 심해의 수문으로';b.onclick=()=>s5Open(Math.min(9,s5Save().ci||0));document.body.appendChild(b)}
{const base=csLocked;csLocked=function(i){return i===4?!s5Unlocked():base.apply(this,arguments)}}
{const base=csInfo;csInfo=function(i){return i===4?s5Info():base.apply(this,arguments)}}
{const base=s_csPage;s_csPage=function(i){base.apply(this,arguments);if(i===4){const p=$('csPage'),l=p.querySelector('.csLock');if(l)l.textContent='🔒 챕터 4의 마지막 별을 클리어하면 열립니다.';const b=document.createElement('button');b.className='gmBtn';b.textContent='보스 10명 · 외형 / 음악 / 시연';b.onclick=()=>s5Open();p.querySelector('.csBtns').appendChild(b)}}}
{const base=menuTick;menuTick=function(now){base.apply(this,arguments);if(GM.scr==='story'){const cv=$('titleCv5');if(cv){const c=cv.getContext('2d');c.imageSmoothingEnabled=false;s5Backdrop(c,9,now/1000,480,190);c3ArtOn(c,S5[9].art,240,180,now,2.5,{pulse:.2})}}}}
function s5MenuEntries(){for(const [scr,id] of [['rush','s5RushTab'],['hall','s5HallTab']]){if($(id))continue;const page=$('gm'+scr[0].toUpperCase()+scr.slice(1));if(!page)continue;const host=scr==='rush'?page.querySelector('.gmTabs'):page.querySelector('.gmHead');const b=document.createElement('button');b.id=id;b.className='gmPill';b.textContent='CHAPTER 5 · ABYSS';b.onclick=()=>s5Open();if(host)host.appendChild(b);else page.prepend(b)}}
{const base=gmBuild;gmBuild=function(){base.apply(this,arguments);s5MenuEntries()}}
{const base=gmShow;gmShow=function(){base.apply(this,arguments);s5MenuEntries()}}
if(typeof KB!=='undefined')KB.pre.unshift(e=>{if(!S5UI.open)return false;if(e.type==='keydown'&&e.code==='Escape')s5Close();return true});
// Chapter-specific video metadata, including the chapter 5 gallery filter.
{const base=rplChapter;rplChapter=function(it){return S5.some(b=>b.art===it.key)?5:base.apply(this,arguments)}}
// Image replacement uses dedicated chapter 5 slots, never chapter 3 slots.
{const base=modSlots;modSlots=function(){return base().concat([{id:'bg5',name:'전투 배경 · 챕터 5',hint:''}],S5.map((b,k)=>({id:'c5boss'+k,name:'ABYSS '+String(k+1).padStart(2,'0')+' '+b.name,c5:k,hint:'아래쪽 가운데가 발밑이 되게'})))}}
{const base=c3Art;c3Art=function(c,B,x,y,t,o,u,id){const k=S5.findIndex(b=>b.art===id),M=k>=0&&MODS['c5boss'+k];if(M){modDrawBossImg(c,M,B,x,y,t,o||{},u||U);return}return base.apply(this,arguments)}}
(function(){const s=document.createElement('style');s.textContent=`#s5Panel{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;background:#020d18ef;padding:10px;color:#e6f3ec;font-family:inherit}.s5Box{width:min(1100px,100%);max-height:95dvh;overflow:auto;border:1px solid #6caaa8;border-radius:16px;background:#0c1a26;padding:16px;box-sizing:border-box}.s5Box header{display:flex;align-items:center;justify-content:space-between}.s5Box h2{margin:4px 0;font-size:24px}.s5Box small{color:#9ec6c1}.s5Story{line-height:1.7;color:#c0d8d4;font-size:13px}.s5Layout{display:grid;grid-template-columns:1fr 1.3fr;gap:16px}.s5Roster{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;align-content:start}.s5Tile{background:#102734;border:1px solid #2d535a;color:#d1e7e0;display:flex;align-items:center;flex-direction:column;border-radius:8px;padding:6px;font:inherit;cursor:pointer}.s5Tile canvas{image-rendering:pixelated;max-width:100%}.s5Tile b{font-size:12px}.s5Tile.on{outline:2px solid #adedd5;background:#20414b}#s5Preview{width:100%;height:auto;image-rendering:pixelated;aspect-ratio:16/9;border-radius:10px}.s5Layout article{line-height:1.6;min-width:0}.s5Layout h3{margin:8px 0}.s5Layout p{font-size:13px;color:#c6d7d6}.s5Record{color:#ffd699;font-size:13px}.s5Actions{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}.s5Actions p{width:100%;margin:0}.s5Actions button:disabled{opacity:.45}.s5Music{padding:12px;border:1px solid #456663;border-radius:8px}.s5Music input{width:100%;accent-color:#9de8dc}.s5Music span{float:right;font-size:12px}#gmRush .gmTabs{flex-wrap:wrap}#s5HallTab{align-self:flex-start;margin:8px} @media(max-width:620px){.s5Layout{grid-template-columns:1fr}.s5Roster{grid-template-columns:repeat(5,1fr);gap:4px}.s5Tile b{font-size:10px}.s5Tile canvas{height:auto}.s5Box{padding:10px}.s5Box h2{font-size:20px}}`;document.head.appendChild(s)})();
/* CHAPTER5_24_END */

/* ABYSS_REDESIGN_25_BEGIN */
function s5Gem25(A,x,y,r,col){A.P([[x,y-r],[x+r*.75,y],[x,y+r],[x-r*.75,y]],'#0a1828');A.P([[x,y-r*.85],[x+r*.55,y],[x,y+r*.7],[x-r*.5,y]],col);A.L(x,y-r*.6,x-r*.25,y,'#fff6df',.4);A.glow(x,y,r*2,col,.35)}
function s5Blade25(A,x,y,s,len,col){A.P([[x,y],[x+s*len,y-4],[x+s*(len-2),y+1],[x+s*2,y+5]],'#0b2133');A.P([[x+s,y],[x+s*(len-1),y-3],[x+s*(len-3),y+1]],col);A.L(x+s,y,x+s*(len-2),y-2,'#e3f6ec',.35)}
function s5Halo25(A,x,y,rx,ry,t,col,alpha=.55){for(let i=0;i<48;i++){if(i%12===11)continue;const a=i*TAU/48+t,b=a+TAU/48;A.L(x+Math.cos(a)*rx,y+Math.sin(a)*ry,x+Math.cos(b)*rx,y+Math.sin(b)*ry,col,.35,alpha)}for(let i=0;i<4;i++){const a=i*TAU/4+t;s5Gem25(A,x+Math.cos(a)*rx,y+Math.sin(a)*ry,1.25,col)}}
for(const [k,b] of S5.entries()){const base=MON.reg['c_'+b.art];MON.reg['c_'+b.art]=A=>{const t=A.t,phase=(typeof G!=='undefined'&&G&&G.s5===k&&mode==='boss')?G.phase||0:0,charge=Math.max(A.eyeC||0,A.win(b.sig)||0),hot=.35+charge*.55+phase*.09,cy=[-10,-18,-17,-19,-16,-17,-24,-18,-19,-19][k]+A.bob*.2;
 // Back layers expand each silhouette; all remain inside the native sprite bounds.
 if(k===0){for(const s of [-1,1]){s5Blade25(A,s*8,-17,s,15,'#568c93');A.L(s*12,-17,s*19,-26,'#769e9b',1.2);A.C(s*19,-26,3.8,'#11293a');A.ring(s*19,-26,3.5,.8,'#d5b271');A.C(s*19,-26,1.8,'#ff9d67');A.glow(s*19,-26,5,'#ff915e',hot)}}
 if(k===1){for(const s of [-1,1])for(let j=0;j<3;j++){const yy=-23+j*6+Math.sin(t*2+j)*1.2;s5Blade25(A,s*6,yy,s,21-j*3,['#76c5c0','#527d9c','#c8b879'][j]);A.L(s*7,yy,s*26,yy-2,'#8dfff0',.35,.5)}}
 if(k===2){for(const s of [-1,1]){A.P([[s*4,-32],[s*12,-24],[s*17,2],[s*10,-2],[s*7,4],[s*3,-8]],'#742f4b');A.L(s*8,-21,s*13,0,'#dd8a70',.6);s5Blade25(A,s*5,-27,s,10,'#9daaa0')}}
 if(k===3){s5Halo25(A,0,-22,22,13,t*.25,'#b6a5ff',.35);for(let i=0;i<6;i++){const a=i*TAU/6+t*.25;s5Gem25(A,Math.cos(a)*22,-22+Math.sin(a)*13,2,'#e4c3ff')}for(let j=0;j<5;j++){const x=(j-2)*5;A.L(x,-19,x+Math.sin(t*2+j)*4,3,'#955ec6',.55,.6)}}
 if(k===4){for(const s of [-1,1]){s5Blade25(A,s*7,-26,s,13,'#3e859e');A.box(s<0?-20:14,-29,6,5,'#668b93','#123449','#e3c38a');A.L(s*17,-29,s*17,-35,'#8bafa9',1.4);A.C(s*17,-35,1.5,'#ffd39a')}s5Halo25(A,-2,-16,20,15,-t*.18,'#c8b67e',.4)}
 if(k===5){for(let j=4;j<28;j+=3){const x=Math.sin(j*.16+t*.8)*14,y=-4-j*1.05,s=j%2?1:-1;s5Blade25(A,x,y,s,7,'#759db8');A.L(x,y,x+s*8,y-3,'#bcff9c',.35)}for(const s of [-1,1]){let px=s*21,py=-38;for(let j=1;j<15;j++){const x=s*(20+Math.sin(t*4+j)*3),y=-38+j*2.7;A.L(px,py,x,y,'#a8edca',.35,.35);px=x;py=y}}}
 if(k===6){s5Halo25(A,0,-24,21,17,t*.15,'#d0ac6e',.4);for(let i=0;i<8;i++){const a=i*TAU/8+t*.15,x=Math.cos(a)*21,y=-24+Math.sin(a)*17;A.P([[x-1.7,y-2],[x+1.7,y-2],[x+2.3,y+1],[x-2.3,y+1]],'#b48b6e');A.C(x,y+1.7,.5,'#ffe8a2')}}
 if(k===7){for(const s of [-1,1]){s5Blade25(A,s*5,-19,s,23,'#5f86a8');s5Blade25(A,s*3,-13,s,19,'#93b5bf')}s5Halo25(A,-1,-18,22,15,-t*.16,'#e5cda0',.45)}
 if(k===8){for(const s of [-1,1]){A.P([[s*5,-21],[s*17,-28],[s*23,-12],[s*18,1],[s*8,-3]],'#22374d');A.L(s*17,-27,s*19,-3,'#5caf9f',.6);for(let j=0;j<4;j++){const x=s*(17+j%2*3),y=-24+j*6;A.box(x-2,y,4,3,'#b3a487','#355961','#f1d7a3')}}}
 if(k===9){for(const s of [-1,1])for(let j=0;j<4;j++){const yy=-31+j*7;A.P([[s*6,yy],[s*18,yy-3],[s*28,yy+3],[s*19,yy+2],[s*25,yy+8],[s*10,yy+6]],j%2?'#204a65':'#327579');A.L(s*10,yy,s*25,yy+3,'#b9ebd2',.5)}s5Halo25(A,0,-20,27,21,-t*.1,'#f0d293',.6)}
 base(A);A.texA=.8;A.bbox=[-28,-43,28,6];
 // Foreground armor, weapon edges and animated power sources.
 if(k===0){for(const s of [-1,1]){const y=cy+Math.sin(t*2+s);A.P([[s*14,y-3],[s*21,y-7],[s*28,y-4],[s*23,y-1],[s*27,y+5],[s*20,y+6],[s*15,y+2]],'#284f61');A.L(s*19,y-4,s*27,y-3,'#eec77b',.7);A.L(s*21,y+4,s*26,y+4,'#eec77b',.7);s5Gem25(A,s*19,y,2.3,'#ffbe78')}A.R(-4,-39,8,1,'#fff0bf');A.glow(0,-35,9,'#ffd166',hot);s5Halo25(A,0,-35,10,3,t*.8,'#ffc676',.6)}
 if(k===1){for(const s of [-1,1])for(let j=0;j<4;j++){const x=s*(7+j*4),y=cy-1+j%2*2;A.L(x,y,x+s*2,y-3,'#d9fff0',.45);A.L(x,y,x+s*2,y+2,'#d9fff0',.3)}A.ring(0,cy,5,.75,'#e1b96e');s5Gem25(A,0,cy,2.1,'#6dffe7');A.glow(0,cy,8,'#8bffe5',hot)}
 if(k===2){for(const s of [-1,1]){A.P([[s*6,-27],[s*12,-25],[s*11,-19],[s*5,-20]],'#69869a');A.L(s*7,-26,s*11,-24,'#e7d6a4',.7);s5Gem25(A,s*8,-23,1.3,'#ffac78')}A.box(-6,-35,12,9,'#264559','#132936','#a9b8b0');A.R(-4,-32,8,1.5,'#ffbd75');A.R(-.3,-33,.6,3,'#fff0b9');A.L(-6,-36,-9,-40,'#d2c299',1);A.L(6,-36,9,-40,'#d2c299',1);A.ring(0,cy,4.3,.75,'#b9a379');A.glow(0,-31,8,'#ffaf77',hot)}
 if(k===3){A.P([[-12,cy],[-9,cy-8],[0,cy-12],[9,cy-8],[12,cy]],'#48375e');for(let j=-2;j<=2;j++){A.P([[j*4-1,cy-6],[j*4,cy-11-Math.abs(j)],[j*4+1,cy-6]],'#e9d3aa');s5Gem25(A,j*4,cy-5,1.2,'#e5b5ff')}for(let j=0;j<5;j++){const x=(j-2)*4,y=cy+3+Math.sin(t*2+j);A.glow(x,y,3,'#ecbfff',hot*.5)}A.glow(0,cy,13,'#af7aff',.18+charge*.25)}
 if(k===4){for(let j=0;j<9;j++){const a=j*TAU/9-t*.3;A.P([[-2+Math.cos(a)*13,cy+Math.sin(a)*10],[-2+Math.cos(a+.2)*16,cy+Math.sin(a+.2)*12],[-2+Math.cos(a+.4)*13,cy+Math.sin(a+.4)*10]],'#a6b9af');s5Rivet(A,-2+Math.cos(a)*14,cy+Math.sin(a)*11)}A.box(-22,cy-5,7,4,'#8cb0b4','#153346','#e8d9a9');A.C(-22,cy-3,1.3,'#7ff7ff');A.glow(-22,cy-3,5,'#8ff5ff',hot)}
 if(k===5){const x=Math.sin(t*.8)*14;A.P([[x-4,-8],[x+3,-10],[x+8,-6],[x+4,1],[x-4,-1]],'#568d91');for(const s of [-1,1])A.L(x,-6,x+s*5,-13,'#d0efb2',.8);A.R(x+2,-6,3,1,'#d1ff9c');A.glow(x+4,-5,6,'#baff8b',hot);A.L(x+6,-3,x+13,-5,'#e9ebae',.8)}
 if(k===6){A.P([[-7,-32],[7,-32],[6,-22],[0,-17],[-6,-22]],'#d5c8b4');A.P([[-5,-29],[-1,-28],[-2,-25],[-5,-25]],'#382940');A.P([[5,-29],[1,-28],[2,-25],[5,-25]],'#382940');A.L(-4,-27,-2,-27,'#ff86af',.6);A.L(2,-27,4,-27,'#ff86af',.6);for(let j=-2;j<=2;j++)A.P([[j*2-1,-33],[j*2,-39-Math.abs(j)],[j*2+1,-33]],'#d7b980');A.glow(0,-26,8,'#ff89b4',hot*.6)}
 if(k===7){for(let j=0;j<7;j++){const x=-15+j*4;A.P([[x,cy-7],[x+2,cy-11],[x+5,cy-7],[x+2,cy-5]],'#a9b9b3');A.L(x,cy-7,x+2,cy-10,'#f2e0b8',.5)}A.ring(-1,cy+1,10,.6,'#e8d2a1');for(let j=0;j<4;j++)A.L(-8+j*5,cy-6,-8+j*5,cy+7,'#c9d5c3',.4);A.glow(-1,cy,10,'#ffd99b',hot*.4)}
 if(k===8){A.P([[-5,-32],[5,-32],[6,-27],[3,-22],[-3,-22],[-6,-27]],'#c9d4be');A.E(-2,-28,1.6,1.2,'#1a3746');A.E(2,-28,1.6,1.2,'#1a3746');A.C(-2,-28,.5,'#a6fff1');A.C(2,-28,.5,'#a6fff1');for(let j=-1;j<=1;j++)A.R(j*1.2,-24,.5,1.3,'#33505a');s5Gem25(A,0,-33,1.5,'#ffca98');A.glow(0,-28,6,'#89ffe4',hot*.45)}
 if(k===9){A.P([[-7,-34],[0,-38],[7,-34],[5,-29],[0,-26],[-5,-29]],'#1b3b50');A.L(-5,-33,-1,-32,'#b8fff0',.8);A.L(1,-32,5,-33,'#b8fff0',.8);A.P([[-3,-37],[0,-43],[3,-37]],'#ffe2a0');s5Gem25(A,0,-39,1.6,'#9cffe6');A.ring(0,cy+2,7,1,'#e6cc94');A.ring(0,cy+2,5.7,.5,'#edffdb');A.glow(0,cy+2,11,'#8fffe2',hot*.6);for(const s of [-1,1])s5Gem25(A,s*12,-16,2.2,'#bcffdf')}
 for(let j=0;j<6;j++){const p=(t*.28+j/6)%1,x=Math.sin(j*2.4+t*.4)*23,y=4-p*40;A.spark(x,y,.3+p*.35,b.c,Math.sin(p*Math.PI)*.5)}
};}
const S5_LOOK25=['쌍렌즈 어깨포·거대 장갑 집게·회전 등대 광륜을 두른 요새 갑각','겹겹의 칼날 날개와 금빛 나침반 코어를 가진 심해 가오리','뿔 달린 잠수 투구·보석 견갑·붉은 망토의 중장갑 닻 기사','수정 왕관·공전하는 진주·발광 촉수가 펼쳐지는 해저 성가대','장갑 나선 선체·쌍포탑·발광 주포로 무장한 심해 전함','갈고리 지느러미와 전류 띠, 용의 머리를 갖춘 봉합 장어','황금 관과 여덟 공전종, 붉은 눈의 의식 가면을 쓴 집행관','등의 수정 장갑과 거대한 지느러미, 모래 심장을 품은 고래','산호 왕관·해골 가면·떠 있는 문서 날개를 가진 기록관','다층 수문 날개·삼중 광륜·거대한 종 심장을 지닌 심해 군주'];
S5.forEach((b,k)=>b.shape=S5_LOOK25[k]);
const S5M25=[
 {bpm:158,root:45,sc:'hmin',p:[0,5,3,4],a:[0,0,7,null,6,4,3,4,0,0,7,9,7,6,4,null]},
 {bpm:166,root:47,sc:'min',p:[0,3,5,6],a:[4,7,6,4,2,null,4,6,7,9,7,4,6,4,2,null]},
 {bpm:152,root:42,sc:'hmin',p:[0,0,5,4],a:[0,null,0,1,4,null,3,1,0,null,7,6,4,3,1,null]},
 {bpm:164,root:48,sc:'hmin',p:[0,5,2,4],a:[7,null,6,4,5,4,2,null,7,9,11,9,7,6,4,null]},
 {bpm:160,root:43,sc:'dor',p:[0,3,6,4],a:[0,2,4,7,6,null,4,2,0,2,4,6,7,9,6,null]},
 {bpm:178,root:45,sc:'min',p:[0,6,5,4],a:[0,1,0,4,3,4,6,4,7,6,4,3,1,3,4,null]},
 {bpm:168,root:46,sc:'hmin',p:[0,4,5,4],a:[0,null,4,3,0,4,7,null,6,4,3,1,0,1,3,null]},
 {bpm:150,root:41,sc:'min',p:[0,5,3,6],a:[0,null,7,null,6,4,3,null,5,null,4,2,0,2,4,null]},
 {bpm:172,root:47,sc:'dor',p:[0,3,5,4],a:[4,3,2,0,4,6,7,null,9,7,6,4,3,4,6,null]},
 {bpm:176,root:45,sc:'hmin',p:[0,5,3,4],a:[0,4,7,9,7,4,3,4,6,7,9,11,9,7,6,null]}
];
const S5_FORM25=[['intro',4],['A',12],['B',8],['break',4],['A2',12],['B2',8],['peak',12],['out',4]];
function s5Section25(bar){let n=((bar%64)+64)%64;for(const [name,len] of S5_FORM25){if(n<len)return {name,bar:n,len};n-=len}}
for(const [k,b] of S5.entries()){b.musicBpm=S5M25[k].bpm;C3MUS[b.art].tag='ABYSS · 칩튠 배틀';}
{const base=c3MakeSong;c3MakeSong=function(art,bi){const S=base.apply(this,arguments),k=S5.findIndex(b=>b.art===art);if(k<0)return S;const m=S5M25[k];S.s5Mix25=k;S.root=m.root;S.scale=SC[m.sc];S.prog=m.p;S.musicBpm=m.bpm;S.duration25=64*4*60/m.bpm;S.vol=.17;S.title=S5[k].title+' · ABYSS BATTLE';return S}}
function s5Music25(n,delay,S){if(!audio||!Number.isFinite(delay))return;musVol(S.vol);const m=S5M25[S.s5Mix25],gameHalf=S.ms/2000,q=60/m.bpm/4,start=n*gameHalf,end=start+gameHalf,at0=audio.currentTime+delay;
 if(n<0){chipDrum(n%2?'hat':'kick',at0,.5);return}
 const first=Math.ceil(start/q-1e-7),last=Math.ceil(end/q-1e-7);
 for(let j=first;j<last;j++){if(RPM.routing&&j>=1024)continue;const bar=Math.floor(j/16),step=j%16,sec=s5Section25(bar),local=sec.bar,at=at0+j*q-start,deg=m.p[bar%4],root=noteOf(S,deg),intro=sec.name==='intro',quiet=sec.name==='break',peak=sec.name==='peak',out=sec.name==='out',fade=out?Math.max(.18,1-local/4):1;
  const kick=step===0||step===8||(!quiet&&(step===6||step===14)),snare=step===4||step===12;
  if(kick)chipDrum('kick',at,(quiet?.45:.9)*fade);if(snare&&!intro)chipDrum('snare',at,(quiet?.4:.85)*fade);if(step%2===0||peak)chipDrum('hat',at,(step%4===0?.35:.2)*fade);
  if(step===0&&local===0&&!quiet)chipDrum('crash',at,.6*fade);
  if(local%4===3&&step>=12&&!quiet&&!intro){chipDrum(step%2?'snare':'tom',at,(.4+(step-12)*.07)*fade)}
  // Galloping bass and offbeat chord stabs keep the melody forward.
  if(!quiet||step%4===0){const pitch=root-12+(step%4===2?12:0);chipNote('triangle',pitch,q*(quiet?3.4:.85),.19*fade,at);if(!intro&&!quiet&&step%2===0)chipNote('pulse',pitch,q*.65,.035*fade,at,{duty:.25,sus:.45})}
  if(step===2||step===10){for(const v of [0,2,4])chipNote('pulse',noteOf(S,deg+v)+12,q*1.35,(quiet?.009:.018)*fade,at,{duty:.5,sus:.4})}
  let ix=(step+((local%2)?8:0))%16,v=m.a[ix],secondary=sec.name==='B'||sec.name==='B2',lift=peak?12:0;
  if(secondary&&v!=null)v=7+(7-v);if(sec.name==='A2'&&step>=12&&v!=null)v+=2;
  if(intro&&local<2&&step%2!==0)v=null;if(quiet&&step%4!==0)v=null;if(out&&step%2!==0)v=null;
  if(typeof v==='number'){const midi=noteOf(S,v)+12+lift,len=q*(quiet?3.6:(step%4===0?1.5:.85));chipNote('pulse',midi,len,(quiet?.045:.075)*fade,at,{duty:secondary?.25:.125,vib:quiet?10:0,echo:q*3,sus:.58});if(peak||sec.name==='B2')chipNote('pulse',noteOf(S,v-2)+12+lift,len,.024*fade,at,{duty:.5,sus:.45})}
  if((peak||sec.name==='A2')&&step%2===1){chipNote('pulse',noteOf(S,deg+[0,2,4,7][step%4])+24,q*.7,.02*fade,at,{duty:.25})}
  if((quiet||out)&&step===0)for(const v of [0,2,4])voice('bell',noteOf(S,deg+v)+12,q*10,.016*fade,at);
 }
}
{const base=playSlot;playSlot=function(n,delay,S){if(S&&S.s5Mix25!=null)return s5Music25(n,delay,S);return base.apply(this,arguments)}}
{const base=rpMusLoad;rpMusLoad=function(){const ok=base.apply(this,arguments);if(ok&&RPM.S&&RPM.S.s5Mix25!=null){RPM.duration=RPM.S.duration25;RPM.loopOnly=false}return ok}}
/* ABYSS_REDESIGN_25_END */

/* Distinct ceremonial armor and weapon silhouettes, kept in the native sprite frame. */
for(const [k,b] of S5.entries()){const base=MON.reg['c_'+b.art];MON.reg['c_'+b.art]=function(A){base(A);const t=A.t,gold='#eed09a',ink='#142633',hi='#e0fff0';
 const plate=(x,y,w,h,c)=>{A.box(x,y,w,h,c,ink,gold);for(let i=1;i<w;i+=3)A.R(x+i,y+1,.45,.45,hi)};
 if(k===0){for(const s of [-1,1]){plate(s<0?-22:12,-25,10,5,'#426674');A.R(s<0?-24:20,-23,4,2,ink);A.R(s<0?-24:22,-22,2,.6,'#ffdf97');for(let j=0;j<3;j++)A.L(s*(17+j*2),-12,s*(18+j*2),-9,gold,.5)}plate(-5,-30,10,6,'#23465c');A.R(-3,-28,6,1,'#ffdb86');A.P([[-4,-41],[0,-43],[4,-41],[0,-40]],gold)}
 if(k===1){for(const s of [-1,1]){A.P([[s*4,-23],[s*17,-31],[s*27,-29],[s*18,-26],[s*10,-18]],'#224353');A.L(s*6,-23,s*25,-29,hi,.65);for(let j=0;j<4;j++)s5Gem25(A,s*(10+j*4),-25-j,.6,'#89ffea')}A.P([[-4,-22],[0,-29],[4,-22],[2,-17],[0,-15],[-2,-17]],'#d0c393');A.R(-2.5,-22,5,.8,'#163b4b');A.C(-1.5,-22,.5,'#83fff1');A.C(1.5,-22,.5,'#83fff1')}
 if(k===2){A.L(19,-37,19,1,'#172f3d',3);A.L(18.5,-37,18.5,1,gold,.7);A.P([[12,-8],[14,-2],[19,2],[25,-2],[27,-9],[23,-7],[22,-4],[19,-3],[16,-5],[15,-9]],'#88969c');A.L(12,-8,16,-5,hi,.6);A.L(22,-4,27,-9,hi,.6);A.L(14,-29,23,-29,gold,1.4);s5Gem25(A,19,-32,2,'#ffa96a');plate(-12,-17,9,13,'#375467');A.P([[-10,-14],[-5,-14],[-7.5,-7]],gold);A.R(-3,-29,6,1,'#151d2a');A.R(-2,-29,4,.5,'#ffae65')}
 if(k===3){for(let j=-3;j<=3;j++){const x=j*3,h=7-Math.abs(j);plate(x-1,-36-h,2,h,'#846693');A.R(x-.4,-35-h,.8,2,ink)}A.P([[-7,-26],[0,-30],[7,-26],[5,-21],[0,-19],[-5,-21]],'#e0cee1');A.L(-5,-25,-2,-24,'#62416f',.65);A.L(2,-24,5,-25,'#62416f',.65);s5Gem25(A,0,-23,1.4,'#ba77ee');for(let j=-2;j<=2;j++){const x=j*3;A.L(x,-17,x+Math.sin(t*2+j)*2,-4,gold,.4);A.C(x+Math.sin(t*2+j)*2,-3,1.2,'#f6dafa')}}
 if(k===4){plate(5,-28,12,5,'#466875');A.R(13,-27,13,2,ink);A.R(14,-27,12,.5,gold);A.R(25,-28,2,4,'#92bfc1');A.C(26,-26,.7,'#affff1');for(let j=0;j<3;j++){plate(-14+j*6,-8,5,3,'#3e6975');A.R(-13+j*6,-7,3,.6,'#80e3da')}A.P([[-12,-28],[-7,-33],[0,-33],[4,-29],[-3,-25]],'#234e65');A.L(-8,-30,0,-30,hi,.7)}
 if(k===5){for(let j=0;j<9;j++){const y=-34+j*3,x=Math.sin((30-j*3)*.16+t*.8)*14;A.P([[x-2,y],[x,y-2],[x+3,y],[x,y+2]],j%2?'#477b84':'#6898a0');A.L(x,y-1,x+2,y,'#ddeda9',.5)}const x=Math.sin(t*.8)*14;A.P([[x-5,-7],[x-7,-14],[x-2,-10],[x+2,-11],[x+5,-14],[x+5,-8],[x+9,-6],[x+7,-1],[x+2,1],[x-3,-2]],'#244856');A.L(x-4,-7,x+2,-9,gold,.6);A.R(x+2,-7,4,1,'#d1ff9a');for(let j=0;j<3;j++)A.P([[x+3+j,-2],[x+4+j,-2],[x+3.5+j,0]],hi)}
 if(k===6){for(const s of [-1,1]){A.P([[s*8,-20],[s*15,-15],[s*20,-3],[s*14,-7],[s*9,1],[s*5,-8]],'#4c304e');A.L(s*9,-18,s*15,-6,gold,.65);A.L(s*12,-16,s*18,-4,'#a66c89',.45)}A.R(-3,-22,6,.5,'#5a344d');A.L(0,-31,0,-23,gold,.6);s5Gem25(A,0,-33,1.5,'#f48db3');A.L(-24,-19,-16,-19,gold,.7);A.L(-20,-23,-20,-15,gold,.7);for(const s of [-1,1]){A.L(-20+s*4,-19,-20+s*4,-13,gold,.35);A.E(-20+s*4,-13,2,.7,'#e3c696')}}
 if(k===7){A.P([[-24,-20],[-17,-23],[-10,-20],[-14,-16],[-23,-16]],'#4b708c');A.L(-22,-20,-16,-20,gold,.8);A.C(-19,-19,.8,'#c4ffed');A.L(-23,-15,-14,-14,'#cad5c2',.5);A.P([[12,-17],[20,-26],[26,-29],[22,-20],[27,-15],[20,-15]],'#385b79');A.L(18,-20,25,-27,gold,.6);A.P([[-5,-23],[3,-23],[0,-17],[3,-11],[-5,-11],[-2,-17]],'#ffe0a1');A.L(-5,-23,3,-23,hi,.8);A.L(-5,-11,3,-11,hi,.8)}
 if(k===8){for(const s of [-1,1]){A.P([[s*9,-16],[s*17,-20],[s*26,-16],[s*24,-7],[s*17,-10],[s*10,-7]],'#e0cea8');A.L(s*17,-19,s*17,-10,'#726454',.6);for(let j=0;j<3;j++){A.L(s*11,-14+j*2,s*15,-15+j*2,'#50817c',.4);A.L(s*19,-15+j*2,s*23,-14+j*2,'#50817c',.4)}}A.P([[-7,-32],[-11,-38],[-6,-36],[-4,-42],[0,-37],[4,-42],[6,-36],[11,-38],[7,-32]],'#447b77');A.L(-4,-41,0,-36,gold,.5);A.L(4,-41,0,-36,gold,.5);s5Gem25(A,0,-35,1.4,'#ffb184')}
 if(k===9){for(const s of [-1,1]){for(let j=0;j<3;j++){A.P([[s*(9+j*5),-28+j*4],[s*(13+j*5),-31+j*4],[s*(16+j*5),-26+j*4],[s*(12+j*5),-22+j*4]],'#315969');A.L(s*(10+j*5),-28+j*4,s*(13+j*5),-30+j*4,gold,.65)}A.P([[s*4,-8],[s*12,-5],[s*17,4],[s*8,0]],'#20495d');A.L(s*6,-7,s*15,2,gold,.6)}A.P([[-5,-35],[-7,-40],[-3,-38],[0,-43],[3,-38],[7,-40],[5,-35]],gold);A.P([[-5,-32],[0,-34],[5,-32],[3,-27],[0,-25],[-3,-27]],'#122938');A.L(-4,-31,-1,-30,hi,.7);A.L(1,-30,4,-31,hi,.7);s5Gem25(A,0,-18,3,'#b6ffdf');A.ring(0,-18,4,.6,gold)}
};}
const S5_LOOK26=['황금 등대 관·쌍포탑·각인 장갑 집게를 갖춘 이동 해안 요새','날카로운 상층 칼날 날개·금빛 가면·항로 보석이 빛나는 가오리','거대한 장식 닻·문장 방패·붉은 망토·발광 투구의 심해 기사','일곱 오르간 관·진주 목걸이·백색 의식 가면을 두른 성가대','장거리 측면 주포·장갑 함교·청록 기관창을 갖춘 나선 전함','겹비늘 등갑·쌍뿔 용두·송곳니와 전기 갈기를 가진 장어','심판의 저울·금실 예복·왕관 가면·여덟 종을 두른 집행관','금빛 모래시계 심장·장갑 주둥이·삼지창 꼬리의 고래','뿔 산호 왕관·해골 얼굴·펼쳐진 마도서를 든 심해 기록관','삼지 왕관·다층 보석 날개·의식 장갑·빛나는 종 심장의 군주'];
S5.forEach((b,k)=>b.shape=S5_LOOK26[k]);

/* ABYSS: ten independently arranged battle themes. */
const S5M26=[
 {tag:'군악 행진 · 브라스',bpm:156,meter:16,lead:'brass',bass:'triangle',root:45,sc:'hmin',p:[0,0,5,4],a:[0,null,4,4,7,null,6,null,4,3,1,null,0,null,4,7],kick:[0,8],sn:[4,12],bh:[0,4,8,12],lh:2,form:[['call',4],['march',12],['answer',8],['solo',4],['charge',16],['coda',4]]},
 {tag:'질주 신스 · 브레이크비트',bpm:162,meter:16,lead:'pluck',bass:'sub',root:47,sc:'dor',p:[0,3,6,2],a:[4,null,7,9,null,6,null,4,2,null,4,6,null,9,7,null],kick:[0,6,10],sn:[4,12],bh:[0,3,6,8,11,14],lh:1,form:[['flight',8],['answer',8],['solo',8],['flight',8],['charge',16],['coda',4]]},
 {tag:'중장갑 메탈 · 하프타임',bpm:148,meter:16,lead:'dist',bass:'reese',root:42,sc:'hmin',p:[0,0,1,4],a:[0,null,null,0,1,null,0,null,4,null,3,1,0,null,null,null],kick:[0,3,6,10,11],sn:[8],bh:[0,2,3,6,10,11,14],lh:1,form:[['call',4],['riff',16],['solo',8],['answer',8],['charge',12],['coda',4]]},
 {tag:'고딕 왈츠 · 오르간',bpm:174,meter:12,lead:'organ',bass:'sub',root:48,sc:'hmin',p:[0,5,2,4,0,3,5,4],a:[7,null,null,6,4,null,5,null,4,2,null,null],kick:[0],sn:[8],bh:[0],lh:1,form:[['call',8],['waltz',16],['answer',16],['solo',8],['charge',16],['coda',8]]},
 {tag:'스윙 추격 · 브라스와 피치카토',bpm:144,meter:16,swing:.34,lead:'brass',bass:'pizz',root:43,sc:'dor',p:[0,3,1,4,2,5,0,4],a:[4,null,2,null,0,null,2,3,4,null,6,null,7,null,4,null],kick:[0,10],sn:[4,12],bh:[0,4,8,12],lh:1,form:[['swing',12],['answer',12],['solo',8],['charge',12],['coda',4]]},
 {tag:'전류 질주 · 드럼앤베이스',bpm:180,meter:16,lead:'buzz',bass:'reese',root:45,sc:'min',p:[0,6,3,5],a:[0,1,null,4,null,3,6,null,7,6,null,3,1,null,4,null],kick:[0,6,11],sn:[4,12],bh:[0,6,8,11],lh:1,form:[['call',8],['drop',16],['solo',8],['answer',8],['drop',16],['charge',8],['coda',4]]},
 {tag:'심판의 푸가 · 하프시코드 · 5박',bpm:166,meter:20,lead:'harpsi',bass:'organ',root:46,sc:'hmin',p:[0,4,5,2,6],a:[0,2,4,null,3,1,0,null,4,6,7,null,6,4,3,null,1,3,4,null],kick:[0,12],sn:[8,16],bh:[0,8,12,16],lh:1,form:[['call',4],['fugue',12],['answer',8],['solo',4],['charge',12],['coda',4]]},
 {tag:'심해 서사 · 관현악 · 6/8',bpm:144,meter:12,lead:'strings',bass:'sub',root:41,sc:'min',p:[0,5,3,6,0,2,5,4],a:[0,null,null,null,7,null,6,null,null,4,null,null],kick:[0,6],sn:[6],bh:[0,6],lh:1,form:[['call',8],['tide',16],['answer',12],['solo',8],['charge',16],['coda',8]]},
 {tag:'기록의 펑크 · 싱코페이션',bpm:152,meter:16,lead:'harpsi',bass:'pluck',root:47,sc:'dor',p:[0,0,3,2,5,4,1,4],a:[null,4,3,null,2,null,0,4,null,6,null,7,6,null,4,null],kick:[0,3,10,14],sn:[4,12],bh:[0,3,7,10,14],lh:1,form:[['groove',8],['answer',12],['solo',8],['groove',8],['charge',12],['coda',4]]},
 {tag:'최종 결전 · 3악장 칩 심포니',bpm:172,meter:16,lead:'pulse',bass:'triangle',root:45,sc:'hmin',p:[0,5,3,4,0,2,6,4],a:[0,null,4,7,9,null,7,4,6,7,null,9,11,9,7,null],kick:[0,7,8,14],sn:[4,12],bh:[0,2,6,8,10,14],lh:1,form:[['call',8],['throne',12],['answer',12],['solo',8],['charge',20],['coda',8]]}
];
for(const [k,b] of S5.entries()){b.musicBpm=S5M26[k].bpm;C3MUS[b.art].tag=S5M26[k].tag}
{const base=c3MakeSong;c3MakeSong=function(art,bi){const S=base.apply(this,arguments),k=S5.findIndex(b=>b.art===art);if(k<0)return S;const m=S5M26[k];S.s5Mix26=k;S.root=m.root;S.scale=SC[m.sc];S.prog=m.p;S.musicBpm=m.bpm;S.duration26=m.form.reduce((a,f)=>a+f[1],0)*m.meter*60/m.bpm/4;S.vol=.17;S.title=S5[k].title+' · '+m.tag;return S}}
function s5Music26(n,delay,S){if(!audio||!Number.isFinite(delay))return;musVol(S.vol);const k=S.s5Mix26,m=S5M26[k],half=S.ms/2000,q=60/m.bpm/4,start=n*half,end=start+half,origin=audio.currentTime+delay,total=m.form.reduce((a,f)=>a+f[1],0),limit=total*m.meter;
 if(n<0){chipDrum('hat',origin,.25);return}
 // The scheduler follows the combat clock; the composition retains its own meter and tempo.
 for(let j=Math.ceil(start/q-1e-7);j<Math.ceil(end/q-1e-7);j++){if(RPM.routing&&j>=limit)continue;const bar=Math.floor(j/m.meter)%total,s=j%m.meter;let b=bar,section;for(const f of m.form){if(b<f[1]){section=f;break}b-=f[1]}const name=section[0],quiet=name==='solo',call=name==='call',peak=name==='charge',answer=name==='answer',out=name==='coda',fade=out?Math.max(.12,1-b/section[1]):1,at=origin+j*q-start+(m.swing&&s%4===2?q*m.swing:0),d=m.p[Math.floor(bar/2)%m.p.length],root=noteOf(S,d);
 const emit=(kind,p,len,g,t=at)=>{if(kind==='pulse'||kind==='triangle')chipNote(kind,p,len,g*fade,t,{duty:k===9?.125:.25,sus:.52});else voice(kind,p,len,g*fade,t)};
 if(!quiet&&(!call||b>=section[1]/2)){if(m.kick.includes(s))chipDrum('kick',at,k===2?1:.8);if(m.sn.includes(s))chipDrum('snare',at,k===7?.35:.7);const hats=k===7?s%6===0:k===3?s%4===0:k===5?s%2===0||peak:s%2===0;if(hats)chipDrum('hat',at,(s%4===0?.22:.12)*fade);if(b===0&&s===0)chipDrum('crash',at,.42);if(b%4===3&&s>=m.meter-3&&(peak||k===0||k===5))chipDrum(k===0?'snare':'tom',at,.35)}
 if(m.bh.includes(s)&&(!call||s===0)){let p=root-12;if(k===4)p=noteOf(S,d+[0,2,4,6][Math.floor(s/4)])-12;if(k===8&&s===14)p+=12;emit(m.bass,p,q*(k===7?5:k===3?9:k===5?3:1.4),m.bass==='triangle'?.15:.065)}
 // Each ensemble has its own accompaniment, rather than a shared arpeggio track.
 if(k===0&&s%8===0&&!quiet)for(const v of [0,2,4])emit('brass',noteOf(S,d+v),q*2,.018);
 if(k===1&&s%2===1&&!quiet)emit('pulse',noteOf(S,d+[0,4,2,6][Math.floor(s/2)%4])+24,q*.65,.022);
 if(k===2&&m.bh.includes(s)&&!quiet){emit('dist',root,q*.8,.05);emit('dist',root+7,q*.8,.025)}
 if(k===3&&(s===4||s===8))for(const v of [0,2,4])emit('choir',noteOf(S,d+v)+12,q*3,.018);
 if(k===4&&(s===6||s===14))for(const v of [0,2,4,6])emit('organ',noteOf(S,d+v)+12,q*1.5,.012);
 if(k===5&&(s===3||s===9||s===15)&&!quiet)emit('glide',root+24,q*.65,.025);
 if(k===6&&answer&&s%2===0)emit('harpsi',noteOf(S,m.a[(s+8)%20]??d),q*1.6,.033);
 if(k===7&&s===0)for(const v of [0,2,4])emit('strings',noteOf(S,d+v)+12,q*11,.025);
 if(k===8&&(s===2||s===7||s===11||s===15))for(const v of [0,2,4])emit('pizz',noteOf(S,d+v)+12,q*.9,.025);
 if(k===9&&s%4===0&&!quiet)for(const v of [0,2,4])emit(peak?'dist':'organ',noteOf(S,d+v)+12,q*3,.022);
 let v=m.a[(s+(answer?Math.floor(m.meter/2):0))%m.meter];if(call&&s%4!==0)v=null;if(quiet&&s%4!==0)v=null;if(out&&s%2!==0)v=null;
 if(v!=null){if(answer)v+=k===7?2:0;const kind=quiet?(k===3?'bell':k===7?'flute':'harp'):k===9?(call?'organ':answer?'dist':'pulse'):m.lead,len=q*(quiet?3.5:k===7?5:k===0?1.7:1.1);emit(kind,noteOf(S,v)+12+(peak&&k===9?12:0),len,kind==='pulse'?.065:kind==='dist'?.052:.065);if(peak&&(k===0||k===3||k===7||k===9))emit(k===7?'brass':'pulse',noteOf(S,v-2)+12,len,.025)}
 if(quiet&&s===0)emit(k===6?'bell':'flute',noteOf(S,d)+24,q*(m.meter-1),.035);
 }
}
{const base=playSlot;playSlot=function(n,delay,S){if(S&&S.s5Mix26!=null)return s5Music26(n,delay,S);return base.apply(this,arguments)}}
{const base=rpMusLoad;rpMusLoad=function(){const ok=base.apply(this,arguments);if(ok&&RPM.S&&RPM.S.s5Mix26!=null){RPM.duration=RPM.S.duration26;RPM.loopOnly=false}return ok}}
{const base=s5PanelInfo;s5PanelInfo=function(){base.apply(this,arguments);const e=$('s5MusicLabel');if(e&&S5UI.open)e.textContent=S5M26[S5UI.sel].tag+' · 곡 길이 / 막대를 끌어 이동'}}

/* Three-minute compositions: independent themes, bridge, development, return and cadence. */
const S5_B27=[
 [7,null,6,4,3,null,4,null,5,4,2,null,1,null,0,null],
 [9,7,null,6,4,null,2,4,6,null,7,9,11,null,9,7],
 [0,null,7,null,6,4,null,3,1,null,0,null,4,3,1,null],
 [11,null,9,7,null,6,5,null,4,2,null,4],
 [7,null,6,4,null,2,4,null,6,null,9,7,6,null,4,null],
 [7,null,9,7,4,null,6,4,3,1,null,0,1,3,null,4],
 [7,6,4,null,5,4,2,null,3,2,0,null,4,6,7,null,9,7,4,null],
 [7,null,null,9,null,null,6,null,4,null,2,null],
 [7,null,6,4,null,2,4,null,9,7,null,6,4,null,2,null],
 [7,9,null,11,9,7,6,null,4,null,6,7,9,null,7,null]
];
const S5_C27=[ [4,null,null,null,2,null,null,null,0,null,null,null,1,null,null,null], [0,null,null,null,7,null,null,null,6,null,null,null,4,null,null,null], [4,null,null,null,3,null,null,null,1,null,null,null,0,null,null,null], [4,null,null,null,2,null,null,null,0,null,null,null], [2,null,null,null,4,null,null,null,6,null,null,null,4,null,null,null], [0,null,null,null,3,null,null,null,6,null,null,null,7,null,null,null], [4,null,null,null,2,null,null,null,0,null,null,null,1,null,null,null,4,null,null,null], [0,null,null,null,null,null,4,null,null,null,null,null], [6,null,null,null,4,null,null,null,2,null,null,null,0,null,null,null], [0,null,null,null,4,null,null,null,6,null,null,null,7,null,null,null] ];
const S5M27=S5M26.map((old,k)=>{const bars=Math.round(old.bpm*180/(15*old.meter)),intro=k===7||k===3?8:4,bridge=k===6?8:12,tail=4,weights=[.19,.17,.09,.19,.22],rest=bars-intro-bridge-tail;let a=weights.map(w=>Math.floor(rest*w/.86));a[4]+=rest-a.reduce((x,y)=>x+y,0);const form=[['call',intro],['theme',a[0]],['answer',a[1]],['bridge',bridge],['rise',a[2]],['reprise',a[3]],['charge',a[4]],['coda',tail]],steps=bars*old.meter;return {...old,b:S5_B27[k],c:S5_C27[k],bridgeP:[5,3,0,4],answerP:old.p.slice(2).concat(old.p.slice(0,2)),shift:k%2?2:4,form,steps,bpm:steps/12}});
for(const [k,b] of S5.entries())b.musicBpm=Math.round(S5M27[k].bpm);
{const base=c3MakeSong;c3MakeSong=function(){const S=base.apply(this,arguments);if(S.s5Mix26!=null){S.s5Mix27=S.s5Mix26;S.duration27=180;S.musicBpm=S5M27[S.s5Mix27].bpm}return S}}
function s5Music27(n,delay,S){if(!audio||!Number.isFinite(delay))return;musVol(S.vol);const k=S.s5Mix27,m=S5M27[k],half=S.ms/2000,q=180/m.steps,start=n*half,end=start+half,origin=audio.currentTime+delay,total=m.form.reduce((a,f)=>a+f[1],0),limit=total*m.meter;
 if(n<0){chipDrum('hat',origin,.25);return}
 // The scheduler follows the combat clock; the composition retains its own meter and tempo.
 for(let j=Math.ceil(start/q-1e-7);j<Math.ceil(end/q-1e-7);j++){if(RPM.routing&&j>=limit)continue;const bar=Math.floor(j/m.meter)%total,s=j%m.meter;let b=bar,section;for(const f of m.form){if(b<f[1]){section=f;break}b-=f[1]}const name=section[0],quiet=name==='bridge'||name==='solo',call=name==='call'||name==='rise',peak=name==='charge',answer=name==='answer'||name==='answer2',out=name==='coda',fade=out?Math.max(.12,1-b/section[1]):1,at=origin+j*q-start+(m.swing&&s%4===2?q*m.swing:0),phrase=Math.floor(b/4),prog=quiet?m.bridgeP:answer?m.answerP:m.p,d=out&&b>=section[1]-2?0:prog[Math.floor(b/2)%prog.length],root=noteOf(S,d),songTime=(j%limit)*q,remaining=180-songTime,ending=out&&b>=section[1]-2;
 const emit=(kind,p,len,g,t=at)=>{if(remaining<.85)return;len=Math.min(len,remaining-.7);if(kind==='pulse'||kind==='triangle')chipNote(kind,p,len,g*fade,t,{duty:k===9?.125:.25,sus:.52});else voice(kind,p,len,g*fade,t)};
 if(!ending&&!quiet&&(!call||b>=section[1]/2)){if(m.kick.includes(s))chipDrum('kick',at,k===2?1:.8);if(m.sn.includes(s))chipDrum('snare',at,k===7?.35:.7);const hats=k===7?s%6===0:k===3?s%4===0:k===5?s%2===0||peak:s%2===0;if(hats)chipDrum('hat',at,(s%4===0?.22:.12)*fade);if(b===0&&s===0)chipDrum('crash',at,.42);if(b%4===3&&s>=m.meter-3&&(peak||k===0||k===5))chipDrum(k===0?'snare':'tom',at,.35)}
 if(!ending&&m.bh.includes(s)&&(!call||s===0)){let p=root-12;if(!ending&&k===4)p=noteOf(S,d+[0,2,4,6][Math.floor(s/4)])-12;if(!ending&&k===8&&s===14)p+=12;emit(m.bass,p,q*(k===7?5:k===3?9:k===5?3:1.4),m.bass==='triangle'?.15:.065)}
 // Each ensemble has its own accompaniment, rather than a shared arpeggio track.
 if(!ending&&k===0&&s%8===0&&!quiet)for(const v of [0,2,4])emit('brass',noteOf(S,d+v),q*2,.018);
 if(!ending&&k===1&&s%2===1&&!quiet)emit('pulse',noteOf(S,d+[0,4,2,6][Math.floor(s/2)%4])+24,q*.65,.022);
 if(!ending&&k===2&&m.bh.includes(s)&&!quiet){emit('dist',root,q*.8,.05);emit('dist',root+7,q*.8,.025)}
 if(!ending&&k===3&&(s===4||s===8))for(const v of [0,2,4])emit('choir',noteOf(S,d+v)+12,q*3,.018);
 if(!ending&&k===4&&(s===6||s===14))for(const v of [0,2,4,6])emit('organ',noteOf(S,d+v)+12,q*1.5,.012);
 if(!ending&&k===5&&(s===3||s===9||s===15)&&!quiet)emit('glide',root+24,q*.65,.025);
 if(!ending&&k===6&&answer&&s%2===0)emit('harpsi',noteOf(S,m.a[(s+8)%20]??d),q*1.6,.033);
 if(!ending&&k===7&&s===0)for(const v of [0,2,4])emit('strings',noteOf(S,d+v)+12,q*11,.025);
 if(!ending&&k===8&&(s===2||s===7||s===11||s===15))for(const v of [0,2,4])emit('pizz',noteOf(S,d+v)+12,q*.9,.025);
 if(!ending&&k===9&&s%4===0&&!quiet)for(const v of [0,2,4])emit(peak?'dist':'organ',noteOf(S,d+v)+12,q*3,.022);
 const motif=quiet?m.c:answer?m.b:m.a;let v=motif[(s+(b%4===3?m.shift:0))%m.meter];if(v!=null){v+=b%4===1?2:b%4===2?-1:0;if(name==='reprise'&&phrase%2===1)v+=7;if(peak&&b%4===3)v+=2;if(b%4===3&&s>=m.meter-4)v=s===m.meter-4?0:null;}if(ending)v=null;if(call&&s%4!==0)v=null;if(quiet&&s%4!==0)v=null;if(out&&s%2!==0)v=null;
 if(v!=null){if(answer)v+=k===7?2:0;const kind=quiet?(k===3?'bell':k===7?'flute':'harp'):k===9?(call?'organ':answer?'dist':'pulse'):m.lead,len=q*(quiet?3.5:k===7?5:k===0?1.7:1.1);emit(kind,noteOf(S,v)+12+(peak&&k===9?12:0),len,kind==='pulse'?.065:kind==='dist'?.052:.065);if(peak&&(k===0||k===3||k===7||k===9))emit(k===7?'brass':'pulse',noteOf(S,v-2)+12,len,.025)}
 if(!ending&&quiet&&s===0)emit(k===6?'bell':'flute',noteOf(S,d)+24,q*(m.meter-1),.035);
 if(ending&&b===section[1]-2&&s===0){for(const v of [0,2,4,7])emit(k===2?'dist':k===3?'organ':k===7?'strings':'triangle',noteOf(S,v)+12,Math.min(remaining-1,3),.04);emit('sub',S.root-12,Math.min(remaining-1,3),.065)}
 if(!ending&&name==='rise'&&b>=section[1]-2&&s%2===0)chipDrum('snare',at,.18+.28*(b%2+s/m.meter)/2);
 if(!ending&&(name==='reprise'||name==='charge')&&b%4===2&&s%4===2)emit(k===6?'harpsi':'pulse',noteOf(S,m.b[s%m.meter]??d)+12,q*1.5,.018);
 }
}

{const base=playSlot;playSlot=function(n,delay,S){if(S&&S.s5Mix27!=null)return s5Music27(n,delay,S);return base.apply(this,arguments)}}
{const base=rpMusLoad;rpMusLoad=function(){const ok=base.apply(this,arguments);if(ok&&RPM.S&&RPM.S.s5Mix27!=null){RPM.duration=180;RPM.loopOnly=false}return ok}}

/* Chapter 5 encounter vocabulary: 30 concept-specific moves, one readable attack at a time. */
const S5MOVES27=[];
function s5Mark27(t,x,y,r=19,life=.55,label=''){NP({k:'circ',x,y,r,col:s5Col(),t0:t,t1:t+s5Tel(),t2:t+s5Tel()+life,label,dmg:11});return s5Tel()+life}
function s5Rect27(t,x,y,w,h,life=.65,sty='light'){NP({k:'rect',x,y,w,h,sty,col:s5Col(),t0:t,t1:t+s5Tel(),t2:t+s5Tel()+life,dmg:11});return s5Tel()+life}
function s5Lane27(t,vertical,fraction,width=.24,life=.7){const span=vertical?AW:AH,origin=vertical?AX:AY,lo=origin+span*(fraction-width/2),hi=origin+span*(fraction+width/2);if(vertical){s5Rect27(t,AX,AY,lo-AX,AH,life);s5Rect27(t,hi,AY,AX+AW-hi,AH,life)}else{s5Rect27(t,AX,AY,AW,lo-AY,life);s5Rect27(t,AX,hi,AW,AY+AH-hi,life)}return s5Tel()+life}
function s5Shot27(t,x,y,angle,speed=48,life=3.6,sty='light',r=4){const go=t+s5Tel();NP({k:'orb',sty,r,col:s5Col(),t0:t,t1:go,t2:go+life,ray:angle,rayL:45,prev:.7,pos:b=>[x+Math.cos(angle)*speed*Math.max(0,b-go),y+Math.sin(angle)*speed*Math.max(0,b-go)],dmg:10});return s5Tel()+life}
function s5Fan27(t,count=7,shift=0){const g=bgeo();for(let i=0;i<count;i++)s5Shot27(t,g.x,g.coreY,Math.PI/2+shift+(i-(count-1)/2)*.22,43,3.2,'crystal');return s5Tel()+3.2}
function s5Ring27(t,x,y,gap=0){const n=16;for(let i=0;i<n;i++){const a=i*TAU/n,delta=Math.atan2(Math.sin(a-gap),Math.cos(a-gap));if(Math.abs(delta)<.65)continue;s5Shot27(t,x,y,a,38,3.4,'bubble',4)}return s5Tel()+3.4}
function s5Register27(k,suffix,name,tip,fn,phase=0){const id='s5v27_'+k+'_'+suffix;defPat(id,name,'all',10,tip,fn);const raw=MV[id];MV[id]=t=>q19Run(id,()=>{npWarn(t,.7);npEye(t,t+s5Tel(),t+s5Tel()+1);sch(t,()=>{G.curPat={n:id,chan:'all',at:performance.now()}});return raw(t)});(S5MOVES27[k]||(S5MOVES27[k]=[])).push({id,name,tip,phase});return id}
s5Register27(0,'pincer','요새 집게 협공','양옆 집게가 닫힌다. 가운데 통로로 이동한 뒤 발밑 포격을 피하기.',t=>{s5Lane27(t,true,.5,.32,.9);sch(t+2.8,()=>{s5Mark27(t+2.8,P.x,P.y,24,.6,'포격')});return 2.8+s5Tel()+.7});
s5Register27(0,'lens','쌍렌즈 교차 사격','좌우 포탑이 번갈아 조준한다. 조준선이 고정되면 옆으로 이동.',t=>{for(let j=0;j<3;j++){const at=t+j*2.1;sch(at,()=>{const x=P.x,y=P.y;for(const s of [-1,1])s5Beam(at,[AX+AW*(s<0?.15:.85),AY+18],[x+s*18,y],7)})}return 4.2+s5Tel()+.7},1);
s5Register27(1,'fold','지도의 접힌 날개','항로가 왼쪽 → 가운데 → 오른쪽 순서로 열린다. 밝은 틈을 따라 이동.',t=>{for(let j=0;j<3;j++)s5Lane27(t+j*2.6,true,[.3,.5,.7][j],.3,.6);return 5.2+s5Tel()+.7});
s5Register27(1,'compass','나침반 칼날 비행','중앙에서 퍼지는 칼날의 빈 방향을 찾고, 다음 칼날 사이로 이동.',t=>{s5Fan27(t,5,-.16);s5Fan27(t+3.6,5,.16);return 3.6+s5Tel()+3.3},1);
s5Register27(2,'chain','십자 사슬 봉쇄','세로 사슬, 가로 사슬이 차례로 떨어진다. 교차점에 머무르지 않기.',t=>{for(let j=0;j<2;j++){const at=t+j*2.8;sch(at,()=>{const x=P.x,y=P.y;const o={k:'seg',sty:'chain',col:s5Col(),w:10,t0:at,t1:at+s5Tel(),t2:at+s5Tel()+.75,dmg:12};NP({...o,a:()=>j?[AX,y]:[x,AY],b:()=>j?[AX+AW,y]:[x,AY+AH]})})}return 2.8+s5Tel()+.85});
s5Register27(2,'breaker','방패 파쇄 · 닻 처형','방패가 한쪽 바닥을 누른 뒤 반대편을 친다. 마지막 닻 표식을 피하면 반격.',t=>{s5Rect27(t,AX,AY,AW*.42,AH,.65);s5Rect27(t+2.5,AX+AW*.58,AY,AW*.42,AH,.65);sch(t+5,()=>s5Mark27(t+5,P.x,P.y,28,.65,'닻'));return 5+s5Tel()+.75},1);
s5Register27(3,'pipes','세 성부의 오르간','세 줄 중 한 줄씩 울린다. 첫 줄과 다음 줄의 예고를 구별하기.',t=>{for(let j=0;j<3;j++){const col=[0,2,1][j];s5Rect27(t+j*2.2,AX+col*AW/3+5,AY,AW/3-10,AH,.6,'light')}return 4.4+s5Tel()+.7});
s5Register27(3,'pearl','진주 화환 개화','진주 화환의 오른쪽 빈틈을 통과. 다음 화환은 왼쪽이 열린다.',t=>{s5Ring27(t,AX+AW*.4,AY+AH*.4,0);s5Ring27(t+4.4,AX+AW*.6,AY+AH*.4,Math.PI);return 4.4+s5Tel()+3.5},1);
s5Register27(4,'broadside','잠항선 측면 일제사격','왼쪽 어뢰 열, 오른쪽 어뢰 열이 교차한다. 넓게 비어 있는 행으로 이동.',t=>{for(let wave=0;wave<2;wave++)for(let row=0;row<5;row++){if(row===(wave?1:3))continue;s5Shot27(t+wave*3.2,AX+(wave?AW-5:5),AY+AH*(row+.5)/5,wave?Math.PI:0,58,AW/58,'scrap',5)}return 3.2+s5Tel()+AW/58+.1});
s5Register27(4,'depth','수압 기뢰 전개','바닥의 네 기뢰를 피하고 가운데 항로로 합류. 기뢰는 예고 위치에서 폭발.',t=>{for(const x of [.2,.8])for(const y of [.3,.75])s5Mark27(t,AX+AW*x,AY+AH*y,26,.65,'기뢰');s5Lane27(t+2.8,true,.5,.32,.7);return 2.8+s5Tel()+.8},1);
s5Register27(5,'stitch','지그재그 봉합선','전선이 왼쪽과 오른쪽에서 번갈아 연결된다. 반대편 넓은 공간으로.',t=>{for(let j=0;j<4;j++){const x=AX+AW*(j%2?.7:.3);s5Beam(t+j*1.5,[x-22,AY],[x+22,AY+AH],8)}return 4.5+s5Tel()+.7});
s5Register27(5,'needle','과전류 바늘 폭우','위에서 바늘이 내려온다. 빈 열을 확인하고 다음 열로 한 칸 이동.',t=>{for(let wave=0;wave<2;wave++)for(let i=0;i<7;i++){if(Math.abs(i-(wave?4:2))<=1)continue;s5Shot27(t+wave*3.2,AX+AW*(i+.5)/7,AY+5,Math.PI/2,65,AH/65,'spark',4)}return 3.2+s5Tel()+AH/65+.1},1);
s5Register27(6,'scale','기울어진 심판의 저울','왼쪽과 오른쪽 바닥이 순서대로 심판받는다. 저울이 내려오기 전 빈 쪽으로.',t=>{for(let j=0;j<3;j++)s5Rect27(t+j*2.6,AX+(j%2?AW*.56:0),AY,AW*.44,AH,.65);return 5.2+s5Tel()+.75});
s5Register27(6,'verdict','제9종 · 유예 없는 판결','모서리 네 종이 먼저 울리고 중앙이 마지막에 울린다. 중앙 → 바깥으로 이동.',t=>{for(const x of [.23,.77])for(const y of [.28,.72])s5Mark27(t,AX+AW*x,AY+AH*y,30,.65,'종');s5Mark27(t+2.8,AX+AW*.5,AY+AH*.5,Math.min(AW,AH)*.27,.7,'9');return 2.8+s5Tel()+.8},1);
s5Register27(7,'sand','모래시계 낙진','모래가 양옆에서 떨어진 뒤 중앙을 덮는다. 중앙에서 기다렸다가 옆으로.',t=>{s5Lane27(t,true,.5,.38,.8);s5Rect27(t+3,AX+AW*.37,AY,AW*.26,AH,.75);return 3+s5Tel()+.85});
s5Register27(7,'tail','고래 꼬리 · 역류','꼬리 충격파의 중앙 틈을 통과한 뒤 아래쪽 열린 항로로 이동.',t=>{s5Wave(t,true,AX+AW*.5);s5Lane27(t+s5Tel()+3.8,false,.7,.36,.75);return 2*s5Tel()+4.65},1);
s5Register27(8,'copy','기록 복사 · 잉크 낙인','내 위치를 세 번 기록한 다음 그 자리에 잉크를 터뜨린다. 지나온 곳에서 벗어나기.',t=>{const marks=[];for(let j=0;j<3;j++){const at=t+j*.8;sch(at,()=>{marks.push([P.x,P.y]);s5Mark27(at,P.x,P.y,18,.4,String(j+1))})}sch(t+4,()=>{for(const [x,y] of marks)s5Mark27(t+4,x,y,24,.65,'복사')});return 4+s5Tel()+.75});
s5Register27(8,'pages','금서의 접힌 책장','위쪽 책장 → 아래쪽 책장 → 중앙 줄 순서. 페이지가 닫히는 위치를 기억.',t=>{s5Rect27(t,AX,AY,AW,AH*.4,.65);s5Rect27(t+2.6,AX,AY+AH*.6,AW,AH*.4,.65);s5Rect27(t+5.2,AX+AW*.4,AY,AW*.2,AH,.65);return 5.2+s5Tel()+.75},1);
s5Register27(9,'gates','왕관의 삼중 수문','오른쪽 → 중앙 → 왼쪽 통로가 차례로 열린다. 마지막 수문 뒤 종 심장이 노출.',t=>{for(let j=0;j<3;j++)s5Lane27(t+j*2.8,true,[.7,.5,.3][j],.3,.8);return 5.6+s5Tel()+.9});
s5Register27(9,'release','무음 해제 · 마지막 귀환','진주 파동을 피하고 중앙 수문으로. 두 공격은 차례로 오며 모두 끝나면 반격.',t=>{s5Ring27(t,AX+AW*.5,AY+AH*.35,Math.PI/2);s5Lane27(t+s5Tel()+3.8,true,.5,.34,.8);return 2*s5Tel()+4.7},1);
for(const [k,b] of S5.entries()){const moves=S5MOVES27[k];C3BOSS[b.art].deck=[[b.sig,4,0,'S'],...moves.map(m=>[m.id,3,m.phase,'S'])]}
// Dedicated chapter 5 phrases prevent the generic mixer from truncating a long attack.
{const base=planNext;planNext=function(S){if(!G||G.s5==null||Q19.practice)return base.apply(this,arguments);clearPhraseHazards();const k=G.s5,b=S5[k],deck=(typeof t5Deck==='function'?t5Deck(C3BOSS[b.art].deck):C3BOSS[b.art].deck).filter(m=>m[2]<=G.phase),round=G.s5Round27||0;G.s5Round27=round+1;let entry=deck[round%deck.length];if(entry[0]===G.s5Last27&&deck.length>1)entry=deck[(round+1)%deck.length];const id=entry[0],start=Math.ceil(S)+1,len=MV[id](start),end=start+len+.65,cl=diff==='easy'?13:diff==='normal'?11:9;G.s5Last27=id;G.lastAtk='phrase';G.phraseStart=start;G.phraseEnd=end;G.phraseNames=[id];G.counterLen=cl;tweenBoss(HOME.x,HOME.y,S,start);banner(ATK_NAME[id]);const kind=k===2?'stuck':k===7?'stun':'overload';sch(end,()=>{if(G.state==='play'&&!G.vuln){G.puz=null;startVuln(kind,cl)}});if(G.puz&&!G.puz.done)continuePuzzle(start,end-start,kind,cl);else startPuzzle(start,end-start,kind,cl);G.nextPlan=end+cl+RISE()}}
{const base=s5PanelInfo;s5PanelInfo=function(){base.apply(this,arguments);const host=$('s5Panel');if(!host)return;let list=host.querySelector('.s5Moves27');if(list)list.remove();list=document.createElement('section');list.className='s5Moves27';const k=S5UI.sel,b=S5[k],moves=[{name:ATK_NAME[b.sig],tip:ATK_TIP[b.sig],phase:0},...S5MOVES27[k]];list.innerHTML='<h4>공격 패턴 · 3종</h4>'+moves.map(m=>'<details><summary>'+m.name+(m.phase?' · 2페이즈부터':'')+'</summary><p>'+m.tip+'</p></details>').join('');host.querySelector('article').appendChild(list)}}
{const style=document.createElement('style');style.textContent='.s5Moves27{margin-top:12px;padding:12px;border:1px solid #36535b;border-radius:12px;background:#07161d}.s5Moves27 h4{margin:0 0 8px;color:#efcf93}.s5Moves27 details{padding:9px 0;border-top:1px solid #263c44}.s5Moves27 summary{cursor:pointer;color:#d5ece6;font-size:14px}.s5Moves27 p{color:#a8bdba;font-size:13px;line-height:1.6;margin:8px 0}';document.head.appendChild(style)}

/* ABYSS 28: weapon -> launched object -> deployed emitter -> impact. */
const S5PORT28=[ [[-22,-22],[22,-22]], [[-22,-27],[22,-27]], [[19,-29],[-8,-12]], [[-6,-39],[6,-39]], [[26,-26],[-22,-20]], [[8,-5],[-8,-29]], [[-17,-16],[17,-16]], [[-21,-19],[22,-22]], [[-18,-14],[18,-14]], [[-12,-17],[12,-17]] ];
const S5FXNAME28=['등대 포탄','항로 칼날','사슬 닻','공명 진주','기뢰 어뢰','봉합 바늘','심판의 종','모래 결정','잉크 책장','귀환종 결정'];
{const base=c3Art;c3Art=function(c,B,x,y,t,o,u,id){if(typeof G!=='undefined'&&G&&G.s5!=null&&mode==='boss'&&id===S5[G.s5].art)G.s5Pose28={x,y,u:(u||U)*.9};return base.apply(this,arguments)}}
function s5Port28(k,side){const p=S5PORT28[k][side],pose=G.s5Pose28||{x:G.boss.x,y:G.boss.y,u:U*.9};return [pose.x+p[0]*pose.u,pose.y+p[1]*pose.u]}
function s5Line28(c,a,b,col,w=1,alpha=1){c.globalAlpha=alpha;c.strokeStyle=col;c.lineWidth=w;c.beginPath();c.moveTo(Math.round(a[0]),Math.round(a[1]));c.lineTo(Math.round(b[0]),Math.round(b[1]));c.stroke()}
function s5Ring28(c,x,y,r,col,alpha=1){if(r<=0)return;c.globalAlpha=alpha;c.strokeStyle=col;c.lineWidth=1;c.beginPath();for(let j=0;j<=16;j++){const a=j*TAU/16,X=Math.round(x+Math.cos(a)*r),Y=Math.round(y+Math.sin(a)*r*.55);j?c.lineTo(X,Y):c.moveTo(X,Y)}c.stroke()}
function s5Relic28(c,k,x,y,r,angle,col){c.save();c.translate(Math.round(x),Math.round(y));c.rotate(angle);c.globalAlpha=1;c.fillStyle='#091721';c.strokeStyle=col;c.lineWidth=1.2;
 if(k===2){c.beginPath();c.moveTo(0,-r);c.lineTo(0,r);c.moveTo(-r,-r*.4);c.lineTo(r,-r*.4);c.moveTo(-r,0);c.lineTo(-r*.7,r);c.lineTo(0,r*1.3);c.lineTo(r*.7,r);c.lineTo(r,0);c.stroke()}
 else if(k===6){c.beginPath();c.moveTo(-r*.6,-r);c.lineTo(r*.6,-r);c.lineTo(r,r*.5);c.lineTo(-r,r*.5);c.closePath();c.fill();c.stroke();c.fillStyle='#fff0bb';c.fillRect(-1,r*.7,2,2)}
 else if(k===8){c.fillRect(-r,-r*.7,r*2,r*1.4);c.strokeRect(-r,-r*.7,r*2,r*1.4);s5Line28(c,[0,-r*.7],[0,r*.7],col);for(let j=-1;j<=1;j++)s5Line28(c,[-r*.7,j*2],[r*.7,j*2],col,.5,.6)}
 else if(k===0||k===4){c.fillRect(-r,-r*.55,r*2,r*1.1);c.strokeRect(-r,-r*.55,r*2,r*1.1);c.fillStyle='#fef3c5';c.fillRect(r-2,-1,3,2);c.fillStyle=col;c.fillRect(-r-3,-1,3,2)}
 else{c.beginPath();c.moveTo(-r,0);c.lineTo(0,-r*(k===5?.3:.7));c.lineTo(r,0);c.lineTo(0,r*(k===5?.3:.7));c.closePath();c.fill();c.stroke();c.fillStyle='#f0fff8';c.fillRect(-1,-1,2,2)}c.restore()}
function s5Target28(o,b){if(o.k==='orb')return o.pos(o.t1);if(o.k==='seg')return o.a(o.live?b:o.t1);if(o.k==='rect'){const r=o.rf?o.rf(b):[o.x,o.y,o.w,o.h];return [r[0]+r[2]/2,r[1]+r[3]/2]}const q=o.cf?o.cf(b):[o.x,o.y,o.r];return q.slice(0,2)}
function s5Flight28(a,z,u,k){const bend=(k===0||k===2||k===4||k===6)?-Math.sin(Math.PI*u)*36:Math.sin(Math.PI*u)*14;return [a[0]+(z[0]-a[0])*u,a[1]+(z[1]-a[1])*u+bend]}
function s5Deco28(o,b,now){const f=o.s5fx28,k=f.k,c=ctx,col=o.col||S5[k].c,src=s5Port28(k,f.side),target=s5Target28(o,b),p=clamp((b-o.t0)/(o.t1-o.t0),0,1),live=b>=o.t1,age=b-o.t1;c.save();
 // One charge halo per muzzle per frame, even when a volley has many projectiles.
 const key=k+':'+f.side,frame=Math.floor(now);if(!live&&f.cache[key]!==frame){f.cache[key]=frame;s5Ring28(c,src[0],src[1],4+p*9,col,.9);for(let i=0;i<5;i++){const a=i*TAU/5-now*.003,r=12*(1-p)+3;c.globalAlpha=.8;c.fillStyle=col;c.fillRect(Math.round(src[0]+Math.cos(a)*r),Math.round(src[1]+Math.sin(a)*r),2,2)}s5Relic28(c,k,src[0],src[1],3+p*2,0,col)}
 if(!live){const u=clamp((p-.2)/.65,0,1),pos=s5Flight28(src,target,u,k);if(p>=.2){for(let i=4;i>=1;i--){const q=s5Flight28(src,target,Math.max(0,u-i*.035),k);s5Line28(c,q,pos,col,Math.max(1,3-i*.4),.1)}s5Relic28(c,k,pos[0],pos[1],4.5,Math.atan2(target[1]-src[1],target[0]-src[0]),col);if(k===2)s5Line28(c,src,pos,'#b3a68c',1,.55)}
 // A visible planted projector explains a beam or field that starts away from the boss.
 if(p>=.85){s5Ring28(c,target[0],target[1],7,col,.75);s5Relic28(c,k,target[0],target[1],5,0,col)}
 }else{if(o.k==='orb'){const pos=o.pos(b);for(let i=1;i<=4;i++){const old=o.pos(Math.max(o.t1,b-i*.045));s5Line28(c,old,pos,col,Math.max(1,3-i*.5),.2)}s5Relic28(c,k,pos[0],pos[1],o.r+1,Math.atan2(pos[1]-target[1],pos[0]-target[0]),col)}else{s5Relic28(c,k,target[0],target[1],5,0,col);s5Ring28(c,target[0],target[1],8+Math.sin(age*7)*2,col,.6)}
 if(age<.5){const fade=1-age/.5;s5Ring28(c,target[0],target[1],7+age*48,col,fade);for(let i=0;i<8;i++){const a=i*TAU/8+f.side*.3,r=4+age*40;c.globalAlpha=fade*.8;c.fillStyle=i%2?col:'#fff4cd';c.fillRect(Math.round(target[0]+Math.cos(a)*r),Math.round(target[1]+Math.sin(a)*r*.6),2,2)}}
 }
 c.restore()}
const S5CACHE28={};
{const base=NP;NP=function(o){if(G&&G.s5!=null&&S5[G.s5]&&['seg','orb','circ','rect'].includes(o.k)&&o.harm!==false){const k=G.s5,target=s5Target28(o,o.t1),side=target[0]<(G.boss?G.boss.x:AX+AW/2)?0:1;o.s5fx28={k,side,cache:S5CACHE28};sch(o.t1,()=>{if(G&&G.s5===k&&G.state==='play'&&(!G.s5Sound28||o.t1-G.s5Sound28>.22)){G.s5Sound28=o.t1;G.shake=Math.max(G.shake||0,.08);sfx([150,760,90,880,120,1100,430,100,520,300][k],.12,k===5?'sawtooth':'triangle',.025,k===2?45:230)}});const old=o.deco;o.deco=(q,b,now)=>{if(old)old(q,b,now);s5Deco28(q,b,now)};
 // Projectiles grow out of the planted emitter. Collision follows that same visible endpoint.
 if(o.k==='seg'){const end=o.b,start=o.a;o.b=b=>{const a=start(b),z=end(b),p=b<o.t1?1:clamp((b-o.t1)/.15,0,1);return [a[0]+(z[0]-a[0])*p,a[1]+(z[1]-a[1])*p]};o.sty=k===2?'chain':k===5?'elec':'laser'}
 }return base(o)}}
// Material-specific active attacks retain exactly the original collision footprints.
{const base=NPK.seg.draw;NPK.seg.draw=function(o,b,now){if(!o.s5fx28)return base.apply(this,arguments);const k=o.s5fx28.k;if(k===2||k===5)return base.apply(this,arguments);const a=o.a(b),z=o.b(b),c=ctx,col=o.col||S5[k].c;c.save();s5Line28(c,a,z,col,o.w,.42);s5Line28(c,a,z,'#eefde3',Math.max(1,o.w*.25),.9);const length=Math.hypot(z[0]-a[0],z[1]-a[1]),n=Math.min(24,Math.ceil(length/16));for(let i=0;i<n;i++){const u=((i/n+(b-o.t1)*.55)%1),x=a[0]+(z[0]-a[0])*u,y=a[1]+(z[1]-a[1])*u;s5Relic28(c,k,x,y,Math.min(3,o.w*.35),Math.atan2(z[1]-a[1],z[0]-a[0]),col)}c.restore()}}
{const base=NPK.rect.draw;NPK.rect.draw=function(o,b,now){const r=base.apply(this,arguments);if(!o.s5fx28)return r;const c=ctx,k=o.s5fx28.k,col=o.col||S5[k].c,[x,y,w,h]=o.rf?o.rf(b):[o.x,o.y,o.w,o.h];c.save();c.beginPath();c.rect(x,y,w,h);c.clip();const age=b-o.t1;for(let j=0;j<Math.min(18,Math.ceil(w/22));j++){const xx=x+(j+.5)*w/Math.ceil(w/22),yy=y+h-((age*80+j*31)%Math.max(1,h));s5Relic28(c,k,xx,yy,4,-Math.PI/2,col)}c.restore();return r}}
// Tell players what powers each attack, without replacing the dodge instructions.
{const base=s5PanelInfo;s5PanelInfo=function(){base.apply(this,arguments);const p=$('s5Tip');if(p&&S5UI.open)p.textContent+=' · 발사체: '+S5FXNAME28[S5UI.sel]}}

/* Preserve the opening, then use named phrases and recurring hooks instead of pitch-shifted one-bar loops. */
let S5NEW30=true;
const S5REPLY30=[
 [7,null,6,4,5,null,4,null,3,4,2,null,1,null,0,null],
 [9,7,null,6,4,null,2,4,6,null,7,null,4,2,0,null],
 [0,null,7,null,6,4,null,3,1,null,0,null,4,1,0,null],
 [9,null,7,6,null,4,5,null,4,2,1,null],
 [7,null,6,4,null,2,4,null,6,7,null,6,4,null,2,0],
 [7,9,null,7,6,null,4,3,4,null,6,4,3,1,0,null],
 [7,6,4,null,5,4,2,null,3,2,0,null,2,4,6,null,4,3,1,0],
 [7,null,null,6,4,null,5,null,4,2,null,0],
 [7,null,6,4,2,null,4,6,null,9,7,null,6,4,2,0],
 [7,null,9,11,9,null,7,6,4,null,6,7,4,3,1,0]
];
const S5LIFT30=[
 [4,null,4,7,9,null,7,null,6,7,4,null,3,null,4,null],
 [7,null,9,11,9,7,null,6,7,null,4,6,7,9,7,null],
 [4,null,4,null,7,6,4,null,3,null,4,3,1,null,0,null],
 [7,null,9,null,11,9,7,null,6,4,null,7],
 [4,6,null,7,9,null,7,6,4,null,6,7,6,4,null,2],
 [4,6,7,null,9,7,6,null,4,6,null,7,6,4,3,null],
 [4,6,7,null,9,7,6,4,5,null,4,2,3,4,6,null,7,6,4,null],
 [4,null,null,7,null,9,7,null,null,6,4,null],
 [4,null,6,7,9,null,7,6,4,6,null,7,6,null,4,null],
 [4,7,null,9,11,null,9,7,6,7,9,null,7,6,4,null]
];
const S5FORM30=S5M27.map(m=>{const total=m.steps/m.meter,remaining=total-12,names=['verse','pre','hook','reply','middle','solo','build','return','final'],weights=[1,1,1,1,1,1,.5,1,1.5],sum=weights.reduce((a,b)=>a+b,0);const lens=weights.map(w=>Math.max(4,Math.floor(remaining*w/sum/4)*4));lens[8]+=remaining-lens.reduce((a,b)=>a+b,0);return [['opening',8],...names.map((v,i)=>[v,lens[i]]),['coda',4]]});
function s5Phrase30(k,name,b,s){const m=S5M27[k],r=S5REPLY30[k],lift=S5LIFT30[k],p=b%8;let phrase;
 if(name==='middle'||name==='solo')phrase=p%4<2?r:lift;
 else if(name==='pre'||name==='build')phrase=p%4<2?lift:r;
 else if(name==='reply')phrase=p%4===0?m.a:p%4===1?r:p%4===2?lift:m.b;
 else if(name==='verse')phrase=p%4===0?m.a:p%4===1?r:p%4===2?m.b:r;
 else phrase=p===0||p===2||p===6?m.a:p===1||p===3?r:p===4?lift:p===5?m.b:r;
 // A phrase ends with a resolving note and a short breath, not another rotated loop.
 if(p===7&&s>=m.meter-4)return {v:s===m.meter-4?0:null,len:3.2};
 let v=phrase[s];if(name==='solo'&&s%2===1)v=null;
 if(name==='coda')return {v:s===0?[7,4,0,null][Math.min(b,3)]:null,len:m.meter*.8};
 let next=s+1;while(next<m.meter&&(phrase[next]==null||name==='solo'&&next%2===1))next++;
 return {v,len:Math.max(.8,Math.min(next-s-.12,k===7?5:3.6))};
}
function s5Music30(n,delay,S){const k=S.s5Mix27,m=S5M27[k],q=180/m.steps,half=S.ms/2000,start=n*half,end=start+half;
 if(n<0||start<8*m.meter*q)return s5Music27(n,delay,S);if(!audio||!Number.isFinite(delay))return;musVol(S.vol);const origin=audio.currentTime+delay;
 for(let j=Math.ceil(start/q-1e-7);j<Math.ceil(end/q-1e-7);j++){if(RPM.routing&&j>=m.steps)continue;const cycle=j%m.steps,bar=Math.floor(cycle/m.meter),s=cycle%m.meter;let b=bar,sec;for(const f of S5FORM30[k]){if(b<f[1]){sec=f;break}b-=f[1]}const name=sec[0],at=origin+j*q-start+(m.swing&&s%4===2?q*m.swing:0),remaining=180-cycle*q,solo=name==='solo',middle=name==='middle',build=name==='pre'||name==='build',hook=['hook','return','final'].includes(name),out=name==='coda',fade=out?Math.max(.1,1-b/4):1,phraseEnd=b%8===7;
 const prog=middle||solo?m.bridgeP:name==='reply'?m.answerP:m.p,d=out?0:prog[Math.floor(b/2)%prog.length],root=noteOf(S,d),level=solo?.68:middle?.8:1;
 const note=(kind,p,len,g,t=at)=>{if(remaining<.8)return;len=Math.min(len,remaining-.7);const gain=g*fade*level;if(kind==='pulse'||kind==='triangle')chipNote(kind,p,len,gain,t,{duty:k===9?.125:.25,sus:.55});else voice(kind,p,len,gain,t)};
 const ending=out&&b>=2;
 // Preserve each boss's characteristic groove; use fills only at phrase boundaries.
 if(!ending){if(m.kick.includes(s)&&(!solo||s===0))chipDrum('kick',at,.8*level*fade);if(m.sn.includes(s)&&!solo)chipDrum('snare',at,.65*level*fade);
 const hats=k===7?s%6===0:k===3?s%4===0:s%2===0;if(hats&&!solo)chipDrum('hat',at,(s%4===0?.2:.1)*fade);
 if(b===0&&s===0&&hook)chipDrum('crash',at,.4);if(phraseEnd&&s>=m.meter-4&&!solo&&!middle)chipDrum(s%2?'snare':'tom',at,.22+.025*(s-(m.meter-4)));
 if(m.bh.includes(s)&&(!solo||s===0)){let pitch=root-12;if(k===4)pitch=noteOf(S,d+[0,2,4,6][Math.floor(s/4)])-12;note(m.bass,pitch,q*(solo?m.meter*.7:k===7?5:k===3?9:1.3),m.bass==='triangle'?.14:.06)}
 }
 // Instrument roles rotate between passages; the hook remains in the foreground.
 if(!ending&&!solo){
 if(k===0&&s%8===0)for(const v of [0,2,4])note('brass',noteOf(S,d+v),q*2,.016);
 if(k===1&&s%2===1&&(hook||build))note('pulse',noteOf(S,d+[0,4,2,6][Math.floor(s/2)%4])+24,q*.7,.017);
 if(k===2&&m.bh.includes(s)&&!middle){note('dist',root,q*.9,.04);note('dist',root+7,q*.9,.018)}
 if(k===3&&(s===4||s===8))for(const v of [0,2,4])note('choir',noteOf(S,d+v)+12,q*3,.016);
 if(k===4&&(s===6||s===14))for(const v of [0,2,4,6])note('organ',noteOf(S,d+v)+12,q*1.5,.01);
 if(k===5&&(s===3||s===9)&&hook)note('glide',root+24,q*.65,.018);
 if(k===6&&s%4===2&&name==='reply')note('harpsi',noteOf(S,d+[0,2,4,6,4][Math.floor(s/4)]),q*2,.026);
 if(k===7&&s===0)for(const v of [0,2,4])note('strings',noteOf(S,d+v)+12,q*11,.024);
 if(k===8&&[2,7,11,15].includes(s))for(const v of [0,2,4])note('pizz',noteOf(S,d+v)+12,q*.9,.02);
 if(k===9&&s%4===0)for(const v of [0,2,4])note(name==='final'?'dist':'organ',noteOf(S,d+v)+12,q*3,.018);
 }
 const melody=s5Phrase30(k,name,b,s);if(melody.v!=null&&!ending){const lead=solo?(k===7?'flute':k===3?'bell':k===2?'dist':'pluck'):k===9?(middle?'organ':'pulse'):m.lead;note(lead,noteOf(S,melody.v)+12,q*melody.len,lead==='dist'?.05:.068);
 if(name==='final'&&b>=4&&s%4===0)note(k===7?'brass':'triangle',noteOf(S,melody.v)+24,q*melody.len,.014)}
 if(solo&&s===0)for(const v of [0,2,4])note(k===3?'organ':'triangle',noteOf(S,d+v),q*(m.meter-1),.02);
 if(build&&b>=sec[1]-2&&s%2===0)chipDrum('snare',at,.12+.018*s);
 if(ending&&b===2&&s===0){for(const v of [0,2,4,7])note(k===7?'strings':k===3?'organ':'triangle',noteOf(S,v)+12,Math.min(remaining-1,2.8),.035);note('sub',S.root-12,Math.min(remaining-1,2.8),.055)}
 }
}
{const base=playSlot;playSlot=function(n,delay,S){if(S5NEW30&&S&&S.s5Mix27!=null)return s5Music30(n,delay,S);return base.apply(this,arguments)}}
{const base=s5PanelInfo;s5PanelInfo=function(){base.apply(this,arguments);const host=$('s5Panel');if(!host)return;let area=host.querySelector('.s5Compare30');if(area)area.remove();area=document.createElement('div');area.className='s5Compare30';area.style.cssText='display:flex;gap:8px;flex-wrap:wrap;margin-top:10px';const toggle=document.createElement('button');toggle.className='gmBtn';toggle.textContent=S5NEW30?'편곡 비교: 새 버전':'편곡 비교: 이전 버전';toggle.onclick=()=>{const pos=rpMusPosition(),playing=RPM.on;rpMusStop();S5NEW30=!S5NEW30;toggle.textContent=S5NEW30?'편곡 비교: 새 버전':'편곡 비교: 이전 버전';RPM.pos=pos;if(playing)rpMusStart()};const hook=document.createElement('button');hook.className='gmBtn';hook.textContent='▶ 후렴부터 듣기';hook.onclick=()=>{const k=S5UI.sel,form=S5FORM30[k];let bars=0;for(const f of form){if(f[0]==='hook')break;bars+=f[1]}rpMusSeek(bars*S5M27[k].meter*180/S5M27[k].steps);if(!RPM.on)rpMusStart()};area.append(toggle,hook);host.querySelector('.s5Music').appendChild(area)}}

let last=performance.now();
function frame(){const now=performance.now(),dt=Math.min((now-last)/1000,.05);last=now;if(typeof perfTick==='function')perfTick(now);
if(mode==='menu'){drawTitle(now);if(typeof drawTitleFX==='function')drawTitleFX(now);if(typeof drawLobbyBg==='function')drawLobbyBg(now);if(typeof menuTick==='function')menuTick(now);drawShopPreviews(now)}
else{dlgTick(now);
 if(mode==='cave'){if(!paused&&!(C&&C.hitstop&&now<C.hitstop))updateCave(now,dt);drawCave(now)}
 else if(mode==='scene'){sched(now);drawStoryScene(now)}
 else if(mode==='village'){if(!paused)updateVillage(now,dt);drawVillage(now);if(V&&V.shop&&typeof drawShopPreviews==='function')drawShopPreviews(now)}
 else if(mode==='case'){if(!paused)updateCase(now,dt);drawCase(now)}
 else if(mode==='boss'){if(!paused&&['wake','count','play','dying','dead','epi'].includes(G.state))updateBoss(now,dt);drawScene(paused?pauseAtMs:now);if(!paused)hlCapture(now)}}
requestAnimationFrame(frame)}
updDiff();buildCards();refreshMenu();fitPagerHeight();try{if(typeof gmBuild==='function')gmBuild()}catch(e){console.error(e)}requestAnimationFrame(frame);

