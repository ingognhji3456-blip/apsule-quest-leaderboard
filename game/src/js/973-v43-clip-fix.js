/* ================= v43 잘린 보스 수정: 그림판보다 크게 그려지는 보스(챕터 5 전원 · 챕터 4 일부 · 익스트림 장식)는 넓은 그림판에서 그린다 ================= */
(function(){const BIG={b7:1,c_s4_comet:1,c_s4_void:1,c_s4_nova:1,c_s4_last:1};try{for(const s of S5)BIG['c_s5_'+s.art.replace(/^s5_/,'')]=1;for(const s of S5)BIG['c_'+s.art]=1}catch(e){}
 const L={SW:80,SH:70,OX:40,OY:58,S:null,F:null,T:null,tex:null};
 function mk(){if(L.S)return;const D=MON.D;for(const k of ['S','F','T']){const c=document.createElement('canvas');c.width=L.SW*D;c.height=L.SH*D;if(k==='S')c.getContext('2d',{willReadFrequently:true});L[k]=c}}
 try{const _md=monDraw;monDraw=function(key){if(!BIG[key])return _md.apply(this,arguments);mk();monCv();const sv={SW:MON.SW,SH:MON.SH,OX:MON.OX,OY:MON.OY,S:MON.S,F:MON.F,T:MON.T,tex:MON.tex};
   MON.SW=L.SW;MON.SH=L.SH;MON.OX=L.OX;MON.OY=L.OY;MON.S=L.S;MON.F=L.F;MON.T=L.T;MON.tex=L.tex;
   try{return _md.apply(this,arguments)}finally{L.tex=MON.tex;Object.assign(MON,sv)}}}catch(e){console.error('v43 clip',e)}
 window.__V43BIG=BIG})();

