/* ================= v53 공통 장치: 보스가 "소환한 물체" + 묵직한 레이저 =================
   1) 소환 물체(ACT): 보스가 공격할 때 실제 물건(거울·체스 말·촛불·목마·드론…)을 경기장에 꺼내 놓고,
      그 물건이 움직이거나 쏘면서 공격한다. 물건은 펑 하고 나타났다가 사라진다(빛 고리·그림자).
      - ACT.put({spr, pos(b), t0, t2, s, ground, face(b), rot(b), glow}) : 보이기만 하는 물체(맞지 않음)
      - ACT.hit({pos(b), r, t0, t1, t2, dmg}) : 물체 몸에 붙는 판정(그림은 물체가 대신 그림)
      - ACT.pix(줄글, 색표) : 글자로 적은 도트 그림 → 그리기 함수 (한 번 그려 두고 크게 붙임)
      - ACT.spr(탄모양, 크기) : 기존 탄 그림(npSpr: 톱니·드론·벌…)을 크게 키운 물체
   2) 레이저(모든 챕터 공통, 'laser' 모양): 순간 "띡" 나타나지 않고
      발사구가 번쩍 → 빛줄기가 쭉 뻗어 나감 → 두꺼운 빛무리 + 흰 심지 + 흐르는 빛 → 끝에 불똥 → 가늘어지며 사라짐
      예고 때는 발사구에 빛이 모여드는 모습이 보인다. 판정 두께는 그대로다. */
(function(){try{
 const ACT=window.ACT={};
 const E=q=>1-Math.pow(1-q,3),C=(v,a,b)=>v<a?a:v>b?b:v;
 /* 판정만 있고 그림은 숨기는 위험물 (물체가 대신 그림) */
 for(const k of ['orb','seg','rect','circ']){const d=NPK[k].draw;NPK[k].draw=function(o){if(o&&o.hide)return;return d.apply(this,arguments)}}

 /* ---------- 도트 그림: 한 번 그려 둔 그림판을 크게 붙인다 ---------- */
 const CACHE=new Map();
 ACT.pix=(rows,pal)=>{const h=rows.length,w=Math.max(...rows.map(r=>r.length));const make=(tint)=>{const cv=document.createElement('canvas');cv.width=w;cv.height=h;const c=cv.getContext('2d');
   for(let j=0;j<h;j++)for(let i=0;i<w;i++){const ch=rows[j][i];if(!ch||ch==='.'||!pal[ch])continue;c.fillStyle=tint&&ch!=='K'?mixc(pal[ch],tint,.45):pal[ch];c.fillRect(i,j,1,1)}return cv};
  const f=(x,y,s,o)=>{o=o||{};const key=f.id+'|'+(o.tint||'');let cv=CACHE.get(key);if(!cv){cv=make(o.tint);CACHE.set(key,cv)}const c=ctx;c.save();c.imageSmoothingEnabled=false;c.translate(x,y);if(o.rot)c.rotate(o.rot);if(o.flip)c.scale(-1,1);if(o.a!=null)c.globalAlpha=o.a;
   c.drawImage(cv,-w*s/2,-h*s/2,w*s,h*s);c.restore();c.globalAlpha=1};f.id='p'+(ACT._n=(ACT._n||0)+1);f.w=w;f.h=h;return f};
 /* 기존 탄 그림을 키워서 물체로 */
 const SPC=document.createElement('canvas');SPC.width=SPC.height=40;
 ACT.spr=(sty,r,col)=>{const f=(x,y,s,o)=>{o=o||{};const g=SPC.getContext('2d');g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,40,40);g.imageSmoothingEnabled=false;const sv=_cx;_cx=g;try{npSpr(sty,20,20,r||5,performance.now(),{col:o.col||col,t0:0,t2:9e9,spin:1},0)}catch(e){}_cx=sv;
   const c=ctx;c.save();c.imageSmoothingEnabled=false;c.translate(x,y);if(o.rot)c.rotate(o.rot);if(o.flip)c.scale(-1,1);if(o.a!=null)c.globalAlpha=o.a;c.drawImage(SPC,-20*s,-20*s,40*s,40*s);c.restore();c.globalAlpha=1};f.w=(r||5)*2+4;f.h=(r||5)*2+4;return f};

 /* ---------- 물체 놓기 ---------- */
 function drawActor(o,b,now){const A=o.A;if(!A)return;const [x,y]=A.pos(b),ain=C((b-A.t0)/(A.inT||.22),0,1),aout=C((A.t2-b)/(A.outT||.2),0,1),k=E(ain)*aout,s=(A.s||1.5)*(.35+.65*k)*(A.pulse?1+Math.sin(now/90)*.04:1);
  if(k<=0.01)return;const sp=typeof A.spr==='function'?A.spr:null;if(!sp)return;const hh=(sp.h||12)*s;
  if(A.ground){RA(Math.round(x-hh*.45),Math.round(y+hh*.5-1),Math.round(hh*.9),2,'#000000',.3*k)}
  if(A.glow)pcirc(x,y,hh*.55,A.glow,.18*k);
  const face=A.face?A.face(b):0,rot=A.rot?A.rot(b):0;sp(x,y,s,{flip:face<0,rot,a:aout<1?aout:1,tint:A.tint,col:A.col});
  if(ain<1){cRing(x,y,hh*.35+ain*hh*.5,'#ffffff',(1-ain)*.9,1);if(ain<.5)pcirc(x,y,hh*.3*(1-ain*2),'#ffffff',.6)}
  if(A.deco)try{A.deco(A,b,now,x,y,k)}catch(e){}}
 ACT.put=A=>{A.t2=A.t2==null?A.t0+4:A.t2;const o=NP({k:'orb',harm:false,noTel:true,hide:true,r:1,t0:A.t0,t1:A.t0,t2:A.t2,pos:A.pos,A,deco:drawActor,act:1});A.o=o;return A};
 ACT.hit=h=>NP(Object.assign({k:'orb',hide:true,noTel:true},h,{pos:h.pos,r:h.r||6,dmg:h.dmg||11}));
 /* 자주 쓰는 움직임 */
 ACT.at=(x,y)=>()=>[x,y];
 ACT.lin=(x0,y0,x1,y1,b0,b1,ease)=>b=>{const q=C((b-b0)/Math.max(.001,b1-b0),0,1),e=ease?E(q):q;return [x0+(x1-x0)*e,y0+(y1-y0)*e]};
 ACT.hop=(x0,y0,x1,y1,b0,b1,hgt)=>b=>{const q=C((b-b0)/Math.max(.001,b1-b0),0,1);return [x0+(x1-x0)*q,y0+(y1-y0)*q-Math.sin(q*Math.PI)*(hgt||40)]};
 ACT.path=(pts,b0,dur)=>b=>{const n=pts.length-1,q=C((b-b0)/dur,0,1)*n,i=Math.min(n-1,Math.floor(q)),f=q-i;return [pts[i][0]+(pts[i+1][0]-pts[i][0])*f,pts[i][1]+(pts[i+1][1]-pts[i][1])*f]};
 /* 소환 연출 효과음 */
 ACT.snd=(t,f,l,w,v,f2)=>sch(t,()=>{try{sfx(f,l||.12,w||'triangle',v||.04,f2||f*1.5)}catch(e){}});

 /* ---------- 묵직한 레이저 ---------- */
 const _sd=npSegDraw;
 npSegDraw=function(o,ax,ay,bx,by,now,b){const sty=o.sty||'laser';if(sty!=='laser'||o.thin)return _sd.apply(this,arguments);
  const c=o.col||npCol(),w=Math.max(2,o.w),age=b-o.t1,rem=o.t2-b,g=ctx,t=now/1000;
  const ext=E(C(age/.14,0,1)),fade=C(rem/.18,0,1),flash=C(1-age/.1,0,1),ww=w*(.45+.55*fade)*(1+flash*.5);
  const ex=ax+(bx-ax)*ext,ey=ay+(by-ay)*ext,L=Math.hypot(ex-ax,ey-ay)||1,ux=(ex-ax)/L,uy=(ey-ay)/L;
  g.save();g.lineCap='round';
  g.globalAlpha=.22*fade+.2*flash;g.strokeStyle=c;g.lineWidth=ww*2.4+4;g.beginPath();g.moveTo(ax,ay);g.lineTo(ex,ey);g.stroke();
  g.globalAlpha=.95;g.strokeStyle=c;g.lineWidth=ww;g.beginPath();g.moveTo(ax,ay);g.lineTo(ex,ey);g.stroke();
  g.globalAlpha=.95;g.strokeStyle='#ffffff';g.lineWidth=Math.max(1,ww*.38*(.85+.3*Math.sin(t*50+ax)));g.beginPath();g.moveTo(ax,ay);g.lineTo(ex,ey);g.stroke();
  /* 흐르는 빛 */g.globalAlpha=.8*fade;g.fillStyle='#ffffff';for(let d=((t*260)%22);d<L;d+=22){const px=ax+ux*d,py=ay+uy*d;g.fillRect(px-1,py-1,2+ww*.2,2)}
  g.restore();g.globalAlpha=1;
  /* 발사구 */pcirc(ax,ay,ww*.75+flash*4,c,.7);pcirc(ax,ay,Math.max(1,ww*.4),'#ffffff',.95);
  /* 끝 불똥 */if(ext>=1&&ex>AX&&ex<AX+AW&&ey>AY&&ey<AY+AH){const sd=Math.floor(t*30);for(let i=0;i<5;i++){const a=hash(sd+'i'+i)%628/100,d=2+hash(sd+'d'+i)%Math.max(3,Math.round(ww));cPx(ex+Math.cos(a)*d,ey+Math.sin(a)*d,1,i%2?'#ffffff':c,.9)}pcirc(ex,ey,ww*.5,'#ffffff',.6)}};
 /* 레이저 예고: 발사구에 빛이 모여듦 */
 {const T=NPK.seg.tel;NPK.seg.tel=function(o,b,now){const r=T.apply(this,arguments);try{if((o.sty||'laser')==='laser'&&!o.noCharge){const p=C((b-o.t0)/Math.max(.01,o.t1-o.t0),0,1),[ax,ay]=o.a(o.live?b:o.t1),c=o.col||npCol(),w=Math.max(2,o.w);
   pcirc(ax,ay,1+p*w*.7,c,.35+.45*p);pcirc(ax,ay,Math.max(1,p*w*.3),'#ffffff',.8*p);for(let i=0;i<6;i++){const a=i*TAU/6+now/300,d=(1-((now/400+i/6)%1))*(10+w*1.5);cPx(ax+Math.cos(a)*d,ay+Math.sin(a)*d,1,i%2?'#ffffff':c,.4+.5*p)}}}catch(e){}return r}}
}catch(e){console.error('v53 actors beams',e)}})();
