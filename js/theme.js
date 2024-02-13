// Get the theme toggle button element
const themeToggle = document.querySelector('#theme-toggle');

// Get the <link> element for the stylesheet
const styleSheet = document.querySelector('#theme-style');

// Store the current theme preference in a variable
let currentTheme = localStorage.getItem('themePreference');

// Check if a theme preference is stored in local storage
if (!currentTheme) {
  // Set the default theme preference to light
  currentTheme = 'light';
}

// Apply the initial theme preference
setTheme(currentTheme);

// Update the theme toggle button text
updateThemeToggleText(currentTheme);

// Listen for click events on the theme toggle button
themeToggle.addEventListener('click', () => {
  // Toggle the theme between light and dark
  toggleTheme();
});

// Function to toggle the theme
function toggleTheme() {
  // Check the current theme and switch to the opposite theme
  if (currentTheme === 'light') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
}

// Function to set the theme
function setTheme(theme) {
  // Get the base URL of the current page
  const baseUrl = window.location.origin + window.location.pathname;

  // Update the stylesheet href based on the theme
  styleSheet.setAttribute('href', `/css/${theme}.css`);


  // Update the current theme
  currentTheme = theme;

  // Update the theme toggle button text
  updateThemeToggleText(theme);

  // Store the theme preference in local storage
  localStorage.setItem('themePreference', theme);
}

// Function to update the theme toggle button text
function updateThemeToggleText(theme) {
  const switchText = theme === 'light' ? 'A' : 'A';
  themeToggle.textContent = `${switchText}`;
}

// Add a load event listener to the window object
window.addEventListener('load', function () {
  // Show the body element after the window finishes loading
  document.body.style.display = 'block';
});


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
  if (fSize < 21) {
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