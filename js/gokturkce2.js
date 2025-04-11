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
  let currentMap = backVowelMap; // default map for consonants with no prior syllable
  let isNewWord = true; // detect start of a new word

  while (i < input.length) {
    const ch = input[i];

    // handle spaces to reset for new word
    if (/\s/.test(ch)) {
      result += ch;
      isNewWord = true;
      i++;
      continue;
    }

    // set currentMap to backVowelMap at start
    if (isNewWord) {
      currentMap = backVowelMap;
      isNewWord = false;
    }

    // check for syllable forming pairs
    if (i + 1 < input.length) {
      const first = input[i].toLowerCase();
      const second = input[i + 1].toLowerCase();
      const pair1 = first + second;
      const pair2 = second + first;

      if (backVowelMap.hasOwnProperty(pair1)) {
        result += backVowelMap[pair1];
        currentMap = backVowelMap; // update currentMap as syllable
        i += 2;
        continue;
      } else if (frontVowelMap.hasOwnProperty(pair1)) {
        result += frontVowelMap[pair1];
        currentMap = frontVowelMap; // update currentMap as syllable
        i += 2;
        continue;
      } else if (backVowelMap.hasOwnProperty(pair2)) {
        result += backVowelMap[pair2];
        currentMap = backVowelMap; // update currentMap as syllable
        i += 2;
        continue;
      } else if (frontVowelMap.hasOwnProperty(pair2)) {
        result += frontVowelMap[pair2];
        currentMap = frontVowelMap; // update currentMap as syllable
        i += 2;
        continue;
      }
    }

    // process single character
    const singleChar = input[i].toLowerCase();
    if (vowels.has(singleChar)) {
      // single vowel forms a syllable
      if (backVowelMap.hasOwnProperty(singleChar)) {
        result += backVowelMap[singleChar];
        currentMap = backVowelMap; // update currentMap
      } else if (frontVowelMap.hasOwnProperty(singleChar)) {
        result += frontVowelMap[singleChar];
        currentMap = frontVowelMap; // update currentMap
      } else {
        result += input[i]; // unmapped char
      }
    } else {
      // single consonant syllable
      if (currentMap.hasOwnProperty(singleChar)) {
        result += currentMap[singleChar];
      } else {
        result += input[i]; // handle unmapped char
      }
    }
    i++;
  }

  // haldle special cases

  //  result = result.replace(/[𐰤𐰣][𐰍𐰏]/gu, '𐰭');
  result = result.replace(/[𐰤𐰣][𐰓𐰑𐱃𐱅]/gu, '𐰦');
  result = result.replace(/[𐰞𐰠][𐰓𐰑𐱃𐱅]/gu, '𐰡');
  result = result.replace(/[𐰤𐰣]𐰲/gu, '𐰨');
  result = result.replace(/[𐰤𐰣]𐰖/gu, '𐰪');
  result = result.replace(/𐰇[𐰚𐰜]/gu, '𐰜');
  result = result.replace(/𐰃𐰴/gu, '𐰶');
  result = result.replace(/𐰆𐰴/gu, '𐰸');

  //  result = result.replace(/(?<=\S𐰇|𐰇\S)𐰚/gu, '𐰜');
  //  result = result.replace(/(?<=\S𐰆|𐰆\S)𐰴/gu, '𐰸');
  result = result.replace(/(?<=\S𐰀|𐰀\S)𐰀(?=\S)/gu, '');
  result = result.replace(/(?<=\S𐰆|𐰆\S)𐰆(?=\S)/gu, '');
  result = result.replace(/(?<=\S𐰃|𐰃\S)𐰃(?=\S)/gu, '');
  result = result.replace(/(?<=\S𐰇|𐰇\S)𐰇(?=\S)/gu, '');

  result = result.replace(/𐰀𐱃𐱃𐰇𐰼𐰚/g, '𐰀𐱃𐰀𐱅𐰇𐰼𐰜');
  result = result.replace(/𐱅𐰼𐰚/g, '𐱅𐰇𐰼𐰜');
  
  result = result.replace(/𐱅𐰀𐰭𐰼𐰃/g, '𐱅𐰭𐰼𐰃');
  result = result.replace(/𐱃𐰀𐰣𐰺𐰃/g, '𐱅𐰭𐰼𐰃');
  result = result.replace(/[𐱅𐱃]𐰇𐰼[𐰴𐰚𐰶𐰸]/gu, '𐱅𐰇𐰼𐰜');

return result;
}

// event listener with preprocessing
  latinInput.addEventListener('input', () => {
    // input replacement map
    const replacements = {
      'Ä': 'e', 'ä': 'e', 'Ə': 'e', 'ə': 'e',
      'İ': 'i', 'I': 'ı',
      'h': 'k', 'H': 'k', 'X': 'k', 'x': 'k', 'Q': 'k', 'q': 'k',
      'C': 'ç', 'c': 'ç', 'J': 'ç', 'j': 'ç',
      'ğ': 'g', 'Ğ': 'g',
      'f': 'p', 'F': 'p',
      'v': 'b', 'V': 'b', 'W': 'b', 'w': 'b',
      'U': 'o', 'u': 'o',
      'Ū': 'o', 'ū': 'o',
      'Ü': 'ö', 'ü': 'ö',
      'Ý': 'y', 'ý': 'y',
    };

// preprocess input
    let input = latinInput.value.replace(/./g, char => replacements[char] || char);
    let output = convertToOldTurkic(input);
    // Modification: Replace line breaks with <br> tags to preserve them in the output
    output = output.replace(/\n/g, '<br>');
    // Modification: Use innerHTML instead of textContent to render <br> tags
    gokturkDiv.innerHTML = output;
  });
});
