/* ==========================================================================
   navigation.js — Navigation System
   Ramayana: Beyond What We Were Told
   ========================================================================== */

const Navigation = (() => {
    'use strict';

    let header = null;
    let mobileToggle = null;
    let navMenu = null;
    let lastScrollY = 0;

    function handleStickyHeader() {
        if (!header) return;
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScrollY = scrollY;
    }

    function toggleMobileMenu(forceClose) {
        if (!mobileToggle || !navMenu) return;

        const isOpen = navMenu.classList.contains('nav--open');
        const shouldClose = forceClose === true || isOpen;

        if (shouldClose) {
            navMenu.classList.remove('nav--open');
            mobileToggle.classList.remove('hamburger--active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
        } else {
            navMenu.classList.add('nav--open');
            mobileToggle.classList.add('hamburger--active');
            mobileToggle.setAttribute('aria-expanded', 'true');
            document.body.classList.add('no-scroll');
            const firstLink = navMenu.querySelector('a');
            if (firstLink) firstLink.focus();
        }
    }

    function handleEscKey(e) {
        if (e.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('nav--open')) {
                toggleMobileMenu(true);
            }
        }
    }

    function highlightActiveLink() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';

        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');

            const href = link.getAttribute('href');
            if (!href) return;

            const linkPage = href.split('/').pop().split('#')[0] || 'index.html';
            if (linkPage === currentPage) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    function handleSmoothScroll(e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;

        const targetId = link.getAttribute('href');
        if (targetId === '#') return;

        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;

        e.preventDefault();

        if (navMenu && navMenu.classList.contains('nav--open')) {
            toggleMobileMenu(true);
        }

        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        history.pushState(null, '', targetId);
        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });
    }

    function handleNavLinkClick(e) {
        const link = e.target.closest('.nav-links a');
        if (link && navMenu && navMenu.classList.contains('nav--open')) {
            toggleMobileMenu(true);
        }
    }

    function init() {
        header = document.querySelector('.site-header');
        mobileToggle = document.querySelector('.mobile-menu-toggle');
        navMenu = document.querySelector('.main-nav');

        window.addEventListener('scroll', handleStickyHeader, { passive: true });
        handleStickyHeader();

        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => toggleMobileMenu());
        }

        document.addEventListener('keydown', handleEscKey);
        highlightActiveLink();
        document.addEventListener('click', handleSmoothScroll);

        if (navMenu) {
            navMenu.addEventListener('click', handleNavLinkClick);
        }
    }

    return { init };
})();
