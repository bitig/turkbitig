// Copyright (C) turkbitig.com. All Rights Reserved.

function changeLetterSpacing(action) {
    // Changed to make letter spacing relative to text size using 'em' units
    const element = document.getElementById('gokturk');
    const currentSpacingPx = parseFloat(window.getComputedStyle(element).letterSpacing) || 0;
    const fontSize = parseFloat(window.getComputedStyle(element).fontSize);
    let spacingEm = currentSpacingPx / fontSize;
    
    const increment = 0.02; // in em
    if (action === 'increase') {
        spacingEm = Math.min(0.38, spacingEm + increment);
    } else if (action === 'decrease') {
        spacingEm = Math.max(-0.14, spacingEm - increment);
    }
    
    element.style.letterSpacing = `${spacingEm}em`;
}

function changeSize(action) {
    const element = document.getElementById('gokturk');
    let currentSize = window.getComputedStyle(element).fontSize;
    let sizeNum = parseFloat(currentSize);
    let target;
    
    if (action === 'increase') {
        target = sizeNum * 1.08; 
    } else if (action === 'decrease') {
        target = sizeNum * 0.92; 
    }
   
    let newSize = Math.round(target / 2) * 2;
    
    if (action === 'increase' && newSize > 800) {
        newSize = 800; 
    } else if (action === 'decrease' && newSize < 16) {
        newSize = 14; 
    }
    
    element.style.fontSize = `${newSize}px`;
}

function changeFont(fontName) {
    const element = document.getElementById('gokturk');
    element.style.fontFamily = fontName;
}

document.getElementById('fontRadioGroup').addEventListener('change', function(event) {
    const fontName = event.target.value;
    const element = document.getElementById('gokturk');
    element.style.fontFamily = fontName;
});

function changeColor(color) {
    document.getElementById('fontColor').value = color;
    document.getElementById('gokturk').style.color = color;
}

function changeBgColor(color) {
    document.getElementById('bgColor').value = color;
    document.getElementById('gokturk').style.backgroundColor = color;
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
            setTimeout(() => {
                selection.removeAllRanges();
                console.log('Text selection cleared');
            }, 5000);
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
    const letterSpacing = parseFloat(styles.letterSpacing) || 0;
    const currentWidth = element.offsetWidth;
    const paddingLeft = 5;   
    const paddingRight = 5;  
    const paddingTop = 30;    
    const paddingBottom = 2; 
    
    ctx.font = `${styles.fontSize} ${styles.fontFamily}`;
    
    function measureTextWithSpacing(text) {
        const graphemes = Array.from(segmenter.segment(text));
        if (graphemes.length === 0) return 0;
        const widths = graphemes.map(g => ctx.measureText(g.segment).width);
        const totalWidth = widths.reduce((sum, w) => sum + w, 0) + letterSpacing * (graphemes.length - 1);
        return totalWidth;
    }
    
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';
    
    for (let word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        if (measureTextWithSpacing(testLine) <= currentWidth - (paddingLeft + paddingRight)) {
            currentLine = testLine;
        } else {
            if (currentLine) {
                lines.push(currentLine);
            }
            const wordWidth = measureTextWithSpacing(word);
            if (wordWidth > currentWidth - (paddingLeft + paddingRight)) {
                let subWord = '';
                for (let char of word) {
                    const testSubWord = subWord + char;
                    if (measureTextWithSpacing(testSubWord) <= currentWidth - (paddingLeft + paddingRight)) {
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
    const lineWidths = lines.map(line => measureTextWithSpacing(line));
    const textWidth = Math.max(...lineWidths);
    
    canvas.width = textWidth + strokeWidth * 2 + paddingLeft + paddingRight;
    canvas.height = textHeight + strokeWidth * 2 + paddingTop + paddingBottom;
    
    ctx.fillStyle = styles.backgroundColor || 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = `${styles.fontSize} ${styles.fontFamily}`;
    ctx.textAlign = 'left'; 
    ctx.textBaseline = 'middle';
    ctx.fillStyle = styles.color;
    if (strokeWidth > 0) {
        ctx.strokeStyle = styles.webkitTextStrokeColor || 'black';
        ctx.lineWidth = strokeWidth;
    }
    
    const startY = paddingTop + strokeWidth + lineHeight / 2;
    const rightX = canvas.width - paddingRight - strokeWidth;
    lines.forEach((line, index) => {
        const y = startY + index * lineHeight;
        const graphemes = Array.from(segmenter.segment(line));
        let x = rightX;
        graphemes.forEach((grapheme, i) => {
            const width = ctx.measureText(grapheme.segment).width;
            x -= width;
            if (strokeWidth > 0) {
                ctx.strokeText(grapheme.segment, x, y);
            }
            ctx.fillText(grapheme.segment, x, y);
            if (i < graphemes.length - 1) {
                x -= letterSpacing;
            }
        });
    });
    
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

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        changeSize('increase');
    } else if (event.key === 'ArrowRight') {
        changeSize('decrease');
    }
});

const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });

document.getElementById('keyboard').addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        const key = event.target.getAttribute('data-key');
        const output = document.getElementById('gokturk'); 
        if (key === 'backspace') {
            const text = output.textContent;
            if (text.length > 0) {
                const segments = Array.from(segmenter.segment(text));
                const newText = segments.slice(0, -1).map(s => s.segment).join('');
                output.textContent = newText;
            }
        } else if (key === 'delete') {
            output.textContent = '';
        } else {
            output.textContent += key;
        }
    }
});

function copyDifferentValues(button) {
    const latinText = button.getAttribute('data-latin-text');
    const gokturkText = button.getAttribute('data-gokturk-text');
    document.getElementById('latin').value = '';
    document.getElementById('latin').value = latinText;
    document.getElementById('gokturk').innerText = gokturkText;
}

function clearText() {
    document.getElementById('latin').value = '';
    document.getElementById('gokturk').innerText = '';
}
