/* ==========================================================================
   sources.js — Source Reference System
   Ramayana: Beyond What We Were Told
   ========================================================================== */

const Sources = (() => {
    'use strict';

    let sourceModal = null;
    let sourcesData = {};
    let previousFocusEl = null;

    /**
     * Load sources data from data/sources.js
     * Expects window.SOURCES_DATA to be an object keyed by source ID:
     *   { "1": { title, author, year, publisher, type, investigations, why } }
     */
    function loadSourcesData() {
        if (typeof window.SOURCES_DATA === 'undefined') return;

        const raw = window.SOURCES_DATA;

        if (Array.isArray(raw)) {
            raw.forEach((entry, idx) => {
                const key = entry.id || String(idx + 1);
                sourcesData[key] = {
                    title: entry.title,
                    author: entry.author,
                    year: entry.year,
                    publisher: entry.publisher,
                    type: entry.type,
                    investigations: entry.usedIn || entry.investigations,
                    why: entry.description || entry.why
                };
                const numMatch = key.match(/\d+/);
                if (numMatch) {
                    sourcesData[numMatch[0]] = sourcesData[key];
                    sourcesData[String(parseInt(numMatch[0], 10))] = sourcesData[key];
                }
            });
        } else {
            sourcesData = raw;
        }
    }

    /**
     * Get the badge class for a source type
     */
    function getTypeBadgeClass(type) {
        const typeMap = {
            'primary': 'badge--primary',
            'secondary': 'badge--secondary',
            'academic': 'badge--academic',
            'translation': 'badge--translation',
            'manuscript': 'badge--manuscript',
            'commentary': 'badge--commentary',
            'archaeological': 'badge--archaeological',
            'linguistic': 'badge--linguistic'
        };
        return typeMap[(type || '').toLowerCase()] || 'badge--default';
    }

    /**
     * Build the source modal DOM if not present
     */
    function ensureModalMarkup() {
        sourceModal = document.querySelector('.source-modal');

        if (!sourceModal) {
            sourceModal = document.createElement('div');
            sourceModal.className = 'source-modal';
            sourceModal.setAttribute('role', 'dialog');
            sourceModal.setAttribute('aria-label', 'Source details');
            sourceModal.setAttribute('aria-hidden', 'true');
            sourceModal.innerHTML = `
                <div class="source-modal__overlay"></div>
                <div class="source-modal__container" role="document">
                    <button class="source-modal__close" aria-label="Close source details">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="source-modal__content"></div>
                </div>
            `;
            document.body.appendChild(sourceModal);
        }
    }

    /**
     * Render source details into the modal
     */
    function renderSource(sourceId) {
        const source = sourcesData[sourceId];
        const contentEl = sourceModal.querySelector('.source-modal__content');

        if (!source || !contentEl) {
            if (contentEl) {
                contentEl.innerHTML = `
                    <p class="source-modal__error">Source ${escapeHtml(String(sourceId))} not found.</p>
                `;
            }
            return;
        }

        const typeBadge = source.type
            ? `<span class="source-badge ${getTypeBadgeClass(source.type)}">${escapeHtml(source.type)}</span>`
            : '';

        const investigations = source.investigations
            ? `<div class="source-modal__investigations">
                   <h4>Used in</h4>
                   <ul>${source.investigations.map(inv => `<li>${escapeHtml(inv)}</li>`).join('')}</ul>
               </div>`
            : '';

        const why = source.why
            ? `<div class="source-modal__why">
                   <h4>Why It Matters</h4>
                   <p>${escapeHtml(source.why)}</p>
               </div>`
            : '';

        contentEl.innerHTML = `
            <div class="source-modal__header">
                <span class="source-modal__id">Source ${escapeHtml(String(sourceId))}</span>
                ${typeBadge}
            </div>
            <h3 class="source-modal__title">${escapeHtml(source.title || 'Untitled Source')}</h3>
            <div class="source-modal__meta">
                ${source.author ? `<span class="source-modal__author">${escapeHtml(source.author)}</span>` : ''}
                ${source.year ? `<span class="source-modal__year">(${escapeHtml(String(source.year))})</span>` : ''}
                ${source.publisher ? `<span class="source-modal__publisher">${escapeHtml(source.publisher)}</span>` : ''}
            </div>
            ${investigations}
            ${why}
        `;
    }

    /**
     * Escape HTML for safe rendering
     */
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Open the source modal for a given source ID
     */
    function openSource(sourceId) {
        if (!sourceModal) return;

        previousFocusEl = document.activeElement;

        renderSource(sourceId);

        sourceModal.classList.add('source-modal--open');
        sourceModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');

        // Focus the close button
        const closeBtn = sourceModal.querySelector('.source-modal__close');
        if (closeBtn) closeBtn.focus();

        // Set up focus trap
        sourceModal.addEventListener('keydown', handleFocusTrap);
    }

    /**
     * Close the source modal
     */
    function closeSource() {
        if (!sourceModal) return;

        sourceModal.classList.remove('source-modal--open');
        sourceModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');

        sourceModal.removeEventListener('keydown', handleFocusTrap);

        // Return focus to the trigger element
        if (previousFocusEl) {
            previousFocusEl.focus();
            previousFocusEl = null;
        }
    }

    /**
     * Trap focus within the modal
     */
    function handleFocusTrap(e) {
        if (e.key === 'Escape') {
            closeSource();
            return;
        }

        if (e.key !== 'Tab') return;

        const focusable = sourceModal.querySelectorAll(
            'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    /**
     * Parse source ID from a source marker element
     * Supports formats: [Source 1], [Source 12], data-source="1"
     */
    function parseSourceId(el) {
        // Check data attribute first
        const dataSource = el.getAttribute('data-source');
        if (dataSource) return dataSource;

        // Parse from text content: "[Source XX]" or "[XX]"
        const text = el.textContent.trim();
        const match = text.match(/\[(?:Source\s+)?(\d+)\]/i);
        if (match) return match[1];

        return null;
    }

    /**
     * Initialize sources module
     */
    function init() {
        loadSourcesData();
        ensureModalMarkup();

        // Event delegation for source markers
        document.addEventListener('click', (e) => {
            const marker = e.target.closest('.source-ref, [data-source]');
            if (!marker) return;

            e.preventDefault();
            const sourceId = parseSourceId(marker);
            if (sourceId) {
                openSource(sourceId);
            }
        });

        // Close button
        const closeBtn = sourceModal.querySelector('.source-modal__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeSource);
        }

        // Overlay click to close
        const overlay = sourceModal.querySelector('.source-modal__overlay');
        if (overlay) {
            overlay.addEventListener('click', closeSource);
        }

        // ESC to close (global)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sourceModal.classList.contains('source-modal--open')) {
                closeSource();
            }
        });

        // Make source markers keyboard-accessible
        document.querySelectorAll('.source-ref, [data-source]').forEach(marker => {
            if (!marker.hasAttribute('tabindex')) {
                marker.setAttribute('tabindex', '0');
            }
            if (!marker.hasAttribute('role')) {
                marker.setAttribute('role', 'button');
            }
            if (!marker.getAttribute('aria-label')) {
                const sourceId = parseSourceId(marker);
                if (sourceId) {
                    marker.setAttribute('aria-label', `View source ${sourceId}`);
                }
            }

            // Allow keyboard activation
            marker.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    marker.click();
                }
            });
        });
    }

    return { init };
})();
