/* v138: 스킬 이름은 맨 위 층에 (SKT138)
   신화 스킬 · 클라비스 열쇠 검술이 터지면 MYTH100.S.flash[스킬]에 시각이 적힌다. 전에는 각 파일이 머리 위 글자로 그려서
   보스 그림 · 말풍선 · 다른 효과 밑에 가려졌다 → 맨 마지막 파일에서 모든 그림 위에, 어두운 띠를 깐 이름표로 다시 그림.
   자리는 캐릭터 머리 위, 여러 개면 위로 쌓음. (스킬 칩 줄은 999999992 hud가 화면 위쪽에 그림) 탑 · 보스전 · 결투 · 던전 어디서나. */
(function(){try{
 const DUR=1100;
 const fighting=()=>{try{if(window.WATCH95&&WATCH95.specOn&&WATCH95.specOn())return false;if(mode==='tower')return !!(window.TW71&&TW71.T);if(mode==='boss')return typeof G!=='undefined'&&G&&G.state==='play';return mode==='dg129'||mode==='sec127'}catch(e){return false}};
 function rr(o,x,y,w,h,r){o.beginPath();o.moveTo(x+r,y);o.arcTo(x+w,y,x+w,y+h,r);o.arcTo(x+w,y+h,x,y+h,r);o.arcTo(x,y+h,x,y,r);o.arcTo(x,y,x+w,y,r);o.closePath()}
 {const _f=frame;frame=function(){const r=_f.apply(this,arguments);try{if(!window.MYTH100||!fighting())return r;const n=performance.now(),F=MYTH100.S.flash||{},A=MYTH100.ABL||{};
   const L=Object.keys(F).filter(k=>A[k]&&n-F[k]<DUR).sort((a,b)=>F[b]-F[a]).slice(0,4);if(!L.length)return r;
   const o=ctx;o.save();try{o.setTransform(SS,0,0,SS,0,0)}catch(e){}o.font='900 9px sans-serif';o.textAlign='center';o.textBaseline='middle';
   const hx=Math.max(60,Math.min(W-60,P.x)),y0=Math.max(70,P.y-52);
   L.forEach((k,i)=>{const a=A[k],t=(n-F[k])/DUR,al=t<.1?t/.1:t>.75?(1-t)/.25:1,sc=t<.12?1.25-t*2:1,tx=a.ico+' '+a.n,w=o.measureText(tx).width+14,yy=y0-i*14-t*6;
    o.save();o.globalAlpha=al;o.translate(hx,yy);o.scale(sc,sc);rr(o,-w/2,-6.5,w,13,6.5);o.fillStyle='rgba(5,7,12,.82)';o.fill();o.lineWidth=1.2;o.strokeStyle=a.col||'#ffffff';o.stroke();
    o.fillStyle=a.col||'#ffffff';o.fillText(tx,0,.5);o.restore()});
   o.restore();try{if(document.documentElement.classList.contains('phP')&&window.PV76&&PV76.paint)PV76.paint()}catch(e){}}catch(e){}return r}}
 window.SKT138={DUR};
}catch(e){console.warn('v138',e)}})();
