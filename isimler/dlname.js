// Copyright (C) turkbitig.com. All Rights Reserved.

window.onload = function() {
    const damgaDiv = document.getElementById('isim');

    document.querySelectorAll('button[id]').forEach(button => {
        if (button.id !== 'downloadImage') {
            button.addEventListener('click', function() {
                const font = button.id.charAt(0).toUpperCase() + button.id.slice(1);
                damgaDiv.style.fontFamily = `${font}, sans-serif`;
            });
        }
    });

    window.downloadImage = function() {
        const element = document.getElementById("isim");

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = element.offsetWidth;
        canvas.height = element.offsetHeight;

        context.fillStyle = "#FFFFFF";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "#000000";

        const fontSize = 86;
        const font = window.getComputedStyle(element).fontFamily;
        context.font = fontSize + "px " + font;

        const textWidth = context.measureText(element.innerText).width;
        const textX = (canvas.width - textWidth) / 2;
        const textY = fontSize;

        context.fillText(element.innerText, textX, textY);

        const dataUrl = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = dataUrl;

        // Get current time and format it
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}${minutes}${seconds}`;

        // Add time to the file name
        link.download = `Gokturkce_${timeString}.png`;

        link.click();
    };
};

function copyElementContent() {
    var element = document.getElementById("isim");
    var range = document.createRange();
    range.selectNodeContents(element);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");

    // Optionally, you can add a class to highlight the selected text temporarily
    element.classList.add("highlighted-text");
    
    // Remove the highlight after a certain period
    setTimeout(function() {
        element.classList.remove("highlighted-text");
    }, 1000); // Remove the highlight after 1 second (adjust this delay as needed)
}
