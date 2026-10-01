/* ================= v43 전투 맵 퀄리티: 깊이감 있는 대기층 (빛줄기 · 보스 발밑 광원 · 챕터별 떠다니는 입자 · 박자 바닥 파동 · 바닥 안개 · 비네트) ================= */
(function(){
 const chOf=()=>{try{if(G.s5!=null||G._s5hold!=null)return 5;if(G.s4!=null||G.s4Rush!=null)return 4;if(typeof _c3Swap!=='undefined'&&_c3Swap&&_c3Swap.art)return 3;return G.bi<10?1:2}catch(e){return 1}};
 const TH={1:{ray:'#ffe2b0',mote:['#ffb050','#ffe79a','#ffffff'],fog:'#0b1418',kind:'spark'},2:{ray:'#ffb0c8',mote:['#ff5d8f','#ffb070','#caff6b'],fog:'#14060c',kind:'ember'},3:{ray:'#ffe8c0',mote:['#e8d8b0','#c8b088','#ffffff'],fog:'#140f08',kind:'dust'},4:{ray:'#d8d0ff',mote:['#ffffff','#c8b8ff','#9af0ff'],fog:'#05040e',kind:'star'},5:{ray:'#bff4ff',mote:['#bff4ff','#8ae8ff','#ffffff'],fog:'#021018',kind:'bubble'}};
 const AR={vg:null,vgKey:''};
 function layers(now,beat){if(!G||!G.B)return;const ch=chOf(),T=TH[ch],t=now/1000,g=bgeo(),col=G.B.c||'#ffffff';
  ctx.save();
  /* 1) 위에서 내려오는 빛줄기 (천천히 흔들림) */ctx.globalCompositeOperation='lighter';for(let i=0;i<4;i++){const x=AX+AW*(.15+i*.24)+Math.sin(t*.25+i*1.7)*18,w=16+(i%2)*10;ctx.globalAlpha=.045+.025*Math.sin(t*.6+i);const gr=ctx.createLinearGradient(0,AY,0,AY+AH);gr.addColorStop(0,T.ray);gr.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(x-w*.4,AY);ctx.lineTo(x+w*.4,AY);ctx.lineTo(x+w*2.2,AY+AH);ctx.lineTo(x-w*1.4,AY+AH);ctx.closePath();ctx.fill()}
  /* 2) 보스 발밑 광원 + 바닥에 비친 빛 */const pul=Math.pow(1-((beat%1+1)%1),3);ctx.globalAlpha=.16+.08*pul;const R=g.hf*U*2.4+30,lg=ctx.createRadialGradient(g.x,g.y,4,g.x,g.y,R);lg.addColorStop(0,col);lg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=lg;ctx.save();ctx.translate(g.x,g.y);ctx.scale(1,.32);ctx.translate(-g.x,-g.y);ctx.fillRect(g.x-R,g.y-R,R*2,R*2);ctx.restore();
  /* 3) 박자마다 보스에서 바닥으로 퍼지는 파동 */for(let k=0;k<2;k++){const q=(((beat+k*.5)%1)+1)%1;ctx.globalAlpha=(1-q)*.18;ctx.strokeStyle=col;ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(g.x,g.y+2,20+q*170,(20+q*170)*.22,0,0,TAU);ctx.stroke()}
  ctx.globalCompositeOperation='source-over';
  /* 4) 챕터별 떠다니는 입자 (원근: 큰 입자는 빠르고 밝게) */for(let i=0;i<34;i++){const z=(i%3)/2,sp=.04+z*.06,q=((t*sp)+i*.618)%1,x=AX+((i*97.3+Math.sin(t*.3+i)*14)%AW+AW)%AW;let y,s=1+Math.round(z),a=.25+z*.45,c=T.mote[i%T.mote.length];
   if(T.kind==='spark'||T.kind==='ember'){y=AY+AH-q*AH;a*=Math.sin(q*Math.PI)}else if(T.kind==='bubble'){y=AY+AH-q*AH;a*=.8}else if(T.kind==='star'){y=AY+((i*53)%AH);a*=.5+.5*Math.sin(t*2+i*3);s=z>.6?2:1}else{y=AY+((i*61+t*8*(1+z))%AH);a*=.7}
   if(T.kind==='bubble'){ctx.globalAlpha=a;ctx.strokeStyle=c;ctx.lineWidth=1;ctx.beginPath();ctx.arc(Math.round(x),Math.round(y),s+1,0,TAU);ctx.stroke()}else{ctx.globalAlpha=a;ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),s,s);if(T.kind==='star'&&z>.6&&a>.5){ctx.globalAlpha=a*.5;ctx.fillRect(Math.round(x)-2,Math.round(y),5,1);ctx.fillRect(Math.round(x),Math.round(y)-2,1,5)}}}
  /* 5) 심해: 바닥 위로 흐르는 물빛 무늬 */if(ch===5){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.05;ctx.fillStyle='#bff4ff';for(let yy=AY+AH*.45;yy<AY+AH;yy+=6)for(let xx=AX;xx<AX+AW;xx+=8){const v=Math.sin(xx*.05+t*1.3)+Math.sin(yy*.09-t*.9+xx*.02);if(v>1.2)ctx.fillRect(xx,yy,6,2)}ctx.globalCompositeOperation='source-over'}
  /* 6) 바닥 안개 */ctx.globalAlpha=.5;const fg=ctx.createLinearGradient(0,AY+AH-50,0,AY+AH);fg.addColorStop(0,'rgba(0,0,0,0)');fg.addColorStop(1,T.fog);ctx.fillStyle=fg;ctx.fillRect(AX,AY+AH-50,AW,50);
  /* 7) 비네트 */const key=AX+','+AY+','+ch;if(!AR.vg||AR.vgKey!==key){AR.vgKey=key;const v=ctx.createRadialGradient(AX+AW/2,AY+AH*.55,AH*.35,AX+AW/2,AY+AH*.5,AW*.62);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.42)');AR.vg=v}ctx.globalAlpha=1;ctx.fillStyle=AR.vg;ctx.fillRect(AX,AY,AW,AH);
  ctx.restore()}
 try{const _ab=drawArenaBG2;drawArenaBG2=function(now,beat,fr,th){const r=_ab.apply(this,arguments);try{if(mode==='boss')layers(now,G.state==='wake'?now/500:beat)}catch(e){if(!AR.err){AR.err=1;console.error('v43 arena',e)}}return r}}catch(e){console.error('v43 arena wrap',e)}
})();

