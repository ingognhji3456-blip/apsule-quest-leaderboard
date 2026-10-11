/* ================= v175 내 집 · 낚시 (HF175) =================
   ☰ 메뉴 「🏠 내 집」 · 「🎣 낚시」(광장에서는 오른쪽 아래 「🎣 낚시」 단추도).
   - 내 집(31): 도트 방(크기 3단계) · 벽지 6 · 바닥 6 · 가구 24종(골드로 사서 saveData.house175.own에 보관 → 방에 놓기 · 들기 · 뒤집기).
     벽 가구(창문 · 그림 · 시계 · 깃발 · 선반)는 벽에, 나머지는 바닥 칸에. 「트로피 진열장」은 업적 수만큼 트로피, 「어항」은 내가 잡은 물고기가 헤엄침.
     배치는 /api/house/save로 올려 친구 · 아무나 이름으로 구경(/api/house/get, 방문 수) · 좋아요 · 방명록. 인기 집 TOP 20.
   - 낚시(13): 던지기 → 찌가 흔들리다 「!」에 바로 누르기 → 다가오는 박자 표시를 과녁에 맞춰 누르기(PERFECT · GOOD, 놓치면 하트 −1) → 줄 게이지 100이면 낚음.
     물고기 30종(희귀도 5단계 · 크기), 낚시 레벨(깊은 물 열림) · 낚싯대 강화(판정 넓게 · 희귀 확률). 도감(saveData.fish175) · 팔기(하루 🪙20,000까지) ·
     종마다 가장 큰 기록(/api/fish/catch · /api/fish/top). */
(()=>{try{
 const $=id=>document.getElementById(id),esc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const api=(p,b)=>window.DUO85&&DUO85.api?DUO85.api(p,b?'POST':'GET',b):Promise.resolve({s:0,j:{}});
 const acc=()=>{try{return DUO85.acc()}catch(e){return {}}};
 const num=v=>Number(v||0).toLocaleString();
 const toast=t=>{try{window.MR163&&MR163.toast?MR163.toast(t):banner(t)}catch(e){}};
 const coins=()=>saveData.coins||0,pay=n=>{if(coins()<n)return false;try{addCoins(-n)}catch(e){saveData.coins-=n}try{saveNow();gmHud()}catch(e){}return true};
 const ago=t=>{const s=Date.now()/1000-t;return s<60?'방금':s<3600?Math.floor(s/60)+'분 전':s<86400?Math.floor(s/3600)+'시간 전':Math.floor(s/86400)+'일 전'};

 /* ================= 도트 그림 도구 ================= */
 const PAL={K:'#1a1418',W:'#c08a5a',w:'#8a5a3a',R:'#d04a4a',r:'#8a2a2a',B:'#4a7ad0',b:'#2a4a8a',G:'#5ab05a',g:'#2a6a3a',Y:'#ffd166',y:'#c09a3a',S:'#c8d0d8',s:'#7a8490',
  P:'#efe7d6',p:'#b8a890',C:'#7dd8ff',c:'#3a8ab0',M:'#c86aff',m:'#6a3a9a',O:'#ff9a3a',L:'#fff2c0',D:'#3a3440',E:'#5a5060',T:'#e88aa0',t:'#a04a60',N:'#2a1e18',A:'#a0e8c0'};
 const SPC=new Map();
 function spr(rows,pal){const key=rows.join('|')+(pal?JSON.stringify(pal):'');let c=SPC.get(key);if(c)return c;const h=rows.length,w=Math.max(...rows.map(r=>r.length));c=document.createElement('canvas');c.width=w;c.height=h;const o=c.getContext('2d');
  rows.forEach((r,y)=>{for(let x=0;x<r.length;x++){const k=r[x],col=(pal&&pal[k])||PAL[k];if(k!=='.'&&col){o.fillStyle=col;o.fillRect(x,y,1,1)}}});SPC.set(key,c);return c}
 /* 가구: id → {n 이름, p 값, wall 벽에 거는지, tw 칸 너비, r 그림 줄} — 바닥 가구는 아래끝이 칸 바닥 */
 const FUR={
  bed:{n:'포근한 침대',p:1200,tw:2,r:['..KKKKKKKKKKKKKKKKKKKKKKKKKKKK..','.KwwwwwwwwwwwwwwwwwwwwwwwwwwwwK.','.KwPPPPPPKKKKKKKKKKKKKKKKKKKKwK.','.KwPPPPPPKBBBBBBBBBBBBBBBBBBKwK.','.KwPpppPPKBbBBBBBbBBBBBBbBBBKwK.','.KwPPPPPPKBBBBBBBBBBBBBBBBBBKwK.','.KwwwwwwwKbbbbbbbbbbbbbbbbbbKwK.','.KWWWWWWWWWWWWWWWWWWWWWWWWWWWWWK.','.KwwwwwwwwwwwwwwwwwwwwwwwwwwwwwK.','.Kw.KK....................KK.wK.','..K.KK....................KK.K..']},
  table:{n:'나무 탁자',p:400,tw:1,r:['................','.KKKKKKKKKKKKKK.','KWWWWWWWWWWWWWWK','KwwwwwwwwwwwwwwK','.KwKKKKKKKKKKwK.','.KwK........KwK.','.KwK........KwK.','.KwK........KwK.','.KKK........KKK.']},
  chair:{n:'의자',p:250,tw:1,r:['...KKKKKKKK.....','...KwwwwwwK.....','...KwWWWWwK.....','...KwWWWWwK.....','...KwwwwwwK.....','..KKKKKKKKKK....','..KWWWWWWWWK....','..KwwwwwwwwK....','..KwK....KwK....','..KKK....KKK....']},
  lamp:{n:'세움 등',p:500,tw:1,r:['.....KKKKKK.....','....KLLLLLLK....','...KLYYYYYYLK...','...KYYYYYYYYK...','....KKKKKKKK....','.......Ks.......','.......Ks.......','.......Ks.......','.......Ks.......','.......Ks.......','.....KKKKKK.....','....KssssssK....']},
  plant:{n:'화분',p:300,tw:1,r:['......K.K.......','....KGKGKGK.....','...KGgGKGgGK....','..KGGgKGgGGGK...','...KgGGgGGgK....','....KKgGgKK.....','.....KrRrK......','....KRRRRRK.....','....KrRRRrK.....','.....KKKKK......']},
  shelf:{n:'책장',p:900,tw:1,r:['KKKKKKKKKKKKKKKK','KwwwwwwwwwwwwwwK','KwRrBbGgYyMmRrwK','KwRrBbGgYyMmRrwK','KwwwwwwwwwwwwwwK','KwBbYyRrGgBbMmwK','KwBbYyRrGgBbMmwK','KwwwwwwwwwwwwwwK','KwGgMmBbRrYyGgwK','KwGgMmBbRrYyGgwK','KwwwwwwwwwwwwwwK','KKKKKKKKKKKKKKKK']},
  rug:{n:'둥근 깔개',p:600,tw:2,floor:1,r:['......KKKKKKKKKKKKKKKKKKKK......','...KKTTTTTTTTTTTTTTTTTTTTTTKK...','.KKTTttttttttttttttttttttttTTKK.','KTTtTTTTTTTTTTTTTTTTTTTTTTTTtTTK','.KKTTttttttttttttttttttttttTTKK.','...KKTTTTTTTTTTTTTTTTTTTTTTKK...','......KKKKKKKKKKKKKKKKKKKK......']},
  sofa:{n:'소파',p:1500,tw:2,r:['..KKKKKKKKKKKKKKKKKKKKKKKKKKKK..','.KMMMMMMMMMMMMMMMMMMMMMMMMMMMMK.','.KMmmmmmmmmmmmmmmmmmmmmmmmmmmMK.','KKMKKKKKKKKKKKKKKKKKKKKKKKKKKMKK','KMMKMMMMMMMMMMMKMMMMMMMMMMMMKMMK','KMmKmmmmmmmmmmmKmmmmmmmmmmmmKmMK','KMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMK','KmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmK','.KK.KK....................KK.KK.']},
  piano:{n:'피아노',p:5000,tw:2,r:['KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK','KDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDK','KDEEEEEEEEEEEEEEEEEEEEEEEEEEEEDK','KDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDK','KPKPKPPKPKPKPPKPKPPKPKPKPPKPKPPK','KPKPKPPKPKPKPPKPKPPKPKPKPPKPKPPK','KPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPK','KDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDK','KDK..........................KDK','KDK..........................KDK','KKK..........................KKK']},
  fire:{n:'벽난로',p:3500,tw:2,r:['KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK','KsssssssssssssssssssssssssssssssK','KSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSK','KSsKKKKKKKKKKKKKKKKKKKKKKKKKKsSK','KSsKNNNNNNNNNNNNNNNNNNNNNNNNKsSK','KSsKNNNNNNNOYONNNNOYONNNNNNNKsSK','KSsKNNNNNNOYLYONNOYLYONNNNNNKsSK','KSsKNNNNNOYLLLYOOYLLLYONNNNNKsSK','KSsKNNNNNwwwwwwwwwwwwwwNNNNNKsSK','KSSKKKKKKKKKKKKKKKKKKKKKKKKKKSSK','KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK']},
  tank:{n:'어항',p:2500,tw:2,r:['KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK','KSCCCCCCCCCCCCCCCCCCCCCCCCCCCCSK','KCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCK','KCcCCCCCCCCCCCCCCCCCCCCCCCCCCcCK','KCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCK','KCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCK','KCcCCCCCCCCCCCCCCCCCCCCCCCCCCcCK','KCCCCCGCCCCCCCCCCCCCCCCGCCCCCCCK','KCCCCGgGCCCCCCCCCCCCCCGgGCCCCCCK','KYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyK','KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK','KwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwK','KwK..........................KwK','KKK..........................KKK'],fish:1},
  trophy:{n:'트로피 진열장',p:3000,tw:2,r:['KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK','KwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwK','KwCCCCCCCCCCCCCCCCCCCCCCCCCCCCwK','KwCCCCCCCCCCCCCCCCCCCCCCCCCCCCwK','KwCCCCCCCCCCCCCCCCCCCCCCCCCCCCwK','KwCCCCCCCCCCCCCCCCCCCCCCCCCCCCwK','KwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwK','KwCCCCCCCCCCCCCCCCCCCCCCCCCCCCwK','KwCCCCCCCCCCCCCCCCCCCCCCCCCCCCwK','KwCCCCCCCCCCCCCCCCCCCCCCCCCCCCwK','KwCCCCCCCCCCCCCCCCCCCCCCCCCCCCwK','KwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwK','KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK'],tro:1},
  armor:{n:'갑옷 장식',p:2200,tw:1,r:['.....KKKKKK.....','....KSSSSSSK....','....KSKKKKSK....','....KSSSSSSK....','..KKKKSSSSKKKK..','.KSSSSSSSSSSSSK.','.KSsSSSSSSSSsSK.','..KSSSsYYsSSSK..','...KSSSSSSSSK...','...KsSSKKSSsK...','...KSSK..KSSK...','..KKKKK..KKKKK..','...KwwwwwwwwK...']},
  swords:{n:'검 받침대',p:1800,tw:1,r:['..K.........K...','..KS.......SK...','...KS.....SK....','....KS...SK.....','.....KS.SK......','......KSK.......','.....KSKSK......','....KYK.KYK.....','...KYK...KYK....','..KwwwwwwwwwwK..','..KwWWWWWWWWwK..','..KKKKKKKKKKKK..']},
  chest:{n:'보물 상자',p:1000,tw:1,r:['................','..KKKKKKKKKKKK..','.KwWWWWWWWWWWwK.','.KwWWWWWWWWWWwK.','.KYYYYYYYYYYYYK.','.KwWWWWKKWWWWwK.','.KwWWWWKYKWWWwK.','.KwWWWWWWWWWWwK.','.KwwwwwwwwwwwwK.','.KKKKKKKKKKKKKK.']},
  barrel:{n:'술통',p:350,tw:1,r:['....KKKKKKKK....','...KWWWWWWWWK...','..KwWWWWWWWWwK..','..KsssssssssK...','..KWWWWWWWWWWK..','..KwWWWWWWWWwK..','..KsssssssssK...','..KWWWWWWWWWWK..','...KwwwwwwwwK...','....KKKKKKKK....']},
  crystal:{n:'마력 수정',p:4000,tw:1,r:['.......KK.......','......KMMK......','.....KMLMmK.....','.....KMLMmK.....','....KMMLMmmK....','....KMMMMmmK....','.....KMMMmK.....','......KMmK......','....KKKKKKKK....','...KDDDDDDDDK...','...KEEEEEEEEK...']},
  dummy:{n:'연습 허수아비',p:800,tw:1,r:['.....KKKKK......','....KPPPPPK.....','....KPKPKPK.....','.....KPPPK......','..KKKKwwwKKKK...','..KppKwWwKppK...','.....KwWwK......','.....KwWwK......','......KwK.......','......KwK.......','....KKKKKKK.....']},
  bonsai:{n:'분재',p:1200,tw:1,r:['....KKKK.KKK....','...KGGgGKGgGK...','..KGgGGgGGGgGK..','...KKGgKKgGKK...','.....KwK.KK.....','......KwwK......','.......KwK......','...KKKKKKKKKK...','...KrRRRRRRrK...','....KKKKKKKK....']},
  window:{n:'창문',p:600,wall:1,tw:2,r:['KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK','KwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwK','KwCCCCCCCCCCCCwwCCCCCCCCCCCCCCwK','KwCLCCCCCCCCCCwwCLCCCCCCCCCCCCwK','KwCCLCCCCCCCCCwwCCLCCCCCCCCCCCwK','KwCCCCCCCCCCCCwwCCCCCCCCCCCCCCwK','KwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwK','KwCCCCCCCCCCCCwwCCCCCCCCCCCCCCwK','KwCCCCCCCCCCCCwwCCCCCCCCCCCCCCwK','KwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwK','KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK']},
  paint:{n:'풍경화',p:900,wall:1,tw:1,r:['KKKKKKKKKKKKKKKK','KYyYyYyYyYyYyYYK','KyCCCCCCCCCCCCyK','KYCCCCCLLCCCCCYK','KyCCCCCLLCCCCCyK','KYCCGCCCCCCGCCYK','KyCGgGCCCCGgGCyK','KYGGgGGGGGGgGGYK','KyYyYyYyYyYyYyyK','KKKKKKKKKKKKKKKK']},
  clock:{n:'벽시계',p:700,wall:1,tw:1,r:['....KKKKKKKK....','...KwPPPPPPwK...','..KwPPPKPPPPwK..','..KPPPPKPPPPPK..','..KPPPPKKKPPPK..','..KPPPPPPPPPPK..','..KwPPPPPPPPwK..','...KwPPPPPPwK...','....KKKKKKKK....']},
  banner:{n:'깃발',p:800,wall:1,tw:1,r:['KKKKKKKKKKKKKKKK','.KRRRRRRRRRRRRK.','.KRRRRYYYYRRRRK.','.KRRRYYRRYYRRRK.','.KRRRRYYYYRRRRK.','.KRRRRRYYRRRRRK.','.KRRRRRRRRRRRRK.','..KRRRRRRRRRRK..','...KRRRRRRRRK...','....KRRKKRRK....','.....KK..KK.....']},
  wshelf:{n:'벽 선반',p:500,wall:1,tw:1,r:['................','..KKK.....KKK...','.KTtK....KGgK...','.KTtK.KK.KGgK...','KKKKKKKKKKKKKKKK','KwwwwwwwwwwwwwwK','.Kw..........wK.']}};
 const FIDS=Object.keys(FUR);
 const WALLS=[['나무 판자','#6a4a32','#5a3e2a'],['하늘 벽지','#5a7ab0','#4a6aa0'],['분홍 벽지','#b06a80','#a05a70'],['돌벽','#5a5a66','#4a4a56'],['숲 벽지','#3a6a4a','#2e5a3e'],['밤하늘','#1e2244','#2a3060']];
 const FLOORS=[['나무 바닥','#8a6040','#7a5236'],['체크 타일','#d8d0c0','#a8a090'],['풀밭','#4a8a4a','#3e7a3e'],['돌바닥','#6a6a74','#5a5a64'],['붉은 카펫','#8a2a3a','#7a2232'],['보랏빛 마루','#5a3a7a','#4e3270']];
 const SIZES=[[8,5,0,'작은 방'],[10,6,20000,'넓은 방'],[12,7,60000,'큰 저택']];
 const H=()=>{const h=saveData.house175||(saveData.house175={sz:0,wall:0,floor:0,items:[],own:{bed:1,table:1,chair:1,plant:1}});h.own=h.own||{};h.items=h.items||[];return h};

 /* ================= 방 그리기 ================= */
 const TS=16;
 function drawRoom(o,d,now,opt){opt=opt||{};const [w,h]=SIZES[d.sz|0]||SIZES[0],Wd=w*TS,Hh=(h+3)*TS;o.imageSmoothingEnabled=false;o.clearRect(0,0,o.canvas.width,o.canvas.height);
  const wl=WALLS[d.wall|0]||WALLS[0],fl=FLOORS[d.floor|0]||FLOORS[0];
  /* 벽 */o.fillStyle=wl[1];o.fillRect(0,0,Wd,3*TS);o.fillStyle=wl[2];for(let x=0;x<Wd;x+=8)o.fillRect(x,0,1,3*TS);o.fillStyle='#0004';o.fillRect(0,3*TS-4,Wd,4);o.fillStyle='#ffffff22';o.fillRect(0,0,Wd,2);
  /* 바닥 */for(let y=0;y<h;y++)for(let x=0;x<w;x++){o.fillStyle=(x+y)%2?fl[1]:fl[2];o.fillRect(x*TS,(y+3)*TS,TS,TS);o.fillStyle='#0002';o.fillRect(x*TS,(y+3)*TS+TS-1,TS,1)}
  o.fillStyle='#0003';o.fillRect(0,3*TS,Wd,3);
  const items=(d.items||[]).slice().sort((a,b)=>(FUR[a[0]]&&FUR[a[0]].floor?-1:0)-(FUR[b[0]]&&FUR[b[0]].floor?-1:0)||a[2]-b[2]);
  const drawItem=(it,alpha)=>{const F=FUR[it[0]];if(!F)return;const c=spr(F.r),x=it[1]*TS,base=F.wall?(TS*2+6):((it[2]+4)*TS);const y=F.wall?(TS*2+6-c.height):(base-c.height);
   o.save();o.globalAlpha=alpha||1;if(it[3]){o.translate(x+c.width,0);o.scale(-1,1);o.drawImage(c,0,y)}else o.drawImage(c,x,y);o.restore();
   if(F.fish){const fs=myFish(opt.fish);fs.slice(0,5).forEach((f,i)=>{const F2=Array.isArray(f)?f:(FBY[f]||FISH[0]),fc=spr(SHAPES[F2[7]],{A:F2[5],B:F2[6]});const t=now/1000+i*1.7,fx=x+3+((Math.sin(t*.7+i)+1)/2)*Math.max(0,c.width-6-fc.width),fy=y+3+i%3*2+Math.sin(t*2+i)*1;o.save();if(Math.cos(t*.7+i)<0){o.translate(fx+fc.width,0);o.scale(-1,1);o.drawImage(fc,0,fy)}else o.drawImage(fc,fx,fy);o.restore()})}
   if(F.tro){const n=Math.min(10,opt.tro|0);for(let i=0;i<n;i++){const tx=x+4+(i%5)*5.4,ty=y+(i<5?3:8);o.fillStyle=i%3===0?'#ffd166':i%3===1?'#c8d4e0':'#e0a070';o.fillRect(tx,ty,3,3);o.fillRect(tx+1,ty+3,1,1);o.fillRect(tx,ty+4,3,1)}}};
  for(const it of items)drawItem(it);
  /* 주인 캐릭터 */if(opt.ch!=null){try{const img=ch2Render(opt.ch|0,0,0,false,now);/* 가구(16칸)에 맞게 줄여 그림 */o.save();o.imageSmoothingEnabled=true;o.drawImage(img,0,0,40,48,Math.round(Wd-30),Math.round((h+3)*TS-30),25,30);o.restore()}catch(e){}}
  if(opt.ghost){const g=opt.ghost;drawItem(g,.55);const F=FUR[g[0]];o.strokeStyle=opt.ghostOk?'#7dffa8':'#ff5a6a';o.lineWidth=1;o.strokeRect(g[1]*TS+.5,F.wall?2.5:(g[2]+3)*TS+.5,F.tw*TS-1,F.wall?TS*2+2:TS-1)}}
 const fitOK=(d,it,skip)=>{const F=FUR[it[0]],[w,h]=SIZES[d.sz|0]||SIZES[0];if(!F)return false;if(it[1]<0||it[1]+F.tw>w)return false;if(!F.wall&&(it[2]<0||it[2]>=h))return false;
  for(const o of d.items){if(o===skip)continue;const G=FUR[o[0]];if(!G||!!G.wall!==!!F.wall||!!G.floor!==!!F.floor)continue;if(!F.wall&&o[2]!==it[2])continue;if(it[1]<o[1]+G.tw&&o[1]<it[1]+F.tw)return false}return true};

 /* ================= 낚시: 물고기 ================= */
 /* [id, 이름, 희귀도 0~4, 최소, 최대(cm), 색A, 색B, 모양 0~3, 기본값] — 크기 범위는 서버 FISH_SIZE와 같게 */
 const FISH=[['f01','붕어',0,8,22,'#c8a060','#8a6a3a',0,30],['f02','잉어',0,10,26,'#ff9a5a','#c86a3a',0,40],['f03','송사리',0,6,14,'#c8d8e0','#8aa0b0',1,20],['f04','메기',0,12,30,'#6a6a5a','#3a3a30',2,50],['f05','미꾸라지',0,15,34,'#a08a5a','#6a5a3a',3,45],
  ['f06','피라미',0,9,20,'#a0c8ff','#5a8ac0',1,30],['f07','쏘가리',1,18,40,'#d0b060','#6a5020',0,90],['f08','은어',1,14,32,'#d8e8f0','#8ab0c8',1,80],['f09','가물치',1,20,46,'#5a6a4a','#2a3a20',2,110],['f10','금붕어',1,10,24,'#ffb030','#ff6a20',0,100],
  ['f11','무지개송어',1,22,52,'#c8b0e0','#ff7a9a',1,130],['f12','블루길',1,16,36,'#5a9ac0','#ffb040',0,85],['f13','장어',2,25,60,'#3a4a3a','#6a8a5a',3,220],['f14','비단잉어',2,12,28,'#ffffff','#ff4a3a',0,240],['f15','철갑상어',2,30,70,'#6a7a8a','#3a4a5a',2,300],
  ['f16','열대 엔젤',2,18,44,'#ffe060','#3a3a3a',0,260],['f17','강꼬치',2,35,80,'#8ab07a','#4a6a3a',3,320],['f18','달빛 숭어',2,20,48,'#e0e8ff','#a0b0ff',1,280],['f19','황금 잉어',3,40,95,'#ffd166','#ffb020',0,700],['f20','유리 물고기',3,28,66,'#c0f0ff','#7dd8ff',1,650],
  ['f21','심해 아귀',3,45,110,'#4a2a5a','#ff7aff',2,800],['f22','불꽃 베타',3,24,58,'#ff3a4a','#ff9a3a',0,750],['f23','은빛 청새치',3,50,130,'#c8d4e0','#5a7ab0',3,900],['f24','별빛 해마',3,32,78,'#ff9ad8','#ffe0ff',1,850],
  ['f25','고대 실러캔스',4,60,150,'#3a5a8a','#c8d8ff',2,2200],['f26','무지개 용어',4,38,90,'#ff6a8a','#6affd8',0,2400],['f27','심연의 왕',4,70,180,'#2a1a3a','#c86aff',2,2800],['f28','태엽 물고기',4,80,200,'#c8a060','#5affd8',3,3000],
  ['f29','유령 고래상어',4,90,240,'#c8d0e8','#7a8ab0',2,3500],['f30','비트 리바이어던',4,100,300,'#ff2d55','#ffd166',3,5000]];
 const FBY=Object.fromEntries(FISH.map(f=>[f[0],f])),RAR=[['보통','#c8d4e0'],['희귀','#5ab8ff'],['영웅','#c86aff'],['전설','#ffd166'],['신화','#ff5a8a']];
 const SHAPES=[['...KKKKK..K','..KAAAAAKKA','.KAKAAAAAAA','.KAAAABBAKA','..KBBBBBKKA','...KKKKK..K'],['....KKK...','.KKAAAAK.K','KAKAAAAAKA','.KKBBBBK.K','....KKK...'],
  ['...KKKKKKK..KK','.KKAAAAAAAKKAK','KAKAAAAAAAAAAK','KAAAABBBBAAKAK','.KKBBBBBBBKK.K','...KKKKKKK....'],['..KKKKKKKKKK..K','.KAAAAAAAAAAKKA','KKAAAAAAAAAAAAK','.KBBBBBBBBBBKKA','..KKKKKKKKKK..K']];
 /* 물고기 도트: 모양(0 둥근 · 1 날씬 · 2 큰 머리 · 3 긴 몸)마다 몸 윤곽을 계산해 칸마다 칠함(물고기 번호로 기억) */
 const FSC=new Map();
 function fishSpr(f){const F=typeof f==='string'?FBY[f]:f;if(!F)return spr(['.']);let c=FSC.get(F[0]);if(c)return c;
  const sh=F[7],rar=F[2],SZ=[[24,13],[24,10],[26,14],[30,9]][sh],w=SZ[0],h=SZ[1];c=document.createElement('canvas');c.width=w;c.height=h;const o=c.getContext('2d');
  const hex=(x,k)=>{const n=parseInt(x.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;r=Math.max(0,Math.min(255,r*k|0));g=Math.max(0,Math.min(255,g*k|0));b=Math.max(0,Math.min(255,b*k|0));return 'rgb('+r+','+g+','+b+')'};
  const cy=h/2,tl=sh===3?4:6,bx0=tl,bx1=w-1,bl=bx1-bx0;
  /* 몸 두께(가로 위치 t: 0 꼬리쪽 ~ 1 머리) */const th=t=>{if(sh===3)return (h/2-1)*Math.min(1,Math.sin(Math.min(1,t*1.15)*Math.PI*.5+.2))*(t>.92?Math.cos((t-.92)/.08*1.2):1);
   const p=sh===2?.62:sh===1?.55:.5,m=(h/2-1)*(sh===1?.85:1);return t<p?m*Math.pow(Math.sin(t/p*Math.PI/2),sh===1?.9:.7):m*Math.cos((t-p)/(1-p)*Math.PI/2*(sh===2?.75:.95))};
  const g=[];for(let y=0;y<h;y++){g.push([]);for(let x=0;x<w;x++)g[y].push(0)}
  for(let x=bx0;x<=bx1;x++){const t=(x-bx0)/bl,hh=th(t);for(let y=0;y<h;y++){if(Math.abs(y+.5-cy)<=hh+.15)g[y][x]=1}}
  /* 꼬리 */for(let x=0;x<tl+1;x++){const k=(tl+1-x)/(tl+1),sp=1+k*(sh===3?1.5:h/2-1.5);for(let y=0;y<h;y++){const d=Math.abs(y+.5-cy);if(d<=sp&&!(sh!==3&&x<2&&d<sp*.45))g[y][x]=g[y][x]||2}}
  /* 등지느러미 */if(sh!==3){const fx=bx0+Math.round(bl*.35),fl=Math.round(bl*.3);for(let x=fx;x<fx+fl;x++){let top=0;while(top<h&&!g[top][x])top++;const k=Math.round(2*Math.sin((x-fx)/fl*Math.PI));for(let y=top-k;y<top;y++)if(y>=0)g[y][x]=2}}
  else{for(let x=bx0+2;x<bx1-4;x++){let top=0;while(top<h&&!g[top][x])top++;if(top>0)g[top-1][x]=2}}
  /* 칠하기: 위 · 아래 명암 + 배 색 + 비늘 */const A=F[5],B=F[6];
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const v=g[y][x];if(!v)continue;let col;
   if(v===2)col=hex(B,.9);else{const ry=(y+.5-cy)/(h/2);col=ry>.25?hex(B,1.05):ry<-.45?hex(A,.78):hex(A,1);if(ry>-.3&&ry<.25&&(x+y*2)%5===0&&x>bx0+2&&x<bx1-4)col=hex(A,.88);if(ry<-.15&&ry>-.6&&x>bx0+bl*.5&&x<bx1-3&&y%3===0)col=hex(A,1.25)}
   o.fillStyle=col;o.fillRect(x,y,1,1)}
  /* 외곽선 */o.fillStyle='#1a1418';for(let y=0;y<h;y++)for(let x=0;x<w;x++){if(g[y][x])continue;const n=(yy,xx)=>yy>=0&&yy<h&&xx>=0&&xx<w&&g[yy][xx];if(n(y-1,x)||n(y+1,x)||n(y,x-1)||n(y,x+1))o.fillRect(x,y,1,1)}
  /* 눈 · 아가미 · 입 */const ex=bx1-(sh===2?4:3),ey=Math.floor(cy-(sh===3?1:h*.14));o.fillStyle='#fff';o.fillRect(ex-1,ey,2,2);o.fillStyle='#000';o.fillRect(ex,ey,1,1);o.fillStyle=hex(A,.6);
  if(sh!==3)for(let y=Math.floor(cy-h*.2);y<Math.ceil(cy+h*.2);y++)if(g[y]&&g[y][ex-3])o.fillRect(ex-3,y,1,1);o.fillStyle='#1a1418';o.fillRect(bx1-1,Math.floor(cy+(sh===2?1:0)),2,1);
  /* 메기 · 아귀: 수염 / 등불 */if(sh===2){o.fillStyle=hex(A,.7);o.fillRect(bx1-2,Math.floor(cy)+2,1,2);if(rar>=3){o.fillStyle=B;o.fillRect(bx1-6,0,1,2);o.fillRect(bx1-5,0,2,1)}}
  /* 전설 · 신화: 반짝이 */if(rar>=3){o.fillStyle='#fff';for(let i=0;i<rar;i++){const x=bx0+3+i*5%bl,y=Math.floor(cy-1+(i%2?2:-1));if(g[y]&&g[y][x]===1)o.fillRect(x,y,1,1)}}
  FSC.set(F[0],c);return c}
 const FS=()=>{const o=saveData.fish175||(saveData.fish175={n:{},xp:0,rod:0,sold:{d:'',g:0},keep:[]});o.n=o.n||{};o.keep=o.keep||[];o.sold=o.sold||{d:'',g:0};return o};
 function myFish(list){if(list)return list.map(id=>FBY[id]).filter(Boolean);const n=FS().n;return Object.keys(n).map(k=>FBY[k]).filter(Boolean).sort((a,b)=>b[2]-a[2])}
 const flv=()=>Math.min(30,1+Math.floor(Math.sqrt(FS().xp/40)));
 const RODS=[['나무 낚싯대',0,0],['강철 낚싯대',2000,1],['은빛 낚싯대',8000,2],['황금 낚싯대',20000,3]];

 /* ================= 집 창 ================= */
 const hb=document.createElement('div');hb.id='hs175';hb.hidden=true;document.body.appendChild(hb);hb.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===hb)closeHouse()});
 const HV={tab:'shop',sel:null,hold:null,visit:null,top:null,msg:'',hover:null,raf:0,savedT:0};
 function openHouse(name){hb.hidden=false;HV.msg='';HV.sel=null;HV.hold=null;if(name)visit(name);else{HV.visit=null;paintH()}loop()}
 function closeHouse(){hb.hidden=true;saveHouse()}
 let saveTO=0;function saveHouse(){clearTimeout(saveTO);saveTO=setTimeout(async()=>{try{saveNow()}catch(e){}if(!acc().token)return;const h=H();let ch=0;try{ch=shopInv().eq.ch||0}catch(e){}
   await api('/api/house/save',{data:{sz:h.sz,wall:h.wall,floor:h.floor,items:h.items,ch,fish:myFish().slice(0,5).map(f=>f[0]),tro:troN()}})},600)}
 const troN=()=>{try{return Math.min(10,Math.floor(CP170.totals().cnt/20))}catch(e){return 0}};
 async function visit(name){HV.msg='집에 가는 중…';paintH();const r=await api('/api/house/get',{name,visit:1});if(r.s!==200){HV.msg=(r.j&&r.j.error)||'찾지 못했어요';HV.visit=null;paintH();return}HV.visit=r.j;HV.msg='';HV.tab='visit';paintH()}
 function loop(){if(HV.raf)return;const f=now=>{HV.raf=0;if(hb.hidden)return;const cv=hb.querySelector('canvas.room');if(cv){const o=cv.getContext('2d'),V=HV.visit;
    if(V)drawRoom(o,V.data,now,{ch:V.data.ch,fish:V.data.fish,tro:V.data.tro});else{let ch=0;try{ch=shopInv().eq.ch||0}catch(e){}const g=HV.hover&&HV.sel?[HV.sel,HV.hover[0],HV.hover[1],HV.flip?1:0]:null;drawRoom(o,H(),now,{ch,tro:troN(),ghost:g,ghostOk:g&&fitOK(H(),g)})}}HV.raf=requestAnimationFrame(f)};HV.raf=requestAnimationFrame(f)}
 function paintH(){if(hb.hidden)return;const V=HV.visit,h=H(),[w,hh]=SIZES[(V?V.data.sz:h.sz)|0]||SIZES[0];
  const right=V?visitSide():HV.tab==='shop'?shopSide():HV.tab==='deco'?decoSide():HV.tab==='visit'?visitList():shopSide();
  hb.innerHTML='<div class="pn"><div class="hd"><button class="bk">닫기</button><i>🏠</i><div><b>'+(V?esc(V.name)+'님의 집':'내 집')+'</b><small>'+(V?'♥ '+V.likes+' · 방문 '+num(V.visits):'가구를 사서 놓고 · 꾸미고 · 친구를 초대해요')+'</small></div>'+(V?'<button class="home">🏠 내 집으로</button>':'')+'</div>'+
   '<div class="mn"><div class="rv"><canvas class="room" width="'+w*TS+'" height="'+(hh+3)*TS+'"></canvas>'+(!V?'<small class="hint">'+(HV.sel?'🟩 놓을 곳을 눌러요 · '+'<b data-flip>↔ 뒤집기</b> · <b data-unsel>취소</b>':'가구를 눌러 들기(보관함으로) · 오른쪽에서 가구를 골라 놓기')+'</small>':'')+'</div>'+
   '<div class="sd">'+(!V?'<div class="tabs">'+[['shop','🛋 가구'],['deco','🎨 꾸미기'],['visit','🚪 놀러 가기']].map(([k,n])=>'<button data-t="'+k+'" class="'+(HV.tab===k?'on':'')+'">'+n+'</button>').join('')+'</div>':'')+right+'</div></div><div class="msg">'+esc(HV.msg)+'</div></div>';wireH()}
 function shopSide(){const h=H();return '<small class="cn">내 골드 🪙 '+num(coins())+' · 놓인 가구 '+h.items.length+'개</small><div class="fl">'+FIDS.map(id=>{const F=FUR[id],n=h.own[id]|0;return '<div class="fi'+(HV.sel===id?' on':'')+'"><canvas width="'+spr(F.r).width+'" height="'+spr(F.r).height+'" data-fp="'+id+'"></canvas><b>'+esc(F.n)+'</b><small>'+(F.wall?'벽 · ':'')+'🪙 '+num(F.p)+(n?' · 보관 '+n:'')+'</small><div class="ac">'+(n?'<button data-place="'+id+'">놓기</button>':'')+'<button data-buy="'+id+'">사기</button></div></div>'}).join('')+'</div>'}
 function decoSide(){const h=H();return '<h5>벽지</h5><div class="sw">'+WALLS.map((x,i)=>'<button data-wall="'+i+'" class="'+((h.wall|0)===i?'on':'')+'" style="background:linear-gradient(90deg,'+x[1]+','+x[2]+')">'+x[0]+'</button>').join('')+'</div>'+
  '<h5>바닥</h5><div class="sw">'+FLOORS.map((x,i)=>'<button data-floor="'+i+'" class="'+((h.floor|0)===i?'on':'')+'" style="background:repeating-linear-gradient(45deg,'+x[1]+' 0 6px,'+x[2]+' 6px 12px)">'+x[0]+'</button>').join('')+'</div>'+
  '<h5>방 크기</h5><div class="sz">'+SIZES.map((x,i)=>'<button data-sz="'+i+'" class="'+((h.sz|0)===i?'on':'')+'"'+(i<(h.szMax|0)+2&&i<=Math.max(h.sz|0,h.szMax|0)+1?'':' disabled')+'>'+x[3]+' '+x[0]+'×'+x[1]+(i>(h.szMax|0)?' · 🪙 '+num(x[2]):'')+'</button>').join('')+'</div>'+
  '<p class="tip">💡 「트로피 진열장」은 업적이 많을수록 트로피가 늘고, 「어항」에는 낚시로 잡은 물고기가 헤엄쳐요.</p>'}
 function visitList(){const T=HV.top;return '<h5>🚪 이름으로 놀러 가기</h5><div class="row"><input class="vn" placeholder="이름"><button class="go" data-go>가기</button></div><h5>🏆 인기 있는 집</h5>'+
  (T?T.length?T.map((x,i)=>'<button class="tr" data-vis="'+esc(x.name)+'"><i>'+(i+1)+'</i><b>'+esc(x.name)+'</b><span>♥ '+x.likes+' · 방문 '+num(x.visits)+'</span></button>').join(''):'<div class="em">아직 꾸민 집이 없어요</div>':'<div class="em">불러오는 중…</div>')}
 function visitSide(){const V=HV.visit;return (V.mine?'<p class="tip">내 집을 다른 사람이 보는 모습이에요</p>':'<button class="go lk'+(V.liked?' on':'')+'" data-like>'+(V.liked?'♥ 좋아요':'♡ 좋아요')+'</button>')+'<h5>📖 방명록</h5>'+
  (V.mine?'':'<div class="row"><input class="bk2" maxlength="40" placeholder="한마디 남기기 (40자)"><button class="go" data-book>남기기</button></div>')+'<div class="bkl">'+(V.book.length?V.book.map(x=>'<div class="be"><b>'+esc(x.name)+'</b><p>'+esc(x.text)+'</p><small>'+ago(x.t)+'</small></div>').join(''):'<div class="em">아직 아무도 안 남겼어요</div>')+'</div>'}
 function wireH(){const q=s=>hb.querySelector(s),qa=(s,f)=>hb.querySelectorAll(s).forEach(f);q('.bk').onclick=closeHouse;qa('input',i=>i.addEventListener('keydown',e=>e.stopPropagation()));
  if(q('.home'))q('.home').onclick=()=>{HV.visit=null;HV.tab='shop';paintH()};
  qa('[data-t]',b=>b.onclick=async()=>{HV.tab=b.dataset.t;HV.sel=null;paintH();if(HV.tab==='visit'){const r=await api('/api/house/top',{});HV.top=r.s===200?r.j.top:[];paintH()}});
  qa('canvas[data-fp]',cv=>{const o=cv.getContext('2d');o.imageSmoothingEnabled=false;o.drawImage(spr(FUR[cv.dataset.fp].r),0,0)});
  const h=H();
  qa('[data-buy]',b=>b.onclick=()=>{const id=b.dataset.buy,F=FUR[id];if(!pay(F.p)){HV.msg='골드가 모자라요';paintH();return}h.own[id]=(h.own[id]|0)+1;HV.msg='🛋 '+F.n+' 샀어요! 「놓기」로 방에 두세요';try{gmSfx('ok')}catch(e){}saveHouse();paintH()});
  qa('[data-place]',b=>b.onclick=()=>{HV.sel=b.dataset.place;HV.flip=false;paintH()});if(q('[data-flip]'))q('[data-flip]').onclick=()=>{HV.flip=!HV.flip};if(q('[data-unsel]'))q('[data-unsel]').onclick=()=>{HV.sel=null;paintH()};
  qa('[data-wall]',b=>b.onclick=()=>{h.wall=+b.dataset.wall;saveHouse();paintH()});qa('[data-floor]',b=>b.onclick=()=>{h.floor=+b.dataset.floor;saveHouse();paintH()});
  qa('[data-sz]',b=>b.onclick=()=>{const i=+b.dataset.sz;if(i>(h.szMax|0)){if(!pay(SIZES[i][2])){HV.msg='골드가 모자라요';paintH();return}h.szMax=i;HV.msg='🏠 '+SIZES[i][3]+'(으)로 넓혔어요!'}
   if(i<(h.sz|0)){const [w,hh]=SIZES[i];h.items=h.items.filter(it=>{const F=FUR[it[0]];const ok=F&&it[1]+F.tw<=w&&(F.wall||it[2]<hh);if(!ok)h.own[it[0]]=(h.own[it[0]]|0)+1;return ok})}h.sz=i;saveHouse();paintH()});
  if(q('[data-go]'))q('[data-go]').onclick=()=>{const n=q('.vn').value.trim();if(n)visit(n)};qa('[data-vis]',b=>b.onclick=()=>visit(b.dataset.vis));
  if(q('[data-like]'))q('[data-like]').onclick=async()=>{const r=await api('/api/house/like',{name:HV.visit.name});if(r.s===200){HV.visit.liked=r.j.liked;HV.visit.likes+=r.j.liked?1:-1}else HV.msg=(r.j&&r.j.error)||'';paintH()};
  if(q('[data-book]'))q('[data-book]').onclick=async()=>{const t=q('.bk2').value.trim();if(!t)return;const r=await api('/api/house/book',{name:HV.visit.name,text:t});if(r.s===200){visit(HV.visit.name)}else{HV.msg=(r.j&&r.j.error)||'남기지 못했어요';paintH()}};
  /* 방 캔버스: 놓기 · 들기 */
  const cv=q('canvas.room');if(cv&&!HV.visit){const at=e=>{const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*cv.width,y=(e.clientY-r.top)/r.height*cv.height;return [x,y]};
   cv.onpointermove=e=>{if(!HV.sel)return;const [x,y]=at(e),F=FUR[HV.sel];HV.hover=[Math.max(0,Math.floor(x/TS-(F.tw-1)/2)),F.wall?0:Math.floor(y/TS)-3]};cv.onpointerleave=()=>{HV.hover=null};
   cv.onclick=e=>{const [x,y]=at(e);if(HV.sel){const F=FUR[HV.sel],it=[HV.sel,Math.max(0,Math.floor(x/TS-(F.tw-1)/2)),F.wall?0:Math.floor(y/TS)-3,HV.flip?1:0];
     if(!fitOK(h,it)){HV.msg='거기엔 놓을 수 없어요';paintH();return}h.items.push(it);h.own[HV.sel]--;if(!h.own[HV.sel]){HV.sel=null}HV.msg='';saveHouse();try{sfx(520,.06,'triangle',.04,780)}catch(_){}paintH();return}
    /* 들기: 위쪽(그림이 겹치는 곳)부터 */const tx=Math.floor(x/TS),ty=Math.floor(y/TS)-3;let hit=-1;for(let i=h.items.length-1;i>=0;i--){const it=h.items[i],F=FUR[it[0]];if(!F)continue;if(tx<it[1]||tx>=it[1]+F.tw)continue;
     if(F.wall?(y<TS*3):(ty===it[2]||(ty===it[2]-1&&spr(F.r).height>TS))){hit=i;break}}
    if(hit>=0){const it=h.items.splice(hit,1)[0];h.own[it[0]]=(h.own[it[0]]|0)+1;HV.msg='📦 '+FUR[it[0]].n+'을(를) 보관함에 넣었어요';saveHouse();paintH()}}}}

 /* ================= 낚시 창 ================= */
 const fb=document.createElement('div');fb.id='fs175';fb.hidden=true;document.body.appendChild(fb);fb.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===fb)closeFish()});
 const FV={tab:'fish',st:'idle',spot:0,t0:0,bite:0,fish:null,size:0,prog:0,hearts:3,notes:[],nextN:0,bpm:100,res:null,top:null,msg:'',raf:0,judge:null};
 function openFish(){fb.hidden=false;FV.tab='fish';FV.st='idle';FV.msg='';paintF();floop()}
 function closeFish(){fb.hidden=true;FV.st='idle'}
 const rodLv=()=>FS().rod|0;
 function cast(){if(FV.st!=='idle'&&FV.st!=='result')return;FV.st='wait';FV.t0=performance.now();FV.bite=FV.t0+1500+Math.random()*3500;FV.res=null;try{sfx(300,.12,'sine',.04,600)}catch(e){}paintF()}
 function rollFish(){const deep=FV.spot===1,lv=rodLv(),w=[50,28,14-(deep?-6:0),6+(deep?6:0)+lv*1.5,2+(deep?3:0)+lv];let r=Math.random()*w.reduce((a,b)=>a+b,0),rar=0;for(;rar<4;rar++){if(r<w[rar])break;r-=w[rar]}
  const pool=FISH.filter(f=>f[2]===rar);const f=pool[Math.floor(Math.random()*pool.length)];const k=Math.pow(Math.random(),1.6+(4-rar)*.1);return {f,size:Math.round(f[3]+(f[4]-f[3])*k)}}
 function hook(){const now=performance.now();if(FV.st==='wait'){if(now<FV.bite){FV.st='idle';FV.msg='앗, 너무 빨리 당겼어요!';try{sfx(200,.15,'square',.04,120)}catch(e){}paintF();return}}
  if(FV.st==='bite'){const r=rollFish();FV.fish=r.f;FV.size=r.size;FV.st='reel';FV.prog=25;FV.hearts=3;FV.notes=[];FV.bpm=96+r.f[2]*16;FV.nextN=now+600;FV.t0=now;FV.msg='';try{sfx(660,.08,'square',.05,990)}catch(e){}paintF();return}
  if(FV.st==='reel'){const win=95+rodLv()*22,perf=45+rodLv()*10;let best=null,bd=1e9;for(const n of FV.notes){if(n.done)continue;const d=Math.abs(n.at-now);if(d<bd){bd=d;best=n}}
   if(best&&bd<=win){best.done=1;const p=bd<=perf;FV.prog+=p?14:9;FV.judge={t:now,txt:p?'PERFECT':'GOOD',c:p?'#ffe79a':'#7dffa8'};try{sfx(p?1200:900,.05,'triangle',.05,p?1600:1100);perc('snare',audio.currentTime,.25)}catch(e){}
    if(FV.prog>=100)caught()}else{FV.prog=Math.max(0,FV.prog-6);FV.judge={t:now,txt:'헛손질',c:'#ff9a9a'};try{sfx(180,.06,'square',.03,140)}catch(e){}}}}
 async function caught(){FV.st='result';const f=FV.fish,size=FV.size,o=FS(),isNew=!o.n[f[0]];o.n[f[0]]=o.n[f[0]]||{c:0,max:0};o.n[f[0]].c++;o.n[f[0]].max=Math.max(o.n[f[0]].max,size);o.xp+=6+f[2]*8;o.keep.push([f[0],size]);if(o.keep.length>40)o.keep.shift();
  try{saveNow()}catch(e){}try{sfx(784,.2,'triangle',.06,1568);setTimeout(()=>sfx(1046,.25,'triangle',.06,2093),150)}catch(e){}
  FV.res={f,size,isNew,best:null};paintF();if(acc().token){const r=await api('/api/fish/catch',{fish:f[0],size});if(r.s===200){FV.res.best=r.j.best;FV.res.record=r.j.record;paintF()}}try{saveHouse()}catch(e){}}
 function lose(why){FV.st='result';FV.res={lost:why};try{sfx(160,.4,'sawtooth',.05,60)}catch(e){}paintF()}
 const price=(f,size)=>Math.round(f[8]*(.7+.6*(size-f[3])/Math.max(1,f[4]-f[3])));
 function sell(idx){const o=FS(),it=o.keep[idx];if(!it)return;const f=FBY[it[0]],p=price(f,it[1]),today=new Date().toDateString();if(o.sold.d!==today)o.sold={d:today,g:0};
  if(o.sold.g+p>20000){FV.msg='오늘은 더 팔 수 없어요(하루 🪙20,000까지)';paintF();return}o.sold.g+=p;o.keep.splice(idx,1);try{addCoins(p)}catch(e){saveData.coins+=p}try{saveNow();gmHud()}catch(e){}FV.msg='🪙 +'+num(p);paintF()}
 /* 낚시 그리기 · 박자 */
 function floop(){if(FV.raf)return;const f=now=>{FV.raf=0;if(fb.hidden)return;try{fstep(now)}catch(e){}FV.raf=requestAnimationFrame(f)};FV.raf=requestAnimationFrame(f)}
 function fstep(now){const cv=fb.querySelector('canvas.pond');if(FV.st==='wait'&&now>=FV.bite){FV.st='bite';FV.biteEnd=now+850+rodLv()*120;try{sfx(1400,.08,'square',.06,1800)}catch(e){}paintF()}
  if(FV.st==='bite'&&now>FV.biteEnd){FV.st='idle';FV.msg='물고기가 미끼만 먹고 도망갔어요…';paintF()}
  if(FV.st==='reel'){const beat=60000/FV.bpm;if(now>=FV.nextN){FV.notes.push({at:now+1500,spawn:now});FV.nextN=now+beat*(Math.random()<.25?.5:1)}
   for(const n of FV.notes)if(!n.done&&now>n.at+110+rodLv()*22){n.done=1;n.miss=1;FV.hearts--;FV.prog=Math.max(0,FV.prog-8);FV.judge={t:now,txt:'놓침!',c:'#ff5a6a'};try{sfx(140,.1,'square',.04,90)}catch(e){}}
   FV.notes=FV.notes.filter(n=>now-n.at<400);FV.prog=Math.max(0,FV.prog-.0025*(now-(FV.lastT||now))*(1+FV.fish[2]*.25));if(FV.hearts<=0)lose('줄이 끊어졌어요!');else if(now-FV.t0>25000)lose('물고기가 지쳐서 도망갔어요');}
  FV.lastT=now;if(!cv)return;const o=cv.getContext('2d'),Wd=cv.width,Hh=cv.height;o.imageSmoothingEnabled=false;
  /* 배경: 하늘 · 먼 숲 · 물 · 선착장 */const deep=FV.spot===1;o.fillStyle=deep?'#1a2a4a':'#8ac8e8';o.fillRect(0,0,Wd,70);o.fillStyle=deep?'#2a3a5a':'#c8e8f8';for(let i=0;i<5;i++)o.fillRect((i*83+now/80)%Wd-20,14+i*7%20,30,4);
  o.fillStyle=deep?'#10241a':'#3a7a4a';for(let x=0;x<Wd;x+=12){const h=14+((x*37)%11);o.fillRect(x,70-h,12,h)}o.fillStyle=deep?'#0a2040':'#2a6ab0';o.fillRect(0,70,Wd,Hh-70);
  for(let i=0;i<14;i++){const y=78+i*10,x=(i*53+now/(40+i*5))%(Wd+40)-20;o.fillStyle=deep?'#1a3060':'#4a8ad0';o.fillRect(x,y,18,1)}
  o.fillStyle='#6a4a32';o.fillRect(0,128,96,10);o.fillStyle='#4a321e';for(let x=0;x<96;x+=12)o.fillRect(x,128,1,10);o.fillRect(10,138,4,30);o.fillRect(70,138,4,30);
  try{const img=ch2Render((shopInv().eq.ch|0),0,0,false,now);o.drawImage(img,0,0,40,48,48,84,40,48)}catch(e){}
  /* 낚싯줄 · 찌 */const bx=220,by=118+(FV.st==='wait'?Math.sin(now/300)*1.5:FV.st==='bite'?Math.sin(now/40)*3+2:FV.st==='reel'?Math.sin(now/60)*2:0);
  if(FV.st!=='idle'&&!(FV.st==='result')){o.strokeStyle='#ffffffaa';o.lineWidth=1;o.beginPath();o.moveTo(86,92);o.quadraticCurveTo(160,80,bx,by-4);o.stroke();o.fillStyle='#ff4a4a';o.fillRect(bx-2,by-6,4,4);o.fillStyle='#fff';o.fillRect(bx-2,by-2,4,2);
   o.fillStyle='#ffffff55';o.fillRect(bx-6-(now/80%6),by+1,12+(now/80%6)*2,1)}
  if(FV.st==='bite'){o.fillStyle='#ffe79a';o.font='bold 22px sans-serif';o.textAlign='center';o.fillText('!',bx,by-14)}
  /* 박자 줄 */if(FV.st==='reel'){const ly=Hh-28;o.fillStyle='#0008';o.fillRect(0,ly-14,Wd,28);const hx=40;o.strokeStyle='#ffe79a';o.lineWidth=2;o.strokeRect(hx-9,ly-10,18,20);
   for(const n of FV.notes){if(n.done)continue;const k=(n.at-now)/1500,x=hx+k*(Wd-hx-10);o.fillStyle='#7dd8ff';o.beginPath();o.arc(x,ly,6,0,6.283);o.fill();o.fillStyle='#fff';o.fillRect(x-2,ly-3,2,2)}
   if(FV.judge&&now-FV.judge.t<500){o.fillStyle=FV.judge.c;o.font='900 13px sans-serif';o.textAlign='left';o.fillText(FV.judge.txt,hx+16,ly-18)}
   /* 게이지 · 하트 */o.fillStyle='#0008';o.fillRect(Wd-118,8,110,12);o.fillStyle='#7dffa8';o.fillRect(Wd-116,10,106*FV.prog/100,8);o.fillStyle='#000a';o.fillRect(Wd-118,21,110,12);o.fillStyle='#fff';o.font='bold 9px sans-serif';o.textAlign='right';o.fillText('줄 당기기 '+Math.round(FV.prog)+'%',Wd-12,30);
   o.textAlign='left';o.font='12px sans-serif';o.fillText('❤'.repeat(Math.max(0,FV.hearts)),8,18);
   /* 물속 그림자 */const sx=bx+Math.sin(now/400)*20,sy=by+18;o.fillStyle='#0004';o.beginPath();o.ellipse(sx,sy,10+FV.fish[2]*4,4,0,0,6.283);o.fill()}}
 function paintF(){if(fb.hidden)return;const o=FS(),lv=flv(),tab=FV.tab;let body='';
  if(tab==='fish'){const R=FV.res;body='<div class="fsm"><canvas class="pond" width="360" height="200"></canvas><div class="fc">'+
    (FV.st==='idle'?'<button class="go big" data-cast>🎣 던지기</button><small>찌가 흔들리다 <b>「!」</b>가 뜨면 바로 눌러요</small>':FV.st==='wait'?'<button class="go big" data-hook>기다리는 중…</button><small>「!」가 뜨면 눌러요 · 너무 빨리 누르면 놓쳐요</small>':
     FV.st==='bite'?'<button class="go big hot" data-hook>❗ 지금!</button>':FV.st==='reel'?'<button class="go big hot" data-hook>🎣 당겨! (스페이스 · 화면 누르기)</button><small>파란 박자가 노란 네모에 올 때 눌러요 · 놓치면 하트 −1</small>':
     R&&R.lost?'<div class="rs l">😢 '+esc(R.lost)+'</div><button class="go" data-cast>다시 던지기</button>':R?'<div class="rs"><canvas width="'+fishSpr(R.f).width+'" height="'+fishSpr(R.f).height+'" class="fsr"></canvas><div><em style="--c:'+RAR[R.f[2]][1]+'">'+RAR[R.f[2]][0]+'</em><b>'+esc(R.f[1])+'</b><span>'+R.size+'cm'+(R.isNew?' · 🆕 도감 등록!':'')+(R.record?' · 🏆 서버 최고 기록!':R.best?' · 내 최고!':'')+'</span></div></div><button class="go" data-cast>🎣 다시 던지기</button>':'')+
    '<div class="spots">'+[['연못',0],['깊은 물',8]].map(([n,need],i)=>'<button data-spot="'+i+'" class="'+(FV.spot===i?'on':'')+'"'+(lv<need?' disabled':'')+'>'+n+(lv<need?' (낚시 레벨 '+need+')':'')+'</button>').join('')+'</div>'+
    '<div class="lvb">낚시 레벨 <b>'+lv+'</b> · '+RODS[rodLv()][0]+(rodLv()<3?' <button data-rod>강화 🪙 '+num(RODS[rodLv()+1][1])+'</button>':' (최고)')+'</div></div></div>'}
  else if(tab==='dex'){const n=o.n,got=Object.keys(n).length;body='<div class="dex"><p class="tip">도감 <b>'+got+' / '+FISH.length+'</b> · 희귀한 물고기는 깊은 물 · 좋은 낚싯대에서 잘 나와요</p><div class="dg">'+FISH.map(f=>{const m=n[f[0]];return '<div class="di'+(m?'':' no')+'" style="--c:'+RAR[f[2]][1]+'"><canvas width="'+fishSpr(f).width+'" height="'+fishSpr(f).height+'" data-fsh="'+f[0]+'"></canvas><b>'+(m?esc(f[1]):'???')+'</b><small>'+RAR[f[2]][0]+(m?' · '+m.c+'마리 · 최대 '+m.max+'cm':' · '+f[3]+'~'+f[4]+'cm')+'</small></div>'}).join('')+'</div>'+
   '<h5>🧺 망태기 <small>잡은 물고기 '+o.keep.length+'마리 · 팔면 골드(오늘 🪙'+num(o.sold.d===new Date().toDateString()?o.sold.g:0)+' / 20,000)</small></h5><div class="kp">'+(o.keep.length?o.keep.map((k,i)=>{const f=FBY[k[0]];return f?'<button data-sell="'+i+'" style="--c:'+RAR[f[2]][1]+'"><b>'+esc(f[1])+'</b><small>'+k[1]+'cm · 🪙 '+num(price(f,k[1]))+'</small></button>':''}).join(''):'<div class="em">비어 있어요</div>')+'</div></div>'}
  else{const T=FV.top;body='<div class="rec">'+(T?'<h5>🏆 종마다 가장 큰 물고기</h5><div class="dg">'+FISH.map(f=>{const r=T.records[f[0]];return '<div class="di'+(r?'':' no')+'" style="--c:'+RAR[f[2]][1]+'"><b>'+esc(f[1])+'</b><small>'+(r?esc(r.name)+' · '+r.size+'cm':'기록 없음')+'</small></div>'}).join('')+'</div>'+
   '<h5>📚 도감 많이 채운 사람</h5>'+(T.collectors.length?T.collectors.map((x,i)=>'<div class="tr"><i>'+(i+1)+'</i><b>'+esc(x.name)+'</b><span>'+x.n+'종</span></div>').join(''):'<div class="em">아직 없어요</div>'):'<div class="em">불러오는 중…</div>')+'</div>'}
  fb.innerHTML='<div class="pn"><div class="hd"><button class="bk">닫기</button><i>🎣</i><div><b>낚시</b><small>박자에 맞춰 당겨요 · 물고기 '+FISH.length+'종 도감 · 큰 물고기 기록</small></div></div>'+
   '<div class="tabs">'+[['fish','🎣 낚시'],['dex','📖 도감 · 망태기'],['rec','🏆 기록']].map(([k,n])=>'<button data-t="'+k+'" class="'+(tab===k?'on':'')+'">'+n+'</button>').join('')+'</div><div class="bd">'+body+'</div><div class="msg">'+esc(FV.msg)+'</div></div>';wireF()}
 function wireF(){const q=s=>fb.querySelector(s),qa=(s,f)=>fb.querySelectorAll(s).forEach(f);q('.bk').onclick=closeFish;
  qa('[data-t]',b=>b.onclick=async()=>{FV.tab=b.dataset.t;FV.msg='';paintF();if(FV.tab==='rec'){const r=await api('/api/fish/top',{});FV.top=r.s===200?r.j:{records:{},collectors:[]};paintF()}});
  qa('[data-cast]',b=>b.onclick=cast);qa('[data-hook]',b=>b.onpointerdown=e=>{e.preventDefault();hook()});const cv=q('canvas.pond');if(cv)cv.onpointerdown=e=>{e.preventDefault();if(FV.st==='idle'||FV.st==='result')cast();else hook()};
  qa('[data-spot]',b=>b.onclick=()=>{FV.spot=+b.dataset.spot;paintF()});if(q('[data-rod]'))q('[data-rod]').onclick=()=>{const n=rodLv()+1,c=RODS[n][1];if(!pay(c)){FV.msg='골드가 모자라요';paintF();return}FS().rod=n;try{saveNow()}catch(e){}FV.msg='🎣 '+RODS[n][0]+'(으)로 바꿨어요!';paintF()};
  qa('canvas[data-fsh]',cv=>{const o=cv.getContext('2d');o.drawImage(fishSpr(cv.dataset.fsh),0,0)});const r=q('canvas.fsr');if(r&&FV.res&&FV.res.f){r.getContext('2d').drawImage(fishSpr(FV.res.f),0,0)}
  qa('[data-sell]',b=>b.onclick=()=>sell(+b.dataset.sell))}
 /* 스페이스 · J 로 당기기(낚시 창이 열려 있을 때만) */
 const fkey=e=>{if(fb.hidden||e.type!=='keydown'||!(e.code==='Space'||e.code==='KeyJ'||e.code==='Enter'))return false;if(e.target&&e.target.tagName==='INPUT')return false;if(!e.repeat){if(FV.st==='idle'||FV.st==='result')cast();else hook()}return true};
 /* 키 바꾸기(000)가 먼저 키를 옮기므로 그 앞(KB.pre 맨 앞)에서 받는다 */if(typeof KB!=='undefined'&&KB.pre)KB.pre.unshift(fkey);else document.addEventListener('keydown',e=>{if(fkey(e)){e.preventDefault();e.stopPropagation()}},true);
 /* 광장 단추 */
 const pbtn=document.createElement('button');pbtn.id='fsb175';pbtn.hidden=true;pbtn.innerHTML='🎣<span>낚시</span>';document.body.appendChild(pbtn);pbtn.addEventListener('pointerdown',e=>e.stopPropagation());pbtn.onclick=e=>{e.stopPropagation();openFish()};
 const hbtn=document.createElement('button');hbtn.id='hsb175';hbtn.hidden=true;hbtn.innerHTML='🏠<span>내 집</span>';document.body.appendChild(hbtn);hbtn.addEventListener('pointerdown',e=>e.stopPropagation());hbtn.onclick=e=>{e.stopPropagation();openHouse()};
 setInterval(()=>{const on=typeof mode!=='undefined'&&mode==='plaza'&&fb.hidden&&hb.hidden;if(pbtn.hidden===on)pbtn.hidden=!on;if(hbtn.hidden===on)hbtn.hidden=!on},400);

 const st=document.createElement('style');st.textContent=`
 #hs175,#fs175{position:fixed;inset:0;z-index:9300;display:grid;place-items:center;background:#000b;backdrop-filter:blur(3px);color:#eef0f6;font-family:inherit}#hs175[hidden],#fs175[hidden],#fsb175[hidden],#hsb175[hidden]{display:none}
 #hs175 .pn,#fs175 .pn{width:min(980px,calc(100vw - 20px));height:min(660px,calc(100vh - 20px));display:flex;flex-direction:column;box-sizing:border-box;padding:12px 14px;border-radius:16px;box-shadow:0 20px 60px #000c}
 #hs175 .pn{background:radial-gradient(120% 60% at 50% 0%,#3a2a1a,#120c08 70%);border:1px solid #e8b07a66}#fs175 .pn{width:min(860px,calc(100vw - 20px));background:radial-gradient(120% 60% at 50% 0%,#14304a,#06101a 70%);border:1px solid #7dd8ff66}
 #hs175 .hd,#fs175 .hd{display:flex;align-items:center;gap:10px;margin-bottom:8px}#hs175 .hd>i,#fs175 .hd>i{font-style:normal;font-size:22px;width:40px;height:40px;display:grid;place-items:center;border-radius:12px;background:#0006;border:1px solid #ffffff33}
 #hs175 .hd>div{flex:1}#hs175 .hd b,#fs175 .hd b{display:block;font-size:19px;color:#ffe0b0}#fs175 .hd b{color:#c8f0ff}#hs175 .hd small,#fs175 .hd small{font-size:11.5px;color:#c8b49a}#fs175 .hd small{color:#9ac0d8}
 #hs175 .home{font:inherit;font-weight:900;font-size:12.5px;padding:7px 12px;border-radius:10px;border:0;background:#3a2a1e;color:#ffe0b0;cursor:pointer}
 #hs175 .mn{flex:1;min-height:0;display:grid;grid-template-columns:1fr 300px;gap:12px}#hs175 .rv{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;min-height:0;padding:8px;border-radius:14px;background:#0a0806;border:1px solid #ffffff14}
 #hs175 canvas.room{max-width:100%;max-height:100%;width:auto;height:auto;image-rendering:pixelated;flex:1;min-height:0;object-fit:contain;cursor:pointer;aspect-ratio:auto}
 #hs175 .hint{font-size:11.5px;color:#c8b49a}#hs175 .hint b{color:#ffe79a;cursor:pointer;text-decoration:underline}
 #hs175 .sd{display:flex;flex-direction:column;gap:6px;min-height:0;overflow:auto}#hs175 .tabs,#fs175 .tabs{display:flex;gap:4px;flex-wrap:wrap}#hs175 .tabs button,#fs175 .tabs button{font:inherit;font-weight:900;font-size:12.5px;padding:7px 10px;border-radius:10px;border:1px solid #ffffff1c;background:#1e1610;color:#e0d0b8;cursor:pointer}
 #hs175 .tabs button.on{background:linear-gradient(180deg,#ffe0b0,#e8a060);color:#2a1206}#fs175 .tabs button{background:#0e2030;color:#c8e8f8}#fs175 .tabs button.on{background:linear-gradient(180deg,#c8f0ff,#5ab8e8);color:#04121a}
 #hs175 .cn{color:#c8b49a}#hs175 .fl{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:5px}#hs175 .fi{min-width:0;display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px;border-radius:10px;background:#1a120c;border:1px solid #ffffff12}#hs175 .fi.on{border-color:#ffe79a}
 #hs175 .fi canvas{height:34px;width:auto;max-width:100%;object-fit:contain;image-rendering:pixelated}#hs175 .fi b{font-size:11.5px}#hs175 .fi small{font-size:10px;color:#c8b49a}#hs175 .fi .ac{display:flex;gap:3px}#hs175 .fi button{font:inherit;font-size:10.5px;font-weight:900;padding:3px 8px;border-radius:7px;border:0;background:#3a2a1e;color:#ffe0b0;cursor:pointer}
 #hs175 .fi button[data-place]{background:linear-gradient(180deg,#a6f5c6,#3ad16a);color:#04120c}
 #hs175 h5,#fs175 h5{margin:6px 0 4px;font-size:12.5px;color:#ffe79a}#fs175 h5 small{font-weight:600;color:#9ac0d8;margin-left:4px}
 #hs175 .sw,#hs175 .sz{display:grid;grid-template-columns:1fr 1fr;gap:4px}#hs175 .sw button,#hs175 .sz button{font:inherit;font-weight:900;font-size:11.5px;padding:10px 4px;border-radius:9px;border:2px solid #0006;color:#fff;text-shadow:1px 1px 0 #000;cursor:pointer}
 #hs175 .sz button{grid-column:1/-1;background:#2a1e14}#hs175 .sw button.on,#hs175 .sz button.on{border-color:#ffe79a;box-shadow:0 0 10px #ffe79a88}#hs175 .sz button:disabled{opacity:.4;cursor:default}
 #hs175 .tip,#fs175 .tip{font-size:11.5px;line-height:1.6;color:#c8b49a;margin:4px 0}#fs175 .tip{color:#9ac0d8}#fs175 .tip b{color:#ffe79a}
 #hs175 .row,#fs175 .row{display:flex;gap:5px}#hs175 input{flex:1;min-width:0;font:inherit;font-size:13px;padding:7px 9px;border-radius:9px;border:1px solid #e8b07a66;background:#0c0806;color:#fff}
 #hs175 .go,#fs175 .go{font:inherit;font-weight:900;font-size:13px;padding:8px 12px;border-radius:10px;border:0;cursor:pointer;background:linear-gradient(180deg,#ffe0b0,#e8a060);color:#2a1206;box-shadow:0 0 0 2px #000}#hs175 .lk.on{background:linear-gradient(180deg,#ffb0c8,#ff5a8a);color:#fff}
 #hs175 .tr{display:grid;grid-template-columns:22px 1fr auto;gap:6px;align-items:center;width:100%;text-align:left;padding:6px 8px;margin-bottom:3px;border-radius:9px;border:1px solid #ffffff12;background:#1a120c;color:#eef0f6;font:inherit;cursor:pointer}
 #hs175 .tr span{font-size:11px;color:#c8b49a}#hs175 .bkl{display:flex;flex-direction:column;gap:4px}#hs175 .be{padding:6px 8px;border-radius:9px;background:#fff6dc;color:#2a1e10}#hs175 .be b{font-size:11.5px}#hs175 .be p{margin:2px 0;font-size:12.5px;color:#2a1e10}#hs175 .be small{font-size:10px;opacity:.6}
 #hs175 .em,#fs175 .em{text-align:center;padding:14px;color:#a8988a}#hs175 .msg,#fs175 .msg{min-height:16px;text-align:center;font-size:12.5px;color:#ffe79a;font-weight:800;margin-top:4px}
 #fs175 .bd{flex:1;min-height:0;overflow:auto;margin-top:6px}#fs175 .fsm{display:grid;grid-template-columns:1fr 260px;gap:12px;align-items:start}#fs175 canvas.pond{width:100%;image-rendering:pixelated;border-radius:12px;border:2px solid #000;cursor:pointer;touch-action:none}
 #fs175 .fc{display:flex;flex-direction:column;gap:8px}#fs175 .fc small{font-size:11.5px;color:#9ac0d8}#fs175 .fc small b{color:#ffe79a}#fs175 .go.big{font-size:17px;padding:14px;background:linear-gradient(180deg,#c8f0ff,#5ab8e8);color:#04121a}#fs175 .go.hot{background:linear-gradient(180deg,#ffe79a,#ff7a2a);color:#2a0e04;animation:fsP .3s ease-in-out infinite}
 @keyframes fsP{50%{transform:scale(1.04)}}#fs175 .rs{display:flex;gap:10px;align-items:center;padding:10px;border-radius:12px;background:#0e2030}#fs175 .rs.l{color:#ff9aaa;font-weight:900}#fs175 .fsr{width:72px;height:auto;image-rendering:pixelated}
 #fs175 .rs em{font-style:normal;font-size:10.5px;font-weight:900;color:#000;background:var(--c);border-radius:6px;padding:1px 7px}#fs175 .rs b{display:block;font-size:18px}#fs175 .rs span{font-size:12px;color:#c8e8f8}
 #fs175 .spots{display:flex;gap:4px}#fs175 .spots button{flex:1;font:inherit;font-weight:900;font-size:12px;padding:7px;border-radius:9px;border:1px solid #ffffff1c;background:#0e2030;color:#c8e8f8;cursor:pointer}#fs175 .spots button.on{background:#7dd8ff;color:#04121a}#fs175 .spots button:disabled{opacity:.45}
 #fs175 .lvb{font-size:12px;color:#c8e8f8}#fs175 .lvb b{color:#ffe79a}#fs175 .lvb button{font:inherit;font-weight:900;font-size:11px;padding:4px 8px;border-radius:7px;border:0;background:#1e3a50;color:#c8f0ff;cursor:pointer;margin-left:4px}
 #fs175 .dg{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:5px}#fs175 .di{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px;border-radius:10px;background:#0e1c28;border:1px solid color-mix(in srgb,var(--c) 50%,transparent)}
 #fs175 .di canvas{height:30px;width:auto;image-rendering:pixelated}#fs175 .di.no canvas{filter:brightness(0) opacity(.5)}#fs175 .di b{font-size:12px;color:var(--c)}#fs175 .di.no b{color:#5a6a78}#fs175 .di small{font-size:10px;color:#9ac0d8;text-align:center}
 #fs175 .kp{display:flex;flex-wrap:wrap;gap:4px}#fs175 .kp button{display:flex;flex-direction:column;padding:5px 8px;border-radius:9px;border:1px solid var(--c);background:#0e1c28;color:#eef0f6;font:inherit;cursor:pointer}#fs175 .kp b{font-size:11.5px}#fs175 .kp small{font-size:10px;color:#ffe79a}
 #fs175 .tr{display:grid;grid-template-columns:22px 1fr auto;gap:6px;padding:5px 8px;border-radius:9px;background:#0e1c28;margin-bottom:3px}#fs175 .tr span{color:#ffe79a;font-weight:900}
 #fsb175,#hsb175{position:fixed;right:14px;z-index:70;display:flex;flex-direction:column;align-items:center;gap:1px;width:58px;padding:7px 0;border-radius:14px;border:0;cursor:pointer;font:inherit;font-size:22px;color:#fff;box-shadow:0 0 0 2px #000,0 6px 16px #0008}
 #fsb175{bottom:150px;background:linear-gradient(180deg,#7dd8ff,#2a7ab0)}#hsb175{bottom:218px;background:linear-gradient(180deg,#ffd0a0,#c07a3a)}#fsb175 span,#hsb175 span{font-size:11px;font-weight:900}
 @media (max-width:760px){#hs175 .mn{grid-template-columns:1fr;grid-template-rows:minmax(160px,45%) 1fr}#fs175 .fsm{grid-template-columns:1fr}}
 html.lpL #hs175 .pn,html.lpL #fs175 .pn{padding:8px 10px}html.lpL #hs175 .hd small,html.lpL #fs175 .hd small{display:none}html.lpL #hs175 .mn{grid-template-columns:1fr 240px}`;document.head.appendChild(st);
 window.HF175={openHouse,closeHouse,openFish,closeFish,FUR,FISH,H,FS,drawRoom,visit,FV};
}catch(e){console.error('v175 house fish',e)}})();
