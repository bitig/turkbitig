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
    if (fontSize < 2000) {
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
  updateCanvas();

  // Find the bounding box of the text
  var textBounds = findTextBounds();

  // Create a new canvas with the size of the text bounds
  var newCanvas = document.createElement('canvas');
  newCanvas.width = textBounds.width;
  newCanvas.height = textBounds.height;
  var newCtx = newCanvas.getContext('2d');

  // Fill the new canvas with the background color
  newCtx.fillStyle = canvasColor;
  newCtx.fillRect(0, 0, newCanvas.width, newCanvas.height);

  // Draw the portion of the original canvas that contains text onto the new canvas
  newCtx.drawImage(canvas, 
    textBounds.left, textBounds.top, textBounds.width, textBounds.height, // source rectangle
    0, 0, textBounds.width, textBounds.height // destination rectangle
  );

  // Create a download link and trigger the download
  var link = document.createElement('a');
  link.download = 'download.png';
  link.href = newCanvas.toDataURL();
  link.click();
}

function findTextBounds() {
  var ctx = canvas.getContext('2d');
  var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var l = pixels.data.length;
  var bound = {
    top: null,
    left: null,
    right: null,
    bottom: null
  };
  var x, y;

  // Iterate over every pixel to find the highest
  // and lowest x and y that have a non-background color.
  for (var i = 0; i < l; i += 4) {
    if (pixels.data[i + 3] !== 0) {
      x = (i / 4) % canvas.width;
      y = ~~((i / 4) / canvas.width);

      if (bound.top === null) {
        bound.top = y;
      }

      if (bound.left === null) {
        bound.left = x;
      } else if (x < bound.left) {
        bound.left = x;
      }

      if (bound.right === null) {
        bound.right = x;
      } else if (bound.right < x) {
        bound.right = x;
      }

      if (bound.bottom === null) {
        bound.bottom = y;
      } else if (bound.bottom < y) {
        bound.bottom = y;
      }
    }
  }

  // Calculate the width and height of the content
  var trimHeight = bound.bottom - bound.top;
  var trimWidth = bound.right - bound.left;

  // Add padding
  var padding = 10;
  bound.top = Math.max(0, bound.top - padding);
  bound.left = Math.max(0, bound.left - padding);
  bound.bottom = Math.min(canvas.height, bound.bottom + padding);
  bound.right = Math.min(canvas.width, bound.right + padding);

  trimHeight = bound.bottom - bound.top;
  trimWidth = bound.right - bound.left;

  return {
    left: bound.left,
    top: bound.top,
    width: trimWidth,
    height: trimHeight
  };
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

// keyboard - canvas ends


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

