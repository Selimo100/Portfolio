// Unified Theme Management for Arcade
class ArcadeThemeManager {
  constructor() {
    this.init();
  }

  init() {
    this.applyStoredTheme();
    this.setupEventListeners();
    this.handleSystemThemeChange();
  }

  applyStoredTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    this.setTheme(theme, false);
  }

  setTheme(theme, store = true) {
    document.documentElement.setAttribute('data-theme', theme);
    if (store) {
      localStorage.setItem('theme', theme);
    }
    
    // Update body class for backward compatibility
    if (theme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
    
    this.updateThemeIcon(theme);
    this.updateMetaThemeColor(theme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#theme-icon');
    if (themeIcon) {
      themeIcon.textContent = theme === 'light' ? '☀️' : '🌙';
    }
  }

  updateMetaThemeColor(theme) {
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.name = 'theme-color';
      document.head.appendChild(themeColorMeta);
    }
    themeColorMeta.content = theme === 'light' ? '#ffffff' : '#1a1a2e';
  }

  setupEventListeners() {
    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Listen for storage changes to sync theme across tabs
    window.addEventListener('storage', (e) => {
      if (e.key === 'theme' && e.newValue) {
        this.setTheme(e.newValue, false);
      }
    });
  }

  handleSystemThemeChange() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light', false);
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ArcadeThemeManager();
});