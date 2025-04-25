// Copyright (C) turkbitig.com. All Rights Reserved.

// Constants for layout
const tabBarHeight = 24;      // Fixed height for the tab bar
const colorCellHeight = 12;   // Static height for color cells
const gridCols = 14;          // Number of columns in the color grid
const gridRows = 10;          // Number of rows in the color grid
const colors = generateColors();

// Calculate fixed heights
const gridHeight = gridRows * colorCellHeight; // 120px
const totalCanvasHeight = tabBarHeight + gridHeight; // 144px

// Global color variables
let fontColor = '';
let bgColor = 'hsl(0, 0%, 100%)';
let strokeColor = 'hsl(0, 0%, 0%)';
let currentProperty = "fontColor";

// Generate the color array for the grid
function generateColors() {
  let arr = [];
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      let color;
      if (col === 0) {
        let l = Math.round(100 * (row / (gridRows - 1)));
        color = `hsl(0, 0%, ${l}%)`;
      } else {
//        let h = 30 * (col - 1);
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

// Draw the tabs at the top
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
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, tabWidth, tabBarHeight);
    ctx.fillStyle = "#000";
    ctx.fillText(tabs[i].label, x + tabWidth / 2, y + tabBarHeight / 2);
  }
}

// Draw the color grid, including special column
function drawColorGrid(ctx, offsetX, offsetY, specialColumnWidth, colorCellWidth, colorCellHeight) {
  const specialCellHeight = gridHeight / 3; // 40px each

  // Special column: Black
  ctx.fillStyle = 'hsl(0, 0%, 0%)';
  ctx.fillRect(offsetX, offsetY, specialColumnWidth, specialCellHeight);

  // Special column: White
  ctx.fillStyle = 'hsl(0, 0%, 100%)';
  ctx.fillRect(offsetX, offsetY + specialCellHeight, specialColumnWidth, specialCellHeight);

  // Special column: Transparent
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

  // Main color grid
  let idx = 0;
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      ctx.fillStyle = colors[idx++];
      ctx.fillRect(offsetX + specialColumnWidth + col * colorCellWidth, offsetY + row * colorCellHeight, colorCellWidth, colorCellHeight);
    }
  }
}

// Highlight the selected color
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

// Get and set current color based on property
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

// Setup the color picker with fixed height
function setupPickerWithTabs(canvas, updatePreview) {
  const ctx = canvas.getContext("2d");
  let picking = false;
  let startedInTabs = false;
  const numberOfTabs = 3;

  // Set canvas to fixed height and dynamic width
  function resizeCanvas() {
    const displayWidth = colorPickerContainer.clientWidth;
    canvas.width = displayWidth;
    canvas.height = totalCanvasHeight; // Fixed height: 144px
    redrawFullCanvas();
  }

  // Redraw the canvas
  function redrawFullCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const specialColumnWidth = 0.12 * canvas.width;
    const colorGridWidth = canvas.width - specialColumnWidth;
    const colorCellWidth = colorGridWidth / gridCols;
    drawHorizontalTabs(ctx, canvas.width, numberOfTabs);
    drawColorGrid(ctx, 0, tabBarHeight, specialColumnWidth, colorCellWidth, colorCellHeight);
    drawSelectionOnGrid(ctx, getCurrentColor(), 0, tabBarHeight, specialColumnWidth, colorCellWidth, colorCellHeight);
  }

  // Handle color picking
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
      }
      return;
    }

    if (y < tabBarHeight + gridHeight) {
      const gridX = x;
      const gridY = y - tabBarHeight;
      const specialCellHeight = gridHeight / 3;
      let color = "";
      if (gridX >= 0 && gridX < specialColumnWidth) {
        if (gridY >= 0 && gridY < specialCellHeight) color = 'hsl(0, 0%, 0%)';
        else if (gridY >= specialCellHeight && gridY < 2 * specialCellHeight) color = 'hsl(0, 0%, 100%)';
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
        redrawFullCanvas();
        updatePreview();
      }
    }
  }

  // Event listeners
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

// Update the preview element
function updatePreview() {
  let ct = document.getElementById("gokturk");
  ct.style.color = fontColor === "transparent" ? "#000" : fontColor;
  ct.style.background = bgColor === "transparent" ? "" : bgColor;
  ct.style.webkitTextStrokeColor = strokeColor;
  ct.style.textStrokeColor = strokeColor;
}

// Initialize
const colorPickerContainer = document.getElementById("colorPicker");
const canvas = document.createElement("canvas");
canvas.style.width = "100%";
canvas.style.height = totalCanvasHeight + "px"; // Fixed height
colorPickerContainer.appendChild(canvas);

setupPickerWithTabs(canvas, updatePreview);
updatePreview();
