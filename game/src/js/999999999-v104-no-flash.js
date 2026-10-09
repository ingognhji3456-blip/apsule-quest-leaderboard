/* ================= v104 창이 다시 그려질 때 깜빡임 · 스크롤 튐 없애기 (NF104) =================
   듀오 · 결투 창(#duo85), 친구 창(#fr94), 채팅 창(#ch103), 랭킹 창(#rk102), 탑 정보 칸(#twBody)은
   내용이 바뀌면 innerHTML로 통째로 다시 만든다. 그래서
   (1) 창이 「열리는 효과」(아래에서 올라오며 나타남)가 바뀔 때마다 다시 재생되고,
   (2) 스크롤이 맨 위로 튀어서 「새로고침된 것처럼」 보였다.
   - 열리는 효과는 창이 숨김 → 보임으로 바뀐 직후 0.4초에만 허용(html 쪽 .nfOpen 클래스).
   - innerHTML을 바꿀 때 안쪽의 스크롤 위치(창 자신 + 스크롤된 칸)를 기억했다가 그대로 돌려놓는다. */
(()=>{try{
 const IDS=['duo85','fr94','ch103','rk102','twBody','gmTower'];
 const D=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML');if(!D||!D.set)return;
 /* 스크롤된 칸을 「클래스 이름 + 같은 이름 중 몇 번째」로 기억 */
 const keyOf=(root,el)=>{const c=el.className&&typeof el.className==='string'?el.className.split(' ').filter(x=>x&&!/^(on|nw|me|sel)$/.test(x)).join('.'):'';
  const sel=el.tagName.toLowerCase()+(el.id?'#'+el.id:'')+(c?'.'+c:'');let n=0;try{const all=root.querySelectorAll(sel);for(let i=0;i<all.length;i++){if(all[i]===el)break;n++}}catch(e){return null}return [sel,n]};
 function save(root){const out=[];if(root.scrollTop||root.scrollLeft)out.push([null,0,root.scrollTop,root.scrollLeft]);
  root.querySelectorAll('*').forEach(el=>{if(el.scrollTop>0||el.scrollLeft>0){const k=keyOf(root,el);if(k)out.push([k[0],k[1],el.scrollTop,el.scrollLeft])}});return out}
 function restore(root,list){for(const [sel,n,t,l] of list){let el=root;if(sel){try{el=root.querySelectorAll(sel)[n]}catch(e){el=null}}if(el){el.scrollTop=t;el.scrollLeft=l}}}
 function guard(el){if(!el||el.__nf104)return;el.__nf104=1;
  Object.defineProperty(el,'innerHTML',{configurable:true,get(){return D.get.call(this)},set(v){let keep=null;try{keep=save(this)}catch(e){}D.set.call(this,v);if(keep&&keep.length)try{restore(this,keep)}catch(e){}}});
  /* 숨김 → 보임이면 그때만 열리는 효과 */
  let was=el.hidden||getComputedStyle(el).display==='none';
  new MutationObserver(()=>{const now=el.hidden||el.style.display==='none';if(was&&!now){el.classList.add('nfOpen');clearTimeout(el.__nfT);el.__nfT=setTimeout(()=>el.classList.remove('nfOpen'),420)}was=now}).observe(el,{attributes:true,attributeFilter:['hidden','style']})}
 function scan(){for(const id of IDS)guard(document.getElementById(id))}
 scan();setInterval(scan,1000);
 const st=document.createElement('style');st.id='nf104s';st.textContent=`
 #duo85:not(.nfOpen) .dP,#fr94:not(.nfOpen) .frP,#ch103:not(.nfOpen) .chP{animation:none!important}`;document.head.appendChild(st);
 window.NF104={guard,scan};
}catch(e){console.error('v104 no-flash',e)}})();
