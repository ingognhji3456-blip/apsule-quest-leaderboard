/* ================= 타격감: 히트스톱 · 카메라 펀치 · 넉백 · 임팩트 프레임 · 파편 ================= */
const IMP={t:0,k:0,ang:0,x:0,y:0,kind:'',kick:0,kickA:0,lines:0};
function hdCam(now,zx,zy){const d=now-IMP.t;if(d<0||d>260)return;const k=IMP.k*Math.pow(1-d/260,2),z=1+.035*k*(IMP.kind==='fin'||IMP.kind==='kill'?1.8:1);
 ctx.translate(Math.cos(IMP.ang)*k*3,Math.sin(IMP.ang)*k*3);if(z!==1){const cx=IMP.x||W/2,cy=IMP.y||H/2;ctx.translate(cx,cy);ctx.scale(z,z);ctx.translate(-cx,-cy)}}
function hdKick(now,axis){const d=now-IMP.kick;if(d<0||d>220)return 0;const k=Math.sin(d/220*Math.PI)*(1-d/220)*IMP.kickA;return axis?-k*.4:Math.cos(IMP.ang)*k}
function hdImpact(now,kind,x,y){const str={hit:.6,perfect:.85,crit:1,fin:1.4,kill:2}[kind]||.6;IMP.t=now;IMP.k=str;IMP.kind=kind;IMP.x=x;IMP.y=y;IMP.ang=Math.atan2(y-(P.y-8),x-P.x);IMP.kick=now;IMP.kickA=2+str*3;IMP.lines=now;
 G.hitstop=Math.max(G.hitstop||0,now+({hit:55,perfect:80,crit:110,fin:230,kill:340}[kind]||55));G.shake=Math.max(G.shake,({hit:.18,perfect:.26,crit:.4,fin:.7,kill:1.2}[kind]||.18));
 const col=kind==='fin'||kind==='kill'?'#ffffff':kind==='crit'?'#ff9a3a':kind==='perfect'?'#ffe79a':G.B.c;
 for(let i=0;i<(kind==='hit'?6:kind==='perfect'?10:16);i++){const a=IMP.ang+(RND()-.5)*1.6,v=120+RND()*200;G.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-40,life:.5+RND()*.4,max:.9,col:i%3?col:G.B.pal?G.B.pal[0]:'#888',s:1.5+RND()*2.5,g:420})}
 if(kind!=='hit'){sfx(55,.2,'sine',.14,32);sfx(kind==='kill'?70:110,.12,'square',.05,40)}
 if(kind==='fin'||kind==='kill'){G.flash=Math.max(G.flash,.35);for(let i=0;i<3;i++)G.fxr.push({x,y,t:now+i*70,dur:500+i*120,r1:60+i*40,col:i?G.B.c:'#ffffff'})}}
function impTick(now){if(!G||!G.boss)return;const prev=G._ihp,pops=G.pops||[],last=pops[pops.length-1];
 if(prev!=null&&G.hp<prev-1&&G.state!=='wake'){const rec=last&&now-last.t<80,tx=(rec&&last.tx)||'',g=bgeo(),hx=rec?last.x:g.x,hy=rec?last.y+18:g.coreY;
  const kind=G.hp<=0||G.state==='dying'?'kill':tx.indexOf('FINISH')>=0?'fin':tx.indexOf('CRIT')>=0?'crit':tx.indexOf('PERFECT')>=0?'perfect':'hit';hdImpact(now,kind,hx,hy)}
 G._ihp=G.hp}
/* 임팩트 프레임 · 속도선 (필살/치명타) */
function hdImpactOverlay(now){const d=now-IMP.lines;if(d<0||d>170||!(IMP.kind==='fin'||IMP.kind==='kill'||IMP.kind==='crit'))return;const k=1-d/170;ctx.save();
 if(d<45&&IMP.kind!=='crit'){ctx.globalAlpha=.22;ctx.fillStyle='#ffffff';ctx.fillRect(0,0,W,H)}
 ctx.globalAlpha=.55*k;ctx.strokeStyle=IMP.kind==='crit'?'#ffd0a0':'#ffffff';ctx.lineWidth=1.2;const n=IMP.kind==='crit'?18:30;for(let i=0;i<n;i++){const a=i*TAU/n+(i%3)*.07,r0=40+(i%4)*10,r1=r0+60+(i%5)*30;ctx.beginPath();ctx.moveTo(IMP.x+Math.cos(a)*r0,IMP.y+Math.sin(a)*r0);ctx.lineTo(IMP.x+Math.cos(a)*r1,IMP.y+Math.sin(a)*r1);ctx.stroke()}
 ctx.restore()}
{const _ds=drawScene;drawScene=function(now){try{impTick(now)}catch(e){}const r=_ds.apply(this,arguments);try{if(mode==='boss')hdImpactOverlay(now)}catch(e){}return r}}
/* 데미지 숫자: 튀어오르며 커졌다 작아짐 + 외곽선 */
function hdPops(now){ctx.textAlign='center';for(const p of G.pops){const k=(now-p.t)/900;if(k<0||k>=1)continue;const big=/FINISH|CRIT|COMBO/.test(p.tx),pop=k<.12?1+(1-k/.12)*.8:1,sz=Math.round((big?13:10)*pop),y=p.y-k*18-(k<.15?(.15-k)*30:0);
 ctx.globalAlpha=1-k*k;ctx.font='900 '+sz+'px monospace';ctx.lineJoin='round';ctx.lineWidth=2.6;ctx.strokeStyle='#05070a';ctx.strokeText(p.tx,p.x,y);ctx.fillStyle=p.col;ctx.fillText(p.tx,p.x,y);if(big&&k<.3){ctx.globalAlpha=(.3-k)*2;ctx.fillStyle='#ffffff';ctx.fillText(p.tx,p.x,y)}}
 ctx.globalAlpha=1;ctx.lineWidth=1;ctx.textAlign='left';ctx.font='bold 9px monospace'}
/* 주인공 돌진 잔상 */
{const _dk=drawKnight;drawKnight=function(c,x,y,s,fl,wt,idleT){if(mode==='boss'&&c===ctx&&P.lungeT&&typeof G!=='undefined'&&G){const d=performance.now()-P.lungeT;if(d>=0&&d<200){const a=c.globalAlpha;for(let i=3;i>=1;i--){c.globalAlpha=a*.16*i*(1-d/200);_dk.call(this,c,x-Math.cos(P.lungeA||0)*i*5,y-Math.sin(P.lungeA||0)*i*5,s,fl,wt,idleT)}c.globalAlpha=a}}return _dk.apply(this,arguments)}}

