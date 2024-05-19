// Copyright (C) 2018-2024 turkbitig.com. All Rights Reserved.

var vowelsMap={'a':'𐰀','e':'𐰀','ı':'𐰃','i':'𐰃','o':'𐰆','u':'𐰆','ö':'𐰇','ü':'𐰇',};
var consonantsMap={'b':['𐰉','𐰋'],'d':['𐰑','𐰓'],'g':['𐰍','𐰏'],'k':['𐰴','𐰚'],'l':['𐰞','𐰠'],'n':['𐰣','𐰤'],'r':['𐰺','𐰼'],'s':['𐰽','𐰾'],'t':['𐱃','𐱅'],'y':['𐰖','𐰘'],'ç':['𐰲','𐰲'],'ñ':['𐰭','𐰭'],'ŋ':['𐰭','𐰭'],'m':['𐰢','𐰢'],'p':['𐰯','𐰯'],'ş':['𐱁','𐱁'],'z':['𐰔','𐰔'],'c':['𐰲','𐰲'],'f':['𐰯','𐰯'],'ğ':['𐰍','𐰏'],'h':['𐰴','𐰚'],'j':['𐱁','𐱁'],'v':['𐰉','𐰋'],' ':['  ','  '],};
var backVowels = ['a', 'ı', 'o', 'u'];
var frontVowels = ['e', 'i', 'ö', 'ü'];
var vowels = ['a', 'ı', 'o', 'u', 'e', 'i', 'ö', 'ü'];
var consonants = ['b', 'c', 'ç', 'd', 'f', 'g', 'ğ', 'h', 'j', 'k', 'l', 'n', 'm', 'p', 'r', 's', 'ş', 't', 'v', 'y', 'z'];
var singles = ['ç', 'm', 'p', 'ş', 'z'];

var doublesMap={
'ng':'𐰭',
'nç':'𐰨',
'nd':'𐰦',
'nt':'𐰦',
'ny':'𐰪',
'ok':'𐰸',
'uk':'𐰸',
'ök':'𐰜',
'ük':'𐰜',
'iç':'𐰱',
'ık':'𐰶',
'ld':'𐰡',
'lt':'𐰡',
//experiment

'ba':'𐰉𐰀', 'ab':'𐰀𐰉', 'bı':'𐰉', 'ıb':'𐰉', 'bo':'𐰉', 'ob':'𐰉', 'bu':'𐰉', 'ub':'𐰉',
'be':'𐰋𐰀', 'eb':'𐰀𐰋', 'bi':'𐰋', 'ib':'𐰋', 'bö':'𐰋', 'öb':'𐰋', 'bü':'𐰋', 'üb':'𐰋',
'ça':'𐰲', 'aç':'𐰲', 'çı':'𐰲', 'ıç':'𐰲', 'ço':'𐰲', 'oç':'𐰲', 'çu':'𐰲', 'uç':'𐰲',
'çe':'𐰲', 'eç':'𐰲', 'çi':'𐰲', 'iç':'𐰲', 'çö':'𐰲', 'öç':'𐰲', 'çü':'𐰲', 'üç':'𐰲',
'da':'𐰑', 'ad':'𐰑', 'dı':'𐰑', 'ıd':'𐰑', 'do':'𐰑', 'od':'𐰑', 'du':'𐰑', 'ud':'𐰑',
'de':'𐰓', 'ed':'𐰓', 'di':'𐰓', 'id':'𐰓', 'dö':'𐰓', 'öd':'𐰓', 'dü':'𐰓', 'üd':'𐰓',
'ga':'𐰍', 'ag':'𐰍', 'gı':'𐰍', 'ıg':'𐰍', 'go':'𐰍', 'og':'𐰍', 'gu':'𐰍', 'ug':'𐰍',
'ge':'𐰏', 'eg':'𐰏', 'gi':'𐰏', 'ig':'𐰏', 'gö':'𐰏', 'ög':'𐰏', 'gü':'𐰏', 'üg':'𐰏',
'ka':'𐰴', 'ak':'𐰴', 'kı':'𐰴', 'ık':'𐰴', 'ko':'𐰴', 'ok':'𐰴', 'ku':'𐰴', 'uk':'𐰴',
'ke':'𐰚', 'ek':'𐰚', 'ki':'𐰚', 'ik':'𐰚', 'kö':'𐰚', 'ök':'𐰚', 'kü':'𐰚', 'ük':'𐰚',
'la':'𐰞', 'al':'𐰞', 'lı':'𐰞', 'ıl':'𐰞', 'lo':'𐰞', 'ol':'𐰞', 'lu':'𐰞', 'ul':'𐰞',
'le':'𐰠', 'el':'𐰠', 'li':'𐰠', 'il':'𐰠', 'lö':'𐰠', 'öl':'𐰠', 'lü':'𐰠', 'ül':'𐰠',
'ma':'𐰢', 'am':'𐰢', 'mı':'𐰢', 'ım':'𐰢', 'mo':'𐰢', 'om':'𐰢', 'mu':'𐰢', 'um':'𐰢',
'me':'𐰢', 'em':'𐰢', 'mi':'𐰢', 'im':'𐰢', 'mö':'𐰢', 'öm':'𐰢', 'mü':'𐰢', 'üm':'𐰢',
'na':'𐰣', 'an':'𐰣', 'nı':'𐰣', 'ın':'𐰣', 'no':'𐰣', 'on':'𐰣', 'nu':'𐰣', 'un':'𐰣',
'ne':'𐰤', 'en':'𐰤', 'ni':'𐰤', 'in':'𐰤', 'nö':'𐰤', 'ön':'𐰤', 'nü':'𐰤', 'ün':'𐰤',
'pa':'𐰯', 'ap':'𐰯', 'pı':'𐰯', 'ıp':'𐰯', 'po':'𐰯', 'op':'𐰯', 'pu':'𐰯', 'up':'𐰯',
'pe':'𐰯', 'ep':'𐰯', 'pi':'𐰯', 'ip':'𐰯', 'pö':'𐰯', 'öp':'𐰯', 'pü':'𐰯', 'üp':'𐰯',
'ra':'𐰺', 'ar':'𐰺', 'rı':'𐰺', 'ır':'𐰺', 'ro':'𐰺', 'or':'𐰺', 'ru':'𐰺', 'ur':'𐰺',
're':'𐰼', 'er':'𐰼', 'ri':'𐰼', 'ir':'𐰼', 'rö':'𐰼', 'ör':'𐰼', 'rü':'𐰼', 'ür':'𐰼',
'sa':'𐰽', 'as':'𐰽', 'sı':'𐰽', 'ıs':'𐰽', 'so':'𐰽', 'os':'𐰽', 'su':'𐰽', 'us':'𐰽',
'se':'𐰾', 'es':'𐰾', 'si':'𐰾', 'is':'𐰾', 'sö':'𐰾', 'ös':'𐰾', 'sü':'𐰾', 'üs':'𐰾',
'şa':'𐱁', 'aş':'𐱁', 'şı':'𐱁', 'ış':'𐱁', 'şo':'𐱁', 'oş':'𐱁', 'şu':'𐱁', 'uş':'𐱁',
'şe':'𐱁', 'eş':'𐱁', 'şi':'𐱁', 'iş':'𐱁', 'şö':'𐱁', 'öş':'𐱁', 'şü':'𐱁', 'üş':'𐱁',
'ta':'𐱃', 'at':'𐱃', 'tı':'𐱃', 'ıt':'𐱃', 'to':'𐱃', 'ot':'𐱃', 'tu':'𐱃', 'ut':'𐱃',
'te':'𐱅', 'et':'𐱅', 'ti':'𐱅', 'it':'𐱅', 'tö':'𐱅', 'öt':'𐱅', 'tü':'𐱅', 'üt':'𐱅',
'ya':'𐰖', 'ay':'𐰖', 'yı':'𐰖', 'ıy':'𐰖', 'yo':'𐰖', 'oy':'𐰖', 'yu':'𐰖', 'uy':'𐰖',
'ye':'𐰘', 'ey':'𐰘', 'yi':'𐰘', 'iy':'𐰘', 'yö':'𐰘', 'öy':'𐰘', 'yü':'𐰘', 'üy':'𐰘',
'za':'𐰔', 'az':'𐰔', 'zı':'𐰔', 'ız':'𐰔', 'zo':'𐰔', 'oz':'𐰔', 'zu':'𐰔', 'uz':'𐰔',
'ze':'𐰔', 'ez':'𐰔', 'zi':'𐰔', 'iz':'𐰔', 'zö':'𐰔', 'öz':'𐰔', 'zü':'𐰔', 'üz':'𐰔',
};


function updateDiv() {
  var inputText = document.getElementById("ltn").value.trim();
  inputText = inputText.replace(/I/g, 'ı');
  inputText = inputText.replace(/İ/g, 'i');
  inputText = inputText.toLowerCase();
  var processedText = processInputText(inputText);
  var orhn = document.getElementById("orhn");
  orhn.value = processedText; // Update value instead of textContent
  var gtext = document.getElementById("gtext");
  gtext.textContent = processedText;
}


function processInputText(inputText) {
  var processedText = '';
  var i = 0;
  var previousChar = '';
  var previousVowel = '';

  while (i < inputText.length) {
    var doubleChar = inputText.slice(i, i + 2);

    if (doubleChar in doublesMap) {
      if (currentChar in vowelsMap) {
        if (
          vowelsMap[currentChar] !== vowelsMap[previousVowel] ||
          vowelsMap[currentChar] !== vowelsMap[inputText[i - 2]] ||
          inputText[i + 1] === ' ' ||
          i === inputText.length - 1
        ) {
          processedText += vowelsMap[currentChar];
          previousVowel = currentChar;
        }
      }
      
      processedText += doublesMap[doubleChar];
      i += 2;
    } else {
      var currentChar = inputText[i];
      
      if (currentChar in vowelsMap) {
        if (
          vowelsMap[currentChar] !== vowelsMap[previousVowel] ||
          vowelsMap[currentChar] !== vowelsMap[inputText[i - 2]] ||
          inputText[i + 1] === ' ' ||
          i === inputText.length - 1
        ) {
          processedText += vowelsMap[currentChar];
          previousVowel = currentChar;
        } else {
          processedText += currentChar; // Display the vowel as-is
        }
      } else if (currentChar in consonantsMap) {
        var mappedCharacters = consonantsMap[currentChar];

        if (
          (i < inputText.length - 1 
            && isFrontVowel(inputText[i + 1])
          )
          || (
            (i > 0 
              && !isBackVowel(inputText[i + 1]) 
              && isFrontVowel(previousChar)
            ) 
          )
          || (
            (i > 0 
              && !isBackVowel(inputText[i + 1])
              && isFrontVowel(inputText[i - 2])
            )
          )
        ) {
          processedText += mappedCharacters[1];
        } else {
          processedText += mappedCharacters[0];
        }
      } else {
        processedText += currentChar;
      }
      
      i++;
    }

    previousChar = currentChar;
  }

  return processedText;
}


function isFrontVowel(char) {
  return frontVowels.includes(char);
}

function isBackVowel(char) {
  return backVowels.includes(char);
}

function isVowel(char) {
  return vowels.includes(char);
}

function isConsonant(char) {
  return consonants.includes(char);
}

function isSingle(char) {
  return singles.includes(char);
}
