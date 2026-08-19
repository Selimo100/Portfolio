<?php

declare(strict_types=1);

/**
 * Trusted knowledge base for the Momo portfolio assistant.
 *
 * Everything Momo is allowed to say about Selina must be contained here.
 * Only add information that is intended to be public.
 *
 * Project entries are reused from data/projects.php so the portfolio page and
 * the assistant never drift apart.
 */

$projects = require __DIR__ . '/projects.php';

$careerStart = new DateTimeImmutable('2024-08-01');
$now = new DateTimeImmutable('now');
$experienceYears = $now > $careerStart
    ? floor(($careerStart->diff($now)->days / 365.25) * 10) / 10
    : 0.0;

// Live top tracks, so Momo quotes the same list the About section shows.
require_once __DIR__ . '/../lib/spotify.php';
$topTracks = spotify_top_tracks(3, 'short_term');
$topTrackLabels = array_map(
    static fn(array $track): string => $track['name'] . ' by ' . $track['artists'],
    $topTracks
);

$projectEntries = array_map(static function (array $project): array {
    return [
        'title' => $project['title'],
        'type' => $project['category'] === 'professional' ? 'Professional project' : 'Personal project',
        'timeframe' => $project['year'] ?? 'No public timeframe stated in the portfolio',
        'description' => $project['summary'],
        'technologies' => $project['technologies'],
        'link' => $project['liveUrl'] ?? null,
    ];
}, $projects);

return [
    'identity' => [
        'name' => 'Selina Mogicato',
        'role' => 'Apprentice Application Developer',
        'location' => 'Zurich, Switzerland',
        'portfolio' => 'https://selina.mogicato.ch',
        'tagline' => 'A creative developer who builds modern, functional and user-focused digital experiences, from clean frontends to robust backend systems.',
    ],

    'about' => [
        'summary' => 'Selina is completing her apprenticeship as an application developer while attending the Vocational Baccalaureate School (BMS-W). Her focus is on clean, scalable and well-structured web applications that are technically solid and pleasant to use.',
        'values' => [
            'Clear architecture',
            'Maintainable code',
            'Thoughtful user experience',
            'Real-world usability',
        ],
        'programming_since' => 'Early 2019',
        'professional_experience' => number_format($experienceYears, 1) . ' years (counted from the start of the apprenticeship in August 2024)',
        'spoken_languages' => ['German', 'Italian', 'English', 'French', 'currently learning Spanish'],
        'works_across' => 'Full stack: frontend, backend, mobile and self-hosted infrastructure.',
    ],

    'education' => [
        'apprenticeship' => 'Apprenticeship as an application developer, started in August 2024. The first year was completed at the BBC Basislehrjahr, where projects such as the Yumigo App were built.',
        'vocational_school' => 'Attends the Vocational Baccalaureate School (BMS-W, business focus) alongside the apprenticeship.',
        'previous' => 'Built the Rummy website as her final secondary school project.',
        'focus' => 'Modern web technologies and software development practices.',
    ],

    'skills' => [
        'languages' => ['Java', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'PHP', 'Python', 'Markdown'],
        'frontend' => ['React', 'Vue.js', 'Next.js', 'Vite', 'Tailwind CSS', 'Bootstrap', 'React Router'],
        'mobile' => ['React Native', 'Expo', 'Swift'],
        'backend' => ['Spring Boot', 'Node.js', 'Flask', 'Rust', 'NPM'],
        'databases' => ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Firebase', 'Supabase', 'MariaDB'],
        'hosting' => ['Vercel', 'Netlify', 'Nginx', 'Docker', 'Server hosting', 'FTP'],
        'version_control' => ['Git', 'GitHub', 'GitLab', 'GitLab CI'],
        'testing' => ['Vitest', 'Jest', 'Postman', 'Swagger', 'Prettier'],
        'monitoring_tooling' => ['Grafana', 'Gradle', 'Prometheus'],
        'design' => ['Figma', 'Canva', 'Prezi'],
        'operating_systems' => ['macOS', 'Windows 11', 'Linux'],
    ],

    'projects' => $projectEntries,

    'interests' => [
        'professional' => ['Software development', 'Frontend development', 'UI/UX design', 'Artificial intelligence'],
        'karate' => [
            'summary' => 'Selina has practised karate at Kaisho Karate Bassersdorf since 2016 and has also been introduced to elements of Shorin-Ryu. The portfolio has a dedicated Karate page.',
            'current_belt' => 'Brown Belt, achieved on 18 September 2025',
            'teaching' => 'Since 2025 she teaches children and youth groups at the club, and completed the J+S 1418Coach course in June 2026.',
            'competitions' => [
                'Nicki Cup in Austria (2025 and 2026)',
                'Zürcher Kantonalmeisterschaften regional achievements in 2024, 2025 and 2026',
            ],
            'related_project' => 'Kaisho DojoTime, an organisation tool she built for the club.',
        ],
        'music' => [
            'summary' => 'Music is one of Selina\'s biggest passions. It accompanies almost everything she does, from long development sessions to karate training and studying.',
            'top_tracks' => $topTrackLabels,
            'top_tracks_note' => $topTrackLabels === []
                ? 'The live Spotify list is currently unavailable.'
                : 'These are her three most streamed songs of the last four weeks, pulled live from the Spotify API and shown in the About section of the portfolio.',
        ],
        'other' => 'Runs a self-built homelab on a 2012 MacBook Pro to learn server management, virtualization and networking. The portfolio also contains a small hidden arcade with browser games.',
    ],

    'portfolio_site' => [
        'sections' => ['Home', 'About', 'Projects', 'Contact', 'Karate page', 'Imprint page'],
        'built_with' => 'PHP, handcrafted CSS and vanilla JavaScript, with a light and dark theme.',
        'extras' => 'A hidden arcade section with several browser games and easter eggs.',
    ],

    'contact' => [
        'note' => 'Use the contact form in the Contact section of the portfolio for enquiries, collaborations or job-related questions.',
        'email' => 'selimo.contact@gmail.com',
        'linkedin' => 'https://www.linkedin.com/in/selina-mogicato-a48166316',
        'github' => 'https://github.com/Selimo100',
    ],
];
