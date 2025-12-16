// Copyright (C) turkbitig.com. All Rights Reserved.
// layout
const tabBarHeight = 28;
const colorCellHeight = 10;
const gridCols = 22;
const gridRows = 12;
const colors = generateColors();
const gridHeight = gridRows * colorCellHeight; // 120px
const totalCanvasHeight = tabBarHeight + gridHeight; // 144px
// color variables
let fontColor = 'hsl(0, 0%, 0%)';
let bgColor = 'hsl(0, 0%, 100%)';
let strokeColor = 'hsl(0, 0%, 0%)';
let currentProperty = "fontColor";
// navigation variables
let currentRow = 0;
let currentNavCol = 0;
let hasPosition = false;
// color array for the grid
function generateColors() {
  let arr = [];
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      let color;
      if (col === 0) {
        let l = Math.round(100 * (row / (gridRows - 1)));
        color = `hsl(0, 0%, ${l}%)`;
      } else {
        let h = (col - 1) * (360 / (gridCols - 1));
        let s = 100;
        let l = 10 + Math.round(80 * (row / (gridRows - 1)));
        color = `hsl(${h}, ${s}%, ${l}%)`;
      }
      arr.push(color);
    }
  }
  return arr;
}
// tabs at the top
function drawHorizontalTabs(ctx, canvasWidth, numberOfTabs) {
  const tabWidth = canvas.width / numberOfTabs;
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
  ctx.fillStyle = 'hsl(0, 0%, 0%)';
  ctx.fillRect(offsetX, offsetY, specialColumnWidth, specialCellHeight);
  // white
  ctx.fillStyle = 'hsl(0, 0%, 100%)';
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
  if (!selectedColor) return;
  ctx.save();
  ctx.lineWidth = 2;
  const specialCellHeight = gridHeight / 3;
  if (selectedColor === 'hsl(0, 0%, 0%)') {
    ctx.strokeStyle = "#FF0";
    ctx.strokeRect(offsetX + 1, offsetY + 1, specialColumnWidth - 2, specialCellHeight - 2);
  } else if (selectedColor === 'hsl(0, 0%, 100%)') {
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
// HSL-transparent to hex string.
function hslToHex(hslString) {
  if (hslString === "transparent") {
    return "transparent";
  }
  const tempDiv = document.createElement('div');
  tempDiv.style.color = hslString;
  document.body.appendChild(tempDiv);
  const rgbString = window.getComputedStyle(tempDiv).color;
  document.body.removeChild(tempDiv);
  // parse RGB string
  const match = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) {
    return "#000000"; // handle fallback
  }
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  // Convert to hex
  const toHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
// hex to hsl
function hexToHsl(hex) {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  r /= 255;
  g /= 255;
  b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  return `hsl(${h}, ${s}%, ${l}%)`;
}
// get color at navigation position
function getColorAtNavPosition(row, navCol) {
  if (navCol === 0) {
    const group = Math.floor(row / 4);
    if (group === 0) return 'hsl(0, 0%, 0%)';
    else if (group === 1) return 'hsl(0, 0%, 100%)';
    else return 'transparent';
  } else {
    const mainCol = navCol - 1;
    const idx = row * gridCols + mainCol;
    return colors[idx];
  }
}
// set position from color
function setPositionFromColor(color) {
  if (color === 'transparent') {
    currentNavCol = 0;
    currentRow = 8;
    hasPosition = true;
    return;
  }
  if (color === 'hsl(0, 0%, 0%)') {
    currentNavCol = 0;
    currentRow = 0;
    hasPosition = true;
    return;
  }
  if (color === 'hsl(0, 0%, 100%)') {
    currentNavCol = 0;
    currentRow = 4;
    hasPosition = true;
    return;
  }
  let idx = colors.indexOf(color);
  if (idx !== -1) {
    let row = Math.floor(idx / gridCols);
    let mainCol = idx % gridCols;
    currentNavCol = mainCol + 1;
    currentRow = row;
    hasPosition = true;
  } else {
    hasPosition = false;
  }
}
// color picker with fixed height
function setupPickerWithTabs(canvas, updatePreview) {
  const ctx = canvas.getContext("2d");
  let picking = false;
  let startedInTabs = false;
  const numberOfTabs = 3;
  // canvas fixed height dynamic width
  function resizeCanvas() {
    const displayWidth = colorPickerContainer.clientWidth;
    canvas.width = displayWidth;
    canvas.height = totalCanvasHeight; // fixed height: 144px
    redrawFullCanvas();
  }
  // draw the canvas
  function redrawFullCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const specialColumnWidth = 0.12 * canvas.width;
    const colorGridWidth = canvas.width - specialColumnWidth;
    const colorCellWidth = colorGridWidth / gridCols;
    drawHorizontalTabs(ctx, canvas.width, numberOfTabs);
    drawColorGrid(ctx, 0, tabBarHeight, specialColumnWidth, colorCellWidth, colorCellHeight);
    drawSelectionOnGrid(ctx, getCurrentColor(), 0, tabBarHeight, specialColumnWidth, colorCellWidth, colorCellHeight);
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
        redrawFullCanvas();
        setPositionFromColor(getCurrentColor());
        const currentColor = getCurrentColor();
        const hexColor = hslToHex(currentColor);
        document.getElementById("colorcode").value = hexColor;
      }
      return;
    }
    if (y < tabBarHeight + gridHeight) {
      const gridX = x;
      const gridY = y - tabBarHeight;
      const specialCellHeight = gridHeight / 3;
      let color = "";
      if (gridX >= 0 && gridX < specialColumnWidth) {
        currentNavCol = 0;
        currentRow = Math.floor(gridY / colorCellHeight);
        hasPosition = true;
        if (gridY >= 0 && gridY < specialCellHeight) color = 'hsl(0, 0%, 0%)';
        else if (gridY >= specialCellHeight && gridY < 2 * specialCellHeight) color = 'hsl(0, 0%, 100%)';
        else if (gridY >= 2 * specialCellHeight && gridY < 3 * specialCellHeight) color = "transparent";
      } else if (gridX >= specialColumnWidth && gridX < canvas.width) {
        const mainCol = Math.floor((gridX - specialColumnWidth) / colorCellWidth);
        const row = Math.floor(gridY / colorCellHeight);
        currentRow = row;
        currentNavCol = mainCol + 1;
        hasPosition = true;
        if (mainCol >= 0 && mainCol < gridCols && row >= 0 && row < gridRows) {
          const idx = row * gridCols + mainCol;
          color = colors[idx];
        }
      }
      if (color) {
        setCurrentColor(color);
        redrawFullCanvas();
        updatePreview();
        const hexColor = hslToHex(color);
        document.getElementById("colorcode").value = hexColor;
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
  // keyboard navigation
  canvas.tabIndex = 0;
  canvas.addEventListener("keydown", function (e) {
    if (!hasPosition) return;
    let moved = false;
    if (e.key === "ArrowUp") {
      currentRow = Math.max(0, currentRow - 1);
      moved = true;
    } else if (e.key === "ArrowDown") {
      currentRow = Math.min(gridRows - 1, currentRow + 1);
      moved = true;
    } else if (e.key === "ArrowLeft") {
      currentNavCol = Math.max(0, currentNavCol - 1);
      moved = true;
    } else if (e.key === "ArrowRight") {
      currentNavCol = Math.min(22, currentNavCol + 1);
      moved = true;
    }
    if (moved) {
      let color = getColorAtNavPosition(currentRow, currentNavCol);
      setCurrentColor(color);
      redrawFullCanvas();
      updatePreview();
      document.getElementById("colorcode").value = hslToHex(color);
      e.preventDefault();
    }
  });
  // text box listener
  const colorcodeInput = document.getElementById("colorcode");
  colorcodeInput.addEventListener("input", function() {
    const val = this.value.trim().toLowerCase();
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    let colorSet = false;
    let newColor = "";
    if (val === "transparent") {
      newColor = "transparent";
      colorSet = true;
    } else if (hexRegex.test(val)) {
      newColor = hexToHsl(val);
      colorSet = true;
    }
    if (colorSet) {
      setCurrentColor(newColor);
      setPositionFromColor(newColor);
      redrawFullCanvas();
      updatePreview();
    }
  });
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  setPositionFromColor(getCurrentColor());
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
const canvas = document.createElement("canvas");
canvas.style.width = "100%";
canvas.style.height = totalCanvasHeight + "px"; // fixed height
colorPickerContainer.appendChild(canvas);
setupPickerWithTabs(canvas, updatePreview);
updatePreview();
// initialize text box
const initialColor = getCurrentColor();
document.getElementById("colorcode").value = hslToHex(initialColor);
