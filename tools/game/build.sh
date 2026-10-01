#!/usr/bin/env bash
# 사용법: bash tools/game/build.sh <기준.html> <패치.js> <결과.html>
# 패치를 기준 HTML의 마지막 </script> 바로 앞에 붙이고, 스크립트 문법을 검사한다.
set -e
python3 - "$1" "$2" "$3" <<'PY'
import sys
b,p,o=sys.argv[1:4]
s=open(b,encoding='utf-8').read();q=open(p,encoding='utf-8').read()
i=s.rindex('</script></body></html>');open(o,'w',encoding='utf-8').write(s[:i]+q+s[i:])
PY
node -e "const s=require('fs').readFileSync(process.argv[1],'utf8');const m=s.match(/<script>([\s\S]*)<\/script>/);try{new Function(m[1]);console.log('문법 OK')}catch(e){console.log('문법 오류:',e.message);process.exit(1)}" "$3"
