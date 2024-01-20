function downloadImage() {
    var element = document.getElementById("damga");

    // Create a new canvas element
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    // Set canvas dimensions to match the element
    canvas.width = element.offsetWidth;
    canvas.height = element.offsetHeight;

    // Set background color to white
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Set text color to black
    context.fillStyle = "#000000";

    // Set font properties
    var fontSize = 86;
    var font = "tamga";
    context.font = fontSize + "px " + font;

    // Measure the text width
    var textWidth = context.measureText(element.innerText).width;

    // Calculate the text position to center it horizontally
    var textX = (canvas.width - textWidth) / 2;
    var textY = fontSize;

    // Draw the text on the canvas
    context.fillText(element.innerText, textX, textY);

    // Convert the canvas to a data URL
    var dataUrl = canvas.toDataURL("image/png");

    // Create a link element
    var link = document.createElement("a");
    link.href = dataUrl;
    link.download = "isim.png";

    // Simulate a click on the link element to trigger the download
    link.click();
}

function copyElementContent() {
    var element = document.getElementById("damga");
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