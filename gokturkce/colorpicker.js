// Generate 48 colors: HSV evenly spread for 8 columns × 6 rows
function generateColors() {
  let colors = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 8; col++) {
      let h = Math.round((col / 8) * 360);
      let s = 40 + Math.round((row / 5) * 60);
      let v = 60 + Math.round((row / 5) * 40);
      colors.push(hsvToHex(h, s, v));
    }
  }
  return colors;
}
function hsvToHex(h, s, v) {
  s /= 100; v /= 100;
  let c = v * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = v - c;
  let r=0,g=0,b=0;
  if (h < 60)      { r=c; g=x; b=0; }
  else if (h < 120){ r=x; g=c; b=0; }
  else if (h < 180){ r=0; g=c; b=x; }
  else if (h < 240){ r=0; g=x; b=c; }
  else if (h < 300){ r=x; g=0; b=c; }
  else             { r=c; g=0; b=x; }
  r = Math.round((r+m)*255);
  g = Math.round((g+m)*255);
  b = Math.round((b+m)*255);
  return '#' + ((1<<24) + (r<<16) + (g<<8) + b).toString(16).slice(1).toUpperCase();
}
const colors = generateColors();

function drawPicker(targetDiv, selectedColor) {
  const canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 60;
  const ctx = canvas.getContext('2d');
  // Draw black, white, transparent squares
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 20, 20);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 20, 20, 20);

  // Draw gray separator line between white and transparent
  ctx.beginPath();
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.moveTo(0, 40); // x, y
  ctx.lineTo(20, 40);
  ctx.stroke();

  // Transparent: checkerboard
  ctx.fillStyle = '#ccc';
  ctx.fillRect(0, 40, 20, 20);
  ctx.fillStyle = '#fff';
  for (let y = 0; y < 20; y += 5) {
    for (let x = 0; x < 20; x += 5) {
      if ((x + y) % 10 === 0) ctx.fillRect(x, 40 + y, 5, 5);
    }
  }
  // Draw 8x6 grid of 10x10 color cells
  let i = 0;
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 8; col++) {
      ctx.fillStyle = colors[i++];
      ctx.fillRect(20 + col * 10, row * 10, 10, 10);
    }
  }
  // Draw selection rectangle if color is found
  if (selectedColor) {
    if (/^#?000000$/i.test(selectedColor)) {
      ctx.strokeStyle = '#FF0';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, 18, 18);
    } else if (/^#?FFFFFF$/i.test(selectedColor)) {
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 21, 18, 18);
    } else if (selectedColor === 'transparent') {
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 41, 18, 18);
    } else {
      let colorUpper = selectedColor.toUpperCase();
      let idx = colors.indexOf(colorUpper);
      if (idx !== -1) {
        let row = Math.floor(idx / 8);
        let col = idx % 8;
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(20 + col * 10 + 0.5, row * 10 + 0.5, 9, 9);
      }
    }
  }
  targetDiv.innerHTML = '';
  targetDiv.appendChild(canvas);
}

function normalizeHex(hex) {
  hex = hex.trim();
  if (hex.toLowerCase() === 'transparent') return 'transparent';
  if (hex.charAt(0) !== '#') hex = '#' + hex;
  if (/^#([0-9a-f]{3})$/i.test(hex)) {
    // Expand short form
    hex = '#' + hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3];
  }
  if (!/^#([0-9a-f]{6})$/i.test(hex)) return ''; // Invalid
  return hex.toUpperCase();
}

function setupPicker(picker, input, getColor, setColor) {
  function pickColorAt(x, y) {
    let color = '';
    // Black, White, Transparent
    if (x >= 0 && x < 20) {
      if (y >= 0 && y < 20) {
        color = '#000000';
      } else if (y >= 20 && y < 40) {
        color = '#FFFFFF';
      } else if (y >= 40 && y < 60) {
        color = 'transparent';
      }
    } else if (x >= 20 && x < 100) {
      let col = Math.floor((x - 20) / 10);
      let row = Math.floor(y / 10);
      if (col >= 0 && col < 8 && row >= 0 && row < 6) {
        let idx = row * 8 + col;
        color = colors[idx];
      }
    }
    if (color) {
      setColor(color);
      input.value = (color === 'transparent') ? 'transparent' : color.toUpperCase();
      drawPicker(picker, color);
      updatePreview();
    }
  }
  let picking = false;
  picker.addEventListener('mousedown', function(e) {
    picking = true;
    const rect = picker.getBoundingClientRect();
    pickColorAt(e.clientX - rect.left, e.clientY - rect.top);
  });
  picker.addEventListener('mousemove', function(e) {
    if (picking) {
      const rect = picker.getBoundingClientRect();
      pickColorAt(e.clientX - rect.left, e.clientY - rect.top);
    }
  });
  document.addEventListener('mouseup', function() {
    picking = false;
  });
  picker.addEventListener('touchstart', function(e) {
    picking = true;
    const rect = picker.getBoundingClientRect();
    const touch = e.touches[0];
    pickColorAt(touch.clientX - rect.left, touch.clientY - rect.top);
    e.preventDefault();
  });
  picker.addEventListener('touchmove', function(e) {
    if (picking) {
      const rect = picker.getBoundingClientRect();
      const touch = e.touches[0];
      pickColorAt(touch.clientX - rect.left, touch.clientY - rect.top);
      e.preventDefault();
    }
  });
  document.addEventListener('touchend', function() {
    picking = false;
  });
  // Hex input
  input.addEventListener('input', function() {
    let val = input.value.trim();
    if (val === '') return;
    let color = normalizeHex(val);
    if (color || val.toLowerCase() === 'transparent') {
      setColor(color || 'transparent');
      drawPicker(picker, color || 'transparent');
      updatePreview();
    }
  });
}

// Initial state
let fontColor = "#000000";
let bgColor = "#FFFFFF";

// Get DOM elements
const fontColorPicker = document.getElementById('fontColorPicker');
const bgColorPicker = document.getElementById('bgColorPicker');
const fontColorInput = document.getElementById('fontColorInput');
const bgColorInput = document.getElementById('bgColorInput');

// Draw pickers with initial color
drawPicker(fontColorPicker, fontColor);
drawPicker(bgColorPicker, bgColor);

fontColorInput.value = fontColor;
bgColorInput.value = bgColor;

// Functions to get/set current color values
function getFontColor() { return fontColor; }
function setFontColor(val) { fontColor = val; }

function getBgColor() { return bgColor; }
function setBgColor(val) { bgColor = val; }

// Setup pickers and inputs
setupPicker(fontColorPicker, fontColorInput, getFontColor, setFontColor);
setupPicker(bgColorPicker, bgColorInput, getBgColor, setBgColor);

function updatePreview() {
  let ct = document.getElementById('gokturk');
  ct.style.color = fontColor === 'transparent' ? "#000" : fontColor;
  ct.style.background = bgColor === 'transparent' ? "" : bgColor;
  ct.style.backgroundImage = bgColor === 'transparent'
    ? 'repeating-conic-gradient(#ccc 0% 25%, transparent 0% 50%) 50% / 10px 10px'
    : '';
}

// Initial preview
updatePreview();
