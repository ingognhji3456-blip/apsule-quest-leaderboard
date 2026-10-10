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
import base64
import hashlib
import json
import os
import re
import secrets
import sqlite3
import threading
import time
import urllib.error
import urllib.request
from flask import Flask, request, jsonify, g, send_from_directory, render_template_string
from google.oauth2 import id_token as google_id_token
from google.auth.transport.requests import Request as GoogleRequest
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__)
# Render는 앞단 프록시가 https를 처리하므로, 결제 후 돌아올 주소가 https가 되도록 원래 주소 정보를 믿는다
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1)
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
    # 테스터 표시: Google 로그인 때 확인한 이메일이 TESTER_USERS 에 있으면 남긴다(이메일 대신 해시만 저장)
    db.execute('''
        CREATE TABLE IF NOT EXISTS tester_links (
            user_id    TEXT PRIMARY KEY,
            email_hash TEXT NOT NULL,
            created_at DOUBLE PRECISION NOT NULL
        )
    ''')
    # 결제 주문 (토스페이먼츠). test=1 은 테스트 키로 낸 주문 — 진짜 키로 바꾸면 보관함에서 빠진다
    db.execute('''
        CREATE TABLE IF NOT EXISTS shop_orders (
            order_id    TEXT PRIMARY KEY,
            user_id     TEXT NOT NULL,
            product_id  TEXT NOT NULL,
            amount      INTEGER NOT NULL,
            status      TEXT NOT NULL,
            test        INTEGER NOT NULL,
            payment_key TEXT,
            method      TEXT,
            created_at  DOUBLE PRECISION NOT NULL,
            paid_at     DOUBLE PRECISION
        )
    ''')
    # v102: 랭킹에 보여 줄 장착 모습(캐릭터 · 무기 · 펫 · 스킨). 계정마다 한 줄, JSON 글
    db.execute('''
        CREATE TABLE IF NOT EXISTS player_look (
            user_id     TEXT PRIMARY KEY,
            look        TEXT NOT NULL,
            updated_at  DOUBLE PRECISION NOT NULL
        )
    ''')
    # v83: 레벨 · 골드 · 탑 층 (랭킹 탭용). 계정마다 한 줄
    db.execute('''
        CREATE TABLE IF NOT EXISTS player_stats (
            user_id     TEXT PRIMARY KEY,
            level       INTEGER NOT NULL DEFAULT 1,
            xp          BIGINT NOT NULL DEFAULT 0,
            gold        BIGINT NOT NULL DEFAULT 0,
            floor       INTEGER NOT NULL DEFAULT 1,
            updated_at  DOUBLE PRECISION NOT NULL
        )
    ''')
    # v92 PvP 결투: 골드 주고받기 장부(게임이 받아 가면 지움) · 전적
    db.execute('''
        CREATE TABLE IF NOT EXISTS pvp_ledger (
            id          TEXT PRIMARY KEY,
            user_id     TEXT NOT NULL,
            delta       BIGINT NOT NULL,
            note        TEXT,
            created_at  DOUBLE PRECISION NOT NULL
        )
    ''')
    # v94 결투 등급 · 시즌(한 달 = 한 시즌, 'YYYY-MM') · 시즌 보상
    db.execute('''
        CREATE TABLE IF NOT EXISTS pvp_rank (
            user_id     TEXT NOT NULL,
            season      TEXT NOT NULL,
            rating      INTEGER NOT NULL DEFAULT 1000,
            best        INTEGER NOT NULL DEFAULT 1000,
            wins        INTEGER NOT NULL DEFAULT 0,
            losses      INTEGER NOT NULL DEFAULT 0,
            updated_at  DOUBLE PRECISION NOT NULL,
            PRIMARY KEY (user_id, season)
        )
    ''')
    db.execute('''
        CREATE TABLE IF NOT EXISTS pvp_rewards (
            id          TEXT PRIMARY KEY,
            user_id     TEXT NOT NULL,
            season      TEXT NOT NULL,
            tier        TEXT NOT NULL,
            dia         BIGINT NOT NULL DEFAULT 0,
            gold        BIGINT NOT NULL DEFAULT 0,
            claimed     INTEGER NOT NULL DEFAULT 0,
            created_at  DOUBLE PRECISION NOT NULL
        )
    ''')
    # v94 친구: 신청은 (보낸 사람 → 받는 사람, pending), 수락하면 양쪽으로 accepted 두 줄
    db.execute('''
        CREATE TABLE IF NOT EXISTS friends (
            user_id     TEXT NOT NULL,
            friend_id   TEXT NOT NULL,
            status      TEXT NOT NULL,
            created_at  DOUBLE PRECISION NOT NULL,
            PRIMARY KEY (user_id, friend_id)
        )
    ''')
    db.execute('''
        CREATE TABLE IF NOT EXISTS pvp_stats (
            user_id     TEXT PRIMARY KEY,
            wins        INTEGER NOT NULL DEFAULT 0,
            losses      INTEGER NOT NULL DEFAULT 0,
            gold_won    BIGINT NOT NULL DEFAULT 0,
            updated_at  DOUBLE PRECISION NOT NULL
        )
    ''')
    # v103 마지막 접속 시각(친구 목록 「n분 전 접속」 · 친구 추천에 씀)
    db.execute('''
        CREATE TABLE IF NOT EXISTS user_seen (
            user_id     TEXT PRIMARY KEY,
            seen_at     DOUBLE PRECISION NOT NULL
        )
    ''')
    # v103 채팅: room = 'world'(서버 전체) 또는 'dm:<아이디1>|<아이디2>'(친구끼리, 아이디 글자순)
    db.execute('''
        CREATE TABLE IF NOT EXISTS chat_msgs (
            id          BIGINT PRIMARY KEY,
            room        TEXT NOT NULL,
            user_id     TEXT NOT NULL,
            username    TEXT NOT NULL,
            text        TEXT NOT NULL,
            created_at  DOUBLE PRECISION NOT NULL
        )
    ''')
    db.execute('CREATE INDEX IF NOT EXISTS chat_room_id ON chat_msgs (room, id)')
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


# 가격은 원(KRW). 결제가 열리기 전까지 status는 coming_soon (checkout_enabled=False)
SHOP_PRODUCTS = [
    # 게임 상점(99991)과 같은 목록. 값은 서버 것만 믿는다(게임이 보낸 금액은 쓰지 않음).
    {'id': 'skin_void', 'kind': 'skin', 'name': '공허 검사', 'tier': '희귀',
     'description': '빛을 삼킨 갑옷에 청록 눈빛. 찢어진 망토 끝에서 공허 조각이 피어올라요.',
     'status': 'on_sale', 'price': 2000, 'currency': 'KRW'},
    {'id': 'skin_clock', 'kind': 'skin', 'name': '태엽 성기사', 'tier': '영웅',
     'description': '시계골 장인이 만든 상아·황동 갑옷. 등 뒤 톱니 후광이 돌고, 가슴 시계가 박자에 맞춰 가요.',
     'status': 'on_sale', 'price': 3500, 'currency': 'KRW'},
    {'id': 'skin_neon', 'kind': 'skin', 'name': '네온 비트', 'tier': '전설',
     'description': '음악이 곧 갑옷. 재킷 네온과 바이저 이퀄라이저가 박자마다 번쩍이고, 홀로그램 목도리가 흩날려요.',
     'status': 'on_sale', 'price': 5000, 'currency': 'KRW'},
    {'id': 'skin_v_haru', 'kind': 'skin', 'name': '하루 · 은하 변이', 'tier': '변이',
     'description': '밤하늘을 삼킨 하루. 옷 위로 별이 반짝이고 발밑에 별가루가 흩날려요.',
     'status': 'on_sale', 'price': 1500, 'currency': 'KRW'},
    {'id': 'skin_v_mina', 'kind': 'skin', 'name': '미나 · 벚꽃 여우불', 'tier': '변이',
     'description': '벚꽃잎처럼 하얗게 바랜 고양이 후드. 곁에서 푸른 여우불 세 개가 맴돌아요.',
     'status': 'on_sale', 'price': 1500, 'currency': 'KRW'},
    {'id': 'skin_v_doyun', 'kind': 'skin', 'name': '도윤 · 용암 광부', 'tier': '변이',
     'description': '용암 갱도에서 돌아온 도윤. 검게 탄 옷 틈으로 용암 빛이 맥박처럼 일렁여요.',
     'status': 'on_sale', 'price': 1500, 'currency': 'KRW'},
    {'id': 'skin_v_sera', 'kind': 'skin', 'name': '세라 · 서리 마녀', 'tier': '변이',
     'description': '별 대신 서리를 다루는 세라. 망토 끝이 얼어붙고 주위에 눈송이가 내려요.',
     'status': 'on_sale', 'price': 1500, 'currency': 'KRW'},
    {'id': 'skin_v_steel', 'kind': 'skin', 'name': '강철 · 황금 코어', 'tier': '변이',
     'description': '코어를 황금으로 갈아 끼운 강철. 몸 곳곳에서 금빛 전류가 튀어요.',
     'status': 'on_sale', 'price': 1500, 'currency': 'KRW'},
    {'id': 'skin_v_luna', 'kind': 'skin', 'name': '루나 · 일식 기사', 'tier': '변이',
     'description': '달이 가려진 밤의 루나. 검은 갑옷에 붉은 빛, 머리 뒤에 일식 고리가 떠 있어요.',
     'status': 'on_sale', 'price': 1500, 'currency': 'KRW'},
    {'id': 'skin_v_kai', 'kind': 'skin', 'name': '카이 · 그림자 혼', 'tier': '변이',
     'description': '반쯤 사라진 그림자 닌자. 몸이 비치고 지나간 자리에 잔상이 남아요.',
     'status': 'on_sale', 'price': 1500, 'currency': 'KRW'},
    {'id': 'skin_v_arin', 'kind': 'skin', 'name': '아린 · 독버섯 요정', 'tier': '변이',
     'description': '버섯 숲의 아린. 보랏빛 몸에 형광 연두 포자가 둥실둥실 떠다녀요.',
     'status': 'on_sale', 'price': 1500, 'currency': 'KRW'},
    {'id': 'skin_v_zeno', 'kind': 'skin', 'name': '제노 · 청염 용기사', 'tier': '변이',
     'description': '푸른 불꽃을 삼킨 용기사. 투구 틈에서 청색 불씨가 피어올라요.',
     'status': 'on_sale', 'price': 1500, 'currency': 'KRW'},
    {'id': 'skin_v_aurora', 'kind': 'skin', 'name': '오로라 · 무지개 성기사', 'tier': '변이',
     'description': '빛이 갈라지는 갑옷. 몸 위로 무지개 색이 천천히 흘러가요.',
     'status': 'on_sale', 'price': 1500, 'currency': 'KRW'},
    {'id': 'pet_p_tick', 'kind': 'pet', 'name': '똑딱 · 황금 시계', 'tier': '변이',
     'description': '금으로 다시 태어난 똑딱. 째깍일 때마다 금빛 불씨가 튀어요.',
     'status': 'on_sale', 'price': 1000, 'currency': 'KRW'},
    {'id': 'pet_p_firefly', 'kind': 'pet', 'name': '반딧불 · 오로라', 'tier': '변이',
     'description': '오로라 빛을 품은 반딧불. 날개빛이 초록·하늘·보라로 바뀌어요.',
     'status': 'on_sale', 'price': 1000, 'currency': 'KRW'},
    {'id': 'pet_p_mouse', 'kind': 'pet', 'name': '태엽 쥐 · 네온', 'tier': '변이',
     'description': '네온 회로로 개조한 태엽 쥐. 박자에 맞춰 몸이 번쩍여요.',
     'status': 'on_sale', 'price': 1000, 'currency': 'KRW'},
    {'id': 'pet_p_sheep', 'kind': 'pet', 'name': '구름 양 · 번개 먹구름', 'tier': '변이',
     'description': '먹구름이 된 양. 털 사이에서 작은 번개가 번쩍여요.',
     'status': 'on_sale', 'price': 1000, 'currency': 'KRW'},
    {'id': 'pet_p_owl', 'kind': 'pet', 'name': '부엉이 봇 · 은하', 'tier': '변이',
     'description': '우주를 관측하던 부엉이 봇. 몸에 별이 떠 있어요.',
     'status': 'on_sale', 'price': 1000, 'currency': 'KRW'},
    {'id': 'pet_p_fox', 'kind': 'pet', 'name': '불꽃 여우 · 청염 구미호', 'tier': '변이',
     'description': '꼬리마다 푸른 불을 단 구미호. 여우불이 꼬리를 따라와요.',
     'status': 'on_sale', 'price': 1000, 'currency': 'KRW'},
    {'id': 'pet_p_penguin', 'kind': 'pet', 'name': '얼음 펭귄 · 벚꽃', 'tier': '변이',
     'description': '봄을 맞은 펭귄. 하늘색 몸이 벚꽃빛으로 물들었어요.',
     'status': 'on_sale', 'price': 1000, 'currency': 'KRW'},
    {'id': 'pet_p_dragon', 'kind': 'pet', 'name': '수정 드래곤 · 흑요석', 'tier': '변이',
     'description': '흑요석 비늘 사이로 용암이 흐르는 드래곤.',
     'status': 'on_sale', 'price': 1000, 'currency': 'KRW'},
    {'id': 'pet_p_cat', 'kind': 'pet', 'name': '유령 고양이 · 도깨비불', 'tier': '변이',
     'description': '초록 도깨비불을 거느린 유령 고양이. 몸이 반쯤 비쳐요.',
     'status': 'on_sale', 'price': 1000, 'currency': 'KRW'},
    {'id': 'pet_p_phoenix', 'kind': 'pet', 'name': '황금 불사조 · 얼음 불사조', 'tier': '변이',
     'description': '불꽃 대신 얼음으로 타오르는 불사조. 날갯짓마다 눈꽃이 흩어져요.',
     'status': 'on_sale', 'price': 1000, 'currency': 'KRW'},
    {'id': 'sword_voidreaver', 'kind': 'sword', 'name': '공허의 대검', 'tier': '영웅',
     'description': '빛을 삼키는 검은 대검. 청록 날을 따라 공허 안개가 피어오르고, 휘두르면 공허 충격파가 퍼져요.',
     'status': 'on_sale', 'price': 3000, 'currency': 'KRW'},
    {'id': 'sword_gearsaber', 'kind': 'sword', 'name': '태엽 톱니검', 'tier': '영웅',
     'description': '날에 톱니 이빨이 달린 황동 검. 손잡이 톱니가 쉬지 않고 돌고, 휘두르면 톱니 불꽃이 튀어요.',
     'status': 'on_sale', 'price': 3500, 'currency': 'KRW'},
    {'id': 'sword_beatbreaker', 'kind': 'sword', 'name': '비트 브레이커', 'tier': '전설',
     'description': '칼날 마디가 박자마다 차례로 켜지는 네온 검. 휘두르면 소리 파동이 고리처럼 번져요.',
     'status': 'on_sale', 'price': 4500, 'currency': 'KRW'},
    {'id': 'fx_v_void', 'kind': 'victory', 'name': '공허의 붕괴', 'tier': '영웅',
     'description': '쓰러진 보스가 검은 구멍으로 빨려 들어가며 사라지고, 청록 충격파가 전장을 휩쓸어요.',
     'status': 'on_sale', 'price': 2000, 'currency': 'KRW'},
    {'id': 'fx_v_clock', 'kind': 'victory', 'name': '태엽 꽃가루', 'tier': '영웅',
     'description': '보스 자리에서 종소리 고리가 퍼지고, 하늘에서 금빛 톱니와 꽃가루가 쏟아져요.',
     'status': 'on_sale', 'price': 2000, 'currency': 'KRW'},
    {'id': 'fx_v_neon', 'kind': 'victory', 'name': '네온 레이저쇼', 'tier': '전설',
     'description': '전장 위로 레이저가 쏟아지고 바닥에 이퀄라이저가 춤추며, 네온 VICTORY 글자가 번쩍여요.',
     'status': 'on_sale', 'price': 2500, 'currency': 'KRW'},
    {'id': 'fx_p_void', 'kind': 'lobby', 'name': '공허의 무대', 'tier': '영웅',
     'description': '메인 무대가 보라 안개에 잠기고, 하늘이 갈라진 틈에서 공허 조각이 떠다녀요.',
     'status': 'on_sale', 'price': 2500, 'currency': 'KRW'},
    {'id': 'fx_p_clock', 'kind': 'lobby', 'name': '황금 시계탑', 'tier': '영웅',
     'description': '무대 양쪽에서 거대한 황금 톱니가 돌고, 금빛 먼지가 천천히 내려앉아요.',
     'status': 'on_sale', 'price': 2500, 'currency': 'KRW'},
    {'id': 'fx_p_neon', 'kind': 'lobby', 'name': '네온 클럽', 'tier': '전설',
     'description': '메인 무대가 클럽으로! 레이저가 박자에 맞춰 휘젓고, 박자마다 화면이 번쩍여요.',
     'status': 'on_sale', 'price': 2500, 'currency': 'KRW'},
    {'id': 'set_void', 'kind': 'set', 'name': '공허 세트', 'tier': '세트',
     'description': '공허 검사 + 공허의 대검 + 공허의 붕괴 + 공허의 무대를 한 번에.', 'includes': ['skin_void', 'sword_voidreaver', 'fx_v_void', 'fx_p_void'],
     'status': 'on_sale', 'price': 6900, 'currency': 'KRW'},
    {'id': 'set_clock', 'kind': 'set', 'name': '태엽 세트', 'tier': '세트',
     'description': '태엽 성기사 + 태엽 톱니검 + 태엽 꽃가루 + 황금 시계탑을 한 번에.', 'includes': ['skin_clock', 'sword_gearsaber', 'fx_v_clock', 'fx_p_clock'],
     'status': 'on_sale', 'price': 7900, 'currency': 'KRW'},
    {'id': 'set_neon', 'kind': 'set', 'name': '네온 세트', 'tier': '세트',
     'description': '네온 비트 + 비트 브레이커 + 네온 레이저쇼 + 네온 클럽을 한 번에.', 'includes': ['skin_neon', 'sword_beatbreaker', 'fx_v_neon', 'fx_p_neon'],
     'status': 'on_sale', 'price': 9900, 'currency': 'KRW'},
]


# ---------------------------------------------------------------------
# 결제 (토스페이먼츠 결제창)
#   1) 게임: POST /api/shop/order {product_id}  → 주문 번호 + 결제창 주소
#   2) 게임이 새 창으로 /pay/checkout?order=… 를 열면 토스 결제창이 뜬다
#   3) 결제가 끝나면 토스가 /pay/success?paymentKey&orderId&amount 로 돌려보냄
#      → 서버가 비밀 키로 토스에 "승인"을 요청하고, 금액이 주문과 같을 때만 상품을 준다
#   4) 게임은 GET /api/shop/order/<번호> 또는 창 메시지로 결과를 알고 보관함을 새로 읽는다
# 키는 Render 환경변수 TOSS_CLIENT_KEY / TOSS_SECRET_KEY 에 넣는다.
# 비워 두면 토스 개발자센터 문서에 공개된 "테스트 키"를 쓴다(진짜 돈이 나가지 않음).
# ---------------------------------------------------------------------
TOSS_DOCS_CLIENT_KEY = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'   # 토스 문서 공개 테스트 키
TOSS_DOCS_SECRET_KEY = 'test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R'   # 토스 문서 공개 테스트 키
TOSS_CLIENT_KEY = os.environ.get('TOSS_CLIENT_KEY', '').strip() or TOSS_DOCS_CLIENT_KEY
TOSS_SECRET_KEY = os.environ.get('TOSS_SECRET_KEY', '').strip() or TOSS_DOCS_SECRET_KEY
TOSS_TEST = TOSS_CLIENT_KEY.startswith('test_') or TOSS_SECRET_KEY.startswith('test_')
TOSS_CONFIRM_URL = 'https://api.tosspayments.com/v1/payments/confirm'
SHOP_CONTACT = os.environ.get('SHOP_CONTACT', '').strip()   # 환불·문의 연락처 (진짜 판매 전에 꼭 넣기)
# 무료 출시 모드: Render 환경변수 SHOP_MODE=free 로 켠다. 게임의 가격·「구매하기」가 숨겨지고 주문도 받지 않는다.
FREE_MODE = os.environ.get('SHOP_MODE', '').strip().lower() == 'free'
ORDER_TTL = 60 * 60          # 결제창을 연 뒤 1시간 안에 끝내야 함
# v82: 새 캐릭터 15 · 새 펫 15의 변이 스킨 (게임 9999998과 같은 번호 · 이름)
_V82_CH = [('rio', '리오', '은하'), ('hana', '하나', '벚꽃'), ('gaon', '가온', '용암'), ('sora', '소라', '서리'), ('yuki', '유키', '황금'),
           ('dark', '다크', '핏빛'), ('volt', '볼트', '유령'), ('momo', '모모', '독'), ('leo', '레오', '청염'), ('mir', '미르', '무지개'),
           ('silvy', '실비', '밤하늘'), ('terra', '테라', '석양'), ('nova', '노바', '심해'), ('kage', '카게', '자수정'), ('serena', '세레나', '백금')]
_V82_PET = [('turtle', '약초 거북'), ('squirrel', '전기 다람쥐'), ('golem', '아기 골렘'), ('bee', '독침 벌'), ('lizard', '불씨 도마뱀'),
            ('snowfairy', '눈송이 요정'), ('batcookie', '박쥐 쿠키'), ('clockowl', '시계 부엉이'), ('luckycat', '행운 고양이'), ('drone', '방패 드론'),
            ('jelly', '번개 해파리'), ('hawk', '바람 매'), ('viper', '맹독 뱀'), ('whale', '별빛 고래'), ('skydragon', '창공의 용')]
_V82_TH = ['은하', '벚꽃', '용암', '서리', '황금', '핏빛', '유령', '독', '청염', '무지개', '밤하늘', '석양', '심해', '자수정', '백금']
for _id, _nm, _th in _V82_CH:
    SHOP_PRODUCTS.append({'id': 'skin_v_' + _id, 'kind': 'skin', 'name': _nm + ' · ' + _th + ' 변이', 'tier': '변이',
                          'description': _nm + '의 ' + _th + ' 변이 모습.', 'status': 'on_sale', 'price': 1500, 'currency': 'KRW'})
for _i, (_id, _nm) in enumerate(_V82_PET):
    SHOP_PRODUCTS.append({'id': 'pet_p_' + _id, 'kind': 'pet', 'name': _nm + ' · ' + _V82_TH[(_i + 5) % 15], 'tier': '변이',
                          'description': _nm + '의 변이 모습.', 'status': 'on_sale', 'price': 1000, 'currency': 'KRW'})

# v102: 유물 · 신화 · 초월 캐릭터 15 · 펫 15의 스킨(전용 장비가 따로 그려짐). 게임 999999996의 NCS · NPS와 같은 번호
_V102_CH = [('arteon', '아르테온', '흑기사'), ('lunaria', '루나리아', '태양 무희'), ('kaiser', '카이저', '빙결 군주'), ('selene', '셀레네', '숲의 사냥꾼'),
            ('bahamut', '바하무트', '백룡'), ('erebos', '에레보스', '핏빛 망령'), ('auroras', '아우로라', '타락 성녀'), ('chronos', '크로노스', '증기 기관사'),
            ('ignis', '이그니스', '청염 황제'), ('sylph', '실피드', '벚꽃 요정'), ('nidhogg', '니드호그', '황금 비룡'), ('odin', '오딘', '서리 거인왕'),
            ('mist', '미스트', '붉은 그림자'), ('gaia', '가이아', '화산 거신'), ('astra', '아스트라', '태양 마녀')]
_V102_PET = [('phx', '불사조', '얼음 불사조'), ('gdragon', '은하 용', '태양 용'), ('owlking', '시간 부엉이왕', '흑요석 부엉이왕'), ('swolf', '그림자 늑대', '설원 늑대'),
             ('qilin', '천둥 기린', '진홍 기린'), ('cturtle', '수정 거북왕', '황금 거북왕'), ('sfox', '별빛 여우', '달빛 구미호'), ('lgolem', '용암 골렘', '이끼 골렘'),
             ('frost', '서리 정령', '불꽃 정령'), ('gold', '황금 드래곤', '흑룡'), ('crow', '암흑 까마귀', '흰 까마귀'), ('rwhale', '무지개 고래', '심해 고래'),
             ('griffin', '바람 그리핀', '폭풍 그리핀'), ('slime', '혼돈 슬라임', '황금 슬라임'), ('angel', '여신의 천사', '타락 천사')]
for _id, _nm, _th in _V102_CH:
    SHOP_PRODUCTS.append({'id': 'skin_v_' + _id, 'kind': 'skin', 'name': _nm + ' · ' + _th, 'tier': '변이',
                          'description': _nm + '의 「' + _th + '」 스킨. 전용 장비가 따로 있어요.', 'status': 'on_sale', 'price': 2500, 'currency': 'KRW'})
for _id, _nm, _th in _V102_PET:
    SHOP_PRODUCTS.append({'id': 'pet_p_' + _id, 'kind': 'pet', 'name': _nm + ' · ' + _th, 'tier': '변이',
                          'description': _nm + '의 「' + _th + '」 스킨. 전용 장식이 붙어요.', 'status': 'on_sale', 'price': 1800, 'currency': 'KRW'})

PRODUCTS_BY_ID = {p['id']: p for p in SHOP_PRODUCTS}


def _expand(product_id):
    """세트는 안에 든 상품들로 풀어서 돌려준다"""
    p = PRODUCTS_BY_ID.get(product_id)
    if p and p.get('includes'):
        return list(p['includes'])
    return [product_id]


# 테스터: Render 환경변수 TESTER_USERS 에 아이디를 쉼표로 넣으면, 그 계정은 모든 유료 상품을 가진 것으로 친다
# (결제 없이 현질템을 시험해 보는 용도. 무료 모드여도 테스터에게는 상점이 보인다)
# 아이디 대신 이메일(@ 포함)을 넣으면, 그 이메일의 Google 계정으로 로그인한 게임 계정이 테스터가 된다.
_TESTER_RAW = [x.strip().lower() for x in os.environ.get('TESTER_USERS', '').split(',') if x.strip()]
TESTER_USERS = set(x for x in _TESTER_RAW if '@' not in x)


def _email_hash(email):
    return hashlib.sha256(('tester:' + email.strip().lower()).encode()).hexdigest()


TESTER_EMAIL_HASHES = set(_email_hash(x) for x in _TESTER_RAW if '@' in x)


def _is_tester(user):
    if not user:
        return False
    if (user.get('username') or '').lower() in TESTER_USERS:
        return True
    if not TESTER_EMAIL_HASHES:
        return False
    row = get_db().execute('SELECT email_hash FROM tester_links WHERE user_id = ?', (user['user_id'],)).fetchone()
    return bool(row) and row['email_hash'] in TESTER_EMAIL_HASHES


def _note_tester_email(db, user_id, info):
    """Google 로그인 때: 확인된 이메일이 테스터 목록에 있으면 그 계정을 테스터로 표시(이메일은 저장하지 않음)"""
    try:
        email = info.get('email') if info.get('email_verified') in (True, 'true') else None
        if not email or not TESTER_EMAIL_HASHES:
            return
        eh = _email_hash(email)
        if eh not in TESTER_EMAIL_HASHES:
            return
        db.execute('DELETE FROM tester_links WHERE user_id = ?', (user_id,))
        db.execute('INSERT INTO tester_links (user_id, email_hash, created_at) VALUES (?, ?, ?)', (user_id, eh, time.time()))
        db.commit()
    except Exception:
        db.rollback()


def _owned_ids(db, user_id, tester=False):
    if tester:
        return set(x for p in SHOP_PRODUCTS for x in _expand(p['id']))
    """보유 상품: 직접 지급(shop_entitlements) + 결제 완료 주문.
    테스트 키로 결제한 주문은 지금 서버도 테스트 키일 때만 센다."""
    owned = set(r['product_id'] for r in db.execute(
        'SELECT product_id FROM shop_entitlements WHERE user_id = ?', (user_id,)).fetchall())
    rows = db.execute("SELECT product_id FROM shop_orders WHERE user_id = ? AND status = 'paid' AND test = ?",
                      (user_id, 1 if TOSS_TEST else 0)).fetchall()
    for r in rows:
        owned.update(_expand(r['product_id']))
    return owned


def _customer_key(user_id):
    return 'bb_' + hashlib.sha256(('cust:' + user_id).encode()).hexdigest()[:30]


def _toss_confirm(payment_key, order_id, amount):
    """토스에 결제 승인 요청. (성공여부, 응답 dict)"""
    auth = base64.b64encode((TOSS_SECRET_KEY + ':').encode()).decode()
    body = json.dumps({'paymentKey': payment_key, 'orderId': order_id, 'amount': amount}).encode()
    req = urllib.request.Request(TOSS_CONFIRM_URL, data=body, method='POST', headers={
        'Authorization': 'Basic ' + auth, 'Content-Type': 'application/json',
        'Idempotency-Key': 'confirm-' + order_id})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return True, json.loads(r.read().decode() or '{}')
    except urllib.error.HTTPError as e:
        try:
            return False, json.loads(e.read().decode() or '{}')
        except Exception:
            return False, {'code': 'HTTP_%d' % e.code, 'message': '결제 승인에 실패했어요'}
    except Exception:
        return False, {'code': 'NETWORK', 'message': '결제 회사와 연결하지 못했어요. 잠시 뒤 보관함을 확인해 주세요.'}


@app.route('/api/shop')
def shop_catalog():
    response = jsonify(ok=True, products=SHOP_PRODUCTS, checkout_enabled=not FREE_MODE, free_mode=FREE_MODE, test_mode=TOSS_TEST)
    response.headers['Cache-Control'] = 'no-store'
    return response


@app.route('/api/shop/owned')
def shop_owned():
    user = _current_user()
    if not user:
        return _bad('로그인 후 보유 상품을 확인할 수 있어요', 401)
    tester = _is_tester(user)
    response = jsonify(ok=True, owned=sorted(_owned_ids(get_db(), user['user_id'], tester)), test_mode=TOSS_TEST, tester=tester)
    response.headers['Cache-Control'] = 'no-store'
    return response


@app.route('/api/shop/order', methods=['POST'])
def shop_order_create():
    if FREE_MODE:
        return _bad('지금은 무료 버전이라 판매하지 않아요', 403)
    user = _current_user()
    if not user:
        return _bad('로그인한 뒤에 살 수 있어요', 401)
    data = request.get_json(silent=True) or {}
    pid = data.get('product_id') if isinstance(data.get('product_id'), str) else ''
    product = PRODUCTS_BY_ID.get(pid)
    if not product or product.get('status') != 'on_sale' or not product.get('price'):
        return _bad('판매하지 않는 상품이에요', 404)
    key = 'order:' + user['user_id']
    if _too_many(key, 20, 600):
        return _bad('주문을 너무 자주 만들었어요. 잠시 뒤 다시 해 주세요', 429)
    _note(key)
    db = get_db()
    owned = _owned_ids(db, user['user_id'])
    if all(x in owned for x in _expand(pid)):
        return _bad('이미 가지고 있는 상품이에요', 409)
    order_id = 'bb' + secrets.token_urlsafe(18).replace('-', 'x').replace('_', 'y')
    db.execute('INSERT INTO shop_orders (order_id, user_id, product_id, amount, status, test, created_at) '
               "VALUES (?, ?, ?, ?, 'ready', ?, ?)",
               (order_id, user['user_id'], pid, int(product['price']), 1 if TOSS_TEST else 0, time.time()))
    db.commit()
    base = request.url_root.rstrip('/')
    resp = jsonify(ok=True, order_id=order_id, amount=int(product['price']), name=product['name'],
                   checkout_url=base + '/pay/checkout?order=' + order_id, test_mode=TOSS_TEST)
    resp.headers['Cache-Control'] = 'no-store'
    return resp


@app.route('/api/shop/order/<order_id>')
def shop_order_status(order_id):
    user = _current_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    row = get_db().execute('SELECT product_id, amount, status FROM shop_orders WHERE order_id = ? AND user_id = ?',
                           (order_id[:80], user['user_id'])).fetchone()
    if not row:
        return _bad('주문을 찾지 못했어요', 404)
    resp = jsonify(ok=True, status=row['status'], product_id=row['product_id'], amount=row['amount'])
    resp.headers['Cache-Control'] = 'no-store'
    return resp


PAY_PAGE = r"""<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>BEAT BLADE 결제</title><meta name="referrer" content="no-referrer">
<style>
body{margin:0;min-height:100vh;display:grid;place-items:center;background:radial-gradient(circle at 50% 0,#2a1f4a,#07090f 70%);color:#eef2ff;font:15px/1.6 system-ui,-apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif}
.box{width:min(420px,calc(100% - 32px));padding:24px 22px;border-radius:20px;background:#121726;border:1px solid #ffffff22;box-shadow:0 20px 60px #000a}
h2{margin:0 0 4px;font-size:20px}.sub{color:#9fb0c8;font-size:13px}.item{margin:18px 0;padding:14px 16px;border-radius:14px;background:#ffffff0a;border:1px solid #ffffff1a;display:flex;justify-content:space-between;gap:10px;align-items:center}
.item b{font-size:16px}.won{font-size:22px;font-weight:900;color:#ffd166}.test{display:inline-block;margin-bottom:10px;padding:3px 10px;border-radius:99px;background:#ff6a9a33;color:#ffb0c8;font-size:12px;font-weight:800}
.pay{display:grid;gap:8px}.pay button{padding:13px;border-radius:12px;border:0;font:800 15px inherit;cursor:pointer;background:#ffd166;color:#1a1206}.pay button.alt{background:#ffffff14;color:#eef2ff;border:1px solid #ffffff2a}
.pay button:disabled{opacity:.5;cursor:not-allowed}.minor{display:flex;gap:10px;align-items:flex-start;margin:0 0 12px;padding:11px 12px;border-radius:12px;background:#ffd16614;border:1px solid #ffd16655;font-size:13px;line-height:1.5;cursor:pointer}.minor input{width:18px;height:18px;margin:2px 0 0;flex:none;accent-color:#ffd166}.note{color:#9fb0c8;font-size:12px;margin-top:14px}.err{color:#ffb2a8;margin-top:10px;font-size:13px;white-space:pre-line}.ok{font-size:44px;text-align:center}
</style><div class="box">{% if test %}<span class="test">테스트 결제 · 실제로 돈이 나가지 않아요</span>{% endif %}
{% if page == 'checkout' %}
<h2>✦ BEAT BLADE 상점</h2><div class="sub">{{ user }} 님의 주문</div>
<div class="item"><b>{{ name }}</b><span class="won">₩{{ '{:,}'.format(amount) }}</span></div>
<label class="minor"><input type="checkbox" id="agree"><span><b>만 19세 미만이라면 보호자(부모님)의 동의를 받고 결제해 주세요.</b><br>위 내용을 확인했어요. (보호자 동의 없이 한 미성년자 결제는 보호자가 취소를 요청할 수 있어요)</span></label>
<div class="pay"><button data-m="CARD">카드 · 간편결제 (토스페이 · 카카오페이 · 네이버페이 등)</button><button class="alt" data-m="TRANSFER">계좌이체</button><button class="alt" data-m="MOBILE_PHONE">휴대폰 결제</button></div>
<div class="err" id="err"></div>
<div class="note">• 결제가 끝나면 이 창은 저절로 닫히고 게임 보관함에 바로 들어가요.<br>• 디지털 상품이라 받은 뒤 사용(장착)하면 환불이 어려울 수 있어요.{% if contact %}<br>• 환불·문의: {{ contact }}{% endif %}</div>
<script src="https://js.tosspayments.com/v2/standard"></script><script>
const O={{ order|tojson }};const err=document.getElementById('err'),agree=document.getElementById('agree');
const lock=()=>document.querySelectorAll('[data-m]').forEach(x=>x.disabled=!agree.checked);agree.onchange=()=>{err.textContent='';lock()};lock();
document.querySelectorAll('[data-m]').forEach(b=>b.onclick=async()=>{if(!agree.checked){err.textContent='먼저 위의 확인 칸을 체크해 주세요.';return}err.textContent='';document.querySelectorAll('[data-m]').forEach(x=>x.disabled=true);
 try{if(!window.TossPayments)throw Error('결제창을 불러오지 못했어요. 인터넷 연결을 확인해 주세요.');
  const tp=TossPayments(O.clientKey),pay=tp.payment({customerKey:O.customerKey});
  await pay.requestPayment({method:b.dataset.m,amount:{currency:'KRW',value:O.amount},orderId:O.orderId,orderName:O.orderName,successUrl:O.successUrl,failUrl:O.failUrl,customerName:O.customerName,
   card:b.dataset.m==='CARD'?{useEscrow:false,flowMode:'DEFAULT',useCardPoint:false,useAppCardOnly:false}:undefined});
 }catch(e){err.textContent=(e&&e.code==='USER_CANCEL')?'결제를 취소했어요.':(e&&e.message)||'결제를 시작하지 못했어요.'}
 lock()});
</script>
{% else %}
<div class="ok">{{ '🎉' if ok else '⚠️' }}</div><h2 style="text-align:center">{{ title }}</h2><div class="sub" style="text-align:center;white-space:pre-line">{{ msg }}</div>
<div class="pay" style="margin-top:18px"><button onclick="window.close()">게임으로 돌아가기</button></div>
<script>
try{window.opener&&window.opener.postMessage({type:'beatblade-pay',ok:{{ 'true' if ok else 'false' }},order_id:{{ order_id|tojson }}},'*')}catch(e){}
{% if ok %}setTimeout(()=>{try{window.close()}catch(e){}},2200);{% endif %}
</script>
{% endif %}</div></html>"""


def _pay_page(**kw):
    kw.setdefault('test', TOSS_TEST)
    kw.setdefault('contact', SHOP_CONTACT)
    resp = app.response_class(render_template_string(PAY_PAGE, **kw), mimetype='text/html')
    resp.headers['Cache-Control'] = 'no-store'
    resp.headers['Referrer-Policy'] = 'no-referrer'
    resp.headers['X-Frame-Options'] = 'DENY'
    return resp


def _pay_result(ok, title, msg, order_id='', code=200):
    resp = _pay_page(page='result', ok=ok, title=title, msg=msg, order_id=order_id)
    resp.status_code = code
    return resp


@app.route('/pay/checkout')
def pay_checkout():
    if FREE_MODE:
        return _pay_result(False, '지금은 판매하지 않아요', '무료 버전이에요. 게임에서 「입어보기」로 마음껏 써 보세요.', code=403)
    order_id = (request.args.get('order') or '')[:80]
    db = get_db()
    row = db.execute('SELECT o.*, u.username FROM shop_orders o JOIN users u ON u.user_id = o.user_id '
                     'WHERE o.order_id = ?', (order_id,)).fetchone()
    if not row:
        return _pay_result(False, '주문을 찾지 못했어요', '게임에서 다시 「구매하기」를 눌러 주세요.', code=404)
    if row['status'] == 'paid':
        return _pay_result(True, '이미 결제가 끝났어요', '게임 보관함에서 확인해 보세요.', order_id)
    if row['status'] != 'ready' or time.time() - row['created_at'] > ORDER_TTL:
        return _pay_result(False, '지난 주문이에요', '게임에서 다시 「구매하기」를 눌러 주세요.', order_id, 410)
    product = PRODUCTS_BY_ID.get(row['product_id'], {})
    base = request.url_root.rstrip('/')
    order = {'clientKey': TOSS_CLIENT_KEY, 'customerKey': _customer_key(row['user_id']), 'orderId': order_id,
             'amount': int(row['amount']), 'orderName': 'BEAT BLADE · ' + product.get('name', row['product_id']),
             'customerName': row['username'], 'successUrl': base + '/pay/success', 'failUrl': base + '/pay/fail'}
    return _pay_page(page='checkout', order=order, name=product.get('name', row['product_id']),
                     amount=int(row['amount']), user=row['username'])


@app.route('/pay/success')
def pay_success():
    payment_key = (request.args.get('paymentKey') or '')[:200]
    order_id = (request.args.get('orderId') or '')[:80]
    try:
        amount = int(request.args.get('amount') or -1)
    except ValueError:
        amount = -1
    db = get_db()
    row = db.execute('SELECT * FROM shop_orders WHERE order_id = ?', (order_id,)).fetchone()
    if not row or not payment_key:
        return _pay_result(False, '주문을 찾지 못했어요', '돈이 나갔다면 문의해 주세요. 주문 번호: ' + order_id, order_id, 404)
    if row['status'] == 'paid':
        return _pay_result(True, '결제 완료!', '보관함에 들어갔어요. 게임으로 돌아가 장착해 보세요.', order_id)
    if amount != int(row['amount']):
        # 금액이 주문과 다르면 승인하지 않는다 (주소를 고쳐서 싸게 사는 것 방지)
        db.execute("UPDATE shop_orders SET status = 'failed' WHERE order_id = ? AND status = 'ready'", (order_id,))
        db.commit()
        return _pay_result(False, '결제 금액이 달라요', '결제를 승인하지 않았어요. 돈은 빠져나가지 않아요.', order_id, 400)
    # 같은 주문을 두 번 승인하지 않도록 먼저 "승인 중"으로 잡는다
    cur = db.execute("UPDATE shop_orders SET status = 'confirming' WHERE order_id = ? AND status = 'ready'", (order_id,))
    db.commit()
    if getattr(cur, 'rowcount', 1) == 0:
        return _pay_result(False, '이미 처리 중인 주문이에요', '잠시 뒤 게임 보관함을 확인해 주세요.', order_id, 409)
    ok, res = _toss_confirm(payment_key, order_id, int(row['amount']))
    if ok and res.get('status') == 'DONE' and int(res.get('totalAmount', -1)) == int(row['amount']):
        db.execute("UPDATE shop_orders SET status = 'paid', payment_key = ?, method = ?, paid_at = ? WHERE order_id = ?",
                   (payment_key, str(res.get('method') or '')[:40], time.time(), order_id))
        db.commit()
        name = PRODUCTS_BY_ID.get(row['product_id'], {}).get('name', '')
        return _pay_result(True, '결제 완료!', name + ' — 보관함에 들어갔어요.\n게임으로 돌아가 장착해 보세요.', order_id)
    if res.get('code') == 'NETWORK':
        # 승인 결과를 모르면 'ready'로 되돌려 다시 시도할 수 있게 한다 (같은 Idempotency-Key라 두 번 결제되지 않음)
        db.execute("UPDATE shop_orders SET status = 'ready' WHERE order_id = ?", (order_id,))
        db.commit()
        return _pay_result(False, '결제 확인이 늦어지고 있어요', res.get('message', ''), order_id, 502)
    db.execute("UPDATE shop_orders SET status = 'failed' WHERE order_id = ?", (order_id,))
    db.commit()
    return _pay_result(False, '결제가 승인되지 않았어요', str(res.get('message') or '다시 시도해 주세요.')[:200], order_id, 400)


@app.route('/pay/fail')
def pay_fail():
    order_id = (request.args.get('orderId') or '')[:80]
    code = (request.args.get('code') or '')[:60]
    msg = (request.args.get('message') or '')[:200]
    if order_id:
        db = get_db()
        db.execute("UPDATE shop_orders SET status = 'failed' WHERE order_id = ? AND status = 'ready'", (order_id,))
        db.commit()
    if code in ('PAY_PROCESS_CANCELED', 'USER_CANCEL'):
        return _pay_result(False, '결제를 취소했어요', '돈은 빠져나가지 않았어요.', order_id)
    return _pay_result(False, '결제하지 못했어요', msg or '다시 시도해 주세요.', order_id)


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
    # v81: 새 가입은 Google로만 받는다(게임 화면에서도 아이디 가입을 뺐음). 예전 아이디 계정의 로그인(/api/login)은 그대로 둔다.
    if os.environ.get('ALLOW_ID_SIGNUP', '') != '1':
        return _bad('이제 Google 계정으로만 가입할 수 있어요', 403)
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
    return jsonify(ok=True, username=user['username'], google_linked=linked,
                   need_name=_needs_name(user['username']))


def _needs_name(username):
    """Google로 처음 만든 계정은 'G_...' 임시 이름이라 게임에서 이름을 정해야 한다"""
    return str(username or '').startswith('G_')


NICK_RE = re.compile(r'^[0-9A-Za-z가-힣_]{2,10}$')


@app.route('/api/account/name', methods=['POST'])
def api_account_name():
    """임시 이름(G_...)인 계정이 게임 이름을 한 번 정한다. 랭킹에 이 이름이 나온다.
    아이디·비밀번호로 만든 계정은 아이디가 곧 이름이라 바꾸지 않는다."""
    user = _current_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    if not _needs_name(user['username']):
        return _bad('이름은 이미 정해져 있어요', 409)
    key = 'name:' + user['user_id']
    if _too_many(key, 20, 600):
        return _bad('너무 자주 시도했어요. 잠시 뒤에 다시 해 주세요', 429)
    _note(key)
    body = request.get_json(silent=True) or {}
    name = body.get('name') if isinstance(body.get('name'), str) else ''
    name = name.strip()
    if not NICK_RE.match(name) or name.lower().startswith('g_'):
        return _bad('이름은 2~10자의 한글·영문·숫자·_ 만 쓸 수 있어요')
    db = get_db()
    if db.execute('SELECT 1 FROM users WHERE name_key = ? AND user_id <> ?',
                  (name.lower(), user['user_id'])).fetchone():
        return _bad('이미 있는 이름이에요. 다른 이름을 골라 주세요', 409)
    try:
        db.execute('UPDATE users SET username = ?, name_key = ? WHERE user_id = ?',
                   (name, name.lower(), user['user_id']))
        db.execute('UPDATE rank_scores SET username = ? WHERE user_id = ?', (name, user['user_id']))
        db.commit()
    except Exception:
        db.rollback()
        return _bad('이미 있는 이름이에요. 다른 이름을 골라 주세요', 409)
    return jsonify(ok=True, username=name)



# 한 판 점수로 나올 수 있는 값보다 넉넉히 큰 상한 (보스 한 명 점수는 보통 수만~수십만)
MAX_RANK_SCORE = 10_000_000


def _rank_extra(db, rows):
    """v102: 순위표 줄마다 장착 모습(look), 1~3위는 지금 게임 중인지(관전 가능) 붙이고 user_id는 지운다"""
    ids = [d['user_id'] for d in rows if d.get('user_id')]
    looks = {}
    if ids:
        q = 'SELECT user_id, look FROM player_look WHERE user_id IN (' + ','.join('?' * len(ids)) + ')'
        for r in db.execute(q, ids).fetchall():
            try:
                looks[r['user_id']] = json.loads(r['look'])
            except Exception:
                pass
    now = time.time()
    for d in rows:
        uid = d.pop('user_id', None)
        d['look'] = looks.get(uid)
        if d.get('rank', 99) <= 3 and uid:
            seen = _SEEN.get(uid)
            where = seen[1] if seen and now - seen[0] < 40 else ''
            d['where'] = where
            d['live'] = bool(where) and any(k in where for k in ('탑', '듀오', '결투', '보스'))


_TOP3 = {'t': 0, 'ids': set()}


def _top3_ids(db):
    """v102: 어느 순위표든 1~3위인 계정(친구가 아니어도 관전 가능). 30초 동안 기억"""
    now = time.time()
    if now - _TOP3['t'] < 30:
        return _TOP3['ids']
    ids = set()
    for sql in ('SELECT user_id FROM rank_scores ORDER BY score DESC, updated_at ASC LIMIT 3',
                'SELECT user_id FROM player_stats ORDER BY level DESC, xp DESC, updated_at ASC LIMIT 3',
                'SELECT user_id FROM player_stats ORDER BY floor DESC, updated_at ASC LIMIT 3',
                'SELECT user_id FROM player_stats ORDER BY gold DESC, updated_at ASC LIMIT 3'):
        ids.update(r['user_id'] for r in db.execute(sql).fetchall())
    ids.update(r['user_id'] for r in db.execute('SELECT user_id FROM pvp_rank WHERE season=? AND wins + losses > 0 ORDER BY rating DESC, updated_at ASC LIMIT 3', (_pvp_season(),)).fetchall())
    _TOP3['t'] = now
    _TOP3['ids'] = ids
    return ids


@app.route('/api/ranking', methods=['GET'])
def api_ranking_get():
    """랭킹. by=score(최고 점수) | level(레벨 · 경험치) | floor(탑 최고 층) | gold(골드). 이름은 계정 이름(users)을 쓴다."""
    limit = clamp_int(request.args.get('limit'), 1, 100, 20)
    by = request.args.get('by', 'score')
    if by not in ('score', 'level', 'floor', 'gold', 'pvp'):
        by = 'score'
    db = get_db()
    user = _current_user()
    if by == 'pvp':  # v94 이번 시즌 결투 점수
        season = _pvp_season()
        rows = db.execute('SELECT p.user_id, u.username, p.rating, p.best, p.wins, p.losses, s.level FROM pvp_rank p '
                          'JOIN users u ON u.user_id = p.user_id LEFT JOIN player_stats s ON s.user_id = p.user_id '
                          'WHERE p.season=? AND p.wins + p.losses > 0 ORDER BY p.rating DESC, p.updated_at ASC LIMIT ?', (season, limit)).fetchall()
        out = []
        for i, row in enumerate(rows):
            d = dict(row)
            d['rank'] = i + 1
            d['tier'] = _pvp_tier(d['rating'])['name']
            d['me'] = bool(user and d['user_id'] == user['user_id'])
            out.append(d)
        _rank_extra(db, out)
        mine = None
        if user:
            v = _pvp_rank_view(db, user['user_id'])
            if v['wins'] + v['losses'] > 0:
                mine = {'rank': v['pos'], 'rating': v['rating'], 'tier': v['tier']['name'], 'wins': v['wins'], 'losses': v['losses']}
        return jsonify(ok=True, by=by, season=season, players=out, mine=mine)
    if by == 'score':
        rows = db.execute('SELECT r.user_id, u.username, r.score, r.chapter, r.boss, r.difficulty, r.updated_at, '
                          's.level, s.floor, s.gold FROM rank_scores r JOIN users u ON u.user_id = r.user_id '
                          'LEFT JOIN player_stats s ON s.user_id = r.user_id '
                          'ORDER BY r.score DESC, r.updated_at ASC LIMIT ?', (limit,)).fetchall()
    else:
        order = {'level': 's.level DESC, s.xp DESC', 'floor': 's.floor DESC', 'gold': 's.gold DESC'}[by]
        rows = db.execute('SELECT s.user_id, u.username, s.level, s.xp, s.floor, s.gold, s.updated_at, r.score '
                          'FROM player_stats s JOIN users u ON u.user_id = s.user_id '
                          'LEFT JOIN rank_scores r ON r.user_id = s.user_id '
                          'ORDER BY ' + order + ', s.updated_at ASC LIMIT ?', (limit,)).fetchall()
    result = []
    for i, row in enumerate(rows):
        d = dict(row)
        d['rank'] = i + 1
        d['me'] = bool(user and d.get('user_id') == user['user_id'])
        result.append(d)
    _rank_extra(db, result)
    mine = None
    if user:
        st = db.execute('SELECT level, xp, floor, gold FROM player_stats WHERE user_id=?', (user['user_id'],)).fetchone()
        rs = db.execute('SELECT score, chapter, boss, difficulty, updated_at FROM rank_scores WHERE user_id=?', (user['user_id'],)).fetchone()
        if by == 'score' and rs:
            mine = dict(rs)
            mine['rank'] = db.execute('SELECT COUNT(*) AS c FROM rank_scores WHERE score > ?', (rs['score'],)).fetchone()['c'] + 1
        elif by != 'score' and st:
            mine = dict(st)
            if by == 'level':
                c = db.execute('SELECT COUNT(*) AS c FROM player_stats WHERE level > ? OR (level = ? AND xp > ?)',
                               (st['level'], st['level'], st['xp'])).fetchone()['c']
            else:
                c = db.execute('SELECT COUNT(*) AS c FROM player_stats WHERE ' + by + ' > ?', (st[by],)).fetchone()['c']
            mine['rank'] = c + 1
        if mine is not None and st:
            mine.update({'level': st['level'], 'floor': st['floor'], 'gold': st['gold']})
    return jsonify(ok=True, by=by, players=result, mine=mine)


@app.route('/api/stats', methods=['PUT'])
def api_stats_put():
    """v83: 내 레벨 · 경험치 · 골드 · 탑 최고 층을 올린다(랭킹 탭). 게임이 바뀔 때마다(최대 몇십 초에 한 번) 보냄."""
    user = _current_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    key = 'stats:' + user['user_id']
    if _too_many(key, 40, 600):
        return _bad('너무 자주 보냈어요', 429)
    _note(key)
    body = request.get_json(silent=True) or {}
    level = clamp_int(body.get('level'), 1, 9999, 1)
    xp = clamp_int(body.get('xp'), 0, 10 ** 12, 0)
    gold = clamp_int(body.get('gold'), 0, 10 ** 12, 0)
    floor = clamp_int(body.get('floor'), 1, 1_000_000, 1)
    db = get_db()
    now = time.time()
    look = body.get('look')
    if isinstance(look, dict):  # v102 장착 모습(작은 JSON만)
        lk = {k: (clamp_int(v, 0, 9999, 0) if isinstance(v, (int, float)) else clamp_text(v, 40)) for k, v in list(look.items())[:16] if isinstance(k, str) and len(k) <= 8}
        txt = json.dumps(lk, ensure_ascii=False)
        if db.execute('SELECT 1 FROM player_look WHERE user_id=?', (user['user_id'],)).fetchone():
            db.execute('UPDATE player_look SET look=?, updated_at=? WHERE user_id=?', (txt, now, user['user_id']))
        else:
            db.execute('INSERT INTO player_look (user_id, look, updated_at) VALUES (?, ?, ?)', (user['user_id'], txt, now))
    if db.execute('SELECT 1 FROM player_stats WHERE user_id=?', (user['user_id'],)).fetchone():
        db.execute('UPDATE player_stats SET level=?, xp=?, gold=?, floor=?, updated_at=? WHERE user_id=?',
                   (level, xp, gold, floor, now, user['user_id']))
    else:
        db.execute('INSERT INTO player_stats (user_id, level, xp, gold, floor, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
                   (user['user_id'], level, xp, gold, floor, now))
    db.commit()
    return jsonify(ok=True)

@app.route('/api/ranking', methods=['PUT'])
def api_ranking_put():
    user=_current_user()
    if not user:return _bad('로그인이 필요해요',401)
    key='rank:'+user['user_id']
    if _too_many(key, 30, 600):
        return _bad('점수 등록이 너무 잦아요. 잠시 뒤에 다시 해 주세요', 429)
    _note(key)
    body=request.get_json(silent=True) or {}
    score=clamp_int(body.get('score'),0,2**62,0)
    if score > MAX_RANK_SCORE:
        return _bad('점수가 너무 커요', 400)
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

# ===================== v85 듀오(2인 협동) 방 =====================
# 방은 서버 메모리에만 둔다(서버가 다시 켜지면 사라짐 — 한 판짜리라 괜찮음). 워커는 하나(gunicorn 기본)라 모두가 같은 방 목록을 본다.
# 방장(owner)의 게임이 잡몹 · 층을 돌리고, 둘은 /api/duo/sync로 0.1초마다 서로의 메시지를 주고받는다(서버는 전달만).
_duo_lock = threading.Lock()
_DUO = {}
_DUO_CODE = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
_DUO_KEEP = 500


def _duo_clean(now):
    for code in [c for c, r in _DUO.items() if now - r['touched'] > 300 or (r['state'] == 'closed' and now - r['touched'] > 30)]:
        del _DUO[code]


def _duo_view(r, uid=None):
    return {'code': r['code'], 'owner': r['owner_name'], 'floor': r['floor'], 'diff': r['diff'], 'state': r['state'],
            'kind': r.get('kind', 'coop'), 'ranked': bool(r.get('ranked')), 'stake': r.get('stake', 0),
            'players': [{'name': p['name'], 'lv': p['lv'], 'ch': p['ch'], 'owner': p['uid'] == r['owner'], 'me': p['uid'] == uid,
                         'online': time.time() - p['seen'] < 8, 'ready': bool(p.get('ready')) or p['uid'] == r['owner']} for p in r['players']]}


def _duo_best(db, uid):
    row = db.execute('SELECT floor FROM player_stats WHERE user_id=?', (uid,)).fetchone()
    return row['floor'] if row else 1


@app.route('/api/duo/rooms', methods=['GET'])
def duo_rooms():
    user = _current_user()
    now = time.time()
    with _duo_lock:
        _duo_clean(now)
        rooms = [_duo_view(r, user and user['user_id']) for r in _DUO.values() if r['state'] == 'wait' and len(r['players']) < 2 and r.get('kind', 'coop') == 'coop']
    rooms.sort(key=lambda x: x['floor'])
    return jsonify(ok=True, rooms=rooms[:50])


@app.route('/api/duo/create', methods=['POST'])
def duo_create():
    user = _current_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    body = request.get_json(silent=True) or {}
    floor = clamp_int(body.get('floor'), 1, 1_000_000, 1)
    best = clamp_int(body.get('best'), 1, 1_000_000, 1)
    if floor > max(best, 1):
        return _bad('올라가 본 층까지만 시작할 수 있어요', 400)
    diff = clamp_text(body.get('diff'), 12) or 'normal'
    now = time.time()
    me = {'uid': user['user_id'], 'name': user['username'], 'lv': clamp_int(body.get('lv'), 1, 9999, 1),
          'ch': clamp_int(body.get('ch'), 0, 999, 0), 'seen': now}
    with _duo_lock:
        _duo_clean(now)
        for r in list(_DUO.values()):  # 한 사람은 방 하나만
            r['players'] = [p for p in r['players'] if p['uid'] != user['user_id']]
            if not r['players'] or r['owner'] == user['user_id']:
                r['state'] = 'closed'
        for _ in range(50):
            code = ''.join(secrets.choice(_DUO_CODE) for _ in range(4))
            if code not in _DUO:
                break
        _DUO[code] = {'code': code, 'owner': user['user_id'], 'owner_name': user['username'], 'floor': floor, 'diff': diff,
                      'state': 'wait', 'players': [me], 'msgs': [], 'seq': 0, 'touched': now}
        return jsonify(ok=True, room=_duo_view(_DUO[code], user['user_id']))


@app.route('/api/duo/join', methods=['POST'])
def duo_join():
    user = _current_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    body = request.get_json(silent=True) or {}
    code = clamp_text(body.get('code'), 8).upper()
    best = max(clamp_int(body.get('best'), 1, 1_000_000, 1), _duo_best(get_db(), user['user_id']))
    now = time.time()
    with _duo_lock:
        _duo_clean(now)
        r = _DUO.get(code)
        if not r or r['state'] == 'closed':
            return _bad('방을 찾지 못했어요. 코드를 확인해 주세요', 404)
        if any(p['uid'] == user['user_id'] for p in r['players']):
            return jsonify(ok=True, room=_duo_view(r, user['user_id']))
        if len(r['players']) >= 2 or r['state'] != 'wait':
            return _bad('이미 꽉 찬 방이에요', 409)
        if best < r['floor'] and r.get('kind', 'coop') == 'coop':
            return _bad('%d층까지 올라가 본 사람만 들어올 수 있어요 (내 최고 %d층)' % (r['floor'], best), 403)
        r['players'].append({'uid': user['user_id'], 'name': user['username'], 'lv': clamp_int(body.get('lv'), 1, 9999, 1),
                             'ch': clamp_int(body.get('ch'), 0, 999, 0), 'seen': now})
        r['touched'] = now
        r['seq'] += 1
        r['msgs'].append({'seq': r['seq'], 'from': '#', 'm': {'t': 'join', 'name': user['username']}})
        return jsonify(ok=True, room=_duo_view(r, user['user_id']))


@app.route('/api/duo/leave', methods=['POST'])
def duo_leave():
    user = _current_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    code = clamp_text((request.get_json(silent=True) or {}).get('code'), 8).upper()
    with _duo_lock:
        r = _DUO.get(code)
        if r:
            if r.get('kind') == 'pvp' and r.get('ranked') and r['state'] == 'play' and not r.get('settled'):
                other = next((p['uid'] for p in r['players'] if p['uid'] != user['user_id']), None)
                if other:
                    _pvp_settle(r, other, user['user_id'], '상대 기권')
            r['players'] = [p for p in r['players'] if p['uid'] != user['user_id']]
            r['seq'] += 1
            r['msgs'].append({'seq': r['seq'], 'from': '#', 'm': {'t': 'leave', 'name': user['username']}})
            if r['owner'] == user['user_id'] or not r['players']:
                r['state'] = 'closed'
            r['touched'] = time.time()
    return jsonify(ok=True)


_duo_ucache = {}


def _duo_user():
    """듀오 주고받기는 1초에 10번씩 와서, 로그인 확인(DB 조회)을 1분 동안 기억해 둔다"""
    auth = request.headers.get('Authorization', '')
    now = time.time()
    hit = _duo_ucache.get(auth)
    if hit and hit[1] > now:
        return hit[0]
    user = _current_user()
    if user:
        if len(_duo_ucache) > 500:
            _duo_ucache.clear()
        _duo_ucache[auth] = (user, now + 60)
    return user


@app.route('/api/duo/sync', methods=['POST'])
def duo_sync():
    """보낼 메시지(msgs)를 올리고, since 다음의 메시지를 받는다. 방장은 state='play'로 시작을 알린다."""
    user = _duo_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    body = request.get_json(silent=True) or {}
    code = clamp_text(body.get('code'), 8).upper()
    since = clamp_int(body.get('since'), 0, 2 ** 62, 0)
    msgs = body.get('msgs') if isinstance(body.get('msgs'), list) else []
    now = time.time()
    with _duo_lock:
        r = _DUO.get(code)
        if not r:
            return _bad('방이 사라졌어요', 404)
        me = next((p for p in r['players'] if p['uid'] == user['user_id']), None)
        if not me:
            return _bad('이 방에 없어요', 403)
        me['seen'] = now
        r['touched'] = now
        start_err = ''
        if body.get('start') and r['state'] == 'wait':
            if r['owner'] != user['user_id']:
                start_err = '방장만 시작할 수 있어요'
            elif len(r['players']) != 2:
                start_err = '동료가 방에 없어요'
            elif not all(p.get('ready') or p['uid'] == r['owner'] for p in r['players']):
                start_err = '상대가 아직 「준비 완료」를 누르지 않았어요'  # v94
            else:
                r['state'] = 'play'
        dd = clamp_text(body.get('diff'), 12)
        if dd in ('easy', 'normal', 'hard', 'extreme') and r['owner'] == user['user_id'] and r['state'] == 'wait':
            r['diff'] = dd  # 방장은 출발 전까지 난이도를 바꿀 수 있다
        if body.get('ch') is not None:
            me['ch'] = clamp_int(body.get('ch'), 0, 999, me['ch'])
        if body.get('ready') is not None and r['state'] == 'wait':  # v94 준비 완료
            me['ready'] = bool(body.get('ready'))
        for m in msgs[:20]:
            if isinstance(m, dict) and len(json.dumps(m)) < 20000:
                r['seq'] += 1
                r['msgs'].append({'seq': r['seq'], 'from': user['user_id'][:6], 'm': m})
        if len(r['msgs']) > _DUO_KEEP:
            r['msgs'] = r['msgs'][-_DUO_KEEP:]
        out = [x for x in r['msgs'] if x['seq'] > since and x['from'] != user['user_id'][:6]]
        return jsonify(ok=True, room=_duo_view(r, user['user_id']), msgs=out, seq=r['seq'], start_err=start_err)


# ---------------- v92 PvP 결투 ----------------
# 빠른 대전: 기다리는 사람과 바로 짝(메모리 대기열). 친구 대전: 방 코드(골드 없음).
# 결과: 두 사람이 같은 결과를 보내면 확정 → 이긴 사람 +판돈, 진 사람 -판돈(장부 pvp_ledger, 게임이 받아 가서 골드에 반영).
# 판돈 = 두 사람 중 골드가 적은 쪽의 10% (최소 20, 최대 5000, 그보다 골드가 적으면 가진 만큼).
_PVPQ = {}
_PVPMATCH = {}


def _pvp_gold(db, uid):
    row = db.execute('SELECT gold FROM player_stats WHERE user_id=?', (uid,)).fetchone()
    return int(row['gold']) if row else 0


def _pvp_stake(db, a, b):
    m = min(_pvp_gold(db, a), _pvp_gold(db, b))
    return max(0, min(m, max(20, min(5000, round(m * 0.1)))))


PVP_TIERS = [(0, 'bronze', '브론즈'), (1100, 'silver', '실버'), (1250, 'gold', '골드'), (1400, 'plat', '플래티넘'),
             (1550, 'dia', '다이아'), (1700, 'master', '마스터')]
PVP_SEASON_REWARD = {'bronze': (60, 1500), 'silver': (150, 3000), 'gold': (300, 6000), 'plat': (500, 10000),
                     'dia': (800, 16000), 'master': (1500, 30000)}  # v111 넉넉하게(예전의 약 2.5~3배)


def _pvp_season(t=None):
    return time.strftime('%Y-%m', time.gmtime(t or time.time()))


def _pvp_tier(rating):
    cur = PVP_TIERS[0]
    for t in PVP_TIERS:
        if rating >= t[0]:
            cur = t
    return {'key': cur[1], 'name': cur[2], 'min': cur[0]}


def _pvp_rank_get(db, uid):
    """이번 시즌 내 점수 줄(없으면 만든다). 지난 시즌 기록이 있으면 절반만 남기고(1000 기준) 시즌 보상을 만든다"""
    season = _pvp_season()
    row = db.execute('SELECT rating, best, wins, losses FROM pvp_rank WHERE user_id=? AND season=?', (uid, season)).fetchone()
    if row:
        return dict(row, season=season)
    prev = db.execute('SELECT season, rating, best, wins, losses FROM pvp_rank WHERE user_id=? AND season<? ORDER BY season DESC LIMIT 1',
                      (uid, season)).fetchone()
    rating = 1000
    now = time.time()
    if prev:
        rating = 1000 + (int(prev['rating']) - 1000) // 2
        if prev['wins'] + prev['losses'] >= 5 and not db.execute('SELECT 1 FROM pvp_rewards WHERE user_id=? AND season=?',
                                                                   (uid, prev['season'])).fetchone():
            tk = _pvp_tier(int(prev['best']))['key']
            dia, gold = PVP_SEASON_REWARD[tk]
            db.execute('INSERT INTO pvp_rewards (id, user_id, season, tier, dia, gold, claimed, created_at) VALUES (?, ?, ?, ?, ?, ?, 0, ?)',
                       (secrets.token_hex(8), uid, prev['season'], tk, dia, gold, now))
    db.execute('INSERT INTO pvp_rank (user_id, season, rating, best, wins, losses, updated_at) VALUES (?, ?, ?, ?, 0, 0, ?)',
               (uid, season, rating, rating, now))
    db.commit()
    return {'rating': rating, 'best': rating, 'wins': 0, 'losses': 0, 'season': season}


def _pvp_rank_view(db, uid):
    rk = _pvp_rank_get(db, uid)
    pos = db.execute('SELECT COUNT(*) AS c FROM pvp_rank WHERE season=? AND rating>?', (rk['season'], rk['rating'])).fetchone()['c'] + 1
    t = time.gmtime()
    nxt = time.mktime((t.tm_year + (t.tm_mon == 12), t.tm_mon % 12 + 1, 1, 0, 0, 0, 0, 0, 0)) - time.timezone
    tier = _pvp_tier(rk['rating'])
    up = next((x for x in PVP_TIERS if x[0] > rk['rating']), None)
    return dict(rk, tier=tier, best_tier=_pvp_tier(rk['best']), pos=pos, ends=nxt,
                next={'name': up[2], 'need': up[0] - rk['rating']} if up else None)


def _pvp_settle(r, winner, loser, note):
    """(락 안에서 부름) 한 번만 확정: 장부 · 전적"""
    if r.get('settled'):
        return
    r['settled'] = {'winner': winner, 'loser': loser}
    stake = int(r.get('stake') or 0)
    now = time.time()
    db = DB()
    try:
        if r.get('ranked'):  # v94 등급 점수(엘로): 비슷한 상대면 ±16, 강한 상대를 이기면 더 많이
            a, b = _pvp_rank_get(db, winner), _pvp_rank_get(db, loser)
            ew = 1 / (1 + 10 ** ((b['rating'] - a['rating']) / 400))
            d = max(6, round(32 * (1 - ew)))
            na, nb = a['rating'] + d, max(0, b['rating'] - d)
            season = _pvp_season()
            db.execute('UPDATE pvp_rank SET rating=?, best=?, wins=wins+1, updated_at=? WHERE user_id=? AND season=?',
                       (na, max(a['best'], na), now, winner, season))
            db.execute('UPDATE pvp_rank SET rating=?, losses=losses+1, updated_at=? WHERE user_id=? AND season=?',
                       (nb, now, loser, season))
            r['settled']['rating'] = {winner: [a['rating'], na], loser: [b['rating'], nb]}
        for uid, delta, w in ((winner, stake, 1), (loser, -stake, 0)):
            if stake:
                db.execute('INSERT INTO pvp_ledger (id, user_id, delta, note, created_at) VALUES (?, ?, ?, ?, ?)',
                           (secrets.token_hex(8), uid, delta, note, now))
            if db.execute('SELECT 1 FROM pvp_stats WHERE user_id=?', (uid,)).fetchone():
                db.execute('UPDATE pvp_stats SET wins=wins+?, losses=losses+?, gold_won=gold_won+?, updated_at=? WHERE user_id=?',
                           (w, 1 - w, delta if w else 0, now, uid))
            else:
                db.execute('INSERT INTO pvp_stats (user_id, wins, losses, gold_won, updated_at) VALUES (?, ?, ?, ?, ?)',
                           (uid, w, 1 - w, delta if w else 0, now))
        db.commit()
    finally:
        db.close()


def _pvp_room(code, owner, players, ranked, stake, state):
    now = time.time()
    _DUO[code] = {'code': code, 'owner': owner['uid'], 'owner_name': owner['name'], 'floor': 10 * secrets.randbelow(70) + 5,
                  'diff': 'normal', 'state': state, 'players': players, 'msgs': [], 'seq': 0, 'touched': now,
                  'kind': 'pvp', 'ranked': ranked, 'stake': stake, 'claims': {}}
    return _DUO[code]


def _new_code():
    for _ in range(50):
        code = ''.join(secrets.choice(_DUO_CODE) for _ in range(4))
        if code not in _DUO:
            return code
    return code


@app.route('/api/pvp/queue', methods=['POST'])
def pvp_queue():
    """빠른 대전 찾기(1초마다 부름). 짝이 생기면 room을 돌려준다"""
    user = _duo_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    body = request.get_json(silent=True) or {}
    uid = user['user_id']
    now = time.time()
    me = {'uid': uid, 'name': user['username'], 'lv': clamp_int(body.get('lv'), 1, 9999, 1),
          'ch': clamp_int(body.get('ch'), 0, 999, 0), 'seen': now}
    with _duo_lock:
        _duo_clean(now)
        code = _PVPMATCH.pop(uid, None)
        if code and code in _DUO:
            return jsonify(ok=True, room=_duo_view(_DUO[code], uid))
        for k in [k for k, q in _PVPQ.items() if now - q['seen'] > 6]:
            del _PVPQ[k]
        other = next((q for k, q in _PVPQ.items() if k != uid), None)
        if not other:
            _PVPQ[uid] = me
            return jsonify(ok=True, waiting=True, queue=len(_PVPQ))
        del _PVPQ[other['uid']]
        _PVPQ.pop(uid, None)
        db = get_db()
        stake = _pvp_stake(db, uid, other['uid'])
        other = dict(other, seen=now)
        r = _pvp_room(_new_code(), other, [other, me], True, stake, 'play')
        _PVPMATCH[other['uid']] = r['code']
        return jsonify(ok=True, room=_duo_view(r, uid))


@app.route('/api/pvp/cancel', methods=['POST'])
def pvp_cancel():
    user = _duo_user()
    if user:
        with _duo_lock:
            _PVPQ.pop(user['user_id'], None)
            _PVPMATCH.pop(user['user_id'], None)
    return jsonify(ok=True)


@app.route('/api/pvp/create', methods=['POST'])
def pvp_create():
    """친구 대전 방(골드 주고받기 없음)"""
    user = _duo_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    body = request.get_json(silent=True) or {}
    now = time.time()
    me = {'uid': user['user_id'], 'name': user['username'], 'lv': clamp_int(body.get('lv'), 1, 9999, 1),
          'ch': clamp_int(body.get('ch'), 0, 999, 0), 'seen': now}
    with _duo_lock:
        _duo_clean(now)
        for r in list(_DUO.values()):
            r['players'] = [p for p in r['players'] if p['uid'] != user['user_id']]
            if not r['players'] or r['owner'] == user['user_id']:
                r['state'] = 'closed'
        r = _pvp_room(_new_code(), me, [me], False, 0, 'wait')
        return jsonify(ok=True, room=_duo_view(r, user['user_id']))


@app.route('/api/pvp/result', methods=['POST'])
def pvp_result():
    """내가 본 결과(win: true/false). 두 사람이 맞으면 확정. 상대가 20초 넘게 연결이 없으면 내 결과로 확정"""
    user = _duo_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    body = request.get_json(silent=True) or {}
    code = clamp_text(body.get('code'), 8).upper()
    win = bool(body.get('win'))
    uid = user['user_id']
    now = time.time()
    with _duo_lock:
        r = _DUO.get(code)
        if not r or r.get('kind') != 'pvp':
            return _bad('방이 사라졌어요', 404)
        if not any(p['uid'] == uid for p in r['players']) and not (r.get('settled') and uid in r['settled'].values()):
            return _bad('이 방에 없어요', 403)
        r.setdefault('claims', {})[uid] = win
        other = next((p for p in r['players'] if p['uid'] != uid), None)
        if r.get('ranked') and not r.get('settled'):
            oc = r['claims'].get(other['uid']) if other else None
            if other and oc is not None:
                if oc != win:
                    _pvp_settle(r, uid if win else other['uid'], other['uid'] if win else uid, '결투')
                else:
                    r['settled'] = {'void': True}
            elif other and win and now - other['seen'] > 20:
                _pvp_settle(r, uid, other['uid'], '상대 연결 끊김')
        st = r.get('settled') or {}
        rt = (st.get('rating') or {}).get(uid) if st else None
        res = {'settled': bool(st) and not st.get('void'), 'void': bool(st.get('void')), 'stake': r.get('stake', 0),
               'rating': rt, 'tier': _pvp_tier(rt[1]) if rt else None,
               'win': st.get('winner') == uid if st and not st.get('void') else None}
        return jsonify(ok=True, **res)


@app.route('/api/pvp/ledger', methods=['POST'])
def pvp_ledger():
    """아직 게임에 반영하지 않은 골드 변화를 받아 가고 지운다 + 내 전적"""
    user = _duo_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    db = get_db()
    rows = db.execute('SELECT id, delta, note FROM pvp_ledger WHERE user_id=?', (user['user_id'],)).fetchall()
    for x in rows:
        db.execute('DELETE FROM pvp_ledger WHERE id=?', (x['id'],))
    db.commit()
    st = db.execute('SELECT wins, losses, gold_won FROM pvp_stats WHERE user_id=?', (user['user_id'],)).fetchone()
    rank = _pvp_rank_view(db, user['user_id'])
    rw = db.execute('SELECT id, season, tier, dia, gold FROM pvp_rewards WHERE user_id=? AND claimed=0', (user['user_id'],)).fetchall()
    for x in rw:
        db.execute('UPDATE pvp_rewards SET claimed=1 WHERE id=?', (x['id'],))
    db.commit()
    return jsonify(ok=True, items=[{'delta': int(x['delta']), 'note': x['note']} for x in rows], rank=rank,
                   rewards=[{'season': x['season'], 'tier': _pvp_tier(next(t[0] for t in PVP_TIERS if t[1] == x['tier']))['name'],
                             'dia': int(x['dia']), 'gold': int(x['gold'])} for x in rw],
                   stats={'wins': st['wins'], 'losses': st['losses'], 'gold_won': int(st['gold_won'])} if st else {'wins': 0, 'losses': 0, 'gold_won': 0})


# ---------------- v94 친구 · 초대 ----------------
# 접속 여부와 「지금 하는 일」은 메모리(_SEEN: 마지막으로 친구 목록을 받아 간 시각 · 위치). 초대도 메모리(_INV, 2분).
_SEEN = {}
_INV = {}
FRIEND_MAX = 50


def _uid_by_name(db, name):
    row = db.execute('SELECT user_id, username FROM users WHERE name_key=?', (clamp_text(name, 40).strip().lower(),)).fetchone()
    return (row['user_id'], row['username']) if row else (None, None)


def _friend_rows(db, uid):
    return db.execute('SELECT f.friend_id, f.status, u.username, s.level, s.floor FROM friends f JOIN users u ON u.user_id=f.friend_id '
                      'LEFT JOIN player_stats s ON s.user_id=f.friend_id WHERE f.user_id=?', (uid,)).fetchall()


_SEEN_SAVED = {}


def _seen_save(db, uid, now):
    """마지막 접속 시각을 DB에 적는다(1분에 한 번만)"""
    if now - _SEEN_SAVED.get(uid, 0) < 60:
        return
    _SEEN_SAVED[uid] = now
    if len(_SEEN_SAVED) > 5000:
        _SEEN_SAVED.clear()
    if db.execute('SELECT 1 FROM user_seen WHERE user_id=?', (uid,)).fetchone():
        db.execute('UPDATE user_seen SET seen_at=? WHERE user_id=?', (now, uid))
    else:
        db.execute('INSERT INTO user_seen (user_id, seen_at) VALUES (?, ?)', (uid, now))
    db.commit()


def _seen_many(db, ids):
    if not ids:
        return {}
    q = ','.join('?' * len(ids))
    return {r['user_id']: r['seen_at'] for r in db.execute('SELECT user_id, seen_at FROM user_seen WHERE user_id IN (%s)' % q, tuple(ids)).fetchall()}


def _dm_room(a, b):
    return 'dm:' + '|'.join(sorted([a, b]))


def _dm_last(db, uid, ids):
    """친구별 마지막 대화 번호와 보낸 사람(안 읽은 대화 표시용)"""
    out = {}
    for fid in ids:
        r = db.execute('SELECT id, user_id FROM chat_msgs WHERE room=? ORDER BY id DESC LIMIT 1', (_dm_room(uid, fid),)).fetchone()
        if r:
            out[fid] = [int(r['id']), 'me' if r['user_id'] == uid else 'them']
    return out


@app.route('/api/friends', methods=['POST'])
def friends_list():
    """친구 목록 · 받은 신청 · 받은 초대. where(지금 하는 일)를 보내면 접속 표시가 갱신된다"""
    user = _duo_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    uid = user['user_id']
    body = request.get_json(silent=True) or {}
    now = time.time()
    _SEEN[uid] = (now, clamp_text(body.get('where'), 30) or '로비')
    db = get_db()
    _seen_save(db, uid, now)
    out, sent = [], []
    rows = _friend_rows(db, uid)
    lasts = _seen_many(db, [x['friend_id'] for x in rows if x['status'] == 'accepted'])
    dms = _dm_last(db, uid, [x['friend_id'] for x in rows if x['status'] == 'accepted'])
    for x in rows:
        if x['status'] == 'accepted':
            seen = _SEEN.get(x['friend_id'])
            on = bool(seen and now - seen[0] < 40)
            out.append({'name': x['username'], 'lv': x['level'] or 1, 'floor': x['floor'] or 1,
                        'online': on, 'where': seen[1] if on else '',
                        'last': now if on else (seen[0] if seen else lasts.get(x['friend_id'], 0)),
                        'dm': dms.get(x['friend_id'], [0, ''])[0], 'dmFrom': dms.get(x['friend_id'], [0, ''])[1]})
        else:
            sent.append(x['username'])
    inc = [r['username'] for r in db.execute('SELECT u.username FROM friends f JOIN users u ON u.user_id=f.user_id '
                                             'WHERE f.friend_id=? AND f.status=?', (uid, 'pending')).fetchall()]
    out.sort(key=lambda f: (not f['online'], f['name']))
    with _duo_lock:
        inv = [i for i in _INV.get(uid, []) if now - i['t'] < 120 and i['code'] in _DUO and _DUO[i['code']]['state'] == 'wait']
        _INV[uid] = inv
    w = _WATCH.get(uid)
    watched = sum(1 for t in (w['viewers'].values() if w else []) if now - t < 8)
    return jsonify(ok=True, friends=out, incoming=inc, sent=sent, watched=watched,
                   invites=[{'id': i['id'], 'from': i['from'], 'kind': i['kind'], 'code': i['code']} for i in inv])


@app.route('/api/friends/request', methods=['POST'])
def friends_request():
    user = _duo_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    uid = user['user_id']
    db = get_db()
    fid, fname = _uid_by_name(db, (request.get_json(silent=True) or {}).get('name'))
    if not fid:
        return _bad('그런 이름의 플레이어가 없어요', 404)
    if fid == uid:
        return _bad('나 자신은 친구로 추가할 수 없어요', 400)
    if db.execute('SELECT COUNT(*) AS c FROM friends WHERE user_id=? AND status=?', (uid, 'accepted')).fetchone()['c'] >= FRIEND_MAX:
        return _bad('친구는 %d명까지예요' % FRIEND_MAX, 400)
    mine = db.execute('SELECT status FROM friends WHERE user_id=? AND friend_id=?', (uid, fid)).fetchone()
    if mine and mine['status'] == 'accepted':
        return jsonify(ok=True, status='friends', name=fname)
    back = db.execute('SELECT status FROM friends WHERE user_id=? AND friend_id=?', (fid, uid)).fetchone()
    now = time.time()
    if back:  # 상대가 먼저 신청했으면 바로 친구
        db.execute('UPDATE friends SET status=? WHERE user_id=? AND friend_id=?', ('accepted', fid, uid))
        if mine:
            db.execute('UPDATE friends SET status=? WHERE user_id=? AND friend_id=?', ('accepted', uid, fid))
        else:
            db.execute('INSERT INTO friends (user_id, friend_id, status, created_at) VALUES (?, ?, ?, ?)', (uid, fid, 'accepted', now))
        db.commit()
        return jsonify(ok=True, status='friends', name=fname)
    if not mine:
        db.execute('INSERT INTO friends (user_id, friend_id, status, created_at) VALUES (?, ?, ?, ?)', (uid, fid, 'pending', now))
        db.commit()
    return jsonify(ok=True, status='sent', name=fname)


@app.route('/api/friends/respond', methods=['POST'])
def friends_respond():
    user = _duo_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    uid = user['user_id']
    body = request.get_json(silent=True) or {}
    db = get_db()
    fid, fname = _uid_by_name(db, body.get('name'))
    if not fid or not db.execute('SELECT 1 FROM friends WHERE user_id=? AND friend_id=? AND status=?', (fid, uid, 'pending')).fetchone():
        return _bad('받은 친구 신청이 없어요', 404)
    if body.get('accept'):
        if db.execute('SELECT COUNT(*) AS c FROM friends WHERE user_id=? AND status=?', (uid, 'accepted')).fetchone()['c'] >= FRIEND_MAX:
            return _bad('친구는 %d명까지예요' % FRIEND_MAX, 400)
        db.execute('UPDATE friends SET status=? WHERE user_id=? AND friend_id=?', ('accepted', fid, uid))
        db.execute('DELETE FROM friends WHERE user_id=? AND friend_id=?', (uid, fid))
        db.execute('INSERT INTO friends (user_id, friend_id, status, created_at) VALUES (?, ?, ?, ?)', (uid, fid, 'accepted', time.time()))
    else:
        db.execute('DELETE FROM friends WHERE user_id=? AND friend_id=?', (fid, uid))
    db.commit()
    return jsonify(ok=True, name=fname)


@app.route('/api/friends/remove', methods=['POST'])
def friends_remove():
    user = _duo_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    db = get_db()
    fid, _ = _uid_by_name(db, (request.get_json(silent=True) or {}).get('name'))
    if fid:
        db.execute('DELETE FROM friends WHERE (user_id=? AND friend_id=?) OR (user_id=? AND friend_id=?)', (user['user_id'], fid, fid, user['user_id']))
        db.commit()
    return jsonify(ok=True)


@app.route('/api/friends/invite', methods=['POST'])
def friends_invite():
    """내가 있는 방(듀오 · 결투)으로 친구를 부른다"""
    user = _duo_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    uid = user['user_id']
    body = request.get_json(silent=True) or {}
    db = get_db()
    fid, fname = _uid_by_name(db, body.get('name'))
    if not fid:
        return _bad('그런 이름이 없어요', 404)
    is_friend = bool(db.execute('SELECT 1 FROM friends WHERE user_id=? AND friend_id=? AND status=?', (uid, fid, 'accepted')).fetchone())
    if not is_friend:
        # v111 광장: 둘 다 광장에 있으면 친구가 아니어도 신청할 수 있다(10초에 한 번, 「신청 받지 않기」면 막힘)
        err = _plaza_can_invite(uid, fid)
        if err:
            return _bad(err[0], err[1])
    code = clamp_text(body.get('code'), 8).upper()
    with _duo_lock:
        r = _DUO.get(code)
        if not r or r['state'] != 'wait' or not any(p['uid'] == uid for p in r['players']):
            return _bad('방이 없어요. 방을 먼저 만들어 주세요', 404)
        if len(r['players']) >= 2:
            return _bad('방이 이미 꽉 찼어요', 409)
        lst = [i for i in _INV.get(fid, []) if i['from_uid'] != uid]
        lst.append({'id': secrets.token_hex(4), 'from': user['username'], 'from_uid': uid, 'kind': r.get('kind', 'coop'), 'code': code, 't': time.time()})
        _INV[fid] = lst[-5:]
    return jsonify(ok=True, name=fname)


# ---------------- v111 광장 ----------------
# 메모리. 채널(광장 1, 2, …)마다 최대 PLAZA_CAP명. 각자 0.2~0.35초마다 내 위치를 올리고 남들 위치를 받아 간다.
_PLAZA = {}          # 채널 번호 -> {user_id: {'name', 't', 'm'(위치 · 모습), 'noinv'}}
_plaza_lock = threading.Lock()
_PLAZA_INV_T = {}    # 친구가 아닌 사람에게 보낸 마지막 신청 시각
PLAZA_CAP = 30
PLAZA_TTL = 8        # 이 시간 동안 소식이 없으면 광장에서 뺀다
_PLAZA_KEYS = ('x', 'y', 'fx', 'fy', 'w', 'ch', 'wp', 'sk', 'pt', 'pv', 'lv', 'ts', 'n', 'emo', 'dn')


def _plaza_prune(now):
    for ch in list(_PLAZA):
        room = _PLAZA[ch]
        for uid in [u for u, p in room.items() if now - p['t'] > PLAZA_TTL]:
            room.pop(uid, None)
        if not room and ch != 1:
            _PLAZA.pop(ch, None)


def _plaza_find(uid):
    for ch, room in _PLAZA.items():
        if uid in room:
            return ch
    return None


def _plaza_can_invite(uid, fid):
    """친구가 아닌 사람에게 결투 · 듀오 신청: 둘 다 광장에 있어야 하고 10초에 한 번"""
    now = time.time()
    with _plaza_lock:
        _plaza_prune(now)
        ch_me, ch_to = _plaza_find(uid), _plaza_find(fid)
        if ch_me is None or ch_to is None:
            return ('친구에게만 초대를 보낼 수 있어요(광장에서는 누구에게나)', 403)
        if _PLAZA[ch_to][fid].get('noinv'):
            return ('이 사람은 지금 신청을 받지 않아요', 403)
        if now - _PLAZA_INV_T.get(uid, 0) < 10:
            return ('신청은 10초에 한 번만 보낼 수 있어요', 429)
        _PLAZA_INV_T[uid] = now
        if len(_PLAZA_INV_T) > 5000:
            _PLAZA_INV_T.clear()
    return None


@app.route('/api/plaza/sync', methods=['POST'])
def plaza_sync():
    """내 위치 · 모습을 올리고 같은 광장 사람들을 받는다. 처음엔 자리가 있는 광장으로, 꽉 차면 새 광장"""
    user = _duo_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    uid = user['user_id']
    body = request.get_json(silent=True) or {}
    me = body.get('me') if isinstance(body.get('me'), dict) else {}
    m = {}
    for k in _PLAZA_KEYS:
        v = me.get(k)
        if isinstance(v, bool) or isinstance(v, (int, float)):
            m[k] = v if not isinstance(v, float) else round(v, 1)
        elif isinstance(v, str):
            m[k] = v[:24]
    want = clamp_int(body.get('room'), 0, 999, 0)
    now = time.time()
    with _plaza_lock:
        _plaza_prune(now)
        ch = _plaza_find(uid)
        if want and ch != want and want in _PLAZA and len(_PLAZA[want]) < PLAZA_CAP:
            if ch is not None:
                _PLAZA[ch].pop(uid, None)
            ch = want
        if ch is None:
            ch = next((c for c in sorted(_PLAZA) if len(_PLAZA[c]) < PLAZA_CAP), None)
            if ch is None:
                ch = max(_PLAZA or {0: 0}) + 1
        room = _PLAZA.setdefault(ch, {})
        room[uid] = {'name': user['username'], 't': now, 'm': m, 'noinv': bool(body.get('noinv'))}
        others = [dict(p['m'], name=p['name'], age=round(now - p['t'], 2)) for u, p in room.items() if u != uid]
        rooms = [{'room': c, 'n': len(r)} for c, r in sorted(_PLAZA.items())]
    _SEEN[uid] = (now, '⛲ 광장 ' + str(ch))
    invites = [{k: i[k] for k in ('id', 'from', 'kind', 'code')} for i in _INV.get(uid, []) if now - i['t'] < 120]
    return jsonify(ok=True, room=ch, cap=PLAZA_CAP, players=others, rooms=rooms, invites=invites)


@app.route('/api/plaza/leave', methods=['POST'])
def plaza_leave():
    user = _duo_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    with _plaza_lock:
        ch = _plaza_find(user['user_id'])
        if ch is not None:
            _PLAZA[ch].pop(user['user_id'], None)
    return jsonify(ok=True)


@app.route('/api/plaza/info', methods=['POST'])
def plaza_info():
    """광장에서 누른 사람의 정보: 레벨 · 탑 최고 층 · 결투 등급 · 장비 · 친구 사이"""
    user = _duo_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    db = get_db()
    fid, fname = _uid_by_name(db, (request.get_json(silent=True) or {}).get('name'))
    if not fid:
        return _bad('그런 이름이 없어요', 404)
    st = db.execute('SELECT level, floor FROM player_stats WHERE user_id=?', (fid,)).fetchone()
    rk = db.execute('SELECT rating, wins, losses FROM pvp_rank WHERE user_id=? AND season=?', (fid, _pvp_season())).fetchone()
    lk = db.execute('SELECT look FROM player_look WHERE user_id=?', (fid,)).fetchone()
    fr = db.execute('SELECT status FROM friends WHERE user_id=? AND friend_id=?', (user['user_id'], fid)).fetchone()
    look = None
    if lk:
        try:
            look = json.loads(lk['look'])
        except Exception:
            look = None
    pvp = None
    if rk and rk['wins'] + rk['losses'] > 0:
        pvp = {'tier': _pvp_tier(rk['rating'])['name'], 'rating': rk['rating'], 'wins': rk['wins'], 'losses': rk['losses']}
    with _plaza_lock:
        ch = _plaza_find(fid)
        noinv = bool(ch is not None and _PLAZA[ch][fid].get('noinv'))
    return jsonify(ok=True, name=fname, me=fid == user['user_id'], level=st['level'] if st else 1, floor=st['floor'] if st else 1,
                   pvp=pvp, look=look, friend=fr['status'] if fr else '', in_plaza=ch is not None, noinv=noinv)


# v95 관전: 게임 중인 사람이 화면 상태를 올리고(push, 보는 사람이 있을 때만), 친구가 받아 간다(pull). 메모리.
_WATCH = {}


@app.route('/api/watch/push', methods=['POST'])
def watch_push():
    user = _duo_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    msgs = (request.get_json(silent=True) or {}).get('msgs')
    msgs = msgs if isinstance(msgs, list) else []
    now = time.time()
    with _duo_lock:
        w = _WATCH.setdefault(user['user_id'], {'seq': 0, 'msgs': [], 'viewers': {}, 't': 0})
        if msgs:  # 빈 push는 「보는 사람 있나?」 확인용(v99) — 화면을 보낸 시각은 바꾸지 않음
            w['t'] = now
        for m in msgs[:20]:
            if isinstance(m, dict) and len(json.dumps(m)) < 90000:  # 보스전 화면 사진(JPEG) 포함
                w['seq'] += 1
                w['msgs'].append({'seq': w['seq'], 'm': m})
        w['msgs'] = w['msgs'][-90:]
        w['viewers'] = {k: t for k, t in w['viewers'].items() if now - t < 8}
        return jsonify(ok=True, viewers=len(w['viewers']), sig=_sig_take(user['user_id']))


@app.route('/api/watch/pull', methods=['POST'])
def watch_pull():
    user = _duo_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    body = request.get_json(silent=True) or {}
    db = get_db()
    fid, fname = _uid_by_name(db, body.get('name'))
    if not fid or (not db.execute('SELECT 1 FROM friends WHERE user_id=? AND friend_id=? AND status=?', (user['user_id'], fid, 'accepted')).fetchone()
                   and fid not in _top3_ids(db)):
        return _bad('친구나 순위 1~3위만 관전할 수 있어요', 403)
    since = clamp_int(body.get('since'), 0, 2 ** 62, 0)
    now = time.time()
    with _duo_lock:
        w = _WATCH.setdefault(fid, {'seq': 0, 'msgs': [], 'viewers': {}, 't': 0})
        w['viewers'][user['user_id']] = now
        out = [x for x in w['msgs'] if x['seq'] > since]
        seen = _SEEN.get(fid)
        return jsonify(ok=True, name=fname, msgs=out, seq=w['seq'], live=now - w['t'] < 4,
                       where=seen[1] if seen and now - seen[0] < 40 else '', sig=_sig_take(user['user_id']),
                       viewers=len([1 for t in w['viewers'].values() if now - t < 8]))


# v99 관전 영상(WebRTC) 연결 쪽지: 친구끼리 연결 정보(offer · answer)를 주고받는 우편함. 받는 사람이 push/pull 할 때 가져감. 메모리.
_SIG = {}


def _sig_take(uid):
    now = time.time()
    lst = [x for x in _SIG.pop(uid, []) if now - x['t'] < 30]
    return [{'from': x['from'], 'd': x['d']} for x in lst]


@app.route('/api/watch/sig', methods=['POST'])
def watch_sig():
    user = _duo_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    body = request.get_json(silent=True) or {}
    d = body.get('d')
    if not isinstance(d, dict) or len(json.dumps(d)) > 20000:
        return _bad('잘못된 쪽지예요', 400)
    db = get_db()
    fid, fname = _uid_by_name(db, body.get('to'))
    if not fid or (not db.execute('SELECT 1 FROM friends WHERE user_id=? AND friend_id=? AND status=?', (user['user_id'], fid, 'accepted')).fetchone()
                   and fid not in _top3_ids(db) and user['user_id'] not in _top3_ids(db)):
        return _bad('친구에게만 보낼 수 있어요', 403)
    with _duo_lock:
        lst = _SIG.setdefault(fid, [])
        lst.append({'from': user['username'], 'd': d, 't': time.time()})
        _SIG[fid] = lst[-20:]
    return jsonify(ok=True)


@app.route('/api/friends/invite/dismiss', methods=['POST'])
def friends_invite_dismiss():
    user = _duo_user()
    if user:
        iid = clamp_text((request.get_json(silent=True) or {}).get('id'), 16)
        with _duo_lock:
            _INV[user['user_id']] = [i for i in _INV.get(user['user_id'], []) if i['id'] != iid]
    return jsonify(ok=True)


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



def _latest_game_file(game_dir):
    """game 폴더에서 번호가 가장 큰 BeatBlade-NN.html 이름 (새 버전을 올리면 /play도 저절로 따라감)"""
    best, best_n = 'BeatBlade-53.html', -1
    for name in os.listdir(game_dir):
        m = re.fullmatch(r'BeatBlade-(\d+)\.html', name)
        if m and int(m.group(1)) > best_n:
            best, best_n = name, int(m.group(1))
    return best


# Google sign-in uses verified ID tokens + one-use, session-bound nonces.
@app.route('/play')
@app.route('/play/')
def play():
    game_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'game')
    resp = send_from_directory(game_dir, _latest_game_file(game_dir))
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
        _note_tester_email(db, user['user_id'], info)
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
    _note_tester_email(db, row['user_id'], info)
    resp = jsonify(ok=True, token=token, username=row['username'], google_linked=True,
                   need_name=_needs_name(row['username']))
    resp.headers['Cache-Control'] = 'no-store'
    return resp



@app.route('/google-bridge')
def google_bridge():
    mode = request.args.get('mode', 'login') if request.args.get('mode') in ('login','link') else 'login'
    # This page is hosted on the verified Render origin. It returns only the
    # short-lived game session result to the opener via postMessage.
    return render_template_string(r'''<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>BeatBlade Google 로그인</title>
<style>body{margin:0;background:#081217;color:#eaf6ef;font:16px system-ui,sans-serif;display:grid;place-items:center;min-height:100vh}.box{width:min(390px,calc(100% - 32px));padding:24px;border:2px solid #80e8b0;border-radius:16px;background:#12242c;text-align:center;box-shadow:0 10px 40px #0008}h2{margin:0 0 10px}.note{color:#b9d7c9;font-size:13px;line-height:1.5;margin:10px 0 18px}.err{color:#ffb2a8;margin-top:14px;font-size:13px}</style>
<div class="box"><h2>👤 BeatBlade Google 로그인</h2><div id="note" class="note">Google 버튼을 준비하는 중…</div><div id="g"></div><div id="err" class="err"></div></div>
<script src="https://accounts.google.com/gsi/client" async></script><script>
const mode={{mode|tojson}}, base=location.origin;let nonce='';
const token=mode==='link'?decodeURIComponent((location.hash.match(/token=([^&]+)/)||[])[1]||''):'';if(location.hash)history.replaceState(null,'',location.pathname+location.search);
const note=document.getElementById('note'),err=document.getElementById('err');
function fail(x){err.textContent=x;note.textContent='창을 닫고 게임에서 다시 시도해 주세요.'}
async function start(){try{
 const headers={'Content-Type':'application/json'};if(mode==='link')headers.Authorization='Bearer '+token;
 const r=await fetch(base+'/api/google/challenge',{method:'POST',headers,body:JSON.stringify({mode})});
 const j=await r.json();if(!r.ok||!j.nonce)throw Error(j.error||'로그인 요청을 만들지 못했어요');nonce=j.nonce;
 const wait=()=>{if(!window.google||!google.accounts){setTimeout(wait,80);return}google.accounts.id.initialize({client_id:j.client_id,nonce,auto_select:false,ux_mode:'popup',callback:finish});google.accounts.id.renderButton(document.getElementById('g'),{theme:'outline',size:'large',text:mode==='link'?'continue_with':'signin_with',locale:'ko',width:280});note.textContent=mode==='link'?'연결할 Google 계정을 선택해 주세요.':'로그인할 Google 계정을 선택해 주세요.'};wait();
 }catch(e){fail(e.message)}}
async function finish(response){try{note.textContent='인증 확인 중…';const h={'Content-Type':'application/json'};if(mode==='link')h.Authorization='Bearer '+token;const r=await fetch(base+'/api/google/'+mode,{method:'POST',headers:h,body:JSON.stringify({credential:response.credential,nonce})});const j=await r.json();if(!r.ok||!j.ok)throw Error(j.error||'Google 로그인에 실패했어요');window.opener?.postMessage({type:'beatblade-google-auth',ok:true,mode,token:j.token||'',username:j.username||'',google_linked:!!j.google_linked},'*');window.close();}catch(e){fail(e.message)}}start();
</script></html>''', mode=mode)

# =====================================================================
# 구글 플레이 앱(TWA) 준비: 앱 설정 파일 · 오프라인 저장 · 아이콘 · 앱 연결 확인 ·
# 개인정보처리방침 · 계정 삭제
# 안내 문서: game/구글플레이_출시_안내.md
# =====================================================================
APP_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'game', 'app')
# PWABuilder가 알려 주는 앱 패키지 이름과 서명 지문(SHA-256)을 Render 환경변수에 넣는다.
TWA_PACKAGE = os.environ.get('TWA_PACKAGE', '').strip()
TWA_SHA256 = [x.strip() for x in os.environ.get('TWA_SHA256', '').split(',') if x.strip()]

APP_MANIFEST = {
    'name': 'BEAT BLADE · MACHINA',
    'short_name': 'BEAT BLADE',
    'description': '박자에 맞춰 베는 리듬 액션. 70명의 보스와 7개의 챕터.',
    'lang': 'ko',
    'id': '/play',
    'start_url': '/play?source=app',
    'scope': '/',
    'display': 'fullscreen',
    'orientation': 'landscape',
    'background_color': '#07060f',
    'theme_color': '#07060f',
    'categories': ['games', 'music'],
    'icons': [
        {'src': '/app/icon-192.png', 'sizes': '192x192', 'type': 'image/png', 'purpose': 'any'},
        {'src': '/app/icon-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'any'},
        {'src': '/app/icon-maskable-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'maskable'},
    ],
}

# 오프라인 저장(서비스 워커): 게임 파일은 저장해 둔 것을 먼저 보여 주고 뒤에서 새 버전을 받아 둔다
# (그래서 서버를 고치면 앱에는 "다음 실행"부터 반영). /api/ · /pay/ 는 절대 저장하지 않는다.
SW_JS = r"""const C='bb-app-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['/play','/manifest.webmanifest','/app/icon-192.png','/app/icon-512.png'])).catch(()=>{}))});
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==C)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',e=>{const q=e.request,u=new URL(q.url);if(q.method!=='GET'||u.origin!==location.origin)return;
 if(u.pathname==='/play'||u.pathname==='/play/'){e.respondWith(caches.open(C).then(async c=>{const hit=await c.match('/play');
  const net=fetch(q).then(r=>{if(r.ok)c.put('/play',r.clone());return r}).catch(()=>null);
  if(hit){e.waitUntil(net);return hit}const r=await net;return r||new Response('<meta charset=utf-8><body style="background:#07060f;color:#eee;font:16px sans-serif;padding:24px">인터넷에 연결한 뒤 다시 열어 주세요.',{status:503,headers:{'Content-Type':'text/html; charset=utf-8'}})}));return}
 if(u.pathname.startsWith('/app/')||u.pathname==='/manifest.webmanifest'){e.respondWith(caches.match(q).then(h=>h||fetch(q).then(r=>{if(r.ok){const cl=r.clone();caches.open(C).then(c=>c.put(q,cl))}return r})))}});
"""


@app.route('/manifest.webmanifest')
def app_manifest():
    resp = app.response_class(json.dumps(APP_MANIFEST, ensure_ascii=False), mimetype='application/manifest+json')
    resp.headers['Cache-Control'] = 'no-cache'
    return resp


@app.route('/sw.js')
def app_service_worker():
    resp = app.response_class(SW_JS, mimetype='application/javascript')
    resp.headers['Cache-Control'] = 'no-cache'
    resp.headers['Service-Worker-Allowed'] = '/'
    return resp


@app.route('/app/<name>')
def app_file(name):
    if not re.fullmatch(r'[a-z0-9-]+\.png', name):
        return _bad('없는 파일이에요', 404)
    resp = send_from_directory(APP_DIR, name)
    resp.headers['Cache-Control'] = 'public, max-age=86400'
    return resp


@app.route('/.well-known/assetlinks.json')
def app_assetlinks():
    """구글 플레이 앱이 "이 사이트의 공식 앱"임을 확인하는 파일. 주소창 없이 전체 화면으로 뜨게 해 준다."""
    links = []
    if TWA_PACKAGE and TWA_SHA256:
        links.append({'relation': ['delegate_permission/common.handle_all_urls'],
                      'target': {'namespace': 'android_app', 'package_name': TWA_PACKAGE,
                                 'sha256_cert_fingerprints': TWA_SHA256}})
    resp = jsonify(links)
    resp.headers['Cache-Control'] = 'no-cache'
    return resp


INFO_PAGE = r"""<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{{ title }} · BEAT BLADE</title>
<style>body{margin:0;background:#0b0d16;color:#e8ecf8;font:15px/1.75 system-ui,-apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif}main{max-width:760px;margin:0 auto;padding:28px 18px 60px}
h1{font-size:24px;margin:0 0 6px}h2{font-size:17px;margin:26px 0 6px;color:#ffd166}table{border-collapse:collapse;width:100%;font-size:14px}td,th{border:1px solid #ffffff22;padding:7px 9px;text-align:left;vertical-align:top}th{background:#ffffff0c}
.sub{color:#9fb0c8;font-size:13px}input{width:100%;box-sizing:border-box;padding:11px;border-radius:10px;border:1px solid #ffffff33;background:#121726;color:#fff;font:15px inherit;margin:4px 0 10px}
button{padding:12px 16px;border-radius:10px;border:0;background:#ff5a6a;color:#fff;font:800 15px inherit;cursor:pointer}button:disabled{opacity:.5}.msg{margin-top:12px;white-space:pre-line}.box{padding:16px;border-radius:14px;background:#121726;border:1px solid #ffffff1a}</style>
<main>{{ body|safe }}</main></html>"""


@app.route('/privacy')
def app_privacy():
    contact = SHOP_CONTACT or '(운영자 연락처를 SHOP_CONTACT 환경변수에 넣어 주세요)'
    body = render_template_string(r"""<h1>개인정보처리방침</h1><div class="sub">BEAT BLADE · MACHINA · 시행일 {{ day }}</div>
<h2>1. 모으는 정보와 쓰는 곳</h2>
<table><tr><th>정보</th><th>언제</th><th>쓰는 곳</th></tr>
<tr><td>아이디, 비밀번호(복원할 수 없게 바꿔서 저장)</td><td>가입할 때</td><td>로그인</td></tr>
<tr><td>Google 계정 고유번호(이메일·이름은 저장하지 않음)</td><td>Google로 로그인·연결할 때</td><td>로그인</td></tr>
<tr><td>게임 진행 기록, 랭킹 점수</td><td>로그인해서 게임할 때</td><td>다른 기기에서 이어 하기, 랭킹 표시(아이디와 점수가 다른 사람에게 보임)</td></tr>
<tr><td>구매 기록(주문 번호, 상품, 금액, 결제 수단 종류)</td><td>상품을 살 때</td><td>산 상품 지급·확인, 환불 처리</td></tr>
<tr><td>접속 IP(잠깐)</td><td>로그인 시도할 때</td><td>비밀번호 무차별 대입 막기(메모리에만 잠깐, 저장 안 함)</td></tr></table>
<p>운영자가 지정한 테스터 이메일과 같은 Google 계정으로 로그인한 경우에만, 그 이메일을 되돌릴 수 없게 바꾼 값(해시)을 테스터 확인용으로 저장합니다.</p>
<p>카드 번호 등 결제 정보는 결제 회사(토스페이먼츠)가 처리하며, 이 게임 서버에는 저장되지 않습니다. 광고나 분석 도구는 쓰지 않습니다. 기기 안(브라우저 저장소)에는 게임 기록과 로그인 정보가 저장됩니다.</p>
<h2>2. 다른 곳에 맡기거나 주는 정보</h2>
<p>서버 운영(Render), 데이터 보관(설정한 경우 Postgres 서비스), 결제(토스페이먼츠), Google 로그인(Google). 법에 따른 요청이 아니면 다른 곳에 주지 않습니다.</p>
<h2>3. 보관 기간과 지우기</h2>
<p>계정을 지우면 아이디·진행 기록·랭킹·보유 상품·Google 연결 정보를 바로 지웁니다. 다만 구매 기록은 전자상거래법에 따라 5년 동안 보관한 뒤 지웁니다.</p>
<p>계정 삭제: 게임 안 「👤 계정」 → 「계정 삭제」, 또는 <a href="/delete-account" style="color:#7dd8ff">계정 삭제 페이지</a>.</p>
<h2>4. 어린이</h2><p>만 14세 미만은 보호자 동의를 받고 가입해 주세요. 만 19세 미만은 보호자 동의를 받고 결제해 주세요.</p>
<h2>5. 문의</h2><p>{{ contact }}</p>""", day=time.strftime('%Y-%m-%d'), contact=contact)
    return render_template_string(INFO_PAGE, title='개인정보처리방침', body=body)


@app.route('/delete-account')
def app_delete_page():
    body = r"""<h1>계정 삭제</h1><div class="sub">BEAT BLADE · MACHINA</div>
<p>계정을 지우면 <b>아이디, 진행 기록, 랭킹, 산 상품, Google 연결</b>이 모두 지워지고 되돌릴 수 없어요. (구매 기록은 법에 따라 5년 보관)</p>
<p>게임 안에서는 「👤 계정」 → 「계정 삭제」로도 지울 수 있어요. Google로만 로그인하는 계정은 게임 안에서 지워 주세요.</p>
<div class="box"><label>아이디<input id="u" autocomplete="username"></label><label>비밀번호<input id="p" type="password" autocomplete="current-password"></label>
<button id="go">계정 영구 삭제</button><div class="msg" id="m"></div></div>
<script>
const m=document.getElementById('m'),go=document.getElementById('go');
go.onclick=async()=>{const u=document.getElementById('u').value.trim(),p=document.getElementById('p').value;if(!u||!p){m.textContent='아이디와 비밀번호를 넣어 주세요.';return}
 if(!confirm(u+' 계정을 정말 지울까요? 되돌릴 수 없어요.'))return;go.disabled=true;m.textContent='지우는 중…';
 try{let r=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:u,password:p})});let j=await r.json();if(!r.ok||!j.token)throw Error(j.error||'로그인하지 못했어요');
  r=await fetch('/api/account/delete',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+j.token},body:JSON.stringify({confirm:j.username||u})});j=await r.json();if(!r.ok||!j.ok)throw Error(j.error||'지우지 못했어요');
  m.textContent='계정을 지웠어요. 이용해 주셔서 고마워요.';}catch(e){m.textContent=e.message;go.disabled=false}};
</script>"""
    return render_template_string(INFO_PAGE, title='계정 삭제', body=body)


@app.route('/api/account/delete', methods=['POST'])
def api_account_delete():
    user = _current_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    data = request.get_json(silent=True) or {}
    if data.get('confirm') != user['username']:
        return _bad('확인용 아이디가 맞지 않아요', 400)
    db = get_db()
    uid = user['user_id']
    for table in ('sessions', 'saves', 'google_accounts', 'google_challenges', 'rank_scores', 'player_stats', 'pvp_ledger', 'pvp_stats', 'pvp_rank', 'pvp_rewards', 'friends', 'shop_entitlements', 'tester_links', 'player_look', 'user_seen', 'chat_msgs', 'users'):
        db.execute('DELETE FROM %s WHERE user_id = ?' % table, (uid,))
    db.execute('DELETE FROM friends WHERE friend_id = ?', (uid,))
    db.commit()
    return jsonify(ok=True)


init_db()

# ---------------- v103 친구 추천 · 서버 채팅 · 친구 대화 ----------------
CHAT_MAX = 120          # 한 마디 최대 글자
CHAT_KEEP = 300         # 방마다 남겨 두는 대화 수
CHAT_GAP = 1.2          # 같은 사람이 다시 말하려면 기다리는 초
_CHAT_T = {}
_CHAT_ID = [0]
_chat_lock = threading.Lock()


def _chat_clean(text):
    t = ''.join(ch for ch in str(text or '') if ch == ' ' or ch.isprintable())
    return ' '.join(t.split())[:CHAT_MAX]


@app.route('/api/friends/suggest', methods=['POST'])
def friends_suggest():
    """친구 추천: 최근 7일 안에 접속한 사람 중 아직 친구 · 신청 관계가 아닌 사람(지금 접속 중 · 비슷한 레벨이 먼저)"""
    user = _duo_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    uid = user['user_id']
    db = get_db()
    now = time.time()
    me = db.execute('SELECT level FROM player_stats WHERE user_id=?', (uid,)).fetchone()
    mylv = (me['level'] if me else 1) or 1
    skip = {uid} | {r['friend_id'] for r in db.execute('SELECT friend_id FROM friends WHERE user_id=?', (uid,)).fetchall()} \
        | {r['user_id'] for r in db.execute('SELECT user_id FROM friends WHERE friend_id=?', (uid,)).fetchall()}
    rows = db.execute('SELECT s.user_id, s.seen_at, u.username, p.level, p.floor FROM user_seen s JOIN users u ON u.user_id=s.user_id '
                      'LEFT JOIN player_stats p ON p.user_id=s.user_id WHERE s.seen_at>? ORDER BY s.seen_at DESC LIMIT 200',
                      (now - 7 * 86400,)).fetchall()
    out = []
    for r in rows:
        if r['user_id'] in skip:
            continue
        seen = _SEEN.get(r['user_id'])
        on = bool(seen and now - seen[0] < 40)
        lv = r['level'] or 1
        why = '지금 접속 중' if on else ('비슷한 레벨' if abs(lv - mylv) <= 5 else '최근 접속')
        out.append({'name': r['username'], 'lv': lv, 'floor': r['floor'] or 1, 'online': on,
                    'last': now if on else max(r['seen_at'], seen[0] if seen else 0), 'why': why,
                    '_k': (not on, abs(lv - mylv) > 5, -r['seen_at'])})
    out.sort(key=lambda x: x['_k'])
    for x in out:
        x.pop('_k')
    return jsonify(ok=True, list=out[:12])


@app.route('/api/chat/send', methods=['POST'])
def chat_send():
    """채팅 보내기: to가 없으면 서버 전체, 있으면 그 친구에게(친구끼리만)"""
    user = _duo_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    uid = user['user_id']
    body = request.get_json(silent=True) or {}
    text = _chat_clean(body.get('text'))
    if not text:
        return _bad('보낼 말을 적어 주세요', 400)
    now = time.time()
    db = get_db()
    room = 'world'
    if body.get('to'):
        fid, _ = _uid_by_name(db, body.get('to'))
        if not fid or not db.execute('SELECT 1 FROM friends WHERE user_id=? AND friend_id=? AND status=?', (uid, fid, 'accepted')).fetchone():
            return _bad('친구에게만 대화를 보낼 수 있어요', 403)
        room = _dm_room(uid, fid)
    with _chat_lock:
        if now - _CHAT_T.get(uid, 0) < CHAT_GAP:
            return _bad('조금 천천히 보내 주세요', 429)
        _CHAT_T[uid] = now
        if len(_CHAT_T) > 5000:
            _CHAT_T.clear()
        if not _CHAT_ID[0]:
            r = db.execute('SELECT MAX(id) AS m FROM chat_msgs').fetchone()
            _CHAT_ID[0] = int(r['m'] or 0)
        mid = max(int(now * 1000), _CHAT_ID[0] + 1)
        _CHAT_ID[0] = mid
        db.execute('INSERT INTO chat_msgs (id, room, user_id, username, text, created_at) VALUES (?, ?, ?, ?, ?, ?)',
                   (mid, room, uid, user['username'], text, now))
        n = db.execute('SELECT COUNT(*) AS c FROM chat_msgs WHERE room=?', (room,)).fetchone()['c']
        if n > CHAT_KEEP + 50:
            cut = db.execute('SELECT id FROM chat_msgs WHERE room=? ORDER BY id DESC LIMIT 1 OFFSET ?', (room, CHAT_KEEP)).fetchone()
            if cut:
                db.execute('DELETE FROM chat_msgs WHERE room=? AND id<=?', (room, cut['id']))
        db.commit()
    return jsonify(ok=True, id=mid)


@app.route('/api/chat/pull', methods=['POST'])
def chat_pull():
    """채팅 받기: since(마지막으로 받은 번호) 뒤의 말. with가 있으면 그 친구와의 대화"""
    user = _duo_user()
    if not user:
        return _bad('로그인이 필요해요', 401)
    uid = user['user_id']
    body = request.get_json(silent=True) or {}
    db = get_db()
    room = 'world'
    if body.get('with'):
        fid, _ = _uid_by_name(db, body.get('with'))
        if not fid or not db.execute('SELECT 1 FROM friends WHERE user_id=? AND friend_id=? AND status=?', (uid, fid, 'accepted')).fetchone():
            return _bad('친구와만 대화할 수 있어요', 403)
        room = _dm_room(uid, fid)
    try:
        since = int(body.get('since') or 0)
    except (TypeError, ValueError):
        since = 0
    if since:
        rows = db.execute('SELECT id, user_id, username, text, created_at FROM chat_msgs WHERE room=? AND id>? ORDER BY id LIMIT 80', (room, since)).fetchall()
    else:
        rows = list(reversed(db.execute('SELECT id, user_id, username, text, created_at FROM chat_msgs WHERE room=? ORDER BY id DESC LIMIT 60', (room,)).fetchall()))
    now = time.time()
    online = sum(1 for t in _SEEN.values() if now - t[0] < 40)
    return jsonify(ok=True, online=online, msgs=[{'id': int(r['id']), 'name': r['username'], 'me': r['user_id'] == uid,
                                                  'text': r['text'], 't': r['created_at']} for r in rows])


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port)

