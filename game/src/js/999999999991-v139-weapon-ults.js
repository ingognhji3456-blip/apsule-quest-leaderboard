/* v139: 무기 40종 궁극기를 하나하나 다르게 (ULT139)
   전에는 무기 종류 10가지 틀(sword · dagger …)을 40개가 나눠 쓰고, 어느 궁극기든 화면을 어둡게 + 적이 멈춤(탑) → 다 「시간 정지」 같았다.
   이제 무기마다 고유한 능력 · 맞히는 방식 · 그림:
     맞히는 방식 pat: all(전부) · near(내 주변) · line(앞으로 일직선) · rand(아무나 하나) · top(가장 센 적) · center(적 무리 가운데)
     능력 eff: burn 화상 · poison 독 · chill 느려짐 · stun 기절 · freeze 얼림/멈춤 · pull 끌어당김 · push 밀침 · exec 처형(체력 낮으면 큰 피해)
               drain 흡혈 · heal 회복 · shield 무적 · crit 치명 · dash 내가 돌진 · cost 체력 대가
   진짜로 시간을 멈추는 건 시간의 검 · 무한의 검 · 시간의 단검 · 영원의 검 뿐(그 밖엔 적이 계속 움직임, 궁극기 동안 나는 무적).
   어디서나 같은 엔진: 탑(TW71.T.mobs) · 일반 보스전(G.boss, spDmg) · 클라비스 결투 · 던전(SK130.enemies).
   현질 세트 검(SET61 세트 궁극기) · 듀오/결투(PvP, 동료에게 궁극기를 보내야 함)는 예전 궁극기를 그대로 쓴다. */
(function(){try{
 const now0=()=>performance.now(),snd=(f,d,w,v,e)=>{try{sfx(f,d,w,v,e)}catch(_){}},rnd=(a,b)=>a+Math.random()*(b-a),cl=(v,a,b)=>Math.max(a,Math.min(b,v));
 /* ---------- 그리기 도구(게임 좌표) ---------- */
 const H={
  sl(o,x,y,a,L,c,w,al){o.save();o.globalAlpha=al;o.lineCap='round';o.strokeStyle=c;o.lineWidth=w*2.2;o.globalAlpha=al*.35;o.beginPath();o.moveTo(x-Math.cos(a)*L,y-Math.sin(a)*L);o.lineTo(x+Math.cos(a)*L,y+Math.sin(a)*L);o.stroke();o.globalAlpha=al;o.strokeStyle='#ffffff';o.lineWidth=w*.6;o.stroke();o.restore()},
  rg(o,x,y,r,c,w,al,fy){o.save();o.globalAlpha=al;o.strokeStyle=c;o.lineWidth=w;o.beginPath();o.ellipse(x,y,Math.max(.1,r),Math.max(.1,r*(fy||.5)),0,0,TAU);o.stroke();o.restore()},
  disk(o,x,y,r,c,al){o.save();o.globalAlpha=al;const g=o.createRadialGradient(x,y,0,x,y,Math.max(1,r));g.addColorStop(0,c);g.addColorStop(1,'rgba(0,0,0,0)');o.fillStyle=g;o.fillRect(x-r,y-r,r*2,r*2);o.restore()},
  bolt(o,x0,y0,x1,y1,c,al,w){o.save();o.globalAlpha=al;o.strokeStyle=c;o.lineWidth=w||2;o.beginPath();o.moveTo(x0,y0);const n=7;for(let i=1;i<n;i++){const q=i/n;o.lineTo(x0+(x1-x0)*q+rnd(-6,6),y0+(y1-y0)*q+rnd(-4,4))}o.lineTo(x1,y1);o.stroke();o.strokeStyle='#ffffff';o.lineWidth=(w||2)*.4;o.stroke();o.restore()},
  fl(o,x,y,s,al){o.save();o.globalAlpha=al;for(let i=0;i<3;i++){o.fillStyle=['#ff3a1a','#ff8a3a','#ffe08a'][i];o.beginPath();o.ellipse(x,y-s*(.4+i*.25),s*(1-i*.28),s*(1.5-i*.35),0,0,TAU);o.fill()}o.restore()},
  st(o,x,y,r,c,al){o.save();o.globalAlpha=al;o.fillStyle=c;o.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,rr=i%2?r*.35:r;o.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}o.closePath();o.fill();o.restore()},
  cr(o,x,y,r,a,c,al,w){o.save();o.globalAlpha=al;o.strokeStyle=c;o.lineWidth=w||5;o.lineCap='round';o.beginPath();o.arc(x,y,r,a-1.1,a+1.1);o.stroke();o.strokeStyle='#ffffff';o.lineWidth=(w||5)*.35;o.stroke();o.restore()},
  pil(o,x,y,w,h,c,al){o.save();o.globalAlpha=al;const g=o.createLinearGradient(0,y-h,0,y);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.7,c);g.addColorStop(1,'#ffffff');o.fillStyle=g;o.fillRect(x-w/2,y-h,w,h);o.restore()},
  tint(o,c,al){o.save();o.globalAlpha=al;o.fillStyle=c;o.fillRect(AX,AY,AW,AH);o.restore()},
  key(o,x,y,a,s,c,al){o.save();o.globalAlpha=al;o.translate(x,y);o.rotate(a);o.fillStyle=c;o.fillRect(-s,-s*.18,s*2,s*.36);o.fillRect(s*.5,-s*.6,s*.25,s*1.2);o.restore()},
  cl(o,x,y,r,c,al){o.save();o.globalAlpha=al;o.fillStyle=c;for(let i=0;i<6;i++){o.beginPath();o.arc(x+Math.cos(i)*r*.6,y+Math.sin(i*1.7)*r*.3,r*.55,0,TAU);o.fill()}o.restore()}};
 const ease=k=>1-Math.pow(1-cl(k,0,1),3),fade=(t,a,b)=>t<a?0:t>b?0:Math.sin((t-a)/(b-a)*Math.PI);

 /* ---------- 무기별 궁극기 ----------
    h: [시각ms, 몫, 방식, 능력…]  m: 피해 배율  fx(o,S,t): 그림  tn: 화면 물들임 [색, 세기]  s: 시작 소리 */
 const U={
  sword:{n:'십자 베기',c:'#ffffff',m:1.0,s:[520,.2,'sawtooth',.06,180],h:[[200,.4,'center'],[480,.6,'center','crit']],
   fx(o,S,t){for(const [st,a] of [[160,.78],[440,-.78]]){const q=ease((t-st)/120),al=fade(t,st,st+520);if(al>0)H.sl(o,S.cx,S.cy,a,70*q,'#9fd8ff',4,al)}}},
  dagger:{n:'그림자 난무',c:'#b48aff',m:.95,s:[900,.08,'square',.04,1400],h:[[0,.12,'rand','crit'],[90,.12,'rand'],[180,.12,'rand','crit'],[270,.12,'rand'],[360,.12,'rand','crit'],[450,.12,'rand'],[540,.14,'rand','crit']],
   fx(o,S,t){for(let i=0;i<7;i++){const st=i*90,al=fade(t,st,st+260);if(al<=0)continue;const a=i*2.4,x=S.cx+Math.cos(a)*36,y=S.cy+Math.sin(a)*22;H.disk(o,x,y,10,'#3a1a5a',al*.8);H.sl(o,(x+S.cx)/2,(y+S.cy)/2,a,24,'#b48aff',2,al)}}},
  great:{n:'대지 가르기',c:'#e8c08a',m:1.15,s:[90,.5,'sawtooth',.09,40],h:[[560,1,'line','stun']],
   fx(o,S,t){const q=ease((t-380)/200),al=fade(t,380,1200);if(al<=0)return;const L=340*q;o.save();o.globalAlpha=al;o.strokeStyle='#2a1a0a';o.lineWidth=6;o.beginPath();o.moveTo(S.px,S.py);for(let i=1;i<=12;i++){const d=L*i/12;o.lineTo(S.px+Math.cos(S.a)*d+Math.sin(i*1.7)*4,S.py+Math.sin(S.a)*d+Math.cos(i*2.1)*3)}o.stroke();o.strokeStyle='#ffb060';o.lineWidth=2;o.stroke();o.restore();for(let i=0;i<5;i++)H.disk(o,S.px+Math.cos(S.a)*L*i/5,S.py+Math.sin(S.a)*L*i/5,14,'#e8c08a',al*.5)}},
  katana:{n:'일섬',c:'#f4f8ff',m:1.25,s:[1800,.05,'sine',.05,2400],h:[[900,1,'all','exec']],tn:['#000000',.35],
   fx(o,S,t){if(t<880){const k=t/880;o.save();o.globalAlpha=.6*k;o.strokeStyle='#ffffff';o.lineWidth=1;o.beginPath();o.moveTo(AX,S.cy-6);o.lineTo(AX+AW*k,S.cy-6);o.stroke();o.restore()}else{const al=fade(t,880,1400);o.save();o.globalAlpha=al;o.fillStyle='#ffffff';o.fillRect(AX,S.cy-8,AW,3*al+1);o.restore();H.tint(o,'#ffffff',al*.25)}}},
  axe:{go:1,n:'회전 도끼',c:'#c8d0d8',m:1.0,s:[300,.15,'sawtooth',.05,600],h:[[380,.3,'near','pull'],[560,.3,'near','pull'],[740,.4,'near']],
   fx(o,S,t){const al=fade(t,250,1000);if(al<=0)return;const a=t/60;for(let i=0;i<2;i++){const b=a+i*Math.PI;H.key(o,S.px+Math.cos(b)*34,S.py-8+Math.sin(b)*16,b+1.57,7,'#c8d0d8',al)}H.rg(o,S.px,S.py,40,'#ffffff',2,al*.6)}},
  rapier:{n:'빙결 찌르기',c:'#9fe8ff',m:.9,s:[1500,.1,'triangle',.05,2400],h:[[200,.18,'line','chill'],[300,.18,'line','chill'],[400,.18,'line','chill'],[500,.18,'line','chill'],[600,.28,'line','chill','stun']],
   fx(o,S,t){for(let i=0;i<5;i++){const st=200+i*100,al=fade(t,st-60,st+260);if(al<=0)continue;const d=40+i*30,x=S.px+Math.cos(S.a)*d,y=S.py-8+Math.sin(S.a)*d;o.save();o.globalAlpha=al;o.fillStyle='#e8f8ff';o.beginPath();o.moveTo(x,y-14);o.lineTo(x+5,y);o.lineTo(x,y+4);o.lineTo(x-5,y);o.closePath();o.fill();o.restore()}}},
  flame:{n:'화염 폭풍',c:'#ff8a3a',m:.85,s:[160,.5,'sawtooth',.07,60],h:[[250,.2,'center','burn'],[400,.2,'center','burn'],[550,.2,'center','burn'],[700,.2,'center','burn'],[850,.2,'center','burn']],tn:['#ff4a1a',.12],
   fx(o,S,t){for(let i=0;i<5;i++){const st=200+i*150,al=fade(t,st,st+500);if(al<=0)continue;const a=i*1.3,x=S.cx+Math.cos(a)*40,y=S.cy+Math.sin(a)*20;H.fl(o,x,y,10+6*al,al)}}},
  spear:{n:'천둥 낙뢰',c:'#ffe36b',m:.95,s:[1200,.12,'square',.05,300],h:[[300,.25,'rand','stun'],[500,.25,'rand'],[700,.25,'rand','stun'],[900,.25,'rand']],
   fx(o,S,t){for(const e of S.ev){const al=fade(now0()-e.t,0,260);if(al>0)H.bolt(o,e.x+rnd(-4,4),AY,e.x,e.y-6,'#ffe36b',al,3)}}},
  scythe:{go:1,n:'영혼 수확',c:'#d8a8ff',m:1.0,s:[260,.4,'sawtooth',.06,90],h:[[520,1,'near','drain']],
   fx(o,S,t){const al=fade(t,300,1100);if(al>0)H.cr(o,S.px,S.py-8,60*ease((t-300)/250),t/300,'#d8a8ff',al,7)}},
  chrono:{n:'시간 정지',c:'#ffe79a',m:1.2,freeze:1,s:[220,.6,'sine',.06,110],h:[[1100,1,'all']],tn:['#20202a',.45],
   fx(o,S,t){const al=fade(t,0,1500);o.save();o.globalAlpha=al*.8;o.strokeStyle='#ffe79a';o.lineWidth=2;o.beginPath();o.arc(W/2,AY+AH/2,60,-Math.PI/2,-Math.PI/2+TAU*Math.min(1,t/1100));o.stroke();o.restore();if(t>1100)for(let i=0;i<12;i++)H.sl(o,S.cx+rnd(-30,30),S.cy+rnd(-20,20),rnd(0,3),26,'#ffe79a',2,fade(t,1100,1500))}},
  toxfang:{n:'맹독 난무',c:'#8aff5a',m:.7,s:[700,.2,'square',.04,300],h:[[100,.25,'center','poison'],[350,.25,'center','poison'],[600,.25,'center','poison'],[850,.25,'center','poison']],
   fx(o,S,t){const al=fade(t,0,1500);H.cl(o,S.cx,S.cy,40+t/40,'#4aff4a',al*.25);for(let i=0;i<4;i++){const st=100+i*250,a2=fade(t,st,st+200);if(a2>0)H.sl(o,S.cx,S.cy,i*.8,30,'#8aff5a',2,a2)}}},
  hammer:{n:'파쇄 강타',c:'#8dcdf5',m:1.0,s:[70,.6,'sawtooth',.1,30],h:[[600,1,'all','stun','shbreak']],
   fx(o,S,t){const al=fade(t,550,1300);if(al<=0)return;const k=ease((t-550)/500);for(let i=0;i<3;i++)H.rg(o,S.px,S.py,30+k*200-i*25,'#8dcdf5',3,al*(1-i*.25))}},
  frostgreat:{n:'빙하 가르기',c:'#bfe8ff',m:1.0,s:[400,.4,'triangle',.06,120],h:[[500,1,'line','freezeS']],tn:['#9fd8ff',.1],
   fx(o,S,t){const q=ease((t-300)/250),al=fade(t,300,1500);for(let i=0;i<10;i++){const d=i*34*q,x=S.px+Math.cos(S.a)*d,y=S.py+Math.sin(S.a)*d;o.save();o.globalAlpha=al;o.fillStyle=i%2?'#e8f8ff':'#9fd8ff';o.beginPath();o.moveTo(x-6,y);o.lineTo(x,y-18-(i%3)*4);o.lineTo(x+6,y);o.closePath();o.fill();o.restore()}}},
  voltrapier:{n:'섬광 찌르기',c:'#fff36b',m:1.0,s:[1600,.1,'square',.05,800],h:[[150,.25,'rand','dash'],[300,.25,'rand','dash'],[450,.25,'rand','dash'],[600,.25,'rand','dash','stun']],
   fx(o,S,t){for(let i=1;i<S.trail.length;i++){const a=S.trail[i-1],b=S.trail[i],al=fade(now0()-b.t,0,400);if(al>0)H.bolt(o,a.x,a.y-8,b.x,b.y-8,'#fff36b',al,2)}}},
  bloodscythe:{go:1,n:'피의 수확',c:'#ff3a5a',m:.9,s:[200,.5,'sawtooth',.06,60],h:[[300,.5,'near','drain'],[700,.5,'near','drain']],tn:['#5a0010',.15],
   fx(o,S,t){for(const st of [250,650]){const al=fade(t,st,st+500);if(al>0)H.cr(o,S.px,S.py-8,56,st/200+t/400,'#ff3a5a',al,6)}}},
  lavaaxe:{go:1,n:'용암 회전',c:'#ff6a2a',m:.8,s:[180,.4,'sawtooth',.06,70],h:[[350,.3,'near','burn'],[650,.3,'near','burn'],[950,.4,'near','burn','lava']],
   fx(o,S,t){const al=fade(t,250,1200);if(al>0){const a=t/55;H.key(o,S.px+Math.cos(a)*30,S.py-8+Math.sin(a)*14,a,7,'#ff6a2a',al);H.rg(o,S.px,S.py,36,'#ff6a2a',3,al*.6)}}},
  piercer:{n:'관통 일격',c:'#e0f0ff',m:1.2,s:[700,.2,'sawtooth',.06,200],h:[[450,1,'line','shbreak','elite2']],
   fx(o,S,t){const al=fade(t,380,900);if(al<=0)return;o.save();o.globalAlpha=al;o.strokeStyle='#e0f0ff';o.lineWidth=8*al;o.beginPath();o.moveTo(S.px,S.py-8);o.lineTo(S.px+Math.cos(S.a)*500,S.py-8+Math.sin(S.a)*500);o.stroke();o.restore()}},
  starblade:{n:'별 폭풍',c:'#fff3b0',m:.9,s:[1400,.2,'sine',.05,700],h:Array.from({length:10},(_,i)=>[200+i*80,.1,'rand']),
   fx(o,S,t){for(const e of S.ev){const k=(now0()-e.t)/300;if(k<1)H.st(o,e.x,e.y-10-(1-k)*0,10*(1-k)+4,'#fff3b0',1-k)}for(let i=0;i<6;i++){const k=((t/600)+i/6)%1;H.st(o,AX+((i*97)%AW),AY+k*AH,3,'#fff3b0',.5*fade(t,0,1100))}}},
  windtwin:{go:1,n:'질풍 난무',c:'#9fffd0',m:.85,s:[600,.3,'triangle',.04,1200],h:Array.from({length:8},(_,i)=>[100+i*90,.125,'near',i===7?'push':'']),
   fx(o,S,t){const al=fade(t,0,1100);for(let i=0;i<3;i++)H.rg(o,S.px,S.py-6-i*8,26+i*8+Math.sin(t/60+i)*4,'#9fffd0',2,al*.7)}},
  poisonlance:{n:'독룡 돌격',c:'#7aff7a',m:1.0,s:[300,.3,'sawtooth',.06,120],h:[[200,.5,'line','poison','dash'],[600,.5,'line','poison']],
   fx(o,S,t){for(const p of S.trail){const al=fade(now0()-p.t,0,1400);if(al>0)H.cl(o,p.x,p.y,10,'#5aff5a',al*.35)}}},
  judgment:{n:'심판',c:'#fff6c8',m:1.0,s:[1100,.5,'sine',.06,550],h:[[700,1,'top','judge']],
   fx(o,S,t){const tg=S.T0||{x:S.cx,y:S.cy};if(t<700)H.rg(o,tg.x,tg.y,22,'#fff6c8',2,.4+.4*Math.sin(t/40));const al=fade(t,600,1300);if(al>0)H.pil(o,tg.x,tg.y,30*al,AH,'#fff6c8',al)}},
  shadowkatana:{n:'영 일섬',c:'#8a6aff',m:1.15,s:[1500,.1,'sine',.05,2400],h:[[600,1,'all','exec']],tn:['#100820',.3],
   fx(o,S,t){for(let i=0;i<3;i++){const a=i*TAU/3,x=S.cx+Math.cos(a)*50,y=S.cy+Math.sin(a)*28;if(t<600)H.disk(o,x,y,12,'#3a1a6a',.7);else H.sl(o,S.cx,S.cy,a,60,'#8a6aff',3,fade(t,600,1000))}}},
  sunblade:{n:'태양 폭발',c:'#ffd84a',m:1.05,s:[300,.6,'sine',.06,1200],h:[[800,1,'all','burn','blind']],
   fx(o,S,t){const k=Math.min(1,t/800);if(t<800)H.disk(o,S.cx,AY+30,10+30*k,'#ffd84a',.9);else{const al=fade(t,800,1300);H.disk(o,S.cx,S.cy,150*al,'#fff6c8',al);H.tint(o,'#ffffff',al*.35)}}},
  thunderhammer:{go:1,n:'천둥 내려찍기',c:'#ffe36b',m:1.0,s:[80,.5,'sawtooth',.09,40],h:[[400,.35,'near','stun'],[650,.35,'all'],[900,.3,'all','stun']],
   fx(o,S,t){for(const st of [400,650,900]){const al=fade(t,st,st+450);if(al<=0)continue;const k=(t-st)/450;H.rg(o,S.px,S.py,30+k*(st===400?80:240),'#ffe36b',3,al);if(t-st<80)H.bolt(o,S.px,AY,S.px,S.py,'#ffe36b',1,3)}}},
  infinity:{n:'무한 참격',c:'#c8b0ff',m:1.1,freeze:1,s:[400,.4,'sine',.05,1600],h:Array.from({length:16},(_,i)=>[300+i*55,1/16,'all']),tn:['#1a1030',.3],
   fx(o,S,t){const al=fade(t,250,1400);o.save();o.globalAlpha=al;o.strokeStyle='#c8b0ff';o.lineWidth=3;o.beginPath();for(let i=0;i<=60;i++){const a=i/60*TAU,s=Math.sin(a);o.lineTo(S.cx+Math.cos(a)*60/(1+s*s),S.cy+s*Math.cos(a)*36/(1+s*s))}o.stroke();o.restore()}},
  m_godgreat:{n:'신살 일격',c:'#ffe9a8',m:1.4,s:[60,.8,'sawtooth',.1,25],h:[[900,1,'center','stun','shbreak']],
   fx(o,S,t){const k=Math.min(1,t/900),y=AY-60+(S.cy-AY+50)*ease(k);if(t<1000){o.save();o.fillStyle='#ffe9a8';o.fillRect(S.cx-6,y-90,12,90);o.fillStyle='#8a6a20';o.fillRect(S.cx-16,y-96,32,6);o.restore();H.rg(o,S.cx,S.cy,30*(1-k)+10,'#ffe9a8',2,.6)}const al=fade(t,900,1500);if(al>0){H.rg(o,S.cx,S.cy,(t-900)/2,'#ffffff',4,al);H.tint(o,'#fff6c8',al*.3)}}},
  m_moonkatana:{n:'월광 일섬',c:'#c8e0ff',m:1.1,s:[1300,.2,'sine',.05,600],h:[[300,.33,'all','heal'],[550,.33,'all'],[800,.34,'all']],tn:['#0a1430',.35],
   fx(o,S,t){H.disk(o,AX+AW-50,AY+30,22,'#e8f0ff',fade(t,0,1300));for(const st of [300,550,800]){const al=fade(t,st-100,st+300);if(al>0)H.cr(o,S.cx+(st-550)/3,S.cy,50,st/300,'#c8e0ff',al,5)}}},
  m_thunderspear:{n:'뇌신 강림',c:'#fff36b',m:1.1,s:[1000,.3,'square',.06,200],h:Array.from({length:12},(_,i)=>[150+i*150,1/12,'rand',i%4===3?'stun':'']),tn:['#101030',.3],
   fx(o,S,t){for(const e of S.ev){const al=fade(now0()-e.t,0,240);if(al>0)H.bolt(o,e.x+rnd(-8,8),AY,e.x,e.y-6,'#fff36b',al,4)}H.cl(o,W/2,AY+10,60,'#3a3a5a',fade(t,0,2000)*.6)}},
  m_dragonaxe:{n:'용왕 강타',c:'#ff6a2a',m:1.15,s:[100,.7,'sawtooth',.08,40],h:[[500,.5,'line','burn'],[800,.5,'line','burn']],
   fx(o,S,t){const al=fade(t,300,1300);if(al<=0)return;for(let i=0;i<10;i++){const d=20+i*24,sp=.12+i*.025,a=S.a+Math.sin(t/80+i)*sp;H.fl(o,S.px+Math.cos(a)*d,S.py-6+Math.sin(a)*d,5+i*.8,al*(1-i/14))}}},
  m_reaper:{n:'사신의 낫',c:'#b0ffd8',m:1.0,s:[150,.6,'sawtooth',.06,50],h:[[650,1,'all','reap']],tn:['#001810',.3],
   fx(o,S,t){const al=fade(t,300,1300);if(al>0){H.cr(o,S.cx,S.cy-20,90,1.57+t/500,'#b0ffd8',al,8);H.disk(o,S.cx,S.cy,40,'#0a3020',al*.5)}}},
  m_holyrapier:{n:'성광 연격',c:'#fff6c8',m:.95,s:[1500,.15,'triangle',.05,2000],h:Array.from({length:7},(_,i)=>[150+i*90,1/7,'line',i===6?'shield':'']),
   fx(o,S,t){for(let i=0;i<7;i++){const st=150+i*90,al=fade(t,st-40,st+220);if(al>0){const b=S.a+(i-3)*.12;H.sl(o,S.px+Math.cos(b)*50,S.py-8+Math.sin(b)*50,b,40,'#fff6c8',2,al)}}if(t>700)H.rg(o,S.px,S.py-8,18,'#fff6c8',2,fade(t,700,1400))}},
  m_chaoshammer:{n:'혼돈 붕괴',c:'#ff5af0',m:1.05,s:[120,.6,'sawtooth',.08,50],h:[[300,.25,'all','chaos'],[550,.25,'all','chaos'],[800,.25,'all','chaos'],[1050,.25,'all','chaos']],
   fx(o,S,t){const cols=['#ff5af0','#5affd8','#ffd84a','#ff6a2a'];for(let i=0;i<4;i++){const st=300+i*250,al=fade(t,st-50,st+350);if(al>0)H.rg(o,S.cx,S.cy,20+(t-st+50)/3,cols[i],3,al)}}},
  m_timedagger:{n:'정지된 찰나',c:'#ffe79a',m:1.0,freeze:.8,s:[1800,.1,'sine',.05,900],h:Array.from({length:6},(_,i)=>[250+i*70,1/6,'rand','crit']),tn:['#20202a',.3],
   fx(o,S,t){for(const e of S.ev){const al=fade(now0()-e.t,0,250);if(al>0)H.sl(o,e.x,e.y-8,rnd(0,3),18,'#ffe79a',2,al)}}},
  m_seastar:{n:'별바다',c:'#7ad8ff',m:1.0,s:[900,.4,'sine',.05,1400],h:[[300,.3,'all','push'],[600,.3,'all'],[900,.4,'all','chill']],
   fx(o,S,t){const al=fade(t,100,1300),x=AX+AW*Math.min(1,t/1100);for(let i=0;i<14;i++)H.st(o,x-i*14,AY+20+((i*53)%(AH-40)),5,i%2?'#7ad8ff':'#fff3b0',al)}},
  m_bloodlord:{n:'피의 축제',c:'#ff2a4a',m:1.6,s:[90,.6,'sawtooth',.08,40],h:[[200,.3,'all','drain'],[500,.3,'all','drain'],[800,.4,'all','drain']],tn:['#3a0008',.3],start(S){const c=Math.round(P.maxhp*.1);if(P.hp>c+1){P.hp-=c;pop(P.x,P.y-30,'-'+c+' 대가','#ff2a4a')}},
   fx(o,S,t){for(let i=0;i<8;i++){const a=i*TAU/8+t/400;H.disk(o,S.cx+Math.cos(a)*50,S.cy+Math.sin(a)*26,8,'#ff2a4a',fade(t,0,1200)*.8)}}},
  m_frostcrown:{n:'빙관',c:'#bfe8ff',m:1.0,freeze:1.4,s:[1200,.4,'triangle',.06,300],h:[[400,.5,'all','freezeS'],[1000,.5,'all']],tn:['#9fd8ff',.15],
   fx(o,S,t){const al=fade(t,200,1600);for(let i=0;i<12;i++){const a=i*TAU/12,x=S.cx+Math.cos(a)*60,y=S.cy+Math.sin(a)*30;o.save();o.globalAlpha=al;o.fillStyle='#e8f8ff';o.beginPath();o.moveTo(x-5,y);o.lineTo(x,y-22);o.lineTo(x+5,y);o.fill();o.restore()}}},
  m_primeflame:{n:'태초의 불',c:'#ffb04a',m:1.1,s:[200,.6,'sawtooth',.06,800],h:[[400,.3,'all','burn'],[800,.3,'all','burn'],[1200,.4,'all','burn','regen']],
   fx(o,S,t){const al=fade(t,0,1500),a=t/250;const x=S.cx+Math.cos(a)*60,y=S.cy-10+Math.sin(a)*24;H.fl(o,x,y,12,al);H.disk(o,x,y,20,'#ffb04a',al*.5)}},
  m_galetwin:{n:'질풍신',c:'#9fffd0',m:1.0,s:[500,.5,'triangle',.05,1400],h:Array.from({length:10},(_,i)=>[150+i*130,.1,'rand',i%3===2?'push':'']),
   fx(o,S,t){const al=fade(t,0,1600);for(let k=0;k<3;k++){const a=t/500+k*2.1,x=S.cx+Math.cos(a)*70,y=S.cy+Math.sin(a*1.3)*30;for(let i=0;i<4;i++)H.rg(o,x,y-i*7,8+i*4,'#9fffd0',2,al*.8)}}},
  m_guardian:{go:1,n:'수호의 일격',c:'#8dcdf5',m:.9,s:[300,.5,'triangle',.06,900],h:[[200,0,'none','shield2'],[900,1,'near','push']],
   fx(o,S,t){const al=fade(t,0,2200);o.save();o.globalAlpha=al*.7;o.strokeStyle='#8dcdf5';o.lineWidth=2;o.beginPath();for(let i=0;i<6;i++){const a=i*TAU/6;o.lineTo(P.x+Math.cos(a)*20,P.y-10+Math.sin(a)*20)}o.closePath();o.stroke();o.restore();const a2=fade(t,900,1400);if(a2>0)H.rg(o,P.x,P.y,(t-900)/2,'#8dcdf5',4,a2)}},
  m_eternal:{n:'영원 참격',c:'#ffffff',m:1.3,freeze:1,s:[200,.6,'sine',.06,2000],h:Array.from({length:20},(_,i)=>[300+i*45,1/20,'all',i===19?'exec':'']),tn:['#000010',.4],
   fx(o,S,t){const al=fade(t,250,1500);for(let i=0;i<6;i++){const a=t/120+i;H.sl(o,S.cx+Math.cos(a)*20,S.cy+Math.sin(a)*12,a,40,'#ffffff',2,al*.8)}}}};

 /* ---------- 맞힐 대상 · 피해 ---------- */
 const md=()=>typeof mode!=='undefined'?mode:'';
 function scene(){const m=md();if(m==='tower'&&window.TW71&&TW71.T)return 'tower';if(m==='boss'&&typeof G!=='undefined'&&G&&G.state==='play')return 'boss';if((m==='dg129'||m==='sec127')&&window.SK130)return 'secret';return null}
 function targets(sc){try{if(sc==='tower')return TW71.T.mobs.filter(m=>m.hp>0&&!(m.born>0));if(sc==='boss'){const g=bgeo();return [{boss:1,x:g.x,y:g.coreY,hp:G.hp,max:G.maxHp}]}if(sc==='secret')return SK130.enemies()}catch(e){}return []}
 function clk(sc){try{if(sc==='tower')return TW71.T.clk}catch(e){}return now0()/1000}
 function pop(x,y,s,c){try{if(md()==='tower')TW71.addPop(x,y,s,c);else if(md()==='boss')G.pops.push({x,y,t:now0(),tx:s,col:c});else if(window.SEC127&&md()==='sec127')SEC127.kit.dpop(x,y,s,c);else if(window.DG129&&DG129.D&&DG129.D.pops)DG129.D.pops.push({x,y,s,c,t:now0()})}catch(e){}}
 function wpInfo(){const w=curWp()||{};let pet=0;try{pet=(curPet()||{}).dmg||0}catch(e){}const i0=WEAPONS.indexOf(w),wi=i0>=0&&i0<10?i0:Math.min(9,Math.max(0,Math.round(((w.dmg||1)-1)/.1)));return {w,pet,wi,wd:w.dmg||1}}
 function base(t,I){if(t.boss)return G.maxHp*(.07+.015*I.wi)*(1+I.pet);if(t.isBoss)return 34*I.wd*(1+I.pet)*30;return (t.max||100)*(t.elite?.6:1.25)*Math.min(1.6,I.wd)}
 function hitOne(t,d,col,tx){d=Math.max(1,Math.round(d));try{if(t.boss){spDmg(d,t.x+rnd(-12,12),t.y+rnd(-10,10),col,now0())}else if(window.TW71)TW71.hitMob(t,d,col,tx)}catch(e){}return d}
 function pick(S,pat){const L=targets(S.sc);if(S.sc==='boss')return pat==='none'?[]:L;if(!L.length||pat==='none')return [];
  if(pat==='all')return L;if(pat==='near')return L.filter(t=>Math.hypot(t.x-P.x,t.y-P.y)<(S.u.r||95)+(t.isBoss?20:0));
  if(pat==='center')return L.filter(t=>Math.hypot(t.x-S.cx,t.y-S.cy)<85+(t.isBoss?20:0));
  if(pat==='rand')return [L[Math.floor(Math.random()*L.length)]];
  if(pat==='top'){let b=L[0];for(const t of L)if((t.max||0)>(b.max||0))b=t;S.T0=b;return [b]}
  if(pat==='line'){const ux=Math.cos(S.a),uy=Math.sin(S.a);return L.filter(t=>{const px=t.x-P.x,py=t.y-P.y,al=px*ux+py*uy,sd=Math.abs(px*uy-py*ux);return al>-10&&sd<(t.isBoss?30:20)})}
  return L}
 function status(S,t,k,sec){const c=clk(S.sc);if(t.boss)return;if(k==='burn'){t.burnT=c+sec;t.burnDps=Math.max(5,Math.round((t.max||100)*.035))}else if(k==='poison'){t.poisT=c+sec;t.poisDps=Math.max(5,Math.round((t.max||100)*.03))}else if(k==='chill')t.chillT=c+sec;else if(k==='stun')t.stunT=Math.max(t.stunT||-9,c+sec-1.1)}
 function bossDot(S,frac,n,gap,col,tx){for(let i=1;i<=n;i++)setTimeout(()=>{try{if(md()==='boss'&&G&&G.state==='play'){const g=bgeo();spDmg(Math.max(1,Math.round(G.maxHp*frac)),g.x+rnd(-10,10),g.coreY-10,col,now0())}}catch(e){}},i*gap)}
 function bossFreeze(sec){/* useSpecialV가 가짜 그로기를 지운 뒤에 걸어야 남음 */setTimeout(()=>{try{if(md()!=='boss'||!G||G.state!=='play')return;if(!G.vuln)G.vuln={type:'stun',t0:G.beat,t1:G.beat+sec*1000/G.ms};else G.vuln.t1=Math.max(G.vuln.t1,G.beat+sec*1000/G.ms)}catch(e){}},0)}
 function apply(S,h){const [,share,pat,...eff]=h,u=S.u,I=S.I,col=u.c;/* 맞히는 순간 겨냥한 적이 움직였으면 다시 겨눔 */const tg=S.tg&&S.tg.hp>0?S.tg:(S.sc==='boss'?targets('boss')[0]:null);if(tg&&(pat==='line'||pat==='center')){if(pat==='line')S.a=Math.atan2(tg.y-P.y,tg.x-P.x);else{S.cx=tg.x;S.cy=tg.y-6}}const L=pick(S,pat);let tot=0;const E=new Set(eff);
  for(const t of L){let d=base(t,I)*share*u.m;if(E.has('crit')&&Math.random()<.5)d*=1.6;if(E.has('elite2')&&(t.elite||t.isBoss||t.boss))d*=1.6;
   if(E.has('exec')){const lo=t.boss?G.hp<G.maxHp*.25:t.hp<(t.max||1)*.3;if(lo)d*=t.boss?1.8:3}
   if(E.has('reap')){if(t.boss){if(G.hp<G.maxHp*.25)d*=2.2}else if(t.hp<(t.max||1)*.35&&!t.isBoss)d=t.hp+1}
   if(E.has('judge'))d=Math.max(d,(t.boss?G.maxHp*.06:(t.max||100)*(t.isBoss?.06:.9)));
   if(E.has('dash')){S.trail.push({x:P.x,y:P.y,t:now0()});const a=Math.atan2(t.y-P.y,t.x-P.x),dd=Math.hypot(t.x-P.x,t.y-P.y);P.x=cl(t.x-Math.cos(a)*14,AX+10,AX+AW-10);P.y=cl(t.y-Math.sin(a)*8,AY+24,AY+AH-4);S.trail.push({x:P.x,y:P.y,t:now0()});P.face={x:Math.cos(a)>=0?1:-1,y:0}}
   tot+=hitOne(t,d,col,'');S.ev.push({t:now0(),x:t.x,y:t.y});
   if(E.has('burn')){status(S,t,'burn',3);if(t.boss)bossDot(S,.004,6,500,'#ff8a3a','🔥')}if(E.has('poison')){status(S,t,'poison',4);if(t.boss)bossDot(S,.0035,8,500,'#8aff5a','☠')}
   if(E.has('chill'))status(S,t,'chill',2.5);if(E.has('stun'))status(S,t,'stun',1.4);if(E.has('freezeS'))status(S,t,'stun',2.4);if(E.has('blind'))status(S,t,'stun',1.8);
   if(E.has('shbreak')&&t.sh)t.sh=0;
   if(E.has('pull')&&!t.boss&&!t.isBoss){const a=Math.atan2(P.y-t.y,P.x-t.x);t.x+=Math.cos(a)*16;t.y+=Math.sin(a)*10}
   if(E.has('push')&&!t.boss&&!t.isBoss){const a=Math.atan2(t.y-P.y,t.x-P.x);t.x=cl(t.x+Math.cos(a)*40,AX+12,AX+AW-12);t.y=cl(t.y+Math.sin(a)*24,AY+24,AY+AH-6)}
   if(E.has('chaos')){const k=['burn','poison','chill','stun'][Math.floor(Math.random()*4)];status(S,t,k,2.5);if(t.boss&&k!=='chill')bossDot(S,.003,4,500,'#ff5af0','✦')}
   if(E.has('lava'))S.lava.push({x:t.x,y:t.y,t:now0()})}
  if(E.has('drain')&&tot>0){const n=Math.min(Math.round(P.maxhp*.12),Math.max(4,Math.round(P.maxhp*.03*L.length)));heal(n)}
  if(E.has('heal'))heal(Math.round(P.maxhp*.06));if(E.has('regen'))for(let i=1;i<=5;i++)setTimeout(()=>heal(Math.round(P.maxhp*.03)),i*600);
  if(E.has('shield'))P.inv=Math.max(P.inv||0,now0()+1500);if(E.has('shield2')){P.inv=Math.max(P.inv||0,now0()+3000);pop(P.x,P.y-34,'🛡 수호','#8dcdf5')}
  if(S.sc==='boss'&&(E.has('stun')||E.has('freezeS'))&&!u.freeze)try{G.grogi=Math.min(100,(G.grogi||0)+8)}catch(e){}
  try{if(S.sc==='tower')TW71.T.shake=Math.max(TW71.T.shake||0,.35)}catch(e){}snd((S.I.w.hitF||400)*(1+S.k*.04),.12,'square',.05,(S.I.w.hitF||400)*.4)}
 function heal(n){if(!(P.hp>0))return;P.hp=Math.min(P.maxhp,P.hp+n);pop(P.x,P.y-30,'+'+n,'#7dffa8')}

 /* ---------- 시작 · 진행 ---------- */
 let S=null;
 function keyOf(w){return w.type&&U[w.type]?w.type:(w.ult&&U[w.ult]?w.ult:null)}
 function canTake(sc){try{if(window.SET61&&SET61.ultSet&&SET61.ultSet())return false;if(sc==='tower'){const T=TW71.T;if(T.duo||(window.PVP92&&PVP92.on&&PVP92.on()))return false}}catch(e){}return !!keyOf(curWp()||{})}
 function start(sc){const I=wpInfo(),key=keyOf(I.w),u=U[key],now=now0(),L=targets(sc);let cx=W/2,cy=AY+AH/2,tg=null;/* 겨냥: 가장 가까운 적과 그 둘레 무리의 가운데 */if(L.length){tg=L.slice().sort((p1,p2)=>Math.hypot(p1.x-P.x,p1.y-P.y)-Math.hypot(p2.x-P.x,p2.y-P.y))[0];const C=L.filter(q=>Math.hypot(q.x-tg.x,q.y-tg.y)<80);cx=C.reduce((s,q)=>s+q.x,0)/C.length;cy=C.reduce((s,q)=>s+q.y,0)/C.length-6}
  /* go: 내 주변을 휘두르는 궁극기는 먼저 적 무리 한가운데로 돌진 */if(U[key].go&&L.length){const a0=Math.atan2(cy-P.y,cx-P.x),d0=Math.hypot(cx-P.x,cy-P.y);if(d0>24){P.x=cl(cx-Math.cos(a0)*18,AX+10,AX+AW-10);P.y=cl(cy-Math.sin(a0)*10+6,AY+24,AY+AH-4);P.dash={t0:now,dur:150,vx:Math.cos(a0)*290,vy:Math.sin(a0)*290}}}
  const a=Math.atan2(cy-P.y,cx-P.x),dur=Math.max(...u.h.map(h=>h[0]))+(u.tail||700);
  S={sc,key,u,I,t0:now,dur,k:0,cx,cy,tg,px:P.x,py:P.y,a,ev:[],trail:[{x:P.x,y:P.y,t:now}],lava:[],name:I.w.sp||u.n,T0:null};
  if(sc==='boss')G.sp={type:'u139',t0:now,dur,name:S.name,col:u.c,cx,cy,done:[]};
  P.inv=Math.max(P.inv||0,now+dur+300);try{const me=md()==='sec127'?SEC127.SQ.me:md()==='dg129'?DG129.D.me:null;if(me)me.inv=Math.max(me.inv||0,now+dur+300)}catch(e){}P.lungeT=now;P.lungeA=a;P.lungeDur=260;
  if(u.freeze){const sec=(u.freeze===1?dur/1000+.4:u.freeze);if(sc==='boss')bossFreeze(sec);else for(const t of L)status(S,t,'stun',sec);try{if(sc==='tower'){TW71.T.shots=[]}else if(sc==='secret'&&window.DG129&&DG129.D&&md()==='dg129')DG129.D.shots=[]}catch(e){}}
  try{u.start&&u.start(S)}catch(e){}snd(...u.s);snd(u.s[0]*2,.15,'triangle',.03,u.s[0]*3)}
 function tick(now){if(!S)return;if(scene()!==S.sc){S=null;return}const e=now-S.t0;
  while(S.k<S.u.h.length&&e>=S.u.h[S.k][0]){const h=S.u.h[S.k];try{apply(S,h)}catch(err){}S.k++;try{if(S.sc==='boss'&&G.sp)G.sp.done.push(now)}catch(_){}}
  /* 용암 웅덩이: 3초 동안 지나가면 화상 */for(const l of S.lava){if(now-l.t>3000)continue;for(const t of targets(S.sc))if(!t.boss&&Math.hypot(t.x-l.x,t.y-l.y)<18)status(S,t,'burn',1.5)}
  if(e>S.dur+(S.lava.length?2400:0))S=null}
 function draw(now){if(!S)return;const o=ctx,t=now-S.t0,u=S.u;o.save();try{o.setTransform(SS,0,0,SS,0,0)}catch(e){}
  if(u.tn)H.tint(o,u.tn[0],u.tn[1]*fade(t,0,S.dur));
  for(const l of S.lava){const al=fade(now-l.t,0,3000);if(al>0){H.disk(o,l.x,l.y,18,'#ff6a2a',al*.7);H.rg(o,l.x,l.y,16,'#ffb04a',1.5,al)}}
  try{u.fx(o,S,t)}catch(e){}
  /* 맞은 자리 번쩍 */for(const ev of S.ev){const k=(now-ev.t)/220;if(k<1)H.disk(o,ev.x,ev.y-8,18*(1-k)+6,u.c,(1-k)*.8)}
  /* 이름표: 화면 위 가운데 */{const al=fade(t,0,Math.min(1600,S.dur)),nm='필살! '+S.name;o.font='900 13px sans-serif';o.textAlign='center';o.textBaseline='middle';const w=o.measureText(nm).width+28,y=AY+30;o.globalAlpha=al;o.fillStyle='rgba(5,7,12,.85)';o.fillRect(W/2-w/2,y-10,w,20);o.fillStyle=u.c;o.fillRect(W/2-w/2,y-10,w,2);o.fillRect(W/2-w/2,y+8,w,2);o.lineWidth=3;o.strokeStyle='#05070a';o.strokeText(nm,W/2,y+1);o.fillStyle=u.c;o.fillText(nm,W/2,y+1)}
  o.restore()}

 /* ---------- 각 장면의 궁극기 단추 가로채기 ---------- */
 /* 보스전: useSpecial(310)을 대신 — useSpecialV가 G.vuln · 무적 · 대사를 처리 */
 if(typeof useSpecial==='function'){const f=useSpecial;useSpecial=function(){try{if(md()==='boss'&&canTake('boss')){start('boss');return}}catch(e){}return f.apply(this,arguments)}}
 if(typeof drawSpecialFX==='function'){const f=drawSpecialFX;drawSpecialFX=function(now){const s=typeof G!=='undefined'&&G&&G.sp;if(s&&s.type==='u139'){if(now-s.t0>=s.dur)G.sp=null;return}return f.apply(this,arguments)}}
 if(typeof tryUlt==='function'){const f=tryUlt;tryUlt=function(){try{const sc=scene();
   if(sc==='tower'){const T=TW71.T;if(!paused&&T.ult>=100&&!T.bossCard&&!T.dead&&!T.U&&!S&&canTake('tower')){T.ult=0;start('tower');return}}
   if(sc==='secret'&&SK130.U&&SK130.U.g>=100&&!SK130.U.act&&!S&&canTake('secret')&&SK130.enemies().length){SK130.U.g=0;start('secret');return}}catch(e){}return f.apply(this,arguments)}}
 {const _f=frame;frame=function(){const r=_f.apply(this,arguments);try{const n=now0();tick(n);if(S){draw(n);try{if(document.documentElement.classList.contains('phP')&&window.PV76&&PV76.paint)PV76.paint()}catch(e){}}}catch(e){}return r}}

 /* 공방 · 상점 설명에 궁극기 능력 붙이기 */
 const DESC={sword:'두 번 십자로 베어 주변을 벰, 두 번째는 치명',dagger:'적 사이를 오가며 7번 찌름(절반은 치명)',great:'앞으로 땅을 갈라 일직선 적을 크게 · 기절',katana:'잠깐 숨을 고른 뒤 화면 전체 일섬, 약한 적 처형',axe:'도끼를 돌려 주변 적을 끌어당기며 3번',rapier:'앞으로 5번 얼음 찌르기 · 느려짐 · 마지막 기절',flame:'적 무리 가운데 불기둥 5번 · 화상',spear:'하늘에서 번개 4번(아무 적) · 기절',scythe:'큰 낫 한 바퀴 · 맞힌 만큼 흡혈',chrono:'시간을 멈추고 한 번에 벰',
  toxfang:'독구름 4번 · 강한 독',hammer:'땅을 내려쳐 전체 기절 · 방패 깨기',frostgreat:'얼음벽 일직선 · 얼려서 오래 멈춤',voltrapier:'번개처럼 적 사이를 4번 돌진',bloodscythe:'피의 낫 두 번 · 흡혈',lavaaxe:'용암 회전 3번 · 3초 용암 웅덩이',piercer:'화면 끝까지 관통 · 방패 무시 · 정예 ×1.6',starblade:'별 10개가 아무 적에게',windtwin:'질풍 8연타 · 마지막에 밀침',poisonlance:'일직선 돌진 · 독 안개',
  judgment:'가장 센 적에게 빛기둥(최대 체력 비례)',shadowkatana:'그림자 셋이 동시에 일섬 · 처형',sunblade:'작은 태양 폭발 · 화상 · 눈부심(기절)',thunderhammer:'충격파 3번 점점 넓게 · 기절',infinity:'시간을 멈추고 ∞ 16연참',m_godgreat:'하늘에서 거대한 검이 떨어짐 · 기절',m_moonkatana:'달빛 초승달 3번 · 조금 회복',m_thunderspear:'번개 폭풍 12번',m_dragonaxe:'용의 불숨 일직선 · 화상',m_reaper:'체력 낮은 적은 즉사(보스는 큰 피해)',
  m_holyrapier:'빛 7연격 · 끝나면 잠깐 무적',m_chaoshammer:'4번 내려쳐 매번 다른 상태 이상',m_timedagger:'0.8초 멈춤 · 6번 치명 찌르기',m_seastar:'별의 파도가 화면을 쓸며 밀침 · 느려짐',m_bloodlord:'체력 10%를 바쳐 ×1.6 · 흡혈',m_frostcrown:'얼음 왕관으로 전체를 얼림',m_primeflame:'불새가 돌며 화상 3번 · 끝나고 회복',m_galetwin:'회오리 셋이 10번 · 밀침',m_guardian:'3초 무적 방패 뒤 주변을 밀쳐 냄',m_eternal:'시간을 멈추고 20연참 · 마지막 처형'};
 try{for(const w of WEAPONS){const k=keyOf(w);if(k&&DESC[k]&&w.desc&&w.desc.indexOf('⚡궁극기')<0)w.desc+=' ⚡궁극기 「'+(w.sp||U[k].n)+'」 '+DESC[k]+'.'}}catch(e){}

 window.ULT139={U,DESC,get S(){return S},start,keyOf};
}catch(e){console.warn('v139',e)}})();
