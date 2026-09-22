/* ==========================================================================
   theme.js — Light/Dark Theme Toggle
   Ramayana: Beyond What We Were Told
   ========================================================================== */

const Theme = (() => {
    'use strict';

    const STORAGE_KEY = 'ramayana_theme';
    let toggleBtn = null;

    function getStoredTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        updateToggleButton(theme);
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {
            // Silently fail
        }
    }

    function updateToggleButton(theme) {
        if (!toggleBtn) return;
        const isDark = theme === 'dark';
        toggleBtn.setAttribute('aria-label',
            isDark ? 'Switch to light mode' : 'Switch to dark mode'
        );
    }

    function toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        saveTheme(newTheme);
    }

    function init() {
        const savedTheme = getStoredTheme();
        if (savedTheme === 'dark') {
            applyTheme('dark');
        }

        toggleBtn = document.querySelector('.theme-toggle');
        if (toggleBtn) {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            updateToggleButton(currentTheme);
            toggleBtn.addEventListener('click', toggle);
        }
    }

    return { init, toggle };
})();
