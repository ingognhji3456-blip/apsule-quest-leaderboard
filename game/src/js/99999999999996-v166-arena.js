/* ================= v166 결투장 관객: 응원 · 내기 (AR166) =================
   - 결투 창 맨 위 「👀 결투장 관람」 → 지금 진행 중인 빠른 대전 목록(#ar166, /api/arena/list). 누르면 그 경기를 관전(WATCH95.spec).
   - 관전하는 동안 아래쪽 응원판(#ap166): 양쪽 선수마다 응원 이모티콘 8개(/api/arena/cheer), 가운데 판돈 막대 · 「내기」(시작 30초 안,
     50~5,000골드, /api/arena/bet — 걸면 골드에서 바로 빼고, 이기면 원금+몫 · 무효면 원금이 우편으로 옴). 1초마다 /api/arena/state.
   - 선수 화면(PVP92 결투 중)에는 위쪽 작은 띠(👀 관객 수 · 응원 수)와 내 쪽 · 상대 쪽에서 떠오르는 응원 이모티콘. */
(()=>{try{
 const $=id=>document.getElementById(id),esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const api=(p,b)=>window.DUO85&&DUO85.api?DUO85.api(p,'POST',b||{}):Promise.resolve({s:0,j:{}});
 const num=n=>Number(n||0).toLocaleString('ko-KR');
 const EMO=['👏','🔥','💪','😱','🎉','😂','💯','❤️'],SC=['#5ad8ff','#ff6a8a'];
 const A={code:null,st:null,since:0,iv:0,bet:{side:null,amt:500},msg:'',done:false};
 /* ---------- 목록 ---------- */
 const lw=document.createElement('div');lw.id='ar166';lw.hidden=true;document.body.appendChild(lw);
 lw.addEventListener('pointerdown',e=>{if(e.target===lw)lw.hidden=true});
 let L={list:null,t:0};
 async function openList(){lw.hidden=false;paintList();const r=await api('/api/arena/list');L.list=r.s===200?(r.j.matches||[]):[];paintList();clearInterval(L.iv);L.iv=setInterval(async()=>{if(lw.hidden){clearInterval(L.iv);return}const r=await api('/api/arena/list');if(r.s===200){L.list=r.j.matches||[];paintList()}},4000)}
 function paintList(){const M=L.list;
  lw.innerHTML='<div class="lp"><div class="lh"><button class="x">닫기</button><i>🏟</i><div><b>결투장</b><small>지금 열리는 빠른 대전을 관람하고 응원 · 내기를 해요</small></div></div><div class="ll">'+
   (M==null?'<div class="em">불러오는 중…</div>':!M.length?'<div class="em">지금 진행 중인 결투가 없어요<br><small>잠시 뒤 다시 확인해 보세요</small></div>':
   M.map((m,i)=>{const [p0,p1]=m.players,tot=(m.pool[0]+m.pool[1])||1;return '<div class="mt"><div class="pl l"><b>'+esc(p0.name)+'</b><small>Lv.'+p0.lv+'</small></div><div class="vs"><b>VS</b><small>👀 '+m.viewers+'명 · '+Math.floor(m.age/60)+':'+String(m.age%60).padStart(2,'0')+'</small>'+
    '<div class="pb"><i style="width:'+Math.round(m.pool[0]/tot*100)+'%"></i></div><small>판돈 🪙'+num(m.pool[0])+' : '+num(m.pool[1])+'</small>'+(m.betOpen?'<em>내기 '+m.betLeft+'초 남음</em>':'')+'</div><div class="pl r"><b>'+esc(p1.name)+'</b><small>Lv.'+p1.lv+'</small></div><button data-i="'+i+'">관람 ▶</button></div>'}).join(''))+'</div></div>';
  lw.querySelector('.x').onclick=()=>lw.hidden=true;lw.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>watch(L.list[+b.dataset.i]))}
 /* ---------- 관람 ---------- */
 const ap=document.createElement('div');ap.id='ap166';ap.hidden=true;document.body.appendChild(ap);
 ap.addEventListener('pointerdown',e=>e.stopPropagation());ap.addEventListener('keydown',e=>e.stopPropagation());
 const fl=document.createElement('div');fl.id='fl166';document.body.appendChild(fl);
 function watch(m){if(!m)return;lw.hidden=true;Object.assign(A,{code:m.code,st:m,since:0,msg:'',done:false,bet:{side:null,amt:500}});try{WATCH95.spec(m.players[0].name)}catch(e){}
  ap.hidden=false;paint();clearInterval(A.iv);A.iv=setInterval(poll,1000);poll()}
 function leave(){clearInterval(A.iv);A.code=null;ap.hidden=true;try{WATCH95.specOn()&&WATCH95.stop()}catch(e){}}
 async function poll(){if(!A.code)return;try{if(window.WATCH95&&!WATCH95.specOn()&&A.st&&A.since){leave();return}}catch(e){}
  const r=await api('/api/arena/state',{code:A.code,since:A.since});if(!A.code)return;if(r.s!==200){A.msg='경기가 끝났어요';A.done=true;paint();return}
  const j=r.j;A.st=Object.assign(A.st||{},j);(j.cheers||[]).forEach(c=>{if(A.since)float(c.side,EMO[c.e],c.name)});A.since=j.seq;
  if(j.done&&!A.done){A.done=true;const w=j.winner!=null&&j.players[j.winner];A.msg=w?'🏆 '+w.name+' 승리!'+(j.myBet?(j.myBet.side===j.winner?' 내기 적중 — 우편함에서 받아요':' 내기는 아쉽게 졌어요'):''):'경기가 끝났어요';try{window.MR163&&MR163.refresh()}catch(e){}}paint()}
 function paint(){const s=A.st;if(!s||!s.players)return;const [p0,p1]=s.players,tot=(s.pool[0]+s.pool[1])||0,mb=s.myBet,odds=i=>s.pool[i]?(1+s.pool[1-i]/s.pool[i]):null;
  const side=i=>'<div class="sd s'+i+'" style="--sc:'+SC[i]+'"><div class="nm"><b>'+esc(s.players[i].name)+'</b><small>응원 '+num(s.n[i])+' · 🪙'+num(s.pool[i])+(odds(i)?' · ×'+odds(i).toFixed(2):'')+'</small></div>'+
   '<div class="em">'+EMO.map((e,k)=>'<button data-c="'+i+'" data-e="'+k+'">'+e+'</button>').join('')+'</div></div>';
  ap.innerHTML='<div class="ap"><button class="x">닫기</button>'+side(0)+'<div class="md"><div class="pb"><i style="width:'+(tot?Math.round(s.pool[0]/tot*100):50)+'%"></i></div><small>판돈 합계 🪙'+num(tot)+' · 👀 '+s.viewers+'명</small>'+
   (A.done?'<b class="rs">'+esc(A.msg)+'</b>':mb?'<b class="mb">내 내기: '+esc(s.players[mb.side].name)+'에 🪙'+num(mb.amt)+(odds(mb.side)?' (예상 ×'+odds(mb.side).toFixed(2)+')':'')+'</b>':
   s.betOpen?'<div class="bt"><div class="ch">'+[100,500,1000,5000].map(v=>'<button data-a="'+v+'" class="'+(A.bet.amt===v?'on':'')+'">'+num(v)+'</button>').join('')+'</div><div class="go"><button data-b="0" style="--sc:'+SC[0]+'">'+esc(p0.name)+'에 걸기</button><button data-b="1" style="--sc:'+SC[1]+'">'+esc(p1.name)+'에 걸기</button></div><small>내기 '+s.betLeft+'초 남음 · 이긴 쪽이 진 쪽 판돈을 나눠 가져요</small></div>':
   '<small>내기 시간이 끝났어요 · 응원은 계속할 수 있어요</small>')+(A.msg&&!A.done?'<small class="er">'+esc(A.msg)+'</small>':'')+'</div>'+side(1)+'</div>';
  ap.querySelector('.x').onclick=leave;ap.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>cheer(+b.dataset.c,+b.dataset.e));
  ap.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{A.bet.amt=+b.dataset.a;paint()});ap.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>bet(+b.dataset.b))}
 async function cheer(side,e){if(!A.code||A.done)return;float(side,EMO[e],'나');try{sfx(700+side*200,.05,'triangle',.03,1200)}catch(_){}await api('/api/arena/cheer',{code:A.code,side,e})}
 async function bet(side){const amt=A.bet.amt;if((saveData.coins||0)<amt){A.msg='골드가 모자라요';paint();return}
  const r=await api('/api/arena/bet',{code:A.code,side,amt});if(r.s===200&&r.j.ok){try{addCoins(-amt)}catch(e){saveData.coins-=amt}try{gmHud()}catch(e){}A.msg='';A.st.myBet={side,amt};A.st.pool=r.j.pool;try{gmSfx('ok')}catch(e){}}else A.msg=(r.j&&r.j.error)||'걸지 못했어요';paint()}
 /* 떠오르는 응원 */
 function float(side,e,name){const d=document.createElement('div');d.className='fe';d.style.left=(side?72+Math.random()*20:8+Math.random()*20)+'vw';d.innerHTML='<b>'+e+'</b>'+(name?'<small>'+esc(name)+'</small>':'');
  fl.appendChild(d);setTimeout(()=>d.remove(),2600);if(fl.children.length>40)fl.firstChild.remove()}
 /* ---------- 선수 화면: 관객 · 응원 ---------- */
 const pb=document.createElement('div');pb.id='pb166';pb.hidden=true;document.body.appendChild(pb);const P={since:0,code:null};
 setInterval(async()=>{try{const on=window.PVP92&&PVP92.on&&PVP92.on()&&!(window.WATCH95&&WATCH95.specOn()),code=on&&DUO85.state.code;
  if(!on||!code){pb.hidden=true;P.code=null;return}if(P.code!==code){P.code=code;P.since=0}
  const r=await api('/api/arena/state',{code,since:P.since});if(r.s!==200){pb.hidden=true;return}const j=r.j,me=(saveData.name||''),mi=j.players.findIndex(p=>p.name===me),my=mi<0?0:mi;
  (j.cheers||[]).forEach(c=>{if(P.since)float(c.side===my?0:1,EMO[c.e],c.name)});P.since=j.seq;
  if(j.viewers||j.n[0]||j.n[1]){pb.hidden=false;pb.innerHTML='<i>👀</i><b>'+j.viewers+'</b><span style="--sc:'+SC[0]+'">나 응원 '+num(j.n[my])+'</span><span style="--sc:'+SC[1]+'">상대 '+num(j.n[1-my])+'</span>'}else pb.hidden=true}catch(e){}},1200);
 /* 결투 창에 단추 */
 setInterval(()=>{try{const box=$('duo85');if(!box||box.hidden)return;const P2=box.querySelector('.dP.dPv');if(!P2||P2.querySelector('.ar166b'))return;const b=document.createElement('button');b.className='ar166b';b.type='button';
  b.innerHTML='<i>🏟</i><span><b>결투장 관람</b><small>지금 열리는 빠른 대전 · 응원 · 내기</small></span><em>보기 ▶</em>';b.onclick=()=>{try{DUO85.closeUI()}catch(e){}openList()};
  const ref=P2.querySelector('.dCols')||P2.children[1];if(ref)ref.before(b);else P2.appendChild(b)}catch(e){}},500);
 const st=document.createElement('style');st.textContent=`
 #ar166{position:fixed;inset:0;z-index:9440;display:flex;align-items:center;justify-content:center;background:#000b;font-family:inherit;color:#eef0ff}#ar166[hidden]{display:none}
 #ar166 .lp{width:min(720px,calc(100vw - 16px));max-height:calc(100dvh - 16px);display:flex;flex-direction:column;border-radius:8px;background:linear-gradient(180deg,#2a1020,#0e0812);box-shadow:0 0 0 3px #000,0 0 0 5px #ff6a8a,0 0 0 7px #000,0 20px 60px #000d;overflow:hidden}
 #ar166 .lh{position:relative;display:flex;align-items:center;gap:10px;padding:12px 14px 10px 58px;background:linear-gradient(180deg,#4a1428,#2a0a18);border-bottom:3px solid #000}
 #ar166 .lh .x{position:absolute;left:10px;top:50%;transform:translateY(-50%)}#ar166 .lh i{font-style:normal;font-size:24px}#ar166 .lh b{display:block;font-size:19px;font-weight:900;color:#ffd166;text-shadow:2px 2px 0 #000}#ar166 .lh small{font-size:11px;color:#e8b8c8}
 #ar166 .ll{overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:8px}#ar166 .em{padding:40px 10px;text-align:center;color:#c8a8b8}
 #ar166 .mt{display:grid;grid-template-columns:1fr 1.3fr 1fr auto;align-items:center;gap:8px;padding:10px;background:#ffffff0a;box-shadow:0 0 0 2px #000}
 #ar166 .pl b{display:block;font-size:14px;font-weight:900;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#ar166 .pl small{font-size:11px;color:#c8b0c0}#ar166 .pl.l b{color:#8ae4ff}#ar166 .pl.r{text-align:right}#ar166 .pl.r b{color:#ff9ab0}
 #ar166 .vs{text-align:center}#ar166 .vs b{font-size:16px;color:#ffd166;font-weight:900}#ar166 .vs small{display:block;font-size:10.5px;color:#d8c0c8}#ar166 .vs em{font-style:normal;font-size:10.5px;font-weight:900;color:#7ae06a}
 #ar166 .pb,#ap166 .pb{height:7px;margin:3px 0;background:#ff6a8a;box-shadow:0 0 0 1px #000}#ar166 .pb i,#ap166 .pb i{display:block;height:100%;background:#5ad8ff}
 #ar166 .mt>button{padding:9px 12px;border:0;font:inherit;font-weight:900;font-size:13px;cursor:pointer;color:#2a1604;background:linear-gradient(180deg,#ffe58a,#e0a020);box-shadow:0 0 0 2px #000}
 #ap166{position:fixed;left:50%;bottom:8px;transform:translateX(-50%);z-index:9300;width:min(900px,calc(100vw - 12px));font-family:inherit;color:#fff}#ap166[hidden]{display:none}
 #ap166 .ap{position:relative;display:grid;grid-template-columns:1fr 1.15fr 1fr;gap:8px;padding:8px 10px 8px 52px;background:#0a0812e8;border-radius:8px;box-shadow:0 0 0 2px #000,0 0 0 4px #ffd16688}
 #ap166 .x{position:absolute;left:8px;top:50%;transform:translateY(-50%)}
 #ap166 .sd{display:flex;flex-direction:column;gap:4px;padding:5px 6px;background:color-mix(in srgb,var(--sc) 14%,transparent);box-shadow:inset 0 3px 0 var(--sc)}
 #ap166 .nm b{display:block;font-size:13px;font-weight:900;color:var(--sc);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#ap166 .nm small{font-size:10px;color:#d0d0e8}
 #ap166 .em{display:grid;grid-template-columns:repeat(8,1fr);gap:2px}#ap166 .em button{padding:3px 0;border:0;font-size:16px;line-height:1.2;cursor:pointer;background:#ffffff12;border-radius:4px}#ap166 .em button:active{transform:scale(1.25)}
 #ap166 .md{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;text-align:center;min-width:0}#ap166 .md small{font-size:10.5px;color:#c8c8e0}#ap166 .md .pb{width:100%}
 #ap166 .rs{font-size:15px;color:#ffd166}#ap166 .mb{font-size:12px;color:#a6f5c6}#ap166 .er{color:#ffb0b0!important}
 #ap166 .bt{display:flex;flex-direction:column;gap:4px;width:100%}#ap166 .ch{display:flex;gap:3px}#ap166 .ch button{flex:1;padding:4px 0;border:0;font:inherit;font-weight:900;font-size:11.5px;cursor:pointer;background:#2a2840;color:#ffe08a;box-shadow:0 0 0 1px #000}
 #ap166 .ch button.on{background:#ffd166;color:#2a1604}#ap166 .go{display:flex;gap:4px}#ap166 .go button{flex:1;min-width:0;padding:6px 4px;border:0;font:inherit;font-weight:900;font-size:11.5px;cursor:pointer;color:#0a0a14;background:var(--sc);box-shadow:0 0 0 2px #000;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
 #fl166{position:fixed;inset:0;z-index:9310;pointer-events:none;overflow:hidden}
 #fl166 .fe{position:absolute;bottom:22%;display:flex;flex-direction:column;align-items:center;animation:fe166 2.6s ease-out forwards}#fl166 .fe b{font-size:30px;filter:drop-shadow(0 2px 2px #000)}#fl166 .fe small{font-size:10px;font-weight:900;color:#fff;text-shadow:0 1px 2px #000}
 @keyframes fe166{0%{transform:translateY(0) scale(.4);opacity:0}12%{transform:translateY(-20px) scale(1.15);opacity:1}100%{transform:translateY(-38vh) scale(.9);opacity:0}}
 #pb166{position:fixed;left:50%;top:40px;transform:translateX(-50%);z-index:9000;display:flex;align-items:center;gap:8px;padding:3px 10px;background:#000c;border-radius:6px;box-shadow:0 0 0 2px #ffd16688;color:#fff;font-size:12px;font-weight:900;pointer-events:none;font-family:inherit}
 #pb166[hidden]{display:none}#pb166 i{font-style:normal}#pb166 span{color:var(--sc)}
 #duo85 .ar166b{display:flex;align-items:center;gap:12px;width:100%;margin:0 0 10px;padding:9px 14px;border:0;cursor:pointer;font:inherit;text-align:left;border-radius:12px;color:#fff;
  background:linear-gradient(90deg,#c83a6a,#6a2a9a);box-shadow:0 0 0 2px #000,inset 0 2px 0 #ffa0c0,inset 0 -3px 0 #3a0a3a,0 0 16px #c83a6a55}
 #duo85 .ar166b i{font-style:normal;font-size:24px}#duo85 .ar166b span{flex:1;display:flex;flex-direction:column}#duo85 .ar166b b{font-size:16px;font-weight:900}#duo85 .ar166b small{font-size:11px;opacity:.85}
 #duo85 .ar166b em{font-style:normal;font-weight:900;font-size:13px;padding:6px 12px;background:#1a0a1a;color:#ffd166;border-radius:8px}html.lpL #duo85 .ar166b{padding:5px 10px;margin-bottom:6px}html.lpL #duo85 .ar166b small{display:none}
 html.lpP #ap166 .ap{grid-template-columns:1fr 1fr;padding-left:10px;padding-top:40px}html.lpP #ap166 .md{grid-column:1/-1;order:-1}html.lpP #ap166 .x{top:8px;transform:none}html.lpP #ap166 .em{grid-template-columns:repeat(4,1fr)}
 html.lpP #ar166 .mt{grid-template-columns:1fr 1fr;}html.lpP #ar166 .vs{grid-column:1/-1;order:-1}html.lpP #ar166 .mt>button{grid-column:1/-1}
 html.lpL #ap166 .em button{font-size:13px;padding:1px 0}html.lpL #ap166 .ap{padding-top:5px;padding-bottom:5px}`;document.head.appendChild(st);
 window.AR166={openList,watch,leave,A};
}catch(e){console.error('v166 arena',e)}})();
