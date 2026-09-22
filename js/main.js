/* ==========================================================================
   main.js — Entry Point
   Ramayana: Beyond What We Were Told
   ========================================================================== */

const App = (() => {
    'use strict';

    /**
     * Share button functionality
     * Supports Web Share API, clipboard copy, and social sharing
     */
    function initShareButtons() {
        document.addEventListener('click', (e) => {
            const shareBtn = e.target.closest('[data-share]');
            if (!shareBtn) return;

            e.preventDefault();
            const action = shareBtn.getAttribute('data-share');
            const pageUrl = window.location.href;
            const pageTitle = document.title;
            const shareText = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.shareText)
                ? SITE_CONFIG.shareText
                : pageTitle;

            switch (action) {
                case 'native':
                    if (navigator.share) {
                        navigator.share({
                            title: pageTitle,
                            text: shareText,
                            url: pageUrl
                        }).catch(() => {
                            // User cancelled or share failed silently
                        });
                    }
                    break;

                case 'copy':
                    copyToClipboard(pageUrl, shareBtn);
                    break;

                case 'whatsapp':
                    window.open(
                        `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + pageUrl)}`,
                        '_blank',
                        'noopener,noreferrer'
                    );
                    break;

                case 'x':
                case 'twitter':
                    window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`,
                        '_blank',
                        'noopener,noreferrer'
                    );
                    break;

                case 'facebook':
                    window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
                        '_blank',
                        'noopener,noreferrer'
                    );
                    break;
            }
        });
    }

    /**
     * Copy text to clipboard with visual feedback
     */
    function copyToClipboard(text, triggerEl) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(() => showCopyFeedback(triggerEl, true))
                .catch(() => fallbackCopy(text, triggerEl));
        } else {
            fallbackCopy(text, triggerEl);
        }
    }

    /**
     * Fallback clipboard copy for older browsers
     */
    function fallbackCopy(text, triggerEl) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand('copy');
            showCopyFeedback(triggerEl, true);
        } catch (e) {
            showCopyFeedback(triggerEl, false);
        }

        document.body.removeChild(textarea);
    }

    /**
     * Show visual feedback after copy attempt
     */
    function showCopyFeedback(el, success) {
        if (!el) return;

        const originalText = el.textContent;
        el.textContent = success ? 'Copied!' : 'Failed to copy';
        el.classList.add('copy-feedback');

        setTimeout(() => {
            el.textContent = originalText;
            el.classList.remove('copy-feedback');
        }, 2000);
    }

    /**
     * Glossary term tooltips
     * Hover or focus on .glossary-term elements to show tooltip
     */
    function initGlossaryTooltips() {
        const terms = document.querySelectorAll('.glossary-term');
        if (terms.length === 0) return;

        terms.forEach(term => {
            const definition = term.getAttribute('data-definition') || term.getAttribute('title');
            if (!definition) return;

            // Remove title to prevent native tooltip
            term.removeAttribute('title');

            // Ensure keyboard accessibility
            if (!term.hasAttribute('tabindex')) {
                term.setAttribute('tabindex', '0');
            }
            term.setAttribute('role', 'term');

            // Create tooltip element
            const tooltip = document.createElement('span');
            tooltip.className = 'glossary-tooltip';
            tooltip.setAttribute('role', 'tooltip');
            tooltip.id = 'tooltip-' + Math.random().toString(36).slice(2, 9);
            tooltip.textContent = definition;
            term.appendChild(tooltip);

            term.setAttribute('aria-describedby', tooltip.id);

            // Show/hide on hover and focus
            term.addEventListener('mouseenter', () => tooltip.classList.add('glossary-tooltip--visible'));
            term.addEventListener('mouseleave', () => tooltip.classList.remove('glossary-tooltip--visible'));
            term.addEventListener('focus', () => tooltip.classList.add('glossary-tooltip--visible'));
            term.addEventListener('blur', () => tooltip.classList.remove('glossary-tooltip--visible'));
        });
    }

    /**
     * Set up Web Share API button visibility
     * Only show native share button if browser supports it
     */
    function setupNativeShare() {
        const nativeShareBtns = document.querySelectorAll('[data-share="native"]');
        nativeShareBtns.forEach(btn => {
            if (!navigator.share) {
                btn.hidden = true;
            }
        });
    }

    /**
     * Initialize all modules
     */
    function init() {
        // Core modules (always initialize)
        if (typeof Navigation !== 'undefined') {
            Navigation.init();
        }

        if (typeof Animations !== 'undefined') {
            Animations.init();
        }

        if (typeof Theme !== 'undefined') {
            Theme.init();
        }

        if (typeof Language !== 'undefined') {
            Language.init();
        }

        if (typeof VisitorCounter !== 'undefined') {
            VisitorCounter.init();
        }

        // Conditional modules (only init if relevant DOM elements exist)
        if (typeof Search !== 'undefined') {
            const hasSearchTrigger = document.querySelector('.search-toggle, [data-action="search"]');
            const searchEnabled = (typeof SITE_CONFIG === 'undefined' || SITE_CONFIG.searchEnabled);
            if (hasSearchTrigger || searchEnabled) {
                Search.init();
            }
        }

        if (typeof Sources !== 'undefined') {
            const hasSources = document.querySelector('.source-ref, [data-source]');
            if (hasSources) {
                Sources.init();
            }
        }

        if (typeof ReadingProgress !== 'undefined') {
            const hasArticle = document.querySelector('.article-content, .investigation-content, article, .content');
            if (hasArticle) {
                ReadingProgress.init();
            }
        }

        // App-level features
        initShareButtons();
        setupNativeShare();
        initGlossaryTooltips();
    }

    return { init };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', App.init);
