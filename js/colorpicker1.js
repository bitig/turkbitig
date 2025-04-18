// Copyright (C) turkbitig.com. All Rights Reserved.

const TAB_WIDTH = 50;             // width of the left vertical property area.
const TAB_ITEM_HEIGHT = 24;       // height for each property tab.
const COLOR_CELL_WIDTH = 12;
const COLOR_CELL_HEIGHT = 12;
const GRID_COLS = 16;             // number of color grid columns.
const GRID_ROWS = 6;
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
      if (col === 0) {  // first column is gray.
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

// Draw the vertical property tabs on the left.
function drawVerticalTabs(ctx) {
  const tabs = [
    { label: 'Yazı', property: 'fontColor' },
    { label: 'Arka', property: 'bgColor' },
    { label: 'Kıyı', property: 'strokeColor' }
  ];
  ctx.textBaseline = "middle";
  ctx.font = 'bold 15px sans-serif';
  // Set text alignment to left.
  ctx.textAlign = "left";
  tabs.forEach((tab, index) => {
    const y = index * TAB_ITEM_HEIGHT;
    const isActive = (currentProperty === tab.property);
    ctx.fillStyle = isActive ? '#fff' : '#ddd';
    ctx.fillRect(0, y, TAB_WIDTH, TAB_ITEM_HEIGHT);
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, y, TAB_WIDTH, TAB_ITEM_HEIGHT);
    // Draw the text with a left margin (e.g., 5 pixels)
    ctx.fillStyle = '#000';
    ctx.fillText(tab.label, 5, y + TAB_ITEM_HEIGHT / 2);
  });
}

// Draw the color grid with a horizontal offset (offsetX) to account for the vertical tabs.
function drawColorGrid(ctx, offsetX, offsetY) {
  // Special cells: black, white, and transparent.
  ctx.fillStyle = '#000';
  ctx.fillRect(offsetX, offsetY, 20, 24);
  ctx.fillStyle = '#fff';
  ctx.fillRect(offsetX, offsetY + 24, 20, 24);
  ctx.beginPath();
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.moveTo(offsetX, offsetY + 48);
  ctx.lineTo(offsetX + 20, offsetY + 48);
  ctx.stroke();
  ctx.fillStyle = '#ccc';
  ctx.fillRect(offsetX, offsetY + 48, 20, 24);
  ctx.fillStyle = '#fff';
  for (let y = 0; y < 24; y += 6) {
    for (let x = 0; x < 20; x += 6) {
      if ((x + y) % 12 === 0)
        ctx.fillRect(offsetX + x, offsetY + 48 + y, 6, 6);
    }
  }

  // Color grid cells.
  let idx = 0;
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      ctx.fillStyle = colors[idx++];
      ctx.fillRect(offsetX + 20 + col * COLOR_CELL_WIDTH, offsetY + row * COLOR_CELL_HEIGHT, COLOR_CELL_WIDTH, COLOR_CELL_HEIGHT);
    }
  }
}

// Draw a stroke around the selected color.
function drawSelectionOnGrid(ctx, selectedColor, offsetX, offsetY) {
  if (!selectedColor) return;
  ctx.save();
  ctx.lineWidth = 2;
  if (/^#?000000$/i.test(selectedColor)) {
    ctx.strokeStyle = '#FF0';
    ctx.strokeRect(offsetX + 1, offsetY + 1, 18, 22);
  } else if (/^#?FFFFFF$/i.test(selectedColor)) {
    ctx.strokeStyle = '#000';
    ctx.strokeRect(offsetX + 1, offsetY + 25, 18, 22);
  } else if (selectedColor === 'transparent') {
    ctx.strokeStyle = '#000';
    ctx.strokeRect(offsetX + 1, offsetY + 49, 18, 22);
  } else {
    let colorUpper = selectedColor.toUpperCase();
    let idx = colors.indexOf(colorUpper);
    if (idx !== -1) {
      let row = Math.floor(idx / GRID_COLS);
      let col = idx % GRID_COLS;
      ctx.strokeStyle = '#000';
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
  if (currentProperty === 'fontColor') return fontColor;
  else if (currentProperty === 'bgColor') return bgColor;
  else if (currentProperty === 'strokeColor') return strokeColor;
}

function setCurrentColor(val) {
  if (currentProperty === 'fontColor') fontColor = val;
  else if (currentProperty === 'bgColor') bgColor = val;
  else if (currentProperty === 'strokeColor') strokeColor = val;
}

// Set up the picker: attaches event handlers to the canvas and redraws the UI.
function setupPickerWithTabs(canvas, updatePreview) {
  const ctx = canvas.getContext('2d');
  let picking = false;
  let startedInTabs = false;

  function redrawFullCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawVerticalTabs(ctx);           // draw left vertical property tabs.
    drawColorGrid(ctx, TAB_WIDTH, 0);  // draw the color grid, shifted right by TAB_WIDTH.
    drawSelectionOnGrid(ctx, getCurrentColor(), TAB_WIDTH, 0);
  }

  function pickColorAt(x, y) {
    // If within the left vertical tabs...
    if (x < TAB_WIDTH) {
      const tabIndex = Math.floor(y / TAB_ITEM_HEIGHT);
      const tabs = [
        { property: 'fontColor' },
        { property: 'bgColor' },
        { property: 'strokeColor' }
      ];
      if (tabIndex >= 0 && tabIndex < tabs.length) {
        currentProperty = tabs[tabIndex].property;
        redrawFullCanvas();
      }
      return;
    }

    // Adjust x-coordinate for the color grid.
    const gridX = x - TAB_WIDTH;
    const gridY = y;
    let color = '';
    if (gridX >= 0 && gridX < 20) {
      if (gridY >= 0 && gridY < 24) color = '#000000';
      else if (gridY >= 24 && gridY < 48) color = '#FFFFFF';
      else if (gridY >= 48 && gridY < 72) color = 'transparent';
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

  // Mouse events.
  canvas.addEventListener('mousedown', function(e) {
    picking = true;
    const rect = canvas.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    startedInTabs = (startX < TAB_WIDTH);
    pickColorAt(startX, startY);
  });

  canvas.addEventListener('mousemove', function(e) {
    if (picking && !startedInTabs) {
      const rect = canvas.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      if (x < TAB_WIDTH) x = TAB_WIDTH;
      pickColorAt(x, y);
    }
  });

  document.addEventListener('mouseup', function() {
    picking = false;
    startedInTabs = false;
  });

  // Touch events.
  canvas.addEventListener('touchstart', function(e) {
    picking = true;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const startX = touch.clientX - rect.left;
    const startY = touch.clientY - rect.top;
    startedInTabs = (startX < TAB_WIDTH);
    pickColorAt(startX, startY);
    e.preventDefault();
  }, { passive: false });

  canvas.addEventListener('touchmove', function(e) {
    if (picking && !startedInTabs) {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      let x = touch.clientX - rect.left;
      let y = touch.clientY - rect.top;
      if (x < TAB_WIDTH) x = TAB_WIDTH;
      pickColorAt(x, y);
      e.preventDefault();
    }
  }, { passive: false });

  document.addEventListener('touchend', function() {
    picking = false;
    startedInTabs = false;
  });

  // Initial drawing.
  redrawFullCanvas();
}

// Update the preview element (e.g., a sample element) with selected colors.
function updatePreview() {
  let ct = document.getElementById('gokturk');
  ct.style.color = fontColor === 'transparent' ? "#000" : fontColor;
  ct.style.background = bgColor === 'transparent' ? "" : bgColor;
  ct.style.webkitTextStrokeColor = strokeColor;
  ct.style.textStrokeColor = strokeColor;
}

const colorPickerContainer = document.getElementById('colorPicker');

// Create a canvas whose width includes TAB_WIDTH plus the grid width.
// The grid area width is: 20 + GRID_COLS * COLOR_CELL_WIDTH.
const canvas = document.createElement('canvas');
canvas.width = TAB_WIDTH + 20 + GRID_COLS * COLOR_CELL_WIDTH;
canvas.height = 72;
colorPickerContainer.appendChild(canvas);

// Start the picker (no hex input is used).
setupPickerWithTabs(canvas, updatePreview);
updatePreview();

