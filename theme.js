    function setTheme(theme) {
      const themeStyle = document.getElementById('theme-style');
      themeStyle.href = '../' + theme + '.css';
      localStorage.setItem('theme', theme);
    }

    function toggleTheme() {
      const currentTheme = localStorage.getItem('theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    }

    window.addEventListener('DOMContentLoaded', function() {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme);
      }

      const themeToggleBtn = document.getElementById('theme-toggle');
      themeToggleBtn.addEventListener('click', toggleTheme);
    });

