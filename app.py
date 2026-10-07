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

BEAT BLADE · MACHINA 계정 기능 (/api/...):
    가입·로그인하면 게임 진행 기록을 서버에 보관해서 다른 기기에서도 이어 할 수
    있습니다. 배포 방법은 game/서버_로그인_안내.md 를 보세요.
"""
import hashlib
import json
import os
import re
import secrets
import sqlite3
import threading
import time
from flask import Flask, request, jsonify, g, send_from_directory, render_template_string
from google.oauth2 import id_token as google_id_token
from google.auth.transport.requests import Request as GoogleRequest
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
# 저장 기록 하나가 아주 커도 요청 전체는 2MB를 넘지 못하게 막음
app.config['MAX_CONTENT_LENGTH'] = 2 * 1024 * 1024

# 게임 클라이언트와 공유하는 비밀 키. 반드시 아무 문자열로나 바꾸고,
# capsule_quest.py 안의 LEADERBOARD_SECRET 값도 똑같이 맞춰주세요.
# (완벽한 보안은 아니지만, 아무나 엉뚱한 값을 마구 등록하는 것을 막아줍니다.)
API_SECRET = os.environ.get('LEADERBOARD_SECRET', 'change-me-please')

# Render 등에서는 재배포시 로컬 디스크가 초기화될 수 있어, 영구 디스크를
# 연결했다면 그 경로를(DB_PATH 환경변수로) 지정해주세요. 기본은 앱 폴더.
DB_PATH = os.environ.get('DB_PATH', os.path.join(os.path.dirname(__file__), 'leaderboard.db'))

# DATABASE_URL(Postgres 주소)을 넣으면 SQLite 파일 대신 Postgres에 저장합니다.
# Render 무료 서버는 다시 켜질 때 파일이 지워지므로, 계정을 오래 보관하려면
# 무료 Postgres(Neon 등) 주소를 넣거나 유료 영구 디스크를 쓰세요.
DATABASE_URL = os.environ.get('DATABASE_URL', '').strip()
USE_PG = DATABASE_URL.startswith(('postgres://', 'postgresql://'))
if USE_PG:
    import psycopg
    from psycopg.rows import dict_row

# Public OAuth client ID, not a client secret.
GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID',
    '888860005488-v3a9bbau8kkuj7790q6hmhb4a4v07t4k.apps.googleusercontent.com').strip()
GOOGLE_ORIGINS = set(x.strip().rstrip('/') for x in os.environ.get(
    'GOOGLE_ALLOWED_ORIGINS', 'https://capsule-quest-leaderboard.onrender.com').split(',') if x.strip())

MAX_NAME_LEN = 12
MAX_TEXT_LEN = 40


class DB:
    """SQLite와 Postgres를 같은 방식으로 쓰기 위한 얇은 포장. SQL에는 ? 자리표시를 쓴다."""

    def __init__(self):
        if USE_PG:
            # Neon 같은 연결 공유(pooling) 주소에서도 문제없게 미리 준비된 쿼리는 쓰지 않음
            self.conn = psycopg.connect(DATABASE_URL, row_factory=dict_row, prepare_threshold=None)
        else:
            self.conn = sqlite3.connect(DB_PATH)
            self.conn.row_factory = sqlite3.Row

    def execute(self, sql, params=()):
        if USE_PG:
            sql = sql.replace('?', '%s')
        return self.conn.execute(sql, params)

    def commit(self):
        self.conn.commit()

    def rollback(self):
        self.conn.rollback()

    def close(self):
        self.conn.close()


def get_db():
    if 'db' not in g:
        g.db = DB()
    return g.db


@app.teardown_appcontext
def close_db(exception=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()


def init_db():
    db = DB()
    db.execute('''
        CREATE TABLE IF NOT EXISTS players (
            player_id   TEXT PRIMARY KEY,
            name        TEXT NOT NULL,
            job         INTEGER,
            level       INTEGER NOT NULL DEFAULT 1,
            wave        INTEGER NOT NULL DEFAULT 1,
            rebirths    INTEGER NOT NULL DEFAULT 0,
            coins       BIGINT NOT NULL DEFAULT 0,
            pet_name    TEXT,
            pet_tier    INTEGER,
            weapon_name TEXT,
            weapon_tier INTEGER,
            score       BIGINT NOT NULL DEFAULT 0,
            updated_at  DOUBLE PRECISION NOT NULL
        )
    ''')
    # ---- BEAT BLADE 계정 · 저장 기록 ----
    db.execute('''
        CREATE TABLE IF NOT EXISTS users (
            user_id     TEXT PRIMARY KEY,
            username    TEXT NOT NULL,
            name_key    TEXT NOT NULL UNIQUE,
            pw_hash     TEXT NOT NULL,
            created_at  DOUBLE PRECISION NOT NULL
        )
    ''')
    db.execute('''
        CREATE TABLE IF NOT EXISTS sessions (
            token_hash  TEXT PRIMARY KEY,
            user_id     TEXT NOT NULL,
            created_at  DOUBLE PRECISION NOT NULL,
            last_used   DOUBLE PRECISION NOT NULL
        )
    ''')
    db.execute('''
        CREATE TABLE IF NOT EXISTS saves (
            user_id     TEXT PRIMARY KEY,
            rev         INTEGER NOT NULL,
            data        TEXT NOT NULL,
            updated_at  DOUBLE PRECISION NOT NULL
        )
    ''')
    db.execute('''
        CREATE TABLE IF NOT EXISTS google_accounts (
            google_sub TEXT PRIMARY KEY,
            user_id TEXT NOT NULL UNIQUE,
            created_at DOUBLE PRECISION NOT NULL
        )
    ''')
    db.execute('''
        CREATE TABLE IF NOT EXISTS google_challenges (
            nonce_hash TEXT PRIMARY KEY,
            mode TEXT NOT NULL,
            user_id TEXT NOT NULL,
            session_hash TEXT NOT NULL,
            expires_at DOUBLE PRECISION NOT NULL
        )
    ''')
    db.execute('''
        CREATE TABLE IF NOT EXISTS rank_scores (
            user_id     TEXT PRIMARY KEY,
            username    TEXT NOT NULL,
            score       BIGINT NOT NULL DEFAULT 0,
            chapter     INTEGER NOT NULL DEFAULT 0,
            boss        TEXT,
            difficulty  TEXT,
            updated_at  DOUBLE PRECISION NOT NULL
        )
    ''')
    db.execute('''
        CREATE TABLE IF NOT EXISTS shop_entitlements (
            user_id TEXT NOT NULL,
            product_id TEXT NOT NULL,
            granted_at DOUBLE PRECISION NOT NULL,
            PRIMARY KEY (user_id, product_id)
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


SHOP_PRODUCTS = [
    {'id': 'boss_pack_01', 'kind': 'boss', 'name': '추가 보스팩',
     'description': '새로운 보스·전용 음악·스토리를 담을 예정이에요.',
     'status': 'coming_soon', 'price': None},
    {'id': 'skin_pack_01', 'kind': 'skin', 'name': '외형 스킨팩',
     'description': '캐릭터와 검의 외형을 꾸미는 상품이에요. 능력치는 바뀌지 않아요.',
     'status': 'coming_soon', 'price': None},
]


@app.route('/api/shop')
def shop_catalog():
    response = jsonify(ok=True, products=SHOP_PRODUCTS, checkout_enabled=False)
    response.headers['Cache-Control'] = 'no-store'
    return response


@app.route('/api/shop/owned')
def shop_owned():
    user = _current_user()
    if not user:
        return _bad('로그인 후 보유 상품을 확인할 수 있어요', 401)
    rows = get_db().execute(
        'SELECT product_id FROM shop_entitlements WHERE user_id = ?',
        (user['user_id'],)).fetchall()
    response = jsonify(ok=True, owned=[row['product_id'] for row in rows])
    response.headers['Cache-Control'] = 'no-store'
    return response


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


# =====================================================================
# BEAT BLADE · MACHINA 계정 (가입 · 로그인 · 진행 기록 저장)
# =====================================================================
# 게임 HTML은 파일로 열거나 다른 주소에서 열리므로, /api/ 아래는 어느 주소에서든
# 부를 수 있게 열어 둔다(CORS). 쿠키 대신 "Authorization: Bearer 토큰"을 쓴다.
USERNAME_RE = re.compile(r'^[0-9A-Za-z가-힣_]{2,16}$')
PW_MIN, PW_MAX = 6, 64
SESSION_DAYS = 180
MAX_SAVE_BYTES = 1024 * 1024

_fail_lock = threading.Lock()
_fails = {}


def _too_many(key, limit, window):
    """window초 안에 key로 이미 limit번 시도했는지 (로그인 실패·가입 횟수 제한)"""
    now = time.time()
    with _fail_lock:
        hits = [t for t in _fails.get(key, []) if now - t < window]
        if hits:
            _fails[key] = hits
        else:
            _fails.pop(key, None)
        return len(hits) >= limit


def _note(key):
    now = time.time()
    with _fail_lock:
        if len(_fails) > 20000:
            # 오래된 기록은 정리 (1시간 넘은 것)
            for k in [k for k, v in _fails.items() if not v or now - v[-1] > 3600]:
                del _fails[k]
        _fails.setdefault(key, []).append(now)


def _client_ip():
    fwd = request.headers.get('X-Forwarded-For', '')
    return (fwd.split(',')[0].strip() if fwd else request.remote_addr) or '?'


def _hash_token(token):
    return hashlib.sha256(token.encode()).hexdigest()


def _new_session(db, user_id):
    token = secrets.token_urlsafe(32)
    now = time.time()
    db.execute('INSERT INTO sessions (token_hash, user_id, created_at, last_used) VALUES (?, ?, ?, ?)',
               (_hash_token(token), user_id, now, now))
    return token


def _current_user():
    """Authorization 헤더의 토큰으로 사용자 찾기. 없거나 만료되면 None"""
    auth = request.headers.get('Authorization', '')
    if not auth.startswith('Bearer '):
        return None
    th = _hash_token(auth[7:].strip())
    db = get_db()
    row = db.execute('SELECT s.user_id, s.last_used, u.username FROM sessions s '
                     'JOIN users u ON u.user_id = s.user_id WHERE s.token_hash = ?', (th,)).fetchone()
    if not row:
        return None
    now = time.time()
    if now - row['last_used'] > SESSION_DAYS * 86400:
        db.execute('DELETE FROM sessions WHERE token_hash = ?', (th,))
        db.commit()
        return None
    if now - row['last_used'] > 86400:
        db.execute('UPDATE sessions SET last_used = ? WHERE token_hash = ?', (now, th))
        db.commit()
    return {'user_id': row['user_id'], 'username': row['username'], 'token_hash': th}


def _bad(msg, code=400):
    return jsonify(ok=False, error=msg), code


def _read_credentials():
    data = request.get_json(silent=True) or {}
    username = data.get('username') if isinstance(data.get('username'), str) else ''
    password = data.get('password') if isinstance(data.get('password'), str) else ''
    return username.strip(), password


@app.after_request
def _cors(resp):
    if request.path.startswith('/api/'):
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
        resp.headers['Access-Control-Max-Age'] = '86400'
    return resp


@app.errorhandler(413)
def _too_large(e):
    return jsonify(ok=False, error='기록이 너무 커요'), 413


@app.route('/api/register', methods=['POST'])
def api_register():
    ip = _client_ip()
    if _too_many('reg:' + ip, 10, 3600):
        return _bad('가입 시도가 너무 많아요. 잠시 뒤에 다시 해 주세요', 429)
    username, password = _read_credentials()
    if not USERNAME_RE.match(username):
        return _bad('아이디는 2~16자의 한글·영문·숫자·_ 만 쓸 수 있어요')
    if not (PW_MIN <= len(password) <= PW_MAX):
        return _bad(f'비밀번호는 {PW_MIN}~{PW_MAX}자로 해 주세요')
    db = get_db()
    name_key = username.lower()
    if db.execute('SELECT 1 FROM users WHERE name_key = ?', (name_key,)).fetchone():
        return _bad('이미 있는 아이디예요', 409)
    user_id = secrets.token_hex(12)
    try:
        db.execute('INSERT INTO users (user_id, username, name_key, pw_hash, created_at) VALUES (?, ?, ?, ?, ?)',
                   (user_id, username, name_key, generate_password_hash(password), time.time()))
        token = _new_session(db, user_id)
        db.commit()
    except Exception:
        # 같은 아이디가 거의 동시에 가입된 경우 (UNIQUE 위반)
        db.rollback()
        return _bad('이미 있는 아이디예요', 409)
    _note('reg:' + ip)
    return jsonify(ok=True, token=token, username=username)


@app.route('/api/login', methods=['POST'])
def api_login():
    ip = _client_ip()
    username, password = _read_credentials()
    key = 'login:' + ip + ':' + username.lower()
    # 주소(IP)별 + 아이디별로 따로 센다 (IP를 바꿔 가며 한 아이디를 노리는 경우도 막음)
    if _too_many(key, 8, 600) or _too_many('login:' + ip, 40, 600) or _too_many('user:' + username.lower(), 20, 600):
        return _bad('로그인 실패가 너무 많아요. 10분 뒤에 다시 해 주세요', 429)
    db = get_db()
    row = db.execute('SELECT user_id, username, pw_hash FROM users WHERE name_key = ?',
                     (username.lower(),)).fetchone()
    if not row or not check_password_hash(row['pw_hash'], password):
        _note(key)
        _note('login:' + ip)
        _note('user:' + username.lower())
        return _bad('아이디나 비밀번호가 맞지 않아요', 401)
    token = _new_session(db, row['user_id'])
    db.commit()
    return jsonify(ok=True, token=token, username=row['username'])


@app.route('/api/logout', methods=['POST'])
def api_logout():
    user = _current_user()
    if user:
        db = get_db()
        db.execute('DELETE FROM sessions WHERE token_hash = ?', (user['token_hash'],))
        db.commit()
    return jsonify(ok=True)


@app.route('/api/me')
def api_me():
    user = _current_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    linked = get_db().execute('SELECT 1 FROM google_accounts WHERE user_id = ?',
                              (user['user_id'],)).fetchone() is not None
    return jsonify(ok=True, username=user['username'], google_linked=linked)



@app.route('/api/ranking', methods=['GET'])
def api_ranking_get():
    limit = clamp_int(request.args.get('limit'), 1, 100, 20)
    db = get_db()
    rows = db.execute('SELECT username, score, chapter, boss, difficulty, updated_at '
                      'FROM rank_scores ORDER BY score DESC, updated_at ASC LIMIT ?', (limit,)).fetchall()
    result=[]
    for i,row in enumerate(rows):
        d=dict(row);d['rank']=i+1;result.append(d)
    user=_current_user(); mine=None
    if user:
        row=db.execute('SELECT score, chapter, boss, difficulty, updated_at FROM rank_scores WHERE user_id=?', (user['user_id'],)).fetchone()
        if row:
            mine=dict(row);mine['rank']=db.execute('SELECT COUNT(*) AS c FROM rank_scores WHERE score > ?', (row['score'],)).fetchone()['c']+1
    return jsonify(ok=True, players=result, mine=mine)

@app.route('/api/ranking', methods=['PUT'])
def api_ranking_put():
    user=_current_user()
    if not user:return _bad('로그인이 필요해요',401)
    body=request.get_json(silent=True) or {}
    score=clamp_int(body.get('score'),0,2**63-1,0)
    chapter=clamp_int(body.get('chapter'),0,99,0)
    boss=clamp_text(body.get('boss'),80)
    difficulty=clamp_text(body.get('difficulty'),16)
    db=get_db();now=time.time()
    row=db.execute('SELECT score FROM rank_scores WHERE user_id=?',(user['user_id'],)).fetchone()
    if row and score <= row['score']:
        rank=db.execute('SELECT COUNT(*) AS c FROM rank_scores WHERE score > ?', (row['score'],)).fetchone()['c']+1
        return jsonify(ok=True, improved=False, score=row['score'], rank=rank)
    if row:
        db.execute('UPDATE rank_scores SET username=?,score=?,chapter=?,boss=?,difficulty=?,updated_at=? WHERE user_id=?',
                   (user['username'],score,chapter,boss,difficulty,now,user['user_id']))
    else:
        db.execute('INSERT INTO rank_scores (user_id,username,score,chapter,boss,difficulty,updated_at) VALUES (?,?,?,?,?,?,?)',
                   (user['user_id'],user['username'],score,chapter,boss,difficulty,now))
    db.commit()
    rank=db.execute('SELECT COUNT(*) AS c FROM rank_scores WHERE score > ?', (score,)).fetchone()['c']+1
    return jsonify(ok=True, improved=True, score=score, rank=rank)

@app.route('/api/save', methods=['GET'])
def api_save_get():
    user = _current_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    row = get_db().execute('SELECT rev, data, updated_at FROM saves WHERE user_id = ?',
                           (user['user_id'],)).fetchone()
    if not row:
        return jsonify(ok=True, rev=0, data=None, updated_at=None)
    return jsonify(ok=True, rev=row['rev'], data=json.loads(row['data']), updated_at=row['updated_at'])


@app.route('/api/save', methods=['PUT'])
def api_save_put():
    """기록 올리기. base_rev가 서버의 지금 번호와 같을 때만 덮어쓴다. 다른 기기에서 먼저
    저장했으면 409로 알려서 게임이 어느 쪽을 쓸지 묻게 한다. force=true면 그냥 덮어쓴다."""
    user = _current_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    body = request.get_json(silent=True) or {}
    data = body.get('data')
    if not isinstance(data, dict):
        return _bad('기록 형식이 잘못됐어요')
    text = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
    if len(text.encode()) > MAX_SAVE_BYTES:
        return _bad('기록이 너무 커요', 413)
    base_rev = clamp_int(body.get('base_rev'), 0, 2**31 - 1, 0)
    force = body.get('force') is True
    db = get_db()
    now = time.time()
    row = db.execute('SELECT rev FROM saves WHERE user_id = ?', (user['user_id'],)).fetchone()
    cur = row['rev'] if row else 0
    if not force and base_rev != cur:
        return jsonify(ok=False, error='conflict', rev=cur), 409
    if row:
        # 그 사이 다른 요청이 먼저 바꿨으면 아무 줄도 바뀌지 않는다
        res = db.execute('UPDATE saves SET rev = ?, data = ?, updated_at = ? WHERE user_id = ? AND rev = ?',
                         (cur + 1, text, now, user['user_id'], cur))
    else:
        res = db.execute('INSERT INTO saves (user_id, rev, data, updated_at) VALUES (?, ?, ?, ?) '
                         'ON CONFLICT(user_id) DO NOTHING', (user['user_id'], 1, text, now))
    db.commit()
    if res.rowcount != 1:
        return jsonify(ok=False, error='conflict', rev=cur + 1), 409
    return jsonify(ok=True, rev=cur + 1, updated_at=now)



# Google sign-in uses verified ID tokens + one-use, session-bound nonces.
@app.route('/play')
@app.route('/play/')
def play():
    resp = send_from_directory(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'game'), 'BeatBlade-53.html')
    resp.headers['Cross-Origin-Opener-Policy'] = 'same-origin-allow-popups'
    resp.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    resp.headers['Cache-Control'] = 'no-cache'
    return resp


def _google_origin_ok():
    return request.is_json and request.headers.get('Origin', '') in GOOGLE_ORIGINS


@app.route('/api/google/challenge', methods=['POST'])
def google_challenge():
    if not _google_origin_ok():
        return _bad('등록된 게임 웹사이트에서 Google 로그인을 이용해 주세요', 403)
    if not GOOGLE_CLIENT_ID:
        return _bad('서버에 Google 클라이언트 ID가 설정되지 않았어요', 503)
    key = 'google:' + _client_ip()
    if _too_many(key, 60, 600):
        return _bad('시도가 너무 많아요. 잠시 후 다시 해 주세요', 429)
    _note(key)
    body = request.get_json(silent=True)
    if not isinstance(body, dict) or body.get('mode') not in ('login', 'link'):
        return _bad('요청 형식이 잘못됐어요')
    mode = body['mode']
    user = _current_user() if mode == 'link' else None
    if mode == 'link' and not user:
        return _bad('먼저 기존 아이디로 로그인해 주세요', 401)
    nonce = secrets.token_urlsafe(32)
    db = get_db()
    db.execute('DELETE FROM google_challenges WHERE expires_at < ?', (time.time(),))
    db.execute('INSERT INTO google_challenges (nonce_hash, mode, user_id, session_hash, expires_at) '
               'VALUES (?, ?, ?, ?, ?)', (_hash_token(nonce), mode,
                user['user_id'] if user else '', user['token_hash'] if user else '', time.time() + 600))
    db.commit()
    resp = jsonify(ok=True, nonce=nonce, client_id=GOOGLE_CLIENT_ID)
    resp.headers['Cache-Control'] = 'no-store'
    return resp


def _verify_google(credential):
    # Google library verifies signature, audience, expiry and issuer.
    return google_id_token.verify_oauth2_token(credential, GoogleRequest(), GOOGLE_CLIENT_ID)


@app.route('/api/google/login', methods=['POST'])
@app.route('/api/google/link', methods=['POST'])
def google_finish():
    if not _google_origin_ok():
        return _bad('등록된 게임 웹사이트에서 Google 로그인을 이용해 주세요', 403)
    mode = 'link' if request.path.endswith('/link') else 'login'
    user = _current_user() if mode == 'link' else None
    if mode == 'link' and not user:
        return _bad('먼저 기존 아이디로 로그인해 주세요', 401)
    body = request.get_json(silent=True)
    if not isinstance(body, dict):
        return _bad('요청 형식이 잘못됐어요')
    credential, nonce = body.get('credential'), body.get('nonce')
    if not isinstance(credential, str) or not 1 <= len(credential) <= 12000 or not isinstance(nonce, str) or not 20 <= len(nonce) <= 128:
        return _bad('Google 인증 정보가 없어요')
    db = get_db()
    challenge = db.execute('SELECT * FROM google_challenges WHERE nonce_hash = ?', (_hash_token(nonce),)).fetchone()
    if not challenge or challenge['expires_at'] < time.time() or challenge['mode'] != mode:
        return _bad('로그인 요청이 만료됐어요. 계정 창을 다시 열어 주세요', 401)
    if mode == 'link' and (challenge['user_id'] != user['user_id'] or challenge['session_hash'] != user['token_hash']):
        return _bad('계정이 바뀌었어요. 다시 연결해 주세요', 401)
    # Consume before validation: an invalid or replayed credential cannot reuse a nonce.
    deleted = db.execute('DELETE FROM google_challenges WHERE nonce_hash = ?', (_hash_token(nonce),))
    db.commit()
    if deleted.rowcount != 1:
        return _bad('이미 사용된 로그인 요청이에요', 401)
    try:
        info = _verify_google(credential)
    except ValueError:
        return _bad('Google 인증을 확인할 수 없어요. 계정 창을 다시 열어 주세요', 401)
    except Exception:
        app.logger.warning('Google token verification unavailable')
        return _bad('Google 인증 서버에 연결하지 못했어요. 다시 시도해 주세요', 503)
    sub = info.get('sub')
    if (not isinstance(sub, str) or not 1 <= len(sub) <= 255 or
        info.get('iss') not in ('accounts.google.com', 'https://accounts.google.com') or
        info.get('aud') != GOOGLE_CLIENT_ID or info.get('nonce') != nonce):
        return _bad('Google 인증 정보가 일치하지 않아요', 401)
    row = db.execute('SELECT g.user_id, u.username FROM google_accounts g JOIN users u '
                     'ON u.user_id = g.user_id WHERE g.google_sub = ?', (sub,)).fetchone()
    if mode == 'link':
        if row and row['user_id'] != user['user_id']:
            return _bad('이 Google 계정은 다른 게임 계정에 연결돼 있어요', 409)
        other = db.execute('SELECT google_sub FROM google_accounts WHERE user_id = ?', (user['user_id'],)).fetchone()
        if other and other['google_sub'] != sub:
            return _bad('이미 다른 Google 계정이 연결돼 있어요', 409)
        if not row:
            try:
                db.execute('INSERT INTO google_accounts (google_sub, user_id, created_at) VALUES (?, ?, ?)',
                           (sub, user['user_id'], time.time()))
                db.commit()
            except Exception:
                db.rollback()
                return _bad('연결 상태가 바뀌었어요. 계정 창을 다시 열어 주세요', 409)
        return jsonify(ok=True, google_linked=True, username=user['username'])
    if not row:
        uid = secrets.token_hex(12)
        name = 'G_' + uid[:12]
        try:
            # An unguessable unused password; no email/name-based automatic account linking.
            db.execute('INSERT INTO users (user_id, username, name_key, pw_hash, created_at) VALUES (?, ?, ?, ?, ?)',
                       (uid, name, name.lower(), generate_password_hash(secrets.token_urlsafe(48)), time.time()))
            db.execute('INSERT INTO google_accounts (google_sub, user_id, created_at) VALUES (?, ?, ?)',
                       (sub, uid, time.time()))
            db.commit()
            row = {'user_id': uid, 'username': name}
        except Exception:
            db.rollback()
            return _bad('계정 생성이 겹쳤어요. 계정 창을 다시 열고 로그인해 주세요', 409)
    token = _new_session(db, row['user_id'])
    db.commit()
    resp = jsonify(ok=True, token=token, username=row['username'], google_linked=True)
    resp.headers['Cache-Control'] = 'no-store'
    return resp



@app.route('/google-bridge')
def google_bridge():
    mode = request.args.get('mode', 'login') if request.args.get('mode') in ('login','link') else 'login'
    token = request.args.get('token', '') if mode == 'link' else ''
    # This page is hosted on the verified Render origin. It returns only the
    # short-lived game session result to the opener via postMessage.
    return render_template_string(r'''<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>BeatBlade Google 로그인</title>
<style>body{margin:0;background:#081217;color:#eaf6ef;font:16px system-ui,sans-serif;display:grid;place-items:center;min-height:100vh}.box{width:min(390px,calc(100% - 32px));padding:24px;border:2px solid #80e8b0;border-radius:16px;background:#12242c;text-align:center;box-shadow:0 10px 40px #0008}h2{margin:0 0 10px}.note{color:#b9d7c9;font-size:13px;line-height:1.5;margin:10px 0 18px}.err{color:#ffb2a8;margin-top:14px;font-size:13px}</style>
<div class="box"><h2>👤 BeatBlade Google 로그인</h2><div id="note" class="note">Google 버튼을 준비하는 중…</div><div id="g"></div><div id="err" class="err"></div></div>
<script src="https://accounts.google.com/gsi/client" async></script><script>
const mode={{mode|tojson}}, token={{token|tojson}}, base=location.origin;let nonce='';
const note=document.getElementById('note'),err=document.getElementById('err');
function fail(x){err.textContent=x;note.textContent='창을 닫고 게임에서 다시 시도해 주세요.'}
async function start(){try{
 const headers={'Content-Type':'application/json'};if(mode==='link')headers.Authorization='Bearer '+token;
 const r=await fetch(base+'/api/google/challenge',{method:'POST',headers,body:JSON.stringify({mode})});
 const j=await r.json();if(!r.ok||!j.nonce)throw Error(j.error||'로그인 요청을 만들지 못했어요');nonce=j.nonce;
 const wait=()=>{if(!window.google||!google.accounts){setTimeout(wait,80);return}google.accounts.id.initialize({client_id:j.client_id,nonce,auto_select:false,ux_mode:'popup',callback:finish});google.accounts.id.renderButton(document.getElementById('g'),{theme:'outline',size:'large',text:mode==='link'?'continue_with':'signin_with',locale:'ko',width:280});note.textContent=mode==='link'?'연결할 Google 계정을 선택해 주세요.':'로그인할 Google 계정을 선택해 주세요.'};wait();
 }catch(e){fail(e.message)}}
async function finish(response){try{note.textContent='인증 확인 중…';const h={'Content-Type':'application/json'};if(mode==='link')h.Authorization='Bearer '+token;const r=await fetch(base+'/api/google/'+mode,{method:'POST',headers:h,body:JSON.stringify({credential:response.credential,nonce})});const j=await r.json();if(!r.ok||!j.ok)throw Error(j.error||'Google 로그인에 실패했어요');window.opener?.postMessage({type:'beatblade-google-auth',ok:true,mode,token:j.token||'',username:j.username||'',google_linked:!!j.google_linked},'*');window.close();}catch(e){fail(e.message)}}start();
</script></html>''', mode=mode, token=token)

init_db()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port)
