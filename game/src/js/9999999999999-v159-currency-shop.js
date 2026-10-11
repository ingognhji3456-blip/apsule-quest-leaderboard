/* ================= v159 재화 상점 (CS159) =================
   - 로비의 🪙 골드 · 💎 다이아 칩을 누르면 재화 상점이 열린다(골드를 누르면 골드 탭, 다이아를 누르면 다이아 탭).
   - 골드 탭: 다이아로 골드 사기 6묶음(1,000 ~ 1,000,000 골드 / 100 ~ 1,000 다이아). 두 번 눌러야 산다(잘못 누름 방지).
   - 다이아 탭: 돈으로 다이아 사기 6묶음(500 ~ 5,000,000 다이아 / ₩1,000 ~ ₩50,000). 결제는 PAY58(토스 결제창),
     결제가 끝나면 서버 /api/shop/dia/claim 에서 받아 DIA80에 더한다(창을 닫아도 다음에 상점을 열거나 로그인하면 받음).
     상품 번호 dia_<개수> = app.py DIA_PACKS 와 같게.
   - 칸마다 뒤 그림을 도트로 한 칸씩 찍었다. 비쌀수록 다른 그림:
     골드 = 가죽 주머니 → 나무 상자 → 보물 상자 → 작은 금고 → 은행 금고 → 둥근 대형 금고문과 황금 산
     다이아 = 벨벳 주머니 → 보석함 → 얼음 상자 → 유리 진열장(레이저) → 수정 금고 → 떠 있는 전설의 다이아
     반짝임은 매 순간 점으로 다시 찍는다. */
(()=>{try{
 const $=id=>document.getElementById(id);
 const GOLD=[[1000,100],[10000,200],[50000,350],[150000,500],[400000,750],[1000000,1000]];
 const DIA_PACKS=[[500,1000],[3000,3000],[20000,5000],[100000,10000],[1000000,30000],[5000000,50000]];
 const TIERS=[{n:'',c:'#b07a4a'},{n:'',c:'#c8d0dc'},{n:'인기',c:'#ffd166'},{n:'',c:'#5ad8a0'},{n:'추천',c:'#c08aff'},{n:'최고 가치',c:'#ff6ad5'}];
 const fmt=n=>Number(n).toLocaleString('ko-KR');
 const dia=()=>{try{return DIA80.get()}catch(e){return 0}},gold=()=>Math.floor(saveData.coins||0);
 /* ---------- 도트 그리기 도구 (1칸 = 1px) ---------- */
 const AW=72,AH=52;
 function K(x){return {
  p:(X,Y,c)=>{x.fillStyle=c;x.fillRect(X|0,Y|0,1,1)},
  r:(X,Y,w,h,c)=>{x.fillStyle=c;x.fillRect(X|0,Y|0,w|0,h|0)},
  /* 동그라미 · 타원(칸 단위) */
  el:(cx,cy,rx,ry,c)=>{x.fillStyle=c;for(let y=-ry;y<=ry;y++){const w=Math.round(rx*Math.sqrt(Math.max(0,1-(y*y)/((ry+.4)*(ry+.4)))));x.fillRect(Math.round(cx-w),Math.round(cy+y),w*2+1,1)}},
  /* 다각형(줄마다 칠하기) */
  poly:(pts,c)=>{x.fillStyle=c;const ys=pts.map(p=>p[1]),y0=Math.floor(Math.min(...ys)),y1=Math.ceil(Math.max(...ys));for(let y=y0;y<y1;y++){const yy=y+.5,xs=[];for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];if((a[1]<=yy&&b[1]>yy)||(b[1]<=yy&&a[1]>yy))xs.push(a[0]+(yy-a[1])/(b[1]-a[1])*(b[0]-a[0]))}xs.sort((p,q)=>p-q);for(let i=0;i+1<xs.length;i+=2){const a=Math.round(xs[i]),b=Math.round(xs[i+1]);if(b>a)x.fillRect(a,y,b-a,1)}}},
  /* 선(브레젠햄) */
  ln:(x0,y0,x1,y1,c)=>{x.fillStyle=c;x0|=0;y0|=0;x1|=0;y1|=0;const dx=Math.abs(x1-x0),dy=-Math.abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1;let e=dx+dy;for(;;){x.fillRect(x0,y0,1,1);if(x0===x1&&y0===y1)break;const e2=2*e;if(e2>=dy){e+=dy;x0+=sx}if(e2<=dx){e+=dx;y0+=sy}}},
  /* 두 색 바둑 섞기(위→아래로 a에서 b) */
  grad:(X,Y,w,h,a,b)=>{const B=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];for(let y=0;y<h;y++)for(let i=0;i<w;i++){const t=y/(h-1||1)*16;x.fillStyle=B[((Y+y)&3)*4+((X+i)&3)]<t?b:a;x.fillRect(X+i,Y+y,1,1)}},
  /* 글자 격자 그림 */
  spr:(rows,X,Y,pal)=>{rows.forEach((r,y)=>{for(let i=0;i<r.length;i++){const ch=r[i];if(ch==='.'||!pal[ch])continue;x.fillStyle=pal[ch];x.fillRect(X+i,Y+y,1,1)}})},
  x}}
 /* 손으로 찍은 작은 그림 */
 const COIN=['..KKK..','.KYYyK.','KYYyyoK','KYyyyoK','KyyyooK','.KyooK.','..KKK..'];
 const COIN_S=['.KKKKK.','KYyyyoK','KoooooK','.KKKKK.'];/* 옆에서 본 동전(쌓기용) */
 const BAR=['..KKKKKKK..','.KYYYYYyyK.','KYyyyyyyyoK','KyyyyyyyooK','KKKKKKKKKKK'];
 const GEM=['..KKKKK..','.KWLLmmK.','KLLLmmmdK','.KLmmmdK.','..KLmdK..','...KmK...','....K....'];
 const CROWN=['K...K...K','KY.KYK.YK','KYYKYKYYK','KYyYyYyYK','KYrYbYrYK','KyyyyyyyK','KKKKKKKKK'];
 const PG={K:'#5a3a0a',Y:'#fff4a0',y:'#ffd23a',o:'#c88a10'};
 const gemPal=(h)=>({K:'#0a1a3a',W:'#ffffff',L:'hsl('+h+',100%,82%)',m:'hsl('+h+',90%,58%)',d:'hsl('+h+',85%,34%)'});
 const PC={K:'#5a3a0a',Y:'#fff4a0',y:'#ffd23a',r:'#ff3a5a',b:'#3ad8ff'};
 let sd=1;const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647;
 /* 동전 더미: 가운데 cx, 바닥 by, 폭 w, 높이 h */
 function pile(k,cx,by,w,h,n){for(let i=0;i<n;i++){const t=rnd(),hh=h*(1-Math.abs(rnd()*2-1)*.9)*(1-Math.pow(Math.abs(t*2-1),1.6));const X=Math.round(cx-w/2+t*w-3),Y=Math.round(by-6-rnd()*hh);k.spr(COIN,X,Y,PG)}}
 function stack(k,X,by,n){for(let i=0;i<n;i++)k.spr(COIN_S,X,by-3-i*2,PG)}
 function gems(k,cx,by,w,h,n,hues){for(let i=0;i<n;i++){const t=rnd(),hh=h*(1-Math.pow(Math.abs(t*2-1),1.5));k.spr(GEM,Math.round(cx-w/2+t*w-4),Math.round(by-7-rnd()*hh),gemPal(hues[i%hues.length]))}}
 function floor(k,y,a,b){k.r(0,y,AW,AH-y,a);for(let i=0;i<AW;i+=6)k.r(i,y,1,AH-y,b);k.r(0,y,AW,1,b)}
 function rivets(k,X,Y,w,h,c){for(let i=X;i<X+w;i+=6){k.p(i,Y,c);k.p(i,Y+h-1,c)}for(let j=Y;j<Y+h;j+=6){k.p(X,j,c);k.p(X+w-1,j,c)}}
 /* 큰 다이아(다각형 면 나눠 칠하기) */
 function bigGem(k,cx,cy,s,h){const T=cy-s*.55,M=cy-s*.15,B=cy+s*.8,W=s;
  k.poly([[cx-W,M],[cx-W*.55,T],[cx+W*.55,T],[cx+W,M],[cx,B]],'#0a1a3a');
  k.poly([[cx-W+1,M],[cx-W*.55+1,T+1],[cx-W*.15,T+1],[cx-W*.35,M]],'hsl('+h+',100%,85%)');
  k.poly([[cx-W*.35,M],[cx-W*.15,T+1],[cx+W*.15,T+1],[cx+W*.35,M]],'#ffffff');
  k.poly([[cx+W*.35,M],[cx+W*.15,T+1],[cx+W*.55-1,T+1],[cx+W-1,M]],'hsl('+h+',95%,68%)');
  k.poly([[cx-W+1,M],[cx-W*.35,M],[cx,B-1]],'hsl('+h+',95%,62%)');
  k.poly([[cx-W*.35,M],[cx+W*.35,M],[cx,B-1]],'hsl('+h+',100%,76%)');
  k.poly([[cx+W*.35,M],[cx+W-1,M],[cx,B-1]],'hsl('+h+',85%,40%)');
  k.ln(cx-W+1,M,cx+W-1,M,'hsl('+h+',100%,92%)')}
 /* ---------- v159.1 그림마다 덧붙인 소품 · 빛 (본 그림 뒤에 빈자리에) ---------- */
 const glowAt=(k,cx,cy,r,col)=>{for(let y=-r;y<=r;y++)for(let x=-r;x<=r;x++){const d=Math.hypot(x,y*1.4)/r;if(d>1)continue;if(((cx+x)+(cy+y))%2===0&&d>.45)continue;if(d>.75&&((cx+x)%2))continue;k.x.globalAlpha=.16*(1-d);k.p(cx+x,cy+y,col)}k.x.globalAlpha=1};
 /* ---------- 가게 머리 그림(가게 주인 · 차양 · 선반 · 계산대) ---------- */
 const BW=200,BH=50;let BANNER=null;
 function bannerBase(){if(BANNER)return BANNER;const cv=document.createElement('canvas');cv.width=BW;cv.height=BH;const k=K(cv.getContext('2d'));sd=505;
  k.r(0,0,BW,BH,'#3a2414');for(let x=0;x<BW;x+=7){k.r(x,0,1,BH,'#2a180c');for(let j=0;j<3;j++)k.p(x+2+Math.floor(rnd()*4),Math.floor(rnd()*BH),'#4a2c18')}
  /* 창문(밤하늘 · 달) */k.r(4,12,26,20,'#5a3a1a');k.r(6,14,22,16,'#141a3a');for(let i=0;i<8;i++)k.p(7+Math.floor(rnd()*20),15+Math.floor(rnd()*13),'#ffe9a8');k.el(22,18,3,3,'#f4ecd0');k.el(23,17,2,2,'#141a3a');k.r(16,14,1,16,'#5a3a1a');k.r(6,21,22,1,'#5a3a1a');k.r(3,32,28,2,'#7a5228');
  /* 선반 · 물건 */for(const y of [18,30]){k.r(66,y,130,2,'#8a5a30');k.r(66,y+2,130,1,'#1a0e06');for(let X=70;X<192;X+=9){const t=Math.floor(rnd()*5);
    if(t===0){k.r(X,y-7,6,7,'#c8e8f0');k.r(X+1,y-6,4,5,['#ffd23a','#ff6a8a','#5ad8ff'][Math.floor(rnd()*3)]);k.r(X,y-8,6,1,'#8a5a30');k.p(X+1,y-6,'#fff')}
    else if(t===1){k.el(X+3,y-3,3,3,'#8a5a30');k.r(X+2,y-7,3,2,'#6a4220');k.p(X+3,y-4,'#ffd23a')}
    else if(t===2){for(let b=0;b<3;b++){k.r(X+b*2,y-8+(b%2),2,8-(b%2),['#8a2a2a','#2a4a8a','#3a6a3a'][b]);k.p(X+b*2,y-7,'#c8a050')}}
    else if(t===3){k.spr(GEM,X-1,y-7,gemPal(Math.floor(rnd()*360)))}
    else{k.spr(['..K..','.KyK.','KyYyK','KyyoK','.KKK.'],X,y-5,{K:'#5a3a0a',Y:'#fff4a0',y:'#ffd23a',o:'#c88a10'})}}}
  /* 등 */for(const X of [56,120]){k.r(X,8,1,6,'#1e1e24');k.r(X-2,14,5,6,'#ffcf6a');k.r(X-2,13,5,1,'#1e1e24');k.r(X-2,20,5,1,'#1e1e24');glowAt(k,X,17,10,'#ffd070')}
  /* 계산대 */k.r(0,36,BW,2,'#c8925a');k.r(0,36,BW,1,'#e8b880');k.r(0,38,BW,1,'#1a0e06');for(let x=0;x<BW;x+=10){k.r(x,39,10,11,'#6a4220');k.r(x,39,1,11,'#4a2c16');k.r(x+1,40,8,1,'#8a5a30')}k.r(0,41,BW,1,'#c8a050');k.r(0,48,BW,1,'#c8a050');
  k.spr(['...KKK...','..KYYyK..','.KYyyyoK.','KYyyYyyoK','.KyyyyoK.','..KyyoK..','...KKK...'],96,40,PG);
  /* 계산대 위: 장부 · 깃펜 · 동전 탑 · 저울 · 보석 방석 */k.r(80,32,14,4,'#f4ecd8');k.r(80,32,14,1,'#ffffff');k.r(86,32,1,4,'#c8b090');k.r(79,35,16,1,'#6a2a2a');k.ln(90,27,94,33,'#ffffff');k.ln(91,27,94,32,'#c8c8d8');
  stack(k,108,36,5);stack(k,116,36,3);stack(k,124,36,6);
  k.r(162,22,1,14,'#c8a050');k.r(158,35,9,1,'#a07a30');k.r(150,22,25,1,'#c8a050');k.ln(150,22,147,28,'#a07a30');k.ln(150,22,153,28,'#a07a30');k.ln(174,22,171,28,'#a07a30');k.ln(174,22,177,28,'#a07a30');
  k.r(146,28,9,2,'#c8a050');k.r(170,28,9,2,'#c8a050');k.spr(['.KKK.','KYyoK','.KKK.'],148,25,PG);k.spr(['.K.','KLK','.K.'],173,25,gemPal(200));k.el(162,21,1,1,'#fff0a0');
  k.r(182,32,14,4,'#8a1a3a');k.r(182,32,14,1,'#c83a5a');k.spr(GEM,185,25,gemPal(300));
  /* 차양 */for(let x=0;x<BW;x+=8){const c=(x/8)%2?'#f4ece0':'#c8283c';k.r(x,0,8,7,c);k.el(x+3.5,7,4,2,c);k.r(x,0,8,1,'rgba(255,255,255,0.4)')}k.r(0,7,BW,1,'rgba(0,0,0,0.15)');
  for(let x=0;x<BW;x+=8)k.p(x+4,10,'rgba(0,0,0,0.35)');
  return BANNER=cv}
 /* 가게 주인(매 순간): 실크 모자 · 콧수염 · 외알 안경 · 조끼 · 동전 보여 주기 */
 function keeper(k,t){const x=38,bob=Math.round(Math.sin(t*2)),y=20+bob;
  k.r(x-9,y+6,19,12,'#4a1a5a');k.r(x-9,y+6,19,1,'#6a2a7a');k.r(x-3,y+6,7,12,'#f4f0e8');k.r(x-1,y+6,3,2,'#c83a3a');k.p(x,y+7,'#ff6a6a');k.r(x-7,y+11,5,1,'#ffd166');k.p(x-2,y+12,'#ffd166');/* 몸 · 셔츠 · 나비 넥타이 · 시곗줄 */
  k.el(x,y,6,6,'#2a1408');k.el(x,y,5,5,'#f0c090');k.el(x-1,y-1,3,2,'#ffd8b0');k.r(x-6,y-1,1,3,'#e0a878');k.r(x+6,y-1,1,3,'#e0a878');
  const bl=((t*1000)%3600)<140;if(bl){k.r(x-3,y,2,1,'#3a2414');k.r(x+2,y,2,1,'#3a2414')}else{k.r(x-3,y-1,2,2,'#ffffff');k.p(x-2,y,'#2a1408');k.r(x+2,y-1,2,2,'#ffffff');k.p(x+3,y,'#2a1408')}
  k.r(x+1,y-2,4,1,'#c8a050');k.p(x+1,y-1,'#c8a050');k.p(x+4,y-1,'#c8a050');k.p(x+1,y+0,'#c8a050');k.p(x+4,y+0,'#c8a050');k.ln(x+5,y,x+6,y+5,'#c8a050');/* 외알 안경 */
  k.r(x-4,y+2,9,2,'#4a2a14');k.p(x-5,y+3,'#4a2a14');k.p(x+5,y+3,'#4a2a14');k.p(x,y+5,'#a8584a');k.p(x-2,y-3,'#4a2a14');k.p(x+2,y-3,'#4a2a14');
  k.r(x-6,y-6,13,2,'#14141a');k.r(x-4,y-13,9,7,'#1e1e28');k.r(x-4,y-8,9,1,'#c8283c');k.r(x-4,y-13,9,1,'#3a3a48');/* 모자 */
  const up=Math.max(0,Math.sin(t*1.3));const hx=x+11,hy=y+14-Math.round(up*9);k.ln(x+8,y+9,hx,hy,'#4a1a5a');k.ln(x+9,y+9,hx+1,hy,'#4a1a5a');k.el(hx,hy,1,1,'#f0c090');k.spr(['.KKK.','KYYyK','KYyoK','.KKK.'],hx-2,hy-4,PG);
  if(up>.8){k.p(hx-3,hy-5,'#ffffff');k.p(hx+3,hy-4,'#ffffff')}
  k.ln(x-8,y+9,x-12,y+15,'#4a1a5a');k.el(x-12,y+15,1,1,'#f0c090');k.r(0,36,BW,0,'#000')}
 /* 칸 틀(픽셀 금속 테) */
 const MET=[['#ffd0a0','#c8783a','#6a3a14'],['#ffffff','#b8c0cc','#5a6270'],['#fff4a0','#ffc830','#8a5a08'],['#c8ffe0','#3ac88a','#0e5a3a'],['#f0d8ff','#a86ae8','#4a1a8a'],['#ffe0f8','#ff6ad5','#7a0a5a']];
 const FR={};function frame(i){if(FR[i])return FR[i];const cv=document.createElement('canvas');cv.width=12;cv.height=12;const k=K(cv.getContext('2d')),[L,M,D]=MET[i];
  k.r(0,0,12,12,'#000');k.r(1,1,10,10,M);k.r(1,1,10,1,L);k.r(1,1,1,10,L);k.r(1,10,10,1,D);k.r(10,1,1,10,D);k.r(3,3,6,6,'#000');k.r(3,3,6,6,'rgba(0,0,0,0)');
  const c=cv.getContext('2d');c.clearRect(4,4,4,4);k.r(3,3,6,1,D);k.r(3,3,1,6,D);k.r(3,8,6,1,L);k.r(8,3,1,6,L);
  for(const [X,Y] of [[1,1],[9,1],[1,9],[9,9]]){k.r(X,Y,2,2,L);k.p(X+1,Y+1,D)}
  return FR[i]=cv.toDataURL()}
 /* 나무 선반 벽(배경 무늬) */let WOOD='';function wood(){if(WOOD)return WOOD;const cv=document.createElement('canvas');cv.width=16;cv.height=16;const k=K(cv.getContext('2d'));sd=77;k.r(0,0,16,16,'#2a1a10');
  for(let x=0;x<16;x+=8){k.r(x,0,1,16,'#1a0e06');for(let j=0;j<5;j++)k.p(x+2+Math.floor(rnd()*5),Math.floor(rnd()*16),'#3a2414')}return WOOD=cv.toDataURL()}
 let PLK='';function plank(){if(PLK)return PLK;const cv=document.createElement('canvas');cv.width=16;cv.height=6;const k=K(cv.getContext('2d'));k.r(0,0,16,6,'#8a5a30');k.r(0,0,16,1,'#c8925a');k.r(0,4,16,2,'#4a2c16');k.r(0,5,16,1,'#1a0e06');k.p(5,2,'#6a4220');k.p(11,3,'#6a4220');return PLK=cv.toDataURL()}
 const NAMES={gold:['동전 주머니','나무 상자','보물 상자','작은 금고','은행 금고','황금 대금고'],dia:['보석 주머니','보석함','얼음 보석 상자','보석 진열장','수정 금고','전설의 다이아']};
 /* 아이콘(돈 줄 · 단추) */function icon(rows,pal,s){const cv=document.createElement('canvas');cv.width=rows[0].length;cv.height=rows.length;K(cv.getContext('2d')).spr(rows,0,0,pal);cv.className='ic159';return cv}
 /* ---------- 창 ---------- */
 const box=document.createElement('div');box.id='cs159';box.hidden=true;document.body.appendChild(box);
 let tab='gold',arm=-1,armT=0,msgT=0,live=[];
 function toast(t,kind){const m=box.querySelector('.ms');if(!m)return;m.textContent=t;m.className='ms on '+(kind||'');clearTimeout(msgT);msgT=setTimeout(()=>{m.className='ms'},2600)}
 const BWK=document.createElement('canvas');BWK.width=BW;BWK.height=BH;
 function render(){const packs=tab==='gold'?GOLD:DIA_PACKS,A=window.CSART,nm=NAMES[tab],base=packs[0][0]/packs[0][1],ig=tab==='gold';
  box.innerHTML='<div class="pn"><div class="bn"><canvas class="bc" width="'+BW*3+'" height="'+BH*3+'"></canvas><div class="sg"><i></i><b>재화 상점</b><small>GOLD &amp; DIAMOND</small></div></div><button class="x" type="button">닫기</button>'+
   '<div class="br"><div class="tb"><button data-t="gold"'+(ig?' class="on"':'')+'><i class="ig"></i><span>골드 사기<small>다이아로</small></span></button><button data-t="dia"'+(!ig?' class="on"':'')+'><i class="id"></i><span>다이아 사기<small>현금으로</small></span></button></div>'+
   '<div class="bal"><span class="g"></span><span class="d"></span></div></div>'+
   '<div class="gr" style="--wood:url('+wood()+');--plank:url('+plank()+')">'+packs.map((p,i)=>{const mul=Math.round(p[0]/p[1]/base);
     return '<div class="cd t'+i+'" style="--fr:url('+frame(i)+');--tc:'+TIERS[i].c+'">'+(TIERS[i].n?'<em>'+TIERS[i].n+'</em>':'')+'<div class="nm">'+nm[i]+'</div>'+
      '<div class="cv"><canvas class="ar" width="'+(A?A.W*2:144)+'" height="'+(A?A.H*2:104)+'"></canvas>'+(mul>1?'<u>가성비 ×'+fmt(mul)+'</u>':'')+'</div>'+
      '<div class="am"><i class="'+(ig?'ig':'id')+'"></i>'+fmt(p[0])+'</div><button class="by'+(ig?' bd':'')+'" data-i="'+i+'"></button></div>'}).join('')+'</div>'+
   '<div class="ft">'+(ig?'다이아로 골드를 사요. 가격 단추를 한 번 더 누르면 사져요.':'결제가 끝나면 다이아가 바로 들어와요. 창을 닫아도 다음에 상점을 열면 받아요.'+(window.BB_APP?'<br>앱에서는 아직 살 수 없어요.':window.BB_FREE?'<br>지금은 무료 버전이라 판매하지 않아요.':''))+'</div><div class="ms"></div></div>';
  box.querySelector('.x').onclick=close;box.querySelectorAll('.tb button').forEach(b=>b.onclick=()=>{tab=b.dataset.t;arm=-1;try{gmSfx('ok')}catch(e){}render()});
  box.querySelectorAll('.by').forEach(b=>b.onclick=()=>buy(+b.dataset.i));
  box.querySelectorAll('i.ig').forEach(e=>e.appendChild(icon(COIN,PG)));box.querySelectorAll('i.id').forEach(e=>e.appendChild(icon(GEM,gemPal(200))));
  live=[...box.querySelectorAll('canvas.ar')].map((cv,i)=>({cv,key:(ig?'g':'d')+i}));paintBtns();paintBal();draw()}
 function paintBal(){const g=box.querySelector('.bal .g'),d=box.querySelector('.bal .d');if(!g)return;const tg=fmt(gold()),td=fmt(dia());if(g.dataset.v===tg&&d.dataset.v===td)return;g.dataset.v=tg;d.dataset.v=td;
  g.innerHTML='';g.appendChild(icon(COIN,PG));g.append(' '+tg);d.innerHTML='';d.appendChild(icon(GEM,gemPal(200)));d.append(' '+td)}
 function draw(){const t=performance.now()/1000,A=window.CSART;if(A)for(const L of live)A.paint(L.cv,L.key,t+L.key.charCodeAt(1)*.37);
  const bc=box.querySelector('canvas.bc');if(bc){const c=BWK.getContext('2d');c.drawImage(bannerBase(),0,0);keeper(K(c),t);const o=bc.getContext('2d');o.imageSmoothingEnabled=false;o.drawImage(BWK,0,0,bc.width,bc.height)}
  if(arm>=0&&performance.now()-armT>3000){arm=-1;paintBtns()}}
 let tmr=0;function loop(){if(box.hidden)return;draw();paintBal();tmr=setTimeout(()=>requestAnimationFrame(loop),110)}
 function paintBtns(){box.querySelectorAll('.by').forEach(b=>{const i=+b.dataset.i,p=(tab==='gold'?GOLD:DIA_PACKS)[i];b.classList.toggle('ask',arm===i);b.innerHTML=arm===i?'한 번 더 누르면 구매':(tab==='gold'?'':'₩'+fmt(p[1]));if(arm!==i&&tab==='gold'){b.appendChild(icon(GEM,gemPal(200)));b.append(fmt(p[1]))}})}
 function burst(i,cls){const cd=box.querySelectorAll('.cd')[i];if(!cd)return;cd.classList.remove('got');void cd.offsetWidth;cd.classList.add('got')}
 async function buy(i){if(tab==='gold'){const [g,cost]=GOLD[i];if(dia()<cost){toast('다이아가 모자라요 — 다이아 탭에서 살 수 있어요','bad');try{gmSfx('no')}catch(e){}return}
   if(arm!==i){arm=i;armT=performance.now();paintBtns();try{gmSfx('ok')}catch(e){}return}
   arm=-1;const d=saveData.dia80;d.n=Math.max(0,Math.floor(d.n)-cost);(d.log=d.log||[]).push({id:'gold_'+g,n:cost,t:Date.now()});if(d.log.length>50)d.log.shift();
   try{addCoins(g)}catch(e){saveData.coins=(saveData.coins||0)+g;try{saveNow()}catch(_){}}try{DIA80.chip(true)}catch(e){}try{gmHud()}catch(e){}
   try{sfx(880,.08,'square',.05,1320);setTimeout(()=>sfx(1320,.1,'square',.05,1760),90)}catch(e){}paintBtns();paintBal();burst(i);toast('🪙 골드 +'+fmt(g)+'!','ok');return}
  const [n]=DIA_PACKS[i];if(!window.PAY58){toast('결제를 불러오지 못했어요','bad');return}
  PAY58.buy('dia_'+n,async r=>{if(r.need==='login'){toast('로그인한 뒤에 살 수 있어요','bad');try{ACCT55.open()}catch(e){}return}
   if(r.err){toast(r.err,'bad');return}if(r.opened){toast(r.test?'테스트 결제창이 열렸어요':'결제창에서 결제해 주세요');return}
   if(r.cancel){toast('결제를 취소했어요');return}if(r.fail){toast('결제가 되지 않았어요','bad');return}if(r.ok){const got=await claim();if(got)burst(i)}})}
 /* 결제 끝난 다이아 받기 */let claiming=false;
 async function claim(){if(claiming||!window.DUO85||!DUO85.api)return 0;claiming=true;try{const r=await DUO85.api('/api/shop/dia/claim','POST',{});if(r.s===200&&r.j&&r.j.dia>0){DIA80.add(r.j.dia);toast('💎 다이아 +'+fmt(r.j.dia)+'!','ok');try{sfx(1200,.12,'triangle',.05,1800)}catch(e){}paintBal();return r.j.dia}}catch(e){}finally{claiming=false}return 0}
 function open(t){tab=t||tab;arm=-1;box.hidden=false;render();clearTimeout(tmr);loop();try{gmSfx('ok')}catch(e){}claim()}
 function close(){box.hidden=true;clearTimeout(tmr)}
 /* 로비 골드 · 다이아 칩 → 상점 */
 document.addEventListener('click',e=>{const el=e.target.closest&&e.target.closest('#gmCoins,#gmDia');if(!el)return;e.stopImmediatePropagation();e.preventDefault();open(el.id==='gmDia'?'dia':'gold')},true);
 /* 들어올 때 · 1분마다 못 받은 다이아 확인(로그인했을 때만) */setTimeout(()=>{try{DUO85.acc().token&&claim()}catch(e){}},6000);setInterval(()=>{try{if(!box.hidden||document.hidden)return;DUO85.acc().token&&claim()}catch(e){}},60000);
 document.addEventListener('keydown',e=>{if(!box.hidden&&e.key==='Escape'){e.stopPropagation();close()}},true);
 const st=document.createElement('style');st.id='cs159css';st.textContent=`
 #cs159{position:fixed;inset:0;z-index:9400;display:flex;align-items:center;justify-content:center;background:#000b;font-family:inherit}#cs159[hidden]{display:none}
 #cs159 .pn{position:relative;width:min(800px,calc(100vw - 16px));max-height:calc(100dvh - 16px);overflow-y:auto;overflow-x:hidden;border-radius:6px;background:#140c06;color:#f4ecd8;
  box-shadow:0 0 0 3px #000,0 0 0 6px #6a4424,0 0 0 8px #000,0 20px 60px #000d;scrollbar-width:thin}
 #cs159 canvas{image-rendering:pixelated;image-rendering:crisp-edges}
 #cs159 .bn{position:relative;line-height:0;border-bottom:4px solid #000}
 #cs159 .bc{width:100%;height:auto;display:block}
 #cs159 .sg{position:absolute;left:50%;top:22%;transform:translateX(-50%);line-height:1.1;text-align:center;padding:6px 16px 7px;background:#6a4424;
  box-shadow:0 0 0 2px #000,inset 0 2px 0 #a8743c,inset 0 -3px 0 #3a2210,0 4px 0 #0008;min-width:150px}
 #cs159 .sg::before,#cs159 .sg::after{content:'';position:absolute;top:-14px;width:2px;height:14px;background:#2a1a0a;box-shadow:1px 0 0 #8a6a3a}#cs159 .sg::before{left:18px}#cs159 .sg::after{right:18px}
 #cs159 .sg b{display:block;font-size:20px;font-weight:900;color:#ffd166;text-shadow:2px 2px 0 #000,0 0 10px #ffb02e66;letter-spacing:2px}
 #cs159 .sg small{display:block;font-size:9px;font-weight:900;color:#e8c890;letter-spacing:3px;margin-top:2px}
 #cs159 .pn>.x{position:absolute;left:10px;top:10px;z-index:4}html.lpL:not(.lpPad) #cs159 .pn>.x{top:6px;left:8px}
 #cs159 .br{display:flex;align-items:center;gap:10px;padding:10px 12px;background:linear-gradient(180deg,#3a2414,#2a180c);border-bottom:3px solid #000}
 #cs159 .tb{display:flex;gap:8px;flex:1}
 #cs159 .tb button{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:7px 10px;border:0;font:inherit;font-weight:900;font-size:15px;cursor:pointer;color:#cdb898;background:#24160a;
  box-shadow:0 0 0 2px #000,inset 0 2px 0 #4a3018,inset 0 -2px 0 #120a04;clip-path:polygon(0 4px,4px 4px,4px 0,calc(100% - 4px) 0,calc(100% - 4px) 4px,100% 4px,100% calc(100% - 4px),calc(100% - 4px) calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,4px calc(100% - 4px),0 calc(100% - 4px))}
 #cs159 .tb button span{display:flex;flex-direction:column;align-items:flex-start;line-height:1.1}#cs159 .tb button small{font-size:10px;opacity:.75}
 #cs159 .tb button canvas.ic159{width:24px;height:24px}
 #cs159 .tb button.on{color:#2a1604;background:linear-gradient(180deg,#ffe58a,#f0b030);box-shadow:inset 0 2px 0 #fff6c0,inset 0 -3px 0 #b07010}
 #cs159 .tb button[data-t=dia].on{color:#05202e;background:linear-gradient(180deg,#b8f4ff,#3ab8e8);box-shadow:inset 0 2px 0 #e8fcff,inset 0 -3px 0 #1a7aa8}
 #cs159 .bal{display:flex;flex-direction:column;gap:4px}
 #cs159 .bal span{display:flex;align-items:center;gap:5px;padding:3px 10px;background:#0c0804;box-shadow:0 0 0 2px #000,inset 0 0 0 1px #5a3a1a;font-weight:900;font-size:13px;min-width:110px;justify-content:flex-end}
 #cs159 .bal .g{color:#ffe08a}#cs159 .bal .d{color:#9fe8ff}
 #cs159 canvas.ic159{width:16px;height:16px;flex:none}#cs159 i{font-style:normal;display:inline-flex;align-items:center}
 #cs159 .gr{display:grid;grid-template-columns:repeat(3,1fr);gap:26px 14px;padding:16px 14px 24px;background:var(--wood) 0 0/48px 48px;image-rendering:pixelated;position:relative}
 #cs159 .cd{position:relative;display:flex;flex-direction:column;gap:5px;padding:2px;border:12px solid transparent;border-image:var(--fr) 4 / 12px stretch;image-rendering:pixelated;
  background:#1a1008 padding-box;filter:drop-shadow(0 6px 0 #0009)}
 #cs159 .cd::after{content:'';position:absolute;left:-22px;right:-22px;bottom:-24px;height:14px;background:var(--plank) 0 0/48px 18px;image-rendering:pixelated;z-index:-1;box-shadow:0 4px 0 #0008}
 #cs159 .cd em{position:absolute;top:-20px;right:-14px;z-index:3;padding:3px 10px 4px;background:var(--tc);color:#1a0e04;font-style:normal;font-size:11px;font-weight:900;
  box-shadow:0 0 0 2px #000,inset 0 2px 0 #ffffff88,inset 0 -2px 0 #0004,2px 3px 0 #0008;transform:rotate(4deg)}
 #cs159 .nm{align-self:center;margin:-2px 0 0;padding:2px 12px 3px;background:linear-gradient(180deg,#5a3a1c,#3a2210);color:#ffe8b8;font-size:12.5px;font-weight:900;letter-spacing:.5px;
  box-shadow:0 0 0 2px #000,inset 0 1px 0 #8a5a30;text-shadow:1px 1px 0 #000;white-space:nowrap}
 #cs159 .cv{position:relative;line-height:0;box-shadow:0 0 0 2px #000,inset 0 0 0 1px #ffffff22}
 #cs159 .ar{width:100%;height:auto;display:block}
 #cs159 .cv u{position:absolute;left:4px;bottom:4px;line-height:1;text-decoration:none;padding:3px 6px;background:#ff3a5a;color:#fff;font-size:10.5px;font-weight:900;box-shadow:0 0 0 2px #000,inset 0 1px 0 #ff9aaa;text-shadow:1px 1px 0 #0008}
 #cs159 .am{display:flex;align-items:center;justify-content:center;gap:6px;font-size:19px;font-weight:900;color:#fff;text-shadow:2px 2px 0 #000;margin-top:1px}
 #cs159 .am canvas.ic159{width:22px;height:22px}
 #cs159 .by{display:flex;align-items:center;justify-content:center;gap:5px;padding:7px 6px 8px;border:0;font:inherit;font-weight:900;font-size:16px;cursor:pointer;color:#fff;text-shadow:1px 2px 0 #0009;
  background:linear-gradient(180deg,#7ae06a,#2e9a3a);box-shadow:0 0 0 2px #000,inset 0 3px 0 #c0ffb0,inset 0 -4px 0 #1a6a24;
  clip-path:polygon(0 3px,3px 3px,3px 0,calc(100% - 3px) 0,calc(100% - 3px) 3px,100% 3px,100% calc(100% - 3px),calc(100% - 3px) calc(100% - 3px),calc(100% - 3px) 100%,3px 100%,3px calc(100% - 3px),0 calc(100% - 3px))}
 #cs159 .by.bd{background:linear-gradient(180deg,#8ae4ff,#2a8ac8);box-shadow:0 0 0 2px #000,inset 0 3px 0 #d8f8ff,inset 0 -4px 0 #155a8a}
 #cs159 .by:hover{filter:brightness(1.12)}#cs159 .by:active{transform:translateY(2px)}
 #cs159 .by.ask{background:linear-gradient(180deg,#ffe58a,#e0a020);color:#2a1604;text-shadow:none;font-size:12.5px;box-shadow:inset 0 3px 0 #fff6c0,inset 0 -4px 0 #a06a10;animation:cs159a .5s steps(2) infinite}
 @keyframes cs159a{50%{filter:brightness(1.25)}}
 #cs159 .cd.t5{animation:cs159g 1.6s steps(4) infinite}@keyframes cs159g{50%{filter:drop-shadow(0 6px 0 #0009) drop-shadow(0 0 10px var(--tc))}}
 #cs159 .cd.got{animation:cs159p .5s steps(5)}@keyframes cs159p{0%{transform:scale(1.08);filter:brightness(1.8)}100%{transform:none}}
 #cs159 .ft{padding:8px 12px 10px;font-size:11.5px;color:#c8b090;text-align:center;line-height:1.5;background:#1a1008;border-top:3px solid #000}
 #cs159 .ms{position:sticky;bottom:6px;margin:0 auto 6px;width:max-content;max-width:94%;padding:7px 14px;background:#000d;box-shadow:0 0 0 2px #ffd166;font-size:13px;font-weight:900;opacity:0;transition:opacity .2s;pointer-events:none}
 #cs159 .ms.on{opacity:1}#cs159 .ms.ok{color:#a6f5c6}#cs159 .ms.bad{color:#ffb0b0;box-shadow:0 0 0 2px #ff8a8a}
 html.lpP #cs159 .gr{grid-template-columns:1fr 1fr;gap:24px 12px;padding:14px 12px 22px}html.lpP #cs159 .br{flex-direction:column;align-items:stretch}html.lpP #cs159 .bal{flex-direction:row;justify-content:center}
 html.lpP #cs159 .sg b{font-size:15px}html.lpP #cs159 .sg{min-width:110px;padding:4px 10px 5px;top:18%}html.lpP #cs159 .sg small{font-size:7px}
 html.lpP #cs159 .am{font-size:15px}html.lpP #cs159 .by{font-size:13.5px}html.lpP #cs159 .nm{font-size:11px;padding:2px 8px}html.lpP #cs159 .cd{border-width:9px;border-image-width:9px}
 html.lpL:not(.lpPad) #cs159 .pn{max-height:calc(100dvh - 8px);width:calc(100vw - 16px)}html.lpL:not(.lpPad) #cs159 .bn{display:none}
 html.lpL:not(.lpPad) #cs159 .br{padding:6px 10px 6px 58px;position:relative}html.lpL:not(.lpPad) #cs159 .br::before{content:'재화 상점';position:absolute;left:56px;top:-1px;font-size:0}
 html.lpL:not(.lpPad) #cs159 .gr{grid-template-columns:repeat(6,1fr);gap:20px 8px;padding:10px 10px 22px}html.lpL:not(.lpPad) #cs159 .cd{border-width:8px;border-image-width:8px}
 html.lpL:not(.lpPad) #cs159 .nm{font-size:9.5px;padding:1px 5px}html.lpL:not(.lpPad) #cs159 .am{font-size:12px}html.lpL:not(.lpPad) #cs159 .am canvas.ic159{width:14px;height:14px}
 html.lpL:not(.lpPad) #cs159 .by{font-size:11.5px;padding:5px 2px}html.lpL:not(.lpPad) #cs159 .cv u{font-size:8.5px;padding:2px 3px}html.lpL:not(.lpPad) #cs159 .cd em{font-size:9px;padding:2px 6px;top:-16px;right:-10px}
 html.lpL:not(.lpPad) #cs159 .tb button{font-size:13px;padding:4px 8px}html.lpL:not(.lpPad) #cs159 .bal{flex-direction:row}html.lpL:not(.lpPad) #cs159 .ft{padding:4px;font-size:10px}`;

 document.head.appendChild(st);
 window.CS159={v:1,open,close,claim,GOLD,DIA_PACKS};
}catch(e){console.error('v159 currency shop',e)}})();
