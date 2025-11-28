// Enhanced Animations and Interactive Effects

// Typing Animation for Hero Section
class TypeWriter {
    constructor(element, texts, speed = 100, deleteSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.deleteSpeed = deleteSpeed;
        this.pauseTime = pauseTime;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isWaiting = false;
    }

    start() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isWaiting) {
            setTimeout(() => {
                this.isWaiting = false;
                this.isDeleting = true;
                this.type();
            }, this.pauseTime);
            return;
        }

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
            
            if (this.charIndex === 0) {
                this.isDeleting = false;
                this.textIndex = (this.textIndex + 1) % this.texts.length;
            }
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
            
            if (this.charIndex === currentText.length) {
                this.isWaiting = true;
            }
        }

        const speed = this.isDeleting ? this.deleteSpeed : this.speed;
        setTimeout(() => this.type(), speed);
    }
}

// Particle Background Effect
class ParticleBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mousePosition = { x: 0, y: 0 };
        this.animationId = null;
        
        this.init();
        this.bindEvents();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Get current theme
        const isDarkTheme = !document.documentElement.hasAttribute('data-theme') || 
                          document.documentElement.getAttribute('data-theme') === 'dark';
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = isDarkTheme 
                ? `rgba(100, 255, 218, ${particle.opacity})` 
                : `rgba(13, 110, 253, ${particle.opacity})`;
            this.ctx.fill();
            
            // Draw connections
            this.particles.forEach((otherParticle, otherIndex) => {
                if (index !== otherIndex) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        const opacity = (100 - distance) / 100 * 0.2;
                        this.ctx.strokeStyle = isDarkTheme 
                            ? `rgba(100, 255, 218, ${opacity})` 
                            : `rgba(13, 110, 253, ${opacity})`;
                        this.ctx.stroke();
                    }
                }
            });
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.particles = [];
            this.createParticles();
        });

        this.canvas.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
            
            // Add mouse interaction effect
            this.particles.forEach(particle => {
                const dx = particle.x - this.mousePosition.x;
                const dy = particle.y - this.mousePosition.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    particle.vx += dx * force * 0.01;
                    particle.vy += dy * force * 0.01;
                }
            });
        });
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Scroll Progress Indicator
class ScrollProgress {
    constructor() {
        this.createProgressBar();
        this.bindEvents();
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress-fill"></div>';
        document.body.appendChild(progressBar);
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            
            const progressFill = document.querySelector('.scroll-progress-fill');
            if (progressFill) {
                progressFill.style.width = `${scrollPercentage}%`;
            }
        });
    }
}

// Enhanced Intersection Observer for Complex Animations
class EnhancedObserver {
    constructor() {
        this.observerOptions = {
            threshold: [0, 0.25, 0.5, 0.75, 1],
            rootMargin: '-50px'
        };
        
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.observerOptions
        );
        
        this.init();
    }

    init() {
        // Observe sections for fade-in animations
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('animate-on-scroll');
            this.observer.observe(section);
        });

        // Observe project cards for staggered animations
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.setProperty('--animation-delay', `${index * 0.1}s`);
            card.classList.add('animate-project-card');
            this.observer.observe(card);
        });

        // Observe skill tags for wave animation
        document.querySelectorAll('.skill-tag').forEach((tag, index) => {
            tag.style.setProperty('--animation-delay', `${index * 0.05}s`);
            tag.classList.add('animate-skill-tag');
            this.observer.observe(tag);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const ratio = entry.intersectionRatio;
                
                if (entry.target.classList.contains('animate-on-scroll')) {
                    entry.target.style.setProperty('--scroll-progress', ratio);
                    
                    if (ratio > 0.25) {
                        entry.target.classList.add('is-visible');
                    }
                }
                
                if (entry.target.classList.contains('animate-project-card') && ratio > 0.3) {
                    entry.target.classList.add('is-visible');
                }
                
                if (entry.target.classList.contains('animate-skill-tag') && ratio > 0.5) {
                    entry.target.classList.add('is-visible');
                }
            }
        });
    }
}

// Magnetic Button Effect
class MagneticEffect {
    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        document.querySelectorAll('.cta-btn, .project-link').forEach(button => {
            button.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
            button.addEventListener('mousemove', this.handleMouseMove.bind(this));
            button.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        });
    }

    handleMouseEnter(e) {
        e.target.style.transition = 'transform 0.3s ease';
    }

    handleMouseMove(e) {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const intensity = 0.3;
        e.target.style.transform = `translate(${x * intensity}px, ${y * intensity}px) scale(1.05)`;
    }

    handleMouseLeave(e) {
        e.target.style.transition = 'transform 0.5s ease';
        e.target.style.transform = 'translate(0, 0) scale(1)';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add canvas for particle background
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.6;
    `;
    document.body.appendChild(canvas);

    // Initialize typing animation for title
    const titleElement = document.querySelector('.hero-section .title');
    if (titleElement) {
        const originalText = titleElement.textContent;
        titleElement.textContent = '';
        
        const typeWriter = new TypeWriter(titleElement, [
            "I'm a student and web developer.",
            "I create digital experiences.",
            "I build modern web solutions.",
            "I love clean, efficient code."
        ], 80, 40, 1500);
        
        setTimeout(() => typeWriter.start(), 1000);
    }

    // Initialize particle background
    const particleBackground = new ParticleBackground('particle-canvas');
    
    // Initialize scroll progress
    new ScrollProgress();
    
    // Initialize enhanced observer
    new EnhancedObserver();
    
    // Initialize magnetic effects
    new MagneticEffect();

    // Add floating elements animation
    const addFloatingElements = () => {
        for (let i = 0; i < 6; i++) {
            const floatingElement = document.createElement('div');
            floatingElement.className = 'floating-element';
            floatingElement.style.cssText = `
                position: fixed;
                width: ${Math.random() * 100 + 50}px;
                height: ${Math.random() * 100 + 50}px;
                background: linear-gradient(45deg, var(--accent), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                opacity: 0.1;
                animation: float ${Math.random() * 10 + 10}s infinite linear;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
            `;
            document.body.appendChild(floatingElement);
        }
    };
    
    addFloatingElements();
});