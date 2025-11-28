document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    let ticking = false;
    
    const revealTimeline = () => {
      const windowHeight = window.innerHeight;
      
      timelineItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const triggerPoint = windowHeight * 0.85;
        
        if (itemTop < triggerPoint) {
          // Add staggered delay for smoother animation
          setTimeout(() => {
            item.classList.add('active');
          }, index * 50);
        }
      });
    };
  
    // Throttled scroll handler for better performance
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          revealTimeline();
          ticking = false;
        });
        ticking = true;
      }
    };
  
    // Initial reveal with slight delay for page load
    setTimeout(revealTimeline, 100);
    
    window.addEventListener('scroll', onScroll, { passive: true });
  });