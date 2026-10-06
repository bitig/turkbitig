// Copyright (C) turkbitig.com. All Rights Reserved.

document.addEventListener('DOMContentLoaded', () => {
  const replacedChars = {
    'a':  ['а', 'ا', 'آ', 'ى'],                         // a as in car (Ah)
    'e':  ['ä', 'ə', 'э', 'ә', 'е', 'є', 'ە', 'ع', 'ې'], // e as in egg or bed
    'ı':  ['ы'],                                        // i as in cousin (back throat i)
    'i':  ['İ', 'і', 'ي', 'ئ', 'ى'],                     // i as in machine (ee)
    'o':  ['u', 'ū', 'ұ', 'у', 'о', 'وُ'],               // o as in more 
    'ö':  ['ü', 'ү', 'ө', 'ۆ', 'ۈ'],                     // u as in fur 
    'b':  ['v', 'w', 'б', 'в', 'ب', 'و', 'ۋ'],           // b as in boy (v/w)
    'ç':  ['c', 'j', 'ч', 'ћ', 'چ', 'ج'],               // ch as in chip (j)
    'd':  ['д', 'ђ', 'د', 'ض'],                          // d as in dog
    'g':  ['ğ', 'г', 'ғ', 'گ', 'غ'],                     // g as in gap 
    'k':  ['h', 'x', 'q', 'қ', 'к', 'ќ', 'һ', 'х', 'ك', 'ک', 'ق', 'خ', 'ح', 'ه', 'ھ'], // k as in king (h)
    'l':  ['л', 'љ', 'ل'],                              // l as in log
    'm':  ['м', 'م'],                                   // m as in man
    'n':  ['н', 'ن'],                                   // n as in no
    'ŋ':  ['ң', 'ň', 'ñ', 'ҥ', 'ڭ'],                    // ng as in king
    'p':  ['f', 'ф', 'п', 'پ', 'ف'],                    // p as in pan (f)
    'r':  ['р', 'ر'],                                   // r as in run 
    's':  ['с', 'ц', 'س', 'ص', 'ث'],                  // s as in sit
    'ş':  ['ш', 'ش'],                                   // sh as in ship
    't':  ['т', 'ت', 'ط', 'ة'],                         // t as in top
    'y':  ['ý', 'ж', 'й', 'ž', 'ي', 'ژ'],                // y as in yes (zh)
    'z':  ['з', 'ز', 'ظ', 'ذ'],                          // z as in zoo
    'iy': ['и'],
    'ya': ['я', 'û'],
    'yo': ['ё', 'ю', 'û']
  };

  const charMap = {};
  for (const [target, sources] of Object.entries(replacedChars)) {
    for (const source of sources) {
      charMap[source] = target;
    }
  }

  const frontVowels = new Set(['e', 'i', 'ö', 'ü']);
  const backVowels = new Set(['a', 'ı', 'o', 'u']);

  const dualConsonants = {
    'b': { front: '𐰋', back: '𐰉' },
    'd': { front: '𐰓', back: '𐰑' },
    'g': { front: '𐰏', back: '𐰍' },
    'k': { front: '𐰚', back: '𐰴' },
    'l': { front: '𐰠', back: '𐰞' },
    'n': { front: '𐰤', back: '𐰣' },
    'r': { front: '𐰼', back: '𐰺' },
    's': { front: '𐰾', back: '𐰽' },
    't': { front: '𐱅', back: '𐱃' },
    'y': { front: '𐰘', back: '𐰖' }
  };

  const singleChars = {
    'a': '𐰀', 'e': '𐰀',
    'ı': '𐰃', 'i': '𐰃',
    'o': '𐰆', 'u': '𐰆',
    'ö': '𐰇', 'ü': '𐰇',
    'ç': '𐰲', 'm': '𐰢', 'ñ': '𐰭', 'ŋ': '𐰭',
    'p': '𐰯', 'ş': '𐱁', 'z': '𐰔'
  };

  const specialDigraphs = {
    'ık': '𐰶',
    'ok': '𐰸',
    'ök': '𐰜'
  };

  function getVowelHarmony(text, index) {
    let prevVowel = null;
    let prevDist = Infinity;
    let nextVowel = null;
    let nextDist = Infinity;

    const isAlphabet = /[a-zıİşçöüğş]/i;

    for (let j = index - 1; j >= 0; j--) {
      const char = text[j];
      if (frontVowels.has(char) || backVowels.has(char)) {
        prevVowel = char;
        prevDist = index - j;
        break;
      }
      if (!isAlphabet.test(char)) break;
    }

    for (let j = index + 1; j < text.length; j++) {
      const char = text[j];
      if (frontVowels.has(char) || backVowels.has(char)) {
        nextVowel = char;
        nextDist = j - index;
        break;
      }
      if (!isAlphabet.test(char)) break;
    }

    if (prevDist < nextDist) {
      return frontVowels.has(prevVowel) ? 'front' : 'back';
    } else if (nextDist < prevDist) {
      return frontVowels.has(nextVowel) ? 'front' : 'back';
    } else {
      if (nextDist === 1 && nextVowel) {
         return frontVowels.has(nextVowel) ? 'front' : 'back';
      }
      if (prevVowel) {
        return frontVowels.has(prevVowel) ? 'front' : 'back';
      }
      
      return 'front';
    }
  }

  function convertToGokturk(text) {
    const output = []; 
    let i = 0;

    while (i < text.length) {
      const pair = text.slice(i, i + 2);
      if (specialDigraphs[pair]) {
        output.push(specialDigraphs[pair]);
        i += 2;
        continue;
      }

      const char = text[i];

      if (dualConsonants[char]) {
        const harmony = getVowelHarmony(text, i);
        output.push(dualConsonants[char][harmony]);
      } else if (singleChars[char]) {
        output.push(singleChars[char]);
      } else {
        output.push(char);
      }

      i++;
    }

    return output.join('');
  }

  function processInput(input) {
    let text = input.replace(/I/g, 'ı').replace(/İ/g, 'i').toLowerCase();

    let normalized = '';
    let i = 0;
    while (i < text.length) {
      const pair = text.slice(i, i + 2);
      if (pair.length === 2 && charMap[pair] !== undefined) {
        normalized += charMap[pair];
        i += 2;
      } else {
        normalized += charMap[text[i]] ?? text[i];
        i++;
      }
    }

    let result = convertToGokturk(normalized);
    result = result
    .replace(/[𐰤𐰣]𐰲/gu, '𐰨')
    .replace(/[𐰤𐰣][𐰘𐰖]/gu, '𐰪')
    .replace(/[𐰤𐰣][𐰓𐰑](?=[𐰀])/gu, '𐰦')
    .replace(/[𐰞𐰠][𐰓𐰑](?=[𐰶𐰃𐰜𐰇𐰸𐰆])/gu, '𐰡')

    .replace(/𐰃𐰴/gu, '𐰶')
    .replace(/𐰆𐰴/gu, '𐰸')
    .replace(/𐰇𐰚/gu, '𐰜')

//    .replace(/(?<=[\u{10C00}-\u{10C4F}]{2,30})𐰀(𐰀*)(?!𐰀)(?=[\u{10C00}-\u{10C4F}])/gu, '$1') // trim a/e ignores vowel shift
    .replace(/(?<=𐰀[^𐰀𐰃𐰆𐰇\s]{0,29})(?<=[\u{10C00}-\u{10C4F}]{2,30})𐰀(𐰀*)(?!𐰀)(?=[\u{10C00}-\u{10C4F}])/gu, '$1') 
    .replace(/(?<=[𐰃𐰶][^𐰀𐰃𐰆𐰇𐰶\s]{0,29})(?<=[\u{10C00}-\u{10C4F}]{2,30})𐰃(𐰃*)(?!𐰃)(?=[\u{10C00}-\u{10C4F}])/gu, '$1')
    .replace(/(?<=[𐰆𐰸][^𐰀𐰃𐰆𐰇𐰸\s]{0,29})(?<=[\u{10C00}-\u{10C4F}]{2,30})𐰆(𐰆*)(?!𐰆)(?=[\u{10C00}-\u{10C4F}])/gu, '$1')
    .replace(/(?<=[𐰇𐰜][^𐰀𐰃𐰆𐰇𐰜\s]{0,29})(?<=[\u{10C00}-\u{10C4F}]{2,30})𐰇(𐰇*)(?!𐰇)(?=[\u{10C00}-\u{10C4F}])/gu, '$1')

    .replace(/𐱅𐰼𐰚/gu, '𐱅𐰇𐰼𐰜')
    .replace(/𐱃𐰀𐰭𐰺𐰃/gu, '𐱅𐰭𐰼𐰃')
    .replace(/𐱅𐰀𐰤𐰏𐰼𐰃/gu, '𐱅𐰭𐰼𐰃')
    .replace(/𐱅𐰀𐰭𐰼𐰃/gu, '𐱅𐰭𐰼𐰃')
    .replace(/𐱃𐰀𐰣𐰺𐰃/gu, '𐱅𐰭𐰼𐰃')
    .replace(/[𐱅𐱃]𐰇𐰼[𐰴𐰚𐰶𐰸]/gu, '𐱅𐰇𐰼𐰜')
    .replace(/𐰀𐱃𐱅𐰇𐰼𐰜/gu, '𐰀𐱃𐰀𐱅𐰇𐰼𐰜')
    .replace(/𐰴𐰃𐰺𐰍𐰔/gu, '𐰶𐰃𐰺𐰴𐰔')
    ;
    return result;
  }

  function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  }

  const latinInput = document.getElementById('latin');
  const gokturkOutput = document.getElementById('gokturk');

  if (latinInput && gokturkOutput) {
    const handleInput = debounce(() => {
      gokturkOutput.value = processInput(latinInput.value);
    }, 20);

    latinInput.addEventListener('input', handleInput);
  } else {
    console.error('Missing element.');
  }
});

