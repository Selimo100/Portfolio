// 3D Card Effects and Enhanced Interactions

class Card3DEffect {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.project-card').forEach(card => {
            this.addCardEffect(card);
        });
    }

    addCardEffect(card) {
        let isHovering = false;
        
        card.addEventListener('mouseenter', () => {
            isHovering = true;
            card.style.transition = 'transform 0.1s ease';
        });

        card.addEventListener('mousemove', (e) => {
            if (!isHovering) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(10px)
                scale(1.02)
            `;
            
            // Add inner shadow effect
            const overlay = card.querySelector('.card-overlay') || this.createOverlay(card);
            const shadowX = (x - centerX) / centerX;
            const shadowY = (y - centerY) / centerY;
            
            overlay.style.background = `
                radial-gradient(circle at ${x}px ${y}px, 
                rgba(255,255,255,0.1) 0%, 
                transparent 70%)
            `;
        });

        card.addEventListener('mouseleave', () => {
            isHovering = false;
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
            
            const overlay = card.querySelector('.card-overlay');
            if (overlay) {
                overlay.style.background = 'transparent';
            }
        });
    }

    createOverlay(card) {
        const overlay = document.createElement('div');
        overlay.className = 'card-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            border-radius: 15px;
            z-index: 1;
        `;
        card.style.position = 'relative';
        card.appendChild(overlay);
        return overlay;
    }
}

// Smooth Scroll with Progress Indicator
class SmoothScrollIndicator {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        this.init();
    }

    init() {
        this.createSectionIndicators();
        this.bindScrollEvents();
        this.bindClickEvents();
    }

    createSectionIndicators() {
        const indicator = document.createElement('div');
        indicator.className = 'section-indicator';
        indicator.innerHTML = `
            <div class="indicator-line"></div>
            ${Array.from(this.sections).map((section, index) => `
                <div class="indicator-dot" data-section="${section.id}">
                    <span class="indicator-label">${section.id}</span>
                </div>
            `).join('')}
        `;
        document.body.appendChild(indicator);
    }

    bindScrollEvents() {
        const updateActiveSection = () => {
            const scrollTop = window.pageYOffset;
            let activeSection = '';
            
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                    activeSection = section.id;
                }
            });

            // Update navigation
            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${activeSection}`) {
                    link.classList.add('active');
                }
            });

            // Update indicators
            document.querySelectorAll('.indicator-dot').forEach(dot => {
                dot.classList.remove('active');
                if (dot.getAttribute('data-section') === activeSection) {
                    dot.classList.add('active');
                }
            });
        };

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateActiveSection();
                    ticking = false;
                });
                ticking = true;
            }
        });

        updateActiveSection(); // Initial call
    }

    bindClickEvents() {
        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.smoothScrollTo(targetId);
            });
        });

        // Indicator dots
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('indicator-dot')) {
                const targetId = e.target.getAttribute('data-section');
                this.smoothScrollTo(targetId);
            }
        });
    }

    smoothScrollTo(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Interactive Background Patterns
class InteractiveBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.patterns = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    setupCanvas() {
        this.canvas.id = 'interactive-bg';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -2;
            opacity: 0.3;
        `;
        document.body.appendChild(this.canvas);
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.createPatterns();
        this.bindMouseEvents();
        this.animate();
    }

    createPatterns() {
        const patternCount = Math.floor(this.canvas.width / 100);
        
        for (let i = 0; i < patternCount; i++) {
            this.patterns.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 50 + 20,
                speed: Math.random() * 0.5 + 0.1,
                angle: Math.random() * Math.PI * 2,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
    }

    bindMouseEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const isDark = !document.documentElement.hasAttribute('data-theme') || 
                      document.documentElement.getAttribute('data-theme') === 'dark';
        
        this.patterns.forEach(pattern => {
            // Update position
            pattern.x += Math.cos(pattern.angle) * pattern.speed;
            pattern.y += Math.sin(pattern.angle) * pattern.speed;
            
            // Wrap around screen
            if (pattern.x < 0) pattern.x = this.canvas.width;
            if (pattern.x > this.canvas.width) pattern.x = 0;
            if (pattern.y < 0) pattern.y = this.canvas.height;
            if (pattern.y > this.canvas.height) pattern.y = 0;
            
            // Mouse interaction
            const dx = this.mouse.x - pattern.x;
            const dy = this.mouse.y - pattern.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                pattern.x -= dx * force * 0.01;
                pattern.y -= dy * force * 0.01;
            }
            
            // Draw pattern
            this.ctx.save();
            this.ctx.translate(pattern.x, pattern.y);
            this.ctx.rotate(Date.now() * 0.001 + pattern.angle);
            
            this.ctx.strokeStyle = isDark 
                ? `rgba(100, 255, 218, ${pattern.opacity})` 
                : `rgba(13, 110, 253, ${pattern.opacity})`;
            this.ctx.lineWidth = 1;
            
            this.ctx.beginPath();
            this.ctx.rect(-pattern.size/2, -pattern.size/2, pattern.size, pattern.size);
            this.ctx.stroke();
            
            this.ctx.restore();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Voice Command Integration (experimental)
class VoiceCommands {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.init();
    }

    init() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.setupRecognition();
            this.createVoiceButton();
        }
    }

    setupRecognition() {
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase().trim();
            this.processCommand(command);
        };

        this.recognition.onerror = (event) => {
            console.log('Speech recognition error:', event.error);
        };
    }

    createVoiceButton() {
        const button = document.createElement('button');
        button.innerHTML = '<i class="bi bi-mic"></i>';
        button.className = 'voice-command-btn';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--accent);
            color: var(--navy);
            border: none;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        `;

        button.addEventListener('click', () => this.toggleListening());
        document.body.appendChild(button);
    }

    toggleListening() {
        if (this.isListening) {
            this.recognition.stop();
            this.isListening = false;
        } else {
            this.recognition.start();
            this.isListening = true;
        }
    }

    processCommand(command) {
        const commands = {
            'go to home': () => this.scrollToSection('home'),
            'go to about': () => this.scrollToSection('about'),
            'go to projects': () => this.scrollToSection('projects'),
            'go to contact': () => this.scrollToSection('contact'),
            'toggle theme': () => document.querySelector('.theme-toggle-btn')?.click(),
            'open arcade': () => window.open('assets/arcade/arcade.html', '_blank')
        };

        for (const [commandText, action] of Object.entries(commands)) {
            if (command.includes(commandText)) {
                action();
                break;
            }
        }
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        new Card3DEffect();
        new SmoothScrollIndicator();
        new InteractiveBackground();
        new VoiceCommands();
    }, 1000);
});