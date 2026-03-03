// Custom cursor implementation
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');
        this.mouseX = 0;
        this.mouseY = 0;
        this.followerX = 0;
        this.followerY = 0;
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            this.cursor.style.left = this.mouseX + 'px';
            this.cursor.style.top = this.mouseY + 'px';
        });
        
        this.animateFollower();
        
        // Ultra-Premium hover effects
        const hoverElements = document.querySelectorAll('a, button, .skill-card, .education-item, .experience-item, .language-item, .liquid-glass');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(2)';
                this.cursor.style.background = 'var(--gradient-accent)';
                this.follower.style.transform = 'scale(2)';
                this.follower.style.borderColor = 'var(--accent-color)';
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursor.style.background = 'var(--gradient-cyber)';
                this.follower.style.transform = 'scale(1)';
                this.follower.style.borderColor = 'transparent';
            });
        });
    }
    
    animateFollower() {
        this.followerX += (this.mouseX - this.followerX) * 0.1;
        this.followerY += (this.mouseY - this.followerY) * 0.1;
        
        this.follower.style.left = this.followerX + 'px';
        this.follower.style.top = this.followerY + 'px';
        
        requestAnimationFrame(() => this.animateFollower());
    }
}

// Navigation functionality
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.sections = document.querySelectorAll('section');
        
        this.init();
    }
    
    init() {
        this.setupScrollSpy();
        this.setupSmoothScroll();
        this.setupMobileMenu();
        this.setupScrollEffects();
    }
    
    setupScrollSpy() {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetId = entry.target.id;
                    this.updateActiveLink(targetId);
                }
            });
        }, observerOptions);
        
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    updateActiveLink(activeId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }
    
    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                this.navMenu.classList.remove('active');
                this.hamburger.classList.remove('active');
            });
        });
    }
    
    setupMobileMenu() {
        this.hamburger.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.navMenu.classList.remove('active');
                this.hamburger.classList.remove('active');
            }
        });
    }
    
    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// Typewriter effect for hero section
class TypewriterEffect {
    constructor() {
        this.textElement = document.querySelector('.typewriter-text');
        this.texts = [
            'BCA Student',
            'Future Developer', 
            'Team Leader',
            'Hardware Enthusiast',
            'Creative Problem Solver'
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseTime = 2000;
        
        this.init();
    }
    
    init() {
        setTimeout(() => {
            this.type();
        }, 1000);
    }
    
    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.textElement.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.textElement.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }
        
        let typeSpeedVar = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        
        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeedVar = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        }
        
        setTimeout(() => this.type(), typeSpeedVar);
    }
}

class EnhancedScrollEffects {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupParallaxEffect();
        this.setupScrollAnimations();
        this.setupNavbarScroll();
        this.setupFloatingElements();
    }
    
    setupParallaxEffect() {
        const heroBackground = document.querySelector('.hero-background');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Special handling for skill cards to create wave effect
                    if (entry.target.classList.contains('skills-category')) {
                        const skillCards = entry.target.querySelectorAll('.skill-card');
                        skillCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animate-in');
                            }, index * 150);
                        });
                    }
                }
            });
        }, observerOptions);
        
        // Observe sections and key elements
        const elements = document.querySelectorAll('.section-header, .education-item, .experience-category, .skills-category, .contact-method, .hero-description, .hero-buttons, .social-links, .contact-form, .resume-btn, .education-timeline, .experience-grid');
        elements.forEach(el => {
            observer.observe(el);
        });
        
        // Observe individual skill cards and language items for direct animation
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            observer.observe(card);
        });
        
        const languageItems = document.querySelectorAll('.language-item');
        languageItems.forEach(item => {
            observer.observe(item);
        });
        
        // Observe social links individually
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            observer.observe(link);
        });
        
        // Observe form groups individually
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            observer.observe(group);
        });
        
        // Observe buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            observer.observe(btn);
        });
    }
    
    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            if (scrolled > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    setupFloatingElements() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            skillCards.forEach((card, index) => {
                const rate = scrolled * 0.05 * (index % 2 === 0 ? 1 : -1);
                card.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// Project card 3D tilt effect
class ProjectTilt {
    constructor() {
        this.cards = document.querySelectorAll('[data-tilt]');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
        });
    }
    
    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    }
    
    handleMouseLeave(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
}

// Skills animation
class SkillsAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-bar');
        this.skillsSection = document.querySelector('#skills');
        this.animated = false;
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateSkills();
                    this.animated = true;
                }
            });
        }, { threshold: 0.5 });
        
        if (this.skillsSection) {
            observer.observe(this.skillsSection);
        }
    }
    
    animateSkills() {
        this.skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const level = bar.getAttribute('data-level');
                bar.style.width = level + '%';
            }, index * 200);
        });
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.fade-in-up, .project-card, .skill-card, .about-stats');
        this.init();
    }
    
    init() {
        // Add fade-in-up class to elements
        this.animatedElements.forEach(el => {
            if (!el.classList.contains('fade-in-up')) {
                el.classList.add('fade-in-up');
            }
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// Contact form handling
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }
    
    handleSubmit() {
        // Simulate form submission
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                this.form.reset();
            }, 3000);
        }, 2000);
    }
}

// Parallax effect
class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('.fire-particles');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            this.elements.forEach(el => {
                const rate = scrolled * -0.5;
                el.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Lazy loading for images
        this.setupLazyLoading();
        
        // Throttle scroll events
        this.throttleScrollEvents();
        
        // Preload critical resources
        this.preloadResources();
    }
    
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    throttleScrollEvents() {
        let ticking = false;
        
        function updateScrollElements() {
            // Update scroll-dependent elements
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollElements);
                ticking = true;
            }
        });
    }
    
    preloadResources() {
        // Preload fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.as = 'font';
        fontLink.type = 'font/woff2';
        fontLink.crossOrigin = 'anonymous';
        document.head.appendChild(fontLink);
    }
}

// Main application initialization
class PortfolioApp {
    constructor() {
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initComponents());
        } else {
            this.initComponents();
        }
    }
    
    initComponents() {
        try {
            // Initialize all components
            new CustomCursor();
            new Navigation();
            new TypewriterEffect();
            new EnhancedScrollEffects();
            new ProjectTilt();
            new SkillsAnimation();
            new ScrollAnimations();
            new ContactForm();
            new ParallaxEffect();
            new PerformanceOptimizer();
            
            // Add smooth scrolling to all internal links
            this.setupSmoothScrolling();
            
            // Setup resize handler
            this.setupResizeHandler();
            
            console.log('Portfolio application initialized successfully!');
            
        } catch (error) {
            console.error('Error initializing portfolio application:', error);
        }
    }
    
    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Handle resize events
                this.handleResize();
            }, 250);
        });
    }
    
    handleResize() {
        // Recalculate positions and dimensions on resize
        const isMobile = window.innerWidth <= 768;
        document.body.classList.toggle('mobile', isMobile);
    }
}

// Start the application
const portfolioApp = new PortfolioApp();

// Service Worker registration for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Activate special effects
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        konamiCode = [];
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);
