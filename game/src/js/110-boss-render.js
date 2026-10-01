/* ================= 보스전: 그리기 ================= */
function drawArenaBG(now,beat,fr,th){R(0,0,W,H,'#070b0f');
const fl1=shade(th,.16),fl2=shade(th,.13),wl=shade(th,.24),mo=shade(th,.12);
for(let y=AY;y<AY+AH;y+=25)for(let x=AX;x<AX+AW;x+=28){const c=(((x-AX)/28+(y-AY)/25)|0)%2;R(x,y,Math.min(28,AX+AW-x),Math.min(25,AY+AH-y),c?fl1:fl2);R(x,y,Math.min(28,AX+AW-x),1,shade(th,.2))}
for(let x=0;x<W;x+=16){R(x,AY-18,16,18,wl);R(x,AY-18,16,2,shade(th,.4));R(x+((x/16)%2?4:11),AY-16,1,14,mo);R(x,AY-9,16,1,mo)}
R(0,AY-1,W,1,'#000');for(let y=AY;y<AY+AH;y+=16){R(0,y,AX,16,wl);R(W-AX,y,AX,16,wl);R(AX-2,y,2,16,mo);R(W-AX,y,2,16,mo)}R(0,AY+AH,W,H-AY-AH,'#070b0f');R(AX-2,AY+AH,AW+4,3,shade(th,.3));
for(const [tx,ty] of [[AX+10,AY+8],[AX+AW-10,AY+8],[AX+10,AY+AH-10],[AX+AW-10,AY+AH-10]]){R(tx-3,ty-2,6,8,'#1a1512');const fh=3+Math.floor(now/110+tx)%3;R(tx-2,ty-2-fh,4,fh,'#ffb020');R(tx-1,ty-1-fh,2,fh-1,'#ffe79a');RA(tx-14,ty-14,28,28,'#ffb020',.07)}
const on=fr>.88||fr<.05;RA(AX,AY,AW,2,'#ffffff',on?.5:.1);RA(AX,AY+AH-2,AW,2,'#ffffff',on?.5:.1);RA(AX,AY,2,AH,'#ffffff',on?.5:.1);RA(AX+AW-2,AY,2,AH,'#ffffff',on?.5:.1);
RA(AX,AY,AW,AH,th,Math.pow(1-fr,2)*.09);if(G.exposed)RA(AX,AY,AW,AH,'#ffe79a',.05+.04*Math.sin(now/90));if(G.phase>=1)RA(AX,AY,AW,AH,G.phase>=2?'#ff2d55':'#ff9a2d',.05+.02*G.phase*Math.sin(now/200))}



function drawPlayerBar(now){const w=110;R(8,H-14,w+2,8,'#05090b');R(9,H-13,w,6,'#2a1a20');R(9,H-13,w*(P.hp/P.maxhp),6,P.hp/P.maxhp<.3?'#ff4d6d':'#a6f5c6');
ctx.font='bold 8px monospace';ctx.textAlign='left';ctx.fillStyle='#fff';ctx.fillText('HP '+Math.max(0,P.hp),12,H-7.5);
const dk=clamp(1-(P.dashCd-now)/(((mus.ms)||600)*.9),0,1);R(8,H-4,w+2,2,'#10181c');R(9,H-4,w*dk,2,dk>=1?'#8dcdf5':'#456070')}

