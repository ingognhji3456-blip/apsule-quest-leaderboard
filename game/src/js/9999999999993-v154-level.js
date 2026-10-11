/* v154: 레벨 기능 — 특성 포인트 · 콘텐츠 열림 (LV154)
   ① 특성 포인트: 레벨이 오를 때마다 1점(가진 점수 = 레벨 - 1). 5가지에 직접 찍고, 언제든 공짜로 다시 찍기.
      체력(+2%) · 공격력(+1.5%) · 치명(+0.5%p) · 방어(받는 피해 -1.5%) · 골드(전투에서 얻는 골드 +3%). 칸마다 최대 20점.
      적용: charStats(체력) · CB81.dmgMul(공격) · CB81.critAdd(치명) · CB81.onHurt(방어) · addCoins(골드, 전투 중 얻는 것만).
      → 탑 · 보스전 · 비밀의 방 · 던전 모두 같은 식으로 들어감. 결투(PvP) 중에는 공정하게 꺼짐.
   ② 콘텐츠 열림: 보스 러시 Lv.2 · 광장 Lv.3 · 듀오 Lv.5 · 결투 Lv.7. 잠긴 곳은 자물쇠 + 「Lv.N」 표시, 누르면 안내 창.
      레벨이 올라 새로 열리면 「새로 열림!」 알림. 원래 탑을 많이 오른 사람(최고 20층 이상 · Lv.7 이상)은 처음부터 모두 열림.
   ③ 들어가는 곳: 폰 · 패드는 로비 프로필 카드 오른쪽 「특성」 단추(남은 점수 빨간 숫자), 컴퓨터는 위쪽 줄 「특성」 단추.
   기록: saveData.lv154 = {pt:{hp,atk,crit,def,gold}, grand:1(예전 사람), seen:마지막으로 알린 레벨} */
(function(){try{
 const RT=document.documentElement,$=id=>document.getElementById(id);
 const E=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const save=()=>{try{saveNow()}catch(e){}};
 const sfx=k=>{try{gmSfx(k)}catch(e){}};
 const lv=()=>{try{return Math.max(1,(saveData.lv83&&saveData.lv83.lv)|0)}catch(e){return 1}};
 const ST=[['hp','체력','최대 체력',2,'%','person','#7dffa8'],['atk','공격력','주는 피해',1.5,'%','swords','#ff7a5a'],['crit','치명','치명타 확률',.5,'%p','bolt','#ffe066'],['def','방어','받는 피해 줄이기',1.5,'%','gear','#7fe0ff'],['gold','골드','전투에서 얻는 골드',3,'%','coin','#ffc04a']];
 const MAXP=20;
 function S(){const s=saveData;const o=s.lv154=s.lv154||{};o.pt=o.pt||{};for(const [k] of ST)o.pt[k]=Math.max(0,Math.min(MAXP,o.pt[k]|0));
  if(o.grand==null){const tw=s.tw71||{};o.grand=((tw.best||1)>=20||lv()>=7)?1:0;o.seen=lv()}return o}
 const used=()=>{const p=S().pt;return ST.reduce((a,[k])=>a+(p[k]|0),0)};
 const total=()=>lv()-1;
 const left=()=>Math.max(0,total()-used());
 /* 점수가 레벨보다 많으면(기록 처음부터 등) 뒤에서부터 덜어냄 */
 function fit(){const p=S().pt;let over=used()-total();for(let i=ST.length-1;i>=0&&over>0;i--){const k=ST[i][0];const d=Math.min(p[k],over);p[k]-=d;over-=d}}
 const pvp=()=>{try{return !!(window.PVP92&&(PVP92.on()||(PVP92.M&&PVP92.M.on)))}catch(e){return false}};
 const val=k=>{if(pvp())return 0;const p=S().pt[k]|0,st=ST.find(x=>x[0]===k);return p*st[3]/100};
 /* ── 효과 ── */
 if(typeof charStats==='function'){const f=charStats;charStats=function(i){const r=f.apply(this,arguments);try{const m=val('hp');if(m&&r)return Object.assign({},r,{hp:Math.round(r.hp*(1+m))})}catch(e){}return r}}
 if(window.CB81){const C=CB81;
  {const f=C.dmgMul;C.dmgMul=function(){let m=f.apply(this,arguments);try{m*=1+val('atk')}catch(e){}return m}}
  {const f=C.critAdd;C.critAdd=function(){let m=f.apply(this,arguments);try{m+=val('crit')}catch(e){}return m}}
  {const f=C.onHurt;C.onHurt=function(dmg){let d=f.apply(this,arguments);try{const k=val('def');if(k&&d>0)d=Math.max(1,Math.round(d*(1-k)))}catch(e){}return d}}}
 if(typeof addCoins==='function'){const f=addCoins;addCoins=function(n){try{const g=val('gold');if(g&&n>0&&typeof mode!=='undefined'&&/^(tower|boss|sec127|dg129)$/.test(mode))n=Math.round(n*(1+g))}catch(e){}return f.call(this,n)}}

 /* ── 콘텐츠 열림 ── */
 const GATE=[['rush','보스 러시',2,'demon'],['plaza','광장',3,'crowd'],['duo','듀오',5,'friends'],['pvp','결투',7,'swords']];
 const req=k=>(GATE.find(g=>g[0]===k)||[0,0,1])[2];
 const open=k=>S().grand||lv()>=req(k);
 const SEL={rush:'#lp146 .cd[data-i="1"],#lvSet .lvI[data-i="1"],#phNav button[data-i="1"]',plaza:'#lp146 .pl,#lvSet .lvI[data-i="6"],#phNav button[data-i="6"]',
  duo:'#duo85 .dCard[data-go="duo"]',pvp:'#duo85 .dCard[data-pvp]'};
 function lockPop(k){const g=GATE.find(x=>x[0]===k);if(!g)return;let el=$('lk154');if(!el){el=document.createElement('div');el.id='lk154';document.body.appendChild(el);
   el.addEventListener('pointerdown',e=>e.stopPropagation());el.addEventListener('click',e=>{e.stopPropagation();if(e.target===el||e.target.closest('button'))el.hidden=true})}
  let need=0;try{const o=LV83.get();need=Math.max(0,o.need-o.xp)}catch(e){}
  el.innerHTML='<div class="pn"><i class="px149 big" style="--x:var(--sp-lock)"></i><b>'+E(g[1])+'</b><p><span class="lv">Lv.'+g[2]+'</span>에 열려요</p><small>지금 Lv.'+lv()+(lv()+1===g[2]?' · 다음 레벨까지 경험치 '+need.toLocaleString():'')+'<br>탑을 오르고 보스를 이기면 경험치를 얻어요</small><button>확인</button></div>';
  el.hidden=false;sfx('no')}
 document.addEventListener('click',e=>{try{for(const k in SEL){const t=e.target.closest&&e.target.closest(SEL[k]);if(t&&!open(k)){e.stopPropagation();e.preventDefault();lockPop(k);return}}}catch(_){}},true);
 if(typeof gmShow==='function'){const f=gmShow;gmShow=function(scr){if(scr==='rush'&&!open('rush')){lockPop('rush');return}return f.apply(this,arguments)}}
 if(window.PLZ111&&PLZ111.enter){const f=PLZ111.enter;PLZ111.enter=function(){if(!open('plaza')){lockPop('plaza');return}return f.apply(this,arguments)}}
 function marks(){for(const k in SEL){const o=open(k);document.querySelectorAll(SEL[k]).forEach(el=>{el.classList.toggle('lk154',!o);let b=el.querySelector(':scope>.lkb154');if(!o&&!b){b=document.createElement('span');b.className='lkb154';b.innerHTML='<i class="px149" style="--x:var(--sp-lock)"></i>Lv.'+req(k);el.appendChild(b)}else if(o&&b)b.remove()})}}
 /* 새로 열림 알림 */
 function notice(){const o=S(),L=lv();if(o.seen==null)o.seen=L;if(L<=o.seen)return;const news=o.grand?[]:GATE.filter(g=>g[2]>o.seen&&g[2]<=L);const gain=L-o.seen;o.seen=L;save();
  let el=$('nw154');if(!el){el=document.createElement('div');el.id='nw154';document.body.appendChild(el);el.addEventListener('click',e=>{e.stopPropagation();el.hidden=true;if(e.target.closest('.go'))openWin('pt')})}
  el.innerHTML='<div class="pn"><b>LEVEL UP! Lv.'+L+'</b><p>특성 포인트 <span>+'+gain+'</span></p>'+(news.length?'<div class="nw">'+news.map(g=>'<div><i class="px149" style="--x:var(--sp-'+g[3]+')"></i>'+E(g[1])+' 새로 열림!</div>').join('')+'</div>':'')+'<div class="bb"><button class="go">특성 찍으러 가기</button><button>닫기</button></div></div>';
  el.hidden=false;clearTimeout(notice._t);notice._t=setTimeout(()=>{el.hidden=true},7000)}

 /* ── 특성 창 ── */
 const st=document.createElement('style');st.id='lv154css';st.textContent=`
 #lv154,#lk154,#nw154{position:fixed;inset:0;z-index:9260;display:flex;align-items:center;justify-content:center;background:#000b;backdrop-filter:blur(3px);color:#eaf6ef;font-family:inherit}
 #lv154[hidden],#lk154[hidden],#nw154[hidden]{display:none}
 #lv154 .pn{width:min(560px,calc(100vw - 20px));max-height:calc(100dvh - 20px);display:flex;flex-direction:column;border-radius:20px;overflow:hidden;
  background:radial-gradient(ellipse at 50% -10%,#3a2a10,transparent 60%),linear-gradient(180deg,#16120c,#0b0906);border:2px solid #ffc04a88;box-shadow:0 0 26px #ffb84a33,0 24px 70px #000d}
 #lv154 .hd{display:flex;align-items:center;gap:10px;padding:12px 14px 8px}
 #lv154 .hd b{font-size:19px;font-weight:900}
 #lv154 .tabs{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:0 12px 8px}
 #lv154 .tabs button{height:38px;border-radius:12px;border:1px solid #ffffff22;background:#1a150e;color:#d8c8a8;font:inherit;font-weight:900;cursor:pointer}
 #lv154 .tabs button.on{background:linear-gradient(180deg,#ffe58a,#e0a02a);color:#3a2200;border-color:#fff2b0}
 #lv154 .bd{overflow-y:auto;padding:4px 12px 14px;display:flex;flex-direction:column;gap:8px}
 #lv154 .top{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:14px;background:linear-gradient(90deg,#3a2a0a,#1a140a);border:1px solid #ffc04a55}
 #lv154 .top .lvb{width:58px;height:58px;border-radius:14px;display:grid;place-items:center;background:linear-gradient(180deg,#ffe58a,#c08a1a);color:#3a2200;font-weight:900;font-size:21px;line-height:1;text-align:center;flex:none}
 #lv154 .top .lvb small{display:block;font-size:9px}
 #lv154 .top .tx{flex:1;font-size:12px;color:#d8c8a8}
 #lv154 .top .tx b{display:block;font-size:16px;color:#fff}
 #lv154 .top .tx b span{color:#ffd84a}
 #lv154 .top button{height:34px;padding:0 12px;border-radius:10px;border:1px solid #ffffff2a;background:#2a2014;color:#e0d0b0;font:inherit;font-weight:800;cursor:pointer}
 #lv154 .sr{display:grid;grid-template-columns:42px minmax(0,1fr) auto;gap:4px 10px;align-items:center;padding:9px 10px;border-radius:13px;background:linear-gradient(90deg,color-mix(in srgb,var(--c) 14%,#14100a),#100c08 60%);border:1px solid color-mix(in srgb,var(--c) 40%,transparent)}
 #lv154 .sr .ic{grid-row:1/3;width:42px;height:42px;border-radius:11px;display:grid;place-items:center;background:#0008;border:1.5px solid color-mix(in srgb,var(--c) 70%,transparent)}
 #lv154 .sr .ic i.px149{width:26px!important;height:26px!important}
 #lv154 .sr b{font-size:14px}
 #lv154 .sr b em{font-style:normal;font-size:12px;color:var(--c);margin-left:6px}
 #lv154 .sr small{grid-column:2;font-size:11px;color:#b8a888}
 #lv154 .pips{grid-column:2;display:grid;grid-template-columns:repeat(20,1fr);gap:2px;margin-top:2px}
 #lv154 .pips i{height:6px;border-radius:2px;background:#ffffff14}
 #lv154 .pips i.on{background:var(--c);box-shadow:0 0 4px var(--c)}
 #lv154 .bt{grid-column:3;grid-row:1/4;display:flex;gap:4px}
 #lv154 .bt button{width:38px;height:38px;border-radius:10px;border:1px solid #ffffff22;background:#1e180e;color:#fff;font:inherit;font-size:20px;font-weight:900;cursor:pointer}
 #lv154 .bt button.p{background:linear-gradient(180deg,#ffe58a,#e0a02a);color:#3a2200;border-color:#fff2b0}
 #lv154 .bt button:disabled{opacity:.3;cursor:default}
 #lv154 .gt{display:grid;grid-template-columns:42px minmax(0,1fr) auto;gap:10px;align-items:center;padding:10px;border-radius:13px;background:#14100a;border:1px solid #ffffff18}
 #lv154 .gt.on{background:linear-gradient(90deg,#123a24,#0c140e);border-color:#7dffa888}
 #lv154 .gt .ic{width:42px;height:42px;border-radius:11px;display:grid;place-items:center;background:#0008}
 #lv154 .gt .ic i.px149{width:26px!important;height:26px!important}
 #lv154 .gt b{font-size:14px}#lv154 .gt small{display:block;font-size:11px;color:#a8a090}
 #lv154 .gt .st{font-size:12px;font-weight:900;padding:4px 10px;border-radius:999px;background:#2a2014;color:#ffd88a}
 #lv154 .gt.on .st{background:#1a4a2a;color:#9affc8}
 #lv154 .msg{min-height:16px;text-align:center;font-size:12px;color:#ffd0a0}
 html.lpL #lv154 .pn{width:min(860px,calc(100vw - 24px));max-height:calc(100dvh - 12px)}
 html.lpL #lv154[data-tab=pt] .bd{display:grid;grid-template-columns:1fr 1fr;align-content:start}
 html.lpL #lv154[data-tab=pt] .bd>.top,html.lpL #lv154[data-tab=pt] .bd>.msg{grid-column:1/-1}
 #lk154 .pn,#nw154 .pn{width:min(340px,calc(100vw - 40px));padding:18px 16px 14px;border-radius:20px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px;
  background:linear-gradient(180deg,#1a1630,#0c0a18);border:2px solid #b8a8ff88;box-shadow:0 20px 60px #000d}
 #lk154 i.px149.big{width:46px!important;height:46px!important}
 #lk154 b,#nw154 b{font-size:20px;font-weight:900}
 #lk154 p,#nw154 p{margin:0;font-size:15px}
 #lk154 .lv{color:#ffd84a;font-weight:900;font-size:18px}
 #lk154 small{font-size:11.5px;color:#a8a0c8;line-height:1.5}
 #lk154 button,#nw154 button{margin-top:6px;height:40px;padding:0 24px;border-radius:12px;border:0;background:#2a2648;color:#e0d8ff;font:inherit;font-weight:900;cursor:pointer}
 #nw154 .pn{border-color:#ffd84a}
 #nw154 b{color:#ffe9a0;text-shadow:0 0 12px #ffb84a}
 #nw154 p span{color:#ffd84a;font-weight:900}
 #nw154 .nw{display:flex;flex-direction:column;gap:5px;margin-top:4px}
 #nw154 .nw div{display:flex;align-items:center;gap:6px;padding:5px 12px;border-radius:10px;background:#1a4a2a;border:1px solid #7dffa888;color:#c8ffe0;font-weight:900;font-size:13px}
 #nw154 .nw i.px149{width:18px!important;height:18px!important}
 #nw154 .bb{display:flex;gap:6px}
 #nw154 .go{background:linear-gradient(180deg,#ffe58a,#e0a02a)!important;color:#3a2200!important}
 /* 잠긴 곳 */
 .lk154{position:relative!important}
 .lk154>*:not(.lkb154){filter:saturate(.3) brightness(.65)}
 .lk154>.lkb154{position:absolute;right:8px;top:6px;z-index:5;display:flex;align-items:center;gap:3px;padding:2px 8px;border-radius:999px;font-size:11px!important;letter-spacing:0;font-weight:900;color:#ffe2a0;font-style:normal;
  background:#000c;border:1px solid #ffd84a88;pointer-events:none;filter:none;line-height:1.3}
 .lk154>.lkb154{flex-direction:row!important;gap:3px!important;min-width:0!important;width:auto!important;height:auto!important}
 .lk154>.lkb154 i.px149{width:12px!important;height:12px!important}
 .lkb154{display:none}
 #lp146 .pl.lk154>.lkb154{top:50%;transform:translateY(-50%);right:44px}
 /* 입구 */
 #tr154,#tr154b{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:4px;font:inherit;font-weight:900;cursor:pointer;color:#3a2200;border:1.5px solid #fff2b0;background:linear-gradient(180deg,#ffe58a,#e0a02a);border-radius:10px}
 #tr154{height:32px;padding:0 10px;font-size:12px;border-radius:999px}
 html.lp #tr154,html.lp #gameMenu .gmHud>#tr154{display:none!important}
 #tr154b{display:none;flex:none;height:26px;padding:0 7px;font-size:10.5px}
 html.lp #pf146 #tr154b{display:inline-flex}
 #tr154 em,#tr154b em{position:absolute;top:-6px;right:-5px;min-width:16px;height:16px;padding:0 4px;border-radius:999px;background:#ff4a5a;color:#fff;font-style:normal;font-size:10px;line-height:16px;text-align:center}
 #tr154 em:empty,#tr154b em:empty{display:none}`;
 document.head.appendChild(st);
 const box=document.createElement('div');box.id='lv154';box.hidden=true;document.body.appendChild(box);
 box.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===box)box.hidden=true});
 let tab='pt',msg='';
 const ic=k=>'<i class="px149" style="--x:var(--sp-'+k+')"></i>';
 function openWin(t){if(t)tab=t;msg='';fit();box.hidden=false;draw()}
 function draw(){if(box.hidden)return;const o=S(),L=lv();box.dataset.tab=tab;let body='';
  if(tab==='pt'){body='<div class="top"><div class="lvb">'+L+'<small>레벨</small></div><div class="tx"><b>남은 특성 포인트 <span>'+left()+'</span></b>레벨이 오를 때마다 1점 · 칸마다 최대 '+MAXP+'점'+(pvp()?' · 결투 중에는 꺼져요':'')+'</div><button data-a="reset">다시 찍기</button></div>'+
    ST.map(([k,n,d,per,u,icn,c])=>{const p=o.pt[k]|0;return '<div class="sr" style="--c:'+c+'"><div class="ic">'+ic(icn)+'</div><b>'+n+'<em>+'+(+(p*per).toFixed(1))+u+'</em></b><div class="bt"><button data-a="m" data-k="'+k+'"'+(p<=0?' disabled':'')+'>−</button><button class="p" data-a="p" data-k="'+k+'"'+(p>=MAXP||left()<=0?' disabled':'')+'>+</button></div><small>'+d+' · 1점에 +'+per+u+'</small><div class="pips">'+Array.from({length:MAXP},(_,i)=>'<i class="'+(i<p?'on':'')+'"></i>').join('')+'</div></div>'}).join('')+
    '<div class="msg">'+E(msg)+'</div>'}
  else{body=GATE.map(([k,n,r,icn])=>{const on=open(k);return '<div class="gt'+(on?' on':'')+'"><div class="ic">'+ic(icn)+'</div><div><b>'+n+'</b><small>'+(on?'열려 있어요':'Lv.'+r+'이 되면 열려요')+'</small></div><span class="st">'+(on?'열림':'Lv.'+r)+'</span></div>'}).join('')+
    (o.grand?'<div class="msg">예전부터 하던 분이라 모두 열려 있어요</div>':'<div class="msg">탑을 오르고 보스를 이기면 경험치를 얻어요</div>')}
  box.innerHTML='<div class="pn"><div class="hd"><button class="x154">닫기</button><b>레벨 · 특성</b></div><div class="tabs"><button data-t="pt" class="'+(tab==='pt'?'on':'')+'">특성 포인트'+(left()?' ('+left()+')':'')+'</button><button data-t="gt" class="'+(tab==='gt'?'on':'')+'">레벨로 열리는 곳</button></div><div class="bd">'+body+'</div></div>';
  try{window.SO149&&SO149.iconize(box)}catch(e){}}
 box.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;e.stopPropagation();const o=S();
  if(b.classList.contains('x154')||(b.classList.contains('cx77')&&b.closest('.hd'))){box.hidden=true;return}
  if(b.dataset.t){tab=b.dataset.t;msg='';sfx('move');draw();return}
  const a=b.dataset.a,k=b.dataset.k;
  if(a==='p'&&left()>0&&(o.pt[k]|0)<MAXP){o.pt[k]=(o.pt[k]|0)+1;sfx('ok')}
  else if(a==='m'&&(o.pt[k]|0)>0){o.pt[k]--;sfx('move')}
  else if(a==='reset'){for(const [x] of ST)o.pt[x]=0;msg='모두 돌려받았어요. 다시 찍어 보세요';sfx('ok')}
  save();draw();badge()});
 /* 입구 단추 */
 function badge(){const n=left()?String(left()):'';for(const id of ['tr154','tr154b']){const e=$(id);if(e){const m=e.querySelector('em');if(m&&m.textContent!==n)m.textContent=n}}}
 function mount(){const h=document.querySelector('#gameMenu .gmHud'),more=$('gmMore');if(h&&more&&!$('tr154')){const b=document.createElement('button');b.id='tr154';b.type='button';b.innerHTML='특성<em></em>';b.addEventListener('click',e=>{e.stopPropagation();sfx('ok');openWin('pt')});h.insertBefore(b,more)}
  const pf=$('pf146');if(pf&&!$('tr154b')){const b=document.createElement('span');b.id='tr154b';b.setAttribute('role','button');b.innerHTML='특성<em></em>';b.addEventListener('click',e=>{e.stopPropagation();sfx('ok');openWin('pt')});pf.appendChild(b)}}
 setInterval(()=>{try{S();fit();mount();badge();marks();if(typeof mode!=='undefined'&&mode==='menu')notice()}catch(e){}},800);
 window.LV154={S,open:openWin,isOpen:open,left,val,GATE};
}catch(e){console.warn('v154',e)}})();
