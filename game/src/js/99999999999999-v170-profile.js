/* v170 프로필 카드 새 디자인: 광장에서 사람을 누르면 나오는 정보 창(#plzInfo)을
   「무대(스킨 · 검 · 펫이 움직이는 그림) + 장비 카드(그림 · 등급 · 능력치 · 스킬) + 전투력」으로 다시 꾸민다.
   원래 창(9999999996 renderInfo)이 그린 단추(친구 · 결투 · 듀오 · 차단 · 신고 · 닫기)는 그대로 옮겨 써서 동작은 바뀌지 않는다. */
(function(){try{
 const TAU=Math.PI*2;
 const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const TIERC={'브론즈':'#d08a5a','실버':'#c8d4e0','골드':'#ffd166','플래티넘':'#7de0d0','다이아':'#8ad8ff','마스터':'#ff7ad8'};
 const tierOf=it=>{try{return wsTier(it)||{}}catch(e){return {}}};
 /* 그림 열쇠(스킨이 있으면 스킨 그림) — 랭킹 보드(999999997)와 같은 방식 */
 function chIdx(l){try{if(l&&l.sk&&window.SKIN58){const s=SKIN58.byId(l.sk);if(s&&s.idx!=null)return s.idx}}catch(e){}return l&&l.ch!=null&&CHARS[l.ch]?l.ch:0}
 const V={l:null,raf:0,wImg:null,wJob:null,parts:[],cvs:null,t0:0};
 /* 검 그림: drawWeaponShape는 #game 캔버스에만 그려서, 게임이 그 프레임을 다시 그리기 직전(frame 첫머리)에 한 번만 옮겨 둔다 */
 {const f=frame;frame=function(){if(V.wJob){const w=V.wJob;V.wJob=null;try{const S=140,c=document.createElement('canvas');c.width=c.height=S;const sp=WSPR[w.type]||WSPR.sword,n=sp.r.length,sc=Math.min(2.6,(S*.86)/(n*.72)),ang=-0.85,L=(n-1)*sc*.72,
    hx=S/2-Math.cos(ang)*(L/2-sp.g*sc*.72),hy=S/2-Math.sin(ang)*(L/2-sp.g*sc*.72);wsWeaponCopy(c.getContext('2d'),w,hx,hy,ang,sc,performance.now(),0,0,S,S);V.wImg=c;paintWeaponIcons()}catch(e){}}return f.apply(this,arguments)}}
 function paintWeaponIcons(){const b=document.getElementById('plzInfo');if(!b||!V.wImg)return;b.querySelectorAll('canvas.p170w').forEach(cv=>{const o=cv.getContext('2d');o.clearRect(0,0,cv.width,cv.height);o.imageSmoothingEnabled=false;o.drawImage(V.wImg,22,22,96,96,0,0,cv.width,cv.height)})}
 /* 전투력: 장비 능력치로 어림한 값(레벨 · 층 포함) */
 function power(j,l){const c=CHARS[l.ch|0]||CHARS[0],w=WEAPONS[l.wp|0]||WEAPONS[0],p=PETS[l.pt|0]||PETS[0];
  const v=1000*(w.dmg||1)*(1+(w.crit||0))*(1+(w.range||0)*.02)+40*(c.hp||0)+25*(c.dash||0)+4000*(p.dmg||0)+30*(j.level||1)+4*(j.floor||1)+
   120*(tierOf(c).k||0)+160*(tierOf(w).k||0)+100*(tierOf(p).k||0);return Math.round(v)}
 function skills(it){try{const a=it&&it.abl;if(!a||!window.MYTH100)return '';return Object.keys(a).map(k=>{const s=MYTH100.ABL[k];return s?'<b style="--c:'+s.col+'">'+s.ico+' '+esc(s.n)+'</b>':''}).join('')}catch(e){return ''}}
 const pct=v=>Math.round(v*100)+'%';
 function card(kind,it,nm,extra){const t=tierOf(it),col=t.c||'#a8b8c0';let st='';
  if(kind==='ch')st=(it.hp?'❤ 체력 +'+it.hp:'❤ 기본 체력')+(it.dash?' · 💨 대시 '+it.dash:'');
  else if(kind==='wp')st='⚔ 공격 ×'+(it.dmg||1).toFixed(2)+(it.crit?' · 💥 치명 +'+pct(it.crit):'')+(it.range?' · 📏 사거리 +'+it.range:'');
  else st=(it.dmg?'🐾 펫 공격 '+(Math.round(it.dmg*1000)/10)+'%':'🐾 응원 펫')+(it.desc?' · '+esc(String(it.desc).slice(0,30)):'');
  const lab={ch:'캐릭터',wp:'무기',pt:'펫'}[kind];
  return '<div class="q" style="--g:'+col+'"><div class="ic"><canvas class="p170'+kind[0]+'" width="64" height="64"></canvas></div><div class="tx"><small>'+lab+'</small><b>'+esc(nm||it.name)+'</b>'+
   '<em>'+esc(t.n||'')+'</em><p>'+st+'</p>'+(extra||'')+'<div class="sk">'+skills(it)+'</div></div></div>'}
 function enhance(){const b=document.getElementById('plzInfo');if(!b||b.hidden)return;const pc=b.querySelector('.pc');if(!pc||pc.dataset.p170||!pc.querySelector('.st'))return;
  const j=window.PLZ111&&PLZ111.S&&PLZ111.S.info;if(!j||j.load)return;pc.dataset.p170=1;const l=j.look||{};V.l=l;
  const c=CHARS[l.ch|0]||CHARS[0],w=WEAPONS[l.wp|0]||WEAPONS[0],p=PETS[l.pt|0]||PETS[0];
  let skN='',pvN='';try{if(l.sk&&window.SKIN58){const s=SKIN58.byId(l.sk);if(s)skN=s.name}}catch(e){}try{if(l.pv&&window.PET59){const s=PET59.byId(l.pv);if(s)pvN=s.name}}catch(e){}
  /* 가장 높은 등급 색이 창의 테마 색 */const tops=[tierOf(c),tierOf(w),tierOf(p)].sort((a,b)=>(b.k||0)-(a.k||0)),th=tops[0].c||'#7dd8ff';pc.style.setProperty('--th',th);
  const tier=j.pvp?j.pvp.tier:'',tc=TIERC[tier]||'#9fb0c8';
  const h3=pc.querySelector('h3');const head=document.createElement('div');head.className='p170h';
  head.innerHTML='<div class="nm"><b>'+esc(j.name)+'</b><span><i>Lv '+(j.level||1)+'</i>'+(tier?'<i style="--c:'+tc+'">🛡 '+esc(tier)+'</i>':'')+(j.me?'<i class="me">나</i>':j.friend==='accepted'?'<i class="fr">친구</i>':'')+'</span></div>'+
   '<div class="pw"><small>전투력</small><b>'+power(j,l).toLocaleString()+'</b></div>';
  h3.replaceWith(head);
  const stage=document.createElement('div');stage.className='p170s';stage.innerHTML='<canvas width="360" height="170"></canvas>'+
   (skN||pvN?'<div class="tags">'+(skN?'<span>👗 '+esc(skN)+'</span>':'')+(pvN?'<span>✨ '+esc(pvN)+'</span>':'')+'</div>':'');
  head.after(stage);
  const st=pc.querySelector('.st');st.classList.add('p170st');st.innerHTML='<span><b>'+(j.level||1)+'</b>레벨</span><span><b>'+(j.floor||1)+'F</b>탑 최고 층</span>'+
   '<span style="--c:'+tc+'"><b>'+(tier?esc(tier):'-')+'</b>'+(j.pvp?j.pvp.wins+'승 '+j.pvp.losses+'패 · '+j.pvp.rating+'점':'결투 기록 없음')+'</span>';
  const ul=pc.querySelector('ul');const eq=document.createElement('div');eq.className='p170e';
  eq.innerHTML=card('ch',c,l.cn,skN?'<i class="ex">👗 스킨 착용</i>':'')+card('wp',w,l.wn)+card('pt',p,l.pn,pvN?'<i class="ex">✨ 펫 스킨</i>':'');
  if(ul)ul.replaceWith(eq);else st.after(eq);
  V.parts=[];V.t0=performance.now();V.wImg=null;V.wJob=w;loop()}
 /* 무대 · 아이콘 그리기 */
 function drawStage(cv,now){const o=cv.getContext('2d'),W=cv.width,H=cv.height,l=V.l||{},t=(now-V.t0)/1000;o.setTransform(1,0,0,1,0,0);o.imageSmoothingEnabled=false;
  const pc=cv.closest('.pc'),th=(pc&&getComputedStyle(pc).getPropertyValue('--th').trim())||'#7dd8ff';
  const g=o.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0c1426');g.addColorStop(1,'#1a2440');o.fillStyle=g;o.fillRect(0,0,W,H);
  /* 뒤쪽 빛줄기(테마 색) */o.save();o.translate(W/2,H*.78);o.globalAlpha=.16;o.fillStyle=th;for(let i=0;i<9;i++){o.rotate(TAU/9);o.save();o.rotate(t*.15);o.beginPath();o.moveTo(0,0);o.lineTo(-14,-H);o.lineTo(14,-H);o.fill();o.restore()}o.restore();
  const rg=o.createRadialGradient(W/2,H*.62,6,W/2,H*.62,W*.42);rg.addColorStop(0,th+'55');rg.addColorStop(1,'#0000');o.fillStyle=rg;o.fillRect(0,0,W,H);
  /* 별 · 바닥 */for(let i=0;i<26;i++){const x=(i*97)%W,y=(i*53)%(H*.55),a=.25+.25*Math.sin(t*2+i);o.fillStyle='rgba(255,255,255,'+a+')';o.fillRect(x,y,1.5,1.5)}
  o.fillStyle='#0a0f1c';o.fillRect(0,H*.84,W,H*.16);o.fillStyle=th+'40';o.fillRect(0,H*.84,W,2);
  o.save();o.globalAlpha=.85;o.fillStyle='#00000088';o.beginPath();o.ellipse(W/2,H*.86,62,9,0,0,TAU);o.fill();o.strokeStyle=th;o.globalAlpha=.55+.25*Math.sin(t*3);o.lineWidth=2;o.beginPath();o.ellipse(W/2,H*.86,58+Math.sin(t*3)*3,8,0,0,TAU);o.stroke();o.restore();
  /* 떠오르는 빛 알갱이 */if(Math.random()<.35)V.parts.push({x:W/2+(Math.random()-.5)*120,y:H*.86,v:.3+Math.random()*.5,a:1});
  V.parts=V.parts.filter(q=>(q.y-=q.v,q.a-=.008)>0);for(const q of V.parts){o.globalAlpha=q.a;o.fillStyle=th;o.fillRect(q.x,q.y,2,2)}o.globalAlpha=1;
  /* 검(캐릭터 뒤 오른쪽, 천천히 떠다님) */if(V.wImg){o.save();o.translate(W/2+78,H*.48+Math.sin(t*1.6)*4);o.rotate(Math.sin(t*.9)*.06);o.shadowColor=th;o.shadowBlur=12;o.drawImage(V.wImg,-62,-62,124,124);o.restore()}
  /* 캐릭터(스킨 포함) */try{const S=2.6,img=ch2Render(chIdx(l),0,Math.round(Math.sin(t*2)*.6),false,t);o.drawImage(img,Math.round(W/2-20*S),Math.round(H*.87-46*S),40*S,48*S)}catch(e){}
  /* 펫(왼쪽, 나는 펫은 공중) */try{const pid=l.pt|0,k=1.5,px=W/2-78,py=window.PET105?PET105.at(l.pv||pid,H*.42+Math.sin(t*2.2)*3,H*.86,k):H*.6;
   if(l.pv&&window.PET59&&PET59.byId&&PET59.byId(l.pv))PET59.draw(o,l.pv,px,py,now,k);else drawPet(o,pid,px,py,now,k)}catch(e){}}
 function drawIcons(b,now){const l=V.l||{},t=(now-V.t0)/1000;
  const cc=b.querySelector('canvas.p170c');if(cc){const o=cc.getContext('2d');o.setTransform(1,0,0,1,0,0);o.clearRect(0,0,64,64);o.imageSmoothingEnabled=false;try{const img=ch2Render(chIdx(l),0,0,false,t);o.drawImage(img,4,0,30,30,2,2,60,60)}catch(e){}}
  const pp=b.querySelector('canvas.p170p');if(pp){const o=pp.getContext('2d');o.setTransform(1,0,0,1,0,0);o.clearRect(0,0,64,64);try{const pid=l.pt|0;if(l.pv&&window.PET59&&PET59.byId&&PET59.byId(l.pv))PET59.draw(o,l.pv,32,36,now,1.2);else drawPet(o,pid,32,36,now,1.2)}catch(e){}}}
 function loop(){if(V.raf)return;const f=now=>{V.raf=0;const b=document.getElementById('plzInfo');if(!b||b.hidden)return;const pc=b.querySelector('.pc[data-p170]');if(!pc)return;
   const cv=pc.querySelector('.p170s canvas');if(cv)drawStage(cv,now);drawIcons(pc,now);V.raf=requestAnimationFrame(f)};V.raf=requestAnimationFrame(f)}
 const b0=document.getElementById('plzInfo');if(b0)new MutationObserver(()=>{try{enhance()}catch(e){console.error('v170 profile',e)}}).observe(b0,{childList:true,subtree:false,attributes:true,attributeFilter:['hidden']});
 const css=document.createElement('style');css.textContent=`
 #plzInfo .pc[data-p170]{width:min(440px,94vw);max-height:calc(100vh - 24px);overflow-y:auto;padding:14px;background:radial-gradient(120% 50% at 50% 0%,color-mix(in srgb,var(--th) 22%,#152038),#0b1220 70%);border-color:color-mix(in srgb,var(--th) 70%,transparent);box-shadow:0 12px 40px #000c,0 0 24px color-mix(in srgb,var(--th) 30%,transparent)}
 #plzInfo .p170h{display:flex;align-items:center;gap:10px;margin:0 52px 8px 0}
 #plzInfo .p170h .nm{flex:1;min-width:0}#plzInfo .p170h .nm>b{display:block;font-size:21px;color:#fff;text-shadow:0 0 12px var(--th);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 #plzInfo .p170h .nm span{display:flex;gap:4px;flex-wrap:wrap;margin-top:3px}#plzInfo .p170h .nm i{font-style:normal;font-size:10.5px;font-weight:900;padding:2px 7px;border-radius:7px;background:#ffffff14;color:var(--c,#cfe0f0);border:1px solid color-mix(in srgb,var(--c,#cfe0f0) 45%,transparent)}
 #plzInfo .p170h .nm i.me{--c:#ffd166}#plzInfo .p170h .nm i.fr{--c:#7dffa8}
 #plzInfo .p170h .pw{text-align:right;padding:5px 10px;border-radius:11px;background:linear-gradient(180deg,#00000055,#0000);border:1px solid color-mix(in srgb,var(--th) 50%,transparent)}
 #plzInfo .p170h .pw small{display:block;font-size:9.5px;color:#9fb0c8;font-weight:800}#plzInfo .p170h .pw b{font-size:17px;color:var(--th);font-variant-numeric:tabular-nums}
 #plzInfo .p170s{position:relative;margin-bottom:8px;border-radius:13px;overflow:hidden;border:1px solid #ffffff1c}#plzInfo .p170s canvas{display:block;width:100%;height:auto;image-rendering:pixelated}
 #plzInfo .p170s .tags{position:absolute;left:6px;top:6px;display:flex;flex-direction:column;gap:3px}#plzInfo .p170s .tags span{font-size:10.5px;font-weight:900;padding:2px 7px;border-radius:7px;background:#000a;color:#ffe7f6;border:1px solid #ffffff33}
 #plzInfo .p170st span{position:relative}#plzInfo .p170st span:last-child b{color:var(--c,#fff)}
 #plzInfo .p170e{display:flex;flex-direction:column;gap:5px;margin-bottom:10px}
 #plzInfo .p170e .q{display:flex;gap:9px;align-items:center;padding:6px 8px;border-radius:11px;background:linear-gradient(90deg,color-mix(in srgb,var(--g) 18%,#0e1626),#0e1626 70%);border:1px solid color-mix(in srgb,var(--g) 45%,transparent)}
 #plzInfo .p170e .ic{flex:none;width:52px;height:52px;border-radius:10px;display:grid;place-items:center;background:radial-gradient(circle,color-mix(in srgb,var(--g) 30%,#0a0f1a),#0a0f1a 75%);border:1px solid color-mix(in srgb,var(--g) 60%,transparent)}
 #plzInfo .p170e .ic canvas{width:48px;height:48px;image-rendering:pixelated}
 #plzInfo .p170e .tx{flex:1;min-width:0;display:grid;grid-template-columns:1fr auto;column-gap:6px;align-items:baseline}
 #plzInfo .p170e .tx small{grid-column:1/-1;font-size:9.5px;color:#8fa0b8;font-weight:800}#plzInfo .p170e .tx b{font-size:13.5px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 #plzInfo .p170e .tx em{font-style:normal;font-size:10px;font-weight:900;padding:1px 6px;border-radius:6px;color:#0a0f1a;background:var(--g)}
 #plzInfo .p170e .tx p{grid-column:1/-1;margin:2px 0 0;font-size:10.5px;color:#c8d6e8}#plzInfo .p170e .ex{grid-column:1/-1;font-style:normal;font-size:10px;color:#ffb8e8;font-weight:800}
 #plzInfo .p170e .sk{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:3px}#plzInfo .p170e .sk:empty{display:none}#plzInfo .p170e .sk b{margin-top:3px;font-size:9.5px;padding:1px 6px;border-radius:6px;color:var(--c);background:#0008;border:1px solid color-mix(in srgb,var(--c) 50%,transparent)}
 @media (orientation:landscape) and (max-height:520px){#plzInfo .pc[data-p170]{width:min(720px,96vw);display:grid;grid-template-columns:1fr 1fr;column-gap:10px;align-content:start;padding:10px 12px}
  #plzInfo .pc[data-p170] .p170h{grid-column:1/-1;margin-bottom:6px}#plzInfo .pc[data-p170] .p170s{grid-column:1;grid-row:2;margin-bottom:6px}#plzInfo .pc[data-p170] .p170st{grid-column:1;grid-row:3;margin-bottom:6px}
  #plzInfo .pc[data-p170] .p170e{grid-column:2;grid-row:2/5;margin-bottom:6px}#plzInfo .pc[data-p170]>:not(.x):not(.p170h):not(.p170s):not(.p170st):not(.p170e){grid-column:1}
  #plzInfo .pc[data-p170] .p170e .q{padding:4px 6px}#plzInfo .pc[data-p170] .p170e .ic{width:42px;height:42px}#plzInfo .pc[data-p170] .p170e .ic canvas{width:38px;height:38px}}`;document.head.appendChild(css);
 window.PRF170={enhance,V};
}catch(e){console.error('v170 profile',e)}})();
