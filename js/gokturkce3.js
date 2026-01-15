// Copyright (C) turkbitig.com. All Rights Reserved.

document.addEventListener('DOMContentLoaded', () => {
  const latinInput = document.getElementById('latin');
  const gokturkTextarea = document.getElementById('gokturk');

// syllable maps
  const backVowelMap = {
    'ab': '𐰀𐰉', 'ba': '𐰉𐰀', 'ıb': '𐰃𐰉', 'bı': '𐰉𐰃', 'ob': '𐰆𐰉', 'bo': '𐰉𐰆',
    'ad': '𐰀𐰑', 'da': '𐰑𐰀', 'ıd': '𐰃𐰑', 'dı': '𐰑𐰃', 'od': '𐰆𐰑', 'do': '𐰑𐰆',
    'ag': '𐰀𐰍', 'ga': '𐰍𐰀', 'ıg': '𐰃𐰍', 'gı': '𐰍𐰃', 'og': '𐰆𐰍', 'go': '𐰍𐰆',
    'ak': '𐰀𐰴', 'ka': '𐰴𐰀', 'ık': '𐰶', 'kı': '𐰶𐰃', 'ok': '𐰸', 'ko': '𐰸𐰆',
    'al': '𐰀𐰞', 'la': '𐰞𐰀', 'ıl': '𐰃𐰞', 'lı': '𐰞𐰃', 'ol': '𐰆𐰞', 'lo': '𐰞𐰆',
    'an': '𐰀𐰣', 'na': '𐰣𐰀', 'ın': '𐰃𐰣', 'nı': '𐰣𐰃', 'on': '𐰆𐰣', 'no': '𐰣𐰆',
    'ar': '𐰀𐰺', 'ra': '𐰺𐰀', 'ır': '𐰃𐰺', 'rı': '𐰺𐰃', 'or': '𐰆𐰺', 'ro': '𐰺𐰆',
    'as': '𐰀𐰽', 'sa': '𐰽𐰀', 'ıs': '𐰃𐰽', 'sı': '𐰽𐰃', 'os': '𐰆𐰽', 'so': '𐰽𐰆',
    'at': '𐰀𐱃', 'ta': '𐱃𐰀', 'ıt': '𐰃𐱃', 'tı': '𐱃𐰃', 'ot': '𐰆𐱃', 'to': '𐱃𐰆',
    'ay': '𐰀𐰖', 'ya': '𐰖𐰀', 'ıy': '𐰃𐰖', 'yı': '𐰖𐰃', 'oy': '𐰆𐰖', 'yo': '𐰖𐰆',
    'aç': '𐰀𐰲', 'ça': '𐰲𐰀', 'ıç': '𐰃𐰲', 'çı': '𐰲𐰃', 'oç': '𐰆𐰲', 'ço': '𐰲𐰆',
    'am': '𐰀𐰢', 'ma': '𐰢𐰀', 'ım': '𐰃𐰢', 'mı': '𐰢𐰃', 'om': '𐰆𐰢', 'mo': '𐰢𐰆',
    'ap': '𐰀𐰯', 'pa': '𐰯𐰀', 'ıp': '𐰃𐰯', 'pı': '𐰯𐰃', 'op': '𐰆𐰯', 'po': '𐰯𐰆',
    'aş': '𐰀𐱁', 'şa': '𐱁𐰀', 'ış': '𐰃𐱁', 'şı': '𐱁𐰃', 'oş': '𐰆𐱁', 'şo': '𐱁𐰆',
    'az': '𐰀𐰔', 'za': '𐰔𐰀', 'ız': '𐰃𐰔', 'zı': '𐰔𐰃', 'oz': '𐰆𐰔', 'zo': '𐰔𐰆',
    'a': '𐰀', 'ı': '𐰃', 'o': '𐰆',
    'b': '𐰉', 'd': '𐰑', 'g': '𐰍', 'k': '𐰴', 'l': '𐰞', 'n': '𐰣', 'r': '𐰺', 's': '𐰽', 't': '𐱃', 'y': '𐰖',
    'ç': '𐰲', 'm': '𐰢', 'ñ': '𐰭', 'p': '𐰯', 'ş': '𐱁', 'z': '𐰔'
  };

  const frontVowelMap = {
    'eb': '𐰀𐰋', 'be': '𐰋𐰀', 'ib': '𐰃𐰋', 'bi': '𐰋𐰃', 'öb': '𐰇𐰋', 'bö': '𐰋𐰇',
    'ed': '𐰀𐰓', 'de': '𐰓𐰀', 'id': '𐰃𐰓', 'di': '𐰓𐰃', 'öd': '𐰇𐰓', 'dö': '𐰓𐰇',
    'eg': '𐰀𐰏', 'ge': '𐰏𐰀', 'ig': '𐰃𐰏', 'gi': '𐰏𐰃', 'ög': '𐰇𐰏', 'gö': '𐰏𐰇',
    'ek': '𐰀𐰚', 'ke': '𐰚𐰀', 'ik': '𐰃𐰚', 'ki': '𐰚𐰃', 'ök': '𐰇𐰜', 'kö': '𐰚𐰇',
    'el': '𐰀𐰠', 'le': '𐰠𐰀', 'il': '𐰃𐰠', 'li': '𐰠𐰃', 'öl': '𐰇𐰠', 'lö': '𐰠𐰇',
    'en': '𐰀𐰤', 'ne': '𐰤𐰀', 'in': '𐰃𐰤', 'ni': '𐰤𐰃', 'ön': '𐰇𐰤', 'nö': '𐰤𐰇',
    'er': '𐰀𐰼', 're': '𐰼𐰀', 'ir': '𐰃𐰼', 'ri': '𐰼𐰃', 'ör': '𐰇𐰼', 'rö': '𐰼𐰇',
    'es': '𐰀𐰾', 'se': '𐰾𐰀', 'is': '𐰃𐰾', 'si': '𐰾𐰃', 'ös': '𐰇𐰾', 'sö': '𐰾𐰇',
    'et': '𐰀𐱅', 'te': '𐱅𐰀', 'it': '𐰃𐱅', 'ti': '𐱅𐰃', 'öt': '𐰇𐱅', 'tö': '𐱅𐰇',
    'ey': '𐰀𐰘', 'ye': '𐰘𐰀', 'iy': '𐰃𐰘', 'yi': '𐰘𐰃', 'öy': '𐰇𐰘', 'yö': '𐰘𐰇',
    'eç': '𐰀𐰲', 'çe': '𐰲𐰀', 'iç': '𐰃𐰲', 'çi': '𐰲𐰃', 'öç': '𐰇𐰲', 'çö': '𐰲𐰇',
    'em': '𐰀𐰢', 'me': '𐰢𐰀', 'im': '𐰃𐰢', 'mi': '𐰢𐰃', 'öm': '𐰇𐰢', 'mö': '𐰢𐰇',
    'ep': '𐰀𐰯', 'pe': '𐰯𐰀', 'ip': '𐰃𐰯', 'pi': '𐰯𐰃', 'öp': '𐰇𐰯', 'pö': '𐰯𐰇',
    'eş': '𐰀𐱁', 'şe': '𐱁𐰀', 'iş': '𐰃𐱁', 'şi': '𐱁𐰃', 'öş': '𐰇𐱁', 'şö': '𐱁𐰇',
    'ez': '𐰀𐰔', 'ze': '𐰔𐰀', 'iz': '𐰃𐰔', 'zi': '𐰔𐰃', 'öz': '𐰇𐰔', 'zö': '𐰔𐰇',
    'e': '𐰀', 'i': '𐰃', 'ö': '𐰇',
    'b': '𐰋', 'd': '𐰓', 'g': '𐰏', 'k': '𐰚', 'l': '𐰠', 'n': '𐰤', 'r': '𐰼', 's': '𐰾', 't': '𐱅', 'y': '𐰘',
    'ç': '𐰱', 'ç': '𐰲', 'm': '𐰢', 'ñ': '𐰭', 'p': '𐰯', 'ş': '𐱁', 'z': '𐰔',
  };

// vowels
  const vowels = new Set(['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü']);
  const backVowels = new Set(['a', 'ı', 'o', 'u']);
  const frontVowels = new Set(['e', 'i', 'ö', 'ü']);

// converter
function convertToOldTurkic(input) {
  let result = '';
  let i = 0;
  let currentMap = backVowelMap;
  let isNewWord = true;
  while (i < input.length) {
    const ch = input[i];
    if (/\s/.test(ch)) {
      result += ch;
      isNewWord = true;
      i++;
      continue;
    }
    if (isNewWord) {
      currentMap = backVowelMap;
      isNewWord = false;
    }
    if (i + 1 < input.length) {
      const first = input[i];  
      const second = input[i + 1];  
      if (!vowels.has(first) && vowels.has(second)) {
        const pair = first + second;
        if (backVowelMap.hasOwnProperty(pair)) {
          result += backVowelMap[pair];
          currentMap = backVowelMap;
          i += 2;
          continue;
        } else if (frontVowelMap.hasOwnProperty(pair)) {
          result += frontVowelMap[pair];
          currentMap = frontVowelMap;
          i += 2;
          continue;
        }
      }
      if (vowels.has(first) && !vowels.has(second)) {
        let shouldMatch = true;
        if (i + 2 < input.length) {
          const nextNext = input[i + 2];
          if (vowels.has(nextNext)) {
            const isBack1 = backVowels.has(first);
            const isFront1 = frontVowels.has(first);
            const isBack2 = backVowels.has(nextNext);
            const isFront2 = frontVowels.has(nextNext);
            if ((isBack1 && isBack2) || (isFront1 && isFront2)) {
              shouldMatch = false;
            }
          }
        }
        if (shouldMatch) {
          const pair = first + second;
          if (backVowelMap.hasOwnProperty(pair)) {
            result += backVowelMap[pair];
            currentMap = backVowelMap;
            i += 2;
            continue;
          } else if (frontVowelMap.hasOwnProperty(pair)) {
            result += frontVowelMap[pair];
            currentMap = frontVowelMap;
            i += 2;
            continue;
          }
        }
      }
    }
    const singleChar = input[i];  
    if (vowels.has(singleChar)) {
      if (backVowelMap.hasOwnProperty(singleChar)) {
        result += backVowelMap[singleChar];
        currentMap = backVowelMap;
      } else if (frontVowelMap.hasOwnProperty(singleChar)) {
        result += frontVowelMap[singleChar];
        currentMap = frontVowelMap;
      } else {
        result += input[i];
      }
    } else {
      if (currentMap.hasOwnProperty(singleChar)) {
        result += currentMap[singleChar];
      } else {
        result += input[i];
      }
    }
    i++;
  }
  // Special cases
  result = result.replace(/[𐰤𐰣][𐰓𐰑]/gu, '𐰦');
  result = result.replace(/[𐰞𐰠][𐰓𐰑]/gu, '𐰡');
  result = result.replace(/[𐰤𐰣]𐰲/gu, '𐰨');
  result = result.replace(/[𐰤𐰣]𐰖/gu, '𐰪');
  result = result.replace(/𐰇[𐰚𐰜]/gu, '𐰜');
  result = result.replace(/𐰃𐰴/gu, '𐰶');
  result = result.replace(/𐰆𐰴/gu, '𐰸');
  result = result.replace(/(?<=\S𐰀|𐰀\S)𐰀(?=[\u{10C01}-\u{10C48}])/gu, '');
  result = result.replace(/(?<=\S𐰃|𐰃\S)𐰃(?=[\u{10C00}-\u{10C02}\u{10C04}-\u{10C48}])/gu, '');
  result = result.replace(/(?<=\S𐰆|𐰆\S)𐰆(?=[\u{10C00}-\u{10C05}\u{10C07}-\u{10C48}])/gu, '');
  result = result.replace(/(?<=\S𐰇|𐰇\S)𐰇(?=[\u{10C00}-\u{10C06}\u{10C08}-\u{10C48}])/gu, '');
  result = result.replace(/𐱅𐰼𐰚/g, '𐱅𐰇𐰼𐰜');
  result = result.replace(/𐱅𐰀𐰭𐰼𐰃/g, '𐱅𐰭𐰼𐰃');
  result = result.replace(/𐱃𐰀𐰣𐰺𐰃/g, '𐱅𐰭𐰼𐰃');
  result = result.replace(/[𐱅𐱃]𐰇𐰼[𐰴𐰚𐰶𐰸]/gu, '𐱅𐰇𐰼𐰜');
  result = result.replace(/𐰀𐱃𐱅𐰇𐰼𐰜/g, '𐰀𐱃𐰀𐱅𐰇𐰼𐰜');
  return result;
}

latinInput.addEventListener('input', () => {

// replace chars
const replacementGroups = {
    'a': ['а'], // kz а
    'b': ['v', 'w', 'б', 'в'], // kz бв
    'ç': ['c', 'j', 'ч'], // kz ч
    'd': ['д'], // kz д
    'e': ['ä', 'ə', 'э', 'ә', 'е'], // kz еэә, az ə
    'g': ['ğ', 'г', 'ғ'], // kz гғ
    'ı': ['ы'], // kz ыI
    'i': ['İ', 'і'], // kz і
    'k': ['h', 'x', 'q', 'қ', 'к', 'һ', 'х'], // kz һх
    'l': ['л'], // kz л
    'm': ['м'], // kz м
    'n': ['н'], // kz н
    'ñ': ['ң', 'ň'], // kz ң, tm ň
    'o': ['u', 'ū', 'ұ', 'у', 'о'], // kz ұуо
    'ö': ['ü', 'ү', 'ө'], // kz үө
    'p': ['f', 'ф', 'п'], // kz пф
    'r': ['р'], // kz р
    's': ['с', 'ц'], // kz сц
    'ş': ['ш'], // kz ш
    't': ['т'], // kz т
    'y': ['ý', 'ж', 'ё', 'ю','я', 'й', 'ž'], // kz ýжёюя, tm ž
    'z': ['з'], // kz з
  };

  const replacements = {};
  for (const [output, inputs] of Object.entries(replacementGroups)) {
    for (const input of inputs) {
      replacements[input] = output;
    }
  }

// lowercase input, I-ı İ-i
    let input = latinInput.value.replace(/I/g, 'ı')
    .replace(/İ/g, 'i').toLowerCase('tr-TR')
    .replace(/./g, char => replacements[char] || char)
    .replace(/и/g, 'iy'); // kz и > iy

    let output = convertToOldTurkic(input);
    gokturkTextarea.value = output;
  });
});
