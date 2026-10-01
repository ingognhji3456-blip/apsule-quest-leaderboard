/* ================= v43 난이도별 보스 외형 단계: 쉬움(기본) → 보통(디테일 일부) → 어려움(컨셉 디테일 전부 + 각성 빛) → 익스트림(완전 각성 리마스터) ================= */
(function(){
 const TIER=()=>({easy:0,normal:1,hard:2,extreme:3})[typeof diff!=='undefined'?diff:'normal']||0;
 window.__tier=TIER;
 /* 보통·어려움: 익스트림의 보스별 디테일층(EXU)을 단계적으로 켬 — 보통은 몸 위 디테일만, 어려움은 몸 뒤 부위까지 */
 try{const _md=monDraw;monDraw=function(key,c,B){const tr=TIER(),U=EXU[key],orig=MON.reg[key];if(!(tr===1||tr===2)||!U||!orig)return _md.apply(this,arguments);
   const f=function(A){A.ex=true;A.tier=tr;if(tr>=2&&U.pre)try{U.pre(A)}catch(e){}orig(A);if(U.post)try{if(tr===1){const s=A.c,ga=s.globalAlpha;U.post(A);s.globalAlpha=ga}else U.post(A)}catch(e){}};f.ol=orig.ol;for(const k in orig)f[k]=orig[k];
   MON.reg[key]=f;try{return _md.apply(this,arguments)}finally{MON.reg[key]=orig}}}catch(e){console.error('v43 tier',e)}
 /* 어려움: 몸을 감싸는 각성 빛 테두리 + 바닥 빛 고리 (익스트림보다 은은하게) */
 const HG={tmp:null};
 try{const _mf=monFinish;monFinish=function(c,A,x,y,u,ol){try{if(TIER()===2&&A&&!A.dm&&A.B){const M=monCv(),F=M.S,W2=F.width,H2=F.height,uu=u*(A.sc||1),k=uu/M.D,sx=Math.round(x-M.OX*uu),sy=Math.round(y-M.OY*uu),sw=Math.round(W2*k),sh=Math.round(H2*k),col=A.B.c||'#ffffff',t=A.t||0;
    const T=HG.tmp||(HG.tmp=document.createElement('canvas'));if(T.width!==W2||T.height!==H2){T.width=W2;T.height=H2}const g=T.getContext('2d');g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='copy';g.drawImage(F,0,0);g.globalCompositeOperation='source-in';g.fillStyle=col;g.fillRect(0,0,W2,H2);g.globalCompositeOperation='source-over';
    const ga=c.globalAlpha,gco=c.globalCompositeOperation,sm=c.imageSmoothingEnabled;c.save();c.globalCompositeOperation='lighter';c.imageSmoothingEnabled=false;const pul=.5+.5*Math.sin(t*2.6),o=Math.max(1,Math.round(uu*.7));for(const [dx,dy] of [[-o,0],[o,0],[0,-o],[0,o]]){c.globalAlpha=ga*(.22+.1*pul);c.drawImage(T,sx+dx,sy+dy,sw,sh)}
    c.globalCompositeOperation='lighter';c.globalAlpha=ga*.35;c.strokeStyle=col;c.lineWidth=Math.max(1,uu*.3);c.beginPath();const bb=A.bbox||[-14,-30,14,0],hw=((bb[2]-bb[0])/2+5)*uu;c.ellipse(x,y+uu*.3,hw,hw*.18,0,0,TAU);c.stroke();c.restore();c.globalAlpha=ga;c.globalCompositeOperation=gco;c.imageSmoothingEnabled=sm}}catch(e){}return _mf.apply(this,arguments)}}catch(e){}
})();
