/* ==========================================================================
   language.js — English/Hindi Language Toggle
   Ramayana: Beyond What We Were Told
   ========================================================================== */

const Language = (() => {
    'use strict';

    const STORAGE_KEY = 'ramayana_lang';
    let currentLang = 'en';
    let toggleBtn = null;
    const originalTexts = {};

    function getStoredLang() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function saveLang(lang) {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {}
    }

    function cacheOriginalTexts() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (!originalTexts[key]) {
                originalTexts[key] = el.innerHTML;
            }
        });
    }

    function applyLang(lang) {
        currentLang = lang;
        document.documentElement.setAttribute('lang', lang === 'hi' ? 'hi' : 'en');

        if (lang === 'hi' && typeof window.HINDI_TRANSLATIONS !== 'undefined') {
            const t = window.HINDI_TRANSLATIONS;
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (t[key]) {
                    el.innerHTML = t[key];
                }
            });
        } else {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (originalTexts[key]) {
                    el.innerHTML = originalTexts[key];
                }
            });
        }

        updateToggleButton();
    }

    function updateToggleButton() {
        if (!toggleBtn) return;
        const label = toggleBtn.querySelector('.lang-label');
        if (label) {
            label.textContent = currentLang === 'en' ? 'हिं' : 'EN';
        }
        toggleBtn.setAttribute('aria-label',
            currentLang === 'en' ? 'हिन्दी में पढ़ें' : 'Read in English'
        );
        toggleBtn.setAttribute('title',
            currentLang === 'en' ? 'हिन्दी में पढ़ें' : 'Read in English'
        );
    }

    function toggle() {
        const newLang = currentLang === 'en' ? 'hi' : 'en';
        applyLang(newLang);
        saveLang(newLang);
    }

    function init() {
        cacheOriginalTexts();

        toggleBtn = document.querySelector('.lang-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggle);
        }

        const saved = getStoredLang();
        if (saved === 'hi') {
            applyLang('hi');
        } else {
            updateToggleButton();
        }
    }

    return { init, toggle };
})();
