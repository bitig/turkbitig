// --- Parameters ---
const COLOR_CELL_WIDTH = 8;    // Each color cell is now 8px wide
const COLOR_CELL_HEIGHT = 8;   // Each cell remains 8px high
const GRID_COLS = 12;          // Main color grid: 12 columns
const GRID_ROWS = 8;           // Color grid: 8 rows

// New constants for the left fixed panel and the gray column.
const LEFT_PANEL_WIDTH = 20;                    // Fixed left panel of 20px width
const GRAY_COLUMN_WIDTH = COLOR_CELL_WIDTH;     // Gray column width is same as a cell (8px)

// The generated color palette for the main grid:
const colors = generateColors();

// Generate the main color palette (using HSV)
function generateColors() {
  let arr = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      let h = Math.round((col / GRID_COLS) * 360);
      let s = 40 + Math.round((row / (GRID_ROWS - 1)) * 60);
      let v = 60 + Math.round((row / (GRID_ROWS - 1)) * 40);
      arr.push(hsvToHex(h, s, v));
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
  if (h < 60)         { r = c; g = x; b = 0; }
  else if (h < 120)   { r = x; g = c; b = 0; }
  else if (h < 180)   { r = 0; g = c; b = x; }
  else if (h < 240)   { r = 0; g = x; b = c; }
  else if (h < 300)   { r = x; g = 0; b = c; }
  else                { r = c; g = 0; b = x; }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase();
}

// Generates an array of gray shades, one per row, from black to white
function generateGrays() {
  let arr = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    // Linear interpolation: row 0 = black, row (GRID_ROWS-1) = white
    let v = Math.round(255 * (row / (GRID_ROWS - 1)));
    let hex = '#' + [v, v, v]
      .map(c => ("0" + c.toString(16)).slice(-2))
      .join('')
      .toUpperCase();
    arr.push(hex);
  }
  return arr;
}

function drawPickerBackground(ctx) {
  // Compute full canvas width: left panel + gray column + main grid columns.
  const fullWidth = LEFT_PANEL_WIDTH + GRAY_COLUMN_WIDTH + GRID_COLS * COLOR_CELL_WIDTH;
  ctx.clearRect(0, 0, fullWidth, GRID_ROWS * COLOR_CELL_HEIGHT);
  
  // Draw the fixed left panel (unchanged from before)
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, LEFT_PANEL_WIDTH, 20);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 20, LEFT_PANEL_WIDTH, 20);
  ctx.beginPath();
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.moveTo(0, 40);
  ctx.lineTo(LEFT_PANEL_WIDTH, 40);
  ctx.stroke();
  ctx.fillStyle = '#ccc';
  ctx.fillRect(0, 40, LEFT_PANEL_WIDTH, 20);
  ctx.fillStyle = '#fff';
  for (let y = 0; y < 20; y += 5) {
    for (let x = 0; x < LEFT_PANEL_WIDTH; x += 5) {
      if ((x + y) % 10 === 0) ctx.fillRect(x, 40 + y, 5, 5);
    }
  }
  
  // Draw the new gray column (one cell per row)
  let grays = generateGrays();
  for (let row = 0; row < GRID_ROWS; row++) {
    ctx.fillStyle = grays[row];
    ctx.fillRect(LEFT_PANEL_WIDTH, row * COLOR_CELL_HEIGHT, GRAY_COLUMN_WIDTH, COLOR_CELL_HEIGHT);
  }
  
  // Draw the main color grid (shifted right by left panel + gray column)
  let idx = 0;
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      ctx.fillStyle = colors[idx++];
      ctx.fillRect(LEFT_PANEL_WIDTH + GRAY_COLUMN_WIDTH + col * COLOR_CELL_WIDTH,
                   row * COLOR_CELL_HEIGHT,
                   COLOR_CELL_WIDTH, COLOR_CELL_HEIGHT);
    }
  }
}

function drawSelection(ctx, selectedColor) {
  if (!selectedColor) return;
  
  // Check for left-panel fixed colors first
  if (/^#?000000$/i.test(selectedColor)) {
    ctx.strokeStyle = '#FF0';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, LEFT_PANEL_WIDTH - 2, 18);
  } else if (/^#?FFFFFF$/i.test(selectedColor)) {
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 21, LEFT_PANEL_WIDTH - 2, 18);
  } else if (selectedColor === 'transparent') {
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 41, LEFT_PANEL_WIDTH - 2, 18);
  } else {
    // Check if the color is one of the grays in our gray column
    let grays = generateGrays();
    if (grays.indexOf(selectedColor.toUpperCase()) !== -1) {
      let row = grays.indexOf(selectedColor.toUpperCase());
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        LEFT_PANEL_WIDTH + 0.5,
        row * COLOR_CELL_HEIGHT + 0.5,
        COLOR_CELL_WIDTH - 1,
        COLOR_CELL_HEIGHT - 1
      );
    } else {
      // Otherwise, try to locate the selected color in the main grid.
      let colorUpper = selectedColor.toUpperCase();
      let idx = colors.indexOf(colorUpper);
      if (idx !== -1) {
        let row = Math.floor(idx / GRID_COLS);
        let col = idx % GRID_COLS;
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(
          LEFT_PANEL_WIDTH + GRAY_COLUMN_WIDTH + col * COLOR_CELL_WIDTH + 0.5,
          row * COLOR_CELL_HEIGHT + 0.5,
          COLOR_CELL_WIDTH - 1,
          COLOR_CELL_HEIGHT - 1
        );
      }
    }
  }
}

function normalizeHex(hex) {
  hex = hex.trim();
  if (hex.toLowerCase() === 'transparent') return 'transparent';
  if (hex.charAt(0) !== '#') hex = '#' + hex;
  if (/^#([0-9a-f]{3})$/i.test(hex)) {
    // Expand short form (e.g. #abc -> #aabbcc)
    hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  if (!/^#([0-9a-f]{6})$/i.test(hex)) return ''; // Invalid hex
  return hex.toUpperCase();
}

function setupPicker(canvas, input, getColor, setColor, updatePreview) {
  const ctx = canvas.getContext('2d');
  let picking = false;
  
  function pickColorAt(x, y) {
    let color = '';
    // The horizontal regions:
    // 1. Left panel: x in [0, LEFT_PANEL_WIDTH)
    // 2. Gray column: x in [LEFT_PANEL_WIDTH, LEFT_PANEL_WIDTH + GRAY_COLUMN_WIDTH)
    // 3. Main grid: x in [LEFT_PANEL_WIDTH + GRAY_COLUMN_WIDTH, LEFT_PANEL_WIDTH + GRAY_COLUMN_WIDTH + GRID_COLS * COLOR_CELL_WIDTH)
    if (x >= 0 && x < LEFT_PANEL_WIDTH) {
      // Use fixed left panel swatches with hard-coded vertical areas.
      if (y >= 0 && y < 20) color = '#000000';
      else if (y >= 20 && y < 40) color = '#FFFFFF';
      else if (y >= 40 && y < 60) color = 'transparent';
    } else if (x >= LEFT_PANEL_WIDTH && x < LEFT_PANEL_WIDTH + GRAY_COLUMN_WIDTH) {
      let row = Math.floor(y / COLOR_CELL_HEIGHT);
      if (row >= 0 && row < GRID_ROWS) {
        // Grab the corresponding gray from the gray column.
        let grays = generateGrays();
        color = grays[row];
      }
    } else if (x >= LEFT_PANEL_WIDTH + GRAY_COLUMN_WIDTH &&
               x < LEFT_PANEL_WIDTH + GRAY_COLUMN_WIDTH + GRID_COLS * COLOR_CELL_WIDTH) {
      let col = Math.floor((x - (LEFT_PANEL_WIDTH + GRAY_COLUMN_WIDTH)) / COLOR_CELL_WIDTH);
      let row = Math.floor(y / COLOR_CELL_HEIGHT);
      if (col >= 0 && col < GRID_COLS && row >= 0 && row < GRID_ROWS) {
        let idx = row * GRID_COLS + col;
        color = colors[idx];
      }
    }
    if (color) {
      setColor(color);
      input.value = (color === 'transparent') ? 'transparent' : color.toUpperCase();
      drawPickerBackground(ctx);
      drawSelection(ctx, color);
      updatePreview();
    }
  }
  
  // Mouse events
  canvas.addEventListener('mousedown', function (e) {
    picking = true;
    const rect = canvas.getBoundingClientRect();
    pickColorAt(e.clientX - rect.left, e.clientY - rect.top);
  });
  canvas.addEventListener('mousemove', function (e) {
    if (picking) {
      const rect = canvas.getBoundingClientRect();
      pickColorAt(e.clientX - rect.left, e.clientY - rect.top);
    }
  });
  document.addEventListener('mouseup', function () {
    picking = false;
  });
  
  // Touch events  
  canvas.addEventListener(
    'touchstart',
    function (e) {
      picking = true;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      pickColorAt(touch.clientX - rect.left, touch.clientY - rect.top);
      e.preventDefault();
    },
    { passive: false }
  );
  canvas.addEventListener(
    'touchmove',
    function (e) {
      if (picking) {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        pickColorAt(touch.clientX - rect.left, touch.clientY - rect.top);
        e.preventDefault();
      }
    },
    { passive: false }
  );
  document.addEventListener('touchend', function () {
    picking = false;
  });
  
  // Hex input event
  input.addEventListener('input', function () {
    let val = input.value.trim();
    if (val === '') return;
    let color = normalizeHex(val);
    if (color || val.toLowerCase() === 'transparent') {
      setColor(color || 'transparent');
      drawPickerBackground(ctx);
      drawSelection(ctx, color || 'transparent');
      updatePreview();
    }
  });
}

// Initial state values
let fontColor = "#000000";
let bgColor = "#FFFFFF";

// Get DOM elements
const fontColorPicker = document.getElementById('fontColorPicker');
const bgColorPicker = document.getElementById('bggColorPicker');
const fontColorInput = document.getElementById('fontColorInput');
const bgColorInput = document.getElementById('bgColorInput');

// Getter and setter functions for the current colors
function getFontColor() { return fontColor; }
function setFontColor(val) { fontColor = val; }
function getBgColor() { return bgColor; }
function setBgColor(val) { bgColor = val; }

// Only update preview styles (without altering text content)
function updatePreview() {
  let ct = document.getElementById('gokturk');
  ct.style.color = fontColor === 'transparent' ? "#000" : fontColor;
  ct.style.background = bgColor === 'transparent' ? "" : bgColor;
  ct.style.backgroundImage =
    bgColor === 'transparent'
      ? 'repeating-conic-gradient(#ccc 0% 25%, transparent 0% 50%) 50% / 10px 10px'
      : '';
}

// ---- INITIALIZE THE PICKERS ----

// Font color picker initialization
(function () {
  const canvas = document.createElement('canvas');
  // New canvas width now includes LEFT_PANEL + GRAY_COLUMN + main grid.
  canvas.width = LEFT_PANEL_WIDTH + GRAY_COLUMN_WIDTH + GRID_COLS * COLOR_CELL_WIDTH;
  canvas.height = GRID_ROWS * COLOR_CELL_HEIGHT;
  fontColorPicker.innerHTML = '';
  fontColorPicker.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  drawPickerBackground(ctx);
  drawSelection(ctx, fontColor);
  setupPicker(canvas, fontColorInput, getFontColor, setFontColor, updatePreview);
})();

// Background color picker initialization
(function () {
  const canvas = document.createElement('canvas');
  canvas.width = LEFT_PANEL_WIDTH + GRAY_COLUMN_WIDTH + GRID_COLS * COLOR_CELL_WIDTH;
  canvas.height = GRID_ROWS * COLOR_CELL_HEIGHT;
  bgColorPicker.innerHTML = '';
  bgColorPicker.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  drawPickerBackground(ctx);
  drawSelection(ctx, bgColor);
  setupPicker(canvas, bgColorInput, getBgColor, setBgColor, updatePreview);
})();

// Set initial hex input values
fontColorInput.value = fontColor;
bgColorInput.value = bgColor;

// Perform the initial preview update
updatePreview();

