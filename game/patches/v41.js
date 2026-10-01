
/* ================= v41 디자인 퀄리티 패스: 보스 50명 공통 셰이딩 · 캐릭터 10명 디테일 =================
   보스: 스프라이트(완성 직전 단계)에 도트 단위 셰이딩을 한 번 더 —
     · 윗면 하이라이트 2단 · 아랫면 그늘 · 오른쪽 보스색 림라이트 · 왼쪽 키라이트
     · 부위가 겹치는 곳(머리→몸, 모자→얼굴, 장갑판→관절)에 1도트 드리운 그림자
     · 어두운 색을 살짝 들어 올려(감마) 탁한 느낌 제거, 금속 노이즈는 은은하게
   익스트림은 자체 리마스터가 따로 있으므로 겹치는 단계(윤곽 조명)는 약하게, 드리운 그림자·감마만 그대로.
   캐릭터: 외곽선을 옆 색을 머금은 어두운 색(셀아웃)으로, 윗면/아랫면 1도트 명암, 부위 겹침 그림자 + 캐릭터별 잔디테일 */
(function(){
 const LUT=new Uint8Array(256);for(let i=0;i<256;i++)LUT[i]=Math.round(255*Math.pow(i/255,.82));
 const hx=h=>{h=(h||'#ffffff').replace('#','');if(h.length===3)h=h.split('').map(x=>x+x).join('');const n=parseInt(h.slice(0,6),16);return [(n>>16)&255,(n>>8)&255,n&255]};
 const lum=(r,g,b)=>(r*299+g*587+b*114)/1000;
 /* ---------- 보스 공통 셰이딩 ---------- */
 const SH={buf:null};
 function bossShade(A){const M=monCv(),S=M.S,W2=S.width,H2=S.height,D=M.D,g=S.getContext('2d');g.setTransform(1,0,0,1,0,0);
  const img=g.getImageData(0,0,W2,H2),d=img.data;
  const ex=typeof exOn==='function'&&exOn(A),[cr,cg,cb]=hx((A.B&&A.B.c)||'#ffffff'),k=ex?.45:1;
  /* 디자인 도트(D×D) 단위 칸: 가운데 픽셀로 판정 */
  const cw=Math.ceil(W2/D),ch=Math.ceil(H2/D),NC=cw*ch;
  if(!SH.c||SH.c.n!==NC){SH.c={n:NC,on:new Uint8Array(NC),col:new Int32Array(NC*3),dist:new Uint16Array(NC),lm:new Float32Array(NC),dm:new Float32Array(NC),rm:new Float32Array(NC)}}
  const Cc=SH.c,on=Cc.on,col=Cc.col,dist=Cc.dist,lm=Cc.lm,dm=Cc.dm,rm=Cc.rm;let any=0;
  for(let cy=0;cy<ch;cy++)for(let cx=0;cx<cw;cx++){const i=cy*cw+cx,X=Math.min(W2-1,cx*D+(D>>1)),Y=Math.min(H2-1,cy*D+(D>>1)),p=(Y*W2+X)*4;const o=d[p+3]>=60;on[i]=o;if(o){any=1;col[i*3]=d[p];col[i*3+1]=d[p+1];col[i*3+2]=d[p+2]}}
  if(!any)return;
  const BIG=60000;for(let i=0;i<NC;i++)dist[i]=on[i]?BIG:0;
  for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){const i=y*cw+x;if(!dist[i])continue;let v=dist[i];v=Math.min(v,x>0?dist[i-1]+3:3);if(y>0){v=Math.min(v,dist[i-cw]+3);if(x>0)v=Math.min(v,dist[i-cw-1]+4);if(x<cw-1)v=Math.min(v,dist[i-cw+1]+4)}else v=Math.min(v,3);dist[i]=v}
  for(let y=ch-1;y>=0;y--)for(let x=cw-1;x>=0;x--){const i=y*cw+x;if(!dist[i])continue;let v=dist[i];v=Math.min(v,x<cw-1?dist[i+1]+3:3);if(y<ch-1){v=Math.min(v,dist[i+cw]+3);if(x<cw-1)v=Math.min(v,dist[i+cw+1]+4);if(x>0)v=Math.min(v,dist[i+cw-1]+4)}else v=Math.min(v,3);dist[i]=v}
  const DM=15,dq=i=>Math.min(DM,dist[i]),LX=-.55,LY=-.83,cOn=(x,y)=>x>=0&&y>=0&&x<cw&&y<ch&&on[y*cw+x];
  for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){const i=y*cw+x;lm[i]=0;dm[i]=1;rm[i]=0;if(!on[i])continue;
   const dd=dq(i);let L=0,Dk=1;
   if(dd<DM){const gx=(x<cw-1?dq(i+1):dd)-(x>0?dq(i-1):dd),gy=(y<ch-1?dq(i+cw):dd)-(y>0?dq(i-cw):dd),gl=Math.hypot(gx,gy);
    if(gl>0){const face=-(gx*LX+gy*LY)/gl,band=Math.floor(dd/3),w=band<=1?1:band===2?.62:band===3?.32:.12,sv=face*w;
     if(sv>.42)L+=.2;else if(sv>.14)L+=.09;else if(sv<-.42)Dk*=.74;else if(sv<-.14)Dk*=.88}}
   if(!cOn(x,y-1))L+=.16;if(!cOn(x,y+1))Dk*=.86;if(!cOn(x+1,y))rm[i]=.34*k;
   /* 부위 겹침 그림자 */if(cOn(x,y-1)&&cOn(x,y-2)){const a=i*3,b=(i-cw)*3,c2=(i-2*cw)*3,dr=col[b]-col[a],dg=col[b+1]-col[a+1],db=col[b+2]-col[a+2];
    if(dr*dr+dg*dg+db*db>2400&&Math.abs(col[b]-col[c2])+Math.abs(col[b+1]-col[c2+1])+Math.abs(col[b+2]-col[c2+2])<40&&lum(col[b],col[b+1],col[b+2])<=lum(col[a],col[a+1],col[a+2])+18)Dk*=.8}
   lm[i]=Math.min(.4,L)*k;dm[i]=1-(1-Dk)*k}
  /* 챕터별 재질 */const key=(typeof EXL!=='undefined'&&EXL.key)||'',bi=/^b\d+$/.test(key)?+key.slice(1):-1,mat=bi>=0&&bi<10?'metal':bi>=10?'flesh':key.indexOf('c_s5_')===0?'sea':key.indexOf('c_s4_')===0?'star':key.indexOf('c_')===0?'brass':'',t=A.t||0,glints=[];
  if(mat){const hsh=(a,b2)=>{let h=(a*73856093)^(b2*19349663)^(key.length*83492791);h=(h^(h>>>13))*1274126177;return ((h^(h>>>16))>>>0)/4294967296};
   for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){const i=y*cw+x;if(!on[i])continue;
    if(mat==='sea'){/* 물결 빛: 윗면·빛 받는 면에만 움직이는 코스틱 */if(lm[i]>0||!cOn(x,y-2)){const v=Math.sin(x*.62+t*1.7)+Math.sin(y*.85-t*1.25+x*.35)+Math.sin((x+y)*.31+t*.9);if(v>1.55)lm[i]=Math.min(.45,lm[i]+.16*k)}}
    else if(mat==='brass'){if(lm[i]>0)lm[i]*=1.15}
    else if(mat==='star'){if(lm[i]===0&&dm[i]>=.98){const h=hsh(x,y);if(h<.035){const tw=.5+.5*Math.sin(t*3+h*400);if(tw>.55)glints.push([x,y,tw*.8,1])}}}
    else if(mat==='metal'||mat==='flesh'){/* 볼록한 왼쪽 위 모서리에 반짝임 */if(!cOn(x,y-1)&&(!cOn(x-1,y)||mat==='flesh')&&cOn(x+1,y)&&cOn(x,y+1)){const h=hsh(x,y);if(h<(mat==='metal'?.16:.07)){const tw=Math.max(0,Math.sin(t*(mat==='metal'?1.6:2.2)+h*60));if(tw>.2)glints.push([x,y,tw,mat==='metal'?2:1])}}}}
   if(glints.length>7){glints.sort((a,b2)=>b2[2]-a[2]);glints.length=7}}
  const wr=mat==='brass'?255:255,wg=mat==='brass'?238:250,wb=mat==='brass'?196:mat==='sea'?250:236;
  for(let Y=0;Y<H2;Y++){const cy=Math.min(ch-1,(Y/D)|0);for(let X=0;X<W2;X++){const p=(Y*W2+X)*4;if(d[p+3]<60)continue;const i=cy*cw+Math.min(cw-1,(X/D)|0);
   let r=LUT[d[p]],gg=LUT[d[p+1]],b=LUT[d[p+2]];const l=lm[i],m=dm[i],rr=rm[i];
   if(l){r+=(wr-r)*l;gg+=(wg-gg)*l;b+=(wb-b)*l}if(rr){r+=(cr-r)*rr;gg+=(cg-gg)*rr;b+=(cb-b)*rr}if(m!==1){r*=m;gg*=m;b*=m}
   d[p]=r;d[p+1]=gg;d[p+2]=b}}
  g.putImageData(img,0,0);
  /* 반짝임: 십자 빛 (금속은 크게, 별·생물은 작게) */for(const [x,y,a,sz] of glints){const X=x*D+(D>>1),Y=y*D+(D>>1);g.globalAlpha=Math.min(1,a)*k;g.fillStyle='#ffffff';g.fillRect(X-1,Y-1,2,2);if(sz>1){g.globalAlpha=Math.min(1,a)*.7*k;g.fillRect(X-D-1,Y-.5,D*2+2,1);g.fillRect(X-.5,Y-D-1,1,D*2+2)}else{g.globalAlpha=Math.min(1,a)*.5*k;g.fillRect(X-D+1,Y-.5,D*2-2,1);g.fillRect(X-.5,Y-D+1,1,D*2-2)}}g.globalAlpha=1}
 try{const _mf=monFinish;monFinish=function(c,A,x,y,u,ol){try{if(A&&!A.fl){if(A.texA==null)A.texA=.4;bossShade(A)}}catch(e){if(!SH.err){SH.err=1;console.error('v41 shade',e)}}return _mf.apply(this,arguments)}}catch(e){console.error('v41 mon',e)}

 /* ---------- 캐릭터: 셀아웃 외곽선 · 1도트 명암 ---------- */
 const CF={cv:null};
 function cfCv(){if(!CF.cv){CF.cv=document.createElement('canvas');CF.cv.width=40;CF.cv.height=48;CF.cv.getContext('2d',{willReadFrequently:true})}return CF.cv}
 try{const _f=ch2Finish;ch2Finish=function(src){const out=_f.apply(this,arguments);try{
   /* 원본 평면 그림(src)으로 판단하고, 완성본(out)에 칠한다 */
   const w=40,h=48,T=cfCv(),tg=T.getContext('2d');tg.setTransform(1,0,0,1,0,0);tg.globalCompositeOperation='source-over';tg.globalAlpha=1;tg.clearRect(0,0,w,h);tg.drawImage(src,0,0);
   const s=tg.getImageData(0,0,w,h).data;tg.clearRect(0,0,w,h);tg.drawImage(out,0,0);const oi=tg.getImageData(0,0,w,h),o=oi.data;
   const op=(X,Y)=>X>=0&&Y>=0&&X<w&&Y<h&&s[(Y*w+X)*4+3]>=80;
   for(let Y=0;Y<h;Y++)for(let X=0;X<w;X++){const p=(Y*w+X)*4;
    if(!op(X,Y)){/* 외곽선 칸: 붙어 있는 색 중 가장 진한 쪽을 어둡게 머금은 색 */if(o[p+3]<80)continue;let br=0,bg=0,bb=0,n=0;for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]])if(op(X+dx,Y+dy)){const q=((Y+dy)*w+X+dx)*4;br+=s[q];bg+=s[q+1];bb+=s[q+2];n++}
     if(n){o[p]=Math.round(12+br/n*.2);o[p+1]=Math.round(14+bg/n*.2);o[p+2]=Math.round(22+bb/n*.22)}continue}
    let r=o[p],g=o[p+1],b=o[p+2];const up=!op(X,Y-1),dn=!op(X,Y+1),rt=!op(X+1,Y);
    if(up){r+=(255-r)*.22;g+=(255-g)*.22;b+=(245-b)*.22}
    if(dn||rt){const m=dn&&rt?.78:.86;r*=m;g*=m;b*=m}
    /* 겹침 그림자: 위 칸이 다른 색(2칸 이상 이어진 덩어리)이고 나보다 밝지 않을 때 */
    if(!up&&Y>=2&&op(X,Y-2)){const q=((Y-1)*w+X)*4,q2=((Y-2)*w+X)*4,dr=s[q]-s[p],dg=s[q+1]-s[p+1],db=s[q+2]-s[p+2];
     if(dr*dr+dg*dg+db*db>2600&&Math.abs(s[q]-s[q2])+Math.abs(s[q+1]-s[q2+1])+Math.abs(s[q+2]-s[q2+2])<30&&lum(s[q],s[q+1],s[q+2])<=lum(s[p],s[p+1],s[p+2])+10){r*=.84;g*=.84;b*=.88}}
    o[p]=r;o[p+1]=g;o[p+2]=b}
   const oc=out.getContext('2d');oc.putImageData(oi,0,0)}catch(e){if(!CF.err){CF.err=1;console.error('v41 ch',e)}}return out}}catch(e){console.error('v41 chf',e)}
})();
/* ---------- 캐릭터 10명 잔디테일 (원래 그림 위에 같은 좌표계로 덧그림) ---------- */
(function(){if(typeof CH2DEF==='undefined')return;
 const ADD=[
  /* 0 하루: 머리 윤기 · 고글 끈 버클 · 조끼 단추 · 허리띠 · 회중시계 반짝 */
  (Q,f,b,bl,t)=>{Q.R(10,4+b,4,1,'#9a5a30');Q.px(9,5+b,'#9a5a30');Q.px(15,3+b,'#8a4a24');Q.px(5,8+b,'#c89a40');Q.px(22,8+b,'#c89a40');
   Q.px(10,22+b,'#1e5a58');Q.px(10,24+b,'#1e5a58');Q.px(11,22+b,'#e8c060');Q.px(11,24+b,'#e8c060');Q.R(8,26,12,1,'#5a3a22');Q.px(14,26,'#e8c060');
   if(Math.sin(t*3)>.6)Q.px(17,23+b,'#ffffff');Q.R(18,18+b,1,1,'#ffb08a')},
  /* 1 미나: 후드 귀 안쪽 줄 · 수염 · 앞머리 윤기 · 꼬리 줄무늬 · 소매 끝 */
  (Q,f,b,bl,t)=>{Q.px(8,3+b,'#ff7ab0');Q.px(20,3+b,'#ff7ab0');Q.px(10,11+b,'#b07a5a');Q.px(11,11+b,'#b07a5a');
   Q.R(6,16+b,2,1,'#d06a94',.8);Q.R(20,16+b,2,1,'#d06a94',.8);Q.R(8,4+b,1,1,'#ffc0dc');Q.R(7,8+b,1,6,'#ffb8d6',.8);Q.R(21,8+b,1,6,'#d06a94',.6);
   const tw=Math.sin(t*4)*2;Q.px(21,25,'#d06a94');Q.px(23+tw*.5,22,'#d06a94');Q.R(9,26,11,1,'#ffd0e0',.7)},
  /* 2 도윤: 안전모 광택 · 램프 빛무리 · 멜빵 주머니 · 바느질 · 장갑 */
  (Q,f,b,bl,t)=>{Q.R(8,6+b,3,1,'#fff6c0');Q.px(7,7+b,'#fff6c0');Q.C(14,6+b,3.4,'#fff6a0',.22);Q.R(12,23+b,4,2,'#3a5a7a');Q.R(12,23+b,4,1,'#6a8aaa');
   for(let i=0;i<4;i++)Q.px(10+i*2,27,'#6a8aaa',.8);Q.R(9,19+b,1,1,'#ffd08a');Q.R(19,19+b,1,1,'#a8461a')},
  /* 3 세라: 모자 별 무늬 · 은발 윤기/그늘 · 망토 안감 · 소매 별 */
  (Q,f,b,bl,t)=>{const tw=.5+.5*Math.sin(t*5);Q.px(15,4+b,'#ffe36b',.6+.4*tw);Q.px(12,6+b,'#ffe36b',.5);Q.px(17,1+b,'#c8a8ff');
   Q.R(7,14+b,1,8,'#eef0ff');Q.R(20,14+b,1,8,'#9a9ac0');Q.R(9,10+b,3,1,'#eef0ff');Q.R(6,27,2,1,'#ffe36b',.7);Q.R(20,27,2,1,'#ffe36b',.7);Q.px(9,22+b,'#ffe36b')},
  /* 4 강철: 크롬 반사 · 리벳 · 볼 램프 · 배 패널 · 제트 불꽃 */
  (Q,f,b,bl,t)=>{Q.R(8,6+b,5,1,'#ffffff');Q.px(19,6+b,'#ffffff');for(const [x,y] of [[7,7],[20,7],[7,16],[20,16]])Q.px(x,y+b,'#5a6a74');
   Q.px(8,15+b,'#ff9ab0',.8);Q.px(19,15+b,'#ff9ab0',.8);Q.R(9,27,10,1,'#2e4a5e');Q.px(9,20+b,'#eef4f8');Q.px(18,20+b,'#7a8a94')},
  /* 5 루나: 투구 광택 · 눈빛 번짐 · 가슴 초승달 문장 · 망토 걸쇠 보석 */
  (Q,f,b,bl,t)=>{Q.R(9,6+b,3,1,'#ffffff');Q.px(8,7+b,'#ffffff');if(!bl){Q.R(8,12+b,6,3,'#8dd8ff',.18);Q.R(14,12+b,6,3,'#8dd8ff',.18)}
   Q.px(13,22+b,'#fff0a0');Q.px(14,23+b,'#fff0a0');Q.px(13,24+b,'#fff0a0');Q.R(7,19+b,2,2,'#8dd8ff');Q.px(7,19+b,'#ffffff');Q.R(19,19+b,2,2,'#8dd8ff')},
  /* 6 카이: 복면 주름 · 머리띠 매듭 · 사선 띠 · 표창 반짝 · 눈 빛 */
  (Q,f,b,bl,t)=>{Q.R(10,17+b,8,1,'#2e2e40');Q.R(20,8+b,2,3,'#c8202e');Q.px(21,8+b,'#ff7a84');Q.L(9,19+b,18,25+b,'#3a3a4e');
   if(Math.sin(t*2.5)>.7)Q.px(17,24+b,'#ffffff');if(!bl){Q.px(10,12+b,'#ffffff');Q.px(17,12+b,'#ffffff')}},
  /* 7 아린: 잎맥 · 앞머리 윤기 · 날개 반짝 · 치마 꽃잎 끝 */
  (Q,f,b,bl,t)=>{b+=Math.round(Math.sin(t*3)*1)-1;Q.R(10,6+b,4,1,'#9af0b0');Q.px(16,5+b,'#9af0b0');Q.L(9,21+b,12,26,'#2e8a4a',.6);Q.L(19,21+b,16,26,'#2e8a4a',.6);
   const s=Math.floor(t*6)%4;Q.px(3+s,16+b,'#ffffff',.8);Q.px(24-s,17+b,'#ffffff',.8);for(let i=0;i<5;i++)Q.px(6.5+i*3.6,29,'#9af0b0',.7)},
  /* 8 제노: 비늘 하이라이트 · 뿔 결 · 눈 불빛 번짐 · 가슴 보석 */
  (Q,f,b,bl,t)=>{for(let j=0;j<3;j++)for(let i=0;i<4;i++)Q.px(9+i*3+(j%2)*1.5,21+j*2+b,'#ff7a7a',.8);for(const s of [-1,1]){Q.px(14+s*9,3+b,'#c8bea0');Q.px(14+s*10,1+b,'#c8bea0')}
   if(!bl){Q.R(8,12+b,5,3,'#ffcf3a',.2);Q.R(15,12+b,5,3,'#ffcf3a',.2)}Q.R(9,7+b,3,1,'#ff6a70');Q.C(14,20+b,1.1,'#ffcf3a');Q.px(14,19+b,'#ffffff')},
  /* 9 오로라: 갑옷 광택 · 금테 · 보석 반짝 · 빛의 고리 안쪽 */
  (Q,f,b,bl,t)=>{Q.R(8,8+b,3,1,'#ffffff');Q.px(7,9+b,'#ffffff');Q.R(7,27,14,1,'#ffd84a',.8);Q.R(6,21+b,1,5,'#ffd84a',.7);Q.R(21,21+b,1,5,'#ffd84a',.7);
   if(Math.sin(t*3)>.5){Q.px(13,22+b,'#ffffff');Q.px(14,4+b,'#ffffff')}const r=.5+.5*Math.sin(t*2);Q.o.save();Q.o.globalAlpha=.12+.1*r;Q.o.fillStyle='#fff6c8';Q.o.beginPath();Q.o.ellipse(20,5+b,6,1.6,0,0,TAU);Q.o.fill();Q.o.restore()}];
 CH2DEF.forEach((D,i)=>{if(!D||!ADD[i]||D.__v41)return;const p=D.paint;D.paint=function(Q,f,b,bl,t){p.apply(this,arguments);try{ADD[i](Q,f,b,bl,t)}catch(e){}};D.__v41=1})})();
