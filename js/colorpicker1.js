// Copyright (C) turkbitig.com. All Rights Reserved.

const TAB_HEIGHT = 25;
const COLOR_CELL_WIDTH = 12;
const COLOR_CELL_HEIGHT = 12;
const GRID_COLS = 14;
const GRID_ROWS = 6;
const GRAY_COLUMN_INDEX = 0;
const colors = generateColors();

// initial state for properties
let fontColor = "#12E0B0";
let bgColor = "#FFFFFF";
let strokeColor = "#000000";
let currentProperty = "fontColor"; // default property

function generateColors() {
  let arr = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      let color;
      if (col === GRAY_COLUMN_INDEX) {
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

function drawTabs(ctx, canvasWidth) {
  const tabCount = 3;
  const tabWidth = canvasWidth / tabCount;
  const tabs = [
    { label: 'Yazı', property: 'fontColor' },
    { label: 'Arka', property: 'bgColor' },
    { label: 'Kıyı', property: 'strokeColor' }
  ];

  tabs.forEach((tab, index) => {
    const x = index * tabWidth;
    const isActive = (currentProperty === tab.property);
    ctx.fillStyle = isActive ? '#fff' : '#ddd';
    ctx.fillRect(x, 0, tabWidth, TAB_HEIGHT);
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, 0, tabWidth, TAB_HEIGHT);

    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px sans-serif';
    const text = tab.label;
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textX = x + (tabWidth - textWidth) / 2;
    const textY = TAB_HEIGHT / 2 + 4;
    ctx.fillText(text, textX, textY);
  });
}

function drawColorGrid(ctx, offsetY) {
  // black, white, transparent.
  ctx.fillStyle = '#000';
  ctx.fillRect(0, offsetY, 20, 24);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, offsetY + 24, 20, 24);
  ctx.beginPath();
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.moveTo(0, offsetY + 48);
  ctx.lineTo(20, offsetY + 48);
  ctx.stroke();
  ctx.fillStyle = '#ccc';
  ctx.fillRect(0, offsetY + 48, 20, 24);
  ctx.fillStyle = '#fff';
  for (let y = 0; y < 24; y += 6) {
    for (let x = 0; x < 20; x += 6) {
      if ((x + y) % 12 === 0) ctx.fillRect(x, offsetY + 48 + y, 6, 6);
    }
  }

  // color grid cells.
  let idx = 0;
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      ctx.fillStyle = colors[idx++];
      ctx.fillRect(20 + col * COLOR_CELL_WIDTH, offsetY + row * COLOR_CELL_HEIGHT, COLOR_CELL_WIDTH, COLOR_CELL_HEIGHT);
    }
  }
}

function drawSelectionOnGrid(ctx, selectedColor, offsetY) {
  if (!selectedColor) return;
  ctx.save();
  ctx.lineWidth = 2;
  if (/^#?000000$/i.test(selectedColor)) {
    ctx.strokeStyle = '#FF0';
    ctx.strokeRect(1, offsetY + 1, 18, 22);
  } else if (/^#?FFFFFF$/i.test(selectedColor)) {
    ctx.strokeStyle = '#000';
    ctx.strokeRect(1, offsetY + 25, 18, 22);
  } else if (selectedColor === 'transparent') {
    ctx.strokeStyle = '#000';
    ctx.strokeRect(1, offsetY + 49, 18, 22);
  } else {
    let colorUpper = selectedColor.toUpperCase();
    let idx = colors.indexOf(colorUpper);
    if (idx !== -1) {
      let row = Math.floor(idx / GRID_COLS);
      let col = idx % GRID_COLS;
      ctx.strokeStyle = '#000';
      ctx.strokeRect(
        20 + col * COLOR_CELL_WIDTH + 0.5,
        offsetY + row * COLOR_CELL_HEIGHT + 0.5,
        COLOR_CELL_WIDTH - 1,
        COLOR_CELL_HEIGHT - 1
      );
    }
  }
  ctx.restore();
}

function normalizeHex(hex) {
  hex = hex.trim();
  if (hex.toLowerCase() === 'transparent') return 'transparent';
  if (hex.charAt(0) !== '#') hex = '#' + hex;
  if (/^#([0-9a-f]{3})$/i.test(hex)) {
    hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  if (!/^#([0-9a-f]{6})$/i.test(hex)) return '';
  return hex.toUpperCase();
}

function getCurrentColor() {
  if (currentProperty === 'fontColor') return fontColor;
  else if (currentProperty === 'bgColor') return bgColor;
  else if (currentProperty === 'strokeColor') return strokeColor;
}

function setCurrentColor(val) {
  if (currentProperty === 'fontColor') fontColor = val;
  else if (currentProperty === 'bgColor') bgColor = val;
  else if (currentProperty === 'strokeColor') strokeColor = val;
}

function setupPickerWithTabs(canvas, input, updatePreview) {
  const ctx = canvas.getContext('2d');
  let picking = false;
  let startedInTabs = false; // New flag to track the starting region

  function redrawFullCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTabs(ctx, canvas.width);
    drawColorGrid(ctx, TAB_HEIGHT);
    drawSelectionOnGrid(ctx, getCurrentColor(), TAB_HEIGHT);
  }

  function pickColorAt(x, y) {
    // Decide what to do based on where the y coordinate falls.
    if (y < TAB_HEIGHT) {
      // If we are processing a tap event (touchstart/mousedown) in the tab area,
      // then update the property. (This block is only executed on the initial event.)
      const tabCount = 3;
      const tabWidth = canvas.width / tabCount;
      const tabIndex = Math.floor(x / tabWidth);
      const tabs = [
        { property: 'fontColor' },
        { property: 'bgColor' },
        { property: 'strokeColor' }
      ];
      if (tabIndex >= 0 && tabIndex < tabs.length) {
        currentProperty = tabs[tabIndex].property;
        input.value = getCurrentColor();
        redrawFullCanvas();
      }
      return;
    }

    // Selected grid area.
    const gridY = y - TAB_HEIGHT;
    let color = '';
    if (x >= 0 && x < 20) {
      if (gridY >= 0 && gridY < 24) color = '#000000';
      else if (gridY >= 24 && gridY < 48) color = '#FFFFFF';
      else if (gridY >= 48 && gridY < 72) color = 'transparent';
    } else if (x >= 20 && x < 20 + GRID_COLS * COLOR_CELL_WIDTH) {
      const col = Math.floor((x - 20) / COLOR_CELL_WIDTH);
      const row = Math.floor(gridY / COLOR_CELL_HEIGHT);
      if (col >= 0 && col < GRID_COLS && row >= 0 && row < GRID_ROWS) {
        const idx = row * GRID_COLS + col;
        color = colors[idx];
      }
    }

    if (color) {
      setCurrentColor(color);
      input.value = (color === 'transparent') ? 'transparent' : color.toUpperCase();
      redrawFullCanvas();
      updatePreview();
    }
  }

  // mouse events.
  canvas.addEventListener('mousedown', function(e) {
    picking = true;
    const rect = canvas.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    startedInTabs = (startY < TAB_HEIGHT);
    pickColorAt(startX, startY);
  });

  canvas.addEventListener('mousemove', function(e) {
    if (picking && !startedInTabs) {
      const rect = canvas.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      // For grid picking, if the pointer goes above the grid,
      // clamp it so that the tab area is not re-interpreted.
      if (y < TAB_HEIGHT) y = TAB_HEIGHT;
      pickColorAt(x, y);
    }
  });

  document.addEventListener('mouseup', function() {
    picking = false;
    startedInTabs = false;
  });

  // touch events.
  canvas.addEventListener('touchstart', function(e) {
    picking = true;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const startX = touch.clientX - rect.left;
    const startY = touch.clientY - rect.top;
    startedInTabs = (startY < TAB_HEIGHT);
    pickColorAt(startX, startY);
    e.preventDefault();
  }, { passive: false });

  canvas.addEventListener('touchmove', function(e) {
    if (picking && !startedInTabs) {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      let x = touch.clientX - rect.left;
      let y = touch.clientY - rect.top;
      if (y < TAB_HEIGHT) y = TAB_HEIGHT;
      pickColorAt(x, y);
      e.preventDefault();
    }
  }, { passive: false });

  document.addEventListener('touchend', function() {
    picking = false;
    startedInTabs = false;
  });

  // hex input.
  input.addEventListener('input', function() {
    let val = input.value.trim();
    if (val === '') return;
    let color = normalizeHex(val);
    if (color || val.toLowerCase() === 'transparent') {
      setCurrentColor(color || 'transparent');
      redrawFullCanvas();
      updatePreview();
    }
  });

  // initial drawing.
  redrawFullCanvas();
  input.value = getCurrentColor();
}

// stroke color.
function updatePreview() {
  let ct = document.getElementById('gokturk');
  ct.style.color = fontColor === 'transparent' ? "#000" : fontColor;
  ct.style.background = bgColor === 'transparent' ? "" : bgColor;
  ct.style.webkitTextStrokeColor = strokeColor;
  ct.style.textStrokeColor = strokeColor;
}

const colorPickerContainer = document.getElementById('colorPicker');
const colorInput = document.getElementById('colorInput');

const canvas = document.createElement('canvas');
canvas.width = 20 + GRID_COLS * COLOR_CELL_WIDTH;
canvas.height = TAB_HEIGHT + 72;
colorPickerContainer.appendChild(canvas);

setupPickerWithTabs(canvas, colorInput, updatePreview);
updatePreview();

