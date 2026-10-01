/* ================= v43 보스 러시 화면: 가운데 보스가 가끔 자기 공격 동작(준비 → 발사 → 반동)을 보여줌 ================= */
(function(){
 const P=4.8;/* 한 번의 시연 주기(초) */
 const deckOf=o=>{try{if(o.bi!=null&&DECK[o.bi])return DECK[o.bi].map(d=>d[0]);if(o.art){const X=C3BOSS[o.art];if(X&&X.deck)return X.deck.map(d=>d[0]);const s4=(typeof S4!=='undefined'?S4:[]).find(s=>s.art===o.art);if(s4)return s4Deck(s4).map(d=>d[0]);const s5=(typeof S5!=='undefined'?S5:[]).find(s=>s.art===o.art);if(s5)return [s5.sig].concat(Object.keys(MON.alias).slice(0,0))}}catch(e){}return []};
 const seedOf=s=>{let h=7;s=String(s);for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return (h%1000)/1000};
 /* 시연 상태: tc(주기 안 시간), 패턴 이름, 준비/발사 정도 */
 function state(o,now){const names=deckOf(o);if(!names.length)return null;const id=o.art||o.bi,t=now/1000+seedOf(id)*P,cyc=Math.floor(t/P),tc=t-cyc*P,n=names[cyc%names.length];return {n,tc,win:tc<1.3?tc/1.3:0,rel:tc>=1.3&&tc<1.8?1-(tc-1.3)/.5:0,act:tc<2.4}}
 function fx(c,o,x,y,u,now,st){if(!st||!st.act)return;const col=o.c||'#ffffff',cy=y-18*u,t=now/1000;c.save();
  if(st.win>0){/* 기를 모음: 몸 쪽으로 빨려드는 빛 */const k=st.win;c.globalCompositeOperation='lighter';for(let i=0;i<10;i++){const a=t*4+i*TAU/10,r=(1-((t*1.6+i/10)%1))*30*u/3;c.globalAlpha=.6*k;c.fillStyle=i%2?col:'#ffffff';c.fillRect(Math.round(x+Math.cos(a)*r),Math.round(cy+Math.sin(a)*r*.7),2,2)}
   const g=c.createRadialGradient(x,cy,0,x,cy,24*u/3*(.5+k));g.addColorStop(0,'rgba(255,255,255,'+(.5*k)+')');g.addColorStop(1,'rgba(0,0,0,0)');c.globalAlpha=1;c.fillStyle=g;c.fillRect(x-80,cy-80,160,160)}
  if(st.rel>0){/* 발사: 섬광 + 퍼지는 고리 + 바닥 충격파 */const k=st.rel,q=1-k;c.globalCompositeOperation='lighter';c.globalAlpha=k;c.strokeStyle='#ffffff';c.lineWidth=2;c.beginPath();c.arc(x,cy,6+q*40*u/3,0,TAU);c.stroke();c.strokeStyle=col;c.beginPath();c.arc(x,cy,10+q*70*u/3,0,TAU);c.stroke();
   c.globalAlpha=k*.8;c.beginPath();c.ellipse(x,y,10+q*90*u/3,3+q*14*u/3,0,0,TAU);c.stroke();for(let i=0;i<12;i++){const a=i*TAU/12+t,r1=8+q*55*u/3,r2=r1+8;c.globalAlpha=k*.7;c.beginPath();c.moveTo(x+Math.cos(a)*r1,cy+Math.sin(a)*r1);c.lineTo(x+Math.cos(a)*r2,cy+Math.sin(a)*r2);c.stroke()}}
  c.restore()}
 /* 시연 중 몸 움직임: 준비 땐 살짝 들어 올렸다가, 발사 땐 앞으로 쿵 + 떨림 */
 const bodyOff=st=>{if(!st||!st.act)return [0,0];if(st.win>0)return [st.win>.75?(Math.floor(performance.now()/45)%2?1:-1):0,-2*st.win];if(st.rel>0)return [(Math.floor(performance.now()/40)%2?1.5:-1.5)*st.rel,3*st.rel];return [0,0]};
 try{const _rd=rqDrawBoss;rqDrawBoss=function(c,o,x,y,now,u,bo){if(!bo||bo.dorm)return _rd.apply(this,arguments);const st=state(o,now);if(!st)return _rd.apply(this,arguments);
   const b2=Object.assign({},bo);if(st.act){b2.__pat={n:st.n,chan:(typeof CHAN!=='undefined'&&CHAN[st.n])||'',e:st.tc};b2.__act=st.tc<1.8?st.n:null;b2.pulse=Math.max(bo.pulse||0,st.rel);b2.warn=st.win*.6}
   const [ox,oy]=bodyOff(st);const r=_rd.call(this,c,o,x+ox,y+oy,now,u,b2);try{fx(c,o,x,y,u,now,st)}catch(e){}return r}}catch(e){console.error('v43 rush',e)}
 /* 챕터 5 패널 미리보기도 같은 방식 */
 try{const _ca=c3ArtOn;c3ArtOn=function(c,art,x,y,now,u,o){if(!(typeof S5UI!=='undefined'&&S5UI.open&&u===3.5&&o&&o.pulse===.1&&c.canvas&&c.canvas.id==='s5Preview'))return _ca.apply(this,arguments);
   const s5=S5.find(s=>s.art===art),ob={art,c:s5&&s5.c};const st=state(ob,now);if(!st)return _ca.apply(this,arguments);const o2=Object.assign({},o);if(st.act){o2.__pat={n:st.n,chan:'',e:st.tc};o2.__act=st.tc<1.8?st.n:null;o2.pulse=Math.max(o.pulse,st.rel)}
   const [ox,oy]=bodyOff(st);const r=_ca.call(this,c,art,x+ox,y+oy,now,u,o2);try{fx(c,ob,x,y,u,now,st)}catch(e){}return r}}catch(e){}
})();

