/* ================= 챕터 4·5 로비 배경 + 명예의 전당 다섯 번째 별자리(종자리) ================= */
/* --- 로비 배경 --- */
LB_THEMES.push(['c4','🌌','일식의 밤하늘','CHAPTER 4 · ECLIPSE'],['c5','🌊','종소리 없는 바다','CHAPTER 5 · ABYSS']);
LV_COL.c4=['#c8a0ff','#ffd98a','#8ab8ff','#ff9ad5'];LV_COL.c5=['#7ef0ff','#ffd06a','#a8ffe9','#ff8a6a'];
try{if(typeof LP_ALB!=='undefined'){LP_ALB.c4=LP_ALB.c4||Object.assign({},LP_ALB.c3||LP_ALB.c1,{t:'ECLIPSE'});LP_ALB.c5=LP_ALB.c5||Object.assign({},LP_ALB.c3||LP_ALB.c1,{t:'ABYSS'})}}catch(e){}
try{if(typeof LW_P!=='undefined'){LW_P.c4=LW_P.c4||LW_P.c3||LW_P.c1;LW_P.c5=LW_P.c5||LW_P.c3||LW_P.c1}}catch(e){}
function lbLocked(th){if(th==='auto'||th==='c1')return false;if(th==='c4')return !(typeof s4Unlocked==='function'&&s4Unlocked());if(th==='c5')return !(typeof s5Unlocked==='function'&&s5Unlocked());return !ch1Cleared()}
lbTheme=function(){let v='auto';try{v=saveData.lobbyBg||'auto'}catch(e){}if(v==='auto'){const s5=(typeof s5Save==='function'?s5Save().ci:0)||0,s4=((saveData.ch4||{}).ci)||0,s3=(saveData.ch3||{}).ci||0;v=s5>0&&!lbLocked('c5')?'c5':s4>0&&!lbLocked('c4')?'c4':s3>0?'c3':(saveData.chapter||0)>=10?'c2':'c1'}if(lbLocked(v))v='c1';return v};
lbCv=function(th){return $(th==='c2'?'titleCv2':th==='c3'?'titleCv3':th==='c4'?'titleCv4':th==='c5'?'titleCv5':'titleCv')};
/* 로비 무대 위 장식: 챕터 4는 별똥별 · 챕터 5는 떠오르는 기포와 물빛 */
{const _ld=lvDraw;lvDraw=function(now){const r=_ld.apply(this,arguments);try{const th=lbTheme();if(th!=='c4'&&th!=='c5')return r;const cv=$('lvCv'),c=cv.getContext('2d'),w=cv.width,h=cv.height,t=now/1000;c.save();c.setTransform(1,0,0,1,0,0);
 if(th==='c5'){c.globalCompositeOperation='lighter';for(let i=0;i<5;i++){const x=w*(.1+i*.2)+Math.sin(t*.4+i)*w*.04;c.globalAlpha=.05+.03*Math.sin(t*.8+i);c.fillStyle='#7ef0ff';c.beginPath();c.moveTo(x,0);c.lineTo(x+w*.03,0);c.lineTo(x+w*.12,h);c.lineTo(x+w*.04,h);c.fill()}c.globalCompositeOperation='source-over';
  c.strokeStyle='#cfefff';for(let i=0;i<40;i++){const q=(t*.08+i*.137)%1,x=(i*97.3%1)*w+Math.sin(t*1.5+i)*8,y=h-q*h*1.1,rr=(1+(i%4))*h/540;c.globalAlpha=.45*(1-q);c.lineWidth=Math.max(1,h/540);c.beginPath();c.arc(x,y,rr*2,0,TAU);c.stroke()}
  c.globalAlpha=.08;c.fillStyle='#04304a';c.fillRect(0,0,w,h)}
 else{for(let i=0;i<4;i++){const q=((t*.25)+i*.27)%1,x=w*(.2+((i*.37)%1)*.8)-q*w*.35,y=h*(.05+i*.06)+q*h*.3;c.globalAlpha=Math.sin(q*Math.PI)*.8;for(let j=0;j<14;j++){c.fillStyle=j?'#c8a0ff':'#ffffff';c.globalAlpha=Math.sin(q*Math.PI)*.8*(1-j/14);c.fillRect(x+j*w*.004,y-j*h*.0025,Math.max(2,w/480),Math.max(2,w/480))}}
  c.globalAlpha=.06;c.fillStyle='#2a1050';c.fillRect(0,0,w,h)}
 c.restore()}catch(e){}return r}}
/* --- 명예의 전당: 다섯 번째 별자리 '종자리' --- */
HF_CON.push({name:'종자리',en:'THE BELL',col:'#7ef0ff',pts:[[.5,.04],[.36,.2],[.64,.2],[.28,.46],[.72,.46],[.16,.74],[.84,.74],[.5,.6],[.38,.9],[.62,.9]],edges:[[0,1],[0,2],[1,3],[2,4],[3,5],[4,6],[5,8],[8,9],[9,6],[7,8],[7,9],[3,7],[4,7]]});
HF_W.push([1080,4]);
{const _hd=hfData;hfData=function(){const out=_hd.apply(this,arguments);try{if(typeof S5==='undefined'||out.length<40)return out;const o='PSABC',sealed=!s5Unlocked(),sv=s5Save().best||{},r=saveData.s5rush||{};for(let k=0;k<10;k++){const b=S5[k];let rk=null,per={};for(const [d] of HF_DIFF){const v=r[k+'|'+d];per[d]=v||null;if(v&&(rk===null||o.indexOf(v)<o.indexOf(rk)))rk=v}const st=sv[k]||null;if(st&&(rk===null||o.indexOf(st)<o.indexOf(rk)))rk=st;
 out.push({ch:4,k,art:b.art,rk:sealed?null:rk,per:sealed?{}:per,name:b.name,en:b.en,c:b.c,key:'a'+k,epi:b.title,story:!!st,sealed})}}catch(e){console.error('hf5',e)}return out}}
HF_BADGE=function(){try{const D=hfData();const n=D.length>40&&!D[40].sealed?50:D.length>30&&!D[30].sealed?40:30;return D.filter(x=>x.rk).length+'/'+n}catch(e){return ''}};
/* 로비 LED 화면 속 장면: 챕터 4 = 일식 하늘 타이틀, 챕터 5 = 지금 수문의 바다와 그 보스 */
function c5LobbyTitle(now){const cv=$('titleCv5');if(!cv)return;const c=cv.getContext('2d'),t=now/1000,k=Math.min(9,s5Save().ci||0),b=S5[k];c.imageSmoothingEnabled=false;s5Backdrop(c,k,t,480,190);
 c.save();c.globalCompositeOperation='lighter';for(let i=0;i<4;i++){const x=60+i*120+Math.sin(t*.4+i)*20;c.globalAlpha=.06;c.fillStyle='#a8f0ff';c.beginPath();c.moveTo(x,0);c.lineTo(x+16,0);c.lineTo(x+60,190);c.lineTo(x+20,190);c.fill()}c.restore();
 c.globalAlpha=1;const gg=c.createRadialGradient(330,120,4,330,120,90);gg.addColorStop(0,b.c+'55');gg.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gg;c.fillRect(230,20,200,170);c3ArtOn(c,b.art,330,184+Math.sin(t*1.6)*2,now,6.2,{pulse:.15});c.strokeStyle='#cfefff';for(let i=0;i<16;i++){const q=(t*.15+i*.31)%1;c.globalAlpha=.5*(1-q);c.beginPath();c.arc((i*61)%480+Math.sin(t+i)*4,190-q*190,1+(i%3),0,TAU);c.stroke()}c.globalAlpha=1}
{const _mt=menuTick;menuTick=function(now){try{if(GM.scr==='main'&&mode==='menu'){const th=lbTheme();if(th==='c4'&&typeof s4Title==='function')s4Title(now);else if(th==='c5')c5LobbyTitle(now)}}catch(e){}return _mt.apply(this,arguments)}}

/* ================= 챕터 5 음악 임팩트 레이어 =================
   기존 편곡은 그대로 두고 위에 덧입힘: 섹션 시작 '임팩트 히트'(서브 드롭+크래시) · 후렴 4비트 킥과 박수 · 파워 스탭 · 빌드업 라이저와 스네어 롤 · 서브 베이스 펌프 */
const C5IMP={vol:.21};
{const base=c3MakeSong;c3MakeSong=function(){const S=base.apply(this,arguments);try{if(S&&S.s5Mix27!=null)S.vol=C5IMP.vol}catch(e){}return S}}
function c5Layer(n,delay,S){if(!audio||!Number.isFinite(delay)||n<0)return;const k=S.s5Mix27,m=S5M27[k],q=180/m.steps,half=S.ms/2000,start=n*half,end=start+half,origin=audio.currentTime+delay,M=m.meter,F=S5FORM30[k];
 for(let j=Math.ceil(start/q-1e-7);j<Math.ceil(end/q-1e-7);j++){if(RPM.routing&&j>=m.steps)continue;const cyc=j%m.steps,bar=Math.floor(cyc/M),s=cyc%M,remaining=180-cyc*q;if(remaining<1.2)continue;
  let b=bar,idx=0,sec=F[0];for(let i=0;i<F.length;i++){if(b<F[i][1]){sec=F[i];idx=i;break}b-=F[i][1]}const name=sec[0],len=sec[1],next=(F[idx+1]||['',0])[0],at=origin+j*q-start+(m.swing&&s%4===2?q*m.swing:0);
  const hook=['hook','return','final'].includes(name),build=name==='pre'||name==='build',quiet=name==='middle'||name==='solo',out=name==='coda',open=name==='opening';
  const prog=quiet?m.bridgeP:name==='reply'?m.answerP:m.p,d=out?0:prog[Math.floor(b/2)%prog.length],root=noteOf(S,d),beat=Math.max(1,Math.round(M/4)),down=s%beat===0;
  const nt=(kind,p,l,g)=>{l=Math.min(l,remaining-.8);if(l<=0)return;if(kind==='pulse'||kind==='triangle')chipNote(kind,p,l,g,at,{duty:.25,sus:.5});else voice(kind,p,l,g,at)};
  /* 1) 섹션 첫 박: 임팩트 히트 */if(b===0&&s===0&&(hook||open||name==='verse'||name==='reply')){chipDrum('crash',at,hook?.7:.45);chipDrum('kick',at,1);nt('sub',S.root-24,q*M*.9,hook?.12:.08);if(hook)for(const v of [0,7,12])nt('dist',S.root+v,q*beat*2,.028)}
  /* 2) 후렴: 4비트 킥 · 박수 · 오픈하이햇 · 서브 펌프 · 파워 스탭 */if(hook){if(down)chipDrum('kick',at,.75);if(m.sn.includes(s)){chipDrum('snare',at,.45);chipDrum('hat',at+.012,.25)}if(s%beat===Math.floor(beat/2))chipDrum('ohat',at,.5);
   if(down)nt('sub',root-24,q*beat*.8,.06);if(s===0||(b%2===1&&s===beat*2))for(const v of [0,7])nt('dist',root+v,q*beat*1.5,.024);if(b%4===3&&s>=M-beat)chipDrum('tom',at,.45+.1*(s%beat))}
  /* 3) 1절·답가: 킥 보강 + 베이스 펌프 */if(name==='verse'||name==='reply'){if(s===0||s===beat*2)chipDrum('kick',at,.55);if(down)nt('sub',root-24,q*beat*.6,.04)}
  /* 4) 빌드업 · 오프닝 끝: 라이저 + 스네어 롤 (다음이 후렴이면 더 크게) */const rise=(build&&b>=len-2)||(open&&b>=6)||(b>=len-1&&['hook','return','final'].includes(next));if(rise&&!hook){const p=((b-(len-2))*M+s)/(2*M);const step=p>.5?1:2;if(s%step===0)chipDrum('snare',at,.12+.4*Math.max(0,p));if(s%2===0)nt('glide',S.root+12+Math.round(Math.max(0,p)*14),q*2,.012+.02*Math.max(0,p));if(b===len-1&&s===M-1)chipDrum('crash',at+q*.5,.2)}
  /* 5) 고요한 구간은 오히려 비워 두고, 끝마디에 '숨'을 넣어 다음 후렴을 돋보이게 */if(quiet&&b===len-1&&s===M-beat)nt('sub',S.root-12,q*beat,.05);
  /* 6) 마지막: 끝맺음 쾅 */if(out&&b===2&&s===0){chipDrum('crash',at,.8);chipDrum('kick',at,1);nt('sub',S.root-24,2.5,.12)}}}
{const base=playSlot;playSlot=function(n,delay,S){const r=base.apply(this,arguments);try{if(S&&S.s5Mix27!=null&&S5NEW30)c5Layer(n,delay,S)}catch(e){}return r}}

/* ================= 챕터 4·5 스토리 흐름: 시작 버튼 = 바로 이야기 시작, 승리 후 자동으로 다음 보스로 ================= */
/* 1) 시작 버튼: 다 깬 챕터는 프롤로그부터 다시, 아니면 이어서 (보스 고르기 창 없이) */
s4Start=function(){if(!s4Unlocked()){gmSfx('no');return}const s=s4Sv();gmSfx('ok');if(s.ci>=10){s4Go(0,true);return}const first=!s.pro||s.ci===0;if(!s.pro){s.pro=1;try{saveNow()}catch(e){}}s4Go(s.ci,first)};
{const b=$('btnStory4');if(b)b.onclick=()=>s4Start()}
s5Open=function(k){try{s5Close()}catch(e){}if(!s5Unlocked()){try{gmSfx('no')}catch(e){}return}try{gmSfx('ok')}catch(e){}const ci=s5Save().ci||0;if(ci>=10){s5Save().seen5=0;s5Go(0,true);return}s5Go(ci,ci===0)};
{const b=$('btnStory5');if(b)b.onclick=()=>s5Open()}
/* 2) 승리 → 결과 카드 컷신 → 다음 보스 등장까지 자동으로 이어짐 (결과 창 클릭 없이) */
function cxResultCard(o){return {d:3200,draw(c,T){const g=c.createLinearGradient(0,0,0,SCH);g.addColorStop(0,o.bg0);g.addColorStop(1,o.bg1);c.fillStyle=g;c.fillRect(0,0,SCW,SCH);for(let i=0;i<50;i++){const q=(T*.08+i*.137)%1;c.globalAlpha=.4*Math.sin(q*Math.PI);c.fillStyle=o.col;c.fillRect((i*73)%SCW,SCH-q*SCH,1,1)}c.globalAlpha=1;
 const q=scE(scCl(T/.6));c.globalAlpha=.75*q;c.fillStyle='#000';c.fillRect(0,SCH/2-58,SCW,116);c.globalAlpha=1;c.fillStyle=o.col;c.fillRect(Math.round(SCW/2-q*190),SCH/2-58,Math.round(q*380),1);c.fillRect(Math.round(SCW/2-q*190),SCH/2+57,Math.round(q*380),1);
 scTxt(c,o.tag,SCW/2,SCH/2-38,9,o.col,q,'center',800);scTxt(c,o.name+' 격파!',SCW/2,SCH/2-14,18,'#ffffff',q);const rq=scE(scCl((T-.5)/.4));scTxt(c,o.rank==='P'?'★ PERFECT ★':'RANK '+o.rank,SCW/2,SCH/2+12,o.rank==='P'?18:16,o.rank==='P'?'#fff6cf':'#ffd166',rq);
 scTxt(c,'🪙 +'+o.coins+'   ·   '+o.prog,SCW/2,SCH/2+30,9,'#e8e8f0',rq,'center',700);if(o.next)scTxt(c,'다음  ▶  '+o.next,SCW/2,SCH/2+48,10,o.col,scCl((T-1.2)*2),'center',800)}}}
const CXF={k4:null,k5:null};
{const _e=s5End;s5End=function(won){if(G&&G.state!=='result'&&won&&!G.s5Practice&&!G.s5Rush&&G.s5<9)CXF.k5={k:G.s5,hits:G.hits};else CXF.k5=null;return _e.apply(this,arguments)}}
{const _e=s4End;s4End=function(won){if(G&&G.state!=='result'&&won&&G.s4!=null&&G.s4<9)CXF.k4={k:G.s4,hits:G.hits};else CXF.k4=null;return _e.apply(this,arguments)}}
{const _so=showOverlay;showOverlay=function(tag,title,text,btns){try{
 if(CXF.k5&&typeof tag==='string'&&tag.indexOf('CHAPTER 5')===0&&/신호 해방/.test(title||'')){const {k,hits}=CXF.k5;CXF.k5=null;const rank=hits===0?'P':hits<=2?'S':hits<=4?'A':hits<=7?'B':'C',coins=210+k*45+(rank==='P'?200:rank==='S'?100:40);
  $('overlay').hidden=true;scPlay([cxResultCard({tag:'CHAPTER 5 · ABYSS  ·  수문 '+(k+1)+' / 10',name:S5[k].name,rank,coins,prog:'해방한 수문 '+(s5Save().ci||0)+'/10',next:S5[k+1].name,col:S5[k].c,bg0:'#04121c',bg1:'#0a2a38'})],()=>s5Go(k+1,false));return}
 if(CXF.k4&&typeof tag==='string'&&/^ECLIPSE · \d\d CLEAR/.test(tag)){const {k,hits}=CXF.k4;CXF.k4=null;const rank=hits===0?'P':hits<=2?'S':hits<=4?'A':hits<=7?'B':'C',coins=200+k*60+(rank==='P'?300:rank==='S'?150:60),L=window.__S4;
  $('overlay').hidden=true;scPlay([cxResultCard({tag:'CHAPTER 4 · ECLIPSE  ·  별 '+(k+1)+' / 10',name:L[k].name,rank,coins,prog:'되찾은 별 '+Math.min(10,s4Sv().ci||0)+'/10',next:L[k+1].name,col:L[k].c,bg0:'#03030c',bg1:'#1a1030'})],()=>s4Go(k+1,false));return}
 }catch(e){console.error('cxflow',e)}return _so.apply(this,arguments)}}

