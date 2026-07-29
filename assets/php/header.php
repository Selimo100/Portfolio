<?php
/**
 * Shared site header.
 *
 * $navPrefix  string  '' on the home page (in-page anchors), 'index.php'
 *                     elsewhere so the same links still resolve.
 * $activePage string  'home' | 'karate' | 'imprint'
 * $navSpy     bool    Enable scroll-spy highlighting (home page only).
 */
$navPrefix = $navPrefix ?? 'index.php';
$activePage = $activePage ?? '';
$navSpy = $navSpy ?? false;

$sectionLinks = [
    'work' => 'Work',
    'about' => 'About',
    'arcade' => 'Arcade',
    'contact' => 'Contact',
];
?>
<div class="scroll-progress" data-scroll-progress></div>

<header class="site-header">
  <div class="container site-header__inner">
    <a class="brand" href="<?php echo $navPrefix === '' ? '#top' : 'index.php'; ?>">
      <img
        class="brand__mark"
        src="assets/images/Logo.png"
        alt=""
        width="24"
        height="24"
      />
      <span>Selina Mogicato</span>
    </a>

    <nav
      class="site-header__nav"
      id="primary-navigation"
      aria-label="Primary"
      <?php echo $navSpy ? 'data-nav-spy' : ''; ?>
    >
      <ul class="nav">
        <?php foreach ($sectionLinks as $anchor => $label): ?>
          <li class="nav__item">
            <a class="nav__link" href="<?php echo $navPrefix; ?>#<?php echo $anchor; ?>">
              <?php echo $label; ?>
            </a>
          </li>
        <?php endforeach; ?>
        <li class="nav__item">
          <a
            class="nav__link"
            href="karate.php"
            <?php echo $activePage === 'karate' ? 'aria-current="page"' : ''; ?>
          >Karate</a>
        </li>
        <li class="nav__item">
          <a
            class="nav__link"
            href="imprint.php"
            <?php echo $activePage === 'imprint' ? 'aria-current="page"' : ''; ?>
          >Imprint</a>
        </li>
      </ul>

      <div class="nav__cta">
        <a class="btn btn--primary" href="<?php echo $navPrefix; ?>#contact">Get in touch</a>
      </div>
    </nav>

    <div class="site-header__actions">
      <a class="btn btn--secondary site-header__cta" href="<?php echo $navPrefix; ?>#contact">
        Get in touch
      </a>
      <button
        class="theme-toggle"
        type="button"
        data-theme-toggle
        aria-label="Switch to dark theme"
        aria-pressed="false"
      >
        <i class="bi bi-moon-fill" aria-hidden="true"></i>
      </button>
      <button
        class="nav-toggle"
        type="button"
        data-nav-toggle
        aria-expanded="false"
        aria-controls="primary-navigation"
        aria-label="Open menu"
      >
        <i class="bi bi-list" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</header>
