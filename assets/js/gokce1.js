// Copyright (C) turkbitig.com. All Rights Reserved.

const back_consonants = {
  'b': '𐰉', 'v': '𐰉',
  'd': '𐰑',
  'g': '𐰍', 'ğ': '𐰍',
  'k': '𐰴', 'h': '𐰴',
  'l': '𐰞',
  'n': '𐰣',
  'r': '𐰺',
  's': '𐰽',
  't': '𐱃',
  'y': '𐰖',
  'ç': '𐰲', 'c': '𐰲',
  'm': '𐰢',
  'ñ': '𐰭',
  'p': '𐰯', 'f': '𐰯',
  'ş': '𐱁', 'j': '𐱁',
  'z': '𐰔',
};
const front_consonants = {
  'b': '𐰋', 'v': '𐰉',
  'd': '𐰓',
  'g': '𐰏', 'ğ': '𐰏',
  'k': '𐰚', 'h': '𐰚',
  'l': '𐰠',
  'n': '𐰤',
  'r': '𐰼',
  's': '𐰾',
  't': '𐱅',
  'y': '𐰘',
  'ç': '𐰲', 'c': '𐰲',
  'ñ': '𐰭',
  'm': '𐰢',
  'p': '𐰯', 'f': '𐰯',
  'ş': '𐱁', 'j': '𐱁', 
  'z': '𐰔',
};
const back_vowels = {
  'a': '𐰀',
  'ı': '𐰃',
  'o': '𐰆',
  'u': '𐰆',
};
const front_vowels = {
  'e': '𐰀', 'ə': '𐰀', 'ä': '𐰀', 
  'i': '𐰃',
  'ö': '𐰇',
  'ü': '𐰇',
};
const all_vowels = new Set([...Object.keys(back_vowels), ...Object.keys(front_vowels)]);

function isVowel(c) {
  return all_vowels.has(c);
}

function getSyllables(word) {
  if (!word.length) return [];
  let vowelIndices = [];
  for (let i = 0; i < word.length; i++) {
    if (isVowel(word[i])) {
      vowelIndices.push(i);
    }
  }
  if (!vowelIndices.length) return [word]; 
  let syllables = [];
  let start = 0;
  for (let k = 0; k < vowelIndices.length; k++) {
    let vowelPos = vowelIndices[k];
    let nextVowelPos = (k + 1 < vowelIndices.length) ? vowelIndices[k + 1] : word.length;
    let consBetween = nextVowelPos - vowelPos - 1;
    let codaLength;
    if (k + 1 === vowelIndices.length) {
      codaLength = consBetween;
    } else {
      codaLength = consBetween - 1 < 0 ? 0 : consBetween - 1;
    }
    let sylEnd = vowelPos + 1 + codaLength;
    let syl = word.slice(start, sylEnd);
    syllables.push(syl);
    start = sylEnd;
  }
  return syllables;
}

function convertLogic(input) {
  if (!input) return "";
  
  input = input.replace(/I/g, 'ı');
  input = input.replace(/İ/g, 'i');
  input = input.toLowerCase();
  
  let lines = input.split('\n');
  let outputLines = [];
  
  for (let line of lines) {
    let words = line.split(/\s+/);
    let outputWords = [];
    for (let word of words) {
        if(word === "") {
             outputWords.push("");
             continue;
        }
      let wordOut = '';
      let syllables = getSyllables(word);
      for (let syl of syllables) {
        let harmony = null;
        for (let ch of syl) {
          if (back_vowels[ch]) {
            harmony = 'back';
            break;
          } else if (front_vowels[ch]) {
            harmony = 'front';
            break;
          }
        }
        
        if (harmony === null) {
          harmony = 'back';
        }
        for (let ch of syl) {
          if (back_vowels[ch]) {
            wordOut += back_vowels[ch];
          } else if (front_vowels[ch]) {
            wordOut += front_vowels[ch];
          } else {
            if (harmony === 'back' && back_consonants[ch]) {
              wordOut += back_consonants[ch];
            } else if (harmony === 'front' && front_consonants[ch]) {
              wordOut += front_consonants[ch];
            } else {
              wordOut += ch;
            }
          }
        }
      }
      outputWords.push(wordOut);
    }
    outputLines.push(outputWords.join(' '));
  }
  
  let output = outputLines.join('\n');
  
  // spacial cases
  output = output.replace(/[𐰤𐰣][𐰓𐰑]/gu, '𐰦');
  output = output.replace(/[𐰞𐰠][𐰓𐰑]/gu, '𐰡');
  output = output.replace(/[𐰤𐰣]𐰲/gu, '𐰨');
  output = output.replace(/[𐰤𐰣][𐰘𐰖]/gu, '𐰪');
  output = output.replace(/𐰇[𐰚𐰜]/gu, '𐰜');
  output = output.replace(/𐰃𐰴/gu, '𐰶');
//  output = output.replace(/𐰴𐰃/gu, '𐰶𐰃');
  output = output.replace(/(?<=^|\s)𐰴𐰃/gu, '𐰶𐰃');
  output = output.replace(/𐰆𐰴/gu, '𐰸');
//  output = output.replace(/𐰴𐰆/gu, '𐰸𐰆');
  output = output.replace(/(?<=^|\s)𐰴𐰆/gu, '𐰸𐰆');
  output = output.replace(/(?<=\S𐰀|𐰀\S)𐰀(?=[\u{10C01}-\u{10C48}])/gu, '');
  output = output.replace(/(?<=\S𐰃|𐰃\S)𐰃(?=[\u{10C00}-\u{10C02}\u{10C04}-\u{10C48}])/gu, '');
  output = output.replace(/(?<=\S𐰆|𐰆\S)𐰆(?=[\u{10C00}-\u{10C05}\u{10C07}-\u{10C48}])/gu, '');
  output = output.replace(/(?<=\S𐰇|𐰇\S)𐰇(?=[\u{10C00}-\u{10C06}\u{10C08}-\u{10C48}])/gu, '');
  output = output.replace(/𐰀𐱃𐱅𐰇𐰼𐰚/g, '𐰀𐱃𐰀𐱅𐰇𐰼𐰜');
  output = output.replace(/𐱅𐰼𐰚/g, '𐱅𐰇𐰼𐰜');
  output = output.replace(/𐱅𐰀𐰭𐰼𐰃/g, '𐱅𐰭𐰼𐰃');
  output = output.replace(/𐱃𐰀𐰣𐰺𐰃/g, '𐱅𐰭𐰼𐰃');
  output = output.replace(/[𐱅𐱃]𐰇𐰼[𐰴𐰚𐰶𐰸]/gu, '𐱅𐰇𐰼𐰜');
  
  return output;
}

const textArea = document.getElementById('gokturk');

let latinBuffer = ""; 

textArea.addEventListener('input', (e) => {
    if (e.inputType === 'insertText' && e.data) {
        latinBuffer += e.data;
    } else if (e.inputType === 'deleteContentBackward') {
        latinBuffer = latinBuffer.slice(0, -1);
    } else if (e.inputType === 'insertLineBreak') {
        latinBuffer += '\n';
    } else if (e.inputType === 'insertFromPaste') {
         if (e.data) latinBuffer += e.data;
    } else if (textArea.value === '') {
        latinBuffer = "";
    }

    const convertedText = convertLogic(latinBuffer);

    textArea.value = convertedText;
});
