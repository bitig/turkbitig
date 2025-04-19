// Copyright (C) turkbitig.com. All Rights Reserved.

const TAB_ITEM_WIDTH = 55;      // tab width.
const TAB_BAR_HEIGHT = 24;      // tab height.

const COLOR_CELL_WIDTH = 12;
const COLOR_CELL_HEIGHT = 12;
const GRID_COLS = 12;           // grid columns 
const GRID_ROWS = 10;           // grid rows
const colors = generateColors();

let fontColor = "#12E0B0";
let bgColor = "#FFFFFF";
let strokeColor = "#000000";
let currentProperty = "fontColor"; // default property

// font picker
const FONT_CELL_WIDTH = 28;
const FONT_CELL_HEIGHT = 24;
const FONT_GRID_COLS = 5;
const FONT_GRID_ROWS = 6;
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
"yolluktigingenis",
];
let currentFont = fontFamilies[0];

// color grid.
function generateColors() {
  let arr = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      let color;
      if (col === 0) {  // grays.
        let v = 20 + Math.round((row / (GRID_ROWS - 1)) * 60);
        color = hsvToHex(0, 0, v);
      } else {
        let effectiveColIndex = col - 1;
        let effectiveCols = GRID_COLS - 1;
        let h = Math.round((effectiveColIndex / effectiveCols) * 360);
        let s = 60 + Math.round((row / (GRID_ROWS - 1)) * 40);
        let v = 40 + Math.round((row / (GRID_ROWS - 1)) * 60);
        color = hsvToHex(h, s, v);
      }
      arr.push(color);
    }
  }
  return arr;
}

function hsvToHex(h, s, v) {
  s /= 100;
  v /= 100;
  let c = v * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60)       { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else              { r = c; g = 0; b = x; }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase();
}

// color picker
function drawHorizontalTabs(ctx) {
  const tabs = [
    { label: 'Yazı', property: 'fontColor' },
    { label: 'Arka', property: 'bgColor' },
    { label: 'Kıyı', property: 'strokeColor' }
  ];
  ctx.textBaseline = "middle";
  ctx.font = 'bold 15px sans-serif';
  ctx.textAlign = "center";
  for (let i = 0; i < tabs.length; i++) {
    let x = i * TAB_ITEM_WIDTH;
    let y = 0;
    const isActive = (currentProperty === tabs[i].property);
    ctx.fillStyle = isActive ? "#fff" : "#ddd";
    ctx.fillRect(x, y, TAB_ITEM_WIDTH, TAB_BAR_HEIGHT);
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, TAB_ITEM_WIDTH, TAB_BAR_HEIGHT);
    ctx.fillStyle = "#000";
    ctx.fillText(tabs[i].label, x + TAB_ITEM_WIDTH / 2, y + TAB_BAR_HEIGHT / 2);
  }
}

function drawColorGrid(ctx, offsetX, offsetY) {
  let specialCellHeight = (GRID_ROWS * COLOR_CELL_HEIGHT) / 3;  // (10*12)/3 = 40.
  
  // black, white, transparent.
  ctx.fillStyle = '#000';
  ctx.fillRect(offsetX, offsetY, 20, specialCellHeight);
  
  ctx.fillStyle = '#fff';
  ctx.fillRect(offsetX, offsetY + specialCellHeight, 20, specialCellHeight);
  
  ctx.beginPath();
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.moveTo(offsetX, offsetY + 2 * specialCellHeight);
  ctx.lineTo(offsetX + 20, offsetY + 2 * specialCellHeight);
  ctx.stroke();
  
  ctx.fillStyle = '#ccc';
  ctx.fillRect(offsetX, offsetY + 2 * specialCellHeight, 20, specialCellHeight);
  
  ctx.fillStyle = '#fff';
  for (let y = 0; y < specialCellHeight; y += 6) {
    for (let x = 0; x < 20; x += 6) {
      if ((x + y) % 12 === 0)
        ctx.fillRect(offsetX + x, offsetY + 2 * specialCellHeight + y, 6, 6);
    }
  }
  
  // color grid cells.
  let idx = 0;
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      ctx.fillStyle = colors[idx++];
      ctx.fillRect(offsetX + 20 + col * COLOR_CELL_WIDTH, offsetY + row * COLOR_CELL_HEIGHT, COLOR_CELL_WIDTH, COLOR_CELL_HEIGHT);
    }
  }
}

// selected cell.
function drawSelectionOnGrid(ctx, selectedColor, offsetX, offsetY) {
  if (!selectedColor) return;
  ctx.save();
  ctx.lineWidth = 2;
  let specialCellHeight = (GRID_ROWS * COLOR_CELL_HEIGHT) / 3;
  if (/^#?000000$/i.test(selectedColor)) {
    ctx.strokeStyle = "#FF0";
    ctx.strokeRect(offsetX + 1, offsetY + 1, 18, specialCellHeight - 2);
  } else if (/^#?FFFFFF$/i.test(selectedColor)) {
    ctx.strokeStyle = "#000";
    ctx.strokeRect(offsetX + 1, offsetY + specialCellHeight + 1, 18, specialCellHeight - 2);
  } else if (selectedColor === "transparent") {
    ctx.strokeStyle = "#000";
    ctx.strokeRect(offsetX + 1, offsetY + 2 * specialCellHeight + 1, 18, specialCellHeight - 2);
  } else {
    let colorUpper = selectedColor.toUpperCase();
    let idx = colors.indexOf(colorUpper);
    if (idx !== -1) {
      let row = Math.floor(idx / GRID_COLS);
      let col = idx % GRID_COLS;
      ctx.strokeStyle = "#000";
      ctx.strokeRect(
        offsetX + 20 + col * COLOR_CELL_WIDTH + 0.5,
        offsetY + row * COLOR_CELL_HEIGHT + 0.5,
        COLOR_CELL_WIDTH - 1,
        COLOR_CELL_HEIGHT - 1
      );
    }
  }
  ctx.restore();
}

function getCurrentColor() {
  if (currentProperty === "fontColor") return fontColor;
  else if (currentProperty === "bgColor") return bgColor;
  else if (currentProperty === "strokeColor") return strokeColor;
}

function setCurrentColor(val) {
  if (currentProperty === "fontColor") fontColor = val;
  else if (currentProperty === "bgColor") bgColor = val;
  else if (currentProperty === "strokeColor") strokeColor = val;
}

// mouse/touch events.
function setupPickerWithTabs(canvas, updatePreview) {
  const ctx = canvas.getContext("2d");
  let picking = false;
  let startedInTabs = false;

  function redrawFullCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHorizontalTabs(ctx);
    drawColorGrid(ctx, 0, TAB_BAR_HEIGHT);
    drawSelectionOnGrid(ctx, getCurrentColor(), 0, TAB_BAR_HEIGHT);
  }

  function pickColorAt(x, y) {
    if (y < TAB_BAR_HEIGHT) {
      const tabIndex = Math.floor(x / TAB_ITEM_WIDTH);
      const tabs = [
        { property: "fontColor" },
        { property: "bgColor" },
        { property: "strokeColor" }
      ];
      if (tabIndex >= 0 && tabIndex < tabs.length) {
        currentProperty = tabs[tabIndex].property;
        redrawFullCanvas();
      }
      return;
    }

    // color grid y-coordinate.
    const gridX = x;
    const gridY = y - TAB_BAR_HEIGHT;
    let specialCellHeight = (GRID_ROWS * COLOR_CELL_HEIGHT) / 3;
    let color = "";
    if (gridX >= 0 && gridX < 20) {
      if (gridY >= 0 && gridY < specialCellHeight) color = "#000000";
      else if (gridY >= specialCellHeight && gridY < 2 * specialCellHeight) color = "#FFFFFF";
      else if (gridY >= 2 * specialCellHeight && gridY < 3 * specialCellHeight) color = "transparent";
    } else if (gridX >= 20 && gridX < 20 + GRID_COLS * COLOR_CELL_WIDTH) {
      const col = Math.floor((gridX - 20) / COLOR_CELL_WIDTH);
      const row = Math.floor(gridY / COLOR_CELL_HEIGHT);
      if (col >= 0 && col < GRID_COLS && row >= 0 && row < GRID_ROWS) {
        const idx = row * GRID_COLS + col;
        color = colors[idx];
      }
    }
    if (color) {
      setCurrentColor(color);
      redrawFullCanvas();
      updatePreview();
    }
  }

  canvas.addEventListener("mousedown", function (e) {
    picking = true;
    const rect = canvas.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    startedInTabs = (startY < TAB_BAR_HEIGHT);
    pickColorAt(startX, startY);
  });

  canvas.addEventListener("mousemove", function (e) {
    if (picking && !startedInTabs) {
      const rect = canvas.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      if (y < TAB_BAR_HEIGHT) y = TAB_BAR_HEIGHT;
      pickColorAt(x, y);
    }
  });

  document.addEventListener("mouseup", function () {
    picking = false;
    startedInTabs = false;
  });

  canvas.addEventListener("touchstart", function (e) {
    picking = true;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const startX = touch.clientX - rect.left;
    const startY = touch.clientY - rect.top;
    startedInTabs = (startY < TAB_BAR_HEIGHT);
    pickColorAt(startX, startY);
    e.preventDefault();
  }, { passive: false });

  canvas.addEventListener("touchmove", function (e) {
    if (picking && !startedInTabs) {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      let x = touch.clientX - rect.left;
      let y = touch.clientY - rect.top;
      if (y < TAB_BAR_HEIGHT) y = TAB_BAR_HEIGHT;
      pickColorAt(x, y);
      e.preventDefault();
    }
  }, { passive: false });

  document.addEventListener("touchend", function () {
    picking = false;
    startedInTabs = false;
  });

  redrawFullCanvas();
}

// font picker
function drawFontGrid(ctx, offsetX, offsetY) {
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let row = 0; row < FONT_GRID_ROWS; row++) {
    for (let col = 0; col < FONT_GRID_COLS; col++) {
      let index = row * FONT_GRID_COLS + col;
      if (index >= fontFamilies.length) break;
      let x = offsetX + col * FONT_CELL_WIDTH;
      let y = offsetY + row * FONT_CELL_HEIGHT;
      // cell bg.
      ctx.fillStyle = "#D3D3D3";
      ctx.fillRect(x, y, FONT_CELL_WIDTH, FONT_CELL_HEIGHT);
      // cell border.
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, FONT_CELL_WIDTH, FONT_CELL_HEIGHT);
      // cell number.
      ctx.fillStyle = "#000";
      ctx.font = "14px sans-serif";
      ctx.fillText(index + 1, x + FONT_CELL_WIDTH / 2, y + FONT_CELL_HEIGHT / 2);
    }
  }
}

// selected font cell.
function drawSelectionOnFontGrid(ctx, offsetX, offsetY) {
  const idx = fontFamilies.indexOf(currentFont);
  if (idx !== -1) {
    const row = Math.floor(idx / FONT_GRID_COLS);
    const col = idx % FONT_GRID_COLS;
    const x = offsetX + col * FONT_CELL_WIDTH;
    const y = offsetY + row * FONT_CELL_HEIGHT;
    // selected cell bge.
    ctx.fillStyle = "#FFF";
    ctx.fillRect(x, y, FONT_CELL_WIDTH, FONT_CELL_HEIGHT);
    // selected cell border.
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 1, y + 1, FONT_CELL_WIDTH - 2, FONT_CELL_HEIGHT - 2);
    // draw cell number.
    ctx.fillStyle = "#000";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(idx + 1, x + FONT_CELL_WIDTH / 2, y + FONT_CELL_HEIGHT / 2);
  }
}

// font picker mouse/touch.
function setupFontPicker(canvas, updatePreview) {
  const ctx = canvas.getContext("2d");
  let picking = false;

  function redrawFullFontCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFontGrid(ctx, 0, 0);
    drawSelectionOnFontGrid(ctx, 0, 0);
  }

  function pickFontAt(x, y) {
    const col = Math.floor(x / FONT_CELL_WIDTH);
    const row = Math.floor(y / FONT_CELL_HEIGHT);
    if (col >= 0 && col < FONT_GRID_COLS && row >= 0 && row < FONT_GRID_ROWS) {
      const idx = row * FONT_GRID_COLS + col;
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

// updates the preview.
function updatePreview() {
  let ct = document.getElementById("gokturk");
  ct.style.color = fontColor === "transparent" ? "#000" : fontColor;
  ct.style.background = bgColor === "transparent" ? "" : bgColor;
  ct.style.webkitTextStrokeColor = strokeColor;
  ct.style.textStrokeColor = strokeColor;
  ct.style.fontFamily = currentFont;
}

// create color picker 
const colorPickerContainer = document.getElementById("colorPicker");
const canvas = document.createElement("canvas");
canvas.width = 20 + GRID_COLS * COLOR_CELL_WIDTH;  // 20 + (12*12) = 164px.
canvas.height = TAB_BAR_HEIGHT + GRID_ROWS * COLOR_CELL_HEIGHT;  // 24 + (10*12) = 144px.
colorPickerContainer.appendChild(canvas);

// start color picker.
setupPickerWithTabs(canvas, updatePreview);
updatePreview();

// create font picker.
const fontPickerContainer = document.getElementById("fontPicker");
const fontCanvas = document.createElement("canvas");
fontCanvas.width = FONT_CELL_WIDTH * FONT_GRID_COLS;   // 5 columns * 20px = 100px.
fontCanvas.height = FONT_CELL_HEIGHT * FONT_GRID_ROWS;  // 6 rows * 20px = 120px.
fontPickerContainer.appendChild(fontCanvas);

// start font picker.
setupFontPicker(fontCanvas, updatePreview);
updatePreview();

