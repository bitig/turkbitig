// Copyright (C) turkbitig.com. All Rights Reserved.

const fontCellHeight = 25;
const fontGridCols = 5;
const fontGridRows = 6;
const fontFamilies = [
  "tbldamga",
  "tbldamga2",
  "bilgekaganyenim",
  "bilgekaganyenib",
  "oguzbold",
  "bala",
  "balab",
  "balag",
  "cizgi",
  "damgaregular",
  "damgab",
  "damgabb",
  "damgagenis",
  "damgagenisbold",
  "gokturkyeni",
  "gokturkyenib",
  "gokturkkalem",
  "gokturkkalemegri",
  "gokturkkalembold",
  "koncuy",
  "kultigin",
  "kultiginbold",
  "damgaroman",
  "tatarbold",
  "tonyukuk",
  "tonyukukagir",
  "turkbitig",
  "turkbitigb",
  "yaksi",
  "yaksib",
];
let currentFont = fontFamilies[0];

// Human-friendly names
const humanFriendlyFontNames = {
  "tbldamga": "Altyazılı",
  "tbldamga2": "Öğrenci için",
  "bilgekaganyenim": "BilgeKağan",
  "bilgekaganyenib": "BilgeKağan (K)",
  "oguzbold": "BilgeKağan (A)",
  "bala": "Bala",
  "balab": "Bala (K)",
  "balag": "Bala (G)",
  "cizgi": "Çizgi",
  "damgaregular": "Damga",
  "damgab": "Damga (K)",
  "damgabb": "Damga (A)",
  "damgagenis": "Damga (G)",
  "damgagenisbold": "Damga (GB)",
  "gokturkyeni": "Göktürk",
  "gokturkyenib": "Göktürk (K)",
  "gokturkkalem": "Kalem",
  "gokturkkalembold": "Kalem (K)",
  "gokturkkalemegri": "Kalem Eğri",
  "koncuy": "Koncuy",
  "kultigin": "Kültigin",
  "kultiginbold": "Kültigin (K)",
  "damgaroman": "Roman",
  "tatarbold": "Tatar",
  "tonyukuk": "Tonyukuk",
  "tonyukukagir": "Tonyukuk (K)",
  "turkbitig": "Türk Bitig",
  "turkbitigb": "Türk Bitig (K)",
  "yaksi": "Yaksi",
  "yaksib": "Yaksi (K)",
};

// Font picker grid drawing
function drawFontGrid(ctx, offsetX, offsetY) {
  const cellWidth = fontCanvas.width / fontGridCols;
  const cellHeight = fontCellHeight;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let row = 0; row < fontGridRows; row++) {
    for (let col = 0; col < fontGridCols; col++) {
      let index = row * fontGridCols + col;
      if (index >= fontFamilies.length) break;
      let x = offsetX + col * cellWidth;
      let y = offsetY + row * cellHeight;
      // Cell background
      ctx.fillStyle = "#EEE";
      ctx.fillRect(x, y, cellWidth, cellHeight);
      // Cell border
      ctx.strokeStyle = "#666";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, cellWidth, cellHeight);
      // Cell number
      ctx.fillStyle = "#000";
      ctx.font = "14px sans-serif";
      ctx.fillText(index + 1, x + cellWidth / 2, y + cellHeight / 2);
    }
  }
}

// Selected font cell
function drawSelectionOnFontGrid(ctx, offsetX, offsetY) {
  const cellWidth = fontCanvas.width / fontGridCols;
  const cellHeight = fontCellHeight;
  const idx = fontFamilies.indexOf(currentFont);
  if (idx !== -1) {
    const row = Math.floor(idx / fontGridCols);
    const col = idx % fontGridCols;
    const x = offsetX + col * cellWidth;
    const y = offsetY + row * cellHeight;
    // Selected cell background
    ctx.fillStyle = "#FFF";
    ctx.fillRect(x, y, cellWidth, cellHeight);
    // Selected cell border
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 1, y + 1, cellWidth - 2, cellHeight - 2);
    // Draw cell number
    ctx.fillStyle = "#000";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(idx + 1, x + cellWidth / 2, y + cellHeight / 2);
  }
}

function updateSelectedFontInput() {
  const selectedFontInput = document.querySelector('input[name="selectedfont"]');
  if (selectedFontInput) {
    const friendlyName = humanFriendlyFontNames[currentFont] || currentFont;
    selectedFontInput.value = friendlyName;
  }
}

// Font picker mouse/touch setup
function setupFontPicker(canvas, updatePreview) {
  const ctx = canvas.getContext("2d");
  let picking = false;

  function redrawFullFontCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFontGrid(ctx, 0, 0);
    drawSelectionOnFontGrid(ctx, 0, 0);
  }

  function pickFontAt(x, y) {
    const cellWidth = canvas.width / fontGridCols;
    const cellHeight = fontCellHeight;
    const col = Math.floor(x / cellWidth);
    const row = Math.floor(y / cellHeight);
    if (col >= 0 && col < fontGridCols && row >= 0 && row < fontGridRows) {
      const idx = row * fontGridCols + col;
      if (idx < fontFamilies.length) {
        currentFont = fontFamilies[idx];
        redrawFullFontCanvas();
        updatePreview();
        updateSelectedFontInput();
      }
    }
  }

  canvas.addEventListener("mousedown", function(e) {
    picking = true;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pickFontAt(x, y);
  });

  canvas.addEventListener("mousemove", function(e) {
    if (picking) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pickFontAt(x, y);
    }
  });

  document.addEventListener("mouseup", function() {
    picking = false;
  });

  canvas.addEventListener("touchstart", function(e) {
    picking = true;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    pickFontAt(x, y);
    e.preventDefault();
  }, { passive: false });

  canvas.addEventListener("touchmove", function(e) {
    if (picking) {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      pickFontAt(x, y);
      e.preventDefault();
    }
  }, { passive: false });

  document.addEventListener("touchend", function() {
    picking = false;
  });

  // Set canvas styles for responsiveness
  canvas.style.width = "100%";
  canvas.style.height = `${fontCellHeight * fontGridRows}px`; // 144px

  // Update canvas pixel dimensions
  function updateCanvasPixelWidth() {
    const parentWidth = fontPickerContainer.getBoundingClientRect().width;
    canvas.width = parentWidth;
    canvas.height = fontCellHeight * fontGridRows; // 144px
    redrawFullFontCanvas();
  }

  // Initial setup and resize handling
  updateCanvasPixelWidth();
  window.addEventListener("resize", updateCanvasPixelWidth);
}

// Updates the preview (font only)
function updatePreview() {
  let ct = document.getElementById("gokturk");
  ct.style.fontFamily = currentFont;
}

// Create font picker
const fontPickerContainer = document.getElementById("fontPicker");
const fontCanvas = document.createElement("canvas");
fontPickerContainer.appendChild(fontCanvas);

// Start font picker
setupFontPicker(fontCanvas, updatePreview);
updatePreview();
// Initialize the selected font input with the default font
updateSelectedFontInput();
