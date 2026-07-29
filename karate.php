<?php
require __DIR__ . '/assets/php/data/karate.php';

$pageTitle = 'My Karate Journey — Selina Mogicato';
$pageDescription = 'Shotokan karate at Kaisho Karate Bassersdorf: belts, competitions and teaching children — the journey Selina Mogicato began in 2016.';
$canonicalPath = '/karate';
$pageStyles = ['assets/css/pages/karate.css'];

$navPrefix = 'index.php';
$activePage = 'karate';
$navSpy = false;
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

    <!-- ================= Hero ================= -->
    <section class="karate-hero" aria-labelledby="karate-title">
      <div class="karate-hero__media">
        <img
          src="assets/images/karate-hero.png"
          alt=""
          width="1438" height="828"
          fetchpriority="high" decoding="async"
        />
      </div>
      <div class="karate-hero__scrim" aria-hidden="true"></div>

      <div class="container karate-hero__inner">
        <p class="eyebrow">Since 2016 · Shotokan</p>
        <h1 class="hero-title" id="karate-title">My Karate Journey</h1>
        <p class="body-large">
          Discovering strength, discipline and inner peace through martial
          arts — a journey that began in 2016 and still shapes who I am.
        </p>
        <div class="btn-row">
          <a class="btn btn--primary btn--lg" href="#journey">
            Explore my journey
            <i class="bi bi-arrow-down" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- ================= Journey ================= -->
    <section id="journey" class="section section--white" aria-labelledby="journey-title">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow eyebrow--accent">The path</p>
          <h2 class="section-title" id="journey-title">My path in karate</h2>
        </div>

        <div class="journey__grid">
          <div class="stack-lg reveal">
            <p class="body-large">
              I embarked on my karate journey in 2016, shortly after I decided
              to step away from ballet. A close friend of mine was already
              practising, and out of curiosity I joined her for a trial
              session. From the very first moment, I was captivated.
            </p>
            <p class="body measure">
              When I became a member of Kaisho Karate Bassersdorf it was a
              small, close-knit group, all around my age. The friendships I
              formed there have lasted a lifetime. Though many of the original
              members have since moved on, they were the ones who helped me
              discover my true passion.
            </p>
            <p class="body measure">
              As time passed, my love for karate only deepened. In 2025 I made
              the decision to start training children — an experience that has
              been incredibly rewarding. Seeing their progress, and knowing
              that they enjoy my training, brings me real joy. From day to day
              I take on more responsibility in my dojo.
            </p>
            <p class="body measure">
              I practise Shotokan karate, one of the oldest and most
              traditional styles, which resonates deeply with me: as someone
              who values tradition, it feels like a perfect fit. Since I train
              at two different dojos, I have also been influenced by the
              Shorin-Ryu style. Today I can&rsquo;t imagine my life without
              karate. It is more than a sport — it is a way of life. As cliché
              as that may sound, it is absolutely true.
            </p>
          </div>

          <div class="frame frame--raised journey__media reveal">
            <img
              src="assets/images/Karate.png"
              alt="Selina Mogicato training karate."
              width="775" height="778"
              loading="lazy" decoding="async"
              sizes="(max-width: 860px) 92vw, 40vw"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ================= Timeline ================= -->
    <section class="section section--wash" aria-labelledby="timeline-title">
      <div class="container">
        <div class="section-heading section-heading--center reveal">
          <p class="eyebrow eyebrow--accent">Timeline</p>
          <h2 class="section-title" id="timeline-title">Belts, competitions and milestones</h2>
          <p class="body-large section-heading__lead">
            From a white belt in 2016 to brown belt, international competition
            and coaching the next generation.
          </p>
        </div>

        <ol class="karate-timeline">
          <?php foreach ($karateTimeline as $entry): ?>
            <li class="karate-timeline__item karate-timeline__item--<?php echo $entry['type']; ?>">
              <p class="karate-timeline__date"><?php echo $entry['date']; ?></p>
              <div class="karate-timeline__body">
                <?php if ($entry['type'] === 'belt'): ?>
                  <p class="karate-timeline__marker">
                    <span class="belt-dot" aria-hidden="true"></span>Belt
                  </p>
                <?php endif; ?>
                <h3 class="title-xs"><?php echo $entry['title']; ?></h3>
                <p class="body-sm"><?php echo $entry['body']; ?></p>
              </div>
            </li>
          <?php endforeach; ?>
        </ol>
      </div>
    </section>

    <!-- ================= Philosophy ================= -->
    <section class="section section--white" aria-labelledby="philosophy-title">
      <div class="container container--content">
        <div class="section-heading reveal">
          <p class="eyebrow eyebrow--accent">Philosophy</p>
          <h2 class="section-title" id="philosophy-title">Mind, body, spirit</h2>
        </div>

        <div class="philosophy reveal-stagger">
          <?php foreach ($karatePhilosophy as $pillar): ?>
            <div class="philosophy__item">
              <i class="bi bi-<?php echo $pillar['icon']; ?>" aria-hidden="true"></i>
              <h3 class="title-xs"><?php echo $pillar['title']; ?></h3>
              <p class="body-sm"><?php echo $pillar['body']; ?></p>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- ================= Schedule ================= -->
    <section class="section surface-dark" aria-labelledby="schedule-title">
      <div class="container">
        <div class="section-heading section-heading--center reveal">
          <p class="eyebrow eyebrow--accent">Training</p>
          <h2 class="section-title" id="schedule-title">A week in the dojo</h2>
          <p class="body-large section-heading__lead">
            Four training days a week — some as a student, some teaching kids
            and youth.
          </p>
        </div>

        <ul class="schedule">
          <?php foreach ($karateSchedule as $day): ?>
            <li class="schedule__day">
              <p class="schedule__name"><?php echo $day['day']; ?></p>
              <ul class="schedule__sessions">
                <?php foreach ($day['sessions'] as $session): ?>
                  <li class="schedule__session">
                    <span class="schedule__activity"><?php echo $session['activity']; ?></span>
                    <span class="schedule__time"><?php echo $session['time']; ?></span>
                  </li>
                <?php endforeach; ?>
              </ul>
            </li>
          <?php endforeach; ?>
        </ul>
      </div>
    </section>

    <!-- ================= Club ================= -->
    <section class="section section--white" aria-labelledby="club-title">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow eyebrow--accent">My club</p>
          <h2 class="section-title" id="club-title">Kaisho Karate Bassersdorf</h2>
        </div>

        <div class="club__grid">
          <div class="reveal">
            <img
              class="club__logo"
              src="assets/images/Kaisho_Logo.JPG"
              alt="Kaisho Karate Bassersdorf club logo (AI generated)."
              width="245" height="325"
              loading="lazy" decoding="async"
            />
          </div>

          <div class="reveal">
            <div class="club__entry stack">
              <h3 class="title-xs">About the club</h3>
              <p class="body measure">
                Kaisho Karate Bassersdorf is where my karate journey began and
                continues to flourish. The club offers training in Shotokan
                karate and welcomes practitioners of all ages and skill levels.
              </p>
              <div class="btn-row">
                <a
                  class="btn btn--secondary"
                  href="https://www.kaisho-bassersdorf.ch/willkommen_kkb"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit club website
                  <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                </a>
              </div>
            </div>

            <div class="club__entry stack">
              <h3 class="title-xs">Kaisho DojoTime</h3>
              <p class="body measure">
                An organisation tool I developed for the club. It helps manage
                training schedules, member attendance and club events, and
                takes a good deal of manual administration off the trainers.
              </p>
              <ul class="tag-list">
                <li class="tag">TypeScript</li>
                <li class="tag">Supabase</li>
              </ul>
              <div class="btn-row">
                <a
                  class="btn btn--primary"
                  href="https://kaisho-dojotime.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open DojoTime
                  <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                </a>
                <a class="btn btn--secondary" href="index.php#project-dojotime">
                  See the project
                  <i class="bi bi-arrow-right" aria-hidden="true"></i>
                </a>
              </div>
            </div>
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
  <script src="assets/js/consoleLog.js" defer></script>
  <script src="assets/js/easter-egg.js" defer></script>
</body>

</html>
