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
  if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
  } else {
      navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.85)';
  }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Add your form submission logic here
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
  });
}

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

// Add this CSS for animations
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

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.querySelector('.theme-toggle-btn');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  // Check for saved theme preference, otherwise use dark theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme === 'light');

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme === 'light');
  });
});

function updateThemeIcon(isLight) {
  const themeIcon = document.querySelector('.theme-toggle-btn i');
  themeIcon.className = isLight ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
}




console.log( `                                                                                                                            
                                                                      @@                                                                          
                                                                   @@@@@@@@                                                                       
                                                                @@@@@@@@@@@@@@                                                                    
                                                             @@@@@@@@@@@@@@@@@@@@                                                                 
                                                          @@@@@@@@@@@@  @@@@@@@@@@@                                                               
                                                       @@@@@@@@@@@@        @@@@@@@@@@@                                                            
                                                    @@@@@@@@@@@@              @@@@@@@@@@@                                                         
                                                 @@@@@@@@@@@@                    @@@@@@@@@@@                                                      
                                              @@@@@@@@@@@@                          @@@@@@@@@@@                                                   
                                           @@@@@@@@@@@@       @@@@@@       @@@@@       @@@@@@@@@@@@                                               
                                        @@@@@@@@@@@@       @@@@@@@@@@     @@@@@@@@@       @@@@@@@@@@@                                             
                                     @@@@@@@@@@@@       @@@@@@@@@@         @@@@@@@@@@@       @@@@@@@@@@@                                          
                                  @@@@@@@@@@@@       @@@@@@@@@@                @@@@@@@@@@       @@@@@@@@@@@                                       
                               @@@@@@@@@@@@       @@@@@@@@@@         @@@          @@@@@@@@@        @@@@@@@@@@@                                    
                            @@@@@@@@@@@@       @@@@@@@@@@           @@@@@@           @@@@@@@@@@       @@@@@@@@@@@                                 
                         @@@@@@@@@@@@       @@@@@@@@@@              @@@@@@              @@@@@@@@@@       @@@@@@@@@@@                              
                      @@@@@@@@@@@        @@@@@@@@@          @@@@    @@@@@@@   @@@          @@@@@@@@@        @@@@@@@@@@@                           
                   @@@@@@@@@@@        @@@@@@@@@          @@@@@@@    @@@@@@@    @@@@@          @@@@@@@@@        @@@@@@@@@@@                        
                @@@@@@@@@@@        @@@@@@@@@          @@@@@@@@@@    @@@@@@@   @@@@@@@            @@@@@@@@@@       @@@@@@@@@@@@                    
              @@@@@@@@@@@      @@@@@@@@@@          @@@@@@@@@@@@@    @@@@@@@   @@@@@@@               @@@@@@@@@@       @@@@@@@@@@@                  
              @@@@@@@@      @@@@@@@@@@          @@@@@@@@@@@@@@@@    @@@@@@@   @@@@@@@@      @@         @@@@@@@@@@       @@@@@@@@                  
              @@@@@@       @@@@@@@@          @@@@@@@@@@@@@@@@@@@    @@@@@@@   @@@@@@@@      @@@@@         @@@@@@@@@       @@@@@@                  
              @@@@@@         @@@          @@@@@@@@@@@@@@@@@@@@@@    @@@@@@@   @@@@@@@@      @@@@@@@          @@@@         @@@@@@                  
              @@@@@@                   @@@@@@@@@@@@@@@    @@@@@@    @@@@@@@   @@@@@@@@      @@@@@@@                       @@@@@@                  
              @@@@@@                @@@@@@@@@@@@@@@       @@@@@@    @@@@@@@    @@@@@@@      @@@@@@    @@@@                @@@@@@                  
              @@@@@@   @@@       @@@@@@@@@@@@@@@          @@@@@@    @@@@@@@@    @@@@@@      @@@@@    @@@@@@@         @@   @@@@@@                  
              @@@@@@   @@@@@     @@@@@@@@@@@@             @@@@@@    @@@@@@@@@@   @@@@@      @@@@    @@@@@@@@@     @@@@@   @@@@@@                  
              @@@@@@   @@@@@@    @@@@@@@@@               @@@@@@@    @@@@@@@@@@@    @@@      @@@   @@@@@@@@@@@     @@@@@   @@@@@@                  
              @@@@@@   @@@@@@    @@@@@@@     @@@@@@@@@@@@@@@@@@@      @@@@@@@@@@    @       @    @@@@@@@@@@@@     @@@@@   @@@@@@                  
              @@@@@@   @@@@@@    @@@@@@@     @@@@@@@@@@@@@@@@@@@       @@@@@@@@@@               @@@@@@@@@@@@@     @@@@@   @@@@@@                  
              @@@@@@   @@@@@@    @@@@@@@    @@@@@@@@@@@@@@@@@@@@         @@@@@@@@@            @@@@@@@@@@@@@@@     @@@@@   @@@@@@                  
              @@@@@@   @@@@@@    @@@@@@@                                  @@@@@@@@@@         @@@@@@@@@@@@@@@@     @@@@@   @@@@@@                  
              @@@@@@   @@@@@@    @@@@@@@                                   @@@@@@@@@@       @@@@@@@@@@@@@@@@@     @@@@@   @@@@@@                  
              @@@@@@   @@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@     @@@@@@@@@@    @@@@@@@@@@  @@@@@@@     @@@@@   @@@@@@                  
              @@@@@@   @@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@     @@@@@@@@@@ @@@@@@@@@@   @@@@@@@     @@@@@   @@@@@@                  
              @@@@@@   @@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@     @@@@@@@@@@@@@@@@@@     @@@@@@@     @@@@@   @@@@@@                  
   @@@@@@     @@@@@@   @@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@      @@@@@@@@@@@@@@@      @@@@@@@     @@@@@    @@@@@     @@@@@@@      
  @@@  @@@@   @@@@@@   @@@@@@    @@@@@@@@@@@@@@@@@@    @@@@@@@@     @@@@@@@       @@@@@@@@@@@@@       @@@@@@@     @@@@@   @@@@@@    @@@  @@@      
  @@@@ @@@@   @@@@@@   @@@@@@                                       @@@@@@@   @@   @@@@@@@@@@    @@   @@@@@@@     @@@@@   @@@@@@    @@@  @@@      
    @@@@@@    @@@@@@   @@@@@@                                       @@@@@@@   @@@    @@@@@@@    @@@   @@@@@@@     @@@@@   @@@@@@     @@@@@@       
              @@@@@@   @@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    @@@@@@@   @@@@    @@@@@    @@@@   @@@@@@@     @@@@@   @@@@@@                  
              @@@@@@   @@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    @@@@@@@   @@@@@    @@@    @@@@@   @@@@@@@     @@@@@   @@@@@@                  
              @@@@@@   @@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    @@@@@@@   @@@@@@@        @@@@@@   @@@@@@@     @@@@@   @@@@@@                  
              @@@@@@   @@@@@@      @@@@@@@@@@@@@@@@      @@@@@@@    @@@@@@@   @@@@@@@       @@@@@@@   @@@@@@@     @@@@@   @@@@@@                  
              @@@@@@   @@@@@@    @@                       @@@@@@    @@@@@@@   @@@@@@@       @@@@@@@   @@@@@@@     @@@@@   @@@@@@                  
              @@@@@@   @@@@@     @@@@@                    @@@@@@    @@@@@@@   @@@@@@@       @@@@@@@   @@@@@@@     @@@@@   @@@@@@                  
              @@@@@@   @@@@@     @@@@@@@@@                @@@@@@    @@@@@@@   @@@@@@@       @@@@@@@   @@@@@@@     @@@@@   @@@@@@                  
              @@@@@@   @@@@@     @@@@@@@@@@@@             @@@@@@    @@@@@@@    @@@@@@       @@@@@@@   @@@@@@@     @@@@@   @@@@@@                  
              @@@@@@   @@@@@     @@@@@@@@@@@@@@@          @@@@@@    @@@@@@     @@@@@@       @@@@@@@   @@@@@@@     @@@@@   @@@@@@                  
              @@@@@@   @@@@@     @@@@@@@@@@@@@@@@@@       @@@@@@    @@@@@@@    @@@@@@       @@@@@@@   @@@@@@@     @@@@@   @@@@@@                  
              @@@@@@    @  @        @@@@@@@@@@@@@@@@@@    @@@@@@    @@@@@@@    @@@@@@       @@@@@@@   @@@@        @       @@@@@@                  
              @@@@@@                   @@@@@@@@@@@@@@@@@@@@@@@@@    @@@@@@@    @@@@@@       @@@@@@@                       @@@@@@                  
              @@@@@@         @@@           @@@@@@@@@@@@@@@@@@@@@    @@@@@@@    @@@@@@       @@@@@@@          @@@@         @@@@@@                  
              @@@@@@       @@@@@@@@           @@@@@@@@@@@@@@@@@@    @@@@@@@    @@@@@@@      @@@@           @@@@@@@@       @@@@@@                  
              @@@@@@@@      @@@@@@@@@@@          @@@@@@@@@@@@@@@    @@@@@@@    @@@@@@@      @          @@@@@@@@@@       @@@@@@@@                  
              @@@@@@@@@@@      @@@@@@@@@@@           @@@@@@@@@@@    @@@@@@@    @@@@@@@              @@@@@@@@@@       @@@@@@@@@@@                  
                @@@@@@@@@@@@       @@@@@@@@@@           @@@@@@@@    @@@@@@@    @@@@@@@           @@@@@@@@@@       @@@@@@@@@@@@                    
                    @@@@@@@@@@@       @@@@@@@@@@           @@@@@    @@@@@@@    @@@@           @@@@@@@@@@       @@@@@@@@@@@@                       
                       @@@@@@@@@@@       @@@@@@@@@@           @@    @@@@@@@    @          @@@@@@@@@@        @@@@@@@@@@@@                          
                         @@@@@@@@@@@@       @@@@@@@@@@@             @@@@@@@            @@@@@@@@@@        @@@@@@@@@@@@                             
                            @@@@@@@@@@@@@       @@@@@@@@@@           @@@@@@         @@@@@@@@@@       @@@@@@@@@@@@@                                
                                @@@@@@@@@@@@       @@@@@@@@@@          @@@      @@@@@@@@@@@       @@@@@@@@@@@@                                    
                                   @@@@@@@@@@@@       @@@@@@@@@@              @@@@@@@@@@       @@@@@@@@@@@@                                       
                                      @@@@@@@@@@@@       @@@@@@@@@@       @@@@@@@@@@@       @@@@@@@@@@@@                                          
                                         @@@@@@@@@@@@       @@@@@@@@      @@@@@@@@       @@@@@@@@@@@@                                             
                                            @@@@@@@@@@@@       @@@@        @@@@       @@@@@@@@@@@@                                                
                                               @@@@@@@@@@@@                        @@@@@@@@@@@                                                    
                                                   @@@@@@@@@@@                  @@@@@@@@@@@                                                       
                                                      @@@@@@@@@@@           @@@@@@@@@@@@                                                          
                                                         @@@@@@@@@@@@    @@@@@@@@@@@@                                                             
                                                            @@@@@@@@@@@@@@@@@@@@@@                                                                
                                                               @@@@@@@@@@@@@@@@                                                                   
                                                                  @@@@@@@@@@                                                                      
                                                                     @@@                                                                          
                                                                                                                                                      
                                                                                                                                                      
                                                                                                                                                      
`)