// Copyright (C) turkbitig.com. All Rights Reserved.

document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.getElementById('gokturk');
    const fontPicker = document.getElementById('fontPicker');
    const radios = document.getElementsByName('textProp');

    const computedStyle = window.getComputedStyle(textarea);
    const defaults = {
        fontSize: parseFloat(computedStyle.fontSize),
        textStroke: 0.01,       
        letterSpacing: 0,    
        fontIndex: 0
    };

    textarea.style.fontSize = defaults.fontSize + 'px';
    textarea.style.letterSpacing = defaults.letterSpacing + 'em'; 
    textarea.style.webkitTextStrokeWidth = defaults.textStroke + 'em';
    textarea.style.fontFamily = fontPicker.options[defaults.fontIndex].value;

    let radioTimer;
    function pingRadioActivity() {
        clearTimeout(radioTimer);
        radioTimer = setTimeout(() => {
            document.querySelector('input[name="textProp"][value="fontSize"]').checked = true;
        }, 10000);
    }

    for (const radio of radios) {
        radio.addEventListener('change', pingRadioActivity);
    }

    function getActiveProperty() {
        for (const radio of radios) {
            if (radio.checked) return radio.value;
        }
    }

    function modifyProperty(direction) {
        pingRadioActivity(); 
        
        const prop = getActiveProperty();
        
        if (prop === 'fontSize') {
            let current = parseFloat(textarea.style.fontSize);
            let next = direction === 'up' ? Math.ceil(current * 1.05) : Math.floor(current / 1.05);
            next = Math.max(12, Math.min(next, 500)); 
            textarea.style.fontSize = next + 'px';
        } 
        else if (prop === 'letterSpacing') {
            let currentStyle = textarea.style.letterSpacing;
            let currentEm = currentStyle.includes('em') ? parseFloat(currentStyle) : 0;
            
            let step = 0.02; 
            let nextEm = direction === 'up' ? currentEm + step : currentEm - step;
            
            nextEm = Math.max(-0.14, Math.min(nextEm, 0.6)); 
            textarea.style.letterSpacing = nextEm + 'em';
        } 
        else if (prop === 'textStroke') {
            let currentStyle = textarea.style.webkitTextStrokeWidth;
            let currentEm = currentStyle.includes('em') ? parseFloat(currentStyle) : 0;
            
            let step = 0.01; 
            let nextEm = direction === 'up' ? currentEm + step : currentEm - step;
            
            nextEm = Math.max(0, Math.min(nextEm, 0.1));
            textarea.style.webkitTextStrokeWidth = nextEm + 'em';
        }
    }

    function modifyFont(direction) {
        let currentIndex = fontPicker.selectedIndex;
        let maxIndex = fontPicker.options.length - 1;

        if (direction === 'up') {
            fontPicker.selectedIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
        } else if (direction === 'down') {
            fontPicker.selectedIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
        }
        
        textarea.style.fontFamily = fontPicker.value;
    }

    fontPicker.addEventListener('change', (e) => {
        textarea.style.fontFamily = e.target.value;
    });

    function setupHoldAction(btnId, actionFn) {
        const btn = document.getElementById(btnId);
        let intervalId;
        let timeoutId;

        const startHold = (e) => {
            if (e.type === 'touchstart' && e.cancelable) {
                e.preventDefault(); 
            }
            actionFn(); 
            timeoutId = setTimeout(() => {
                intervalId = setInterval(actionFn, 100); 
            }, 400);
        };

        const endHold = () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };

        btn.addEventListener('mousedown', startHold);
        btn.addEventListener('mouseup', endHold);
        btn.addEventListener('mouseleave', endHold);
        
        btn.addEventListener('touchstart', startHold, { passive: false });
        btn.addEventListener('touchend', endHold);
        btn.addEventListener('touchcancel', endHold);
    }

    setupHoldAction('btnPlus', () => modifyProperty('up'));
    setupHoldAction('btnMinus', () => modifyProperty('down'));
    setupHoldAction('btnUp', () => modifyFont('up'));
    setupHoldAction('btnDown', () => modifyFont('down'));
});

