// Copyright (C) turkbitig.com. All Rights Reserved.
document.addEventListener('DOMContentLoaded', () => {
  const gokturk = document.getElementById('gokturk');
  const clearButton = document.getElementById('clearGokturk');
  const charsetButton = document.getElementById('charset1'); // Get charset1 button
  let latinText = '';
  let currentPosMap = [0];
  const backVowelMap = {
    'ab': '𐰀𐰉','ba': '𐰉𐰀','ıb': '𐰃𐰉','bı': '𐰉𐰃','ob': '𐰆𐰉','bo': '𐰉𐰆',
    'ad': '𐰀𐰑','da': '𐰑𐰀','ıd': '𐰃𐰑','dı': '𐰑𐰃','od': '𐰆𐰑','do': '𐰑𐰆',
    'ag': '𐰀𐰍','ga': '𐰍𐰀','ıg': '𐰃𐰍','gı': '𐰍𐰃','og': '𐰆𐰍','go': '𐰍𐰆',
    'ak': '𐰀𐰴','ka': '𐰴𐰀','ık': '𐰶','kı': '𐰶𐰃','ok': '𐰸','ko': '𐰸𐰆',
    'al': '𐰀𐰞','la': '𐰞𐰀','ıl': '𐰃𐰞','lı': '𐰞𐰃','ol': '𐰆𐰞','lo': '𐰞𐰆',
    'an': '𐰀𐰣','na': '𐰣𐰀','ın': '𐰃𐰣','nı': '𐰣𐰃','on': '𐰆𐰣','no': '𐰣𐰆',
    'ar': '𐰀𐰺','ra': '𐰺𐰀','ır': '𐰃𐰺','rı': '𐰺𐰃','or': '𐰆𐰺','ro': '𐰺𐰆',
    'as': '𐰀𐰽','sa': '𐰽𐰀','ıs': '𐰃𐰽','sı': '𐰽𐰃','os': '𐰆𐰽','so': '𐰽𐰆',
    'at': '𐰀𐱃','ta': '𐱃𐰀','ıt': '𐰃𐱃','tı': '𐱃𐰃','ot': '𐰆𐱃','to': '𐱃𐰆',
    'ay': '𐰀𐰖','ya': '𐰖𐰀','ıy': '𐰃𐰖','yı': '𐰖𐰃','oy': '𐰆𐰖','yo': '𐰖𐰆',
    'a': '𐰀','ı': '𐰃','o': '𐰆',
    'b': '𐰉','d': '𐰑','g': '𐰍','k': '𐰴','l': '𐰞','n': '𐰣','r': '𐰺','s': '𐰽','t': '𐱃','y': '𐰖',
    'ç': '𐰲','m': '𐰢','ñ': '𐰭','p': '𐰯','ş': '𐱁','z': '𐰔'
  };
  const frontVowelMap = {
    'eb': '𐰀𐰋','be': '𐰋𐰀','ib': '𐰃𐰋','bi': '𐰋𐰃','öb': '𐰇𐰋','bö': '𐰋𐰇',
    'ed': '𐰀𐰓','de': '𐰓𐰀','id': '𐰃𐰓','di': '𐰓𐰃','öd': '𐰇𐰓','dö': '𐰓𐰇',
    'eg': '𐰀𐰏','ge': '𐰏𐰀','ig': '𐰃𐰏','gi': '𐰏𐰃','ög': '𐰇𐰏','gö': '𐰏𐰇',
    'ek': '𐰀𐰚','ke': '𐰚𐰀','ik': '𐰃𐰚','ki': '𐰚𐰃','ök': '𐰇𐰜','kö': '𐰚𐰇',
    'el': '𐰀𐰠','le': '𐰠𐰀','il': '𐰃𐰠','li': '𐰠𐰃','öl': '𐰇𐰠','lö': '𐰠𐰇',
    'en': '𐰀𐰤','ne': '𐰤𐰀','in': '𐰃𐰤','ni': '𐰤𐰃','ön': '𐰇𐰤','nö': '𐰤𐰇',
    'er': '𐰀𐰼','re': '𐰼𐰀','ir': '𐰃𐰼','ri': '𐰼𐰃','ör': '𐰇𐰼','rö': '𐰼𐰇',
    'es': '𐰀𐰾','se': '𐰾𐰀','is': '𐰃𐰾','si': '𐰾𐰃','ös': '𐰇𐰾','sö': '𐰾𐰇',
    'et': '𐰀𐱅','te': '𐱅𐰀','it': '𐰃𐱅','ti': '𐱅𐰃','öt': '𐰇𐱅','tö': '𐱅𐰇',
    'ey': '𐰀𐰘','ye': '𐰘𐰀','iy': '𐰃𐰘','yi': '𐰘𐰃','öy': '𐰇𐰘','yö': '𐰘𐰇',
    'e': '𐰀','i': '𐰃','ö': '𐰇',
    'b': '𐰋','d': '𐰓','g': '𐰏','k': '𐰚','l': '𐰠','n': '𐰤','r': '𐰼','s': '𐰾','t': '𐱅','y': '𐰘',
    'ç': '𐰲','m': '𐰢','ñ': '𐰭','p': '𐰯','ş': '𐱁','z': '𐰔'
  };
  const vowels = new Set(['a','e','ı','i','o','ö','u','ü']);
  const backVowels = new Set(['a', 'ı', 'o', 'u']);
  const frontVowels = new Set(['e', 'i', 'ö', 'ü']);
  const replacements = {
    'a': ['а'], // kz а
    'b': ['v', 'б', 'в'], // kz бв
    'ç': ['c', 'j', 'ч'], // kz ч
    'd': ['д'], // kz д
    'e': ['ä', 'ə', 'э', 'ә', 'е'], // kz еэә, az ə
    'g': ['q', 'ğ', 'г', 'ғ'],
    'ı': ['ы'], // kz ыI
    'i': ['İ', 'і'], // kz і
    'k': ['h', 'қ', 'к', 'һ', 'х'], // kz һх
    'l': ['л'], // kz л
    'm': ['м'], // kz м
    'n': ['н'], // kz н
    'ñ': ['ң'], // kz ң
    'o': ['u', 'ū', 'ұ', 'у', 'о'], // kz ұуо
    'ö': ['ü', 'w', 'ү', 'ө'], // kz үө
    'p': ['f', 'ф', 'п'], // kz пф
    'r': ['р'], // kz р
    's': ['с', 'ц'], // kz сц
    'ş': ['x', 'ш'], // kz ш
    't': ['т'], // kz т
    'y': ['Ý', 'ý', 'ж', 'ё', 'ю','я', 'й'], // kz жёюя
    'z': ['з'], // kz з
  };
  const replaceMap = {};
  for (const [target, sources] of Object.entries(replacements)) {
    for (let src of sources) {
      const lowSrc = src.toLocaleLowerCase('tr-TR');
      replaceMap[lowSrc] = target;
    }
  }
  function applyReplacement(result, posMap, regex, repl) {
    let newResult = '';
    let newPosMap = [posMap[0]];
    let lastEnd = 0;
    regex.lastIndex = 0;
    let match;
    while ((match = regex.exec(result)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      newResult += result.slice(lastEnd, start);
      for (let k = 1; k <= start - lastEnd; k++) newPosMap.push(posMap[lastEnd + k]);
      const rep = typeof repl === 'function' ? repl(match) : repl;
      const repLen = rep.length;
      newResult += rep;
      const inputStart = posMap[start];
      const inputEnd = posMap[end];
      const delta = inputEnd - inputStart;
      if (repLen === 0) {
        newPosMap[newPosMap.length - 1] = inputEnd;
      } else {
        for (let j = 1; j <= repLen; j++) {
          const frac = j / repLen;
          newPosMap.push(inputStart + Math.floor(frac * delta));
        }
      }
      lastEnd = end;
    }
    newResult += result.slice(lastEnd);
    for (let k = 1; k <= result.length - lastEnd; k++) newPosMap.push(posMap[lastEnd + k]);
    return { result: newResult, posMap: newPosMap };
  }
  function convertToOldTurkic(input) {
    let result = '';
    let posMap = [0];
    let i = 0;
    let currentMap = backVowelMap;
    let isNewWord = true;
    while (i < input.length) {
      const oldI = i;
      const oldLen = result.length;
      const ch = input[i];
      if (/\s/.test(ch)) {
        result += ch;
        isNewWord = true;
        i++;
        posMap.push(oldI);
        continue;
      }
      if (isNewWord) {
        currentMap = backVowelMap;
        isNewWord = false;
      }
      let processed = false;
      if (i + 1 < input.length) {
        const first = input[i];
        const second = input[i + 1];
        if (!vowels.has(first) && vowels.has(second)) {
          const pair = first + second;
          if (backVowelMap.hasOwnProperty(pair)) {
            result += backVowelMap[pair];
            currentMap = backVowelMap;
            i += 2;
            processed = true;
          } else if (frontVowelMap.hasOwnProperty(pair)) {
            result += frontVowelMap[pair];
            currentMap = frontVowelMap;
            i += 2;
            processed = true;
          }
        }
        if (!processed && vowels.has(first) && !vowels.has(second)) {
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
              processed = true;
            } else if (frontVowelMap.hasOwnProperty(pair)) {
              result += frontVowelMap[pair];
              currentMap = frontVowelMap;
              i += 2;
              processed = true;
            }
          }
        }
        if (processed) {
          const addedInput = i - oldI;
          const addedOutput = result.length - oldLen;
          for (let j = 1; j <= addedOutput; j++) {
            const fraction = j / addedOutput;
            posMap.push(oldI + Math.floor(fraction * addedInput));
          }
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
      const addedInput = i - oldI;
      const addedOutput = result.length - oldLen;
      for (let j = 1; j <= addedOutput; j++) {
        const fraction = j / addedOutput;
        posMap.push(oldI + Math.floor(fraction * addedInput));
      }
    }
    const rules = [
      { regex: /[𐰤𐰣][𐰓𐰑]/gu, repl: '𐰦' },
      { regex: /[𐰞𐰠][𐰓𐰑]/gu, repl: '𐰡' },
      { regex: /[𐰤𐰣]𐰲/gu, repl: '𐰨' },
      { regex: /[𐰤𐰣]𐰖/gu, repl: '𐰪' },
      { regex: /𐰇[𐰚𐰜]/gu, repl: '𐰜' },
      { regex: /𐰃𐰴/gu, repl: '𐰶' },
      { regex: /𐰆𐰴/gu, repl: '𐰸' },
      { regex: /(?<=\S𐰀|𐰀\S)𐰀(?=[\u{10C01}-\u{10C48}])/gu, repl: '' },
      { regex: /(?<=\S𐰃|𐰃\S)𐰃(?=[\u{10C00}-\u{10C02}\u{10C04}-\u{10C48}])/gu, repl: '' },
      { regex: /(?<=\S𐰆|𐰆\S)𐰆(?=[\u{10C00}-\u{10C05}\u{10C07}-\u{10C48}])/gu, repl: '' },
      { regex: /(?<=\S𐰇|𐰇\S)𐰇(?=[\u{10C00}-\u{10C06}\u{10C08}-\u{10C48}])/gu, repl: '' },
      { regex: /𐰀𐱃𐱃𐰇𐰼𐰚/gu, repl: '𐰀𐱃𐰀𐱅𐰇𐰼𐰜' },
      { regex: /𐱅𐰼𐰚/gu, repl: '𐱅𐰇𐰼𐰜' },
      { regex: /𐱅𐰀𐰭𐰼𐰃/gu, repl: '𐱅𐰭𐰼𐰃' },
      { regex: /𐱃𐰀𐰣𐰺𐰃/gu, repl: '𐱅𐰭𐰼𐰃' },
      { regex: /[𐱅𐱃]𐰇𐰼[𐰴𐰚𐰶𐰸]/gu, repl: '𐱅𐰇𐰼𐰜' }
    ];
    for (const rule of rules) {
      ({ result, posMap } = applyReplacement(result, posMap, rule.regex, rule.repl));
    }
    return { result, posMap };
  }
  function setCaretTextarea(textarea, pos) {
    const safe = Math.max(0, Math.min(pos, textarea.value.length));
    textarea.setSelectionRange(safe, safe);
    textarea.focus();
  }
  function scrollToBottom() {
    gokturk.scrollTop = gokturk.scrollHeight;
  }
  gokturk.addEventListener('beforeinput', (e) => {
    const inputType = e.inputType;
    let data = e.data || '';
    const isInsert = inputType === 'insertText' || inputType === 'insertCompositionText' || inputType === 'insertLineBreak' || inputType === 'insertFromPaste';
    const isDeleteBackward = inputType === 'deleteContentBackward';
    const isDeleteForward = inputType === 'deleteContentForward';
    if (!(isInsert || isDeleteBackward || isDeleteForward)) return;
    e.preventDefault();
    if (inputType === 'insertLineBreak') data = '\n';
    data = data.toLocaleLowerCase('tr-TR');
    data = [...data].map(ch => replaceMap[ch] || ch).join('');
    const startOut = gokturk.selectionStart || 0;
    const endOut = gokturk.selectionEnd || 0;
    const inputStart = currentPosMap[startOut] !== undefined ? currentPosMap[startOut] : latinText.length;
    const inputEnd = currentPosMap[endOut] !== undefined ? currentPosMap[endOut] : latinText.length;
    let newInputPos;
    if (isInsert) {
      latinText = latinText.slice(0, inputStart) + data + latinText.slice(inputEnd);
      newInputPos = inputStart + data.length;
    } else {
      if (startOut === endOut) {
        if (isDeleteBackward && startOut > 0) {
          const inEnd = currentPosMap[startOut];
          const chars = [...latinText.slice(0, inEnd)];
          chars.pop();
          const inStart = chars.join('').length;
          latinText = latinText.slice(0, inStart) + latinText.slice(inEnd);
          newInputPos = inStart;
        } else if (isDeleteForward && endOut < gokturk.value.length) {
          const inStart = currentPosMap[endOut];
          const nextChars = [...latinText.slice(inStart)];
          nextChars.shift();
          const inEnd = inStart + (latinText.length - inStart - nextChars.join('').length);
          latinText = latinText.slice(0, inStart) + latinText.slice(inEnd);
          newInputPos = inStart;
        } else {
          return;
        }
      } else {
        latinText = latinText.slice(0, inputStart) + latinText.slice(inputEnd);
        newInputPos = inputStart;
      }
    }
    const { result, posMap } = convertToOldTurkic(latinText);
    gokturk.value = result;
    currentPosMap = posMap;
    let newOutputPos = posMap.length - 1;
    for (let m = 0; m < posMap.length; m++) {
      if (posMap[m] >= newInputPos) {
        newOutputPos = m;
        break;
      }
    }
    setCaretTextarea(gokturk, newOutputPos);
    scrollToBottom();
  });
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      latinText = '';
      const init = convertToOldTurkic(latinText);
      gokturk.value = init.result;
      currentPosMap = init.posMap;
      setCaretTextarea(gokturk, 0);
      scrollToBottom();
    });
  }

  // all allChars
  if (charsetButton) {
    charsetButton.addEventListener('click', () => {
      latinText = '𐰀𐰃 𐰉𐰋 𐰲𐰱 𐰑𐰓 𐰍𐰏 𐰴𐰚 𐰶𐰸𐰜 𐰞𐰠 𐰢 𐰣𐰤𐰭 𐰆𐰇 𐰯 𐰺𐰼 𐰽𐰾𐱁 𐱃𐱅 𐰖𐰘 𐰔 𐰪𐰨 𐰦𐰡';
      const { result, posMap } = convertToOldTurkic(latinText);
      gokturk.value = result;
      currentPosMap = posMap;
      setCaretTextarea(gokturk, result.length);
      scrollToBottom();
    });
  }

  latinText = 'török';
  const init = convertToOldTurkic(latinText);
  gokturk.value = init.result;
  setCaretTextarea(gokturk, init.result.length);
  currentPosMap = init.posMap;
});
