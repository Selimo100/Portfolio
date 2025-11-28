// Micro-interactions and Professional Touch

class MicroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.addButtonRippleEffect();
        this.addFormFieldAnimations();
        this.addImageHoverEffects();
        this.addTextHoverEffects();
        this.addScrollAnimations();
        this.addCursorEffects();
    }

    addButtonRippleEffect() {
        document.addEventListener('click', (e) => {
            const button = e.target.closest('.cta-btn, .project-link, button');
            if (!button) return;

            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            // Ensure button has relative positioning
            if (getComputedStyle(button).position === 'static') {
                button.style.position = 'relative';
            }
            button.style.overflow = 'hidden';
            
            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });

        // Add ripple keyframes
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to { transform: scale(2); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    addFormFieldAnimations() {
        document.querySelectorAll('.form-control').forEach(field => {
            const label = field.previousElementSibling;
            
            field.addEventListener('focus', () => {
                if (label) {
                    label.style.transform = 'translateY(-25px) scale(0.9)';
                    label.style.color = 'var(--accent)';
                }
            });

            field.addEventListener('blur', () => {
                if (label && !field.value) {
                    label.style.transform = 'translateY(0) scale(1)';
                    label.style.color = 'var(--text-secondary)';
                }
            });

            // Add floating placeholder effect
            field.addEventListener('input', () => {
                if (field.value) {
                    field.classList.add('has-value');
                } else {
                    field.classList.remove('has-value');
                }
            });
        });
    }

    addImageHoverEffects() {
        document.querySelectorAll('.profile-img, .project-img').forEach(img => {
            img.addEventListener('mouseenter', () => {
                img.style.filter = 'brightness(1.1) saturate(1.2)';
            });

            img.addEventListener('mouseleave', () => {
                img.style.filter = 'brightness(1) saturate(1)';
            });
        });
    }

    addTextHoverEffects() {
        // Add letter spacing animation to headings
        document.querySelectorAll('h1, h2, h3, .navbar-brand').forEach(heading => {
            const originalText = heading.textContent;
            
            heading.addEventListener('mouseenter', () => {
                if (!heading.classList.contains('animated-text')) {
                    heading.style.letterSpacing = '2px';
                }
            });

            heading.addEventListener('mouseleave', () => {
                if (!heading.classList.contains('animated-text')) {
                    heading.style.letterSpacing = 'normal';
                }
            });
        });
    }

    addScrollAnimations() {
        const elements = document.querySelectorAll('.skill-tag, .project-tags span, .social-link');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                }
            });
        }, observerOptions);

        elements.forEach(el => {
            el.classList.add('scroll-animate');
            observer.observe(el);
        });
    }

    addCursorEffects() {
        // Custom cursor for interactive elements
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = '<div class="cursor-dot"></div>';
        document.body.appendChild(cursor);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const updateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(updateCursor);
        };
        updateCursor();

        // Add hover effects for interactive elements
        document.querySelectorAll('a, button, .project-card, .skill-tag').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });

            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.fps = 0;
        this.lastTime = performance.now();
        this.frameCount = 0;
        this.init();
    }

    init() {
        this.createFPSCounter();
        this.monitorPerformance();
    }

    createFPSCounter() {
        const counter = document.createElement('div');
        counter.id = 'fps-counter';
        counter.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            display: none;
        `;
        document.body.appendChild(counter);
    }

    monitorPerformance() {
        const updateFPS = () => {
            this.frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - this.lastTime >= 1000) {
                this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
                
                const counter = document.getElementById('fps-counter');
                if (counter) {
                    counter.textContent = `FPS: ${this.fps}`;
                    
                    // Show counter if performance is poor
                    if (this.fps < 30) {
                        counter.style.display = 'block';
                        counter.style.background = 'rgba(255, 0, 0, 0.8)';
                    } else if (this.fps < 50) {
                        counter.style.display = 'block';
                        counter.style.background = 'rgba(255, 165, 0, 0.8)';
                    } else {
                        counter.style.display = 'none';
                    }
                }
                
                this.frameCount = 0;
                this.lastTime = currentTime;
            }
            
            requestAnimationFrame(updateFPS);
        };
        
        updateFPS();
    }
}

// Accessibility Enhancements
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.addKeyboardNavigation();
        this.addScreenReaderSupport();
        this.addFocusIndicators();
        this.addReducedMotionSupport();
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Enable keyboard navigation for custom elements
            if (e.key === 'Enter' || e.key === ' ') {
                const focusedElement = document.activeElement;
                
                if (focusedElement.classList.contains('indicator-dot')) {
                    e.preventDefault();
                    focusedElement.click();
                }
            }

            // Quick navigation shortcuts
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                        break;
                    case '2':
                        e.preventDefault();
                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                        break;
                    case '3':
                        e.preventDefault();
                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                        break;
                    case '4':
                        e.preventDefault();
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        break;
                }
            }
        });
    }

    addScreenReaderSupport() {
        // Add ARIA labels and descriptions
        document.querySelectorAll('.project-card').forEach((card, index) => {
            const title = card.querySelector('h3')?.textContent;
            card.setAttribute('role', 'article');
            card.setAttribute('aria-label', `Project ${index + 1}: ${title}`);
        });

        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.setAttribute('role', 'button');
            tag.setAttribute('aria-label', `Skill: ${tag.textContent}`);
        });

        document.querySelectorAll('.social-link').forEach(link => {
            const platform = link.querySelector('i').className.split('-').pop();
            link.setAttribute('aria-label', `Visit my ${platform} profile`);
        });
    }

    addFocusIndicators() {
        const style = document.createElement('style');
        style.textContent = `
            *:focus {
                outline: 2px solid var(--accent);
                outline-offset: 2px;
            }
            
            .project-card:focus {
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
        `;
        document.head.appendChild(style);
    }

    addReducedMotionSupport() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Wait for other scripts to load
    setTimeout(() => {
        new MicroInteractions();
        new PerformanceMonitor();
        new AccessibilityEnhancer();
    }, 1500);
});