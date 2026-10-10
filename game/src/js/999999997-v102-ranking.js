/* ================= v102 새 랭킹 창 (RANK102) =================
   - 1 · 2 · 3위는 시상대 카드: 그 사람이 장착한 캐릭터(스킨) · 무기 · 펫을 크게 그려서 누군지 한눈에. 장비 이름 · 등급도.
     지금 탑 · 듀오 · 결투 · 보스전 중이면 「👁 관전」(친구가 아니어도 1~3위는 볼 수 있음, 서버가 허용).
   - 4 ~ 100위는 줄 목록(작은 캐릭터 얼굴 · 이름 · 기록).
   - 맨 아래에는 늘 「내 순위」. 100위 밖이어도 내 순위가 나온다.
   - 탭: 점수 · 레벨 · 탑 층 · 골드 · 결투. 결투 창에서 열면 결투 순위만(⚔ 결투 랭킹).
   예전 랭킹 창(RANK83)을 여는 곳은 모두 이 창으로 이어진다. 장착 모습은 99999991이 /api/stats의 look으로 올린다. */
(()=>{try{
 if(!window.RANK83)return;const $=id=>document.getElementById(id),TAU=Math.PI*2;
 const acc=()=>(window.ACCT55&&ACCT55.get())||{};
 const base=()=>(acc().url||'https://capsule-quest-leaderboard.onrender.com').replace(/\/+$/,'');
 const esc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const num=v=>Number(v||0).toLocaleString();
 const TABS=[['score','점수','⚡'],['level','레벨','⭐'],['floor','탑 층','🏰'],['gold','골드','🪙'],['pvp','결투','⚔']];
 const TC={'브론즈':'#d08a5a','실버':'#c8d4e0','골드':'#ffd166','플래티넘':'#7df9ff','다이아':'#8db8ff','마스터':'#ff6ad5'};
 const R={tab:'score',only:false,data:null,raf:0,cvs:[]};
 const box=document.createElement('div');box.id='rk102';box.hidden=true;document.body.appendChild(box);
 box.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===box)close()});box.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Escape')close()});
 const val=x=>R.tab==='pvp'?num(x.rating)+'점':R.tab==='score'?num(x.score)+'점':R.tab==='level'?'Lv.'+(x.level||1):R.tab==='floor'?(x.floor||1)+'F':'🪙 '+num(x.gold);
 function sub(x){if(R.tab==='pvp')return (x.tier||'')+' · '+(x.wins||0)+'승 '+(x.losses||0)+'패';const a=[];if(R.tab!=='level'&&x.level)a.push('Lv.'+x.level);if(R.tab!=='floor'&&x.floor)a.push(x.floor+'F');if(R.tab!=='gold'&&x.gold!=null)a.push('🪙'+num(x.gold));return a.join(' · ')}
 /* 다른 사람의 장착 모습 그리기 */
 function chIdx(l){try{if(l&&l.sk&&window.SKIN58){const s=SKIN58.byId(l.sk);if(s&&s.idx!=null)return s.idx}}catch(e){}return l&&l.ch!=null&&CHARS[l.ch]?l.ch:0}
 function drawLook(c,l,W,H,now,big){c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);c.imageSmoothingEnabled=false;const t=now/1000;
  const g=c.createRadialGradient(W/2,H*.7,4,W/2,H*.6,W*.7);g.addColorStop(0,'#2a3a4a');g.addColorStop(1,'#0a0f14');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.fillStyle='#00000066';c.beginPath();c.ellipse(W/2,H*.86,W*.26,H*.05,0,0,TAU);c.fill();
  l=l||{};const S=big?3:1.6;
  try{const pid=l.pt|0;if(pid||l.pv){const px=W/2+18*S,py=window.PET105?PET105.at(l.pv||pid,H*.5+Math.sin(t*2.2)*2,H*.86,S*.7):H*.5+Math.sin(t*2.2)*2;if(l.pv&&window.PET59&&PET59.byId&&PET59.byId(l.pv))PET59.draw(c,l.pv,px,py,now,S*.7);else drawPet(c,pid,px,py,now,S*.7)}}catch(e){}
  try{const img=ch2Render(chIdx(l),0,Math.round(Math.sin(t*2)*.6),false,t);c.drawImage(img,Math.round(W/2-20*S-6*S),Math.round(H*.88-44*S),40*S,48*S)}catch(e){}
  try{const w=WEAPONS[l.wp|0]||WEAPONS[0],sp=WSPR[w.type]||WSPR.sword,n=sp.r.length,sc=Math.min(big?2.6:1.4,(H*.55)/(n*.72)),ang=-1.1+Math.sin(t)*.04,L=(n-1)*sc*.72,hx=W/2-22*S-Math.cos(ang)*(L/2-sp.g*sc*.72)+ (big?6:2),hy=H*.5-Math.sin(ang)*(L/2-sp.g*sc*.72);wsWeaponCopy(c,w,hx,hy,ang,sc,now,0,0,W,H)}catch(e){}}
 function frameLoop(){R.raf=0;if(box.hidden)return;const now=performance.now();for(const q of R.cvs){const c=q.cv.getContext('2d');drawLook(c,q.l,q.cv.width,q.cv.height,now,q.big)}R.raf=requestAnimationFrame(frameLoop)}
 function card(x,place){const l=x.look||{},col=['#ffd84a','#d8e0ec','#e0a060'][place-1],crown=['👑','🥈','🥉'][place-1];
  return '<div class="pod p'+place+(x.me?' me':'')+'" style="--pc:'+col+'"><div class="pr">'+crown+'<b>'+place+'</b></div><canvas width="168" height="150" data-look="'+place+'"></canvas>'+
   '<div class="nm">'+esc(x.username)+(x.me?' <i>나</i>':'')+'</div><div class="vl">'+esc(val(x))+'</div><div class="sb">'+esc(sub(x))+'</div>'+
   '<div class="gear">'+(l.cn?'<span>🧍 '+esc(l.cn)+(l.cg?' <em>'+esc(l.cg)+'</em>':'')+'</span><span>⚔ '+esc(l.wn||'')+(l.wg?' <em>'+esc(l.wg)+'</em>':'')+'</span><span>🐾 '+esc(l.pn||'')+(l.pg?' <em>'+esc(l.pg)+'</em>':'')+'</span>':'<span class="no">장착 정보 없음</span>')+'</div>'+
   (x.live&&!x.me?'<button class="wt" data-wt="'+esc(x.username)+'">👁 관전 · '+esc(x.where||'게임 중')+'</button>':(x.where&&!x.me?'<div class="on">● '+esc(x.where)+'</div>':''))+'</div>'}
 function row(x){return '<div class="rw'+(x.me?' me':'')+'"><b class="rn">#'+x.rank+'</b><canvas width="26" height="30" data-row="'+x.rank+'"></canvas><span class="nm">'+esc(x.username)+'<small>'+esc(sub(x))+'</small></span><span class="vl">'+esc(val(x))+'</span></div>'}
 function paint(){const j=R.data;const tabs=R.only?'':'<div class="tabs">'+TABS.map(([k,n,ic])=>'<button data-k="'+k+'" class="'+(k===R.tab?'on':'')+'">'+ic+' '+n+'</button>').join('')+'</div>';
  let body='';if(!j)body='<div class="note">불러오는 중…</div>';else if(!j.ok)body='<div class="note">랭킹을 불러오지 못했어요. 인터넷과 서버를 확인해 주세요.</div>';
  else{const P=j.players||[];if(!P.length)body='<div class="note">아직 순위에 오른 사람이 없어요.</div>';else{const top=P.slice(0,3),rest=P.slice(3,100);
   body='<div class="podium">'+[top[1]&&card(top[1],2),top[0]&&card(top[0],1),top[2]&&card(top[2],3)].filter(Boolean).join('')+'</div><div class="list">'+rest.map(row).join('')+(P.length>=100?'<div class="note sm">100위까지 보여 줘요</div>':'')+'</div>'}}
  const m=j&&j.mine;const mine='<div class="mine">'+(m?'<span>내 순위</span><b>#'+num(m.rank)+'</b><em>'+esc(val(m))+'</em>'+(m.rank>100?'<small>100위 밖이에요 — 조금만 더!</small>':''):(acc().token?'<small>아직 이 순위표에 내 기록이 없어요.</small>':'<small>로그인하면 내 기록이 올라가요.</small>'))+'</div>';
  box.innerHTML='<div class="pnl"><div class="hd"><b>'+(R.only?'⚔ 결투 랭킹':'🏆 랭킹')+'</b>'+(R.tab==='pvp'&&j&&j.season?'<small>시즌 '+esc(j.season)+'</small>':'')+'<button class="x">닫기</button></div>'+tabs+'<div class="sc">'+body+'</div>'+mine+'</div>';
  box.querySelector('.x').onclick=close;box.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{R.tab=b.dataset.k;try{gmSfx('move')}catch(_){}load()});
  box.querySelectorAll('[data-wt]').forEach(b=>b.onclick=()=>{const n=b.dataset.wt;close();try{window.WATCH95&&WATCH95.spec(n)}catch(e){}});
  R.cvs=[];if(j&&j.ok){const P=j.players||[];box.querySelectorAll('canvas[data-look]').forEach(cv=>{const x=P[+cv.dataset.look-1];if(x)R.cvs.push({cv,l:x.look,big:true})});
   box.querySelectorAll('canvas[data-row]').forEach(cv=>{const x=P[+cv.dataset.row-1];if(!x)return;try{const c=cv.getContext('2d');c.imageSmoothingEnabled=false;const img=ch2Render(chIdx(x.look),0,0,false,1);c.drawImage(img,8,6,24,30,0,0,26,30)}catch(e){}})}
  if(!R.raf)R.raf=requestAnimationFrame(frameLoop)}
 async function load(){R.data=null;paint();try{await LV83.sync(true)}catch(e){}let j=null;try{const h={};const a=acc();if(a.token)h.Authorization='Bearer '+a.token;const r=await fetch(base()+'/api/ranking?limit=100&by='+R.tab,{headers:h});j=await r.json()}catch(e){j={ok:false}}R.data=j;paint()}
 function open(t,opt){if(t)R.tab=t;R.only=!!(opt&&opt.only);if(R.only)R.tab='pvp';box.hidden=false;load()}
 function close(){box.hidden=true}
 RANK83.open=open;RANK83.close=close;RANK83.load=load;
 const st=document.createElement('style');st.id='rk102s';st.textContent=`
 #rk102{position:fixed;inset:0;z-index:9200;display:grid;place-items:center;background:#000a;backdrop-filter:blur(3px)}#rk102[hidden]{display:none}
 #rk102 .pnl{width:min(760px,96vw);max-height:94vh;display:flex;flex-direction:column;border-radius:18px;background:linear-gradient(180deg,#141c26,#0a0f15);border:1px solid #ffd16655;box-shadow:0 20px 60px #000c,inset 0 1px 0 #ffffff14;color:#e8f4ef;overflow:hidden}
 #rk102 .hd{display:flex;align-items:center;gap:10px;padding:12px 16px;background:linear-gradient(90deg,#3a2a08,#141c26);border-bottom:1px solid #ffd16633}
 #rk102 .hd b{font-size:19px;color:#ffe79a;letter-spacing:.04em}#rk102 .hd small{color:#9ab8ac}#rk102 .hd .x{margin-left:auto;font:inherit;font-weight:800;padding:6px 12px;border-radius:10px;border:1px solid #ffffff2a;background:#1a2430;color:#e8f4ef;cursor:pointer}
 #rk102 .tabs{display:flex;gap:6px;padding:10px 14px 4px;flex-wrap:wrap}#rk102 .tabs button{font:inherit;font-weight:800;font-size:13px;padding:7px 13px;border-radius:999px;border:1px solid #ffffff22;background:#101820;color:#cfd8e0;cursor:pointer}
 #rk102 .tabs button.on{color:#1a1206;background:linear-gradient(180deg,#ffe79a,#ffb020);border-color:#ffe79a}
 #rk102 .sc{overflow:auto;padding:8px 14px 10px;flex:1;min-height:0}
 #rk102 .podium{display:grid;grid-template-columns:1fr 1.12fr 1fr;gap:10px;align-items:end;margin:6px 0 12px}
 #rk102 .pod{position:relative;display:flex;flex-direction:column;align-items:center;gap:3px;padding:10px 8px 10px;border-radius:16px;background:linear-gradient(180deg,color-mix(in srgb,var(--pc) 18%,#141c26),#0c1218);border:1.5px solid color-mix(in srgb,var(--pc) 60%,transparent);box-shadow:0 0 18px color-mix(in srgb,var(--pc) 22%,transparent)}
 #rk102 .pod.p1{padding-top:16px;transform:translateY(-6px);box-shadow:0 0 26px color-mix(in srgb,var(--pc) 40%,transparent)}
 #rk102 .pod .pr{position:absolute;top:-12px;display:flex;align-items:center;gap:4px;font-size:18px;padding:0 10px;border-radius:999px;background:#0a0f15;border:1.5px solid var(--pc)}#rk102 .pod .pr b{color:var(--pc);font-size:15px}
 #rk102 .pod canvas{width:100%;max-width:168px;aspect-ratio:168/150;border-radius:12px;image-rendering:pixelated;box-shadow:inset 0 0 0 1px #ffffff14}
 #rk102 .pod .nm{font-weight:900;font-size:15px;color:#fff;text-align:center}#rk102 .pod .nm i{font-style:normal;font-size:10px;color:#05070a;background:#7dffa8;border-radius:6px;padding:0 5px}
 #rk102 .pod .vl{font-weight:900;color:var(--pc);font-size:16px}#rk102 .pod .sb{font-size:11px;color:#9ab8ac}
 #rk102 .pod .gear{display:flex;flex-direction:column;gap:2px;width:100%;margin-top:3px}#rk102 .pod .gear span{font-size:11px;color:#dfe8ee;background:#0a0f15;border-radius:7px;padding:2px 6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 #rk102 .pod .gear em{font-style:normal;font-size:9.5px;font-weight:900;color:var(--pc)}#rk102 .pod .gear .no{color:#6a7a80}
 #rk102 .pod .wt{margin-top:4px;font:inherit;font-weight:900;font-size:12px;padding:6px 10px;border-radius:10px;border:0;cursor:pointer;color:#04101e;background:linear-gradient(180deg,#e2f2ff,#7ab8ff);animation:rkw 1.6s ease-in-out infinite}
 #rk102 .pod .on{font-size:11px;color:#7dffa8}@keyframes rkw{50%{box-shadow:0 0 12px #7ab8ff}}
 #rk102 .list{display:flex;flex-direction:column;gap:3px}
 #rk102 .rw{display:grid;grid-template-columns:44px 26px 1fr auto;gap:8px;align-items:center;padding:5px 10px;border-radius:10px;background:#0f1720;border:1px solid #ffffff0d}
 #rk102 .rw.me{background:linear-gradient(90deg,#173a2a,#0f1720);border-color:#7dffa866}#rk102 .rw .rn{color:#9ab8ac;font-size:13px}#rk102 .rw canvas{width:26px;height:30px;image-rendering:pixelated}
 #rk102 .rw .nm{font-weight:800;font-size:13.5px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#rk102 .rw .nm small{display:block;font-weight:600;font-size:10.5px;color:#7a8a90}#rk102 .rw .vl{font-weight:900;color:#ffe79a;font-size:13.5px}
 #rk102 .note{padding:20px;text-align:center;color:#9ab8ac}#rk102 .note.sm{padding:8px;font-size:11px}
 #rk102 .mine{display:flex;align-items:center;gap:10px;padding:10px 16px;border-top:1px solid #ffffff1a;background:linear-gradient(90deg,#10261c,#0a0f15)}
 #rk102 .mine span{font-size:12px;color:#9ab8ac}#rk102 .mine b{font-size:20px;color:#7dffa8}#rk102 .mine em{font-style:normal;font-weight:900;color:#ffe79a}#rk102 .mine small{color:#9ab8ac;font-size:11.5px;margin-left:auto}
 @media (max-width:560px){#rk102 .podium{gap:5px}#rk102 .pod .gear span{font-size:10px}#rk102 .pod .nm{font-size:13px}}`;document.head.appendChild(st);
 window.RANK102={open,close,load,R};
}catch(e){console.error('v102 ranking',e)}})();
