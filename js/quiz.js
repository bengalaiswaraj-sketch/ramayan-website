/* ==========================================================================
   quiz.js — Interactive Eye-Opening Quiz Engine
   Supports:
   - Full Quiz Arena (quiz.html) with category filters & Awakening Report
   - Homepage Featured Challenge (index.html)
   - Topic-Specific Investigation Quizzes (facts/*.html)
   - Auto-reveals detailed simple explanation on WRONG answers
   - Provides OPTIONAL toggle to view detailed explanation on CORRECT answers
   ========================================================================== */

const QuizEngine = (() => {
    'use strict';

    const LETTERS = ['A', 'B', 'C', 'D'];

    function createQuizInstance(container, options = {}) {
        const allData = window.RAMAYANA_QUIZ_DATA || [];
        if (!allData.length) return;

        const mode = container.getAttribute('data-quiz-mode') || options.mode || 'full'; // 'full' | 'home' | 'topic'
        const topicFilter = container.getAttribute('data-quiz-topic') || options.topic || null;

        let activeCategory = 'all';
        let questions = getFilteredQuestions();
        let currentIndex = 0;
        let answers = {}; // { questionId: { selectedIndex, isCorrect, explanationOpen } }

        function getFilteredQuestions() {
            if (mode === 'home') {
                return allData.filter(q => q.featuredOnHome);
            }
            if (mode === 'topic' && topicFilter) {
                const topicMatches = allData.filter(q => q.topic === topicFilter);
                return topicMatches.length ? topicMatches : allData.slice(0, 3);
            }
            if (activeCategory === 'all') {
                return [...allData];
            }
            return allData.filter(q => q.category === activeCategory);
        }

        function getStats() {
            let correct = 0;
            let wrong = 0;
            questions.forEach(q => {
                const ans = answers[q.id];
                if (ans) {
                    if (ans.isCorrect) correct++;
                    else wrong++;
                }
            });
            return {
                total: questions.length,
                attempted: correct + wrong,
                correct,
                wrong
            };
        }

        function render() {
            if (!questions.length) {
                container.innerHTML = '<p>No questions found for this category.</p>';
                return;
            }

            const stats = getStats();
            const isFinished = currentIndex >= questions.length;
            const progressPct = Math.round((stats.attempted / questions.length) * 100);

            let html = `<div class="quiz-arena-wrapper">`;

            // Category Filter Bar (Only in 'full' mode)
            if (mode === 'full') {
                const categories = [
                    { id: 'all', label: `All Questions (${allData.length})` },
                    { id: 'colonial-conspiracy', label: 'Colonial Conspiracy & Scriptures' },
                    { id: 'rama-truth', label: "Lord Rama's True Character" },
                    { id: 'sita-shakti', label: "Mata Sita's Divine Power" },
                    { id: 'manuscript-secrets', label: 'Manuscript & Spiritual Proof' }
                ];
                html += `<div class="quiz-category-bar" role="tablist" aria-label="Quiz categories">`;
                categories.forEach(cat => {
                    const activeClass = activeCategory === cat.id ? 'active' : '';
                    html += `<button type="button" class="quiz-cat-btn ${activeClass}" data-cat="${cat.id}">${cat.label}</button>`;
                });
                html += `</div>`;
            }

            // HUD / Progress Header
            html += `
                <div class="quiz-hud">
                    <div class="quiz-hud-progress">
                        <div class="quiz-hud-progress-label">
                            <span>${isFinished ? 'Quiz Completed!' : `Question ${currentIndex + 1} of ${questions.length}`}</span>
                            <span>${stats.attempted}/${questions.length} Answered (${progressPct}%)</span>
                        </div>
                        <div class="quiz-progress-track">
                            <div class="quiz-progress-fill" style="width: ${progressPct}%"></div>
                        </div>
                    </div>
                    <div class="quiz-hud-stats">
                        <span class="quiz-stat-pill quiz-stat-pill--correct" title="Correct Answers">✓ ${stats.correct} Truths</span>
                        <span class="quiz-stat-pill quiz-stat-pill--wrong" title="Myths Cleared">✗ ${stats.wrong} Doubts Cleared</span>
                    </div>
                </div>
            `;

            if (isFinished) {
                html += renderSummary(stats);
            } else {
                html += renderQuestion(questions[currentIndex], currentIndex, questions.length);
            }

            html += `</div>`;
            container.innerHTML = html;
            bindEvents();
        }

        function renderQuestion(q, idx, total) {
            const ans = answers[q.id];
            const isAnswered = Boolean(ans);

            let optionsHtml = '';
            q.options.forEach((optText, optIdx) => {
                let stateClass = '';
                if (isAnswered) {
                    if (optIdx === q.correctIndex) {
                        stateClass = 'is-correct';
                    } else if (optIdx === ans.selectedIndex && !ans.isCorrect) {
                        stateClass = 'is-wrong';
                    }
                }
                const disabledAttr = isAnswered ? 'disabled' : '';
                optionsHtml += `
                    <button type="button" class="quiz-option-btn ${stateClass}" data-opt-idx="${optIdx}" ${disabledAttr}>
                        <span class="quiz-option-letter">${LETTERS[optIdx]}</span>
                        <span class="quiz-option-text">${optText}</span>
                    </button>
                `;
            });

            let feedbackHtml = '';
            if (isAnswered) {
                if (!ans.isCorrect) {
                    // WRONGLY ATTEMPTED -> Automatically reveal full detailed explanation in simple language!
                    feedbackHtml = `
                        <div class="quiz-feedback-area">
                            <div class="quiz-result-banner quiz-result-banner--wrong">
                                <div class="quiz-result-title">
                                    <span>💡 Eye-Opener! That was a common misconception. Read the real truth below:</span>
                                </div>
                            </div>
                            ${renderExplanationBox(q, true)}
                        </div>
                    `;
                } else {
                    // CORRECTLY ATTEMPTED -> Optional viewing of explanation!
                    const isOpen = Boolean(ans.explanationOpen);
                    feedbackHtml = `
                        <div class="quiz-feedback-area">
                            <div class="quiz-result-banner quiz-result-banner--correct">
                                <div class="quiz-result-title">
                                    <span>🌟 Spot On! You know the authentic truth of our scriptures!</span>
                                </div>
                                <button type="button" class="quiz-toggle-explanation-btn" data-action="toggle-exp">
                                    ${isOpen ? '🔼 Hide Detailed Explanation' : '📖 View Detailed Explanation & Scripture Proof (Optional)'}
                                </button>
                            </div>
                            ${renderExplanationBox(q, isOpen)}
                        </div>
                    `;
                }
            }

            // Question Navigator Dots
            let dotsHtml = `<div class="quiz-nav-dots" aria-label="Jump to question">`;
            questions.forEach((item, i) => {
                const itemAns = answers[item.id];
                let dotClass = '';
                if (i === idx) dotClass += ' is-current';
                if (itemAns) {
                    dotClass += itemAns.isCorrect ? ' is-answered-correct' : ' is-answered-wrong';
                }
                dotsHtml += `<button type="button" class="quiz-dot${dotClass}" data-jump-idx="${i}" title="Question ${i + 1}">${i + 1}</button>`;
            });
            dotsHtml += `</div>`;

            const prevDisabled = idx === 0 ? 'disabled style="opacity:0.45;pointer-events:none;"' : '';
            const nextLabel = idx === total - 1 ? 'View Final Awakening Report →' : 'Next Question →';

            return `
                <div class="quiz-card">
                    <div class="quiz-card-meta">
                        <span class="quiz-badge">✨ ${q.badge}</span>
                        <span class="quiz-topic-tag">${q.categoryLabel}</span>
                    </div>
                    <h3 class="quiz-question-title">${q.question}</h3>
                    <div class="quiz-common-doubt">
                        <strong>Why this question matters:</strong> ${q.commonDoubt}
                    </div>
                    <div class="quiz-options-list">
                        ${optionsHtml}
                    </div>
                    ${feedbackHtml}
                    <div class="quiz-controls">
                        <button type="button" class="btn-secondary" data-action="prev" ${prevDisabled}>← Previous</button>
                        ${dotsHtml}
                        <button type="button" class="btn-primary" data-action="next">${nextLabel}</button>
                    </div>
                </div>
            `;
        }

        function renderExplanationBox(q, isVisible) {
            const collapsedClass = isVisible ? '' : 'is-collapsed';
            const exp = q.explanation;
            return `
                <div class="quiz-explanation-box ${collapsedClass}" id="exp-${q.id}">
                    <div class="quiz-explanation-headline">✅ ${exp.headline}</div>
                    <div class="quiz-exp-section">
                        <span class="quiz-exp-label">Simple Layman Explanation</span>
                        <p>${exp.simpleExplanation}</p>
                    </div>
                    <div class="quiz-exp-section">
                        <span class="quiz-exp-label quiz-exp-label--colonial">How Colonial Rule / Later Additions Spread This Doubt</span>
                        <p>${exp.colonialAngle}</p>
                    </div>
                    <div class="quiz-exp-section">
                        <span class="quiz-exp-label quiz-exp-label--proof">Original Manuscript & Scripture Proof</span>
                        <p>${exp.scriptureProof}</p>
                    </div>
                </div>
            `;
        }

        function renderSummary(stats) {
            const pct = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;
            let title = 'Spiritual Truth Seeker!';
            let message = 'Every question you explored helps clear away centuries of colonial mistranslations and fake interpolations, restoring the pure image of Lord Rama and Mata Sita.';
            if (pct >= 80) {
                title = 'Awakened Dharmic Scholar! 🏆';
                message = 'Outstanding! Your understanding of Maharishi Valmiki\'s authentic Ramayana and how colonial translators distorted our scriptures is crystal clear.';
            } else if (pct >= 50) {
                title = 'Rising Seeker of Truth! 🌟';
                message = 'Great job! You saw through many popular myths, and the explanations for the remaining questions have now armed you with the authentic manuscript proof.';
            }

            let reviewHtml = '';
            questions.forEach((q, idx) => {
                const ans = answers[q.id];
                const isCorrect = ans && ans.isCorrect;
                const statusBadge = ans
                    ? (isCorrect
                        ? `<span style="color:#16A34A;font-weight:700;">✓ Answered Correctly</span>`
                        : `<span style="color:#DC2626;font-weight:700;">✗ Doubt Cleared (See Explanation Below)</span>`)
                    : `<span style="color:#D97706;font-weight:700;">• Not Attempted</span>`;

                reviewHtml += `
                    <div class="quiz-card" style="text-align:left; margin-top: 1.25rem; padding: 1.5rem;">
                        <div class="quiz-card-meta">
                            <span class="quiz-badge">Question ${idx + 1}</span>
                            ${statusBadge}
                        </div>
                        <h4 style="font-family:var(--font-heading);font-size:1.05rem;margin-bottom:0.5rem;color:var(--text-primary);">${q.question}</h4>
                        <p style="font-size:0.9rem;color:#16A34A;font-weight:600;margin-bottom:0.65rem;">
                            Correct Answer: ${LETTERS[q.correctIndex]}. ${q.options[q.correctIndex]}
                        </p>
                        ${renderExplanationBox(q, true)}
                    </div>
                `;
            });

            return `
                <div class="quiz-summary-card">
                    <div class="quiz-summary-score-ring">
                        <span class="quiz-summary-score-num">${stats.correct}/${stats.total}</span>
                        <span class="quiz-summary-score-total">${pct}% Score</span>
                    </div>
                    <h3 style="font-family:var(--font-heading);font-size:1.6rem;color:var(--text-primary);margin-bottom:0.5rem;">${title}</h3>
                    <p style="color:var(--text-secondary);max-width:600px;margin:0 auto 1.5rem;line-height:1.65;">${message}</p>
                    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:0.85rem;margin-bottom:2rem;">
                        <button type="button" class="btn-primary" data-action="restart">🔄 Retake This Quiz</button>
                        ${mode !== 'full' ? `<a href="${window.location.pathname.includes('/facts/') ? '../quiz.html' : 'quiz.html'}" class="btn-quiz-glow">🧠 Explore All ${allData.length} Controversial Questions</a>` : ''}
                    </div>
                    <h4 style="font-family:var(--font-heading);font-size:1.2rem;color:var(--text-primary);margin-top:1.5rem;text-align:left;">Complete Truth & Explanation Review:</h4>
                    ${reviewHtml}
                </div>
            `;
        }

        function bindEvents() {
            // Option clicks
            container.querySelectorAll('.quiz-option-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const q = questions[currentIndex];
                    if (!q || answers[q.id]) return;

                    const selectedIndex = parseInt(btn.getAttribute('data-opt-idx'), 10);
                    const isCorrect = selectedIndex === q.correctIndex;
                    answers[q.id] = {
                        selectedIndex,
                        isCorrect,
                        explanationOpen: !isCorrect // Auto-open if wrong; optional if correct
                    };
                    render();
                });
            });

            // Optional toggle explanation button (for correctly attempted MCQs)
            const toggleExpBtn = container.querySelector('[data-action="toggle-exp"]');
            if (toggleExpBtn) {
                toggleExpBtn.addEventListener('click', () => {
                    const q = questions[currentIndex];
                    if (!q || !answers[q.id]) return;
                    answers[q.id].explanationOpen = !answers[q.id].explanationOpen;
                    render();
                });
            }

            // Next / Prev / Restart
            const prevBtn = container.querySelector('[data-action="prev"]');
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        currentIndex--;
                        render();
                    }
                });
            }

            const nextBtn = container.querySelector('[data-action="next"]');
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    if (currentIndex < questions.length) {
                        currentIndex++;
                        render();
                    }
                });
            }

            const restartBtn = container.querySelector('[data-action="restart"]');
            if (restartBtn) {
                restartBtn.addEventListener('click', () => {
                    answers = {};
                    currentIndex = 0;
                    render();
                });
            }

            // Jump dots
            container.querySelectorAll('[data-jump-idx]').forEach(dot => {
                dot.addEventListener('click', () => {
                    const targetIdx = parseInt(dot.getAttribute('data-jump-idx'), 10);
                    if (!isNaN(targetIdx) && targetIdx >= 0 && targetIdx < questions.length) {
                        currentIndex = targetIdx;
                        render();
                    }
                });
            });

            // Category filters
            container.querySelectorAll('.quiz-cat-btn').forEach(catBtn => {
                catBtn.addEventListener('click', () => {
                    activeCategory = catBtn.getAttribute('data-cat');
                    questions = getFilteredQuestions();
                    currentIndex = 0;
                    render();
                });
            });
        }

        render();
    }

    function init() {
        document.querySelectorAll('.quiz-mount').forEach(el => {
            createQuizInstance(el);
        });
    }

    return { init, createQuizInstance };
})();

document.addEventListener('DOMContentLoaded', () => {
    QuizEngine.init();
});

