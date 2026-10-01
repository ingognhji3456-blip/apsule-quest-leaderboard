/* ================= 입력/플레이어 ================= */
const K=new Set(),stick={x:0,y:0};
const P={x:0,y:0,hp:100,maxhp:100,face:{x:0,y:1},inv:0,dash:null,dashCd:0,atkCd:0};
let mode='menu',paused=false,story=false,chapter=0,G={state:'none',phase:0,exposed:false},C=null;
let saveData={clear:{},chapter:0};try{const s=JSON.parse(localStorage.getItem('beatmachina-v2'));if(s)saveData=Object.assign(saveData,s)}catch(e){}
const saveNow=()=>{try{localStorage.setItem('beatmachina-v2',JSON.stringify(saveData))}catch(e){}};
try{const v=Number(localStorage.getItem('beatmachina-sync'));if(Number.isFinite(v))syncMs=clamp(v,-300,300);const d=localStorage.getItem('beatmachina-diff');if(DIFF[d])diff=d}catch(e){}
function moveInput(){let x=(K.has('ArrowRight')||K.has('KeyD')?1:0)-(K.has('ArrowLeft')||K.has('KeyA')?1:0),y=(K.has('ArrowDown')||K.has('KeyS')?1:0)-(K.has('ArrowUp')||(K.has('KeyW')&&!(mode==='boss'&&G&&G.vuln))?1:0);x+=stick.x;y+=stick.y;const l=Math.hypot(x,y);if(l>1){x/=l;y/=l}return [x,y]}
function resetP(x,y){P.x=x;P.y=y;P.maxhp=charStats(shopInv().eq.ch).hp;P.hp=P.maxhp;P.inv=0;P.dash=null;P.dashCd=0;P.atkCd=0;P.face={x:0,y:-1};P.lungeT=0;P.walkT=0;P.walkOn=false;P.stam=stamMax();P.stamLock=false;P.hpShow=undefined;P.healAt=0}
function stepPlayer(dt,now,mv,speed){stamTick(dt);const [ix,iy]=moveInput();if(ix||iy)P.face={x:ix,y:iy};let vx=ix*speed,vy=iy*speed;
if(P.dash){if(now-P.dash.t0>=P.dash.dur)P.dash=null;else{vx=P.dash.vx;vy=P.dash.vy}}
const moving=Math.hypot(vx,vy)>1;P.walkT=(P.walkT||0)+(moving?dt*(P.dash?16:9):0);P.walkOn=moving;
mv(vx*dt,vy*dt)}
function doDash(){if(paused||dlg.active)return;if(!(mode==='boss'&&(G.state==='play'||G.state==='count'))&&!(mode==='cave'&&C&&C.state==='walk'))return;initAudio();const now=performance.now();if(now<P.dashCd)return;let [ix,iy]=moveInput();if(!ix&&!iy){ix=P.face.x;iy=P.face.y}const l=Math.hypot(ix,iy)||1;ix/=l;iy/=l;
const ms=mus.ms||600,b=(now-mus.T0)/ms,err=Math.abs((b-Math.round(b))*ms),good=err<=(mode==='boss'?win().g:9999);
P.dash={t0:now,dur:150,vx:ix*290,vy:iy*290};P.inv=Math.max(P.inv,now+(good?520:300));P.dashCd=now+ms*.9;sfx(good?520:330,.09,'sawtooth',.03,good?900:200);
if(mode==='boss'){G.pops.push({x:P.x,y:P.y-22,t:now,tx:good?'DASH!':'dash',col:good?'#8dcdf5':'#6a8090'});for(let i=0;i<8;i++)G.parts.push({x:P.x,y:P.y,vx:-ix*60+(RND()-.5)*50,vy:-iy*60+(RND()-.5)*50,life:.3,max:.3,col:'#8dcdf5',s:2})}}

/* ================= 대화 ================= */
const dlg={q:[],i:0,cb:null,active:false,t0:0,shown:0,txt:''};
function say(lines,cb){dlg.q=lines.map(l=>typeof l==='string'?['',l]:l);dlg.i=0;dlg.cb=cb||null;dlg.active=true;$('dlg').hidden=false;dlgLine()}

function dlgAdvance(){if(!dlg.active)return;if(dlg.shown<dlg.txt.length){dlg.shown=dlg.txt.length;$('dlgText').textContent=dlg.txt;return}dlg.i++;if(dlg.i>=dlg.q.length){dlg.active=false;$('dlg').hidden=true;const cb=dlg.cb;dlg.cb=null;if(cb)cb()}else dlgLine()}
function dlgTick(now){if(dlg.active&&dlg.shown<dlg.txt.length){const n=Math.min(dlg.txt.length,Math.floor((now-dlg.t0)/26));if(n!==dlg.shown){dlg.shown=n;$('dlgText').textContent=dlg.txt.slice(0,n)}}}
function banner(txt){const b=$('banner');b.textContent=txt;b.classList.remove('show');void b.offsetWidth;b.classList.add('show')}

