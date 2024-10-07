// Get the theme buttons
const lightThemeButton = document.querySelector('#light-theme');
const grayThemeButton = document.querySelector('#gray-theme');
const darkThemeButton = document.querySelector('#dark-theme');

// Get the <link> element for the stylesheet
const styleSheet = document.querySelector('#theme-style');

// Store the current theme preference in a variable
let currentTheme = localStorage.getItem('themePreference');

// Check if a theme preference is stored in local storage
if (!currentTheme) {
  // Set the default theme preference to light
  currentTheme = 'gray';
}

// Apply the initial theme preference
setTheme(currentTheme);

// Add click event listeners to the theme buttons
lightThemeButton.addEventListener('click', () => {
  setTheme('light');
});

grayThemeButton.addEventListener('click', () => {
  setTheme('gray');
});

darkThemeButton.addEventListener('click', () => {
  setTheme('dark');
});

// Function to set the theme
function setTheme(theme) {
  // Get the base URL of the current page
  const baseUrl = window.location.origin + window.location.pathname;

  // Update the stylesheet href based on the theme
  styleSheet.setAttribute('href', `/css/${theme}.css`);

  // Update the current theme
  currentTheme = theme;

  // Store the theme preference in local storage
  localStorage.setItem('themePreference', theme);
}

// Allow users to increase or decrease the font size of a web page.
// Get the paragraph element
var paragraph = document.querySelector("body");

// Get the increase and decrease buttons
var increaseBtn = document.getElementById("increaseBtn");
var decreaseBtn = document.getElementById("decreaseBtn");

// Set the initial font size
var initialFontSize = 18;
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
  if (fSize <= 23) {
    fSize += 1;
    paragraph.style.fontSize = fSize + "px";
    saveFontSizePreference(fSize);
  }
});

// Decrease font size on button click
decreaseBtn.addEventListener("click", function() {
  if (fSize >= 17) {
    fSize -= 1;
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
