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
  currentTheme = 'light';
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
