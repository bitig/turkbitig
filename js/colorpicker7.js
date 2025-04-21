// Copyright (C) turkbitig.com. All Rights Reserved.

const tabItemWidth = 55;      // tab width.
const tabBarHeight = 24;      // tab height.

const colorCellWidth = 12;
const colorCellHeight = 12;
const gridCols = 12;           // grid columns 
const gridRows = 10;           // grid rows
const colors = generateColors();

let fontColor = 'hsl(152, 100%, 37%)'; // approximately #12E0B0
let bgColor = 'hsl(0, 0%, 100%)';     // white
let strokeColor = 'hsl(0, 0%, 0%)';   // black
let currentProperty = "fontColor";    // default property

// Generate predefined color palette using HSL
function generateColors() {
  let arr = [];
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      let color;
      if (col === 0) { // Grayscale
        let l = Math.round(100 * (row / (gridRows - 1)));
        color = `hsl(0, 0%, ${l}%)`;
      } else { // Colored columns
        let h = 30 * (col - 1);
        let s = 100;
        let l = 10 + Math.round(80 * (row / (gridRows - 1)));
        color = `hsl(${h}, ${s}%, ${l}%)`;
      }
      arr.push(color);
    }
  }
  return arr;
}

// Draw horizontal tabs
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

// Draw color grid
function drawColorGrid(ctx, offsetX, offsetY) {
  let specialCellHeight = (gridRows * colorCellHeight) / 3;  // (10*12)/3 = 40.
  
  // Black, white, transparent
  ctx.fillStyle = 'hsl(0, 0%, 0%)';
  ctx.fillRect(offsetX, offsetY, 20, specialCellHeight);
  
  ctx.fillStyle = 'hsl(0, 0%, 100%)';
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
  
  // Color grid cells
  let idx = 0;
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      ctx.fillStyle = colors[idx++];
      ctx.fillRect(offsetX + 20 + col * colorCellWidth, offsetY + row * colorCellHeight, colorCellWidth, colorCellHeight);
    }
  }
}

// Draw selection on grid
function drawSelectionOnGrid(ctx, selectedColor, offsetX, offsetY) {
  if (!selectedColor) return;
  ctx.save();
  ctx.lineWidth = 2;
  let specialCellHeight = (gridRows * colorCellHeight) / 3;
  if (selectedColor === 'hsl(0, 0%, 0%)') {
    ctx.strokeStyle = "#FF0";
    ctx.strokeRect(offsetX + 1, offsetY + 1, 18, specialCellHeight - 2);
  } else if (selectedColor === 'hsl(0, 0%, 100%)') {
    ctx.strokeStyle = "#000";
    ctx.strokeRect(offsetX + 1, offsetY + specialCellHeight + 1, 18, specialCellHeight - 2);
  } else if (selectedColor === "transparent") {
    ctx.strokeStyle = "#000";
    ctx.strokeRect(offsetX + 1, offsetY + 2 * specialCellHeight + 1, 18, specialCellHeight - 2);
  } else {
    let idx = colors.indexOf(selectedColor);
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

// Setup picker with tabs
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

    // Color grid y-coordinate
    const gridX = x;
    const gridY = y - tabBarHeight;
    let specialCellHeight = (gridRows * colorCellHeight) / 3;
    let color = "";
    if (gridX >= 0 && gridX < 20) {
      if (gridY >= 0 && gridY < specialCellHeight) color = 'hsl(0, 0%, 0%)';
      else if (gridY >= specialCellHeight && gridY < 2 * specialCellHeight) color = 'hsl(0, 0%, 100%)';
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

// Update the preview
function updatePreview() {
  let ct = document.getElementById("gokturk");
  ct.style.color = fontColor === "transparent" ? "#000" : fontColor;
  ct.style.background = bgColor === "transparent" ? "" : bgColor;
  ct.style.webkitTextStrokeColor = strokeColor;
  ct.style.textStrokeColor = strokeColor;
}

// Create color picker 
const colorPickerContainer = document.getElementById("colorPicker");
const canvas = document.createElement("canvas");
canvas.width = 20 + gridCols * colorCellWidth;  // 20 + (12*12) = 164px.
canvas.height = tabBarHeight + gridRows * colorCellHeight;  // 24 + (10*12) = 144px.
colorPickerContainer.appendChild(canvas);

// Start color picker
setupPickerWithTabs(canvas, updatePreview);
updatePreview();
