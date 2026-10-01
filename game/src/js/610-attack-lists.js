/* ================= 보스별 공격 목록 v77 ================= */
const NP_DECK1=[
 [['gearRail',4,0,'S'],['gearLaunch',3,0],['coreOrbit',3,1],['treadRush',3,1]],
 [['voltGrid',4,0,'S'],['voltStrike',3,0,'S'],['teslaArc',3,0],['currentBarrier',3,1]],
 [['geyserWave',4,0,'S'],['fireBomb',3,0,'S'],['doorBlast',3,0],['chimneyEmber',3,1],['moltenFist',3,2]],
 [['trainRun',4,0,'S'],['headlamp',3,0],['coalShot',3,0],['steamWhistle',3,1]],
 [['frostNova',4,0,'S'],['iceWave',3,0,'S'],['shardLaunch',3,0],['crystalGrow',3,1],['mirrorShard',3,2]],
 [['droneSwarm',4,0,'S'],['droneLaunch',3,0],['carpetBomb',3,1]],
 [['magnetField',4,0,'S'],['clawDrop',3,0],['scrapPull',3,0],['wreckingBall',3,1]],
 [['hourStrike',4,0,'S'],['scissorHands',3,0],['cuckoo',3,0],['windSpiral',3,1]],
 [['scanCones',4,0,'S'],['prism',3,0,'S'],['ricochetLaser',3,0],['focusLens',3,1],['spectrum',3,1]],
 [['beatCollapse',3,0,'S'],['omegaMedley',6,0],['gearRail',2,0],['voltStrike',2,0],['geyserWave',2,0],['trainRun',2,0],['frostNova',2,1],['droneSwarm',2,1],['magnetField',2,1],['hourStrike',2,1],['prism',2,1],['scanCones',2,2],['iceWave',2,2],['fireBomb',2,2]]];
const NP_DECK2=[
 [['rootBurst',4,0,'S'],['rootLine',3,0,'S'],['vineWhip',3,0],['thornVolley',2,0],['sapSpit',2,1],['seedBloom',3,1],['branchSweep',2,2],['tremor',2,2]],
 [['sporeCloud',4,0,'S'],['capSpin',3,0,'S'],['sporeWaltz',3,0],['sporeShot',2,0],['mushroomRing',3,1],['gazePollen',2,1],['mireRoot',2,2],['sporeNova',2,2]],
 [['lureHypno',4,0,'S'],['tongueLash',3,0,'S'],['bubbleTongue',3,0],['bileLob',2,0],['lilyHop',3,1],['tentacleWhip',2,1],['frogLeap',2,2],['mireGrasp',2,2]],
 [['boneHowl',4,0,'S'],['ribSpikes',3,0,'S'],['skullRoll',3,0],['fangLunge',2,0],['boneBoomerang',3,1],['boneShard',2,1],['pounce',2,2],['tailSpin',2,2]],
 [['webCage',4,0,'S'],['venomRain',3,0,'S'],['webPluck',3,0],['silkShot',2,0],['spiderDrop',3,1],['fangBite',2,1],['eggLay',2,2]],
 [['stingSwarm',4,0,'S'],['diveStrike',3,0,'S'],['waggleDance',3,0],['stingShot',2,0],['honeyPool',3,1]],
 [['shardStorm',4,0,'S'],['eyeVolley',3,0,'S'],['prismWall',3,0],['crystalShot',2,0],['facetBeam',3,1],['prismSpike',2,1],['crystalRain',2,2]],
 [['tideCrush',4,0,'S'],['abyssPull',3,0,'S'],['bubbleStream',3,0],['bubbleBarrage',2,0],['inkCloud',3,1],['mawBite',2,1],['lureFlash',2,2]],
 [['emberWail',4,0,'S'],['phantomDash',3,0,'S'],['lanternDance',3,0],['wailCone',2,0],['ashBloom',3,1],['ashDrift',2,1],['convergeRing',2,2]],
 [['voidHunger',3,0,'S'],['primalGaze',3,0,'S'],['hungerMedley',6,0],['mouthVolley',2,0],['worldBite',3,1],['doomBite',2,1]]];
const NP_DECK3={pendulum:['pendSwing','tickTock','gravityBob'],panopticon:['watchSweep','cameraPost','spotTrack','lockdown'],moth:['mothSwarm','lampLure','wingGust'],
 bellows:['pumpSlam','airBlast','chimneySteam'],metronome:['needleSweep','batonVolley','accentHit'],calendar:['pageStorm','dateMark','deadline'],
 dust:['dustDevil','broomSweep','moteCloud'],scales:['balance','counterWeight','judgment'],echo:['echoRing','delayShot','callBack'],stillness:['freezeFrame','originMedley','lastBeat','stillPoint']};
(function(){const miss=[];
 for(let i=0;i<10;i++)DECK[i]=NP_DECK1[i].filter(m=>MV[m[0]]||(miss.push(m[0]),0));
 for(let i=0;i<10;i++)DECK[10+i]=NP_DECK2[i].filter(m=>MV[m[0]]||(miss.push(m[0]),0));
 if(typeof C3BOSS!=='undefined')for(const [art,L] of Object.entries(NP_DECK3)){if(!C3BOSS[art])continue;C3BOSS[art].deck=L.filter(n=>MV[n]||(miss.push(n),0)).map((n,i)=>[n,(art==='stillness'&&n==='originMedley')?6:i===0?4:3,i<2?0:i===2?1:2].concat(i===0?['S']:[]))}
 if(miss.length)console.warn('deck missing',miss);
 const seen=new Set();for(const dk of DECK)for(const m of dk||[])seen.add(m[0]);
 for(const n of seen){if(NPDEF[n]||!MV[n]||MV[n]._bn)continue;const f=MV[n],kr=ATK_NAME[n]||SIGNAME[n];if(!kr)continue;MV[n]=function(t){sch(t,()=>{try{banner(kr)}catch(e){}});return f.apply(this,arguments)};MV[n]._bn=1}})();

