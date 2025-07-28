// Theme initialization to prevent FOUC (Flash of Unstyled Content)
(function() {
  'use strict';
  
  // Apply theme immediately before DOM is ready
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', theme);
    
    // Add a class to indicate theme is loading
    document.documentElement.classList.add('theme-loading');
    
    // Remove loading class after a short delay
    setTimeout(() => {
      document.documentElement.classList.remove('theme-loading');
      document.documentElement.classList.add('theme-loaded');
    }, 100);
  }
  
  // Run immediately
  initTheme();
  
  // Also run when DOM is ready as backup
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
