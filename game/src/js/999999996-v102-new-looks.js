/* ================= v102 새 외형 (LOOK102) =================
   ① 유물 · 신화 · 초월 캐릭터 15명: 부품 조합 틀(9999998 paintChar)을 버리고 한 명씩 체형부터 다르게 새로 그림.
      (넓은 갑옷 거인 · 다리 없이 떠다니는 망령 · 치마 무희 · 요정 · 구부정한 도마뱀 인간 · 날개 기사 …)
      앞 · 옆 · 뒤 모습, 걷기 · 공격 자세(ch2Legs · ch2Arms)는 그대로 따라간다.
   ② 변이 스킨 25종(기존 10 + v82 15): 색만 바꾸던 것에 변이마다 다른 옷 · 장비(모자 · 망토 · 날개 · 가면 · 갑옷 …)를 덧입힘.
   ③ 변이 펫 25종: 색 바꾼 펫 위에 변이마다 다른 장식(왕관 · 날개 · 뿔 · 후광 · 목도리 · 등에 탄 것 …). */
(()=>{try{
 if(typeof CH2DEF==='undefined'||!window.MYTH100)return;
 const M=MYTH100,TAU=Math.PI*2,V=()=>(window.__HV&&__HV.view)||'front';
 const sh=(c,k)=>{try{return shade(c,k)}catch(e){return c}};
 /* ---------- 공통 도구 ---------- */
 function face(Q,b,bl,skin,eye,o){o=o||{};const v=V();if(v==='back')return;ch2Head(Q,skin,12+b);
  if(v==='side'){if(!bl){Q.R(17,14+b,2,3,'#1a1020');Q.R(17,15+b,2,2,eye);Q.px(17,14+b,'#ffffff')}else Q.R(17,16+b,2,1,'#1a1020')}
  else{ch2Eyes(Q,bl,eye,14+b,3,!!o.big);if(!o.noMouth)Q.R(13,18+b,2,1,o.mouth||'#9a4a4a');if(o.cheek)ch2Cheek(Q,17+b,o.cheek)}}
 function torso(Q,b,col,w,bot){w=w||6;bot=bot||28;const y=19+b;Q.P([[14-w,y],[14+w,y],[14+w+1,bot],[13-w,bot]],col);Q.R(14-w,y,w*2,1.4,sh(col,1.3));Q.R(14+w-2,y+1.5,2,bot-y-2,sh(col,.72),.55)}
 const glowC=(Q,x,y,r,col,a)=>{Q.C(x,y,r,col,(a||.25)*.5);Q.C(x,y,r*.6,col,a||.25)};
 /* ================= ① 캐릭터 15 ================= */
 const P=[
 /* 아르테온 · 신화의 검성: 왕관 투구 · 큰 어깨 갑옷 · 긴 진홍 망토 */
 (Q,f,b,bl,t)=>{const v=V(),back=v==='back',G='#ffd84a',N='#262848';
  const cape=(a)=>{const w=Math.sin(t*3)*.8;Q.P([[6,18+b],[22,18+b],[25+w,34],[3+w,34]],'#a01a24',a);for(let i=0;i<4;i++)Q.R(7+i*4.5+w*.5,22+b,1,11,'#6a0a14',.5*(a||1));Q.R(4+w,33,21,1,G,a)};
  if(!back)cape();ch2Legs(Q,f,'#1e1e36','#c8a030');torso(Q,b,N,6);Q.P([[10,20+b],[18,20+b],[17,26+b],[11,26+b]],'#3a3c68');Q.C(14,22.5+b,1.6,G);Q.px(14,22+b,'#fff6c0');Q.R(8,27+b,12,1.4,G);
  ch2Arms(Q,f,N,G,b);for(const x of [6.5,21.5]){Q.E(x,19.5+b,4,2.8,'#141626');Q.E(x,19.2+b,3.4,2.2,G);Q.R(x-3,18.4+b,6,.8,'#fff6c0',.7)}
  if(back){cape(1);Q.E(14,12+b,7.6,7,'#e8e8f0');}else{face(Q,b,bl,'#ffe0c8','#c8a020');Q.R(6.5,9+b,2,9,'#e8e8f0');Q.R(19.5,9+b,2,9,'#e8e8f0');Q.R(8,7.5+b,12,2.5,'#e8e8f0')}
  Q.R(7,5+b,14,2.6,G);for(let i=0;i<5;i++)Q.P([[7+i*3,5+b],[8.5+i*3,-1+b-(i===2?2:0)],[10+i*3,5+b]],G);Q.C(14,5.8+b,1.1,'#ff3a4a');Q.px(10,5.6+b,'#5ab8ff');Q.px(18,5.6+b,'#5ab8ff');Q.R(7,5+b,14,.7,'#fff6c0')},
 /* 루나리아 · 달의 무희: 다리 대신 펄럭이는 치마 · 떠오른 은발 · 등 뒤 초승달 */
 (Q,f,b,bl,t)=>{const v=V(),back=v==='back',fl=Math.sin(t*2)*1.2-1,bb=b+fl,H='#dfe8ff';
  Q.C(14,9+bb,9,'#fff6d0',.18);Q.C(14,9+bb,7.5,'#fff6d0',.85);Q.C(16.5,8+bb,7,'#1e2a5a');
  for(let i=0;i<5;i++){const w=Math.sin(t*2.5+i)*1.5;Q.P([[7+i*3.5,10+bb],[9+i*3.5,10+bb],[8+i*3.5+w,26+bb+i%2*2]],H,.95)}
  const sk=Math.sin(t*3)*1.2;Q.P([[9,22+bb],[19,22+bb],[25+sk,33],[3+sk,33]],'#2a3a7a');Q.P([[9,22+bb],[14,22+bb],[11+sk,33],[3+sk,33]],'#3a4c94');for(let i=0;i<6;i++)Q.R(4+i*3.6+sk,32,2.2,1,'#bfe8ff');
  torso(Q,bb,'#1e2a5a',4,24);Q.R(10,23+bb,8,1,'#bfe8ff');ch2Arms(Q,0,'#bfe8ff','#fff4ee',bb);Q.R(7,19+bb,3,6,'#bfe8ff',.4);
  for(let i=0;i<4;i++){const q=(t*.6+i/4)%1;Q.px(4+i*7+Math.sin(t+i)*2,33-q*18,'#ffffff',1-q)}
  if(back){Q.E(14,12+bb,7.6,7,H);Q.R(7,12+bb,14,10,H)}else{face(Q,bb,bl,'#fff4ee','#6ab8ff',{big:1,cheek:'#ffb0c8'});Q.E(14,7.5+bb,8,4,H);Q.R(6.5,8+bb,15,3,H);for(let i=0;i<4;i++)Q.P([[7+i*4,10.5+bb],[10+i*4,10.5+bb],[8.5+i*4,13+bb]],H);Q.R(6.5,9+bb,2,12,H);Q.R(19.5,9+bb,2,12,H)}},
 /* 카이저 · 폭풍 군주: 얼굴 없는 뿔 투구 · 넓은 갑옷 · 찢어진 폭풍 망토 */
 (Q,f,b,bl,t)=>{const v=V(),back=v==='back',D='#24242e',E='#8de4ff';
  for(let i=0;i<7;i++){const w=Math.sin(t*4+i)*1.4;Q.P([[4+i*3,18+b],[7+i*3,18+b],[5.5+i*3+w,33-(i%2)*3]],i%2?'#3a2a6a':'#2a1e50')}
  ch2Legs(Q,f,'#1a1a24','#3a3a4a');torso(Q,b,D,8);for(const y of [21,24])Q.R(8,y+b,12,1,'#3a3a4c');Q.C(14,22+b,2,E,.9);Q.C(14,22+b,1,'#ffffff');Q.R(6,27+b,16,1.4,'#4a4a60');
  ch2Arms(Q,f,D,'#3a3a4a',b);for(const s of [-1,1]){Q.P([[14+s*5,18+b],[14+s*11,16+b],[14+s*10,22+b],[14+s*5,22+b]],'#30303e');Q.R(14+s*8-1,16.5+b,2,1,E,.8)}
  Q.E(14,11+b,8,8,D);Q.R(6,11+b,16,6,D);Q.R(6,10+b,16,1,'#3a3a4c');if(!back){Q.R(8,13+b,12,1.6,E);Q.R(8,13+b,12,1.6,'#ffffff',.3+.3*Math.sin(t*6));Q.R(13.4,4+b,1.2,9,'#3a3a4c')}
  for(const s of [-1,1])Q.P([[14+s*6,7+b],[14+s*13,-1+b],[14+s*11,-4+b],[14+s*9,1+b],[14+s*4,5+b]],'#c8c8d8');
  if(Math.floor(t*7)%4===0){let x=4+((t*37)%20),y=-2+b;for(let i=0;i<4;i++){const nx=x+(Math.sin(t*50+i)*3);Q.L(x,y,nx,y+3,'#fff6a0');x=nx;y+=3}}},
 /* 셀레네 · 별 사냥꾼: 별 무늬 망토 · 깊은 후드 · 등에 활 */
 (Q,f,b,bl,t)=>{const v=V(),back=v==='back',C='#1e2a6a';
  if(!back){Q.L(23,8+b,26,20+b,'#c8a060');for(let i=0;i<13;i++)Q.px(25+Math.sin(i*.25)*-2.5,8+i+b,'#8a6a30');Q.L(23,8+b,25,21+b,'#fff6d0',.6)}
  ch2Legs(Q,f,'#14183a','#2a2a4a');Q.P([[6,18+b],[22,18+b],[24,31],[4,31]],C);for(let i=0;i<8;i++){const tw=.5+.5*Math.sin(t*4+i*2);Q.px(6+((i*37)%16),21+((i*23)%9)+b,i%3?'#ffffff':'#ffe36b',tw)}
  Q.R(5,30,20,1,'#ffe36b',.8);ch2Arms(Q,f,C,'#ffe8d8',b);Q.R(9,17+b,10,2.4,'#ffe36b');Q.R(16,19+b,2,5,'#ffe36b');
  Q.E(14,11.5+b,9,8.6,C);if(!back){Q.E(14,13+b,6.6,5.8,'#0a0e24');if(!bl){for(const s of [-1,1]){Q.R(14+s*3-(s<0?1:0),13+b,2,2,'#ffe36b');Q.C(14+s*3-(s<0?0:-1),14+b,1.6,'#ffe36b',.3)}}Q.R(12,17+b,4,1,'#ffe0d0',.7)}else{for(let i=0;i<5;i++)Q.px(9+i*2.4,9+i%2*3+b,'#ffe36b',.8);Q.L(5,8+b,22,22+b,'#c8a060')}
  Q.P([[10,4+b],[14,-1+b],[18,4+b]],C);Q.px(14,1+b,'#ffe36b',.5+.5*Math.sin(t*5))},
 /* 바하무트 · 용기사: 용 머리 투구 · 붉은 막 날개 · 꼬리 · 비늘 갑옷 */
 (Q,f,b,bl,t)=>{const v=V(),back=v==='back',R='#a02a2a',fl=Math.sin(t*4)*1.5;
  for(const s of (v==='side'?[1]:[-1,1])){Q.P([[14+s*4,19+b],[14+s*15,7+b+fl],[14+s*14,22+b],[14+s*9,25+b]],'#5a0a0a');Q.P([[14+s*4,19+b],[14+s*14,8+b+fl],[14+s*12,20+b]],'#c8322a');for(let i=1;i<3;i++)Q.L(14+s*4,19+b,14+s*(8+i*3),9+i*5+b+fl,'#ffb040',.6)}
  const w=Math.sin(t*3)*1.6;Q.P([[16,26+b],[24,28],[27+w,24],[25,30],[17,29]],'#8a1a1a');Q.C(27+w,24,1,'#ffb040');
  ch2Legs(Q,f,'#3a1010','#2a0a0a');torso(Q,b,R,6);for(let r=0;r<3;r++)for(let i=0;i<4;i++)Q.E(9.5+i*3+(r%2)*1.5,21+r*2.2+b,1.4,1,'#c8443a');Q.R(8,27+b,12,1.4,'#ffb040');
  ch2Arms(Q,f,R,'#3a1010',b);for(const x of [6.5,21.5])Q.E(x,19.5+b,3.2,2.2,'#7a1a14');
  Q.E(14,11+b,8,7.6,R);Q.R(6,11+b,16,5,R);for(let i=0;i<4;i++)Q.E(9+i*3.4,8+b,1.6,1,'#c8443a');
  if(!back){Q.P([[10,14+b],[18,14+b],[16.5,20+b],[11.5,20+b]],'#8a1a1a');Q.R(11,15+b,6,1,'#ffb040');for(const s of [-1,1])Q.R(14+s*2.5-(s<0?1:0),12+b,2,1.4,'#ffd166');Q.px(12,19+b,'#fff6d0');Q.px(15,19+b,'#fff6d0')}
  for(const s of [-1,1])Q.P([[14+s*5,6+b],[14+s*9,-3+b],[14+s*7,5+b]],'#ffe0b0')},
 /* 에레보스 · 그림자 왕: 다리 없는 망령 · 연기 아랫몸 · 그림자 왕관 · 보라 눈 */
 (Q,f,b,bl,t)=>{const v=V(),back=v==='back',fl=Math.sin(t*2)*1.5-2,bb=b+fl,K='#14101c';
  for(let i=0;i<6;i++){const q=(t*.8+i/6)%1;Q.C(8+i*2.5+Math.sin(t*3+i)*2,30+q*4,2.4*(1-q)+.5,'#2a1a40',(1-q)*.7)}
  Q.P([[6,18+bb],[22,18+bb],[21,27+bb],[17+Math.sin(t*4)*2,33],[11+Math.sin(t*4+1)*2,33],[7,27+bb]],K);Q.P([[8,19+bb],[20,19+bb],[19,26+bb],[9,26+bb]],'#1e1630');Q.R(7,18+bb,14,1.4,'#6a3aff',.7);
  ch2Arms(Q,0,'#1e1630','#c8c0e0',bb);Q.E(14,11.5+bb,8.4,8,K);
  if(!back){Q.E(14,13+bb,6,5.4,'#05030a');if(!bl)for(const s of [-1,1]){Q.R(14+s*3-(s<0?1:0),13+bb,2,1.6,'#c88aff');Q.C(14+s*3-(s<0?0:-1),13.8+bb,1.8,'#b48aff',.3)}}
  for(let i=0;i<5;i++)Q.P([[8+i*3,5+bb],[9.5+i*3,-1+bb-(i%2)*2+Math.sin(t*3+i)],[11+i*3,5+bb]],'#2a1a40');Q.R(8,4.5+bb,12,1.2,'#6a3aff');Q.C(14,3+bb,.9,'#ff4dd8',.6+.4*Math.sin(t*4))},
 /* 아우로라 · 극광 성녀: 거대한 극광 날개 · 바닥까지 끌리는 하얀 로브 · 지팡이 */
 (Q,f,b,bl,t)=>{const v=V(),back=v==='back',CO=['#5affd8','#7ad8ff','#c88aff','#ff9ad0'];
  for(const s of (v==='side'?[1]:[-1,1]))for(let i=0;i<5;i++){const a=-1.9+i*.32,fl=Math.sin(t*2+i*.6)*.06,L=10+i*1.4;Q.P([[14+s*3,19+b],[14+s*(3+Math.cos(a+fl)*L*1.1),19+b+Math.sin(a+fl)*L],[14+s*(3+Math.cos(a+fl+.24)*L*.9),19+b+Math.sin(a+fl+.24)*L*.9]],CO[(i+Math.floor(t*2))%4],.85)}
  if(!back){Q.L(21,4+b,21,31,'#e8c870');Q.C(21,3+b,2,'#ffe79a');Q.C(21,3+b,3,'#ffe79a',.25+.15*Math.sin(t*3))}
  Q.P([[8,19+b],[20,19+b],[23,33],[5,33]],'#f4f8ff');Q.P([[13,19+b],[15,19+b],[16,33],[12,33]],'#ffe79a',.9);Q.R(5,32,18,1,'#ffd84a');Q.R(8,19+b,12,1.4,'#ffffff');
  ch2Arms(Q,f,'#f4f8ff','#fff0e8',b);
  if(back){Q.E(14,12+b,7.6,7,'#a0ffe0');Q.R(7,12+b,14,12,'#a0ffe0')}else{face(Q,b,bl,'#fff0e8','#5affd8',{big:1});Q.E(14,7.5+b,8,4,'#a0ffe0');Q.R(6.5,8+b,15,3,'#a0ffe0');Q.R(6.5,9+b,2,14,'#a0ffe0');Q.R(19.5,9+b,2,14,'#a0ffe0')}
  Q.E(14,1+b,6,1.3,'#ffe79a',.9);Q.E(14,1+b,4.4,.6,'#fff6d0')},
 /* 크로노스 · 시간 지배자: 등 뒤에 도는 톱니 · 실크해트 · 연미복 · 외눈 안경 */
 (Q,f,b,bl,t)=>{const v=V(),back=v==='back',B='#5a3a1a',Y='#ffd166';
  {const o=Q.o;const cx=14+6,cy=14+b+10;o.save();o.globalAlpha=.85;o.strokeStyle='#c8a040';o.lineWidth=1.6;o.beginPath();o.arc(cx,cy,11,0,TAU);o.stroke();for(let i=0;i<12;i++){const a=t*.8+i*TAU/12;o.fillStyle='#c8a040';o.fillRect(Math.round(cx+Math.cos(a)*12-1),Math.round(cy+Math.sin(a)*12-1),2,2)}o.strokeStyle='#ffe79a';o.lineWidth=1;o.beginPath();o.moveTo(cx,cy);o.lineTo(cx+Math.cos(t)*8,cy+Math.sin(t)*8);o.moveTo(cx,cy);o.lineTo(cx+Math.cos(t/12)*5,cy+Math.sin(t/12)*5);o.stroke();o.restore()}
  ch2Legs(Q,f,'#2a1a0a','#1a1008');Q.P([[8,19+b],[20,19+b],[21,30],[17,27+b],[11,27+b],[7,30]],B);Q.P([[11,19+b],[17,19+b],[16,26+b],[12,26+b]],'#f4ead0');Q.R(13.5,19+b,1,6,'#8a1a1a');for(const y of [21,23.5])Q.px(15.5,y+b,Y);
  Q.L(12,24+b,9,26+b,Y);Q.C(9,26.5+b,1.2,Y);ch2Arms(Q,f,B,'#ffe0c8',b);Q.R(18,24+b,3,2,'#c8a040');
  if(back){Q.E(14,12+b,7.6,7,'#e8d0a0')}else{face(Q,b,bl,'#ffe0c8','#8de4ff');Q.R(7,9+b,14,2.6,'#e8d0a0');if(!bl){const o=Q.o;o.save();o.strokeStyle=Y;o.lineWidth=1;o.beginPath();o.arc(6+17.5,10+15.5+b,2.4,0,TAU);o.stroke();o.restore();Q.L(19.5,17+b,20,22+b,Y,.7)}}
  Q.E(14,6+b,10,1.6,'#1a1008');Q.R(9,-5+b,10,11,'#1a1008');Q.R(9,2+b,10,1.6,'#8a1a1a');for(let i=0;i<2;i++){const a=t*2*(i?-1:1);Q.C(10+i*8,-2+b,1.8,'#c8a040');Q.C(10+i*8+Math.cos(a)*1.2,-2+b+Math.sin(a)*1.2,.5,'#1a1008')}},
 /* 이그니스 · 불꽃 황제: 타오르는 불꽃 머리 · 왕관 · 흰 털 깃 · 불붙은 손 */
 (Q,f,b,bl,t)=>{const v=V(),back=v==='back',R='#a01a0a';
  Q.P([[6,19+b],[22,19+b],[24,33],[4,33]],'#6a0a0a');ch2Legs(Q,f,'#3a0a0a','#1a0a0a');torso(Q,b,R,6,29);for(let i=0;i<3;i++)Q.C(14,21.5+i*2.2+b,.7,'#ffd84a');Q.R(13.5,19+b,1,9,'#ffd84a',.6);
  for(let i=0;i<7;i++)Q.C(7.5+i*2.2,19+b+(i%2)*.6,1.8,'#f4f4f4');for(let i=0;i<3;i++)Q.px(9+i*4,19+b,'#1a1a1a');
  ch2Arms(Q,f,R,'#ffe0c0',b);for(const x of [8.5,19.5])for(let i=0;i<3;i++){const fl=Math.sin(t*12+i+x)*1;Q.P([[x-1.5+i,27+b],[x-1+i+fl,23+b-i],[x+i,27+b]],i===1?'#ffe36b':'#ff6a1a',.9)}
  if(!back)face(Q,b,bl,'#f0c8a0','#ffe36b');else Q.E(14,12+b,7.6,7,'#ff6a1a');
  for(let i=0;i<7;i++){const fl=Math.sin(t*10+i*1.7)*1.4,hh=6+(i%3)*2+fl;Q.P([[6+i*2.4,9+b],[7.2+i*2.4+fl*.4,9+b-hh],[8.6+i*2.4,9+b]],i%2?'#ffb040':'#ff4d1a')}for(let i=0;i<5;i++)Q.P([[7+i*3,9+b],[8.5+i*3,5+b-(i%2)*2],[10+i*3,9+b]],'#ffe36b');
  Q.R(8,7.5+b,12,2,'#ffd84a');for(let i=0;i<3;i++)Q.P([[9+i*4,7.5+b],[10+i*4,4.5+b],[11+i*4,7.5+b]],'#ffd84a');Q.px(14,8+b,'#ff3a4a')},
 /* 실피드 · 바람 정령: 작은 요정 몸 · 나뭇잎 날개 네 장 · 떠다님 · 바람 리본 */
 (Q,f,b,bl,t)=>{const v=V(),back=v==='back',fl=Math.sin(t*3)*1.6-3,bb=b+fl,G='#5ad07a',wf=Math.sin(t*14)*.35;
  for(const s of (v==='side'?[1]:[-1,1]))for(let k=0;k<2;k++){const a=(k?-.4:-1.3)+wf*s,L=k?7:10;Q.P([[14+s*2,20+bb],[14+s*(2+Math.cos(a)*L),20+bb+Math.sin(a)*L-2],[14+s*(2+Math.cos(a+.5)*L*.8),20+bb+Math.sin(a+.5)*L*.8]],k?'#c8ffd8':'#7dffa8',.8);Q.L(14+s*2,20+bb,14+s*(2+Math.cos(a+.25)*L*.85),20+bb+Math.sin(a+.25)*L*.85-1,'#ffffff',.5)}
  for(let i=0;i<2;i++){const ph=t*2+i*3;for(let j=0;j<8;j++){const q=j/8;Q.px(14+Math.cos(ph+q*5)*(8+q*4),24+bb+Math.sin(ph+q*5)*3+q*4,i?'#ffffff':'#c8ffd8',(1-q)*.8)}}
  for(let i=0;i<5;i++){const w=Math.sin(t*4+i)*.8;Q.P([[10+i*1.8,25+bb],[11.8+i*1.8,25+bb],[11+i*1.8+w,31+bb-(i%2)*2]],i%2?G:'#3a9a5a')}
  torso(Q,bb+2,'#3a9a5a',4,25+bb+2);ch2Arms(Q,0,'#3a9a5a','#f0fff0',bb+2);
  if(back){Q.E(14,12+bb,7.6,7,'#7dffa8')}else{face(Q,bb,bl,'#f0fff0','#3a9a5a',{big:1,cheek:'#ffb0c8'});Q.E(14,7.5+bb,8,4,'#7dffa8');Q.R(6.5,8+bb,15,3,'#7dffa8');for(let i=0;i<4;i++)Q.P([[7+i*4,10.5+bb],[10+i*4,10.5+bb],[8.5+i*4,13+bb]],'#7dffa8')}
  for(const s of [-1,1])Q.P([[14+s*2,5+bb],[14+s*5,-1+bb],[14+s*4,5+bb]],'#3a9a5a')},
 /* 니드호그 · 독룡 사도: 구부정한 도마뱀 몸 · 가시 후드 · 굵은 꼬리 · 독 마스크 · 독 방울 */
 (Q,f,b,bl,t)=>{const v=V(),back=v==='back',G='#3a6a2a',sw=Math.sin(t*3)*1.5;
  Q.P([[15,25+b],[22,28],[28+sw,26],[30+sw,29],[24,31],[16,30]],'#2a5a1a');for(let i=0;i<4;i++)Q.P([[18+i*3,28-i*.5],[19+i*3,26-i*.5],[20+i*3,28-i*.5]],'#b0ff5a',.8);
  ch2Legs(Q,f,'#2a4a1a','#14240c');Q.P([[7,20+b],[20,19+b],[22,28],[8,28]],G);for(let r=0;r<3;r++)for(let i=0;i<4;i++)Q.E(9.5+i*3+(r%2),21.5+r*2+b,1.2,.8,'#4a8a3a');
  ch2Arms(Q,f,G,'#9ad07a',b+1);for(const x of [8.5,19.5])for(let i=0;i<3;i++)Q.R(x-1+i,27+b+1,.6,1.6,'#e8f4d0');
  Q.E(15,12+b,8,7.4,'#1e3a14');for(let i=0;i<5;i++)Q.P([[8+i*3,6+b],[9.5+i*3,0+b-(i%2)*1.5],[11+i*3,6+b]],'#5aa02a');
  if(!back){Q.E(15,13.5+b,6,5,'#9ad07a');Q.R(10,15+b,10,4,'#2a3a1a');for(let i=0;i<3;i++)Q.C(12+i*3,17+b,.7,'#b0ff5a');if(!bl)for(const s of [-1,1]){Q.R(15+s*2.6-(s<0?1:0),12+b,2,1.6,'#ffd84a');Q.px(15+s*2.6,12.5+b,'#1a1a1a')}}
  for(let i=0;i<2;i++){const q=(t*.9+i/2)%1;Q.C(12+i*6,20+b+q*12,.7,'#b0ff5a',1-q)}},
 /* 오딘 · 전쟁의 신: 날개 달린 뿔 투구 · 한쪽 안대 · 긴 흰 수염 · 어깨 위 까마귀 */
 (Q,f,b,bl,t)=>{const v=V(),back=v==='back',B='#2a3a6a';
  Q.P([[5,18+b],[23,18+b],[25,33],[3,33]],'#1e2a4a');ch2Legs(Q,f,'#1e2a3a','#5a4a2a');torso(Q,b,'#3a4a6a',7);Q.R(7,26+b,14,1.6,'#5a4a2a');Q.C(14,26.8+b,1.2,'#ffd84a');
  ch2Arms(Q,f,B,'#f0d0b0',b);for(const x of [6.5,21.5]){Q.E(x,19.4+b,3.4,2.4,'#8a8aa0');Q.R(x-3,18.6+b,6,.7,'#ffd84a')}
  if(back){Q.E(14,12+b,7.6,7,'#e8e8f0');Q.R(7,12+b,14,8,'#e8e8f0')}else{face(Q,b,bl,'#f0d0b0','#ffd84a',{noMouth:1});Q.R(9.5,13.6+b,3.6,3,'#1a1a24');Q.L(7,11+b,21,17+b,'#1a1a24');
   Q.P([[8,16+b],[20,16+b],[18,26+b],[14,29+b],[10,26+b]],'#f4f4f8');for(let i=0;i<4;i++)Q.L(10+i*2.5,18+b,11+i*2,26+b,'#c8c8d8',.6);Q.R(11,17+b,6,1.2,'#e8e8f0')}
  Q.E(14,8+b,8.4,4.6,'#a8a8b8');Q.R(5.6,8+b,16.8,3,'#a8a8b8');Q.R(5.6,10+b,16.8,1,'#ffd84a');for(const s of [-1,1]){Q.P([[14+s*8,7+b],[14+s*13,0+b],[14+s*12,6+b]],'#ffffff');Q.P([[14+s*8,9+b],[14+s*14,4+b],[14+s*12,9+b]],'#e8e8f0');Q.P([[14+s*5,4+b],[14+s*7,-3+b],[14+s*8,4+b]],'#f0e0c0')}
  {const rx=v==='side'?18:4,ry=16+b+Math.sin(t*3)*.4;Q.E(rx,ry,2.6,2,'#14141e');Q.C(rx+1.6,ry-1.6,1.4,'#14141e');Q.px(rx+2,ry-2,'#ffd84a');Q.P([[rx+2.6,ry-1.6],[rx+4.4,ry-1.2],[rx+2.6,ry-.8]],'#3a3a4a');Q.P([[rx-2,ry],[rx-4.4,ry+1+Math.sin(t*8)],[rx-1,ry+1.2]],'#24242e')}},
 /* 미스트 · 안개 암살자: 흩어지는 몸 · 길게 나부끼는 목도리 · 등에 X자 단검 */
 (Q,f,b,bl,t)=>{const v=V(),back=v==='back',K='#22222e';
  for(let i=0;i<9;i++){const q=i/8,w=Math.sin(t*4-i*.7)*2;Q.R(18+i*1.6,19+b+w*q,2,2.2-q,'#c8d0e0',1-q*.7)}
  if(!back)for(const s of [-1,1]){Q.L(14+s*7,15+b,14-s*5,29+b,'#8a9aaa');Q.L(14+s*7,14+b,14+s*8,13+b,'#c8d0ff')}
  {const o=Q.o;o.save();o.globalAlpha=.75;const sv=Q;ch2Legs(sv,f,'#16161e','#0e0e14');o.restore()}for(let i=0;i<5;i++){const q=(t*.6+i/5)%1;Q.C(8+i*3+Math.sin(t+i)*2,31-q*3,2.2,'#c8d0e0',.35*(1-q))}
  torso(Q,b,K,5);Q.R(9,22+b,10,1,'#3a3a4c');Q.R(9,26+b,10,1.2,'#8a9aaa');ch2Arms(Q,f,K,'#f0e0d8',b);
  Q.E(14,11.5+b,8,7.6,'#2a2a36');if(!back){Q.E(14,12.5+b,6.2,5.2,'#f0e0d8');Q.R(7.5,15+b,13,4.6,'#2a2a36');Q.R(7.5,15+b,13,.8,'#c8d0e0');if(!bl)for(const s of [-1,1]){Q.R(14+s*3-(s<0?1:0),12.5+b,2,1.6,'#c8d0ff');Q.px(14+s*3,12.5+b,'#ffffff')}}
  Q.R(7.5,18+b,13,2.6,'#c8d0e0');Q.R(7.5,18+b,13,.8,'#ffffff')},
 /* 가이아 · 대지의 거신: 넓적한 바위 몸 · 이끼 어깨 · 빛나는 갈라진 틈 · 수정 · 잎 왕관 */
 (Q,f,b,bl,t)=>{const v=V(),back=v==='back',S='#7a6a52',gl=.6+.4*Math.sin(t*3);
  const lw=[0,1,0,-1][f];for(const [x,dy] of [[8,lw],[17,-lw]]){Q.R(x,27+dy,4.6,5,'#5a4a36');Q.R(x-.6,31+dy,5.6,2.4,'#4a3a28');Q.R(x,29+dy,4.6,.8,'#7dff9a',gl*.6)}
  Q.P([[4,19+b],[24,19+b],[23,29],[5,29]],S);Q.R(4,19+b,20,1.6,sh(S,1.3));for(const [a,c,w2,h2] of [[8,21,1,5],[9,24,5,1],[17,20,1,4],[15,25,4,1],[20,23,1,4]])Q.R(a,c+b,w2,h2,'#7dff9a',gl);
  for(const [x,y,h2] of [[6,18,5],[22,17,6],[19,18,4]]){Q.P([[x-1.4,y+b],[x,y-h2+b],[x+1.4,y+b]],'#8de4ff');Q.P([[x-.4,y+b-.5],[x,y-h2+1.5+b],[x+.6,y+b-.5]],'#ffffff',.7)}
  for(const s of [-1,1]){const ax=s<0?1:22;const sw=[0,-1,0,1][f]*s;Q.R(ax,20+b+sw,5,7,'#6a5a42');Q.R(ax-.5,26+b+sw,6,3,'#5a4a36');Q.R(ax,20+b+sw,5,1.4,'#5aa02a')}
  Q.E(4,19+b,4,2.4,'#5aa02a');Q.E(24,19+b,4,2.4,'#5aa02a');
  Q.R(9,7+b,10,12,S);Q.R(9,7+b,10,1.4,sh(S,1.3));if(!back&&!bl)for(const s of [-1,1]){Q.R(14+s*2.5-(s<0?1.5:0),11+b,1.8,1.4,'#7dff9a');Q.C(14+s*2.5-(s<0?.6:-.9),11.7+b,1.6,'#7dff9a',.3)}if(!back)Q.R(12,15+b,4,.8,'#3a2a1a');
  for(let i=0;i<5;i++)Q.P([[8+i*2.6,7+b],[9+i*2.6,3+b-(i%2)*1.6],[10.4+i*2.6,7+b]],i%2?'#7dff9a':'#3a9a3a')},
 /* 아스트라 · 은하의 마녀: 몸보다 넓은 은하 모자 · 성운 드레스 · 도는 작은 행성 둘 */
 (Q,f,b,bl,t)=>{const v=V(),back=v==='back',C1='#1a1450',PK='#ff9af0';
  for(let i=0;i<2;i++){const a=t*(i?1.3:.9)+i*3,x=14+Math.cos(a)*13,y=17+b+Math.sin(a)*5;if(Math.sin(a)<0){Q.C(x,y,i?1.6:2.2,i?'#ffb040':'#5ad0ff');Q.R(x-3,y,6,.6,'#ffe79a',.6)}}
  Q.P([[8,20+b],[20,20+b],[24,33],[4,33]],C1);for(let i=0;i<10;i++){const tw=.5+.5*Math.sin(t*4+i*1.7);Q.px(6+((i*41)%16),22+((i*17)%10),i%3?'#ffffff':PK,tw)}Q.E(12,28,5,2,'#6a3aff',.35);Q.E(17,25,4,1.6,PK,.25);Q.R(4,32,20,1,'#ffe36b');
  torso(Q,b,'#2a1a6a',5,24);ch2Arms(Q,f,'#2a1a6a','#fff0f8',b);
  if(back){Q.E(14,12+b,7.6,7,PK);Q.R(7,12+b,14,14,PK)}else{face(Q,b,bl,'#fff0f8','#ffe36b',{big:1,cheek:'#ffb0d8'});Q.R(6.5,9+b,2,15,PK);Q.R(19.5,9+b,2,15,PK);Q.R(8,8+b,12,2.4,PK)}
  Q.E(14,7+b,15,2.6,'#0e0a30');Q.E(14,6.6+b,13,1.6,'#2a1a6a');Q.P([[7,7+b],[21,7+b],[18+Math.sin(t*1.5)*2,-9+b],[14,-6+b]],'#1a1450');Q.R(8,4.6+b,12,1.8,'#ffe36b');
  for(let i=0;i<5;i++){const tw=.5+.5*Math.sin(t*5+i*2);Q.px(10+i*2,0+b-(i%2)*2,i%2?'#ffffff':'#ffe36b',tw)}
  for(let i=0;i<2;i++){const a=t*(i?1.3:.9)+i*3,x=14+Math.cos(a)*13,y=17+b+Math.sin(a)*5;if(Math.sin(a)>=0){Q.C(x,y,i?1.6:2.2,i?'#ffb040':'#5ad0ff');Q.R(x-3,y,6,.6,'#ffe79a',.7)}}}];
 P.forEach((fn,i)=>{const idx=M.C0+i;if(CH2DEF[idx])CH2DEF[idx]={__v44:1,paint:fn}});

 /* ================= ② 변이 스킨 옷 ================= */
 const COS={
  v_haru:(Q,b,t,v)=>{/* 은하: 별자리 망토 + 별 머리띠 */if(v!=='back'){Q.P([[6,18+b],[22,18+b],[24,32],[4,32]],'#1a1450',.85)}Q.R(7,6+b,14,1.6,'#ffe36b');Q.P([[12,6+b],[14,1+b],[16,6+b]],'#ffe36b');for(let i=0;i<4;i++)Q.px(7+i*5,24+i%2*3+b,'#ffffff',.5+.5*Math.sin(t*4+i))},
  v_mina:(Q,b,t,v)=>{/* 벚꽃: 여우 가면(옆머리) + 꽃 비녀 + 기모노 소매 */for(const x of [5.5,20.5])Q.R(x,19+b,3,7,'#ffd0e4');if(v!=='back'){Q.P([[17,7+b],[22,5+b],[21,11+b]],'#ffffff');Q.px(19.5,7+b,'#ff4d6d')}Q.C(8,8+b,1.8,'#ff9ac8');Q.C(8,8+b,.8,'#fff6a0');Q.R(8,26+b,12,1.4,'#ff4d6d')},
  v_doyun:(Q,b,t,v)=>{/* 용암: 마그마 갑옷 어깨 + 녹는 곡괭이 */for(const s of [-1,1]){Q.E(14+s*7.5,19.5+b,3,2.2,'#3a1a10');Q.R(14+s*7.5-1,19+b,2,1,'#ff6a1a',.6+.4*Math.sin(t*4))}if(v!=='back'){Q.L(22,10+b,22,26+b,'#5a3a2a');Q.P([[19,10+b],[26,9+b],[24,12+b]],'#ff6a1a')}},
  v_sera:(Q,b,t,v)=>{/* 서리: 얼음 왕관 + 털 망토 */for(let i=0;i<5;i++)Q.P([[8+i*2.8,4+b],[9.4+i*2.8,-1+b-(i===2?2:0)],[10.8+i*2.8,4+b]],'#bfe8ff');Q.P([[5,18+b],[23,18+b],[22,21+b],[6,21+b]],'#ffffff');for(let i=0;i<5;i++)Q.px(7+i*3.5,19.5+b,'#9ad8f8')},
  v_steel:(Q,b,t,v)=>{/* 황금 코어: 등에 반응로 + 황금 어깨포 */for(const s of [-1,1]){Q.R(14+s*8-2,16+b,4,4,'#c8961a');Q.R(14+s*8-1,13+b,2,3,'#ffd84a')}Q.C(14,22+b,2.2,'#ffd84a',.8);Q.C(14,22+b,1,'#ffffff')},
  v_luna:(Q,b,t,v)=>{/* 일식: 검은 해 후광 + 반쪽 가면 */Q.C(14,10+b,10,'#ffb040',.25);Q.C(14,10+b,8.6,'#0a0a10',.0);if(v!=='back'){Q.R(14,12+b,7,6,'#14141e',.85);Q.px(17,14+b,'#ffb040')}Q.R(6,18+b,16,1.4,'#ffb040')},
  v_kai:(Q,b,t,v)=>{/* 그림자 혼: 찢어진 그림자 목도리 + 귀신불 */for(let i=0;i<6;i++){const w=Math.sin(t*5-i*.8)*1.5;Q.R(17+i*1.8,18+b+w*i/6,2,2,'#2a1a40',1-i*.12)}Q.R(8,17+b,12,2.6,'#2a1a40');for(let i=0;i<2;i++){const a=t*2+i*3;Q.C(14+Math.cos(a)*12,14+b+Math.sin(a)*3,1.4,'#b48aff',.8)}},
  v_arin:(Q,b,t,v)=>{/* 독버섯 요정: 큰 버섯 갓 + 날개 */Q.E(14,5+b,11,4.4,'#c8324a');Q.R(3,5+b,22,2,'#8a1a2a');for(const [x,y] of [[9,3],[15,2],[19,5],[6,6]])Q.C(x,y+b,1.1,'#ffffff');if(v!=='back')for(const s of [-1,1])Q.P([[14+s*4,20+b],[14+s*11,14+b+Math.sin(t*10)],[14+s*9,24+b]],'#c8ffd8',.45)},
  v_zeno:(Q,b,t,v)=>{/* 청염 용기사: 푸른 불꽃 갈기 투구 장식 + 용 날개 */for(let i=0;i<5;i++){const fl=Math.sin(t*10+i)*1.2;Q.P([[9+i*2.4,4+b],[10+i*2.4+fl*.4,-3+b-(i%2)*2],[11.4+i*2.4,4+b]],i%2?'#8ad8ff':'#4ab0ff')}if(v!=='back')for(const s of [-1,1])Q.P([[14+s*5,19+b],[14+s*14,10+b],[14+s*11,23+b]],'#1e4a8a',.85)},
  v_aurora:(Q,b,t,v)=>{/* 무지개 성기사: 프리즘 날개 + 무지개 깃털 투구 */const C=['#ff6a8a','#ffb040','#ffe36b','#7dff9a','#8de4ff','#b48aff'];if(v!=='back')for(const s of [-1,1])C.forEach((c,i)=>Q.P([[14+s*4,20+b],[14+s*(9+i*1.2),9+b+i*1.6],[14+s*(8+i),12+b+i*1.6]],c,.75));for(let i=0;i<6;i++)Q.R(9+i*1.6,0+b,1.4,4,C[i])}};
 /* v82 새 캐릭터 15명의 변이(테마 순서: 은하 벚꽃 용암 서리 황금 핏빛 유령 독 청염 무지개 밤하늘 석양 심해 …) */
 const COS2={
  v_rio:(Q,b,t,v)=>{Q.P([[5,18+b],[23,18+b],[24,30],[4,30]],'#1a1450',.8);for(let i=0;i<5;i++)Q.px(6+i*4,22+(i%2)*4+b,'#ffffff',.6+.4*Math.sin(t*4+i));Q.P([[18,3+b],[25,-3+b],[22,4+b]],'#ffe36b')},
  v_hana:(Q,b,t,v)=>{Q.C(14,3+b,3,'#ff9ac8');for(let i=0;i<5;i++){const a=i*TAU/5+t*.5;Q.C(14+Math.cos(a)*3,3+b+Math.sin(a)*2,1.6,'#ffc8e0')}Q.C(14,3+b,1,'#fff6a0');Q.R(7,26+b,14,1.6,'#ff9ac8')},
  v_gaon:(Q,b,t,v)=>{for(const s of [-1,1]){Q.E(14+s*7.6,19+b,3.4,2.4,'#2a1408');Q.R(14+s*7.6-1.5,18.4+b,3,1,'#ff6a1a',.7)}Q.R(6,26+b,16,1.6,'#ff6a1a',.6+.4*Math.sin(t*5));if(v!=='back'){Q.R(21,12+b,2,14,'#3a2a1a');Q.R(19,10+b,6,4,'#ff6a1a')}},
  v_sora:(Q,b,t,v)=>{Q.P([[4,18+b],[24,18+b],[26,32],[2,32]],'#bfe8ff',.55);Q.P([[3.5,7.5+b],[24.5,7.5+b],[19,0+b],[9,0+b]],'#e8f8ff');Q.R(5,6.5+b,18,1,'#6ab8ff')},
  v_yuki:(Q,b,t,v)=>{Q.R(7,5+b,14,2,'#ffd84a');for(let i=0;i<4;i++)Q.P([[7+i*4,5+b],[9+i*4,0+b],[11+i*4,5+b]],'#ffd84a');Q.px(14,4+b,'#ff3a4a');Q.R(5,26+b,18,1.6,'#ffd84a')},
  v_dark:(Q,b,t,v)=>{if(v!=='back')for(const s of [-1,1])Q.P([[14+s*4,18+b],[14+s*14,8+b],[14+s*12,14+b],[14+s*15,18+b],[14+s*11,22+b]],'#2a0a14',.95);Q.R(7,16+b,14,3,'#5a0a1a');Q.P([[6,16+b],[9,11+b],[9,16+b]],'#5a0a1a');Q.P([[22,16+b],[19,11+b],[19,16+b]],'#5a0a1a')},
  v_volt:(Q,b,t,v)=>{Q.P([[6,10+b],[22,10+b],[24,34],[4,34]],'#5affd8',.18);Q.C(14,10+b,9,'#5affd8',.15);for(let i=0;i<3;i++){const q=(t*.6+i/3)%1;Q.C(6+i*8,30-q*24,1.4,'#5affd8',.7*(1-q))}},
  v_momo:(Q,b,t,v)=>{Q.R(8,15+b,12,4,'#3a4a2a');for(const s of [-1,1])Q.C(14+s*3,17+b,1.6,'#b6ff4a',.8);Q.P([[13,19+b],[15,19+b],[14,23+b]],'#3a4a2a');for(let i=0;i<4;i++){const q=(t*.5+i/4)%1;Q.C(5+i*6,30-q*20,1,'#b6ff4a',.6*(1-q))}},
  v_leo:(Q,b,t,v)=>{for(let i=0;i<8;i++){const a=-Math.PI+i*Math.PI/7,fl=Math.sin(t*9+i)*1;Q.P([[14+Math.cos(a)*7,11+b+Math.sin(a)*6],[14+Math.cos(a)*(12+fl),11+b+Math.sin(a)*(11+fl)],[14+Math.cos(a+.25)*7,11+b+Math.sin(a+.25)*6]],i%2?'#4ab0ff':'#8ad8ff',.85)}},
  v_mir:(Q,b,t,v)=>{const C=['#ff6a8a','#ffb040','#ffe36b','#7dff9a','#8de4ff','#b48aff'];C.forEach((c,i)=>Q.R(4+i*3.4,31,3.4,1.4,c));if(v!=='back')C.forEach((c,i)=>Q.R(22+Math.sin(t*3+i)*.6,8+i*2+b,4,1.8,c,.85))},
  v_silvy:(Q,b,t,v)=>{Q.E(14,6+b,10,2,'#1a1a4a');Q.P([[8,6+b],[20,6+b],[16+Math.sin(t*2)*1.5,-6+b]],'#2a2a6a');for(let i=0;i<3;i++)Q.px(11+i*3,2-i+b,'#ffe36b',.6+.4*Math.sin(t*5+i));Q.R(5,18+b,18,2,'#4a5aff')},
  v_terra:(Q,b,t,v)=>{Q.E(14,6+b,11.6,2.2,'#a0522d');Q.R(8,0+b,12,6.4,'#c8723a');Q.R(8,4+b,12,1.4,'#5a2a1a');Q.P([[5,19+b],[23,19+b],[20,29],[8,29]],'#ffa060',.75);for(let i=0;i<5;i++)Q.R(6+i*3.6,27,2,2,i%2?'#ff4d6d':'#ffe36b')},
  v_nova:(Q,b,t,v)=>{Q.C(14,11+b,10,'#bff8ff',.35);Q.C(14,11+b,10,'#ffffff',.08);Q.R(4,10+b,1,4,'#8ad8ff');Q.R(23,10+b,1,4,'#8ad8ff');for(let i=0;i<4;i++){const q=(t*.7+i/4)%1;Q.C(6+i*5,24-q*26,.9,'#bff8ff',.8*(1-q))}},
  v_kage:(Q,b,t,v)=>{for(let i=0;i<6;i++){const w=Math.sin(t*6-i*.7)*1.8;Q.R(17+i*1.9,17+b+w*i/6,2,2.4,'#ff4d6d',1-i*.12)}Q.R(7,16+b,14,2.6,'#ff4d6d');if(v!=='back')Q.R(7.5,15+b,13,4,'#8a0a1a',.85)},
  v_serena:(Q,b,t,v)=>{if(v!=='back')for(const s of [-1,1])for(let i=0;i<3;i++)Q.P([[14+s*4,20+b],[14+s*(12+i*2),8+b+i*4],[14+s*(10+i),14+b+i*4]],i===1?'#ffe79a':'#ffffff',.9);Q.E(14,0+b,6,1.2,'#ffd84a');Q.E(14,0+b,4,.5,'#fff6d0')}};
 Object.assign(COS,COS2);
 function hook(){if(!window.SKIN58)return;for(const s of SKIN58.list){const fn=COS[s.id];if(!fn||s.idx==null||!CH2DEF[s.idx]||CH2DEF[s.idx].__c102)continue;const D=CH2DEF[s.idx],p0=D.paint;
   D.paint=function(Q,f,b,bl,t){const r=p0.apply(this,arguments);try{fn(Q,b,t,V())}catch(e){}return r};D.__c102=1;
   const d0=s.desc||'';if(d0.indexOf('◆ 전용 옷')<0)s.desc=d0+' ◆ 전용 옷 · 장비가 따로 있어요.'}}
 hook();setTimeout(hook,1500);

 /* ================= ③ 변이 펫 장식 ================= */
 const PA={
  p_tick:(c,x,y,k,t)=>crown(c,x,y-10*k,k,'#ffd84a'),
  p_firefly:(c,x,y,k,t)=>halo(c,x,y-11*k,k,'#7dffa8'),
  p_mouse:(c,x,y,k,t)=>visor(c,x,y-4*k,k,'#ff4dd8'),
  p_sheep:(c,x,y,k,t)=>cloud(c,x,y-12*k,k,t),
  p_owl:(c,x,y,k,t)=>orbit(c,x,y,k,t,'#c8b8ff',3),
  p_fox:(c,x,y,k,t)=>tails(c,x,y,k,t,'#4ab0ff'),
  p_penguin:(c,x,y,k,t)=>flower(c,x,y-9*k,k,'#ff9ac8'),
  p_dragon:(c,x,y,k,t)=>horns(c,x,y-8*k,k,'#2a1a3a'),
  p_cat:(c,x,y,k,t)=>wisp(c,x,y,k,t,'#5affd8'),
  p_phoenix:(c,x,y,k,t)=>wings(c,x,y,k,t,'#bfe8ff'),
  p_turtle:(c,x,y,k,t)=>flower(c,x,y-8*k,k,'#ffe36b'),p_squirrel:(c,x,y,k,t)=>scarf(c,x,y+1*k,k,t,'#ff4d6d'),p_golem:(c,x,y,k,t)=>crown(c,x,y-11*k,k,'#8de4ff'),
  p_bee:(c,x,y,k,t)=>halo(c,x,y-10*k,k,'#ffd84a'),p_lizard:(c,x,y,k,t)=>horns(c,x,y-7*k,k,'#ffb040'),p_snowfairy:(c,x,y,k,t)=>orbit(c,x,y,k,t,'#ffffff',4),
  p_batcookie:(c,x,y,k,t)=>wings(c,x,y,k,t,'#5a0a1a'),p_clockowl:(c,x,y,k,t)=>monocle(c,x,y-3*k,k),p_luckycat:(c,x,y,k,t)=>coin(c,x,y-12*k,k,t),
  p_drone:(c,x,y,k,t)=>visor(c,x,y-3*k,k,'#5affd8'),p_jelly:(c,x,y,k,t)=>bubble(c,x,y,k,t),p_hawk:(c,x,y,k,t)=>scarf(c,x,y+1*k,k,t,'#ffa060'),
  p_viper:(c,x,y,k,t)=>crown(c,x,y-9*k,k,'#b6ff4a'),p_whale:(c,x,y,k,t)=>bubble(c,x,y,k,t),p_skydragon:(c,x,y,k,t)=>wings(c,x,y,k,t,'#ffe79a')};
 const RR=(c,x,y,w,h,col,a)=>{c.globalAlpha=a==null?1:a;c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)));c.globalAlpha=1};
 function crown(c,x,y,k,col){RR(c,x-4*k,y,8*k,2*k,col);for(let i=0;i<3;i++)RR(c,x-4*k+i*3*k,y-2.4*k,2*k,2.4*k,col);RR(c,x-.6*k,y+.4*k,1.2*k,1.2*k,'#ff3a4a')}
 function halo(c,x,y,k,col){c.save();c.globalAlpha=.9;c.strokeStyle=col;c.lineWidth=1.2*k;c.beginPath();c.ellipse(x,y,5*k,1.5*k,0,0,TAU);c.stroke();c.restore()}
 function visor(c,x,y,k,col){RR(c,x-5*k,y-1*k,10*k,2.2*k,'#14141e');RR(c,x-4.4*k,y-.6*k,8.8*k,1.2*k,col,.9)}
 function cloud(c,x,y,k,t){for(const [dx,r] of [[-3,2.4],[0,3],[3,2.4]]){c.globalAlpha=.9;c.fillStyle='#5a6a8a';c.beginPath();c.arc(x+dx*k,y,r*k,0,TAU);c.fill()}c.globalAlpha=1;if(Math.floor(t*6)%3===0)RR(c,x,y+2*k,1*k,4*k,'#fff6a0')}
 function orbit(c,x,y,k,t,col,n){for(let i=0;i<n;i++){const a=t*2+i*TAU/n;RR(c,x+Math.cos(a)*11*k-k,y-2*k+Math.sin(a)*4*k-k,2*k,2*k,col,.9)}}
 function tails(c,x,y,k,t,col){for(let i=0;i<5;i++){const a=Math.PI*.6+i*.28+Math.sin(t*3+i)*.08;c.globalAlpha=.75;c.fillStyle=i%2?col:'#c8f4ff';c.beginPath();c.ellipse(x-Math.cos(a)*9*k,y+3*k-Math.sin(a)*7*k,2*k,4.4*k,a,0,TAU);c.fill()}c.globalAlpha=1}
 function flower(c,x,y,k,col){for(let i=0;i<5;i++){const a=i*TAU/5;c.fillStyle=col;c.beginPath();c.arc(x+3*k+Math.cos(a)*1.6*k,y+Math.sin(a)*1.6*k,1.3*k,0,TAU);c.fill()}RR(c,x+2.4*k,y-.6*k,1.2*k,1.2*k,'#fff6a0')}
 function horns(c,x,y,k,col){for(const s of [-1,1]){c.fillStyle=col;c.beginPath();c.moveTo(x+s*2*k,y+2*k);c.lineTo(x+s*5*k,y-4*k);c.lineTo(x+s*4*k,y+2*k);c.fill()}}
 function wisp(c,x,y,k,t,col){for(let i=0;i<3;i++){const a=t*2.4+i*TAU/3;c.globalAlpha=.8;c.fillStyle=col;c.beginPath();c.arc(x+Math.cos(a)*11*k,y-3*k+Math.sin(a)*4*k,1.7*k,0,TAU);c.fill()}c.globalAlpha=1}
 function wings(c,x,y,k,t,col){const fl=Math.sin(t*8)*1.6*k;for(const s of [-1,1]){c.globalAlpha=.85;c.fillStyle=col;c.beginPath();c.moveTo(x+s*3*k,y-2*k);c.lineTo(x+s*13*k,y-9*k+fl);c.lineTo(x+s*11*k,y+1*k);c.closePath();c.fill()}c.globalAlpha=1}
 function scarf(c,x,y,k,t,col){RR(c,x-5*k,y-1*k,10*k,2*k,col);for(let i=0;i<4;i++)RR(c,x-6*k-i*1.6*k,y+Math.sin(t*6-i)*k,2*k,1.6*k,col,1-i*.2)}
 function monocle(c,x,y,k){c.save();c.strokeStyle='#ffd84a';c.lineWidth=k;c.beginPath();c.arc(x+3*k,y,2.4*k,0,TAU);c.stroke();c.restore();RR(c,x+3*k,y+2.4*k,.6*k,5*k,'#ffd84a',.7)}
 function coin(c,x,y,k,t){const w=Math.abs(Math.cos(t*3))*3*k+.6*k;c.fillStyle='#ffd84a';c.beginPath();c.ellipse(x,y,w,3*k,0,0,TAU);c.fill();RR(c,x-.4*k,y-1.4*k,.8*k,2.8*k,'#b8861a')}
 function bubble(c,x,y,k,t){c.save();c.globalAlpha=.35;c.strokeStyle='#bff8ff';c.lineWidth=1*k;c.beginPath();c.arc(x,y,11*k,0,TAU);c.stroke();c.globalAlpha=.6;c.fillStyle='#ffffff';c.fillRect(Math.round(x-6*k),Math.round(y-7*k),Math.ceil(2*k),Math.ceil(1*k));c.restore()}
 if(window.PET59){const od=PET59.draw;PET59.draw=(c,id,x,y,now,k)=>{k=k||1;const t=now/1000,fn=PA[id];const back=fn&&(fn===PA.p_phoenix||/wings|tails/.test(String(fn)));
   if(fn&&back){try{c.save();fn(c,x,y+Math.sin(now/260)*1.3*k,k,t);c.restore()}catch(e){}}const r=od(c,id,x,y,now,k);if(fn&&!back){try{c.save();fn(c,x,y+Math.sin(now/260)*1.3*k,k,t);c.restore()}catch(e){}}return r};
  for(const v of PET59.list){if(PA[v.id]&&(v.desc||'').indexOf('◆ 전용 장식')<0)v.desc=(v.desc||'')+' ◆ 전용 장식이 따로 있어요.'}}
 /* ================= ④ 새 캐릭터 15 · 새 펫 15 스킨 (현질 · 다이아) =================
    색만 바꾸지 않고 스킨마다 전용 장비(투구 · 날개 · 가면 · 장식)를 따로 그림. 번호: 캐릭터 skin_v_<id>(SKIN58 160~), 펫 pet_p_<id>. 서버 SHOP_PRODUCTS에도 같은 번호. */
 const RC=window.RECOLOR59;
 const hueMap=(H,sat,lit)=>(h,s,l)=>s>.18?[H+((h%40)-20)*.4,Math.max(sat||.5,s),l*(lit||1)]:l>.88?null:[H,.22,l*(lit||.9)];
 const NCS=[
  ['arteon','흑기사',270,'#8a5aff',hueMap(270,.45,.75),(Q,b,t,v)=>{Q.E(14,11+b,8,7.6,'#1a1424');Q.R(6,11+b,16,6,'#1a1424');if(v!=='back'){Q.R(8,13+b,12,1.4,'#b48aff');Q.R(8,13+b,12,1.4,'#ffffff',.3+.3*Math.sin(t*5))}Q.P([[5,18+b],[23,18+b],[26,34],[2,34]],'#3a1a5a',.85)},'흑철 투구 · 보라 망토'],
  ['lunaria','태양 무희',40,'#ffb040',hueMap(40,.6,1),(Q,b,t,v)=>{for(let i=0;i<12;i++){const a=i*TAU/12+t*.3;Q.P([[14+Math.cos(a)*7,8+b+Math.sin(a)*7],[14+Math.cos(a+.13)*12,8+b+Math.sin(a+.13)*12],[14+Math.cos(a+.26)*7,8+b+Math.sin(a+.26)*7]],'#ffd84a',.55)}for(let i=0;i<4;i++){const w=Math.sin(t*4+i)*2;Q.R(5+i*5+w,29,2,4,'#ff6a1a',.8)}},'태양 후광 · 불꽃 치맛단'],
  ['kaiser','빙결 군주',200,'#8ad8ff',hueMap(200,.5,1.05),(Q,b,t,v)=>{for(const s of [-1,1])Q.P([[14+s*6,7+b],[14+s*12,-3+b],[14+s*9,6+b]],'#e0f8ff');for(let i=0;i<6;i++)Q.P([[5+i*3.4,30],[6.7+i*3.4,34+(i%2)*2],[8.4+i*3.4,30]],'#bfe8ff',.85)},'얼음 뿔 · 고드름 망토'],
  ['selene','숲의 사냥꾼',110,'#7dff9a',hueMap(110,.45,.95),(Q,b,t,v)=>{for(const s of [-1,1]){Q.L(14+s*4,5+b,14+s*8,-2+b,'#8a6a3a');Q.L(14+s*7,1+b,14+s*10,0+b,'#8a6a3a')}for(let i=0;i<5;i++)Q.P([[6+i*3.6,24+b],[8+i*3.6,26+b],[7+i*3.6,29+b]],'#5ad07a',.85)},'사슴뿔 후드 · 잎 망토'],
  ['bahamut','백룡',45,'#ffe79a',(h,s,l)=>s>.18?[45,.35,Math.min(.95,l*1.25)]:null,(Q,b,t,v)=>{Q.E(14,-2+b,6,1.4,'#ffd84a',.9);Q.E(14,-2+b,4.4,.6,'#fff6d0');for(let i=0;i<4;i++){const q=(t*.6+i/4)%1;Q.px(4+i*7,30-q*20,'#fff6d0',1-q)}},'흰 비늘 · 황금 후광'],
  ['erebos','핏빛 망령',355,'#ff4d6d',hueMap(355,.55,.85),(Q,b,t,v)=>{for(let i=0;i<6;i++)Q.C(5+i*3.6,24+b+Math.sin(t*2+i)*1.4,1,'#8a8a9a');Q.L(4,24+b,25,24+b,'#8a8a9a',.6);Q.C(14,3+b,1.4,'#ff2a3a',.6+.4*Math.sin(t*4))},'붉은 연기 · 사슬'],
  ['auroras','타락 성녀',280,'#b48aff',hueMap(280,.4,.7),(Q,b,t,v)=>{if(v!=='back')for(const s of [-1,1])for(let i=0;i<3;i++)Q.P([[14+s*4,19+b],[14+s*(13+i*2),6+b+i*4],[14+s*(10+i),14+b+i*4]],'#1a1020',.9);Q.E(14,1+b,6,1.3,'#5a3a6a');Q.R(16,0+b,3,2,'#05070a')},'검은 날개 · 깨진 후광'],
  ['chronos','증기 기관사',25,'#ffa060',hueMap(25,.5,.95),(Q,b,t,v)=>{Q.R(20,10+b,2.4,10,'#8a5a2a');Q.R(19.6,9+b,3.2,1.4,'#c8a040');for(let i=0;i<3;i++){const q=(t*.8+i/3)%1;Q.C(21+q*2,8+b-q*8,1.2+q*1.5,'#e8e8f0',(1-q)*.7)}},'등 증기 파이프'],
  ['ignis','청염 황제',210,'#4ab0ff',hueMap(210,.65,1.05),(Q,b,t,v)=>{for(let i=0;i<3;i++){const q=(t*1.4+i/3)%1;Q.C(6+i*8,28-q*10,1.2*(1-q)+.4,'#8ad8ff',1-q)}},'푸른 불꽃'],
  ['sylph','벚꽃 요정',330,'#ffb0d4',hueMap(330,.45,1.08),(Q,b,t,v)=>{for(let i=0;i<5;i++){const a=i*TAU/5;Q.C(14+Math.cos(a)*5,5+b+Math.sin(a)*1.6,1.4,'#ffc8e0')}for(let i=0;i<4;i++){const q=(t*.4+i/4)%1;Q.R(4+i*6+Math.sin(t+i)*2,q*34,1.6,1,'#ffc8e0',1-q)}},'꽃 화관 · 꽃잎'],
  ['nidhogg','황금 비룡',45,'#ffd84a',hueMap(45,.6,1.05),(Q,b,t,v)=>{Q.R(8,4+b,14,2,'#ffd84a');for(let i=0;i<4;i++)Q.P([[8+i*4,4+b],[10+i*4,0+b],[12+i*4,4+b]],'#ffd84a');if(v!=='back')for(const s of [-1,1])Q.P([[14+s*4,20+b],[14+s*12,12+b],[14+s*10,24+b]],'#c89a20',.85)},'황금 왕관 · 비룡 날개'],
  ['odin','서리 거인왕',195,'#bfe8ff',hueMap(195,.4,1.08),(Q,b,t,v)=>{for(let i=0;i<5;i++)Q.P([[9+i*2.4,27+b],[10+i*2.4,31+b+(i%2)*2],[11+i*2.4,27+b]],'#e0f8ff');for(let i=0;i<3;i++){const q=(t*.5+i/3)%1;Q.px(5+i*8,q*30,'#ffffff',1-q)}},'얼음 수염 · 눈보라'],
  ['mist','붉은 그림자',355,'#ff4d6d',hueMap(355,.6,.9),(Q,b,t,v)=>{if(v!=='back'){Q.R(8,13+b,12,5,'#c8202a');for(const s of [-1,1])Q.P([[14+s*4,13+b],[14+s*6,9+b],[14+s*5,13+b]],'#ffd84a');Q.R(10,15+b,8,1,'#05070a')}},'오니 가면'],
  ['gaia','화산 거신',15,'#ff6a1a',(h,s,l)=>[18,.35,l*.55],(Q,b,t,v)=>{const gl=.6+.4*Math.sin(t*4);for(const [a,c,w2,h2] of [[8,21,1,5],[9,24,5,1],[17,20,1,4],[15,25,4,1],[20,23,1,4]])Q.R(a,c+b,w2,h2,'#ff6a1a',gl);for(let i=0;i<3;i++){const q=(t*.7+i/3)%1;Q.C(8+i*6,4+b-q*8,1+q,'#5a5a5a',(1-q)*.6)}},'흑요석 몸 · 용암 틈'],
  ['astra','태양 마녀',35,'#ffb040',hueMap(35,.6,1),(Q,b,t,v)=>{Q.C(14,-4+b,3.4,'#ffd84a');for(let i=0;i<8;i++){const a=i*TAU/8+t;Q.R(14+Math.cos(a)*5-.5,-4+b+Math.sin(a)*5-.5,1,1,'#ffe36b')}},'모자 위 작은 태양']];
 const NV=[];
 if(window.SKIN58&&RC){NCS.forEach(([id,tn,H,col,map,cos,tag],i)=>{const base=M.C0+i,idx=160+i,vid='v_'+id,nm=CHARS[base]&&CHARS[base].name||'';
   CH2DEF[idx]={__v44:1,skin:vid,__c102:1,paint(Q,f,b,bl,t){CH2DEF[base].paint.call(CH2DEF[base],Q,f,b,bl,t);try{RC(Q.o.canvas,map,true)}catch(e){}try{cos(Q,b,t,V())}catch(e){}}};
   const it={id:vid,name:nm+' · '+tn,en:id.toUpperCase()+' · '+tn,price:2500,tier:'변이',tc:'#ffd166',col,idx,base,map,desc:nm+'의 「'+tn+'」 스킨. '+tag+' 전용 장비를 따로 그렸어요. 능력은 원래 캐릭터 그대로.',tags:[tag,'전용 장비','능력은 원래 그대로'],trail:col,variant:true,v102:1};
   SKIN58.list.push(it);NV.push(it)})}
 /* 펫 스킨 */
 const NPS=[['phx','얼음 불사조',195,'#bfe8ff',PA.p_phoenix],['gdragon','태양 용',40,'#ffd84a',(c,x,y,k,t)=>halo(c,x,y-12*k,k,'#ffd84a')],['owlking','흑요석 부엉이왕',270,'#b48aff',(c,x,y,k,t)=>crown(c,x,y-12*k,k,'#b48aff')],
  ['swolf','설원 늑대',200,'#e8f8ff',(c,x,y,k,t)=>scarf(c,x+2*k,y,k,t,'#4a8aff')],['qilin','진홍 기린',350,'#ff6a8a',(c,x,y,k,t)=>horns(c,x+2*k,y-9*k,k,'#ffd84a')],['cturtle','황금 거북왕',45,'#ffd84a',(c,x,y,k,t)=>crown(c,x+5*k,y-6*k,k,'#ffd84a')],
  ['sfox','달빛 구미호',230,'#c8d8ff',(c,x,y,k,t)=>tails(c,x,y,k,t,'#c8d8ff')],['lgolem','이끼 골렘',110,'#7dff9a',(c,x,y,k,t)=>flower(c,x-3*k,y-11*k,k,'#ffb0d4')],['frost','불꽃 정령',15,'#ff8a3a',(c,x,y,k,t)=>orbit(c,x,y,k,t,'#ffb040',4)],
  ['gold','흑룡',275,'#6a3aff',(c,x,y,k,t)=>wings(c,x,y,k,t,'#2a1a4a')],['crow','흰 까마귀',190,'#ffffff',(c,x,y,k,t)=>halo(c,x,y-10*k,k,'#ffe79a')],['rwhale','심해 고래',215,'#4a8aff',(c,x,y,k,t)=>bubble(c,x,y,k,t)],
  ['griffin','폭풍 그리핀',260,'#8a7aff',(c,x,y,k,t)=>cloud(c,x,y-13*k,k,t)],['slime','황금 슬라임',45,'#ffd84a',(c,x,y,k,t)=>coin(c,x,y-13*k,k,t)],['angel','타락 천사',290,'#6a3a8a',(c,x,y,k,t)=>{wings(c,x,y,k,t,'#1a1020');horns(c,x,y-9*k,k,'#ff4d6d')}]];
 if(window.PET59&&RC){const PX=[];const off=document.createElement('canvas');let ex=null;
  NPS.forEach(([id,tn,H,col,acc],i)=>{const base=M.P0+i,nm=PETS[base]&&PETS[base].name||'';PX.push({base,id:'p_'+id,name:nm+' · '+tn,col,desc:nm+'의 「'+tn+'」 스킨. 색과 함께 전용 장식이 붙어요. 능력은 원래 펫 그대로.',map:(h,s,l)=>s>.15?[H+((h%30)-15)*.4,Math.max(.5,s),l]:null,acc,fc:[col,'#ffffff'],price:1800,tier:'변이',cat:'pet',v102:1})});
  let inPX=false;function drawPX(c,v,x,y,now,k){if(inPX)return;inPX=true;try{drawPX0(c,v,x,y,now,k)}finally{inPX=false}}
  function drawPX0(c,v,x,y,now,k){k=k||1;const S=Math.ceil(56*k);if(off.width!==S){off.width=S;off.height=S}const o=off.getContext('2d');o.setTransform(1,0,0,1,0,0);o.clearRect(0,0,S,S);o.imageSmoothingEnabled=false;
   drawPet(o,v.base,S/2,S/2,now,k);try{RC(off,v.map,false)}catch(e){}const sm=c.imageSmoothingEnabled;c.imageSmoothingEnabled=false;c.drawImage(off,Math.round(x-S/2),Math.round(y-S/2));c.imageSmoothingEnabled=sm;
   try{c.save();v.acc(c,x,y+Math.sin(now/260)*1.3*k,k,now/1000);c.restore()}catch(e){}}
  PET59.list.push(...PX);const ob=PET59.byId.bind(PET59),oe=PET59.equip.bind(PET59),og=PET59.get.bind(PET59),od=PET59.draw;
  PET59.draw=(c,id,x,y,now,k)=>{const v=PX.find(q=>q.id===id);if(v)return drawPX(c,v,x,y,now,k);return od(c,id,x,y,now,k)};
  PET59.byId=id=>ob(id)||PX.find(v=>v.id===id);
  PET59.equip=id=>{if(id&&PX.find(v=>v.id===id)){ex=id;oe(null)}else{ex=null;oe(id)}};PET59.get=()=>ex||og();
  {const bd=drawPet;drawPet=function(c,id,x,y,now,k){try{const sm=document.getElementById('shopModal');if(ex&&!inPX&&!(sm&&!sm.hidden)&&id===((shopInv().eq||{}).pt||0)){const v=PX.find(q=>q.id===ex);if(v&&v.base===id){drawPX(c,v,x,y,now,k);return}}}catch(e){}return bd.apply(this,arguments)}}
  NV.push(...PX)}
 window.LOOK102={P,COS,PA,NV};
}catch(e){console.error('v102 looks',e)}})();
