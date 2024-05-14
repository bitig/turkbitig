var vowelsMap = {
  'a': '𐰀',
  'e': '𐰀',
  'ə': '𐰀', //ä - Azerbaycan
  'ı': '𐰃',
  'i': '𐰃',
  'o': '𐰆',
  'u': '𐰆',
  'ö': '𐰇',
  'ü': '𐰇'
};

var consonantsMap = {
  'b': ['𐰉', '𐰋'],
  'd': ['𐰑', '𐰓'],
  'g': ['𐰍', '𐰏'],
  'k': ['𐰴', '𐰚'],
  'l': ['𐰞', '𐰠'],
  'n': ['𐰣', '𐰤'],
  'r': ['𐰺', '𐰼'],
  's': ['𐰽', '𐰾'],
  't': ['𐱃', '𐱅'],
  'y': ['𐰖', '𐰘'],
  // tektipler
  'ç': ['𐰲', '𐰲'],
  'ñ': ['𐰭', '𐰭'],
  'ŋ': ['𐰭', '𐰭'],
  'm': ['𐰢', '𐰢'],
  'p': ['𐰯', '𐰯'],
  'ş': ['𐱁', '𐱁'],
  'z': ['𐰔', '𐰔'],
// eksikler  
  'c': ['𐰲', '𐰲'],
  'f': ['𐰯', '𐰯'],
  'ğ': ['𐰍', '𐰏'],
  'h': ['𐰴', '𐰚'],
  'x': ['𐰴', '𐰚'], //he - Azerbaycan
  'q': ['𐰴', '𐰚'], //ka - Azerbaycan
  'j': ['𐱁', '𐱁'],
  'v': ['𐰉', '𐰋'],
  ' ': ['  ', '  '],
};

var doublesMap = {
  'ng': '𐰭',
  'nç': '𐰨',
  'nd': '𐰦',
  'nt': '𐰦',
  'ny': '𐰪',
  'ok': '𐰸',
  'uk': '𐰸',
  'ök': '𐰜',
  'ük': '𐰜',
  'iç': '𐰱',
  'ık': '𐰶',
  'ld': '𐰡',
  'lt': '𐰡',
};

var frontVowels = ['e', 'i', 'ö', 'ü'];

function updateDiv() {
  var inputText = document.getElementById("ltn").value;
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
      processedText += doublesMap[doubleChar];
      i++;
    } else {
      var currentChar = inputText[i];

      if (currentChar in vowelsMap) {
        if (
          currentChar !== previousVowel || 
          currentChar !== inputText[i -2] ||
          inputText[i + 1] === ' ' ||
          i === inputText.length - 1
        ) {
          processedText += vowelsMap[currentChar];
          previousVowel = currentChar;
        }
      } else if (currentChar in consonantsMap) {
        var mappedCharacters = consonantsMap[currentChar];

        if (
          (i < inputText.length - 1 && isFrontVowel(inputText[i + 1])) 
          || (i > 0 && isFrontVowel(previousChar))
          || (i > 0 && isFrontVowel(inputText[i - 2]))
        ) {
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