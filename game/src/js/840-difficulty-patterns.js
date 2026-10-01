/* ===== tier5.js : 난이도별 추가 패턴 — 쉬움은 기본 패턴만, 보통 +3, 어려움 +6, 익스트림 +10 (보스 40명 × 전용 테마) ===== */
const T5_LV={easy:0,normal:1,hard:2,extreme:3};
const t5L=()=>T5_LV[diff]||0,t5S=()=>{try{return D2().sp}catch(e){return 1}},t5T=()=>Math.max(1.25,npTel());
function t5Core(){try{const g=bgeo();return [g.x,g.coreY||g.y-20]}catch(e){return [HOME.x,HOME.y]}}
function t5Key(){try{if(typeof _c3Swap!=='undefined'&&_c3Swap&&_c3Swap.art&&_c3Swap.bi===G.bi)return _c3Swap.art}catch(e){}return 'b'+G.bi}
function t5Snd(t,f,f2){sch(t,()=>{try{sfx(f,.1,'square',.04,f2||f*.5)}catch(e){}})}
/* 보스 테마: [이름, 탄 모양, 크기, 선 모양, 바닥 모양] */
const T5_TH={
 b0:['톱니','gear',7,'laser','plain'],b1:['전류','spark',5,'elec','elec'],b2:['쇳물','fire',6,'laser','lava'],b3:['석탄','coal',6,'chain','plain'],b4:['서리','snow',6,'laser','ice'],
 b5:['드론','drone',6,'laser','plain'],b6:['고철','scrap',6,'chain','plain'],b7:['태엽','gear',6,'laser','plain'],b8:['프리즘','light',5,'laser','light'],b9:['오메가','spark',6,'elec','lava'],
 b10:['가시','default',5,'laser','plain'],b11:['포자','spore',6,'laser','plain'],b12:['늪물','bubble',6,'laser','plain'],b13:['백골','bone',6,'laser','plain'],b14:['독거미','egg',6,'laser','plain'],
 b15:['벌떼','bee',5,'laser','plain'],b16:['수정','crystal',6,'laser','plain'],b17:['심연','bubble',6,'laser','plain'],b18:['원혼','ghost',6,'laser','plain'],b19:['허기','void',6,'laser','plain'],
 pendulum:['진자','bob',7,'chain','plain'],panopticon:['감시','eye',6,'laser','light'],moth:['나방','moth',6,'laser','plain'],bellows:['증기','steam',6,'laser','lava'],metronome:['박자','note',5,'laser','plain'],
 calendar:['달력','page',6,'laser','plain'],dust:['먼지','dust',6,'laser','plain'],scales:['저울','weight',6,'chain','plain'],echo:['메아리','echo',6,'laser','plain'],stillness:['정적','ghost',6,'laser','plain'],
 s4_meteor:['유성','ember',5,'lance','flare'],s4_eclipse:['일식','sunspot',6,'ray','flare'],s4_comet:['혜성','comet',6,'ray','plain'],s4_nebula:['성운','plank',5,'ray','nebula'],s4_gemini:['쌍성','twin',6,'tether','plain'],
 s4_void:['암흑','darkm',6,'ray','void'],s4_nova:['초신성','star4',6,'ray','flare'],s4_luna:['달빛','crescent',6,'ray','moon'],s4_weaver:['별실','needle',5,'thread','moon'],s4_last:['별빛','star4',7,'ray','flare']};
/* 16가지 공격 틀 (a: 쉬운 편 · m: 중간 · h: 어려운 편) */
const T5_ARCH={};
function t5A(id,grp,suf,chan,est,tip,fn){T5_ARCH[id]={id,grp,suf,chan,est,tip,fn}}
const t5O=(th,o)=>Object.assign({sty:th[1],r:th[2],dmg:10},o);
t5A('aimed','a','조준 사격','head',7,'보스 몸에서 부채꼴 탄이 나를 겨눔 → 화살표 사이로 옆걸음',(t,th,L)=>{const n=2+L,tel=t5T(),s=t5S();
 for(let k=0;k<n;k++){const T0=t+k*.8;sch(T0,()=>{const [cx,cy]=t5Core(),a0=Math.atan2(P.y-cy,P.x-cx),m=3+Math.min(L,2)*1;if(k===0)npCharge(T0,T0+tel,()=>t5Core());for(let i=0;i<m;i++){const a=a0+(i-(m-1)/2)*.2;npShot(T0,T0+tel,cx,cy,a,(76+L*6)*s,t5O(th,{rayL:34}))}});t5Snd(T0+tel,760)}
 return (n-1)*.8+tel+4});
t5A('rain','a','소나기','field',7,'하늘에서 줄지어 떨어짐 → 아래 화살표가 없는 칸으로',(t,th,L)=>{const n=8+L*4,dur=3,tel=t5T(),s=t5S();
 for(let i=0;i<n;i++){const T0=t+i*dur/n;sch(T0,()=>{const near=i%3===0,x=clamp(near?P.x+(RND()-.5)*40:AX+14+RND()*(AW-28),AX+10,AX+AW-10);npShot(T0,T0+tel,x,AY+4,Math.PI/2,(92+L*8)*s,t5O(th,{rayL:44}))})}
 t5Snd(t+tel,520);return dur+tel+3.5});
t5A('column','a','기둥 낙하','field',7,'내 위치부터 기둥이 양옆으로 번져 나감 → 기둥 사이 박자를 보고 건너가기',(t,th,L)=>{const n=3+L,tel=t5T(),w=34;let px=HOME.x;sch(t,()=>{px=P.x});
 for(let k=0;k<n;k++){const T0=t+k*.5;sch(T0,()=>{for(const s of (k?[-1,1]:[0])){const x=px+s*k*44-w/2;if(x+w<AX||x>AX+AW)continue;const x0=Math.max(AX,x),x1=Math.min(AX+AW,x+w);NP({k:'rect',sty:th[4],x:x0,y:AY,w:x1-x0,h:AH,t0:T0,t1:T0+tel,t2:T0+tel+.4,dmg:11})}});t5Snd(T0+tel,300)}
 return (n-1)*.5+tel+.6});
t5A('mines','a','지뢰밭','field',7,'내 주변에 원이 깔리고 차례로 터짐 → 이미 터진 자리로 이동',(t,th,L)=>{const n=4+L*2,tel=t5T();
 sch(t,()=>{const cx=P.x,cy=P.y;for(let i=0;i<n;i++){const a=i*2.4+RND(),d=i===0?0:20+RND()*70,[x,y]=npIn(cx+Math.cos(a)*d,cy+Math.sin(a)*d,16),T1=t+tel+i*.3;NP({k:'circ',x,y,r:18,label:String(i+1),t0:t,t1:T1,t2:T1+.35,dmg:11});t5Snd(T1,220,90)}});
 return tel+n*.3+.5});
t5A('sweep','a','휩쓸기','head',7,'몸에서 긴 광선이 부채꼴로 쓸어감 → 도는 방향 반대쪽 뒤로 돌아 들어가기',(t,th,L)=>{const tel=t5T(),dur=2.4/Math.max(.8,t5S()),span=2.2;
 sch(t,()=>{const [cx,cy]=t5Core(),a0=Math.atan2(P.y-cy,P.x-cx),dir=RND()<.5?1:-1;npCharge(t,t+tel,()=>t5Core());
  const mk=(sgn,off)=>{const A=b=>a0+sgn*(-span/2+span*clamp((b-(t+tel+off))/dur,0,1));NP({k:'seg',sty:th[3],w:9,live:true,t0:t,t1:t+tel+off,t2:t+tel+off+dur,a:()=>t5Core(),b:b=>{const [x,y]=t5Core(),a=A(b);return [x+Math.cos(a)*300,y+Math.sin(a)*300]},dmg:11,deco:(o,b,now)=>{if(b>=o.t1)return;const [x,y]=t5Core(),a=A(o.t1);for(let i=1;i<5;i++)cChevron(x+Math.cos(a+sgn*.18*i)*70,y+Math.sin(a+sgn*.18*i)*70,a+sgn*.18*i+sgn*Math.PI/2,'#ff4d6d',.8,3)}})};
  mk(dir,0);if(L>=2)mk(-dir,.6);if(L>=3)mk(dir,dur+.3)});t5Snd(t+tel,180,90);return tel+dur*(L>=3?2:1)+1});
t5A('nova','a','폭산','field',7,'표시된 점에서 탄이 사방으로 퍼짐 → 점에서 멀리, 탄 사이 틈으로',(t,th,L)=>{const n=1+L,tel=t5T(),s=t5S();
 for(let k=0;k<n;k++){const T0=t+k*1;sch(T0,()=>{const [x,y]=npIn(P.x+(RND()-.5)*60,P.y+(RND()-.5)*50,20),m=10+L*2,off=RND()*TAU;NP({k:'circ',x,y,r:12,label:'✦',t0:T0,t1:T0+tel,t2:T0+tel+.3,dmg:10});
  for(let i=0;i<m;i++){const a=off+i*TAU/m;npShot(T0,T0+tel,x,y,a,(60+L*5)*s,t5O(th,{rayL:14}))}});t5Snd(T0+tel,640,200)}
 return (n-1)+tel+4});
t5A('spiral','m','나선','head',8,'몸에서 탄이 소용돌이치며 뿜어짐 → 팔 사이 틈을 따라 같은 방향으로 돌기',(t,th,L)=>{const tel=t5T(),arms=3+Math.min(L,3),waves=4+L*2,s=t5S(),dir=RND()<.5?1:-1;
 sch(t,()=>{npCharge(t,t+tel,()=>t5Core())});
 for(let k=0;k<waves;k++){const T0=t+tel+k*.35;sch(T0,()=>{const [cx,cy]=t5Core(),a0=k*.26*dir;for(let i=0;i<arms;i++)NP(t5O(th,{k:'orb',t0:T0-.45,t1:T0,t2:T0+5,pos:npVel(cx,cy,a0+i*TAU/arms+Math.PI/2,(58+L*5)*s,T0),ray:a0+i*TAU/arms+Math.PI/2,rayL:18}))});if(k%2===0)t5Snd(T0,880)}
 return tel+waves*.35+4});
t5A('cross','m','십자 광선','field',8,'내 줄에 가로·세로 광선이 번갈아 꽂힘 → 점선이 뜨면 비켜서기',(t,th,L)=>{const n=2+L,tel=t5T();
 for(let i=0;i<n;i++){const T0=t+i*.8;sch(T0,()=>{const hor=i%2===0,x=P.x,y=P.y;NP({k:'seg',sty:th[3],w:11,t0:T0,t1:T0+tel,t2:T0+tel+.5,a:()=>hor?[AX,y]:[x,AY],b:()=>hor?[AX+AW,y]:[x,AY+AH],dmg:11})});t5Snd(t+i*.8+tel,1200,300)}
 return (n-1)*.8+tel+.7});
t5A('bounce','m','난반사','field',8,'벽에 튕기는 탄 여러 개 → 화살표 궤적을 미리 보고 빈 곳으로',(t,th,L)=>{const n=2+L,tel=t5T(),s=t5S(),life=4+L*.5;
 sch(t,()=>{const [cx,cy]=t5Core();npCharge(t,t+tel,()=>t5Core());const a0=Math.atan2(P.y-cy,P.x-cx);for(let i=0;i<n;i++){const a=a0+(i-(n-1)/2)*.55;NP(t5O(th,{k:'orb',r:th[2]+1,t0:t,t1:t+tel,t2:t+tel+life,pos:npBounce(cx,cy,a,(74+L*6)*s,t+tel),prev:1.6,prevN:8,dmg:11}))}});
 t5Snd(t+tel,420,160);return tel+life+.3});
t5A('snake','m','뱀 행렬','field',8,'탄이 줄지어 물결치며 가로지름 → 물결이 높을 때 아래로, 낮을 때 위로',(t,th,L)=>{const tel=t5T(),s=t5S(),m=10+L*3,v=(92+L*8)*s,rows=L>=2?2:1;
 sch(t,()=>{for(let r=0;r<rows;r++){const dir=(r%2?-1:1)*(P.x<AX+AW/2?-1:1),yc=clamp(P.y+(r?-50:0),AY+30,AY+AH-30),x0=dir>0?AX-8:AX+AW+8,T1=t+tel+r*.8,amp=26;
  for(let j=0;j<m;j++){const st=T1+j*.12,pos=b=>{const u=Math.max(0,b-st)*v,x=x0+dir*u;return [x,yc+Math.sin(u/32)*amp]};NP(t5O(th,{k:'orb',t0:t,t1:st,t2:st+(AW+20)/v,pos,prev:j===0?2:0,prevN:14,noTel:j>0}))}}});
 t5Snd(t+tel,540,700);return tel+.8*(rows-1)+m*.12+(AW+20)/((92+L*8)*s)+.3});
t5A('wall','m','탄막 벽','field',8,'한 줄 벽이 밀려옴 → 초록 화살표 빈틈에 서기',(t,th,L)=>{const n=1+L,tel=t5T(),s=t5S(),v=(70+L*6)*s;
 for(let k=0;k<n;k++){const T0=t+k*1.4;sch(T0,()=>{const dir=k%2?-1:1,x0=dir>0?AX+6:AX+AW-6,rows=Math.floor((AH-16)/16),gi=clamp(Math.round((P.y-AY-8)/16)+(RND()<.5?-2:2),1,rows-4),T1=T0+tel;
  for(let j=0;j<rows;j++){if(j>=gi&&j<gi+3)continue;const y=AY+8+j*16;NP(t5O(th,{k:'orb',r:th[2],t0:T0,t1:T1,t2:T1+(AW)/v,pos:npVel(x0,y,dir>0?0:Math.PI,v,T1),ray:dir>0?0:Math.PI,rayL:16}))}
  NP({k:'orb',harm:false,noTel:true,r:1,t0:T0,t1:T1,t2:T1+.01,pos:()=>[x0,0],deco:(o,b)=>{if(b>=o.t1)return;for(const sg of [-1,1])cChevron(x0+dir*14,AY+8+(gi+1)*16+sg*6,dir>0?0:Math.PI,'#a6f5c6',1,4)}})});t5Snd(T0+tel,300,500)}
 return (n-1)*1.4+tel+AW/v+.3});
t5A('homing','m','추적자','head',8,'나를 쫓아오는 탄 → 크게 돌며 끌고 다니다 벽 쪽에서 따돌리기',(t,th,L)=>{const n=1+L,tel=t5T(),life=4.5,s=t5S();
 for(let k=0;k<n;k++){const T0=t+k*.7;sch(T0,()=>{const [cx,cy]=t5Core(),o=NP(t5O(th,{k:'orb',r:th[2]+1,t0:T0,t1:T0+tel,t2:T0+tel+life,dmg:11}));o.cx=cx;o.cy=cy+10;const a=Math.atan2(P.y-cy,P.x-cx);o.vx=Math.cos(a);o.vy=Math.sin(a);o.pos=()=>[o.cx,o.cy];
  o.step=(q,b,dt)=>{if(b<q.t1)return;const sp=(40+L*7)*s,a2=Math.atan2(P.y-q.cy,P.x-q.cx),a1=Math.atan2(q.vy,q.vx);let d=a2-a1;while(d>Math.PI)d-=TAU;while(d<-Math.PI)d+=TAU;const na=a1+clamp(d,-2.2*dt,2.2*dt);q.vx=Math.cos(na);q.vy=Math.sin(na);q.cx=clamp(q.cx+q.vx*sp*dt,AX+4,AX+AW-4);q.cy=clamp(q.cy+q.vy*sp*dt,AY+4,AY+AH-4)};
  o.deco=(q,b,now)=>{if(b>=q.t1&&Math.floor(now/120)%2)cRing(q.cx,q.cy,q.r+4,'#ff4d6d',.6,1)}});t5Snd(T0+tel,300,600)}
 return (n-1)*.7+tel+life+.2});
t5A('pincer','h','협공 벽','field',9,'양쪽 벽이 조여 오며 가운데 틈만 남음 → 초록 화살표 틈으로',(t,th,L)=>{const tel=t5T(),cl=1.1,hold=1,gap=64-L*6;let n=L>=3?2:1;
 for(let k=0;k<n;k++){const T0=t+k*(tel+cl+hold+.4),T1=T0+tel;sch(T0,()=>{const ver=k%2===1,g=ver?clamp(P.y,AY+gap/2+6,AY+AH-gap/2-6):clamp(P.x+(RND()-.5)*80,AX+gap/2+6,AX+AW-gap/2-6),E=b=>{const p=clamp((b-T1)/cl,0,1);return 1-Math.pow(1-p,3)};
  const mk=(side)=>NP({k:'rect',sty:th[4],noTel:true,t0:T0,t1:T1,t2:T1+cl+hold,dmg:11,rf:b=>{const e=E(b);if(!ver){if(side<0){const w=(g-gap/2-AX)*e;return [AX,AY,w,AH]}const x1=g+gap/2,w=(AX+AW-x1)*e;return [AX+AW-w,AY,w,AH]}if(side<0){const h=(g-gap/2-AY)*e;return [AX,AY,AW,h]}const y1=g+gap/2,h=(AY+AH-y1)*e;return [AX,AY+AH-h,AW,h]},
   deco:(o,b,now)=>{if(b>=T1+cl)return;const bl=Math.floor(now/90)%2;if(side<0){if(!ver)for(let y=AY;y<AY+AH;y+=6){cPx(g-gap/2,y,2,bl?'#fff':'#ff4d6d',.9);cPx(g+gap/2,y,2,bl?'#fff':'#ff4d6d',.9)}else for(let x=AX;x<AX+AW;x+=6){cPx(x,g-gap/2,2,bl?'#fff':'#ff4d6d',.9);cPx(x,g+gap/2,2,bl?'#fff':'#ff4d6d',.9)}
    for(let i=0;i<3;i++){if(!ver)cChevron(g,AY+40+i*((AH-80)/2),Math.PI/2,'#a6f5c6',1,4);else cChevron(AX+60+i*((AW-120)/2),g,0,'#a6f5c6',1,4)}
    if(b<T1){for(let i=0;i<4;i++){if(!ver){cChevron(AX+10+i*6,AY+AH/2,0,'#ff4d6d',.7,3);cChevron(AX+AW-10-i*6,AY+AH/2,Math.PI,'#ff4d6d',.7,3)}else{cChevron(AX+AW/2,AY+10+i*6,Math.PI/2,'#ff4d6d',.7,3);cChevron(AX+AW/2,AY+AH-10-i*6,-Math.PI/2,'#ff4d6d',.7,3)}}}}}});
  mk(-1);mk(1)});t5Snd(T1,90,50)}
 return n*(tel+cl+hold+.4)});
t5A('checker','h','격자 폭발','field',9,'바둑판 칸이 번갈아 터짐 → 방금 터진 칸으로 옮겨 서기',(t,th,L)=>{const tel=t5T(),waves=2+L,cols=8,rows=5,cw=AW/cols,ch=AH/rows,gap=Math.max(.9,tel*.8);
 for(let k=0;k<waves;k++){const T0=t+k*gap;sch(T0,()=>{for(let i=0;i<cols;i++)for(let j=0;j<rows;j++)if((i+j+k)%2===0)NP({k:'rect',sty:th[4],x:AX+i*cw+1,y:AY+j*ch+1,w:cw-2,h:ch-2,t0:T0,t1:T0+tel,t2:T0+tel+.4,dmg:10})});t5Snd(T0+tel,160,80)}
 return (waves-1)*gap+tel+.6});
t5A('pinwheel','h','바람개비','field',9,'가운데서 광선 네 줄이 천천히 회전 → 같은 방향으로 따라 돌기',(t,th,L)=>{const tel=t5T(),dur=5,rot=(.45+.12*L)*(RND()<.5?1:-1),cx=AX+AW/2,cy=AY+AH*.58,Ln=AW*.62,arms=L>=3?3:2;let a0=0;sch(t,()=>{a0=Math.atan2(P.y-cy,P.x-cx)+Math.PI/4});
 for(let i=0;i<arms;i++){NP({k:'seg',sty:th[3],w:9,live:true,t0:t,t1:t+tel,t2:t+tel+dur,dmg:11,a:b=>{const a=a0+i*Math.PI/arms+rot*Math.max(0,b-(t+tel));return [cx-Math.cos(a)*Ln,cy-Math.sin(a)*Ln]},b:b=>{const a=a0+i*Math.PI/arms+rot*Math.max(0,b-(t+tel));return [cx+Math.cos(a)*Ln,cy+Math.sin(a)*Ln]},
  deco:i?null:(o,b,now)=>{cRing(cx,cy,6,'#ffffff',.8,2);if(b<o.t1)for(let k=0;k<4;k++){const a=a0+k*Math.PI/2+rot*.3;cChevron(cx+Math.cos(a)*50,cy+Math.sin(a)*50,a+Math.sign(rot)*Math.PI/2,'#ff4d6d',.8,3)}}})}
 t5Snd(t+tel,200,400);return tel+dur+.3});
t5A('converge','h','포위망','field',9,'나를 둘러싼 원에서 탄이 한가운데로 모여듦 → 가운데 표시에서 빨리 빠져나가기',(t,th,L)=>{const tel=t5T(),n=8+L*2,s=t5S(),mv=2.6/Math.max(.8,s),waves=L>=3?2:1;
 for(let k=0;k<waves;k++){const T0=t+k*1.6;sch(T0,()=>{const [cx,cy]=npIn(P.x,P.y,40),R=150,off=RND()*TAU;NP({k:'circ',x:cx,y:cy,r:20,t0:T0,t1:T0+tel+mv*.5,t2:T0+tel+mv*.5+.3,harm:false,dmg:0,label:'!'});
  for(let i=0;i<n;i++){const a=off+i*TAU/n,sx=cx+Math.cos(a)*R,sy=cy+Math.sin(a)*R;NP(t5O(th,{k:'orb',t0:T0,t1:T0+tel,t2:T0+tel+mv,pos:npLin(sx,sy,cx-Math.cos(a)*R,cy-Math.sin(a)*R,T0+tel,T0+tel+mv),ray:a+Math.PI,rayL:22}))}});t5Snd(T0+tel,330,660)}
 return (waves-1)*1.6+tel+mv+.2});
/* 보스별 추가 패턴 고르기: 보통 = 쉬운 편 3, 어려움 = 중간 3, 익스트림 = 어려운 편 2 + 남은 것 2 */
function t5Hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function t5Shuf(a,seed){a=a.slice();let x=seed||1;for(let i=a.length-1;i>0;i--){x=(Math.imul(x,1103515245)+12345)>>>0;const j=x%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
const T5_SET={};
for(const [key,th] of Object.entries(T5_TH)){const seed=t5Hash(key),by=g=>t5Shuf(Object.values(T5_ARCH).filter(a=>a.grp===g).map(a=>a.id),seed+g.charCodeAt(0));const A=by('a'),M=by('m'),Hh=by('h');
 const tiers=[A.slice(0,3),M.slice(0,3),Hh.slice(0,2).concat([A[3],M[3]])];T5_SET[key]=tiers.map((ids,ti)=>ids.map(id=>{const R=T5_ARCH[id],nm='t5_'+key+'_'+id,kr=th[0]+' '+R.suf;
  defPat(nm,kr,R.chan,R.est,R.tip,t=>R.fn(t,th,Math.max(ti+1,t5L())));return nm}))}
function t5Extra(key){const S=T5_SET[key];if(!S)return [];const L=t5L(),out=[];for(let i=0;i<L;i++)for(const n of S[i])out.push(n);return out}
function t5Count(key){const S=T5_SET[key],L=t5L();return S?S.slice(0,L).reduce((a,x)=>a+x.length,0):0}
const T5_W={easy:0,normal:1.8,hard:1.8,extreme:2};
function t5Deck(base){const key=t5Key(),ex=t5Extra(key);if(!ex.length)return base;const w=T5_W[diff]||2,d=base.slice();for(const n of ex)if(MV[n]&&!d.some(m=>m[0]===n))d.push([n,w,0]);return d}
{const _bp=buildPhrase;buildPhrase=function(){const bi=G.bi,base=DECK[bi];if(!base)return _bp.apply(this,arguments);let d=base;try{d=t5Deck(base)}catch(e){console.error('t5',e)}DECK[bi]=d;try{return _bp.apply(this,arguments)}finally{if(DECK[bi]===d)DECK[bi]=base}}}
function t5Total(){try{const b=DECK[G.bi]||[],base=diff==='easy'?b.filter(m=>m[2]<=0).length:b.length;return base+t5Count(t5Key())}catch(e){return 0}}

