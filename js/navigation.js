// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Navbar background change on scroll
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = currentTheme === 'light' 
        ? 'rgba(0, 123, 255, 0.95)' // Blue background for light theme
        : 'rgba(10, 25, 47, 0.95)';
    } else {
      navbar.style.backgroundColor = currentTheme === 'light'
        ? 'rgba(0, 123, 255, 0.85)' // Blue background for light theme
        : 'rgba(10, 25, 47, 0.85)';
    }
  });