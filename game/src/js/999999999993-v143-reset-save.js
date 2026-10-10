/* v143: 계정 기록 처음부터 하기 (RS143)
   로그인한 계정 창(☰ · 계정 단추)의 「지금 저장 · 랭킹 · 로그아웃」 아래에 「기록 처음부터」 단추.
   두 번 확인 → 이 기기 기록을 'bb-save-backup'에 남기고 → 빈 기록 + 처음부터 한 시각(rst143)을 서버에 덮어쓰기(force) → 다시 열기.
   다른 기기에 옛 기록이 남아 있어도 9999 autoPick이 rst143이 더 새로운 서버 기록을 고른다. 결제한 상품(서버 보유)은 그대로. */
(function(){try{
 const SAVE='beatmachina-v2';
 async function reset(){const A=window.ACCT55&&ACCT55.get();if(!A||!A.token){alert('로그인한 계정만 처음부터 할 수 있어요.');return}
  if(!confirm('「'+A.user+'」 계정의 진행 기록(레벨 · 탑 · 코인 · 다이아 · 장비 · 비밀의 방 …)을 모두 지우고 처음부터 할까요?\n\n결제한 상품은 그대로 남아요.'))return;
  const t=prompt('정말 지우려면 「처음부터」라고 입력해 주세요.');if((t||'').trim()!=='처음부터'){alert('입력이 달라서 지우지 않았어요.');return}
  try{localStorage.setItem('bb-save-backup',JSON.stringify({at:Date.now(),kept:'reset',data:JSON.parse(localStorage.getItem(SAVE)||'{}')}))}catch(e){}
  const fresh={rst143:Date.now()};try{localStorage.setItem(SAVE,JSON.stringify(fresh))}catch(e){}
  try{for(const k of Object.keys(saveData))delete saveData[k];Object.assign(saveData,{clear:{},chapter:0},fresh)}catch(e){}
  let ok=false;for(let i=0;i<20&&!ok;i++){try{await ACCT55.push(true);const B=ACCT55.get();ok=B.synced&&B.synced.indexOf('rst143')>=0}catch(e){}if(!ok)await new Promise(r=>setTimeout(r,500))}
  alert(ok?'처음부터 시작해요!':'서버에 올리지 못했어요. 인터넷을 확인해 주세요(이 기기는 처음부터로 바뀌었고, 연결되면 다시 올려요).');location.reload()}
 function mount(){const box=document.getElementById('acctBox');if(!box||box.hidden)return;const out=document.getElementById('acOut');if(!out||document.getElementById('acReset143'))return;
  const row=document.createElement('div');row.className='acRow';const b=document.createElement('button');b.className='gmBtn';b.id='acReset143';b.textContent='🗑 기록 처음부터';b.style.cssText='background:#3a1018;border-color:#ff5a7a;color:#ffd0d8';b.onclick=e=>{e.preventDefault();reset()};row.appendChild(b);
  (out.closest('.acRow')||out.parentNode).after(row)}
 setInterval(()=>{try{mount()}catch(e){}},400);
 window.RS143={reset};
}catch(e){console.warn('v143',e)}})();
