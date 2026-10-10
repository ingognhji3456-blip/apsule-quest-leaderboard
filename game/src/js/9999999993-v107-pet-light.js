/* ================= v107 펫 빛 칠하기 (PET107) — 정해진 10~20색 → 칸마다 다른 수백 가지 색 =================
   PET105가 펫 몸(body 층)을 다 그린 직후 이 단계가 한 번 칠한다(그림은 1/12초 틀마다 기억되니 매 프레임 계산하지 않음).
   1) 몸 모양에서 「가장자리까지 거리」를 재서 둥근 입체(높이)를 만든다.
   2) 높이의 기울기로 왼쪽 위에서 오는 빛을 계산 → 밝은 쪽은 밝게 · 따뜻하게(노랑 쪽), 어두운 쪽은 어둡게 · 차갑게(파랑 쪽).
   3) 빛 받는 테두리 안쪽엔 반사광(림), 반대쪽 테두리엔 오목한 그늘, 아주 옅은 결(질감) 무늬.
   4) 눈 · 반짝이처럼 아주 밝은 칸과 외곽선처럼 아주 어두운 칸은 그대로 둔다.
   PET107.on=false로 끄면 예전처럼 평평한 색. 세기는 K. */
(()=>{try{
 const K={light:.26,rim:.1,ao:.1,form:.11,warm:8,cool:12,grain:.025,maxD:9};
 function rgb2hsl(r,g,b){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let h=0,s=0;if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;h*=60}return [h,s,l]}
 function hsl2rgb(h,s,l){h=((h%360)+360)%360;const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;let r=0,g=0,b=0;if(h<60){r=c;g=x}else if(h<120){r=x;g=c}else if(h<180){g=c;b=x}else if(h<240){g=x;b=c}else if(h<300){r=x;b=c}else{r=c;b=x}return [Math.round((r+m)*255),Math.round((g+m)*255),Math.round((b+m)*255)]}
 const toward=(h,tg,amt)=>{const df=((tg-h+540)%360)-180;return h+Math.sign(df)*Math.min(Math.abs(df),amt)};
 const cl=(v,a,b)=>v<a?a:v>b?b:v;
 const hash=(x,y)=>{const v=Math.sin(x*127.1+y*311.7)*43758.5453;return v-Math.floor(v)};
 let D=null,Hh=null;
 function shade(o,S){const im=o.getImageData(0,0,S,S),d=im.data,N=S*S;if(!D||D.length!==N){D=new Float32Array(N);Hh=new Float32Array(N)}
  for(let i=0;i<N;i++)D[i]=d[i*4+3]>8?99:0;
  const at=(x,y)=>(x<0||y<0||x>=S||y>=S)?0:D[y*S+x];
  for(let y=0;y<S;y++)for(let x=0;x<S;x++){const i=y*S+x;if(!D[i])continue;D[i]=Math.min(D[i],at(x-1,y)+1,at(x,y-1)+1,at(x-1,y-1)+1.4,at(x+1,y-1)+1.4)}
  for(let y=S-1;y>=0;y--)for(let x=S-1;x>=0;x--){const i=y*S+x;if(!D[i])continue;D[i]=Math.min(D[i],at(x+1,y)+1,at(x,y+1)+1,at(x+1,y+1)+1.4,at(x-1,y+1)+1.4)}
  for(let i=0;i<N;i++)Hh[i]=D[i]?Math.sqrt(Math.min(D[i],K.maxD)/K.maxD):0;
  let x0=S,x1=0,y0=S,y1=0;for(let y=0;y<S;y++)for(let x=0;x<S;x++)if(D[y*S+x]){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}const cx=(x0+x1)/2,cy=(y0+y1)/2,bw=Math.max(8,x1-x0),bh=Math.max(8,y1-y0);
  const hv=(x,y)=>(x<0||y<0||x>=S||y>=S)?0:Hh[y*S+x];
  for(let y=0;y<S;y++)for(let x=0;x<S;x++){const i=y*S+x,p=i*4;if(d[p+3]<=8)continue;
   const [h,s,l]=rgb2hsl(d[p],d[p+1],d[p+2]);if(l<.13)continue;
   const gx=(hv(x+1,y)-hv(x-1,y))/2,gy=(hv(x,y+1)-hv(x,y-1))/2,lit=.6*gx+.8*gy,e=D[i];
   let dl=cl(lit/.35,-1,1)*K.light;
   if(e<=1.5)dl+=lit>0?K.rim:-K.ao;
   /* 몸 전체 명암: 위 · 왼쪽 밝게, 아래 · 오른쪽 어둡게 */dl+=((cy-y)/bh*1.0+(cx-x)/bw*.4)*K.form;
   if(l>.95&&dl>0)dl=0;
   dl+=(hash(x,y)-.5)*K.grain;dl=cl(dl,-.22,.16);
   let h2=h,s2=s,l2=cl(l+(dl>0?dl*Math.min(1,(1-l)*1.6):dl*(.55+l*.45)),0,1);
   if(dl<0){h2=toward(h,(h<70||h>320)?(h<70?h-25:h+25):232,Math.min(K.cool,-dl*70));s2=cl(s+(-dl)*.35+(s<.08?-dl*.4:0),0,1)}
   else{h2=s<.06?h:toward(h,48,Math.min(K.warm,dl*60));s2=cl(s-dl*.15,0,1)}
   const [R,G,B]=hsl2rgb(h2,s2,l2);d[p]=R;d[p+1]=G;d[p+2]=B}
  o.putImageData(im,0,0)}
 window.PET107={shade,K,on:true};
}catch(e){console.error('v107 pet light',e)}})();
