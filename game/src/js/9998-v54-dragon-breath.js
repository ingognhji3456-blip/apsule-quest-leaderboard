/* ================= v54 반사룡: 레이저 대신 입에서 뿜는 브레스 =================
   전에는 입에서 얇은 레이저 한 줄이 나왔다. 이제 입에서 시작해 멀어질수록 넓게 퍼지는 부채꼴 숨결이다.
   - 예고: 입에 빛이 모이고, 숨결이 지나갈 부채꼴이 붉게 보임
   - 숨결: 흰빛·청록 숨결이 흘러나오며 반짝이는 비늘 조각이 섞여 날림 (메아리 숨결은 보라)
   - 판정: 숨결 모양을 따라 입에서 멀수록 넓어지는 원 여러 개 (그림과 같은 범위)
   반사 숨결 · 쌍둥이 숨결(어려움)에 쓴다.
   숨결 방향이 바뀌면 용이 그쪽으로 고개를 돌리고(9995의 G.aim54), 입도 따라 돈다. 메아리 숨결은 같은 용이 반대로 고개를 돌려 뿜는다. */
(function(){try{
 const L7=window.S7ART,H=window.S7H;if(!L7||!H)return;
 const {tel,spd,ph,P7,snd,shake,echo,CX}=H,C=(v,a,b)=>v<a?a:v>b?b:v;
 const LEN=330,R0=5,RK=.11;/* 길이 · 입 쪽 반지름 · 멀어질수록 넓어지는 정도 */
 /* 숨결 하나: 입(sx,sy)에서 각도 ang(b) 쪽으로, T1~T1+dur 동안 */
 function breath(T,org,ang,dur,col,dmg,aim){const T1=T+tel(),t2=T1+dur;
  /* 그림 (판정 없음) */
  NP({k:'rect',harm:false,noTel:true,hide:true,x:0,y:0,w:1,h:1,t0:T,t1:T,t2:t2+.15,deco:(o,b,now)=>{const t=now/1000,a=ang(b),ca=Math.cos(a),sa=Math.sin(a),g=ctx,[sx,sy]=org(b);if(aim&&G)G.aim54={a,until:now+120};
   if(b<T1){/* 예고: 입에 빛이 모이고 부채꼴이 붉게 */const p=C((b-T)/(T1-T),0,1);g.save();g.globalAlpha=.1+.18*p;g.fillStyle='#ff4d6d';g.beginPath();g.moveTo(sx,sy);for(const s of [-1,1]){const R=R0+LEN*RK;g.lineTo(sx+ca*LEN-sa*R*s,sy+sa*LEN+ca*R*s)}g.closePath();g.fill();g.restore();
    pcirc(sx,sy,2+p*7,col,.5+.4*p);pcirc(sx,sy,1+p*3,'#ffffff',.9*p);for(let i=0;i<8;i++){const aa=i*TAU/8+t*4,d=(1-((t*1.5+i/8)%1))*24;cPx(sx+Math.cos(aa)*d,sy+Math.sin(aa)*d,1,i%2?'#ffffff':col,.8*p)}return}
   const age=b-T1,fade=C((t2-b)/.2,0,1),grow=C(age/.15,0,1),L=LEN*grow;
   /* 숨결 몸통: 바깥 빛무리 → 안쪽 밝은 숨결 → 흰 중심 */
   g.save();g.globalCompositeOperation='lighter';
   for(const [wk,al,c2] of [[1.25,.18,col],[1,.35,col],[.55,.5,'#e8f8ff'],[.22,.7,'#ffffff']]){g.globalAlpha=al*fade;g.fillStyle=c2;g.beginPath();g.moveTo(sx-sa*R0*wk,sy+ca*R0*wk);
    for(let d=0;d<=L;d+=12){const R=(R0+d*RK)*wk*(1+.12*Math.sin(d*.08-t*18));g.lineTo(sx+ca*d-sa*R,sy+sa*d+ca*R)}for(let d=L;d>=0;d-=12){const R=(R0+d*RK)*wk*(1+.12*Math.sin(d*.08-t*18+1.7));g.lineTo(sx+ca*d+sa*R,sy+sa*d-ca*R)}g.closePath();g.fill()}
   g.restore();
   /* 흘러가는 숨결 덩이와 반짝이는 비늘 조각 */
   for(let i=0;i<26;i++){const q=((t*1.6+i*.137)%1),d=q*L,R=(R0+d*RK)*.9,o=Math.sin(i*2.7+t*3)*R,px=sx+ca*d-sa*o,py=sy+sa*d+ca*o;
    if(i%3===0){g.save();g.translate(px,py);g.rotate(t*8+i);g.globalAlpha=(1-q)*.95*fade;g.fillStyle='#ffffff';g.fillRect(-2,-1,4,2);g.fillStyle=col;g.fillRect(-1,-2,2,4);g.restore()}else pcirc(px,py,1.5+q*3,i%2?col:'#e8f8ff',(1-q)*.6*fade)}
   pcirc(sx,sy,6+Math.sin(t*30)*1.5,'#ffffff',.85*fade);ctx.globalAlpha=1}});
  /* 판정: 입에서 멀수록 넓어지는 원 여러 개 */
  for(let j=0;j<7;j++){const d=30+j*48,r=R0+d*RK*.85;NP({k:'orb',hide:true,noTel:true,r,t0:T,t1:T1+Math.min(.12,d/LEN*.15),t2,dmg:dmg||13,pos:b=>{const a=ang(b),[sx,sy]=org(b);return [sx+Math.cos(a)*d,sy+Math.sin(a)*d]}})}
  snd(T1,140,dur,'sawtooth',.05,90)}
 window.BREATH54=breath;
 /* 입 위치: 머리(-3,-23)에서 숨결 방향으로 조금 나간 곳 — 고개를 돌리면 입도 따라 돈다 */
 const mouth=ang=>b=>{const [hx,hy]=P7(-3,-23),a=ang(b),u=(H.POS&&H.POS['c_s7_dragon']&&H.POS['c_s7_dragon'].u)||1.6;return [hx+Math.cos(a)*7*u,hy+Math.sin(a)*5*u]};
 const D=(n,kr,ch,est,tip,fn)=>defPat(n,kr,ch,est,tip,fn);
 /* 반사 숨결: 입에서 숨결을 뿜으며 쓸고 지나가고, 한 박자 뒤 거울 숨결이 반대로 쓸어옴 */
 D('s7DragonBreath','반사 숨결','head',12,'반사룡이 입에서 빛 숨결을 뿜으며 쓸고 지나간 뒤 메아리 숨결이 반대로 쓸어옴 → 숨결이 지나간 쪽으로 돌아 들어가고, 두 번째 숨결 방향을 기억해',t=>{const n=1+Math.min(1,ph());
  for(let k=0;k<n;k++){const T0=t+k*2.8;echo(T0,'#8af0ff',(T,mx,ma,col,m)=>{const T1=T+tel(),dur=1.3,ang=b=>{const q=C((b-T1)/dur,0,1);return ma(Math.PI*(.85-q*.7))};breath(T,mouth(ang),ang,dur,m?'#c89aff':'#8af0ff',13,true)},1.3+.4)}
  return n*2.8+1.3+tel()+1.6});
 /* 쌍둥이 숨결(어려움): 용과 거울 속 용이 양쪽에서 동시에 숨결을 뿜어 가운데서 엇갈림 */
 D('s7hDragonTwin','쌍둥이 숨결','head',13,'[어려움] 반사룡이 왼쪽으로, 오른쪽 끝에 나타난 거울 속 용이 왼쪽 아래로 동시에 숨결을 쓸어 옴 → 거울 용 바로 아래 오른쪽 구석으로',t=>{const n=1+Math.min(1,ph());
  for(let k=0;k<n;k++){const T0=t+k*2.8;sch(T0,()=>{const T1=T0+tel(),dur=1.5;for(const m of [0,1]){const ang=b=>{const q=C((b-T1)/dur,0,1);return m?Math.PI*(1.05-q*.35):Math.PI*(.95-q*.4)};
    if(!m){breath(T0,mouth(ang),ang,dur,'#8af0ff',13,true);continue}
    /* 거울 속 용: 경기장 오른쪽 끝에 반투명한 보라 용이 나타나 고개를 돌리며 뿜음 (바로 아래 오른쪽 구석이 빈 곳) */const gx=AX+AW-34,gy=AY+56,org=b=>{const a=ang(b);return [gx+Math.cos(a)*10,gy+Math.sin(a)*8]};
    try{ACT.put({spr:S7PIX.DRAGON,s:2.4,t0:T0,t2:T1+dur+.3,pos:b=>[gx,gy+Math.sin(b*3)*2],tint:'#c89aff',rot:b=>ang(b)-Math.PI/2,glow:'#c89aff'})}catch(e){}breath(T0,org,ang,dur,'#c89aff',13,false)}});shake(T0+tel(),.3)}
  return n*2.8+tel()+1.8});
 /* 외침 다시 붙이기 (997의 외침 표) */
 try{const CAST=window.S7CAST||{};for(const n of ['s7DragonBreath','s7hDragonTwin']){const f=MV[n],c=CAST[n];if(!f||!c)continue;MV[n]=function(t){try{sch(t,()=>{if(G&&G.s7!=null)G.s7cast={n,t,line:c[0],ax:c[1],ay:c[2],real:performance.now()}})}catch(e){}return f.apply(this,arguments)}}}catch(e){}
}catch(e){console.error('v54 dragon breath',e)}})();
