/* ==========================================================================
   visitor-counter.js — Dual-Mode Visitor Counter
   Ramayana: Beyond What We Were Told
   ========================================================================== */

const VisitorCounter = (() => {
    'use strict';

    const LOCAL_STORAGE_KEY = 'ramayana_visit_count';
    const SESSION_CACHE_KEY = 'ramayana_visitor_api_cache';
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in ms

    let counterEl = null;

    /**
     * Format a number with commas for readability
     */
    function formatNumber(num) {
        return Number(num).toLocaleString('en-IN');
    }

    /**
     * Display the visitor count in the counter element
     */
    function displayCount(count, label) {
        if (!counterEl) return;

        counterEl.textContent = `${label}: ${formatNumber(count)}`;
        counterEl.setAttribute('aria-label', `${label}: ${formatNumber(count)}`);
    }

    /**
     * MODE A: Fetch global visitor count from API endpoint
     */
    async function fetchGlobalCount(endpoint) {
        // Check sessionStorage cache first
        try {
            const cached = sessionStorage.getItem(SESSION_CACHE_KEY);
            if (cached) {
                const { count, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    displayCount(count, 'Visitors');
                    return;
                }
            }
        } catch (e) {
            // sessionStorage may be unavailable; continue to fetch
        }

        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`API responded with status ${response.status}`);
            }

            const data = await response.json();
            const count = data.count || data.visitors || data.total || 0;

            // Cache the result
            try {
                sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify({
                    count: count,
                    timestamp: Date.now()
                }));
            } catch (e) {
                // Silently fail if sessionStorage is full or unavailable
            }

            displayCount(count, 'Visitors');

        } catch (error) {
            // Graceful fallback: show nothing or a generic message
            if (counterEl) {
                counterEl.textContent = '';
            }
        }
    }

    /**
     * MODE B: Track local visit count using localStorage
     */
    function trackLocalVisits() {
        let count = 1;

        try {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (stored) {
                count = parseInt(stored, 10) + 1;
            }
            localStorage.setItem(LOCAL_STORAGE_KEY, String(count));
        } catch (e) {
            // localStorage may be unavailable (private browsing, etc.)
            count = 1;
        }

        displayCount(count, 'Your visits');
    }

    /**
     * Initialize visitor counter module
     */
    function init() {
        counterEl = document.querySelector('.visitor-counter, [data-visitor-counter]');
        if (!counterEl) return;

        const endpoint = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG.visitorCounterEndpoint : '';

        if (endpoint && endpoint.trim() !== '') {
            // Mode A: Global counter via API
            fetchGlobalCount(endpoint.trim());
        } else {
            // Mode B: Local visit tracking
            trackLocalVisits();
        }
    }

    return { init };
})();
