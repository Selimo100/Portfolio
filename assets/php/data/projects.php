<?php
/**
 * Portfolio project data.
 *
 * Single source of truth for both the featured sections and the secondary
 * grid, so a project is never described twice in markup.
 */

$featuredProjects = [
    [
        'id' => 'yumigo',
        'name' => 'Yumigo',
        'tagline' => 'Seasonal recipes for spontaneous cravings',
        'summary' => 'A mobile app that turns spontaneous food cravings into seasonal recipe suggestions.',
        'context' => 'Mobile app, built with Expo and shipped to the web as a preview build.',
        'tech' => ['React Native', 'Expo', 'Firebase'],
        // The only product footage that exists is a screen recording, so it
        // is the feature media; the logo runs above the title as a brand mark.
        'logo' => [
            'src' => 'assets/images/yumigo_app_project.jpg',
            'alt' => 'Yumigo logo.',
            'width' => 1179,
            'height' => 1145,
        ],
        'video' => [
            'src' => 'assets/images/yumigo_app_video.mp4',
            'label' => 'Screen recording of the Yumigo app: browsing seasonal recipe suggestions on a phone.',
            'width' => 480,
            'height' => 816,
            // Frame lifted from the recording itself, so the player shows the
            // app rather than its launch screen before playback starts.
            'poster' => 'assets/images/yumigo_app_poster.jpg',
        ],
        'media_modifier' => 'feature__media--phone',
        'surface' => 'feature--white',
        'links' => [
            ['url' => 'https://yumigoapp.netlify.app/', 'label' => 'View project', 'icon' => 'box-arrow-up-right', 'style' => 'btn--primary'],
        ],
    ],
    [
        'id' => 'rummy',
        'name' => 'Rummy',
        'tagline' => 'Scorekeeping for the whole family',
        'summary' => 'A web tool for managing Rummy games, with an intuitive interface for tracking rounds and scores. Originally built as my final secondary school project, for my own family to use.',
        'context' => 'Full-stack web app written from scratch, with a PHP backend and an SQL database.',
        'tech' => ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL', 'Bootstrap'],
        'image' => [
            'src' => 'assets/images/Rummy.png',
            'alt' => 'The Rummy web app with a running scoreboard for several players.',
            'width' => 1893,
            'height' => 896,
        ],
        'media_modifier' => 'feature__media--wide',
        'surface' => 'feature--dark surface-dark',
        'links' => [
            ['url' => 'https://rummy.mogicato.ch/', 'label' => 'View project', 'icon' => 'box-arrow-up-right', 'style' => 'btn--primary'],
        ],
    ],
    [
        'id' => 'dojotime',
        'name' => 'Kaisho DojoTime',
        'tagline' => 'Running a dojo without a spreadsheet',
        'summary' => 'An organisation tool I developed for my karate club, Kaisho Karate Bassersdorf. It keeps training schedules, who is teaching which session, and club events in one place, so the club spends less time on administration and communicates more clearly.',
        'context' => 'Built for a real club and in use by its members and trainers.',
        'tech' => ['TypeScript', 'Supabase'],
        'image' => [
            'src' => 'assets/images/Kaisho-DojoTime.png',
            'alt' => 'The Kaisho DojoTime interface showing the training schedule overview.',
            'width' => 1365,
            'height' => 592,
        ],
        'media_modifier' => 'feature__media--wide',
        'surface' => 'feature--wash',
        'links' => [
            ['url' => 'https://kaisho-dojotime.netlify.app/', 'label' => 'View project', 'icon' => 'box-arrow-up-right', 'style' => 'btn--primary'],
            ['url' => 'karate.php', 'label' => 'About the club', 'icon' => 'arrow-right', 'style' => 'btn--secondary'],
        ],
    ],
];

$otherProjects = [
    [
        'name' => 'Portfolio Berufsbildungscenter',
        'summary' => 'A portfolio documenting my journey as an apprentice application developer, built completely from scratch without a framework.',
        'tech' => ['HTML', 'CSS', 'JavaScript'],
        'url' => 'https://selina.mogicato.ch/Portfolio_bbc/',
        'image' => [
            'src' => 'assets/images/portfolio_bbc.png',
            'alt' => 'The Berufsbildungscenter portfolio homepage.',
            'width' => 1018,
            'height' => 544,
        ],
    ],
    [
        'name' => 'Work Portfolio',
        'summary' => 'A portfolio developed for my professional environment, collecting projects, achievements and technical growth during my apprenticeship.',
        'tech' => [],
        'url' => 'https://selina.sunrise-avengers.ch',
        'image' => [
            'src' => 'assets/images/selina-working.png',
            'alt' => 'The work portfolio site shown on a desktop screen.',
            'width' => 793,
            'height' => 531,
        ],
    ],
];

/** Skills, grouped as they appear in the portfolio. */
$skillGroups = [
    'Languages' => ['Java', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'PHP', 'Python', 'Markdown'],
    'Frontend' => ['React', 'Vue.js', 'Next.js', 'Vite', 'Tailwind', 'Bootstrap', 'React Router'],
    'Mobile' => ['React Native', 'Expo'],
    'Backend & frameworks' => ['Spring Boot', 'Node.js', 'Flask', 'NPM'],
    'Databases & backend services' => ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Firebase', 'Supabase', 'MariaDB'],
    'Hosting & deployment' => ['Vercel', 'Netlify', 'Nginx', 'Docker'],
    'CI/CD & version control' => ['Git', 'GitHub', 'GitLab', 'GitLab CI'],
    'Testing & code quality' => ['Vitest', 'Jest', 'Prettier'],
    'Monitoring & tooling' => ['Grafana', 'Gradle', 'Prometheus', 'Swagger'],
    'Design & presentation' => ['Figma', 'Canva', 'Prezi'],
];
