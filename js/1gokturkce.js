// Copyright (C) turkbitig.com. All Rights Reserved.

const back_consonants = {'b': '𐰉', 'd': '𐰑', 'g': '𐰍', 'k': '𐰴', 'l': '𐰞', 'n': '𐰣', 'r': '𐰺', 's': '𐰽', 't': '𐱃', 'y': '𐰖'};
const front_consonants = {'b': '𐰋', 'd': '𐰓', 'g': '𐰏', 'k': '𐰚', 'l': '𐰠', 'n': '𐰤', 'r': '𐰼', 's': '𐰾', 't': '𐱅', 'y': '𐰘'};
const normal_consonants = {'ç': '𐰲', 'm': '𐰢', 'ñ': '𐰭', 'p': '𐰯', 'ş': '𐱁', 'z': '𐰔'};
const back_vowels = {'a': '𐰀', 'ı': '𐰃', 'o': '𐰆'};
const front_vowels = {'e': '𐰀', 'i': '𐰃', 'ö': '𐰇'};

const replacement_groups = {
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
        'z': ['з']
        };

const latinInput = document.getElementById('latin');
const gokturkOutput = document.getElementById('gokturk');

function getHarmony(cleanChars, index, lastConsonantHarmony) {
    let leftVowel = null, rightVowel = null;
    let leftDist = Infinity, rightDist = Infinity;

    for (let i = index - 1; i >= 0; i--) {
        if (back_vowels[cleanChars[i].char] || front_vowels[cleanChars[i].char]) {
            leftVowel = cleanChars[i].char;
            leftDist = index - i;
            break;
        }
    }

    for (let i = index + 1; i < cleanChars.length; i++) {
        if (back_vowels[cleanChars[i].char] || front_vowels[cleanChars[i].char]) {
            rightVowel = cleanChars[i].char;
            rightDist = i - index;
            break;
        }
    }

    const getH = (v) => v && back_vowels[v] ? 'back' : 'front';

    if (leftDist < rightDist) return getH(leftVowel);
    if (rightDist < leftDist) return getH(rightVowel);

    if (leftVowel && rightVowel) {
        const hL = getH(leftVowel);
        const hR = getH(rightVowel);
        if (hL === hR) return hL;
        if (lastConsonantHarmony) {
            return (hL !== lastConsonantHarmony) ? hL : hR;
        }
        return hL;
    }

    return getH(leftVowel || rightVowel) || 'back';
}

function convert() {
    let input = latinInput.value.replace(/I/g, 'ı').replace(/İ/g, 'i').toLowerCase();
    for (let target in replacement_groups) {
        replacement_groups[target].forEach(char => {
            input = input.split(char).join(target);
        });
    }

    let cleanChars = [];
    let template = input.split('').map((char, originalIdx) => {
        const isConv = back_consonants[char] || front_consonants[char] || 
                      normal_consonants[char] || back_vowels[char] || front_vowels[char];
        if (isConv) {
            const cleanIdx = cleanChars.length;
            cleanChars.push({ char, originalIdx });
            return { type: 'placeholder', cleanIdx };
        }
        return { type: 'literal', value: char };
    });

    let lastConsH = null;
    let processed = cleanChars.map((item, i) => {
        const char = item.char;
        if (back_vowels[char]) return back_vowels[char];
        if (front_vowels[char]) return front_vowels[char];
        if (normal_consonants[char]) return normal_consonants[char];
        
        const h = getHarmony(cleanChars, i, lastConsH);
        lastConsH = h;
        return (h === 'back') ? back_consonants[char] : front_consonants[char];
    });

    let result = template.map(item => 
        item.type === 'placeholder' ? processed[item.cleanIdx] : item.value
    ).join('');

    // special cases
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

    gokturkOutput.value = result;
}

latinInput.addEventListener('input', convert);
