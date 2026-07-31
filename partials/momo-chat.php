<?php

/**
 * Markup for the Momo chat assistant.
 *
 * Included at the end of index.php. Behaviour lives in assets/js/chatbot.js,
 * styling in assets/css/chatbot.css, and the mascot in
 * assets/images/momo-mascot.svg.
 */

/**
 * Inlines the mascot SVG so the idle animations can be driven by CSS.
 * Gradient ids are namespaced per instance to keep them unique in the document.
 */
$momoMascot = static function (string $instance, string $extraClass = ''): string {
    static $source = null;
    if ($source === null) {
        $source = (string) file_get_contents(__DIR__ . '/../assets/images/momo-mascot.svg');
    }

    $svg = str_replace(['"momo', '#momo'], ['"' . $instance . '-momo', '#' . $instance . '-momo'], $source);
    $svg = str_replace('class="' . $instance . '-momo-mascot"', 'class="momo-mascot ' . $extraClass . '"', $svg);
    $svg = str_replace('class="' . $instance . '-momo-', 'class="momo-', $svg);

    return $svg;
};

$momoSuggestions = [
    'What projects has Selina built?',
    'Which technologies does she use?',
    'Tell me about her apprenticeship.',
    'How can I contact Selina?',
];
?>

<!-- Momo assistant -->
<div class="momo" id="momo" data-momo>
  <div class="momo-intro" id="momoIntro" hidden>
    <p>Questions about Selina?</p>
    <button type="button" class="momo-intro-close" id="momoIntroClose" aria-label="Dismiss">
      <i class="bi bi-x"></i>
    </button>
  </div>

  <button type="button" class="momo-launcher" id="momoLauncher" aria-expanded="false" aria-controls="momoPanel"
    aria-label="Ask Momo, Selina's portfolio assistant">
    <span class="momo-launcher-mascot" aria-hidden="true"><?php echo $momoMascot('launcher'); ?></span>
    <span class="momo-launcher-label">Ask Momo</span>
  </button>

  <div class="momo-panel" id="momoPanel" role="dialog" aria-modal="false" aria-labelledby="momoTitle" hidden>
    <header class="momo-header">
      <span class="momo-header-mascot" aria-hidden="true"><?php echo $momoMascot('header'); ?></span>
      <span class="momo-header-text">
        <span class="momo-title" id="momoTitle">Momo</span>
        <span class="momo-subtitle">Selina's portfolio assistant</span>
      </span>
      <button type="button" class="momo-icon-btn" id="momoReset" aria-label="Reset conversation" title="Reset conversation">
        <i class="bi bi-arrow-counterclockwise"></i>
      </button>
      <button type="button" class="momo-icon-btn" id="momoClose" aria-label="Close chat">
        <i class="bi bi-x-lg"></i>
      </button>
    </header>

    <div class="momo-messages" id="momoMessages" role="log" aria-live="polite" aria-relevant="additions"
      aria-label="Conversation with Momo" tabindex="0">
      <div class="momo-welcome" id="momoWelcome">
        <span class="momo-welcome-mascot" aria-hidden="true"><?php echo $momoMascot('welcome'); ?></span>
        <p class="momo-welcome-text">
          Hi, I'm Momo! I can tell you about Selina's projects, skills, apprenticeship and experience.
        </p>
      </div>
    </div>

    <div class="momo-suggestions" id="momoSuggestions">
      <?php foreach ($momoSuggestions as $suggestion): ?>
        <button type="button" class="momo-suggestion"><?php echo htmlspecialchars($suggestion); ?></button>
      <?php endforeach; ?>
    </div>

    <p class="momo-error" id="momoError" role="alert" hidden></p>

    <form class="momo-form" id="momoForm" novalidate>
      <label class="visually-hidden" for="momoInput">Your question for Momo</label>
      <textarea class="momo-input" id="momoInput" rows="1" maxlength="500" placeholder="Ask me about Selina…"
        autocomplete="off"></textarea>
      <button type="submit" class="momo-send" id="momoSend" aria-label="Send question">
        <i class="bi bi-send-fill" aria-hidden="true"></i>
      </button>
    </form>

    <p class="momo-privacy">
      Messages are sent to an AI service to generate a response. Do not enter sensitive information.
    </p>
  </div>
</div>
