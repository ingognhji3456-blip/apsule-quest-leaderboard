/* ================= 익스트림 전용 보스 형태 — 50명 모두 다른 '각성 형태' =================
   보스마다 자기 색을 바탕으로 한 각성 팔레트 + 콘셉트에 맞는 추가 부위 2~3개(뿔·날개·후광·눈·사슬·촉수·결정·톱날…)
   몸에 붙는 부위는 스프라이트에 직접 그려 외곽선·음영이 함께 적용되고, 뒤쪽 부위는 몸 뒤 화면에 그림 */
const EXL={tmp:null,key:null};
const EXF={
 b0:['#ffd166',['sawring','spikes']],b1:['#bfefff',['arcs','crown']],b2:['#ff6a20',['flames','spikes']],b3:['#ffb070',['smoke','horns']],b4:['#e8fbff',['crystals','halo']],
 b5:['#d5b4ff',['orbit','eyes']],b6:['#ffd166',['chains','orbit']],b7:['#ff9ad0',['halo','blades']],b8:['#7dffd0',['eyes','rays']],b9:['#ff4d8f',['wings','crown','arcs']],
 b10:['#c8ff6a',['thorns','tentacles']],b11:['#e8a8ff',['spores','crown']],b12:['#6affc8',['tentacles','eyes']],b13:['#7af0ff',['horns','flames']],b14:['#ff7ae8',['webs','eyes']],
 b15:['#ffe03a',['wings','crown']],b16:['#ff6aff',['crystals','eyes']],b17:['#4ab8ff',['tentacles','halo']],b18:['#b8c8ff',['flames','wings']],b19:['#ff2a4a',['eyes','tentacles','horns']],
 c_pendulum:['#ffc070',['blades','chains']],c_panopticon:['#ff7a6a',['eyes','rays']],c_moth:['#c8a0ff',['wings','spores']],c_bellows:['#ff8a3a',['smoke','flames']],c_metronome:['#ff9ad0',['halo','blades']],
 c_calendar:['#ffe0a0',['orbit','crown']],c_dust:['#b89aff',['smoke','orbit']],c_scales:['#fff0a0',['chains','halo']],c_echo:['#8ae8ff',['rings','eyes']],c_stillness:['#e0c8ff',['wings','halo','eyes']],
 c_s4_meteor:['#ff8a3a',['flames','horns']],c_s4_eclipse:['#ffe08a',['rays','halo']],c_s4_comet:['#9af0ff',['crystals','orbit']],c_s4_nebula:['#c89aff',['orbit','eyes']],c_s4_gemini:['#ffb0e0',['halo','chains']],
 c_s4_void:['#c070ff',['tentacles','rings']],c_s4_nova:['#ffd166',['wings','rays']],c_s4_luna:['#e8f0ff',['crown','crystals']],c_s4_weaver:['#fff0b0',['webs','orbit']],c_s4_last:['#ffffff',['wings','halo','rays']],
 c_s5_beacon:['#ffd06a',['rays','spikes']],c_s5_manta:['#ff5a50',['blades','orbit']],c_s5_anchor:['#5ef0e0',['chains','horns']],c_s5_organ:['#ffb8e6',['crown','tentacles']],c_s5_nautilus:['#ffc870',['spikes','eyes']],
 c_s5_eel:['#c8ff8a',['arcs','eyes']],c_s5_octopus:['#ffe6a0',['horns','chains']],c_s5_whale:['#f7d8a3',['spikes','smoke']],c_s5_archive:['#8a9aff',['orbit','crown']],c_s5_heart:['#a8ffe9',['wings','halo','rays']]};
function exOn(A){try{if(typeof diff==='undefined'||diff!=='extreme'||A.dm)return false;if(typeof mode!=='undefined'&&mode==='boss')return !!(G&&A.B===G.B);return true}catch(e){return false}}
function exRGB(h){h=(h||'#ffffff').replace('#','');if(h.length===3)h=h.split('').map(x=>x+x).join('');const n=parseInt(h,16);return [(n>>16)&255,(n>>8)&255,n&255]}
function exSeed(s){let h=7;s=s+'';for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h}
/* 보스별 익스트림 업그레이드: EXU[key]={pre(A){몸보다 뒤에 그림}, post(A){몸 위에 그림}} — 같은 좌표계(A.R/A.P/A.E...)로 원본 디자인을 보강 */
const EXU={};
{const _md=monDraw;monDraw=function(key,c,B){const pk=EXL.key;EXL.key=key;const U=EXU[key],orig=MON.reg[key];let sw=false;
 if(U&&orig&&typeof diff!=='undefined'&&diff==='extreme'){sw=true;const f=function(A){const on=exOn(A);A.ex=on;if(on&&U.pre)try{U.pre(A)}catch(e){if(!EXL.e1){EXL.e1=1;console.error('exu pre',key,e)}}orig(A);if(on&&U.post)try{U.post(A)}catch(e){if(!EXL.e2){EXL.e2=1;console.error('exu post',key,e)}}};f.ol=orig.ol;for(const k in orig)f[k]=orig[k];MON.reg[key]=f}
 try{return _md.apply(this,arguments)}finally{EXL.key=pk;if(sw)MON.reg[key]=orig}}}
/* ---------- 몸에 붙는 부위 (스프라이트 픽셀 좌표) ---------- */
const EXA={
 spikes(g,B){const {cx,cy,dd,W2,D,hot,dk,seed}=B,bins=12,far=new Array(bins).fill(null);for(let Y=B.y0;Y<=B.y1;Y+=2)for(let X=B.x0;X<=B.x1;X+=2){if(dd[(Y*W2+X)*4+3]<40)continue;const a=Math.atan2(Y-cy,X-cx);if(a>-Math.PI*.08&&a<Math.PI*1.08)continue;const bi=Math.floor(((a+Math.PI)/TAU)*bins)%bins,d2=(X-cx)**2+(Y-cy)**2;if(!far[bi]||d2>far[bi][2])far[bi]=[X,Y,d2,a]}
  for(const f of far){if(!f)continue;const [X,Y,,a]=f,L=D*(3+((seed+X)%3)),w=D*1.1,ca=Math.cos(a),sa=Math.sin(a),nx=-sa*w,ny=ca*w;g.fillStyle=dk;g.beginPath();g.moveTo(X+nx-ca*D,Y+ny-sa*D);g.lineTo(X-nx-ca*D,Y-ny-sa*D);g.lineTo(X+ca*L,Y+sa*L);g.closePath();g.fill();g.fillStyle=hot;g.fillRect(Math.round(X+ca*L*.75-D*.3),Math.round(Y+sa*L*.75-D*.3),Math.ceil(D*.6),Math.ceil(D*.6))}},
 horns(g,B){const {cx,D,t,hot,dk,mid}=B,hy=B.y0+D*2,hw=B.x1-B.x0;for(const s of [-1,1]){const bx=cx+s*hw*.22,pts=[];for(let i=0;i<=10;i++){const q=i/10,ang=-Math.PI/2+s*(.35+q*1.1),r=q*D*8*(1+.06*Math.sin(t*2));pts.push([bx+Math.cos(ang)*r*.9+s*q*q*D*4,hy+Math.sin(ang)*r*.75-q*D*2])}
  for(let i=0;i<10;i++){const w=D*(1.6*(1-i/10)+.3);g.lineCap='round';g.strokeStyle=dk;g.lineWidth=w+D*.8;g.beginPath();g.moveTo(...pts[i]);g.lineTo(...pts[i+1]);g.stroke();g.strokeStyle=i>7?hot:i%3===0?mid:dk;g.lineWidth=w;g.beginPath();g.moveTo(...pts[i]);g.lineTo(...pts[i+1]);g.stroke()}}},
 crown(g,B){const {cx,D,hot,dk,mid}=B,y=B.y0+D*1.5,w=(B.x1-B.x0)*.32,n=5;g.fillStyle=dk;g.fillRect(cx-w-D*.5,y-D*1.2,w*2+D,D*2);g.fillStyle=mid;g.fillRect(cx-w,y-D,w*2,D*1.4);for(let i=0;i<n;i++){const x=cx-w+(i+.5)*(w*2/n),h=D*(3+(i===2?3:i%2?1:2));g.fillStyle=dk;g.beginPath();g.moveTo(x-D*1.4,y-D*.8);g.lineTo(x+D*1.4,y-D*.8);g.lineTo(x,y-h-D);g.closePath();g.fill();g.fillStyle=mid;g.beginPath();g.moveTo(x-D,y-D);g.lineTo(x+D,y-D);g.lineTo(x,y-h);g.closePath();g.fill();g.fillStyle=hot;g.fillRect(x-D*.5,y-h*.6,D,D)}},
 crystals(g,B){const {D,hot,dk,seed}=B,r=rng(seed);for(let i=0;i<4;i++){const X=B.x0+r()*(B.x1-B.x0),Y=B.y0+r()*(B.y1-B.y0)*.4,h=D*(2+r()*2.5),a=-Math.PI/2+(r()-.5)*1.2,ca=Math.cos(a),sa=Math.sin(a),nx=-sa*D*1.2,ny=ca*D*1.2;g.fillStyle=dk;g.beginPath();g.moveTo(X+nx*1.3,Y+ny*1.3);g.lineTo(X-nx*1.3,Y-ny*1.3);g.lineTo(X+ca*(h+D),Y+sa*(h+D));g.closePath();g.fill();g.fillStyle=hot;g.globalAlpha=.85;g.beginPath();g.moveTo(X+nx,Y+ny);g.lineTo(X-nx,Y-ny);g.lineTo(X+ca*h,Y+sa*h);g.closePath();g.fill();g.globalAlpha=1;g.fillStyle='#ffffff';g.fillRect(X+ca*h*.5,Y+sa*h*.5,Math.ceil(D*.5),Math.ceil(D*.5))}},
 eyes(g,B){const {D,t,hot,seed}=B,r=rng(seed+3);for(let i=0;i<6;i++){const X=B.x0+(B.x1-B.x0)*(.15+r()*.7),Y=B.y0+(B.y1-B.y0)*(.1+r()*.6),R=D*(1+r()*.9),open=Math.abs(Math.sin(t*1.3+i*1.7))>.15;g.fillStyle='#050008';g.beginPath();g.ellipse(X,Y,R*1.6,R*1.1,0,0,TAU);g.fill();if(open){g.fillStyle=hot;g.beginPath();g.ellipse(X,Y,R*1.2,R*.8,0,0,TAU);g.fill();g.fillStyle='#050008';g.fillRect(X-R*.2,Y-R*.75,R*.4,R*1.5)}else{g.fillStyle=hot;g.fillRect(X-R*1.2,Y,R*2.4,Math.max(1,D*.4))}}},
 thorns(g,B){const {D,hot,dk,mid,seed}=B,r=rng(seed+5);for(let i=0;i<5;i++){let X=B.x0+r()*(B.x1-B.x0),Y=B.y1-r()*(B.y1-B.y0)*.5;g.strokeStyle=mid;g.lineWidth=D*1.2;g.beginPath();g.moveTo(X,Y);for(let j=0;j<5;j++){X+=(r()-.5)*D*6;Y-=D*(2+r()*2);g.lineTo(X,Y);g.fillStyle=dk;g.fillRect(X-D,Y-D*.3,D*2.2,D*.7)}g.stroke();g.fillStyle=hot;g.fillRect(X-D*.5,Y-D*.5,D,D)}},
 arcs(g,B){const {D,t,hot,seed}=B,r=rng(seed+Math.floor(t*8));for(let i=0;i<3;i++){let X=B.x0+r()*(B.x1-B.x0),Y=B.y0+r()*(B.y1-B.y0);g.strokeStyle=hot;g.lineWidth=Math.max(1,D*.6);g.beginPath();g.moveTo(X,Y);for(let j=0;j<5;j++){X+=(r()-.5)*D*8;Y+=(r()-.5)*D*6;g.lineTo(X,Y)}g.stroke();g.strokeStyle='#ffffff';g.lineWidth=Math.max(1,D*.25);g.stroke()}},
 webs(g,B){const {cx,cy,D,hot}=B,R=(B.x1-B.x0)*.55;g.strokeStyle=hot;g.globalAlpha=.55;g.lineWidth=Math.max(1,D*.3);for(let i=0;i<8;i++){const a=i*Math.PI/4;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R*.8);g.stroke()}for(let k=1;k<4;k++){g.beginPath();for(let i=0;i<=8;i++){const a=i*Math.PI/4,rr=R*k/4;g.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr*.8)}g.stroke()}g.globalAlpha=1}};
/* ---------- 뒤쪽 부위 (화면 좌표) ---------- */
const EXB={
 halo(c,S){const {cx,top,w,t,hot,u}=S,R=w*.42;c.save();c.translate(cx,top-u*2);c.scale(1,.32);c.strokeStyle=hot;c.fillStyle=hot;c.globalAlpha=.85;c.lineWidth=Math.max(2,u*.9);c.beginPath();c.arc(0,0,R,0,TAU);c.stroke();c.rotate(t*.8);for(let i=0;i<12;i++){const a=i*TAU/12;c.fillRect(Math.cos(a)*R-u*.6,Math.sin(a)*R-u*.6,u*1.2,u*1.2)}c.restore()},
 rays(c,S){const {cx,cy,w,h,t,hot}=S;c.save();c.globalCompositeOperation='lighter';c.translate(cx,cy);c.rotate(t*.15);for(let i=0;i<12;i++){const a=i*TAU/12,L=Math.max(w,h)*(i%2?.9:1.3);c.globalAlpha=.1+.06*Math.sin(t*3+i);c.fillStyle=hot;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(a-.08)*L,Math.sin(a-.08)*L);c.lineTo(Math.cos(a+.08)*L,Math.sin(a+.08)*L);c.fill()}c.restore()},
 wings(c,S){const {cx,cy,w,h,t,hot,dk,mid,u}=S,fl=Math.sin(t*3)*.12;for(const s of [-1,1]){c.save();c.translate(cx+s*w*.18,cy-h*.15);c.rotate(s*(.15+fl));for(let i=0;i<5;i++){const a=-Math.PI/2+s*(.55+i*.28),L=w*(.48-i*.05);c.fillStyle=dk;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(a-.12*s)*L,Math.sin(a-.12*s)*L);c.lineTo(Math.cos(a+.12*s)*L*.82,Math.sin(a+.12*s)*L*.82);c.closePath();c.fill();c.fillStyle=mid;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(a-.06*s)*L*.95,Math.sin(a-.06*s)*L*.95);c.lineTo(Math.cos(a+.08*s)*L*.78,Math.sin(a+.08*s)*L*.78);c.closePath();c.fill();c.fillStyle=hot;c.fillRect(Math.cos(a)*L*.9-u*.5,Math.sin(a)*L*.9-u*.5,u,u)}c.restore()}},
 orbit(c,S){const {cx,cy,w,h,t,hot,dk,u}=S;for(let i=0;i<5;i++){const a=t*1.2+i*TAU/5,x=cx+Math.cos(a)*w*.6,y=cy+Math.sin(a)*h*.25,s2=u*(.9+(i%3)*.3);c.fillStyle=dk;c.fillRect(x-s2-u*.4,y-s2-u*.4,s2*2+u*.8,s2*2+u*.8);c.fillStyle=hot;c.save();c.translate(x,y);c.rotate(t*3+i);c.fillRect(-s2,-s2,s2*2,s2*2);c.restore()}},
 sawring(c,S){const {cx,cy,w,t,hot,dk,u}=S;for(let i=0;i<3;i++){const a=t*.9+i*TAU/3,x=cx+Math.cos(a)*w*.6,y=cy+Math.sin(a)*w*.2-u*4,R=u*4;c.save();c.translate(x,y);c.rotate(t*8);c.fillStyle=dk;c.beginPath();for(let k=0;k<16;k++){const aa=k*TAU/16,rr=k%2?R:R*1.35;c.lineTo(Math.cos(aa)*rr,Math.sin(aa)*rr)}c.fill();c.fillStyle=hot;c.beginPath();c.arc(0,0,R*.45,0,TAU);c.fill();c.restore()}},
 blades(c,S){const {cx,cy,w,h,t,hot,dk,u}=S;for(let i=0;i<6;i++){const a=-t*.7+i*TAU/6,x=cx+Math.cos(a)*w*.58,y=cy+Math.sin(a)*h*.4;c.save();c.translate(x,y);c.rotate(a+Math.PI/2);c.fillStyle=dk;c.beginPath();c.moveTo(0,-u*6);c.lineTo(u*1.6,u*2);c.lineTo(-u*1.6,u*2);c.fill();c.fillStyle=hot;c.beginPath();c.moveTo(0,-u*5);c.lineTo(u*.7,u);c.lineTo(-u*.7,u);c.fill();c.restore()}},
 chains(c,S){const {cx,top,w,h,t,hot,u}=S;for(const s of [-1,1]){for(let i=0;i<10;i++){const q=i/10,x=cx+s*(w*.3+q*w*.35),y=top-u*6+q*h*.9+Math.sin(t*2+i)*u;c.strokeStyle=i%2?'#8a8a94':hot;c.lineWidth=Math.max(1,u*.5);c.beginPath();c.ellipse(x,y,u*1.2,u*.8,(i%2)*Math.PI/2,0,TAU);c.stroke()}}},
 tentacles(c,S){const {cx,bot,w,h,t,hot,dk,mid,u}=S;for(let i=0;i<6;i++){const s=i<3?-1:1,k=i%3;let px=cx+s*w*(.2+k*.12),py=bot-h*.3;for(let j=1;j<=12;j++){const q=j/12,x=px+s*u*1.1+Math.sin(t*2+i+j*.5)*u*1.2,y=py+u*1.2-q*u*.2;c.lineCap='round';c.strokeStyle=dk;c.lineWidth=u*(3-q*2)+u*.6;c.beginPath();c.moveTo(px,py);c.lineTo(x,y);c.stroke();c.strokeStyle=j%3?mid:hot;c.lineWidth=u*(3-q*2);c.stroke();px=x;py=y}}},
 rings(c,S){const {cx,cy,w,t,hot}=S;for(let i=0;i<3;i++){const q=((t*.5)+i/3)%1;c.strokeStyle=hot;c.globalAlpha=(1-q)*.6;c.lineWidth=2;c.beginPath();c.ellipse(cx,cy,w*(.3+q*.6),w*(.1+q*.2),0,0,TAU);c.stroke()}c.globalAlpha=1},
 flames(c,S){const {cx,bot,w,h,t,hot}=S;c.save();c.globalCompositeOperation='lighter';for(let i=0;i<26;i++){const q=(t*.8+i*.137)%1,x=cx+((i*37)%100/100-.5)*w*1.1+Math.sin(t*4+i)*3,y=bot-q*h*1.15,s2=Math.max(2,(1-q)*w*.06);c.globalAlpha=(1-q)*.7;c.fillStyle=q<.3?'#ffffff':hot;c.fillRect(x-s2/2,y-s2,s2,s2*1.8)}c.restore()},
 smoke(c,S){const {cx,top,w,t,dk}=S;for(let i=0;i<10;i++){const q=(t*.25+i*.1)%1,x=cx+Math.sin(i*2.1+t*.5)*w*.3,y=top-q*w*.6,r=w*(.08+q*.12);c.globalAlpha=(1-q)*.45;c.fillStyle=dk;c.beginPath();c.arc(x,y,r,0,TAU);c.fill()}c.globalAlpha=1},
 spores(c,S){const {cx,cy,w,h,t,hot}=S;for(let i=0;i<24;i++){const q=(t*.2+i*.071)%1,a=i*2.4,x=cx+Math.cos(a)*w*.6*q,y=cy-h*.2+Math.sin(a)*h*.5*q-q*h*.3;c.globalAlpha=(1-q)*.8;c.fillStyle=hot;c.fillRect(x-1.5,y-1.5,3,3)}c.globalAlpha=1}};
{const _mf=monFinish;monFinish=function(c,A,x,y,u,ol){if(!exOn(A))return _mf.apply(this,arguments);const key=EXL.key,F=EXF[key];if(!F)return _mf.apply(this,arguments);
 /* 익스트림 = 같은 디자인의 '고퀄 리마스터' 렌더: 대비·채도 보강, 위에서 오는 조명 그라데이션, 윗면 하이라이트, 아랫면 그림자,
    보스 색 림라이트, 주기적 금속 광택 스윕, 발광 부위 블룸. 형태는 건드리지 않음 */
 A.sc=(A.sc||1)*1.06;const M=monCv(),S=M.S,W2=S.width,H2=S.height,D=M.D,u2=u*(A.sc||1),k=u2/D,t=A.t,seed=exSeed(key),hot=F[0];
 const [hr,hg,hb]=exRGB(hot),ga=c.globalAlpha,gco=c.globalCompositeOperation,sm=c.imageSmoothingEnabled;let Bx=null;
 try{const g=S.getContext('2d');g.setTransform(1,0,0,1,0,0);const img=g.getImageData(0,0,W2,H2),dd=img.data,N=W2*H2,al=new Uint8Array(N);let y0=H2,y1=0,x0=W2,x1=0,sx=0,n=0;
  for(let q=0;q<N;q++){const a=dd[q*4+3];al[q]=a;if(a>=40){const X=q%W2,Y=q/W2|0;if(Y<y0)y0=Y;if(Y>y1)y1=Y;if(X<x0)x0=X;if(X>x1)x1=X;sx+=X;n++}}
  if(n){const hh=Math.max(1,y1-y0),ww=Math.max(1,x1-x0),cyc=(t+seed%7)%3.2,sw=cyc<1.1?cyc/1.1:-9,band=D*3.5;
   const E=EXL.em||(EXL.em=document.createElement('canvas'));if(E.width!==W2||E.height!==H2){E.width=W2;E.height=H2}const eg=E.getContext('2d'),eimg=eg.createImageData(W2,H2),ed=eimg.data;let ne=0;
   const op=(X,Y)=>X>=0&&Y>=0&&X<W2&&Y<H2&&al[Y*W2+X]>=40;
   for(let q=0;q<N;q++){if(al[q]<40)continue;const p=q*4,X=q%W2,Y=q/W2|0;let r=dd[p]/255,gg=dd[p+1]/255,b=dd[p+2]/255;
    const mx=Math.max(r,gg,b),mn=Math.min(r,gg,b);let L=(mx+mn)/2,Sx=mx===mn?0:L>.5?(mx-mn)/(2-mx-mn):(mx-mn)/(mx+mn),H=0;if(mx!==mn){H=mx===r?(gg-b)/(mx-mn):mx===gg?2+(b-r)/(mx-mn):4+(r-gg)/(mx-mn);H=((H*60)+360)%360}
    /* 발광 부위(밝고 채도 높은 곳) → 블룸 마스크 */if(L>.6&&L<.93&&Sx>.6){ed[p]=dd[p];ed[p+1]=dd[p+1];ed[p+2]=dd[p+2];ed[p+3]=255;ne++}
    /* 대비·채도 */L=.5+(L-.5)*1.18;Sx=Math.min(1,Sx*1.22);
    /* 위 조명 그라데이션 */const vy=(Y-y0)/hh;L+=.07-.16*vy;
    const up=!op(X,Y-D),dn=!op(X,Y+D),lf=!op(X-D,Y),rt=!op(X+D,Y),up2=!op(X,Y-D*2);
    if(dn)L-=.12;if(!up&&up2)L+=.05;
    L=Math.max(0,Math.min(1,L));
    const qq=L<.5?L*(1+Sx):L+Sx-L*Sx,pp=2*L-qq,hu=(t2)=>{t2=(t2+1)%1;return t2<1/6?pp+(qq-pp)*6*t2:t2<.5?qq:t2<2/3?pp+(qq-pp)*(2/3-t2)*6:pp};const h1=H/360;
    r=hu(h1+1/3);gg=hu(h1);b=hu(h1-1/3);
    /* 윗면 스펙큘러 */if(up){const m=.42;r+=(1-r)*m;gg+=(1-gg)*m;b+=(1-b)*m}
    /* 왼쪽 키라이트 / 오른쪽 보스색 림라이트 */if(lf&&!up){const m=.22;r+=(1-r)*m;gg+=(1-gg)*m;b+=(1-b)*m}
    if(rt||(dn&&!up)){const m=rt?.5:.28;r+=(hr/255-r)*m;gg+=(hg/255-gg)*m;b+=(hb/255-b)*m}
    /* 금속 광택 스윕(대각선 띠) */if(sw>=0){const d=(X-x0)+(Y-y0)*.6-sw*(ww+hh*.6+band*2)+band;const ad=Math.abs(d);if(ad<band){const m=(1-ad/band)*.38;r+=(1-r)*m;gg+=(1-gg)*m;b+=(1-b)*m}}
    dd[p]=Math.round(Math.min(1,r)*255);dd[p+1]=Math.round(Math.min(1,gg)*255);dd[p+2]=Math.round(Math.min(1,b)*255)}
   g.putImageData(img,0,0);if(ne)eg.putImageData(eimg,0,0);
   Bx={cx:sx/n,cy:(y0+y1)/2,x0,x1,y0,y1,ne}}}catch(e){}
 A.rim='rgba('+hr+','+hg+','+hb+',.75)';
 const sxp=Math.round(x-M.OX*u2),syp=Math.round(y-M.OY*u2),sw2=Math.round(W2*k),sh2=Math.round(H2*k);
 if(Bx){const cx=sxp+Bx.cx*k,top=syp+Bx.y0*k,bot=syp+Bx.y1*k,w=(Bx.x1-Bx.x0)*k;
  /* 은은한 바닥 광원 */c.save();c.globalCompositeOperation='lighter';const gr=c.createRadialGradient(x,y,0,x,y,w*.65);gr.addColorStop(0,'rgba('+hr+','+hg+','+hb+',.14)');gr.addColorStop(1,'rgba('+hr+','+hg+','+hb+',0)');c.globalAlpha=ga;c.fillStyle=gr;c.beginPath();c.ellipse(x,y,w*.65,w*.14,0,0,TAU);c.fill();
  c.globalAlpha=ga*.45;c.strokeStyle=hot;c.lineWidth=Math.max(1,u2*.35);c.beginPath();c.ellipse(x,y+u2*.3,w*.55,w*.1,0,0,TAU);c.stroke();
  /* 적은 수의 빛 입자 */for(let i=0;i<8;i++){const q=(t*.35+i*.173)%1,ex=cx+((i*41)%100/100-.5)*w*.9,ey=bot-q*(bot-top)*1.1;c.globalAlpha=ga*(1-q)*.5;c.fillStyle=hot;c.fillRect(Math.round(ex),Math.round(ey),Math.max(1,Math.round(u2*.5)),Math.max(1,Math.round(u2*.5)))}c.restore()}
 /* 부드러운 각성색 외곽 글로우(뒤) */try{if(!EXL.tmp)EXL.tmp=document.createElement('canvas');const T=EXL.tmp;if(T.width!==W2||T.height!==H2){T.width=W2;T.height=H2}const tg=T.getContext('2d');tg.setTransform(1,0,0,1,0,0);tg.globalCompositeOperation='source-over';tg.globalAlpha=1;tg.clearRect(0,0,W2,H2);tg.drawImage(S,0,0);tg.globalCompositeOperation='source-in';tg.fillStyle=hot;tg.fillRect(0,0,W2,H2);
  c.save();c.imageSmoothingEnabled=false;c.globalCompositeOperation='lighter';const pul=.5+.5*Math.sin(t*3),o=Math.max(1,Math.round(u2*(.8+pul*.6)));for(const [dx,dy] of [[-o,0],[o,0],[0,-o],[0,o]]){c.globalAlpha=ga*(.1+.07*pul);c.drawImage(T,sxp+dx,syp+dy,sw2,sh2)}c.restore()}catch(e){}
 c.globalAlpha=ga;c.globalCompositeOperation=gco;c.imageSmoothingEnabled=sm;
 const ret=_mf.apply(this,arguments);
 /* 발광 부위 블룸(앞) — 축소 후 확대로 번지게 */try{if(Bx&&Bx.ne){const E=EXL.em,Q=EXL.bq||(EXL.bq=document.createElement('canvas')),qw=Math.max(1,W2>>2),qh=Math.max(1,H2>>2);if(Q.width!==qw||Q.height!==qh){Q.width=qw;Q.height=qh}const qg=Q.getContext('2d');qg.clearRect(0,0,qw,qh);qg.imageSmoothingEnabled=true;qg.drawImage(E,0,0,qw,qh);
  c.save();c.globalCompositeOperation='lighter';c.imageSmoothingEnabled=true;c.globalAlpha=ga*(.28+.1*Math.sin(t*2.6));c.drawImage(Q,sxp-u2,syp-u2,sw2+u2*2,sh2+u2*2);c.restore()}}catch(e){}
 c.globalAlpha=ga;c.globalCompositeOperation=gco;c.imageSmoothingEnabled=sm;return ret}}
/* 익스트림 전투: 가장자리를 보스 각성 색으로 */
{const _d=npDrawTop;npDrawTop=function(now,beat){const r=_d.apply(this,arguments);try{if(diff==='extreme'&&mode==='boss'&&G&&G.B){const t=now/1000,a=.14+.06*Math.sin(t*2.4),col=G.B.c||'#ff2a3a';for(let i=0;i<12;i++){const al=a*(1-i/12);RA(AX+i,AY+i,AW-i*2,1,col,al);RA(AX+i,AY+AH-i-1,AW-i*2,1,col,al);RA(AX+i,AY+i,1,AH-i*2,col,al);RA(AX+AW-i-1,AY+i,1,AH-i*2,col,al)}}}catch(e){}return r}}

