/* ================= v102 겹겹이 쌓이는 능력치 막대 (LAY102) =================
   태엽 공방의 능력치 막대를 한 줄 비교(가장 센 장비 = 100%) 대신 「층」으로 보여 준다.
   - 한 층이 꽉 차면 그 위에 다음 색 층이 다시 차오른다(초록 → 하늘 → 보라 → 금 → 빨강 → 분홍 → 흰색).
   - 막대 오른쪽에 「×층 수」 배지, 숫자, 지금 장착한 것과의 차이(▲/▼).
   - 펫도 「펫 공격」(공격력에 더해지는 비율) 막대가 생기고, 보조 능력은 아래 글로.
   (v102에서 모든 장비의 능력치를 등급 순서대로 오르게 맞췄으니, 등급이 높을수록 층이 많아진다) */
(()=>{try{
 if(typeof wsStatRows!=='function')return;
 const COL=['#7dffa8','#5ad0ff','#b48aff','#ffd166','#ff6a6a','#ff9af0','#ffffff'];
 const S={hp:{u:60,b:40},dash:{u:4,b:0},dmg:{u:.45,b:-.5},crit:{u:.08,b:0},grogi:{u:.08,b:0},range:{u:10,b:10},pet:{u:.07,b:0}};
 function bar(lab,ico,v,v0,key,fmt,fmtD){const s=S[key],q=Math.max(0,(v+s.b)/s.u),n=Math.floor(q),fr=q-n,d=v-v0;
  const under=n>0?COL[Math.min(COL.length-1,n-1)]:'transparent',top=COL[Math.min(COL.length-1,n)];
  const pips=Array.from({length:Math.min(7,n)},(_,j)=>'<i style="background:'+COL[Math.min(COL.length-1,j)]+'"></i>').join('');
  return '<div class="ly102"><span class="lb">'+ico+' '+lab+'</span><div class="tr" style="--u:'+under+';--t:'+top+'"><i class="f" style="width:'+Math.round(fr*100)+'%"></i><em class="pp">'+pips+'</em></div>'+
   '<b><u style="background:'+(n>0?COL[Math.min(COL.length-1,n-1)]:'#2a3436')+'">×'+(n+(fr>=.5?1:0)||1)+'</u>'+fmt(v)+(Math.abs(d)>1e-6?' <small class="'+(d>0?'up':'dn')+'">'+(d>0?'▲':'▼')+(fmtD||fmt)(Math.abs(d))+'</small>':'')+'</b></div>'}
 wsStatRows=function(k,i){const inv=shopInv(),e=inv.eq[k],L=WS_LIST(k),it=L[i],e0=L[e]||it;
  if(k==='ch'){const s=charStats(i),s0=charStats(e),c=CHARS[i],c0=CHARS[e]||c;
   return bar('체력','❤',c.hp||0,c0.hp||0,'hp',v=>Math.round(s.hp)+'',v=>Math.round(Math.abs(s.hp-s0.hp))+'')+bar('대시','⚡',s.dash,s0.dash,'dash',v=>v+'칸',v=>Math.round(v)+'칸')}
  if(k==='wp'){let h=bar('피해','⚔',it.dmg||1,e0.dmg||1,'dmg',v=>'×'+v.toFixed(2),v=>v.toFixed(2))+bar('치명','✦',it.crit||0,e0.crit||0,'crit',v=>Math.round(v*100)+'%')+bar('그로기','◎',it.grogi||0,e0.grogi||0,'grogi',v=>'+'+Math.round(v*100)+'%')+
    bar('사거리','↔',it.range||0,e0.range||0,'range',v=>(v>0?'+':'')+v,v=>String(Math.round(v)));if(it.sp)h+='<div class="wsSp">✦ 필살기 · '+it.sp+'</div>';return h}
  return bar('펫 공격','🐾',it.dmg||0,e0.dmg||0,'pet',v=>'+'+Math.round(v*100)+'%')+'<div class="wsPet">✦ '+it.desc+'</div>'+(e!==i?'<div class="wsPet old">지금 함께하는 친구: '+e0.name+' · '+e0.desc+'</div>':'')};
 const st=document.createElement('style');st.id='ly102s';st.textContent=`
 .ly102{display:grid;grid-template-columns:74px 1fr 118px;gap:8px;align-items:center;font-size:12px;margin:4px 0}
 .ly102 .lb{white-space:nowrap}
 .ly102 .tr{position:relative;height:11px;border-radius:6px;background:var(--u);box-shadow:inset 0 0 0 1px #ffffff22;overflow:hidden}
 .ly102 .tr:not([style*="--u:transparent"]){background:linear-gradient(180deg,color-mix(in srgb,var(--u) 75%,#000),color-mix(in srgb,var(--u) 55%,#000))}
 .ly102 .tr[style*="--u:transparent"]{background:#0c0806}
 .ly102 .f{position:absolute;left:0;top:0;bottom:0;border-radius:6px;background:linear-gradient(180deg,color-mix(in srgb,var(--t) 70%,#fff),var(--t));box-shadow:0 0 8px var(--t);transition:width .3s}
 .ly102 .pp{position:absolute;right:3px;top:2px;display:flex;gap:2px}.ly102 .pp i{width:4px;height:7px;border-radius:2px;box-shadow:0 0 0 1px #0008}
 .ly102 b{text-align:right;font-variant-numeric:tabular-nums;display:flex;align-items:center;justify-content:flex-end;gap:4px;white-space:nowrap}
 .ly102 b u{text-decoration:none;font-size:9.5px;font-weight:900;color:#05070a;border-radius:5px;padding:0 4px}
 .ly102 small{font-size:10px}.ly102 small.up{color:#7dffa8}.ly102 small.dn{color:#ff8a8a}`;document.head.appendChild(st);
 window.LAY102={COL,S};
}catch(e){console.error('v102 layers',e)}})();
