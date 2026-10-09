/* ================= v50 챕터 7을 로비 배경 · 명예의 전당 · 내 이미지로 바꾸기에 추가 ================= */
(function(){try{
 const L7=window.S7ART,SC=window.S7SC;if(!L7||!SC)return;
 const unlocked=()=>typeof s7Unlocked==='function'&&s7Unlocked(),ci=()=>{try{return (s7Save().ci)||0}catch(e){return 0}};

 /* ---------- 1) 로비 배경: '거울 속 시계골' ---------- */
 try{LB_THEMES.push(['c7','🪞','거울 속 시계골','CHAPTER 7 · REVERSE']);LV_COL.c7=['#b48aff','#5af0e0','#e0ccff','#ff7ad0'];
  if(typeof LP_ALB!=='undefined')LP_ALB.c7=LP_ALB.c7||Object.assign({},LP_ALB.c3||LP_ALB.c1,{t:'REVERSE'});if(typeof LW_P!=='undefined')LW_P.c7=LW_P.c7||LW_P.c3||LW_P.c1}catch(e){}
 {const base=lbLocked;lbLocked=function(th){if(th==='c7')return !unlocked();return base.apply(this,arguments)}}
 {const base=lbTheme;lbTheme=function(){let v='auto';try{v=saveData.lobbyBg||'auto'}catch(e){}if(v==='c7')return unlocked()?'c7':'c1';if(v==='auto'&&ci()>0&&unlocked())return 'c7';return base.apply(this,arguments)}}
 {const base=lbCv;lbCv=function(th){return th==='c7'?$('titleCv7'):base.apply(this,arguments)}}
 /* 로비 화면 속 장면: 지금 거울의 하늘과 그 보스 */
 function lobbyTitle(now){const cv=$('titleCv7');if(!cv)return;const c=cv.getContext('2d'),T=now/1000,k=Math.min(9,ci()),b=L7[k],tone=SC.TONE(k);c.imageSmoothingEnabled=false;c.save();c.scale(1,190/270);SC.sky(c,tone,T);SC.hangTown(c,T,.45,tone===2?'#3a3260':'#8492b0');SC.tower(c,120,232,.8,T*2,ci()>=10);SC.floor(c,tone);c.restore();
  const g=c.createRadialGradient(330,120,4,330,120,90);g.addColorStop(0,b.c+'55');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(230,20,200,170);
  try{c3ArtOn(c,b.art,330,180+Math.sin(T*1.6)*2,now,5.4,{pulse:.15})}catch(e){}SC.tickM(c,250,90+Math.sin(T*3)*3,1.3)}
 {const base=menuTick;menuTick=function(now){try{if(GM.scr==='main'&&mode==='menu'&&lbTheme()==='c7')lobbyTitle(now)}catch(e){}return base.apply(this,arguments)}}
 /* 로비 무대 장식: 떠다니는 거울 조각 · 위아래로 비친 빛줄기 */
 {const base=lvDraw;lvDraw=function(now){const r=base.apply(this,arguments);try{if(lbTheme()!=='c7')return r;const cv=$('lvCv'),c=cv.getContext('2d'),w=cv.width,h=cv.height,t=now/1000,u=h/540;c.save();c.setTransform(1,0,0,1,0,0);
  c.globalAlpha=.08;c.fillStyle='#b48aff';c.fillRect(0,0,w,h);
  for(let i=0;i<14;i++){const x=((i*.137+t*.01*(1+i%3))%1.2-.1)*w,y=h*(.08+((i*41)%55)/100)+Math.sin(t*1.2+i)*h*.01,s=(6+(i*7)%10)*u,a=t*.4+i;c.save();c.translate(x,y);c.rotate(a);c.globalAlpha=.18+.12*Math.sin(t*2+i);c.fillStyle=i%2?'#e0ccff':'#b8fff6';c.beginPath();c.moveTo(0,-s);c.lineTo(s*.6,0);c.lineTo(0,s*.8);c.lineTo(-s*.5,s*.1);c.closePath();c.fill();c.globalAlpha*=1.6;c.fillStyle='#ffffff';c.fillRect(-s*.1,-s*.6,Math.max(1,u),s*.6);c.restore()}
  c.globalAlpha=.12;c.fillStyle='#ffffff';for(let i=0;i<3;i++){const x=w*(.2+i*.3)+Math.sin(t*.3+i)*w*.02;c.beginPath();c.moveTo(x,0);c.lineTo(x+w*.04,0);c.lineTo(x-w*.06,h);c.lineTo(x-w*.1,h);c.fill()}
  c.restore()}catch(e){}return r}}

 /* ---------- 2) 명예의 전당: 일곱 번째 별자리 '거울자리' (좌우 대칭) ---------- */
 try{HF_CON.push({name:'거울자리',en:'THE MIRROR',col:'#b48aff',pts:[[.5,.06],[.26,.22],[.74,.22],[.18,.5],[.82,.5],[.26,.78],[.74,.78],[.5,.94],[.38,.5],[.62,.5]],edges:[[0,1],[0,2],[1,3],[2,4],[3,5],[4,6],[5,7],[6,7],[8,9],[0,8],[0,9],[7,8],[7,9]]});HF_W.push([1620,10])}catch(e){console.error('v50 hf con',e)}
 {const base=hfData;hfData=function(){const out=base.apply(this,arguments);try{if(out.length<60)return out;const o='PSABC',sealed=!unlocked(),sv=s7Save().best||{},r=saveData.s7rush||{};
  for(let k=0;k<10;k++){const b=L7[k];let rk=null,per={};for(const [d] of HF_DIFF){const v=r[k+'|'+d];per[d]=v||null;if(v&&(rk===null||o.indexOf(v)<o.indexOf(rk)))rk=v}const st=sv[k]||null;if(st&&(rk===null||o.indexOf(st)<o.indexOf(rk)))rk=st;
   out.push({ch:6,k,art:b.art,rk:sealed?null:rk,per:sealed?{}:per,name:b.name,en:b.en,c:b.c,key:'r'+k,epi:(window.S7STORY&&S7STORY[k].title)||'',story:!!st,sealed})}}catch(e){console.error('v50 hf',e)}return out}}
 HF_BADGE=function(){try{const D=hfData();const n=D.length>60&&!D[60].sealed?70:D.length>50&&!D[50].sealed?60:D.length>40&&!D[40].sealed?50:D.length>30&&!D[30].sealed?40:30;return D.filter(x=>x.rk).length+'/'+n}catch(e){return ''}};
 /* 별자리 그림: 손거울 + 가운데 비침선 */
 {const base=hfFigure;hfFigure=function(c,ch,cc,sz,a,col,t){if(ch!==6)return base.apply(this,arguments);c.save();c.globalAlpha=a;c.strokeStyle=col;c.lineWidth=1;c.translate(cc.x,cc.y-sz*.08);
  c.beginPath();c.ellipse(0,-sz*.06,sz*.26,sz*.34,0,0,TAU);c.stroke();c.beginPath();c.ellipse(0,-sz*.06,sz*.22,sz*.3,0,0,TAU);c.stroke();c.beginPath();c.moveTo(-sz*.04,sz*.28);c.lineTo(-sz*.04,sz*.5);c.lineTo(sz*.04,sz*.5);c.lineTo(sz*.04,sz*.28);c.stroke();
  const q=(t*.25)%1;c.globalAlpha=a*Math.sin(q*Math.PI);c.beginPath();c.moveTo(-sz*.14+q*sz*.2,-sz*.3);c.lineTo(-sz*.2+q*sz*.2,sz*.14);c.stroke();c.restore();c.globalAlpha=1}}
 /* 별 설명 문구 */
 {const base=hfPlaque;hfPlaque=function(){const r=base.apply(this,arguments);try{const pl=$('hfPlaque'),x=HF.data&&HF.data[HF.sel];if(!pl||!x||x.ch!==6)return r;const known=!!x.rk;
  if(x.sealed){const en=pl.querySelector('.hfEn');if(en)en.textContent='탑을 더 높이 오르면 봉인이 풀려요'}
  const g=pl.querySelector('.hfGoal');if(g&&!known)g.textContent=x.sealed?'탑을 더 높이 오르면 이 별자리의 봉인이 풀려요':'탑 보스 층이나 보스 러시에서 이 수호자를 쓰러뜨리면 별이 켜져요'}catch(e){}return r}}

 /* ---------- 3) 내 이미지로 바꾸기: 챕터 7 전투 배경 + 보스 10명 ---------- */
 {const base=modSlots;modSlots=function(){return base().concat([{id:'bg7',name:'전투 배경 · 챕터 7',hint:''}],L7.map((b,k)=>({id:'c7boss'+k,name:'REVERSE '+String(k+1).padStart(2,'0')+' '+b.name,c7:k,hint:'아래쪽 가운데가 발밑이 되게'})))}}
 /* 보스 그림 */
 {const base=c3Art;c3Art=function(c,B,x,y,t,o,u,id){const k=L7.findIndex(b=>b.art===id),M=k>=0&&MODS['c7boss'+k];if(M){modDrawBossImg(c,M,B,x,y,t,o||{},u||U);return}return base.apply(this,arguments)}}
 /* 전투 배경: 거울 전장 위에 내 그림을 경기장 크기로 */
 const AC7=new Map();
 {const base=arenaCanvas;arenaCanvas=function(bi){const cv=base.apply(this,arguments);try{if(!(typeof G!=='undefined'&&G&&G.s7!=null))return cv;const M=MODS.bg7;if(!M||!cv)return cv;const key=G.s7+'|'+_modVer;let c2=AC7.get(key);if(c2)return c2;
  c2=document.createElement('canvas');c2.width=W*2;c2.height=H*2;c2._hd=true;const x=c2.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(cv,0,0,W*2,H*2);x.setTransform(2,0,0,2,0,0);const sc=Math.max(AW/M.fw,AH/M.fh),w=M.fw*sc,h=M.fh*sc;x.save();x.beginPath();x.rect(AX,AY,AW,AH);x.clip();x.drawImage(M.img,0,0,M.fw,M.fh,AX+(AW-w)/2,AY+(AH-h)/2,w,h);x.restore();AC7.set(key,c2);return c2}catch(e){return cv}}}
 /* 이미지 창: '챕터 7 보스' 칸을 따로 만들고 미리보기 그림을 채움 */
 {const base=modOpen;modOpen=function(){const r=base.apply(this,arguments);try{const m=$('modPanel');if(!m)return r;const box=m.querySelector('.mBox');if(!box||m.querySelector('#modG7'))return r;
  const sec=document.createElement('div');sec.className='sec';sec.textContent='챕터 7 보스';const g=document.createElement('div');g.className='grid';g.id='modG7';box.appendChild(sec);box.appendChild(g);
  m.querySelectorAll('.slot').forEach(d=>{const nm=d.querySelector('.nm');if(!nm||nm.textContent.indexOf('REVERSE ')!==0)return;const k=+nm.textContent.slice(8,10)-1;g.appendChild(d);const th=d.querySelector('.th');if(th&&!th.querySelector('img')){th.textContent='';const cv=document.createElement('canvas');cv.width=48;cv.height=48;const x=cv.getContext('2d');x.imageSmoothingEnabled=false;try{c3ArtOn(x,L7[k].art,24,44,0,1.4,{still:true})}catch(e){}th.appendChild(cv)}})}catch(e){console.error('v50 mod',e)}return r}}
}catch(e){console.error('v50 ch7 extras',e)}})();
