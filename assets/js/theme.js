// Theme Management System
class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    // Initialize theme on page load
    this.applyStoredTheme();
    this.setupEventListeners();
    this.handleSystemThemeChange();
  }

  applyStoredTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    this.setTheme(theme, false); // Don't store on initial load if using system preference
  }

  setTheme(theme, store = true) {
    document.documentElement.setAttribute('data-theme', theme);
    if (store) {
      localStorage.setItem('theme', theme);
    }
    this.updateThemeIcon(theme === 'light');
    this.updateMetaThemeColor(theme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  updateThemeIcon(isLight) {
    const themeIcon = document.querySelector('.theme-toggle-btn i');
    if (themeIcon) {
      themeIcon.className = isLight ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    }
  }

  updateMetaThemeColor(theme) {
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.name = 'theme-color';
      document.head.appendChild(themeColorMeta);
    }
    themeColorMeta.content = theme === 'light' ? '#ffffff' : '#0E1418';
  }

  setupEventListeners() {
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Listen for storage changes to sync theme across tabs
    window.addEventListener('storage', (e) => {
      if (e.key === 'theme' && e.newValue) {
        this.setTheme(e.newValue, false);
      }
    });
  }

  handleSystemThemeChange() {
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light', false);
      }
    });
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});

// Expose theme manager globally for potential external use
window.ThemeManager = ThemeManager;