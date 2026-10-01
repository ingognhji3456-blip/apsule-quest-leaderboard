/* ================= 보스 음악 v77: 보스마다 장르 · 조성 · 박자 · 악기 · 선율이 전부 다름 ================= */
const NM_SC={maj:[0,2,4,5,7,9,11],min:[0,2,3,5,7,8,10],dor:[0,2,3,5,7,9,10],phr:[0,1,3,5,7,8,10],lyd:[0,2,4,6,7,9,11],mix:[0,2,4,5,7,9,10],hmin:[0,2,3,5,7,8,11],pdom:[0,1,4,5,7,8,10],loc:[0,1,3,5,6,8,10],blues:[0,3,5,6,7,10],pmin:[0,3,5,7,10],pmaj:[0,2,4,7,9],wt:[0,2,4,6,8,10],dim:[0,2,3,5,6,8,9,11]};
/* 장르 틀: len=한 마디 8분음표 수, d=드럼(x 강 o 약), b=베이스(0 근음 2 5도 7 옥타브 1 3도 - 쉼), mel=2마디 리듬(x 새 음, - 끌기, . 쉼) */
const NM_FEEL={
 march:{len:8,d:{kick:'x...x...',snare:'..x...xo',hat:'x.x.x.x.'},b:'0.2.0.2.',mel:'x.x.xx..x.x.x---',lead:'brass',bass:'pizz',pad:'strings',arp:null,sw:0},
 electro:{len:8,d:{kick:'x..x..x.',clap:'..x...x.',hat:'x.x.x.x.',zap:'.......x'},b:'0.70.70.',arp:'0124',mel:'x.x.x-x.x.x.x---',lead:'chip',bass:'pluck',pad:'strings',arpI:'pluck',sw:0},
 synth:{len:8,d:{kick:'x...x...',clap:'..x...x.',ohat:'.x.x.x.x'},b:'07070707',arp:'0121',mel:'x--.x.x.x---x.x.',lead:'lead',bass:'reese',pad:'strings',arpI:'chip',sw:0},
 industrial:{len:8,d:{kick:'x..x..x.',anvil:'....x...',clank:'..x....x',chug:'x.x.x.x.'},b:'0...0.0.',mel:'x---..x.x---....',lead:'dist',bass:'reese',pad:null,arp:null,sw:0},
 boogie:{len:8,d:{kick:'x...x...',snare:'..x...x.',chug:'xxxxxxxx'},b:'walk',mel:'x.xx.x..x.x.xx..',lead:'harpsi',bass:'pizz',pad:'organ',arp:null,sw:.28},
 ambient:{len:8,d:{chime:'x.......'},b:'0-------',arp:'0.1.2.1.',mel:'x---x---x-------',lead:'bell',bass:'sub',pad:'strings',arpI:'harp',sw:0},
 drill:{len:8,d:{kick:'x.x.x.x.',hat:'xxxxxxxx',buzz:'...x...x'},b:'0.0.0.0.',mel:'xxxxxxxxxxxx.x.x',lead:'chip',bass:'dist',pad:null,arp:null,sw:0},
 dub:{len:8,d:{kick:'x.......',snare:'....x...',ohat:'..x...x.'},b:'0---2---',mel:'x.....x.x-------',lead:'flute',bass:'sub',pad:'organ',arp:null,sw:.15,wob:1},
 waltz:{len:6,d:{kick:'x.....',tick:'..x.x.'},b:'0.2.2.',arp:'012',mel:'x-x.x.x-----',lead:'bell',bass:'pizz',pad:'strings',arpI:'harp',sw:0},
 techno:{len:8,d:{kick909:'x.x.x.x.',ohat:'.x.x.x.x',clap:'..x...x.'},b:'.0.0.0.0',arp:'0212',mel:'x.x.x..x.x.x..x.',lead:'lead',bass:'reese',pad:null,arpI:'chip',sw:0},
 epic:{len:8,d:{taiko:'x...x.x.',timp:'x.......',crash:'x.......'},b:'0.0.7.0.',mel:'x---x.x.x---x---',lead:'brass',bass:'strings',pad:'choir',arp:'0120',arpI:'harpsi',sw:0},
 tribal:{len:8,d:{tom:'x.x..x.x',taiko:'x......x',shaker:'xxxxxxxx'},b:'0..0.2..',mel:'x.x.x-..x.xx.---',lead:'flute',bass:'pluck',pad:null,arp:null,sw:.1},
 lullaby:{len:6,d:{tick:'x..x..'},b:'0.....',arp:'012102',mel:'x--x-.x--x-.',lead:'flute',bass:'sub',pad:'strings',arpI:'harp',sw:0},
 funk:{len:8,d:{kick:'x..x..x.',snare:'..x...x.',hat:'xxxxxxxx',croak:'.......x'},b:'0.0.20.7',mel:'x.x..x.xx..x.x..',lead:'pluck',bass:'pizz',pad:'organ',arp:null,sw:.2},
 spooky:{len:8,d:{wood:'x..x..x.',tock:'....x...',rattle:'.......x'},b:'0.2.1.2.',mel:'x.x.x.x.x.x.x---',lead:'harpsi',bass:'pizz',pad:'organ',arp:null,sw:.15},
 tango:{len:8,d:{kick:'x..x.x..',snare:'......x.',wood:'x..x.x..'},b:'0..2.0..',mel:'x---.xx.x-x-x---',lead:'strings',bass:'pizz',pad:null,arp:null,sw:0},
 flight:{len:8,d:{kick:'x...x...',hat:'xxxxxxxx',buzz:'x.......'},b:'00000000',mel:'xxxxxxxxxxxxxxxx',lead:'buzz',bass:'reese',pad:null,arp:null,sw:0,chrom:1},
 glass:{len:7,d:{kick:'x..x...',hat:'x.x.x.x',chime:'......x'},b:'0..2...',arp:'0121012',mel:'x.x.x.-x--x.x.',lead:'flute',bass:'sub',pad:null,arpI:'bell',sw:0},
 deep:{len:8,d:{kick:'x.......',bubble:'...x..x.',hum:'x.......'},b:'0-------',mel:'x-------..x.x---',lead:'flute',bass:'sub',pad:'choir',arp:null,sw:0,ping:1},
 organ:{len:6,d:{kick:'x.....',tock:'...x..'},b:'0.....',arp:'024',mel:'x-x-x-x-----',lead:'organ',bass:'sub',pad:'choir',arpI:'organ',sw:0},
 war:{len:8,d:{taiko:'x.x.x..x',timp:'x...x...',tom:'......xx'},b:'0.0.0.00',mel:'x.x.x---x.x.x---',lead:'brass',bass:'dist',pad:'choir',arp:null,sw:0},
 musicbox:{len:6,d:{tick:'x.x.x.',tock:'.x.x.x'},b:'0.....',arp:'012',mel:'x.x.x.x-x-x-',lead:'bell',bass:'pizz',pad:null,arpI:'bell',sw:0},
 surveil:{len:8,d:{kick:'x...x...',laser:'..x...x.',hat:'.x.x.x.x'},b:'0.0.0.0.',mel:'x---....x---....',lead:'lead',bass:'reese',pad:null,arp:'0101',arpI:'chip',sw:0,siren:1},
 dream:{len:6,d:{chime:'x.....'},b:'0.....',arp:'012102',mel:'x-----x-x---',lead:'flute',bass:'sub',pad:'strings',arpI:'harp',sw:0},
 steampunk:{len:8,d:{kick:'x...x...',chug:'x.x.x.x.',clank:'..x...x.',whistle:'x.......'},b:'0.2.0.2.',mel:'x.xx.x..x.xx.x..',lead:'brass',bass:'pizz',pad:'organ',arp:null,sw:.12},
 conductor:{len:8,d:{timp:'x...x...',snare:'......xo',crash:'x.......'},b:'0.2.1.2.',arp:'01201201',mel:'x-x-x.x.x---x.x.',lead:'strings',bass:'pizz',pad:'brass',arpI:'pizz',sw:0},
 office:{len:8,d:{tick:'xxxxxxxx',kick:'x...x...',wood:'..x...x.'},b:'0.0.2.0.',mel:'x.x.x.x..x.x.x..',lead:'pluck',bass:'pizz',pad:null,arp:null,sw:0},
 dusty:{len:8,d:{shaker:'x.x.x.x.',crackle:'x.......',kick:'x...x...'},b:'0..0..2.',mel:'x--.x.x.x--.....',lead:'pluck',bass:'sub',pad:'organ',arp:null,sw:.22},
 court:{len:8,d:{timp:'x.......',tom:'....x...'},b:'0---2---',mel:'x---x-x-x-------',lead:'organ',bass:'sub',pad:'choir',arp:'0120',arpI:'harpsi',sw:0},
 cave:{len:8,d:{chime:'x.......',bubble:'..x...x.',kick:'x.......'},b:'0---....',mel:'x.....x.x.x.....',lead:'bell',bass:'sub',pad:'strings',arp:null,sw:0,echo:1},
 silence:{len:8,d:{heart:'x..x....',hum:'x.......'},b:'0-------',mel:'x-------x---....',lead:'choir',bass:'sub',pad:'strings',arp:null,sw:0}};
/* 보스별 지정: [장르, 근음(MIDI), 음계, 진행] — 조와 음계가 모두 다르게 */
const NM_BOSS={0:['march',48,'maj',[0,3,4,0]],1:['electro',50,'dor',[0,5,3,4]],2:['industrial',40,'phr',[0,1,0,6]],3:['boogie',45,'blues',[0,3,0,4]],4:['ambient',53,'lyd',[0,1,4,3]],
 5:['drill',47,'wt',[0,1,2,1]],6:['dub',43,'min',[0,3,0,5]],7:['waltz',49,'hmin',[0,3,4,0]],8:['techno',51,'dor',[0,6,3,4]],9:['epic',46,'pdom',[0,1,6,4]],
 10:['tribal',52,'pmin',[0,2,3,0]],11:['lullaby',56,'maj',[0,5,3,4]],12:['funk',41,'dor',[0,3,0,4]],13:['spooky',48,'dim',[0,2,4,6]],14:['tango',50,'hmin',[0,3,4,4]],
 15:['flight',45,'min',[0,5,6,4]],16:['glass',55,'lyd',[0,4,1,5]],17:['deep',37,'min',[0,5,0,6]],18:['organ',47,'min',[0,3,5,4]],19:['war',42,'phr',[0,1,6,0]],
 pendulum:['musicbox',52,'hmin',[0,5,3,4]],panopticon:['surveil',45,'loc',[0,1,0,4]],moth:['dream',49,'lyd',[0,4,5,3]],bellows:['steampunk',43,'mix',[0,6,3,0]],metronome:['conductor',48,'maj',[0,4,5,3]],
 calendar:['office',46,'maj',[0,3,4,0]],dust:['dusty',42,'dor',[0,3,6,4]],scales:['court',50,'min',[0,3,4,0]],echo:['cave',44,'pmin',[0,2,4,0]],stillness:['silence',39,'phr',[0,1,5,0]]};
function nmMelody(id,F,SCn,part){const r=rng(hash('nm|'+id+'|'+part)),L=SCn.length,rh=F.mel,out=[];let d=L+Math.floor(r()*3);
 for(let i=0;i<rh.length;i++){const c=rh[i];if(c!=='x'){out.push(c==='-'?'-':null);continue}const mv=r();if(F.chrom)d+=r()<.5?1:-1;else if(mv<.45)d+=r()<.5?1:-1;else if(mv<.75)d+=r()<.5?2:-2;else if(mv<.85)d+=r()<.5?3:-3;d=clamp(d,L-2,L*2+2);if(i>=rh.length-4&&part==='B')d=L;out.push(d)}return out}
function nmMake(id,S){const cfg=NM_BOSS[id]||NM_BOSS[0],F=NM_FEEL[cfg[0]],SCn=NM_SC[cfg[2]],root=cfg[1];return {id,F,SCn,root,prog:cfg[3],A:nmMelody(id,F,SCn,'A'),B:nmMelody(id,F,SCn,'B'),C:nmMelody(id,F,SCn,'C'),tag:cfg[0]}}
function nmNote(M,deg){const L=M.SCn.length;return M.root+M.SCn[((deg%L)+L)%L]+12*Math.floor(deg/L)}
const NM_PERC={kick:[.9],kick909:[.9],snare:[.45],clap:[.5],hat:[.35],ohat:[.35],shaker:[.3],crash:[.6],taiko:[.8],timp:[.7],tom:[.7],anvil:[.5],clank:[.45],chug:[.35],chime:[.4],buzz:[.35],croak:[.5],wood:[.45],tock:[.45],tick:[.4],rattle:[.45],bubble:[.4],hum:[.4],laser:[.35],heart:[.8],crackle:[.3],whistle:[.3],roll:[.4]};
function nmSlot(n,delay,S){const M=S.nm,F=M.F,q=S.ms/1000/2,at0=audio.currentTime+delay;try{musVol(S.vol||.5)}catch(e){}
 if(n<0){if(n%2===0)perc('tick',at0,.5);return}
 const len=F.len,step=n%len,bar=Math.floor(n/len),sec=Math.floor(bar/8)%2,lv=Math.min(2,G.phase||0),deg=M.prog[bar%M.prog.length],sw=(step%2===1)?F.sw*q:0,at=at0+sw;
 /* 드럼 */for(const [k,pat] of Object.entries(F.d)){const c=pat[step];if(c==='x'||c==='o'){const g=(NM_PERC[k]||[.4])[0]*(c==='o'?.5:1)*(lv>=1?1:.85);if(k==='timp'||k==='tom')perc(k,at,g,mtof(nmNote(M,deg)-24));else perc(k,at,g)}}
 if(lv>=2&&step===len-1&&bar%2===1)perc('roll',at,.4);
 /* 베이스 */{const b=F.b;if(b==='walk'){if(step%2===0){const w=[0,2,4,5,4,2,1,0][(step/2+bar*2)%8];voice(F.bass,nmNote(M,deg+w)-24,q*1.6,.07,at)}}else{const c=b[step];if(c&&c!=='.'&&c!=='-'){const off=c==='7'?M.SCn.length:c==='2'?2:c==='1'?1:0;let hold=1;for(let i=step+1;i<len&&b[i]==='-';i++)hold++;voice(F.bass,nmNote(M,deg+off)-24,q*hold*.95,F.bass==='sub'?.09:.07,at);if(F.wob)for(let w=0;w<hold*2;w++)voice('sub',nmNote(M,deg)-24,q*.4,.03,at+w*q/2)}}}
 /* 화음 패드 (마디 시작) */if(F.pad&&step===0&&(lv>=1||sec===1||F.pad==='glide'||F.pad==='choir'))for(const k of [0,2,4])voice(F.pad,nmNote(M,deg+k),S.ms/1000*len/2*.95,F.pad==='brass'?.02:.018,at);
 /* 아르페지오 */if(F.arp&&(lv>=1||F.pad===null||M.tag==='ambient'||M.tag==='lullaby'||M.tag==='dream'||M.tag==='electro')){const c=F.arp[step%F.arp.length];if(c&&c!=='.'){voice(F.arpI||'chip',nmNote(M,deg+(+c)*2)+12,q*.8,.03,at);if(lv>=2)voice(F.arpI||'chip',nmNote(M,deg+(+c)*2)+24,q*.5,.018,at+q/2)}}
 /* 선율 (A A B C 순환) */{const two=len*2,ph=Math.floor(bar/2)%4,mel=[M.A,M.A,M.B,sec?M.C:M.A][ph],i=(bar%2)*len+step,d=mel[i%mel.length];if(typeof d==='number'){let hold=1;for(let k=i+1;k<mel.length&&mel[k]==='-';k++)hold++;const nn=nmNote(M,d+(ph===3&&sec?1:0));voice(F.lead,nn,q*hold*.92,F.lead==='bell'||F.lead==='chip'?.05:.048,at);voice('chip',nn+12,q*Math.min(hold,2)*.5,.012,at);if(hold>=3)voice(F.lead,nn+(M.SCn.length>5?7:5),q*.5,.02,at+q*(hold-1));if(lv>=2)voice(F.lead==='brass'?'strings':F.lead,nn+12,q*hold*.8,.02,at);if(F.echo){voice(F.lead,nn,q*hold*.7,.018,at+q);voice(F.lead,nn,q*hold*.6,.009,at+q*2)}}}
 /* 특수 효과 */if(F.ping&&step===0&&bar%2===0)voice('bell',nmNote(M,M.SCn.length*3),.6,.03,at);if(F.siren&&step===0&&bar%4===0)voice('glide',nmNote(M,M.SCn.length*2+4),S.ms/1000*4,.02,at);if(M.id===9&&step===0&&bar%8===7)perc('crash',at,.7)}
{const _ms2=makeSong;makeSong=function(bi){const S=_ms2.apply(this,arguments);try{if(S&&!S.cave){const id=(typeof _c3Swap!=='undefined'&&_c3Swap&&_c3Swap.art&&_c3Swap.bi===bi)?_c3Swap.art:bi;if(NM_BOSS[id]&&!NM_KEEP_OLD[id]){S.nm=nmMake(id,S);S.vol=({lullaby:.65,spooky:.6,musicbox:.75,dream:.65,waltz:.65,war:.26,industrial:.3,flight:.33,epic:.45,drill:.45,court:.45,techno:.48,synth:.48}[S.nm.tag])||.55;S.title=(S.title||'').split(' · ')[0]+' · '+NM_TAG[S.nm.tag]}}}catch(e){}return S}}
{const _ps2=playSlot;playSlot=function(n,delay,S){if(S&&S.nm&&audio&&Number.isFinite(delay)){try{nmSlot(n,delay,S)}catch(e){}return}return _ps2.apply(this,arguments)}}
const NM_TAG={electro:'일렉트로',march:'행진곡',synth:'신스웨이브',industrial:'인더스트리얼',boogie:'부기우기',ambient:'앰비언트',drill:'드릴',dub:'덥',waltz:'왈츠',techno:'테크노',epic:'에픽',tribal:'트라이벌',lullaby:'자장가',funk:'펑크',spooky:'유령 춤곡',tango:'탱고',flight:'비행',glass:'유리 7박',deep:'심해',organ:'오르간 왈츠',war:'전쟁 북',musicbox:'오르골',surveil:'감시 사이렌',dream:'꿈결',steampunk:'스팀펑크',conductor:'관현악',office:'타자기',dusty:'먼지 블루스',court:'법정',cave:'동굴 메아리',silence:'정적'};
/* ================= 신나고 간지나게: 공통 에너지 레이어 (백비트 · 16비트 하이햇 · 펌핑 베이스 · 스탭 코드 · 필인 · 빌드업 · 드롭) ================= */
const NM_HYPE={electro:{stab:'chip',pump:0},march:{stab:'brass',pump:0,soft:0},synth:{stab:'lead',pump:1},industrial:{stab:'dist',pump:1},boogie:{stab:'organ',pump:0},ambient:{stab:'bell',pump:0,soft:1},drill:{stab:'chip',pump:1},dub:{stab:'organ',pump:0},waltz:{stab:'strings',pump:0,soft:1},techno:{stab:'lead',pump:1},epic:{stab:'brass',pump:1},
 tribal:{stab:'pluck',pump:0},lullaby:{stab:'harp',pump:0,soft:1},funk:{stab:'organ',pump:0},spooky:{stab:'harpsi',pump:0},tango:{stab:'strings',pump:0},flight:{stab:'dist',pump:1},glass:{stab:'bell',pump:0,soft:1},deep:{stab:'bell',pump:0,soft:1},organ:{stab:'organ',pump:0,soft:1},war:{stab:'dist',pump:1},
 musicbox:{stab:'bell',pump:0,soft:1},surveil:{stab:'lead',pump:1},dream:{stab:'harp',pump:0,soft:1},steampunk:{stab:'brass',pump:1},conductor:{stab:'brass',pump:0},office:{stab:'pluck',pump:0},dusty:{stab:'organ',pump:0},court:{stab:'organ',pump:0,soft:1},cave:{stab:'bell',pump:0,soft:1},silence:{stab:'choir',pump:0,soft:1}};
const NM_STAB={8:'..x..x.x',6:'..x..x',7:'..x..x.'};
function nmHype(n,delay,S){if(n<0)return;const M=S.nm,F=M.F,H=NM_HYPE[M.tag]||{},q=S.ms/1000/2,s16=q/2,len=F.len,step=n%len,bar=Math.floor(n/len),cyc=bar%16,lv=Math.min(2,G.phase||0),deg=M.prog[bar%M.prog.length],at=audio.currentTime+delay+((step%2===1)?F.sw*q:0),d=F.d,has=k=>!!d[k];
 const build=cyc>=12,drop=cyc===0&&bar>0,fill=bar%4===3&&step>=len-2;
 /* 킥 · 백비트 */const kick=has('kick909')?'kick909':'kick';if(!has('kick')&&!has('kick909')&&!has('taiko')){if(step===0||(!H.soft&&step===Math.floor(len/2)))perc(kick,at,H.soft?.6:.8)}
 const back=len===8?[2,6]:len===6?[3]:[2,5];if(!has('snare')&&!has('clap')&&back.includes(step)&&!(H.soft&&lv===0&&cyc<8))perc(H.soft?'clap':'snare',at,H.soft?.3:.42);
 if(!H.soft&&lv>=1&&step===len-1)perc(kick,at+s16,.45);
 /* 하이햇 16비트 */if(!has('hat')&&!has('shaker')){perc(H.soft?'shaker':'hat',at,.22);if(lv>=1||build)perc(H.soft?'shaker':'hat',at+s16,.12)}
 /* 크래시 · 드롭 */if(drop&&step===0){perc('crash',at,.8);perc(kick,at,1);if(!H.soft)perc('taiko',at,.6)}
 /* 필인 */if(fill&&!build){perc('snare',at,.35);perc('snare',at+s16,.28);if(step===len-1)perc('tom',at+s16,.6,mtof(nmNote(M,deg)-12))}
 /* 빌드업: 스네어가 점점 잘게 + 상승음 */if(build){const dens=cyc>=15?4:cyc>=14?2:1;for(let k=0;k<dens;k++)perc('snare',at+k*q/dens,.18+(cyc-12)*.06);if(step===0&&cyc===12)voice('glide',nmNote(M,M.SCn.length),S.ms/1000*len/2*4,.012,at);if(cyc===15&&step===len-1)perc('crash',at+s16,.3)}
 /* 펌핑 베이스 (16분 옥타브 튕김) */if(H.pump&&!(build&&cyc===15)){const r=nmNote(M,deg)-24;voice('sub',r,s16*.8,.05,at);voice('sub',r+12,s16*.7,.035,at+s16)}
 /* 스탭 코드 (엇박 찌르기) */{const sp=NM_STAB[len]||NM_STAB[8];if(sp[step]==='x'&&(lv>=1||!H.soft)&&!build){for(const k of [0,2,4])voice(H.stab||'pluck',nmNote(M,deg+k)+12,s16*1.5,H.stab==='dist'?.018:.022,at)}}
 /* 카운터 아르페지오 16분 */if(lv>=1||(!H.soft&&cyc>=4)){const up=[0,2,4,7,4,2,0,2];for(let k=0;k<2;k++){const i=(step*2+k)%8,nt=nmNote(M,deg+up[i])+24;voice(H.soft?'harp':'chip',nt,s16*.8,H.soft?.02:.014,at+k*s16)}}
 /* 3페이즈: 리드 옥타브 파워 */if(lv>=2&&step===0)voice('dist',nmNote(M,deg)-12,S.ms/1000*len/2*.9,.03,at)}
{const _ps3=playSlot;playSlot=function(n,delay,S){const r=_ps3.apply(this,arguments);if(S&&S.nm&&audio&&Number.isFinite(delay)){try{nmHype(n,delay,S)}catch(e){}}return r}}

const NM_KEEP_OLD={stillness:1}; /* 챕터 3 마지막 보스는 원래 곡 유지 */

/* ================= 공격별 효과음 v78: 예고음 · 발사음이 공격 종류마다 다름 ================= */
const SXA={s0:new WeakSet(),s1:new WeakSet(),last:{}};
function sxOk(k,gap){const now=performance.now();if(now-(SXA.last[k]||0)<(gap||60))return false;SXA.last[k]=now;return true}
function sxAt(){return audio?audio.currentTime:0}
function sxMusNote(o){try{const M=mus.song&&mus.song.nm;if(!M)return 880;return mtof(nmNote(M,M.SCn.length*2+Math.floor(RND()*5)))}catch(e){return 880}}
const SX={
 laserCharge(){const a=sxAt();sfx(260,.5,'sine',.022,1500);sfx(520,.5,'triangle',.008,3000)},
 laserFire(){const a=sxAt();sfx(210,.45,'sawtooth',.045,160);sfx(105,.45,'square',.03,90);nz(.25,.03,a,3500)},
 zap(){const a=sxAt();sfx(1900,.09,'square',.035,180);nz(.07,.04,a,4000);sfx(3200,.04,'sawtooth',.02,900)},
 pew(){sfx(950,.07,'square',.028,280)},
 spit(){const a=sxAt();sfx(420,.08,'sawtooth',.03,160);nz(.05,.025,a,1500)},
 fire(){const a=sxAt();nz(.22,.04,a,700);sfx(160,.2,'sawtooth',.03,70)},
 note(o){const f=sxMusNote(o);sfx(f,.12,'triangle',.03,f);sfx(f*2,.06,'sine',.01,f*2)},
 bubble(){sfx(280,.08,'sine',.04,950)},
 crystal(){sfx(2400,.18,'sine',.022,2300);sfx(3200,.12,'sine',.012,3100)},
 gear(){perc('clank',sxAt(),.5)},
 drone(){perc('buzz',sxAt(),.35)},
 bird(){sfx(1800,.05,'sine',.03,2500);setTimeout(()=>sfx(2100,.05,'sine',.025,2700),70)},
 bone(){const a=sxAt();perc('wood',a,.5);perc('rattle',a+.03,.3)},
 echo(){sfx(880,.25,'sine',.025,860);setTimeout(()=>sfx(880,.2,'sine',.012,860),160);setTimeout(()=>sfx(880,.15,'sine',.006,860),320)},
 page(){const a=sxAt();nz(.05,.03,a,2500);nz(.05,.02,a+.06,3000)},
 scrap(){perc('anvil',sxAt(),.3)},
 moth(){const a=sxAt();for(let i=0;i<3;i++)nz(.03,.02,a+i*.04,5000)},
 void(){sfx(90,.35,'sine',.06,38)},
 coal(){const a=sxAt();sfx(120,.12,'square',.03,60);nz(.1,.02,a,900)},
 steam(){nz(.35,.035,sxAt(),1600)},
 spore(){const a=sxAt();nz(.1,.03,a,700);sfx(420,.12,'sine',.02,200)},
 bee(){perc('buzz',sxAt(),.4)},
 light(){sfx(1200,.25,'sine',.022,1700);sfx(2400,.2,'sine',.01,3000)},
 thud(){sfx(80,.22,'sine',.08,34);sfx(160,.06,'square',.02,60)},
 sizzle(){nz(.45,.035,sxAt(),350);sfx(200,.3,'sawtooth',.015,90)},
 ice(){const a=sxAt();sfx(2200,.12,'triangle',.03,700);nz(.08,.03,a,5000)},
 slam(){const a=sxAt();nz(.18,.05,a,180);sfx(110,.2,'sawtooth',.04,45)},
 ring(){sfx(220,.25,'sine',.04,660)},
 whirr(){sfx(520,.06,'sawtooth',.012,480)},
 horn(){sfx(440,.5,'square',.03,430);sfx(349,.5,'square',.03,345)},
 rumble(){sfx(55,.4,'sawtooth',.03,50)},
 hum(){sfx(600,.45,'sine',.02,620);sfx(900,.45,'sine',.01,880)},
 launch(){const a=sxAt();nz(.3,.03,a,1200);sfx(300,.3,'sawtooth',.02,900)},
 boom(){const a=sxAt();sfx(60,.4,'sine',.1,28);nz(.3,.06,a,300)},
 warn(){sfx(1300,.05,'square',.012,1300)},
 chain(){const a=sxAt();perc('clank',a,.3);perc('clank',a+.08,.2)},
 swoosh(){nz(.18,.04,sxAt(),900)},
 bell(){sfx(1568,.4,'sine',.03,1560);sfx(2349,.3,'sine',.012,2340)}};
function sxPlay(k,o){if(!audio||!sound||!SX[k])return;if(!sxOk(k,k==='note'?45:70))return;try{SX[k](o)}catch(e){}}
const SX_ORB={fire:'fire',note:'note',bubble:'bubble',crystal:'crystal',gear:'gear',drone:'drone',bird:'bird',bone:'bone',echo:'echo',page:'page',scrap:'scrap',moth:'moth',void:'void',coal:'coal',steam:'steam',spore:'spore',bee:'bee',light:'light',spark:'zap',snow:'ice',icicle:'ice',dust:'spore',bob:'chain',weight:'slam',crate:'slam',egg:'spore',eye:'laserCharge',ghost:'void',default:'pew'};
function sxDetect(now,beat){if(G.state!=='play'||!audio)return;const S0=SXA.s0,S1=SXA.s1,org=G.bi>=10;
 for(const b of G.beams){if(!S0.has(b)&&beat>=b.t0){S0.add(b);sxPlay('laserCharge')}if(!S1.has(b)&&beat>=b.t1){S1.add(b);sxPlay('laserFire')}}
 for(const b of G.bullets){if(!S1.has(b)&&beat>=b.t0){S1.add(b);sxPlay(org?'spit':'pew')}}
 for(const z of G.zones){if(!S0.has(z)&&beat>=z.t0){S0.add(z);sxPlay('warn')}if(!S1.has(z)&&beat>=z.t1){S1.add(z);if(z.harm===false)continue;const k=z.kind||'plain';sxPlay(k==='pool'||k==='geyser'?'sizzle':k==='spike'?'ice':k==='bolt'?'zap':k==='bite'?'slam':'thud')}}
 for(const r of G.rings){if(!S1.has(r)&&beat>=r.t0){S1.add(r);sxPlay('ring')}}
 for(const r of G.rotors){if(!S1.has(r)&&beat>=r.t1){S1.add(r);sxPlay('chain')}if(beat>=r.t1&&beat<r.t2)sxPlay('whirr')}
 for(const s of G.saws){if(beat>=s.ts&&beat<=s.te)sxPlay('whirr')}
 for(const m of G.movers){if(!S0.has(m)&&beat>=m.tp){S0.add(m);sxPlay('warn')}if(!S1.has(m)&&beat>=m.t0){S1.add(m);sxPlay(m.kind==='train'?'horn':m.kind==='gear'?'rumble':m.kind==='drone'||m.kind==='hornet'?'drone':'scrap')}}
 for(const c of G.cones){if(!S1.has(c)&&beat>=c.t1){S1.add(c);sxPlay('hum')}}
 for(const r of G.rockets){if(!S0.has(r)&&beat>=r.t0){S0.add(r);sxPlay('launch')}if(!S1.has(r)&&beat>=r.t1){S1.add(r);sxPlay('boom')}}
 for(const a of G.arcs){if(!S0.has(a)&&beat>=a.t0){S0.add(a);sxPlay('swoosh')}}
 for(const o of (G.np||[])){if(o.harm===false&&o.k!=='orb')continue;if(!S0.has(o)&&beat>=o.t0&&o.t1-o.t0>.3){S0.add(o);if(o.k==='seg'&&(o.sty==='laser'||!o.sty))sxPlay('laserCharge');else sxPlay('warn')}
  if(!S1.has(o)&&beat>=o.t1){S1.add(o);if(o.harm===false)continue;let k;if(o.k==='orb')k=SX_ORB[o.sty]||'pew';else if(o.k==='seg')k=o.sty==='elec'?'zap':o.sty==='chain'?'chain':o.sty==='hand'?'swoosh':'laserFire';else if(o.k==='rect')k=o.sty==='lava'?'sizzle':o.sty==='ice'?'ice':o.sty==='elec'?'zap':o.sty==='light'?'bell':'slam';else k=(o.col==='#ff6a20'||o.col==='#ff8a3d')?'sizzle':'thud';sxPlay(k,o)}}
 if(G.boss&&G.boss.dash&&sxOk('dashloop',180))sfx(70,.2,'sawtooth',.03,90)}
{const _cd6=cfxDraw;cfxDraw=function(now,beat){const r=_cd6.apply(this,arguments);try{sxDetect(now,beat)}catch(e){}return r}}

/* ================= 보스 음악 v79: 전부 클럽 음악 (장르 · 조 · 드럼 · 베이스 · 리드가 곡마다 다름) ================= */
/* 드럼 패턴은 한 마디 16칸(16분음표). 구성: 0~7 그루브 · 8~15 브레이크 · 16~23 빌드업 · 24~31 드롭 */
const CL_SC={min:[0,2,3,5,7,8,10],maj:[0,2,4,5,7,9,11],dor:[0,2,3,5,7,9,10],phr:[0,1,3,5,7,8,10],mix:[0,2,4,5,7,9,10],hmin:[0,2,3,5,7,8,11],lyd:[0,2,4,6,7,9,11]};
const CL_G={
 techhouse:{kick:'x...x...x...x...',clap:'....x.......x...',hat:'..x...x...x...x.',ohat:'..x...x...x...x.',extra:{shaker:'x.x.x.x.x.x.x.x.'},bass:'offroll',lead:'pluck',hook:'stab',pad:'organ'},
 electro:{kick:'x...x...x...x...',clap:'....x.......x...',hat:'x.x.x.x.x.x.x.x.',ohat:'..x...x...x...x.',extra:{zap:'.......x.......x'},bass:'octave',lead:'chip',hook:'lead',pad:'strings'},
 hardtechno:{kick:'x...x...x...x...',clap:'....x.......x...',hat:'x.x.x.x.x.x.x.x.',extra:{anvil:'..x.......x.....',rattle:'......x.......x.'},bass:'rumble',lead:'lead',hook:'stab',pad:null},
 dnb:{kick:'x.........x.....',clap:'....x.......x...',hat:'x.x.x.x.x.x.x.x.',extra:{snare:'.......x.x......'},bass:'reese',lead:'lead',hook:'lead',pad:'strings',dbl:1},
 trance:{kick:'x...x...x...x...',clap:'....x.......x...',hat:'..x...x...x...x.',ohat:'..x...x...x...x.',extra:{hat:'xxxxxxxxxxxxxxxx'},bass:'trance',lead:'lead',hook:'supersaw',pad:'strings'},
 basshouse:{kick:'x...x...x...x...',clap:'....x.......x...',hat:'x.xxx.xxx.xxx.xx',extra:{},bass:'bassy',lead:'pluck',hook:'stab',pad:null},
 dubstep:{kick:'x.........x.....',clap:'........x.......',hat:'x.x.x.x.x.x.x.x.',extra:{},bass:'wobble',lead:'lead',hook:'lead',pad:'choir',half:1},
 proghouse:{kick:'x...x...x...x...',clap:'....x.......x...',hat:'..x...x...x...x.',extra:{shaker:'.x.x.x.x.x.x.x.x'},bass:'offroll',lead:'pluck',hook:'supersaw',pad:'strings'},
 futurehouse:{kick:'x...x...x...x...',clap:'....x.......x...',hat:'x.x.x.x.x.x.x.x.',ohat:'..x...x...x...x.',extra:{},bass:'bouncy',lead:'chip',hook:'pluck',pad:null},
 bigroom:{kick:'x...x...x...x...',clap:'....x.......x...',hat:'..x...x...x...x.',extra:{crash:'x...............'},bass:'offroll',lead:'lead',hook:'bigroom',pad:'brass'},
 afro:{kick:'x...x...x...x...',clap:'....x.......x...',hat:'..x..x..x.x..x..',extra:{tom:'x..x..x...x.x...',wood:'.x..x..x.x..x..x',shaker:'xxxxxxxxxxxxxxxx'},bass:'afro',lead:'flute',hook:'pluck',pad:'organ'},
 deephouse:{kick:'x...x...x...x...',clap:'....x.......x...',hat:'..x...x...x...x.',extra:{shaker:'x.x.x.x.x.x.x.x.'},bass:'deep',lead:'organ',hook:'chords',pad:'organ'},
 moombah:{kick:'x..x..x.x..x..x.',clap:'...x..x....x..x.',hat:'x.x.x.x.x.x.x.x.',extra:{},bass:'dembow',lead:'flute',hook:'stab',pad:null,half:1},
 phonk:{kick:'x.....x...x.....',clap:'....x.......x...',hat:'x.x.x.x.x.xxx.x.',extra:{chime:'x.x...x.x.x...x.'},bass:'808',lead:'harpsi',hook:'pluck',pad:null,half:1},
 darktechno:{kick:'x...x...x...x...',clap:'........x.......',hat:'..x...x...x...x.',extra:{rattle:'.......x......x.',hum:'x...............'},bass:'rumble',lead:'reese',hook:'stab',pad:'choir'},
 psy:{kick:'x...x...x...x...',clap:'....x.......x...',hat:'..x...x...x...x.',extra:{hat:'x.xxx.xxx.xxx.xx'},bass:'psy',lead:'buzz',hook:'acid',pad:null},
 futurebass:{kick:'x.......x.x.....',clap:'....x.......x...',hat:'x.x.x.x.x.x.x.x.',extra:{},bass:'808',lead:'chip',hook:'swell',pad:'strings',half:1},
 halftime:{kick:'x.........x.....',clap:'........x.......',hat:'x...x...x...x...',extra:{bubble:'..x.......x.....'},bass:'wobble',lead:'bell',hook:'lead',pad:'choir',half:1},
 garage:{kick:'x......x..x.....',clap:'....x.......x...',hat:'..x.x.x...x.x.xx',extra:{shaker:'x.x.x.x.x.x.x.x.'},bass:'garage',lead:'organ',hook:'chords',pad:null},
 hardstyle:{kick:'x...x...x...x...',clap:'....x.......x...',hat:'..x...x...x...x.',extra:{crash:'x...............'},bass:'hardkick',lead:'lead',hook:'supersaw',pad:'choir'},
 minimal:{kick:'x...x...x...x...',clap:'........x.......',hat:'..x...x...x...x.',extra:{tick:'x.x.x.x.x.x.x.x.',tock:'.x...x...x...x..'},bass:'offroll',lead:'bell',hook:'pluck',pad:null},
 industrial:{kick:'x...x...x...x...',clap:'....x.......x...',hat:'x.x.x.x.x.x.x.x.',extra:{zap:'..x.......x.....',rattle:'......x.......x.'},bass:'rumble',lead:'lead',hook:'stab',pad:null},
 melodic:{kick:'x...x...x...x...',clap:'....x.......x...',hat:'..x...x...x...x.',extra:{shaker:'.x.x.x.x.x.x.x.x'},bass:'offroll',lead:'harp',hook:'supersaw',pad:'strings'},
 breakbeat:{kick:'x.....x...x.....',clap:'....x.......x..x',hat:'x.x.x.x.x.x.x.x.',extra:{chug:'x.x.x.x.x.x.x.x.'},bass:'octave',lead:'brass',hook:'stab',pad:'organ'},
 eurodance:{kick:'x...x...x...x...',clap:'....x.......x...',hat:'..x...x...x...x.',ohat:'..x...x...x...x.',extra:{},bass:'octave',lead:'lead',hook:'supersaw',pad:'strings'},
 nudisco:{kick:'x...x...x...x...',clap:'....x.......x...',hat:'x.x.x.x.x.x.x.x.',ohat:'..x...x...x...x.',extra:{},bass:'disco',lead:'pluck',hook:'chords',pad:'strings'},
 lofihouse:{kick:'x...x...x...x...',clap:'....x.......x...',hat:'..x...x...x...x.',extra:{crackle:'x...............',shaker:'x.x.x.x.x.x.x.x.'},bass:'deep',lead:'organ',hook:'chords',pad:'organ',sw:.18},
 epictrance:{kick:'x...x...x...x...',clap:'....x.......x...',hat:'..x...x...x...x.',extra:{hat:'xxxxxxxxxxxxxxxx',timp:'x...............'},bass:'trance',lead:'lead',hook:'supersaw',pad:'choir'},
 dubtechno:{kick:'x...x...x...x...',clap:'........x.......',hat:'..x...x...x...x.',extra:{shaker:'x.x.x.x.x.x.x.x.'},bass:'deep',lead:'bell',hook:'echochord',pad:'strings'}};
const CL_BOSS={0:['techhouse',45,'min',[0,5,3,4]],1:['electro',42,'min',[0,6,5,4]],2:['hardtechno',48,'phr',[0,1,0,6]],3:['dnb',40,'min',[0,5,6,4]],4:['trance',47,'min',[0,5,2,6]],
 5:['basshouse',43,'min',[0,3,5,4]],6:['dubstep',50,'min',[0,5,3,6]],7:['proghouse',49,'min',[0,5,2,6]],8:['futurehouse',51,'dor',[0,3,6,4]],9:['bigroom',41,'min',[0,5,2,6]],
 10:['afro',45,'dor',[0,3,6,4]],11:['deephouse',44,'maj',[0,5,3,4]],12:['moombah',43,'min',[0,5,3,4]],13:['phonk',49,'phr',[0,1,5,4]],14:['darktechno',50,'phr',[0,1,0,6]],
 15:['psy',40,'phr',[0,0,1,0]],16:['futurebass',53,'maj',[0,5,3,4]],17:['halftime',48,'min',[0,5,6,4]],18:['garage',46,'min',[0,3,5,4]],19:['hardstyle',42,'hmin',[0,5,3,4]],
 pendulum:['minimal',52,'min',[0,0,5,6]],panopticon:['industrial',45,'phr',[0,1,6,0]],moth:['melodic',49,'lyd',[0,4,5,3]],bellows:['breakbeat',43,'mix',[0,6,3,0]],metronome:['eurodance',48,'min',[0,5,2,6]],
 calendar:['nudisco',46,'dor',[0,3,4,0]],dust:['lofihouse',42,'dor',[0,3,6,4]],scales:['epictrance',50,'hmin',[0,5,3,4]],echo:['dubtechno',44,'min',[0,3,0,5]]};
const CL_TAG={techhouse:'테크 하우스',electro:'일렉트로 하우스',hardtechno:'하드 테크노',dnb:'드럼 앤 베이스',trance:'트랜스',basshouse:'베이스 하우스',dubstep:'덥스텝',proghouse:'프로그레시브 하우스',futurehouse:'퓨처 하우스',bigroom:'빅룸',afro:'아프로 하우스',deephouse:'딥 하우스',moombah:'뭄바톤',phonk:'퐁크',darktechno:'다크 테크노',psy:'사이트랜스',futurebass:'퓨처 베이스',halftime:'하프타임 베이스',garage:'UK 개러지',hardstyle:'하드스타일',minimal:'미니멀 테크노',industrial:'인더스트리얼 테크노',melodic:'멜로딕 하우스',breakbeat:'브레이크비트',eurodance:'유로댄스',nudisco:'누디스코',lofihouse:'로파이 하우스',epictrance:'에픽 트랜스',dubtechno:'덥 테크노'};
function clNote(C,deg){const S=C.sc,L=S.length;return C.key+S[((deg%L)+L)%L]+12*Math.floor(deg/L)}
function clHook(id,C){const r=rng(hash('club|'+id)),L=C.sc.length,rh=[],notes=[];const R=['x.x.x..xx.x.x...','x..x..x.x..x.x..','x.xx.x.xx.x.x.x.','x...x.x.x...x.xx','xx.x.xx.x.x.xx..','x..x..x...x.x...'][hash(id+'r')%6];
 let d=L+Math.floor(r()*3);for(let i=0;i<32;i++){const c=R[i%16];if(c==='x'){const m=r();d+=m<.35?0:m<.65?(r()<.5?1:-1):m<.85?(r()<.5?2:-2):(r()<.5?4:-4);d=clamp(d,L-1,L*2+3);if(i>=28)d=L;notes.push(d)}else notes.push(null)}return notes}
function clMake(id){const c=CL_BOSS[id];if(!c)return null;const C={id,g:c[0],F:CL_G[c[0]],key:c[1],sc:CL_SC[c[2]],prog:c[3]};C.hook=clHook(id,C);C.hook2=clHook(id+'b',C);return C}
function clPerc(k,at,g){if(k==='timp'||k==='tom')perc(k,at,g,110);else perc(k,at,g)}
function clSlot(n,delay,S){const C=S.club,F=C.F,s16=S.ms/1000/4,at0=audio.currentTime+delay;try{musVol(S.vol||.5)}catch(e){}
 if(n<0){if(n%2===0)perc('tick',at0,.5);return}
 const bar=Math.floor(n/8),lv=Math.min(2,G.phase||0);let sec=Math.floor((bar%32)/8);if(lv>=2&&sec===1)sec=3;if(lv>=1&&sec===0&&bar>=32)sec=3;
 const cyc=bar%8,deg=C.prog[Math.floor(bar/(F.half?2:1))%C.prog.length];
 for(let h=0;h<2;h++){const i=(n%8)*2+h,at=at0+h*s16+((i%2===1&&F.sw)?F.sw*s16:0),drop=sec===3,brk=sec===1,bld=sec===2;
  /* 킥 */const kp=F.kick;if(kp[i]==='x'&&!(bld&&cyc===7&&i>=12)){const kk=F.bass==='hardkick'?'kick909':'kick';perc(kk,at,drop?1:.85);if(F.bass==='hardkick'&&drop)voice('dist',C.key-24,.1,.025,at)}
  if(bld){const dens=cyc<4?4:cyc<6?2:1;if(i%dens===0)perc('snare',at,.12+cyc*.05);if(cyc===7&&i===15)perc('crash',at,.4);if(i===0&&cyc===0)voice('glide',clNote(C,C.sc.length*2),S.ms/1000*32,.01,at)}
  /* 박수 · 하이햇 */if(F.clap[i]==='x')perc('clap',at,drop?.55:brk?.35:.45);if(F.hat[i]==='x')perc('hat',at,brk?.12:.22);if(F.ohat&&F.ohat[i]==='x')perc('ohat',at,.28);
  for(const [k,p] of Object.entries(F.extra||{}))if(p[i]==='x')clPerc(k,at,k==='crash'?(drop&&cyc===0?.7:0):k==='hat'?.12:.35);
  if(drop&&cyc===0&&i===0)perc('crash',at,.8);
  /* 베이스 */if(!(bld&&cyc===7&&i>=12)){const r=clNote(C,deg)-24,B=F.bass;
   if(B==='offroll'){if(i%4===2)voice('pluck',r,s16*1.6,.08,at)}
   else if(B==='octave'){if(i%2===0)voice('pluck',r+(i%4===2?12:0),s16*1.7,.075,at)}
   else if(B==='rumble'){if(i%4===2||i%4===3)voice('pluck',r,s16*.7,.07,at)}
   else if(B==='reese'){if(i%8===0)voice('reese',r,s16*7,.08,at)}
   else if(B==='trance'){if(i%4!==0)voice('pluck',r+(i%4===3?12:0),s16*.9,.07,at)}
   else if(B==='bassy'){if(i%4===2||i%8===7)voice('reese',r+12,s16*1.4,.07,at)}
   else if(B==='wobble'){const rate=drop?1:2;if(i%rate===0)voice('reese',r,s16*rate*.9,.06,at)}
   else if(B==='bouncy'){if(i%4===2)voice('chip',r+12,s16*1.2,.06,at);if(i%4===2)voice('sub',r,s16*1.2,.06,at)}
   else if(B==='afro'){if('x..x..x.....x...'[i]==='x')voice('sub',r,s16*2.5,.09,at)}
   else if(B==='deep'){if(i===0||i===6||i===10)voice('sub',r+(i===10?7:0),s16*3,.09,at)}
   else if(B==='dembow'){if('x..x..x.x..x..x.'[i]==='x')voice('sub',r,s16*2,.09,at)}
   else if(B==='808'){if(i===0||i===10)voice('sub',r,s16*5,.11,at)}
   else if(B==='psy'){if(i%4!==0)voice('buzz',r+12,s16*.8,.05,at)}
   else if(B==='garage'){if('x......x..x.....'[i]==='x')voice('reese',r+12,s16*2.5,.07,at)}
   else if(B==='disco'){if(i%2===0)voice('pizz',r+(i%8===4?12:i%8===6?7:0),s16*1.5,.08,at)}
   else if(B==='hardkick'){if(i%4===2)voice('pluck',r+12,s16*1.5,.07,at)}}
  /* 패드 (펌핑: 박마다 다시 부풀기) */if(F.pad&&(brk||drop||lv>=1)&&i%4===1)for(const k of [0,2,4])voice(F.pad,clNote(C,deg+k),s16*3,brk?.02:.013,at);
  /* 리드 훅 */const hk=(bar%4<2?C.hook:C.hook2),hi=(bar%2)*16+i,nt=hk[hi];
  if(typeof nt==='number'){const nn=clNote(C,nt),H=F.hook;
   if(drop){if(H==='supersaw'||H==='bigroom'){for(const o of [0,H==='bigroom'?12:7,12])voice(F.lead,nn+o,s16*1.8,.022,at)}else if(H==='stab'){for(const k of [0,2,4])voice(F.lead,clNote(C,nt+k),s16*1.2,.022,at)}else if(H==='acid'){voice('buzz',nn,s16*1.1,.04,at)}else if(H==='swell'){for(const k of [0,2,4,6])voice('lead',clNote(C,nt+k),s16*2.5,.014,at)}else if(H==='echochord'){for(const k of [0,2,4]){voice(F.lead,clNote(C,nt+k),s16*1.5,.022,at);voice(F.lead,clNote(C,nt+k),s16*1.2,.01,at+s16*3)}}else if(H==='chords'){for(const k of [0,2,4,6])voice(F.lead,clNote(C,nt+k),s16*1.6,.016,at)}else voice(F.lead,nn,s16*1.6,.045,at);voice('chip',nn+12,s16,.012,at)}
   else if(brk||sec===0){voice(F.hook==='pluck'||brk?'pluck':F.lead,nn,s16*1.4,brk?.035:.025,at)}
   else if(bld)voice('pluck',nn+(cyc>=4?12:0),s16*1.2,.022+cyc*.002,at)}
  /* 드롭 아르페지오 */if(drop&&lv>=1&&h===1){const up=[0,2,4,7];voice('chip',clNote(C,deg+up[i%4])+24,s16*.7,.012,at)}}}
{const _ms3=makeSong;makeSong=function(bi){const S=_ms3.apply(this,arguments);try{if(S&&!S.cave){const id=(typeof _c3Swap!=='undefined'&&_c3Swap&&_c3Swap.art&&_c3Swap.bi===bi)?_c3Swap.art:bi;const C=clMake(id);if(C){S.club=C;delete S.nm;S.vol=.5;S.title=(S.title||'').split(' · ')[0]+' · '+CL_TAG[C.g]}}}catch(e){}return S}}
{const _ps4=playSlot;playSlot=function(n,delay,S){if(S&&S.club&&audio&&Number.isFinite(delay)){try{clSlot(n,delay,S)}catch(e){}return}return _ps4.apply(this,arguments)}}
/* ================= v81: 긴 곡 구성 (약 124마디 · 전주-벌스-빌드-드롭-브레이크-벌스2-빌드-드롭2-브리지-파이널) ================= */
const CL_FORM=[['intro',8],['verseA',16],['build',8],['drop1',16],['break',8],['verseB',16],['build',8],['drop2',16],['bridge',8],['build',4],['final',16]];
const CL_FORM_LEN=CL_FORM.reduce((a,f)=>a+f[1],0);
const CL_RH=['x.x.x..xx.x.x...','x..x..x.x..x.x..','x.xx.x.xx.x.x.x.','x...x.x.x...x.xx','xx.x.xx.x.x.xx..','x..x..x...x.x...','x.x...x.x.x...x.','x...x...x.x.x...','x.x.x.x.xx.x....','..x.x.x...x.x.x.','x..x.x..x..x.x.x','x-..x-..x.x.x---'];
const CL_PROGS=[[0,5,3,4],[0,3,4,0],[0,6,5,4],[0,5,2,6],[0,3,6,4],[5,3,0,4],[0,4,5,3],[3,4,5,5],[0,1,0,6],[5,6,0,0],[0,2,3,4],[3,0,4,5]];
function clMel(seed,C,bars,rh,lo,hi){const r=rng(hash('clm|'+seed)),L=C.sc.length,out=[];let d=L+Math.floor(r()*3);rh=Math.abs(rh|0);const R=[CL_RH[rh%CL_RH.length],CL_RH[(rh+3+Math.floor(r()*4))%CL_RH.length]];
 for(let b=0;b<bars;b++){const pat=R[b%2===1&&r()<.5?1:0];for(let i=0;i<16;i++){const c=pat[i];if(c==='x'){const m=r();d+=m<.3?0:m<.62?(r()<.5?1:-1):m<.85?(r()<.5?2:-2):(r()<.5?4:-4);d=clamp(d,L+(lo||-1),L*2+(hi||3));if(b===bars-1&&i>=12)d=L;out.push(d)}else out.push(c==='-'?'-':null)}}return out}
function clMake2(id){const C=clMake(id);if(!C)return null;const h=hash('cl2|'+id),r=rng(h);C.progA=C.prog;C.progB=CL_PROGS[h%CL_PROGS.length];if(C.progB.join()===C.progA.join())C.progB=CL_PROGS[(h+1)%CL_PROGS.length];C.progBr=CL_PROGS[(h>>>4)%CL_PROGS.length];
 C.m={v1:clMel(id+'v1',C,4,h%12,-2,1),v2:clMel(id+'v2',C,4,(h>>>3)%12,-1,2),hA:clMel(id+'hA',C,4,(h>>>6)%12,0,3),hB:clMel(id+'hB',C,4,(h>>>9)%12,0,4),br:clMel(id+'br',C,4,(h>>>12)%12,-2,2),intro:clMel(id+'in',C,4,(h>>>15)%12,-1,1)};
 C.leadB=['lead','chip','brass','pluck','flute','bell','harpsi','strings'][(h>>>18)%8];if(C.leadB===C.F.lead)C.leadB='chip';return C}
function clSec(bar){let b=bar%CL_FORM_LEN;for(const [name,len] of CL_FORM){if(b<len)return [name,b,len];b-=len}return ['final',0,16]}
function clSlot2(n,delay,S){const C=S.club,F=C.F,s16=S.ms/1000/4,at0=audio.currentTime+delay;try{musVol(S.vol||.5)}catch(e){}
 if(n<0){if(n%2===0)perc('tick',at0,.5);return}
 const bar=Math.floor(n/8),lv=Math.min(2,G.phase||0),[sec,sb,slen]=clSec(bar),loop=Math.floor(bar/CL_FORM_LEN),tr=(sec==='final'?2:0)+(loop%2?-2:0);
 const prog=sec==='verseB'||sec==='break'?C.progB:sec==='bridge'?C.progBr:C.progA,deg=prog[Math.floor(sb/(F.half?2:1))%4],K=d=>clNote(C,d)+tr;
 const isDrop=sec==='drop1'||sec==='drop2'||sec==='final',isBuild=sec==='build',isBr=sec==='break',isBridge=sec==='bridge',isIntro=sec==='intro',full=isDrop||lv>=2;
 for(let h=0;h<2;h++){const i=(n%8)*2+h,at=at0+h*s16+((i%2===1&&F.sw)?F.sw*s16:0),lastBar=sb===slen-1;
  /* 킥 */{let kp=F.kick;if(isBridge)kp='x.........x.....';const on=kp[i]==='x'&&!(isIntro&&sb<4&&i%8!==0)&&!(isBuild&&lastBar&&i>=12);if(on){perc(F.bass==='hardkick'?'kick909':'kick',at,full?1:.82);if(F.bass==='hardkick'&&full)voice('dist',C.key-24+tr,.1,.025,at)}}
  /* 빌드업 */if(isBuild){const q=sb/slen,dens=q<.5?4:q<.75?2:1;if(i%dens===0)perc('snare',at,.12+q*.3);if(lastBar&&i===15)perc('crash',at,.4);if(sb===0&&i===0)voice('glide',K(C.sc.length*2),S.ms/1000*4*slen,.01,at)}
  /* 박수 · 하이햇 · 추가 타악 */if(F.clap[i]==='x'&&!(isIntro&&sb<4))perc('clap',at,full?.55:isBr?.32:.45);if(isBridge&&i===8)perc('snare',at,.5);
  if(F.hat[i]==='x')perc('hat',at,isBr||isIntro?.12:.22);if(F.ohat&&F.ohat[i]==='x'&&!isIntro)perc('ohat',at,.26);
  if(!isIntro)for(const [k,p] of Object.entries(F.extra||{}))if(p[i]==='x'&&(k!=='crash'||(isDrop&&sb===0)))clPerc(k,at,k==='crash'?.7:k==='hat'?.12:(sec==='verseB'||isDrop?.4:.28));
  if(sec==='verseB'&&i%4===3)perc('shaker',at,.2);if(sec==='drop2'&&(i===6||i===14))perc('ohat',at,.2);if(sec==='final'&&i%2===1)perc('hat',at,.1);
  if(isDrop&&sb===0&&i===0){perc('crash',at,.85);if(sec==='final')perc('taiko',at,.6)}
  if(!isBuild&&sb%4===3&&i>=13&&!isIntro){perc('snare',at,.3);if(i===15)perc('tom',at,.5,mtof(K(deg)-12))}
  /* 베이스 */if(!(isIntro&&sb<4)&&!(isBuild&&lastBar&&i>=12)){const r=K(deg)-24,B=isBridge?'808':F.bass,gm=isBr?.7:1;
   if(B==='offroll'){if(i%4===2)voice('pluck',r,s16*1.6,.08*gm,at)}else if(B==='octave'){if(i%2===0)voice('pluck',r+(i%4===2?12:0),s16*1.7,.075*gm,at)}
   else if(B==='rumble'){if(i%4===2||i%4===3)voice('pluck',r,s16*.7,.07*gm,at)}else if(B==='reese'){if(i%8===0)voice('reese',r,s16*7,.08*gm,at)}
   else if(B==='trance'){if(i%4!==0)voice('pluck',r+(i%4===3?12:0),s16*.9,.07*gm,at)}else if(B==='bassy'){if(i%4===2||i%8===7)voice('reese',r+12,s16*1.4,.07*gm,at)}
   else if(B==='wobble'){const rate=full?1:2;if(i%rate===0)voice('reese',r,s16*rate*.9,.06*gm,at)}else if(B==='bouncy'){if(i%4===2){voice('chip',r+12,s16*1.2,.06*gm,at);voice('sub',r,s16*1.2,.06*gm,at)}}
   else if(B==='afro'){if('x..x..x.....x...'[i]==='x')voice('sub',r,s16*2.5,.09*gm,at)}else if(B==='deep'){if(i===0||i===6||i===10)voice('sub',r+(i===10?7:0),s16*3,.09*gm,at)}
   else if(B==='dembow'){if('x..x..x.x..x..x.'[i]==='x')voice('sub',r,s16*2,.09*gm,at)}else if(B==='808'){if(i===0||i===10)voice('sub',r,s16*5,.11*gm,at)}
   else if(B==='psy'){if(i%4!==0)voice('buzz',r+12,s16*.8,.05*gm,at)}else if(B==='garage'){if('x......x..x.....'[i]==='x')voice('reese',r+12,s16*2.5,.07*gm,at)}
   else if(B==='disco'){if(i%2===0)voice('pizz',r+(i%8===4?12:i%8===6?7:0),s16*1.5,.08*gm,at)}else if(B==='hardkick'){if(i%4===2)voice('pluck',r+12,s16*1.5,.07*gm,at)}}
  /* 패드 */if(F.pad&&(isBr||isIntro||isBridge||full||lv>=1)&&i%4===1)for(const k of [0,2,4])voice(F.pad,K(deg+k),s16*3,isBr||isIntro?.02:.013,at);
  /* 인트로 아르페지오 */if(isIntro&&i%2===0){const up=[0,2,4,2];voice('pluck',K(deg+up[(i/2)%4])+12,s16*1.2,.018+sb*.002,at)}
  /* 선율: 구간마다 다른 선율 */{const mat=isIntro?(sb>=4?C.m.intro:null):sec==='verseA'?C.m.v1:sec==='verseB'?C.m.v2:isBr?C.m.hA:isBridge?C.m.br:sec==='drop2'?C.m.hB:isDrop?(sec==='final'&&Math.floor(sb/4)%2?C.m.hB:C.m.hA):isBuild?C.m.v1:null;
   if(mat){const idx=(sb%4)*16+i,nt=mat[idx];if(typeof nt==='number'){let hold=1;for(let k=idx+1;k<mat.length&&mat[k]==='-';k++)hold++;const nn=K(nt),HK=F.hook,lead=sec==='drop2'?C.leadB:F.lead;
    if(isDrop){if(HK==='supersaw'||HK==='bigroom'){for(const o of [0,HK==='bigroom'?12:7,12])voice(lead,nn+o,s16*1.8*hold,.021,at)}else if(HK==='stab'){for(const k of [0,2,4])voice(lead,K(nt+k),s16*1.2,.022,at)}else if(HK==='acid')voice('buzz',nn,s16*1.1*hold,.04,at);else if(HK==='swell'){for(const k of [0,2,4,6])voice('lead',K(nt+k),s16*2.5,.014,at)}else if(HK==='echochord'){for(const k of [0,2,4]){voice(lead,K(nt+k),s16*1.5,.022,at);voice(lead,K(nt+k),s16*1.2,.01,at+s16*3)}}else if(HK==='chords'){for(const k of [0,2,4,6])voice(lead,K(nt+k),s16*1.6,.016,at)}else voice(lead,nn,s16*1.6*hold,.045,at);voice('chip',nn+12,s16,.012,at)}
    else if(isBuild)voice('pluck',nn+(sb>=slen/2?12:0),s16*1.2,.022+sb*.002,at);
    else if(isBridge)voice(F.pad||'strings',nn,s16*hold*.95,.03,at);
    else voice(sec==='verseB'?(C.leadB==='lead'?'pluck':C.leadB):(isBr?'pluck':F.hook==='pluck'?'pluck':F.lead),nn,s16*1.4*Math.min(hold,3),isBr?.035:.028,at)}}}
  /* 드롭 아르페지오 */if((isDrop&&(lv>=1||sec!=='drop1'))&&h===1){const up=sec==='drop2'?[0,4,2,7]:[0,2,4,7];voice('chip',K(deg+up[i%4])+24,s16*.7,.012,at)}}}
{const _ms4=makeSong;makeSong=function(bi){const S=_ms4.apply(this,arguments);try{if(S&&S.club)S.club=clMake2(S.club.id)||S.club}catch(e){}return S}}
{const _ps5=playSlot;playSlot=function(n,delay,S){if(S&&S.club&&S.club.m&&audio&&Number.isFinite(delay)){try{clSlot2(n,delay,S)}catch(e){}return}return _ps5.apply(this,arguments)}}

