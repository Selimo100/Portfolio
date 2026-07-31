// Momo — the portfolio assistant. Talks to ask.php and renders plain text only.
(function () {
  const root = document.getElementById('momo');
  if (!root) return;

  const el = {
    launcher: document.getElementById('momoLauncher'),
    panel: document.getElementById('momoPanel'),
    close: document.getElementById('momoClose'),
    reset: document.getElementById('momoReset'),
    messages: document.getElementById('momoMessages'),
    welcome: document.getElementById('momoWelcome'),
    suggestions: document.getElementById('momoSuggestions'),
    error: document.getElementById('momoError'),
    form: document.getElementById('momoForm'),
    input: document.getElementById('momoInput'),
    send: document.getElementById('momoSend'),
    intro: document.getElementById('momoIntro'),
    introClose: document.getElementById('momoIntroClose'),
  };

  if (Object.values(el).some((node) => !node)) return;

  const ENDPOINT = 'ask.php';
  const MAX_QUESTION_LENGTH = 500;
  const HISTORY_SENT = 6;
  const HISTORY_KEPT = 20;
  const STORAGE_KEY = 'momo:conversation';
  const INTRO_KEY = 'momo:intro-seen';
  const INTRO_DELAY = 8000;

  const ACTION_LABELS = {
    'open-contact': 'Go to contact',
    'show-projects': 'See projects',
  };
  const ACTION_TARGETS = {
    'open-contact': 'contact',
    'show-projects': 'projects',
  };

  const GENERIC_ERROR = 'Momo could not answer right now. Please try again in a moment.';

  let history = [];
  let pending = false;

  /* ------------------------------------------------------------- storage */

  function loadHistory() {
    let stored;
    try {
      stored = window.sessionStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return [];
    }
    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) throw new Error('not an array');

      return parsed
        .filter(
          (item) =>
            item &&
            (item.role === 'user' || item.role === 'assistant') &&
            typeof item.content === 'string' &&
            item.content.length > 0 &&
            item.content.length <= 4000
        )
        .slice(-HISTORY_KEPT);
    } catch (e) {
      clearStoredHistory();
      return [];
    }
  }

  function saveHistory() {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-HISTORY_KEPT)));
    } catch (e) {
      /* storage unavailable or full — the conversation still works in memory */
    }
  }

  function clearStoredHistory() {
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      /* nothing to do */
    }
  }

  /* ------------------------------------------------------------ rendering */

  function renderMessage(role, text) {
    const bubble = document.createElement('div');
    bubble.className = 'momo-message momo-message--' + role;
    bubble.textContent = text;
    el.messages.append(bubble);
    return bubble;
  }

  function renderAction(action) {
    const sectionId = ACTION_TARGETS[action];
    if (!sectionId) return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'momo-action-btn';
    button.textContent = ACTION_LABELS[action];
    button.addEventListener('click', function () {
      if (window.matchMedia('(max-width: 575.98px)').matches) closePanel();
      section.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    });
    el.messages.append(button);
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'momo-typing';
    typing.setAttribute('role', 'status');
    typing.setAttribute('aria-label', 'Momo is typing');
    for (let i = 0; i < 3; i += 1) typing.append(document.createElement('span'));
    el.messages.append(typing);
    scrollToBottom();
    return typing;
  }

  function scrollToBottom() {
    el.messages.scrollTop = el.messages.scrollHeight;
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function showError(message) {
    el.error.textContent = message;
    el.error.hidden = false;
  }

  function hideError() {
    el.error.hidden = true;
    el.error.textContent = '';
  }

  function trimVisibleMessages() {
    while (el.messages.querySelectorAll('.momo-message').length > HISTORY_KEPT) {
      const first = el.messages.querySelector('.momo-message');
      if (!first) break;
      first.remove();
    }
  }

  function updateChrome() {
    const started = history.length > 0;
    el.welcome.hidden = started;
    el.suggestions.hidden = started;
  }

  function restoreConversation() {
    history = loadHistory();
    history.forEach((message) => renderMessage(message.role, message.content));
    updateChrome();
    scrollToBottom();
  }

  /* ------------------------------------------------------- open and close */

  function openPanel() {
    root.dataset.open = 'true';
    el.panel.hidden = false;
    el.launcher.setAttribute('aria-expanded', 'true');
    dismissIntro();
    el.input.focus();
    scrollToBottom();
  }

  function closePanel() {
    root.dataset.open = 'false';
    el.panel.hidden = true;
    el.launcher.setAttribute('aria-expanded', 'false');
    el.launcher.focus();
  }

  function togglePanel() {
    if (el.panel.hidden) openPanel();
    else closePanel();
  }

  function resetConversation() {
    history = [];
    clearStoredHistory();
    el.messages
      .querySelectorAll('.momo-message, .momo-action-btn, .momo-typing')
      .forEach((node) => node.remove());
    hideError();
    updateChrome();
    el.input.value = '';
    autoGrow();
    el.input.focus();
  }

  /* -------------------------------------------------------------- sending */

  function setPending(state) {
    pending = state;
    el.send.disabled = state;
    el.input.disabled = state;
  }

  async function ask(question) {
    if (pending) return;

    hideError();
    history.push({ role: 'user', content: question });
    renderMessage('user', question);
    trimVisibleMessages();
    updateChrome();
    scrollToBottom();
    saveHistory();

    setPending(true);
    const typing = showTyping();

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question,
          history: history.slice(-(HISTORY_SENT + 1), -1),
        }),
      });

      let data = null;
      try {
        data = await response.json();
      } catch (e) {
        data = null;
      }

      typing.remove();

      if (!response.ok || !data || data.success !== true || typeof data.answer !== 'string') {
        const message = data && typeof data.error === 'string' ? data.error : GENERIC_ERROR;
        showError(message);
        history.pop();
        saveHistory();
        return;
      }

      history.push({ role: 'assistant', content: data.answer });
      renderMessage('assistant', data.answer);

      if (typeof data.action === 'string' && ACTION_TARGETS[data.action]) {
        renderAction(data.action);
      }

      trimVisibleMessages();
      saveHistory();
      scrollToBottom();
    } catch (e) {
      typing.remove();
      showError(GENERIC_ERROR);
      history.pop();
      saveHistory();
    } finally {
      setPending(false);
      el.input.focus();
    }
  }

  function submitQuestion(raw) {
    const question = String(raw || '').trim();
    if (!question) return;

    if (question.length > MAX_QUESTION_LENGTH) {
      showError('Please keep your question under ' + MAX_QUESTION_LENGTH + ' characters.');
      return;
    }

    el.input.value = '';
    autoGrow();
    ask(question);
  }

  function autoGrow() {
    el.input.style.height = 'auto';
    el.input.style.height = Math.min(el.input.scrollHeight, 112) + 'px';
  }

  /* ---------------------------------------------------------- intro bubble */

  function dismissIntro() {
    el.intro.hidden = true;
    try {
      window.localStorage.setItem(INTRO_KEY, '1');
    } catch (e) {
      /* ignore */
    }
  }

  function scheduleIntro() {
    let seen = null;
    try {
      seen = window.localStorage.getItem(INTRO_KEY);
    } catch (e) {
      seen = '1';
    }
    if (seen) return;

    window.setTimeout(function () {
      if (el.panel.hidden) el.intro.hidden = false;
    }, INTRO_DELAY);
  }

  /* --------------------------------------------------------------- events */

  el.launcher.addEventListener('click', togglePanel);
  el.close.addEventListener('click', closePanel);
  el.reset.addEventListener('click', resetConversation);
  el.introClose.addEventListener('click', function (event) {
    event.stopPropagation();
    dismissIntro();
  });

  el.form.addEventListener('submit', function (event) {
    event.preventDefault();
    submitQuestion(el.input.value);
  });

  el.input.addEventListener('input', autoGrow);

  el.input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submitQuestion(el.input.value);
    }
  });

  el.suggestions.addEventListener('click', function (event) {
    const button = event.target.closest('.momo-suggestion');
    if (button) submitQuestion(button.textContent);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !el.panel.hidden) closePanel();
  });

  restoreConversation();
  scheduleIntro();
})();
