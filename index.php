<?php
session_start();
require_once __DIR__ . '/tech-icons.php';

// Professional experience is counted from the start of the apprenticeship.
$careerStart = new DateTimeImmutable('2024-08-01');
$now = new DateTimeImmutable('now');
$experienceYears = $now > $careerStart
  ? floor(($careerStart->diff($now)->days / 365.25) * 10) / 10
  : 0;
$experienceLabel = number_format($experienceYears, 1) . ' years';

$projects = [
  [
    'slug' => 'momento',
    'title' => 'Momento App',
    'category' => 'personal',
    'year' => 'June 2026 – present',
    'image' => 'assets/images/momento_app_card.png',
    'summary' => 'A local-first iOS app for creating personal photo moments — adding stories, choosing the best shots, and exporting beautiful albums directly to Apple Photos.',
    'technologies' => ['Swift'],
    'liveUrl' => 'https://momento.mogicato.ch',
  ],
  [
    'slug' => 'homelab',
    'title' => 'HomeLab',
    'category' => 'personal',
    'year' => 'February 2026 – present',
    'image' => 'assets/images/homelab_card.png',
    'summary' => 'A self-built homelab running on a 2012 MacBook Pro. A hands-on way to learn server management, virtualization and networking while repurposing old hardware to host personal projects and experiment with different operating systems.',
    'technologies' => ['Linux', 'Docker', 'Nginx'],
  ],
  [
    'slug' => 'yumigo',
    'title' => 'Yumigo App',
    'category' => 'personal',
    'year' => 'July 2025 – present',
    'image' => 'assets/images/yumigo_app_card.png',
    'summary' => 'A mobile app that turns spontaneous food cravings into recipe suggestions. Users enter what they crave, browse curated recipes and filter by seasonality and location, encouraging mindful and seasonal eating. Built during the BBC Basislehrjahr.',
    'technologies' => ['React Native', 'Expo', 'JavaScript', 'Firebase'],
    'liveUrl' => 'https://yumigoapp.netlify.app/',
    'demoVideo' => 'assets/images/yumigo_app_video.mp4',
  ],
  [
    'slug' => 'work-portfolio',
    'title' => 'Work Portfolio',
    'category' => 'professional',
    'image' => 'assets/images/work_portfolio_card.png',
    'summary' => 'A dedicated portfolio developed for my professional environment, showcasing projects, achievements, and technical growth within my apprenticeship.',
    'technologies' => ['React', 'Tailwind CSS', 'Vite'],
    'liveUrl' => 'https://selina.sunrise-avengers.ch',
  ],
  [
    'slug' => 'kaisho-dojotime',
    'title' => 'Kaisho DojoTime',
    'category' => 'personal',
    'image' => 'assets/images/kaisho_dojotime_card.png',
    'summary' => 'An organisation tool developed for my Karate club, Kaisho Karate Bassersdorf. It helps manage training schedules, trainer assignments and club events efficiently, streamlining club administration and improving communication.',
    'technologies' => ['TypeScript', 'Supabase'],
    'liveUrl' => 'https://kaisho-dojotime.netlify.app/',
  ],
  [
    'slug' => 'rummy',
    'title' => 'Rummy Website',
    'category' => 'personal',
    'image' => 'assets/images/rummy_card.png',
    'summary' => 'A modern web tool for managing Rummy games with innovative features and an intuitive UI. Originally built as my final secondary school project for family use.',
    'technologies' => ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL', 'Bootstrap'],
    'liveUrl' => 'https://rummy.mogicato.ch/',
  ],
];
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Selina Mogicato</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/devicon.min.css">

  <link rel="stylesheet" href="assets/css/variables.css">
  <link rel="stylesheet" href="assets/css/base.css">
  <link rel="stylesheet" href="assets/css/utilities.css">
  <link rel="stylesheet" href="assets/css/components/navbar.css">
  <link rel="stylesheet" href="assets/css/components/hero.css">
  <link rel="stylesheet" href="assets/css/components/about.css">
  <link rel="stylesheet" href="assets/css/components/projects.css">
  <link rel="stylesheet" href="assets/css/components/contact.css">
  <link rel="stylesheet" href="assets/css/enhanced-effects.css">
  <link rel="stylesheet" href="assets/css/professional-effects.css">

  <link rel="icon" type="image/png" href="assets/images/favicon/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="assets/images/favicon/favicon.svg" />
  <link rel="shortcut icon" href="assets/images/favicon/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="assets/images/favicon/apple-touch-icon.png" />
  <link rel="manifest" href="assets/images/favicon/site.webmanifest" />

  <!-- Theme initialization script - must be in head to prevent FOUC -->
  <script src="assets/js/theme-init.js"></script>
</head>

<body>
  <!-- Skip to content link for accessibility -->
  <a href="#home" class="skip-link">Skip to main content</a>

  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img src="assets/images/Logo.png" alt="SM Logo" height="30" class="d-inline-block align-text-top me-2">
        Selina Mogicato
      </a>
      <div class="theme-toggle">
        <button class="theme-toggle-btn" aria-label="Toggle theme">
          <i class="bi bi-moon-fill"></i>
        </button>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="#home">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
          <li class="nav-item"><a class="nav-link" href="#projects">Projects</a></li>
          <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
          <li class="nav-item"><a class="nav-link" href="karate.html">Karate</a></li>
          <li class="nav-item"><a class="nav-link" href="imprint.html">Imprint</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section id="home" class="hero-section">
    <div class="container h-100">
      <div class="row h-100 align-items-center">
        <div class="col-lg-8">
          <p class="welcome-text">Hi, I'm</p>
          <h1 class="name">Selina Mogicato</h1>
          <h2 class="title typing-cursor">Apprentice Application Developer</h2>
          <p class="description">
            I'm a creative developer who loves building
            modern, functional, and user-focused digital experiences —
            from clean frontends to robust backend systems.
          </p>
          <p class="mb-4 text-secondary">
            <i class="bi bi-geo-alt-fill me-2"></i>Switzerland ·
            <i class="bi bi-mortarboard-fill me-2 ms-3"></i>Apprentice Application Developer · BMS
          </p>
          <a href="#projects" class="cta-btn">View My Work</a>
        </div>
        <div class="col-lg-4 d-none d-lg-block text-center">
          <img src="assets/images/Logo.png" alt="Selina Mogicato Logo" class="hero-logo-large img-fluid">
        </div>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="section-padding">
    <div class="container">
      <h2 class="section-title">About Me</h2>
      <div class="row">
        <div class="col-md-6">
          <p>
            I am currently completing my apprenticeship as an <strong>application developer</strong> while attending the <strong>Vocational Baccalaureate School (BMS-W)</strong>.
            My focus lies in building <strong>clean, scalable, and well-structured web applications</strong> that are both technically solid and pleasant to use.
          </p>
          <p>
            I enjoy working across the full stack and care deeply about:
          </p>
          <ul class="mb-4 text-secondary">
            <li>Clear architecture</li>
            <li>Maintainable code</li>
            <li>Thoughtful user experience</li>
            <li>Real-world usability</li>
          </ul>

          <div class="quick-facts">
            <div class="quick-fact">
              <span class="quick-fact-label">Work Experience</span>
              <span class="quick-fact-value"><?php echo htmlspecialchars($experienceLabel); ?></span>
            </div>
            <div class="quick-fact">
              <span class="quick-fact-label">Programming Since</span>
              <span class="quick-fact-value">Early 2019</span>
            </div>
            <div class="quick-fact quick-fact--wide">
              <span class="quick-fact-label">Languages</span>
              <span class="quick-fact-value">German, Italian, English, French, learning Spanish</span>
            </div>
            <div class="quick-fact quick-fact--wide">
              <span class="quick-fact-label">Interests</span>
              <span class="quick-fact-value">Software Development, Frontend Development, UI/UX Design, AI</span>
            </div>
          </div>

        </div>
        <div class="col-md-6">
          <div class="about-image">
            <img src="assets/images/Portrait.png" alt="Profilepicture Selina Mogicato" class="profile-img">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
            <div class="skills-container">
              <h3>Tech Stack</h3>

              <div class="skill-categories">
              <div class="skill-category">
                <h4 class="skill-category-title">Languages</h4>
                <div class="skill-tags">
                  <span class="skill-tag"><?php echo tech_tag('Java'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('HTML'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('CSS'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('JavaScript'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('TypeScript'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('PHP'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Python'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Markdown'); ?></span>
                </div>
              </div>

              <div class="skill-category">
                <h4 class="skill-category-title">Frontend</h4>
                <div class="skill-tags">
                  <span class="skill-tag"><?php echo tech_tag('React'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Vue.js'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Next.js'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Vite'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Tailwind'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Bootstrap'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('React Router'); ?></span>
                </div>
              </div>

              <div class="skill-category">
                <h4 class="skill-category-title">Mobile</h4>
                <div class="skill-tags">
                  <span class="skill-tag"><?php echo tech_tag('React Native'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Expo'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Swift'); ?></span>
                </div>
              </div>

              <div class="skill-category">
                <h4 class="skill-category-title">Backend & Frameworks</h4>
                <div class="skill-tags">
                  <span class="skill-tag"><?php echo tech_tag('Spring Boot'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Node.js'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Flask'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Rust'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('NPM'); ?></span>
                </div>
              </div>

              <div class="skill-category">
                <h4 class="skill-category-title">Databases & Backend Services</h4>
                <div class="skill-tags">
                  <span class="skill-tag"><?php echo tech_tag('MySQL'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('PostgreSQL'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('MongoDB'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Redis'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('SQLite'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Firebase'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Supabase'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('MariaDB'); ?></span>
                </div>
              </div>

              <div class="skill-category">
                <h4 class="skill-category-title">Hosting & Deployment</h4>
                <div class="skill-tags">
                  <span class="skill-tag"><?php echo tech_tag('Vercel'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Netlify'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Nginx'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Docker'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Server Hosting'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('FTP'); ?></span>
                </div>
              </div>

              <div class="skill-category">
                <h4 class="skill-category-title">CI/CD & Version Control</h4>
                <div class="skill-tags">
                  <span class="skill-tag"><?php echo tech_tag('Git'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('GitHub'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('GitLab'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('GitLab CI'); ?></span>
                </div>
              </div>

              <div class="skill-category">
                <h4 class="skill-category-title">Testing & Code Quality</h4>
                <div class="skill-tags">
                  <span class="skill-tag"><?php echo tech_tag('Vitest'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Jest'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Postman'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Swagger'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Prettier'); ?></span>
                </div>
              </div>

              <div class="skill-category">
                <h4 class="skill-category-title">Monitoring & Tooling</h4>
                <div class="skill-tags">
                  <span class="skill-tag"><?php echo tech_tag('Grafana'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Gradle'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Prometheus'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Swagger'); ?></span>
                </div>
              </div>

              <div class="skill-category">
                <h4 class="skill-category-title">Design & Presentation</h4>
                <div class="skill-tags">
                  <span class="skill-tag"><?php echo tech_tag('Figma'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Canva'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Prezi'); ?></span>
                </div>
              </div>

              <div class="skill-category">
                <h4 class="skill-category-title">Operating Systems</h4>
                <div class="skill-tags">
                  <span class="skill-tag"><?php echo tech_tag('macOS'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Windows 11'); ?></span>
                  <span class="skill-tag"><?php echo tech_tag('Linux'); ?></span>
                </div>
              </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section id="projects" class="section-padding">
    <div class="container">
      <h2 class="section-title">My Projects</h2>
      <p class="section-lead">
        A selection of things I have built — from mobile apps and club tooling to my own
        self-hosted infrastructure. Select a project to see the details.
      </p>
      <div class="row g-4 project-grid">
        <?php foreach ($projects as $project): ?>
          <div class="col-md-6 col-lg-4">
            <article class="project-card" tabindex="0" role="button"
              aria-label="<?php echo htmlspecialchars('View details for ' . $project['title']); ?>"
              data-project='<?php echo htmlspecialchars(json_encode($project, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), ENT_QUOTES); ?>'>
              <div class="project-image <?php echo htmlspecialchars($project['imageClass'] ?? ''); ?>">
                <img src="<?php echo htmlspecialchars($project['image']); ?>"
                  alt="<?php echo htmlspecialchars($project['title']); ?> screenshot"
                  class="project-img" loading="lazy" decoding="async">
                <span class="project-badge"><?php echo $project['category'] === 'professional' ? 'Professional' : 'Personal'; ?></span>
              </div>
              <div class="project-content">
                <div class="project-heading">
                  <h3><?php echo htmlspecialchars($project['title']); ?></h3>
                  <?php if (!empty($project['year'])): ?>
                    <span class="project-year"><?php echo htmlspecialchars($project['year']); ?></span>
                  <?php endif; ?>
                </div>
                <p class="project-summary"><?php echo htmlspecialchars($project['summary']); ?></p>
                <div class="project-tags">
                  <?php foreach ($project['technologies'] as $tech): ?>
                    <span><?php echo tech_tag($tech); ?></span>
                  <?php endforeach; ?>
                </div>
                <div class="project-links">
                  <?php if (!empty($project['liveUrl'])): ?>
                    <a href="<?php echo htmlspecialchars($project['liveUrl']); ?>" class="project-link" target="_blank"
                      rel="noopener noreferrer">
                      <i class="bi bi-box-arrow-up-right me-1"></i>Launch
                    </a>
                  <?php endif; ?>
                  <?php if (!empty($project['demoVideo'])): ?>
                    <button type="button" class="project-link project-video-btn"
                      data-video="<?php echo htmlspecialchars($project['demoVideo']); ?>">
                      <i class="bi bi-play-circle me-1"></i>Demo Video
                    </button>
                  <?php endif; ?>
                </div>
              </div>
            </article>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- Project detail modal -->
  <div class="project-modal" id="projectModal" hidden>
    <div class="project-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="projectModalTitle">
      <button type="button" class="project-modal-close" aria-label="Close"><i class="bi bi-x-lg"></i></button>
      <div class="project-modal-media">
        <img src="" alt="" id="projectModalImage">
      </div>
      <div class="project-modal-body">
        <div class="project-modal-meta">
          <span class="project-badge" id="projectModalCategory"></span>
          <span class="project-year" id="projectModalYear"></span>
        </div>
        <h2 id="projectModalTitle"></h2>
        <h3 class="project-modal-label">Description</h3>
        <p id="projectModalSummary"></p>
        <h3 class="project-modal-label">Technologies</h3>
        <div class="project-tags" id="projectModalTags"></div>
        <div class="project-links" id="projectModalLinks"></div>
      </div>
    </div>
  </div>

  <!-- Video modal -->
  <div class="video-modal" id="videoModal" hidden>
    <div class="video-modal-dialog" role="dialog" aria-modal="true" aria-label="Project demo video">
      <button type="button" class="video-modal-close" aria-label="Close video"><i class="bi bi-x-lg"></i></button>
      <video id="videoModalPlayer" controls playsinline></video>
    </div>
  </div>
  <!-- Contact Section -->
  <section id="contact" class="section-padding">
    <div class="container">
      <h2 class="section-title text-center mb-4">Get In Touch</h2>
      <div class="row justify-content-center">
        <div class="col-md-8">

          <!-- Display Success Message -->
          <?php if (isset($_SESSION['success'])): ?>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              <i class="bi bi-check-circle-fill"></i> <?php echo $_SESSION['success']; ?>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <?php unset($_SESSION['success']);
            unset($_SESSION['old_input']); ?>
          <?php endif; ?>

          <!-- Display Validation Errors -->
          <?php if (isset($_SESSION['errors'])): ?>
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
              <i class="bi bi-exclamation-triangle-fill"></i> <strong>There were some issues:</strong>
              <ul class="mb-0">
                <?php foreach ($_SESSION['errors'] as $error): ?>
                  <li><?php echo htmlspecialchars($error); ?></li>
                <?php endforeach; ?>
              </ul>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <?php unset($_SESSION['errors']); ?>
          <?php endif; ?>

          <!-- Contact Form -->
          <form class="contact-form needs-validation" action="sendMail.php" method="POST" novalidate>
            <div class="mb-3">
              <label for="name" class="form-label">Your Name</label>
              <input type="text" name="name" id="name" class="form-control"
                placeholder="Your Name" value="<?php echo htmlspecialchars($_SESSION['old_input']['name'] ?? ''); ?>" required>
              <div class="invalid-feedback">Please enter your name.</div>
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Your Email</label>
              <input type="email" name="email" id="email" class="form-control"
                placeholder="Your Email" value="<?php echo htmlspecialchars($_SESSION['old_input']['email'] ?? ''); ?>" required>
              <div class="invalid-feedback">Please enter a valid email address.</div>
            </div>

            <div class="mb-3">
              <label for="message" class="form-label">Your Message</label>
              <textarea name="message" id="message" class="form-control" rows="5"
                placeholder="Your Message" required><?php echo htmlspecialchars($_SESSION['old_input']['message'] ?? ''); ?></textarea>
              <div class="invalid-feedback">Please enter your message.</div>
            </div>

            <button type="submit" class="cta-btn btn btn-primary">Send Message</button>
          </form>

        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <p class="footer-brand-name">Selina Mogicato</p>
          <p class="footer-tagline">
            Passionate about new technologies and software development.
          </p>
          <div class="footer-socials">
            <a href="https://www.linkedin.com/in/selina-mogicato-a48166316" aria-label="LinkedIn" title="LinkedIn" target="_blank" rel="noopener noreferrer"><i class="bi bi-linkedin"></i></a>
            <a href="https://github.com/Selimo100" aria-label="GitHub" title="GitHub" target="_blank" rel="noopener noreferrer"><i class="bi bi-github"></i></a>
            <a href="mailto:selimo.contact@gmail.com" aria-label="Email" title="Email"><i class="bi bi-envelope"></i></a>
            </div>
        </div>

        <nav class="footer-nav" aria-label="Footer">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="karate.html">Karate</a></li>
            <li><a href="imprint.html">Imprint</a></li>
          </ul>
        </nav>
      </div>

      <div class="footer-bottom">
        <p>&copy; <span data-current-year>2026</span> Selina Mogicato. All rights reserved.</p>
        <p>Made in Zurich, Switzerland</p>
      </div>
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="assets/js/error-handler.js"></script>
  <script src="assets/js/theme.js"></script>
  <script src="assets/js/navigation.js"></script>
  <script src="assets/js/animations.js"></script>
  <script src="assets/js/form.js"></script>
  <script src="assets/js/projects.js"></script>
  <script src="assets/js/consoleLog.js"></script>
  <script src="assets/js/easter-egg.js"></script>
</body>

</html>