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
    addBgOrbs();
    injectBrandIcons();
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
    if (!isMobile) {
        initializeCustomCursor();
        initializeMouseGlow();
    }
});

// Detect Mobile
function checkIfMobile() {
    isMobile = window.innerWidth <= 768;
    return isMobile;
}
window.addEventListener('resize', () => { checkIfMobile(); });

// ================================
// ADD BG ORBS (much.cards style)
// ================================
function addBgOrbs() {
    const bgEffects = document.querySelector('.bg-effects');
    if (!bgEffects) return;
    ['bg-orb bg-orb-1', 'bg-orb bg-orb-2', 'bg-orb bg-orb-3'].forEach(cls => {
        const orb = document.createElement('div');
        orb.className = cls;
        bgEffects.appendChild(orb);
    });
    const mouseGlow = document.createElement('div');
    mouseGlow.id = 'mouse-glow';
    document.body.appendChild(mouseGlow);
}

// ================================
// MOUSE GLOW (much.cards style)
// ================================
function initializeMouseGlow() {
    const glow = document.getElementById('mouse-glow');
    if (!glow) return;
    let glowX = 0, glowY = 0, targetX = window.innerWidth / 2, targetY = window.innerHeight / 2;
    document.addEventListener('mousemove', (e) => { targetX = e.clientX; targetY = e.clientY; });
    (function animateGlow() {
        glowX += (targetX - glowX) * 0.08;
        glowY += (targetY - glowY) * 0.08;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    })();
}

// ================================
// CUSTOM CURSOR (much.cards style)
// ================================
function initializeCustomCursor() {
    const dot = document.createElement('div');
    dot.id = 'cursor-dot';
    const ring = document.createElement('div');
    ring.id = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let ringX = 0, ringY = 0, mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;

    // Trail dots
    const TRAIL_COUNT = 8;
    const trailDots = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
        const t = document.createElement('div');
        const size = Math.max(1, 4 - i * 0.4);
        const alpha = Math.max(0.05, 0.4 - i * 0.045);
        t.style.cssText = `width:${size}px;height:${size}px;background:rgba(61,191,174,${alpha});border-radius:50%;position:fixed;pointer-events:none;z-index:99997;transform:translate(-50%,-50%)`;
        document.body.appendChild(t);
        trailDots.push({ el: t, x: mouseX, y: mouseY });
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    // Hover states — re-query after DOM settles
    setTimeout(() => {
        document.querySelectorAll('a, button, .skill-item, .feature-card, .contact-badge, .social-link, .nav-link, .mobile-nav-link').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }, 500);

    (function animateCursor() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';

        let prevX = mouseX, prevY = mouseY;
        trailDots.forEach((td) => {
            td.x += (prevX - td.x) * 0.22;
            td.y += (prevY - td.y) * 0.22;
            td.el.style.left = td.x + 'px';
            td.el.style.top = td.y + 'px';
            prevX = td.x;
            prevY = td.y;
        });
        requestAnimationFrame(animateCursor);
    })();
}

// ================================
// INJECT REAL BRAND ICONS (SVG)
// ================================
function injectBrandIcons() {
    const S = 'width:2.5rem;height:2.5rem;flex-shrink:0;display:block';
    const brandIcons = {
        'Next.js': `<svg style="${S}" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="nmask" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180"><circle cx="90" cy="90" r="90" fill="black"/></mask><g mask="url(#nmask)"><circle cx="90" cy="90" r="90" fill="black"/><path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#ng0)"/><rect x="115" y="54" width="12" height="72" fill="url(#ng1)"/></g><defs><linearGradient id="ng0" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><linearGradient id="ng1" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></svg>`,

        'React.js': `<svg style="${S}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2.139" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="1.05" fill="none"><ellipse cx="12" cy="12" rx="10.5" ry="4"/><ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(120 12 12)"/></g></svg>`,

        'React Native': `<svg style="${S}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2.139" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="1.05" fill="none"><ellipse cx="12" cy="12" rx="10.5" ry="4"/><ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(120 12 12)"/></g></svg>`,

        'TypeScript / JavaScript': `<svg style="${S}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="2.5" fill="#3178C6"/><path d="M6.5 11.5H9.5M8 11.5V17.5" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 14.5C13 14.5 13.6 17 16.2 17C17.8 17 18.8 16 18.8 15C18.8 12.5 13 13 13 10.5C13 9 14.5 8 16.2 8C18.3 8 18.8 9.5 18.8 9.5" stroke="white" stroke-width="1.7" stroke-linecap="round"/></svg>`,

        'Tailwind Css': `<svg style="${S}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#38BDF8" d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.684.182 1.173.676 1.704 1.22C13.224 10.344 14.234 11.4 16.5 11.4c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.688-.182-1.176-.676-1.706-1.216C15.276 7.056 14.264 6 12 6zM7.5 11.4C5.1 11.4 3.6 12.6 3 15c.9-1.2 1.95-1.65 3.15-1.35.684.182 1.173.676 1.704 1.22C8.724 15.744 9.734 16.8 12 16.8c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.688-.182-1.176-.676-1.706-1.216C10.776 12.456 9.764 11.4 7.5 11.4z"/></svg>`,

        'Material UI (MUI)': `<svg style="${S}" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 24V8l9-5.196v5.196L4.5 10.5v8L9 21l4.5-2.598V13.5L18 10.902V21L9 26.196 0 24Z" fill="#0081CB"/><path d="M18 10.902V21l4.5 2.598V18L27 21l4.5-2.598V8L27 5.402 22.5 8 18 5.402 13.5 8v5.5L18 10.902Z" fill="#0081CB" opacity=".8"/><path d="M27 21l4.5-2.598V8L27 5.402V21Z" fill="#0081CB" opacity=".6"/><path d="M9 26.196L18 32l9-5.196v-5.206L18 26.8l-9-5.206V26.196Z" fill="#0081CB" opacity=".4"/></svg>`,

        'MongoDB': `<svg style="${S}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c0 0-5.5 7-5.5 12 0 3.038 2.462 5.5 5.5 5.5s5.5-2.462 5.5-5.5C17.5 9 12 2 12 2z" fill="#47A248"/><path d="M12 19.5V22" stroke="#47A248" stroke-width="1.5" stroke-linecap="round"/><path d="M12 2c0 0 .6 7 1.7 9.8 .85 2.2 2.2 2.7 3.8 2.7" stroke="#B8F0B0" stroke-width="0.85" fill="none" stroke-linecap="round" opacity="0.85"/></svg>`,

        'Firebase': `<svg style="${S}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 19.5l.56-6.57L9 7l1.06 3.13L13.06 4.5l5.44 15H5.5z" fill="#FFC400"/><path d="M5.5 19.5L9 7l4 6.5-7.5 6z" fill="#F57C00"/><path d="M13.06 4.5L18.5 19.5 13.06 13V4.5z" fill="#FFCA28"/><path d="M13.06 4.5L13.06 13 9 7l4.06-2.5z" fill="#F4511E"/></svg>`,

        'WordPress': `<svg style="${S}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9.5" stroke="#21759B" stroke-width="1.4" fill="none"/><circle cx="12" cy="12" r="2.5" fill="#21759B"/><path d="M12 4.5V8.5M12 15.5V19.5M4.5 12H8.5M15.5 12H19.5" stroke="#21759B" stroke-width="1.3" stroke-linecap="round"/><path d="M7 7l3.5 3.5M13.5 13.5L17 17M17 7l-3.5 3.5M10.5 13.5L7 17" stroke="#21759B" stroke-width="1" stroke-linecap="round" opacity="0.6"/></svg>`,

        'Laravel Blade': `<svg style="${S}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 21L12 3l9 18H3z" fill="none" stroke="#FF2D20" stroke-width="1.5" stroke-linejoin="round"/><path d="M6.9 18L12 8l5.1 10H6.9z" fill="#FF2D20" opacity="0.55"/><circle cx="12" cy="15.5" r="1.5" fill="#FF2D20"/></svg>`
    };

    document.querySelectorAll('.skill-item').forEach(item => {
        const label = item.querySelector('span');
        if (!label) return;
        const skillName = label.textContent.trim();
        if (brandIcons[skillName]) {
            const icon = item.querySelector('i');
            if (icon) {
                const tmp = document.createElement('div');
                tmp.innerHTML = brandIcons[skillName];
                icon.replaceWith(tmp.firstElementChild);
            }
        }
    });
}

// ================================
// LOADING SCREEN
// ================================
function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercentage = document.querySelector('.loading-percentage');
    if (!loadingScreen) return;

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => { loadingScreen.style.display = 'none'; }, 500);
            }, 500);
        }
        if (loadingProgress) loadingProgress.style.width = progress + '%';
        if (loadingPercentage) loadingPercentage.textContent = Math.floor(progress) + '%';
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
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
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
    currentLang = localStorage.getItem('language') || 'en';
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
    html.setAttribute('lang', currentLang);
    html.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    document.querySelectorAll('.lang-text, .lang-toggle-mobile').forEach(el => {
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
    const animateSelectors = [
        '.section-header', '.hero-content', '.feature-card', '.skill-item',
        '.timeline-item', '.project-card', '.contact-badge', '.contact-info', '.contact-illustration'
    ];
    animateSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.classList.add('reveal'));
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
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
            if (pageYOffset >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) link.classList.add('active');
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
        en: ['Web & Mobile Apps Developer', 'UI/UX Enthusiast', 'Problem Solver'],
        ar: ['مطور تطبيقات ويب وجوال', 'مهتم بتجربة المستخدم', 'حلال المشاكل']
    };

    let textIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 100;

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

        if (!isDeleting && charIndex === currentText.length) { isDeleting = true; typingSpeed = 2000; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; textIndex = (textIndex + 1) % currentTexts.length; }

        setTimeout(type, typingSpeed);
    }
    type();
}

// ================================
// PARTICLES BACKGROUND (green)
// ================================
function initializeParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;
    const greenColors = [
        '42, 157, 143',
        '61, 191, 174',
        '27, 79, 114',
        '128, 232, 220',
        '46, 134, 193'
    ];

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = greenColors[Math.floor(Math.random() * greenColors.length)];
            this.glow = Math.random() > 0.8;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        draw() {
            if (this.glow) {
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
                gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`);
                gradient.addColorStop(1, `rgba(${this.color}, 0)`);
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.strokeStyle = `rgba(61, 191, 174, ${(1 - dist / 120) * 0.07})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawConnections();
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
        { type: 'circle', size: 150, color: 'rgba(42, 157, 143, 0.03)' },
        { type: 'triangle', size: 200, color: 'rgba(61, 191, 174, 0.03)' },
        { type: 'square', size: 180, color: 'rgba(74, 222, 128, 0.025)' }
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
            element.style.width = '0';
            element.style.height = '0';
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