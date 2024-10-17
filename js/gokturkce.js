// Copyright (C) turkbitig.com. All Rights Reserved.
var vowelsMap={'a':'𐰀','e':'𐰀','ı':'𐰃','i':'𐰃','o':'𐰆','u':'𐰆','ö':'𐰇','ü':'𐰇',};
var consonantsMap={'b':['𐰉','𐰋'],'d':['𐰑','𐰓'],'g':['𐰍','𐰏'],'k':['𐰴','𐰚'],'l':['𐰞','𐰠'],'n':['𐰣','𐰤'],'r':['𐰺','𐰼'],'s':['𐰽','𐰾'],'t':['𐱃','𐱅'],'y':['𐰖','𐰘'],'ç':['𐰲','𐰲'],'ñ':['𐰭','𐰭'],'ŋ':['𐰭','𐰭'],'m':['𐰢','𐰢'],'p':['𐰯','𐰯'],'ş':['𐱁','𐱁'],'z':['𐰔','𐰔']};
var doublesMap={'ng':'𐰭','nç':'𐰨','nd':'𐰦','nt':'𐰦','ny':'𐰪','ok':'𐰸','uk':'𐰸','ök':'𐰜','ük':'𐰜','iç':'𐰱','ık':'𐰶','ld':'𐰡'};
var allChars = ['a', 'ı', 'o', 'u', 'e', 'i', 'ö', 'ü', 'b',  'd', 'g', 'k', 'l', 'n', 'r', 's',  't', 'y', 'ç', 'm', 'p', 'ş', 'z'];
var backVowels = ['a', 'ı', 'o', 'u'];
var frontVowels = ['e', 'i', 'ö', 'ü'];

function updateDiv() {
  var inputText = document.getElementById("latin").value.trim();
    inputText = inputText.replace(/I/g, 'ı').replace(/İ/g, 'i');
    inputText = inputText.replace(/[Ff]/g, 'p');
    inputText = inputText.replace(/[Ğğ]/g, 'g');
    inputText = inputText.replace(/[HhQqXx]/g, 'k');
    inputText = inputText.replace(/[WwVv]/g, 'b');
    inputText = inputText.replace(/[CcJj]/g, 'ç');
    inputText = inputText.replace(/[ÄäƏə]/g, 'e');
    inputText = inputText.replace(/[Ýý]/g, 'y');
    inputText = inputText.replace(/[Ūū]/g, 'u');
    inputText = inputText.toLowerCase();
  var processedText = processInputText(inputText);
  var gokturk = document.getElementById("gokturk");
    gokturk.value = processedText; 
}

function processInputText(inputText) {
  var processedText = '';
  var i = 0;
  var previousChar = '';
  var previousVowel = '';

  while (i < inputText.length) {
    var doubleChar = inputText.slice(i, i + 2);

    if (doubleChar in doublesMap) {
      processedText += doublesMap[doubleChar];
      i++;
    } else {
      var currentChar = inputText[i];

      if (currentChar in vowelsMap) {
        if (
          vowelsMap[currentChar] !== vowelsMap[previousVowel] ||
          vowelsMap[currentChar] !== vowelsMap[inputText[i - 2]] ||
          !isChar(inputText[i + 1]) || !isChar(inputText[i - 1]) ||
          i === inputText.length - 1
        ) {
          processedText += vowelsMap[currentChar];
          previousVowel = currentChar;
        }
      } else if (currentChar in consonantsMap) {
        var mappedCharacters = consonantsMap[currentChar];

        if (
          (i >= 0
            && isFrontVowel(inputText[i + 1])
            )
          || (
            (i > 0 
              && (isFrontVowel(inputText[i - 1]) || isFrontVowel(inputText[i - 2]))
              && !isBackVowel(inputText[i + 1])
             )
          )
        )
       {
          processedText += mappedCharacters[1];
        } else {
          processedText += mappedCharacters[0];
        }
      } else {
        processedText += currentChar;
      }
    }

    previousChar = currentChar;
    i++;
  }

  return processedText;
}

function isFrontVowel(char) {
  return frontVowels.includes(char);
}

function isBackVowel(char) {
  return backVowels.includes(char);
}

function isChar(char) {
  return allChars.includes(char);
}
