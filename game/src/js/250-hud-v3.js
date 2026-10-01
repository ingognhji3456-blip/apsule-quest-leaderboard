/* ================= v3: 체력바 · 대시 게이지 · 말하는 대화 · 키보드 반격 · 이름 ================= */
/* ---- 이름 ---- */
function PNAME(){return (saveData.name&&String(saveData.name).trim())||'하루'}
function hasBatchim(w){const c=w.charCodeAt(w.length-1);if(c<0xAC00||c>0xD7A3)return false;return (c-0xAC00)%28!==0}
function nameText(txt){const n=PNAME();if(n==='하루')return txt;const b=hasBatchim(n),J={'가':b?'이':'가','야':b?'아':'야','는':b?'은':'는','를':b?'을':'를','예요':b?'이에요':'예요','와':b?'과':'와','랑':b?'이랑':'랑','의':'의','':''};
 return txt.replace(/하루(?!도|하루)(예요|가|야|는|를|와|랑)?/g,(m,j)=>n+(j?J[j]:''))}
/* ---- 말하는 대화: 한 글자씩, 문장부호에서 쉬고, 캐릭터마다 목소리 ---- */
const VOICE={'하루':[430,'square',.018],'똑딱':[900,'square',.014],'선 할아버지':[190,'triangle',.03],'윤서':[560,'triangle',.024]};
function voiceOf(who){if(!who)return null;for(const k in VOICE)if(who.indexOf(k)===0)return VOICE[k];if(BOSSES.some(b=>b.name===who))return [110,'sawtooth',.02];return [320,'triangle',.02]}
function dlgLine(){const [who,txt0]=dlg.q[dlg.i],disp=who==='하루'?PNAME():who,txt=nameText(txt0||'');$('dlgName').textContent=disp||'';$('dlgName').style.display=who?'block':'none';
 dlg.txt=txt;dlg.who=who||'';dlg.t0=performance.now();dlg.nextAt=dlg.t0+90;dlg.shown=0;dlg.blip=0;$('dlgText').textContent='';drawPortrait(who||'');const box=$('dlg');box.classList.toggle('hasP',!!who);
 box.classList.remove('shake');if(/[!！]/.test(txt.slice(0,14))||/^\(/.test(txt)===false&&/!{1}$/.test(txt)){void box.offsetWidth;box.classList.add('shake')}
 const col={'하루':'#a6f5c6','똑딱':'#a8f0ff','선 할아버지':'#f0dcb8','윤서':'#ffb070'};$('dlgName').style.color=who?(Object.keys(col).find(k=>who.indexOf(k)===0)?col[Object.keys(col).find(k=>who.indexOf(k)===0)]:'#ff9aa8'):''}
function dlgTick(now){if(!dlg.active||dlg.shown>=dlg.txt.length)return;let changed=false;
 while(dlg.shown<dlg.txt.length&&now>=dlg.nextAt){const ch=dlg.txt[dlg.shown];dlg.shown++;changed=true;
  let d=30;if(ch===','||ch==='，')d=150;else if('.!?。'.includes(ch))d=270;else if(ch==='…')d=320;else if(ch===' ')d=18;dlg.nextAt+=d;
  if(ch.trim()&&!'.,!?…()"\''.includes(ch)){dlg.blip++;const v=voiceOf(dlg.who);if(v&&dlg.blip%2===1&&sound&&audio){const f=v[0]*(1+((dlg.blip*37)%9-4)*.02);sfx(f,.035,v[1],v[2],f*1.05)}else if(!v&&dlg.blip%3===1)sfx(260,.02,'sine',.008,250);
   const pc=$('dlgPortrait');if(pc)pc.style.transform=dlg.blip%4<2?'translateY(calc(var(--u)*-.8))':'translateY(0)'}}
 if(changed)$('dlgText').textContent=dlg.txt.slice(0,dlg.shown);if(dlg.shown>=dlg.txt.length){const pc=$('dlgPortrait');if(pc)pc.style.transform='translateY(0)'}}
/* ---- 대시: 한 번에 20%, 0%가 되면 천천히 충전 ---- */
function doDash(){if(paused||dlg.active)return;if(!(mode==='boss'&&(G.state==='play'||G.state==='count'))&&!(mode==='cave'&&C&&C.state==='walk'))return;initAudio();const now=performance.now();
 if(P.stam===undefined)P.stam=1;if(now<P.dashCd)return;if(P.stamLock||P.stam<.199){P.stamShake=now;sfx(140,.08,'square',.03,90);return}
 let [ix,iy]=moveInput();if(!ix&&!iy){ix=P.face.x;iy=P.face.y}const l=Math.hypot(ix,iy)||1;ix/=l;iy/=l;
 const ms=mus.ms||600,b=(now-mus.T0)/ms,err=Math.abs((b-Math.round(b))*ms),good=err<=(mode==='boss'?win().g:9999);
 P.stam=Math.max(0,P.stam-.2);if(P.stam<.01){P.stam=0;P.stamLock=true}
 P.dash={t0:now,dur:150,vx:ix*290,vy:iy*290};P.inv=Math.max(P.inv,now+(good?520:300));P.dashCd=now+170;sfx(good?520:330,.09,'sawtooth',.03,good?900:200);
 if(mode==='boss'){G.pops.push({x:P.x,y:P.y-22,t:now,tx:good?'DASH!':'dash',col:good?'#8dcdf5':'#6a8090'});for(let i=0;i<8;i++)G.parts.push({x:P.x,y:P.y,vx:-ix*60+(RND()-.5)*50,vy:-iy*60+(RND()-.5)*50,life:.3,max:.3,col:'#8dcdf5',s:2})}}
function stamTick(dt){if(P.stam===undefined)P.stam=1;if(P.stamLock){P.stam=Math.min(1,P.stam+dt/3.4);if(P.stam>=1){P.stamLock=false;sfx(700,.12,'triangle',.03,1100)}}}
/* ---- 화려한 체력바 ---- */
function hpHeart(x,y,col,s){const H2=[".oo.oo.","oHHoHHo","oHwHHHo","oHHHHHo",".oHHHo.","..oHo..","...o..."];for(let j=0;j<H2.length;j++)for(let i=0;i<7;i++){const k=H2[j][i];if(k==='.')continue;R(x+i*s,y+j*s,s,s,k==='o'?'#1a0a10':k==='w'?'#ffffff':col)}}
function drawPlayerHUD(now){const x=6,y=H-33,w=112,r=clamp(P.hp/P.maxhp,0,1);P.hpShow=P.hpShow===undefined?r:(P.hpShow>r?Math.max(r,P.hpShow-.35*(1/60)):r);const low=r<.3,pul=low?.5+.5*Math.sin(now/110):0;
 RA(x-2,y-4,w+30,32,'#05090b',.72);R(x-2,y-4,w+30,1,'#3a4a50');R(x-2,y+27,w+30,1,'#1a2226');
 const hb=low?Math.round(Math.sin(now/110)):0;hpHeart(x+1,y+1-hb,low?mixc('#ff3a5d','#ffffff',pul*.3):'#ff5d7d',2);
 const bx=x+18,by=y+2,bh=9;R(bx-1,by-1,w+2,bh+2,'#161c22');R(bx,by,w,bh,'#2a1218');
 R(bx,by,w*P.hpShow,bh,'#ffe0e8');const fw=w*r,c1=low?'#ff3a5d':r<.6?'#ffb020':'#5ef0a0',c2=low?'#a0102a':r<.6?'#c86a10':'#2a9a6a';
 R(bx,by,fw,bh,c2);R(bx,by,fw,bh-3,c1);R(bx,by,fw,1,mixc(c1,'#ffffff',.55));for(let i=1;i<10;i++)R(bx+w*i/10,by,1,bh,'#161c22');
 const sh=((now/1600)%1.4)-.2;if(sh>0&&sh<1)RA(bx+fw*sh-4,by,6,bh,'#ffffff',.35);if(low)RA(bx,by,fw,bh,'#ffffff',pul*.18);
 {const t=Math.max(0,Math.ceil(P.hp))+' / '+P.maxhp;ctx.font='bold 8px monospace';ctx.textAlign='left';ctx.fillStyle='#05090b';for(const [ox,oy] of [[-1,0],[1,0],[0,-1],[0,1],[1,1]])ctx.fillText(t,bx+4+ox,by+8+oy);ctx.fillStyle='#ffffff';ctx.fillText(t,bx+4,by+8)}
 ctx.fillStyle='#ffe79a';ctx.font='bold 7px monospace';ctx.fillText(PNAME(),x,y-6);
 const st=P.stam===undefined?1:P.stam,sy=by+13,shk=P.stamShake&&now-P.stamShake<250?Math.round(Math.sin(now/20)*2):0;ctx.fillStyle=P.stamLock?'#ff9aa8':'#8dcdf5';ctx.font='bold 6px monospace';ctx.fillText(P.stamLock?'충전':'DASH',x+shk,sy+7);
 const NC=curChar().dash;for(let i=0;i<NC;i++){const cx=bx+i*(w/NC)+shk,cw=w/NC-2,f=clamp((st-i*.2)/.2,0,1);R(cx,sy,cw,7,'#161c22');R(cx+1,sy+1,cw-2,5,'#10222e');if(f>0){R(cx+1,sy+1,(cw-2)*f,5,P.stamLock?'#4a6a8a':'#8dcdf5');R(cx+1,sy+1,(cw-2)*f,1,P.stamLock?'#6a8aaa':'#d8f4ff')}}
 if(P.stamLock)RA(bx,sy,w*st/(NC*.2),7,'#ffffff',.12+.1*Math.sin(now/90))}
function drawPlayerBar(now){drawPlayerHUD(now)}
function drawPlayerBarCave(now){drawPlayerHUD(now);
 ctx.fillStyle='#ffe79a';ctx.font='bold 9px monospace';ctx.textAlign='right';ctx.fillText('CHAPTER '+(C.ci+1)+' · '+STORY[C.ci].cave,W-8,H-6);ctx.fillStyle='#ff8fa0';ctx.font='bold 8px monospace';{const [lbl,val]=chStatusLabel(C.ci);ctx.fillText(lbl+' '+val+'%',W-8,H-17)}ctx.textAlign='center';if(C.ci===0&&now-C.t0<12000&&!dlg.active){ctx.fillStyle='#ffffff';ctx.font='bold 9px monospace';ctx.fillText('이동: WASD / 방향키 · 대시: SHIFT(20%씩) · 공격: 스페이스',W/2,H-40);ctx.fillText('깜빡이는 단말기와 저 끝의 문을 찾아보세요',W/2,H-52)}ctx.textAlign='left'}
const BAR_ICON=['gear','bolt','flame','wheel','snow','hive','magnet','clock','eye','crown','root','spore','bog','bone','web','wasp','crystal','abyss','ash','void'];
function barIcon(k,x,y,c1,c2,now){const P2=(a,b,w,h,col)=>R(x+a,y+b,w,h,col);
 switch(k){
 case 'gear':{pcirc(x+5,y+5,4,c1);for(let i=0;i<8;i++){const a=i*TAU/8+now/500;R(x+5+Math.cos(a)*5-1,y+5+Math.sin(a)*5-1,2,2,c1)}pcirc(x+5,y+5,1.6,'#05090b');break}
 case 'bolt':P2(5,0,3,2,c1);P2(4,2,3,2,c1);P2(3,4,5,2,c1);P2(5,6,3,2,c1);P2(4,8,2,2,c1);break;
 case 'flame':{const f=Math.sin(now/90);pcirc(x+5,y+7,3.5,c2);P2(4,1+f,3,5,c1);P2(3,3,5,4,c1);P2(5,5,1,3,'#fff0a0');break}
 case 'wheel':{pcirc(x+5,y+5,5,c1);pcirc(x+5,y+5,3.5,'#05090b');for(let i=0;i<4;i++){const a=i*Math.PI/2+now/200;line(x+5,y+5,x+5+Math.cos(a)*3.5,y+5+Math.sin(a)*3.5,1,(a2,b2)=>R(a2,b2,1,1,c1))}break}
 case 'snow':for(let i=0;i<3;i++){const a=i*Math.PI/3;line(x+5-Math.cos(a)*5,y+5-Math.sin(a)*5,x+5+Math.cos(a)*5,y+5+Math.sin(a)*5,1,(a2,b2)=>R(a2,b2,1,1,c1))}R(x+4,y+4,3,3,'#ffffff');break;
 case 'hive':for(const [a,b] of [[1,1],[5,1],[3,4],[7,4],[1,7],[5,7]])P2(a,b,3,2,Math.floor(now/200+a+b)%3?c1:c2);break;
 case 'magnet':P2(1,1,3,7,c1);P2(7,1,3,7,c1);P2(1,7,9,3,c1);P2(1,1,3,2,'#ffffff');P2(7,1,3,2,'#ffffff');break;
 case 'clock':pcirc(x+5,y+5,5,c1);pcirc(x+5,y+5,4,'#fff6f0');{const a=now/300;line(x+5,y+5,x+5+Math.cos(a)*3,y+5+Math.sin(a)*3,1,(a2,b2)=>R(a2,b2,1,1,'#05090b'))}R(x+5,y+2,1,3,'#05090b');break;
 case 'eye':pcirc(x+5,y+5,5,c1);pcirc(x+5,y+5,2.5,'#05090b');R(x+4,y+3,2,2,c2);break;
 case 'crown':P2(0,4,11,5,c1);P2(0,1,2,3,c1);P2(4,0,3,4,c1);P2(9,1,2,3,c1);P2(4,5,3,2,c2);break;
 case 'root':line(x+5,y,x+5,y+10,1,(a2,b2)=>R(a2-1,b2,2,1,c2));line(x+5,y+4,x+1,y+9,1,(a2,b2)=>R(a2,b2,1,1,c2));line(x+5,y+5,x+10,y+9,1,(a2,b2)=>R(a2,b2,1,1,c2));P2(3,0,5,3,c1);break;
 case 'spore':pcirc(x+5,y+4,5,c1);P2(4,4,3,6,c2);for(const [a,b] of [[2,2],[6,1],[8,4]])P2(a,b,1,1,'#ffffff');break;
 case 'bog':pcirc(x+5,y+6,4,c1);pcirc(x+3,y+3,2,c1);pcirc(x+7,y+3,2,c1);R(x+2,y+2,2,2,'#ffe36b');R(x+7,y+2,2,2,'#ffe36b');break;
 case 'bone':P2(3,4,5,2,c1);pcirc(x+2,y+3,2,c1);pcirc(x+2,y+7,2,c1);pcirc(x+9,y+3,2,c1);pcirc(x+9,y+7,2,c1);break;
 case 'web':for(let i=0;i<4;i++){const a=i*Math.PI/4;line(x+5-Math.cos(a)*5,y+5-Math.sin(a)*5,x+5+Math.cos(a)*5,y+5+Math.sin(a)*5,1,(a2,b2)=>R(a2,b2,1,1,c1))}for(const r2 of [2,4])for(let i=0;i<8;i++){const a=i*TAU/8;R(x+5+Math.cos(a)*r2,y+5+Math.sin(a)*r2,1,1,c1)}break;
 case 'wasp':for(let i=0;i<4;i++)P2(2,1+i*2,7,2,i%2?'#1a1a1a':c1);P2(0,2,2,2,'#e0f0ff');P2(9,2,2,2,'#e0f0ff');P2(5,9,1,2,'#ffffff');break;
 case 'crystal':for(let j=0;j<10;j++){const w2=j<4?j+1:Math.max(1,10-j);R(x+5-w2/2,y+j,w2,1,j<5?'#e8fbff':c1)}break;
 case 'abyss':pcirc(x+5,y+5,5,c2);for(let i=0;i<6;i++){const a=i*TAU/6+now/400;R(x+5+Math.cos(a)*3.5-.5,y+5+Math.sin(a)*3.5-.5,1,1,c1)}R(x+4,y+4,2,2,'#ffffff');break;
 case 'ash':for(let i=0;i<5;i++){const k=((now/800)+i/5)%1;R(x+1+i*2,y+9-k*9,2,2,i%2?c1:'#5a5652')}break;
 case 'void':pcirc(x+5,y+5,5,c1);pcirc(x+5,y+5,3.2,'#05090b');R(x+4,y+2,2,6,c2);break}}
function drawBossBar(now){const bn=document.getElementById('bossName');if(bn&&bn.style.visibility!=='hidden')bn.style.visibility='hidden';const B=G.B,bi=G.bi,ph=G.phase,x=42,y=5,w=318,h=11,r=clamp(G.hp/G.maxHp,0,1);G.hpShow=G.hpShow===undefined?r:(G.hpShow>r?Math.max(r,G.hpShow-.12*(1/60)):r);
 const T=bi>=10?TH2[bi]:null,base=ph>=2?'#ff2d55':ph>=1?'#ffb020':B.c,c1=T?T.tel:B.pal[3],c2=T?T.act:B.pal[2],fr=T?T.dk:B.pal[1],edge=T?T.hi:B.pal[2];
 // 테두리: 로봇은 금속 판+리벳, 괴수는 유기적 가시/비늘
 RA(x-18,y-4,w+26,h+8,'#05090b',.88);R(x-2,y-2,w+4,h+4,fr);R(x-2,y-2,w+4,1,edge);R(x-2,y+h+1,w+4,1,shade(fr,.5));
 if(!T){for(let i=0;i<=w;i+=20){R(x-1+i,y-2,2,1,'#e8eef0');R(x-1+i,y+h+1,2,1,shade(edge,.6))}R(x+w+2,y-3,4,h+6,fr);R(x+w+3,y-2,2,h+4,edge)}
 else{for(let i=0;i<w;i+=9){const hh=2+((i*7+bi*3)%3);R(x+i,y-2-hh,2,hh,fr);R(x+i+4,y+h+2,2,1+((i+bi)%3),fr)}R(x+w+2,y-1,3,h+2,fr)}
 // 아이콘 캡
 R(x-16,y-3,14,h+6,fr);R(x-15,y-2,12,h+4,'#0b1014');barIcon(BAR_ICON[bi]||'gear',x-14,y-1+Math.round((h-10)/2)+1,c1,c2,now);
 // 채움
 R(x,y,w,h,'#140e12');R(x,y,w*G.hpShow,h,'#fff0d0');const fw=w*r;R(x,y,fw,h,shade(base,.55));R(x,y,fw,h-3,base);R(x,y,fw,1,mixc(base,'#ffffff',.6));
 if(!T){for(let i=6;i<fw;i+=12)RA(x+i,y+1,1,h-2,'#000000',.18)}else{for(let i=0;i<fw-3;i+=6)RA(x+i,y+(i/6%2?2:5),4,2,'#ffffff',.12)}
 const sh=((now/1300)%1.5)-.25;if(sh>0&&sh<1)RA(x+fw*sh-5,y,8,h,'#ffffff',.3);if(G.exposed&&Math.floor(now/90)%2)RA(x,y,fw,h,'#ffe79a',.45);
 for(const f of [.66,.33]){const px=x+w*f;R(px,y-1,1,h+2,'#05090b');for(let k=0;k<3;k++)R(px-k,y-3-k,1+k*2,1,r<f?'#555':'#ffe79a')}
 // 숫자
 const hpN=Math.max(0,Math.ceil(G.hp)),txt=hpN.toLocaleString('en-US')+' / '+G.maxHp.toLocaleString('en-US'),OT=(t,tx,al,col,f)=>{ctx.font=f;ctx.textAlign=al;ctx.fillStyle='#05090b';for(const [ox,oy] of [[-1,0],[1,0],[0,-1],[0,1]])ctx.fillText(t,tx+ox,y+h-2+oy);ctx.fillStyle=col;ctx.fillText(t,tx,y+h-2)};OT(B.name,x+4,'left','#ffffff','bold 9px monospace');OT(txt,x+w-4,'right','#ffffff','bold 8px monospace');
 ctx.textAlign='left';ctx.fillStyle='#000';ctx.fillText('◆ PHASE '+(ph+1),x+1,y+h+11);ctx.fillStyle=base;ctx.fillText('◆ PHASE '+(ph+1),x,y+h+10);ctx.textAlign='right';ctx.fillStyle='#000';ctx.fillText(Math.ceil(r*100)+'%',x+w+1,y+h+11);ctx.fillStyle='#e8eef0';ctx.fillText(Math.ceil(r*100)+'%',x+w,y+h+10);ctx.textAlign='left'}
/* ---- 검: 사거리 증가 ---- */
function caveAttack(){if(!C||paused||dlg.active||C.state!=='walk')return;const now=performance.now();if(now<(P.atkCd||0))return;P.atkCd=now+240;
 const RG=48+curWp().range;let best=null,bd=RG;for(const mb of C.mobs){if(!mb.alive)continue;const d=Math.hypot(P.x-mb.x,P.y-8-mb.y);if(d<bd){bd=d;best=mb}}
 const a=best?Math.atan2(best.y-P.y,best.x-P.x):Math.atan2(P.face.y||1,P.face.x||0);C.slashFx.push({x:P.x,y:P.y-11,a,t:now,hit:!!best,big:true});P.lungeT=now;P.lungeA=a;P.lungeDur=160;initAudio();sfx(260,.06,'sawtooth',.03,520);
 for(const mb of C.mobs){if(!mb.alive)continue;const d=Math.hypot(P.x-mb.x,P.y-8-mb.y),da=Math.abs(((Math.atan2(mb.y-P.y,mb.x-P.x)-a+Math.PI*3)%TAU)-Math.PI);if(d<RG&&(da<1.2||d<22)){if(mb.elite&&mb.hp>1){eliteHit(mb,now);continue}if(mb.elite)eliteDie(mb,now);mb.alive=false;addCoins(Math.round(4*(1+(curPet().coin||0))));C.shake=Math.max(C.shake,.55);C.flash=Math.max(C.flash,.3);C.hitstop=now+65;C.rings.push({x:mb.x,y:mb.y,t:now,dur:420,r1:56,col:'#c98cff'});sfx(340,.13,'square',.05,120);sfx(150,.1,'triangle',.04,60);for(let i=0;i<22;i++)C.dust.push({x:mb.x,y:mb.y,vx:(RND()-.5)*150,vy:(RND()-.5)*150-30,l:.5,c:i%3?'#c98cff':'#eeddff'})}}
 if(best)banner('처치! +'+Math.round(4*(1+(curPet().coin||0)))+' 코인')}
/* ---- 잡몹 AI: 순찰 → 추격 → 예비동작 → 돌진 / 원거리 공격 ---- */
function mobMove(mb,dx,dy){const r=6;if(!caveSolid(mb.x+dx+Math.sign(dx)*r,mb.y))mb.x+=dx;if(!caveSolid(mb.x,mb.y+dy+Math.sign(dy)*r))mb.y+=dy}
function mobAI(mb,now,dt){const d=Math.hypot(P.x-mb.x,P.y-8-mb.y)||1;if(mb.ranged===undefined)mb.ranged=C.ci>=10?[11,15,16,18,19].includes(C.ci):(mb.seed%10)<3;mb.st=mb.st||'patrol';
 const sp=(C.ci>=10?50:42)*(mb.elite?1.3:1);
 if(mb.st==='patrol'){const ph=(Math.sin(now/mb.per+mb.seed)+1)/2,tx=lerp(mb.ax,mb.bx,ph),ty=lerp(mb.ay,mb.by,ph);mobMove(mb,(tx-mb.x)*Math.min(1,dt*3),(ty-mb.y)*Math.min(1,dt*3));if(d<125&&now>(mb.calm||0)){mb.st='chase';mb.alertT=now;sfx(500,.06,'square',.02,700)}}
 else if(mb.st==='chase'){mobMove(mb,(P.x-mb.x)/d*sp*dt,(P.y-8-mb.y)/d*sp*dt);if(d>220){mb.st='patrol';mb.calm=now+1500}else if(mb.ranged&&d<160&&d>50&&now>(mb.shotAt||0)){mb.st='aim';mb.t=now}else if(d<42){mb.st='wind';mb.t=now}}
 else if(mb.st==='wind'){if(now-mb.t>430){const a=Math.atan2(P.y-8-mb.y,P.x-mb.x);mb.vx=Math.cos(a)*240;mb.vy=Math.sin(a)*240;mb.st='lunge';mb.t=now;sfx(220,.08,'sawtooth',.03,120)}}
 else if(mb.st==='lunge'){mobMove(mb,mb.vx*dt,mb.vy*dt);if(now-mb.t>230){mb.st='cool';mb.t=now}}
 else if(mb.st==='cool'){if(now-mb.t>750)mb.st='chase'}
 else if(mb.st==='aim'){if(now-mb.t>520){const a=Math.atan2(P.y-8-mb.y,P.x-mb.x),col=C.ci>=10?TH2[C.ci].tel:'#c98cff';for(const da of (C.ci===15||C.ci===19||mb.elite)?[-.2,0,.2]:[0])C.mshots.push({x:mb.x,y:mb.y,vx:Math.cos(a+da)*110,vy:Math.sin(a+da)*110,l:2.4,col});mb.shotAt=now+1900;mb.st='chase';sfx(420,.07,'triangle',.03,260)}}
 const lunging=mb.st==='lunge';if(now>=P.inv&&d<(lunging?15:10)){hurtP(lunging?9:5,now);C.shake=Math.max(C.shake,.5);C.flash=Math.max(C.flash,.24);C.hitstop=now+45;C.rings.push({x:mb.x,y:mb.y,t:now,dur:320,r1:34,col:'#c98cff'});const dx=P.x-mb.x,dy=P.y-mb.y,l=Math.hypot(dx,dy)||1;caveMove(dx/l*22,dy/l*22);mb.st='cool';mb.t=now}}
function mobShots(now,dt){C.mshots=C.mshots||[];for(const s of C.mshots){s.x+=s.vx*dt;s.y+=s.vy*dt;s.l-=dt;if(caveSolid(s.x,s.y))s.l=0;if(s.l>0&&now>=P.inv&&Math.hypot(s.x-P.x,s.y-(P.y-8))<7){hurtP(6,now);s.l=0;C.shake=Math.max(C.shake,.35);for(let i=0;i<6;i++)C.dust.push({x:s.x,y:s.y,vx:(RND()-.5)*80,vy:(RND()-.5)*80,l:.3,c:s.col})}}C.mshots=C.mshots.filter(s=>s.l>0)}
function drawMobExtras(mb,X,Y,now){if(mb.st==='wind'){const k=(now-mb.t)/430;ctx.font='bold 12px monospace';ctx.textAlign='center';ctx.fillStyle=Math.floor(now/60)%2?'#ff4d6d':'#ffffff';ctx.fillText('!',X,Y-16);ctx.textAlign='left';pcirc(X,Y,10+k*6,'#ff4d6d',.18+.2*k)}
 else if(mb.st==='aim'){const k=(now-mb.t)/520;line(X,Y,X+(P.x-mb.x)*k,Y+(P.y-8-mb.y)*k,4,(x,y,i)=>{if(i%2===0)RA(x-1,y-1,2,2,'#ffb0bd',.6)})}
 else if(mb.st==='lunge'){for(let k=1;k<4;k++)RA(X-mb.vx*.012*k-5,Y-mb.vy*.012*k-5,10,10,'#ffffff',.18-k*.04)}
 else if(mb.st==='chase'&&now-(mb.alertT||0)<500){ctx.font='bold 10px monospace';ctx.textAlign='center';ctx.fillStyle='#ffe79a';ctx.fillText('?!',X,Y-16);ctx.textAlign='left'}}
/* ---- 반격: PC는 Q·W·E·R, 모바일은 터치 ---- */
const HITKEYS=['Q','W','E','R'];
function isTouchUI(){return document.body&&document.body.classList&&document.body.classList.contains('touch')}
addEventListener('keydown',e=>{if(mode!=='boss'||paused||dlg.active||!G||G.state!=='play'||e.repeat)return;const m=/^Key([QWER])$/.exec(e.code);if(!m||!G.vuln)return;e.preventDefault();const now=performance.now();if(now<(G.keyLock||0))return;const c=G.clickTarget;if(!c)return;
 if(m[1]===c.key)doAttack({x:c.x,y:c.y});else{G.keyLock=now+300;G.combo=0;G.pops.push({x:c.x,y:c.y-20,t:now,tx:'✕ '+m[1]+' 아님 · '+c.key+'!',col:'#ff8a9a'});sfx(130,.15,'square',.05,70);G.shake=Math.max(G.shake,.15)}});
/* ---- 로비 타이틀 ---- */
function drawTitle(now){const c=tctx;c.imageSmoothingEnabled=false;const g=c.createLinearGradient(0,0,0,190);g.addColorStop(0,'#081018');g.addColorStop(.6,'#12303a');g.addColorStop(1,'#1c3a3a');c.fillStyle=g;c.fillRect(0,0,480,190);
 for(let i=0;i<70;i++){const tw=.4+.6*Math.abs(Math.sin(now/600+i*1.7));c.globalAlpha=tw;c.fillStyle=i%5?'#9ad0d8':'#ffe79a';c.fillRect((i*97)%480,(i*53)%120,i%7?1:2,i%7?1:2)}c.globalAlpha=1;
 pcirc(300,38,24,'#ffe8b0',.22,c);pcirc(300,38,12,'#fff4d8',1,c);
 for(let L=0;L<3;L++){const off=(now/(90-L*25))%480;c.fillStyle=['#0f2228','#14303a','#1a3c44'][L];for(let i=-1;i<10;i++){const x=((i*58+(L*29))-off*(L+1)*.15)%540-30,h=40+((i*37+L*13)%40)+L*10;c.fillRect(x,150-h+L*6,40,h)}}
 c.fillStyle='#22383a';c.fillRect(0,150,480,40);c.fillStyle='#4a7a6a';c.fillRect(0,148,480,2);for(let i=0;i<24;i++){c.fillStyle=i%2?'#1c2f33':'#243a3e';c.fillRect(i*20-((now/30)%20),158,20,32)}
 const B=BOSSES[9],bx=432,by=150,u=2.2,g2=geo(B,bx,by,u),pul=Math.max(0,Math.sin(now/300));pcirc(bx,g2.coreY,g2.hf*u*2,'#ff4d6d',.1+.08*pul,c);drawMech(c,B,bx,by,now,{pulse:pul*.5},u);const hs=idleHandsAt(B,bx,by,u);hs.forEach((h,i)=>{h.y+=Math.sin(now/400+i*2)*2;drawHand(c,B,h,g2.sh[i][0],g2.sh[i][1],now,false,.6)});
 const hx=352,fy=150,s3=3;c.globalAlpha=.4;c.fillStyle='#000';c.fillRect(hx-15,fy-2,30,3);c.globalAlpha=1;
 pcirc(hx,fy-22,30,'#a6f5c6',.08+.04*Math.sin(now/400),c);
 drawKnight(c,hx-6*s3,fy-11*s3,s3,false,null,now/430);drawPet(c,shopInv().eq.pt||0,hx-30,fy-58+Math.sin(now/300)*3,now,1.5);if(Math.floor(now/500)%2){c.font='bold 9px monospace';c.textAlign='center';c.fillStyle='#ffe79a';c.fillText('▼ 클릭',hx,fy-80);c.textAlign='left'}
 const nm=PNAME();c.font='bold 10px monospace';c.textAlign='center';const tw2=c.measureText(nm).width+12;c.fillStyle='#05090bcc';c.fillRect(hx-tw2/2,fy-74,tw2,14);c.fillStyle='#a6f5c6';c.fillRect(hx-tw2/2,fy-74,tw2,2);c.fillStyle='#ffffff';c.fillText(nm,hx,fy-63);c.textAlign='left';try{drawTitle2(now)}catch(e){}
 for(let i=0;i<14;i++){const ph=((now/2400)+i/14)%1;c.globalAlpha=(1-ph)*.8;c.fillStyle=i%2?'#ffe79a':'#a6f5c6';c.fillRect(260+(i*31)%210+Math.sin(ph*6+i)*8,150-ph*120,2,2)}c.globalAlpha=1}
/* ---- 로비: 이름 정하기 ---- */
function setupNamePanel(){if($('namePanel'))return;const host=document.querySelector('main .pagerNav');if(!host)return;
 host.insertAdjacentHTML('beforebegin','<section class="panel glowPanel" id="namePanel"><div class="row" style="justify-content:space-between"><h3 style="margin:0">✦ 모험가 이름</h3><span class="small" id="nameHello"></span></div><div class="row" style="margin-top:10px"><input id="nameIn" maxlength="8" placeholder="이름 (최대 8자)" autocomplete="off"><button class="primary" id="nameSave">저장</button><button id="nameReset">기본값(하루)</button></div><p class="small" style="margin-top:8px">이야기 속 대사와 이름표가 이 이름으로 바뀌어요.</p></section>');
 const inp=$('nameIn');inp.value=saveData.name||'';const hello=()=>{$('nameHello').textContent='안녕, '+PNAME()+'!'};hello();
 const save=v=>{saveData.name=String(v||'').replace(/[<>]/g,'').trim().slice(0,8);saveNow();hello();inp.value=saveData.name;const b=$('nameSave');b.textContent='✓ 저장됨';setTimeout(()=>b.textContent='저장',1200)};
 $('nameSave').onclick=()=>save(inp.value);$('nameReset').onclick=()=>save('');inp.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Enter')save(inp.value)})}
/*UPD3_END*/
/*SHOP_BEGIN*/
