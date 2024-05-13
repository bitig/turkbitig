var characterMap = {
  'a': '𐰀',
  'e': '𐰀',
  'ı': '𐰃',
  'i': '𐰃',
  'o': '𐰆',
  'u': '𐰆',
  'ö': '𐰇',
  'ü': '𐰇',
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
  'c': '𐰲',
  'ç': '𐰲',
  'm': '𐰢',
  'p': '𐰯',
  'ş': '𐱁',
  'z': '𐰔',
  'h': '',
  'j': '',
  'v': '',
  'f': '',
  'ng': '𐰭',
  'nç': '𐰨',
  'ok': '𐰸',
  'uk': '𐰸',
  'ök': '𐰜',
  'ük': '𐰜',
  'iç': '𐰱',
  'ık': '𐰶',
  'ld': '𐰡',
  'lt': '𐰡',
  'nd': '𐰦',
  'nt': '𐰦'
};

var frontVowels = ['e', 'i', 'ö', 'ü'];

function updateDiv() {
  var inputText = document.getElementById("textInput").value;  // Get the value from the text input
  var processedText = processInputText(inputText);  // Process the input text
  var outputDiv = document.getElementById("outputDiv");  // Get the <div> element
  outputDiv.textContent = processedText;  // Update the content of the <div> with the processed text
}

function processInputText(inputText) {
  var processedText = '';
  var previousConsonant = '';
  var modifiedConsonant = '';

  for (var i = 0; i < inputText.length; i++) {
    var currentChar = inputText[i];
    var nextChar = inputText[i + 1];
    var combinedChars = currentChar + nextChar;

    if (combinedChars.toLowerCase() in characterMap) {
      var mappedCharacters = characterMap[combinedChars.toLowerCase()];
      if (Array.isArray(mappedCharacters)) {
        processedText += isFrontVowel(currentChar) ? mappedCharacters[1] : mappedCharacters[0];
        previousConsonant = currentChar;
        modifiedConsonant = '';
      } else {
        processedText += mappedCharacters;
        previousConsonant = '';
        modifiedConsonant = '';
      }
      i++;  // Skip the next character in the input
    } else if (currentChar.toLowerCase() in characterMap) {
      var mappedCharacters = characterMap[currentChar.toLowerCase()];
      if (Array.isArray(mappedCharacters)) {
        processedText += isFrontVowel(currentChar) ? mappedCharacters[1] : mappedCharacters[0];
        previousConsonant = currentChar;
        modifiedConsonant = '';
      } else {
        processedText += mappedCharacters;
        previousConsonant = '';
        modifiedConsonant = '';
      }
    } else {
      if (isFrontVowel(currentChar) && previousConsonant) {
        processedText = processedText.slice(0, -1) + getSecondValue(previousConsonant);
        modifiedConsonant = getSecondValue(previousConsonant);
      } else {
        processedText += currentChar;
        modifiedConsonant = '';
      }
      previousConsonant = '';
    }
  }

  return processedText;
}

function isFrontVowel(char) {
  return frontVowels.includes(char.toLowerCase());
}

function getSecondValue(consonant) {
  var mappedCharacters = characterMap[consonant.toLowerCase()];
  if (Array.isArray(mappedCharacters) && mappedCharacters.length > 1) {
    return mappedCharacters[1];
  }
  return '';
}