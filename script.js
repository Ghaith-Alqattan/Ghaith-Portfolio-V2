/* ================================================================
   GHAITH AL-QATTAN PORTFOLIO — script.js
   ================================================================ */

// ── State ──────────────────────────────────────────────────────
let isMobile = window.innerWidth <= 768;
window.addEventListener('resize', () => { isMobile = window.innerWidth <= 768; });

// ── Init ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initLoading();
    initTheme();
    initNavbar();
    initMobileMenu();
    initTyping();
    initReveal();
    initSkillBars();
    injectBrandIcons();
    initParticles();
    initMouseGlow();
    initIphoneTime();
    initProjectCube();
    initContactHover();
});

/* ================================================================
   LOADING SCREEN — 3D Cube Color Fill
   ================================================================ */
function initLoading() {
    const screen = document.getElementById('loading-screen');
    const bar = document.getElementById('loading-bar-fill');
    const pct = document.getElementById('loading-pct');
    const faces = document.querySelectorAll('.lc-face');
    if (!screen) return;

    let progress = 0;
    const total = faces.length; // 6 faces

    const tick = setInterval(() => {
        // Slightly random increment
        const inc = Math.random() * 12 + 3;
        progress = Math.min(100, progress + inc);

        // Update bar and percentage
        if (bar) bar.style.width = progress + '%';
        if (pct) pct.textContent = Math.floor(progress) + '%';

        // Fill faces progressively
        faces.forEach((face, i) => {
            const threshold = (i + 1) * (100 / total);
            if (progress >= threshold) face.classList.add('filled');
        });

        if (progress >= 100) {
            clearInterval(tick);
            setTimeout(() => {
                screen.classList.add('fade-out');
                screen.addEventListener('transitionend', () => {
                    screen.style.display = 'none';
                }, { once: true });
            }, 600);
        }
    }, 140);
}

/* ================================================================
   THEME TOGGLE
   ================================================================ */
function initTheme() {
    const html = document.documentElement;
    const btn = document.getElementById('theme-toggle');
    const saved = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', saved);
    if (!btn) return;

    btn.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

/* ================================================================
   ISLAND NAVBAR
   ================================================================ */
function initNavbar() {
    const nav = document.getElementById('navbar');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        // Squeeze on scroll
        if (window.scrollY > 60) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');

        // Active link highlight
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
        });
        links.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === '#' + current);
        });
    }, { passive: true });

    // Smooth scroll for nav links
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

/* ================================================================
   MOBILE MENU — Accordion inside island navbar
   ================================================================ */
function initMobileMenu() {
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('mobile-menu');
    const island = document.querySelector('.nav-island');
    const links = document.querySelectorAll('.mobile-link');
    if (!btn || !menu) return;

    function open() {
        btn.classList.add('active');
        menu.classList.add('active');
        island?.classList.add('menu-open');
        document.body.classList.add('scroll-locked');
    }
    function close() {
        btn.classList.remove('active');
        menu.classList.remove('active');
        island?.classList.remove('menu-open');
        document.body.classList.remove('scroll-locked');
    }

    btn.addEventListener('click', () => menu.classList.contains('active') ? close() : open());
    links.forEach(l => {
        l.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(l.getAttribute('href'));
            close();
            setTimeout(() => target?.scrollIntoView({ behavior: 'smooth' }), 300);
        });
    });
}

/* ================================================================
   TYPING EFFECT
   ================================================================ */
function initTyping() {
    const el = document.querySelector('.typing-text');
    if (!el) return;

    const texts = [
        'Front-end Developer',
        'React.js Specialist',
        'Next.js Developer',
        'FE Supervisor & Trainer',
        'UI/UX Enthusiast'
    ];

    let i = 0, ci = 0, deleting = false, speed = 100;

    function type() {
        const cur = texts[i];
        if (!deleting) {
            el.textContent = cur.substring(0, ci + 1);
            ci++;
            speed = 100;
            if (ci === cur.length) { deleting = true; speed = 2200; }
        } else {
            el.textContent = cur.substring(0, ci - 1);
            ci--;
            speed = 50;
            if (ci === 0) { deleting = false; i = (i + 1) % texts.length; }
        }
        setTimeout(type, speed);
    }
    type();
}

/* ================================================================
   SCROLL REVEAL
   ================================================================ */
function initReveal() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ================================================================
   SKILL BARS — animate on view
   ================================================================ */
function initSkillBars() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-item').forEach(el => obs.observe(el));
}

/* ================================================================
   BRAND ICONS — inject correct SVGs
   ================================================================ */
function injectBrandIcons() {
    const S = 'width:1.4rem;height:1.4rem;display:block;flex-shrink:0';

    const icons = {
        'Next.js': `<svg style="${S}" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg"><mask id="nm" style="mask-type:alpha" maskUnits="userSpaceOnUse"><circle cx="90" cy="90" r="90" fill="black"/></mask><g mask="url(#nm)"><circle cx="90" cy="90" r="90" fill="black"/><path d="M149.508 157.52L69.142 54H54V125.97H66.1V69.4L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#ng0)"/><rect x="115" y="54" width="12" height="72" fill="url(#ng1)"/></g><defs><linearGradient id="ng0" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><linearGradient id="ng1" x1="121" y1="54" x2="120.8" y2="106.9" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></svg>`,

        'TypeScript': `<svg style="${S}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="3" fill="#3178C6"/><path d="M3 14.5h5.5M5.75 14.5V20" stroke="white" stroke-width="1.8" stroke-linecap="round"/><path d="M13 17c0 0 .7 2.5 3 2.5 1.7 0 2.7-1 2.7-2.1 0-2.6-5.7-1.8-5.7-4.5 0-1.5 1.3-2.4 3-2.4 2 0 2.7 1.4 2.7 1.4" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg>`,

        'React.js': `<svg style="${S}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2.2" fill="#61DAFB"/><g fill="none" stroke="#61DAFB" stroke-width="1.1"><ellipse cx="12" cy="12" rx="10.5" ry="4"/><ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(120 12 12)"/></g></svg>`,

        'React Native': `<svg style="${S}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2.2" fill="#61DAFB"/><g fill="none" stroke="#61DAFB" stroke-width="1.1"><ellipse cx="12" cy="12" rx="10.5" ry="4"/><ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(120 12 12)"/></g></svg>`,

        'Tailwind CSS': `<svg style="${S}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#38BDF8" d="M12 6c-2.4 0-3.9 1.2-4.5 3.6.9-1.2 1.95-1.65 3.15-1.35.685.182 1.174.676 1.706 1.22C13.224 10.344 14.234 11.4 16.5 11.4c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.688-.182-1.176-.676-1.706-1.216C15.276 7.056 14.264 6 12 6zM7.5 11.4c-2.4 0-3.9 1.2-4.5 3.6.9-1.2 1.95-1.65 3.15-1.35.685.182 1.174.676 1.706 1.22C8.724 15.744 9.734 16.8 12 16.8c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.688-.182-1.176-.676-1.706-1.216C10.776 12.456 9.764 11.4 7.5 11.4z"/></svg>`,

        'Material UI (MUI)': `<svg style="${S}" viewBox="0 0 36 32" xmlns="http://www.w3.org/2000/svg"><path d="M0 24.1V8.1l9-5.2v5.2L4.5 10.6v8.1L9 21l4.5-2.6v-4.9L18 11v10.1L9 26.3z" fill="#007FFF"/><path d="M18 11v10.1l4.5 2.6V18l4.5 3 4.5-2.6V8.1L27 5.4 22.5 8l-4.5-2.6L13.5 8v5.5z" fill="#007FFF" opacity=".8"/><path d="M27 21l4.5-2.6V8.1L27 5.4V21z" fill="#007FFF" opacity=".6"/><path d="M9 26.3L18 32l9-5.2v-5.2L18 26.9l-9-5.2z" fill="#007FFF" opacity=".4"/></svg>`,

        'MongoDB': `<svg style="${S}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 6.5 9 6.5 14c0 3.038 2.462 5.5 5.5 5.5s5.5-2.462 5.5-5.5C17.5 9 12 2 12 2z" fill="#47A248"/><path d="M12 19.5V22" stroke="#47A248" stroke-width="1.5" stroke-linecap="round"/><path d="M12 2c0 0 .7 7.2 2 10.2 1 2.3 2.5 2.8 4 2.8" stroke="#B3ECA6" stroke-width="0.8" fill="none" stroke-linecap="round" opacity="0.8"/></svg>`,

        'Firebase': `<svg style="${S}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M19.62 11.558l-3.203 2.98-2.972-5.995a.616.616 0 00-1.105.004L4 26l7.937 4.459A2 2 0 0013.797 31h4.406a2 2 0 001.861-1.541L28 26z" fill="#FFA000"/><path d="M23.522 26.988L28 26l-6.408-12.918a.602.602 0 00-.826-.268.617.617 0 00-.268.268l-1.66 3.14-2.98 2.98z" fill="#F57C00"/><path d="M4 26l7.937-4.459-4.817-9.832A.616.616 0 006 12.34L4 26z" fill="#FFCA28"/></svg>`,

        'WordPress': `<svg style="${S}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#21759B"/><path d="M2.5 12C2.5 6.75 6.75 2.5 12 2.5S21.5 6.75 21.5 12 17.25 21.5 12 21.5 2.5 17.25 2.5 12zm3.2 0c0 2.8 1.6 5.2 4 6.4L5.9 9.4A6.47 6.47 0 005.7 12zm10.9-.4c0-1.1-.4-1.9-1.1-2.6-.7-1.1-1.1-2.4-1.1-3.7C14.4 4 13.3 3 11.8 3c-.1 0-.3 0-.4 0 1.4.4 2.3 1.6 2.3 3 0 1.3-.7 2.5-1.9 3.2.4.8.6 1.6.6 2.5 0 .5-.1 1-.2 1.5l-1.5 4.5a6.52 6.52 0 004-3.9c.3-.7.5-1.5.5-2.2zm-5.1 10.8l2-5.9-1.5 4.5L9.8 12c0 .5.1.8.2 1.2l-1.5 4.5c.7.4 1.5.7 2.4.7.4 0 .8 0 1.1-.1zm-6.7-.2c1.4 1.1 3.2 1.8 5.2 1.8.7 0 1.4-.1 2.1-.3l-2-5.6-5.3 4.1z" fill="white" opacity="0.95"/></svg>`,

        'Laravel Blade': `<svg style="${S}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="#FF2D20" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    };

    document.querySelectorAll('.skill-item').forEach(item => {
        const label = item.querySelector('span');
        if (!label) return;
        const name = label.textContent.trim();
        const iconEl = item.querySelector('i');
        if (icons[name] && iconEl) {
            const tmp = document.createElement('div');
            tmp.innerHTML = icons[name];
            iconEl.replaceWith(tmp.firstElementChild);
        }
    });
}

/* ================================================================
   PARTICLES
   ================================================================ */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const colors = ['61,191,174', '42,157,143', '27,79,114', '128,232,220', '0,229,204'];
    const count = isMobile ? 40 : 80;

    class Dot {
        constructor() { this.reset(true); }
        reset(init) {
            this.x = Math.random() * canvas.width;
            this.y = init ? Math.random() * canvas.height : (Math.random() > 0.5 ? -5 : canvas.height + 5);
            this.r = Math.random() * 2.5 + 0.5;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.a = Math.random() * 0.4 + 0.1;
            this.c = colors[Math.floor(Math.random() * colors.length)];
            this.glow = Math.random() > 0.75;
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            if (this.x < -10 || this.x > canvas.width + 10 || this.y < -10 || this.y > canvas.height + 10) this.reset(false);
        }
        draw() {
            if (this.glow) {
                const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 4);
                g.addColorStop(0, `rgba(${this.c},${this.a})`);
                g.addColorStop(1, `rgba(${this.c},0)`);
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(this.x, this.y, this.r * 4, 0, Math.PI * 2); ctx.fill();
            }
            ctx.fillStyle = `rgba(${this.c},${this.a})`;
            ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill();
        }
    }

    const dots = Array.from({ length: count }, () => new Dot());

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < dots.length; i++) {
            for (let j = i + 1; j < dots.length; j++) {
                const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
                const d = Math.hypot(dx, dy);
                if (d < 130) {
                    ctx.strokeStyle = `rgba(61,191,174,${(1 - d / 130) * 0.06})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y); ctx.stroke();
                }
            }
        }
        dots.forEach(d => { d.update(); d.draw(); });
        requestAnimationFrame(draw);
    }
    draw();
}

/* ================================================================
   MOUSE GLOW
   ================================================================ */
function initMouseGlow() {
    const glow = document.getElementById('mouse-glow');
    if (!glow || isMobile) return;
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2, cx = tx, cy = ty;
    document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    (function tick() {
        cx += (tx - cx) * 0.07; cy += (ty - cy) * 0.07;
        glow.style.left = cx + 'px'; glow.style.top = cy + 'px';
        requestAnimationFrame(tick);
    })();
}


/* ================================================================
   IPHONE CLOCK
   ================================================================ */
function initIphoneTime() {
    const el = document.getElementById('iphone-time');
    if (!el) return;
    const fmt = () => {
        const d = new Date();
        let h = d.getHours(), m = d.getMinutes().toString().padStart(2, '0');
        return `${h}:${m}`;
    };
    el.textContent = fmt();
    setInterval(() => { el.textContent = fmt(); }, 30000);

    // Tilt on mouse
    const phone = document.getElementById('iphone16');
    if (!phone || isMobile) return;
    phone.addEventListener('mousemove', e => {
        const r = phone.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        phone.style.transform = `rotateY(${(x - 0.5) * 20}deg) rotateX(${(0.5 - y) * 10}deg)`;
    });
    phone.addEventListener('mouseleave', () => {
        phone.style.transform = 'rotateY(-12deg) rotateX(4deg)';
    });
}

/* ================================================================
   3D CUBE — SCROLL-DRIVEN PROJECT ROTATIONS (contained scroll)
   ================================================================ */
function initProjectCube() {
    const wrapper = document.getElementById('cube-scroll-wrapper');
    const cube = document.getElementById('project-cube');
    const navDots = document.querySelectorAll('.cube-nav-dot');
    const counter = document.getElementById('cube-current');
    if (!wrapper || !cube) return;

    // Clean rotation states — each face shows content correctly
    const states = [
        [0, 0],       // Front  — Foam Road
        [0, -90],     // Right  — Local Check
        [0, -180],    // Back   — Arab Auditors (content un-mirrored via backface)
        [0, -270],    // Left   — Hr-Trust
        [-90, 0],     // Top    — Car Control
        [90, 0],      // Bottom — Adnan Portfolio
    ];

    let current = 0;

    function goTo(i) {
        if (i === current) return;
        current = Math.max(0, Math.min(states.length - 1, i));
        const [rx, ry] = states[current];
        cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        navDots.forEach((d, di) => d.classList.toggle('active', di === current));
        if (counter) counter.textContent = current + 1;
    }

    // Scroll-driven rotation within the wrapper container
    wrapper.addEventListener('scroll', () => {
        const scrollTop = wrapper.scrollTop;
        const maxScroll = wrapper.scrollHeight - wrapper.clientHeight;
        if (maxScroll <= 0) return;
        const pct = Math.max(0, Math.min(1, scrollTop / maxScroll));
        const idx = Math.min(states.length - 1, Math.floor(pct * states.length));
        goTo(idx);
    }, { passive: true });

    // 3D tilt on hover (for current face)
    const scene = document.querySelector('.cube-scene');
    if (!scene || isMobile) return;
    scene.addEventListener('mousemove', e => {
        const r = scene.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        const [rx, ry] = states[current];
        cube.style.transform = `rotateX(${rx + y * -8}deg) rotateY(${ry + x * 8}deg)`;
    });
    scene.addEventListener('mouseleave', () => {
        const [rx, ry] = states[current];
        cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
}

/* ================================================================
   CONTACT CARD HOVER (3D tilt)
   ================================================================ */
function initContactHover() {
    document.querySelectorAll('.contact-card, .feature-card').forEach(card => {
        if (isMobile) return;
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = `perspective(600px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}