# 저장소 안내 (Claude용)

이 저장소에는 두 가지가 들어 있다.

| 경로 | 내용 |
|---|---|
| `app.py`, `render.yaml`, `Procfile`, `requirements.txt` | 서버 (Flask, Render 배포): Capsule Quest 리더보드(`/submit`, `/leaderboard`) + BEAT BLADE 계정·기록 저장(`/api/...`). 저장은 SQLite 파일, `DATABASE_URL`이 있으면 Postgres. 배포 안내는 `game/서버_로그인_안내.md` |
| `game/src/` | 게임 **원본 코드** (CSS 1개 + HTML 틀 + js 110개 조각). 수정은 여기서 한다. 파일 목록과 역할은 `game/src/README.md` |
| `game/BeatBlade-XX.html` | 빌드 결과물: 리듬 액션 게임 **BEAT BLADE · MACHINA**를 파일 하나로 합친 것. 사용자는 이 파일로 플레이·배포한다. **숫자가 가장 큰 파일이 최신**이다(지난 버전은 git 기록에 있다) |
| `game/BeatBlade_작업요약.md` | 사용자에게 보여 주는 버전별 작업 요약 (한국어). 새 버전을 낼 때마다 갱신 |
| `tools/game/` | 헤드리스 테스트·스크린샷 도구 |
| `game/app/` | 구글 플레이 앱용 아이콘(`icon-*.png`)·그래픽 이미지·스토어 스크린샷(`store/`). 서버가 `/app/<이름>.png`로 내보낸다. 출시 안내는 `game/구글플레이_출시_안내.md` |

사용자는 한국어로 소통한다. 답변·요약·코드 주석 모두 한국어로 쓴다. 전문 용어 대신 쉬운 말로 설명한다.

---

## 게임 구조 (BeatBlade HTML)

- 결과물은 약 2.5MB, `<script>` 하나에 1.6만 줄이다. 원본은 `game/src/js/`에 기능별 110개 파일로 나뉘어 있고, `tools/game/bundle.py`가 **번호 순서대로 이어 붙여 한 스크립트로** 만든다. 따로따로 `<script src>`로 불러오면 안 된다(함수 끌어올림이 깨진다).
- 버전이 올라갈 때마다 **기존 전역 함수를 감싸서 다시 대입**하는 방식으로 기능이 쌓였다.
  ```js
  {const _old=drawScene;drawScene=function(now){/*앞*/const r=_old.apply(this,arguments);/*뒤*/return r}}
  ```
  같은 함수가 여러 겹으로 감싸여 있으니, 원래 정의만 보지 말고 **마지막으로 감싼 곳까지** 확인한다(`grep -n "함수명=function"`).
- 함수가 어느 파일에 있는지 찾기: `grep -ln "함수명" game/src/js/*.js` (정의는 `function 함수명(`, 감싸기는 `함수명=function`)
- **수정 원칙**
  - 기존 기능의 버그·조정: 그 기능이 있는 파일을 직접 고친다.
  - 새 기능: 끝 번호 다음에 새 파일을 만든다 (예: `983-v44-새기능.js`). IIFE로 감싸고 `try{}catch`로 실패해도 게임이 죽지 않게 한다.
  - 파일 번호(실행 순서)는 바꾸지 않는다. 모든 js 파일은 줄바꿈으로 끝나야 한다(빌드가 검사한다).
- 좌표계: 게임 화면 480×300(`W`,`H`), 경기장 `AX=16,AY=34,AW=448,AH=250`. `ctx`는 고해상도 배율(`SS`)이 적용된 상태라 게임 좌표 그대로 그리면 된다.
- 그리기 도우미: `RA(x,y,w,h,색,알파)`는 **globalAlpha를 직접 덮어쓴다**(곱하지 않음). `pcirc`, `cRing`, `cStar`, `cPx`, `line(x0,y0,x1,y1,간격,fn)`, `fxRing`, `e2Glow`, `e2Bolt`. 효과음은 `sfx(주파수,길이,파형,볼륨,끝주파수)`.

### 보스 50명 번호 (테스트 도구의 boss 인덱스)
| 인덱스 | 챕터 | 전투 시작 함수 |
|---|---|---|
| 0–9 | 1 기계 | `startRush(i)` |
| 10–19 | 2 굶주림 | `startRush(i)` |
| 20–29 | 3 기원(ORIGIN) | `c3RushFight(i-20)` |
| 30–39 | 4 ECLIPSE | `s4RushFight(i-30)` |
| 40–49 | 5 ABYSS | `s5Fight(i-40,true,true)` |
| 50–59 | 6 ZENITH | `s6Fight(i-50)` (이야기는 `s6Go(k)`, 디자인 `985-*`, 패턴 `986-*`, 이야기·메뉴 `987-*`) |
| 60–69 | 7 REVERSE | `s7Fight(i-60)` (이야기는 `s7Go(k)`, 디자인 `991-*`(난이도별로 몸이 바뀜), 패턴 `992-*`, 이야기·메뉴 `993-*`, 로비·전당·이미지 `994-*`) |

### 주요 시스템과 진입점
- **보스 그리기 엔진 `MON`**: `monDraw(key,...)` → 디자인 함수 `MON.reg[key](A)`가 작은 그림판(`MON.S`)에 그림 → `monFinish`가 외곽선·음영 후 화면에 붙임. 키: `b0`~`b19`, `c_<art>`(3장), `c_s4_*`, `c_s5_*`. 디자인 도구 `A.R/C/E/L/P/ring/glow/spark/rise/win(패턴명)`.
  - 그림판 크기는 기본 60×52칸이다. 이보다 큰 보스는 v43의 `__V43BIG` 목록에서 80×70칸 그림판을 쓴다. **새 보스나 큰 장식을 추가하면 `tools/game/clip.js`로 잘림을 검사한다.**
  - 익스트림: `EXU[key]`(보스별 디테일 pre/post)와 `monFinish` 리마스터 패스. v43부터 난이도별 단계: 쉬움=기본, 보통=EXU.post, 어려움=EXU.pre+post+빛, 익스트림=전부.
- **공격 엔진 `NP`**: `NP({k:'orb'|'seg'|'rect'|'circ', t0,t1,t2,...})`, 예고(t0~t1) → 판정(t1~t2), 시간 단위는 박자. 그리기는 `NPK[k].tel/draw`. 구형 장판은 `G.zones` 등.
  - 패턴 목록은 `DECK[bi]`(1·2장), `C3BOSS[art].deck`(3장), `s4Deck(S4[k])`(4장), `S5[k].sig`(5장), `S6DECK[art]`(6장), `S7DECK[art]`(7장).
  - 난이도별 추가 공격은 `T5_SET[key]=[[보통],[어려움],[익스트림]]`(840)이 `buildPhrase` 때 덱에 섞는다. 6장은 `S6EXTRA`(988), 7장은 `S7EXTRA`(996). 7장 공격 도구는 `window.S7H`(992).
- **등장씬**: `entStart`/`entTick`(보스별 움직임 `ENT2[key]`), 연출층은 `drawCineOverlay`(v43에서 새로 만듦). 길이는 `G.cine.dur`.
- **이야기 흐름(1·2장)**: `startStory` → `enterCave` → 여정 카드(v43) → `playScene` → 동굴 → `startFight` → `fightEnd` → 결과 카드(`scPlay`+`cxResultCard`) → `enterVillage`. 4·5장은 `s4Go`/`s5Go`와 `scPlay` 장면.
- **메뉴**: `gmShow('main'|'story'|'rush'|'hall'|'set'|'help')`. 보스 러시 미리보기는 `rqDrawBoss`, 캐러셀은 `rfStage`.
- **난이도**: 전역 `diff`(`easy|normal|hard|extreme`), 변경은 `$('diffSel').value=v;updDiff()`.
- 메인 루프는 `frame()`이고, `mode`(`menu|scene|cave|village|boss|journey|case`)에 따라 그린다.

---

## 작업 순서

1. `game/src/`에서 수정한다(위 수정 원칙). 새 파일을 만들었다면 `game/src/README.md` 표에 한 줄 추가한다.
2. 빌드: `python3 tools/game/bundle.py game/BeatBlade-YY.html` (YY = 최신 번호 + 1, 문법 검사 포함). 확인 중에는 스크래치패드 같은 임시 경로로 빌드해도 된다.
3. 확인한다. 아래 도구에서 **필요한 것만** 골라 쓴다.
4. 이전 버전 HTML(`git rm game/BeatBlade-XX.html`)은 지우고 최신 하나만 남긴다. 지난 버전은 git 기록에 있다.
5. `game/BeatBlade_작업요약.md`에 새 버전 항목과 버전 기록을 추가한다.
6. 커밋하고 푸시한다. 커밋 메시지는 영어로, 변경 요약을 쓴다.
- 원본과 결과물이 어긋나지 않았는지 보려면: `python3 tools/game/bundle.py /tmp/x.html --same game/BeatBlade-XX.html` (동일하면 성공)

## 테스트 도구 (`tools/game/`, 저장소 루트에서 실행)

결과 이미지는 스크래치패드 같은 저장소 밖 경로에 저장한다. 시간은 대략적인 값이다.

| 명령 | 용도 | 시간 |
|---|---|---|
| `node tools/game/stress.js <html> <난이도> <초> <시작> <끝>` | 보스 자동 플레이, 오류·프레임 기록 (`ERR` 줄이 없으면 정상) | 보스당 초+0.5초 |
| `node tools/game/cmp.js <out.png> <난이도> 3,6,14 <html> [<html2>]` | 보스를 크게 그려 비교 (파일마다 한 줄) | ~20초 |
| `node tools/game/tiers.js <html> <out.png> 0,13,25` | 4개 난이도 외형 나란히 보기 | ~20초 |
| `node tools/game/bshot.js <html> <접두어> <난이도> 2,33 desk\|land\|port` | 전투 화면 스크린샷 (데스크톱/폰 가로/세로) | 보스당 ~7초 |
| `node tools/game/strip.js <html> <out.png> <보스> <난이도> <대기ms> 12 110` | 전투 연속 프레임 | ~15초 |
| `node tools/game/intro.js <html> <out.png> <보스> <난이도>` | 등장씬 연속 프레임 | ~10초 |
| `node tools/game/mshot.js <html> <접두어>` | 메뉴 6화면 × 3기기 스크린샷 + 오류 | ~40초 |
| `node tools/game/clip.js <html> <난이도>` | 보스 그림 잘림 검사 (전원, 모든 공격 자세) | **~10분** |
| `node tools/game/raf.js <html> desk` / `fnb.js <html> <난이도> <보스> 함수명,...` | 프레임 비용 측정 | ~20초 |
| `node tools/game/chbig.js <out.png> <html>` (`R='[0,5]'` 환경변수로 범위 지정) | 캐릭터 10명 확대 | ~10초 |

- **빠른 확인**: 바꾼 보스만 `cmp`/`strip`, 오류는 `stress.js <html> normal 6 <i> <i>`.
- **전체 검증**(여러 작업을 모은 뒤 한 번): 난이도 4개를 병렬로 `stress.js ... 12 0 49` → 약 11분. 그리고 `mshot`.
- 헤드리스 크로미움에는 이모지 글꼴이 없어 `☠` 같은 문자가 네모로 보인다. 실제 기기에서는 정상이다. 프레임 시간도 GPU가 없어 실제보다 느리게 나오므로 **v전후 비교용으로만** 쓴다.

## 주의할 점

- `game/src/foot.html`(`</script></body></html>`)과 `head.html`/`body.html`의 `<style>`·`<script>` 여닫는 태그는 빌드 틀이다. 함부로 바꾸지 않는다.
- v40~v43에서 덧붙인 코드는 `game/src/js/970-*`~`982-*`, v44는 `983-*`·`984-*`, v45(챕터 6)는 `985-*`~`987-*`, v46(챕터 6 난이도 전용 공격)은 `988-*`, v47(챕터 6 음악 · 로비 · 명예의 전당 · 이미지)은 `989-*`·`990-*`, v48(챕터 7)은 `991-*`~`994-*`, v49(챕터 7 음악)는 `995-*`, v50(챕터 7 난이도 전용 공격 · 공격 캐릭터 연출 · 챕터 6·7 체력바)은 `996-*`~`998-*`, v51(보스 공격 대개편)은 `999-*`·`9991-*`~`9993-*`, v52(살아 움직이는 보스 · 공격 맛 · 등장 · 체력)는 `9994-*`~`9998-*`, v53(로그인)은 `9999-*`, v54(ChatGPT 작업: 상점·공허 검사 스킨)는 `99991-*`·`99992-*`, v55(메뉴 단추 새 디자인)는 `99993-*`, v56(유료 스킨 3종 · 스킨 상점)은 `99991-*`·`99992-*`를 새로 쓴 것이고, v57(변이 스킨 · 새 검 · 승리 연출 · 로비 테마 · 세트 · 스킨 꾸미기)은 `99994-*`~`99997-*`, v58(결제)은 `99998-*`, v59(구글 플레이 앱 준비)는 `99999-*`, v61(현질 세트 궁극기·패리)은 `999991-*`, v63(첫 전투 가이드)은 `999992-*`, v65(UI 다듬기)는 `999993-*`, v66(폰 화면 맞춤)은 `999994-*`, v67(폰 전용 배치)은 `999995-*`, v70(대시 연출)은 `999996-*`, v71(탑 오르기)은 `999997-*`, v72(잡몹 디자인)는 `999998-*`, v76(폰 세로 큰 화면 · 가로 메뉴 · 기기별 배치 · 렉 줄이기)은 `999999-*`·`9999991-*`~`9999993-*`, v77(로그인부터 · ✕ 단추)은 `9999994-*` 파일이다. **999999 다음 파일은 일곱 자리(`9999991-`…)를 쓴다.** **99999 다음 파일은 여섯 자리(`999991-`…)를 쓴다.** **999 다음 파일은 네 자리 번호(`9991-`, `9992-`…)를 쓰고, 9999 다음은 다섯 자리(`99991-`, `99992-`…)를 쓴다** — 빌드는 파일 이름 글자순으로 이어 붙이므로 `999-` 뒤에 `9991-`, `9999-` 뒤에 `99991-`이 온다.
- 음악: `playSlot(n,delay,S)`가 반 박자마다 불린다(16분음표 2칸). 챕터 5는 `S.s5Mix27`, 챕터 6은 `S.s6Mix`, 챕터 7은 `S.s7Mix`로 자기 곡을 연주한다. 곡을 소리 파일로 뽑아 들어 보려면 `OfflineAudioContext`를 `audio`에 넣고 `playSlot`을 차례로 부른 뒤 렌더링한다.
- 소환 물체 `ACT`(999): 보스가 공격할 때 물건(거울·체스 말·드론…)을 꺼내 움직이게 한다. `ACT.put({spr,pos(b),t0,t2,s,...})`는 그림만, `ACT.hit({pos,r,t0,t1,t2,dmg})`는 판정만(그림 없음). 그림은 `ACT.pix(줄글,색표)` 또는 `ACT.spr(탄모양,크기)`. 위험물에 `hide:true`를 주면 판정만 남고 그림은 물체가 대신 그린다. 레이저('laser' 모양)는 999가 모든 챕터에서 묵직하게 그린다.
- 살아 움직이는 보스(9995): 보스 그림을 마지막에 띠로 잘라 부위별로 움직인다. 보스별 설정은 `RIG54[그림 열쇠]`(tail·wings·sway·fringe·pend·br·float). 공격 몸동작은 패턴의 몸 쓰는 곳(`CHAN`: head·hands·field·all)으로 정해진다. 새 보스를 만들면 `RIG54`에 한 줄 넣는다.
- 로그인 강제 · 이름(v77, 9999): 켜면 로그인 창(`gate`, 닫기 막힘 `locked()`), 서버 연결 실패 때만 「오프라인으로 하기」(`offline`). Google로 만든 `G_…` 계정은 `needName` → 「이름 정하기」 → 서버 `POST /api/account/name`(G_ 계정만, 2~10자, 겹치면 409, `rank_scores.username`도 바꿈). 로그인 이름이 `saveData.name`이 된다(`syncName`). 헤드리스 시험(`navigator.webdriver`)은 로그인 창을 건너뛰고, 시험하려면 `localStorage['bb-gate-test']=1`. 「닫기」 글자 단추는 9999994가 ✕ 단추로 바꾼다(새 창에 닫기 단추를 만들면 글자를 「닫기」로 두면 됨). 크기는 `--cxs`(폰 48px · 줄여 그리는 창은 `--uis`로 나눠 되돌림), 누르는 자리는 `::before`로 넓힘.
- 로그인(9999): 진행 기록 `saveData`를 서버에 올린다(`ACCT55`). 서버 쪽 기록 번호(rev)가 다르면 덮어쓰지 않고 묻는다. 새 저장 항목을 `saveData`에 넣으면 따로 할 일 없이 함께 올라간다. 서버 기본 주소는 9999의 `DEF_URL`. 서버 시험: `DB_PATH=/임시/t.db python3 app.py` 후 게임 로그인 창의 「서버 주소」를 `http://127.0.0.1:8000`으로.
- 다른 도구(ChatGPT 등)가 빌드 결과물 HTML만 고쳐 올린 경우: `diff`로 이전 빌드와 비교해 바뀐 줄을 `game/src`에 옮긴 뒤 다시 빌드한다. 결과물만 고치면 다음 빌드에서 사라진다. 결과물 크기가 갑자기 줄었으면(예: 3MB→1MB) 잘린 것이다.
- Google 로그인·랭킹·상점 서버 코드는 `app.py`(`/api/google/*`, `/google-bridge`, `/api/ranking`, `/api/shop*`, `/play`). 랭킹 점수 상한은 `MAX_RANK_SCORE`.
- 메뉴 위쪽 줄 단추 모양은 99993이 원래 글자(예: `🪙 5000`)를 읽어 다시 그린다. 위쪽 줄에 새 단추를 넣으면 99993의 `deco()`에 모양을 추가한다. 공통 단추 디자인(`.gmBtn`)도 99993의 CSS가 마지막에 덮어쓴다.
- 스킨(99992 `SKIN58`): 스킨 그림은 `CH2DEF[100+번호]`의 paint 함수(기본 캐릭터와 같은 도트 도구, `HV.view`로 앞·옆·뒤). 휘두르기 모션·이펙트는 `window.__skinMotion={arm,hand,lean,fx}`를 984가 읽는다. 새 스킨은 `SK` 목록과 `MOTION`에 한 줄씩, 서버 `SHOP_PRODUCTS`에 `skin_<id>`로 가격을 넣는다. 장착 저장은 v58(99998)이 보유한 것만 한다.
- 유료 꾸미기 목록(v57): 변이 스킨·펫 `SKIN58.list`(variant)·`PET59`(99994), 새 검 `SWORD59`(99995), 승리 연출 `VIC59`·로비 테마 `LOB59`(99996), 스킨별 칼날·마법진·폭발 `DELUXE60`(99997), 세트는 99991의 `SETS`. 상점은 이 목록을 그대로 읽어 카드로 만든다. **상품을 더하거나 값을 바꾸면 `app.py`의 `SHOP_PRODUCTS`(상품 번호 `skin_/pet_/sword_/fx_/set_`)도 같이 고친다.** 
- 결제(v58, 99998 `PAY58` + `app.py`의 `/api/shop/order`·`/pay/checkout`·`/pay/success`·`/pay/fail`): 토스페이먼츠 결제창. 키는 Render 환경변수 `TOSS_CLIENT_KEY`/`TOSS_SECRET_KEY`(비우면 문서 공개 테스트 키 → 테스트 결제). 상품은 서버가 토스 승인을 받은 뒤에만 준다(금액은 서버 값만 씀). 보유 = `shop_entitlements` + 결제 완료 주문(`shop_orders`, 테스트 주문은 테스트 키일 때만). 보유 상품의 장착은 `saveData.cos58`에 저장. 보유한 새 검은 `WEAPONS` 칸 읽기를 가로채 능력치를 적용한다(태엽 공방이 열려 있으면 원래 검). 서버 시험은 `_toss_confirm`을 가짜 함수로 바꿔서 한다. 안내는 `game/서버_로그인_안내.md` 아래쪽.
- 구글 플레이 앱(v59): TWA(웹 화면을 감싼 앱). 서버 `app.py`에 `/manifest.webmanifest`(시작 주소 `/play?source=app`), `/sw.js`(게임 파일 저장 후 뒤에서 새로 받기, `/api`·`/pay`는 저장 안 함), `/app/*.png`, `/.well-known/assetlinks.json`(환경변수 `TWA_PACKAGE`·`TWA_SHA256`), `/privacy`, `/delete-account`, `POST /api/account/delete`. 게임은 99999가 앱 모드(`window.BB_APP`)면 구매를 숨긴다. 서비스 워커 캐시 이름(`bb-app-v1`)을 바꾸면 옛 캐시가 지워진다.
- 무료 출시 모드(v60): Render 환경변수 `SHOP_MODE=free` → `/api/shop`의 `free_mode`가 켜지고 주문·결제창이 403. 게임은 99999가 그 값을 읽어 `window.BB_FREE`로 「✦ 스킨 · 무기 · 연출」 탭 자체를 숨긴다(99991 `mount`, 마지막 값은 `localStorage['bb-free60']`).
- 입어보기 없음(v60): 유료 상품은 사야만 장착할 수 있다. 상점은 미리보기 무대만 보여 주고, 보유한 상품에만 「장착하기」가 있다. 99998 `apply`가 보유하지 않은 장착을 벗긴다.
- 테스터(v62): Render 환경변수 `TESTER_USERS`(아이디 또는 이메일 쉼표 목록, 대소문자 무시. 이메일은 Google 로그인·연결 때 확인한 이메일과 맞으면 `tester_links`에 이메일 해시만 저장) → 그 계정의 `/api/shop/owned`는 모든 상품 + `tester:true`. 게임은 `PAY58.tester()`면 무료 모드여도 상점 탭을 보여 준다(99999 `APP59.reFree`).
- 현질 세트(v61, 999991 `SET61`): 세트 = 공허(void/voidreaver)·태엽(clock/gearsaber)·네온(neon/beatbreaker). 궁극기는 `G.sp.type='p61'`로 따로 그리고(검이 먼저, 없으면 스킨), 패리는 `__parryPose`(984)·방패·성공 이펙트를 세트별로(스킨이 먼저). 99997 `theme()`는 스킨이 없으면 현질 검의 세트 테마를 쓴다. 현질 검 궁극기 피해는 「시간의 검」 칸으로 계산한다.
- 첫 전투 가이드(v63, 999992 `GUIDE63`): 단계 목록 `STEPS`(이동·대시·공격·패링·그로기·반격·궁극기), 진행 `saveData.tut63={i,done}`. 카드는 HTML(`#tut63`, z-index 9000)로 `#game` 캔버스 왼쪽 위에 붙인다. 가이드 중 `hurtP` 피해 절반. 조작 이름을 바꾸면 `STEPS`의 `keys`(KB_ACT id)도 맞춘다.
- UI 다듬기(v65, 999993 `UI65`): 화면 모양은 이 파일의 CSS가 마지막에 덮어쓴다(`html body .gmBtn`, `#gmSet`, `#bbShop`). 스킨 상점 카드에는 `data-tier`(변이·희귀·영웅·전설·세트), 무대에는 `--tc`(상품 색)가 붙어 있어 CSS가 등급별로 꾸민다. 소리 단추는 글자에 OFF가 있으면 `ui65off` 스위치 모양.
- 폰 화면 맞춤(v66, 999994 `FIT66`): `<html>`에 `uiFit`(배율 적용)·`uiLand`(높이 600 미만 가로)·`uiPort`(폭 560 미만 세로) 클래스와 배율 `--uis`를 붙인다. 메뉴 화면(로비 제외)·`#bbShop`·`#shopModal`·`#acctBox`·`#tut63`은 `zoom`으로 줄인다. zoom이 걸린 요소의 `left/top`을 계산할 때는 배율로 나눈다(999992 `place`). 로비 무대 위치는 720 `lvDraw`가 정한다. 시작 단추(`.gmBtn.go`)는 999993이 밝은 초록으로 다시 칠한다.
- 폰 전용 배치(v67, 999995 `PH67`): 폰(손가락 화면이고 짧은 쪽 620 이하, 또는 짧은 쪽 500 이하)이면 `<html>`에 `ph`+`phL`/`phP`. 컴퓨터 배치는 그대로 두고 폰만 따로 짠다. 로비는 `#lvSet`을 숨기고 `#phNav`·`#phPlay`(누르면 `GM.sel` 바꾸고 `lvGo`)를 쓴다. 단추 위 작은 글자는 숨긴 `#lvSet`의 `em`을 옮겨 온다. 로비 메뉴 항목을 바꾸면 999995의 `NAV`도 맞춘다. 로비(`#gameMenu.lvOn`)의 메뉴 칸은 `pointer-events:none`이라, 로비에 새 단추를 넣으면 `pointer-events:auto`를 직접 줘야 눌린다.
- 대시 연출(v70, 999996 `DASH70`): 잔상은 `drawKnight`를 작은 캔버스에 그려 색을 입힌 그림(스킨·방향·색별로 기억). 스킨별 모양은 `ST[kind]`(kind는 99997 `DELUXE60.theme()`의 kind). 새 스킨을 만들면 99997 `TH`와 999996 `ST`에 한 줄씩. 전투에서는 190의 캐릭터 그리기 첫머리에서 `DASH70.tick(now)`, 동굴·마을은 `drawKnight` 감싸기에서 부른다.
- 탑 오르기(v71, 999997 `TW71`): **이야기 모드는 메뉴에서 빠졌다**(로비 0번 = 탑, `gmShow('story')`는 탑 화면으로). 잡몹 층은 `mode='tower'`로 999997이 직접 돌림(조작은 `doAttack`/`doDash`/`tryParry`/`tryUlt` 감싸기, 캐릭터는 잠깐 `mode='village'`로 바꿔 그려 스킨·옆모습이 그대로 나옴). 터치 단추를 숨기는 370의 목록에 `tower`가 들어 있다. 보스 층은 `bossStart(g)`(시작 전에 `grant(g-1)`로 앞 챕터 진행을 채워 챕터 5처럼 잠긴 전투도 열림), 끝나면 `fightEnd` 감싸기가 결과창 단추를 「▲ 다음 층」으로 바꾼다. 잡몹 종류를 더하려면 999997 `SP`(이름 · 체력 · 크기)와 `updMob`의 움직임, 999998에 `MON.reg['m_종류']` 디자인(앞·옆·뒤 · 걷기 · 준비 · 공격 순간)을 한 칸씩. 공격하는 순간은 `m.hitPose=T.clk`로 표시한다. 정예 꾸밈은 999998의 `EL[종류]`, 정예 이름은 999997 `ELN`. v75: 잡몹은 큐(`T.queue`)에서 하나씩 소환(`spawnOne`, 동시에 `T.cap`마리까지), 체력은 층 배율 `TF(f)`·난이도 `hpMul`, 피해는 `dmgMul`(공격 속도는 난이도와 무관). 보스 체력도 `drawScene` 감싸기에서 `HP54.WANT(0)*TF(f)`로 맞춘다. 잡몹 색은 종류별 `SPC`(+구역 색 조금, `mpal`), 난이도 단계 꾸밈은 999998 `tierDeco`(`A.o.tier`). 궁극기는 보스전 것(`PLAN`·`SET61.ULT`, 그림은 `drawSpecialFX`를 가짜 `G`로)을 그대로 쓴다. 대시는 보스전처럼 `P.stam`을 쓴다. v74: 앞 구역 잡몹이 다시 섞여 나온다(`vetsOf(z,k)`: 구역 1부터 층마다 1종, 구역 3부터 2종). v73: 탑 HUD는 보스전 HUD(`drawPlayerHUD`·`drawUltGauge`)를 `G`를 잠깐 바꿔서 그대로 쓴다. 탑 화면은 구역마다 캔버스 하나(`TV.zc`, 보일 때만 그림)로 700층을 스크롤하고, 올라가 본 층(`best`까지)을 골라 시작한다. 잡몹 그림은 자세별로 미리 그려 두므로(`mobFrame`, 층에 들어갈 때 `prewarm`) 디자인을 바꾸면 그대로 반영된다.
- 모바일 궁극기 단추(v76): `#btnU`는 320 `ensureUltBtn`이 만들고 `ultBtnPaint(비율,쓸수있나)`가 금색 채움 · %를 칠한다. 보스전은 320 `drawSpecialHUD`, 탑은 999997 update 끝에서 늘 보이게.
- 폰 세로 전투(v76, 999999 `PV76`): `phP` + 전투 중이면 `html.pv76`. 원래 캔버스 `#game`은 그대로 그려지고 안 보일 뿐이며, `frame` 감싸기에서 `#pvView`(확대) · `#pvTop` · `#pvBot` · `#pvMini`로 옮겨 그린다. 화면 크기는 `fitBattle` 감싸기의 `layout()`. 정보 칸 위치(위 0~50, 아래 H-62~H)를 바꾸면 `paint()`의 덮기 범위도 맞춘다.
- 기기 구분(v76, 9999992 `DV76`): `dvPhone`(=ph) · `dvPad`(손가락만 · 폰보다 큼) · `dvLap`(마우스 · 폭 1600 이하 또는 높이 900 이하) · `dvDesk`. 기기별 CSS는 이 파일에 모은다. 폰 가로 메뉴 한 화면은 9999991.
- 탑 BGM · 타격감(v76, 999997): 구역마다 `makeSong(z%20)`을 `music()`으로(구역 바뀔 때만 다시), 맞힐 때 `T.stop`(히트스톱) · `perc` 소리 · `T.hfx` 효과 · `m.kbA` 밀림. 로비 LED 0번은 `TW71.led`(탑 그림). **층마다 `T.clk`가 0이 되므로, `T.clk`로 시각을 적어 두는 새 값은 `buildFloor`에서 지워야 한다**(v79: `T.punch`가 남아 화면이 크게 확대됐었음).
- 렉(v76): 820 `ch2Render`는 같은 캐릭터 · 자세 · 1/12초 그림을 `CH2C`에 저장해 다시 쓴다(`CH2.pose`나 휘두르는 중이면 저장 안 함). 실제 그리기는 `ch2Render0`. 스킨 상점 목록 카드는 99991 `loop`에서 보이는 것만 120ms마다.
- 보스 체력은 9994가 마지막에 맞춘다(`HP54.WANT(전체 번호)`). 챕터별 체력 공식을 바꿔도 9994의 `CUR` 표를 함께 고쳐야 한다.
- 1~5장 난이도별 추가 공격은 840·870의 공통 16틀을 9993이 보스 전용 4개로 덮어쓴다(`T5_SET[key]=[[보통],[어려움],[익스트림…]]`).
- 보스 체력바: 350의 `BB_TH[키]` 테마(back/shape/tex/front)를 `C3BOSS[art].th=키`로 연결하면 그 보스 전투에서 쓰인다. 챕터 6·7은 998.
- 전투 화면 확대(190 `drawScene` 첫머리, 등장 · 쓰러짐 · `hdCam`)는 v78부터 `G._zc`(중심 x·y · 정도 z)로 부드럽게 따라간다. 등장 확대 정도만 그대로 쓴다.
- `drawScene` 안에서 `G.boss.x/y`를 잠깐 옮기는 패치(v43 보스 몸 동작)가 있다. 판정 계산에는 영향을 주지 않는다.
- 이야기 흐름 함수(`showOverlay`, `enterCave`, `fightEnd`)는 여러 버전이 감싸고 있다. 결과창 문구(`'BOSS DOWN'`, `'계속 →'`)를 조건으로 쓰는 패치가 있으니 문구를 바꿀 때 함께 확인한다.
- 남은 확인 거리는 `game/BeatBlade_작업요약.md` 맨 아래에 있다.
