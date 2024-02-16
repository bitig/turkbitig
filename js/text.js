// Allow users to increase or decrease the font size of a web page.
// Get the paragraph element
var paragraph = document.querySelector("body");

// Get the increase and decrease buttons
var increaseBtn = document.getElementById("increaseBtn");
var decreaseBtn = document.getElementById("decreaseBtn");

// Set the initial font size
var initialFontSize = 17;
var fSize = initialFontSize;

// Retrieve the font size preference from localStorage (if available)
var savedPreference = localStorage.getItem("fontSizePreference");
if (savedPreference) {
  var preference = JSON.parse(savedPreference);
  if (preference.expires && preference.expires < Date.now()) {
    // Remove expired preference
    localStorage.removeItem("fontSizePreference");
  } else {
    fSize = preference.size;
    paragraph.style.fontSize = fSize + "px";
  }
}

// Increase font size on button click
increaseBtn.addEventListener("click", function() {
  if (fSize < 28) {
    fSize += 2;
    paragraph.style.fontSize = fSize + "px";
    saveFontSizePreference(fSize);
  }
});

// Decrease font size on button click
decreaseBtn.addEventListener("click", function() {
  if (fSize > 17) {
    fSize -= 2;
    paragraph.style.fontSize = fSize + "px";
    saveFontSizePreference(fSize);
  }
});

// Save the font size preference to localStorage
function saveFontSizePreference(size) {
  var expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1); // Set expiration to 1 day from now
  var preference = {
    size: size,
    expires: expirationDate.getTime()
  };
  localStorage.setItem("fontSizePreference", JSON.stringify(preference));
}