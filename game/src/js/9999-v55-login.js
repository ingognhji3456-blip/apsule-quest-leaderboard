/* ================= v55 로그인: 계정 만들기 · 진행 기록을 서버에 보관 =================
   메인 메뉴 위쪽의 「👤 로그인」 단추로 가입·로그인한다. 로그인하면
   - 진행 기록(beatmachina-v2)이 바뀔 때마다 몇 초 안에 서버에 자동 저장
   - 게임을 켤 때 서버 기록이 더 새것이면 자동으로 불러옴
   - 두 기기에서 따로 진행해 기록이 엇갈리면 어느 쪽을 쓸지 묻는다 (메뉴 화면에서만)
   서버는 저장소의 app.py (/api/...). 주소는 로그인 창의 「서버 주소」에서 바꿀 수 있다.
   인터넷이 끊겨도 게임은 그대로 되고, 다시 연결되면 그때 올린다. */
(function(){try{
 const DEF_URL='https://capsule-quest-leaderboard.onrender.com';
 const KEY='beatmachina-acct',SAVE='beatmachina-v2';
 const $=id=>document.getElementById(id);
 /* 계정 상태: url 서버 주소, user 아이디, token 로그인 표, rev 서버 기록 번호, synced 마지막으로 맞춘 기록 */
 let A={url:DEF_URL,user:'',token:'',rev:0,synced:''};
 try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&typeof s==='object')A=Object.assign(A,s)}catch(e){}
 const keep=()=>{try{localStorage.setItem(KEY,JSON.stringify(A))}catch(e){}};
 let st='',busy=false,pend=null,lastTry=0,boxOn=false,snooze=0;
 /* 키 순서와 상관없이 같은 기록이면 같은 글자가 되게 */
 const canon=v=>Array.isArray(v)?'['+v.map(canon).join(',')+']':v&&typeof v==='object'?'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canon(v[k])).join(',')+'}':JSON.stringify(v===undefined?null:v);
 const localObj=()=>{try{return JSON.parse(localStorage.getItem(SAVE))||{}}catch(e){return {}}};
 const localStr=()=>canon(localObj());
 const clears=d=>Object.keys((d&&d.clear)||{}).length;
 const blank=d=>!clears(d)&&!(d&&d.coins);
 const sum=d=>'깬 기록 '+clears(d)+'개 · 코인 '+((d&&d.coins)||0);
 const when=t=>t?new Date(t*1000).toLocaleString('ko-KR',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'}):'';
 const inMenu=()=>{try{return mode==='menu'&&!document.body.classList.contains('inBattle')}catch(e){return false}};

 /* 서버 부르기. 무료 서버는 잠들어 있으면 깨어나는 데 최대 1분쯤 걸린다 */
 async function api(path,method,body,wait){const ctl=typeof AbortController!=='undefined'?new AbortController():null,tm=ctl&&setTimeout(()=>ctl.abort(),wait||70000);
  const h={'Content-Type':'application/json'};if(A.token)h.Authorization='Bearer '+A.token;
  try{const r=await fetch(A.url.replace(/\/+$/,'')+path,{method:method||'GET',headers:h,body:body?JSON.stringify(body):undefined,signal:ctl?ctl.signal:undefined});
   let j={};try{j=await r.json()}catch(e){}return {s:r.status,j}}
  catch(e){return {s:0,j:{error:'서버에 연결할 수 없어요'}}}finally{if(tm)clearTimeout(tm)}}

 /* 서버 기록으로 바꾸고 게임을 다시 연다 */
 function useServer(data,rev){const txt=JSON.stringify(data||{});try{localStorage.setItem(SAVE,txt)}catch(e){return}
  try{for(const k of Object.keys(saveData))delete saveData[k];Object.assign(saveData,{clear:{},chapter:0},data||{})}catch(e){}
  A.rev=rev;A.synced=canon(data||{});keep();setSt('ok');setTimeout(()=>location.reload(),150)}
 /* 이 기기 기록 올리기 */
 async function push(force){if(!A.token||busy||googleWorking)return;const cur=localStr();if(!force&&cur===A.synced)return;
  busy=true;setSt('up');lastTry=Date.now();
  try{const r=await api('/api/save','PUT',{base_rev:A.rev,force:!!force,data:JSON.parse(cur)});
   if(r.s===200){A.rev=r.j.rev;A.synced=cur;keep();setSt('ok')}
   else if(r.s===409)busy=false,await pull(false);/* 서버가 먼저 바뀜 → 같은 기록인지 확인하고, 다르면 물어봄 */
   else if(r.s===401)lost();else setSt('off')}finally{busy=false}}
 /* 서버 기록 확인 (켤 때 · 로그인 직후) */
 async function pull(afterLogin){if(!A.token)return;busy=true;setSt('up');let r;try{r=await api('/api/save')}finally{busy=false}
  if(r.s===401)return lost();if(r.s!==200)return setSt('off');
  const j=r.j,sv=j.data,cur=localStr();
  if(!sv||!j.rev){A.rev=0;keep();return push(false)}/* 서버가 비었으면 이 기기 기록을 올림 */
  if(canon(sv)===cur){A.rev=j.rev;A.synced=cur;keep();return setSt('ok')}
  if(afterLogin){if(blank(localObj()))return useServer(sv,j.rev);pend={why:'login',sv,rev:j.rev,at:j.updated_at};setSt('clash');return later()}
  if(j.rev===A.rev)return push(false);/* 서버는 그대로, 이 기기만 바뀜 */
  if(cur===A.synced&&inMenu())return useServer(sv,j.rev);/* 이 기기는 그대로, 서버가 더 새것 */
  pend={why:'conflict',sv,rev:j.rev,at:j.updated_at};setSt('clash');later()}
 function lost(){A.token='';keep();setSt('lost')}
 /* 엇갈린 기록은 메뉴 화면에 있을 때만 물어본다 (싸우는 중에 창이 뜨지 않게) */
 function later(){if(pend&&inMenu()&&!boxOn&&Date.now()>snooze)open()}

 /* ---------- 화면 ---------- */
 const st0=document.createElement('style');st0.textContent=`
 #acctBox{position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;background:#000b;color:#eaf6ef;font-family:${typeof FONT_STACK!=='undefined'?FONT_STACK:'sans-serif'}}
 #acctBox[hidden]{display:none}
 .acPanel{width:min(400px,calc(100vw - 32px));max-height:calc(100vh - 32px);overflow:auto;box-sizing:border-box;padding:20px;border-radius:10px;background:linear-gradient(180deg,#15232b,#0a1216);box-shadow:0 0 0 2px #05080a,0 0 0 4px #a6f5c6,0 12px 40px #000c}
 .acPanel h3{margin:0 0 4px;font-size:22px;letter-spacing:.12em;text-shadow:0 3px 0 #0009}
 .acRankList{display:flex;flex-direction:column;gap:5px;max-height:52vh;overflow:auto;margin:10px 0}.acRankRow{display:grid;grid-template-columns:42px 1fr auto;gap:8px;align-items:center;padding:8px 10px;border:1px solid #2e5051;border-radius:7px;background:#10242a}.acRankRow b{color:#ffd166}.acRankRow span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.acRankRow strong{color:#a6f5c6}
 .acNote{font-size:12px;color:#9ab8ac;line-height:1.55;margin:4px 0 12px}
 .acTabs{display:flex;gap:8px;margin:10px 0 12px}.acTabs .gmBtn{flex:1;padding:9px 10px;font-size:14px}
 .acTabs .gmBtn.on{box-shadow:0 0 0 2px #05080a,0 0 0 4px #a6f5c6,0 5px 0 4px #05080a;color:#a6f5c6}
 .acPanel label{display:block;font-size:13px;font-weight:800;color:#cfe8dc}
 .acPanel input{display:block;width:100%;box-sizing:border-box;font:inherit;font-size:16px;padding:10px 12px;margin:4px 0 10px;border-radius:6px;border:2px solid #33454a;background:#060d10;color:#eaf6ef;outline:none}
 .acPanel input:focus{border-color:#a6f5c6}
 .acMsg{min-height:19px;font-size:13px;color:#ff8fb0;margin:2px 0 6px;white-space:pre-line}.acMsg.ok{color:#a6f5c6}
 .acRow{display:flex;gap:10px;flex-wrap:wrap;margin-top:8px}.acRow .gmBtn{flex:1 1 140px;padding:11px 12px;font-size:14px}
 .acCard{border:2px solid #ffffff22;border-radius:8px;padding:10px 12px;margin:8px 0;font-size:14px;line-height:1.5}.acCard b{color:#ffe36b}
 .acPanel details{margin-top:12px;font-size:12px;color:#9ab8ac}.acPanel summary{cursor:pointer}
 #acctChip.lost,#acctChip.clash{color:#ffb020}
 @media (max-width:560px){#acctChip .acN{display:none}}`;
 document.head.appendChild(st0);
 const box=document.createElement('div');box.id='acctBox';box.hidden=true;box.innerHTML='<div class="acPanel" id="acPanel"></div>';document.body.appendChild(box);
 /* 창 안에서 누른 키가 뒤의 게임 메뉴로 가지 않게 */
 box.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Escape'&&!pend)close()});
 box.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===box&&!pend)close()});
 const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

 // Google sign-in: keep all account/save state in the existing account module.
 let googleEpoch=0, googleWorking=false, gisPromise=null;
 function loadGIS(){
  if(window.google&&google.accounts&&google.accounts.id)return Promise.resolve();
  if(gisPromise)return gisPromise;
  gisPromise=new Promise((resolve,reject)=>{
   const script=document.createElement('script');script.src='https://accounts.google.com/gsi/client';script.async=true;
   const timer=setTimeout(()=>{script.remove();gisPromise=null;reject(new Error('Google 로그인 로딩이 지연돼요. 다시 눌러 주세요.'))},15000);
   script.onload=()=>{clearTimeout(timer);resolve()};script.onerror=()=>{clearTimeout(timer);script.remove();gisPromise=null;reject(new Error('Google 로그인 화면을 불러오지 못했어요.'))};
   document.head.appendChild(script);
  });return gisPromise;
 }
 function draw(){
  drawBase();const epoch=++googleEpoch;
  if(pend)return;
  const p=$('acPanel'), area=document.createElement('div');area.className='acCard';area.style.marginTop='12px';
  p.appendChild(area);
  if(location.origin!=='https://capsule-quest-leaderboard.onrender.com'){
   const linking=!!A.token;
   area.innerHTML='<b>파일에서도 Google 로그인</b><div class="acNote">'+(linking?'현재 아이디 기록에 Google 계정을 연결해요.':'Google 계정으로 로그인하면 서버 기록을 불러와요.')+'</div><button class="gmBtn" id="fileGoogle">'+(linking?'Google 계정 연결':'Google 로그인')+'</button><div class="acNote" style="margin-top:10px">Google 인증 창이 새 탭으로 열립니다.</div>';
   $('fileGoogle').onclick=()=>{const u='https://capsule-quest-leaderboard.onrender.com/google-bridge?mode='+(linking?'link':'login')+(linking?'#token='+encodeURIComponent(A.token):'');const w=window.open(u,'beatbladeGoogle','width=460,height=650');if(!w)msg('팝업을 허용해 주세요')};return;
  }
  const linking=!!A.token, token=A.token, server=A.url;
  const note=document.createElement('div');note.className='acNote';note.textContent=linking?'기존 기록 그대로 Google 계정을 연결할 수 있어요.':'기존 기록이 있다면 먼저 아이디로 로그인한 뒤 Google 계정을 연결해 주세요.';area.appendChild(note);
  const button=document.createElement('button');button.className='gmBtn';button.textContent=linking?'Google 계정 연결':'Google 로그인 준비';area.appendChild(button);
  const slot=document.createElement('div');slot.style.cssText='margin-top:10px;min-height:4px';area.appendChild(slot);
  const current=()=>epoch===googleEpoch&&A.token===token&&A.url===server&&area.isConnected;
  if(linking)api('/api/me').then(res=>{if(current()&&res.s===200&&res.j.google_linked){note.textContent='✓ Google 계정이 연결돼 있어요. 다음에는 Google 버튼으로 로그인할 수 있어요.';button.remove()}});
  button.onclick=async()=>{
   if(googleWorking)return;
   button.disabled=true;note.textContent='Google 로그인 버튼을 불러오는 중…';
   try{
    await loadGIS();if(!current())return;
    const c=await api('/api/google/challenge','POST',{mode:linking?'link':'login'});if(!current())return;
    if(c.s!==200||!c.j.nonce)throw new Error(c.j.error||'서버에 Google 로그인 업데이트를 먼저 적용해 주세요.');
    google.accounts.id.initialize({client_id:c.j.client_id,nonce:c.j.nonce,auto_select:false,ux_mode:'popup',
     callback:async response=>{
      if(!current()||googleWorking)return;
      googleWorking=true;p.inert=true;note.textContent=linking?'Google 계정을 연결하는 중…':'Google 인증을 확인하는 중…';
      try{
       const res=await api('/api/google/'+(linking?'link':'login'),'POST',{credential:response.credential,nonce:c.j.nonce});
       if(!current())return;
       if(res.s!==200||(!linking&&!res.j.token))throw new Error(res.j.error||'Google 로그인에 실패했어요.');
       if(linking){draw();msg('Google 계정을 연결했어요. 기존 기록을 그대로 사용할 수 있어요.',true)}
       else{
        A.user=res.j.username;A.token=res.j.token;A.rev=0;A.synced='';keep();setSt('');
        // Allow the existing pull routine to upload a local save for a new account.
        googleWorking=false;await pull(true);if(boxOn)draw();
       }
      }catch(e){if(current()){slot.replaceChildren();button.disabled=false;note.textContent=e.message+' 버튼을 다시 눌러 주세요.'}}
      finally{googleWorking=false;p.inert=false}
     }});
    slot.replaceChildren();google.accounts.id.renderButton(slot,{type:'standard',theme:'outline',size:'large',text:linking?'continue_with':'signin_with',locale:'ko',width:240});
    note.textContent=linking?'아래 Google 버튼을 눌러 연결할 계정을 선택해 주세요.':'아래 Google 버튼을 눌러 로그인해 주세요.';button.textContent='버튼 다시 불러오기';button.disabled=false;
   }catch(e){if(current()){note.textContent=e.message;button.disabled=false}}
  };
 }

 let tab='login';
 function open(){boxOn=true;box.hidden=false;document.body.classList.add('acctOn');draw()}
 function close(){boxOn=false;box.hidden=true;document.body.classList.remove('acctOn')}
 function msg(t,ok){const m=$('acMsg');if(m){m.textContent=t||'';m.classList.toggle('ok',!!ok)}}
 function drawBase(){const p=$('acPanel');
  if(pend&&A.token){/* 기록이 엇갈렸을 때 */const sv=pend.sv,lo=localObj();
   p.innerHTML='<h3>☁ 기록 고르기</h3><div class="acNote">'+(pend.why==='login'?'이 계정에 저장된 기록과 이 기기의 기록이 달라요.':'다른 기기에서 먼저 저장한 기록이 있어요.')+'<br>어느 쪽으로 계속할지 골라 주세요. 고르지 않은 쪽은 사라져요.</div>'+
    '<div class="acCard"><b>서버 기록</b>'+(pend.at?' · '+when(pend.at):'')+'<br>'+(sv?esc(sum(sv)):'불러오는 중…')+'</div><div class="acCard"><b>이 기기 기록</b><br>'+esc(sum(lo))+'</div>'+
    '<div class="acMsg" id="acMsg"></div><div class="acRow"><button class="gmBtn" id="acUseSv">서버 기록으로</button><button class="gmBtn" id="acUseLo">이 기기 기록으로</button></div><div class="acRow"><button class="gmBtn" id="acLater">나중에 고르기</button></div>';
   $('acLater').onclick=()=>{snooze=Date.now()+180000;close()};
   if(!sv)api('/api/save').then(r=>{if(r.s===200&&r.j.data&&pend){pend.sv=r.j.data;pend.rev=r.j.rev;pend.at=r.j.updated_at;draw()}else if(r.s!==200)msg(r.j.error||'서버에 연결할 수 없어요')});
   $('acUseSv').onclick=()=>{if(!pend||!pend.sv)return;const q=pend;pend=null;msg('서버 기록을 불러와요…',true);useServer(q.sv,q.rev)};
   $('acUseLo').onclick=async()=>{msg('이 기기 기록을 올리는 중…',true);pend=null;await push(true);if(st==='ok'){close();chip()}else{msg('올리지 못했어요. 인터넷을 확인해 주세요');draw()}};return}
  if(A.token){/* 로그인한 상태 */
   p.innerHTML='<h3>👤 '+esc(A.user)+'</h3><div class="acNote">진행 기록이 이 계정에 자동으로 저장돼요. 다른 기기에서 같은 아이디로 로그인하면 이어서 할 수 있어요.</div>'+
    '<div class="acCard">'+esc(sum(localObj()))+'<br><span style="color:#9ab8ac;font-size:13px">'+stText()+'</span></div><div class="acMsg" id="acMsg"></div>'+
    '<div class="acRow"><button class="gmBtn" id="acNow">지금 저장</button><button class="gmBtn" id="acRank">🏆 랭킹</button></div><div class="acRow"><button class="gmBtn" id="acOut">로그아웃</button><button class="gmBtn" id="acClose">닫기</button></div>';
   $('acNow').onclick=async()=>{msg('저장하는 중…',true);await push(false);if(st==='ok'||st==='')msg('저장했어요',true);else if(!pend)msg(stText());draw()};
   $('acOut').onclick=async()=>{await push(false);api('/api/logout','POST');try{if(window.google)google.accounts.id.disableAutoSelect()}catch(e){};A.token='';A.rev=0;A.synced='';keep();pend=null;setSt('');draw();msg('로그아웃했어요. 이 기기의 기록은 그대로 남아요.',true)};
   $('acClose').onclick=close;$('acRank').onclick=openRank;return}
  /* 로그인 전 */
  const reg=tab==='reg';
  p.innerHTML='<h3>👤 계정</h3><div class="acNote">로그인하면 진행 기록이 서버에 저장돼서, 폰·컴퓨터 어디서든 이어서 할 수 있어요.'+(st==='lost'?'<br><b style="color:#ffb020">로그인이 끝났어요. 다시 로그인해 주세요.</b>':'')+'</div>'+
   '<div class="acTabs"><button class="gmBtn'+(reg?'':' on')+'" id="acTL">로그인</button><button class="gmBtn'+(reg?' on':'')+'" id="acTR">새 계정 만들기</button></div>'+
   '<label>아이디<input id="acId" maxlength="16" autocomplete="username" autocapitalize="off" spellcheck="false" placeholder="한글·영문·숫자 2~16자" value="'+esc(A.user||'')+'"></label>'+
   '<label>비밀번호<input id="acPw" type="password" maxlength="64" autocomplete="'+(reg?'new-password':'current-password')+'" placeholder="6자 이상"></label>'+
   (reg?'<label>비밀번호 한 번 더<input id="acPw2" type="password" maxlength="64" autocomplete="new-password"></label>':'')+
   '<div class="acMsg" id="acMsg"></div><div class="acRow"><button class="gmBtn go" id="acGo" style="font-size:16px">'+(reg?'만들고 로그인':'로그인')+'</button><button class="gmBtn" id="acClose">닫기</button></div>'+
   (reg?'<div class="acNote" style="margin-top:10px">비밀번호를 잊으면 되찾을 수 없어요. 다른 곳에 쓰지 않는 비밀번호로 정해 주세요.</div>':'')+
   '<details><summary>서버 주소</summary><input id="acUrl" spellcheck="false" autocapitalize="off" value="'+esc(A.url)+'"><button class="gmBtn" id="acUrlOk" style="padding:7px 12px;font-size:13px">바꾸기</button></details>';
  $('acTL').onclick=()=>{tab='login';draw()};$('acTR').onclick=()=>{tab='reg';draw()};$('acClose').onclick=close;
  $('acUrlOk').onclick=()=>{const v=$('acUrl').value.trim();if(!/^https?:\/\/\S+$/.test(v))return msg('http:// 또는 https:// 로 시작하는 주소를 넣어 주세요');A.url=v;keep();msg('서버 주소를 바꿨어요',true)};
  const go=async()=>{const id=$('acId').value.trim(),pw=$('acPw').value;
   if(!/^[0-9A-Za-z가-힣_]{2,16}$/.test(id))return msg('아이디는 2~16자의 한글·영문·숫자·_ 만 쓸 수 있어요');
   if(pw.length<6)return msg('비밀번호는 6자 이상으로 해 주세요');
   if(reg&&pw!==$('acPw2').value)return msg('비밀번호가 서로 달라요');
   const b=$('acGo');b.disabled=true;msg('서버에 연결하는 중… (서버가 자고 있으면 1분쯤 걸려요)',true);
   const r=await api(reg?'/api/register':'/api/login','POST',{username:id,password:pw});b.disabled=false;
   if(r.s!==200||!r.j.token)return msg(r.j.error||'잠시 뒤에 다시 해 주세요');
   A.user=r.j.username;A.token=r.j.token;A.rev=0;A.synced='';keep();setSt('');msg('로그인했어요! 기록을 맞추는 중…',true);
   await pull(true);if(!pend&&boxOn){draw();msg(reg?'계정을 만들었어요. 이제 기록이 자동으로 저장돼요.':'로그인했어요. 기록을 맞췄어요.',true)}else if(pend)draw()};
  $('acGo').onclick=go;
  for(const id of ['acId','acPw','acPw2'])if($(id))$(id).addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();go()}});
  setTimeout(()=>{try{($('acId').value?$('acPw'):$('acId')).focus({preventScroll:true})}catch(e){}},30)}

 /* ---------- 메뉴 위쪽 단추 ---------- */
 function stText(){return st==='ok'?'☁ 서버에 저장됨':st==='up'?'☁ 저장하는 중…':st==='off'?'⚠ 서버에 연결 안 됨 (나중에 다시 저장해요)':st==='clash'?'⚠ 기록이 엇갈려요 — 눌러서 고르기':st==='lost'?'⚠ 다시 로그인해 주세요':''}
 function setSt(v){st=v;chip()}
 function chip(){const h=document.querySelector('#gameMenu .gmHud');if(!h)return;let b=$('acctChip');
  if(!b){b=document.createElement('button');b.id='acctChip';b.className='gmBtn';b.style.cssText='padding:7px 12px;font-size:13px';b.onclick=e=>{e.stopPropagation();try{gmSfx('ok')}catch(_){}open()};h.insertBefore(b,h.firstChild)}
  const ic=st==='ok'?' ☁✓':st==='up'?' ☁…':st==='off'?' ☁✕':st==='clash'?' ⚠':'';
  /* 폰 세로 화면처럼 좁으면 글자는 숨기고 아이콘만 */
  b.innerHTML='👤<span class="acN"> '+esc(A.token?A.user:st==='lost'?'다시 로그인':'로그인')+'</span>'+ic;b.className='gmBtn'+(st==='lost'||st==='clash'?' '+st:'');b.title=stText()}
 {const _gs=gmShow;gmShow=function(){const r=_gs.apply(this,arguments);try{chip();later()}catch(e){}return r}}

 /* 기록이 바뀌었는지 5초마다 확인 → 바뀌었으면 올림 (연결이 안 되면 30초 뒤 다시) */
 setInterval(()=>{try{if(!A.token)return;if(pend){later();return}if(st==='off'&&Date.now()-lastTry<30000)return;push(false)}catch(e){}},5000);
 /* 창을 닫거나 다른 앱으로 넘어갈 때 한 번 더 */
 document.addEventListener('visibilitychange',()=>{try{if(document.hidden&&A.token&&!busy&&!pend&&!googleWorking){const cur=localStr();if(cur!==A.synced)fetch(A.url.replace(/\/+$/,'')+'/api/save',{method:'PUT',keepalive:true,headers:{'Content-Type':'application/json',Authorization:'Bearer '+A.token},body:JSON.stringify({base_rev:A.rev,data:JSON.parse(cur)})}).then(r=>r.ok&&r.json()).then(j=>{if(j&&j.ok){A.rev=j.rev;A.synced=cur;keep();setSt('ok')}}).catch(()=>{})}}catch(e){}});
 window.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='beatblade-google-auth'||!d.ok)return;/* 다른 창이 가짜 로그인 표를 넣지 못하게: 우리 서버 주소에서 온 메시지만 */try{if(e.origin!==new URL(A.url).origin)return}catch(_){return}if(d.mode==='link'){draw();msg('Google 계정을 연결했어요. 기존 기록을 그대로 사용할 수 있어요.',true);return}if(d.token){A.user=d.username||'Google 사용자';A.token=d.token;A.rev=0;A.synced='';keep();setSt('');msg('Google 로그인했어요! 기록을 맞추는 중…',true);pull(true).then(()=>{if(boxOn)draw()})}});
 async function rankSubmit(score,meta){if(!A.token||!Number.isFinite(Number(score))||Number(score)<=0)return null;const r=await api('/api/ranking','PUT',{score:Math.floor(Number(score)),chapter:meta&&meta.chapter||0,boss:meta&&meta.boss||'',difficulty:meta&&meta.difficulty||''});return r.s===200?r.j:null}
 async function rankGet(limit){const r=await api('/api/ranking?limit='+(limit||20));return r.s===200?r.j:null}
 function rankHTML(j){const rows=(j&&j.players||[]).map(x=>'<div class="acRankRow"><b>#'+x.rank+'</b><span>'+esc(x.username)+'</span><strong>'+Number(x.score||0).toLocaleString()+'</strong></div>').join('')||'<div class="acNote">아직 등록된 점수가 없어요.</div>';const m=j&&j.mine;return '<h3>🏆 글로벌 랭킹</h3><div class="acNote">전체 최고 점수 기준 · 보스 클리어 후 자동 등록</div><div class="acRankList">'+rows+'</div>'+(m?'<div class="acCard" style="margin-top:10px">내 순위 <b>#'+m.rank+'</b> · '+Number(m.score||0).toLocaleString()+'점</div>':'<div class="acNote">로그인 후 내 점수를 등록할 수 있어요.</div>')+'<div class="acRow"><button class="gmBtn" id="acRankBack">뒤로</button><button class="gmBtn" id="acRankRefresh">새로고침</button></div>'}
 async function openRank(){const p=$('acPanel');p.innerHTML='<h3>🏆 글로벌 랭킹</h3><div class="acNote">불러오는 중…</div>';const j=await rankGet(20);if(!j){p.innerHTML='<h3>🏆 글로벌 랭킹</h3><div class="acMsg">랭킹을 불러오지 못했어요.</div><button class="gmBtn" id="acRankBack">뒤로</button>'}else p.innerHTML=rankHTML(j);if($('acRankBack'))$('acRankBack').onclick=draw;if($('acRankRefresh'))$('acRankRefresh').onclick=openRank}
 window.BBRankSubmit=rankSubmit;
 window.ACCT55={get:()=>A,open,push,pull};
 setTimeout(()=>{chip();if(A.token)pull(false);else if(st==='')chip()},800);
}catch(e){console.error('v55 login',e)}})();
