/* ================= v47 챕터 6 ZENITH 음악: 보스 10명 각자 3분짜리 "하늘 섬" 곡 =================
   - 전투 박자와 같은 빠르기로 연주한다(공격 박자와 음악 박자가 맞음). 약 3분 뒤 처음으로 돌아간다.
   - 곡 구성: 바람 소리 전주 → 주제(A) → 대답(B) → 주제 변주 → 떠 있는 섬(조용한 다리) → 고조 → 절정 → 되돌림 → 마무리
   - 하늘 섬 느낌: 하프 아르페지오 · 플루트 · 종소리 반짝임 · 현악/합창 깔개 · 바람 소리. 3막(폭풍)은 북과 금관이 커짐.
   - playSlot(n)은 반 박자마다 불린다. 한 칸 = 16분음표, 반 박자 = 2칸. */
(function(){try{
 const L6=window.S6ART;if(!L6||typeof c3MakeSong!=='function')return;
 const SCL={maj:[0,2,4,5,7,9,11],mix:[0,2,4,5,7,9,10],dor:[0,2,3,5,7,9,10],lyd:[0,2,4,6,7,9,11],min:[0,2,3,5,7,8,10],hmin:[0,2,3,5,7,8,11]};
 /* 가락: 8분음표 하나가 한 글자. 숫자=음계 칸, .=쉼, -=앞 음 늘이기. 4/4는 16글자(2마디), 3/4는 12글자(2마디) */
 const M6=[
  {title:'구름 선착장의 아침',root:62,sc:'mix',meter:16,lead:'flute',lead2:'glide',arp:'harp',pad:'strings',bass:'pizz',spark:'bell',drum:'light',
   A:'4 - 2 4 5 - 4 2 1 - . 2 4 - - .',B:'7 - 6 4 5 - . 4 2 - 4 5 4 - - .',pA:[0,6,3,0],pB:[3,0,6,4],pBr:[3,4,5,4],pC:[0,6,3,4]},
  {title:'연이 노는 언덕',root:55,sc:'maj',meter:16,lead:'pluck',lead2:'flute',arp:'harp',pad:'strings',bass:'pizz',spark:'bell',drum:'skip',
   A:'0 2 4 . 4 5 4 2 4 - 7 . 5 4 2 .',B:'7 . 7 5 4 . 5 7 9 - 7 5 4 - - .',pA:[0,4,5,3],pB:[3,4,0,5],pBr:[5,3,4,4],pC:[0,4,5,3]},
  {title:'번개구름의 노래',root:52,sc:'dor',meter:16,lead:'flute',lead2:'strings',arp:'harp',pad:'choir',bass:'sub',spark:'bell',drum:'deep',
   A:'0 - - 2 4 - 3 2 1 - - - 0 - - .',B:'4 - 5 4 7 - - 6 5 - 4 2 4 - - .',pA:[0,3,0,6],pB:[3,6,0,4],pBr:[5,3,6,4],pC:[0,6,3,4]},
  {title:'바람개비호 출항',root:57,sc:'mix',meter:16,lead:'brass',lead2:'flute',arp:'harp',pad:'strings',bass:'pizz',spark:'bell',drum:'march',
   A:'0 . 0 2 4 . 4 5 7 - 5 4 2 - . .',B:'4 . 4 5 7 . 7 9 8 - 7 5 4 - - .',pA:[0,6,3,4],pB:[3,0,6,4],pBr:[5,3,4,4],pC:[0,3,6,4]},
  {title:'거꾸로 흐르는 정오',root:53,sc:'lyd',meter:16,lead:'harpsi',lead2:'flute',arp:'harp',pad:'strings',bass:'pluck',spark:'bell',drum:'tick',
   A:'4 3 4 6 7 - 6 4 3 - 1 3 4 - - .',B:'7 8 7 6 4 - 6 7 8 - 9 8 7 - - .',pA:[0,1,0,4],pB:[3,1,5,4],pBr:[5,1,3,4],pC:[0,1,5,4]},
  {title:'바람 오르간 성가',root:60,sc:'maj',meter:12,lead:'flute',lead2:'choir',arp:'harp',pad:'organ',bass:'sub',spark:'bell',drum:'waltz',
   A:'0 - 2 4 - 5 4 - 2 0 - .',B:'7 - 5 4 - 2 3 - 4 2 - .',pA:[0,3,4,0],pB:[5,3,1,4],pBr:[3,5,3,4],pC:[0,5,3,4]},
  {title:'일곱 빛 다리',root:58,sc:'lyd',meter:16,lead:'glide',lead2:'flute',arp:'harp',pad:'strings',bass:'pizz',spark:'bell',drum:'spark',
   A:'7 4 9 7 11 - 9 7 6 4 6 7 4 - - .',B:'11 - 9 - 7 - 6 - 7 9 7 6 4 - - .',pA:[0,1,5,4],pB:[3,1,0,4],pBr:[5,1,3,1],pC:[0,1,5,4]},
  {title:'메아리 사냥',root:50,sc:'dor',meter:16,lead:'flute',lead2:'pluck',arp:'harp',pad:'strings',bass:'pizz',spark:'bell',drum:'falcon',
   A:'0 2 3 4 - 3 2 0 -2 - 0 2 0 - - .',B:'4 5 7 - 5 4 3 4 2 - 3 2 1 - - .',pA:[0,6,3,0],pB:[3,6,4,4],pBr:[5,3,6,4],pC:[0,6,5,6]},
  {title:'폭풍의 눈 속으로',root:48,sc:'hmin',meter:16,lead:'brass',lead2:'strings',arp:'harp',pad:'choir',bass:'sub',spark:'bell',drum:'storm',
   A:'0 . 0 2 3 - 2 0 -1 - 0 . 0 - - .',B:'4 - 3 4 5 - 4 3 2 - 1 -1 0 - - .',pA:[0,5,3,4],pB:[5,3,4,4],pBr:[3,5,1,4],pC:[0,5,3,4]},
  {title:'첫 번째 노래',root:50,sc:'maj',meter:16,lead:'flute',lead2:'brass',arp:'harp',pad:'choir',bass:'sub',spark:'bell',drum:'spire',
   A:'0 - 4 - 7 - 6 5 4 - 2 4 5 - - .',B:'7 - 9 7 8 - 7 5 4 - 5 6 7 - - .',pA:[0,4,5,3],pB:[3,4,5,4],pBr:[5,3,1,4],pC:[0,4,5,3]}];
 /* 가락 글자 → [칸별 음, 길이(8분음표 수)] */
 const parse=s=>{const t=s.trim().split(/\s+/),out=[];for(let i=0;i<t.length;i++){if(t[i]==='.'||t[i]==='-'){out.push(null);continue}let n=1;while(t[i+n]==='-')n++;out.push([+t[i],n])}return out};
 for(const m of M6){m.a=parse(m.A);m.b=parse(m.B);m.S=SCL[m.sc]}
 const nt=(m,d)=>{const L=7,i=((d%L)+L)%L;return m.root+m.S[i]+12*Math.floor(d/L)};
 /* 드럼: 16칸(또는 12칸) 마디 안의 자리 */
 const DR={
  light:{k:[0,8],s:[4,12],h:[2,6,10,14],sh:2},skip:{k:[0,6,10],s:[4,12],h:[0,2,4,6,8,10,12,14],sh:2},
  deep:{k:[0],t:[8],s:[12],h:[4,12],sh:4},march:{k:[0,8],s:[4,12,14,15],h:[0,2,4,6,8,10,12,14],sh:4},
  tick:{k:[0,8],s:[12],tk:[0,2,4,6,8,10,12,14],h:[],sh:4},waltz:{k:[0],s:[4,8],h:[2,6,10],sh:2},
  spark:{k:[0,7,10],s:[4,12],h:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],sh:2},falcon:{k:[0,3,8,11],s:[4,12],t:[14],h:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],sh:2},
  storm:{k:[0,8],t:[0,6,10],s:[4,12],h:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],sh:4},spire:{k:[0,8,10],s:[4,12],tim:[0],h:[0,2,4,6,8,10,12,14],sh:2}};
 /* 곡 구성 비율 (합 1) */
 const FORM=[['intro',.06],['A',.15],['B',.13],['A2',.12],['bridge',.12],['build',.07],['C',.18],['A3',.09],['outro',.08]];
 function form(bars){const f=FORM.map(([n,w])=>[n,Math.max(2,Math.round(bars*w/2)*2)]);const sum=f.reduce((a,x)=>a+x[1],0);f[6][1]+=bars-sum;return f}
 /* 바람 소리: 잡음을 띠 필터로 쓸어 올림/내림 */
 let wbuf=null;function wind(at,len,g,f0,f1){if(!audio||!(len>0))return;if(!wbuf){wbuf=audio.createBuffer(1,audio.sampleRate*2,audio.sampleRate);const d=wbuf.getChannelData(0);let v=0;for(let i=0;i<d.length;i++){v=v*.97+(Math.random()*2-1)*.03;d[i]=v*6}}
  const s=audio.createBufferSource(),bp=audio.createBiquadFilter(),e=audio.createGain();s.buffer=wbuf;s.loop=true;bp.type='bandpass';bp.Q.value=1.2;bp.frequency.setValueAtTime(f0,at);bp.frequency.exponentialRampToValueAtTime(f1,at+len);
  e.gain.setValueAtTime(.0001,at);e.gain.linearRampToValueAtTime(g,at+len*.45);e.gain.exponentialRampToValueAtTime(.0001,at+len);s.connect(bp);bp.connect(e);vOut(e,.5);s.start(at);s.stop(at+len+.1)}
 const note=(kind,p,len,g,at)=>{if(kind==='pulse'||kind==='triangle')chipNote(kind,p,len,g,at,{duty:.25,sus:.5});else voice(kind,p,len,g,at)};
 /* 악기 크기 (5장 곡과 비슷한 음량이 되도록 맞춤) */
 const GAIN={flute:.15,glide:.085,pluck:.13,brass:.075,harpsi:.11,strings:.095,choir:.11,organ:.065,harp:.09,bell:.075,pizz:.13,sub:.15};

 function s6Music(n,delay,S){if(!audio||!Number.isFinite(delay))return;musVol(S.vol);const k=S.s6Mix,m=M6[k],q=S.ms/4000,origin=audio.currentTime+delay,me=m.meter,bars=S.s6Bars,F=S.s6Form,total=bars*me,act3=k>=7;
  if(n<0){perc('shaker',origin,.8);return}
  for(let j=n*2;j<n*2+2;j++){if(RPM.routing&&j>=total)continue;const jj=j%total,bar=Math.floor(jj/me),s=jj%me,at=origin+(j-n*2)*q;
   let b=bar,sec=F[0];for(const f of F){if(b<f[1]){sec=f;break}b-=f[1]}const name=sec[0],L=sec[1],last=b>=L-2&&name==='outro',left=(total-jj)*q;
   const prog=name==='B'||name==='A3'?m.pB:name==='bridge'||name==='build'?m.pBr:name==='C'?m.pC:m.pA,d=last?0:prog[Math.floor(b)%prog.length],fade=name==='outro'?Math.max(.25,1-b/L):name==='intro'?Math.min(1,.4+b/L):1;
   const E=(kind,p,len,g)=>{if(left<.4)return;note(kind,p,Math.min(len,left-.3),g*fade,at)};
   const beat=me===12?4:4,half=me/2;
   /* 바람 */if(s===0&&(name==='intro'||name==='bridge'||name==='outro'||(name==='build'&&b%2===0)||(b%8===0)))wind(at,q*me*(name==='build'?2:1.6),name==='intro'||name==='bridge'?.05:.03,name==='build'?300:500,name==='build'?2400:900+((b*137)%700));
   /* 깔개(현악·합창·오르간) */if(s===0&&name!=='build'){const pk=name==='bridge'?'choir':m.pad,gg=GAIN[pk]*(name==='C'?1.1:name==='A'||name==='B'?.7:1);for(const v of [0,2,4])E(pk,nt(m,d+v)+(pk==='choir'?0:-12),q*me*.95,gg*.55)}
   /* 하프 아르페지오: 섬 위로 흐르는 물결 */{const fast=name==='build'||name==='C',step=fast?1:2;if(s%step===0&&name!=='outro'||(name==='outro'&&!last&&s%2===0)){const pat=[0,2,4,7,9,7,4,2],i=(s/step)%8,up=name==='outro'?pat.length-1-i:i,oct=name==='C'?12:0;E(m.arp,nt(m,d+pat[up])+oct,q*3,GAIN.harp*(fast?.75:1)*(name==='intro'||name==='bridge'?.8:1))}}
   /* 베이스 */if(name!=='intro'&&name!=='bridge'&&!last){const bs=me===12?[0,6]:name==='C'||act3?[0,6,8,14]:[0,8];if(bs.includes(s))E(m.bass,nt(m,d)-24+(s===6||s===14?12:0),q*(m.bass==='sub'?6:2),GAIN[m.bass])}
   /* 드럼 */{const D=DR[m.drum],lv=name==='A'||name==='B'||name==='A3'?1:name==='A2'?2:name==='C'?3:0;
    if(lv){if(D.k.includes(s))chipDrum('kick',at,.75);if(D.s.includes(s))chipDrum('snare',at,(s===14||s===15?.25:.55)*(lv>1?1:.8));if(lv>=2&&D.h.includes(s))chipDrum('hat',at,s%4===0?.22:.13);if(s%D.sh===0)perc('shaker',at,lv>1?.6:.45);
     if(D.t&&D.t.includes(s)&&lv>=2)perc('taiko',at,act3?.7:.45);if(D.tk&&D.tk.includes(s))perc(s%4===0?'tock':'tick',at,.35);if(D.tim&&D.tim.includes(s)&&b%2===0)perc('timp',at,.6,nt(m,d)<60?55:73);
     if(lv===3&&s===0&&b%4===0)chipDrum('crash',at,.4);if(b%4===3&&s>=me-3&&lv>=2)perc('tom',at,.4,[180,150,120][s-(me-3)])}
    if(name==='build'){const pr=(b+s/me)/L;if(s%(pr>.5?1:2)===0)chipDrum('snare',at,.08+.4*pr);if(s===0)chipDrum('kick',at,.5)}
    if(name==='bridge'&&s===0&&b%2===0)perc('timp',at,.25,55)}
   /* 반짝이는 종소리 */if((name==='intro'||name==='bridge'||name==='B')&&((s*7+b*5)%me===3)){E(m.spark,nt(m,d+[4,7,9,11][(b+s)%4])+12,q*4,GAIN.bell*(name==='B'?.6:1))}
   /* 가락 */{let mot=null,kind=m.lead,g=GAIN[m.lead]||.1,oct=12,tr=0;
    if(name==='A'||name==='A2'||name==='C'){mot=m.a}else if(name==='B'||name==='A3'){mot=m.b;kind=name==='A3'?m.arp:m.lead2;g=GAIN[kind]||.1}
    if(name==='intro'&&b>=L-2)mot=null;
    if(mot){const pos=(b%2)*me+s;if(pos%2===0){const tok=mot[(pos/2)%mot.length];if(tok){let [v,len]=tok;const ph=Math.floor(b/2)%4;if(ph===1)tr=1;if(ph===3&&pos>=me){v=pos>=me+half?0:v}
      if(name==='A2'&&ph===2)oct=24;const p=nt(m,v+tr)+oct,dur=q*2*len*.95;E(kind,p,dur,g);
      if(name==='C'){E(m.lead2,nt(m,v+tr-2)+oct,dur,(GAIN[m.lead2]||.04)*.7);if(act3)E('brass',nt(m,v+tr)+oct-12,dur,.06)}
      if(name==='A2'&&m.lead2!==kind)E(m.lead2,nt(m,v+tr+2)+oct,dur,(GAIN[m.lead2]||.04)*.45)}}}
    /* 떠 있는 섬: 플루트가 긴 숨으로 */if(name==='bridge'&&s===0)E('flute',nt(m,d+[4,2,0,1][b%4])+12,q*me*.9,.11)}
   /* 마무리 화음 */if(last&&b===L-2&&s===0){for(const v of [0,2,4,7])E(m.pad==='choir'?'strings':m.pad,nt(m,v),Math.min(left-.4,q*me*2),.07);E(m.arp,nt(m,7)+12,q*8,.1);E('bell',nt(m,11)+12,q*12,.08);E(m.bass,m.root-24,q*me*2,.12)}
  }}

 /* 노래 만들기: 6장 보스면 3분 곡 정보를 붙임 */
 {const base=c3MakeSong;c3MakeSong=function(art,bi){const S=base.apply(this,arguments);try{const k=L6.findIndex(b=>b.art===art);if(k<0)return S;const m=M6[k],barSec=S.ms/1000*(m.meter/4),bars=Math.max(24,Math.round(180/barSec/2)*2);
  S.s6Mix=k;S.s6Bars=bars;S.s6Form=form(bars);S.s6Dur=bars*barSec;S.vol=.27;S.root=m.root;S.scale=m.S;S.title=m.title+' · ZENITH';S.musicBpm=Math.round(S.bpm)}catch(e){console.error('v47 song',e)}return S}}
 {const base=playSlot;playSlot=function(n,delay,S){if(S&&S.s6Mix!=null){try{s6Music(n,delay,S)}catch(e){console.error('v47 music',e)}return}return base.apply(this,arguments)}}
 {const base=rpMusLoad;rpMusLoad=function(){const ok=base.apply(this,arguments);try{if(ok&&RPM.S&&RPM.S.s6Mix!=null){RPM.duration=RPM.S.s6Dur;RPM.loopOnly=false}}catch(e){}return ok}}
 /* 곡 이름: 러시 화면 · 결과 등에 쓰이는 C3MUS 제목 */
 try{L6.forEach((b,k)=>{const C=C3MUS[b.art];if(C){C.title=M6[k].title;C.tag='하늘 섬의 노래 · 3분'}})}catch(e){}
 window.S6MUS=M6;
}catch(e){console.error('v47 ch6 music',e)}})();
