// 공통 도우미: Playwright 찾기 + 크로미움 경로 + 파일 경로 → file:// 주소
const path=require('path');
let pw;try{pw=require('playwright')}catch(e){for(const p of [process.env.PLAYWRIGHT_PATH,'/opt/node22/lib/node_modules/playwright'].filter(Boolean)){try{pw=require(p);break}catch(_){}}}
if(!pw)throw new Error('playwright를 찾을 수 없어요. npm i -g playwright 또는 PLAYWRIGHT_PATH 지정');
const exe=process.env.CHROMIUM_PATH||(require('fs').existsSync('/opt/pw-browsers/chromium')?'/opt/pw-browsers/chromium':undefined);
const chromium={launch:(o={})=>pw.chromium.launch(Object.assign({},o,exe?{executablePath:exe}:{}))};
const url=f=>'file://'+path.resolve(f);
module.exports={chromium,url};
