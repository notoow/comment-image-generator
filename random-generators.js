'use strict';

(() => {
  const pick = items => items[crypto.getRandomValues(new Uint32Array(1))[0] % items.length];
  const colors = ['민트', '코랄', '라임', '라벤더', '네이비', '크림', '베이지', '아이보리', '파랑', '보라', '분홍', '연두', '청록', '노랑', '하양', '남색'];
  const colorEndings = ['빛', '한방울', '한스푼', '조각', '물결', '구름', '노을', '물감'];
  const tastes = ['바삭한', '따끈한', '달콤한', '매콤한', '쫄깃한', '고소한', '촉촉한', '포슬한'];
  const foods = ['만두', '김밥', '떡볶이', '우동', '라면', '감자', '푸딩', '토스트', '붕어빵', '마카롱', '도넛', '피자', '쿠키', '소금빵', '와플', '딸기'];
  const phrases = ['오늘도천천히', '잠깐쉬어가는중', '창밖을보는중', '그냥지나가던사람', '조금늦어도괜찮아', '이따가또만나요', '괜히웃음이나', '오늘은기분좋아', '느긋하게걷는중', '아무생각없는날', '한번더생각해볼게', '그럴수도있지', '나중에다시올게', '커피한잔하는중', '지금은쉬는시간', '내일도맑았으면', '어쩌다여기까지', '조용히구경하는중', '밥먹고생각하자', '집에가고싶은날', '슬쩍들렀다가요', '아직꿈꾸는중', '별일없이잘지내', '조금씩좋아지는중'];
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const styles = Object.freeze(['color', 'food', 'phrase', 'alphabet']);

  function name(style = 'phrase', previous = '') {
    if (!styles.includes(style)) style = 'phrase';
    let result;
    do {
      if (style === 'alphabet') {
        const length = 8 + pick([0, 1, 2, 3, 4, 5, 6]);
        result = '@' + Array.from({length}, () => pick(alphabet)).join('');
      } else {
        const word = style === 'color' ? pick(colors) + pick(colorEndings)
          : style === 'food' ? pick(tastes) + pick(foods) : pick(phrases);
        result = '@' + word + (10 + pick(Array.from({length:90}, (_, i) => i)));
      }
    } while (result === previous);
    return result;
  }

  function avatarSeed(previous) {
    const next = crypto.getRandomValues(new Uint32Array(1))[0] % 100000;
    return next === previous ? (next + 1) % 100000 : next;
  }

  globalThis.CommentRandom = Object.freeze({styles, name, avatarSeed});
})();
