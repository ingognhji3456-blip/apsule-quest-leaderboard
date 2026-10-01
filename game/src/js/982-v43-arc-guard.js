/* ================= v43 안전장치: 음수 반지름으로 원을 그리면 브라우저가 오류를 내며 그 애니메이션이 멈춤 (시작 화면 등) → 0으로 고정 ================= */
(function(){try{const P=CanvasRenderingContext2D.prototype,a=P.arc,e=P.ellipse;P.arc=function(x,y,r,s,en,cc){return a.call(this,x,y,r>0?r:0,s,en,cc)};if(e)P.ellipse=function(x,y,rx,ry,rot,s,en,cc){return e.call(this,x,y,rx>0?rx:0,ry>0?ry:0,rot,s,en,cc)}}catch(e){}})();
