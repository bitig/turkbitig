// Copyright (C) 2018-2024 turkbitig.com. All Rights Reserved.

// keyboard - canvas begins
var gtext = document.getElementById("gtext");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var fontSize = 220;
var lineHeight = 0.96;
var paddingTop = 10;
var paddingRight = 10;
var debounceTimer;

var minusButton = document.getElementById("minus");
var plusButton = document.getElementById("plus");
var colorPicker = document.getElementById("fontColor");
var bgColorPicker = document.getElementById("bgColor");
var fontFamilySelect = document.getElementById("fontFamily");
var textSizeSelect = document.getElementById("textSize");
var latin = document.getElementById("latin");

function getParameterFromURL(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName);
}

latin.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    updateCanvas();
  }, 20);
});

latin.addEventListener("change", () => {
  updateCanvas();
});

minusButton.addEventListener("click", () => {
  if (fontSize > 20) {
    fontSize -= 10;
    updateCanvas();
  }
});

plusButton.addEventListener("click", () => {
  if (fontSize < 600) {
    fontSize += 10;
    updateCanvas();
  }
});

colorPicker.addEventListener('input', () => {
  updateCanvas();
});

bgColorPicker.addEventListener('input', () => {
  updateCanvas();
});

fontFamilySelect.addEventListener('change', () => {
  updateCanvas();
});

textSizeSelect.addEventListener('change', () => {
  fontSize = parseInt(textSizeSelect.value);
  updateCanvas();
});

function updateCanvas(force = false) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var inputText = gtext.value;
  var maxWidth = canvas.width - paddingRight;
  var lines = [];
  var words = inputText.split(" ");
  var currentLine = words[0];
  for (var i = 1; i < words.length; i++) {
    var testLine = currentLine + " " + words[i];
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);

  var textHeight = lines.length * fontSize * lineHeight;
  var canvasHeight = textHeight + paddingTop * 2;
  canvas.height = canvasHeight;

  ctx.fillStyle = colorPicker.value;

  var selectedFont = fontFamilySelect.value;
  ctx.font = fontSize + "px " + selectedFont;

  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.direction = "rtl";

  var x = canvas.width - paddingRight;
  var y = paddingTop;
  for (var i = 0; i < lines.length; i++) {
    if (y + fontSize * lineHeight > canvasHeight - paddingTop) {
      break;
    }
    ctx.fillText(lines[i], x, y);
    y += fontSize * lineHeight;
  }

  canvas.style.backgroundColor = bgColorPicker.value;

  if (force) {
    canvas.dispatchEvent(new Event("input"));
  }
}

function downloadImage() {
  try {
    updateCanvas();

    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imageData;

    let minX = width, maxX = 0, minY = height, maxY = 0;

    // Find the boundaries of the text
    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha !== 0) {
        const x = (i / 4) % width;
        const y = Math.floor((i / 4) / width);
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }

    // Add padding
    const padding = 10;
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = Math.min(width - 1, maxX + padding);
    maxY = Math.min(height - 1, maxY + padding);

    const trimmedWidth = maxX - minX + 1;
    const trimmedHeight = maxY - minY + 1;

    // Create a new canvas with the trimmed size
    const newCanvas = document.createElement('canvas');
    newCanvas.width = trimmedWidth;
    newCanvas.height = trimmedHeight;
    const newCtx = newCanvas.getContext('2d');

    // Fill the new canvas with the background color
    newCtx.fillStyle = bgColorPicker.value;
    newCtx.fillRect(0, 0, trimmedWidth, trimmedHeight);

    // Draw the relevant portion of the original canvas onto the new canvas
    newCtx.drawImage(canvas, minX, minY, trimmedWidth, trimmedHeight, 0, 0, trimmedWidth, trimmedHeight);

    // Generate timestamp for filename
    const now = new Date();
    const timestamp = 
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0');

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.download = `Gokturkce_${timestamp}.png`;
    link.href = newCanvas.toDataURL();
    link.click();
  } catch (error) {
    console.error('Error downloading image:', error);
  }
}

updateCanvas();

var keyboardContainer = document.getElementById("keyboard");
var gtext = document.getElementById("gokturk");

keyboardContainer.addEventListener("click", function(event) {
  var clickedElement = event.target;
  if (clickedElement.classList.contains("key")) {
    var keyType = clickedElement.getAttribute("data-value");
    switch (keyType) {
      case "-":
        if (/[0123456789~!@#$%&*+()? -:;"'.,]$/.test(gtext.value.slice(-1))) {
          gtext.value = gtext.value.slice(0, -1);
        } else {
          gtext.value = gtext.value.slice(0, -2);
        }
        break;
      case "x":
        gtext.value = gtext.value.slice(0, -2000);
        break;
      default:
        gtext.value += keyType;
        break;
    }
    updateCanvas();
  }
});

function copyToClipboard(event) {
  event.preventDefault();
  var input = document.getElementById("gokturk");
  input.select();
  input.setSelectionRange(0, 99999);
  document.execCommand("copy");
  console.log("Copied to clipboard: " + input.value);
}

/*
function toggleKeyDiv() {
    var keyDiv = document.getElementById('keydiv');
    var toggleButton = document.getElementById('toggleButton');
    
    if (keyDiv.style.display === 'none' || keyDiv.style.display === '') {
        keyDiv.style.display = 'block';
        toggleButton.textContent = 'Klavyeyi kapat';
        setLocalStorage('keyDivVisible', 'true');
    } else {
        keyDiv.style.display = 'none';
        toggleButton.textContent = 'Göktürkçe klavye';
        setLocalStorage('keyDivVisible', 'false');
    }
}

function setLocalStorage(key, value) {
    var now = new Date();
    var item = {
        value: value,
        expiry: now.getTime() + 900000 // Current time + 15 minutes in milliseconds
    };
    localStorage.setItem(key, JSON.stringify(item));
}

function getLocalStorage(key) {
    var itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    var item = JSON.parse(itemStr);
    var now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}

// Initialize the state based on local storage or default to hidden
window.onload = function() {
    var keyDiv = document.getElementById('keydiv');
    var toggleButton = document.getElementById('toggleButton');
    var isVisible = getLocalStorage('keyDivVisible');

    if (isVisible === 'true') {
        keyDiv.style.display = 'block';
        toggleButton.textContent = 'Klavyeyi kapat';
    } else {
        keyDiv.style.display = 'none';
        toggleButton.textContent = 'Göktürkçe klavye';
    }
};
*/
