/* ================= 챕터 2 최종 보스: 태초의 굶주림 — 실험으로 괴물이 된 사람 =================
   1차 처치 → 균열 속 실험 기록(클릭 진행) → "끝낼 수 없어!!" 완전 변이로 부활 → 최종 처치 → 윤서의 회상 */
const MUT_BI=19;
const REVIVE_CFG={
 9:{get mset(){return MEM_SC},cry:'난 죽을 수 없어!!',who:'오메가 엔진',t1:'T R U E   H E A R T   ·   Ω',t2:'진정한 박동',tick:'오메가가 스스로 다시 뛰고 있어! 남은 정적을 떼어내자, 하루!',banner:'Ω 진정한 박동 — 각성',col:'#ff2d55',col2:'#ffe36b',rings:['#ffffff','#ffd166','#ff3a6a','#7fe8ff','#fff8ec'],
  onReboot(){G.omega=true;G.revForm='omega';G.B=Object.assign({},BOSSES[OMEGA_BI],OMEGA_TRUE)}},
 19:{get mset(){return REV2_SC},cry:'끝낼 수 없어!!',who:'??? (괴물 속 목소리)',t1:'F U L L   M U T A T I O N',t2:'완전 변이',tick:'저 안에 사람이 있어… 아직 살아 있어! 하루, 끝까지 가서 풀어 주자!',banner:'‡ 완전 변이 — 폭주',col:'#b03aff',col2:'#3aff8a',rings:['#ffffff','#b03aff','#ff2d55','#3aff8a','#ff4dd2'],
  onReboot(){G.omega=true;G.revForm='mutant';G.B=Object.assign({},BOSSES[MUT_BI],{c:'#ff4dd2'})}}};
Object.assign(MSPK,{'???':'#d8c8ff','실험 기록':'#9affc8','태초의 굶주림':'#ff4dd2','철갑 열차':'#ffb45a'});
/* ---------- 부활 전: 균열 속 실험 기록 ---------- */
const REV2_SC=[
 {title:'균열',tone:'#b03aff',draw:r2Crack,mel:['E4','G4','B4','A4','G4','E4','D4','E4'],st:620,lines:[
  ['','쓰러진 괴물의 가슴이 쩍 갈라지고, 그 안에서 희미한 빛이 새어 나왔다.'],
  ['???','…아파… 여기가… 어디지…'],
  ['똑딱','하루… 방금 그거, 사람 목소리였어.'],
  ['하루','괴물 안에… 누가 있어?']]},
 {title:'실험 기록 · 제1일',tone:'#9affc8',draw:r2Lab1,mel:['A4','C5','E5','C5','B4','A4','G4','A4'],st:540,lines:[
  ['실험 기록','"굶주림은 소리를 먹는다. 그렇다면 굶주림에게 박동을 먹이면, 더 큰 박동을 돌려받을 수 있지 않을까."'],
  ['실험 기록','"실험체를 구할 수 없다. …아니, 구하지 않겠다. 누구도 다치게 할 수는 없으니까."'],
  ['실험 기록','"그러니 첫 번째 실험체는, 나다."']]},
 {title:'실험 기록 · 제40일',tone:'#9affc8',draw:r2Lab2,mel:['A4','E5','D5','C5','B4','C5','D5','E5'],st:500,lines:[
  ['실험 기록','"성공이다. 굶주림이 내 안에서 박동을 만든다. 이 힘이라면 심장을 다시 뛰게 할 수 있다."'],
  ['실험 기록','"다만… 요즘 자꾸 배가 고프다. 아무리 먹어도. 이상하다. 소리가… 먹고 싶다."']]},
 {title:'실험 기록 · 제???일',tone:'#ff4d6d',draw:r2Scrawl,mel:['E4','F4','E4','D4','E4','F4','G4','F4'],st:380,lines:[
  ['실험 기록','"내 이름이 기억나지 않는다. 오늘은 창밖의 새소리를 먹었다. 맛있었다."'],
  ['실험 기록','"배고파 배고파 배고파 배고파 배고파 배고파 배고파 배고파"'],
  ['실험 기록','"누가… 나를… 멈춰 줘……"']]},
 {title:'지금',tone:'#ff4dd2',draw:r2Now,now:true,mel:['E4','E4','F4','E4','E4','G4','F4','E4'],st:300,lines:[
  ['???','…싫어. 아직 끝낼 수 없어. 약속했단 말이야…!'],
  ['태초의 굶주림','(찢어지는 목소리) 배… 고… 파아아아아아!!']]}];
/* ---------- 최종 처치 후: 윤서의 회상 ---------- */
const FIN_SC=[
 {title:'마지막 열차, 그 후',tone:'#d88aff',draw:memS4,mel:['E5','D5','C5','A4','C5','D5','E5','D5'],st:430,lines:[
  ['윤서','(창가에서) …잠시만이야. 금방 돌아올게, 오메가.'],
  ['','하지만 떠난 사람들은 돌아오지 않았다. 잠드는 병은 오래 이어졌고, 약속은 조금씩 잊혀 갔다.'],
  ['윤서','아니. 나는 잊지 않아. 아무도 가지 않는다면— 나 혼자라도.']]},
 {title:'홀로 돌아온 길',tone:'#a8c8e8',draw:f2Return,mel:['A4','C5','E5','C5','B4','G4','A4','E4'],st:480,lines:[
  ['','몇 해 뒤, 한 사람이 홀로 시계골로 돌아왔다. 등에는 무거운 공구 가방을 지고.'],
  ['윤서','오메가… 늦어서 미안해. 박동이 이렇게나 약해졌구나.'],
  ['윤서','태엽만으로는 모자라. 새 심장이 필요해. 세상을 전부 뛰게 할 만큼 커다란 심장이.']]},
 {title:'시계탑 옥상',tone:'#b03aff',draw:f3Roof,mel:['E4','G4','B4','G4','A4','F4','E4','D4'],st:520,lines:[
  ['윤서','찾았다. 이 옥상 아래에, 소리를 먹는 무언가가 잠들어 있어.'],
  ['윤서','이 굶주림을 박동으로 바꿀 수만 있다면… 오메가는 다시는 멈추지 않아.'],
  ['윤서','실험이 필요해. 하지만 누구에게 이런 걸 시킬 수 있겠어.'],
  ['윤서','…그래. 나로 하자.']]},
 {title:'실험',tone:'#9affc8',draw:f4Exp,mel:['C5','E5','G5','E5','D5','F5','E5','C5'],st:440,lines:[
  ['','실험은 성공했다. 윤서의 몸 안에서, 굶주림은 박동이 되었다.'],
  ['윤서','느껴지니, 오메가? 이 박동이 너에게 닿고 있어. 조금만… 조금만 더 버텨.'],
  ['','그렇게 오메가는 삼백 년을 버텼다. 한 사람의 몸을 태워 만든 박동으로.']]},
 {title:'굶주림',tone:'#ff4d6d',draw:f5Hunger,mel:['A4','G4','F4','E4','F4','E4','D4','E4'],st:560,lines:[
  ['','하지만 굶주림은 박동만 만들지 않았다. 대가를 원했다.'],
  ['윤서','배가 고파… 이름이… 내 이름이 뭐였지……'],
  ['','그녀는 먼저 목소리를 잃고, 다음엔 얼굴을, 마지막엔 이름을 잃었다.'],
  ['','그리고 굶주림만 남았다. 사람들은 그것을 "태초의 굶주림"이라 불렀다.']]},
 {title:'마지막 빛',tone:'#ffd8a8',draw:f6Light,now:true,mel:['C5','E5','G5','C6','G5','E5','D5','C5'],st:420,lines:[
  ['윤서','…아. 이제야 조용하다. 배가… 고프지 않아.'],
  ['똑딱','…윤서? 기술장 윤서야? 오메가의 첫 박동을 만든…'],
  ['윤서','똑딱… 많이 컸구나. 그리고 너는— 선의 손자구나. 손이 빠른 아이.'],
  ['하루','당신이… 이 모든 걸 혼자 버텨 온 거예요?'],
  ['윤서','약속을 했거든. 돌아와서 태엽을 감아 주겠다고. …결국 지키지 못했지만.'],
  ['하루','아니에요. 지켰어요. 오메가가 삼백 년이나 뛸 수 있었던 건 당신 덕분이에요.'],
  ['윤서','…그렇게 말해 주니, 좋다. 이제 네가 태엽지기구나. 부탁할게.'],
  ['','윤서의 모습이 새벽빛 속으로 천천히 흩어졌다. 마지막으로, 아주 작은 목소리가 들렸다.'],
  ['윤서','좋은 아침.']]}];
function startFinalMem(){const now=performance.now();G.state='epi';G.shard=null;stopMusic();
 G.cine={type:'revive',ph:'mem',mem:true,epi:true,mset:FIN_SC,si:0,li:0,lt0:now+1200,st0:now,trans:null,memIn:now,st:0,
  onEnd:()=>{G.state='dying';saveData.fin2Seen=1;saveNow();fightEnd(true)}};sfx(46,.8,'sine',.12,40)}
/* ---------- 장면 그림 ---------- */
function yunseo(x,y,s,t,a,col){ctx.save();ctx.globalAlpha=a==null?1:a;memPerson(x,y,col||'#e8e0d0','#3a2a4a','hold',t,true,s);ctx.restore()}
function r2Crack(now,k){const t=now/1000;memSky('#0a0610','#1a0a1e',0,H);for(let i=0;i<40;i++){const r=rng(i*5);pcirc(r()*W,60+r()*180,8+r()*14,'#2a1030',.25)}
 try{drawMech(ctx,BOSSES[MUT_BI],W/2,236,now,{pulse:0,expose:false,open:0,eye:0,dorm:true,flash:false,warn:0},3)}catch(e){}
 RA(0,0,W,H,'#000',.35);const cx=W/2,cy=150,op=Math.min(1,k*1.6);for(let j=-30;j<30;j++){const w=Math.max(0,(4+Math.sin(j*.7)*2)*op*(1-Math.abs(j)/30));R(cx-w/2+Math.sin(j*.4)*3,cy+j,w,1,'#e8d8ff')}
 glow(cx,cy,30*op+10,'#d8b8ff',.35*op);if(k>.25){ctx.save();ctx.globalAlpha=.35+.25*Math.sin(t*3);yunseo(cx,cy+14,1.6,t,1,'#f0e8ff');ctx.restore()}}
function labRoom(t,green){memSky('#081410','#0e1c18',0,H);for(let i=0;i<W;i+=40){R(i,22,6,190,'#16241e');R(i+2,22,1,190,'#223a30')}R(0,212,W,88,'#0c1612');R(0,212,W,1,'#2a4a3a');
 for(let i=0;i<5;i++){const x=40+i*100;bbLine(x,22,x+30,60,'#2a3a34');}for(let i=0;i<8;i++){const x=20+i*60,q=(t*.5+i*.2)%1;RA(x,22+q*40,2,2,green,.4*(1-q))}}
function labTank(x,y,h,inner,t,glowCol){R(x-22,y-h-6,44,6,'#5a6a70');R(x-22,y,44,8,'#5a6a70');R(x-20,y-h,40,h,'#0a2a22');RA(x-20,y-h,40,h,glowCol,.25);R(x-20,y-h,2,h,'#bfe8ff');R(x+14,y-h,2,h,'#8ac8d8');
 for(let i=0;i<8;i++){const q=((t*.6)+i/8)%1;pcirc(x-14+((i*7)%28),y-q*h,1.2+q,'#bfffe8',.6*(1-q))}if(inner)inner();glow(x,y-h/2,40,glowCol,.2);
 for(const dx of [-12,0,12]){bbLine(x+dx,y-h-6,x+dx*2,22,'#3a4a44')}}
function r2Lab1(now,k){const t=now/1000;labRoom(t,'#3aff8a');labTank(320,208,120,null,t,'#3aff8a');
 R(60,178,110,6,'#5a3a24');R(66,184,4,28,'#3a2414');R(160,184,4,28,'#3a2414');R(90,168,34,10,'#e8dcc0');for(let i=0;i<4;i++)R(94,170+i*2,24,1,'#6a5a4a');R(140,160,3,18,'#8a8a90');pcirc(141,158,5,'#ffe9a8');glow(141,160,26,'#ffe9a8',.3);
 ctx.save();ctx.globalAlpha=.9;memPerson(110,210,'#1a1a22','#0a0a10','hold',0,true,2.2);ctx.restore()}
function r2Lab2(now,k){const t=now/1000;labRoom(t,'#b03aff');labTank(W/2,212,140,()=>{ctx.save();ctx.globalAlpha=.55+.2*Math.sin(t*2);memPerson(W/2,196+Math.sin(t*1.5)*3,'#6a4a8a','#2a1a3a','none',0,true,2.4);ctx.restore()},t,'#b03aff');
 for(const [gx,gy] of [[80,90],[400,90]]){pcirc(gx,gy,16,'#3a4a44');pcirc(gx,gy,13,'#e8f0e8');const a=-2.4+Math.min(1,k*1.5)*2+Math.sin(t*8)*.08;bbLine(gx,gy,gx+Math.cos(a)*11,gy+Math.sin(a)*11,'#d23a3a')}}
function r2Scrawl(now,k){const t=now/1000,jx=Math.round((RND()-.5)*2*k);R(0,0,W,H,'#140808');ctx.save();ctx.translate(jx,0);R(70,30,340,190,'#d8ccb0');R(70,30,340,3,'#f0e6cc');for(let i=0;i<14;i++)R(84,50+i*12,312,1,'#b8a888');
 ctx.font='bold 13px monospace';ctx.fillStyle='#6a2a2a';const rr=rng(77);for(let i=0;i<Math.floor(4+k*14);i++){ctx.save();ctx.translate(90+rr()*260,58+rr()*150);ctx.rotate((rr()-.5)*.5);ctx.globalAlpha=.5+rr()*.5;ctx.fillStyle=i%3?'#6a1a1a':'#a02020';ctx.fillText('배고파',0,0);ctx.restore()}
 for(let i=0;i<6;i++){const x=100+i*50,L=((t*.4+i*.3)%1)*40*k;R(x,40,2,L,'#6a1a1a')}ctx.restore();RA(0,0,W,H,'#ff0000',.05+.05*Math.sin(t*9))}
function r2Now(now,k){const t=now/1000;R(0,0,W,H,'#080008');for(let i=0;i<30;i++){const r=rng(i*9);let px=r()*W,py=r()*H;for(let s=0;s<8;s++){const nx=px+(r()-.5)*30,ny=py+(r()-.5)*30;bbLine(px,py,nx,ny,'#4a0a3a',.6);px=nx;py=ny}}
 const op=Math.min(1,k*1.4);for(const [ex,ey,sz] of [[W/2,120,1],[W/2-110,90,.5],[W/2+110,90,.5],[W/2-60,170,.4],[W/2+60,170,.4]]){const h=24*sz*op,w=70*sz;for(let j=-h;j<=h;j++){const ww=w*Math.sqrt(Math.max(0,1-(j/Math.max(1,h))**2));R(ex-ww,ey+j,ww*2,1,'#f0e0e0')}if(op>.2){pcirc(ex,ey,Math.min(h,18*sz),'#ff2d55');pcirc(ex,ey,Math.min(h,8*sz),'#140008');R(ex-2*sz,ey-5*sz,3*sz,3*sz,'#ffffff')}}
 if(k>.5)RA(0,0,W,H,'#ff2d55',.08+.08*Math.sin(t*14))}
function f2Return(now,k){const t=now/1000;memSky('#0a1424','#1a2a40',0,H);for(let i=0;i<12;i++){const x=60+i*28,y=250-i*16;R(x,y,40,6,'#3a4450');R(x,y,40,1,'#8a9aa8');R(x,y+6,40,250-y,'#222a34')}
 for(let i=0;i<70;i++){const r=rng(i*31),q=((t*.12)+r())%1;RA(r()*W+Math.sin(t+i)*6,q*H,1,1,'#e8f0ff',.7)}
 const step=Math.min(10,Math.floor(k*11)),px=80+step*28,py=250-step*16;R(px-10,py-24,8,14,'#6a4a2a');yunseo(px,py,2,t,1,'#c8c0b0');R(px+8,py-22,1,10,'#4a3a2a');pcirc(px+9,py-10,3,'#ffe36b');glow(px+9,py-10,26,'#ffe36b',.35)}
function f3Roof(now,k){const t=now/1000;memSky('#060410','#1a0c28',0,170);for(let i=0;i<50;i++){const r=rng(i*3);RA(r()*W,r()*140,1,1,'#ffffff',.3+.4*Math.abs(Math.sin(t+i)))}
 pcirc(W/2,70,60,'#2a2030');pcirc(W/2,70,54,'#3a3040');for(let i=0;i<12;i++){const q=i*TAU/12;R(W/2+Math.cos(q)*46-2,70+Math.sin(q)*46-2,4,4,'#6a5a70')}
 R(0,170,W,130,'#1a1420');for(let i=0;i<W;i+=24)R(i,170,1,130,'#241c2a');
 const p=.5+.5*Math.sin(t*1.6);for(let i=0;i<9;i++){const a=i*TAU/9+t*.2;let px=W/2,py=222;for(let s=0;s<10;s++){const nx=px+Math.cos(a+Math.sin(t+s)*.4)*9,ny=py+Math.sin(a+Math.sin(t+s)*.4)*4;bbLine(px,py,nx,ny,'#5a1a6a',.8);px=nx;py=ny}}
 for(let j=0;j<16;j++){const w=(60-j*3)*(1+p*.06);R(W/2-w/2,214+j*.8-8,w,1,j<3?'#6a2a8a':'#1a0a20')}glow(W/2,218,60,'#b03aff',.25+p*.15);
 yunseo(W/2-100,232,2.6,t,1);R(W/2-92,212,12,10,'#e8dcc0')}
function f4Exp(now,k){const t=now/1000;labRoom(t,'#3aff8a');labTank(170,212,140,()=>{ctx.save();ctx.globalAlpha=.8;memPerson(170,196+Math.sin(t*1.5)*3,'#e8e0d0','#e8722a','none',0,true,2.4);ctx.restore()},t,'#9affc8');
 try{drawMech(ctx,BOSSES[OMEGA_BI],380,220,now,{pulse:Math.pow(1-((t*1.3)%1),3),expose:false,open:0,eye:0,dorm:false,flash:false,warn:0},2)}catch(e){}
 bbLine(190,90,340,150,'#3a4a44');for(let i=0;i<4;i++){const q=((t*.8)+i/4)%1;pcirc(190+150*q,90+60*q,2.5,'#ff8fb0');glow(190+150*q,90+60*q,8,'#ff8fb0',.4)}}
function f5Hunger(now,k){const t=now/1000;R(0,0,W,H,'#0a040c');const x=W/2,y=226,dk=Math.min(1,k*1.2);
 for(let i=0;i<14;i++){const a=i*TAU/14+t*.3,len=40+dk*110;let px=x,py=y-30;for(let s=0;s<12;s++){const q=s/12,nx=x+Math.cos(a+Math.sin(t*2+i+s)*.3)*len*q,ny=y-30+Math.sin(a+Math.sin(t*2+i+s)*.3)*len*q*.8;bbLine(px,py,nx,ny,'#8a1a7a',.9);px=nx;py=ny}}
 yunseo(x,y,3,t,1,mixc('#e8e0d0','#1a0a1a',dk));if(dk>.75){R(x-4,y-32,2,2,'#ff2d55');R(x+2,y-32,2,2,'#ff2d55');glow(x,y-31,10,'#ff2d55',.4)}
 ctx.save();ctx.globalAlpha=dk*.6;R(0,0,W,H,'#1a001a');ctx.restore()}
function f6Light(now,k){const t=now/1000;memSky('#ffb08a','#ffe0c0',0,180);pcirc(W/2,176,40,'#fff4d0');glow(W/2,170,120,'#fff0c0',.35);R(0,180,W,120,'#6a4a5a');for(let i=0;i<W;i+=24)R(i,180,1,120,'#5a3a4a');
 try{drawKnight(ctx,150,210,2.6,false,null,t*2)}catch(e){}try{drawTick(ctx,196,164+Math.sin(t*3)*3,now,1.6)}catch(e){}
 const fade=k>.85?Math.max(0,1-(k-.85)/.15):1;glow(330,190,40,'#ffffff',.3*fade);yunseo(330,226,2.6,t,.75*fade,'#f4f0ff');
 for(let i=0;i<24;i++){const q=((t*.25)+i/24)%1;RA(300+((i*37)%60),236-q*200,1+(i%2),1+(i%2),'#fff6e0',(1-q)*(k>.8?1:.5))}}
/* ---------- 완전 변이 모습 (실루엣 유지 + 실험 장치 · 눈 · 촉수 · 캡슐 속 사람) ---------- */
function drawMutant(cc,x,y,now,bo,u){u=u||U;const s=u/5,B=BOSSES[MUT_BI],g=geo(B,x,y,u),cx=x,cy=g.coreY,t=now/1000,hw=g.hf*u,top=g.top,bot=g.y;
 const F=(a,b,w,h,col,al)=>{cc.globalAlpha=al==null?1:al;cc.fillStyle=col;cc.fillRect(Math.round(a),Math.round(b),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)))};
 const C=(a,b,r,col,al)=>pcirc(a,b,Math.max(.6,r),col,al==null?1:al,cc);
 const LN=(x0,y0,x1,y1,col,w,al)=>{const n=Math.max(1,Math.ceil(Math.hypot(x1-x0,y1-y0)));for(let i=0;i<=n;i++)F(x0+(x1-x0)*i/n-w/2,y0+(y1-y0)*i/n-w/2,w,w,col,al)};
 // 뒤: 촉수 · 링거 줄
 for(let i=0;i<6;i++){const sd=i<3?-1:1,k=i%3,bx=cx+sd*hw*.5,by=cy+(k-1)*10*s;let px=bx,py=by;for(let j=0;j<14;j++){const q=j/14,nx=px+sd*(3+k)*s,ny=py+Math.sin(t*2.2+j*.5+i)*3*s-1*s;LN(px,py,nx,ny,j%3?'#5a1a4a':'#7a2a6a',Math.max(1,(4-q*3)*s),1);px=nx;py=ny}C(px,py,1.5*s,'#ff4dd2')}
 for(const dx of [-hw*.4,hw*.1,hw*.45]){const x0=cx+dx;LN(x0,top+4*s,x0+Math.sin(t+dx)*6*s,top-60*s,'#4a5a58',Math.max(1,1.2*s),.9);const q=((t*.7)+dx*.01)%1;C(x0+Math.sin(t+dx)*6*s*q,top+4*s-64*s*q,1.4*s,'#3aff8a',.9)}
 // 몸 (원래 실루엣)
 try{drawMech(cc,B,x,y,now,bo,u)}catch(e){}
 // 실험 고정 밴드 (리벳)
 for(const fy of [.28,.55,.8]){const by=top+(bot-top)*fy,bw=hw*(1.6-fy*.5);F(cx-bw,by,bw*2,3*s,'#6a747c',.95);F(cx-bw,by,bw*2,1*s,'#a8b4bc',.9);for(let i=-3;i<=3;i++)C(cx+i*bw/3.5,by+1.5*s,.9*s,'#dfe6ea')}
 // 몸을 관통한 유리관 (녹색 액체)
 for(const [a,len] of [[-.7,26],[.5,30],[2.6,22]]){const x0=cx+Math.cos(a)*hw*.5,y0=cy+Math.sin(a)*10*s,x1=x0+Math.cos(a)*len*s,y1=y0+Math.sin(a)*len*s-6*s;LN(x0,y0,x1,y1,'#bfe8ff',Math.max(1,3*s),.55);LN(x0,y0,x1,y1,'#3aff8a',Math.max(1,1.4*s),.9);const q=((t*1.2)+a)%1;C(x0+(x1-x0)*q,y0+(y1-y0)*q,1*s,'#eaffea')}
 // 가슴 캡슐 속 사람
 const kx=cx,ky=cy+2*s,kw=12*s,kh=16*s;F(kx-kw/2-1.5*s,ky-kh/2-1.5*s,kw+3*s,kh+3*s,'#2a2a34');F(kx-kw/2,ky-kh/2,kw,kh,'#1a0a2a');F(kx-kw/2,ky-kh/2,kw,kh,'#b03aff',.35+.15*Math.sin(t*2));
 const al=.5+.3*Math.sin(t*1.7);C(kx,ky-4*s,2.2*s,'#f0e8ff',al);F(kx-3*s,ky-4*s,1.2*s,7*s,'#f0e8ff',al*.8);F(kx+1.8*s,ky-4*s,1.2*s,7*s,'#f0e8ff',al*.8);F(kx-2*s,ky-1*s,4*s,7*s,'#f0e8ff',al*.7);F(kx-kw/2,ky-kh/2,1*s,kh,'#dff4ff',.7);
 // 여분의 눈 (플레이어를 본다)
 const eyes=[[-.75,.18],[.75,.18],[-.5,.05],[.5,.05],[-.9,.42],[.9,.42]];eyes.forEach(([ex,ey],i)=>{const X=cx+ex*hw,Y=top+(bot-top)*ey,bl=((now/400+i*1.3)%7)<.3;C(X,Y,3*s,'#2a0a1a');if(bl){F(X-2.5*s,Y,5*s,1*s,'#ff4dd2');return}C(X,Y,2.3*s,'#ffe0e8');const a=Math.atan2(P.y-Y,P.x-X);C(X+Math.cos(a)*.9*s,Y+Math.sin(a)*.9*s,1.2*s,'#ff2d55');F(X-1*s,Y-1.5*s,1,1,'#ffffff')});
 // 이빨 고리 · 침
 const ty=top+(bot-top)*.68;for(let i=-4;i<=4;i++){const tx=cx+i*hw*.2;cc.fillStyle='#f4ecd8';cc.globalAlpha=1;for(let k=0;k<4*s;k++){const ww=Math.max(1,(3*s)*(1-k/(4*s)));cc.fillRect(Math.round(tx-ww/2),Math.round(ty+k),Math.round(ww),1)}}
 for(let i=0;i<4;i++){const dx=cx+(i-1.5)*hw*.35,q=((t*.5)+i*.27)%1;F(dx,ty+4*s+q*14*s,1*s,(2+q*4)*s,'#b03aff',.8*(1-q))}
 if(bo&&bo.flash)F(cx-hw,top,hw*2,bot-top,'#ffffff',.35);cc.globalAlpha=1}
function drawMutantAura(now,back){if(!G.omega||G.state==='dying'||G.bi!==MUT_BI)return;const g=bgeo(),t=now/1000,hw=g.hf*U,cy=g.coreY,fr=(typeof G.beat==='number')?((G.beat%1)+1)%1:0,pulse=Math.pow(1-fr,3);
 if(back){glow(g.x,cy,80+pulse*20,'#b03aff',.2+pulse*.15);for(let i=0;i<10;i++){const q=((t*.3)+i/10)%1,a=i*TAU/10+t*.2;pcirc(g.x+Math.cos(a)*(40+q*70),cy+Math.sin(a)*(20+q*30)-q*30,4+q*8,'#2a0a2a',.35*(1-q))}}
 else{for(let i=0;i<14;i++){const q=((t*.45)+i/14)%1,sx=g.x+((i*37)%(hw*3))-hw*1.5;RA(sx,g.y-q*120,2,2,i%2?'#ff4dd2':'#3aff8a',1-q)}
  if(pulse>.6){RA(AX,AY,AW,2,'#b03aff',pulse*.5);RA(AX,AY+AH-2,AW,2,'#b03aff',pulse*.5);RA(AX,AY,2,AH,'#b03aff',pulse*.5);RA(AX+AW-2,AY,2,AH,'#b03aff',pulse*.5)}
  if(Math.floor(now/80)%6===0){const s=Math.floor(now/80);revBolt(g.x+(rng(s)()-.5)*hw*2,g.top,g.x+(rng(s+1)()-.5)*hw*3,g.top-30,s%2?'#b03aff':'#3aff8a',s)}}}
