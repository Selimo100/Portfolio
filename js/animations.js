// Add animation to elements when they come into view
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
  
  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
  
  // Add animation class
  document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to hero section elements
    const heroElements = document.querySelectorAll('.hero-section h1, .hero-section h2, .hero-section p, .hero-section .cta-btn');
    heroElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.2}s`;
    });
  });
  
  // Add animations CSS
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