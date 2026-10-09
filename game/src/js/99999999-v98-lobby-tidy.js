/* ================= v98 로비 정리 (TIDY98) =================
   위쪽 줄 단추가 너무 많아서(특히 폰) 자주 안 쓰는 것을 「☰ 더보기」 하나로 모은다.
   - 위쪽 줄에 남는 것: 계정 · 골드 · 다이아 · 친구 · 레벨 · ☰
   - ☰ 안: 난이도(4개 바로 고르기) · 소리 · 전체 화면 · 영상관 · 랭킹 · 조명 쇼(LIGHT SHOW 줄 보이기)
   - 원래 단추(gmName · rplBtn · gmDiffChip · gmSound · mbFs · gmRank)는 숨기기만 하고, ☰ 안 항목이 원래 단추를 눌러 준다(기존 기능 그대로).
   - LIGHT SHOW 줄(#lvDock .lvAlb)은 평소 숨김, ☰에서 켜면 보임(기억: localStorage 'bb-lt98'). */
(()=>{try{
 const $=id=>document.getElementById(id),H=document.documentElement;
 const ls=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){}};
 if(ls('bb-lt98')==='1')H.classList.add('lt98');
 const DN={easy:'쉬움',normal:'보통',hard:'어려움',extreme:'익스트림'};
 const isOn=()=>{try{return !!sound}catch(e){return true}};
 const fsOn=()=>{try{return !!(document.fullscreenElement||document.webkitFullscreenElement)}catch(e){return false}};

 /* ---------- ☰ 단추 ---------- */
 function ensure(){const h=document.querySelector('#gameMenu .gmHud');if(!h)return;let b=$('gmMore');
  if(!b){b=document.createElement('button');b.id='gmMore';b.type='button';b.title='더보기 — 난이도 · 소리 · 전체 화면 · 영상관 · 랭킹 · 조명';b.innerHTML='<i></i><i></i><i></i>';
   b.onclick=e=>{e.stopPropagation();try{gmSfx('ok')}catch(_){}panel.hidden?open():close()};b.addEventListener('pointerdown',e=>e.stopPropagation())}
  if(b.parentNode!==h||h.lastElementChild!==b)h.appendChild(b)}
 setInterval(()=>{try{ensure()}catch(e){}},700);

 /* ---------- 펼친 창 ---------- */
 const panel=document.createElement('div');panel.id='more98';panel.hidden=true;document.body.appendChild(panel);
 panel.addEventListener('pointerdown',e=>e.stopPropagation());
 document.addEventListener('pointerdown',e=>{if(!panel.hidden&&!panel.contains(e.target)&&e.target!==$('gmMore')&&!(e.target.closest&&e.target.closest('#gmMore')))close()},true);
 addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){close();e.stopPropagation()}},true);
 function place(){const b=$('gmMore');if(!b)return;const r=b.getBoundingClientRect(),w=Math.min(300,innerWidth-16);panel.style.width=w+'px';
  panel.style.left=Math.max(8,Math.min(innerWidth-w-8,r.right-w))+'px';panel.style.top=Math.round(r.bottom+6)+'px';panel.style.maxHeight=Math.max(160,innerHeight-r.bottom-14)+'px'}
 function open(){draw();panel.hidden=false;place()}
 function close(){panel.hidden=true}
 const click=id=>{const el=$(id);if(el)el.click()};
 function row(ic,t,sub,act,on){return '<button class="m98" data-a="'+act+'"><i>'+ic+'</i><span><b>'+t+'</b>'+(sub?'<small>'+sub+'</small>':'')+'</span>'+(on==null?'<em>›</em>':'<u class="'+(on?'on':'')+'"></u>')+'</button>'}
 function draw(){const d=typeof diff!=='undefined'?diff:'normal';
  panel.innerHTML='<div class="m98d"><span>난이도</span>'+GM_DIFF.map(([k,n,c])=>'<button data-df="'+k+'" class="'+(k===d?'on':'')+'" style="--dc:'+c+'">'+n+'</button>').join('')+'</div>'+
   row(isOn()?'🔊':'🔇','소리',isOn()?'켜짐':'꺼짐','snd',isOn())+
   ($('mbFs')?row('⛶','전체 화면',fsOn()?'켜짐':'꺼짐','fs',fsOn()):'')+
   row('✨','조명 쇼','로비 무대 조명 바꾸기','lt',H.classList.contains('lt98'))+
   ($('gmRank')?row('🏆','랭킹','점수 · 레벨 · 탑 · 골드 · 결투','rk'):'')+
   ($('rplBtn')?row('🎬','영상관','보스전 다시 보기','rpl'):'');
  panel.querySelectorAll('[data-df]').forEach(b=>b.onclick=()=>{const v=b.dataset.df;try{gmSfx('ok')}catch(e){}try{$('diffSel').value=v;updDiff()}catch(e){}try{gmHud()}catch(e){}draw()});
  panel.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const a=b.dataset.a;
   if(a==='snd'){click('gmSound');setTimeout(draw,30);return}
   if(a==='fs'){click('mbFs');setTimeout(draw,300);return}
   if(a==='lt'){const on=!H.classList.contains('lt98');H.classList.toggle('lt98',on);ls('bb-lt98',on?'1':'0');try{gmSfx('ok')}catch(e){}draw();return}
   close();if(a==='rk')click('gmRank');else if(a==='rpl')click('rplBtn')})}
 addEventListener('resize',()=>{if(!panel.hidden)place()});
 /* 메뉴 화면을 바꾸면 닫기 */
 {const f=gmShow;gmShow=function(){close();return f.apply(this,arguments)}}

 const st=document.createElement('style');st.id='tidy98s';st.textContent=`
 html body #gameMenu .gmHud #gmName,html body #gameMenu .gmHud #rplBtn,html body #gameMenu .gmHud #gmDiffChip,html body #gameMenu .gmHud #gmSound,html body #gameMenu .gmHud #mbFs,html body #gameMenu .gmHud #gmRank{display:none!important}
 html:not(.lt98) #lvDock .lvAlb{display:none!important}
 #gmMore{pointer-events:auto;flex:none;display:inline-flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;width:38px;height:36px;padding:0;border-radius:11px;cursor:pointer;
  background:linear-gradient(180deg,#1d2a2f,#121b1f);border:1px solid #ffffff2e;box-shadow:inset 0 1px 0 #ffffff18,0 3px 10px #0006}
 #gmMore i{display:block;width:16px;height:2px;border-radius:2px;background:#e8f2ee}
 #gmMore:active{transform:scale(.95)}
 @media (max-height:500px){#gmMore{width:32px;height:30px}#gmMore i{width:14px}}
 #more98{position:fixed;z-index:9300;overflow:auto;padding:10px;border-radius:16px;background:linear-gradient(180deg,#16212a,#0b1218);border:1px solid #8ad0ff44;box-shadow:0 14px 40px #000c;color:#e8f4ef;display:flex;flex-direction:column;gap:6px;font-family:inherit;animation:m98in .14s ease-out}
 #more98[hidden]{display:none}
 @keyframes m98in{from{transform:translateY(-6px);opacity:0}}
 #more98 .m98d{display:flex;flex-wrap:wrap;align-items:center;gap:5px;padding:4px 2px 8px;border-bottom:1px solid #ffffff14;margin-bottom:2px}
 #more98 .m98d span{width:100%;font-size:11px;font-weight:900;color:#8aa0a8;letter-spacing:.06em}
 #more98 .m98d button{flex:1;font:inherit;font-weight:900;font-size:12px;padding:7px 0;border-radius:9px;cursor:pointer;color:#cfd8e0;background:#141c26;border:1px solid #ffffff22}
 #more98 .m98d button.on{color:#05070a;background:var(--dc);border-color:var(--dc)}
 #more98 .m98{display:flex;align-items:center;gap:10px;width:100%;font:inherit;text-align:left;padding:8px 10px;border-radius:11px;cursor:pointer;color:#e8f4ef;background:#ffffff08;border:1px solid #ffffff12}
 #more98 .m98:hover{background:#ffffff12}
 #more98 .m98 i{font-style:normal;font-size:18px;width:24px;text-align:center}
 #more98 .m98 span{flex:1;min-width:0}#more98 .m98 b{display:block;font-size:13px}#more98 .m98 small{font-size:11px;color:#8aa0a8}
 #more98 .m98 em{font-style:normal;color:#8aa0a8;font-size:18px}
 #more98 .m98 u{position:relative;width:36px;height:20px;border-radius:999px;background:#3a4650;flex:none}
 #more98 .m98 u::after{content:'';position:absolute;left:2px;top:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left .15s}
 #more98 .m98 u.on{background:#7dffa8}#more98 .m98 u.on::after{left:18px}`;document.head.appendChild(st);
 window.TIDY98={open,close};
}catch(e){console.error('v98 tidy',e)}})();
