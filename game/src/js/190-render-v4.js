/* ================= v4 렌더링 ================= */
function drawGear(x,y,r,rot,col,dark){pcirc(x,y,r,dark);for(let i=0;i<10;i++){const a=rot+i*TAU/10;R(x+Math.cos(a)*(r+1)-2,y+Math.sin(a)*(r+1)-2,4,4,col)}pcirc(x,y,r-3,col);pcirc(x,y,r-7,dark);pcirc(x,y,3,col)}
function drawTrainBody(x,y,dir,len,now){const x0=dir>0?x-len:x;R(x0,y-11,len,22,'#26262a');for(let i=0;i<3;i++){const cx=x0+i*(len/3)+2;R(cx,y-9,len/3-4,17,'#3c3c42');R(cx+3,y-6,6,6,'#ffcf7a');R(cx+len/3-13,y-6,6,6,'#ffcf7a');R(cx,y+8,len/3-4,2,'#d9d3bf')}
 const hx=dir>0?x-2:x-16;R(hx,y-13,18,26,'#6d6a60');R(hx+(dir>0?12:2),y-8,4,8,'#fff0a0');const fx=dir>0?x+2:x-2;for(let k=0;k<60;k+=4)RA(fx+dir*k-1,y-5-k*.12,3,10+k*.25,'#fff0a0',.16*(1-k/60));for(let i=0;i<4;i++)RA(x-dir*(len*.2+i*20),y+12,3,2,'#ffb020',.6)}
function drawDrone(x,y,now){R(x-5,y-2,10,5,'#1c2432');R(x-3,y-3,6,2,'#5f5a86');R(x-1,y,3,2,'#ff4d6d');const f=Math.floor(now/40)%2;R(x-9,y-4+f,6,1,'#c9bff0');R(x+3,y-4+(1-f),6,1,'#c9bff0');RA(x-9,y-8,18,14,'#c9bff0',.08)}
function drawScrap(x,y,now,sp){const f=Math.floor(now/90+sp)%3;R(x-7,y-4,14,8,'#6b5a30');R(x-5,y-6,8,12,'#8a7440');if(f===0)R(x-8,y-2,16,3,'#3a3018');else if(f===1)R(x-3,y-8,6,16,'#3a3018');R(x-2,y-2,3,3,'#ff5d5d')}
function drawHornet(x,y,now){const f=Math.floor(now/40)%2;RA(x-8,y-3+f,7,2,'#fff8e0',.5);RA(x+1,y-3+(1-f),7,2,'#fff8e0',.5);R(x-4,y-2,8,4,'#caa23a');R(x-3,y-2,2,4,'#241c0c');R(x+1,y-2,2,4,'#241c0c');R(x-1,y+1,2,2,'#ff4d6d')}
/*CH2SKINS_BEGIN*/
/* ===== 챕터 2 위험요소 스킨: 탄환·장판·광선을 괴수의 재질로 ===== */
const TH2={10:{k:'root',tel:'#9bff5a',act:'#8a6a42',dk:'#2b1d10',hi:'#c8ff8a'},11:{k:'spore',tel:'#caff6b',act:'#9ad63a',dk:'#3a2350',hi:'#f6ffd8'},
 12:{k:'bog',tel:'#8fd6b8',act:'#3f7a4a',dk:'#16241d',hi:'#ffcf5a'},13:{k:'bone',tel:'#ff5d5d',act:'#e8e2c8',dk:'#6b5f45',hi:'#ffffff'},
 14:{k:'silk',tel:'#ff3a6a',act:'#f0e0ff',dk:'#5a2e5e',hi:'#ffffff'},15:{k:'wasp',tel:'#ffcf3a',act:'#ffcf3a',dk:'#1a1a1a',hi:'#fff0a0'},
 16:{k:'crystal',tel:'#7de0ff',act:'#9ff0ff',dk:'#2a7a9a',hi:'#ffffff'},17:{k:'abyss',tel:'#ff5d8f',act:'#7ab8f0',dk:'#0c1a2c',hi:'#e8f4ff'},
 18:{k:'ash',tel:'#ff8a3a',act:'#ff8a3a',dk:'#2a2a30',hi:'#ffe08a'},19:{k:'void',tel:'#ff3a5d',act:'#b83aff',dk:'#1a0a12',hi:'#ff8fa8'}};
const T2=()=>G.bi>=10?TH2[G.bi]:null;
function skBullet(bu,x,y,now){const T=T2(),a=bu.ang,ca=Math.cos(a),sa=Math.sin(a),sd=bu.x0;
 switch(T.k){
 case 'root':glow(x,y,6,T.tel,.35);line(x-ca*7,y-sa*7,x+ca*4,y+sa*4,1,(px,py)=>R(px-1.5,py-1.5,3,3,'#2b1d10'));line(x-ca*6,y-sa*6,x+ca*3,y+sa*3,1,(px,py)=>R(px-.5,py-.5,2,2,'#8a6a42'));R(x+ca*5-1,y+sa*5-1,2,2,T.hi);break;
 case 'spore':{const w=Math.sin(now/90+sd);glow(x,y,8,T.tel,.45);pcirc(x,y,4.5+w*.5,'#4a6a10');pcirc(x-.5,y-.5,3.2,T.tel);R(x-2,y-2,1,1,'#ffffff');RA(x-ca*7-1,y-sa*7-1,2,2,T.tel,.5);RA(x-ca*11-1,y-sa*11-1,2,2,T.tel,.25);break}
 case 'bog':glow(x,y,6,T.tel,.3);pcirc(x,y,4.2,'#1e4a32');pcirc(x-.5,y-.5,3,'#7fc9a0');R(x-2,y-2,2,1,'#e8fff0');RA(x-ca*6-1,y-sa*6,2,3,'#5bd6a8',.4);break;
 case 'bone':{const sp=now/70+sd,c2=Math.cos(sp),s2=Math.sin(sp);glow(x,y,7,T.tel,.3);line(x-c2*5,y-s2*5,x+c2*5,y+s2*5,1,(px,py)=>R(px-1.5,py-1.5,3,3,'#b3aa8c'));line(x-c2*5,y-s2*5,x+c2*5,y+s2*5,1,(px,py)=>R(px-.5,py-.5,2,2,'#fffaf0'));for(const e of [-1,1])pcirc(x+c2*5*e,y+s2*5*e,2.2,'#fffaf0');break}
 case 'silk':glow(x,y,6,T.tel,.4);pcirc(x,y,4,'#5a1030');pcirc(x,y,3,T.tel);R(x-1,y-2,2,2,'#ffe0ea');RA(x-ca*6,y-sa*6,1,1,'#ffffff',.6);break;
 case 'wasp':glow(x,y,6,T.tel,.3);line(x-ca*8,y-sa*8,x+ca*4,y+sa*4,1,(px,py)=>R(px-1,py-1,3,3,'#1a1a1a'));line(x-ca*7,y-sa*7,x-ca*2,y-sa*2,2,(px,py)=>R(px-.5,py-.5,2,2,T.tel));R(x+ca*5-1,y+sa*5-1,2,2,'#ffffff');break;
 case 'crystal':glow(x,y,8,T.tel,.45);line(x-ca*6,y-sa*6,x+ca*6,y+sa*6,1,(px,py)=>R(px-1.5,py-1.5,3,3,'#2a7a9a'));line(x-ca*5,y-sa*5,x+ca*5,y+sa*5,1,(px,py)=>R(px-.5,py-.5,2,2,'#e8fbff'));pcirc(x,y,2.5,T.act);break;
 case 'abyss':{const r=bu.r>3?6:5;pcirc(x,y,r,'#0c1a2c',.35);for(let i=0;i<14;i++){const aa=i*TAU/14;RA(x+Math.cos(aa)*r-1,y+Math.sin(aa)*r-1,2,2,'#bfe4ff',.85)}R(x-2,y-3,2,2,'#ffffff');glow(x,y,7,T.act,.25);break}
 case 'ash':{const f=Math.floor(now/60+sd)%3;glow(x,y,8,T.tel,.5);pcirc(x,y,3.6+f*.3,'#ff5a1a');pcirc(x,y-1,2.2,'#ffb020');R(x-1,y-2,2,2,'#fff0a0');RA(x-ca*6-1,y-sa*6-1,2,2,T.tel,.5);RA(x-ca*10-1,y-sa*10-2,2,2,T.tel,.25);break}
 case 'void':glow(x,y,7,T.act,.45);pcirc(x,y,4.2,T.tel);pcirc(x,y,3,'#2a0418');R(x-1,y-1,2,2,'#ffffff');break;
 }}
function skZone(z,beat,now){const T=T2();if(!T||z.harm===false||z.kind==='hour'||z.kind==='bolt')return false;
 const k=z.kind||'plain';
 if(beat<z.t1){const p=(beat-z.t0)/(z.t1-z.t0),bl=p>.8&&Math.floor(beat*8)%2===0;
  pcirc(z.cx,z.cy,z.r,T.tel,.08+.16*p+(bl?.18:0));pcirc(z.cx,z.cy,z.r*p,T.tel,.16);
  for(let i=0;i<24;i++){const a=i*TAU/24;RA(z.cx+Math.cos(a)*z.r-1,z.cy+Math.sin(a)*z.r-1,2,2,T.tel,.85)}
  switch(T.k){
   case 'root':for(let i=0;i<6;i++){const a=i*TAU/6+z.cx*.1,rr=z.r*Math.min(1,p*1.3);line(z.cx,z.cy,z.cx+Math.cos(a)*rr,z.cy+Math.sin(a)*rr*.7,3,(x,y,j)=>R(x-1+((j*7)%3-1),y-1,2,2,'#1a0d06'))}if(p>.5&&Math.floor(now/80+z.cx)%3===0)R(z.cx+(RND()-.5)*z.r,z.cy+(RND()-.5)*z.r*.6,2,2,'#6a4a2a');break;
   case 'spore':for(let i=0;i<5;i++){const a=i*TAU/5+now/400,rr=z.r*(1.3-p*.8);RA(z.cx+Math.cos(a)*rr-1,z.cy+Math.sin(a)*rr*.7-1,2,2,T.tel,.8)}break;
   case 'bog':for(let i=0;i<4;i++){const ph=((now/500)+i*.25+z.cx*.01)%1,a=i*1.9+z.cy;pcirc(z.cx+Math.cos(a)*z.r*.5,z.cy+Math.sin(a)*z.r*.35,1+ph*3,'#8fd6b8',(1-ph)*.7)}break;
   case 'bone':if(p>.45)for(let i=0;i<5;i++){const a=i*TAU/5+.4,x=z.cx+Math.cos(a)*z.r*.45,y=z.cy+Math.sin(a)*z.r*.3,h=Math.round((p-.45)*8);R(x-1,y-h,2,h+1,'#e8e2c8')}break;
   case 'silk':for(let i=0;i<6;i++){const a=i*TAU/6;line(z.cx,z.cy,z.cx+Math.cos(a)*z.r,z.cy+Math.sin(a)*z.r,3,(x,y)=>RA(x,y,1,1,'#ffffff',.5))}for(const f of [.4,.75])for(let i=0;i<18;i++){const a=i*TAU/18;RA(z.cx+Math.cos(a)*z.r*f,z.cy+Math.sin(a)*z.r*f,1,1,'#ffffff',.5)}break;
   case 'wasp':for(let i=0;i<6;i++){const a=i*TAU/6;RA(z.cx+Math.cos(a)*z.r*.5-2,z.cy+Math.sin(a)*z.r*.5-2,4,4,'#ffcf3a',.35+.3*p)}break;
   case 'crystal':for(let i=0;i<5;i++){const a=i*TAU/5+.3;line(z.cx,z.cy,z.cx+Math.cos(a)*z.r*p,z.cy+Math.sin(a)*z.r*p,3,(x,y)=>RA(x-1,y-1,2,2,'#e8fbff',.6))}break;
   case 'abyss':for(let i=0;i<2;i++){const ph=((now/700)+i*.5)%1,rr=z.r*ph;for(let j=0;j<20;j++){const a=j*TAU/20;RA(z.cx+Math.cos(a)*rr,z.cy+Math.sin(a)*rr*.6,1,1,'#bfe4ff',(1-ph)*.7)}}break;
   case 'ash':for(let i=0;i<3;i++){const ph=((now/600)+i*.33+z.cx*.01)%1;RA(z.cx+Math.sin(i*2.3+now/300)*z.r*.5,z.cy-ph*14,2,2,'#ffb020',(1-ph)*.8)}break;
   case 'void':{const n=10;for(let i=0;i<n;i++){const a=i*TAU/n,x=z.cx+Math.cos(a)*z.r*.92,y=z.cy+Math.sin(a)*z.r*.92,ix=-Math.cos(a),iy=-Math.sin(a),L=2+p*5;line(x,y,x+ix*L,y+iy*L,1,(px,py)=>R(px-1,py-1,2,2,'#f0e0e8'))}break}
  }
  if(k==='drip'){RA(z.cx,AY,1,z.cy-AY,'#ffffff',.25+.25*p);const y=lerp(AY+4,z.cy-6,p*p);pcirc(z.cx,y,3,'#ff3a6a');R(z.cx-1,y-2,1,1,'#ffe0ea')}
  if(k==='fall'){const y=lerp(AY-10,z.cy-8,p*p);line(z.cx,y-10,z.cx,y+4,1,(px,py)=>R(px-2,py,4,1,'#5ac8e8'));line(z.cx,y-10,z.cx,y+4,1,(px,py)=>R(px-.5,py,1,1,'#ffffff'));glow(z.cx,y,6,'#9ff0ff',.5)}
  if(k==='egg'){const pu=1+Math.sin(now/(120-p*80))*.8;pcirc(z.cx,z.cy,6+pu,'#e8d6ee');pcirc(z.cx,z.cy,4+pu*.5,'#f8f0ff');R(z.cx-2,z.cy-3,2,2,'#ffffff');if(p>.5)R(z.cx-1,z.cy,3,1,'#5a2e5e')}
  return true}
 const q=clamp((beat-z.t1)/Math.max(.2,z.t2-z.t1),0,1);
 if(k==='pool'){const col=T.k==='ash'?'#ff5a1a':T.k==='bog'?'#3f7a4a':T.k==='spore'?'#9ad63a':T.k==='silk'?'#c83a8a':T.act;
  pcirc(z.cx,z.cy,z.r,T.dk,.5);pcirc(z.cx,z.cy,z.r*.85,col,.4);pcirc(z.cx-z.r*.2,z.cy-z.r*.2,z.r*.35,T.hi,.18);
  for(let i=0;i<7;i++){const ph=((now/900)+i*.143+z.cx*.01)%1,a=i*2.3+z.cy,x=z.cx+Math.cos(a)*z.r*.55,y=z.cy+Math.sin(a)*z.r*.4-ph*16;RA(x-1,y-1,2,2,T.k==='ash'?'#ffb020':T.hi,(1-ph)*.7)}
  return true}
 switch(T.k){
  case 'root':{pcirc(z.cx,z.cy,z.r,'#1a0d06',.55);const h=26*(1-q*.35);for(let i=0;i<5;i++){const a=i*TAU/5+z.cx,ox=Math.cos(a)*z.r*.45,oy=Math.sin(a)*z.r*.3,hh=h*(.6+((i*37)%5)/10);for(let y=0;y<hh;y+=2){const w=4*(1-y/hh)+1;R(z.cx+ox-w/2+Math.sin(y*.3+i)*1.5,z.cy+oy-y,w,2,y>hh*.75?'#9bff5a':y%4?'#5a3f26':'#2b1d10')}}break}
  case 'bone':case 'crystal':case 'wasp':{const h=26*(1-q*.4),c1=T.k==='bone'?'#fffaf0':T.k==='wasp'?'#1a1a1a':'#e8fbff',c2=T.k==='bone'?'#b3aa8c':T.k==='wasp'?'#ffcf3a':'#5ac8e8';for(let i=0;i<3;i++){const ox=(i-1)*z.r*.45,hh=h*(i===1?1:.65);for(let y=0;y<hh;y+=2){const w=z.r*.38*(1-y/hh)+1;R(z.cx+ox-w,z.cy-y,w*2,2,y<hh*.55?c2:c1)}R(z.cx+ox-1,z.cy-hh,2,2,'#ffffff')}glow(z.cx,z.cy,z.r*1.3,T.tel,.5*(1-q));break}
  case 'spore':{pcirc(z.cx,z.cy,z.r*(1+q*.3),T.tel,.55*(1-q));pcirc(z.cx,z.cy,z.r*.6,'#ffffff',.6*(1-q));break}
  case 'bog':case 'abyss':{const h=60*(1-q*.6),a1=T.k==='abyss'?'#e8f4ff':'#8fd6b8',a2=T.k==='abyss'?'#7ab8f0':'#3f7a4a',a3=T.k==='abyss'?'#1a3a5e':'#16241d';for(let y=0;y<h;y+=3){const w=z.r*(1.1-y/h*.7)*(1+.1*Math.sin(now/60+y));R(z.cx-w,z.cy-y,w*2,3,y<h*.35?a3:y<h*.7?a2:a1)}pcirc(z.cx,z.cy,z.r,a2,.7);glow(z.cx,z.cy-20,z.r*1.6,a1,.5);break}
  case 'silk':{pcirc(z.cx,z.cy,z.r,'#ffffff',.25*(1-q));for(let i=0;i<8;i++){const a=i*TAU/8;line(z.cx,z.cy,z.cx+Math.cos(a)*z.r,z.cy+Math.sin(a)*z.r,2,(x,y)=>R(x,y,1,1,'#ffffff'))}pcirc(z.cx,z.cy,z.r*.35,T.tel,.9);break}
  case 'ash':{pcirc(z.cx,z.cy,z.r,'#7a2a10',.6);for(let i=0;i<7;i++){const a=i*TAU/7,rr=z.r*.5,fx=z.cx+Math.cos(a)*rr,fy=z.cy+Math.sin(a)*rr*.7,fh=6+Math.floor(now/80+i)%4*3;R(fx-2,fy-fh,4,fh,'#ff8a3a');R(fx-1,fy-fh,2,fh-2,'#ffe08a')}glow(z.cx,z.cy,z.r*1.5,T.tel,.6*(1-q));break}
  case 'void':{const cl=Math.min(1,q*3),rr=z.r*(1-cl*.55);pcirc(z.cx,z.cy,z.r,'#1a0410',.8);pcirc(z.cx,z.cy,rr*.8,'#4a0a1e',.9);for(let i=0;i<10;i++){const a=i*TAU/10,x=z.cx+Math.cos(a)*rr,y=z.cy+Math.sin(a)*rr;line(x,y,x-Math.cos(a)*7,y-Math.sin(a)*7,1,(px,py)=>R(px-1,py-1,3,3,'#f0e0e8'))}glow(z.cx,z.cy,z.r*1.4,T.tel,.5*(1-q));break}
  default:{pcirc(z.cx,z.cy,z.r,T.act,.8);pcirc(z.cx,z.cy,z.r*.55,'#ffffff',.8)}
 }
 return true}
function skArc(a,x,y,now){const T=T2(),k=a.kind;
 if(k==='seed'){glow(x,y,6,'#9bff5a',.4);pcirc(x,y,3.5,'#5a3f26');R(x-1,y-2,2,2,'#9bff5a');RA(x-1,a.y1-1,3,2,'#000',.3);return true}
 if(k==='spore'){glow(x,y,10,'#caff6b',.5);pcirc(x,y,6,'#6a8a20',.8);pcirc(x-1,y-1,4,'#caff6b',.9);R(x-2,y-3,2,2,'#ffffff');for(let i=1;i<4;i++)RA(x-(a.x1-a.x0)*.01*i,y+i*3,2,2,'#caff6b',.5-i*.12);return true}
 if(k==='bile'){glow(x,y,7,'#8fd6b8',.4);pcirc(x,y,4.5,'#1e4a32');pcirc(x-.5,y-.5,3.3,'#7fc9a0');R(x-2,y-2,2,1,'#ffffff');for(let i=1;i<4;i++)RA(x-(a.x1-a.x0)*.012*i,y+i*2,2,2,'#5bd6a8',.4-i*.1);return true}
 if(k==='egg'){pcirc(x,y,5,'#9a7aa6');pcirc(x,y,4,'#f0e0ff');R(x-2,y-3,2,2,'#ffffff');return true}
 return false}
function skBeamCol(bm){const T=T2();if(!T)return null;return bm.kind==='tongue'?'#ff6a8a':bm.kind==='lure'?'#ff5d8f':T.k==='silk'?'#f6f0ff':T.act}
function skDrawTongue(bm,beat,now){const a=beamAng(bm,beat),dx=Math.cos(a),dy=Math.sin(a);
 if(beat<bm.t1){const p=clamp((beat-bm.t0)/(bm.t1-bm.t0),0,1);for(let s=0;s<bm.L;s+=6)if((s/6)%2===0)RA(bm.ox+dx*s-1,bm.oy+dy*s-1,3,3,'#ff6a8a',.25+.6*p);return}
 const p=clamp((beat-bm.t1)/bm.fireDur,0,1),rt=beat>bm.t2-.25?clamp((bm.t2-beat)/.25,0,1):1,tip=bm.L*(p*p*(3-2*p))*rt;
 for(let s=0;s<tip;s+=2){const w=bm.w*(.8+.2*Math.sin(s*.08));R(bm.ox+dx*s-w/2-1,bm.oy+dy*s-w/2-1,w+2,w+2,'#5a1a2a');R(bm.ox+dx*s-w/2,bm.oy+dy*s-w/2,w,w,'#e85a7a')}
 for(let s=0;s<tip;s+=3)R(bm.ox+dx*s-1-dy*2,bm.oy+dy*s-1+dx*2,2,2,'#ffb0c0');
 const ex=bm.ox+dx*tip,ey=bm.oy+dy*tip;pcirc(ex,ey,bm.w*.75,'#5a1a2a');pcirc(ex,ey,bm.w*.6,'#ff8aa0');R(ex-1,ey-2,2,2,'#ffffff')}
function skDrawSilk(bm,beat,now){const a=beamAng(bm,beat),dx=Math.cos(a),dy=Math.sin(a),s0=bm.both?-bm.L:0;
 if(beat<bm.t1){const p=clamp((beat-bm.t0)/(bm.t1-bm.t0),0,1);for(let s=s0;s<bm.L;s+=4)RA(bm.ox+dx*s,bm.oy+dy*s,1,1,'#ffffff',.2+.5*p);for(let s=s0;s<bm.L;s+=10)if((s/10)%2===0)RA(bm.ox+dx*s-1,bm.oy+dy*s-1,2,2,'#ff3a6a',.3+.5*p);return}
 const p=clamp((beat-bm.t1)/bm.fireDur,0,1),tip=bm.L*(p*p*(3-2*p));
 for(let s=s0;s<tip;s+=2){const wv=Math.sin(s*.12+now/90)*1.2;RA(bm.ox+dx*s-dy*wv-bm.w/2,bm.oy+dy*s+dx*wv-bm.w/2,bm.w,bm.w,'#f0e0ff',.28);R(bm.ox+dx*s-dy*wv-1,bm.oy+dy*s+dx*wv-1,2,2,'#ffffff')}
 for(let s=s0;s<tip;s+=17)R(bm.ox+dx*s-2,bm.oy+dy*s-2,4,4,'#ffffff')}
function skRotor(rt,beat,now){const T=T2(),act=beat>=rt.t1;
 for(let i=0;i<rt.arms;i++){const [x,y]=rotorTip(rt,i,beat),sk=rt.skin||T.k;
  if(!act){line(rt.cx,rt.cy,x,y,5,(px,py,j)=>{if(j%2===0)RA(px-1,py-1,3,3,T.tel,.35)});continue}
  if(sk==='branch'){line(rt.cx,rt.cy,x,y,2,(px,py,j)=>{const w=Math.max(4,8-j*.07);R(px-w/2-1,py-w/2-1,w+2,w+2,'#140a04')});line(rt.cx,rt.cy,x,y,2,(px,py,j)=>{const w=Math.max(3,7-j*.07);R(px-w/2,py-w/2,w,w,j%4?'#8a6a42':'#5a3f26');R(px-w/2,py-w/2,w,1,'#b89a6a')});for(let k=1;k<5;k++){const f=k/5,lx=lerp(rt.cx,x,f),ly=lerp(rt.cy,y,f);pcirc(lx+(k%2?4:-4),ly-3,3,'#6a9a32')}pcirc(x,y,5,'#6a9a32');R(x-1,y-1,2,2,'#c8ff8a')}
  else if(sk==='tail'){line(rt.cx,rt.cy,x,y,6,(px,py,j)=>{pcirc(px,py,3.5-j*.08,'#b3aa8c');R(px-1,py-1,2,2,'#fffaf0')});pcirc(x,y,4,'#fffaf0');R(x-2,y-2,2,2,'#ff3b3b')}
  else if(sk==='crystal'){line(rt.cx,rt.cy,x,y,3,(px,py)=>{R(px-3,py-3,6,6,'#2a7a9a');R(px-2,py-2,4,4,'#9ff0ff')});line(rt.cx,rt.cy,x,y,3,(px,py)=>R(px-.5,py-.5,1,1,'#ffffff'));glow(x,y,10,'#9ff0ff',.7);pcirc(x,y,5,'#e8fbff')}
  else{line(rt.cx,rt.cy,x,y,3,(px,py)=>RA(px-3,py-3,6,6,T.act,.95));glow(x,y,10,T.tel,.7)}}}
function skMover(m,x,y,now){const T=T2(),vert=Math.abs(m.y1-m.y0)>Math.abs(m.x1-m.x0);
 if(T.k==='bog'||T.k==='void'||T.k==='abyss'){const c1=T.k==='void'?'#4a1a2a':T.k==='abyss'?'#1a3a5e':'#2e4d3f',c2=T.k==='void'?'#8a3a52':T.k==='abyss'?'#3a6a9e':'#4f7a62',su=T.k==='void'?'#f0e0e8':T.k==='abyss'?'#7ab8f0':'#8fbfa6';
  for(let i=0;i<6;i++){const k=i/5,px=x+Math.sin(now/120+i*.9+m.spin)*4*k,py=y+i*6;pcirc(px,py,(7-i*.7),'#0a0a0c');pcirc(px,py,(6-i*.7),i%2?c1:c2);if(i%2)R(px+2,py-1,2,2,su)}
  if(T.k==='void'){for(const e of [-1,1])R(x+e*3-1,y-6,2,4,'#f0e0e8');pcirc(x,y-2,2,'#2a0412')}else{pcirc(x,y-4,3,su);R(x-1,y-5,2,2,'#ffffff')}
  RA(x-6,y+m.r+2,12,3,'#000',.3);return true}
 pcirc(x,y,m.r*.7,T.dk);pcirc(x,y,m.r*.5,T.act);RA(x-6,y+m.r+2,12,3,'#000',.3);return true}
/*CH2SKINS_END*/
function drawZone(z,beat){if(beat<z.t0||beat>=z.t2)return;if(G.bi>=10&&skZone(z,beat,performance.now()))return;const safe=z.harm===false,k=z.kind||'plain',col=safe?'#7dffa8':k==='geyser'||k==='pool'?'#ff8a3d':k==='spike'?'#8fe0ff':k==='bolt'?'#a8e2ff':'#ff4d6d',now=performance.now();
 if(beat<z.t1){const p=(beat-z.t0)/(z.t1-z.t0),bl=p>.8&&Math.floor(beat*8)%2===0;pcirc(z.cx,z.cy,z.r,col,.10+.2*p+(bl?.2:0));pcirc(z.cx,z.cy,z.r*p,col,.25);for(let i=0;i<20;i++){const a=i*TAU/20;RA(z.cx+Math.cos(a)*z.r-1,z.cy+Math.sin(a)*z.r-1,2,2,col,.9)}
  if(z.shadow)pcirc(z.cx,z.cy+2,Math.max(2,z.r*(.3+.7*p)),'#000',.35);
  if(z.mine){R(z.cx-4,z.cy-4,8,8,'#1a1e22');R(z.cx-2,z.cy-2,4,4,Math.floor(beat*(2+p*6))%2?'#ff4d6d':'#5a1a24')}
  if(z.missile&&p>.4){const q=(p-.4)/.6,my=lerp(-10,z.cy,q*q);R(z.cx-2,my-8,4,10,'#c9d3d8');R(z.cx-1,my-11,2,3,'#ff4d6d');R(z.cx-3,my,6,2,'#ffb020')}
  if(k==='bolt'){for(let i=0;i<6;i++){const a=i*TAU/6+now/300;line(z.cx,z.cy,z.cx+Math.cos(a)*z.r*.9,z.cy+Math.sin(a)*z.r*.9,3,(x,y)=>RA(x-1,y-1,2,2,'#dff4ff',.4+.5*p))}RA(z.cx-1,AY-4,2,z.cy-AY+4,'#a8e2ff',.06+.2*p)}
  else if(k==='geyser'){for(let i=0;i<7;i++){const a=i*TAU/7+.4;line(z.cx,z.cy,z.cx+Math.cos(a)*z.r*.95,z.cy+Math.sin(a)*z.r*.95,3,(x,y)=>RA(x-1,y-1,2,2,'#ffcf7a',.3+.6*p))}}
  else if(k==='spike'){for(let i=0;i<5;i++){const a=i*TAU/5+.3;line(z.cx,z.cy,z.cx+Math.cos(a)*z.r,z.cy+Math.sin(a)*z.r,3,(x,y)=>RA(x-1,y-1,2,2,'#eaffff',.3+.6*p))}}
  else if(k==='hour'){ctx.font='bold 9px monospace';ctx.textAlign='center';ctx.fillStyle='#fff0a0';ctx.globalAlpha=.5+.5*p;ctx.fillText(String(z.num),z.cx,z.cy+3);ctx.globalAlpha=1;ctx.textAlign='left'}
  else if(k==='pool'){pcirc(z.cx,z.cy,z.r*.5,'#ffb020',.25*p)}
  else if(!safe&&p>.5){R(z.cx-1,z.cy-5,2,6,'#fff');R(z.cx-1,z.cy+3,2,2,'#fff')}}
 else{const q=clamp((beat-z.t1)/Math.max(.2,z.t2-z.t1),0,1);
  if(k==='bolt'){let px=z.cx+(RND()-.5)*10,py=AY-6;const n=9;for(let i=1;i<=n;i++){const nx=i===n?z.cx:z.cx+(RND()-.5)*22,ny=lerp(AY-6,z.cy,i/n);line(px,py,nx,ny,4,(x,y)=>{R(x-2,y-1,5,3,'#a8e2ff');R(x-1,y,3,1,'#ffffff')});px=nx;py=ny}glow(z.cx,z.cy,z.r*1.5,'#a8e2ff',1-q);pcirc(z.cx,z.cy,z.r*(1-q*.4),'#e8f8ff',.9-q*.6)}
  else if(k==='geyser'){const h=70*(1-q*.6);for(let y=0;y<h;y+=3){const w=z.r*(1.2-y/h*.7)*(1+.1*Math.sin(now/60+y));R(z.cx-w,z.cy-y,w*2,3,y<h*.35?'#ffe79a':y<h*.7?'#ffb020':'#ff5a20')}glow(z.cx,z.cy-20,z.r*2,'#ff8a3d',.8);pcirc(z.cx,z.cy,z.r,'#ff5a20',.8)}
  else if(k==='pool'){pcirc(z.cx,z.cy,z.r,'#7a2a10',.55);pcirc(z.cx,z.cy,z.r*.85,'#ff6a20',.55);for(let i=0;i<7;i++){const a=i*TAU/7+now/400,rr=z.r*.6*((i*37)%10)/10+4,fx=z.cx+Math.cos(a)*rr,fy=z.cy+Math.sin(a)*rr*.7,fh=4+Math.floor(now/90+i)%4*2;R(fx-2,fy-fh,4,fh,'#ffb020');R(fx-1,fy-fh,2,fh-1,'#ffe79a')}glow(z.cx,z.cy,z.r*1.5,'#ff8a3d',.5)}
  else if(k==='spike'){const h=26*(1-q*.5);for(let y=0;y<h;y+=2){const w=z.r*.7*(1-y/h);R(z.cx-w,z.cy-y,w*2,2,y<h*.5?'#eaffff':'#8fe0ff')}R(z.cx-1,z.cy-h,2,h,'#ffffff');glow(z.cx,z.cy,z.r*1.3,'#8fe0ff',.6*(1-q))}
  else if(k==='hour'){pcirc(z.cx,z.cy,z.r,'#fff0a0',.85);pcirc(z.cx,z.cy,z.r*.6,'#ffffff');glow(z.cx,z.cy,z.r*1.6,'#fff0a0',.6*(1-q))}
  else{pcirc(z.cx,z.cy,z.r,safe?col:'#ff9aa8');pcirc(z.cx,z.cy,z.r*.6,'#ffffff')}}}
function drawRings(beat){const T_=T2(),rc0=T_?T_.tel:'#ff8fa0',rc1=T_?T_.tel:'#ff9aa8',rc2=T_?T_.act:'#ffb0bd';for(const r of G.rings){if(r.tp!=null&&beat>=r.tp&&beat<r.t0){const p=clamp((beat-r.tp)/(r.t0-r.tp),0,1),bl=Math.floor(beat*(p>.6?8:4))%2===0,pd=Math.hypot(P.x-r.cx,P.y-r.cy),rr=clamp(pd,Math.min(r.r0,r.r1)+8,Math.max(r.r0,r.r1)),out=r.r1>=r.r0;
  glow(r.cx,r.cy,10+p*16,rc0,.35+.4*p);pcirc(r.cx,r.cy,3+p*5,bl?'#ffffff':rc0,.8);
  const n=Math.max(48,Math.round(rr*.8));for(let i=0;i<n;i++){const a=i*TAU/n;let gap=false;if(r.gaps)for(const [ga,gw] of r.gaps)if(angDiff(a,ga)<gw)gap=true;const x=r.cx+Math.cos(a)*rr,y=r.cy+Math.sin(a)*rr;
   if(gap){if(i%2===0){RA(x-2,y-2,4,4,'#7dffa8',.2+.3*p);RA(x-1,y-1,2,2,'#d8ffe4',.5+.4*p)}}else if(i%2===0)RA(x-1,y-1,2,2,bl?'#ffffff':rc0,.25+.5*p)}
  if(r.gaps)for(const [ga,gw] of r.gaps)for(const e of [-1,1]){const ea=ga+e*gw;for(let d=Math.min(r.r0,r.r1)+6;d<Math.min(Math.max(r.r0,r.r1),300);d+=7)RA(r.cx+Math.cos(ea)*d-1,r.cy+Math.sin(ea)*d-1,2,2,'#7dffa8',(.15+.35*p)*(1-d/320))}
  for(let k=0;k<3;k++){const q=((beat*1.5+k/3)%1),ar=out?lerp(Math.min(r.r0,r.r1)+6,rr,q):lerp(Math.max(r.r0,r.r1),rr,q);for(let i=0;i<12;i++){const a=i*TAU/12+.13;let gap=false;if(r.gaps)for(const [ga,gw] of r.gaps)if(angDiff(a,ga)<gw)gap=true;if(!gap)RA(r.cx+Math.cos(a)*ar-1,r.cy+Math.sin(a)*ar-1,2,2,rc0,(1-q)*.5*p)}}
  const first=!G.rings.some(o=>o!==r&&Math.abs(o.cx-r.cx)<2&&Math.abs(o.cy-r.cy)<2&&o.t0<r.t0&&beat<o.t0&&o.tp!=null&&beat>=o.tp);if(first){const left=Math.max(0,(r.t0-beat)*(G.ms||500)/1000);const ty2=r.cy-(pd<44?30:16),tx2=left.toFixed(1)+'s';ctx.font='bold 10px monospace';ctx.textAlign='center';const tw=ctx.measureText(tx2).width+14;RA(r.cx-tw/2,ty2-9,tw,12,'#05090b',.75);ctx.fillStyle=bl?'#ffffff':rc0;ctx.fillText('!'+tx2,r.cx,ty2);ctx.textAlign='left'}}
 if(beat<r.t0||beat>=r.t1)continue;const p=(beat-r.t0)/(r.t1-r.t0),rad=lerp(r.r0,r.r1,p),n=Math.max(40,Math.round(rad*.9));for(let i=0;i<n;i++){const a=i*TAU/n;let gap=false,edge=false;if(r.gaps)for(const [ga,gw] of r.gaps){const dd=angDiff(a,ga);if(dd<gw)gap=true;else if(dd<gw+.07)edge=true}const x=r.cx+Math.cos(a)*rad,y=r.cy+Math.sin(a)*rad;if(gap){if(i%2===0){RA(x-2,y-2,4,4,'#7dffa8',.25*(1-p*.5));RA(x-1,y-1,2,2,'#c8ffd8',.85*(1-p*.5))}continue}RA(x-2,y-2,4,4,rc1,(1-p*.5)*.35);RA(x-1.5,y-1.5,3,3,edge?'#ffffff':rc2,1-p*.5)}}}
function drawMoverLane(m,beat){if(beat<m.tp||beat>=m.t0)return;const p=(beat-m.tp)/(m.t0-m.tp),bl=p>.7&&Math.floor(beat*8)%2===0,now=performance.now();
 if(m.kind==='drone'){const dx=Math.sign(m.x1-m.x0),dy=Math.sign(m.y1-m.y0);line(m.x0,m.y0,m.x1,m.y1,7,(x,y,i)=>{if(i%2===0)RA(x-1,y-1,2,2,'#c9bff0',.12+.3*p)});const ex=m.x0+(dx>0?18:dx<0?-18:0),ey=m.y0+(dy>0?18:dy<0?-18:0);R(ex-2,ey-2,4,4,bl?'#fff':'#ffe36b');return}
 const w=m.r*2,vx=m.x1-m.x0,vy=m.y1-m.y0,vert=Math.abs(vy)>Math.abs(vx),col=m.kind==='train'?'#ff6b3d':m.kind==='gear'?'#ffb020':(G.bi>=10?TH2[G.bi].tel:'#ff4d6d');
 if(vert)RA(m.x0-m.r,AY,w,AH,col,.08+.16*p+(bl?.1:0));else RA(AX,m.y0-m.r,AW,w,col,.08+.16*p+(bl?.1:0));
 const dir=Math.sign(vert?vy:vx)||1,ex=vert?m.x0:(dir>0?AX+10:AX+AW-10),ey=vert?(dir>0?AY+10:AY+AH-10):m.y0;for(let i=0;i<3;i++){const o=((now/90+i*6)%18)*dir*(p>.5?1:.6);if(vert)R(ex-3,ey+o,7,2,col);else R(ex+o,ey-3,2,7,col)}
 if(m.kind==='train'){R(ex-4,ey-4,8,8,bl?'#fff':'#ff2d2d');RA(ex-10,ey-10,20,20,'#ff2d2d',.2)}else glow(ex,ey,9,col,.6)}
function drawFieldPull(now,beat){const p=G.pull;if(!p)return;const T_=T2(),pc=T_?(p.kind==='lure'?(G.bi===12?'#ffcf5a':'#ff5d8f'):T_.tel):'#ff5d5d';if(beat>=p.tp&&beat<p.t0){const q=(beat-p.tp)/(p.t0-p.tp);for(let i=0;i<3;i++){const rr=(1-((q*2+i/3)%1))*150;for(let k=0;k<40;k++){const a=k*TAU/40;RA(p.x+Math.cos(a)*rr-1,p.y+Math.sin(a)*rr-1,2,2,pc,.15+.3*q)}}return}
 if(beat<p.t0||beat>=p.t1)return;const sg=(p.flip&&beat>=p.flip)?-1:1,col=sg>0?pc:'#5dd0ff';RA(AX,AY,AW,AH,col,.035+.02*Math.sin(now/120));for(let i=0;i<4;i++){const ph=((now/700+i/4)%1),rr=sg>0?(1-ph)*170:ph*170;for(let k=0;k<44;k++){const a=k*TAU/44;RA(p.x+Math.cos(a)*rr-1,p.y+Math.sin(a)*rr*.8-1,2,2,col,.22*(sg>0?1-ph:ph)+.05)}}
 for(let i=0;i<10;i++){const a=i*TAU/10+now/900,rr=60+((now/8+i*30)%110),x=p.x+Math.cos(a)*rr,y=p.y+Math.sin(a)*rr*.8;if(x>AX&&x<AX+AW&&y>AY&&y<AY+AH)line(x,y,x+(p.x-x)*.08*sg,y+(p.y-y)*.08*sg,3,(xx,yy)=>RA(xx-1,yy-1,2,2,col,.6))}}
/* ---------- 보스별 배경 효과 · 페이즈 변신 파츠 ---------- */
function jag(x0,y0,x1,y1,seed,col,w){let px=x0,py=y0;const n=6;for(let i=1;i<=n;i++){const nx=lerp(x0,x1,i/n)+(i===n?0:Math.sin(seed*13.7+i*5.1)*9),ny=lerp(y0,y1,i/n)+(i===n?0:Math.cos(seed*9.3+i*3.7)*9);line(px,py,nx,ny,3,(x,y)=>RA(x-w/2,y-w/2,w,w,col,.85));px=nx;py=ny}}
function bossFXBack(now,g,ph){const B=G.B,c=B.c,cx=g.x,cy=g.coreY,t=now/1000,beat=G.state==='play'||G.state==='count'?G.beat:0,fr=beat-Math.floor(beat);
 glow(cx,cy,64+ph*16+fr*10*(G.state==='play'?1:0),c,.32+.1*ph);for(let i=0;i<5;i++)RA(cx-56+i*5,g.y-3+i,112-i*10,2,c,.07);
 const sr=88+ph*8;for(let i=0;i<48;i++){const a=i*TAU/48+t*(ph+1)*.3;if(i%2===0)RA(cx+Math.cos(a)*sr-1,g.y+3+Math.sin(a)*sr*.28-1,3,2,ph>=2?'#ff2d55':ph>=1?'#ffb020':c,.4)}
 for(let k=0;k<3;k++){const a=t*(ph+1)*.3+k*TAU/3;line(cx+Math.cos(a)*sr,g.y+3+Math.sin(a)*sr*.28,cx+Math.cos(a+TAU/3)*sr,g.y+3+Math.sin(a+TAU/3)*sr*.28,6,(x,y)=>RA(x-1,y-1,2,1,c,.22))}
 switch(G.bi){
 case 0:for(let k=0;k<2+ph;k++){const r=48+k*22,rot=t*(k%2?-.6:.5);for(let i=0;i<16;i++){const a=rot+i*TAU/16;RA(cx+Math.cos(a)*r-2,cy+Math.sin(a)*r-2,4,4,c,.22)}}break;
 case 1:for(let i=0;i<2+ph;i++)jag(cx+(i-1)*40,g.top-14,cx+(i-1)*30+Math.sin(t*7+i)*20,g.y+2,Math.floor(now/90)+i,'#dff4ff',2);break;
 case 2:RA(cx-70,g.y-6,140,8,'#ff5a20',.16+.06*Math.sin(t*4));for(let i=0;i<5;i++)line(cx-60+i*30,g.top,cx-60+i*30+Math.sin(t*3+i)*6,g.top-30,4,(x,y)=>RA(x,y,2,2,'#ffb020',.14));break;
 case 3:for(let k=0;k<60;k+=4)RA(cx-k*.5-1,g.y+2+k*.4,3,3,'#fff0a0',.14*(1-k/60));break;
 case 4:for(let i=0;i<6;i++){const a=t*.8+i*TAU/6,x=cx+Math.cos(a)*74,y=cy+Math.sin(a)*30;R(x-1,y-6,3,12,'#c8f6ff');R(x-3,y-2,7,4,'#7ad8ff');RA(x-6,y-8,12,16,'#c8f6ff',.12)}break;
 case 5:for(let i=0;i<9;i++){const a=t*(1.2+i*.03)+i*.7,x=cx+Math.cos(a)*(50+i*4),y=cy+Math.sin(a*1.3)*(28+i*2);R(x-2,y-1,5,3,'#c9bff0');R(x,y,1,1,'#ff4d6d')}break;
 case 6:for(const s of [-1,1])for(let k=0;k<2;k++){const r=68+k*22;for(let i=0;i<16;i++){const a=(-.9+i/15*1.8)*s+(s>0?0:Math.PI);RA(cx+Math.cos(a)*r-1,cy+Math.sin(a)*r*.9-1,3,3,'#ff5d5d',.15+.15*Math.sin(t*3+i))}}break;
 case 7:{const r=96;for(let i=0;i<60;i++){const a=i*TAU/60;RA(cx+Math.cos(a)*r-1,cy+Math.sin(a)*r-1,2,2,'#f0a6c8',.28)}for(let i=0;i<12;i++){const a=i*TAU/12;R(cx+Math.cos(a)*(r-6)-1,cy+Math.sin(a)*(r-6)-1,3,3,'#fff0a0')}line(cx,cy,cx+Math.cos(t*.5)*(r-30),cy+Math.sin(t*.5)*(r-30),4,(x,y)=>RA(x-1,y-1,3,3,'#f0a6c8',.35));line(cx,cy,cx+Math.cos(t*4)*(r-8),cy+Math.sin(t*4)*(r-8),4,(x,y)=>RA(x-1,y-1,2,2,'#fff0a0',.35));break}
 case 8:for(let i=0;i<10;i++){const a=i*TAU/10+t*.2,x=cx+Math.cos(a)*(78+(i%3)*10),y=cy+Math.sin(a)*(40+(i%3)*6),ta=Math.atan2(P.y-y,P.x-x);R(x-5,y-3,10,6,'#0a1a16');R(x-4,y-2,8,4,'#9fffe0');R(x-1+Math.cos(ta)*2,y-1+Math.sin(ta)*2,3,3,'#ff4d6d')}break;
 case 9:{const cols=BOSSES.slice(0,9).map(b=>b.c);for(let i=0;i<9;i++){const a=t*.9+i*TAU/9,x=cx+Math.cos(a)*(84+ph*6),y=cy+Math.sin(a)*(42+ph*3);R(x-2,y-4,5,8,cols[i]);R(x-4,y-2,9,4,cols[i]);RA(x-8,y-8,16,16,cols[i],.14)}if(G.state==='play'){const rr=fr*140;for(let i=0;i<60;i++){const a=i*TAU/60;RA(cx+Math.cos(a)*rr-1,cy+Math.sin(a)*rr*.7-1,2,2,'#ff8fb0',(1-fr)*.35)}}break}}}
function bossFXFront(now,g,ph){if(ph<1)return;const col=ph>=2?'#ff2d55':'#ffb020',wd=g.hf*2*U,t=now/1000;
 if(G.bi>=10){const T=TH2[G.bi];glow(g.x,g.coreY,g.hf*U*1.5,ph>=2?'#ff2d55':T.tel,.1+.06*Math.sin(t*5));for(let i=0;i<6+ph*4;i++){const a=i*TAU/(6+ph*4)+t*.7,rr=g.hf*U*1.1+Math.sin(t*3+i)*6;RA(g.x+Math.cos(a)*rr-1,g.coreY+Math.sin(a)*rr*.8-1-((t*40+i*13)%20),2,2,ph>=2?'#ff5d7d':T.tel,.6)}return}
 for(const s of [-1,1]){const sx=g.x+s*(wd/2-1),sy=g.top+6;for(let k=0;k<10;k++)R(sx+s*k*.6-(s<0?2:0),sy-k*1.4,3,2,k<6?col:'#fff');RA(sx-6,sy-18,12,20,col,.12)}
 if(ph>=2){for(let i=0;i<28;i++){const a=i*TAU/28,rx=wd*.4,ry=8;RA(g.x+Math.cos(a)*rx-1,g.headY-16+Math.sin(a)*ry-1,3,2,'#ffe0e8',.5+.4*Math.sin(t*6+i))}
  for(const s of [-1,1])for(let k=0;k<4;k++)line(g.x+s*(wd/2),g.top+10,g.x+s*(wd/2+26+k*12),g.top-16+k*14+Math.sin(t*5+k)*3,4,(x,y)=>RA(x-1,y-1,2,2,'#ff2d55',.5))}}
/* ---------- 컷신 오버레이 ---------- */
function shText(txt,x,y,col,sh){ctx.fillStyle=sh||'#000';ctx.fillText(txt,x+1,y+1);ctx.fillStyle=col;ctx.fillText(txt,x,y)}
function typed(txt,k){return txt.slice(0,Math.max(0,Math.floor(txt.length*clamp(k,0,1))))}
function drawCineOverlay(now){const c=G.cine,B=G.B;drawReviveCine(now);
 if(c&&c.type==='intro'){const p=clamp((now-c.t0)/Math.max(1,c.dur),0,1),bar=30*Math.min(1,p*5)*(p>.94?(1-p)/.06:1);R(0,0,W,bar,'#000');R(0,H-bar,W,bar,'#000');RA(0,0,W,H,'#000',Math.max(0,.7-p*1.6));
  if(p>.5){const q=clamp((p-.5)/.15,0,1),ex=q*q*(3-2*q),a=p>.9?(1-p)/.1:1;ctx.globalAlpha=Math.max(0,a);ctx.textAlign='center';RA(0,116,W,58,'#000',.5*ex);ctx.font='bold 9px monospace';shText((G.s5!=null?'A B Y S S   '+String(G.s5+1).padStart(2,'0')+' / 10':(G.s4!=null||G.s4Rush!=null)?'E C L I P S E   '+String((G.s4!=null?G.s4:G.s4Rush)+1).padStart(2,'0')+' / 10':(typeof _c3Swap!=='undefined'&&_c3Swap&&_c3Swap.art)?'O R I G I N':G.bi<10?'G U A R D I A N   '+String(G.bi+1).padStart(2,'0')+' / 20':'P A R T   2   ·   G U A R D I A N   '+String(G.bi+1).padStart(2,'0')+' / 20'),W/2,128,'#f4d996');ctx.font='bold 22px monospace';shText(B.name,W/2-(1-ex)*60,151,'#ffffff',B.c);ctx.font='10px monospace';shText(BOSS_META[G.bi].epi,W/2+(1-ex)*60,166,B.pal[2]);ctx.textAlign='left';ctx.globalAlpha=1}
  if(now-c.t0>900){ctx.font='8px monospace';ctx.fillStyle='#8b9b9c';ctx.textAlign='right';ctx.fillText('클릭하면 건너뜁니다',W-8,H-8);ctx.textAlign='left'}}
 if(c&&c.type==='phase'){const p=clamp((now-c.t0)/c.dur,0,1),bar=26*Math.min(1,p*6)*(p>.94?(1-p)/.06:1),col=c.ph>=2?'#ff2d55':'#ffb020';R(0,0,W,bar,'#000');R(0,H-bar,W,bar,'#000');RA(0,0,W,H,col,Math.max(0,.22-p*.4));
  const a=p<.08?p/.08:p>.9?(1-p)/.1:1;ctx.globalAlpha=Math.max(0,a);ctx.textAlign='center';ctx.font='bold 26px monospace';shText('PHASE '+(c.ph+1),W/2,132,'#ffffff',col);ctx.font='9px monospace';shText(c.ph>=2?'— 최종 각성 —':'— 각성 —',W/2,146,col);
  const ln=STORY[G.bi].phase[c.ph-1]||'';RA(0,212,W,36,'#000',.65);ctx.font='bold 11px monospace';shText(B.name,W/2,225,B.c);ctx.font='11px monospace';shText('"'+typed(ln,(p-.12)/.55)+'"',W/2,240,'#ffffff');ctx.textAlign='left';ctx.globalAlpha=1}
 if(G.state==='dying'){const t=now-G.dyingAt;if(t>700&&t<3600){const a=t<1000?(t-700)/300:t>3300?(3600-t)/300:1,ln=STORY[G.bi].dying||'';ctx.globalAlpha=clamp(a,0,1);ctx.textAlign='center';RA(0,214,W,34,'#000',.6);ctx.font='bold 10px monospace';shText(B.name,W/2,226,B.c);ctx.font='11px monospace';shText('"'+typed(ln,(t-900)/1500)+'"',W/2,241,'#ffffff');ctx.textAlign='left';ctx.globalAlpha=1}
  if(G.shard){const q=clamp((t-3200)/1500,0,1),sx=lerp(G.shard.x,P.x,q*q),sy=lerp(G.shard.y,P.y-10,q*q)-Math.sin(q*Math.PI)*40*(1-q);glow(sx,sy,14,'#ff8fa0',1-q*.4);R(sx-2,sy-5,4,10,'#ffffff');R(sx-5,sy-2,10,4,'#ffffff');RA(sx-3,sy-3,6,6,'#ff5d8f',.9)}
  RA(0,0,W,H,'#fff',clamp(1-(t-3200)/900,0,1)*(t>3200?1:0)*.9)}}
/* ---------- 메인 그리기 ---------- */
function drawScene(now){const B=G.B,th=B.c,beat=G.state==='wake'?0:G.beat,fr=beat-Math.floor(beat),b=G.boss;
 ctx.save();let zoom=1,zx=G.ent?HOME.x:b.x,zy=G.ent?geo(G.B,HOME.x,HOME.y).coreY:bgeo().coreY;const c=G.cine;if(c&&c.type==='intro'){const p=clamp((now-c.t0)/Math.max(1,c.dur),0,1);zoom=1+.55*Math.pow(1-p,2.2)}else if(G.state==='dying'){const t=now-G.dyingAt;zoom=1+.12*clamp(t/3000,0,1)}
 if(G.shake>0)ctx.translate(Math.round((RND()-.5)*5*Math.min(2,G.shake+.5)),Math.round((RND()-.5)*5*Math.min(2,G.shake+.5)));
 if(zoom!==1){ctx.translate(zx,zy);ctx.scale(zoom,zoom);ctx.translate(-zx,-zy)}hdCam(now,zx,zy);
 drawArenaBG2(now,beat,fr,th);const g=bgeo(),ph=G.phase;if(!b.dorm||(c&&c.type==='intro'))bossFXBack(now,g,ph);
 drawFieldPull(now,beat);
 for(const l of G.lanes){if(beat<l.t0||beat>=l.t1+.6)continue;const on=beat>=l.t1,p=on?1:(beat-l.t0)/(l.t1-l.t0),bl=!on&&p>.7&&Math.floor(beat*8)%2===0;line(l.x0,l.y0,l.x1,l.y1,l.w*.9,(x,y)=>RA(x-l.w/2,y-l.w/2,l.w,l.w,'#ff4d6d',on?.3:.1+(bl?.12:0)));line(l.x0,l.y0,l.x1,l.y1,8,(x,y,i)=>{if(i%2===0)RA(x-1,y-1,2,2,'#ff4d6d',.8)})}
 for(const m of G.movers)drawMoverLane(m,beat);
 for(const cn of G.cones){if(beat<cn.t0||beat>=cn.t2)continue;const T_=T2(),cA=T_?T_.act:'#fff4c0',cT=T_?T_.tel:'#ff4d6d',cE=T_?T_.hi:'#ffffff',act=beat>=cn.t1,a=coneAng(cn,Math.max(beat,cn.t1)),p=act?1:(beat-cn.t0)/(cn.t1-cn.t0);for(let k=-10;k<=10;k++){const aa=a+cn.half*k/10;for(let s=16;s<cn.len;s+=6)RA(cn.x+Math.cos(aa)*s-1.5,cn.y+Math.sin(aa)*s-1.5,3,3,act?cA:cT,act?.32:.05+.12*p)}for(const e of [-1,1])line(cn.x,cn.y,cn.x+Math.cos(a+e*cn.half)*cn.len,cn.y+Math.sin(a+e*cn.half)*cn.len,5,(x,y)=>RA(x-1,y-1,2,2,act?cE:cT,act?.9:.4+.4*p))}
 for(const z of G.zones)drawZone(z,beat);drawRings(beat);drawPuzzle(now,beat);
 for(const s of G.saws){if(beat<s.tp||beat>=s.te)continue;if(beat<s.ts){const p=(beat-s.tp)/(s.ts-s.tp);for(let t=0;t<=1;t+=.04){const q={...s,ts:0,tt:1,te:2},[x,y]=sawPos(q,t);if(Math.floor(t*25)%2===0)RA(x-1,y-1,2,2,'#ff4d6d',.3+.5*p)}for(let t=1;t<=2;t+=.04){const q={...s,ts:0,tt:1,te:2},[x,y]=sawPos(q,t);if(Math.floor(t*25)%2===0)RA(x-1,y-1,2,2,'#ff4d6d',.2+.4*p)}}}
 const dorm=b.dorm,list=[];const bo={pulse:(G.state==='play'||G.state==='count')?Math.pow(1-fr,2):0,expose:G.exposed&&!dorm,open:b.open,eye:b.eye,dorm,flash:G.hurt>0&&Math.floor(now/40)%2===0,warn:b.warn};
 if(G.state==='dying'){ctx.globalAlpha=1-clamp((now-G.dyingAt-2600)/600,0,1)}
 list.push({y:b.y,fn:()=>{entBack(now);drawAwakenAura(now,true);drawOmegaAura(now,true);entClipStart();drawBossDamaged(B,b.x+(G.state==='dying'?Math.round((RND()-.5)*4):0)+hdKick(now,0),b.y+b.slump*U*2+hdKick(now,1),now,bo);entClipEnd();drawAwakenAura(now,false);drawOmegaAura(now,false);entFront(now);if(false&&b.warn>0&&G.bi<10){const gg=bgeo();RA(gg.x-gg.hf*U,gg.top,gg.hf*2*U,(gg.y-gg.top),'#ff2d55',Math.min(.4,b.warn*.4)*(Math.floor(now/70)%2?1:.5))}}});
 b.hands.forEach((h,i)=>list.push({y:h.y+(h.stuck?8:0),fn:()=>{if(h.x>-50&&!h._revHide&&!(G.ent&&G.ent.hideHands))drawHand(ctx,B,h,g.sh[i][0],g.sh[i][1],now,dorm,HS)}}));
 for(const t of G.turrets)list.push({y:t.y,fn:()=>{const a=Number.isFinite(t.aimAng)?t.aimAng:Math.atan2(P.y-t.y,P.x-t.x),firing=t.fireAt>=0&&Math.floor(now/80)%2,pupCol=firing?'#fff0a0':'#ff4d6d';
  if(G.bi>=10){
   RA(t.x-9,t.y+5,18,4,'#000',.4);pcirc(t.x,t.y-4,10,'#1a1206');pcirc(t.x,t.y-4,9,'#8a6a10');pcirc(t.x-1,t.y-5,7.5,'#d8a830');for(let r=0;r<4;r++)R(t.x-8,t.y-10+r*4,16,1,'#6e5a1a');for(const [hx,hy] of [[-4,-8],[3,-6],[-2,-1],[4,0]])R(t.x+hx-1,t.y+hy-1,3,2,'#3a2a08');
   pcirc(t.x,t.y-9,3.4,'#1a1206');pcirc(t.x,t.y-9,2.2,pupCol);R(t.x-1,t.y-10,1,1,'#ffffff');
   if(t.fireAt>beat&&t.warn0<=beat){const ex=t.x+Math.cos(a)*80,ey=t.y-9+Math.sin(a)*80;line(t.x,t.y-9,ex,ey,2,(x,y,i)=>{if(i%3===0)RA(x-1,y-1,2,2,'#ffe79a',.5)})}
  } else {
   RA(t.x-11,t.y+5,22,4,'#000',.45);R(t.x-10,t.y-10,20,15,'#172126');R(t.x-8,t.y-12,16,14,'#39434a');R(t.x-7,t.y-11,14,5,'#8a969c');R(t.x-6,t.y-5,12,6,'#58656a');R(t.x-9,t.y+3,18,2,'#1a2024');R(t.x-7,t.y-9,2,2,'#d5dde0');R(t.x+5,t.y-9,2,2,'#d5dde0');const cx=t.x+Math.cos(a)*15,cy=t.y-6+Math.sin(a)*15;line(t.x,t.y-6,cx,cy,2,(x,y)=>R(x-2,y-2,4,4,'#c9d3d8'));R(t.x-2,t.y-4,4,4,pupCol);if(t.fireAt>beat&&t.warn0<=beat)line(t.x,t.y-6,t.x+Math.cos(a)*80,t.y-6+Math.sin(a)*80,3,(x,y,i)=>{if(i%3===0)RA(x-1,y-1,2,2,'#ffe79a',.65)})
  }}});
 for(const t of G.laserPods)list.push({y:t.y,fn:()=>{const active=beat>=t.t1,glw=active?'#ffffff':(Math.floor(now/90)%2?t.col:'#ffe79a');RA(t.x-13,t.y-13,26,26,t.col,active?.16:.08);R(t.x-10,t.y-9,20,18,'#10191e');R(t.x-8,t.y-8,16,15,'#39434a');R(t.x-7,t.y-7,14,4,'#8a969c');R(t.x-6,t.y+1,12,4,'#263238');R(t.x-5,t.y-5,10,2,t.col);R(t.x-4,t.y-2,8,5,'#172126');if(t.v)R(t.x-2,t.y+6,4,9,active?'#ffffff':'#8a969c');else R(t.side<0?t.x+5:t.x-15,t.y-1,10,4,active?'#ffffff':'#8a969c');R(t.x-2,t.y-1,4,3,glw)}});
 if(G.state!=='dead')list.push({y:P.y,fn:()=>{if(window.DASH70)DASH70.tick(now);const blink=now<P.inv&&Math.floor(now/70)%2===0&&!(G.cine||G.state==='dying');if(blink)return;/* v70: 대시 잔상은 999996이 캐릭터 모양으로 그린다 */RA(P.x-9,P.y+1,18,4,'#000',.4);const [lx,ly]=lungeOffset(now),fl=P.face.x<0;drawSword(P.x-12+lx,P.y-19+ly,2,fl,now);drawKnight(ctx,P.x-12+lx,P.y-19+ly,2,fl,P.walkOn?P.walkT:null,P.walkOn?null:now/430);if(G.state==='play'&&!G.cine){let near=false;for(const b of G.bullets){if(beat<b.t0)continue;const [bx,by]=bpos(b,beat);if(Math.abs(bx-P.x)<48&&Math.abs(by-P.y)<48){near=true;break}}if(near){pcirc(P.x,P.y,3.5,'#ff2d55',.9);pcirc(P.x,P.y,2.2,'#ffffff')}}}});
 if(G.state!=='dead')list.push({y:P.y-2,fn:()=>drawBossPet(now)});
 list.sort((a,c2)=>a.y-c2.y);for(const it of list)it.fn();ctx.globalAlpha=1;drawPuzzleTop(now,beat);
 if(!dorm&&G.state!=='dying'){bossFXFront(now,g,ph);const wd=g.hf*2*U;
  if(false&&ph>=1&&G.bi<10){const col=ph>=2?'#ff2d55':'#ffb020',a=.35+.25*Math.sin(now/150);RA(g.x-wd/2-3,g.top-3,wd+6,3,col,a);RA(g.x-wd/2-3,g.y-2,wd+6,3,col,a);RA(g.x-wd/2-3,g.top,3,g.y-g.top,col,a);RA(g.x+wd/2,g.top,3,g.y-g.top,col,a)}
  if(G.vuln){if(G.vuln.type==='stun'){for(let i=0;i<3;i++){const a=now/260+i*2.09,sx=g.x+Math.cos(a)*26,sy=g.headY-10+Math.sin(a)*7;R(sx-3,sy-1,7,3,'#ffe79a');R(sx-1,sy-3,3,7,'#ffe79a')}}else if(G.vuln.type==='overload'&&Math.floor(now/90)%2)RA(g.x-wd/2,g.top,wd,g.y-g.top,'#ff4d2d',.18);glow(g.x,g.coreY,26,'#ffe79a',.5+.3*Math.sin(now/100))}}
 for(const s of G.saws){if(beat<s.ts||beat>s.te)continue;const [x,y]=sawPos(s,beat);
  if(G.bi>=10){for(let i=0;i<5;i++){const a=now/80+i*TAU/5,px=x+Math.cos(a)*8,py=y+Math.sin(a)*8;R(px-2,py-3,4,6,'#efe4cd');R(px-1,py-1,2,3,'#c9b896')}pcirc(x,y,5,'#d8c8a0');pcirc(x,y,3,'#8a7455');R(x-2,y-2,4,4,'#ff4d6d')}
  else{pcirc(x,y,10,'#9aa5ad');pcirc(x,y,7,'#5c6870');for(let i=0;i<8;i++){const a=now/70+i*Math.PI/4;R(x+Math.cos(a)*10.5-1.5,y+Math.sin(a)*10.5-1.5,3,3,'#e8eef0')}R(x-2,y-2,4,4,'#ff4d6d')}}
 for(const rt of G.rotors){if(beat<rt.t0||beat>=rt.t2)continue;if(G.bi>=10){skRotor(rt,beat,now);continue}const act=beat>=rt.t1;for(let i=0;i<rt.arms;i++){const [x,y]=rotorTip(rt,i,beat);line(rt.cx,rt.cy,x,y,3,(px,py)=>RA(px-3,py-3,6,6,'#ff4d6d',act?.95:.25));if(act){line(rt.cx,rt.cy,x,y,3,(px,py)=>RA(px-1,py-1,2,2,'#fff',.9));glow(x,y,10,'#ff4d6d',.7)}if(i>=2||rt.arms===1){pcirc(x,y,8,'#9aa5ad');R(x-2,y-2,4,4,'#ff4d6d')}}}
 for(const bm of G.beams){if(beat<bm.t0||beat>=bm.t2)continue;if(G.bi>=10){if(bm.kind==='tongue'){skDrawTongue(bm,beat,now);continue}if(G.bi===14&&bm.kind!=='lure'){skDrawSilk(bm,beat,now);continue}}const a=beamAng(bm,beat),dx=Math.cos(a),dy=Math.sin(a),alert=(G.bi>=10&&skBeamCol(bm))||bm.col||'#ff4d6d';
  if(beat<bm.t1){const p=clamp((beat-bm.t0)/(bm.t1-bm.t0),0,1),bl=p>.76&&Math.floor(now/65)%2===0,s0=bm.both?-bm.L:0;for(let s=s0;s<bm.L;s+=5)if((s/5)%2===0)RA(bm.ox+dx*s-1,bm.oy+dy*s-1,2,2,alert,.22+.72*p);if(bm.da){const a2=bm.a0+bm.da,ex=Math.cos(a2),ey=Math.sin(a2);for(let s=s0;s<bm.L;s+=7)if((s/7)%2===0)RA(bm.ox+ex*s-1,bm.oy+ey*s-1,2,2,alert,.18+.48*p)}if(bl)for(let s=s0;s<bm.L;s+=bm.w*.7)RA(bm.ox+dx*s-bm.w/2,bm.oy+dy*s-bm.w/2,bm.w,bm.w,'#ffffff',.12);glow(bm.ox,bm.oy,8+p*8,alert,.4+.5*p)}
  else{const p=clamp((beat-bm.t1)/bm.fireDur,0,1),tip=bm.L*(p*p*(3-2*p)),s0=bm.both?-tip:0;for(let s=s0;s<tip;s+=3)RA(bm.ox+dx*s-bm.w*1.1,bm.oy+dy*s-bm.w*1.1,bm.w*2.2,bm.w*2.2,alert,.1);for(let s=s0;s<tip;s+=3)RA(bm.ox+dx*s-bm.w*.72,bm.oy+dy*s-bm.w*.72,bm.w*1.44,bm.w*1.44,alert,.18);for(let s=s0;s<tip;s+=2)R(bm.ox+dx*s-bm.w/2,bm.oy+dy*s-bm.w/2,bm.w,bm.w,alert);for(let s=s0;s<tip;s+=2)R(bm.ox+dx*s-bm.w*.19,bm.oy+dy*s-bm.w*.19,bm.w*.38,bm.w*.38,'#ffffff');glow(bm.ox,bm.oy,16,alert,.9);if(p<.97){const ex=bm.ox+dx*tip,ey=bm.oy+dy*tip;RA(ex-bm.w*1.8,ey-bm.w*1.8,bm.w*3.6,bm.w*3.6,'#ffffff',.72*(1-p*.45));RA(ex-bm.w*2.5,ey-bm.w*2.5,bm.w*5,bm.w*5,alert,.45*(1-p*.4))}}}
 if((b.track||b.lock)&&G.state==='play'){const g2=bgeo(),dx=Math.cos(b.aimAng),dy=Math.sin(b.aimAng),bl=b.lock&&Math.floor(now/70)%2===0;for(let s=8;s<520;s+=5)if((s/5)%2===0)RA(g2.x+dx*s-1,g2.headY+dy*s-1,2,2,'#ff4d6d',b.lock?(bl?1:.6):.35);
  if(b.lock&&b.sweep){for(let k=1;k<=4;k++){const a=b.aimAng+b.sweep*k/4,ex=Math.cos(a),ey=Math.sin(a);for(let s=20;s<520;s+=7)if((s/7)%2===0)RA(g2.x+ex*s-1,g2.headY+ey*s-1,2,2,'#ff4d6d',k===4?.9:.28)}for(let k=0;k<=24;k++){const a=b.aimAng+b.sweep*k/24,ex=Math.cos(a),ey=Math.sin(a);for(let s=24;s<520;s+=9)RA(g2.x+ex*s-2,g2.headY+ey*s-2,4,4,'#ff4d6d',.09+(bl?.07:0))}for(const rr of [90,170,250,330]){for(let k=0;k<=16;k++){const a=b.aimAng+b.sweep*k/16;RA(g2.x+Math.cos(a)*rr-1,g2.headY+Math.sin(a)*rr-1,3,3,'#ff4d6d',.7)}}}}
 for(const cn of G.cones){}
 for(const m of G.movers){if(beat<m.t0||beat>m.t1)continue;const [x,y]=mvPos(m,beat),dir=Math.sign(m.x1-m.x0)||1;if(G.bi>=10&&m.kind==='scrap'){skMover(m,x,y,now);continue}if(m.kind==='gear'){glow(x,y,m.r+8,'#ffb020',.5);drawGear(x,y,m.r,now/120*(dir||1),'#8eda9e','#26382f')}else if(m.kind==='train')drawTrainBody(x,y,dir,m.len,now);else if(m.kind==='drone')drawDrone(x,y,now);else if(m.kind==='hornet')drawHornet(x,y,now);else if(m.kind==='scrap'){drawScrap(x,y,now,m.spin);RA(x-6,y+m.r+2,12,3,'#000',.3)}}
 for(const a of G.arcs){if(beat<a.t0||beat>=a.t1)continue;const p=(beat-a.t0)/(a.t1-a.t0),x=lerp(a.x0,a.x1,p),y=lerp(a.y0,a.y1,p)-Math.sin(p*Math.PI)*a.h;if(G.bi>=10&&skArc(a,x,y,now))continue;if(a.kind==='fire'){glow(x,y,10,'#ff8a3d',.9);pcirc(x,y,5,'#ffb020');pcirc(x,y,3,'#ffe79a');for(let i=1;i<5;i++)RA(x-(a.x1-a.x0)*.01*i,y+i*2,3,3,'#ff6a20',.5-i*.1)}else{pcirc(x,y,4,a.kind==='mine'?'#39434a':'#8a969c');R(x-1,y-1,2,2,'#ff4d6d')}}
 for(const r of G.rockets){if(beat<r.t0||beat>=r.t1)continue;const p=(beat-r.t0)/(r.t1-r.t0),y=r.y-p*p*(r.y+30);
  if(G.bi>=10){pcirc(r.x,y,4,'#5a7a34');pcirc(r.x,y,2.4,'#8fbf58');R(r.x-1,y-1,2,2,'#d8f0a8');RA(r.x-2,y+4,4,9,'#6a9a44',.4);RA(r.x-1,y+8,2,5,'#a8d878',.35)}
  else{R(r.x-2,y-8,4,10,'#c9d3d8');R(r.x-1,y-11,2,3,'#ff4d6d');R(r.x-3,y+2,6,3,'#ffb020');RA(r.x-2,y+5,4,10,'#ffb020',.5)}}
 for(const bu of G.bullets){if(beat<bu.t0)continue;const [x,y]=bpos(bu,beat);if(G.bi>=10){skBullet(bu,x,y,now);continue}glow(x,y,7,'#ff4d6d',.8);R(x-2,y-3,5,7,'#ff4d6d');R(x-3,y-2,7,5,'#ff4d6d');R(x-1,y-1,3,3,'#ffffff')}
 for(const s of G.shots){const k=(now-s.t)/180;if(k>=1)continue;const c2=s.jd==='FINISH'?'#ffffff':s.jd==='PERFECT'?'#ffe79a':s.jd==='GOOD'?'#a6f5c6':'#8dcdf5';line(s.x0,s.y0,s.x1,s.y1,4,(x,y)=>RA(x-2,y-2,4,4,c2,1-k));pcirc(s.x1,s.y1,4+k*12,c2,(1-k)*.7)}
 for(const s of G.slashFx){const k=(now-s.t)/320;if(k>=1)continue;/* 허공 베기: 예전엔 몸을 가로지르는 흰 직선 → 휘두른 방향으로 휘는 호(스킨·무기 색) */if(s.air&&typeof paArc==='function'){const T=window.DELUXE60&&DELUXE60.theme(),col=(T&&T.c)||(window.SWORD59&&SWORD59.get()&&SWORD59.byId(SWORD59.get()).col)||curWp().trail||'#ffffff',rev=Math.min(1,k/.35),fade=k<.35?1:1-(k-.35)/.65;paArc(s.cx,s.cy,18,s.a0-1.2,s.a0-1.2+2.4*rev,4,col,'#ffffff',fade);continue}const L=(s.fin?46:28)*Math.min(1,k*4);for(const o of s.fin?[-.5,0,.5]:[0]){const a=s.a+o,ex=Math.cos(a)*L,ey=Math.sin(a)*L;line(s.x-ex,s.y-ey,s.x+ex,s.y+ey,3,(x,y)=>RA(x-1.5,y-1.5,3,3,s.col||'#ffffff',1-k))}}
 for(const p of G.parts)RA(p.x,p.y,p.s,p.s,p.col,clamp(p.life/p.max,0,1));if(typeof cfxDraw==='function')cfxDraw(now,beat);
 for(const f of G.fxr){const k=(now-f.t)/f.dur;if(k<0||k>=1)continue;const r=f.r1*(1-Math.pow(1-k,3)),n=Math.max(24,Math.round(r*.7));for(let i=0;i<n;i++){const a=i*TAU/n;RA(f.x+Math.cos(a)*r-1.5,f.y+Math.sin(a)*r*.8-1.5,3,3,f.col,(1-k)*.9)}}
 ctx.restore();if(G.flash>0)RA(0,0,W,H,G.state==='dying'||G.cine?'#ffffff':'#ff2d55',Math.min(1,G.flash)*(G.state==='dying'||G.cine?.8:.6));
 if(G.clickTarget&&G.vuln){const c2=G.clickTarget,k=clamp((now-c2.born)/c2.life,0,1),pu=1+.08*Math.sin(now/70),col=c2.fin?'#ffffff':'#ffe79a';glow(c2.x,c2.y,(c2.r+8)*pu,col,c2.fin?1:.7);pcirc(c2.x,c2.y,c2.r+3,col,.95);pcirc(c2.x,c2.y,c2.r,'#182331',1);pcirc(c2.x,c2.y,c2.r-4,c2.fin?'#ff5d8f':'#ffd166',.35);const rr=(c2.r+10)*(1-k)+4;for(let i=0;i<40;i++){const a=i*TAU/40;RA(c2.x+Math.cos(a)*rr-1,c2.y+Math.sin(a)*rr-1,2,2,col,.75)}ctx.textAlign='center';ctx.font='bold '+(c2.fin?12:11)+'px monospace';ctx.fillStyle='#ffffff';if(isTouchUI())ctx.fillText(c2.fin?'FINISH':'터치',c2.x,c2.y+4);else{ctx.font='bold '+(c2.fin?16:14)+'px monospace';ctx.fillStyle='#ffe79a';ctx.fillText(c2.key,c2.x,c2.y+(c2.fin?2:5));if(c2.fin){ctx.font='bold 8px monospace';ctx.fillStyle='#ffffff';ctx.fillText('FINISH',c2.x,c2.y+13)}};ctx.textAlign='left'}
 drawCineOverlay(now);if(!(G.cine&&(G.cine.type==='intro'||G.cine.mem)))drawFightHUD(now,beat,fr)}
function drawFightHUD(now,beat,fr){const B=G.B,cx=W/2,ph=G.phase;ctx.font='bold 10px monospace';
 drawBossBar(now);ctx.font='bold 10px monospace';
 if(G.state==='play'&&!G.cine&&G.vuln){const ev=!G.vuln,tot=ev?G.phraseEnd-(G.phraseEnd-EVADE[ph]-(diff==='easy'?-2:0)):G.vuln.t1-G.vuln.t0,left=ev?Math.max(0,G.phraseEnd-beat):Math.max(0,G.vuln.t1-beat),pr=clamp(left/Math.max(1,ev?EVADE[ph]+(diff==='easy'?-2:0):tot),0,1);
  ctx.textAlign='center';ctx.font='bold 10px monospace';ctx.fillStyle=ev?'#9edbff':'#ffe79a';ctx.fillText(ev?'▶ 회피 시간 · '+Math.ceil(left*G.ms/1000)+'초':'★ 반격 시간 · '+Math.ceil(left*G.ms/1000)+'초',cx,28);R(cx-70,31,140,3,'#05090b');R(cx-69,32,138*pr,1,ev?'#9edbff':'#ffe79a');ctx.textAlign='left'}
 if(G.vuln&&G.state==='play'){ctx.font='bold 11px monospace';ctx.textAlign='center';ctx.fillStyle=Math.floor(now/120)%2?'#ffe79a':'#ffffff';ctx.fillText(VN2[G.vuln.type]+(isTouchUI()?' 원을 터치!':' 원의 키를 눌러!'),cx,AY+AH-6);ctx.textAlign='left'}
 drawPlayerBar(now);
 R(cx-92,H-15,184,13,'#0a1418');R(cx-92,H-15,184,1,'#3a4a4f');R(cx-92,H-3,184,1,'#3a4a4f');if(G.exposed)RA(cx-92,H-14,184,11,'#ffe79a',.15);
 for(let k=0;k<7;k++){const bb=Math.ceil(beat)+k,d=(bb-beat)*36;if(d>90)continue;const big=((bb%4)+4)%4===0,a=clamp(1-d/95,.25,1);RA(cx+d-1,H-13,3,9,big?'#ffe79a':'#a6f5c6',a);RA(cx-d-1,H-13,3,9,big?'#ffe79a':'#a6f5c6',a)}
 {const errMs=Math.min(fr,1-fr)*G.ms,w=win(),onB=errMs<=w.p,nearB=errMs<=w.g,mcol=onB?'#ffe79a':nearB?'#a6f5c6':'#7f9a92';R(cx-3,H-17,6,17,mcol);if(onB)RA(cx-6,H-19,12,21,'#ffe79a',.35)}
 RA(W-84,H-29,80,27,'#04070a',.72);R(W-84,H-29,80,1,'#3a4a4f');hudText(String(G.score).padStart(6,'0'),W-8,H-17,'right','#ffe79a','bold 11px monospace');hudText('COMBO '+G.combo,W-8,H-5,'right',G.combo>0?'#b9f5ce':'#9ab0a8','bold 10px monospace');ctx.textAlign='left';
 if(G.state==='count'){const n=Math.ceil(-beat);if(n>=1&&n<=4){ctx.textAlign='center';ctx.font='bold 40px monospace';ctx.fillStyle='#ffe79a';ctx.fillText(String(n),cx,AY+AH/2+14);ctx.textAlign='left'}}
 ctx.font='bold 9px monospace';ctx.textAlign='center';hdPops(now);ctx.textAlign='left';drawPuzzleHUD(now,beat);drawSpecialHUD(now);drawParryFX(now)}

