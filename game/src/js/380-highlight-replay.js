/* ================= 처치 하이라이트 리플레이 + GIF 저장 ================= */
const HL={frames:[],idx:0,n:60,step:66,last:0,g:null,frozen:false,deathIdx:-1};
function hlCapture(now){if(mode!=='boss'||!G||typeof document==='undefined')return;if(HL.g!==G){HL.g=G;HL.frames.forEach(f=>f.t=-1);HL.idx=0;HL.frozen=false;HL.deathIdx=-1}
 if(HL.frozen)return;if(!(G.state==='play'||G.state==='dying'))return;if(G.cine&&G.cine.type==='revive'&&G.cine.ph==='mem')return;if(now-HL.last<HL.step)return;HL.last=now;
 let f=HL.frames[HL.idx];if(!f){const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');if(!x)return;f={c,x,t:-1};HL.frames[HL.idx]=f}
 f.x.drawImage(cv,0,0,W,H);f.t=now;f.dying=G.state==='dying';HL.idx=(HL.idx+1)%HL.n;
 if(G.state==='dying'&&now-G.dyingAt>1900)HL.frozen=true}
function hlList(){return HL.frames.filter(f=>f&&f.t>=0).sort((a,b)=>a.t-b.t)}
function hlReady(){return hlList().length>12}
function hlDelays(list){const di=list.findIndex(f=>f.dying);return list.map((f,i)=>di<0?HL.step:(i<di-14?HL.step:i<di+4?Math.round(HL.step*2.8):Math.round(HL.step*1.8)))}
function hlCompose(ctx2,f,i,list,name){ctx2.drawImage(f.c,0,0);const di=list.findIndex(q=>q.dying),slow=di>=0&&i>=di-14;
 ctx2.fillStyle='#000';ctx2.fillRect(0,0,W,20);ctx2.fillRect(0,H-20,W,20);ctx2.font='bold 9px monospace';ctx2.textAlign='left';ctx2.fillStyle='#ffe36b';ctx2.fillText('▶ HIGHLIGHT',8,13);ctx2.textAlign='right';ctx2.fillStyle='#ffffff';ctx2.fillText(name,W-8,13);
 if(slow){ctx2.textAlign='left';ctx2.fillStyle='#ff8fb0';ctx2.fillText(i>=di?'FINAL BLOW':'SLOW ×0.35',8,H-7)}ctx2.textAlign='right';ctx2.fillStyle='#8b9b9c';ctx2.fillText('BEAT BLADE · MACHINA',W-8,H-7);ctx2.textAlign='left'}
function hlOpen(){const list=hlList();if(list.length<2)return;const name=G.B.name+' 격파',delays=hlDelays(list);
 let wrap=$('hlWrap');if(wrap)wrap.remove();wrap=document.createElement('div');wrap.id='hlWrap';
 wrap.style.cssText='position:fixed;inset:0;z-index:10000;background:#05080bee;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:12px';
 const cvs=document.createElement('canvas');cvs.width=W;cvs.height=H;cvs.style.cssText='width:min(94vw,calc((100dvh - 110px)*1.6));image-rendering:pixelated;border:2px solid #3a4a4f;border-radius:6px;background:#000';
 const row=document.createElement('div');row.style.cssText='display:flex;gap:10px;flex-wrap:wrap;justify-content:center';
 const mk=(t,pr,fn)=>{const b=document.createElement('button');b.textContent=t;if(pr)b.className='primary';b.style.touchAction='manipulation';b.onclick=fn;row.appendChild(b);return b};
 const info=document.createElement('div');info.style.cssText='color:#b9cbc4;font-size:13px;min-height:18px';info.textContent='마지막 순간을 슬로모션으로 다시 봅니다';
 const gifBtn=mk('GIF 저장',true,()=>hlSaveGif(list,delays,name,info,gifBtn));mk('닫기',false,()=>{wrap.remove();cancelAnimationFrame(wrap._raf)});
 wrap.appendChild(cvs);wrap.appendChild(info);wrap.appendChild(row);(document.fullscreenElement||document.webkitFullscreenElement||document.body).appendChild(wrap);
 const c2=cvs.getContext('2d');c2.imageSmoothingEnabled=false;let i=0,next=performance.now();
 const loop=t=>{if(!wrap.isConnected)return;if(t>=next){hlCompose(c2,list[i],i,list,name);next=t+delays[i]+(i===list.length-1?900:0);i=(i+1)%list.length}wrap._raf=requestAnimationFrame(loop)};wrap._raf=requestAnimationFrame(loop)}
/* --- 작은 GIF 인코더 (256색 전역 팔레트 · LZW) --- */
function gifLZW(pix,minSize){const clear=1<<minSize,eoi=clear+1;let size=minSize+1,next=eoi+1;const dict=new Map(),out=[];let cur=0,bits=0;
 const emit=c=>{cur|=c<<bits;bits+=size;while(bits>=8){out.push(cur&255);cur>>>=8;bits-=8}};
 emit(clear);let prefix=pix[0];
 for(let i=1;i<pix.length;i++){const k=pix[i],key=prefix*256+k,v=dict.get(key);if(v!==undefined){prefix=v;continue}
  emit(prefix);if(next===4096){emit(clear);dict.clear();size=minSize+1;next=eoi+1}else{if(next>=(1<<size))size++;dict.set(key,next++)}prefix=k}
 emit(prefix);emit(eoi);if(bits>0)out.push(cur&255);return out}
function hlSaveGif(list,delays,name,info,btn){if(btn.disabled)return;btn.disabled=true;info.textContent='GIF 만드는 중… 0%';
 const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 const frames=[];let fi=0;const counts=new Map();
 const grab=()=>{const end=Math.min(list.length,fi+6);for(;fi<end;fi++){hlCompose(x,list[fi],fi,list,name);const d=x.getImageData(0,0,W,H).data;frames.push(d);for(let p=0;p<d.length;p+=4*7){const k=((d[p]>>3)<<10)|((d[p+1]>>3)<<5)|(d[p+2]>>3);counts.set(k,(counts.get(k)||0)+1)}}
  info.textContent='GIF 만드는 중… '+Math.round(fi/list.length*40)+'%';if(fi<list.length)setTimeout(grab,0);else build()};
 const build=()=>{const top=[...counts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,256).map(e=>e[0]);while(top.length<256)top.push(0);
  const pal=top.map(k=>[((k>>10)&31)*8+4,((k>>5)&31)*8+4,(k&31)*8+4]),map=new Map();
  const near=k=>{let m=map.get(k);if(m!==undefined)return m;const r=((k>>10)&31)*8+4,g=((k>>5)&31)*8+4,b=(k&31)*8+4;let best=0,bd=1e9;for(let i=0;i<256;i++){const p=pal[i],dd=(p[0]-r)**2*3+(p[1]-g)**2*4+(p[2]-b)**2*2;if(dd<bd){bd=dd;best=i}}map.set(k,best);return best};
  const bytes=[];const w16=v=>{bytes.push(v&255,(v>>8)&255)};const str=s=>{for(const ch of s)bytes.push(ch.charCodeAt(0))};
  str('GIF89a');w16(W);w16(H);bytes.push(0xF7,0,0);for(const p of pal)bytes.push(p[0],p[1],p[2]);
  bytes.push(0x21,0xFF,0x0B);str('NETSCAPE2.0');bytes.push(3,1,0,0,0);
  let k=0;const enc=()=>{const end=Math.min(frames.length,k+4);for(;k<end;k++){const d=frames[k],ix=new Uint8Array(W*H);for(let p=0,q=0;q<ix.length;p+=4,q++)ix[q]=near(((d[p]>>3)<<10)|((d[p+1]>>3)<<5)|(d[p+2]>>3));
    const dl=Math.max(2,Math.round((delays[k]+(k===frames.length-1?900:0))/10));bytes.push(0x21,0xF9,4,0x04);w16(dl);bytes.push(0,0);
    bytes.push(0x2C);w16(0);w16(0);w16(W);w16(H);bytes.push(0);bytes.push(8);const lz=gifLZW(ix,8);for(let o=0;o<lz.length;o+=255){const n=Math.min(255,lz.length-o);bytes.push(n);for(let j=0;j<n;j++)bytes.push(lz[o+j])}bytes.push(0)}
   info.textContent='GIF 만드는 중… '+(40+Math.round(k/frames.length*60))+'%';if(k<frames.length)setTimeout(enc,0);else{bytes.push(0x3B);
    const blob=new Blob([new Uint8Array(bytes)],{type:'image/gif'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='beatblade_highlight_'+(G.bi+1)+'.gif';(document.fullscreenElement||document.body).appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),8000);
    info.textContent='저장 완료! ('+Math.round(blob.size/1024)+'KB) — 휴대폰은 다운로드 폴더를 확인하세요';btn.disabled=false;window._hlLastGif=blob}};enc()};
 setTimeout(grab,30)}
/*F5_END*/
/*VIL_BEGIN*/
