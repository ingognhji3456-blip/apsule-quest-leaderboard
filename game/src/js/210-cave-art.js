/* ===== per-cave decor (Part B) ===== */
/* ================= 동굴별 컨셉 미술 ================= */
function caveFloorMotif(ci,X,Y,tx,ty,th,now,h){
 const f1=shade(th,.3),f2=shade(th,.27),sp=shade(th,.4);
 R(X,Y,CT,CT,(tx+ty)%2?f1:f2);R(X+(h%20),Y+((h>>5)%20),2,2,sp);R(X+((h>>10)%20),Y+((h>>15)%20),1,1,sp);
 switch(ci){
  case 0: if(h%17===0){const rot=now/2400+h;pcirc(X+12,Y+12,7,shade(th,.5),1);pcirc(X+12,Y+12,3,shade(th,.3),1);for(let i=0;i<6;i++){const a=i*TAU/6+rot;R(X+12+Math.cos(a)*8-1,Y+12+Math.sin(a)*8-1,2,2,shade(th,.5))}}break;
  case 1: if((tx+ty*3)%9===0){R(X+4,Y+11,16,2,shade(th,.45));if(Math.floor(now/500+tx)%3===0)RA(X+4,Y+11,16,2,'#eaffff',.5)}break;
  case 2: if(h%13===0){R(X+6,Y+14,12,2,'#3a180c');RA(X+6,Y+14,12,2,'#ff5a20',.35+.25*Math.sin(now/260+tx))}break;
  case 3: if(ty%2===0&&h%5<2){R(X,Y+16,CT,2,'#5a4a30');R(X+3,Y+9,2,16,'#6d6a60');R(X+18,Y+9,2,16,'#6d6a60')}break;
  case 4: if(h%11===0){line(X+2,Y+20,X+22,Y+4,6,(x,y)=>RA(x-1,y-1,2,2,'#cdeeff',.4))}break;
  case 5: {const hs=8,row=Math.round(Y/hs),col=Math.round((X+(row%2?hs/2:0))/hs);if((row+col)%7===0){const rot=now/1600+row+col;for(let i=0;i<6;i++){const a=i*TAU/6+rot;RA(X+12+Math.cos(a)*7-1,Y+12+Math.sin(a)*7-1,2,2,shade(th,.5),.4)}}break}
  case 6: if(h%9===0){R(X+9,Y+10,3,3,shade(th,.7));RA(X+9,Y+10,3,3,'#ffe79a',.4+.3*Math.sin(now/300+tx))}break;
  case 7: if(h%19===0){ctx.font='7px monospace';ctx.fillStyle=shade(th,.55);ctx.fillText(String((h>>4)%12+1),X+9,Y+16)}break;
  case 8: if(h%15===0)RA(X+8+((h>>3)%8),Y+8+((h>>6)%8),2,2,'#ffffff',.35+.35*Math.sin(now/220+tx*3));break;
  case 9: if(h%10===0){const p=.5+.5*Math.sin(now/520+tx*.4+ty*.4);line(X+2,Y+2,X+22,Y+22,5,(x,y)=>RA(x-1,y-1,2,2,th,.25+.35*p))}break;
 }}
function caveWallMotif(ci,X,Y,tx,ty,th,now,h,below){
 const wt=shade(th,.12),wf=shade(th,.46),mo=shade(th,.28),hl=shade(th,.8);
 if(below){R(X,Y,CT,CT,wf);for(let r=0;r<3;r++){R(X,Y+r*8,CT,1,mo);R(X+((r+tx)%2?6:15),Y+r*8+1,1,7,mo)}R(X,Y,CT,2,hl)}
 else{R(X,Y,CT,CT,wt);if(h%7===0)R(X+(h>>4)%18,Y+(h>>9)%18,3,2,shade(th,.18))}
 switch(ci){
  case 0: if(h%8===0)for(let i=0;i<5;i++)R(X+2+i*4,Y+3,2,2,shade(th,.3));break;
  case 1: if(ty%3===0){R(X,Y+9,CT,2,shade(th,.55));if(h%5===0)RA(X+((h>>3)%18),Y+8,2,4,'#eaffff',.55+.35*Math.sin(now/150+tx))}break;
  case 2: if(h%6===0)RA(X+((h>>2)%18),Y+((h>>5)%18),3,2,'#ff5a20',.25+.2*Math.sin(now/300+tx));break;
  case 3: if(h%12===0){R(X+2,Y+2,CT-4,3,'#8a2a2a');R(X+2,Y+2,CT-4,1,'#ffe79a')}break;
  case 4: if(!(h%4)){const len=4+((h>>3)%6);R(X+((h>>1)%18)+2,Y,2,len,'#cdeeff');R(X+((h>>1)%18)+1,Y+len-1,4,2,'#eaffff')}break;
  case 5: {const hs=8,row=Math.round(Y/hs),col=Math.round(X/hs);const dead=((row*7+col*13+ci)%5===0);for(let i=0;i<6;i++){const a=i*TAU/6;R(X+12+Math.cos(a)*6-1,Y+12+Math.sin(a)*6-1,1,1,dead?'#241f30':shade(th,.55))}break}
  case 6: if(h%7===0){R(X+2,Y+2,CT-4,CT-4,shade(th,.28));R(X+2,Y+2,CT-4,2,shade(th,.5))}break;
  case 7: if(h%14===0)for(let i=0;i<8;i++){const a=i*TAU/8+now/2600;R(X+12+Math.cos(a)*8-1,Y+12+Math.sin(a)*8-1,1,1,shade(th,.5))}break;
  case 8: if(h%10===0){pcirc(X+12,Y+11,5,'#0a1a16');pcirc(X+12,Y+11,3,shade(th,.8));const lk=Math.sin(now/900+tx)*1.2;R(X+11+lk,Y+10,2,2,'#ff4d6d')}break;
  case 9: if(h%6===0){const p=.5+.5*Math.sin(now/520+tx*.3);line(X+2,Y+22,X+22,Y+2,5,(x,y)=>RA(x-1,y-1,2,2,th,.2+.3*p))}break;
 }}
function caveCrystal(ci,c,X,Y,now){const th=BOSSES[ci].c,pl=.8+.2*Math.sin(now/300+c.x);
 switch(ci){
  case 3: glow(X,Y-6,10,'#fff0a0',.3+.2*pl);R(X-3,Y-9,7,8,'#2a2a2a');R(X-2,Y-8,5,6,'#fff0a0');R(X-1,Y-7,3,4,'#ffffff');break;
  case 4: R(X-1,Y-11*c.s,2,11*c.s,'#dff4ff');R(X-4,Y-4,3,4,shade(th,.6));R(X+2,Y-6,3,6,shade(th,.85));R(X-1,Y-11*c.s,1,3,'#fff');RA(X-9,Y-12,20,14,th,.14*pl);break;
  case 5: for(let i=0;i<6;i++){const a=i*TAU/6;RA(X+Math.cos(a)*7-1,Y+Math.sin(a)*7-1,3,3,th,.35)}glow(X,Y,9,th,.35*pl);break;
  case 6: R(X-5,Y-2,10,4,'#6d6a60');R(X-1,Y-6,2,6,'#8a969c');RA(X-8,Y-8,16,14,th,.12*pl);break;
  case 7: pcirc(X,Y,6,shade(th,.35));pcirc(X,Y,4,shade(th,.6));for(let i=0;i<8;i++){const a=i*TAU/8+now/2000;R(X+Math.cos(a)*5-1,Y+Math.sin(a)*5-1,1,1,'#fff0a0')}break;
  case 8: pcirc(X,Y-3,6,'#0a1a16');pcirc(X,Y-3,4,shade(th,.85));R(X-1+Math.sin(now/700)*1.5,Y-4,2,2,'#ff4d6d');break;
  case 9: {const p=.6+.4*Math.sin(now/500+c.x);glow(X,Y-3,9*p,th,.4*p);pcirc(X,Y-3,3,th,.8)}break;
  default: R(X-1,Y-8*c.s,3,8*c.s,th);R(X-4,Y-4*c.s,3,4*c.s,shade(th,.75));R(X+2,Y-5*c.s,3,5*c.s,shade(th,.9));R(X-1,Y-8*c.s,1,3,'#fff');RA(X-10,Y-12,22,16,th,.12*pl);
 }}
function caveTorch(ci,X,Y,now,tseed){const th=BOSSES[ci].c;
 if(ci===1){R(X-2,Y+4,5,7,'#1a2226');R(X-3,Y+3,7,2,'#39434a');const on=Math.floor(now/160+tseed)%3;glow(X,Y+1,7,th,.5+.2*on);R(X-1,Y,2,3,on?'#eaffff':shade(th,.5));return}
 if(ci===4){R(X-2,Y+4,5,8,'#2a3a44');R(X-3,Y+3,7,2,'#4a5a64');glow(X,Y+1,7,'#cdeeff',.45+.15*Math.sin(now/240+tseed));R(X-1,Y-1,2,3,'#eaffff');return}
 if(ci===5){glow(X,Y+2,8,th,.4+.25*Math.sin(now/260+tseed));pcirc(X,Y+2,3,shade(th,.7));return}
 if(ci===8){R(X-3,Y+2,6,5,'#0a1a16');pcirc(X,Y+4,3,shade(th,.9));R(X-1+Math.sin(now/600+tseed)*1.2,Y+3,2,2,'#ff4d6d');return}
 if(ci===9){glow(X,Y+2,7+2*Math.sin(now/500+tseed),th,.45);pcirc(X,Y+2,3,th,.85);return}
 R(X-2,Y+4,5,8,'#2a2a2a');R(X-3,Y+3,7,2,'#4a4a4a');const fh=4+Math.floor(now/90+tseed)%3;R(X-2,Y+3-fh,4,fh,ci===2?'#ff5a20':'#ffb020');R(X-1,Y+3-fh+1,2,fh-1,ci===2?'#ffcf7a':'#ffe79a')}
function caveProp(ci,p,X,Y,now){const th=BOSSES[ci].c;
 switch(ci){
  case 0: if(p.k===0){const a=now/1600*(p.x%2?1:-1);pcirc(X,Y,6,'#3a443f');for(let i=0;i<8;i++){const aa=a+i*TAU/8;R(X+Math.cos(aa)*6-1,Y+Math.sin(aa)*6-1,2,2,shade(th,.5))}pcirc(X,Y,2,'#1a2024')}
   else if(p.k===1){R(X-1,Y-10,2,10,'#4a544f');pcirc(X,Y-10,3,shade(th,.5))}else{R(X-4,Y-3,8,6,'#2a332e');R(X-2,Y-1,4,2,shade(th,.5))}break;
  case 1: if(p.k===0){R(X-6,Y-2,12,4,'#20303a');R(X-6,Y-2,12,1,'#3a4a56');RA(X-8,Y-6,16,8,th,.2+.15*Math.sin(now/140))}
   else if(p.k===1){R(X-1,Y-9,2,9,'#20303a');glow(X,Y-10,4,th,.5)}else{R(X-4,Y-3,8,6,'#172126');R(X-1,Y-1,3,3,th)}break;
  case 2: if(p.k===0){R(X-6,Y-4,12,8,'#3a221d');R(X-6,Y-4,12,2,'#5a352a');RA(X-4,Y+3,8,2,'#ff5a20',.4)}
   else if(p.k===1){R(X-1,Y-10,2,10,'#2a1812');R(X-3,Y-11,7,2,'#3a221d')}else{pcirc(X,Y,4,'#5a2a18');RA(X-3,Y-3,6,6,'#ff5a20',.3+.2*Math.sin(now/200))}break;
  case 3: if(p.k===0){pcirc(X,Y,3,'#3a1a1a');pcirc(X,Y,2,now%1400<700?'#ff4d6d':'#3a1a1a');R(X-1,Y-8,2,8,'#2a2a26')}
   else if(p.k===1){pcirc(X,Y,7,'#3a3934');pcirc(X,Y,4,'#1a1814');R(X-1,Y-1,2,2,'#6d6a60')}else{R(X-6,Y-4,12,8,'#4a4640');R(X-6,Y-4,12,2,'#6d6a60')}break;
  case 4: if(p.k===0){R(X-5,Y-9,10,11,'#0d1a20');R(X-4,Y-8,8,9,'#a8e2ff');pcirc(X,Y-4,2,'#eaffff')}
   else if(p.k===1){R(X-1,Y-12,2,12,'#dff4ff');RA(X-6,Y-14,12,14,'#cdeeff',.16)}else{R(X-4,Y-3,8,6,'#20303a');R(X-2,Y-1,4,2,'#cdeeff')}break;
  case 5: if(p.k===0){R(X-4,Y-8,8,10,'#25213f');for(let i=0;i<3;i++)RA(X-3+i*3,Y-1,2,3,'#c9bff0',.4);R(X-2,Y-9,4,2,'#5f5a86')}
   else if(p.k===1){for(let i=0;i<6;i++){const a=i*TAU/6;R(X+Math.cos(a)*5-1,Y+Math.sin(a)*5-1,2,2,'#5f5a86')}}else{RA(X-1,Y-14,2,14,'#e8dfff',.3+.2*Math.sin(now/300))}break;
  case 6: if(p.k===0){R(X-7,Y-5,14,9,'#3a3018');R(X-7,Y-5,14,2,'#5a4a28');R(X-2,Y-9,3,5,'#6d6a60')}
   else if(p.k===1){R(X-6,Y-2,12,4,'#4a3a1c');pcirc(X-3,Y,2,'#8a7440');pcirc(X+3,Y,2,'#8a7440')}else{const b=now/1000+p.x;R(X+Math.sin(b)*3-2,Y+Math.cos(b*1.3)*2-2,4,4,'#8a7440')}break;
  case 7: if(p.k===0){R(X-1,Y-12,2,12,'#5a4a28');const sw=Math.sin(now/900)*.4;line(X,Y-2,X+Math.sin(sw)*10,Y+8,2,(x,y)=>R(x-1,y-1,2,2,'#8a7440'))}
   else if(p.k===1){pcirc(X,Y,7,'#33202b');pcirc(X,Y,5,'#84566b');R(X-1,Y-4,1,4,'#fff0a0')}else{for(let i=0;i<8;i++){const a=i*TAU/8+now/2400;R(X+Math.cos(a)*6-1,Y+Math.sin(a)*6-1,1,1,shade(th,.6))}}break;
  case 8: if(p.k===0){pcirc(X,Y,6,'#0a1a16');pcirc(X,Y,4,shade(th,.85));R(X-1+Math.sin(now/700+p.x)*1.5,Y-1,2,2,'#ff4d6d')}
   else if(p.k===1){R(X-4,Y-8,8,10,'#17322b');RA(X-3,Y-7,6,8,'#9fffe0',.4)}else{RA(X-3,Y-1,6,2,'#ffffff',.4+.3*Math.sin(now/150+p.x))}break;
  case 9: if(p.k===0){const p2=.5+.5*Math.sin(now/500+p.x);glow(X,Y,7*p2,th,.4*p2);pcirc(X,Y,3,th,.7)}
   else if(p.k===1){line(X-8,Y,X+8,Y,4,(x,y)=>RA(x-1,y-1,2,2,th,.25+.2*Math.sin(now/400+x)))}else{RA(X-2,Y-2,4,4,th,.3+.3*Math.sin(now/300+p.x))}break;
 }}
function caveAmbientSpawn(ci){switch(ci){
 case 1: return{vx:(RND()-.5)*30,vy:(RND()-.5)*30,l:.35,c:'#eaffff'};
 case 2: return{vx:(RND()-.5)*8,vy:-24-RND()*20,l:1.1,c:RND()<.5?'#ff5a20':'#ffb020'};
 case 4: return{vx:(RND()-.5)*10,vy:10+RND()*14,l:2.2,c:'#eaffff'};
 case 5: return{vx:(RND()-.5)*10,vy:-6-RND()*6,l:1.4,c:'#c9bff0'};
 case 6: return{vx:(RND()-.5)*16,vy:(RND()-.5)*16,l:1.6,c:'#ffd166'};
 case 7: return{vx:(RND()-.5)*4,vy:-3-RND()*3,l:2.4,c:'#e0cfa8'};
 case 8: return{vx:0,vy:0,l:.25,c:'#ffffff'};
 case 9: return{vx:(RND()-.5)*6,vy:-14-RND()*10,l:1.6,c:'#ff9ab0'};
 default: return{vx:(RND()-.5)*6,vy:-3-RND()*4,l:3,c:'#8ea0a0'};
}}
function caveAmbientOverlay(ci,now){
 if(ci===5&&Math.floor(now/1600)%4===0&&(now%1600)<70)RA(0,0,W,H,'#c9bff0',.1);
 if(ci===9){const p=.5+.5*Math.pow(Math.max(0,Math.sin(now/900)),4);RA(0,0,W,H,BOSSES[9].c,.03*p)}
}
/* ===== 챕터 2 동굴(둥지) 데코 확장 — 기존 함수 재정의(0-9 유지 + 10-19 추가) ===== */
function caveFloorMotif(ci,X,Y,tx,ty,th,now,h){
 const f1=shade(th,.3),f2=shade(th,.27),sp=shade(th,.4);
 R(X,Y,CT,CT,(tx+ty)%2?f1:f2);R(X+(h%20),Y+((h>>5)%20),2,2,sp);R(X+((h>>10)%20),Y+((h>>15)%20),1,1,sp);
 switch(ci){
  case 0: if(h%17===0){const rot=now/2400+h;pcirc(X+12,Y+12,7,shade(th,.5),1);pcirc(X+12,Y+12,3,shade(th,.3),1);for(let i=0;i<6;i++){const a=i*TAU/6+rot;R(X+12+Math.cos(a)*8-1,Y+12+Math.sin(a)*8-1,2,2,shade(th,.5))}}break;
  case 1: if((tx+ty*3)%9===0){R(X+4,Y+11,16,2,shade(th,.45));if(Math.floor(now/500+tx)%3===0)RA(X+4,Y+11,16,2,'#eaffff',.5)}break;
  case 2: if(h%13===0){R(X+6,Y+14,12,2,'#3a180c');RA(X+6,Y+14,12,2,'#ff5a20',.35+.25*Math.sin(now/260+tx))}break;
  case 3: if(ty%2===0&&h%5<2){R(X,Y+16,CT,2,'#5a4a30');R(X+3,Y+9,2,16,'#6d6a60');R(X+18,Y+9,2,16,'#6d6a60')}break;
  case 4: if(h%11===0){line(X+2,Y+20,X+22,Y+4,6,(x,y)=>RA(x-1,y-1,2,2,'#cdeeff',.4))}break;
  case 5: {const hs=8,row=Math.round(Y/hs),col=Math.round((X+(row%2?hs/2:0))/hs);if((row+col)%7===0){const rot=now/1600+row+col;for(let i=0;i<6;i++){const a=i*TAU/6+rot;RA(X+12+Math.cos(a)*7-1,Y+12+Math.sin(a)*7-1,2,2,shade(th,.5),.4)}}break}
  case 6: if(h%9===0){R(X+9,Y+10,3,3,shade(th,.7));RA(X+9,Y+10,3,3,'#ffe79a',.4+.3*Math.sin(now/300+tx))}break;
  case 7: if(h%19===0){ctx.font='7px monospace';ctx.fillStyle=shade(th,.55);ctx.fillText(String((h>>4)%12+1),X+9,Y+16)}break;
  case 8: if(h%15===0)RA(X+8+((h>>3)%8),Y+8+((h>>6)%8),2,2,'#ffffff',.35+.35*Math.sin(now/220+tx*3));break;
  case 9: if(h%10===0){const p=.5+.5*Math.sin(now/520+tx*.4+ty*.4);line(X+2,Y+2,X+22,Y+22,5,(x,y)=>RA(x-1,y-1,2,2,th,.25+.35*p))}break;
  case 10: if(h%15===0){R(X+4,Y+10,3,10,shade(th,.35));R(X+10,Y+6,2,14,shade(th,.5));R(X+16,Y+12,3,8,shade(th,.3))}break;
  case 11: if(h%14===0){pcirc(X+12,Y+12,4,shade(th,.5),.5+.3*Math.sin(now/400+tx));RA(X+8,Y+8,8,8,th,.15+.1*Math.sin(now/300+ty))}break;
  case 12: if(h%12===0){RA(X+4,Y+16,16,4,'#0a2018',.4);RA(X+8,Y+14,4,4,th,.3+.2*Math.sin(now/500+tx))}break;
  case 13: if(h%16===0){R(X+9,Y+8,1,10,'#fff7dd');R(X+6,Y+14,8,2,'#e8e2c8')}break;
  case 14: if((tx+ty)%8===0){line(X+2,Y+2,X+22,Y+22,7,(x,y)=>RA(x-1,y-1,1,1,'#f0b8ff',.3))}break;
  case 15: {const hs=8,row=Math.round(Y/hs),col=Math.round((X+(row%2?hs/2:0))/hs);if((row+col)%6===0){const rot=-now/1400+row-col;for(let i=0;i<6;i++){const a=i*TAU/6+rot;RA(X+12+Math.cos(a)*6-1,Y+12+Math.sin(a)*6-1,2,2,'#8a7010',.3)}}break}
  case 16: if(h%13===0){for(let i=0;i<3;i++){const a=i*TAU/3+now/800;RA(X+12+Math.cos(a)*5-1,Y+12+Math.sin(a)*5-1,2,2,'#7de0ff',.4)}}break;
  case 17: if(h%11===0)RA(X+8+((h>>3)%8),Y+8+((h>>6)%8),1,1,'#7ab8f0',.4+.3*Math.sin(now/600+tx));break;
  case 18: if(h%17===0){for(let i=0;i<20;i++)RA(X+(i*3)%22,Y+((i*7)%22),1,1,'#c0c0c8',.2+.1*Math.sin(now/400+i))}break;
  case 19: if(h%9===0){const p=.5+.5*Math.sin(now/500+tx*.4+ty*.4);line(X+2,Y+12,X+22,Y+12,4,(x,y)=>RA(x-1,y-1,2,2,'#ff3a5d',.2+.3*p))}break;
 }}
function caveWallMotif(ci,X,Y,tx,ty,th,now,h,below){
 const wt=shade(th,ci>=10?.34:.12),wf=shade(th,ci>=10?.58:.46),mo=shade(th,ci>=10?.4:.28),hl=shade(th,.8);
 if(below){R(X,Y,CT,CT,wf);for(let r=0;r<3;r++){R(X,Y+r*8,CT,1,mo);R(X+((r+tx)%2?6:15),Y+r*8+1,1,7,mo)}R(X,Y,CT,2,hl)}
 else{R(X,Y,CT,CT,wt);if(h%7===0)R(X+(h>>4)%18,Y+(h>>9)%18,3,2,shade(th,.18))}
 switch(ci){
  case 0: if(h%8===0)for(let i=0;i<5;i++)R(X+2+i*4,Y+3,2,2,shade(th,.3));break;
  case 1: if(ty%3===0){R(X,Y+9,CT,2,shade(th,.55));if(h%5===0)RA(X+((h>>3)%18),Y+8,2,4,'#eaffff',.55+.35*Math.sin(now/150+tx))}break;
  case 2: if(h%6===0)RA(X+((h>>2)%18),Y+((h>>5)%18),3,2,'#ff5a20',.25+.2*Math.sin(now/300+tx));break;
  case 3: if(h%12===0){R(X+2,Y+2,CT-4,3,'#8a2a2a');R(X+2,Y+2,CT-4,1,'#ffe79a')}break;
  case 4: if(!(h%4)){const len=4+((h>>3)%6);R(X+((h>>1)%18)+2,Y,2,len,'#cdeeff');R(X+((h>>1)%18)+1,Y+len-1,4,2,'#eaffff')}break;
  case 5: {const hs=8,row=Math.round(Y/hs),col=Math.round(X/hs);const dead=((row*7+col*13+ci)%5===0);for(let i=0;i<6;i++){const a=i*TAU/6;R(X+12+Math.cos(a)*6-1,Y+12+Math.sin(a)*6-1,1,1,dead?'#241f30':shade(th,.55))}break}
  case 6: if(h%7===0){R(X+2,Y+2,CT-4,CT-4,shade(th,.28));R(X+2,Y+2,CT-4,2,shade(th,.5))}break;
  case 7: if(h%14===0)for(let i=0;i<8;i++){const a=i*TAU/8+now/2600;R(X+12+Math.cos(a)*8-1,Y+12+Math.sin(a)*8-1,1,1,shade(th,.5))}break;
  case 8: if(h%10===0){pcirc(X+12,Y+11,5,'#0a1a16');pcirc(X+12,Y+11,3,shade(th,.8));const lk=Math.sin(now/900+tx)*1.2;R(X+11+lk,Y+10,2,2,'#ff4d6d')}break;
  case 9: if(h%6===0){const p=.5+.5*Math.sin(now/520+tx*.3);line(X+2,Y+22,X+22,Y+2,5,(x,y)=>RA(x-1,y-1,2,2,th,.2+.3*p))}break;
  case 10: if(h%8===0){R(X+2+((h>>2)%14),Y,2,8+((h>>5)%6),shade(th,.45))}break;
  case 11: if(h%10===0){pcirc(X+12,Y+8,3,shade(th,.55),.5)}break;
  case 12: if(h%9===0)RA(X+((h>>2)%18),Y+((h>>5)%18),2,3,'#0a2018',.4);break;
  case 13: if(h%11===0){R(X+8,Y+2,1,8,'#fff7dd');R(X+9,Y+9,1,4,'#e8e2c8')}break;
  case 14: if(ty%3===1){line(X,Y+4,X+CT,Y+16,6,(x,y)=>RA(x-1,y-1,1,1,'#f0b8ff',.35))}break;
  case 15: if(h%7===0){R(X+2,Y+2,CT-4,CT-4,shade(th,.3));R(X+2,Y+2,CT-4,2,shade(th,.6))}break;
  case 16: if(h%12===0)for(let i=0;i<3;i++)R(X+3+i*5,Y+3,2,2,'#7de0ff');break;
  case 17: if(h%8===0)RA(X+((h>>2)%18),Y+((h>>5)%18),2,2,'#3a7ddc',.3+.2*Math.sin(now/500+tx));break;
  case 18: if(h%10===0)R(X+(h>>4)%18,Y+(h>>9)%18,3,1,'#8a8a90');break;
  case 19: if(h%6===0){const p=.5+.5*Math.sin(now/520+tx*.3);line(X+2,Y+2,X+22,Y+2,4,(x,y)=>RA(x-1,y-1,2,2,'#b83aff',.2+.3*p))}break;
 }}
function caveCrystal(ci,c,X,Y,now){const th=BOSSES[ci].c,pl=.8+.2*Math.sin(now/300+c.x);
 switch(ci){
  case 3: glow(X,Y-6,10,'#fff0a0',.3+.2*pl);R(X-3,Y-9,7,8,'#2a2a2a');R(X-2,Y-8,5,6,'#fff0a0');R(X-1,Y-7,3,4,'#ffffff');break;
  case 4: R(X-1,Y-11*c.s,2,11*c.s,'#dff4ff');R(X-4,Y-4,3,4,shade(th,.6));R(X+2,Y-6,3,6,shade(th,.85));R(X-1,Y-11*c.s,1,3,'#fff');RA(X-9,Y-12,20,14,th,.14*pl);break;
  case 5: for(let i=0;i<6;i++){const a=i*TAU/6;RA(X+Math.cos(a)*7-1,Y+Math.sin(a)*7-1,3,3,th,.35)}glow(X,Y,9,th,.35*pl);break;
  case 6: R(X-5,Y-2,10,4,'#6d6a60');R(X-1,Y-6,2,6,'#8a969c');RA(X-8,Y-8,16,14,th,.12*pl);break;
  case 7: pcirc(X,Y,6,shade(th,.35));pcirc(X,Y,4,shade(th,.6));for(let i=0;i<8;i++){const a=i*TAU/8+now/2000;R(X+Math.cos(a)*5-1,Y+Math.sin(a)*5-1,1,1,'#fff0a0')}break;
  case 8: pcirc(X,Y-3,6,'#0a1a16');pcirc(X,Y-3,4,shade(th,.85));R(X-1+Math.sin(now/700)*1.5,Y-4,2,2,'#ff4d6d');break;
  case 9: {const p=.6+.4*Math.sin(now/500+c.x);glow(X,Y-3,9*p,th,.4*p);pcirc(X,Y-3,3,th,.8)}break;
  case 11: for(let i=0;i<3;i++){const a=i*TAU/3;RA(X+Math.cos(a)*5-1,Y+Math.sin(a)*5-1,3,3,th,.4)}glow(X,Y,10,th,.3*pl);break;
  case 13: R(X-2,Y-9,4,9,'#e8e2c8');R(X-1,Y-9,2,3,'#fff7dd');RA(X-8,Y-11,16,12,'#e8e2c8',.1);break;
  case 14: R(X-1,Y-8*c.s,2,8*c.s,'#f0b8ff');RA(X-8,Y-11,16,12,th,.14*pl);break;
  case 16: pcirc(X,Y,6,shade(th,.4));pcirc(X,Y,3,'#7de0ff');glow(X,Y,10,th,.3*pl);break;
  case 17: glow(X,Y,9*pl,'#7ab8f0',.35*pl);pcirc(X,Y,3,'#ff5d8f',.7);break;
  case 19: {const p=.6+.4*Math.sin(now/500+c.x);glow(X,Y-3,10*p,'#b83aff',.4*p);pcirc(X,Y-3,3,'#ff3a5d',.85)}break;
  default: R(X-1,Y-8*c.s,3,8*c.s,th);R(X-4,Y-4*c.s,3,4*c.s,shade(th,.75));R(X+2,Y-5*c.s,3,5*c.s,shade(th,.9));R(X-1,Y-8*c.s,1,3,'#fff');RA(X-10,Y-12,22,16,th,.12*pl);
 }}
function caveTorch(ci,X,Y,now,tseed){const th=BOSSES[ci].c;
 if(ci===1){R(X-2,Y+4,5,7,'#1a2226');R(X-3,Y+3,7,2,'#39434a');const on=Math.floor(now/160+tseed)%3;glow(X,Y+1,7,th,.5+.2*on);R(X-1,Y,2,3,on?'#eaffff':shade(th,.5));return}
 if(ci===4){R(X-2,Y+4,5,8,'#2a3a44');R(X-3,Y+3,7,2,'#4a5a64');glow(X,Y+1,7,'#cdeeff',.45+.15*Math.sin(now/240+tseed));R(X-1,Y-1,2,3,'#eaffff');return}
 if(ci===5){glow(X,Y+2,8,th,.4+.25*Math.sin(now/260+tseed));pcirc(X,Y+2,3,shade(th,.7));return}
 if(ci===8){R(X-3,Y+2,6,5,'#0a1a16');pcirc(X,Y+4,3,shade(th,.9));R(X-1+Math.sin(now/600+tseed)*1.2,Y+3,2,2,'#ff4d6d');return}
 if(ci===9){glow(X,Y+2,7+2*Math.sin(now/500+tseed),th,.45);pcirc(X,Y+2,3,th,.85);return}
 if(ci===11){glow(X,Y+1,7+2*Math.sin(now/300+tseed),th,.4);pcirc(X,Y+2,3,shade(th,.6));return}
 if(ci===12){glow(X,Y+2,6,th,.3+.15*Math.sin(now/500+tseed));pcirc(X,Y+2,2,'#8fd6b8',.6);return}
 if(ci===13){R(X-2,Y+2,4,5,'#e8e2c8');glow(X,Y+1,6,'#fff7dd',.3+.2*Math.sin(now/400+tseed));return}
 if(ci===14){pcirc(X,Y+2,3,'#f0b8ff',.7);glow(X,Y+1,6,th,.35);return}
 if(ci===16){pcirc(X,Y+1,3,'#7de0ff',.8);glow(X,Y+1,8,th,.4+.2*Math.sin(now/260+tseed));return}
 if(ci===17){glow(X,Y+2,7+2*Math.sin(now/700+tseed),'#7ab8f0',.4);pcirc(X,Y+2,2,'#ff5d8f',.7);return}
 if(ci===19){glow(X,Y+2,8+3*Math.sin(now/500+tseed),'#b83aff',.45);pcirc(X,Y+2,3,'#ff3a5d',.8);return}
 R(X-2,Y+4,5,8,'#2a2a2a');R(X-3,Y+3,7,2,'#4a4a4a');const fh=4+Math.floor(now/90+tseed)%3;R(X-2,Y+3-fh,4,fh,ci===2?'#ff5a20':'#ffb020');R(X-1,Y+3-fh+1,2,fh-1,ci===2?'#ffcf7a':'#ffe79a')}
function caveProp(ci,p,X,Y,now){const th=BOSSES[ci].c;
 switch(ci){
  case 0: if(p.k===0){const a=now/1600*(p.x%2?1:-1);pcirc(X,Y,6,'#3a443f');for(let i=0;i<8;i++){const aa=a+i*TAU/8;R(X+Math.cos(aa)*6-1,Y+Math.sin(aa)*6-1,2,2,shade(th,.5))}pcirc(X,Y,2,'#1a2024')}
   else if(p.k===1){R(X-1,Y-10,2,10,'#4a544f');pcirc(X,Y-10,3,shade(th,.5))}else{R(X-4,Y-3,8,6,'#2a332e');R(X-2,Y-1,4,2,shade(th,.5))}break;
  case 1: if(p.k===0){R(X-6,Y-2,12,4,'#20303a');R(X-6,Y-2,12,1,'#3a4a56');RA(X-8,Y-6,16,8,th,.2+.15*Math.sin(now/140))}
   else if(p.k===1){R(X-1,Y-9,2,9,'#20303a');glow(X,Y-10,4,th,.5)}else{R(X-4,Y-3,8,6,'#172126');R(X-1,Y-1,3,3,th)}break;
  case 2: if(p.k===0){R(X-6,Y-4,12,8,'#3a221d');R(X-6,Y-4,12,2,'#5a352a');RA(X-4,Y+3,8,2,'#ff5a20',.4)}
   else if(p.k===1){R(X-1,Y-10,2,10,'#2a1812');R(X-3,Y-11,7,2,'#3a221d')}else{pcirc(X,Y,4,'#5a2a18');RA(X-3,Y-3,6,6,'#ff5a20',.3+.2*Math.sin(now/200))}break;
  case 3: if(p.k===0){pcirc(X,Y,3,'#3a1a1a');pcirc(X,Y,2,now%1400<700?'#ff4d6d':'#3a1a1a');R(X-1,Y-8,2,8,'#2a2a26')}
   else if(p.k===1){pcirc(X,Y,7,'#3a3934');pcirc(X,Y,4,'#1a1814');R(X-1,Y-1,2,2,'#6d6a60')}else{R(X-6,Y-4,12,8,'#4a4640');R(X-6,Y-4,12,2,'#6d6a60')}break;
  case 4: if(p.k===0){R(X-5,Y-9,10,11,'#0d1a20');R(X-4,Y-8,8,9,'#a8e2ff');pcirc(X,Y-4,2,'#eaffff')}
   else if(p.k===1){R(X-1,Y-12,2,12,'#dff4ff');RA(X-6,Y-14,12,14,'#cdeeff',.16)}else{R(X-4,Y-3,8,6,'#20303a');R(X-2,Y-1,4,2,'#cdeeff')}break;
  case 5: if(p.k===0){R(X-4,Y-8,8,10,'#25213f');for(let i=0;i<3;i++)RA(X-3+i*3,Y-1,2,3,'#c9bff0',.4);R(X-2,Y-9,4,2,'#5f5a86')}
   else if(p.k===1){for(let i=0;i<6;i++){const a=i*TAU/6;R(X+Math.cos(a)*5-1,Y+Math.sin(a)*5-1,2,2,'#5f5a86')}}else{RA(X-1,Y-14,2,14,'#e8dfff',.3+.2*Math.sin(now/300))}break;
  case 6: if(p.k===0){R(X-7,Y-5,14,9,'#3a3018');R(X-7,Y-5,14,2,'#5a4a28');R(X-2,Y-9,3,5,'#6d6a60')}
   else if(p.k===1){R(X-6,Y-2,12,4,'#4a3a1c');pcirc(X-3,Y,2,'#8a7440');pcirc(X+3,Y,2,'#8a7440')}else{const b=now/1000+p.x;R(X+Math.sin(b)*3-2,Y+Math.cos(b*1.3)*2-2,4,4,'#8a7440')}break;
  case 7: if(p.k===0){R(X-1,Y-12,2,12,'#5a4a28');const sw=Math.sin(now/900)*.4;line(X,Y-2,X+Math.sin(sw)*10,Y+8,2,(x,y)=>R(x-1,y-1,2,2,'#8a7440'))}
   else if(p.k===1){pcirc(X,Y,7,'#33202b');pcirc(X,Y,5,'#84566b');R(X-1,Y-4,1,4,'#fff0a0')}else{for(let i=0;i<8;i++){const a=i*TAU/8+now/2400;R(X+Math.cos(a)*6-1,Y+Math.sin(a)*6-1,1,1,shade(th,.6))}}break;
  case 8: if(p.k===0){pcirc(X,Y,6,'#0a1a16');pcirc(X,Y,4,shade(th,.85));R(X-1+Math.sin(now/700+p.x)*1.5,Y-1,2,2,'#ff4d6d')}
   else if(p.k===1){R(X-4,Y-8,8,10,'#17322b');RA(X-3,Y-7,6,8,'#9fffe0',.4)}else{RA(X-3,Y-1,6,2,'#ffffff',.4+.3*Math.sin(now/150+p.x))}break;
  case 9: if(p.k===0){const p2=.5+.5*Math.sin(now/500+p.x);glow(X,Y,7*p2,th,.4*p2);pcirc(X,Y,3,th,.7)}
   else if(p.k===1){line(X-8,Y,X+8,Y,4,(x,y)=>RA(x-1,y-1,2,2,th,.25+.2*Math.sin(now/400+x)))}else{RA(X-2,Y-2,4,4,th,.3+.3*Math.sin(now/300+p.x))}break;
  case 10: if(p.k===0){R(X-3,Y-6,6,8,'#3a2a18');R(X-2,Y-8,2,3,'#7ad84f');R(X+1,Y-9,2,4,'#7ad84f')}
   else if(p.k===1){pcirc(X,Y,5,'#2a1a10');pcirc(X,Y,3,'#4a3a26')}else{R(X-5,Y-1,10,3,'#3a2a18')}break;
  case 11: if(p.k===0){pcirc(X,Y-2,6,'#5a3f6e');pcirc(X,Y-2,4,'#c98fe6');pcirc(X-1,Y-4,2,'#e0c3ff')}
   else if(p.k===1){pcirc(X,Y,4,'#5a3f6e');RA(X-6,Y-6,12,12,'#c98fe6',.15+.1*Math.sin(now/400))}else{pcirc(X,Y-1,3,'#8a6bb0')}break;
  case 12: if(p.k===0){pcirc(X,Y,5,'#16241d');pcirc(X,Y-1,3,'#2e4d3f');RA(X-2,Y-2,4,3,'#5bd6a8',.3)}
   else if(p.k===1){R(X-1,Y-8,2,8,'#2e4d3f');R(X-3,Y-9,6,2,'#16241d')}else{RA(X-4,Y,8,2,'#0a2018',.5)}break;
  case 13: if(p.k===0){R(X-4,Y-3,8,6,'#e8e2c8');R(X-2,Y-1,1,1,'#241f14');R(X+1,Y-1,1,1,'#241f14')}
   else if(p.k===1){R(X-1,Y-9,2,9,'#e8e2c8');R(X-3,Y-10,6,2,'#fff7dd')}else{R(X-5,Y-1,10,3,'#6b5f45')}break;
  case 14: if(p.k===0){pcirc(X,Y,6,'#3a2a44');RA(X-6,Y-6,12,12,'#f0b8ff',.15)}
   else if(p.k===1){for(let i=0;i<6;i++){const a=i*TAU/6;R(X+Math.cos(a)*5-1,Y+Math.sin(a)*5-1,1,1,'#f0b8ff')}}else{RA(X-1,Y-12,2,12,'#f0b8ff',.3)}break;
  case 15: if(p.k===0){R(X-6,Y-4,12,8,'#6e5a1a');R(X-6,Y-4,12,2,'#8a7010');for(let i=0;i<3;i++)R(X-4+i*4,Y-1,2,2,'#1a1a1a')}
   else if(p.k===1){pcirc(X,Y,4,'#6e5a1a');pcirc(X,Y,2,'#fff0a0')}else{const b=now/900+p.x;R(X+Math.sin(b)*2-1,Y+Math.cos(b*1.4)*2-1,3,3,'#ffcf3a')}break;
  case 16: if(p.k===0){pcirc(X,Y-2,6,'#5a2e6e');pcirc(X,Y-2,3,'#7de0ff')}
   else if(p.k===1){for(let i=0;i<3;i++){const a=i*TAU/3+now/1000;R(X+Math.cos(a)*5-1,Y+Math.sin(a)*5-1,2,2,'#e06bff')}}else{RA(X-2,Y-2,4,4,'#7de0ff',.3+.2*Math.sin(now/300+p.x))}break;
  case 17: if(p.k===0){pcirc(X,Y,5,'#0c1a2c');pcirc(X,Y,3,'#3a9ddc',.7)}
   else if(p.k===1){RA(X-3,Y-1,6,2,'#ff5d8f',.3+.2*Math.sin(now/300+p.x))}else{pcirc(X,Y-1,2,'#7ab8f0',.6)}break;
  case 18: if(p.k===0){for(let i=0;i<12;i++)RA(X+(i*3)%14-7,Y+((i*5)%10)-5,1,1,'#c0c0c8',.3)}
   else if(p.k===1){R(X-3,Y-2,6,4,'#4a4a52');R(X-2,Y-3,4,1,'#e8e8ec')}else{RA(X-4,Y,8,2,'#8a8a90',.3)}break;
  case 19: if(p.k===0){const p2=.5+.5*Math.sin(now/500+p.x);glow(X,Y,8*p2,'#b83aff',.4*p2);pcirc(X,Y,3,'#ff3a5d',.8)}
   else if(p.k===1){line(X-8,Y,X+8,Y,4,(x,y)=>RA(x-1,y-1,2,2,'#ff3a5d',.25+.2*Math.sin(now/400+x)))}else{RA(X-2,Y-2,4,4,'#b83aff',.3+.3*Math.sin(now/300+p.x))}break;
 }}
function caveAmbientSpawn(ci){switch(ci){
 case 1: return{vx:(RND()-.5)*30,vy:(RND()-.5)*30,l:.35,c:'#eaffff'};
 case 2: return{vx:(RND()-.5)*8,vy:-24-RND()*20,l:1.1,c:RND()<.5?'#ff5a20':'#ffb020'};
 case 4: return{vx:(RND()-.5)*10,vy:10+RND()*14,l:2.2,c:'#eaffff'};
 case 5: return{vx:(RND()-.5)*10,vy:-6-RND()*6,l:1.4,c:'#c9bff0'};
 case 6: return{vx:(RND()-.5)*16,vy:(RND()-.5)*16,l:1.6,c:'#ffd166'};
 case 7: return{vx:(RND()-.5)*4,vy:-3-RND()*3,l:2.4,c:'#e0cfa8'};
 case 8: return{vx:0,vy:0,l:.25,c:'#ffffff'};
 case 9: return{vx:(RND()-.5)*6,vy:-14-RND()*10,l:1.6,c:'#ff9ab0'};
 case 10: return{vx:(RND()-.5)*6,vy:8+RND()*8,l:2,c:'#7ad84f'};
 case 11: return{vx:(RND()-.5)*8,vy:-4-RND()*6,l:2.4,c:'#c98fe6'};
 case 12: return{vx:(RND()-.5)*4,vy:-2-RND()*3,l:2.6,c:'#5bd6a8'};
 case 13: return{vx:(RND()-.5)*10,vy:6+RND()*8,l:1.8,c:'#e8e2c8'};
 case 14: return{vx:(RND()-.5)*6,vy:(RND()-.5)*6,l:2,c:'#f0b8ff'};
 case 15: return{vx:(RND()-.5)*20,vy:(RND()-.5)*20,l:.4,c:'#ffcf3a'};
 case 16: return{vx:(RND()-.5)*6,vy:-3-RND()*4,l:1.6,c:'#7de0ff'};
 case 17: return{vx:(RND()-.5)*4,vy:-6-RND()*8,l:2.8,c:'#7ab8f0'};
 case 18: return{vx:(RND()-.5)*8,vy:2+RND()*4,l:3,c:'#c0c0c8'};
 case 19: return{vx:(RND()-.5)*4,vy:-8-RND()*8,l:1.6,c:'#ff3a5d'};
 default: return{vx:(RND()-.5)*6,vy:-3-RND()*4,l:3,c:'#8ea0a0'};
}}
function caveAmbientOverlay(ci,now){
 if(ci===5&&Math.floor(now/1600)%4===0&&(now%1600)<70)RA(0,0,W,H,'#c9bff0',.1);
 if(ci===9){const p=.5+.5*Math.pow(Math.max(0,Math.sin(now/900)),4);RA(0,0,W,H,BOSSES[9].c,.03*p)}
 if(ci===19){const p=.5+.5*Math.pow(Math.max(0,Math.sin(now/700)),4);RA(0,0,W,H,'#ff3a5d',.04*p)}
}

