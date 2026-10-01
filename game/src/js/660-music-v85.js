/* ================= v85: 3분짜리 곡 (구간마다 새 선율 · 8마디 화성 · 필인 변화 · 아웃트로) ================= */
/* 구성(기본): 인트로 8 · 벌스1 8 · 프리 4 · 코러스1 16 · 브레이크 8 · 벌스2 8 · 프리 4 · 코러스2 16 · 브리지 8 · 빌드 4 · 파이널 16 · 아웃트로 8
   → 템포에 맞춰 약 3분이 되도록 늘이고 줄임. 3분이 끝나면 인트로를 건너뛰고 다른 조로 다시 시작 */
const CL3_PRE=[[3,4,5,4],[5,3,4,4],[1,3,4,4],[3,3,4,4],[5,6,3,4],[2,3,4,4]];
const CL3_VINST=['pluck','bell','harpsi','flute','organ','chip','harp','pizz'];
function cl3Motif(r,C,bars,rhA,rhB,start,lo,hi){const L=C.sc.length,out=[];let d=start;for(let b=0;b<bars;b++){const pat=b%2?rhB:rhA;for(let i=0;i<16;i++){const c=pat[i];if(c==='x'){const m=r();d+=m<.28?0:m<.62?(r()<.5?1:-1):m<.86?(r()<.5?2:-2):(r()<.5?3:-3);d=clamp(d,L+lo,L*2+hi);out.push(d)}else out.push(c==='-'?'-':null)}}return out}
function cl3Shift(m,k,L,lo,hi){return m.map(v=>typeof v==='number'?clamp(v+k,L+lo-1,L*2+hi+1):v)}
function cl3Cad(m,C,target){const L=C.sc.length,o=m.slice();let last=-1;for(let i=o.length-1;i>=0;i--)if(typeof o[i]==='number'){last=i;break}if(last<0)return o;o[last]=target;for(let i=last+1;i<o.length;i++)o[i]=i<last+6?'-':null;
 let prev=-1;for(let i=last-1;i>=0;i--)if(typeof o[i]==='number'){prev=i;break}if(prev>=0)o[prev]=target+(o[prev]>target?1:-1);return o}
/* 8마디 악절: 동기 → 동기 변형(반복진행) → 대조 → 종지 */
function cl3Phrase(seed,C,bars,o){o=o||{};const r=rng(hash('cl3|'+seed)),L=C.sc.length,lo=o.lo==null?-1:o.lo,hi=o.hi==null?3:o.hi;
 const rA=CL_RH[Math.floor(r()*CL_RH.length)],rB=CL_RH[Math.floor(r()*CL_RH.length)],rC=CL_RH[Math.floor(r()*CL_RH.length)],rD=CL_RH[Math.floor(r()*CL_RH.length)];
 const slow=o.slow?(p=>p.replace(/x\./g,'x-').replace(/\.\./g,'--')):(p=>p);
 const m1=cl3Motif(r,C,2,slow(rA),slow(rB),L+Math.floor(r()*3),lo,hi),m2=cl3Shift(m1,r()<.5?1:(r()<.5?2:-1),L,lo,hi),m3=cl3Motif(r,C,2,slow(rC),slow(rD),L+2+Math.floor(r()*2),lo,hi+1),m4=cl3Cad(m1.slice(0,16).concat(cl3Motif(r,C,1,slow(rB),slow(rB),L+1,lo,hi)),C,o.half?L+4:L);
 let out=bars<=4?m1.concat(cl3Cad(m3,C,o.half?L+4:L)):m1.concat(m2,m3,m4);
 if(bars>8){/* 16마디: 두 번째 악절은 앞 절반을 되풀이하고 새 종지로 */const r2=rng(hash('cl3b|'+seed)),m3b=cl3Motif(r2,C,2,slow(rD),slow(rA),L+3,lo,hi+1),m4b=cl3Cad(m1.slice(0,16).concat(cl3Motif(r2,C,1,slow(rC),slow(rC),L,lo,hi)),C,L);
  const first=m1.concat(m2,m3,cl3Cad(m4,C,L+4));out=first.concat(m1,cl3Shift(m2,1,L,lo,hi),m3b,m4b)}
 return out.slice(0,bars*16)}
function cl3Prog(list,len,per){const out=[];for(let b=0;b<len;b++)out.push(list[Math.floor(b/per)%list.length]);return out}
function cl3Form(C,ms){if(C.fm&&C.fm.ms===ms)return C.fm;const bpm=60000/ms,target=Math.round(180*bpm/240),h=hash('cl3f|'+C.id),r=rng(h),half=C.F.half?2:1;
 const S=[['intro',8],['verse1',8],['pre1',4],['chorus1',16],['break',8],['verse2',8],['pre2',4],['chorus2',16],['bridge',8],['build',4],['final',16],['outro',8]];
 const len=n=>S.find(s=>s[0]===n),sum=()=>S.reduce((a,s)=>a+s[1],0);
 const cut=[()=>{const i=S.findIndex(s=>s[0]==='break');if(i>=0)S.splice(i,1)},()=>{len('outro')[1]=4},()=>{const i=S.findIndex(s=>s[0]==='pre2');if(i>=0)S.splice(i,1)},()=>{len('intro')[1]=4},()=>{len('bridge')[1]=4}];
 const add=[()=>{len('verse1')[1]=16},()=>{len('verse2')[1]=16},()=>{len('bridge')[1]=16},()=>{len('pre1')[1]=8},()=>{len('pre2')&&(len('pre2')[1]=8)},()=>{len('final')[1]=24}];
 for(const f of cut)if(sum()>target+3)f();for(const f of add)if(sum()<target-5)f();
 /* 재료 */const P=CL_PROGS,pick=k=>P[(h>>>k)%P.length],pA=C.prog,pV1=pick(3),pV2a=pick(7),pV2=pV2a.join()===pV1.join()?P[(h+5)%P.length]:pV2a,pBr=pick(11),pPre=CL3_PRE[(h>>>13)%CL3_PRE.length];
 const chP=[...pA,...pA.slice(0,3),4],chP2=[...pA,...pA.slice(0,3),0];
 const vI=CL3_VINST[h%CL3_VINST.length],vI2a=CL3_VINST[(h>>>5)%CL3_VINST.length],vI2=vI2a===vI?CL3_VINST[(h+3)%CL3_VINST.length]:vI2a;
 const mel={verse1:cl3Phrase(C.id+'v1',C,16,{lo:-2,hi:1}),verse2:cl3Phrase(C.id+'v2',C,16,{lo:-1,hi:2}),pre:cl3Phrase(C.id+'pr',C,8,{lo:0,hi:3,half:1}),chorus:cl3Phrase(C.id+'ch',C,16,{lo:0,hi:4}),
  bridge:cl3Phrase(C.id+'br',C,16,{lo:-2,hi:2,slow:1}),brk:cl3Phrase(C.id+'bk',C,8,{lo:0,hi:3}),counter:cl3Phrase(C.id+'ct',C,16,{lo:2,hi:5,slow:1})};
 const secs=[];let st=0;const cnt={};
 for(const [name,n] of S){const type=name.replace(/\d$/,'');cnt[type]=(cnt[type]||0)+1;let prog,m=null,inst=null;
  if(type==='intro'){prog=cl3Prog(pA,n,half);m=mel.chorus.slice(0,n*16).map((v,i)=>i<(n/2)*16?null:(typeof v==='number'&&i%4===0?v:null))}
  else if(name==='verse1'){prog=cl3Prog(pV1.slice(0,3).concat([pV1[3]]),n,half);m=mel.verse1;inst=vI}
  else if(name==='verse2'){prog=cl3Prog(pV2,n,half);m=mel.verse2;inst=vI2}
  else if(type==='pre'){prog=cl3Prog(pPre,n,n>=8?2:1);m=mel.pre}
  else if(type==='chorus'||type==='final'){const pp=[];for(let b=0;b<n;b++){const blk=Math.floor(b/(8*half))%2,idx=Math.floor(b/half)%8;pp.push((blk?chP2:chP)[idx])}prog=pp;m=mel.chorus}
  else if(type==='break'){prog=cl3Prog(pA,n,2);m=mel.brk}
  else if(type==='bridge'){prog=cl3Prog(pBr,n,2);m=mel.bridge}
  else if(type==='build'){prog=cl3Prog([pPre[2],pPre[3]],n,2);m=null}
  else if(type==='outro'){prog=cl3Prog(pA,n,2);m=mel.chorus.slice(0,n*16).map((v,i)=>typeof v==='number'&&i%8===0?v:null)}
  secs.push({name,type,len:n,start:st,prog,m,inst,tr:type==='final'?(h%3?2:1):0,idx:cnt[type]});st+=n}
 const introLen=secs[0].len;
 return C.fm={ms,secs,total:st,introLen,chorus1:secs.find(s=>s.name==='chorus1').start,sec:mel,h}}
function cl3At(C,bar){const F=C.fm;let loop=0,b=bar;if(bar>=F.total){const body=F.total-F.introLen;loop=1+Math.floor((bar-F.total)/body);b=F.introLen+((bar-F.total)%body)}
 for(const s of F.secs)if(b<s.start+s.len)return [s,b-s.start,loop];const s=F.secs[F.secs.length-1];return [s,s.len-1,loop]}
function clChorusBar(C,ms){try{return cl3Form(C,ms).chorus1}catch(e){return 32}}
function clSongLen(C,ms){try{return cl3Form(C,ms).total*4*ms/1000}catch(e){return 0}}
/* 필인: 4마디 끝마다 모양이 바뀜 */
function cl3Fill(kind,i,at,s16,K,deg,strong){const from=strong?8:12;if(i<from)return false;
 if(kind===0){perc('snare',at,.18+(i-from)*.03);return i%2===0}
 if(kind===1){if(i%2===0)perc('tom',at,.55,mtof(K(deg)-12+[12,9,7,5,3,0,-2,-5][(i-from)/2|0]||0));return true}
 if(kind===2){if(i===12||i===14||i===15)perc('kick',at,.8);if(i===13)perc('clap',at,.5);return true}
 if(kind===3){if(i===12)perc('ohat',at,.3);if(i===14||i===15)perc('clap',at,.35);return false}
 if(kind===4){if(i%2===1)perc('roll',at,.35,s16/4);return false}
 return false}
clSlot2=function(n,delay,S){const C=S.club,F=C.F,s16=S.ms/1000/4,at0=audio.currentTime+delay;try{musVol(S.vol||.5)}catch(e){}
 if(n<0){if(n%2===0)perc('tick',at0,.5);return}
 const fm=cl3Form(C,S.ms),bar=Math.floor(n/8),[sec,sb,loop]=cl3At(C,bar),T=sec.type,lv=Math.min(2,(typeof G!=='undefined'&&G&&G.phase)||0);
 const tr=sec.tr+[0,-2,1,3][loop%4],K=d=>clNote(C,d)+tr,deg=sec.prog[sb%sec.prog.length],lastBar=sb===sec.len-1,q=sb/sec.len;
 const isCh=T==='chorus'||T==='final',isPre=T==='pre'||T==='build',isBr=T==='break',isBridge=T==='bridge',isIntro=T==='intro',isOut=T==='outro',isVerse=T==='verse';
 const full=isCh||(lv>=2&&!isOut&&!isBridge),fillK=hash('f|'+C.id+'|'+bar)%6,strong=sb%8===7,fillBar=!isPre&&!isIntro&&(sb%4===3)&&!(isOut&&lastBar);
 for(let hh=0;hh<2;hh++){const i=(n%8)*2+hh,at=at0+hh*s16+((i%2===1&&F.sw)?F.sw*s16:0),gap=isPre&&lastBar&&i>=12;
  let filled=false;if(fillBar&&(!isCh||sb<sec.len-1||true))filled=cl3Fill(fillK,i,at,s16,K,deg,strong);
  /* 킥 */{let kp=F.kick;if(isBridge)kp='x.........x.....';if(isIntro&&sb<sec.len/2)kp='x.......x.......';if(isOut&&sb>=sec.len-2)kp=sb===sec.len-1?'x...............':'x.......x.......';if(isBr&&sb<sec.len/2)kp='................';
   if(kp[i]==='x'&&!gap&&!filled){perc(F.bass==='hardkick'?'kick909':'kick',at,full?1:.8);if(F.bass==='hardkick'&&full)voice('dist',C.key-24+tr,.1,.025,at)}}
  /* 빌드 · 프리코러스 */if(isPre){const dens=q<.5?4:q<.75?2:1;if(i%dens===0&&!gap)perc('snare',at,.1+q*.34);if(lastBar&&i===12)perc('crash',at,.3);if(sb===0&&i===0)voice('glide',K(C.sc.length*2),S.ms/1000*4*sec.len,.01,at)}
  /* 박수 · 하이햇 */if(!filled&&!gap){const clapOn=F.clap[i]==='x'&&!(isIntro&&sb<sec.len-2)&&!(isBr&&sb<sec.len/2)&&!(isOut&&sb>=sec.len-2);if(clapOn)perc('clap',at,full?.55:isVerse?.4:.35);
   if(isBridge&&i===8)perc('snare',at,.45);
   const hp=isVerse&&sec.idx===1?'..x...x...x...x.':F.hat;if(hp[i]==='x'&&!(isOut&&sb===sec.len-1))perc('hat',at,isBr||isIntro||isBridge?.1:.2);
   if(F.ohat&&F.ohat[i]==='x'&&(isCh||(isVerse&&sec.idx>1)))perc('ohat',at,.25);
   if(!isIntro&&!isBridge&&!isOut)for(const [k,p] of Object.entries(F.extra||{}))if(p[i]==='x'&&(k!=='crash'||(isCh&&sb===0)))clPerc(k,at,k==='crash'?.7:k==='hat'?.11:(isCh?.4:isVerse&&sec.idx>1?.32:.24));
   if(isCh&&sec.idx>=2&&i%4===3)perc('shaker',at,.18);if(T==='final'&&i%2===1)perc('hat',at,.09);if(isVerse&&sec.idx>1&&i%8===6)perc('wood',at,.25,700)}
  if(sb===0&&i===0&&(isCh||isBr||isBridge||isOut)){perc('crash',at,isCh?.85:.5);if(T==='final')perc('taiko',at,.6)}
  if(isCh&&sb===8*(F.half?2:1)&&i===0)perc('crash',at,.6);
  /* 베이스 */if(!gap&&!(isIntro&&sb<2)&&!(isBr&&sb<2)){const r=K(deg)-24,gm=isBr?.7:isOut?Math.max(.3,1-q):1;let B=F.bass;if(isBridge)B='808';else if(isVerse&&sec.idx===1&&!full)B=F.half?'808':'deep';else if(isIntro||isOut)B=F.half?'808':'deep';
   if(B==='offroll'){if(i%4===2)voice('pluck',r,s16*1.6,.08*gm,at)}else if(B==='octave'){if(i%2===0)voice('pluck',r+(i%4===2?12:0),s16*1.7,.075*gm,at)}
   else if(B==='rumble'){if(i%4===2||i%4===3)voice('pluck',r,s16*.7,.07*gm,at)}else if(B==='reese'){if(i%8===0)voice('reese',r,s16*7,.08*gm,at)}
   else if(B==='trance'){if(i%4!==0)voice('pluck',r+(i%4===3?12:0),s16*.9,.07*gm,at)}else if(B==='bassy'){if(i%4===2||i%8===7)voice('reese',r+12,s16*1.4,.07*gm,at)}
   else if(B==='wobble'){const rate=full?1:2;if(i%rate===0)voice('reese',r,s16*rate*.9,.06*gm,at)}else if(B==='bouncy'){if(i%4===2){voice('chip',r+12,s16*1.2,.06*gm,at);voice('sub',r,s16*1.2,.06*gm,at)}}
   else if(B==='afro'){if('x..x..x.....x...'[i]==='x')voice('sub',r,s16*2.5,.09*gm,at)}else if(B==='deep'){if(i===0||i===6||i===10)voice('sub',r+(i===10?7:0),s16*3,.09*gm,at)}
   else if(B==='dembow'){if('x..x..x.x..x..x.'[i]==='x')voice('sub',r,s16*2,.09*gm,at)}else if(B==='808'){if(i===0||i===10)voice('sub',r,s16*5,.11*gm,at)}
   else if(B==='psy'){if(i%4!==0)voice('buzz',r+12,s16*.8,.05*gm,at)}else if(B==='garage'){if('x......x..x.....'[i]==='x')voice('reese',r+12,s16*2.5,.07*gm,at)}
   else if(B==='disco'){if(i%2===0)voice('pizz',r+(i%8===4?12:i%8===6?7:0),s16*1.5,.08*gm,at)}else if(B==='hardkick'){if(i%4===2)voice('pluck',r+12,s16*1.5,.07*gm,at)}}
  /* 패드 */const pad=F.pad||'strings';if((isBr||isIntro||isBridge||isOut||isCh||isPre||lv>=1||(isVerse&&sec.idx>1))&&i%(isBridge||isOut||isIntro?16:4)===(isBridge||isOut||isIntro?0:1))for(const k of [0,2,4])voice(pad,K(deg+k),s16*(isBridge||isOut||isIntro?15:3),isBr||isIntro||isOut?.018:isBridge?.02:.012,at);
  /* 인트로 아르페지오 */if(isIntro&&i%2===0&&sb>=2){const up=[0,2,4,2,0,4,2,7];voice('pluck',K(deg+up[(i/2)%8])+12,s16*1.2,.016+q*.012,at)}
  /* 벌스 리듬 기타(플럭 스탭) */if(isVerse&&sec.idx>1&&(i===3||i===11))for(const k of [0,2,4])voice('pluck',K(deg+k)+12,s16*.8,.011,at);
  /* 선율 */if(sec.m&&!gap){const idx=(sb*16+i)%sec.m.length,nt=sec.m[idx];if(typeof nt==='number'){let hold=1;for(let k=idx+1;k<sec.m.length&&sec.m[k]==='-';k++)hold++;const nn=K(nt),HK=F.hook,lead=T==='final'||sec.idx>=2&&isCh?C.leadB||F.lead:F.lead;
   if(isCh){if(HK==='supersaw'||HK==='bigroom'){for(const o of [0,HK==='bigroom'?12:7,12])voice(lead,nn+o,s16*1.8*hold,.021,at)}else if(HK==='stab'){for(const k of [0,2,4])voice(lead,K(nt+k),s16*1.2,.022,at)}else if(HK==='acid')voice('buzz',nn,s16*1.1*hold,.04,at);else if(HK==='swell'){for(const k of [0,2,4,6])voice('lead',K(nt+k),s16*2.5,.014,at)}else if(HK==='echochord'){for(const k of [0,2,4]){voice(lead,K(nt+k),s16*1.5,.022,at);voice(lead,K(nt+k),s16*1.2,.01,at+s16*3)}}else if(HK==='chords'){for(const k of [0,2,4,6])voice(lead,K(nt+k),s16*1.6,.016,at)}else voice(lead,nn,s16*1.6*hold,.045,at);
    voice('chip',nn+12,s16,.012,at);if(T==='final')voice(F.lead,K(nt+2),s16*1.4*Math.min(hold,3),.016,at)}
   else if(isPre)voice(q>=.5?'lead':'pluck',nn+(q>=.5?12:0),s16*1.3*Math.min(hold,2),.024+q*.01,at);
   else if(isBridge)voice(pad==='organ'?'strings':pad,nn,s16*hold*.95,.03,at);
   else if(isIntro||isOut)voice('bell',nn+12,s16*2,.02,at);
   else voice(sec.inst||'pluck',nn,s16*1.4*Math.min(hold,3),isBr?.034:.03,at)}}
  /* 카운터 멜로디 (코러스2 · 파이널 · 브리지 후반) */if((isCh&&sec.idx>=2)||T==='final'||(isBridge&&q>=.5)){const cm=fm.sec.counter,ci=(sb*16+i)%cm.length,cn=cm[ci];if(typeof cn==='number'){let hold=1;for(let k=ci+1;k<cm.length&&cm[k]==='-';k++)hold++;voice(isBridge?'flute':(C.leadB==='strings'?'flute':'strings'),K(cn)+(isBridge?0:12),s16*hold*.95,.014,at)}}
  /* 코러스 아르페지오 */if(isCh&&(lv>=1||sec.idx>=2||T==='final')&&hh===1){const up=sec.idx>=2?[0,4,2,7]:[0,2,4,7];voice('chip',K(deg+up[i%4])+24,s16*.7,.011,at)}
  /* 아웃트로 마지막 음 */if(isOut&&lastBar&&i===0){voice(pad,K(0),s16*16,.03,at);voice('sub',K(0)-24,s16*12,.1,at);voice('bell',K(C.sc.length)+12,s16*8,.03,at)}}};

/* ================= v85: 정적(챕터 3 마지막) 원곡도 3분 구성으로 ================= */
/* 같은 악기·분위기 그대로, 구간마다 조/화성/선율을 바꿔 반복감 없이: 인트로-A-B-정적-A2-B2-브리지-파이널(+2)-아웃트로 */
function st3Form(S){if(S.st3&&S.st3.ms===S.ms)return S.st3;const L=[['intro',8],['A',16],['B',16],['calm',8],['A2',16],['B2',16],['bridge',8],['fin',16],['out',8]];const secs=[];let st=0;for(const [nm,len] of L){secs.push({nm,len,start:st});st+=len}
 const p=S.prog.slice(),pB=[p[1],p[3],p[0],p[2]].map((v,i)=>i===3?4:v),pBr=[5,3,6,4];return S.st3={ms:S.ms,secs,total:st,intro:8,p,pB,pBr,hA:S.hA,hB:S.hB,hC:S.hC,root:S.root}}
function st3At(F,bar){let loop=0,b=bar;if(bar>=F.total){const body=F.total-F.intro;loop=1+Math.floor((bar-F.total)/body);b=F.intro+((bar-F.total)%body)}for(const s of F.secs)if(b<s.start+s.len)return [s,b-s.start,loop];const s=F.secs[F.secs.length-1];return [s,s.len-1,loop]}
function st3Custom(sec,sb,n,delay,S,F){const q=S.ms/1000/4,t0=audio.currentTime+delay,bar8=((n%8)+8)%8,prog=sec.nm==='bridge'?F.pBr:F.p,deg=prog[Math.floor(sb/2)%4],root=noteOf(S,deg),len=sec.len,last=sb===len-1;try{musVol(S.vol)}catch(e){}
 for(let k=0;k<2;k++){const s16=bar8*2+k,at=t0+k*q;
  /* 시계 소리: 정적의 테마 */if(s16%4===0&&!(sec.nm==='out'&&sb>=len-2))perc(s16%8===0?'tick':'tock',at,.35);
  if(sec.nm==='intro'){if(s16===0&&sb%2===0)for(const d of [0,2,4])voice('strings',noteOf(S,deg+d)+12,S.ms*8/1000*.95,.012+sb*.002,at);
   if(sb>=4&&s16%8===0)perc('taiko',at,.4+sb*.05);if(sb>=2){const h=F.hA[(sb%2)*16+s16];if(typeof h==='number'&&s16%2===0)voice('bell',noteOf(S,h)+12,q*3,.02,at)}
   if(last&&s16>=8)perc('snare',at,.15+(s16-8)*.05);if(last&&s16===15)perc('crash',at+q,.6)}
  else if(sec.nm==='calm'){if(s16===0&&sb%2===0){for(const d of [0,2,4])voice('strings',noteOf(S,deg+d)+12,S.ms*8/1000*.95,.018,at);voice('choir',root+12,S.ms*8/1000,.02,at)}
   if(s16===0)voice('sub',root-24,S.ms*4/1000,.07,at);const h=F.hC[(sb%2)*16+s16];if(typeof h==='number')voice('flute',noteOf(S,h)+12,q*2.2,.03,at);
   if(sb>=len-2&&s16%2===0)perc('snare',at,.1+(sb-len+2)*.12+s16*.01);if(last&&s16===15)perc('crash',at+q,.7)}
  else if(sec.nm==='bridge'){if(s16===0||s16===10)perc('timp',at,.8,mtof(root-24));if(s16===8)perc('taiko',at,.6);if(s16===0&&sb%2===0)for(const d of [0,2,4])voice('brass',noteOf(S,deg+d),S.ms*8/1000*.9,.016,at);
   const h=F.hB[(sb%2)*16+s16];if(typeof h==='number'){let l=1;const i=(sb%2)*16+s16;for(let j=i+1;j<32&&F.hB[j]==='-';j++)l++;voice('strings',noteOf(S,h)+12,q*l*.95,.03,at)}
   if(bar8%2===0&&k===0)voice('sub',root-24,q*3.6,.09,at);if(sb>=len-2)perc('snare',at,.14+(s16/16)*.3);if(last&&s16===15)perc('crash',at+q,.9)}
  else if(sec.nm==='out'){const f=Math.max(0,1-sb/len);if(s16===0&&sb%2===0)for(const d of [0,2,4])voice('strings',noteOf(S,deg+d)+12,S.ms*8/1000*.95,.016*f+.004,at);
   if(s16%8===0&&sb<len-2)perc('taiko',at,.5*f+.1);const h=F.hA[(sb%2)*16+s16];if(typeof h==='number'&&sb<len-2&&s16%2===0)voice('bell',noteOf(S,h)+12,q*3,.02*f+.004,at);
   if(last&&s16===0){perc('crash',at,.9);perc('taiko',at,1);voice('choir',noteOf(S,0)+12,S.ms*4/1000,.03,at);voice('sub',noteOf(S,0)-24,S.ms*4/1000,.1,at);voice('brass',noteOf(S,0),S.ms*4/1000,.03,at)}}}}
{const _pst=playSlot;playSlot=function(n,delay,S){if(!(S&&S.c3==='stillness'&&S.chip&&!S.cave&&audio&&n>=0&&Number.isFinite(delay)))return _pst.apply(this,arguments);
 const F=st3Form(S),bar=Math.floor(n/8),[sec,sb,loop]=st3At(F,bar),b8=n%8;
 if(sec.nm==='intro'||sec.nm==='calm'||sec.nm==='bridge'||sec.nm==='out'){try{st3Custom(sec,sb,n,delay,S,F)}catch(e){}return}
 /* 엔진 구간: 가상 마디 번호로 원곡 16마디 흐름(sec 0~3)을 골라 쓰고, 화성·조·선율을 바꿔 끼움 */
 const sv={prog:S.prog,root:S.root,hB:S.hB,hC:S.hC},lt=[0,-3,2][loop%3];let vm=sb;
 if(sec.nm==='B'||sec.nm==='B2'){S.prog=F.pB;S.root=F.root+5+lt;vm=sec.nm==='B'?sb:4+(sb%12)}
 else if(sec.nm==='A2'){S.hB=F.hC;S.hC=F.hB;S.root=F.root+lt;vm=sb}
 else if(sec.nm==='fin'){S.root=F.root+2+lt;vm=8+(sb%8)}
 else S.root=F.root+lt;
 try{return _pst.call(this,vm*8+b8,delay,S)}finally{S.prog=sv.prog;S.root=sv.root;S.hB=sv.hB;S.hC=sv.hC}}}

