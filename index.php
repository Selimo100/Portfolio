<?php
session_start();

require __DIR__ . '/assets/php/data/projects.php';

$pageTitle = 'Selina Mogicato — Application Developer';
$pageDescription = 'Portfolio of Selina Mogicato, apprentice application developer from Switzerland. Web and mobile projects built with React Native, TypeScript, PHP and more.';
$canonicalPath = '/';
$pageStyles = ['assets/css/pages/home.css'];

// In-page anchors on this page; sub-pages point back at index.php.
$navPrefix = '';
$activePage = 'home';
$navSpy = true;

$formErrors = $_SESSION['errors'] ?? [];
$formSuccess = $_SESSION['success'] ?? null;
$formError = $_SESSION['error'] ?? null;
$oldInput = $_SESSION['old_input'] ?? [];
unset($_SESSION['errors'], $_SESSION['success'], $_SESSION['error']);
if ($formSuccess) {
    unset($_SESSION['old_input']);
    $oldInput = [];
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <?php require __DIR__ . '/assets/php/head.php'; ?>
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Selina Mogicato",
      "url": "https://selina.mogicato.ch",
      "jobTitle": "Apprentice Application Developer",
      "email": "mailto:selimo.contact@gmail.com",
      "address": { "@type": "PostalAddress", "addressCountry": "CH" },
      "sameAs": [
        "https://github.com/Selimo100",
        "https://www.linkedin.com/in/selina-mogicato-a48166316"
      ]
    }
  </script>
</head>

<body id="top">
  <a href="#main" class="skip-link">Skip to main content</a>

  <?php require __DIR__ . '/assets/php/header.php'; ?>

  <main id="main">

    <!-- ================= Hero ================= -->
    <section class="hero" aria-labelledby="hero-title">
      <div class="container container--content hero__inner">
        <p class="status-pill">
          <span class="status-pill__dot" aria-hidden="true"></span>
          Apprentice application developer · Switzerland
        </p>

        <h1 class="hero-title" id="hero-title">Selina Mogicato</h1>

        <p class="hero__role">I build software people actually use.</p>

        <p class="body-large hero__lead">
          I&rsquo;m completing my apprenticeship as an application developer
          while attending vocational baccalaureate school. I work across the
          full stack — from clean frontends to the backend systems behind
          them — and I care most about clear architecture and code that stays
          maintainable.
        </p>

        <div class="btn-row btn-row--center">
          <a class="btn btn--primary btn--lg" href="#work">View my work</a>
          <a class="btn btn--secondary btn--lg" href="#contact">Get in touch</a>
        </div>

        <ul class="hero__meta">
          <li><i class="bi bi-geo-alt-fill" aria-hidden="true"></i>Switzerland</li>
          <li><i class="bi bi-mortarboard-fill" aria-hidden="true"></i>Apprenticeship &amp; BMS-W</li>
          <li><i class="bi bi-github" aria-hidden="true"></i>
            <a href="https://github.com/Selimo100" target="_blank" rel="noopener noreferrer">Selimo100</a>
          </li>
        </ul>
      </div>

      <div class="container">
        <div class="hero-showcase">
          <div class="hero-showcase__item hero-showcase__item--side">
            <img
              src="assets/images/Kaisho-DojoTime.png"
              alt="The Kaisho DojoTime training schedule."
              width="1365" height="592"
              loading="lazy" decoding="async"
              sizes="30vw"
            />
          </div>
          <div class="hero-showcase__item hero-showcase__item--lead">
            <img
              src="assets/images/Rummy.png"
              alt="The Rummy scorekeeping web app."
              width="1893" height="896"
              fetchpriority="high" decoding="async"
              sizes="(max-width: 860px) 92vw, 40vw"
            />
          </div>
          <div class="hero-showcase__item hero-showcase__item--side">
            <img
              src="assets/images/portfolio_bbc.png"
              alt="The Berufsbildungscenter portfolio site."
              width="1018" height="544"
              loading="lazy" decoding="async"
              sizes="30vw"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ================= Selected work ================= -->
    <section id="work" class="section section--white section--lead-in" aria-labelledby="work-title">
      <div class="container">
        <div class="section-heading section-heading--center reveal">
          <p class="eyebrow eyebrow--accent">Selected work</p>
          <h2 class="section-title" id="work-title">Things I&rsquo;ve built</h2>
          <p class="body-large section-heading__lead">
            Applications built for real people — a family card game, a karate
            club and a kitchen. Each one shipped and in use.
          </p>
        </div>
      </div>
    </section>

    <?php foreach ($featuredProjects as $index => $project): ?>
      <?php
        $position = $index + 1;
        require __DIR__ . '/assets/php/components/featured-project.php';
      ?>
    <?php endforeach; ?>

    <!-- ================= More work ================= -->
    <section class="section section--white" aria-labelledby="more-work-title">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow">More work</p>
          <h2 class="title-sm" id="more-work-title">Other projects</h2>
        </div>

        <div class="project-grid reveal-stagger">
          <?php foreach ($otherProjects as $item): ?>
            <article class="card project-card">
              <div class="frame frame--zoom project-card__media">
                <img
                  src="<?php echo htmlspecialchars($item['image']['src']); ?>"
                  alt="<?php echo htmlspecialchars($item['image']['alt']); ?>"
                  width="<?php echo (int) $item['image']['width']; ?>"
                  height="<?php echo (int) $item['image']['height']; ?>"
                  loading="lazy" decoding="async"
                  sizes="(max-width: 720px) 92vw, 45vw"
                />
              </div>
              <div class="card__body">
                <h3 class="project-card__title">
                  <a href="<?php echo htmlspecialchars($item['url']); ?>" target="_blank" rel="noopener noreferrer">
                    <?php echo htmlspecialchars($item['name']); ?>
                  </a>
                </h3>
                <p class="body-sm"><?php echo htmlspecialchars($item['summary']); ?></p>
                <?php if (!empty($item['tech'])): ?>
                  <ul class="tag-list">
                    <?php foreach ($item['tech'] as $tech): ?>
                      <li class="tag"><?php echo htmlspecialchars($tech); ?></li>
                    <?php endforeach; ?>
                  </ul>
                <?php endif; ?>
                <p class="project-card__foot">
                  <span class="text-link" aria-hidden="true">
                    Visit site <i class="bi bi-arrow-right"></i>
                  </span>
                </p>
              </div>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- ================= About ================= -->
    <section id="about" class="section section--wash" aria-labelledby="about-title">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow eyebrow--accent">About</p>
          <h2 class="section-title" id="about-title">Who&rsquo;s behind this</h2>
        </div>

        <div class="about__grid">
          <div class="frame frame--raised about__portrait reveal">
            <img
              src="assets/images/Portrait.png"
              alt="Portrait of Selina Mogicato."
              width="1536" height="1024"
              loading="lazy" decoding="async"
              sizes="(max-width: 860px) 92vw, 40vw"
            />
          </div>

          <div class="stack-lg reveal">
            <p class="body-large">
              I am currently completing my apprenticeship as an application
              developer while attending the Vocational Baccalaureate School
              (BMS-W). My focus is on building clean, scalable and
              well-structured web applications that are technically solid and
              pleasant to use.
            </p>
            <p class="body measure">
              Most of my projects start with a real problem close to me: a
              family card game that needed a better scoreboard, a karate club
              that was managing its schedule by hand, a kitchen with too many
              ingredients and no plan. Building for people I know keeps me
              honest about whether something actually works.
            </p>
            <p class="body measure">
              I enjoy working across the full stack, and I&rsquo;m happiest when
              a system is small enough to understand end to end but real enough
              that people depend on it. Outside of code, I train and teach
              Shotokan karate — a practice that has shaped how I approach
              precision and patience in everything else.
            </p>

            <ul class="about__values">
              <li>
                <i class="bi bi-diagram-3-fill" aria-hidden="true"></i>
                <span><strong>Clear architecture</strong> — structure that explains itself.</span>
              </li>
              <li>
                <i class="bi bi-code-square" aria-hidden="true"></i>
                <span><strong>Maintainable code</strong> — written for whoever reads it next.</span>
              </li>
              <li>
                <i class="bi bi-person-hearts" aria-hidden="true"></i>
                <span><strong>Thoughtful user experience</strong> — the interface should get out of the way.</span>
              </li>
              <li>
                <i class="bi bi-check2-circle" aria-hidden="true"></i>
                <span><strong>Real-world usability</strong> — it has to hold up outside the demo.</span>
              </li>
            </ul>

            <ul class="timeline">
              <li class="timeline__item">
                <div>
                  <p class="timeline__date">Current</p>
                </div>
                <div>
                  <h3 class="title-xs">Apprenticeship, Application Development</h3>
                  <p class="timeline__org">BBC Basislehrjahr</p>
                  <p class="body-sm timeline__body">
                    Training in application development with a focus on modern
                    web technologies and software development practice.
                  </p>
                </div>
              </li>
              <li class="timeline__item">
                <div>
                  <p class="timeline__date">Current</p>
                </div>
                <div>
                  <h3 class="title-xs">Vocational Baccalaureate School (BMS-W)</h3>
                  <p class="timeline__org">Alongside the apprenticeship</p>
                  <p class="body-sm timeline__body">
                    Business-oriented vocational baccalaureate, taken in
                    parallel with the apprenticeship.
                  </p>
                </div>
              </li>
              <li class="timeline__item">
                <div>
                  <p class="timeline__date">Since 2016</p>
                </div>
                <div>
                  <h3 class="title-xs">Shotokan Karate — practising and teaching</h3>
                  <p class="timeline__org">Kaisho Karate Bassersdorf</p>
                  <p class="body-sm timeline__body">
                    Brown belt, competing regionally and internationally, and
                    teaching children since 2025.
                    <a class="text-link" href="karate.php">Read the full story <i class="bi bi-arrow-right" aria-hidden="true"></i></a>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= Skills ================= -->
    <section id="skills" class="section section--white" aria-labelledby="skills-title">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow eyebrow--accent">Toolkit</p>
          <h2 class="section-title" id="skills-title">Technologies I work with</h2>
          <p class="body-large section-heading__lead">
            Languages, frameworks and tools I&rsquo;ve used across school,
            apprenticeship and personal projects.
          </p>
        </div>

        <div class="skills reveal-stagger">
          <?php foreach (array_values($skillGroups) as $groupIndex => $skills): ?>
            <?php $groupName = array_keys($skillGroups)[$groupIndex]; ?>
            <section class="skills__group" aria-labelledby="skills-group-<?php echo $groupIndex; ?>">
              <h3 class="skills__title" id="skills-group-<?php echo $groupIndex; ?>">
                <?php echo htmlspecialchars($groupName); ?>
              </h3>
              <ul class="tag-list">
                <?php foreach ($skills as $skill): ?>
                  <li class="tag"><?php echo htmlspecialchars($skill); ?></li>
                <?php endforeach; ?>
              </ul>
            </section>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- ================= Arcade ================= -->
    <section id="arcade" class="section surface-dark" aria-labelledby="arcade-title">
      <div class="container">
        <div class="arcade__grid">
          <div class="stack-lg reveal">
            <p class="eyebrow eyebrow--accent">Side quest</p>
            <h2 class="section-title" id="arcade-title">The Arcade</h2>
            <p class="body-large">
              Twelve small browser games I wrote from scratch — Pong, Snake,
              Breakout, Hangman and more. No engine, no framework: just canvas,
              DOM and plain JavaScript.
            </p>
            <p class="body measure">
              It started as a way to practise game loops, collision detection
              and state handling, and it stayed because it&rsquo;s fun. Play it
              right here, or open it full screen.
            </p>
            <div class="btn-row">
              <a
                class="btn btn--primary btn--lg"
                href="assets/arcade/arcade.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open the arcade
                <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
              </a>
            </div>
            <p class="body-sm arcade__hint">
              <i class="bi bi-lightbulb" aria-hidden="true"></i>
              Anywhere on this site, press <kbd>A</kbd> to jump straight there.
            </p>
          </div>

          <div
            class="frame frame--raised arcade__frame reveal"
            data-arcade-embed="assets/arcade/arcade.html"
          >
            <noscript>
              <img
                src="assets/images/arcade.png"
                alt="The arcade homepage showing a grid of playable games."
                width="1885" height="868"
                loading="lazy"
              />
            </noscript>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= Contact ================= -->
    <section id="contact" class="section section--wash" aria-labelledby="contact-title">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow eyebrow--accent">Contact</p>
          <h2 class="section-title" id="contact-title">Let&rsquo;s build something</h2>
          <p class="body-large section-heading__lead">
            Open to projects, apprenticeship collaboration and a good technical
            conversation. Send a message and I&rsquo;ll get back to you.
          </p>
        </div>

        <div class="contact__grid">
          <div class="stack-lg reveal">
            <h3 class="title-xs">Other ways to reach me</h3>
            <ul class="contact__channels">
              <li class="contact__channel">
                <i class="bi bi-envelope" aria-hidden="true"></i>
                <span>
                  <a href="mailto:selimo.contact@gmail.com">selimo.contact@gmail.com</a>
                </span>
              </li>
              <li class="contact__channel">
                <i class="bi bi-linkedin" aria-hidden="true"></i>
                <span>
                  <a href="https://www.linkedin.com/in/selina-mogicato-a48166316" target="_blank" rel="noopener noreferrer">
                    Selina Mogicato on LinkedIn
                  </a>
                </span>
              </li>
              <li class="contact__channel">
                <i class="bi bi-github" aria-hidden="true"></i>
                <span>
                  <a href="https://github.com/Selimo100" target="_blank" rel="noopener noreferrer">
                    Selimo100 on GitHub
                  </a>
                </span>
              </li>
              <li class="contact__channel">
                <i class="bi bi-geo-alt" aria-hidden="true"></i>
                <span class="body">Zurich, Switzerland</span>
              </li>
            </ul>
          </div>

          <div class="reveal">
            <?php if ($formSuccess): ?>
              <div class="alert alert--success" role="status">
                <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
                <div class="alert__body"><?php echo htmlspecialchars($formSuccess); ?></div>
                <button class="alert__close" type="button" data-alert-close aria-label="Dismiss message">&times;</button>
              </div>
            <?php endif; ?>

            <?php if ($formError): ?>
              <div class="alert alert--error" role="alert">
                <i class="bi bi-exclamation-triangle-fill" aria-hidden="true"></i>
                <div class="alert__body"><?php echo htmlspecialchars($formError); ?></div>
                <button class="alert__close" type="button" data-alert-close aria-label="Dismiss message">&times;</button>
              </div>
            <?php endif; ?>

            <?php if (!empty($formErrors)): ?>
              <div class="alert alert--error" role="alert">
                <i class="bi bi-exclamation-triangle-fill" aria-hidden="true"></i>
                <div class="alert__body">
                  <strong>Your message wasn&rsquo;t sent:</strong>
                  <ul>
                    <?php foreach ($formErrors as $error): ?>
                      <li><?php echo htmlspecialchars($error); ?></li>
                    <?php endforeach; ?>
                  </ul>
                </div>
                <button class="alert__close" type="button" data-alert-close aria-label="Dismiss message">&times;</button>
              </div>
            <?php endif; ?>

            <form class="form" action="sendMail.php" method="POST" novalidate data-validate>
              <div class="field<?php echo isset($formErrors['name']) ? ' is-invalid' : ''; ?>">
                <label class="field__label" for="name">Your name</label>
                <input
                  class="field__control"
                  type="text"
                  id="name"
                  name="name"
                  autocomplete="name"
                  placeholder="Jane Doe"
                  aria-describedby="name-error"
                  required
                  value="<?php echo htmlspecialchars($oldInput['name'] ?? ''); ?>"
                />
                <p class="field__error" id="name-error">
                  <i class="bi bi-exclamation-circle" aria-hidden="true"></i>
                  Please enter your name.
                </p>
              </div>

              <div class="field<?php echo isset($formErrors['email']) ? ' is-invalid' : ''; ?>">
                <label class="field__label" for="email">Your email</label>
                <input
                  class="field__control"
                  type="email"
                  id="email"
                  name="email"
                  autocomplete="email"
                  placeholder="jane@example.com"
                  aria-describedby="email-error"
                  required
                  value="<?php echo htmlspecialchars($oldInput['email'] ?? ''); ?>"
                />
                <p class="field__error" id="email-error">
                  <i class="bi bi-exclamation-circle" aria-hidden="true"></i>
                  Please enter a valid email address.
                </p>
              </div>

              <div class="field<?php echo isset($formErrors['message']) ? ' is-invalid' : ''; ?>">
                <label class="field__label" for="message">Your message</label>
                <textarea
                  class="field__control"
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="What would you like to build?"
                  aria-describedby="message-error"
                  required
                ><?php echo htmlspecialchars($oldInput['message'] ?? ''); ?></textarea>
                <p class="field__error" id="message-error">
                  <i class="bi bi-exclamation-circle" aria-hidden="true"></i>
                  Please enter a message.
                </p>
              </div>

              <div class="btn-row">
                <button class="btn btn--primary btn--lg" type="submit">
                  <span data-submit-label>Send message</span>
                  <i class="bi bi-send" aria-hidden="true"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

  </main>

  <?php require __DIR__ . '/assets/php/footer.php'; ?>

  <script src="assets/js/error-handler.js"></script>
  <script src="assets/js/theme.js" defer></script>
  <script src="assets/js/navigation.js" defer></script>
  <script src="assets/js/animations.js" defer></script>
  <script src="assets/js/arcade-embed.js" defer></script>
  <script src="assets/js/form.js" defer></script>
  <script src="assets/js/consoleLog.js" defer></script>
  <script src="assets/js/easter-egg.js" defer></script>
</body>

</html>
