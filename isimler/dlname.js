// Copyright (C) turkbitig.com. All Rights Reserved.

const textContainer = document.getElementById('isim');

// adjust font size
function measureTextWidth(text, fontFamily, fontSize) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = `${fontSize}px ${fontFamily}`;
  const metrics = ctx.measureText(text);
  return metrics.width;
}

function adjustFontSize() {
  const container = document.getElementById('isim');
  const containerWidth = container.offsetWidth;
  const desiredWidth = containerWidth * 0.96;
  const text = container.innerText || container.textContent;
  const fontFamily = window.getComputedStyle(container).fontFamily;
  const currentFontSize = parseFloat(window.getComputedStyle(container).fontSize);
  const currentWidth = measureTextWidth(text, fontFamily, currentFontSize);
  if (currentWidth === 0) return; // avoid division by zero
  const scale = desiredWidth / currentWidth;
  let newFontSize = currentFontSize * scale;
  // clamp the font size between 16px and 200px
  newFontSize = Math.max(16, Math.min(130, newFontSize));
  container.style.fontSize = newFontSize + 'px';
}

// select font
document.getElementById('kultiginbold').addEventListener('click', function () {
  textContainer.style.fontFamily = 'kultiginbold';
  adjustFontSize();
});

document.getElementById('oguzbold').addEventListener('click', function () {
  textContainer.style.fontFamily = 'oguzbold';
  adjustFontSize();
});

document.getElementById('gokturkkalembold').addEventListener('click', function () {
  textContainer.style.fontFamily = 'gokturkkalembold';
  adjustFontSize();
});

document.getElementById('cizgi').addEventListener('click', function () {
  textContainer.style.fontFamily = 'cizgi';
  adjustFontSize();
});

document.getElementById('tamga').addEventListener('click', function () {
  textContainer.style.fontFamily = 'tamga';
  adjustFontSize();
});

// adjust font size on window resize
window.addEventListener('resize', adjustFontSize);

// initial font size 
adjustFontSize();

// time hh-mm-ss
function getIstanbulFormattedTime() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Istanbul',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  const parts = formatter.formatToParts(now);
  let hh = '00', mm = '00', ss = '00';
  parts.forEach(({ type, value }) => {
    if (type === 'hour') hh = value;
    if (type === 'minute') mm = value;
    if (type === 'second') ss = value;
  });
  return `${hh}-${mm}-${ss}`;
}

// download button
document.getElementById('downloadBtn').addEventListener('click', function() {
  const element = document.getElementById('isim');
  const text = element.innerText || element.textContent;
  
  // check if there's text
  if (!text) {
    alert('No text to download');
    return;
  }

  // compute styles
  const computedStyle = window.getComputedStyle(element);
  const font = computedStyle.font || `${computedStyle.fontSize} ${computedStyle.fontFamily}`;
  const bgColor = computedStyle.backgroundColor;

  // temporary canvas to measure text metrics
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.font = font;
  const metrics = tempCtx.measureText(text);

  // calculate text dimensions
  const textWidth = metrics.actualBoundingBoxRight - metrics.actualBoundingBoxLeft;
  const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

  // add 10px padding on all sides
  const padding = 10;
  const paddedWidth = textWidth + 2 * padding;
  const paddedHeight = textHeight + 2 * padding;

  // final canvas with padded dimensions
  const canvas = document.createElement('canvas');
  canvas.width = paddedWidth;
  canvas.height = paddedHeight;
  const ctx = canvas.getContext('2d');

  // background color 
  ctx.fillStyle = (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') ? bgColor : '#fff';
  ctx.fillRect(0, 0, paddedWidth, paddedHeight);

  // font and text properties
  ctx.font = font;
  ctx.fillStyle = computedStyle.color || '#000';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  // position with padding
  const x = padding - metrics.actualBoundingBoxLeft;
  const y = padding + metrics.actualBoundingBoxAscent;

  // draw text
  ctx.fillText(text, x, y);

  // filename formatted time
  const timeStr = getIstanbulFormattedTime();
  const fileName = `isim-${timeStr}.png`;

  // download link
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});


// copy text

function copyElementContent() {
    var element = document.getElementById("isim");
    var range = document.createRange();
    range.selectNodeContents(element);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");

    element.classList.add("highlighted-text");
    
    setTimeout(function() {
        element.classList.remove("highlighted-text");
    }, 1000); // remove the highlight after 1 second
}
