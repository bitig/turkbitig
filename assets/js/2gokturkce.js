// Copyright (C) turkbitig.com. All Rights Reserved.

const backVowelMap = {
  'a':'𐰀', 'ı':'𐰃', 'o':'𐰆', 'u':'𐰆',
  'ç': '𐰲', 'm': '𐰢', 'p': '𐰯', 'ş': '𐱁', 'z': '𐰔',
  'b': '𐰉', 'd': '𐰑', 'g': '𐰍', 'k': '𐰴', 'l': '𐰞', 'n': '𐰣', 'r': '𐰺', 's': '𐰽', 't': '𐱃', 'y': '𐰖'
};

const frontVowelMap = {
  'e':'𐰀', 'i':'𐰃', 'ö':'𐰇', 'ü':'𐰇',
  'ç': '𐰲', 'm': '𐰢', 'p': '𐰯', 'ş': '𐱁', 'z': '𐰔',
  'b': '𐰋', 'd': '𐰓', 'g': '𐰏', 'k': '𐰚', 'l': '𐰠', 'n': '𐰤', 'r': '𐰼', 's': '𐰾', 't': '𐱅', 'y': '𐰘'
};

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
  'ñ':  ['ң', 'ň', 'ŋ'],
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
  'z':  ['з']
};

const replacementMap = {};
for (const [standard, alts] of Object.entries(replacements)) {
  for (const alt of alts) {
    replacementMap[alt] = standard;
  }
}
const replacementKeys = Object.keys(replacementMap).sort((a, b) => b.length - a.length);

const VOWELS = 'aeıioöuü';

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
        v2HasTrailing = (rightVowelPos + 1 < word.length);
      } else {
        const nextVowelPos = vowelIndices[i + 2];
        for (let k = rightVowelPos + 1; k < nextVowelPos; k++) {
          if (!VOWELS.includes(word[k])) {
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

function latinToGokturk(input) {
  let text = input
    .replace(/I/g, 'ı')
    .replace(/İ/g, 'i')
    .toLowerCase();

  for (const key of replacementKeys) {
    text = text.split(key).join(replacementMap[key]);
  }

  const syllables = syllabify(text);
  let result = '';

  for (const syl of syllables) {
    const vowel = [...syl].find(c => VOWELS.includes(c));

    if (!vowel) {
      result += convertSyllable(syl, backVowelMap);
      continue;
    }

    const isBack = 'aıou'.includes(vowel);
    const map = isBack ? backVowelMap : frontVowelMap;
    result += convertSyllable(syl, map);
  }

  result = result
    // Ligatures
    .replace(/[𐰤𐰣][𐰓𐰑𐱃𐱅]/gu, '𐰦')
    .replace(/[𐰞𐰠][𐰓𐰑𐱃𐱅]/gu, '𐰡')
    .replace(/[𐰤𐰣]𐰲/gu, '𐰨')
    .replace(/[𐰤𐰣]𐰖/gu, '𐰪')
    .replace(/𐰃𐰴/gu, '𐰶')   // ık
    .replace(/𐰆𐰴/gu, '𐰸')   // ok/uk
    .replace(/𐰇[𐰚𐰜]/gu, '𐰜') // ök/ük

    // vowels
    .replace(/(\S𐰀|𐰀\S)𐰀(?=\S)/gu, '$1')
    .replace(/(\S𐰆|𐰆\S)𐰆(?=\S)/gu, '$1')
    .replace(/(\S𐰃|𐰃\S)𐰃(?=\S)/gu, '$1')
    .replace(/(\S𐰇|𐰇\S)𐰇(?=\S)/gu, '$1')

    // Special cases
    .replace(/𐱅𐰼𐰚/gu, '𐱅𐰇𐰼𐰜')
    .replace(/𐱅𐰀𐰭𐰼𐰃/gu, '𐱅𐰭𐰼𐰃')
    .replace(/𐱃𐰀𐰣𐰺𐰃/gu, '𐱅𐰭𐰼𐰃')
    .replace(/[𐱅𐱃]𐰇𐰼[𐰴𐰚𐰶𐰸]/gu, '𐱅𐰇𐰼𐰜');

  return result;
}

//  DOM
document.addEventListener('DOMContentLoaded', () => {
  const latinInput    = document.getElementById('latin');
  const gokturkOutput = document.getElementById('gokturk');

  if (latinInput && gokturkOutput) {
    latinInput.addEventListener('input', (e) => {
      gokturkOutput.value = latinToGokturk(e.target.value);
    });
  }
});
