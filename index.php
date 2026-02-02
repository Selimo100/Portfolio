<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Selina Mogicato</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

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
          <p class="welcome-text">Hi</p>
          <h1 class="name">Selina Mogicato</h1>
          <h2 class="title typing-cursor">Apprentice Application Developer · Full-Stack Web Developer</h2>
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
      <div class="row align-items-center">
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

          <div class="skills-container">
            <h3>Tech Stack</h3>

            <div class="skill-category">
              <h4 class="skill-category-title">Languages</h4>
              <div class="skill-tags">
                <span class="skill-tag">Java</span>
                <span class="skill-tag">HTML</span>
                <span class="skill-tag">CSS</span>
                <span class="skill-tag">JavaScript</span>
                <span class="skill-tag">TypeScript</span>
                <span class="skill-tag">PHP</span>
                <span class="skill-tag">Python</span>
                <span class="skill-tag">Markdown</span>
              </div>
            </div>

            <div class="skill-category">
              <h4 class="skill-category-title">Frontend</h4>
              <div class="skill-tags">
                <span class="skill-tag">React</span>
                <span class="skill-tag">Vue.js</span>
                <span class="skill-tag">Next.js</span>
                <span class="skill-tag">Vite</span>
                <span class="skill-tag">Tailwind</span>
                <span class="skill-tag">Bootstrap</span>
                <span class="skill-tag">React Router</span>
              </div>
            </div>

            <div class="skill-category">
              <h4 class="skill-category-title">Mobile</h4>
              <div class="skill-tags">
                <span class="skill-tag">React Native</span>
                <span class="skill-tag">Expo</span>
              </div>
            </div>

            <div class="skill-category">
              <h4 class="skill-category-title">Backend & Frameworks</h4>
              <div class="skill-tags">
                <span class="skill-tag">Spring Boot</span>
                <span class="skill-tag">Node.js</span>
                <span class="skill-tag">Flask</span>
                <span class="skill-tag">NPM</span>
              </div>
            </div>

            <div class="skill-category">
              <h4 class="skill-category-title">Databases & Backend Services</h4>
              <div class="skill-tags">
                <span class="skill-tag">MySQL</span>
                <span class="skill-tag">PostgreSQL</span>
                <span class="skill-tag">MongoDB</span>
                <span class="skill-tag">Redis</span>
                <span class="skill-tag">SQLite</span>
                <span class="skill-tag">Firebase</span>
                <span class="skill-tag">Supabase</span>
                <span class="skill-tag">MariaDB</span>
              </div>
            </div>

            <div class="skill-category">
              <h4 class="skill-category-title">Hosting & Deployment</h4>
              <div class="skill-tags">
                <span class="skill-tag">Vercel</span>
                <span class="skill-tag">Netlify</span>
                <span class="skill-tag">Nginx</span>
                <span class="skill-tag">Docker</span>
              </div>
            </div>

            <div class="skill-category">
              <h4 class="skill-category-title">CI/CD & Version Control</h4>
              <div class="skill-tags">
                <span class="skill-tag">Git</span>
                <span class="skill-tag">GitHub</span>
                <span class="skill-tag">GitLab</span>
                <span class="skill-tag">GitLab CI</span>
              </div>
            </div>

            <div class="skill-category">
              <h4 class="skill-category-title">Testing & Code Quality</h4>
              <div class="skill-tags">
                <span class="skill-tag">Vitest</span>
                <span class="skill-tag">Jest</span>
                <span class="skill-tag">Prettier</span>
              </div>
            </div>

            <div class="skill-category">
              <h4 class="skill-category-title">Monitoring & Tooling</h4>
              <div class="skill-tags">
                <span class="skill-tag">Grafana</span>
                <span class="skill-tag">Gradle</span>
                <span class="skill-tag">Prometheus</span>
                <span class="skill-tag">Swagger</span>
              </div>
            </div>

            <div class="skill-category">
              <h4 class="skill-category-title">Design & Presentation</h4>
              <div class="skill-tags">
                <span class="skill-tag">Figma</span>
                <span class="skill-tag">Canva</span>
                <span class="skill-tag">Prezi</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="about-image">
            <img src="assets/images/Portrait.png" alt="Profilepicture Selina Mogicato" class="profile-img">
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section id="projects" class="section-padding">
    <div class="container">
      <h2 class="section-title">My Projects</h2>
      <div class="row g-4">
        <!-- Project Card 1 -->
        <div class="col-md-6">
          <div class="project-card">
            <div class="project-image">
              <img src="assets/images/yumigo_app_project.jpg" alt="Yumigo App Screenshot" class="project-img">
            </div>
            <div class="project-content">
              <h3>Yumigo App</h3>
              <p>
                A mobile app that turns spontaneous food cravings into seasonal recipe suggestions.
              </p>
              <div class="project-tags">
                <span>React Native</span>
                <span>Expo</span>
                <span>Firebase</span>
              </div>
              <div class="project-links">
                <a href="https://yumigoapp.netlify.app/" class="project-link" target="_blank">
                  <i class="bi bi-eye me-1"></i>View Project
                </a>
                <a href="assets/images/yumigo_app_video.mp4" class="project-link" target="_blank">
                  <i class="bi bi-play-circle me-1"></i>Demo Video
                </a>
              </div>
            </div>
          </div>
        </div><!-- Project Card 2 -->
        <div class="col-md-6">
          <div class="project-card">
            <div class="project-image">
              <img src="assets/images/Rummy.png" alt="Rummy Websites Screenshot" class="project-img">
            </div>
            <div class="project-content">
              <h3>Rummy Websites</h3>
              <p>
                A modern web tool for managing Rummy games with innovative features and an intuitive UI.
                Originally built as my final secondary school project for family use.
              </p>
              <div class="project-tags">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
                <span>PHP</span>
                <span>SQL</span>
                <span>Bootstrap</span>
              </div>
              <div class="project-links">
                <a href="https://rummy.mogicato.ch/" class="project-link" target="_blank">
                  <i class="bi bi-eye me-1"></i>View Project
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- next-->
        <div class="col-md-6">
          <div class="project-card">
            <div class="project-image">
              <img src="assets/images/portfolio_bbc.png" alt="Portfolio Berufbildungscenter Websites Screenshot"
                class="project-img">
            </div>
            <div class="project-content">
              <h3>Portfolio Berufbildungscenter</h3>
              <p>
                A personal portfolio showcasing my journey as an apprentice application developer.
                Built completely from scratch without any framework.
              </p>
              <div class="project-tags">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
              </div>
              <div class="project-links">
                <a href="https://selina.mogicato.ch/Portfolio_bbc/" class="project-link" target="_blank">
                  <i class="bi bi-eye me-1"></i>View Project
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Work Portfolio -->
        <div class="col-md-6">
          <div class="project-card">
            <div class="project-image">
              <img src="assets/images/selina-working.png" alt="Work Portfolio Screenshot" class="project-img">
            </div>
            <div class="project-content">
              <h3>Work Portfolio</h3>
              <p>
                A dedicated portfolio developed for my professional environment, showcasing projects,
                achievements, and technical growth within my apprenticeship.
              </p>
              <div class="project-links">
                <a href="https://selina.sunrise-avengers.ch" class="project-link" target="_blank">
                  <i class="bi bi-eye me-1"></i>View Project
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- Kaisho DojoTime Project -->
        <div class="col-md-6">
          <div class="project-card">
            <div class="project-image logo-image">
              <img src="assets/images/Kaisho-DojoTime.png" alt="Kaisho DojoTime App Screenshot" class="project-img">
            </div>
            <div class="project-content">
              <h3>Kaisho DojoTime</h3>
              <p>
                An organisation tool developed for my Karate club, Kaisho Karate Bassersdorf. It helps manage
                training schedules, who are the trainers, and club events efficiently. Built with modern
                technologies to streamline club administration and improve communication.
              </p>
              <div class="project-tags">
                <span>TypeScript</span>
                <span>Supabase</span>
              </div>
              <div class="project-links">
                <a href="https://kaisho-dojotime.netlify.app/" class="project-link" target="_blank">
                  <i class="bi bi-eye me-1"></i>View Project
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
  </section>

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
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <div class="social-links">
            <a href="https://www.instagram.com/selina.mogi" class="social-link" target="_blank" title="Instagram">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="https://snapchat.com/t/hR0kXwyE" class="social-link" target="_blank" title="Snapchat">
              <i class="bi bi-snapchat"></i>
            </a>
            <a href="https://www.facebook.com/selina.mogicato" class="social-link" target="_blank" title="Facebook">
              <i class="bi bi-facebook"></i>
            </a>
            <a href="https://www.linkedin.com/in/selina-mogicato-a48166316" class="social-link" target="_blank" title="LinkedIn">
              <i class="bi bi-linkedin"></i>
            </a>
            <a href="https://x.com/SMogicat" class="social-link" target="_blank" title="X (Twitter)">
              <i class="bi bi-twitter-x"></i>
            </a>
            <a href="https://www.youtube.com/@SelinaMogicato" class="social-link" target="_blank" title="YouTube">
              <i class="bi bi-youtube"></i>
            </a>
            <a href="https://github.com/Selimo100" class="social-link" target="_blank" title="GitHub">
              <i class="bi bi-github"></i>
            </a>
          </div>
          <div class="container text-center">
            <p>Designed &amp; Built by Selina Mogicato</p>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="assets/js/error-handler.js"></script>
  <script src="assets/js/theme.js"></script>
  <script src="assets/js/navigation.js"></script>
  <script src="assets/js/animations.js"></script>
  <script src="assets/js/form.js"></script>
  <script src="assets/js/consoleLog.js"></script>
  <script src="assets/js/easter-egg.js"></script>
</body>

</html>