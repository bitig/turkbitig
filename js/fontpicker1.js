// Copyright (C) turkbitig.com. All Rights Reserved.

const fontCellWidth = 28;
const fontCellHeight = 24;
const fontGridCols = 5;
const fontGridRows = 6;
const fontFamilies = [
  "tbldamga",
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
  "gokturkkalembold",
  "gokturkkalemegri",
  "koncuy",
  "kultigin",
  "kultiginbold",
  "damgaroman",
  "tatarbold",
  "tonyukuk",
  "tonyukukagir",
  "turkbitigyeni",
  "turkbitigyenib",
  "yaksi",
  "yaksib",
  "yolluktigingenis"
];
let currentFont = fontFamilies[0];

// font picker grid drawing
function drawFontGrid(ctx, offsetX, offsetY) {
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let row = 0; row < fontGridRows; row++) {
    for (let col = 0; col < fontGridCols; col++) {
      let index = row * fontGridCols + col;
      if (index >= fontFamilies.length) break;
      let x = offsetX + col * fontCellWidth;
      let y = offsetY + row * fontCellHeight;
      // cell bg
      ctx.fillStyle = "#D3D3D3";
      ctx.fillRect(x, y, fontCellWidth, fontCellHeight);
      // cell border
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, fontCellWidth, fontCellHeight);
      // cell number
      ctx.fillStyle = "#000";
      ctx.font = "14px sans-serif";
      ctx.fillText(index + 1, x + fontCellWidth / 2, y + fontCellHeight / 2);
    }
  }
}

// selected font cell
function drawSelectionOnFontGrid(ctx, offsetX, offsetY) {
  const idx = fontFamilies.indexOf(currentFont);
  if (idx !== -1) {
    const row = Math.floor(idx / fontGridCols);
    const col = idx % fontGridCols;
    const x = offsetX + col * fontCellWidth;
    const y = offsetY + row * fontCellHeight;
    // selected cell bg
    ctx.fillStyle = "#FFF";
    ctx.fillRect(x, y, fontCellWidth, fontCellHeight);
    // selected cell border
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 1, y + 1, fontCellWidth - 2, fontCellHeight - 2);
    // draw cell number
    ctx.fillStyle = "#000";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(idx + 1, x + fontCellWidth / 2, y + fontCellHeight / 2);
  }
}

// font picker mouse/touch
function setupFontPicker(canvas, updatePreview) {
  const ctx = canvas.getContext("2d");
  let picking = false;

  function redrawFullFontCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFontGrid(ctx, 0, 0);
    drawSelectionOnFontGrid(ctx, 0, 0);
  }

  function pickFontAt(x, y) {
    const col = Math.floor(x / fontCellWidth);
    const row = Math.floor(y / fontCellHeight);
    if (col >= 0 && col < fontGridCols && row >= 0 && row < fontGridRows) {
      const idx = row * fontGridCols + col;
      if (idx < fontFamilies.length) {
        currentFont = fontFamilies[idx];
        redrawFullFontCanvas();
        updatePreview();
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

  redrawFullFontCanvas();
}

// updates the preview (font only)
function updatePreview() {
  let ct = document.getElementById("gokturk");
  ct.style.fontFamily = currentFont;
}

// create font picker
const fontPickerContainer = document.getElementById("fontPicker");
const fontCanvas = document.createElement("canvas");
fontCanvas.width = fontCellWidth * fontGridCols;   // 5 columns * 28px = 140px.
fontCanvas.height = fontCellHeight * fontGridRows;  // 6 rows * 24px = 144px.
fontPickerContainer.appendChild(fontCanvas);

// start font picker
setupFontPicker(fontCanvas, updatePreview);
updatePreview();
