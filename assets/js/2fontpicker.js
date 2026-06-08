// Copyright (C) turkbitig.com. All Rights Reserved.
const fontCellHeight = 20;
const fontGridCols = 6;
const fontGridRows = 5;

// Single source of truth: each font knows its CSS family and display name
const fonts = [
  { family: "tbldamga",        name: "Altyazılı" },
  { family: "tbldamga2",       name: "Öğrenci için" },
  { family: "bilgekaganyenib", name: "Bilge Kağan" },
  { family: "balag",           name: "Bala(G)" },
  { family: "balab",           name: "Bala(K)" },
  { family: "baskurt",         name: "Başkurt" },
  { family: "gokturkkalemb",   name: "Kalem(K)" },
  { family: "gokturkkalemgb",  name: "Kalem(GB)" },
  { family: "bediz",           name: "Bediz" },
  { family: "bedizb",          name: "Bediz(K)" },
  { family: "cizgi",           name: "Çizgi" },
  { family: "damgaregular",    name: "Damga" },
  { family: "damgab",          name: "Damga(K)" },
  { family: "damgagenisbold",  name: "Damga(GB)" },
  { family: "kurgub",          name: "Kurgu(K)" },
  { family: "kazak",           name: "Kazak" },
  { family: "kirgiz",          name: "Kırgız" },
  { family: "koncuy",          name: "Konçuy" },
  { family: "kultigin",        name: "Kültiğin" },
  { family: "damgaroman",      name: "Roman" },
  { family: "tatarbold",       name: "Tatar" },
  { family: "tonyukuk",        name: "Tonyukuk" },
  { family: "tonyukukbold",    name: "Tonyukuk (K)" },
  { family: "turkbitig",       name: "Türk Bitig" },
  { family: "turkbitigbold",   name: "Türk Bitig(K)" },
  { family: "uygur",           name: "Uygur" },
  { family: "yaksi",           name: "Yakşı" },
  { family: "yaksib",          name: "Yakşı(K)" },
  { family: "karluk",          name: "Karluk" },
  { family: "irkbitig",        name: "Irk Bitig" },
];

let currentFont = fonts[0].family;

// Font picker grid drawing
function drawFontGrid(ctx, offsetX, offsetY) {
  const cellWidth = fontCanvas.width / fontGridCols;
  const cellHeight = fontCellHeight;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let row = 0; row < fontGridRows; row++) {
    for (let col = 0; col < fontGridCols; col++) {
      let index = row * fontGridCols + col;
      if (index >= fonts.length) break;
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
      ctx.font = "13px sans-serif";
      ctx.fillText(index + 1, x + cellWidth / 2, y + cellHeight / 2);
    }
  }
}

// Selected font cell
function drawSelectionOnFontGrid(ctx, offsetX, offsetY) {
  const cellWidth = fontCanvas.width / fontGridCols;
  const cellHeight = fontCellHeight;
  const idx = fonts.findIndex(f => f.family === currentFont);
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
    ctx.font = "13px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(idx + 1, x + cellWidth / 2, y + cellHeight / 2);
  }
}

function updateSelectedFontInput() {
  const selectedFontInput = document.querySelector('input[name="selectedfont"]');
  if (selectedFontInput) {
    const font = fonts.find(f => f.family === currentFont);
    selectedFontInput.value = font ? font.name : currentFont;
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
      if (idx < fonts.length) {
        currentFont = fonts[idx].family;
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

  // Add keyboard navigation
  canvas.tabIndex = 0; // Make canvas focusable
  canvas.addEventListener("keydown", function(e) {
    const idx = fonts.findIndex(f => f.family === currentFont);
    let newIdx = idx;
    const totalFonts = fonts.length;

    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      newIdx = (idx > 0) ? idx - 1 : totalFonts - 1;
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      newIdx = (idx < totalFonts - 1) ? idx + 1 : 0;
    }

    if (newIdx !== idx) {
      currentFont = fonts[newIdx].family;
      redrawFullFontCanvas();
      updatePreview();
      updateSelectedFontInput();
      e.preventDefault();
    }
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
