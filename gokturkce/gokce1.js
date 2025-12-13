// Copyright (C) turkbitig.com. All Rights Reserved.

document.addEventListener('DOMContentLoaded', () => {
  // Get the output div where Old Turkic (Göktürk) script will be displayed
  const gokturkDiv = document.getElementById('gokturk');
  // Preserve whitespace and line breaks while allowing wrapping
  gokturkDiv.style.whiteSpace = 'pre-wrap';

  // Mapping tables for back-vowel harmony (a, ı, o, u)
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

  // Mapping tables for front-vowel harmony (e, i, ö, ü)
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
    'e': '𐰀', 'i': '𐰃', 'ö': '𐰇',
    'b': '𐰋', 'd': '𐰓', 'g': '𐰏', 'k': '𐰚', 'l': '𐰠', 'n': '𐰤', 'r': '𐰼', 's': '𐰾', 't': '𐱅', 'y': '𐰘',
    'ç': '𐰱', 'ç': '𐰲', 'm': '𐰢', 'ñ': '𐰭', 'p': '𐰯', 'ş': '𐱁', 'z': '𐰔',
  };

  // Set of Latin vowels used to detect vowel characters
  const vowels = new Set(['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü']);

  // Core function that transliterates modern Turkish Latin text to Old Turkic (Orkhon-Yenisei) script
  function convertToOldTurkic(input) {
    let result = '';
    let i = 0;
    // Start with back-vowel map; will switch based on first vowel of each word
    let currentMap = backVowelMap;
    let isNewWord = true;

    while (i < input.length) {
      const ch = input[i];

      // Preserve whitespace and reset vowel harmony for new word
      if (/\s/.test(ch)) {
        result += ch;
        isNewWord = true;
        i++;
        continue;
      }

      // At start of a word, default to back-vowel map until a vowel determines harmony
      if (isNewWord) {
        currentMap = backVowelMap;
        isNewWord = false;
      }

      // Try to match two-character combinations (consonant-vowel or vowel-consonant)
      if (i + 1 < input.length) {
        const first = input[i].toLowerCase();
        const second = input[i + 1].toLowerCase();
        const pair1 = first + second;   // e.g., "ab"
        const pair2 = second + first;   // e.g., "ba"

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

      // Fallback to single character
      const singleChar = input[i].toLowerCase();

      // Vowels determine or confirm the harmony map for the word
      if (vowels.has(singleChar)) {
        if (backVowelMap.hasOwnProperty(singleChar)) {
          result += backVowelMap[singleChar];
          currentMap = backVowelMap;
        } else if (frontVowelMap.hasOwnProperty(singleChar)) {
          result += frontVowelMap[singleChar];
          currentMap = frontVowelMap;
        } else {
          result += input[i]; // unknown vowel, keep original
        }
      } else {
        // Consonants use the current harmony map
        if (currentMap.hasOwnProperty(singleChar)) {
          result += currentMap[singleChar];
        } else {
          result += input[i]; // unknown consonant, keep original
        }
      }
      i++;
    }

    // Post-processing ligatures and historical orthographic adjustments
    result = result.replace(/[𐰤𐰣][𐰓𐰑𐱃𐱅]/gu, '𐰦');
    result = result.replace(/[𐰞𐰠][𐰓𐰑𐱃𐱅]/gu, '𐰡');
    result = result.replace(/[𐰤𐰣]𐰲/gu, '𐰨');
    result = result.replace(/[𐰤𐰣]𐰖/gu, '𐰪');
    result = result.replace(/𐰇[𐰚𐰜]/gu, '𐰜');
    result = result.replace(/𐰃𐰴/gu, '𐰶');
    result = result.replace(/𐰆𐰴/gu, '𐰸');

    // Remove redundant vowel letters in certain contexts (historical spelling simplification)
    result = result.replace(/(?<=\S𐰀|𐰀\S)𐰀(?=[^\s\x00-\x7F])/gu, '');
    result = result.replace(/(?<=\S𐰆|𐰆\S)𐰆(?=\S)/gu, '');
    result = result.replace(/(?<=\S𐰃|𐰃\S)𐰃(?=\S)/gu, '');
    result = result.replace(/(?<=\S𐰇|𐰇\S)𐰇(?=\S)/gu, '');

    // Specific word or sequence corrections (likely for common words or proper rendering)
    result = result.replace(/𐰀𐱃𐱃𐰇𐰼𐰚/g, '𐰀𐱃𐰀𐱅𐰇𐰼𐰜');
    result = result.replace(/𐱅𐰼𐰚/g, '𐱅𐰇𐰼𐰜');
    result = result.replace(/𐱅𐰀𐰭𐰼𐰃/g, '𐱅𐰭𐰼𐰃');
    result = result.replace(/𐱃𐰀𐰣𐰺𐰃/g, '𐱅𐰭𐰼𐰃');
    result = result.replace(/[𐱅𐱃]𐰇𐰼[𐰴𐰚𐰶𐰸]/gu, '𐱅𐰇𐰼𐰜');

    return result;
  }

  const replacements = {
    'Ä': 'e', 'ä': 'e',
    'Ə': 'e', 'ə': 'e',
    'İ': 'i', 'I': 'ı',
    'h': 'k', 'H': 'k',
    'X': 'ç', 'x': 'ç',
    'Q': 'g', 'q': 'g',
    'C': 'ç', 'c': 'ç',
    'J': 'ş', 'j': 'ş',
    'ğ': 'g', 'Ğ': 'g',
    'f': 'p', 'F': 'p',
    'v': 'b', 'V': 'b',
    'W': 'ö', 'w': 'ö',
    'U': 'o', 'u': 'o',
    'Ū': 'o', 'ū': 'o',
    'Ü': 'ö', 'ü': 'ö',
    'Ý': 'y', 'ý': 'y',
  };

  // Zero-width space used as a marker to help with cursor positioning at end of lines
  let latinSource = '';
  const ZWS = '\u200B';

  // Apply letter normalisation before conversion
  function preprocessInput(text) {
    return text.replace(/./g, char => replacements[char] || char);
  }

  // Re-run conversion and update the visible Old Turkic output
  function render() {
    const processed = preprocessInput(latinSource);
    let output = convertToOldTurkic(processed);
    // Append ZWS if text ends with newline to allow cursor placement after it
    if (output.endsWith('\n')) output += ZWS;
    gokturkDiv.textContent = output;
  }

  // Calculate current selection offsets in the visible Old Turkic text (ignoring ZWS)
  function getSelectionRange() {
    const sel = window.getSelection();
    if (sel.rangeCount === 0) return { start: 0, end: 0 };
    const range = sel.getRangeAt(0);
    const preStart = range.cloneRange();
    preStart.selectNodeContents(gokturkDiv);
    preStart.setEnd(range.startContainer, range.startOffset);
    const preEnd = range.cloneRange();
    preEnd.selectNodeContents(gokturkDiv);
    preEnd.setEnd(range.endContainer, range.endOffset);
    const start = preStart.toString().replace(/\u200B/g, '').length;
    const end = preEnd.toString().replace(/\u200B/g, '').length;
    return { start, end };
  }

  // Place caret at a specific character offset in the visible Old Turkic text
  function setCaretPosition(offset) {
    const sel = window.getSelection();
    const range = document.createRange();
    const text = gokturkDiv.firstChild;
    if (!text) {
      range.setStart(gokturkDiv, 0);
    } else {
      let realOffset = offset;
      const content = text.textContent;
      // Skip over ZWS markers when calculating node offset
      for (let i = 0; i < content.length && i < realOffset; i++) {
        if (content[i] === ZWS) realOffset++;
      }
      range.setStart(text, Math.min(realOffset, content.length));
    }
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  // Ensure the cursor is visible by scrolling the window if needed
  function scrollToCursor() {
    const sel = window.getSelection();
    if (sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
   
    // Scroll down if cursor is below viewport
    if (rect.bottom > window.innerHeight) {
      window.scrollBy({ top: rect.bottom - window.innerHeight + 50, behavior: 'instant' });
    }
    // Scroll up if cursor is above viewport
    if (rect.top < 0) {
      window.scrollBy({ top: rect.top - 50, behavior: 'instant' });
    }
  }

  // Approximate mapping: Old Turkic position → Latin source position (proportional)
  function gokturkToLatinPos(gkPos) {
    const gokturk = convertToOldTurkic(preprocessInput(latinSource));
    if (gokturk.length === 0) return 0;
    return Math.min(Math.round(gkPos * latinSource.length / gokturk.length), latinSource.length);
  }

  // Approximate mapping: Latin source position → Old Turkic position (proportional)
  function latinToGokturkPos(latPos) {
    const gokturk = convertToOldTurkic(preprocessInput(latinSource));
    if (latinSource.length === 0) return 0;
    return Math.min(Math.round(latPos * gokturk.length / latinSource.length), gokturk.length);
  }

  // Intercept all editing operations on the Old Turkic display div
  gokturkDiv.addEventListener('beforeinput', (e) => {
    e.preventDefault(); // Block native editing of the display div
    const { start: gkStart, end: gkEnd } = getSelectionRange();
    // Map visible selection to hidden Latin source
    let latStart = gokturkToLatinPos(gkStart);
    let latEnd = gokturkToLatinPos(gkEnd);

    switch (e.inputType) {
      case 'insertText':
        if (e.data) {
          // Insert typed character into hidden Latin source
          latinSource = latinSource.slice(0, latStart) + e.data + latinSource.slice(latEnd);
          render();
          setCaretPosition(latinToGokturkPos(latStart + e.data.length));
          scrollToCursor();
        }
        break;
      case 'insertFromPaste':
        const pasteData = e.data || (e.dataTransfer?.getData('text/plain')) || '';
        if (pasteData) {
          latinSource = latinSource.slice(0, latStart) + pasteData + latinSource.slice(latEnd);
          render();
          setCaretPosition(latinToGokturkPos(latStart + pasteData.length));
          scrollToCursor();
        }
        break;
      case 'deleteContentBackward':
        if (latStart !== latEnd) {
          latinSource = latinSource.slice(0, latStart) + latinSource.slice(latEnd);
        } else if (latStart > 0) {
          latinSource = latinSource.slice(0, latStart - 1) + latinSource.slice(latStart);
          latStart--;
        }
        render();
        setCaretPosition(latinToGokturkPos(latStart));
        scrollToCursor();
        break;
      case 'deleteContentForward':
        if (latStart !== latEnd) {
          latinSource = latinSource.slice(0, latStart) + latinSource.slice(latEnd);
        } else if (latStart < latinSource.length) {
          latinSource = latinSource.slice(0, latStart) + latinSource.slice(latStart + 1);
        }
        render();
        setCaretPosition(latinToGokturkPos(latStart));
        scrollToCursor();
        break;
      case 'insertLineBreak':
      case 'insertParagraph':
        latinSource = latinSource.slice(0, latStart) + '\n' + latinSource.slice(latEnd);
        render();
        setCaretPosition(latinToGokturkPos(latStart + 1));
        scrollToCursor();
        break;
      case 'deleteByCut':
        latinSource = latinSource.slice(0, latStart) + latinSource.slice(latEnd);
        render();
        setCaretPosition(latinToGokturkPos(latStart));
        scrollToCursor();
        break;
      case 'deleteWordBackward':
        let wordStart = latStart;
        while (wordStart > 0 && latinSource[wordStart - 1] !== ' ') wordStart--;
        latinSource = latinSource.slice(0, wordStart) + latinSource.slice(latEnd);
        render();
        setCaretPosition(latinToGokturkPos(wordStart));
        scrollToCursor();
        break;
      case 'deleteWordForward':
        let wordEnd = latEnd;
        while (wordEnd < latinSource.length && latinSource[wordEnd] !== ' ') wordEnd++;
        latinSource = latinSource.slice(0, latStart) + latinSource.slice(wordEnd);
        render();
        setCaretPosition(latinToGokturkPos(latStart));
        scrollToCursor();
        break;
    }
  });

  // Separate paste handler (some browsers fire paste instead of insertFromPaste)
  gokturkDiv.addEventListener('paste', (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    if (text) {
      const { start: gkStart, end: gkEnd } = getSelectionRange();
      const latStart = gokturkToLatinPos(gkStart);
      const latEnd = gokturkToLatinPos(gkEnd);
      latinSource = latinSource.slice(0, latStart) + text + latinSource.slice(latEnd);
      render();
      setCaretPosition(latinToGokturkPos(latStart + text.length));
      scrollToCursor();
    }
  });
});
