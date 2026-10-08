/* ================= v94 장비 강화 (ENH94) =================
   태엽 공방에서 가진 캐릭터 · 무기 · 펫을 +1 ~ +10까지 강화한다(골드).
   - 무기: 공격력 +6% / 단계,  캐릭터: 체력 +5% / 단계,  펫: 공격 +2%p / 단계 (펫의 dmg에 더함)
   - 성공 확률: +1~+3 100%, +4 95%, +5 85%, +6 75%, +7 60%, +8 50%, +9 40%, +10 30%
   - 실패하면 골드만 잃는다. +7 이상에서 실패하면 1단계 내려간다(💎 다이아로 「보호」하면 안 내려감).
   - 저장: saveData.enh94={ch:{번호:단계},wp:{…},pt:{…}}
   능력치는 읽는 곳을 감싸서 적용한다: WEAPONS · PETS 칸 읽기(99998 · 9999998이 만든 getter 위에 한 겹), charStats(체력).
   그래서 탑 · 보스 · 듀오 · 결투(내 장비 그대로) 모두에 들어간다. */
(()=>{try{
 if(typeof WEAPONS==='undefined'||typeof PETS==='undefined')return;
 const MAX=10,RATE=[1,1,1,.95,.85,.75,.6,.5,.4,.3],EFF={wp:.06,ch:.05,pt:.02};
 const E=()=>{const s=saveData;s.enh94=s.enh94||{ch:{},wp:{},pt:{}};for(const k of ['ch','wp','pt'])s.enh94[k]=s.enh94[k]||{};return s.enh94};
 const lvOf=(k,i)=>Math.max(0,Math.min(MAX,(E()[k][i]|0)));
 const cost=lv=>Math.round(150*Math.pow(lv+1,1.8)/10)*10;
 const protCost=lv=>lv>=6?20*(lv-5):0;
 /* ---------- 능력치에 얹기 ---------- */
 function wrapArr(arr,k,apply){for(let i=0;i<arr.length;i++){const d=Object.getOwnPropertyDescriptor(arr,i);if(!d)continue;const g=d.get?d.get:()=>d.value,cache=new Map();
   try{Object.defineProperty(arr,i,{configurable:true,enumerable:true,get(){const o=g.call(arr);const lv=lvOf(k,i);if(!lv||!o)return o;const key=lv;let c=cache.get(o);if(!c){c={};cache.set(o,c)}
     if(!c[key]){const n=Object.assign(Object.create(o),o);/* 원래 값을 모두 직접 담음(통째 복사하는 곳이 있어서) */apply(n,o,lv);n.__enh=lv;c[key]=n}return c[key]},set(v){if(d.set)d.set.call(arr,v);else d.value=v}})}catch(e){}}}
 wrapArr(WEAPONS,'wp',(n,o,lv)=>{n.dmg=+(((o.dmg||1)*(1+EFF.wp*lv)).toFixed(3))});
 wrapArr(PETS,'pt',(n,o,lv)=>{n.dmg=+(((o.dmg||0)+EFF.pt*lv).toFixed(3))});
 {const f=charStats;charStats=function(i){const r=f.apply(this,arguments);try{const lv=lvOf('ch',i);if(lv&&r)return Object.assign({},r,{hp:Math.round(r.hp*(1+EFF.ch*lv))})}catch(e){}return r}}

 /* ---------- 공방: 이름 옆 +N · 강화 칸 ---------- */
 {const f=wsItemHTML;wsItemHTML=function(k,i){let h=f.apply(this,arguments);const lv=lvOf(k,i);if(lv)h=h.replace(/<\/b><\/div>$/,' <span class="enh94b l'+Math.min(3,Math.floor(lv/4))+'">+'+lv+'</span></b></div>');return h}}
 const effTx=(k,lv)=>k==='wp'?'공격력 +'+Math.round(EFF.wp*lv*100)+'%':k==='ch'?'체력 +'+Math.round(EFF.ch*lv*100)+'%':'펫 공격 +'+Math.round(EFF.pt*lv*100)+'%p';
 let prot=false,anim=null;
 function panel(){const k=shopTab;if(!['ch','wp','pt'].includes(k))return;const i=wsSelOf(k),inv=shopInv(),own=inv.inv[k].includes(i);const inf=$('wsInfo'),btn=$('wsBtn');if(!inf||!btn)return;
  const old=$('enh94');if(old)old.remove();if(!own)return;
  const lv=lvOf(k,i),mx=lv>=MAX,c=cost(lv),rate=mx?0:RATE[lv],pc=protCost(lv),dia=(saveData.dia80||{}).n||0,poor=inv.coins<c;
  const d=document.createElement('div');d.id='enh94';d.className=anim?'a-'+anim:'';
  d.innerHTML='<div class="e94h"><b>⚒ 강화</b><span class="e94lv">+'+lv+'</span><span class="e94pip">'+Array.from({length:MAX},(_,j)=>'<i class="'+(j<lv?'on':'')+(j>=6?' hi':'')+'"></i>').join('')+'</span></div>'+
   (mx?'<div class="e94max">최대 강화 완료! '+effTx(k,lv)+'</div>':
   '<div class="e94r"><span>지금 <b>'+(lv?effTx(k,lv):'효과 없음')+'</b></span><span class="ar">▶</span><span>+'+(lv+1)+' <b class="nx">'+effTx(k,lv+1)+'</b></span></div>'+
   '<div class="e94r s"><span>성공 확률 <b class="rt r'+(rate>=.95?0:rate>=.6?1:2)+'">'+Math.round(rate*100)+'%</b></span><span>'+(lv>=6?'실패하면 <b class="dn">1단계 하락</b>':'실패해도 단계 유지')+'</span></div>'+
   (pc?'<label class="e94p"><input type="checkbox" id="e94pr"'+(prot?' checked':'')+'> 💎 '+pc+' 다이아로 보호 <small>(실패해도 안 내려가요 · 보유 💎 '+dia.toLocaleString()+')</small></label>':'')+
   '<button id="e94go"'+(poor?' class="poor"':'')+'>⚒ 강화하기 · 🪙 '+c.toLocaleString()+'</button>');
  btn.parentNode.insertBefore(d,btn);
  const cb=$('e94pr');if(cb)cb.onchange=()=>{prot=cb.checked};
  const go=$('e94go');if(go)go.onclick=()=>doEnh(k,i)}
 function doEnh(k,i){const inv=shopInv(),lv=lvOf(k,i);if(lv>=MAX)return;const c=cost(lv),pc=protCost(lv),useP=prot&&pc>0;
  if(inv.coins<c){try{sfx(140,.15,'square',.04,90)}catch(e){}try{wsSay('강화하려면 골드가 '+(c-inv.coins).toLocaleString()+' 더 필요해!')}catch(e){}return}
  const d80=saveData.dia80||{n:0};if(useP&&(d80.n||0)<pc){try{wsSay('보호에 쓸 다이아가 모자라! (💎 '+pc+')')}catch(e){}return}
  inv.coins-=c;saveData.coins=inv.coins;if(useP){d80.n-=pc;try{DIA80.chip&&DIA80.chip()}catch(e){}}
  const ok=Math.random()<RATE[lv],E2=E();
  if(ok){E2[k][i]=lv+1;anim='ok';try{sfx(660,.12,'triangle',.06,1320);setTimeout(()=>sfx(990,.2,'triangle',.05,1980),90);perc('crash',audio.currentTime,.4)}catch(e){}try{wsSay('강화 성공! +'+(lv+1)+' — '+effTx(k,lv+1))}catch(e){}}
  else{const drop=lv>=6&&!useP;if(drop)E2[k][i]=lv-1;anim=drop?'down':'fail';try{sfx(160,.3,'sawtooth',.05,60)}catch(e){}try{wsSay(drop?'강화 실패… +'+(lv-1)+'로 내려갔어':'강화 실패… 단계는 그대로야')}catch(e){}}
  try{saveNow()}catch(e){}try{gmHud()}catch(e){}renderShop();setTimeout(()=>{anim=null},700)}
 {const f=wsRefresh;wsRefresh=function(){const r=f.apply(this,arguments);try{panel();const lv=lvOf(shopTab,wsSelOf(shopTab)),h=document.querySelector('#wsInfo .wsHead b');if(h&&lv&&!h.querySelector('.enh94b'))h.insertAdjacentHTML('beforeend',' <span class="enh94b l'+Math.min(3,Math.floor(lv/4))+'">+'+lv+'</span>')}catch(e){console.error('enh94',e)}return r}}

 const st=document.createElement('style');st.id='enh94s';st.textContent=`
 #wsInfo:has(#enh94) #wsBtn{position:static!important}
 .enh94b{display:inline-block;font-style:normal;font-size:.72em;font-weight:900;padding:0 5px;border-radius:6px;margin-right:4px;vertical-align:middle;color:#05070a;background:#a6f5c6}
 .enh94b.l1{background:#8de4ff}.enh94b.l2{background:linear-gradient(180deg,#ffe79a,#ffb020)}.enh94b.l3{background:linear-gradient(180deg,#ffb2c0,#ff2d55);color:#fff;box-shadow:0 0 8px #ff2d5588}
 #enh94{margin:8px 0 6px;padding:10px 12px;border-radius:12px;background:linear-gradient(180deg,#2a1c0c,#140c06);border:1px solid #ffb02066;box-shadow:inset 0 1px 0 #ffffff14;display:flex;flex-direction:column;gap:6px}
 #enh94 .e94h{display:flex;align-items:center;gap:8px}#enh94 .e94h b{color:#ffd166;font-size:14px}
 #enh94 .e94lv{font-weight:900;font-size:18px;color:#fff;text-shadow:0 0 10px #ffb020}
 #enh94 .e94pip{display:flex;gap:3px;margin-left:auto}#enh94 .e94pip i{width:9px;height:9px;border-radius:2px;background:#3a2a18;border:1px solid #5a4020}#enh94 .e94pip i.on{background:linear-gradient(180deg,#fff0b0,#ffb020);border-color:#ffe79a;box-shadow:0 0 5px #ffb02088}#enh94 .e94pip i.hi.on{background:linear-gradient(180deg,#ffc8d4,#ff2d55);border-color:#ffb2c0}
 #enh94 .e94r{display:flex;align-items:center;gap:8px;font-size:12px;color:#e8d8c0;flex-wrap:wrap}#enh94 .e94r b{color:#fff}#enh94 .e94r .nx{color:#7dffa8}#enh94 .e94r .ar{color:#ffb020}
 #enh94 .e94r.s{justify-content:space-between}#enh94 .rt.r0{color:#7dffa8}#enh94 .rt.r1{color:#ffd166}#enh94 .rt.r2{color:#ff8a9a}#enh94 .dn{color:#ff8a9a}
 #enh94 .e94p{display:flex;align-items:center;gap:6px;font-size:12px;color:#bfefff;cursor:pointer}#enh94 .e94p small{color:#8aa0a8}
 #enh94 #e94go{font:inherit;font-weight:900;font-size:14px;padding:9px;border-radius:10px;border:1px solid #ffe79a;cursor:pointer;color:#2a1a04;background:linear-gradient(180deg,#fff0b0,#ffb020);box-shadow:0 0 12px #ffb02055;position:relative;overflow:hidden}
 #enh94 #e94go.poor{filter:grayscale(.6) brightness(.8)}#enh94 #e94go:active{transform:scale(.98)}
 #enh94 .e94max{font-weight:900;color:#ffd166;text-align:center;padding:6px}
 #enh94.a-ok{animation:e94ok .7s ease-out}#enh94.a-fail{animation:e94no .45s}#enh94.a-down{animation:e94no .45s;background:linear-gradient(180deg,#3a0e14,#140608)}
 @keyframes e94ok{0%{box-shadow:0 0 0 0 #ffd166,inset 0 0 40px #ffd16688}100%{box-shadow:0 0 0 14px #ffd16600}}
 @keyframes e94no{20%{transform:translateX(-5px)}40%{transform:translateX(5px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}`;document.head.appendChild(st);
 window.ENH94={lvOf,cost,RATE,EFF};
}catch(e){console.error('v94 enhance',e)}})();
