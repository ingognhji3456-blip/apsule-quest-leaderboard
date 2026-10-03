/* ================= v51 챕터 7 REVERSE 음악: 보스 10명 각자 3분짜리 "거울 세계" 곡 =================
   - 전투 박자와 같은 빠르기로 연주한다(공격 박자와 음악 박자가 맞음). 약 3분 뒤 처음으로 돌아간다.
   - 거울 느낌을 내는 장치
     · 거울 가락: 주제를 끝에서부터 거꾸로 연주하는 구간(R)
     · 거울 이중주: 절정(C)에서 주제와 "위아래로 뒤집은 주제"가 동시에 울림 (나와 거울 속의 나)
     · 메아리: 가락이 한 박자 뒤 종소리로 한 번 더 울림 (전투의 메아리 공격과 같은 느낌)
     · 거꾸로 빨려드는 소리: 구간이 바뀌기 직전, 소리가 거꾸로 재생되듯 점점 커지다 뚝 끊김
     · 오르골 · 시계 소리: 전주 · 다리 · 마무리에서 오르골이 가락을 거꾸로 연주하고, 시곗바늘 소리가 들림
   - 곡 구성: 전주 → 주제(A) → 거울 가락(R) → 대답(B) → 주제+메아리 → 오르골 다리 → 고조 → 거울 이중주(C) → 되돌림 → 마무리
   - playSlot(n)은 반 박자마다 불린다. 한 칸 = 16분음표, 반 박자 = 2칸. */
(function(){try{
 const L7=window.S7ART;if(!L7||typeof c3MakeSong!=='function')return;
 const SCL={maj:[0,2,4,5,7,9,11],mix:[0,2,4,5,7,9,10],dor:[0,2,3,5,7,9,10],lyd:[0,2,4,6,7,9,11],min:[0,2,3,5,7,8,10],hmin:[0,2,3,5,7,8,11]};
 /* 가락: 8분음표 하나가 한 글자. 숫자=음계 칸, .=쉼, -=앞 음 늘이기. 4/4는 16글자(2마디), 3/4는 12글자(2마디) */
 const M7=[
  {title:'거울문 너머',root:57,sc:'min',meter:16,lead:'harpsi',lead2:'flute',arp:'harp',pad:'strings',bass:'pizz',drum:'tick',
   A:'0 - 2 3 4 - 3 2 4 - 7 - 6 - - .',B:'4 - 5 6 7 - 6 4 5 - 4 3 2 - - .',pA:[0,5,3,4],pB:[5,3,6,4],pBr:[3,5,3,4],pC:[0,5,3,4]},
  {title:'유리 깃털',root:60,sc:'lyd',meter:16,lead:'bell',lead2:'flute',arp:'harp',pad:'strings',bass:'pizz',drum:'spark',
   A:'4 6 7 - 9 7 6 4 7 - 11 - 9 - - .',B:'11 9 7 - 6 4 6 7 4 - 2 - 4 - - .',pA:[0,1,5,4],pB:[3,1,0,4],pBr:[5,1,3,1],pC:[0,1,5,4]},
  {title:'거꾸로 흐르는 물',root:55,sc:'dor',meter:16,lead:'glide',lead2:'harp',arp:'harp',pad:'choir',bass:'sub',drum:'light',
   A:'0 - - 2 3 - 4 - 6 - 4 3 2 - - .',B:'7 - 6 4 3 - 4 2 0 - 2 3 4 - - .',pA:[0,3,0,6],pB:[3,6,0,4],pBr:[5,3,6,4],pC:[0,6,3,4]},
  {title:'흑백의 체스판',root:52,sc:'hmin',meter:16,lead:'harpsi',lead2:'brass',arp:'harpsi',pad:'organ',bass:'pizz',drum:'march',
   A:'0 . 0 . 2 3 4 . 3 . 2 . 1 - - .',B:'4 . 4 . 5 6 7 . 6 . 5 . 4 - - .',pA:[0,3,4,0],pB:[5,3,4,4],pBr:[3,5,1,4],pC:[0,5,3,4]},
  {title:'촛불 회랑의 자장가',root:53,sc:'min',meter:12,lead:'flute',lead2:'bell',arp:'harp',pad:'organ',bass:'sub',drum:'waltz',
   A:'0 - 2 3 - 2 0 - -1 0 - .',B:'4 - 3 2 - 3 4 - 5 4 - .',pA:[0,5,3,4],pB:[5,3,6,4],pBr:[3,5,3,4],pC:[0,5,6,4]},
  {title:'오르골 발레',root:62,sc:'maj',meter:12,lead:'bell',lead2:'strings',arp:'harp',pad:'strings',bass:'pizz',drum:'waltz',
   A:'7 - 4 2 - 4 7 - 9 7 - .',B:'9 - 7 6 - 7 4 - 2 4 - .',pA:[0,3,4,0],pB:[5,3,1,4],pBr:[3,5,3,4],pC:[0,5,3,4]},
  {title:'거꾸로 도는 회전목마',root:58,sc:'mix',meter:16,lead:'organ',lead2:'bell',arp:'harp',pad:'strings',bass:'pizz',drum:'skip',
   A:'0 2 4 . 4 2 4 7 6 - 4 . 2 - - .',B:'7 . 6 4 6 . 4 2 4 - 2 . 0 - - .',pA:[0,6,3,4],pB:[3,0,6,4],pBr:[5,3,4,4],pC:[0,3,6,4]},
  {title:'그림자 인형극',root:50,sc:'dor',meter:16,lead:'pluck',lead2:'harpsi',arp:'harp',pad:'strings',bass:'pizz',drum:'falcon',
   A:'0 . 3 . 2 . 4 3 2 - 0 . -1 - - .',B:'4 . 6 . 5 . 7 6 5 - 4 . 2 - - .',pA:[0,6,3,0],pB:[3,6,4,4],pBr:[5,3,6,4],pC:[0,6,5,6]},
  {title:'반사룡의 비늘',root:48,sc:'hmin',meter:16,lead:'brass',lead2:'strings',arp:'harp',pad:'choir',bass:'sub',drum:'storm',
   A:'0 - 0 1 2 - 4 - 3 2 1 - 0 - - .',B:'4 - 4 5 6 - 7 - 6 5 4 - 3 - - .',pA:[0,5,3,4],pB:[5,3,4,4],pBr:[3,5,1,4],pC:[0,5,3,4]},
  {title:'반대편의 나',root:50,sc:'min',meter:16,lead:'glide',lead2:'bell',arp:'harp',pad:'choir',bass:'sub',drum:'spire',
   A:'4 - 2 4 7 - 6 4 2 - 4 2 0 - - .',B:'7 - 9 7 6 - 4 6 7 - 9 11 9 - - .',pA:[0,5,3,6],pB:[3,6,5,4],pBr:[5,3,1,4],pC:[0,5,3,4]}];
 /* 가락 글자 → [칸별 음, 길이(8분음표 수)] */
 const parse=s=>{const t=s.trim().split(/\s+/),out=[];for(let i=0;i<t.length;i++){if(t[i]==='.'||t[i]==='-'){out.push(null);continue}let n=1;while(t[i+n]==='-')n++;out.push([+t[i],n])}return out};
 /* 거울 가락: 끝에서부터 거꾸로 (음 길이는 그대로) */
 const retro=a=>{const n=a.length,o=Array(n).fill(null);a.forEach((x,i)=>{if(x){const j=n-i-x[1];if(j>=0)o[j]=x}});return o};
 /* 뒤집힌 가락: 첫 음을 축으로 위아래를 뒤집음 */
 const inv=a=>{const f=(a.find(x=>x)||[0])[0];return a.map(x=>x?[2*f-x[0],x[1]]:null)};
 for(const m of M7){m.a=parse(m.A);m.b=parse(m.B);m.ra=retro(m.a);m.rb=retro(m.b);m.ia=inv(m.a);m.S=SCL[m.sc]}
 const nt=(m,d)=>{const L=7,i=((d%L)+L)%L;return m.root+m.S[i]+12*Math.floor(d/L)};
 /* 드럼: 16칸(또는 12칸) 마디 안의 자리 */
 const DR={
  light:{k:[0,8],s:[4,12],h:[2,6,10,14],sh:2},skip:{k:[0,6,10],s:[4,12],h:[0,2,4,6,8,10,12,14],sh:2},
  march:{k:[0,8],s:[4,12,14,15],h:[0,2,4,6,8,10,12,14],sh:4},tick:{k:[0,8],s:[12],tk:[0,2,4,6,8,10,12,14],h:[4,12],sh:4},waltz:{k:[0],s:[4,8],h:[2,6,10],sh:2},
  spark:{k:[0,7,10],s:[4,12],h:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],sh:2},falcon:{k:[0,3,8,11],s:[4,12],t:[14],h:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],sh:2},
  storm:{k:[0,8],t:[0,6,10],s:[4,12],h:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],sh:4},spire:{k:[0,8,10],s:[4,12],tim:[0],h:[0,2,4,6,8,10,12,14],sh:2}};
 /* 곡 구성 비율 (합 1). 절정 C는 7번째 칸(0부터) */
 const FORM=[['intro',.06],['A',.13],['R',.10],['B',.12],['A2',.10],['bridge',.11],['build',.07],['C',.17],['A3',.08],['outro',.06]],CI=7;
 function form(bars){const f=FORM.map(([n,w])=>[n,Math.max(2,Math.round(bars*w/2)*2)]);const sum=f.reduce((a,x)=>a+x[1],0);f[CI][1]+=bars-sum;return f}
 /* 거꾸로 빨려드는 소리: 높은 잡음이 점점 커지다가 구간 첫 박에 뚝 끊김 */
 let nbuf=null;function swell(at,len,g){if(!audio||!(len>0))return;if(!nbuf){nbuf=audio.createBuffer(1,audio.sampleRate,audio.sampleRate);const d=nbuf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1}
  const s=audio.createBufferSource(),hp=audio.createBiquadFilter(),e=audio.createGain();s.buffer=nbuf;s.loop=true;hp.type='highpass';hp.frequency.setValueAtTime(5200,at);hp.frequency.exponentialRampToValueAtTime(1400,at+len);
  e.gain.setValueAtTime(.0001,at);e.gain.exponentialRampToValueAtTime(g,at+len-.01);e.gain.linearRampToValueAtTime(.0001,at+len);s.connect(hp);hp.connect(e);vOut(e,.6);s.start(at);s.stop(at+len+.05)}
 const note=(kind,p,len,g,at)=>voice(kind,p,len,g,at);
 /* 악기 크기 (6장 곡과 비슷한 음량이 되도록 맞춤) */
 const GAIN={flute:.15,glide:.085,pluck:.13,brass:.075,harpsi:.11,strings:.095,choir:.11,organ:.065,harp:.09,bell:.085,pizz:.13,sub:.15};
 const BOX=.07;/* 오르골(높은 종소리) 크기 */

 function s7Music(n,delay,S){if(!audio||!Number.isFinite(delay))return;musVol(S.vol);const k=S.s7Mix,m=M7[k],q=S.ms/4000,origin=audio.currentTime+delay,me=m.meter,bars=S.s7Bars,F=S.s7Form,total=bars*me,act3=k>=7;
  if(n<0){perc('tick',origin,.6);return}
  for(let j=n*2;j<n*2+2;j++){if(RPM.routing&&j>=total)continue;const jj=j%total,bar=Math.floor(jj/me),s=jj%me,at=origin+(j-n*2)*q;
   let b=bar,si=0;for(;si<F.length;si++){if(b<F[si][1])break;b-=F[si][1]}if(si>=F.length)si=F.length-1;const sec=F[si],name=sec[0],L=sec[1],next=(F[si+1]||F[0])[0],last=b>=L-2&&name==='outro',left=(total-jj)*q;
   const prog=name==='B'||name==='A3'?m.pB:name==='bridge'||name==='build'?m.pBr:name==='C'?m.pC:m.pA,d=last?0:prog[Math.floor(b)%prog.length],fade=name==='outro'?Math.max(.25,1-b/L):name==='intro'?Math.min(1,.4+b/L):1;
   const E=(kind,p,len,g,off)=>{off=off||0;if(left-off<.4)return;note(kind,p,Math.min(len,left-off-.3),g*fade,at+off)};
   const half=me/2,box=name==='intro'||name==='bridge'||name==='outro';
   /* 거꾸로 빨려드는 소리: 다음 구간이 시작되기 한 마디 전부터 */if(s===0&&b===L-1&&(next==='R'||next==='A2'||next==='C'||next==='A'))swell(at,q*me,next==='C'?.09:.05);
   /* 시곗바늘: 오르골 구간은 똑딱, 나머지는 마디 첫 박에만 */if(box){if(s%4===0)perc(s%8===0?'tick':'tock',at,.32)}else if(s===0&&name!=='C')perc('tick',at,.2);
   /* 깔개(현악·합창·오르간) */if(s===0&&name!=='build'){const pk=name==='bridge'?'choir':m.pad,gg=GAIN[pk]*(name==='C'?1.1:name==='A'||name==='B'||name==='R'?.7:1);for(const v of [0,2,4])E(pk,nt(m,d+v)+(pk==='choir'?0:-12),q*me*.95,gg*.55)}
   /* 아르페지오: 올라갔다 내려오는 거울 모양 (마무리에서는 거꾸로 내려옴) */{const fast=name==='build'||name==='C',step=fast?1:2;if(!box&&s%step===0){const pat=[0,2,4,7,9,7,4,2],i=(s/step)%8,oct=name==='C'?12:0;E(m.arp,nt(m,d+pat[i])+oct,q*3,(GAIN[m.arp]||.09)*(fast?.7:.85))}}
   /* 오르골: 주제를 끝에서부터 거꾸로, 아주 높게 */if(box&&!last){const mot=name==='bridge'?m.rb:m.ra,pos=(b%2)*me+s;if(pos%2===0){const tok=mot[(pos/2)%mot.length];if(tok&&!(name==='intro'&&b<1)){E('bell',nt(m,tok[0])+24,q*2*tok[1]*.9,BOX*(name==='bridge'?1.1:.9));E('harp',nt(m,tok[0])+12,q*2*tok[1]*.9,GAIN.harp*.45)}}}
   /* 베이스 */if(name!=='intro'&&name!=='bridge'&&!last){const bs=me===12?[0,6]:name==='C'||act3?[0,6,8,14]:[0,8];if(bs.includes(s))E(m.bass,nt(m,d)-24+(s===6||s===14?12:0),q*(m.bass==='sub'?6:2),GAIN[m.bass])}
   /* 드럼 */{const D=DR[m.drum],lv=name==='A'||name==='B'||name==='A3'||name==='R'?1:name==='A2'?2:name==='C'?3:0;
    if(lv){if(D.k.includes(s))chipDrum('kick',at,.75);if(D.s.includes(s))chipDrum('snare',at,(s===14||s===15?.25:.55)*(lv>1?1:.8));if(lv>=2&&D.h.includes(s))chipDrum('hat',at,s%4===0?.22:.13);if(s%D.sh===0)perc('shaker',at,lv>1?.6:.45);
     if(D.t&&D.t.includes(s)&&lv>=2)perc('taiko',at,act3?.7:.45);if(D.tk&&D.tk.includes(s))perc(s%4===0?'tock':'tick',at,.35);if(D.tim&&D.tim.includes(s)&&b%2===0)perc('timp',at,.6,nt(m,d)<60?55:73);
     if(lv===3&&s===0&&b%4===0)chipDrum('crash',at,.4);if(b%4===3&&s>=me-3&&lv>=2)perc('tom',at,.4,[120,150,180][s-(me-3)])}
    if(name==='build'){const pr=(b+s/me)/L;if(s%(pr>.5?1:2)===0)chipDrum('snare',at,.08+.4*pr);if(s===0)chipDrum('kick',at,.5)}
    if(name==='bridge'&&s===0&&b%2===0)perc('timp',at,.25,55)}
   /* 가락 */{let mot=null,kind=m.lead,g=GAIN[m.lead]||.1,oct=12,tr=0,echo=false,duet=false;
    if(name==='A'||name==='A2'){mot=m.a;echo=name==='A2'}else if(name==='R'){mot=m.ra;kind=m.lead2;g=GAIN[kind]||.1;echo=true}else if(name==='B'||name==='A3'){mot=m.b;if(name==='A3'){kind=m.lead2;g=GAIN[kind]||.1}}else if(name==='C'){mot=m.a;echo=true;duet=true}
    if(mot){const pos=(b%2)*me+s;if(pos%2===0){const tok=mot[(pos/2)%mot.length];if(tok){let [v,len]=tok;const ph=Math.floor(b/2)%4;if(ph===1)tr=1;if(ph===3&&pos>=me&&name!=='R'){v=pos>=me+half?0:v}
      if(name==='A2'&&ph===2)oct=24;const p=nt(m,v+tr)+oct,dur=q*2*len*.95;E(kind,p,dur,g);
      /* 메아리: 한 박자 뒤 종소리로 */if(echo)E('bell',p+12,Math.min(dur,q*3),GAIN.bell*.4,q*4);
      /* 거울 이중주: 위아래로 뒤집은 가락을 함께 */if(duet){const iv=m.ia[(pos/2)%m.ia.length];if(iv)E(m.lead2,nt(m,iv[0]+tr)+oct-(m.lead2==='bell'?0:12),dur,(GAIN[m.lead2]||.08)*.75);if(act3)E('brass',nt(m,v+tr)+oct-12,dur,.06)}}}}}
   /* 마무리: 마지막 화음 + 시곗바늘이 앞으로 한 번 */if(last&&b===L-2&&s===0){for(const v of [0,2,4,7])E(m.pad==='choir'?'strings':m.pad,nt(m,v),Math.min(left-.4,q*me*2),.07);E('bell',nt(m,7)+24,q*10,.08);E(m.bass,m.root-24,q*me*2,.12)}
   if(last&&b===L-1&&s===me-4)perc('clank',at,.3,880)
  }}

 /* 노래 만들기: 7장 보스면 3분 곡 정보를 붙임 */
 {const base=c3MakeSong;c3MakeSong=function(art,bi){const S=base.apply(this,arguments);try{const k=L7.findIndex(b=>b.art===art);if(k<0)return S;const m=M7[k],barSec=S.ms/1000*(m.meter/4),bars=Math.max(24,Math.round(180/barSec/2)*2);
  S.s7Mix=k;S.s7Bars=bars;S.s7Form=form(bars);S.s7Dur=bars*barSec;S.vol=.31;S.root=m.root;S.scale=m.S;S.title=m.title+' · REVERSE';S.musicBpm=Math.round(S.bpm)}catch(e){console.error('v51 song',e)}return S}}
 {const base=playSlot;playSlot=function(n,delay,S){if(S&&S.s7Mix!=null){try{s7Music(n,delay,S)}catch(e){console.error('v51 music',e)}return}return base.apply(this,arguments)}}
 {const base=rpMusLoad;rpMusLoad=function(){const ok=base.apply(this,arguments);try{if(ok&&RPM.S&&RPM.S.s7Mix!=null){RPM.duration=RPM.S.s7Dur;RPM.loopOnly=false}}catch(e){}return ok}}
 /* 곡 이름: 러시 화면 · 결과 등에 쓰이는 C3MUS 제목 */
 try{L7.forEach((b,k)=>{const C=C3MUS[b.art];if(C){C.title=M7[k].title;C.tag='거울 세계의 노래 · 3분'}})}catch(e){}
 window.S7MUS=M7;
}catch(e){console.error('v51 ch7 music',e)}})();
