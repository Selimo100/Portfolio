<?php
/**
 * Maps a technology name to an icon class.
 * Devicon where available, Bootstrap Icons as a fallback.
 */
function tech_icon_class(string $tech): string
{
  static $icons = [
    // Languages
    'java' => 'devicon-java-plain colored',
    'html' => 'devicon-html5-plain colored',
    'css' => 'devicon-css3-plain colored',
    'javascript' => 'devicon-javascript-plain colored',
    'typescript' => 'devicon-typescript-plain colored',
    'php' => 'devicon-php-plain colored',
    'python' => 'devicon-python-plain colored',
    'markdown' => 'devicon-markdown-original',
    'swift' => 'devicon-swift-plain colored',
    'rust' => 'devicon-rust-original',
    'sql' => 'devicon-mysql-original colored',

    // Frontend
    'react' => 'devicon-react-original colored',
    'vue.js' => 'devicon-vuejs-plain colored',
    'next.js' => 'devicon-nextjs-plain',
    'vite' => 'devicon-vite-original colored',
    'tailwind' => 'devicon-tailwindcss-original colored',
    'tailwind css' => 'devicon-tailwindcss-original colored',
    'bootstrap' => 'devicon-bootstrap-plain colored',
    'react router' => 'devicon-reactrouter-plain colored',

    // Mobile
    'react native' => 'devicon-react-original colored',
    'expo' => 'bi bi-phone',

    // Backend
    'spring boot' => 'devicon-spring-original colored',
    'node.js' => 'devicon-nodejs-plain colored',
    'flask' => 'devicon-flask-original',
    'npm' => 'devicon-npm-original-wordmark colored',

    // Databases
    'mysql' => 'devicon-mysql-original colored',
    'postgresql' => 'devicon-postgresql-plain colored',
    'mongodb' => 'devicon-mongodb-plain colored',
    'redis' => 'devicon-redis-plain colored',
    'sqlite' => 'devicon-sqlite-plain colored',
    'mariadb' => 'devicon-mariadb-original colored',
    'firebase' => 'devicon-firebase-plain colored',
    'supabase' => 'devicon-supabase-plain colored',

    // Hosting
    'vercel' => 'devicon-vercel-original',
    'netlify' => 'devicon-netlify-plain colored',
    'nginx' => 'devicon-nginx-original colored',
    'docker' => 'devicon-docker-plain colored',
    'server hosting' => 'bi bi-hdd-rack',
    'ftp' => 'bi bi-hdd-network',

    // CI/CD
    'git' => 'devicon-git-plain colored',
    'github' => 'devicon-github-original',
    'gitlab' => 'devicon-gitlab-plain colored',
    'gitlab ci' => 'devicon-gitlab-plain colored',
    'gradle' => 'devicon-gradle-original colored',

    // Testing
    'vitest' => 'devicon-vitest-plain colored',
    'jest' => 'devicon-jest-plain colored',
    'postman' => 'devicon-postman-plain colored',
    'swagger' => 'devicon-swagger-plain colored',
    'prettier' => 'bi bi-brush',

    // Monitoring
    'grafana' => 'devicon-grafana-plain colored',
    'prometheus' => 'devicon-prometheus-original colored',

    // Design
    'figma' => 'devicon-figma-plain colored',
    'canva' => 'devicon-canva-original colored',
    'prezi' => 'bi bi-easel',

    // OS
    'macos' => 'devicon-apple-original',
    'windows 11' => 'devicon-windows11-original colored',
    'linux' => 'devicon-linux-plain',
  ];

  return $icons[strtolower($tech)] ?? 'bi bi-code-slash';
}

/** Renders a technology label preceded by its icon. */
function tech_tag(string $tech): string
{
  return '<i class="' . tech_icon_class($tech) . '" aria-hidden="true"></i>'
    . htmlspecialchars($tech);
}
