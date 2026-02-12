// ================================
// GLOBAL VARIABLES
// ================================
let currentLang = 'en';
let isMobile = false;

// ================================
// INITIALIZATION
// ================================
document.addEventListener('DOMContentLoaded', () => {
    checkIfMobile();
    initializeLoading();
    initializeParticles();
    initializeGeometricShapes();
    initializeThemeToggle();
    initializeLanguageToggle();
    initializeMobileMenu();
    initializeTypingEffect();
    initializeScrollAnimations();
    initialize3DHover();
    initializeContactAnimations();
    initializeMiniPortfolio();
    initializeActiveNavLink();
});

// Detect Mobile
function checkIfMobile() {
    isMobile = window.innerWidth <= 768;
    return isMobile;
}

// Handle window resize
window.addEventListener('resize', () => {
    checkIfMobile();
});

// ================================
// LOADING SCREEN
// ================================
function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercentage = document.querySelector('.loading-percentage');

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }
        loadingProgress.style.width = progress + '%';
        loadingPercentage.textContent = Math.floor(progress) + '%';
    }, 150);
}

// ================================
// MOBILE MENU
// ================================
function initializeMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.mobile-menu');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ================================
// THEME TOGGLE
// ================================
function initializeThemeToggle() {
    const toggles = document.querySelectorAll('.theme-toggle, .theme-toggle-mobile');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    });
}

// ================================
// LANGUAGE TOGGLE
// ================================
function initializeLanguageToggle() {
    const toggles = document.querySelectorAll('.lang-toggle, .lang-toggle-mobile');
    const savedLang = localStorage.getItem('language') || 'en';
    currentLang = savedLang;
    updateLanguage();

    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'ar' : 'en';
            localStorage.setItem('language', currentLang);
            updateLanguage();
        });
    });
}

function updateLanguage() {
    const html = document.documentElement;
    const langTexts = document.querySelectorAll('.lang-text, .lang-toggle-mobile');

    html.setAttribute('lang', currentLang);
    html.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    
    langTexts.forEach(el => {
        el.textContent = currentLang.toUpperCase();
    });

    document.querySelectorAll('[data-en]').forEach(element => {
        const text = element.getAttribute('data-' + currentLang);
        if (text) element.textContent = text;
    });
}

// ================================
// SCROLL ANIMATIONS
// ================================
function initializeScrollAnimations() {
    // Add reveal class to elements we want to animate
    const animateSelectors = [
        '.section-header',
        '.hero-content',
        '.feature-card',
        '.skill-item',
        '.timeline-item',
        '.project-card',
        '.contact-badge',
        '.contact-info',
        '.contact-illustration'
    ];

    animateSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal');
        });
    });

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// ================================
// ACTIVE NAV LINK ON SCROLL
// ================================
function initializeActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// ================================
// TYPING EFFECT
// ================================
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const texts = {
        en: ['Web & Mobile Apps Developer', 'Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver'],
        ar: ['مطور تطبيقات ويب وجوال', 'مطور متكامل', 'مهتم بتجربة المستخدم', 'حلال المشاكل']
    };

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTexts = texts[currentLang];
        const currentText = currentTexts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % currentTexts.length;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// ================================
// PARTICLES BACKGROUND
// ================================
function initializeParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ================================
// GEOMETRIC SHAPES
// ================================
function initializeGeometricShapes() {
    const container = document.querySelector('.geometric-shapes');
    if (!container) return;
    const shapes = [
        { type: 'circle', size: 150, color: 'rgba(99, 102, 241, 0.03)' },
        { type: 'triangle', size: 200, color: 'rgba(139, 92, 246, 0.03)' },
        { type: 'square', size: 180, color: 'rgba(236, 72, 153, 0.03)' }
    ];

    shapes.forEach((shape, index) => {
        const element = document.createElement('div');
        element.style.position = 'absolute';
        element.style.width = shape.size + 'px';
        element.style.height = shape.size + 'px';
        if (shape.type === 'circle') {
            element.style.borderRadius = '50%';
            element.style.background = shape.color;
        } else if (shape.type === 'triangle') {
            element.style.width = '0'; element.style.height = '0';
            element.style.borderLeft = shape.size / 2 + 'px solid transparent';
            element.style.borderRight = shape.size / 2 + 'px solid transparent';
            element.style.borderBottom = shape.size + 'px solid ' + shape.color;
        } else {
            element.style.background = shape.color;
            element.style.transform = 'rotate(45deg)';
        }
        element.style.top = Math.random() * 100 + '%';
        element.style.left = Math.random() * 100 + '%';
        element.style.animation = `float ${8 + index * 2}s ease-in-out infinite`;
        container.appendChild(element);
    });
}

// ================================
// 3D PERSPECTIVE HOVER EFFECT
// ================================
function initialize3DHover() {
    const cards = document.querySelectorAll('.project-card, .skill-item, .contact-badge');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 10;
            const rotateY = (x - centerX) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            
            // Handle glow effect for skill items
            if (card.classList.contains('skill-item')) {
                const glow = card.querySelector('::before');
                // Note: CSS pseudo-elements can't be manipulated directly via JS style, 
                // but we can use CSS variables if needed. For now, the CSS handles the basic glow.
            }
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ================================
// CONTACT ANIMATIONS
// ================================
function initializeContactAnimations() {
    const badges = document.querySelectorAll('.contact-badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            const icon = badge.querySelector('.badge-icon');
            if (icon) icon.style.transform = 'scale(1.1) rotate(10deg)';
        });
        badge.addEventListener('mouseleave', () => {
            const icon = badge.querySelector('.badge-icon');
            if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// ================================
// MINI PORTFOLIO
// ================================
function initializeMiniPortfolio() {
    const iphoneFrame = document.querySelector('.iphone-frame');
    if (!iphoneFrame) return;
    iphoneFrame.addEventListener('mousemove', (e) => {
        const rect = iphoneFrame.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = (x - centerX) / 20;
        const rotateX = (centerY - y) / 20;
        iphoneFrame.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });
    iphoneFrame.addEventListener('mouseleave', () => {
        iphoneFrame.style.transform = 'rotateY(-15deg) rotateX(5deg)';
    });
}
