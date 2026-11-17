'use strict';

(() => {
  const pick = items => items[crypto.getRandomValues(new Uint32Array(1))[0] % items.length];
  const colors = ['민트', '코랄', '라임', '라벤더', '네이비', '크림', '베이지', '아이보리', '파랑', '보라', '분홍', '연두', '청록', '노랑', '하양', '남색'];
  const colorEndings = ['빛', '한방울', '한스푼', '조각', '물결', '구름', '노을', '물감'];
  // Food adjectives are paired with compatible dishes below.
  const foods = ['만두', '김밥', '떡볶이', '우동', '라면', '감자', '푸딩', '토스트', '붕어빵', '마카롱', '도넛', '피자', '쿠키', '소금빵', '와플', '딸기'];
  const phrases = ['오늘도천천히', '잠깐쉬어가는중', '창밖을보는중', '그냥지나가던사람', '조금늦어도괜찮아', '이따가또만나요', '괜히웃음이나', '오늘은기분좋아', '느긋하게걷는중', '아무생각없는날', '한번더생각해볼게', '그럴수도있지', '나중에다시올게', '커피한잔하는중', '지금은쉬는시간', '내일도맑았으면', '어쩌다여기까지', '조용히구경하는중', '밥먹고생각하자', '집에가고싶은날', '슬쩍들렀다가요', '아직꿈꾸는중', '별일없이잘지내', '조금씩좋아지는중'];
  const adjectives = ['quiet','mellow','sunny','silver','golden','gentle','happy','tiny','little','wild','soft','bright','calm','warm','cool','fresh','sleepy','lucky','cozy','misty','blue','green','amber','rosy','swift','slow','kind','brave','sweet','dreamy','early','late','hidden','winter','summer','autumn','spring','daily','urban','lunar'];
  const nouns = ['river','forest','meadow','cloud','moon','star','sunrise','sunset','ocean','breeze','rain','snow','leaf','maple','cedar','willow','daisy','lily','rose','peach','cherry','coffee','tea','cookie','panda','otter','fox','owl','robin','sparrow','tiger','rabbit','music','sketch','story','garden','wanderer','traveler','morning','weekend'];
  const names = ['alex','jamie','jordan','taylor','casey','morgan','riley','avery','robin','sam','charlie','jessie','emma','olivia','mia','ella','sophie','lucy','grace','lily','chloe','nora','james','oliver','noah','liam','ethan','leo','owen','henry','jack','luke','daniel','david','anna','claire','julia','alice','rose','ben'];
  function birthday(now = new Date()) {
    // Inclusive ages 20–79; UTC calendar dates avoid DST-length days.
    const end = Date.UTC(now.getFullYear()-20,now.getMonth(),now.getDate());
    const start = Date.UTC(now.getFullYear()-80,now.getMonth(),now.getDate()+1);
    const days = Math.floor((end-start)/86400000)+1;
    return new Date(start+(crypto.getRandomValues(new Uint32Array(1))[0]%days)*86400000);
  }
  function nameSuffix() {
    const birth=birthday(),yy=String(birth.getUTCFullYear()).slice(-2),mmdd=String(birth.getUTCMonth()+1).padStart(2,'0')+String(birth.getUTCDate()).padStart(2,'0');
    return pick(['',yy,mmdd]);
  }
  function englishName() {
    const pair=pick([[pick(adjectives),pick(nouns)],[pick(adjectives),pick(names)],[pick(names),pick(nouns)],[pick(nouns),pick(nouns)]]);
    return '@'+pair.join(pick(['','_','.']))+nameSuffix();
  }
  function avatarColor(previous, palette) {
    return pick(palette.filter(color=>color.toLowerCase()!==String(previous).toLowerCase()));
  }
  colors.push('살구','하늘','올리브','에메랄드','루비','호박','은빛','금빛','벚꽃','장미','자주','연보라','연분홍','진초록','하늘색','살구색','밤색','연갈색','연파랑','샴페인');
  colorEndings.push('산책','편지','숲','정원','바람','달빛','새벽','오후','햇살','별빛','하늘','안개','일기','메모','스케치','연필','물방울','파도','꽃잎','나뭇잎','우산','책갈피','종이배','나비');
  foods.push('크루아상','식빵','바게트','베이글','스콘','머핀','브라우니','팬케이크','치즈케이크','타르트','찰떡','인절미','약과','호떡','호빵','찐빵','찹쌀떡','군고구마','고로케','치즈볼','누룽지','수프','죽','수제비','칼국수','어묵','볶음밥','샌드위치','카스텔라','오믈렛','치즈','사과','복숭아','망고','자두','포도','귤','멜론','블루베리','체리');
  const koreanMoods=['느긋한','조용한','수줍은','씩씩한','다정한','명랑한','차분한','엉뚱한','부지런한','느린','작은','행복한','졸린','용감한','호기심많은','꿈꾸는','책읽는','산책하는','노래하는','여행하는','웃고있는','햇살좋은','비오는','바람부는','별빛가득한','포근한','반짝이는','따스한','싱그러운','푸근한','소소한','기분좋은'];
  const koreanThings=['고양이','강아지','토끼','다람쥐','수달','여우','고슴도치','펭귄','참새','부엉이','곰돌이','너구리','판다','사슴','돌고래','오리','달팽이','햄스터','구름','달','별','숲','바다','호수','언덕','정원','골목','책방','카페','책갈피','연필','일기장','우체통','종이배','우산','운동화','자전거','기차','오후','아침','주말','새벽','봄날','여름밤','가을날','겨울밤'];
  const phraseStarts=['오늘도','가끔은','지금은','잠깐','천천히','조용히','느긋하게','오랜만에','주말에는','퇴근하고','아침부터','어쩌다','기분좋게','별생각없이','혼자서','다같이'];
  const phraseEnds=['쉬어가는중','산책하는중','구경하는중','책읽는중','커피마시는중','노래듣는중','하늘보는중','낙서하는중','여행하는중','웃어보는중','생각하는중','기다리는중','꿈꾸는중','걷는중','사진찍는중','멍때리는중','배우는중','메모하는중','인사하는중','다시시작하는중'];
  const foodPairs=[
    ['바삭한',['토스트','쿠키','와플','소금빵','크루아상','바게트','고로케','누룽지','치즈볼']],
    ['따끈한',['만두','우동','라면','호빵','찐빵','군고구마','수프','죽','수제비','칼국수','어묵','볶음밥','호떡']],
    ['달콤한',['푸딩','붕어빵','마카롱','도넛','딸기','머핀','브라우니','팬케이크','치즈케이크','타르트','약과','카스텔라','복숭아','망고','포도','귤','멜론','체리']],
    ['매콤한',['떡볶이','라면','볶음밥','김밥','만두','우동','어묵']],
    ['쫄깃한',['찰떡','인절미','찹쌀떡','수제비','우동','베이글','떡볶이']],
    ['고소한',['김밥','토스트','소금빵','스콘','와플','치즈','샌드위치','누룽지','인절미','크루아상']],
    ['촉촉한',['카스텔라','머핀','브라우니','팬케이크','치즈케이크','오믈렛']],
    ['포슬한',['감자','군고구마','카스텔라','머핀','스콘']],
    ['오늘의',foods],['나만의',foods],['소중한',foods],['한입',foods]
  ];
  function foodName(){const [prefix,items]=pick(foodPairs);return prefix+pick(items);}
  const recentWords=[];
  const styles = Object.freeze(['mixed','korean','color', 'food', 'phrase', 'alphabet']);

  function name(style = 'mixed', previous = '') {
    if (!styles.includes(style)) style = 'mixed';
    const category=style==='mixed'?pick(['korean','alphabet']):style;
    let result,base;
    for(let attempt=0;attempt<128;attempt++) {
      const chosen=category==='korean'?pick(['color','food','phrase','words']):category;
      if(chosen==='alphabet')result=englishName();
      else {
        const word=chosen==='color'?pick(colors)+pick(colorEndings)
          :chosen==='food'?foodName()
          :chosen==='phrase'?pick([()=>pick(phrases),()=>pick(phraseStarts)+pick(phraseEnds)])()
          :pick(koreanMoods)+pick(koreanThings);
        result='@'+word+nameSuffix();
      }
      base=result.replace(/[0-9]+$/,'');
      if(result!==previous&&!recentWords.includes(base))break;
    }
    recentWords.push(base);if(recentWords.length>80)recentWords.shift();
    return result;
  }

  function avatarSeed(previous) {
    const next = crypto.getRandomValues(new Uint32Array(1))[0] % 100000;
    return next === previous ? (next + 1) % 100000 : next;
  }

  globalThis.CommentRandom = Object.freeze({styles, name, avatarSeed, avatarColor, birthday});
})();
