#!/usr/bin/env python3
"""BeatBlade 빌드: game/src 의 조각들을 순서대로 이어 붙여 HTML 파일 하나로 만든다.

순서: head.html → style.css → body.html → js/*.js (파일 이름 순) → foot.html
게임 코드는 원래 <script> 하나로 실행되던 구조라, js 파일들은 '한 스크립트'로 이어 붙여야 한다.
(번호 접두어가 실행 순서다. 뒤 파일이 앞 파일의 전역 함수를 감싸 덮어쓰는 방식이 많으므로 순서를 바꾸지 말 것.)

사용법:
  python3 tools/game/bundle.py game/BeatBlade-44.html          # 빌드 + 문법 검사
  python3 tools/game/bundle.py out.html --same game/BeatBlade-43.html   # 결과가 기존 파일과 똑같은지 확인
"""
import os, sys, glob, subprocess, argparse
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'game', 'src')

def parts(root):
    js = sorted(glob.glob(os.path.join(root, 'js', '*.js')))
    return [os.path.join(root, 'head.html'), os.path.join(root, 'style.css'), os.path.join(root, 'body.html'), *js, os.path.join(root, 'foot.html')], js

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('out'); ap.add_argument('--src', default=ROOT); ap.add_argument('--same')
    a = ap.parse_args()
    files, js = parts(os.path.normpath(a.src))
    data = ''.join(open(f, encoding='utf-8').read() for f in files)
    for f in js:
        t = open(f, encoding='utf-8').read()
        if t and not t.endswith('\n'): sys.exit(f'오류: {f} 끝에 줄바꿈이 없어요 (다음 파일과 붙어 버려요)')
    open(a.out, 'w', encoding='utf-8').write(data)
    print(f'빌드: {a.out}  ({len(js)}개 js, {len(data.encode()):,} bytes)')
    chk = "const s=require('fs').readFileSync(process.argv[1],'utf8');const m=s.match(/<script>([\\s\\S]*)<\\/script>/);try{new Function(m[1]);console.log('문법 OK')}catch(e){console.log('문법 오류:',e.message);process.exit(1)}"
    r = subprocess.run(['node', '-e', chk, a.out]); 
    if r.returncode: sys.exit(1)
    if a.same:
        same = open(a.same, 'rb').read() == data.encode('utf-8')
        print('기존 파일과 동일' if same else '기존 파일과 다름'); sys.exit(0 if same else 2)

if __name__ == '__main__': main()
