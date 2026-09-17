"""
Capsule Quest - 랭킹(리더보드) 서버
==================================
아주 작은 Flask + SQLite 서버입니다. 각 플레이어의 "현재 진행 상황"을
player_id 기준으로 한 줄씩 저장하고(제출할 때마다 덮어씀), 전체를 점수
순으로 정렬해서 보여줍니다. 과거 최고기록이 아니라 "지금 다들 어디까지
왔는지"를 보여주는 실시간 현황판 개념입니다.

로컬에서 테스트:
    pip install flask
    python app.py
    (기본 포트 8000, http://127.0.0.1:8000/health 로 확인)

Render.com 배포:
    이 폴더를 GitHub 저장소에 올린 뒤 Render의 "New +" -> "Web Service"에서
    그 저장소를 선택하면 render.yaml 을 자동으로 읽어서 배포합니다.
    (같이 들어있는 README_서버배포.md 참고)
"""
import os
import sqlite3
import time
from flask import Flask, request, jsonify, g

app = Flask(__name__)

# 게임 클라이언트와 공유하는 비밀 키. 반드시 아무 문자열로나 바꾸고,
# capsule_quest.py 안의 LEADERBOARD_SECRET 값도 똑같이 맞춰주세요.
# (완벽한 보안은 아니지만, 아무나 엉뚱한 값을 마구 등록하는 것을 막아줍니다.)
API_SECRET = os.environ.get('LEADERBOARD_SECRET', 'change-me-please')

# Render 등에서는 재배포시 로컬 디스크가 초기화될 수 있어, 영구 디스크를
# 연결했다면 그 경로를(DB_PATH 환경변수로) 지정해주세요. 기본은 앱 폴더.
DB_PATH = os.environ.get('DB_PATH', os.path.join(os.path.dirname(__file__), 'leaderboard.db'))

MAX_NAME_LEN = 12
MAX_TEXT_LEN = 40


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row
    return g.db


@app.teardown_appcontext
def close_db(exception=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()


def init_db():
    db = sqlite3.connect(DB_PATH)
    db.execute('''
        CREATE TABLE IF NOT EXISTS players (
            player_id   TEXT PRIMARY KEY,
            name        TEXT NOT NULL,
            job         INTEGER,
            level       INTEGER NOT NULL DEFAULT 1,
            wave        INTEGER NOT NULL DEFAULT 1,
            rebirths    INTEGER NOT NULL DEFAULT 0,
            coins       INTEGER NOT NULL DEFAULT 0,
            pet_name    TEXT,
            pet_tier    INTEGER,
            weapon_name TEXT,
            weapon_tier INTEGER,
            score       INTEGER NOT NULL DEFAULT 0,
            updated_at  REAL NOT NULL
        )
    ''')
    db.commit()
    db.close()


def clamp_int(value, lo, hi, default=0):
    try:
        v = int(value)
    except (TypeError, ValueError):
        return default
    return max(lo, min(hi, v))


def clamp_text(value, max_len):
    if not isinstance(value, str):
        return ''
    return value.strip()[:max_len]


def compute_score(level, wave, rebirths):
    # 환생 > 모험 레벨 > 웨이브 순으로 우선순위를 두는 단순 합산 점수.
    # (레벨/웨이브가 각각 9999를 넘지 않는다고 가정하고 자리수를 나눔)
    return rebirths * 100_000_000 + level * 10_000 + wave


@app.route('/health')
def health():
    return jsonify(ok=True, time=time.time())


@app.route('/submit', methods=['POST'])
def submit():
    if request.headers.get('X-API-Key') != API_SECRET:
        return jsonify(ok=False, error='invalid api key'), 401

    data = request.get_json(silent=True) or {}
    player_id = clamp_text(data.get('player_id'), 64)
    if not player_id:
        return jsonify(ok=False, error='player_id required'), 400

    name = clamp_text(data.get('name'), MAX_NAME_LEN) or '이름없음'
    job = data.get('job')
    job = clamp_int(job, 0, 3, None) if job is not None else None
    level = clamp_int(data.get('level'), 1, 9999, 1)
    wave = clamp_int(data.get('wave'), 1, 9999, 1)
    rebirths = clamp_int(data.get('rebirths'), 0, 999, 0)
    coins = clamp_int(data.get('coins'), 0, 10**15, 0)
    pet_name = clamp_text(data.get('pet_name'), MAX_TEXT_LEN)
    pet_tier = clamp_int(data.get('pet_tier'), -1, 20, -1)
    weapon_name = clamp_text(data.get('weapon_name'), MAX_TEXT_LEN)
    weapon_tier = clamp_int(data.get('weapon_tier'), -1, 20, -1)
    score = compute_score(level, wave, rebirths)

    db = get_db()
    db.execute('''
        INSERT INTO players (player_id, name, job, level, wave, rebirths, coins,
                              pet_name, pet_tier, weapon_name, weapon_tier, score, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(player_id) DO UPDATE SET
            name=excluded.name, job=excluded.job, level=excluded.level, wave=excluded.wave,
            rebirths=excluded.rebirths, coins=excluded.coins, pet_name=excluded.pet_name,
            pet_tier=excluded.pet_tier, weapon_name=excluded.weapon_name,
            weapon_tier=excluded.weapon_tier, score=excluded.score, updated_at=excluded.updated_at
    ''', (player_id, name, job, level, wave, rebirths, coins, pet_name, pet_tier,
          weapon_name, weapon_tier, score, time.time()))
    db.commit()

    rank_row = db.execute('SELECT COUNT(*) AS c FROM players WHERE score > ?', (score,)).fetchone()
    rank = rank_row['c'] + 1
    return jsonify(ok=True, rank=rank)


@app.route('/leaderboard')
def leaderboard():
    limit = clamp_int(request.args.get('limit'), 1, 200, 100)
    db = get_db()
    rows = db.execute('''
        SELECT player_id, name, job, level, wave, rebirths, coins,
               pet_name, pet_tier, weapon_name, weapon_tier, score, updated_at
        FROM players ORDER BY score DESC, updated_at ASC LIMIT ?
    ''', (limit,)).fetchall()
    result = []
    for i, row in enumerate(rows):
        entry = dict(row)
        entry['rank'] = i + 1
        result.append(entry)
    return jsonify(ok=True, players=result, count=len(result))


init_db()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port)
