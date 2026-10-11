/* ================= v158 광장 전부 도트로 (PXL) =================
   광장에 있는 모든 그림(바닥 · 건물 · 가게 · 상인 · 나무 · 가로등 · 분수 · 회전목마 · 풍차 · 무대 · 배 · 새 …)을 도트 그림으로 바꾸는 공용 도구.
   - snap(): 그림을 한 칸씩 다시 찍는다 — 반투명 가장자리는 없애고(있다/없다 둘 중 하나), 색은 단계별로 끊고(4×4 바둑 무늬 섞기),
     바깥 둘레에 한 칸 짜리 진한 테두리를 넣는다. 물체 칸 크기는 게임 1칸의 절반(G=2), 바닥은 1칸.
   - stamp(c,열쇠,x0,y0,w,h,x,y,그리기): 움직이는 물체는 몇 장의 장면(열쇠에 장 번호)을 처음 필요할 때 도트로 찍어 두고 그 장을 붙인다.
     한 프레임에 찍는 시간은 7ms까지(넘으면 이번만 원래 그림으로 그림 → 멈춤 없음).
   - img(T): 미리 그려 둔 캔버스(T.cv, T.w, T.h)를 도트로 다시 찍은 것(T._px).
   - 바닥 배경(가운데 · 바깥)은 들어간 뒤 띠로 나눠 천천히 도트로 바꾼다. 광장을 나가면 찍어 둔 장면은 비운다. */
(()=>{try{
 const G=2,STEP=22,BY=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5].map(v=>v/16-.47);
 function snapData(d,w,h,o){o=o||{};const st=o.step||STEP,di=o.dith==null?.6:o.dith,ath=o.ath||110;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=(y*w+x)*4;if(d[i+3]<ath){d[i+3]=0;continue}d[i+3]=255;const b=BY[(y&3)*4+(x&3)]*st*di;
   for(let k=0;k<3;k++){let v=Math.round((d[i+k]+b)/st)*st;d[i+k]=v<0?0:v>255?255:v}}
  if(o.outline!==false){const n=w*h,m=new Uint8Array(n);for(let j=0;j<n;j++)m[j]=d[j*4+3]?1:0;
   for(let y=0;y<h;y++)for(let x=0;x<w;x++){const j=y*w+x;if(m[j])continue;let q=-1;if(y<h-1&&m[j+w])q=j+w;else if(x>0&&m[j-1])q=j-1;else if(x<w-1&&m[j+1])q=j+1;else if(y>0&&m[j-w])q=j-w;if(q<0)continue;
    const i=j*4,p=q*4;d[i]=d[p]*.28;d[i+1]=d[p+1]*.26;d[i+2]=d[p+2]*.34+8;d[i+3]=255}}}
 function snap(cv,o){const x=cv.getContext('2d');const im=x.getImageData(0,0,cv.width,cv.height);snapData(im.data,cv.width,cv.height,o);x.putImageData(im,0,0);return cv}
 function resnap(src,w,h,o){const cv=document.createElement('canvas');cv.width=Math.max(1,Math.ceil(w*G));cv.height=Math.max(1,Math.ceil(h*G));const x=cv.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.drawImage(src,0,0,cv.width,cv.height);return snap(cv,o)}
 /* 프레임마다 찍는 시간 제한 */let fid=0,bf=-1,used=0;(function tk(){fid++;requestAnimationFrame(tk)})();
 const can=()=>{if(bf!==fid){bf=fid;used=0}return used<7},spend=t0=>{used+=performance.now()-t0};
 const C=new Map();
 function stamp(c,key,x0,y0,w,h,x,y,fn,o){let cv=C.get(key);
  if(!cv){if(!can()){c.save();c.translate(x,y);try{fn(c)}catch(e){}c.restore();return}const t0=performance.now();cv=document.createElement('canvas');cv.width=Math.ceil(w*G);cv.height=Math.ceil(h*G);const g=cv.getContext('2d');g.scale(G,G);g.translate(-x0,-y0);try{fn(g)}catch(e){}snap(cv,o);C.set(key,cv);spend(t0)}
  const sm=c.imageSmoothingEnabled;c.imageSmoothingEnabled=false;c.drawImage(cv,Math.round((x+x0)*G)/G,Math.round((y+y0)*G)/G,w,h);c.imageSmoothingEnabled=sm}
 function img(T,o){if(!T||!T.cv)return null;if(T._px)return T._px;if(!can())return T.cv;const t0=performance.now();T._px=resnap(T.cv,T.w,T.h,o);spend(t0);return T._px}
 /* 장 번호: 주기 P초를 N장으로 → [번호, 그 장의 시각(ms)] */
 const fr=(now,P,N)=>{const k=Math.floor(((now/1000)%P+P)%P/P*N)%N;return [k,k/N*P*1000]};
 /* 바닥 배경: 띠로 나눠 천천히 */
 function snapBg(cv,o,done){const x=cv.getContext('2d'),w=cv.width,band=48;let y=0;const run=()=>{try{const h=Math.min(band,cv.height-y);if(h<=0){done&&done();return}const im=x.getImageData(0,0+y,w,h);snapData(im.data,w,h,Object.assign({outline:false,step:18,dith:.7},o));
   /* 바둑 무늬가 띠 경계에서 이어지게: 띠 시작 y가 4의 배수 */x.putImageData(im,0,y);y+=h}catch(e){return}setTimeout(run,0)};setTimeout(run,0)}
 /* 바깥 배경은 PB156 조각이 다 그려진 뒤(마지막 조각) */
 if(window.PB156&&PB156.extra)PB156.extra.push(o=>{try{snapBg(o.canvas,{})}catch(e){}});
 if(window.PLZART){const f=PLZART.build;PLZART.build=function(){const core=f.apply(this,arguments);try{if(core&&!core._pxq){core._pxq=1;snapBg(core,{})}}catch(e){}return core}}
 /* 광장을 나가면 찍어 둔 장면 비우기 */setInterval(()=>{try{if(C.size&&!(window.PLZ111&&PLZ111.S.on))C.clear()}catch(e){}},3000);
 /* 둥근 고리를 점으로 */function ring(c,x,y,rx,ry,col){c.fillStyle=col;const n=Math.max(8,Math.round((rx+ry)*2.2));for(let i=0;i<n;i++){const a=i/n*Math.PI*2;c.fillRect(Math.round(x+Math.cos(a)*rx),Math.round(y+Math.sin(a)*ry),1,1)}}
 window.PXL={v:1,G,snap,resnap,stamp,img,fr,ring,cache:C};
}catch(e){console.error('v158 pixel',e)}})();
