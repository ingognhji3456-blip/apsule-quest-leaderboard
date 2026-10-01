/* ================= 챕터 3 (ORIGIN) 보스 전용 패턴 v77: 보스 부위·손(도구)에서 나오고 예고가 먼저 ================= */
const npHand=i=>G.boss.hands[i];
/* ── 한밤의 괘종: 시계추 손 · 괘종 흔들기 ── */
defPat('pendSwing','쌍둥이 시계추','all',10,'괘종 아래로 두 시계추가 엇갈려 흔들림 → 두 추가 지나간 사이로',t=>{const tel=npT(),dur=6,L=210,A=1.0;let px=[HOME.x-40,HOME.x+40],py=AY+40;
 sch(t,()=>{const g=bgeo();px=[g.x-g.hf*U*.6,g.x+g.hf*U*.6];py=g.y-10;npCharge(t,t+tel,()=>[g.x,g.coreY],'#e0a060')});
 for(const s of [0,1]){const pos=b=>{const a=Math.PI/2+A*Math.sin(1.25*npS()*(b-(t+tel))+(s?Math.PI:0));return [px[s]+Math.cos(a)*L,py+Math.sin(a)*L*.55]};
  NP({k:'seg',sty:'chain',w:3,harm:false,t0:t,t1:t+tel,t2:t+tel+dur,a:()=>[px[s],py],b:pos});NP({k:'orb',sty:'bob',r:15,t0:t,t1:t+tel,t2:t+tel+dur,pos,prev:1.2,prevN:9,dmg:15})}
 return tel+dur});
defPat('tickTock','똑딱 괘종','field',10,'괘종이 똑·딱 박자마다 왼쪽·오른쪽을 내리침 → 소리 반대편으로 건너',t=>{const tel=npTel(),n=5+G.phase;npWarn(t,.5);
 for(let k=0;k<n;k++){const ts=t+k*1.1,s=k%2;NP({k:'rect',sty:'plain',x:s?HOME.x+8:AX,y:AY,w:s?AX+AW-HOME.x-8:HOME.x-8-AX,h:AH,t0:ts,t1:ts+tel,t2:ts+tel+.45,col:'#e0a060',dmg:11,deco:(o,b,now)=>{const g=bgeo(),q=b<o.t1?clamp((b-o.t0)/(o.t1-o.t0),0,1):1,a=Math.PI/2+(s?-1:1)*(1-q)*.2+(s?-.95:.95)*q;line(g.x,g.coreY,g.x+Math.cos(a)*170,g.coreY+Math.sin(a)*170,3,(x,y)=>cPx(x,y,3,'#8a6430',b<o.t1?.6:1));npSpr('bob',g.x+Math.cos(a)*170,g.coreY+Math.sin(a)*170,10,now,o,b);ctx.font='bold 16px monospace';ctx.textAlign='center';ctx.globalAlpha=b<o.t1?.45:1;ctx.fillStyle='#fff0c8';ctx.fillText(s?'딱':'똑',Math.round(o.x+o.w/2),AY+34);ctx.globalAlpha=1;ctx.textAlign='left'}});sch(ts+tel,()=>sfx(s?1400:1100,.05,'square',.04,900))}
 return n*1.1+tel+.5});
defPat('gravityBob','시계추 낙하','hands',10,'손의 시계추가 내 머리 위로 올라가 떨어지며 튕김 → 다음 착지 원을 보고 피해',t=>{const tel=npT(),n=2;
 for(let i=0;i<n;i++){const ts=t+i*1.4;sch(ts,()=>{let [x,y]=npIn(P.x,P.y,24);const dir=RND()<.5?-1:1;for(let b=0;b<3;b++){const td=ts+tel+b*.9,bx=x,by=y;sch(ts+b*.9,()=>tweenHand(i,bx,by-50,ts+b*.9,td-.2));sch(td-.2,()=>tweenHand(i,bx,by-4,td-.2,td));NP({k:'circ',x:bx,y:by,r:26-b*4,t0:ts+b*.9,t1:td,t2:td+.3,col:'#e0a060',dmg:13});sch(td,()=>{sfx(80,.2,'square',.06,40);G.shake=Math.max(G.shake,.25)});x=clamp(x+dir*70,AX+24,AX+AW-24);y=clamp(y+(RND()-.5)*40,AY+24,AY+AH-24)}})}
 npRest(t+n*1.4+tel+2.2);return n*1.4+tel+2.4});
/* ── 판옵티콘: 거대한 눈 · 감시 카메라 손 · 봉쇄 ── */
defPat('watchSweep','감시의 시선','head',10,'눈이 한 바퀴 훑어봄 → 시선 뒤를 따라 돌아',t=>{const tel=npT(),dur=4.2,g0=npG(),dir=RND()<.5?1:-1;npEye(t,t+tel,t+tel+dur);
 sch(t,()=>{const a0=Math.atan2(P.y-g0.headY,P.x-HOME.x)-dir*.6;npCharge(t,t+tel,()=>[HOME.x,g0.coreY],'#ff7a6a');NP({k:'seg',sty:'laser',w:16,col:'#ff7a6a',live:true,t0:t,t1:t+tel,t2:t+tel+dur,a:()=>[HOME.x,g0.coreY],b:b=>{const a=a0+dir*TAU*clamp((b-(t+tel))/dur,0,1);return [HOME.x+Math.cos(a)*420,g0.coreY+Math.sin(a)*420]},dmg:13,
  deco:(o,b,now)=>{if(b<o.t1)for(let i=0;i<8;i++){const a=a0+dir*i*.4;cChevron(HOME.x+Math.cos(a)*70,g0.coreY+Math.sin(a)*70,a+dir*Math.PI/2,'#ffd166',.9,3)}}})});
 return tel+dur+.2});
defPat('cameraPost','감시 카메라 배치','hands',11,'카메라 손이 날아가 자리 잡고 붉은 조준선을 겨눈 뒤 쏨 → 조준선 옆으로',t=>{const tel=npT();
 for(const i of [0,1]){const ts=t+i*.4;sch(ts,()=>{const [x,y]=npIn(i?AX+AW-60:AX+60,AY+40+RND()*(AH-80),30);tweenHand(i,x,y,ts,ts+.8);npHand(i).mode='cannon';npHand(i).aim=true;
  for(let s=0;s<2+G.phase;s++){const tf=ts+.8+tel+s*1.2;let A=0;sch(tf-tel,()=>{const h=npHand(i);A=Math.atan2(P.y-h.y,P.x-h.x);h.aim=false;h.ang=A});NP({k:'seg',sty:'laser',w:6,col:'#ff5a5a',t0:tf-tel,t1:tf,t2:tf+.45,a:()=>[npHand(i).x,npHand(i).y],b:()=>{const h=npHand(i);return [h.x+Math.cos(A)*440,h.y+Math.sin(A)*440]},dmg:12});sch(tf,()=>{npHand(i).kick=1;npHand(i).aim=true;sfx(900,.1,'square',.03,300)})}})}
 npRest(t+.8+tel+(2+G.phase)*1.2+.4);return .8+tel+(2+G.phase)*1.2+.8});
defPat('spotTrack','추적 조명','head',9,'눈에서 조명이 나를 쫓다 멈춰 태움 → 조명이 멈추면 원 밖으로',t=>{const n=2+Math.min(1,G.phase),fol=2;npEye(t,t+1,t+n*1.5+fol+1);
 for(let k=0;k<n;k++){const ts=t+k*1.5;const o=NP({k:'circ',x:P.x,y:P.y,r:46,t0:ts,t1:ts+fol+.8,t2:ts+fol+1.3,cf:b=>[o.x,o.y,b<ts+fol?lerp(46,22,clamp((b-ts)/fol,0,1)):22],dmg:13,col:'#ffe7a8',
  step:(o,b,dt)=>{if(b<ts+fol){o.x+=(P.x-o.x)*Math.min(1,dt*3);o.y+=(P.y-o.y)*Math.min(1,dt*3)}},deco:(o,b,now)=>{const g=bgeo(),r=o.cf(b)[2];for(const s of [-1,1])line(g.x,g.coreY,o.x+s*r,o.y,4,(x,y,i)=>{if(i%2===0)cPx(x,y,1,'#ffe7a8',b<o.t1?.5:.9)})}});sch(ts+fol+.8,()=>sfx(1200,.2,'sine',.04,300))}
 return (n-1)*1.5+fol+1.4});
defPat('lockdown','봉쇄','field',10,'감옥 벽이 사방에서 좁혀 옴 → 가운데 남은 칸으로',t=>{const tel=npT(),dur=2.5;
 sch(t,()=>{const cx=clamp(P.x,AX+80,AX+AW-80),cy=clamp(P.y,AY+60,AY+AH-60),hw=46,hh=36,q=b=>clamp((b-(t+tel))/dur,0,1),f=b=>Math.max(q(b),b<t+tel?1:0);
  NP({k:'rect',t0:t,t1:t+tel,t2:t+tel+dur+.8,col:'#4a4a54',dmg:12,rf:b=>[AX,AY,AW,(cy-hh-AY)*f(b)]});NP({k:'rect',t0:t,t1:t+tel,t2:t+tel+dur+.8,col:'#4a4a54',dmg:12,rf:b=>{const h=(AY+AH-(cy+hh))*f(b);return [AX,AY+AH-h,AW,h]}});
  NP({k:'rect',t0:t,t1:t+tel,t2:t+tel+dur+.8,col:'#4a4a54',dmg:12,rf:b=>[AX,AY,(cx-hw-AX)*f(b),AH]});NP({k:'rect',t0:t,t1:t+tel,t2:t+tel+dur+.8,col:'#4a4a54',dmg:12,rf:b=>{const w=(AX+AW-(cx+hw))*f(b);return [AX+AW-w,AY,w,AH]}})});
 return tel+dur+1});
/* ── 나방: 날개에서 나오는 나방 떼 · 등불 · 날갯짓 ── */
defPat('mothSwarm','나방 떼','all',10,'날개에서 나방 떼가 날아올라 물결치며 가로지름 → 물결 궤적 밖으로',t=>{const tel=npT(),waves=2+G.phase;
 for(let w=0;w<waves;w++){const ts=t+w*1.6,dir=w%2?-1:1;sch(ts,()=>{const g=bgeo(),yc=clamp(P.y,AY+40,AY+AH-40),x0=dir>0?AX+10:AX+AW-10;for(let i=0;i<8;i++){const y=yc+(i-3.5)*18,T1=ts+tel,wave=b=>{const s=Math.max(0,b-T1)*100*npS();return [x0+dir*s,y+Math.sin(s/30+i)*20]};NP({k:'orb',sty:'moth',r:5,t0:ts,t1:T1,t2:T1+4.2,pos:b=>{if(b>=T1)return wave(b);const u=clamp((b-ts)/tel,0,1),[ex,ey]=wave(T1);return [lerp(g.x,ex,u),lerp(g.coreY,ey,u)-Math.sin(u*Math.PI)*30]},prev:i===3?2.4:0,prevN:10,dmg:10,deco:(o,b,now)=>{if(b<o.t1){const [x,y]=o.pos(b);npSpr('moth',x,y,5,now,o,b)}}})}})}
 return (waves-1)*1.6+tel+4.2});
defPat('lampLure','등불 유혹','hands',10,'손으로 던진 등불로 나방이 소용돌이치며 모여듦 → 등불에서 멀어져',t=>{const tel=npT(),dur=3.5;
 sch(t,()=>{const h=npHand(0),[lx,ly]=npIn(P.x+(RND()-.5)*80,P.y+(RND()-.5)*60,40),g=bgeo();h.kick=1;G.arcs.push({x0:h.x,y0:h.y,x1:lx,y1:ly,t0:t,t1:t+.8,h:50,kind:'lamp'});NP({k:'orb',sty:'light',col:'#ffd98a',r:6,harm:false,noTel:true,t0:t+.8,t1:t+.8,t2:t+tel+dur,pos:()=>[lx,ly]});
  for(let i=0;i<12;i++){const a0=i*TAU/12,sp=b=>{const q=clamp((b-(t+tel))/dur,0,1),a=a0+q*5,r=lerp(200,8,q);return [lx+Math.cos(a)*r,ly+Math.sin(a)*r*.8]};NP({k:'orb',sty:'moth',r:5,t0:t,t1:t+tel,t2:t+tel+dur,pos:b=>{if(b>=t+tel)return sp(b);const u=clamp((b-t)/tel,0,1),[x,y]=sp(t+tel);return [lerp(g.x,x,u),lerp(g.coreY,y,u)]},dmg:10,deco:(o,b,now)=>{if(b<o.t1){const [x,y]=o.pos(b);npSpr('moth',x,y,5,now,o,b)}}})}NP({k:'circ',x:lx,y:ly,r:40,t0:t+tel+dur-1.2,t1:t+tel+dur,t2:t+tel+dur+.4,col:'#ffd98a',dmg:12})});
 return tel+dur+.5});
defPat('wingGust','날갯짓 돌풍','all',9,'날개를 크게 들었다 내리쳐 한쪽 절반을 휩쓺 → 날개 반대쪽 절반으로',t=>{const tel=npT(),n=2+G.phase;npWarn(t,.7);
 for(let k=0;k<n;k++){const ts=t+k*1.5,s=RND()<.5;NP({k:'rect',sty:'plain',x:AX,y:s?AY:HOME.y-10,w:AW,h:s?HOME.y-10-AY:AY+AH-(HOME.y-10),t0:ts,t1:ts+tel,t2:ts+tel+.5,col:'#b89aff',dmg:12,deco:(o,b,now)=>{if(b<o.t1)for(let i=0;i<5;i++)cChevron(AX+40+i*90,o.y+o.h/2,s?-Math.PI/2:Math.PI/2,'#ffffff',.7,4)}});sch(ts+tel,()=>{sfx(180,.3,'sawtooth',.05,60);G.shake=Math.max(G.shake,.25)})}
 return n*1.5+tel+.6});
/* ── 풀무 거인: 풀무 손 · 굴뚝 증기 · 바람 ── */
defPat('pumpSlam','풀무 내려찍기','hands',11,'풀무 손이 줄지어 내려찍으며 증기를 터뜨림 → 찍힌 줄 옆으로',t=>{const tel=npT(),n=3+G.phase;
 for(let k=0;k<n;k++){const ts=t+k*1,h=k%2;sch(ts,()=>{const [x,y]=npIn(P.x+(RND()-.5)*40,P.y,26);tweenHand(h,x,y-48,ts,ts+tel-.25);sch(ts+tel-.25,()=>tweenHand(h,x,y-4,ts+tel-.25,ts+tel));for(let j=-2;j<=2;j++)NP({k:'circ',x:x+j*34,y,r:j?14:22,t0:ts,t1:ts+tel+Math.abs(j)*.12,t2:ts+tel+Math.abs(j)*.12+.35,col:'#e8e0d0',dmg:j?10:13});sch(ts+tel,()=>{sfx(70,.3,'square',.08,35);G.shake=Math.max(G.shake,.3);spawnPuff(x,y,10,'#e8e0d0')})})}
 npRest(t+n+tel+.4);return n+tel+.6});
defPat('chimneySteam','굴뚝 증기 구멍','head',10,'굴뚝에서 뿜은 증기가 바닥에 떨어져 박자마다 분출 → 분출 직후 구멍 위를 지나',t=>{const tel=npTel(),pulses=4+G.phase;
 sch(t,()=>{const g=bgeo(),vents=[];for(let i=0;i<6;i++)vents.push(npIn(P.x+(RND()-.5)*220,P.y+(RND()-.5)*140,20));vents.forEach(([x,y],i)=>{G.arcs.push({x0:g.x+(i%2?1:-1)*g.hf*U*.4,y0:g.top-10,x1:x,y1:y,t0:t,t1:t+1,h:70,kind:'steam'});for(let p=0;p<pulses;p++){if((p+i)%2)continue;const ts=t+1+p;NP({k:'circ',x,y,r:24,t0:t+1,t1:ts+tel,t2:ts+tel+.5,col:'#e8e0d0',dmg:10})}})});
 return 1+pulses+tel+.6});
defPat('airBlast','풀무 바람','head',10,'풀무가 부풀었다가 바람과 파편을 뿜음 → 바람 방향 옆으로',t=>{const tel=npT(),dur=4;npWarn(t,.7);
 sch(t,()=>{const g=bgeo(),a=Math.atan2(P.y-g.coreY,P.x-g.x);npCharge(t,t+tel,()=>[g.x,g.coreY],'#ffb040');G.pull={x:g.x+Math.cos(a)*900,y:g.coreY+Math.sin(a)*900,tp:t,t0:t+tel,t1:t+tel+dur,kind:'wind',str:42};
  for(let i=0;i<14;i++){const tf=t+tel+i*.28,aa=a+(RND()-.5)*.8;npShot(tf-tel,tf,g.x,g.coreY,aa,90*npS(),{sty:'scrap',r:5,rayL:i%3===0?60:0,chg:false,dmg:9})}});
 return tel+dur+.5});
/* ── 불협화음 지휘자: 지휘봉 · 박자 바늘 · 강박 ── */
defPat('needleSweep','박자 바늘','all',10,'몸의 바늘이 박자마다 크게 좌우로 흔들림 → 바늘이 지나간 뒤쪽으로',t=>{const tel=npT(),beats=5+G.phase,L=300;let px=HOME.x,py=HOME.y-60;
 sch(t,()=>{const g=bgeo();px=g.x;py=g.coreY});const ang=b=>{const k=Math.max(0,b-(t+tel)),i=Math.floor(k),f=k-i,e=f*f*(3-2*f),a0=i%2?.95:-.95,a1=i%2?-.95:.95;return Math.PI/2+lerp(a0,a1,e)};
 NP({k:'seg',sty:'hand',w:8,col:'#ff9ad0',live:true,t0:t,t1:t+tel,t2:t+tel+beats,a:()=>[px,py],b:b=>{const a=ang(b);return [px+Math.cos(a)*L,py+Math.sin(a)*L]},dmg:13,deco:(o,b,now)=>{if(b<o.t1)for(let i=0;i<6;i++){const a=Math.PI/2-.95+i*.38;cChevron(px+Math.cos(a)*(L-40),py+Math.sin(a)*(L-40),0,'#ffe36b',.8,3)}}});
 for(let i=0;i<beats;i++)sch(t+tel+i+.5,()=>sfx(1500,.04,'square',.03,1400));return tel+beats+.2});
defPat('batonVolley','지휘봉 탄막','hands',10,'지휘봉을 휘두를 때마다 음표가 날아옴 → 점선 방향 사이로',t=>{const tel=npT(),n=5+G.phase;npHands(t,.5,30,-8);
 for(let k=0;k<n;k++){const T0=t+.5+k*.8,h=k%2;sch(T0,()=>{const hd=npHand(h),a=Math.atan2(P.y-hd.y,P.x-hd.x);for(const o of [-.3,0,.3])npShot(T0,T0+tel,hd.x,hd.y,a+o,76*npS(),{sty:'note',col:h?'#ffe36b':'#ff9ad0',r:4,dmg:9});sch(T0+tel,()=>{hd.kick=1;sfx(600+k*60,.06,'square',.03,600+k*60)})})}
 npRest(t+.5+n*.8+tel);return .5+n*.8+tel+3});
defPat('accentHit','강박 충격','all',10,'작은 박 세 번 뒤 넷째 박에 큰 충격 → 큰 충격의 빈틈에 서',t=>{const bars=2+Math.min(1,G.phase),tel=npT();
 for(let b=0;b<bars;b++)for(let k=0;k<4;k++){const tf=t+tel+b*4+k,T0=tf-tel,big=k===3;sch(T0,()=>{const g=bgeo(),n=big?20:8;if(big)npCharge(T0,tf,()=>[g.x,g.coreY],'#ffe36b');const gapA=Math.atan2(P.y-g.coreY,P.x-g.x)+(b%2?.8:-.8);for(let i=0;i<n;i++){const a=i*TAU/n+b*.3;if(big&&Math.abs(((a-gapA+Math.PI*3)%TAU)-Math.PI)<.35)continue;npShot(T0,tf,g.x,g.coreY,a,(big?80:58)*npS(),{sty:big?'default':'note',col:big?'#ffe36b':'#ff9ad0',r:big?5:4,rayL:big?60:30,chg:false,dmg:big?11:8})}sch(tf,()=>{sfx(big?80:1200,big?.2:.04,big?'sine':'square',big?.1:.03,big?40:1100);if(big)G.shake=Math.max(G.shake,.3)})})}
 return tel+bars*4+3});
/* ── 거짓 달력: 찢긴 종이 · 압정 손 · 마감선 ── */
defPat('pageStorm','달력 찢기','head',10,'달력 종이가 찢겨 부채꼴로 흩날림 → 점선 사이 틈으로',t=>{const tel=npT(),w=3+G.phase;
 for(let k=0;k<w;k++){const T0=t+k*.9;sch(T0,()=>{const g=bgeo(),a0=Math.atan2(P.y-g.coreY,P.x-g.x)+(k%2?.12:-.12);if(k===0)npCharge(T0,T0+tel,()=>[g.x,g.coreY],'#fff6e0');for(let i=0;i<7;i++){const a=a0+(i-3)*.2;NP({k:'orb',sty:'page',r:6,t0:T0,t1:T0+tel,t2:T0+tel+5,pos:b=>{const s=Math.max(0,b-(T0+tel))*72*npS(),o=Math.sin(s/22+i)*10;return [g.x+Math.cos(a)*s-Math.sin(a)*o,g.coreY+Math.sin(a)*s+Math.cos(a)*o]},ray:a,rayL:50,chg:false,dmg:9})}sch(T0+tel,()=>sfx(1800,.05,'square',.02,1200))})}
 return (w-1)*.9+tel+4});
defPat('dateMark','압정 꽂기','hands',10,'압정 손이 날짜 칸에 ✕를 꽂음 → 꽂히지 않은 칸으로',t=>{const tel=npT(),waves=3+G.phase,C=7,Rw=4,cw=AW/C,ch=AH/Rw;
 for(let w=0;w<waves;w++){const ts=t+w*1.5;sch(ts,()=>{const pi=Math.floor((P.x-AX)/cw)+Math.floor((P.y-AY)/ch)*C,cells=[];for(let i=0;i<C*Rw;i++)if(i===pi||RND()<.45)cells.push(i);const hd=npHand(w%2),c0=cells[0];tweenHand(w%2,AX+(pi%C+.5)*cw,AY+(Math.floor(pi/C)+.5)*ch-30,ts,ts+tel*.8);
  for(const i of cells){const cx=i%C,cy=Math.floor(i/C);G.arcs.push({x0:hd.x,y0:hd.y,x1:AX+(cx+.5)*cw,y1:AY+(cy+.5)*ch,t0:ts,t1:ts+.7,h:30,kind:'pin'});NP({k:'rect',x:AX+cx*cw+2,y:AY+cy*ch+2,w:cw-4,h:ch-4,t0:ts,t1:ts+tel,t2:ts+tel+.5,col:'#c83a3a',dmg:11,deco:(o,b,now)=>{const x=o.x+o.w/2,y=o.y+o.h/2;for(let k=-8;k<=8;k++){cPx(x+k,y+k,2,'#c83a3a',b<o.t1?.6:1);cPx(x+k,y-k,2,'#c83a3a',b<o.t1?.6:1)}}})}})}
 npRest(t+waves*1.5+tel);return waves*1.5+tel+.6});
defPat('deadline','마감선','head',10,'달력 머리에서 붉은 마감선이 내려와 훑음 → 선의 빈 칸으로 통과',t=>{const tel=npT(),dur=4/npS();
 sch(t,()=>{const g=bgeo(),gx=clamp(P.x+(RND()-.5)*100,AX+40,AX+AW-40),gap=52,Y=b=>lerp(AY+4,AY+AH-4,clamp((b-(t+tel))/dur,0,1));npCharge(t,t+tel,()=>[g.x,g.top],'#c83a3a');NP({k:'seg',sty:'laser',w:6,col:'#c83a3a',live:true,t0:t,t1:t+tel,t2:t+tel+dur,a:b=>[AX,Y(b)],b:b=>[gx-gap/2,Y(b)],dmg:12});NP({k:'seg',sty:'laser',w:6,col:'#c83a3a',live:true,t0:t,t1:t+tel,t2:t+tel+dur,a:b=>[gx+gap/2,Y(b)],b:b=>[AX+AW,Y(b)],dmg:12,deco:(o,b)=>{const y=Y(b);cChevron(gx,y+10,Math.PI/2,'#a6f5c6',1,4)}})});
 return tel+dur+.3});
/* ── 먼지 원동기: 회오리 · 빗자루 손 · 배기 먼지 ── */
defPat('dustDevil','먼지 회오리','all',10,'몸에서 나온 회오리가 표시된 점들을 돌며 끌어당김 → 회오리 반대로 달려',t=>{const tel=npT(),dur=5;
 sch(t,()=>{const pts=[npIn(HOME.x,HOME.y+30,40)];for(let i=0;i<3;i++)pts.push(npIn(AX+50+RND()*(AW-100),AY+50+RND()*(AH-100),40));const pos=b=>{const q=clamp((b-(t+tel))/dur,0,1)*3,i=Math.min(2,Math.floor(q)),u=q-i;return [lerp(pts[i][0],pts[i+1][0],u),lerp(pts[i][1],pts[i+1][1],u)]};
  NP({k:'circ',x:0,y:0,r:24,t0:t,t1:t+tel,t2:t+tel+dur,cf:b=>{const [x,y]=pos(Math.max(b,t+tel));return [x,y,24]},col:'#9a7aff',dmg:12,deco:(o,b,now)=>{const [x,y]=pos(Math.max(b,o.t1));for(let i=0;i<10;i++){const a=now/80+i*.63,r=6+i*2.4;cPx(x+Math.cos(a)*r,y+Math.sin(a)*r*.5-i*2,2,'#b8a8d8',.8)}if(b<o.t1)for(let i=1;i<pts.length;i++){line(pts[i-1][0],pts[i-1][1],pts[i][0],pts[i][1],8,(px,py,k)=>{if(k%2===0)cPx(px,py,2,'#9a7aff',.6)});cRing(pts[i][0],pts[i][1],8,'#9a7aff',.8,1)}},step:(o,b)=>{if(b>=o.t1){const [x,y]=pos(b);G.pull={x,y,tp:b-.01,t0:b-.01,t1:b+.2,kind:'suck',str:30}}}})});
 return tel+dur+.3});
defPat('broomSweep','빗자루 쓸기','hands',10,'빗자루 손이 끝에서 끝까지 한 줄을 쓸어 감 → 쓸고 간 뒤로 넘어가',t=>{const tel=npT(),n=2+Math.min(1,G.phase);
 for(let k=0;k<n;k++){const ts=t+k*2.2,h=k%2;sch(ts,()=>{const y=clamp(P.y,AY+20,AY+AH-20),dir=k%2?-1:1,x0=dir>0?AX+10:AX+AW-10,x1=dir>0?AX+AW-10:AX+10,dur=1.5/npS();tweenHand(h,x0,y,ts,ts+tel*.8);
  sch(ts+tel,()=>{npHand(h).drv=b=>[lerp(x0,x1,clamp((b-(ts+tel))/dur,0,1)),y]});sch(ts+tel+dur,()=>{npHand(h).drv=null});NP({k:'rect',t0:ts,t1:ts+tel,t2:ts+tel+dur,col:'#b8a060',dmg:12,rf:b=>{if(b<ts+tel)return [AX,y-14,AW,28];const x=lerp(x0,x1,clamp((b-(ts+tel))/dur,0,1));return [x-18,y-14,36,28]},deco:(o,b,now)=>{if(b<o.t1)cChevron(x0+dir*30,y,dir>0?0:Math.PI,'#ffffff',.9,4)}})})}
 npRest(t+n*2.2+.4);return (n-1)*2.2+tel+1.8});
defPat('moteCloud','배기 먼지','head',10,'굴뚝에서 먼지 알갱이가 뿜어져 천천히 떠다님 → 알갱이 사이를 천천히',t=>{const tel=npT(),n=14+G.phase*4,dur=5;
 sch(t,()=>{const g=bgeo(),sx=g.x+g.hf*U*.3,sy=g.top-14;npCharge(t,t+tel,()=>[sx,sy],'#b8a8d8');for(let i=0;i<n;i++){const x=AX+20+RND()*(AW-40),y=AY+20+RND()*(AH-40),a=RND()*TAU;if(Math.hypot(x-P.x,y-P.y)<55)continue;const drift=npBounce(x,y,a,24*npS(),t+tel);NP({k:'orb',sty:'dust',r:5,t0:t,t1:t+tel,t2:t+tel+dur,pos:b=>{if(b>=t+tel)return drift(b);const u=clamp((b-t)/tel,0,1);return [lerp(sx,x,u),lerp(sy,y,u)-Math.sin(u*Math.PI)*40]},dmg:9,deco:(o,b,now)=>{if(b<o.t1){const [px,py]=o.pos(b);npSpr('dust',px,py,4,now,o,b)}}})}});
 return tel+dur});
/* ── 심판의 저울: 접시 · 무게추 손 · 빛 ── */
defPat('balance','저울질','all',10,'내가 선 쪽 접시가 무거워 떨어짐 → 가벼운 쪽으로 건너',t=>{const tel=npTel(),n=3+G.phase;
 for(let k=0;k<n;k++){const ts=t+k*1.5;let side=0;sch(ts,()=>{side=P.x<HOME.x?0:1});NP({k:'rect',t0:ts,t1:ts+tel,t2:ts+tel+.6,col:'#ffe08a',dmg:13,rf:()=>[side?HOME.x:AX,AY+AH*.35,side?AX+AW-HOME.x:HOME.x-AX,AH*.65],deco:(o,b,now)=>{const g=bgeo(),tilt=b<o.t1?(side?1:-1)*clamp((b-o.t0)/(o.t1-o.t0),0,1)*14:(side?14:-14);line(g.x-150,g.top-4-tilt,g.x+150,g.top-4+tilt,2,(x,y)=>cPx(x,y,2,'#fff0b0',1));R(g.x-1,g.top-14,3,12,'#b8a060')}})}
 return n*1.5+tel+.7});
defPat('counterWeight','무게추 손','hands',10,'무게추 손이 내 위로 올라가 번갈아 떨어짐 → 추 그림자를 피해',t=>{const tel=npT(),n=5+G.phase;
 for(let i=0;i<n;i++){const ts=t+i*.75,h=i%2;sch(ts,()=>{const [x,y]=npIn(P.x+(RND()-.5)*30,P.y+(RND()-.5)*20,24);tweenHand(h,x,y-50,ts,ts+tel-.2);sch(ts+tel-.2,()=>tweenHand(h,x,y-4,ts+tel-.2,ts+tel));NP({k:'circ',x,y,r:22,t0:ts,t1:ts+tel,t2:ts+tel+.4,col:'#b8a060',dmg:12});sch(ts+tel,()=>{sfx(90,.2,'square',.06,40);G.shake=Math.max(G.shake,.2)})})}
 npRest(t+n*.75+tel+.3);return n*.75+tel+.5});
defPat('judgment','심판의 빛','head',10,'저울 머리가 빛나고 하늘에서 빛기둥이 내려옴 → 빛기둥 사이로',t=>{const tel=Math.max(1.5,npTel()),n=3+G.phase;npEye(t,t+tel,t+tel+n*.7);
 for(let i=0;i<n;i++){const ts=t+i*.7;sch(ts,()=>{const g=bgeo(),x=clamp(P.x+(RND()-.5)*40,AX+30,AX+AW-30);if(i===0)npCharge(ts,ts+tel,()=>[g.x,g.top-6],'#fff0b0');NP({k:'rect',sty:'light',x:x-22,y:AY,w:44,h:AH,t0:ts,t1:ts+tel,t2:ts+tel+.7,col:'#fff0b0',dmg:13})})}
 return n*.7+tel+.8});
/* ── 광산의 메아리: 스피커 손 · 메아리 ── */
defPat('echoRing','메아리 고리','all',10,'고리가 퍼진 뒤 한 박 늦게 한 번 더 퍼짐 → 빈틈 방향으로, 두 번째도 대비',t=>{const tel=npT(),n=3+G.phase;
 for(let k=0;k<n;k++){const T0=t+k*1.3;sch(T0,()=>{const g=bgeo(),gap=Math.atan2(P.y-g.coreY,P.x-g.x)+(k%2?.9:-.9);if(k===0)npCharge(T0,T0+tel,()=>[g.x,g.coreY],'#8ae8ff');for(const del of [0,.7])for(let i=0;i<20;i++){const a=i*TAU/20;if(Math.abs(((a-gap+Math.PI*3)%TAU)-Math.PI)<.35)continue;npShot(T0,T0+tel+del,g.x,g.coreY,a,64*npS(),{sty:'echo',r:5,col:del?'#4a8aa0':'#8ae8ff',rayL:del?0:40,chg:false,dmg:9})}sch(T0+tel,()=>sfx(500,.3,'sine',.04,500))})}
 return (n-1)*1.3+tel+4.5});
defPat('delayShot','지연 사격','hands',10,'스피커가 쏜 탄이 한 박 늦게 같은 길로 또 나옴 → 두 번 피해',t=>{const tel=npT(),n=4+G.phase;npHands(t,.5,26,-4);
 for(let k=0;k<n;k++){const T0=t+.5+k*.9,h=k%2;sch(T0,()=>{const hd=npHand(h),x=hd.x,y=hd.y,a=Math.atan2(P.y-y,P.x-x);for(const del of [0,1])for(const o of [-.16,0,.16])npShot(T0,T0+tel+del,x,y,a+o,76*npS(),{sty:'echo',col:del?'#4a8aa0':'#8ae8ff',r:5,rayL:del?0:56,chg:false,dmg:9});sch(T0+tel,()=>{hd.kick=1;sfx(700,.08,'square',.03,500)})})}
 npRest(t+.5+n*.9+tel+1);return .5+n*.9+tel+4});
defPat('callBack','되돌아오는 부름','hands',10,'스피커에서 나간 구슬이 멀리 갔다 되돌아옴 → 갈 때·올 때 모두 피해',t=>{const tel=npT(),n=6+G.phase*2;npHands(t,.6,26,0);
 sch(t+.6,()=>{const g=bgeo(),a0=Math.atan2(P.y-g.coreY,P.x-g.x);for(let i=0;i<n;i++){const hd=npHand(i%2),sx=hd.x,sy=hd.y,a=a0+(i-(n-1)/2)*.28,R=190,T1=t+.6+tel;NP({k:'orb',sty:'echo',col:'#8ae8ff',r:5,t0:t+.6,t1:T1,t2:T1+3.2,pos:b=>{const q=clamp((b-T1)/3.2,0,1),r=Math.sin(q*Math.PI)*R;return [sx+Math.cos(a)*r,sy+Math.sin(a)*r]},prev:1.6,prevN:6,dmg:10})}});
 npRest(t+.6+tel+3.3);return .6+tel+3.3});
/* ── 정적 · 첫 번째 태엽 (챕터 3 마지막): 시간 정지 + 앞선 수호자들의 난사 ── */
defPat('freezeFrame','정지 화면','all',10,'탄이 퍼지다 멈추고 방향을 틀어 다시 움직임 → 멈춘 동안 화살표를 보고 길을 찾아',t=>{const n=24,stop=t+2.2,go=t+3.8,g0=npG();npWarn(t,.6);
 sch(t,()=>{npCharge(t,t+1,()=>[HOME.x,g0.coreY],'#c8a0ff')});
 sch(t,()=>{for(let i=0;i<n;i++){const a=i*TAU/n,a2=a+(i%2?.9:-.9),t1=t+1;NP({k:'orb',sty:'default',col:'#c8a0ff',r:5,t0:t,t1,t2:go+4,ray:a,rayL:30,chg:false,pos:b=>{const s1=Math.max(0,Math.min(b,stop)-t1),sx=HOME.x+Math.cos(a)*s1*60*npS(),sy=g0.coreY+Math.sin(a)*s1*60*npS();if(b<go)return [sx,sy];const s2=(b-go)*70*npS();return [sx+Math.cos(a2)*s2,sy+Math.sin(a2)*s2]},dmg:9,deco:(o,b,now)=>{if(b>=stop&&b<go){if(i===0){ctx.font='bold 12px monospace';ctx.textAlign='center';ctx.fillStyle='#c8a0ff';ctx.fillText('■ 정지',HOME.x,AY+50);ctx.textAlign='left'}const [x,y]=o.pos(b);cChevron(x+Math.cos(a2)*10,y+Math.sin(a2)*10,a2,'#ffffff',.9,3)}}})}sfx(200,.4,'sine',.04,100)});
 return 3.8+4});
defPat('lastBeat','마지막 박동','all',10,'심장이 세 번 크게 뛰며 탄이 퍼짐 → 매번 빈 방향이 바뀜',t=>{const tel=npT();
 for(let k=0;k<3;k++){const T0=t+k*1.6,tf=T0+tel;sch(T0,()=>{const n=28,gapA=Math.atan2(P.y-g0y(),P.x-HOME.x)+(k%2?1.6:-1.6);npCharge(T0,tf,()=>[HOME.x,g0y()],'#c8a0ff');for(let i=0;i<n;i++){const a=i*TAU/n;if(Math.abs(((a-gapA+Math.PI*3)%TAU)-Math.PI)<.4)continue;npShot(T0,tf,HOME.x,g0y(),a,70*npS(),{sty:'void',col:'#c8a0ff',r:5,rayL:36,chg:false,dmg:10})}sch(tf,()=>{sfx(50,.5,'sine',.14,30);G.shake=Math.max(G.shake,.4)})})}
 return tel+2*1.6+4});
function g0y(){return npG().coreY}
defPat('stillPoint','고요한 점','field',10,'모든 것이 멈추고 빛나는 한 점만 안전 → 초록 점으로 가',t=>{const tel=Math.max(2.4,npTel()+1),n=2+Math.min(1,G.phase);
 for(let k=0;k<n;k++){const ts=t+k*3.4;sch(ts,()=>{const [x,y]=npIn(AX+50+RND()*(AW-100),AY+50+RND()*(AH-100),40);NP({k:'rect',x:AX,y:AY,w:AW,h:AH,safe:[[x,y,30]],t0:ts,t1:ts+tel,t2:ts+tel+.8,col:'#1a1420',dmg:12})})}
 return (n-1)*3.4+tel+1});
const ORIGIN_POOL=[['pendSwing','p'],['tickTock','p'],['watchSweep','o'],['cameraPost','o'],['mothSwarm','m'],['wingGust','m'],['pumpSlam','b'],['airBlast','b'],['needleSweep','n'],['batonVolley','n'],['pageStorm','c'],['deadline','c'],['dustDevil','d'],['broomSweep','d'],['judgment','s'],['counterWeight','s'],['echoRing','e'],['delayShot','e']];
defPat('originMedley','태엽들의 합주','all',11,'앞선 태엽지기들의 공격이 한꺼번에 쏟아짐 → 먼저 뜬 예고부터 차례로 피해',t=>{const k=2+(G.phase>=2?1:0),pool=ORIGIN_POOL.filter(([n])=>MV[n]),picks=[],used=new Set();
 while(picks.length<k&&used.size<pool.length){const p=pool[Math.floor(RND()*pool.length)];if(used.has(p[0])||picks.some(q=>q[1]===p[1])||(p[1]==='d'&&picks.some(q=>q[0]==='broomSweep'||q[0]==='counterWeight'||q[0]==='cameraPost'))){used.add(p[0]);continue}used.add(p[0]);if(!(CHAN[p[0]]==='hands'&&picks.some(q=>CHAN[q[0]]==='hands')))picks.push(p)}
 let len=0;picks.forEach(([n],i)=>{const st=t+i*1.3,l=MV[n](st);len=Math.max(len,i*1.3+(Number.isFinite(l)?l:8))});sch(t,()=>{G.boss.warn=.6;sfx(160,.6,'sawtooth',.05,640)});return len});

