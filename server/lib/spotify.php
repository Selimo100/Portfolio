<?php

declare(strict_types=1);

/**
 * Minimal Spotify Web API client for the "top tracks" widget in the About
 * section. Uses the Authorization Code flow: spotify-auth.php obtains a refresh
 * token once, this file trades it for short-lived access tokens as needed.
 *
 * The result is cached on disk so a page view never waits on Spotify.
 */

const SPOTIFY_CACHE_FILE = __DIR__ . '/../storage/spotify-top-tracks.json';
const SPOTIFY_CACHE_TTL = 6 * 3600;

// Bumped whenever the shape of a cached track changes, so old caches are dropped.
const SPOTIFY_CACHE_VERSION = 2;

/**
 * Merges environment variables with the optional config/spotify.php file.
 *
 * @return array{client_id:string,client_secret:string,redirect_uri:string,refresh_token:string}
 */
function spotify_config(): array
{
    static $config = null;
    if ($config !== null) {
        return $config;
    }

    $file = __DIR__ . '/../config/spotify.php';
    $fromFile = is_readable($file) ? require $file : [];

    $config = [
        'client_id' => (string) (getenv('SPOTIFY_CLIENT_ID') ?: ($fromFile['client_id'] ?? '')),
        'client_secret' => (string) (getenv('SPOTIFY_CLIENT_SECRET') ?: ($fromFile['client_secret'] ?? '')),
        'redirect_uri' => (string) (getenv('SPOTIFY_REDIRECT_URI') ?: ($fromFile['redirect_uri'] ?? '')),
        'refresh_token' => (string) (getenv('SPOTIFY_REFRESH_TOKEN') ?: ($fromFile['refresh_token'] ?? '')),
    ];

    return $config;
}

/**
 * Performs a POST against the Spotify token endpoint.
 *
 * @param array<string,string> $fields
 * @return array<string,mixed>|null
 */
function spotify_token_request(array $fields): ?array
{
    $config = spotify_config();
    if ($config['client_id'] === '' || $config['client_secret'] === '') {
        return null;
    }

    $ch = curl_init('https://accounts.spotify.com/api/token');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($fields),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/x-www-form-urlencoded',
            'Authorization: Basic ' . base64_encode($config['client_id'] . ':' . $config['client_secret']),
        ],
    ]);

    $body = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($body === false || $status < 200 || $status >= 300) {
        return null;
    }

    $decoded = json_decode((string) $body, true);

    return is_array($decoded) ? $decoded : null;
}

/**
 * Exchanges the stored refresh token for a fresh access token.
 */
function spotify_access_token(): ?string
{
    $config = spotify_config();
    if ($config['refresh_token'] === '') {
        return null;
    }

    $response = spotify_token_request([
        'grant_type' => 'refresh_token',
        'refresh_token' => $config['refresh_token'],
    ]);

    $token = $response['access_token'] ?? null;

    return is_string($token) && $token !== '' ? $token : null;
}

/**
 * Fetches the user's top tracks.
 *
 * @param string $timeRange short_term (~4 weeks), medium_term (~6 months) or long_term.
 * @return list<array{name:string,artists:string,url:string,cover:string,album:string}>|null Null on any failure.
 */
function spotify_fetch_top_tracks(int $limit, string $timeRange): ?array
{
    $token = spotify_access_token();
    if ($token === null) {
        return null;
    }

    $query = http_build_query(['limit' => $limit, 'time_range' => $timeRange]);
    $ch = curl_init('https://api.spotify.com/v1/me/top/tracks?' . $query);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $token],
    ]);

    $body = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($body === false || $status !== 200) {
        return null;
    }

    $decoded = json_decode((string) $body, true);
    if (!is_array($decoded) || !isset($decoded['items']) || !is_array($decoded['items'])) {
        return null;
    }

    $tracks = [];
    foreach ($decoded['items'] as $item) {
        $artists = array_map(
            static fn(array $artist): string => (string) ($artist['name'] ?? ''),
            is_array($item['artists'] ?? null) ? $item['artists'] : []
        );

        // Spotify returns album covers largest first; the ~300px middle size is
        // plenty for the thumbnails shown here.
        $images = is_array($item['album']['images'] ?? null) ? $item['album']['images'] : [];
        $cover = $images[1]['url'] ?? ($images[0]['url'] ?? '');

        $tracks[] = [
            'name' => (string) ($item['name'] ?? ''),
            'artists' => implode(', ', array_filter($artists)),
            'url' => (string) ($item['external_urls']['spotify'] ?? ''),
            'cover' => (string) $cover,
            'album' => (string) ($item['album']['name'] ?? ''),
        ];
    }

    return $tracks;
}

/**
 * Returns the top tracks, refreshing the on-disk cache at most every few hours.
 * Falls back to a stale cache when Spotify is unreachable, and to an empty list
 * when nothing was ever cached.
 *
 * @return list<array{name:string,artists:string,url:string,cover:string,album:string}>
 */
function spotify_top_tracks(int $limit = 5, string $timeRange = 'short_term'): array
{
    $cache = is_readable(SPOTIFY_CACHE_FILE)
        ? json_decode((string) file_get_contents(SPOTIFY_CACHE_FILE), true)
        : null;

    $isUsable = is_array($cache)
        && ($cache['version'] ?? 0) === SPOTIFY_CACHE_VERSION
        && ($cache['time_range'] ?? '') === $timeRange
        && ($cache['limit'] ?? 0) === $limit;

    if ($isUsable && (time() - (int) ($cache['fetched_at'] ?? 0)) < SPOTIFY_CACHE_TTL) {
        return $cache['tracks'];
    }

    $tracks = spotify_fetch_top_tracks($limit, $timeRange);
    if ($tracks === null) {
        return $isUsable && isset($cache['tracks']) ? $cache['tracks'] : [];
    }

    @file_put_contents(SPOTIFY_CACHE_FILE, json_encode([
        'version' => SPOTIFY_CACHE_VERSION,
        'fetched_at' => time(),
        'time_range' => $timeRange,
        'limit' => $limit,
        'tracks' => $tracks,
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), LOCK_EX);

    return $tracks;
}
