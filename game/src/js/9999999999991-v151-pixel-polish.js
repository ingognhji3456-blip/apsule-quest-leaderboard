/* v151: 도트 아이콘 다듬기 · 아이콘 크기 고정 (PX151)
   ① 도트 아이콘(LP146 · SO149가 만든 --sp-이름)을 4배로 다시 그리면서 칸마다 빛(위 · 왼쪽 밝게) · 그림자(아래 · 오른쪽 어둡게)와
      가는 테두리를 넣는다 → 뭉툭하던 도트가 섬세해 보임.
   ② 창 안의 도트 아이콘(.px149 · .sp)이 원래 단추의 꾸밈(예: 탑 고르기 카드 `.dCard i{font-size:40px}`)을 물려받아
      크게 부풀던 것(결투 · 듀오 단추가 커 보였음) → 아이콘 칸은 무엇에도 영향받지 않게 고정.
   ③ 폰 · 패드 가로 탑 고르기 카드: 그림 · 단추를 줄여 한 화면에.
   ④ 폰 로비 카드 · 단추를 조금 작게. */
(function(){try{
 const RT=document.documentElement;
 const st=document.createElement('style');st.id='px151css';st.textContent=`
 i.px149,i.px149.px149{all:unset!important;display:inline-block!important;flex:none!important;width:1.15em!important;height:1.15em!important;vertical-align:-.2em!important;
  background:var(--x) center/contain no-repeat!important;image-rendering:pixelated!important;margin:0 .1em!important}
 html.lp #duo85 .dCard em{font-size:12px!important;padding:6px 14px!important;white-space:nowrap!important;display:inline-flex!important;align-items:center;gap:6px;max-width:100%}
 html.lpL #duo85 .dPk .dCard{padding:6px 8px 8px!important;gap:2px!important}
 html.lpL #duo85 .dPk .dCard .dScn{height:min(110px,24dvh)!important}
 html.lpL #duo85 .dPk .dCard b{font-size:17px!important}
 html.lpL #duo85 .dPk .dCard small{font-size:11px!important}
 html.lpL #duo85 .dPk .dCard em{font-size:11.5px!important;padding:5px 12px!important}
 /* ④ 폰 로비 단추 조금 작게(커 보였음) */
 html.ph.lpP #lp146 .cd{height:66px}
 html.ph.lpP #lp146 .cd>i.sp:not(.dc){width:34px;height:34px}
 html.ph.lpP #lp146 .cd b{font-size:13.5px}
 html.ph.lpP #lp146 .pl{height:50px;font-size:18px}
 html.ph.lpP #lp146 .bt button{height:46px;font-size:11px}
 html.ph.lpP #lp146 .bt button>i.sp{width:20px;height:18px}
 html.ph.lpP #lp146 .rk{height:32px}
 html.ph.lpL #lp146 .pl{height:42px;font-size:16px}
 html.ph.lpL #lp146 .bt button{height:40px}`;
 document.head.appendChild(st);
 /* ① 다듬기 */
 const S=4,mix=(r,g,b,t,k)=>[r+(t-r)*k,g+(t-g)*k,b+(t-b)*k].map(v=>Math.round(v));
 function polish(img){const w=img.naturalWidth,h=img.naturalHeight;if(!w||!h||w>40||h>40)return null;
  const a=document.createElement('canvas');a.width=w;a.height=h;const ax=a.getContext('2d');ax.drawImage(img,0,0);const d=ax.getImageData(0,0,w,h).data;
  const A=(x,y)=>x>=0&&y>=0&&x<w&&y<h&&d[(y*w+x)*4+3]>40;const C=(x,y)=>{const i=(y*w+x)*4;return [d[i],d[i+1],d[i+2]]};
  const o=document.createElement('canvas');o.width=(w+2)*S;o.height=(h+2)*S;const x=o.getContext('2d');const rgb=c=>'rgb('+c[0]+','+c[1]+','+c[2]+')';
  /* 테두리: 빈칸이 그림과 닿은 쪽에 반 칸 두께 */
  for(let yy=-1;yy<=h;yy++)for(let xx=-1;xx<=w;xx++){if(A(xx,yy))continue;const N=[[0,-1],[0,1],[-1,0],[1,0]].filter(([dx,dy])=>A(xx+dx,yy+dy));if(!N.length)continue;
   const c=C(xx+N[0][0],yy+N[0][1]),k=mix(c[0],c[1],c[2],0,.78);x.fillStyle=rgb(k);const px=(xx+1)*S,py=(yy+1)*S,hS=S/2;
   for(const [dx,dy] of N){if(dx===1)x.fillRect(px+S-hS,py,hS,S);if(dx===-1)x.fillRect(px,py,hS,S);if(dy===1)x.fillRect(px,py+S-hS,S,hS);if(dy===-1)x.fillRect(px,py,S,hS)}}
  /* 칸 + 빛 · 그림자 */
  for(let yy=0;yy<h;yy++)for(let xx=0;xx<w;xx++){if(!A(xx,yy))continue;const c=C(xx,yy),px=(xx+1)*S,py=(yy+1)*S;x.fillStyle=rgb(c);x.fillRect(px,py,S,S);
   if(!A(xx,yy-1)){x.fillStyle=rgb(mix(...c,255,.38));x.fillRect(px,py,S,1)}
   if(!A(xx-1,yy)){x.fillStyle=rgb(mix(...c,255,.22));x.fillRect(px,py,1,S)}
   if(!A(xx,yy+1)){x.fillStyle=rgb(mix(...c,0,.38));x.fillRect(px,py+S-1,S,1)}
   if(!A(xx+1,yy)){x.fillStyle=rgb(mix(...c,0,.25));x.fillRect(px+S-1,py,1,S)}
   /* 넓은 면은 가운데에 작은 반짝임 */
   if(A(xx-1,yy)&&A(xx+1,yy)&&A(xx,yy-1)&&!A(xx,yy-2)&&((xx+yy)%3===0)){x.fillStyle=rgba(mix(...c,255,.6),.55);x.fillRect(px+1,py+1,1,1)}}
  return o.toDataURL()}
 const rgba=(c,a)=>'rgba('+c[0]+','+c[1]+','+c[2]+','+a+')';
 const done={};
 function run(){const cs=RT.style;for(let i=0;i<cs.length;i++){const k=cs[i];if(!k.startsWith('--sp-')||done[k])continue;const v=cs.getPropertyValue(k),m=v.match(/url\("?(data:image\/png;base64,[^")]+)"?\)/);if(!m)continue;done[k]=1;
   const img=new Image();img.onload=()=>{try{const u=polish(img);if(u)RT.style.setProperty(k,'url("'+u+'")')}catch(e){}};img.src=m[1]}}
 run();setTimeout(run,500);setTimeout(run,2000);
 window.PX151={v:1,run};
}catch(e){console.warn('v151',e)}})();
