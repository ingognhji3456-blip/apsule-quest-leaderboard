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
 const ST=[['hp','체력','최대 체력',2,'%','heart154','#ff6a8a'],['atk','공격력','주는 피해',1.5,'%','swords','#ff7a5a'],['crit','치명','치명타 확률',.5,'%p','bolt','#ffe066'],['def','방어','받는 피해 줄이기',1.5,'%','snow154','#7fe0ff'],['gold','골드','전투에서 얻는 골드',3,'%','coin','#ffc04a']];
 /* 하트 · 눈꽃 도트(특성 아이콘) */
 (function(){const SP={heart154:{p:{O:'#4a0a1a',R:'#ff4a6a',L:'#ffb0c0',D:'#b0203a'},g:['.OO...OO.','ORROOORRO','ORLRRRRDO','ORLRRRRDO','ORRRRRRDO','.ORRRRDO.','..ORRDO..','...ORO...','....O....']},
  snow154:{p:{B:'#7fe0ff',W:'#ffffff',D:'#2a8ac0'},g:['....W....','.B..W..B.','..B.W.B..','...BWB...','WWWWWWWWW','...BWB...','..B.W.B..','.B..W..B.','....W....']}};
  for(const k in SP){try{const s=SP[k],w=Math.max(...s.g.map(r=>r.length)),h=s.g.length,c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');
   s.g.forEach((r,y)=>{for(let i=0;i<r.length;i++){const col=s.p[r[i]];if(col){x.fillStyle=col;x.fillRect(i,y,1,1)}}});RT.style.setProperty('--sp-'+k,'url("'+c.toDataURL()+'")')}catch(e){}}
  try{window.PX151&&setTimeout(()=>PX151.run(),50)}catch(e){}})();
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
  let el=$('nw154');if(!el){el=document.createElement('div');el.id='nw154';document.body.appendChild(el);el.addEventListener('click',e=>{e.stopPropagation();if(!e.target.closest('button'))return;el.hidden=true;if(e.target.closest('.go'))openWin('pt')})}
  const sk=Array.from({length:12},(_,i)=>'<i class="sk" style="left:'+((i*37)%96)+'%;top:'+((i*53)%90)+'%;animation-delay:'+((i*.29)%2).toFixed(2)+'s"></i>').join('');
  el.innerHTML='<div class="pn'+(news.length?'':' solo')+'">'+sk+'<button class="xx" aria-label="닫기">✕</button><div class="lt"><i class="cr"></i><div class="t1">LEVEL UP!</div><div class="t2">Lv.'+L+'</div><div class="pp">특성 포인트 <span>+'+gain+'</span></div></div>'+
   (news.length?'<div class="nw">'+news.map(g=>'<div><i class="px149" style="--x:var(--sp-'+g[3]+')"></i>'+E(g[1])+' 새로 열림!</div>').join('')+'</div>':'')+'<div class="bb"><button class="go">특성 찍으러 가기</button></div></div>';
  try{window.SO149&&SO149.iconize(el)}catch(e){}
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
 html.lpL #lv154 .pn,html:not(.lp) #lv154 .pn{width:min(860px,calc(100vw - 24px));max-height:calc(100dvh - 12px)}
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

 /* ── v155: 사용자 그림대로 ── */
 #lv154 .hd{flex-wrap:wrap;row-gap:8px}
 #lv154 .tabs button{white-space:nowrap;padding:0 10px}
 #lv154 .hd .tabs{flex:1 1 100%;padding:0;order:5}
 html.lpL #lv154 .hd,html:not(.lp) #lv154 .hd{flex-wrap:nowrap}
 html.lpL #lv154 .hd .tabs,html:not(.lp) #lv154 .hd .tabs{flex:0 0 330px;order:0;margin-left:auto}
 #lv154 .pn{border:2px solid #ffc04a!important;box-shadow:0 0 0 3px #1a1206,0 0 0 4px #ffc04a55,0 0 30px #ffb84a44,0 24px 70px #000d!important}
 #lv154 .top .tx small{display:block;font-size:11px;color:#b8a888}
 #lv154 .sr{grid-template-columns:42px minmax(0,1fr) auto!important;grid-template-rows:auto auto}
 #lv154 .sr .ic{grid-row:1/3}
 #lv154 .sr .nm{grid-column:2;grid-row:1;min-width:0}
 #lv154 .sr .nm b{display:block}#lv154 .sr .nm small{display:block;font-size:11px;color:#b8a888}
 #lv154 .sr .pips{grid-column:2;grid-row:2;grid-template-columns:repeat(20,1fr)}
 #lv154 .sr .bt{grid-column:3;grid-row:1/3}
 #lv154 .pips i{height:8px;border-radius:2px}
 html.lpL #lv154[data-tab=pt] .bd,html:not(.lp) #lv154[data-tab=pt] .bd{display:grid!important;grid-template-columns:170px minmax(0,1fr)!important;grid-auto-rows:min-content;column-gap:10px}
 html.lpL #lv154[data-tab=pt] .bd>.top,html:not(.lp) #lv154[data-tab=pt] .bd>.top{grid-column:1!important;grid-row:1/span 6;flex-direction:column;justify-content:center;text-align:center;align-self:stretch;gap:10px}
 html.lpL #lv154[data-tab=pt] .top .tx b,html:not(.lp) #lv154[data-tab=pt] .top .tx b{font-size:13px}
 html.lpL #lv154[data-tab=pt] .top .tx b span,html:not(.lp) #lv154[data-tab=pt] .top .tx b span{display:block;font-size:30px;line-height:1.1}
 html.lpL #lv154[data-tab=pt] .top .tx small,html:not(.lp) #lv154[data-tab=pt] .top .tx small{display:none}
 html.lpL #lv154[data-tab=pt] .top .lvb,html:not(.lp) #lv154[data-tab=pt] .top .lvb{width:66px;height:66px;font-size:26px}
 html.lpL #lv154[data-tab=pt] .bd>.sr,html:not(.lp) #lv154[data-tab=pt] .bd>.sr{grid-column:2;grid-template-columns:38px minmax(0,1fr) minmax(0,1.1fr) auto!important;grid-template-rows:auto!important;padding:5px 8px}
 html.lpL #lv154[data-tab=pt] .sr .ic,html:not(.lp) #lv154[data-tab=pt] .sr .ic{grid-row:1;width:36px;height:36px}
 html.lpL #lv154[data-tab=pt] .sr .pips,html:not(.lp) #lv154[data-tab=pt] .sr .pips{grid-column:3;grid-row:1;grid-template-columns:repeat(20,1fr);gap:2px}
 html.lpL #lv154[data-tab=pt] .sr .bt,html:not(.lp) #lv154[data-tab=pt] .sr .bt{grid-column:4;grid-row:1}
 html.lpL #lv154[data-tab=pt] .bd>.msg,html:not(.lp) #lv154[data-tab=pt] .bd>.msg{grid-column:2!important}
 html.lpL #lv154[data-tab=gt] .bd,html:not(.lp) #lv154[data-tab=gt] .bd{display:grid!important;grid-template-columns:1fr 1fr;gap:8px}
 html.lpL #lv154[data-tab=gt] .bd>.msg,html:not(.lp) #lv154[data-tab=gt] .bd>.msg{grid-column:1/-1}
 #lv154 .gt .st{background:linear-gradient(180deg,#2aa05a,#1a6a3a)!important;color:#fff!important;border:1px solid #9affc8;padding:6px 14px!important}
 #lv154 .gt:not(.on) .st{background:#2a2014!important;color:#ffd88a!important;border-color:#ffd84a66}
 #lv154 .msg.ln{display:flex;align-items:center;gap:10px;color:#e0c890}
 #lv154 .msg.ln::before,#lv154 .msg.ln::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,transparent,#ffc04a88,transparent)}
 /* 레벨업 알림 */
 @keyframes nw155{0%,100%{opacity:.3;transform:scale(.6)}50%{opacity:1;transform:scale(1)}}
 #nw154 .pn{position:relative;width:min(340px,calc(100vw - 40px))!important;padding:20px 16px 16px!important;gap:10px!important;overflow:hidden;
  background:radial-gradient(ellipse at 50% 0%,#4a3410,transparent 65%),linear-gradient(180deg,#1a1408,#0c0a06)!important;border:2px solid #ffc04a!important;box-shadow:0 0 0 3px #1a1206,0 0 0 4px #ffc04a55,0 0 40px #ffb84a55,0 24px 70px #000d!important}
 #nw154 .sk{position:absolute;width:5px;height:5px;background:#ffe9a0;box-shadow:0 0 6px #ffc04a;transform:rotate(45deg);animation:nw155 2s ease-in-out infinite;pointer-events:none}
 #nw154 .lt{display:flex;flex-direction:column;align-items:center;gap:2px;position:relative}
 #nw154 .cr{width:26px;height:20px;background:var(--sp-crown) center/contain no-repeat;image-rendering:pixelated;display:none}
 #nw154 .t1,#nw154 .t2{font-weight:900;line-height:1;color:#fff3c0;text-shadow:2px 2px 0 #6a3a00,-2px 2px 0 #6a3a00,2px -2px 0 #6a3a00,-2px -2px 0 #6a3a00,0 4px 0 #2a1200,0 0 16px #ffb84a}
 #nw154 .t1{font-size:28px;letter-spacing:.04em}
 #nw154 .t2{font-size:28px;display:inline}
 #nw154 .lt{flex-direction:row;flex-wrap:wrap;justify-content:center;column-gap:10px;row-gap:6px}
 #nw154 .pp{flex-basis:100%;text-align:center;font-size:15px;color:#d8c8a8;font-weight:800}
 #nw154 .pp span{color:#7dffa8;font-weight:900}
 #nw154 .nw{width:100%;gap:7px!important}
 #nw154 .nw div{position:relative;justify-content:center;padding:8px 12px!important;border-radius:12px!important;background:linear-gradient(180deg,#1a6a3a,#0e3a20)!important;border:1.5px solid #7dffa8!important;font-size:14px!important;box-shadow:inset 0 1px 0 #ffffff22}
 #nw154 .nw div::before,#nw154 .nw div::after{content:'✦';position:absolute;top:50%;transform:translateY(-50%);color:#ffe9a0;font-size:12px}
 #nw154 .nw div::before{left:10px}#nw154 .nw div::after{right:10px}
 #nw154 .nw i.px149{width:22px!important;height:22px!important}
 #nw154 .bb{width:100%;display:flex;gap:10px;align-items:center}
 #nw154 .go{flex:1;height:46px!important;margin:0!important;border:2px solid #fff2b0!important;font-size:17px!important;box-shadow:0 4px 0 #8a5a10,0 0 14px #ffc04a66}
 #nw154 .xx{position:absolute;left:16px;bottom:16px;z-index:2;width:46px;height:46px;border-radius:50%;border:2px solid #ffb0b8;background:radial-gradient(circle at 40% 35%,#ff7a8a,#d0203a);color:#fff;font-size:22px;font-weight:900;padding:0;margin:0}
 #nw154 .bb{padding-left:56px}
 html.lpL #nw154 .pn,html:not(.lp) #nw154 .pn{width:min(600px,calc(100vw - 40px))!important;display:grid!important;grid-template-columns:1fr 1fr;grid-template-rows:1fr auto;column-gap:16px}
 html.lpL #nw154 .pn.solo,html:not(.lp) #nw154 .pn.solo{grid-template-columns:1fr;width:min(380px,calc(100vw - 40px))!important}
 html.lpL #nw154 .lt,html:not(.lp) #nw154 .lt{flex-direction:column;justify-content:center}
 html.lpL #nw154 .cr,html:not(.lp) #nw154 .cr{display:block}
 html.lpL #nw154 .t1,html:not(.lp) #nw154 .t1{font-size:38px}
 html.lpL #nw154 .t2,html:not(.lp) #nw154 .t2{font-size:52px;display:block}
 html.lpL #nw154 .pp,html:not(.lp) #nw154 .pp{flex-basis:auto;margin-top:6px;padding-top:6px;border-top:1px dashed #ffc04a55;font-size:17px}
 html.lpL #nw154 .pp span,html:not(.lp) #nw154 .pp span{color:#ffd84a;font-size:22px}
 html.lpL #nw154 .nw,html:not(.lp) #nw154 .nw{align-self:center;padding-right:30px}
 html.lpL #nw154 .bb,html:not(.lp) #nw154 .bb{grid-column:1/-1;padding:0 15%}
 html.lpL #nw154 .xx,html:not(.lp) #nw154 .xx{left:auto;right:10px;top:10px;bottom:auto;width:38px;height:38px;font-size:18px}
 html.lpL #nw154 .pn{padding:14px 16px 12px!important}
 html.lpL #nw154 .t2{font-size:44px}
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
  if(tab==='pt'){body='<div class="top"><div class="lvb">'+L+'<small>레벨</small></div><div class="tx"><b>남은 특성 포인트 <span>'+left()+'</span></b><small>레벨이 오를 때마다 1포인트 · 칸마다 최대 '+MAXP+''+(pvp()?' · 결투 중에는 꺼져요':'')+'</small></div><button data-a="reset">다시 찍기</button></div>'+
    ST.map(([k,n,d,per,u,icn,c])=>{const p=o.pt[k]|0;return '<div class="sr" style="--c:'+c+'"><div class="ic">'+ic(icn)+'</div><div class="nm"><b>'+n+'<em>+'+(+(p*per).toFixed(1))+u+'</em></b><small>1포인트 당 '+d+' +'+per+u+'</small></div><div class="pips">'+Array.from({length:MAXP},(_,i)=>'<i class="'+(i<p?'on':'')+'"></i>').join('')+'</div><div class="bt"><button data-a="m" data-k="'+k+'"'+(p<=0?' disabled':'')+'>−</button><button class="p" data-a="p" data-k="'+k+'"'+(p>=MAXP||left()<=0?' disabled':'')+'>+</button></div></div>'}).join('')+
    '<div class="msg">'+E(msg)+'</div>'}
  else{body=GATE.map(([k,n,r,icn])=>{const on=open(k);return '<div class="gt'+(on?' on':'')+'"><div class="ic">'+ic(icn)+'</div><div><b>'+n+'</b><small>'+(on?'이미 열려 있어요':'Lv.'+r+'이 되면 열려요')+'</small></div><span class="st">'+(on?'열림':'Lv.'+r)+'</span></div>'}).join('')+
    '<div class="msg ln">'+(o.grand?'예전부터 하던 분이라 모두 열려 있어요':'탑을 오르고 보스를 이기면 경험치를 얻어요')+'</div>'}
  box.innerHTML='<div class="pn"><div class="hd"><button class="x154">닫기</button><b>레벨 · 특성</b><div class="tabs"><button data-t="pt" class="'+(tab==='pt'?'on':'')+'">특성 포인트'+(left()?' ('+left()+')':'')+'</button><button data-t="gt" class="'+(tab==='gt'?'on':'')+'">레벨로 열리는 곳</button></div></div><div class="bd">'+body+'</div></div>';
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
