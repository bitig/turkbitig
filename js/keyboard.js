// Copyright (C) 2018-2024 turkbitig.com. All Rights Reserved.

// keyboard - canvas begins
var gtext = document.getElementById("gtext");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var fontSize = 100;
var lineHeight = 0.96;
var paddingTop = 10;
var paddingRight = 10;
//var canvasColor = "white"; // initialize canvas background color to white
var debounceTimer;

var minusButton = document.getElementById("minus");
var plusButton = document.getElementById("plus");
var colorRadios = document.querySelectorAll('input[name="colorRadio"]');
var fontRadios = document.querySelectorAll('input[name="fontRadio"]');
var latin = document.getElementById("latin");
var bgColorRadios = document.querySelectorAll('input[name="bgColorRadio"]');

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

// Add additional event listener to gtext element that triggers updateCanvas function
latin.addEventListener("change", () => {
  updateCanvas();
});

minusButton.addEventListener("click", () => {
    if (fontSize > 20) { // Check if font size is greater than 20
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

// Handle color radio button changes
for (var i = 0; i < colorRadios.length; i++) {
    colorRadios[i].addEventListener('change', () => {
        updateCanvas();
    });
}

// Handle font radio button changes
for (var i = 0; i < fontRadios.length; i++) {
    fontRadios[i].addEventListener('change', () => {
        updateCanvas();
    });
}

// Handle background color radio button changes
for (var i = 0; i < bgColorRadios.length; i++) {
    bgColorRadios[i].addEventListener('change', (event) => {
        if (event.target.value === 'transparent') {
            canvas.style.backgroundColor = 'transparent';
        } else {
            canvasColor = event.target.value;
            updateCanvas();
        }
    });
}

// Add event listener for arrow key presses
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") { // Increase font size if up arrow key pressed
    if (fontSize < 2000) {
      fontSize += 6;
      updateCanvas();
    }
  } else if (event.key === "ArrowRight") { // Decrease font size if down arrow key pressed
    if (fontSize > 18) {
      fontSize -= 6;
      updateCanvas();
    }
  }
});

function updateCanvas(force = false) {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Get input text from hidden textarea
  var inputText = gtext.value;

  // Split input text into separate lines
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

  // Calculate canvas height based on number of lines
  var textHeight = lines.length * fontSize * lineHeight;
  var canvasHeight = textHeight + paddingTop * 2;
  canvas.height = canvasHeight;

  // Set text color based on radio button selection
  var selectedColor = document.querySelector(
    'input[name="colorRadio"]:checked'
  ).value;
  ctx.fillStyle = selectedColor;

  // Set font family based on radio button selection
  var selectedFont = document.querySelector(
    'input[name="fontRadio"]:checked'
  ).value;
  if (selectedFont === "damgab") {
    ctx.font = fontSize + "px damgab";
  } else if (selectedFont === "damgabb") {
    ctx.font = fontSize + "px damgabb";
  } else if (selectedFont === "tbg") {
    ctx.font = fontSize + "px tbg";
  } else if (selectedFont === "cizgi") {
    ctx.font = fontSize + "px cizgi";
  } else if (selectedFont === "ttr") {
    ctx.font = fontSize + "px ttr";
  } else if (selectedFont === "tonyukuk") {
    ctx.font = fontSize + "px tonyukuk";
  } else if (selectedFont === "tonyukukbold") {
    ctx.font = fontSize + "px tonyukukbold";
  } else if (selectedFont === "irkbitigreg") {
    ctx.font = fontSize + "px irkbitigreg";
  } else if (selectedFont === "gokturkkurgu") {
    ctx.font = fontSize + "px gokturkkurgu";
  } else if (selectedFont === "kultigin") {
    ctx.font = fontSize + "px kultigin";
  } else if (selectedFont === "kultigingolge") {
    ctx.font = fontSize + "px kultigingolge";
  } else if (selectedFont === "kultiginbold") {
    ctx.font = fontSize + "px kultiginbold";
  } else if (selectedFont === "tbldamga") {
    ctx.font = fontSize + "px tbldamga";
  } else if (selectedFont === "oguz") {
    ctx.font = fontSize + "px oguz";
  } else if (selectedFont === "oguzbold") {
    ctx.font = fontSize + "px oguzbold";
  }

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

  // Set canvas background color based on radio button selection
  canvas.style.backgroundColor = "";
  var selectedBgColor = document.querySelector(
    'input[name="bgColorRadio"]:checked'
  );
  if (selectedBgColor) {
    canvasColor = selectedBgColor.value;
  }
  canvas.style.backgroundColor = canvasColor;

  // Force the canvas to update if necessary
  if (force) {
    canvas.dispatchEvent(new Event("input"));
  }
}

function downloadImage() {
    updateCanvas();

    // Create a new canvas with selected background color
    var newCanvas = document.createElement('canvas');
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    var newCtx = newCanvas.getContext('2d');
    newCtx.fillStyle = canvasColor;
    newCtx.fillRect(0, 0, newCanvas.width, newCanvas.height);

    // Draw original canvas on the new canvas
    newCtx.drawImage(canvas, 0, 0);

    // Download the new canvas as an image
    var link = document.createElement('a');
    link.download = 'gokturkce.png';
    link.href = newCanvas.toDataURL();
    link.click();
}

// Initialize canvas on page load
updateCanvas();

var keyboardContainer = document.getElementById("keyboard");
var gtext = document.getElementById("gokturk");

keyboardContainer.addEventListener("click", function(event) {
  var clickedElement = event.target;
  if (clickedElement.classList.contains("key")) {
    var keyType = clickedElement.getAttribute("data-value");
    switch (keyType) {
      case "-":
        gtext.value = gtext.value.slice(0, -2);
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
        input.setSelectionRange(0, 99999); // For mobile devices
        document.execCommand("copy");
        console.log("Copied to clipboard: " + input.value);
      }

// keyboard - canvas ends
