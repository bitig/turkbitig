// Copyright (C) turkbitig.com. All Rights Reserved.

// HSL to Hex conversion utility
function hslToHex(hsl) {
  if (hsl === undefined || hsl === '' || hsl === "transparent") return '';
  const hslRegex = /^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/;
  const matches = hsl.match(hslRegex);
  if (!matches) return '';
  const h = parseFloat(matches[1]) / 360;
  const s = parseFloat(matches[2]) / 100;
  const l = parseFloat(matches[3]) / 100;
  let r, g, b;
  if (s == 0) {
    r = g = b = l * 255;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - (l * s);
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1/3) * 255;
    g = hueToRgb(p, q, h) * 255;
    b = hueToRgb(p, q, h - 1/3) * 255;
  }
  function hueToRgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  }
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase();
}

// layout
const tabBarHeight = 24;      
const colorCellHeight = 12;   
const gridCols = 16;          
const gridRows = 10;          
const colors = generateColors();

const gridHeight = gridRows * colorCellHeight; // 120px
const totalCanvasHeight = tabBarHeight + gridHeight; // 144px

//  color variables (standardized to hex)
let fontColor = '#000000';
let bgColor = '#FFFFFF';
let strokeColor = '#000000';
let currentProperty = "fontColor";

// color array for the grid (now hex)
function generateColors() {
  let arr = [];
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      let hslColor;
      if (col === 0) {
        let l = Math.round(100 * (row / (gridRows - 1)));
        hslColor = `hsl(0, 0%, ${l}%)`;
      } else {
        let h = (col - 1) * (360 / (gridCols - 1));
        let s = 100;
        let l = 10 + Math.round(80 * (row / (gridRows - 1)));
        hslColor = `hsl(${h}, ${s}%, ${l}%)`;
      }
      arr.push(hslToHex(hslColor));
    }
  }
  return arr;
}

// tabs at the top
function drawHorizontalTabs(ctx, canvasWidth, numberOfTabs) {
  const tabWidth = canvasWidth / numberOfTabs;
  const tabs = [
    { label: 'Yazı', property: 'fontColor' },
    { label: 'Arka', property: 'bgColor' },
    { label: 'Kıyı', property: 'strokeColor' }
  ];
  ctx.textBaseline = "middle";
  ctx.font = 'bold 15px sans-serif';
  ctx.textAlign = "center";
  for (let i = 0; i < tabs.length; i++) {
    let x = i * tabWidth;
    let y = 0;
    const isActive = (currentProperty === tabs[i].property);
    ctx.fillStyle = isActive ? "#fff" : "#ddd";
    ctx.fillRect(x, y, tabWidth, tabBarHeight);
    if (i === 1) {
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + tabBarHeight);
      ctx.moveTo(x + tabWidth, y);
      ctx.lineTo(x + tabWidth, y + tabBarHeight);
      ctx.stroke();
    }
    ctx.fillStyle = "#000";
    ctx.fillText(tabs[i].label, x + tabWidth / 2, y + tabBarHeight / 2);
  }
}

// color grid
function drawColorGrid(ctx, offsetX, offsetY, specialColumnWidth, colorCellWidth, colorCellHeight) {
  const specialCellHeight = gridHeight / 3; // 40px each

  // black
  ctx.fillStyle = '#000000';
  ctx.fillRect(offsetX, offsetY, specialColumnWidth, specialCellHeight);

  // white
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(offsetX, offsetY + specialCellHeight, specialColumnWidth, specialCellHeight);

  // transparent
  ctx.beginPath();
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.moveTo(offsetX, offsetY + 2 * specialCellHeight);
  ctx.lineTo(offsetX + specialColumnWidth, offsetY + 2 * specialCellHeight);
  ctx.stroke();

  ctx.fillStyle = '#ccc';
  ctx.fillRect(offsetX, offsetY + 2 * specialCellHeight, specialColumnWidth, specialCellHeight);

  ctx.fillStyle = '#fff';
  for (let y = 0; y < specialCellHeight; y += 6) {
    for (let x = 0; x < specialColumnWidth; x += 6) {
      if ((x + y) % 12 === 0)
        ctx.fillRect(offsetX + x, offsetY + 2 * specialCellHeight + y, 6, 6);
    }
  }

  // main color grid
  let idx = 0;
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      ctx.fillStyle = colors[idx++];
      ctx.fillRect(offsetX + specialColumnWidth + col * colorCellWidth, offsetY + row * colorCellHeight, colorCellWidth, colorCellHeight);
    }
  }
}

// selected color
function drawSelectionOnGrid(ctx, selectedColor, offsetX, offsetY, specialColumnWidth, colorCellWidth, colorCellHeight) {
  if (!selectedColor || selectedColor === '') return;
  ctx.save();
  ctx.lineWidth = 2;
  const specialCellHeight = gridHeight / 3;
  if (selectedColor === '#000000') {
    ctx.strokeStyle = "#FF0";
    ctx.strokeRect(offsetX + 1, offsetY + 1, specialColumnWidth - 2, specialCellHeight - 2);
  } else if (selectedColor === '#FFFFFF') {
    ctx.strokeStyle = "#000";
    ctx.strokeRect(offsetX + 1, offsetY + specialCellHeight + 1, specialColumnWidth - 2, specialCellHeight - 2);
  } else if (selectedColor === "transparent") {
    ctx.strokeStyle = "#000";
    ctx.strokeRect(offsetX + 1, offsetY + 2 * specialCellHeight + 1, specialColumnWidth - 2, specialCellHeight - 2);
  } else {
    let idx = colors.indexOf(selectedColor);
    if (idx !== -1) {
      let row = Math.floor(idx / gridCols);
      let col = idx % gridCols;
      ctx.strokeStyle = "#000";
      ctx.strokeRect(
        offsetX + specialColumnWidth + col * colorCellWidth + 0.5,
        offsetY + row * colorCellHeight + 0.5,
        colorCellWidth - 1,
        colorCellHeight - 1
      );
    }
  }
  ctx.restore();
}

// set current color
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

// global redraw function for canvas
let canvas; // Will be set after creation
function updateColorPicker() {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const specialColumnWidth = 0.12 * canvas.width;
  const colorGridWidth = canvas.width - specialColumnWidth;
  const colorCellWidth = colorGridWidth / gridCols;
  drawHorizontalTabs(ctx, canvas.width, 3);
  drawColorGrid(ctx, 0, tabBarHeight, specialColumnWidth, colorCellWidth, colorCellHeight);
  drawSelectionOnGrid(ctx, getCurrentColor(), 0, tabBarHeight, specialColumnWidth, colorCellWidth, colorCellHeight);
}

// color picker with fixed height
function setupPickerWithTabs(canvasParam, updatePreview) {
  canvas = canvasParam;
  const ctx = canvas.getContext("2d");
  let picking = false;
  let startedInTabs = false;
  const numberOfTabs = 3;

  // canvas fixed height dynamic width
  function resizeCanvas() {
    const displayWidth = colorPickerContainer.clientWidth;
    canvas.width = displayWidth;
    canvas.height = totalCanvasHeight; // Fixed height: 144px
    updateColorPicker();
  }

  // color picking
  function pickColorAt(x, y) {
    const tabWidth = canvas.width / numberOfTabs;
    const specialColumnWidth = 0.12 * canvas.width;
    const colorGridWidth = canvas.width - specialColumnWidth;
    const colorCellWidth = colorGridWidth / gridCols;

    if (y < tabBarHeight) {
      const tabIndex = Math.floor(x / tabWidth);
      const tabs = [
        { property: "fontColor" },
        { property: "bgColor" },
        { property: "strokeColor" }
      ];
      if (tabIndex >= 0 && tabIndex < tabs.length) {
        currentProperty = tabs[tabIndex].property;
        updateColorPicker();
      }
      return;
    }

    if (y < tabBarHeight + gridHeight) {
      const gridX = x;
      const gridY = y - tabBarHeight;
      const specialCellHeight = gridHeight / 3;
      let color = "";
      if (gridX >= 0 && gridX < specialColumnWidth) {
        if (gridY >= 0 && gridY < specialCellHeight) color = '#000000';
        else if (gridY >= specialCellHeight && gridY < 2 * specialCellHeight) color = '#FFFFFF';
        else if (gridY >= 2 * specialCellHeight && gridY < 3 * specialCellHeight) color = "transparent";
      } else if (gridX >= specialColumnWidth && gridX < canvas.width) {
        const col = Math.floor((gridX - specialColumnWidth) / colorCellWidth);
        const row = Math.floor(gridY / colorCellHeight);
        if (col >= 0 && col < gridCols && row >= 0 && row < gridRows) {
          const idx = row * gridCols + col;
          color = colors[idx];
        }
      }
      if (color) {
        setCurrentColor(color);
        const current = getCurrentColor();
        document.getElementById("colorcode").value = current === "transparent" ? '' : current;
        updatePreview();
        updateColorPicker();
      }
    }
  }

  // event listeners
  canvas.addEventListener("mousedown", function (e) {
    picking = true;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    startedInTabs = (y < tabBarHeight);
    pickColorAt(x, y);
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
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    startedInTabs = (y < tabBarHeight);
    pickColorAt(x, y);
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

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
}

// update the preview 
function updatePreview() {
  let ct = document.getElementById("gokturk");
  ct.style.color = fontColor === "transparent" ? "#000" : fontColor;
  ct.style.background = bgColor === "transparent" ? "" : bgColor;
  ct.style.webkitTextStrokeColor = strokeColor;
  ct.style.textStrokeColor = strokeColor;
}

// initialize
const colorPickerContainer = document.getElementById("colorPicker");
canvas = document.createElement("canvas");
canvas.style.width = "100%";
canvas.style.height = totalCanvasHeight + "px"; // Fixed height
colorPickerContainer.appendChild(canvas);

setupPickerWithTabs(canvas, updatePreview);
updatePreview();

// Hex input functionality
const colorcode = document.getElementById("colorcode");
colorcode.value = getCurrentColor() === "transparent" ? '' : getCurrentColor();
colorcode.addEventListener('input', function(e) {
  let val = e.target.value.trim();
  let color;
  if (val === '') {
    color = "transparent";
  } else {
    let match3 = val.match(/^#?([a-fA-F0-9]{3})$/i);
    let match6 = val.match(/^#?([a-fA-F0-9]{6})$/i);
    if (match3) {
      let digits = match3[1].toUpperCase();
      let expanded = digits.split('').map(d => d + d).join('');
      color = '#' + expanded;
    } else if (match6) {
      color = '#' + match6[1].toUpperCase();
    } else {
      return; // Invalid hex, ignore
    }
  }
  setCurrentColor(color);
  updatePreview();
  updateColorPicker();
});
