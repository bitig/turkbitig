// Copyright (C) 2018-2024 turkbitig.com. All Rights Reserved.

var gokturk = document.getElementById("gokturk");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var fontSize = 300;
var lineHeight = 0.96;
var paddingTop = 10;
var paddingRight = 10;
var canvasColor = '#ffffff'; 
var debounceTimer;
var strokeWidth = 3;
var strokeColor = '#000000';

// Set default text
gokturk.value = '𐱅𐰇𐰼𐰜';

// Button and input elements
var minusButton = document.getElementById("minus");
var plusButton = document.getElementById("plus");
var strokeMinusButton = document.getElementById("strokeMinus");
var strokePlusButton = document.getElementById("strokePlus");
var strokeWidthDisplay = document.getElementById("strokeWidthDisplay");
var fontRadios = document.querySelectorAll('input[name="fontRadio"]');
var colorRadios = document.querySelectorAll('input[name="colorRadio"]');
var bgColorRadios = document.querySelectorAll('input[name="bgColorRadio"]');
var latin = document.getElementById("latin");
var fontColorPicker = document.getElementById("fontColor");
var bgColorPicker = document.getElementById("bgColor");
var strokeColorPicker = document.getElementById("strokeColor");

// Function to get URL parameter
function getParameterFromURL(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName);
}

// Event listeners
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
    fontSize = Math.round(fontSize * 0.94);
    updateCanvas();
  }
});

plusButton.addEventListener("click", () => {
  if (fontSize < 800) {
    fontSize = Math.round(fontSize * 1.06);
    updateCanvas();
  }
});

strokeMinusButton.addEventListener("click", () => {
  if (strokeWidth > 0) {
    strokeWidth -= 1;
    strokeWidthDisplay.textContent = strokeWidth;
    updateCanvas();
  }
});

strokePlusButton.addEventListener("click", () => {
  if (strokeWidth < 50) {
    strokeWidth += 1;
    strokeWidthDisplay.textContent = strokeWidth;
    updateCanvas();
  }
});

colorRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    fontColorPicker.value = radio.value;
    updateCanvas();
  });
});

fontRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    updateCanvas();
  });
});

bgColorRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    bgColorPicker.value = radio.value;
    updateCanvas();
  });
});

fontColorPicker.addEventListener("input", () => {
  updateCanvas();
});

bgColorPicker.addEventListener("input", () => {
  updateCanvas();
});

strokeColorPicker.addEventListener("input", () => {
  strokeColor = strokeColorPicker.value;
  updateCanvas();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    if (fontSize < 800) {
      fontSize = Math.min(Math.round(fontSize * 1.06), 600);
      updateCanvas();
    }
  } else if (event.key === "ArrowRight") {
    if (fontSize > 18) {
      fontSize = Math.round(fontSize * 0.94);
      updateCanvas();
    }
  }
});

// Main update function
function updateCanvas(force = false) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var input = gokturk.value;
  var maxWidth = canvas.width - paddingRight;
  var lines = [];
  var words = input.split(" ");
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

  // Background color selection logic
  var selectedBgColor = bgColorPicker.value !== '#000000' 
    ? bgColorPicker.value 
    : document.querySelector('input[name="bgColorRadio"]:checked').value;
  canvas.style.background = selectedBgColor;

  // Font selection logic
  var selectedFont = document.querySelector('input[name="fontRadio"]:checked').value;
  ctx.font = fontSize + "px " + selectedFont;

  // Text alignment settings
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.direction = "rtl";

  // Color selection logic
  var selectedColor = fontColorPicker.value !== '#000000' 
    ? fontColorPicker.value 
    : document.querySelector('input[name="colorRadio"]:checked').value;

  var x = canvas.width - paddingRight;
  var y = paddingTop;

  // Draw text for each line
  for (var i = 0; i < lines.length; i++) {
    if (y > canvasHeight - paddingTop) {
      break;
    }

    // Draw stroke if strokeWidth > 0
    if (strokeWidth > 0) {
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = strokeColor;
      ctx.lineJoin = 'round'; // Makes corners smoother
      ctx.miterLimit = 2;
      ctx.strokeText(lines[i], x, y);
    }

    // Draw fill
    ctx.fillStyle = selectedColor;
    ctx.fillText(lines[i], x, y);

    y += fontSize * lineHeight;
  }

  if (force) {
    canvas.dispatchEvent(new Event("input"));
  }
}

function downloadImage() {
  try {
    updateCanvas(true); // Ensure canvas is updated before download

    const originalCanvas = document.getElementById("canvas");
    const originalCtx = originalCanvas.getContext('2d');
    const { width, height } = originalCanvas;

    // Find the bounding box of the text
    const imageData = originalCtx.getImageData(0, 0, width, height);
    const { data } = imageData;
    let minX = width, maxX = 0, minY = height, maxY = 0;

    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha!== 0) {
        const x = (i / 4) % width;
        const y = Math.floor((i / 4) / width);
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }

    // Add a bit of padding around the text
    const padding = 10;
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = Math.min(width - 1, maxX + padding);
    maxY = Math.min(height - 1, maxY + padding);

    // If there's no text, don't download anything
    if (maxX <= minX || maxY <= minY) {
      console.log("No text found on the canvas.");
      return;
    }

    // Create a new canvas to fit the text bounding box
    const textCanvas = document.createElement('canvas');
    textCanvas.width = maxX - minX + 1;
    textCanvas.height = maxY - minY + 1;
    const textCtx = textCanvas.getContext('2d');

    // Fill with selected background color (to ensure transparent areas are filled)
    var selectedBgColor = bgColorPicker.value!== '#000000' 
    ? bgColorPicker.value 
      : document.querySelector('input[name="bgColorRadio"]:checked').value;
    textCtx.fillStyle = selectedBgColor;
    textCtx.fillRect(0, 0, textCanvas.width, textCanvas.height);

    // Draw the text portion onto the new canvas
    textCtx.drawImage(originalCanvas, minX, minY, textCanvas.width, textCanvas.height, 0, 0, textCanvas.width, textCanvas.height);

    // Download the new canvas
    const now = new Date();
    const options = {timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false};
    const formatter = new Intl.DateTimeFormat([], options);
    const [{ value: hour }, , { value: minute }, , { value: second }] = formatter.formatToParts(now);
    const timestamp = `${hour.padStart(2, '0')}${minute.padStart(2, '0')}${second.padStart(2, '0')}`;

    const link = document.createElement('a');
    link.download = `gokturk-${timestamp}.png`;
    link.href = textCanvas.toDataURL();
    link.click();
  } catch (error) {
    console.error('Error downloading image:', error);
  }
}

updateCanvas();

var keyboardContainer = document.getElementById("keyboard");
var gokturk = document.getElementById("gokturk");

keyboardContainer.addEventListener("click", function(event) {
  var clickedElement = event.target;
  if (clickedElement.classList.contains("key")) {
    var keyType = clickedElement.getAttribute("data-value");
    switch (keyType) {
      case "-":
        if (/[0123456789~!@#$%&*+()? -:;"'.,]$/.test(gokturk.value.slice(-1))) {
          gokturk.value = gokturk.value.slice(0, -1);
        } else {
          gokturk.value = gokturk.value.slice(0, -2);
        }
        break;
      case "x":
        gokturk.value = gokturk.value.slice(0, -2000);
        break;
      default:
        gokturk.value += keyType;
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

function toggleKeyDiv() {
    var keyDiv = document.getElementById('keydiv');
    var toggleButton = document.getElementById('toggleButton');
    
    if (keyDiv.style.display === 'none' || keyDiv.style.display === '') {
        keyDiv.style.display = 'block';
        toggleButton.textContent = 'Klavyeyi kapat';
    } else {
        keyDiv.style.display = 'none';
        toggleButton.textContent = 'Göktürkçe klavye';
    }
}

window.onload = function() {
    var keyDiv = document.getElementById('keydiv');
    var toggleButton = document.getElementById('toggleButton');

    keyDiv.style.display = 'none';
    toggleButton.textContent = 'Göktürkçe klavye';
};

updateCanvas();

