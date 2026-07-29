<?php
/**
 * Shared site footer.
 *
 * $navPrefix string  '' on the home page, 'index.php' elsewhere.
 */
$navPrefix = $navPrefix ?? 'index.php';

$socialLinks = [
    ['url' => 'https://github.com/Selimo100', 'icon' => 'github', 'label' => 'GitHub'],
    ['url' => 'https://www.linkedin.com/in/selina-mogicato-a48166316', 'icon' => 'linkedin', 'label' => 'LinkedIn'],
    ['url' => 'https://www.instagram.com/selina.mogi', 'icon' => 'instagram', 'label' => 'Instagram'],
    ['url' => 'https://www.facebook.com/selina.mogicato', 'icon' => 'facebook', 'label' => 'Facebook'],
    // The previous X link (x.com/SMogicat) returned "User Profile Not Found"
    // and was removed. Re-add here once the correct handle is known.
    ['url' => 'https://www.youtube.com/@SelinaMogicato', 'icon' => 'youtube', 'label' => 'YouTube'],
    ['url' => 'https://snapchat.com/t/hR0kXwyE', 'icon' => 'snapchat', 'label' => 'Snapchat'],
];
?>
<footer class="site-footer">
  <div class="container">
    <div class="site-footer__top">
      <div class="stack">
        <p class="title-xs">Selina Mogicato</p>
        <p class="body-sm measure">
          Application developer in training, based in Switzerland. Building
          web and mobile applications that people actually use.
        </p>
        <div class="icon-link-row">
          <?php foreach ($socialLinks as $social): ?>
            <a
              class="icon-link"
              href="<?php echo $social['url']; ?>"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="bi bi-<?php echo $social['icon']; ?>" aria-hidden="true"></i>
              <span class="visually-hidden"><?php echo $social['label']; ?></span>
            </a>
          <?php endforeach; ?>
        </div>
      </div>

      <ul class="site-footer__nav">
        <li><a href="<?php echo $navPrefix; ?>#work">Work</a></li>
        <li><a href="<?php echo $navPrefix; ?>#about">About</a></li>
        <li><a href="<?php echo $navPrefix; ?>#arcade">Arcade</a></li>
        <li><a href="<?php echo $navPrefix; ?>#contact">Contact</a></li>
        <li><a href="karate.php">Karate</a></li>
        <li><a href="imprint.php">Imprint</a></li>
      </ul>
    </div>

    <div class="site-footer__bottom">
      <p class="caption">
        © <?php echo date('Y'); ?> Selina Mogicato. Designed &amp; built by Selina Mogicato.
      </p>
      <div class="site-footer__legal">
        <a class="caption" href="imprint.php">Imprint &amp; privacy</a>
        <a class="caption" href="mailto:selimo.contact@gmail.com">selimo.contact@gmail.com</a>
      </div>
    </div>
  </div>
</footer>
