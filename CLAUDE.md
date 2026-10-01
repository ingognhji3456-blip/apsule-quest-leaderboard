# 저장소 안내 (Claude용)

이 저장소에는 두 가지가 들어 있다.

| 경로 | 내용 |
|---|---|
| `app.py`, `render.yaml`, `Procfile`, `requirements.txt` | Capsule Quest 리더보드 서버 (Flask + SQLite, Render 배포) |
| `game/src/` | 게임 **원본 코드** (CSS 1개 + HTML 틀 + js 110개 조각). 수정은 여기서 한다. 파일 목록과 역할은 `game/src/README.md` |
| `game/BeatBlade-XX.html` | 빌드 결과물: 리듬 액션 게임 **BEAT BLADE · MACHINA**를 파일 하나로 합친 것. 사용자는 이 파일로 플레이·배포한다. **숫자가 가장 큰 파일이 최신**이다(지난 버전은 git 기록에 있다) |
| `game/BeatBlade_작업요약.md` | 사용자에게 보여 주는 버전별 작업 요약 (한국어). 새 버전을 낼 때마다 갱신 |
| `tools/game/` | 헤드리스 테스트·스크린샷 도구 |

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

### 주요 시스템과 진입점
- **보스 그리기 엔진 `MON`**: `monDraw(key,...)` → 디자인 함수 `MON.reg[key](A)`가 작은 그림판(`MON.S`)에 그림 → `monFinish`가 외곽선·음영 후 화면에 붙임. 키: `b0`~`b19`, `c_<art>`(3장), `c_s4_*`, `c_s5_*`. 디자인 도구 `A.R/C/E/L/P/ring/glow/spark/rise/win(패턴명)`.
  - 그림판 크기는 기본 60×52칸이다. 이보다 큰 보스는 v43의 `__V43BIG` 목록에서 80×70칸 그림판을 쓴다. **새 보스나 큰 장식을 추가하면 `tools/game/clip.js`로 잘림을 검사한다.**
  - 익스트림: `EXU[key]`(보스별 디테일 pre/post)와 `monFinish` 리마스터 패스. v43부터 난이도별 단계: 쉬움=기본, 보통=EXU.post, 어려움=EXU.pre+post+빛, 익스트림=전부.
- **공격 엔진 `NP`**: `NP({k:'orb'|'seg'|'rect'|'circ', t0,t1,t2,...})`, 예고(t0~t1) → 판정(t1~t2), 시간 단위는 박자. 그리기는 `NPK[k].tel/draw`. 구형 장판은 `G.zones` 등.
  - 패턴 목록은 `DECK[bi]`(1·2장), `C3BOSS[art].deck`(3장), `s4Deck(S4[k])`(4장), `S5[k].sig`(5장).
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
- v40~v43에서 덧붙인 코드는 `game/src/js/970-*`~`982-*`, v44는 `983-*`·`984-*`, v45(챕터 6)는 `985-*`~`987-*` 파일이다.
- `drawScene` 안에서 `G.boss.x/y`를 잠깐 옮기는 패치(v43 보스 몸 동작)가 있다. 판정 계산에는 영향을 주지 않는다.
- 이야기 흐름 함수(`showOverlay`, `enterCave`, `fightEnd`)는 여러 버전이 감싸고 있다. 결과창 문구(`'BOSS DOWN'`, `'계속 →'`)를 조건으로 쓰는 패치가 있으니 문구를 바꿀 때 함께 확인한다.
- 남은 확인 거리는 `game/BeatBlade_작업요약.md` 맨 아래에 있다.
