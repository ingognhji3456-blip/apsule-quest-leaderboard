/* ===== fix31 : 아스트라 v30 점검 후 보완 — 챕터 5 난이도별 추가 패턴 · 가로 화면 챕터 5 목록/러시 음악 칸 정리 ===== */
/* 1) 챕터 5 보스도 난이도별 추가 공격 (보통 +3 · 어려움 +6 · 익스트림 +10) */
(function(){try{const add={s5_beacon:['등대','light',6,'laser','light'],s5_manta:['항로','page',6,'laser','plain'],s5_anchor:['닻','weight',6,'chain','plain'],s5_organ:['진주','bubble',6,'laser','light'],s5_nautilus:['어뢰','bubble',6,'laser','plain'],
 s5_eel:['전류','spark',5,'elec','elec'],s5_octopus:['종','echo',6,'laser','plain'],s5_whale:['모래','dust',6,'laser','plain'],s5_archive:['잉크','page',6,'laser','plain'],s5_heart:['귀환종','echo',7,'laser','light']};
 for(const [key,th] of Object.entries(add)){if(T5_SET[key])continue;T5_TH[key]=th;const seed=t5Hash(key),by=g=>t5Shuf(Object.values(T5_ARCH).filter(a=>a.grp===g).map(a=>a.id),seed+g.charCodeAt(0));const A=by('a'),M=by('m'),Hh=by('h');
  const tiers=[A.slice(0,3),M.slice(0,3),Hh.slice(0,2).concat([A[3],M[3]])];T5_SET[key]=tiers.map((ids,ti)=>ids.map(id=>{const R=T5_ARCH[id],nm='t5_'+key+'_'+id,kr=th[0]+' '+R.suf;defPat(nm,kr,R.chan,R.est,R.tip,t=>R.fn(t,th,Math.max(ti+1,t5L())));return nm}))}}catch(e){console.error('fix31 t5',e)}})();
/* 2) 가로 폰 화면 정리 */
(function(){const st=document.createElement('style');st.id='fix31Css';st.textContent=`
 #rpMusicCard{order:9}
 #bvTitle{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
 @media (orientation:landscape) and (max-height:500px){
  .s5Box{max-height:calc(100dvh - 12px)!important;padding:8px 12px!important}
  .s5Box h2{font-size:18px!important;margin:0!important}.s5Box header .gmBtn{padding:5px 10px;font-size:12px}
  .s5Story{font-size:11px!important;line-height:1.45!important;margin:4px 0 6px!important}
  .s5Layout{grid-template-columns:1.1fr 1fr!important;gap:10px!important}
  .s5Roster{grid-template-columns:repeat(5,1fr)!important;gap:4px!important}
  .s5Tile{padding:3px!important}.s5Tile canvas{height:40px!important;width:auto!important}.s5Tile b{font-size:9px!important;line-height:1.2}.s5Tile small{font-size:9px}
  .s5Layout article{font-size:12px}.s5Layout p{font-size:11px!important;margin:4px 0}
  .s5Actions{margin:6px 0!important}.s5Actions .gmBtn{font-size:12px;padding:6px 10px}
  #rqDetBtn{position:fixed!important;left:10px;bottom:72px;z-index:7;font-size:11px!important;padding:5px 9px!important}
  #rpMusicCard .rpMusicFooter span{display:none}#rpMusicCard{padding:6px 8px!important}
  #gmRush.rqFull .gmHead{flex-wrap:nowrap!important}#gmRush.rqFull .gmTabs{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none}#gmRush.rqFull .gmTabs .gmPill{white-space:nowrap;flex:0 0 auto}
 }`;(document.head||document.body).appendChild(st)})();
/* 3) 추적자 탄: 위치 함수를 먼저 달고 만들기 (새 NP 가 생성 순간 위치를 읽음) */
try{T5_ARCH.homing.fn=(t,th,L)=>{const n=1+L,tel=t5T(),life=4.5,s=t5S();
 for(let k=0;k<n;k++){const T0=t+k*.7;sch(T0,()=>{const [cx,cy]=t5Core(),a=Math.atan2(P.y-cy,P.x-cx),q={k:'orb',sty:th[1],r:th[2]+1,dmg:11,t0:T0,t1:T0+tel,t2:T0+tel+life,cx,cy:cy+10,vx:Math.cos(a),vy:Math.sin(a)};q.pos=()=>[q.cx,q.cy];
  q.step=(o,b,dt)=>{if(b<o.t1)return;const sp=(40+L*7)*s,a2=Math.atan2(P.y-o.cy,P.x-o.cx),a1=Math.atan2(o.vy,o.vx);let d=a2-a1;while(d>Math.PI)d-=TAU;while(d<-Math.PI)d+=TAU;const na=a1+clamp(d,-2.2*dt,2.2*dt);o.vx=Math.cos(na);o.vy=Math.sin(na);o.cx=clamp(o.cx+o.vx*sp*dt,AX+4,AX+AW-4);o.cy=clamp(o.cy+o.vy*sp*dt,AY+4,AY+AH-4)};
  q.deco=(o,b,now)=>{if(b>=o.t1&&Math.floor(now/120)%2)cRing(o.cx,o.cy,o.r+4,'#ff4d6d',.6,1)};const o=NP(q);if(o&&o!==q&&o.pos!==q.pos){o.pos=()=>[q.cx,q.cy]}});t5Snd(T0+tel,300,600)}
 return (n-1)*.7+tel+life+.2}}catch(e){console.error('fix31 homing',e)}
/* 4) 전체화면이 가끔 안 되던 문제: 컷신 뒤 전투 시작처럼 손가락 입력이 없을 때는 브라우저가 거절함 → 다음 터치에서 다시 시도.
      '창 모드'를 직접 누른 뒤에는 다시 켜지 않음 */
(function(){let noFs=false;document.addEventListener('click',e=>{const b=e.target&&e.target.closest&&e.target.closest('#mbFs,#fsBtn');if(b)noFs=!!fsElem()&&b.id==='mbFs'},true);
 document.addEventListener('pointerup',e=>{if(e.pointerType==='mouse'||noFs||fsElem())return;if(!(('ontouchstart' in window)||navigator.maxTouchPoints>0))return;try{goFullscreen()}catch(_){}},true)})();

