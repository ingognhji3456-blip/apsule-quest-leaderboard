/* ================= v43 이야기 도중 난이도 바꾸기: 전투 화면 위 막대의 [난이도] 버튼 · 일시정지 창 ================= */
(function(){
 const L=()=>(typeof GM_DIFF!=='undefined'?GM_DIFF:[['easy','쉬움','#7dff9a'],['normal','보통','#8ad0ff'],['hard','어려움','#ffb020'],['extreme','익스트림','#ff4d6d']]);
 const cur=()=>L().find(d=>d[0]===diff)||L()[1];
 function setDiff(v){setTimeout(()=>{try{fitBattle()}catch(e){}},0);try{$('diffSel').value=v;updDiff()}catch(e){diff=v;try{localStorage.setItem('beatmachina-diff',v)}catch(_){}}try{saveData.diff=v}catch(e){}try{if(typeof gmHud==='function')gmHud()}catch(e){}paint();try{sfx(660,.08,'square',.04,990)}catch(e){}
  try{if(mode==='boss'&&G&&G.state&&G.state!=='result'&&typeof banner==='function')banner('난이도 · '+cur()[1]+' — 외형·예고는 바로, 체력·패턴 수는 다음 전투부터')}catch(e){}}
 function rowHTML(){return '<div class="v43dRow">'+L().map(d=>'<button data-d="'+d[0]+'" style="--dc:'+d[2]+'" class="'+(d[0]===diff?'on':'')+'">'+d[1]+'</button>').join('')+'</div><small class="v43dNote">외형·예고 시간은 바로, 보스 체력·패턴 수는 다음 전투부터 바뀌어요.</small>'}
 function bind(root){root.querySelectorAll('[data-d]').forEach(b=>{b.onpointerdown=e=>e.stopPropagation();b.onclick=e=>{e.stopPropagation();setDiff(b.dataset.d);root.querySelectorAll('[data-d]').forEach(x=>x.classList.toggle('on',x.dataset.d===diff))}})}
 function paint(){const b=$('v43Diff');if(b){const d=cur();b.innerHTML='<span class="v43lbl">난이도 · </span>'+d[1];b.style.color=d[2]}}
 try{const st=document.createElement('style');st.textContent='#v43Diff{font-weight:800}#v43DiffPop{position:absolute;right:8px;top:40px;z-index:70;background:#0a1014f2;border:1px solid #3a4a50;border-radius:8px;padding:10px;box-shadow:0 6px 24px #000a;max-width:300px}'+
  '.v43dRow{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}.v43dRow button{padding:7px 12px;font-size:12px;border-radius:999px;border:1px solid color-mix(in srgb,var(--dc) 55%,#000);color:var(--dc);background:#0d1418}.v43dRow button.on{background:var(--dc);color:#0a1014;font-weight:900}'+
  '.v43dNote{display:block;margin-top:8px;font-size:10.5px;color:#9fb3ad;text-align:center;line-height:1.5}#overlay .v43dWrap{margin-top:14px;padding-top:12px;border-top:1px solid #2a3437}#overlay .v43dWrap b{display:block;font-size:11px;letter-spacing:2px;color:#a6f5c6;margin-bottom:8px}'+
  '#battleView.mobileWide .v43lbl{display:none}#battleView.mobileWide #v43DiffPop{top:44px}#overlay .v43dRow button{border-radius:999px!important;color:var(--dc)!important;background:#0d1418!important;padding:7px 14px!important;font-size:12px!important;border:1px solid var(--dc)!important;box-shadow:none!important}#overlay .v43dRow button.on{background:var(--dc)!important;color:#0a1014!important;font-weight:900}';(document.head||document.body).appendChild(st)}catch(e){}
 /* 위 막대 버튼 */
 try{const bar=document.querySelector('#battleView .bar > div');if(bar&&!$('v43Diff')){const b=document.createElement('button');b.id='v43Diff';b.onpointerdown=e=>e.stopPropagation();b.onclick=e=>{e.stopPropagation();let p=$('v43DiffPop');if(p){p.remove();return}p=document.createElement('div');p.id='v43DiffPop';p.innerHTML=rowHTML();p.addEventListener('pointerdown',e=>e.stopPropagation());$('battleView').appendChild(p);bind(p)};bar.insertBefore(b,bar.firstChild);paint()}}catch(e){console.error('v43 diff',e)}
 /* 일시정지 창에도 */
 try{const _so=showOverlay;showOverlay=function(tag){const r=_so.apply(this,arguments);try{if(tag==='PAUSED'){const w=document.createElement('div');w.className='v43dWrap';w.innerHTML='<b>난이도</b>'+rowHTML();$('mText').appendChild(w);bind(w)}}catch(e){}return r}}catch(e){}
 /* 로비에서 바꿔도 버튼 표시 갱신, 전투를 나가면 창 닫기 */
 try{const _ud=updDiff;}catch(e){}
 try{const _tl=toLobby;toLobby=function(){try{const p=$('v43DiffPop');if(p)p.remove()}catch(e){}return _tl.apply(this,arguments)}}catch(e){}
 try{const _eg=enterGame;enterGame=function(){const r=_eg.apply(this,arguments);paint();try{fitBattle()}catch(e){}return r}}catch(e){}
})();

