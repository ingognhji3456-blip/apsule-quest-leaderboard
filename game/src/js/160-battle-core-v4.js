/* ================= v4 전투 코어 ================= */
const EVADE=[16,20,24],EST={volley:10,eyeLaser:7,slam:8,charge:9,missiles:9,sawThrow:8,rotor:11,turrets:11,laserPods:6,ringBurst:9,clockLaser:11,mines:8,starBurst:10,earthquake:8,gearRail:11,voltGrid:10,voltStrike:9,geyserWave:9,fireBomb:9,trainRun:8,iceWave:8,frostNova:9,droneSwarm:11,magnetField:9,hourStrike:12,scanCones:8,prism:9,beatCollapse:13};
const CHAN={volley:'hands',eyeLaser:'head',slam:'hands',charge:'all',missiles:'hands',sawThrow:'hands',rotor:'all',turrets:'hands',laserPods:'field',ringBurst:'all',clockLaser:'head',mines:'hands',starBurst:'all',earthquake:'hands',gearRail:'field',voltGrid:'field',voltStrike:'field',geyserWave:'field',fireBomb:'hands',trainRun:'field',iceWave:'field',frostNova:'field',droneSwarm:'field',magnetField:'field',hourStrike:'field',scanCones:'head',prism:'field',beatCollapse:'all'};
/* 이름 · 가중치 · 최소 페이즈 · 'S'=시그니처 */
const DECK=[
 [['gearRail',4,0,'S'],['slam',3,0],['charge',2,0],['ringBurst',2,1],['turrets',2,1],['earthquake',2,1],['rotor',2,2]],
 [['voltGrid',4,0,'S'],['voltStrike',4,0,'S'],['eyeLaser',2,0],['laserPods',2,0],['volley',2,1],['clockLaser',2,1],['starBurst',2,2]],
 [['geyserWave',4,0,'S'],['fireBomb',4,0,'S'],['slam',3,0],['missiles',2,1],['mines',2,1],['charge',2,1],['earthquake',2,2]],
 [['trainRun',5,0,'S'],['charge',2,0],['volley',3,0],['sawThrow',2,1],['missiles',2,1],['turrets',2,2],['rotor',1,2]],
 [['frostNova',4,0,'S'],['iceWave',4,0,'S'],['eyeLaser',2,0],['mines',2,1],['clockLaser',2,1],['starBurst',2,1],['ringBurst',2,2]],
 [['droneSwarm',5,0,'S'],['volley',3,0],['missiles',3,0],['turrets',2,1],['clockLaser',2,1],['starBurst',2,2],['eyeLaser',1,2]],
 [['magnetField',5,0,'S'],['slam',3,0],['mines',2,0],['sawThrow',2,1],['charge',2,1],['rotor',2,2],['earthquake',2,2]],
 [['hourStrike',5,0,'S'],['clockLaser',3,0],['rotor',2,0],['ringBurst',2,1],['slam',2,1],['eyeLaser',2,2],['starBurst',2,2]],
 [['scanCones',4,0,'S'],['prism',4,0,'S'],['eyeLaser',3,0],['volley',2,0],['missiles',2,1],['clockLaser',2,1],['starBurst',2,2]],
 [['gearRail',2,0],['voltStrike',2,0],['geyserWave',2,0],['trainRun',2,0],['volley',2,0],['eyeLaser',2,0],['frostNova',2,1,'S'],['droneSwarm',2,1],['hourStrike',2,1],['prism',2,1],['iceWave',2,1],['beatCollapse',3,1,'S'],['magnetField',2,2],['beatCollapse',3,2,'S'],['starBurst',2,2],['earthquake',2,2]]
];
const DECK2=[
 [['rootBurst',4,0,'S'],['clawSlam',3,0],['pounce',3,0],['thornSeed',2,1],['tailSpin',2,1],['tremor',2,2]],
 [['sporeBloom',4,0,'S'],['sporeShot',3,0],['mireRoot',2,1],['gazePollen',2,1],['sporeNova',2,2]],
 [['mireGrasp',4,0,'S'],['tentacleWhip',3,0],['bileSpit',2,1],['sludgePool',2,1],['tremor',2,2]],
 [['boneHowl',4,0,'S'],['fangLunge',3,0],['boneShard',3,0],['howlSpin',2,1],['tremor',2,2]],
 [['webCage',4,0,'S'],['fangBite',3,0],['silkShot',2,1],['eggBurst',2,1],['novaBloom',2,2]],
 [['stingSwarm',5,0,'S'],['stinger',3,0],['hiveMines',2,1],['hiveTurret',2,1],['tremor',2,2]],
 [['shardStorm',4,0,'S'],['shardThrow',3,0],['gazeBeam',2,0],['prismSpike',2,1],['novaBloom',2,2]],
 [['tideCrush',4,0,'S'],['mawBite',3,0],['undertow',2,1],['sprayBile',2,1],['tremor',2,2]],
 [['emberWail',4,0,'S'],['wailCone',3,0],['ashDrift',2,1],['convergeRing',2,1],['novaBloom',2,2]],
 [['voidHunger',3,0,'S'],['doomBite',2,0],['rootBurst',2,0],['boneHowl',2,1],['tideCrush',2,1],['stingSwarm',2,1],['webCage',2,1],['shardStorm',2,2],['emberWail',1,2],['tremor',2,2]]
];
DECK.push(...DECK2);
const SIGNAME={gearRail:'톱니 레일',voltGrid:'전선 그리드',voltStrike:'벼락 낙뢰',geyserWave:'용암 간헐천',fireBomb:'화염 투척',trainRun:'급행 질주',iceWave:'빙창 방사',frostNova:'서리 폭풍',droneSwarm:'드론 편대',magnetField:'자기장 폭주',hourStrike:'정각 타종',scanCones:'수색 탐조등',prism:'프리즘 교차포',beatCollapse:'박동 붕괴'};
Object.assign(ATK_NAME,SIGNAME);
/* ---------- 위험요소 프리미티브 ---------- */
function glow(x,y,r,col,a){const st=r>28?4:r>12?2:1;for(const [k,al] of [[1,a*.22],[.68,a*.3],[.38,a*.5]]){const rr=r*k;for(let dy=-rr;dy<rr;dy+=st){const w=Math.sqrt(Math.max(0,rr*rr-dy*dy));RA(x-w,y+dy,w*2,st,col,al)}}}
function mover(o){G.movers.push(Object.assign({r:12,dmg:14,len:0,kind:'gear',spin:0},o))}
function cone(o){G.cones.push(Object.assign({half:.2,len:330,dmg:14,col:G.B.pal[3]},o))}
function ring(cx,cy,r0,r1,t0,t1,dmg,gaps,tp){const t1q=QZ(t1),sh=t1q-t1;t0+=sh;t1=t1q;if(tp!=null)tp+=sh;
 /* 원형 충격파는 항상 피할 수 있게: 틈 보장 · 최소 폭 · 속도 제한 · 미리 보기 */
 const sp=Math.abs(r1-r0)/Math.max(.1,t1-t0),cap=diff==='easy'?80:diff==='extreme'?100:90;if(sp>cap)t1=t0+Math.abs(r1-r0)/cap;
 if(!gaps||!gaps.length){gaps=[[0,.9]];if((G.phase||0)>=1)gaps.push([Math.PI,.7])}
 const g0=gaps[0][0];gaps=gaps.map(([ga,gw],i)=>[ga-g0,Math.max(gw,i===0?.9:.7)]);
 {let last=-1e9;for(const o of G.rings)if(Math.hypot(o.cx-cx,o.cy-cy)<60)last=Math.max(last,o.t0);const gapB=2.2;if(t0<last+gapB){const d=last+gapB-t0;t0+=d;t1+=d;if(tp!=null)tp+=d}}
 {const ws={easy:1.15,normal:1,hard:.9,extreme:.8}[diff]||1,minB=ws*1000/(G.ms||500),lead=t0-(G.beat||0);if(lead<minB){const d=minB-lead;t0+=d;t1+=d}const tw=t0-minB;tp=tp==null?tw:Math.min(tp,tw)}
 G.rings.push({cx,cy,r0,r1,t0,t1,dmg:Math.round((dmg||10)*.7),gaps:gaps.map(g=>[g[0]+RND()*TAU,g[1]]),rel:gaps,tp,aimed:false})}
/* 틈은 파동이 퍼지기 직전, 플레이어 바로 옆에 맞춘다 */
function aimRings(beat){for(const r of G.rings){if(r.aimed||!r.rel||beat<Math.min(r.tp==null?r.t0-.9:r.tp,r.t0-.9))continue;r.aimed=true;if(beat<r.t0)sfx(260,.35,'triangle',.04,520);const pa=Math.atan2(P.y-r.cy,P.x-r.cx),off=(RND()<.5?-1:1)*(.55+RND()*.55),base=pa+off;r.gaps=r.rel.map(([d,w])=>[base+d,w])}}
function fxRing(x,y,now,dur,r1,col){G.fxr.push({x,y,t:now,dur,r1,col})}
const mvPos=(m,beat)=>{const p=clamp((beat-m.t0)/(m.t1-m.t0),0,1);return [lerp(m.x0,m.x1,p),lerp(m.y0,m.y1,p)]};
const angDiff=(a,b)=>Math.abs(((a-b+Math.PI*3)%TAU)-Math.PI);
function coneAng(c,beat){return c.a0+c.da*clamp((beat-c.t1)/(c.t2-c.t1),0,1)}
function clearPhraseHazards(){if(G.puz&&G.puz.done)G.puz=null;for(const k of ['evs','bullets','zones','beams','laserPods','saws','rings','rotors','turrets','rockets','arcs','lanes','movers','cones'])G[k]=[];G.tb=null;G.pull=null;const b=G.boss;b.dash=false;b.track=false;b.lock=false;b.sweep=0;b.eyeC=null;b.eye=0;b.warn=0;b.open=0;b.openTw=null;for(const h of b.hands){h.drv=null;h.tw=null;h.mode='idle';h.charge=0;h.aim=false;h.stuck=false;h.armed=true}}
/* ---------- 충돌 (게임/봇 공용) ---------- */
function hazardHit(px,py,beat,pr,lead){lead=lead||0;
for(const b of G.bullets){if(beat<b.t0)continue;const [x,y]=bpos(b,beat);if(Math.hypot(px-x,py-y)<b.r*.55+pr*.8)return(G.q19HitObj=b,G.src='bullet',b.dmg)}
for(const z of G.zones){if(z.harm===false||beat<z.t1-lead||beat>=z.t2)continue;if(Math.hypot(px-z.cx,py-z.cy)<=z.r+pr)return(G.q19HitObj=z,G.src='zone:'+(z.kind||'plain'),z.dmg)}
for(const r of G.rings){if(beat<r.t0-lead||beat>=r.t1)continue;const rr=lerp(r.r0,r.r1,clamp((beat-r.t0)/(r.t1-r.t0),0,1)),dx=px-r.cx,dy=py-r.cy;if(Math.abs(Math.hypot(dx,dy)-rr)>=3.2+pr-3.5)continue;if(r.gaps){const a=Math.atan2(dy,dx);let inGap=false;for(const [ga,gw] of r.gaps)if(angDiff(a,ga)<gw)inGap=true;if(inGap)continue}return(G.q19HitObj=r,G.src='ring',r.dmg)}
for(const b of G.beams){if(beat<b.t1-lead||beat>=b.t2)continue;const p=beat<b.t1?1:clamp((beat-b.t1)/b.fireDur,0,1);if(p<.1)continue;const a=beamAng(b,beat),dx=Math.cos(a),dy=Math.sin(a),tip=b.L*(p*p*(3-2*p)),s0=b.both?-tip:0;if(segDist(px,py,b.ox+dx*s0,b.oy+dy*s0,b.ox+dx*tip,b.oy+dy*tip)<=b.w/2+pr)return(G.q19HitObj=b,G.src='beam',b.dmg)}
for(const s of G.saws){if(beat<s.ts||beat>s.te)continue;const [x,y]=sawPos(s,beat);if(Math.hypot(px-x,py-y)<9+pr-1)return(G.q19HitObj=s,G.src='saw',s.dmg)}
for(const rt of G.rotors){if(beat<rt.t1-lead||beat>rt.t2)continue;for(let i=0;i<rt.arms;i++){const [x,y]=rotorTip(rt,i,beat);if(segDist(px,py,rt.cx,rt.cy,x,y)<6+pr)return(G.q19HitObj=rt,G.src='rotor',rt.dmg)}}
for(const m of G.movers){if(beat<m.t0-lead*.5||beat>m.t1)continue;const [x,y]=mvPos(m,Math.max(beat,m.t0));if(m.len){const dir=Math.sign(m.x1-m.x0)||1;if(segDist(px,py,x-dir*m.len,y,x,y)<m.r+pr)return(G.q19HitObj=m,G.src='mover:'+m.kind,m.dmg)}else if(Math.hypot(px-x,py-y)<m.r+pr)return(G.q19HitObj=m,G.src='mover:'+m.kind,m.dmg)}
for(const c of G.cones){if(beat<c.t1-lead||beat>=c.t2)continue;const a=coneAng(c,Math.max(beat,c.t1)),dx=px-c.x,dy=py-c.y,d=Math.hypot(dx,dy);if(d<c.len&&angDiff(Math.atan2(dy,dx),a)<c.half+Math.atan(pr/Math.max(20,d)))return(G.q19HitObj=c,G.src='cone',c.dmg)}
if(G.boss.dash&&circRect(px,py,pr+2,bodyRect()))return(G.src='bossdash',26);return 0}
function hitTest(now,beat){if(now<P.inv||G.state!=='play'||G.cine)return;const d=hazardHit(P.x,P.y,beat,3.5,0);if(d)hurtP(d,now)}
