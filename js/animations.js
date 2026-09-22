/* ==========================================================================
   animations.js — Scroll-Based Animations
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

        // Observer for individual animated elements
        observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1
        });

        const animatedElements = document.querySelectorAll(
            '.fade-in, .slide-in-left, .slide-in-right, .reveal'
        );
        animatedElements.forEach(el => observer.observe(el));

        // Observer for staggered children
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
     * Adds the .draw-line class to trigger CSS keyframe animation
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

        // Also update a progress bar element if it exists
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

        // Only apply parallax while hero is in view
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

        // Set up progress bar reference
        progressBar = document.querySelector('.reading-progress-bar, .progress-bar');

        // Set up hero section reference
        heroSection = document.querySelector('.hero, .hero-section');

        // Initialize scroll animations
        setupScrollAnimations();

        // Initialize Lakshmana Rekha line-drawing
        setupLakshmanaRekha();

        // Scroll-driven updates
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Set initial state

        // If animations are disabled via config, reveal everything
        if (typeof SITE_CONFIG !== 'undefined' && !SITE_CONFIG.animationsEnabled) {
            revealAllElements();
        }
    }

    return { init };
})();
