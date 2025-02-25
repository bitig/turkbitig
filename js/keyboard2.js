// Copyright (C) turkbitig.com. All Rights Reserved.

function changeSize(action) {
    const element = document.getElementById('gokturk');
    let currentSize = window.getComputedStyle(element).fontSize;
    let sizeNum = parseFloat(currentSize);
    let newSize;
    
    if (action === 'increase') {
        newSize = Math.round(sizeNum * 1.08);
        if (newSize > 800) newSize = 800; // Cap at 800px
    } else if (action === 'decrease') {
        newSize = Math.round(sizeNum * 0.92);
        if (newSize < 16) newSize = 16; // Floor at 16px
    }
    
    element.style.fontSize = `${newSize}px`;
}

function changeFont(fontName) {
    const element = document.getElementById('gokturk');
    element.style.fontFamily = fontName;
}

function changeColor(color) {
    const element = document.getElementById('gokturk');
    element.style.color = color;
}

function changeBgColor(color) {
    const element = document.getElementById('gokturk');
    element.style.backgroundColor = color;
}

function copyGokturk() {
    const element = document.getElementById('gokturk');
    const textToCopy = element.innerText;
    
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
            selection.removeAllRanges();
        });
}

function changeStrokeSize(action) {
    const element = document.getElementById('gokturk');
    let currentStrokeWidth = window.getComputedStyle(element).webkitTextStrokeWidth || '0px';
    let strokeNum = parseFloat(currentStrokeWidth) || 0;
    
    if (action === 'increase' && strokeNum < 99) {
        strokeNum += 1;
    } else if (action === 'decrease' && strokeNum > 0) {
        strokeNum -= 1;
    }
    
    element.style.webkitTextStrokeWidth = `${strokeNum}px`;
    element.style.textStrokeWidth = `${strokeNum}px`;
}

function changeStrokeColor(color) {
    const element = document.getElementById('gokturk');
    element.style.webkitTextStrokeColor = color;
    element.style.textStrokeColor = color;
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        changeSize('increase');
    } else if (event.key === 'ArrowRight') {
        changeSize('decrease');
    }
});

function downloadAsPng() {
    const element = document.getElementById('gokturk');
    const selection = window.getSelection();
    let text = '';
    
    if (selection.rangeCount > 0 && element.contains(selection.anchorNode)) {
        text = selection.toString().trim();
    }
    if (!text) {
        text = element.innerText.trim();
    }
    if (text === '') text = ' ';
    
    const styles = window.getComputedStyle(element);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
        console.error('Canvas context not supported');
        return;
    }
    
    const fontSize = parseFloat(styles.fontSize);
    const strokeWidth = parseFloat(styles.webkitTextStrokeWidth || '0');
    const currentWidth = element.offsetWidth;
    const padding = 20;
    ctx.font = `${styles.fontSize} ${styles.fontFamily}`;
    
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';
    
    for (let word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width <= currentWidth - padding * 2) {
            currentLine = testLine;
        } else {
            if (currentLine) {
                lines.push(currentLine);
            }
            const wordMetrics = ctx.measureText(word);
            if (wordMetrics.width > currentWidth - padding * 2) {
                let subWord = '';
                for (let char of word) {
                    const testSubWord = subWord + char;
                    if (ctx.measureText(testSubWord).width <= currentWidth - padding * 2) {
                        subWord = testSubWord;
                    } else {
                        lines.push(subWord);
                        subWord = char;
                    }
                }
                currentLine = subWord;
            } else {
                currentLine = word;
            }
        }
    }
    if (currentLine) lines.push(currentLine);
    
    const textMetrics = ctx.measureText(lines[0]);
    const lineHeight = (textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent || fontSize) * 1.2;
    const textHeight = lines.length * lineHeight;
    const textWidth = Math.max(...lines.map(line => ctx.measureText(line).width));
    
    canvas.width = textWidth + strokeWidth * 2 + padding * 2;
    canvas.height = textHeight + strokeWidth * 2 + padding * 2;
    
    ctx.fillStyle = styles.backgroundColor || 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = `${styles.fontSize} ${styles.fontFamily}`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = styles.webkitTextStrokeColor || 'black';
    ctx.lineWidth = strokeWidth;
    ctx.fillStyle = styles.color;
    
    const startY = (canvas.height - textHeight) / 2 + lineHeight / 2;
    const rightX = canvas.width - padding;
    lines.forEach((line, index) => {
        const y = startY + index * lineHeight;
        ctx.strokeText(line, rightX, y);
        ctx.fillText(line, rightX, y);
    });
    
    try {
        const dataUrl = canvas.toDataURL('image/png');
        if (!dataUrl || dataUrl === 'data:,') {
            console.error('Canvas data URL is empty');
            return;
        }
        // Get Istanbul time
        const now = new Date().toLocaleTimeString('tr-TR', { 
            timeZone: 'Europe/Istanbul',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const timeString = now.replace(/:/g, '-'); // Replace colons with dashes
        const fileName = `gokturk-${timeString}.png`;
        
        const link = document.createElement('a');
        link.download = fileName;
        link.href = dataUrl;
        link.click();
        console.log('Download triggered successfully');
    } catch (err) {
        console.error('Error generating PNG: ', err);
    }
}
