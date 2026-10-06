/* ================= v54 챕터가 오를수록 보스가 더 강해지게: 체력 · 공격 밀도 =================
   전에는 챕터마다 체력 공식이 따로라서 3장·5장 첫 보스가 앞 챕터보다 약했고, 2장도 1장과 비슷했다.
   이제 70명 전체가 한 줄로 이어지게 맞춘다 (보통 난이도 기준, 다른 난이도는 원래 배율을 그대로 곱함).
     챕터 첫 보스: 1장 5,600 · 2장 7,400 · 3장 9,200 · 4장 11,000 · 5장 12,800 · 6장 14,600 · 7장 16,400
     챕터 안에서 보스마다 +3.5%, 챕터 마지막 보스는 ×1.3
   공격 밀도: 챕터가 오를수록 한 번의 공격 구간이 길어지고(공격이 더 많이 나옴) 공격 사이 간격이 짧아진다. */
(function(){try{
 /* 지금(v53) 보통 난이도 러시 체력 — 비율을 구하는 기준 */
 const CUR=[5600,5980,6360,6740,7120,7500,7880,8260,8640,9020, 9400,9780,10160,10540,10920,11300,11680,12060,12440,12820,
  8260,7500,11300,6360,5980,6740,7880,8640,5600,15550, 9000,9650,10300,10950,11600,12250,12900,13550,14200,20790,
  7600,8420,9240,10060,10880,11700,12520,13340,14160,14980, 10200,10900,11600,12300,13000,13700,14400,15100,15800,16500,
  11200,11950,12700,13450,14200,14950,15700,16450,17200,17950];
 const START=[5600,7400,9200,11000,12800,14600,16400];
 const WANT=k=>{const c=Math.floor(k/10),i=k%10;let v=START[c]*(1+.035*i);if(i===9)v*=1.3;return Math.round(v/10)*10};
 window.HP54={CUR,WANT,START};
 /* 지금 싸우는 보스가 몇 장 몇 번째인지 */
 function who(){try{if(!G)return null;if(G.s7!=null)return [6,G.s7];if(G.s6!=null)return [5,G.s6];if(G.s5!=null)return [4,G.s5];if(G.s4!=null)return [3,G.s4];if(G.s4Rush!=null)return [3,G.s4Rush];
  const k=typeof t5Key==='function'?t5Key():'b'+G.bi;if(/^b\d+$/.test(k)){const i=+k.slice(1);return i<10?[0,i]:[1,i-10]}
  const j=(typeof C3CASES!=='undefined')?C3CASES.findIndex(D=>D.boss.art===k):-1;if(j>=0)return [2,j];if(k.indexOf('s5_')===0&&typeof S5!=='undefined'){const q=S5.findIndex(b=>b.art===k);if(q>=0)return [4,q]}}catch(e){}return null}
 window.who54=who;
 /* 체력: 전투가 시작되고 첫 화면을 그릴 때 한 번만 맞춤 */
 {const _ds=drawScene;drawScene=function(now){try{if(typeof G!=='undefined'&&G&&!G._hp54&&mode==='boss'&&G.maxHp>0&&G.state!=='result'){const w=who();if(w){G._hp54=1;G._ch54=w[0];const i=w[0]*10+w[1],r=WANT(i)/CUR[i];if(isFinite(r)&&r>0){G.hp=Math.round(G.hp*r);G.maxHp=Math.round(G.maxHp*r);G.hpShow=G.hp/G.maxHp;G._barLast=undefined}}}}catch(e){}return _ds.apply(this,arguments)}}
 const ch=()=>{try{return G&&G._ch54!=null?G._ch54:(who()||[0])[0]}catch(e){return 0}};
 /* 공격 사이 간격: 챕터마다 4%씩 짧게 */
 {const g=GAPM;GAPM=function(){return g.apply(this,arguments)*(1-.04*ch())}}
 /* 공격 구간 길이: 챕터마다 반 박자씩 길게 (공격이 더 많이 들어감) */
 {const base=planNext;planNext=function(S){const ph=(G&&G.phase)||0,add=Math.round(ch()*.6*2)/2;if(!add)return base.apply(this,arguments);EVADE[ph]+=add;try{return base.apply(this,arguments)}finally{EVADE[ph]-=add}}}
}catch(e){console.error('v54 hp density',e)}})();
