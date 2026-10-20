/* ==========================================================================
   animations.js — Scroll-Based Animations, Sacred Aura Particles & 3D FX
   Ramayana: Beyond What We Were Told
   ========================================================================== */

const Animations = (() => {
    'use strict';

    let observer = null;
    let staggerObserver = null;
    let prefersReducedMotion = false;
    let progressBar = null;
    let heroSection = null;

    /**
     * Check if user prefers reduced motion
     */
    function checkReducedMotion() {
        const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
        prefersReducedMotion = mql.matches;

        mql.addEventListener('change', (e) => {
            prefersReducedMotion = e.matches;
            if (prefersReducedMotion) {
                revealAllElements();
            }
        });
    }

    /**
     * Immediately show all animated elements (for reduced motion or no-JS)
     */
    function revealAllElements() {
        const animated = document.querySelectorAll(
            '.fade-in, .slide-in-left, .slide-in-right, .reveal, .stagger-children'
        );
        animated.forEach(el => {
            el.classList.add('is-visible');
        });
    }

    /**
     * IntersectionObserver callback for individual elements
     */
    function handleIntersection(entries, obs) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }

    /**
     * IntersectionObserver callback for stagger-children containers
     */
    function handleStaggerIntersection(entries, obs) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.style.transitionDelay = `${index * 100}ms`;
                    child.classList.add('is-visible');
                });
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }

    /**
     * Set up IntersectionObservers for scroll animations
     */
    function setupScrollAnimations() {
        if (prefersReducedMotion) {
            revealAllElements();
            return;
        }

        if (!('IntersectionObserver' in window)) {
            revealAllElements();
            return;
        }

        observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1
        });

        const animatedElements = document.querySelectorAll(
            '.fade-in, .slide-in-left, .slide-in-right, .reveal'
        );
        animatedElements.forEach(el => observer.observe(el));

        staggerObserver = new IntersectionObserver(handleStaggerIntersection, {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.05
        });

        const staggerContainers = document.querySelectorAll('.stagger-children');
        staggerContainers.forEach(el => staggerObserver.observe(el));
    }

    /**
     * Lakshmana Rekha line-drawing animation trigger
     */
    function setupLakshmanaRekha() {
        const rekhaElements = document.querySelectorAll('.lakshmana-rekha');
        if (rekhaElements.length === 0) return;

        if (prefersReducedMotion) {
            rekhaElements.forEach(el => el.classList.add('drawn'));
            return;
        }

        const rekhaObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('draw-line');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        rekhaElements.forEach(el => rekhaObserver.observe(el));
    }

    /**
     * Sacred Golden Light Particles in Hero / Article Hero
     */
    function setupSacredParticles() {
        if (prefersReducedMotion) return;

        const targetHero = document.querySelector('.hero, .article-hero');
        if (!targetHero || targetHero.querySelector('.hero-particles-canvas')) return;

        const canvas = document.createElement('canvas');
        canvas.className = 'hero-particles-canvas';
        canvas.setAttribute('aria-hidden', 'true');
        targetHero.insertBefore(canvas, targetHero.firstChild);

        const ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;
        const particles = [];
        const PARTICLE_COUNT = 38;
        let mouseX = -9999;
        let mouseY = -9999;

        function resize() {
            width = canvas.width = targetHero.offsetWidth;
            height = canvas.height = targetHero.offsetHeight;
        }

        function createParticle() {
            const isGold = Math.random() > 0.3;
            return {
                x: Math.random() * (width || 800),
                y: Math.random() * (height || 600),
                radius: Math.random() * 2.8 + 1.1,
                vy: -(Math.random() * 0.48 + 0.16),
                vx: (Math.random() - 0.5) * 0.35,
                alpha: Math.random() * 0.55 + 0.25,
                pulseSpeed: Math.random() * 0.02 + 0.008,
                pulsePhase: Math.random() * Math.PI * 2,
                color: isGold ? '217, 119, 6' : '194, 65, 12'
            };
        }

        resize();
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(createParticle());
        }

        window.addEventListener('resize', resize, { passive: true });
        targetHero.addEventListener('mousemove', (e) => {
            const rect = targetHero.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        }, { passive: true });

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.y += p.vy;
                p.x += p.vx;
                p.pulsePhase += p.pulseSpeed;

                // Subtle gentle attraction/repulsion near mouse
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 110 && dist > 0) {
                    p.x += (dx / dist) * 0.45;
                    p.y += (dy / dist) * 0.45;
                }

                if (p.y < -10) {
                    p.y = height + 10;
                    p.x = Math.random() * width;
                }
                if (p.x < -10) p.x = width + 10;
                if (p.x > width + 10) p.x = -10;

                const currentAlpha = Math.max(0.1, Math.min(0.85, p.alpha + Math.sin(p.pulsePhase) * 0.2));

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = `rgba(${p.color}, 0.6)`;
                ctx.fill();
            });
            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }

    /**
     * 3D Interactive Card Tilt & Mouse-Tracking Glow
     */
    function setup3DTiltCards() {
        if (prefersReducedMotion) return;

        const cards = document.querySelectorAll(
            '.revelation-card, .conspiracy-card, .method-card, .tradition-item, .impact-stat-card, .evidence-card, .source-card, .glossary-entry, .sanskrit-verse-card'
        );

        cards.forEach(card => {
            card.classList.add('tilt-card');

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -3.5;
                const rotateY = ((x - centerX) / centerX) * 3.5;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
                card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    /**
     * Animated Number Counters for Impact Statistics
     */
    function setupAnimatedCounters() {
        const counters = document.querySelectorAll('[data-count-to], .stat-counter[data-target]');
        if (!counters.length) return;

        const counterObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const rawTarget = el.getAttribute('data-count-to') || el.getAttribute('data-target');
                const target = parseInt(rawTarget, 10);
                if (isNaN(target)) return;
                const suffix = el.getAttribute('data-count-suffix') || el.getAttribute('data-suffix') || '';
                const duration = 1400;
                const startTime = performance.now();

                function tick(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(target * eased);
                    el.textContent = current.toLocaleString() + suffix;
                    if (progress < 1) {
                        requestAnimationFrame(tick);
                    }
                }

                requestAnimationFrame(tick);
                obs.unobserve(el);
            });
        }, { threshold: 0.3 });

        counters.forEach(c => counterObserver.observe(c));
    }

    /**
     * Interactive Colonial Distortion vs Original Sanskrit Tabs
     */
    function setupDistortionTabs() {
        const tabBtns = document.querySelectorAll('.distortion-tab-btn');
        if (!tabBtns.length) return;

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-tab-target') || btn.getAttribute('data-target-panel');
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                document.querySelectorAll('.distortion-panel').forEach(panel => {
                    panel.classList.toggle('active', panel.id === targetId);
                });
            });
        });
    }

    /**
     * Update reading progress bar via CSS variable
     */
    function updateReadingProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        if (docHeight <= 0) {
            document.documentElement.style.setProperty('--progress', '0');
            return;
        }

        const progress = Math.min(scrollTop / docHeight, 1);
        document.documentElement.style.setProperty('--progress', progress.toString());

        if (progressBar) {
            progressBar.style.transform = `scaleX(${progress})`;
            progressBar.setAttribute('aria-valuenow', Math.round(progress * 100));
        }
    }

    /**
     * Hero section subtle parallax effect
     */
    function updateHeroParallax() {
        if (!heroSection || prefersReducedMotion) return;

        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;

        if (scrollY > heroHeight) return;

        const parallaxOffset = scrollY * 0.3;
        heroSection.style.setProperty('--parallax-y', `${parallaxOffset}px`);
    }

    /**
     * Combined scroll handler for progress and parallax
     */
    function handleScroll() {
        updateReadingProgress();
        updateHeroParallax();
    }

    /**
     * Initialize animations module
     */
    function init() {
        checkReducedMotion();

        progressBar = document.querySelector('.reading-progress-bar, .progress-bar, .reading-progress');
        heroSection = document.querySelector('.hero, .hero-section');

        setupScrollAnimations();
        setupLakshmanaRekha();
        setupSacredParticles();
        setup3DTiltCards();
        setupAnimatedCounters();
        setupDistortionTabs();

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        if (typeof SITE_CONFIG !== 'undefined' && !SITE_CONFIG.animationsEnabled) {
            revealAllElements();
        }
    }

    return { init };
})();
