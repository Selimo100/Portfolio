<?php
$pageTitle = 'Imprint & Privacy — Selina Mogicato';
$pageDescription = 'Legal information, copyright, image credits and privacy policy for the portfolio of Selina Mogicato.';
$canonicalPath = '/imprint';
$pageStyles = ['assets/css/pages/imprint.css'];

$navPrefix = 'index.php';
$activePage = 'imprint';
$navSpy = false;

$legalSections = [
    'owner' => 'Website owner & contact',
    'notice' => 'Legal notice',
    'disclaimer' => 'Disclaimer & liability',
    'copyright' => 'Copyright & license',
    'images' => 'Image credits',
    'privacy' => 'Privacy policy',
    'tech' => 'Technical implementation',
];
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <?php require __DIR__ . '/assets/php/head.php'; ?>
</head>

<body id="top">
  <a href="#main" class="skip-link">Skip to main content</a>

  <?php require __DIR__ . '/assets/php/header.php'; ?>

  <main id="main">

    <section class="legal-hero" aria-labelledby="legal-title">
      <div class="container legal-hero__inner">
        <p class="eyebrow eyebrow--accent">Legal</p>
        <h1 class="section-title" id="legal-title">Imprint &amp; privacy</h1>
        <p class="body-large">
          Transparency and legal compliance for this portfolio.
        </p>
      </div>
    </section>

    <div class="section section--white">
      <div class="container">
        <div class="legal__grid">
          <nav aria-label="On this page">
            <ul class="legal__toc">
              <?php foreach ($legalSections as $anchor => $label): ?>
                <li><a href="#<?php echo $anchor; ?>"><?php echo htmlspecialchars($label); ?></a></li>
              <?php endforeach; ?>
            </ul>
          </nav>

          <div>
            <section class="legal__section" id="owner" aria-labelledby="owner-title">
              <h2 id="owner-title">Website owner &amp; contact</h2>
              <div class="legal__contact">
                <p><strong>Selina Mogicato</strong></p>
                <p>
                  <i class="bi bi-geo-alt" aria-hidden="true"></i>
                  <span>Zurich, Switzerland</span>
                </p>
                <p>
                  <i class="bi bi-envelope" aria-hidden="true"></i>
                  <a href="mailto:selimo.contact@gmail.com">selimo.contact@gmail.com</a>
                </p>
                <p>
                  <i class="bi bi-linkedin" aria-hidden="true"></i>
                  <a
                    href="https://www.linkedin.com/in/selina-mogicato-a48166316"
                    target="_blank"
                    rel="noopener noreferrer"
                  >LinkedIn profile</a>
                </p>
              </div>
            </section>

            <section class="legal__section" id="notice" aria-labelledby="notice-title">
              <h2 id="notice-title">Legal notice</h2>
              <p>
                This website serves as a professional portfolio showcasing my
                work, skills and experience as a developer and student. All
                content is provided for informational purposes only.
              </p>
              <h3>Professional background</h3>
              <p>
                I am currently pursuing my apprenticeship in application
                development at BBC Basislehrjahr, with a focus on modern web
                technologies and software development practice.
              </p>
            </section>

            <section class="legal__section" id="disclaimer" aria-labelledby="disclaimer-title">
              <h2 id="disclaimer-title">Disclaimer &amp; liability</h2>
              <p>
                This website contains links to external third-party websites
                over whose content I have no influence. I therefore cannot
                assume any liability for these external contents. The
                respective provider or operator of the linked pages is always
                responsible for their content.
              </p>
              <p>
                All project descriptions and achievements mentioned are
                accurate to the best of my knowledge. External links are
                provided for reference and may change without notice.
              </p>
            </section>

            <section class="legal__section" id="copyright" aria-labelledby="copyright-title">
              <h2 id="copyright-title">Copyright &amp; license</h2>
              <p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/">
                <a property="dct:title" rel="cc:attributionURL" href="https://selina.mogicato.ch">Portfolio Selina Mogicato</a>
                by
                <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://selina.mogicato.ch">Selina Mogicato</a>
                is licensed under
                <a
                  class="cc-badge"
                  href="https://creativecommons.org/licenses/by-nc/4.0/?ref=chooser-v1"
                  target="_blank"
                  rel="license noopener noreferrer"
                >CC BY-NC 4.0<img
                    src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
                    alt="" width="20" height="20" loading="lazy" /><img
                    src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
                    alt="" width="20" height="20" loading="lazy" /><img
                    src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
                    alt="" width="20" height="20" loading="lazy" /></a>
              </p>
              <p>
                All original content, including text, images and code examples,
                is the intellectual property of Selina Mogicato unless
                otherwise noted. Third-party assets and libraries keep their
                respective licenses.
              </p>
            </section>

            <section class="legal__section" id="images" aria-labelledby="images-title">
              <h2 id="images-title">Image credits</h2>
              <p>
                The illustrative images on this website were generated using
                <a href="https://openai.com/dall-e" target="_blank" rel="noopener noreferrer">DALL·E</a>,
                an AI image generation model by OpenAI. The prompts used to
                generate them were written by Selina Mogicato.
              </p>
              <p>
                Where images are published under Creative Commons licenses, the
                respective license terms apply. Any further use requires
                explicit permission.
              </p>
            </section>

            <section class="legal__section" id="privacy" aria-labelledby="privacy-title">
              <h2 id="privacy-title">Privacy policy</h2>
              <h3>Data collection</h3>
              <p>
                This website respects your privacy and follows best practices
                for data protection:
              </p>
              <ul>
                <li>No personal data is collected from visitors without explicit consent.</li>
                <li>Contact form submissions are used solely to respond to your enquiry.</li>
                <li>No tracking cookies are used for analytics or advertising.</li>
                <li>Server logs may temporarily store IP addresses for security purposes.</li>
              </ul>
            </section>

            <section class="legal__section" id="tech" aria-labelledby="tech-title">
              <h2 id="tech-title">Technical implementation</h2>
              <p>This portfolio is built with:</p>
              <ul>
                <li><strong>Frontend:</strong> HTML5, CSS3 and JavaScript (ES6+), written without a UI framework.</li>
                <li><strong>Backend:</strong> PHP, for templating and contact form processing.</li>
                <li><strong>Design:</strong> A shared design-token system, responsive layouts, light and dark themes, and accessibility support.</li>
                <li><strong>Performance:</strong> Lazy-loaded imagery, minimal JavaScript and no third-party UI bundles.</li>
              </ul>
              <p class="legal__back">
                <a class="btn btn--secondary" href="index.php">
                  <i class="bi bi-arrow-left" aria-hidden="true"></i>
                  Back to the portfolio
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>

  </main>

  <?php require __DIR__ . '/assets/php/footer.php'; ?>

  <script src="assets/js/error-handler.js"></script>
  <script src="assets/js/theme.js" defer></script>
  <script src="assets/js/navigation.js" defer></script>
  <script src="assets/js/animations.js" defer></script>
  <script src="assets/js/consoleLog.js" defer></script>
  <script src="assets/js/easter-egg.js" defer></script>
</body>

</html>
