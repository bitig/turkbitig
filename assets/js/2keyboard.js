// Copyright (C) turkbitig.com. All Rights Reserved.

let currentAdjustMode = 'size';
let resetTimer = null;
const DEFAULT_MODE = 'size';

function setAdjustMode(mode) {
    currentAdjustMode = mode;
    startResetTimer();
}

function startResetTimer() {
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
        currentAdjustMode = DEFAULT_MODE;
        const defaultRadio = document.querySelector('input[name="adjustMode"][value="' + DEFAULT_MODE + '"]');
        if (defaultRadio) defaultRadio.checked = true;
    }, 10000);
}

function adjustProperty(action) {
    startResetTimer();
    if (currentAdjustMode === 'size') {
        changeSize(action);
    } else if (currentAdjustMode === 'spacing') {
        changeLetterSpacing(action);
    } else if (currentAdjustMode === 'stroke') {
        changeStrokeSize(action);
    }
}

function changeLetterSpacing(action) {
    const element = document.getElementById('gokturk');
    const currentSpacingPx = parseFloat(window.getComputedStyle(element).letterSpacing) || 0;
    const fontSize = parseFloat(window.getComputedStyle(element).fontSize);
    let spacingEm = currentSpacingPx / fontSize;

    const increment = 0.02;
    if (action === 'increase') {
        spacingEm = Math.min(0.38, spacingEm + increment);
    } else if (action === 'decrease') {
        spacingEm = Math.max(-0.14, spacingEm - increment);
    }

    element.style.letterSpacing = `${spacingEm}em`;
}

function changeSize(action) {
    const element = document.getElementById('gokturk');
    let sizeNum = parseFloat(window.getComputedStyle(element).fontSize);
    let target;

    if (action === 'increase') {
        target = sizeNum * 1.08;
    } else {
        target = sizeNum * 0.92;
    }

    let newSize = Math.round(target / 2) * 2;

    if (action === 'increase' && newSize > 800) newSize = 800;
    if (action === 'decrease' && newSize < 16) newSize = 14;

    element.style.fontSize = `${newSize}px`;
}

function changeStrokeSize(action) {
    const element = document.getElementById('gokturk');
    let strokeNum = parseFloat(window.getComputedStyle(element).webkitTextStrokeWidth) || 0;

    if (action === 'increase' && strokeNum < 99) {
        strokeNum += 1;
    } else if (action === 'decrease' && strokeNum > 0) {
        strokeNum -= 1;
    }

    element.style.webkitTextStrokeWidth = `${strokeNum}px`;
    element.style.textStrokeWidth = `${strokeNum}px`;
}

function copyGokturk() {
    const element = document.getElementById('gokturk');
    const textToCopy = element.value;
   
    element.select();
   
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            console.log('Text copied to clipboard');
            setTimeout(() => {
                document.getSelection().removeAllRanges();
                console.log('Text selection cleared');
            }, 5000);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
            document.getSelection().removeAllRanges();
        });
}

// download as PNG
function downloadAsPng() {
    const element = document.getElementById('gokturk');
    const selection = window.getSelection();
    let text = '';
    // retrieve text
    if (selection.rangeCount > 0 && element.contains(selection.anchorNode)) {
        text = selection.toString();
    }
    if (!text) {
        text = element.value;
    }
    if (text === '') text = ' ';
    const styles = window.getComputedStyle(element);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Canvas context not supported');
        return;
    }
    // style properties
    const fontSize = parseFloat(styles.fontSize);
    const strokeWidth = parseFloat(styles.webkitTextStrokeWidth || '0');
    const letterSpacing = parseFloat(styles.letterSpacing) || 0;
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddingRight = parseFloat(styles.paddingRight) || 0;
    const paddingTop = parseFloat(styles.paddingTop) || 0;
    const paddingBottom = parseFloat(styles.paddingBottom) || 0;
    const borderLeftWidth = parseFloat(styles.borderLeftWidth) || 0;
    const borderRightWidth = parseFloat(styles.borderRightWidth) || 0;
    const availableWidth = element.offsetWidth - paddingLeft - paddingRight - borderLeftWidth - borderRightWidth;
    const backgroundColor = styles.backgroundColor || 'transparent';
    const fontColor = styles.color || 'black';
    const strokeColor = styles.webkitTextStrokeColor || 'black';
    // Set font and other properties early for accurate measurement
    ctx.font = `${styles.fontSize} ${styles.fontFamily}`;
    ctx.direction = 'rtl'; // Enable RTL with bidi support
    ctx.letterSpacing = `${letterSpacing}px`; // Apply letter spacing (supported in modern browsers)
    // Simplified measurement using native measureText (accounts for spacing and bidi width)
    function measureTextWithSpacing(text) {
        if (!text) return 0;
        return ctx.measureText(text).width;
    }
    // newlines
    const explicitLines = text.split('\n');
    let lines = [];
    // blank lines
    for (let explicitLine of explicitLines) {
        const words = explicitLine.split(' ');
        let currentLine = '';
        for (let word of words) {
            if (word === '') continue;
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            if (measureTextWithSpacing(testLine) <= availableWidth) {
                currentLine = testLine;
            } else {
                if (currentLine) {
                    lines.push(currentLine);
                    currentLine = word;
                } else {
                    // split word
                    let subWord = '';
                    for (let char of word) {
                        const testSubWord = subWord + char;
                        if (measureTextWithSpacing(testSubWord) <= availableWidth) {
                            subWord = testSubWord;
                        } else {
                            lines.push(subWord);
                            subWord = char;
                        }
                    }
                    currentLine = subWord;
                }
            }
        }
        // newlines
        lines.push(currentLine || '');
    }
    // dimensions
    const textMetrics = ctx.measureText(lines[0] || ' ');
    const lineHeight = (textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent || fontSize) * 1.2;
    const textHeight = lines.length * lineHeight;
    const lineWidths = lines.map(line => measureTextWithSpacing(line));
    const textWidth = Math.max(...lineWidths, 0);
    canvas.width = textWidth + strokeWidth * 2 + paddingLeft + paddingRight;
    canvas.height = textHeight + strokeWidth * 2 + paddingTop + paddingBottom;
    // apply background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // text properties (reset after background fill)
    ctx.font = `${styles.fontSize} ${styles.fontFamily}`;
    ctx.direction = 'rtl';
    ctx.letterSpacing = `${letterSpacing}px`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = fontColor;
    if (strokeWidth > 0) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
    }
    // render lines using native methods for bidi handling
    const startY = paddingTop + strokeWidth + lineHeight / 2;
    const rightX = canvas.width - paddingRight - strokeWidth;
    lines.forEach((line, index) => {
        const y = startY + index * lineHeight;
        if (line) {
            if (strokeWidth > 0) {
                ctx.strokeText(line, rightX, y);
            }
            ctx.fillText(line, rightX, y);
        }
    });
    // generate PNG
    try {
        const dataUrl = canvas.toDataURL('image/png');
        if (!dataUrl || dataUrl === 'data:,') {
            console.error('Canvas data URL is empty');
            return;
        }
        const now = new Date().toLocaleTimeString('tr-TR', {
            timeZone: 'Europe/Istanbul',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const timeString = now.replace(/:/g, '-');
        const fileName = `turkbitig-${timeString}.png`;
        const link = document.createElement('a');
        link.download = fileName;
        link.href = dataUrl;
        link.click();
        console.log('Download triggered successfully');
    } catch (err) {
        console.error('Error generating PNG: ', err);
    }
}

function copyDifferentValues(button) {
    const latinText = button.getAttribute('data-latin-text');
    const gokturkText = button.getAttribute('data-gokturk-text');
    document.getElementById('latin').value = '';
    document.getElementById('latin').value = latinText;
    document.getElementById('gokturk').value = gokturkText;
}

function clearText() {
    document.getElementById('latin').value = '';
    document.getElementById('gokturk').value = '';
}
