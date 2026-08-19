<?php

declare(strict_types=1);

/**
 * JSON feed for the "On repeat" card in the About page.
 *
 * The site is a static export, so the top tracks can no longer be rendered into
 * the page at request time — the browser asks for them here instead. The heavy
 * lifting (token refresh, on-disk caching) still lives in lib/spotify.php, so a
 * visitor almost never waits on Spotify itself.
 */

ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
// Matches the six-hour server-side cache in lib/spotify.php.
header('Cache-Control: public, max-age=1800');

require_once __DIR__ . '/lib/spotify.php';

$tracks = spotify_top_tracks(3, 'short_term');

$payload = array_map(
    static fn(array $track): array => [
        'title' => (string) ($track['name'] ?? ''),
        'artist' => (string) ($track['artists'] ?? ''),
        'url' => (string) ($track['url'] ?? ''),
        'cover' => (string) ($track['cover'] ?? ''),
    ],
    $tracks
);

echo json_encode(['tracks' => $payload], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
