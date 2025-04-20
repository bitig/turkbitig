// Copyright (C) turkbitig.com. All Rights Reserved.

const tabItemWidth = 55;      // tab width.
const tabBarHeight = 24;      // tab height.

const colorCellWidth = 12;
const colorCellHeight = 12;
const gridCols = 12;           // grid columns 
const gridRows = 10;           // grid rows
const colors = generateColors();

let fontColor = "#12E0B0";
let bgColor = "#FFFFFF";
let strokeColor = "#000000";
let currentProperty = "fontColor"; // default property

// font picker
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

// color grid.
function generateColors() {
  let arr = [];
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      let color;
      if (col === 0) {  // grays.
        let v = 20 + Math.round((row / (gridRows - 1)) * 60);
        color = hsvToHex(0, 0, v);
      } else {
        let effectiveColIndex = col - 1;
        let effectiveCols = gridCols - 1;
        let h = Math.round((effectiveColIndex / effectiveCols) * 360);
        let s = 60 + Math.round((row / (gridRows - 1)) * 40);
        let v = 40 + Math.round((row / (gridRows - 1)) * 60);
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
    let x = i * tabItemWidth;
    let y = 0;
    const isActive = (currentProperty === tabs[i].property);
    ctx.fillStyle = isActive ? "#fff" : "#ddd";
    ctx.fillRect(x, y, tabItemWidth, tabBarHeight);
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, tabItemWidth, tabBarHeight);
    ctx.fillStyle = "#000";
    ctx.fillText(tabs[i].label, x + tabItemWidth / 2, y + tabBarHeight / 2);
  }
}

function drawColorGrid(ctx, offsetX, offsetY) {
  let specialCellHeight = (gridRows * colorCellHeight) / 3;  // (10*12)/3 = 40.
  
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
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      ctx.fillStyle = colors[idx++];
      ctx.fillRect(offsetX + 20 + col * colorCellWidth, offsetY + row * colorCellHeight, colorCellWidth, colorCellHeight);
    }
  }
}

// selected cell.
function drawSelectionOnGrid(ctx, selectedColor, offsetX, offsetY) {
  if (!selectedColor) return;
  ctx.save();
  ctx.lineWidth = 2;
  let specialCellHeight = (gridRows * colorCellHeight) / 3;
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
      let row = Math.floor(idx / gridCols);
      let col = idx % gridCols;
      ctx.strokeStyle = "#000";
      ctx.strokeRect(
        offsetX + 20 + col * colorCellWidth + 0.5,
        offsetY + row * colorCellHeight + 0.5,
        colorCellWidth - 1,
        colorCellHeight - 1
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
    drawColorGrid(ctx, 0, tabBarHeight);
    drawSelectionOnGrid(ctx, getCurrentColor(), 0, tabBarHeight);
  }

  function pickColorAt(x, y) {
    if (y < tabBarHeight) {
      const tabIndex = Math.floor(x / tabItemWidth);
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
    const gridY = y - tabBarHeight;
    let specialCellHeight = (gridRows * colorCellHeight) / 3;
    let color = "";
    if (gridX >= 0 && gridX < 20) {
      if (gridY >= 0 && gridY < specialCellHeight) color = "#000000";
      else if (gridY >= specialCellHeight && gridY < 2 * specialCellHeight) color = "#FFFFFF";
      else if (gridY >= 2 * specialCellHeight && gridY < 3 * specialCellHeight) color = "transparent";
    } else if (gridX >= 20 && gridX < 20 + gridCols * colorCellWidth) {
      const col = Math.floor((gridX - 20) / colorCellWidth);
      const row = Math.floor(gridY / colorCellHeight);
      if (col >= 0 && col < gridCols && row >= 0 && row < gridRows) {
        const idx = row * gridCols + col;
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
    startedInTabs = (startY < tabBarHeight);
    pickColorAt(startX, startY);
  });

  canvas.addEventListener("mousemove", function (e) {
    if (picking && !startedInTabs) {
      const rect = canvas.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      if (y < tabBarHeight) y = tabBarHeight;
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
    startedInTabs = (startY < tabBarHeight);
    pickColorAt(startX, startY);
    e.preventDefault();
  }, { passive: false });

  canvas.addEventListener("touchmove", function (e) {
    if (picking && !startedInTabs) {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      let x = touch.clientX - rect.left;
      let y = touch.clientY - rect.top;
      if (y < tabBarHeight) y = tabBarHeight;
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
  for (let row = 0; row < fontGridRows; row++) {
    for (let col = 0; col < fontGridCols; col++) {
      let index = row * fontGridCols + col;
      if (index >= fontFamilies.length) break;
      let x = offsetX + col * fontCellWidth;
      let y = offsetY + row * fontCellHeight;
      // cell bg.
      ctx.fillStyle = "#D3D3D3";
      ctx.fillRect(x, y, fontCellWidth, fontCellHeight);
      // cell border.
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, fontCellWidth, fontCellHeight);
      // cell number.
      ctx.fillStyle = "#000";
      ctx.font = "14px sans-serif";
      ctx.fillText(index + 1, x + fontCellWidth / 2, y + fontCellHeight / 2);
    }
  }
}

// selected font cell.
function drawSelectionOnFontGrid(ctx, offsetX, offsetY) {
  const idx = fontFamilies.indexOf(currentFont);
  if (idx !== -1) {
    const row = Math.floor(idx / fontGridCols);
    const col = idx % fontGridCols;
    const x = offsetX + col * fontCellWidth;
    const y = offsetY + row * fontCellHeight;
    // selected cell bge.
    ctx.fillStyle = "#FFF";
    ctx.fillRect(x, y, fontCellWidth, fontCellHeight);
    // selected cell border.
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 1, y + 1, fontCellWidth - 2, fontCellHeight - 2);
    // draw cell number.
    ctx.fillStyle = "#000";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(idx + 1, x + fontCellWidth / 2, y + fontCellHeight / 2);
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
canvas.width = 20 + gridCols * colorCellWidth;  // 20 + (12*12) = 164px.
canvas.height = tabBarHeight + gridRows * colorCellHeight;  // 24 + (10*12) = 144px.
colorPickerContainer.appendChild(canvas);

// start color picker.
setupPickerWithTabs(canvas, updatePreview);
updatePreview();

// create font picker.
const fontPickerContainer = document.getElementById("fontPicker");
const fontCanvas = document.createElement("canvas");
fontCanvas.width = fontCellWidth * fontGridCols;   // 5 columns * 28px = 140px.
fontCanvas.height = fontCellHeight * fontGridRows;  // 6 rows * 24px = 144px.
fontPickerContainer.appendChild(fontCanvas);

// start font picker.
setupFontPicker(fontCanvas, updatePreview);
updatePreview();
