const observerOptions = {
    threshold: 0.25
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const heroElements = document.querySelectorAll('.hero-section h1, .hero-section h2, .hero-section p, .hero-section .cta-btn');
    heroElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.2}s`;
    });
  });
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  
    .fade-in {
      animation: fadeInUp 0.5s ease forwards;
    }
  `;
  document.head.appendChild(style);