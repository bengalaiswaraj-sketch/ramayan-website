/* ==========================================================================
   search.js — Client-Side Search
   Ramayana: Beyond What We Were Told
   ========================================================================== */

const Search = (() => {
    'use strict';

    let searchModal = null;
    let searchInput = null;
    let searchResults = null;
    let searchResultCount = null;
    let searchIndex = [];
    let selectedIndex = -1;
    let isOpen = false;

    /**
     * Load search index from data/search-index.js
     * Expects window.SEARCH_INDEX to be an array of objects:
     *   { title, url, content, tags, section }
     */
    function loadSearchIndex() {
        if (typeof window.SEARCH_INDEX !== 'undefined' && Array.isArray(window.SEARCH_INDEX)) {
            searchIndex = window.SEARCH_INDEX;
        }
    }

    /**
     * Simple fuzzy-tolerant matching
     * Returns a score (0 = no match, higher = better match)
     */
    function fuzzyMatch(query, text) {
        if (!text) return 0;

        const lowerQuery = query.toLowerCase();
        const lowerText = text.toLowerCase();

        // Exact substring match gets highest score
        if (lowerText.includes(lowerQuery)) {
            return 100;
        }

        // Word-level matching
        const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 1);
        let wordScore = 0;
        let matchedWords = 0;

        queryWords.forEach(word => {
            if (lowerText.includes(word)) {
                matchedWords++;
                wordScore += 50;
            } else {
                // Single-character tolerance: check if removing one char produces a match
                for (let i = 0; i < word.length; i++) {
                    const partial = word.slice(0, i) + word.slice(i + 1);
                    if (partial.length > 1 && lowerText.includes(partial)) {
                        matchedWords += 0.5;
                        wordScore += 20;
                        break;
                    }
                }
            }
        });

        if (queryWords.length > 0 && matchedWords === 0) return 0;

        return wordScore;
    }

    /**
     * Search the index and return ranked results
     */
    function performSearch(query) {
        if (!query || query.trim().length < 2) return [];

        const trimmedQuery = query.trim();

        const results = searchIndex
            .map(item => {
                const titleScore = fuzzyMatch(trimmedQuery, item.title) * 3;
                const contentScore = fuzzyMatch(trimmedQuery, item.content);
                const tagScore = fuzzyMatch(trimmedQuery, (item.tags || []).join(' ')) * 2;
                const totalScore = titleScore + contentScore + tagScore;

                return { ...item, score: totalScore };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);

        return results;
    }

    /**
     * Generate a snippet with highlighted match from content
     */
    function getSnippet(content, query, maxLength) {
        maxLength = maxLength || 160;
        if (!content) return '';

        const lowerContent = content.toLowerCase();
        const lowerQuery = query.toLowerCase().trim();
        const firstWord = lowerQuery.split(/\s+/)[0];

        let matchIndex = lowerContent.indexOf(lowerQuery);
        if (matchIndex === -1) {
            matchIndex = lowerContent.indexOf(firstWord);
        }

        let start = 0;
        if (matchIndex > 0) {
            start = Math.max(0, matchIndex - 40);
        }

        let snippet = content.slice(start, start + maxLength);
        if (start > 0) snippet = '...' + snippet;
        if (start + maxLength < content.length) snippet += '...';

        // Highlight matching terms
        const words = lowerQuery.split(/\s+/).filter(w => w.length > 1);
        words.forEach(word => {
            const regex = new RegExp('(' + escapeRegex(word) + ')', 'gi');
            snippet = snippet.replace(regex, '<mark>$1</mark>');
        });

        return snippet;
    }

    /**
     * Escape special regex characters
     */
    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Render search results into the results container
     */
    function renderResults(results, query) {
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = '<li class="search-no-results">No results found. Try different keywords.</li>';
            updateResultCount(0);
            selectedIndex = -1;
            return;
        }

        const html = results.map((item, index) => {
            const snippet = getSnippet(item.content, query);
            const section = item.section ? `<span class="search-result__section">${item.section}</span>` : '';

            return `<li class="search-result" data-index="${index}">
                <a href="${item.url}" class="search-result__link">
                    <span class="search-result__title">${escapeHtml(item.title)}</span>
                    ${section}
                    <span class="search-result__snippet">${snippet}</span>
                </a>
            </li>`;
        }).join('');

        searchResults.innerHTML = html;
        updateResultCount(results.length);
        selectedIndex = -1;
    }

    /**
     * Update the live region with result count for screen readers
     */
    function updateResultCount(count) {
        if (!searchResultCount) return;

        if (count === 0) {
            searchResultCount.textContent = 'No results found';
        } else {
            searchResultCount.textContent = `${count} result${count !== 1 ? 's' : ''} found`;
        }
    }

    /**
     * Escape HTML entities for safe rendering
     */
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Open the search modal
     */
    function openSearch() {
        if (!searchModal) return;

        searchModal.classList.add('search-modal--open');
        searchModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
        isOpen = true;

        if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
        }
        if (searchResults) {
            searchResults.innerHTML = '';
        }
        updateResultCount(-1); // Clear count
    }

    /**
     * Close the search modal
     */
    function closeSearch() {
        if (!searchModal) return;

        searchModal.classList.remove('search-modal--open');
        searchModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
        isOpen = false;
        selectedIndex = -1;
    }

    /**
     * Navigate results with keyboard
     */
    function handleKeyboardNav(e) {
        if (!isOpen) return;

        const items = searchResults ? searchResults.querySelectorAll('.search-result') : [];

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
                updateSelectedItem(items);
                break;

            case 'ArrowUp':
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, -1);
                updateSelectedItem(items);
                if (selectedIndex === -1 && searchInput) {
                    searchInput.focus();
                }
                break;

            case 'Enter':
                if (selectedIndex >= 0 && items[selectedIndex]) {
                    const link = items[selectedIndex].querySelector('a');
                    if (link) {
                        link.click();
                        closeSearch();
                    }
                }
                break;

            case 'Escape':
                closeSearch();
                break;
        }
    }

    /**
     * Highlight the currently selected result
     */
    function updateSelectedItem(items) {
        items.forEach((item, i) => {
            if (i === selectedIndex) {
                item.classList.add('search-result--selected');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('search-result--selected');
            }
        });
    }

    /**
     * Debounce utility
     */
    function debounce(fn, delay) {
        let timer = null;
        return function () {
            const args = arguments;
            const context = this;
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(context, args), delay);
        };
    }

    /**
     * Build the search modal DOM if not present in HTML
     */
    function ensureModalMarkup() {
        searchModal = document.querySelector('.search-modal');

        if (!searchModal) {
            searchModal = document.createElement('div');
            searchModal.className = 'search-modal';
            searchModal.setAttribute('role', 'dialog');
            searchModal.setAttribute('aria-label', 'Site search');
            searchModal.setAttribute('aria-hidden', 'true');
            searchModal.innerHTML = `
                <div class="search-modal__overlay"></div>
                <div class="search-modal__container">
                    <div class="search-modal__header">
                        <label for="search-input" class="sr-only">Search the site</label>
                        <input
                            type="search"
                            id="search-input"
                            class="search-modal__input"
                            placeholder="Search investigations, sources, topics..."
                            autocomplete="off"
                        />
                        <button class="search-modal__close" aria-label="Close search">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div aria-live="polite" aria-atomic="true" class="search-modal__count sr-only"></div>
                    <ul class="search-modal__results" role="listbox"></ul>
                    <div class="search-modal__footer">
                        <span class="search-shortcut"><kbd>Esc</kbd> to close</span>
                        <span class="search-shortcut"><kbd>&uarr;</kbd><kbd>&darr;</kbd> to navigate</span>
                        <span class="search-shortcut"><kbd>Enter</kbd> to select</span>
                    </div>
                </div>
            `;
            document.body.appendChild(searchModal);
        }

        searchInput = searchModal.querySelector('.search-modal__input, #search-input');
        searchResults = searchModal.querySelector('.search-modal__results');
        searchResultCount = searchModal.querySelector('.search-modal__count');
    }

    /**
     * Initialize search module
     */
    function init() {
        if (typeof SITE_CONFIG !== 'undefined' && !SITE_CONFIG.searchEnabled) return;

        loadSearchIndex();
        ensureModalMarkup();

        if (!searchInput) return;

        // Input handler with debounce
        const debouncedSearch = debounce((e) => {
            const query = e.target.value;
            const results = performSearch(query);
            renderResults(results, query);
        }, 200);

        searchInput.addEventListener('input', debouncedSearch);

        // Close button
        const closeBtn = searchModal.querySelector('.search-modal__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeSearch);
        }

        // Click overlay to close
        const overlay = searchModal.querySelector('.search-modal__overlay');
        if (overlay) {
            overlay.addEventListener('click', closeSearch);
        }

        // Open search triggers
        document.querySelectorAll('.search-toggle, [data-action="search"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openSearch();
            });
        });

        // Keyboard shortcut: Ctrl+K to open
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (isOpen) {
                    closeSearch();
                } else {
                    openSearch();
                }
            }

            if (e.key === 'Escape' && isOpen) {
                closeSearch();
            }
        });

        // Keyboard navigation within results
        searchModal.addEventListener('keydown', handleKeyboardNav);
    }

    return { init, open: openSearch, close: closeSearch };
})();
