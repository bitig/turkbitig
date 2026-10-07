// Copyright (C) turkbitig.com. All Rights Reserved.

const backVowelMap = {
  'a':'𐰀', 'ı':'𐰃', 'o':'𐰆',
  'ç': '𐰲', 'm': '𐰢', 'p': '𐰯', 'ş': '𐱁', 'z': '𐰔', 'ŋ': '𐰭', 
  'b': '𐰉', 'd': '𐰑', 'g': '𐰍', 'k': '𐰴', 'l': '𐰞', 'n': '𐰣', 'r': '𐰺', 's': '𐰽', 't': '𐱃', 'y': '𐰖'
};

const frontVowelMap = {
  'e':'𐰀', 'i':'𐰃', 'ö':'𐰇',
  'ç': '𐰲', 'm': '𐰢', 'p': '𐰯', 'ş': '𐱁', 'z': '𐰔', 'ŋ': '𐰭', 
  'b': '𐰋', 'd': '𐰓', 'g': '𐰏', 'k': '𐰚', 'l': '𐰠', 'n': '𐰤', 'r': '𐰼', 's': '𐰾', 't': '𐱅', 'y': '𐰘'
};

const replacements = {
    'a':  ['а', 'ا', 'آ', 'ى'],                         // a as in car (Ah)
    'e':  ['ä', 'ə', 'э', 'ә', 'е', 'є', 'ە', 'ع', 'ې'], // e as in egg or bed
    'ı':  ['ы'],                                        // i as in cousin (back throat i)
    'i':  ['İ', 'і', 'ي', 'ئ', 'ى'],                     // i as in machine (ee)
    'o':  ['u', 'ū', 'ұ', 'у', 'о', 'و', 'وُ'],               // o as in more (w) 
    'ö':  ['ü', 'ү', 'ө', 'ۆ', 'ۈ'],                     // u as in fur 
    'b':  ['v', 'w', 'б', 'в', 'ب',  'ۋ'],           // b as in boy (v)
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
    's':  ['с', 'ц', 'س', 'ص', 'ث'],                    // s as in sit
    'ş':  ['ш', 'ش'],                                   // sh as in ship
    't':  ['т', 'ت', 'ط', 'ة'],                         // t as in top
    'y':  ['ý', 'ж', 'й', 'ž', 'ي', 'ژ'],                // y as in yes (zh)
    'z':  ['з', 'ز', 'ظ', 'ذ'],                          // z as in zoo
    'iy': ['и'],                                        // ignored
    'ya': ['я', 'û'],                                  // ignored
    'yo': ['ё', 'ю', 'û']                              // ignored
};

const replacementMap = {};
for (const [standard, alts] of Object.entries(replacements)) {
  for (const alt of alts) {
    replacementMap[alt] = standard;
  }
}
const replacementKeys = Object.keys(replacementMap).sort((a, b) => b.length - a.length);

const VOWELS = 'aeıioöuü';
const NEUTRAL_CONSONANTS = 'çmpsşzñ';

const convertibleSet = new Set([
  ...Object.keys(backVowelMap),
  ...Object.keys(frontVowelMap)
]);

function isNeutralConsonant(ch) {
  return NEUTRAL_CONSONANTS.includes(ch);
}

// syllabify

function syllabify(word) {
  const vowelIndices = [];
  for (let i = 0; i < word.length; i++) {
    if (VOWELS.includes(word[i])) vowelIndices.push(i);
  }

  if (vowelIndices.length === 0) return word ? [word] : [''];

  const syllables = [];
  let start = 0;
  const startsWithVowel = VOWELS.includes(word[0]);
  const isOnlySpan = (vowelIndices.length === 2);

  for (let i = 0; i < vowelIndices.length - 1; i++) {
    const leftVowelPos  = vowelIndices[i];
    const rightVowelPos = vowelIndices[i + 1];
    const consonantCount = rightVowelPos - leftVowelPos - 1;
    const isLastSpan = (i === vowelIndices.length - 2);

    if (consonantCount === 0) {
      syllables.push(word.slice(start, leftVowelPos + 1));
      start = leftVowelPos + 1;
    }
    else if (consonantCount >= 2) {
      const splitPos = rightVowelPos - 1;
      syllables.push(word.slice(start, splitPos));
      start = splitPos;
    }
    else {
      let v2HasTrailing = false;

      if (isLastSpan) {
        for (let k = rightVowelPos + 1; k < word.length; k++) {
          if (!VOWELS.includes(word[k]) && !isNeutralConsonant(word[k])) {
            v2HasTrailing = true;
            break;
          }
        }
      } else {
        const nextVowelPos = vowelIndices[i + 2];
        for (let k = rightVowelPos + 1; k < nextVowelPos; k++) {
          if (!VOWELS.includes(word[k]) && !isNeutralConsonant(word[k])) {
            v2HasTrailing = true;
            break;
          }
        }
      }

      const moveRight = !v2HasTrailing && !(startsWithVowel && isOnlySpan);

      if (moveRight) {
        syllables.push(word.slice(start, leftVowelPos + 1));
        start = leftVowelPos + 1;
      } else {
        syllables.push(word.slice(start, rightVowelPos));
        start = rightVowelPos;
      }
    }
  }

  syllables.push(word.slice(start));
  return syllables;
}

function convertSyllable(syllable, map) {
  let out = '';
  let i = 0;
  while (i < syllable.length) {
    const ch = syllable[i];
    out += map[ch] ?? ch;
    i++;
  }
  return out;
}

function processWord(word) {
  const syllables = syllabify(word);
  let out = '';

  for (const syl of syllables) {
    const vowel = [...syl].find(c => VOWELS.includes(c));

    if (!vowel) {
      out += convertSyllable(syl, backVowelMap);
      continue;
    }

    const isBack = 'aıou'.includes(vowel);
    const map = isBack ? backVowelMap : frontVowelMap;
    out += convertSyllable(syl, map);
  }

  return out;
}

function latinToGokturk(input) {
  let text = input
    .replace(/I/g, 'ı')
    .replace(/İ/g, 'i')
    .toLowerCase();

  for (const key of replacementKeys) {
    text = text.split(key).join(replacementMap[key]);
  }

  let result = '';
  let currentWord = '';

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (convertibleSet.has(ch)) {
      currentWord += ch;
    } else {
      if (currentWord.length > 0) {
        result += processWord(currentWord);
        currentWord = '';
      }
      result += ch;
    }
  }

  if (currentWord.length > 0) {
    result += processWord(currentWord);
  }

// specials & ligatures

  result = result
    .replace(/[𐰤𐰣]𐰲/gu, '𐰨')
    .replace(/[𐰤𐰣][𐰘𐰖]/gu, '𐰪')
    .replace(/[𐰤𐰣][𐰓𐰑](?=[𐰀])/gu, '𐰦')
    .replace(/[𐰞𐰠][𐰓𐰑](?=[𐰶𐰃𐰜𐰇𐰸𐰆])/gu, '𐰡')

    .replace(/𐰃𐰴/gu, '𐰶')
    .replace(/𐰆𐰴/gu, '𐰸')
    .replace(/𐰇𐰚/gu, '𐰜')

//    .replace(/(?<=[\u{10C00}-\u{10C4F}]{2,30})𐰀(𐰀*)(?!𐰀)(?=[\u{10C00}-\u{10C4F}])/gu, '$1') // trim a/e ignores vowel shift
    //.replace(/(?<=𐰀[^𐰀𐰃𐰆𐰇\s]{0,29})(?<=[\u{10C00}-\u{10C4F}]{2,30})𐰀(𐰀*)(?!𐰀)(?=[\u{10C00}-\u{10C4F}])/gu, '$1') // trim 2nd onward

    .replace(/(?<![𐰆𐰃𐰇][^𐰀𐰃𐰆𐰇\s]{0,29})(?<=[\u{10C00}-\u{10C4F}])𐰀(𐰀*)(?!𐰀)(?=[\u{10C00}-\u{10C4F}])/gu, '$1')
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

// DOM
document.addEventListener('DOMContentLoaded', () => {
  const latinInput    = document.getElementById('latin');
  const gokturkOutput = document.getElementById('gokturk');

  if (latinInput && gokturkOutput) {
    latinInput.addEventListener('input', (e) => {
      gokturkOutput.value = latinToGokturk(e.target.value);
    });
  }
});
