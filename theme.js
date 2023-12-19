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
  // Update the stylesheet href based on the theme
  styleSheet.setAttribute('href', `../${theme}.css`);

  // Update the current theme
  currentTheme = theme;

  // Store the theme preference in local storage
  localStorage.setItem('themePreference', theme);
}

// Check if the default theme is set to 'light'
if (currentTheme === 'light') {
  // Set the default theme on page load
  setTheme('light');
}  

