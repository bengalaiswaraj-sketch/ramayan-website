/* ==========================================================================
   reading-progress.js — Reading Progress & Estimated Time
   Ramayana: Beyond What We Were Told
   ========================================================================== */

const ReadingProgress = (() => {
    'use strict';

    let progressBar = null;
    let articleEl = null;

    /**
     * Create the progress bar element if not present
     */
    function ensureProgressBar() {
        progressBar = document.querySelector('.reading-progress');

        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'reading-progress';
            progressBar.setAttribute('role', 'progressbar');
            progressBar.setAttribute('aria-label', 'Reading progress');
            progressBar.setAttribute('aria-valuemin', '0');
            progressBar.setAttribute('aria-valuemax', '100');
            progressBar.setAttribute('aria-valuenow', '0');
            progressBar.innerHTML = '<div class="reading-progress__bar"></div>';
            document.body.prepend(progressBar);
        }
    }

    /**
     * Update the progress bar based on scroll position
     */
    function updateProgress() {
        if (!articleEl) return;

        const articleTop = articleEl.offsetTop;
        const articleHeight = articleEl.offsetHeight;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Calculate how far through the article we've scrolled
        const start = articleTop;
        const end = articleTop + articleHeight - windowHeight;
        const range = end - start;

        let progress = 0;
        if (range > 0) {
            progress = Math.max(0, Math.min(1, (scrollY - start) / range));
        } else if (scrollY >= start) {
            progress = 1;
        }

        // Update CSS custom property for styling
        document.documentElement.style.setProperty('--progress', progress.toString());

        // Update the progress bar width
        const bar = progressBar.querySelector('.reading-progress__bar');
        if (bar) {
            bar.style.width = `${progress * 100}%`;
        }

        // Update ARIA
        progressBar.setAttribute('aria-valuenow', Math.round(progress * 100));
    }

    /**
     * Calculate estimated reading time from article word count
     */
    function calculateReadingTime() {
        if (!articleEl) return;

        const readingTimeEl = document.querySelector('.reading-time');
        if (!readingTimeEl) return;

        // Get text content, clean whitespace, count words
        const text = articleEl.textContent || articleEl.innerText || '';
        const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;

        const wpm = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.readingSpeed) ? SITE_CONFIG.readingSpeed : 200;
        const minutes = Math.max(1, Math.ceil(wordCount / wpm));

        readingTimeEl.textContent = `${minutes} min read`;
        readingTimeEl.setAttribute('aria-label', `Estimated reading time: ${minutes} minutes`);
    }

    /**
     * Initialize reading progress module
     */
    function init() {
        // Only activate on pages with article content
        articleEl = document.querySelector('.article-content, .investigation-content, article, .content');
        if (!articleEl) return;

        ensureProgressBar();
        calculateReadingTime();

        // Update progress on scroll
        window.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress, { passive: true });
        updateProgress(); // Set initial state
    }

    return { init };
})();
