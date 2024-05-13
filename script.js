var characterMap = {
  'a': '𐰀',
  'e': '𐰀',
  'b': ['𐰉', '𐰋'],
  'd': ['𐰑', '𐰓'],
  'g': ['𐰍', '𐰏'],
  'k': ['𐰴', '𐰚']
};

var doublesMap = {
  'ok': '𐰸',
  'iç': '𐰱',
  'ök': '𐰜',
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
  var i = 0;

  while (i < inputText.length) {
    var currentChar = inputText[i];
    var lowercaseChar = currentChar.toLowerCase();

    if (lowercaseChar in characterMap) {
      var mappedCharacters = characterMap[lowercaseChar];

      if (Array.isArray(mappedCharacters) && mappedCharacters.length > 1) {
        var doubleChar = inputText.slice(i, i + 2).toLowerCase();

        if (doubleChar in doublesMap) {
          processedText += doublesMap[doubleChar];
          i++;
        } else {
          if (i < inputText.length - 1 && isFrontVowel(inputText[i + 1].toLowerCase())) {
            processedText += mappedCharacters[1];
          } else {
            processedText += mappedCharacters[0];
          }
        }
      } else {
        processedText += mappedCharacters;
      }
    } else {
      processedText += currentChar;
    }

    i++;
  }

  return processedText;
}

function isFrontVowel(char) {
  return frontVowels.includes(char);
}