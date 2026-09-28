// Copyright (C) turkbitig.com. All Rights Reserved.

document.addEventListener('DOMContentLoaded', () => {
  const latinInput = document.getElementById('latin');
  const gokturkDiv = document.getElementById('gokturk');

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
    'a': '𐰀', 'ı': '𐰃', 'o': '𐰆',
    'b': '𐰉', 'd': '𐰑', 'g': '𐰍', 'k': '𐰴', 'l': '𐰞', 'n': '𐰣', 'r': '𐰺', 's': '𐰽', 't': '𐱃', 'y': '𐰖',
    'ç': '𐰲', 'm': '𐰢', 'ñ': '𐰭', 'p': '𐰯', 'ş': '𐱁', 'z': '𐰔'
  };

  const frontVowelMap = {
    'eb': '𐰀𐰋', 'be': '𐰋𐰀', 'ib': '𐰃𐰋', 'bi': '𐰋𐰃', 'öb': '𐰇𐰋', 'bö': '𐰋𐰇',    
    'ed': '𐰀𐰓', 'de': '𐰓𐰀', 'id': '𐰃𐰓', 'di': '𐰓𐰃', 'öd': '𐰇𐰓', 'dö': '𐰓𐰇',
    'eg': '𐰀𐰏', 'ge': '𐰏𐰀', 'ig': '𐰃𐰏', 'gi': '𐰏𐰃', 'ög': '𐰇𐰏', 'gö': '𐰏𐰇',    
    'ek': '𐰀𐰚', 'ke': '𐰚𐰀', 'ik': '𐰃𐰚', 'ki': '𐰚𐰃', 'ök': '𐰇𐰜',  'kö': '𐰚𐰇',
    'el': '𐰀𐰠', 'le': '𐰠𐰀', 'il': '𐰃𐰠', 'li': '𐰠𐰃', 'öl': '𐰇𐰠', 'lö': '𐰠𐰇',    
    'en': '𐰀𐰤', 'ne': '𐰤𐰀', 'in': '𐰃𐰤', 'ni': '𐰤𐰃', 'ön': '𐰇𐰤', 'nö': '𐰤𐰇',    
    'er': '𐰀𐰼', 're': '𐰼𐰀', 'ir': '𐰃𐰼', 'ri': '𐰼𐰃', 'ör': '𐰇𐰼', 'rö': '𐰼𐰇',    
    'es': '𐰀𐰾', 'se': '𐰾𐰀', 'is': '𐰃𐰾', 'si': '𐰾𐰃', 'ös': '𐰇𐰾', 'sö': '𐰾𐰇',
    'et': '𐰀𐱅', 'te': '𐱅𐰀', 'it': '𐰃𐱅', 'ti': '𐱅𐰃', 'öt': '𐰇𐱅', 'tö': '𐱅𐰇',   
    'ey': '𐰀𐰘', 'ye': '𐰘𐰀', 'iy': '𐰃𐰘', 'yi': '𐰘𐰃', 'öy': '𐰇𐰘', 'yö': '𐰘𐰇',
    'e': '𐰀', 'i': '𐰃', 'ö': '𐰇',    
    'b': '𐰋', 'd': '𐰓', 'g': '𐰏', 'k': '𐰚', 'l': '𐰠', 'n': '𐰤', 'r': '𐰼', 's': '𐰾', 't': '𐱅', 'y': '𐰘',
    'ç': '𐰱', 'ç': '𐰲', 'm': '𐰢', 'ñ': '𐰭', 'p': '𐰯', 'ş': '𐱁', 'z': '𐰔',
  };

  // define vowels
  const vowels = new Set(['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü']);

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
        const pair1 = first + second;
        const pair2 = second + first;

        if (backVowelMap.hasOwnProperty(pair1)) {
          result += backVowelMap[pair1];
          currentMap = backVowelMap;
          i += 2;
          continue;
        } else if (frontVowelMap.hasOwnProperty(pair1)) {
          result += frontVowelMap[pair1];
          currentMap = frontVowelMap;
          i += 2;
          continue;
        } else if (backVowelMap.hasOwnProperty(pair2)) {
          result += backVowelMap[pair2];
          currentMap = backVowelMap;
          i += 2;
          continue;
        } else if (frontVowelMap.hasOwnProperty(pair2)) {
          result += frontVowelMap[pair2];
          currentMap = frontVowelMap;
          i += 2;
          continue;
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

    result = result
    .replace(/[𐰤𐰣][𐰓𐰑𐱃𐱅]/gu, '𐰦')
    .replace(/[𐰞𐰠][𐰓𐰑𐱃𐱅]/gu, '𐰡')
    .replace(/[𐰤𐰣]𐰲/gu, '𐰨')
    .replace(/[𐰤𐰣][𐰘𐰖]/gu, '𐰪')

    .replace(/𐰃𐰴/gu, '𐰃𐰶')
    .replace(/(?<=\p{L}{2})𐰃𐰶/gu, '𐰶')
    .replace(/(?<!\p{L}{2})𐰴𐰃/gu, '𐰶𐰃')

    .replace(/𐰆𐰴/gu, '𐰆𐰸')
    .replace(/(?<=\p{L}{2})𐰆𐰸/gu, '𐰸')
    .replace(/(?<!\p{L}{2})𐰴𐰆/gu, '𐰸𐰆')
    .replace(/(?<=\p{L}{2})𐰇𐰚/gu, '𐰜')

    .replace(/(?<=𐰀\S)𐰀(?=\S)/gu, '')
    .replace(/(?<=𐰆\S)𐰆(?=\S)/gu, '')
    .replace(/(?<=𐰃\S)𐰃(?=\S)/gu, '')
    .replace(/(?<=𐰇\S)𐰇(?=\S)/gu, '')

    .replace(/(?<=\p{L}{2})𐰶𐰃(?=\S)/gu, '𐰶')
    .replace(/(?<=\p{L}{2})𐰸𐰆(?=\S)/gu, '𐰸')

    // special cases
    .replace(/𐱅𐰼𐰚/gu, '𐱅𐰇𐰼𐰜')
    .replace(/𐱃𐰀𐰭𐰺𐰃/gu, '𐱅𐰭𐰼𐰃')
    .replace(/𐱅𐰀𐰤𐰏𐰼𐰃/gu, '𐱅𐰭𐰼𐰃')
    .replace(/𐱅𐰀𐰭𐰼𐰃/gu, '𐱅𐰭𐰼𐰃')
    .replace(/𐱃𐰀𐰣𐰺𐰃/gu, '𐱅𐰭𐰼𐰃')
    .replace(/[𐱅𐱃]𐰇𐰼[𐰴𐰚𐰶𐰸]/gu, '𐱅𐰇𐰼𐰜')
    .replace(/𐰀𐱃𐱅𐰇𐰼𐰜/gu, '𐰀𐱃𐰀𐱅𐰇𐰼𐰜')
;      
    return result;
  }

  latinInput.addEventListener('input', () => {
    const replacements = {
      'a':  ['а'],
      'b':  ['v', 'w', 'б', 'в'],
      'ç':  ['c', 'j', 'ч'],
      'd':  ['д'],
      'e':  ['ä', 'ə', 'э', 'ә', 'е'],
      'g':  ['ğ', 'г', 'ғ'],
      'ı':  ['ы'],
      'i':  ['İ', 'і'],
      'iy': ['и'],
      'k':  ['h', 'x', 'q', 'қ', 'к', 'һ', 'х'],
      'l':  ['л'],
      'm':  ['м'],
      'n':  ['н'],
      'ŋ':  ['ң', 'ň', 'ñ'],
      'o':  ['u', 'ū', 'ұ', 'у', 'о'],
      'ö':  ['ü', 'ү', 'ө'],
      'p':  ['f', 'ф', 'п'],
      'r':  ['р'],
      's':  ['с', 'ц'],
      'ş':  ['ш'],
      't':  ['т'],
      'y':  ['ý', 'ж', 'й', 'ž'],
      'ya': ['я', 'û'],
      'yo': ['ё', 'ю', 'û'],
      'z':  ['з'],
    };

    const lookup = {};
    for (const [latinTarget, variants] of Object.entries(replacements)) {
      variants.forEach(variant => {
        lookup[variant.toLowerCase()] = latinTarget;
      });
    }

    let rawInput = latinInput.value
      .replace(/İ/g, 'i')
      .replace(/I/g, 'ı')
      .toLowerCase();

    let preprocessed = '';
    let idx = 0;

    while (idx < rawInput.length) {
      let matched = false;
      
      for (let len = 2; len >= 1; len--) {
        if (idx + len <= rawInput.length) {
          const chunk = rawInput.substring(idx, idx + len);
          if (lookup[chunk]) {
            preprocessed += lookup[chunk];
            idx += len;
            matched = true;
            break;
          }
        }
      }

      if (!matched) {
        const single = rawInput[idx];
        preprocessed += lookup[single] || single;
        idx++;
      }
    }

    let output = convertToOldTurkic(preprocessed);
    output = output.replace(/\n/g, '<br>');
    gokturkDiv.innerHTML = output;
  });
});

