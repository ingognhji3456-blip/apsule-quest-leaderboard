/* ================= v47 챕터 6을 로비 배경 · 명예의 전당 · 내 이미지로 바꾸기에 추가 ================= */
(function(){try{
 const L6=window.S6ART,SC=window.S6SC;if(!L6||!SC)return;
 const unlocked=()=>typeof s6Unlocked==='function'&&s6Unlocked(),ci=()=>{try{return (s6Save().ci)||0}catch(e){return 0}};

 /* ---------- 1) 로비 배경: '바람이 머무는 곳' ---------- */
 try{LB_THEMES.push(['c6','🪁','바람이 머무는 곳','CHAPTER 6 · ZENITH']);LV_COL.c6=['#ffd08a','#8ad8ff','#ff8ab0','#a6f5c6'];
  if(typeof LP_ALB!=='undefined')LP_ALB.c6=LP_ALB.c6||Object.assign({},LP_ALB.c3||LP_ALB.c1,{t:'ZENITH'});if(typeof LW_P!=='undefined')LW_P.c6=LW_P.c6||LW_P.c3||LW_P.c1}catch(e){}
 {const base=lbLocked;lbLocked=function(th){if(th==='c6')return !unlocked();return base.apply(this,arguments)}}
 {const base=lbTheme;lbTheme=function(){let v='auto';try{v=saveData.lobbyBg||'auto'}catch(e){}if(v==='c6')return unlocked()?'c6':'c1';if(v==='auto'&&ci()>0&&unlocked())return 'c6';return base.apply(this,arguments)}}
 {const base=lbCv;lbCv=function(th){return th==='c6'?$('titleCv6'):base.apply(this,arguments)}}
 /* 로비 화면 속 장면: 지금 바람길의 하늘과 그 보스 */
 function lobbyTitle(now){const cv=$('titleCv6');if(!cv)return;const c=cv.getContext('2d'),T=now/1000,k=Math.min(9,ci()),b=L6[k],tone=SC.TONE(k);c.imageSmoothingEnabled=false;c.save();c.scale(1,190/270);SC.sky(c,tone,T);SC.windLines(c,T,tone===2?.25:.4);SC.city(c,120,80,.7,T,false);c.restore();
  const g=c.createRadialGradient(330,120,4,330,120,90);g.addColorStop(0,b.c+'55');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(230,20,200,170);
  try{c3ArtOn(c,b.art,330,184+Math.sin(T*1.6)*2,now,6.2,{pulse:.15})}catch(e){}for(let i=0;i<3;i++)SC.kite(c,(i*170+T*18)%560-40,40+i*24+Math.sin(T*2+i)*5,1.3,['#ff6a5a','#ffd08a','#5ad0b0'][i],Math.sin(T+i)*.4,.8)}
 {const base=menuTick;menuTick=function(now){try{if(GM.scr==='main'&&mode==='menu'&&lbTheme()==='c6')lobbyTitle(now)}catch(e){}return base.apply(this,arguments)}}
 /* 로비 무대 장식: 흘러가는 구름 · 연 · 바람 줄기 */
 {const base=lvDraw;lvDraw=function(now){const r=base.apply(this,arguments);try{if(lbTheme()!=='c6')return r;const cv=$('lvCv'),c=cv.getContext('2d'),w=cv.width,h=cv.height,t=now/1000,u=h/540;c.save();c.setTransform(1,0,0,1,0,0);
  c.globalAlpha=.07;c.fillStyle='#ffd8a0';c.fillRect(0,0,w,h);
  for(let i=0;i<6;i++){const x=((i*.23+t*.012*(1+i%3))%1.3-.15)*w,y=h*(.08+i*.07);c.globalAlpha=.12;c.fillStyle='#ffffff';for(let j=0;j<4;j++){c.beginPath();c.ellipse(x+j*w*.03,y+Math.sin(j*1.7)*u*4,w*.04,h*.018,0,0,TAU);c.fill()}}
  for(let i=0;i<18;i++){const q=(t*.35+i*.137)%1,x=q*w*1.2-w*.1,y=h*(.1+((i*53)%60)/100);c.globalAlpha=Math.sin(q*Math.PI)*.35;c.fillStyle='#ffffff';c.fillRect(Math.round(x),Math.round(y),Math.round(w*.05),Math.max(1,Math.round(u)))}
  for(let i=0;i<3;i++){const x=w*(.15+i*.33)+Math.sin(t*.5+i)*w*.03,y=h*(.12+i*.05)+Math.sin(t*1.3+i)*h*.015;c.strokeStyle='#ffffff';c.globalAlpha=.25;c.lineWidth=Math.max(1,u);c.beginPath();c.moveTo(x,y+12*u);c.quadraticCurveTo(x-20*u,y+60*u,x-8*u,h*.55);c.stroke();SC.kite(c,x,y,2.2*u,['#ff6a5a','#ffd08a','#8ad8ff'][i],Math.sin(t+i)*.3,.85)}
  c.restore()}catch(e){}return r}}

 /* ---------- 2) 명예의 전당: 여섯 번째 별자리 '연자리' ---------- */
 try{HF_CON.push({name:'연자리',en:'THE KITE',col:'#ffd08a',pts:[[.5,.04],[.22,.32],[.78,.32],[.5,.3],[.5,.62],[.44,.72],[.56,.8],[.45,.88],[.36,.76],[.6,.96]],edges:[[0,1],[0,2],[1,4],[2,4],[0,3],[3,4],[1,3],[3,2],[4,5],[5,6],[6,7],[7,9],[5,8]]});HF_W.push([1350,-30])}catch(e){console.error('v47 hf con',e)}
 {const base=hfData;hfData=function(){const out=base.apply(this,arguments);try{if(out.length<50)return out;const o='PSABC',sealed=!unlocked(),sv=s6Save().best||{},r=saveData.s6rush||{};
  for(let k=0;k<10;k++){const b=L6[k];let rk=null,per={};for(const [d] of HF_DIFF){const v=r[k+'|'+d];per[d]=v||null;if(v&&(rk===null||o.indexOf(v)<o.indexOf(rk)))rk=v}const st=sv[k]||null;if(st&&(rk===null||o.indexOf(st)<o.indexOf(rk)))rk=st;
   out.push({ch:5,k,art:b.art,rk:sealed?null:rk,per:sealed?{}:per,name:b.name,en:b.en,c:b.c==='#ffffff'?'#e8f0ff':b.c,key:'z'+k,epi:(window.S6STORY&&S6STORY[k].title)||'',story:!!st,sealed})}}catch(e){console.error('v47 hf',e)}return out}}
 HF_BADGE=function(){try{const D=hfData();const n=D.length>50&&!D[50].sealed?60:D.length>40&&!D[40].sealed?50:D.length>30&&!D[30].sealed?40:30;return D.filter(x=>x.rk).length+'/'+n}catch(e){return ''}};
 /* 별자리 그림: 바람에 흔들리는 연 + 연줄 */
 {const base=hfFigure;hfFigure=function(c,ch,cc,sz,a,col,t){if(ch!==5)return base.apply(this,arguments);c.save();c.globalAlpha=a;c.strokeStyle=col;c.lineWidth=1;c.translate(cc.x,cc.y-sz*.12);const sw=Math.sin(t*.8)*.07;c.rotate(sw);
  c.beginPath();c.moveTo(0,-sz*.46);c.lineTo(sz*.3,-sz*.16);c.lineTo(0,sz*.22);c.lineTo(-sz*.3,-sz*.16);c.closePath();c.stroke();c.beginPath();c.moveTo(0,-sz*.46);c.lineTo(0,sz*.22);c.moveTo(-sz*.3,-sz*.16);c.lineTo(sz*.3,-sz*.16);c.stroke();
  c.beginPath();c.moveTo(0,sz*.22);for(let i=1;i<=8;i++)c.lineTo(Math.sin(t*1.5+i*.9)*sz*.06,sz*.22+i*sz*.05);c.stroke();for(let i=0;i<3;i++){const y=sz*(.32+i*.1),x=Math.sin(t*1.5+i*2.4)*sz*.06;c.beginPath();c.moveTo(x-sz*.04,y-sz*.02);c.lineTo(x,y);c.lineTo(x-sz*.04,y+sz*.02);c.stroke()}
  c.restore();c.globalAlpha=1}}
 /* 별 설명 문구 */
 {const base=hfPlaque;hfPlaque=function(){const r=base.apply(this,arguments);try{const pl=$('hfPlaque'),x=HF.data&&HF.data[HF.sel];if(!pl||!x||x.ch!==5)return r;const known=!!x.rk;
  if(x.sealed){const en=pl.querySelector('.hfEn');if(en)en.textContent='챕터 5의 마지막 수문을 해방하면 봉인이 풀려요'}
  const g=pl.querySelector('.hfGoal');if(g&&!known)g.textContent=x.sealed?'챕터 5의 마지막 수문을 해방하면 여섯 번째 챕터 「바람이 머무는 곳」이 열려요':'챕터 6 · '+(x.k+1)+'번째 바람길의 보스를 쓰러뜨리면 이 별이 켜져요'}catch(e){}return r}}

 /* ---------- 3) 내 이미지로 바꾸기: 챕터 6 전투 배경 + 보스 10명 ---------- */
 {const base=modSlots;modSlots=function(){return base().concat([{id:'bg6',name:'전투 배경 · 챕터 6',hint:''}],L6.map((b,k)=>({id:'c6boss'+k,name:'ZENITH '+String(k+1).padStart(2,'0')+' '+b.name,c6:k,hint:'아래쪽 가운데가 발밑이 되게'})))}}
 /* 보스 그림 */
 {const base=c3Art;c3Art=function(c,B,x,y,t,o,u,id){const k=L6.findIndex(b=>b.art===id),M=k>=0&&MODS['c6boss'+k];if(M){modDrawBossImg(c,M,B,x,y,t,o||{},u||U);return}return base.apply(this,arguments)}}
 /* 전투 배경: 하늘 전장 위에 내 그림을 경기장 크기로 */
 const AC6=new Map();
 {const base=arenaCanvas;arenaCanvas=function(bi){const cv=base.apply(this,arguments);try{if(!(typeof G!=='undefined'&&G&&G.s6!=null))return cv;const M=MODS.bg6;if(!M||!cv)return cv;const key=G.s6+'|'+_modVer;let c2=AC6.get(key);if(c2)return c2;
  c2=document.createElement('canvas');c2.width=W*2;c2.height=H*2;c2._hd=true;const x=c2.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(cv,0,0,W*2,H*2);x.setTransform(2,0,0,2,0,0);const sc=Math.max(AW/M.fw,AH/M.fh),w=M.fw*sc,h=M.fh*sc;x.save();x.beginPath();x.rect(AX,AY,AW,AH);x.clip();x.drawImage(M.img,0,0,M.fw,M.fh,AX+(AW-w)/2,AY+(AH-h)/2,w,h);x.restore();AC6.set(key,c2);return c2}catch(e){return cv}}}
 /* 이미지 창: '챕터 6 보스' 칸을 따로 만들고 미리보기 그림을 채움 */
 {const base=modOpen;modOpen=function(){const r=base.apply(this,arguments);try{const m=$('modPanel');if(!m)return r;const box=m.querySelector('.mBox');if(!box||m.querySelector('#modG6'))return r;
  const sec=document.createElement('div');sec.className='sec';sec.textContent='챕터 6 보스';const g=document.createElement('div');g.className='grid';g.id='modG6';box.appendChild(sec);box.appendChild(g);
  m.querySelectorAll('.slot').forEach(d=>{const nm=d.querySelector('.nm');if(!nm||nm.textContent.indexOf('ZENITH ')!==0)return;const k=+nm.textContent.slice(7,9)-1;g.appendChild(d);const th=d.querySelector('.th');if(th&&!th.querySelector('img')){th.textContent='';const cv=document.createElement('canvas');cv.width=48;cv.height=48;const x=cv.getContext('2d');x.imageSmoothingEnabled=false;try{c3ArtOn(x,L6[k].art,24,44,0,1.6,{still:true})}catch(e){}th.appendChild(cv)}})}catch(e){console.error('v47 mod',e)}return r}}
}catch(e){console.error('v47 ch6 extras',e)}})();
