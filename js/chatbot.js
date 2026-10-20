/* ==========================================================================
   chatbot.js — Floating Chatbot Widget
   Ramayana: Beyond What We Were Told
   ========================================================================== */

(function () {
  'use strict';

  const API_URL = 'https://ramayana-chatbot-api-139952594.asia-south1.run.app';
  const MAX_LEN = 500;

  let history = [];
  let isStreaming = false;
  let recognition = null;
  let isRecording = false;

  // ---- Build DOM ----
  function createWidget() {
    const fab = document.createElement('button');
    fab.className = 'chatbot-fab';
    fab.setAttribute('aria-label', 'Open chatbot');
    fab.innerHTML = `
      <svg class="icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>`;

    const panel = document.createElement('div');
    panel.className = 'chatbot-panel';
    panel.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-header-icon">ॐ</div>
        <div class="chatbot-header-text">
          <h3>Ramayana Scholar</h3>
          <p>Ask anything about the Ramayana</p>
        </div>
      </div>
      <div class="chatbot-messages" id="chatbotMessages">
        <div class="chatbot-welcome">
          <p>Namaste! I can answer questions about the Ramayana, its textual history, and the investigations on this website. Ask in any language!</p>
        </div>
        <div class="chatbot-suggestions">
          <button type="button">What is the Uttara Kanda?</button>
          <button type="button">Was Sita really exiled?</button>
          <button type="button">Lakshmana Rekha origin?</button>
        </div>
      </div>
      <div class="chatbot-input-area">
        <button class="chatbot-btn-mic" type="button" aria-label="Voice input" title="Voice input">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="1" width="6" height="11" rx="3"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </button>
        <input type="text" placeholder="Type your question..." aria-label="Chat message" maxlength="${MAX_LEN}">
        <button class="chatbot-btn-send" type="button" aria-label="Send message" disabled>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>`;

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    return { fab, panel };
  }

  // ---- Init ----
  const { fab, panel } = createWidget();
  const messages = panel.querySelector('#chatbotMessages');
  const input = panel.querySelector('.chatbot-input-area input');
  const sendBtn = panel.querySelector('.chatbot-btn-send');
  const micBtn = panel.querySelector('.chatbot-btn-mic');

  // Toggle panel
  fab.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('visible');
    fab.classList.toggle('open', isOpen);
    fab.setAttribute('aria-label', isOpen ? 'Close chatbot' : 'Open chatbot');
    if (isOpen) input.focus();
  });

  // Send on Enter
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !sendBtn.disabled) {
      e.preventDefault();
      send();
    }
  });

  // Enable/disable send button
  input.addEventListener('input', () => {
    sendBtn.disabled = !input.value.trim() || isStreaming;
  });

  sendBtn.addEventListener('click', send);

  // Suggestion buttons
  panel.addEventListener('click', (e) => {
    if (e.target.closest('.chatbot-suggestions button')) {
      input.value = e.target.textContent;
      sendBtn.disabled = false;
      send();
    }
  });

  // ---- Speech-to-Text ----
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (e) => {
      let transcript = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      input.value = transcript;
      sendBtn.disabled = !transcript.trim();
    };

    recognition.onend = () => {
      isRecording = false;
      micBtn.classList.remove('recording');
      micBtn.setAttribute('aria-label', 'Voice input');
      if (input.value.trim()) {
        send();
      }
    };

    recognition.onerror = () => {
      isRecording = false;
      micBtn.classList.remove('recording');
    };

    micBtn.addEventListener('click', () => {
      if (isStreaming) return;
      if (isRecording) {
        recognition.stop();
      } else {
        input.value = '';
        sendBtn.disabled = true;
        isRecording = true;
        micBtn.classList.add('recording');
        micBtn.setAttribute('aria-label', 'Stop recording');
        recognition.start();
      }
    });
  } else {
    micBtn.style.display = 'none';
  }

  // ---- Helpers ----
  function clearWelcome() {
    const w = panel.querySelector('.chatbot-welcome');
    const s = panel.querySelector('.chatbot-suggestions');
    if (w) w.remove();
    if (s) s.remove();
  }

  function addMessage(text, role) {
    const div = document.createElement('div');
    div.className = `chatbot-msg ${role}`;
    const label = document.createElement('span');
    label.className = 'msg-label';
    label.textContent = role === 'user' ? 'You' : 'Scholar';
    div.appendChild(label);
    const content = document.createElement('span');
    content.textContent = text;
    div.appendChild(content);
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return content;
  }

  function showTyping() {
    const t = document.createElement('div');
    t.className = 'chatbot-typing';
    t.id = 'chatbotTyping';
    t.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(t);
    messages.scrollTop = messages.scrollHeight;
  }

  function hideTyping() {
    const t = document.getElementById('chatbotTyping');
    if (t) t.remove();
  }

  // ---- Send & Stream ----
  async function send() {
    const text = input.value.trim();
    if (!text || isStreaming) return;

    clearWelcome();
    addMessage(text, 'user');
    input.value = '';
    sendBtn.disabled = true;
    isStreaming = true;

    showTyping();

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: history.slice(-20),
        }),
      });

      hideTyping();

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: 'Something went wrong.' }));
        addMessage(err.detail || 'Something went wrong. Please try again.', 'bot');
        isStreaming = false;
        return;
      }

      const contentSpan = addMessage('', 'bot');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        reply += chunk;
        contentSpan.textContent = reply;
        messages.scrollTop = messages.scrollHeight;
      }

      history.push({ role: 'user', text });
      history.push({ role: 'model', text: reply });
      if (history.length > 20) history = history.slice(-20);
    } catch (err) {
      hideTyping();
      addMessage('Could not reach the server. Please try again later.', 'bot');
    }

    isStreaming = false;
    sendBtn.disabled = !input.value.trim();
  }
})();
