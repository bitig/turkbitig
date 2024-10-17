// Copyright (C) 2018-2024 turkbitig.com. All Rights Reserved.
var gokturk = document.getElementById("gokturk");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var fontSize = 220;
var lineHeight = 0.96;
var paddingTop = 10;
var paddingRight = 10;
var debounceTimer;

var minusButton = document.getElementById("minus");
var plusButton = document.getElementById("plus");
var fontRadios = document.querySelectorAll('input[name="fontRadio"]');
var colorRadios = document.querySelectorAll('input[name="colorRadio"]');
var bgColorRadios = document.querySelectorAll('input[name="bgColorRadio"]');
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
  if (fontSize < 800) {
    fontSize += 10;
    updateCanvas();
  }
});

colorRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    updateCanvas();
  });
});

fontRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    updateCanvas();
  });
});

bgColorRadios.forEach(radio => {
  radio.addEventListener('change', (event) => {
    if (event.target.value === 'transparent') {
      canvas.style.backgroundColor = 'transparent';
    } else {
      canvasColor = event.target.value;
      updateCanvas();
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    if (fontSize < 600) {
      fontSize += 6;
      updateCanvas();
    }
  } else if (event.key === "ArrowRight") {
    if (fontSize > 18) {
      fontSize -= 6;
      updateCanvas();
    }
  }
});

function updateCanvas(force = false) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var inputText = gokturk.value;
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

  var selectedColor = document.querySelector(
    'input[name="colorRadio"]:checked'
  ).value;
  ctx.fillStyle = selectedColor;

  var selectedFont = document.querySelector(
    'input[name="fontRadio"]:checked'
  ).value;
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

  canvas.style.backgroundColor = "";
  var selectedBgColor = document.querySelector(
    'input[name="bgColorRadio"]:checked'
  );
  if (selectedBgColor) {
    canvasColor = selectedBgColor.value;
  }
  canvas.style.backgroundColor = canvasColor;

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

    const padding = 10;
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = Math.min(width - 1, maxX + padding);
    maxY = Math.min(height - 1, maxY + padding);

    const trimmedWidth = maxX - minX + 1;
    const trimmedHeight = maxY - minY + 1;

    const newCanvas = document.createElement('canvas');
    newCanvas.width = trimmedWidth;
    newCanvas.height = trimmedHeight;
    const newCtx = newCanvas.getContext('2d');

    newCtx.fillStyle = canvasColor;
    newCtx.fillRect(0, 0, trimmedWidth, trimmedHeight);

    newCtx.drawImage(canvas, minX, minY, trimmedWidth, trimmedHeight, 0, 0, trimmedWidth, trimmedHeight);

    const now = new Date();
    const timestamp = 
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0');

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
