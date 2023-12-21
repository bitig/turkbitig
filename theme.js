// Get the theme toggle button element
const themeToggle = document.querySelector('#theme-toggle');

// Get the <link> element for the stylesheet
const styleSheet = document.querySelector('#theme-stylesheet');

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
  styleSheet.setAttribute('href', `../${theme}.css`);


  // Update the current theme
  currentTheme = theme;

  // Update the theme toggle button text
  updateThemeToggleText(theme);

  // Store the theme preference in local storage
  localStorage.setItem('themePreference', theme);
}

// Function to update the theme toggle button text
function updateThemeToggleText(theme) {
  const switchText = theme === 'light' ? 'KARA' : ' AK ';
  themeToggle.textContent = `${switchText}`;
}
