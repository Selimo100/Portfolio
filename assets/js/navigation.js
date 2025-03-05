document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = currentTheme === 'light' 
        ? 'rgba(0, 123, 255, 0.95)'
        : 'rgba(10, 25, 47, 0.95)';
    } else {
      navbar.style.backgroundColor = currentTheme === 'light'
        ? 'rgba(0, 123, 255, 0.85)'
        : 'rgba(10, 25, 47, 0.85)';
    }
  });