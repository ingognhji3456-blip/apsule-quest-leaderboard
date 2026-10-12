/* ================= v178 현질 세트 강화 (SP178) =================
   세트(스킨 + 같은 세트 검, CB81.setOn)를 맞추면 세트 효과(9999996 SETB)에 더해 세 세트 공통으로:
   공격 +20%(CB81.dmgMul) · 받는 피해 -20%(CB81.onHurt) · 최대 체력 +30%(charStats) · 세트 궁극기 피해 +60%(SP178.ult()를 999991 · 999997 · SK130이 곱함).
   결투(PvP · 팀 결투)에서는 공통 보너스를 끈다(레벨 특성 LV154와 같은 규칙). */
(function(){try{
 const C=window.CB81;if(!C)return;
 const K={atk:.2,def:.2,hp:.3,ult:.6};
 const pvp=()=>{try{return !!(window.PVP92&&PVP92.on())}catch(e){return false}};
 const on=()=>{try{return !!C.setOn()&&!pvp()}catch(e){return false}};
 /* 세트 설명에 공통 보너스 덧붙임(상점 · 공방 설명이 SETB[k].d를 읽음) */
 try{for(const k in C.SETB){const b=C.SETB[k];if(!/공통/.test(b.d))b.d+=' · 공통: 공격 +20% · 받는 피해 -20% · 체력 +30% · 세트 궁극기 피해 +60%'}}catch(e){}
 {const f=C.dmgMul;C.dmgMul=function(){let m=f.apply(this,arguments);try{if(on())m*=1+K.atk}catch(e){}return m}}
 {const f=C.onHurt;C.onHurt=function(dmg){let d=f.apply(this,arguments);try{if(on()&&d>0)d=Math.max(1,Math.round(d*(1-K.def)))}catch(e){}return d}}
 if(typeof charStats==='function'){const f=charStats;charStats=function(i){const r=f.apply(this,arguments);try{if(on()&&r&&r.hp)r.hp=Math.round(r.hp*(1+K.hp))}catch(e){}return r}}
 window.SP178={K,on,ult:()=>on()?1+K.ult:1};
}catch(e){console.error('SP178',e)}})();
