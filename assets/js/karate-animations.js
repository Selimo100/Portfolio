document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-slide-right, .reveal-slide-left, .reveal-slide-up');
    
    const revealOnScroll = () => {
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          element.classList.add('active');
        }
      });
    };
  
    revealOnScroll();
    
    window.addEventListener('scroll', revealOnScroll);
  
    const heroSection = document.querySelector('.karate-hero');
    let lastScrollY = window.scrollY;
  
    const updateParallax = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      
      if (heroSection) {
        const background = heroSection.style.backgroundPositionY;
        const currentPos = background ? parseInt(background) : 50;
        heroSection.style.backgroundPositionY = `${currentPos + (delta * 0.5)}%`;
      }
      
      lastScrollY = scrollY;
    };
  
    window.addEventListener('scroll', updateParallax);
  
    const achievements = document.querySelectorAll('.achievement-list li');
    achievements.forEach((achievement, index) => {
      achievement.style.opacity = '0';
      achievement.style.transform = 'translateX(-20px)';
      
      setTimeout(() => {
        achievement.style.transition = 'all 0.6s ease';
        achievement.style.opacity = '1';
        achievement.style.transform = 'translateX(0)';
      }, 300 * (index + 1));
    });
  
    const scheduleItems = document.querySelectorAll('.schedule-item');
    scheduleItems.forEach((item, index) => {
      item.classList.add('reveal-slide-right');
      setTimeout(() => {
        item.classList.add('active');
      }, 200 * (index + 1));
    });
  });