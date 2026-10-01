/* ================= 보스별 웅장한 음악 엔진 v2 =================
   보스마다 악기 편성 · 드럼 킷 · 리듬(행진/셔플/하프타임/왈츠/갤럽/브레이크/부족) · 편곡 형식 · 시그니처 소리가 모두 다르다. */
let mBus=null,mSend=null,mBusCtx=null;
function musBus(){if(!audio)return null;if(mBus&&mBusCtx===audio)return mBus;const comp=audio.createDynamicsCompressor();comp.threshold.value=-14;comp.knee.value=10;comp.ratio.value=5;comp.attack.value=.003;comp.release.value=.2;const g=audio.createGain();g.gain.value=1;g.connect(comp);comp.connect(audio.destination);mBus=g;mBusCtx=audio;mSend=audio.createGain();mSend.gain.value=1;if(musicReverb)mSend.connect(musicReverb);return g}
function musVol(v){musBus();if(mBus&&Math.abs(mBus.gain.value-v)>.001){mBus.gain.value=v;mSend.gain.value=v}}
function vOut(node,rev){const b=musBus();node.connect(b||audio.destination);if(rev&&mSend){const s=audio.createGain();s.gain.value=rev;node.connect(s);s.connect(mSend)}}
function osc(type,f,at,end,det){const o=audio.createOscillator();o.type=type;o.frequency.setValueAtTime(f,at);if(det)o.detune.value=det;o.start(at);o.stop(end+.05);return o}
function envG(at,a,hold,rel,peak){const g=audio.createGain();g.gain.setValueAtTime(.0001,at);g.gain.linearRampToValueAtTime(peak,at+a);g.gain.setValueAtTime(peak,at+a+hold);g.gain.exponentialRampToValueAtTime(.0001,at+a+hold+rel);return g}
/* ---- 악기 ---- */
function voice(kind,midi,len,gain,at){if(!audio||!Number.isFinite(at)||!Number.isFinite(midi))return;const f=mtof(midi),end=at+len+.6;
 switch(kind){
 case 'brass':case 'strings':{const sk=kind==='strings',mix=audio.createGain(),env=audio.createGain(),lp=audio.createBiquadFilter(),attack=Math.min(sk?.24:.12,len*.28);mix.gain.value=.28;lp.type='lowpass';lp.frequency.setValueAtTime(sk?650:520,at);lp.frequency.linearRampToValueAtTime(sk?2300:1850,at+attack);env.gain.setValueAtTime(.0001,at);env.gain.linearRampToValueAtTime(gain,at+attack);env.gain.setValueAtTime(gain*.78,at+Math.max(attack,len*.58));env.gain.exponentialRampToValueAtTime(.0001,at+len);mix.connect(env);env.connect(lp);vOut(lp,.8);for(const [mul,det] of [[1,-5],[1,1],[1.002,6]]){const o=osc(sk?'triangle':(det===1?'sawtooth':'triangle'),f*mul,at,at+len,det);o.connect(mix)}return}
 case 'choir':{const g=envG(at,Math.min(.35,len*.4),len*.4,len*.5+.3,gain),bp1=audio.createBiquadFilter(),bp2=audio.createBiquadFilter(),mix=audio.createGain();bp1.type='bandpass';bp1.frequency.value=780;bp1.Q.value=4;bp2.type='bandpass';bp2.frequency.value=1180;bp2.Q.value=5;mix.gain.value=1.6;
  const lfo=audio.createOscillator(),lg=audio.createGain();lfo.frequency.value=5.2;lg.gain.value=6;lfo.connect(lg);lfo.start(at);lfo.stop(end);
  for(const d of [-9,-3,4,10]){const o=osc('sawtooth',f,at,end,d);lg.connect(o.detune);o.connect(bp1);o.connect(bp2)}bp1.connect(mix);bp2.connect(mix);mix.connect(g);vOut(g,.5);return}
 case 'organ':{const g=envG(at,.02,len*.7,.25,gain);for(const [h,a] of [[1,1],[2,.55],[3,.35],[4,.22],[6,.12],[8,.08]]){const o=osc('sine',f*h,at,end),gg=audio.createGain();gg.gain.value=a*.4;o.connect(gg);gg.connect(g)}vOut(g,.35);return}
 case 'bell':{const g=envG(at,.005,.02,len+1.2,gain),m=osc('sine',f*3.5,at,end+1.2),mg=audio.createGain();mg.gain.setValueAtTime(f*2.2,at);mg.gain.exponentialRampToValueAtTime(f*.1,at+len+1);m.connect(mg);const c=osc('sine',f,at,end+1.2);mg.connect(c.frequency);c.connect(g);vOut(g,.45);return}
 case 'harp':{const g=envG(at,.004,.01,Math.min(1.2,len+.5),gain),lp=audio.createBiquadFilter();lp.type='lowpass';lp.frequency.setValueAtTime(4200,at);lp.frequency.exponentialRampToValueAtTime(900,at+.4);const o=osc('sawtooth',f,at,end),o2=osc('square',f*2,at,end);const g2=audio.createGain();g2.gain.value=.25;o2.connect(g2);g2.connect(lp);o.connect(lp);lp.connect(g);vOut(g,.3);return}
 case 'pluck':{const g=envG(at,.003,.01,Math.min(.5,len+.15),gain),lp=audio.createBiquadFilter();lp.type='lowpass';lp.Q.value=6;lp.frequency.setValueAtTime(3200,at);lp.frequency.exponentialRampToValueAtTime(300,at+.25);osc('sawtooth',f,at,end).connect(lp);lp.connect(g);vOut(g,.15);return}
 case 'chip':{const g=envG(at,.003,len*.6,.06,gain*.8);osc('square',f,at,end).connect(g);vOut(g,.1);return}
 case 'lead':{const g=envG(at,.015,len*.7,.18,gain),lp=audio.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2600;lp.Q.value=3;const lfo=audio.createOscillator(),lg=audio.createGain();lfo.frequency.value=5.5;lg.gain.value=12;lfo.connect(lg);lfo.start(at+.12);lfo.stop(end);for(const d of [-8,8]){const o=osc('sawtooth',f,at,end,d);lg.connect(o.detune);o.connect(lp)}lp.connect(g);vOut(g,.3);return}
 case 'dist':{const g=envG(at,.008,len*.8,.12,gain),ws=audio.createWaveShaper(),cv=new Float32Array(256);for(let i=0;i<256;i++){const x=i/128-1;cv[i]=Math.tanh(x*6)}ws.curve=cv;const lp=audio.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2400;for(const [mul,d] of [[1,-6],[1.4983,4],[.5,0]]){const o=osc('sawtooth',f*mul,at,end,d);o.connect(ws)}ws.connect(lp);const pre=audio.createGain();pre.gain.value=.35;lp.connect(pre);pre.connect(g);vOut(g,.12);return}
 case 'flute':{const g=envG(at,.06,len*.6,.2,gain),o=osc('sine',f,at,end),o2=osc('triangle',f*2,at,end),g2=audio.createGain();g2.gain.value=.15;o2.connect(g2);g2.connect(g);const lfo=audio.createOscillator(),lg=audio.createGain();lfo.frequency.value=5;lg.gain.value=9;lfo.connect(lg);lg.connect(o.detune);lfo.start(at+.1);lfo.stop(end);o.connect(g);vOut(g,.4);nz(.08,gain*.12,at,5000);return}
 case 'sub':{const g=envG(at,.01,len*.6,.15,gain);osc('sine',f,at,end).connect(g);const o2=osc('triangle',f,at,end),g2=audio.createGain();g2.gain.value=.3;o2.connect(g2);g2.connect(g);vOut(g,0);return}
 case 'reese':{const g=envG(at,.01,len*.8,.1,gain),lp=audio.createBiquadFilter();lp.type='lowpass';lp.Q.value=5;lp.frequency.setValueAtTime(260,at);lp.frequency.linearRampToValueAtTime(900,at+len*.5);lp.frequency.linearRampToValueAtTime(300,at+len);for(const d of [-18,18])osc('sawtooth',f,at,end,d).connect(lp);lp.connect(g);vOut(g,0);return}
 case 'pizz':{const g=envG(at,.003,.02,.28,gain),lp=audio.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1400;osc('triangle',f,at,end).connect(lp);osc('sawtooth',f,at,end,3).connect(lp);lp.connect(g);vOut(g,.2);return}
 case 'buzz':{const g=envG(at,.01,len*.8,.08,gain),lp=audio.createBiquadFilter();lp.type='bandpass';lp.frequency.value=1500;lp.Q.value=2;const o=osc('sawtooth',f,at,end),lfo=audio.createOscillator(),lg=audio.createGain();lfo.frequency.value=38;lg.gain.value=40;lfo.connect(lg);lg.connect(o.detune);lfo.start(at);lfo.stop(end);o.connect(lp);lp.connect(g);vOut(g,.1);return}
 case 'glide':{const g=envG(at,.2,len*.5,.6,gain),o=osc('sine',f*.94,at,end);o.frequency.exponentialRampToValueAtTime(f,at+len*.4);const o2=osc('triangle',f*2.003,at,end),g2=audio.createGain();g2.gain.value=.2;o2.connect(g2);g2.connect(g);o.connect(g);vOut(g,.6);return}
 case 'harpsi':{const g=envG(at,.002,.01,.45,gain),hp=audio.createBiquadFilter();hp.type='highpass';hp.frequency.value=300;osc('sawtooth',f,at,end).connect(hp);osc('square',f*2,at,end,4).connect(hp);hp.connect(g);vOut(g,.3);return}
 }}
/* ---- 타악기 ---- */
function perc(kind,at,gain,p){if(!audio||!Number.isFinite(at))return;gain=gain||1;const G2=(a,rel,pk)=>envG(at,a,0,rel,pk);
 switch(kind){
 case 'kick':{const g=G2(.002,.28,.9*gain),o=osc('sine',150,at,at+.4);o.frequency.exponentialRampToValueAtTime(42,at+.18);o.connect(g);vOut(g,0);break}
 case 'kick909':{const g=G2(.002,.35,.95*gain),o=osc('sine',180,at,at+.45);o.frequency.exponentialRampToValueAtTime(48,at+.12);o.connect(g);vOut(g,0);nzB(.02,.35*gain,at,3000,0);break}
 case 'taiko':{const g=G2(.004,.7,1*gain),o=osc('sine',90,at,at+.9);o.frequency.exponentialRampToValueAtTime(52,at+.3);o.connect(g);vOut(g,.35);nzB(.12,.25*gain,at,400,.3);break}
 case 'timp':{const f=p||55,g=G2(.004,1.2,.7*gain),o=osc('sine',f*1.02,at,at+1.4);o.frequency.exponentialRampToValueAtTime(f,at+.1);o.connect(g);const o2=osc('sine',f*1.5,at,at+1),g2=audio.createGain();g2.gain.value=.25;o2.connect(g2);g2.connect(g);vOut(g,.4);break}
 case 'snare':nzB(.16,.32*gain,at,1600,.12);{const g=G2(.002,.09,.22*gain);osc('triangle',200,at,at+.12).connect(g);vOut(g,.1)}break;
 case 'clap':for(let i=0;i<3;i++)nzB(.05,.2*gain,at+i*.012,1200,.15);nzB(.2,.12*gain,at+.03,1500,.25);break;
 case 'roll':for(let i=0;i<4;i++)nzB(.06,(.08+i*.04)*gain,at+i*(p||.05),1800,.1);break;
 case 'hat':nzB(.035,.12*gain,at,8000,0);break;
 case 'ohat':nzB(.22,.1*gain,at,7000,.05);break;
 case 'shaker':nzB(.06,.07*gain,at,6000,0);nzB(.05,.05*gain,at+.03,6500,0);break;
 case 'crash':nzB(1.4,.2*gain,at,3500,.45);break;
 case 'clank':{for(const [m,a] of [[1,1],[2.76,.6],[5.4,.4],[8.9,.25]]){const g=G2(.001,.35,.13*a*gain);osc('square',(p||420)*m,at,at+.5).connect(g);vOut(g,.35)}nzB(.03,.2*gain,at,5000,.2);break}
 case 'anvil':{for(const [m,a] of [[1,1],[2.4,.7],[3.9,.5],[6.1,.3]]){const g=G2(.001,1.1,.12*a*gain);osc('sine',(p||880)*m,at,at+1.3).connect(g);vOut(g,.4)}nzB(.02,.3*gain,at,6000,.2);break}
 case 'tick':{const g=G2(.001,.03,.25*gain);osc('square',p||3200,at,at+.05).connect(g);vOut(g,.2);break}
 case 'tock':{const g=G2(.001,.05,.25*gain);osc('square',p||1400,at,at+.07).connect(g);vOut(g,.2);break}
 case 'wood':{const g=G2(.001,.12,.4*gain),o=osc('sine',p||520,at,at+.2);o.frequency.exponentialRampToValueAtTime((p||520)*.8,at+.1);o.connect(g);vOut(g,.3);break}
 case 'tom':{const g=G2(.002,.35,.6*gain),o=osc('sine',p||130,at,at+.45);o.frequency.exponentialRampToValueAtTime((p||130)*.6,at+.3);o.connect(g);vOut(g,.3);break}
 case 'zap':{const g=G2(.002,.18,.12*gain),o=osc('sawtooth',1800,at,at+.25);o.frequency.exponentialRampToValueAtTime(120,at+.18);o.connect(g);vOut(g,.3);break}
 case 'chime':for(let i=0;i<4;i++)voice('bell',96+[0,4,7,12][i],.2,.03*gain,at+i*.06);break;
 case 'whistle':{const g=envG(at,.05,.6,.3,.08*gain);for(const m of [1,1.26,1.5]){const o=osc('square',(p||660)*m,at,at+1.1);o.frequency.linearRampToValueAtTime((p||660)*m*.97,at+.9);o.connect(g)}const lp=audio.createBiquadFilter();vOut(g,.5);break}
 case 'chug':nzB(.07,.14*gain,at,900,.05);break;
 case 'buzz':voice('buzz',(p||50),.5,.06*gain,at);break;
 case 'bubble':{const g=G2(.002,.12,.18*gain),o=osc('sine',p||600,at,at+.15);o.frequency.exponentialRampToValueAtTime((p||600)*2.2,at+.1);o.connect(g);vOut(g,.4);break}
 case 'croak':{const g=G2(.005,.18,.14*gain),o=osc('square',p||95,at,at+.25);o.frequency.linearRampToValueAtTime((p||95)*.8,at+.18);o.connect(g);vOut(g,.2);break}
 case 'rattle':for(let i=0;i<5;i++)perc('wood',at+i*.025,.4*gain,1100+i*90);break;
 case 'hum':{const g=envG(at,.3,.6,.4,.07*gain);osc('sawtooth',p||55,at,at+1.5).connect(g);const lp=audio.createBiquadFilter();vOut(g,.2);break}
 case 'laser':{const g=G2(.002,.35,.08*gain),o=osc('sawtooth',2400,at,at+.4);o.frequency.exponentialRampToValueAtTime(300,at+.35);o.connect(g);vOut(g,.4);break}
 case 'heart':perc('kick',at,.9*gain);perc('kick',at+.16,.6*gain);break;
 case 'crackle':for(let i=0;i<6;i++)nzB(.015,.12*gain,at+RND()*.3,3000,.1);break;
 }}
function nzB(len,gain,at,hp,rev){if(!audio)return;if(!noiseBuf){noiseBuf=audio.createBuffer(1,audio.sampleRate*.7,audio.sampleRate);const d=noiseBuf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=RND()*2-1}const s=audio.createBufferSource(),f=audio.createBiquadFilter(),g=audio.createGain();s.buffer=noiseBuf;f.type='highpass';f.frequency.value=hp;g.gain.setValueAtTime(gain,at);g.gain.exponentialRampToValueAtTime(.001,at+len);s.connect(f);f.connect(g);vOut(g,rev||0);s.start(at);s.stop(at+Math.min(.69,len+.05))}
/* ---- 리듬(필) ---- */
const FEELS={
 march:{k:[1,0,0,0,1,0,0,0],s:[0,0,1,0,0,0,1,1],h:[1,1,1,1,1,1,1,1],x:'roll'},
 straight:{k:[1,0,1,0,1,0,1,0],s:[0,0,1,0,0,0,1,0],h:[0,1,0,1,0,1,0,1]},
 half:{k:[1,0,0,0,0,0,1,0],s:[0,0,0,0,1,0,0,0],h:[1,0,1,0,1,0,1,0]},
 gallop:{k:[1,0,1,1,1,0,1,1],s:[0,0,1,0,0,0,1,0],h:[1,1,1,1,1,1,1,1]},
 shuffle:{k:[1,0,0,1,1,0,0,0],s:[0,0,1,0,0,0,1,0],h:[1,1,1,1,1,1,1,1],swing:.17},
 waltz:{k:[1,0,0,1,0,0,1,0],s:[0,1,0,0,1,0,0,1],h:[1,0,1,1,0,1,1,0]},
 brk:{k:[1,0,0,1,0,1,0,0],s:[0,0,1,0,0,0,1,0],h:[1,1,1,1,1,1,1,1],dbl:true},
 tribal:{k:[1,0,0,1,0,0,1,0],s:[0,0,0,0,1,0,0,0],h:[1,0,1,1,1,0,1,1]},
 four:{k:[1,0,1,0,1,0,1,0],s:[0,0,1,0,0,0,1,0],h:[0,1,0,1,0,1,0,1],oh:true},
};
/* ---- 보스별 편성 ---- */
const MSTYLE=[
 {feel:'march',kick:'kick',snare:'snare',bass:'pluck',pad:'brass',lead:'chip',arp:null,sig:['clank',2],hat:'hat',tag:'강철 행진'},
 {feel:'four',kick:'kick909',snare:'clap',bass:'reese',pad:'strings',lead:'lead',arp:'pluck',arpPat:'up16',sig:['zap',4],hat:'hat',tag:'전압 일렉트로'},
 {feel:'half',kick:'taiko',snare:'snare',bass:'dist',pad:'organ',lead:'dist',arp:null,sig:['anvil',0],hat:'shaker',tag:'용광로 둠'},
 {feel:'gallop',kick:'kick',snare:'snare',bass:'pizz',pad:'brass',lead:'flute',arp:'pizz',arpPat:'pulse',sig:['whistle',32],hat:'chug',tag:'기관차 질주'},
 {feel:'half',kick:'kick',snare:'clap',bass:'sub',pad:'choir',lead:'bell',arp:'bell',arpPat:'updown',sig:['chime',8],hat:'tick',tag:'빙결 성가'},
 {feel:'brk',kick:'kick909',snare:'snare',bass:'reese',pad:'strings',lead:'buzz',arp:'chip',arpPat:'up16',sig:['buzz',4],hat:'hat',tag:'군집 브레이크'},
 {feel:'shuffle',kick:'kick',snare:'snare',bass:'reese',pad:'brass',lead:'dist',arp:null,sig:['hum',8],hat:'hat',tag:'자력 셔플'},
 {feel:'waltz',kick:'timp',snare:'tock',bass:'harpsi',pad:'organ',lead:'harpsi',arp:'harpsi',arpPat:'broken',sig:['chime',16],hat:'tick',tag:'시계탑 바로크'},
 {feel:'four',kick:'kick909',snare:'clap',bass:'pluck',pad:'strings',lead:'lead',arp:'pluck',arpPat:'up16',sig:['laser',8],hat:'hat',tag:'프리즘 트랜스'},
 {feel:'march',kick:'taiko',snare:'snare',bass:'brass',pad:'choir',lead:'strings',arp:'strings',arpPat:'ostinato',sig:['crash',16],hat:'hat',timp:true,epic:true,tag:'오메가 교향곡'},
 {feel:'tribal',kick:'taiko',snare:'wood',bass:'pizz',pad:'choir',lead:'flute',arp:'harp',arpPat:'broken',sig:['wood',2],hat:'shaker',tag:'뿌리의 북'},
 {feel:'waltz',kick:'kick',snare:'clap',bass:'sub',pad:'strings',lead:'bell',arp:'bell',arpPat:'updown',sig:['bubble',4],hat:'shaker',tag:'포자 몽환 왈츠'},
 {feel:'shuffle',kick:'kick',snare:'snare',bass:'pizz',pad:'organ',lead:'flute',arp:null,sig:['croak',4],hat:'shaker',tag:'늪지 블루스'},
 {feel:'gallop',kick:'kick',snare:'snare',bass:'dist',pad:'choir',lead:'dist',arp:null,sig:['rattle',4],hat:'hat',tag:'백골 메탈'},
 {feel:'waltz',kick:'timp',snare:'snare',bass:'pizz',pad:'strings',lead:'harpsi',arp:'harpsi',arpPat:'broken',sig:['tick',2],hat:'tick',tag:'거미줄 고딕 왈츠'},
 {feel:'brk',kick:'kick909',snare:'snare',bass:'reese',pad:'strings',lead:'buzz',arp:'chip',arpPat:'up16',sig:['buzz',2],hat:'hat',tag:'말벌 드럼앤베이스'},
 {feel:'half',kick:'kick',snare:'clap',bass:'sub',pad:'choir',lead:'bell',arp:'bell',arpPat:'up16',sig:['chime',4],hat:'tick',tag:'수정 공명'},
 {feel:'half',kick:'taiko',snare:'snare',bass:'sub',pad:'choir',lead:'glide',arp:null,sig:['bubble',2],hat:'shaker',tag:'심연의 노래'},
 {feel:'march',kick:'taiko',snare:'snare',bass:'dist',pad:'brass',lead:'dist',arp:null,sig:['crackle',2],hat:'hat',timp:true,tag:'잿빛 전쟁북'},
 {feel:'tribal',kick:'taiko',snare:'snare',bass:'dist',pad:'choir',lead:'strings',arp:'strings',arpPat:'ostinato',sig:['heart',4],hat:'shaker',timp:true,epic:true,tag:'굶주림의 진혼곡'},
];
/* 전투용 편성: 어두운 음계 · 비장한 진행 · 끊임없이 몰아치는 오스티나토 */
const BATTLE=[
 {sc:'min',pr:[0,5,2,6],ost:'stac',bp:'oct',lead:'lead'},
 {sc:'hmin',pr:[0,5,3,4],ost:'synth',bp:'16',lead:'lead'},
 {sc:'phr',pr:[0,1,0,6],ost:'chug',bp:'8',lead:'dist'},
 {sc:'min',pr:[0,6,5,4],ost:'stac',bp:'gal',lead:'brass'},
 {sc:'hmin',pr:[0,5,2,6],ost:'stac',bp:'8',lead:'bell'},
 {sc:'phr',pr:[0,1,6,5],ost:'synth',bp:'16',lead:'buzz'},
 {sc:'min',pr:[0,3,4,4],ost:'chug',bp:'oct',lead:'dist'},
 {sc:'hmin',pr:[0,3,4,4],ost:'harpsi',bp:'8',lead:'harpsi'},
 {sc:'min',pr:[0,5,2,6],ost:'synth',bp:'oct',lead:'lead'},
 {sc:'hmin',pr:[0,5,3,4],ost:'stac',bp:'oct',lead:'strings'},
 {sc:'phr',pr:[0,1,0,6],ost:'taiko',bp:'8',lead:'flute'},
 {sc:'loc',pr:[0,1,4,1],ost:'synth',bp:'8',lead:'bell'},
 {sc:'min',pr:[0,3,0,4],ost:'chug',bp:'oct',lead:'lead'},
 {sc:'phr',pr:[0,1,0,6],ost:'chug',bp:'gal',lead:'dist'},
 {sc:'hmin',pr:[0,5,3,4],ost:'stac',bp:'8',lead:'harpsi'},
 {sc:'min',pr:[0,5,6,4],ost:'synth',bp:'16',lead:'buzz'},
 {sc:'loc',pr:[0,1,4,3],ost:'synth',bp:'8',lead:'bell'},
 {sc:'phr',pr:[0,1,6,5],ost:'stac',bp:'oct',lead:'glide'},
 {sc:'min',pr:[0,5,2,6],ost:'taiko',bp:'8',lead:'dist'},
 {sc:'hmin',pr:[0,5,3,4],ost:'stac',bp:'gal',lead:'strings',chug:true},
];
function makeSong(bi){const B=BOSSES[bi],m=B.track,d=D(),bpm=m.bpm*d.bpm,bt=BATTLE[bi]||BATTLE[0],scale=SC[bt.sc],L=scale.length,st=MSTYLE[bi]||MSTYLE[0],fe=FEELS[st.feel],r=rng(hash('song|'+bi));
 const drum={k:fe.k.slice(),s:fe.s.slice(),h:fe.h.slice()};
 const A=m.lead.map(v=>v<0?-1:Math.min(v,L+2)),Bm=A.map((v,i)=>v<0?(r()<.35?Math.floor(r()*L)+1:-1):v+((i%4===0)?2:(r()<.4?1:0))),Cm=A.map((v,i)=>v<0?(i%2===0?4:-1):v+L);
 return {title:m.title+' · '+st.tag,bpm,ms:60000/bpm,scale,root:Math.min(m.root,47),prog:bt.pr,drum,bass:BP[m.bass],lead:A,motB:Bm,motC:Cm,leadWave:m.wave,bassWave:m.bassWave,dk:DR[(m.groove+2)%DR.length].k,st,fe,bt,bi,vol:(typeof MVOL!=='undefined'&&MVOL[bi])||1}}
const ARP={up16:[0,2,4,7],updown:[0,2,4,2],pulse:[0,0,4,0],broken:[0,4,2,4],ostinato:[0,1,2,1]};
function playSlot(n,delay,S){if(!audio||!S||!Number.isFinite(delay))return;
 if(S.cave||!S.st){return _playSlotCave(n,delay,S)}
 musVol(S.vol||1);
 const st=S.st,fe=S.fe,bt=S.bt,bar=((n%8)+8)%8,m=Math.floor(n/8),mi=((m%4)+4)%4,sec=((Math.floor(m/4)%4)+4)%4,deg=S.prog[mi],half=S.ms/1000/2,q16=half/2;
 let at=audio.currentTime+delay;if(fe.swing&&bar%2===1)at+=S.ms/1000*fe.swing;
 const lv=n<0?0:Math.min(2,G.phase||0),oh=G.exposed,intro=n<0,big=sec===3||lv>=2,root=noteOf(S,deg),fill=mi===3&&bar>=4;
 if(intro){perc(st.kick,at,bar%2===0?.9:.5,mtof(root-24));if(bar%2===1)perc('snare',at,.4);voice(bt.ost==='chug'?'dist':'pluck',root-12,half*.5,.05,at);return}
 /* ---- 드럼: 항상 몰아친다 ---- */
 const Dm=S.drum;
 if(Dm.k[bar]||(lv>=1&&bar%2===0))perc(st.kick,at,oh?.75:1.05,mtof(root-24));
 if(fe.dbl||bt.bp==='gal'||lv>=2){perc(st.kick==='taiko'?'kick':st.kick,at+q16,.55,mtof(root-24))}
 if((bar===2||bar===6)&&!fill)perc(st.snare==='wood'||st.snare==='tock'?'snare':st.snare,at,big?1.2:1);
 if(Dm.s[bar]&&bar!==2&&bar!==6&&!fill)perc(st.snare,at,.7,st.snare==='wood'?420:st.snare==='tock'?1400:undefined);
 if(fill){const toms=[200,170,140,110];perc(bar%2?'snare':'tom',at,.9,toms[bar-4]);perc('snare',at+q16,.7);if(bar===7){perc('tom',at+q16,1,90)}}
 perc(st.hat==='chug'?'chug':st.hat==='tick'?'tick':'hat',at,.8,st.hat==='tick'?3200:undefined);perc(st.hat==='tick'?'tick':'hat',at+q16,.45,st.hat==='tick'?2600:undefined);if(fe.oh&&bar%2===1)perc('ohat',at,.6);
 if(st.timp&&(bar===0||bar===4))perc('timp',at,1,mtof(root-24));
 if(bar===0&&(mi===0||big))perc('crash',at,mi===0?1.1:.7);
 if(G.crash&&bar===0){perc('crash',at,1.3);perc('taiko',at,1.2);G.crash=false}
 /* ---- 시그니처 ---- */
 const [sk,every]=st.sig;if(every&&n%every===0){if(sk==='whistle'){if(n%64===0)perc('whistle',at,1,mtof(root+12))}else if(sk!=='chime'||n%16===0)perc(sk,at,sk==='anvil'?.9:1,sk==='clank'?mtof(root+12):sk==='hum'?mtof(root-24):sk==='bubble'?500+((n*37)%5)*80:sk==='croak'?90:undefined)}
 /* ---- 베이스: 쉬지 않는 8분/16분 ---- */
 const bm=root-24,bv=st.bass==='brass'?'reese':st.bass,bg=bv==='dist'?.08:bv==='sub'?.19:bv==='reese'?.12:bv==='harpsi'?.08:.13;
 if(bt.bp==='16'){voice(bv,bm,q16*.9,bg,at);voice(bv,bar%2?bm+12:bm,q16*.9,bg*.8,at+q16)}
 else if(bt.bp==='gal'){voice(bv,bm,q16*.8,bg,at);voice(bv,bm,q16*.8,bg*.7,at+q16);if(bar%2===1)voice(bv,bm+12,q16*.8,bg*.7,at)}
 else if(bt.bp==='oct'){voice(bv,bar%2?bm+12:bm,half*.85,bg,at)}
 else voice(bv,bm,half*.85,bg,at);
 /* ---- 오스티나토 ---- */
 const tri=[0,2,4],ost=bt.ost;
 if(ost==='stac'){for(let k=0;k<2;k++){const nn=noteOf(S,deg+[0,2,4,2,0,4,2,4][(bar*2+k)%8])+12;voice('pizz',nn,q16*.7,.07,at+k*q16);if(big)voice('pizz',nn+12,q16*.6,.04,at+k*q16)}}
 else if(ost==='chug'||bt.chug){if(bar!==7||sec===3){voice('dist',root-12,q16*.9,.07,at);if(bar%2===0||big)voice('dist',root-12,q16*.9,.055,at+q16)}}
 else if(ost==='synth'){const pat=[0,2,4,7,4,2,0,2];for(let k=0;k<2;k++)voice(st.arp==='bell'?'bell':st.arp==='chip'?'chip':'pluck',noteOf(S,deg+pat[(bar*2+k)%8])+12,q16*.8,st.arp==='bell'?.035:.05,at+k*q16)}
 else if(ost==='harpsi'){const pat=[0,2,4,2,7,4,2,4];for(let k=0;k<2;k++)voice('harpsi',noteOf(S,deg+pat[(bar*2+k)%8])+12,q16*.9,.05,at+k*q16)}
 else if(ost==='taiko'){if(bar%2===0)perc('taiko',at,.8);perc('tom',at+q16,.5,bar%4<2?150:120);if(bar===3||bar===7)perc('taiko',at+q16,.9)}
 /* ---- 금관 스탭 & 패드 ---- */
 if(bar===0){const len=Math.min(3,S.ms*4/1000*.9);for(const k of tri)voice(st.pad==='organ'?'organ':st.pad==='choir'?'choir':'strings',noteOf(S,deg+k)+(st.pad==='choir'?12:0),len,st.pad==='choir'?.045:st.pad==='organ'?.03:.018,at);voice('brass',root-12,len*.7,.04,at)}
 if(sec>=1&&(bar===3||bar===7)&&!fill){for(const k of tri)voice('brass',noteOf(S,deg+k),half*.7,.028,at)}
 if(big&&bar===0)for(const k of [0,4])voice('choir',noteOf(S,deg+k)+24,S.ms*4/1000,.035,at);
 if(mi===3&&sec===2&&bar>=4)nzB(half*1.2,.03+(bar-4)*.02,at,2000+(bar-4)*1500,.3);
 /* ---- 멜로디 ---- */
 const mot=sec===2?S.motB:sec===3?S.motC:S.lead,o=mot[(m%2)*8+bar];
 if(o>=0&&(sec>0||lv>=1||bar%2===0)){const mid=noteOf(S,deg+o)+12+(sec===0?0:12)-(o>S.scale.length*2?12:0),ld=bt.lead,len=half*(ld==='bell'||ld==='harpsi'?1.6:1.5);
  const lg=ld==='dist'?.075:ld==='bell'?.06:ld==='flute'?.075:ld==='strings'?.03:ld==='glide'?.09:ld==='buzz'?.05:ld==='harpsi'?.065:ld==='brass'?.05:.05;voice(ld,mid,len,lg*(big?1.15:1),at);if(big)voice(ld==='strings'?'strings':'brass',mid-12,len,.025,at)}
 if(oh&&bar%2===0)voice('bell',noteOf(S,deg+(bar/2%3)*2)+24,.3,.04,at)}
const _playSlotCave=(n,delay,S)=>{const bar=((n%8)+8)%8,m=Math.floor(n/8),mi=((m%4)+4)%4,at=audio.currentTime+delay,deg=S.prog[mi];
 if(bar===0||bar===4)tk(120,.16,'sine',.05,at,50);if(bar%2===1)nz(.03,.008,at,8000);
 if(bar===0){const len=Math.min(3.2,S.ms*4/1000*.95);for(const k of [0,2,4])tk(mtof(noteOf(S,deg+k)),len,'sine',.022,at);tk(mtof(noteOf(S,deg)-12),len*.7,'triangle',.05,at)}
 const o=S.lead[(m%2)*8+bar];if(o>=0&&bar%2===0)tk(mtof(noteOf(S,deg+o)+12),.5,'triangle',.014,at)};
/*MUSIC2_END*/
/*MUSIC3_BEGIN*/
const MVOL3=Array(20).fill(.18);MVOL3[3]=MVOL3[13]=.13;
/* ================= 칩튠 전투 음악 v3 (인디 RPG 보스전 스타일 · 전곡 자작) =================
   펄스파 리드(듀티 12.5/25/50%) · 삼각파 16분 베이스 · 노이즈 드럼 · 칩 아르페지오 화음 · 보스마다 다른 훅 멜로디 */
const _PW={};
function pulseWave(d){if(!audio)return null;const key=d+'|'+(audio.sampleRate||0);if(_PW[key]&&_PW[key].ctx===audio)return _PW[key].w;const N=32,re=new Float32Array(N),im=new Float32Array(N);for(let n=1;n<N;n++)im[n]=2/(n*Math.PI)*Math.sin(n*Math.PI*d);const w=audio.createPeriodicWave(re,im);_PW[key]={w,ctx:audio};return w}
function chipOsc(kind,f,at,end,duty){const o=audio.createOscillator();if(kind==='pulse'){o.setPeriodicWave(pulseWave(duty||.25))}else o.type=kind;o.frequency.setValueAtTime(f,at);o.start(at);o.stop(end+.02);return o}
function chipNote(kind,midi,len,gain,at,o){if(!audio||!Number.isFinite(at)||!Number.isFinite(midi))return;o=o||{};const f=mtof(midi),end=at+len;const g=audio.createGain();g.gain.setValueAtTime(.0001,at);g.gain.linearRampToValueAtTime(gain,at+.004);g.gain.setValueAtTime(gain*(o.sus==null?.8:o.sus),at+Math.min(len*.3,.05));g.gain.linearRampToValueAtTime(.0001,end);
 const os=chipOsc(kind,f,at,end,o.duty);if(o.slide)os.frequency.exponentialRampToValueAtTime(f*o.slide,end);if(o.vib&&len>.18){const l=audio.createOscillator(),lg=audio.createGain();l.frequency.value=6;lg.gain.setValueAtTime(0,at);lg.gain.linearRampToValueAtTime(o.vib,at+Math.min(.25,len*.6));l.connect(lg);lg.connect(os.detune);l.start(at);l.stop(end+.02)}
 os.connect(g);vOut(g,o.rev||0);if(o.echo){const dl=audio.createDelay(1),eg=audio.createGain();dl.delayTime.value=o.echo;eg.gain.value=.32;g.connect(dl);dl.connect(eg);vOut(eg,0)}}
function chipDrum(kind,at,gain){if(!audio)return;gain=gain||1;
 if(kind==='kick'){const g=envG(at,.001,0,.16,.9*gain),o=osc('square',160,at,at+.2);o.frequency.exponentialRampToValueAtTime(40,at+.1);const lp=audio.createBiquadFilter();lp.type='lowpass';lp.frequency.value=900;o.connect(lp);lp.connect(g);vOut(g,0);const g2=envG(at,.001,0,.12,.6*gain),o2=osc('sine',120,at,at+.15);o2.frequency.exponentialRampToValueAtTime(45,at+.1);o2.connect(g2);vOut(g2,0)}
 else if(kind==='snare'){nzB(.14,.34*gain,at,1400,0);const g=envG(at,.001,0,.07,.25*gain);osc('square',230,at,at+.08).connect(g);vOut(g,0)}
 else if(kind==='hat')nzB(.03,.1*gain,at,9000,0);
 else if(kind==='ohat')nzB(.14,.08*gain,at,8000,0);
 else if(kind==='crash')nzB(.9,.16*gain,at,4000,.2);
 else if(kind==='tom'){const g=envG(at,.001,0,.18,.6*gain),o=osc('triangle',200,at,at+.22);o.frequency.exponentialRampToValueAtTime(80,at+.18);o.connect(g);vOut(g,0)}}
/* ---- 보스별 곡 설계 ---- */
const CHIP=[
 {sc:'min',pr:[0,5,6,0],duty:.25,bass:'oct',dr:'rock',arp:1,hook:'drive'},
 {sc:'dor',pr:[0,6,5,6],duty:.125,bass:'walk',dr:'dance',arp:1,hook:'zigzag'},
 {sc:'phr',pr:[0,1,0,6],duty:.5,bass:'chug',dr:'half',arp:0,hook:'heavy'},
 {sc:'min',pr:[0,6,5,4],duty:.25,bass:'gal',dr:'gallop',arp:1,hook:'run'},
 {sc:'hmin',pr:[0,5,3,4],duty:.125,bass:'oct',dr:'dance',arp:1,hook:'sparkle'},
 {sc:'min',pr:[0,3,6,5],duty:.25,bass:'chrom',dr:'break',arp:0,hook:'frantic'},
 {sc:'min',pr:[0,5,3,4],duty:.5,bass:'walk',dr:'shuffle',arp:1,hook:'swing'},
 {sc:'hmin',pr:[0,3,4,0],duty:.125,bass:'oct',dr:'waltz',arp:1,hook:'baroque'},
 {sc:'dor',pr:[0,5,6,4],duty:.25,bass:'oct',dr:'dance',arp:1,hook:'soar'},
 {sc:'hmin',pr:[0,5,1,4],duty:.25,bass:'chrom',dr:'rock',arp:1,hook:'final'},
 {sc:'phr',pr:[0,1,6,0],duty:.5,bass:'walk',dr:'tribal',arp:0,hook:'heavy'},
 {sc:'dor',pr:[0,3,0,6],duty:.125,bass:'oct',dr:'waltz',arp:1,hook:'sparkle'},
 {sc:'min',pr:[0,3,4,3],duty:.5,bass:'walk',dr:'shuffle',arp:0,hook:'swing'},
 {sc:'phr',pr:[0,1,0,6],duty:.25,bass:'gal',dr:'gallop',arp:0,hook:'frantic'},
 {sc:'hmin',pr:[0,5,3,4],duty:.125,bass:'oct',dr:'waltz',arp:1,hook:'baroque'},
 {sc:'min',pr:[0,6,5,6],duty:.25,bass:'chrom',dr:'break',arp:1,hook:'zigzag'},
 {sc:'dor',pr:[0,1,4,3],duty:.125,bass:'oct',dr:'half',arp:1,hook:'sparkle'},
 {sc:'phr',pr:[0,1,6,5],duty:.5,bass:'walk',dr:'half',arp:1,hook:'soar'},
 {sc:'min',pr:[0,5,6,4],duty:.25,bass:'chug',dr:'rock',arp:0,hook:'drive'},
 {sc:'hmin',pr:[0,5,3,4],duty:.25,bass:'chrom',dr:'rock',arp:1,hook:'final'},
];
const HOOKR={ /* 2마디 = 32칸 16분 리듬 (x=음, -=이어서, .=쉼) */
 drive:"x.xx.x.xx.x.x-x.x.xx.x.xx-x.x---",
 zigzag:"x.x.xxx.x.x.xx..x.x.xxx.x.xx----",
 heavy:"x---x.x.x---x.x.x---x.x.x.x.x---",
 run:"xxxx.x.xxxxx.x.xx.x.xxxx.x.xx---",
 sparkle:"x.x.x.xxx.x.x.x.x.x.x.xxx.x.x---",
 frantic:"xxxxxxx.xxxxxxx.xxxx.xxxxxxxxx--",
 swing:"x--x--x.x--x--x.x--x--x.x-x-x---",
 baroque:"xxxxxx.xxxxxx.xxxxxx.xxxxxxx----",
 soar:"x---x.x-x---x.x.x---x.x-x-x-x---",
 final:"x.xx.x.xx.xxx.x.x.xx.x.xxx.x.x--",
};
const DRP={
 rock:{k:"x...x.x.x...x...",s:"....x.......x...",h:"x.x.x.x.x.x.x.x."},
 dance:{k:"x...x...x...x...",s:"....x.......x...",h:"..x...x...x...x."},
 half:{k:"x.....x...x.....",s:"........x.......",h:"x.x.x.x.x.x.x.x."},
 gallop:{k:"x.xxx.xxx.xxx.xx",s:"....x.......x...",h:"x.x.x.x.x.x.x.x."},
 break:{k:"x.....x...x..x..",s:"....x..x.x..x...",h:"xxxxxxxxxxxxxxxx"},
 shuffle:{k:"x.....x.x.......",s:"....x.......x...",h:"x..x.xx..x.xx..x"},
 waltz:{k:"x.....x.....x...",s:"...x.....x.....x",h:"x.xx.xx.xx.xx.x."},
 tribal:{k:"x..x..x...x..x..",s:"........x.......",h:"x.x.xx.xx.x.xx.x"},
};
function genHook(bi,S,variant){const r=rng(hash('hook|'+bi+'|'+variant)),cp=CHIP[bi],rh=HOOKR[cp.hook],L=S.scale.length,notes=[];let cur=L+((r()*3)|0);
 for(let i=0;i<32;i++){const c=rh[i];if(c==='.'){notes.push(null);continue}if(c==='-'){notes.push('-');continue}
  const strong=i%4===0,chordTones=[0,2,4,L,L+2,L+4];let step;
  if(strong&&r()<.6){let best=chordTones[0];for(const t of chordTones)if(Math.abs(t-cur)<Math.abs(best-cur))best=t;cur=best}
  else{step=r()<.12?(r()<.5?3:-3):(r()<.5?1:-1);if(r()<.18)step=0;cur+=step}
  cur=Math.max(0,Math.min(L*2+2,cur));notes.push(cur)}
 for(let i=28;i<32;i++)if(typeof notes[i]==='number'){notes[i]=L;break}
 return notes}
function chipSong(bi){const B=BOSSES[bi],m=B.track,d=D(),bpm=m.bpm*d.bpm,cp=CHIP[bi]||CHIP[0],scale=SC[cp.sc],st=MSTYLE[bi]||MSTYLE[0];
 const S={title:m.title+' · '+st.tag,bpm,ms:60000/bpm,scale,root:44+((m.root-40)%8+8)%8,prog:cp.pr,cp,st,fe:FEELS[st.feel],bi,chip:true,vol:(typeof MVOL3!=='undefined'&&MVOL3[bi])||.5,
  lead:m.lead,drum:{k:[],s:[],h:[]},bass:BP[m.bass],dk:[]};
 S.hA=genHook(bi,S,'A');S.hB=genHook(bi,S,'B');S.hC=S.hA.map(v=>typeof v==='number'?v+2:v);return S}
function chipSlot(n,delay,S){if(!audio||!S||!Number.isFinite(delay))return;
 if(S.cave||!S.chip){return _playSlotCave(n,delay,S)}
 musVol(S.vol);
 const cp=S.cp,bar=((n%8)+8)%8,m=Math.floor(n/8),mi=((m%4)+4)%4,sec=((Math.floor(m/4)%4)+4)%4,deg=S.prog[mi],q=S.ms/1000/4,L=S.scale.length;
 const lv=n<0?0:Math.min(2,G.phase||0),oh=G.exposed,root=noteOf(S,deg),t0=audio.currentTime+delay,dp=DRP[cp.dr],swing=cp.dr==='shuffle'?q*.33:0;
 if(n<0){chipDrum(bar%2?'snare':'kick',t0,.8);chipNote('triangle',root-12,q*1.5,.22,t0);return}
 for(let k=0;k<2;k++){const s16=(bar*2+k)%16,at=t0+k*q+(k===1?swing:0),fill=mi===3&&bar>=6;
  /* 드럼 */
  if(fill){chipDrum(k?'tom':'snare',at,.9);if(bar===7&&k===1)chipDrum('snare',at+q/2,.8)}
  else{if(dp.k[s16]==='x')chipDrum('kick',at,1);if(dp.s[s16]==='x')chipDrum('snare',at,1);if(dp.h[s16]==='x'||lv>=2)chipDrum('hat',at,dp.h[s16]==='x'?.9:.4)}
  if(bar===0&&k===0&&(mi===0||lv>=2))chipDrum('crash',at,.8);if(G.crash&&bar===0&&k===0){chipDrum('crash',at,1.2);G.crash=false}
  /* 베이스 (삼각파 16분) */
  const bR=root-12;let bn=bR;
  if(cp.bass==='oct')bn=s16%2?bR+12:bR;
  else if(cp.bass==='walk')bn=bR+[0,0,12,0,7,0,12,10][s16%8];
  else if(cp.bass==='gal')bn=[bR,bR,bR+12,bR,bR,bR+12,bR,bR+7][s16%8];
  else if(cp.bass==='chrom')bn=bR+[0,0,12,0,0,10,11,12][s16%8];
  else if(cp.bass==='chug')bn=s16%4===3?bR+12:bR;
  chipNote('triangle',bn,q*.85,.32,at);
  /* 칩 아르페지오 화음 */
  if(cp.arp&&(sec>=1||lv>=1)){const ch=[0,2,4].map(v=>noteOf(S,deg+v)+12),sub=q/3;for(let j=0;j<3;j++)chipNote('pulse',ch[j],sub*.9,.035,at+j*sub,{duty:.5})}
  else if(!cp.arp&&(sec>=1||lv>=1)&&s16%2===0)chipNote('pulse',noteOf(S,deg+2)+12,q*.8,.04,at,{duty:.5});
  /* 훅 멜로디 */
  const hook=sec===2?S.hB:sec===3?S.hC:S.hA,idx=((m%2)*16+s16)%32,v=hook[idx];
  if(typeof v==='number'&&(sec!==0||lv>=1||true)){let len=1;for(let j=idx+1;j<32&&hook[j]==='-';j++)len++;const mid=noteOf(S,deg*0+v)+12+(sec===3?12:0)-(v>L*2?12:0);
   const lg=cp.duty===.5?.07:.085;chipNote('pulse',mid,q*len*.92,lg,at,{duty:cp.duty,vib:len>=3?14:0,echo:q*3,sus:.7});
   if(sec===3||lv>=2)chipNote('pulse',noteOf(S,v-2)+12+(sec===3?12:0)-(v>L*2?12:0),q*len*.9,.035,at,{duty:.25})}}
 if(oh&&bar%2===0)chipNote('pulse',noteOf(S,deg+(bar/2%3)*2)+36,q*1.5,.04,t0,{duty:.125,echo:q*2})}
/*MUSIC3_END*/
/*MUSIC4_BEGIN*/
const MVOL4=[0.165, 0.17, 0.149, 0.133, 0.185, 0.136, 0.183, 0.16, 0.146, 0.158, 0.167, 0.155, 0.19, 0.134, 0.15, 0.155, 0.172, 0.156, 0.167, 0.158];
/* ================= 신나고 웅장한 보스전 v4 = 칩튠 훅 + 관현악 레이어 ================= */
const EPIC4=[
 {sc:'min',pr:[0,5,2,6]},{sc:'dor',pr:[0,6,3,0]},{sc:'hmin',pr:[0,5,3,4]},{sc:'mix',pr:[0,6,3,0]},{sc:'dor',pr:[0,3,6,4]},
 {sc:'min',pr:[0,5,6,4]},{sc:'mix',pr:[0,3,6,0]},{sc:'hmin',pr:[0,3,4,4]},{sc:'dor',pr:[0,5,6,3]},{sc:'hmin',pr:[0,5,2,4]},
 {sc:'dor',pr:[0,6,3,6]},{sc:'mix',pr:[0,6,3,4]},{sc:'min',pr:[0,5,2,6]},{sc:'hmin',pr:[0,5,3,4]},{sc:'hmin',pr:[0,3,4,0]},
 {sc:'min',pr:[0,6,5,6]},{sc:'dor',pr:[0,3,6,4]},{sc:'min',pr:[0,5,6,4]},{sc:'mix',pr:[0,6,3,0]},{sc:'hmin',pr:[0,5,2,4]},
];
function makeSong(bi){const S=chipSong(bi),e=EPIC4[bi]||EPIC4[0];S.scale=SC[e.sc];S.prog=e.pr;S.hA=genHook(bi,S,'A');S.hB=genHook(bi,S,'B');S.hC=S.hA.map(v=>typeof v==='number'?v+2:v);S.epic4=true;S.vol=(typeof MVOL4!=='undefined'&&MVOL4[bi])||.16;return S}
function playSlot(n,delay,S){if(!audio||!S||!Number.isFinite(delay))return;
 if(S.cave||!S.chip)return _playSlotCave(n,delay,S);
 chipSlot(n,delay,S);if(n<0){const at=audio.currentTime+delay;if(n%2===0)perc('taiko',at,.6);return}
 const st=S.st,bar=((n%8)+8)%8,m=Math.floor(n/8),mi=((m%4)+4)%4,sec=((Math.floor(m/4)%4)+4)%4,deg=S.prog[mi],q=S.ms/1000/4,half=q*2,at=audio.currentTime+delay,root=noteOf(S,deg);
 const lv=Math.min(2,G.phase||0),big=sec===3||lv>=2,tri=[0,2,4];
 /* 큰 북 · 심벌 · 팀파니 */
 if(bar===0||bar===4)perc('taiko',at,big?1:.75);
 if(big&&(bar===2||bar===6))perc('taiko',at+q,.55);
 if(bar===0&&mi===0){perc('crash',at,1.1);perc('timp',at,1,mtof(root-24))}
 if(mi===3&&bar>=6){perc('tom',at,.9,bar===6?160:120);perc('tom',at+q,.9,bar===6?140:100)}
 if(mi===3&&bar===7&&sec%2===1)perc('roll',at,1,q/2);
 /* 현악 지속 화음 + 금관 */
 if(bar===0){const len=Math.min(3.2,S.ms*4/1000*.95);for(const k of tri)voice('strings',noteOf(S,deg+k)+12,len,.016,at);voice('brass',root,len*.8,.03,at);voice('brass',root-12,len*.8,.035,at)}
 /* 신나는 엇박 금관 스탭 (2와 4의 뒷박) */
 if(sec>=1&&(bar===3||bar===7)&&!(mi===3&&bar===7)){for(const k of tri)voice('brass',noteOf(S,deg+k)+12,half*.55,.026,at)}
 if(sec>=1&&bar===5&&mi%2===1){for(const k of tri)voice('brass',noteOf(S,deg+k)+12,half*.5,.022,at+q)}
 /* 클라이맥스: 합창 + 멜로디 금관 더블 */
 if(big&&bar===0)for(const k of [0,2,4])voice('choir',noteOf(S,deg+k)+24,S.ms*4/1000,.03,at);
 if(sec>=2){const hook=sec===2?S.hB:S.hC;for(let k=0;k<2;k++){const s16=(bar*2+k)%16,idx=((m%2)*16+s16)%32,v=hook[idx];if(typeof v!=='number')continue;let len=1;for(let j=idx+1;j<32&&hook[j]==='-';j++)len++;const L=S.scale.length,mid=noteOf(S,v)+12+(sec===3?12:0)-(v>L*2?12:0);voice(sec===3?'brass':'strings',mid-12,q*len*.95,sec===3?.03:.02,at+k*q)}}
 /* 서브 베이스로 무게 */
 if(bar%2===0)voice('sub',root-24,half*.9,.1,at);
 /* 구간 전환 상승음 */
 if(mi===3&&sec===2&&bar>=4)nzB(half*1.2,.025+(bar-4)*.018,at,2000+(bar-4)*1500,.3)}
/*MUSIC4_END*/
/*ARENA_BEGIN*/
