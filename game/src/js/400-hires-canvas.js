/* ================= 선명한 글씨: 고해상도 캔버스 + 깔끔한 글꼴 =================
   도트 그림은 정수 배율로 그대로 크게, 글씨는 실제 화면 해상도로 그린다. */
const FONT_STACK="'Pretendard','Apple SD Gothic Neo','Malgun Gothic','Noto Sans KR','Segoe UI',sans-serif";
(function(){try{const pr=CanvasRenderingContext2D.prototype,fd=Object.getOwnPropertyDescriptor(pr,'font');if(fd&&fd.set&&!pr._fontPatched){pr._fontPatched=1;
 Object.defineProperty(pr,'font',{configurable:true,get(){return fd.get.call(this)},set(v){fd.set.call(this,typeof v==='string'?v.replace(/\bmonospace\b/g,FONT_STACK):v)}})}}catch(e){}})();
let SS=1,_lastCss=W*2;
/* 자동 품질: 프레임이 계속 느리면 해상도 배율을 한 단계씩 낮춘다 (모바일은 처음부터 최대 2배) */
const _pf={ema:16,n:0,cap:4,last:0};
function perfTick(now){}
function applyHiRes(css){_lastCss=css||_lastCss;const dpr=(typeof devicePixelRatio==='number'&&devicePixelRatio)||1,want=Math.max(2,Math.min(4,Math.round((_lastCss)/W*dpr)));
 if(want===SS&&cv.width===W*want)return;SS=want;cv.width=W*SS;cv.height=H*SS;ctx.setTransform(SS,0,0,SS,0,0);ctx.imageSmoothingEnabled=false}
function fitBattle(){const v=$('battleView');if(v.hidden)return;const w=v.clientWidth||innerWidth,h=(v.clientHeight||innerHeight)-42,s=Math.max(.2,Math.min((w-8)/W,h/H)),a=$('arena');a.style.width=(W*s)+'px';a.style.height=(H*s)+'px';a.style.setProperty('--u',s+'px');applyHiRes(W*s)}
(function(){try{applyHiRes(W*2);
 const t1=$('titleCv');if(t1&&typeof tctx!=='undefined'&&t1.width===480){t1.width=480*3;t1.height=190*3;tctx.setTransform(3,0,0,3,0,0);tctx.imageSmoothingEnabled=false}
 const t2=$('titleCv2');if(t2&&t2.width===480){t2.width=480*3;t2.height=190*3;const c=t2.getContext('2d');c.setTransform(3,0,0,3,0,0)}
 cv.style.imageRendering='auto';}catch(e){}})();
function shText(txt,x,y,col,sh){const q=_cx||ctx;q.fillStyle=sh||'#000';q.fillText(txt,x+.7,y+.7);q.fillStyle=col;q.fillText(txt,x,y)}
function hudText(t,tx,ty,al,col,f){const q=_cx||ctx;q.font=f;q.textAlign=al;q.lineJoin='round';q.lineWidth=2.2;q.strokeStyle='#000';q.strokeText(t,tx,ty);q.fillStyle=col;q.fillText(t,tx,ty)}
/*HIR_END*/
/*FIN2_BEGIN*/
