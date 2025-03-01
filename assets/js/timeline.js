document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const revealTimeline = () => {
      timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 100) {
          item.classList.add('active');
        }
      });
    };
  
    // Initial check
    revealTimeline();
    
    // Check on scroll
    window.addEventListener('scroll', revealTimeline);
  });