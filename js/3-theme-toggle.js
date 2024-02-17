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
  // Toggle the theme between light, gray, and dark
  toggleTheme();
});

// Listen for keydown events on the window
window.addEventListener('keydown', (event) => {
  // Check if Ctrl + Space keys are pressed simultaneously
  if (event.ctrlKey && event.code === 'Space') {
    // Prevent the default behavior of the key combination
    event.preventDefault();

    // Toggle the theme between light, gray, and dark
    toggleTheme();
  }
});

// Function to toggle the theme
function toggleTheme() {
  // Determine the next theme based on the current theme
  let nextTheme;
  if (currentTheme === 'light') {
    nextTheme = 'gray';
  } else if (currentTheme === 'gray') {
    nextTheme = 'dark';
  } else {
    nextTheme = 'light';
  }

  // Apply the next theme
  setTheme(nextTheme);
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
  let switchText;
  if (theme === 'light') {
    switchText = 'Light';
  } else if (theme === 'gray') {
    switchText = 'Gray';
  } else {
    switchText = 'Dark';
  }
  themeToggle.textContent = switchText;
}

// Add a load event listener to the window object
window.addEventListener('load', function () {
  // Show the body element after the window finishes loading
  document.body.style.display = 'block';
});