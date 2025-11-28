// Skills Progress Animation System

class SkillsProgress {
    constructor() {
        this.skills = [
            { name: 'HTML/CSS', level: 95 },
            { name: 'JavaScript', level: 88 },
            { name: 'React.js', level: 82 },
            { name: 'Vue.js', level: 78 },
            { name: 'Java', level: 85 },
            { name: 'PHP', level: 80 },
            { name: 'SQL', level: 83 },
            { name: 'Firebase/Supabase', level: 75 }
        ];
        
        this.init();
    }

    init() {
        this.createProgressBars();
        this.observeSkillsSection();
    }

    createProgressBars() {
        const skillsContainer = document.querySelector('.skills-container');
        if (!skillsContainer) return;

        // Replace the existing skill tags with progress bars
        const skillTagsContainer = skillsContainer.querySelector('.skill-tags');
        if (skillTagsContainer) {
            const progressContainer = document.createElement('div');
            progressContainer.className = 'skills-progress-container';
            
            this.skills.forEach((skill, index) => {
                const skillItem = document.createElement('div');
                skillItem.className = 'skill-progress-item';
                skillItem.innerHTML = `
                    <div class="skill-progress-header">
                        <span class="skill-name">${skill.name}</span>
                        <span class="skill-percentage">0%</span>
                    </div>
                    <div class="skill-progress-bar">
                        <div class="skill-progress-fill" data-level="${skill.level}" style="--animation-delay: ${index * 0.1}s"></div>
                    </div>
                `;
                progressContainer.appendChild(skillItem);
            });
            
            skillsContainer.appendChild(progressContainer);
        }
    }

    observeSkillsSection() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const skillsContainer = document.querySelector('.skills-progress-container');
        if (skillsContainer) {
            observer.observe(skillsContainer);
        }
    }

    animateSkills() {
        const progressFills = document.querySelectorAll('.skill-progress-fill');
        
        progressFills.forEach((fill, index) => {
            const level = parseInt(fill.getAttribute('data-level'));
            const percentageElement = fill.closest('.skill-progress-item').querySelector('.skill-percentage');
            
            setTimeout(() => {
                fill.style.width = `${level}%`;
                
                // Animate the percentage counter
                this.animateCounter(percentageElement, 0, level, 1000);
            }, index * 100);
        });
    }

    animateCounter(element, start, end, duration) {
        let current = start;
        const increment = (end - start) / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current) + '%';
            
            if (current >= end) {
                element.textContent = end + '%';
                clearInterval(timer);
            }
        }, 16);
    }
}

// Parallax Scroll Effect
class ParallaxEffect {
    constructor() {
        this.elements = [];
        this.init();
        this.bindEvents();
    }

    init() {
        // Add parallax to hero background elements
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            this.elements.push({
                element: heroSection,
                speed: 0.5
            });
        }

        // Add parallax to project images
        document.querySelectorAll('.project-img').forEach(img => {
            this.elements.push({
                element: img,
                speed: 0.2
            });
        });
    }

    bindEvents() {
        let ticking = false;

        const updateParallax = () => {
            const scrollTop = window.pageYOffset;
            
            this.elements.forEach(({ element, speed }) => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + scrollTop;
                const elementHeight = rect.height;
                const windowHeight = window.innerHeight;
                
                // Only apply parallax if element is in viewport
                if (rect.bottom >= 0 && rect.top <= windowHeight) {
                    const yPos = -(scrollTop - elementTop) * speed;
                    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
            });
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
        window.addEventListener('resize', () => {
            this.elements = [];
            this.init();
        });
    }
}

// Remove loading animation - not needed

// Text Animation Effects
class TextAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.addTextRevealAnimation();
        this.addLetterSpacing();
    }

    addTextRevealAnimation() {
        const sections = document.querySelectorAll('section h2, section h3');
        
        sections.forEach(heading => {
            const text = heading.textContent;
            heading.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.setProperty('--char-index', index);
                span.classList.add('char-animate');
                heading.appendChild(span);
            });
            
            heading.classList.add('text-reveal');
        });

        // Observe headings for animation trigger
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-text');
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.text-reveal').forEach(el => observer.observe(el));
    }

    addLetterSpacing() {
        // Add letter spacing animation to navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.letterSpacing = '2px';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.letterSpacing = 'normal';
            });
        });
    }
}

// Mouse Trail Effect
class MouseTrail {
    constructor() {
        this.trail = [];
        this.maxTrailLength = 20;
        this.init();
    }

    init() {
        this.createTrailElements();
        this.bindEvents();
    }

    createTrailElements() {
        for (let i = 0; i < this.maxTrailLength; i++) {
            const trailElement = document.createElement('div');
            trailElement.className = 'mouse-trail';
            trailElement.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--accent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.1s ease;
            `;
            document.body.appendChild(trailElement);
            this.trail.push(trailElement);
        }
    }

    bindEvents() {
        let mouseX = 0, mouseY = 0;
        let trailIndex = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const updateTrail = () => {
            const currentTrail = this.trail[trailIndex];
            
            currentTrail.style.left = mouseX + 'px';
            currentTrail.style.top = mouseY + 'px';
            currentTrail.style.opacity = '1';
            
            setTimeout(() => {
                currentTrail.style.opacity = '0';
            }, 100);
            
            trailIndex = (trailIndex + 1) % this.maxTrailLength;
        };

        setInterval(updateTrail, 50);
    }
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize effects immediately - no loading delay
    new SkillsProgress();
    new ParallaxEffect();
    new TextAnimations();
    new MouseTrail();
});