<?php

/**
 * Shared project data.
 *
 * Read by data/profile-context.php to build the knowledge base for the Momo chat
 * assistant. The front end renders its project cards from src/lib/content.ts, so
 * keep the two in step whenever a project is added or changed.
 */

return [
  [
    'slug' => 'vibra',
    'title' => 'Vibra',
    'category' => 'personal',
    'year' => 'August 2026',
    'image' => 'assets/images/vibra.svg',
    'summary' => 'My own music player powered by Spotify, built as a private project to give listening a more personal interface and flow.',
    'technologies' => ['Spotify Developer API', 'TypeScript'],
    'liveUrl' => 'https://selina.mogicato.ch/vibra',
  ],
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
